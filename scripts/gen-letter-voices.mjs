/**
 * Tạo giọng đọc tên chữ cái cho sách mầm non (bờ, cờ, sờ…): src/assets/voice/letters/*.wav, giọng Azure HoaiMy.
 *
 * Vì sao không đọc thẳng: giọng của máy (và cả Azure) đọc MỘT tiếng đứng riêng thường mất phụ âm đầu,
 * "sờ" nghe thành "rờ" / "ờ". Đứng sau một tiếng khác thì Azure đọc rõ, nên ở đây cho Azure đọc "a, sờ"
 * rồi cắt lấy tiếng sau dấu phẩy. Riêng "xờ" HoaiMy đọc hỏng ở mọi cách (ra "giờ"), nên dùng cách đọc
 * của "sờ" (miền Bắc s / x cùng một âm).
 *
 * Mỗi clip được kiểm bằng Azure nhận dạng giọng nói (ghép lại sau "a", phải nghe ra như câu gốc), in ra để xem lại.
 *
 *   node scripts/gen-letter-voices.mjs            # tạo đủ
 *   node scripts/gen-letter-voices.mjs sờ rờ      # chỉ vài tên
 * Cần AZURE_SPEECH_KEY / AZURE_SPEECH_REGION trong .env.local.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LETTER_VOICE_NAMES, letterVoiceFile } from '../src/games/preschool/letterVoiceNames.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src/assets/voice/letters');
const env = Object.fromEntries(fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8').split(/\r?\n/)
  .filter(l => /^\w+=/.test(l)).map(l => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const KEY = env.AZURE_SPEECH_KEY, REGION = env.AZURE_SPEECH_REGION;
if (!KEY || !REGION) { console.error('Thiếu AZURE_SPEECH_KEY / AZURE_SPEECH_REGION trong .env.local'); process.exit(1); }

const SR = 24000;
const VOICE = 'vi-VN-HoaiMyNeural';
const PREFIX = 'a';
// Tên Azure đọc hỏng → chữ đưa cho Azure.
const SPEAK_AS = { 'xờ': 'sờ' };

async function tts(text, rate = SR) {
  const r = await fetch(`https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: { 'Ocp-Apim-Subscription-Key': KEY, 'Content-Type': 'application/ssml+xml', 'X-Microsoft-OutputFormat': `riff-${rate / 1000}khz-16bit-mono-pcm`, 'User-Agent': 'homework-letters' },
    body: `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="vi-VN"><voice name="${VOICE}">${text}</voice></speak>`,
  });
  if (!r.ok) throw new Error(`tts ${r.status} ${text}`);
  return Buffer.from(await r.arrayBuffer()).subarray(44);
}
function wavOf(pcm, rate = SR) {
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + pcm.length, 4); h.write('WAVEfmt ', 8); h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(rate, 24); h.writeUInt32LE(rate * 2, 28);
  h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}
/** Phần sau khoảng lặng đầu tiên (≥100ms) của "a, <tên>", có mờ dần 2 đầu cho khỏi tiếng tách. */
function afterPause(pcm, rate = SR) {
  const F = rate / 100, n = pcm.length / 2, fr = [];
  for (let f = 0; f + F <= n; f += F) { let e = 0; for (let i = f; i < f + F; i++) { const v = pcm.readInt16LE(i * 2); e += v * v; } fr.push(Math.sqrt(e / F)); }
  const on = (r) => r > 12;
  let i = fr.findIndex(on), quiet = 0;
  for (; i < fr.length; i++) { if (on(fr[i])) quiet = 0; else if (++quiet >= 10) break; }
  const pauseAt = i;
  while (i < fr.length && !on(fr[i])) i++;
  let b = fr.length - 1; while (b > i && !on(fr[b])) b--;
  // Phụ âm nhẹ (h, th, c, đ: hơi gió, tắc) nằm dưới ngưỡng: lùi tới chỗ lặng hẳn, không quá giữa khoảng lặng.
  const mid = Math.round((pauseAt + i) / 2);
  while (i > mid && fr[i - 1] > 2) i--;
  const a = Math.max(mid, i - 4) * F, end = Math.min(n, (b + 5) * F);
  const out = Buffer.from(pcm.subarray(a * 2, end * 2));
  const m = out.length / 2, fade = Math.round(rate * 0.004);
  for (let k = 0; k < fade && k < m; k++) {
    out.writeInt16LE(Math.round(out.readInt16LE(k * 2) * k / fade), k * 2);
    out.writeInt16LE(Math.round(out.readInt16LE((m - 1 - k) * 2) * k / fade), (m - 1 - k) * 2);
  }
  return out;
}
async function hear(pcm16k) {
  const r = await fetch(`https://${REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=vi-VN&format=detailed`, {
    method: 'POST', headers: { 'Ocp-Apim-Subscription-Key': KEY, 'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000' }, body: wavOf(pcm16k, 16000),
  });
  const j = await r.json().catch(() => ({}));
  return j.DisplayText ?? j.RecognitionStatus;
}

fs.mkdirSync(OUT, { recursive: true });
const only = process.argv.slice(2);
const carrier = Buffer.concat([await tts(PREFIX, 16000), Buffer.alloc(16000 * 2 * 0.15)]);   // "a" + lặng: nghe như câu gốc "a, sờ"
for (const name of LETTER_VOICE_NAMES.filter(n => !only.length || only.includes(n))) {
  const say = SPEAK_AS[name] || name;
  const clip = afterPause(await tts(`${PREFIX}, ${say}`));
  fs.writeFileSync(path.join(OUT, letterVoiceFile(name)), wavOf(clip));
  const check = afterPause(await tts(`${PREFIX}, ${say}`, 16000), 16000);
  console.log(name.padEnd(8), `${(clip.length / 2 / SR).toFixed(2)}s`, '| nghe:', await hear(Buffer.concat([carrier, check, Buffer.alloc(16000)])));
}
