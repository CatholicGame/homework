/**
 * Tấm vẽ SVG chung cho các bài đo lường (diện tích, thời gian): dòng chữ trên + SVG co giãn kín chỗ trống.
 * t.draw(html) thay nội dung; t.add(html) thêm; t.anim(selector, keyframes, ms) chạy hiệu ứng;
 * t.tiles(...) lưới ô bấm để lát (sự kiện 'tile').
 * t.frame(x, y, w, h) khoanh vùng có hình (khung nhìn gốc) để hình phóng kín tờ giấy; t.portrait() tờ giấy dựng đứng.
 */

import { css, emitter, INK, sfx } from './frame.js';
import { calmMotion } from '../grade3Games/fly.js';

export const anim = (ms) => (calmMotion() ? Math.round(ms * 0.8) : ms);

export function createCanvas(host, { w = 1000, h = 560, bg = '#fff' } = {}) {
  injectCanvasStyles();
  const t = emitter({});
  host.innerHTML = `<div class="g4v"><div class="g4v-cap">&nbsp;</div><svg class="g4v-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet"></svg></div>`;
  const svg = host.querySelector('svg');
  svg.style.background = bg;
  t.svg = svg; t.w = w; t.h = h;
  t.caption = (html) => { host.querySelector('.g4v-cap').innerHTML = html || '&nbsp;'; };
  t.draw = (html) => { svg.innerHTML = html; };
  t.add = (html) => { svg.insertAdjacentHTML('beforeend', html); return svg.lastElementChild; };
  t.q = (sel) => svg.querySelector(sel);
  t.qa = (sel) => [...svg.querySelectorAll(sel)];
  t.anim = (target, frames, ms = 600, opts = {}) => {
    const els = typeof target === 'string' ? t.qa(target) : [].concat(target);
    return Promise.all(els.map((e, i) => e.animate(frames, { duration: anim(ms), delay: (opts.stagger || 0) * i, easing: opts.easing || 'ease-out', fill: 'both' }).finished));
  };
  /** Đổi khung nhìn (phóng to / thu nhỏ) có chuyển động. */
  t.view = async (x, y, vw, vh, ms = 900) => {
    const [x0, y0, w0, h0] = svg.getAttribute('viewBox').split(' ').map(Number);
    const dur = anim(ms), t0 = performance.now();
    await new Promise((res) => {
      const step = (now) => {
        const k = Math.min(1, (now - t0) / dur), e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
        // nội suy theo log của cỡ để phóng đều
        const lw = Math.exp(Math.log(w0) + (Math.log(vw) - Math.log(w0)) * e), lh = Math.exp(Math.log(h0) + (Math.log(vh) - Math.log(h0)) * e);
        const cx = x0 + w0 / 2 + ((x + vw / 2) - (x0 + w0 / 2)) * e, cy = y0 + h0 / 2 + ((y + vh / 2) - (y0 + h0 / 2)) * e;
        svg.setAttribute('viewBox', `${cx - lw / 2} ${cy - lh / 2} ${lw} ${lh}`);
        if (k < 1) requestAnimationFrame(step); else res();
      };
      requestAnimationFrame(step);
    });
  };
  let base = `0 0 ${w} ${h}`;
  /** Khung nhìn gốc = vùng có hình (để hình to kín tờ giấy); resetView về khung này. */
  t.frame = (x, y, fw, fh) => { base = `${x} ${y} ${fw} ${fh}`; svg.setAttribute('viewBox', base); };
  t.resetView = () => svg.setAttribute('viewBox', base);
  /** Tờ giấy dựng đứng (điện thoại dọc): bài vẽ bố trí theo chiều dọc. */
  t.portrait = () => svg.clientHeight > svg.clientWidth;

  /** Lưới ô bấm để lát: cols × rows ô cỡ s tại (x, y). Bấm ô → tô màu, sự kiện 'tile'. */
  t.tiles = (x, y, cols, rows, s, { color = '#FDBA74', label = '' } = {}) => {
    let g = `<g class="g4v-tiles">`;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      g += `<rect class="g4v-tile" data-k="${j * cols + i}" x="${x + i * s}" y="${y + j * s}" width="${s}" height="${s}" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2" stroke-dasharray="6 5"/>`;
    }
    g += `<rect x="${x}" y="${y}" width="${cols * s}" height="${rows * s}" fill="none" stroke="${INK}" stroke-width="5"/></g>`;
    t.add(g);
    let n = 0;
    svg.querySelectorAll('.g4v-tile').forEach((r) => {
      r.addEventListener('click', () => {
        if (r.dataset.on) return;
        r.dataset.on = '1';
        n++;
        r.setAttribute('fill', color); r.setAttribute('stroke', INK); r.setAttribute('stroke-dasharray', '');
        if (label) svg.insertAdjacentHTML('beforeend', `<text x="${+r.getAttribute('x') + s / 2}" y="${+r.getAttribute('y') + s / 2 + s * 0.12}" class="g4v-tl" font-size="${s * 0.3}" pointer-events="none">${n}</text>`);
        r.animate([{ transform: 'scale(0.6)', transformOrigin: `${+r.getAttribute('x') + s / 2}px ${+r.getAttribute('y') + s / 2}px` }, { transform: 'scale(1)' }], { duration: anim(220) });
        sfx.pop(n % 10);
        t.emit('tile', n);
      });
    });
    t.tileCount = () => n;
  };
  return t;
}

let styled = false;
function injectCanvasStyles() {
  if (styled) return;
  styled = true;
  css('g4-canvas', `
    .g4v { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow: hidden; border-radius: 0.8rem; }
    .g4v-cap { flex: none; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(6.5cqh, 4cqi); line-height: 1.25; min-height: 1.3em; padding-top: 0.6cqh; }
    .g4v-cap b { color: #DC2626; }
    .g4v-svg { flex: 1; min-height: 0; width: 100%; height: 100%; font-family: 'Baloo 2', sans-serif; user-select: none; }
    .g4v-svg text { font-family: 'Baloo 2', sans-serif; }
    .g4v-tile { cursor: pointer; }
    .g4v-tl { font-weight: 800; fill: ${INK}; text-anchor: middle; dominant-baseline: middle; }
    .g4v-t { font-weight: 800; fill: ${INK}; text-anchor: middle; }
    @media (orientation: portrait) { .g4v-cap { font-size: min(4.6cqh, 6.4cqi); } }
  `);
}
