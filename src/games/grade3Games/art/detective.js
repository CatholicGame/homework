/**
 * Hình vẽ trò Thám tử góc vuông: ê-ke, đồ vật có góc để kiểm tra (khung tranh, cửa sổ, quyển sách, đồng hồ,
 * cái kéo, mái nhà, cái thang dựa tường), hình trên lưới ô vuông và hình ghép có đặt tên đỉnh.
 * Nét và màu theo bộ vẽ lại của vở bài tập (scripts/redraw/common.py: INK, YELLOW, TEAL…).
 * Mọi toạ độ là toạ độ bảng (viewBox của detective.js); hàm hình học dùng chung cũng ở đây.
 */

export const INK = '#3F3A40';
const FONT = 'Baloo 2, Quicksand, sans-serif';

// ── Hình học ───────────────────────────────────────────────────────────────────────────────────────
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
export const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const mul = (a, k) => [a[0] * k, a[1] * k];
export const len = (a) => Math.hypot(a[0], a[1]);
export const unit = (a) => { const l = len(a) || 1; return [a[0] / l, a[1] / l]; };
export const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
export const rad = (d) => (d * Math.PI) / 180;
export const deg = (r) => (r * 180) / Math.PI;
/** Số đo góc đỉnh V (độ), hai cạnh đi qua P1, P2. */
export const angleAt = (V, P1, P2) => deg(Math.acos(Math.max(-1, Math.min(1, dot(unit(sub(P1, V)), unit(sub(P2, V)))))));
export const isRight = (V, P1, P2) => Math.abs(angleAt(V, P1, P2) - 90) < 0.5;
export const rotPt = (p, c, d) => {
  const a = rad(d), x = p[0] - c[0], y = p[1] - c[1];
  return [c[0] + x * Math.cos(a) - y * Math.sin(a), c[1] + x * Math.sin(a) + y * Math.cos(a)];
};
const f1 = (v) => (Math.round(v * 10) / 10).toString();
export const pts = (list) => list.map(p => `${f1(p[0])},${f1(p[1])}`).join(' ');

/** Hướng đặt chữ tên đỉnh: ra phía ngoài góc (ngược đường phân giác). */
export function outward(V, P1, P2) {
  const b = add(unit(sub(P1, V)), unit(sub(P2, V)));
  if (len(b) < 0.05) { const u = unit(sub(P1, V)); return [u[1], -u[0]]; }
  return mul(unit(b), -1);
}

/** Chữ tên điểm (in hoa, đậm) có viền trắng để đọc rõ trên nét vẽ. */
export function letter(p, s, size = 20) {
  return `<text x="${f1(p[0])}" y="${f1(p[1] + size * 0.36)}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="${size}" fill="${INK}" stroke="#fff" stroke-width="4" paint-order="stroke" style="pointer-events:none">${s}</text>`;
}

/** Cung nhỏ đánh dấu góc đang hỏi (đỉnh V, hai cạnh qua P1, P2). */
export function angleArc(V, P1, P2, r = 20, color = '#F59E0B') {
  const u1 = unit(sub(P1, V)), u2 = unit(sub(P2, V));
  const a = add(V, mul(u1, r)), b = add(V, mul(u2, r));
  const sweep = cross(u1, u2) > 0 ? 1 : 0;
  return `<path d="M${f1(V[0])} ${f1(V[1])} L${f1(a[0])} ${f1(a[1])} A${r} ${r} 0 0 ${sweep} ${f1(b[0])} ${f1(b[1])} Z" fill="${color}" fill-opacity="0.35" stroke="${color}" stroke-width="2.5" style="pointer-events:none"/>`;
}

/** Kí hiệu góc vuông (ô vuông nhỏ ở đỉnh) — màu theo trạng thái: cam = bé đánh dấu, xanh = đúng, đỏ = sai. */
export function rightMark(V, P1, P2, s = 13, color = '#16A34A') {
  const u1 = mul(unit(sub(P1, V)), s), u2 = mul(unit(sub(P2, V)), s);
  const a = add(V, u1), c = add(V, u2), b = add(a, u2);
  return `<path d="M${f1(a[0])} ${f1(a[1])} L${f1(b[0])} ${f1(b[1])} L${f1(c[0])} ${f1(c[1])}" fill="${color}" fill-opacity="0.18" stroke="${color}" stroke-width="3" stroke-linejoin="round" style="pointer-events:none"/>`;
}

/** Dấu ✗ đỏ bên trong góc (góc không vuông). */
export function crossMark(V, P1, P2, d = 26) {
  const o = add(V, mul(outward(V, P1, P2), -d));
  const k = 6;
  return `<path d="M${f1(o[0] - k)} ${f1(o[1] - k)} L${f1(o[0] + k)} ${f1(o[1] + k)} M${f1(o[0] + k)} ${f1(o[1] - k)} L${f1(o[0] - k)} ${f1(o[1] + k)}" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round" style="pointer-events:none"/>`;
}

// ── Ê-ke ───────────────────────────────────────────────────────────────────────────────────────────
/**
 * Ê-ke tam giác vuông: đỉnh góc vuông ở gốc toạ độ, cạnh dài L theo trục x, cạnh ngắn LB theo trục y.
 * Có lỗ tam giác ở giữa và vạch chia trên cạnh dài như ê-ke thật. Nhựa trong nên vẫn thấy nét hình bên dưới.
 */
export function ekeShape(L, LB) {
  const c = Math.hypot(L, LB), r = (L + LB - c) / 2;
  const hole = [[0, 0], [L, 0], [0, LB]].map(([x, y]) => [r + (x - r) * 0.42, r + (y - r) * 0.42]);
  const ticks = Array.from({ length: Math.floor(L / 8) - 1 }, (_, i) => {
    const x = (i + 1) * 8, h = (i + 1) % 5 ? 4 : 7;
    return `M${x} 0 V${h}`;
  }).join(' ');
  const holeD = hole.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])}`).join(' ');
  return `<path d="M0 0 H${f1(L)} L0 ${f1(LB)} Z ${holeD} Z" fill="#A7F3D0" fill-opacity="0.6" fill-rule="evenodd" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`
    + `<path d="${ticks}" stroke="${INK}" stroke-width="1.2"/>`
    + `<path d="M0 10 H10 V0" fill="none" stroke="#EF4444" stroke-width="2.4"/>`;
}

/** Ê-ke nhỏ cho thẻ trò chơi / cách chơi. */
export function ekeIcon(size = 48) {
  return `<svg width="${size}" height="${size}" viewBox="-6 -6 76 76" aria-hidden="true"><g transform="translate(4 62) scale(1 -1)">${ekeShape(60, 52)}</g></svg>`;
}

// ── Đồ vật có một góc để kiểm tra (cấp 1) ─────────────────────────────────────────────────────────
// Mỗi hàm nhận rng + right (góc hỏi có vuông không) và trả về { svg, V, P1, P2, name } — V là đỉnh góc hỏi,
// P1 / P2 là hai điểm trên hai cạnh. Toạ độ trong vùng hình 20..370 × 20..280 của bảng 480 × 300.
const CX = 195, CY = 150;

/** Góc không vuông: lệch hẳn khỏi 90° (ít nhất 10°, áp ê-ke là thấy khe hở) nhưng nhìn qua dễ tưởng vuông. */
const offAngle = (rng, near = true) => (near ? rng.pick([72, 74, 76, 78, 80, 100, 102, 104, 106, 108]) : rng.pick([55, 60, 65, 115, 120, 125]));

/** Hình bình hành (góc đáy trái α) — xoay cả hình `rot` độ quanh tâm bảng. Trả về 4 đỉnh [TL, TR, BR, BL]. */
function parallelogram(w, h, alpha, rot) {
  const a = rad(alpha);
  const BL = [0, 0], BR = [w, 0], TL = [h * Math.cos(a), -h * Math.sin(a)], TR = [TL[0] + w, TL[1]];
  const P = [TL, TR, BR, BL];
  const cx = (Math.min(...P.map(p => p[0])) + Math.max(...P.map(p => p[0]))) / 2;
  const cy = (Math.min(...P.map(p => p[1])) + Math.max(...P.map(p => p[1]))) / 2;
  return P.map(p => rotPt([p[0] - cx + CX, p[1] - cy + CY], [CX, CY], rot));
}

const shrink = (P, k) => {
  const c = [P.reduce((s, p) => s + p[0], 0) / P.length, P.reduce((s, p) => s + p[1], 0) / P.length];
  return P.map(p => add(c, mul(sub(p, c), k)));
};

let clipSeq = 0;
function quadObject(rng, right, kind) {
  const alpha = right ? 90 : offAngle(rng, rng() < 0.8);
  const rot = rng.pick([0, 0, -8, 8, -14, 14]);
  const w = kind === 'book' ? rng.int(130, 160) : rng.int(170, 210);
  const h = kind === 'book' ? rng.int(160, 180) : rng.int(120, 150);
  const P = parallelogram(w, h, alpha, rot);
  const k = rng.int(0, 3);
  const V = P[k], P1 = P[(k + 3) % 4], P2 = P[(k + 1) % 4];
  const st = `stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"`;
  let svg = '';
  if (kind === 'frame') {
    const inner = shrink(P, 0.8);
    const id = `g3d-clip-${++clipSeq}`;
    const nail = [CX, Math.min(P[0][1], P[1][1]) - 24];
    const lo = inner.reduce((m, p) => Math.max(m, p[1]), -1e9), hi = inner.reduce((m, p) => Math.min(m, p[1]), 1e9);
    const midY = (lo + hi) / 2;
    svg = `<path d="M${f1(P[0][0] + (P[1][0] - P[0][0]) * 0.25)} ${f1(P[0][1] + (P[1][1] - P[0][1]) * 0.25)} L${f1(nail[0])} ${f1(nail[1])} L${f1(P[0][0] + (P[1][0] - P[0][0]) * 0.75)} ${f1(P[0][1] + (P[1][1] - P[0][1]) * 0.75)}" fill="none" stroke="#8A6A4F" stroke-width="2"/>
      <circle cx="${f1(nail[0])}" cy="${f1(nail[1])}" r="4" fill="#A7B1BC" stroke="${INK}" stroke-width="1.5"/>
      <polygon points="${pts(P)}" fill="#C98B4F" ${st}/>
      <clipPath id="${id}"><polygon points="${pts(inner)}"/></clipPath>
      <g clip-path="url(#${id})"><rect x="0" y="0" width="480" height="300" fill="#CDEBFA"/>
        <circle cx="${f1(CX + 40)}" cy="${f1(midY - 18)}" r="14" fill="#FFD166" stroke="${INK}" stroke-width="1.5"/>
        <path d="M0 ${f1(lo)} L${f1(CX - 50)} ${f1(midY - 6)} L${f1(CX + 10)} ${f1(lo - 10)} L${f1(CX + 70)} ${f1(midY + 4)} L480 ${f1(lo)} V300 H0 Z" fill="#9BD58A" stroke="${INK}" stroke-width="1.5"/></g>
      <polygon points="${pts(inner)}" fill="none" ${st}/>`;
  } else if (kind === 'window') {
    const inner = shrink(P, 0.86);
    const m = (a, b) => mul(add(a, b), 0.5);
    const [a, b, c, d] = inner;
    svg = `<polygon points="${pts(P)}" fill="#FFFFFF" ${st}/>
      <polygon points="${pts(inner)}" fill="#BFE6F7" ${st}/>
      <path d="M${pts([m(a, b), m(d, c)])} M${pts([m(a, d), m(b, c)])}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      <path d="M${pts([m(a, b), m(d, c)])} M${pts([m(a, d), m(b, c)])}" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M${pts([add(a, mul(sub(b, a), 0.12)), add(a, mul(sub(d, a), 0.3))])}" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.8"/>`;
  } else {
    // Quyển sách: bìa màu, gáy sách một bên, nhãn tên sách.
    const color = rng.pick(['#F07167', '#6FB7EA', '#7BCB8B', '#B9A7F0']);
    const [a, b, c, d] = P;
    const spine = [a, add(a, mul(sub(b, a), 0.12)), add(d, mul(sub(c, d), 0.12)), d];
    const lab = [0.3, 0.85].map(t => [add(a, add(mul(sub(b, a), t), mul(sub(d, a), 0.22))), add(a, add(mul(sub(b, a), t), mul(sub(d, a), 0.42)))]);
    svg = `<polygon points="${pts(P)}" fill="${color}" ${st}/>
      <polygon points="${pts(spine)}" fill="#000" fill-opacity="0.15" stroke="${INK}" stroke-width="2"/>
      <polygon points="${pts([lab[0][0], lab[1][0], lab[1][1], lab[0][1]])}" fill="#FFF4DF" stroke="${INK}" stroke-width="1.8"/>`;
  }
  const name = { frame: 'khung tranh', window: 'cửa sổ', book: 'quyển sách' }[kind];
  return { svg, V, P1, P2, name };
}

function clockObject(rng, right) {
  const h = right ? rng.pick([3, 9]) : rng.pick([1, 2, 4, 5, 7, 8, 10, 11]);
  const C = [CX, CY], R = 118;
  const minute = [CX, CY - 72];
  const hour = add(C, mul([Math.sin(rad(h * 30)), -Math.cos(rad(h * 30))], 56));
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = rad(i * 6), r0 = i % 5 ? R - 18 : R - 24;
    const p = add(C, mul([Math.sin(a), -Math.cos(a)], r0)), q = add(C, mul([Math.sin(a), -Math.cos(a)], R - 13));
    return `M${f1(p[0])} ${f1(p[1])} L${f1(q[0])} ${f1(q[1])}`;
  }).join(' ');
  // Số 12, 3, 6, 9 ở vòng ngoài — kim dừng trước vòng số, không che số nào.
  const nums = [12, 3, 6, 9].map((n, i) => {
    const a = rad(i * 90), p = add(C, mul([Math.sin(a), -Math.cos(a)], R - 38));
    return `<text x="${f1(p[0])}" y="${f1(p[1] + 7)}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="20" fill="${INK}">${n}</text>`;
  }).join('');
  const hand = (p, w, color) => `<path d="M${CX} ${CY} L${f1(p[0])} ${f1(p[1])}" stroke="${INK}" stroke-width="${w + 3}" stroke-linecap="round"/><path d="M${CX} ${CY} L${f1(p[0])} ${f1(p[1])}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
  const svg = `<circle cx="${CX}" cy="${CY}" r="${R}" fill="#FFD166" stroke="${INK}" stroke-width="2.6"/>
    <circle cx="${CX}" cy="${CY}" r="${R - 10}" fill="#FFFFFF" stroke="${INK}" stroke-width="2"/>
    <path d="${ticks}" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>${nums}
    ${hand(minute, 4, '#6FB7EA')}${hand(hour, 6, '#F07167')}
    <circle cx="${CX}" cy="${CY}" r="6" fill="${INK}"/>`;
  return { svg, V: C, P1: minute, P2: hour, name: 'đồng hồ', hour: h };
}

function scissorsObject(rng, right) {
  const open = right ? 90 : rng.pick([55, 62, 68, 76, 104, 112, 120]);
  const tilt = rng.pick([-18, -10, 0, 10, 18]);
  const V = [CX, 190];
  const dir = (d) => [Math.cos(rad(d)), Math.sin(rad(d))];
  const d1 = -90 - open / 2 + tilt, d2 = -90 + open / 2 + tilt;
  const P1 = add(V, mul(dir(d1), 150)), P2 = add(V, mul(dir(d2), 150));
  const blade = (d) => {
    const u = dir(d), n = [-u[1], u[0]];
    const tip = add(V, mul(u, 150));
    return `<path d="M${pts([add(V, mul(n, 7)), add(V, add(mul(u, 110), mul(n, 5))), tip, add(V, mul(n, -1.5))])} Z" fill="#CBD5E1" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`;
  };
  const handle = (d, color) => {
    const c = add(V, mul(dir(d + 180), 52));
    return `<path d="M${f1(V[0])} ${f1(V[1])} L${f1(c[0])} ${f1(c[1])}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${f1(V[0])} ${f1(V[1])} L${f1(c[0])} ${f1(c[1])}" stroke="${color}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="17" fill="none" stroke="${INK}" stroke-width="10"/><circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="17" fill="none" stroke="${color}" stroke-width="6"/>`;
  };
  const svg = `${handle(d2, '#F07167')}${handle(d1, '#6FB7EA')}${blade(d1)}${blade(d2)}
    <circle cx="${f1(V[0])}" cy="${f1(V[1])}" r="6" fill="#A7B1BC" stroke="${INK}" stroke-width="2"/>`;
  return { svg, V, P1, P2, name: 'cái kéo' };
}

function roofObject(rng, right) {
  const beta = right ? 90 : rng.pick([70, 76, 80, 100, 106, 112]);
  const t = Math.tan(rad(beta / 2));
  const hRoof = Math.min(118, 150 / t), b = hRoof * t;
  const top = 34, base = top + hRoof;
  const V = [CX, top], P1 = [CX - b, base], P2 = [CX + b, base];
  const bw = Math.min(b * 0.78, 120), bodyH = Math.min(282 - base, 120);
  const st = `stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"`;
  const svg = `<rect x="${f1(CX - bw)}" y="${f1(base)}" width="${f1(bw * 2)}" height="${f1(bodyH)}" fill="#FFF4DF" ${st}/>
    <rect x="${f1(CX - 16)}" y="${f1(base + bodyH - 58)}" width="32" height="58" rx="3" fill="#B07A4F" ${st}/>
    <rect x="${f1(CX - bw + 16)}" y="${f1(base + 18)}" width="34" height="30" fill="#BFE6F7" ${st}/>
    <rect x="${f1(CX + bw - 50)}" y="${f1(base + 18)}" width="34" height="30" fill="#BFE6F7" ${st}/>
    <polygon points="${pts([V, P1, P2])}" fill="#F07167" ${st}/>`;
  return { svg, V, P1, P2, name: 'mái nhà' };
}

function ladderObject(rng, right) {
  const floor = 262, wall = 110;
  const phi = rng.pick([58, 64, 70]);
  const H = 190, d = H / Math.tan(rad(phi));
  const F = [wall + d, floor], W = [wall, floor - H];
  const u = unit(sub(W, F)), n = [-u[1] * 14, u[0] * 14];
  const rungs = Array.from({ length: 6 }, (_, i) => {
    const p = add(F, mul(sub(W, F), (i + 1) / 7));
    return `M${pts([sub(p, n), add(p, n)])}`;
  }).join(' ');
  const svg = `<rect x="20" y="24" width="${wall - 20}" height="${floor - 24}" fill="#FFE8C2" stroke="${INK}" stroke-width="2.6"/>
    <path d="M40 60 H90 M30 100 H70 M50 140 H100 M30 180 H80 M44 220 H96" stroke="#E7C79A" stroke-width="6" stroke-linecap="round"/>
    <rect x="20" y="${floor}" width="350" height="18" fill="#B07A4F" stroke="${INK}" stroke-width="2.6"/>
    <path d="M${pts([sub(F, n), sub(W, n)])} M${pts([add(F, n), add(W, n)])}" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
    <path d="M${pts([sub(F, n), sub(W, n)])} M${pts([add(F, n), add(W, n)])}" stroke="#FFD166" stroke-width="4" stroke-linecap="round"/>
    <path d="${rungs}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="${rungs}" stroke="#FFD166" stroke-width="2.5" stroke-linecap="round"/>`;
  // Góc hỏi: tường – sàn (vuông) hoặc thang – sàn (không vuông).
  if (right) return { svg, V: [wall, floor], P1: [wall, 40], P2: [360, floor], name: 'chân tường' };
  return { svg, V: F, P1: W, P2: [360, floor], name: 'chân thang' };
}

/** Các loại đồ vật cấp 1 (id → hàm vẽ). */
export const OBJECTS = {
  frame: (rng, r) => quadObject(rng, r, 'frame'),
  window: (rng, r) => quadObject(rng, r, 'window'),
  book: (rng, r) => quadObject(rng, r, 'book'),
  clock: clockObject,
  scissors: scissorsObject,
  roof: roofObject,
  ladder: ladderObject,
};

// ── Lưới ô vuông ───────────────────────────────────────────────────────────────────────────────────
/** Lưới ô vuông cạnh `cell` phủ khung (x, y, w, h), đường kẻ đi qua điểm gốc (ox, oy). */
export function gridSvg(x, y, w, h, cell, ox, oy) {
  let d = '';
  const x0 = ox - Math.floor((ox - x) / cell) * cell, y0 = oy - Math.floor((oy - y) / cell) * cell;
  for (let gx = x0; gx <= x + w + 0.1; gx += cell) d += `M${f1(gx)} ${f1(y)} V${f1(y + h)} `;
  for (let gy = y0; gy <= y + h + 0.1; gy += cell) d += `M${f1(x)} ${f1(gy)} H${f1(x + w)} `;
  return `<path d="${d}" stroke="#BFDBFE" stroke-width="1.2"/>`;
}

/** Màu tô lần lượt khi soi từng hình ở cấp đếm hình. */
export const FILLS = ['#F07167', '#6FB7EA', '#7BCB8B', '#FFD166', '#B9A7F0', '#F4A259', '#6CCFB5', '#F7A1C4'];
