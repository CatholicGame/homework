/**
 * 🏭 Xưởng đóng gói trăm – chục — thiết kế: docs/lop_2/thiet-ke-tro-choi.md §4.6. Bám Vở BT Toán 2 Tập Hai:
 *   pack  (cấp 1; Bài 48): thùng hàng đổ ra N khối lẻ (hoặc N thanh chục). Bé bấm "📦 Đóng gói": 10 khối bay vào máy,
 *         máy ép thành 1 thanh chục (10 thanh → 1 tấm trăm) bay ra khay. Bấm khi chưa đủ 10 thì máy kêu. "✓ Đóng xong"
 *         khi còn đủ 10 là thất bại; không thì phần lẻ xuống khay, bé gõ tất cả bao nhiêu khối (máy đếm lại để kiểm tra).
 *   build (cấp 2 số tròn trăm, tròn chục — Bài 49; cấp 3 đơn hàng đọc bằng chữ — Bài 51): bé lấy tấm, thanh, khối từ kho
 *         vào khay, chạm miếng trong khay để trả lại kho, bấm "🚚 Giao hàng". Cấp 3 xong thì gõ số của đơn hàng.
 *   sum   (cấp 3, xen kẽ; Bài 52): khay có sẵn hàng, viết số thành tổng: 347 = 300 + ? + 7.
 *   cmp   (cấp 2 số tròn — Bài 50; cấp 4 — Bài 53): hai xe hàng, chọn dấu >, <, =. Máy so từng cột: trăm trước,
 *         bằng thì so chục, rồi đơn vị.
 *   add / sub (cấp 5; Bài 59–62): gõ kết quả trước, bấm nút: hàng khay dưới gộp vào khay trên, đủ 10 khối lẻ thì đóng
 *         ngay thành 1 thanh sang cột chục (nhớ 1); trừ thì lấy hàng ra cho khách, thiếu khối lẻ thì tháo 1 thanh.
 * Dùng khung quầy Chợ phiên lớp 3 (market/stall.js), theme 'factory'. App không báo trước lúc đúng: bé tự bấm nút.
 */

import { pieceSvg, flyPiece, machineSvg, factoryIcon, PIECE_NAME } from './art/factory.js';
import { stallMeta, levelMeta } from './catalog.js';
import { injectFactoryStyles } from './styles.js';
import { NPCS, cap } from '../grade3Games/npc.js';
import { mountStall, Q } from '../grade3Games/market/stall.js';
import { flyOne, calmMotion } from '../grade3Games/fly.js';
import { sfx } from '../preschool/fx.js';

const WANT = (t) => `<b class="g3f-want">${t}</b>`;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const KINDS = ['h', 't', 'u'];
const HEAD = { h: 'Trăm', t: 'Chục', u: 'Đơn vị' };
const VAL = { h: 100, t: 10, u: 1 };
const split = (v) => ({ h: Math.floor(v / 100), t: Math.floor(v / 10) % 10, u: v % 10 });
const total = (n) => n.h * 100 + n.t * 10 + n.u;

// ── Đọc số (Bài 51): "năm trăm linh sáu", "bốn trăm mười lăm", "hai trăm bốn mươi mốt" ─────────────────────
const DIG = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
export function readNum(v) {
  const { h, t, u } = split(v);
  let s = h ? `${DIG[h]} trăm` : '';
  if (t === 0 && u) s += ` linh ${DIG[u]}`;
  else if (t === 1) s += ` mười${u ? ` ${u === 5 ? 'lăm' : DIG[u]}` : ''}`;
  else if (t > 1) s += ` ${DIG[t]} mươi${u === 1 ? ' mốt' : u === 5 ? ' lăm' : u ? ` ${DIG[u]}` : ''}`;
  return s.trim();
}

export const FACTORY_LEVELS = [
  {
    ...levelMeta('fac-1'), missions: 5, kind: 'pack',
    knowledge: 'đơn vị, chục, trăm',
    ask: (n) => `Xưởng có nhiều khối gỗ lẻ. ${cap(n.you)} đóng 10 khối thành 1 thanh chục giúp ${n.me}!`,
    desc: '10 khối lẻ đóng thành 1 thanh chục, 10 thanh chục ép thành 1 tấm trăm. 3 thanh chục và 5 khối lẻ là 35 khối.',
    how: [['u', 'Khối lẻ'], ['📦', 'Đóng 10'], ['🧮', 'Đếm khối']],
  },
  {
    ...levelMeta('fac-2'), missions: 5, kind: 'round',
    knowledge: 'số tròn trăm, số tròn chục, so sánh',
    ask: (n) => `Khách đặt hàng số tròn trăm, tròn chục. ${cap(n.you)} xếp hàng lên khay giúp ${n.me}!`,
    desc: '470 khối là 4 tấm trăm và 7 thanh chục. 300 < 500 vì 3 tấm trăm ít hơn 5 tấm trăm.',
    how: [['h', 'Lấy hàng'], ['🚚', 'Giao hàng'], ['⚖️', 'So sánh']],
  },
  {
    ...levelMeta('fac-3'), missions: 5, kind: 'three',
    knowledge: 'số có ba chữ số, viết số thành tổng',
    ask: (n) => `Đơn hàng viết bằng chữ. ${cap(n.you)} đọc rồi xếp đủ tấm, thanh, khối giúp ${n.me}!`,
    desc: '"Năm trăm linh sáu": 5 tấm trăm, không có thanh chục, 6 khối lẻ. 506 = 500 + 6.',
    how: [['📝', 'Đọc đơn'], ['h', 'Lấy hàng'], ['🧮', 'Viết số']],
  },
  {
    ...levelMeta('fac-4'), missions: 5, kind: 'cmp3',
    knowledge: 'so sánh các số có ba chữ số',
    ask: (n) => `Xe nào chở nhiều khối hơn? ${cap(n.you)} so sánh giúp ${n.me}!`,
    desc: '362 và 326: cùng 3 trăm, so chục: 6 chục > 2 chục, nên 362 > 326.',
    how: [['🚚', 'Hai xe hàng'], ['⚖️', 'Chọn dấu'], ['h', 'So từng cột']],
  },
  {
    ...levelMeta('fac-5'), missions: 5, kind: 'calc',
    knowledge: 'phép cộng, phép trừ trong phạm vi 1 000',
    ask: (n) => `Gộp hàng, lấy hàng cho khách. ${cap(n.you)} tính trước giúp ${n.me}!`,
    desc: '147 + 35: 7 + 5 = 12 khối lẻ, đóng 10 khối thành 1 thanh chục (nhớ 1). 147 + 35 = 182.',
    how: [['🧮', 'Tính trước'], ['📦', 'Gộp, lấy hàng'], ['t', 'Nhớ, tháo thanh']],
  },
];

// ── Sinh nhiệm vụ ───────────────────────────────────────────────────────────────────────────────
const tries = (make, ok) => { let v; for (let k = 0; k < 60; k++) { v = make(); if (ok(v)) break; } return v; };
const seen = (h, v) => h.some(x => x.value === v || x.a === v);

function makePack(rng, h) {
  const start = h[0]?.start ?? rng.int(0, 1); // xen kẽ khối lẻ → thanh chục và thanh chục → tấm trăm
  const unit = (h.length + start) % 2 ? 't' : 'u';
  const N = tries(() => (unit === 'u' ? rng.int(23, 69) : rng.int(12, 39)), (v) => v % 10 !== 0 && !h.some(x => x.N === v));
  return { kind: 'pack', start, unit, N, value: unit === 'u' ? N : N * 10 };
}

function roundNum(rng, hundreds) {
  return hundreds ? rng.int(1, 9) * 100 : rng.int(1, 9) * 100 + rng.int(1, 9) * 10;
}

function makeRound(rng, h) {
  if (h.length % 2 === 0) {
    const hundreds = h.filter(x => x.kind === 'build').length % 2 === 1;
    const value = tries(() => roundNum(rng, hundreds), (v) => !seen(h, v));
    return { kind: 'build', value, words: false };
  }
  // So sánh số tròn: cùng tròn trăm (300 và 500), hoặc tròn chục đảo chữ số (470 và 740), hoặc gần nhau (510 và 490).
  // Kiểu so sánh không lặp lại trong ván (có 2 lượt so sánh).
  const style = rng.pick(['hund', 'swap', 'near'].filter(x => !h.some(y => y.style === x)));
  let a, b;
  if (style === 'hund') { [a, b] = rng.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 2).map(x => x * 100); }
  else if (style === 'swap') { const [x, y] = rng.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 2); a = x * 100 + y * 10; b = y * 100 + x * 10; }
  else { a = rng.int(2, 8) * 100 + rng.int(1, 3) * 10; b = a - 100 + rng.int(6, 9) * 10 - (a % 100); if (rng() < 0.5) [a, b] = [b, a]; }
  return { kind: 'cmp', style, a, b };
}

// Cấp 3: số có chữ số 0, "mười", "mốt", "lăm" xen kẽ để bé đọc kỹ.
const THREE_STYLES = ['plain', 'zeroT', 'zeroU', 'teen', 'five', 'one'];
function threeNum(rng, style) {
  const hh = rng.int(1, 9);
  if (style === 'zeroT') return hh * 100 + rng.int(1, 9);
  if (style === 'zeroU') return hh * 100 + rng.int(2, 9) * 10;
  if (style === 'teen') return hh * 100 + 10 + rng.int(1, 9);
  if (style === 'five') return hh * 100 + rng.int(2, 9) * 10 + 5;
  if (style === 'one') return hh * 100 + rng.int(2, 9) * 10 + 1;
  return hh * 100 + rng.int(2, 9) * 10 + rng.pick([2, 3, 4, 6, 7, 8, 9]);
}

function makeThree(rng, h) {
  const order = h[0]?.order || rng.shuffle(THREE_STYLES);
  const style = order[h.length % order.length];
  const value = tries(() => threeNum(rng, style), (v) => !seen(h, v));
  if (h.length % 2 === 0) return { kind: 'build', value, words: true, order };
  // Viết thành tổng: một phần (khác 0) bị che.
  const parts = KINDS.map(k => split(value)[k] * VAL[k]).filter(Boolean);
  return { kind: 'sum', value, order, parts, miss: rng.int(0, parts.length - 1) };
}

function makeCmp3(rng, h) {
  const order = h[0]?.order || [...rng.shuffle(['tens', 'hund', 'units', 'swap']), rng.pick(['equal', 'hund', 'tens'])];
  const style = order[h.length % order.length];
  const d = () => rng.int(0, 9);
  let a, b;
  if (style === 'equal') { a = b = rng.int(101, 999); }
  else if (style === 'hund') { // trăm khác nhau, số bé có chục, đơn vị lớn hơn (419 và 391)
    const x = rng.int(2, 9); a = x * 100 + rng.int(0, 4) * 10 + rng.int(0, 4); b = (x - 1) * 100 + rng.int(5, 9) * 10 + rng.int(5, 9);
  } else if (style === 'tens') { const x = rng.int(1, 9); const [p, q] = rng.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 2); a = x * 100 + p * 10 + d(); b = x * 100 + q * 10 + d(); }
  else if (style === 'units') { const base = rng.int(10, 99) * 10; const [p, q] = rng.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 2); a = base + p; b = base + q; }
  else { const x = rng.int(1, 9); const [p, q] = rng.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 2); a = x * 100 + p * 10 + q; b = x * 100 + q * 10 + p; }
  if (rng() < 0.5) [a, b] = [b, a];
  return { kind: 'cmp', a, b, order };
}

// Mở từ Bài 59–62 (lv.op, lv.carry): chỉ cộng hoặc chỉ trừ, chỉ có nhớ hoặc chỉ không nhớ — đúng tên bài.
function makeCalc(rng, h, lv = {}) {
  const plan = h[0]?.plan || (lv.op ? [lv.op] : ['add', 'sub', 'add', 'sub', rng.pick(['add', 'sub'])]);
  const op = plan[h.length % plan.length];
  // Nhớ / tháo ở cột đơn vị hoặc cột chục (nhiều nhất một cột); lượt thứ 5 có thể không nhớ.
  const carry = lv.carry === false ? 'none'
    : lv.carry || h.length !== 4 ? rng.pick(['u', 'u', 't']) : rng.pick(['u', 't', 'none']);
  for (let k = 0; k < 400; k++) {
    const a = rng.int(120, 860), b = rng.int(rng() < 0.4 ? 12 : 105, 480);
    const A = split(a), B = split(b);
    if (op === 'add') {
      const r = a + b;
      if (r > 999) continue;
      const cu = A.u + B.u >= 10, ct = A.t + B.t + (cu ? 1 : 0) >= 10;
      if ((carry === 'u' && (!cu || ct)) || (carry === 't' && (cu || !ct)) || (carry === 'none' && (cu || ct))) continue;
      if (h.some(x => x.a === a)) continue;
      return { kind: 'add', a, b, value: r, plan, carry };
    }
    if (b >= a) continue;
    const bu = A.u < B.u, bt = A.t - (bu ? 1 : 0) < B.t;
    if ((carry === 'u' && (!bu || bt)) || (carry === 't' && (bu || !bt)) || (carry === 'none' && (bu || bt))) continue;
    if (A.t === 0 && bu) continue; // tháo thanh khi cột chục trống cần tháo cả tấm trăm: lớp 2 chưa học
    return { kind: 'sub', a, b, value: a - b, plan, carry };
  }
  return { kind: 'add', a: 147, b: 35, value: 182, plan, carry: 'u' };
}

const MAKERS = { pack: makePack, round: makeRound, three: makeThree, cmp3: makeCmp3, calc: makeCalc };

export const FACTORY_GAME = {
  ...stallMeta('factory'),
  unitWord: 'đơn hàng',
  npcs: NPCS,
  starPrefix: 'g2games',
  levels: FACTORY_LEVELS,
  stallIcon: () => factoryIcon(60),
  summaryText: (ok, total) => `Em đã làm đúng <strong>${ok}/${total}</strong> đơn hàng của xưởng.`,

  howTo(level) {
    const pic = (p) => (KINDS.includes(p) ? `<span class="g2x-how">${pieceSvg(p)}</span>` : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '😊', label: 'Khách vui' }];
  },

  /** Mở từ biểu tượng của Bài 59–62 (grade2Games/catalog.js unitFocus): chỉ phép tính của bài. */
  focus(level, { op, carry } = {}) {
    if (!op || level.kind !== 'calc') return level;
    return { ...level, op, carry, knowledge: `phép ${op === 'add' ? 'cộng' : 'trừ'} (${carry ? 'có' : 'không'} nhớ) trong phạm vi 1 000` };
  },

  makeMission(rng, level, history) {
    const m = MAKERS[level.kind](rng, history, level);
    const recent = history.slice(-3).map(x => x.npc.id);
    return { ...m, level: level.kind, npc: rng.pick(NPCS.filter(n => !recent.includes(n.id))) };
  },

  mountMission(stage, m, level, api) {
    injectFactoryStyles();
    if (import.meta.env.DEV) window.__g2fac = m;
    return mountFactory(stage, m, api);
  },
};

// ── Khay hàng: ba cột Trăm | Chục | Đơn vị ─────────────────────────────────────────────────────────
/**
 * Khay trong `el`. cols: các cột hiện ra. Trả về { n, draw, pile, pieces, add, take, glow }.
 * Miếng hàng trong khay là <svg class="g2x-p">; tap(kind, i) khi bé chạm một miếng (cấp lấy hàng: trả lại kho).
 */
// Tấm trăm xếp nhiều nhất 2 hàng; cỡ cột cố định theo sức chứa để khay không đổi cỡ khi thêm, bớt hàng.
const platesPerRow = (h) => (h > 4 ? Math.ceil(h / 2) : Math.max(1, h));
const rodsPerRow = (t) => Math.min(10, Math.max(1, t));

function makeTray(el, counts, { cols = KINDS, name = '', tap = null, cap: capN = null } = {}) {
  el.classList.add('g2x-tray');
  const c = { h: 0, t: 0, u: 0, ...(capN || counts) };
  el.style.setProperty('--p', platesPerRow(c.h));
  el.style.setProperty('--tc', rodsPerRow(c.t));
  el.innerHTML = `${name ? `<div class="g2x-tray-name" data-name>${name}</div>` : ''}<div class="g2x-cols">${cols.map(k => `
    <div class="g2x-col g2x-col-${k}" data-col="${k}"><span class="g2x-head">${HEAD[k]}</span><div class="g2x-pile" data-pile="${k}"></div></div>`).join('')}</div>`;
  const T = { el, n: { h: 0, t: 0, u: 0, ...counts } };
  T.pile = (k) => el.querySelector(`[data-pile="${k}"]`);
  T.pieces = (k) => [...(T.pile(k)?.children || [])];
  /** Vẽ lại một cột; hide: số miếng cuối còn ẩn (đang bay tới). */
  T.draw = (k, hide = 0) => {
    const p = T.pile(k);
    if (!p) return;
    p.innerHTML = Array.from({ length: T.n[k] }, (_, i) => pieceSvg(k, i >= T.n[k] - hide ? 'g2x-hide' : '')).join('');
  };
  KINDS.forEach(k => T.draw(k));
  /** Thêm `count` miếng loại k bay từ khung `from` (mỗi miếng cách nhau gap ms). Trả về ms tới lúc miếng cuối đáp. */
  T.add = (k, from, count = 1, { gap = 90, onEach } = {}) => {
    T.n[k] += count;
    T.draw(k, count);
    const els = T.pieces(k).slice(-count);
    let end = 0;
    els.forEach((pe, i) => {
      end = Math.max(end, flyOne(flyPiece(k), from, pe.getBoundingClientRect(), {
        delay: i * gap, minMs: 380, maxMs: 620,
        onLand: () => { pe.classList.remove('g2x-hide'); if (!calmMotion()) pe.classList.add('g2x-pop'); sfx.pop(i % 10); onEach?.(i); },
      }));
    });
    return end;
  };
  /** Lấy `count` miếng cuối loại k ra, bay tới khung `to` (null: chỉ biến mất). Trả về ms. */
  T.take = (k, count, to, { gap = 70 } = {}) => {
    const els = T.pieces(k).slice(-count);
    const rects = els.map(e => e.getBoundingClientRect());
    T.n[k] -= count;
    T.draw(k);
    let end = 0;
    if (to) rects.forEach((r, i) => { end = Math.max(end, flyOne(flyPiece(k), r, to, { delay: i * gap, minMs: 380, maxMs: 620 })); });
    return end;
  };
  T.glow = (k, on, cls = 'g2x-glow') => el.querySelector(`[data-col="${k}"]`)?.classList.toggle(cls, on);
  if (tap) el.addEventListener('click', (e) => {
    const p = e.target.closest('.g2x-p');
    if (!p || p.classList.contains('g2x-hide')) return;
    const k = p.closest('[data-pile]').dataset.pile;
    tap(k, T.pieces(k).indexOf(p));
  });
  return T;
}

// ── Cảnh ─────────────────────────────────────────────────────────────────────────────────────────
const SIGN = { pack: 'Đóng gói', build: 'Xếp hàng', sum: 'Viết thành tổng', cmp: 'So sánh', add: 'Gộp hàng', sub: 'Lấy hàng' };

function mountFactory(stage, m, api) {
  const n = m.npc;
  const s = mountStall(stage, {
    npc: n, api, theme: 'factory', cameo: false,
    sign: `${factoryIcon(34)}<span><strong>Xưởng đóng gói</strong><br>${SIGN[m.kind]}</span>`,
    counter: `
      <div class="g2x-bench g2x-k-${m.kind}">
        <div class="g2x-order" data-order></div>
        <div class="g2x-area" data-area></div>
        <div class="g2x-acts" data-acts></div>
      </div>`,
  });
  const { counter, main, speak, row, ask, rest, nudge, thanks } = s;
  const bench = counter.querySelector('.g2x-bench');
  const order = counter.querySelector('[data-order]');
  const area = counter.querySelector('[data-area]');
  const acts = counter.querySelector('[data-acts]');
  const box = (cls, html = '') => { const d = document.createElement('div'); d.className = cls; d.innerHTML = html; area.appendChild(d); return d; };

  // Co giãn: mỗi ô trong area khai báo cỡ theo cỡ ô vuông c: need(lay) → { W(c), H(c) } (px, gồm cả chữ đo thật).
  // fit() thử mọi cách xếp (tấm trăm p tấm một hàng, thanh chục r thanh một hàng, các ô xếp ngang / dọc) và dò c
  // to nhất vừa khung. Thẻ kết quả hiện ra thì cất hàng nút, chừa đáy quầy cho thẻ (khung quá chật thì thẻ đè lên).
  const boxes = []; // { el, need: (lay) => ({ W, H }), cap? }
  const G = 14;
  const solve = () => {
    const W = area.clientWidth, H = area.clientHeight;
    if (!W || !H || !boxes.length) return null;
    let best = { score: -Infinity };
    for (const lay of [2, 3, 5, 9].flatMap(p => [10, 5].map(r => ({ p, r })))) {
      const needs = boxes.map(b => b.need(lay));
      for (const dir of ['row', 'col']) {
        const size = (c) => {
          const ws = needs.map(x => x.W(c)), hs = needs.map(x => x.H(c));
          return dir === 'row'
            ? [ws.reduce((a, v) => a + v, 0) + G * (ws.length - 1), Math.max(...hs)]
            : [Math.max(...ws), hs.reduce((a, v) => a + v, 0) + G * (hs.length - 1)];
        };
        const fits = (c) => { const [w, h] = size(c); return w <= W - 6 && h <= H - 12; }; // chừa lề: viền sáng, thẻ "nhớ 1"
        let lo = 2.5, hi = 22;
        if (!fits(lo)) { const [w, h] = size(lo); const sc = -Math.max(w / W, h / H); if (sc > best.score) best = { score: sc, cell: lo, dir, lay }; continue; }
        for (let k = 0; k < 14; k++) { const mid = (lo + hi) / 2; if (fits(mid)) lo = mid; else hi = mid; }
        // Hàng ngang dễ nhìn hơn (hai xe cạnh nhau), trừ khi xếp dọc to hơn hẳn.
        const sc = lo * (dir === 'row' ? 1 : 0.92);
        if (sc > best.score) best = { score: sc, cell: lo, dir, lay };
      }
    }
    return best;
  };
  const fit = () => {
    if (!bench.isConnected) { obs.disconnect(); return; }
    const card = main.querySelector(':scope > .g3g-result');
    acts.hidden = !!card && !bench.classList.contains('g2x-keep-acts');
    bench.style.paddingBottom = card ? `${card.offsetHeight + 12}px` : '';
    let best = solve();
    if (card && best && best.cell < 5) { bench.style.paddingBottom = ''; best = solve(); }
    if (!best) return;
    area.classList.toggle('g2x-dir-col', best.dir === 'col');
    boxes.forEach(b => {
      if (!b.cap) return;
      b.el.style.setProperty('--p', Math.max(1, Math.min(best.lay.p, b.cap.h)));
      b.el.style.setProperty('--tc', Math.max(1, Math.min(best.lay.r, b.cap.t)));
    });
    bench.style.setProperty('--c', `${Math.floor(best.cell * 10) / 10}px`);
  };
  const obs = new ResizeObserver(fit);
  obs.observe(counter);
  new MutationObserver(() => requestAnimationFrame(fit)).observe(main, { childList: true });

  /** Ô cỡ theo ô vuông: w, h số ô, px, py phần cố định (px). */
  const cellNeed = (w, h, px, py) => () => ({ W: (c) => w * c + px, H: (c) => h * c + py });
  /**
   * Cỡ khay theo sức chứa lớn nhất trong nhiệm vụ: cap = { h, t, u } (số miếng tối đa mỗi cột). Mỗi cột rộng ít nhất
   * bằng chữ tên cột, cả khay rộng ít nhất bằng tên khay (đo thật: chữ không co theo ô vuông).
   */
  const trayNeed = (capN, cols = KINDS) => Object.assign(function need({ p: pp = 5, r: rr = 10 } = {}) {
    const el = need.el;
    const p = Math.max(1, Math.min(pp, capN.h));
    const hr = Math.ceil(capN.h / p) || 1;
    const tc = Math.max(1, Math.min(rr, capN.t)), tr = Math.ceil(Math.max(1, capN.t) / tc);
    const ur = Math.ceil(Math.max(1, capN.u) / 5);
    const wCol = { h: p * 10 + (p - 1) * 0.6, t: tc + (tc - 1) * 0.45, u: 5 + 4 * 0.3 };
    const hCol = { h: hr * 10 + (hr - 1) * 0.6, t: tr * 10 + (tr - 1) * 0.6, u: ur + (ur - 1) * 0.3 };
    const headW = Object.fromEntries(cols.map(k => [k, (el?.querySelector(`[data-col="${k}"] .g2x-head`)?.scrollWidth || 40) + 6]));
    const headH = el?.querySelector('.g2x-head')?.offsetHeight || 20;
    const nameEl = el?.querySelector('[data-name]');
    const nameW = nameEl ? nameEl.scrollWidth + 18 : 0, nameH = nameEl ? nameEl.offsetHeight + 4 : 0;
    return {
      // cột: phần ô vuông + lề 0.5 ô mỗi bên; giữa các cột 1.2 ô; khay: lề 6px, viền 3px
      W: (c) => Math.max(nameW, cols.reduce((a, k) => a + Math.max((wCol[k] + 1) * c, headW[k], 3.2 * c), 0) + 1.2 * c * (cols.length - 1) + 18),
      H: (c) => Math.max(...cols.map(k => hCol[k])) * c + 0.5 * c + headH + 3 + 4 + nameH + 18,
    };
  }, { cap: capN });
  const addBox = (el, need) => { need.el = el; boxes.push({ el, need, cap: need.cap }); return el; };

  const failWith = (line, text, tip) => { speak(line, 'sad', line); api.fail(text, tip); };
  const button = (html, cls = '') => { const b = document.createElement('button'); b.type = 'button'; b.className = `g3g-btn g2x-btn ${cls}`; b.innerHTML = html; acts.appendChild(b); return b; };
  const hint = (el) => { el.classList.remove('g2x-hint'); void el.offsetWidth; el.classList.add('g2x-hint'); };
  const numOf = (N) => `${N.h ? `${N.h} ${PIECE_NAME.h}` : ''}${N.h && (N.t || N.u) ? ', ' : ''}${N.t ? `${N.t} ${PIECE_NAME.t}` : ''}${N.t && N.u ? ', ' : ''}${N.u ? `${N.u} ${PIECE_NAME.u}` : ''}` || 'không có gì';

  /** Máy đếm lại khay: sáng từng miếng, nhãn khay chạy 100, 200, 210… Trả về tổng. */
  const countUp = async (T, labelEl, unit = 'khối') => {
    let sum = 0, i = 0;
    for (const k of KINDS) {
      for (const pe of T.pieces(k)) {
        sum += VAL[k];
        pe.classList.add('g2x-counted');
        labelEl.innerHTML = `<b>${sum}</b> ${unit}`;
        sfx.pop(i++ % 12);
        await sleep(calmMotion() ? 260 : k === 'u' ? 170 : 230);
      }
    }
    return sum;
  };

  if (m.kind === 'pack') return packMission();
  if (m.kind === 'build') return buildMission();
  if (m.kind === 'sum') return sumMission();
  if (m.kind === 'cmp') return cmpMission();
  return calcMission();

  // ════ Đóng gói ════════════════════════════════════════════════════════════════════════════════
  function packMission() {
    const lo = m.unit, hi = lo === 'u' ? 't' : 'h';
    const loName = PIECE_NAME[lo], hiName = PIECE_NAME[hi];
    // Thùng hàng: các miếng rải lộn xộn trên lưới (có chỗ trống), để bé không đếm sẵn theo hàng 10.
    const binCols = lo === 'u' ? 7 : Math.ceil(m.N / 3);
    const binRows = lo === 'u' ? Math.ceil(m.N / 5.5) : 3;
    const slots = Array.from({ length: binCols * binRows }, (_, i) => i);
    const filled = new Set(shuffleSeeded(slots, m.N * 7 + m.value).slice(0, m.N));
    const bin = addBox(box('g2x-bin'), lo === 'u' ? cellNeed(binCols * 1.5, binRows * 1.5, 18, 40) : cellNeed(binCols * 1.6, binRows * 11, 18, 40));
    bin.innerHTML = `<span class="g2x-cap" data-bincap>Thùng hàng</span><div class="g2x-bin-grid g2x-bin-${lo}" style="--bc:${binCols}">${
      slots.map(i => `<span class="g2x-slot">${filled.has(i) ? pieceSvg(lo, 'g2x-loose') : ''}</span>`).join('')}</div>`;
    const mach = addBox(box('g2x-mach', machineSvg()), cellNeed(11, 11.7, 0, 0));
    const packCap = lo === 'u' ? { h: 0, t: Math.floor(m.N / 10), u: 9 } : { h: Math.floor(m.N / 10), t: 9, u: 0 };
    const trayEl = addBox(box('g2x-trayhost'), trayNeed(packCap, lo === 'u' ? ['t', 'u'] : KINDS));
    const T = makeTray(trayEl, {}, { cols: lo === 'u' ? ['t', 'u'] : KINDS, name: 'Khay giao hàng', cap: packCap });
    const nameEl = trayEl.querySelector('[data-name]');
    fit();
    const loose = () => [...bin.querySelectorAll('.g2x-loose')];
    const svgEl = mach.querySelector('svg');
    const rect = (sel) => { const r = svgEl.querySelector(sel).getBoundingClientRect(); return { left: r.left + r.width * 0.3, top: r.top, width: r.width * 0.4, height: r.height * 0.6 }; };

    let busy = false, done = false;
    const packBtn = button(`📦 Đóng 10 ${loName} thành 1 ${hiName}`, 'g2x-go');
    const doneBtn = button('✓ Đóng xong', 'g2x-done');
    speak(`${cap(n.me)} có một thùng ${loName}. ${cap(n.you)} đóng mỗi 10 ${loName} thành 1 ${hiName}, rồi đếm xem có tất cả bao nhiêu khối!`, null,
      `Đóng 10 ${loName} thành ${WANT(`1 ${hiName}`)}!`);
    packBtn.onclick = async () => {
      if (busy || done) return;
      const ls = loose();
      if (ls.length < 10) {
        sfx.boing();
        hint(mach);
        speak(`Còn ${ls.length} ${loName}, chưa đủ 10 để đóng!`, null, `Còn ${ls.length} ${loName}, chưa đủ 10!`);
        return;
      }
      busy = true;
      sfx.tap();
      const take = ls.slice(-10);
      const to = rect('[data-in]');
      let end = 0;
      take.forEach((pe, i) => {
        const r = pe.getBoundingClientRect();
        setTimeout(() => { pe.remove(); }, i * 70);
        end = Math.max(end, flyOne(flyPiece(lo), r, to, { delay: i * 70, minMs: 380, maxMs: 600, onLand: () => sfx.pop(i) }));
      });
      await sleep(end + 50);
      mach.classList.add('g2x-on');
      sfx.swish();
      await sleep(calmMotion() ? 700 : 600);
      mach.classList.remove('g2x-on');
      await sleep(T.add(hi, rect('[data-out]'), 1) + 100);
      busy = false;
    };
    doneBtn.onclick = async () => {
      if (busy || done) return;
      done = true;
      packBtn.disabled = doneBtn.disabled = true;
      const ls = loose();
      if (ls.length >= 10) {
        hint(bin);
        failWith(`Còn ${ls.length} ${loName}, vẫn đóng được thêm!`, `Còn <b>${ls.length} ${loName}</b>: đủ 10 thì đóng được 1 ${hiName} nữa.`,
          `Cứ 10 ${loName} đóng thành 1 ${hiName}. ${m.N} ${loName}: ${Math.floor(m.N / 10)} ${hiName} và ${m.N % 10} ${loName}.`);
        return;
      }
      // Phần lẻ xuống khay.
      const from = ls.map(pe => pe.getBoundingClientRect());
      ls.forEach(pe => pe.remove());
      T.n[lo] += from.length;
      T.draw(lo, from.length);
      const els = T.pieces(lo).slice(-from.length);
      let end = 0;
      els.forEach((pe, i) => { end = Math.max(end, flyOne(flyPiece(lo), from[i], pe.getBoundingClientRect(), { delay: i * 80, minMs: 380, maxMs: 600, onLand: () => { pe.classList.remove('g2x-hide'); sfx.pop(i); } })); });
      await sleep(end + 200);
      bin.querySelector('[data-bincap]').textContent = 'Hết hàng';
      speak(`Khay có tất cả bao nhiêu khối? ${cap(n.you)} gõ số!`, null, `Tất cả ${WANT('bao nhiêu khối')}?`);
      ask(row('📦', 'Tất cả', `${Q} khối`, true), 'khối', async (v, pad) => {
        pad.lock();
        const sum = await countUp(T, nameEl);
        await sleep(300);
        if (v === sum) { pad.lock('g3g-keypad-ok'); thanks(); return; }
        pad.lock('g3g-keypad-bad');
        const N = T.n;
        failWith(`Khay có ${sum} khối, không phải ${v}!`, `${cap(numOf(N))}: <b>${sum} khối</b>.`,
          lo === 'u' ? `1 thanh chục là 10 khối. ${N.t} thanh chục và ${N.u} khối lẻ: ${N.t} chục ${N.u} đơn vị, viết ${sum}.`
            : `1 tấm trăm là 100 khối, 1 thanh chục là 10 khối. ${N.h} trăm ${N.t} chục: ${sum}.`);
      });
    };
  }

  // ════ Xếp hàng theo đơn ══════════════════════════════════════════════════════════════════════
  function buildMission() {
    const want = split(m.value);
    const label = m.words ? `“${cap(readNum(m.value))}”` : `${m.value} khối`;
    order.innerHTML = `<span class="g2x-order-ic">📝</span> Đơn hàng: <b>${label}</b>`;
    const trayEl = addBox(box('g2x-trayhost'), trayNeed({ h: 9, t: 9, u: 9 }, KINDS));
    let locked = false;
    const T = makeTray(trayEl, {}, {
      name: 'Khay giao hàng', cap: { h: 9, t: 9, u: 9 },
      tap: (k) => {
        if (locked) return;
        sfx.tap();
        T.take(k, 1, stockBtn[k].querySelector('svg').getBoundingClientRect());
      },
    });
    const nameEl = trayEl.querySelector('[data-name]');
    const stockBtn = {};
    const kho = document.createElement('div');
    kho.className = 'g2x-kho';
    kho.innerHTML = `<span class="g2x-kho-lab">Kho</span>${KINDS.map(k => `<button type="button" class="g2x-stock" data-stock="${k}">${pieceSvg(k)}<b>${cap(PIECE_NAME[k])}</b></button>`).join('')}`;
    acts.appendChild(kho);
    KINDS.forEach(k => { stockBtn[k] = kho.querySelector(`[data-stock="${k}"]`); });
    const go = button('🚚 Giao hàng', 'g2x-go');
    fit();
    speak(m.words
      ? `Đơn hàng: ${readNum(m.value)} khối. ${cap(n.you)} lấy tấm trăm, thanh chục, khối lẻ từ kho xếp lên khay, rồi bấm giao hàng!`
      : `${cap(n.me)} đặt ${m.value} khối. ${cap(n.you)} lấy hàng từ kho xếp lên khay, rồi bấm giao hàng!`, null,
    `Xếp đủ ${WANT(m.words ? readNum(m.value) : `${m.value} khối`)}!`);
    kho.addEventListener('click', (e) => {
      const b = e.target.closest('[data-stock]');
      if (!b || locked) return;
      const k = b.dataset.stock;
      if (T.n[k] >= 9) {
        sfx.boing();
        speak(`Đủ 10 ${PIECE_NAME[k]} thì đã đóng gói thành 1 ${k === 'u' ? 'thanh chục' : 'tấm trăm'} rồi!`, null, `Cột ${HEAD[k].toLowerCase()} có nhiều nhất 9 miếng!`);
        return;
      }
      sfx.tap();
      T.add(k, b.querySelector('svg').getBoundingClientRect(), 1);
    });
    go.onclick = async () => {
      if (locked) return;
      if (!T.n.h && !T.n.t && !T.n.u) { speak('Khay còn trống! Lấy hàng từ kho trước.', null, 'Lấy hàng từ kho trước!'); hint(kho); return; }
      locked = true;
      go.disabled = true;
      kho.classList.add('g2x-locked');
      const got = await countUp(T, nameEl);
      await sleep(300);
      if (got !== m.value) {
        const N = T.n;
        const diff = KINDS.filter(k => N[k] !== want[k]);
        diff.forEach(k => T.glow(k, true, 'g2x-wrong'));
        failWith(`Khay có ${got} khối, đơn hàng là ${m.value} khối!`,
          `Khay có ${numOf(N)}: <b>${got} khối</b>. Đơn hàng cần ${numOf(want)}.`,
          `${m.value} gồm ${want.h} trăm, ${want.t} chục, ${want.u} đơn vị${m.words ? ` (đọc là “${readNum(m.value)}”)` : ''}.`);
        return;
      }
      if (!m.words) { thanks(); return; }
      // Cấp 3: viết số của đơn hàng.
      speak(`Đúng hàng rồi! Đơn hàng ${readNum(m.value)} viết là số nào?`, null, `${cap(readNum(m.value))}: ${WANT('viết số')}!`);
      ask(row('📝', 'Viết số', `${Q}`, true), '', (v, pad) => {
        if (v === m.value) { pad.lock('g3g-keypad-ok'); thanks(); return; }
        pad.lock('g3g-keypad-bad');
        failWith(`Viết là ${m.value}, không phải ${v}!`, `“${cap(readNum(m.value))}” viết là <b>${m.value}</b>.`,
          `${want.h} trăm, ${want.t} chục, ${want.u} đơn vị: viết lần lượt ${want.h}, ${want.t}, ${want.u} thành ${m.value}.`);
      });
    };
  }

  // ════ Viết thành tổng ═════════════════════════════════════════════════════════════════════════
  function sumMission() {
    const N = split(m.value);
    const trayEl = addBox(box('g2x-trayhost'), trayNeed(N, KINDS));
    const T = makeTray(trayEl, N, { name: `<b>${m.value}</b> khối` });
    fit();
    const missK = KINDS.filter(k => N[k])[m.miss];
    const sumHtml = (fill) => m.parts.map((p, i) => (i === m.miss ? fill : `<b>${p}</b>`)).join(' + ');
    order.innerHTML = `<span class="g2x-order-ic">✏️</span> <b>${m.value}</b> = ${sumHtml(Q)}`;
    speak(`Viết số ${m.value} thành tổng các trăm, chục, đơn vị. Số còn thiếu là số nào?`, null, `${m.value} = ${sumHtml('?')}`);
    ask(row('✏️', `${m.value} =`, sumHtml(Q), true), '', async (v, pad) => {
      pad.lock();
      // Kiểm chứng: cột của số còn thiếu sáng lên, đếm từng miếng.
      T.glow(missK, true);
      let sum = 0;
      for (const pe of T.pieces(missK)) { sum += VAL[missK]; pe.classList.add('g2x-counted'); sfx.pop(sum / VAL[missK]); await sleep(260); }
      order.innerHTML = `<span class="g2x-order-ic">✏️</span> <b>${m.value}</b> = ${sumHtml(`<b class="g2x-ans">${sum}</b>`)}`;
      await sleep(300);
      if (v === sum) { pad.lock('g3g-keypad-ok'); thanks(); return; }
      pad.lock('g3g-keypad-bad');
      failWith(`Cột ${HEAD[missK].toLowerCase()} là ${sum}, không phải ${v}!`, `${N[missK]} ${PIECE_NAME[missK]} là <b>${sum}</b>: ${m.value} = ${m.parts.join(' + ')}.`,
        `${m.value} gồm ${N.h} trăm, ${N.t} chục, ${N.u} đơn vị: ${m.value} = ${m.parts.join(' + ')}.`);
    });
  }

  // ════ So sánh hai xe hàng ══════════════════════════════════════════════════════════════════════
  function cmpMission() {
    const A = split(m.a), B = split(m.b);
    const capN = { h: Math.max(A.h, B.h), t: Math.max(A.t, B.t), u: Math.max(A.u, B.u) };
    const aEl = addBox(box('g2x-trayhost'), trayNeed(capN, KINDS));
    const mid = addBox(box('g2x-mid', `<span class="g2x-sign" data-sign>${Q}</span>`), cellNeed(0, 0, 70, 70));
    const bEl = addBox(box('g2x-trayhost'), trayNeed(capN, KINDS));
    const TA = makeTray(aEl, A, { name: `🚚 Xe A: <b>${m.a}</b> khối`, cap: capN });
    const TB = makeTray(bEl, B, { name: `🚚 Xe B: <b>${m.b}</b> khối`, cap: capN });
    const signEl = mid.querySelector('[data-sign]');
    const pick = document.createElement('div');
    pick.className = 'g2x-pick';
    pick.innerHTML = ['>', '<', '='].map(sg => `<button type="button" class="g3g-btn g2x-sg" data-sg="${sg}">${sg}</button>`).join('');
    acts.appendChild(pick);
    fit();
    speak(`Xe A chở ${m.a} khối, xe B chở ${m.b} khối. ${cap(n.you)} chọn dấu lớn hơn, bé hơn hoặc bằng!`, null,
      `${WANT(m.a)} ${Q} ${WANT(m.b)}`);
    const real = m.a > m.b ? '>' : m.a < m.b ? '<' : '=';
    let locked = false;
    pick.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-sg]');
      if (!b || locked) return;
      locked = true;
      sfx.tap();
      const sg = b.dataset.sg;
      pick.querySelectorAll('[data-sg]').forEach(x => { x.disabled = true; x.classList.toggle('g2x-sg-on', x === b); });
      await sleep(flyOne(`<span class="g2x-flysign">${sg}</span>`, b.getBoundingClientRect(), signEl.getBoundingClientRect(), { minMs: 380, maxMs: 560 }));
      signEl.textContent = sg;
      // Máy so từng cột: trăm trước, bằng thì so chục, rồi đơn vị.
      let why = '';
      for (const k of KINDS) {
        TA.glow(k, true); TB.glow(k, true);
        sfx.pop(KINDS.indexOf(k) * 3);
        await sleep(calmMotion() ? 900 : 750);
        const x = A[k], y = B[k];
        const sgk = x > y ? '>' : x < y ? '<' : '=';
        const tagA = aEl.querySelector(`[data-col="${k}"] .g2x-head`), tagB = bEl.querySelector(`[data-col="${k}"] .g2x-head`);
        tagA.innerHTML = `${x} ${HEAD[k].toLowerCase()}`; tagB.innerHTML = `${y} ${HEAD[k].toLowerCase()}`;
        if (sgk !== '=') { why = `${x} ${HEAD[k].toLowerCase()} ${sgk} ${y} ${HEAD[k].toLowerCase()}`; (x > y ? TA : TB).glow(k, true, 'g2x-win'); break; }
        TA.glow(k, false); TB.glow(k, false);
        TA.glow(k, true, 'g2x-same'); TB.glow(k, true, 'g2x-same');
      }
      await sleep(400);
      if (sg === real) { thanks(); return; }
      signEl.classList.add('g2x-sign-bad');
      failWith(`${m.a} ${real} ${m.b} mới đúng!`, `<b>${m.a} ${real} ${m.b}</b>${why ? `: ${why}` : ': hai số bằng nhau'}.`,
        'So sánh hai số có ba chữ số: so hàng trăm trước; hàng trăm bằng nhau thì so hàng chục; hàng chục cũng bằng thì so hàng đơn vị.');
    });
  }

  // ════ Cộng, trừ trong phạm vi 1 000 ═════════════════════════════════════════════════════════════
  function calcMission() {
    const add = m.kind === 'add';
    const A = split(m.a), B = split(m.b);
    // Sức chứa: cộng thì khay trên nhận thêm tới 10 khối lẻ / 10 thanh (đóng ngay); trừ thì tháo 1 thanh thêm 10 khối.
    const capA = add ? { h: 9, t: 10, u: 10 } : { h: A.h, t: A.t + (A.t - (A.u < B.u ? 1 : 0) < B.t ? 10 : 0), u: A.u + (A.u < B.u ? 10 : 0) };
    const capB = { h: B.h, t: B.t, u: B.u };
    const aEl = addBox(box('g2x-trayhost'), trayNeed(capA, KINDS));
    const mid = addBox(box('g2x-mid', `<span class="g2x-sign g2x-sign-op">${add ? '+' : '−'}</span>`), cellNeed(0, 0, 44, 36));
    const bEl = addBox(box('g2x-trayhost'), trayNeed(capB, KINDS));
    const TA = makeTray(aEl, A, { name: add ? `Khay 1: <b>${m.a}</b> khối` : `Kho: <b>${m.a}</b> khối`, cap: capA });
    const TB = makeTray(bEl, add ? B : {}, { name: add ? `Khay 2: <b>${m.b}</b> khối` : `Khách lấy: <b>${m.b}</b> khối`, cap: capB });
    const nameA = aEl.querySelector('[data-name]');
    // Trừ: khay của khách hiện chỗ trống (nét đứt) đúng số miếng cần lấy.
    if (!add) KINDS.forEach(k => { TB.pile(k).innerHTML = Array.from({ length: B[k] }, () => pieceSvg(k, 'g2x-ghost')).join(''); });
    const go = button(add ? '📦 Gộp hàng' : '📦 Lấy hàng cho khách', 'g2x-go g2x-wait');
    fit();
    const sym = add ? '+' : '−';
    speak(add ? `Gộp ${m.a} khối và ${m.b} khối vào một khay. ${cap(n.you)} tính trước xem được bao nhiêu khối!`
      : `Kho có ${m.a} khối, khách lấy ${m.b} khối. ${cap(n.you)} tính trước xem kho còn bao nhiêu khối!`, null,
    `${WANT(`${m.a} ${sym} ${m.b}`)} = ?`);
    let typed = null, busy = false;
    go.onclick = async () => {
      if (typed === null) { speak(`${cap(n.you)} tính ở máy tính trước đã!`, null, 'Tính ở máy tính trước!'); nudge(); return; }
      if (busy) return;
      busy = true;
      go.disabled = true;
      go.classList.remove('g2x-ready');
      const got = add ? await merge() : await takeOut();
      nameA.innerHTML = `${add ? 'Gộp lại' : 'Kho còn'}: <b>${got}</b> khối`;
      await sleep(400);
      if (typed === got) { order.innerHTML = `🧮 ${m.a} ${sym} ${m.b} = <b class="g2x-ans">${typed}</b> ✓`; thanks(); return; }
      order.innerHTML = `🧮 ${m.a} ${sym} ${m.b} = <b class="g2x-typed">${typed}</b> ✗`;
      failWith(`Được ${got} khối, không phải ${typed}!`, `${m.a} ${sym} ${m.b} = <b>${got}</b>.`, tipText());
    };
    ask(row('🧮', `${m.a} ${sym} ${m.b} =`, Q, true), 'khối', (v) => {
      // Cất máy tính (điện thoại dọc: nhường chỗ cho hai khay), số em tính ghi lên dòng đơn hàng.
      rest();
      typed = v;
      order.innerHTML = `🧮 ${m.a} ${sym} ${m.b} = <b>${v}</b>`;
      go.classList.remove('g2x-wait');
      go.classList.add('g2x-ready');
      speak(add ? 'Bấm gộp hàng để kiểm tra!' : 'Bấm lấy hàng để kiểm tra!', null, add ? 'Bấm 📦 Gộp hàng!' : 'Bấm 📦 Lấy hàng!');
    });

    function tipText() {
      const cu = A.u + B.u >= 10, ct = A.t + B.t + (cu ? 1 : 0) >= 10;
      if (add) {
        if (cu) return `${A.u} + ${B.u} = ${A.u + B.u} khối lẻ: đóng 10 khối thành 1 thanh chục (viết ${(A.u + B.u) % 10}, nhớ 1 sang hàng chục).`;
        if (ct) return `${A.t} + ${B.t} = ${A.t + B.t} thanh chục: ép 10 thanh thành 1 tấm trăm (viết ${(A.t + B.t) % 10}, nhớ 1 sang hàng trăm).`;
        return 'Cộng lần lượt: đơn vị với đơn vị, chục với chục, trăm với trăm.';
      }
      if (A.u < B.u) return `${A.u} khối lẻ không đủ lấy ${B.u}: tháo 1 thanh chục thành 10 khối lẻ (${A.u + 10} − ${B.u} = ${A.u + 10 - B.u}), hàng chục còn bớt 1.`;
      if (A.t < B.t) return `${A.t} thanh chục không đủ lấy ${B.t}: tháo 1 tấm trăm thành 10 thanh chục (${A.t + 10} − ${B.t} = ${A.t + 10 - B.t}), hàng trăm còn bớt 1.`;
      return 'Trừ lần lượt: đơn vị trừ đơn vị, chục trừ chục, trăm trừ trăm.';
    }

    /** Gộp khay 2 vào khay 1, cột đơn vị trước; đủ 10 thì đóng ngay thành 1 miếng cột bên trái (nhớ 1). */
    async function merge() {
      for (const [k, up] of [['u', 't'], ['t', 'h'], ['h', null]]) {
        const cnt = TB.n[k];
        if (!cnt) continue;
        TA.glow(k, true); TB.glow(k, true);
        for (let i = 0; i < cnt; i++) {
          const pe = TB.pieces(k).slice(-1)[0];
          const r = pe.getBoundingClientRect();
          TB.n[k]--; TB.draw(k);
          TA.n[k]++; TA.draw(k, 1);
          const dst = TA.pieces(k).slice(-1)[0];
          await sleep(flyOne(flyPiece(k), r, dst.getBoundingClientRect(), { minMs: 320, maxMs: 520, onLand: () => { dst.classList.remove('g2x-hide'); sfx.pop(i); } }) + 40);
          if (up && TA.n[k] === 10) await pack(k, up);
        }
        TA.glow(k, false); TB.glow(k, false);
      }
      return total(TA.n);
    }
    /** 10 miếng cột k trong khay 1 bay gộp thành 1 miếng cột `up` — "nhớ 1". */
    async function pack(k, up) {
      await sleep(250);
      const els = TA.pieces(k);
      els.forEach(e => e.classList.add('g2x-counted'));
      speak(`Đủ 10 ${PIECE_NAME[k]}, đóng thành 1 ${PIECE_NAME[up]}!`, null, `Đủ 10 ${PIECE_NAME[k]}: ${WANT(`nhớ 1`)}!`);
      await sleep(500);
      const to = TA.pile(up).getBoundingClientRect();
      const target = { left: to.left + to.width / 2 - 10, top: to.top, width: 20, height: 20 };
      TA.take(k, 10, target, { gap: 40 });
      await sleep(650);
      await sleep(TA.add(up, target, 1) + 150);
      const tag = document.createElement('span');
      tag.className = 'g2x-carry';
      tag.textContent = 'nhớ 1';
      TA.el.querySelector(`[data-col="${up}"]`).appendChild(tag);
    }
    /** Lấy hàng cho khách, cột đơn vị trước; không đủ thì tháo 1 miếng cột bên trái thành 10 miếng. */
    async function takeOut() {
      for (const [k, up] of [['u', 't'], ['t', 'h'], ['h', null]]) {
        const cnt = B[k];
        if (!cnt) continue;
        TA.glow(k, true); TB.glow(k, true);
        if (up && TA.n[k] < cnt) await unpack(k, up);
        const ghosts = TB.pieces(k);
        for (let i = 0; i < cnt; i++) {
          const pe = TA.pieces(k).slice(-1)[0];
          const r = pe.getBoundingClientRect();
          TA.n[k]--; TA.draw(k);
          const g = ghosts[i];
          await sleep(flyOne(flyPiece(k), r, g.getBoundingClientRect(), { minMs: 320, maxMs: 520, onLand: () => { g.classList.remove('g2x-ghost'); sfx.pop(i); } }) + 40);
        }
        TA.glow(k, false); TB.glow(k, false);
      }
      return total(TA.n);
    }
    async function unpack(k, up) {
      speak(`Không đủ ${PIECE_NAME[k]}! Tháo 1 ${PIECE_NAME[up]} thành 10 ${PIECE_NAME[k]}.`, null, `Tháo 1 ${PIECE_NAME[up]} thành ${WANT(`10 ${PIECE_NAME[k]}`)}!`);
      await sleep(600);
      const from = TA.pieces(up).slice(-1)[0].getBoundingClientRect();
      TA.take(up, 1, null);
      const tag = document.createElement('span');
      tag.className = 'g2x-carry';
      tag.textContent = 'tháo 1';
      TA.el.querySelector(`[data-col="${up}"]`).appendChild(tag);
      await sleep(TA.add(k, from, 10, { gap: 50 }) + 200);
    }
  }
}

/** Trộn cố định theo seed (vị trí khối trong thùng không đổi khi vẽ lại). */
function shuffleSeeded(arr, seed) {
  const a = [...arr];
  let x = seed >>> 0 || 1;
  for (let i = a.length - 1; i > 0; i--) {
    x = (x * 1103515245 + 12345) >>> 0;
    const j = x % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
