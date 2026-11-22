/**
 * 🍕 Phân số lớp 4 (Tập Hai, Bài 53–58): dựng trên băng phân số của Toán 5 (grade5Tools/frac.js: băng chia phần,
 * chia nhỏ / gộp phần có chuyển động) và thêm các hình của sách lớp 4:
 *   - 'circle' hình tròn (bánh) chia n phần bằng nhau, tô k phần (hoặc tô đúng các phần trong `on`);
 *   - 'grid'   hình chữ nhật rows × cols ô bằng nhau (bức tường của Mai, hình vuông chia ô);
 *   - 'set'    nhóm n bông hoa, tô màu k bông.
 * Bấm vào phần để tô (tô liền từ phần đầu tới phần vừa bấm, như băng của Toán 5), sự kiện 'shade'.
 * Chữ đọc phân số đúng cách nói: 3/4 → "ba phần tư".
 */

import { createFrac, COL, svgFrac, svgText, tween } from '../grade5Tools/frac.js';
import { fr } from '../grade5Tools/num.js';
import { anim } from './canvas.js';
import { css, INK, sfx } from './frame.js';
import { readVN, capFirst } from './num.js';

export { COL, svgFrac, svgText, tween, fr, INK };

/** Đọc phân số: frRead(3, 4) → "ba phần tư"; frRead(7, 19) → "bảy phần mười chín". */
export const frRead = (a, b) => `${readVN(a)} phần ${b === 4 ? 'tư' : readVN(b)}`;
export const frReadCap = (a, b) => capFirst(frRead(a, b));
export const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));

const BLUE = '#38BDF8';

/** Hình quạt (phần của hình tròn) từ góc a0 tới a1 (radian, 0 = hướng 3 giờ). */
export function sectorPath(cx, cy, r, a0, a1) {
  const p = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const [x0, y0] = p(a0), [x1, y1] = p(a1);
  return `M${cx} ${cy} L${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}
/** Góc bắt đầu phần i của hình tròn chia n phần (phần 0 bắt đầu ở 12 giờ, theo chiều kim đồng hồ). */
export const partAngle = (i, n) => -Math.PI / 2 + (i * 2 * Math.PI) / n;

/** Một bông hoa (5 cánh) tâm (x, y), bán kính r. on: tô màu; off: hoa trắng viền xám. */
export function flowerSvg(x, y, r, on, color = '#F472B6') {
  const pc = on ? color : '#fff', st = on ? INK : '#94A3B8';
  let s = '';
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    s += `<circle cx="${(x + Math.cos(a) * r * 0.52).toFixed(1)}" cy="${(y + Math.sin(a) * r * 0.52).toFixed(1)}" r="${(r * 0.44).toFixed(1)}" fill="${pc}" stroke="${st}" stroke-width="${Math.max(1.5, r * 0.07)}"/>`;
  }
  s += `<circle cx="${x}" cy="${y}" r="${(r * 0.3).toFixed(1)}" fill="${on ? '#FDE047' : '#F1F5F9'}" stroke="${st}" stroke-width="${Math.max(1.5, r * 0.07)}"/>`;
  return s;
}
/** Bông hoa (SVG riêng) để đặt trong nút chọn. */
export const flowerIcon = (on, color) => `<svg viewBox="0 0 40 40" class="g4fr-ico">${flowerSvg(20, 20, 18, on, color)}</svg>`;

/**
 * Tạo bảng phân số lớp 4 trong host (cùng tuỳ chọn createFrac: reserve, cap).
 * Thêm: t.shape(id, spec) / t.reshape(id, patch) / t.shapeEl(id) / t.splitShape(id, m) / t.tapShape(id, on).
 */
export function createFrac4(host, opts = {}) {
  injectFrac4Styles();
  const t = createFrac(host, opts);
  host.querySelector('.g4v')?.classList.add('g4fr');
  const shapes = new Map();
  const clear0 = t.clear;
  t.clear = () => { shapes.clear(); clear0(); };

  t.shape = (id, spec) => {
    const s = { kind: 'circle', n: 1, k: 0, color: BLUE, ...spec, id };
    let g = s.g && s.g.isConnected ? s.g : null;
    if (!g) g = t.add(`<g data-s4="${id}"></g>`);
    s.g = g;
    g.style.transformBox = 'fill-box';
    g.style.transformOrigin = 'center';
    shapes.set(id, s);
    renderShape(s);
    return s;
  };
  t.getShape = (id) => shapes.get(id);
  t.shapeEl = (id) => shapes.get(id)?.g;
  t.reshape = (id, patch) => { const s = shapes.get(id); Object.assign(s, patch); renderShape(s); return s; };
  t.delShape = (id) => { shapes.get(id)?.g.remove(); shapes.delete(id); };
  /** Số phần đang tô của hình. */
  t.count = (id) => { const s = shapes.get(id); return s ? (s.on ? s.on.length : s.k) : 0; };
  t.tapShape = (id, on = true) => { const s = shapes.get(id); if (s) { s.tap = on; renderShape(s); } };
  /** Cắt mỗi phần thành m phần (vạch mới vẽ dần từ tâm ra / từ trên xuống). */
  t.splitShape = async (id, m) => {
    const s = shapes.get(id);
    if (!s || m <= 1) return;
    const old = s.n;
    s.n *= m; s.k *= m;
    if (s.on) s.on = s.on.flatMap(i => [...Array(m)].map((_, j) => i * m + j));
    renderShape(s, (i) => i % m !== 0 || old === 1);
    sfx.swish();
    const fresh = [...s.g.querySelectorAll('.g4fr-new')];
    await Promise.all(fresh.map((e, i) => e.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }],
      { duration: anim(520), delay: anim(60) * i, easing: 'ease-out', fill: 'both' }).finished));
  };

  t.svg.addEventListener('click', (e) => {
    const p = e.target.closest('[data-s4part]');
    const g = p?.closest('[data-s4]');
    const s = g && shapes.get(g.dataset.s4);
    if (!s || !s.tap) return;
    const i = +p.dataset.s4part;
    if (s.pick) { const on = s.on || []; s.on = on.includes(i) ? on.filter(x => x !== i) : [...on, i]; } else { s.on = null; s.k = s.k === i + 1 ? i : i + 1; }
    renderShape(s);
    sfx.pop(t.count(s.id) % 10);
    t.emit('shade', s);
  });
  return t;
}

const isOn = (s, i) => (s.on ? s.on.includes(i) : i < s.k);

function renderShape(s, fresh = () => false) {
  const fn = { circle: drawCircle, grid: drawGrid, set: drawSet }[s.kind];
  s.g.innerHTML = fn(s, fresh);
  s.g.classList.toggle('g4fr-tap', !!s.tap);
}

function drawCircle(s, fresh) {
  const { cx, cy, r, n } = s;
  const sw = s.sw || (r > 150 ? 5 : 4);
  const off = s.off || '#fff';
  const col = s.cake ? COL.CAKE : s.color;
  let out = '';
  if (s.plate) out += `<ellipse cx="${cx}" cy="${cy + r * 0.1}" rx="${r * 1.22}" ry="${r * 1.14}" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
  for (let i = 0; i < n; i++) {
    const fill = isOn(s, i) ? col : off;
    out += n === 1
      ? `<circle data-s4part="0" cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`
      : `<path data-s4part="${i}" d="${sectorPath(cx, cy, r, partAngle(i, n), partAngle(i + 1, n))}" fill="${fill}"/>`;
  }
  if (s.cake && (s.on ? s.on.length : s.k) > 0) {
    // hoa văn bánh trên các phần còn bánh
    out += `<g pointer-events="none" opacity="0.9">${[...Array(n)].map((_, i) => (isOn(s, i)
      ? `<path d="${sectorPath(cx, cy, r * 0.72, partAngle(i, n), partAngle(i + 1, n))}" fill="${COL.CAKE2}" opacity="0.5"/>` : '')).join('')}
      <circle cx="${cx}" cy="${cy}" r="${r * 0.72}" fill="none" stroke="#B45309" stroke-width="2.5" stroke-dasharray="6 7" opacity="${s.k === n || !s.on ? 0.9 : 0.5}"/></g>`;
  }
  const line = s.faint ? '#CBD5E1' : INK;
  if (n > 1) {
    for (let i = 0; i < n; i++) {
      const a = partAngle(i, n);
      out += `<line class="${fresh(i) ? 'g4fr-new' : ''}" pathLength="1" stroke-dasharray="1" x1="${cx}" y1="${cy}" x2="${(cx + r * Math.cos(a)).toFixed(2)}" y2="${(cy + r * Math.sin(a)).toFixed(2)}" stroke="${line}" stroke-width="${sw * 0.8}" stroke-linecap="round" pointer-events="none"/>`;
    }
  }
  out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${line}" stroke-width="${sw}" ${s.faint ? 'stroke-dasharray="10 8"' : ''} pointer-events="none"/>`;
  return out;
}

function drawGrid(s, fresh) {
  const { x, y, w, h, rows = 1, cols } = s;
  const cw = w / cols, rh = h / rows;
  const sw = s.sw || 4;
  let out = '';
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const idx = j * cols + i;
    out += `<rect data-s4part="${idx}" x="${x + i * cw}" y="${y + j * rh}" width="${cw}" height="${rh}" fill="${isOn(s, idx) ? s.color : '#fff'}"/>`;
  }
  for (let i = 1; i < cols; i++) out += `<line class="${fresh(i) ? 'g4fr-new' : ''}" pathLength="1" stroke-dasharray="1" x1="${x + i * cw}" y1="${y}" x2="${x + i * cw}" y2="${y + h}" stroke="${INK}" stroke-width="${sw * 0.75}" pointer-events="none"/>`;
  for (let j = 1; j < rows; j++) out += `<line x1="${x}" y1="${y + j * rh}" x2="${x + w}" y2="${y + j * rh}" stroke="${INK}" stroke-width="${sw * 0.75}" pointer-events="none"/>`;
  out += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round" pointer-events="none"/>`;
  return out;
}

function drawSet(s) {
  const { x, y, w, h, n, cols = Math.ceil(n / 2) } = s;
  const rows = Math.ceil(n / cols);
  const cw = w / cols, rh = h / rows;
  const r = Math.min(cw, rh) * 0.42;
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="#F0FDF4" stroke="#BBF7D0" stroke-width="3"/>`;
  for (let i = 0; i < n; i++) {
    const cx = x + cw * ((i % cols) + 0.5), cy = y + rh * (Math.floor(i / cols) + 0.5);
    out += `<g data-s4part="${i}">${flowerSvg(cx, cy, r, isOn(s, i), s.color)}</g>`;
  }
  return out;
}

/** Đề trong một khối (không để các phân số trong đề xếp dọc theo cột flex). */
export const setQ = (f, html) => { f.q.innerHTML = `<div class="g5f-ql">${html}</div>`; };

/** n hàng xếp dọc trong vùng [top, bottom]: [{ y, h }]. */
export function rowsY(t, n, { top = 20, bottom = t.bot - 14, maxH = t.tall ? 190 : 120 } = {}) {
  const slot = (bottom - top) / n;
  const h = Math.min(maxH, slot * 0.68);
  return [...Array(n)].map((_, i) => ({ y: top + slot * i + (slot - h) / 2, h }));
}

const gt = '&gt;', lt = '&lt;';
export const signHtml = (s) => (s === '>' ? gt : s === '<' ? lt : s);
export const signWord = (s) => (s === '>' ? 'lớn hơn' : s === '<' ? 'bé hơn' : 'bằng');

let styled = false;
function injectFrac4Styles() {
  if (styled) return;
  styled = true;
  css('g4-frac4', `
    .g4fr-tap [data-s4part] { cursor: pointer; pointer-events: all; }
    .g4fr-ico { width: 1.25em; height: 1.25em; vertical-align: middle; }
  `);
}
