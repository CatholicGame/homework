/**
 * 📐 Ê ke trên giấy kẻ ô (Bài 27–30, 32, 35).
 *  - Giấy ô vuông; điểm có tên, đoạn thẳng / đường thẳng (kéo dài ra mép giấy), dấu góc vuông.
 *  - Ê ke: tam giác vuông, góc vuông ở "đỉnh ê ke". Kéo thân để dời, kéo núm vàng để xoay quanh đỉnh.
 *    Gần một điểm thì đỉnh hít vào; gần hướng một đường thì xoay khớp; gần đường "nền" (base) đã khớp hướng
 *    thì ê ke trượt dọc đường đó; cạnh kia đi qua điểm "through" thì dừng khớp → vẽ được đường vuông góc.
 *  - Bút chì vẽ theo cạnh ê ke (t.drawAlong).
 * Toạ độ trong state theo ô (x sang phải, y xuống dưới); vẽ SVG mỗi ô CELL đơn vị.
 */

import { css, emitter, INK, sfx } from './frame.js';
import { calmMotion } from '../grade3Games/fly.js';

const CELL = 50, COLS = 20, ROWS = 11;
const W = COLS * CELL, H = ROWS * CELL;
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}, html = '') => {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (html) e.innerHTML = html;
  return e;
};
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const norm = (d) => ((d % 360) + 360) % 360;
const diff = (a, b) => { const d = norm(a - b); return d > 180 ? d - 360 : d; };
/** Hướng (độ, theo màn hình: 0 = sang phải, 90 = xuống) từ p tới q. */
const dirOf = (p, q) => norm(deg(Math.atan2(q.y - p.y, q.x - p.x)));
const anim = (ms) => (calmMotion() ? Math.round(ms * 0.8) : ms);
const L1 = 6, L2 = 3.8; // hai cạnh góc vuông của ê ke (ô)

/** Chân đường vuông góc hạ từ p xuống đường qua a có hướng d (độ). */
function foot(p, a, d) {
  const ux = Math.cos(rad(d)), uy = Math.sin(rad(d));
  const k = (p.x - a.x) * ux + (p.y - a.y) * uy;
  return { x: a.x + k * ux, y: a.y + k * uy };
}
const dist = (p, q) => Math.hypot(p.x - q.x, p.y - q.y);

/** Đoạn của đường thẳng qua a hướng d, cắt trong khung giấy. */
function clipLine(a, d) {
  const ux = Math.cos(rad(d)), uy = Math.sin(rad(d));
  const ts = [];
  if (Math.abs(ux) > 1e-9) ts.push((0 - a.x) / ux, (COLS - a.x) / ux);
  if (Math.abs(uy) > 1e-9) ts.push((0 - a.y) / uy, (ROWS - a.y) / uy);
  const ok = ts.filter(t => { const x = a.x + t * ux, y = a.y + t * uy; return x >= -1e-6 && x <= COLS + 1e-6 && y >= -1e-6 && y <= ROWS + 1e-6; });
  const t0 = Math.min(...ok), t1 = Math.max(...ok);
  return [{ x: a.x + t0 * ux, y: a.y + t0 * uy }, { x: a.x + t1 * ux, y: a.y + t1 * uy }];
}

export function createSquare(host, { eke = true } = {}) {
  injectSquareStyles();
  const t = emitter({});
  host.innerHTML = `<div class="g4s"><div class="g4s-cap">&nbsp;</div><svg class="g4s-svg" viewBox="-20 -20 ${W + 40} ${H + 40}" preserveAspectRatio="xMidYMid meet"></svg></div>`;
  const svg = host.querySelector('svg');
  let grid = '';
  for (let i = 0; i <= COLS; i++) grid += `<line x1="${i * CELL}" y1="0" x2="${i * CELL}" y2="${H}"/>`;
  for (let j = 0; j <= ROWS; j++) grid += `<line x1="0" y1="${j * CELL}" x2="${W}" y2="${j * CELL}"/>`;
  svg.append(el('rect', { x: 0, y: 0, width: W, height: H, fill: '#fff', stroke: '#BAE6FD', 'stroke-width': 3 }));
  svg.append(el('g', { class: 'g4s-grid' }, grid));
  const gLines = el('g'), gMarks = el('g'), gPts = el('g'), gEke = el('g', { class: 'g4s-eke' }), gTop = el('g');
  svg.append(gLines, gMarks, gPts, gEke, gTop);

  const P = {}; // tên → {x, y}
  const LINES = {}; // id → { a, b, full, color, el }
  const S = { c: { x: 14, y: 9 }, rot: 0, base: null, through: null, aligned: false, on: null };
  t.P = P; t.LINES = LINES; t.S = S; t.svg = svg;
  t.caption = (html) => { host.querySelector('.g4s-cap').innerHTML = html || '&nbsp;'; };
  const X = (v) => v * CELL;

  t.point = (name, x, y, { color = INK, label = true, dx = -0.45, dy = -0.35 } = {}) => {
    P[name] = { x, y };
    gPts.querySelector(`[data-p="${name}"]`)?.remove();
    gPts.append(el('g', { 'data-p': name }, `<circle cx="${X(x)}" cy="${X(y)}" r="7" fill="${color}"/>
      ${label ? `<text x="${X(x + dx)}" y="${X(y + dy)}" class="g4s-name" fill="${color}">${name}</text>` : ''}`));
  };
  /** Đoạn thẳng hoặc đường thẳng (full) qua hai điểm (tên hoặc toạ độ). */
  t.line = (id, a, b, { full = false, color = INK, width = 5, dash = '' } = {}) => {
    const pa = typeof a === 'string' ? P[a] : a, pb = typeof b === 'string' ? P[b] : b;
    LINES[id]?.el.remove();
    const [q0, q1] = full ? clipLine(pa, dirOf(pa, pb)) : [pa, pb];
    const e = el('line', { x1: X(q0.x), y1: X(q0.y), x2: X(q1.x), y2: X(q1.y), stroke: color, 'stroke-width': width, 'stroke-linecap': 'round', ...(dash ? { 'stroke-dasharray': dash } : {}) });
    gLines.append(e);
    LINES[id] = { a: pa, b: pb, full, color, el: e, d: dirOf(pa, pb) };
    return e;
  };
  /** Kéo dài đoạn thành đường thẳng tới mép giấy (có chuyển động). */
  t.extend = async (id, { color } = {}) => {
    const L = LINES[id];
    const [q0, q1] = clipLine(L.a, L.d);
    const ext = el('line', { x1: X(q0.x), y1: X(q0.y), x2: X(q1.x), y2: X(q1.y), stroke: color || L.color, 'stroke-width': 4, 'stroke-dasharray': '14 10', 'stroke-linecap': 'round' });
    gLines.insertBefore(ext, gLines.firstChild);
    const len = dist(q0, q1) * CELL;
    await ext.animate([{ strokeDashoffset: len, clipPath: 'inset(0 50% 0 50%)' }, { strokeDashoffset: 0, clipPath: 'inset(0 0 0 0)' }], { duration: anim(900), easing: 'ease-out' }).finished;
    L.ext = ext;
  };
  t.rightMark = (at, d1, d2, { color = '#16A34A', size = 0.45 } = {}) => {
    const p = typeof at === 'string' ? P[at] : at;
    const u = { x: Math.cos(rad(d1)) * size, y: Math.sin(rad(d1)) * size }, v = { x: Math.cos(rad(d2)) * size, y: Math.sin(rad(d2)) * size };
    const m = el('path', { d: `M${X(p.x + u.x)} ${X(p.y + u.y)} L${X(p.x + u.x + v.x)} ${X(p.y + u.y + v.y)} L${X(p.x + v.x)} ${X(p.y + v.y)}`, fill: 'none', stroke: color, 'stroke-width': 4 });
    gMarks.append(m);
    return m;
  };
  t.clearMarks = () => { gMarks.innerHTML = ''; gTop.innerHTML = ''; };
  /** Phần tử phủ trên cùng (chữ, ngoặc). */
  t.top = (html) => { gTop.insertAdjacentHTML('beforeend', html); };
  t.X = X;

  // ── Ê ke ──────────────────────────────────────────────────────────────────────────────────────────
  gEke.innerHTML = `
    <g class="g4s-eke-body">
      <path d="M0 0 L${L1 * CELL} 0 L0 ${-L2 * CELL} Z" fill="rgba(253, 224, 71, 0.55)" stroke="#A16207" stroke-width="4" stroke-linejoin="round"/>
      <path d="M${CELL * 1.2} ${-CELL * 0.9} L${L1 * CELL * 0.55} ${-CELL * 0.9} L${CELL * 1.2} ${-L2 * CELL * 0.62} Z" fill="#fff" fill-opacity="0.7" stroke="#A16207" stroke-width="3"/>
      ${Array.from({ length: L1 * 2 }, (_, i) => `<line x1="${i * CELL / 2}" y1="0" x2="${i * CELL / 2}" y2="${i % 2 ? -10 : -18}" stroke="#A16207" stroke-width="2"/>`).join('')}
      <path d="M0 -26 H26 V0" fill="none" stroke="#DC2626" stroke-width="4"/>
    </g>
    <g class="g4s-knob" transform="translate(${L1 * CELL * 0.62} ${-L2 * CELL * 0.18})"><circle r="26" fill="#FDE047" stroke="${INK}" stroke-width="4"/>
      <path d="M-10 -7 A 12 12 0 1 1 -10 7" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/></g>`;
  if (!eke) gEke.style.display = 'none';
  function placeEke() {
    gEke.setAttribute('transform', `translate(${X(S.c.x)} ${X(S.c.y)}) rotate(${S.rot})`);
    // Khớp: đỉnh trên đường nền, một cạnh dọc theo đường nền, cạnh kia qua điểm `through` (nếu có).
    let ok = false;
    if (S.base) {
      const L = LINES[S.base];
      const onLine = dist(S.c, foot(S.c, L.a, L.d)) < 0.02;
      const dirOk = [0, 90, 180, 270].some(k => Math.abs(diff(S.rot + k, L.d)) < 0.3);
      const thr = S.through ? P[S.through] : null;
      const passes = !thr || dist(S.c, foot(thr, L.a, L.d)) < 0.02;
      ok = onLine && dirOk && passes;
    } else if (S.on) {
      ok = dist(S.c, P[S.on]) < 0.02;
    }
    S.aligned = ok;
    gEke.classList.toggle('g4s-eke-ok', ok);
  }
  t.eke = (o) => { Object.assign(S, o); if (o.c) S.c = { ...o.c }; placeEke(); };
  t.ekeVisible = (on) => { gEke.style.display = on ? '' : 'none'; };
  /** Hai hướng cạnh ê ke (độ màn hình): cạnh dài và cạnh ngắn. */
  t.legs = () => [norm(S.rot), norm(S.rot - 90)];
  t.moveEke = async (c, rot, ms = 900) => {
    const c0 = { ...S.c }, r0 = S.rot, dr = diff(rot, r0), dur = anim(ms), t0 = performance.now();
    await new Promise((res) => {
      const step = (now) => {
        const k = Math.min(1, (now - t0) / dur), e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
        S.c = { x: c0.x + (c.x - c0.x) * e, y: c0.y + (c.y - c0.y) * e }; S.rot = r0 + dr * e;
        placeEke();
        if (k < 1) requestAnimationFrame(step); else res();
      };
      requestAnimationFrame(step);
    });
    S.rot = norm(rot);
    placeEke();
    t.emit('eke');
  };

  /** Bút chì vẽ đường thẳng qua p theo hướng d (độ), có chuyển động. Trả về id đường mới. */
  t.drawAlong = async (id, p, d, { color = '#2563EB' } = {}) => {
    const [q0, q1] = clipLine(p, d);
    const e = t.line(id, q0, q1, { color, width: 5 });
    const len = dist(q0, q1) * CELL;
    e.setAttribute('stroke-dasharray', `${len}`);
    sfx.swish();
    await e.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: anim(1100), easing: 'ease-in-out' }).finished;
    e.removeAttribute('stroke-dasharray');
    LINES[id].d = norm(d);
    LINES[id].a = p;
    return id;
  };

  // ── Kéo thả ê ke ──────────────────────────────────────────────────────────────────────────────────
  const toGrid = (e) => { const q = svg.createSVGPoint(); q.x = e.clientX; q.y = e.clientY; const r = q.matrixTransform(svg.getScreenCTM().inverse()); return { x: r.x / CELL, y: r.y / CELL }; };
  let drag = null;
  let locked = false;
  t.lock = (on) => { locked = on; svg.classList.toggle('g4s-locked', on); };
  svg.addEventListener('pointerdown', (e) => {
    if (locked) return;
    const p = toGrid(e);
    if (e.target.closest('.g4s-knob')) drag = { kind: 'rot' };
    else if (e.target.closest('.g4s-eke-body')) drag = { kind: 'move', dx: S.c.x - p.x, dy: S.c.y - p.y };
    else return;
    svg.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  svg.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const p = toGrid(e);
    if (drag.kind === 'rot') {
      let r = norm(deg(Math.atan2(p.y - S.c.y, p.x - S.c.x)) - deg(Math.atan2(-L2 * 0.18, L1 * 0.62)));
      const dirs = Object.values(LINES).map(L => L.d);
      for (const d of dirs) for (const k of [0, 90, 180, 270]) if (Math.abs(diff(r, d + k)) < 6) r = norm(d + k);
      S.rot = r;
    } else {
      let c = { x: p.x + drag.dx, y: p.y + drag.dy };
      // trượt dọc đường nền khi đã khớp hướng
      if (S.base) {
        const L = LINES[S.base];
        const dirOk = [0, 90, 180, 270].some(k => Math.abs(diff(S.rot + k, L.d)) < 0.3);
        const f = foot(c, L.a, L.d);
        if (dirOk && dist(c, f) < 0.6) {
          c = f;
          const thr = S.through ? P[S.through] : null;
          if (thr) { const g = foot(thr, L.a, L.d); if (dist(c, g) < 0.45) c = g; }
        }
      }
      for (const q of Object.values(P)) if (dist(c, q) < 0.35) c = { ...q };
      S.c = c;
    }
    placeEke();
    t.emit('eke');
  });
  const up = () => { if (drag) { drag = null; if (S.aligned) sfx.ding(); t.emit('eke'); } };
  svg.addEventListener('pointerup', up);
  svg.addEventListener('pointercancel', up);

  placeEke();
  return t;
}

let styled = false;
function injectSquareStyles() {
  if (styled) return;
  styled = true;
  css('g4-square', `
    .g4s { flex: 1; min-height: 0; display: flex; flex-direction: column; }
    .g4s-cap { flex: none; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(6.5cqh, 4cqi); line-height: 1.25; min-height: 1.3em; padding-top: 0.6cqh; }
    .g4s-cap b { color: #DC2626; }
    .g4s-svg { flex: 1; min-height: 0; width: 100%; height: 100%; font-family: 'Baloo 2', sans-serif; touch-action: none; user-select: none; }
    .g4s-grid line { stroke: #E0F2FE; stroke-width: 2; }
    .g4s-name { font-weight: 800; font-size: 34px; text-anchor: middle; dominant-baseline: middle; paint-order: stroke; stroke: #fff; stroke-width: 6px; }
    .g4s-eke-body { cursor: grab; }
    .g4s-knob { cursor: grab; }
    .g4s-locked .g4s-eke-body, .g4s-locked .g4s-knob { cursor: default; }
    .g4s-eke-ok .g4s-eke-body > path:first-child { fill: rgba(134, 239, 172, 0.6); stroke: #15803D; }
  `);
}

export { dirOf, foot, CELL };
