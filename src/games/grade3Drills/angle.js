/**
 * 📐 Góc vuông, góc không vuông (Toán 3 KNTT Tập 1: Bài 18 "Góc, góc vuông, góc không vuông",
 * Bài 20 "Thực hành vẽ góc vuông"). Mỗi lượt một hình mới vẽ trên giấy ô vuông:
 *   1 Gọi tên góc      góc được tô màu (một góc, ba tia chung đỉnh, góc của tam giác / tứ giác): em chạm chữ để viết
 *                      "Góc đỉnh O; cạnh OM, ON", chữ bay từ thẻ xuống ô, cạnh vừa viết sáng lên trên hình.
 *   2 Kiểm tra bằng ê ke  em kéo ê ke, đặt góc vuông của ê ke vào đỉnh (tự khớp), chạm ê ke để đổi cạnh;
 *                      rồi chọn "Góc vuông" / "Góc không vuông". Bẫy: góc 78°–84°, 96°–102° nhìn bằng mắt rất giống.
 *   3 Đếm góc vuông    hình tứ giác, hình năm cạnh (hình chữ nhật cắt góc, ngôi nhà), tam giác vuông, hình bình hành
 *                      gần vuông: em đặt ê ke vào từng đỉnh (đánh dấu ∟ xanh / cung đỏ), gõ số góc vuông; kiểm chứng:
 *                      ê ke đi qua từng đỉnh, góc vuông được đánh số 1, 2, 3…
 *   4 Vẽ góc vuông     trên giấy ô vuông có O và cạnh OA; em chạm một điểm B, OB được kẻ, rồi bấm Kiểm tra: ê ke đặt
 *                      vào đỉnh O dọc theo OA, khít là xong, hở thì thầy chỉ khe hở và ê ke ở lại làm thước để vẽ lại.
 * Bố cục giữ nguyên trong lượt: tờ vở (đề / hình / dòng trả lời) + bảng thao tác ở chỗ bàn phím (thẻ chữ, hai nút chọn,
 * nút kiểm tra; cấp 3 dùng bàn phím số).
 */

import { mountDrill, shake, setActive, flyOne, calmMotion, fresh, sfx, sleep, how, TEACHER } from './kit.js';

const NS = 'http://www.w3.org/2000/svg';
const D = Math.PI / 180;
const dir = (a) => [Math.cos(a), Math.sin(a)];
const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
const mul = (p, k) => [p[0] * k, p[1] * k];
const len = (p) => Math.hypot(p[0], p[1]);
const angOf = (p, q) => Math.atan2(q[1] - p[1], q[0] - p[0]);
const angDiff = (a, b) => { let d = (a - b) % (2 * Math.PI); if (d > Math.PI) d -= 2 * Math.PI; if (d <= -Math.PI) d += 2 * Math.PI; return d; };
const rotP = ([x, y], a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
const r2 = (v) => Math.round(v * 100) / 100;
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const easeOutBack = (t) => 1 + 2.2 * (t - 1) ** 3 + 1.2 * (t - 1) ** 2;
/** Giọng đọc: "OM" đọc thành "O, M" (không đọc thành "ôm"). */
const sp = (s) => s.split('').join(' ');
const COL = { arm: '#1E3A8A', hl: '#EA580C', hlFill: '#FED7AA', ok: '#10B981', bad: '#DC2626', base: '#2563EB' };
const TOL = 0.6 * D;

// ── Đề ───────────────────────────────────────────────────────────────────────────────────────────────
const SETS1 = [['O', 'M', 'N'], ['O', 'A', 'B'], ['I', 'H', 'K'], ['E', 'D', 'G'], ['B', 'A', 'C'], ['O', 'P', 'Q']];
const SETS3 = [['O', 'A', 'B', 'C'], ['I', 'M', 'N', 'P'], ['O', 'E', 'G', 'H']];
const POLY = { 3: ['ABC', 'MNP', 'DEG', 'HIK'], 4: ['ABCD', 'MNPQ', 'EGHI'], 5: ['ABCDE', 'MNPQR', 'GHIKL'] };

/** Góc trong (độ) tại mỗi đỉnh của đa giác. */
const polyAngles = (P) => P.map((p, i) => {
  const a = P[(i + P.length - 1) % P.length], b = P[(i + 1) % P.length];
  return Math.abs(angDiff(angOf(p, a), angOf(p, b))) / D;
});
const convex = (P) => {
  const s = P.map((p, i) => { const q = P[(i + 1) % P.length], r = P[(i + 2) % P.length]; return Math.sign((q[0] - p[0]) * (r[1] - q[1]) - (q[1] - p[1]) * (r[0] - q[0])); });
  return s.every(x => x === s[0]);
};

/** Đa giác lồi ngẫu nhiên (cấp gọi tên): các góc 40°–125°, không góc nào gần vuông. */
function randomPoly(rng, n) {
  for (let t = 0; t < 400; t++) {
    const P = Array.from({ length: n }, (_, i) => {
      const a = (2 * Math.PI * i) / n + (rng() - 0.5) * (Math.PI / n) - Math.PI / 2;
      const r = 3 + rng() * 1.2;
      return [r * Math.cos(a) * 1.25, r * Math.sin(a)];
    });
    const ang = polyAngles(P);
    if (!convex(P) || Math.min(...ang) < 40 || Math.max(...ang) > 125) continue;
    return P;
  }
  return n === 3 ? [[0, -3.5], [3.5, 2.2], [-3.2, 2]] : [[-3, -2.6], [3.4, -2], [3.8, 2.6], [-3.6, 2.2]];
}

/** Tên điểm: đặt ra phía ngoài, ngược hướng trung bình các đoạn thẳng đi ra từ điểm đó. */
function labelsOf(pts, segs) {
  const lab = {};
  for (const [k, p] of Object.entries(pts)) {
    let v = [0, 0];
    segs.forEach(([a, b]) => {
      const o = a === k ? b : b === k ? a : null;
      if (o) { const u = sub(pts[o], p); v = add(v, mul(u, 1 / len(u))); }
    });
    let l = len(v);
    if (l < 0.2) { v = [0, 1]; l = 1; }
    lab[k] = sub(p, mul(v, 0.78 / l));
  }
  return lab;
}

/** Dời hình cho góc trên trái ở (0, 0) (tính cả tên điểm). */
function place(m) {
  const all = [...Object.values(m.pts), ...Object.values(m.lab)];
  const x0 = Math.min(...all.map(p => p[0])), y0 = Math.min(...all.map(p => p[1]));
  const mv = (p) => [r2(p[0] - x0 + 0.6), r2(p[1] - y0 + 0.6)];
  for (const k of Object.keys(m.pts)) { m.pts[k] = mv(m.pts[k]); m.lab[k] = mv(m.lab[k]); }
  return m;
}

/** Cấp 1: một góc có đánh dấu để gọi tên. */
function genName(rng, fig) {
  if (fig === 'one') {
    const [V, X, Y] = rng.pick(SETS1);
    const a0 = rng.int(0, 359) * D, d = rng.int(40, 140) * D;
    const pts = { [V]: [0, 0], [X]: mul(dir(a0), rng.int(45, 58) / 10), [Y]: mul(dir(a0 + d), rng.int(45, 58) / 10) };
    const segs = [[V, X], [V, Y]];
    return place({ kind: 'name', fig, pts, segs, lab: labelsOf(pts, segs), V, X, Y, letters: [V, X, Y].sort() });
  }
  if (fig === 'fan') {
    const [V, A, B, C] = rng.pick(SETS3);
    const a0 = rng.int(0, 359) * D, al = rng.int(38, 70) * D, be = rng.int(38, 70) * D;
    const pts = { [V]: [0, 0], [A]: mul(dir(a0), 5.2), [B]: mul(dir(a0 + al), 5.2), [C]: mul(dir(a0 + al + be), 5.2) };
    const segs = [[V, A], [V, B], [V, C]];
    const [X, Y] = rng.pick([[A, B], [B, C], [A, C], [A, C]]);
    return place({ kind: 'name', fig, pts, segs, lab: labelsOf(pts, segs), V, X, Y, letters: [V, A, B, C].sort() });
  }
  const n = fig === 'tri' ? 3 : 4;
  const name = rng.pick(POLY[n]);
  const P = randomPoly(rng, n);
  const pts = {};
  [...name].forEach((c, i) => { pts[c] = P[i]; });
  const segs = [...name].map((c, i) => [c, name[(i + 1) % n]]);
  const i = rng.int(0, n - 1);
  const m = { kind: 'name', fig, pts, segs, poly: [...name], lab: {}, V: name[i], X: name[(i + n - 1) % n], Y: name[(i + 1) % n], letters: [...name].sort() };
  // tên đỉnh của đa giác: hướng ra ngoài từ tâm
  const c = mul(P.reduce((s, p) => add(s, p), [0, 0]), 1 / n);
  [...name].forEach((k) => { const u = sub(pts[k], c); m.lab[k] = add(pts[k], mul(u, 0.78 / len(u))); });
  return place(m);
}

/** Cấp 2: một góc vuông / gần vuông (bẫy) / rõ không vuông, xoay tuỳ ý. */
function genEke(rng, type) {
  const [V, X, Y] = rng.pick(SETS1);
  const deg = type === 'R' ? 90 : type === 'T' ? (rng() < 0.5 ? rng.int(78, 84) : rng.int(96, 102)) : (rng() < 0.5 ? rng.int(45, 68) : rng.int(112, 135));
  const a0 = rng.int(0, 359) * D;
  const pts = { [V]: [0, 0], [X]: mul(dir(a0), rng.int(56, 64) / 10), [Y]: mul(dir(a0 + deg * D), rng.int(56, 64) / 10) };
  const segs = [[V, X], [V, Y]];
  return place({ kind: 'eke', pts, segs, lab: labelsOf(pts, segs), V, X, Y, deg, right: deg === 90 });
}

/** Cấp 3: hình có một số góc vuông. Trả về các đỉnh theo vòng, đã xoay nhẹ. */
function shapePts(rng, s) {
  const w = rng.int(5, 7), h = rng.int(3, 4);
  if (s === 'rect') return [[0, 0], [w, 0], [w, h], [0, h]];
  if (s === 'near') { const d = rng.int(6, 9) / 10; return [[0, 0], [w, 0], [w + d, h], [0, h]]; }
  if (s === 'para') { const k = Math.tan(rng.int(10, 13) * D) * h; return [[k, 0], [w + k, 0], [w, h], [0, h]]; }
  if (s === 'trap2') { const b = w - rng.int(2, 3); return [[0, 0], [b, 0], [w, h], [0, h]]; }
  if (s === 'cut') { const H = rng.int(4, 5), c = 2; return [[0, 0], [w, 0], [w, H - c], [w - c, H], [0, H]]; }
  if (s === 'house') { const W = rng.int(5, 6), r = 2; return [[W / 2, 0], [W, r], [W, r + 3], [0, r + 3], [0, r]]; }
  if (s === 'one') {
    for (let t = 0; t < 60; t++) {
      // góc vuông ở A (AB nằm ngang, AD thẳng đứng); C dời để các góc B, C, D không vuông
      const P = [[0, 0], [w, 0], [w - rng.int(5, 15) / 10, h + rng.int(10, 18) / 10], [0, h]];
      const ang = polyAngles(P);
      if (convex(P) && ang.slice(1).every(a => Math.abs(a - 90) >= 8)) return P;
    }
    return [[0, 0], [w, 0], [w - 1, h + 1.5], [0, h]];
  }
  return [[0, 0], [0, h], [w, h]]; // rtri
}
function genCount(rng, s, tilt) {
  let P = shapePts(rng, s);
  if (tilt) { const t = (rng() < 0.5 ? -1 : 1) * rng.int(8, 18) * D; P = P.map(p => rotP(p, t)); }
  const n = P.length;
  const name = rng.pick(POLY[n]);
  const pts = {};
  [...name].forEach((c, i) => { pts[c] = P[i]; });
  const segs = [...name].map((c, i) => [c, name[(i + 1) % n]]);
  const c = mul(P.reduce((a, p) => add(a, p), [0, 0]), 1 / n);
  const lab = {};
  [...name].forEach((k) => { const u = sub(pts[k], c); lab[k] = add(pts[k], mul(u, 0.72 / len(u))); });
  const m = place({ kind: 'count', s, pts, segs, lab, poly: [...name], name });
  const PP = m.poly.map(k => m.pts[k]);
  m.right = polyAngles(PP).map(a => Math.abs(a - 90) < 0.5);
  m.count = m.right.filter(Boolean).length;
  return m;
}

/** Cấp 4: O và A trên giấy ô vuông 12 × 8; em chọn B. vec: hướng OA theo ô lưới. */
const GW = 12, GH = 8;
function genDraw(rng, vec) {
  for (let t = 0; t < 200; t++) {
    const s = rng() < 0.5 ? 1 : -1, f = rng() < 0.5 ? 1 : -1;
    let v = vec === 'h' ? [s * rng.int(4, 5), 0] : vec === 'v' ? [0, s * rng.int(3, 4)] : vec === 'd1' ? [s * 3, f * 3] : [s * 4, f * 2];
    if (vec === 'd2' && rng() < 0.5) v = [v[1], v[0]];
    const O = [rng.int(1, GW - 1), rng.int(1, GH - 1)];
    const A = add(O, v);
    const inG = (p) => p[0] >= 1 && p[0] <= GW - 1 && p[1] >= 1 && p[1] <= GH - 1;
    if (!inG(A)) continue;
    const g = Math.abs(gcd(v[0], v[1]));
    const u = [-v[1] / g, v[0] / g];
    const good = [];
    for (let k = -8; k <= 8; k++) { const B = add(O, mul(u, k)); if (k && inG(B) && len(sub(B, O)) >= 2) good.push(B); }
    if (good.length < 2) continue;
    return { kind: 'draw', vec, O, A, u, good };
  }
  return { kind: 'draw', vec, O: [3, 6], A: [8, 6], u: [0, 1], good: [[3, 2], [3, 3]] };
}
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; }

const LEVEL = (id, n, title, desc, knowledge, lessons, missions, gen, ask) => ({
  id, n, title, desc, knowledge, lessons: { workbook: lessons }, missions, gen, ask: () => ask,
});

export const ANGLE_LEVELS = [
  LEVEL('drill-ang-1', 1, 'Gọi tên góc', 'Vd. Góc đỉnh O; cạnh OM, ON.', 'góc, đỉnh và hai cạnh của góc', ['bai-18'], 5,
    (rng, k) => genName(rng, ['one', 'fan', 'tri', 'quad', 'fan'][k % 5]),
    'Góc có một đỉnh và hai cạnh đi ra từ đỉnh đó!'),
  LEVEL('drill-ang-2', 2, 'Kiểm tra bằng ê ke', 'Đặt ê ke vào góc: khít là góc vuông, hở là góc không vuông.', 'dùng ê ke kiểm tra góc vuông, góc không vuông', ['bai-18'], 6,
    (rng, k) => genEke(rng, ['T', 'R', 'O', 'T', 'R', 'T'][k % 6]),
    'Có góc nhìn bằng mắt thì giống góc vuông, đặt ê ke mới biết!'),
  LEVEL('drill-ang-3', 3, 'Đếm góc vuông', 'Vd. Hình ABCD có 2 góc vuông.', 'góc vuông của hình tứ giác, hình chữ nhật, hình tam giác', ['bai-18'], 5,
    (rng, k) => genCount(rng, ['near', 'cut', 'para', 'house', 'trap2', 'one', 'rtri', 'rect'][k % 8], k % 2 === 1),
    'Đặt ê ke vào từng đỉnh, đừng bỏ sót đỉnh nào!'),
  LEVEL('drill-ang-4', 4, 'Vẽ góc vuông', 'Vẽ góc vuông đỉnh O; cạnh OA, OB trên giấy ô vuông.', 'vẽ góc vuông bằng ê ke, trên giấy ô vuông', ['bai-20'], 5,
    (rng, k) => genDraw(rng, ['h', 'v', 'h', 'd1', 'd2'][k % 5]),
    'Cạnh OB phải nằm khít cạnh ê ke!'),
];

const keyOf = (m) => `${m.kind}:${m.fig || m.s || m.vec || ''}:${m.deg ?? ''}:${JSON.stringify(m.pts || [m.O, m.A])}`;

// ── Vẽ ───────────────────────────────────────────────────────────────────────────────────────────────
function el(tag, attrs = {}, parent) {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (parent) parent.appendChild(e);
  return e;
}
const animate = (ms, step, alive) => new Promise((res) => {
  const t0 = performance.now();
  const f = () => {
    if (!alive()) { res(); return; }
    const t = Math.min(1, (performance.now() - t0) / ms);
    step(t);
    if (t < 1) setTimeout(f, 16); else res();
  };
  f();
});

/** Chữ bay từ thẻ / nút tới ô trên tờ vở, cỡ chữ đáp đúng cỡ ô. */
function flyText(text, fromEl, toEl, opts = {}) {
  const a = fromEl.getBoundingClientRect(), b = toEl.getBoundingClientRect();
  const fs = parseFloat(getComputedStyle(toEl).fontSize) || 24;
  const k = Math.max(1, Math.min(a.width / b.width, a.height / b.height) * 0.75);
  const w = b.width * k, h = b.height * k;
  const from = { left: a.left + (a.width - w) / 2, top: a.top + (a.height - h) / 2, width: w, height: h };
  return flyOne(`<div class="ang-fly" style="font-size:${fs * k}px">${text}</div>`, from, b, { minMs: 320, maxMs: 620, ...opts });
}

/** viewBox theo đúng tỉ lệ khung: giấy ô vuông phủ kín, hình ở giữa. */
function fitFigure(zone, svg, bb) {
  const fit = () => {
    const zw = zone.clientWidth, zh = zone.clientHeight;
    if (!zw || !zh) return;
    const bw = bb.x1 - bb.x0, bh = bb.y1 - bb.y0, r = zw / zh;
    const [W, H] = r > bw / bh ? [bh * r, bh] : [bw, bw / r];
    const cx = (bb.x0 + bb.x1) / 2, cy = (bb.y0 + bb.y1) / 2;
    svg.setAttribute('viewBox', `${cx - W / 2} ${cy - H / 2} ${W} ${H}`);
  };
  fit();
  new ResizeObserver(() => { if (zone.isConnected) fit(); }).observe(zone);
}
/** Cỡ chữ to nhất để dòng trả lời vừa khung. */
function fitLine(box, inner, cap) {
  const fit = () => {
    const w = box.clientWidth * 0.96, h = box.clientHeight * 0.9;
    if (w <= 0 || h <= 0) return;
    inner.style.fontSize = '100px';
    inner.style.fontSize = `${Math.floor(Math.min(100 * w / inner.scrollWidth, 100 * h / inner.scrollHeight, cap))}px`;
  };
  fit();
  new ResizeObserver(() => { if (box.isConnected) fit(); }).observe(box);
}

let uid = 0;
/**
 * Khung chung: tờ vở (đề, hình trên giấy ô vuông, dòng trả lời) + bảng thao tác thay bàn phím số (padHtml).
 * Trả về các lớp vẽ của hình và say / hint / wrong / finish.
 */
function frame(stage, api, { head, line, padHtml, bb, kind = '' }) {
  const id = ++uid;
  const board = `
    <div class="ang ang-k-${kind}${line ? '' : ' ang-noline'}">
      <div class="ang-head">${head}</div>
      <div class="ang-fig"><svg class="ang-svg" viewBox="0 0 10 10" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs><pattern id="ang-grid-${id}" width="1" height="1" patternUnits="userSpaceOnUse"><path d="M1 0 H0 V1" fill="none" stroke="#BFDBFE" stroke-width="0.035"/></pattern></defs>
        <rect x="-80" y="-80" width="200" height="200" fill="url(#ang-grid-${id})"/>
        <g class="ang-l-base"></g><g class="ang-l-marks"></g><g class="ang-l-res"></g><g class="ang-l-top"></g><g class="ang-l-over"></g><g class="ang-l-hit"></g>
      </svg></div>
      ${line ? `<div class="ang-line"><div class="ang-lg">${line}</div></div>` : ''}
    </div>`;
  const d = mountDrill(stage, { api, board, cls: 'ang-scene' });
  injectAngStyles();
  const padzone = d.scene.querySelector('.g3d-padzone');
  if (padHtml) padzone.innerHTML = padHtml;
  const svg = d.paper.querySelector('.ang-svg');
  fitFigure(d.paper.querySelector('.ang-fig'), svg, bb);
  if (line) fitLine(d.paper.querySelector('.ang-line'), d.paper.querySelector('.ang-lg'), 80);
  const L = (n) => svg.querySelector(`.ang-l-${n}`);
  let mistakes = 0, tip = '';
  const wrong = (els, text, shown, rule) => { mistakes++; tip ||= rule || shown || text; shake(els); d.hint(text, shown); };
  const finish = (ok) => d.done(mistakes, { ok, tip: tip ? `Nhớ: ${tip}` : '' });
  const toSvg = (e) => {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    return [p.x, p.y];
  };
  return { ...d, padzone, svg, L, wrong, finish, toSvg, alive: () => svg.isConnected };
}

/** Hình: các đoạn thẳng, đỉnh, tên điểm (đa giác thì tô nền nhạt). */
function figureSvg(m, fill = '#FFF7ED', under = '') {
  let s = '';
  if (m.poly) s += `<polygon points="${m.poly.map(k => m.pts[k].join(',')).join(' ')}" fill="${fill}" stroke="none"/>`;
  s += under;
  s += m.segs.map(([a, b]) => `<line class="ang-arm" data-seg="${a}${b}" x1="${m.pts[a][0]}" y1="${m.pts[a][1]}" x2="${m.pts[b][0]}" y2="${m.pts[b][1]}"/>`).join('');
  s += Object.keys(m.pts).map(k => `<circle class="ang-pt" cx="${m.pts[k][0]}" cy="${m.pts[k][1]}" r="0.11"/>`).join('');
  s += Object.keys(m.lab).map(k => `<text class="ang-lab" data-lab="${k}" x="${m.lab[k][0]}" y="${m.lab[k][1]}">${k}</text>`).join('');
  return s;
}
function bbOf(m, extra = []) {
  const all = [...Object.values(m.pts), ...Object.values(m.lab), ...extra];
  return { x0: Math.min(...all.map(p => p[0])) - 0.7, y0: Math.min(...all.map(p => p[1])) - 0.7, x1: Math.max(...all.map(p => p[0])) + 0.7, y1: Math.max(...all.map(p => p[1])) + 0.7 };
}

// ── Ê ke ─────────────────────────────────────────────────────────────────────────────────────────────
// Toạ độ riêng: góc vuông ở (0, 0), cạnh 1 theo +x (dài l1), cạnh 2 theo +y (dài l2); xoay th thì cạnh 1 theo hướng th,
// cạnh 2 theo hướng th + 90° (trục y hướng xuống).
const EKE_ICON = `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 34 V6 L34 34 Z" fill="#BAE6FD" stroke="#0369A1" stroke-width="2.6" stroke-linejoin="round"/><path d="M12 28 V18 L22 28 Z" fill="#fff" stroke="#0369A1" stroke-width="1.6" stroke-linejoin="round"/><path d="M6 27 H13 V34" fill="none" stroke="#075985" stroke-width="2"/></svg>`;
function makeEke(F, { l1, l2, drag = true }) {
  const g = el('g', { class: `ang-eke${drag ? '' : ' ang-eke-still'}` }, F.L('top'));
  const wig = el('g', { class: 'ang-eke-wig' }, g);
  el('polygon', { points: `0,0 ${l1},0 0,${l2}`, class: 'ang-eke-body' }, wig);
  const hx = l1 * 0.2, hy = l2 * 0.2, hs = 0.42;
  el('polygon', { points: `${hx},${hy} ${hx + l1 * hs},${hy} ${hx},${hy + l2 * hs}`, class: 'ang-eke-hole' }, wig);
  for (let x = 0.5; x < l1 - 0.4; x += 0.5) el('line', { x1: x, y1: 0, x2: x, y2: x % 1 ? 0.14 : 0.26, class: 'ang-eke-tick' }, wig);
  for (let y = 0.5; y < l2 - 0.4; y += 0.5) el('line', { x1: 0, y1: y, x2: y % 1 ? 0.14 : 0.26, y2: y, class: 'ang-eke-tick' }, wig);
  el('path', { d: 'M0.38 0 V0.38 H0', class: 'ang-eke-corner' }, wig);
  el('circle', { r: 0.16, class: 'ang-eke-dot' }, wig);
  const pose = { c: [0, 0], th: -Math.PI / 2 };
  const api = {
    g, pose, l1, l2, onDrop: null, onTap: null, onGrab: null,
    render() { g.setAttribute('transform', `translate(${pose.c[0]} ${pose.c[1]}) rotate(${pose.th / D})`); },
    set(c, th) { pose.c = c; pose.th = th; api.render(); },
    async flyTo(c, th, fast = false) {
      const c0 = pose.c.slice(), th0 = pose.th, dth = angDiff(th, th0), calm = calmMotion();
      const ms = (calm ? 700 : 440) * (fast ? 0.7 : 1);
      await animate(ms, (t) => {
        const e = calm ? easeInOut(t) : easeOutBack(t);
        pose.c = add(c0, mul(sub(c, c0), calm ? e : easeInOut(t)));
        pose.th = th0 + dth * e;
        api.render();
      }, F.alive);
      api.set(c, th);
    },
    wiggle() { wig.classList.remove('ang-wig'); void wig.getBoundingClientRect(); wig.classList.add('ang-wig'); },
    legLen: (k) => (k === 0 ? l1 : l2),
  };
  if (drag) {
    let st = null;
    g.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      try { g.setPointerCapture(e.pointerId); } catch { /* bút giả lập */ }
      st = { p0: F.toSvg(e), c0: pose.c.slice(), moved: false };
    });
    g.addEventListener('pointermove', (e) => {
      if (!st) return;
      const dd = sub(F.toSvg(e), st.p0);
      if (!st.moved && len(dd) < 0.15) return;
      if (!st.moved) { st.moved = true; api.onGrab?.(); }
      api.set(add(st.c0, dd), pose.th);
      api.onMove?.(pose.c);
    });
    const up = () => {
      if (!st) return;
      const moved = st.moved;
      st = null;
      if (moved) api.onDrop?.(pose.c); else api.onTap?.();
    };
    g.addEventListener('pointerup', up);
    g.addEventListener('pointercancel', up);
  }
  return api;
}

/** Hai cách đặt ê ke ở một góc (tia a, b): cạnh 1 trên tia "trước", hoặc cạnh 2 trên tia "sau"; thân ê ke nằm trong góc. */
function posesOf(a, b) {
  const [f, s] = angDiff(b, a) > 0 ? [a, b] : [b, a];
  return [f, s - Math.PI / 2];
}
/** Ê ke ở góc quay th, hai tia arms: tia nằm trên cạnh ê ke (base), cạnh ê ke còn trống (empty, li), khít không. */
function judge(th, arms) {
  const legs = [th, th + Math.PI / 2];
  for (let li = 0; li < 2; li++) for (let ai = 0; ai < 2; ai++) {
    if (Math.abs(angDiff(arms[ai], legs[li])) < TOL) {
      const empty = legs[1 - li], other = arms[1 - ai];
      return { base: ai, other: 1 - ai, empty, emptyLeg: 1 - li, fit: Math.abs(angDiff(other, empty)) < TOL };
    }
  }
  return null;
}
/** Vẽ kết quả đặt ê ke: khít → ô vuông xanh ở góc, hai cạnh xanh; hở → khe hở đỏ giữa cạnh ê ke và cạnh của góc. */
function drawJudge(layer, V, ends, j, eke, { quiet = false } = {}) {
  layer.replaceChildren();
  const over = layer.ownerSVGElement?.querySelector('.ang-l-over');
  over?.replaceChildren();
  const seg = (P, c, cls = '') => el('line', { x1: V[0], y1: V[1], x2: P[0], y2: P[1], stroke: c, class: `ang-hi ${cls}` }, layer);
  const arms = ends.map(P => angOf(V, P));
  if (quiet) { seg(ends[j.base], COL.base); return; } // chưa chọn: chỉ tô cạnh nằm trên ê ke, không lộ khít / hở
  if (j.fit) {
    seg(ends[0], COL.ok); seg(ends[1], COL.ok);
    const u = mul(dir(arms[0]), 0.62), w = mul(dir(arms[1]), 0.62);
    el('path', { d: `M${V[0]} ${V[1]} L${V[0] + u[0]} ${V[1] + u[1]} L${V[0] + u[0] + w[0]} ${V[1] + u[1] + w[1]} L${V[0] + w[0]} ${V[1] + w[1]} Z`, class: 'ang-fitsq' }, layer);
    return;
  }
  seg(ends[j.base], COL.base);
  seg(ends[j.other], COL.bad);
  const rr = Math.min(eke.legLen(j.emptyLeg), len(sub(ends[j.other], V))) * 0.85;
  const a0 = dir(j.empty), a1 = dir(arms[j.other]);
  const sweep = angDiff(arms[j.other], j.empty) > 0 ? 1 : 0;
  el('path', { d: `M${V[0]} ${V[1]} L${V[0] + a0[0] * rr} ${V[1] + a0[1] * rr} A${rr} ${rr} 0 0 ${sweep} ${V[0] + a1[0] * rr} ${V[1] + a1[1] * rr} Z`, class: 'ang-gap' }, layer);
  const mid = dir(j.empty + angDiff(arms[j.other], j.empty) / 2);
  // chữ "hở" ra ngoài khe khi khe hẹp
  const gapW = Math.abs(angDiff(arms[j.other], j.empty)) * rr;
  const at = add(V, mul(mid, rr + (gapW < 1.2 ? 0.75 : 0.45)));
  el('text', { x: at[0], y: at[1], class: 'ang-gap-t' }, over || layer).textContent = 'hở';
}
/** Dấu ở lại trên hình: ∟ xanh (góc vuông) hoặc cung đỏ nét đứt (không vuông). */
function markAt(layer, V, ends, right) {
  const [a, b] = ends.map(P => angOf(V, P));
  if (right) {
    const u = mul(dir(a), 0.5), w = mul(dir(b), 0.5);
    return el('path', { d: `M${V[0] + u[0]} ${V[1] + u[1]} L${V[0] + u[0] + w[0]} ${V[1] + u[1] + w[1]} L${V[0] + w[0]} ${V[1] + w[1]}`, class: 'ang-mk-ok' }, layer);
  }
  const r = 0.6, p = add(V, mul(dir(a), r)), q = add(V, mul(dir(b), r));
  return el('path', { d: `M${p[0]} ${p[1]} A${r} ${r} 0 0 ${angDiff(b, a) > 0 ? 1 : 0} ${q[0]} ${q[1]}`, class: 'ang-mk-bad' }, layer);
}

// ── Trò ──────────────────────────────────────────────────────────────────────────────────────────────
export const ANGLE_GAME = {
  id: 'drill-ang', icon: '📐', title: 'Góc vuông, góc không vuông',
  purpose: 'Giúp em gọi tên đỉnh, cạnh của góc, dùng ê ke kiểm tra góc vuông, góc không vuông, đếm góc vuông trong hình và vẽ góc vuông trên giấy ô vuông.',
  unitWord: 'bài', starPrefix: 'drill', npcs: [TEACHER], levels: ANGLE_LEVELS,
  stallIcon: () => '📐',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> bài.`,
  againText: 'Làm lượt mới',
  howTo: how(['∠', 'Đỉnh, cạnh'], ['📐', 'Đặt ê ke'], ['✅', 'Khít: góc vuông'], ['❌', 'Hở: không vuông']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), keyOf);
  },

  mountMission(stage, m, level, api) {
    ({ name: mountName, eke: mountEkeLv, count: mountCount, draw: mountDraw })[m.kind](stage, m, level, api);
  },
};

// ── 1. Gọi tên góc ───────────────────────────────────────────────────────────────────────────────────
function mountName(stage, m, level, api) {
  const { V, X, Y } = m;
  const slot = (i) => `<span class="ang-slot" data-s="${i}"></span>`;
  const line = `Góc đỉnh ${slot(0)}; cạnh ${slot(1)}${slot(2)}, ${slot(3)}${slot(4)}.`;
  const padHtml = `<div class="ang-pad ang-tiles${m.letters.length === 3 ? ' ang-tiles-3' : ''}" style="--n:${m.letters.length}">${m.letters.map(c => `<button type="button" class="ang-key ang-key-l" data-t="${c}">${c}</button>`).join('')}</div>`;
  const F = frame(stage, api, { head: 'Nêu tên <b>đỉnh</b> và các <b>cạnh</b> của góc được tô màu.', line, padHtml, bb: bbOf(m) });
  const { paper, padzone, say, show, wrong, finish, L } = F;
  // dấu cung của góc cần gọi tên (vẽ dưới các cạnh)
  const Vp = m.pts[V], a = angOf(Vp, m.pts[X]), b = angOf(Vp, m.pts[Y]);
  const [f, s] = angDiff(b, a) > 0 ? [a, b] : [b, a];
  const r = 1.05, p = add(Vp, mul(dir(f), r)), q = add(Vp, mul(dir(s), r));
  L('base').innerHTML = figureSvg(m, '#F8FAFC', `<path class="ang-arc" d="M${Vp[0]} ${Vp[1]} L${p[0]} ${p[1]} A${r} ${r} 0 0 1 ${q[0]} ${q[1]} Z"/>`);
  const slots = [...paper.querySelectorAll('[data-s]')];
  let at = 0, first = null, busy = false;
  setActive(paper, slots[0]);
  say('Nêu tên đỉnh và các cạnh của góc được tô màu. Chạm chữ để viết.', '👆 Chạm chữ: viết tên <b>đỉnh</b>, rồi hai <b>cạnh</b>.');

  /** Cạnh vừa viết sáng lên trên hình: vẽ dần từ đỉnh ra. */
  const glowArm = (E) => {
    const P = m.pts[E];
    const ln = el('line', { x1: Vp[0], y1: Vp[1], x2: P[0], y2: P[1], pathLength: 1, class: 'ang-hi ang-draw', stroke: COL.hl }, L('res'));
    setTimeout(() => ln.classList.remove('ang-draw'), 800); // vẽ xong thì bỏ hoạt ảnh: nét ở lại chắc chắn
    return ln;
  };
  const expect = () => (at === 0 || at === 1 || at === 3 ? V : null);
  async function tap(c, btn) {
    if (busy || at > 4) return;
    sfx.tap();
    const want = expect();
    if (at === 0 && c !== V) {
      wrong(btn, `Đỉnh của góc là điểm hai cạnh gặp nhau, chỗ có dấu cung. Đó là điểm ${V}.`, `Đỉnh là chỗ <b>hai cạnh gặp nhau</b> (có dấu cung).`, 'Góc gồm một đỉnh và hai cạnh đi ra từ đỉnh đó.');
      return;
    }
    if (want && at > 0 && c !== V) {
      wrong(btn, `Cạnh của góc đi ra từ đỉnh ${V}, viết ${V} trước.`, `Cạnh đi ra từ đỉnh: viết <b>${V}</b> trước.`, `Tên cạnh viết tên đỉnh trước, vd. cạnh ${V}${X}.`);
      return;
    }
    if (!want) {
      if (c === first) { wrong(btn, `Cạnh ${sp(V + c)} em viết rồi, viết cạnh còn lại.`, `Cạnh <b>${V}${c}</b> viết rồi, viết <b>cạnh còn lại</b>.`); return; }
      if (c !== X && c !== Y) {
        const isSeg = m.segs.some(([u, w]) => (u === V && w === c) || (w === V && u === c));
        wrong(btn, isSeg ? `${sp(V + c)} không có dấu cung, không phải cạnh của góc này.` : `Không có đoạn thẳng ${sp(V + c)}. Cạnh của góc là hai đoạn thẳng có dấu cung.`,
          isSeg ? `<b>${V}${c}</b> không phải cạnh của góc tô màu.` : `Không có đoạn thẳng <b>${V}${c}</b>.`, 'Hai cạnh của góc là hai đoạn thẳng đi ra từ đỉnh, nằm hai bên dấu cung.');
        return;
      }
    }
    busy = true;
    const el0 = slots[at], i = at;
    setActive(paper, null);
    await sleep(flyText(c, btn, el0, { onLand: () => { el0.textContent = c; el0.classList.add('ang-slot-ok'); sfx.pop(i); } }) + 60);
    at++;
    if (i === 0) {
      paper.querySelector(`[data-lab="${V}"]`)?.classList.add('ang-lab-on');
      show(`Đỉnh <b>${V}</b>. Viết <b>cạnh</b>: đỉnh ${V} trước.`);
    }
    if (i === 2 || i === 4) {
      if (i === 2) first = c;
      glowArm(c);
      paper.querySelector(`[data-lab="${c}"]`)?.classList.add('ang-lab-on');
      if (i === 2) show(`Cạnh <b>${V}${c}</b>. Viết cạnh còn lại.`);
    }
    busy = false;
    if (at <= 4) setActive(paper, slots[at]);
    else {
      const other = first === X ? Y : X;
      say(`Góc đỉnh ${V}; cạnh ${sp(V + first)}, ${sp(V + other)}.`, `Góc đỉnh <b>${V}</b>; cạnh <b>${V}${first}</b>, <b>${V}${other}</b>.`, 'happy');
      paper.querySelector('.ang-lg').classList.add('g3d-ok-flash');
      await sleep(900);
      finish(`Góc đỉnh ${V}; cạnh ${V}${first}, ${V}${other}.`);
    }
  }
  padzone.querySelector('.ang-tiles').addEventListener('click', (e) => { const b = e.target.closest('[data-t]'); if (b) tap(b.dataset.t, b); });
  if (import.meta.env.DEV) {
    const btn = (c) => padzone.querySelector(`[data-t="${c}"]`);
    window.__g3drill = { m, step: () => { const c = at === 2 ? X : at === 4 ? (first === X ? Y : X) : V; tap(c, btn(c)); },
      wrong: () => { const c = m.letters.find(x => x !== V && x !== X && x !== Y) || X; tap(c, btn(c)); } };
  }
}

// ── 2. Kiểm tra bằng ê ke ────────────────────────────────────────────────────────────────────────────
const RIGHT_ICON = `<svg class="ang-ico" viewBox="0 0 40 40" aria-hidden="true"><path d="M8 4 V32 H36" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 22 H18 V32" fill="none" stroke="#10B981" stroke-width="3"/></svg>`;
const NOT_ICON = `<svg class="ang-ico" viewBox="0 0 40 40" aria-hidden="true"><path d="M14 4 L8 32 H36" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.6 20 A12 12 0 0 1 20 32" fill="none" stroke="#DC2626" stroke-width="3" stroke-dasharray="3 3"/></svg>`;
const L2 = { l1: 4.6, l2: 3.6 };

/** Chỗ cất ê ke: bên phải hình, cạnh 1 dựng đứng. */
function parkOf(bb, eke) { return { c: [bb.x1 + 0.6, bb.y1 - 0.3], th: -Math.PI / 2, x1: bb.x1 + 0.6 + eke.l2 + 0.6, y0: bb.y1 - 0.3 - eke.l1 - 0.6 }; }

function mountEkeLv(stage, m, level, api) {
  const { V, X, Y } = m;
  const bb0 = bbOf(m);
  const pk = parkOf(bb0, L2);
  const bb = { ...bb0, x1: pk.x1, y0: Math.min(bb0.y0, pk.y0) };
  const padHtml = `<div class="ang-pad ang-ch">
      <button type="button" class="ang-key ang-key-ch" data-c="1">${RIGHT_ICON}<span>Góc vuông</span></button>
      <button type="button" class="ang-key ang-key-ch" data-c="0">${NOT_ICON}<span>Góc không vuông</span></button></div>`;
  const F = frame(stage, api, {
    head: `Dùng <b>ê ke</b> để kiểm tra: góc đỉnh ${V} là góc vuông hay góc không vuông?`,
    line: `Góc đỉnh ${V}; cạnh ${V}${X}, ${V}${Y} là <span class="ang-slot ang-slot-w" data-ans></span>.`, padHtml, bb,
  });
  const { paper, padzone, say, show, wrong, finish, L } = F;
  L('base').innerHTML = figureSvg(m) + `<circle class="ang-vring" cx="${m.pts[V][0]}" cy="${m.pts[V][1]}" r="0.55"/>`;
  const ring = L('base').querySelector('.ang-vring');
  const eke = makeEke(F, L2);
  eke.set(pk.c, pk.th);
  const Vp = m.pts[V], ends = [m.pts[X], m.pts[Y]], arms = ends.map(P => angOf(Vp, P));
  const ans = paper.querySelector('[data-ans]');
  let placed = null, stepNow = 'place', busy = false;
  say(`Kéo ê ke, đặt góc vuông của ê ke vào đỉnh ${V}.`, `📐 Kéo ê ke: <b>chấm xanh</b> đặt vào đỉnh <b>${V}</b>.`);

  async function snap(next) {
    busy = true;
    const ps = posesOf(...arms);
    let th;
    if (next && placed != null) th = ps.find(t => Math.abs(angDiff(t, placed)) > 0.02) ?? ps[0];
    else th = ps.reduce((a, b) => (Math.abs(angDiff(b, eke.pose.th)) < Math.abs(angDiff(a, eke.pose.th)) ? b : a));
    (L('res').replaceChildren(), L('over').replaceChildren());
    sfx.swish();
    await eke.flyTo(Vp, th);
    placed = th;
    ring.classList.remove('ang-blink');
    busy = false;
    const j = judge(th, arms);
    if (stepNow === 'done') { drawJudge(L('res'), Vp, ends, j, eke); return; }
    drawJudge(L('res'), Vp, ends, j, eke, { quiet: true });
    sfx.pop(2);
    stepNow = 'choose';
    const o = [X, Y][j.other];
    say(`Cạnh ${sp(V + o)} có nằm khít cạnh ê ke không? Chọn góc vuông hay góc không vuông.`, `Cạnh <b>${V}${o}</b> có <b>khít</b> cạnh ê ke không? Chọn.`);
  }
  eke.onGrab = () => { if (stepNow !== 'done') { placed = null; (L('res').replaceChildren(), L('over').replaceChildren()); } };
  eke.onDrop = (c) => {
    if (len(sub(c, Vp)) < 1.6) { snap(false); return; }
    sfx.boing();
    ring.classList.add('ang-blink');
    show(`Đặt <b>chấm xanh</b> ở góc vuông của ê ke vào đỉnh <b>${V}</b>.`);
  };
  eke.onTap = () => {
    if (busy) return;
    if (placed != null) snap(true);
    else { sfx.swish(); eke.flyTo(eke.pose.c, eke.pose.th + Math.PI / 2, true); }
  };

  async function choose(v, btn) {
    if (busy || stepNow === 'done') return;
    if (placed == null) {
      // chưa đặt ê ke: nhắc làm trước, không tính lỗi
      sfx.boing();
      eke.wiggle();
      ring.classList.add('ang-blink');
      say(`Đặt ê ke vào đỉnh ${V} trước đã!`, `📐 Đặt <b>ê ke</b> vào đỉnh <b>${V}</b> trước đã!`);
      return;
    }
    sfx.tap();
    const j = judge(placed, arms);
    drawJudge(L('res'), Vp, ends, j, eke);
    const o = [X, Y][j.other];
    if ((v === '1') !== m.right) {
      wrong(btn, m.right ? `Cạnh ${sp(V + o)} nằm khít cạnh ê ke, không có khe hở. Góc đỉnh ${V} là góc vuông.` : `Còn khe hở giữa cạnh ${sp(V + o)} và cạnh ê ke. Góc đỉnh ${V} là góc không vuông.`,
        m.right ? `Cạnh <b>${V}${o}</b> nằm <b>khít</b> cạnh ê ke.` : `Còn <b>khe hở</b> giữa cạnh <b>${V}${o}</b> và cạnh ê ke.`,
        'Cạnh kia của góc nằm khít cạnh ê ke là góc vuông, còn khe hở là góc không vuông.');
      return;
    }
    stepNow = 'done';
    busy = true;
    btn.classList.add('ang-key-good');
    padzone.querySelectorAll('[data-c]').forEach(b => { b.disabled = true; });
    const txt = m.right ? 'góc vuông' : 'góc không vuông';
    await sleep(flyText(txt, btn.querySelector('span'), ans, { onLand: () => { ans.textContent = txt; ans.classList.add('ang-slot-ok'); sfx.pop(4); } }) + 100);
    if (m.right) markAt(L('marks'), Vp, ends, true);
    say(m.right ? `Khít! Góc đỉnh ${V} là góc vuông.` : `Hở! Góc đỉnh ${V} là góc không vuông.`, m.right ? `✅ Khít: góc đỉnh <b>${V}</b> là <b>góc vuông</b>.` : `❌ Hở: góc đỉnh <b>${V}</b> là <b>góc không vuông</b>.`, 'happy');
    await sleep(900);
    finish(`Góc đỉnh ${V}; cạnh ${V}${X}, ${V}${Y} là ${txt}.`);
  }
  padzone.querySelector('.ang-ch').addEventListener('click', (e) => { const b = e.target.closest('[data-c]'); if (b) choose(b.dataset.c, b); });
  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => { if (placed == null) snap(false); else padzone.querySelector(`[data-c="${m.right ? 1 : 0}"]`).click(); },
      wrong: () => { if (placed == null) snap(false); else padzone.querySelector(`[data-c="${m.right ? 0 : 1}"]`).click(); } };
  }
}

// ── 3. Đếm góc vuông ─────────────────────────────────────────────────────────────────────────────────
const L3 = { l1: 3.4, l2: 2.6 };
function mountCount(stage, m, level, api) {
  const n = m.poly.length;
  const kindName = n === 3 ? 'Hình tam giác' : n === 4 ? 'Hình tứ giác' : 'Hình';
  const bb0 = bbOf(m);
  const pk = parkOf(bb0, L3);
  const bb = { ...bb0, x1: pk.x1, y0: Math.min(bb0.y0, pk.y0) };
  const F = frame(stage, api, {
    head: `Dùng <b>ê ke</b> kiểm tra các góc. ${kindName} ${m.name} có mấy góc vuông?`,
    line: `${kindName} ${m.name} có <span class="ang-slot ang-slot-n" data-ans></span> góc vuông.`, bb, kind: 'count',
  });
  const { paper, say, show, hint, pad, wrong, finish, L } = F;
  L('base').innerHTML = figureSvg(m, '#EFF6FF') + m.poly.map((k, i) => `<circle class="ang-vring" data-vr="${i}" cx="${m.pts[k][0]}" cy="${m.pts[k][1]}" r="0.5"/>`).join('');
  const eke = makeEke(F, L3);
  eke.set(pk.c, pk.th);
  const ans = paper.querySelector('[data-ans]');
  const P = m.poly.map(k => m.pts[k]);
  const endsOf = (i) => [P[(i + n - 1) % n], P[(i + 1) % n]];
  const marks = new Map(); // đỉnh đã kiểm tra → dấu
  let at = -1, placedTh = null, busy = false, stepNow = 'play';
  say(`Dùng ê ke kiểm tra từng góc. ${kindName} ${sp(m.name)} có mấy góc vuông?`, '📐 Đặt ê ke vào <b>từng đỉnh</b>, rồi gõ số góc vuông.');

  async function snap(i, next, fast) {
    busy = true;
    const V = P[i], ends = endsOf(i), arms = ends.map(Q => angOf(V, Q));
    const ps = posesOf(...arms);
    let th;
    if (next && at === i) th = ps.find(t => Math.abs(angDiff(t, placedTh)) > 0.02) ?? ps[0];
    else th = ps.reduce((a, b) => (Math.abs(angDiff(b, eke.pose.th)) < Math.abs(angDiff(a, eke.pose.th)) ? b : a));
    (L('res').replaceChildren(), L('over').replaceChildren());
    sfx.swish();
    await eke.flyTo(V, th, fast);
    at = i; placedTh = th;
    const j = judge(th, arms);
    drawJudge(L('res'), V, ends, j, eke);
    if (!marks.has(i)) marks.set(i, markAt(L('marks'), V, ends, m.right[i]));
    if (j.fit) sfx.ding(); else sfx.pop(1);
    busy = false;
    return j;
  }
  const nearest = (c) => {
    let best = -1, bd = 1.4;
    P.forEach((V, i) => { const d = len(sub(V, c)); if (d < bd) { bd = d; best = i; } });
    return best;
  };
  eke.onGrab = () => { if (stepNow === 'play') { at = -1; (L('res').replaceChildren(), L('over').replaceChildren()); } };
  eke.onMove = (c) => { const i = nearest(c); paper.querySelectorAll('[data-vr]').forEach(r => r.classList.toggle('ang-near', Number(r.dataset.vr) === i)); };
  eke.onDrop = async (c) => {
    paper.querySelectorAll('.ang-near').forEach(r => r.classList.remove('ang-near'));
    if (stepNow !== 'play') return;
    const i = nearest(c);
    if (i < 0) { sfx.boing(); show('Đặt <b>chấm xanh</b> ở góc vuông của ê ke vào một <b>đỉnh</b>.'); return; }
    const j = await snap(i);
    const k = m.poly[i];
    show(j.fit ? `✅ Khít: góc đỉnh <b>${k}</b> là góc vuông.` : `❌ Hở: góc đỉnh <b>${k}</b> là góc không vuông.`);
  };
  eke.onTap = () => {
    if (busy || stepNow !== 'play') return;
    if (at >= 0) snap(at, true);
    else { sfx.swish(); eke.flyTo(eke.pose.c, eke.pose.th + Math.PI / 2, true); }
  };

  const want = {
    max: 1,
    onType: (t) => { ans.textContent = t; },
    onSubmit: (t) => {
      const v = Number(t);
      if (v !== m.count) {
        ans.textContent = '';
        const left = m.poly.filter((_, i) => !marks.has(i));
        const rest = left.length ? ` Em chưa đặt ê ke vào đỉnh ${left.join(', ')}.` : '';
        const restS = left.length ? ` Chưa kiểm tra đỉnh <b>${left.join(', ')}</b>.` : '';
        if (v < m.count) wrong(ans, `Em còn sót góc vuông.${rest}`, `Còn <b>sót</b> góc vuông.${restS}`, 'Đặt ê ke vào từng đỉnh, khít là góc vuông.');
        else wrong(ans, `Có góc nhìn giống góc vuông nhưng đặt ê ke thì hở.${rest}`, `Có góc <b>hở</b> khi đặt ê ke.${restS}`, 'Góc nhìn giống góc vuông vẫn phải đặt ê ke kiểm tra.');
        paper.querySelectorAll('[data-vr]').forEach((r, i) => r.classList.toggle('ang-blink', !marks.has(i)));
        pad.want(want);
        return;
      }
      pad.off();
      setActive(paper, null);
      ans.classList.add('ang-slot-ok');
      sfx.pop(3);
      verify();
    },
  };
  pad.want(want);
  setActive(paper, ans);

  /** Kiểm chứng: ê ke đi qua từng đỉnh, góc vuông được đánh số 1, 2, 3… */
  async function verify() {
    stepNow = 'verify';
    paper.querySelectorAll('.ang-blink').forEach(r => r.classList.remove('ang-blink'));
    say('Cùng kiểm tra lại từng đỉnh!', 'Kiểm tra lại <b>từng đỉnh</b>.');
    let num = 0;
    const c = mul(P.reduce((a, p) => add(a, p), [0, 0]), 1 / n);
    for (let i = 0; i < n; i++) {
      await snap(i, false, true);
      if (m.right[i]) {
        num++;
        const u = sub(c, P[i]);
        const at2 = add(P[i], mul(u, 1.25 / len(u)));
        const g = el('g', { class: 'ang-badge' }, L('marks'));
        el('circle', { cx: at2[0], cy: at2[1], r: 0.42 }, g);
        el('text', { x: at2[0], y: at2[1] }, g).textContent = num;
        sfx.pop(num + 2);
      }
      await sleep(calmMotion() ? 500 : 300);
    }
    (L('res').replaceChildren(), L('over').replaceChildren());
    await eke.flyTo(pk.c, pk.th);
    ans.classList.add('g3d-ok-flash');
    const k = `${kindName} ${m.name} có ${m.count} góc vuông.`;
    say(k, `<b>${kindName} ${m.name}</b> có <b>${m.count}</b> góc vuông.`, 'happy');
    await sleep(700);
    finish(k);
  }
  void hint;
  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => { const i = m.poly.findIndex((_, k) => !marks.has(k)); if (i >= 0 && stepNow === 'play') snap(i); else pad.type(String(m.count)); },
      wrong: () => pad.type(String((m.count + 1) % 10)) };
  }
}

// ── 4. Vẽ góc vuông ──────────────────────────────────────────────────────────────────────────────────
const L4 = { l1: 4, l2: 3 };
function mountDraw(stage, m, level, api) {
  const { O, A } = m;
  const padHtml = `<div class="ang-pad ang-one"><button type="button" class="ang-key ang-key-ch ang-key-chk" data-chk disabled>${EKE_ICON}<span>Kiểm tra bằng ê ke</span></button></div>`;
  const F = frame(stage, api, { head: 'Vẽ <b>góc vuông</b> đỉnh O; cạnh OA, OB.', padHtml, bb: { x0: -0.3, y0: -0.3, x1: GW + 0.3, y1: GH + 0.3 } });
  const { padzone, say, show, wrong, finish, L, svg } = F;
  const labO = sub(O, mul(sub(A, O), 0.8 / len(sub(A, O)))), labA = add(A, mul(sub(A, O), 0.75 / len(sub(A, O))));
  L('base').innerHTML = `<line class="ang-arm" x1="${O[0]}" y1="${O[1]}" x2="${A[0]}" y2="${A[1]}"/>
    <circle class="ang-pt" cx="${O[0]}" cy="${O[1]}" r="0.13"/><circle class="ang-pt" cx="${A[0]}" cy="${A[1]}" r="0.13"/>
    <text class="ang-lab" x="${labO[0]}" y="${labO[1]}">O</text><text class="ang-lab" x="${labA[0]}" y="${labA[1]}">A</text>`;
  const bLayer = el('g', {}, L('base'));
  const eke = makeEke(F, { ...L4, drag: false });
  eke.g.style.opacity = '0';
  const hit = el('rect', { x: -80, y: -80, width: 200, height: 200, fill: 'transparent', class: 'ang-hitrect' }, L('hit'));
  const ghost = el('circle', { r: 0.2, class: 'ang-ghost', visibility: 'hidden' }, L('hit'));
  const chk = padzone.querySelector('[data-chk]');
  let B = null, busy = false, done = false, ekeOut = false;
  say('Vẽ góc vuông đỉnh O; cạnh O A, O B. Chạm một điểm để chọn B.', '👆 Chạm một <b>điểm</b> của lưới để chọn <b>B</b>.');

  const latt = (e) => { const p = F.toSvg(e); const q = [Math.round(p[0]), Math.round(p[1])]; return len(sub(p, q)) < 0.42 ? q : null; };
  function setB(q) {
    B = q;
    bLayer.replaceChildren();
    (L('res').replaceChildren(), L('over').replaceChildren());
    if (!q) { chk.disabled = true; return; }
    const u = sub(q, O), lb = add(q, mul(u, 0.7 / len(u)));
    const ob = el('line', { x1: O[0], y1: O[1], x2: q[0], y2: q[1], pathLength: 1, class: 'ang-arm ang-arm-new ang-draw' }, bLayer);
    setTimeout(() => ob.classList.remove('ang-draw'), 800);
    el('circle', { cx: q[0], cy: q[1], r: 0.15, class: 'ang-pt ang-pt-new' }, bLayer);
    el('text', { x: lb[0], y: lb[1], class: 'ang-lab ang-lab-new' }, bLayer).textContent = 'B';
    chk.disabled = false;
    sfx.pop(3);
    show('Bấm <b>Kiểm tra bằng ê ke</b>. Muốn đổi B thì chạm điểm khác.');
  }
  hit.addEventListener('pointermove', (e) => { const q = latt(e); ghost.setAttribute('visibility', q && !busy ? 'visible' : 'hidden'); if (q) { ghost.setAttribute('cx', q[0]); ghost.setAttribute('cy', q[1]); } });
  hit.addEventListener('pointerleave', () => ghost.setAttribute('visibility', 'hidden'));
  function tapAt(q) {
    if (busy || done || !q) return;
    if ((q[0] === O[0] && q[1] === O[1]) || (q[0] === A[0] && q[1] === A[1])) { sfx.boing(); show('Chọn một điểm <b>khác O và A</b>.'); return; }
    setB(q);
  }
  hit.addEventListener('click', (e) => tapAt(latt(e)));

  async function check() {
    if (busy || done) return;
    if (!B) { sfx.boing(); show('Chạm một <b>điểm</b> để chọn B trước đã.'); return; }
    sfx.tap();
    const aA = angOf(O, A), aB = angOf(O, B);
    const cr = (A[0] - O[0]) * (B[1] - O[1]) - (A[1] - O[1]) * (B[0] - O[0]);
    if (Math.abs(cr) < 1e-9) {
      wrong(chk, 'B nằm trên cùng một đường thẳng với O và A, chưa thành góc. Chọn điểm khác.', 'B thẳng hàng với O, A: <b>chưa thành góc</b>.');
      setB(null);
      return;
    }
    busy = true;
    chk.disabled = true;
    const side = angDiff(aB, aA) > 0 ? 1 : -1;
    const th = side > 0 ? aA : aA - Math.PI / 2;
    // ê ke bay vào từ chỗ trống bên cạnh rồi đặt góc vuông vào đỉnh O, một cạnh trên OA
    if (!ekeOut) { eke.set(add(O, [GW * 0.6, -GH * 0.7]), th + Math.PI / 3); eke.g.style.opacity = '1'; ekeOut = true; }
    say('Đặt ê ke: góc vuông của ê ke trùng đỉnh O, một cạnh ê ke nằm trên cạnh O A.', '📐 Góc vuông ê ke trùng <b>O</b>, một cạnh trên <b>OA</b>.');
    sfx.swish();
    await eke.flyTo(O, th);
    await sleep(calmMotion() ? 500 : 300);
    const j = judge(th, [aA, aB]);
    drawJudge(L('res'), O, [A, B], j, eke);
    if (j.fit) {
      done = true;
      markAt(L('marks'), O, [A, B], true);
      sfx.ding();
      await sleep(600);
      eke.g.style.opacity = '0.3'; // ê ke mờ đi: thấy rõ góc vuông vừa vẽ
      say('Khít! Góc đỉnh O; cạnh O A, O B là góc vuông.', '✅ Khít: góc đỉnh <b>O</b>; cạnh <b>OA, OB</b> là <b>góc vuông</b>.', 'happy');
      await sleep(1100);
      finish('Em đã vẽ góc vuông đỉnh O; cạnh OA, OB.');
      return;
    }
    wrong(chk, 'Cạnh O B không nằm khít cạnh ê ke, còn khe hở. Chọn B nằm trên cạnh ê ke.', 'OB còn <b>khe hở</b> với cạnh ê ke. Chọn B <b>trên cạnh ê ke</b>.', 'Đặt ê ke cho góc vuông của ê ke trùng đỉnh O, kẻ theo hai cạnh góc vuông của ê ke.');
    await sleep(calmMotion() ? 1800 : 1400);
    // OB mờ đi, ê ke ở lại làm thước: em chọn lại B
    bLayer.classList.add('ang-fade');
    await sleep(400);
    B = null;
    bLayer.replaceChildren();
    bLayer.classList.remove('ang-fade');
    (L('res').replaceChildren(), L('over').replaceChildren());
    busy = false;
  }
  chk.addEventListener('click', check);
  void svg;
  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => { const ok = B && m.good.some(g => g[0] === B[0] && g[1] === B[1]); if (!ok) tapAt(m.good[0]); else check(); },
      wrong: () => { if (!B) tapAt(add(m.good[0], [m.u[1] ? 1 : 0, m.u[0] ? 1 : 0])); else check(); } };
  }
}

// ── Kiểu ─────────────────────────────────────────────────────────────────────────────────────────────
let angStyles = false;
function injectAngStyles() {
  if (angStyles) return;
  angStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .ang { flex: 1; min-height: 0; display: grid; gap: 1.2cqh 2cqi; padding: 1.4cqh 2.4cqi 1.6cqh calc(clamp(1.4rem, 4cqi, 3rem) + 1.6cqi);
      grid-template-rows: auto minmax(0, 1fr) minmax(0, 0.2fr); font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .ang-noline { grid-template-rows: auto minmax(0, 1fr); }
    .ang > * { min-width: 0; min-height: 0; }
    .ang-head { font-size: min(5.6cqh, 3.6cqi, 2.4rem); line-height: 1.25; color: #334155; }
    .ang-head b { color: #C2410C; }
    @container (aspect-ratio < 1.15) { .ang-head { font-size: min(4.2cqh, 5.2cqi); } .ang { grid-template-rows: auto minmax(0, 1fr) minmax(0, 0.16fr); } .ang-noline { grid-template-rows: auto minmax(0, 1fr); } }
    .ang-fig { display: flex; border-radius: 0.8rem; overflow: hidden; border: 2px solid #DBEAFE; background: #fff; }
    .ang-svg { flex: 1; width: 100%; height: 100%; display: block; touch-action: none; user-select: none; -webkit-user-select: none; }
    .ang-line { display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .ang-lg { white-space: nowrap; line-height: 1.25; padding: 0 0.2em; border-radius: 0.3em; }
    .ang-slot { display: inline-grid; place-items: center; vertical-align: middle; min-width: 0.95em; height: 1.25em; padding: 0 0.06em; margin: 0 0.03em; border: 0.05em dashed #93C5FD; border-radius: 0.18em;
      color: #1D4ED8; box-sizing: border-box; line-height: 1; }
    .ang-slot-w { min-width: 7.4em; }
    .ang-slot-n { min-width: 1.4em; }
    .ang-slot-ok { border-style: solid; border-color: #86EFAC; background: #F0FDF4; color: #166534; }
    .ang-fly { width: 100%; height: 100%; display: grid; place-items: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #C2410C; line-height: 1; white-space: nowrap; }

    /* Hình */
    .ang-arm { stroke: ${COL.arm}; stroke-width: 0.11; stroke-linecap: round; }
    .ang-pt { fill: ${COL.arm}; }
    .ang-lab { font: 800 0.85px 'Baloo 2', sans-serif; fill: #334155; paint-order: stroke; stroke: #fff; stroke-width: 0.16px; text-anchor: middle; dominant-baseline: central; }
    .ang-k-count .ang-lab { font-size: 0.72px; }
    .ang-lab-on { fill: ${COL.hl}; }
    .ang-arc { fill: ${COL.hlFill}; stroke: ${COL.hl}; stroke-width: 0.08; }
    .ang-hi { stroke-width: 0.2; stroke-linecap: round; opacity: 0.9; }
    .ang-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: angDraw .5s ease-out forwards; }
    @keyframes angDraw { to { stroke-dashoffset: 0; } }
    .ang-arm-new { stroke: #7C3AED; }
    .ang-pt-new { fill: #7C3AED; }
    .ang-lab-new { fill: #7C3AED; }
    .ang-fitsq { fill: rgba(16,185,129,0.35); stroke: ${COL.ok}; stroke-width: 0.07; animation: angBlinkO 1s ease-in-out 2; }
    .ang-gap { fill: rgba(239,68,68,0.28); stroke: ${COL.bad}; stroke-width: 0.05; }
    .ang-l-over { pointer-events: none; }
    .ang-gap-t { font: 800 0.6px 'Baloo 2', sans-serif; fill: ${COL.bad}; paint-order: stroke; stroke: #fff; stroke-width: 0.14px; text-anchor: middle; dominant-baseline: central; }
    .ang-mk-ok { fill: none; stroke: ${COL.ok}; stroke-width: 0.1; stroke-linejoin: round; }
    .ang-mk-bad { fill: none; stroke: ${COL.bad}; stroke-width: 0.08; stroke-dasharray: 0.16 0.12; }
    .ang-badge circle { fill: #DCFCE7; stroke: #16A34A; stroke-width: 0.07; }
    .ang-badge text { font: 800 0.56px 'Baloo 2', sans-serif; fill: #15803D; text-anchor: middle; dominant-baseline: central; }
    .ang-badge { animation: angPop .3s ease-out; transform-box: fill-box; transform-origin: center; }
    @keyframes angPop { from { opacity: 0; transform: scale(0.3); } }
    .ang-vring { fill: none; stroke: transparent; stroke-width: 0.1; }
    .ang-vring.ang-near { stroke: #F59E0B; fill: rgba(250,204,21,0.25); }
    .ang-vring.ang-blink { stroke: #F59E0B; animation: angBlinkO 1s ease-in-out infinite; }
    @keyframes angBlinkO { 50% { opacity: 0.3; } }
    .ang-ghost { fill: rgba(124,58,237,0.35); pointer-events: none; }
    .ang-hitrect { cursor: pointer; }
    .ang-fade { opacity: 0; transition: opacity .35s; }

    /* Ê ke */
    .ang-eke { cursor: grab; }
    .ang-eke:active { cursor: grabbing; }
    .ang-eke-still { pointer-events: none; transition: opacity .3s; }
    .ang-eke-body { fill: rgba(125,211,252,0.55); stroke: #0369A1; stroke-width: 0.06; stroke-linejoin: round; }
    .ang-eke-hole { fill: rgba(255,255,255,0.6); stroke: #0369A1; stroke-width: 0.04; stroke-linejoin: round; }
    .ang-eke-tick { stroke: #075985; stroke-width: 0.03; }
    .ang-eke-corner { fill: none; stroke: #075985; stroke-width: 0.05; }
    .ang-eke-dot { fill: #22C55E; stroke: #fff; stroke-width: 0.05; }
    .ang-wig { animation: angWig .5s ease; }
    @keyframes angWig { 20%, 60% { transform: translate(0.25px, -0.15px); } 40%, 80% { transform: translate(-0.25px, 0.15px); } }

    /* Bảng thao tác (thay bàn phím số, cùng chỗ, cùng cỡ) */
    .ang-pad { height: 100%; box-sizing: border-box; display: grid; gap: min(3cqh, 3cqi); padding: min(3cqh, 3cqi); background: #334155; border-radius: 1.1rem; }
    .g3g-has-result .ang-pad { visibility: hidden; }
    .ang-key { border: none; border-radius: 0.8rem; background: #fff; color: #1E3A8A; font-family: 'Baloo 2', sans-serif; font-weight: 800; line-height: 1; cursor: pointer; padding: 0 0.3em; min-height: 0; min-width: 0;
      touch-action: manipulation; box-shadow: 0 6px 0 #60A5FA; }
    .ang-key:active { transform: translateY(4px); box-shadow: 0 2px 0 #60A5FA; }
    .ang-key:disabled { cursor: default; }
    .ang-tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: minmax(0, 1fr); }
    .ang-tiles-3 { grid-template-columns: minmax(0, 1fr); }
    .ang-key-l { font-size: min(28cqh, 26cqi, 6rem); color: #44403C; background: #FFFBEB; box-shadow: 0 6px 0 #D6A15B; }
    .ang-key-l:active { box-shadow: 0 2px 0 #D6A15B; }
    .ang-ch { grid-template-columns: minmax(0, 1fr); grid-template-rows: repeat(2, minmax(0, 1fr)); }
    .ang-one { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); }
    .ang-key-ch { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.2em; font-size: min(10cqh, 8cqi, 2.8rem); }
    .ang-key-ch svg { height: 1.9em; width: auto; flex: none; }
    .ang-key-ch span { white-space: nowrap; }
    .ang-key-chk { background: #22C55E; color: #fff; box-shadow: 0 6px 0 #15803D; font-size: min(12cqh, 10cqi, 3.2rem); }
    .ang-key-chk span { white-space: normal; text-align: center; }
    .ang-key-chk:active { box-shadow: 0 2px 0 #15803D; }
    .ang-key-chk:disabled { opacity: 0.45; }
    .ang-key-chk svg { height: 2.2em; background: #fff; border-radius: 0.3em; padding: 0.1em; }
    .ang-key-good, .ang-key-good:disabled { background: #DCFCE7; color: #166534; box-shadow: 0 6px 0 #16A34A; }
    .ang-ch .ang-key:disabled:not(.ang-key-good) { opacity: 0.5; }
    @container (aspect-ratio > 1.7) {
      .ang-tiles { grid-template-columns: repeat(var(--n), minmax(0, 1fr)); grid-auto-rows: auto; grid-template-rows: minmax(0, 1fr); }
      .ang-key-l { font-size: min(60cqh, calc(60cqi / var(--n)), 6rem); }
      .ang-ch { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: minmax(0, 1fr); }
      .ang-key-ch { font-size: min(18cqh, 4.2cqi, 3rem); }
      .ang-key-chk { flex-direction: row; gap: 0.5em; font-size: min(24cqh, 5cqi, 3rem); }
    }
    @media (prefers-reduced-motion: reduce) {
      .ang-draw { animation: angFade .6s ease forwards; stroke-dasharray: none; stroke-dashoffset: 0; opacity: 0; }
      @keyframes angFade { to { opacity: 0.9; } }
      .ang-arm-new.ang-draw { animation-name: angFade1; }
      @keyframes angFade1 { to { opacity: 1; } }
      .ang-wig { animation: angBlinkO .5s ease 2; }
      .ang-vring.ang-blink { animation-duration: 2s; }
      .ang-badge { animation: angFade1 .4s ease; opacity: 1; }
    }
  `;
  document.head.appendChild(st);
}
