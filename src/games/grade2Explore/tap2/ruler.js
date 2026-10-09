/**
 * 📏 Đo độ dài (Bài 55): ba cảnh trên một hình SVG.
 *   'cm' thước 10 cm, băng giấy chia 10 ô; bấm từng ô → tô màu, đếm 1 cm … 10 cm = 1 dm.
 *   'dm' cây gậy 1 m gồm 10 khúc 1 dm; bấm từng khúc → sáng lên, đếm tới 10 dm = 1 m.
 *   'km' con đường có cột mốc mỗi 100 m; bấm xe → xe chạy thêm 100 m, tới 1 000 m = 1 km.
 * Bấm vào ô / khúc / xe → sự kiện ('seg', i). Kịch bản gọi t.light(i) (hoặc t.drive()).
 */

import { css, emitter, sfx } from '../../grade4Tools/frame.js';
import { calmMotion } from '../../grade3Games/fly.js';
import { INK } from './art.js';

const NS = 'http://www.w3.org/2000/svg';
const W = 1000, H = 520;
const S = `stroke="${INK}" stroke-width="4" stroke-linejoin="round"`;

function scene(mode) {
  if (mode === 'km') {
    return `<rect x="-3000" y="-3000" width="7000" height="6000" fill="#E0F2FE"/><rect x="-3000" y="300" width="7000" height="3000" fill="#4ADE80"/>
      <path d="M-3000 350 H4000 V430 H-3000Z" fill="#94A3B8"/><path d="M-3000 390 H4000" stroke="#fff" stroke-width="5" stroke-dasharray="30 24"/>
      <circle cx="880" cy="80" r="44" fill="#FDE047" ${S}/>
      <path d="M120 110 q14-26 42-16 q20-22 46 0 q22 0 20 18 h-112 q-12-2 4-2z" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <path d="M0 250 Q250 200 500 240 T1000 230 V520 H0Z" fill="#86EFAC"/><path d="M0 300 H1000 V520 H0Z" fill="#4ADE80"/>
      <path d="M0 350 H1000 V430 H0Z" fill="#94A3B8"/><path d="M0 390 H1000" stroke="#fff" stroke-width="5" stroke-dasharray="30 24"/>
      <g ${S}><path d="M10 350 V250 L60 210 L110 250 V350Z" fill="#FCA5A5"/><path d="M0 255 L60 200 L120 255" fill="#DC2626"/><rect x="45" y="295" width="30" height="55" fill="#FDE68A"/></g>
      <g ${S}><rect x="880" y="240" width="110" height="110" fill="#FDE68A"/><path d="M870 245 L935 200 L1000 245" fill="#2563EB"/><rect x="920" y="300" width="30" height="50" fill="#93C5FD"/>
      <rect x="896" y="262" width="22" height="22" fill="#BAE6FD"/><rect x="954" y="262" width="22" height="22" fill="#BAE6FD"/></g>
      <text x="935" y="232" text-anchor="middle" font-size="17" font-weight="800" fill="#fff">TRƯỜNG</text>`;
  }
  // bàn học gỗ (cm, dm)
  return `<rect x="-3000" y="-3000" width="7000" height="3120" fill="#FEF6E4"/><rect x="-3000" y="120" width="7000" height="3000" fill="#F2C48D"/><path d="M-3000 120 H4000 V134 H-3000Z" fill="#D9A066"/>
    <path d="M-3000 260 H4000 M-3000 400 H4000 M-3000 540 H4000 M-3000 680 H4000" stroke="#E7B57A" stroke-width="5"/>
    <g stroke="${INK}" stroke-width="4" stroke-linejoin="round"><rect x="700" y="20" width="60" height="96" rx="6" fill="#93C5FD"/><rect x="770" y="40" width="50" height="76" rx="6" fill="#FCA5A5"/><rect x="830" y="30" width="40" height="86" rx="6" fill="#86EFAC"/>
    <path d="M120 116 L132 70 H188 L200 116Z" fill="#FB923C"/><path d="M160 70 Q140 20 156 8 Q168 36 162 70 Q186 18 204 28 Q190 56 166 70" fill="#4ADE80" stroke-width="3"/></g>`;
}

export function createRuler(host, { mode = 'cm' } = {}) {
  injectRulerStyles();
  const t = emitter({});
  host.innerHTML = `<div class="x2r"><div class="x2zr-cap">&nbsp;</div>
    <svg class="x2zr-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${scene(mode)}<g class="x2zr-main"></g><g class="x2zr-top"></g></svg></div>`;
  const svg = host.querySelector('svg');
  const main = svg.querySelector('.x2zr-main');
  const top = svg.querySelector('.x2zr-top');
  const add = (parent, tag, attrs = {}, html = '') => {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    if (html) e.innerHTML = html;
    parent.append(e);
    return e;
  };
  t.root = host.querySelector('.x2r');
  t.caption = (html) => { host.querySelector('.x2zr-cap').innerHTML = `<span>${html || '&nbsp;'}</span>`; };
  let lit = 0;
  Object.defineProperty(t, 'lit', { get: () => lit });
  const segs = [];

  if (mode === 'cm') {
    const X0 = 100, U = 80;
    // thước
    add(main, 'rect', { x: X0 - 40, y: 290, width: 10 * U + 80, height: 120, rx: 10, fill: '#FDE047', stroke: INK, 'stroke-width': 4 });
    for (let k = 0; k <= 20; k++) {
      const x = X0 + k * U / 2;
      add(main, 'line', { x1: x, y1: 290, x2: x, y2: 290 + (k % 2 ? 26 : 46), stroke: INK, 'stroke-width': k % 2 ? 3 : 4 });
      if (!(k % 2)) add(main, 'text', { x, y: 386, 'text-anchor': 'middle', class: 'x2zr-num' }, String(k / 2));
    }
    add(main, 'text', { x: X0 + 10 * U + 22, y: 330, 'text-anchor': 'middle', class: 'x2zr-unit' }, 'cm');
    // băng giấy 10 ô
    for (let i = 0; i < 10; i++) {
      const g = add(main, 'g', { class: 'x2zr-seg', 'data-i': i });
      add(g, 'rect', { x: X0 + i * U, y: 170, width: U, height: 110, fill: '#fff', stroke: '#CBD5E1', 'stroke-width': 3 });
      add(g, 'text', { x: X0 + i * U + U / 2, y: 238, 'text-anchor': 'middle', class: 'x2zr-segtxt' }, '');
      segs.push(g);
    }
  } else if (mode === 'dm') {
    const X0 = 50, U = 90;
    for (let i = 0; i < 10; i++) {
      const g = add(main, 'g', { class: 'x2zr-seg', 'data-i': i });
      add(g, 'rect', { x: X0 + i * U, y: 200, width: U, height: 110, fill: '#fff', stroke: '#CBD5E1', 'stroke-width': 3 });
      add(g, 'text', { x: X0 + i * U + U / 2, y: 268, 'text-anchor': 'middle', class: 'x2zr-segtxt x2zr-segsm' }, '');
      for (let k = 1; k < 10; k++) add(g, 'line', { x1: X0 + i * U + k * 9, y1: 310, x2: X0 + i * U + k * 9, y2: 310 - (k === 5 ? 22 : 12), stroke: '#94A3B8', 'stroke-width': 2 });
      segs.push(g);
    }
    add(main, 'rect', { x: X0, y: 200, width: 10 * U, height: 110, fill: 'none', stroke: INK, 'stroke-width': 4, rx: 4 });
  } else {
    const X0 = 130, U = 74;
    for (let i = 0; i <= 10; i++) {
      const x = X0 + i * U;
      add(main, 'g', {}, `<rect x="${x - 5}" y="300" width="10" height="50" fill="#fff" stroke="${INK}" stroke-width="3"/><rect x="${x - 5}" y="300" width="10" height="16" fill="#EF4444"/>`);
      add(main, 'text', { x, y: 470, 'text-anchor': 'middle', class: 'x2zr-num x2zr-numsm' }, i === 10 ? '1 000' : String(i * 100));
      if (i < 10) {
        const g = add(main, 'g', { class: 'x2zr-seg x2zr-road', 'data-i': i });
        add(g, 'rect', { x, y: 432, width: U, height: 10, fill: '#CBD5E1' });
        segs.push(g);
      }
    }
    add(main, 'text', { x: X0 + 10 * U + 40, y: 470, class: 'x2zr-num x2zr-numsm' }, 'm');
    const car = add(top, 'g', { class: 'x2zr-car', transform: `translate(${X0} 0)` }, `
      <g transform="translate(-60 0)"><path d="M10 380 V350 Q14 336 30 334 L46 312 Q52 304 64 304 H96 Q106 304 112 314 L122 334 Q138 336 140 350 V380Z" fill="#F97316" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M54 334 L66 314 H94 L104 334Z" fill="#BAE6FD" stroke="${INK}" stroke-width="3"/><circle cx="40" cy="382" r="15" fill="#334155" stroke="${INK}" stroke-width="4"/><circle cx="112" cy="382" r="15" fill="#334155" stroke="${INK}" stroke-width="4"/></g>`);
    t.car = car;
    let carX = X0;
    t.drive = async (k) => {
      const x = X0 + k * U;
      sfx.swish();
      const an = car.animate([{ transform: `translate(${carX}px, 0px)` }, { transform: `translate(${x}px, 0px)` }],
        { duration: calmMotion() ? 700 : 520, easing: 'ease-in-out', fill: 'forwards' });
      await an.finished;
      carX = x;
      car.setAttribute('transform', `translate(${x} 0)`);
      an.cancel();
    };
  }

  /** Tô sáng ô / khúc thứ i (đếm thêm một). text: chữ trong ô. */
  t.light = async (i, text = '') => {
    const g = segs[i];
    if (!g || g.classList.contains('x2zr-on')) return;
    lit++;
    g.classList.add('x2zr-on');
    const r = g.querySelector('rect');
    r.setAttribute('fill', mode === 'cm' ? (i % 2 ? '#F9A8D4' : '#F472B6') : mode === 'dm' ? (i % 2 ? '#FDBA74' : '#FB923C') : '#22C55E');
    r.setAttribute('stroke', mode === 'km' ? 'none' : INK);
    const tx = g.querySelector('text');
    if (tx) tx.textContent = text;
    if (mode === 'km') await t.drive(i + 1);
    sfx.pop(lit);
    t.emit('lit', i);
  };
  /** Ngoặc dưới các ô từ a tới b (chữ ở giữa). */
  t.bracket = (text, { color = '#2563EB' } = {}) => {
    const [x0, x1, y] = mode === 'cm' ? [100, 900, 150] : mode === 'dm' ? [50, 950, 340] : [130, 870, 290];
    const up = mode === 'cm' || mode === 'km';
    const yb = up ? y - 30 : y + 30;
    add(top, 'g', { class: 'x2zr-br' }, `<path d="M${x0} ${y} V${yb} H${x1} V${y}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="${(x0 + x1) / 2 - 150}" y="${yb + (up ? -62 : 8)}" width="300" height="56" rx="14" fill="#fff" stroke="${color}" stroke-width="3"/>
      <text x="${(x0 + x1) / 2}" y="${yb + (up ? -22 : 48)}" text-anchor="middle" class="x2zr-brtxt" fill="${color}">${text}</text>`);
  };
  svg.addEventListener('click', (e) => {
    const g = e.target.closest('.x2zr-seg, .x2zr-car');
    if (!g) return;
    t.emit('seg', g.classList.contains('x2zr-car') ? -1 : +g.dataset.i);
  });
  t.seg = (i) => segs[i];
  return t;
}

let styled = false;
function injectRulerStyles() {
  if (styled) return;
  styled = true;
  css('x2zr-ruler', `
    .x2r { flex: 1; min-height: 0; display: flex; flex-direction: column; font-family: 'Baloo 2', sans-serif; }
    .x2zr-cap { flex: none; height: 12cqh; display: grid; place-items: center; font-weight: 800; color: #1E293B; font-size: min(8cqh, 5.6cqi); line-height: 1; white-space: nowrap; }
    .x2zr-svg { flex: 1 1 0; min-height: 0; width: 100%; border-radius: 1rem; margin-bottom: 14cqh; overflow: hidden; }
    .x2zr-num { font-size: 40px; font-weight: 800; fill: ${INK}; }
    .x2zr-numsm { font-size: 26px; }
    .x2zr-unit { font-size: 34px; font-weight: 800; fill: ${INK}; }
    .x2zr-seg { cursor: pointer; }
    .x2zr-seg rect { transition: fill .25s; }
    .x2zr-segtxt { font-size: 40px; font-weight: 800; fill: #fff; pointer-events: none; }
    .x2zr-segsm { font-size: 30px; }
    .x2zr-car { cursor: pointer; }
    .x2zr-brtxt { font-size: 38px; font-weight: 800; }
    .x2zr-on rect { animation: x2zrOn .4s ease; }
    @keyframes x2zrOn { 50% { opacity: .5; } }
  `);
}
