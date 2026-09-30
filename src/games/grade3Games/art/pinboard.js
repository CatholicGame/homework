/**
 * Hình vẽ trò Kiến trúc sư bảng ghim: bảng gỗ có lưới đinh, ghim đầu tròn, dây chun, compa, giấy ô vuông để tô.
 * Nét và màu theo bộ vẽ lại của vở bài tập (INK như art/detective.js). Toạ độ là toạ độ bảng (viewBox của pinboard.js).
 */

import { INK, sub, add, mul, len, unit } from './detective.js';

const f1 = (v) => (Math.round(v * 10) / 10).toString();
const pt = (p) => `${f1(p[0])} ${f1(p[1])}`;
const FONT = 'Baloo 2, Quicksand, sans-serif';

/** Cạnh một ô của lưới đinh (đơn vị bảng) và lề từ mép bảng tới hàng đinh ngoài cùng. */
export const CELL = 40;
export const MARGIN = 30;

/** Màu dây chun / ghim theo thứ tự dùng. */
export const BAND = '#F43F5E';
export const PIN_COLORS = ['#F97316', '#3B82F6', '#22C55E', '#A855F7', '#EAB308'];
/** Màu tô ô (cấp trang trí) — cùng bảng màu với vở bài tập. */
export const PAINTS = ['#F07167', '#6FB7EA', '#7BCB8B', '#FFD166', '#B9A7F0', '#F4A259'];

/** Bảng gỗ cols × rows ô: khung gỗ, vân gỗ nhạt, vạch lưới mờ (để đếm ô) và đinh ở mọi mắt lưới. */
export function woodBoard(cols, rows) {
  const W = cols * CELL + 2 * MARGIN, H = rows * CELL + 2 * MARGIN;
  const grain = [0.22, 0.47, 0.71, 0.9].map((t, i) => {
    const y = H * t;
    return `M14 ${f1(y)} C ${f1(W * 0.3)} ${f1(y - 7 - i)}, ${f1(W * 0.6)} ${f1(y + 8)}, ${f1(W - 14)} ${f1(y - 3)}`;
  }).join(' ');
  let grid = '';
  for (let i = 0; i <= cols; i++) grid += `M${MARGIN + i * CELL} ${MARGIN} V${MARGIN + rows * CELL} `;
  for (let j = 0; j <= rows; j++) grid += `M${MARGIN} ${MARGIN + j * CELL} H${MARGIN + cols * CELL} `;
  let pegs = '';
  for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) {
    const x = MARGIN + i * CELL, y = MARGIN + j * CELL;
    pegs += `<circle cx="${x}" cy="${y}" r="5" fill="#C3CAD3" stroke="${INK}" stroke-width="1.4"/><circle cx="${x - 1.6}" cy="${y - 1.6}" r="1.6" fill="#fff" opacity="0.85"/>`;
  }
  return `<rect x="3" y="3" width="${W - 6}" height="${H - 6}" rx="16" fill="#D9A96A" stroke="#8A5A2B" stroke-width="6"/>
    <rect x="11" y="11" width="${W - 22}" height="${H - 22}" rx="10" fill="#F3D9A8"/>
    <path d="${grain}" fill="none" stroke="#E6C48D" stroke-width="3" stroke-linecap="round"/>
    <path d="${grid}" stroke="#D8B57C" stroke-width="1.3"/>${pegs}`;
}

/** Ghim đầu tròn cắm ở đinh (x, y). */
export function pinSvg(x, y, color, { ghost = false } = {}) {
  return `<g${ghost ? ' opacity="0.45"' : ''}><ellipse cx="${f1(x + 3)}" cy="${f1(y + 4)}" rx="9" ry="5" fill="#000" opacity="0.18"/>
    <circle cx="${f1(x)}" cy="${f1(y)}" r="10.5" fill="${color}" stroke="${INK}" stroke-width="2.2"/>
    <circle cx="${f1(x - 3.6)}" cy="${f1(y - 3.6)}" r="3.2" fill="#fff" opacity="0.8"/></g>`;
}

/** Ghim rời (bay từ hộp ghim ra bảng) — khung vuông vừa khít. */
export function pinIcon(color, size = '100%') {
  return `<svg viewBox="-14 -14 28 28" width="${size}" height="${size}" aria-hidden="true" style="display:block;overflow:visible">${pinSvg(0, 0, color)}</svg>`;
}

/** Chữ tên điểm có viền trắng. */
export function tag(p, s, { size = 20, color = INK } = {}) {
  return `<text x="${f1(p[0])}" y="${f1(p[1] + size * 0.36)}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="${size}" fill="${color}" stroke="#fff" stroke-width="4.5" paint-order="stroke" style="pointer-events:none">${s}</text>`;
}

/** Dây chun qua các điểm (đã là toạ độ bảng); closed: khép thành hình. */
export function bandSvg(P, { closed = true, color = BAND, fill = true } = {}) {
  if (P.length < 2) return '';
  const d = `M${P.map(pt).join(' L')}${closed && P.length > 2 ? ' Z' : ''}`;
  return `<path d="${d}" fill="${closed && fill && P.length > 2 ? color : 'none'}" fill-opacity="0.13" stroke="${INK}" stroke-width="8.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.3"/>
    <path d="${d}" fill="none" stroke="${color}" stroke-width="5.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="${d}" fill="none" stroke="#fff" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round" opacity="0.45" transform="translate(-1 -1.4)"/>`;
}

/** Cung tròn tâm C bán kính r từ góc a tới b (radian, b > a, góc đo theo toạ độ màn hình). Đủ một vòng thì vẽ cả đường tròn. */
export function arcPath(C, r, a, b) {
  const at = (t) => add(C, [r * Math.cos(t), r * Math.sin(t)]);
  if (b - a >= 2 * Math.PI - 1e-3) {
    const p = at(a), q = at(a + Math.PI);
    return `M${pt(p)} A${f1(r)} ${f1(r)} 0 1 1 ${pt(q)} A${f1(r)} ${f1(r)} 0 1 1 ${pt(p)} Z`;
  }
  if (b - a < 1e-3) return '';
  return `M${pt(at(a))} A${f1(r)} ${f1(r)} 0 ${b - a > Math.PI ? 1 : 0} 1 ${pt(at(b))}`;
}

/**
 * Compa: mũi nhọn ở C, đầu bút chì ở P, khớp nhô cao h phía bên trái hướng C → P (xoay compa quanh tâm thì cả compa
 * xoay theo, khớp luôn ở gần tâm nên compa không thò ra ngoài bảng). Thân compa [data-turn] và đầu bút [data-tip] là
 * chỗ nắm: kéo đầu bút ra xa / lại gần tâm để mở compa, kéo vòng quanh tâm để vẽ. Trả về chuỗi SVG.
 */
export function compassSvg(C, P, h = 58) {
  const v = sub(P, C), d = len(v);
  const u = d > 1e-6 ? mul(v, 1 / d) : [1, 0];
  const n = [u[1], -u[0]];
  const H = add(add(C, mul(u, d / 2)), mul(n, h));
  const leg = (A, B, w, color) => `<path d="M${pt(A)} L${pt(B)}" stroke="${INK}" stroke-width="${w + 3}" stroke-linecap="round"/><path d="M${pt(A)} L${pt(B)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
  // Chân kim: thanh kim loại, cuối là mũi kim nhỏ cắm vào đinh.
  const nd = unit(sub(C, H)), Nb = sub(C, mul(nd, 11));
  // Chân bút: nửa trên kim loại, nửa dưới là cây bút chì (thân vàng, đầu gỗ, ngòi chì).
  const pd = unit(sub(P, H)), Lp = len(sub(P, H));
  const Q = add(H, mul(pd, Lp * 0.42)), Cone = sub(P, mul(pd, 15)), perp = [-pd[1], pd[0]];
  const cone = [add(Cone, mul(perp, 5.5)), P, sub(Cone, mul(perp, 5.5))];
  const lead = [add(sub(P, mul(pd, 5.5)), mul(perp, 2.1)), P, sub(sub(P, mul(pd, 5.5)), mul(perp, 2.1))];
  const top = add(H, mul(n, 16));
  return `<g class="g3p-compass">
    <g data-turn>
      <path d="M${pt(H)} L${pt(C)} M${pt(H)} L${pt(P)}" stroke="transparent" stroke-width="26" stroke-linecap="round"/>
      ${leg(H, Nb, 6, '#94A3B8')}
      <path d="M${pt(Nb)} L${pt(C)}" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>
      ${leg(H, Q, 6, '#94A3B8')}
      ${leg(Q, Cone, 10, '#FACC15')}
      <polygon points="${cone.map(pt).join(' ')}" fill="#F5D0A9" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
      <polygon points="${lead.map(pt).join(' ')}" fill="#334155"/>
      ${leg(H, top, 5, '#64748B')}
      <circle cx="${f1(top[0])}" cy="${f1(top[1])}" r="5" fill="#F97316" stroke="${INK}" stroke-width="1.5"/>
      <circle cx="${f1(H[0])}" cy="${f1(H[1])}" r="8" fill="#CBD5E1" stroke="${INK}" stroke-width="2"/>
    </g>
    <g data-tip><circle cx="${f1(P[0])}" cy="${f1(P[1])}" r="24" fill="transparent"/><circle class="g3p-tipdot" cx="${f1(P[0])}" cy="${f1(P[1])}" r="7" fill="none" stroke="#2563EB" stroke-width="2.5"/></g>
  </g>`;
}

/** Compa nhỏ cho hộp đồ nghề / cách chơi. */
export function compassIcon(size = 48) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true" style="display:block;overflow:visible">${compassSvg([22, 90], [80, 90], 62).replace(/data-(turn|tip)/g, '')}</svg>`;
}

/** Bảng ghim nhỏ có dây chun hình tam giác — biểu tượng trò chơi. */
export function pinboardIcon(size = 56) {
  let pegs = '';
  for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) pegs += `<circle cx="${16 + i * 16}" cy="${16 + j * 16}" r="3" fill="#C3CAD3" stroke="${INK}" stroke-width="1"/>`;
  return `<svg width="${size}" height="${size}" viewBox="0 0 80 80" aria-hidden="true"><rect x="3" y="3" width="74" height="74" rx="12" fill="#F3D9A8" stroke="#8A5A2B" stroke-width="5"/>${pegs}
    <path d="M16 64 L64 64 L64 16 Z" fill="${BAND}" fill-opacity="0.15" stroke="${BAND}" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="16" cy="64" r="6" fill="#F97316" stroke="${INK}" stroke-width="1.5"/><circle cx="64" cy="64" r="6" fill="#3B82F6" stroke="${INK}" stroke-width="1.5"/><circle cx="64" cy="16" r="6" fill="#22C55E" stroke="${INK}" stroke-width="1.5"/></svg>`;
}

/** Tờ giấy vẽ trang trí: khung gỗ mỏng + nền trắng (x, y, cols × rows ô cạnh c). Vạch ô vẽ riêng (paperLines) để đè lên ô tô nền. */
export function paperSvg(x, y, cols, rows, c) {
  return `<rect x="${f1(x - 5)}" y="${f1(y - 5)}" width="${f1(cols * c + 10)}" height="${f1(rows * c + 10)}" rx="8" fill="#D9A96A" stroke="#8A5A2B" stroke-width="3"/>
    <rect x="${f1(x)}" y="${f1(y)}" width="${f1(cols * c)}" height="${f1(rows * c)}" fill="#FFFFFF"/>`;
}

/** Vạch ô vuông của tờ giấy. */
export function paperLines(x, y, cols, rows, c) {
  let d = '';
  for (let i = 0; i <= cols; i++) d += `M${f1(x + i * c)} ${f1(y)} V${f1(y + rows * c)} `;
  for (let j = 0; j <= rows; j++) d += `M${f1(x)} ${f1(y + j * c)} H${f1(x + cols * c)} `;
  return `<path d="${d}" stroke="#93C5FD" stroke-width="1.4"/>`;
}

/** Một ô tô màu (hơi lõm vào trong để lưới vẫn thấy rõ). */
export function cellSvg(x, y, c, color, extra = '') {
  return `<rect x="${f1(x + 2)}" y="${f1(y + 2)}" width="${f1(c - 4)}" height="${f1(c - 4)}" rx="4" fill="${color}" stroke="${INK}" stroke-width="1.6" ${extra}/>`;
}
