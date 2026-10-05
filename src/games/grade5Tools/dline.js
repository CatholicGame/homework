/**
 * 📏 Tia số phóng to cho số thập phân (Toán 5, Bài 4, 10, 13).
 *  - Đoạn giữa hai mốc, vạch nhỏ chia 10 phần; nhãn số thập phân (0,1) hoặc phân số (1/10, viết chồng).
 *  - Kính lúp (zoomInto): đoạn được chọn sáng lên, tia số cũ thu nhỏ lên trên, đoạn đó mở rộng thành tia số mới
 *    chia 10 vạch nhỏ hơn (phần mười → phần trăm → phần nghìn); hai đường nối cho thấy phóng từ đâu.
 *  - Làm tròn (roundDemo): bi đặt ở số, tia số nghiêng về mốc gần hơn, bi lăn về đó; đúng giữa thì lăn lên.
 * SVG viewBox rộng 1000; khung nhìn giãn theo chiều cao chỗ trống (phần thừa ở trên là trời).
 */

import { css, emitter, INK, sfx } from '../grade4Tools/frame.js';
import { sleep } from '../grade3Drills/kit.js';
import { calmMotion } from '../grade3Games/fly.js';
import { dec, clean } from './num.js';

const W = 1000, H = 470, X0 = 100, X1 = 900, Y = 330;
const YM = 66, MX0 = 210, MX1 = 790; // tia số nhỏ (ngữ cảnh khi phóng)
const NSV = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}, html = '') => {
  const e = document.createElementNS(NSV, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (html) e.innerHTML = html;
  return e;
};
const anim = (ms) => (calmMotion() ? Math.round(ms * 1.1) : ms);

/** Nhãn phân số: v → [tử, mẫu] theo mẫu den (0 và số nguyên viết thường khi whole). */
export const fracLabel = (den, { whole = true } = {}) => (v) => {
  const n = Math.round(v * den);
  if (n === 0) return '0';
  if (whole && n % den === 0) return String(n / den);
  return [n, den];
};

/**
 * host: phần tử chứa. lo, hi: hai đầu; step: khoảng giữa hai vạch lớn; minor: khoảng vạch nhỏ.
 * labels: 'all' (mọi vạch) | 'majors' | 'ends' | 'none'. label(v): chuỗi hoặc [tử, mẫu] (mặc định dec).
 */
export function createDLine(host, { lo = 0, hi = 1, step = 1, minor = 0.1, labels = 'all', label = null, caption = true } = {}) {
  injectDLineStyles();
  const t = emitter({});
  host.innerHTML = `<div class="g5l">${caption ? '<div class="g5l-cap">&nbsp;</div>' : ''}<svg class="g5l-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet"></svg></div>`;
  const svg = host.querySelector('svg');
  svg.append(el('g', { 'aria-hidden': 'true' }, `
    <defs><linearGradient id="g5l-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E0F2FE"/><stop offset="1" stop-color="#F8FAFC"/></linearGradient></defs>
    <rect x="-800" y="-1600" width="${W + 1600}" height="${1600 + Y + 150}" fill="url(#g5l-sky)"/>
    <circle cx="880" cy="-150" r="56" fill="#FDE047" stroke="#FACC15" stroke-width="8"/>
    <path d="M-800 ${Y + 150} Q -300 ${Y + 20} 150 ${Y + 140} Q 420 ${Y + 60} 700 ${Y + 140} Q 1000 ${Y + 40} 1800 ${Y + 140} Z" fill="#BBF7D0" opacity="0.7"/>
    <path d="M-800 ${Y + 150} Q 150 ${Y + 122} 500 ${Y + 146} T 1800 ${Y + 138} V ${Y + 1800} H -800 Z" fill="#DCFCE7"/>
    <path d="M-800 ${Y + 150} Q 150 ${Y + 122} 500 ${Y + 146} T 1800 ${Y + 138}" fill="none" stroke="#86EFAC" stroke-width="6"/>
    <g fill="#fff" opacity="0.95"><ellipse cx="60" cy="-60" rx="62" ry="22"/><ellipse cx="100" cy="-72" rx="40" ry="22"/>
      <ellipse cx="930" cy="-30" rx="70" ry="22"/><ellipse cx="970" cy="-44" rx="42" ry="22"/></g>`));
  const ctx = el('g', { class: 'g5l-ctx' });
  const tilt = el('g');
  const axis = el('g'), marks = el('g'), top = el('g');
  tilt.append(axis, marks, top);
  svg.append(ctx, tilt);
  const R = { lo, hi, step, minor, labels, label: label || ((v) => dec(v)) };

  t.svg = svg;
  t.caption = (html) => { const c = host.querySelector('.g5l-cap'); if (c) c.innerHTML = `<span>${html || '&nbsp;'}</span>`; };
  t.x = (v) => X0 + ((v - R.lo) / (R.hi - R.lo)) * (X1 - X0);
  t.v = (x) => R.lo + ((x - X0) / (X1 - X0)) * (R.hi - R.lo);
  t.range = () => ({ ...R });

  const ticks = () => {
    const n = Math.round((R.hi - R.lo) / R.minor);
    const out = [];
    for (let k = 0; k <= n; k++) {
      const v = clean(R.lo + k * R.minor);
      const q = (v - R.lo) / R.step;
      out.push({ v, major: Math.abs(q - Math.round(q)) < 1e-6 });
    }
    return out;
  };
  const shown = (tk) => (R.labels === 'all' ? true : R.labels === 'majors' ? tk.major : R.labels === 'ends' ? (tk.v === clean(R.lo) || tk.v === clean(R.hi)) : Array.isArray(R.labels) ? R.labels.some(x => Math.abs(x - tk.v) < 1e-9) : false);

  /** Vẽ nhãn (chuỗi hoặc phân số chồng) dưới vạch. */
  function labelEl(v, fs, cls = 'g5l-lab', fill = null) {
    const L = R.label(v), x = t.x(v);
    const g = el('g', { class: 'g5l-l', 'data-x': x.toFixed(2) });
    if (Array.isArray(L)) {
      const [a, b] = L, w = Math.max(String(a).length, String(b).length) * fs * 0.52 + 4;
      g.append(el('text', { x, y: Y + 28 + fs, 'text-anchor': 'middle', class: cls, 'font-size': fs, ...(fill ? { fill } : {}) }, String(a)));
      g.append(el('line', { x1: x - w / 2, x2: x + w / 2, y1: Y + 38 + fs, y2: Y + 38 + fs, stroke: fill || '#1E293B', 'stroke-width': 3.5, 'stroke-linecap': 'round' }));
      g.append(el('text', { x, y: Y + 42 + 2 * fs, 'text-anchor': 'middle', class: cls, 'font-size': fs, ...(fill ? { fill } : {}) }, String(b)));
    } else {
      g.append(el('text', { x, y: Y + 30 + fs, 'text-anchor': 'middle', class: cls, 'font-size': fs, ...(fill ? { fill } : {}) }, L));
    }
    return g;
  }
  const labelLen = (v) => { const L = R.label(v); return Array.isArray(L) ? Math.max(String(L[0]).length, String(L[1]).length) : String(L).length; };

  function drawAxis() {
    axis.innerHTML = '';
    axis.append(el('line', { x1: X0 - 40, y1: Y, x2: X1 + 50, y2: Y, stroke: INK, 'stroke-width': 6, 'stroke-linecap': 'round' }));
    axis.append(el('path', { d: `M${X1 + 36} ${Y - 14} L${X1 + 58} ${Y} L${X1 + 36} ${Y + 14}`, fill: 'none', stroke: INK, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    const tk = ticks();
    for (const k of tk) {
      const x = t.x(k.v), h = k.major ? 24 : 14;
      axis.append(el('line', { x1: x, y1: Y - h, x2: x, y2: Y + h, stroke: INK, 'stroke-width': k.major ? 5 : 3, 'stroke-linecap': 'round' }));
    }
    const lab = tk.filter(shown);
    if (!lab.length) { t.fs = 32; return; }
    // cỡ chữ theo khoảng cách nhỏ nhất giữa hai nhãn và nhãn dài nhất
    let gap = X1 - X0;
    for (let i = 1; i < lab.length; i++) gap = Math.min(gap, t.x(lab[i].v) - t.x(lab[i - 1].v));
    const longest = Math.max(...lab.map(k => labelLen(k.v)), 1);
    const fs = Math.max(18, Math.min(54, (gap * 0.9) / (longest * 0.56)));
    t.fs = fs;
    for (const k of lab) axis.append(labelEl(k.v, k.major ? fs : fs * 0.86, k.major ? 'g5l-lab' : 'g5l-lab g5l-minor'));
  }
  const dropLabel = (x) => { for (const g of axis.querySelectorAll('.g5l-l')) if (Math.abs(+g.dataset.x - x) < 0.5) g.remove(); };

  /** Dải sáng trên đoạn [a, b]. */
  t.band = (a, b, { color = '#FDE047' } = {}) => {
    const xa = t.x(a), xb = t.x(b);
    const r = el('rect', { class: 'g5l-band', x: xa, y: Y - 30, width: xb - xa, height: 60, rx: 10, fill: color, opacity: 0.75 });
    axis.insertBefore(r, axis.firstChild);
    r.animate([{ opacity: 0 }, { opacity: 0.75 }], { duration: anim(400) });
    return r;
  };

  /**
   * Kính lúp: phóng đoạn [a, b] thành tia số mới. next: { step, minor, labels, label } cho tia số mới.
   * Tia số cũ thu nhỏ lên trên làm ngữ cảnh.
   */
  t.zoomInto = async (a, b, next = {}) => {
    const s = (MX1 - MX0) / (X1 - X0);
    const map = (x) => MX0 + (x - X0) * s;
    t.band(a, b);
    sfx.swish?.();
    await sleep(anim(500));
    const xa = map(t.x(a)), xb = map(t.x(b));
    // tia số cũ → ngữ cảnh
    ctx.innerHTML = '';
    const old = axis.cloneNode(true);
    const oldWrap = el('g');
    oldWrap.append(old);
    ctx.append(oldWrap);
    const funnel = el('path', { d: `M${xa} ${YM + 6} L${X0 - 30} ${Y - 40} L${X1 + 30} ${Y - 40} L${xb} ${YM + 6} Z`, fill: '#FEF9C3', opacity: 0, stroke: '#EAB308', 'stroke-width': 3, 'stroke-dasharray': '10 8' });
    const lr = Math.max(34, (xb - xa) / 2 + 14), lc = (xa + xb) / 2;
    const lens = el('g', { opacity: 0 }, `<circle cx="${lc}" cy="${YM}" r="${lr}" fill="none" stroke="${INK}" stroke-width="5"/>
      <circle cx="${lc}" cy="${YM}" r="${lr - 5}" fill="none" stroke="#7DD3FC" stroke-width="4"/>
      <line x1="${lc + lr * 0.72}" y1="${YM + lr * 0.72}" x2="${lc + lr * 0.72 + 30}" y2="${YM + lr * 0.72 + 30}" stroke="${INK}" stroke-width="11" stroke-linecap="round"/>
      <line x1="${lc + lr * 0.72}" y1="${YM + lr * 0.72}" x2="${lc + lr * 0.72 + 30}" y2="${YM + lr * 0.72 + 30}" stroke="#A16207" stroke-width="6" stroke-linecap="round"/>`);
    ctx.insertBefore(funnel, oldWrap);
    ctx.append(lens);
    marks.innerHTML = ''; top.innerHTML = ''; ball = null;
    const ms = anim(900);
    const shrink = oldWrap.animate([{ transform: 'none' }, { transform: `translate(${MX0 - X0 * s}px, ${YM - Y * s}px) scale(${s})` }], { duration: ms, easing: 'ease-in-out', fill: 'forwards' });
    // tia số mới mọc ra từ đoạn đã chọn
    Object.assign(R, { lo: a, hi: b, step: next.step ?? (b - a), minor: next.minor ?? (b - a) / 10, labels: next.labels ?? 'all', label: next.label || ((v) => dec(v)) });
    drawAxis();
    const k = (xb - xa) / (X1 - X0);
    const grow = axis.animate([{ transform: `translate(${xa - X0 * k}px, ${YM - Y * k}px) scale(${k})`, opacity: 0 }, { opacity: 1, offset: 0.3 }, { transform: 'none', opacity: 1 }], { duration: ms, easing: 'ease-in-out' });
    funnel.animate([{ opacity: 0 }, { opacity: 0.7 }], { duration: ms, fill: 'forwards' });
    lens.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ms, fill: 'forwards' });
    await Promise.all([shrink.finished, grow.finished]);
    // giữ tia số nhỏ ở chỗ mới (bỏ hiệu ứng, đặt transform cố định)
    oldWrap.setAttribute('transform', `translate(${MX0 - X0 * s} ${YM - Y * s}) scale(${s})`);
    shrink.cancel();
    sfx.ding();
  };

  /** Về một khoảng mới (không hiệu ứng), bỏ ngữ cảnh và mọi dấu. */
  t.reset = (next) => {
    Object.assign(R, { labels: 'all', label: (v) => dec(v) }, next);
    ctx.innerHTML = ''; marks.innerHTML = ''; top.innerHTML = ''; ball = null;
    tilt.style.transform = '';
    drawAxis();
  };
  t.clearMarks = () => { marks.innerHTML = ''; top.innerHTML = ''; ball = null; drawAxis(); };

  /** Cờ cắm ở mốc v (thay cho nhãn). */
  t.flag = (v, { text = dec(v), color = '#60A5FA', h = 120, fs = 40 } = {}) => {
    const x = t.x(v);
    dropLabel(x);
    const w = Math.max(64, text.length * fs * 0.56 + 26);
    const g = el('g', { class: 'g5l-flag', transform: `translate(${x} ${Y})` }, `
      <line x1="0" y1="0" x2="0" y2="${-h}" stroke="${INK}" stroke-width="4"/>
      <rect x="${-w / 2}" y="${-h - fs - 18}" width="${w}" height="${fs + 18}" rx="10" fill="${color}" stroke="${INK}" stroke-width="3.5"/>
      <text x="0" y="${-h - 12}" text-anchor="middle" class="g5l-flagtxt" font-size="${fs}">${text}</text>`);
    marks.append(g);
    g.animate([{ transform: `translate(${x}px, ${Y + 30}px) scale(0.2)`, opacity: 0 }, { transform: `translate(${x}px, ${Y}px)`, opacity: 1 }], { duration: anim(350), easing: 'ease-out' });
    return g;
  };

  /** Mũi tên chỉ một số, nhãn phía trên (html: SVG tspan được, vd. tô một chữ số). */
  t.pin = (v, { text = dec(v), html = null, color = '#DC2626', fs = 46, up = 0 } = {}) => {
    const x = t.x(v);
    const g = el('g', { class: 'g5l-pin', transform: `translate(${x} ${Y})` }, `
      <path d="M0 -14 L-18 -46 H18 Z" fill="${color}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <text x="0" y="${-58 - up}" text-anchor="middle" class="g5l-pintxt" font-size="${fs}" fill="${color}">${html || text}</text>`);
    top.append(g);
    g.animate([{ transform: `translate(${x}px, ${Y - 80}px)`, opacity: 0 }, { transform: `translate(${x}px, ${Y}px)`, opacity: 1 }], { duration: anim(380), easing: 'ease-out' });
    return g;
  };

  /** Ô trống thay cho nhãn ở vạch v. */
  t.blank = (v) => {
    const fs = t.fs || 32, x = t.x(v);
    dropLabel(x);
    const w = Math.max(labelLen(v), 2) * fs * 0.6 + 18;
    const g = el('g', { class: 'g5l-blank', transform: `translate(${x} ${Y + 30})` }, `
      <rect x="${-w / 2}" y="0" width="${w}" height="${fs + 14}" rx="8" fill="#FEF9C3" stroke="#F59E0B" stroke-width="3"/>
      <text x="0" y="${fs + 2}" text-anchor="middle" class="g5l-q" font-size="${fs}">?</text>`);
    marks.append(g);
    return g;
  };

  // ── Bi lăn (làm tròn) ─────────────────────────────────────────────────────────────────────────────
  let ball = null;
  t.ball = (v) => {
    ball?.remove();
    ball = el('g', { class: 'g5l-ball', transform: `translate(${t.x(v)} ${Y - 24})` }, `
      <circle r="21" fill="#F43F5E" stroke="${INK}" stroke-width="4"/><circle cx="-7" cy="-7" r="6" fill="#fff" opacity="0.8"/>`);
    ball.dataset.v = v;
    top.append(ball);
    ball.animate([{ transform: `translate(${t.x(v)}px, ${Y - 140}px)` }, { transform: `translate(${t.x(v)}px, ${Y - 24}px)` }], { duration: anim(420), easing: 'cubic-bezier(.5,0,.8,.4)' });
    return ball;
  };
  /** Nghiêng tia số: -1 trái thấp, 1 phải thấp, 0 thẳng. */
  t.tilt = async (dir) => {
    tilt.style.transformOrigin = `${(X0 + X1) / 2}px ${Y}px`;
    tilt.style.transition = `transform ${anim(700)}ms ease-in-out`;
    tilt.style.transform = dir ? `rotate(${dir * 4}deg)` : '';
    await sleep(anim(750));
  };
  t.roll = async (to) => {
    if (!ball) return;
    const from = +ball.dataset.v;
    const x0 = t.x(from), x1 = t.x(to);
    const ms = anim(Math.min(1800, 500 + Math.abs(x1 - x0) * 3));
    const turns = ((x1 - x0) / (2 * Math.PI * 21)) * 360;
    await ball.animate([{ transform: `translate(${x0}px, ${Y - 24}px) rotate(0deg)` }, { transform: `translate(${x1}px, ${Y - 24}px) rotate(${turns}deg)` }],
      { duration: ms, easing: 'cubic-bezier(.45,0,.3,1)', fill: 'forwards' }).finished;
    ball.dataset.v = to;
    sfx.ding();
  };
  /**
   * Làm tròn v giữa hai mốc lo, hi (đã là hai đầu tia số): cờ ở hai mốc, mũi tên ở v, bi lăn về mốc gần hơn
   * (đúng giữa thì lăn lên). Trả về mốc.
   */
  t.roundDemo = async (v, lo, hi, { html = null, keep = false } = {}) => {
    if (!keep) t.clearMarks();
    t.flag(lo); t.flag(hi);
    t.pin(v, { html });
    await sleep(anim(450));
    t.ball(v);
    await sleep(anim(500));
    const dir = v - lo < hi - v - 1e-9 ? -1 : 1;
    await t.tilt(dir);
    const to = dir < 0 ? lo : hi;
    await t.roll(to);
    return to;
  };

  // Bấm lên tia số → số gần nhất theo vạch nhỏ.
  svg.addEventListener('click', (e) => {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    if (p.y < Y - 220 || p.y > Y + 130) return;
    const v = clean(R.lo + Math.round((t.v(p.x) - R.lo) / R.minor) * R.minor);
    if (v < R.lo - 1e-9 || v > R.hi + 1e-9) return;
    t.emit('tap', v);
  });

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
function injectDLineStyles() {
  if (styled) return;
  styled = true;
  css('g5-dline', `
    .g5l { flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 1cqh 1cqi; overflow: hidden; border-radius: 0.8rem; }
    .g5l-cap { flex: none; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(6.4cqh, 4cqi); line-height: 1.25; min-height: 2.5em; display: grid; place-items: center; position: relative; z-index: 1; }
    .g5l-cap b { color: #DC2626; }
    .g5l-cap .g5-fr { font-size: 0.75em; }
    .g5l-svg { flex: 1; min-height: 0; width: 100%; height: 100%; font-family: 'Baloo 2', sans-serif; overflow: visible; user-select: none; }
    .g5l-svg text { font-family: 'Baloo 2', sans-serif; }
    .g5l-lab { font-weight: 800; fill: #1E293B; }
    .g5l-minor { fill: #475569; }
    .g5l-q { font-weight: 800; fill: #F59E0B; }
    .g5l-flagtxt { font-weight: 800; fill: #fff; stroke: ${INK}; stroke-width: 6px; stroke-linejoin: round; paint-order: stroke; }
    .g5l-pintxt { font-weight: 800; stroke: #fff; stroke-width: 8px; paint-order: stroke; }
    @container (orientation: portrait) { .g5l-cap { font-size: min(4.6cqh, 6.2cqi); } }
  `);
}
