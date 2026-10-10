// Kiểm tra dữ liệu Phiếu bài tập / Đề ôn tập: node scripts/check-worksheets.mjs [de01 de02 …]
// Định dạng: docs/lop_3/de-on-tap-giua-ki.md. Báo lỗi cấu trúc và đáp án tự tính không ra số nguyên.
// Kiểm tra theo lộ trình (src/data/routeTests/g*): thêm luật ma trận của docs/kiem-tra-lo-trinh.md (mục 10).
import { readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { normQuestion, tablesOf, itemSlots, findVar, holes } from '../src/games/worksheetCore.js';

const DIRS = ['src/data/grade3Worksheets', 'src/data/grade3Midterm', 'src/data/routeTests/g1', 'src/data/routeTests/g2', 'src/data/routeTests/g3', 'src/data/routeTests/g4',
  'src/data/routeTests/g1/hk2', 'src/data/routeTests/g2/hk2', 'src/data/routeTests/g3/hk2', 'src/data/routeTests/g4/hk2']; // hk2: Học kì II, có plan.js riêng
// Kiến thức từng Bài (points) của sách chính mỗi lớp, để kiểm tra trường bai / point của đề theo lộ trình.
const KNOWLEDGE = {
  workbook1: async () => (await import('../src/games/grade1Knowledge/index.js')).KNOWLEDGE1,
  workbook2: async () => (await import('../src/games/grade2Knowledge/index.js')).KNOWLEDGE2,
  workbook: async () => (await import('../src/games/grade3Knowledge/index.js')).KNOWLEDGE3,
  tool4: async () => (await import('../src/games/grade4Tools/knowledge.js')).KNOWLEDGE4,
};
// tl: số câu Phần B (tự luận). Giữa kì 15 câu, cuối kì 20 câu theo đề thi thật; lớp 1 làm trước nên còn 10 câu (OLD_EXAM).
const KINDS = { nhanh: { n: 5, lv: [3, 1, 1], review: [0, 1] }, tonghop: { n: 10, lv: [5, 3, 2], review: [2, 4] }, giuaki: { n: 15, lv: [8, 4, 3], tl: [4, 5] }, cuoiki: { n: 20, lv: [10, 6, 4], tl: [4, 5] } };
const OLD_EXAM = { books: ['workbook1'], rule: { n: 10, lv: [5, 3, 2] } };
// Lớp 3: người dùng chọn giữa kì, cuối kì khoảng 12–15 câu (2026-10-10): giữa kì 14, cuối kì 15.
const BOOK_KINDS = { workbook: { giuaki: { n: 14, lv: [7, 4, 3], tl: [4, 5] }, cuoiki: { n: 15, lv: [7, 5, 3], tl: [4, 5] } } };
const unitList = (spec) => String(spec).split(',').flatMap(p => { const [a, b = a] = p.trim().split('-').map(Number); return Array.from({ length: b - a + 1 }, (_, i) => a + i); });
const only = process.argv.slice(2);
const OPS = ['+', '−', '×', ':'];
let errors = 0, files = 0, qs = 0;

for (const dir of DIRS) {
  let names = [];
  try { names = readdirSync(dir).filter(n => /^(bai|de|nh|th|gk|ck)\d+[a-z]?\.js$/.test(n)); } catch { continue; }
  for (const name of names) {
    if (only.length && !only.some(o => name.startsWith(o))) continue;
    files++;
    const sheet = (await import(pathToFileURL(`${dir}/${name}`).href)).default;
    const err = (where, msg) => { errors++; console.log(`✗ ${name} ${where}: ${msg}`); };
    if (!sheet?.id || !sheet.title || !sheet.short || !sheet.desc || !Array.isArray(sheet.parts)) { err('', 'thiếu id/title/short/desc/parts'); continue; }
    sheet.parts.forEach((part, pi) => {
      if (!part.title || !Array.isArray(part.questions) || !part.questions.length) err(`Phần ${pi}`, 'thiếu title/questions');
      (part.questions || []).forEach((q, qi) => {
        qs++;
        const at = `Phần ${pi} câu ${qi + 1} (${q.type})`;
        const text = JSON.stringify(q);
        if (/—/.test(text)) err(at, 'có dấu gạch dài —');
        if (/\bnhé\b/i.test(text)) err(at, 'có chữ "nhé"');
        if (/\d\s*[xX]\s*\d/.test(JSON.stringify([q.items, q.prompt, q.text, q.options]))) err(at, 'dùng chữ x làm dấu nhân');
        if (q.fig && !/^<svg[\s\S]*viewBox[\s\S]*<\/svg>$/.test(q.fig.trim())) err(at, 'fig phải là <svg viewBox…>…</svg>');
        switch (q.type) {
          case 'mc': {
            const subs = q.items || [q];
            subs.forEach((s, si) => {
              if (!Array.isArray(s.options) || s.options.length < 2) err(at, `ý ${si}: thiếu options`);
              else if (!(Number.isInteger(s.ans) && s.ans >= 0 && s.ans < s.options.length)) err(at, `ý ${si}: ans ngoài phạm vi`);
              else if (new Set(s.options).size !== s.options.length) err(at, `ý ${si}: hai phương án giống nhau`);
            });
            break;
          }
          case 'tf':
            if (!Array.isArray(q.items) || !Array.isArray(q.ans) || q.items.length !== q.ans.length) err(at, 'items/ans lệch');
            else if (q.ans.some(a => a !== 'Đ' && a !== 'S')) err(at, 'ans chỉ được Đ hoặc S');
            else q.items.forEach((it, i) => {
              if (typeof it === 'object' && !(it.col && it.res != null) && !(it.div && it.q != null && Array.isArray(it.work))) err(at, `ý ${i}: object phải là { col, res } hoặc { div, q, work }`);
            });
            break;
          case 'calc': case 'fill': case 'findx': case 'compare': case 'chain':
            if (!Array.isArray(q.items) || !q.items.length) { err(at, 'thiếu items'); break; }
            normQuestion(q).forEach((n, i) => {
              if (n.choices && n.ans.some(a => typeof a === 'string' && !n.choices.includes(a))) err(at, `ý ${i}: đáp án không có trong choices`);
              if (q.type === 'findx' && !findVar(n.t)) err(at, `ý ${i}: không thấy biến x/y`);
              if (q.type === 'fill' && !holes(n.t)) err(at, `ý ${i}: không có … hoặc □`);
              if (q.type === 'compare' && holes(n.t) !== 1) err(at, `ý ${i}: cần đúng một □ hoặc …`);
              const want = itemSlots(q.type, n);
              if (n.ans.length !== want) err(at, `ý ${i} "${n.t}": cần ${want} đáp án, có ${n.ans.length}`);
              n.ans.forEach(a => {
                if (q.type === 'compare') { if (!['>', '<', '='].includes(a)) err(at, `ý ${i}: dấu "${a}"`); }
                else if (typeof a === 'number' ? !(Number.isInteger(a) && a >= 0) : !String(a).trim()) err(at, `ý ${i} "${n.t}": đáp án ${a}`);
              });
            });
            break;
          case 'pick': {
            (q.items || [q]).forEach((s, si) => {
              if (s.shape) {
                const count = s.shape === 'circle' ? s.parts : s.shape === 'square-x' ? 4 : s.shape === 'rect' && s.grid ? s.grid[0] * s.grid[1] : 0;
                if (!count) err(at, `ý ${si}: shape circle (parts) / square-x / rect (grid)`);
                if (!(s.ans > 0 && s.ans <= count)) err(at, `ý ${si}: ans`);
                return;
              }
              if (!['rabbit', 'orange', 'flower', 'star'].includes(s.icon)) err(at, `ý ${si}: icon`);
              if (!(s.count > 0 && s.ans > 0 && s.ans <= s.count)) err(at, `ý ${si}: count/ans`);
            });
            break;
          }
          case 'table': {
            if (tablesOf(q).some(tb => !Array.isArray(tb.rows) || !Array.isArray(tb.ans) || tb.rows.length !== tb.ans.length)) { err(at, 'rows/ans lệch'); break; }
            const widths = tablesOf(q).flatMap(tb => tb.rows.map(() => (tb.transpose ? 0 : tb.head?.length)));
            const heights = tablesOf(q).flatMap(tb => tb.rows.map(() => (tb.transpose ? tb.head?.length : 0)));
            normQuestion(q).forEach((n, i) => {
              if (widths[i] && n.cells.length !== widths[i]) err(at, `hàng ${i}: ${n.cells.length} ô, head có ${widths[i]}`);
              if (heights[i] && n.cells.length !== heights[i]) err(at, `cột ${i}: ${n.cells.length} ô, head có ${heights[i]}`);
              const blanks = n.cells.filter(c => c === '…').length;
              if (!blanks) err(at, `hàng ${i}: không có ô trống …`);
              if (n.ans.length !== blanks) err(at, `hàng ${i}: ${blanks} ô trống, có ${n.ans.length} đáp án`);
            });
            break;
          }
          case 'match':
            if (!Array.isArray(q.left) || !Array.isArray(q.right) || !Array.isArray(q.ans) || q.ans.length !== q.left.length) { err(at, 'left/right/ans lệch'); break; }
            if (q.ans.some(r => !(Number.isInteger(r) && r >= 0 && r < q.right.length))) err(at, 'ans ngoài phạm vi right');
            if (!q.multi && new Set(q.ans).size !== q.ans.length) err(at, 'hai ô trái cùng nối một ô phải (thêm multi: true nếu cố ý)');
            break;
          case 'draw':
            (q.items || []).forEach((s, si) => { if (!s.name || !(s.len > 0 && s.len <= 15)) err(at, `ý ${si}: name/len (1–15 cm)`); });
            break;
          case 'word': {
            const x = q.expr || {};
            for (const k of ['text', 'given', 'ask', 'hint', 'sentence', 'units']) if (!q[k]) err(at, `thiếu ${k}`);
            if (!OPS.includes(x.op)) err(at, `op "${x.op}" phải là + − × :`);
            const r = x.op === '+' ? x.a + x.b : x.op === '−' ? x.a - x.b : x.op === '×' ? x.a * x.b : x.a / x.b;
            if (r !== x.result) err(at, `${x.a} ${x.op} ${x.b} = ${r}, không phải ${x.result}`);
            if (!q.units?.includes(x.unit)) err(at, 'units phải có đơn vị đúng');
            if (new Set(q.units || []).size !== (q.units || []).length) err(at, 'units trùng nhau');
            if (!String(q.sentence?.at(-1)).endsWith(':')) err(at, 'mảnh cuối câu lời giải phải kết thúc bằng ":"');
            break;
          }
          case 'relation':
            if (q.numbers?.length !== 3) err(at, 'numbers cần 3 số');
            break;
          default: err(at, 'type lạ');
        }
      });
    });
    if (sheet.kind != null) await checkRoute(sheet, err, dir);
  }
}
/** Luật ma trận của một bài kiểm tra theo lộ trình (docs/kiem-tra-lo-trinh.md mục 1, 4, 10). */
async function checkRoute(sheet, err, dir) {
  let rule = BOOK_KINDS[sheet.after?.book]?.[sheet.kind] || KINDS[sheet.kind];
  if (!rule) { err('', `kind "${sheet.kind}" lạ`); return; }
  if (rule.tl && OLD_EXAM.books.includes(sheet.after?.book)) rule = OLD_EXAM.rule;
  if (rule.tl) {
    const tl = sheet.parts[1]?.questions.length ?? 0;
    if (sheet.parts.length !== 2 || tl < rule.tl[0] || tl > rule.tl[1]) err('', `Phần tự luận: ${tl} câu, cần ${rule.tl[0]} đến ${rule.tl[1]}`);
  }
  const { PLAN } = await import(pathToFileURL(`${dir}/plan.js`).href);
  const qsAll = sheet.parts.flatMap(p => p.questions);
  if (qsAll.length !== rule.n) err('', `${sheet.kind}: cần ${rule.n} câu, có ${qsAll.length}`);
  if (sheet.numbering !== 'continuous') err('', "numbering phải là 'continuous'");
  if (!(sheet.time > 0)) err('', 'thiếu time');
  const after = sheet.after;
  if (after?.book !== PLAN.book || !PLAN[sheet.kind]?.some(x => x.units === after.units)) err('', `khoảng Bài ${after?.units} không có trong plan.js (${sheet.kind})`);
  const know = await KNOWLEDGE[after?.book]?.();
  if (!know) { err('', `không có kiến thức của sách ${after?.book}`); return; }
  const units = unitList(after.units);
  const lv = [0, 0, 0, 0];
  let reviews = 0;
  qsAll.forEach((q, i) => {
    const at = `câu ${i + 1}`;
    if (![1, 2, 3].includes(q.level)) err(at, 'level phải là 1, 2, 3'); else lv[q.level]++;
    const bai = [].concat(q.bai ?? []);
    if (!bai.length) err(at, 'thiếu bai');
    bai.forEach(b => {
      if (!know[b]?.points) err(at, `Bài ${b} không có points`);
      else if (!(Number.isInteger(q.point) && (bai.length > 1 || q.point < know[b].points.length))) err(at, `point ${q.point} không có trong Bài ${b}`);
      if (q.review ? b >= units[0] : !units.includes(b)) err(at, q.review ? `câu ôn dùng Bài ${b} không ở trước khoảng` : `Bài ${b} không thuộc khoảng ${after.units}`);
    });
    if (q.review) reviews++;
  });
  rule.lv.forEach((want, l) => { if (Math.abs(lv[l + 1] - want) > 1) err('', `mức ${l + 1}: ${lv[l + 1]} câu, cần ${want} (±1)`); });
  const hit = (u) => qsAll.some(q => !q.review && [].concat(q.bai).includes(u));
  if (rule.review) {
    const [lo, hi] = units[0] === 1 && sheet.kind === 'tonghop' ? [0, 0] : rule.review;
    if (sheet.kind === 'nhanh' ? reviews > hi : reviews < lo || reviews > hi) err('', `câu ôn: ${reviews}, cần ${lo} đến ${hi}`);
    for (const u of units) if (know[u]?.points && !(PLAN.book === 'workbook1' && u === 1) && !hit(u)) err('', `Bài ${u} chưa có câu nào`);
  } else {
    // Giữa kì, cuối kì: mỗi nhóm nhanh trong khoảng có ít nhất 1 câu.
    for (const g of PLAN.nhanh) {
      const us = unitList(g.units);
      if (us.every(u => units.includes(u)) && !us.some(hit)) err('', `nhóm Nhanh ${g.n} (Bài ${g.units}) chưa có câu nào`);
    }
  }
}

console.log(`${files} file, ${qs} câu, ${errors} lỗi`);
process.exit(errors ? 1 : 0);
