// Kiểm tra dữ liệu bài đọc tiếng Anh (docs/tieng-anh/thiet-ke-bai-doc.md).
// node scripts/check-english-reading.mjs [level | alien | kind | vietsu]
import { pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';
import path from 'node:path';

const RANGE = { 1: [80, 105], 2: [90, 115], 3: [95, 120], 4: [100, 125], 5: [100, 130] };
// Bộ chủ đề (bài 101+): 10 bài mỗi bộ, level từng bài là độ khó, không vào bản đồ ngữ pháp.
const THEME_START = { alien: 101, kind: 111, vietsu: 121 };
const all = [1, 2, 3, 4, 5, ...Object.keys(THEME_START)];
const only = process.argv[2] ? [/^\d$/.test(process.argv[2]) ? Number(process.argv[2]) : process.argv[2]] : all;
const dir = path.resolve('src/data/englishReading');
const words = (s) => s.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
const norm = (s) => s.replace(/[^A-Za-z0-9']+/g, ' ').trim().toLowerCase();

let errors = 0, total = 0;
const err = (id, m) => { errors++; console.log(`✗ ${id}: ${m}`); };

for (const lv of only) {
  const theme = typeof lv === 'string', fname = theme ? lv : `level${lv}`;
  const file = path.join(dir, `${fname}.js`);
  if (!existsSync(file)) { console.log(`- ${fname}.js chưa có`); continue; }
  const lessons = (await import(pathToFileURL(file).href)).default;
  const counts = [];
  lessons.forEach((L, i) => {
    total++;
    const no = theme ? THEME_START[lv] + i : (lv - 1) * 20 + i + 1;
    const id = L.id || `#${no}`;
    if (L.no !== no) err(id, `no=${L.no}, cần ${no}`);
    if (L.id !== `en-${String(no).padStart(3, '0')}`) err(id, 'id sai');
    if (theme ? !(L.level >= 1 && L.level <= 5) || L.pack !== lv : L.level !== lv) err(id, 'level / pack sai');
    const [lo, hi] = RANGE[L.level] || RANGE[3];
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
    if (L.level >= 3 && q.filter((x) => x.type === 'short').length < 2) err(id, 'cấp 3+ cần ≥2 câu short');
    const mq = L.makeQuestion || [];
    if (mq.length < 5 || mq.length > 10) err(id, `makeQuestion ${mq.length} (cần 5–10)`);
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
  if (lessons.length !== (theme ? 10 : 20)) err(fname, `${lessons.length} bài (cần ${theme ? 10 : 20})`);
  if (!lessons.length) continue;
  console.log(`${fname}: ${lessons.length} bài, số từ ${Math.min(...counts)}–${Math.max(...counts)}, TB ${Math.round(counts.reduce((a, b) => a + b, 0) / counts.length)}`);
}
// 🗺️ Bản đồ ngữ pháp: mỗi bài nằm đúng một nhánh
{
  const { BRANCHES } = await import(pathToFileURL(path.join(dir, 'grammarMap.js')).href);
  const seen = new Map();
  BRANCHES.forEach((b) => b.lessons.forEach((n) => { if (seen.has(n)) err(`grammarMap`, `bài ${n} ở cả ${seen.get(n)} và ${b.id}`); seen.set(n, b.id); }));
  for (let n = 1; n <= 100; n++) if (!seen.has(n)) err('grammarMap', `bài ${n} chưa thuộc nhánh nào`);
}
console.log(errors ? `\n${errors} lỗi / ${total} bài` : `\nOK ${total} bài`);
process.exit(errors ? 1 : 0);
