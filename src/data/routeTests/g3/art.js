/**
 * Hình cho đề Kiểm tra theo lộ trình lớp 3: chuỗi SVG tự vẽ, chạy được trong Node (scripts/check-worksheets.mjs).
 * Dùng lại hình của lớp 2 (đồ vật, tia số, cân đĩa, đồng hồ, điểm và đoạn thẳng, hình phẳng, thước cm) và thêm:
 * hình tròn tâm O, góc (vuông / không vuông), thước mi-li-mét, nhiệt kế, bình có vạch mi-li-lít, khối lập phương,
 * khối hộp chữ nhật.
 */
export { item, things, numberLine, twoRows, balance, vessels, clock, geo, polys, ruler } from '../g2/art.js';

const INK = '#1f2937';
const r1 = (v) => Math.round(v * 10) / 10;
const svg = (w, h, body, width = w) => `<svg viewBox="0 0 ${r1(w)} ${r1(h)}" width="${Math.round(width)}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const text = (x, y, t, { size = 15, weight = 700, fill = INK, anchor = 'middle', italic = false } = {}) =>
  `<text x="${r1(x)}" y="${r1(y)}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${italic ? ' font-style="italic"' : ''}>${t}</text>`;
const dot = (x, y) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="3.6" fill="${INK}"/>`;
const rad = (d) => (d * Math.PI) / 180;

/**
 * Hình tròn tâm O bán kính r. pts = { A: 30, B: 210 } là các điểm trên đường tròn theo góc (độ, 0 = bên phải,
 * ngược chiều kim đồng hồ). segs = ['OA', 'AB'] nối các điểm (O là tâm). inner = { M: [dx, dy] } điểm trong hình.
 * center: tên tâm (mặc định 'O').
 */
export function circle({ pts = {}, segs = [], inner = {}, r = 62, center = 'O', lens = {}, width = 200 } = {}) {
  const c = r + 26;
  const P = { [center]: [c, c] };
  for (const [k, d] of Object.entries(pts)) P[k] = [c + r * Math.cos(rad(d)), c - r * Math.sin(rad(d))];
  for (const [k, [dx, dy]] of Object.entries(inner)) P[k] = [c + dx, c + dy];
  let body = `<circle cx="${c}" cy="${c}" r="${r}" fill="#e0f2fe" stroke="${INK}" stroke-width="2.4"/>`;
  for (const s of segs) {
    const [a, b] = [P[s[0]], P[s[1]]];
    body += `<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(b[0])}" y2="${r1(b[1])}" stroke="#1d4ed8" stroke-width="2.4" stroke-linecap="round"/>`;
    if (lens[s]) body += text((a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 8, lens[s], { size: 13, fill: '#1d4ed8' });
  }
  for (const [k, [x, y]] of Object.entries(P)) {
    const dx = x - c, dy = y - c, d = Math.hypot(dx, dy);
    const [ox, oy] = d < 1 ? [10, 18] : [(dx / d) * 15, (dy / d) * 15 + 5];
    body += dot(x, y) + text(x + ox, y + oy, k, { size: 15 });
  }
  return svg(2 * c, 2 * c, body, width);
}

/**
 * Các góc đặt cạnh nhau: list = [{ v: 'O', a: 'A', b: 'B', deg: 90, turn: 0, label: 'Góc 1' }]. Đỉnh v, hai cạnh
 * về phía a, b; deg là số đo góc, turn xoay cả góc. Góc 90° có dấu ô vuông nhỏ ở đỉnh khi `mark` (mặc định có).
 */
export function angles(list, { cell = 0, h = 128 } = {}) {
  // Ô đủ rộng cho góc trải cả hai phía đỉnh (góc tù, góc bẹt): bề ngang hai cạnh + lề 40.
  const span = (g) => { const t = g.turn || 0, xs = [0, Math.cos(rad(t)), Math.cos(rad(t + g.deg))].map(v => v * 76); return Math.max(...xs) - Math.min(...xs); };
  cell = Math.max(cell || 130, ...list.map(g => Math.ceil(span(g) + 44)));
  let body = '';
  list.forEach((g, i) => {
    const L = 76, t = g.turn || 0, left = Math.min(0, Math.cos(rad(t)), Math.cos(rad(t + g.deg))) * -L;
    const vx = i * cell + 20 + Math.min(left, cell - 40 - L), vy = h - 26;
    const A = [vx + L * Math.cos(rad(t)), vy - L * Math.sin(rad(t))];
    const B = [vx + L * Math.cos(rad(t + g.deg)), vy - L * Math.sin(rad(t + g.deg))];
    body += `<path d="M${r1(A[0])} ${r1(A[1])} L${vx} ${vy} L${r1(B[0])} ${r1(B[1])}" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (g.deg === 90 && g.mark !== false) {
      const s = 12, u = [Math.cos(rad(t)), -Math.sin(rad(t))], w = [Math.cos(rad(t + 90)), -Math.sin(rad(t + 90))];
      body += `<path d="M${r1(vx + u[0] * s)} ${r1(vy + u[1] * s)} L${r1(vx + (u[0] + w[0]) * s)} ${r1(vy + (u[1] + w[1]) * s)} L${r1(vx + w[0] * s)} ${r1(vy + w[1] * s)}" fill="none" stroke="#dc2626" stroke-width="1.8"/>`;
    }
    body += dot(vx, vy) + text(vx - 4, vy + 20, g.v, { size: 14 });
    if (g.a) body += dot(...A) + text(A[0] + 8, A[1] - 6, g.a, { size: 14 });
    if (g.b) body += dot(...B) + text(B[0] + (B[0] < vx ? -10 : 8), B[1] - 6, g.b, { size: 14 });
    if (g.label) body += text(i * cell + cell / 2, h + 14, g.label, { size: 13, fill: '#475569' });
  });
  return svg(list.length * cell, h + (list.some(g => g.label) ? 22 : 4), body, Math.min(list.length * cell, 640));
}

/** Thước có vạch mi-li-mét (cm số to, 5 mm vạch vừa). Đoạn thẳng `name` từ vạch `from` (mm) dài `len` mm. */
export function rulerMm(len, { from = 0, cm = 6, name = 'AB' } = {}) {
  const U = 56, x0 = 14, W = x0 * 2 + cm * U;
  let body = `<rect x="2" y="44" width="${W - 4}" height="42" rx="5" fill="#fef9c3" stroke="#a16207" stroke-width="2"/>`;
  for (let i = 0; i <= cm * 10; i++) {
    const x = x0 + (i * U) / 10, h = i % 10 === 0 ? 15 : i % 5 === 0 ? 11 : 6;
    body += `<line x1="${r1(x)}" y1="44" x2="${r1(x)}" y2="${44 + h}" stroke="${INK}" stroke-width="${i % 10 ? 0.8 : 1.6}"/>`;
    if (i % 10 === 0) body += text(x, 76, i / 10, { size: 11, weight: 600 });
  }
  const a = x0 + (from * U) / 10, b = x0 + ((from + len) * U) / 10;
  body += `<line x1="${r1(a)}" y1="32" x2="${r1(b)}" y2="32" stroke="#1d4ed8" stroke-width="3" stroke-linecap="round"/>` + dot(a, 32) + dot(b, 32)
    + text(a, 22, name[0], { size: 14 }) + text(b, 22, name[1], { size: 14 });
  return svg(W, 90, body, Math.min(W * 1.1, 440));
}

/** Nhiệt kế độ C: cột đỏ lên tới `t`, vạch mỗi 1 °C (vạch dài mỗi 5, số mỗi 10), từ min đến max. */
export function thermometer(t, { min = 0, max = 50, label = '' } = {}) {
  const step = 4, top = 30, x = 40, H = (max - min) * step, bot = top + H;
  let body = `<rect x="${x - 9}" y="${top - 8}" width="18" height="${H + 16}" rx="9" fill="#fff" stroke="${INK}" stroke-width="2"/>`
    + `<circle cx="${x}" cy="${bot + 18}" r="14" fill="#ef4444" stroke="${INK}" stroke-width="2"/>`
    + `<rect x="${x - 4}" y="${r1(bot - (t - min) * step)}" width="8" height="${r1((t - min) * step + 12)}" fill="#ef4444"/>`;
  for (let v = min; v <= max; v++) {
    const y = bot - (v - min) * step, len = v % 10 === 0 ? 12 : v % 5 === 0 ? 9 : 5;
    body += `<line x1="${x + 11}" y1="${y}" x2="${x + 11 + len}" y2="${y}" stroke="${INK}" stroke-width="${v % 5 ? 0.8 : 1.4}"/>`;
    if (v % 10 === 0) body += text(x + 40, y + 5, v, { size: 12, weight: 600 });
  }
  body += text(x + 34, 14, '°C', { size: 12, fill: '#475569' });
  if (label) body += text(x, bot + 50, label, { size: 13, fill: '#475569' });
  return svg(96, bot + (label ? 58 : 36), body, 120);
}

/** Bình có vạch mi-li-lít: dung tích cap, vạch mỗi `step` ml (ghi số), nước tới mức ml. */
export function jug(ml, { cap = 1000, step = 100, label = '' } = {}) {
  const top = 14, H = 150, x0 = 30, w = 70, bot = top + H, k = H / cap;
  let body = `<rect x="${x0}" y="${r1(bot - ml * k)}" width="${w}" height="${r1(ml * k)}" fill="#7dd3fc"/>`
    + `<path d="M${x0} ${top - 6} V${bot} H${x0 + w} V${top - 6}" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`
    + `<path d="M${x0 + w} ${top + 6} q18 6 16 36 q-2 26 -16 30" fill="none" stroke="${INK}" stroke-width="3"/>`;
  for (let v = step; v <= cap; v += step) {
    const y = bot - v * k;
    body += `<line x1="${x0}" y1="${r1(y)}" x2="${x0 + 12}" y2="${r1(y)}" stroke="${INK}" stroke-width="1.4"/>`
      + text(x0 - 4, y + 4, v, { size: 10, weight: 600, anchor: 'end' });
  }
  body += text(x0 + w / 2, bot + 16, 'ml', { size: 12, fill: '#475569' });
  if (label) body += text(x0 + w / 2, bot + 32, label, { size: 13, fill: '#475569' });
  return svg(x0 + w + 24, bot + (label ? 38 : 22), body, 160);
}

/**
 * Các khối đặt cạnh nhau (nhận biết, đếm): list = ['cube', 'box', 'cyl', 'ball', 'cone'] hoặc { kind, label }.
 * cube: khối lập phương, box: khối hộp chữ nhật, cyl: khối trụ, ball: khối cầu, cone: khối nón.
 */
export function solids(list, { cell = 96 } = {}) {
  const S = `stroke="${INK}" stroke-width="2" stroke-linejoin="round"`;
  const one = (kind, cx) => {
    const by = 96;
    if (kind === 'cube' || kind === 'box') {
      const w = kind === 'cube' ? 46 : 64, h = kind === 'cube' ? 46 : 32, d = kind === 'cube' ? 18 : 16;
      const x = cx - (w + d) / 2, y = by - h;
      return `<path d="M${x} ${y} h${w} v${h} h${-w} Z" fill="#fde68a" ${S}/>`
        + `<path d="M${x} ${y} l${d} ${-d} h${w} l${-d} ${d} Z" fill="#fef3c7" ${S}/>`
        + `<path d="M${x + w} ${y} l${d} ${-d} v${h} l${-d} ${d} Z" fill="#fcd34d" ${S}/>`;
    }
    if (kind === 'cyl') return `<path d="M${cx - 24} ${by - 52} V${by - 8} A24 8 0 0 0 ${cx + 24} ${by - 8} V${by - 52}" fill="#bbf7d0" ${S}/><ellipse cx="${cx}" cy="${by - 52}" rx="24" ry="8" fill="#dcfce7" ${S}/>`;
    if (kind === 'ball') return `<circle cx="${cx}" cy="${by - 28}" r="28" fill="#fecaca" ${S}/><path d="M${cx - 28} ${by - 28} A28 9 0 0 0 ${cx + 28} ${by - 28}" fill="none" stroke="${INK}" stroke-width="1.2" stroke-dasharray="3 3"/>`;
    if (kind === 'cone') return `<path d="M${cx} ${by - 64} L${cx + 26} ${by - 8} A26 8 0 0 1 ${cx - 26} ${by - 8} Z" fill="#ddd6fe" ${S}/>`;
    throw new Error(`solids: không có khối "${kind}"`);
  };
  let body = '';
  list.forEach((o, i) => {
    const kind = typeof o === 'string' ? o : o.kind, cx = i * cell + cell / 2;
    body += one(kind, cx);
    if (o.label) body += text(cx, 118, o.label, { size: 13, fill: '#475569' });
  });
  // Ít khối thì vẽ to hơn (một khối rộng 150px), nhiều khối vừa 400px.
  return svg(list.length * cell, list.some(o => o.label) ? 124 : 104, body, Math.min(list.length * cell * 1.5, 400));
}
