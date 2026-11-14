// node scripts/.tmp/video-gioi-thieu/tts.mjs [--force]: đọc lời video giới thiệu bằng Azure Speech (giọng HoaiMy),
// lưu mp3 vào ./audio/ và ./audio/index.json { chữ hiện: tệp }. Key AZURE_SPEECH_KEY / AZURE_SPEECH_REGION trong .env.local.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { SEGMENTS } from './scenes.js';

const env = Object.fromEntries(readFileSync(new URL('../../../.env.local', import.meta.url), 'utf8').split(/\r?\n/)
  .map(l => l.match(/^\s*([\w.]+)\s*=\s*"?(.*?)"?\s*$/)).filter(Boolean).map(m => [m[1], m[2]]));
const KEY = env.AZURE_SPEECH_KEY, REGION = env.AZURE_SPEECH_REGION;
const VOICE = 'vi-VN-HoaiMyNeural';
const FORMAT = 'audio-48khz-192kbitrate-mono-mp3';
const force = process.argv.includes('--force');
const dir = new URL('./audio/', import.meta.url);
mkdirSync(dir, { recursive: true });
const xmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const lines = SEGMENTS.flatMap(s => s.lines).map(l => (typeof l === 'string' ? { text: l } : l));
const index = {};
let chars = 0;
for (const { text, say = text } of lines) {
  const file = `${createHash('sha1').update(`${VOICE}|${say}`).digest('hex').slice(0, 12)}.mp3`;
  index[text] = file;
  if (existsSync(new URL(file, dir)) && !force) continue;
  const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="vi-VN"><voice name="${VOICE}">${xmlEsc(say)}</voice></speak>`;
  const r = await fetch(`https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: { 'Ocp-Apim-Subscription-Key': KEY, 'Content-Type': 'application/ssml+xml', 'X-Microsoft-OutputFormat': FORMAT, 'User-Agent': 'video-client' },
    body: ssml,
  });
  if (!r.ok) { console.error(r.status, await r.text(), say); process.exit(1); }
  writeFileSync(new URL(file, dir), Buffer.from(await r.arrayBuffer()));
  chars += say.length;
  console.log('đọc ·', say);
}
writeFileSync(new URL('index.json', dir), JSON.stringify(index, null, 1));
console.log(`xong: ${lines.length} câu, gọi Azure ${chars} ký tự`);
