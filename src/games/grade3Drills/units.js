/**
 * ⚖️ Đổi đơn vị đo (Toán 3: Bài 30 Mi-li-mét, Bài 31 Gam, Bài 32 Mi-li-lít, Bài 34, ôn tập đo lường Bài 43, 79;
 * km, m ôn từ lớp 2). Năm cấp: độ dài; khối lượng và dung tích; tính với số đo; so sánh số đo; trộn.
 *
 * Mỗi bài có một hình đo vẽ đúng tỉ lệ để kiểm chứng đáp số:
 *   độ dài: thanh màu nằm trên thước (1 cm có 10 vạch mm, thước mét có vạch cm); mỗi khúc "1 dm" là một ô;
 *   khối lượng: cân đồng hồ (kim chỉ đúng số gam) và khay quả cân, túi hàng (diện tích ∝ số gam);
 *   dung tích: ca đo có vạch ml và khay chai 1 l, cốc ml (diện tích ∝ số ml).
 * Em gõ số vào ô (bàn phím của kit giữ chỗ từ đầu lượt). Đúng: hình kiểm chứng chạy (quả cân bay lên đĩa cân, chai rót
 * vào ca, thẻ "10 cm" bay vào từng khúc, chữ dưới hình đếm 10 cm, 20 cm, 30 cm…). Sai: thầy nhắc quy tắc đổi
 * ("1 dm = 10 cm. 3 dm là 3 lần 10 cm."), sai lần nữa thầy nói đáp số.
 * So sánh: đổi số đo có đơn vị lớn ra đơn vị bé trước (một ô), rồi chọn dấu > < = bằng nút to; thanh / kim / mực nước
 * của số lớn hơn sáng lên.
 * Bố cục không đổi trong lượt: dòng đề, dòng "Đổi" (thẻ quy tắc), hình đo, (so sánh) hàng nút dấu, đều giữ chỗ từ đầu.
 */

import { mountDrill, shake, setActive, flyDigit, flyOne, fmt, fresh, sfx, sleep, how, popIn, TEACHER, INK } from './kit.js';

// ── Đơn vị ──────────────────────────────────────────────────────────────────────────────────────────
// Giá trị gốc: độ dài theo mm, khối lượng theo g, dung tích theo ml.
const U = { km: 1e6, m: 1000, dm: 100, cm: 10, mm: 1, kg: 1000, g: 1, l: 1000, ml: 1 };
const DIM = { km: 'len', m: 'len', dm: 'len', cm: 'len', mm: 'len', kg: 'mass', g: 'mass', l: 'cap', ml: 'cap' };
const NAME = { km: 'ki-lô-mét', m: 'mét', dm: 'đề-xi-mét', cm: 'xăng-ti-mét', mm: 'mi-li-mét', kg: 'ki-lô-gam', g: 'gam', l: 'lít', ml: 'mi-li-lít' };
const SIGN_SAY = { '>': 'lớn hơn', '<': 'bé hơn', '=': 'bằng' };

/** Số đo nhiều đơn vị: [[2, 'm'], [5, 'cm']] → giá trị gốc / chữ "2 m 5 cm". */
const val = (q) => q.reduce((s, [n, u]) => s + n * U[u], 0);
const qText = (q) => q.map(([n, u]) => `${fmt(n)} ${u}`).join(' ');
// Chữ "l" (lít) viết nghiêng kiểu chữ có chân như cả app (engine/pourPlay.js): "1 l" không bị đọc thành "11".
const LIT_RE = /(\d) l(?![a-zà-ỹ0-9])/gi;
const hl = (str) => String(str).replace(LIT_RE, '$1 <i style="font-family:Georgia,serif">l</i>');
const sl = (str) => String(str).replace(LIT_RE, '$1 <tspan font-family="Georgia, Times New Roman, serif" font-style="italic" font-weight="400">l</tspan>');
const R = (rng, a, b, s = 1) => a + s * rng.int(0, Math.floor((b - a) / s));
const ratioOf = (big, small) => U[big] / U[small];

/** Câu cho giọng đọc: đơn vị đọc thành tên ("3 dm" → "3 đề-xi-mét"), dấu phép tính thành chữ. */
function spk(s) {
  return String(s).replace(/<[^>]*>/g, '').replace(/💡\s*/g, '')
    .replace(/(\d)\s?(km|mm|cm|dm|kg|ml|m|g|l)(?![a-zà-ỹ])/gi, (_, d, u) => `${d} ${NAME[u]}`)
    .replace(/ − /g, ' trừ ').replace(/ × /g, ' nhân ').replace(/ : (?=\d)/g, ' chia ')
    .replace(/ > /g, ' lớn hơn ').replace(/ < /g, ' bé hơn ').replace(/ = /g, ' bằng ');
}

// ── Sinh đề ─────────────────────────────────────────────────────────────────────────────────────────
// Số lớn nhất của đơn vị lớn ở mỗi cặp (giữ hình vừa thước, cân, ca đo; số đo như đồ vật thật).
const MAXN = { 'm-cm': 9, 'm-dm': 9, 'dm-cm': 9, 'cm-mm': 9, 'm-mm': 3, 'km-m': 5, 'kg-g': 5, 'l-ml': 3 };
const MIXMAX = { 'm-cm': 4, 'dm-cm': 9, 'cm-mm': 9, 'm-dm': 5, 'kg-g': 3, 'l-ml': 2 };

/** Phần lẻ của đơn vị bé trong số đo ghép (2 m 5 cm, 3 kg 200 g). */
function smallPart(rng, r) {
  if (r === 10) return R(rng, 1, 9);
  if (r === 100) return rng() < 0.3 ? R(rng, 1, 9) : R(rng, 10, 95, 5);
  return R(rng, 100, 900, 50);
}

const conv = (from, to) => ({ t: 'conv', dim: DIM[to], from, to, ans: val(from) / U[to] });

/** mode: b2s (3 dm = … cm), s2b (300 cm = … m), mix (2 m 5 cm = … cm). */
function makeConv(rng, [big, small], mode) {
  const key = `${big}-${small}`, r = ratioOf(big, small);
  if (mode === 'b2s') return conv([[rng() < 0.2 ? 1 : R(rng, 2, MAXN[key]), big]], small);
  if (mode === 's2b') return conv([[R(rng, 2, MAXN[key]) * r, small]], big);
  return conv([[R(rng, 1, MIXMAX[key]), big], [smallPart(rng, r), small]], small);
}

const LEN_PAIRS = {
  b2s: [['m', 'cm'], ['m', 'dm'], ['dm', 'cm'], ['cm', 'mm'], ['m', 'mm'], ['km', 'm']],
  s2b: [['m', 'cm'], ['cm', 'mm'], ['dm', 'cm'], ['m', 'dm'], ['km', 'm']],
  mix: [['m', 'cm'], ['dm', 'cm'], ['cm', 'mm'], ['m', 'dm']],
};
const MC = { mass: ['kg', 'g'], cap: ['l', 'ml'] };

function genLen(rng, k) {
  const mode = ['b2s', 's2b', 'mix', 'b2s', 's2b'][k % 5];
  return makeConv(rng, rng.pick(LEN_PAIRS[mode]), mode);
}
function genMassCap(rng, k) {
  const plan = [['mass', 'b2s'], ['cap', 'b2s'], ['mass', 'mix'], ['cap', 'mix'], [rng() < 0.5 ? 'mass' : 'cap', 's2b']][k % 5];
  return makeConv(rng, MC[plan[0]], plan[1]);
}

/** Tính với số đo. op: add, sub, mul, div, csub (1 kg − 350 g: đổi trước rồi trừ). */
function makeCalc(rng, op, dim) {
  const base = { t: 'calc', dim, conv: false };
  if (op === 'add') {
    if (dim === 'len') { const a = R(rng, 120, 450, 10); return { ...base, op: '+', a: [a, 'mm'], b: R(rng, 30, Math.min(400, 600 - a), 10), u: 'mm' }; }
    const u = dim === 'mass' ? 'g' : 'ml', a = R(rng, 100, 700, 50);
    return { ...base, op: '+', a: [a, u], b: R(rng, 100, 1000 - a, 50), u };
  }
  if (op === 'sub') {
    if (dim === 'len') { const a = R(rng, 200, 600, 10); return { ...base, op: '−', a: [a, 'mm'], b: R(rng, 40, a - 60, 10), u: 'mm' }; }
    const u = dim === 'mass' ? 'g' : 'ml', a = R(rng, 400, 1000, 50);
    return { ...base, op: '−', a: [a, u], b: R(rng, 100, a - 150, 50), u };
  }
  if (op === 'mul') {
    if (dim === 'len') { const a = R(rng, 12, 48); return { ...base, op: '×', a: [a, 'mm'], b: R(rng, 2, a > 30 ? 3 : 4), u: 'mm' }; }
    const u = dim === 'mass' ? 'g' : 'ml', a = rng.pick(dim === 'mass' ? [100, 125, 150, 200, 250] : [100, 150, 200, 250, 300]);
    return { ...base, op: '×', a: [a, u], b: R(rng, 2, Math.min(4, Math.floor(1000 / a))), u };
  }
  if (op === 'div') {
    if (dim === 'len') { const q = R(rng, 6, 30), d = R(rng, 2, 4); return { ...base, op: ':', a: [q * d, 'mm'], b: d, u: 'mm' }; }
    const q = rng.pick([100, 150, 200, 250, 300]), d = R(rng, 2, 3);
    return { ...base, dim: 'cap', op: ':', a: [q * d, 'ml'], b: d, u: 'ml' };
  }
  // csub
  if (dim === 'len') return { ...base, conv: true, op: '−', a: [1, 'm'], b: R(rng, 5, 95, 5), u: 'cm' };
  if (dim === 'mass') return { ...base, conv: true, op: '−', a: [rng() < 0.7 ? 1 : 2, 'kg'], b: R(rng, 100, 900, 50), u: 'g' };
  return { ...base, conv: true, op: '−', a: [1, 'l'], b: R(rng, 100, 900, 50), u: 'ml' };
}
const calcAns = (m) => { const A = val([m.a]) / U[m.u]; return m.op === '+' ? A + m.b : m.op === '−' ? A - m.b : m.op === '×' ? A * m.b : A / m.b; };
function genCalc(rng, k) {
  const op = ['add', 'sub', 'mul', 'csub', 'div'][k % 5];
  const dims = op === 'div' ? ['len', 'cap'] : ['len', 'mass', 'cap'];
  const m = makeCalc(rng, op, rng.pick(dims));
  return { ...m, ans: calcAns(m) };
}

/** So sánh: kind = cặp đơn vị hoặc 'mix' (1 m 5 cm … 150 cm). */
const CMP_KINDS = [['m', 'cm'], ['dm', 'cm'], ['cm', 'mm'], ['kg', 'g'], ['l', 'ml'], ['mix', 'cm']];
function makeCmp(rng, [big, small]) {
  const q = big === 'mix' ? [[1, 'm'], [R(rng, 5, 95, 5), 'cm']]
    : [[R(rng, 1, big === 'l' ? 3 : big === 'kg' ? 4 : big === 'm' ? 5 : 9), big]];
  const V = val(q) / U[small];
  const r = big === 'mix' ? 100 : ratioOf(big, small);
  let other = V;
  if (rng() >= 0.2) {
    const mag = r === 10 ? R(rng, 1, 6) : r === 100 ? R(rng, 5, 60, 5) : R(rng, 50, 600, 50);
    other = rng() < 0.5 && V - mag > 0 ? V - mag : V + mag;
  }
  const oq = [[other, small]];
  const bigLeft = rng() < 0.6;
  const [lv, rv] = bigLeft ? [V, other] : [other, V];
  return { t: 'cmp', dim: DIM[small], left: bigLeft ? q : oq, right: bigLeft ? oq : q, bigSide: bigLeft ? 0 : 1, u: small, conv: V, ans: lv > rv ? '>' : lv < rv ? '<' : '=' };
}
const genCmp = (rng, k) => makeCmp(rng, CMP_KINDS[(k + rng.int(0, 5)) % CMP_KINDS.length]);

/** Đề dạng chữ (khoá chống trùng trong ván). */
function probText(m) {
  if (m.t === 'conv') return `${qText(m.from)} = … ${m.to}`;
  if (m.t === 'calc') return `${qText([m.a])} ${m.op} ${m.op === '+' || m.op === '−' ? `${fmt(m.b)} ${m.u}` : m.b} = … ${m.u}`;
  return `${qText(m.left)} … ${qText(m.right)}`;
}

export const UNITS_LEVELS = [
  {
    id: 'drill-unit-1', n: 1, title: 'Đổi đơn vị độ dài', missions: 5,
    desc: 'Vd. 3 dm = 30 cm, 4 cm = 40 mm, 2 m 5 cm = 205 cm.', knowledge: 'm, dm, cm, mm: 1 m = 10 dm = 100 cm, 1 cm = 10 mm', lessons: { workbook: ['bai-30', 'bai-43'] },
    ask: () => 'Nhớ: 1 m = 10 dm = 100 cm, 1 cm = 10 mm. Đổi rồi xem thước!',
    gen: genLen,
  },
  {
    id: 'drill-unit-2', n: 2, title: 'Đổi gam, ki-lô-gam, mi-li-lít, lít', missions: 5,
    desc: 'Vd. 1 kg = 1 000 g, 2 l = 2 000 ml, 3 kg 200 g = 3 200 g.', knowledge: '1 kg = 1 000 g, 1 l = 1 000 ml', lessons: { workbook: ['bai-31', 'bai-32', 'bai-34'] },
    ask: () => 'Nhớ: 1 kg = 1 000 g, 1 l = 1 000 ml. Đổi rồi xem cân, xem ca đo!',
    gen: genMassCap,
  },
  {
    id: 'drill-unit-3', n: 3, title: 'Tính với số đo', missions: 5,
    desc: 'Vd. 350 g + 650 g = 1 000 g, 1 l − 250 ml = 750 ml, 45 mm × 2 = 90 mm.', knowledge: 'cộng, trừ, nhân, chia số đo cùng đơn vị', lessons: { workbook: ['bai-30', 'bai-31', 'bai-32'] },
    ask: () => 'Tính như với số tự nhiên rồi viết thêm đơn vị. Khác đơn vị thì đổi trước!',
    gen: genCalc,
  },
  {
    id: 'drill-unit-4', n: 4, title: 'So sánh số đo', missions: 5,
    desc: 'Vd. 2 m … 150 cm: đổi 2 m = 200 cm, rồi chọn dấu >.', knowledge: 'đổi về cùng đơn vị rồi so sánh', lessons: { workbook: ['bai-30', 'bai-34', 'bai-79'] },
    ask: () => 'Đổi về cùng một đơn vị rồi mới so sánh!',
    gen: genCmp,
  },
  {
    id: 'drill-unit-5', n: 5, title: 'Trộn các dạng', missions: 6,
    desc: 'Đổi đơn vị, tính với số đo và so sánh số đo, trộn lẫn.', knowledge: 'đơn vị đo độ dài, khối lượng, dung tích', lessons: { workbook: ['bai-43', 'bai-79'] },
    ask: () => 'Đọc kĩ đơn vị trước khi tính!',
    gen: (rng, k) => [genLen, genCalc, genCmp, genMassCap, genCalc, genCmp][k % 6](rng, rng.int(0, 4)),
  },
];

// ── Hình đo (SVG 1000 × 500) ────────────────────────────────────────────────────────────────────────
const VW = 1000;
// Chiều cao viewBox theo hình dạng vùng hình đo (đo một lần khi dựng bài): ngang ≈ 500, dọc cao hơn để hình to hết chỗ.
let VH = 500;
let uidN = 0;
const NICE = (x) => { let p = 1; while (p * 10 <= x) p *= 10; for (const k of [1, 2, 5, 10]) if (k * p >= x) return k * p; return 10 * p; };
const nextNice = (x) => NICE(x + 1e-6 + x * 0.01);
const textW = (s, fs) => String(s).length * fs * 0.64;
const SW = `stroke="${INK}" stroke-linejoin="round"`;
const COL = { a: '#BFDBFE', b: '#FBCFE8', part: '#BFDBFE', ghost: '#FFFFFF' };
const WATER = { a: '#7DD3FC', b: '#38BDF8' };

/** Kích thước đồ vật (diện tích ∝ số đo; mẫu: 1 000 g / 1 000 ml). */
const BASE = { kgw: [96, 94], bag: [90, 100], bottle: [64, 140], cup: [96, 94] };
function dims(o) {
  const [w, h] = BASE[o.kind === 'plate' ? 'bag' : o.kind];
  const s = Math.sqrt((o.kind === 'kgw' ? 1000 : o.v) / 1000);
  if (o.kind === 'plate') return [Math.max(130, w * s + 34), h * s + 22];
  return [w * s, h * s];
}

/** Vẽ một đồ vật trong toạ độ riêng (0, 0)–(w, h). */
function objSvg(o, w, h, hatch) {
  const st = `${SW} stroke-width="3"`;
  if (o.kind === 'kgw') return `<path d="M${w * 0.36} ${h * 0.33} Q${w * 0.36} ${h * 0.03} ${w * 0.5} ${h * 0.03} Q${w * 0.64} ${h * 0.03} ${w * 0.64} ${h * 0.33}" fill="none" stroke="${INK}" stroke-width="${Math.max(4, w * 0.08)}"/>
    <path d="M${w * 0.2} ${h * 0.3} H${w * 0.8} L${w} ${h} H0 Z" fill="#64748B" ${st}/>
    <text x="${w / 2}" y="${h * 0.84}" text-anchor="middle" font-size="${h * 0.3}" font-weight="900" fill="#fff" font-family="'Baloo 2', sans-serif">1 kg</text>`;
  if (o.kind === 'bag') return `<path d="M${w * 0.3} ${h * 0.3} L${w * 0.36} ${h * 0.06} Q${w * 0.5} ${h * 0.12} ${w * 0.64} ${h * 0.06} L${w * 0.7} ${h * 0.3} Z" fill="${o.cut ? `url(#${hatch})` : '#FDE68A'}" ${st}/>
    <path d="M${w * 0.18} ${h * 0.3} H${w * 0.82} Q${w * 1.02} ${h} ${w * 0.8} ${h} H${w * 0.2} Q${-w * 0.02} ${h} ${w * 0.18} ${h * 0.3} Z" fill="${o.cut ? `url(#${hatch})` : '#FDE68A'}" ${st}/>
    <path d="M${w * 0.3} ${h * 0.3} H${w * 0.7}" stroke="#B45309" stroke-width="4"/>`;
  if (o.kind === 'bottle') return `<rect x="${w * 0.32}" y="0" width="${w * 0.36}" height="${h * 0.1}" rx="3" fill="#EF4444" ${st}/>
    <path d="M${w * 0.36} ${h * 0.1} V${h * 0.2} Q${w * 0.04} ${h * 0.26} ${w * 0.04} ${h * 0.4} V${h * 0.94} Q${w * 0.04} ${h} ${w * 0.14} ${h} H${w * 0.86} Q${w * 0.96} ${h} ${w * 0.96} ${h * 0.94} V${h * 0.4} Q${w * 0.96} ${h * 0.26} ${w * 0.64} ${h * 0.2} V${h * 0.1} Z" fill="#F0F9FF" ${st}/>
    <g class="g3u-liq"${o.empty ? ' style="opacity:0"' : ''}><path d="M${w * 0.1} ${h * 0.42} H${w * 0.9} V${h * 0.93} Q${w * 0.9} ${h * 0.97} ${w * 0.84} ${h * 0.97} H${w * 0.16} Q${w * 0.1} ${h * 0.97} ${w * 0.1} ${h * 0.93} Z" fill="${WATER.a}"/></g>`;
  if (o.kind === 'cup') return `<path d="M0 0 H${w} L${w * 0.86} ${h} H${w * 0.14} Z" fill="#F0F9FF" ${st}/>
    <g class="g3u-liq"${o.empty ? ' style="opacity:0"' : ''}><path d="M${w * 0.05} ${h * 0.2} H${w * 0.95} L${w * 0.84} ${h * 0.95} H${w * 0.16} Z" fill="${o.cut ? `url(#${hatch})` : WATER.a}"/></g>`;
  // plate: đĩa đựng phần lấy ra (túi hàng hiện trên đĩa khi bay tới)
  const [bw, bh] = dims({ kind: 'bag', v: o.v });
  return `<g class="g3u-liq" style="opacity:0"><g transform="translate(${(w - bw) / 2} 0)">${objSvg({ kind: 'bag', v: o.v }, bw, bh, hatch)}</g></g>
    <path d="M4 ${h - 16} H${w - 4} Q${w - 14} ${h} ${w / 2} ${h} Q14 ${h} 4 ${h - 16} Z" fill="#E2E8F0" ${st}/>`;
}
const flyObj = (o, w, h, hatch) => `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" style="overflow:visible;display:block">${objSvg(o, w, h, hatch)}</svg>`;

/** Khung màn hình của hình chữ nhật (x, y, w, h) theo toạ độ viewBox của svg. */
function screenBox(svg, x, y, w, h) {
  const m = svg.getScreenCTM();
  if (!m) return { left: 0, top: 0, width: 0, height: 0 };
  return { left: m.a * x + m.e, top: m.d * y + m.f, width: m.a * w, height: m.d * h };
}

/** Khay bày đồ vật (bên phải hình khi chỉ có một cân / một ca). Trả về vị trí từng đồ vật. */
function trayLayout(objs, x0, x1, y0, y1) {
  const W = x1 - x0, LAB = 40, PL = 16, GAP = 26;
  const ds = objs.map(dims);
  const slotW = (i, s) => Math.max(ds[i][0] * s, textW(objs[i].label, 28) + 6);
  for (let s = 1.25; s > 0.3; s -= 0.05) {
    const rows = [];
    let cur = [], w = 0;
    objs.forEach((_, i) => {
      const sw = slotW(i, s);
      if (cur.length && w + GAP + sw > W) { rows.push(cur); cur = []; w = 0; }
      w += (cur.length ? GAP : 0) + sw;
      cur.push(i);
    });
    if (cur.length) rows.push(cur);
    const rh = rows.map(r => Math.max(...r.map(i => ds[i][1] * s)) + LAB + PL);
    const H = rh.reduce((a, b) => a + b, 0) + (rows.length - 1) * 18;
    if (H > y1 - y0 && s > 0.35) continue;
    const pos = [];
    let y = y0 + (y1 - y0 - H) / 2;
    const planks = [];
    rows.forEach((r, ri) => {
      const rw = r.reduce((a, i) => a + slotW(i, s), 0) + (r.length - 1) * GAP;
      let x = x0 + (W - rw) / 2;
      const base = y + rh[ri] - LAB - PL;
      r.forEach(i => {
        const sw = slotW(i, s), [w, h] = [ds[i][0] * s, ds[i][1] * s];
        pos[i] = { x: x + (sw - w) / 2, y: base - h, w, h, cx: x + sw / 2, ly: base + PL + 30 };
        x += sw + GAP;
      });
      planks.push({ y: base, x: x0 + (W - rw) / 2 - 22, w: rw + 44 });
      y += rh[ri] + 18;
    });
    return { pos, planks };
  }
  return { pos: [], planks: [] };
}

function trayHtml(objs, lay, hatch) {
  return lay.planks.map(p => `<rect x="${p.x}" y="${p.y}" width="${p.w}" height="14" rx="5" fill="#D6A15B" ${SW} stroke-width="3"/>`).join('')
    + objs.map((o, j) => {
      const p = lay.pos[j];
      return `<g data-tobj="${j}" class="g3u-tobj"><g transform="translate(${p.x} ${p.y})">${objSvg(o, p.w, p.h, hatch)}</g></g>
        <text data-tlab="${j}" x="${p.cx}" y="${p.ly}" class="g3u-tl">${sl(o.label)}</text>`;
    }).join('');
}

// ── Độ dài: thanh màu trên thước ─────────────────────────────────────────────────────────────────────
const X0 = 70, X1 = 930, LW = X1 - X0;
function lenView(items, labelUnit) {
  const n = items.length;
  // Một thanh: thanh dài gần hết thước, chữ đếm nằm trên đầu thanh. Hai thanh (so sánh): chữ nằm bên phải thanh.
  // Chiều cao theo chỗ có (VH): khối hình (chữ + thanh + thước) căn giữa.
  const bh = n === 1 ? Math.min(260, VH * 0.32) : Math.min(170, VH * 0.22);
  const RH = Math.min(210, VH * 0.27);
  const GAP = n === 1 ? 50 : 40, CAP = n === 1 ? Math.min(90, VH * 0.13) : 0;
  const capFs = Math.min(70, VH * 0.105);
  const blockH = CAP + bh * n + (n - 1) * 36 + GAP + RH;
  const top = Math.max(8, (VH - blockH) / 2);
  const rows = n === 1 ? [[top + CAP, bh]] : [[top, bh], [top + bh + 36, bh]];
  const RY = top + CAP + bh * n + (n - 1) * 36 + GAP;
  const maxT = Math.max(...items.map(it => it.segs[it.segs.length - 1].b));
  let L = labelUnit;
  const R0 = maxT * (n === 1 ? 1.12 : 1.45);
  if (L === 'mm' && R0 <= 320) L = 'cm';
  const RL = Math.min(50, RH * 0.27); // cỡ số trên thước
  let major = NICE(Math.max(U[L], R0 / 14));
  const dense = (mj) => { const Rr = Math.ceil(R0 / mj) * mj; return (Rr / mj) * (textW(fmt(Rr / U[L]), RL) + 26) > LW; };
  while (dense(major)) major = nextNice(major);
  const Rng = Math.ceil(R0 / major) * major;
  let minor = 1;
  while (Rng / minor > 160 || major % minor) minor *= 10;
  if (minor > major) minor = major;
  const k = LW / Rng, X = (v) => X0 + v * k;
  const uid = ++uidN, hatch = `g3uH${uid}`;
  let s = `<defs><pattern id="${hatch}" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="18" height="18" fill="#FEE2E2"/><path d="M0 0 V18" stroke="#F87171" stroke-width="7"/></pattern></defs>`;
  // Thước
  s += `<rect x="${X0 - 34}" y="${RY}" width="${LW + 68}" height="${RH}" rx="12" fill="#FDE68A" ${SW} stroke-width="3.5"/>`;
  const half = major / 2, TK = RH * 0.36;
  for (let v = 0; v <= Rng + 1e-6; v += minor) {
    const big = v % major === 0, mid = !big && half % minor === 0 && v % half === 0;
    s += `<path d="M${X(v)} ${RY} v${big ? TK : mid ? TK * 0.7 : TK * 0.42}" stroke="${INK}" stroke-width="${big ? 3.5 : 2}"/>`;
    if (big) s += `<text x="${X(v)}" y="${RY + RH * 0.8}" class="g3u-rl" style="font-size:${RL}px">${fmt(v / U[L])}</text>`;
  }
  s += `<text x="${X(0) + RL * 0.45}" y="${RY + RH * 0.8}" class="g3u-ru" style="font-size:${RL * 0.75}px">${L}</text>`;
  // Thanh
  items.forEach((it, i) => {
    const [y, h] = rows[i];
    s += `<g data-bar="${i}" class="g3u-bar">`;
    it.segs.forEach((sg, j) => {
      const x = X(sg.a), w = (sg.b - sg.a) * k;
      const fill = sg.st === 'cut' ? `url(#${hatch})` : COL[sg.st] || COL.a;
      const dash = sg.st === 'ghost' || sg.st === 'part' ? ' stroke-dasharray="12 9"' : '';
      s += `<g data-seg="${i}-${j}" class="g3u-seg"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" ${SW} stroke-width="4"${dash}/>`;
      if (sg.label) {
        const fs = Math.min(h * 0.3, 62, (w - 12) / (String(sg.label).length * 0.66));
        const fits = fs >= 24;
        const unique = it.segs.filter(x => x.label === sg.label).length === 1;
        if (fits || (n === 1 && unique)) s += `<text class="g3u-bl${sg.st === 'ghost' ? ' g3u-off' : ''}" x="${x + w / 2}" y="${fits ? y + h * 0.42 : y + h + 34}" style="font-size:${fits ? fs : 30}px">${sg.label}</text>`;
      }
      s += '</g>';
    });
    s += `</g><g data-marks="${i}"></g>`;
    const end = X(it.segs[it.segs.length - 1].b);
    s += n === 1
      ? `<text data-cap="${i}" x="${end}" y="${y - 18}" class="g3u-cap g3u-cap-end ${it.capCls || ''}" style="font-size:${capFs}px">${it.cap}</text>`
      : `<text data-cap="${i}" x="${end + 24}" y="${y + h / 2 + 18}" class="g3u-cap ${it.capCls || ''}" style="font-size:${capFs}px">${it.cap}</text>`;
  });
  s += '<g data-fx></g>';
  return {
    svg: s, hatch,
    box: (i, a, b) => ({ x: X(a), y: rows[i][0], w: (b - a) * k, h: rows[i][1] }),
    mark(root, i, a, b, label) {
      const [y, h] = rows[i], x = X(a), w = (b - a) * k;
      const fs = label ? Math.min(h * 0.26, 54, (w - 10) / (String(label).length * 0.66)) : 0;
      root.querySelector(`[data-marks="${i}"]`).insertAdjacentHTML('beforeend', `<g class="g3u-mark"><rect x="${x + 3}" y="${y + 3}" width="${Math.max(0, w - 6)}" height="${h - 6}" rx="4"/>${fs >= 20 ? `<text x="${x + w / 2}" y="${y + h * 0.84}" class="g3u-ml" style="font-size:${fs}px">${label}</text>` : ''}</g>`);
    },
  };
}

// ── Khối lượng: cân đồng hồ ─────────────────────────────────────────────────────────────────────────
const DEG = Math.PI / 180;
function massView(insts, tray) {
  const n = insts.length;
  // Một cân + khay: khung thấp → khay bên phải; khung cao (màn dọc) → khay ở trên, cân to ở dưới.
  const tall = n === 1 && VH >= 900; // chỉ khi rất cao; khung vừa thì khay bên phải cho mặt cân to hơn
  const trayBox = tall ? [40, 960, 8, VH * 0.34] : [545, 980, 24, VH - 12];
  const geo = n === 1 ? [tall ? { cx: 500, bw: 600 } : { cx: 270, bw: 410 }] : [{ cx: 250, bw: 400 }, { cx: 750, bw: 400 }];
  const tot = (it) => it.objs.reduce((s, o) => s + o.v, 0);
  const maxT = Math.max(...insts.map(tot));
  const M = [500, 1000, 2000, 3000, 4000, 5000, 6000].find(x => x >= maxT) || 6000;
  const ang = (v) => -135 + 270 * Math.min(v, M) / M;
  const uid = ++uidN, hatch = `g3uH${uid}`;
  const objH = tall ? 150 : 116;
  const panY = (tall ? trayBox[3] : 0) + objH + 16, bodyY = panY + 28;
  const dispH = Math.min(90, VH * 0.14), dispY = VH - 14 - dispH;
  const rMax = (dispY - 18 - (bodyY + 18)) / 2 - 8;
  const cy = (bodyY + 18 + dispY - 18) / 2;
  const rOf = (i) => Math.min(geo[i].bw * 0.34, rMax, 200);
  let s = `<defs><pattern id="${hatch}" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="14" height="14" fill="#FDE68A"/><path d="M0 0 V14" stroke="#F87171" stroke-width="6"/></pattern></defs>`;
  const panPos = [];
  insts.forEach((it, i) => {
    const { cx, bw } = geo[i];
    const r = rOf(i);
    const P = (deg, rr) => [cx + rr * Math.sin(deg * DEG), cy - rr * Math.cos(deg * DEG)];
    const pw = bw * 0.96;
    // Đồ vật trên đĩa cân: xếp một hàng, thu nhỏ đều nếu không vừa
    const ds = it.objs.map(dims);
    const sumW = ds.reduce((a, d) => a + d[0], 0) + (ds.length - 1) * 8;
    const sc = Math.min(1.25, (pw - 24) / sumW, objH / Math.max(...ds.map(d => d[1])));
    let x = cx - (sumW * sc) / 2;
    panPos[i] = ds.map(([w, h]) => { const p = { x, y: panY - h * sc, w, h, s: sc }; x += (w + 8) * sc; return p; });
    const fsL = Math.max(22, r * 0.2);
    s += `<g data-inst="${i}" class="g3u-inst">`;
    s += `<rect x="${cx - 22}" y="${panY + 10}" width="44" height="${bodyY - panY}" fill="#94A3B8" ${SW} stroke-width="3"/>`;
    s += `<rect x="${cx - bw / 2}" y="${bodyY}" width="${bw}" height="${VH - bodyY - 4}" rx="34" fill="#F87171" ${SW} stroke-width="4"/>`;
    s += `<rect x="${cx - pw / 2}" y="${panY}" width="${pw}" height="16" rx="8" fill="#CBD5E1" ${SW} stroke-width="3.5"/>`;
    // Mặt đồng hồ
    s += `<circle cx="${cx}" cy="${cy}" r="${r + 10}" fill="#fff" ${SW} stroke-width="4"/>`;
    const minor = M <= 1000 ? M / 20 : 100, lab = M === 1000 ? 250 : M < 1000 ? M / 5 : 1000;
    for (let v = 0; v <= M + 1e-6; v += minor) {
      const big = v % lab === 0, mid = !big && M > 1000 && v % 500 === 0;
      const [x1, y1] = P(ang(v), r), [x2, y2] = P(ang(v), r - r * (big ? 0.17 : mid ? 0.12 : 0.075));
      s += `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${INK}" stroke-width="${big ? 3.5 : 2}"/>`;
      if (big) { const [tx, ty] = P(ang(v), r - r * 0.17 - fsL * 0.85); s += `<text x="${tx}" y="${ty + fsL * 0.36}" class="g3u-dl" style="font-size:${fsL}px">${M > 1000 ? v / 1000 : fmt(v)}</text>`; }
    }
    s += `<text x="${cx}" y="${cy + r * 0.6}" class="g3u-du" style="font-size:${fsL * 1.05}px">${M > 1000 ? 'kg' : 'g'}</text>`;
    s += `<g data-marks="${i}"></g>`;
    const shownT = it.objs.reduce((a, o) => a + (o.hidden ? 0 : o.v), 0);
    s += `<g data-needle="${i}" class="g3u-needle" style="transform-origin:${cx}px ${cy}px;transform:rotate(${ang(shownT)}deg)"><path d="M${cx} ${cy + r * 0.15} L${cx} ${cy - r * 0.9}" stroke="#DC2626" stroke-width="${Math.max(6, r * 0.05)}" stroke-linecap="round"/></g>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${Math.max(10, r * 0.08)}" fill="${INK}"/>`;
    // Ô số dưới mặt cân
    const cfs = Math.min(54, dispH * 0.62);
    s += `<rect x="${cx - bw * 0.38}" y="${dispY}" width="${bw * 0.76}" height="${dispH}" rx="12" fill="#ECFCCB" ${SW} stroke-width="3"/>`;
    s += `<text data-cap="${i}" x="${cx}" y="${dispY + dispH * 0.5 + cfs * 0.35}" class="g3u-cap g3u-cap-mid ${it.capCls || ''}" style="font-size:${cfs}px">${sl(it.cap)}</text>`;
    it.objs.forEach((o, j) => {
      const p = panPos[i][j];
      s += `<g data-pobj="${i}-${j}" style="opacity:${o.hidden ? 0 : 1}"><g transform="translate(${p.x} ${p.y}) scale(${p.s})">${objSvg(o, p.w, p.h, hatch)}</g></g>`;
    });
    s += '</g>';
  });
  let lay = null;
  if (tray) { lay = trayLayout(tray, ...trayBox); s += trayHtml(tray, lay, hatch); }
  s += '<g data-fx></g>';
  const arcMid = (i, a, b) => { const { cx } = geo[i]; const r = rOf(i); const d = (ang(a) + ang(b)) / 2; return [cx + r * 0.5 * Math.sin(d * DEG), cy - r * 0.5 * Math.cos(d * DEG)]; };
  return {
    svg: s, hatch, M, ang, panPos, lay,
    box: (i, a, b) => { const [x, y] = arcMid(i, a, b); return { x: x - 5, y: y - 5, w: 10, h: 10 }; },
    mark(root, i, a, b) {
      const { cx } = geo[i]; const r = rOf(i) - 8;
      const a0 = ang(a), a1 = ang(b);
      const p0 = [cx + r * Math.sin(a0 * DEG), cy - r * Math.cos(a0 * DEG)], p1 = [cx + r * Math.sin(a1 * DEG), cy - r * Math.cos(a1 * DEG)];
      root.querySelector(`[data-marks="${i}"]`).insertAdjacentHTML('beforeend',
        `<path class="g3u-arc" style="stroke-width:${Math.max(14, r * 0.12)}px" d="M${p0[0]} ${p0[1]} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p1[0]} ${p1[1]}"/>`);
    },
  };
}

// ── Dung tích: ca đo có vạch ml ────────────────────────────────────────────────────────────────────
function capView(insts, tray) {
  const n = insts.length;
  const tall = VH >= 640;
  const geo = n === 1 ? [{ x: 200, w: tall ? 260 : 240 }] : [{ x: 150, w: 230 }, { x: 650, w: 230 }];
  const capFs = Math.min(54, VH * 0.1);
  const top = 40, bot = VH - capFs - 40, yFull = top + 22;
  const tot = (it) => it.layers.reduce((s, l) => Math.max(s, l.b), 0);
  const maxT = Math.max(...insts.map(tot));
  const C = [500, 1000, 2000, 3000, 4000].find(x => x >= maxT) || 4000;
  const yv = (v) => bot - (bot - yFull) * v / C;
  const uid = ++uidN, hatch = `g3uH${uid}`;
  const fsJ = Math.min(32, Math.max(24, (bot - yFull) / 14));
  let s = `<defs><pattern id="${hatch}" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="14" height="14" fill="${WATER.a}"/><path d="M0 0 V14" stroke="#F87171" stroke-width="6"/></pattern></defs>`;
  insts.forEach((it, i) => {
    const { x, w } = geo[i];
    const H = bot - top;
    const body = `M${x} ${top} V${bot - 24} Q${x} ${bot} ${x + 24} ${bot} H${x + w - 24} Q${x + w} ${bot} ${x + w} ${bot - 24} V${top}`;
    const handle = `M${x + w} ${top + H * 0.12} C${x + w + 75} ${top + H * 0.12} ${x + w + 75} ${top + H * 0.6} ${x + w} ${top + H * 0.6}`;
    s += `<clipPath id="g3uC${uid}-${i}"><path d="${body} Z"/></clipPath>`;
    s += `<g data-inst="${i}" class="g3u-inst">`;
    s += `<path d="${handle}" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="${handle}" fill="none" stroke="#E0F2FE" stroke-width="8" stroke-linecap="round"/>`;
    s += `<path d="${body} Z" fill="#F0F9FF"/>`;
    s += `<g clip-path="url(#g3uC${uid}-${i})">`;
    it.layers.forEach((l, j) => {
      const y0 = yv(l.b), y1 = yv(l.a);
      const fill = l.st === 'cut' ? `url(#${hatch})` : WATER[l.st] || WATER.a;
      s += `<g data-layer="${i}-${j}" class="g3u-layer" style="transform-origin:0 ${y1}px;transform:scaleY(${l.hidden ? 0 : 1})"><rect x="${x - 2}" y="${y0}" width="${w + 4}" height="${y1 - y0}" fill="${fill}"/>`
        + `<path d="M${x} ${y0} H${x + w}" stroke="#0369A1" stroke-width="3" stroke-dasharray="10 7"/>`
        + (l.label && y1 - y0 >= 40 ? `<text x="${x + w * 0.62}" y="${(y0 + y1) / 2 + 11}" class="g3u-bl" style="font-size:32px">${sl(l.label)}</text>` : '') + '</g>';
    });
    s += '</g>';
    s += `<path d="${body}" fill="none" ${SW} stroke-width="5"/>`;
    s += `<path d="M${x - 10} ${top} H${x + w + 10}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;
    // Vạch chia ml
    const minor = C <= 1000 ? C / 10 : 100, lab = C <= 1000 ? C / 5 : 500;
    for (let v = minor; v <= C + 1e-6; v += minor) {
      const big = v % lab === 0;
      s += `<path d="M${x} ${yv(v)} h${big ? 40 : 22}" stroke="${INK}" stroke-width="${big ? 3.5 : 2.2}"/>`;
      if (big) s += `<text x="${x - 10}" y="${yv(v) + fsJ * 0.36}" class="g3u-jl" style="font-size:${fsJ}px">${fmt(v)}</text>`;
    }
    s += `<text x="${x - 10}" y="${bot}" class="g3u-jl g3u-ju" style="font-size:${fsJ}px">ml</text>`;
    s += `<g data-marks="${i}"></g>`;
    s += `<text data-cap="${i}" x="${x + w / 2}" y="${VH - 16}" class="g3u-cap g3u-cap-mid ${it.capCls || ''}" style="font-size:${capFs}px">${sl(it.cap)}</text>`;
    s += '</g>';
  });
  let lay = null;
  if (tray) { lay = trayLayout(tray, 545, 980, 24, VH - 12); s += trayHtml(tray, lay, hatch); }
  s += '<g data-fx></g>';
  return {
    svg: s, hatch, C, yv, geo, top, lay,
    box: (i, a, b) => ({ x: geo[i].x, y: yv(b), w: geo[i].w, h: yv(a) - yv(b) }),
    mark(root, i, a, b, label) {
      const { x, w } = geo[i], y0 = yv(b), y1 = yv(a);
      const fs = label ? Math.min(36, y1 - y0 - 8, (w * 0.8) / (String(label).length * 0.6)) : 0;
      root.querySelector(`[data-marks="${i}"]`).insertAdjacentHTML('beforeend', `<g class="g3u-mark"><rect x="${x + 4}" y="${y0 + 3}" width="${w - 8}" height="${Math.max(0, y1 - y0 - 6)}" rx="4"/>${fs >= 20 ? `<text x="${x + w * 0.58}" y="${(y0 + y1) / 2 + fs * 0.36}" class="g3u-ml" style="font-size:${fs}px">${sl(label)}</text>` : ''}</g>`);
    },
  };
}

// ── Mô hình hình đo của từng bài ───────────────────────────────────────────────────────────────────
/** Tách số đo thành khúc để vẽ, để đếm: "3 dm" → ba khúc "1 dm"; "2 m 5 cm" → 1 m, 1 m, 5 cm; "300 cm" → một khúc. */
function expand(q, T) {
  const out = [];
  for (const [n, u] of q) {
    if (U[u] > U[T] && n <= 10) for (let i = 0; i < n; i++) out.push({ v: U[u], label: `1 ${u}`, u });
    else out.push({ v: n * U[u], label: `${fmt(n)} ${u}`, u });
  }
  return out;
}
/** Các khúc đếm khi kiểm tra đổi q ra đơn vị T: [{ a, b, chip, cap }]. */
function convRanges(q, T) {
  const total = val(q);
  const out = [];
  if (U[q[0][1]] < U[T]) {
    for (let i = 0; i < total / U[T]; i++) out.push({ a: i * U[T], b: (i + 1) * U[T], chip: `1 ${T}`, cap: `${fmt(i + 1)} ${T}` });
    return out;
  }
  let c = 0;
  for (const p of expand(q, T)) { out.push({ a: c, b: c + p.v, chip: `${fmt(p.v / U[T])} ${T}`, cap: `${fmt((c + p.v) / U[T])} ${T}` }); c += p.v; }
  return out;
}
const segsOf = (parts, st = 'a') => { let c = 0; return parts.map((p, j) => { const sg = { a: c, b: c + p.v, label: p.label, st: typeof st === 'function' ? st(j) : st }; c += p.v; return sg; }); };
const objOf = (p, dim, extra = {}) => (dim === 'mass'
  ? { kind: p.v === 1000 && p.u === 'kg' ? 'kgw' : 'bag', v: p.v, label: p.label, ...extra }
  : { kind: p.u === 'l' && p.v === 1000 ? 'bottle' : p.v > 500 ? 'bottle' : 'cup', v: p.v, label: p.label, ...extra });
const smallestUnit = (units) => units.reduce((a, u) => (U[u] < U[a] ? u : a));

/**
 * Dựng hình đo cho bài m. Trả về { view (svg + hàm hình học), model } với model:
 *   items: thanh (len) / cân, ca (mass, cap); tray: đồ vật trên khay; checks: một hàm kiểm chứng cho mỗi bước.
 */
function buildModel(m) {
  const d = m.dim;
  if (m.t === 'conv') {
    const parts = expand(m.from, m.to);
    const cap = { cap: '?' };
    const ranges = convRanges(m.from, m.to);
    if (d === 'len') return { view: lenView([{ segs: segsOf(parts), ...cap }], smallestUnit([...m.from.map(x => x[1]), m.to])), plan: [{ ranges, item: 0 }] };
    const tray = parts.map(p => objOf(p, d));
    if (d === 'mass') return { view: massView([{ objs: parts.map(p => objOf(p, d, { hidden: true })), ...cap }], tray), plan: [{ load: tray.map((_, j) => j), ranges, item: 0 }] };
    return { view: capView([{ layers: segsOf(parts, j => (j % 2 ? 'b' : 'a')).map(sg => ({ ...sg, label: '', hidden: true })), ...cap }], tray), plan: [{ load: tray.map((_, j) => j), ranges, item: 0 }] };
  }
  if (m.t === 'calc') {
    const A = val([m.a]) / U[m.u], u = m.u, ans = m.ans;
    const pre = m.conv ? [{ ranges: [{ a: 0, b: A, chip: `${fmt(A)} ${u}`, cap: `${fmt(A)} ${u}` }], item: 0 }] : [];
    if (m.op === '+') {
      const parts = [{ v: A, label: `${fmt(A)} ${u}`, u }, { v: m.b, label: `${fmt(m.b)} ${u}`, u }];
      const ranges = [{ a: 0, b: A, chip: `${fmt(A)} ${u}`, cap: `${fmt(A)} ${u}` }, { a: A, b: A + m.b, chip: `${fmt(m.b)} ${u}`, cap: `${fmt(ans)} ${u}` }];
      const plan = [{ ranges, item: 0, load: [0, 1] }];
      if (d === 'len') return { view: lenView([{ segs: segsOf(parts, j => (j ? 'b' : 'a')), cap: '?' }], u), plan };
      const tray = parts.map(p => objOf(p, d));
      if (d === 'mass') return { view: massView([{ objs: parts.map(p => objOf(p, d, { hidden: true })), cap: '?' }], tray), plan };
      return { view: capView([{ layers: segsOf(parts, j => (j ? 'b' : 'a')).map(sg => ({ ...sg, label: '', hidden: true })), cap: '?' }], tray), plan };
    }
    if (m.op === '×') {
      const parts = Array.from({ length: m.b }, () => ({ v: A, label: `${fmt(A)} ${u}`, u }));
      const ranges = parts.map((_, j) => ({ a: j * A, b: (j + 1) * A, chip: `${fmt(A)} ${u}`, cap: `${fmt(A * (j + 1))} ${u}` }));
      if (d === 'len') return { view: lenView([{ segs: segsOf(parts, j => (j ? 'ghost' : 'a')), cap: '?' }], u), plan: [{ fill: true, ranges, item: 0 }] };
      const tray = parts.map(p => objOf(p, d));
      const plan = [{ load: tray.map((_, j) => j), ranges, item: 0, quiet: true }];
      if (d === 'mass') return { view: massView([{ objs: parts.map(p => objOf(p, d, { hidden: true })), cap: '?' }], tray), plan };
      return { view: capView([{ layers: segsOf(parts, j => (j % 2 ? 'b' : 'a')).map(sg => ({ ...sg, label: '', hidden: true })), cap: '?' }], tray), plan };
    }
    if (m.op === '−') {
      const B = m.b, rest = A - B;
      const segs = [{ a: 0, b: rest, label: '?', st: 'a' }, { a: rest, b: A, label: `${fmt(B)} ${u}`, st: 'cut' }];
      const fin = { ranges: [{ a: 0, b: rest, chip: `${fmt(ans)} ${u}`, cap: `${fmt(ans)} ${u}` }], item: 0, remove: 1 };
      const cap0 = m.conv ? '?' : `${fmt(A)} ${u}`;
      if (d === 'len') return { view: lenView([{ segs, cap: cap0, capCls: m.conv ? '' : 'g3u-cap-given' }], u), plan: [...pre, fin] };
      if (d === 'mass') {
        const tray = [{ kind: 'plate', v: B, label: `${fmt(B)} g` }];
        return { view: massView([{ objs: [{ kind: 'bag', v: rest, label: '?' }, { kind: 'bag', v: B, cut: true, label: `${fmt(B)} g` }], cap: cap0, capCls: m.conv ? '' : 'g3u-cap-given' }], tray), plan: [...pre, fin] };
      }
      const tray = [{ kind: 'cup', v: B, label: `${fmt(B)} ml`, empty: true }];
      return { view: capView([{ layers: segs.map(sg => ({ ...sg, label: sg.st === 'cut' ? sg.label : '' })), cap: cap0, capCls: m.conv ? '' : 'g3u-cap-given' }], tray), plan: [...pre, fin] };
    }
    // ':'
    const q = ans;
    const ranges = Array.from({ length: m.b }, (_, j) => ({ a: j * q, b: (j + 1) * q, chip: `${fmt(q)} ${u}`, cap: `${fmt(q)} ${u}` }));
    if (d === 'len') return { view: lenView([{ segs: ranges.map((r, j) => ({ a: r.a, b: r.b, label: j ? '' : '?', st: 'part' })), cap: `${fmt(A)} ${u}`, capCls: 'g3u-cap-given' }], u), plan: [{ ranges, item: 0, capLast: true }] };
    const tray = ranges.map(() => ({ kind: 'cup', v: q, label: '?', empty: true }));
    return { view: capView([{ layers: ranges.map((r, j) => ({ a: r.a, b: r.b, st: j % 2 ? 'b' : 'a', label: '' })), cap: `${fmt(A)} ${u}`, capCls: 'g3u-cap-given' }], tray), plan: [{ pour: true, item: 0, q, u }] };
  }
  // cmp: hai số đo vẽ cùng một thang
  const sides = [m.left, m.right];
  const parts = sides.map(q => expand(q, m.u));
  const caps = sides.map(q => ({ cap: qText(q), capCls: 'g3u-cap-given' }));
  const plan = [{ ranges: convRanges(sides[m.bigSide], m.u), item: m.bigSide }, { glow: true }];
  if (d === 'len') return { view: lenView(parts.map((ps, i) => ({ segs: segsOf(ps, i ? 'b' : 'a'), ...caps[i] })), m.u), plan };
  if (d === 'mass') return { view: massView(parts.map((ps, i) => ({ objs: ps.map(p => objOf(p, d)), ...caps[i] }))), plan };
  return { view: capView(parts.map((ps, i) => ({ layers: segsOf(ps, j => (j % 2 ? 'b' : 'a')).map(sg => ({ ...sg, label: '' })), ...caps[i] }))), plan };
}

// ── Các bước của bài ───────────────────────────────────────────────────────────────────────────────
function stepsOf(m) {
  if (m.t === 'conv') {
    const [n0, u0] = m.from[0];
    const T = m.to, A = qText(m.from);
    let h1;
    if (U[u0] < U[T]) { const r = ratioOf(T, u0); h1 = `1 ${T} = ${fmt(r)} ${u0}. ${fmt(n0)} ${u0} có mấy lần ${fmt(r)} ${u0}?`; }
    else if (m.from.length > 1) { const r = ratioOf(u0, T); h1 = `${fmt(n0)} ${u0} = ${fmt(n0 * r)} ${T}, thêm ${fmt(m.from[1][0])} ${T} nữa.`; }
    else { const r = ratioOf(u0, T); h1 = n0 === 1 ? `Nhìn thước, nhìn cân: 1 ${u0} có mấy ${T}?` : `1 ${u0} = ${fmt(r)} ${T}. ${fmt(n0)} ${u0} là ${fmt(n0)} lần ${fmt(r)} ${T}.`; }
    return [{ kind: 'fill', box: 'main', ans: m.ans, unit: T,
      say: `Đổi ${A} ra ${NAME[T]}.`, show: `<b>${A}</b> bằng bao nhiêu <b>${T}</b>?`,
      h1, h2: `${A} = ${fmt(m.ans)} ${T}.` }];
  }
  if (m.t === 'calc') {
    const A = val([m.a]) / U[m.u];
    const expr = `${fmt(A)} ${m.u} ${m.op} ${m.op === '+' || m.op === '−' ? `${fmt(m.b)} ${m.u}` : m.b}`;
    const calc = `${fmt(A)} ${m.op} ${fmt(m.b)}`;
    const main = { kind: 'fill', box: 'main', ans: m.ans, unit: m.u,
      say: `Tính ${expr}.`, show: `Tính <b>${expr}</b>.`,
      h1: `Tính như với số tự nhiên: ${calc}, rồi viết thêm ${m.u}.`, h2: `${calc} = ${fmt(m.ans)}.` };
    if (!m.conv) return [main];
    const [n, bu] = m.a;
    return [{ kind: 'fill', box: 'work', ans: A, unit: m.u,
      say: `Khác đơn vị. Đổi ${qText([m.a])} ra ${NAME[m.u]} trước.`, show: `Khác đơn vị: đổi <b>${qText([m.a])}</b> ra <b>${m.u}</b> trước.`,
      h1: `1 ${bu} = ${fmt(ratioOf(bu, m.u))} ${m.u}.${n > 1 ? ` ${n} ${bu} là ${n} lần.` : ''}`, h2: `${qText([m.a])} = ${fmt(A)} ${m.u}.` }, main];
  }
  const big = [m.left, m.right][m.bigSide], other = [m.left, m.right][1 - m.bigSide];
  const [n0, u0] = big[0];
  const r = ratioOf(u0, m.u);
  const h1 = big.length > 1 ? `${fmt(n0)} ${u0} = ${fmt(n0 * r)} ${m.u}, thêm ${fmt(big[1][0])} ${m.u} nữa.`
    : n0 === 1 ? `1 ${u0} có mấy ${m.u}? Nhìn hình đo.` : `1 ${u0} = ${fmt(r)} ${m.u}. ${fmt(n0)} ${u0} là ${fmt(n0)} lần ${fmt(r)} ${m.u}.`;
  const lv = m.bigSide === 0 ? m.conv : other[0][0], rv = m.bigSide === 0 ? other[0][0] : m.conv;
  const cmpTxt = `${fmt(lv)} ${m.u} và ${fmt(rv)} ${m.u}`;
  return [
    { kind: 'fill', box: 'work', ans: m.conv, unit: m.u,
      say: `Hai số đo khác đơn vị. Đổi ${qText(big)} ra ${NAME[m.u]} trước.`, show: `Khác đơn vị: đổi <b>${qText(big)}</b> ra <b>${m.u}</b> trước.`,
      h1, h2: `${qText(big)} = ${fmt(m.conv)} ${m.u}.` },
    { kind: 'sign', ans: m.ans,
      say: `So sánh ${cmpTxt}. Chọn dấu.`, show: `So sánh <b>${cmpTxt}</b>: chọn dấu.`,
      h1: `Cùng đơn vị rồi, so sánh hai số: ${cmpTxt}.`, h2: `${fmt(lv)} ${m.u} ${m.ans} ${fmt(rv)} ${m.u}.` },
  ];
}

/** Thẻ quy tắc đổi của bài (null: bài không cần đổi). hidden: thẻ trùng đáp số (1 m = … cm) thì chỉ hiện khi thầy nhắc. */
function factOf(m) {
  let big, small, hidden = false;
  if (m.t === 'conv') {
    const u0 = m.from[0][1];
    [big, small] = U[u0] > U[m.to] ? [u0, m.to] : [m.to, u0];
    hidden = m.from.length === 1 && m.from[0][0] === 1;
  } else if (m.t === 'calc') {
    if (!m.conv) return { text: `${fmt(val([m.a]) / U[m.u])} ${m.op} ${fmt(m.b)} = ?`, calc: true }; // tính như với số tự nhiên
    [big, small] = [m.a[1], m.u];
    hidden = m.a[0] === 1;
  } else {
    const q = [m.left, m.right][m.bigSide];
    [big, small] = [q[0][1], m.u];
    hidden = q.length === 1 && q[0][0] === 1;
  }
  return { text: `1 ${big} = ${fmt(ratioOf(big, small))} ${small}`, hidden };
}

export const UNITS_GAME = {
  id: 'drill-unit', icon: '⚖️', title: 'Đổi đơn vị đo',
  purpose: 'Giúp em đổi m, dm, cm, mm, kg, g, l, ml, tính với số đo và so sánh số đo, rồi tự kiểm tra trên thước, cân và ca đo vẽ đúng tỉ lệ.',
  unitWord: 'bài', starPrefix: 'drill', npcs: [TEACHER], levels: UNITS_LEVELS,
  stallIcon: () => '⚖️',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> bài.`,
  againText: 'Làm lượt mới',
  howTo: how(['📏', 'Nhìn quy tắc'], ['🔁', 'Đổi đơn vị'], ['⌨️', 'Gõ số'], ['⚖️', 'Xem hình kiểm tra']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), probText);
  },

  mountMission(stage, m, level, api) {
    const steps = stepsOf(m);
    const fact = factOf(m);
    const boxW = (v) => `${String(fmt(v)).length * 0.6 + 0.9}em`;
    const workStep = steps.find(s => s.box === 'work');
    let prob;
    if (m.t === 'conv') prob = `<span>${qText(m.from)}</span><span>=</span><span class="g3d-box" style="--boxw:${boxW(m.ans)}" data-box="main"></span><span>${m.to}</span>`;
    else if (m.t === 'calc') {
      const A = val([m.a]) / U[m.u];
      const aw = Math.max(qText([m.a]).length, `${fmt(A)} ${m.u}`.length) * 0.55;
      prob = `<span class="g3u-a" data-a style="min-width:${m.conv ? aw : 0}em">${qText([m.a])}</span><span>${m.op}</span><span>${m.op === '+' || m.op === '−' ? `${fmt(m.b)} ${m.u}` : m.b}</span><span>=</span><span class="g3d-box" style="--boxw:${boxW(m.ans)}" data-box="main"></span><span>${m.u}</span>`;
    } else prob = `<span>${qText(m.left)}</span><span class="g3u-sign" data-sign></span><span>${qText(m.right)}</span>`;
    prob = hl(prob);
    const factHtml = fact ? `<span class="g3u-fact${fact.hidden ? ' g3u-hide' : ''}${fact.calc ? ' g3u-fact-calc' : ''}"${fact.calc ? ` style="min-width:${(fact.text.length + String(fmt(m.ans)).length) * 0.56}em;text-align:center"` : ''} data-fact>${hl(fact.text)}</span>` : '<span class="g3u-fact g3u-hide" data-fact>&nbsp;</span>';
    const work = workStep
      ? `<span class="g3u-wl">Đổi: ${qText(m.t === 'calc' ? [m.a] : [m.left, m.right][m.bigSide])} = <span class="g3d-box" style="--boxw:${boxW(workStep.ans)}" data-box="work"></span> ${workStep.unit}</span>${factHtml}`
      : factHtml;
    const workHtml = hl(work);
    const board = `
      <div class="g3u g3u-${m.t}">
        <div class="g3u-prob" style="--pl:${(probText(m).length + 6) * 0.62}">${prob}</div>
        <div class="g3u-work">${workHtml}</div>
        <div class="g3u-vis"><svg class="g3u-svg" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true"></svg></div>
        ${m.t === 'cmp' ? `<div class="g3u-signs">${['>', '<', '='].map(sg => `<button type="button" class="g3g-btn g3d-choice g3u-sbtn" data-s="${sg}">${sg}</button>`).join('')}</div>` : ''}
      </div>`;
    const { paper, say, hint, pad, done } = mountDrill(stage, { api, board, cls: 'g3u-scene' });
    injectUnitStyles();
    const svg = paper.querySelector('.g3u-svg');
    // Hình đo vẽ theo đúng hình dạng vùng của nó (đo một lần, cả lượt giữ nguyên)
    const vr = paper.querySelector('.g3u-vis').getBoundingClientRect();
    VH = vr.width > 0 ? Math.round(Math.min(900, Math.max(460, (VW * vr.height) / vr.width))) : 500;
    const { view, plan } = buildModel(m);
    svg.setAttribute('viewBox', `0 0 ${VW} ${VH}`);
    svg.innerHTML = view.svg;
    const factEl = paper.querySelector('[data-fact]');
    const boxes = { main: paper.querySelector('[data-box="main"]'), work: paper.querySelector('[data-box="work"]') };
    const signEl = paper.querySelector('[data-sign]');
    const q = (sel) => svg.querySelector(sel);
    const talk = (text, shown) => say(spk(text), hl(shown || text));
    let mistakes = 0, tip = '', si = 0, busy = false;
    const wrongs = steps.map(() => 0);

    const wrong = (el, st) => {
      mistakes++;
      const w = ++wrongs[si];
      const t = w > 1 ? st.h2 : st.h1;
      tip ||= st.h1;
      shake(el);
      hint(spk(t), hl(t));
      if (fact && w > 0) factEl.classList.remove('g3u-hide');
    };

    // ── Kiểm chứng trên hình ──
    const sbox = (b) => screenBox(svg, b.x, b.y, b.w, b.h);
    const setCap = (i, text, cls = '') => {
      const el = q(`[data-cap="${i}"]`);
      if (!el) return;
      el.innerHTML = sl(text);
      el.classList.remove('g3u-cap-given', 'g3u-cap-done');
      if (cls) el.classList.add(cls);
      el.classList.remove('g3u-pop'); void el.getBoundingClientRect(); el.classList.add('g3u-pop');
    };
    const chipFrom = () => (fact && !factEl.classList.contains('g3u-hide') ? factEl : boxes[steps[si].box] || factEl);
    /** Thẻ số bay vào khúc [a, b] của hình i, khúc sáng lên, chữ dưới hình đếm tiếp. */
    async function ranges(i, list, { last = false, quiet = false } = {}) {
      for (let j = 0; j < list.length; j++) {
        const r = list[j];
        const from = chipFrom().getBoundingClientRect();
        const tb = sbox(view.box(i, r.a, r.b));
        const fs = Math.min(from.height, 64);
        const fw = Math.max(textW(r.chip, fs * 0.8), fs * 1.6);
        const to = { left: tb.left + tb.width / 2 - fw / 2, top: tb.top + tb.height / 2 - fs / 2, width: fw, height: fs };
        const src = { left: from.left + from.width / 2 - fw / 2, top: from.top, width: fw, height: fs };
        const isLast = j === list.length - 1;
        const land = () => {
          view.mark(paper, i, r.a, r.b, r.chip);
          if (!(last && !isLast)) setCap(i, r.cap, isLast ? 'g3u-cap-done' : '');
          sfx.pop(j);
        };
        if (quiet) { land(); await sleep(260); continue; }
        await sleep(flyOne(`<div class="g3u-chip" style="font-size:${fs * 0.72}px">${hl(r.chip)}</div>`, src, to, { minMs: 380, maxMs: 620, onLand: land }) + 140);
      }
    }
    const trayOfModel = view.lay ? trayModel(m) : []; // đồ vật trên khay (để vẽ đồ bay), cùng thứ tự với trayHtml
    const trayObj = (j) => q(`[data-tobj="${j}"]`);
    const trayBox = (j) => { const p = view.lay.pos[j]; return sbox({ x: p.x, y: p.y, w: p.w, h: p.h }); };
    /** Đồ vật j trên khay bay lên đĩa cân / rót vào ca. */
    async function load(j) {
      const tEl = trayObj(j), p = view.lay.pos[j];
      const tray = trayOfModel[j];
      const html = flyObj(tray, p.w, p.h, view.hatch);
      if (m.dim === 'mass') {
        const pp = view.panPos[0][j];
        tEl.style.opacity = '0'; q(`[data-tlab="${j}"]`).style.opacity = '0.3';
        await sleep(flyOne(html, trayBox(j), sbox({ x: pp.x, y: pp.y, w: pp.w * pp.s, h: pp.h * pp.s }), { minMs: 420, maxMs: 700, onLand: () => {
          q(`[data-pobj="0-${j}"]`).style.opacity = '1';
          loaded += tray.v;
          q('[data-needle="0"]').style.transform = `rotate(${view.ang(loaded)}deg)`;
          sfx.pop(j);
        } }) + 650);
      } else {
        const { x, w } = view.geo[0];
        tEl.style.opacity = '0.35';
        const tgt = { x: x + w / 2 - p.w / 2 + w * 0.12, y: view.top - p.h * 0.55, w: p.w, h: p.h };
        await sleep(flyOne(html, trayBox(j), sbox(tgt), { minMs: 420, maxMs: 700, spin: 40, onLand: () => {
          tEl.style.opacity = '1';
          const liq = tEl.querySelector('.g3u-liq'); if (liq) liq.style.opacity = '0';
          q(`[data-layer="0-${j}"]`).style.transform = 'scaleY(1)';
          sfx.pop(j);
        } }) + 750);
      }
    }
    let loaded = 0;

    async function runPlan(p) {
      const i = p.item ?? 0;
      if (p.load && view.lay) {
        // Mỗi đồ vật lên cân / rót vào ca, rồi đếm các khúc đã có
        let c = 0, ri = 0;
        for (const j of p.load) {
          await load(j);
          c += trayOfModel[j].v;
          const ready = [];
          while (ri < p.ranges.length && p.ranges[ri].b <= c + 1e-6) ready.push(p.ranges[ri++]);
          if (ready.length) await ranges(i, ready, { quiet: p.quiet });
          if (p.quiet) await sleep(120);
        }
        return;
      }
      if (p.fill) {
        // Nhân (độ dài): khúc đầu bay sang lấp từng khúc trống
        const first = q('[data-seg="0-0"] rect');
        setCap(0, p.ranges[0].cap);
        for (let j = 1; j < p.ranges.length; j++) {
          const g = q(`[data-seg="0-${j}"]`);
          const r = p.ranges[j];
          await sleep(flyOne(`<div class="g3u-barfly"></div>`, first.getBoundingClientRect(), g.querySelector('rect').getBoundingClientRect(), { minMs: 380, maxMs: 620, onLand: () => {
            const rc = g.querySelector('rect'); rc.setAttribute('fill', COL.a); rc.removeAttribute('stroke-dasharray');
            g.querySelector('text')?.classList.remove('g3u-off');
            setCap(0, r.cap, j === p.ranges.length - 1 ? 'g3u-cap-done' : '');
            sfx.pop(j);
          } }) + 140);
        }
        return;
      }
      if (p.pour) {
        // Chia (dung tích): rót lần lượt từ ca sang từng cốc
        const n = view.lay.pos.length;
        for (let t = n - 1; t >= 0; t--) {
          const layer = q(`[data-layer="0-${t}"]`);
          const lb = layer.querySelector('rect').getBoundingClientRect();
          layer.style.transform = 'scaleY(0)';
          await sleep(flyOne('<div class="g3u-waterfly"></div>', lb, trayBox(n - 1 - t), { minMs: 420, maxMs: 700, onLand: () => {
            const c = trayObj(n - 1 - t); const liq = c.querySelector('.g3u-liq'); if (liq) liq.style.opacity = '1';
            const lab = q(`[data-tlab="${n - 1 - t}"]`); lab.textContent = `${fmt(p.q)} ${p.u}`; lab.classList.add('g3u-tl-done');
            setCap(0, `${fmt(p.q * t)} ${p.u}`, '');
            sfx.pop(n - t);
          } }) + 200);
        }
        setCap(0, `${fmt(p.q)} ${p.u}`, 'g3u-cap-done');
        q('[data-cap="0"]').textContent = `Mỗi cốc ${fmt(p.q)} ${p.u}`;
        return;
      }
      if (p.glow) {
        const L = m.bigSide === 0 ? m.conv : m.left[0][0];
        const Rv = m.bigSide === 0 ? m.right[0][0] : m.conv;
        const win = L > Rv ? [0] : L < Rv ? [1] : [0, 1];
        win.forEach(w => (q(`[data-bar="${w}"]`) || q(`[data-inst="${w}"]`))?.classList.add('g3u-glow'));
        setCap(1 - m.bigSide, qText([m.left, m.right][1 - m.bigSide]), 'g3u-cap-done');
        sfx.ding();
        await sleep(1100);
        return;
      }
      if (p.remove != null) {
        // Trừ: phần bớt đi bay ra (lên khay), rồi đếm phần còn lại
        paper.querySelectorAll(`[data-marks="${i}"] > *`).forEach(e => e.remove());
        if (m.dim === 'len') {
          const g = q(`[data-seg="0-${p.remove}"]`);
          const rb = g.querySelector('rect').getBoundingClientRect();
          const away = { left: rb.left + rb.width * 0.3, top: rb.top - rb.height * 1.1, width: rb.width, height: rb.height };
          g.classList.add('g3u-gone');
          await sleep(flyOne(`<div class="g3u-cutfly"></div>`, rb, away, { minMs: 420, maxMs: 600 }) + 150);
        } else if (m.dim === 'mass') {
          const pp = view.panPos[0][1];
          const pobj = q('[data-pobj="0-1"]');
          pobj.style.opacity = '0';
          const tp = view.lay.pos[0];
          const [bw, bh] = dims({ kind: 'bag', v: m.b });
          await sleep(flyOne(flyObj({ kind: 'bag', v: m.b, cut: true }, pp.w, pp.h, view.hatch), sbox({ x: pp.x, y: pp.y, w: pp.w * pp.s, h: pp.h * pp.s }),
            sbox({ x: tp.x + (tp.w - bw) / 2, y: tp.y, w: bw, h: bh }), { minMs: 420, maxMs: 700, onLand: () => {
              trayObj(0).querySelector('.g3u-liq').style.opacity = '1';
              q('[data-needle="0"]').style.transform = `rotate(${view.ang(val([m.a]) - m.b)}deg)`;
              sfx.pop(2);
            } }) + 700);
        } else {
          const layer = q('[data-layer="0-1"]');
          const lb = layer.querySelector('rect').getBoundingClientRect();
          layer.style.transform = 'scaleY(0)';
          await sleep(flyOne('<div class="g3u-waterfly"></div>', lb, trayBox(0), { minMs: 420, maxMs: 700, onLand: () => {
            trayObj(0).querySelector('.g3u-liq').style.opacity = '1';
            sfx.pop(2);
          } }) + 450);
        }
      }
      await ranges(i, p.ranges, { last: p.capLast });
    }


    async function check(k) {
      busy = true;
      const p = plan[k];
      if (p) await runPlan(p);
      busy = false;
    }

    // ── Từng bước ──
    function next() {
      si++;
      if (si < steps.length) { ask(); return; }
      finish();
    }
    function ask() {
      const st = steps[si];
      if (st.kind === 'fill') {
        const box = boxes[st.box];
        setActive(paper, box);
        talk(st.say, st.show);
        const opts = {
          max: String(st.ans).length + 1,
          onType: (t) => { box.textContent = t ? fmt(t) : ''; },
          onSubmit: async (t) => {
            if (Number(t) !== st.ans) { box.textContent = ''; wrong(box, st); pad.want(opts); return; }
            pad.off();
            setActive(paper, null);
            box.textContent = fmt(st.ans);
            box.classList.add('g3d-box-ok');
            if (fact?.calc && st.box === 'main') { factEl.innerHTML = hl(fact.text.replace('?', fmt(st.ans))); factEl.classList.add('g3u-fact-done'); }
            sfx.ding();
            busy = true;
            if (m.t === 'calc' && st.box === 'work') {
              // Số vừa đổi bay lên thay vào đề: 1 kg → 1 000 g
              const aEl = paper.querySelector('[data-a]');
              await sleep(flyDigit(hl(`${fmt(st.ans)} ${st.unit}`), box, aEl, { onLand: () => { aEl.innerHTML = hl(`${fmt(st.ans)} ${st.unit}`); aEl.classList.add('g3u-a-new'); sfx.pop(3); } }) + 150);
            }
            await check(si);
            next();
          },
        };
        pad.want(opts);
      } else {
        setActive(paper, signEl);
        talk(st.say, st.show);
      }
    }
    // Nút dấu: bấm trước khi đổi xong thì thầy nhắc đổi trước
    paper.querySelectorAll('[data-s]').forEach(btn => {
      btn.onclick = async () => {
        if (busy) return;
        const st = steps[si];
        sfx.tap();
        if (st.kind !== 'sign') {
          shake(boxes.work);
          hint(spk(`Đổi ${qText([m.left, m.right][m.bigSide])} ra ${m.u} trước đã.`), `Đổi <b>${qText([m.left, m.right][m.bigSide])}</b> ra <b>${m.u}</b> trước đã.`);
          return;
        }
        if (btn.dataset.s !== st.ans) { wrong(btn, st); return; }
        btn.classList.add('g3d-choice-ok');
        paper.querySelectorAll('[data-s]').forEach(x => { x.disabled = true; });
        setActive(paper, null);
        busy = true;
        await sleep(flyDigit(st.ans, btn, signEl, { onLand: () => { popIn(signEl, st.ans); signEl.classList.add('g3u-sign-ok'); } }) + 150);
        await check(si);
        next();
      };
    });

    async function finish() {
      await sleep(400);
      const ok = m.t === 'conv' ? `${qText(m.from)} = ${fmt(m.ans)} ${m.to}.`
        : m.t === 'calc' ? `${probText(m).replace('…', fmt(m.ans))}.`
          : `${qText(m.left)} ${m.ans} ${qText(m.right)}.`;
      const rule = fact && !fact.calc ? `Nhớ: ${fact.text}.` : 'Tính như với số tự nhiên rồi viết thêm đơn vị.';
      done(mistakes, { ok: hl(ok), tip: tip ? hl(`${rule}${m.t === 'cmp' ? ' Đổi về cùng đơn vị rồi mới so sánh.' : ''}`) : '' });
    }

    ask();

    if (import.meta.env.DEV) {
      window.__g3drill = {
        m,
        step: () => {
          if (busy) return;
          const st = steps[si];
          if (!st) return;
          if (st.kind === 'fill') pad.type(String(st.ans));
          else paper.querySelector(`[data-s="${st.ans}"]`)?.click();
        },
        wrong: () => {
          if (busy) return;
          const st = steps[si];
          if (!st) return;
          if (st.kind === 'fill') pad.type(String(st.ans + 1));
          else paper.querySelector(`[data-s]:not([data-s="${st.ans}"])`)?.click();
        },
      };
    }
  },
};

/** Đồ vật trên khay của bài m (cùng thứ tự với buildModel) — dùng để vẽ đồ bay. */
function trayModel(m) {
  const d = m.dim;
  if (m.t === 'conv') return expand(m.from, m.to).map(p => objOf(p, d));
  if (m.t !== 'calc') return [];
  const A = val([m.a]) / U[m.u], u = m.u;
  if (m.op === '+') return [{ v: A, label: `${fmt(A)} ${u}`, u }, { v: m.b, label: `${fmt(m.b)} ${u}`, u }].map(p => objOf(p, d));
  if (m.op === '×') return Array.from({ length: m.b }, () => objOf({ v: A, label: `${fmt(A)} ${u}`, u }, d));
  if (m.op === '−') return d === 'mass' ? [{ kind: 'plate', v: m.b, label: `${fmt(m.b)} g` }] : [{ kind: 'cup', v: m.b, label: `${fmt(m.b)} ml`, empty: true }];
  return Array.from({ length: m.b }, () => ({ kind: 'cup', v: m.ans, label: '?', empty: true }));
}

let unitStyles = false;
function injectUnitStyles() {
  if (unitStyles) return;
  unitStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g3u { flex: 1; min-height: 0; display: grid; grid-template-rows: auto auto minmax(0, 1fr); gap: 1.2cqh; padding: 1.6cqh 2.4cqi 1.6cqh calc(clamp(1.4rem, 4cqi, 3rem) + 1.6cqi); font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .g3u-cmp { grid-template-rows: auto auto minmax(0, 1fr) auto; }
    .g3u > * { min-height: 0; }
    .g3u-prob { display: flex; align-items: center; justify-content: center; gap: 0.3em; font-size: min(12cqh, 6.6cqi, calc(88cqi / var(--pl, 14))); line-height: 1.2; white-space: nowrap; }
    .g3u-prob .g3d-box { height: 1.15em; }
    .g3u-a { display: inline-block; text-align: right; }
    .g3u-a-new { color: #15803D; }
    .g3u-work { display: flex; align-items: center; justify-content: center; gap: 0.8em; font-size: min(7.4cqh, 4.4cqi); line-height: 1.2; min-height: 1.5em; white-space: nowrap; }
    .g3u-wl { display: inline-flex; align-items: center; gap: 0.25em; color: #334155; }
    .g3u-wl .g3d-box { height: 1.2em; }
    .g3u-fact { display: inline-block; background: #ECFDF5; color: #047857; border: 2px solid #6EE7B7; border-radius: 999px; padding: 0 0.7em; }
    .g3u-fact-calc { background: #EFF6FF; color: #1D4ED8; border-color: #93C5FD; }
    .g3u-fact-done { background: #F0FDF4; color: #15803D; border-color: #86EFAC; }
    .g3u-hide { visibility: hidden; }
    .g3u-vis { display: flex; min-height: 0; }
    .g3u-svg { flex: 1; width: 100%; height: 100%; overflow: visible; }
    .g3u-sign { display: inline-grid; place-items: center; width: 1.2em; height: 1.2em; border: 0.07em dashed #93C5FD; border-radius: 50%; color: #1D4ED8; box-sizing: border-box; }
    .g3u-sign-ok { border-style: solid; border-color: #22C55E; background: #F0FDF4; color: #15803D; }
    .g3u-signs { display: flex; gap: 4cqi; justify-content: center; height: 15cqh; }
    .g3u-sbtn { font-size: min(11cqh, 8cqi); max-width: 24cqi; line-height: 1; padding: 0; }
    .g3u-chip { width: 100%; height: 100%; display: grid; place-items: center; white-space: nowrap; background: #FEF08A; color: #92400E; border: 2px solid #CA8A04; border-radius: 999px; font-family: 'Baloo 2', sans-serif; font-weight: 800; box-sizing: border-box; }
    .g3u-barfly { width: 100%; height: 100%; background: ${COL.a}; border: 4px solid ${INK}; border-radius: 6px; box-sizing: border-box; }
    .g3u-cutfly { width: 100%; height: 100%; border-radius: 6px; border: 4px solid ${INK}; box-sizing: border-box; background: repeating-linear-gradient(45deg, #FEE2E2 0 8px, #F87171 8px 14px); }
    .g3u-waterfly { width: 100%; height: 100%; background: ${WATER.a}; border: 3px solid #0369A1; border-radius: 40% 40% 12px 12px; box-sizing: border-box; }
    /* Chữ trong SVG */
    .g3u-svg text { font-family: 'Baloo 2', sans-serif; font-weight: 800; }
    .g3u-rl { font-size: 34px; text-anchor: middle; fill: #78350F; }
    .g3u-ru { font-size: 26px; text-anchor: start; fill: #B45309; }
    .g3u-bl { font-size: 38px; text-anchor: middle; fill: #1E293B; }
    .g3u-off { visibility: hidden; }
    .g3u-ml { font-size: 32px; text-anchor: middle; fill: #92400E; }
    .g3u-cap { font-size: 54px; fill: #EA580C; }
    .g3u-cap-end { text-anchor: end; }
    .g3u-cap-mid { text-anchor: middle; font-size: 48px; }
    .g3u-cap-given { fill: #1E293B; }
    .g3u-cap-done { fill: #15803D; }
    .g3u-pop { animation: g3uPop .35s cubic-bezier(.2,1.6,.4,1); transform-box: fill-box; transform-origin: 50% 50%; }
    @keyframes g3uPop { from { transform: scale(0.6); } }
    .g3u-tl { font-size: 28px; text-anchor: middle; fill: #334155; }
    .g3u-tl-done { fill: #15803D; }
    .g3u-dl { font-size: 24px; text-anchor: middle; fill: #1E293B; }
    .g3u-du { font-size: 26px; text-anchor: middle; fill: #64748B; }
    .g3u-jl { font-size: 26px; text-anchor: end; fill: #0C4A6E; }
    .g3u-ju { fill: #64748B; }
    .g3u-mark rect { fill: #FDE047; fill-opacity: 0.5; stroke: #CA8A04; stroke-width: 3; stroke-dasharray: 9 6; }
    .g3u-arc { fill: none; stroke: #FACC15; stroke-width: 14; stroke-opacity: 0.9; }
    .g3u-needle { transition: transform .9s cubic-bezier(.3,1.25,.5,1); }
    .g3u-layer { transition: transform .7s ease-out; }
    .g3u-tobj { transition: opacity .25s; }
    .g3u-gone rect { fill: #fff; stroke-dasharray: 12 9; }
    .g3u-gone text { visibility: hidden; }
    .g3u-glow { animation: g3uGlow 0.9s ease-in-out 2; filter: drop-shadow(0 0 8px #FACC15) drop-shadow(0 0 4px #FACC15); }
    @keyframes g3uGlow { 50% { filter: drop-shadow(0 0 18px #FACC15) drop-shadow(0 0 8px #F59E0B); } }
    @media (prefers-reduced-motion: reduce) {
      .g3u-pop { animation: g3uFade .4s ease; }
      @keyframes g3uFade { from { opacity: 0.3; } }
      .g3u-needle { transition: transform 1.4s ease-in-out; }
      .g3u-layer { transition: transform 1.2s ease-in-out; }
      .g3u-glow { animation: none; }
    }
    /* Tờ vở đứng (màn dọc) */
    @container (aspect-ratio < 1.1) {
      .g3u-prob { font-size: min(10cqh, 8.4cqi, calc(90cqi / var(--pl, 14))); }
      .g3u-work { font-size: min(6.4cqh, 5.4cqi); }
      .g3u-signs { height: 12cqh; }
      .g3u-sbtn { font-size: min(9cqh, 9cqi); }
    }
  `;
  document.head.appendChild(st);
}
