/**
 * Kiểm tra ngân hàng câu soạn tay của 🏆 Đấu Trường Nhí (src/dauTruong/bank/g1.js … g5.js).
 * `node scripts/dautruong-check.mjs [lớp…] [--show] [--stats]`
 * Cùng kiểm ngân hàng HK I theo vòng src/dauTruong/bank/hk1/g<lớp>/{kd,tt,vd}.js (w 1–18, lv 1–5, tt.js có `tt`, vd.js có `pt`,
 * `fig` đúng loại và đủ trường, phương án thẻ hình "[tri.red …]" đúng tên thẻ).
 *
 * Mỗi câu: { w: tuần học 1–35, m: 'toan' | 'tv', k?: 'abcd' (mặc định) | 'order', lv: 1–3, t: chủ đề, q, o: [4], ex? }
 *   abcd: o[0] là đáp án đúng (máy xáo khi hỏi). order: o là 4 mảnh theo THỨ TỰ ĐÚNG.
 * Báo lỗi: thiếu trường, sai kiểu, phương án trùng, chữ quá dài so với nút / màn LED, câu trùng nhau, gạch ngang dài "—",
 * chữ "nhé", câu phủ định kiểu "không phải", "tất cả đều đúng", số thập phân viết dấu chấm.
 */
import { readdirSync, existsSync } from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const dir = join(dirname(fileURLToPath(import.meta.url)), '../src/dauTruong/bank');
const args = process.argv.slice(2);
const show = args.includes('--show'), stats = args.includes('--stats');
const only = args.filter(a => /^[1-5]$/.test(a)).map(Number);
const files = readdirSync(dir).filter(f => /^g[1-5]\.js$/.test(f)).filter(f => !only.length || only.includes(+f[1]))
  .map(f => ({ f, g: +f[1], round: null }));
for (let g = 1; g <= 5; g++) for (const r of ['kd', 'tt', 'vd']) {
  if (only.length && !only.includes(g)) continue;
  if (existsSync(join(dir, `hk1/g${g}/${r}.js`))) files.push({ f: `hk1/g${g}/${r}.js`, g, round: r });
}
const { FIG_TYPES, parseTok } = await import(pathToFileURL(join(dir, '../figs.js')).href);
/** Trường bắt buộc của từng loại hình. */
const NEED = {
  tokens: f => Array.isArray(f.rows || f.row), clock: f => Number.isInteger(f.h) && f.h >= 0 && f.h <= 12 && Number.isInteger(f.m ?? 0) && (f.m ?? 0) < 60,
  numline: f => typeof f.from === 'number' && typeof f.to === 'number' && f.to > f.from && (f.to - f.from) / (f.step || 1) <= 24,
  frac: f => f.n > 0 && f.k >= 0 && f.k <= f.n, grid: f => f.cols > 0 && f.rows > 0, poly: f => Array.isArray(f.pts) && f.pts.length >= 3,
  lines: f => f.pts && typeof f.pts === 'object' && (f.segs || []).concat(f.dash || []).every(([a, b]) => f.pts[a] && f.pts[b]),
  angle: f => f.deg > 0 && f.deg <= 180, bars: f => Array.isArray(f.values) && f.labels?.length === f.values.length,
  table: f => Array.isArray(f.rows), money: f => Array.isArray(f.items) && f.items.length <= 8, ruler: f => f.len > 0,
  balance: f => Array.isArray(f.left) && Array.isArray(f.right), cubes: f => Array.isArray(f.cols),
  calendar: f => f.days >= 28 && f.days <= 31 && f.start >= 0 && f.start <= 6, thermo: f => typeof f.v === 'number',
  jug: f => Array.isArray(f.items) && f.items.every(i => i.cap > 0 && i.v >= 0 && i.v <= i.cap), text: f => Array.isArray(f.lines),
  vcalc: f => f.a != null && f.b != null,
};
function figErrors(fig) {
  const out = [];
  for (const f of [].concat(fig)) {
    if (!f || !FIG_TYPES.includes(f.type)) { out.push(`loại hình lạ: ${f?.type}`); continue; }
    if (!NEED[f.type](f)) out.push(`hình ${f.type} thiếu / sai trường`);
    const toks = f.type === 'tokens' ? (f.rows || [f.row]).flat() : f.type === 'balance' ? [...f.left, ...f.right] : [];
    for (const t of toks) if (/^[a-z]+\./.test(String(t)) && parseTok(t).kind === 'text') out.push(`thẻ lạ: ${t}`);
  }
  return out;
}

const MAX_Q = 170, MAX_O = 38, MAX_PIECE = 26, MAX_EX = 170;
let errors = 0;
const err = (g, i, q, msg) => { errors++; console.log(`L${g} #${i} (${q?.q?.slice(0, 50) ?? '?'}): ${msg}`); };

for (const { f, g, round } of files) {
  const bank = (await import(pathToFileURL(join(dir, f)).href)).default;
  if (!Array.isArray(bank)) { errors++; console.log(`${f}: export default phải là mảng`); continue; }
  const seen = new Map();
  const count = {};
  bank.forEach((q, i) => {
    const k = q.k || 'abcd';
    const maxW = round ? 18 : 35;
    if (!Number.isInteger(q.w) || q.w < 1 || q.w > maxW) err(g, i, q, `w phải là tuần 1–${maxW} (${q.w})`);
    if (round && ![1, 2, 3, 4, 5].includes(q.lv)) err(g, i, q, 'lv phải là 1–5');
    if (round === 'tt' && !['seq', 'shape', 'facts', 'logic'].includes(q.tt)) err(g, i, q, `tt phải là seq | shape | facts | logic`);
    if (round === 'vd' && ![10, 20, 30].includes(q.pt)) err(g, i, q, 'pt phải là 10 | 20 | 30');
    if (round && round !== 'tt' && k === 'order') err(g, i, q, 'Khởi động / Về đích chỉ có câu abcd');
    if (q.fig) for (const e of figErrors(q.fig)) err(g, i, q, e);
    for (const o of q.o || []) {
      const m = String(o).match(/^\[(.+)\]$/);
      if (m) for (const t of m[1].trim().split(/\s+/)) if (/^[a-z]+\./.test(t) && parseTok(t).kind === 'text') err(g, i, q, `thẻ lạ trong phương án: ${t}`);
    }
    if (!['toan', 'tv'].includes(q.m)) err(g, i, q, `m phải là 'toan' | 'tv'`);
    if (!['abcd', 'order'].includes(k)) err(g, i, q, `k lạ: ${k}`);
    if (!round && ![1, 2, 3].includes(q.lv)) err(g, i, q, `lv phải là 1–3`);
    if (typeof q.t !== 'string' || !q.t) err(g, i, q, 'thiếu t (chủ đề)');
    if (typeof q.q !== 'string' || !q.q.trim()) { err(g, i, q, 'thiếu q'); return; }
    if (!Array.isArray(q.o) || q.o.length !== 4 || !q.o.every(o => typeof o === 'string' && o.trim())) { err(g, i, q, 'o phải là 4 chuỗi khác rỗng'); return; }
    if (new Set(q.o.map(o => o.trim().toLowerCase())).size !== 4) err(g, i, q, `phương án trùng: ${q.o.join(' | ')}`);
    if (q.q.length > (q.fig ? 120 : MAX_Q)) err(g, i, q, `câu dài ${q.q.length} > ${MAX_Q}`);
    const lim = k === 'order' ? MAX_PIECE : MAX_O;
    for (const o of q.o) if (!/^\[.+\]$/.test(o) && o.length > lim) err(g, i, q, `phương án dài ${o.length} > ${lim}: "${o}"`);
    if (q.ex != null && (typeof q.ex !== 'string' || q.ex.length > MAX_EX)) err(g, i, q, `ex dài hoặc sai kiểu`);
    const all = [q.q, ...q.o, q.ex || ''].join(' ');
    if (/—/.test(all)) err(g, i, q, 'có gạch ngang dài "—"');
    if (/\bnhé\b/i.test(all)) err(g, i, q, 'có chữ "nhé"');
    const qo = q.q + ' ' + q.o.join(' ');
    if (/tất cả đều|cả (a|b|c|ba|bốn) (đáp án|phương án)|không phải là/i.test(qo) || /KHÔNG/.test(qo)) err(g, i, q, 'câu phủ định / "tất cả đều đúng"');
    if (q.m === 'toan' && [q.q, ...q.o].some(t => /\d\.\d/.test(t))) err(g, i, q, 'số thập phân phải viết dấu phẩy');
    if (/undefined|NaN|\$\{/.test(all)) err(g, i, q, 'chữ lỗi');
    const key = q.q.trim().toLowerCase() + '|' + JSON.stringify(q.fig || '') + '|' + (k === 'order' ? q.o.join('|') : q.o[0]);
    if (seen.has(key)) err(g, i, q, `trùng câu #${seen.get(key)}`); else seen.set(key, i);
    const c = `${q.m}/${k}${q.fig ? '/hình' : ''}`; count[c] = (count[c] || 0) + 1;
    if (show) console.log(`L${g} w${q.w} ${q.m} ${k} lv${q.lv} [${q.t}] ${q.q}  [${q.o.join(' | ')}]`);
  });
  const weeks = new Set(bank.map(q => q.w));
  const topics = {};
  for (const q of bank) topics[`${q.m}:${q.t}`] = (topics[`${q.m}:${q.t}`] || 0) + 1;
  const tvEarly = bank.filter(q => q.m === 'tv' && q.w <= 4).length, toanEarly = bank.filter(q => q.m === 'toan' && q.w <= 4).length;
  if (round) {
    const by = (fn) => { const o = {}; for (const q of bank) { const v = fn(q); o[v] = (o[v] || 0) + 1; } return JSON.stringify(o); };
    const figs = {}; for (const q of bank) for (const f of [].concat(q.fig || [])) figs[f.type] = (figs[f.type] || 0) + 1;
    console.log(`${f}: ${bank.length} câu ${JSON.stringify(count)} · ${weeks.size} tuần · ${Object.keys(topics).length} chủ đề · lv ${by(q => q.lv)}${round === 'tt' ? ` · tt ${by(q => q.tt)}` : ''}${round === 'vd' ? ` · pt ${by(q => q.pt)}` : ''} · hình ${JSON.stringify(figs)}`);
    if (stats) for (const [t, n] of Object.entries(topics).sort()) console.log(`   ${t}: ${n}`);
    continue;
  }
  console.log(`Lớp ${g}: ${bank.length} câu ${JSON.stringify(count)} · ${weeks.size} tuần · ${Object.keys(topics).length} chủ đề · tuần 1–4: TV ${tvEarly}, Toán ${toanEarly}`);
  if (stats) for (const [t, n] of Object.entries(topics).sort()) console.log(`   ${t}: ${n}`);
}
console.log(errors ? `${errors} lỗi` : 'Không lỗi');
process.exit(errors ? 1 : 0);
