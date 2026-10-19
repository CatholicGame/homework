/**
 * Hình cho đề Kiểm tra theo lộ trình lớp 5: chuỗi SVG tự vẽ, chạy được trong Node (scripts/check-worksheets.mjs).
 * Dùng lại hình của lớp 2, 3, 4 (điểm và đoạn thẳng, hình phẳng, hình tròn, sơ đồ tổng và hiệu) và thêm:
 * băng phân số, bảng 100 ô vuông (phần trăm, phần trăm của số thập phân), tia số thập phân,
 * hình tam giác có đường cao, hình thang có đường cao, hình tròn có bán kính / đường kính ghi số đo.
 */
export { item, things, geo, polys, circle, angles } from '../g3/art.js';
export { sumDiff } from '../g4/art.js';

const INK = '#1f2937';
const BLUE = '#1d4ed8';
const FILL = '#93c5fd';
const r1 = (v) => Math.round(v * 10) / 10;
const svg = (w, h, body, width = w) => `<svg viewBox="0 0 ${r1(w)} ${r1(h)}" width="${Math.round(width)}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const text = (x, y, t, { size = 15, weight = 700, fill = INK, anchor = 'middle' } = {}) =>
  `<text x="${r1(x)}" y="${r1(y)}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${t}</text>`;
const dot = (x, y) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="3.6" fill="${INK}"/>`;
const line = (a, b, { color = INK, w = 2.4, dash = '' } = {}) =>
  `<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(b[0])}" y2="${r1(b[1])}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
/** Số in kiểu Việt Nam: 0.25 → "0,25". */
const vn = (v) => String(Math.round(v * 1e6) / 1e6).replace('.', ',');

/**
 * Các băng giấy chia đều, tô màu một số phần: list = [{ n: 4, k: 3, label: 'A' }]. Các băng cùng chiều dài
 * (so sánh phân số bằng mắt). Băng `n` lớn quá 20 phần thì vạch mảnh hơn.
 */
export function fracBars(list, { w = 300 } = {}) {
  const x0 = list.some(b => b.label) ? 40 : 8, bh = 30, gap = 14;
  let body = '';
  list.forEach((b, i) => {
    const y = 8 + i * (bh + gap), u = w / b.n;
    for (let j = 0; j < b.n; j++) {
      body += `<rect x="${r1(x0 + j * u)}" y="${y}" width="${r1(u)}" height="${bh}" fill="${j < b.k ? FILL : '#fff'}" stroke="${INK}" stroke-width="${b.n > 20 ? 1 : 1.8}"/>`;
    }
    if (b.label) body += text(x0 - 12, y + bh / 2 + 5, b.label, { anchor: 'end' });
  });
  return svg(x0 + w + 8, 8 + list.length * (bh + gap) - gap + 8, body, Math.min(380, x0 + w + 8));
}

/** Một hình vuông lớn chia 100 ô (hoặc 10 cột khi `tenths`), tô k ô (k cột) đầu tiên theo hàng. */
export function hundred(k, { tenths = false, size = 170 } = {}) {
  const u = size / 10;
  let body = '';
  if (tenths) {
    for (let j = 0; j < 10; j++) body += `<rect x="${r1(6 + j * u)}" y="6" width="${r1(u)}" height="${size}" fill="${j < k ? FILL : '#fff'}" stroke="${INK}" stroke-width="1.2"/>`;
  } else {
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        body += `<rect x="${r1(6 + c * u)}" y="${r1(6 + r * u)}" width="${r1(u)}" height="${r1(u)}" fill="${r * 10 + c < k ? FILL : '#fff'}" stroke="#64748b" stroke-width="0.8"/>`;
      }
    }
  }
  body += `<rect x="6" y="6" width="${size}" height="${size}" fill="none" stroke="${INK}" stroke-width="2.2"/>`;
  return svg(size + 12, size + 12, body, size + 12);
}

/**
 * Tia số thập phân: n vạch, vạch i ứng với số from + i × step (in dấu phẩy). `labels[i]`: chuỗi = chữ trên vạch
 * (A, B, ?), null = ô trống dưới vạch; `show` = chỉ số các vạch hiện số (mặc định: vạch đầu, vạch cuối).
 */
export function decLine({ from = 0, step = 0.1, n = 11, labels = {}, show = null, gap = 30 } = {}) {
  const x0 = 22, y = 32, w = x0 * 2 + (n - 1) * gap + 10;
  const showAt = show || [0, n - 1];
  let body = `<path d="M6 ${y} H${w - 4} M${w - 12} ${y - 6} L${w - 4} ${y} L${w - 12} ${y + 6}" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  for (let i = 0; i < n; i++) {
    const x = x0 + i * gap, lab = labels[i];
    body += `<line x1="${x}" y1="${y - 7}" x2="${x}" y2="${y + 7}" stroke="${INK}" stroke-width="${showAt.includes(i) ? 2.2 : 1.4}"/>`;
    if (lab === null) body += `<rect x="${x - 18}" y="${y + 12}" width="36" height="22" rx="4" fill="#fff" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="3 3"/>`;
    else if (typeof lab === 'string') body += `<circle cx="${x}" cy="${y - 19}" r="10" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>` + text(x, y - 14, lab, { size: 13, fill: '#92400e' });
    if (lab === undefined && showAt.includes(i)) body += text(x, y + 28, vn(from + i * step), { size: 13 });
  }
  return svg(w, 68, body, Math.min(420, w));
}

/** Dấu góc vuông nhỏ ở đỉnh p, hai cạnh về phía a, b. */
function rightMark(p, a, b, s = 10) {
  const u = (q) => { const dx = q[0] - p[0], dy = q[1] - p[1], d = Math.hypot(dx, dy); return [dx / d, dy / d]; };
  const [ax, ay] = u(a), [bx, by] = u(b);
  const p1 = [p[0] + ax * s, p[1] + ay * s], p2 = [p1[0] + bx * s, p1[1] + by * s], p3 = [p[0] + bx * s, p[1] + by * s];
  return `<path d="M${r1(p1[0])} ${r1(p1[1])} L${r1(p2[0])} ${r1(p2[1])} L${r1(p3[0])} ${r1(p3[1])}" fill="none" stroke="${INK}" stroke-width="1.4"/>`;
}

/** Tên điểm đặt ra phía ngoài hình, theo hướng từ tâm hình tới điểm. */
function names(P, center) {
  return Object.entries(P).map(([k, [x, y]]) => {
    const dx = x - center[0], dy = y - center[1], d = Math.hypot(dx, dy) || 1;
    return dot(x, y) + text(x + (dx / d) * 15, y + (dy / d) * 15 + 5, k);
  }).join('');
}

/**
 * Hình tam giác ABC, đáy BC nằm ngang, đường cao AH nét đứt (có dấu góc vuông).
 * kind: 'acute' (H trong đáy), 'right' (góc vuông tại B, AB là đường cao), 'obtuse' (H ngoài đáy, kéo dài đáy nét đứt).
 * base, h: số đo ghi trên hình (chuỗi, vd '8 cm'); bỏ trống thì không ghi.
 */
export function triangle({ kind = 'acute', base = '', h = '', names: nm = ['A', 'B', 'C', 'H'], width = 300 } = {}) {
  const B = [50, 150], C = [250, 150];
  const A = kind === 'right' ? [50, 30] : kind === 'obtuse' ? [-10 + 50, 30] : [110, 30];
  if (kind === 'obtuse') { B[0] = 110; C[0] = 270; A[0] = 40; }
  const H = [A[0], 150];
  let body = `<path d="M${A.join(' ')} L${B.join(' ')} L${C.join(' ')} Z" fill="#e0f2fe" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`;
  if (kind === 'obtuse') body += line(H, B, { w: 1.6, dash: '5 4' });
  if (kind !== 'right') body += line(A, H, { color: '#dc2626', w: 2, dash: '6 4' });
  body += rightMark(H, A, kind === 'obtuse' ? B : C);
  if (base) body += text((B[0] + C[0]) / 2, 172, base, { size: 13, fill: BLUE });
  if (h) body += text(A[0] + (kind === 'obtuse' ? -8 : 10), 98, h, { size: 13, fill: '#dc2626', anchor: kind === 'obtuse' ? 'end' : 'start' });
  const P = { [nm[0]]: A, [nm[1]]: B, [nm[2]]: C };
  if (kind !== 'right') P[nm[3]] = H;
  body += names(P, [(A[0] + B[0] + C[0]) / 3, 110]);
  return svg(310, 185, body, width);
}

/**
 * Hình thang ABCD: đáy bé AB ở trên, đáy lớn DC ở dưới, đường cao AH nét đứt. `right`: hình thang vuông
 * (cạnh AD vuông góc với hai đáy, AD là chiều cao). top, bottom, h: số đo ghi trên hình.
 */
export function trapezoid({ top = '', bottom = '', h = '', right = false, width = 300 } = {}) {
  const D = [30, 150], C = [280, 150];
  const A = right ? [30, 40] : [90, 40], B = right ? [190, 40] : [220, 40];
  const H = [A[0], 150];
  let body = `<path d="M${A.join(' ')} L${B.join(' ')} L${C.join(' ')} L${D.join(' ')} Z" fill="#e0f2fe" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`;
  if (!right) body += line(A, H, { color: '#dc2626', w: 2, dash: '6 4' });
  body += rightMark(H, A, C);
  if (top) body += text((A[0] + B[0]) / 2, 30, top, { size: 13, fill: BLUE });
  if (bottom) body += text((D[0] + C[0]) / 2, 172, bottom, { size: 13, fill: BLUE });
  if (h) body += text(A[0] + 8, 100, h, { size: 13, fill: '#dc2626', anchor: 'start' });
  const P = { A, B, C, D };
  if (!right) P.H = H;
  body += names(P, [155, 95]);
  return svg(310, 185, body, width);
}

/** Hình tròn tâm O có một bán kính (r) hoặc một đường kính (d) ghi số đo. */
export function round({ r = '', d = '', size = 180 } = {}) {
  const c = 90, R = 66;
  let body = `<circle cx="${c}" cy="${c}" r="${R}" fill="#e0f2fe" stroke="${INK}" stroke-width="2.4"/>`;
  if (d) body += line([c - R, c], [c + R, c], { color: BLUE }) + dot(c - R, c) + dot(c + R, c) + text(c - R - 12, c + 5, 'A') + text(c + R + 12, c + 5, 'B') + text(c, c - 10, d, { size: 13, fill: BLUE });
  else body += line([c, c], [c + R, c], { color: BLUE }) + dot(c + R, c) + text(c + R + 12, c + 5, 'A') + (r ? text(c + R / 2, c - 10, r, { size: 13, fill: BLUE }) : '');
  body += dot(c, c) + text(c, c + 20, 'O');
  return svg(2 * c, 2 * c, body, size);
}
