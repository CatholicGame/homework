/**
 * 📍 Điểm ở giữa, trung điểm (Toán 3 KNTT Tập 1, Bài 16 "Điểm ở giữa, trung điểm của đoạn thẳng"; Luyện tập Tuần 7).
 * Các dạng đề (mỗi lượt một dạng, bố cục cố định trong lượt):
 *   mid    Giấy ô vuông, vài điểm: "Điểm nào là điểm ở giữa hai điểm A và B?" / "O là điểm ở giữa hai điểm nào?".
 *          Bẫy: điểm sát bên nhưng không thẳng hàng, điểm thẳng hàng nhưng nằm ngoài đoạn AB. Đúng thì nét cam kẻ
 *          từ A tới B đi qua O.
 *   pick   Đoạn thẳng AB đặt trên thước cm, ba điểm: trung điểm, điểm ở giữa nhưng không chia đôi, điểm nằm ngoài
 *          đoạn thẳng. Chọn trung điểm; kiểm chứng bằng hai mũi tên đo AM, MB rồi gấp đôi đoạn thẳng (A trùng B).
 *   place  Thước cm: gõ độ dài AB (A có thể không ở vạch 0), gõ AM = AB : 2, chạm vạch thước để chấm điểm M.
 *   calc   "Đoạn thẳng AB dài 12 cm, M là trung điểm của AB. Đoạn thẳng AM dài … cm." (và ngược lại: biết nửa, tìm
 *          cả đoạn). Chọn phép tính, gõ kết quả, rồi gấp nửa đoạn sang nửa kia để kiểm chứng.
 *   rect   Hình chữ nhật ABCD trên giấy ô vuông: "Điểm nào là trung điểm của cạnh AB?"; đếm ô từ hai đầu cạnh.
 * Sai: rung đỏ, thầy nhắc đúng chỗ sai (không thẳng hàng, hai bên không bằng nhau, quên chia 2…), tính vào done(mistakes).
 * Mọi vùng (hình, nút chọn, các dòng bài giải, bàn phím) có chỗ từ đầu lượt, chỉ hiện dần, không xô gì.
 */

import { mountDrill, shake, setActive, flyDigit, flyOne, calmMotion, fresh, sfx, sleep, how, TEACHER, INK } from './kit.js';

const NS = 'http://www.w3.org/2000/svg';
// Tên điểm trong sách lớp 3 (không dùng F, J).
const LETTERS = 'ABCDEGHIKMNOPQ'.split('');
const COL = { seg: '#1E3A8A', pt: '#1E293B', hi: '#F97316', ok: '#16A34A', bad: '#DC2626', guide: '#94A3B8', ruler: '#FDE68A', rulerEdge: '#B45309', tick: '#78350F', cellA: '#FED7AA', cellB: '#BBF7D0' };

/** Chữ cho giọng đọc. */
const voice = (s) => s.replace(/<[^>]*>/g, '').replace(/…\s*cm/g, 'bao nhiêu xăng-ti-mét').replace(/\bcm\b/g, 'xăng-ti-mét')
  .replace(/×/g, 'nhân').replace(/ : /g, ' chia ').replace(/−/g, 'trừ').replace(/[()]/g, '');

/** Chờ từng nhịp (setTimeout: chạy cả khi tab chụp màn hình không vẽ khung). */
function tween(ms, fn, alive) {
  return new Promise((res) => {
    const t0 = performance.now();
    const f = () => {
      if (!alive()) { res(); return; }
      const t = Math.min(1, (performance.now() - t0) / ms);
      fn(t);
      if (t < 1) setTimeout(f, 16); else res();
    };
    f();
  });
}
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const sortedPair = (p, q) => (p < q ? `${p} và ${q}` : `${q} và ${p}`);

// ── Đề ───────────────────────────────────────────────────────────────────────────────────────────────
const GW = 11, GH = 6; // lưới điểm (ô vuông) của dạng mid
const STEPS = [[1, 0], [0, 1], [1, 1], [1, -1], [1, 0], [1, 1], [2, 1], [1, 2], [2, -1], [1, -2]];
const inGrid = ([x, y]) => x >= 0 && x <= GW && y >= 0 && y <= GH;
const cross = (u, v) => u[0] * v[1] - u[1] * v[0];

function makeMid(rng, ask) {
  for (let t = 0; t < 400; t++) {
    const st = rng.pick(STEPS);
    const unit = Math.abs(st[0]) + Math.abs(st[1]) === 1 || (Math.abs(st[0]) === 1 && Math.abs(st[1]) === 1);
    const g = unit ? rng.int(3, 6) : rng.int(2, 4);
    const A = [rng.int(0, GW), rng.int(0, GH)];
    const B = [A[0] + st[0] * g, A[1] + st[1] * g];
    if (!inGrid(B)) continue;
    const k = rng.int(1, g - 1);
    const O = [A[0] + st[0] * k, A[1] + st[1] * k];
    // Bẫy 1: điểm sát O nhưng không thẳng hàng với A, B.
    const near = [];
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
      const p = [O[0] + dx, O[1] + dy];
      if ((dx || dy) && cross(st, [dx, dy]) !== 0 && inGrid(p)) near.push(p);
    }
    if (near.length < 2) continue;
    const X = rng.pick(near);
    const side = Math.sign(cross(st, [X[0] - A[0], X[1] - A[1]]));
    // Bẫy 2 (hỏi điểm): thẳng hàng nhưng nằm ngoài đoạn AB; không vừa lưới thì một điểm sát O phía bên kia.
    const outs = [[A[0] - st[0], A[1] - st[1]], [B[0] + st[0], B[1] + st[1]]].filter(inGrid);
    let Y = outs.length ? rng.pick(outs) : null, yKind = 'out';
    if (!Y) {
      const other = near.filter(p => Math.sign(cross(st, [p[0] - A[0], p[1] - A[1]])) === side && (p[0] !== X[0] || p[1] !== X[1]));
      if (!other.length) continue;
      Y = rng.pick(other); yKind = 'off';
    }
    const nm = rng.shuffle(LETTERS).slice(0, 5);
    const [a, b] = [nm[0], nm[1]].sort();
    return { type: 'mid', ask, a, b, o: nm[2], x: nm[3], y: nm[4], yKind, side, st,
      pts: { [a]: A, [b]: B, [nm[2]]: O, [nm[3]]: X, [nm[4]]: Y } };
  }
  return makeMid(rng, ask);
}

/** Đoạn thẳng trên thước 0–15 cm: A ở vạch a0, B ở vạch a0 + len (len chẵn). */
function makeRuler(rng, type) {
  const a0 = rng() < 0.4 ? 0 : rng.int(1, 3);
  let len = 2 * rng.int(2, 6);
  while (a0 + len > 15) len -= 2;
  const pair = rng.pick([['A', 'B'], ['C', 'D'], ['M', 'N'], ['P', 'Q'], ['E', 'G']]);
  const rest = rng.shuffle(LETTERS.filter(l => !pair.includes(l)));
  const half = len / 2;
  let k = half;
  while (k === half) k = rng.int(1, len - 1);
  return { type, R: Math.min(15, Math.max(8, a0 + len + 2)), a: pair[0], b: pair[1], m: type === 'place' ? (pair.includes('M') ? 'I' : 'M') : rest[0], o: rest[1], p: rest[2], a0, len, half, k };
}

const SEGS = [['A', 'B', 'M'], ['C', 'D', 'I'], ['E', 'G', 'O'], ['M', 'N', 'I'], ['P', 'Q', 'O'], ['C', 'D', 'K']];
/** fwd: biết cả đoạn, tìm một nửa; rev: biết một nửa, tìm cả đoạn. Nửa được hỏi có thể ở bên trái hay bên phải. */
function makeCalc(rng, dir) {
  const [a, b, m] = rng.pick(SEGS);
  const right = rng() < 0.4;
  const names = right ? [`${m}${b}`, `${b}${m}`] : [`${a}${m}`, `${m}${a}`];
  const halfName = rng() < 0.75 ? names[0] : names[1];
  const half = dir === 'fwd' ? rng.int(2, 10) : rng.int(2, 10);
  return { type: 'calc', dir, a, b, m, right, halfName, half, whole: half * 2 };
}

const SIDES = ['AB', 'BC', 'CD', 'DA'];
function makeRect(rng) {
  let w, h;
  do { w = 2 * rng.int(2, 5); h = 2 * rng.int(2, 3); } while (w === h);
  const s = rng.int(0, 3);
  const len = s % 2 ? h : w;
  const s2 = (s + (rng() < 0.5 ? 1 : 3)) % 4;
  let k = len / 2;
  while (k === len / 2) k = rng.int(1, len - 1);
  const nm = rng.shuffle(LETTERS.filter(l => !'ABCD'.includes(l))).slice(0, 3);
  return { type: 'rect', w, h, s, s2, k, len, half: len / 2, mid: nm[0], non: nm[1], adj: nm[2] };
}

function makeOne(rng, kind) {
  if (kind === 'midP') return makeMid(rng, 'point');
  if (kind === 'midQ') return makeMid(rng, 'pair');
  if (kind === 'pick' || kind === 'place') return makeRuler(rng, kind);
  if (kind === 'fwd' || kind === 'rev') return makeCalc(rng, kind);
  return makeRect(rng);
}

const LEVEL = (id, n, title, desc, knowledge, plan, ask) => ({
  id, n, title, desc, knowledge, lessons: { workbook: ['bai-16'], practice: ['tuan-7'] }, missions: plan.length, ask: () => ask,
  gen: (rng, k) => makeOne(rng, plan[k % plan.length]),
});

export const MIDPOINT_LEVELS = [
  LEVEL('drill-mid-1', 1, 'Điểm ở giữa', 'Vd. A, O, B thẳng hàng, O nằm giữa A và B: O là điểm ở giữa hai điểm A và B.',
    'ba điểm thẳng hàng, điểm ở giữa hai điểm', ['midP', 'midQ', 'midP', 'midQ', 'midP'],
    'Điểm ở giữa phải thẳng hàng với hai điểm kia!'),
  LEVEL('drill-mid-2', 2, 'Trung điểm trên thước', 'Vd. AB = 6 cm, AM = MB = 3 cm: M là trung điểm của đoạn thẳng AB.',
    'trung điểm của đoạn thẳng, đo bằng thước', ['pick', 'place', 'pick', 'place'],
    'Trung điểm chia đoạn thẳng thành hai phần bằng nhau!'),
  LEVEL('drill-mid-3', 3, 'Tính độ dài', 'Vd. AB = 12 cm, M là trung điểm của AB: AM = 12 : 2 = 6 (cm).',
    'trung điểm, một nửa độ dài đoạn thẳng', ['fwd', 'rev', 'fwd', 'rev', 'fwd'],
    'Trung điểm: mỗi nửa bằng một nửa cả đoạn!'),
  LEVEL('drill-mid-4', 4, 'Trộn các dạng', 'Điểm ở giữa, trung điểm trên thước, tính độ dài, trung điểm cạnh hình chữ nhật.',
    'điểm ở giữa, trung điểm của đoạn thẳng, cạnh hình chữ nhật', ['midP', 'rect', 'pick', 'fwd', 'place', 'rect'],
    'Đọc kĩ đề: điểm ở giữa hay trung điểm?'),
];

// ── Hình vẽ (SVG) ─────────────────────────────────────────────────────────────────────────────────────
let uid = 0;
const gridBg = (id) => `<defs><pattern id="g3m-grid-${id}" width="1" height="1" patternUnits="userSpaceOnUse"><path d="M1 0 H0 V1" fill="none" stroke="#BFDBFE" stroke-width="0.04"/></pattern></defs>
  <rect x="-60" y="-60" width="160" height="140" fill="url(#g3m-grid-${id})"/>`;
const ptSvg = (name, [x, y], [lx, ly], r = 0.2) => `<g class="g3m-pt" data-pt="${name}"><circle class="g3m-dot" cx="${x}" cy="${y}" r="${r}"/>
  <text class="g3m-lbl" x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="central">${name}</text></g>`;
/** Ngoặc nhọn từ x1 tới x2 ở độ cao y (d = 1: mũi nhọn xuống dưới, -1: lên trên). */
const brace = (x1, x2, y, d) => {
  const h = 0.32 * d, m = (x1 + x2) / 2;
  return `M${x1} ${y} Q${x1} ${y + h} ${x1 + 0.35} ${y + h} L${m - 0.35} ${y + h} Q${m} ${y + h} ${m} ${y + 2 * h} Q${m} ${y + h} ${m + 0.35} ${y + h} L${x2 - 0.35} ${y + h} Q${x2} ${y + h} ${x2} ${y}`;
};

function figMid(m, id) {
  const P = m.pts;
  const A = P[m.a], B = P[m.b];
  const len = Math.hypot(m.st[0], m.st[1]);
  let nx = -m.st[1] / len, ny = m.st[0] / len;
  // Tên các điểm trên đường thẳng AB nằm phía không có điểm bẫy (không đè lên điểm bẫy).
  if (Math.sign(nx * (P[m.x][0] - A[0]) + ny * (P[m.x][1] - A[1])) >= 0) { nx = -nx; ny = -ny; }
  const onLine = (p) => cross(m.st, [p[0] - A[0], p[1] - A[1]]) === 0;
  let s = gridBg(id);
  s += `<line class="g3m-guide" x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" opacity="0"/>`;
  s += `<line class="g3m-guide g3m-guide2" opacity="0"/>`;
  s += `<line class="g3m-draw" x1="${A[0]}" y1="${A[1]}" x2="${A[0]}" y2="${A[1]}"/>`;
  const names = m.ask === 'point' ? [m.a, m.b, m.o, m.x, m.y] : [m.a, m.b, m.o, m.x];
  for (const n of names) {
    const p = P[n];
    const off = onLine(p) ? [nx, ny] : [-nx, -ny];
    s += ptSvg(n, p, [p[0] + off[0] * 0.62, p[1] + off[1] * 0.62]);
  }
  const xs = names.map(n => P[n][0]), ys = names.map(n => P[n][1]);
  return { svg: s, bb: { x0: Math.min(...xs) - 1.4, y0: Math.min(...ys) - 1.4, x1: Math.max(...xs) + 1.4, y1: Math.max(...ys) + 1.4 }, box: [7.5, 5.2] };
}

const RY = 0.12; // mép trên của thước, sát dưới đoạn thẳng
function rulerSvg(RULER_LEN) {
  let s = `<g class="g3m-ruler"><rect class="g3m-ruler-body" x="-0.6" y="${RY}" width="${RULER_LEN + 1.2}" height="1.75" rx="0.14"/>`;
  for (let i = 0; i <= RULER_LEN * 10; i++) {
    const x = i / 10, big = i % 10 === 0, mid = i % 5 === 0;
    s += `<line x1="${x}" y1="${RY}" x2="${x}" y2="${RY + (big ? 0.55 : mid ? 0.38 : 0.22)}" stroke="${COL.tick}" stroke-width="${big ? 0.05 : 0.025}"/>`;
  }
  for (let v = 0; v <= RULER_LEN; v++) s += `<text class="g3m-rnum" data-rn="${v}" x="${v}" y="${RY + 1.05}" text-anchor="middle" dominant-baseline="central">${v}</text>`;
  s += `<text class="g3m-runit" x="${RULER_LEN + 0.15}" y="${RY + 1.5}" text-anchor="middle" dominant-baseline="central">cm</text>`;
  return `${s}</g>`;
}
const rulerHits = (RULER_LEN) => Array.from({ length: RULER_LEN + 1 }, (_, v) => `<rect class="g3m-hit" data-v="${v}" x="${v - 0.5}" y="-0.9" width="1" height="${RY + 2.7}"/>`).join('');

function figRuler(m) {
  const X = (cm) => m.a0 + cm;
  const xm = X(m.half);
  let s = `<rect x="-60" y="-60" width="160" height="140" fill="#fff"/>`;
  s += rulerSvg(m.R);
  s += `<line class="g3m-seg" x1="${X(0)}" y1="0" x2="${X(m.len)}" y2="0"/>`;
  s += `<g class="g3m-ms"></g>`;
  s += `<g class="g3m-fold" opacity="0"><line x1="${X(0)}" y1="0" x2="${xm}" y2="0" stroke="${COL.hi}" stroke-width="0.2" stroke-linecap="round"/><circle cx="${X(0)}" cy="0" r="0.2" fill="${COL.hi}"/></g>`;
  s += ptSvg(m.a, [X(0), 0], [X(0), -0.6], 0.18) + ptSvg(m.b, [X(m.len), 0], [X(m.len), -0.6], 0.18);
  if (m.type === 'pick') {
    s += ptSvg(m.m, [xm, 0], [xm, -0.6], 0.18) + ptSvg(m.o, [X(m.k), 0], [X(m.k), -0.6], 0.18);
    s += ptSvg(m.p, [xm, -1.3], [xm + 0.55, -1.35], 0.18);
  } else {
    s += `<g class="g3m-newpt" opacity="0">${ptSvg(m.m, [xm, 0], [xm, -0.6], 0.2)}</g>`;
    s += `<g class="g3m-marks"></g>` + rulerHits(m.R);
  }
  return { svg: s, bb: { x0: -1, y0: -2.9, x1: m.R + 1, y1: RY + 2.1 }, box: [m.R + 2, 5.2] };
}

function figCalc(m) {
  const L = 10, M = 5;
  const halfX = m.right ? [M, L] : [0, M];
  const otherX = m.right ? [0, M] : [M, L];
  const halfLbl = m.dir === 'fwd' ? '? cm' : `${m.half} cm`;
  const wholeLbl = m.dir === 'fwd' ? `${m.whole} cm` : '? cm';
  let s = `<rect x="-60" y="-60" width="160" height="140" fill="#fff"/>`;
  s += `<path class="g3m-brace g3m-brace-h" d="${brace(halfX[0] + 0.1, halfX[1] - 0.1, -0.85, -1)}"/>
    <text class="g3m-blbl" data-bl="half" x="${(halfX[0] + halfX[1]) / 2}" y="-1.95" text-anchor="middle" dominant-baseline="central">${halfLbl}</text>`;
  s += `<g class="g3m-other" opacity="0"><path class="g3m-brace g3m-brace-h" d="${brace(otherX[0] + 0.1, otherX[1] - 0.1, -0.85, -1)}"/>
    <text class="g3m-blbl" data-bl="other" x="${(otherX[0] + otherX[1]) / 2}" y="-1.95" text-anchor="middle" dominant-baseline="central">${m.half} cm</text></g>`;
  s += `<path class="g3m-brace g3m-brace-w" d="${brace(0, L, 0.42, 1)}"/>
    <text class="g3m-blbl g3m-blbl-w" data-bl="whole" x="${M}" y="1.75" text-anchor="middle" dominant-baseline="central">${wholeLbl}</text>`;
  s += `<line class="g3m-seg" x1="0" y1="0" x2="${L}" y2="0"/>`;
  s += `<line class="g3m-halfhi" x1="${halfX[0]}" y1="0" x2="${halfX[1]}" y2="0"/>`;
  const from = m.right ? L : 0;
  s += `<g class="g3m-fold" opacity="0"><line x1="${from}" y1="0" x2="${M}" y2="0" stroke="${COL.hi}" stroke-width="0.2" stroke-linecap="round"/><circle cx="${from}" cy="0" r="0.2" fill="${COL.hi}"/></g>`;
  s += ptSvg(m.a, [0, 0], [-0.6, 0], 0.18) + ptSvg(m.b, [L, 0], [L + 0.6, 0], 0.18) + ptSvg(m.m, [M, 0], [M, -0.5], 0.18);
  return { svg: s, bb: { x0: -1.2, y0: -2.6, x1: L + 1.2, y1: 2.3 }, box: [12.4, 4.9] };
}

const sideEnds = (m) => {
  const V = [[0, 0], [m.w, 0], [m.w, m.h], [0, m.h]];
  return (s) => [V[s], V[(s + 1) % 4]];
};
/** Điểm trên cạnh s cách đầu cạnh k ô. */
const onSide = (m, s, k) => { const [p, q] = sideEnds(m)(s); const L = s % 2 ? m.h : m.w; return [p[0] + (q[0] - p[0]) * k / L, p[1] + (q[1] - p[1]) * k / L]; };
const OUTN = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // pháp tuyến ra ngoài của cạnh AB, BC, CD, DA

function figRect(m, id) {
  let s = gridBg(id);
  s += `<rect class="g3m-rect" x="0" y="0" width="${m.w}" height="${m.h}"/>`;
  s += `<g class="g3m-cells"></g>`;
  s += `<line class="g3m-sidehi" opacity="0"/>`;
  s += `<rect class="g3m-rect-edge" x="0" y="0" width="${m.w}" height="${m.h}"/>`;
  const V = [[0, 0], [m.w, 0], [m.w, m.h], [0, m.h]];
  V.forEach((p, i) => { s += `<text class="g3m-lbl" x="${p[0] + (i === 1 || i === 2 ? 0.5 : -0.5)}" y="${p[1] + (i < 2 ? -0.45 : 0.5)}" text-anchor="middle" dominant-baseline="central">${'ABCD'[i]}</text>`; });
  const put = (name, s2, k) => {
    const p = onSide(m, s2, k), n = OUTN[s2];
    return ptSvg(name, p, [p[0] + n[0] * 0.62, p[1] + n[1] * 0.62]);
  };
  const L2 = m.s2 % 2 ? m.h : m.w;
  s += put(m.mid, m.s, m.half) + put(m.non, m.s, m.k) + put(m.adj, m.s2, L2 / 2);
  return { svg: s, bb: { x0: -1.3, y0: -1.3, x1: m.w + 1.3, y1: m.h + 1.3 }, box: [10, 6.6] };
}

const figureOf = (m, id) => (m.type === 'mid' ? figMid(m, id) : m.type === 'rect' ? figRect(m, id) : m.type === 'calc' ? figCalc(m) : figRuler(m));

/** viewBox theo đúng tỉ lệ khung: hình ở giữa, cỡ như nhau mọi lượt của cùng dạng. */
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

/** Cỡ chữ to nhất để khối các dòng bài giải vừa khung (đo lại khi khung đổi cỡ, không đổi trong lượt). */
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

// ── Lời giải từng dạng: đề, các dòng, các nút chọn ─────────────────────────────────────────────────────
const slot = (w) => `<span class="g3m-slot" style="min-width:${w}em" data-slot>…</span>`;
const box = (n, w = 1.6) => `<span class="g3d-box" style="--boxw:${w}em" data-b="${n}"></span>`;
const optW = (opts) => Math.max(1.2, ...opts.map(o => o[0].length * 0.55 + 0.5));

function planOf(m) {
  if (m.type === 'mid' && m.ask === 'point') {
    const opts = [[m.o, true], [m.x, false, 'off'], [m.y, false, m.yKind]];
    return { layout: 'side', opts, head: `Điểm nào là <b>điểm ở giữa</b> hai điểm ${m.a} và ${m.b}?`,
      rows: [`${slot(optW(opts))} là điểm ở giữa hai điểm ${m.a} và ${m.b}.`, `${m.a}, ${m.o}, ${m.b} thẳng hàng.`] };
  }
  if (m.type === 'mid') {
    const opts = [[sortedPair(m.a, m.b), true], [sortedPair(m.a, m.x), false, 'pair'], [sortedPair(m.x, m.b), false, 'pair']];
    return { layout: 'side', opts, head: `${m.o} là <b>điểm ở giữa</b> hai điểm nào?`,
      rows: [`${m.o} là điểm ở giữa hai điểm ${slot(optW(opts))}.`, `${m.a}, ${m.o}, ${m.b} thẳng hàng.`] };
  }
  if (m.type === 'rect') {
    const opts = [[m.mid, true], [m.non, false, 'non'], [m.adj, false, 'adj']];
    return { layout: 'side', opts, head: `Hình chữ nhật ABCD. Điểm nào là <b>trung điểm</b> của cạnh ${SIDES[m.s]}?`,
      rows: [`${slot(optW(opts))} là trung điểm của cạnh ${SIDES[m.s]}.`, `Hai bên đều ${m.half} ô.`] };
  }
  if (m.type === 'pick') {
    const opts = [[m.m, true], [m.o, false, 'non'], [m.p, false, 'off']];
    return { layout: 'wide', opts, head: `Điểm nào là <b>trung điểm</b> của đoạn thẳng ${m.a}${m.b}?`,
      rows: [`${slot(optW(opts))} là trung điểm của đoạn thẳng ${m.a}${m.b}.`, `${m.a}${m.m} = ${m.m}${m.b} = ${m.half} cm`] };
  }
  if (m.type === 'place') {
    return { layout: 'noch', opts: null, head: `Tìm <b>trung điểm</b> ${m.m} của đoạn thẳng ${m.a}${m.b}.`,
      rows: [`${m.a}${m.b} = ${box(0)} cm`, `${m.a}${m.m} = ${m.a}${m.b} : 2 = ${box(1)} cm`, `${m.m} ở vạch ${box(2)} của thước`] };
  }
  // calc
  const seg = `${m.a}${m.b}`;
  if (m.dir === 'fwd') {
    const L = m.whole;
    const opts = [[`${L} : 2`, true], [`${L} × 2`, false, 'mul'], [`${L} − 2`, false, 'sub']];
    return { layout: 'wide', opts, answer: m.half, calc: `${L} : 2`,
      head: `Đoạn thẳng ${seg} dài ${L} cm, ${m.m} là trung điểm của ${seg}. Đoạn thẳng ${m.halfName} dài … cm.`,
      rows: [`<span class="g3m-label">Độ dài đoạn thẳng ${m.halfName} là:</span>`, `${slot(optW(opts))} = ${box(0, 1.9)} (cm)`],
      rule: `${m.m} là trung điểm của ${seg} nên ${m.halfName} bằng một nửa ${seg}: lấy ${L} chia 2.` };
  }
  const opts = [[`${m.half} × 2`, true], [`${m.half} : 2`, false, 'div'], [`${m.half} + 2`, false, 'add']];
  return { layout: 'wide', opts, answer: m.whole, calc: `${m.half} × 2`,
    head: `${m.m} là trung điểm của đoạn thẳng ${seg}, ${m.halfName} dài ${m.half} cm. Đoạn thẳng ${seg} dài … cm.`,
    rows: [`<span class="g3m-label">Độ dài đoạn thẳng ${seg} là:</span>`, `${slot(optW(opts))} = ${box(0, 1.9)} (cm)`],
    rule: `${seg} gồm hai nửa bằng nhau, mỗi nửa ${m.half} cm: lấy ${m.half} nhân 2.` };
}

export const MIDPOINT_GAME = {
  id: 'drill-mid', icon: '📍', title: 'Điểm ở giữa, trung điểm',
  purpose: 'Giúp em nhận ra điểm ở giữa hai điểm (ba điểm thẳng hàng), tìm trung điểm của đoạn thẳng bằng thước, tính độ dài nửa đoạn thẳng và cả đoạn thẳng khi biết trung điểm.',
  unitWord: 'bài', starPrefix: 'drill', npcs: [TEACHER], levels: MIDPOINT_LEVELS,
  stallIcon: () => '📍',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> bài.`,
  againText: 'Làm lượt mới',
  howTo: how(['👀', 'Nhìn hình'], ['👆', 'Chọn điểm'], ['📏', 'Đo bằng thước'], ['✂️', 'Gấp đôi kiểm tra']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), (m) => JSON.stringify(m));
  },

  mountMission(stage, m, level, api) {
    const id = ++uid;
    const plan = planOf(m);
    const fig = figureOf(m, id);
    const opts = plan.opts ? [...plan.opts].sort((x, y) => (x[0] < y[0] ? -1 : 1)) : null; // thứ tự cố định, không lộ đáp án
    const rows = plan.rows.map((r, i) => `<div class="g3m-row${i ? ' g3m-hide' : ''}" data-r="${i}">${r}</div>`).join('');
    const board = `
      <div class="g3m g3m-${plan.layout} g3m-t-${m.type}">
        <div class="g3m-head">${plan.head}</div>
        <div class="g3m-fig"><svg class="g3m-svg" viewBox="0 0 10 10" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${fig.svg}</svg></div>
        ${opts ? `<div class="g3m-choices">${opts.map((o, i) => `<button type="button" class="g3g-btn g3d-choice g3m-btn" data-o="${i}">${o[0]}</button>`).join('')}</div>` : ''}
        <div class="g3m-lines"><div class="g3m-lg">${rows}</div></div>
      </div>`;
    const { paper, say, hint, pad, done } = mountDrill(stage, { api, board, cls: 'g3m-scene' });
    injectMidStyles();
    const svg = paper.querySelector('.g3m-svg');
    const alive = () => svg.isConnected;
    fitFigure(paper.querySelector('.g3m-fig'), svg, fig.bb, fig.box);
    fitLines(paper.querySelector('.g3m-lines'), paper.querySelector('.g3m-lg'), 70);
    if (opts) paper.querySelector('.g3m-choices').style.setProperty('--n', Math.max(2, ...opts.map(o => o[0].length)));
    const btns = [...paper.querySelectorAll('.g3m-btn')];
    const slotEl = paper.querySelector('[data-slot]');
    const rowEl = (r) => paper.querySelector(`[data-r="${r}"]`);
    const boxEl = (n) => paper.querySelector(`[data-b="${n}"]`);
    const q = (sel) => svg.querySelector(sel);
    const calm = calmMotion();
    let mistakes = 0, tip = '', stepNow = 'busy', want = null;

    const wrong = (el, text, shown) => { mistakes++; tip ||= RULE; shake(el); hint(voice(text), shown || text); };
    const RULE = m.type === 'mid' ? 'Điểm ở giữa hai điểm phải thẳng hàng với hai điểm đó và nằm giữa chúng.'
      : m.type === 'calc' ? plan.rule : 'Trung điểm nằm giữa hai đầu đoạn thẳng và cách đều hai đầu.';
    const ptEl = (n) => q(`[data-pt="${n}"]`);
    const glow = (n, cls = 'g3m-pt-hi') => { svg.querySelectorAll(`.${cls}`).forEach(e => e.classList.remove(cls)); if (n) ptEl(n)?.classList.add(cls); };

    // ── Hình phụ: nét kẻ, mũi tên đo, gấp đôi ──────────────────────────────────────────────────────────
    /** Kẻ nét cam từ p tới q (đi qua các điểm ở giữa: điểm sáng lên khi nét đi tới). */
    async function drawLine(p, qq, passes = []) {
      const ln = q('.g3m-draw');
      ln.setAttribute('x1', p[0]); ln.setAttribute('y1', p[1]);
      const hit = new Set();
      await tween(calm ? 1500 : 900, (t) => {
        const e = ease(t);
        ln.setAttribute('x2', p[0] + (qq[0] - p[0]) * e); ln.setAttribute('y2', p[1] + (qq[1] - p[1]) * e);
        for (const [n, at] of passes) if (e >= at && !hit.has(n)) { hit.add(n); ptEl(n)?.classList.add('g3m-pt-ok'); sfx.pop(3); }
      }, alive);
    }
    const guide = (p, qq, cls = '.g3m-guide2') => {
      const g = q(cls);
      if (!p || !g) { svg.querySelectorAll('.g3m-guide').forEach(e => e.setAttribute('opacity', '0')); return; }
      Object.entries({ x1: p[0], y1: p[1], x2: qq[0], y2: qq[1], opacity: 1 }).forEach(([k, v]) => g.setAttribute(k, v));
    };

    const msLayer = q('.g3m-ms');
    /** Mũi tên hai đầu đo đoạn x1 → x2 (thước), ghi số đo phía trên. */
    async function measure(x1, x2, text, cls = '') {
      const y = -2.0;
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', `g3m-arrow ${cls}`);
      g.innerHTML = `<line x1="${x1}" y1="${y}" x2="${x1}" y2="${y}"/><line class="g3m-arrow-end" x1="${x1}" y1="${y - 0.28}" x2="${x1}" y2="${y + 0.28}"/>
        <line class="g3m-arrow-end g3m-arrow-end2" x1="${x2}" y1="${y - 0.28}" x2="${x2}" y2="${y + 0.28}" opacity="0"/>
        <text x="${(x1 + x2) / 2}" y="${y - 0.48}" text-anchor="middle" dominant-baseline="central" opacity="0">${text}</text>`;
      msLayer.appendChild(g);
      const ln = g.firstElementChild;
      await tween((calm ? 260 : 150) * Math.max(1, Math.abs(x2 - x1)) ** 0.5 * 2, (t) => ln.setAttribute('x2', x1 + (x2 - x1) * ease(t)), alive);
      g.querySelector('.g3m-arrow-end2').setAttribute('opacity', '1');
      g.querySelector('text').setAttribute('opacity', '1');
      sfx.tick();
      return g;
    }

    /** Gấp đôi: nửa đoạn (cam) lật quanh điểm giữa xm, rơi đúng lên nửa kia. */
    async function fold(xm) {
      const g = q('.g3m-fold');
      g.setAttribute('opacity', '1');
      sfx.swish();
      await tween(calm ? 1700 : 1000, (t) => {
        const e = ease(t), s = Math.cos(Math.PI * e), lift = -0.9 * Math.sin(Math.PI * e);
        g.setAttribute('transform', `translate(${xm} ${lift}) scale(${s.toFixed(3)} 1) translate(${-xm} 0)`);
      }, alive);
      g.classList.add('g3m-fold-done');
      sfx.ding();
    }

    // ── Nút chọn ────────────────────────────────────────────────────────────────────────────────────────
    btns.forEach((b, i) => {
      b.onclick = () => {
        if (stepNow !== 'pick' || b.disabled) return;
        sfx.tap();
        choose(i, b);
      };
    });
    const lockBtns = (b) => { btns.forEach(x => { x.disabled = true; if (x !== b) x.classList.add('g3m-btn-off'); }); };
    const freeBtns = () => { btns.forEach(x => { if (!x.classList.contains('g3m-btn-tried')) x.disabled = false; }); };

    async function choose(i, b) {
      const [text, ok, why] = opts[i];
      if (!ok) {
        stepNow = 'busy';
        b.disabled = true;
        b.classList.add('g3m-btn-tried');
        await wrongPick(text, why, b);
        if (!alive()) return;
        stepNow = 'pick';
        freeBtns();
        return;
      }
      stepNow = 'busy';
      guide(null);
      glow(null, 'g3m-pt-bad');
      msLayer && (msLayer.innerHTML = '');
      clearCells();
      b.classList.add('g3d-choice-ok');
      lockBtns(b);
      setActive(paper, null);
      await sleep(flyDigit(text, b, slotEl, { onLand: () => { slotEl.textContent = text; slotEl.classList.add('g3m-slot-done'); sfx.pop(2); } }) + 150);
      if (m.type === 'calc') stepCalcNum();
      else verify();
    }

    async function wrongPick(text, why, b) {
      guide(null);
      if (msLayer) msLayer.innerHTML = '';
      clearCells();
      if (m.type === 'mid') {
        const A = m.pts[m.a], B = m.pts[m.b];
        if (why === 'pair') {
          const [p, qq] = text.split(' và ');
          guide(m.pts[p], m.pts[qq]);
          glow(m.o, 'g3m-pt-bad');
          wrong(b, `Ba điểm ${p}, ${m.o}, ${qq} không thẳng hàng. ${m.o} không nằm trên đoạn thẳng ${p}${qq}.`,
            `${p}, ${m.o}, ${qq} <b>không thẳng hàng</b>.`);
        } else {
          guide(A, B, '.g3m-guide');
          glow(text, 'g3m-pt-bad');
          if (why === 'out') wrong(b, `${text} thẳng hàng với ${m.a} và ${m.b} nhưng nằm ngoài, không ở giữa ${m.a} và ${m.b}.`, `${text} nằm <b>ngoài</b> đoạn thẳng ${m.a}${m.b}.`);
          else wrong(b, `Ba điểm ${m.a}, ${text}, ${m.b} không thẳng hàng.`, `${m.a}, ${text}, ${m.b} <b>không thẳng hàng</b>.`);
        }
        return;
      }
      if (m.type === 'rect') {
        if (why === 'adj') {
          glow(text, 'g3m-pt-bad');
          showSide(m.s);
          wrong(b, `${text} nằm trên cạnh ${SIDES[m.s2]}, không nằm trên cạnh ${SIDES[m.s]}.`, `${text} không nằm trên cạnh <b>${SIDES[m.s]}</b>.`);
          return;
        }
        glow(text, 'g3m-pt-bad');
        const [v1, v2] = [SIDES[m.s][0], SIDES[m.s][1]];
        mistakes++; tip ||= RULE; shake(b);
        await countCells(m.k);
        if (!alive()) return;
        hint(`Từ ${v1} đến ${text}: ${m.k} ô, từ ${text} đến ${v2}: ${m.len - m.k} ô. Hai bên không bằng nhau.`,
          `${v1}${text}: ${m.k} ô, ${text}${v2}: ${m.len - m.k} ô. <b>Không bằng nhau</b>.`);
        return;
      }
      if (m.type === 'calc') {
        const seg = `${m.a}${m.b}`;
        const L = m.whole, h = m.half;
        const t = {
          mul: [`${m.halfName} ngắn hơn ${seg}, chỉ bằng một nửa ${seg}. Lấy ${L} chia 2.`, `${m.halfName} bằng <b>một nửa</b> ${seg}: ${L} : 2.`],
          sub: [`Trung điểm chia đoạn thẳng thành hai phần bằng nhau. Lấy ${L} chia 2.`, `Hai phần bằng nhau: <b>${L} : 2</b>.`],
          div: [`${seg} dài hơn ${m.halfName}, gồm hai nửa như vậy. Lấy ${h} nhân 2.`, `${seg} gồm <b>hai nửa</b>: ${h} × 2.`],
          add: [`${seg} gồm hai nửa, mỗi nửa ${h} xăng-ti-mét. Lấy ${h} nhân 2.`, `Hai nửa, mỗi nửa ${h} cm: <b>${h} × 2</b>.`],
        }[why];
        wrong(b, t[0], t[1]);
        return;
      }
      // pick (thước)
      if (why === 'off') {
        guide([m.a0, 0], [m.a0 + m.len, 0], '.g3m-guide');
        glow(text, 'g3m-pt-bad');
        wrong(b, `${text} không nằm trên đoạn thẳng ${m.a}${m.b}.`, `${text} <b>không nằm trên</b> đoạn thẳng ${m.a}${m.b}.`);
        return;
      }
      glow(text, 'g3m-pt-bad');
      mistakes++; tip ||= RULE; shake(b);
      await measure(m.a0, m.a0 + m.k, `${m.k} cm`, 'g3m-arrow-bad');
      await measure(m.a0 + m.k, m.a0 + m.len, `${m.len - m.k} cm`, 'g3m-arrow-bad');
      if (!alive()) return;
      hint(`${m.a}${text} = ${m.k} xăng-ti-mét, ${text}${m.b} = ${m.len - m.k} xăng-ti-mét. Không bằng nhau. ${text} ở giữa nhưng không phải trung điểm.`,
        `${m.a}${text} = ${m.k} cm, ${text}${m.b} = ${m.len - m.k} cm: <b>không bằng nhau</b>.`);
    }

    // ── Đếm ô dọc cạnh hình chữ nhật ───────────────────────────────────────────────────────────────────
    const cellsG = q('.g3m-cells');
    function clearCells() { if (cellsG) cellsG.innerHTML = ''; q('.g3m-sidehi')?.setAttribute('opacity', '0'); }
    function showSide(s) {
      const [p, qq] = sideEnds(m)(s);
      const l = q('.g3m-sidehi');
      Object.entries({ x1: p[0], y1: p[1], x2: qq[0], y2: qq[1], opacity: 1 }).forEach(([k, v]) => l.setAttribute(k, v));
    }
    /** Đánh số các ô sát cạnh m.s: từ đầu cạnh tới điểm (k ô, cam) và từ cuối cạnh về điểm (xanh). */
    async function countCells(k) {
      clearCells();
      showSide(m.s);
      const [p, qq] = sideEnds(m)(m.s);
      const L = m.len, d = [(qq[0] - p[0]) / L, (qq[1] - p[1]) / L], inw = [-OUTN[m.s][0], -OUTN[m.s][1]];
      const cell = (i) => [p[0] + d[0] * (i + 0.5) + inw[0] * 0.5, p[1] + d[1] * (i + 0.5) + inw[1] * 0.5];
      const gap = calm ? 320 : 200;
      const put = (i, n, fill) => {
        const [cx, cy] = cell(i);
        const g = document.createElementNS(NS, 'g');
        g.innerHTML = `<rect x="${cx - 0.5}" y="${cy - 0.5}" width="1" height="1" fill="${fill}" opacity="0.9"/><text class="g3m-cnum" x="${cx}" y="${cy + 0.03}" text-anchor="middle" dominant-baseline="central">${n}</text>`;
        cellsG.appendChild(g);
      };
      for (let i = 0; i < k; i++) { if (!alive()) return; put(i, i + 1, COL.cellA); sfx.pop(i); await sleep(gap); }
      for (let i = L - 1, n = 1; i >= k; i--, n++) { if (!alive()) return; put(i, n, COL.cellB); sfx.pop(n); await sleep(gap); }
    }

    // ── Kiểm chứng sau khi chọn đúng ───────────────────────────────────────────────────────────────────
    async function verify() {
      if (m.type === 'mid') {
        say(`Kẻ từ ${m.a} tới ${m.b}.`, `📏 Kẻ từ <b>${m.a}</b> tới <b>${m.b}</b>.`);
        const A = m.pts[m.a], B = m.pts[m.b], O = m.pts[m.o];
        const at = Math.hypot(O[0] - A[0], O[1] - A[1]) / Math.hypot(B[0] - A[0], B[1] - A[1]);
        glow(m.o);
        await drawLine(A, B, [[m.a, 0], [m.o, at], [m.b, 1]]);
        rowEl(1).classList.remove('g3m-hide');
        sfx.ding();
        await sleep(500);
        return finish(`${m.o} là điểm ở giữa hai điểm ${m.a} và ${m.b}.`);
      }
      if (m.type === 'rect') {
        glow(m.mid);
        say('Đếm ô từ hai đầu cạnh.', `🔢 Đếm ô từ hai đầu cạnh <b>${SIDES[m.s]}</b>.`);
        await countCells(m.half);
        if (!alive()) return;
        rowEl(1).classList.remove('g3m-hide');
        sfx.ding();
        await sleep(600);
        return finish(`${m.mid} là trung điểm của cạnh ${SIDES[m.s]}.`);
      }
      if (m.type === 'pick') {
        glow(m.m);
        say('Đo hai bên rồi gấp đôi đoạn thẳng.', `📏 Đo <b>${m.a}${m.m}</b>, <b>${m.m}${m.b}</b>.`);
        await rulerHalves();
        return finish(`${m.m} là trung điểm của đoạn thẳng ${m.a}${m.b}.`);
      }
    }

    async function rulerHalves() {
      if (msLayer) msLayer.innerHTML = '';
      const xm = m.a0 + m.half;
      await measure(m.a0, xm, `${m.half} cm`, 'g3m-arrow-ok');
      await measure(xm, m.a0 + m.len, `${m.half} cm`, 'g3m-arrow-ok');
      await sleep(250);
      if (!alive()) return;
      say(`Gấp đôi: ${m.a} trùng ${m.b}.`, `✂️ Gấp đôi: <b>${m.a}</b> trùng <b>${m.b}</b>.`);
      await fold(xm);
      ptEl(m.b)?.classList.add('g3m-pt-ok');
      const r = rowEl(1);
      if (r?.classList.contains('g3m-hide')) r.classList.remove('g3m-hide');
      await sleep(700);
    }

    // ── place: đọc thước, tính nửa, chấm điểm ──────────────────────────────────────────────────────────
    function askNum(n, value, onWrong, next) {
      const bx = boxEl(n);
      rowEl(n).classList.remove('g3m-hide');
      setActive(paper, bx);
      stepNow = 'num';
      want = {
        max: String(value).length + 1,
        onType: (t) => { bx.textContent = t; },
        onSubmit: (t) => {
          if (Number(t) !== value) { bx.textContent = ''; onWrong(Number(t), bx); pad.want(want); return; }
          pad.off();
          setActive(paper, null);
          bx.classList.add('g3d-box-ok');
          sfx.pop(3);
          stepNow = 'busy';
          setTimeout(next, 350);
        },
      };
      want.value = value;
      pad.want(want);
    }

    function placeStart() {
      const b = m.a0 + m.len;
      glow(m.a); ptEl(m.b)?.classList.add('g3m-pt-hi');
      say(`${m.a} ở vạch ${m.a0}, ${m.b} ở vạch ${b}. Đoạn thẳng ${m.a}${m.b} dài mấy xăng-ti-mét?`, `${m.a}${m.b} dài mấy <b>cm</b>?`);
      askNum(0, m.len, (t, bx) => {
        if (m.a0 > 0 && t === b) wrong(bx, `${m.a} ở vạch ${m.a0}, không ở vạch 0. ${b} trừ ${m.a0} bằng ${m.len}.`, `${m.a} ở vạch <b>${m.a0}</b>: ${b} − ${m.a0} = ?`);
        else if (m.a0 > 0) wrong(bx, `${m.a} ở vạch ${m.a0}, ${m.b} ở vạch ${b}: ${b} trừ ${m.a0}.`, `${b} − ${m.a0} = ?`);
        else wrong(bx, `${m.a} ở vạch 0, ${m.b} ở vạch ${b}.`, `${m.b} ở vạch <b>${b}</b>.`);
      }, async () => {
        glow(null);
        await measure(m.a0, b, `${m.len} cm`);
        placeHalf();
      });
    }
    function placeHalf() {
      say(`Trung điểm ${m.m} cách ${m.a} mấy xăng-ti-mét?`, `${m.a}${m.m} = ${m.len} : 2 = ?`);
      askNum(1, m.half, (t, bx) => {
        if (t === m.len) wrong(bx, `${m.m} ở chính giữa, chỉ đi một nửa đoạn thẳng. Lấy ${m.len} chia 2.`, `Một nửa: <b>${m.len} : 2</b>.`);
        else wrong(bx, `${m.len} chia 2 bằng mấy?`, `${m.len} : 2 = ?`);
      }, placeTap);
    }
    function placeTap() {
      rowEl(2).classList.remove('g3m-hide');
      setActive(paper, boxEl(2));
      svg.classList.add('g3m-tapping');
      stepNow = 'tap';
      say(`Chấm điểm ${m.m} ở vạch nào của thước? Chạm vào vạch đó.`, `👆 Chạm <b>vạch thước</b> để chấm điểm ${m.m}.`);
    }
    const marks = q('.g3m-marks');
    svg.addEventListener('click', (e) => {
      const hit = e.target.closest?.('.g3m-hit');
      if (!hit || stepNow !== 'tap') return;
      tapAt(Number(hit.dataset.v));
    });
    async function tapAt(v) {
      const want2 = m.a0 + m.half;
      if (v !== want2) {
        marks.innerHTML = `<g class="g3m-xmark"><line x1="${v - 0.25}" y1="-0.25" x2="${v + 0.25}" y2="0.25"/><line x1="${v + 0.25}" y1="-0.25" x2="${v - 0.25}" y2="0.25"/></g>`;
        const rn = q(`[data-rn="${v}"]`);
        mistakes++; tip ||= RULE; sfx.boing();
        rn?.classList.add('g3m-rnum-bad');
        setTimeout(() => rn?.classList.remove('g3m-rnum-bad'), 700);
        if (m.a0 > 0 && v === m.half) hint(`${m.m} cách ${m.a} ${m.half} xăng-ti-mét. ${m.a} ở vạch ${m.a0}, đếm thêm ${m.half} vạch.`, `Từ vạch <b>${m.a0}</b> đếm thêm <b>${m.half}</b> vạch.`);
        else if (v < m.a0 || v > m.a0 + m.len) hint(`${m.m} phải nằm trên đoạn thẳng ${m.a}${m.b}.`, `${m.m} nằm <b>giữa</b> ${m.a} và ${m.b}.`);
        else hint(`${m.m} cách ${m.a} ${m.half} xăng-ti-mét: từ vạch ${m.a0} đếm thêm ${m.half} vạch.`, `Từ vạch <b>${m.a0}</b> đếm thêm <b>${m.half}</b> vạch.`);
        return;
      }
      stepNow = 'busy';
      svg.classList.remove('g3m-tapping');
      marks.innerHTML = '';
      setActive(paper, null);
      const rn = q(`[data-rn="${v}"]`), bx = boxEl(2);
      rn.classList.add('g3m-rnum-ok');
      await sleep(flyDigit(String(v), rn, bx, { onLand: () => { bx.textContent = v; bx.classList.add('g3d-box-ok'); sfx.pop(4); } }) + 100);
      // Chấm điểm: chấm cam rơi xuống đúng vạch trên đoạn thẳng.
      const np = q('.g3m-newpt'), dot = np.querySelector('circle').getBoundingClientRect();
      const fr = { left: dot.left, top: dot.top - dot.height * 6, width: dot.width, height: dot.height };
      await sleep(flyOne(`<svg viewBox="0 0 10 10" width="100%" height="100%"><circle cx="5" cy="5" r="4.4" fill="${COL.hi}" stroke="#fff" stroke-width="1.2"/></svg>`, fr, dot,
        { minMs: 350, maxMs: 500, onLand: () => { np.setAttribute('opacity', '1'); sfx.pop(5); } }) + 150);
      say('Đo hai bên rồi gấp đôi đoạn thẳng.', `📏 Đo <b>${m.a}${m.m}</b>, <b>${m.m}${m.b}</b>.`);
      await rulerHalves();
      finish(`${m.m} là trung điểm của đoạn thẳng ${m.a}${m.b}, ${m.a}${m.m} = ${m.m}${m.b} = ${m.half} cm.`);
    }

    // ── calc: chọn phép tính, gõ kết quả, gấp nửa đoạn kiểm chứng ───────────────────────────────────────
    function stepCalcNum() {
      rowEl(1).classList.remove('g3m-hide');
      say(`Tính ${voice(plan.calc)}.`, `Tính <b>${plan.calc}</b>.`);
      askNum(0, plan.answer, (t, bx) => wrong(bx, `${plan.calc} = ${plan.answer}.`), calcCheck);
    }
    async function calcCheck() {
      const M = 5;
      say('Gấp đôi đoạn thẳng để kiểm tra!', '✂️ Gấp đôi để kiểm tra.');
      await fold(M);
      if (!alive()) return;
      const other = q('.g3m-other');
      other.setAttribute('opacity', '1');
      sfx.pop(3);
      await sleep(350);
      const bx = boxEl(0);
      const lbl = q(m.dir === 'fwd' ? '[data-bl="half"]' : '[data-bl="whole"]');
      await sleep(flyDigit(String(plan.answer), bx, lbl, { onLand: () => { lbl.textContent = `${plan.answer} cm`; lbl.classList.add('g3m-blbl-ok'); sfx.pop(5); } }) + 300);
      if (m.dir === 'fwd') q('[data-bl="other"]').classList.add('g3m-blbl-ok');
      sfx.ding();
      await sleep(500);
      finish(m.dir === 'fwd' ? `Đoạn thẳng ${m.halfName} dài ${m.half} cm.` : `Đoạn thẳng ${m.a}${m.b} dài ${m.whole} cm.`);
    }

    async function finish(what) {
      stepNow = 'done';
      await sleep(250);
      if (!alive()) return;
      done(mistakes, { ok: what, tip: tip ? `Nhớ: ${tip}` : '' });
    }

    // ── Bắt đầu ─────────────────────────────────────────────────────────────────────────────────────────
    if (m.type === 'place') placeStart();
    else {
      stepNow = 'pick';
      setActive(paper, slotEl);
      if (m.type === 'calc') { q('.g3m-halfhi')?.classList.add('g3m-halfhi-on'); say(`${voice(plan.head)} Chọn phép tính.`, '👆 Chọn <b>phép tính</b>.'); }
      else if (m.type === 'mid' && m.ask === 'pair') say(voice(plan.head), `👆 Chọn <b>hai điểm</b>.`);
      else { say(voice(plan.head), '👆 Chọn <b>một điểm</b>.'); if (m.type === 'rect') showSide(m.s); }
    }

    if (import.meta.env.DEV) {
      const hitClick = (v) => q(`.g3m-hit[data-v="${v}"]`)?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      window.__g3drill = { m, step: () => {
        if (stepNow === 'pick') btns[opts.findIndex(o => o[1])]?.click();
        else if (stepNow === 'num') pad.type(String(want.value));
        else if (stepNow === 'tap') hitClick(m.a0 + m.half);
      }, wrong: () => {
        if (stepNow === 'pick') btns.find((b, i) => !opts[i][1] && !b.disabled)?.click();
        else if (stepNow === 'num') pad.type(String(want.value + 1));
        else if (stepNow === 'tap') hitClick(m.a0 ? m.half : m.half + 1);
      } };
    }
  },
};

let midStyles = false;
function injectMidStyles() {
  if (midStyles) return;
  midStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g3m { flex: 1; min-height: 0; display: grid; gap: 1.4cqh 2cqi; padding: 1.4cqh 2.4cqi 2cqh calc(clamp(1.4rem, 4cqi, 3rem) + 1.6cqi);
      font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .g3m > * { min-height: 0; min-width: 0; }
    .g3m-side { grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr) minmax(0, 0.4fr); grid-template-areas: "head head" "fig ch" "lines lines"; }
    .g3m-wide { grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); grid-template-rows: auto minmax(0, 1fr) minmax(0, 0.6fr); grid-template-areas: "head head" "fig fig" "ch lines"; }
    .g3m-noch { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr) minmax(0, 0.6fr); grid-template-areas: "head" "fig" "lines"; }
    .g3m-head { grid-area: head; font-size: min(6.4cqh, 3.6cqi, 2.5rem); line-height: 1.25; color: #334155; }
    .g3m-head b { color: #C2410C; }
    .g3m-fig { grid-area: fig; display: flex; border-radius: 0.8rem; overflow: hidden; border: 2px solid #DBEAFE; background: #fff; }
    .g3m-svg { flex: 1; width: 100%; height: 100%; display: block; touch-action: manipulation; }

    .g3m-dot { fill: ${COL.pt}; stroke: #fff; stroke-width: 0.06; }
    .g3m-lbl { font: 800 0.8px 'Baloo 2', sans-serif; fill: #334155; paint-order: stroke; stroke: #fff; stroke-width: 0.14px; }
    .g3m-pt-hi .g3m-dot { fill: ${COL.hi}; }
    .g3m-pt-hi .g3m-lbl { fill: #C2410C; }
    .g3m-pt-ok .g3m-dot { fill: ${COL.ok}; }
    .g3m-pt-ok .g3m-lbl { fill: #15803D; }
    .g3m-pt-bad .g3m-dot { fill: ${COL.bad}; }
    .g3m-pt-bad .g3m-lbl { fill: #B91C1C; }
    .g3m-pt-hi .g3m-dot, .g3m-pt-ok .g3m-dot { animation: g3mPulse .6s ease; transform-box: fill-box; transform-origin: center; }
    @keyframes g3mPulse { 40% { transform: scale(1.6); } }
    .g3m-guide { stroke: ${COL.guide}; stroke-width: 0.07; stroke-dasharray: 0.25 0.18; stroke-linecap: round; transition: opacity .25s; }
    .g3m-draw { stroke: ${COL.hi}; stroke-width: 0.13; stroke-linecap: round; }
    .g3m-seg { stroke: ${COL.seg}; stroke-width: 0.12; stroke-linecap: round; }
    .g3m-halfhi { stroke: transparent; stroke-width: 0.12; stroke-linecap: round; }
    .g3m-halfhi-on { stroke: #60A5FA; }

    .g3m-ruler-body { fill: ${COL.ruler}; stroke: ${COL.rulerEdge}; stroke-width: 0.05; }
    .g3m-rnum { font: 800 0.56px 'Baloo 2', sans-serif; fill: ${COL.tick}; transition: fill .2s; }
    .g3m-runit { font: 700 0.4px 'Baloo 2', sans-serif; fill: ${COL.tick}; }
    .g3m-rnum-bad { fill: ${COL.bad}; }
    .g3m-rnum-ok { fill: ${COL.ok}; }
    .g3m-hit { fill: transparent; pointer-events: none; }
    .g3m-tapping .g3m-hit { pointer-events: all; cursor: pointer; }
    .g3m-tapping .g3m-hit:hover { fill: rgba(249,115,22,0.16); }
    .g3m-tapping .g3m-ruler-body { animation: g3mRuler 1.2s ease-in-out infinite; }
    @keyframes g3mRuler { 50% { stroke: ${COL.hi}; stroke-width: 0.14; } }
    .g3m-xmark line { stroke: ${COL.bad}; stroke-width: 0.1; stroke-linecap: round; }

    .g3m-arrow line { stroke: #2563EB; stroke-width: 0.07; stroke-linecap: round; }
    .g3m-arrow text { font: 800 0.6px 'Baloo 2', sans-serif; fill: #1D4ED8; paint-order: stroke; stroke: #fff; stroke-width: 0.12px; }
    .g3m-arrow-ok line { stroke: ${COL.ok}; }
    .g3m-arrow-ok text { fill: #15803D; }
    .g3m-arrow-bad line { stroke: ${COL.bad}; }
    .g3m-arrow-bad text { fill: #B91C1C; }
    .g3m-fold-done line { stroke-opacity: 0.55; }

    .g3m-brace { fill: none; stroke: #64748B; stroke-width: 0.07; stroke-linecap: round; stroke-linejoin: round; }
    .g3m-blbl { font: 800 0.66px 'Baloo 2', sans-serif; fill: #475569; paint-order: stroke; stroke: #fff; stroke-width: 0.12px; }
    .g3m-blbl-ok { fill: #15803D; }
    .g3m-other { transition: opacity .3s; }

    .g3m-rect { fill: #FFF7ED; }
    .g3m-rect-edge { fill: none; stroke: ${COL.seg}; stroke-width: 0.09; stroke-linejoin: round; }
    .g3m-sidehi { stroke: #60A5FA; stroke-width: 0.22; stroke-linecap: round; }
    .g3m-cnum { font: 800 0.5px 'Baloo 2', sans-serif; fill: #7C2D12; }

    .g3m-choices { grid-area: ch; container-type: size; container-name: g3mch; display: flex; flex-direction: column; gap: 4cqh; padding: 1cqh 0 2.4cqh; box-sizing: border-box; }
    .g3m-btn { flex: 1 1 0; min-height: 0; min-width: 0; width: 100%; max-width: none; font-size: min(17cqh, calc(84cqi / (var(--n, 4) * 0.58)), 3.4rem); overflow: hidden; line-height: 1; white-space: nowrap; }
    .g3m-btn-off { opacity: 0.55; }
    .g3m-btn-tried, .g3m-btn-tried:disabled { opacity: 0.5; color: #B91C1C; border-color: #FCA5A5; box-shadow: 0 6px 0 #FCA5A5; text-decoration: line-through; }
    .g3m-wide .g3m-choices { flex-direction: row; gap: 3cqi; padding: 1cqh 0 2.4cqh; }
    .g3m-wide .g3m-btn { font-size: min(52cqh, calc(26cqi / (var(--n, 4) * 0.58)), 3.4rem); }

    .g3m-lines { grid-area: lines; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .g3m-lg { display: grid; grid-auto-rows: 1.55em; align-items: center; width: max-content; line-height: 1; }
    .g3m-row { display: flex; align-items: center; gap: 0.22em; white-space: nowrap; }
    .g3m-side .g3m-row, .g3m-wide .g3m-row { justify-content: center; }
    .g3m-hide { visibility: hidden; }
    .g3m-label { font-size: 0.75em; color: #475569; }
    .g3m-slot { display: inline-grid; place-items: center; height: 1.3em; padding: 0 0.15em; border: 0.06em dashed #93C5FD; border-radius: 0.2em; color: #94A3B8; box-sizing: border-box; }
    .g3m-slot-done { border-color: transparent; color: #1E293B; }
    .g3m .g3d-box { height: 1.3em; }

    /* Tờ vở gần vuông / đứng: đề, hình cả bề ngang, hàng nút chọn, rồi bài giải. */
    .g3m-scene .g3d-paper { container-name: g3mpaper; }
    @container g3mpaper (aspect-ratio < 1.3) {
      .g3m-side, .g3m-wide { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1.3fr) minmax(0, 0.3fr) minmax(0, 0.48fr);
        grid-template-areas: "head" "fig" "ch" "lines"; }
      .g3m-noch { grid-template-rows: auto minmax(0, 1.3fr) minmax(0, 0.7fr); }
      .g3m-side .g3m-choices, .g3m-wide .g3m-choices { flex-direction: row; gap: 3cqi; padding: 0 0 1.6cqh; }
      .g3m-side .g3m-btn, .g3m-wide .g3m-btn { font-size: min(52cqh, calc(26cqi / (var(--n, 4) * 0.58)), 3.4rem); }
      .g3m-head { font-size: min(4.4cqh, 5.4cqi); }
    }
    @media (prefers-reduced-motion: reduce) {
      .g3m-pt-hi .g3m-dot, .g3m-pt-ok .g3m-dot { animation: none; }
      .g3m-tapping .g3m-ruler-body { animation: g3mRuler 2.4s ease-in-out infinite; }
    }
  `;
  document.head.appendChild(st);
}
