/**
 * GET /api/tts-usage → (chỉ admin) số ký tự đã gửi Azure cho giọng MC Đấu Trường Nhí, đếm từ các file rỗng
 * homework/dautruong/usage/<ngày>/<giọng>/<số ký tự>-<mã> trên R2 (api/tts.js ghi mỗi lần gọi Azure). Trang admin tab 🎙️ Giọng MC.
 * Vào: header Authorization: Bearer <Firebase ID token> của tài khoản admin (src/engine/adminEmails.js).
 * Ra: { azure: có key Azure, r2: có R2, days: [{ day, chars, n, voices: { namMinh, hoaiMy } }] (mới nhất trước, 2 tháng gần nhất) }.
 */
import { sendJson } from './_lib/google.js';
import { bearer, verifyIdToken } from './_lib/firebaseToken.js';
import { r2On, r2List } from './_lib/r2.js';
import { R2_DIR } from '../src/dauTruong/tts.js';
import { ADMIN_EMAILS } from '../src/engine/adminEmails.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return sendJson(res, 405, { error: 'method' });
  const user = await verifyIdToken(bearer(req));
  const email = String(user?.email || '').toLowerCase();
  if (!user || !user.email_verified || !ADMIN_EMAILS.includes(email)) return sendJson(res, 403, { error: 'admin' });
  const azure = !!(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION);
  if (!r2On()) return sendJson(res, 200, { azure, r2: false, days: [] });
  const now = new Date(), months = [0, 1].map(k => new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - k, 1)).toISOString().slice(0, 7));
  try {
    const keys = (await Promise.all(months.map(m => r2List(`${R2_DIR}/usage/${m}`)))).flat();
    const by = new Map();
    for (const k of keys) {
      const [day, voice, file] = k.slice(`${R2_DIR}/usage/`.length).split('/');
      const chars = parseInt(file, 10) || 0;
      const d = by.get(day) || { day, chars: 0, n: 0, voices: {} };
      d.chars += chars; d.n++; d.voices[voice] = (d.voices[voice] || 0) + chars;
      by.set(day, d);
    }
    sendJson(res, 200, { azure, r2: true, days: [...by.values()].sort((a, b) => (a.day < b.day ? 1 : -1)) });
  } catch (e) {
    console.warn('[tts-usage]', e.message);
    sendJson(res, 502, { error: 'r2' });
  }
}
