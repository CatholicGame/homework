/**
 * 📊 Biểu đồ cột (Toán 4 Bài 50): trục dọc chia vạch đều, cột cao đúng tỉ lệ số liệu, tên dưới mỗi cột, số ở đỉnh cột.
 *   - edit: các cột em kéo đỉnh lên / xuống (hít theo snap) để vẽ cho đúng bảng số liệu, sự kiện 'change' / 'drop';
 *   - chạm cột: sự kiện 'tap' (cột cao nhất, thấp nhất …);
 *   - show[i]: 'v' số ở đỉnh cột, '?' ô trống để gõ số (đọc theo trục), '' không ghi;
 *   - hline(v): đường gióng nét đứt từ trục dọc sang (đọc số, "nhiều hơn 50");
 *   - table: bảng số liệu (có thể kèm vạch kiểm đếm) bên trái biểu đồ (màn dọc: phía trên).
 * SVG vẽ lại theo đúng cỡ chỗ trống (1 đơn vị = 1 điểm ảnh), chữ đủ to cả màn dọc.
 */

import { css, emitter, INK, EDGE, sfx } from './frame.js';
import { calmMotion } from '../grade3Games/fly.js';
import { fmt } from './num.js';
import { tallySvg } from './chance.js';

const NS = 'http://www.w3.org/1999/xhtml';
const lines2 = (s) => { const w = String(s).split(' '); if (w.length < 2 || s.length <= 5) return [s]; const h = Math.ceil(w.length / 2); return [w.slice(0, h).join(' '), w.slice(h).join(' ')]; };

/**
 * opts: cats, values, max, step, yUnit, xUnit, title, color, ink (màu số đỉnh cột), show ('v' | '?' | '' hoặc mảng),
 *       edit (chỉ số các cột kéo được), snap, table ({ head, tally, style } hoặc null), explore (chừa đáy).
 */
export function createChart(host, o) {
  injectChartStyles();
  const t = emitter({});
  const n = o.cats.length;
  const st = {
    values: [...o.values], show: Array.isArray(o.show) ? [...o.show] : Array(n).fill(o.show ?? 'v'),
    edit: new Set(o.edit || []), marks: Array(n).fill(''), hlines: [], focus: '', grow: true,
  };
  const max = o.max, step = o.step, snap = o.snap || step;
  const color = o.color || '#F59E0B', ink = o.ink || '#EA580C';
  const tbl = o.table;
  host.innerHTML = `<div class="g4ch ${o.explore ? 'g4ch-ex' : ''}">
      <div class="g4ch-title">${o.title || '&nbsp;'}</div>
      <div class="g4ch-body">${tbl ? '<div class="g4ch-tbl"></div>' : ''}<div class="g4ch-plot"><svg class="g4ch-svg" aria-hidden="true"></svg></div></div>
    </div>`;
  const root = host.querySelector('.g4ch');
  const plot = root.querySelector('.g4ch-plot');
  const svg = root.querySelector('svg');
  const boxes = new Map(); // i → span (ô gõ số đỉnh cột), giữ nguyên qua các lần vẽ lại
  let G = null;

  if (tbl) {
    const head = tbl.head || ['', 'Số liệu'];
    const tallyCell = (i) => (tbl.tally ? `<td class="g4ch-tt">${tallySvg(tbl.values?.[i] ?? st.values[i], { style: tbl.style || 'square', groups: Math.ceil(Math.max(...(tbl.values || st.values)) / 5) })}</td>` : '');
    const val = (i) => fmt(tbl.values?.[i] ?? st.values[i]);
    root.querySelector('.g4ch-tbl').innerHTML = `
      <table class="g4ch-tv"><tr><th>${head[0]}</th>${tbl.tally ? '<th>Kiểm đếm</th>' : ''}<th>${head[1]}</th></tr>
        ${o.cats.map((c, i) => `<tr data-i="${i}"><td>${c}</td>${tallyCell(i)}<td class="g4ch-tn">${val(i)}</td></tr>`).join('')}</table>
      <table class="g4ch-th"><tr><th>${head[0]}</th>${o.cats.map((c, i) => `<td data-i="${i}">${c}</td>`).join('')}</tr>
        ${tbl.tally ? `<tr><th>Kiểm đếm</th>${o.cats.map((_, i) => tallyCell(i).replace('<td class="g4ch-tt">', `<td class="g4ch-tt" data-i="${i}">`)).join('')}</tr>` : ''}
        <tr><th>${head[1]}</th>${o.cats.map((_, i) => `<td class="g4ch-tn" data-i="${i}">${val(i)}</td>`).join('')}</tr></table>`;
  }

  function geom() {
    const w = Math.max(200, plot.clientWidth), h = Math.max(160, plot.clientHeight);
    const fs = Math.max(13, Math.min(h * 0.06, w * 0.042, 30));
    const tickLab = fmt(max).length;
    const x0 = fs * (0.62 * tickLab + 0.9);
    const x1 = w - fs * 0.6;
    const catLines = Math.max(...o.cats.map(c => (String(c).length * fs * 0.55 > (x1 - x0) / n * 0.95 ? lines2(c).length : 1)));
    const yBase = h - fs * ((catLines + (o.xUnit ? 1 : 0)) * 1.12 + 0.45);
    const yTop = fs * 2.3;
    const slot = (x1 - x0) / n;
    const colW = Math.min(slot * 0.56, fs * 4.4);
    return { w, h, fs, x0, x1, yTop, yBase, slot, colW, catLines, k: (yBase - yTop) / max };
  }
  const yOf = (v) => G.yBase - v * G.k;
  const cx = (i) => G.x0 + G.slot * (i + 0.5);

  function render() {
    G = geom();
    const { w, h, fs, x0, x1, yTop, yBase, slot, colW } = G;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    let s = '';
    // lưới
    const ticks = Math.round(max / step);
    const every = ticks > 12 ? 2 : 1;
    s += `<rect x="${x0}" y="${yTop - fs * 0.9}" width="${x1 - x0}" height="${yBase - yTop + fs * 0.9}" fill="#fff"/>`;
    for (let k = 0; k <= n * 2; k++) { const x = x0 + (slot / 2) * k; s += `<path d="M${x} ${yTop - fs * 0.9}V${yBase}" class="g4ch-grid"/>`; }
    for (let k = 0; k <= ticks; k++) {
      const y = yOf(k * step);
      s += `<path d="M${x0} ${y}H${x1}" class="g4ch-grid"/>`;
      if (k % every === 0) s += `<text x="${x0 - fs * 0.35}" y="${y + fs * 0.34}" class="g4ch-tick" font-size="${fs}">${fmt(k * step)}</text>`;
    }
    s += `<rect x="${x0}" y="${yTop - fs * 0.9}" width="${x1 - x0}" height="${yBase - yTop + fs * 0.9}" fill="none" stroke="${INK}" stroke-width="1.6" stroke-opacity="0.7"/>`;
    s += `<path d="M${x0} ${yTop - fs * 0.9}V${yBase}H${x1}" fill="none" stroke="${INK}" stroke-width="2.6"/>`;
    // đơn vị trục
    if (o.yUnit) s += `<text x="${Math.max(fs * 0.2, x0 - fs * 0.3)}" y="${yTop - fs * 1.25}" class="g4ch-unit ${st.focus === 'y' ? 'g4ch-focus' : ''}" font-size="${fs}" text-anchor="${x0 - fs * 0.3 > fs * 2.2 ? 'end' : 'start'}">(${o.yUnit})</text>`;
    if (st.focus === 'y') s += `<rect x="2" y="${yTop - fs * 1.1}" width="${x0 - fs * 0.05}" height="${yBase - yTop + fs * 1.6}" rx="${fs * 0.4}" class="g4ch-glow"/>`;
    if (o.xUnit) s += `<text x="${x1}" y="${yBase + fs * (1.08 + G.catLines * 1.12)}" class="g4ch-unit" font-size="${fs * 0.9}" text-anchor="end">(${o.xUnit})</text>`;
    // hàng tên
    if (st.focus === 'x') s += `<rect x="${x0}" y="${yBase + fs * 0.12}" width="${x1 - x0}" height="${fs * (G.catLines * 1.12 + 0.3)}" rx="${fs * 0.4}" class="g4ch-glow"/>`;
    o.cats.forEach((c, i) => {
      const ls = G.catLines > 1 ? lines2(c) : [c];
      ls.forEach((line, k) => { s += `<text x="${cx(i)}" y="${yBase + fs * (1.08 + k * 1.1)}" class="g4ch-cat" font-size="${fs}">${line}</text>`; });
    });
    // đường gióng
    for (const hl of st.hlines) {
      const y = yOf(hl.v), xe = hl.to != null ? cx(hl.to) - colW / 2 : x1;
      s += `<path d="M${x0} ${y}H${xe}" class="g4ch-hl" stroke="${hl.color || '#0EA5E9'}"/>`;
      if (hl.label !== false) s += `<text x="${x0 - fs * 0.35}" y="${y + fs * 0.34}" class="g4ch-tick" font-size="${fs}" fill="${hl.color || '#0EA5E9'}" style="paint-order:stroke;stroke:#fff;stroke-width:${fs * 0.35}px">${fmt(hl.v)}</text>`;
    }
    // cột
    st.values.forEach((v, i) => {
      const x = cx(i) - colW / 2, y = yOf(v), ed = st.edit.has(i);
      s += `<g class="g4ch-col ${st.marks[i] ? `g4ch-${st.marks[i]}` : ''} ${ed ? 'g4ch-ed' : ''}" data-i="${i}">
        <rect class="g4ch-hit" x="${cx(i) - slot / 2}" y="${yTop - fs}" width="${slot}" height="${yBase - yTop + fs * 1.05}" fill="transparent"/>
        ${v > 0 ? `<rect class="g4ch-bar ${st.grow ? 'g4ch-grow' : ''}" style="--d:${i * 90}ms" x="${x}" y="${y}" width="${colW}" height="${yBase - y}" fill="${color}" stroke="${INK}" stroke-width="1.6"/>` : `<path d="M${x} ${yBase}H${x + colW}" stroke="${color}" stroke-width="4"/>`}
        ${st.show[i] === 'v' && !(ed && v === 0) ? `<text x="${cx(i)}" y="${y - fs * 0.32}" class="g4ch-val" font-size="${fs * 1.05}" fill="${ink}">${fmt(v)}</text>` : ''}
        ${st.show[i] === '?' ? `<foreignObject x="${cx(i) - fs * 1.9}" y="${y - fs * 1.75}" width="${fs * 3.8}" height="${fs * 1.6}" data-box="${i}"></foreignObject>` : ''}
        ${ed ? `<g transform="translate(0 ${-fs * 0.72})"><g class="g4ch-grip"><circle cx="${cx(i)}" cy="${y}" r="${fs * 0.72}" fill="#fff" stroke="${INK}" stroke-width="2"/><path d="M${cx(i) - fs * 0.3} ${y - fs * 0.12} L${cx(i)} ${y - fs * 0.45} L${cx(i) + fs * 0.3} ${y - fs * 0.12} M${cx(i) - fs * 0.3} ${y + fs * 0.12} L${cx(i)} ${y + fs * 0.45} L${cx(i) + fs * 0.3} ${y + fs * 0.12}" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></g></g>` : ''}
      </g>`;
    });
    svg.innerHTML = s;
    svg.querySelectorAll('foreignObject[data-box]').forEach((fo) => {
      const i = +fo.dataset.box;
      let b = boxes.get(i);
      if (!b) { b = document.createElementNS(NS, 'span'); b.className = 'g4ch-box'; boxes.set(i, b); }
      b.style.fontSize = `${fs * 1.05}px`;
      fo.append(b);
    });
    if (plot.clientWidth > 0) st.grow = false;
  }

  t.root = root;
  t.svg = svg;
  t.values = st.values;
  t.max = max; t.step = step;
  t.box = (i) => { if (!boxes.has(i)) { st.show[i] = '?'; render(); } return boxes.get(i); };
  t.set = (i, v) => { st.values[i] = v; render(); };
  t.setAll = (vs) => { vs.forEach((v, i) => { st.values[i] = v; }); st.grow = true; render(); };
  t.show = (i, mode) => { st.show[i] = mode; render(); };
  t.showAll = (mode) => { st.show.fill(mode); render(); };
  t.edit = (idx) => { st.edit = new Set(idx); render(); };
  t.mark = (i, cls = '') => { st.marks[i] = cls; render(); };
  t.clearMarks = () => { st.marks.fill(''); render(); };
  t.hline = (v, opts = {}) => { st.hlines.push({ v, ...opts }); render(); };
  t.clearLines = () => { st.hlines = []; render(); };
  t.focus = (axis) => { st.focus = axis || ''; render(); };
  t.caption = (html) => { root.querySelector('.g4ch-title').innerHTML = html || '&nbsp;'; };
  t.rowHl = (i) => root.querySelectorAll('.g4ch-tbl [data-i]').forEach(e => e.classList.toggle('g4ch-rowon', +e.dataset.i === i));
  /** Cột i trên màn hình (để chỉ / bay). */
  t.colRect = (i) => svg.querySelector(`.g4ch-col[data-i="${i}"] .g4ch-bar`)?.getBoundingClientRect();
  t.grow = () => { st.grow = true; render(); };

  // Kéo cột / chạm cột
  let drag = null;
  const valAt = (clientY) => {
    const r = svg.getBoundingClientRect();
    const y = (clientY - r.top) * (G.h / r.height);
    const v = Math.round(((G.yBase - y) / G.k) / snap) * snap;
    return Math.max(0, Math.min(max, v));
  };
  svg.addEventListener('pointerdown', (e) => {
    const g = e.target.closest('.g4ch-col');
    if (!g) return;
    const i = +g.dataset.i;
    if (st.edit.has(i)) {
      drag = { i, id: e.pointerId };
      svg.setPointerCapture?.(e.pointerId);
      const v = valAt(e.clientY);
      if (v !== st.values[i]) { st.values[i] = v; render(); sfx.tick(); t.emit('change', i, v); }
      e.preventDefault();
      return;
    }
    sfx.tap();
    t.emit('tap', i);
  });
  svg.addEventListener('pointermove', (e) => {
    if (!drag || drag.id !== e.pointerId) return;
    const v = valAt(e.clientY);
    if (v !== st.values[drag.i]) { st.values[drag.i] = v; render(); sfx.tick(); t.emit('change', drag.i, v); }
  });
  const end = (e) => {
    if (!drag || drag.id !== e.pointerId) return;
    const i = drag.i;
    drag = null;
    t.emit('drop', i, st.values[i]);
  };
  svg.addEventListener('pointerup', end);
  svg.addEventListener('pointercancel', end);
  /** DEV / kịch bản: đặt cột i bằng v như khi kéo. */
  t.drag = (i, v) => { st.values[i] = v; render(); t.emit('change', i, v); t.emit('drop', i, v); };

  render();
  const ro = new ResizeObserver(() => { if (!svg.isConnected) { ro.disconnect(); return; } const w = plot.clientWidth, h = plot.clientHeight; if (G && (Math.abs(w - G.w) > 2 || Math.abs(h - G.h) > 2)) render(); });
  ro.observe(plot);
  return t;
}

let styled = false;
function injectChartStyles() {
  if (styled) return;
  styled = true;
  css('g4-chart', `
    .g4ch { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; gap: 0.6cqh; box-sizing: border-box; padding: 0.6cqh 0.6cqi; }
    .g4ch-ex { padding-bottom: 18cqh; }
    .g4ch-title { flex: none; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #334155; font-size: min(5.4cqh, 3.2cqi); line-height: 1.2; min-height: 1.2em; letter-spacing: 0.02em; }
    .g4ch-title b { color: #DC2626; }
    .g4ch-body { flex: 1 1 0; min-height: 0; display: flex; gap: 1.6cqi; }
    .g4ch-plot { flex: 1 1 0; min-width: 0; min-height: 0; position: relative; }
    .g4ch-svg { position: absolute; inset: 0; width: 100%; height: 100%; touch-action: none; user-select: none; font-family: 'Baloo 2', sans-serif; }
    .g4ch-svg text { font-family: 'Baloo 2', sans-serif; }
    .g4ch-grid { stroke: #CBD5E1; stroke-width: 1.2; fill: none; }
    .g4ch-tick { font-weight: 700; fill: #334155; text-anchor: end; }
    .g4ch-unit { font-weight: 700; fill: #475569; }
    .g4ch-cat { font-weight: 800; fill: #1E293B; text-anchor: middle; }
    .g4ch-val { font-weight: 800; text-anchor: middle; paint-order: stroke; stroke: #fff; stroke-width: 5px; }
    .g4ch-hl { stroke-width: 2.4; stroke-dasharray: 8 6; fill: none; }
    .g4ch-glow { fill: #FEF08A; opacity: 0.75; animation: g4chGlow 1.2s ease-in-out infinite; }
    @keyframes g4chGlow { 50% { opacity: 0.35; } }
    .g4ch-focus { fill: #B45309; }
    .g4ch-col { cursor: pointer; }
    .g4ch-ed { cursor: ns-resize; }
    .g4ch-grow { transform-box: fill-box; transform-origin: 50% 100%; animation: g4chGrow 0.7s ease-out both; animation-delay: var(--d, 0ms); }
    @keyframes g4chGrow { from { transform: scaleY(0); } }
    .g4ch-sel .g4ch-bar { stroke: #F59E0B; stroke-width: 5; }
    .g4ch-ok .g4ch-bar { stroke: #16A34A; stroke-width: 5; }
    .g4ch-bad .g4ch-bar { stroke: #DC2626; stroke-width: 5; }
    .g4ch-sel .g4ch-hit { fill: #FEF9C3; fill-opacity: 0.7; }
    .g4ch-dim .g4ch-bar { opacity: 0.35; }
    .g4ch-ed .g4ch-grip { animation: g4chGrip 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes g4chGrip { 50% { transform: scale(1.18); } }
    .g4ch-ok.g4ch-ed .g4ch-grip { animation: none; }
    .g4ch-box { display: flex; align-items: center; justify-content: center; box-sizing: border-box; width: 100%; height: 100%; font-family: 'Baloo 2', sans-serif; font-weight: 800; line-height: 1;
      border: 2px solid #FCD34D; border-radius: 0.3em; background: #FFFBEB; color: #1D4ED8; }
    .g4ch-box:empty::before { content: '?'; color: #F59E0B; font-size: 0.85em; }
    .g4ch-box.g3d-on { background: #FEF9C3; border-color: #F59E0B; box-shadow: 0 0 0 0.12em #FDE68A; }
    .g4ch-box.g4-box-ok { border-color: #4ADE80; background: #DCFCE7; color: #15803D; }
    .g4ch-tbl { flex: none; display: flex; align-items: center; max-width: 42%; }
    .g4ch-tbl table { border-collapse: collapse; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(5.4cqh, 3.4cqi); line-height: 1.2; }
    .g4ch-tbl th, .g4ch-tbl td { border: 2px solid #7DD3FC; padding: 0.2em 0.5em; text-align: center; white-space: nowrap; }
    .g4ch-tbl th { background: #E0F2FE; font-weight: 700; color: #334155; }
    .g4ch-tn { color: #1D4ED8; }
    .g4ch-tt { width: 4.6em; height: 1.4em; padding: 0.1em 0.3em !important; }
    .g4ch-tt svg { display: block; width: 100%; height: 1.2em; }
    .g4ch-rowon, .g4ch-rowon td { background: #FEF9C3; }
    .g4ch-th { display: none; }
    @container (orientation: portrait) {
      .g4ch-title { font-size: min(3.4cqh, 4.4cqi); }
      .g4ch-body { flex-direction: column; gap: 1cqh; }
      .g4ch-tbl { max-width: none; justify-content: center; }
      .g4ch-tv { display: none; }
      .g4ch-th { display: table; font-size: min(3cqh, 3.6cqi) !important; }
      .g4ch-th td, .g4ch-th th { padding: 0.15em 0.3em; white-space: normal; }
      .g4ch-tt { width: auto; }
    }
    @media (prefers-reduced-motion: reduce) {
      .g4ch-grow { animation-duration: 0.9s; animation-timing-function: linear; }
      .g4ch-glow { animation: none; opacity: 0.6; }
      .g4ch-ed .g4ch-grip { animation: none; }
    }
  `);
}

export const chartCalm = calmMotion;
