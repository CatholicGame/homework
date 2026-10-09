/**
 * Đồ dùng chung cho Khám phá Toán 3 Tập Một (x3a): tấm vẽ SVG co theo tờ giấy (grade4Tools/canvas.js) + nút bấm,
 * chờ em bấm đúng chỗ, đồ vật bay theo đường vòng (cả khi máy giảm chuyển động: bay êm, không phồng).
 *
 * Tờ giấy: khung nhìn rộng 1000, cao H theo tỉ lệ tờ giấy (ngang ≈ 560–900, dọc tới 1500). Dải dưới cùng (G.band)
 * luôn để dành cho nút thao tác của bước hoặc nút chọn của thầy (c.choose đè lên đúng dải này), nên không gì xê dịch.
 */

import { createCanvas, anim } from '../../grade4Tools/canvas.js';
import { css, INK, sfx } from '../../grade4Tools/frame.js';
import { calmMotion } from '../../grade3Games/fly.js';
import { readVN } from '../../grade4Tools/num.js';

export { INK, sfx, anim, readVN, calmMotion };
export const FONT = "'Baloo 2', sans-serif";
export const sleep = (ms) => new Promise(r => setTimeout(r, ms));
/** Số viết tách lớp từ 4 chữ số (sách lớp 3: 1 000). */
export const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
/** Số đọc bằng chữ khi từ 1000 trở lên (giọng đọc), số nhỏ giữ chữ số. */
export const say = (n) => (n >= 1000 ? readVN(n) : String(n));

// ── Hình SVG nhỏ ──────────────────────────────────────────────────────────────────────────────────────
export const T = (x, y, s, { fs = 40, fill = INK, anchor = 'middle', w = 800, cls = '', extra = '' } = {}) =>
  `<text x="${x}" y="${y}" font-size="${fs}" fill="${fill}" text-anchor="${anchor}" font-weight="${w}" dominant-baseline="central" class="${cls}" ${extra}>${s}</text>`;
export const R = (x, y, w, h, { fill = '#fff', stroke = INK, sw = 3, rx = 10, cls = '', extra = '' } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" class="${cls}" ${extra}/>`;
export const C = (cx, cy, r, { fill = '#fff', stroke = INK, sw = 3, cls = '', extra = '' } = {}) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" class="${cls}" ${extra}/>`;
export const L = (x1, y1, x2, y2, { stroke = INK, sw = 4, dash = '', cap = 'round', cls = '', extra = '' } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="${cap}" ${dash ? `stroke-dasharray="${dash}"` : ''} class="${cls}" ${extra}/>`;

/** Nút to trong hình (bóng dưới chân như nút thật). */
export const BTN = (id, x, y, w, h, label, { fill = '#22C55E', shade = '#15803D', ink = '#fff', fs = null } = {}) => `
  <g class="x3a-btn" data-hot="${id}">
    <rect x="${x}" y="${y + 8}" width="${w}" height="${h}" rx="${h * 0.3}" fill="${shade}"/>
    <g class="x3a-btn-top"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h * 0.3}" fill="${fill}" stroke="${shade}" stroke-width="3"/>
    ${T(x + w / 2, y + h / 2 + 2, label, { fs: fs || Math.min(h * 0.5, (w / Math.max(4, String(label).replace(/<[^>]+>/g, '').length)) * 1.5), fill: ink })}</g>
  </g>`;

/**
 * Tấm vẽ của một Khám phá. t.fit() đặt khung nhìn theo tờ giấy, trả về G = { W, H, tall, top, bot, band }:
 * vẽ trong [top, bot], dải nút ở [band, H]. Phần tử có data-hot="id" bấm được: t.last = id, phát 'tap'.
 */
export function stage(board, { bg = '#fff' } = {}) {
  injectKitStyles();
  const t = createCanvas(board, { bg });
  t.svg.classList.add('x3a-svg');
  t.last = null;
  t.fit = ({ band = 0.17, minH = 520, maxH = 1500 } = {}) => {
    const r = t.svg.getBoundingClientRect();
    const H = r.width > 10 && r.height > 10 ? Math.round(Math.min(maxH, Math.max(minH, (1000 * r.height) / r.width))) : 600;
    t.frame(0, 0, 1000, H);
    const tall = H > 1050;
    const bh = Math.max(96, H * (tall ? 0.17 : band));
    t.G = { W: 1000, H, tall, top: 10, bot: H - bh - 10, band: H - bh, bh };
    return t.G;
  };
  t.svg.addEventListener('click', (e) => {
    const h = e.target.closest?.('[data-hot]');
    if (!h || h.classList.contains('x3a-off')) return;
    t.last = h.dataset.hot;
    const top = h.querySelector('.x3a-btn-top');
    if (top) top.animate([{ transform: 'translateY(6px)' }, { transform: 'none' }], { duration: 160 });
    t.emit('tap', h.dataset.hot);
  });
  t.hot = (id) => t.svg.querySelector(`[data-hot="${id}"]`);
  t.enable = (id, on = true) => { const e = t.hot(id); if (e) e.classList.toggle('x3a-off', !on); };
  return t;
}

/**
 * Chờ em bấm đúng: ok(id) đúng thì xong; bấm chỗ khác thì thầy nhắc wrong(id). el(): phần tử đúng (nhấp nháy khi nhắc,
 * trang thử DEV bấm hộ qua window.__x3aNext).
 */
export async function waitTap(c, t, ok, { nudge = '', wrong = null, el = null, glow = true } = {}) {
  t.last = null;
  const pick = typeof ok === 'string' ? (id) => id === ok : ok;
  const elOf = () => (typeof el === 'function' ? el() : el) || (typeof ok === 'string' ? t.hot(ok) : null);
  const g = glow ? elOf() : null;
  g?.classList.add('x3a-glow');
  if (import.meta.env.DEV) window.__x3aNext = elOf;
  const off = t.on((ev, id) => {
    if (ev !== 'tap' || pick(id)) return;
    sfx.boing();
    if (wrong) { const w = typeof wrong === 'function' ? wrong(id) : wrong; if (w) c.hint(w); }
  });
  try {
    await c.until(t, () => t.last != null && pick(t.last), { nudge, el: elOf });
  } finally {
    off();
    g?.classList.remove('x3a-glow');
    if (import.meta.env.DEV) window.__x3aNext = null;
  }
  return t.last;
}

/** Bấm nút id đủ n lần (mỗi lần gọi each(k), k = 1..n, có thể chờ hoạt cảnh). */
export async function tapTimes(c, t, id, n, each, { nudge = '' } = {}) {
  let k = 0, busy = Promise.resolve();
  t.enable(id, true);
  t.hot(id)?.classList.add('x3a-glow');
  if (import.meta.env.DEV) window.__x3aNext = () => t.hot(id);
  const off = t.on((ev, h) => {
    if (ev !== 'tap' || h !== id || k >= n) return;
    k++;
    const me = k;
    busy = busy.then(() => each(me)).then(() => { t.done = me; t.emit('done'); });
  });
  t.done = 0;
  try {
    await c.until(t, () => t.done >= n, { nudge, el: () => t.hot(id) });
  } finally {
    off();
    t.hot(id)?.classList.remove('x3a-glow');
    t.enable(id, false);
    if (import.meta.env.DEV) window.__x3aNext = null;
  }
}

/** Bay phần tử SVG từ chỗ (dx, dy) lệch so với chỗ của nó về đúng chỗ, theo đường vòng lên. */
export function flyFrom(el, dx, dy, ms = 650) {
  if (!el) return Promise.resolve();
  const calm = calmMotion();
  const lift = Math.min(160, 40 + Math.hypot(dx, dy) * 0.25);
  const frames = [];
  for (let f = 0; f <= 16; f++) {
    const k = f / 16, e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2, u = 1 - e;
    const x = dx * u, y = dy * u - lift * Math.sin(Math.PI * e);
    const s = calm ? 1 : 1 + 0.12 * Math.sin(Math.PI * e);
    frames.push({ offset: k, transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${s.toFixed(3)})` });
  }
  el.style.transformBox = 'fill-box';
  el.style.transformOrigin = '50% 50%';
  return el.animate(frames, { duration: anim(ms), easing: 'linear', fill: 'backwards' }).finished.catch(() => {});
}

/** Hiện ra (phóng nhẹ). */
export function pop(el, ms = 380) {
  if (!el) return Promise.resolve();
  el.style.transformBox = 'fill-box';
  el.style.transformOrigin = '50% 50%';
  const fr = calmMotion() ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, transform: 'scale(0.4)' }, { opacity: 1, transform: 'scale(1.12)', offset: 0.7 }, { opacity: 1, transform: 'none' }];
  return el.animate(fr, { duration: anim(ms), easing: 'ease-out', fill: 'backwards' }).finished.catch(() => {});
}

/** Nảy nhẹ (cảnh phản ứng khi đồ vật đáp). */
export function bump(el) {
  if (!el) return;
  el.style.transformBox = 'fill-box';
  el.style.transformOrigin = '50% 100%';
  el.animate(calmMotion() ? [{ opacity: 0.6 }, { opacity: 1 }] : [{ transform: 'scale(1, 0.92)' }, { transform: 'scale(1, 1.04)' }, { transform: 'none' }], { duration: 300 });
}

let styled = false;
function injectKitStyles() {
  if (styled) return;
  styled = true;
  css('x3a-kit', `
    .x3a-svg text { font-family: ${FONT}; user-select: none; }
    .x3a-svg [data-hot] { cursor: pointer; }
    .x3a-svg .x3a-off { opacity: 0.35; pointer-events: none; }
    .x3a-svg .x3a-btn.x3a-off { opacity: 0.3; }
    .g4-board:has(.g4-ov-choices) .x3a-btn { visibility: hidden; }
    .x3a-glow { animation: x3aGlow 1.1s ease-in-out infinite; }
    @keyframes x3aGlow { 50% { filter: drop-shadow(0 0 6px #FACC15) drop-shadow(0 0 12px #FDE047); } }
    .x3a-svg .g4-nudge { animation: x3aNudge 0.6s ease-in-out 4; transform-box: fill-box; transform-origin: 50% 50%; }
    @keyframes x3aNudge { 50% { transform: scale(1.08); filter: drop-shadow(0 0 10px #FACC15); } }
    @media (prefers-reduced-motion: reduce) {
      .x3a-glow { animation: x3aGlowCalm 2s ease-in-out infinite; }
      @keyframes x3aGlowCalm { 50% { filter: drop-shadow(0 0 5px #FACC15); } }
      .x3a-svg .g4-nudge { animation: x3aGlowCalm 1s ease-in-out 3; }
    }
  `);
}
