/**
 * Hình cho đề Kiểm tra theo lộ trình lớp 2: chuỗi SVG tự vẽ, chạy được trong Node (scripts/check-worksheets.mjs).
 * Đồ vật: THINGS của Toán 1 (apple, bird, fish, frog, star, cup, rabbit, carrot, flower, chick, ball…) và ART của
 * Toán 2 (cam, tao, le, chuoi, banh, hoa, sao, ca, lon, trong, bong, bi, hop…).
 * Đồng hồ: kim dừng trước vòng số, không che số nào.
 */
import { THINGS } from '../../../games/grade1Knowledge/things.js';
import { ART, artAt } from '../../../games/grade2Knowledge/art-tap2.js';

const INK = '#1f2937';
const r1 = (v) => Math.round(v * 10) / 10;
const svg = (w, h, body, width = w) => `<svg viewBox="0 0 ${r1(w)} ${r1(h)}" width="${Math.round(width)}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const text = (x, y, t, { size = 15, weight = 700, fill = INK, anchor = 'middle', italic = false } = {}) =>
  `<text x="${r1(x)}" y="${r1(y)}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${italic ? ' font-style="italic"' : ''}>${t}</text>`;
const cross = (x, y, r) => `<path d="M${r1(x - r)} ${r1(y - r)} L${r1(x + r)} ${r1(y + r)} M${r1(x + r)} ${r1(y - r)} L${r1(x - r)} ${r1(y + r)}" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>`;

// Đồ vật riêng của đề lớp 2 (hộp 40 × 40 như ART): vật để cân.
const S2 = `stroke="#3F3A40" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`;
const EXTRA = {
  bi_ngo: `<ellipse cx="20" cy="24" rx="17" ry="13" fill="#FB923C" ${S2}/><path d="M20 11q-6 13 0 26M20 11q6 13 0 26" fill="none" ${S2}/><path d="M20 11q0-6 4-8" fill="none" ${S2}/>`,
  gao: `<path d="M9 10q11-5 22 0l3 24q-14 5-28 0z" fill="#F5F5F4" ${S2}/><path d="M9 10q11 4 22 0" fill="none" ${S2}/><text x="20" y="27" font-size="8" font-weight="800" fill="#B45309" text-anchor="middle">GẠO</text>`,
};

/** Vẽ một đồ vật tâm (x, y), cỡ s. */
export function item(kind, x, y, s) {
  if (EXTRA[kind]) return `<g transform="translate(${r1(x - s / 2)} ${r1(y - s / 2)}) scale(${r1(s / 40 * 100) / 100})">${EXTRA[kind]}</g>`;
  if (THINGS[kind]) return THINGS[kind].draw(x, y, s);
  if (ART[kind]) return artAt(kind, x - s / 2, y - s / 2, s);
  throw new Error(`art: không có đồ vật "${kind}"`);
}

/** n đồ vật xếp lưới `cols` cột; `gone` đồ vật cuối bị gạch chéo. `group`: cứ group đồ vật thì cách ra một chút (đếm theo nhóm). */
export function things(kind, n, { cols = Math.min(n, 10), gone = 0, cell = 40, group = 0 } = {}) {
  const rows = Math.ceil(n / cols);
  const gap = group ? cell * 0.4 : 0;
  const colX = (c) => c * cell + (group ? Math.floor(c / group) * gap : 0) + cell / 2;
  let body = '';
  for (let i = 0; i < n; i++) {
    const x = colX(i % cols), y = Math.floor(i / cols) * cell + cell / 2;
    body += item(kind, x, y, cell * 0.86);
    if (i >= n - gone) body += cross(x, y, cell * 0.32);
  }
  return svg(colX(cols - 1) + cell / 2, rows * cell, body);
}

/** Các bó que tính (mỗi bó 10 que, có dây buộc) và que lẻ: đọc số chục, số đơn vị. */
export function sticks(tens, ones) {
  const W = 34, H = 70;
  let body = '';
  const stick = (x) => `<rect x="${r1(x - 2.5)}" y="4" width="5" height="${H - 8}" rx="2" fill="#FBBF24" stroke="#B45309" stroke-width="1.2"/>`;
  for (let b = 0; b < tens; b++) {
    const cx = b * W + W / 2;
    for (let k = -2; k <= 2; k++) body += stick(cx + k * 4.6);
    body += `<rect x="${r1(cx - 13)}" y="${H / 2 - 4}" width="26" height="8" rx="3" fill="#EF4444" stroke="#991B1B" stroke-width="1.2"/>`;
  }
  const x0 = tens * W + (tens ? 14 : 4);
  for (let i = 0; i < ones; i++) body += stick(x0 + i * 12);
  return svg(x0 + ones * 12 + 4, H, body);
}

/**
 * Tia số: n vạch, vạch i ứng với số from + i × step. `labels[i]`: undefined = hiện số, null = ô trống,
 * chuỗi = chữ hiện trên vạch (vd 'A', '?'). `hide`: mặc định chỉ hiện số ở các vạch có trong `show` (mảng chỉ số).
 */
export function numberLine({ from = 0, step = 1, n = 11, labels = {}, show = null, gap = 44 } = {}) {
  const x0 = 18, y = 30, w = x0 * 2 + (n - 1) * gap + 14;
  let body = `<path d="M6 ${y} H${w - 4} M${w - 12} ${y - 6} L${w - 4} ${y} L${w - 12} ${y + 6}" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  for (let i = 0; i < n; i++) {
    const x = x0 + i * gap;
    body += `<line x1="${x}" y1="${y - 7}" x2="${x}" y2="${y + 7}" stroke="${INK}" stroke-width="2"/>`;
    const lab = labels[i];
    if (lab === null) body += `<rect x="${x - 15}" y="${y + 12}" width="30" height="22" rx="4" fill="#fff" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="3 3"/>`;
    else if (typeof lab === 'string') body += `<circle cx="${x}" cy="${y - 18}" r="10" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>` + text(x, y - 13, lab, { size: 13, fill: '#92400e' });
    if (lab === undefined && (!show || show.includes(i))) body += text(x, y + 28, from + i * step, { size: 14 });
  }
  return svg(w, 66, body);
}

/** Hai hàng đồ vật thẳng cột, có tên ở đầu hàng (nhiều hơn, ít hơn; hơn kém nhau bao nhiêu). */
export function twoRows(nameA, kindA, a, nameB, kindB, b, { cell = 38 } = {}) {
  const lw = Math.max(nameA.length, nameB.length) * 8 + 14;
  let body = text(4, cell / 2 + 5, nameA, { anchor: 'start', size: 14 }) + text(4, cell * 1.6 + 5, nameB, { anchor: 'start', size: 14 });
  for (let i = 0; i < a; i++) body += item(kindA, lw + i * cell + cell / 2, cell / 2, cell * 0.84);
  for (let i = 0; i < b; i++) body += item(kindB, lw + i * cell + cell / 2, cell * 1.6, cell * 0.84);
  return svg(lw + Math.max(a, b) * cell + 2, cell * 2.15, body);
}

// ── Đo lường ────────────────────────────────────────────────────────────────

/** Quả cân có số kg (hình thang xám, có quai). */
function weight(x, base, kg) {
  const w = 36 + String(kg).length * 4, h = 30;
  return `<path d="M${r1(x - 6)} ${r1(base - h - 8)} q6 -8 12 0" fill="none" stroke="#475569" stroke-width="2.4"/>`
    + `<path d="M${r1(x - w / 2 + 4)} ${r1(base - h)} H${r1(x + w / 2 - 4)} L${r1(x + w / 2)} ${base} H${r1(x - w / 2)} Z" fill="#94a3b8" stroke="#334155" stroke-width="1.8" stroke-linejoin="round"/>`
    + text(x, base - 9, `${kg} kg`, { size: 13, fill: '#fff' });
}

/**
 * Cân đĩa. left / right: danh sách đồ đặt lên đĩa, mỗi phần tử là số (quả cân kg) hoặc tên đồ vật
 * (kèm chữ nhỏ: { kind, label }). tilt: 'left' (đĩa trái thấp hơn), 'right', hoặc 0 (thăng bằng).
 */
export function balance(left, right, { tilt = 0 } = {}) {
  const W = 370, cx = W / 2, pivotY = 70, arm = 118;
  const d = tilt === 'left' ? 14 : tilt === 'right' ? -14 : 0;
  const L = { x: cx - arm, y: pivotY + d }, R = { x: cx + arm, y: pivotY - d };
  const panY = (p) => p.y + 52;
  const stack = (list, p) => {
    const base = panY(p) - 2;
    const n = list.length, sp = Math.min(46, 100 / Math.max(1, n - 1));
    return list.map((o, i) => {
      const x = p.x + (i - (n - 1) / 2) * sp;
      if (typeof o === 'number') return weight(x, base, o);
      const kind = typeof o === 'string' ? o : o.kind;
      const big = typeof o === 'object' && o.size ? o.size : 46;
      return item(kind, x, base - big / 2, big) + (o.label ? text(x, panY(p) + 30, o.label, { size: 14, fill: '#92400e' }) : '');
    }).join('');
  };
  const pan = (p) => `<path d="M${p.x} ${p.y} L${p.x - 46} ${panY(p) - 2} M${p.x} ${p.y} L${p.x + 46} ${panY(p) - 2}" stroke="#64748b" stroke-width="1.6"/>`
    + `<path d="M${p.x - 58} ${panY(p) - 2} H${p.x + 58} Q${p.x + 48} ${panY(p) + 12} ${p.x} ${panY(p) + 12} Q${p.x - 48} ${panY(p) + 12} ${p.x - 58} ${panY(p) - 2} Z" fill="#fde68a" stroke="#b45309" stroke-width="2"/>`;
  const body = `<path d="M${cx - 50} 200 H${cx + 50} L${cx + 34} 186 H${cx - 34} Z" fill="#a16207" stroke="#713f12" stroke-width="2"/>`
    + `<rect x="${cx - 6}" y="${pivotY}" width="12" height="118" fill="#ca8a04" stroke="#713f12" stroke-width="2"/>`
    + `<line x1="${L.x}" y1="${L.y}" x2="${R.x}" y2="${R.y}" stroke="#713f12" stroke-width="7" stroke-linecap="round"/>`
    + `<circle cx="${cx}" cy="${pivotY}" r="7" fill="#fde68a" stroke="#713f12" stroke-width="2"/>`
    + pan(L) + pan(R) + stack(left, L) + stack(right, R);
  return svg(W, 206, body, 320);
}

/** Một bình chứa có số lít: kind 'can' (can nhựa), 'ca' (ca có quai), 'chai', 'xo' (xô). */
function vessel(kind, x, base, litres, { fill = '#7dd3fc', label = true } = {}) {
  const lt = `${litres} <tspan font-style="italic">l</tspan>`;
  let g;
  if (kind === 'ca') {
    g = `<path d="M${x - 16} ${base - 44} H${x + 16} L${x + 14} ${base} H${x - 14} Z" fill="#e0f2fe" stroke="${INK}" stroke-width="2"/>`
      + `<path d="M${x - 15} ${base - 30} H${x + 15} L${x + 14} ${base} H${x - 14} Z" fill="${fill}"/>`
      + `<path d="M${x + 16} ${base - 38} q14 2 12 14 q-2 10 -13 9" fill="none" stroke="${INK}" stroke-width="2.4"/>`;
  } else if (kind === 'chai') {
    g = `<path d="M${x - 6} ${base - 62} H${x + 6} V${base - 50} Q${x + 15} ${base - 44} ${x + 15} ${base - 34} V${base} H${x - 15} V${base - 34} Q${x - 15} ${base - 44} ${x - 6} ${base - 50} Z" fill="${fill}" stroke="${INK}" stroke-width="2"/>`
      + `<rect x="${x - 7}" y="${base - 68}" width="14" height="7" rx="2" fill="#f87171" stroke="${INK}" stroke-width="1.6"/>`;
  } else if (kind === 'xo') {
    g = `<path d="M${x - 24} ${base - 46} H${x + 24} L${x + 18} ${base} H${x - 18} Z" fill="${fill}" stroke="${INK}" stroke-width="2"/>`
      + `<path d="M${x - 24} ${base - 46} Q${x} ${base - 80} ${x + 24} ${base - 46}" fill="none" stroke="${INK}" stroke-width="2"/>`;
  } else {
    g = `<path d="M${x - 22} ${base - 56} H${x + 10} L${x + 22} ${base - 44} V${base} H${x - 22} Z" fill="${fill}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`
      + `<rect x="${x + 8}" y="${base - 66}" width="10" height="9" rx="2" fill="#f87171" stroke="${INK}" stroke-width="1.6"/>`
      + `<path d="M${x - 16} ${base - 56} V${base - 66} H${x} V${base - 56}" fill="none" stroke="${INK}" stroke-width="2.4"/>`;
  }
  return g + (label ? text(x, base - 16, lt, { size: 13 }) : '');
}

/** Hàng bình chứa: list = [{ kind: 'can', l: 5 }, …]; `op`: chữ đặt giữa các bình (vd '+'). */
export function vessels(list, { op = '' } = {}) {
  const step = 76;
  const body = list.map((v, i) => vessel(v.kind || 'can', 40 + i * step, 88, v.l, v)
    + (op && i < list.length - 1 ? text(40 + i * step + step / 2, 66, op, { size: 22 }) : '')).join('');
  return svg(list.length * step + 4, 94, body);
}

/** Rót hết một bình sang các ca 1 l: bình `from` và n ca đầy. */
export function pourCups(from, n) {
  let body = vessel(from.kind || 'can', 36, 90, from.l, { label: from.label ?? true });
  body += `<path d="M72 54 H104 M96 46 L104 54 L96 62" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  for (let i = 0; i < n; i++) body += vessel('ca', 134 + i * 46, 90, 1, { label: false }) + text(134 + i * 46, 108, `1 <tspan font-style="italic">l</tspan>`, { size: 12 });
  return svg(134 + n * 46, 114, body);
}

/** Đồng hồ kim: h giờ m phút (m bội của 5). Kim dài dừng trước vòng số. */
export function clock(h, m, { size = 160 } = {}) {
  const R = 60, c = 64, NUM = 42, FS = 13;
  let body = `<circle cx="${c}" cy="${c}" r="${R}" fill="#fff" stroke="#0ea5e9" stroke-width="5"/>`;
  for (let i = 0; i < 60; i++) {
    const a = (i * 6 - 90) * Math.PI / 180, r0 = i % 5 ? R - 6 : R - 9;
    body += `<line x1="${r1(c + r0 * Math.cos(a))}" y1="${r1(c + r0 * Math.sin(a))}" x2="${r1(c + (R - 3) * Math.cos(a))}" y2="${r1(c + (R - 3) * Math.sin(a))}" stroke="${INK}" stroke-width="${i % 5 ? 0.8 : 1.8}"/>`;
  }
  for (let k = 1; k <= 12; k++) {
    const a = (k * 30 - 90) * Math.PI / 180;
    body += text(c + NUM * Math.cos(a), c + NUM * Math.sin(a) + FS * 0.36, k, { size: FS });
  }
  const minLen = NUM - FS * 0.6 - 3, hourLen = minLen * 0.65;
  const ma = (m * 6 - 90) * Math.PI / 180, ha = (((h % 12) + m / 60) * 30 - 90) * Math.PI / 180;
  body += `<line x1="${c}" y1="${c}" x2="${r1(c + hourLen * Math.cos(ha))}" y2="${r1(c + hourLen * Math.sin(ha))}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
    + `<line x1="${c}" y1="${c}" x2="${r1(c + minLen * Math.cos(ma))}" y2="${r1(c + minLen * Math.sin(ma))}" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>`
    + `<circle cx="${c}" cy="${c}" r="4" fill="${INK}"/>`;
  return svg(128, 128, body, size);
}

/** Đồng hồ điện tử: "20:00". */
export function digital(t, { size = 120 } = {}) {
  return svg(120, 50, `<rect x="2" y="2" width="116" height="46" rx="9" fill="#1e293b" stroke="${INK}" stroke-width="2"/>`
    + `<rect x="10" y="9" width="100" height="32" rx="4" fill="#0f172a"/>` + text(60, 34, t, { size: 24, fill: '#4ade80', weight: 800 }), size);
}

/**
 * Tờ lịch một tháng. first: thứ của ngày 1 (0 = Thứ Hai … 6 = Chủ nhật). days: số ngày.
 * mark: các ngày khoanh đỏ. hide: các ngày bị che (ô "?").
 */
export function calendar({ month, first, days, mark = [], hide = [] }) {
  const C = 40, top = 52, heads = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const rows = Math.ceil((first + days) / 7);
  let body = `<rect x="1" y="1" width="${7 * C + 8}" height="${top + rows * C + 8}" rx="8" fill="#fff" stroke="#94a3b8" stroke-width="2"/>`
    + `<rect x="1" y="1" width="${7 * C + 8}" height="26" rx="8" fill="#ef4444"/><rect x="1" y="18" width="${7 * C + 8}" height="9" fill="#ef4444"/>`
    + text(4 + 3.5 * C, 20, `THÁNG ${month}`, { size: 15, fill: '#fff', weight: 800 });
  heads.forEach((t, i) => { body += text(4 + i * C + C / 2, 44, t, { size: 13, fill: i === 6 ? '#dc2626' : '#475569' }); });
  for (let d = 1; d <= days; d++) {
    const k = first + d - 1, x = 4 + (k % 7) * C + C / 2, y = top + Math.floor(k / 7) * C + C / 2 + 2;
    if (hide.includes(d)) { body += `<rect x="${x - 13}" y="${y - 13}" width="26" height="26" rx="5" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>` + text(x, y + 5, '?', { size: 15, fill: '#92400e' }); continue; }
    if (mark.includes(d)) body += `<circle cx="${x}" cy="${y}" r="14" fill="none" stroke="#dc2626" stroke-width="2.4"/>`;
    body += text(x, y + 5, d, { size: 14, weight: 600, fill: k % 7 === 6 ? '#dc2626' : INK });
  }
  return svg(7 * C + 10, top + rows * C + 10, body, 290);
}

// ── Hình học ────────────────────────────────────────────────────────────────

const dot = (x, y) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="3.6" fill="${INK}"/>`;

/**
 * Các điểm có tên, nối bằng các đoạn: pts = { A: [x, y], … }, segs = ['AB', 'BC'] (đoạn thẳng),
 * lines = ['AB'] (đường thẳng kéo dài hai phía), lens = { AB: '3 cm' } (số đo ghi giữa đoạn),
 * pos = { A: 'n' | 's' | 'e' | 'w' | 'ne' … } (chỗ đặt tên, mặc định trên).
 */
export function geo({ pts, segs = [], lines = [], lens = {}, pos = {}, w = 300, h = 140, width = w, fills = [] }) {
  const P = (k) => pts[k];
  let body = fills.map(f => `<path d="M${f.pts.map(k => P(k).join(' ')).join(' L')} Z" fill="${f.color}" stroke="none"/>`).join('');
  for (const l of lines) {
    const [a, b] = [P(l[0]), P(l[1])], dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len, ext = 40;
    body += `<line x1="${r1(a[0] - ux * ext)}" y1="${r1(a[1] - uy * ext)}" x2="${r1(b[0] + ux * ext)}" y2="${r1(b[1] + uy * ext)}" stroke="${INK}" stroke-width="2"/>`;
  }
  for (const s of segs) {
    const [a, b] = [P(s[0]), P(s[1])];
    body += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`;
    if (lens[s]) {
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy);
      let nx = -dy / len, ny = dx / len;
      if (ny > 0 || (ny === 0 && nx > 0)) { nx = -nx; ny = -ny; }
      body += text(mx + nx * 20, my + ny * 20 + 5, lens[s], { size: 13, fill: '#1d4ed8' });
    }
  }
  const OFF = { n: [0, -10], s: [0, 20], e: [12, 5], w: [-12, 5], ne: [10, -8], nw: [-10, -8], se: [10, 18], sw: [-10, 18] };
  for (const [k, [x, y]] of Object.entries(pts)) {
    const [ox, oy] = OFF[pos[k] || 'n'];
    body += dot(x, y) + text(x + ox, y + oy, k, { size: 15 });
  }
  return svg(w, h, body, width);
}

/** Hình phẳng tự do (đếm hình): polys = [{ pts: [[x, y], …], color }], vẽ chung một khung. */
export function polys(list, { w = 300, h = 120, width = w } = {}) {
  const body = list.map(p => `<path d="M${p.pts.map(q => q.join(' ')).join(' L')} Z" fill="${p.color || '#e0f2fe'}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`).join('');
  return svg(w, h, body, width);
}

/** Đoạn thẳng đặt trên thước kẻ: bắt đầu ở vạch `from`, dài `len` cm. */
export function ruler(len, { from = 0, cm = 12, name = 'AB' } = {}) {
  const U = 24, x0 = 14, W = x0 * 2 + cm * U;
  let body = `<rect x="2" y="44" width="${W - 4}" height="40" rx="5" fill="#fef9c3" stroke="#a16207" stroke-width="2"/>`;
  for (let i = 0; i <= cm * 2; i++) {
    const x = x0 + (i * U) / 2, big = i % 2 === 0;
    body += `<line x1="${x}" y1="44" x2="${x}" y2="${44 + (big ? 14 : 8)}" stroke="${INK}" stroke-width="${big ? 1.6 : 1}"/>`;
    if (big) body += text(x, 74, i / 2, { size: 11, weight: 600 });
  }
  const a = x0 + from * U, b = x0 + (from + len) * U;
  body += `<line x1="${a}" y1="34" x2="${b}" y2="34" stroke="#1d4ed8" stroke-width="3" stroke-linecap="round"/>` + dot(a, 34) + dot(b, 34)
    + text(a, 22, name[0], { size: 14 }) + text(b, 22, name[1], { size: 14 });
  return svg(W, 88, body, Math.min(W, 320));
}
