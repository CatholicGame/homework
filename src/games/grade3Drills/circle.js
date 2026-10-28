/**
 * ⭕ Hình tròn (Toán 3 KNTT Tập 1: Bài 17 "Hình tròn. Tâm, bán kính, đường kính", Bài 20 thực hành vẽ hình tròn).
 * Hình vẽ trên giấy ô vuông 1 cm, mỗi lượt số đo mới:
 *   cấp 1 Gọi tên: chạm vào tâm, một bán kính, đường kính (trên hình hoặc nút to). Nút sai là chỗ hay nhầm:
 *         dây không qua tâm, đoạn từ tâm tới điểm nằm trong / ngoài hình tròn, điểm nằm trong hình tròn.
 *   cấp 2 Tính: đường kính = bán kính × 2, bán kính = đường kính : 2 (chọn phép tính, gõ kết quả), rồi kiểm chứng:
 *         hai bán kính quay vào nằm trên đường kính.
 *   cấp 3 Vẽ bằng com-pa (các bước của sách): mở com-pa trên thước đúng bán kính, đặt đầu nhọn vào tâm, quay một vòng.
 *         Đề cho đường kính thì em tính bán kính trước (chỗ hay nhầm: mở com-pa bằng đường kính).
 *   cấp 4 Trộn: tính đường kính, bán kính, các bán kính bằng nhau (OM = ON), so sánh OK với bán kính.
 * Mọi vùng (hình, các dòng, nút chọn, bàn phím) có chỗ từ đầu lượt, không xô gì.
 */

import { mountDrill, shake, setActive, flyDigit, calmMotion, fresh, sfx, sleep, how, TEACHER, INK } from './kit.js';

const COL = { line: '#1E3A8A', rad: '#16A34A', dia: '#EA580C', ctr: '#DC2626', draw: '#334155', fill: '#F0F9FF' };
// Không dùng K: đoạn "OK" dễ nhầm với phím OK.
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'M', 'N', 'P', 'Q'];

/** Chữ cho giọng đọc. */
const voice = (s) => s.replace(/<[^>]*>/g, '').replace(/\bcm\b/g, 'xăng-ti-mét').replace(/×/g, 'nhân').replace(/:/g, 'chia').replace(/\+/g, 'cộng').replace(/−/g, 'trừ');

// ── Hình học (đơn vị: cm, trục y hướng xuống) ─────────────────────────────────────────────────────────
const D2R = Math.PI / 180;
const at = (a, d, c = [0, 0]) => [c[0] + Math.cos(a * D2R) * d, c[1] + Math.sin(a * D2R) * d];
const r2 = (v) => Math.round(v * 1000) / 1000;
const xy = (p) => `${r2(p[0])},${r2(p[1])}`;

// ── Đề ───────────────────────────────────────────────────────────────────────────────────────────────
function names(rng, n) {
  const o = rng.pick(['O', 'O', 'I']);
  return { o, l: rng.shuffle(LETTERS.filter(x => x !== o)).slice(0, n) };
}

/** Cấp 1: một hình tròn có bán kính, đường kính, một dây không qua tâm và một điểm "bẫy" nằm trong / ngoài. */
function genName(rng) {
  const { o, l } = names(rng, 6);
  return {
    mode: 'name', o, a: l[0], c: l[1], d: l[2], m: l[3], n: l[4], t: l[5],
    th: rng.int(0, 23) * 15, flip: rng() < 0.5 ? -1 : 1, trap: rng() < 0.6 ? 'in' : 'out',
    order: rng.shuffle(['tam', 'bk', 'dk']),
  };
}

/** Cấp 2, 4 (tính): give 'r' (cho bán kính, tính đường kính) hoặc 'd'. */
function genCalc(rng, give, range = [3, 9]) {
  const { o, l } = names(rng, 3);
  const r = rng.int(...range);
  return { mode: 'calc', give, r, o, a: l[0], c: l[1], d: l[2], th: rng.int(-2, 2) * 10 - 90 }; // bán kính gần thẳng đứng: nhãn hai nửa đường kính không đè
}

/** Cấp 4: hai điểm M, N trên đường tròn, OM = r → ON = ? */
function genSame(rng) {
  const { o, l } = names(rng, 2);
  const a1 = rng.int(-170, -110), a2 = a1 + rng.int(110, 200);
  return { mode: 'same', r: rng.int(2, 9), o, m: l[0], n: l[1], a1, a2 };
}

/** Cấp 4: điểm K trong / trên / ngoài hình tròn, so sánh OK với bán kính OM. */
function genCmp(rng) {
  const { o, l } = names(rng, 2);
  const pos = rng.pick(['in', 'in', 'on', 'out', 'out']);
  const a1 = rng.int(-160, -120), a2 = a1 + rng.int(120, 170);
  return { mode: 'cmp', r: rng.int(3, 8), o, m: l[0], k: l[1], pos, a1, a2, f: pos === 'in' ? 0.45 + rng() * 0.2 : pos === 'out' ? 1.35 + rng() * 0.15 : 1 };
}

/** Cấp 3: vẽ hình tròn bằng com-pa. */
function genCompass(rng, give) {
  return { mode: 'compass', give, r: rng.int(2, 6), o: rng.pick(['O', 'O', 'I']) };
}

const LEVEL = (id, n, title, desc, knowledge, lessons, plan, ask, extra = {}) => ({
  id, n, title, desc, knowledge, lessons: { workbook: lessons }, missions: plan.length, ask: () => ask,
  gen: (rng, k) => plan[k % plan.length](rng), ...extra,
});

export const CIRCLE_LEVELS = [
  LEVEL('drill-circle-1', 1, 'Tâm, bán kính, đường kính', 'Chạm vào tâm O, một bán kính OA, đường kính CD của hình tròn.',
    'hình tròn, tâm, bán kính, đường kính', ['bai-17'],
    [genName, genName, genName, genName, genName],
    'Bán kính đi từ tâm tới đường tròn, đường kính đi qua tâm!'),
  LEVEL('drill-circle-2', 2, 'Tính đường kính, bán kính', 'Vd. Bán kính 4 cm thì đường kính 4 × 2 = 8 (cm).',
    'đường kính gấp 2 lần bán kính', ['bai-17'],
    [(r) => genCalc(r, 'r'), (r) => genCalc(r, 'd'), (r) => genCalc(r, 'r'), (r) => genCalc(r, 'd'), (r) => genCalc(r, rng01(r))],
    'Đường kính dài gấp 2 lần bán kính!'),
  LEVEL('drill-circle-3', 3, 'Vẽ hình tròn bằng com-pa', 'Mở com-pa đúng bán kính trên thước, đặt đầu nhọn vào tâm, quay một vòng.',
    'vẽ hình tròn bằng com-pa', ['bai-20'],
    [(r) => genCompass(r, 'r'), (r) => genCompass(r, 'd'), (r) => genCompass(r, 'r'), (r) => genCompass(r, 'd')],
    'Com-pa mở rộng bằng bán kính, đầu nhọn đặt ở tâm!'),
  LEVEL('drill-circle-4', 4, 'Trộn: bán kính bằng nhau', 'OA = 3 cm thì đường kính CD = ? cm; M, N trên đường tròn thì OM = ON.',
    'các bán kính bằng nhau, đường kính, so sánh độ dài với bán kính', ['bai-17', 'bai-20'],
    [(r) => genCalc(r, 'r', [2, 9]), genSame, genCmp, (r) => genCalc(r, 'd', [2, 9]), genCmp],
    'Mọi bán kính của một hình tròn đều bằng nhau!', { direct: true }),
];
function rng01(rng) { return rng() < 0.5 ? 'r' : 'd'; }

// ── Hình vẽ (SVG) ────────────────────────────────────────────────────────────────────────────────────
let uid = 0;
const grid = (id, k) => `<defs><pattern id="g3o-grid-${id}" width="1" height="1" patternUnits="userSpaceOnUse"><path d="M1 0 H0 V1" fill="none" stroke="#BFDBFE" stroke-width="${0.035 * k}"/></pattern></defs>
  <rect x="-80" y="-80" width="160" height="160" fill="url(#g3o-grid-${id})"/>`;
const segEl = (p, q, k, { id = '', color = COL.line, cls = '', w = 0.11 } = {}) =>
  `<line class="g3o-seg ${cls}"${id ? ` data-seg="${id}"` : ''} x1="${r2(p[0])}" y1="${r2(p[1])}" x2="${r2(q[0])}" y2="${r2(q[1])}" stroke="${color}" stroke-width="${w * k}" stroke-linecap="round"/>`;
const hitSeg = (p, q, k, id) => `<line class="g3o-hit" data-pick="${id}" x1="${r2(p[0])}" y1="${r2(p[1])}" x2="${r2(q[0])}" y2="${r2(q[1])}" stroke="transparent" stroke-width="${0.9 * k}" stroke-linecap="round"/>`;
const dotEl = (p, k, { id = '', cls = '' } = {}) => `<circle class="g3o-dot ${cls}"${id ? ` data-dot="${id}"` : ''} cx="${r2(p[0])}" cy="${r2(p[1])}" r="${0.14 * k}" fill="${INK}"/>`;
const nameEl = (p, text, k, dir) => {
  const q = [p[0] + dir[0] * 0.62 * k, p[1] + dir[1] * 0.62 * k];
  return `<text class="g3o-vx" x="${r2(q[0])}" y="${r2(q[1])}" font-size="${0.72 * k}" stroke-width="${0.13 * k}" text-anchor="middle" dominant-baseline="central">${text}</text>`;
};
const outward = (a) => [Math.cos(a * D2R), Math.sin(a * D2R)];
/** Nhãn độ dài cạnh: giữa đoạn, đẩy sang một phía (s = ±1). */
function lenEl(p, q, text, k, s, { id = '', color = COL.line, cls = '' } = {}) {
  let nx = q[1] - p[1], ny = p[0] - q[0];
  const l = Math.hypot(nx, ny) || 1;
  nx = nx / l * s; ny = ny / l * s;
  const off = (0.45 + Math.abs(nx) * text.length * 0.17) * k;
  const x = (p[0] + q[0]) / 2 + nx * off, y = (p[1] + q[1]) / 2 + ny * off;
  return `<text class="g3o-len ${cls}"${id ? ` data-len="${id}"` : ''} x="${r2(x)}" y="${r2(y)}" font-size="${0.66 * k}" stroke-width="${0.14 * k}" fill="${color}" text-anchor="middle" dominant-baseline="central">${text}</text>`;
}
/** Tên tâm: đặt ở khoảng trống lớn nhất giữa các đoạn đi ra từ tâm. */
function centerDir(angles) {
  const a = [...angles].map(x => ((x % 360) + 360) % 360).sort((p, q) => p - q);
  if (!a.length) return [-0.7, 0.7];
  let best = 0, gap = -1;
  a.forEach((x, i) => { const g = (i === a.length - 1 ? a[0] + 360 : a[i + 1]) - x; if (g > gap) { gap = g; best = x + g / 2; } });
  return outward(best);
}
const circleEl = (c, R, k, cls = '') => `<circle class="g3o-circ ${cls}" cx="${r2(c[0])}" cy="${r2(c[1])}" r="${r2(R)}" fill="${COL.fill}" stroke="${COL.line}" stroke-width="${0.11 * k}"/>`;

/** Cấp 1: hình và các đoạn có thể chạm. */
function figName(m, id) {
  const R = 4, k = 1;
  const ang = (a) => m.th + m.flip * a;
  const O = [0, 0], A = at(ang(60), R), C = at(ang(180), R), D = at(ang(0), R), M = at(ang(208), R), N = at(ang(305), R);
  const T = at(ang(122), m.trap === 'in' ? R * 0.52 : R * 1.42);
  const P = { [m.o]: O, [m.a]: A, [m.c]: C, [m.d]: D, [m.m]: M, [m.n]: N, [m.t]: T };
  const segs = [[m.o + m.a, O, A], [m.c + m.d, C, D], [m.m + m.n, M, N], [m.o + m.t, O, T]];
  let s = grid(id, k) + circleEl(O, R, k);
  s += segs.map(([sid, p, q]) => segEl(p, q, k, { id: sid })).join('');
  s += `<circle class="g3o-ring" cx="0" cy="0" r="${0.5 * k}" fill="none" stroke="${COL.ctr}" stroke-width="${0.1 * k}" opacity="0"/>`;
  s += Object.entries(P).map(([n, p]) => dotEl(p, k, { id: n })).join('');
  s += [[m.a, 60], [m.c, 180], [m.d, 0], [m.m, 208], [m.n, 305], [m.t, 122]].map(([n, a]) => nameEl(P[n], n, k, outward(ang(a)))).join('');
  s += nameEl(O, m.o, k, centerDir([0, 60, 122, 180].map(ang)));
  s += segs.map(([sid, p, q]) => hitSeg(p, q, k, sid)).join('');
  s += Object.entries(P).map(([n, p]) => `<circle class="g3o-hit" data-pick="${n}" cx="${r2(p[0])}" cy="${r2(p[1])}" r="${0.55 * k}" fill="transparent"/>`).join('');
  const ex = m.trap === 'out' ? R * 1.42 + 1.1 : R + 1.1;
  return { svg: s, bb: { x0: -ex, y0: -ex, x1: ex, y1: ex }, box: [2 * ex, 2 * ex] };
}

/** Cấp 2, 4 (calc): đường kính CD nằm ngang, bán kính OA chéo lên; hai bản sao bán kính (ẩn) cho bước kiểm chứng. */
function figCalc(m, id) {
  const R = m.r, k = Math.max(R, 3.2) / 4.4;
  const O = [0, 0], A = at(m.th, R), C = [-R, 0], D = [R, 0];
  const giveR = m.give === 'r';
  let s = grid(id, k) + circleEl(O, R, k);
  s += segEl(C, D, k, { id: 'cd', color: giveR ? COL.line : COL.dia, w: giveR ? 0.11 : 0.15 });
  s += segEl(O, A, k, { id: 'oa', color: giveR ? COL.rad : COL.line, w: giveR ? 0.15 : 0.11 });
  s += `<g class="g3o-ghosts">${segEl(O, A, k, { cls: 'g3o-ghost', color: COL.rad, w: 0.2 })}${segEl(O, A, k, { cls: 'g3o-ghost', color: COL.rad, w: 0.2 })}</g>`;
  s += dotEl(O, k) + dotEl(A, k) + dotEl(C, k) + dotEl(D, k);
  s += nameEl(A, m.a, k, outward(m.th)) + nameEl(C, m.c, k, [-1, 0]) + nameEl(D, m.d, k, [1, 0]) + nameEl(O, m.o, k, [0, 1]);
  const d = 2 * R;
  s += lenEl(O, A, giveR ? `${R} cm` : '?', k, 1, { id: 'oa', color: giveR ? COL.rad : '#64748B' });
  // Nhãn đường kính: dưới đường kính, phía trái tâm (bên phải có nhãn bán kính khi quay vào)
  s += `<text class="g3o-len" data-len="cd" x="${r2(-R / 2)}" y="${r2(0.75 * k)}" font-size="${0.66 * k}" stroke-width="${0.14 * k}" fill="${giveR ? '#64748B' : COL.dia}" text-anchor="middle" dominant-baseline="central">${giveR ? '?' : `${d} cm`}</text>`;
  s += `<g class="g3o-halves" opacity="0">${lenEl(C, O, `${R} cm`, k, 1, { color: COL.rad })}${lenEl(O, D, `${R} cm`, k, 1, { color: COL.rad })}</g>`;
  const ex = R + 1.3 * k;
  return { svg: s, bb: { x0: -ex, y0: -ex, x1: ex, y1: ex }, box: [10, 10] };
}

/** Cấp 4: OM, ON (same) hoặc OM, OK (cmp). */
function figTwo(m, id) {
  const R = m.r, k = Math.max(R, 3.2) / 4.4;
  const O = [0, 0], M = at(m.a1, R);
  const second = m.mode === 'same' ? m.n : m.k;
  const X = at(m.a2, m.mode === 'same' ? R : R * m.f);
  let s = grid(id, k) + circleEl(O, R, k);
  s += segEl(O, M, k, { id: 'om', color: COL.rad, w: 0.15 });
  s += segEl(O, X, k, { id: 'ox', color: COL.line });
  s += `<g class="g3o-ghosts">${segEl(O, M, k, { cls: 'g3o-ghost', color: COL.rad, w: 0.2 })}</g>`;
  s += dotEl(O, k) + dotEl(M, k) + dotEl(X, k);
  s += nameEl(M, m.m, k, outward(m.a1)) + nameEl(X, second, k, outward(m.a2)) + nameEl(O, m.o, k, centerDir([m.a1, m.a2]));
  s += lenEl(O, M, `${R} cm`, k, -1, { color: COL.rad });
  s += lenEl(O, X, '?', k, 1, { id: 'ox', color: '#64748B' });
  const ex = Math.max(R, R * (m.f || 1)) + 1.3 * k;
  return { svg: s, bb: { x0: -ex, y0: -ex, x1: ex, y1: ex }, box: [10, 10] };
}

// Com-pa (cấp 3): thước dưới, tâm O ở giữa phía trên.
const RULER_Y = 7.6, RULER_X0 = -6.5; // vạch 0 của thước
const LEG = 7;
function compassSvg(N, P) {
  const w = Math.hypot(P[0] - N[0], P[1] - N[1]) || 0.01;
  const u = [(P[0] - N[0]) / w, (P[1] - N[1]) / w], n = [u[1], -u[0]];
  const h = Math.sqrt(Math.max(1, LEG * LEG - (w / 2) ** 2));
  const H = [(N[0] + P[0]) / 2 + n[0] * h, (N[1] + P[1]) / 2 + n[1] * h];
  const along = (from, to, t) => [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t];
  const N1 = along(H, N, 0.9), P1 = along(H, P, 0.62), P2 = along(H, P, 0.95), T = [H[0] + n[0] * 1.2, H[1] + n[1] * 1.2];
  const ln = (a, b, c, wd) => `<line x1="${r2(a[0])}" y1="${r2(a[1])}" x2="${r2(b[0])}" y2="${r2(b[1])}" stroke="${c}" stroke-width="${wd}" stroke-linecap="round"/>`;
  return `<polygon class="g3o-comp-hit" points="${xy(N)} ${xy(H)} ${xy(P)}" fill="#fff" fill-opacity="0"/>
    ${ln(T, H, INK, 0.5)}${ln(T, H, '#94A3B8', 0.3)}
    ${ln(H, N1, INK, 0.34)}${ln(H, N1, '#CBD5E1', 0.18)}${ln(N1, N, INK, 0.07)}
    ${ln(H, P1, INK, 0.34)}${ln(H, P1, '#CBD5E1', 0.18)}${ln(P1, P2, INK, 0.5)}${ln(P1, P2, '#FACC15', 0.32)}${ln(P2, P, INK, 0.12)}
    <circle cx="${r2(H[0])}" cy="${r2(H[1])}" r="0.36" fill="#64748B" stroke="${INK}" stroke-width="0.08"/>
    <circle cx="${r2(N[0])}" cy="${r2(N[1])}" r="0.09" fill="#DC2626"/>`;
}
function figCompass(m, id) {
  const k = 1;
  let s = grid(id, k);
  s += `<g class="g3o-drawn"></g><path class="g3o-guide" d="" fill="none" stroke="#94A3B8" stroke-width="0.09" stroke-dasharray="0.25 0.25" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>`;
  // Thước 0–10 cm
  const x0 = RULER_X0 - 0.5, W = 11;
  s += `<g class="g3o-ruler"><rect x="${x0}" y="${RULER_Y}" width="${W}" height="1.7" rx="0.18" fill="#FDE68A" stroke="${INK}" stroke-width="0.08"/>`;
  for (let i = 0; i <= 100; i++) {
    const x = RULER_X0 + i / 10, L = i % 10 === 0 ? 0.55 : i % 5 === 0 ? 0.38 : 0.22;
    s += `<line x1="${r2(x)}" y1="${RULER_Y}" x2="${r2(x)}" y2="${r2(RULER_Y + L)}" stroke="${i % 10 ? '#A16207' : INK}" stroke-width="${i % 10 ? 0.025 : 0.05}"/>`;
    if (i % 10 === 0) s += `<text class="g3o-rnum" data-mark="${i / 10}" x="${r2(x)}" y="${RULER_Y + 1.15}" text-anchor="middle" dominant-baseline="central">${i / 10}</text>`;
  }
  s += `<text x="${r2(RULER_X0 + 10.42)}" y="${RULER_Y + 1.3}" font-size="0.34" font-weight="800" fill="#A16207">cm</text></g>`;
  s += `<g class="g3o-dia" opacity="0">${segEl([-m.r, 0], [m.r, 0], k, { color: COL.dia, w: 0.13 })}${segEl([0, 0], [m.r, 0], k, { color: COL.rad, w: 0.15 })}
    ${lenEl([0, 0], [m.r, 0], `${m.r} cm`, k, 1, { color: COL.rad })}${lenEl([-m.r, 0], [m.r, 0], `${2 * m.r} cm`, k, -1, { color: COL.dia, cls: 'g3o-dlab' })}</g>`;
  s += `<circle class="g3o-target" cx="0" cy="0" r="0.6" fill="none" stroke="${COL.ctr}" stroke-width="0.08" opacity="0"/>`;
  s += dotEl([0, 0], k) + nameEl([0, 0], m.o, k, [-0.72, -0.72]);
  s += `<circle class="g3o-hit" data-pick="center" cx="0" cy="0" r="0.8" fill="transparent"/>`;
  s += `<g class="g3o-comp"></g>`;
  return { svg: s, bb: { x0: -7.4, y0: -7.4, x1: 7.4, y1: RULER_Y + 1.9 }, box: [14.8, 16.9] };
}

/** viewBox theo đúng tỉ lệ khung: giấy ô vuông phủ kín, hình ở giữa (như area.js). */
function fitFigure(zone, svg, bb, box) {
  const fit = () => {
    const zw = zone.clientWidth, zh = zone.clientHeight;
    if (!zw || !zh) return;
    const bw = Math.max(box[0], bb.x1 - bb.x0), bh = Math.max(box[1], bb.y1 - bb.y0);
    const r = zw / zh;
    const [W, H] = r > bw / bh ? [bh * r, bh] : [bw, bw / r];
    const cx = (bb.x0 + bb.x1) / 2, cy = (bb.y0 + bb.y1) / 2;
    svg.setAttribute('viewBox', `${cx - W / 2} ${cy - H / 2} ${W} ${H}`);
  };
  fit();
  new ResizeObserver(() => { if (zone.isConnected) fit(); }).observe(zone);
}

/** Cỡ chữ to nhất để khối các dòng vừa khung (đo lại khi khung đổi cỡ, không đổi trong lượt). */
function fitLines(box, inner, cap) {
  const fit = () => {
    const w = box.clientWidth * 0.94, h = box.clientHeight * 0.9;
    if (w <= 0 || h <= 0) return;
    inner.style.fontSize = '100px';
    const fs = Math.min(100 * w / inner.scrollWidth, 100 * h / inner.scrollHeight, cap);
    inner.style.fontSize = `${Math.floor(fs)}px`;
  };
  fit();
  new ResizeObserver(() => { if (box.isConnected) fit(); }).observe(box);
}

/** Quay một đoạn thẳng (thẻ <line> từ tâm) từ góc a0 tới a1, độ dài R; dài ms. */
function swing(line, c, R, a0, a1, ms, onFrame) {
  return new Promise((res) => {
    const t0 = performance.now();
    const frame = () => {
      if (!line.isConnected) { res(); return; }
      const t = Math.min(1, (performance.now() - t0) / ms);
      const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      const a = a0 + (a1 - a0) * e;
      const p = at(a, R, c);
      line.setAttribute('x1', c[0]); line.setAttribute('y1', c[1]);
      line.setAttribute('x2', p[0]); line.setAttribute('y2', p[1]);
      onFrame?.(a, t);
      if (t < 1) setTimeout(frame, 16); else res();
    };
    frame();
  });
}

const boxW = (v) => `${String(v).length * 0.6 + 0.9}em`;

export const CIRCLE_GAME = {
  id: 'drill-circle', icon: '⭕', title: 'Hình tròn',
  purpose: 'Giúp em nhận ra tâm, bán kính, đường kính của hình tròn, biết đường kính gấp 2 lần bán kính, mọi bán kính bằng nhau, và vẽ hình tròn bằng com-pa đúng các bước.',
  unitWord: 'bài', starPrefix: 'drill', npcs: [TEACHER], levels: CIRCLE_LEVELS,
  stallIcon: () => '⭕',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> bài.`,
  againText: 'Làm lượt mới',
  howTo: how(['⭕', 'Nhìn hình tròn'], ['👆', 'Chạm, chọn'], ['⌨️', 'Tính'], ['🧭', 'Vẽ bằng com-pa']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), (m) => `${m.mode}:${m.give || m.pos || ''}:${m.r || ''}:${m.th ?? ''}:${m.a1 ?? ''}:${m.trap || ''}`);
  },

  mountMission(stage, m, level, api) {
    if (m.mode === 'name') return mountName(stage, m, api);
    if (m.mode === 'compass') return mountCompass(stage, m, api);
    return mountCalc(stage, m, level, api);
  },
};

// ── Khung tờ vở chung: đề / hình | (các dòng + nút chọn) ─────────────────────────────────────────────
function mountBoard(stage, api, { head, fig, lines, nBtn = 4, lgCls = '', cls = '' }) {
  const id = ++uid;
  const f = fig(id);
  const board = `
    <div class="g3o${cls ? ` ${cls}` : ''}">
      <div class="g3o-head"><span>${head}</span></div>
      <div class="g3o-fig"><svg class="g3o-svg" viewBox="0 0 10 10" preserveAspectRatio="xMidYMid meet">${f.svg}</svg></div>
      <div class="g3o-side${nBtn ? '' : ' g3o-nobtn'}">
        <div class="g3o-lines"><div class="g3o-lg${lgCls ? ` ${lgCls}` : ''}">${lines}</div></div>
        <div class="g3o-choices" style="--nb:${nBtn}">${Array.from({ length: nBtn }, (_, i) => `<button type="button" class="g3g-btn g3d-choice g3o-btn g3o-btn-void" data-o="${i}" disabled>&nbsp;</button>`).join('')}</div>
      </div>
    </div>`;
  const kit = mountDrill(stage, { api, board, cls: 'g3o-scene' });
  injectCircleStyles();
  const { paper } = kit;
  const svg = paper.querySelector('.g3o-svg');
  fitFigure(paper.querySelector('.g3o-fig'), svg, f.bb, f.box);
  fitLines(paper.querySelector('.g3o-lines'), paper.querySelector('.g3o-lg'), 80);
  const chZone = paper.querySelector('.g3o-choices');
  let btns = [...chZone.querySelectorAll('.g3o-btn')];
  /** Đặt chữ cho các nút (nút mới tinh mỗi bước: không sót màu của bước trước). list[i] = null: chỗ trống giữ nguyên cỡ. */
  const setButtons = (list, onPick) => {
    btns = btns.map((old, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `g3g-btn g3d-choice g3o-btn${list[i] == null ? ' g3o-btn-void' : String(list[i]).length <= 2 ? ' g3o-sym' : ''}`;
      b.dataset.o = i;
      b.disabled = list[i] == null;
      b.innerHTML = list[i] ?? '&nbsp;';
      b.onclick = () => { if (!b.disabled) { sfx.tap(); onPick(i, b); } };
      old.replaceWith(b);
      return b;
    });
    chZone.style.setProperty('--n', Math.max(3, ...list.filter(t => t && String(t).length > 2).map(t => String(t).replace(/<[^>]*>/g, '').length)));
  };
  const lockButtons = (keep) => btns.forEach(x => { x.disabled = true; if (x !== keep) x.classList.add('g3o-btn-off'); });
  return { ...kit, svg, btns: () => btns, setButtons, lockButtons };
}

// ── Cấp 1: Gọi tên ───────────────────────────────────────────────────────────────────────────────────
function mountName(stage, m, api) {
  const oa = m.o + m.a, cd = m.c + m.d, mn = m.m + m.n, ot = m.o + m.t;
  const T = { tam: 'Tâm', bk: 'Bán kính', dk: 'Đường kính' };
  const lines = m.order.map((k) => `<div class="g3o-ln" data-ask="${k}"><span class="g3o-lab">${T[k]}:</span><span class="g3d-box" style="--boxw:2.2em" data-b="${k}"></span></div>`).join('');
  const B = mountBoard(stage, api, { head: `Hình tròn tâm ${m.o}.`, fig: (id) => figName(m, id), lines, lgCls: 'g3o-lg-name' });
  const { paper, svg, say, hint, done } = B;
  const inTrap = m.trap === 'in';
  const ASK = {
    tam: { q: 'Chạm vào tâm của hình tròn.', shown: '👆 Chạm vào <b>tâm</b>.', ok: m.o, opts: [m.o, m.t, m.a, m.m],
      why: { [m.t]: inTrap ? `${m.t} nằm trong hình tròn nhưng không ở chính giữa. Tâm ${m.o} ở chính giữa, cách đều mọi điểm trên đường tròn.` : `${m.t} nằm ngoài hình tròn. Tâm là điểm ở chính giữa hình tròn.`,
        [m.a]: `${m.a} nằm trên đường tròn. Tâm là điểm ở chính giữa hình tròn.`, [m.m]: `${m.m} nằm trên đường tròn. Tâm là điểm ở chính giữa hình tròn.` } },
    bk: { q: 'Chạm vào một bán kính.', shown: '👆 Chạm vào <b>một bán kính</b>.', ok: oa, opts: [oa, cd, mn, ot],
      why: { [cd]: `${cd} đi qua tâm, nối hai điểm trên đường tròn: ${cd} là đường kính. Bán kính nối tâm với một điểm trên đường tròn.`,
        [mn]: `${mn} không đi qua tâm ${m.o}. Bán kính nối tâm ${m.o} với một điểm trên đường tròn.`,
        [ot]: `${m.t} không nằm trên đường tròn nên ${ot} không phải bán kính. ${ot} ${inTrap ? 'ngắn hơn' : 'dài hơn'} bán kính.` } },
    dk: { q: 'Chạm vào đường kính.', shown: '👆 Chạm vào <b>đường kính</b>.', ok: cd, opts: [cd, mn, oa, ot],
      why: { [mn]: `${mn} không đi qua tâm ${m.o} nên không phải đường kính. Đường kính đi qua tâm, nối hai điểm trên đường tròn.`,
        [oa]: `${oa} là bán kính. Đường kính đi qua tâm, nối hai điểm trên đường tròn.`,
        [ot]: `${ot} không nối hai điểm trên đường tròn nên không phải đường kính.` } },
  };
  // Thứ tự nút cố định theo chữ cái, không lộ đáp án
  Object.values(ASK).forEach(a => { a.opts.sort(); });
  let mistakes = 0, tip = '', qi = 0, busy = true;

  const rule = 'Bán kính nối tâm với một điểm trên đường tròn. Đường kính đi qua tâm, nối hai điểm trên đường tròn.';
  const pick = async (val, el) => {
    if (busy) return;
    const a = ASK[m.order[qi]];
    if (!a.opts.includes(val)) return;
    if (val !== a.ok) {
      mistakes++;
      tip ||= rule;
      const bi = a.opts.indexOf(val);
      shake([B.btns()[bi], el].filter(Boolean));
      flashFig(val, '#DC2626');
      hint(a.why[val], a.why[val]);
      return;
    }
    busy = true;
    const k = m.order[qi];
    const b = B.btns()[a.opts.indexOf(val)];
    b.classList.add('g3d-choice-ok');
    B.lockButtons(b);
    setActive(paper, null);
    markFig(k);
    const box = paper.querySelector(`[data-b="${k}"]`);
    await sleep(flyDigit(val, b, box, { onLand: () => { box.textContent = val; box.classList.add('g3d-box-ok'); sfx.pop(3 + qi); } }) + 250);
    qi++;
    if (qi < m.order.length) ask();
    else {
      await sleep(300);
      done(mistakes, { ok: `Tâm ${m.o}, bán kính ${oa}, đường kính ${cd}.`, tip: tip ? `Nhớ: ${tip}` : '' });
    }
  };
  /** Tô đoạn / điểm vừa chọn đúng: tâm đỏ, bán kính xanh lá, đường kính cam. */
  function markFig(k) {
    if (k === 'tam') {
      const ring = svg.querySelector('.g3o-ring');
      ring.setAttribute('opacity', '1');
      ring.classList.add('g3o-pulse');
      svg.querySelector(`[data-dot="${m.o}"]`).setAttribute('fill', COL.ctr);
    } else {
      const s = svg.querySelector(`[data-seg="${k === 'bk' ? oa : cd}"]`);
      s.setAttribute('stroke', k === 'bk' ? COL.rad : COL.dia);
      s.setAttribute('stroke-width', '0.2');
      s.classList.add('g3o-glow');
    }
  }
  function flashFig(val, color) {
    const el = svg.querySelector(`[data-seg="${val}"]`) || svg.querySelector(`[data-dot="${val}"]`);
    if (!el) return;
    const attr = el.tagName === 'line' ? 'stroke' : 'fill';
    const old = el.getAttribute(attr);
    el.setAttribute(attr, color);
    setTimeout(() => { if (el.getAttribute(attr) === color) el.setAttribute(attr, old); }, 900);
  }
  function ask() {
    const k = m.order[qi];
    const a = ASK[k];
    B.setButtons(a.opts, (i, b) => pick(a.opts[i], b));
    setActive(paper, paper.querySelector(`[data-b="${k}"]`));
    say(a.q, a.shown);
    busy = false;
  }
  svg.addEventListener('click', (e) => {
    const h = e.target.closest('[data-pick]');
    if (h) pick(h.dataset.pick, null);
  });
  ask();

  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => { const a = ASK[m.order[qi]]; if (!busy) B.btns()[a.opts.indexOf(a.ok)]?.click(); },
      wrong: () => { const a = ASK[m.order[qi]]; if (!busy) B.btns()[a.opts.findIndex(x => x !== a.ok)]?.click(); } };
  }
}

// ── Cấp 2, 4: Tính đường kính, bán kính; bán kính bằng nhau; so sánh ─────────────────────────────────
function mountCalc(stage, m, level, api) {
  const direct = !!level.direct;
  const R = m.r, Dm = 2 * R;
  let head, label, target, answer, opts = [], rule, short, cmpOpts = null;
  if (m.mode === 'calc') {
    const cd = m.c + m.d, oa = m.o + m.a;
    if (m.give === 'r') {
      head = `Hình tròn tâm ${m.o} có bán kính ${oa} = <b class="g3o-kr">${R} cm</b>. Tính đường kính ${cd}.`;
      label = `Đường kính ${cd} là:`; target = cd; answer = Dm;
      rule = 'Đường kính dài gấp 2 lần bán kính: lấy bán kính nhân với 2.'; short = 'Đường kính = bán kính × 2';
      opts = [[`${R} × 2`, true], [`${R} + 2`, false, 'Đường kính gấp 2 lần bán kính, không phải thêm 2. '], [`${R} : 2`, false, 'Đường kính dài hơn bán kính. ']];
    } else {
      head = `Hình tròn tâm ${m.o} có đường kính ${cd} = <b class="g3o-kd">${Dm} cm</b>. Tính bán kính ${oa}.`;
      label = `Bán kính ${oa} là:`; target = oa; answer = R;
      rule = 'Bán kính dài bằng một nửa đường kính: lấy đường kính chia cho 2.'; short = 'Bán kính = đường kính : 2';
      opts = [[`${Dm} : 2`, true], [`${Dm} × 2`, false, 'Bán kính ngắn hơn đường kính. '], [`${Dm} − 2`, false, 'Bán kính bằng một nửa đường kính, không phải bớt 2. ']];
    }
  } else if (m.mode === 'same') {
    const om = m.o + m.m, on = m.o + m.n;
    head = `${m.m} và ${m.n} nằm trên đường tròn tâm ${m.o}. ${om} = <b class="g3o-kr">${R} cm</b>. ${on} = ? cm`;
    target = on; answer = R;
    rule = 'Mọi bán kính của một hình tròn đều bằng nhau.';
  } else {
    const om = m.o + m.m, ok = m.o + m.k;
    const where = m.pos === 'in' ? 'nằm trong hình tròn' : m.pos === 'out' ? 'nằm ngoài hình tròn' : 'nằm trên đường tròn';
    head = `${m.m} nằm trên đường tròn tâm ${m.o}, ${om} = <b class="g3o-kr">${R} cm</b>. Điểm ${m.k} ${where}. So sánh ${ok} với ${R} cm.`;
    target = ok;
    cmpOpts = [[`${ok} < ${R} cm`, 'in'], [`${ok} = ${R} cm`, 'on'], [`${ok} > ${R} cm`, 'out']];
    rule = 'Điểm nằm trong hình tròn thì cách tâm ít hơn bán kính, điểm nằm ngoài thì cách tâm nhiều hơn bán kính, điểm trên đường tròn thì cách tâm đúng bằng bán kính.';
  }
  const unitBox = (v) => `<span class="g3d-box" style="--boxw:${boxW(v)}" data-b="0"></span>`;
  let lines;
  if (cmpOpts) lines = `<div class="g3o-ln"><span class="g3o-slot" style="min-width:${cmpOpts[0][0].length * 0.5 + 0.6}em" data-slot>…</span></div>`;
  else if (direct) lines = `<div class="g3o-ln">${target} = ${unitBox(answer)} cm</div>`;
  else lines = `<div class="g3o-ln g3o-lab">${label}</div>
    <div class="g3o-ln"><span class="g3o-slot" style="min-width:${Math.max(...opts.map(o => o[0].length)) * 0.52 + 0.7}em" data-slot>…</span> = ${unitBox(answer)} (cm)</div>`;
  const fig = m.mode === 'calc' ? (id) => figCalc(m, id) : (id) => figTwo(m, id);
  const nBtn = cmpOpts || !direct ? 3 : 0;
  const B = mountBoard(stage, api, { head, fig, lines, nBtn });
  const { paper, svg, say, hint, pad, done } = B;
  const slot = paper.querySelector('[data-slot]');
  const box = paper.querySelector('[data-b="0"]');
  let mistakes = 0, tip = '', stepNow = 'busy';
  const wrong = (el, text, shown) => { mistakes++; tip ||= rule; shake(el); hint(voice(text), shown || text); };
  const sortedOps = [...opts].sort((x, y) => (x[0] < y[0] ? -1 : 1));

  function stepOp() {
    stepNow = 'op';
    B.setButtons(sortedOps.map(o => o[0]), pickOp);
    setActive(paper, slot);
    say(`${voice(head)} Chọn phép tính.`, '👆 Chọn <b>phép tính</b>.');
  }
  async function pickOp(i, b) {
    if (stepNow !== 'op') return;
    const [text, ok, why] = sortedOps[i];
    if (!ok) { wrong(b, `${why}${rule}`, `${why}<b>${short}</b>`); return; }
    stepNow = 'busy';
    b.classList.add('g3d-choice-ok');
    B.lockButtons(b);
    setActive(paper, null);
    await sleep(flyDigit(text, b, slot, { onLand: () => { slot.textContent = text; slot.classList.add('g3o-slot-done'); sfx.pop(2); } }) + 120);
    stepNum();
  }
  function stepNum() {
    stepNow = 'num';
    setActive(paper, box);
    if (direct) say(`${voice(head)}`, `Gõ <b>${target}</b>.`);
    else say(`Tính ${voice(slot.textContent)}.`, `Tính <b>${slot.textContent}</b>.`);
    const want = {
      max: String(answer).length + 1,
      onType: (t) => { box.textContent = t; },
      onSubmit: (t) => {
        if (Number(t) !== answer) {
          box.textContent = '';
          let msg;
          if (m.mode === 'same') msg = `${m.n} cũng nằm trên đường tròn nên ${target} cũng là bán kính, dài bằng ${m.o}${m.m}.`;
          else if (direct) msg = m.give === 'r' ? `Đường kính gấp 2 lần bán kính: ${R} × 2.` : `Bán kính bằng một nửa đường kính: ${Dm} : 2.`;
          else msg = `${slot.textContent} = ${answer}.`;
          wrong(box, msg);
          pad.want(want);
          return;
        }
        pad.off();
        setActive(paper, null);
        box.classList.add('g3d-box-ok');
        sfx.pop(3);
        stepNow = 'busy';
        setTimeout(check, 400);
      },
    };
    pad.want(want);
  }
  function stepCmp() {
    stepNow = 'cmp';
    B.setButtons(cmpOpts.map(o => o[0]), pickCmp);
    setActive(paper, slot);
    say(`${voice(head)}`, `👆 So sánh <b>${target}</b> với <b>${R} cm</b>.`);
  }
  async function pickCmp(i, b) {
    if (stepNow !== 'cmp') return;
    const [text, pos] = cmpOpts[i];
    if (pos !== m.pos) {
      const why = m.pos === 'in' ? `${m.k} nằm trong hình tròn nên ${target} ngắn hơn bán kính.` : m.pos === 'out' ? `${m.k} nằm ngoài hình tròn nên ${target} dài hơn bán kính.` : `${m.k} nằm trên đường tròn nên ${target} là bán kính, dài bằng ${m.o}${m.m}.`;
      wrong(b, why);
      return;
    }
    stepNow = 'busy';
    b.classList.add('g3d-choice-ok');
    B.lockButtons(b);
    setActive(paper, null);
    await sleep(flyDigit(text, b, slot, { onLand: () => { slot.textContent = text; slot.classList.add('g3o-slot-done'); sfx.pop(2); } }) + 150);
    check();
  }

  // Kiểm chứng trên hình: bán kính quay tới chỗ đoạn cần tìm.
  async function check() {
    stepNow = 'busy';
    const calm = calmMotion();
    const ms = calm ? 1500 : 950;
    const ghosts = [...svg.querySelectorAll('.g3o-ghost')];
    const O = [0, 0];
    if (m.mode === 'calc' && m.give === 'r') {
      say('Hai bán kính nằm vừa khít trên đường kính!', `Hai bán kính: <b>${R} + ${R} = ${Dm}</b>`);
      ghosts.forEach(g => g.classList.add('g3o-ghost-on'));
      await swing(ghosts[0], O, R, m.th, -180, ms);
      sfx.pop(2);
      await swing(ghosts[1], O, R, m.th, 0, ms);
      sfx.pop(4);
      svg.querySelector('.g3o-halves').setAttribute('opacity', '1');
      const lab = svg.querySelector('[data-len="cd"]');
      lab.textContent = `${Dm} cm`; lab.setAttribute('fill', COL.dia);
      svg.querySelector('[data-seg="cd"]').setAttribute('stroke', COL.dia);
    } else if (m.mode === 'calc') {
      say('Đường kính gồm hai bán kính bằng nhau!', `Một nửa đường kính: <b>${Dm} : 2 = ${R}</b>`);
      svg.querySelector('.g3o-halves').setAttribute('opacity', '1');
      ghosts[0].classList.add('g3o-ghost-on');
      await swing(ghosts[0], O, R, 0, 0, 300);
      await sleep(calm ? 500 : 300);
      await swing(ghosts[0], O, R, 0, m.th, ms);
      sfx.pop(4);
      const lab = svg.querySelector('[data-len="oa"]');
      lab.textContent = `${R} cm`; lab.setAttribute('fill', COL.rad);
      svg.querySelector('[data-seg="oa"]').setAttribute('stroke', COL.rad);
    } else {
      const ok = m.mode === 'same' || m.pos === 'on';
      say(ok ? 'Bán kính quay tới, vừa khít!' : m.pos === 'in' ? `Bán kính dài hơn ${target}!` : `Bán kính ngắn hơn ${target}!`,
        ok ? `${target} = <b>${R} cm</b>` : `${target} ${m.pos === 'in' ? '<' : '>'} <b>${R} cm</b>`);
      ghosts[0].classList.add('g3o-ghost-on');
      await swing(ghosts[0], O, R, m.a1, m.a2, ms);
      sfx.pop(4);
      const lab = svg.querySelector('[data-len="ox"]');
      if (ok) { lab.textContent = `${R} cm`; lab.setAttribute('fill', COL.rad); svg.querySelector('[data-seg="ox"]').setAttribute('stroke', COL.rad); }
      else { lab.textContent = m.pos === 'in' ? `< ${R} cm` : `> ${R} cm`; lab.setAttribute('fill', COL.dia); }
    }
    sfx.ding();
    await sleep(calm ? 700 : 450);
    const tgt = cmpOpts ? slot : box;
    tgt.classList.add('g3d-ok-flash', 'g3o-final');
    await sleep(500);
    const what = cmpOpts ? `${cmpOpts.find(o => o[1] === m.pos)[0]}.` : `${target} = ${answer} cm.`;
    done(mistakes, { ok: what, tip: tip ? `Nhớ: ${tip}` : '' });
  }

  if (cmpOpts) stepCmp();
  else if (direct) stepNum();
  else stepOp();

  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => {
      if (stepNow === 'op') B.btns()[sortedOps.findIndex(o => o[1])]?.click();
      else if (stepNow === 'num') pad.type(String(answer));
      else if (stepNow === 'cmp') B.btns()[cmpOpts.findIndex(o => o[1] === m.pos)]?.click();
    }, wrong: () => {
      if (stepNow === 'op') B.btns()[sortedOps.findIndex(o => !o[1])]?.click();
      else if (stepNow === 'num') pad.type(String(answer + 1));
      else if (stepNow === 'cmp') B.btns()[cmpOpts.findIndex(o => o[1] !== m.pos)]?.click();
    } };
  }
}

// ── Cấp 3: Vẽ bằng com-pa ────────────────────────────────────────────────────────────────────────────
function mountCompass(stage, m, api) {
  const R = m.r, Dm = 2 * R, giveR = m.give === 'r';
  const head = `Vẽ hình tròn tâm ${m.o}, ${giveR ? `bán kính <b class="g3o-kr">${R} cm</b>` : `đường kính <b class="g3o-kd">${Dm} cm</b>`}.`;
  const lines = `<div class="g3o-ln"><span class="g3o-lab">Bán kính:</span><span class="g3d-box" style="--boxw:${boxW(R)}" data-b="r">${giveR ? R : ''}</span> cm</div>
    <div class="g3o-ln"><span class="g3o-lab">Đường kính:</span><span class="g3d-box" style="--boxw:${boxW(Dm)}" data-b="d">${giveR ? '' : Dm}</span> cm</div>`;
  const B = mountBoard(stage, api, { head, fig: (id) => figCompass(m, id), lines, nBtn: 3, cls: 'g3o-compact' });
  const { paper, svg, say, show, hint, pad, done } = B;
  const comp = svg.querySelector('.g3o-comp');
  const boxR = paper.querySelector('[data-b="r"]'), boxD = paper.querySelector('[data-b="d"]');
  (giveR ? boxR : boxD).classList.add('g3o-given');
  let N = [RULER_X0, RULER_Y], open = 1, ang = 0; // đầu nhọn, độ mở (cm), góc của đầu bút chì quanh đầu nhọn
  const Pof = () => at(ang, open, N);
  const render = () => { comp.innerHTML = compassSvg(N, Pof()); };
  render();
  let mistakes = 0, tip = '', stepNow = 'busy';
  const rule = 'Vẽ hình tròn: mở com-pa rộng bằng bán kính, đặt đầu nhọn vào tâm, giữ chặt rồi quay một vòng.';
  const wrong = (el, text, shown) => { mistakes++; tip ||= rule; if (el) shake(el); hint(voice(text), shown || text); };
  const toSvg = (e) => {
    const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
    const q = p.matrixTransform(svg.getScreenCTM().inverse());
    return [q.x, q.y];
  };
  const markOn = (v) => svg.querySelectorAll('.g3o-rnum').forEach(t => t.classList.toggle('g3o-rnum-on', +t.dataset.mark === v));

  // 0. (đề cho đường kính) Tính bán kính trước.
  function stepRadius() {
    stepNow = 'rnum';
    setActive(paper, boxR);
    say(`Đề cho đường kính ${Dm} xăng-ti-mét. Bán kính bằng mấy xăng-ti-mét?`, `Bán kính = <b>${Dm} : 2</b> = ?`);
    const want = {
      max: 2, onType: (t) => { boxR.textContent = t; },
      onSubmit: (t) => {
        if (Number(t) !== R) {
          boxR.textContent = '';
          wrong(boxR, `Bán kính bằng một nửa đường kính: ${Dm} : 2.`, `Bán kính bằng một nửa đường kính: <b>${Dm} : 2</b>.`);
          pad.want(want);
          return;
        }
        pad.off(); setActive(paper, null); boxR.classList.add('g3d-box-ok'); sfx.pop(3);
        stepNow = 'busy';
        setTimeout(stepOpen, 400);
      },
    };
    pad.want(want);
  }

  // 1. Mở com-pa trên thước: kéo đầu bút chì hoặc bấm − +, rồi "Mở xong".
  function setOpen(v) {
    v = Math.max(1, Math.min(9, v));
    if (v === open) return;
    open = v; render(); markOn(v); sfx.tick();
  }
  function stepOpen() {
    stepNow = 'open';
    markOn(open);
    B.setButtons(['−', '+', '✓ Xong'], (i, b) => {
      if (stepNow !== 'open') return;
      if (i === 0) setOpen(open - 1);
      else if (i === 1) setOpen(open + 1);
      else confirmOpen(b);
    });
    say(`Mở com-pa rộng ${R} xăng-ti-mét trên thước.`, `📏 Mở com-pa rộng <b>${R} cm</b>: kéo đầu bút chì tới vạch ${R}.`);
  }
  function confirmOpen(b) {
    if (open !== R) {
      if (!giveR && open === Dm) wrong(b, `Com-pa mở rộng bằng bán kính, không phải đường kính. Bán kính là ${R} xăng-ti-mét.`, `Com-pa mở rộng bằng <b>bán kính</b>: ${Dm} : 2 = <b>${R} cm</b>.`);
      else wrong(b, `Đầu nhọn ở vạch 0, đầu bút chì phải ở vạch ${R} của thước.`, `Đầu nhọn ở vạch 0, đầu bút chì ở vạch <b>${R}</b>.`);
      return;
    }
    b.classList.add('g3d-choice-ok');
    B.lockButtons(b);
    sfx.pop(3);
    stepPlace();
  }

  // 2. Đặt đầu nhọn vào tâm: kéo cả com-pa (hoặc chạm vào điểm O: com-pa bay tới).
  function stepPlace() {
    stepNow = 'place';
    svg.querySelector('.g3o-target').setAttribute('opacity', '1');
    svg.querySelector('.g3o-target').classList.add('g3o-pulse');
    say(`Đặt đầu nhọn com-pa vào điểm ${m.o}.`, `📍 Kéo com-pa: <b>đầu nhọn</b> đặt vào điểm <b>${m.o}</b>.`);
  }
  const moveTo = (to, ms) => new Promise((res) => {
    const from = [...N], t0 = performance.now();
    const frame = () => {
      if (!svg.isConnected) { res(); return; }
      const t = Math.min(1, (performance.now() - t0) / ms), e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      N = [from[0] + (to[0] - from[0]) * e, from[1] + (to[1] - from[1]) * e - Math.sin(Math.PI * t) * 0.8];
      render();
      if (t < 1) setTimeout(frame, 16); else res();
    };
    frame();
  });
  async function placed() {
    stepNow = 'busy';
    await moveTo([0, 0], calmMotion() ? 700 : 450);
    N = [0, 0]; render();
    const tg = svg.querySelector('.g3o-target');
    tg.classList.remove('g3o-pulse'); tg.setAttribute('opacity', '0');
    sfx.pop(4);
    await sleep(250);
    stepSpin();
  }

  // 3. Quay một vòng: kéo đầu bút chì quanh tâm, nét chì hiện theo.
  let sweep = 0, start = 0, spinning = false, last = 0;
  const drawn = svg.querySelector('.g3o-drawn');
  const guide = svg.querySelector('.g3o-guide');
  const arcPath = (a0, sw, r) => {
    const a1 = a0 + sw, p0 = at(a0, r), p1 = at(a1, r);
    return `M${xy(p0)} A${r} ${r} 0 ${Math.abs(sw) > 180 ? 1 : 0} ${sw > 0 ? 1 : 0} ${xy(p1)}`;
  };
  const drawArc = () => {
    drawn.innerHTML = Math.abs(sweep) >= 359
      ? `<circle cx="0" cy="0" r="${R}" fill="none" stroke="${COL.draw}" stroke-width="0.12"/>`
      : `<path d="${arcPath(start, sweep, R)}" fill="none" stroke="${COL.draw}" stroke-width="0.12" stroke-linecap="round"/>`;
  };
  function stepSpin() {
    stepNow = 'spin';
    start = ang; sweep = 0;
    // Mũi tên mờ chỉ chiều quay (vòng ngoài, không phải hình tròn em sẽ vẽ)
    const gr = R + 1.1, tipA = start + 135, tip = at(tipA, gr);
    const back = (da, dr) => xy(at(tipA - da, gr + dr));
    guide.setAttribute('d', `${arcPath(start + 15, 120, gr)} M${back(14, 0.4)} L${xy(tip)} L${back(14, -0.4)}`);
    guide.setAttribute('opacity', '1');
    guide.classList.add('g3o-blink');
    say('Giữ đầu nhọn ở tâm, quay com-pa một vòng.', '🔄 Giữ đầu nhọn ở <b>tâm</b>, kéo bút chì <b>quay một vòng</b>.');
  }
  const spinTo = (a) => {
    let d = a - last;
    while (d > 180) d -= 360;
    while (d < -180) d += 360;
    last = a;
    if (Math.abs(d) > 50) return; // nhảy cóc: bỏ qua
    if (sweep !== 0 && Math.sign(d) !== Math.sign(sweep) && Math.abs(d) > 0) return; // quay ngược: không xoá nét đã vẽ
    sweep += d;
    ang = start + sweep;
    render();
    drawArc();
    if (Math.floor(Math.abs(sweep) / 30) !== Math.floor(Math.abs(sweep - d) / 30)) sfx.tick();
    if (Math.abs(sweep) >= 359) finishSpin();
  };
  async function finishSpin() {
    stepNow = 'busy';
    spinning = false;
    sweep = 360 * Math.sign(sweep || 1);
    drawArc();
    guide.classList.remove('g3o-blink');
    guide.setAttribute('opacity', '0');
    sfx.ding();
    svg.querySelector('.g3o-drawn circle')?.classList.add('g3o-glow');
    show(`Được <b>hình tròn tâm ${m.o}</b>, bán kính ${R} cm.`);
    await sleep(500);
    // Com-pa cất đi, hiện bán kính, đường kính
    comp.classList.add('g3o-comp-out');
    const dia = svg.querySelector('.g3o-dia');
    dia.setAttribute('opacity', '1');
    dia.classList.add('g3o-fadein');
    if (!giveR) dia.querySelector('.g3o-dlab').classList.add('g3o-dlab-on');
    await sleep(500);
    if (giveR) stepDia();
    else finish();
  }

  // 4. (đề cho bán kính) Đường kính bằng mấy?
  function stepDia() {
    stepNow = 'dnum';
    setActive(paper, boxD);
    say('Đường kính của hình tròn này dài mấy xăng-ti-mét?', `Đường kính = <b>${R} × 2</b> = ?`);
    const want = {
      max: 2, onType: (t) => { boxD.textContent = t; },
      onSubmit: (t) => {
        if (Number(t) !== Dm) {
          boxD.textContent = '';
          wrong(boxD, `Đường kính gấp 2 lần bán kính: ${R} × 2.`, `Đường kính gấp 2 lần bán kính: <b>${R} × 2</b>.`);
          pad.want(want);
          return;
        }
        pad.off(); setActive(paper, null); boxD.classList.add('g3d-box-ok', 'g3d-ok-flash'); sfx.pop(4);
        svg.querySelector('.g3o-dlab').classList.add('g3o-dlab-on');
        stepNow = 'busy';
        setTimeout(finish, 500);
      },
    };
    pad.want(want);
  }
  async function finish() {
    await sleep(300);
    done(mistakes, { ok: `Hình tròn tâm ${m.o}, bán kính ${R} cm, đường kính ${Dm} cm.`, tip: tip ? `Nhớ: ${tip}` : '' });
  }

  // Thao tác trên hình
  let drag = null;
  svg.addEventListener('pointerdown', (e) => {
    const p = toSvg(e);
    if (stepNow === 'open') {
      e.preventDefault();
      drag = 'open';
      setOpen(Math.round(p[0] - N[0]));
    } else if (stepNow === 'place') {
      if (e.target.closest('[data-pick="center"]')) { placed(); return; }
      if (!e.target.closest('.g3o-comp')) return;
      e.preventDefault();
      drag = { from: p, N0: [...N] };
      comp.classList.add('g3o-comp-lift');
    } else if (stepNow === 'spin') {
      e.preventDefault();
      spinning = true;
      last = Math.atan2(p[1], p[0]) / D2R;
    } else return;
    try { svg.setPointerCapture(e.pointerId); } catch { /* thử tự động */ }
  });
  svg.addEventListener('pointermove', (e) => {
    const p = toSvg(e);
    if (stepNow === 'open' && drag === 'open') setOpen(Math.round(p[0] - N[0]));
    else if (stepNow === 'place' && drag?.from) {
      N = [drag.N0[0] + p[0] - drag.from[0], drag.N0[1] + p[1] - drag.from[1]];
      render();
    } else if (stepNow === 'spin' && spinning) spinTo(Math.atan2(p[1], p[0]) / D2R);
  });
  const up = () => {
    if (stepNow === 'place' && drag?.from) {
      comp.classList.remove('g3o-comp-lift');
      const P = Pof();
      if (Math.hypot(N[0], N[1]) < 1.2) placed();
      else if (Math.hypot(P[0], P[1]) < 1.2) wrong(null, `Đầu nhọn của com-pa đặt vào điểm ${m.o}, không phải đầu bút chì.`, `<b>Đầu nhọn</b> (không phải đầu bút chì) đặt vào điểm ${m.o}.`);
      else hint(`Kéo com-pa cho đầu nhọn chạm vào điểm ${m.o}.`, `Kéo cho <b>đầu nhọn</b> chạm vào điểm <b>${m.o}</b>.`);
    }
    drag = null;
    spinning = false;
  };
  svg.addEventListener('pointerup', up);
  svg.addEventListener('pointercancel', up);

  B.setButtons(['−', '+', '✓ Xong'], () => {});
  B.btns().forEach(b => { b.disabled = true; });
  if (giveR) stepOpen(); else stepRadius();

  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: async () => {
      if (stepNow === 'rnum') pad.type(String(R));
      else if (stepNow === 'open') { setOpen(R); B.btns()[2].click(); }
      else if (stepNow === 'place') placed();
      else if (stepNow === 'spin') { last = ang; for (let a = 0; a <= 360 && stepNow === 'spin'; a += 10) { spinTo(start + a); await sleep(30); } }
      else if (stepNow === 'dnum') pad.type(String(Dm));
    }, wrong: () => {
      if (stepNow === 'rnum') pad.type(String(Dm));
      else if (stepNow === 'open') { setOpen(giveR ? R + 1 : Dm); B.btns()[2].click(); }
      else if (stepNow === 'dnum') pad.type(String(R));
    } };
  }
}

let ciStyles = false;
function injectCircleStyles() {
  if (ciStyles) return;
  ciStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g3o { flex: 1; min-height: 0; display: grid; gap: 1.4cqh 2cqi; padding: 1.4cqh 2.4cqi 2cqh calc(clamp(1.4rem, 4cqi, 3rem) + 1.6cqi);
      grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr);
      grid-template-areas: "head head" "fig side"; font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .g3o > * { min-height: 0; min-width: 0; }
    .g3o-head { grid-area: head; font-size: min(6cqh, 3.6cqi, 2.5rem); line-height: 1.25; color: #334155; min-height: 2.5em; display: flex; align-items: center; }
    .g3o-kr { color: ${COL.rad}; }
    .g3o-kd { color: ${COL.dia}; }
    .g3o-fig { grid-area: fig; display: flex; border-radius: 0.8rem; overflow: hidden; border: 2px solid #DBEAFE; background: #fff; touch-action: none; }
    .g3o-svg { flex: 1; width: 100%; height: 100%; display: block; user-select: none; -webkit-user-select: none; }
    .g3o-vx { font-family: 'Baloo 2', sans-serif; font-weight: 800; fill: #334155; paint-order: stroke; stroke: #fff; }
    .g3o-len { font-family: 'Baloo 2', sans-serif; font-weight: 800; paint-order: stroke; stroke: #fff; }
    .g3o-rnum { font: 800 0.56px 'Baloo 2', sans-serif; fill: ${INK}; }
    .g3o-rnum-on { fill: #DC2626; font-size: 0.72px; }
    .g3o-hit { cursor: pointer; }
    .g3o-ghost { opacity: 0; }
    .g3o-dlab { opacity: 0; transition: opacity .4s; }
    .g3o-dlab-on { opacity: 1; }
    .g3o-ghost-on { opacity: 0.85; }
    .g3o-glow { filter: drop-shadow(0 0 0.15px #FDE047) drop-shadow(0 0 0.15px #FDE047); }
    .g3o-pulse { animation: g3oPulse 1.1s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes g3oPulse { 50% { transform: scale(1.35); opacity: 0.5; } }
    .g3o-blink { animation: g3oBlink 1.2s ease-in-out infinite; }
    @keyframes g3oBlink { 50% { opacity: 0.3; } }
    .g3o-fadein { animation: g3oFade .5s ease; }
    @keyframes g3oFade { from { opacity: 0; } }
    .g3o-comp { cursor: grab; }
    .g3o-comp-lift { filter: drop-shadow(0.15px 0.3px 0.2px rgba(0,0,0,0.35)); cursor: grabbing; }
    .g3o-comp-out { opacity: 0; transition: opacity .5s; pointer-events: none; }

    .g3o-side { grid-area: side; display: flex; flex-direction: column; gap: 2cqh; }
    .g3o-lines { flex: 0.85 1 0; min-height: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .g3o-lg { display: flex; flex-direction: column; gap: 0.25em; width: max-content; line-height: 1; }
    .g3o-ln { display: flex; align-items: center; gap: 0.25em; white-space: nowrap; height: 1.45em; }
    .g3o-lab { font-size: 0.8em; color: #475569; }
    .g3o .g3d-box { height: 1.3em; }
    .g3o-given { border: 2px solid transparent; color: #1E293B; }
    .g3o-slot { display: inline-grid; place-items: center; height: 1.3em; padding: 0 0.15em; border: 0.06em dashed #93C5FD; border-radius: 0.2em; color: #94A3B8; box-sizing: border-box; }
    .g3o-slot-done { border-color: transparent; color: #1E293B; }
    .g3o-final { background: #DCFCE7; border-color: #22C55E; color: #15803D; }

    .g3o-choices { flex: 1 1 0; container-type: size; container-name: g3och; display: flex; flex-direction: column; gap: 3cqh; padding: 0 0 2cqh; box-sizing: border-box; min-height: 0; }
    .g3o-btn { flex: 1 1 0; min-height: 0; width: 100%; max-width: none; font-size: min(calc(60cqh / var(--nb, 4)), calc(84cqi / (var(--n, 8) * 0.58)), 3.4rem); overflow: hidden; line-height: 1; white-space: nowrap; }
    .g3o-btn-void { visibility: hidden; }
    .g3o-btn.g3o-sym { font-size: min(calc(60cqh / var(--nb, 4)), 4rem); }
    .g3o-nobtn .g3o-choices { display: none; }
    .g3o-nobtn .g3o-lines { flex: 1 1 0; }
    .g3o-btn-off { opacity: 0.55; }

    /* Tờ vở gần vuông / đứng: hình cả bề ngang, các dòng, hàng nút chọn */
    .g3o-scene .g3d-paper { container-name: g3opaper; }
    @container g3opaper (aspect-ratio < 1.3) {
      .g3o { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr) 15cqh 13cqh; grid-template-areas: "head" "fig" "lines" "ch"; }
      .g3o-head { font-size: min(4.2cqh, 5.4cqi); }
      .g3o-side { display: contents; }
      .g3o-lines { grid-area: lines; }
      .g3o-choices { grid-area: ch; flex-direction: row; gap: 3cqi; padding: 0 0 1cqh; }
      .g3o-lg-name { flex-direction: row; gap: 0.7em; }
      .g3o-nobtn .g3o-lines { grid-row: 3 / span 2; }
      .g3o-compact { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); grid-template-rows: auto minmax(0, 1fr) 19cqh; grid-template-areas: "head head" "fig fig" "lines ch"; }
    }
    @container g3och (aspect-ratio > 2.5) {
      .g3o-btn { font-size: min(44cqh, calc(80cqi / var(--nb, 4) / (var(--n, 8) * 0.64)), 3rem); padding-inline: 0.15em; }
      .g3o-btn.g3o-sym { font-size: min(60cqh, 3.6rem); }
    }
    @media (prefers-reduced-motion: reduce) {
      .g3o-pulse { animation: g3oBlink 2s ease-in-out infinite; }
      .g3o-blink { animation-duration: 2.4s; }
    }
  `;
  document.head.appendChild(st);
}
