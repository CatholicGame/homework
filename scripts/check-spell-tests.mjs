// Kiểm tra đề luyện luật chính tả (src/games/tiengViet3/spellTests.js):
//   mỗi luật 3 đề × 30 từ, không trùng từ trong cùng luật, mỗi từ có chỗ trống, chỗ trống có ≥ 2 lựa chọn,
//   c/k, g/gh, ng/ngh đúng luật (trước i, e, ê viết k, gh, ngh), dấu hỏi/ngã: tiếng điền mang dấu hỏi hoặc ngã.
// Chạy: node scripts/check-spell-tests.mjs
import { SPELL_TESTS } from '../src/games/tiengViet3/spellTests.js';
import { RULES, blankOptions } from '../src/games/tiengViet3/rules.js';

const FRONT = new Set(['i', 'e', 'ê', 'y']);
const bare = (s) => s.normalize('NFD').replace(/[̣̀́̃̉]/g, '').normalize('NFC').toLowerCase();
const errors = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);

function blanksOf(item) {
  const out = [];
  const re = /\[([^\]]+)\]/g;
  let m;
  while ((m = re.exec(item))) out.push({ ans: m[1], after: item.slice(m.index + m[0].length).replace(/\[|\]/g, '') });
  return out;
}

for (const [key, tests] of Object.entries(SPELL_TESTS)) {
  if (tests.length !== 3) err(key, `${tests.length} đề (cần 3)`);
  const seen = new Map();
  tests.forEach((items, ti) => {
    if (items.length !== 30) err(`${key} đề ${ti + 1}`, `${items.length} từ (cần 30)`);
    items.forEach((raw, ii) => {
      const where = `${key} đề ${ti + 1} #${ii + 1} "${raw}"`;
      const [rule, item] = raw.includes('|') ? raw.split('|') : [key, raw];
      const r = RULES[rule];
      if (!r) { err(where, `không có luật ${rule}`); return; }
      const word = item.replace(/\[|\]/g, '').toLowerCase();
      if (seen.has(word)) err(where, `trùng với ${seen.get(word)}`);
      seen.set(word, `đề ${ti + 1} #${ii + 1}`);
      const blanks = blanksOf(item);
      if (!blanks.length) err(where, 'không có chỗ trống');
      for (const b of blanks) {
        const opts = blankOptions(rule, b.ans);
        if (opts.length < 2 || !opts.includes(b.ans)) err(where, `chỗ [${b.ans}] lựa chọn ${JSON.stringify(opts)}`);
        if (r.opts && !r.opts.includes(b.ans)) err(where, `[${b.ans}] không thuộc ${r.opts.join('/')}`);
        if (r.sure) {
          const n = bare(b.after)[0];
          const want = FRONT.has(n) ? r.opts[1] : r.opts[0];
          if (b.ans !== want) err(where, `[${b.ans}] trước "${n}" phải là ${want}`);
        }
        if (r.tone && !/[̃̉]/.test(b.ans.normalize('NFD'))) err(where, `[${b.ans}] không mang dấu hỏi/ngã`);
      }
    });
  });
}

if (errors.length) {
  console.log(errors.join('\n'));
  console.log(`\n${errors.length} lỗi`);
  process.exit(1);
}
console.log(`OK: ${Object.keys(SPELL_TESTS).length} luật, ${Object.values(SPELL_TESTS).flat().length} đề, ${Object.values(SPELL_TESTS).flat(2).length} từ`);
