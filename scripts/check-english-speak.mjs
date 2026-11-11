// Kiểm tra câu hỏi phần 🎤 Nói (src/data/englishReading/speak/level<n>.js).
// node scripts/check-english-speak.mjs [level]
// Mỗi bài 5 câu (text, text, me, me, retell), đủ trường, câu mẫu phải tự qua chấm (speakCheck), không có "—" / "nhé".
import { pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { speakCheck } from '../src/games/englishCheck.js';

const only = process.argv[2] ? [Number(process.argv[2])] : [1, 2, 3, 4, 5];
const dir = path.resolve('src/data/englishReading');
let errors = 0, total = 0;
const err = (id, m) => { errors++; console.log(`✗ ${id}: ${m}`); };

for (const lv of only) {
  const file = path.join(dir, 'speak', `level${lv}.js`);
  if (!existsSync(file)) { console.log(`- speak/level${lv}.js chưa có`); continue; }
  const data = (await import(pathToFileURL(file).href)).default;
  const lessons = (await import(pathToFileURL(path.join(dir, `level${lv}.js`)).href)).default;
  for (const L of lessons) {
    const items = data[L.id];
    if (!items) { err(L.id, 'chưa có câu nói'); continue; }
    total++;
    if (items.map((p) => p.kind).join() !== 'text,text,me,me,retell') err(L.id, `thứ tự kind: ${items.map((p) => p.kind).join()}`);
    if (/—|nhé/.test(JSON.stringify(items))) err(L.id, 'có "—" hoặc "nhé"');
    items.forEach((p, i) => {
      const at = `${L.id} #${i + 1}`;
      for (const k of ['q', 'vi', 'model']) if (!p[k]) err(at, `thiếu ${k}`);
      if (!p.need?.length) err(at, 'thiếu need');
      if (p.kind === 'me' && !p.frame) err(at, 'me thiếu frame');
      if (p.kind === 'retell' && !(p.hints?.length >= 3)) err(at, 'retell cần hints');
      const r = speakCheck(p, p.model);
      if (!r.ok) err(at, `câu mẫu không qua: thiếu [${r.missing.join(', ')}], ${r.words}/${r.minWords} từ`);
    });
  }
  for (const id of Object.keys(data)) if (!lessons.some((L) => L.id === id)) err(id, 'không có bài này');
}
console.log(errors ? `${errors} lỗi / ${total} bài` : `OK ${total} bài`);
process.exitCode = errors ? 1 : 0;
