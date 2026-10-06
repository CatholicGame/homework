/**
 * 🔺 Tam giác trên giấy kẻ ô (Toán 5 Bài 25) + bảng vẽ hình học chung (createGeo) cho trap.js, circle.js.
 *
 * createGeo(host): tấm SVG (createCanvas của Toán 4) có khung nhìn theo đúng tỉ lệ chỗ trống của tờ giấy
 *   (W = 1000, H tính theo tỉ lệ) để hình to kín giấy cả ngang lẫn dọc. Toạ độ hình theo ô (cell), t.fit(box)
 *   chọn cỡ ô cho vùng box vừa khít; t.X(p) đổi ô → đơn vị SVG.
 *
 * createTri(host, opts): tam giác ABC đáy BC nằm ngang trên giấy ô vuông.
 *   - Kéo đỉnh A (hít vào ô): nhọn / vuông / tù hiện ngay (dấu góc vuông, cung góc tù đỏ).
 *   - Ê ke trượt dọc đáy (kéo được) để hạ đường cao; tam giác tù thì kéo dài đáy bằng nét đứt.
 *   - Cắt ghép (SGK tr. 95): tấm trắng bằng tấm xanh, cắt theo đường cao, hai mảnh xoay 180° quanh trung điểm
 *     cạnh bên, ghép thành hình chữ nhật NMCB.
 *   - Chế độ 'par': đỉnh A chỉ trượt trên đường song song với đáy (diện tích không đổi).
 */

import { createCanvas, anim } from '../grade4Tools/canvas.js';
import { css, INK, sfx } from '../grade4Tools/frame.js';

export { INK, sfx, anim };
const NS = 'http://www.w3.org/2000/svg';
export const BLUE = '#93C5FD', BLUE_D = '#2563EB', RED = '#DC2626', GREEN = '#16A34A', YEL = '#FDE047';

export const mid = (p, q) => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
export const pts = (arr) => arr.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
export const cen = (arr) => ({ x: arr.reduce((s, p) => s + p.x, 0) / arr.length, y: arr.reduce((s, p) => s + p.y, 0) / arr.length });
const ease = (k) => (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2);

/** Chạy fn(e) theo từng khung hình trong ms (e: 0 → 1 có làm mềm). */
export function tween(ms, fn, { linear = false } = {}) {
  const dur = anim(ms), t0 = performance.now();
  return new Promise((res) => {
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      fn(linear ? k : ease(k));
      if (k < 1) requestAnimationFrame(step); else res();
    };
    requestAnimationFrame(step);
  });
}
/** Xoay điểm p quanh o một góc a (độ, chiều kim đồng hồ trên màn hình). */
export function rot(p, o, a) {
  const r = (a * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
  return { x: o.x + (p.x - o.x) * c - (p.y - o.y) * s, y: o.y + (p.x - o.x) * s + (p.y - o.y) * c };
}
/**
 * Mảnh hình bay + xoay: điểm p (vị trí đầu) → pivotEnd + R(angle)(p − pivotStart). Tâm xoay trượt từ pivotStart tới
 * pivotEnd trong lúc xoay. el: polygon; label: chữ đi theo trọng tâm.
 */
export async function flyPiece(el, P0, pivotStart, pivotEnd, angle, ms = 1400, label = null) {
  let cur = P0;
  await tween(ms, (e) => {
    const pv = { x: pivotStart.x + (pivotEnd.x - pivotStart.x) * e, y: pivotStart.y + (pivotEnd.y - pivotStart.y) * e };
    cur = P0.map(p => rot({ x: pv.x + p.x - pivotStart.x, y: pv.y + p.y - pivotStart.y }, pv, angle * e));
    el.setAttribute('points', pts(cur));
    if (label) { const c = cen(cur); label.setAttribute('x', c.x); label.setAttribute('y', c.y); }
  });
  return cur;
}

export function svgEl(tag, attrs = {}, html = '') {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (html) e.innerHTML = html;
  return e;
}

/** Chữ có viền trắng (đọc rõ trên giấy ô). */
export const txt = (x, y, s, { size = 40, color = INK, anchor = 'middle', cls = '', weight = 800 } = {}) =>
  `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" class="g5g-t ${cls}" font-size="${size}" style="font-size:max(${size}px, calc(var(--u, 0) * ${size * 0.5}px))" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`;

/** Dấu góc vuông tại p, hai hướng đơn vị u, v (đơn vị SVG), cạnh s. */
export const rightMark = (p, u, v, s = 20, color = GREEN) =>
  `<path d="M${p.x + u.x * s} ${p.y + u.y * s} L${p.x + (u.x + v.x) * s} ${p.y + (u.y + v.y) * s} L${p.x + v.x * s} ${p.y + v.y * s}" fill="none" stroke="${color}" stroke-width="4"/>`;
export const unit = (p, q) => { const d = Math.hypot(q.x - p.x, q.y - p.y) || 1; return { x: (q.x - p.x) / d, y: (q.y - p.y) / d }; };

/** Đường kích thước có hai vạch đầu và chữ ở giữa (lệch off theo pháp tuyến). */
export function dim(p, q, label, { off = 30, color = '#7C3AED', size = 36, side = 1 } = {}) {
  const u = unit(p, q), n = { x: -u.y * side, y: u.x * side };
  const a = { x: p.x + n.x * off, y: p.y + n.y * off }, b = { x: q.x + n.x * off, y: q.y + n.y * off };
  const m = mid(a, b);
  const tick = (o) => `<line x1="${o.x - n.x * 10}" y1="${o.y - n.y * 10}" x2="${o.x + n.x * 10}" y2="${o.y + n.y * 10}"/>`;
  const side2 = Math.abs(n.x) > 0.7; // đường dọc: chữ đứng bên cạnh
  const tx = side2 ? m.x + n.x * 16 : m.x + n.x * size * 0.75, ty = side2 ? m.y + size * 0.35 : m.y + n.y * size * 0.75 + size * 0.35;
  return `<g stroke="${color}" stroke-width="3"><line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>${tick(a)}${tick(b)}</g>
    ${txt(tx, ty, label, { size, color, anchor: side2 ? (n.x < 0 ? 'end' : 'start') : 'middle' })}`;
}

/** Ô có viền góc cung (cung góc tù) tại v giữa hai hướng tới p và q. */
export function arcMark(v, p, q, r = 30, color = RED) {
  const a1 = Math.atan2(p.y - v.y, p.x - v.x), a2 = Math.atan2(q.y - v.y, q.x - v.x);
  let d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
  const s = { x: v.x + r * Math.cos(a1), y: v.y + r * Math.sin(a1) }, e = { x: v.x + r * Math.cos(a1 + d), y: v.y + r * Math.sin(a1 + d) };
  return `<path d="M${v.x} ${v.y} L${s.x} ${s.y} A${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${e.x} ${e.y} Z" fill="${color}" fill-opacity="0.25" stroke="${color}" stroke-width="4"/>`;
}

/**
 * Bảng vẽ: createCanvas + khung nhìn theo tỉ lệ tờ giấy. reserve: phần đáy (tỉ lệ) chừa cho nút chọn đè lên.
 * t.L = { grid, fig, piece, eke, top } các lớp vẽ.
 */
export function createGeo(host, { reserve = 0, bg = '#fff' } = {}) {
  injectGeoStyles();
  const t = createCanvas(host, { w: 1000, h: 560, bg });
  const svg = t.svg;
  svg.classList.add('g5g');
  const cw = svg.clientWidth || 1000, ch = svg.clientHeight || 560;
  const W = 1000, H = Math.round(Math.min(1900, Math.max(400, (W * ch) / cw)));
  t.frame(0, 0, W, H);
  t.W = W; t.H = H; t.port = H > W * 0.8; t.reserve = reserve;
  t.draw('<g class="g5g-grid"></g><g class="g5g-fig"></g><g class="g5g-piece"></g><g class="g5g-eke"></g><g class="g5g-top"></g>');
  t.L = { grid: t.q('.g5g-grid'), fig: t.q('.g5g-fig'), piece: t.q('.g5g-piece'), eke: t.q('.g5g-eke'), top: t.q('.g5g-top') };
  t.cell = 50; t.ox = 0; t.oy = 0;
  /** Chọn cỡ ô để vùng box (ô) vừa khít phần trên của tờ giấy; top: chừa trên (đơn vị SVG). */
  t.fit = (box, { pad = 0.6, max = 120, top = 0 } = {}) => {
    const avH = H * (1 - reserve) - top;
    const cell = Math.min(W / (box.w + 2 * pad), avH / (box.h + 2 * pad), max);
    t.cell = cell;
    t.ox = (W - box.w * cell) / 2 - box.x * cell;
    t.oy = top + (avH - box.h * cell) / 2 - box.y * cell;
    return cell;
  };
  t.X = (p) => ({ x: t.ox + p.x * t.cell, y: t.oy + p.y * t.cell });
  /** Đổi toạ độ con trỏ → ô. */
  t.toCell = (e) => {
    const q = svg.createSVGPoint(); q.x = e.clientX; q.y = e.clientY;
    const r = q.matrixTransform(svg.getScreenCTM().inverse());
    return { x: (r.x - t.ox) / t.cell, y: (r.y - t.oy) / t.cell };
  };
  t.toSvg = (e) => { const q = svg.createSVGPoint(); q.x = e.clientX; q.y = e.clientY; return q.matrixTransform(svg.getScreenCTM().inverse()); };
  /** Giấy kẻ ô phủ kín tờ giấy, khớp với lưới ô của hình. */
  t.grid = (on = true) => {
    if (!on) { t.L.grid.innerHTML = ''; return; }
    const c = t.cell; let g = '';
    for (let x = t.ox % c; x <= W; x += c) g += `<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`;
    for (let y = t.oy % c; y <= H; y += c) g += `<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`;
    t.L.grid.innerHTML = g;
  };
  /** Các dòng phép tính hiện lần lượt (như viết vở). Trả về Promise. */
  t.lines = async (x, y, lines, { size = 44, gap = 1.35, anchor = 'start', color = INK, ms = 700 } = {}) => {
    const els = [];
    for (let i = 0; i < lines.length; i++) {
      const e = svgEl('text', { x, y: y + i * size * gap, class: 'g5g-t', 'font-size': size, fill: color, 'text-anchor': anchor, 'font-weight': 800 });
      e.innerHTML = lines[i];
      t.L.top.append(e);
      els.push(e);
      sfx.pop(i);
      await e.animate([{ opacity: 0, transform: 'translateX(-14px)' }, { opacity: 1, transform: 'none' }], { duration: anim(380), fill: 'both' }).finished;
      await new Promise(r => setTimeout(r, anim(ms)));
    }
    return els;
  };
  /** Phóng khung nhìn vào vùng ô box (giữ tỉ lệ tờ giấy, vẫn chừa đáy cho nút chọn). */
  t.zoomTo = (box, ms = 1000) => {
    const k = Math.min(W / (box.w * t.cell), (H * (1 - reserve)) / (box.h * t.cell));
    const vw = W / k, vh = H / k, p = t.X({ x: box.x, y: box.y });
    return t.view(p.x - (vw - box.w * t.cell) / 2, p.y - ((vh * (1 - reserve)) - box.h * t.cell) / 2, vw, vh, ms);
  };
  return t;
}

/** Khung vừa khít các điểm (đơn vị tuỳ ý) vào vùng (x, y, w, h) của tấm vẽ: trả về hàm đổi toạ độ. */
export function fitTo(P, x, y, w, h) {
  const xs = P.map(p => p.x), ys = P.map(p => p.y);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const k = Math.min(w / Math.max(1e-6, x1 - x0), h / Math.max(1e-6, y1 - y0));
  const dx = x + (w - (x1 - x0) * k) / 2 - x0 * k, dy = y + (h - (y1 - y0) * k) / 2 - y0 * k;
  const f = (p) => ({ x: dx + p.x * k, y: dy + p.y * k });
  f.k = k;
  return f;
}

/** Kéo một phần tử trên tấm vẽ: onMove(cellPoint, svgPoint) khi kéo, onUp khi thả. */
export function draggable(t, selector, { onDown, onMove, onUp }) {
  let drag = null;
  t.svg.addEventListener('pointerdown', (e) => {
    const h = e.target.closest(selector);
    if (!h || t.locked) return;
    drag = { h, start: t.toCell(e) };
    onDown?.(drag, e);
    t.svg.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  t.svg.addEventListener('pointermove', (e) => { if (drag) onMove(t.toCell(e), drag, e); });
  const up = () => { if (drag) { const d = drag; drag = null; onUp?.(d); } };
  t.svg.addEventListener('pointerup', up);
  t.svg.addEventListener('pointercancel', up);
}

/** Loại tam giác theo toạ độ (số nguyên chính xác): 'vuông' | 'tù' | 'nhọn' và đỉnh góc đặc biệt (0, 1, 2). */
export function triKind(P) {
  for (let i = 0; i < 3; i++) {
    const v = P[i], a = P[(i + 1) % 3], b = P[(i + 2) % 3];
    const d = (a.x - v.x) * (b.x - v.x) + (a.y - v.y) * (b.y - v.y);
    if (Math.abs(d) < 1e-9) return { kind: 'vuông', at: i };
    if (d < 0) return { kind: 'tù', at: i };
  }
  return { kind: 'nhọn', at: -1 };
}
export const KIND_TEXT = { nhọn: 'Tam giác <b>nhọn</b>: ba góc nhọn', vuông: 'Tam giác <b>vuông</b>: một góc vuông', tù: 'Tam giác <b>tù</b>: một góc tù' };

/** Vẽ ê ke (góc vuông tại gốc, cạnh dọc đi lên dài hv, cạnh ngang sang trái dài hh). */
export const ekeSvg = (hv, hh) => `
  <g class="g5t-eke-body">
    <path d="M0 0 L${-hh} 0 L0 ${-hv} Z" fill="rgba(253, 224, 71, 0.6)" stroke="#A16207" stroke-width="4" stroke-linejoin="round"/>
    <path d="M${-hh * 0.18} ${-hv * 0.12} L${-hh * 0.62} ${-hv * 0.12} L${-hh * 0.18} ${-hv * 0.62} Z" fill="#fff" fill-opacity="0.75" stroke="#A16207" stroke-width="3"/>
    <path d="M0 -24 H-24 V0" fill="none" stroke="${RED}" stroke-width="4"/>
  </g>`;

// ── Tam giác ──────────────────────────────────────────────────────────────────────────────────────────
/**
 * opts: A, B, C (ô, B.y = C.y), box (vùng ô cần hiện), reserve, drag ('free' | 'par' | null), kind (hiện loại),
 * alt (đường cao), dims (đáy a, chiều cao h), unit ('cm'…), area (dòng diện tích trên chú thích).
 */
export function createTri(host, o = {}) {
  const t = createGeo(host, { reserve: o.reserve ?? 0.17 });
  const S = { A: { ...o.A }, B: { ...o.B }, C: { ...o.C }, drag: o.drag || null, kind: !!o.kind, alt: !!o.alt, dims: !!o.dims, unit: o.unit || 'cm', area: !!o.area, ext: false, eke: null, par: false, moves: new Set() };
  t.S = S;
  t.fit(o.box || { x: -1, y: -1, w: 12, h: 8 }, { top: o.top ?? 0 });
  t.grid();

  t.h = () => S.B.y - S.A.y;
  t.a = () => S.C.x - S.B.x;
  t.foot = () => ({ x: S.A.x, y: S.B.y });
  t.kind = () => triKind([S.A, S.B, S.C]).kind;

  function draw() {
    const A = t.X(S.A), B = t.X(S.B), C = t.X(S.C), H = t.X(t.foot());
    const c = t.cell;
    let g = '';
    if (S.par) g += `<line x1="0" y1="${A.y}" x2="${t.W}" y2="${A.y}" stroke="#A855F7" stroke-width="4" stroke-dasharray="14 10"/>`;
    // đáy kéo dài (nét đứt) khi chân đường cao nằm ngoài đáy
    if ((S.alt || S.ext) && (S.A.x < S.B.x || S.A.x > S.C.x)) {
      const e0 = S.A.x < S.B.x ? H : C, e1 = S.A.x < S.B.x ? B : H;
      g += `<line x1="${e0.x}" y1="${e0.y}" x2="${e1.x}" y2="${e1.y}" stroke="${INK}" stroke-width="3" stroke-dasharray="12 9"/>`;
    }
    g += `<polygon points="${pts([A, B, C])}" fill="${o.fill || BLUE}" fill-opacity="0.75" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round" class="g5t-tri"/>`;
    const k = triKind([S.A, S.B, S.C]);
    if (S.kind && k.at >= 0) {
      const V = [A, B, C], v = V[k.at], p = V[(k.at + 1) % 3], q = V[(k.at + 2) % 3];
      g += k.kind === 'vuông' ? rightMark(v, unit(v, p), unit(v, q), c * 0.36) : arcMark(v, p, q, c * 0.55);
    }
    if (S.alt) {
      const onSide = S.A.x === S.B.x || S.A.x === S.C.x;
      g += `<line x1="${A.x}" y1="${A.y}" x2="${H.x}" y2="${H.y}" stroke="${RED}" stroke-width="${onSide ? 7 : 5}" ${onSide ? '' : 'stroke-dasharray="12 8"'}/>`;
      g += rightMark(H, { x: S.A.x < (S.B.x + S.C.x) / 2 ? 1 : -1, y: 0 }, { x: 0, y: -1 }, c * 0.32);
      if (!onSide) g += txt(H.x + (S.A.x > S.C.x ? 26 : -26), H.y + 44, 'H', { size: 38, color: RED });
    }
    // tên đỉnh
    const G = cen([A, B, C]);
    for (const [n, P] of [['A', A], ['B', B], ['C', C]]) {
      const u = unit(G, P);
      g += txt(P.x + u.x * 34, P.y + u.y * 34 + 13, n, { size: 40 });
    }
    if (S.dims) {
      g += dim(B, C, `a = ${t.a()} ${S.unit}`, { off: c * 0.8 + 10, color: BLUE_D });
      const hx = S.A.x === S.B.x ? A.x - 40 : A.x;
      g += txt(hx + (S.A.x === S.B.x ? -10 : 18), (A.y + H.y) / 2 + 14, `h = ${t.h()} ${S.unit}`, { size: 36, color: RED, anchor: S.A.x === S.B.x ? 'end' : 'start' });
    }
    if (S.drag) g += `<g class="g5t-h"><circle cx="${A.x}" cy="${A.y}" r="${Math.max(24, c * 0.36)}" fill="${YEL}" stroke="${INK}" stroke-width="3"/>
      <circle cx="${A.x}" cy="${A.y}" r="${Math.max(36, c * 0.55)}" fill="transparent"/></g>`;
    t.L.fig.innerHTML = g;
    if (S.kind && !S.area) t.caption(KIND_TEXT[k.kind]);
    if (S.area) {
      const a = t.a(), h = t.h();
      t.caption(`S = a × h : 2 = ${a} × ${h} : 2 = <b>${String((a * h) / 2).replace('.', ',')} ${S.unit}²</b>`);
    }
  }
  t.redraw = draw;
  t.set = (p) => { for (const k of ['A', 'B', 'C']) if (p[k]) S[k] = { ...p[k] }; Object.assign(S, Object.fromEntries(Object.entries(p).filter(([k]) => !['A', 'B', 'C'].includes(k)))); draw(); };

  // kéo đỉnh A
  draggable(t, '.g5t-h', {
    onMove(p) {
      let x = Math.round(p.x), y = S.par ? S.A.y : Math.round(p.y);
      const lo = Math.ceil((0 - t.ox) / t.cell) + 1, hi = Math.floor((t.W - t.ox) / t.cell) - 1, top = Math.ceil((0 - t.oy) / t.cell) + 1;
      x = Math.max(lo, Math.min(hi, x));
      y = Math.max(top, Math.min(S.B.y - 1, y));
      if (x === S.A.x && y === S.A.y) return;
      const before = t.kind();
      S.A = { x, y };
      S.moves.add(`${x},${y}`);
      draw();
      if (t.kind() !== before) sfx.pop(3); else sfx.tick?.();
      t.emit('move');
    },
    onUp() { t.emit('up'); },
  });
  /** Dời đỉnh A có chuyển động (thầy làm mẫu / dev). */
  t.moveA = async (to, ms = 900) => {
    const a0 = { ...S.A };
    await tween(ms, (e) => { S.A = { x: a0.x + (to.x - a0.x) * e, y: a0.y + (to.y - a0.y) * e }; draw(); });
    S.A = { ...to }; S.moves.add(`${to.x},${to.y}`); draw(); t.emit('move');
  };

  // ── Ê ke trượt dọc đáy ──────────────────────────────────────────────────────────────────────────────
  function placeEke() {
    if (!S.eke) { t.L.eke.innerHTML = ''; return; }
    const P = t.X({ x: S.eke.x, y: S.B.y });
    const g = t.L.eke.firstElementChild;
    g.setAttribute('transform', `translate(${P.x} ${P.y})`);
    const ok = Math.abs(S.eke.x - S.A.x) < 1e-6;
    g.classList.toggle('g5t-eke-ok', ok);
  }
  t.ekeShow = (x) => {
    const hv = Math.max(3, t.h() + 0.6) * t.cell, hh = 2.6 * t.cell;
    t.L.eke.innerHTML = `<g class="g5t-eke">${ekeSvg(hv, hh)}</g>`;
    S.eke = { x };
    placeEke();
    t.L.eke.firstElementChild.animate([{ opacity: 0, transform: `${t.L.eke.firstElementChild.getAttribute('transform')} translate(0px, 60px)` }, { opacity: 1 }], { duration: anim(500) });
  };
  t.ekeHide = () => { S.eke = null; placeEke(); };
  t.ekeOk = () => !!S.eke && Math.abs(S.eke.x - S.A.x) < 1e-6;
  t.ekeTo = async (x, ms = 1000) => {
    const x0 = S.eke.x;
    await tween(ms, (e) => { S.eke.x = x0 + (x - x0) * e; placeEke(); });
    S.eke.x = x; placeEke(); t.emit('eke');
  };
  draggable(t, '.g5t-eke', {
    onDown(d) { d.x0 = S.eke.x; },
    onMove(p, d) {
      const lo = Math.min(S.B.x, S.A.x) - 1, hi = Math.max(S.C.x, S.A.x) + 1;
      let x = Math.max(lo, Math.min(hi, d.x0 + p.x - d.start.x));
      if (Math.abs(x - S.A.x) < 0.35) x = S.A.x;
      S.eke.x = x; placeEke();
      t.emit('eke');
    },
    onUp() { if (t.ekeOk()) sfx.ding(); },
  });
  /** Kéo dài đáy (nét đứt) tới chân đường cao, có chuyển động. */
  t.extendBase = async () => {
    const B = t.X(S.B), C = t.X(S.C), H = t.X(t.foot());
    const from = S.A.x < S.B.x ? B : C;
    const l = svgEl('line', { x1: from.x, y1: from.y, x2: from.x, y2: from.y, stroke: INK, 'stroke-width': 3, 'stroke-dasharray': '12 9' });
    t.L.top.append(l);
    sfx.swish();
    await tween(800, (e) => { l.setAttribute('x2', from.x + (H.x - from.x) * e); });
    l.remove(); S.ext = true; draw();
  };
  /** Bút chì vạch đường cao theo cạnh ê ke, từ chân H lên đỉnh A. */
  t.dropAlt = async () => {
    const A = t.X(S.A), H = t.X(t.foot());
    const l = svgEl('line', { x1: H.x, y1: H.y, x2: H.x, y2: H.y, stroke: RED, 'stroke-width': 6, 'stroke-linecap': 'round' });
    const pen = svgEl('text', { x: H.x, y: H.y, 'font-size': 56 }, '✏️');
    t.L.top.append(l, pen);
    sfx.swish();
    await tween(1000, (e) => { const y = H.y + (A.y - H.y) * e; l.setAttribute('y2', y); pen.setAttribute('y', y); pen.setAttribute('x', H.x + 4); });
    l.remove(); pen.remove();
    S.alt = true; draw();
  };

  // ── Cắt ghép (SGK tr. 95) ───────────────────────────────────────────────────────────────────────────
  let cut = null;
  /** Tấm bìa trắng giống hệt, đặt lệch D (ô). */
  t.copyShow = async (D) => {
    const V = [S.A, S.B, S.C].map(p => t.X({ x: p.x + D.x, y: p.y + D.y }));
    const poly = svgEl('polygon', { points: pts(V), fill: '#fff', stroke: INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
    t.L.piece.append(poly);
    cut = { D, V, poly };
    sfx.swish();
    await poly.animate([{ opacity: 0, transform: 'translate(120px, 0)' }, { opacity: 1, transform: 'none' }], { duration: anim(700), easing: 'ease-out' }).finished;
  };
  /** Cắt tấm trắng theo đường cao: hai mảnh 1 (bên trái) và 2 (bên phải) tách ra. */
  t.copyCut = async () => {
    const { D } = cut;
    const A = t.X({ x: S.A.x + D.x, y: S.A.y + D.y }), H = t.X({ x: S.A.x + D.x, y: S.B.y + D.y });
    const l = svgEl('line', { x1: A.x, y1: A.y, x2: A.x, y2: A.y, stroke: RED, 'stroke-width': 5, 'stroke-dasharray': '12 8' });
    const sc = svgEl('text', { x: A.x, y: A.y, 'font-size': 60, 'text-anchor': 'middle' }, '✂️');
    const lab = svgEl('text', { x: A.x + 30, y: A.y + 30, 'font-size': 36, fill: RED, class: 'g5g-t', 'font-weight': 800 }, 'Đường cắt');
    t.L.top.append(l, sc, lab);
    sfx.swish();
    await tween(1100, (e) => { const y = A.y + (H.y - A.y) * e; l.setAttribute('y2', y); sc.setAttribute('y', y + 20); });
    sc.remove(); l.remove(); lab.remove();
    cut.poly.remove();
    const P1 = [A, t.X({ x: S.B.x + D.x, y: S.B.y + D.y }), H], P2 = [A, H, t.X({ x: S.C.x + D.x, y: S.C.y + D.y })];
    const mk = (P, n) => {
      const el = svgEl('polygon', { points: pts(P), fill: '#fff', stroke: INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
      const c = cen(P);
      const lb = svgEl('text', { x: c.x, y: c.y, 'font-size': 44, fill: RED, class: 'g5g-t', 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-weight': 800 }, String(n));
      t.L.piece.append(el, lb);
      return { el, lb, P };
    };
    cut.p1 = mk(P1, 1); cut.p2 = mk(P2, 2);
    // tách nhẹ hai mảnh
    const gap = t.cell * 0.3;
    const sh = (pc, dx) => tween(500, (e) => {
      const P = pc.P.map(p => ({ x: p.x + dx * e, y: p.y }));
      pc.el.setAttribute('points', pts(P)); const c = cen(P); pc.lb.setAttribute('x', c.x); pc.lb.setAttribute('y', c.y);
    }).then(() => { pc.P = pc.P.map(p => ({ x: p.x + dx, y: p.y })); });
    await Promise.all([sh(cut.p1, -gap), sh(cut.p2, gap)]);
  };
  /** Ghép: mảnh 1 xoay quanh trung điểm AB, mảnh 2 quanh trung điểm AC, vào tấm xanh. */
  t.copyJoin = async () => {
    const A = t.X(S.A), B = t.X(S.B), C = t.X(S.C);
    const gap = t.cell * 0.3, Dp = { x: cut.D.x * t.cell, y: cut.D.y * t.cell };
    const go = async (pc, a, b, dx) => {
      const m = mid(a, b);
      const start = { x: m.x + Dp.x + dx, y: m.y + Dp.y };
      sfx.swish();
      pc.P = await flyPiece(pc.el, pc.P, start, m, 180, 1500, pc.lb);
      sfx.pop(5);
    };
    await go(cut.p1, A, B, -gap);
    await go(cut.p2, A, C, gap);
  };
  /** Hình chữ nhật NMCB: viền xanh lá, tên N, M; kích thước dài = đáy, rộng = chiều cao. */
  t.rectShow = async () => {
    const B = t.X(S.B), C = t.X(S.C), N = t.X({ x: S.B.x, y: S.A.y }), M = t.X({ x: S.C.x, y: S.A.y });
    const r = svgEl('polygon', { points: pts([N, M, C, B]), fill: 'none', stroke: GREEN, 'stroke-width': 9, 'stroke-linejoin': 'round' });
    t.L.top.append(r);
    t.L.top.insertAdjacentHTML('beforeend', txt(N.x - 30, N.y - 6, 'N', { size: 40, color: GREEN }) + txt(M.x + 30, M.y - 6, 'M', { size: 40, color: GREEN }));
    await r.animate([{ opacity: 0 }, { opacity: 1 }, { opacity: 0.4 }, { opacity: 1 }], { duration: anim(1200) }).finished;
    t.L.top.insertAdjacentHTML('beforeend', dim(B, C, 'dài = đáy a', { off: t.cell * 0.8 + 10, color: BLUE_D }) + dim(N, B, 'rộng = h', { off: t.cell * 0.4 + 10, color: RED }));
  };
  /** Nửa hình chữ nhật: tam giác xanh nhấp nháy, hai mảnh trắng gạch chéo. */
  t.halfShow = async () => {
    for (const pc of [cut.p1, cut.p2]) { pc.el.setAttribute('fill', '#F1F5F9'); pc.lb.remove(); }
    await t.q('.g5t-tri').animate([{ fillOpacity: 0.75 }, { fillOpacity: 1, fill: '#60A5FA' }, { fillOpacity: 0.75 }], { duration: anim(900), iterations: 2 }).finished;
  };
  t.cutClear = () => { t.L.piece.innerHTML = ''; t.L.top.innerHTML = ''; cut = null; };

  /** DEV / thầy làm mẫu: đưa đỉnh A tới vị trí cho loại tam giác `kind`. */
  t.solveKind = (kind) => {
    const { B, C } = S;
    const y = B.y - Math.max(3, t.h());
    const x = kind === 'vuông' ? B.x : kind === 'tù' ? C.x + 2 : Math.round((B.x + C.x) / 2);
    return t.moveA({ x, y: kind === 'nhọn' ? B.y - Math.max(3, Math.ceil((C.x - B.x) / 2) + 1) : y }, 500);
  };

  draw();
  return t;
}

let styled = false;
function injectGeoStyles() {
  if (styled) return;
  styled = true;
  css('g5-geo', `
    .g5g { touch-action: none; }
    .g5g-grid line { stroke: #DBEAFE; stroke-width: 2; }
    .g5g-t { font-family: 'Baloo 2', sans-serif; paint-order: stroke; stroke: #fff; stroke-width: 7px; stroke-linejoin: round; }
    .g5t-h { cursor: grab; animation: g5Hand 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes g5Hand { 50% { transform: scale(1.18); } }
    .g5t-eke { cursor: grab; }
    .g5t-eke-ok .g5t-eke-body > path:first-child { fill: rgba(134, 239, 172, 0.7); stroke: #15803D; }
    @media (prefers-reduced-motion: reduce) { .g5t-h { animation: g5HandCalm 2.4s ease-in-out infinite; } @keyframes g5HandCalm { 50% { opacity: 0.7; } } }
  `);
}
