/**
 * Hình cho đề Kiểm tra theo lộ trình lớp 4: chuỗi SVG tự vẽ, chạy được trong Node (scripts/check-worksheets.mjs).
 * Dùng lại hình của lớp 2, 3 (tia số, cân, đồng hồ, điểm và đoạn thẳng, đường thẳng, hình phẳng, góc, thước) và thêm:
 * thước đo góc đặt trên một góc, sơ đồ đoạn thẳng của bài toán tổng và hiệu.
 */
export { item, things, numberLine, balance, clock, geo, polys, ruler, angles, rulerMm, circle } from '../g3/art.js';

const INK = '#1f2937';
const r1 = (v) => Math.round(v * 10) / 10;
const svg = (w, h, body, width = w) => `<svg viewBox="0 0 ${r1(w)} ${r1(h)}" width="${Math.round(width)}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const text = (x, y, t, { size = 15, weight = 700, fill = INK, anchor = 'middle' } = {}) =>
  `<text x="${r1(x)}" y="${r1(y)}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${t}</text>`;
const dot = (x, y) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="3.6" fill="${INK}"/>`;
const rad = (d) => (d * Math.PI) / 180;

/**
 * Thước đo góc nửa hình tròn đặt lên góc đỉnh O: cạnh OA nằm trên vạch 0° (bên phải), cạnh OB ở vạch `deg`.
 * Vạch mỗi 5°, số trên hai vòng (ngoài mỗi 10° từ phải sang trái, trong mỗi 20° ngược lại) như thước thật. names = [O, A, B].
 */
export function protractor(deg, { names = ['O', 'A', 'B'] } = {}) {
  const R = 130, cx = 160, cy = 160;
  let body = `<path d="M${cx - R} ${cy} A${R} ${R} 0 0 1 ${cx + R} ${cy} Z" fill="#e0f2fe" fill-opacity="0.85" stroke="#0369a1" stroke-width="2"/>`;
  for (let d = 0; d <= 180; d += 5) {
    const big = d % 10 === 0, r0 = R - (big ? 13 : 7);
    const x0 = cx + r0 * Math.cos(rad(d)), y0 = cy - r0 * Math.sin(rad(d)), x1 = cx + R * Math.cos(rad(d)), y1 = cy - R * Math.sin(rad(d));
    body += `<line x1="${r1(x0)}" y1="${r1(y0)}" x2="${r1(x1)}" y2="${r1(y1)}" stroke="#0369a1" stroke-width="${big ? 1.4 : 0.8}"/>`;
    // Hai vòng số như thước thật: vòng ngoài 0° ở bên phải, vòng trong (nhạt hơn) 0° ở bên trái.
    // Vòng ngoài ghi số mỗi 10°, vòng trong mỗi 20° (đủ để nhận ra đọc nhầm vòng mà không rối).
    if (big && d % 180) body += text(cx + (R - 24) * Math.cos(rad(d)), cy - (R - 24) * Math.sin(rad(d)) + 4, d, { size: 10, weight: 600, fill: '#0369a1' });
    if (d % 20 === 0 && d % 180) body += text(cx + (R - 44) * Math.cos(rad(d)), cy - (R - 44) * Math.sin(rad(d)) + 4, 180 - d, { size: 9, weight: 500, fill: '#64748b' });
  }
  const L = R + 22;
  const A = [cx + L, cy], B = [cx + L * Math.cos(rad(deg)), cy - L * Math.sin(rad(deg))];
  body += `<path d="M${r1(A[0])} ${r1(A[1])} L${cx} ${cy} L${r1(B[0])} ${r1(B[1])}" fill="none" stroke="#dc2626" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  body += dot(cx, cy) + text(cx, cy + 20, names[0]) + dot(...A) + text(A[0], A[1] + 20, names[1]) + dot(...B)
    + text(B[0] + (B[0] < cx ? -12 : 12), B[1] - 4, names[2]);
  return svg(2 * cx + 30, cy + 28, body, 340);
}

/**
 * Sơ đồ tổng và hiệu: hai đoạn "Số lớn", "Số bé", đoạn lớn dài hơn đúng phần hiệu (vạch đứt), dấu ngoặc phải ghi
 * tổng, ghi hiệu trên phần hơn. names = [tên số lớn, tên số bé].
 */
export function sumDiff({ sum = '?', diff = '?', names = ['Số lớn', 'Số bé'], small = 0.6 } = {}) {
  const x0 = 96, W = 220, ws = W * small, y1 = 34, y2 = 84;
  const bar = (y, w) => `<line x1="${x0}" y1="${y}" x2="${x0 + w}" y2="${y}" stroke="#1d4ed8" stroke-width="3"/>`
    + `<line x1="${x0}" y1="${y - 8}" x2="${x0}" y2="${y + 8}" stroke="${INK}" stroke-width="2"/><line x1="${x0 + w}" y1="${y - 8}" x2="${x0 + w}" y2="${y + 8}" stroke="${INK}" stroke-width="2"/>`;
  let body = text(x0 - 10, y1 + 5, names[0], { anchor: 'end', size: 14 }) + text(x0 - 10, y2 + 5, names[1], { anchor: 'end', size: 14 });
  body += bar(y1, W) + bar(y2, ws);
  body += `<line x1="${x0 + ws}" y1="${y1 - 8}" x2="${x0 + ws}" y2="${y1 + 8}" stroke="${INK}" stroke-width="1.6"/>`
    + `<line x1="${x0 + ws}" y1="${y1 + 8}" x2="${x0 + ws}" y2="${y2 - 8}" stroke="#64748b" stroke-width="1.4" stroke-dasharray="4 4"/>`;
  body += `<path d="M${x0 + ws + 2} ${y1 - 14} Q${x0 + (ws + W) / 2} ${y1 - 26} ${x0 + W - 2} ${y1 - 14}" fill="none" stroke="#dc2626" stroke-width="1.8"/>`
    + text(x0 + (ws + W) / 2, y1 - 26, diff, { size: 13, fill: '#dc2626' });
  const bx = x0 + W + 16;
  body += `<path d="M${bx} ${y1} Q${bx + 12} ${y1} ${bx + 12} ${(y1 + y2) / 2 - 6} L${bx + 20} ${(y1 + y2) / 2} L${bx + 12} ${(y1 + y2) / 2 + 6} Q${bx + 12} ${y2} ${bx} ${y2}" fill="none" stroke="#dc2626" stroke-width="1.8"/>`
    + text(bx + 26, (y1 + y2) / 2 + 5, sum, { anchor: 'start', size: 13, fill: '#dc2626' });
  return svg(bx + 26 + String(sum).length * 8 + 10, 100, body, 420);
}
