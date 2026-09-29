/**
 * 📐 Thám tử góc vuông — bé làm thám tử, dùng ê-ke kiểm tra góc. Thiết kế: docs/lop_3/thiet-ke-tro-choi-tap1.md §4.4.
 *   Cấp 1 (Bài 18): check — một góc trên đồ vật (khung tranh xiêu vẹo, đồng hồ, cái kéo…): áp ê-ke rồi chọn
 *                   góc vuông / góc không vuông; find — hình có tên đỉnh: đánh dấu mọi góc vuông.
 *   Cấp 2 (Bài 19): what — hình trên lưới ô vuông là hình gì (tam giác / tứ giác → chữ nhật / vuông / tứ giác khác);
 *                   pick — tìm mọi hình chữ nhật (hoặc hình vuông) trong 4 hình; count — hình có mấy góc vuông.
 *   Cấp 3 (Bài 19): tri / quad — hình ghép có mấy hình tam giác / tứ giác; soi lại tô màu từng hình.
 * Ê-ke nằm trong hộp đồ nghề ở góc bảng: kéo ê-ke tới một đỉnh, hoặc chạm đỉnh là ê-ke bay tới áp vào
 * (cạnh dài của ê-ke trùng một cạnh của góc). Bé tự nhìn khe hở rồi tự kết luận — trò chơi không báo trước.
 * Dùng khung quầy của Chợ phiên (market/stall.js), theme 'detective'.
 */

import {
  INK, OBJECTS, ekeShape, ekeIcon, letter, angleArc, rightMark, crossMark, gridSvg, FILLS,
  sub, add, mul, len, unit, cross, deg, isRight, angleAt, rotPt, pts, outward,
} from './art/detective.js';
import { DETECTIVE_NPCS as NPCS, cap } from './npc.js';
import { mountStall, Q } from './market/stall.js';
import { stallMeta, levelMeta } from './catalog.js';
import { sfx } from '../preschool/fx.js';
import { calmMotion } from './fly.js';

// Bảng màn ngang 480 × 300: hình bên trái, hộp đồ nghề (ê-ke nằm nghỉ) bên phải. Màn dọc 392 × 400: hộp đồ nghề
// nằm dưới hình — cùng vùng vẽ hình REGION nên đồ vật / hình sinh sẵn dùng được cho cả hai.
const REGION = { x: 26, y: 26, w: 340, h: 250 };
const BOARDS = {
  land: { W: 480, H: 300, dock: { x: 384, y: 166, w: 88, h: 126 }, full: { x: 36, y: 34, w: 408, h: 236 } },
  port: { W: 392, H: 400, dock: { x: 96, y: 290, w: 200, h: 100 }, full: { x: 30, y: 36, w: 332, h: 330 } },
};
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const ANGLE_NAMES = [['O', 'A', 'B'], ['I', 'M', 'N'], ['E', 'G', 'H'], ['K', 'P', 'Q'], ['A', 'B', 'C'], ['D', 'E', 'G']];
const NAMES = {
  3: ['ABC', 'MNP', 'DEG', 'HIK', 'PQR'],
  4: ['ABCD', 'MNPQ', 'EGHI', 'RSTX', 'KLUV'],
  5: ['ABCDE', 'MNPQR', 'EGHIK'],
  6: ['ABCDEG', 'MNPQRS'],
};
const OBJ_ORDER = ['frame', 'clock', 'window', 'scissors', 'book', 'roof', 'ladder'];

// ── Hình có đỉnh (cấp 1 find, cấp 2 count) — toạ độ theo ô, sau đó xoay / phóng vừa bảng ─────────────
const POLYS = {
  rect: (r) => { const w = r.int(4, 7), h = r.int(3, 5); return [[0, 0], [w, 0], [w, h], [0, h]]; },
  rtrap: (r) => { const w = r.int(5, 7), h = r.int(3, 5); return [[0, 0], [w - r.int(2, 3), 0], [w, h], [0, h]]; },
  cut: (r) => { const w = r.int(5, 7), h = r.int(4, 5), c = r.int(1, 2); return [[0, 0], [w - c, 0], [w, c], [w, h], [0, h]]; },
  cut2: (r) => { const w = r.int(5, 7), h = r.int(4, 5), c = r.int(1, 2); return [[c, 0], [w - c, 0], [w, c], [w, h], [0, h], [0, c]]; },
  house: (r) => { const w = r.int(4, 6), h = r.int(3, 4), t = r.int(2, 3); return [[w / 2, 0], [w, t], [w, h + t], [0, h + t], [0, t]]; },
  rtri: (r) => { const w = r.int(4, 7), h = r.int(3, 5); return r() < 0.5 ? [[0, 0], [w, h], [0, h]] : [[0, 0], [w, 0], [0, h]]; },
  quad1: (r) => { const w = r.int(5, 7), h = r.int(4, 5); return [[0, 0], [w, 0], [w - r.int(1, 2), h], [0, h - r.int(1, 2)]]; },
  para: (r) => { const w = r.int(4, 6), h = r.int(3, 4), s = r.int(1, 2); return [[s, 0], [w + s, 0], [w, h], [0, h]]; },
  kite: (r) => { const w = r.int(4, 6), h = r.int(5, 6); return [[w / 2, 0], [w, h * 0.38], [w / 2, h], [0, h * 0.38]]; },
};
const FIND_POOL = ['rect', 'rtrap', 'cut', 'rtri', 'quad1', 'para', 'house', 'kite'];
const COUNT_POOL = ['rect', 'rtrap', 'cut', 'cut2', 'house', 'rtri', 'quad1', 'para'];

/** Các góc của đa giác: [{ V, P1 (đỉnh trước), P2 (đỉnh sau), right }]. */
const cornersOf = (P) => P.map((V, i) => {
  const P1 = P[(i + P.length - 1) % P.length], P2 = P[(i + 1) % P.length];
  return { V, P1, P2, right: isRight(V, P1, P2) };
});
/** Góc không vuông phải lệch hẳn (≥ 9°) để áp ê-ke là thấy khe hở. */
const fairAngles = (P) => cornersOf(P).every(c => c.right || Math.abs(angleAt(c.V, c.P1, c.P2) - 90) >= 9);

/** Đổi đa giác cho chiều đỉnh đi theo chiều kim đồng hồ trên màn hình (y hướng xuống). */
const clockwise = (P) => {
  let s = 0;
  for (let i = 0; i < P.length; i++) s += cross(P[i], P[(i + 1) % P.length]);
  return s > 0 ? P : [...P].reverse();
};

/** Phóng / dời các điểm cho vừa khung box (giữ tỉ lệ, tối đa maxS đơn vị bảng mỗi ô). */
function fitPts(P, box, maxS) {
  const xs = P.map(p => p[0]), ys = P.map(p => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), bw = Math.max(...xs) - x0 || 1, bh = Math.max(...ys) - y0 || 1;
  const s = Math.min(box.w / bw, box.h / bh, maxS);
  const ox = box.x + (box.w - bw * s) / 2, oy = box.y + (box.h - bh * s) / 2;
  return { P: P.map(p => [ox + (p[0] - x0) * s, oy + (p[1] - y0) * s]), s, ox: ox - x0 * s, oy: oy - y0 * s };
}

// ── Hình trên lưới ô vuông (cấp 2 what / pick): toạ độ nguyên, không xoay ─────────────────────────────
const GRID = {
  square: (r) => { const s = r.int(2, 4); return [[0, 0], [s, 0], [s, s], [0, s]]; },
  rect: (r) => { let w = r.int(3, 6); const h = r.int(2, 4); if (w === h) w++; return [[0, 0], [w, 0], [w, h], [0, h]]; },
  nearsq: (r) => { const s = r.int(2, 4); return r() < 0.5 ? [[0, 0], [s + 1, 0], [s + 1, s], [0, s]] : [[0, 0], [s, 0], [s, s + 1], [0, s + 1]]; },
  para: (r) => { const w = r.int(3, 5), h = r.int(2, 3); return [[1, 0], [w + 1, 0], [w, h], [0, h]]; },
  rtrap: (r) => { const w = r.int(3, 5), h = r.int(2, 4); return [[0, 0], [w - 1, 0], [w, h], [0, h]]; },
  itrap: (r) => { const w = r.int(4, 6), h = r.int(2, 3); return [[1, 0], [w - 1, 0], [w, h], [0, h]]; },
  rhombus: () => [[0, 2], [3, 0], [6, 2], [3, 4]],
  rtri: (r) => { const w = r.int(2, 5), h = r.int(2, 4); return [[0, 0], [w, h], [0, h]]; },
  tri: (r) => { const w = r.int(3, 6), h = r.int(2, 4); return [[r.int(1, w - 1), 0], [w, h], [0, h]]; },
};
const GRID_BY_CLASS = { tri: ['rtri', 'tri'], quad: ['para', 'rtrap', 'itrap', 'rhombus'], rect: ['rect', 'nearsq'], square: ['square'] };
const CLASS_NAME = { tri: 'hình tam giác', quad: 'hình tứ giác', rect: 'hình chữ nhật', square: 'hình vuông' };

/** tri | quad (tứ giác không đủ 4 góc vuông) | rect | square — tính từ toạ độ, không tin tên mẫu. */
function classify(P) {
  if (P.length === 3) return 'tri';
  if (!cornersOf(P).every(c => c.right)) return 'quad';
  const sides = P.map((p, i) => len(sub(P[(i + 1) % 4], p)));
  return sides.every(s => Math.abs(s - sides[0]) < 1e-6) ? 'square' : 'rect';
}

// ── Hình ghép (cấp 3): các điểm có tên + các đường thẳng (mỗi đường là dãy điểm thẳng hàng) ─────────────
const FIGS = {
  fan1: (r) => { const ax = r.int(2, 4), ex = r.pick([2, 3, 4]); return { P: { A: [ax, 0], B: [0, 4], C: [6, 4], E: [ex, 4] }, lines: [['A', 'B'], ['A', 'C'], ['B', 'E', 'C'], ['A', 'E']] }; },
  fan2: (r) => { const ax = r.int(2, 4); return { P: { A: [ax, 0], B: [0, 4], E: [2, 4], G: [4, 4], C: [6, 4] }, lines: [['A', 'B'], ['A', 'C'], ['B', 'E', 'G', 'C'], ['A', 'E'], ['A', 'G']] }; },
  rectDiag: (r) => { const w = r.int(5, 7), h = r.int(3, 4), d = r() < 0.5; return { P: { A: [0, 0], B: [w, 0], C: [w, h], D: [0, h] }, lines: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], d ? ['A', 'C'] : ['B', 'D']] }; },
  rectX: (r) => { const w = r.int(5, 7), h = r.int(3, 4); return { P: { A: [0, 0], B: [w, 0], C: [w, h], D: [0, h], O: [w / 2, h / 2] }, lines: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'O', 'C'], ['B', 'O', 'D']] }; },
  split1: (r) => { const w = r.int(5, 7), h = r.int(3, 4), e = r.int(2, w - 2); return { P: { A: [0, 0], E: [e, 0], B: [w, 0], C: [w, h], G: [e, h], D: [0, h] }, lines: [['A', 'E', 'B'], ['D', 'G', 'C'], ['A', 'D'], ['B', 'C'], ['E', 'G']] }; },
  split2: (r) => { const h = r.int(3, 4); return { P: { A: [0, 0], E: [2, 0], G: [4, 0], B: [6, 0], C: [6, h], I: [4, h], H: [2, h], D: [0, h] }, lines: [['A', 'E', 'G', 'B'], ['D', 'H', 'I', 'C'], ['A', 'D'], ['B', 'C'], ['E', 'H'], ['G', 'I']] }; },
  trap: (r) => { const b = r.int(4, 5); return { P: { A: [0, 0], B: [b, 0], C: [6, 4], D: [0, 4], I: [0, 2] }, lines: [['A', 'I', 'D'], ['A', 'B'], ['B', 'C'], ['C', 'D'], ['I', 'B'], ['I', 'C']] }; },
  triCut: () => ({ P: { A: [3, 0], B: [0, 4], C: [6, 4], E: [1.5, 2], G: [4.5, 2] }, lines: [['A', 'E', 'B'], ['A', 'G', 'C'], ['B', 'C'], ['E', 'G']] }),
  triCutMid: () => ({ P: { A: [3, 0], B: [0, 4], C: [6, 4], E: [1.5, 2], G: [4.5, 2], H: [3, 4], I: [3, 2] }, lines: [['A', 'E', 'B'], ['A', 'G', 'C'], ['B', 'H', 'C'], ['E', 'I', 'G'], ['A', 'I', 'H']] }),
  rectCorner: (r) => { const w = r.int(5, 7), h = r.int(3, 4), e = r.int(2, w - 2); return { P: { A: [0, 0], B: [w, 0], C: [w, h], E: [e, h], D: [0, h] }, lines: [['A', 'B'], ['B', 'C'], ['D', 'E', 'C'], ['D', 'A'], ['A', 'E']] }; },
  halfRect: (r) => { const h = r.int(3, 4); return { P: { A: [0, 0], E: [3, 0], B: [6, 0], C: [6, h], G: [3, h], D: [0, h] }, lines: [['A', 'E', 'B'], ['D', 'G', 'C'], ['A', 'D'], ['B', 'C'], ['E', 'G'], ['A', 'G']] }; },
};
const RELABEL = [{}, { A: 'M', B: 'N', C: 'P', D: 'Q' }];

/** Mọi hình tam giác và tứ giác (lồi) có cạnh nằm trên các đường đã vẽ. Trả về { tri: [[tên…]], quad: [[tên…]] }. */
export function figureShapes(fig) {
  const keys = Object.keys(fig.P), P = fig.P;
  const linked = (a, b) => fig.lines.some(l => l.includes(a) && l.includes(b));
  const turn = (a, b, c) => cross(sub(P[b], P[a]), sub(P[c], P[b]));
  const tri = [], quad = [];
  const n = keys.length;
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) for (let k = j + 1; k < n; k++) {
    const [a, b, c] = [keys[i], keys[j], keys[k]];
    if (linked(a, b) && linked(b, c) && linked(a, c) && Math.abs(turn(a, b, c)) > 1e-6) tri.push([a, b, c]);
  }
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) for (let k = j + 1; k < n; k++) for (let l = k + 1; l < n; l++) {
    const [a, b, c, d] = [keys[i], keys[j], keys[k], keys[l]];
    for (const q of [[a, b, c, d], [a, b, d, c], [a, c, b, d]]) {
      if (!q.every((p, t) => linked(p, q[(t + 1) % 4]))) continue;
      const turns = q.map((p, t) => turn(p, q[(t + 1) % 4], q[(t + 2) % 4]));
      if (turns.every(v => v > 1e-6) || turns.every(v => v < -1e-6)) { quad.push(q); break; }
    }
  }
  return { tri, quad };
}

function makeFigure(rng, id) {
  const raw = FIGS[id](rng);
  const map = rng.pick(RELABEL);
  const nm = (k) => map[k] || k;
  const P = Object.fromEntries(Object.entries(raw.P).map(([k, v]) => [nm(k), v]));
  return { id, P, lines: raw.lines.map(l => l.map(nm)) };
}

// ════ Cấp chơi ══════════════════════════════════════════════════════════════════════════════════════
export const DETECTIVE_LEVELS = [
  {
    ...levelMeta('detective-1'), missions: 6,
    knowledge: 'góc vuông, góc không vuông, dùng ê-ke kiểm tra góc vuông',
    ask: () => 'Góc nào vuông, góc nào không? Lấy ê-ke ra kiểm tra!',
    desc: 'Áp đỉnh góc vuông của ê-ke vào đỉnh góc, một cạnh ê-ke trùng một cạnh góc: cạnh kia cũng trùng thì là góc vuông.',
    kinds: ['check', 'find'],
    how: [['eke', 'Áp ê-ke'], ['👀', 'Nhìn khe hở'], ['✅', 'Kết luận']],
  },
  {
    ...levelMeta('detective-2'), missions: 6,
    knowledge: 'hình tam giác, hình tứ giác, hình chữ nhật, hình vuông',
    ask: (n) => `Hình nào là hình chữ nhật, hình nào là hình vuông? Điều tra giúp ${n.me}!`,
    desc: 'Hình chữ nhật có 4 góc vuông. Hình vuông có 4 góc vuông và 4 cạnh bằng nhau (đếm ô vuông để so cạnh).',
    kinds: ['what', 'pick', 'count'],
    how: [['eke', 'Áp ê-ke'], ['🔢', 'Đếm ô'], ['👆', 'Chọn hình']],
  },
  {
    ...levelMeta('detective-3'), missions: 6,
    knowledge: 'hình tam giác, hình tứ giác',
    ask: () => 'Trong hình ghép này trốn bao nhiêu hình tam giác, tứ giác?',
    desc: 'Đếm cả hình nhỏ và hình to ghép từ hai, ba hình nhỏ. Máy soi tô màu từng hình để em kiểm tra.',
    kinds: ['tri', 'quad'],
    how: [['🔺', 'Tìm hình'], ['🧮', 'Gõ số'], ['🔍', 'Soi hình']],
  },
];

export const DETECTIVE_GAME = {
  ...stallMeta('detective'),
  unitWord: 'vụ',
  npcs: NPCS,
  levels: DETECTIVE_LEVELS,
  stallIcon: () => ekeIcon(56),
  summaryText: (ok, total) => `Em đã phá được <strong>${ok}/${total}</strong> vụ điều tra.`,

  howTo(level) {
    const pic = (p) => (p === 'eke' ? ekeIcon(46) : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '🕵️', label: 'Phá án' }];
  },

  makeMission(rng, level, history) {
    const prev = history[history.length - 1];
    const recentNpcs = history.slice(-2).map(m => m.npc.id);
    const npc = rng.pick(NPCS.filter(n => !recentNpcs.includes(n.id)));
    const kind = level.kinds[history.length % level.kinds.length];
    const same = history.filter(h => h.kind === kind);
    const base = { npc, kind };

    if (kind === 'check') {
      // Vuông / không vuông xen nhau ngẫu nhiên, không quá 2 lần liền giống nhau; đồ vật không lặp trong ván.
      const last = same.slice(-2).map(h => h.right);
      const right = last.length === 2 && last[0] === last[1] ? !last[0] : rng() < 0.5;
      const used = same.map(h => h.obj);
      const pool = OBJ_ORDER.filter(o => !used.includes(o));
      const obj = rng.pick(pool.length ? pool : OBJ_ORDER);
      return { ...base, right, obj, names: rng.pick(ANGLE_NAMES), o: OBJECTS[obj](rng, right) };
    }

    if (kind === 'find' || kind === 'count') {
      const pool0 = kind === 'find' ? FIND_POOL : COUNT_POOL;
      const used = same.map(h => h.tpl);
      const pool = pool0.filter(t => !used.includes(t) && t !== prev?.tpl);
      const tpl = rng.pick(pool.length ? pool : pool0);
      let P;
      for (let k = 0; k < 30; k++) { P = clockwise(POLYS[tpl](rng)); if (fairAngles(P)) break; }
      if (!fairAngles(P)) P = clockwise(POLYS.rect(rng));
      const rot = rng.pick([0, 0, -12, 12, -20, 20]);
      const c = [P.reduce((s, p) => s + p[0], 0) / P.length, P.reduce((s, p) => s + p[1], 0) / P.length];
      P = P.map(p => rotPt(p, c, rot));
      return { ...base, tpl, P, rot, name: rng.pick(NAMES[P.length]) };
    }

    if (kind === 'what') {
      const cls = rng.pick(['tri', 'quad', 'rect', 'square'].filter(k => k !== same[same.length - 1]?.cls));
      const P = clockwise(GRID[rng.pick(GRID_BY_CLASS[cls])](rng));
      return { ...base, cls: classify(P), P, name: rng.pick(NAMES[P.length]) };
    }

    if (kind === 'pick') {
      const target = same.length ? (same[same.length - 1].target === 'rect' ? 'square' : 'rect') : rng.pick(['rect', 'square']);
      const good = target === 'rect' ? rng.int(1, 3) : rng.int(1, 2);
      const goodGen = target === 'rect' ? ['rect', 'nearsq'] : ['square'];
      // Hình vuông: luôn có một hình chữ nhật gần vuông để bẫy; hình chữ nhật: không có hình vuông (khỏi lẫn).
      const badGen = target === 'rect' ? ['para', 'rtrap', 'itrap', 'rhombus'] : ['nearsq', 'rect', 'rhombus', 'para'];
      const kinds = [...Array.from({ length: good }, () => rng.pick(goodGen)),
        ...(target === 'square' ? ['nearsq'] : []),
        ...rng.shuffle(badGen)].slice(0, 4);
      const shapes = rng.shuffle(kinds).map((g, i) => ({ P: clockwise(GRID[g](rng)), name: NAMES[4][i] }));
      shapes.forEach(s => { s.cls = classify(s.P); });
      return { ...base, target, shapes };
    }

    // tri / quad: hình ghép có 2–8 hình cần đếm; mẫu không lặp trong ván.
    const used = history.map(h => h.fig?.id);
    const ids = rng.shuffle(Object.keys(FIGS));
    let fig = null, shapes = null;
    for (const pass of [0, 1]) {
      for (const id of ids) {
        if (!pass && used.includes(id)) continue;
        const f = makeFigure(rng, id);
        const s = figureShapes(f);
        if (s[kind].length >= 2 && s[kind].length <= 8) { fig = f; shapes = s[kind]; break; }
      }
      if (fig) break;
    }
    return { ...base, fig, shapes };
  },

  mountMission(stage, m, level, api) {
    const n = m.npc;
    const { W, H, dock: DOCK, full: FULL } = BOARDS[matchMedia('(orientation: portrait)').matches ? 'port' : 'land'];
    if (import.meta.env.DEV) window.__g3det = m; // kịch bản thử tự động đọc đáp án
    const { counter, main, speak, row, ask, nudge } = mountStall(stage, {
      npc: n, api, theme: 'detective',
      sign: `<span class="g3d-sign-ic">🕵️</span><span><strong>Thám tử</strong><br>góc vuông</span>`,
      counter: `
        <div class="g3d-bench${m.kind === 'tri' || m.kind === 'quad' ? ' g3d-no-eke' : ''}">
          <div class="g3d-meter" data-meter>
            <button type="button" class="g3d-rot" data-rot="-1" aria-label="Xoay ê-ke ngược chiều kim đồng hồ">⟲</button>
            <span class="g3d-meter-lab" data-meter-lab></span>
            <button type="button" class="g3d-rot" data-rot="1" aria-label="Xoay ê-ke theo chiều kim đồng hồ">⟳</button>
          </div>
          <div class="g3d-board">
            <svg class="g3d-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <g data-art></g><g data-marks></g><g data-fit></g><g data-labels></g><g data-hits></g><g data-dock></g><g data-eke></g>
            </svg>
          </div>
          <div class="g3d-acts" data-acts></div>
        </div>`,
    });
    const bench = counter.querySelector('.g3d-bench');
    const svg = counter.querySelector('.g3d-svg');
    const layer = (k) => svg.querySelector(`[data-${k}]`);
    const art = layer('art'), marks = layer('marks'), labels = layer('labels'), hits = layer('hits'), dockG = layer('dock'), ekeG = layer('eke');
    const fitG = layer('fit');
    const meter = counter.querySelector('[data-meter]'), meterLab = counter.querySelector('[data-meter-lab]');
    const acts = counter.querySelector('[data-acts]');
    let locked = false;

    // Thẻ kết quả không che hình: màn ngang thẻ nằm bên phải (đè lên hộp đồ nghề), màn dọc nằm dưới. Bảng chỉ co
    // vừa đủ để phần hình (đồ vật, dấu góc, tên đỉnh) không nằm dưới thẻ — đo phần giao nhau rồi co thêm, vài lượt.
    const fitCard = () => {
      const card = main.querySelector(':scope > .g3g-result');
      if (!card || !bench.isConnected) return;
      bench.classList.add('g3d-done');
      const portrait = matchMedia('(orientation: portrait)').matches;
      bench.style.paddingRight = bench.style.paddingBottom = '';
      for (let k = 0; k < 8; k++) {
        const mb = main.getBoundingClientRect();
        // offset* không tính hiệu ứng phóng to lúc thẻ bật lên
        const c = { left: mb.left + card.offsetLeft, top: mb.top + card.offsetTop, right: mb.left + card.offsetLeft + card.offsetWidth, bottom: mb.top + card.offsetTop + card.offsetHeight };
        const r = [art, marks, labels].map(g => g.getBoundingClientRect()).filter(b => b.width)
          .reduce((a, b) => ({ left: Math.min(a.left, b.left), top: Math.min(a.top, b.top), right: Math.max(a.right, b.right), bottom: Math.max(a.bottom, b.bottom) }));
        const ox = Math.min(r.right, c.right) - Math.max(r.left, c.left), oy = Math.min(r.bottom, c.bottom) - Math.max(r.top, c.top);
        if (ox <= -8 || oy <= -8) break;
        if (portrait) bench.style.paddingBottom = `${(parseFloat(bench.style.paddingBottom) || 0) + oy + 10}px`;
        else bench.style.paddingRight = `${(parseFloat(bench.style.paddingRight) || 0) + ox + 10}px`;
      }
    };
    new MutationObserver(fitCard).observe(main, { childList: true });
    new ResizeObserver(fitCard).observe(counter);

    const ok = (text, line = 'Chính xác! Thám tử giỏi quá!') => { speak(line, 'happy', line); api.succeed(text); };
    const bad = (line, text, tip) => { speak(line, 'sad', line); api.fail(text, tip); };
    const btn = (label, attrs = '', cls = '') => `<button type="button" class="g3g-btn g3d-btn ${cls}" ${attrs}>${label}</button>`;

    // ── Ê-ke: kéo thả hoặc chạm đỉnh; tự xoay cho cạnh dài trùng cạnh dài hơn của góc ─────────────────────
    let targets = [];      // [{ V, A (điểm trên cạnh dài), B (điểm trên cạnh ngắn) }]
    let L = 80, LB = 58;
    let pose = null, ekeAt = -1;
    const setPose = (p) => {
      pose = p;
      ekeG.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.a.toFixed(1)}) scale(${p.k.toFixed(3)} ${(p.k * p.m).toFixed(3)})`);
    };
    const dockPose = () => {
      const k = Math.min(1, (DOCK.w - 18) / L, (DOCK.h - 36) / LB);
      return { x: DOCK.x + Math.max(9, (DOCK.w - L * k) / 2), y: DOCK.y + DOCK.h - 12, a: 0, m: -1, k };
    };
    const poseFor = (t) => {
      const u1 = unit(sub(t.A, t.V)), u2 = unit(sub(t.B, t.V));
      return { x: t.V[0], y: t.V[1], a: deg(Math.atan2(u1[1], u1[0])), m: cross(u1, u2) > 0 ? 1 : -1, k: 1 };
    };
    const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
    const tween = (to, ms = 450) => new Promise((res) => {
      const from = { ...pose };
      const da = ((to.a - from.a + 540) % 360) - 180;
      const t0 = performance.now();
      const step = (now) => {
        if (!svg.isConnected) return res();
        const k = Math.min(1, (now - t0) / ms), e = ease(k);
        setPose({ x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e, a: from.a + da * e, m: from.m + (to.m - from.m) * e, k: from.k + (to.k - from.k) * e });
        if (k < 1) requestAnimationFrame(step); else { setPose(to); res(); }
      };
      requestAnimationFrame(step);
    });
    // Ê-ke đặt vào góc: đỉnh ê-ke dính vào đỉnh góc nhưng còn lệch `spin` bước (mỗi bước STEP độ, chia đều nên
    // xoay đủ số bước là cạnh dài ê-ke trùng khít cạnh gốc — cạnh dài hơn của góc). Bé tự bấm ⟲ ⟳ để xoay.
    const STEP = 15;
    let spin = 0;
    const atPose = (i, s) => { const p = poseFor(targets[i]); return { ...p, a: p.a + s * STEP }; };
    const mod = (v) => ((v % 360) + 540) % 360 - 180;
    /** Cạnh nào của ê-ke đang trùng cạnh của góc: 'A' cạnh dài trên cạnh gốc, 'B' cạnh ngắn trên cạnh kia, hoặc null. */
    const fitState = (i = ekeAt, s = spin) => {
      if (i < 0) return null;
      const t = targets[i], p = atPose(i, s);
      if (Math.abs(mod(s * STEP)) < 0.5) return 'A';
      const dB = deg(Math.atan2(t.B[1] - t.V[1], t.B[0] - t.V[0]));
      return Math.abs(mod(p.a + 90 * p.m - dB)) < 0.5 ? 'B' : null;
    };
    const startSpin = () => {
      const opts = [-4, -3, -2, 2, 3, 4].filter(s => !fitState(ekeAt, s));
      return opts[Math.floor(Math.random() * opts.length)];
    };
    const updateMeter = () => {
      const on = ekeAt >= 0;
      meter.classList.toggle('g3d-meter-on', on);
      // Chấm neo xoay ở hai đầu nhọn ê-ke chỉ hiện khi ê-ke đang đặt ở một góc; chưa khớp cạnh thì chấm nhấp nháy mời kéo.
      ekeG.classList.toggle('g3d-at', on && !locked);
      ekeG.classList.toggle('g3d-fit', on && !!fitState());
      if (!on) { fitG.innerHTML = ''; return; }
      const [n1, nv, n2] = targets[ekeAt].names;
      const fit = fitState();
      meter.classList.toggle('g3d-meter-ok', !!fit);
      meterLab.innerHTML = `Đang đo góc <b>${n1}</b><b class="g3d-v">${nv}</b><b>${n2}</b><small>đỉnh ${nv}; cạnh ${nv}${n1}, ${nv}${n2}</small>`;
      meter.querySelectorAll('[data-rot]').forEach(b => { b.disabled = locked; });
      // Cạnh ê-ke vừa trùng một cạnh của góc: cạnh đó sáng xanh.
      const t = targets[ekeAt], side = fit === 'A' ? t.A : fit === 'B' ? t.B : null;
      fitG.innerHTML = side ? `<path d="M${pts([t.V, side])}" stroke="#22C55E" stroke-width="9" stroke-linecap="round" opacity="0.55"/>` : '';
    };
    const flyTo = async (i, s = null) => {
      ekeAt = i;
      spin = s ?? startSpin();
      sfx.tap();
      updateMeter();
      await tween(atPose(i, spin));
      updateMeter();
    };
    const rotate = async (dir, ms = 220) => {
      if (ekeAt < 0) return;
      spin += dir;
      sfx.tap();
      fitG.innerHTML = '';
      await tween(atPose(ekeAt, spin), ms);
      updateMeter();
      if (fitState()) sfx.pop(1);
    };
    const flyDock = () => { ekeAt = -1; updateMeter(); return tween(dockPose(), 380); };
    meter.addEventListener('click', (e) => {
      const b = e.target.closest('[data-rot]');
      if (b && !locked && !drag) rotate(Number(b.dataset.rot));
    });

    /** targets: danh sách góc ê-ke áp được. Cạnh dài ê-ke theo cạnh dài hơn; ê-ke vừa với góc ngắn nhất. */
    const setupEke = (corners, { maxL = 96 } = {}) => {
      // names: [tên điểm trên cạnh 1, tên đỉnh, tên điểm trên cạnh 2] — "Đang đo góc BAC".
      targets = corners.map(c => ({ ...(len(sub(c.P1, c.V)) >= len(sub(c.P2, c.V)) ? { V: c.V, A: c.P1, B: c.P2 } : { V: c.V, A: c.P2, B: c.P1 }), names: c.names }));
      const fit = Math.min(...targets.map(t => Math.min(0.9 * len(sub(t.A, t.V)), 1.25 * len(sub(t.B, t.V)))));
      L = Math.max(34, Math.min(maxL, fit));
      LB = L * 0.72;
      dockG.innerHTML = `<rect class="g3d-dock" x="${DOCK.x}" y="${DOCK.y}" width="${DOCK.w}" height="${DOCK.h}" rx="12" fill="#FFF7E6" stroke="#B45309" stroke-width="2.5" stroke-dasharray="7 5"/>
        <text x="${DOCK.x + DOCK.w / 2}" y="${DOCK.y + 21}" text-anchor="middle" font-family="Baloo 2, Quicksand, sans-serif" font-weight="800" font-size="17" fill="#92400E">Ê-ke</text>`;
      // Chấm neo: vòng hit to (dễ chạm bằng ngón tay) + chấm cam nhỏ ở hai đầu nhọn của ê-ke.
      const knob = (x, y) => `<g data-handle><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="20" fill="transparent"/><circle class="g3d-knob" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8" fill="#F97316" stroke="#fff" stroke-width="3"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="10" fill="none" stroke="${INK}" stroke-width="1.5"/></g>`;
      ekeG.innerHTML = `<g class="g3d-eke">${ekeShape(L, LB)}</g><g class="g3d-knobs">${knob(L, 0)}${knob(0, LB)}</g>`;
      ekeG.style.cursor = 'grab';
      setPose(dockPose());
      hits.innerHTML = targets.map((t, i) => `<circle data-t="${i}" cx="${t.V[0].toFixed(1)}" cy="${t.V[1].toFixed(1)}" r="22" fill="transparent" style="cursor:pointer"/>`).join('');
    };
    const toBoard = (e) => {
      const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse());
      return [p.x, p.y];
    };
    let drag = null;
    // Nắm chấm neo kéo vòng quanh đỉnh góc: ê-ke xoay theo, mỗi nấc STEP độ (cùng hay ngược chiều kim đồng hồ).
    let turn = null;
    const aroundV = (p) => { const V = targets[ekeAt].V; return deg(Math.atan2(p[1] - V[1], p[0] - V[0])); };
    ekeG.addEventListener('pointerdown', (e) => {
      if (locked || !targets.length) return;
      e.preventDefault();
      const p = toBoard(e);
      if (e.target.closest('[data-handle]') && ekeAt >= 0) {
        turn = { phi0: aroundV(p), spin0: spin };
        svg.setPointerCapture?.(e.pointerId);
        ekeG.classList.add('g3d-turning');
        fitG.innerHTML = '';
        return;
      }
      drag = { off: sub(p, [pose.x, pose.y]), start: p, moved: 0, from: ekeAt };
      ekeAt = -1;
      updateMeter();
      svg.setPointerCapture?.(e.pointerId);
      ekeG.classList.add('g3d-grab');
    });
    svg.addEventListener('pointermove', (e) => {
      if (turn) {
        const p = toBoard(e);
        if (len(sub(p, targets[ekeAt].V)) < 14) return; // sát đỉnh thì góc quay nhảy lung tung
        const s2 = turn.spin0 + Math.round(mod(aroundV(p) - turn.phi0) / STEP);
        if (s2 !== spin) {
          spin = s2;
          setPose(atPose(ekeAt, spin));
          updateMeter();
          if (fitState()) sfx.pop(1); else sfx.tap();
        }
        return;
      }
      if (!drag) return;
      const p = toBoard(e);
      drag.moved = Math.max(drag.moved, len(sub(p, drag.start)));
      setPose({ ...pose, k: 1, x: p[0] - drag.off[0], y: p[1] - drag.off[1] });
    });
    const drop = () => {
      if (turn) { turn = null; ekeG.classList.remove('g3d-turning'); updateMeter(); return; }
      if (!drag) return;
      const d = drag;
      drag = null;
      ekeG.classList.remove('g3d-grab');
      // Chỉ chạm vào ê-ke (không kéo): ê-ke nằm yên ở góc cũ, giữ nguyên độ xoay bé đã chỉnh.
      if (d.moved < 6 && d.from >= 0) { ekeAt = d.from; setPose(atPose(ekeAt, spin)); updateMeter(); return; }
      // Góc gần đỉnh ê-ke (hoặc gần giữa ê-ke — bé hay cầm giữa) nhất, trong 60 đơn vị bảng.
      const loc = (x, y) => { const r = Math.PI * pose.a / 180; return [pose.x + (x * Math.cos(r) - y * pose.m * Math.sin(r)) * pose.k, pose.y + (x * Math.sin(r) + y * pose.m * Math.cos(r)) * pose.k]; };
      const probes = [loc(0, 0), loc(L / 3, LB / 3)];
      let best = -1, bd = 60;
      targets.forEach((t, i) => probes.forEach(q => { const d = len(sub(q, t.V)); if (d < bd) { bd = d; best = i; } }));
      if (best >= 0) flyTo(best).then(() => sfx.pop?.(1));
      else flyDock();
    };
    svg.addEventListener('pointerup', drop);
    svg.addEventListener('pointercancel', drop);
    hits.addEventListener('click', (e) => {
      const h = e.target.closest('[data-t]');
      if (!h || locked || drag || Number(h.dataset.t) === ekeAt) return;
      flyTo(Number(h.dataset.t));
    });
    /** Nhắc lấy ê-ke: hộp đồ nghề sáng lên, ê-ke nhún. */
    const hintEke = () => {
      svg.classList.remove('g3d-hint');
      void svg.getBoundingClientRect();
      svg.classList.add('g3d-hint');
    };

    /** Ê-ke đi một vòng qua các góc (soi lại), mỗi góc đánh dấu ✓ vuông / ✗ không vuông. */
    const tour = async (list, { markFn } = {}) => {
      for (const i of list) {
        if (!svg.isConnected) return;
        // Soi lại cũng làm đúng cách bé làm: đặt ê-ke vào đỉnh, xoay từng bước tới khi cạnh ê-ke trùng cạnh gốc.
        const s0 = Math.random() < 0.5 ? -2 : 2;
        await flyTo(i, s0);
        for (let k = 0; k < 2; k++) { await sleep(90); await rotate(-Math.sign(s0), 170); }
        await sleep(200);
        const t = targets[i];
        const right = isRight(t.V, t.A, t.B);
        marks.insertAdjacentHTML('beforeend', right ? rightMark(t.V, t.A, t.B) : crossMark(t.V, t.A, t.B));
        (markFn || (() => {}))(i, right);
        if (right) sfx.pop(i); else sfx.boing();
        await sleep(320);
      }
      await flyDock();
    };

    /** Gắn tên cho từng góc của đa giác: [đỉnh trước, đỉnh, đỉnh sau]. */
    const named = (cs, names) => cs.map((c, i) => ({ ...c, names: [names[(i + cs.length - 1) % cs.length], names[i], names[(i + 1) % cs.length]] }));
    const lettersFor = (P, names, size = 20, off = 17) => P.map((V, i) => {
      const o = outward(V, P[(i + P.length - 1) % P.length], P[(i + 1) % P.length]);
      return letter(add(V, mul(o, off)), names[i], size);
    }).join('');
    const polySvg = (P, fill = '#FFFFFF', extra = '') => `<polygon points="${pts(P)}" fill="${fill}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" ${extra}/>`;
    const dots = (P, r = 4) => P.map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${r}" fill="${INK}"/>`).join('');

    // ════ check: một góc trên đồ vật ════════════════════════════════════════════════════════════════
    if (m.kind === 'check') {
      const { o } = m;
      const [nv, na, nb] = m.names;
      const away = (P, other) => {
        const u = unit(sub(P, o.V)), nrm = [-u[1], u[0]];
        const s = cross(u, sub(other, o.V)) > 0 ? -1 : 1;
        return add(P, add(mul(nrm, 16 * s), mul(u, 4)));
      };
      art.innerHTML = o.svg;
      marks.innerHTML = angleArc(o.V, o.P1, o.P2);
      labels.innerHTML = dots([o.V, o.P1, o.P2], 4.5) + letter(add(o.V, mul(outward(o.V, o.P1, o.P2), 20)), nv)
        + letter(away(o.P1, o.P2), na) + letter(away(o.P2, o.P1), nb);
      setupEke([{ V: o.V, P1: o.P1, P2: o.P2, names: [na, nv, nb] }]);
      const angleName = `góc đỉnh ${nv}; cạnh ${nv}${na}, ${nv}${nb}`;
      speak(`Góc đỉnh ${nv} ở ${o.name} có phải góc vuông không? ${cap(n.you)} lấy ê-ke ra kiểm tra!`, null,
        `Góc đỉnh <b class="g3f-want">${nv}</b> có vuông không?`);
      acts.innerHTML = btn('📐 Góc vuông', 'data-ans="1"', 'g3d-ans') + btn('Góc không vuông', 'data-ans="0"', 'g3d-ans');
      acts.addEventListener('click', async (e) => {
        const b = e.target.closest('[data-ans]');
        if (!b || locked) return;
        if (ekeAt < 0) { speak(`Áp ê-ke vào đỉnh ${nv} trước đã!`, null, `Áp ê-ke vào đỉnh <b>${nv}</b> trước!`); hintEke(); return; }
        const fit = fitState();
        if (!fit) {
          speak('Nắm chấm cam ở đầu ê-ke kéo vòng để xoay, cho một cạnh ê-ke trùng khít một cạnh của góc trước đã!', null, 'Kéo <b class="g3d-dot">●</b> ở đầu ê-ke để xoay cho khít một cạnh!');
          meter.classList.remove('g3d-hint-rot'); void meter.offsetWidth; meter.classList.add('g3d-hint-rot');
          return;
        }
        locked = true;
        updateMeter();
        const said = b.dataset.ans === '1';
        acts.querySelectorAll('button').forEach(x => { x.disabled = true; x.classList.toggle('g3d-on', x === b); });
        await sleep(250);
        const t = targets[0];
        if (m.right) marks.insertAdjacentHTML('beforeend', rightMark(t.V, t.A, t.B, 16));
        else {
          // Cạnh ê-ke KHÔNG nằm trên cạnh góc, kéo dài bằng nét đứt đỏ — thấy rõ khe hở giữa ê-ke và cạnh của góc.
          const dir = fit === 'A' ? pose.a + 90 * pose.m : pose.a;
          const q = add(t.V, mul([Math.cos(dir * Math.PI / 180), Math.sin(dir * Math.PI / 180)], fit === 'A' ? LB * 1.35 : L * 1.15));
          marks.insertAdjacentHTML('beforeend', `<path d="M${pts([t.V, q])}" stroke="#EF4444" stroke-width="3" stroke-dasharray="7 5" stroke-linecap="round"/>${crossMark(t.V, t.A, t.B, 30)}`);
        }
        if (m.right) sfx.pop(1); else sfx.boing();
        await sleep(500);
        const verdict = m.right ? 'góc vuông' : 'góc không vuông';
        if (said === m.right) return ok(`Đúng! ${cap(angleName)} là <b>${verdict}</b>.`);
        bad(m.right ? 'Ê-ke khít cả hai cạnh mà!' : 'Còn khe hở kìa!', `${cap(angleName)} là <b>${verdict}</b>.`,
          m.right
            ? `Một cạnh ê-ke trùng một cạnh của góc, cạnh kia của ê-ke cũng trùng cạnh còn lại — đó là góc vuông${m.o.name === 'khung tranh' || m.o.name === 'cửa sổ' || m.o.name === 'quyển sách' ? ', dù đồ vật treo nghiêng' : ''}.`
            : `Một cạnh ê-ke trùng cạnh của góc, nhưng cạnh kia của ê-ke lệch khỏi cạnh còn lại (nét đứt đỏ) — đó là góc không vuông.`);
      });
      return;
    }

    // ════ find / count: các góc vuông của một hình ═════════════════════════════════════════════════
    if (m.kind === 'find' || m.kind === 'count') {
      const { P } = fitPts(m.P, REGION, 64);
      const names = m.name.split('');
      const cs = cornersOf(P);
      const rights = cs.map((c, i) => (c.right ? i : -1)).filter(i => i >= 0);
      art.innerHTML = polySvg(P, '#FFF7ED');
      labels.innerHTML = dots(P) + lettersFor(P, names);
      setupEke(named(cs, names));
      // Góc của ê-ke (targets) cùng thứ tự với đỉnh của hình.
      const rightList = rights.length ? rights.map(i => `đỉnh ${names[i]}`).join(', ') : '';
      const rotated = m.rot ? ' (hình nằm nghiêng vẫn có thể có góc vuông)' : '';

      if (m.kind === 'find') {
        const flags = new Set();
        const drawFlags = () => {
          marks.innerHTML = [...flags].map(i => rightMark(P[i], cs[i].P1, cs[i].P2, 15, '#F97316')).join('');
          acts.querySelectorAll('[data-flag]').forEach(b => b.classList.toggle('g3d-on', flags.has(Number(b.dataset.flag))));
        };
        speak(`Hình ${m.name} có những góc vuông nào? ${cap(n.you)} dùng ê-ke kiểm tra rồi đánh dấu các đỉnh có góc vuông!`, null,
          `Đánh dấu các <b class="g3f-want">góc vuông</b> của hình ${m.name}!`);
        acts.innerHTML = `<span class="g3d-acts-lab">Góc vuông ở đỉnh:</span>${names.map((c, i) => btn(c, `data-flag="${i}"`, 'g3d-letter')).join('')}${btn('✔ Xong', 'data-done', 'g3d-done-btn')}`;
        acts.addEventListener('click', async (e) => {
          if (locked) return;
          const f = e.target.closest('[data-flag]');
          if (f) { const i = Number(f.dataset.flag); if (flags.has(i)) flags.delete(i); else flags.add(i); sfx.tap(); drawFlags(); return; }
          if (!e.target.closest('[data-done]')) return;
          locked = true;
          acts.querySelectorAll('button').forEach(x => { x.disabled = true; });
          await tour(P.map((_, i) => i));
          const good = rights.length === flags.size && rights.every(i => flags.has(i));
          const fact = rights.length ? `Hình ${m.name} có <b>${rights.length} góc vuông</b>: ${rightList}.` : `Hình ${m.name} <b>không có góc vuông</b> nào.`;
          if (good) return ok(`Đúng! ${fact}`);
          bad('Chưa đúng các góc vuông rồi!', fact, `Áp ê-ke vào từng đỉnh: đỉnh nào ê-ke khít cả hai cạnh mới là góc vuông${rotated}.`);
        });
        return;
      }

      // count: gõ số góc vuông, rồi bấm soi — ê-ke đi một vòng kiểm tra.
      speak(`Hình ${m.name} có mấy góc vuông? ${cap(n.you)} dùng ê-ke đếm rồi gõ số!`, null, `Hình ${m.name} có <b class="g3f-want">mấy góc vuông</b>?`);
      let armed = null;
      acts.innerHTML = btn('🔍 Soi bằng ê-ke', 'data-soi', 'g3d-soi g3d-soi-wait');
      const soi = acts.querySelector('[data-soi]');
      soi.onclick = async () => {
        if (!armed) { speak(`Đếm rồi gõ số góc vuông vào máy tính trước đã!`, null, 'Gõ số góc vuông trước!'); nudge(); return; }
        const v = armed; armed = null;
        soi.disabled = true; soi.classList.remove('g3d-soi-ready');
        await tour(P.map((_, i) => i));
        const fact = `Hình ${m.name} có <b>${rights.length} góc vuông</b>${rights.length ? `: ${rightList}` : ''}.`;
        if (v.value === rights.length) { v.pad.lock('g3g-keypad-ok'); return ok(`Đúng! ${fact}`); }
        v.pad.lock('g3g-keypad-bad');
        bad(`Hình này có ${rights.length} góc vuông cơ!`, fact, `Áp ê-ke lần lượt vào từng đỉnh, đếm các góc ê-ke khít cả hai cạnh${rotated}.`);
      };
      ask(row('📐', 'Góc vuông', Q, true), 'góc', (value, pad) => {
        pad.lock();
        locked = true;
        armed = { value, pad };
        soi.classList.remove('g3d-soi-wait'); soi.classList.add('g3d-soi-ready');
        speak('Bấm soi để kiểm tra lại bằng ê-ke!', null, 'Bấm <b>🔍 Soi</b> để kiểm tra!');
      });
      return;
    }

    // ════ what: hình trên lưới là hình gì ══════════════════════════════════════════════════════════
    if (m.kind === 'what') {
      const fp = fitPts(m.P, { x: REGION.x + 20, y: REGION.y + 18, w: REGION.w - 40, h: REGION.h - 36 }, 46);
      const cell = Math.floor(fp.s);
      const { P } = fitPts(m.P, { x: REGION.x + 20, y: REGION.y + 18, w: REGION.w - 40, h: REGION.h - 36 }, cell);
      const ox = P[0][0] - m.P[0][0] * cell, oy = P[0][1] - m.P[0][1] * cell;
      const names = m.name.split('');
      const cs = cornersOf(P);
      art.innerHTML = `<rect x="${REGION.x}" y="${REGION.y}" width="${REGION.w}" height="${REGION.h}" rx="10" fill="#fff"/>${gridSvg(REGION.x, REGION.y, REGION.w, REGION.h, cell, ox, oy)}${polySvg(P, '#DBEAFE', 'fill-opacity="0.75"')}`;
      labels.innerHTML = dots(P) + lettersFor(P, names);
      setupEke(named(cs, names));
      const real = m.cls;
      speak(`Hình ${m.name} là hình gì? ${cap(n.you)} đếm cạnh, dùng ê-ke và đếm ô vuông để điều tra!`, null, `Hình <b class="g3f-want">${m.name}</b> là hình gì?`);
      const step1 = () => { acts.innerHTML = btn('🔺 Hình tam giác', 'data-c="tri"', 'g3d-ans') + btn('⬜ Hình tứ giác', 'data-c="four"', 'g3d-ans'); };
      step1();
      const sideLabels = () => P.map((p, i) => {
        const q = P[(i + 1) % P.length], mid = mul(add(p, q), 0.5);
        const c = [P.reduce((s, x) => s + x[0], 0) / P.length, P.reduce((s, x) => s + x[1], 0) / P.length];
        const o = add(mid, mul(unit(sub(mid, c)), 20));
        const cells = Math.round(len(sub(q, p)) / cell);
        return `<text x="${o[0].toFixed(1)}" y="${(o[1] + 6).toFixed(1)}" text-anchor="middle" font-family="Baloo 2, Quicksand, sans-serif" font-weight="800" font-size="16" fill="#1D4ED8" stroke="#fff" stroke-width="4" paint-order="stroke">${cells} ô</text>`;
      }).join('');
      const finish = async (said) => {
        locked = true;
        acts.querySelectorAll('button').forEach(x => { x.disabled = true; x.classList.toggle('g3d-on', x.dataset.c === said); });
        if (P.length === 4) await tour([0, 1, 2, 3]);
        else marks.insertAdjacentHTML('beforeend', P.map((p, i) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="12" fill="#F97316" fill-opacity="0.25" stroke="#F97316" stroke-width="2.5"/>${letter(add(p, mul(outward(p, P[(i + 2) % 3], P[(i + 1) % 3]), -30)), String(i + 1), 16)}`).join(''));
        if (real === 'rect' || real === 'square') labels.insertAdjacentHTML('beforeend', sideLabels());
        await sleep(300);
        const rightCount = cs.filter(c => c.right).length;
        const fact = `Hình ${m.name} là <b>${CLASS_NAME[real]}</b>.`;
        if (said === real) return ok(`Đúng! ${fact}`);
        const tips = {
          tri: 'Hình có 3 cạnh, 3 đỉnh là hình tam giác.',
          quad: `Hình có 4 cạnh là hình tứ giác. Hình này ${rightCount ? `chỉ có ${rightCount} góc vuông` : 'không có góc vuông nào'}, chưa đủ 4 góc vuông nên không phải hình chữ nhật hay hình vuông.`,
          rect: 'Hình có 4 góc vuông là hình chữ nhật. Hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau — không phải 4 cạnh đều bằng nhau nên không phải hình vuông.',
          square: 'Hình có 4 góc vuông và 4 cạnh bằng nhau (đếm ô) là hình vuông.',
        };
        bad('Hình này không phải như vậy đâu!', fact, tips[real]);
      };
      acts.addEventListener('click', (e) => {
        const b = e.target.closest('[data-c]');
        if (!b || locked) return;
        sfx.tap();
        const c = b.dataset.c;
        if (c === 'tri') return finish('tri');
        if (c === 'four') {
          if (P.length === 3) return finish('quad');
          acts.innerHTML = `<span class="g3d-acts-lab">Hình tứ giác này là:</span>${btn('Hình chữ nhật', 'data-c="rect"', 'g3d-ans')}${btn('Hình vuông', 'data-c="square"', 'g3d-ans')}${btn('Chỉ là hình tứ giác', 'data-c="quad"', 'g3d-ans')}`;
          speak('Có đủ 4 góc vuông không? Các cạnh có bằng nhau không?', null, 'Đủ <b>4 góc vuông</b> không? Cạnh bằng nhau không?');
          return;
        }
        finish(c);
      });
      return;
    }

    // ════ pick: tìm mọi hình chữ nhật / hình vuông trong 4 hình ════════════════════════════════════
    if (m.kind === 'pick') {
      const cols = 2, pw = REGION.w / cols - 6, ph = REGION.h / 2 - 6;
      const boxes = m.shapes.map((_, i) => ({ x: REGION.x + (i % cols) * (pw + 12), y: REGION.y + Math.floor(i / cols) * (ph + 12), w: pw, h: ph }));
      const cell = Math.floor(Math.min(...m.shapes.map((s, i) => {
        const xs = s.P.map(p => p[0]), ys = s.P.map(p => p[1]);
        return Math.min((boxes[i].w - 44) / (Math.max(...xs) - Math.min(...xs)), (boxes[i].h - 44) / (Math.max(...ys) - Math.min(...ys)));
      }).concat(26)));
      const placed = m.shapes.map((s, i) => fitPts(s.P, { x: boxes[i].x + 22, y: boxes[i].y + 22, w: boxes[i].w - 44, h: boxes[i].h - 44 }, cell));
      art.innerHTML = m.shapes.map((s, i) => {
        const b = boxes[i], { P } = placed[i];
        const ox = P[0][0] - s.P[0][0] * cell, oy = P[0][1] - s.P[0][1] * cell;
        return `<g data-panel="${i}" style="cursor:pointer"><rect class="g3d-panel" x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="10" fill="#fff" stroke="#CBD5E1" stroke-width="2.5"/>
          <clipPath id="g3d-pc-${i}"><rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="10"/></clipPath>
          <g clip-path="url(#g3d-pc-${i})">${gridSvg(b.x, b.y, b.w, b.h, cell, ox, oy)}</g>
          ${polySvg(P, FILLS[(i * 3 + 1) % FILLS.length], 'fill-opacity="0.45"')}</g>`;
      }).join('');
      labels.innerHTML = placed.map((pl, i) => dots(pl.P, 3) + lettersFor(pl.P, m.shapes[i].name.split(''), 15, 12)).join('');
      setupEke(placed.flatMap((pl, i) => named(cornersOf(pl.P), m.shapes[i].name.split(''))), { maxL: 50 });
      const tname = CLASS_NAME[m.target];
      const chosen = new Set();
      const sync = () => {
        art.querySelectorAll('[data-panel]').forEach(g => g.classList.toggle('g3d-picked', chosen.has(Number(g.dataset.panel))));
        acts.querySelectorAll('[data-shape]').forEach(b => b.classList.toggle('g3d-on', chosen.has(Number(b.dataset.shape))));
      };
      const toggle = (i) => { if (chosen.has(i)) chosen.delete(i); else chosen.add(i); sfx.tap(); sync(); };
      speak(`${cap(n.you)} tìm giúp ${n.me} tất cả ${tname} ở đây! Chạm vào hình để chọn.`, null, `Tìm tất cả <b class="g3f-want">${tname}</b>!`);
      acts.innerHTML = `${m.shapes.map((s, i) => btn(s.name, `data-shape="${i}"`, 'g3d-letter g3d-name')).join('')}${btn('✔ Xong', 'data-done', 'g3d-done-btn')}`;
      art.addEventListener('click', (e) => {
        const g = e.target.closest('[data-panel]');
        if (g && !locked && !drag) toggle(Number(g.dataset.panel));
      });
      acts.addEventListener('click', async (e) => {
        if (locked) return;
        const s = e.target.closest('[data-shape]');
        if (s) return toggle(Number(s.dataset.shape));
        if (!e.target.closest('[data-done]')) return;
        locked = true;
        acts.querySelectorAll('button').forEach(x => { x.disabled = true; });
        // Soi từng hình: đánh dấu 4 góc (✓ / ✗), hình đúng loại viền xanh.
        for (let i = 0; i < m.shapes.length; i++) {
          if (!svg.isConnected) return;
          const { P } = placed[i];
          const cs = cornersOf(P);
          marks.insertAdjacentHTML('beforeend', cs.map(c => (c.right ? rightMark(c.V, c.P1, c.P2, 10) : crossMark(c.V, c.P1, c.P2, 18))).join(''));
          const hit = m.shapes[i].cls === m.target;
          art.querySelector(`[data-panel="${i}"] .g3d-panel`).setAttribute('stroke', hit ? '#16A34A' : '#94A3B8');
          art.querySelector(`[data-panel="${i}"] .g3d-panel`).setAttribute('stroke-width', hit ? '5' : '2.5');
          if (hit) sfx.pop(i); else sfx.tap();
          await sleep(650);
        }
        const want = m.shapes.map((s, i) => (s.cls === m.target ? i : -1)).filter(i => i >= 0);
        const list = want.map(i => m.shapes[i].name).join(', ');
        const fact = `Có <b>${want.length} ${tname}</b>: ${list}.`;
        if (want.length === chosen.size && want.every(i => chosen.has(i))) return ok(`Đúng! ${fact}`);
        const tip = m.target === 'rect'
          ? 'Hình chữ nhật phải có đủ 4 góc vuông — hình nằm nghiêng một cạnh hay có góc lệch thì không phải.'
          : 'Hình vuông có 4 góc vuông và 4 cạnh bằng nhau — đếm ô vuông trên mỗi cạnh để so. Hình dài hơn rộng một ô là hình chữ nhật.';
        bad('Chưa tìm đúng rồi!', fact, tip);
      });
      return;
    }

    // ════ tri / quad: đếm hình trong hình ghép (không dùng ê-ke) ═════════════════════════════════════
    const fig = m.fig;
    const keys = Object.keys(fig.P);
    const raw = keys.map(k => fig.P[k]);
    const { P: placedPts } = fitPts(raw, FULL, 70);
    const at = Object.fromEntries(keys.map((k, i) => [k, placedPts[i]]));
    const cen = [placedPts.reduce((s, p) => s + p[0], 0) / keys.length, placedPts.reduce((s, p) => s + p[1], 0) / keys.length];
    art.innerHTML = `<g data-fill></g>${fig.lines.map(l => `<path d="M${pts([at[l[0]], at[l[l.length - 1]]])}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`).join('')}`;
    labels.innerHTML = keys.map(k => {
      const p = at[k], d = sub(p, cen);
      const o = len(d) < 8 ? [0, 22] : mul(unit(d), 19);
      return `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4" fill="${INK}"/>${letter(add(p, o), k)}`;
    }).join('');
    const word = m.kind === 'tri' ? 'hình tam giác' : 'hình tứ giác';
    const order = (s) => s.map(k => k).join('');
    const nameList = m.shapes.map(order);
    speak(`Trong hình này có tất cả bao nhiêu ${word}? ${cap(n.you)} đếm cả hình nhỏ lẫn hình to!`, null, `Có mấy <b class="g3f-want">${word}</b>?`);
    acts.innerHTML = `${btn('🔍 Soi hình', 'data-soi', 'g3d-soi g3d-soi-wait')}<span class="g3d-chips" data-chips></span>`;
    const soi = acts.querySelector('[data-soi]');
    const chips = acts.querySelector('[data-chips]');
    const fillG = art.querySelector('[data-fill]');
    let armed = null;
    soi.onclick = async () => {
      if (!armed) { speak(`Đếm rồi gõ số ${word} vào máy tính trước đã!`, null, `Gõ số ${word} trước!`); nudge(); return; }
      const v = armed; armed = null;
      soi.disabled = true; soi.classList.remove('g3d-soi-ready');
      // Máy soi tô màu lần lượt từng hình, tên hình hiện thành một dãy thẻ.
      for (let i = 0; i < m.shapes.length; i++) {
        if (!svg.isConnected) return;
        const c = FILLS[i % FILLS.length];
        fillG.innerHTML = `<polygon points="${pts(m.shapes[i].map(k => at[k]))}" fill="${c}" fill-opacity="0.55" stroke="${c}" stroke-width="7" stroke-linejoin="round"/>`;
        chips.insertAdjacentHTML('beforeend', `<span class="g3d-chip" style="--c:${c}">${i + 1}. ${nameList[i]}</span>`);
        sfx.pop(i);
        await sleep(calmMotion() ? 950 : 850);
      }
      fillG.innerHTML = '';
      const fact = `Có <b>${m.shapes.length} ${word}</b>: ${nameList.join(', ')}.`;
      if (v.value === m.shapes.length) { v.pad.lock('g3g-keypad-ok'); return ok(`Đúng! ${fact}`); }
      v.pad.lock('g3g-keypad-bad');
      bad(`Có tới ${m.shapes.length} ${word} cơ!`, fact,
        m.kind === 'tri'
          ? 'Đếm hình nhỏ trước, rồi tìm hình to ghép từ hai, ba hình nhỏ liền nhau — mỗi hình tam giác gọi tên bằng 3 đỉnh.'
          : 'Đếm hình nhỏ trước, rồi ghép hai, ba hình liền nhau xem có thành hình tứ giác to hơn không — mỗi hình gọi tên bằng 4 đỉnh.');
    };
    ask(row(m.kind === 'tri' ? '🔺' : '⬜', cap(word), Q, true), 'hình', (value, pad) => {
      pad.lock();
      armed = { value, pad };
      soi.classList.remove('g3d-soi-wait'); soi.classList.add('g3d-soi-ready');
      speak('Bấm soi để máy tô màu từng hình!', null, 'Bấm <b>🔍 Soi hình</b> để kiểm tra!');
    });
  },
};
