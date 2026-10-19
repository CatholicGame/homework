/**
 * ⬜ Chu vi, diện tích (Toán 3 Tập 2: Bài 50, 51, 52, 53, ôn tập Bài 79). Hình vẽ đúng tỉ lệ trên giấy ô vuông 1 cm,
 * ghi số đo các cạnh; bài giải viết từng dòng như trong vở:
 *   Chu vi hình chữ nhật ABCD là:
 *   (8 + 5) × 2 = 13 × 2
 *               = 26 (cm)
 * Các bước: chọn phép tính (nút to, phép sai là chỗ hay nhầm: 8 + 5, 8 × 5), gõ kết quả từng dòng, (cấp đếm ô, cấp trộn)
 * chọn đơn vị cm hay cm², rồi xem kiểm chứng: chu vi thì con kiến bò một vòng quanh hình, đếm dần độ dài đã đi;
 * diện tích thì từng hàng ô vuông 1 cm² bay vào phủ kín hình, cộng dần số ô; đếm ô thì các ô được đánh số lần lượt.
 * Mọi vùng (hình, nút chọn, các dòng bài giải) có chỗ từ đầu lượt, chỉ hiện dần, không xô gì.
 */

import { mountDrill, shake, setActive, flyDigit, flyOne, calmMotion, fresh, sfx, sleep, how, TEACHER, INK } from './kit.js';

const NS = 'http://www.w3.org/2000/svg';
const COL = { line: '#1E3A8A', walk: '#F97316', fillP: '#FFF7ED', fillA: '#ECFDF5', cell: '#BAE6FD', cellEdge: '#0284C7', row: '#FDE68A', rowEdge: '#CA8A04' };

/** Chữ cho giọng đọc: dấu phép tính, đơn vị đọc thành lời. */
const voice = (s) => s.replace(/<[^>]*>/g, '').replace(/cm²/g, 'xăng-ti-mét vuông').replace(/\bcm\b/g, 'xăng-ti-mét')
  .replace(/×/g, 'nhân').replace(/\+/g, 'cộng').replace(/[()]/g, '');

// ── Hình học (đơn vị: cm) ────────────────────────────────────────────────────────────────────────────
const dist = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
const rot = ([x, y], a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];

/** Góc trong (độ) tại mỗi đỉnh của đa giác. */
function angles(P) {
  return P.map((p, i) => {
    const a = P[(i + P.length - 1) % P.length], b = P[(i + 1) % P.length];
    const u = [a[0] - p[0], a[1] - p[1]], v = [b[0] - p[0], b[1] - p[1]];
    return Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))))) * 180 / Math.PI;
  });
}
const convex = (P) => {
  const s = P.map((p, i) => { const q = P[(i + 1) % P.length], r = P[(i + 2) % P.length]; return Math.sign((q[0] - p[0]) * (r[1] - q[1]) - (q[1] - p[1]) * (r[0] - q[0])); });
  return s.every(x => x === s[0]);
};

/**
 * Đặt đa giác cho dễ nhìn: cạnh dài nhất nằm ngang ở dưới, các đỉnh đi theo chiều kim đồng hồ, đỉnh đầu (A) là đỉnh
 * trên cùng (tam giác) / trên cùng bên trái (tứ giác), góc trên trái của khung bao ở (0, 0).
 */
function normalize(P) {
  let best = 0;
  P.forEach((p, i) => { if (dist(p, P[(i + 1) % P.length]) > dist(P[best], P[(best + 1) % P.length])) best = i; });
  const a = P[best], b = P[(best + 1) % P.length];
  let Q = P.map(p => rot([p[0] - a[0], p[1] - a[1]], -Math.atan2(b[1] - a[1], b[0] - a[0])));
  if (Q.some(p => p[1] > 1e-6)) Q = Q.map(([x, y]) => [-x, -y]); // các đỉnh khác phải ở phía trên cạnh đáy
  const minX = Math.min(...Q.map(p => p[0])), minY = Math.min(...Q.map(p => p[1]));
  Q = Q.map(([x, y]) => [x - minX, y - minY]);
  const area2 = Q.reduce((s, p, i) => { const q = Q[(i + 1) % Q.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0);
  if (area2 < 0) Q.reverse(); // y hướng xuống: tổng dương = chiều kim đồng hồ trên màn hình
  const key = (p) => (Q.length === 3 ? p[1] : p[1] + p[0] * 0.35);
  let first = 0;
  Q.forEach((p, i) => { if (key(p) < key(Q[first]) - 1e-6) first = i; });
  return [...Q.slice(first), ...Q.slice(0, first)];
}
const bbox = (P) => ({ w: Math.max(...P.map(p => p[0])), h: Math.max(...P.map(p => p[1])) });

/** Tam giác có ba cạnh nguyên 3–10 cm, không quá dẹt, vừa khung 12 × 8 cm. */
function makeTri(rng) {
  for (let t = 0; t < 300; t++) {
    const [c, b, a] = [rng.int(4, 10), rng.int(3, 9), rng.int(3, 9)];
    if (a + b <= c || a + c <= b || b + c <= a) continue;
    const x = (c * c + b * b - a * a) / (2 * c);
    const P = normalize([[0, 0], [c, 0], [x, -Math.sqrt(b * b - x * x)]]);
    const ang = angles(P), bb = bbox(P);
    if (Math.min(...ang) < 32 || Math.max(...ang) > 120 || bb.w > 12 || bb.h > 8 || bb.h < 2.5) continue;
    return P;
  }
  return normalize([[0, 0], [5, 0], [0, -4]]); // 3, 4, 5
}

/** Tứ giác lồi ghép từ hai tam giác chung đường chéo (cạnh nguyên 2–9 cm), vừa khung 12 × 8 cm. */
function makeQuad(rng) {
  const place = (d, s1, s2, up) => { const x = (d * d + s1 * s1 - s2 * s2) / (2 * d); const y = Math.sqrt(s1 * s1 - x * x); return [x, up ? -y : y]; };
  for (let t = 0; t < 600; t++) {
    const d = rng.int(5, 11), a = rng.int(2, 9), b = rng.int(2, 9), c = rng.int(2, 9), e = rng.int(2, 9);
    if (a + b <= d + 0.5 || c + e <= d + 0.5 || Math.abs(a - b) >= d || Math.abs(c - e) >= d) continue;
    const P = normalize([[0, 0], place(d, a, b, true), [d, 0], place(d, e, c, false)]);
    const ang = angles(P), bb = bbox(P);
    if (!convex(P) || Math.min(...ang) < 55 || Math.max(...ang) > 145 || bb.w > 12 || bb.h > 8 || bb.h < 3) continue;
    const lens = P.map((p, i) => dist(p, P[(i + 1) % 4]));
    if (new Set(lens.map(Math.round)).size < 3) continue; // không ra hình gần như hình chữ nhật / hình thoi
    return P;
  }
  return [[0, 0], [6, 0], [9, 4], [0, 4]]; // 6, 5, 9, 4
}

const rectPts = (w, h) => [[0, 0], [w, 0], [w, h], [0, h]];

/** Hình ghép từ các ô vuông 1 cm (cấp đếm ô): hình chữ nhật, chữ L, chữ T, bậc thang. Trả về [[x, y], …]. */
function makeCells(rng, kind) {
  const full = (w, h) => Array.from({ length: w * h }, (_, i) => [i % w, Math.floor(i / w)]);
  for (let t = 0; t < 100; t++) {
    let cells;
    if (kind === 'rect') cells = full(rng.int(3, 6), rng.int(2, 4));
    else if (kind === 'L') {
      const w = rng.int(3, 6), h = rng.int(3, 4), cw = rng.int(1, w - 2), ch = rng.int(1, h - 1);
      cells = full(w, h).filter(([x, y]) => !(x >= w - cw && y < ch));
    } else if (kind === 'T') {
      const w = rng.int(5, 7), h = rng.int(3, 4), cw = rng.int(1, Math.floor((w - 1) / 2)), ch = rng.int(1, h - 1);
      cells = full(w, h).filter(([x, y]) => !(y >= h - ch && (x < cw || x >= w - cw)));
    } else {
      const h = rng.int(3, 4);
      const lens = rng.shuffle([2, 3, 4, 5, 6, 7]).slice(0, h).sort((p, q) => q - p);
      cells = lens.flatMap((n, y) => Array.from({ length: n }, (_, x) => [x, y]));
    }
    if (cells.length >= 5 && cells.length <= 26) return cells;
  }
  return full(4, 3);
}

// ── Đề ───────────────────────────────────────────────────────────────────────────────────────────────
const NAMES = { tri: ['ABC', 'MNP', 'DEG', 'HIK'], quad: ['ABCD', 'MNPQ', 'EGHI'], rect: ['ABCD', 'MNPQ', 'EGHK'], sq: ['ABCD', 'MNPQ', 'EGHK'], cells: ['A', 'B', 'H', 'M'] };
const KIND = { tri: 'hình tam giác', quad: 'hình tứ giác', rect: 'hình chữ nhật', sq: 'hình vuông', cells: 'hình' };

/** Đề: { kind, ask: 'P' | 'A', name, ... }: rect: w, h; sq: a; tri / quad: pts; cells: cells. */
function makeOne(rng, kind, ask, size) {
  const name = rng.pick(NAMES[kind]);
  if (kind === 'tri') return { kind, ask: 'P', name, pts: makeTri(rng) };
  if (kind === 'quad') return { kind, ask: 'P', name, pts: makeQuad(rng) };
  if (kind === 'cells') return { kind, ask: 'A', name, cells: makeCells(rng, size) };
  if (kind === 'sq') {
    // Cạnh 4 cm: chu vi 4 × 4 và diện tích 4 × 4 viết giống nhau, không dạy được chỗ khác nhau, bỏ qua.
    let a = 4;
    while (a === 4) a = rng.int(...(size || [3, 8]));
    return { kind, ask, name, w: a, h: a };
  }
  const [w0, w1, h0, h1] = size || [4, 12, 2, 8];
  for (;;) { const w = rng.int(w0, w1), h = rng.int(h0, h1); if (h < w && h * 3 >= w) return { kind, ask, name, w, h }; }
}

/**
 * Lời giải của đề: các nút phép tính [[chữ, đúng?, lời nhắc riêng]], các bước gõ số, dòng bài giải, quy tắc.
 */
function planOf(m) {
  const { kind, ask, w, h } = m;
  const head = `Tính <b class="g3a-k${ask}">${ask === 'P' ? 'chu vi' : 'diện tích'}</b> ${KIND[kind]} ${m.name}.`;
  const label = `${ask === 'P' ? 'Chu vi' : 'Diện tích'} ${KIND[kind]} ${m.name} là:`;
  const unit = ask === 'P' ? 'cm' : 'cm²';
  if (kind === 'tri' || kind === 'quad') {
    const lens = m.pts.map((p, i) => Math.round(dist(p, m.pts[(i + 1) % m.pts.length])));
    const sum = lens.reduce((s, x) => s + x, 0);
    const rule = kind === 'tri' ? 'Chu vi hình tam giác bằng tổng độ dài ba cạnh.' : 'Chu vi hình tứ giác bằng tổng độ dài bốn cạnh.';
    return {
      head, label, unit, rule, lens, answer: sum, short: kind === 'tri' ? 'Chu vi = tổng độ dài ba cạnh' : 'Chu vi = tổng độ dài bốn cạnh',
      opts: [[lens.join(' + '), true], [lens.slice(0, -1).join(' + '), false, 'Còn thiếu một cạnh. '],
        kind === 'tri' ? [`${lens[0]} × ${lens[1]}`, false, ''] : [`(${lens[0]} + ${lens[1]}) × 2`, false, 'Đây không phải hình chữ nhật. ']],
      steps: [{ v: sum, calc: lens.join(' + ') }],
    };
  }
  if (kind === 'cells') {
    const rows = [];
    m.cells.forEach(([, y]) => { rows[y] = (rows[y] || 0) + 1; });
    return { head, label, unit, rows, answer: m.cells.length, rule: 'Diện tích hình bằng số ô vuông 1 cm² phủ kín hình.', opts: [], steps: [{ v: m.cells.length }] };
  }
  if (kind === 'rect' && ask === 'P') return {
    head, label, unit, answer: (w + h) * 2,
    rule: 'Muốn tính chu vi hình chữ nhật, ta lấy chiều dài cộng với chiều rộng (cùng đơn vị đo) rồi nhân với 2.', short: 'Chu vi = (dài + rộng) × 2',
    opts: [[`(${w} + ${h}) × 2`, true], [`${w} + ${h}`, false, `${w} + ${h} mới đi được nửa vòng. `], [`${w} × ${h}`, false, `${w} × ${h} là diện tích. `]],
    steps: [{ v: w + h, calc: `${w} + ${h}` }, { v: (w + h) * 2, calc: `${w + h} × 2` }],
  };
  if (kind === 'rect') return {
    head, label, unit, answer: w * h,
    rule: 'Muốn tính diện tích hình chữ nhật, ta lấy chiều dài nhân với chiều rộng (cùng đơn vị đo).', short: 'Diện tích = dài × rộng',
    opts: [[`${w} × ${h}`, true], [`(${w} + ${h}) × 2`, false, `(${w} + ${h}) × 2 là chu vi. `], [`${w} + ${h}`, false, '']],
    steps: [{ v: w * h, calc: `${w} × ${h}` }],
  };
  if (ask === 'P') return {
    head, label, unit, answer: w * 4,
    rule: 'Muốn tính chu vi hình vuông, ta lấy độ dài một cạnh nhân với 4.', short: 'Chu vi = cạnh × 4',
    opts: [[`${w} × 4`, true], [`${w} × ${w}`, false, `${w} × ${w} là diện tích. `], [`${w} + 4`, false, '']],
    steps: [{ v: w * 4, calc: `${w} × 4` }],
  };
  return {
    head, label, unit, answer: w * w,
    rule: 'Muốn tính diện tích hình vuông, ta lấy độ dài một cạnh nhân với chính nó.', short: 'Diện tích = cạnh × cạnh',
    opts: [[`${w} × ${w}`, true], [`${w} × 4`, false, `${w} × 4 là chu vi. `], [`${w} + ${w}`, false, '']],
    steps: [{ v: w * w, calc: `${w} × ${w}` }],
  };
}

const LEVEL = (id, n, title, desc, knowledge, lessons, plan, ask, extra = {}) => ({
  id, n, title, desc, knowledge, lessons: { workbook: lessons }, missions: plan.length, ask: () => ask,
  gen: (rng, k) => { const [kind, a, size] = plan[k % plan.length]; return makeOne(rng, kind, a, size); },
  ...extra,
});

export const AREA_LEVELS = [
  LEVEL('drill-area-1', 1, 'Chu vi các hình', 'Vd. Chu vi hình chữ nhật: (8 + 5) × 2 = 13 × 2 = 26 (cm).',
    'chu vi hình tam giác, hình tứ giác, hình chữ nhật, hình vuông', ['bai-50'],
    [['tri', 'P'], ['rect', 'P'], ['quad', 'P'], ['sq', 'P'], ['rect', 'P']],
    'Chu vi là đường đi một vòng quanh hình!', { box: [8.5, 6] }),
  LEVEL('drill-area-2', 2, 'Đếm ô vuông 1 cm²', 'Vd. Hình A gồm 12 ô vuông 1 cm², diện tích hình A là 12 cm².',
    'diện tích của một hình, xăng-ti-mét vuông', ['bai-51'],
    [['cells', 'A', 'rect'], ['cells', 'A', 'L'], ['cells', 'A', 'T'], ['cells', 'A', 'step']],
    'Đếm từng hàng ô vuông, không bỏ sót ô nào!', { box: [8, 5.5] }),
  LEVEL('drill-area-3', 3, 'Diện tích hình chữ nhật', 'Vd. 8 × 5 = 40 (cm²).',
    'diện tích hình chữ nhật bằng chiều dài nhân chiều rộng', ['bai-52', 'bai-53'],
    [['rect', 'A', [3, 9, 2, 6]], ['rect', 'A', [3, 9, 2, 6]], ['rect', 'A', [3, 9, 2, 6]], ['rect', 'A', [3, 9, 2, 6]]],
    'Diện tích hình chữ nhật: chiều dài nhân chiều rộng!', { box: [8, 5.5] }),
  LEVEL('drill-area-4', 4, 'Diện tích hình vuông', 'Vd. 6 × 6 = 36 (cm²).',
    'diện tích hình vuông bằng cạnh nhân cạnh', ['bai-52', 'bai-53'],
    [['sq', 'A', [2, 7]], ['sq', 'A', [2, 7]], ['sq', 'A', [2, 7]], ['sq', 'A', [2, 7]]],
    'Diện tích hình vuông: cạnh nhân cạnh!', { box: [8, 5.5] }),
  LEVEL('drill-area-5', 5, 'Chu vi hay diện tích?', 'Chọn đúng (8 + 5) × 2 hay 8 × 5, viết cm hay cm².',
    'chu vi và diện tích hình chữ nhật, hình vuông; đơn vị cm, cm²', ['bai-53', 'bai-79'],
    [['rect', 'A', [3, 10, 2, 7]], ['rect', 'P', [3, 10, 2, 7]], ['sq', 'P', [2, 8]], ['sq', 'A', [2, 8]], ['rect', 'P', [3, 10, 2, 7]], ['rect', 'A', [3, 10, 2, 7]]],
    'Chu vi hay diện tích? Đọc kĩ rồi chọn phép tính và đơn vị!', { box: [8.5, 6], unitAsk: true }),
];

// ── Hình vẽ (SVG, 1 đơn vị = 1 cm) ──────────────────────────────────────────────────────────────────────
let uid = 0;
const LEN_FS = 0.62;
const textW = (s, fs) => s.length * fs * 0.52;

/** Đỉnh của hình (cells: không có). */
const pointsOf = (m) => (m.kind === 'tri' || m.kind === 'quad' ? m.pts : m.kind === 'cells' ? null : rectPts(m.w, m.h));

/** Nhãn độ dài cạnh i: ở giữa cạnh, đẩy ra ngoài hình đủ để chữ không đè lên nét. */
function sideLabel(P, i, text) {
  const p = P[i], q = P[(i + 1) % P.length];
  const cx = P.reduce((s, x) => s + x[0], 0) / P.length, cy = P.reduce((s, x) => s + x[1], 0) / P.length;
  let nx = q[1] - p[1], ny = p[0] - q[0];
  const l = Math.hypot(nx, ny);
  nx /= l; ny /= l;
  const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
  if (nx * (mx - cx) + ny * (my - cy) < 0) { nx = -nx; ny = -ny; }
  const off = 0.3 + Math.abs(nx) * textW(text, LEN_FS) / 2 + Math.abs(ny) * LEN_FS * 0.55;
  return { x: mx + nx * off, y: my + ny * off, nx, ny };
}

function figureSvg(m, plan, id) {
  let s = `<defs><pattern id="g3a-grid-${id}" width="1" height="1" patternUnits="userSpaceOnUse"><path d="M1 0 H0 V1" fill="none" stroke="#BFDBFE" stroke-width="0.04"/></pattern></defs>
    <rect x="-60" y="-60" width="160" height="140" fill="url(#g3a-grid-${id})"/>`;
  if (m.kind === 'cells') {
    const W = Math.max(...m.cells.map(c => c[0])) + 1;
    s += m.cells.map(([x, y], i) => `<rect class="g3a-cell" data-cell="${i}" x="${x}" y="${y}" width="1" height="1" fill="${COL.cell}" stroke="${COL.cellEdge}" stroke-width="0.06"/>`).join('');
    s += `<g class="g3a-nums"></g>`;
    s += `<text class="g3a-vx" x="-0.35" y="-0.4" text-anchor="middle">${m.name}</text>`;
    // Mẫu: một ô vuông cạnh 1 cm là 1 cm²
    const lx = W + 1.6;
    s += `<g class="g3a-legend"><rect x="${lx}" y="0" width="1" height="1" fill="#FDE68A" stroke="${COL.rowEdge}" stroke-width="0.06"/>
      <text class="g3a-len" x="${lx + 0.5}" y="1.75" text-anchor="middle">1 cm²</text></g>`;
    return { svg: s, bb: { x0: -1, y0: -1.2, x1: lx + 1.8, y1: Math.max(...m.cells.map(c => c[1])) + 1.4 } };
  }
  const P = pointsOf(m);
  const lens = P.map((p, i) => Math.round(dist(p, P[(i + 1) % P.length])));
  const isA = m.ask === 'A';
  s += `<polygon class="g3a-shape" points="${P.map(p => p.join(',')).join(' ')}" fill="${isA ? COL.fillA : COL.fillP}" stroke="${COL.line}" stroke-width="0.09" stroke-linejoin="round"/>`;
  if (isA) {
    // Hàng ô vuông 1 cm² (ẩn) cho bước kiểm chứng + chỗ ghi số ô cộng dần bên phải mỗi hàng.
    for (let r = 0; r < m.h; r++) {
      s += `<g class="g3a-row" data-row="${r}" opacity="0">${Array.from({ length: m.w }, (_, c) => `<rect x="${c}" y="${r}" width="1" height="1" fill="${COL.row}" stroke="${COL.rowEdge}" stroke-width="0.05"/>`).join('')}</g>`;
      s += `<rect class="g3a-rowbox" data-rowbox="${r}" x="0" y="${r}" width="${m.w}" height="1" fill="none"/>`;
      s += `<text class="g3a-rowsum" data-rowsum="${r}" x="${m.w + 0.35}" y="${r + 0.52}" opacity="0">${(r + 1) * m.w}</text>`;
    }
    s += `<polygon points="${P.map(p => p.join(',')).join(' ')}" fill="none" stroke="${COL.line}" stroke-width="0.09" stroke-linejoin="round"/>`;
  }
  // Nét đã đi (kiến bò) vẽ đè lên cạnh
  P.forEach((p, i) => { s += `<line class="g3a-walked" data-walk="${i}" x1="${p[0]}" y1="${p[1]}" x2="${p[0]}" y2="${p[1]}" stroke="${COL.walk}" stroke-width="0.16" stroke-linecap="round"/>`; });
  // Cạnh ghi số đo từ đầu: hình chữ nhật hai cạnh (dài, rộng), hình vuông một cạnh, tam giác / tứ giác mọi cạnh.
  const shown = m.kind === 'rect' ? [0, 3] : m.kind === 'sq' ? [0] : P.map((_, i) => i);
  P.forEach((_, i) => {
    const t = `${lens[i]} cm`;
    const L = sideLabel(P, i, t);
    s += `<text class="g3a-len${shown.includes(i) ? '' : ' g3a-len-off'}" data-len="${i}" x="${L.x}" y="${L.y}" text-anchor="middle" dominant-baseline="central">${t}</text>`;
  });
  const cx = P.reduce((a, p) => a + p[0], 0) / P.length, cy = P.reduce((a, p) => a + p[1], 0) / P.length;
  P.forEach((p, i) => {
    const dx = p[0] - cx, dy = p[1] - cy, l = Math.hypot(dx, dy) || 1;
    s += `<text class="g3a-vx" x="${p[0] + dx / l * 0.55}" y="${p[1] + dy / l * 0.55}" text-anchor="middle" dominant-baseline="central">${m.name[i]}</text>`;
  });
  s += `<g class="g3a-ant" opacity="0"><g class="g3a-ant-body" transform="scale(1.25)">
      <path d="M-0.28 0 L-0.42 -0.3 M-0.28 0 L-0.42 0.3 M0 0 L0 -0.34 M0 0 L0 0.34 M0.18 0 L0.36 -0.28 M0.18 0 L0.36 0.28 M0.36 -0.05 Q0.5 -0.2 0.6 -0.22 M0.36 0.05 Q0.5 0.2 0.6 0.22" stroke="${INK}" stroke-width="0.05" fill="none" stroke-linecap="round"/>
      <ellipse cx="-0.3" cy="0" rx="0.21" ry="0.16" fill="#7C2D12" stroke="${INK}" stroke-width="0.04"/>
      <ellipse cx="0.02" cy="0" rx="0.13" ry="0.1" fill="#9A3412" stroke="${INK}" stroke-width="0.04"/>
      <circle cx="0.28" cy="0" r="0.12" fill="#9A3412" stroke="${INK}" stroke-width="0.04"/></g></g>
    <g class="g3a-pill" opacity="0"><rect x="-0.7" y="-0.42" width="1.4" height="0.84" rx="0.42" fill="#fff" stroke="${COL.walk}" stroke-width="0.07"/><text x="0" y="0.03" text-anchor="middle" dominant-baseline="central">0</text></g>`;
  const xs = P.map(p => p[0]), ys = P.map(p => p[1]);
  const pad = 2.3;
  return { svg: s, bb: { x0: Math.min(...xs) - pad, y0: Math.min(...ys) - 1.4, x1: Math.max(...xs) + pad, y1: Math.max(...ys) + 1.4 } };
}

/** viewBox theo đúng tỉ lệ khung: giấy ô vuông phủ kín, hình ở giữa, cỡ 1 cm như nhau mọi lượt của cấp. */
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

/** Cỡ chữ to nhất để khối các dòng bài giải vừa khung (đo ở 100px; đo lại khi khung đổi cỡ, không đổi trong lượt). */
function fitLines(box, inner, cap) {
  const fit = () => {
    const w = box.clientWidth * 0.94, h = box.clientHeight * 0.92;
    if (w <= 0 || h <= 0) return;
    inner.style.fontSize = '100px';
    const fs = Math.min(100 * w / inner.scrollWidth, 100 * h / inner.scrollHeight, cap);
    inner.style.fontSize = `${Math.floor(fs)}px`;
  };
  fit();
  new ResizeObserver(() => { if (box.isConnected) fit(); }).observe(box);
}

const boxW = (v) => `${String(v).length * 0.6 + 0.9}em`;

export const AREA_GAME = {
  id: 'drill-area', icon: '⬜', title: 'Chu vi, diện tích',
  purpose: 'Giúp em tính chu vi hình tam giác, tứ giác, hình chữ nhật, hình vuông, hiểu diện tích là số ô vuông 1 cm² phủ kín hình, tính diện tích hình chữ nhật, hình vuông và không nhầm chu vi với diện tích.',
  unitWord: 'bài', starPrefix: 'drill', npcs: [TEACHER], levels: AREA_LEVELS,
  stallIcon: () => '⬜',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> bài.`,
  againText: 'Làm lượt mới',
  howTo: how(['📐', 'Nhìn hình'], ['👆', 'Chọn phép tính'], ['⌨️', 'Tính'], ['🐜', 'Kiểm tra']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), (m) => `${m.kind}${m.ask}:${m.w ?? ''}x${m.h ?? ''}:${(m.pts || m.cells || []).map(p => p.map(v => v.toFixed(1)).join(',')).join(';')}`);
  },

  mountMission(stage, m, level, api) {
    const plan = planOf(m);
    const id = ++uid;
    const isCells = m.kind === 'cells';
    const unitAsk = !!level.unitAsk || isCells;
    const opts = [...plan.opts].sort((x, y) => (x[0] < y[0] ? -1 : 1)); // thứ tự cố định theo chữ, không lộ đáp án
    const slotW = `${Math.max(0, ...opts.map(o => o[0].length)) * 0.52 + 0.7}em`;
    const fig = figureSvg(m, plan, id);
    const unitHtml = unitAsk ? `<span class="g3a-unit" data-unit>${isCells ? '…' : '(…)'}</span>` : `<span class="g3a-u">(${plan.unit})</span>`;
    const st = plan.steps;
    let lines;
    if (isCells) {
      lines = `
        <div class="g3a-span" data-r="0">${KIND.cells[0].toUpperCase()}${KIND.cells.slice(1)} ${m.name} gồm <span class="g3d-box" style="--boxw:${boxW(plan.answer)}" data-b="0"></span> ô vuông 1 cm².</div>
        <div class="g3a-span g3a-hide" data-r="1">Diện tích hình ${m.name} là: <span class="g3d-box" style="--boxw:${boxW(plan.answer)}" data-b="1"></span> ${unitHtml}</div>`;
    } else {
      const two = st.length === 2;
      lines = `
        <div class="g3a-label g3a-span">${plan.label}</div>
        <div class="g3a-left"><span class="g3a-slot" style="min-width:${slotW}" data-slot>…</span></div>
        <div class="g3a-right g3a-hide" data-r="0">= <span class="g3d-box" style="--boxw:${boxW(st[0].v)}" data-b="0"></span>${two ? ' × 2' : ` ${unitHtml}`}</div>
        <div class="g3a-left"></div>
        <div class="g3a-right g3a-hide" data-r="1">${two ? `= <span class="g3d-box" style="--boxw:${boxW(st[1].v)}" data-b="1"></span> ${unitHtml}` : '&nbsp;'}</div>`;
    }
    const board = `
      <div class="g3a${isCells ? ' g3a-cells' : ''}">
        <div class="g3a-head">${plan.head}</div>
        <div class="g3a-fig"><svg class="g3a-svg" viewBox="0 0 10 10" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${fig.svg}</svg></div>
        <div class="g3a-choices">${[0, 1, 2].map(i => `<button type="button" class="g3g-btn g3d-choice g3a-btn" data-o="${i}" disabled>&nbsp;</button>`).join('')}</div>
        <div class="g3a-lines"><div class="g3a-lg${isCells ? '' : ' g3a-lg-sol'}">${lines}</div></div>
      </div>`;
    const { paper, say, hint, pad, done } = mountDrill(stage, { api, board, cls: 'g3a-scene' });
    injectAreaStyles();
    const svg = paper.querySelector('.g3a-svg');
    fitFigure(paper.querySelector('.g3a-fig'), svg, fig.bb, level.box || [10, 7]);
    fitLines(paper.querySelector('.g3a-lines'), paper.querySelector('.g3a-lg'), 72);
    let btns = [...paper.querySelectorAll('.g3a-btn')];
    const chZone = paper.querySelector('.g3a-choices');
    const slot = paper.querySelector('[data-slot]');
    const unitEl = paper.querySelector('[data-unit]');
    const rowEl = (r) => paper.querySelector(`[data-r="${r}"]`);
    const boxEl = (r) => paper.querySelector(`[data-b="${r}"]`);
    let mistakes = 0;
    let tip = '';
    let stepNow = 'busy';
    let si = 0; // bước gõ số đang làm
    let units = [];

    const wrong = (el, text, shown) => { mistakes++; tip ||= plan.rule; shake(el); hint(voice(text), shown || text); };

    /** Đặt chữ cho ba nút (chỗ thứ ba để trống khi chỉ có hai lựa chọn: các nút không đổi cỡ). */
    // Mỗi lần đổi bước, nút được thay bằng nút mới tinh: không còn sót màu xanh, bóng, focus của nút vừa bấm ở bước trước
    // (trước đây nút cm² mang viền xanh của nút phép tính đúng, như lộ đáp án).
    const setButtons = (list) => {
      btns = btns.map((old, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = `g3g-btn g3d-choice g3a-btn${list[i] ? '' : ' g3a-btn-void'}`;
        b.dataset.o = i;
        b.disabled = !list[i];
        b.innerHTML = list[i] ?? '&nbsp;';
        b.onclick = () => {
          if (b.disabled) return;
          sfx.tap();
          if (stepNow === 'op') pickOp(i, b);
          else if (stepNow === 'unit') pickUnit(i, b);
        };
        old.replaceWith(b);
        return b;
      });
      // Cỡ chữ theo lựa chọn dài nhất: chữ luôn nằm gọn trong nút
      chZone.style.setProperty('--n', Math.max(3, ...list.map(t => String(t).replace(/²/g, '').length)));
    };

    // 1. Chọn phép tính
    function stepOp() {
      stepNow = 'op';
      setButtons(opts.map(o => o[0]));
      setActive(paper, slot);
      say(`${voice(plan.head)} Chọn phép tính.`, `👆 Chọn <b>phép tính</b>.`);
    }
    async function pickOp(i, b) {
      const [text, ok, why] = opts[i];
      if (!ok) { wrong(b, `${why || ''}${plan.rule}`, `${why || ''}<b>${plan.short}</b>`); return; }
      stepNow = 'busy';
      b.classList.add('g3d-choice-ok');
      btns.forEach(x => { x.disabled = true; if (x !== b) x.classList.add('g3a-btn-off'); });
      setActive(paper, null);
      await sleep(flyDigit(text, b, slot, { onLand: () => { slot.textContent = text; slot.classList.add('g3a-slot-done'); sfx.pop(2); } }) + 120);
      stepNum();
    }

    // 2. Gõ kết quả từng dòng
    function stepNum() {
      const s = st[si];
      const row = rowEl(si);
      row.classList.remove('g3a-hide');
      const box = boxEl(si);
      stepNow = 'num';
      setActive(paper, box);
      if (isCells) say(`${voice(plan.head)} Đếm số ô vuông 1 xăng-ti-mét vuông của hình ${m.name}.`, `Đếm số <b>ô vuông 1 cm²</b> rồi gõ.`);
      else say(`Tính ${voice(s.calc)}.`, `Tính <b>${s.calc}</b>.`);
      const want = {
        max: String(s.v).length + 1,
        onType: (t) => { box.textContent = t; },
        onSubmit: (t) => {
          if (Number(t) !== s.v) {
            box.textContent = '';
            if (isCells) wrong(box, `Đếm từng hàng: ${plan.rows.map(n => `${n} ô`).join(', ')}.`);
            else wrong(box, `${s.calc} = ${s.v}.`);
            pad.want(want);
            return;
          }
          pad.off();
          setActive(paper, null);
          box.classList.add('g3d-box-ok');
          sfx.pop(3);
          si++;
          stepNow = 'busy';
          if (isCells) setTimeout(countCells, 300);
          else if (si < st.length) setTimeout(stepNum, 400);
          else if (unitAsk) setTimeout(stepUnit, 400);
          else setTimeout(check, 400);
        },
      };
      pad.want(want);
    }

    // 3. Chọn đơn vị (cấp đếm ô, cấp trộn)
    function stepUnit() {
      stepNow = 'unit';
      units = ['cm', 'cm²'];
      setButtons(units);
      setActive(paper, unitEl);
      say('Viết đơn vị gì?', '👆 Chọn <b>đơn vị</b>.');
    }
    async function pickUnit(i, b) {
      const u = units[i];
      if (u !== plan.unit) {
        wrong(b, plan.unit === 'cm' ? 'Chu vi là độ dài, đo bằng xăng-ti-mét, viết cm.' : 'Diện tích đo bằng xăng-ti-mét vuông, viết cm².');
        return;
      }
      stepNow = 'busy';
      b.classList.add('g3d-choice-ok');
      btns.forEach(x => { x.disabled = true; if (x !== b) x.classList.add('g3a-btn-off'); });
      setActive(paper, null);
      const txt = isCells ? u : `(${u})`;
      await sleep(flyDigit(txt, b, unitEl, { onLand: () => { unitEl.textContent = txt; unitEl.classList.add('g3a-unit-done'); sfx.pop(3); } }) + 150);
      if (isCells) finish();
      else check();
    }

    // Đếm ô (cấp 2): đánh số từng ô theo hàng, số ô bay xuống dòng diện tích.
    async function countCells() {
      say('Cùng đếm lại!', 'Đếm lại từng ô.');
      const g = svg.querySelector('.g3a-nums');
      const order = m.cells.map((c, i) => [c, i]).sort((p, q) => p[0][1] - q[0][1] || p[0][0] - q[0][0]);
      const gap = calmMotion() ? 260 : 150;
      for (let k = 0; k < order.length; k++) {
        const [[x, y], i] = order[k];
        const t = document.createElementNS(NS, 'text');
        Object.entries({ x: x + 0.5, y: y + 0.54, 'text-anchor': 'middle', 'dominant-baseline': 'central', class: 'g3a-num' }).forEach(([a, v]) => t.setAttribute(a, v));
        t.textContent = k + 1;
        g.appendChild(t);
        svg.querySelector(`[data-cell="${i}"]`).setAttribute('fill', '#FDE68A');
        sfx.pop(k % 8);
        await sleep(gap);
      }
      await sleep(250);
      const r1 = rowEl(1), b1 = boxEl(1);
      r1.classList.remove('g3a-hide');
      await sleep(flyDigit(String(plan.answer), boxEl(0), b1, { onLand: () => { b1.textContent = plan.answer; b1.classList.add('g3d-box-ok'); sfx.pop(4); } }) + 200);
      stepUnit();
    }

    // 4. Kiểm chứng trên hình
    async function check() {
      stepNow = 'busy';
      if (m.ask === 'P') await antWalk();
      else await fillRows();
      finish();
    }

    /** Con kiến bò một vòng quanh hình, nét đã đi tô cam, số trên biển cộng dần độ dài đã đi. */
    async function antWalk() {
      say('Con kiến đi một vòng quanh hình!', '🐜 Kiến đi <b>một vòng</b> quanh hình.');
      const P = pointsOf(m);
      const lens = P.map((p, i) => Math.round(dist(p, P[(i + 1) % P.length])));
      const ant = svg.querySelector('.g3a-ant'), pill = svg.querySelector('.g3a-pill'), pillT = pill.querySelector('text'), pillR = pill.querySelector('rect');
      const calm = calmMotion();
      const perCm = calm ? 190 : 105;
      let total = 0, shownN = -1;
      const setPill = (n, x, y, nx, ny) => {
        const txt = String(n);
        const w = Math.max(1.1, txt.length * 0.42 + 0.6);
        pillR.setAttribute('x', -w / 2); pillR.setAttribute('width', w);
        if (n !== shownN) { pillT.textContent = txt; shownN = n; }
        pill.setAttribute('transform', `translate(${x + nx * 1.05} ${y + ny * 1.05})`);
      };
      ant.setAttribute('opacity', '1');
      pill.setAttribute('opacity', '1');
      for (let i = 0; i < P.length; i++) {
        const p = P[i], q = P[(i + 1) % P.length], L = lens[i];
        const ang = Math.atan2(q[1] - p[1], q[0] - p[0]) * 180 / Math.PI;
        const lab = sideLabel(P, i, `${L} cm`);
        const line = svg.querySelector(`[data-walk="${i}"]`);
        const dur = 250 + L * perCm;
        await new Promise((res) => {
          const t0 = performance.now();
          let ticks = 0;
          const frame = () => {
            if (!svg.isConnected) { res(); return; }
            const t = Math.max(0, Math.min(1, (performance.now() - t0) / dur));
            const x = p[0] + (q[0] - p[0]) * t, y = p[1] + (q[1] - p[1]) * t;
            ant.setAttribute('transform', `translate(${x} ${y}) rotate(${ang})`);
            line.setAttribute('x2', x); line.setAttribute('y2', y);
            const n = total + Math.floor(L * t + 1e-6);
            if (Math.floor(L * t + 1e-6) > ticks) { ticks = Math.floor(L * t + 1e-6); sfx.tick(); }
            setPill(n, x, y, lab.nx, lab.ny);
            if (t < 1) setTimeout(frame, 16); else res();
          };
          frame();
        });
        total += L;
        const lenEl = svg.querySelector(`[data-len="${i}"]`);
        lenEl.classList.remove('g3a-len-off');
        lenEl.classList.add('g3a-len-hit');
        sfx.pop(i + 2);
        await sleep(calm ? 260 : 140);
      }
      // Về tới đỉnh đầu: biển ghi chu vi, bay xuống ô kết quả.
      pillT.textContent = `${total} cm`;
      const w = `${total} cm`.length * 0.42 + 0.6;
      pillR.setAttribute('x', -w / 2); pillR.setAttribute('width', w);
      pill.classList.add('g3a-pill-done');
      // Biển chu vi về giữa hình cho dễ đọc
      const mx = P.reduce((a, p) => a + p[0], 0) / P.length, my = P.reduce((a, p) => a + p[1], 0) / P.length;
      pill.setAttribute('transform', `translate(${mx} ${my}) scale(1.3)`);
      ant.classList.add('g3a-ant-off'); // kiến về chỗ cũ rồi lui đi, không che tên đỉnh
      sfx.ding();
      await sleep(500);
      const target = boxEl(st.length - 1);
      await sleep(flyDigit(String(total), pill, target, { onLand: () => { target.classList.add('g3d-ok-flash', 'g3a-final'); sfx.pop(5); } }) + 300);
    }

    /** Từng hàng ô vuông 1 cm² bay vào phủ kín hình, bên phải ghi số ô cộng dần. */
    async function fillRows() {
      say('Xếp các ô vuông 1 xăng-ti-mét vuông phủ kín hình!', '⬜ Xếp ô vuông <b>1 cm²</b> phủ kín hình.');
      const strip = (n) => `<div style="display:flex;width:100%;height:100%">${Array.from({ length: n }, () => `<div style="flex:1;background:${COL.row};border:2px solid ${COL.rowEdge};box-sizing:border-box"></div>`).join('')}</div>`;
      const top = svg.querySelector('[data-rowbox="0"]').getBoundingClientRect();
      for (let r = 0; r < m.h; r++) {
        const to = svg.querySelector(`[data-rowbox="${r}"]`).getBoundingClientRect();
        const from = { left: to.left, top: top.top - to.height * 2.2, width: to.width, height: to.height };
        await sleep(flyOne(strip(m.w), from, to, { minMs: 300, maxMs: 520, onLand: () => {
          svg.querySelector(`[data-row="${r}"]`).setAttribute('opacity', '1');
          svg.querySelector(`[data-rowsum="${r}"]`).setAttribute('opacity', '1');
          sfx.pop(r);
        } }) + 60);
      }
      const last = svg.querySelector(`[data-rowsum="${m.h - 1}"]`);
      last.classList.add('g3a-rowsum-done');
      sfx.ding();
      await sleep(400);
      const target = boxEl(st.length - 1);
      await sleep(flyDigit(String(plan.answer), last, target, { onLand: () => { target.classList.add('g3d-ok-flash', 'g3a-final'); sfx.pop(5); } }) + 300);
    }

    async function finish() {
      stepNow = 'done';
      await sleep(300);
      const what = isCells ? `Diện tích hình ${m.name} là ${plan.answer} cm².` : `${plan.label.replace(/ là:$/, '')} là ${plan.answer} ${plan.unit}.`;
      done(mistakes, { ok: what, tip: tip ? `Nhớ: ${tip}` : '' });
    }

    if (isCells) {
      setButtons(['cm', 'cm²']);
      btns.forEach(b => { b.disabled = true; });
      stepNum();
    } else stepOp();

    if (import.meta.env.DEV) {
      window.__g3drill = { m, step: () => {
        if (stepNow === 'op') btns[opts.findIndex(o => o[1])]?.click();
        else if (stepNow === 'num') pad.type(String(st[si].v));
        else if (stepNow === 'unit') btns[units.indexOf(plan.unit)]?.click();
      }, wrong: () => {
        if (stepNow === 'op') btns[opts.findIndex(o => !o[1])]?.click();
        else if (stepNow === 'num') pad.type(String(st[si].v + 1));
        else if (stepNow === 'unit') btns[units.findIndex(u => u !== plan.unit)]?.click();
      } };
    }
  },
};

let arStyles = false;
function injectAreaStyles() {
  if (arStyles) return;
  arStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g3a { flex: 1; min-height: 0; display: grid; gap: 1.4cqh 2cqi; padding: 1.4cqh 2.4cqi 2cqh calc(clamp(1.4rem, 4cqi, 3rem) + 1.6cqi);
      grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr) minmax(0, 0.48fr);
      grid-template-areas: "head head" "fig ch" "lines lines"; font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .g3a > * { min-height: 0; min-width: 0; }
    .g3a-head { grid-area: head; font-size: min(6.4cqh, 3.8cqi, 2.6rem); line-height: 1.25; color: #334155; }
    .g3a-kP { color: #EA580C; }
    .g3a-kA { color: #059669; }
    .g3a-fig { grid-area: fig; display: flex; border-radius: 0.8rem; overflow: hidden; border: 2px solid #DBEAFE; background: #fff; }
    .g3a-svg { flex: 1; width: 100%; height: 100%; display: block; }
    .g3a-len { font: 800 ${LEN_FS}px 'Baloo 2', sans-serif; fill: #1E3A8A; paint-order: stroke; stroke: #fff; stroke-width: 0.14px; }
    .g3a-len-off { opacity: 0; }
    .g3a-len-hit { fill: #C2410C; }
    .g3a-vx { font: 800 0.66px 'Baloo 2', sans-serif; fill: #334155; paint-order: stroke; stroke: #fff; stroke-width: 0.12px; }
    .g3a-num { font: 800 0.56px 'Baloo 2', sans-serif; fill: #7C2D12; animation: g3aPop .25s ease-out; }
    .g3a-rowsum { font: 800 0.58px 'Baloo 2', sans-serif; fill: #B45309; dominant-baseline: central; transition: opacity .2s; }
    .g3a-rowsum-done { fill: #15803D; }
    .g3a-pill text { font: 800 0.6px 'Baloo 2', sans-serif; fill: #C2410C; }
    .g3a-pill-done rect { stroke: #16A34A; fill: #DCFCE7; }
    .g3a-pill-done text { fill: #15803D; }
    @keyframes g3aPop { from { opacity: 0; } }
    .g3a-ant-off { opacity: 0; transition: opacity .5s; }

    .g3a-choices { grid-area: ch; container-type: size; display: flex; flex-direction: column; gap: 4cqh; padding: 1cqh 0 2.4cqh; box-sizing: border-box; }
    .g3a-btn { flex: 1 1 0; min-height: 0; width: 100%; max-width: none; font-size: min(17cqh, calc(84cqi / (var(--n, 8) * 0.58)), 3.4rem); overflow: hidden; line-height: 1; white-space: nowrap; }
    .g3a-btn-void { visibility: hidden; }
    .g3a-btn-off { opacity: 0.55; }
    .g3a-cells .g3a-choices .g3a-btn:disabled:not(.g3d-choice-ok) { opacity: 0.6; }

    .g3a-lines { grid-area: lines; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .g3a-lg { display: grid; grid-template-columns: auto auto; grid-auto-rows: 1.6em; align-items: center; column-gap: 0.25em; width: max-content; line-height: 1; }
    .g3a-lg > * { display: flex; align-items: center; gap: 0.2em; white-space: nowrap; }
    .g3a-span { grid-column: 1 / -1; }
    .g3a-label { font-size: 0.6em; color: #475569; font-weight: 700; }
    .g3a-lg-sol { grid-template-rows: 1.05em 1.6em 1.6em; }
    .g3a-left { justify-content: flex-end; }
    .g3a-hide { visibility: hidden; }
    .g3a-slot { display: inline-grid; place-items: center; height: 1.3em; padding: 0 0.15em; border: 0.06em dashed #93C5FD; border-radius: 0.2em; color: #94A3B8; box-sizing: border-box; }
    .g3a-slot-done { border-color: transparent; color: #1E293B; }
    .g3a-unit { display: inline-grid; place-items: center; min-width: 2.6em; height: 1.3em; border: 0.06em dashed #93C5FD; border-radius: 0.2em; color: #94A3B8; box-sizing: border-box; }
    .g3a-unit-done { border-color: transparent; color: #1E293B; }
    .g3a-u { color: #475569; }
    .g3a .g3d-box { height: 1.3em; }
    .g3a-final { background: #DCFCE7; border-color: #22C55E; color: #15803D; }

    /* Tờ vở gần vuông / đứng: hình trên cả bề ngang, hàng nút chọn, rồi bài giải cả bề ngang. */
    .g3a-scene .g3d-paper { container-name: g3apaper; }
    .g3a-choices { container-name: g3ach; }
    @container g3apaper (aspect-ratio < 1.3) {
      .g3a { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1.3fr) minmax(0, 0.34fr) minmax(0, 0.72fr);
        grid-template-areas: "head" "fig" "ch" "lines"; }
      .g3a-choices { flex-direction: row; gap: 3cqi; padding: 0 0 1.6cqh; }
    }
    @container g3ach (aspect-ratio > 2.5) {
      .g3a-btn { font-size: min(44cqh, calc(26cqi / (var(--n, 8) * 0.58)), 3rem); }
    }
    @media (prefers-reduced-motion: reduce) {
      .g3a-num { animation: g3aPop .4s ease; }
    }
  `;
  document.head.appendChild(st);
}
