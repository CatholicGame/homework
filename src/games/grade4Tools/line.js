/**
 * 📏 Tia số phóng to: vạch lớn có số, vạch nhỏ ở giữa. Dùng cho
 *  - điền mốc, số liền trước / liền sau (Bài 1),
 *  - làm tròn (Bài 13): bi đặt ở số cần làm tròn, tia số nghiêng về mốc gần hơn, bi lăn về đó,
 *  - so sánh (số bên phải lớn hơn), dãy số tự nhiên (Bài 15): châu chấu nhảy đều bước.
 * Vẽ bằng SVG viewBox 1000 × 400; toạ độ số → x tuyến tính trong khoảng [lo, hi].
 */

import { css, emitter, INK, sfx } from './frame.js';
import { sleep } from '../grade3Drills/kit.js';
import { calmMotion } from '../grade3Games/fly.js';
import { fmt } from './num.js';

const W = 1000, H = 400, X0 = 125, X1 = 875, Y = 250;
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}, html = '') => {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (html) e.innerHTML = html;
  return e;
};
const anim = (ms) => (calmMotion() ? Math.round(ms * 0.8) : ms);

/** Châu chấu xanh (vẽ quanh gốc 0,0 = chân). */
const HOPPER = `<g class="g4l-hopper-body">
  <path d="M-30 -8 Q-6 -34 26 -16 Q34 -10 28 -4 Z" fill="#4ADE80" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="24" cy="-18" r="9" fill="#86EFAC" stroke="${INK}" stroke-width="3"/><circle cx="27" cy="-20" r="2.6" fill="${INK}"/>
  <path d="M-14 -14 L-26 -34 L-6 -4 M6 -8 L0 0 M16 -8 L22 0" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M28 -26 Q36 -46 48 -44" stroke="${INK}" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>`;

/**
 * host: phần tử chứa. lo, hi: hai đầu; step: khoảng giữa hai vạch có số; minor: khoảng vạch nhỏ (0 = không có).
 * labels: 'all' | 'ends' | 'none' | mảng các số được ghi.
 */
export function createLine(host, { lo = 0, hi = 10, step = 1, minor = 0, labels = 'all', arrow = true, caption = false } = {}) {
  injectLineStyles();
  const t = emitter({});
  host.innerHTML = `<div class="g4l">${caption ? '<div class="g4l-cap">&nbsp;</div>' : ''}<svg class="g4l-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet"></svg></div>`;
  const svg = host.querySelector('svg');
  // Cảnh nền nhẹ (trời, mây, cỏ) — kéo dài ra ngoài khung để khi giãn chiều cao vẫn kín.
  svg.append(el('g', { 'aria-hidden': 'true' }, `
    <defs><linearGradient id="g4l-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E0F2FE"/><stop offset="1" stop-color="#F8FAFC"/></linearGradient></defs>
    <rect x="-600" y="-1400" width="${W + 1200}" height="${1400 + Y + 120}" fill="url(#g4l-sky)"/>
    <path d="M-600 ${Y + 120} Q 150 ${Y + 92} 500 ${Y + 116} T 1600 ${Y + 108} V ${Y + 1600} H -600 Z" fill="#DCFCE7"/>
    <path d="M-600 ${Y + 120} Q 150 ${Y + 92} 500 ${Y + 116} T 1600 ${Y + 108}" fill="none" stroke="#86EFAC" stroke-width="6"/>
    <g fill="#fff" opacity="0.95"><ellipse cx="140" cy="40" rx="62" ry="22"/><ellipse cx="180" cy="28" rx="40" ry="22"/>
      <ellipse cx="820" cy="58" rx="70" ry="22"/><ellipse cx="860" cy="44" rx="42" ry="22"/></g>`));
  const tilt = el('g', { class: 'g4l-tilt' });
  const axis = el('g');
  const marks = el('g');
  const top = el('g');
  tilt.append(axis, marks, top);
  svg.append(tilt);
  const R = { lo, hi, step, minor, labels };
  const blanks = new Map(); // giá trị → <g> ô trống

  t.svg = svg;
  /** Dòng chữ trên tia số (quy tắc, câu hỏi). Giữ chỗ từ đầu. */
  t.caption = (html) => { const c = host.querySelector('.g4l-cap'); if (c) c.innerHTML = html || '&nbsp;'; };
  t.x = (v) => X0 + ((v - R.lo) / (R.hi - R.lo)) * (X1 - X0);
  t.v = (x) => R.lo + ((x - X0) / (X1 - X0)) * (R.hi - R.lo);
  t.range = () => ({ ...R });

  function labelSize(texts) {
    const longest = Math.max(...texts.map(s => s.length), 1);
    const gap = ((X1 - X0) * R.step) / (R.hi - R.lo);
    return Math.max(16, Math.min(58, (gap * 0.92) / (longest * 0.56)));
  }

  function drawAxis() {
    axis.innerHTML = '';
    blanks.clear();
    axis.append(el('line', { x1: X0 - 40, y1: Y, x2: X1 + (arrow ? 50 : 40), y2: Y, stroke: INK, 'stroke-width': 6, 'stroke-linecap': 'round' }));
    if (arrow) axis.append(el('path', { d: `M${X1 + 36} ${Y - 14} L${X1 + 58} ${Y} L${X1 + 36} ${Y + 14}`, fill: 'none', stroke: INK, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    const eps = R.step * 1e-6;
    if (R.minor) {
      for (let v = R.lo; v <= R.hi + eps; v += R.minor) {
        const k = Math.round((v - R.lo) / R.step * 1e6) / 1e6;
        if (Number.isInteger(k)) continue;
        axis.append(el('line', { x1: t.x(v), y1: Y - 12, x2: t.x(v), y2: Y + 12, stroke: INK, 'stroke-width': 3 }));
      }
    }
    const majors = [];
    for (let v = R.lo; v <= R.hi + eps; v += R.step) majors.push(Math.round(v));
    const show = (v) => (R.labels === 'all' ? true : R.labels === 'ends' ? v === R.lo || v === R.hi : R.labels === 'none' ? false : R.labels.includes(v));
    const fs = labelSize(majors.map(v => fmt(v)));
    for (const v of majors) {
      axis.append(el('line', { x1: t.x(v), y1: Y - 22, x2: t.x(v), y2: Y + 22, stroke: INK, 'stroke-width': 5, 'stroke-linecap': 'round' }));
      if (show(v)) axis.append(el('text', { x: t.x(v), y: Y + 30 + fs, 'text-anchor': 'middle', class: 'g4l-lab', 'font-size': fs }, fmt(v)));
    }
    t.fs = fs;
  }

  /** Đổi khoảng (phóng to / thu nhỏ). focus: số giữ nguyên chỗ khi phóng. */
  t.zoom = async (next, { focus = null } = {}) => {
    const oldX = focus == null ? W / 2 : t.x(focus);
    Object.assign(R, next);
    const newX = focus == null ? W / 2 : t.x(focus);
    const k = 3;
    const ms = anim(650);
    const g = axis;
    g.style.transformOrigin = `${oldX}px ${Y}px`;
    await g.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: `scale(${k}, 1)`, opacity: 0 }], { duration: ms, easing: 'ease-in', fill: 'forwards' }).finished;
    marks.innerHTML = ''; top.innerHTML = '';
    drawAxis();
    g.style.transformOrigin = `${newX}px ${Y}px`;
    await g.animate([{ transform: `scale(${1 / k}, 1)`, opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: ms, easing: 'ease-out', fill: 'forwards' }).finished;
    g.getAnimations().forEach(a => a.cancel());
  };

  /** Cờ (cắm trên tia số) có nhãn. Trả về <g>. */
  t.flag = (v, { text = fmt(v), color = '#EF4444', h = 130, fs = 40 } = {}) => {
    const x = t.x(v);
    // lá cờ thay cho nhãn số ở vạch đó
    for (const tx of axis.querySelectorAll('text')) if (Math.abs(+tx.getAttribute('x') - x) < 0.5) tx.remove();
    const w = Math.max(60, text.length * fs * 0.56 + 24);
    const g = el('g', { class: 'g4l-flag', transform: `translate(${x} ${Y})` }, `
      <line x1="0" y1="0" x2="0" y2="${-h}" stroke="${INK}" stroke-width="4"/>
      <rect x="${-w / 2}" y="${-h - fs - 18}" width="${w}" height="${fs + 18}" rx="10" fill="${color}" stroke="${INK}" stroke-width="3.5"/>
      <text x="0" y="${-h - 12}" text-anchor="middle" class="g4l-flagtxt" font-size="${fs}">${text}</text>`);
    marks.append(g);
    return g;
  };

  /** Mũi tên chỉ một số (vd. 2 712 615) có nhãn phía trên. */
  t.pin = (v, { text = fmt(v), color = '#2563EB', fs = 46 } = {}) => {
    const x = t.x(v);
    const g = el('g', { class: 'g4l-pin', transform: `translate(${x} ${Y})` }, `
 <path d="M0 -14 L-20 -48 H20 Z" fill="${color}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <text x="0" y="-64" text-anchor="middle" class="g4l-pintxt" font-size="${fs}" fill="${color}">${text}</text>`);
    top.append(g);
    return g;
  };

  /** Ô trống thay cho nhãn số ở vạch v (điền sau bằng t.fillBlank). */
  t.blank = (v) => {
    const fs = t.fs || 32;
    const len = Math.max(fmt(v).length, 2);
    const w = len * fs * 0.56 + 18;
    const g = el('g', { class: 'g4l-blank', transform: `translate(${t.x(v)} ${Y + 30})`, 'data-v': v }, `
      <rect x="${-w / 2}" y="0" width="${w}" height="${fs + 14}" rx="8" fill="#F0F7FF" stroke="#BFDBFE" stroke-width="3"/>
      <text x="0" y="${fs + 2}" text-anchor="middle" class="g4l-q" font-size="${fs}">?</text>`);
    // che nhãn số đã vẽ ở vạch này
    for (const tx of axis.querySelectorAll('text')) if (Math.abs(+tx.getAttribute('x') - t.x(v)) < 0.5) tx.remove();
    marks.append(g);
    blanks.set(v, g);
    return g;
  };
  t.fillBlank = (v, { ok = true } = {}) => {
    const g = blanks.get(v);
    if (!g) return;
    g.querySelector('rect').setAttribute('stroke-dasharray', '');
    g.querySelector('rect').setAttribute('stroke', ok ? '#22C55E' : '#EF4444');
    g.querySelector('rect').setAttribute('fill', ok ? '#DCFCE7' : '#FEE2E2');
    const tx = g.querySelector('text');
    tx.textContent = fmt(v);
    tx.setAttribute('class', 'g4l-lab');
    g.querySelector('rect').setAttribute('width', Math.max(+g.querySelector('rect').getAttribute('width'), fmt(v).length * (t.fs || 32) * 0.56 + 18));
    g.querySelector('rect').setAttribute('x', -g.querySelector('rect').getAttribute('width') / 2);
  };
  t.blankEl = (v) => blanks.get(v);

  /** Ngoặc đo khoảng cách giữa hai số (phía dưới nhãn) có chữ. */
  t.bracket = (a, b, { text = '', color = '#F97316', row = 0 } = {}) => {
    const xa = t.x(a), xb = t.x(b), y = Y + 100 + row * 70;
    const g = el('g', { class: 'g4l-br' }, `
      <path d="M${xa} ${y - 16} V${y} H${xb} V${y - 16}" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="${(xa + xb) / 2}" y="${y + 38}" text-anchor="middle" font-size="32" class="g4l-brtxt" fill="${color}">${text}</text>`);
    marks.append(g);
    return g;
  };

  // ── Bi lăn (làm tròn) ─────────────────────────────────────────────────────────────────────────────
  let ball = null;
  t.ball = (v) => {
    ball?.remove();
    ball = el('g', { class: 'g4l-ball', transform: `translate(${t.x(v)} ${Y - 24})` }, `
      <circle r="21" fill="#F43F5E" stroke="${INK}" stroke-width="4"/><circle cx="-7" cy="-7" r="6" fill="#fff" opacity="0.8"/>`);
    ball.dataset.v = v;
    top.append(ball);
    return ball;
  };
  /** Nghiêng tia số: dir = -1 (bên trái thấp) / 1 / 0. Quanh điểm giữa hai đầu. */
  t.tilt = async (dir) => {
    tilt.style.transformOrigin = `${(X0 + X1) / 2}px ${Y}px`;
    tilt.style.transition = `transform ${anim(700)}ms ease-in-out`;
    tilt.style.transform = dir ? `rotate(${dir * 5}deg)` : '';
    await sleep(anim(750));
  };
  t.roll = async (to) => {
    if (!ball) return;
    const from = +ball.dataset.v;
    const x0 = t.x(from), x1 = t.x(to);
    const ms = anim(Math.min(1800, 400 + Math.abs(x1 - x0) * 3));
    const turns = (x1 - x0) / (2 * Math.PI * 21) * 360;
    await ball.animate([{ transform: `translate(${x0}px, ${Y - 24}px) rotate(0deg)` }, { transform: `translate(${x1}px, ${Y - 24}px) rotate(${turns}deg)` }],
      { duration: ms, easing: 'cubic-bezier(.45,0,.3,1)', fill: 'forwards' }).finished;
    ball.dataset.v = to;
    sfx.ding();
  };

  // ── Châu chấu nhảy (dãy số) ───────────────────────────────────────────────────────────────────────
  let hopper = null;
  t.hopper = (v) => {
    hopper?.remove();
    hopper = el('g', { class: 'g4l-hop', transform: `translate(${t.x(v)} ${Y - 6})` }, HOPPER);
    hopper.dataset.v = v;
    top.append(hopper);
    return hopper;
  };
  /** Nhảy tới v; để lại vết cung và số chỗ đáp. */
  t.hop = async (v, { trail = true, label = true } = {}) => {
    const from = +hopper.dataset.v;
    const x0 = t.x(from), x1 = t.x(v);
    const hgt = Math.min(130, 40 + Math.abs(x1 - x0) * 0.5);
    if (trail) {
      marks.append(el('path', { d: `M${x0} ${Y - 10} Q${(x0 + x1) / 2} ${Y - 10 - hgt * 2} ${x1} ${Y - 10}`, fill: 'none', stroke: '#16A34A', 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
    }
    const frames = [];
    for (let i = 0; i <= 16; i++) {
      const k = i / 16;
      const x = x0 + (x1 - x0) * k, y = Y - 6 - 4 * hgt * k * (1 - k);
      frames.push({ transform: `translate(${x}px, ${y}px)` });
    }
    sfx.swish();
    await hopper.animate(frames, { duration: anim(560), easing: 'linear', fill: 'forwards' }).finished;
    hopper.setAttribute('transform', `translate(${x1} ${Y - 6})`);
    hopper.getAnimations().forEach(a => a.cancel());
    hopper.dataset.v = v;
    if (label) {
      const fs = t.fs || 32;
      marks.append(el('circle', { cx: x1, cy: Y, r: 10, fill: '#22C55E', stroke: INK, 'stroke-width': 3 }));
      if (!axis.querySelector(`text[x="${x1}"]`)) marks.append(el('text', { x: x1, y: Y + 30 + fs, 'text-anchor': 'middle', class: 'g4l-lab g4l-hoplab', 'font-size': fs }, fmt(v)));
    }
  };

  t.clearMarks = () => { marks.innerHTML = ''; top.innerHTML = ''; ball = null; hopper = null; blanks.clear(); drawAxis(); };

  // Bấm lên tia số → số gần nhất theo vạch nhỏ (hoặc vạch lớn).
  svg.addEventListener('click', (e) => {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    if (p.y < Y - 120 || p.y > Y + 120) return;
    const unit = R.minor || R.step;
    const v = Math.round(t.v(p.x) / unit) * unit;
    if (v < R.lo || v > R.hi) return;
    t.emit('tap', v);
  });

  // Giãn khung nhìn theo chiều cao chỗ trống (tia số luôn kín bề ngang, phần thừa ở trên dành cho cờ, châu chấu).
  const fit = () => {
    const r = svg.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const hv = Math.max(H, (W * r.height) / r.width);
    svg.setAttribute('viewBox', `0 ${-(hv - H) * 0.55} ${W} ${hv}`);
  };
  const ro = new ResizeObserver(() => { if (!svg.isConnected) { ro.disconnect(); return; } fit(); });
  ro.observe(svg);

  drawAxis();
  return t;
}

let styled = false;
function injectLineStyles() {
  if (styled) return;
  styled = true;
  css('g4-line', `
    .g4l { flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 1cqh 1cqi; overflow: hidden; border-radius: 0.8rem; }
    .g4l-cap { flex: none; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(6.5cqh, 4cqi); line-height: 1.25; min-height: 2.5em; display: grid; place-items: center; }
    .g4l-cap b { color: #DC2626; }
    .g4l-svg { flex: 1; min-height: 0; width: 100%; height: 100%; font-family: 'Baloo 2', sans-serif; overflow: visible; }
    .g4l-lab { font-weight: 800; fill: #1E293B; }
    .g4l-q { font-weight: 800; fill: #93C5FD; }
    .g4l-flagtxt { font-weight: 800; fill: #fff; stroke: ${INK}; stroke-width: 6px; stroke-linejoin: round; paint-order: stroke; }
    .g4l-pintxt { font-weight: 800; stroke: #fff; stroke-width: 8px; paint-order: stroke; }
    .g4l-brtxt { font-weight: 800; stroke: #fff; stroke-width: 7px; paint-order: stroke; }
    .g4l-hoplab { fill: #15803D; }
    .g4l-blank { cursor: pointer; }
  `);
}
