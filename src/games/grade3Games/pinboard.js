/**
 * 🏗️ Kiến trúc sư bảng ghim — bé là kiến trúc sư nhận đơn thiết kế. Thiết kế: docs/lop_3/thiet-ke-tro-choi-tap1.md §4.6.
 *   Cấp 1 (Bài 16): mid — cắm ghim vào trung điểm của đoạn thẳng (dây chun căng sẵn); between — cắm ghim vào một điểm
 *                   ở giữa hai ghim (dây chun chỉ căng khi kiểm tra: thẳng hay gập); check — câu Đ / S kiểu vở bài tập.
 *                   Kiểm tra: đếm từng ô từ mỗi đầu tới điểm đó.
 *   Cấp 2 (Bài 19, 20): cắm ghim, dây chun tự căng quanh các ghim — hình chữ nhật dài a ô rộng b ô, hình vuông, hình tam
 *                   giác có / không có góc vuông, hình tứ giác có 2 / không có góc vuông, dời một ghim cho thành hình chữ nhật.
 *   Cấp 3 (Bài 17, 20): compa — cắm mũi nhọn vào tâm, kéo đầu bút chì ra xa để mở compa (1 ô = 1 cm), kéo đầu bút vòng
 *                   quanh tâm cho đủ một vòng. Đơn: bán kính, đường kính (tính bán kính trước), đi qua một điểm, đường kính là đoạn thẳng AB.
 *   Cấp 4 (Bài 20): vẽ trang trí trên giấy ô vuông — tô nửa còn lại của hình gấp đôi, vẽ theo mẫu, vẽ tiếp hoa văn.
 * Bé luôn tự bấm "Xong"; trò chơi không báo trước là đã đúng. Dùng khung quầy của Chợ phiên (market/stall.js), theme 'pin'.
 */

import { INK, rightMark, crossMark, sub, add, mul, len, cross, dot } from './art/detective.js';
import {
  CELL, MARGIN, PIN_COLORS, PAINTS, woodBoard, pinSvg, pinIcon, tag, bandSvg, arcPath, compassSvg, compassIcon,
  pinboardIcon, paperSvg, paperLines, cellSvg,
} from './art/pinboard.js';
import { NPCS, cap } from './npc.js';
import { mountStall, Q } from './market/stall.js';
import { stallMeta, levelMeta } from './catalog.js';
import { sfx } from '../preschool/fx.js';
import { flyOne, svgBoxOnScreen, calmMotion } from './fly.js';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const FONT = 'Baloo 2, Quicksand, sans-serif';

// Đề sinh trong khung chung 7 × 6 ô (vừa cả bảng màn ngang 10 × 6 lẫn màn dọc 7 × 8), lúc vẽ thì dời vào giữa bảng thật.
const GEN = { cols: 7, rows: 6 };
const BOARDS = { land: { cols: 10, rows: 6 }, port: { cols: 7, rows: 8 } };
const DIRS = { h: [1, 0], v: [0, 1], d: [1, 1], e: [1, -1] };
const NAMESETS = [['A', 'B', 'M'], ['C', 'D', 'I'], ['E', 'G', 'O'], ['P', 'Q', 'K'], ['M', 'N', 'I'], ['H', 'K', 'O']];
const ROWNAMES = [['A', 'B', 'C', 'D', 'E'], ['M', 'N', 'P', 'Q', 'R'], ['G', 'H', 'I', 'K', 'L']];
const FIXED_PIN = '#3B82F6';

const same = (a, b) => a[0] === b[0] && a[1] === b[1];
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
/** X nằm trên đoạn thẳng YZ, khác hai đầu (ba điểm thẳng hàng, X ở giữa). */
const isBetween = (X, Y, Z) => cross(sub(X, Y), sub(Z, Y)) === 0 && dot(sub(X, Y), sub(Z, Y)) > 0 && dot(sub(X, Z), sub(Y, Z)) > 0;
const isMid = (X, Y, Z) => isBetween(X, Y, Z) && 2 * X[0] === Y[0] + Z[0] && 2 * X[1] === Y[1] + Z[1];
/** Số bước lưới (ô, hoặc ô chéo) từ Y tới Z trên một đường ngang / dọc / chéo. */
const stepsOf = (Y, Z) => gcd(Z[0] - Y[0], Z[1] - Y[1]);
const oWord = (Y, Z) => (Y[0] === Z[0] || Y[1] === Z[1] ? 'ô' : 'ô chéo');
const fmt = (v) => String(Math.round(v * 100) / 100).replace('.', ',');

/** Xếp các điểm theo góc quanh trọng tâm — dây chun luôn là một hình không tự cắt, dù bé cắm ghim theo thứ tự nào. */
function around(list, pos = (p) => p) {
  if (list.length < 3) return [...list];
  const c = list.reduce((s, p) => add(s, pos(p)), [0, 0]).map(v => v / list.length);
  return [...list].sort((a, b) => {
    const pa = sub(pos(a), c), pb = sub(pos(b), c);
    return Math.atan2(pa[1], pa[0]) - Math.atan2(pb[1], pb[0]);
  });
}

/** Hình dây chun qua các đỉnh (toạ độ lưới): góc vuông, ba ghim thẳng hàng, độ dài cạnh (ô). */
function analyze(Pq) {
  const S = around(Pq);
  const k = S.length;
  const corners = S.map((V, i) => {
    const P1 = S[(i + k - 1) % k], P2 = S[(i + 1) % k];
    return { V, P1, P2, right: dot(sub(P1, V), sub(P2, V)) === 0, flat: cross(sub(P1, V), sub(P2, V)) === 0 };
  });
  const sides = S.map((p, i) => len(sub(S[(i + 1) % k], p)));
  return { S, k, corners, sides, flat: k >= 3 && corners.some(c => c.flat), rights: corners.filter(c => c.right && !c.flat).length };
}

// ── Hình trang trí (cấp 4): a / b = hai màu, '.' = ô trống. axis 'v' gấp theo đường dọc giữa, 'h' theo đường ngang. ─────
const PICTURES = [
  { id: 'heart', name: 'trái tim', axis: 'v', colors: ['#F07167', '#F7A1C4'], rows: ['aa..aa', 'abaaba', 'aaaaaa', '.aaaa.', '..aa..'] },
  { id: 'tree', name: 'cây thông', axis: 'v', colors: ['#7BCB8B', '#B07A4F'], rows: ['..aa..', '.aaaa.', 'aaaaaa', '.aaaa.', 'aaaaaa', '..bb..', '..bb..'] },
  { id: 'house', name: 'ngôi nhà', axis: 'v', colors: ['#F07167', '#FFD166'], rows: ['..aa..', '.aaaa.', 'aaaaaa', 'bbbbbb', 'bb..bb', 'bb..bb'] },
  { id: 'butterfly', name: 'con bướm', axis: 'v', colors: ['#B9A7F0', '#FFD166'], rows: ['aa....aa', 'aba..aba', 'abbaabba', '.abaaba.', 'aba..aba', 'aa....aa'] },
  { id: 'rocket', name: 'tên lửa', axis: 'v', colors: ['#6FB7EA', '#F4A259'], rows: ['..aa..', '.aaaa.', '.abba.', '.aaaa.', 'aaaaaa', 'a.bb.a'] },
  { id: 'crown', name: 'vương miện', axis: 'v', colors: ['#FFD166', '#F07167'], rows: ['a..aa..a', 'aa.aa.aa', 'aaaaaaaa', 'abbaabba', 'aaaaaaaa'] },
  { id: 'fish', name: 'con cá', axis: 'h', colors: ['#6FB7EA', '#F4A259'], rows: ['..aaa..b', '.aabaabb', 'aaaaaab.', 'aaaaaab.', '.aabaabb', '..aaa..b'] },
  { id: 'arrow', name: 'mũi tên', axis: 'h', colors: ['#7BCB8B', '#FFD166'], rows: ['....a...', 'bbbbaa..', 'bbbbaaa.', 'bbbbaaa.', 'bbbbaa..', '....a...'] },
];
if (import.meta.env.DEV) {
  for (const p of PICTURES) {
    const ok = p.axis === 'v' ? p.rows.every(r => r === [...r].reverse().join('')) : p.rows.every((r, j) => r === p.rows[p.rows.length - 1 - j]);
    if (!ok) console.warn(`[pinboard] hình ${p.id} không đối xứng`);
  }
}

// ════ Sinh đề ═══════════════════════════════════════════════════════════════════════════════════════
/** Đoạn thẳng dài L bước theo hướng dir, nằm gọn trong khung chung. */
function segment(rng, dir, L) {
  const [dx, dy] = DIRS[dir];
  const w = Math.abs(dx * L), h = Math.abs(dy * L);
  const x0 = rng.int(0, GEN.cols - w), y0 = rng.int(0, GEN.rows - h);
  const A = [x0, dy >= 0 ? y0 : y0 + h];
  const B = [A[0] + dx * L, A[1] + dy * L];
  return rng() < 0.5 ? [A, B] : [B, A];
}

const GENS = {
  mid(rng, prev) {
    const dir = rng.pick(['h', 'v', 'd', 'e'].filter(d => d !== prev?.dir));
    const L = rng.pick(dir === 'h' || dir === 'v' ? [2, 4, 6] : [2, 4]);
    const [A, B] = segment(rng, dir, L);
    return { dir, A, B, names: rng.pick(NAMESETS) };
  },
  between(rng, prev, sameKind) {
    const dir = rng.pick(['h', 'v', 'd', 'e'].filter(d => d !== prev?.dir));
    const L = rng.pick(dir === 'h' ? [3, 4, 5, 6, 7] : dir === 'v' ? [3, 4, 5, 6] : [3, 4, 5]);
    const [A, B] = segment(rng, dir, L);
    // Lần thứ hai trong ván: điểm ở giữa nhưng KHÔNG phải trung điểm (phân biệt hai khái niệm của Bài 16).
    return { dir, A, B, names: rng.pick(NAMESETS), notMid: sameKind.length % 2 === 1 };
  },
  check(rng, prev, sameKind) {
    const last = sameKind.slice(-2).map(h => h.st.truth);
    let want = last.length === 2 && last[0] === last[1] ? !last[0] : rng() < 0.5;
    // Hai lượt Đ / S trong ván: một câu "trung điểm", một câu "điểm ở giữa".
    const type = prev ? (prev.st.type === 'mid' ? 'between' : 'mid') : rng.pick(['mid', 'between']);
    for (let t = 0; t < 200; t++) {
      if (t === 150) want = !want;
      const axis = rng.pick(['h', 'v']);
      const span = axis === 'h' ? GEN.cols : GEN.rows, across = axis === 'h' ? GEN.rows : GEN.cols;
      const gaps = Array.from({ length: 4 }, () => rng.int(1, 3));
      const total = gaps.reduce((a, b) => a + b, 0);
      if (total > span) continue;
      let at = rng.int(0, span - total);
      const c0 = rng.int(1, across - 1);
      const line = [at, ...gaps.map(g => (at += g))];
      const pts = line.map(a => (axis === 'h' ? [a, c0] : [c0, a]));
      let bent = -1, side = 0;
      if (rng() < 0.4) {
        bent = rng.int(1, 3);
        side = rng.pick([-1, 1]);
        pts[bent] = axis === 'h' ? [pts[bent][0], pts[bent][1] + side] : [pts[bent][0] + side, pts[bent][1]];
      }
      const cands = [];
      for (let x = 1; x <= 3; x++) {
        for (const type of ['mid', 'between']) {
          const [Y, X, Z] = [pts[x - 1], pts[x], pts[x + 1]];
          cands.push({ x, type, truth: type === 'mid' ? isMid(X, Y, Z) : isBetween(X, Y, Z) });
        }
      }
      const good = cands.filter(c => c.truth === want && c.type === type && (bent < 0 || Math.abs(c.x - bent) <= 1));
      if (!good.length) continue;
      return { axis, pts, bent, side, names: rng.pick(ROWNAMES), st: rng.pick(good) };
    }
    return { axis: 'h', pts: [[0, 3], [2, 3], [4, 3], [5, 3], [7, 3]], bent: -1, side: 0, names: ROWNAMES[0], st: { x: 1, type: 'mid', truth: true } };
  },
  rect(rng, prev) {
    let w, h;
    do { w = rng.int(3, 6); h = rng.int(2, 4); } while (w === h || (prev && prev.w === w && prev.h === h));
    return { w, h };
  },
  square(rng, prev) {
    let s;
    do { s = rng.int(2, 4); } while (prev && prev.s === s);
    return { s };
  },
  tri(rng, prev) { return { variant: prev ? (prev.variant === 'right' ? 'none' : 'right') : rng.pick(['right', 'none']) }; },
  quad(rng, prev) { return { variant: prev ? (prev.variant === 'two' ? 'none' : 'two') : rng.pick(['two', 'none']) }; },
  fix(rng, prev) {
    const target = prev ? (prev.target === 'rect' ? 'square' : 'rect') : rng.pick(['rect', 'square']);
    for (;;) {
      let w, h;
      if (target === 'square') w = h = rng.int(2, 3);
      else { w = rng.int(3, 5); h = rng.int(2, 3); if (w === h) continue; }
      const x0 = rng.int(1, GEN.cols - w - 1), y0 = rng.int(1, GEN.rows - h - 1);
      const orig = [[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h]];
      const k = rng.int(0, 3);
      const shape = orig.map((q, i) => (i === k ? add(q, rng.pick([[1, 0], [-1, 0], [0, 1], [0, -1]])) : q));
      const a = analyze(shape);
      if (a.flat || a.rights === 4) continue;
      return { target, shape, orig, k };
    }
  },
  draw(rng, prev) {
    const r = rng.pick([1, 2, 3].filter(x => x !== prev?.r));
    return { r, O: [rng.int(r, GEN.cols - r), rng.int(r, GEN.rows - r)] };
  },
  diam(rng, prev) { return GENS.draw(rng, prev); },
  through(rng) {
    const v0 = rng.pick([[2, 0], [3, 0], [1, 1], [2, 2], [1, 2], [2, 1]]);
    let v = [v0[0] * rng.pick([-1, 1]), v0[1] * rng.pick([-1, 1])];
    if (rng() < 0.5) v = [v[1], v[0]];
    const mg = Math.ceil(len(v) - 1e-9);
    const O = [rng.int(mg, GEN.cols - mg), rng.int(mg, GEN.rows - mg)];
    return { O, A: add(O, v) };
  },
  dab(rng, prev) {
    const r = rng.pick([1, 2, 3].filter(x => x !== prev?.r));
    const ax = rng.pick([[1, 0], [0, 1]]);
    const M = [rng.int(r, GEN.cols - r), rng.int(r, GEN.rows - r)];
    const pair = [sub(M, mul(ax, r)), add(M, mul(ax, r))];
    const [A, B] = rng() < 0.5 ? pair : pair.reverse();
    return { r, A, B };
  },
  mirror(rng, prev, sameKind, history) {
    const used = history.map(h => h.pic?.id);
    const pool = PICTURES.filter(p => !used.includes(p.id));
    return { pic: rng.pick(pool.length ? pool : PICTURES) };
  },
  copy(rng) {
    const w = 4, h = 4;
    const colors = rng.shuffle(PAINTS).slice(0, 2);
    const all = rng.shuffle(Array.from({ length: w * h }, (_, k) => [k % w, Math.floor(k / w)]));
    const cells = all.slice(0, rng.int(5, 7)).map((q, k) => ({ q, c: colors[k % 3 === 2 ? 1 : 0] }));
    return { w, h, colors, cells };
  },
  repeat(rng) {
    const p = rng.pick([2, 3]);
    const colors = rng.shuffle(PAINTS).slice(0, 2);
    let cells;
    do {
      cells = [];
      for (let i = 0; i < p; i++) for (let j = 0; j < 3; j++) if (rng() < 0.45) cells.push({ q: [i, j], c: colors[rng() < 0.6 ? 0 : 1] });
    } while (cells.length < 3 || cells.length > 5 || !Array.from({ length: p }, (_, i) => i).every(i => cells.some(c => c.q[0] === i))
      || new Set(cells.map(c => c.c)).size < 2);
    return { p, colors, cells };
  },
};

// ════ Cấp chơi ══════════════════════════════════════════════════════════════════════════════════════
const pinPic = (size) => `<span style="display:inline-block;width:${size}px;height:${size}px">${pinIcon(PIN_COLORS[0])}</span>`;

export const PIN_LEVELS = [
  {
    ...levelMeta('pin-1'), missions: 6,
    knowledge: 'điểm ở giữa, trung điểm của đoạn thẳng',
    ask: () => 'Ghim cắm vào đâu thì cách đều hai đầu? Đếm ô thật kĩ!',
    desc: 'Cắm ghim vào trung điểm của đoạn thẳng, vào điểm ở giữa hai điểm, và xem câu nào đúng, câu nào sai.',
    kinds: ['mid', 'check', 'between'],
    how: [['pin', 'Cắm ghim'], ['🔢', 'Đếm ô'], ['✔️', 'Xong']],
  },
  {
    ...levelMeta('pin-2'), missions: 5,
    knowledge: 'hình tam giác, hình tứ giác, hình chữ nhật, hình vuông, góc vuông',
    ask: (n) => `${cap(n.me)} cần mảnh vườn đúng hình này. Căng dây giúp ${n.me}!`,
    desc: 'Cắm ghim, dây chun căng quanh các ghim thành hình theo đơn: hình chữ nhật, hình vuông, hình tam giác, hình tứ giác.',
    kinds: ['rect', 'square', 'tri', 'fix', 'quad'],
    how: [['pin', 'Cắm ghim'], ['〰️', 'Căng dây'], ['📐', 'Soi góc vuông']],
  },
  {
    ...levelMeta('pin-3'), missions: 5,
    knowledge: 'hình tròn, tâm, bán kính, đường kính',
    ask: (n) => `Vẽ giúp ${n.me} một đường tròn thật tròn bằng compa!`,
    desc: 'Cắm mũi nhọn compa vào tâm, mở compa bằng bán kính rồi quay một vòng. Đường kính dài gấp 2 lần bán kính.',
    kinds: ['draw', 'diam', 'through', 'dab'],
    how: [['compa', 'Cắm tâm'], ['↔️', 'Mở compa'], ['🔄', 'Quay một vòng']],
  },
  {
    ...levelMeta('pin-4'), missions: 5,
    knowledge: 'vẽ trang trí trên giấy ô vuông',
    ask: (n) => `Tô giúp ${n.me} tấm thiệp trang trí cho thật đẹp!`,
    desc: 'Tô màu các ô vuông: hoàn thành nửa còn lại của hình gấp đôi, vẽ lại theo mẫu, vẽ tiếp hoa văn.',
    kinds: ['mirror', 'copy', 'repeat'],
    how: [['🖍️', 'Chọn màu'], ['🟦', 'Tô ô'], ['👀', 'So với mẫu']],
  },
];

export const PIN_GAME = {
  ...stallMeta('pinboard'),
  unitWord: 'đơn',
  levels: PIN_LEVELS,
  stallIcon: () => pinboardIcon(56),
  summaryText: (ok, total) => `Em đã hoàn thành <strong>${ok}/${total}</strong> đơn thiết kế.`,

  howTo(level) {
    const pic = (p) => (p === 'pin' ? pinPic(40) : p === 'compa' ? compassIcon(46) : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '🏗️', label: 'Giao đơn' }];
  },

  makeMission(rng, level, history) {
    const recent = history.slice(-2).map(h => h.npc.id);
    const npc = rng.pick(NPCS.filter(n => !recent.includes(n.id)));
    const kind = level.kinds[history.length % level.kinds.length];
    const sameKind = history.filter(h => h.kind === kind);
    return { npc, kind, ...GENS[kind](rng, sameKind[sameKind.length - 1], sameKind, history) };
  },

  mountMission(stage, m, level, api) {
    const n = m.npc;
    const portrait = matchMedia('(orientation: portrait)').matches;
    const { counter, main, speak, row, ask, nudge } = mountStall(stage, {
      npc: n, api, theme: 'pin', cameo: false,
      sign: `<span class="g3p-sign-ic">🏗️</span><span><strong>Kiến trúc sư</strong><br>bảng ghim</span>`,
      counter: `
        <div class="g3p-bench">
          <div class="g3p-order" data-order></div>
          <div class="g3p-board"><svg class="g3p-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true"></svg></div>
          <div class="g3p-acts" data-acts></div>
        </div>`,
    });
    // Chỉ đơn "đường kính" phải gõ số: các đơn khác cất máy tính tiền đi, nhường chỗ cho bảng ghim.
    stage.querySelector('.g3f-scene').classList.toggle('g3p-nopad', m.kind !== 'diam');
    const bench = counter.querySelector('.g3p-bench');
    const svg = counter.querySelector('.g3p-svg');
    const orderEl = counter.querySelector('[data-order]');
    const acts = counter.querySelector('[data-acts]');
    const S = { locked: false, busy: false };
    const dev = import.meta.env.DEV ? (window.__g3pin = { m, S }) : {}; // kịch bản thử tự động đọc đáp án, toạ độ đinh

    const ok = (text, line = 'Tuyệt quá! Đúng như đơn đặt hàng!') => { speak(line, 'happy', line); api.succeed(text); };
    const bad = (line, text, tip) => { speak(line, 'sad', line); api.fail(text, tip); };
    const btn = (label, attrs = '', cls = '') => `<button type="button" class="g3g-btn g3p-btn ${cls}" ${attrs}>${label}</button>`;
    const order = (html) => { orderEl.innerHTML = `<span class="g3p-order-ic">📋</span><span>${html}</span>`; };
    const toSvg = (e) => {
      const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse());
      return [p.x, p.y];
    };
    const lock = () => {
      S.locked = true;
      acts.querySelectorAll('button').forEach(b => { b.disabled = true; });
    };
    /** Nhắc bé nhìn vào một nút / hộp đồ nghề: rung nhẹ, sáng lên. */
    const poke = (el) => {
      if (!el) return;
      el.classList.remove('g3p-nudge');
      void el.offsetWidth;
      el.classList.add('g3p-nudge');
    };

    // Thẻ kết quả không che hình: bảng co lại vừa đủ (như Thám tử). Màn dọc thẻ nằm dưới; màn ngang thử cả bên phải
    // lẫn bên dưới, chọn chỗ để bảng còn to hơn (bảng ghim bè ngang nên thường là bên dưới).
    const fitCard = () => {
      const card = main.querySelector(':scope > .g3g-result');
      if (!card || !bench.isConnected) return;
      bench.classList.add('g3p-done');
      counter.classList.add('g3p-fin');
      const vb = svg.viewBox.baseVal;
      const tryFit = (low) => {
        main.classList.toggle('g3p-low', low);
        bench.style.paddingRight = bench.style.paddingBottom = '';
        for (let k = 0; k < 8; k++) {
          const mb = main.getBoundingClientRect();
          const c = { left: mb.left + card.offsetLeft, top: mb.top + card.offsetTop, right: mb.left + card.offsetLeft + card.offsetWidth, bottom: mb.top + card.offsetTop + card.offsetHeight };
          const b = svgBoxOnScreen(svg, vb.x, vb.y, vb.width, vb.height);
          if (!b) return 0;
          const ox = Math.min(b.left + b.width, c.right) - Math.max(b.left, c.left), oy = Math.min(b.top + b.height, c.bottom) - Math.max(b.top, c.top);
          if (ox <= -8 || oy <= -8) break;
          // Không co bảng quá nửa khung (điện thoại dọc, thẻ cao): thẻ đè lên đáy bảng còn hơn bảng biến mất.
          const cap = (v, max) => `${Math.min(max, v)}px`;
          if (low) bench.style.paddingBottom = cap((parseFloat(bench.style.paddingBottom) || 0) + oy + 10, bench.clientHeight * 0.5);
          else bench.style.paddingRight = cap((parseFloat(bench.style.paddingRight) || 0) + ox + 10, bench.clientWidth * 0.5);
        }
        return svgBoxOnScreen(svg, vb.x, vb.y, vb.width, vb.height)?.width || 0;
      };
      if (matchMedia('(orientation: portrait)').matches) { tryFit(true); return; }
      const side = tryFit(false);
      if (side >= tryFit(true)) tryFit(false);
    };
    new MutationObserver(fitCard).observe(main, { childList: true });
    new ResizeObserver(fitCard).observe(counter);

    if (level.kinds.includes('mirror')) return mountPaper();

    // ════ Bảng ghim (cấp 1–3) ════════════════════════════════════════════════════════════════════
    const B = BOARDS[portrait ? 'port' : 'land'];
    const off = [Math.floor((B.cols - GEN.cols) / 2), Math.floor((B.rows - GEN.rows) / 2)];
    const Lq = (q) => [q[0] + off[0], q[1] + off[1]];
    const W = B.cols * CELL + 2 * MARGIN, H = B.rows * CELL + 2 * MARGIN;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = `${woodBoard(B.cols, B.rows)}<g data-marks></g><g data-band></g><g data-arc></g><g data-fx></g><g data-pins></g><g data-labels></g><g data-tool></g>`;
    const G = (k) => svg.querySelector(`[data-${k}]`);
    const marksG = G('marks'), bandG = G('band'), arcG = G('arc'), fxG = G('fx'), pinsG = G('pins'), labelsG = G('labels'), toolG = G('tool');
    const P = (q) => [MARGIN + q[0] * CELL, MARGIN + q[1] * CELL];
    /** Đinh gần điểm s nhất (toạ độ bảng). loose: luôn lấy đinh gần nhất trên bảng (khi kéo). */
    const nearest = (s, loose = false) => {
      const q = [Math.round((s[0] - MARGIN) / CELL), Math.round((s[1] - MARGIN) / CELL)];
      if (loose) return [Math.max(0, Math.min(B.cols, q[0])), Math.max(0, Math.min(B.rows, q[1]))];
      if (q[0] < 0 || q[1] < 0 || q[0] > B.cols || q[1] > B.rows) return null;
      return len(sub(s, P(q))) <= CELL * 0.5 ? q : null;
    };
    const scr = (q, r = 11) => { const s = P(q); return svgBoxOnScreen(svg, s[0] - r, s[1] - r, 2 * r, 2 * r); };
    /** Chữ lệch lo khỏi điểm s mà ra ngoài mép bảng thì đặt sang phía đối diện. */
    const inside = (t) => t[0] > 14 && t[0] < W - 14 && t[1] > 16 && t[1] < H - 16;
    const fitLo = (s, lo) => (inside(add(s, lo)) ? lo : mul(lo, -1));
    dev.at = (q) => { const b = scr(q, 0.5); return b && [b.left + b.width / 2, b.top + b.height / 2]; };
    dev.Lq = Lq;

    // ── Chạm / kéo trên bảng: hooks.down trả về một thao tác kéo (hoặc null), hooks.tap nhận đinh được chạm ─────
    const hooks = { down: null, tap: null };
    let press = null;
    svg.addEventListener('pointerdown', (e) => {
      if (S.locked) return;
      e.preventDefault();
      const s = toSvg(e);
      press = { x: e.clientX, y: e.clientY, moved: 0, drag: hooks.down?.(s, e) || null };
      svg.setPointerCapture?.(e.pointerId);
    });
    svg.addEventListener('pointermove', (e) => {
      if (!press) return;
      press.moved = Math.max(press.moved, Math.hypot(e.clientX - press.x, e.clientY - press.y));
      if (press.drag && !S.locked) press.drag.move(toSvg(e), press.moved);
    });
    svg.addEventListener('pointerup', (e) => {
      if (!press) return;
      const p = press;
      press = null;
      if (S.locked) return;
      const s = toSvg(e);
      if (p.drag) p.drag.up(s, p.moved);
      else if (p.moved < 10) hooks.tap?.(nearest(s), s);
    });
    svg.addEventListener('pointercancel', () => { press?.drag?.cancel?.(); press = null; });

    const dotAt = (q, color = INK) => { const s = P(q); return `<circle cx="${s[0]}" cy="${s[1]}" r="6" fill="${color}" stroke="#fff" stroke-width="2"/>`; };
    const ring = (q, color, r = 17) => { const s = P(q); return `<circle class="g3p-ring" cx="${s[0]}" cy="${s[1]}" r="${r}" fill="none" stroke="${color}" stroke-width="4"/>`; };
    const dashLine = (a, b, color = '#16A34A') => { const p = P(a), q = P(b); return `<path d="M${p[0]} ${p[1]} L${q[0]} ${q[1]}" stroke="${color}" stroke-width="3.5" stroke-dasharray="8 7" stroke-linecap="round" opacity="0.9"/>`; };

    if (level.kinds.includes('draw')) return mountCompass();

    // ── Ghim: cắm từ hộp ghim, dời bằng cách chạm đinh khác (cấp 1) hoặc kéo; dây chun theo các ghim ─────────
    const pins = []; // { q, color, name, fixed, lo (lệch chữ tên), drag (toạ độ đang kéo), flying }
    let bandFn = () => '';
    const pos = (p) => p.drag || P(p.q);
    const renderPins = () => {
      const shown = pins.filter(p => !p.flying);
      pinsG.innerHTML = shown.map(p => { const s = pos(p); return pinSvg(s[0], s[1], p.color); }).join('');
      labelsG.innerHTML = shown.filter(p => p.name).map(p => tag(add(pos(p), fitLo(pos(p), p.lo || [0, -26])), p.name)).join('');
      bandG.innerHTML = bandFn();
    };
    const box = { el: null, count: 0, color: () => PIN_COLORS[0] };
    const boxHtml = (label) => `<button type="button" class="g3p-box" data-box><span class="g3p-box-pins"></span><span class="g3p-box-lab">${label}</span></button>`;
    const renderBox = () => {
      if (!box.el) return;
      box.el.querySelector('.g3p-box-pins').innerHTML = box.count
        ? Array.from({ length: box.count }, (_, k) => `<span class="g3p-box-pin">${pinIcon(box.color(k))}</span>`).join('')
        : '<span class="g3p-box-none">·</span>';
      box.el.classList.toggle('g3p-box-empty', !box.count);
    };
    const boxSpot = () => (box.el.querySelector('.g3p-box-pin:last-child') || box.el).getBoundingClientRect();
    const flyPin = (color, from, to, onLand) => flyOne(pinIcon(color), from, to, { minMs: 380, maxMs: 720, onLand });
    /** Lấy một ghim trong hộp cắm vào đinh q. */
    const placeNew = (q, extra = {}) => {
      const from = boxSpot();
      const color = box.color(box.count - 1);
      box.count--;
      renderBox();
      box.el.classList.remove('g3p-wait');
      const pin = { q, color, flying: true, ...extra };
      pins.push(pin);
      S.busy = true;
      sfx.tap();
      flyPin(color, from, scr(q), () => { pin.flying = false; S.busy = false; sfx.pop(pins.length); renderPins(); });
      renderPins();
      return pin;
    };
    const movePin = (pin, q) => {
      const from = scr(pin.q);
      pin.q = q;
      pin.flying = true;
      S.busy = true;
      renderPins();
      sfx.tap();
      flyPin(pin.color, from, scr(q), () => { pin.flying = false; S.busy = false; sfx.pop(3); renderPins(); });
    };
    /** Cất ghim về hộp. */
    const returnPin = (pin) => {
      const from = scr(pin.q);
      pins.splice(pins.indexOf(pin), 1);
      box.count++;
      renderBox();
      const spot = box.el.querySelector('.g3p-box-pin:last-child');
      if (spot) spot.style.visibility = 'hidden';
      renderPins();
      S.busy = true;
      sfx.tap();
      flyPin(pin.color, from, (spot || box.el).getBoundingClientRect(), () => { if (spot) spot.style.visibility = ''; S.busy = false; });
    };
    let onPinTap = () => {};
    let canUse = () => true;
    hooks.down = (s) => {
      if (S.busy) return null;
      const pin = pins.find(p => !p.fixed && !p.flying && len(sub(P(p.q), s)) < 21);
      if (!pin) return null;
      return {
        move(s2, moved) { if (moved < 8) return; pin.drag = s2; renderPins(); },
        up(s2, moved) {
          pin.drag = null;
          if (moved < 8) { renderPins(); onPinTap(pin); return; }
          const q = nearest(s2, true);
          if (!same(q, pin.q) && !pins.some(p => p !== pin && same(p.q, q)) && canUse(q)) { pin.q = q; sfx.pop(3); } else sfx.tap();
          renderPins();
        },
        cancel() { pin.drag = null; renderPins(); },
      };
    };
    dev.pins = pins;

    /** Đếm từng ô (bong bóng số) dọc đường từ Y tới Z. Trả về số bước. */
    const hop = async (Y, Z, color) => {
      const g = stepsOf(Y, Z), st = [(Z[0] - Y[0]) / g, (Z[1] - Y[1]) / g];
      for (let k = 1; k <= g; k++) {
        if (!svg.isConnected) return g;
        const c = P([Y[0] + st[0] * (k - 0.5), Y[1] + st[1] * (k - 0.5)]);
        fxG.insertAdjacentHTML('beforeend', `<g class="g3p-hop"><circle cx="${c[0]}" cy="${c[1]}" r="12" fill="${color}" stroke="#fff" stroke-width="2.5"/><text x="${c[0]}" y="${c[1] + 5}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="15" fill="#fff">${k}</text></g>`);
        sfx.pop(k);
        await sleep(calmMotion() ? 420 : 330);
      }
      return g;
    };
    /** Nhãn "3 ô" ở giữa nửa đoạn Y–Z: phía đối diện tên điểm (lo); sát mép bảng thì cùng phía, xa hơn. */
    const halfLabel = (Y, Z, text, color, lo) => {
      const c = mul(add(P(Y), P(Z)), 0.5);
      const o = mul(lo, Y[0] === Z[0] || Y[1] === Z[1] ? -1.25 : -1.75);
      return tag(add(c, inside(add(c, o)) ? o : mul(lo, 2.1)), text, { size: 18, color });
    };
    /** Hướng đặt chữ tên điểm của một đoạn thẳng: phía trên (ngang), bên trái (dọc), phía trên-ngoài (chéo). */
    const labelSide = (A, Bq) => {
      const d = sub(Bq, A);
      if (d[1] === 0) return A[1] === 0 ? [0, 28] : [0, -26];
      if (d[0] === 0) return A[0] === 0 ? [28, 0] : [-26, 0];
      const nrm = [-d[1], d[0]], u = mul(nrm, 1 / len(nrm));
      return mul(u[1] > 0 ? mul(u, -1) : u, 28);
    };

    // ════ Cấp 1: mid / between ══════════════════════════════════════════════════════════════════════
    if (m.kind === 'mid' || m.kind === 'between') {
      const A = Lq(m.A), Bq = Lq(m.B);
      const [nA, nB, nX] = m.names;
      const lo = labelSide(A, Bq);
      pins.push({ q: A, color: FIXED_PIN, name: nA, fixed: true, lo }, { q: Bq, color: FIXED_PIN, name: nB, fixed: true, lo });
      const mid = m.kind === 'mid';
      // Trung điểm: dây chun AB căng sẵn (đoạn thẳng như trong vở). Điểm ở giữa: chưa căng, khi kiểm tra mới căng A → ghim → B.
      bandFn = () => (mid ? bandSvg([P(A), P(Bq)], { closed: false }) : '');
      box.count = 1;
      acts.innerHTML = boxHtml(`Ghim ${nX}`) + btn('✔ Xong', 'data-done', 'g3p-ok-btn');
      box.el = acts.querySelector('[data-box]');
      box.el.classList.add('g3p-wait');
      renderBox();
      renderPins();
      const want = mid ? 'trung điểm' : m.notMid ? 'điểm ở giữa (không phải trung điểm)' : 'điểm ở giữa';
      if (mid) {
        order(`Cắm ghim <b>${nX}</b> vào <span class="g3p-hl">trung điểm</span> của đoạn thẳng <b>${nA}${nB}</b>`);
        speak(`${cap(n.you)} cắm ghim ${nX} vào trung điểm của đoạn thẳng ${nA}${nB} giúp ${n.me}!`, null, `Ghim <b>${nX}</b> ở <b class="g3f-want">trung điểm</b> của ${nA}${nB}!`);
      } else {
        order(`Cắm ghim <b>${nX}</b> vào một <span class="g3p-hl">điểm ở giữa</span> hai điểm <b>${nA}</b> và <b>${nB}</b>${m.notMid ? `, <span class="g3p-hl">không phải trung điểm</span>` : ''}`);
        speak(`${cap(n.you)} cắm ghim ${nX} vào một điểm ở giữa hai điểm ${nA} và ${nB}${m.notMid ? `, nhưng không phải trung điểm của đoạn thẳng ${nA}${nB}` : ''}!`, null,
          `Ghim <b>${nX}</b> ở giữa ${nA} và ${nB}${m.notMid ? ', <b class="g3f-want">không phải trung điểm</b>' : ''}!`);
      }
      const xPin = () => pins.find(p => !p.fixed);
      hooks.tap = (q) => {
        if (!q || S.busy) return;
        const at = pins.find(p => same(p.q, q));
        if (at?.fixed) { speak(`Chỗ đó có ghim ${at.name} rồi!`, null, `Chỗ đó có ghim <b>${at.name}</b> rồi!`); return; }
        if (at) return;
        const x = xPin();
        if (x) movePin(x, q);
        else placeNew(q, { name: nX, lo });
      };
      box.el.onclick = () => { if (!S.locked) speak(`Chạm vào một cái đinh trên bảng để cắm ghim ${nX}!`, null, `Chạm vào một <b>cái đinh</b> để cắm ghim!`); };
      acts.querySelector('[data-done]').onclick = async () => {
        if (S.locked || S.busy) return;
        const x = xPin();
        if (!x) { speak(`Cắm ghim ${nX} vào bảng trước đã!`, null, `Cắm ghim <b>${nX}</b> trước đã!`); poke(box.el); return; }
        lock();
        const X = x.q;
        const stretched = !mid;
        if (stretched) {
          // Dây chun căng từ A qua ghim tới B: thẳng thì ghim nằm trên đoạn thẳng AB.
          bandFn = () => `<g class="g3p-snap">${bandSvg([P(A), P(X), P(Bq)], { closed: false })}</g>`;
          renderPins();
          sfx.swish();
          await sleep(700);
        }
        const between = isBetween(X, A, Bq);
        const w = oWord(A, Bq);
        if (!between) {
          marksG.innerHTML = dashLine(A, Bq) + ring(X, '#EF4444');
          await sleep(500);
          const onLine = cross(sub(X, A), sub(Bq, A)) === 0;
          const fact = onLine ? `Ghim ${nX} nằm ngoài đoạn thẳng ${nA}${nB}.` : `${nA}, ${nX}, ${nB} không thẳng hàng: ghim ${nX} không nằm trên đoạn thẳng ${nA}${nB}.`;
          return bad(stretched ? 'Dây chun bị gập rồi!' : 'Ghim chưa nằm trên đoạn thẳng!', fact,
            mid ? `Trung điểm nằm trên đoạn thẳng ${nA}${nB}, ở chính giữa: đếm số ô từ ${nA} và từ ${nB}, hai bên bằng nhau.`
              : `Điểm ở giữa hai điểm ${nA} và ${nB} phải nằm trên đoạn thẳng ${nA}${nB}: ba điểm thẳng hàng, dây chun căng thẳng.`);
        }
        const a = await hop(A, X, '#F97316');
        const b = await hop(X, Bq, '#3B82F6');
        fxG.insertAdjacentHTML('beforeend', halfLabel(A, X, `${a} ${w}`, '#C2410C', lo) + halfLabel(X, Bq, `${b} ${w}`, '#1D4ED8', lo));
        await sleep(450);
        const counts = `${nA}${nX}: ${a} ${w}, ${nX}${nB}: ${b} ${w}`;
        if (mid) {
          if (a === b) return ok(`Đúng! ${nX} là trung điểm của đoạn thẳng ${nA}${nB} (${counts}).`);
          return bad('Hai bên chưa đều nhau!', `${counts}: hai bên không bằng nhau, ${nX} chưa phải trung điểm.`,
            `Đoạn thẳng ${nA}${nB} dài ${a + b} ${w}. Trung điểm cách mỗi đầu ${(a + b) / 2} ${w}.`);
        }
        if (m.notMid && a === b) {
          return bad(`${nX} là trung điểm mất rồi!`, `${counts}: ${nX} là trung điểm của đoạn thẳng ${nA}${nB}.`,
            `Đơn cần điểm ở giữa nhưng không phải trung điểm: chọn điểm trên đoạn thẳng ${nA}${nB} gần ${nA} hơn hoặc gần ${nB} hơn.`);
        }
        return ok(`Đúng! ${nA}, ${nX}, ${nB} thẳng hàng, ${nX} là điểm ở giữa hai điểm ${nA} và ${nB}${m.notMid ? ` (${counts}, không phải trung điểm)` : ''}.`);
      };
      dev.want = want;
      return;
    }

    // ════ Cấp 1: check — câu Đ / S về các điểm trên bảng ═════════════════════════════════════════════
    if (m.kind === 'check') {
      const Qs = m.pts.map(Lq);
      const names = m.names;
      Qs.forEach((q, i) => {
        let lo = m.axis === 'h' ? [0, -26] : [-26, 0];
        if (i === m.bent) lo = m.axis === 'h' ? [0, 26 * m.side] : [26 * m.side, 0];
        pins.push({ q, color: FIXED_PIN, name: names[i], fixed: true, lo });
      });
      bandFn = () => bandSvg(Qs.map(P), { closed: false });
      renderPins();
      const { x, type, truth } = m.st;
      const [Y, X, Z] = [Qs[x - 1], Qs[x], Qs[x + 1]];
      const [nY, nX, nZ] = [names[x - 1], names[x], names[x + 1]];
      const text = type === 'mid' ? `${nX} là trung điểm của đoạn thẳng ${nY}${nZ}.` : `${nX} là điểm ở giữa hai điểm ${nY} và ${nZ}.`;
      order(`Đúng hay sai? <b>${text}</b>`);
      speak(`${text} Câu này đúng hay sai? ${cap(n.you)} đếm ô rồi trả lời ${n.me}!`, null, `<b class="g3f-want">Đúng</b> hay <b class="g3f-want">sai</b>?`);
      acts.innerHTML = btn('✅ Đúng', 'data-ans="1"', 'g3p-ans') + btn('❌ Sai', 'data-ans="0"', 'g3p-ans');
      hooks.tap = () => {};
      acts.addEventListener('click', async (e) => {
        const b = e.target.closest('[data-ans]');
        if (!b || S.locked) return;
        const said = b.dataset.ans === '1';
        lock();
        b.classList.add('g3p-on');
        marksG.innerHTML = dashLine(Y, Z);
        await sleep(450);
        let reason;
        if (!isBetween(X, Y, Z)) {
          marksG.insertAdjacentHTML('beforeend', ring(X, '#EF4444'));
          sfx.boing();
          reason = `${nY}, ${nX}, ${nZ} không thẳng hàng (${nX} không nằm trên đoạn thẳng ${nY}${nZ})`;
        } else if (type === 'mid') {
          const a = await hop(Y, X, '#F97316');
          const c = await hop(X, Z, '#3B82F6');
          const lo = m.axis === 'h' ? [0, -26] : [-26, 0];
          fxG.insertAdjacentHTML('beforeend', halfLabel(Y, X, `${a} ô`, '#C2410C', lo) + halfLabel(X, Z, `${c} ô`, '#1D4ED8', lo));
          reason = `${nY}${nX} dài ${a} ô, ${nX}${nZ} dài ${c} ô, ${a === c ? 'bằng nhau' : 'không bằng nhau'}`;
        } else {
          marksG.insertAdjacentHTML('beforeend', ring(X, '#16A34A'));
          sfx.pop(2);
          reason = `${nY}, ${nX}, ${nZ} thẳng hàng và ${nX} nằm giữa ${nY} và ${nZ}`;
        }
        await sleep(450);
        const fact = `Câu "${text}" là câu <b>${truth ? 'đúng' : 'sai'}</b>: ${reason}.`;
        if (said === truth) return ok(`Đúng! ${fact}`, 'Chính xác! Kiến trúc sư giỏi quá!');
        bad(truth ? 'Câu này đúng mà!' : 'Câu này sai mà!', fact, type === 'mid'
          ? 'Trung điểm phải nằm trên đoạn thẳng (thẳng hàng với hai đầu) và cách đều hai đầu: đếm số ô từ mỗi đầu.'
          : 'Điểm ở giữa hai điểm thì ba điểm phải thẳng hàng. Điểm ở giữa không cần cách đều hai đầu.');
      });
      return;
    }

    // ════ Cấp 2: căng dây chun tạo hình theo đơn ════════════════════════════════════════════════════
    const fix = m.kind === 'fix';
    bandFn = () => {
      const S2 = around(pins.filter(p => !p.flying), pos).map(pos);
      return bandSvg(S2, { closed: S2.length > 2 });
    };
    const MAXP = 5;
    if (fix) m.shape.forEach((q, k) => pins.push({ q: Lq(q), color: PIN_COLORS[k % PIN_COLORS.length] }));
    else {
      box.count = MAXP;
      box.color = (k) => PIN_COLORS[(MAXP - 1 - k) % PIN_COLORS.length];
    }
    acts.innerHTML = (fix ? '' : boxHtml('Hộp ghim')) + btn('✔ Xong', 'data-done', 'g3p-ok-btn');
    box.el = acts.querySelector('[data-box]');
    if (box.el) { box.el.classList.add('g3p-wait'); renderBox(); }
    renderPins();

    const T = {
      rect: { order: `Hình chữ nhật <span class="g3p-hl">dài ${m.w} ô, rộng ${m.h} ô</span>`, say: `một hình chữ nhật dài ${m.w} ô, rộng ${m.h} ô`, shown: `Hình chữ nhật dài <b>${m.w} ô</b>, rộng <b>${m.h} ô</b>!` },
      square: { order: `Hình vuông <span class="g3p-hl">cạnh ${m.s} ô</span>`, say: `một hình vuông cạnh ${m.s} ô`, shown: `Hình vuông cạnh <b>${m.s} ô</b>!` },
      tri: m.variant === 'right'
        ? { order: `Hình tam giác <span class="g3p-hl">có một góc vuông</span>`, say: 'một hình tam giác có một góc vuông', shown: 'Tam giác <b class="g3f-want">có một góc vuông</b>!' }
        : { order: `Hình tam giác <span class="g3p-hl">không có góc vuông nào</span>`, say: 'một hình tam giác không có góc vuông nào', shown: 'Tam giác <b class="g3f-want">không có góc vuông</b>!' },
      quad: m.variant === 'two'
        ? { order: `Hình tứ giác <span class="g3p-hl">có đúng 2 góc vuông</span>`, say: 'một hình tứ giác có đúng 2 góc vuông', shown: 'Tứ giác có <b class="g3f-want">đúng 2 góc vuông</b>!' }
        : { order: `Hình tứ giác <span class="g3p-hl">không có góc vuông nào</span>`, say: 'một hình tứ giác không có góc vuông nào', shown: 'Tứ giác <b class="g3f-want">không có góc vuông</b>!' },
      fix: { order: `Dời <span class="g3p-hl">một ghim</span> để được hình ${m.target === 'rect' ? 'chữ nhật' : 'vuông'}`, say: '', shown: `Dời một ghim cho thành <b class="g3f-want">hình ${m.target === 'rect' ? 'chữ nhật' : 'vuông'}</b>!` },
    }[m.kind];
    order(T.order);
    if (fix) speak(`Dây chun này chưa phải hình ${m.target === 'rect' ? 'chữ nhật' : 'vuông'}. ${cap(n.you)} kéo một ghim sang đinh khác để được hình ${m.target === 'rect' ? 'chữ nhật' : 'vuông'}!`, null, T.shown);
    else speak(`${cap(n.you)} cắm ghim, căng dây chun thành ${T.say} cho ${n.me}!`, null, T.shown);

    hooks.tap = (q) => {
      if (!q || S.busy) return;
      if (pins.some(p => same(p.q, q))) return;
      if (fix) { speak('Kéo một ghim sang đinh khác để dời ghim!', null, '<b>Kéo</b> một ghim sang đinh khác!'); return; }
      if (!box.count) { speak('Hết ghim rồi! Chạm vào một ghim trên bảng để cất bớt.', null, 'Hết ghim! Chạm ghim trên bảng để <b>cất bớt</b>.'); poke(box.el); return; }
      placeNew(q);
    };
    onPinTap = (pin) => {
      if (fix) { speak('Kéo ghim sang đinh khác để dời ghim!', null, '<b>Kéo</b> ghim sang đinh khác!'); return; }
      returnPin(pin);
    };
    if (box.el) box.el.onclick = () => { if (!S.locked) speak('Chạm vào các cái đinh trên bảng để cắm ghim. Chạm vào ghim để cất ghim đi.', null, 'Chạm vào <b>cái đinh</b> để cắm ghim!'); };

    acts.querySelector('[data-done]').onclick = async () => {
      if (S.locked || S.busy) return;
      if (pins.length < 3) {
        speak('Cần cắm ít nhất 3 ghim thì dây chun mới thành hình!', null, 'Cắm ít nhất <b>3 ghim</b>!');
        poke(box.el);
        return;
      }
      lock();
      const a = analyze(pins.map(p => p.q));
      // Soi từng góc bằng ê-ke (dấu vuông xanh / ✗ đỏ), rồi ghi số ô trên mỗi cạnh ngang / dọc.
      for (const c of a.corners) {
        if (!svg.isConnected) return;
        const [V, P1, P2] = [P(c.V), P(c.P1), P(c.P2)];
        marksG.insertAdjacentHTML('beforeend', c.flat ? '' : c.right ? rightMark(V, P1, P2, 14) : crossMark(V, P1, P2, 22));
        if (c.right && !c.flat) sfx.pop(2); else sfx.tap();
        await sleep(360);
      }
      const cen = a.S.reduce((s, q) => add(s, P(q)), [0, 0]).map(v => v / a.k);
      fxG.innerHTML = a.S.map((q, i) => {
        const r = a.S[(i + 1) % a.k];
        if (q[0] !== r[0] && q[1] !== r[1]) return '';
        const c = mul(add(P(q), P(r)), 0.5), d = sub(c, cen), u = len(d) ? mul(d, 1 / len(d)) : [0, -1];
        return tag(add(c, mul(u, 20)), `${len(sub(r, q))} ô`, { size: 16, color: '#1D4ED8' });
      }).join('');
      await sleep(400);
      const four = a.k === 4 && a.rights === 4;
      const kName = four ? (a.sides.every(s => Math.abs(s - a.sides[0]) < 1e-6) ? 'hình vuông' : 'hình chữ nhật')
        : a.k === 3 ? 'hình tam giác' : a.k === 4 ? 'hình tứ giác' : `hình có ${a.k} cạnh`;
      const rightTxt = a.rights ? `có ${a.rights} góc vuông` : 'không có góc vuông nào';
      const sidesTxt = a.sides.every(s => Number.isInteger(s)) ? `, các cạnh dài ${a.sides.join(' ô, ')} ô` : '';
      const made = `Em căng được ${kName} ${rightTxt}${sidesTxt}.`;
      if (a.flat) {
        return bad('Có ba ghim thẳng hàng!', `Có ba ghim thẳng hàng nên ở ghim giữa dây chun không gập, không tạo thành góc.`,
          'Mỗi đỉnh của hình phải là chỗ dây chun gập góc. Dời ghim giữa ra, hoặc cất bớt ghim đó.');
      }
      const sorted = [...a.sides].sort((x, y) => x - y);
      let good = false, tip = '';
      if (m.kind === 'rect') {
        good = a.k === 4 && a.rights === 4 && Math.abs(sorted[0] - m.h) < 1e-6 && Math.abs(sorted[1] - m.h) < 1e-6 && Math.abs(sorted[2] - m.w) < 1e-6 && Math.abs(sorted[3] - m.w) < 1e-6;
        tip = `Hình chữ nhật có 4 góc vuông, hai cạnh dài bằng nhau (${m.w} ô), hai cạnh ngắn bằng nhau (${m.h} ô). Căng dây theo các đường kẻ và đếm ô trên mỗi cạnh.`;
      } else if (m.kind === 'square') {
        good = a.k === 4 && a.rights === 4 && a.sides.every(s => Math.abs(s - m.s) < 1e-6);
        tip = `Hình vuông có 4 góc vuông và 4 cạnh bằng nhau: mỗi cạnh ${m.s} ô.`;
      } else if (m.kind === 'tri') {
        good = a.k === 3 && a.rights === (m.variant === 'right' ? 1 : 0);
        tip = m.variant === 'right'
          ? 'Hình tam giác có 3 đỉnh, 3 cạnh. Cho một cạnh nằm ngang và một cạnh đứng dọc gặp nhau ở một đỉnh: đó là một góc vuông.'
          : 'Hình tam giác có 3 đỉnh, 3 cạnh. Để không có góc vuông, đừng cho một cạnh nằm ngang gặp một cạnh đứng dọc.';
      } else if (m.kind === 'quad') {
        good = a.k === 4 && a.rights === (m.variant === 'two' ? 2 : 0);
        tip = m.variant === 'two'
          ? 'Hình tứ giác có 4 đỉnh. Cho một cạnh đứng dọc, hai cạnh nằm ngang ở hai đầu cạnh đó (2 góc vuông), cạnh còn lại xiên.'
          : 'Hình tứ giác có 4 đỉnh. Để không có góc vuông nào, các cạnh không được là một cạnh ngang gặp một cạnh dọc.';
      } else {
        good = a.k === 4 && a.rights === 4 && (m.target === 'rect' || a.sides.every(s => Math.abs(s - a.sides[0]) < 1e-6));
        tip = m.target === 'rect'
          ? 'Hình chữ nhật có 4 góc vuông. Tìm ghim làm góc bị lệch, dời nó về đúng hàng, đúng cột với hai ghim bên cạnh.'
          : 'Hình vuông có 4 góc vuông và 4 cạnh bằng nhau. Tìm ghim bị lệch rồi dời về cho các cạnh bằng nhau.';
      }
      if (good) return ok(`Đúng! ${made}`);
      bad('Chưa đúng đơn hàng rồi!', made, tip);
    };
    return;

    // ════ Cấp 3: compa ═══════════════════════════════════════════════════════════════════════════════
    function mountCompass() {
      const O = m.O ? Lq(m.O) : null, A = m.A ? Lq(m.A) : null, Bq = m.B ? Lq(m.B) : null;
      const TC = m.kind === 'dab' ? mul(add(A, Bq), 0.5) : O;
      const rT = m.kind === 'through' ? len(sub(A, O)) : m.kind === 'dab' ? len(sub(Bq, A)) / 2 : m.r;
      let known = m.kind !== 'diam';
      // Hình có sẵn trên bảng: tâm O, điểm A (đi qua), đoạn thẳng AB (đường kính).
      const pointTag = (q, name) => tag(add(P(q), [q[0] >= B.cols - 0 ? -16 : 16, -17]), name);
      marksG.innerHTML = (m.kind === 'dab' ? `<path d="M${P(A).join(' ')} L${P(Bq).join(' ')}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` : '')
        + (O ? dotAt(O) : '') + (A ? dotAt(A) : '') + (Bq ? dotAt(Bq) : '');
      labelsG.innerHTML = (O ? pointTag(O, 'O') : '') + (A ? pointTag(A, 'A') : '') + (Bq ? pointTag(Bq, 'B') : '');
      const T = {
        draw: { order: `Đường tròn tâm <b>O</b>, <span class="g3p-hl">bán kính ${m.r} cm</span>`, say: `một đường tròn tâm O, bán kính ${m.r} xăng-ti-mét`, shown: `Tâm <b>O</b>, bán kính <b class="g3f-want">${m.r} cm</b>!` },
        diam: { order: `Đường tròn tâm <b>O</b>, <span class="g3p-hl">đường kính ${2 * m.r} cm</span>`, say: `một đường tròn tâm O, đường kính ${2 * m.r} xăng-ti-mét`, shown: `Tâm <b>O</b>, đường kính <b class="g3f-want">${2 * m.r} cm</b>!` },
        through: { order: `Đường tròn tâm <b>O</b> <span class="g3p-hl">đi qua điểm A</span>`, say: 'một đường tròn tâm O đi qua điểm A', shown: `Tâm <b>O</b>, <b class="g3f-want">đi qua điểm A</b>!` },
        dab: { order: `Đường tròn có <span class="g3p-hl">đường kính là đoạn thẳng AB</span>`, say: 'một đường tròn có đường kính là đoạn thẳng AB', shown: `<b class="g3f-want">Đường kính AB</b>!` },
      }[m.kind];
      order(`${T.order} <small class="g3p-unit">1 ô = 1 cm</small>`);
      speak(`${cap(n.you)} vẽ giúp ${n.me} ${T.say}!`, null, T.shown);

      acts.innerHTML = `<button type="button" class="g3p-box g3p-cbox" data-box><span class="g3p-cbox-ic">${compassIcon(40)}</span><span class="g3p-box-lab">Compa</span></button>`
        + btn('↺ Vẽ lại', 'data-redo', 'g3p-redo') + btn('✔ Xong', 'data-done', 'g3p-ok-btn');
      const boxEl = acts.querySelector('[data-box]');
      if (known) boxEl.classList.add('g3p-wait');

      let needle = null, cpos = null, tip = null, arc = null, full = false, opened = false;
      const resetArc = () => {
        const d = sub(tip, cpos);
        arc = { a0: Math.atan2(d[1], d[0]), rot: 0, lo: 0, hi: 0, tick: 0 };
        full = false;
      };
      const render = () => {
        toolG.innerHTML = cpos ? compassSvg(cpos, tip) : '';
        const r = cpos ? len(sub(tip, cpos)) : 0;
        arcG.innerHTML = arc && arc.hi - arc.lo > 0.01 ? `<path d="${arcPath(cpos, r, arc.a0 + arc.lo, arc.a0 + arc.hi)}" fill="none" stroke="#1D4ED8" stroke-width="3.5" stroke-linecap="round"/>` : '';
        svg.classList.toggle('g3p-openme', !!cpos && !opened && !full);
        svg.classList.toggle('g3p-turnme', !!cpos && opened && !full);
      };
      dev.compass = () => ({ needle, tip, full, arc });
      const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
      /** Dời compa (giữ nguyên độ mở) tới đinh q. */
      const slideTo = (q) => new Promise((res) => {
        const from = cpos, to = P(q), v = sub(tip, cpos), t0 = performance.now();
        S.busy = true;
        const step = (now) => {
          if (!svg.isConnected) return res();
          const k = Math.min(1, (now - t0) / 380), e = ease(k);
          cpos = add(from, mul(sub(to, from), e));
          tip = add(cpos, v);
          render();
          if (k < 1) requestAnimationFrame(step); else { S.busy = false; res(); }
        };
        requestAnimationFrame(step);
      });

      hooks.tap = async (q) => {
        if (!known) { speak('Tính bán kính trước đã!', null, 'Tính <b>bán kính</b> trước đã!'); nudge(); return; }
        if (!q || S.busy) return;
        if (!needle) {
          // Compa bay từ hộp đồ nghề ra, mũi nhọn cắm vào đinh vừa chạm; mở sẵn 1 ô cho thấy đầu bút chì.
          const side = q[0] < B.cols ? 1 : -1;
          const from = boxEl.querySelector('.g3p-cbox-ic').getBoundingClientRect();
          const s = P(q);
          S.busy = true;
          boxEl.classList.remove('g3p-wait');
          boxEl.classList.add('g3p-box-empty');
          sfx.tap();
          flyOne(compassIcon('100%'), from, svgBoxOnScreen(svg, s[0] - 22, s[1] - 90, 100, 100), {
            minMs: 420, maxMs: 760,
            onLand: () => {
              needle = q; cpos = P(q); tip = P([q[0] + side, q[1]]);
              resetArc(); S.busy = false; sfx.pop(2); render();
            },
          });
          return;
        }
        if (same(q, needle)) return;
        needle = q;
        sfx.tap();
        await slideTo(q);
        resetArc();
        render();
      };
      const ang = (p) => { const d = sub(p, cpos); return Math.atan2(d[1], d[0]); };
      /** Quay compa theo ngón tay vòng quanh mũi nhọn (giữ nguyên độ mở): bút chì vẽ cung tròn. */
      const turner = (s0) => {
        const r = len(sub(tip, cpos));
        let prev = ang(s0);
        opened = true;
        return (s2) => {
          if (len(sub(s2, cpos)) < 14) return;
          const a2 = ang(s2);
          let d = a2 - prev;
          if (d > Math.PI) d -= 2 * Math.PI;
          if (d < -Math.PI) d += 2 * Math.PI;
          prev = a2;
          arc.rot += d;
          arc.lo = Math.min(arc.lo, arc.rot);
          arc.hi = Math.max(arc.hi, arc.rot);
          tip = add(cpos, [r * Math.cos(arc.a0 + arc.rot), r * Math.sin(arc.a0 + arc.rot)]);
          const tick = Math.floor(arc.rot / (Math.PI / 6));
          if (tick !== arc.tick) { arc.tick = tick; if (!full) sfx.tap(); }
          if (!full && arc.hi - arc.lo >= 2 * Math.PI - 0.03) { full = true; arc.hi = arc.lo + 2 * Math.PI; sfx.ding(); }
          render();
        };
      };
      /** Kéo đầu bút ra xa / lại gần tâm: compa mở ra / khép lại, đầu bút dừng ở đinh gần nhất (xoá nét đã vẽ). */
      const opener = (s2) => {
        const q = nearest(s2, true);
        if (same(q, needle)) return;
        const t = P(q);
        if (same(t, tip)) return;
        tip = t;
        opened = true;
        resetArc();
        sfx.tap();
        render();
      };
      hooks.down = (s, e) => {
        if (!cpos || S.busy) return null;
        if (e.target.closest('[data-tip]')) {
          // Đầu bút: còn bám theo đường tròn (lệch ít hơn nửa ô) là vẽ; kéo lệch ra xa / vào gần tâm là mở compa
          // (xoá nét đã vẽ) cho tới khi thả tay. Vẽ được một đoạn rồi thì cho lệch nhiều hơn chút (tay bé run).
          const r0 = len(sub(tip, cpos)), a0 = arc.rot;
          const turn = turner(s);
          let opening = false;
          return {
            move(s2) {
              if (!opening) {
                const slack = Math.abs(arc.rot - a0) > 0.5 ? 0.9 : 0.45;
                if (Math.abs(len(sub(s2, cpos)) - r0) <= slack * CELL) { turn(s2); return; }
                opening = true;
              }
              opener(s2);
            },
            up(s2) {
              // Kéo ngắn rồi thả ngay trên một đinh xa tâm hơn / gần tâm hơn một chút (vd. điểm A ô chéo): là mở compa tới đó.
              const q = nearest(s2);
              if (!opening && Math.abs(arc.rot - a0) < 1 && q && !same(q, needle) && Math.abs(len(sub(P(q), cpos)) - r0) > 0.1 * CELL) opener(s2);
              render();
            },
          };
        }
        if (!e.target.closest('[data-turn]')) return null;
        const turn = turner(s);
        return { move: (s2) => turn(s2), up() { render(); } };
      };
      boxEl.onclick = () => {
        if (S.locked) return;
        if (!known) { speak('Tính bán kính trước đã!', null, 'Tính <b>bán kính</b> trước đã!'); nudge(); return; }
        if (cpos) speak('Kéo đầu bút chì ra xa để mở compa, rồi kéo đầu bút vòng quanh tâm để vẽ!', null, 'Kéo <b>đầu bút</b> ra xa để mở, kéo <b>vòng quanh</b> để vẽ!');
        else speak('Chạm vào một cái đinh để cắm mũi nhọn compa!', null, 'Chạm vào <b>cái đinh</b> để cắm compa!');
      };
      acts.querySelector('[data-redo]').onclick = () => {
        if (S.locked || !cpos) return;
        resetArc();
        sfx.swish();
        render();
      };
      acts.querySelector('[data-done]').onclick = async () => {
        if (S.locked || S.busy) return;
        if (!known) { speak('Tính bán kính trước đã!', null, 'Tính <b>bán kính</b> trước đã!'); nudge(); return; }
        if (!cpos) { speak('Cắm mũi nhọn compa vào một cái đinh trước đã!', null, 'Cắm <b>compa</b> vào bảng trước!'); poke(boxEl); return; }
        if (!full) {
          speak('Kéo đầu bút chì vòng quanh tâm cho đủ một vòng, đường tròn khép kín!', null, 'Kéo bút vòng quanh <b>đủ một vòng</b>!');
          opened = true;
          render();
          return;
        }
        lock();
        render();
        svg.classList.remove('g3p-openme', 'g3p-turnme');
        const r = len(sub(tip, cpos)) / CELL;
        const centerOk = same(needle, TC);
        const rOk = Math.abs(r - rT) < 0.01;
        const rTxt = Number.isInteger(Math.round(r * 100) / 100) ? `${fmt(r)} cm` : '';
        // Compa bay về hộp cho thấy rõ hình. Bán kính (xanh) từ tâm chéo lên; đơn đường kính thì thêm đường kính (nét
        // đứt cam) qua tâm, nhãn nằm phía dưới đường kính — không chồng lên nhãn bán kính. Đơn "đi qua A": bán kính tới A.
        const C0 = cpos, R = r * CELL;
        const home = boxEl.querySelector('.g3p-cbox-ic').getBoundingClientRect();
        flyOne(compassIcon('100%'), svgBoxOnScreen(svg, C0[0] - 22, C0[1] - 90, 100, 100), home, {
          minMs: 420, maxMs: 760, onLand: () => boxEl.classList.remove('g3p-box-empty'),
        });
        toolG.innerHTML = '';
        sfx.swish();
        const diamOn = m.kind === 'diam' || m.kind === 'dab';
        const dirD = m.kind === 'dab' ? mul(sub(P(Bq), P(A)), 1 / len(sub(P(Bq), P(A)))) : [1, 0];
        const nD = [dirD[1], -dirD[0]]; // pháp tuyến "phía trên" đường kính
        const toA = m.kind === 'through' && Math.abs(len(sub(P(A), C0)) - R) < 0.5;
        const uR = toA ? mul(sub(P(A), C0), 1 / R) : add(mul(dirD, Math.SQRT1_2), mul(nD, Math.SQRT1_2));
        const Tp = add(C0, mul(uR, R));
        fxG.innerHTML = (diamOn ? `<path d="M${sub(C0, mul(dirD, R)).join(' ')} L${add(C0, mul(dirD, R)).join(' ')}" stroke="#F97316" stroke-width="4" stroke-dasharray="9 6" stroke-linecap="round"/>` : '')
          + `<path d="M${C0.join(' ')} L${Tp.join(' ')}" stroke="#16A34A" stroke-width="4.5" stroke-linecap="round"/>`
          + `<circle cx="${C0[0]}" cy="${C0[1]}" r="6" fill="#16A34A" stroke="#fff" stroke-width="2"/>`
          + (rTxt ? tag(add(mul(add(C0, Tp), 0.5), mul([uR[1], -uR[0]], -17)), rTxt, { size: 17, color: '#15803D' }) : '')
          + (diamOn ? tag(add(C0, add(mul(dirD, -R * 0.5), mul(nD, -20))), `${fmt(2 * r)} cm`, { size: 17, color: '#C2410C' }) : '');
        sfx.pop(3);
        await sleep(600);
        const wantRing = () => `<circle cx="${P(TC)[0]}" cy="${P(TC)[1]}" r="${rT * CELL}" fill="none" stroke="#16A34A" stroke-width="3" stroke-dasharray="8 7" opacity="0.9"/>`;
        if (m.kind === 'through') {
          marksG.insertAdjacentHTML('beforeend', ring(A, toA ? '#16A34A' : '#EF4444', 13));
        }
        if (!centerOk || !rOk) marksG.insertAdjacentHTML('beforeend', wantRing());
        await sleep(400);
        const got = `đường tròn bán kính ${rTxt || 'khác'}`;
        if (m.kind === 'draw' || m.kind === 'diam') {
          const what = m.kind === 'draw' ? `bán kính ${m.r} cm` : `đường kính ${2 * m.r} cm (bán kính ${m.r} cm)`;
          if (centerOk && rOk) return ok(`Đúng! Đường tròn tâm O, ${what}.`);
          return bad(!centerOk ? 'Tâm đường tròn chưa đúng chỗ!' : 'Compa mở chưa đúng!',
            !centerOk ? `Mũi nhọn compa chưa cắm vào tâm O. Đơn cần đường tròn tâm O, ${what}.` : `Em vẽ ${got}, đơn cần ${what}.`,
            m.kind === 'draw'
              ? `Cắm mũi nhọn compa vào tâm O, kéo đầu bút chì ra cách tâm đúng ${m.r} ô (${m.r} cm) rồi quay một vòng.`
              : `Đường kính dài gấp 2 lần bán kính: bán kính = ${2 * m.r} : 2 = ${m.r} cm. Mở compa ${m.r} ô rồi quay.`);
        }
        if (m.kind === 'through') {
          if (centerOk && rOk) return ok('Đúng! Đường tròn tâm O đi qua điểm A: đoạn thẳng OA là một bán kính.');
          return bad(!centerOk ? 'Tâm đường tròn chưa đúng chỗ!' : 'Đường tròn chưa đi qua A!',
            !centerOk ? 'Mũi nhọn compa chưa cắm vào tâm O.' : 'Đường tròn em vẽ chưa đi qua điểm A.',
            'Cắm mũi nhọn vào tâm O, kéo đầu bút chì tới đúng điểm A rồi quay: mọi điểm trên đường tròn cách tâm O bằng OA.');
        }
        if (centerOk && rOk) return ok(`Đúng! Tâm là trung điểm của đoạn thẳng AB, đường kính AB dài ${2 * rT} cm, bán kính ${rT} cm.`);
        return bad(!centerOk ? 'Tâm đường tròn chưa đúng chỗ!' : 'Compa mở chưa đúng!',
          !centerOk ? 'Tâm của đường tròn phải là trung điểm của đoạn thẳng AB.' : `Em vẽ ${got}, đơn cần bán kính ${rT} cm (nửa đoạn AB).`,
          `Đường kính AB đi qua tâm, nên tâm là trung điểm của AB (cách A và B ${rT} ô). Bán kính bằng nửa đường kính: ${2 * rT} : 2 = ${rT} cm.`);
      };

      if (!known) {
        const d = 2 * m.r;
        ask(row('⭕', 'Bán kính', Q, true), 'cm', (v, pad) => {
          if (v !== m.r) {
            pad.lock('g3g-keypad-bad');
            lock();
            return bad('Bán kính chưa đúng rồi!', `Đường kính ${d} cm thì bán kính là ${m.r} cm.`, `Đường kính dài gấp 2 lần bán kính, nên bán kính = ${d} : 2 = ${m.r} cm.`);
          }
          pad.lock('g3g-keypad-ok');
          known = true;
          boxEl.classList.add('g3p-wait');
          speak(`Đúng rồi, bán kính ${m.r} xăng-ti-mét! Giờ ${n.you} vẽ đường tròn tâm O bằng compa!`, null, `Bán kính <b>${m.r} cm</b>. Vẽ bằng compa!`);
        });
      }
      render();
    }

    // ════ Cấp 4: vẽ trang trí trên giấy ô vuông ═════════════════════════════════════════════════════
    function mountPaper() {
      const c = CELL, pad = 18, top = m.kind === 'copy' ? 30 : 0;
      const grids = []; // { x, y, cols, rows, edit(i, j) }
      const given = []; // { g, q, c } — có sẵn, không tô được
      const expect = []; // { g, q, c } — bé phải tô
      let colors, W, H, word, tip, fold = null, periods = 0;
      if (m.kind === 'mirror') {
        const pic = m.pic, cols = pic.rows[0].length, rows = pic.rows.length;
        colors = pic.colors;
        const edit = pic.axis === 'v' ? (i) => i >= cols / 2 : (i, j) => j >= rows / 2;
        grids.push({ x: pad, y: pad, cols, rows, edit });
        pic.rows.forEach((r, j) => [...r].forEach((ch, i) => {
          if (ch === '.') return;
          (edit(i, j) ? expect : given).push({ g: 0, q: [i, j], c: colors[ch === 'a' ? 0 : 1] });
        }));
        fold = pic.axis;
        W = cols * c + 2 * pad; H = rows * c + 2 * pad;
        word = `hình ${pic.name}`;
        tip = `Gấp đôi tờ giấy theo nét đứt: ô nào ở nửa bên này cũng trùng đúng một ô ở nửa bên kia. Ô cách nét đứt mấy ô thì ô tương ứng cũng cách nét đứt bấy nhiêu ô.`;
      } else if (m.kind === 'copy') {
        colors = m.colors;
        const gap = 1.4 * c;
        const g0 = { x: pad, y: pad + top, cols: m.w, rows: m.h, edit: () => false };
        const g1 = portrait
          ? { x: pad, y: pad + top + m.h * c + gap, cols: m.w, rows: m.h, edit: () => true }
          : { x: pad + m.w * c + gap, y: pad + top, cols: m.w, rows: m.h, edit: () => true };
        grids.push(g0, g1);
        m.cells.forEach(({ q, c: col }) => { given.push({ g: 0, q, c: col }); expect.push({ g: 1, q, c: col }); });
        W = (portrait ? m.w * c : 2 * m.w * c + gap) + 2 * pad;
        H = top + (portrait ? 2 * m.h * c + gap : m.h * c) + 2 * pad;
        tip = 'Đếm ô theo hàng và theo cột: ô ở hàng mấy, cột mấy của khung mẫu thì tô ô ở đúng hàng đó, cột đó của khung em vẽ, cùng màu.';
      } else {
        colors = m.colors;
        periods = portrait ? (m.p === 2 ? 4 : 3) : (m.p === 2 ? 5 : 4);
        const cols = m.p * periods, rows = 3;
        grids.push({ x: pad, y: pad, cols, rows, edit: (i) => i >= 2 * m.p });
        for (let k = 0; k < periods; k++) m.cells.forEach(({ q, c: col }) => (k < 2 ? given : expect).push({ g: 0, q: [q[0] + k * m.p, q[1]], c: col }));
        W = cols * c + 2 * pad; H = rows * c + 2 * pad;
        tip = `Hoa văn lặp lại sau mỗi ${m.p} cột. Nhìn nhóm ${m.p} cột cuối cùng đã tô rồi tô y hệt vào nhóm tiếp theo.`;
      }
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      const key = (g, q) => `${g}:${q[0]},${q[1]}`;
      const XY = (g, q) => [grids[g].x + q[0] * c, grids[g].y + q[1] * c];
      const tint = grids.map((gr, g) => {
        let s = '';
        for (let j = 0; j < gr.rows; j++) for (let i = 0; i < gr.cols; i++) if (gr.edit(i, j)) { const [x, y] = XY(g, [i, j]); s += `<rect x="${x}" y="${y}" width="${c}" height="${c}" fill="#FEF9C3"/>`; }
        return s;
      }).join('');
      const papers = grids.map(gr => paperSvg(gr.x, gr.y, gr.cols, gr.rows, c)).join('');
      const lines = grids.map(gr => paperLines(gr.x, gr.y, gr.cols, gr.rows, c)).join('');
      let deco = '';
      if (fold) {
        const gr = grids[0];
        deco = fold === 'v'
          ? `<path d="M${gr.x + (gr.cols / 2) * c} ${gr.y - 10} V${gr.y + gr.rows * c + 10}" stroke="#F97316" stroke-width="4" stroke-dasharray="10 7"/>`
          : `<path d="M${gr.x - 10} ${gr.y + (gr.rows / 2) * c} H${gr.x + gr.cols * c + 10}" stroke="#F97316" stroke-width="4" stroke-dasharray="10 7"/>`;
      }
      if (m.kind === 'copy') {
        deco = grids.map((gr, g) => tag([gr.x + (gr.cols * c) / 2, gr.y - 18], g ? 'Em vẽ' : 'Mẫu', { size: 18, color: g ? '#C2410C' : '#1D4ED8' })).join('');
      }
      svg.innerHTML = `${papers}${tint}${lines}
        <g data-given>${given.map(({ g, q, c: col }) => cellSvg(...XY(g, q), c, col)).join('')}</g>
        <g data-paint></g><g data-marks></g><g data-over></g><g data-deco>${deco}</g>`;
      const paintG = svg.querySelector('[data-paint]'), marksG2 = svg.querySelector('[data-marks]'), overG = svg.querySelector('[data-over]');
      const paint = new Map();
      dev.paint = paint;
      dev.expect = expect;
      dev.cell = (g, q) => { const [x, y] = XY(g, q); const b = svgBoxOnScreen(svg, x, y, c, c); return b && [b.left + b.width / 2, b.top + b.height / 2]; };

      const T = {
        mirror: { order: `Tô nốt <span class="g3p-hl">nửa còn lại</span> của ${word} (gấp đôi theo nét đứt)`, say: `Tấm thiệp ${word} mới tô được một nửa. ${cap(n.you)} tô nốt nửa còn lại, sao cho gấp đôi theo nét đứt thì hai nửa trùng khít!`, shown: `Tô nốt <b class="g3f-want">nửa còn lại</b>!` },
        copy: { order: `Vẽ <span class="g3p-hl">giống hệt mẫu</span> vào khung bên ${portrait ? 'dưới' : 'phải'}`, say: `${cap(n.you)} vẽ lại hình giống hệt mẫu vào khung trống giúp ${n.me}!`, shown: `Vẽ <b class="g3f-want">giống hệt mẫu</b>!` },
        repeat: { order: `<span class="g3p-hl">Vẽ tiếp</span> hoa văn cho kín dải giấy`, say: `${cap(n.you)} vẽ tiếp hoa văn cho kín dải giấy giúp ${n.me}!`, shown: `<b class="g3f-want">Vẽ tiếp</b> hoa văn!` },
      }[m.kind];
      order(T.order);
      speak(T.say, null, T.shown);

      let sel = colors[0];
      acts.innerHTML = colors.map((col, i) => `<button type="button" class="g3p-swatch${i ? '' : ' g3p-on'}" data-color="${col}" style="--c:${col}" aria-label="Màu ${i + 1}"></button>`).join('')
        + btn('✔ Xong', 'data-done', 'g3p-ok-btn');
      acts.addEventListener('click', (e) => {
        const sw = e.target.closest('[data-color]');
        if (!sw || S.locked) return;
        sel = sw.dataset.color;
        sfx.tap();
        acts.querySelectorAll('[data-color]').forEach(b => b.classList.toggle('g3p-on', b === sw));
      });

      const cellAt = (s) => {
        for (let g = 0; g < grids.length; g++) {
          const gr = grids[g];
          const i = Math.floor((s[0] - gr.x) / c), j = Math.floor((s[1] - gr.y) / c);
          if (i >= 0 && j >= 0 && i < gr.cols && j < gr.rows) return { g, q: [i, j], edit: gr.edit(i, j) };
        }
        return null;
      };
      const drawCell = (g, q, pop) => {
        const k = key(g, q);
        paintG.querySelector(`[data-k="${k}"]`)?.remove();
        const col = paint.get(k);
        if (!col) return;
        const [x, y] = XY(g, q);
        paintG.insertAdjacentHTML('beforeend', `<g data-k="${k}"${pop ? ' class="g3p-cellpop"' : ''}>${cellSvg(x, y, c, col)}</g>`);
      };
      let painting = null, warned = false;
      const apply = (hit) => {
        const k = key(hit.g, hit.q);
        if (painting.seen.has(k)) return;
        painting.seen.add(k);
        if (painting.mode === 'clear') { if (!paint.has(k)) return; paint.delete(k); sfx.tap(); }
        else { if (paint.get(k) === sel) return; paint.set(k, sel); sfx.pop(painting.seen.size % 8); }
        drawCell(hit.g, hit.q, painting.mode !== 'clear');
      };
      svg.addEventListener('pointerdown', (e) => {
        if (S.locked) return;
        e.preventDefault();
        const hit = cellAt(toSvg(e));
        if (!hit) return;
        if (!hit.edit) {
          if (!warned) { warned = true; speak('Phần này có sẵn rồi! Tô vào những ô vàng còn trống.', null, 'Tô vào <b>ô vàng</b> còn trống!'); }
          return;
        }
        svg.setPointerCapture?.(e.pointerId);
        painting = { mode: paint.get(key(hit.g, hit.q)) === sel ? 'clear' : 'paint', seen: new Set() };
        apply(hit);
      });
      svg.addEventListener('pointermove', (e) => {
        if (!painting || S.locked) return;
        const hit = cellAt(toSvg(e));
        if (hit?.edit) apply(hit);
      });
      const endPaint = () => { painting = null; };
      svg.addEventListener('pointerup', endPaint);
      svg.addEventListener('pointercancel', endPaint);

      /** Hiệu ứng theo thời gian: fn(t) với t chạy 0 → 1 (có dịu nhẹ). */
      const animate = (ms, fn) => new Promise((res) => {
        const t0 = performance.now();
        const step = (now) => {
          if (!svg.isConnected) return res();
          const k = Math.min(1, (now - t0) / ms);
          fn(k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2);
          if (k < 1) requestAnimationFrame(step); else res();
        };
        requestAnimationFrame(step);
      });
      const ghost = (list) => list.map(({ g, q, c: col }) => { const [x, y] = XY(g, q); return cellSvg(x, y, c, col, 'fill-opacity="0.5" stroke-dasharray="5 4"'); }).join('');
      /** Đánh dấu các ô cần tô: ✓ xanh (đúng màu), khung đỏ nét đứt (chưa tô / sai màu); ✗ đỏ ở ô tô thừa. */
      const judge = (want, scope) => {
        let miss = 0, wrong = 0, extra = 0;
        const wantKeys = new Set(want.map(w => key(w.g, w.q)));
        let s = '';
        for (const w of want) {
          const [x, y] = XY(w.g, w.q), got = paint.get(key(w.g, w.q));
          if (got === w.c) s += `<path d="M${x + c * 0.28} ${y + c * 0.52} l${c * 0.16} ${c * 0.16} l${c * 0.3} -${c * 0.34}" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M${x + c * 0.28} ${y + c * 0.52} l${c * 0.16} ${c * 0.16} l${c * 0.3} -${c * 0.34}" fill="none" stroke="#15803D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
          else {
            if (got) wrong++; else miss++;
            s += `<rect x="${x + 3}" y="${y + 3}" width="${c - 6}" height="${c - 6}" rx="4" fill="none" stroke="#EF4444" stroke-width="3.5" stroke-dasharray="6 4"/>`;
          }
        }
        for (const [k] of paint) {
          if (wantKeys.has(k) || !scope(k)) continue;
          extra++;
          const [g, rest] = k.split(':'), q = rest.split(',').map(Number), [x, y] = XY(Number(g), q);
          s += `<path d="M${x + 10} ${y + 10} L${x + c - 10} ${y + c - 10} M${x + c - 10} ${y + 10} L${x + 10} ${y + c - 10}" stroke="#EF4444" stroke-width="4" stroke-linecap="round"/>`;
        }
        marksG2.insertAdjacentHTML('beforeend', s);
        return { miss, wrong, extra };
      };

      acts.querySelector('[data-done]').onclick = async () => {
        if (S.locked) return;
        if (!paint.size) { speak('Chọn màu rồi chạm vào các ô vàng để tô!', null, 'Chạm vào <b>ô vàng</b> để tô!'); poke(acts.querySelector('[data-color]')); return; }
        lock();
        const calm = calmMotion();
        let res = { miss: 0, wrong: 0, extra: 0 };
        if (m.kind === 'mirror') {
          // Gấp giấy: nửa có sẵn lật qua nét đứt, chồng lên nửa em tô.
          const gr = grids[0];
          const f = fold === 'v' ? gr.x + (gr.cols / 2) * c : gr.y + (gr.rows / 2) * c;
          overG.innerHTML = `<g data-flip>${ghost(given)}</g>`;
          const flip = overG.querySelector('[data-flip]');
          sfx.swish();
          await animate(calm ? 1500 : 1000, (t) => {
            const s = Math.cos(Math.PI * t).toFixed(3);
            flip.setAttribute('transform', fold === 'v' ? `translate(${f} 0) scale(${s} 1) translate(${-f} 0)` : `translate(0 ${f}) scale(1 ${s}) translate(0 ${-f})`);
          });
          await sleep(300);
          res = judge(expect, () => true);
        } else if (m.kind === 'copy') {
          // Khung mẫu (bản mờ) trượt sang chồng lên khung em vẽ.
          overG.innerHTML = `<g data-slide>${ghost(given)}</g>`;
          const sl = overG.querySelector('[data-slide]');
          const d = sub([grids[1].x, grids[1].y], [grids[0].x, grids[0].y]);
          sfx.swish();
          await animate(calm ? 1300 : 900, (t) => sl.setAttribute('transform', `translate(${(d[0] * t).toFixed(1)} ${(d[1] * t).toFixed(1)})`));
          await sleep(250);
          res = judge(expect, () => true);
        } else {
          // Nhóm cột cuối cùng có sẵn trượt dần sang từng nhóm cần vẽ tiếp.
          const unit = given.filter(w => w.q[0] >= m.p && w.q[0] < 2 * m.p);
          for (let k = 2; k < periods; k++) {
            if (!svg.isConnected) return;
            overG.innerHTML = `<g data-slide>${ghost(unit)}</g>`;
            const sl = overG.querySelector('[data-slide]');
            const d0 = (k - 2) * m.p * c, d1 = (k - 1) * m.p * c;
            sfx.swish();
            await animate(calm ? 900 : 650, (t) => sl.setAttribute('transform', `translate(${(d0 + (d1 - d0) * t).toFixed(1)} 0)`));
            const want = expect.filter(w => Math.floor(w.q[0] / m.p) === k);
            const r = judge(want, (kk) => Math.floor(Number(kk.split(':')[1].split(',')[0]) / m.p) === k);
            res = { miss: res.miss + r.miss, wrong: res.wrong + r.wrong, extra: res.extra + r.extra };
            await sleep(350);
          }
        }
        await sleep(350);
        const parts = [res.miss && `còn ${res.miss} ô chưa tô`, res.wrong && `${res.wrong} ô sai màu`, res.extra && `${res.extra} ô tô thừa`].filter(Boolean);
        const say = {
          mirror: [`Đúng! Gấp đôi theo nét đứt, hai nửa ${word} trùng khít.`, `Hai nửa ${word} chưa trùng khít`],
          copy: ['Đúng! Hình em vẽ giống hệt mẫu.', 'Hình em vẽ chưa giống mẫu'],
          repeat: ['Đúng! Hoa văn lặp lại đều, kín cả dải giấy.', 'Hoa văn vẽ tiếp chưa đúng'],
        }[m.kind];
        if (!parts.length) return ok(say[0]);
        bad('Chưa khớp với mẫu rồi!', `${say[1]}: ${parts.join(', ')}.`, tip);
      };
    }
  },
};
