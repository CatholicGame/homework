/**
 * 🔷 Hình thang trên giấy kẻ ô (Toán 5 Bài 26).
 *  - Hình thang ABCD: đáy AB (trên) song song đáy DC (dưới), cả hai nằm ngang. Kéo A, B (dời ngang và đổi độ cao
 *    đáy trên), kéo D, C (dời ngang): hai đáy luôn song song. Tự hiện mũi tên song song, đáy lớn / đáy bé,
 *    hình thang vuông (dấu góc vuông), hình bình hành / hình chữ nhật khi hai đáy bằng nhau, tam giác khi đáy bé = 0.
 *  - Thanh trượt đáy bé b (0 → a).
 *  - Cắt ghép (SGK tr. 102): M trung điểm BC, cắt theo AM, tam giác ABM xoay 180° quanh M thành tam giác KCM;
 *    hình thang thành tam giác ADK với DK = DC + CK = DC + AB.
 */

import { createGeo, draggable, tween, flyPiece, svgEl, txt, dim, rightMark, pts, mid, INK, sfx, RED, BLUE_D, GREEN, YEL } from './tri.js';

const FILL = '#86EFAC';
const num = (x) => String(Math.round(x * 10) / 10).replace('.', ',');

/** Mũi tên song song (chevron) giữa đoạn p→q, n chiếc. */
const chev = (p, q, n = 1) => {
  const m = mid(p, q), ang = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
  let g = '';
  for (let k = 0; k < n; k++) g += `<path d="M${-9 + k * 15 - (n - 1) * 7} -11 L${5 + k * 15 - (n - 1) * 7} 0 L${-9 + k * 15 - (n - 1) * 7} 11" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `<g transform="translate(${m.x} ${m.y}) rotate(${ang})">${g}</g>`;
};

/**
 * o: { A, B, C, D } (ô; A.y = B.y, D.y = C.y), box, drag (bool), labels (đáy lớn/bé), alt, dims, unit, area, kind,
 * slider (thanh trượt đáy bé).
 */
export function createTrap(host, o = {}) {
  const t = createGeo(host, { reserve: o.reserve ?? 0.17 });
  const S = {
    A: { ...o.A }, B: { ...o.B }, C: { ...o.C }, D: { ...o.D },
    drag: !!o.drag, labels: o.labels ?? true, alt: !!o.alt, dims: !!o.dims, unit: o.unit || 'cm', area: !!o.area, kind: o.kind ?? true,
    slider: !!o.slider, cut: false, moves: 0,
  };
  t.S = S;
  t.fit(o.box || { x: -1.5, y: -1.5, w: 13, h: 8 });
  t.grid();

  t.a = () => S.C.x - S.D.x;
  t.b = () => S.B.x - S.A.x;
  t.h = () => S.D.y - S.A.y;
  t.kind = () => {
    const a = t.a(), b = t.b();
    if (b === 0) return 'Hình tam giác';
    if (a === b) return S.A.x === S.D.x ? 'Hình chữ nhật' : 'Hình bình hành';
    if (S.A.x === S.D.x || S.B.x === S.C.x) return 'Hình thang vuông';
    return 'Hình thang';
  };
  const sliderY = () => S.D.y + 2.4;

  function draw() {
    const A = t.X(S.A), B = t.X(S.B), C = t.X(S.C), D = t.X(S.D), c = t.cell;
    const a = t.a(), b = t.b(), kind = t.kind();
    let g = '';
    const Hc = { x: S.A.x, y: S.D.y }, H = t.X(Hc);
    if (S.alt && (S.A.x < S.D.x || S.A.x > S.C.x)) {
      const e0 = S.A.x < S.D.x ? H : C, e1 = S.A.x < S.D.x ? D : H;
      g += `<line x1="${e0.x}" y1="${e0.y}" x2="${e1.x}" y2="${e1.y}" stroke="${INK}" stroke-width="3" stroke-dasharray="12 9"/>`;
    }
    if (S.cut) {
      const M = mid(B, C);
      g += `<polygon points="${pts([A, M, C, D])}" fill="${FILL}" fill-opacity="0.8" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`;
    } else {
      g += `<polygon points="${pts(b === 0 ? [A, C, D] : [A, B, C, D])}" fill="${FILL}" fill-opacity="0.8" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round" class="g5p-poly"/>`;
    }
    if (S.labels && !S.cut && b > 0) {
      g += chev(A, B, a === b ? 1 : 1) + chev(D, C, 1);
      if (a === b) g += chev(A, D, 2) + chev(B, C, 2);
    }
    // góc vuông của hình thang vuông
    if (S.labels && b > 0) {
      if (S.A.x === S.D.x) g += rightMark(D, { x: 1, y: 0 }, { x: 0, y: -1 }, c * 0.32) + rightMark(A, { x: 1, y: 0 }, { x: 0, y: 1 }, c * 0.32);
      if (S.B.x === S.C.x && !S.cut) g += rightMark(C, { x: -1, y: 0 }, { x: 0, y: -1 }, c * 0.32) + rightMark(B, { x: -1, y: 0 }, { x: 0, y: 1 }, c * 0.32);
    }
    if (S.alt && S.A.x !== S.D.x) {
      g += `<line x1="${A.x}" y1="${A.y}" x2="${H.x}" y2="${H.y}" stroke="${RED}" stroke-width="5" stroke-dasharray="12 8"/>`;
      g += rightMark(H, { x: S.A.x < (S.D.x + S.C.x) / 2 ? 1 : -1, y: 0 }, { x: 0, y: -1 }, c * 0.32);
      g += txt(H.x + (S.A.x < S.D.x ? -24 : 0), H.y + 44, 'H', { size: 38, color: RED });
    }
    // tên đỉnh
    g += txt(A.x - 22, A.y - 16, 'A', { size: 40 }) + (b > 0 && !S.rot ? txt(B.x + 22, B.y - 16, 'B', { size: 40 }) : '')
      + txt(C.x + (S.rot ? -26 : 26), C.y + 40, 'C', { size: 40 }) + txt(D.x - 26, D.y + 40, 'D', { size: 40 });
    if (S.labels && !S.dims && b > 0 && !S.cut) {
      const big = a >= b;
      g += txt((A.x + B.x) / 2, A.y - 22, a === b ? 'đáy' : big ? 'đáy bé' : 'đáy lớn', { size: 34, color: BLUE_D });
      g += txt((D.x + C.x) / 2, D.y + 46, a === b ? 'đáy' : big ? 'đáy lớn' : 'đáy bé', { size: 34, color: BLUE_D });
    }
    if (S.dims) {
      g += dim(D, C, `a = ${num(a)} ${S.unit}`, { off: c * 0.8 + 10, color: BLUE_D });
      if (b > 0) g += dim(B, A, `b = ${num(b)} ${S.unit}`, { off: c * 0.55 + 6, color: BLUE_D });
      if (S.alt) g += txt(H.x + 16, (A.y + H.y) / 2 + 14, `h = ${num(t.h())} ${S.unit}`, { size: 36, color: RED, anchor: 'start' });
    }
    if (S.drag) {
      const r = Math.max(22, c * 0.32);
      for (const [n, P] of [['A', A], ['B', B], ['C', C], ['D', D]]) {
        if (n === 'B' && b === 0) continue;
        g += `<g class="g5t-h g5p-h" data-v="${n}"><circle cx="${P.x}" cy="${P.y}" r="${r}" fill="${YEL}" stroke="${INK}" stroke-width="3"/><circle cx="${P.x}" cy="${P.y}" r="${r * 1.6}" fill="transparent"/></g>`;
      }
    }
    if (S.slider) {
      const y = t.X({ x: 0, y: sliderY() }).y, x0 = t.X({ x: S.A.x, y: 0 }).x, x1 = t.X({ x: S.A.x + a, y: 0 }).x, xk = t.X({ x: S.A.x + b, y: 0 }).x;
      g += `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="#CBD5E1" stroke-width="16" stroke-linecap="round"/>
        <line x1="${x0}" y1="${y}" x2="${xk}" y2="${y}" stroke="${BLUE_D}" stroke-width="16" stroke-linecap="round"/>
        ${Array.from({ length: a + 1 }, (_, i) => { const x = t.X({ x: S.A.x + i, y: 0 }).x; return `<circle cx="${x}" cy="${y}" r="4" fill="#fff"/>`; }).join('')}
        ${txt(x0 - 50, y + 12, '0', { size: 34, color: '#64748B', anchor: 'end' })}${txt(x1 + 50, y + 12, `a`, { size: 34, color: '#64748B', anchor: 'start' })}
        <g class="g5t-h g5p-h g5p-knob"><rect x="${xk - 26}" y="${y - 30}" width="52" height="60" rx="14" fill="${YEL}" stroke="${INK}" stroke-width="3"/>
          <text x="${xk}" y="${y + 12}" font-size="32" font-weight="800" text-anchor="middle" fill="${INK}">b</text><rect x="${xk - 46}" y="${y - 50}" width="92" height="100" fill="transparent"/></g>`;
    }
    t.L.fig.innerHTML = g;
    if (S.area) {
      const S2 = ((a + b) * t.h()) / 2;
      t.caption(`${kind}: S = (${num(a)} + ${num(b)}) × ${num(t.h())} : 2 = <b>${num(S2)} ${S.unit}²</b>`);
    } else if (S.kind) t.caption(`<b>${kind}</b>${kind === 'Hình thang vuông' ? ': một cạnh bên vuông góc với hai đáy' : kind === 'Hình thang' ? ' ABCD: AB song song với DC' : ''}`);
  }
  t.redraw = draw;
  t.set = (p) => { for (const k of ['A', 'B', 'C', 'D']) if (p[k]) S[k] = { ...p[k] }; for (const [k, v] of Object.entries(p)) if (!['A', 'B', 'C', 'D'].includes(k)) S[k] = v; draw(); };

  const lim = () => ({ lo: Math.ceil(-t.ox / t.cell), hi: Math.floor((t.W - t.ox) / t.cell), top: Math.ceil(-t.oy / t.cell) + 1 });
  draggable(t, '.g5p-h', {
    onDown(d) { d.v = d.h.dataset.v || 'knob'; },
    onMove(p, d) {
      const { lo, hi, top } = lim();
      const x = Math.max(lo, Math.min(hi, Math.round(p.x)));
      const old = JSON.stringify([S.A, S.B, S.C, S.D]);
      if (d.v === 'knob') { S.B.x = S.A.x + Math.max(0, Math.min(t.a(), x - S.A.x)); }
      else if (d.v === 'A' || d.v === 'B') {
        const y = Math.max(top, Math.min(S.D.y - 2, Math.round(p.y)));
        if (d.v === 'A') S.A.x = Math.min(x, S.B.x - 1); else S.B.x = Math.max(x, S.A.x + 1);
        S.A.y = S.B.y = y;
      } else if (d.v === 'D') S.D.x = Math.min(x, S.C.x - 1);
      else S.C.x = Math.max(x, S.D.x + 1);
      if (JSON.stringify([S.A, S.B, S.C, S.D]) === old) return;
      S.moves++;
      sfx.pop(S.moves % 8);
      draw();
      t.emit('move');
    },
  });
  /** Dời các đỉnh có chuyển động (thầy làm mẫu / dev). */
  t.moveTo = async (to, ms = 800) => {
    const from = { A: { ...S.A }, B: { ...S.B }, C: { ...S.C }, D: { ...S.D } };
    const tgt = { ...from, ...to };
    await tween(ms, (e) => { for (const k of 'ABCD') S[k] = { x: from[k].x + (tgt[k].x - from[k].x) * e, y: from[k].y + (tgt[k].y - from[k].y) * e }; draw(); });
    for (const k of 'ABCD') S[k] = { ...tgt[k] };
    S.moves++; draw(); t.emit('move');
  };

  /** Bút chì vạch đường cao AH (từ H lên A). */
  t.dropAlt = async () => {
    const A = t.X(S.A), H = t.X({ x: S.A.x, y: S.D.y });
    const l = svgEl('line', { x1: H.x, y1: H.y, x2: H.x, y2: H.y, stroke: RED, 'stroke-width': 6, 'stroke-linecap': 'round' });
    const pen = svgEl('text', { x: H.x + 4, y: H.y, 'font-size': 56 }, '✏️');
    t.L.top.append(l, pen);
    sfx.swish();
    await tween(1000, (e) => { const y = H.y + (A.y - H.y) * e; l.setAttribute('y2', y); pen.setAttribute('y', y); });
    l.remove(); pen.remove();
    S.alt = true; draw();
  };

  // ── Cắt ghép (SGK tr. 102) ──────────────────────────────────────────────────────────────────────────
  let piece = null;
  /** Trung điểm M của BC. */
  t.showM = async () => {
    const M = mid(t.X(S.B), t.X(S.C));
    t.L.top.insertAdjacentHTML('beforeend', `<g class="g5p-m"><circle cx="${M.x}" cy="${M.y}" r="9" fill="${INK}"/>${txt(M.x + 30, M.y + 8, 'M', { size: 40 })}</g>`);
    await t.q('.g5p-m').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'both' }).finished;
    sfx.pop(4);
  };
  /** Cắt theo AM: tam giác ABM tách thành mảnh xanh dương. */
  t.cutAM = async () => {
    const A = t.X(S.A), B = t.X(S.B), M = mid(t.X(S.B), t.X(S.C));
    const l = svgEl('line', { x1: A.x, y1: A.y, x2: A.x, y2: A.y, stroke: RED, 'stroke-width': 5, 'stroke-dasharray': '12 8' });
    const sc = svgEl('text', { x: A.x, y: A.y, 'font-size': 56, 'text-anchor': 'middle' }, '✂️');
    t.L.top.append(l, sc);
    sfx.swish();
    await tween(1000, (e) => { const x = A.x + (M.x - A.x) * e, y = A.y + (M.y - A.y) * e; l.setAttribute('x2', x); l.setAttribute('y2', y); sc.setAttribute('x', x); sc.setAttribute('y', y + 20); });
    l.remove(); sc.remove();
    S.cut = true; draw();
    const P = [A, B, M];
    const el = svgEl('polygon', { points: pts(P), fill: '#38BDF8', stroke: INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
    t.L.piece.append(el);
    piece = { el, P, M };
    await el.animate([{ transform: 'translate(0, 0)' }, { transform: 'translate(0, -14px)' }, { transform: 'translate(0, 0)' }], { duration: 600 }).finished;
  };
  /** Xoay mảnh ABM 180° quanh M: A → K, B → C. */
  t.rotateABM = async () => {
    sfx.swish();
    piece.P = await flyPiece(piece.el, piece.P, piece.M, piece.M, 180, 1800);
    S.rot = true; draw();
    sfx.pop(6);
    const K = piece.P[0], C = t.X(S.C), D = t.X(S.D), A = t.X(S.A);
    t.L.top.insertAdjacentHTML('beforeend', txt(K.x + 26, K.y + 40, 'K', { size: 40 }));
    const ck = svgEl('line', { x1: C.x, y1: C.y, x2: K.x, y2: K.y, stroke: '#F97316', 'stroke-width': 12, 'stroke-linecap': 'round' });
    t.L.top.append(ck);
    t.L.top.insertAdjacentHTML('beforeend', txt((C.x + K.x) / 2 + 10, C.y + 44, 'CK = AB', { size: 34, color: '#EA580C' }));
    await ck.animate([{ opacity: 0 }, { opacity: 1 }, { opacity: 0.3 }, { opacity: 1 }], { duration: 1200 }).finished;
    const tri = svgEl('polygon', { points: pts([A, D, K]), fill: 'none', stroke: GREEN, 'stroke-width': 9, 'stroke-linejoin': 'round' });
    t.L.top.append(tri);
    await tri.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, fill: 'both' }).finished;
    t.L.top.insertAdjacentHTML('beforeend', dim(D, K, 'DK = DC + AB', { off: Math.max(t.cell * 1.1, 70), color: BLUE_D }));
  };
  t.K = () => ({ x: S.C.x + t.b(), y: S.C.y });

  draw();
  return t;
}

