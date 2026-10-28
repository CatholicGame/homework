/**
 * 🔷 Tam giác, tứ giác, hình chữ nhật, hình vuông (Toán 3 KNTT Tập 1: Bài 19 "Hình tam giác, hình tứ giác. Hình chữ nhật,
 * hình vuông", Bài 20 "Thực hành vẽ hình vuông, hình chữ nhật"). Mỗi lượt là một hình mới trên giấy ô vuông 1 cm:
 *   cấp 1  gọi tên hình, đếm đỉnh, chạm từng cạnh, tìm góc đỉnh … và hai cạnh của góc;
 *   cấp 2  bốn hình tứ giác (có hình bình hành, hình thoi, hình thang, hình gần vuông): chạm hình nào thì ê ke kiểm tra
 *          4 góc, thước đo 4 cạnh ngay trên hình, rồi em xếp: hình vuông / hình chữ nhật / không phải;
 *   cấp 3  "Có bao nhiêu hình tam giác?": chạm các mảnh ghép thành một hình, hình tìm được ghi vào bảng đếm;
 *   cấp 4  vẽ trên lưới ô vuông: chạm các điểm còn thiếu, nét kẻ chạy theo, rồi thước và ê ke kiểm tra.
 * Mọi vùng (hình, cột bên phải, các dòng ghi) có chỗ từ đầu lượt, chỉ hiện dần, không xô gì.
 */

import { mountDrill, shake, flyDigit, calmMotion, fresh, sfx, sleep, how, TEACHER, INK, EDGE } from './kit.js';

const COL = {
  line: '#1E3A8A', fill: '#E0F2FE', side: '#F97316', ang: '#16A34A', vx: '#2563EB', ok: '#16A34A', bad: '#DC2626',
  sel: '#FDE68A', found: ['#F97316', '#16A34A', '#9333EA', '#DB2777', '#0891B2', '#CA8A04', '#DC2626', '#2563EB', '#65A30D', '#7C3AED'],
};

// ── Hình học (đơn vị: cm, y hướng xuống) ─────────────────────────────────────────────────────────────
const dist = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
const rot = ([x, y], a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
const unitV = (p, q) => { const d = dist(p, q) || 1; return [(q[0] - p[0]) / d, (q[1] - p[1]) / d]; };
const centroid = (P) => [P.reduce((s, p) => s + p[0], 0) / P.length, P.reduce((s, p) => s + p[1], 0) / P.length];

function angles(P) {
  return P.map((p, i) => {
    const a = P[(i + P.length - 1) % P.length], b = P[(i + 1) % P.length];
    const u = [a[0] - p[0], a[1] - p[1]], v = [b[0] - p[0], b[1] - p[1]];
    return Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))))) * 180 / Math.PI;
  });
}
const convex = (P) => {
  const s = P.map((p, i) => { const q = P[(i + 1) % P.length], r = P[(i + 2) % P.length]; return Math.sign((q[0] - p[0]) * (r[1] - q[1]) - (q[1] - p[1]) * (r[0] - q[0])); });
  return s.every(x => x === s[0]);
};

/** Cạnh dài nhất nằm ngang ở dưới, đỉnh theo chiều kim đồng hồ, đỉnh đầu ở trên (trên trái), khung bao từ (0, 0). */
function normalize(P) {
  let best = 0;
  P.forEach((p, i) => { if (dist(p, P[(i + 1) % P.length]) > dist(P[best], P[(best + 1) % P.length])) best = i; });
  const a = P[best], b = P[(best + 1) % P.length];
  let Q = P.map(p => rot([p[0] - a[0], p[1] - a[1]], -Math.atan2(b[1] - a[1], b[0] - a[0])));
  if (Q.some(p => p[1] > 1e-6)) Q = Q.map(([x, y]) => [-x, -y]);
  const minX = Math.min(...Q.map(p => p[0])), minY = Math.min(...Q.map(p => p[1]));
  Q = Q.map(([x, y]) => [x - minX, y - minY]);
  const area2 = Q.reduce((s, p, i) => { const q = Q[(i + 1) % Q.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0);
  if (area2 < 0) Q.reverse();
  const key = (p) => (Q.length === 3 ? p[1] : p[1] + p[0] * 0.35);
  let first = 0;
  Q.forEach((p, i) => { if (key(p) < key(Q[first]) - 1e-6) first = i; });
  return [...Q.slice(first), ...Q.slice(0, first)];
}
const bbox = (P) => ({ w: Math.max(...P.map(p => p[0])), h: Math.max(...P.map(p => p[1])) });

function makeTri(rng) {
  for (let t = 0; t < 300; t++) {
    const [c, b, a] = [rng.int(5, 10), rng.int(3, 9), rng.int(3, 9)];
    if (a + b <= c || a + c <= b || b + c <= a) continue;
    const x = (c * c + b * b - a * a) / (2 * c);
    const P = normalize([[0, 0], [c, 0], [x, -Math.sqrt(b * b - x * x)]]);
    const ang = angles(P), bb = bbox(P);
    if (Math.min(...ang) < 32 || Math.max(...ang) > 115 || Math.abs(Math.max(...ang) - 90) < 8 || bb.w > 10 || bb.h > 6.5 || bb.h < 3) continue;
    return P;
  }
  return normalize([[0, 0], [7, 0], [2, -5]]);
}

/** Tứ giác lồi "thường": không có góc gần vuông, các cạnh khác nhau (không ra hình chữ nhật, hình thoi). */
function makeQuad(rng) {
  const place = (d, s1, s2, up) => { const x = (d * d + s1 * s1 - s2 * s2) / (2 * d); const y = Math.sqrt(s1 * s1 - x * x); return [x, up ? -y : y]; };
  for (let t = 0; t < 800; t++) {
    const d = rng.int(6, 10), a = rng.int(3, 8), b = rng.int(3, 8), c = rng.int(3, 8), e = rng.int(3, 8);
    if (a + b <= d + 0.5 || c + e <= d + 0.5 || Math.abs(a - b) >= d || Math.abs(c - e) >= d) continue;
    const P = normalize([[0, 0], place(d, a, b, true), [d, 0], place(d, e, c, false)]);
    const ang = angles(P), bb = bbox(P);
    if (!convex(P) || Math.min(...ang) < 55 || Math.max(...ang) > 140 || ang.some(x => Math.abs(x - 90) < 9) || bb.w > 10 || bb.h > 6.5 || bb.h < 3.5) continue;
    const lens = P.map((p, i) => dist(p, P[(i + 1) % 4]));
    if (new Set(lens.map(Math.round)).size < 3) continue;
    return P;
  }
  return [[1, 0], [7, 0.8], [9, 5.5], [0, 4.5]];
}

/** Toạ độ SVG đẹp (bỏ số lẻ dài). */
const f2 = (v) => +v.toFixed(3);
const pts = (P) => P.map(p => `${f2(p[0])},${f2(p[1])}`).join(' ');

/** Nhãn đỉnh: đẩy ra ngoài theo hướng từ tâm hình. */
const vxPos = (p, c, off = 0.62) => { const dx = p[0] - c[0], dy = p[1] - c[1], l = Math.hypot(dx, dy) || 1; return [p[0] + dx / l * off, p[1] + dy / l * off]; };

/** Chỗ ghi độ dài cạnh i: giữa cạnh, đẩy ra ngoài hình đủ để chữ không đè lên nét. */
function sideLabel(P, i, text, fs = 0.58) {
  const p = P[i], q = P[(i + 1) % P.length];
  const [cx, cy] = centroid(P);
  let nx = q[1] - p[1], ny = p[0] - q[0];
  const l = Math.hypot(nx, ny);
  nx /= l; ny /= l;
  const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
  if (nx * (mx - cx) + ny * (my - cy) < 0) { nx = -nx; ny = -ny; }
  const off = 0.42 + Math.abs(nx) * text.length * fs * 0.27 + Math.abs(ny) * fs * 0.55;
  return { x: mx + nx * off, y: my + ny * off, nx, ny };
}

/** Lưới ô vuông 1 cm phủ kín khung. */
const gridDefs = (id) => `<defs><pattern id="g3sh-grid-${id}" width="1" height="1" patternUnits="userSpaceOnUse"><path d="M1 0 H0 V1" fill="none" stroke="#BFDBFE" stroke-width="0.04"/></pattern></defs>
  <rect x="-60" y="-60" width="160" height="140" fill="url(#g3sh-grid-${id})"/>`;

// ── Thước và ê ke (vẽ ngay trên hình) ─────────────────────────────────────────────────────────────────
const matrix = (P, u, v) => `matrix(${f2(u[0])} ${f2(u[1])} ${f2(v[0])} ${f2(v[1])} ${f2(P[0])} ${f2(P[1])})`;
const svgAdd = (g, html) => { g.insertAdjacentHTML('beforeend', html); return g.lastElementChild; };
const fadeOut = async (el) => { el.classList.add('g3sh-out'); await sleep(260); el.remove(); };

/**
 * Ê ke đặt ở đỉnh i: một cạnh góc vuông của ê ke nằm theo cạnh i → i+1. Góc vuông thì cạnh kia khớp (dấu ∟ xanh),
 * không vuông thì hở (dấu ✗ đỏ). Dấu ở lại trên hình (lớp `marks`). Trả về true nếu là góc vuông.
 */
async function ekeAt(tools, marks, P, i, size = 1.5) {
  const n = P.length, p = P[i], q = P[(i + 1) % n], r = P[(i + n - 1) % n];
  const u = unitV(p, q), w = unitV(p, r);
  let v = [-u[1], u[0]];
  if (v[0] * w[0] + v[1] * w[1] < 0) v = [-v[0], -v[1]];
  const right = Math.abs(angles(P)[i] - 90) < 1.5;
  const a = Math.min(size, dist(p, q) * 0.62), b = Math.min(size * 0.75, dist(p, r) * 0.62);
  const g = svgAdd(tools, `<g transform="${matrix(p, u, v)}"><g class="g3sh-in">
    <path d="M0 0 H${a} L0 ${b} Z" fill="#BAE6FD" fill-opacity="0.82" stroke="${INK}" stroke-width="0.05" stroke-linejoin="round"/>
    <path d="M${a * 0.32} ${b * 0.22} H${a * 0.55} L${a * 0.32} ${b * 0.45} Z" fill="#fff" stroke="${INK}" stroke-width="0.03"/></g></g>`);
  sfx.tick();
  await sleep(calmMotion() ? 520 : 400);
  if (right) {
    svgAdd(marks, `<g class="g3sh-pop"><path transform="${matrix(p, u, v)}" d="M0.42 0 V0.42 H0" fill="none" stroke="${COL.ok}" stroke-width="0.09"/></g>`);
    sfx.pop(3);
  } else {
    const k = 0.62, c = [p[0] + (u[0] + w[0]) * k, p[1] + (u[1] + w[1]) * k];
    svgAdd(marks, `<path class="g3sh-pop" d="M${f2(c[0] - 0.2)} ${f2(c[1] - 0.2)} l0.4 0.4 m0 -0.4 l-0.4 0.4" stroke="${COL.bad}" stroke-width="0.1" stroke-linecap="round"/>`);
    sfx.boing();
  }
  await sleep(220);
  fadeOut(g);
  return right;
}

/** Thước đặt dọc cạnh i (phía ngoài hình), đọc số đo, nhãn "5 cm" ở lại trên hình. */
async function rulerAt(tools, marks, P, i, cls = 'g3sh-len') {
  const n = P.length, p = P[i], q = P[(i + 1) % n];
  const L = dist(p, q), u = unitV(p, q);
  const [cx, cy] = centroid(P);
  let v = [-u[1], u[0]];
  const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
  if (v[0] * (mx - cx) + v[1] * (my - cy) < 0) v = [-v[0], -v[1]];
  const ticks = Array.from({ length: Math.floor(L + 1e-6) + 1 }, (_, k) => `M${k} 0.1 V0.36`).join(' ');
  const g = svgAdd(tools, `<g transform="${matrix(p, u, v)}"><g class="g3sh-in">
    <rect x="-0.25" y="0.08" width="${f2(L + 0.5)}" height="0.5" rx="0.08" fill="#FDE68A" stroke="${INK}" stroke-width="0.04"/>
    <path d="${ticks}" stroke="${INK}" stroke-width="0.04"/></g></g>`);
  sfx.tick();
  await sleep(calmMotion() ? 520 : 380);
  await fadeOut(g);
  const t = `${Math.round(L)} cm`;
  const lab = sideLabel(P, i, t);
  svgAdd(marks, `<text class="${cls} g3sh-pop" x="${f2(lab.x)}" y="${f2(lab.y)}" text-anchor="middle" dominant-baseline="central">${t}</text>`);
  sfx.pop(i + 2);
  await sleep(120);
  return Math.round(L);
}

/** viewBox theo đúng tỉ lệ khung: giấy ô vuông phủ kín, hình ở giữa. */
function fitFigure(zone, svg, bb, box) {
  const fit = () => {
    const zw = zone.clientWidth, zh = zone.clientHeight;
    if (!zw || !zh) return;
    const bw = Math.max(box[0], bb.x1 - bb.x0), bh = Math.max(box[1], bb.y1 - bb.y0);
    const r = zw / zh;
    const [W, H] = r > bw / bh ? [bh * r, bh] : [bw, bw / r];
    const cx = (bb.x0 + bb.x1) / 2, cy = (bb.y0 + bb.y1) / 2;
    svg.setAttribute('viewBox', `${cx - W / 2} ${cy - H / 2} ${W} ${H}`);
  };
  fit();
  new ResizeObserver(() => { if (zone.isConnected) fit(); }).observe(zone);
}

/** Cỡ chữ to nhất để khối các dòng ghi vừa khung (đo lại khi khung đổi cỡ, không đổi trong lượt). */
function fitLines(box, inner, cap) {
  const fit = () => {
    const w = box.clientWidth * 0.95, h = box.clientHeight * 0.92;
    if (w <= 0 || h <= 0) return;
    inner.style.fontSize = '100px';
    const fs = Math.min(100 * w / inner.scrollWidth, 100 * h / inner.scrollHeight, cap);
    inner.style.fontSize = `${Math.floor(fs)}px`;
  };
  fit();
  new ResizeObserver(() => { if (box.isConnected) fit(); }).observe(box);
}

/** Toạ độ lưới (cm) của một lần chạm trên SVG. */
function svgPoint(svg, e) {
  const m = svg.getScreenCTM();
  if (!m) return null;
  const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
  return [pt.x, pt.y];
}

// ── Đề ───────────────────────────────────────────────────────────────────────────────────────────────
const NAMES = { tri: ['ABC', 'MNP', 'DEG', 'HIK', 'PQR'], quad: ['ABCD', 'MNPQ', 'EGHI', 'DEGH', 'PQRS'] };
const ASK = { tri: 'hình tam giác', quad: 'hình tứ giác', rect: 'hình chữ nhật', sq: 'hình vuông' };

/** Cấp 2: các loại tứ giác vẽ trên lưới (đỉnh ở nút lưới, cạnh xiên dài đúng 5 cm theo bộ 3, 4, 5). */
function quadOf(rng, type) {
  const mirror = (P) => { const w = Math.max(...P.map(p => p[0])); return P.map(([x, y]) => [w - x, y]).reverse(); };
  let P, cat = 'other';
  if (type === 'sq') { const a = rng.int(2, 4); P = [[0, 0], [a, 0], [a, a], [0, a]]; cat = 'sq'; }
  else if (type === 'rect') {
    let w, h;
    do { w = rng.int(3, 7); h = rng.int(2, 4); } while (w - h < 2);
    P = [[0, 0], [w, 0], [w, h], [0, h]]; cat = 'rect';
  } else if (type === 'near') { // gần vuông: hai cạnh chỉ hơn kém 1 cm
    const h = rng.int(2, 3), w = h + 1;
    P = rng() < 0.5 ? [[0, 0], [w, 0], [w, h], [0, h]] : [[0, 0], [h, 0], [h, w], [0, w]]; cat = 'rect';
  } else if (type === 'para') {
    const b = rng.int(2, 4);
    P = rng() < 0.5 ? [[3, 0], [3 + b, 0], [b, 4], [0, 4]] : [[4, 0], [4 + b, 0], [b, 3], [0, 3]];
  } else if (type === 'rhomb') {
    P = [[3, 0], [8, 0], [5, 4], [0, 4]];
  } else if (type === 'trap') { // hình thang vuông: chỉ có 2 góc vuông
    const t = rng.int(2, 4);
    P = [[3, 0], [3 + t, 0], [3 + t, 4], [0, 4]];
  } else { // hình thang cân
    const t = rng.int(1, 2);
    P = [[3, 0], [3 + t, 0], [6 + t, 4], [0, 4]];
  }
  if (rng() < 0.5 && cat === 'other') P = mirror(P);
  return { type, cat, P };
}

function struct3(m) {
  // Trả về { pt: {tên: [x, y]}, lab: {tên: [dx, dy]}, segs: [[a, b]], pieces: [[tên đỉnh]], targets: [{ name, poly, pcs }] }
  const T = [];
  const add = (poly, pcs) => T.push({ name: poly.join(''), poly, pcs: [...pcs].sort((a, b) => a - b) });
  if (m.fig === 'fan') {
    const base = ['B', ...['M', 'N', 'P'].slice(0, m.k), 'C'];
    const xs = [0, ...m.xs, 8];
    const pt = { A: [m.ax, 0] }, lab = { A: [0, -0.62] };
    base.forEach((n, i) => { pt[n] = [xs[i], 5]; lab[n] = [i === 0 ? -0.45 : i === base.length - 1 ? 0.45 : 0, 0.62]; });
    const pieces = base.slice(0, -1).map((n, i) => ['A', n, base[i + 1]]);
    for (let i = 0; i < base.length; i++) for (let j = i + 1; j < base.length; j++) add(['A', base[i], base[j]], Array.from({ length: j - i }, (_, t) => i + t));
    return { pt, lab, segs: [['B', 'C'], ...base.map(n => ['A', n])], pieces, targets: T };
  }
  if (m.fig === 'strip') {
    const top = ['A', ...(m.k === 1 ? ['M'] : ['M', 'N']), 'B'], bot = ['D', ...(m.k === 1 ? ['N'] : ['Q', 'P']), 'C'];
    const xs = [0, ...m.xs, 8];
    const pt = {}, lab = {};
    top.forEach((n, i) => { pt[n] = [xs[i], 0]; lab[n] = [i === 0 ? -0.45 : i === top.length - 1 ? 0.45 : 0, -0.62]; });
    bot.forEach((n, i) => { pt[n] = [xs[i], 4]; lab[n] = [i === 0 ? -0.45 : i === bot.length - 1 ? 0.45 : 0, 0.62]; });
    const pieces = top.slice(0, -1).map((n, i) => [n, top[i + 1], bot[i + 1], bot[i]]);
    for (let i = 0; i < top.length; i++) for (let j = i + 1; j < top.length; j++) add([top[i], top[j], bot[j], bot[i]], Array.from({ length: j - i }, (_, t) => i + t));
    return { pt, lab, segs: [['A', 'B'], ['D', 'C'], ...top.map((n, i) => [n, bot[i]])], pieces, targets: T };
  }
  if (m.fig === 'grid') {
    const g = [['A', 'B', 'C'], ['D', 'E', 'G'], ['H', 'I', 'K']];
    const pt = {}, lab = {};
    g.forEach((row, y) => row.forEach((n, x) => {
      pt[n] = [x * 3, y * 3];
      lab[n] = x === 1 && y === 1 ? [0.42, -0.42] : [x === 0 ? -0.55 : x === 2 ? 0.55 : 0, y === 0 ? -0.55 : y === 2 ? 0.55 : (x === 1 ? 0 : 0)];
      if (x === 1 && y !== 1) lab[n] = [0, y === 0 ? -0.6 : 0.6];
      if (y === 1 && x !== 1) lab[n] = [x === 0 ? -0.6 : 0.6, 0];
    }));
    const sq = (x, y) => [g[y][x], g[y][x + 1], g[y + 1][x + 1], g[y + 1][x]];
    const pieces = [sq(0, 0), sq(1, 0), sq(0, 1), sq(1, 1)];
    pieces.forEach((p, i) => add(p, [i]));
    add(['A', 'C', 'K', 'H'], [0, 1, 2, 3]);
    return { pt, lab, segs: [['A', 'C'], ['D', 'G'], ['H', 'K'], ['A', 'H'], ['B', 'I'], ['C', 'K']], pieces, targets: T };
  }
  if (m.fig === 'diag') {
    const pt = { A: [0, 0], B: [8, 0], C: [8, 5], D: [0, 5], O: [4, 2.5] };
    const lab = { A: [-0.5, -0.45], B: [0.5, -0.45], C: [0.5, 0.45], D: [-0.5, 0.45], O: [0, 0.75] };
    const pieces = [['O', 'A', 'B'], ['O', 'B', 'C'], ['O', 'C', 'D'], ['O', 'D', 'A']];
    pieces.forEach((p, i) => add(p, [i]));
    add(['A', 'B', 'C'], [0, 1]); add(['B', 'C', 'D'], [1, 2]); add(['C', 'D', 'A'], [2, 3]); add(['D', 'A', 'B'], [3, 0]);
    return { pt, lab, segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'C'], ['B', 'D']], pieces, targets: T };
  }
  // cut: tam giác ABC, đường AH, đoạn MN song song với BC cắt AH ở I
  const ax = m.ax, hx = m.hx;
  const pt = { A: [ax, 0], B: [0, 6], C: [8, 6], H: [hx, 6], M: [ax / 2, 3], N: [(ax + 8) / 2, 3], I: [(ax + hx) / 2, 3] };
  const lab = { A: [0, -0.62], B: [-0.45, 0.55], C: [0.45, 0.55], H: [0, 0.65], M: [-0.6, 0], N: [0.6, 0], I: [hx < ax ? -0.45 : 0.45, -0.45] };
  const pieces = [['A', 'M', 'I'], ['A', 'I', 'N'], ['M', 'B', 'H', 'I'], ['I', 'H', 'C', 'N']];
  if (m.ask === 'tri') {
    add(['A', 'M', 'I'], [0]); add(['A', 'I', 'N'], [1]); add(['A', 'M', 'N'], [0, 1]);
    add(['A', 'B', 'H'], [0, 2]); add(['A', 'H', 'C'], [1, 3]); add(['A', 'B', 'C'], [0, 1, 2, 3]);
  } else {
    add(['M', 'B', 'H', 'I'], [2]); add(['I', 'H', 'C', 'N'], [3]); add(['M', 'B', 'C', 'N'], [2, 3]);
  }
  return { pt, lab, segs: [['A', 'B'], ['B', 'C'], ['C', 'A'], ['A', 'H'], ['M', 'N']], pieces, targets: T };
}

/** Hai số khác nhau trong [lo, hi], cách nhau ít nhất `gap` (chỗ chia đáy). */
function cuts(rng, k, lo, hi, gap) {
  for (;;) {
    const xs = rng.shuffle(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)).slice(0, k).sort((a, b) => a - b);
    if (xs.every((x, i) => !i || x - xs[i - 1] >= gap)) return xs;
  }
}

function gen(rng, lv, spec) {
  if (lv === 1) {
    const kind = spec;
    const name = rng.pick(NAMES[kind]);
    const P = kind === 'tri' ? makeTri(rng) : makeQuad(rng);
    return { lv, kind, name, P, ang: rng.int(0, P.length - 1) };
  }
  if (lv === 2) {
    const traps = rng.shuffle(spec === 'hard' ? ['rhomb', 'near', 'trap', 'para', 'iso'] : ['para', 'rhomb', 'trap', 'iso']);
    const types = rng.shuffle(['sq', 'rect', traps[0], traps[1]]);
    return { lv, cards: types.map(t => quadOf(rng, t)) };
  }
  if (lv === 3) {
    const [fig, k, ask] = spec;
    const m = { lv, fig, k, ask };
    if (fig === 'fan') { m.ax = rng.int(2, 6); m.xs = cuts(rng, k, 2, 6, 2); }
    if (fig === 'strip') m.xs = cuts(rng, k, 2, 6, 2);
    if (fig === 'cut') { m.ax = rng.pick([2, 4, 6]); do { m.hx = rng.pick([2, 4, 6]); } while (m.hx === m.ax); }
    return m;
  }
  // cấp 4: vẽ trên lưới. given = số đỉnh có sẵn (3: thêm D; 2: thêm C, D; 1: thêm B, C, D).
  const [sq, given] = spec;
  const w = sq ? rng.int(3, 5) : rng.int(4, 7);
  const h = sq ? w : rng.int(2, Math.min(4, w - 1));
  const dirs = [[1, 0], [0, 1]];
  for (let t = 0; t < 50; t++) {
    const u = rng.pick(given === 1 ? [[1, 0]] : dirs);
    const v = u[0] ? [0, rng.pick([1, -1])] : [rng.pick([1, -1]), 0];
    const A = [rng.int(1, 11), rng.int(1, 7)];
    const C4 = [A, [A[0] + u[0] * w, A[1] + u[1] * w], [A[0] + u[0] * w + v[0] * h, A[1] + u[1] * w + v[1] * h], [A[0] + v[0] * h, A[1] + v[1] * h]];
    if (C4.every(([x, y]) => x >= 1 && x <= 11 && y >= 1 && y <= 7)) return { lv, sq, w, h, given, corners: C4 };
  }
  return { lv, sq, w, h, given, corners: [[2, 2], [2 + w, 2], [2 + w, 2 + h], [2, 2 + h]] };
}

const LEVEL = (id, n, title, desc, knowledge, lessons, plan, ask, extra = {}) => ({
  id, n, title, desc, knowledge, lessons: { workbook: lessons }, missions: plan.length, ask: () => ask,
  gen: (rng, k) => gen(rng, n, plan[k % plan.length]),
  ...extra,
});

export const SHAPES_LEVELS = [
  LEVEL('drill-shape-1', 1, 'Đỉnh, cạnh, góc', 'Vd. Hình tứ giác MNPQ có 4 đỉnh M, N, P, Q; 4 cạnh MN, NP, PQ, QM.',
    'hình tam giác, hình tứ giác: đỉnh, cạnh, góc', ['bai-19'],
    ['tri', 'quad', 'tri', 'quad', 'quad'], 'Tìm đỉnh, cạnh, góc của hình!', { box: [7, 5] }),
  LEVEL('drill-shape-2', 2, 'Hình nào là hình chữ nhật, hình vuông?', 'Ê ke kiểm tra 4 góc vuông, thước đo các cạnh, rồi xếp từng hình.',
    'hình chữ nhật có 4 góc vuông, hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau; hình vuông có 4 góc vuông, 4 cạnh bằng nhau', ['bai-19'],
    ['easy', 'easy', 'hard', 'hard'], 'Dùng ê ke và thước để kiểm tra!'),
  LEVEL('drill-shape-3', 3, 'Đếm hình', 'Vd. Có bao nhiêu hình tam giác? Ghép các mảnh để tìm đủ từng hình.',
    'đếm hình tam giác, hình tứ giác, hình chữ nhật, hình vuông trong hình ghép', ['bai-19'],
    [['fan', 1, 'tri'], ['strip', 1, 'rect'], ['grid', 0, 'sq'], ['fan', 2, 'tri'], ['cut', 0, 'quad'], ['diag', 0, 'tri'], ['strip', 2, 'quad'], ['cut', 0, 'tri']],
    'Đếm cả hình nhỏ lẫn hình to, không bỏ sót!', { box: [10, 8] }),
  LEVEL('drill-shape-4', 4, 'Vẽ trên lưới ô vuông', 'Vd. Vẽ hình chữ nhật ABCD có chiều dài 5 cm, chiều rộng 3 cm.',
    'vẽ hình chữ nhật, hình vuông trên giấy ô vuông', ['bai-20'],
    [[false, 3], [true, 2], [false, 2], [true, 1], [false, 1]],
    'Kẻ theo đường kẻ của lưới, mỗi ô dài 1 cm!', { box: [13, 9] }),
];

let uid = 0;

export const SHAPES_GAME = {
  id: 'drill-shape', icon: '🔷', title: 'Tam giác, tứ giác, hình chữ nhật, hình vuông',
  purpose: 'Giúp em gọi tên hình tam giác, hình tứ giác cùng các đỉnh, cạnh, góc; dùng ê ke và thước nhận ra hình chữ nhật, hình vuông; đếm hình trong hình ghép và vẽ hình chữ nhật, hình vuông trên giấy ô vuông.',
  unitWord: 'bài', starPrefix: 'drill', npcs: [TEACHER], levels: SHAPES_LEVELS,
  stallIcon: () => '🔷',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> bài.`,
  againText: 'Làm lượt mới',
  howTo: how(['🔷', 'Nhìn hình'], ['👆', 'Chạm đỉnh, cạnh'], ['📐', 'Ê ke, thước'], ['✏️', 'Vẽ']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), (m) => JSON.stringify(m).replace(/(\d+\.\d{2})\d+/g, '$1'));
  },

  mountMission(stage, m, level, api) {
    const id = ++uid;
    const L = [null, lv1, lv2, lv3, lv4][m.lv](m, id);
    const board = `
      <div class="g3sh g3sh-L${m.lv}">
        <div class="g3sh-head">${L.head}</div>
        <div class="g3sh-fig">${L.fig}</div>
        <div class="g3sh-side">${L.side}</div>
        ${L.lines ? `<div class="g3sh-lines"><div class="g3sh-lg">${L.lines}</div></div>` : ''}
      </div>`;
    const drill = mountDrill(stage, { api, board, cls: 'g3sh-scene' });
    injectShapeStyles();
    const { paper } = drill;
    const svg = paper.querySelector('.g3sh-svg');
    if (svg) fitFigure(paper.querySelector('.g3sh-fig'), svg, L.bb, level.box || [10, 7]);
    if (L.lines) fitLines(paper.querySelector('.g3sh-lines'), paper.querySelector('.g3sh-lg'), 64);
    let mistakes = 0;
    let tip = '';
    const env = {
      ...drill, svg, m,
      wrong(el, text, shown, rule) { mistakes++; if (rule) tip ||= rule; if (el) shake(el); drill.hint(text, shown || text); },
      finish(ok) { setTimeout(() => drill.done(mistakes, { ok, tip: tip ? `Nhớ: ${tip}` : '' }), 300); },
    };
    const ctl = L.run(env);
    if (import.meta.env.DEV) window.__g3drill = { m, step: () => ctl.step(), wrong: () => ctl.wrong?.() };
  },
};

// ── Nút chọn to ở cột bên phải (thay nút mới mỗi bước: không sót màu, focus của bước trước) ─────────────
function buttons(paper, onPick) {
  const zone = paper.querySelector('.g3sh-choices');
  let btns = [...zone.querySelectorAll('.g3sh-btn')];
  return {
    set(list, enabled = true) {
      btns = btns.map((old, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = `g3g-btn g3d-choice g3sh-btn${list[i] ? '' : ' g3sh-btn-void'}`;
        b.disabled = !list[i] || !enabled;
        b.innerHTML = list[i] ?? '&nbsp;';
        b.onclick = () => { if (!b.disabled) { sfx.tap(); onPick(i, b); } };
        old.replaceWith(b);
        return b;
      });
      zone.style.setProperty('--n', Math.max(6, ...list.map(t => String(t || '').length)));
    },
    lock(chosen) { btns.forEach(x => { x.disabled = true; if (x !== chosen) x.classList.add('g3sh-btn-off'); }); chosen?.classList.add('g3d-choice-ok'); },
    get list() { return btns; },
  };
}
const choicesHtml = (n = 3) => `<div class="g3sh-choices">${Array.from({ length: n }, () => '<button type="button" class="g3g-btn g3d-choice g3sh-btn" disabled>&nbsp;</button>').join('')}</div>`;

// ═══ Cấp 1: đỉnh, cạnh, góc ═══════════════════════════════════════════════════════════════════════════
function lv1(m, id) {
  const P = m.P, n = P.length, N = m.name.split('');
  const c = centroid(P);
  const kindWord = n === 3 ? 'tam giác' : 'tứ giác';
  const sideName = (i) => N[i] + N[(i + 1) % n];
  let s = gridDefs(id);
  s += `<polygon points="${pts(P)}" fill="${COL.fill}" stroke="${COL.line}" stroke-width="0.09" stroke-linejoin="round"/>`;
  s += `<g class="g3sh-angle"></g>`;
  P.forEach((p, i) => {
    const q = P[(i + 1) % n];
    s += `<line class="g3sh-sd" data-sd="${i}" x1="${f2(p[0])}" y1="${f2(p[1])}" x2="${f2(q[0])}" y2="${f2(q[1])}" stroke-width="0.2" stroke-linecap="round"/>`;
    const lp = sideLabel(P, i, 'MN', 0.5);
    s += `<text class="g3sh-sdn" data-sdn="${i}" x="${f2(lp.x)}" y="${f2(lp.y)}" text-anchor="middle" dominant-baseline="central">${sideName(i)}</text>`;
    s += `<line class="g3sh-hit" data-hit="${i}" x1="${f2(p[0])}" y1="${f2(p[1])}" x2="${f2(q[0])}" y2="${f2(q[1])}"/>`;
  });
  P.forEach((p, i) => {
    const [lx, ly] = vxPos(p, c);
    s += `<circle class="g3sh-dot" data-dot="${i}" cx="${f2(p[0])}" cy="${f2(p[1])}" r="0.17"/>`;
    s += `<text class="g3sh-vx" data-vx="${i}" x="${f2(lx)}" y="${f2(ly)}" text-anchor="middle" dominant-baseline="central">${N[i]}</text>`;
    s += `<circle class="g3sh-vhit" data-vh="${i}" cx="${f2(p[0])}" cy="${f2(p[1])}" r="0.75"/>`;
  });
  const xs = P.map(p => p[0]), ys = P.map(p => p[1]);
  const slots = (k, w, cls) => Array.from({ length: k }, (_, i) => `<span class="g3sh-ls ${cls}" data-${cls}="${i}" style="min-width:${w}em">&nbsp;</span>`).join('<span class="g3sh-cm">,</span>');
  const lines = `
    <div class="g3sh-ln" data-ln="0">Hình <span class="g3sh-slot" data-kind style="min-width:3.6em">…</span> ${m.name} có:</div>
    <div class="g3sh-ln g3sh-hide" data-ln="1"><span class="g3d-box" data-cnt="v" style="--boxw:1.5em"></span> đỉnh: ${slots(n, 0.8, 'lv')}.</div>
    <div class="g3sh-ln g3sh-hide" data-ln="2"><span class="g3d-box" data-cnt="s" style="--boxw:1.5em"></span> cạnh: ${slots(n, 1.5, 'ls')}.</div>
    <div class="g3sh-ln g3sh-hide" data-ln="3">Góc đỉnh <span class="g3sh-ls" data-la style="min-width:0.8em">&nbsp;</span>; cạnh ${slots(2, 1.5, 'lg')}.</div>`;
  return {
    head: `Quan sát hình ${m.name}.`,
    fig: `<svg class="g3sh-svg" viewBox="0 0 10 10" preserveAspectRatio="xMidYMid meet">${s}</svg>`,
    side: choicesHtml(3),
    lines,
    bb: { x0: Math.min(...xs) - 1.3, y0: Math.min(...ys) - 1.2, x1: Math.max(...xs) + 1.3, y1: Math.max(...ys) + 1.2 },
    run(env) {
      const { paper, svg, say, show, pad } = env;
      const q = (sel) => paper.querySelector(sel);
      const qa = (sel) => [...paper.querySelectorAll(sel)];
      let stepNow = 'kind';
      const opts = ['Hình tam giác', 'Hình tứ giác', 'Hình chữ nhật'];
      const right = n === 3 ? 0 : 1;
      const tapped = new Set();
      const angSides = [(m.ang + n - 1) % n, m.ang]; // hai cạnh đi qua đỉnh góc
      const angPicked = new Set();
      const B = buttons(paper, async (i, b) => {
        if (stepNow !== 'kind') return;
        if (i !== right) {
          if (i === 2) env.wrong(b, 'Hình chữ nhật có 4 góc vuông. Hình này không có góc vuông nào.', '', 'Hình có 3 cạnh là hình tam giác, hình có 4 cạnh là hình tứ giác.');
          else env.wrong(b, `Đếm số cạnh: hình có 3 cạnh là hình tam giác, có 4 cạnh là hình tứ giác.`, '', 'Hình có 3 cạnh là hình tam giác, hình có 4 cạnh là hình tứ giác.');
          return;
        }
        stepNow = 'busy';
        B.lock(b);
        const slot = q('[data-kind]');
        await sleep(flyDigit(kindWord, b, slot, { onLand: () => { slot.textContent = kindWord; slot.classList.add('g3sh-slot-done'); sfx.pop(2); } }) + 150);
        stepVerts();
      });
      B.set(opts);
      say(`Hình ${m.name} là hình gì?`, `👆 Hình ${m.name} là <b>hình gì</b>?`);

      function stepVerts() {
        stepNow = 'verts';
        q('[data-ln="1"]').classList.remove('g3sh-hide');
        const box = q('[data-cnt="v"]');
        box.classList.add('g3d-on');
        say(`Hình ${kindWord} ${m.name} có mấy đỉnh?`, `Hình ${kindWord} ${m.name} có <b>mấy đỉnh</b>?`);
        const want = {
          max: 1, onType: (t) => { box.textContent = t; },
          onSubmit: (t) => {
            if (+t !== n) {
              box.textContent = '';
              qa('.g3sh-dot').forEach(d => d.classList.add('g3sh-blink'));
              env.wrong(box, `Đỉnh là chỗ hai cạnh gặp nhau, có ghi một chữ in hoa. Đếm các chữ quanh hình.`, '', `Hình ${kindWord} có ${n} đỉnh, ${n} cạnh.`);
              pad.want(want);
              return;
            }
            pad.off();
            box.classList.remove('g3d-on');
            box.classList.add('g3d-box-ok');
            qa('.g3sh-dot').forEach(d => d.classList.remove('g3sh-blink'));
            stepNow = 'busy';
            namesFly();
          },
        };
        pad.want(want);
      }
      async function namesFly() {
        show(`${n} đỉnh: <b>${N.join(', ')}</b>.`);
        for (let i = 0; i < n; i++) {
          const dot = q(`[data-dot="${i}"]`), vx = q(`[data-vx="${i}"]`), slot = q(`[data-lv="${i}"]`);
          dot.classList.add('g3sh-dot-on');
          await sleep(flyDigit(N[i], vx, slot, { minMs: 320, maxMs: 520, onLand: () => { slot.textContent = N[i]; sfx.pop(i + 2); } }) + 80);
        }
        stepSides();
      }
      function stepSides() {
        stepNow = 'sides';
        q('[data-ln="2"]').classList.remove('g3sh-hide');
        q('[data-cnt="s"]').classList.add('g3d-on');
        svg.classList.add('g3sh-pick-sd');
        say('Chạm vào từng cạnh của hình.', '👆 Chạm vào <b>từng cạnh</b> của hình.');
      }
      async function tapSide(i) {
        if (stepNow === 'sides') {
          if (tapped.has(i)) return;
          tapped.add(i);
          q(`[data-sd="${i}"]`).classList.add('g3sh-sd-on');
          const nm = q(`[data-sdn="${i}"]`), slot = q(`[data-ls="${i}"]`);
          nm.classList.add('g3sh-sdn-on');
          sfx.pop(tapped.size + 1);
          const box = q('[data-cnt="s"]');
          box.textContent = tapped.size;
          flyDigit(sideName(i), nm, slot, { minMs: 320, maxMs: 520, onLand: () => { slot.textContent = sideName(i); } });
          if (tapped.size < n) { show(`Cạnh <b>${sideName(i)}</b>. Còn ${n - tapped.size} cạnh.`); return; }
          stepNow = 'busy';
          svg.classList.remove('g3sh-pick-sd');
          box.classList.remove('g3d-on');
          box.classList.add('g3d-box-ok');
          await sleep(700);
          stepAngle();
        } else if (stepNow === 'angSides') {
          if (angPicked.has(i)) return;
          const hit = q(`[data-sd="${i}"]`);
          if (!angSides.includes(i)) {
            env.wrong(hit, `Cạnh ${sideName(i)} không đi qua đỉnh ${N[m.ang]}. Hai cạnh của góc đều đi ra từ đỉnh ${N[m.ang]}.`, '', 'Góc có một đỉnh và hai cạnh đi ra từ đỉnh đó.');
            return;
          }
          angPicked.add(i);
          hit.classList.add('g3sh-sd-ang');
          const k = angPicked.size - 1;
          const other = i === m.ang ? N[(i + 1) % n] : N[i];
          const nmText = N[m.ang] + other;
          const slot = q(`[data-lg="${k}"]`);
          sfx.pop(k + 3);
          await sleep(flyDigit(nmText, q(`[data-sdn="${i}"]`), slot, { minMs: 320, maxMs: 520, onLand: () => { slot.textContent = nmText; } }));
          if (angPicked.size === 2) {
            stepNow = 'done';
            svg.classList.remove('g3sh-pick-sd');
            const others = angSides.map(j => (j === m.ang ? N[(j + 1) % n] : N[j])).sort((a, b) => N.indexOf(a) - N.indexOf(b));
            env.finish(`Hình ${kindWord} ${m.name} có ${n} đỉnh, ${n} cạnh. Góc đỉnh ${N[m.ang]}, cạnh ${N[m.ang]}${others[0]}, ${N[m.ang]}${others[1]}.`);
          }
        }
      }
      function stepAngle() {
        stepNow = 'angle';
        q('[data-ln="3"]').classList.remove('g3sh-hide');
        qa('.g3sh-sd-on').forEach(x => x.classList.remove('g3sh-sd-on'));
        qa('.g3sh-sdn-on').forEach(x => x.classList.remove('g3sh-sdn-on'));
        svg.classList.add('g3sh-pick-vx');
        say(`Chạm vào góc đỉnh ${N[m.ang]}.`, `👆 Chạm vào <b>góc đỉnh ${N[m.ang]}</b>.`);
      }
      async function tapVertex(i) {
        if (stepNow !== 'angle') return;
        if (i !== m.ang) {
          env.wrong(q(`[data-vx="${i}"]`), `Đây là đỉnh ${N[i]}. Tìm chữ ${N[m.ang]}.`, '', 'Góc đỉnh A là góc ở chỗ có chữ A.');
          return;
        }
        stepNow = 'busy';
        svg.classList.remove('g3sh-pick-vx');
        const p = P[i], a = P[(i + 1) % n], b = P[(i + n - 1) % n];
        const r = 0.9, u = unitV(p, a), w = unitV(p, b);
        const s1 = [p[0] + u[0] * r, p[1] + u[1] * r], s2 = [p[0] + w[0] * r, p[1] + w[1] * r];
        const cross = u[0] * w[1] - u[1] * w[0];
        svgAdd(q('.g3sh-angle'), `<path class="g3sh-arc" d="M${f2(p[0])} ${f2(p[1])} L${f2(s1[0])} ${f2(s1[1])} A${r} ${r} 0 0 ${cross > 0 ? 1 : 0} ${f2(s2[0])} ${f2(s2[1])} Z" pathLength="1"/>`);
        q(`[data-vx="${i}"]`).classList.add('g3sh-vx-on');
        sfx.ding();
        const slot = q('[data-la]');
        await sleep(flyDigit(N[i], q(`[data-vx="${i}"]`), slot, { onLand: () => { slot.textContent = N[i]; sfx.pop(3); } }) + 200);
        stepNow = 'angSides';
        svg.classList.add('g3sh-pick-sd');
        say(`Góc đỉnh ${N[i]} có hai cạnh nào? Chạm vào hai cạnh đó.`, `👆 Góc đỉnh ${N[i]}: chạm vào <b>hai cạnh</b> của góc.`);
      }
      svg.addEventListener('click', (e) => {
        const h = e.target.closest('[data-hit]');
        if (h) { tapSide(+h.dataset.hit); return; }
        const v = e.target.closest('[data-vh]');
        if (v) tapVertex(+v.dataset.vh);
      });
      return {
        step() {
          if (stepNow === 'kind') B.list[right].click();
          else if (stepNow === 'verts') pad.type(String(n));
          else if (stepNow === 'sides') tapSide([...Array(n).keys()].find(i => !tapped.has(i)));
          else if (stepNow === 'angle') tapVertex(m.ang);
          else if (stepNow === 'angSides') tapSide(angSides.find(i => !angPicked.has(i)));
        },
        wrong() { if (stepNow === 'kind') B.list[2].click(); else if (stepNow === 'verts') pad.type(String(n + 1)); else if (stepNow === 'angle') tapVertex((m.ang + 1) % n); },
      };
    },
  };
}

// ═══ Cấp 2: hình nào là hình chữ nhật, hình vuông ═════════════════════════════════════════════════════
const CAT = { sq: 'Hình vuông', rect: 'Hình chữ nhật', other: 'Không phải' };
const CATS = ['sq', 'rect', 'other'];
function lv2(m, id) {
  const VB = [-1.6, -1.3, 11.2, 8.4]; // khung chung cho cả bốn hình: cùng cỡ 1 cm, so được to nhỏ
  const cards = m.cards.map((cd, i) => {
    const b = bbox(cd.P);
    const ox = Math.floor((8 - b.w) / 2), oy = Math.floor((5 - b.h) / 2);
    const P = cd.P.map(([x, y]) => [x + ox, y + oy]);
    cd.Q = P;
    return `<button type="button" class="g3sh-card" data-c="${i}">
      <svg class="g3sh-csvg" viewBox="${VB.join(' ')}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        ${i === 0 ? `<defs><pattern id="g3sh-cg-${id}" width="1" height="1" patternUnits="userSpaceOnUse"><path d="M1 0 H0 V1" fill="none" stroke="#BFDBFE" stroke-width="0.05"/></pattern></defs>` : ''}
        <rect x="-5" y="-5" width="30" height="20" fill="url(#g3sh-cg-${id})"/>
        <polygon class="g3sh-cpoly" points="${pts(P)}" stroke-width="0.11" stroke-linejoin="round"/>
        <g class="g3sh-marks"></g><g class="g3sh-tools"></g>
      </svg>
      <span class="g3sh-cn">${i + 1}</span>
      <span class="g3sh-badge">&nbsp;</span>
    </button>`;
  }).join('');
  const lines = `
    <div class="g3sh-ln">Hình vuông: <span class="g3sh-list" data-list="sq" style="min-width:3.2em">&nbsp;</span></div>
    <div class="g3sh-ln">Hình chữ nhật: <span class="g3sh-list" data-list="rect" style="min-width:3.2em">&nbsp;</span></div>`;
  return {
    head: 'Hình nào là hình vuông, hình nào là hình chữ nhật?',
    fig: `<div class="g3sh-cards">${cards}</div>`,
    side: choicesHtml(3),
    lines,
    run(env) {
      const { paper, say, show } = env;
      const cardEls = [...paper.querySelectorAll('.g3sh-card')];
      const info = m.cards.map(() => null); // sau khi đo: { right: số góc vuông, lens }
      const sorted = new Set();
      const lists = { sq: [], rect: [] };
      let cur = -1;
      let stepNow = 'pick';
      const B = buttons(paper, (i, b) => pickCat(i, b));
      B.set(CATS.map(k => CAT[k]), false);
      say('Chạm vào một hình để kiểm tra bằng ê ke và thước.', '👆 Chạm vào <b>một hình</b> để kiểm tra.');

      cardEls.forEach((el, i) => { el.onclick = () => tapCard(i); });
      async function tapCard(i) {
        if (sorted.has(i)) return;
        if (stepNow === 'sort') {
          if (i === cur) return;
          const c = cardEls[cur];
          c.classList.remove('g3sh-nudge'); void c.offsetWidth; c.classList.add('g3sh-nudge');
          sfx.boing();
          show(`👉 Xếp <b>hình ${cur + 1}</b> trước đã.`);
          return;
        }
        if (stepNow !== 'pick') return;
        stepNow = 'busy';
        cur = i;
        sfx.tap();
        cardEls.forEach((c, k) => c.classList.toggle('g3sh-card-cur', k === i));
        const sv = cardEls[i].querySelector('svg');
        const tools = sv.querySelector('.g3sh-tools'), marks = sv.querySelector('.g3sh-marks');
        const P = m.cards[i].Q;
        say('Ê ke kiểm tra từng góc.', '📐 <b>Ê ke</b> kiểm tra từng góc.');
        let right = 0;
        for (let k = 0; k < 4; k++) if (await ekeAt(tools, marks, P, k, 1.6)) right++;
        say('Thước đo từng cạnh.', '📏 <b>Thước</b> đo từng cạnh.');
        const lens = [];
        for (let k = 0; k < 4; k++) lens.push(await rulerAt(tools, marks, P, k));
        info[i] = { right, lens };
        stepNow = 'sort';
        B.set(CATS.map(k => CAT[k]));
        const rTxt = right === 4 ? '4 góc vuông' : right ? `chỉ ${right} góc vuông` : 'không có góc vuông';
        say(`Hình ${i + 1} có ${rTxt}. Hình ${i + 1} là hình gì?`, `Hình ${i + 1}: <b>${rTxt}</b>. Xếp vào nhóm nào?`);
      }
      async function pickCat(k, b) {
        if (stepNow !== 'sort') return;
        const cd = m.cards[cur], inf = info[cur], want = cd.cat, got = CATS[k];
        const lensTxt = [...new Set(inf.lens)].map(x => `${x} cm`).join(' và ');
        const rule = 'Hình chữ nhật có 4 góc vuông, hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau. Hình vuông có 4 góc vuông và 4 cạnh bằng nhau.';
        if (got !== want) {
          let t;
          if (want === 'other') t = inf.right ? `Hình ${cur + 1} chỉ có ${inf.right} góc vuông. Hình chữ nhật, hình vuông phải có đủ 4 góc vuông.` : `Ê ke không khớp góc nào: hình ${cur + 1} không có góc vuông. Hình chữ nhật, hình vuông có 4 góc vuông.`;
          else if (want === 'rect' && got === 'sq') t = `Các cạnh dài ${lensTxt}, không bằng nhau. Hình vuông có 4 cạnh bằng nhau.`;
          else if (want === 'sq' && got === 'rect') t = `Hình ${cur + 1} có 4 góc vuông và 4 cạnh đều dài ${inf.lens[0]} cm: đó là hình vuông.`;
          else t = `Ê ke khớp cả 4 góc: hình ${cur + 1} có 4 góc vuông.`;
          env.wrong(b, t, '', rule);
          return;
        }
        stepNow = 'busy';
        B.lock(b);
        const card = cardEls[cur], badge = card.querySelector('.g3sh-badge');
        await sleep(flyDigit(CAT[want], b, badge, { onLand: () => { badge.textContent = CAT[want]; card.classList.add(`g3sh-card-${want}`); sfx.pop(4); } }) + 100);
        if (want !== 'other') {
          lists[want].push(cur + 1);
          const el = paper.querySelector(`[data-list="${want}"]`);
          el.textContent = `hình ${lists[want].join(', ')}`;
          el.classList.add('g3sh-list-on');
        }
        sorted.add(cur);
        card.classList.remove('g3sh-card-cur');
        card.classList.add('g3sh-card-done');
        cur = -1;
        if (sorted.size === m.cards.length) {
          stepNow = 'done';
          B.set(CATS.map(x => CAT[x]), false);
          env.finish(`Hình vuông: hình ${lists.sq.join(', ')}. Hình chữ nhật: hình ${lists.rect.join(', ')}.`);
          return;
        }
        await sleep(250);
        stepNow = 'pick';
        B.set(CATS.map(x => CAT[x]), false);
        say('Chạm vào hình tiếp theo.', '👆 Chạm vào <b>hình tiếp theo</b>.');
      }
      return {
        step() {
          if (stepNow === 'pick') tapCard([...m.cards.keys()].find(i => !sorted.has(i)));
          else if (stepNow === 'sort') B.list[CATS.indexOf(m.cards[cur].cat)].click();
        },
        wrong() { if (stepNow === 'sort') B.list[(CATS.indexOf(m.cards[cur].cat) + 1) % 3].click(); },
      };
    },
  };
}

// ═══ Cấp 3: đếm hình ══════════════════════════════════════════════════════════════════════════════════
function lv3(m, id) {
  const S = struct3(m);
  const ask = ASK[m.ask];
  let s = gridDefs(id);
  S.pieces.forEach((pc, i) => { s += `<polygon class="g3sh-pc" data-p="${i}" points="${pts(pc.map(n => S.pt[n]))}"/>`; });
  s += '<g class="g3sh-found"></g>';
  S.segs.forEach(([a, b]) => { s += `<line class="g3sh-seg" x1="${S.pt[a][0]}" y1="${S.pt[a][1]}" x2="${S.pt[b][0]}" y2="${S.pt[b][1]}"/>`; });
  Object.entries(S.pt).forEach(([n, p]) => {
    s += `<circle class="g3sh-dot g3sh-dot-on" cx="${p[0]}" cy="${p[1]}" r="0.13"/>`;
    s += `<text class="g3sh-vx" x="${f2(p[0] + S.lab[n][0])}" y="${f2(p[1] + S.lab[n][1])}" text-anchor="middle" dominant-baseline="central">${n}</text>`;
  });
  const all = Object.values(S.pt);
  const xs = all.map(p => p[0]), ys = all.map(p => p[1]);
  const SLOTS = 8;
  return {
    head: `Có bao nhiêu <b>${ask}</b>?`,
    fig: `<svg class="g3sh-svg" viewBox="0 0 10 10" preserveAspectRatio="xMidYMid meet">${s}</svg>`,
    side: `<div class="g3sh-tally"><div class="g3sh-tally-top"><span>Đã tìm</span><b data-found>0</b></div>
        <div class="g3sh-chips">${Array.from({ length: SLOTS }, (_, i) => `<span class="g3sh-chip" data-chip="${i}">&nbsp;</span>`).join('')}</div></div>
      <button type="button" class="g3g-btn g3d-choice g3sh-enough" data-enough>Hết rồi!</button>`,
    lines: `<div class="g3sh-ln">Có <span class="g3d-box" data-ans style="--boxw:1.6em"></span> ${ask}.</div>`,
    bb: { x0: Math.min(...xs) - 1.1, y0: Math.min(...ys) - 1.1, x1: Math.max(...xs) + 1.1, y1: Math.max(...ys) + 1.1 },
    run(env) {
      const { paper, svg, say, show } = env;
      const q = (sel) => paper.querySelector(sel);
      const key = (arr) => [...arr].sort((a, b) => a - b).join(',');
      const byKey = new Map(S.targets.map(t => [key(t.pcs), t]));
      const found = [];
      let sel = new Set();
      let stepNow = 'find';
      const foundG = q('.g3sh-found');
      const enough = q('[data-enough]');
      say(`Có bao nhiêu ${ask}? Chạm vào các mảnh để ghép thành một ${ask}.`, `👆 Chạm các mảnh ghép thành <b>một ${ask}</b>.`);

      const paintSel = () => svg.querySelectorAll('.g3sh-pc').forEach(el => el.classList.toggle('g3sh-pc-sel', sel.has(+el.dataset.p)));
      const outline = (t, color, cls = '') => svgAdd(foundG, `<polygon class="g3sh-fpoly ${cls}" points="${pts(t.poly.map(n => S.pt[n]))}" stroke="${color}" fill="${color}"/>`);

      async function register(t) {
        const idx = found.length;
        found.push(t);
        const color = COL.found[idx % COL.found.length];
        foundG.innerHTML = '';
        const o = outline(t, color, 'g3sh-fpoly-new');
        q('[data-found]').textContent = found.length;
        const chip = q(`[data-chip="${idx}"]`);
        sfx.ding();
        show(`Tìm được <b>${ask} ${t.name}</b>!`);
        flyDigit(t.name, o, chip, { minMs: 380, maxMs: 600, onLand: () => { chip.textContent = t.name; chip.style.setProperty('--c', color); chip.classList.add('g3sh-chip-on'); sfx.pop(idx % 8); } });
        if (found.length === S.targets.length) {
          stepNow = 'busy';
          await sleep(900);
          recap();
        }
      }
      function tapPiece(p) {
        if (stepNow !== 'find') return;
        sfx.tap();
        if (sel.has(p)) sel.delete(p); else sel.add(p);
        const k = key(sel);
        if (sel.size && !S.targets.some(t => [...sel].every(x => t.pcs.includes(x)))) sel = new Set([p]);
        paintSel();
        const t = byKey.get(key(sel));
        if (!t) { if (sel.size) show(`Đang chọn ${sel.size} mảnh.`); return; }
        if (found.includes(t)) { show(`<b>${t.name}</b>: em tìm rồi. Chạm thêm mảnh để ghép hình to hơn.`); return; }
        register(t);
      }
      enough.onclick = () => {
        if (stepNow !== 'find') return;
        sfx.tap();
        const miss = S.targets.filter(t => !found.includes(t));
        if (!miss.length) return;
        const c = Math.min(...miss.map(t => t.pcs.length));
        env.wrong(enough, c === 1
          ? `Chưa hết đâu, còn ${miss.length} ${ask} nữa. Mỗi mảnh nhỏ cũng là một hình.`
          : `Chưa hết đâu, còn ${miss.length} ${ask} nữa. Thử ghép ${c} mảnh liền nhau.`, '', 'Đếm hình đơn trước, rồi ghép 2 mảnh, 3 mảnh… thành hình to hơn.');
      };
      svg.addEventListener('click', (e) => { const el = e.target.closest('[data-p]'); if (el) tapPiece(+el.dataset.p); });

      async function recap() {
        sel = new Set(); paintSel();
        enough.disabled = true;
        say(`Cùng đếm lại các ${ask}!`, `Đếm lại từng ${ask}.`);
        const order = [...found].sort((a, b) => a.pcs.length - b.pcs.length || S.targets.indexOf(a) - S.targets.indexOf(b));
        const gap = calmMotion() ? 700 : 520;
        for (let i = 0; i < order.length; i++) {
          foundG.innerHTML = '';
          const t = order[i], color = COL.found[found.indexOf(t) % COL.found.length];
          outline(t, color, 'g3sh-fpoly-new');
          const [cx, cy] = centroid(t.poly.map(n => S.pt[n]));
          svgAdd(foundG, `<g class="g3sh-pop"><circle cx="${f2(cx)}" cy="${f2(cy)}" r="0.5" fill="#fff" stroke="${color}" stroke-width="0.08"/><text class="g3sh-num" x="${f2(cx)}" y="${f2(cy)}" text-anchor="middle" dominant-baseline="central" fill="${color}">${i + 1}</text></g>`);
          sfx.pop(i % 8);
          await sleep(gap);
        }
        foundG.innerHTML = '';
        const box = q('[data-ans]');
        await sleep(flyDigit(String(found.length), q('[data-found]'), box, { onLand: () => { box.textContent = found.length; box.classList.add('g3d-box-ok'); sfx.pop(5); } }) + 200);
        stepNow = 'done';
        env.finish(`Có ${found.length} ${ask}: ${order.map(t => t.name).join(', ')}.`);
      }
      return {
        wrong() { enough.click(); },
        step() {
          if (stepNow !== 'find') return;
          const t = S.targets.find(x => !found.includes(x));
          sel = new Set(t.pcs);
          paintSel();
          register(t);
        },
      };
    },
  };
}

// ═══ Cấp 4: vẽ trên lưới ô vuông ═════════════════════════════════════════════════════════════════════
function lv4(m, id) {
  const V = ['A', 'B', 'C', 'D'];
  const what = m.sq ? 'hình vuông' : 'hình chữ nhật';
  const len = [m.w, m.h, m.w, m.h];
  const sideN = (i) => V[i] + V[(i + 1) % 4];
  let s = gridDefs(id);
  s += `<rect x="0" y="0" width="12" height="8" fill="none" stroke="#93C5FD" stroke-width="0.05"/>`;
  s += `<polygon class="g3sh-dfill" points="" />`;
  s += '<g class="g3sh-dlines"></g><g class="g3sh-marks"></g><g class="g3sh-tools"></g><g class="g3sh-dpts"></g>';
  s += '<circle class="g3sh-ghost" r="0.3" cx="-9" cy="-9"/>';
  const head = m.sq
    ? `Vẽ hình vuông ABCD có cạnh ${m.w} cm.`
    : `Vẽ hình chữ nhật ABCD có chiều dài ${m.w} cm, chiều rộng ${m.h} cm.`;
  const rows = V.map((_, i) => `<div class="g3sh-row" data-row="${i}"><b>${sideN(i)}</b><span>${len[i]} cm</span><i data-st="${i}">&nbsp;</i></div>`).join('');
  return {
    head,
    fig: `<svg class="g3sh-svg g3sh-draw" viewBox="0 0 13 9" preserveAspectRatio="xMidYMid meet">${s}</svg>`,
    side: `<div class="g3sh-plan"><div class="g3sh-plan-h">1 ô = 1 cm</div>${rows}<div class="g3sh-row" data-row="4"><b>∟</b><span>4 góc vuông</span><i data-st="4">&nbsp;</i></div></div>`,
    lines: '',
    bb: { x0: -0.6, y0: -0.6, x1: 12.6, y1: 8.6 },
    run(env) {
      const { paper, svg, say, show } = env;
      const q = (sel) => paper.querySelector(sel);
      const lineG = q('.g3sh-dlines'), ptG = q('.g3sh-dpts'), tools = q('.g3sh-tools'), marks = q('.g3sh-marks');
      const fillEl = q('.g3sh-dfill');
      const P = [];
      let stepNow = 'busy';
      const rule = m.sq ? 'Hình vuông có 4 góc vuông và 4 cạnh bằng nhau.' : 'Hình chữ nhật có 4 góc vuông, hai chiều dài bằng nhau, hai chiều rộng bằng nhau.';
      const ptLabel = (p, i) => {
        // Chữ đặt ra ngoài hình: theo hướng từ tâm hình chữ nhật đáp án tới đỉnh.
        const c = centroid(m.corners);
        const dx = Math.sign(p[0] - c[0]) || -1, dy = Math.sign(p[1] - c[1]) || -1;
        return [p[0] + dx * 0.45, p[1] + dy * 0.48 + 0.02 * i];
      };
      const addPoint = (p, i, anim) => {
        const [lx, ly] = ptLabel(p, i);
        svgAdd(ptG, `<g class="${anim ? 'g3sh-pop' : ''}"><circle class="g3sh-dot g3sh-dot-on" cx="${p[0]}" cy="${p[1]}" r="0.17"/><text class="g3sh-vx" x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="central">${V[i]}</text></g>`);
      };
      const addLine = (a, b, anim) => svgAdd(lineG, `<line class="g3sh-dl${anim ? ' g3sh-dl-in' : ''}" pathLength="1" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`);
      const rowOk = (i) => { const st = q(`[data-st="${i}"]`); st.textContent = '✓'; q(`[data-row="${i}"]`).classList.add('g3sh-row-ok'); };

      for (let i = 0; i < m.given; i++) {
        P.push(m.corners[i]);
        addPoint(m.corners[i], i, false);
        if (i) { addLine(m.corners[i - 1], m.corners[i], false); rowOk(i - 1); }
      }
      const askNext = () => {
        stepNow = 'tap';
        const k = P.length;
        q(`[data-row="${k - 1}"]`).classList.add('g3sh-row-cur');
        if (k === 1) say(`Từ A, kẻ cạnh AB dài ${m.w} xăng-ti-mét theo đường kẻ. Chạm vào chỗ đặt điểm B.`, `👆 Chạm chỗ đặt <b>điểm B</b>: AB dài ${m.w} ô.`);
        else if (k === 2) say(`Từ B, kẻ cạnh BC dài ${m.h} xăng-ti-mét, tạo với AB một góc vuông. Chạm vào chỗ đặt điểm C.`, `👆 Chạm chỗ đặt <b>điểm C</b>: BC dài ${m.h} ô, góc đỉnh B vuông.`);
        else say(`Chạm vào chỗ đặt điểm D để được ${what} ABCD.`, `👆 Chạm chỗ đặt <b>điểm D</b>.`);
      };
      const ghost = q('.g3sh-ghost');
      const flashGhost = (p, ok) => {
        ghost.setAttribute('cx', p[0]); ghost.setAttribute('cy', p[1]);
        ghost.classList.remove('g3sh-ghost-bad'); void ghost.getBBox();
        if (!ok) { ghost.classList.add('g3sh-ghost-bad'); setTimeout(() => ghost.classList.remove('g3sh-ghost-bad'), 700); }
      };

      async function tapAt(p) {
        if (stepNow !== 'tap') return;
        const k = P.length, prev = P[k - 1];
        const d = [p[0] - prev[0], p[1] - prev[1]];
        if (!d[0] && !d[1]) return;
        if (P.some(x => x[0] === p[0] && x[1] === p[1])) return;
        const L = Math.abs(d[0]) + Math.abs(d[1]);
        const nm = sideN(k - 1);
        let err = '';
        if (k < 3) {
          if (d[0] && d[1]) err = `${nm} phải kẻ theo đường kẻ của lưới (ngang hoặc dọc), không kẻ xiên.`;
          else if (k === 2 && (d[0] * (P[1][0] - P[0][0]) + d[1] * (P[1][1] - P[0][1])) !== 0) err = `Góc đỉnh B phải là góc vuông: từ B kẻ theo đường kẻ ${P[1][1] === P[0][1] ? 'dọc' : 'ngang'}.`;
          else if (L !== len[k - 1]) err = `${nm} đang dài ${L} ô. ${k === 1 ? (m.sq ? 'Cạnh hình vuông' : 'Chiều dài') : (m.sq ? 'Hình vuông có 4 cạnh bằng nhau, cạnh' : 'Chiều rộng')} là ${len[k - 1]} ô.`;
        } else {
          const want = [P[0][0] + P[2][0] - P[1][0], P[0][1] + P[2][1] - P[1][1]];
          if (p[0] !== want[0] || p[1] !== want[1]) err = `CD phải dài bằng AB (${m.w} ô), DA dài bằng BC (${m.h} ô), kẻ theo đường kẻ.`;
        }
        if (err) { flashGhost(p, false); env.wrong(null, err, err, rule); shake(q(`[data-row="${k - 1}"]`)); return; }
        stepNow = 'busy';
        P.push(p);
        sfx.pop(k + 1);
        addLine(prev, p, true);
        q(`[data-row="${k - 1}"]`).classList.remove('g3sh-row-cur');
        await sleep(calmMotion() ? 520 : 420);
        addPoint(p, k, true);
        rowOk(k - 1);
        if (P.length < 4) { await sleep(250); askNext(); return; }
        // Nối D với A
        await sleep(250);
        addLine(P[3], P[0], true);
        await sleep(calmMotion() ? 520 : 420);
        rowOk(3);
        fillEl.setAttribute('points', pts(P));
        fillEl.classList.add('g3sh-dfill-on');
        check();
      }
      async function check() {
        say('Kiểm tra lại bằng thước và ê ke!', '📏 <b>Thước</b> đo cạnh, 📐 <b>ê ke</b> kiểm tra góc.');
        const n = P.length;
        // thứ tự ABCD theo chiều kim đồng hồ để thước, nhãn nằm phía ngoài
        for (let i = 0; i < n; i++) await rulerAt(tools, marks, P, i);
        for (let i = 0; i < n; i++) await ekeAt(tools, marks, P, i, 1.4);
        rowOk(4);
        sfx.ding();
        env.finish(m.sq ? `Hình vuông ABCD có 4 góc vuông, 4 cạnh đều dài ${m.w} cm.` : `Hình chữ nhật ABCD có 4 góc vuông, chiều dài ${m.w} cm, chiều rộng ${m.h} cm.`);
      }
      svg.addEventListener('click', (e) => {
        const p = svgPoint(svg, e);
        if (!p) return;
        const g = [Math.round(p[0]), Math.round(p[1])];
        if (g[0] < 0 || g[0] > 12 || g[1] < 0 || g[1] > 8 || Math.hypot(p[0] - g[0], p[1] - g[1]) > 0.48) return;
        tapAt(g);
      });
      setTimeout(askNext, 50);
      return {
        step() { if (stepNow === 'tap') tapAt(m.corners[P.length]); },
        wrong() { if (stepNow === 'tap') { const c = m.corners[P.length]; tapAt([c[0] + (c[0] < 11 ? 1 : -1), c[1]]); } },
      };
    },
  };
}

let shStyles = false;
function injectShapeStyles() {
  if (shStyles) return;
  shStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g3sh { flex: 1; min-height: 0; display: grid; gap: 1.4cqh 2cqi; padding: 1.4cqh 2.4cqi 2cqh calc(clamp(1.4rem, 4cqi, 3rem) + 1.6cqi);
      grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr) minmax(0, 0.42fr);
      grid-template-areas: "head head" "fig side" "lines lines"; font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .g3sh > * { min-height: 0; min-width: 0; }
    .g3sh-L1 { grid-template-rows: auto minmax(0, 1fr) minmax(0, 0.62fr); }
    .g3sh-L3 { grid-template-rows: auto minmax(0, 1fr) minmax(0, 0.2fr); }
    .g3sh-L4 { grid-template-rows: auto minmax(0, 1fr); grid-template-areas: "head head" "fig side"; grid-template-columns: minmax(0, 2.1fr) minmax(0, 1fr); }
    .g3sh-head { grid-area: head; font-size: min(6.4cqh, 3.6cqi, 2.6rem); line-height: 1.25; color: #334155; }
    .g3sh-head b { color: #C2410C; }
    .g3sh-fig { grid-area: fig; display: flex; border-radius: 0.8rem; overflow: hidden; border: 2px solid #DBEAFE; background: #fff; }
    .g3sh-svg { flex: 1; width: 100%; height: 100%; display: block; touch-action: manipulation; }
    .g3sh-side { grid-area: side; container-type: size; container-name: g3shside; display: flex; flex-direction: column; gap: 3cqh; }
    .g3sh-lines { grid-area: lines; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .g3sh-lg { display: flex; flex-direction: column; gap: 0.12em; width: max-content; line-height: 1.15; }
    .g3sh-ln { display: flex; align-items: center; gap: 0.22em; white-space: nowrap; }
    .g3sh-hide { visibility: hidden; }
    .g3sh .g3d-box { height: 1.2em; }
    .g3sh-ls { display: inline-grid; place-items: center; height: 1.2em; border-bottom: 0.06em dashed #93C5FD; color: #1D4ED8; }
    .g3sh-cm { margin-left: -0.15em; }
    .g3sh-slot { display: inline-grid; place-items: center; height: 1.2em; padding: 0 0.15em; border: 0.06em dashed #93C5FD; border-radius: 0.2em; color: #94A3B8; box-sizing: border-box; }
    .g3sh-slot-done { border-color: transparent; color: #1D4ED8; }
    .g3sh-list { color: #94A3B8; border-bottom: 0.06em dashed #93C5FD; }
    .g3sh-list-on { color: #15803D; border-bottom-color: transparent; }

    /* Hình trên giấy ô vuông */
    .g3sh-vx { font: 800 0.66px 'Baloo 2', sans-serif; fill: #1E3A8A; paint-order: stroke; stroke: #fff; stroke-width: 0.12px; pointer-events: none; }
    .g3sh-vx-on { fill: ${COL.ang}; }
    .g3sh-dot { fill: #94A3B8; transition: fill .3s; pointer-events: none; }
    .g3sh-dot-on { fill: ${COL.vx}; }
    .g3sh-blink { animation: g3shBlink 1s ease-in-out infinite; }
    @keyframes g3shBlink { 50% { fill: #F59E0B; } }
    .g3sh-sd { stroke: transparent; pointer-events: none; transition: stroke .25s; }
    .g3sh-sd-on { stroke: ${COL.side}; }
    .g3sh-sd-ang { stroke: ${COL.ang}; }
    .g3sh-sdn { font: 800 0.5px 'Baloo 2', sans-serif; fill: ${COL.side}; paint-order: stroke; stroke: #fff; stroke-width: 0.1px; opacity: 0; pointer-events: none; transition: opacity .3s; }
    .g3sh-sdn-on { opacity: 1; }
    .g3sh-hit { stroke: transparent; stroke-width: 0.9; stroke-linecap: round; pointer-events: none; cursor: pointer; }
    .g3sh-vhit { fill: transparent; pointer-events: none; cursor: pointer; }
    .g3sh-pick-sd .g3sh-hit { pointer-events: stroke; }
    .g3sh-pick-sd .g3sh-sd:not(.g3sh-sd-on):not(.g3sh-sd-ang) { stroke: #FDBA74; stroke-opacity: 0.55; animation: g3shSide 1.3s ease-in-out infinite; }
    @keyframes g3shSide { 50% { stroke-opacity: 0.15; } }
    .g3sh-pick-vx .g3sh-vhit { pointer-events: all; fill: #FDE68A; fill-opacity: 0.35; animation: g3shVx 1.3s ease-in-out infinite; }
    @keyframes g3shVx { 50% { fill-opacity: 0.08; } }
    .g3sh-arc { fill: #BBF7D0; stroke: ${COL.ang}; stroke-width: 0.07; animation: g3shPop .4s ease-out; }
    .g3sh-len { font: 800 0.58px 'Baloo 2', sans-serif; fill: #C2410C; paint-order: stroke; stroke: #fff; stroke-width: 0.13px; }
    .g3sh-num { font: 800 0.6px 'Baloo 2', sans-serif; }
    .g3sh-in { animation: g3shToolIn .3s ease-out; }
    @keyframes g3shToolIn { from { opacity: 0; transform: translate(-0.5px, -0.5px); } }
    .g3sh-out { opacity: 0; transition: opacity .25s; }
    .g3sh-pop { animation: g3shPop .35s ease-out; transform-box: fill-box; transform-origin: center; }
    @keyframes g3shPop { from { opacity: 0; transform: scale(0.3); } }

    /* Nút chọn to (cột phải) */
    .g3sh-choices { flex: 1; container-type: size; display: flex; flex-direction: column; gap: 4cqh; padding: 1cqh 0 2.4cqh; box-sizing: border-box; min-height: 0; }
    .g3sh-btn { flex: 1 1 0; min-height: 0; width: 100%; max-width: none; font-size: min(15cqh, calc(88cqi / (var(--n, 8) * 0.52)), 2.8rem); overflow: hidden; line-height: 1.05; white-space: nowrap; }
    .g3sh-btn-void { visibility: hidden; }
    .g3sh-btn-off { opacity: 0.55; }
    .g3sh-choices .g3sh-btn:disabled:not(.g3d-choice-ok):not(.g3sh-btn-off) { opacity: 0.6; }

    /* Cấp 2: bốn hình là bốn nút to, kết quả đo ghi ngay trên hình */
    .g3sh-L2 .g3sh-fig { border: none; background: transparent; overflow: visible; }
    .g3sh-cards { flex: 1; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); gap: 2cqh 1.6cqi; min-height: 0; }
    .g3sh-card { position: relative; min-width: 0; min-height: 0; padding: 0; border: 2px solid #BFDBFE; border-radius: 0.8rem; background: #fff; cursor: pointer; overflow: hidden;
      box-shadow: 0 5px 0 #93C5FD; display: flex; touch-action: manipulation; font-family: 'Baloo 2', sans-serif; }
    .g3sh-card:active { transform: translateY(3px); box-shadow: 0 2px 0 #93C5FD; }
    .g3sh-csvg { flex: 1; width: 100%; height: 100%; display: block; }
    .g3sh-cpoly { fill: #FEF3C7; stroke: ${COL.line}; }
    .g3sh-cn { position: absolute; left: 0.35em; top: 0.15em; font-size: min(5.5cqh, 3cqi); font-weight: 800; color: #1E3A8A; background: #fff; border-radius: 50%; width: 1.5em; height: 1.5em; display: grid; place-items: center; border: 2px solid #93C5FD; }
    .g3sh-badge { position: absolute; right: 0.4em; bottom: 0.3em; font-size: min(4.2cqh, 2.3cqi); font-weight: 800; padding: 0 0.5em; border-radius: 1em; background: #fff; visibility: hidden; white-space: nowrap; }
    .g3sh-card-done .g3sh-badge { visibility: visible; }
    .g3sh-card-cur { border-color: #F59E0B; box-shadow: 0 5px 0 #F59E0B; }
    .g3sh-card-done { cursor: default; }
    .g3sh-card-sq { border-color: #22C55E; box-shadow: 0 5px 0 #16A34A; }
    .g3sh-card-sq .g3sh-cpoly { fill: #DCFCE7; }
    .g3sh-card-sq .g3sh-badge { color: #15803D; border: 2px solid #22C55E; }
    .g3sh-card-rect { border-color: #3B82F6; box-shadow: 0 5px 0 #2563EB; }
    .g3sh-card-rect .g3sh-cpoly { fill: #DBEAFE; }
    .g3sh-card-rect .g3sh-badge { color: #1D4ED8; border: 2px solid #3B82F6; }
    .g3sh-card-other { border-color: #CBD5E1; box-shadow: 0 5px 0 #94A3B8; }
    .g3sh-card-other .g3sh-cpoly { fill: #F1F5F9; }
    .g3sh-card-other .g3sh-badge { color: #64748B; border: 2px solid #CBD5E1; }
    .g3sh-nudge { animation: g3dShake .4s ease; }

    /* Cấp 3: mảnh ghép, bảng đếm */
    .g3sh-pc { fill: ${COL.fill}; stroke: none; cursor: pointer; transition: fill .2s; }
    .g3sh-pc-sel { fill: ${COL.sel}; }
    .g3sh-seg { stroke: ${COL.line}; stroke-width: 0.09; stroke-linecap: round; pointer-events: none; }
    .g3sh-found { pointer-events: none; }
    .g3sh-fpoly { stroke-width: 0.16; stroke-linejoin: round; fill-opacity: 0.18; }
    .g3sh-fpoly-new { animation: g3shFound .5s ease-out; }
    @keyframes g3shFound { from { stroke-width: 0.4; fill-opacity: 0.5; } }
    .g3sh-tally { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; background: #FFFBEB; border: 2px solid #FCD34D; border-radius: 0.8rem; padding: 2cqh 3cqi; gap: 2cqh; box-sizing: border-box; }
    .g3sh-tally-top { flex: none; display: flex; align-items: baseline; justify-content: center; gap: 0.4em; font-size: min(7cqh, 9cqi); color: #92400E; }
    .g3sh-tally-top b { font-size: 1.7em; color: #C2410C; line-height: 1; }
    .g3sh-chips { flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: repeat(4, minmax(0, 1fr)); gap: 1.4cqh 2cqi; }
    .g3sh-chip { display: grid; place-items: center; border-radius: 0.5em; border: 2px dashed #FDE68A; font-size: min(5.6cqh, 8cqi); color: var(--c, #92400E); background: #fff; }
    .g3sh-chip-on { border: 2px solid var(--c); }
    .g3sh-enough { flex: 0 0 22%; min-height: 0; width: 100%; max-width: none; font-size: min(9cqh, 10cqi, 2.6rem); color: #9A3412; border-color: #FDBA74; box-shadow: 0 5px 0 #F97316; }
    .g3sh-enough:active { box-shadow: 0 2px 0 #F97316; }

    /* Cấp 4: vẽ trên lưới */
    .g3sh-draw { cursor: crosshair; }
    .g3sh-dl { stroke: ${COL.line}; stroke-width: 0.12; stroke-linecap: round; pointer-events: none; }
    .g3sh-dl-in { stroke-dasharray: 1; stroke-dashoffset: 1; animation: g3shDraw .42s ease-out forwards; }
    @keyframes g3shDraw { to { stroke-dashoffset: 0; } }
    .g3sh-dfill { fill: #DBEAFE; fill-opacity: 0; transition: fill-opacity .5s; pointer-events: none; }
    .g3sh-dfill-on { fill-opacity: 0.7; }
    .g3sh-ghost { fill: transparent; pointer-events: none; }
    .g3sh-ghost-bad { fill: ${COL.bad}; fill-opacity: 0.55; animation: g3shGhost .7s ease-out forwards; }
    @keyframes g3shGhost { to { fill-opacity: 0; } }
    .g3sh-plan { flex: 1; min-height: 0; display: grid; grid-template-rows: auto repeat(5, minmax(0, 1fr)); gap: 1.6cqh; background: #fff; border: 2px solid ${EDGE}; border-radius: 0.8rem; padding: 2cqh 3cqi; box-sizing: border-box; }
    .g3sh-plan-h { text-align: center; color: #64748B; font-size: min(6cqh, 9cqi); }
    .g3sh-row { display: grid; grid-template-columns: 1.6em minmax(0, 1fr) 1.1em; align-items: center; gap: 0.4em; padding: 0 0.4em; border-radius: 0.5em; background: #F8FAFC; border: 2px solid #E2E8F0; font-size: min(7.5cqh, 10cqi); white-space: nowrap; }
    .g3sh-row b { color: #1E3A8A; }
    .g3sh-row span { color: #475569; }
    .g3sh-row i { font-style: normal; color: #16A34A; text-align: center; }
    .g3sh-row-cur { border-color: #F59E0B; background: #FFFBEB; }
    .g3sh-row-ok { border-color: #86EFAC; background: #F0FDF4; }

    /* Tờ vở gần vuông / đứng: hình trên cả bề ngang, cột phải thành một hàng */
    .g3sh-scene .g3d-paper { container-name: g3shpaper; }
    @container g3shpaper (aspect-ratio < 1.3) {
      .g3sh { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1.5fr) minmax(0, 0.34fr) minmax(0, 0.5fr);
        grid-template-areas: "head" "fig" "side" "lines"; }
      .g3sh-L1 { grid-template-rows: auto minmax(0, 1.4fr) minmax(0, 0.26fr) minmax(0, 0.6fr); }
      .g3sh-L2 { grid-template-rows: auto minmax(0, 1.9fr) minmax(0, 0.26fr) minmax(0, 0.3fr); }
      .g3sh-L3 { grid-template-rows: auto minmax(0, 1.5fr) minmax(0, 0.5fr) minmax(0, 0.16fr); }
      .g3sh-L4 { grid-template-rows: auto minmax(0, 1.6fr) minmax(0, 0.42fr); grid-template-areas: "head" "fig" "side"; grid-template-columns: minmax(0, 1fr); }
      .g3sh-head { font-size: min(4.4cqh, 5.4cqi); }
      .g3sh-side { flex-direction: row; gap: 2.4cqi; }
      .g3sh-choices { flex-direction: row; gap: 2.4cqi; padding: 0 0 1.6cqh; }
      .g3sh-btn { font-size: min(30cqh, calc(30cqi / (var(--n, 8) * 0.5)), 2.4rem); white-space: normal; }
      .g3sh-tally { flex: 1 1 0; flex-direction: row; align-items: stretch; }
      .g3sh-tally-top { flex-direction: column; align-items: center; justify-content: center; font-size: min(14cqh, 4cqi); }
      .g3sh-chips { grid-template-columns: repeat(4, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); }
      .g3sh-chip { font-size: min(13cqh, 3.6cqi); }
      .g3sh-enough { flex: 0 0 26%; height: auto; font-size: min(20cqh, 5cqi); }
      .g3sh-plan { grid-template-rows: none; grid-template-columns: auto repeat(5, minmax(0, 1fr)); gap: 1.4cqi; }
      .g3sh-plan-h { align-self: center; font-size: min(18cqh, 3cqi); white-space: normal; width: 3.2em; }
      .g3sh-row { grid-template-columns: none; grid-template-rows: auto auto; justify-items: center; gap: 0; font-size: min(24cqh, 3.8cqi); padding: 0.2em; }
      .g3sh-row i { position: absolute; }
      .g3sh-row span { white-space: normal; text-align: center; line-height: 1; }
      .g3sh-row { position: relative; }
      .g3sh-row i { right: 0.2em; top: 0.1em; }
      .g3sh-cn { font-size: min(4.5cqh, 4.4cqi); }
      .g3sh-badge { font-size: min(3.4cqh, 3.6cqi); }
    }
    @media (prefers-reduced-motion: reduce) {
      .g3sh-in { animation: g3shFade .45s ease; }
      .g3sh-pop { animation: g3shFade .45s ease; }
      .g3sh-arc { animation: g3shFade .5s ease; }
      .g3sh-dl-in { stroke-dasharray: none; stroke-dashoffset: 0; animation: g3shFade .5s ease; }
      .g3sh-blink, .g3sh-pick-sd .g3sh-sd:not(.g3sh-sd-on):not(.g3sh-sd-ang), .g3sh-pick-vx .g3sh-vhit { animation-duration: 2.6s; }
      @keyframes g3shFade { from { opacity: 0; } }
    }
  `;
  document.head.appendChild(st);
}
