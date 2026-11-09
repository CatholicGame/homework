/**
 * Kiểm tra bộ câu "Ai tài năng nhất?" (src/thanDong/quiz/bank): mỗi lớp, mỗi bậc sinh N câu; báo lỗi khi thiếu phương án, phương án
 * trùng nhau, có NaN / undefined / số âm / "Infinity", số thập phân viết dấu chấm. `node scripts/thandong-check.mjs [N] [--show]`.
 */
import { GRADES, FIXED, makeQuestion, fixedQuestion } from '../src/thanDong/quiz/bank/index.js';
const N = +process.argv[2] || 300, show = process.argv.includes('--show');
let errors = 0;
const bad = (s) => /NaN|undefined|Infinity|null|\[object/.test(s) || /(^|[^\d])-\d/.test(s) || /\d\.\d/.test(s);
for (const g of Object.keys(GRADES)) {
  for (let lv = 1; lv <= 15; lv++) {
    const ids = new Set();
    for (let i = 0; i < N; i++) {
      let q;
      try { q = makeQuestion(+g, lv); } catch (e) { errors++; console.log(`L${g} b${lv}: ${e.message}`); break; }
      ids.add(q.id);
      const all = [q.q, ...q.o, q.ex];
      if (new Set(q.o).size !== 4) { errors++; console.log(`L${g} b${lv} trùng phương án:`, q.q, q.o); }
      if (all.some(bad)) { errors++; console.log(`L${g} b${lv} chữ lỗi:`, q.q, q.o, q.ex); }
      if (show && i < 2) console.log(`L${g} b${lv}: ${q.q}  [${q.o.join(' | ')}]  ${q.ex}`);
    }
    if (ids.size < Math.min(N, 8)) console.log(`L${g} b${lv}: chỉ ${ids.size} câu khác nhau`);
  }
}
// Câu viết tay (bank/fixed): đủ 15 bậc, từng câu đủ bốn phương án khác nhau, chữ sạch, không trùng câu hỏi trong cả lớp.
for (const g of Object.keys(FIXED)) {
  const F = FIXED[g], qs = new Set();
  if (F.length !== 15) { errors++; console.log(`L${g} viết tay: ${F.length} bậc, cần 15`); }
  F.forEach((list, li) => list.forEach((c, i) => {
    const q = fixedQuestion(+g, li + 1, i), where = `L${g} b${li + 1} viết tay #${i + 1}`;
    if (q.o.length !== 4 || c.w.length !== 3) { errors++; console.log(`${where} thiếu / thừa phương án:`, c.q, c.a, c.w); }
    if ([q.q, ...q.o, q.ex].some(s => typeof s !== 'string' || bad(s) || /—|nhé/.test(s))) { errors++; console.log(`${where} chữ lỗi:`, q.q, q.o, q.ex); }
    if (qs.has(c.q)) { errors++; console.log(`${where} trùng câu hỏi:`, c.q); }
    qs.add(c.q);
    if (show && i < 2) console.log(`${where}: ${q.q}  [${q.o.join(' | ')}]  ${q.ex}`);
  }));
}
console.log(errors ? `${errors} lỗi` : 'Không lỗi');
process.exit(errors ? 1 : 0);
