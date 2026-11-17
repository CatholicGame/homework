// Kiểm phần ✏️ Điền từ của 100 bài đọc tiếng Anh: số chỗ trống mỗi bài, từ vựng không tìm thấy trong bài.
// node scripts/check-english-fill.mjs [--all]  (--all in mọi câu)
import { LESSONS, dataFileOf } from '../src/data/englishReading/index.js';
import { fillItems } from '../src/games/englishFill.js';

const all = process.argv.includes('--all');
const gl = {};
for (const f of ['level1', 'level2', 'level3', 'level4', 'level5', 'alien', 'kind', 'vietsu']) gl[f] = (await import(`../src/data/englishReading/gloss/${f}.js`)).default;
let bad = 0, total = 0, missTotal = 0;
for (const L of LESSONS) {
  const items = fillItems(L, gl[dataFileOf(L)][L.id]);
  const blanks = items.flatMap((x) => x.parts.filter((p) => typeof p !== 'string'));
  total += blanks.length;
  const got = new Set(blanks.map((x) => x.word));
  const miss = L.vocab.filter((v) => !got.has(v.word)).map((v) => v.word);
  missTotal += miss.length;
  if (blanks.length < 4) { bad++; console.log(`✗ ${L.id}: chỉ ${blanks.length} chỗ trống`); }
  if (miss.length) console.log(`  ${L.id} không lấy được: ${miss.join(', ')}`);
  if (all) items.forEach((x) => console.log(`    ${x.parts.map((p) => (typeof p === 'string' ? p : `[${p.answer}]`)).join('')}`));
}
console.log(`${LESSONS.length} bài, ${total} chỗ trống, ${missTotal} từ không có câu, ${bad} bài dưới 4 chỗ trống`);
process.exit(bad ? 1 : 0);
