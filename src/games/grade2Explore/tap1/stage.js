/**
 * Sân khấu chung cho Khám phá Toán 2 Tập Một: một tờ SVG kín tờ giấy của runExplore (grade4Tools/frame.js).
 *
 * - Khung thiết kế W × H chọn lúc dựng theo hình tờ giấy: ngang (1000 × 900) hoặc dựng đứng (1000 × 1250, t.tall: màn dọc).
 *   Khung nhìn giãn theo chỗ trống (khung luôn trọn, phần thừa là cảnh nền vẽ tràn ra ngoài), không bao giờ có khoảng trắng.
 * - Đáy khung (BOTTOM phần) để trống cho nút chọn của c.choose đè lên.
 * - Bấm vào phần tử có data-tap → t.emit('tap', el.dataset.tap, el).
 */

import { css, emitter, INK, sfx } from '../../grade4Tools/frame.js';
import { calmMotion } from '../../grade3Games/fly.js';

export { INK, sfx };
export const anim = (ms) => (calmMotion() ? Math.round(ms * 0.8) : ms);
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
/** Phần đáy khung thiết kế để trống cho nút chọn (tỉ lệ chiều cao). */
export const BOTTOM = 0.17;
export const MINUS = '−';

const NS = 'http://www.w3.org/2000/svg';
export const svgEl = (tag, attrs = {}, html = '') => {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (html) e.innerHTML = html;
  return e;
};

/**
 * host: tờ giấy. bg(W, H, tall) → SVG cảnh nền (vẽ tràn ra ngoài khung). wide/tall: cỡ khung thiết kế.
 */
export function createStage(host, { bg = null, wide = [1000, 900], tall = [1000, 1250], caption = true } = {}) {
  injectStageStyles();
  const t = emitter({});
  host.innerHTML = `<div class="x2a">${caption ? '<div class="x2a-cap">&nbsp;</div>' : ''}<svg class="x2a-svg" preserveAspectRatio="xMidYMid meet"></svg></div>`;
  const svg = host.querySelector('svg');
  // Màn dọc → khung dựng đứng (cùng cách chia của khung runExplore: @media orientation).
  t.tall = matchMedia('(orientation: portrait)').matches;
  const [W, H] = t.tall ? tall : wide;
  t.W = W; t.H = H;
  t.floor = H * (1 - BOTTOM); // dưới đường này là chỗ của nút chọn
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const back = svgEl('g', { class: 'x2a-bg', 'aria-hidden': 'true' });
  const layer = svgEl('g', { class: 'x2a-layer' });
  svg.append(back, layer);
  if (bg) back.innerHTML = bg(W, H, t.tall);
  t.svg = svg; t.layer = layer;

  t.caption = (html) => { const c = host.querySelector('.x2a-cap'); if (c) c.innerHTML = html || '&nbsp;'; };
  t.bg = (fn) => { back.innerHTML = fn(W, H, t.tall); };
  t.draw = (html) => { layer.innerHTML = html; };
  t.add = (html, parent = layer) => { parent.insertAdjacentHTML('beforeend', html); return parent.lastElementChild; };
  t.q = (sel) => svg.querySelector(sel);
  t.qa = (sel) => [...svg.querySelectorAll(sel)];
  /**
   * Chạy hiệu ứng WAAPI. Phần tử có thuộc tính transform (đặt chỗ) được bọc một lớp <g class="x2a-in"> bên trong và hiệu ứng
   * chạy trên lớp đó (CSS transform sẽ đè thuộc tính transform). Dịch chuyển (px) tính theo toạ độ của lớp cha, xoay / phóng quanh tâm hình.
   */
  t.anim = (target, frames, ms = 600, opts = {}) => {
    const els = typeof target === 'string' ? t.qa(target) : [].concat(target).filter(Boolean);
    return Promise.all(els.map((e, i) => {
      const [el, k] = animTarget(e);
      const fr = k === 1 ? frames : frames.map((f) => (f.transform ? { ...f, transform: scaleMoves(f.transform, k) } : f));
      return el.animate(fr, { duration: anim(ms), delay: anim(opts.delay || 0) + (opts.stagger || 0) * i, easing: opts.easing || 'ease-out', fill: opts.fill || 'none' })
        .finished.catch(() => {});
    }));
  };
  /** Bay từ (x0, y0) tới chỗ hiện tại của phần tử (phần tử đã đặt ở đích), có vòng cung. */
  t.flyIn = (elm, dx, dy, ms = 520, { lift = 120, spin = 0 } = {}) => {
    const fr = [];
    for (let i = 0; i <= 12; i++) {
      const k = i / 12, u = 1 - k;
      const x = dx * u, y = dy * u - 4 * lift * k * u;
      fr.push({ transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${(spin * u).toFixed(1)}deg)` });
    }
    return t.anim(elm, fr, ms, { easing: 'linear' });
  };
  /** Nảy nhẹ khi đáp (cảnh phản ứng). */
  t.pop = (elm) => t.anim(elm, [{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], 320);

  // Giãn khung nhìn kín tờ giấy (khung thiết kế luôn trọn và ở giữa).
  const fit = () => {
    const r = svg.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const a = r.width / r.height;
    if (a > W / H) { const vw = H * a; svg.setAttribute('viewBox', `${-(vw - W) / 2} 0 ${vw} ${H}`); }
    else { const vh = W / a; svg.setAttribute('viewBox', `0 ${-(vh - H) * 0.5} ${W} ${vh}`); }
  };
  const ro = new ResizeObserver(() => { if (!svg.isConnected) { ro.disconnect(); return; } fit(); });
  ro.observe(svg);
  fit();

  svg.addEventListener('click', (e) => {
    const g = e.target.closest('[data-tap]');
    if (!g || !svg.contains(g) || g.classList.contains('x2a-off')) return;
    t.emit('tap', g.dataset.tap, g);
  });
  return t;
}

function animTarget(e) {
  if (!e.hasAttribute?.('transform')) { e.style.transformBox = 'fill-box'; e.style.transformOrigin = 'center'; return [e, 1]; }
  let inner = e.firstElementChild;
  if (!inner || !inner.classList.contains('x2a-in') || e.children.length !== 1) {
    inner = svgEl('g', { class: 'x2a-in' });
    inner.append(...e.childNodes);
    e.append(inner);
    inner.style.transformBox = 'fill-box'; inner.style.transformOrigin = 'center';
  }
  const m = /scale\(\s*([-\d.]+)/.exec(e.getAttribute('transform'));
  return [inner, m ? +m[1] || 1 : 1];
}
/** Chia các độ dời px trong translate(...) cho k (lớp trong bị phóng k lần). */
const scaleMoves = (tr, k) => tr.replace(/translate([XY]?)\(([^)]*)\)/g, (all, ax, args) => `translate${ax}(${args.replace(/(-?[\d.]+)px/g, (m, n) => `${(+n / k).toFixed(1)}px`)})`);

/** Chờ em bấm phần tử có data-tap thoả want(key) (sai thì gọi bad(key)). Dùng với c.until. */
export function waitTap(c, t, want, { nudge = '', el = null, bad = null } = {}) {
  let hit = null;
  const off = t.on((ev, key, g) => {
    if (ev !== 'tap') return;
    if (want(key, g)) hit = key; else if (bad) bad(key, g);
  });
  return c.until(t, () => hit != null, { nudge, el }).then(() => { off(); return hit; }, (e) => { off(); throw e; });
}

// ── Cảnh nền (vẽ tràn ra ngoài khung) ─────────────────────────────────────────────────────────────────
const cloud = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff"><ellipse cx="0" cy="0" rx="70" ry="26"/><ellipse cx="-30" cy="-16" rx="36" ry="24"/><ellipse cx="26" cy="-20" rx="42" ry="28"/></g>`;
const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-10" y="-70" width="20" height="70" fill="#A16207" stroke="${INK}" stroke-width="3"/>
  <circle cx="0" cy="-110" r="54" fill="#4ADE80" stroke="${INK}" stroke-width="3"/><circle cx="-26" cy="-96" r="10" fill="#EF4444" stroke="${INK}" stroke-width="2"/><circle cx="20" cy="-128" r="10" fill="#EF4444" stroke="${INK}" stroke-width="2"/></g>`;

/** Trời + đồi cỏ; đường chân trời ở hz (tỉ lệ H). */
export const skyGrass = (hz = 0.62, { trees = true } = {}) => (W, H) => {
  const y = H * hz;
  return `<defs><linearGradient id="x2a-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BAE6FD"/><stop offset="1" stop-color="#E0F2FE"/></linearGradient></defs>
    <rect x="-2000" y="-2000" width="${W + 4000}" height="${y + 2000}" fill="url(#x2a-sky)"/>
    <circle cx="${W - 90}" cy="${H * 0.1}" r="46" fill="#FDE047" stroke="#FACC15" stroke-width="6"/>
    ${cloud(160, H * 0.1)}${cloud(W * 0.62, H * 0.07, 0.8)}
    <path d="M-2000 ${y} Q ${W * 0.25} ${y - 50} ${W * 0.5} ${y - 10} T ${W + 2000} ${y - 20} V ${H + 2000} H -2000 Z" fill="#BBF7D0"/>
    <path d="M-2000 ${y + 30} Q ${W * 0.3} ${y + 5} ${W * 0.6} ${y + 30} T ${W + 2000} ${y + 25} V ${H + 2000} H -2000 Z" fill="#86EFAC"/>
    ${trees ? `${tree(40, y + 10, 0.9)}${tree(W - 40, y + 14, 1)}` : ''}`;
};

/** Phòng học: tường + mặt bàn gỗ từ hz xuống. */
export const desk = (hz = 0.16) => (W, H) => {
  const y = H * hz;
  return `<rect x="-2000" y="-2000" width="${W + 4000}" height="${y + 2000}" fill="#FEF3C7"/>
    <rect x="-2000" y="${y}" width="${W + 4000}" height="${H + 2000}" fill="#F5D7A1"/>
    <path d="M-2000 ${y} H ${W + 2000}" stroke="#D6A35C" stroke-width="10"/>
    ${[0.35, 0.55, 0.75, 0.95].map((k) => `<path d="M-2000 ${y + (H - y) * k} H ${W + 2000}" stroke="#E9C287" stroke-width="3"/>`).join('')}`;
};

/** Giấy kẻ ô (hình học): ô cỡ s, nền trắng ngà. */
export const gridPaper = (s = 50) => (W, H) => {
  let g = `<rect x="-2000" y="-2000" width="${W + 4000}" height="${H + 4000}" fill="#FFFDF7"/>`;
  for (let x = -40 * s; x <= W + 40 * s; x += s) g += `<path d="M${x} -2000 V ${H + 2000}" stroke="#DBEAFE" stroke-width="2"/>`;
  for (let y = -40 * s; y <= H + 40 * s; y += s) g += `<path d="M-2000 ${y} H ${W + 2000}" stroke="#DBEAFE" stroke-width="2"/>`;
  return g;
};

/** Nhà bếp: tường gạch men + mặt quầy từ hz xuống. */
export const kitchen = (hz = 0.66) => (W, H) => {
  const y = H * hz;
  let tiles = '';
  for (let i = -20; i < 40; i++) tiles += `<path d="M${i * 80} -2000 V ${y}" stroke="#E0F2FE" stroke-width="3"/>`;
  for (let j = -30; j < 30; j++) if (j * 80 < y) tiles += `<path d="M-2000 ${j * 80} H ${W + 2000}" stroke="#E0F2FE" stroke-width="3"/>`;
  return `<rect x="-2000" y="-2000" width="${W + 4000}" height="${y + 2000}" fill="#F0F9FF"/>${tiles}
    <rect x="-2000" y="${y}" width="${W + 4000}" height="${H + 2000}" fill="#E7C9A0"/>
    <rect x="-2000" y="${y}" width="${W + 4000}" height="22" fill="#C08A50"/>`;
};

let styled = false;
function injectStageStyles() {
  if (styled) return;
  styled = true;
  css('x2a-stage', `
    .x2a { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow: hidden; border-radius: 0.8rem; position: relative; }
    .x2a-cap { position: absolute; z-index: 2; left: 0; right: 0; top: 0; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B;
      font-size: min(6cqh, 4.4cqi); line-height: 1.2; min-height: 1.25em; padding: 0.25em 0.6em; pointer-events: none; }
    .x2a-cap:not(:empty) > * { pointer-events: none; }
    .x2a-cap span.x2a-pill, .x2a-cap { text-shadow: 0 0 6px #fff, 0 0 3px #fff; }
    .x2a-cap b { color: #DC2626; }
    .x2a-svg { flex: 1; min-height: 0; width: 100%; height: 100%; font-family: 'Baloo 2', sans-serif; user-select: none; -webkit-user-select: none; display: block; }
    .x2a-svg text { font-family: 'Baloo 2', sans-serif; font-weight: 800; }
    .x2a-svg [data-tap] { cursor: pointer; }
    .x2a-svg .x2a-off { cursor: default; }
    .x2a-t { text-anchor: middle; dominant-baseline: central; fill: ${INK}; }
    .x2a-halo { paint-order: stroke; stroke: #fff; stroke-width: 10px; stroke-linejoin: round; }
    .x2a-glow { filter: drop-shadow(0 0 10px #FACC15) drop-shadow(0 0 4px #FDE047); }
    .x2a-blink { animation: x2aBlink 1.1s ease-in-out infinite; }
    @keyframes x2aBlink { 50% { opacity: 0.45; } }
    @media (orientation: portrait) { .x2a-cap { font-size: min(4.6cqh, 6.4cqi); } }
    @media (prefers-reduced-motion: reduce) { .x2a-blink { animation: x2aBlinkCalm 2s ease-in-out infinite; } @keyframes x2aBlinkCalm { 50% { opacity: 0.7; } } }
  `);
}

/**
 * Viết một dãy chữ (phép tính) giữa cx, dòng y: list = ['5', '+', '3', '=', '8']. Mỗi phần là một <text data-tap="i">.
 * Trả về [{ el, x, w }]. Chiều rộng ước theo số kí tự.
 */
export function tokens(t, list, cx, y, fs = 90, { gap = 0.35, fill = INK, cls = 'x2a-tok', tap = true } = {}) {
  const ws = list.map((s) => String(s).length * fs * 0.58);
  const total = ws.reduce((a, b) => a + b, 0) + gap * fs * (list.length - 1);
  let x = cx - total / 2;
  return list.map((s, i) => {
    const mid = x + ws[i] / 2;
    x += ws[i] + gap * fs;
    const el = t.add(`<text class="x2a-t x2a-halo ${cls}" ${tap ? `data-tap="tok:${i}"` : ''} x="${mid}" y="${y}" font-size="${fs}" fill="${fill}">${s}</text>`);
    return { el, x: mid, w: ws[i] };
  });
}

/** Nhãn tên (thẻ màu) dưới vị trí x. */
export function tag(t, x, y, text, { fill = '#FEF3C7', ink = '#92400E', fs = 34 } = {}) {
  const w = text.length * fs * 0.55 + 30;
  return t.add(`<g class="x2a-tag"><rect x="${x - w / 2}" y="${y - fs * 0.75}" width="${w}" height="${fs * 1.5}" rx="${fs * 0.5}" fill="${fill}" stroke="${ink}" stroke-width="2.5"/>
    <text class="x2a-t" x="${x}" y="${y}" font-size="${fs}" fill="${ink}">${text}</text></g>`);
}
