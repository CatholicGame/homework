/**
 * ⭕ Đường tròn, hình tròn (Toán 5 Bài 27). Ba tấm vẽ:
 *  - createCompass: thước kẻ + com-pa. Mở com-pa đúng bán kính trên thước, đặt đầu nhọn ở tâm O, em kéo đầu bút chì
 *    quay một vòng (vẽ dần đường tròn). Rồi tô kín: hình tròn.
 *  - createWheel: bánh xe có chấm đỏ lăn một vòng trên thước (em kéo), để lại vết; ba đường kính bay xuống nằm
 *    dọc vết: hơn 3 lần một chút → 3,14.
 *  - createSectors: cắt hình tròn thành 4, 8, 16, 32 múi; các múi bay xen kẽ thành hình gần chữ nhật dài 3,14 × r,
 *    rộng r.
 */

import { createGeo, draggable, tween, flyPiece, svgEl, txt, dim, pts, INK, sfx, RED, BLUE_D, GREEN, YEL } from './tri.js';

const rad = (d) => (d * Math.PI) / 180;
const pol = (O, r, a) => ({ x: O.x + r * Math.cos(rad(a)), y: O.y + r * Math.sin(rad(a)) });
/** Cung tròn tâm O bán kính r từ góc 0 tới a (độ, chiều kim đồng hồ). */
const arcPath = (O, r, a) => {
  if (a >= 359.9) return `M${O.x + r} ${O.y} A${r} ${r} 0 1 1 ${O.x - r} ${O.y} A${r} ${r} 0 1 1 ${O.x + r} ${O.y}`;
  const e = pol(O, r, a);
  return `M${O.x + r} ${O.y} A${r} ${r} 0 ${a > 180 ? 1 : 0} 1 ${e.x} ${e.y}`;
};

/** Thước kẻ ngang từ x0, vạch 0 tại x0, mỗi đơn vị u, n đơn vị, sub vạch nhỏ / đơn vị. */
export function rulerSvg(x0, y, u, n, { sub = 10, label = (i) => String(i), unitText = 'cm', h = 64 } = {}) {
  let g = `<rect x="${x0 - 30}" y="${y}" width="${n * u + 90}" height="${h}" rx="8" fill="#FEF3C7" stroke="#B45309" stroke-width="4"/>`;
  for (let i = 0; i <= n * sub; i++) {
    const x = x0 + (i * u) / sub, big = i % sub === 0, half = sub % 2 === 0 && i % (sub / 2) === 0;
    g += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + (big ? 26 : half ? 18 : 11)}" stroke="#78350F" stroke-width="${big ? 3 : 1.6}"/>`;
    if (big) g += `<text x="${x}" y="${y + 52}" font-size="24" font-weight="800" fill="#78350F" text-anchor="middle">${label(i / sub)}</text>`;
  }
  g += `<text x="${x0 + n * u + 54}" y="${y + 40}" font-size="24" font-weight="800" fill="#B45309" text-anchor="middle">${unitText}</text>`;
  return g;
}

// ── Com-pa ────────────────────────────────────────────────────────────────────────────────────────────
/** Com-pa đứng: đầu nhọn O, đầu chì P, chân dài L. */
function compaSvg(O, P, L) {
  const m = { x: (O.x + P.x) / 2, y: (O.y + P.y) / 2 }, d = Math.hypot(P.x - O.x, P.y - O.y);
  const hh = Math.sqrt(Math.max(L * L - (d / 2) ** 2, L * L * 0.15));
  const H = { x: m.x, y: m.y - hh };
  const pu = { x: (P.x - H.x) / L, y: (P.y - H.y) / L };
  const pc = { x: P.x - pu.x * L * 0.3, y: P.y - pu.y * L * 0.3 };
  return `<g class="g5c-compa">
    <line x1="${H.x}" y1="${H.y}" x2="${O.x}" y2="${O.y}" stroke="#64748B" stroke-width="12" stroke-linecap="round"/>
    <line x1="${O.x}" y1="${O.y}" x2="${O.x + (H.x - O.x) * 0.12}" y2="${O.y + (H.y - O.y) * 0.12}" stroke="#1E293B" stroke-width="5"/>
    <line x1="${H.x}" y1="${H.y}" x2="${pc.x}" y2="${pc.y}" stroke="#64748B" stroke-width="12" stroke-linecap="round"/>
    <line x1="${pc.x}" y1="${pc.y}" x2="${P.x}" y2="${P.y}" stroke="${YEL}" stroke-width="14" stroke-linecap="round"/>
    <line x1="${P.x - pu.x * 12}" y1="${P.y - pu.y * 12}" x2="${P.x}" y2="${P.y}" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
    <rect x="${H.x - 9}" y="${H.y - 46}" width="18" height="40" rx="7" fill="#F97316" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="${H.x}" cy="${H.y}" r="13" fill="#CBD5E1" stroke="${INK}" stroke-width="3"/>
  </g>`;
}

export function createCompass(host, { r = 3 } = {}) {
  const t = createGeo(host, { reserve: 0.17 });
  const W = t.W, UH = t.H * 0.83;
  const port = t.port;
  // u: đơn vị vẽ của 1 cm
  const u = port ? Math.min((W * 0.8) / (2 * r), (UH - 210) / (2.02 * r)) : Math.min((UH - 90) / (2 * r), 80);
  const L = u * r * 0.72;
  const ruler = port ? { x: (W - (r + 2) * u) / 2, y: 70 } : { x: 70, y: UH - 120 };
  const slack = port ? Math.max(0, UH - 210 - 2.02 * r * u) : 0;
  const O = port ? { x: W / 2, y: 200 + 1.02 * r * u + slack / 2 } : { x: Math.max(70 + (r + 2) * u + r * u + 110, W * 0.62), y: UH / 2 + 30 };
  if (!port) O.x = Math.min(O.x, W - r * u - 50);
  const S = { O: { x: ruler.x, y: ruler.y }, P: { x: ruler.x, y: ruler.y }, ang: 0, drawn: 0, phase: 'ruler' };
  t.S = S; t.O = O; t.R = r * u; t.u = u;
  t.L.fig.innerHTML = `<g class="g5c-ruler">${rulerSvg(ruler.x, ruler.y, u, r + 2)}</g><path class="g5c-disc" d="${arcPath(O, r * u, 360)}" fill="#BAE6FD" opacity="0"/>
    <path class="g5c-arc" d="" fill="none" stroke="${BLUE_D}" stroke-width="7" stroke-linecap="round"/><g class="g5c-marks"></g>`;
  const arc = t.q('.g5c-arc');
  function place() {
    t.L.eke.innerHTML = compaSvg(S.O, S.P, L) + (S.phase === 'sweep' ? `<g class="g5t-h g5c-h"><circle cx="${S.P.x}" cy="${S.P.y}" r="26" fill="${YEL}" stroke="${INK}" stroke-width="3" opacity="0.85"/><circle cx="${S.P.x}" cy="${S.P.y}" r="46" fill="transparent"/></g>` : '');
    if (S.phase !== 'ruler') arc.setAttribute('d', S.drawn > 0 ? arcPath(O, r * u, S.drawn) : '');
  }
  place();
  /** Mở com-pa trên thước tới r cm. */
  t.open = async () => {
    sfx.swish();
    await tween(1300, (e) => { S.P = { x: ruler.x + r * u * e, y: ruler.y }; place(); });
    t.L.top.insertAdjacentHTML('beforeend', `<g class="g5c-rl">${txt(ruler.x + (r * u) / 2, ruler.y - 18 - (port ? 0 : 0), `${r} cm`, { size: 40, color: RED })}</g>`);
  };
  /** Nhấc com-pa đặt đầu nhọn vào tâm O. */
  t.toCenter = async () => {
    const o0 = { ...S.O }, p0 = { ...S.P };
    t.q('.g5c-rl')?.remove();
    t.L.marks = null;
    t.L.fig.querySelector('.g5c-marks').innerHTML = `<circle cx="${O.x}" cy="${O.y}" r="8" fill="${INK}"/>${txt(O.x - 26, O.y + 40, 'O', { size: 40 })}`;
    await tween(1200, (e) => { const lift = Math.sin(e * Math.PI) * 60; S.O = { x: o0.x + (O.x - o0.x) * e, y: o0.y + (O.y - o0.y) * e - lift }; S.P = { x: p0.x + (O.x + r * u - p0.x) * e, y: p0.y + (O.y - p0.y) * e - lift }; place(); });
    S.O = { ...O }; S.P = { x: O.x + r * u, y: O.y }; S.phase = 'sweep'; place();
  };
  const setAng = (a) => { S.ang = a; S.P = pol(O, r * u, a); S.drawn = Math.max(S.drawn, a); place(); };
  draggable(t, '.g5c-h', {
    onMove(p, d, e) {
      const q = t.toSvg(e);
      let a = (Math.atan2(q.y - O.y, q.x - O.x) * 180) / Math.PI;
      if (a < 0) a += 360;
      // chỉ quay tiếp (theo chiều kim đồng hồ), không nhảy cóc qua chỗ chưa vẽ
      let na = S.ang;
      const step = ((a - (S.ang % 360)) + 540) % 360 - 180;
      if (step > 0 && step < 60) na = S.ang + step;
      if (na >= 358) na = 360;
      if (na !== S.ang) { setAng(na); if (Math.floor(na / 30) !== Math.floor((na - step) / 30)) sfx.pop(Math.floor(na / 45)); t.emit('sweep'); }
    },
  });
  t.done = () => S.drawn >= 360;
  t.sweep = async (ms = 1800) => { const a0 = S.ang; sfx.swish(); await tween(ms, (e) => setAng(a0 + (360 - a0) * e)); setAng(360); t.emit('sweep'); };
  /** Cất com-pa, hiện bán kính, đường kính. */
  t.finishDraw = () => { S.phase = 'done'; t.L.eke.innerHTML = ''; };
  t.radius = async () => {
    const A = pol(O, r * u, 0);
    const l = svgEl('line', { x1: O.x, y1: O.y, x2: O.x, y2: O.y, stroke: RED, 'stroke-width': 6, 'stroke-linecap': 'round' });
    t.L.top.append(l);
    await tween(700, (e) => l.setAttribute('x2', O.x + (A.x - O.x) * e));
    t.L.top.insertAdjacentHTML('beforeend', `<circle cx="${A.x}" cy="${A.y}" r="8" fill="${INK}"/>${txt(A.x + 28, A.y + 12, 'A', { size: 40 })}${txt((O.x + A.x) / 2, O.y - 18, `r = ${r} cm`, { size: 36, color: RED })}`);
  };
  t.diameter = async () => {
    const M = pol(O, r * u, 135), N = pol(O, r * u, 315);
    const l = svgEl('line', { x1: M.x, y1: M.y, x2: M.x, y2: M.y, stroke: GREEN, 'stroke-width': 6, 'stroke-linecap': 'round' });
    t.L.top.append(l);
    await tween(800, (e) => { l.setAttribute('x2', M.x + (N.x - M.x) * e); l.setAttribute('y2', M.y + (N.y - M.y) * e); });
    t.L.top.insertAdjacentHTML('beforeend', `<circle cx="${M.x}" cy="${M.y}" r="8" fill="${INK}"/><circle cx="${N.x}" cy="${N.y}" r="8" fill="${INK}"/>${txt(M.x - 26, M.y + 34, 'M', { size: 40 })}${txt(N.x + 26, N.y - 8, 'N', { size: 40 })}
      ${txt(O.x - 30, O.y - r * u * 0.42, `d = ${r * 2} cm`, { size: 36, color: GREEN, anchor: 'end' })}`);
  };
  /** Đường tròn (nét) nhấp nháy, rồi tô kín miền trong: hình tròn. */
  t.flashLine = () => arc.animate([{ strokeWidth: 7 }, { strokeWidth: 16, stroke: '#F97316' }, { strokeWidth: 7 }], { duration: 800, iterations: 2 }).finished;
  t.fill = () => t.q('.g5c-disc').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, fill: 'both' }).finished;
  t.unfill = () => t.q('.g5c-disc').animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'both' }).finished;
  return t;
}

// ── Bánh xe lăn trên thước ────────────────────────────────────────────────────────────────────────────
export function createWheel(host, { d = 2 } = {}) {
  const t = createGeo(host, { reserve: 0.17 });
  const W = t.W, UH = t.H * 0.83;
  const n = Math.ceil(Math.PI * d) + 1; // số đơn vị trên thước
  const u = Math.min((W - 120) / (n + d / 2), (UH - 140) / d); // 1 dm
  const R = (d * u) / 2, x0 = R + 30, yr = t.port ? UH * 0.5 + R : UH - 92;
  const C = Math.PI * d * u;
  const S = { s: 0, trace: [] };
  t.S = S; t.R = R; t.x0 = x0; t.yr = yr; t.C = C;
  let spokes = '';
  for (let k = 0; k < 8; k++) { const p = pol({ x: 0, y: 0 }, R - 14, k * 45); spokes += `<line x1="0" y1="0" x2="${p.x}" y2="${p.y}" stroke="#94A3B8" stroke-width="5"/>`; }
  t.L.fig.innerHTML = `${rulerSvg(x0, yr, u, n, { unitText: 'dm' })}
    <line class="g5w-run" x1="${x0}" y1="${yr}" x2="${x0}" y2="${yr}" stroke="${RED}" stroke-width="10" stroke-linecap="round"/>
    <polyline class="g5w-trace" points="" fill="none" stroke="${RED}" stroke-width="4" stroke-dasharray="3 9" stroke-linecap="round"/>`;
  t.L.eke.innerHTML = `<g class="g5w-wheel g5t-h-no"><g class="g5w-rot"><circle r="${R}" fill="#E0F2FE" stroke="${INK}" stroke-width="4.5"/><circle r="${R - 14}" fill="none" stroke="#7DD3FC" stroke-width="5"/>${spokes}
      <circle r="16" fill="${INK}"/><circle cx="0" cy="${R - 4}" r="13" fill="${RED}" stroke="#fff" stroke-width="3"/></g>
      <circle r="${R}" fill="transparent" class="g5w-grab"/></g>`;
  const wheel = t.q('.g5w-wheel'), rotG = t.q('.g5w-rot'), run = t.q('.g5w-run'), trace = t.q('.g5w-trace');
  function place() {
    const cx = x0 + S.s, cy = yr - R, a = (S.s / R) * (180 / Math.PI);
    wheel.setAttribute('transform', `translate(${cx} ${cy})`);
    rotG.setAttribute('transform', `rotate(${a})`);
    run.setAttribute('x2', x0 + S.s);
    const P = [];
    for (let k = 0; k <= 60; k++) { const s = (S.s * k) / 60, th = s / R; P.push({ x: x0 + s - R * Math.sin(th), y: yr - R + R * Math.cos(th) }); }
    trace.setAttribute('points', pts(P));
  }
  place();
  const setS = (s) => { const old = S.s; S.s = Math.max(S.s, Math.min(C, s)); if (C - S.s < 3) S.s = C; if (S.s !== old) { place(); if (Math.floor(S.s / u) !== Math.floor(old / u)) sfx.pop(Math.floor(S.s / u)); t.emit('roll'); } };
  draggable(t, '.g5w-wheel', {
    onDown(d, e) { d.off = t.toSvg(e).x - (x0 + S.s); },
    onMove(p, d, e) { setS(t.toSvg(e).x - d.off - x0); },
  });
  t.done = () => S.s >= C;
  t.roll = async (ms = 2600) => { const s0 = S.s; await tween(ms, (e) => setS(s0 + (C - s0) * e), { linear: true }); };
  /** Ghi số đo chu vi dưới vết lăn. */
  t.markC = () => {
    t.L.top.insertAdjacentHTML('beforeend', `<line x1="${x0 + C}" y1="${yr - 40}" x2="${x0 + C}" y2="${yr + 30}" stroke="${RED}" stroke-width="5"/>
      ${txt(x0 + C, yr - 2 * R - 24, `${(Math.PI * d).toFixed(2).replace('.', ',')} dm`, { size: 40, color: RED, anchor: 'middle' })}`);
  };
  /** Ba đường kính (thanh xanh dài d) bay từ bánh xe xuống nằm nối nhau dọc vết lăn. */
  t.diameters = async () => {
    const cx = x0 + S.s, cy = yr - R, th = 10;
    for (let k = 0; k < 3; k++) {
      const P0 = [{ x: cx - th, y: cy - R }, { x: cx + th, y: cy - R }, { x: cx + th, y: cy + R }, { x: cx - th, y: cy + R }];
      const el = svgEl('polygon', { points: pts(P0), fill: '#4ADE80', stroke: '#15803D', 'stroke-width': 3 });
      t.L.top.append(el);
      sfx.swish();
      await flyPiece(el, P0, { x: cx, y: cy }, { x: x0 + R + 2 * R * k, y: yr - 22 - k * 0 }, -90, 1100);
      t.L.top.insertAdjacentHTML('beforeend', txt(x0 + R + 2 * R * k, yr - 42, `d`, { size: 36, color: GREEN }));
      sfx.pop(k + 3);
    }
    const rest = svgEl('line', { x1: x0 + 6 * R, y1: yr - 22, x2: x0 + C, y2: yr - 22, stroke: '#F97316', 'stroke-width': 20, 'stroke-linecap': 'butt' });
    t.L.top.append(rest);
    await rest.animate([{ opacity: 0 }, { opacity: 1 }, { opacity: 0.3 }, { opacity: 1 }], { duration: 1200, fill: 'both' }).finished;
  };
  return t;
}

// ── Cắt hình tròn thành múi ───────────────────────────────────────────────────────────────────────────
export function createSectors(host) {
  const t = createGeo(host, { reserve: 0.17 });
  const W = t.W, UH = t.H * 0.83, port = t.port;
  // landscape: hình tròn trái, chữ nhật phải; dọc: tròn trên, chữ nhật dưới
  const R = port ? Math.min((W - 160) / 3.7, (UH - 260) / 3.2) : Math.min((W * 0.6 - 60) / 3.7, (UH - 140) / 2.2);
  const O = port ? { x: W / 2, y: 40 + R + 20 } : { x: 60 + R, y: UH / 2 };
  const row = port ? { x: (W - 3.4 * R) / 2, y: O.y + R + 110 } : { x: O.x + R + 70, y: UH / 2 - R / 2 };
  t.R = R; t.O = O; t.row = row;
  let G = [];
  const sec = (D) => `M0 0 L${R * Math.cos(rad(-D / 2))} ${R * Math.sin(rad(-D / 2))} A${R} ${R} 0 0 1 ${R * Math.cos(rad(D / 2))} ${R * Math.sin(rad(D / 2))} Z`;
  /** Hình tròn cắt sẵn n múi (nửa dưới xanh, nửa trên vàng). */
  t.cutInto = async (n) => {
    t.L.top.innerHTML = '';
    const D = 360 / n;
    t.L.fig.innerHTML = `<circle cx="${O.x}" cy="${O.y}" r="${R}" fill="none" stroke="#CBD5E1" stroke-width="3" stroke-dasharray="8 8"/>`;
    t.L.piece.innerHTML = '';
    G = [];
    for (let i = 0; i < n; i++) {
      const phi = D * (i + 0.5);
      const down = Math.sin(rad(phi)) > 0;
      const g = svgEl('g', { transform: `translate(${O.x} ${O.y}) rotate(${phi})` }, `<path d="${sec(D)}" fill="${down ? '#38BDF8' : '#FACC15'}" stroke="${INK}" stroke-width="${n > 16 ? 2 : 3}" stroke-linejoin="round"/>`);
      t.L.piece.append(g);
      G.push({ g, phi, down, x: O.x, y: O.y, a: phi });
    }
    sfx.pop(2);
    await t.L.piece.animate([{ opacity: 0.3 }, { opacity: 1 }], { duration: 500 }).finished;
    t.n = n;
  };
  /** Các múi bay ra, xếp xen kẽ thành hình gần chữ nhật. */
  t.unroll = async () => {
    const n = G.length, D = 360 / n, w = 2 * R * Math.sin(rad(D / 2));
    const k = (R * Math.PI) / ((n / 2) * w + w / 2); // co nhẹ cho dài đúng 3,14 × r
    const downs = G.filter(s => s.down).sort((p, q) => Math.cos(rad(q.phi)) - Math.cos(rad(p.phi)));
    const ups = G.filter(s => !s.down).sort((p, q) => Math.cos(rad(q.phi)) - Math.cos(rad(p.phi)));
    downs.reverse(); ups.reverse();
    const tg = [];
    downs.forEach((s, i) => tg.push([s, row.x + (w / 2 + i * w) * k, row.y, 90]));
    ups.forEach((s, i) => tg.push([s, row.x + (w + i * w) * k, row.y + R, 270]));
    const norm = (d) => ((d + 540) % 360) - 180;
    const jobs = tg.map(([s, x, y, a], i) => new Promise((res) => setTimeout(res, (i * 900) / n)).then(() => {
      const x0 = s.x, y0 = s.y, a0 = s.a, da = norm(a - a0);
      if (i % Math.max(1, n / 8) === 0) sfx.pop(i % 8);
      return tween(1100, (e) => { const lift = Math.sin(e * Math.PI) * 40; s.g.setAttribute('transform', `translate(${x0 + (x - x0) * e} ${y0 + (y - y0) * e - lift}) rotate(${a0 + da * e})`); })
        .then(() => { s.x = x; s.y = y; s.a = a0 + da; });
    }));
    await Promise.all(jobs);
  };
  /** Kích thước hình gần chữ nhật. */
  t.dims = () => {
    const a = { x: row.x, y: row.y + R }, b = { x: row.x + Math.PI * R, y: row.y + R };
    t.L.top.innerHTML = dim(a, b, 'dài = 3,14 × r', { off: 24, color: RED, size: 38 }) + dim({ x: b.x + 22, y: row.y }, { x: b.x + 22, y: row.y + R }, 'r', { off: 14, color: BLUE_D, size: 40 })
      + `<line x1="${O.x}" y1="${O.y}" x2="${O.x + R}" y2="${O.y}" stroke="${BLUE_D}" stroke-width="5"/>${txt(O.x + R / 2, O.y - 14, 'r', { size: 40, color: BLUE_D })}`;
  };
  return t;
}
