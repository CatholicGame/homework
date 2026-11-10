/**
 * GET /api/tts?t=<câu>&v=namMinh|hoaiMy|enUS → mp3 giọng Azure Speech cho hai MC Đấu Trường Nhí (src/dauTruong/mcVoice.js),
 * bài đọc Tiếng Việt / tiền tiểu học, và mọi lời tiếng Anh (enUS, src/engine/speakEn.js).
 * Như kinh-thanh/api/tts.js: mỗi câu chỉ tạo một lần, mp3 lưu lên Cloudflare R2 (_lib/r2.js, chung bucket với Kinh Thánh nhưng
 * thư mục riêng homework/dautruong/, xem src/dauTruong/tts.js) ở ttsPath(); trình duyệt tìm ở R2 trước, ở đây cũng xem R2 trước
 * khi gọi Azure. Mỗi lần gọi Azure ghi thêm file rỗng homework/dautruong/usage/<ngày>/<giọng>/<số ký tự>-<mã> để đếm ký tự.
 *
 * Khác Kinh Thánh: câu hỏi Đấu Trường sinh từ ngân hàng hàng nghìn câu (cả câu Tăng tốc sinh ngẫu nhiên) và lời MC có tên các
 * bạn, nên không có danh sách câu được phép. Chặn lạm dụng bằng: chỉ trang của app gọi (sec-fetch-site), chỉ 2 giọng MC,
 * câu ≤ TTS_MAX ký tự, mỗi IP PER_IP_HOUR câu / giờ, mỗi máy chủ DAY_CHARS ký tự gửi Azure / ngày (câu đã có trên R2 không tính).
 *
 * Env (Vercel → Settings → Environment Variables; chạy máy: .env.local), cùng giá trị với dự án Kinh Thánh:
 *   AZURE_SPEECH_KEY, AZURE_SPEECH_REGION; R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_PUBLIC_URL.
 * Thiếu Azure hoặc admin tắt (Firestore config/voice mcAzure: false) → 503 { error: 'off' }; hết hạn mức (Azure 403 / 429 có chữ quota) → 503 { error: 'quota' } (nghỉ QUOTA_PAUSE);
 * lỗi khác → 502. Trình duyệt khi đó đọc bằng giọng của máy (mcVoice.js).
 */
import { sendJson } from './_lib/google.js';
import { r2On, r2Get, r2Put } from './_lib/r2.js';
import { DT_VOICES, TTS_MAX, ttsPath, ttsText, usagePath } from '../src/dauTruong/tts.js';

const FORMAT = 'audio-24khz-48kbitrate-mono-mp3';
const xmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const QUOTA_PAUSE = 10 * 60 * 1000;
const PER_IP_HOUR = 600;
const DAY_CHARS = 400_000;

let quotaUntil = 0;
// Admin bật / tắt (Firestore config/voice { mcAzure }, src/engine/mcVoiceConfig.js): đọc lại sau 30 giây; đọc lỗi giữ lần trước
const CONFIG_URL = `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID || 'mathtieuhoc'}/databases/(default)/documents/config/voice`;
let cfg = { on: true, until: 0 };
async function azureOn() {
  if (Date.now() < cfg.until) return cfg.on;
  try {
    const r = await fetch(CONFIG_URL);
    if (r.status === 404) cfg.on = true;
    else if (r.ok) cfg.on = (await r.json())?.fields?.mcAzure?.booleanValue !== false;
  } catch { /* mạng lỗi: giữ lần trước */ }
  cfg.until = Date.now() + 30_000;
  return cfg.on;
}
const hits = new Map(); // ip → { hour, n }
let day = { d: '', n: 0 };

function tooMany(ip) {
  const hour = Math.floor(Date.now() / 3600000);
  const h = hits.get(ip);
  const n = h?.hour === hour ? h.n + 1 : 1;
  hits.set(ip, { hour, n });
  if (hits.size > 5000) hits.clear();
  return n > PER_IP_HOUR;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return sendJson(res, 405, { error: 'method' });
  const site = req.headers['sec-fetch-site'];
  if (site && site !== 'same-origin' && site !== 'none') return sendJson(res, 403, { error: 'origin' });

  const q = new URL(req.url, 'http://x').searchParams;
  const text = ttsText(q.get('t'));
  const voice = q.get('v');
  if (!DT_VOICES[voice] || !text || text.length > TTS_MAX) return sendJson(res, 400, { error: 'text' });

  const path = await ttsPath(text, voice);
  if (r2On()) {
    const saved = await r2Get(path).catch((e) => { console.warn('[tts]', e.message); return null; });
    if (saved) return sendMp3(res, saved);
  }

  const key = process.env.AZURE_SPEECH_KEY, region = process.env.AZURE_SPEECH_REGION;
  if (!key || !region) return sendJson(res, 503, { error: 'off' });
  if (Date.now() < quotaUntil) return sendJson(res, 503, { error: 'quota' });
  if (!(await azureOn())) return sendJson(res, 503, { error: 'off' });
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
  if (tooMany(ip)) return sendJson(res, 429, { error: 'limit' });
  const today = new Date().toISOString().slice(0, 10);
  if (day.d !== today) day = { d: today, n: 0 };
  if (day.n + text.length > DAY_CHARS) return sendJson(res, 503, { error: 'quota' });
  day.n += text.length;

  const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${DT_VOICES[voice].slice(0, 5)}">`
    + `<voice name="${DT_VOICES[voice]}">${xmlEsc(text)}</voice></speak>`;
  let r;
  try {
    r = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: { 'Ocp-Apim-Subscription-Key': key, 'Content-Type': 'application/ssml+xml', 'X-Microsoft-OutputFormat': FORMAT, 'User-Agent': 'homework-dautruong' },
      body: ssml,
    });
  } catch {
    return sendJson(res, 502, { error: 'azure' });
  }
  if (!r.ok) {
    const detail = await r.text().catch(() => '');
    if ((r.status === 403 || r.status === 429) && /quota/i.test(detail)) {
      quotaUntil = Date.now() + QUOTA_PAUSE;
      return sendJson(res, 503, { error: 'quota' });
    }
    console.warn('[tts]', r.status, detail.slice(0, 200));
    return sendJson(res, 502, { error: 'azure' });
  }
  const mp3 = Buffer.from(await r.arrayBuffer());
  // lưu trước khi trả lời (hàm có thể bị dừng ngay sau khi trả lời); lưu lỗi thì vẫn đọc được câu này
  if (r2On()) {
    const usage = usagePath(today, voice, text.length, path);
    await Promise.all([r2Put(path, mp3, 'audio/mpeg'), r2Put(usage, Buffer.alloc(0), 'text/plain')])
      .catch((e) => console.warn('[tts]', e.message));
  }
  sendMp3(res, mp3);
}

function sendMp3(res, mp3) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Content-Length', mp3.length);
  res.setHeader('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');
  res.end(mp3);
}
