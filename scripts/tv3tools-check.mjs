// Kiểm tra dữ liệu 🧰 Công cụ Tiếng Việt 3 (src/games/tv3Tools/data/*.js, bank.js) và Tiếng Việt 2 (tv2Tools/).
//   node scripts/tv3tools-check.mjs            → mọi tệp lớp 3
//   node scripts/tv3tools-check.mjs cd2        → một tệp
//   node scripts/tv3tools-check.mjs tv2 [cd1]  → Tiếng Việt 2
// Định dạng: docs/lop_3/sgk_tv3_tap1/thiet-ke-cong-cu.md §3 (lớp 2: docs/lop_2/vbt_tv2_tap1/thiet-ke-cong-cu.md).
import { pathToFileURL } from 'node:url';
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const args = process.argv.slice(2);
const tv2 = args[0] === 'tv2' && args.shift();
const root = join(dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..', 'src', 'games', tv2 ? 'tv2Tools' : 'tv3Tools');
const only = args[0];
const files = readdirSync(join(root, 'data')).filter(f => f.endsWith('.js') && (!only || f.startsWith(only))).map(f => join(root, 'data', f));
if (!only) files.push(join(root, 'bank.js'));

const RULES = ['ck', 'ggh', 'ngngh', 'chtr', 'sx', 'rdgi', 'ln', 'hoinga', 'ieuuou', 'iuuu', 'anang', 'songxong'];
const QW = ['Ai', 'Cái gì', 'Con gì', 'Làm gì', 'Thế nào', 'Là gì', 'Ở đâu', 'Khi nào', 'Vì sao', 'Để làm gì'];
const KEYS = new Set(['n', 'title', 'week', 'pages', 'learn', 'skills', 'notes', 'mix', 'kinds', 'find', 'sentype', 'build', 'match', 'purpose', 'punct', 'colon',
  'vocab', 'fill', 'antonym', 'synonym', 'compare', 'question', 'meaning', 'caps', 'alpha', 'para', 'spell', 'spellx']);
let errors = 0, warns = 0;
const err = (w, m) => { errors++; console.log(`  ✗ ${w}: ${m}`); };
const warn = (w, m) => { warns++; console.log(`  ! ${w}: ${m}`); };
// [pre, lead*, từ, *role, role, post] như parseTap trong play.js: "*" sau từ hoặc trước từ
const tapToks = (s) => s.trim().split(/\s+/).map(raw => { const m = raw.match(/^([("“]*)(\*?)(.*?)(\*([a-z]?))?([.,!?:;…”")]*)$/); return m && [m[0], m[1], m[3], m[4] || (m[2] ? '*' : undefined), m[5] || '', m[6]]; });

for (const file of files) {
  const mod = await import(pathToFileURL(file).href);
  const list = file.endsWith('bank.js') ? [mod.BANK] : mod.default;
  console.log(`${file.split(/[\\/]/).pop()}: ${list.length} mục`);
  for (const L of list) {
    const w = L.n !== undefined ? `Bài ${L.n}` : 'bank';
    for (const k of Object.keys(L)) if (!KEYS.has(k)) err(w, `khoá lạ "${k}"`);
    if (L.n !== undefined && (!L.title || !Array.isArray(L.pages))) err(w, 'thiếu title / pages');
    const all = JSON.stringify(L);
    if (all.includes('—')) err(w, 'có dấu gạch dài —');
    for (const x of L.notes || []) if (!x.title || !x.text) err(w, `ghi nhớ thiếu title/text`);
    for (const [c, a] of Object.entries(L.kinds || {})) {
      if (!['sv', 'hd', 'dd'].includes(c)) err(w, `kinds.${c}`);
      const dup = a.filter((x, i) => a.indexOf(x) !== i); if (dup.length) warn(w, `kinds.${c} trùng: ${dup}`);
    }
    const kv = L.kinds ? Object.entries(L.kinds).flatMap(([c, a]) => a.map(x => [x, c])) : [];
    for (const [x, c] of kv) { const o = kv.find(([y, d]) => y === x && d !== c); if (o) err(w, `"${x}" ở cả kinds.${c} và kinds.${o[1]}`); }
    for (const it of L.find || []) {
      if (!['sv', 'hd', 'dd'].includes(it.k)) err(w, `find.k: ${it.s}`);
      const n = tapToks(it.s).filter(m => m && m[3]).length;
      if (!n || n > 4) err(w, `find cần 1–4 dấu *: ${it.s}`);
      if (/[^\s]\*[a-z]/.test(it.s)) err(w, `find không dùng *a/*b: ${it.s}`);
    }
    for (const s of L.compare || []) {
      const roles = tapToks(s).filter(m => m && m[3]).map(m => m[4]);
      for (const r of ['a', 'w', 'b']) if (!roles.includes(r)) err(w, `compare thiếu *${r}: ${s}`);
      if (roles.some(r => !['a', 'w', 'b'].includes(r))) err(w, `compare chỉ dùng *a *w *b: ${s}`);
    }
    for (const x of L.sentype || []) if (!['gt', 'hd', 'dd'].includes(x[1])) err(w, `sentype: ${x}`);
    for (const x of L.purpose || []) if (!['ke', 'hoi', 'cam', 'khien'].includes(x[1])) err(w, `purpose: ${x}`);
    for (const x of L.colon || []) if (!['lk', 'gt', 'ln'].includes(x[1]) || !x[0].includes(':')) err(w, `colon: ${x}`);
    for (const s of L.build || []) {
      const p = s.split(' / ');
      if (p.length < 2 || p.length > 7) err(w, `build cần 2–7 mảnh: ${s}`);
      if (!/[.?!…]$/.test(s)) err(w, `build thiếu dấu cuối: ${s}`);
      if (new Set(p).size !== p.length) err(w, `build có mảnh trùng: ${s}`);
    }
    if (L.match && L.match.length < 3) warn(w, 'match < 3 cặp');
    for (const s of L.punct || []) { const m = s.match(/\{(.+?)\}/g); if (!m || m.length !== 1 || !['.', '?', '!', ':', ','].includes(m[0].slice(1, -1))) err(w, `punct: ${s}`); }
    for (const it of L.fill || []) {
      const m = it.s.match(/\{(.+?)\}/g);
      if (!m || m.length !== 1) err(w, `fill cần đúng một {…}: ${it.s}`);
      else if (!it.opts?.includes(m[0].slice(1, -1))) err(w, `fill opts thiếu đáp án: ${it.s}`);
      if (it.opts && new Set(it.opts).size !== it.opts.length) err(w, `fill opts trùng: ${it.s}`);
    }
    for (const it of L.question || []) {
      if (!QW.includes(it.q)) err(w, `question.q "${it.q}"`);
      if (!/\[.+?\]/.test(it.s)) err(w, `question thiếu [ ]: ${it.s}`);
    }
    if (L.vocab) for (const v of [].concat(L.vocab)) {
      const g = Object.entries(v.groups || {});
      if (!v.name || g.length < 2) err(w, 'vocab cần name + ≥ 2 nhóm');
      for (const [k, a] of g) if (a.length < 3) err(w, `vocab nhóm "${k}" < 3 từ`);
      const flat = g.flatMap(([, a]) => a); const dup = flat.filter((x, i) => flat.indexOf(x) !== i); if (dup.length) err(w, `vocab từ ở hai nhóm: ${dup}`);
    }
    for (const x of L.meaning || []) if (!Array.isArray(x) || x.length !== 2) err(w, `meaning: ${x}`);
    for (const x of [...(L.antonym || []), ...(L.synonym || [])]) if (!Array.isArray(x) || x.length !== 2) err(w, `cặp từ: ${x}`);
    for (const x of L.caps || []) if (x.split(' ').some(t => t[0] !== t[0].toUpperCase())) err(w, `caps chưa viết hoa đủ: ${x}`);
    if (L.alpha) {
      const first = (x) => x.trim().charAt(0).toLowerCase().normalize('NFD').replace(/[̣̀́̃̉]/g, '');
      if (new Set(L.alpha.map(first)).size < 4) err(w, 'alpha cần ≥ 4 chữ cái đầu khác nhau');
    }
    if (tv2) for (const k of ['purpose', 'colon', 'compare']) if (L[k]) warn(w, `lớp 2 thường không có ${k}`);
    if (tv2) for (const x of L.punct || []) if (x.includes('{:}')) err(w, `lớp 2 chưa học dấu hai chấm: ${x}`);
    for (const p of L.para || []) {
      if (!p.title || !(p.sents?.length >= 3 && p.sents.length <= 5)) err(w, `para cần title + 3–5 câu`);
      if (p.loose && !(p.loose[0] >= 0 && p.loose[1] > p.loose[0] && p.loose[1] < p.sents.length)) err(w, `para.loose sai: ${p.title}`);
    }
    for (const r of L.spell || []) if (!RULES.includes(r)) err(w, `spell "${r}" không có trong rules.js`);
    for (const s of L.spellx || []) if (!/\{[^|{}]+\|[^{}]+\}/.test(s)) err(w, `spellx: ${s}`);
  }
}
console.log(errors ? `\n${errors} lỗi, ${warns} cảnh báo` : `\nOK (${warns} cảnh báo)`);
process.exit(errors ? 1 : 0);
