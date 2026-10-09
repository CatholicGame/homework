/**
 * 🔟 Hai khung 10 ô (Toán 2, cộng trừ qua 10): chấm đỏ là số thứ nhất, chấm xanh chờ ở khay.
 *   Cộng: bấm chấm xanh ở khay → bay vào ô trống tiếp theo (đầy khung thứ nhất rồi sang khung thứ hai).
 *   Trừ: bấm chấm trong khung → bị gạch đi.
 * Trên khung: phép tính và hình tách số như SGK ("5" tách thành "2" và "3").
 */

import { createStage, desk, INK, sfx, svgEl } from './stage.js';

const RED = '#EF4444', BLUE = '#3B82F6';

export function createFrames(host, { a = 0, b = 0, sub = false } = {}) {
  const t = createStage(host, { bg: desk(0.12) });
  const T = t.tall;
  const cell = T ? 130 : 92;
  // ô k (0..19): khung f = k < 10 ? 0 : 1
  const F = T ? [[175, 375], [175, 655]] : [[40, 360], [520, 360]];
  const cxy = (k) => { const f = k < 10 ? 0 : 1, i = k % 10; return [F[f][0] + (i % 5) * cell + cell / 2, F[f][1] + Math.floor(i / 5) * cell + cell / 2]; };
  const trayY = T ? 980 : 650, trayGap = T ? 100 : 96, r = cell * 0.38;
  const trayX = (i, n) => 500 - ((n - 1) * trayGap) / 2 + i * trayGap;
  let g = '';
  for (const [x, y] of F) {
    g += `<rect x="${x}" y="${y}" width="${5 * cell}" height="${2 * cell}" rx="14" fill="#fff" stroke="${INK}" stroke-width="5"/>`;
    for (let i = 1; i < 5; i++) g += `<path d="M${x + i * cell} ${y} V${y + 2 * cell}" stroke="${INK}" stroke-width="2.5"/>`;
    g += `<path d="M${x} ${y + cell} H${x + 5 * cell}" stroke="${INK}" stroke-width="2.5"/>`;
  }
  t.draw(`<g class="x2f-top"></g><g class="x2f-frames">${g}</g><g class="x2f-dots"></g>
    <rect class="x2f-tray" x="${trayX(0, 9) - trayGap / 2 - 10}" y="${trayY - trayGap / 2 - 6}" width="${9 * trayGap + 20}" height="${trayGap + 12}" rx="${trayGap / 2}" fill="#E0F2FE" stroke="#93C5FD" stroke-width="3" opacity="${sub ? 0 : 1}"/>
    <g class="x2f-traydots"></g>`);
  const top = t.q('.x2f-top'), dots = t.q('.x2f-dots'), tray = t.q('.x2f-traydots');
  const cells = Array(20).fill(null); // { el, color, crossed }
  let trayLeft = [];
  let lockedTo = null; // sub: chỉ được gạch ở khung 0 / 1
  let locked = false;
  t.r = r;

  const dot = (x, y, fill, extra = '') => svgEl('g', { transform: `translate(${x} ${y})`, ...extra }, `<circle r="${r}" fill="${fill}" stroke="${INK}" stroke-width="3"/>
    <path class="x2f-x" d="M${-r * 0.8} ${-r * 0.8} L${r * 0.8} ${r * 0.8} M${r * 0.8} ${-r * 0.8} L${-r * 0.8} ${r * 0.8}" stroke="${INK}" stroke-width="7" stroke-linecap="round" opacity="0"/>`);

  t.reset = ({ a: na = 0, b: nb = 0 } = {}) => {
    dots.innerHTML = ''; tray.innerHTML = ''; top.innerHTML = '';
    cells.fill(null); trayLeft = [];
    for (let k = 0; k < na; k++) {
      const [x, y] = cxy(k);
      const e = dot(x, y, RED, { 'data-tap': `c:${k}` });
      dots.append(e); cells[k] = { el: e, color: RED, crossed: false };
    }
    for (let i = 0; i < nb; i++) {
      const e = dot(trayX(i, nb), trayY, BLUE, { 'data-tap': `t:${i}` });
      tray.append(e); trayLeft.push(e);
    }
    refresh();
  };
  function refresh() {
    t.qa('.x2f-dots > g').forEach((e) => {
      const k = +e.dataset.tap.slice(2);
      const c = cells[k];
      e.classList.toggle('x2a-off', locked || !sub || c.crossed || (lockedTo != null && (k < 10 ? 0 : 1) !== lockedTo));
    });
    trayLeft.forEach((e) => e.classList.toggle('x2a-off', locked));
  }
  Object.defineProperty(t, 'count', { get: () => cells.filter((c) => c && !c.crossed).length });
  Object.defineProperty(t, 'crossed', { get: () => cells.filter((c) => c && c.crossed).length });
  Object.defineProperty(t, 'left', { get: () => trayLeft.length });
  t.full = (f) => cells.slice(f * 10, f * 10 + 10).every((c) => c && !c.crossed);
  t.inFrame = (f) => cells.slice(f * 10, f * 10 + 10).filter((c) => c && !c.crossed).length;
  t.lock = (on) => { locked = on; refresh(); };
  t.onlyFrame = (f) => { lockedTo = f; refresh(); };
  t.trayEl = () => trayLeft[0];
  t.dotEl = (f) => cells.slice(f * 10, f * 10 + 10).reverse().find((c) => c && !c.crossed)?.el;
  t.frameBox = (f) => t.qa('.x2f-frames > rect')[f];
  t.glowFrame = (f) => t.qa('.x2f-frames > rect').forEach((e, i) => { e.setAttribute('stroke', i === f ? '#F59E0B' : INK); e.setAttribute('stroke-width', i === f ? 10 : 5); });

  /** Đưa chấm xanh đầu khay vào ô trống tiếp theo. */
  t.place = async () => {
    const e = trayLeft.shift(); if (!e) return;
    const k = cells.findIndex((c) => !c);
    const [x, y] = cxy(k);
    const [x0, y0] = e.getAttribute('transform').match(/[-\d.]+/g).map(Number);
    e.remove();
    const d = dot(x, y, BLUE, { 'data-tap': `c:${k}` });
    dots.append(d); cells[k] = { el: d, color: BLUE, crossed: false };
    refresh();
    sfx.pop?.(k % 10);
    await t.flyIn(d, x0 - x, y0 - y, 460, { lift: 60 });
    if (k === 9) { sfx.ding?.(); t.glowFrame(0); await t.pop(t.frameBox(0)); t.glowFrame(null); }
  };
  t.cross = async (k) => {
    const c = cells[k]; if (!c || c.crossed) return;
    c.crossed = true; refresh();
    sfx.tap?.();
    const x = c.el.querySelector('.x2f-x');
    x.setAttribute('opacity', 1);
    c.el.querySelector('circle').setAttribute('opacity', 0.35);
    await t.anim(x, [{ opacity: 0 }, { opacity: 1 }], 220);
  };

  /** Hình tách số dưới số n của phép tính ở (x, y): n → p và q. */
  t.split = (x, y, n, p, q, { show = [true, true] } = {}) => {
    const box = (bx, by, v, cls, vis = true) => `<g class="${cls}"><rect x="${bx - 38}" y="${by - 34}" width="76" height="68" rx="14" fill="#fff" stroke="#F59E0B" stroke-width="4"/>
      <text class="x2a-t" x="${bx}" y="${by + 2}" font-size="50" fill="#B45309" opacity="${vis ? 1 : 0}">${v}</text></g>`;
    top.insertAdjacentHTML('beforeend', `<g class="x2f-split"><path d="M${x} ${y + 6} L${x - 60} ${y + 70} M${x} ${y + 6} L${x + 60} ${y + 70}" stroke="#F59E0B" stroke-width="5" stroke-linecap="round"/>
      ${box(x - 70, y + 104, p, 'x2f-sp', show[0])}${box(x + 70, y + 104, q, 'x2f-sq', show[1])}</g>`);
    return t.q('.x2f-split:last-child');
  };
  t.reveal = (cls) => { const e = t.q(`.${cls} text`); if (e) { e.setAttribute('opacity', 1); t.pop(e); } };
  /** Phép tính lớn ở trên khung. Trả về toạ độ x của từng phần. */
  t.expr = (parts, y = T ? 170 : 150, fs = T ? 110 : 96) => {
    top.querySelectorAll('.x2f-expr').forEach((e) => e.remove());
    const ws = parts.map((s) => String(s).length * fs * 0.58), gap = fs * 0.35;
    let x = 500 - (ws.reduce((a, b2) => a + b2, 0) + gap * (parts.length - 1)) / 2;
    const xs = [];
    const g2 = svgEl('g', { class: 'x2f-expr' });
    parts.forEach((s, i) => {
      const mid = x + ws[i] / 2; xs.push(mid); x += ws[i] + gap;
      g2.insertAdjacentHTML('beforeend', `<text class="x2a-t x2a-halo" data-i="${i}" x="${mid}" y="${y}" font-size="${fs}" fill="${s === '?' ? '#2563EB' : INK}">${s}</text>`);
    });
    top.append(g2);
    t.exprY = y;
    return xs;
  };
  t.setPart = (i, v) => { const e = t.q(`.x2f-expr [data-i="${i}"]`); if (e) { e.textContent = v; e.setAttribute('fill', '#16A34A'); t.pop(e); } };
  t.clearTop = () => { top.innerHTML = ''; };

  t.on(async (ev, key) => {
    if (ev !== 'tap' || locked) return;
    const [kind, n] = key.split(':');
    if (kind === 't' && !sub) { await t.place(); t.emit('change'); }
    else if (kind === 'c' && sub) { await t.cross(+n); t.emit('change'); }
  });
  t.reset({ a, b });
  return t;
}
