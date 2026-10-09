/**
 * Ví dụ hình học "xem từng bước" (📘 Kiến thức SGK Toán 4): góc, vuông góc, song song, vẽ bằng ê ke và thước,
 * hình bình hành, hình thoi, diện tích (cắt ghép hình), đơn vị đo diện tích.
 * Mọi bước của một ví dụ dùng cùng viewBox 360 × 220; phần chưa tới thì chưa vẽ, nên hình không xê dịch.
 *
 *   { kind: 'angles', quiz: [150, 35] }            Bài 40: góc vuông, nhọn, tù, bẹt; quiz = các góc (độ) để em đoán
 *   { kind: 'perp' } / { kind: 'parallel' }         Bài 41, 42: kéo dài cạnh hình chữ nhật
 *   { kind: 'drawPerp', onLine: false }             Bài 43: vẽ CD qua E vuông góc AB (onLine: E nằm trên AB)
 *   { kind: 'drawPerp', mode: 'height' }            Bài 43: đường cao AH của tam giác ABC
 *   { kind: 'drawPar' }                             Bài 44: vẽ CD qua E song song AB (hai bước)
 *   { kind: 'drawRect', w: 4, h: 2 }                Bài 45 (square: true, w: 3 → Bài 46, hỏi thêm diện tích)
 *   { kind: 'parallelogram' } / { kind: 'paraArea', a: 5, h: 3, s: 2 }   Bài 93, 94 (s: độ dài DH)
 *   { kind: 'rhombus' } / { kind: 'rhombusArea', m: 4, n: 3 }            Bài 133, 134
 *   { kind: 'areaUnit', unit: 'dm' | 'm' | 'km' }   Bài 54, 55, 91
 */

import { frames, svg, txt, C, fmt, fr } from './util.js';

const W = 360, H = 220;
const P = (x, y) => ({ x, y });
const mv = (p, d, k = 1) => P(p.x + d.x * k, p.y + d.y * k);
const dist = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
const dir = (a, b) => { const l = dist(a, b) || 1; return P((b.x - a.x) / l, (b.y - a.y) / l); };
const n1 = (v) => Math.round(v * 10) / 10;
const xy = (p) => `${n1(p.x)} ${n1(p.y)}`;
const pts = (list) => list.map(p => `${n1(p.x)},${n1(p.y)}`).join(' ');
const RIGHT = P(1, 0), LEFT = P(-1, 0), UP = P(0, -1), DOWN = P(0, 1);
const EKE_FILL = 'rgba(251,191,36,0.3)', EKE_LINE = '#D97706', GRID = '#E2E8F0';
const pop = (isNew) => (isNew ? 'is-new' : '');
const g = (cls, body, style = '') => `<g class="${cls}"${style ? ` style="${style}"` : ''}>${body}</g>`;

// ── Nét vẽ ──────────────────────────────────────────────────────────────────
/** Đoạn thẳng; draw: tự vẽ ra (nét liền) hoặc hiện dần (nét đứt). */
function seg(a, b, { color = C.ink, w = 2.5, draw = false, dash = '', cls = '', op } = {}) {
  const c = [cls, draw ? (dash ? 'is-fade' : 'is-draw') : ''].filter(Boolean).join(' ');
  const style = draw && !dash ? ` style="--len:${Math.ceil(dist(a, b))}"` : '';
  return `<line x1="${n1(a.x)}" y1="${n1(a.y)}" x2="${n1(b.x)}" y2="${n1(b.y)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}${op != null ? ` opacity="${op}"` : ''} class="${c}"${style}/>`;
}
/** Đa giác; draw: viền tự vẽ quanh hình. */
function poly(list, { fill = 'none', stroke = C.ink, w = 2.5, cls = '', dash = '', draw = false, style = '' } = {}) {
  let per = 0;
  list.forEach((p, i) => { per += dist(p, list[(i + 1) % list.length]); });
  const c = [cls, draw ? 'is-draw' : ''].filter(Boolean).join(' ');
  const s = [style, draw ? `--len:${Math.ceil(per)}` : ''].filter(Boolean).join(';');
  return `<polygon points="${pts(list)}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''} class="${c}"${s ? ` style="${s}"` : ''}/>`;
}
const dot = (p, color = C.ink) => `<circle cx="${n1(p.x)}" cy="${n1(p.y)}" r="3.6" fill="${color}"/>`;
const lab = (p, t, dx = 0, dy = 0, o = {}) => txt(n1(p.x + dx), n1(p.y + dy), t, { size: 16, ...o });
/** Điểm có tên. */
const point = (p, name, dx, dy, isNew = false, color = C.ink) => g(pop(isNew), dot(p, color) + (name ? lab(p, name, dx, dy) : ''));

/** Dấu góc vuông: ô vuông nhỏ ở đỉnh V, hai cạnh theo hướng d1, d2. */
function rmark(V, d1, d2, { s = 11, color = C.ink, cls = '', style = '' } = {}) {
  const a = mv(V, d1, s), b = mv(a, d2, s), c = mv(V, d2, s);
  return `<path d="M${xy(a)} L${xy(b)} L${xy(c)}" fill="none" stroke="${color}" stroke-width="1.8" class="${cls}"${style ? ` style="${style}"` : ''}/>`;
}
/** Mũi tên nhỏ (dấu song song) trên đoạn ab, tại phần t của đoạn; n mũi. */
function chev(a, b, { t = 0.5, n = 1, color = C.ink, cls = '', s = 6 } = {}) {
  const d = dir(a, b), nr = P(-d.y, d.x), L = dist(a, b);
  let out = '';
  for (let i = 0; i < n; i++) {
    const c = mv(a, d, L * t + (i - (n - 1) / 2) * 7);
    const back = mv(c, d, -s);
    out += `<path d="M${xy(mv(back, nr, s))} L${xy(c)} L${xy(mv(back, nr, -s))}"/>`;
  }
  return `<g class="${cls}" stroke="${color}" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${out}</g>`;
}
/** Vạch bằng nhau (n vạch) vuông góc với đoạn ab tại phần t. */
function ticks(a, b, { t = 0.5, n = 1, color = C.ink, cls = '' } = {}) {
  const d = dir(a, b), nr = P(-d.y, d.x), L = dist(a, b);
  let out = '';
  for (let i = 0; i < n; i++) {
    const c = mv(a, d, L * t + (i - (n - 1) / 2) * 5);
    out += `<path d="M${xy(mv(c, nr, 6))} L${xy(mv(c, nr, -6))}"/>`;
  }
  return `<g class="${cls}" stroke="${color}" stroke-width="2.2" stroke-linecap="round">${out}</g>`;
}
/** Cung đánh dấu góc, từ góc th1 đến th2 (độ, ngược chiều kim đồng hồ, trục y hướng lên). */
function arc(O, r, th1, th2, { color = C.ink, cls = '', fill = 'none' } = {}) {
  const at = (th) => P(O.x + r * Math.cos(th * Math.PI / 180), O.y - r * Math.sin(th * Math.PI / 180));
  const a = at(th1), b = at(th2);
  const big = th2 - th1 > 180 ? 1 : 0;
  const d = fill === 'none' ? `M${xy(a)} A${r} ${r} 0 ${big} 0 ${xy(b)}` : `M${xy(O)} L${xy(a)} A${r} ${r} 0 ${big} 0 ${xy(b)} Z`;
  return `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="2" class="${cls}"/>`;
}

/** Ê ke: góc vuông ở V, một cạnh góc vuông dài a theo hướng dA, cạnh kia dài b theo hướng dB.
 *  move: { dx, dy } vị trí cũ trừ vị trí mới, ê ke trượt từ chỗ cũ tới (class is-move). */
function eke(V, dA, dB, a, b, { move, cls = '' } = {}) {
  const A = mv(V, dA, a), B = mv(V, dB, b);
  let h = poly([V, A, B], { fill: EKE_FILL, stroke: EKE_LINE, w: 1.6 });
  const t = 15, V2 = mv(mv(V, dA, t), dB, t);
  h += poly([V2, mv(V2, dA, a * 0.45), mv(V2, dB, b * 0.45)], { fill: 'rgba(255,255,255,0.45)', stroke: EKE_LINE, w: 1 });
  let tk = '';
  for (let s = 8; s < a - 6; s += 8) { const p = mv(V, dA, s); tk += `M${xy(p)} L${xy(mv(p, dB, s % 40 === 0 ? 7 : 4))} `; }
  for (let s = 8; s < b - 6; s += 8) { const p = mv(V, dB, s); tk += `M${xy(p)} L${xy(mv(p, dA, s % 40 === 0 ? 7 : 4))} `; }
  h += `<path d="${tk}" stroke="${EKE_LINE}" stroke-width="1" fill="none"/>`;
  const c = [cls, move ? 'is-move' : ''].filter(Boolean).join(' ');
  return g(c, h, move ? `--dx:${n1(move.dx)}px;--dy:${n1(move.dy)}px` : '');
}

/** Thước thẳng nằm ngang dưới đoạn thẳng bắt đầu ở x, có n xăng-ti-mét, mỗi xăng-ti-mét dài u. */
function ruler(x, y, n, u, cls = '') {
  let h = `<rect x="${x - 12}" y="${y}" width="${n * u + 24}" height="27" rx="3" fill="#FEF9C3" stroke="#CA8A04" stroke-width="1.2"/>`;
  let tk = '';
  for (let k = 0; k <= n * 2; k++) tk += `M${n1(x + k * u / 2)} ${y} L${n1(x + k * u / 2)} ${y + (k % 2 ? 6 : 10)} `;
  h += `<path d="${tk}" stroke="#A16207" stroke-width="1.3"/>`;
  for (let i = 0; i <= n; i++) h += txt(x + i * u, y + 19, i, { size: 14, fill: '#854D0E', weight: 700, cls: 'plain' });
  return g(cls, h);
}

/** Giấy kẻ ô vuông phủ cả khung, ô cạnh u, đi qua điểm (ox, oy). */
function grid(u, ox, oy) {
  let d = '';
  for (let x = ((ox % u) + u) % u; x <= W; x += u) d += `M${n1(x)} 0 V${H} `;
  for (let y = ((oy % u) + u) % u; y <= H; y += u) d += `M0 ${n1(y)} H${W} `;
  return `<path d="${d}" stroke="${GRID}" stroke-width="1" fill="none"/>`;
}

/** Ba lựa chọn: đáp án và các số sai hay gặp, bỏ trùng, xếp từ bé đến lớn. */
function choices(answer, wrongs, unit = '', ok) {
  const vals = [answer];
  [...wrongs, answer + 1, answer - 1, answer + 2].forEach(v => { if (v > 0 && vals.length < 3 && !vals.includes(v)) vals.push(v); });
  vals.sort((a, b) => a - b);
  const f = (v) => `${fmt(String(v).replace('.', ','))}${unit}`;
  return { options: vals.map(f), answer: vals.indexOf(answer), ok };
}
const num = (v) => fmt(String(v).replace('.', ','));

/** Dựng từng bước: pic(k) vẽ hình của bước k; steps = [{ cap, ask?, result? }]. */
function build(title, steps, pic) {
  const f = frames(title);
  steps.forEach((s, k) => f.add(svg(W, H, pic(k)), s.cap, { ...(s.result ? { result: s.result } : {}), ...(s.ask ? { ask: s.ask } : {}) }));
  return f.done();
}
/** Lớp hiện từ bước at (vừa hiện thì isNew), tới trước bước until. */
const layer = (k) => (at, fn, until = 1e9) => (k >= at && k < until ? fn(k === at) : '');

// ── Bài 40: Góc nhọn, góc tù, góc bẹt ───────────────────────────────────────
function angles(spec) {
  const quiz = spec.quiz || [150, 35];
  const O = P(180, 166), R = 140;
  const NAMES = ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'];
  const COL = [C.blue, C.green, C.orange, C.violet];
  const kindOf = (th) => (th < 90 ? 0 : th === 90 ? 1 : th < 180 ? 2 : 3);
  const end = (th, r = R) => P(O.x + r * Math.cos(th * Math.PI / 180), O.y - r * Math.sin(th * Math.PI / 180));
  const EA = 100, EB = 118;
  /** th: số đo góc; names: tên đầu cạnh nằm ngang và cạnh kia; newSide: cạnh kia tự vẽ; e1/e2: ê ke phải/trái (2 = vừa trượt vào). */
  const scene = ({ th, names = ['A', 'B'], newSide = false, e1 = 0, e2 = 0, neutral = false }) => {
    const col = neutral ? C.ink : COL[kindOf(th)];
    let h = '';
    h += arc(O, 26, 0, th, { color: col, fill: neutral ? 'rgba(148,163,184,0.18)' : `${col}22`, cls: newSide ? 'is-fade' : '' });
    if (th === 90 && !neutral) h += rmark(O, RIGHT, UP, { s: 13, color: col });
    h += seg(O, end(0), { w: 3 });
    h += seg(O, end(th), { w: 3, draw: newSide });
    h += point(O, 'O', 0, 20);
    h += lab(end(0), names[0], 14, 0) + dot(end(0));
    h += g(newSide ? 'is-new' : '', lab(end(th), names[1], th === 180 ? -14 : 14 * Math.cos(th * Math.PI / 180) + (th === 90 ? 14 : 0), th === 180 ? 0 : -12) + dot(end(th)));
    if (e1) h += eke(O, RIGHT, UP, EA, EB, { move: e1 === 2 ? { dx: 70, dy: 18 } : null });
    if (e2) h += eke(O, LEFT, UP, EA, EB, { move: e2 === 2 ? { dx: -70, dy: 18 } : null });
    return h;
  };
  const S = [
    [{ th: 90, newSide: true }, 'Đây là <b>góc vuông</b> đỉnh O; cạnh OA, OB.'],
    [{ th: 90, e1: 2 }, 'Đặt ê ke vào: góc vuông của ê ke <b>trùng khít</b> với góc đỉnh O.'],
    [{ th: 55, newSide: true }, 'Đây là <b>góc nhọn</b> đỉnh O; cạnh OA, OB.'],
    [{ th: 55, e1: 2 }, 'Đặt góc vuông của ê ke trùng đỉnh O và cạnh OA. Cạnh OB nằm <b>trong</b> ê ke: góc nhọn <b>bé hơn</b> góc vuông.'],
    [{ th: 125, newSide: true }, 'Đây là <b>góc tù</b> đỉnh O; cạnh OA, OB.'],
    [{ th: 125, e1: 2 }, 'Đặt ê ke như vậy: cạnh OB nằm <b>ngoài</b> ê ke. Góc tù <b>lớn hơn</b> góc vuông.'],
    [{ th: 180, names: ['D', 'C'], newSide: true }, 'Đây là <b>góc bẹt</b> đỉnh O; cạnh OC, OD. Ba điểm C, O, D <b>thẳng hàng</b>.'],
    [{ th: 180, names: ['D', 'C'], e1: 2 }, 'Đặt một ê ke vào góc bẹt: chiếm một góc vuông.'],
    [{ th: 180, names: ['D', 'C'], e1: 1, e2: 2 }, 'Thêm một ê ke nữa thì vừa khít: góc bẹt <b>bằng hai góc vuông</b>.'],
  ];
  const steps = S.map(([sc, cap]) => ({ sc, cap }));
  const OK = [
    'Đúng rồi! Cạnh ON nằm trong ê ke nếu đặt ê ke vào: đó là <b>góc nhọn</b>, bé hơn góc vuông.',
    'Đúng rồi! Đó là <b>góc vuông</b>.',
    'Đúng rồi! Góc này lớn hơn góc vuông nhưng chưa thẳng hàng: đó là <b>góc tù</b>.',
    'Đúng rồi! Hai cạnh nằm trên một đường thẳng: đó là <b>góc bẹt</b>.',
  ];
  quiz.forEach((th) => steps.push({
    sc: { th, names: ['M', 'N'], newSide: true, neutral: true },
    cap: 'Góc đỉnh O; cạnh OM, ON. Góc này là góc gì?',
    ask: { options: NAMES, answer: kindOf(th), ok: OK[kindOf(th)] },
  }));
  return build('Góc nhọn, góc tù, góc bẹt', steps, (k) => scene(steps[k].sc));
}

// ── Bài 41: Hai đường thẳng vuông góc ───────────────────────────────────────
function perp() {
  const A = P(70, 42), B = P(230, 42), Cc = P(230, 128), D = P(70, 128);
  const steps = [
    { cap: 'Hình chữ nhật ABCD có <b>bốn góc vuông</b>.' },
    { cap: 'Kéo dài cạnh <b>DC</b> thành một đường thẳng.' },
    { cap: 'Kéo dài cạnh <b>BC</b> thành một đường thẳng.' },
    { cap: 'Góc BCD là góc vuông. Hai đường thẳng BC và DC tạo thành mấy góc vuông chung đỉnh C?',
      ask: { options: ['1 góc', '2 góc', '4 góc'], answer: 2, ok: 'Đúng rồi! Có <b>4 góc vuông</b> chung đỉnh C.' } },
    { cap: 'Hai đường thẳng BC và DC tạo thành <b>bốn góc vuông</b> có chung đỉnh C.' },
    { cap: 'Kiểm tra bằng ê ke: góc vuông của ê ke trùng khít. BC và DC là <b>hai đường thẳng vuông góc</b> với nhau.', result: 'BC vuông góc với DC' },
  ];
  return build('Hai đường thẳng vuông góc', steps, (k) => {
    const L = layer(k);
    let h = poly([A, B, Cc, D], { fill: '#EFF6FF', stroke: C.ink, w: 2.5 });
    h += L(1, (n) => seg(P(14, Cc.y), P(346, Cc.y), { color: C.blue, w: 3, draw: n }));
    h += L(2, (n) => seg(P(Cc.x, 10), P(Cc.x, 210), { color: C.orange, w: 3, draw: n }));
    h += L(3, (n) => rmark(Cc, LEFT, UP, { s: 13, color: C.green, cls: pop(n) }));
    h += L(4, (n) => [[RIGHT, UP], [RIGHT, DOWN], [LEFT, DOWN]].map(([a, b], i) =>
      rmark(Cc, a, b, { s: 13, color: C.green, cls: pop(n), style: n ? `animation-delay:${0.25 * i}s` : '' })).join(''));
    h += L(5, (n) => eke(Cc, RIGHT, DOWN, 92, 72, { move: n ? { dx: 50, dy: 20 } : null }));
    h += point(A, 'A', -12, -10) + point(B, 'B', 12, -10) + point(Cc, 'C', -13, 15) + point(D, 'D', -12, 15);
    return h;
  });
}

// ── Bài 42: Hai đường thẳng song song ───────────────────────────────────────
function parallel() {
  const A = P(115, 72), B = P(245, 72), Cc = P(245, 150), D = P(115, 150);
  const steps = [
    { cap: 'Hình chữ nhật ABCD.' },
    { cap: 'Kéo dài cạnh <b>AB</b> về hai phía.' },
    { cap: 'Kéo dài cạnh <b>DC</b> về hai phía.' },
    { cap: 'Kéo dài mãi hai đường thẳng này. Chúng có cắt nhau không?',
      ask: { options: ['Có cắt nhau', 'Không cắt nhau'], answer: 1, ok: 'Đúng rồi! Kéo dài mãi, hai đường thẳng vẫn <b>không bao giờ cắt nhau</b>.' } },
    { cap: 'Khoảng cách giữa hai đường thẳng ở chỗ nào cũng bằng nhau. AB và DC là <b>hai đường thẳng song song</b>.', result: 'AB song song với DC' },
    { cap: 'Tương tự, cạnh <b>AD song song với BC</b>.', result: 'AD song song với BC' },
  ];
  return build('Hai đường thẳng song song', steps, (k) => {
    const L = layer(k);
    let h = poly([A, B, Cc, D], { fill: '#EFF6FF', stroke: C.ink, w: 2.5 });
    h += L(1, (n) => seg(P(12, A.y), P(348, A.y), { color: C.blue, w: 3, draw: n }));
    h += L(2, (n) => seg(P(12, D.y), P(348, D.y), { color: C.blue, w: 3, draw: n }));
    h += L(4, (n) => [40, 180, 320].map(x => seg(P(x, A.y + 4), P(x, D.y - 4), { color: C.green, w: 2, dash: '5 4', draw: n })).join('')
      + g(pop(n), chev(P(12, A.y), P(348, A.y), { t: 0.82, color: C.blue }) + chev(P(12, D.y), P(348, D.y), { t: 0.82, color: C.blue })));
    h += L(5, (n) => seg(A, D, { color: C.orange, w: 3.5, draw: n }) + seg(B, Cc, { color: C.orange, w: 3.5, draw: n })
      + g(pop(n), chev(A, D, { n: 2, color: C.orange }) + chev(B, Cc, { n: 2, color: C.orange })));
    h += point(A, 'A', -12, -12) + point(B, 'B', 12, -12) + point(Cc, 'C', 12, 15) + point(D, 'D', -12, 15);
    return h;
  });
}

// ── Bài 43: Vẽ hai đường thẳng vuông góc; đường cao của tam giác ────────────
function drawPerp(spec) {
  if (spec.mode === 'height') return height();
  const on = !!spec.onLine;
  const y = 150, E = P(200, on ? y : 62), V0 = P(92, y), V = P(E.x, y);
  const where = on ? 'nằm trên' : 'nằm ngoài';
  const steps = [
    { cap: `Điểm E ${where} đường thẳng AB. Vẽ đường thẳng CD đi qua E và <b>vuông góc</b> với AB.` },
    { cap: 'Đặt một cạnh góc vuông của ê ke <b>trùng với đường thẳng AB</b>.' },
    { cap: 'Trượt ê ke dọc theo AB đến khi cạnh góc vuông còn lại <b>chạm điểm E</b>.' },
    { cap: 'Vạch một đường thẳng theo cạnh đó của ê ke, đặt tên là <b>CD</b>.' },
    { cap: 'Bỏ ê ke ra. Đường thẳng CD thế nào với đường thẳng AB?',
      ask: { options: ['Vuông góc', 'Song song'], answer: 0, ok: 'Đúng rồi! CD đi qua E và <b>vuông góc</b> với AB.' } },
    { cap: 'Đường thẳng CD đi qua E và <b>vuông góc</b> với AB: bốn góc ở chỗ cắt nhau đều là góc vuông.', result: 'CD vuông góc với AB' },
  ];
  return build('Vẽ đường thẳng vuông góc', steps, (k) => {
    const L = layer(k);
    let h = seg(P(16, y), P(344, y), { w: 3 });
    h += point(P(40, y), 'A', 0, 17) + point(P(320, y), 'B', 0, 17);
    h += L(3, (n) => seg(P(E.x, 14), P(E.x, 208), { color: C.blue, w: 3, draw: n }) + g(pop(n), lab(P(E.x, 14), 'C', 13, 6) + lab(P(E.x, 208), 'D', 13, -4)));
    h += L(5, (n) => rmark(V, RIGHT, UP, { s: 13, color: C.green, cls: pop(n) }));
    h += L(1, (n) => (k === 1 ? eke(V0, RIGHT, UP, 110, 128, { move: n ? { dx: 30, dy: -40 } : null })
      : eke(V, RIGHT, UP, 110, 128, { move: k === 2 ? { dx: V0.x - V.x, dy: 0 } : null })), 4);
    h += point(E, 'E', -13, on ? -13 : -10, false, C.red);
    return h;
  });
}

function height() {
  const A = P(150, 30), B = P(36, 186), Cc = P(324, 186), Hh = P(A.x, B.y), V0 = P(232, B.y);
  const steps = [
    { cap: 'Hình tam giác ABC. Qua đỉnh A, vẽ đường thẳng <b>vuông góc</b> với cạnh BC.' },
    { cap: 'Đặt một cạnh góc vuông của ê ke <b>trùng với cạnh BC</b>.' },
    { cap: 'Trượt ê ke dọc theo BC đến khi cạnh góc vuông kia <b>chạm đỉnh A</b>.' },
    { cap: 'Vạch theo cạnh ê ke từ A xuống, cắt BC tại <b>H</b>.' },
    { cap: 'Đoạn thẳng AH vuông góc với cạnh BC. Đoạn thẳng AH gọi là gì?',
      ask: { options: ['Đường cao', 'Cạnh đáy', 'Đường chéo'], answer: 0, ok: 'Đúng rồi! AH là <b>đường cao</b> của hình tam giác ABC.' } },
    { cap: 'Góc AHB là góc vuông. Độ dài AH là <b>chiều cao</b> của hình tam giác ABC.', result: 'AH là đường cao' },
  ];
  return build('Đường cao của hình tam giác', steps, (k) => {
    const L = layer(k);
    let h = poly([A, B, Cc], { fill: '#EFF6FF', stroke: C.ink, w: 2.5 });
    h += L(3, (n) => seg(A, Hh, { color: k >= 5 ? C.orange : C.blue, w: k >= 5 ? 4 : 3, draw: n }) + point(Hh, 'H', 0, 17, n));
    h += L(4, (n) => rmark(Hh, RIGHT, UP, { s: 12, color: C.green, cls: pop(n) }));
    h += L(1, (n) => eke(k === 1 ? V0 : Hh, RIGHT, UP, 96, 160, { move: n ? (k === 1 ? { dx: 30, dy: 30 } : null) : k === 2 ? { dx: V0.x - Hh.x, dy: 0 } : null }), 4);
    h += point(A, 'A', 0, -14, false) + point(B, 'B', -13, 2) + point(Cc, 'C', 13, 2);
    return h;
  });
}

// ── Bài 44: Vẽ hai đường thẳng song song ────────────────────────────────────
function drawPar() {
  const y = 168, E = P(210, 70), V0 = P(108, y), V1 = P(E.x, y);
  const steps = [
    { cap: 'Vẽ đường thẳng CD đi qua điểm E và <b>song song</b> với đường thẳng AB.' },
    { cap: '<b>Bước 1:</b> đặt ê ke trên AB, trượt tới khi cạnh góc vuông kia chạm E.' },
    { cap: 'Vẽ đường thẳng <b>MN</b> đi qua E và vuông góc với AB.' },
    { cap: '<b>Bước 2:</b> đặt một cạnh góc vuông của ê ke trùng MN, trượt tới khi đỉnh góc vuông chạm E.' },
    { cap: 'Vẽ đường thẳng <b>CD</b> đi qua E và vuông góc với MN.' },
    { cap: 'AB và CD cùng vuông góc với MN. CD thế nào với AB?',
      ask: { options: ['Song song', 'Vuông góc', 'Cắt nhau'], answer: 0, ok: 'Đúng rồi! CD <b>song song</b> với AB.' } },
    { cap: 'Hai đường thẳng cùng vuông góc với một đường thẳng thì <b>song song</b> với nhau.', result: 'CD song song với AB' },
  ];
  return build('Vẽ đường thẳng song song', steps, (k) => {
    const L = layer(k);
    let h = seg(P(16, y), P(344, y), { w: 3 }) + point(P(40, y), 'A', 0, 17) + point(P(320, y), 'B', 0, 17);
    h += L(2, (n) => seg(P(E.x, 10), P(E.x, 212), { color: C.violet, w: 3, draw: n }) + g(pop(n), lab(P(E.x, 12), 'M', 14, 4) + lab(P(E.x, 210), 'N', 14, -4)) + rmark(V1, RIGHT, UP, { s: 12, color: C.green, cls: pop(n) }));
    h += L(4, (n) => seg(P(16, E.y), P(344, E.y), { color: C.blue, w: 3, draw: n }) + g(pop(n), lab(P(16, E.y), 'C', 8, -14) + lab(P(344, E.y), 'D', -8, -14)) + rmark(E, RIGHT, DOWN, { s: 12, color: C.green, cls: pop(n) }));
    h += L(6, (n) => g(pop(n), chev(P(16, y), P(344, y), { t: 0.18 }) + chev(P(16, E.y), P(344, E.y), { t: 0.18, color: C.blue })));
    h += L(1, (n) => eke(V1, RIGHT, UP, 100, 130, { move: n ? { dx: V0.x - V1.x, dy: 0 } : null }), 2);
    h += L(3, (n) => eke(E, DOWN, RIGHT, 82, 112, { move: n ? { dx: 0, dy: -44 } : null }), 4);
    h += point(E, 'E', -13, -11, false, C.red);
    return h;
  });
}

// ── Bài 45, 46: Vẽ hình chữ nhật, hình vuông trên giấy kẻ ô 1cm ──────────────
function drawRect(spec) {
  const sq = !!spec.square, w = spec.w || (sq ? 3 : 4), h = sq ? w : (spec.h || 2);
  const u = Math.min(36, Math.floor(260 / w), Math.floor(132 / h));
  const ext = Math.round(u * 0.7);
  const D = P(Math.round((W - w * u) / 2), Math.round((H + h * u + ext - 30) / 2)), Cc = P(D.x + w * u, D.y), A = P(D.x, D.y - h * u), B = P(Cc.x, A.y);
  const shape = sq ? 'hình vuông' : 'hình chữ nhật';
  const per = sq ? w * 4 : (w + h) * 2, area = w * h;
  const steps = [
    { cap: sq ? `Vẽ <b>hình vuông ABCD cạnh ${w}cm</b> trên giấy kẻ ô vuông 1cm. Đặt thước thẳng.` : `Vẽ <b>hình chữ nhật ABCD</b> dài ${w}cm, rộng ${h}cm trên giấy kẻ ô vuông 1cm. Đặt thước thẳng.` },
    { cap: `<b>Bước 1:</b> vẽ đoạn thẳng <b>DC = ${w}cm</b>, từ vạch 0 đến vạch ${w} của thước.` },
    { cap: '<b>Bước 2:</b> đặt ê ke, vẽ đường thẳng <b>vuông góc với DC tại D</b>.' },
    { cap: `Trên đường thẳng đó lấy đoạn thẳng <b>DA = ${h}cm</b>.` },
    { cap: '<b>Bước 3:</b> vẽ đường thẳng <b>vuông góc với DC tại C</b>.' },
    { cap: `Trên đường thẳng đó lấy đoạn thẳng <b>CB = ${h}cm</b>.` },
    { cap: `<b>Bước 4:</b> nối A với B. Ta được ${shape} ABCD.` },
    { cap: `Chu vi ${shape} ABCD là bao nhiêu?`,
      ask: choices(per, [sq ? w * 2 : w + h, area], 'cm', sq ? `Đúng rồi! Chu vi: ${w} × 4 = ${per} (cm).` : `Đúng rồi! Chu vi: (${w} + ${h}) × 2 = ${per} (cm).`) },
    { cap: sq ? 'Chu vi hình vuông bằng độ dài một cạnh nhân với 4.' : 'Chu vi hình chữ nhật bằng chiều dài cộng chiều rộng (cùng đơn vị đo) rồi nhân với 2.',
      result: sq ? `Chu vi: ${w} × 4 = ${per} (cm)` : `Chu vi: (${w} + ${h}) × 2 = ${per} (cm)` },
  ];
  if (sq) {
    steps.push({ cap: 'Diện tích hình vuông ABCD là bao nhiêu? Đếm số ô vuông 1cm² bên trong.',
      ask: choices(area, [per, w * 2], 'cm²', `Đúng rồi! Diện tích: ${w} × ${w} = ${area} (cm²).`) });
    steps.push({ cap: 'Diện tích hình vuông bằng độ dài một cạnh nhân với chính nó.', result: `Diện tích: ${w} × ${w} = ${area} (cm²)` });
  }
  return build(sq ? `Vẽ hình vuông cạnh ${w}cm` : `Vẽ hình chữ nhật ${w}cm × ${h}cm`, steps, (k) => {
    const L = layer(k);
    let s = grid(u, D.x, D.y);
    s += L(6, (n) => poly([A, B, Cc, D], { fill: 'rgba(59,130,246,0.12)', stroke: 'none', w: 0, cls: n ? 'is-fade' : '' }));
    s += L(sq ? 9 : 99, (n) => {
      let c = '';
      for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) c += txt(D.x + (i + 0.5) * u, A.y + (j + 0.5) * u, i + j * w + 1, { size: 14, fill: C.blue, weight: 700, cls: 'plain' });
      return g(pop(n), c);
    });
    s += L(0, (n) => ruler(D.x, D.y + 3, w, u, pop(n)), 2);
    s += L(2, (n) => seg(D, P(D.x, A.y - ext), { color: C.soft, w: 1.5, draw: n }));
    s += L(4, (n) => seg(Cc, P(Cc.x, B.y - ext), { color: C.soft, w: 1.5, draw: n }));
    s += L(1, (n) => seg(D, Cc, { color: C.blue, w: 3.5, draw: n }));
    s += L(2, (n) => g(pop(n), lab(P((D.x + Cc.x) / 2, D.y), `${w}cm`, 0, 18, { size: 15, fill: C.blue })));
    s += L(3, (n) => seg(D, A, { color: C.orange, w: 3.5, draw: n }) + rmark(D, RIGHT, UP, { s: 11, color: C.green, cls: pop(n) }) + g(pop(n), lab(P(D.x, (A.y + D.y) / 2), `${h}cm`, -26, 0, { size: 15, fill: C.orange })));
    s += L(5, (n) => seg(Cc, B, { color: C.orange, w: 3.5, draw: n }) + rmark(Cc, LEFT, UP, { s: 11, color: C.green, cls: pop(n) }) + g(pop(n), lab(P(Cc.x, (B.y + Cc.y) / 2), `${h}cm`, 26, 0, { size: 15, fill: C.orange })));
    s += L(6, (n) => seg(A, B, { color: C.blue, w: 3.5, draw: n }));
    s += L(2, (n) => eke(D, RIGHT, UP, Math.round(u * 1.9), h * u + Math.round(u * 0.55), { move: n ? { dx: 40, dy: 14 } : null }), 4);
    s += L(4, (n) => eke(Cc, LEFT, UP, Math.round(u * 1.9), h * u + Math.round(u * 0.55), { move: n ? { dx: -40, dy: 14 } : null }), 6);
    s += L(1, (n) => point(D, 'D', -24, 4, n) + point(Cc, 'C', 24, 4, n));
    s += L(3, (n) => point(A, 'A', -12, -11, n));
    s += L(5, (n) => point(B, 'B', 12, -11, n));
    return s;
  });
}

// ── Bài 93: Hình bình hành ──────────────────────────────────────────────────
function parallelogram() {
  const A = P(122, 48), B = P(312, 48), Cc = P(250, 174), D = P(60, 174);
  const steps = [
    { cap: 'Đây là <b>hình bình hành</b> ABCD.' },
    { cap: 'AB và DC là <b>hai cạnh đối diện</b>.' },
    { cap: 'Kéo dài thì không bao giờ cắt nhau: cạnh AB <b>song song</b> với cạnh DC.' },
    { cap: 'Đo hai cạnh: <b>AB = DC</b>.' },
    { cap: 'AD và BC là hai cạnh đối diện còn lại. Cạnh nào song song với AD?',
      ask: { options: ['AB', 'BC', 'DC'], answer: 1, ok: 'Đúng rồi! Cạnh AD <b>song song</b> với cạnh BC.' } },
    { cap: 'Cạnh AD song song với cạnh BC và <b>AD = BC</b>.' },
    { cap: 'Hình bình hành có <b>hai cặp cạnh đối diện song song và bằng nhau</b>.', result: 'AB = DC; AD = BC' },
  ];
  return build('Hình bình hành', steps, (k) => {
    const L = layer(k);
    let h = poly([A, B, Cc, D], { fill: '#F5F3FF', stroke: C.ink, w: 2.5, draw: k === 0 });
    h += L(2, (n) => seg(P(14, A.y), P(346, A.y), { color: C.blue, w: 1.6, dash: '6 5', draw: n }) + seg(P(14, D.y), P(346, D.y), { color: C.blue, w: 1.6, dash: '6 5', draw: n }));
    h += L(1, (n) => seg(A, B, { color: C.blue, w: 4, draw: n }) + seg(D, Cc, { color: C.blue, w: 4, draw: n }));
    h += L(2, (n) => g(pop(n), chev(A, B, { t: 0.38, color: C.blue }) + chev(D, Cc, { t: 0.38, color: C.blue })));
    h += L(3, (n) => g(pop(n), ticks(A, B, { t: 0.65, color: C.blue }) + ticks(D, Cc, { t: 0.65, color: C.blue })));
    h += L(5, (n) => seg(A, D, { color: C.orange, w: 4, draw: n }) + seg(B, Cc, { color: C.orange, w: 4, draw: n })
      + g(pop(n), chev(A, D, { t: 0.36, n: 2, color: C.orange }) + chev(B, Cc, { t: 0.36, n: 2, color: C.orange })
        + ticks(A, D, { t: 0.68, n: 2, color: C.orange }) + ticks(B, Cc, { t: 0.68, n: 2, color: C.orange })));
    h += point(A, 'A', -10, -13) + point(B, 'B', 10, -13) + point(Cc, 'C', 12, 15) + point(D, 'D', -12, 15);
    return h;
  });
}

// ── Bài 94: Diện tích hình bình hành (cắt ghép thành hình chữ nhật) ──────────
function paraArea(spec) {
  const a = spec.a || 5, hh = spec.h || 3, s = spec.s ?? 2;
  const u = Math.min(36, Math.floor(300 / (a + s)), Math.floor(140 / hh));
  const x0 = Math.round((W - (a + s) * u) / 2), y0 = 172;
  const D = P(x0, y0), Cc = P(x0 + a * u, y0), A = P(x0 + s * u, y0 - hh * u), B = P(A.x + a * u, A.y), Hh = P(A.x, y0), I = P(B.x, y0);
  const S = a * hh;
  const steps = [
    { cap: 'Hình bình hành ABCD vẽ trên giấy kẻ ô vuông 1cm.' },
    { cap: `Cạnh DC là <b>đáy</b>. Độ dài đáy: <b>a = ${a}cm</b>.` },
    { cap: `Kẻ AH vuông góc với DC. Độ dài AH là <b>chiều cao</b>: <b>h = ${hh}cm</b>.` },
    { cap: 'Cắt hình tam giác <b>ADH</b> ra.' },
    { cap: 'Ghép hình tam giác đó sang bên phải, cạnh AD khớp với cạnh BC.' },
    { cap: `Ta được <b>hình chữ nhật ABIH</b> dài ${a}cm, rộng ${hh}cm. Hình chữ nhật này có diện tích bằng diện tích hình bình hành.` },
    { cap: 'Diện tích hình bình hành ABCD là bao nhiêu?',
      ask: choices(S, [a + hh, (a + hh) * 2], 'cm²', `Đúng rồi! S = ${a} × ${hh} = ${S} (cm²).`) },
    { cap: 'Diện tích hình bình hành bằng <b>độ dài đáy nhân với chiều cao</b> (cùng một đơn vị đo): <b>S = a × h</b>.', result: `S = ${a} × ${hh} = ${S} (cm²)` },
  ];
  return build('Diện tích hình bình hành', steps, (k) => {
    const L = layer(k);
    let h = grid(u, x0, y0);
    // phần còn lại ABCH (tam giác ADH tô riêng)
    h += poly([A, B, Cc, Hh], { fill: 'rgba(139,92,246,0.16)', stroke: 'none', w: 0 });
    h += L(0, () => poly([A, Hh, D], { fill: 'rgba(139,92,246,0.16)', stroke: 'none', w: 0 }), 3);
    h += L(3, (n) => poly([A, Hh, D], { fill: 'rgba(249,115,22,0.3)', stroke: C.orange, w: 2, cls: n ? 'is-fade' : '' }), 4);
    h += L(4, () => poly([A, Hh, D], { fill: 'none', stroke: C.soft, w: 1.5, dash: '5 4' }));
    h += poly([A, B, Cc, D], { fill: 'none', stroke: k >= 4 ? C.soft : C.ink, w: k >= 4 ? 1.5 : 2.5, dash: k >= 4 ? '5 4' : '' });
    h += L(4, (n) => g(n ? 'is-move' : '', poly([B, I, Cc], { fill: 'rgba(249,115,22,0.3)', stroke: C.orange, w: 2 }), n ? `--dx:${-a * u}px;--dy:0px` : ''));
    h += L(1, (n) => seg(D, Cc, { color: C.blue, w: 4, draw: n }) + g(pop(n), lab(P((D.x + Cc.x) / 2, y0), `a = ${a}cm`, 0, 36, { size: 15, fill: C.blue })));
    h += L(2, (n) => seg(A, Hh, { color: C.orange, w: 3, draw: n }) + rmark(Hh, RIGHT, UP, { s: 11, color: C.green, cls: pop(n) })
      + point(Hh, 'H', 0, 17, n) + g(pop(n), lab(P(A.x, (A.y + y0) / 2), `h = ${hh}cm`, 8, 0, { size: 15, fill: C.orange, anchor: 'start' })));
    h += L(5, (n) => poly([A, B, I, Hh], { fill: 'none', stroke: C.green, w: 3.5, draw: n }));
    h += L(5, (n) => point(I, 'I', 10, 15, n));
    h += point(A, 'A', -2, -14) + point(B, 'B', 4, -14) + point(Cc, 'C', 0, 17) + point(D, 'D', -12, 13);
    return h;
  });
}

// ── Bài 133: Hình thoi ──────────────────────────────────────────────────────
function rhombus() {
  const O = P(180, 112), A = P(60, 112), Cc = P(300, 112), B = P(180, 30), D = P(180, 194);
  const steps = [
    { cap: 'Đây là <b>hình thoi</b> ABCD.' },
    { cap: 'Cạnh AB <b>song song</b> với cạnh DC.' },
    { cap: 'Cạnh AD <b>song song</b> với cạnh BC.' },
    { cap: 'Bốn cạnh <b>bằng nhau</b>: AB = BC = CD = DA.' },
    { cap: 'Vẽ hai <b>đường chéo</b> AC và BD, cắt nhau tại O.' },
    { cap: 'Hai đường chéo của hình thoi thế nào với nhau?',
      ask: { options: ['Vuông góc', 'Song song'], answer: 0, ok: 'Đúng rồi! Hai đường chéo AC và BD <b>vuông góc</b> với nhau.' } },
    { cap: 'Hai đường chéo <b>vuông góc</b> với nhau: bốn góc ở O đều là góc vuông.' },
    { cap: 'O là <b>trung điểm</b> của mỗi đường chéo: OA = OC, OB = OD.', result: 'OA = OC; OB = OD' },
  ];
  return build('Hình thoi', steps, (k) => {
    const L = layer(k);
    let h = poly([A, B, Cc, D], { fill: '#F0FDF4', stroke: C.ink, w: 2.5, draw: k === 0 });
    h += L(4, (n) => seg(A, Cc, { color: C.violet, w: 2.5, draw: n }) + seg(B, D, { color: C.violet, w: 2.5, draw: n }) + point(O, 'O', 14, 14, n));
    h += L(6, (n) => rmark(O, RIGHT, UP, { s: 12, color: C.green, cls: pop(n) }));
    h += L(7, (n) => g(pop(n), ticks(O, A, { n: 2, color: C.green }) + ticks(O, Cc, { n: 2, color: C.green }) + ticks(O, B, { n: 3, color: C.orange }) + ticks(O, D, { n: 3, color: C.orange })));
    h += L(1, (n) => seg(A, B, { color: C.blue, w: 3.5, draw: n }) + seg(D, Cc, { color: C.blue, w: 3.5, draw: n }) + g(pop(n), chev(A, B, { t: 0.35, color: C.blue }) + chev(D, Cc, { t: 0.35, color: C.blue })));
    h += L(2, (n) => seg(A, D, { color: C.orange, w: 3.5, draw: n }) + seg(B, Cc, { color: C.orange, w: 3.5, draw: n }) + g(pop(n), chev(A, D, { t: 0.35, n: 2, color: C.orange }) + chev(B, Cc, { t: 0.35, n: 2, color: C.orange })));
    h += L(3, (n) => g(pop(n), [[A, B], [B, Cc], [Cc, D], [D, A]].map(([p, q]) => ticks(p, q, { t: 0.66 })).join('')));
    h += point(A, 'A', -14, 0) + point(B, 'B', 0, -14) + point(Cc, 'C', 14, 0) + point(D, 'D', 0, 15);
    return h;
  });
}

// ── Bài 134: Diện tích hình thoi (cắt hai tam giác, ghép thành hình chữ nhật) ─
function rhombusArea(spec) {
  const m = spec.m || 4, n = spec.n || 3;
  const u = Math.min(50, Math.floor(280 / m), Math.floor(150 / n));
  const O = P(180, 40 + (n * u) / 2), hm = (m * u) / 2, hn = (n * u) / 2;
  const A = P(O.x - hm, O.y), Cc = P(O.x + hm, O.y), B = P(O.x, O.y - hn), D = P(O.x, O.y + hn), M = P(A.x, B.y), N = P(Cc.x, B.y);
  const S = (m * n) / 2;
  const steps = [
    { cap: `Hình thoi ABCD có hai đường chéo <b>AC = m = ${num(m)}cm</b> và <b>BD = n = ${num(n)}cm</b>.` },
    { cap: 'Cắt hình thoi theo hai nửa đường chéo: được hình tam giác <b>AOD</b> và hình tam giác <b>COD</b>.' },
    { cap: 'Ghép hình tam giác AOD lên góc trên bên phải.' },
    { cap: 'Ghép hình tam giác COD lên góc trên bên trái.' },
    { cap: `Ta được <b>hình chữ nhật AMNC</b>: chiều dài m = ${num(m)}cm, chiều rộng bằng nửa n. Diện tích bằng diện tích hình thoi.` },
    { cap: 'Diện tích hình thoi ABCD là bao nhiêu?',
      ask: choices(S, [m * n, (m + n) * 2], 'cm²', `Đúng rồi! ${num(m)} × ${num(n)} : 2 = ${num(S)} (cm²).`) },
    { cap: `Diện tích hình thoi bằng <b>tích độ dài hai đường chéo chia cho 2</b>: S = ${fr('m × n', 2)}`, result: `S = ${fr(`${num(m)} × ${num(n)}`, 2)} = ${num(S)} (cm²)` },
  ];
  const tri = (pts3, fill, stroke) => poly(pts3, { fill, stroke, w: 2 });
  const ORF = 'rgba(249,115,22,0.32)', GRF = 'rgba(22,163,74,0.28)', BASE = 'rgba(59,130,246,0.15)';
  return build('Diện tích hình thoi', steps, (k) => {
    const L = layer(k);
    let h = grid(u, O.x, O.y);
    h += poly([A, B, Cc], { fill: BASE, stroke: 'none', w: 0 });
    h += L(0, () => poly([A, Cc, D], { fill: BASE, stroke: 'none', w: 0 }), 1);
    h += L(1, (nw) => g(nw ? 'is-fade' : '', tri([A, O, D], ORF, C.orange)), 2);
    h += L(1, (nw) => g(nw ? 'is-fade' : '', tri([Cc, O, D], GRF, C.green)), 3);
    h += L(2, () => tri([A, O, D], 'none', C.soft).replace('stroke-width="2"', 'stroke-width="1.5" stroke-dasharray="5 4"'));
    h += L(3, () => tri([Cc, O, D], 'none', C.soft).replace('stroke-width="2"', 'stroke-width="1.5" stroke-dasharray="5 4"'));
    h += poly([A, B, Cc, D], { fill: 'none', stroke: k >= 2 ? C.soft : C.ink, w: k >= 2 ? 1.5 : 2.5 });
    h += seg(A, Cc, { color: C.violet, w: 2, dash: '6 4' }) + seg(B, D, { color: C.violet, w: 2, dash: '6 4' });
    h += L(2, (nw) => g(nw ? 'is-move' : '', tri([B, N, Cc], ORF, C.orange), nw ? `--dx:${-hm}px;--dy:${hn}px` : ''));
    h += L(3, (nw) => g(nw ? 'is-move' : '', tri([B, M, A], GRF, C.green), nw ? `--dx:${hm}px;--dy:${hn}px` : ''));
    h += L(4, (nw) => poly([A, M, N, Cc], { fill: 'none', stroke: C.green, w: 3.5, draw: nw }) + point(M, 'M', -12, -10, nw) + point(N, 'N', 12, -10, nw));
    h += lab(P((A.x + O.x) / 2, O.y), `m = ${num(m)}cm`, 0, -13, { size: 14, fill: C.violet });
    h += lab(P(O.x, (B.y + O.y) / 2), `n = ${num(n)}cm`, 6, 6, { size: 14, fill: C.violet, anchor: 'start' });
    h += dot(O, C.violet) + lab(O, 'O', 10, 12, { size: 14 });
    h += point(A, 'A', -13, 0) + point(B, 'B', 0, -13) + point(Cc, 'C', 13, 0) + point(D, 'D', 0, 14);
    return h;
  });
}

// ── Bài 54, 55, 91: Đề-xi-mét vuông, mét vuông, ki-lô-mét vuông ─────────────
const UNITS = {
  dm: { big: 'dm', bigName: 'đề-xi-mét vuông', side: '1dm', cell: '1cm', cellArea: '1cm²', per: 1, small: 'cm', cellLine: ['1 ô: 1cm²'] },
  m: { big: 'm', bigName: 'mét vuông', side: '1m', cell: '1dm', cellArea: '1dm²', per: 1, small: 'dm', cellLine: ['1 ô: 1dm²'] },
  km: { big: 'km', bigName: 'ki-lô-mét vuông', side: '1km = 1000m', cell: '100m', cellArea: '10 000m²', per: 10000, small: 'm', cellLine: ['1 ô: 100m × 100m', '= 10 000m²'] },
};
function areaUnit(spec) {
  const U = UNITS[spec.unit] || UNITS.dm;
  const x0 = 18, y0 = 14, S = 180, c = S / 10, px = 286;
  const total = 100 * U.per, km = U.per > 1;
  const steps = [
    { cap: `Hình vuông cạnh <b>${U.side.replace(' = 1000m', '')}</b> có diện tích là 1 ${U.bigName}, viết tắt là <b>1${U.big}²</b>.` },
    { cap: km ? 'Chia mỗi cạnh 1km thành 10 phần, mỗi phần 100m. Mỗi ô vuông nhỏ cạnh 100m có diện tích 100 × 100 = <b>10 000m²</b>.'
      : `Chia mỗi cạnh ${U.side} thành 10 phần, mỗi phần ${U.cell}. Mỗi ô vuông nhỏ cạnh ${U.cell} có diện tích <b>${U.cellArea}</b>.` },
    { cap: 'Một hàng có <b>10 ô</b> vuông nhỏ.' },
    { cap: 'Xếp đủ <b>10 hàng</b> như thế thì kín hình vuông lớn.' },
    { cap: km ? 'Hình vuông 1km² gồm 100 ô, mỗi ô 10 000m². Vậy 1km² bằng bao nhiêu m²?' : `1${U.big}² bằng bao nhiêu ${U.small}²?`,
      ask: { options: (km ? [10000, 100000, 1000000] : [10, 100, 1000]).map(v => (km ? fmt(v).replace(/ /g, ' ') : `${v}${U.small}²`)), answer: km ? 2 : 1,
        ok: km ? 'Đúng rồi! 100 × 10 000m² = <b>1 000 000m²</b>.' : `Đúng rồi! 10 hàng × 10 ô = 100 ô: <b>1${U.big}² = 100${U.small}²</b>.` } },
    { cap: km ? '<b>1km² = 1 000 000m²</b>.' : `Hình vuông 1${U.big}² gồm 100 hình vuông ${U.cellArea}: <b>1${U.big}² = 100${U.small}²</b>.`, result: `1${U.big}² = ${fmt(total)}${U.small}²` },
  ];
  return build(`${U.bigName[0].toUpperCase()}${U.bigName.slice(1)}`, steps, (k) => {
    const L = layer(k);
    let h = `<rect x="${x0}" y="${y0}" width="${S}" height="${S}" fill="#EFF6FF"/>`;
    const cell = (i, j, fill, stroke) => `<rect x="${x0 + i * c}" y="${y0 + j * c}" width="${c}" height="${c}" fill="${fill}" stroke="${stroke}" stroke-width="0.9"/>`;
    h += L(3, (n) => {
      let r = '';
      for (let j = 1; j < 10; j++) {
        let row = '';
        for (let i = 0; i < 10; i++) row += cell(i, j, C.orangeL, C.orange);
        r += g(n ? 'is-fade' : '', row, n ? `animation-delay:${0.09 * j}s` : '');
      }
      return r;
    });
    h += L(2, (n) => { let row = ''; for (let i = 1; i < 10; i++) row += cell(i, 0, C.orangeL, C.orange); return g(n ? 'is-grow' : '', row); });
    h += L(1, (n) => g(pop(n), cell(0, 0, '#FDBA74', '#C2410C')));
    h += L(1, (n) => {
      let t = '';
      for (let i = 1; i < 10; i++) t += `M${x0 + i * c} ${y0 - 5} V${y0 + 4} M${x0 - 5} ${y0 + i * c} H${x0 + 4} `;
      return `<path d="${t}" stroke="${C.blue}" stroke-width="1.5" class="${n ? 'is-fade' : ''}"/>`;
    });
    h += `<rect x="${x0}" y="${y0}" width="${S}" height="${S}" fill="none" stroke="${C.blue}" stroke-width="3"/>`;
    h += lab(P(x0 + S / 2, y0 + S), U.side, 0, 14, { size: 15, fill: C.blue });
    h += lab(P(px, 46), `1${U.big}²`, 0, 0, { size: 30, fill: C.blue });
    h += L(1, (n) => g(pop(n), U.cellLine.map((t, i) => lab(P(px, 88 + i * 20), t, 0, 0, { size: 15, fill: '#C2410C' })).join('')));
    const y2 = 88 + U.cellLine.length * 20 + 6;
    h += L(2, (n) => g(pop(n), lab(P(px, y2), '1 hàng: 10 ô', 0, 0, { size: 15, fill: '#C2410C' })));
    h += L(3, (n) => g(pop(n), lab(P(px, y2 + 26), '10 hàng: ? ô', 0, 0, { size: 15, fill: '#C2410C' })), 5);
    h += L(5, (n) => g(pop(n), lab(P(px, y2 + 26), '10 hàng: 100 ô', 0, 0, { size: 15, fill: C.green })));
    return h;
  });
}

export const GEO = { angles, perp, parallel, drawPerp, drawPar, drawRect, parallelogram, paraArea, rhombus, rhombusArea, areaUnit };
export const GEO_CSS = '';
