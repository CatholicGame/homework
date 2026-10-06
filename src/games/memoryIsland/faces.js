/**
 * Vẽ một mặt thẻ (facts/kit.js) thành HTML. Cỡ chữ / hình tính theo khung chứa (container query units),
 * nên cùng một mặt dùng được trên thẻ lật, dải dây phơi, nút Ôn nhanh và hình bay.
 * Khung chứa phải có `container-type: size` (lớp .mi-fbox trong styles.js).
 */

import { INK } from './art.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** Hình chia d phần bằng nhau, tô 1 phần (tròn: hình quạt; chữ nhật: dải dọc). */
function partSvg(face) {
  const { d, shape } = face;
  const fill = '#4ADE80', off = '#fff';
  let body = '';
  if (shape === 'circle') {
    const cx = 50, cy = 50, r = 42;
    for (let i = 0; i < d; i++) {
      const a0 = -Math.PI / 2 + (i / d) * Math.PI * 2, a1 = -Math.PI / 2 + ((i + 1) / d) * Math.PI * 2;
      const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      body += `<path d="M${cx} ${cy} L${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z" fill="${i === 0 ? fill : off}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
    }
    body += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="3.5"/>`;
  } else {
    const x = 6, y = 22, w = 88, h = 56, sw = w / d;
    for (let i = 0; i < d; i++) body += `<rect x="${(x + i * sw).toFixed(2)}" y="${y}" width="${sw.toFixed(2)}" height="${h}" fill="${i === 0 ? fill : off}" stroke="${INK}" stroke-width="2.5"/>`;
    body += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="3.5" rx="2"/>`;
  }
  return `<svg class="mi-fx-part" viewBox="0 0 100 100" role="img" aria-label="${esc(face.text)}">${body}</svg>`;
}

/** HTML của một mặt (chỉ phần nội dung, không có khung thẻ). */
export function faceHtml(face) {
  if (face.kind === 'part') return partSvg(face);
  if (face.kind === 'frac') {
    return `<span class="mi-fx mi-fx-frac" aria-label="${face.n} phần ${face.d}"><span>${face.n}</span><i></i><span>${face.d}</span></span>`;
  }
  const len = [...face.text].length;
  const cls = face.kind === 'roman' ? 'mi-fx mi-fx-text mi-fx-roman' : 'mi-fx mi-fx-text';
  return `<span class="${cls}" style="--L:${Math.max(3, len)}">${esc(face.text)}</span>`;
}

/** Mặt thẻ trong một khung tự co giãn (khung là container cho cỡ chữ). */
export const faceBox = (face, extra = '') => `<span class="mi-fbox ${extra}">${faceHtml(face)}</span>`;

/** Chữ để vẹt nói về một mặt ("thẻ 56", "thẻ số La Mã", "thẻ hình"). */
export function faceLabel(face) {
  if (face.kind === 'roman') return `thẻ số La Mã ${face.text.split('').join(' ')}`;
  if (face.kind === 'part') return 'thẻ hình';
  return `thẻ ${face.say || face.text}`;
}
