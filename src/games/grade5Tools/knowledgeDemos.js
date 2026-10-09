/**
 * Ví dụ "xem từng bước" riêng của 📘 Kiến thức Toán 5 Tập Một (knowledge.js), đăng kí vào knowledgeDemo.js.
 * Các loại của Toán 4 (board, frac, geo…) chỉ làm với số tự nhiên; ở đây là số thập phân, hỗn số và hình lớp 5.
 *
 *   { kind: 'g5-decfrac', a: 3, b: 5 }                        Bài 4  phân số thập phân (op ':' và k để chia)
 *   { kind: 'g5-mixed', w: 2, a: 3, b: 4 }                    Bài 7  hỗn số
 *   { kind: 'g5-dplace', n: '325,431' }                       Bài 10 bảng hàng, đọc viết số thập phân
 *   { kind: 'g5-measure', parts: [[3, 'm'], [8, 'cm']], units: ['m', 'dm', 'cm'], to: 'm', w: 1 }  Bài 10, 12, 16
 *   { kind: 'g5-dcmp', a: '2,75', b: '2,29' }                 Bài 11 so sánh
 *   { kind: 'g5-round', n: '31,56', to: 0 }                   Bài 13 làm tròn (to: số chữ số sau dấu phẩy giữ lại)
 *   { kind: 'g5-ha' }                                         Bài 15 km², ha
 *   { kind: 'g5-dcol', a: '24,5', b: '3,84', op: '+' }        Bài 19, 20 cộng, trừ đặt tính
 *   { kind: 'g5-dmul', a: '4,3', b: '3,6' }                   Bài 21 nhân
 *   { kind: 'g5-ddiv', a: '92,8', b: '4' }                    Bài 22 chia (số chia thập phân thì chuyển dấu phẩy trước)
 *   { kind: 'g5-shift', n: '27,86', op: '×', by: '10' }       Bài 23 nhân, chia với 10; 100… hoặc 0,1; 0,01…
 *   { kind: 'g5-tri', a: 4, h: 3 } / { kind: 'g5-trap', a: 6, b: 4, h: 3 }   Bài 25, 26 cắt ghép
 *   { kind: 'g5-circle', mode: 'C', d: 2, unit: 'dm' } / { mode: 'S', r: 10, unit: 'cm' }   Bài 27
 * Số thập phân viết bằng chuỗi kiểu Việt Nam ("3,25") để giữ đúng các chữ số 0.
 */

import { registerDemos } from '../grade4Textbook/knowledgeDemo.js';
import { frames, svg, txt, C, fr, numAsk, fmt, PLACES } from '../grade4Textbook/demos/util.js';
import { readFrac } from '../grade4Textbook/demos/frac.js';
import { readDec, dec, readVN } from './num.js';

// ── Số thập phân dạng chuỗi ──────────────────────────────────────────────────
const P = (s) => { const [i, d = ''] = String(s).replace(/\s/g, '').split(','); return { i, d }; };
/** Số nguyên đã nhân với 10^D: "24,5", 2 → 2450. */
const toInt = (s, D) => { const { i, d } = P(s); return Number(i + d.padEnd(D, '0')); };
/** 2450, 2 → "24,50" (giữ số 0 cuối). */
const fromInt = (n, D) => { const s = String(n).padStart(D + 1, '0'); return D ? `${s.slice(0, -D)},${s.slice(-D)}` : s; };
/** Bỏ số 0 ở tận cùng phần thập phân: "1,250" → "1,25", "5,00" → "5". */
const trimDec = (s) => (String(s).includes(',') ? String(s).replace(/0+$/, '').replace(/,$/, '') : String(s));
/** Hiện số: tách lớp phần nguyên từ 5 chữ số như sách. */
const F = (s) => { const { i, d } = P(s); return `${fmt(Number(i))}${d ? `,${d}` : ''}`; };
const D = (x) => dec(x);
const DECN = ['phần mười', 'phần trăm', 'phần nghìn', 'phần chục nghìn'];
const cap = (t) => t[0].toUpperCase() + t.slice(1);
const mx = (w, a, b) => `<span class="k5-mx">${w}${fr(a, b)}</span>`;
const WORD = ['không', 'một', 'hai', 'ba', 'bốn', 'năm'];

/** Ba lựa chọn số thập phân (đáp án + các số nhiễu), xếp từ bé đến lớn. */
function decAsk(ans, others, { unit = '', ok } = {}) {
  const vals = [ans];
  others.forEach((v) => { if (v > 0 && !vals.some((x) => Math.abs(x - v) < 1e-9) && vals.length < 3) vals.push(v); });
  vals.sort((x, y) => x - y);
  return { options: vals.map((v) => `${D(v)}${unit ? ` ${unit}` : ''}`), answer: vals.findIndex((x) => Math.abs(x - ans) < 1e-9), ok };
}

// ── Bảng chữ số thẳng cột (dùng lại kiểu .kd-board của Toán 4), dấu phẩy gắn sau một chữ số ────────────
const ROWH = { head: 'auto', cls: 'auto', carry: '0.6em', borrow: '0.6em', num: '1.25em', sign: '0.95em', line: '0.4em' };

function grid(layout, W, { gaps = new Set(), heads = null, gapW = '0.3em', cls = '' } = {}) {
  const cells = {};
  layout.forEach((r) => { cells[r.k] = Array.from({ length: W }, () => null); });
  const B = { layout, W, cells, bands: [], spans: [], frames: [], result: '', gaps, gapW, cls, top: null, extra: null };
  if (heads && cells.head) cells.head = heads.map((t) => ({ t }));
  B.put = (k, str, end, extra = {}) => {
    const s = String(str);
    for (let j = 0; j < s.length; j++) cells[k][end - s.length + 1 + j] = { t: s[j], ...extra };
  };
  /** Viết số thập phân "24,5" sao cho chữ số hàng đơn vị ở cột cc (dấu phẩy ngay sau cột cc). */
  B.putDec = (k, s, cc, extra = {}) => {
    const { i, d } = P(s);
    B.put(k, i, cc, extra);
    for (let j = 0; j < d.length; j++) cells[k][cc + 1 + j] = { t: d[j], ...extra };
    if (d) cells[k][cc].cm = true;
  };
  B.snap = (caption, more = {}) => {
    B.frames.push({ html: render(B), caption, result: B.result, ...more });
    Object.values(cells).forEach((row) => row.forEach((c) => { if (c) { c.isNew = false; c.cmNew = false; } }));
    B.bands.forEach((x) => { x.isNew = false; });
    B.spans.forEach((x) => { x.isNew = false; });
    if (B.top) B.top.isNew = false;
  };
  return B;
}

function render(B) {
  const cols = ['auto'], colOf = [];
  for (let i = 0; i < B.W; i++) {
    if (B.gaps.has(i)) cols.push(B.gapW);
    cols.push('var(--kc)'); colOf[i] = cols.length;
  }
  const rows = B.layout.map((r) => ROWH[r.kind]);
  let h = '';
  B.bands.forEach((x) => {
    const r1 = x.rows ? x.rows[0] + 1 : 1, r2 = x.rows ? x.rows[1] + 2 : rows.length + 1;
    const c2 = x.to != null ? colOf[x.to] + 1 : colOf[x.col] + 1;
    h += `<i class="kd-band is-${x.tone}${x.isNew ? ' is-new' : ''}" style="grid-column:${colOf[x.col]}/${c2};grid-row:${r1}/${r2}"></i>`;
  });
  B.spans.forEach((x) => {
    h += `<span class="kd-span ${x.cls || ''}${x.isNew ? ' is-new' : ''}" style="grid-row:${x.row + 1};grid-column:${colOf[x.c1]}/${colOf[x.c2] + 1}">${x.t || ''}</span>`;
  });
  B.layout.forEach((r, ri) => {
    const row = ri + 1;
    if (r.lead) h += `<span class="kd-lead" style="grid-row:${row};grid-column:1">${r.lead}</span>`;
    if (r.kind === 'line') {
      const c1 = r.c1 != null ? colOf[r.c1] : 2, c2 = r.c2 != null ? colOf[r.c2] + 1 : cols.length + 1;
      h += `<i class="kd-line${r.show === false ? ' kd-ghost' : ''}" style="grid-row:${row};grid-column:${c1}/${c2}"></i>`;
      return;
    }
    (B.cells[r.k] || []).forEach((c, i) => {
      if (!c) return;
      const k = `kd-${r.kind}${c.c ? ` ${c.c}` : ''}${c.isNew ? ' is-new' : ''}`;
      const cm = c.cm ? `<i class="k5-cm${c.cmNew ? ' is-new' : ''}${c.cmCls ? ` ${c.cmCls}` : ''}">,</i>` : '';
      h += `<span class="${k}" style="grid-row:${row};grid-column:${colOf[i]}">${c.t}${cm}</span>`;
    });
  });
  if (B.extra) h += B.extra(colOf, cols.length);
  const ems = B.W * 1.3 + B.gaps.size * (parseFloat(B.gapW) || 0.3) + 1.8;
  const board = `<div class="kd-board k5-board ${B.cls}" style="--n:${ems};grid-template-columns:${cols.join(' ')};grid-template-rows:${rows.join(' ')}">${h}</div>`;
  if (!B.top) return board;
  return `<div class="k5-wrap"><div class="k5-eq">${B.top.html()}</div>${board}</div>`;
}

/** Tên hàng của cột i khi chữ số hàng đơn vị ở cột cc. */
const placeOf = (i, cc) => (i <= cc ? PLACES[cc - i] : DECN[i - cc - 1]);

// ── Bài 4: phân số thập phân ─────────────────────────────────────────────────
function decfrac({ a = 3, b = 5, op, k, to }) {
  let T = to, K = k, O = op;
  if (!K) {
    T = [10, 100, 1000, 10000].find((t) => t % b === 0);
    if (T) { O = '×'; K = T / b; } else { T = [10, 100, 1000].find((t) => b % t === 0 && a % (b / t) === 0); O = ':'; K = b / T; }
  } else T = O === ':' ? b / K : b * K;
  const A = O === ':' ? a / K : a * K;
  const Fr = frames(`Viết ${fr(a, b)} thành phân số thập phân`);
  const line = (s1, s2) => `<div class="k5-fline">${fr(a, b)}<span class="${s1 ? (s1 === 'new' ? 'is-new' : '') : 'kd-ghost'}">=${fr(`${a} ${O} ${K}`, `${b} ${O} ${K}`)}</span><span class="${s2 ? (s2 === 'new' ? 'is-new' : '') : 'kd-ghost'}">=${fr(`<b>${A}</b>`, `<b>${fmt(T)}</b>`)}</span></div>`;
  Fr.add(line(0, 0), `Phân số thập phân có mẫu số là <b>10, 100, 1000,…</b> Muốn viết ${fr(a, b)} thành phân số thập phân, ta làm cho mẫu số ${b} thành ${fmt(T)}.`);
  Fr.add(line(0, 0), O === '×' ? `${b} nhân với mấy thì được ${fmt(T)}?` : `${b} chia cho mấy thì được ${fmt(T)}?`, { ask: numAsk(K, { near: [1, -1, 2, 5], ok: `Đúng rồi! ${b} ${O} ${K} = ${fmt(T)}.` }) });
  Fr.add(line('new', 0), `${O === '×' ? 'Nhân' : 'Chia'} <b>cả tử số và mẫu số</b> ${O === '×' ? 'với' : 'cho'} ${K} thì được phân số bằng ${fr(a, b)}.`);
  Fr.add(line(1, 'new'), `${a} ${O} ${K} = ${A}; ${b} ${O} ${K} = ${fmt(T)}. Vậy ${fr(a, b)} = ${fr(A, fmt(T))}: đó là <b>phân số thập phân</b>.`, { result: `${fr(a, b)} = ${fr(A, fmt(T))}` });
  return Fr.done();
}

// ── Bài 7: hỗn số ────────────────────────────────────────────────────────────
function pie(cx, cy, r, n, fill, { newCls = () => '', lines = true } = {}) {
  let h = '';
  if (n === 1) h += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill(0) || '#fff'}"/>`;
  else {
    for (let i = 0; i < n; i++) {
      const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / n, a1 = a0 + (2 * Math.PI) / n;
      const p = (t) => `${(cx + r * Math.cos(t)).toFixed(1)} ${(cy + r * Math.sin(t)).toFixed(1)}`;
      h += `<path d="M${cx} ${cy} L${p(a0)} A${r} ${r} 0 0 1 ${p(a1)} Z" fill="${fill(i) || '#fff'}" stroke="${lines ? '#92400E' : 'none'}" stroke-width="1.4" class="${newCls(i)}"/>`;
    }
  }
  return `${h}<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#92400E" stroke-width="2.5"/>`;
}

function mixed({ w = 2, a = 3, b = 4 }) {
  const Fr = frames(`Hỗn số ${mx(w, a, b)}`);
  const n = w + 1, R = Math.min(52, (340 / n) / 2 - 8), cy = 76;
  const cx = (i) => 180 + (i - (n - 1) / 2) * (2 * R + 18);
  const CAKE = '#FBBF24';
  const draw = ({ split = false, newSplit = false, labels = true } = {}) => {
    let h = '';
    for (let i = 0; i < w; i++) {
      h += pie(cx(i), cy, R, split ? b : 1, () => CAKE, { newCls: () => (newSplit ? 'is-fade' : '') });
      if (labels) h += txt(cx(i), cy + R + 22, '1 cái', { size: 15, fill: C.soft });
    }
    h += pie(cx(w), cy, R, b, (i) => (i < a ? CAKE : null));
    if (labels) h += txt(cx(w), cy + R + 22, `${a}/${b} cái`, { size: 15, fill: C.soft });
    return svg(360, 175, h);
  };
  const say = `${readVN(w)} và ${readFrac(a, b)}`;
  Fr.add(draw(), `Có <b>${w} cái bánh</b> và <b>${fr(a, b)} cái bánh</b>.`);
  Fr.add(draw(), 'Viết gọn số bánh này thế nào?', { ask: { options: [mx(w, a, b), fr(w + a, b), fr(a, b)], answer: 0, ok: `Đúng rồi! ${w} cái và ${fr(a, b)} cái bánh viết gọn là ${mx(w, a, b)} cái bánh.` } });
  Fr.add(draw(), `${mx(w, a, b)} là <b>hỗn số</b>: phần nguyên là <b>${w}</b>, phần phân số là <b>${fr(a, b)}</b> (bé hơn 1). Đọc là: <b>${say}</b>.`, { result: `${mx(w, a, b)}: ${say}` });
  Fr.add(draw({ split: true, newSplit: true }), `Đổi hỗn số ra phân số: chia mỗi cái bánh thành ${b} phần bằng nhau. ${w} cái bánh có ${w} × ${b} = <b>${w * b} phần</b>.`);
  Fr.add(draw({ split: true }), `Thêm ${a} phần của cái bánh cuối. Có tất cả bao nhiêu phần ${fr(1, b)}?`, { ask: numAsk(w * b + a, { near: [-a, 1, -1], ok: `Đúng rồi! ${w * b} + ${a} = ${w * b + a} phần.` }) });
  Fr.add(draw({ split: true }), `Tử số = phần nguyên × mẫu số + tử số; mẫu số giữ nguyên: ${mx(w, a, b)} = ${fr(`${w} × ${b} + ${a}`, b)} = ${fr(w * b + a, b)}.`, { result: `${mx(w, a, b)} = ${fr(w * b + a, b)}` });
  return Fr.done();
}

// ── Bài 10: bảng hàng của số thập phân ───────────────────────────────────────
function dplace({ n = '325,431' }) {
  const { i, d } = P(n), I = i.length, W = I + d.length;
  const heads = [...i.split('').map((_, k) => cap(PLACES[I - 1 - k])), ...d.split('').map((_, j) => cap(DECN[j]))];
  const B = grid([{ k: 'head', kind: 'head' }, { k: 'a', kind: 'num' }], W, { heads, gaps: new Set([I]), gapW: '0.45em' });
  const fn = F(n);
  B.snap(`Viết số <b>${fn}</b> vào bảng. Bên trái dấu phẩy là <b>phần nguyên</b>, bên phải dấu phẩy là <b>phần thập phân</b>.`);
  B.put('a', i, I - 1, { c: 'res', isNew: true });
  B.bands = [{ col: 0, to: I - 1, tone: 'cls0', isNew: true }];
  B.snap(`Phần nguyên <b>${fmt(Number(i))}</b>: ${i.split('').map((x, k) => `${x} ${PLACES[I - 1 - k]}`).join(', ')}.`);
  B.cells.a[I - 1].cm = true; B.cells.a[I - 1].cmNew = true;
  B.bands = [];
  B.snap('Viết <b>dấu phẩy</b> ngay sau chữ số hàng đơn vị.');
  const askAt = d.length >= 2 ? 1 : 0;
  d.split('').forEach((x, j) => {
    B.bands = [{ col: I + j, tone: 'hot', isNew: true }];
    if (j === askAt) {
      B.snap(`Chữ số tiếp theo là <b>${x}</b>. Viết ${x} vào hàng nào?`, { ask: { options: DECN.slice(0, Math.max(3, d.length)).map(cap), answer: j, ok: `Đúng rồi! Chữ số thứ ${j + 1} sau dấu phẩy ở hàng ${DECN[j]}.` } });
      B.bands[0].isNew = false;
    }
    B.cells.a[I + j] = { t: x, c: 'res', isNew: true };
    B.snap(`<b>${x} ${DECN[j]}</b>: viết ${x} vào hàng ${DECN[j]}.`);
  });
  B.bands = [{ col: 0, to: I - 1, tone: 'cls0' }, { col: I, to: W - 1, tone: 'cls1', isNew: true }];
  B.cells.a.forEach((c) => { if (c) c.c = ''; });
  B.result = fn;
  B.snap(`Đọc phần nguyên, đọc "phẩy", rồi đọc phần thập phân: <b>${readDec(n)}</b>.`);
  return { title: `Đọc, viết số ${fn}`, frames: B.frames };
}

// ── Bài 10, 12, 16: viết số đo dưới dạng số thập phân ────────────────────────
function measure({ parts, units: U, to, w = 1, title }) {
  const W = U.length * w;
  const B = grid([{ k: 'cls', kind: 'cls' }, { k: 'a', kind: 'num' }], W, { gaps: new Set(U.map((_, i) => i * w).filter(Boolean)) });
  U.forEach((u, i) => B.spans.push({ row: 0, c1: i * w, c2: i * w + w - 1, t: u, cls: 'kd-unith' }));
  const endOf = (u) => U.indexOf(u) * w + w - 1;
  const from = parts.map(([v, u]) => `${v} ${u}`).join(' ');
  B.snap(`Viết <b>${from}</b> thành số đo có đơn vị là <b>${to}</b>. Mỗi đơn vị gấp ${w === 2 ? '100' : '10'} lần đơn vị bé hơn liền nó, nên mỗi đơn vị có <b>${w === 2 ? 'hai chữ số' : 'một chữ số'}</b> trong bảng.`);
  let lo = Infinity, hi = -1;
  parts.forEach(([v, u], n) => {
    const e = endOf(u);
    const pad = w > 1 && (n > 0 || U.indexOf(u) > U.indexOf(to)) ? String(v).padStart(w, '0') : String(v);
    B.put('a', pad, e, { c: 'res', isNew: true });
    if (pad !== String(v)) B.cells.a[e - pad.length + 1].c = 'zero';
    lo = Math.min(lo, e - pad.length + 1); hi = Math.max(hi, e);
    B.bands = [{ col: e - pad.length + 1, to: e, tone: 'hot', isNew: true }];
    B.snap(`Viết ${v} sao cho chữ số cuối ở cột <b>${u}</b>${pad !== String(v) ? ` (${u} có hai chữ số nên viết ${pad})` : ''}.`);
  });
  const toEnd = endOf(to);
  let filled = 0;
  for (let i = Math.min(lo, toEnd); i <= hi; i++) if (!B.cells.a[i]) { B.cells.a[i] = { t: '0', c: 'zero', isNew: true }; filled++; }
  B.bands = [];
  if (filled) B.snap('Cột còn trống ở giữa (và cột <b>' + to + '</b> nếu trống) viết <b>chữ số 0</b>.');
  B.snap(`Muốn được số đo theo đơn vị <b>${to}</b>, viết dấu phẩy ở đâu?`, { ask: { options: [`Ngay sau cột ${to}`, `Ngay sau cột ${U[U.length - 1]}`], answer: 0, ok: `Đúng rồi! Chữ số hàng đơn vị của số đo theo ${to} nằm ở cột ${to}.` } });
  const first = B.cells.a.findIndex(Boolean);
  let int = B.cells.a.slice(first, toEnd + 1).map((c) => (c ? c.t : '0')).join('').replace(/^0+(?=\d)/, '');
  const decs = B.cells.a.slice(toEnd + 1, hi + 1).map((c) => (c ? c.t : '0')).join('');
  B.cells.a[toEnd].cm = true; B.cells.a[toEnd].cmNew = true;
  B.bands = [{ col: first, to: toEnd, tone: 'cls0', isNew: true }, { col: toEnd + 1, to: hi, tone: 'cls1', isNew: true }];
  const den = fmt(10 ** decs.length);
  const asFrac = int === '0' ? fr(decs.replace(/^0+/, ''), den) : mx(int, decs.replace(/^0+/, ''), den);
  const full = `${int},${decs}`, short = trimDec(full);
  B.snap(`Viết dấu phẩy ngay sau cột ${to}: ${from} = ${asFrac} ${to} = <b>${F(full)} ${to}</b>.`);
  if (short !== full) {
    for (let i = hi; i > toEnd && B.cells.a[i].t === '0'; i--) { B.cells.a[i].c = 'strike'; B.cells.a[i].isNew = true; }
    B.snap(`Bỏ chữ số 0 ở tận cùng bên phải phần thập phân, số không đổi: <b>${F(full)} ${to} = ${F(short)} ${to}</b>.`);
  }
  B.bands = [];
  B.result = `${from} = ${F(short)} ${to}`;
  B.snap(`Vậy <b>${from} = ${F(short)} ${to}</b>.`);
  return { title: title || `${from} = ? ${to}`, frames: B.frames };
}

// ── Bài 11: so sánh hai số thập phân ─────────────────────────────────────────
function dcmp({ a, b }) {
  const A = P(a), Bq = P(b);
  const I = Math.max(A.i.length, Bq.i.length), Dn = Math.max(A.d.length, Bq.d.length), W = I + Dn;
  const heads = [...Array(I)].map((_, k) => cap(PLACES[I - 1 - k])).concat([...Array(Dn)].map((_, j) => cap(DECN[j])));
  const B = grid([{ k: 'head', kind: 'head' }, { k: 'a', kind: 'num' }, { k: 's', kind: 'sign' }, { k: 'b', kind: 'num' }], W, { heads, gaps: Dn ? new Set([I]) : new Set(), gapW: '0.45em' });
  const fa = F(a), fb = F(b);
  [['a', A, a], ['b', Bq, b]].forEach(([k, X, s]) => {
    B.putDec(k, s, I - 1);
    for (let j = X.d.length; j < Dn; j++) B.cells[k][I + j] = { t: '0', c: 'kd-ghost' };
  });
  B.snap(`So sánh <b>${fa}</b> và <b>${fb}</b>. Viết hai số thẳng cột theo hàng: phần nguyên thẳng phần nguyên, dấu phẩy thẳng dấu phẩy.`);
  const ia = Number(A.i), ib = Number(Bq.i);
  const sgn = (x, y) => (x < y ? '<' : x > y ? '>' : '=');
  const signs = ['&lt;', '&gt;'];
  const finish = (sg, why) => {
    B.result = `${fa} ${sg === '<' ? '&lt;' : sg === '>' ? '&gt;' : '='} ${fb}`;
    B.snap(`${why} Vậy <b>${B.result}</b>.`);
    return { title: `So sánh ${fa} và ${fb}`, frames: B.frames };
  };
  B.bands = [{ col: 0, to: I - 1, tone: 'hot', isNew: true }];
  if (ia !== ib) {
    const sg = sgn(ia, ib);
    B.cells.s[I - 1] = { t: '?', c: 'diff q', isNew: true };
    B.snap(`So sánh <b>phần nguyên</b> trước: ${ia} và ${ib}. Em chọn dấu đúng: ${fa} ? ${fb}`, { ask: { options: signs, answer: sg === '<' ? 0 : 1, ok: `Đúng rồi! Phần nguyên ${ia} ${signs[sg === '<' ? 0 : 1]} ${ib}.` } });
    B.cells.s[I - 1] = { t: sg === '<' ? '&lt;' : '&gt;', c: 'diff', isNew: true };
    for (let j = 0; j < Dn; j++) ['a', 'b'].forEach((k) => { if (B.cells[k][I + j]) B.cells[k][I + j].c = B.cells[k][I + j].c === 'kd-ghost' ? 'kd-ghost' : 'dim'; });
    return finish(sg, `Phần nguyên khác nhau: số nào có phần nguyên lớn hơn thì lớn hơn${Dn ? ', không cần xét phần thập phân' : ''}.`);
  }
  B.cells.s[I - 1] = { t: '=', isNew: true };
  B.snap(`Phần nguyên bằng nhau (${ia} = ${ib}). So sánh tiếp phần thập phân, lần lượt từ <b>hàng phần mười</b>.`);
  B.bands[0].tone = 'eq';
  for (let j = 0; j < Dn; j++) {
    const col = I + j;
    B.bands = B.bands.filter((x) => x.tone === 'eq');
    B.bands.push({ col, tone: 'hot', isNew: true });
    for (const [k, X, s] of [['a', A, a], ['b', Bq, b]]) {
      if (j >= X.d.length) {
        B.cells[k][col] = { t: '0', c: 'zero', isNew: true };
        if (!X.d) { B.cells[k][I - 1].cm = true; B.cells[k][I - 1].cmNew = true; }
        B.snap(`${F(s)} không có chữ số hàng ${DECN[j]}: viết thêm <b>chữ số 0</b> (${F(s)} = ${F(`${X.i},${X.d.padEnd(j + 1, '0')}`)}). Viết thêm 0 ở tận cùng bên phải phần thập phân thì số không đổi.`);
        B.bands[B.bands.length - 1].isNew = false;
      }
    }
    const da = Number(A.d[j] || 0), db = Number(Bq.d[j] || 0);
    if (da === db) {
      B.cells.s[col] = { t: '=', isNew: true };
      B.snap(`Hàng ${DECN[j]}: ${da} = ${db}${j < Dn - 1 ? ', xét tiếp hàng bên phải' : ''}.`);
      B.bands[B.bands.length - 1].tone = 'eq';
      continue;
    }
    const sg = sgn(da, db);
    B.cells.s[col] = { t: '?', c: 'diff q', isNew: true };
    B.bands[B.bands.length - 1].tone = 'diff';
    B.snap(`Hàng ${DECN[j]}: ${da} và ${db} khác nhau. Em chọn dấu đúng: ${fa} ? ${fb}`, { ask: { options: signs, answer: sg === '<' ? 0 : 1, ok: `Đúng rồi! Hàng ${DECN[j]}: ${da} ${signs[sg === '<' ? 0 : 1]} ${db}.` } });
    B.cells.s[col] = { t: sg === '<' ? '&lt;' : '&gt;', c: 'diff', isNew: true };
    for (let x = j + 1; x < Dn; x++) ['a', 'b'].forEach((k) => { if (B.cells[k][I + x] && B.cells[k][I + x].c !== 'kd-ghost') B.cells[k][I + x].c = 'dim'; });
    return finish(sg, `Phần nguyên bằng nhau, hàng ${DECN[j]} có ${da} ${signs[sg === '<' ? 0 : 1]} ${db}.`);
  }
  B.bands = [];
  B.snap(`Mọi hàng đều bằng nhau. Em chọn dấu đúng: ${fa} ? ${fb}`, { ask: { options: ['&lt;', '=', '&gt;'], answer: 1, ok: 'Đúng rồi! Hai số bằng nhau.' } });
  return finish('=', 'Mọi hàng đều bằng nhau.');
}

// ── Bài 13: làm tròn số thập phân ────────────────────────────────────────────
function round({ n = '31,56', to = 0 }) {
  const { i, d } = P(n), Dd = d.length, N = toInt(n, Dd), step = 10 ** (Dd - to);
  const low = Math.floor(N / step), L = fromInt(low, to), U = fromInt(low + 1, to);
  const nd = Number(d[to]), up = nd >= 5, res = up ? U : L;
  const toName = to === 0 ? 'số tự nhiên gần nhất' : `hàng ${DECN[to - 1]}`;
  const placeName = to === 0 ? 'đơn vị' : DECN[to - 1];
  const digits = (ring) => {
    let h = '';
    const all = i + d;
    for (let k = 0; k < all.length; k++) {
      const isPlace = k === i.length - 1 + to, isNext = k === i.length + to;
      const c = ring && isPlace ? 'k5-place' : ring && isNext ? 'k5-next is-new' : '';
      h += `<span class="k5-d ${c}">${all[k]}</span>`;
      if (k === i.length - 1) h += '<span class="k5-c">,</span>';
    }
    return `<div class="k5-big">${h}</div>`;
  };
  const pos = (N - low * step) / step;
  const line = ({ labels = false, arrow = false } = {}) => {
    const x0 = 34, x1 = 326, y = 62, X = x0 + (x1 - x0) * pos;
    let h = `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${C.ink}" stroke-width="2.5"/>`;
    for (let k = 0; k <= 10; k++) {
      const x = x0 + ((x1 - x0) * k) / 10, big = k === 0 || k === 10, mid = k === 5;
      h += `<line x1="${x}" y1="${y - (big ? 12 : mid ? 9 : 5)}" x2="${x}" y2="${y + (big ? 12 : mid ? 9 : 5)}" stroke="${mid ? C.orange : C.ink}" stroke-width="${big ? 2.5 : 1.6}"/>`;
    }
    const g = labels ? (labels === 'new' ? 'is-fade' : '') : 'kd-ghost';
    h += `<g class="${g}">${txt(x0, y + 30, F(L), { size: 18 })}${txt(x1, y + 30, F(U), { size: 18 })}<circle cx="${X.toFixed(1)}" cy="${y}" r="6" fill="${C.red}"/>${txt(X, y - 26, F(n), { size: 16, fill: C.red })}</g>`;
    if (arrow) {
      const tx = up ? x1 : x0;
      h += `<path d="M${X.toFixed(1)} ${y + 8} Q${((X + tx) / 2).toFixed(1)} ${y + 34} ${tx} ${y + 16}" fill="none" stroke="${C.green}" stroke-width="3" stroke-linecap="round" class="is-draw" style="--len:${Math.ceil(Math.abs(tx - X) + 40)}"/>`;
      h += `<circle cx="${tx}" cy="${y}" r="9" fill="none" stroke="${C.green}" stroke-width="3" class="is-new"/>`;
    }
    return svg(360, 110, h);
  };
  const scene = (ring, o) => `<div class="k5-wrap">${digits(ring)}${line(o)}</div>`;
  const Fr = frames(`Làm tròn ${F(n)} đến ${toName}`);
  const lowM = fromInt(low - 1, to), upP = fromInt(low + 2, to);
  const opts = [low - 1 >= 0 ? `${F(lowM)} và ${F(L)}` : null, `${F(L)} và ${F(U)}`, `${F(U)} và ${F(upP)}`].filter(Boolean);
  Fr.add(scene(false, {}), `Làm tròn <b>${F(n)}</b> đến ${toName}. Trước hết tìm xem ${F(n)} nằm giữa hai số nào.`);
  Fr.add(scene(false, {}), `${F(n)} nằm giữa hai số nào?`, { ask: { options: opts, answer: opts.indexOf(`${F(L)} và ${F(U)}`), ok: `Đúng rồi! ${F(L)} &lt; ${F(n)} &lt; ${F(U)}.` } });
  Fr.add(scene(false, { labels: 'new' }), `${F(n)} nằm giữa <b>${F(L)}</b> và <b>${F(U)}</b>. Vạch cam ở giữa là chỗ chữ số tiếp theo bằng 5.`);
  Fr.add(scene(true, { labels: true }), `Nhìn chữ số <b>ngay bên phải</b> hàng ${placeName}: đó là chữ số <b>${nd}</b> ở hàng ${DECN[to]}. Làm tròn thế nào?`, {
    ask: { options: [`Làm tròn xuống: ${F(L)}`, `Làm tròn lên: ${F(U)}`], answer: up ? 1 : 0, ok: up ? `Đúng rồi! ${nd} không bé hơn 5 nên làm tròn lên.` : `Đúng rồi! ${nd} bé hơn 5 nên làm tròn xuống.` },
  });
  Fr.add(scene(true, { labels: true, arrow: true }), `Chữ số ${nd} ${up ? 'lớn hơn hoặc bằng 5: làm tròn <b>lên</b>' : 'bé hơn 5: làm tròn <b>xuống</b>'}. Làm tròn ${F(n)} đến ${toName} ta được <b>${F(res)}</b>.`, { result: `${F(n)} làm tròn thành ${F(res)}` });
  return Fr.done();
}

// ── Bài 15: ki-lô-mét vuông, héc-ta ──────────────────────────────────────────
function hectare() {
  const x0 = 40, y0 = 16, S = 180, c = S / 10, px = 296;
  const Fr = frames('Ki-lô-mét vuông và héc-ta');
  const draw = ({ grid: gr = false, one = false, all = false, k = 0 } = {}) => {
    let h = `<rect x="${x0}" y="${y0}" width="${S}" height="${S}" fill="#ECFDF5"/>`;
    if (all) {
      for (let j = 0; j < 10; j++) {
        let row = '';
        for (let i = 0; i < 10; i++) if (i || j) row += `<rect x="${x0 + i * c}" y="${y0 + j * c}" width="${c}" height="${c}" fill="#BBF7D0" stroke="#16A34A" stroke-width="0.8"/>`;
        h += `<g class="${all === 'new' ? 'is-fade' : ''}" style="animation-delay:${(0.07 * j).toFixed(2)}s">${row}</g>`;
      }
    }
    if (gr) {
      let t = '';
      for (let i = 1; i < 10; i++) t += `M${x0 + i * c} ${y0} V${y0 + S} M${x0} ${y0 + i * c} H${x0 + S} `;
      h += `<path d="${t}" stroke="#86EFAC" stroke-width="1" class="${gr === 'new' ? 'is-fade' : ''}"/>`;
    }
    if (one) h += `<rect x="${x0}" y="${y0}" width="${c}" height="${c}" fill="${C.orange}" stroke="#C2410C" stroke-width="1.5" class="${one === 'new' ? 'is-new' : ''}"/>`;
    h += `<rect x="${x0}" y="${y0}" width="${S}" height="${S}" fill="none" stroke="${C.green}" stroke-width="3"/>`;
    h += txt(x0 + S / 2, y0 + S + 16, '1 km', { size: 15, fill: C.green });
    h += `<g transform="translate(${x0 - 16} ${y0 + S / 2}) rotate(-90)">${txt(0, 0, '1 km', { size: 15, fill: C.green })}</g>`;
    h += txt(px, 40, '1 km²', { size: 28, fill: C.green });
    h += k >= 1 ? txt(px, 72, '= 1 000 000 m²', { size: 14, fill: C.ink, cls: k === 1 ? 'is-new' : '' }) : '';
    if (one) h += txt(px, 112, '1 ô: 100 m × 100 m', { size: 13, fill: '#C2410C', cls: one === 'new' ? 'is-new' : '' }) + txt(px, 132, '= 1 ha', { size: 18, fill: '#C2410C', cls: one === 'new' ? 'is-new' : '' });
    if (k >= 2) h += txt(px, 154, '= 10 000 m²', { size: 14, fill: '#C2410C', cls: k === 2 ? 'is-new' : '' });
    if (k >= 3) h += txt(px, 188, '1 km² = 100 ha', { size: 15, fill: C.green, cls: k === 3 ? 'is-new' : '' });
    return svg(360, 220, h);
  };
  Fr.add(draw(), 'Hình vuông cạnh <b>1 km</b> có diện tích là <b>1 ki-lô-mét vuông</b>, viết tắt là 1 km².');
  Fr.add(draw(), '1 km = 1000 m. Vậy 1 km² bằng bao nhiêu mét vuông?', { ask: { options: ['1000 m²', '100 000 m²', '1 000 000 m²'], answer: 2, ok: 'Đúng rồi! 1000 × 1000 = 1 000 000. <b>1 km² = 1 000 000 m²</b>.' } });
  Fr.add(draw({ k: 1, grid: 'new', one: 'new' }), 'Chia mỗi cạnh 1 km thành 10 phần, mỗi phần <b>100 m</b>. Hình vuông cạnh 100 m có diện tích là <b>1 héc-ta</b>, viết tắt là 1 ha.');
  Fr.add(draw({ k: 1, grid: true, one: true }), 'Hình vuông cạnh 100 m. Vậy 1 ha bằng bao nhiêu mét vuông?', { ask: { options: ['1000 m²', '10 000 m²', '100 000 m²'], answer: 1, ok: 'Đúng rồi! 100 × 100 = 10 000. <b>1 ha = 10 000 m²</b>.' } });
  Fr.add(draw({ k: 2, grid: true, one: true, all: 'new' }), 'Hình vuông 1 km² được chia thành 10 hàng, mỗi hàng 10 ô 1 ha. 1 km² bằng bao nhiêu héc-ta?', { ask: { options: ['10 ha', '100 ha', '1000 ha'], answer: 1, ok: 'Đúng rồi! 10 × 10 = 100 ô, mỗi ô 1 ha.' } });
  Fr.add(draw({ k: 3, grid: true, one: true, all: true }), '<b>1 km² = 100 ha</b> và <b>1 ha = 10 000 m²</b>.', { result: '1 km² = 100 ha; 1 ha = 10 000 m²' });
  return Fr.done();
}

// ── Bài 19, 20: cộng, trừ số thập phân đặt tính ──────────────────────────────
function dcol({ a, b, op = '+' }) {
  const sub = op !== '+', sym = sub ? '−' : '+';
  const A = P(a), Bq = P(b), Dn = Math.max(A.d.length, Bq.d.length);
  const R = sub ? toInt(a, Dn) - toInt(b, Dn) : toInt(a, Dn) + toInt(b, Dn);
  const rs = fromInt(R, Dn), Rp = P(rs);
  const I = Math.max(A.i.length, Bq.i.length, Rp.i.length), W = I + Dn;
  const layout = [];
  if (!sub) layout.push({ k: 'carry', kind: 'carry' });
  layout.push({ k: 'a', kind: 'num' }, { k: 'b', kind: 'num', lead: sym });
  if (sub) layout.push({ k: 'borrow', kind: 'borrow' });
  layout.push({ k: 'line', kind: 'line' }, { k: 'r', kind: 'num' });
  const B = grid(layout, W);
  B.putDec('a', a, I - 1); B.putDec('b', b, I - 1);
  const padA = sub && A.d.length < Dn;
  if (padA) {
    for (let j = A.d.length; j < Dn; j++) B.cells.a[I + j] = { t: '0', c: 'kd-ghost' };
  }
  const fa = F(a), fb = F(b), fr_ = F(trimDec(rs));
  const name = sub ? 'hiệu' : 'tổng';
  B.snap(`Đặt tính: viết ${fb} dưới ${fa} sao cho <b>các chữ số cùng hàng thẳng cột</b>, dấu phẩy thẳng dấu phẩy. Viết dấu ${sym}, kẻ gạch ngang.`);
  if (padA) {
    for (let j = A.d.length; j < Dn; j++) B.cells.a[I + j] = { t: '0', c: 'zero', isNew: true };
    if (!A.d) { B.cells.a[I - 1].cm = true; B.cells.a[I - 1].cmNew = true; }
    B.snap(`${fa} có ít chữ số ở phần thập phân hơn ${fb}: coi ${fa} là <b>${F(`${A.i},${A.d.padEnd(Dn, '0')}`)}</b> (viết thêm chữ số 0, số không đổi).`);
  }
  const dg = (k, i) => { const c = B.cells[k][i]; return c && c.c !== 'kd-ghost' ? Number(c.t) : null; };
  let first = 0;
  while (first < W && dg('a', first) === null && dg('b', first) === null) first++;
  const rCells = rs.replace(',', '').padStart(W, ' ');
  B.snap(`${sub ? 'Trừ' : 'Cộng'} như ${sub ? 'trừ' : 'cộng'} các số tự nhiên, từ phải sang trái.`);
  let c = 0, asked = false;
  for (let i = W - 1; i >= first; i--) {
    const k = W - 1 - i, last = i === first;
    const x = dg('a', i) ?? 0, y = dg('b', i);
    let tx, q, full, next = 0;
    if (!sub) {
      const s = x + (y ?? 0) + c;
      tx = y === null ? (c ? `${x} thêm 1 bằng ${s}` : `hạ ${x}`) : dg('a', i) === null ? (c ? `${y} thêm 1 bằng ${s}` : `hạ ${y}`) : `${x} cộng ${y} bằng ${x + y}${c ? `, thêm 1 bằng ${s}` : ''}`;
      q = y === null || dg('a', i) === null ? null : `${x} cộng ${y}${c ? ', thêm 1' : ''} bằng mấy?`;
      if (s >= 10 && !last) next = 1;
      full = s;
    } else {
      const yy = (y ?? 0) + c, parts = [];
      if (c && y !== null) parts.push(`${y} thêm 1 bằng ${yy}`);
      if (x < yy) { parts.push(`${x} không trừ được ${yy}, lấy ${x + 10} trừ ${yy} bằng ${x + 10 - yy}`); next = 1; q = `${x + 10} trừ ${yy} bằng mấy?`; full = x + 10 - yy; }
      else if (y === null && !c) { parts.push(`hạ ${x}`); full = x; }
      else { parts.push(`${x} trừ ${yy} bằng ${x - yy}`); q = `${x} trừ ${yy} bằng mấy?`; full = x - yy; }
      tx = parts.join(', ');
    }
    B.bands = [{ col: i, tone: 'hot', isNew: true }];
    const borrowCell = sub && x < (y ?? 0) + c;
    if (borrowCell) { B.cells.a[i].c = (B.cells.a[i].c || '') + ' ten'; B.cells.a[i].isNew = true; }
    if (!asked && q && (next || k >= 1)) {
      asked = true;
      B.snap(`Hàng ${placeOf(i, I - 1)}: ${q}`, { ask: numAsk(full, { near: [1, -1, 10, 2] }) });
      B.bands[0].isNew = false;
    }
    const written = [];
    for (let j = last ? 0 : i; j <= i; j++) if (rCells[j] !== ' ' && (j >= W - Rp.i.length - Dn)) { B.cells.r[j] = { t: rCells[j], c: 'res', isNew: true }; written.push(rCells[j]); }
    if (next) B.cells[sub ? 'borrow' : 'carry'][i - 1] = { t: sub ? '+1' : '1', isNew: true };
    const write = written.length ? `viết ${written.join('')}${next ? ' nhớ 1' : ''}` : 'không viết chữ số 0 ở đầu';
    B.snap(`Hàng ${placeOf(i, I - 1)}: ${tx}, <b>${write}</b>.`);
    c = next;
  }
  B.bands = [];
  if (Dn) {
    B.bands = [{ col: I - 1, tone: 'hot', isNew: true }];
    B.snap(`Viết dấu phẩy ở ${name} ở đâu?`, { ask: { options: ['Thẳng cột với các dấu phẩy ở trên', 'Sau chữ số cuối cùng'], answer: 0, ok: `Đúng rồi! Dấu phẩy ở ${name} thẳng cột với các dấu phẩy của hai số.` } });
    B.cells.r[I - 1].cm = true; B.cells.r[I - 1].cmNew = true;
    B.bands = [];
  }
  B.cells.r.forEach((x) => { if (x) x.c = 'ok'; });
  B.result = `${fa} ${sym} ${fb} = ${fr_}`;
  B.snap(`${Dn ? `Viết dấu phẩy ở ${name} thẳng cột với các dấu phẩy. ` : ''}Vậy <b>${fa} ${sym} ${fb} = ${F(rs)}</b>${trimDec(rs) !== rs ? ` = ${fr_}` : ''}.`);
  return { title: `${fa} ${sym} ${fb}`, frames: B.frames };
}

// ── Bài 21: nhân số thập phân ────────────────────────────────────────────────
function dmul({ a, b }) {
  const A = P(a), Bq = P(b), ka = A.d.length, kb = Bq.d.length, K = ka + kb;
  const aS = A.i + A.d, bS = Bq.i + Bq.d, ai = Number(aS), bi = Number(bS), prod = ai * bi;
  const ps = String(prod).padStart(K + 1, '0');
  const bd = String(bi).split('').reverse().map(Number);
  const parts = bd.map((d, j) => ({ d, j, v: ai * d })).filter((p) => p.d !== 0);
  const multi = parts.length > 1;
  const W = Math.max(aS.length, bS.length, ps.length, ...parts.map((p) => String(p.v).length + p.j)) + 0;
  const layout = [{ k: 'a', kind: 'num' }, { k: 'b', kind: 'num', lead: '×' }, { k: 'line', kind: 'line' }];
  const pk = parts.map((_, n) => `p${n}`);
  if (multi) { parts.forEach((_, n) => layout.push({ k: pk[n], kind: 'num', lead: n === 1 ? '+' : '' })); layout.push({ k: 'line2', kind: 'line' }); }
  layout.push({ k: 'r', kind: 'num' });
  const B = grid(layout, W);
  const putRight = (k, s, nd) => { B.put(k, s, W - 1); if (nd) B.cells[k][W - 1 - nd].cm = true; };
  putRight('a', aS, ka); putRight('b', bS, kb);
  const fa = F(a), fb = F(b);
  const raw = fromInt(prod, K), res = trimDec(fromInt(prod, K));
  B.snap(`Đặt tính: viết ${fb} dưới ${fa}, <b>chữ số cuối cùng bên phải thẳng cột</b> (không cần dấu phẩy thẳng cột), viết dấu ×.`);
  const NAME = ['thứ nhất', 'thứ hai', 'thứ ba'];
  if (!multi) {
    B.snap(`Nhân như nhân hai số tự nhiên: ${fmt(ai)} × ${fmt(bi)} bằng bao nhiêu?`, { ask: numAsk(prod, { near: [ai, -ai, 10] }) });
    B.put('r', String(prod), W - 1, { c: 'res', isNew: true });
    B.snap(`${fmt(ai)} × ${fmt(bi)} = <b>${fmt(prod)}</b>. Viết ${prod}, <b>chưa</b> viết dấu phẩy.`);
  } else {
    B.snap(`Nhân như nhân hai số tự nhiên: <b>${fmt(ai)} × ${fmt(bi)}</b>.`);
    parts.forEach((p, n) => {
      if (n === 0) B.snap(`${fmt(ai)} × ${p.d} bằng bao nhiêu?`, { ask: numAsk(p.v, { near: [ai, -ai, 10] }) });
      B.put(pk[n], String(p.v), W - 1 - p.j, { c: 'res', isNew: true });
      B.snap(`${fmt(ai)} × ${p.d} = ${fmt(p.v)}: <b>tích riêng ${NAME[n]}</b>${n ? `, viết lùi sang trái ${p.j === 1 ? 'một cột' : `${p.j} cột`}` : ''}.`);
    });
    B.put('r', String(prod), W - 1, { c: 'res', isNew: true });
    B.snap(`Cộng các tích riêng: ${parts.map((p) => fmt(p.v * 10 ** p.j)).join(' + ')} = <b>${fmt(prod)}</b>.`);
  }
  const bands = [];
  if (ka) bands.push({ col: W - ka, to: W - 1, tone: 'cls1', isNew: true, rows: [0, 0] });
  if (kb) bands.push({ col: W - kb, to: W - 1, tone: 'cls1', isNew: true, rows: [1, 1] });
  B.bands = bands;
  B.snap(`Đếm chữ số ở phần thập phân: ${fa} có ${ka} chữ số${kb ? `, ${fb} có ${kb} chữ số` : `, ${fb} là số tự nhiên`}. Tất cả có mấy chữ số?`, { ask: numAsk(K, { near: [1, -1, 2], ok: `Đúng rồi! ${ka}${kb ? ` + ${kb}` : ''} = ${K} chữ số.` }) });
  if (ps.length > String(prod).length) {
    for (let j = 0; j < ps.length - String(prod).length; j++) B.cells.r[W - ps.length + j] = { t: '0', c: 'zero', isNew: true };
    B.snap(`Tích ${prod} chưa đủ chữ số để tách ${K} chữ số: viết thêm <b>chữ số 0</b> vào bên trái.`);
  }
  B.bands = [{ col: W - K, to: W - 1, tone: 'cls1', isNew: true, rows: [layout.length - 1, layout.length - 1] }];
  B.cells.r[W - 1 - K].cm = true; B.cells.r[W - 1 - K].cmNew = true;
  B.snap(`Dùng dấu phẩy tách ở tích ra <b>${K} chữ số</b> kể từ phải sang trái: <b>${F(raw)}</b>.`);
  if (raw !== res) {
    for (let i = W - 1; B.cells.r[i] && B.cells.r[i].t === '0' && i > W - 1 - K; i--) { B.cells.r[i].c = 'strike'; B.cells.r[i].isNew = true; }
    B.snap(`Bỏ các chữ số 0 ở tận cùng bên phải phần thập phân: ${F(raw)} = <b>${F(res)}</b>.`);
  }
  B.bands = [];
  B.result = `${fa} × ${fb} = ${F(res)}`;
  B.snap(`Vậy <b>${fa} × ${fb} = ${F(res)}</b>.`);
  return { title: `${fa} × ${fb}`, frames: B.frames };
}

// ── Bài 22: chia số thập phân ────────────────────────────────────────────────
function ddiv({ a, b }) {
  const A = P(a), Bq = P(b), k = Bq.d.length;
  let Ai = A.i, Ad = A.d;
  if (k) { const m = Ad.padEnd(k, '0'); Ai = String(Number(Ai + m.slice(0, k))); Ad = m.slice(k); }
  const a2 = Ad ? `${Ai},${Ad}` : Ai, Bn = Number(Bq.i + Bq.d);
  const Dg = Ai + Ad, p = Ai.length;
  // các lượt chia
  const turns = [];
  let e = 0, cur = Number(Dg[0]), extra = 0;
  while (cur < Bn && e < p - 1) { e++; cur = cur * 10 + Number(Dg[e]); }
  const firstLen = e + 1;
  for (let guard = 0; guard < 12; guard++) {
    const qd = Math.floor(cur / Bn), rem = cur - qd * Bn, t = { e, cur, qd, rem };
    turns.push(t);
    if (e + 1 < Dg.length) { t.next = 'down'; t.nd = Dg[e + 1]; t.comma = e + 1 === p; }
    else if (rem && extra < 3) { t.next = 'zero'; t.nd = '0'; t.comma = !turns.some((x) => x.comma); extra++; }
    else break;
    e++; cur = rem * 10 + Number(t.nd);
  }
  const qStr = turns.map((t) => `${t.qd}${t.comma ? ',' : ''}`).join('');
  const quot = trimDec(qStr.replace(/,$/, ''));
  const Lc = Dg.length + extra, R = Math.max(String(Bn).length, turns.length), W = Lc + R;
  // hàng của số dư mỗi lượt
  const rowOf = [];
  turns.forEach((t, n) => { rowOf.push(n === 0 ? 1 : t.qd === 0 ? rowOf[n - 1] : rowOf[n - 1] + 1); });
  const nRows = Math.max(2, rowOf[rowOf.length - 1] + 1);
  const layout = [...Array(nRows)].map((_, r) => ({ k: `r${r}`, kind: 'num' }));
  const B = grid(layout, W, { gaps: new Set([Lc]), gapW: '0.55em', cls: 'kd-div' });
  B.extra = (colOf, ncols) => `<i class="kd-dbar" style="grid-column:${colOf[Lc]};grid-row:1/3"></i><i class="kd-dline" style="grid-column:${colOf[Lc]}/${ncols + 1};grid-row:1"></i>`;
  const hide = k > 0;
  B.put('r0', Dg, Dg.length - 1, hide ? { c: 'kd-ghost' } : {});
  if (Ad) B.cells.r0[p - 1].cm = true;
  B.put('r0', String(Bn), Lc + String(Bn).length - 1, { c: hide ? 'kd-ghost' : 'dvs' });
  const fa = F(a), fb = F(b);
  if (k) {
    B.top = { shown: false, isNew: false, html() { return `<span>${fa} : ${fb}</span><span class="${this.shown ? (this.isNew ? 'is-new' : '') : 'kd-ghost'}"> = ${F(a2)} : ${Bn}</span>`; } };
    B.snap(`Tính ${fa} : ${fb}. Số chia ${fb} là số thập phân. Số chia có mấy chữ số ở phần thập phân?`, { ask: numAsk(k, { near: [1, -1, 2] }) });
    B.top.shown = true; B.top.isNew = true;
    B.cells.r0.forEach((c, i) => { if (c) { c.c = i >= Lc ? 'dvs' : ''; c.isNew = true; } });
    const padded = A.d.length < k ? ` (thiếu chữ số thì viết thêm chữ số 0)` : '';
    B.snap(`Chuyển dấu phẩy ở số bị chia sang phải <b>${k} chữ số</b>${padded}: ${fa} thành ${F(a2)}. Bỏ dấu phẩy ở số chia: ${fb} thành ${Bn}. Thương không đổi.`);
  }
  B.snap(`Đặt tính: ${F(a2)} chia ${Bn}. Chia lần lượt <b>từ trái sang phải</b>.`);
  const qcol = (n) => Lc + n;
  let asked = false;
  const qSoFar = (n) => turns.slice(0, n + 1).map((t) => t.qd).join('');
  turns.forEach((t, n) => {
    const row = n === 0 ? 0 : rowOf[n - 1];
    const c1 = t.e - String(t.cur).length + 1;
    B.bands = [{ col: Math.max(0, c1), to: t.e, tone: 'hot', isNew: true, rows: [row, row] }];
    const lead = n === 0 && firstLen > 1 && Number(Dg.slice(0, firstLen - 1)) < Bn ? `${Dg.slice(0, firstLen - 1)} bé hơn ${Bn} nên lấy ${t.cur}. ` : '';
    if (!asked && t.qd > 0) {
      asked = true;
      B.snap(`${lead}${fmt(t.cur)} chia ${Bn} được mấy?`, { ask: numAsk(t.qd, { near: [1, -1, 2], ok: `Đúng rồi! ${t.qd} × ${Bn} = ${t.qd * Bn}, không quá ${t.cur}.` }) });
      B.bands[0].isNew = false;
    }
    B.cells.r1[qcol(n)] = { t: String(t.qd), c: 'res', isNew: true };
    const rr = rowOf[n];
    if (n === 0 || t.qd) B.put(`r${rr}`, String(t.rem), t.e, { c: 'rem', isNew: true });
    const hint = t.qd ? `${t.qd} nhân ${Bn} bằng ${t.qd * Bn}; ${fmt(t.cur)} trừ ${t.qd * Bn} bằng ${t.rem}, viết ${t.rem}` : `${fmt(t.cur)} bé hơn ${Bn}, còn ${t.rem}`;
    const head = `${n === 0 ? lead : ''}${fmt(t.cur)} chia ${Bn} được <b>${t.qd}</b>, viết ${t.qd} ${n ? 'vào thương' : 'dưới số chia'}; ${hint}.`;
    if (!t.next) { B.snap(head); return; }
    const nextCur = t.rem * 10 + Number(t.nd);
    const bring = () => {
      B.cells[`r${rr}`][t.e + 1] = { t: t.nd, c: t.next === 'zero' ? 'zero' : 'down', isNew: true };
    };
    if (t.comma) {
      B.snap(head);
      if (t.next === 'down') {
        B.snap(`Sắp hạ chữ số <b>${t.nd}</b> ở phần thập phân của số bị chia. Trước đó em làm gì?`, { ask: { options: ['Viết dấu phẩy vào bên phải thương', `Hạ luôn chữ số ${t.nd}`], answer: 0, ok: 'Đúng rồi! Viết dấu phẩy vào thương trước khi lấy chữ số đầu tiên ở phần thập phân.' } });
      }
      B.cells.r1[qcol(n)].cm = true; B.cells.r1[qcol(n)].cmNew = true;
      B.bands = [];
      B.snap(t.next === 'down'
        ? `Viết <b>dấu phẩy</b> vào bên phải ${qSoFar(n)} ở thương, rồi mới hạ chữ số ${t.nd} ở phần thập phân.`
        : `Còn dư ${t.rem}: viết <b>dấu phẩy</b> vào bên phải ${qSoFar(n)} ở thương, rồi chia tiếp.`);
      bring();
      B.snap(t.next === 'down' ? `Hạ ${t.nd}, được ${fmt(nextCur)}.` : `Viết thêm <b>chữ số 0</b> vào bên phải số dư ${t.rem}, được ${fmt(nextCur)}.`);
      return;
    }
    bring();
    B.snap(`${head} ${t.next === 'down' ? `<b>Hạ ${t.nd}</b>, được ${fmt(nextCur)}.` : `Còn dư: viết thêm <b>chữ số 0</b> vào bên phải ${t.rem}, được ${fmt(nextCur)}.`}`);
  });
  B.bands = [];
  for (let c = Lc; c < W; c++) if (B.cells.r1[c]) B.cells.r1[c].c = 'ok';
  B.result = `${fa} : ${fb} = ${F(quot)}`;
  B.snap(`Số dư cuối cùng là 0. Vậy <b>${fa} : ${fb} = ${F(quot)}</b>.`);
  return { title: `${fa} : ${fb}`, frames: B.frames };
}

// ── Bài 23: nhân, chia với 10; 100; 1000… hoặc 0,1; 0,01; 0,001… ─────────────
function shift({ n = '27,86', op = '×', by = '10' }) {
  const { i, d } = P(n), byS = String(by);
  const small = byS.startsWith('0,');
  const k = small ? P(byS).d.length : byS.replace(/\s/g, '').length - 1;
  const right = (op === '×') !== small; // × 10 hoặc : 0,1 → sang phải
  const mv = right ? k : -k;
  const s = i + d, p0 = i.length, p1 = p0 + mv;
  const Lp = Math.max(0, 1 - p1), Rp = Math.max(0, p1 - s.length);
  const slots = '0'.repeat(Lp) + s + '0'.repeat(Rp);
  const P0 = p0 + Lp;
  const resRaw = (() => { const q = P0 + mv; const int = slots.slice(0, q).replace(/^0+(?=\d)/, ''); const dd = slots.slice(q); return dd ? `${int},${dd}` : int; })();
  const res = trimDec(resRaw);
  const fn = F(n), title = `${fn} ${op} ${byS}`;
  const view = (pos, { pads = false, newPads = false, newPos = false, arc = 0, old = true } = {}) => {
    let h = '';
    for (let x = 0; x <= slots.length; x++) {
      if (x > 0) {
        const isPad = (x - 1) < Lp || (x - 1) >= Lp + s.length;
        const cls = isPad ? (pads ? `k5-zero${newPads ? ' is-new' : ''}` : 'kd-ghost') : '';
        h += `<span class="k5-d ${cls}">${slots[x - 1]}</span>`;
      }
      if (x > 0 && x < slots.length) {
        const here = x === pos, was = old && x === P0 && pos !== P0;
        h += `<span class="k5-c">${here ? `<i class="${newPos ? 'is-new' : ''}">,</i>` : was ? '<i class="k5-old">,</i>' : ''}</span>`;
      } else if (x > 0) h += '<span class="k5-c"></span>';
    }
    return `<div class="k5-wrap"><div class="k5-big k5-shift">${h}</div><div class="k5-dir ${arc ? 'is-new' : 'kd-ghost'}">${right ? `dấu phẩy sang phải ${k} chữ số ➡` : `⬅ dấu phẩy sang trái ${k} chữ số`}</div></div>`;
  };
  const Fr = frames(title);
  const rule = right
    ? (op === '×' ? `Nhân với ${byS}: chuyển dấu phẩy sang <b>phải</b>` : `Chia cho ${byS}: chuyển dấu phẩy sang <b>phải</b>`)
    : (op === '×' ? `Nhân với ${byS}: chuyển dấu phẩy sang <b>trái</b>` : `Chia cho ${byS}: chuyển dấu phẩy sang <b>trái</b>`);
  const countWhy = small ? `${byS} có ${k} chữ số ở phần thập phân` : `${fmt(Number(byS.replace(/\s/g, '')))} có ${k} chữ số 0`;
  Fr.add(view(P0), `Tính <b>${title}</b>. Chỉ cần chuyển dấu phẩy, không cần đặt tính.`);
  Fr.add(view(P0), `Dấu phẩy của ${fn} chuyển sang bên nào?`, { ask: { options: ['⬅ Sang trái', 'Sang phải ➡'], answer: right ? 1 : 0, ok: `Đúng rồi! ${rule}.` } });
  Fr.add(view(P0), `Chuyển mấy chữ số?`, { ask: numAsk(k, { near: [1, -1, 2], ok: `Đúng rồi! ${countWhy}, nên chuyển ${k} chữ số.` }) });
  for (let h = 1; h <= k; h++) {
    const pos = P0 + (right ? h : -h);
    const last = h === k;
    Fr.add(view(pos, { pads: last, newPads: last && Lp + Rp > 0, newPos: true, arc: true }),
      `Chuyển dấu phẩy sang ${right ? 'phải' : 'trái'} ${h === 1 ? 'một' : h === 2 ? 'hai' : 'ba'} chữ số.${last && Lp + Rp > 0 ? ' Hết chữ số thì <b>viết thêm chữ số 0</b>.' : ''}`);
  }
  const resNote = res !== resRaw ? ` Bỏ chữ số 0 ở tận cùng phần thập phân: ${F(res)}.` : '';
  Fr.add(view(P0 + mv, { pads: true, arc: true, old: false }), `${rule} ${k} chữ số: <b>${title} = ${F(res)}</b>.${resNote}`, { result: `${title} = ${F(res)}` });
  return Fr.done();
}

// ── Bài 25: diện tích hình tam giác (cắt ghép) ───────────────────────────────
const pt = (x, y) => ({ x, y });
const pp = (list) => list.map((q) => `${q.x.toFixed(1)},${q.y.toFixed(1)}`).join(' ');
const polyS = (list, fill, stroke, extra = '') => `<polygon points="${pp(list)}" fill="${fill}" stroke="${stroke}" stroke-width="2.2" stroke-linejoin="round" ${extra}/>`;
const ln = (a, b, color = C.ink, w = 2, dash = '') => `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const lbl = (q, t, dx, dy, o = {}) => txt(q.x + dx, q.y + dy, t, { size: 16, ...o });
const rmk = (H, s = 9, dir = 1) => `<path d="M${H.x + dir * s} ${H.y} V${H.y - s} H${H.x}" fill="none" stroke="${C.ink}" stroke-width="1.6"/>`;
const BLUE_F = 'rgba(59,130,246,0.22)', ORG_F = 'rgba(249,115,22,0.35)', GRN_F = 'rgba(22,163,74,0.32)';

function tri({ a = 4, h = 3, unit = 'cm' }) {
  const u = Math.min(34, 150 / a, 150 / h), x0 = Math.max(22, (360 - (2 * a * u + 28)) / 2), yb = h * u + 46, VH = h * u + 82;
  const Bp = pt(x0, yb), Cp = pt(x0 + a * u, yb), A = pt(x0 + a * u * 0.35, yb - h * u), H = pt(A.x, yb);
  const Fp = pt(Bp.x, A.y), E = pt(Cp.x, A.y);
  const dx = a * u + 28;
  const S = (a * h) / 2;
  const Fr = frames('Diện tích hình tam giác');
  const sh = (q) => pt(q.x + dx, q.y);
  const draw = ({ copy = false, cut = false, moved = false, rect = false, ab = false } = {}) => {
    let s = '';
    if (rect) s += `<rect x="${Bp.x}" y="${A.y}" width="${a * u}" height="${h * u}" fill="none" stroke="${C.green}" stroke-width="3.5" class="${rect === 'new' ? 'is-fade' : ''}"/>`;
    s += polyS([A, Bp, Cp], BLUE_F, C.blue);
    if (copy && !moved) {
      s += `<g class="${copy === 'new' ? 'is-fade' : ''}">${polyS([sh(A), sh(H), sh(Bp)], ORG_F, C.orange)}${polyS([sh(A), sh(Cp), sh(H)], GRN_F, C.green)}`;
      s += lbl(pt((sh(A).x + sh(Bp).x + sh(H).x) / 3, (sh(A).y + 2 * yb) / 3), '1', 0, 0, { size: 15, fill: '#C2410C' }) + lbl(pt((sh(A).x + sh(Cp).x + sh(H).x) / 3, (sh(A).y + 2 * yb) / 3), '2', 0, 0, { size: 15, fill: C.green }) + '</g>';
      if (cut) s += `<g class="${cut === 'new' ? 'is-fade' : ''}">${ln(sh(A), sh(H), C.red, 2.5, '6 4')}${txt(sh(A).x + 8, sh(A).y - 10, '✂', { size: 16, fill: C.red, anchor: 'start' })}</g>`;
    }
    if (moved) {
      const st = (ddx) => `class="${moved === 'new' ? 'is-move' : ''}" style="--dx:${ddx}px;--dy:0px;--rot:180deg;transform-box:fill-box;transform-origin:center"`;
      s += `<g ${st(dx)}>${polyS([Bp, Fp, A], ORG_F, C.orange)}</g>`;
      s += `<g ${st(dx)}>${polyS([A, E, Cp], GRN_F, C.green)}</g>`;
      s += lbl(pt(Fp.x, Fp.y), 'F', -10, -8, { size: 15 }) + lbl(E, 'E', 10, -8, { size: 15 });
    }
    s += ln(A, H, C.violet, 2, '5 4') + rmk(H);
    s += lbl(A, 'A', 0, -12) + lbl(Bp, 'B', -10, 8) + lbl(Cp, 'C', 10, 8) + lbl(H, 'H', 0, 14, { size: 14 });
    s += txt((Bp.x + Cp.x) / 2 + 12, yb + 26, `đáy ${a} ${unit}`, { size: 14, fill: C.blue });
    s += txt(A.x + 6, (A.y + yb) / 2, `cao ${h} ${unit}`, { size: 13, fill: C.violet, anchor: 'start' });
    if (ab) s += txt(Cp.x + 28, A.y - 18, `${a} × ${h} = ${a * h} ${unit}²`, { size: 15, fill: C.green, cls: 'is-new', anchor: 'start' });
    return svg(360, VH, s);
  };
  Fr.add(draw(), `Hình tam giác ABC: <b>BC là đáy</b>, AH vuông góc với BC là <b>đường cao</b>, độ dài AH là <b>chiều cao</b>.`);
  Fr.add(draw(), 'Đoạn nào là đường cao ứng với đáy BC?', { ask: { options: ['AB', 'AH', 'AC'], answer: 1, ok: 'Đúng rồi! AH vuông góc với đáy BC.' } });
  Fr.add(draw({ copy: 'new', cut: 'new' }), 'Lấy thêm một hình tam giác bằng hình ABC. Cắt theo đường cao thành hai mảnh <b>1</b> và <b>2</b>.');
  Fr.add(draw({ moved: 'new' }), 'Ghép hai mảnh vào hai bên hình ABC: được <b>hình chữ nhật BCEF</b>.');
  Fr.add(draw({ moved: true, rect: 'new' }), `Hình chữ nhật có chiều dài bằng đáy (${a} ${unit}), chiều rộng bằng chiều cao (${h} ${unit}). Diện tích tam giác ABC so với hình chữ nhật thế nào?`, {
    ask: { options: ['Bằng một nửa', 'Bằng nhau', 'Gấp đôi'], answer: 0, ok: 'Đúng rồi! Hình chữ nhật gồm hai hình tam giác bằng ABC.' } });
  Fr.add(draw({ moved: true, rect: true, ab: true }), `Diện tích hình chữ nhật: ${a} × ${h} = ${a * h} (${unit}²). Diện tích tam giác ABC là bao nhiêu?`, { ask: decAsk(S, [a * h, S + 1, S * 4], { unit: `${unit}²` }) });
  Fr.add(draw({ moved: true, rect: true }), `Lấy độ dài đáy nhân với chiều cao (cùng đơn vị đo) rồi chia cho 2: <b>S = a × h : 2</b> = ${a} × ${h} : 2 = ${D(S)} (${unit}²).`, { result: `S = ${a} × ${h} : 2 = ${D(S)} ${unit}²` });
  return Fr.done();
}

// ── Bài 26: diện tích hình thang (cắt ghép) ──────────────────────────────────
function trap({ a = 6, b = 4, h = 3, unit = 'cm' }) {
  const u = Math.min(32, 310 / (a + b), 140 / h), x0 = Math.max(22, (360 - (a + b) * u) / 2), yb = h * u + 50, VH = h * u + 82;
  const Dp = pt(x0, yb), Cp = pt(x0 + a * u, yb), A = pt(x0 + Math.max(0.5, (a - b) * 0.4) * u, yb - h * u), Bp = pt(A.x + b * u, A.y);
  const M = pt((Bp.x + Cp.x) / 2, (Bp.y + Cp.y) / 2), K = pt(x0 + (a + b) * u, yb), H = pt(A.x, yb);
  const S = ((a + b) * h) / 2;
  const Fr = frames('Diện tích hình thang');
  const draw = ({ m = false, moved = false, tri = false, ask = false } = {}) => {
    let s = '';
    s += polyS(moved ? [A, Bp, M, Cp, Dp] : [A, Bp, Cp, Dp], BLUE_F, C.blue);
    if (m && !moved) s += `<g class="${m === 'new' ? 'is-fade' : ''}">${polyS([A, Bp, M], ORG_F, C.orange)}${ln(A, M, C.red, 2.5, '6 4')}</g>`;
    if (moved) {
      s += `<g class="${moved === 'new' ? 'is-move' : ''}" style="--rot:180deg;transform-origin:${M.x.toFixed(1)}px ${M.y.toFixed(1)}px">${polyS([K, Cp, M], ORG_F, C.orange)}</g>`;
      s += polyS([A, Bp, M], 'none', C.soft, 'stroke-dasharray="5 4"');
      s += lbl(K, 'K', 10, 8);
    }
    if (tri) s += `<polygon points="${pp([A, Dp, K])}" fill="none" stroke="${C.green}" stroke-width="3.5" stroke-linejoin="round" class="${tri === 'new' ? 'is-fade' : ''}"/>`;
    s += ln(A, H, C.violet, 2, '5 4') + rmk(H);
    s += lbl(A, 'A', -4, -12) + lbl(Bp, 'B', 4, -12) + lbl(Cp, 'C', moved ? -2 : 10, moved ? 16 : 8) + lbl(Dp, 'D', -10, 8);
    if (m) s += `<circle cx="${M.x}" cy="${M.y}" r="4" fill="${C.red}"/>` + lbl(M, 'M', 13, 0, { size: 15, fill: C.red });
    s += txt((A.x + Bp.x) / 2, A.y - 28, `đáy bé ${b} ${unit}`, { size: 13, fill: C.blue });
    s += txt((Dp.x + Cp.x) / 2, yb + 24, `đáy lớn ${a} ${unit}`, { size: 13, fill: C.blue });
    s += txt(A.x + 6, (A.y + yb) / 2, `cao ${h} ${unit}`, { size: 13, fill: C.violet, anchor: 'start' });
    if (ask) s += txt((Cp.x + K.x) / 2, yb + 24, `${b} ${unit}`, { size: 13, fill: '#C2410C' });
    return svg(360, VH, s);
  };
  Fr.add(draw(), 'Hình thang ABCD có hai đáy <b>AB và DC song song</b>. AH vuông góc với hai đáy là <b>đường cao</b>.');
  Fr.add(draw({ m: 'new' }), '<b>M là trung điểm</b> của cạnh BC. Cắt theo đoạn AM được hình tam giác ABM.');
  Fr.add(draw({ m: true, moved: 'new' }), 'Xoay hình tam giác ABM quanh điểm M rồi ghép vào: điểm B tới C, điểm A tới K.');
  Fr.add(draw({ m: true, moved: true, tri: 'new', ask: true }), `Được hình tam giác ADK. Đáy DK = DC + CK, mà CK = AB. DK dài bao nhiêu?`, { ask: numAsk(a + b, { near: [-b, 1, b], fmtFn: (v) => `${v} ${unit}`, ok: `Đúng rồi! DK = ${a} + ${b} = ${a + b} (${unit}).` }) });
  Fr.add(draw({ m: true, moved: true, tri: true, ask: true }), `Diện tích hình thang ABCD bằng diện tích tam giác ADK: (${a} + ${b}) × ${h} : 2 = ?`, { ask: decAsk(S, [(a + b) * h, a * h / 2, S + h], { unit: `${unit}²` }) });
  Fr.add(draw({ m: true, moved: true, tri: true, ask: true }), `Tổng độ dài hai đáy nhân với chiều cao (cùng đơn vị đo) rồi chia cho 2: <b>S = (a + b) × h : 2</b> = (${a} + ${b}) × ${h} : 2 = ${D(S)} (${unit}²).`, { result: `S = (${a} + ${b}) × ${h} : 2 = ${D(S)} ${unit}²` });
  return Fr.done();
}

// ── Bài 27: chu vi, diện tích hình tròn ──────────────────────────────────────
function circle({ mode = 'C', d, r, unit = 'cm' }) {
  const rr = r ?? d / 2, dd = d ?? r * 2;
  if (mode === 'S') return circleArea(rr, unit);
  const Cv = Math.round(3.14 * dd * 1e6) / 1e6;
  const R = 42, x0 = 30, y = 168, L = 2 * Math.PI * R, O = pt(x0 + L / 2, 64);
  const Fr = frames(`Chu vi hình tròn đường kính ${D(dd)} ${unit}`);
  const draw = ({ wrap = false, line = false, marks = false } = {}) => {
    let s = `<circle cx="${O.x}" cy="${O.y}" r="${R}" fill="#EFF6FF" stroke="${C.blue}" stroke-width="2.5"/>`;
    s += ln(pt(O.x - R, O.y), pt(O.x + R, O.y), C.violet, 2.5) + `<circle cx="${O.x}" cy="${O.y}" r="3.5" fill="${C.ink}"/>` + lbl(O, 'O', 0, -11, { size: 14 });
    s += txt(O.x, O.y + 16, `d = ${D(dd)} ${unit}`, { size: 13, fill: C.violet });
    if (wrap) s += `<circle cx="${O.x}" cy="${O.y}" r="${R + 4}" fill="none" stroke="${C.orange}" stroke-width="4" class="${wrap === 'new' ? 'is-draw' : ''}" style="--len:${Math.ceil(2 * Math.PI * (R + 4))}"/>`;
    if (line) s += `<line x1="${x0}" y1="${y}" x2="${(x0 + L).toFixed(1)}" y2="${y}" stroke="${C.orange}" stroke-width="5" stroke-linecap="round" class="${line === 'new' ? 'is-grow' : ''}"/>`;
    if (marks) {
      for (let k = 0; k < 3; k++) {
        const xa = x0 + k * 2 * R;
        s += `<g class="${marks === 'new' ? 'is-new' : ''}" style="animation-delay:${(k * 0.25).toFixed(2)}s"><line x1="${xa + 2}" y1="${y - 14}" x2="${xa + 2 * R - 2}" y2="${y - 14}" stroke="${C.violet}" stroke-width="3" stroke-linecap="round"/>${txt(xa + R, y - 28, 'd', { size: 14, fill: C.violet })}</g>`;
      }
      s += txt(x0 + 6 * R + (L - 6 * R) / 2 + 2, y - 28, '…', { size: 14, fill: C.violet });
      s += txt(x0 + L / 2, y + 22, `chu vi khoảng 3,14 lần d`, { size: 14, fill: '#C2410C', cls: marks === 'new' ? 'is-new' : '' });
    }
    return svg(360, 200, s);
  };
  Fr.add(draw(), `Hình tròn tâm O, <b>đường kính ${D(dd)} ${unit}</b> (bán kính ${D(rr)} ${unit}; đường kính gấp 2 lần bán kính).`);
  Fr.add(draw({ wrap: 'new' }), 'Quấn một sợi dây quanh hình tròn: độ dài sợi dây là <b>chu vi</b> của hình tròn.');
  Fr.add(draw({ wrap: true, line: 'new' }), 'Duỗi thẳng sợi dây ra rồi đặt các đường kính lên để so.');
  Fr.add(draw({ wrap: true, line: true, marks: 'new' }), 'Sợi dây dài khoảng mấy lần đường kính?', { ask: { options: ['2 lần', 'Hơn 3 lần một chút', '4 lần'], answer: 1, ok: 'Đúng rồi! Chu vi hình tròn dài khoảng <b>3,14 lần</b> đường kính.' } });
  Fr.add(draw({ wrap: true, line: true, marks: true }), `C = 3,14 × d = 3,14 × ${D(dd)} = ?`, { ask: decAsk(Cv, [Cv / 2, Cv * 2], { unit }) });
  Fr.add(draw({ wrap: true, line: true, marks: true }), `Muốn tính chu vi hình tròn, lấy 3,14 nhân với đường kính: <b>C = 3,14 × d</b> (hoặc C = 3,14 × r × 2). C = 3,14 × ${D(dd)} = ${D(Cv)} (${unit}).`, { result: `C = 3,14 × ${D(dd)} = ${D(Cv)} ${unit}` });
  return Fr.done();
}

function circleArea(r, unit) {
  const Sv = Math.round(3.14 * r * r * 1e6) / 1e6;
  const R = 52, O = pt(68, 92), N = 16, x0 = 150, yT = 66;
  const wedge = 2 * R * Math.sin(Math.PI / N);
  const Fr = frames(`Diện tích hình tròn bán kính ${D(r)} ${unit}`);
  const sector = (i) => {
    const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / N, a1 = a0 + (2 * Math.PI) / N;
    const p = (t) => `${(O.x + R * Math.cos(t)).toFixed(1)} ${(O.y + R * Math.sin(t)).toFixed(1)}`;
    return `<path d="M${O.x} ${O.y} L${p(a0)} A${R} ${R} 0 0 1 ${p(a1)} Z" fill="${i < N / 2 ? '#93C5FD' : '#FDBA74'}" stroke="#fff" stroke-width="1.2"/>`;
  };
  const rearr = (cls) => {
    let s = '';
    for (let k = 0; k < N / 2; k++) {
      const cx = x0 + wedge / 2 + k * wedge;
      s += `<path d="M${cx.toFixed(1)} ${yT} L${(cx + wedge / 2).toFixed(1)} ${yT + R} A${R} ${R} 0 0 1 ${(cx - wedge / 2).toFixed(1)} ${yT + R} Z" fill="#FDBA74" stroke="#fff" stroke-width="1.2"/>`;
      const cx2 = cx + wedge / 2;
      s += `<path d="M${cx2.toFixed(1)} ${yT + R} L${(cx2 - wedge / 2).toFixed(1)} ${yT} A${R} ${R} 0 0 1 ${(cx2 + wedge / 2).toFixed(1)} ${yT} Z" fill="#93C5FD" stroke="#fff" stroke-width="1.2"/>`;
    }
    return `<g class="${cls}">${s}</g>`;
  };
  const len = (N / 2) * wedge;
  const draw = ({ arr = false, labels = false } = {}) => {
    let s = '';
    for (let i = 0; i < N; i++) s += sector(i);
    s += `<circle cx="${O.x}" cy="${O.y}" r="${R}" fill="none" stroke="${C.ink}" stroke-width="2"/>`;
    s += ln(O, pt(O.x + R, O.y), C.violet, 2.5) + txt(O.x + R / 2, O.y - 9, `r`, { size: 14, fill: C.violet });
    s += txt(O.x, O.y + R + 20, `r = ${D(r)} ${unit}`, { size: 14, fill: C.violet });
    if (arr) s += rearr(arr === 'new' ? 'is-fade' : '');
    if (labels) {
      const c = labels === 'new' ? 'is-new' : '';
      s += `<g class="${c}">${ln(pt(x0, yT + R + 14), pt(x0 + len, yT + R + 14), '#C2410C', 2)}${txt(x0 + len / 2, yT + R + 30, '3,14 × r (nửa chu vi)', { size: 13, fill: '#C2410C' })}`;
      s += `${ln(pt(x0 + len + wedge / 2 + 8, yT), pt(x0 + len + wedge / 2 + 8, yT + R), C.violet, 2)}${txt(x0 + len + wedge / 2 + 16, yT + R / 2, 'r', { size: 15, fill: C.violet, anchor: 'start' })}</g>`;
    }
    return svg(360, 175, s);
  };
  Fr.add(draw(), `Hình tròn bán kính <b>r = ${D(r)} ${unit}</b>. Cắt hình tròn thành 16 phần bằng nhau.`);
  Fr.add(draw({ arr: 'new' }), 'Ghép xen kẽ các phần (một phần xanh, một phần cam): được một hình <b>gần giống hình chữ nhật</b>.');
  Fr.add(draw({ arr: true }), 'Chiều dài của hình này bằng nửa chu vi hình tròn, tức là 3,14 × r. Chiều rộng bằng gì?', { ask: { options: ['Bán kính r', 'Đường kính d', 'Chu vi C'], answer: 0, ok: 'Đúng rồi! Chiều rộng là bán kính r.' } });
  Fr.add(draw({ arr: true, labels: 'new' }), 'Diện tích hình tròn bằng diện tích hình gần chữ nhật: dài <b>3,14 × r</b>, rộng <b>r</b>. Vậy <b>S = 3,14 × r × r</b>.');
  Fr.add(draw({ arr: true, labels: true }), `S = 3,14 × ${D(r)} × ${D(r)} = ?`, { ask: decAsk(Sv, [3.14 * r * 2, Sv * 2], { unit: `${unit}²` }) });
  Fr.add(draw({ arr: true, labels: true }), `Muốn tính diện tích hình tròn, lấy 3,14 nhân với bán kính rồi nhân với bán kính: S = 3,14 × ${D(r)} × ${D(r)} = <b>${D(Sv)} (${unit}²)</b>.`, { result: `S = 3,14 × ${D(r)} × ${D(r)} = ${D(Sv)} ${unit}²` });
  return Fr.done();
}

export const DEMOS5 = {
  'g5-decfrac': decfrac, 'g5-mixed': mixed, 'g5-dplace': dplace, 'g5-measure': measure, 'g5-dcmp': dcmp, 'g5-round': round,
  'g5-ha': hectare, 'g5-dcol': dcol, 'g5-dmul': dmul, 'g5-ddiv': ddiv, 'g5-shift': shift, 'g5-tri': tri, 'g5-trap': trap, 'g5-circle': circle,
};

const CSS5 = `
  .gw-kn .gw-frac, .gw-layer .gw-frac, .kd .gw-frac { display: inline-flex; flex-direction: column; align-items: center; vertical-align: middle; line-height: 1.1; margin: 0 0.12em; font-size: 0.95em; }
  .gw-kn .gw-frac > span, .gw-layer .gw-frac > span, .kd .gw-frac > span { padding: 0 0.2em; }
  .gw-kn .gw-frac > span + span, .gw-layer .gw-frac > span + span, .kd .gw-frac > span + span { border-top: 2px solid currentColor; }
  .k5-mx { display: inline-flex; align-items: center; gap: 0.05em; white-space: nowrap; }
  .k5-wrap { display: flex; flex-direction: column; align-items: center; width: 100%; }
  .k5-eq { font: 800 clamp(1.1rem, 6cqi, 1.6rem)/1.3 Quicksand, sans-serif; color: #1E293B; margin-bottom: 0.35em; white-space: nowrap; }
  .k5-eq > span:last-child { color: #2563EB; }
  .k5-board .k5-cm { position: absolute; left: calc(50% + 0.26em); bottom: -0.12em; font-style: normal; color: #BE123C; }
  .k5-board .kd-num.kd-ghost .k5-cm { visibility: hidden; }
  .k5-board .kd-num.strike .k5-cm { text-decoration: none; }
  .k5-big { display: flex; justify-content: center; align-items: flex-end; font: 800 clamp(2rem, 12cqi, 3.4rem)/1.15 Quicksand, sans-serif; color: #1E293B; padding: 0.15em 0 0.1em; }
  .k5-big .k5-d { width: 0.68em; text-align: center; border-radius: 0.18em; }
  .k5-big .k5-c { width: 0.32em; text-align: center; color: #BE123C; }
  .k5-big .k5-c i { font-style: normal; display: inline-block; }
  .k5-big .k5-c .k5-old { color: #CBD5E1; }
  .k5-big .k5-zero { color: #16A34A; text-decoration: underline 0.07em; text-underline-offset: 0.1em; }
  .k5-big .k5-place { background: #DBEAFE; color: #1D4ED8; }
  .k5-big .k5-next { color: #C2410C; box-shadow: 0 0 0 0.07em #FB923C; background: #FFF7ED; }
  .k5-dir { font: 800 clamp(0.95rem, 4.4cqi, 1.2rem)/1.3 Quicksand, sans-serif; color: #BE123C; background: #FFF1F2; border-radius: 999px; padding: 0.15em 0.8em; }
  .k5-fline { display: flex; align-items: center; justify-content: center; gap: 0.25em; flex-wrap: nowrap; font: 800 clamp(1.3rem, 7.5cqi, 2.2rem)/1.2 Quicksand, sans-serif; color: #1E293B; padding: 0.3em 0; }
  .k5-fline > span { display: inline-flex; align-items: center; gap: 0.25em; }
  .k5-fline b { color: #16A34A; }
`;

registerDemos(DEMOS5, CSS5, 'g5');
