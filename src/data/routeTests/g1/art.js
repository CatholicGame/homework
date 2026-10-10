/**
 * Hình cho đề Kiểm tra theo lộ trình lớp 1: chuỗi SVG tự vẽ (đồ vật của ../../../games/grade1Knowledge/things.js).
 * Bé lớp 1 đọc chưa nhiều: hình to, rõ, đếm được.
 */
import { thing } from '../../../games/grade1Knowledge/things.js';

const INK = '#1f2937';
const CELL = 46;
const svg = (w, h, body, width = w) => `<svg viewBox="0 0 ${w} ${h}" width="${Math.round(width)}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const cross = (x, y, r) => `<path d="M${x - r} ${y - r} L${x + r} ${y + r} M${x + r} ${y - r} L${x - r} ${y + r}" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>`;

/** n đồ vật xếp lưới `cols` cột; `gone` đồ vật cuối bị gạch chéo (bay đi, bị ăn mất…). */
export function things(kind, n, { cols = Math.min(n, 5), gone = 0 } = {}) {
  const rows = Math.ceil(n / cols);
  let body = '';
  for (let i = 0; i < n; i++) {
    const x = (i % cols) * CELL + CELL / 2, y = Math.floor(i / cols) * CELL + CELL / 2;
    body += thing(kind).draw(x, y, CELL * 0.86);
    if (i >= n - gone) body += cross(x, y, CELL * 0.36);
  }
  return svg(cols * CELL, rows * CELL, body);
}

/** Một hàng đồ vật nhiều loại xen kẽ: list = ['fish', 'bird', …] (đếm riêng từng loại). */
export function mixed(list) {
  const C = 60;
  return svg(list.length * C, C, list.map((k, i) => thing(k).draw(i * C + C / 2, C / 2, C * 0.86)).join(''));
}

/**
 * Hai hàng: a đồ vật trên, b đồ vật dưới. Mặc định thẳng cột (nối từng cặp).
 * `spread`: hàng dưới giãn ra cho dài bằng hàng trên dù ít hơn (bẫy "hàng dài hơn là nhiều hơn").
 */
export function pairRows(top, a, bottom, b, { spread = false } = {}) {
  const n = Math.max(a, b);
  const step = spread && b > 1 ? ((a - 1) * CELL) / (b - 1) : CELL;
  let body = '';
  for (let i = 0; i < n; i++) {
    if (i < a) body += thing(top).draw(i * CELL + CELL / 2, CELL / 2, CELL * 0.86);
    if (i < b) body += thing(bottom).draw(i * step + CELL / 2, CELL * 1.6, CELL * 0.86);
  }
  return svg(n * CELL, CELL * 2.15, body);
}

/** Dãy ô số from…to, con vật đứng ở ô `at` (đếm thêm, nhảy bậc). */
export function track(from, to, at, kind = 'rabbit') {
  const n = to - from + 1, W = 52;
  let body = '';
  for (let i = 0; i < n; i++) {
    const x = i * W + 2;
    body += `<rect x="${x}" y="54" width="${W - 4}" height="34" rx="6" fill="${from + i === at ? '#fef3c7' : '#fff'}" stroke="#94a3b8" stroke-width="2"/>`
      + `<text x="${x + (W - 4) / 2}" y="77" font-size="18" font-weight="800" fill="${INK}" text-anchor="middle">${from + i}</text>`;
  }
  body += thing(kind).draw((at - from) * W + W / 2, 28, 46);
  return svg(n * W, 92, body);
}

/** Hai nhóm đồ vật trong hai khung: a con đang có, b con thêm vào (mũi tên). */
export function groups(kind, a, b, { label = 'thêm' } = {}) {
  const box = (n, x0) => {
    const cols = Math.min(n, 3), rows = Math.ceil(n / cols), w = cols * CELL + 12, h = rows * CELL + 12;
    let body = `<rect x="${x0}" y="0" width="${w}" height="${h}" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>`;
    for (let i = 0; i < n; i++) body += thing(kind).draw(x0 + 6 + (i % cols) * CELL + CELL / 2, 6 + Math.floor(i / cols) * CELL + CELL / 2, CELL * 0.86);
    return { body, w, h };
  };
  const A = box(a, 2);
  const gap = 64;
  const B = box(b, 2 + A.w + gap);
  const H = Math.max(A.h, B.h);
  const ax = 2 + A.w + 8, mid = H / 2;
  const arrow = `<path d="M${ax} ${mid} H${ax + gap - 20} M${ax + gap - 28} ${mid - 8} L${ax + gap - 18} ${mid} L${ax + gap - 28} ${mid + 8}" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
    + `<text x="${ax + (gap - 16) / 2}" y="${mid - 12}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">${label}</text>`;
  return svg(4 + A.w + gap + B.w, H + 2, A.body + arrow + B.body);
}

/** Một hình phẳng (phương án trắc nghiệm, hoặc trong hàng hình). */
const SHAPES = {
  square: (x, y, s, c) => `<rect x="${x - s / 2}" y="${y - s / 2}" width="${s}" height="${s}" fill="${c}" stroke="${INK}" stroke-width="2.5"/>`,
  circle: (x, y, s, c) => `<circle cx="${x}" cy="${y}" r="${s / 2}" fill="${c}" stroke="${INK}" stroke-width="2.5"/>`,
  triangle: (x, y, s, c) => `<path d="M${x} ${y - s / 2} L${x + s / 2} ${y + s / 2} L${x - s / 2} ${y + s / 2} Z" fill="${c}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`,
};
const COLORS = { square: '#93c5fd', circle: '#fca5a5', triangle: '#fde68a' };

export function shape(kind, size = 64) {
  return svg(size + 8, size + 8, SHAPES[kind](size / 2 + 4, size / 2 + 4, size, COLORS[kind]), size + 8);
}

/** Hàng hình trộn: list = ['circle', 'triangle', …]. Cỡ khác nhau một chút để bé không đếm theo cỡ. */
export function shapes(list) {
  const sizes = [40, 32, 44, 36];
  const body = list.map((k, i) => SHAPES[k](i * 54 + 28, 28, sizes[i % sizes.length], COLORS[k])).join('');
  return svg(list.length * 54 + 4, 56, body);
}

/** Cái đĩa có n đồ vật; n = null: đĩa bị khăn che, có dấu "?". */
export function plate(kind, n, size = 150) {
  const w = size, h = size * 0.62, cx = w / 2, cy = h * 0.6;
  let body = `<ellipse cx="${cx}" cy="${cy}" rx="${w * 0.47}" ry="${h * 0.34}" fill="#fff" stroke="#94a3b8" stroke-width="2.5"/>`
    + `<ellipse cx="${cx}" cy="${cy}" rx="${w * 0.33}" ry="${h * 0.2}" fill="none" stroke="#e2e8f0" stroke-width="2"/>`;
  if (n == null) {
    body += `<path d="M${cx - w * 0.36} ${cy + 4} Q${cx} ${cy - h * 0.75} ${cx + w * 0.36} ${cy + 4} Z" fill="#a5b4fc" stroke="#4f46e5" stroke-width="2.5" stroke-linejoin="round"/>`
      + `<text x="${cx}" y="${cy - 6}" font-size="30" font-weight="800" fill="#fff" text-anchor="middle">?</text>`;
  } else {
    // Đến 3 quả xếp một hàng, nhiều hơn thì hai hàng; quả không chồng lên nhau để bé đếm được.
    const top = n <= 3 ? n : Math.ceil(n / 2);
    const s = Math.min(34, (w * 0.62) / Math.max(1, top));
    for (let i = 0; i < n; i++) {
      const row = i < top ? 0 : 1, k = row ? i - top : i, cnt = row ? n - top : top;
      body += thing(kind).draw(cx + (k - (cnt - 1) / 2) * s, n <= 3 ? cy - s * 0.15 : cy - s * 0.55 + row * s * 0.75, s * 0.92);
    }
  }
  return svg(w, h, body);
}

/** Hai đĩa cạnh nhau (đĩa thứ nhất có n đồ vật, đĩa thứ hai bị che). */
export function twoPlates(kind, n) {
  const a = plate(kind, n, 170), b = plate(kind, null, 170);
  const inner = (s) => s.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  return svg(360, 110, `<g>${inner(a)}</g><g transform="translate(190 0)">${inner(b)}</g>`);
}
