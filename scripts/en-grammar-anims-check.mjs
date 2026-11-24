// Kiểm tra 🎬 Câu biến hình (src/data/enGrammar/anims.js): mọi bài đều có kịch bản, mỗi bước có lời giải thích,
// mọi @nguồn tìm thấy ở bước trước, không có "—" hay "nhé". Chạy: node scripts/en-grammar-anims-check.mjs [-v]
import { ANIMS } from '../src/data/enGrammar/anims.js';
import { UNITS } from '../src/data/enGrammar/units.js';
import { tokenize, link, spokenOf } from '../src/games/enGrammar/movie.js';

const verbose = process.argv.includes('-v');
const errs = [];
for (const u of UNITS) if (!ANIMS[u.id]) errs.push(`${u.id}: chưa có kịch bản`);
for (const [id, steps] of Object.entries(ANIMS)) {
  if (steps.length < 2) errs.push(`${id}: cần ít nhất 2 bước`);
  let prev = [], n = 0;
  steps.forEach((s, i) => {
    const [line, note] = s.split('|');
    if (!note) errs.push(`${id} bước ${i + 1}: thiếu lời giải thích`);
    if (/—|nhé/.test(s)) errs.push(`${id} bước ${i + 1}: có "—" hoặc "nhé"`);
    if ((line.match(/\*/g) || []).length % 2) errs.push(`${id} bước ${i + 1}: dấu * lẻ`);
    const { tiles, gone, missing } = link(prev, tokenize(line), () => `m${(n += 1)}`);
    missing.forEach((m) => errs.push(`${id} bước ${i + 1}: không thấy "@${m}" ở bước trước`));
    if (i && !tiles.some((t) => prev.some((p) => p.id === t.id))) errs.push(`${id} bước ${i + 1}: không thẻ nào nối từ bước trước`);
    if (verbose) {
      const keep = tiles.filter((t) => prev.some((p) => p.id === t.id && p.text !== t.text)).map((t) => `${prev.find((p) => p.id === t.id).text}→${t.text}`);
      console.log(`${id}.${i + 1} ${spokenOf(tiles)}  ${keep.length ? `[đổi ${keep.join(', ')}]` : ''}${gone.length ? ` [bỏ ${gone.map((g) => g.text).join(' ')}]` : ''}`);
    }
    prev = tiles;
  });
}
console.log(`${Object.keys(ANIMS).length} bài có kịch bản`);
console.log(errs.length ? errs.join('\n') : 'OK');
process.exitCode = errs.length ? 1 : 0;
