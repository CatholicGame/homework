/**
 * 📌 Bảng ghim tứ giác (Bài 31, 32, 35): bốn đỉnh A, B, C, D cắm trên đinh của bảng ô vuông, nối bằng dây chun.
 * Kéo đỉnh → hít vào đinh gần nhất. Hình tự hiện:
 *   - mũi tên trên các cặp cạnh song song (một mũi tên / hai mũi tên),
 *   - vạch nhỏ trên các cạnh bằng nhau (một vạch / hai vạch),
 *   - ô vuông ở góc vuông,
 *   - tên hình: tứ giác / hình bình hành / hình thoi / hình chữ nhật / hình vuông.
 */

import { css, emitter, INK, sfx, watchUnits } from './frame.js';

const CELL = 50, COLS = 20, ROWS = 11, W = COLS * CELL, H = ROWS * CELL;
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}, html = '') => {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (html) e.innerHTML = html;
  return e;
};
const sub = (p, q) => ({ x: p.x - q.x, y: p.y - q.y });
const cross = (u, v) => u.x * v.y - u.y * v.x;
const dot = (u, v) => u.x * v.x + u.y * v.y;
const len2 = (u) => u.x * u.x + u.y * u.y;
const NAMES = ['A', 'B', 'C', 'D'];

/** Loại tứ giác từ 4 đỉnh (toạ độ nguyên). */
export function classify(P) {
  const s = [sub(P[1], P[0]), sub(P[2], P[1]), sub(P[3], P[2]), sub(P[0], P[3])];
  const par1 = cross(s[0], s[2]) === 0, par2 = cross(s[1], s[3]) === 0;
  const L = s.map(len2);
  const right = [0, 1, 2, 3].map(i => dot(s[i], s[(i + 3) % 4]) === 0);
  const eqAll = L.every(x => x === L[0]);
  // tự cắt (hai cạnh đối diện cắt nhau) → không tính là tứ giác lồi
  const area2 = Math.abs(cross(sub(P[2], P[0]), sub(P[3], P[1])));
  const convex = [0, 1, 2, 3].every(i => Math.sign(cross(s[i], s[(i + 1) % 4])) === Math.sign(cross(s[0], s[1]))) && area2 > 0;
  let kind = 'tứ giác';
  if (convex && par1 && par2) kind = eqAll ? (right[0] ? 'hình vuông' : 'hình thoi') : right[0] ? 'hình chữ nhật' : 'hình bình hành';
  return { kind, par1, par2, L, right, convex, eqAll };
}

export function createQuad(host, pts, { movable = [0, 1, 2, 3], marks = true, label = true } = {}) {
  injectQuadStyles();
  const t = emitter({});
  host.innerHTML = `<div class="g4q"><div class="g4q-cap">&nbsp;</div><svg class="g4q-svg" viewBox="-30 -30 ${W + 60} ${H + 60}" preserveAspectRatio="xMidYMid meet"></svg></div>`;
  const svg = host.querySelector('svg');
  watchUnits(svg);
  let pins = '';
  for (let i = 0; i <= COLS; i++) for (let j = 0; j <= ROWS; j++) pins += `<circle cx="${i * CELL}" cy="${j * CELL}" r="4.5"/>`;
  svg.append(el('rect', { x: -22, y: -22, width: W + 44, height: H + 44, rx: 26, fill: '#D6A15B', stroke: '#B07A3B', 'stroke-width': 3 }));
  svg.append(el('rect', { x: -6, y: -6, width: W + 12, height: H + 12, rx: 12, fill: '#FDE7C4' }));
  svg.append(el('g', { class: 'g4q-pins' }, pins));
  const gShape = el('g'), gMarks = el('g'), gPts = el('g');
  svg.append(gShape, gMarks, gPts);
  const P = pts.map(p => ({ ...p }));
  let showMarks = marks;
  t.P = P;
  t.svg = svg;
  t.caption = (html) => { host.querySelector('.g4q-cap').innerHTML = html || '&nbsp;'; };
  t.info = () => classify(P);
  t.kind = () => classify(P).kind;
  const X = (v) => v * CELL;

  function draw() {
    const info = classify(P);
    gShape.innerHTML = `<polygon points="${P.map(p => `${X(p.x)},${X(p.y)}`).join(' ')}" class="g4q-poly ${info.kind !== 'tứ giác' ? 'g4q-good' : ''}"/>`;
    gMarks.innerHTML = '';
    if (showMarks) {
      const side = (i) => [P[i], P[(i + 1) % 4]];
      // mũi tên song song
      const arrow = (i, n) => {
        const [a, b] = side(i); const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
        const dir = i >= 2 ? 180 : 0; // cạnh đối diện đi ngược chiều → quay mũi tên cho cùng hướng
        let g = '';
        for (let k = 0; k < n; k++) g += `<path d="M${-10 + k * 16 - (n - 1) * 8} -11 L${4 + k * 16 - (n - 1) * 8} 0 L${-10 + k * 16 - (n - 1) * 8} 11" fill="none" stroke="#DC2626" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
        gMarks.insertAdjacentHTML('beforeend', `<g transform="translate(${X(m.x)} ${X(m.y)}) rotate(${ang + dir})">${g}</g>`);
      };
      if (info.par1) { arrow(0, 1); arrow(2, 1); }
      if (info.par2) { arrow(1, 2); arrow(3, 2); }
      // vạch cạnh bằng nhau (nhóm theo độ dài, chỉ khi có ít nhất hai cạnh cùng độ dài)
      const groups = [...new Set(info.L)].filter(v => info.L.filter(x => x === v).length >= 2);
      info.L.forEach((v, i) => {
        const gi = groups.indexOf(v);
        if (gi < 0) return;
        const [a, b] = side(i); const t0 = 0.3;
        const m = { x: a.x + (b.x - a.x) * t0, y: a.y + (b.y - a.y) * t0 };
        const ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
        let g = '';
        for (let k = 0; k <= gi; k++) g += `<line x1="${k * 10 - gi * 5}" y1="-14" x2="${k * 10 - gi * 5}" y2="14" stroke="#2563EB" stroke-width="5" stroke-linecap="round"/>`;
        gMarks.insertAdjacentHTML('beforeend', `<g transform="translate(${X(m.x)} ${X(m.y)}) rotate(${ang})">${g}</g>`);
      });
      // góc vuông
      info.right.forEach((r, i) => {
        if (!r) return;
        const p = P[i], a = P[(i + 1) % 4], b = P[(i + 3) % 4];
        const u = sub(a, p), v = sub(b, p); const lu = Math.sqrt(len2(u)), lv = Math.sqrt(len2(v));
        const k = 0.5;
        const q1 = { x: p.x + u.x / lu * k, y: p.y + u.y / lu * k }, q2 = { x: p.x + v.x / lv * k, y: p.y + v.y / lv * k };
        gMarks.insertAdjacentHTML('beforeend', `<path d="M${X(q1.x)} ${X(q1.y)} L${X(q1.x + q2.x - p.x)} ${X(q1.y + q2.y - p.y)} L${X(q2.x)} ${X(q2.y)}" fill="none" stroke="#16A34A" stroke-width="4"/>`);
      });
    }
    // đỉnh
    const cx = P.reduce((s, p) => s + p.x, 0) / 4, cy = P.reduce((s, p) => s + p.y, 0) / 4;
    gPts.innerHTML = P.map((p, i) => {
      const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy) || 1;
      const lx = X(p.x + dx / d * 0.75), ly = X(p.y + dy / d * 0.75);
      return `<g class="g4q-v ${movable.includes(i) ? 'g4q-move' : ''}" data-i="${i}">
        <circle cx="${X(p.x)}" cy="${X(p.y)}" r="${movable.includes(i) ? 20 : 12}" class="g4q-dot"/>
        <text x="${lx}" y="${ly}" class="g4q-name">${NAMES[i]}</text></g>`;
    }).join('');
    if (label) t.caption(info.kind === 'tứ giác' ? 'Tứ giác ABCD' : `ABCD là <b>${info.kind}</b>`);
  }

  t.set = (pts2) => { pts2.forEach((p, i) => { P[i] = { ...p }; }); draw(); };
  t.marks = (on) => { showMarks = on; draw(); };
  t.movable = (list) => { movable = list; draw(); };
  t.label = (on) => { label = on; draw(); };

  /** Thầy làm mẫu: kéo đỉnh i tới p. */
  t.moveVertex = async (i, p, ms = 700) => {
    const p0 = { ...P[i] }, t0 = performance.now();
    await new Promise((res) => {
      const step = (now) => {
        const k = Math.min(1, (now - t0) / ms);
        P[i] = { x: p0.x + (p.x - p0.x) * k, y: p0.y + (p.y - p0.y) * k };
        if (k >= 1) P[i] = { ...p };
        draw();
        if (k < 1) requestAnimationFrame(step); else res();
      };
      requestAnimationFrame(step);
    });
    t.emit('move');
  };

  const toGrid = (e) => { const q = svg.createSVGPoint(); q.x = e.clientX; q.y = e.clientY; const r = q.matrixTransform(svg.getScreenCTM().inverse()); return { x: r.x / CELL, y: r.y / CELL }; };
  let drag = null, locked = false;
  t.lock = (on) => { locked = on; };
  svg.addEventListener('pointerdown', (e) => {
    if (locked) return;
    const v = e.target.closest('.g4q-move');
    if (!v) return;
    drag = +v.dataset.i;
    svg.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  svg.addEventListener('pointermove', (e) => {
    if (drag == null) return;
    const p = toGrid(e);
    const q = { x: Math.max(0, Math.min(COLS, Math.round(p.x))), y: Math.max(0, Math.min(ROWS, Math.round(p.y))) };
    if (q.x !== P[drag].x || q.y !== P[drag].y) {
      if (P.some((r, i) => i !== drag && r.x === q.x && r.y === q.y)) return;
      P[drag] = q; sfx.tap(); draw(); t.emit('move');
    }
  });
  const up = () => { if (drag != null) { drag = null; if (t.kind() !== 'tứ giác') sfx.ding(); t.emit('drop'); } };
  svg.addEventListener('pointerup', up);
  svg.addEventListener('pointercancel', up);

  draw();
  return t;
}

let styled = false;
function injectQuadStyles() {
  if (styled) return;
  styled = true;
  css('g4-quad', `
    .g4q { flex: 1; min-height: 0; display: flex; flex-direction: column; }
    .g4q-cap { flex: none; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: max(1.05rem, min(6.5cqh, 4cqi)); line-height: 1.25; min-height: 2.5em; padding-top: 0.6cqh; }
    .g4q-cap b { color: #7C3AED; }
    .g4q-svg { flex: 1; min-height: 0; width: 100%; height: 100%; font-family: 'Baloo 2', sans-serif; touch-action: none; user-select: none; }
    .g4q-pins circle { fill: #92400E; }
    .g4q-poly { fill: rgba(196, 181, 253, 0.35); stroke: #7C3AED; stroke-width: 5; stroke-linejoin: round; transition: fill .2s; }
    .g4q-good { fill: rgba(167, 243, 208, 0.5); }
    .g4q-dot { fill: #fff; stroke: ${INK}; stroke-width: 2.5; }
    .g4q-move .g4q-dot { fill: #F472B6; cursor: grab; }
    .g4q-name { font-weight: 800; font-size: max(40px, calc(var(--u, 0) * 20px)); text-anchor: middle; dominant-baseline: middle; fill: ${INK}; paint-order: stroke; stroke: #FDE7C4; stroke-width: 7px; }
  `);
}
