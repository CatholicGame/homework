// Kiểm tra dữ liệu bài đọc tiếng Anh (docs/tieng-anh/thiet-ke-bai-doc.md).
// node scripts/check-english-reading.mjs [level]
import { pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';
import path from 'node:path';

const RANGE = { 1: [80, 105], 2: [90, 115], 3: [95, 120], 4: [100, 125], 5: [100, 130] };
const only = process.argv[2] ? [Number(process.argv[2])] : [1, 2, 3, 4, 5];
const dir = path.resolve('src/data/englishReading');
const words = (s) => s.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
const norm = (s) => s.replace(/[^A-Za-z0-9']+/g, ' ').trim().toLowerCase();

let errors = 0, total = 0;
const err = (id, m) => { errors++; console.log(`✗ ${id}: ${m}`); };

for (const lv of only) {
  const file = path.join(dir, `level${lv}.js`);
  if (!existsSync(file)) { console.log(`- level${lv}.js chưa có`); continue; }
  const lessons = (await import(pathToFileURL(file).href)).default;
  const [lo, hi] = RANGE[lv];
  const counts = [];
  lessons.forEach((L, i) => {
    total++;
    const no = (lv - 1) * 20 + i + 1;
    const id = L.id || `#${no}`;
    if (L.no !== no) err(id, `no=${L.no}, cần ${no}`);
    if (L.id !== `en-${String(no).padStart(3, '0')}`) err(id, 'id sai');
    if (L.level !== lv) err(id, 'level sai');
    for (const k of ['title', 'topic', 'text']) if (!L[k]) err(id, `thiếu ${k}`);
    const g = L.grammar || {};
    if (!g.point || !g.explainVi || !g.pattern || !(g.examples?.length >= 2)) err(id, 'grammar thiếu trường');
    const n = words(L.text || '');
    counts.push(n);
    if (n < lo || n > hi) err(id, `${n} từ (cần ${lo}–${hi})`);
    if (/—/.test(JSON.stringify(L))) err(id, 'có dấu —');
    const v = L.vocab || [];
    if (v.length < 6 || v.length > 8) err(id, `vocab ${v.length} (cần 6–8)`);
    v.forEach((w) => {
      if (!w.word || !w.vi || !w.emoji || !w.example) err(id, `vocab "${w.word}" thiếu trường`);
      else if (!norm(L.text).includes(norm(w.word).split(' ')[0].slice(0, 4))) err(id, `từ "${w.word}" không thấy trong bài`);
    });
    const q = L.questions || [];
    if (q.length !== 5) err(id, `questions ${q.length} (cần 5)`);
    if (q.filter((x) => x.listen).length !== 2) err(id, 'cần đúng 2 câu listen');
    q.forEach((x, j) => {
      if (x.type === 'mc' && !(Number.isInteger(x.answer) && x.options?.[x.answer])) err(id, `câu ${j + 1} mc đáp án sai`);
      if (x.type === 'tf' && typeof x.answer !== 'boolean') err(id, `câu ${j + 1} tf cần true/false`);
      if (x.type === 'short' && typeof x.answer !== 'string') err(id, `câu ${j + 1} short cần chuỗi`);
      if (!['mc', 'tf', 'short'].includes(x.type)) err(id, `câu ${j + 1} type lạ`);
    });
    if (lv >= 3 && q.filter((x) => x.type === 'short').length < 2) err(id, 'cấp 3+ cần ≥2 câu short');
    const mq = L.makeQuestion || [];
    if (mq.length < 2 || mq.length > 3) err(id, `makeQuestion ${mq.length}`);
    mq.forEach((m) => { if (!m.answer || !m.question || !m.hint) err(id, 'makeQuestion thiếu trường'); });
    const d = L.dictation || [];
    if (d.length !== 3) err(id, `dictation ${d.length} (cần 3)`);
    d.forEach((s) => { if (!L.text.includes(s)) err(id, `chính tả không có nguyên văn trong bài: "${s}"`); });
    const r = L.reorder || [];
    if (r.length !== 2) err(id, `reorder ${r.length}`);
    r.forEach((x) => {
      const a = norm(x.answer).split(' ').sort().join(' ');
      const b = x.words.map(norm).join(' ').split(' ').sort().join(' ');
      if (a !== b) err(id, `reorder từ không khớp: "${x.answer}"`);
    });
    const rw = L.rewrite || [];
    if (rw.length !== 2) err(id, `rewrite ${rw.length}`);
    rw.forEach((x) => { if (!x.prompt || !x.answer || !x.instructionVi) err(id, 'rewrite thiếu trường'); });
  });
  if (lessons.length !== 20) err(`level${lv}`, `${lessons.length} bài (cần 20)`);
  console.log(`level${lv}: ${lessons.length} bài, số từ ${Math.min(...counts)}–${Math.max(...counts)}, TB ${Math.round(counts.reduce((a, b) => a + b, 0) / counts.length)}`);
}
console.log(errors ? `\n${errors} lỗi / ${total} bài` : `\nOK ${total} bài`);
process.exit(errors ? 1 : 0);
