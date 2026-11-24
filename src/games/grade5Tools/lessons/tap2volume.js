/**
 * Chủ đề 8 + 9 (Toán 5 Tập Hai): Bài 45–47 thể tích, cm³ dm³ m³; Bài 49–53 hình khai triển, diện tích xung quanh, toàn phần, thể tích.
 *   🧊 cubes.js: xếp hình lập phương (đếm cả lớp phía sau, tách lớp, xếp vào hộp kính, khối 1 dm³ kẻ lưới 1 000 ô).
 *   🪜 units.js (kind 'cube'): bảng đơn vị thể tích, mỗi đơn vị ba ô, bậc gấp 1 000.
 *   📦 net.js: gấp, mở hình khai triển; trải bốn mặt bên thành một hình chữ nhật; mặt bỏ đi (bể không nắp).
 * Nguồn: SGK Toán 5 Tập Hai trang 30–57 (docs/lop_5/kien-thuc-toan5-tap2.md). Số trong câu do máy sinh; phương án
 * nhiễu là lỗi hay gặp (thiếu chữ số 0 khi đổi, cm² thay cm³, quên đáy, thừa nắp, cạnh × 4 thay cạnh × cạnh × 4).
 * VOLUME_DRILL_LEVELS: các cấp Luyện Tính lớp 5 ghép từ các dạng câu này.
 */

import { createCubes } from '../cubes.js';
import { createNet, boxNet, cubeNet, cylNet, clashes, oppositeFace, NET_COLORS } from '../net.js';
import { createUnits, unitIdx } from '../units.js';
import { shiftStr, prettyDec } from '../shift.js';
import { BOX } from '../../grade4Tools/practice.js';
import { css } from '../../grade4Tools/frame.js';
import { sleep } from '../../grade3Drills/kit.js';
import { anim } from '../../grade4Tools/canvas.js';
import { dec, decKey, clean, fmt, readDec, readVN } from '../num.js';

/** Chờ em thao tác (c.until); DEV: window.__g5solve làm thay để chạy tự động. */
async function waitDo(c, t, pred, opts, solve) {
  if (import.meta.env.DEV) window.__g5solve = () => { window.__g5solve = null; solve(); };
  try { await c.until(t, pred, opts); } finally { if (import.meta.env.DEV) window.__g5solve = null; }
}
/** Chờ em bấm vào hình n của tấm xếp hình lập phương. */
async function waitTap(c, t, n, nudge) {
  let hit = false;
  const off = t.on((ev, o) => { if (ev === 'tap' && o === n) hit = true; });
  const el = t.obj(n).el;
  el.classList.add('g5c-tapme');
  try { await waitDo(c, t, () => hit, { nudge, el: () => el }, () => t.emit('tap', n)); } finally { off(); el.classList.remove('g5c-tapme'); }
}
const mark = (id) => { if (import.meta.env.DEV) window.__g5sh = { task: id }; };

/** Số hiện ("1 234,5") và đáp án cho ô gõ (số nguyên hoặc chuỗi "3,25"). */
const D = (x) => dec(clean(x));
const A = (x) => { const v = clean(x); return Number.isInteger(v) ? v : decKey(v); };
const US = { 'cm³': 'xăng-ti-mét khối', 'dm³': 'đề-xi-mét khối', 'm³': 'mét khối', 'cm²': 'xăng-ti-mét vuông', 'dm²': 'đề-xi-mét vuông', 'm²': 'mét vuông', cm: 'xăng-ti-mét', dm: 'đề-xi-mét', m: 'mét' };
const sq = (u) => `${u}²`, cu = (u) => `${u}³`;
/** Trộn cố định theo hạt (mount không có rng). */
function shuffleBy(arr, seed) {
  const a = [...arr];
  let s = Math.abs(Math.round(seed * 1000)) * 9301 + 49297;
  for (let i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const uniq = (arr) => [...new Map(arr.map(o => [o.value, o])).values()];
const opts = (list, seed) => shuffleBy(uniq(list.map(v => ({ html: v, value: v }))), seed);

/** Dòng phép tính (sau khi em làm đúng) trong vùng chừa sẵn t.stepBox. */
async function showSteps(t, lines) {
  const b = t.stepBox || { x: 40, y: 30, w: t.W - 80, h: t.H - 60 };
  const long = Math.max(...lines.map(l => l.replace(/<[^>]+>/g, '').length));
  const size = Math.min(56, b.w / (long * 0.46), b.h / (lines.length * 1.35));
  const y = b.y + (b.h - size * 1.35 * (lines.length - 1)) / 2 + size * 0.35;
  await t.lines(b.x + b.w / 2, y, lines, { size, anchor: 'middle', ms: 250 });
}

// ── Đổi đơn vị thể tích (bậc gấp 1 000) ──────────────────────────────────────────────────────────────
const VU = ['m³', 'dm³', 'cm³'];
const vi = (u) => VU.indexOf(u);
/** Số đo "3,9" đơn vị u → chuỗi theo đơn vị to. */
const convV = (s, u, to) => shiftStr(String(s), (vi(to) - vi(u)) * 3);
/** Nhiều phần [[5, 'dm³'], [6, 'cm³']] → chuỗi theo đơn vị to. */
function convParts(ps, to) {
  const lo = Math.max(vi(to), ...ps.map(([, u]) => vi(u)));
  let n = 0n;
  for (const [v, u] of ps) n += BigInt(v) * 1000n ** BigInt(lo - vi(u));
  return shiftStr(n.toString(), (vi(to) - lo) * 3);
}
/** Đáp án cho ô gõ từ chuỗi số thập phân "8,7" / "5006". */
const ansStr = (s) => (s.includes(',') ? s : +s);

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Bài 45. Thể tích của một hình
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
const B45 = {
  explore: {
    setup: (board) => createCubes(board),
    steps: [
      async (c) => {
        const t = c.t;
        t.set([{ cells: [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]], color: 'green', label: 'A', hidden: true }, { dims: [4, 1, 1], color: 'yellow', label: 'B', hidden: true }]);
        t.caption('Hai hình xếp từ các <b>hình lập phương như nhau</b>');
        await c.say('Rô-bốt có các hình lập phương nhỏ giống hệt nhau. Bấm vào chỗ hình A để xếp hình A.', 'Bấm vào hình <b>A</b>');
        await waitTap(c, t, 0, 'Bấm vào chữ A.');
        await t.reveal(0, { count: (n) => t.caption(`Hình A: <b>${n}</b> hình lập phương`) });
        await c.say('Bấm vào chỗ hình B để xếp hình B.', 'Bấm vào hình <b>B</b>');
        await waitTap(c, t, 1, 'Bấm vào chữ B.');
        await t.reveal(1, { count: (n) => t.caption(`Hình B: <b>${n}</b> hình lập phương`) });
        await c.say('Hình A cao hơn, hình B dài hơn. Thể tích hai hình so với nhau thế nào?');
        await c.choose([{ html: 'A lớn hơn', value: 'A' }, { html: 'B lớn hơn', value: 'B' }, { html: 'Bằng nhau', value: '=' }], '=', { hint: 'Đếm số hình lập phương của mỗi hình.' });
        t.caption('A và B đều gồm <b>4</b> hình: thể tích A <b>bằng</b> thể tích B');
        await c.say('Đúng rồi! Mỗi hình đều gồm 4 hình lập phương như nhau. Ta nói: thể tích hình A bằng thể tích hình B.');
      },
      async (c) => {
        const t = c.use((b) => createCubes(b));
        t.set([{ dims: [4, 1, 2], color: (i) => (i < 3 ? 'blue' : 'pink'), label: 'P' }], { maxS: 110 });
        t.caption('Hình <b>P</b> gồm <b>8</b> hình lập phương');
        await c.say('Hình P gồm 8 hình lập phương. Ta tách hình P thành hai hình.', 'Bấm <b>Tách</b>');
        await c.choose([{ html: '✂️ Tách hình P', value: 1 }], 1);
        await t.shift(0, (i) => i === 3, 1.2);
        t.caption('Hình <b>M</b>: 6 hình · Hình <b>N</b>: 2 hình');
        await c.say('Được hình M gồm 6 hình lập phương và hình N gồm 2 hình lập phương. 6 cộng 2 bằng 8.');
        t.caption('Thể tích P = thể tích M + thể tích N');
        await c.say('Ta nói: thể tích hình P bằng tổng thể tích các hình M và N.');
      },
      async (c) => {
        const t = c.use((b) => createCubes(b));
        t.set([{ dims: [4, 2, 2], color: 'green', label: 'A' }, { dims: [3, 2, 3], color: 'orange', label: 'B' }], { liftRoom: 0.5 });
        t.caption('Hình nào có thể tích <b>lớn hơn</b>?');
        await c.say('Mặt trước hình A có 8 hình, mặt trước hình B có 9 hình. Hình nào có thể tích lớn hơn?');
        const first = await c.choose([{ html: 'Hình A', value: 'A' }, { html: 'Hình B', value: 'B' }], 'B', { hint: 'Đừng chỉ đếm mặt trước. Mỗi hình có cả lớp phía sau.' });
        await Promise.all([t.lift(0, 0.5), t.lift(1, 0.5)]);
        t.caption('A: 2 lớp × 8 = <b>16</b> hình · B: 3 lớp × 6 = <b>18</b> hình');
        await c.say(`${first ? 'Đúng rồi!' : 'Xem kĩ các lớp.'} Tách các lớp ra để thấy cả phía sau. Hình A có 16 hình, hình B có 18 hình. Thể tích hình B lớn hơn.`);
        await Promise.all([t.lift(0, 0), t.lift(1, 0)]);
      },
      async (c) => {
        const t = c.use((b) => createCubes(b));
        t.set([{ dims: [2, 2, 2], minus: [[1, 1, 0]], color: 'blue', label: 'D' }], { liftRoom: 0.6, maxS: 130 });
        t.caption('Hình <b>D</b> gồm bao nhiêu hình lập phương?');
        await c.say('Hình D là một khối bị khuyết. Hình D gồm bao nhiêu hình lập phương?');
        await c.choose([6, 7, 8].map(v => ({ html: String(v), value: v })), 7, { hint: 'Khối đủ có 2 lớp, mỗi lớp 4 hình. Ở góc trên bị thiếu một hình.' });
        await t.lift(0, 0.6);
        t.caption('Lớp dưới <b>4</b>, lớp trên <b>3</b>: tất cả <b>7</b> hình');
        await c.say('Tách lớp ra: lớp dưới 4 hình, lớp trên 3 hình. Hình D gồm 7 hình lập phương.');
      },
    ],
  },
  tasks: () => [taskCount45(), taskMiss45(), taskCompare45(), taskSplit45(), taskMore45()],
};

function smallBox(rng, { min = 6, max = 24 } = {}) {
  for (;;) {
    const a = rng.int(2, 4), b = rng.int(1, 3), c = rng.int(1, 3);
    const v = a * b * c;
    if (v >= min && v <= max && (b > 1 || c > 1)) return [a, b, c];
  }
}
const COLS = ['blue', 'green', 'yellow', 'orange', 'pink'];

function taskCount45() {
  return {
    id: 'v45count',
    make: (rng) => ({ d: smallBox(rng), col: rng.pick(COLS) }),
    async mount(f, { d: [a, b, c], col }) {
      mark('v45count');
      f.q.innerHTML = `Hình gồm ${BOX} hình lập phương nhỏ.`;
      const t = createCubes(f.tool);
      t.set([{ dims: [a, b, c], color: col }], { liftRoom: 0.5 });
      let lifted = false;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: a * b * c, max: 3, say: 'Hình này gồm bao nhiêu hình lập phương nhỏ?',
        hint: (v) => {
          if (!lifted) { lifted = true; t.lift(0, 0.5); }
          return v === a * c ? 'Em mới đếm mặt trước. Còn các hình ở phía sau.' : `Mỗi lớp có ${a} × ${b} hình. Đếm số lớp.`;
        } });
      if (!lifted) await t.lift(0, 0.5);
      t.caption(`${c} lớp, mỗi lớp ${a * b} hình: <b>${a * b * c}</b> hình`);
      f.finish({ ok: `Mỗi lớp ${a * b} hình, ${c} lớp: ${a * b * c} hình lập phương.` });
    },
  };
}

function taskMiss45() {
  return {
    id: 'v45miss',
    make: (rng) => { const [a, b] = [rng.int(2, 4), rng.int(2, 3)]; const c = rng.int(2, 3); return { a, b, c, k: rng.int(1, Math.min(2, a - 1)), col: rng.pick(COLS) }; },
    async mount(f, { a, b, c, k, col }) {
      mark('v45miss');
      const minus = Array.from({ length: k }, (_, q) => [a - 1 - q, c - 1, 0]);
      const n = a * b * c - k;
      f.q.innerHTML = `Hình bị khuyết gồm ${BOX} hình lập phương.`;
      const t = createCubes(f.tool);
      t.set([{ dims: [a, b, c], minus, color: col }], { liftRoom: 0.5 });
      let lifted = false;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: n, max: 3, say: 'Hình bị khuyết này gồm bao nhiêu hình lập phương?',
        hint: (v) => {
          if (!lifted) { lifted = true; t.lift(0, 0.5); }
          return v === a * b * c ? `Có ${k} chỗ bị khuyết ở lớp trên cùng.` : 'Đếm từng lớp, lớp nào thiếu thì trừ đi.';
        } });
      if (!lifted) await t.lift(0, 0.5);
      t.caption(`Khối đủ ${a * b * c} hình, khuyết ${k}: <b>${n}</b> hình`);
      f.finish({ ok: `${a * b * c} − ${k} = ${n} hình lập phương.` });
    },
  };
}

function taskCompare45() {
  return {
    id: 'v45cmp',
    make: (rng) => {
      for (;;) {
        const p = smallBox(rng, { min: 6, max: 20 }), q = smallBox(rng, { min: 6, max: 20 });
        const vp = p[0] * p[1] * p[2], vq = q[0] * q[1] * q[2];
        const fp = p[0] * p[2], fq = q[0] * q[2]; // ô mặt trước
        const eq = rng() < 0.25;
        if (eq ? vp === vq && p.join() !== q.join() : vp !== vq && (fp - fq) * (vp - vq) <= 0) return { p, q };
      }
    },
    async mount(f, { p, q }) {
      mark('v45cmp');
      const vp = p[0] * p[1] * p[2], vq = q[0] * q[1] * q[2];
      const ans = vp > vq ? 'A' : vp < vq ? 'B' : '=';
      f.q.innerHTML = 'So sánh thể tích hình A và hình B.';
      const t = createCubes(f.tool);
      t.set([{ dims: p, color: 'green', label: 'A' }, { dims: q, color: 'orange', label: 'B' }], { liftRoom: 0.5 });
      let lifted = false;
      await f.choose({ options: [{ html: 'A lớn hơn', value: 'A' }, { html: 'B lớn hơn', value: 'B' }, { html: 'Bằng nhau', value: '=' }], answer: ans,
        say: 'Hình nào có thể tích lớn hơn?',
        hint: () => { if (!lifted) { lifted = true; t.lift(0, 0.5); t.lift(1, 0.5); } return 'Đếm cả các lớp phía sau, không chỉ mặt trước.'; } });
      if (!lifted) await Promise.all([t.lift(0, 0.5), t.lift(1, 0.5)]);
      t.caption(`A: <b>${vp}</b> hình · B: <b>${vq}</b> hình`);
      f.finish({ ok: ans === '=' ? `A và B đều ${vp} hình: thể tích bằng nhau.` : `A có ${vp} hình, B có ${vq} hình: thể tích ${ans} lớn hơn.` });
    },
  };
}

function taskSplit45() {
  return {
    id: 'v45split',
    make: (rng) => { const a = rng.int(3, 5), b = rng.int(1, 2), c = rng.int(1, 3); return { a, b, c, m: rng.int(1, a - 1) }; },
    async mount(f, { a, b, c, m }) {
      mark('v45split');
      const nM = m * b * c, nN = (a - m) * b * c;
      f.q.innerHTML = `Ghép hình M và hình N được hình P. Hình P gồm ${BOX} hình lập phương.`;
      const t = createCubes(f.tool);
      t.set([{ dims: [a, b, c], color: (i) => (i < m ? 'blue' : 'pink') }], { maxS: 100 });
      await t.shift(0, (i) => i >= m, 1.2);
      t.caption(`Hình <b>M</b> (xanh) và hình <b>N</b> (hồng)`);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: nM + nN, max: 3, say: 'Ghép hình M và hình N được hình P. Hình P gồm bao nhiêu hình lập phương?',
        hint: 'Đếm hình M, đếm hình N, rồi cộng lại.' });
      await t.shift(0, (i) => i >= m, 0);
      t.caption(`P = M + N: ${nM} + ${nN} = <b>${nM + nN}</b> hình`);
      f.finish({ ok: `Thể tích P bằng tổng thể tích M và N: ${nM} + ${nN} = ${nM + nN}.` });
    },
  };
}

function taskMore45() {
  return {
    id: 'v45more',
    make: (rng) => { for (;;) { const p = smallBox(rng, { min: 4, max: 18 }), q = smallBox(rng, { min: 8, max: 24 }); if (q[0] * q[1] * q[2] > p[0] * p[1] * p[2]) return { p, q }; } },
    async mount(f, { p, q }) {
      mark('v45more');
      const vp = p[0] * p[1] * p[2], vq = q[0] * q[1] * q[2];
      f.q.innerHTML = `Hình B nhiều hơn hình A ${BOX} hình lập phương.`;
      const t = createCubes(f.tool);
      t.set([{ dims: p, color: 'yellow', label: 'A' }, { dims: q, color: 'blue', label: 'B' }], { liftRoom: 0.5 });
      let lifted = false;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: vq - vp, max: 3, say: 'Hình B nhiều hơn hình A bao nhiêu hình lập phương?',
        hint: () => { if (!lifted) { lifted = true; t.lift(0, 0.5); t.lift(1, 0.5); } return 'Đếm số hình của mỗi hình (cả phía sau), rồi lấy số lớn trừ số bé.'; } });
      if (!lifted) await Promise.all([t.lift(0, 0.5), t.lift(1, 0.5)]);
      t.caption(`B: ${vq} hình · A: ${vp} hình · ${vq} − ${vp} = <b>${vq - vp}</b>`);
      f.finish({ ok: `${vq} − ${vp} = ${vq - vp} hình lập phương.` });
    },
  };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Bài 46. Xăng-ti-mét khối. Đề-xi-mét khối
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
/** Chờ em thả một thẻ / chọn đơn vị trên bảng đơn vị (như Bài 12). */
async function unitsDrop(c, t, i) {
  t.only([]);
  await waitDo(c, t, () => t.dropped(i), { nudge: 'Bấm vào thẻ số đo màu cam.', el: () => t.chip(i) }, () => t.drop(i));
  await t.drop(i, { quiet: true });
  await sleep(300);
}
async function unitsTarget(c, t, u, say) {
  const k = unitIdx('cube', u);
  t.only([k]); t.glow(k);
  if (say) await c.say(say[0], say[1]);
  await waitDo(c, t, () => t.target === k, { nudge: `Bấm vào chữ ${u} ở hàng tên đơn vị.`, el: () => t.head(k) }, () => t.setTarget(k));
  t.glow(null);
  if (t.target !== k) await t.setTarget(k, { quiet: true });
}
const partsV = (ps) => ps.map(([v, u]) => ({ u: unitIdx('cube', u), v }));

const B46 = {
  explore: {
    setup: (board) => createCubes(board),
    steps: [
      async (c) => {
        const t = c.t;
        t.set([{ dims: [1, 1, 1], color: 'yellow', labels: { a: '1 cm', b: '1 cm', c: '1 cm' } }], { maxS: 170 });
        t.caption('Hình lập phương cạnh <b>1 cm</b>');
        await c.say('Muốn so sánh thể tích, ta dùng cùng một đơn vị đo thể tích. Đây là hình lập phương cạnh 1 xăng-ti-mét.');
        t.caption('Thể tích của nó là <b>1 xăng-ti-mét khối</b>, viết <b>1 cm³</b>');
        await c.say('Thể tích của hình lập phương cạnh 1 xăng-ti-mét là 1 xăng-ti-mét khối, viết tắt là 1 cm³.', 'Xăng-ti-mét khối viết là <b>cm³</b>');
      },
      async (c) => {
        const t = c.use((b) => createCubes(b));
        t.set([{ dims: [4, 2, 2], color: 'blue', hidden: true }], { maxS: 100 });
        t.caption('Việt xếp các hình lập phương <b>1 cm³</b>');
        await c.say('Việt xếp các hình lập phương 1 xăng-ti-mét khối thành một hình hộp. Bấm vào chỗ trống để xếp.', 'Bấm vào chỗ trống để <b>xếp</b>');
        await waitTap(c, t, 0, 'Bấm vào khung hình.');
        await t.reveal(0, { by: 'row', count: (n) => t.caption(`Đã xếp <b>${n}</b> hình lập phương 1 cm³`) });
        await c.say('Hình hộp này có thể tích bao nhiêu?');
        await c.choose(['8 cm³', '16 cm³', '16 cm²'].map(v => ({ html: v, value: v })), '16 cm³', { hint: (v) => (v === '8 cm³' ? 'Còn lớp phía trên nữa.' : 'Thể tích dùng đơn vị khối: cm³.') });
        t.caption('Thể tích hình hộp là <b>16 cm³</b>');
        await c.say('Hình gồm 16 hình lập phương 1 xăng-ti-mét khối. Thể tích là 16 xăng-ti-mét khối.');
      },
      async (c) => {
        const t = c.use((b) => createCubes(b));
        t.set([{ dims: [10, 10, 1], color: 'yellow', hidden: true, labels: { a: '10 cm', b: '10 cm' } }], { maxS: 60 });
        t.caption('Một lớp: 10 hàng, mỗi hàng 10 hình <b>1 cm³</b>');
        await c.say('Hình lập phương cạnh 1 đề-xi-mét, tức 10 xăng-ti-mét. Xếp một lớp ở đáy trước. Bấm để xếp.', 'Bấm để xếp <b>lớp đáy</b>');
        await waitTap(c, t, 0, 'Bấm vào khung hình.');
        await t.reveal(0, { by: 'row', count: (n) => t.caption(`Lớp đáy: <b>${n}</b> hình 1 cm³`) });
        await c.say('Lớp đáy có 10 hàng, mỗi hàng 10 hình: 100 hình. Xếp cao 10 lớp như thế thì được bao nhiêu hình?');
        await c.choose([{ html: '100', value: 100 }, { html: '1 000', value: 1000 }, { html: '10 000', value: 10000 }], 1000, { hint: '10 lớp, mỗi lớp 100 hình: 100 × 10.' });
        c.use((b) => createCubes(b)).set([{ solid: { a: 1, b: 1, c: 1, n: 10, mini: true }, color: 'yellow', labels: { a: '1 dm', b: '1 dm', c: '1 dm' } }], { maxS: 300 });
        c.t.caption('<b>1 dm³ = 1 000 cm³</b> · ô đỏ là 1 cm³');
        await c.say('Hình lập phương cạnh 1 đề-xi-mét có thể tích 1 đề-xi-mét khối, gồm 1 000 hình lập phương 1 xăng-ti-mét khối. 1 đề-xi-mét khối bằng 1 000 xăng-ti-mét khối.', '<b>1 dm³ = 1 000 cm³</b>');
      },
      async (c) => {
        const t = c.use((b) => createUnits(b, { kind: 'cube', from: 1, to: 2 }));
        t.setParts(partsV([[5, 'dm³'], [6, 'cm³']]));
        t.read('Mỗi đơn vị <b>3 ô</b> chữ số');
        await c.say('Bảng đơn vị thể tích: mỗi đơn vị có ba ô chữ số, vì đơn vị liền trước gấp 1 000 lần đơn vị liền sau. Đổi 5 đề-xi-mét khối 6 xăng-ti-mét khối. Bấm hai thẻ.', 'Đổi <b>5 dm³ 6 cm³</b>. Bấm hai thẻ.');
        await unitsDrop(c, t, 0);
        await unitsDrop(c, t, 1);
        await c.say('5 đề-xi-mét khối 6 xăng-ti-mét khối bằng bao nhiêu xăng-ti-mét khối?', '5 dm³ 6 cm³ = ? cm³');
        await c.choose(['56 cm³', '5 600 cm³', '5 006 cm³'].map(v => ({ html: v, value: v })), '5 006 cm³', { hint: 'Hai ô trống giữa chữ số 5 và chữ số 6 phải viết 0.' });
        await t.fillZeros();
        await t.setTarget(unitIdx('cube', 'cm³'), { quiet: true });
        t.read('5 dm³ 6 cm³ = <b>5 006 cm³</b>');
        await c.say('Hai ô trống viết hai chữ số 0. 5 đề-xi-mét khối 6 xăng-ti-mét khối bằng 5 006 xăng-ti-mét khối.');
      },
      async (c) => {
        const t = c.use((b) => createUnits(b, { kind: 'cube', from: 1, to: 2 }));
        t.setParts(partsV([[8700, 'cm³']]));
        await c.say('Đổi 8 700 xăng-ti-mét khối ra đề-xi-mét khối. Bấm thẻ.', 'Đổi <b>8 700 cm³</b> ra dm³. Bấm thẻ.');
        await unitsDrop(c, t, 0);
        await unitsTarget(c, t, 'dm³', ['Dấu phẩy đứng ngay sau ô đề-xi-mét khối. Bấm chữ dm³.', 'Bấm chữ <b>dm³</b>.']);
        t.read('8 700 cm³ = <b>8,7 dm³</b>');
        await c.say('8 700 xăng-ti-mét khối bằng 8 phẩy 7 đề-xi-mét khối. Hai chữ số 0 ở cuối phần thập phân bỏ đi.');
      },
    ],
  },
  tasks: () => [taskCount46(), taskConv46(), taskRead46(), taskCalc46(), taskObj46(), taskTray46()],
};

function taskCount46() {
  return {
    id: 'v46count',
    make: (rng) => ({ d: [rng.int(2, 5), rng.int(2, 3), rng.int(1, 3)], col: rng.pick(COLS) }),
    async mount(f, { d: [a, b, c], col }) {
      mark('v46count');
      f.q.innerHTML = `Mỗi hình lập phương nhỏ là 1 cm³. Thể tích hình là ${BOX} cm³.`;
      const t = createCubes(f.tool);
      t.set([{ dims: [a, b, c], color: col }], { liftRoom: 0.5 });
      let lifted = false;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: a * b * c, max: 3, say: 'Mỗi hình lập phương nhỏ là 1 xăng-ti-mét khối. Thể tích của hình là bao nhiêu?',
        hint: (v) => { if (!lifted) { lifted = true; t.lift(0, 0.5); } return v === a * c ? 'Em mới đếm mặt trước. Còn các hình phía sau.' : `Mỗi lớp ${a} × ${b} hình, có ${c} lớp.`; } });
      if (!lifted) await t.lift(0, 0.5);
      t.caption(`${a} × ${b} × ${c} = <b>${a * b * c} cm³</b>`);
      f.finish({ ok: `Thể tích là ${a * b * c} cm³.` });
    },
  };
}

/** Câu đổi đơn vị thể tích có bảng đơn vị (dùng chung Bài 46, 47). from/to: chỉ số đơn vị hiện trên bảng. */
async function convMount(f, { parts, dec: dstr, src, to, range, name = '' }) {
  const ans = parts ? convParts(parts, to) : convV(dstr, src, to);
  const left = parts ? parts.map(([v, u]) => `${fmt(v)} ${u}`).join(' ') : `${prettyDec(dstr)} ${src}`;
  const leftSay = parts ? parts.map(([v, u]) => `${readVN(v)} ${US[u]}`).join(' ') : `${readDec(dstr)} ${US[src]}`;
  f.q.innerHTML = `${name}${left} = ${BOX} ${to}`;
  const t = createUnits(f.tool, { kind: 'cube', from: range[0], to: range[1], top: false });
  let shown = false;
  const play = async () => {
    if (parts) await t.play(partsV(parts), unitIdx('cube', to));
    else { t.setDecimal(String(dstr), unitIdx('cube', src)); await sleep(300); await t.setTarget(unitIdx('cube', to), { quiet: true }); }
  };
  const cap = leftSay[0].toUpperCase() + leftSay.slice(1);
  await f.ask({ box: f.q.querySelector('.g4-box'), answer: ansStr(ans), max: ans.length + 2, say: `${cap}. Viết theo ${US[to]}.`,
    hint: (v) => {
      if (!shown) { shown = true; play(); }
      const dir = Math.sign(vi(to) - vi(parts ? parts[0][1] : src));
      const wrongK = !parts && [1, 2].some(p => Math.abs(v - +shiftStr(String(dstr), dir * p).replace(',', '.')) < 1e-9);
      return wrongK ? 'Mỗi bậc đơn vị thể tích gấp 1 000 lần, mỗi đơn vị ba ô chữ số.' : 'Mỗi đơn vị ba ô. Ô trống viết 0, dấu phẩy ngay sau ô của đơn vị cần viết.';
    } });
  if (!shown) await play();
  t.read(`${left} = <b>${prettyDec(ans)} ${to}</b>`);
  f.finish({ ok: `${left} = ${prettyDec(ans)} ${to}` });
}

function taskConv46() {
  return {
    id: 'v46conv',
    make: (rng) => {
      const k = rng.int(0, 4);
      if (k === 0) return { k, s: String(rng.int(2, 15)) }; // dm³ → cm³
      if (k === 1) return { k, s: `${rng.int(0, 9)},${rng.pick([rng.int(1, 9), rng.int(1, 9) * 10 + rng.int(1, 9), rng.int(1, 9) * 100 + rng.int(0, 99)])}`.replace(/(,\d*?)0+$/, '$1') }; // dm³ thập phân → cm³
      if (k === 2) return { k, s: String(rng.pick([rng.int(1, 9) * 100, rng.int(11, 99) * 100, rng.int(1, 9) * 1000 + rng.int(1, 9) * 100, rng.int(1, 9) * 10])) }; // cm³ → dm³
      if (k === 3) return { k, p: [rng.int(1, 9), rng.pick([rng.int(1, 9), rng.int(10, 99), rng.int(100, 999)])] }; // a dm³ b cm³ → cm³
      return { k, s: String(rng.int(2, 9) * 1000) };
    },
    async mount(f, { k, s, p }) {
      mark('v46conv');
      const range = [1, 2];
      if (k === 0 || k === 1) await convMount(f, { dec: s.replace(/,$/, ''), src: 'dm³', to: 'cm³', range });
      else if (k === 2 || k === 4) await convMount(f, { dec: s, src: 'cm³', to: 'dm³', range });
      else await convMount(f, { parts: [[p[0], 'dm³'], [p[1], 'cm³']], to: 'cm³', range });
    },
  };
}

/** "2 034" → "hai nghìn không trăm ba mươi tư". */
const sayNum = (s) => readDec(String(s).replace(/\s/g, ''));
function taskRead46() {
  return {
    id: 'v46read',
    make: (rng) => {
      const u = rng.pick(['cm³', 'dm³', 'm³']);
      const n = rng.pick([rng.int(12, 99), rng.int(101, 999), rng.int(1001, 9999)]);
      const d = rng() < 0.3 ? `${rng.int(0, 20)},${rng.int(1, 9)}${rng() < 0.5 ? rng.int(1, 9) : ''}` : String(n);
      return { u, d, w: rng.int(0, 1) };
    },
    async mount(f, { u, d, w }) {
      mark('v46read');
      const words = `${sayNum(d)} ${US[u]}`;
      const right = `${prettyDec(d)} ${u}`;
      const other = u === 'cm³' ? 'dm³' : 'cm³';
      const isDec = d.includes(',');
      const wrongNum = isDec ? prettyDec(d.replace(/,(\d)/, ',0$1')) : prettyDec(String(+d >= 1000 ? +d * 10 : +d + Math.floor(+d / 100) * 900));
      if (w === 0) {
        f.q.innerHTML = `Viết số đo: <i>${words[0].toUpperCase() + words.slice(1)}</i>`;
        await f.choose({ options: opts([right, `${prettyDec(d)} ${u.replace('³', '²')}`, `${prettyDec(d)} ${other}`, `${wrongNum} ${u}`], d.length + u.length), answer: right,
          say: `Viết số đo: ${words}.`, hint: (v) => (v.includes('²') ? 'Thể tích dùng đơn vị khối, có số 3 nhỏ.' : 'Nghe lại tên đơn vị và các chữ số.') });
      } else {
        f.q.innerHTML = `Đọc số đo: <b>${right}</b>`;
        const cap = (s) => s[0].toUpperCase() + s.slice(1);
        await f.choose({ options: opts([cap(words), cap(`${sayNum(d)} ${US[u.replace('³', '²')]}`), cap(`${sayNum(d)} ${US[other]}`)], d.length), answer: cap(words),
          say: 'Chọn cách đọc đúng số đo này.', hint: 'Đọc số trước rồi đọc tên đơn vị khối.' });
      }
      f.finish({ ok: `${right}: ${words}.` });
    },
  };
}

function taskCalc46() {
  return {
    id: 'v46calc',
    make: (rng) => {
      const u = rng.pick(['cm³', 'dm³']);
      const op = rng.pick(['+', '−', '×', ':']);
      if (op === '+') { const a = rng.int(10, 200) / rng.pick([1, 10]), b = rng.int(5, 150) / rng.pick([1, 10]); return { u, op, a, b }; }
      if (op === '−') { const a = rng.pick([100, 1000, rng.int(50, 500)]), b = rng.int(10, a - 1); return { u, op, a, b }; }
      if (op === '×') return { u, op, a: rng.int(6, 40), b: rng.int(2, 9) };
      const b = rng.pick([2, 4, 5, 10]); return { u, op, a: rng.int(3, 90) * b, b };
    },
    async mount(f, { u, op, a, b }) {
      mark('v46calc');
      const r = op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : a / b;
      const unitB = op === '+' || op === '−' ? ` ${u}` : '';
      f.q.innerHTML = `${D(a)} ${u} ${op} ${D(b)}${unitB} = ${BOX} ${u}`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: A(r), max: 7, say: `Tính: ${D(a)} ${US[u]} ${{ '+': 'cộng', '−': 'trừ', '×': 'nhân', ':': 'chia' }[op]} ${D(b)}${unitB ? ` ${US[u]}` : ''}.`,
        hint: 'Tính như với số tự nhiên, số thập phân, rồi viết đơn vị đo thể tích.' });
      f.finish({ ok: `${D(a)} ${u} ${op} ${D(b)}${unitB} = ${D(r)} ${u}` });
    },
  };
}

/** Đồ vật thật và thể tích gần đúng. */
const OBJ46 = [
  ['Cục tẩy', 3, 'cm³'], ['Viên xúc xắc', 1, 'cm³'], ['Hộp bút', 0.5, 'dm³'], ['Cái loa thùng', 40, 'dm³'], ['Hộp sữa nhỏ', 180, 'cm³'],
  ['Chai nước 1,5 lít', 1.5, 'dm³'], ['Thùng xốp đựng hoa quả', 36, 'dm³'], ['Viên phấn', 4, 'cm³'], ['Hộp bánh quy', 2, 'dm³'], ['Quả trứng gà', 55, 'cm³'],
];
function taskObj46() {
  return {
    id: 'v46obj',
    make: (rng) => ({ k: rng.int(0, OBJ46.length - 1), j: rng.int(0, OBJ46.length - 1) }),
    async mount(f, { k, j }) {
      mark('v46obj');
      const [name, v, u] = OBJ46[k];
      const right = `${D(v)} ${u}`;
      const swap = `${D(v)} ${u === 'cm³' ? 'dm³' : 'cm³'}`;
      const o = OBJ46[j === k ? (k + 1) % OBJ46.length : j];
      const other = o[2] === u && o[1] !== v ? `${D(o[1])} ${o[2]}` : `${D(v * (u === 'cm³' ? 100 : 10))} ${u}`;
      f.q.innerHTML = `<b>${name}</b> có thể tích khoảng:`;
      await f.choose({ options: opts([right, swap, other], k + j), answer: right, say: `${name} có thể tích khoảng bao nhiêu?`,
        hint: (x) => (x === swap ? `1 dm³ to bằng cả nghìn hình 1 cm³. Nghĩ xem ${name.toLowerCase()} to cỡ nào.` : 'Hình dung độ to của đồ vật: 1 cm³ cỡ viên xúc xắc, 1 dm³ cỡ hộp to bằng bàn tay.') });
      f.finish({ ok: `${name} khoảng ${right}.` });
    },
  };
}

function taskTray46() {
  return {
    id: 'v46tray',
    make: (rng) => {
      for (;;) {
        const n = rng.int(1, 3), v = rng.pick([0.5, 1, 1.5]), k = rng.pick([8, 10, 20, 25, 40, 50]);
        const tot = Math.round(n * v * 1000);
        if (tot % k === 0 && tot / k <= 300) return { n, v, k };
      }
    },
    async mount(f, { n, v, k }) {
      mark('v46tray');
      const tot = Math.round(n * v * 1000);
      f.q.innerHTML = `Đổ ${n} chai nước, mỗi chai ${D(v)} l, vào khay đá. Mỗi ô chứa ${k} cm³. Đổ đầy được ${BOX} ô.<small>1 l = 1 dm³</small>`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: tot / k, max: 4, say: `Đổ ${n} chai nước, mỗi chai ${D(v)} lít vào khay đá, mỗi ô chứa ${k} xăng-ti-mét khối. Đổ đầy được bao nhiêu ô?`,
        hint: (x) => (x === Math.round((n * v) / k) || x === Math.round((n * v * 100) / k) ? '1 l = 1 dm³ = 1 000 cm³. Đổi ra xăng-ti-mét khối trước.' : `Có ${D(n * v)} l nước = ${fmt(tot)} cm³. Chia cho ${k}.`) });
      f.finish({ ok: `${D(n * v)} l = ${fmt(tot)} cm³; ${fmt(tot)} : ${k} = ${tot / k} ô.` });
    },
  };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Bài 47. Mét khối
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
const B47 = {
  explore: {
    setup: (board) => createCubes(board),
    steps: [
      async (c) => {
        const t = c.t;
        t.set([{ solid: { a: 1, b: 1, c: 1, n: 10, mini: true }, color: 'yellow', labels: { a: '1 m', b: '1 m', c: '1 m' } }], { maxS: 300 });
        t.caption('Hình lập phương cạnh <b>1 m</b>: thể tích <b>1 m³</b>');
        await c.say('Để đo thể tích lớn như bể bơi, thùng xe tải, người ta dùng mét khối. Mét khối là thể tích của hình lập phương cạnh 1 mét, viết tắt là m³.', 'Mét khối viết là <b>m³</b>');
        await c.say('Cạnh 1 mét bằng 10 đề-xi-mét. Ô đỏ là một hình lập phương 1 đề-xi-mét khối. Hình lập phương 1 mét khối gồm bao nhiêu hình 1 đề-xi-mét khối?');
        await c.choose([{ html: '100', value: 100 }, { html: '1 000', value: 1000 }, { html: '10', value: 10 }], 1000, { hint: 'Mỗi lớp 10 × 10 = 100 hình, có 10 lớp.' });
        t.caption('<b>1 m³ = 1 000 dm³</b>');
        await c.say('Mỗi lớp 100 hình, 10 lớp: 1 000 hình. 1 mét khối bằng 1 000 đề-xi-mét khối.');
      },
      async (c) => {
        const t = c.use((b) => createUnits(b, { kind: 'cube' }));
        t.setParts(partsV([[1, 'm³']]));
        await c.say('Bảng đơn vị thể tích có mét khối, đề-xi-mét khối, xăng-ti-mét khối. Bấm thẻ 1 m³.', 'Bấm thẻ <b>1 m³</b>.');
        await unitsDrop(c, t, 0);
        await unitsTarget(c, t, 'dm³', ['Đổi ra đề-xi-mét khối: bấm chữ dm³.', 'Bấm chữ <b>dm³</b>.']);
        t.read('1 m³ = <b>1 000 dm³</b>');
        await c.say('Dấu phẩy nhảy qua ba ô: 1 mét khối bằng 1 000 đề-xi-mét khối.');
        await unitsTarget(c, t, 'cm³', ['Còn xăng-ti-mét khối thì sao? Bấm chữ cm³.', 'Bấm chữ <b>cm³</b>.']);
        t.read('1 m³ = 1 000 dm³ = <b>1 000 000 cm³</b>');
        await c.say('Thêm ba ô nữa: 1 mét khối bằng một triệu xăng-ti-mét khối.', '<b>1 m³ = 1 000 000 cm³</b>');
      },
      async (c) => {
        const t = c.use((b) => createUnits(b, { kind: 'cube', from: 0, to: 1 }));
        t.setParts(partsV([[2400, 'dm³']]));
        await c.say('Đổi 2 400 đề-xi-mét khối ra mét khối. Bấm thẻ.', 'Đổi <b>2 400 dm³</b> ra m³. Bấm thẻ.');
        await unitsDrop(c, t, 0);
        await c.say('2 400 đề-xi-mét khối bằng bao nhiêu mét khối?', '2 400 dm³ = ? m³');
        await c.choose(['24 m³', '2,4 m³', '0,24 m³'].map(v => ({ html: v, value: v })), '2,4 m³', { hint: 'Dấu phẩy đứng ngay sau ô mét khối. Mỗi đơn vị ba ô.' });
        await t.setTarget(unitIdx('cube', 'm³'), { quiet: true });
        t.read('2 400 dm³ = <b>2,4 m³</b>');
        await c.say('2 400 đề-xi-mét khối bằng 2 phẩy 4 mét khối.');
      },
      async (c) => {
        const t = c.use((b) => createCubes(b));
        t.set([{ solid: { a: 1, b: 1, c: 1, n: 1 }, color: 'pink', label: '1 dm³' }, { solid: { a: 10, b: 10, c: 10, n: 1 }, color: 'yellow', label: '1 m³' }], { gap: 3 });
        t.caption('Hộp <b>1 dm³</b> bên cạnh thùng <b>1 m³</b> (đúng tỉ lệ)');
        await c.say('Hộp nhỏ cạnh 1 đề-xi-mét cầm gọn trong tay. Thùng cạnh 1 mét to gấp 10 lần mỗi chiều. Thùng hàng to đến mức hai bạn phải khiêng thì thể tích khoảng bao nhiêu?');
        await c.choose(['1 cm³', '1 dm³', '1 m³'].map(v => ({ html: v, value: v })), '1 m³', { hint: '1 dm³ chỉ cầm gọn trong tay. Thùng hai bạn khiêng to hơn nhiều.' });
        t.caption('Xúc xắc khoảng <b>1 cm³</b> · hộp cầm tay khoảng <b>1 dm³</b> · thùng to khoảng <b>1 m³</b>');
        await c.say('Đúng rồi. Viên xúc xắc khoảng 1 xăng-ti-mét khối, hộp nhỏ cầm tay khoảng 1 đề-xi-mét khối, thùng to hai bạn khiêng khoảng 1 mét khối.');
      },
    ],
  },
  tasks: () => [taskConv47(), taskObj47(), taskCalc47(), taskWater47(), taskLayer47()],
};

function taskConv47() {
  return {
    id: 'v47conv',
    make: (rng) => {
      const k = rng.int(0, 4);
      if (k === 0) return { k, s: `${rng.int(1, 9)},${rng.int(1, 9)}${rng() < 0.4 ? rng.int(1, 9) : ''}` }; // m³ → dm³
      if (k === 1) return { k, s: String(rng.pick([rng.int(11, 99) * 100, rng.int(1, 9) * 100, rng.int(101, 999) * 10])) }; // dm³ → m³
      if (k === 2) return { k, s: String(rng.pick([rng.int(1, 9) * 100000, rng.int(11, 99) * 100000, rng.int(2, 30) * 1000000])) }; // cm³ → m³
      if (k === 3) return { k, s: String(rng.int(2, 40)) }; // m³ → cm³
      return { k, s: `0,${rng.pick(['5', '25', '75', '05', '125'])}` }; // m³ → dm³
    },
    async mount(f, { k, s }) {
      mark('v47conv');
      if (k === 0 || k === 4) await convMount(f, { dec: s, src: 'm³', to: 'dm³', range: [0, 1] });
      else if (k === 1) await convMount(f, { dec: s, src: 'dm³', to: 'm³', range: [0, 1] });
      else if (k === 2) await convMount(f, { dec: s, src: 'cm³', to: 'm³', range: [0, 2] });
      else await convMount(f, { dec: s, src: 'm³', to: 'cm³', range: [0, 2] });
    },
  };
}

const OBJ47 = [['Viên đá lạnh nhỏ', '1 cm³'], ['Hạt ngô', '1 cm³'], ['Viên kẹo', '1 cm³'], ['Hộp giấy cầm trong lòng bàn tay', '1 dm³'], ['Chai nước 1 lít', '1 dm³'],
  ['Thùng hàng hai bạn khiêng', '1 m³'], ['Khối băng cao ngang ngực em', '1 m³'], ['Bể nước inox trên mái nhà', '1 m³']];
function taskObj47() {
  return {
    id: 'v47obj',
    make: (rng) => ({ k: rng.int(0, OBJ47.length - 1) }),
    async mount(f, { k }) {
      mark('v47obj');
      const [name, v] = OBJ47[k];
      f.q.innerHTML = `<b>${name}</b> có thể tích khoảng:`;
      await f.choose({ options: ['1 cm³', '1 dm³', '1 m³'].map(x => ({ html: x, value: x })), answer: v, say: `${name} có thể tích khoảng bao nhiêu?`,
        hint: '1 cm³ cỡ viên xúc xắc, 1 dm³ cỡ hộp cầm trong tay, 1 m³ cỡ thùng to hai bạn khiêng.' });
      f.finish({ ok: `${name}: khoảng ${v}.` });
    },
  };
}

function taskCalc47() {
  return {
    id: 'v47calc',
    make: (rng) => {
      const op = rng.pick(['+', '−', '×', ':']);
      if (op === '+') return { op, a: rng.int(11, 99) / 10, b: rng.int(101, 999) / 100 };
      if (op === '−') { const a = rng.pick([100, 1000, 500]); return { op, a, b: rng.int(11, a - 1) }; }
      if (op === '×') return { op, a: rng.int(11, 99) / 10, b: rng.pick([0.5, 2, 3, 4, 5]) };
      const b = rng.pick([3, 4, 5, 6]); return { op, a: rng.int(20, 400) * b, b };
    },
    async mount(f, { op, a, b }) {
      mark('v47calc');
      const r = op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : a / b;
      const ub = op === '+' || op === '−' ? ' m³' : '';
      f.q.innerHTML = `${D(a)} m³ ${op} ${D(b)}${ub} = ${BOX} m³`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: A(r), max: 7, say: `Tính: ${D(a)} mét khối ${{ '+': 'cộng', '−': 'trừ', '×': 'nhân', ':': 'chia' }[op]} ${D(b)}${ub ? ' mét khối' : ''}.`,
        hint: op === '+' ? 'Đặt các dấu phẩy thẳng cột rồi cộng.' : 'Tính như với số tự nhiên, số thập phân, rồi viết m³.' });
      f.finish({ ok: `${D(a)} m³ ${op} ${D(b)}${ub} = ${D(r)} m³` });
    },
  };
}

/** Giá nước sinh hoạt theo bậc (đồng / m³, như bảng của sách). */
const WATER = [[10, 5973], [20, 7052], [30, 8669], [Infinity, 15929]];
function waterBill(u) {
  let s = 0, lo = 0;
  const parts = [];
  for (const [hi, p] of WATER) { const q = Math.min(u, hi) - lo; if (q <= 0) break; s += q * p; parts.push([q, p]); lo = hi; }
  return { s, parts };
}
function taskWater47() {
  return {
    id: 'v47water',
    make: (rng) => ({ u: rng.int(11, 19) }),
    async mount(f, { u }) {
      mark('v47water');
      const { s, parts } = waterBill(u);
      f.q.innerHTML = `Tháng này nhà Việt dùng ${u} m³ nước. Phải trả ${BOX} đồng.`;
      injectVolStyles();
      f.tool.innerHTML = `<div class="g5v-tab"><table>
        <tr><th>Lượng nước dùng</th><th>Giá 1 m³</th></tr>
        <tr><td>10 m³ đầu tiên</td><td>${fmt(WATER[0][1])} đồng</td></tr>
        <tr><td>Từ trên 10 m³ đến 20 m³</td><td>${fmt(WATER[1][1])} đồng</td></tr>
        <tr><td>Từ trên 20 m³ đến 30 m³</td><td>${fmt(WATER[2][1])} đồng</td></tr>
        <tr><td>Trên 30 m³</td><td>${fmt(WATER[3][1])} đồng</td></tr></table>
        <div class="g5v-calc">&nbsp;</div></div>`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: s, max: 7, say: `Nhà Việt dùng ${u} mét khối nước. Nhà Việt phải trả bao nhiêu tiền?`,
        hint: (v) => (v === u * WATER[0][1] || v === u * WATER[1][1] ? `Không tính cả ${u} m³ một giá. 10 m³ đầu giá ${fmt(WATER[0][1])}, phần còn lại giá ${fmt(WATER[1][1])}.` : `10 × ${fmt(WATER[0][1])} + ${u - 10} × ${fmt(WATER[1][1])}`) });
      f.tool.querySelector('.g5v-calc').innerHTML = `${parts.map(([q, p]) => `${q} × ${fmt(p)}`).join(' + ')} = <b>${fmt(s)}</b> đồng`;
      f.finish({ ok: `${parts.map(([q, p]) => `${q} × ${fmt(p)}`).join(' + ')} = ${fmt(s)} đồng.` });
    },
  };
}

function taskLayer47() {
  return {
    id: 'v47layer',
    make: (rng) => ({ k: rng.int(0, 2), n: rng.int(2, 9) }),
    async mount(f, { k, n }) {
      mark('v47layer');
      const [q, ans, hint] = k === 0 ? ['Một lớp ở đáy hình lập phương 1 m³ có bao nhiêu hình 1 dm³?', 100, 'Lớp đáy có 10 hàng, mỗi hàng 10 hình.']
        : k === 1 ? [`${n} lớp như thế có bao nhiêu hình 1 dm³?`, n * 100, `Mỗi lớp 100 hình, ${n} lớp.`]
          : [`${n} m³ bằng bao nhiêu dm³?`, n * 1000, '1 m³ = 1 000 dm³.'];
      f.q.innerHTML = `${q} ${BOX}`;
      const t = createCubes(f.tool);
      t.set([{ solid: { a: 1, b: 1, c: 1, n: 10, mini: true }, color: 'yellow', labels: { a: '1 m', b: '1 m', c: '1 m' } }], { maxS: 400 });
      t.caption('Ô đỏ: <b>1 dm³</b>');
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: 5, say: q, hint });
      f.finish({ ok: k === 0 ? '10 × 10 = 100 hình 1 dm³.' : k === 1 ? `100 × ${n} = ${n * 100} hình.` : `${n} m³ = ${fmt(n * 1000)} dm³.` });
    },
  };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Bài 49. Hình khai triển
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
const CROSS = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]];
/** Xoay / lật ô (đổi hướng hình khai triển). */
function orient(cells, r, flip) {
  let cs = cells.map(([x, y]) => (flip ? [-x, y] : [x, y]));
  for (let i = 0; i < r; i++) cs = cs.map(([x, y]) => [-y, x]);
  const mx = Math.min(...cs.map(c => c[0])), my = Math.min(...cs.map(c => c[1]));
  return cs.map(([x, y]) => [x - mx, y - my]);
}
/** Hình 6 ô vuông: gấp được hình lập phương (1-4-1, 2-3-1, 2-2-2) và không gấp được. */
const NET_GOOD = () => [
  ...[0, 1, 2, 3].flatMap(i => [0, 1, 2, 3].map(j => [[i, 0], [0, 1], [1, 1], [2, 1], [3, 1], [j, 2]])),
  [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]],
  [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [1, 2]],
  [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [3, 2]],
  [[0, 0], [1, 0], [2, 0], [2, 1], [3, 1], [4, 1]],
];
const NET_BAD = [
  [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [1, 0]],
  [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [2, 3]].map(([x, y]) => [x, y]),
  [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]],
  [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1], [3, 1]],
  [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [2, 0]],
  [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [3, 1]],
];

const B49 = {
  explore: {
    setup: (board) => createNet(board),
    steps: [
      async (c) => {
        const t = c.t;
        t.set(cubeNet(CROSS, { colors: ['#FDE68A', '#FDE68A', '#FEF3C7', '#FDE68A', '#FEF3C7', '#FDE68A'] }));
        t.caption('Miếng bìa gồm <b>6 hình vuông</b> bằng nhau');
        await c.say('Mai làm đèn lồng hình lập phương bằng bìa. Đây là miếng bìa gồm 6 hình vuông bằng nhau. Bấm Gấp để gấp thử.', 'Bấm <b>Gấp</b>');
        await c.choose([{ html: '📦 Gấp', value: 1 }], 1);
        await t.fold(1);
        t.caption('Gấp được <b>hình lập phương</b>');
        await c.say('Miếng bìa gấp lại được hình lập phương. Ta nói miếng bìa là hình khai triển của hình lập phương.', '<b>Hình khai triển</b>: gấp lại được hình khối');
        await t.fold(0, 1200);
      },
      async (c) => {
        const t = c.use((b) => createNet(b));
        t.set(boxNet(5, 4, 2, { labels: false, unit: 'm' }));
        t.caption('Bốn mặt bên và <b>hai đáy</b> hình chữ nhật');
        await c.say('Đèn lồng hình hộp chữ nhật thì miếng bìa có bốn mặt bên xếp thành hàng và hai mặt đáy, một ở trên, một ở dưới. Bấm Gấp.', 'Bấm <b>Gấp</b>');
        await c.choose([{ html: '📦 Gấp', value: 1 }], 1);
        await t.fold(1);
        t.caption('Gấp được <b>hình hộp chữ nhật</b>');
        await c.say('Ta được hình hộp chữ nhật. Hai mặt đáy đối diện nhau và bằng nhau.');
      },
      async (c) => {
        const t = c.use((b) => createNet(b, { tilt: 50 }));
        t.set(cylNet(1, 2.4));
        t.caption('Một <b>hình chữ nhật</b> và <b>hai hình tròn</b>');
        await c.say('Miếng bìa này gồm một hình chữ nhật và hai hình tròn bằng nhau, một ở trên, một ở dưới. Bấm Gấp.', 'Bấm <b>Gấp</b>');
        await c.choose([{ html: '📦 Gấp', value: 1 }], 1);
        await t.fold(1, 2400);
        t.caption('Gấp được <b>hình trụ</b>: chiều dài hình chữ nhật bằng <b>chu vi</b> hình tròn đáy');
        await c.say('Hình chữ nhật cuộn tròn lại, hai hình tròn thành hai đáy: ta được hình trụ. Chiều dài hình chữ nhật đúng bằng chu vi hình tròn đáy.');
      },
      async (c) => {
        const t = c.use((b) => createNet(b));
        const bad = NET_BAD[0];
        t.set(cubeNet(bad));
        t.caption('Cũng có <b>6 hình vuông</b>, có 5 ô thẳng hàng');
        await c.say('Miếng bìa này cũng có 6 hình vuông, nhưng 5 ô nằm thẳng một hàng. Có gấp được hình lập phương không?');
        await c.choose([{ html: 'Gấp được', value: 1 }, { html: 'Không gấp được', value: 0 }], 0, { hint: 'Một hàng chỉ có 4 mặt bên vòng quanh. Ô thứ năm sẽ đè lên ô đầu.' });
        await t.fold(1);
        t.state(t.clash(), 'clash');
        t.caption('Hai mặt <b>chồng lên nhau</b>, còn một mặt bị <b>hở</b>: không gấp được');
        await c.say('Gấp thử thì hai mặt tô đỏ chồng lên nhau và còn một mặt bị hở. Không phải cứ 6 hình vuông là gấp được hình lập phương.');
      },
      async (c) => {
        const t = c.use((b) => createNet(b));
        const sym = ['■', '★', '●', '✕', '▲', '♥'];
        const faces = cubeNet(CROSS, { labels: sym });
        t.set(faces);
        const opp = oppositeFace(faces, 0);
        t.state(0, 'glow');
        t.caption('Gấp lại thì mặt nào <b>đối diện</b> mặt ■?');
        await c.say('Các mặt có kí hiệu. Khi gấp thành hình lập phương, mặt nào đối diện với mặt hình vuông?');
        await c.choose(sym.slice(1).map((s) => ({ html: s, value: s })), sym[opp], { hint: 'Trong hàng 4 ô, hai ô cách nhau một ô thì đối diện. Ô trên và ô dưới hàng thì đối diện nhau.' });
        t.state(opp, 'glow');
        await c.say('Đúng rồi. Gấp lại để kiểm tra.');
        await t.fold(1);
        t.caption(`■ và ${sym[opp]} là hai mặt <b>đối diện</b>, không bao giờ kề nhau`);
        await c.say('Hai mặt đối diện không có cạnh chung, không bao giờ kề nhau.');
      },
    ],
  },
  tasks: () => [taskMatch49(), taskCube49(), taskCyl49(), taskOpp49(), taskBox49()],
};

/** Chọn hình khai triển trong các hình A, B, C… rồi gấp hình đúng. */
async function pickNet(f, { list, right, say, hint, ok, tilt }) {
  const t = createNet(f.tool, { tilt });
  t.flats(list);
  const L = 'ABCD';
  await f.choose({ options: list.map((_, i) => ({ html: L[i], value: i })), answer: right, say, hint });
  t.set(list[right]);
  await sleep(250);
  await t.fold(1, 1600);
  f.finish({ ok });
}

function taskMatch49() {
  return {
    id: 'n49match',
    make: (rng) => ({ k: rng.int(0, 2), ord: rng.shuffle([0, 1, 2]), a: rng.int(3, 5), b: rng.int(2, 3), c: rng.int(1, 3) }),
    async mount(f, { k, ord, a, b, c }) {
      mark('n49match');
      const nets = [cubeNet(CROSS), boxNet(a, b, c === b ? c + 1 : c, { labels: false }), cylNet(1, 2.2)];
      const name = ['hình lập phương', 'hình hộp chữ nhật', 'hình trụ'][k];
      f.q.innerHTML = `Hình nào là hình khai triển của <b>${name}</b>?`;
      await pickNet(f, { list: ord.map(i => nets[i]), right: ord.indexOf(k), say: `Hình nào là hình khai triển của ${name}?`,
        hint: k === 0 ? 'Hình lập phương có 6 mặt là hình vuông bằng nhau.' : k === 1 ? 'Hình hộp chữ nhật có 6 mặt là hình chữ nhật.' : 'Hình trụ có hai đáy là hình tròn.', ok: `Gấp lại được ${name}.`, tilt: k === 2 ? 50 : 58 });
    },
  };
}

function taskCube49() {
  return {
    id: 'n49cube',
    make: (rng) => {
      const good = NET_GOOD();
      const g = orient(rng.pick(good), rng.int(0, 3), rng() < 0.5);
      const bad = rng.shuffle(NET_BAD.map((_, i) => i)).slice(0, 2).map(i => orient(NET_BAD[i], rng.int(0, 3), rng() < 0.5));
      const pos = rng.int(0, 2);
      const list = [...bad];
      list.splice(pos, 0, g);
      return { list, pos };
    },
    async mount(f, { list, pos }) {
      mark('n49cube');
      f.q.innerHTML = 'Hình nào gấp được <b>hình lập phương</b>?';
      await pickNet(f, { list: list.map(cs => cubeNet(cs)), right: pos, say: 'Hình nào gấp được hình lập phương?',
        hint: 'Không có 5 ô thẳng hàng, không có 4 ô xếp thành hình vuông to. Hình dung gấp từng mặt lên.', ok: 'Gấp thử: đủ 6 mặt, không mặt nào chồng lên nhau.' });
    },
  };
}

function taskCyl49() {
  return {
    id: 'n49cyl',
    make: (rng) => ({ ord: rng.shuffle([0, 1, 2]), wrong: rng.pick(['same', 'three']) }),
    async mount(f, { ord, wrong }) {
      mark('n49cyl');
      const nets = [cylNet(1, 2.2), cylNet(1, 2.2, { caps: wrong }), cylNet(1, 2.2, { caps: 'one' })];
      f.q.innerHTML = 'Hình nào là hình khai triển của <b>hình trụ</b>?';
      await pickNet(f, { list: ord.map(i => nets[i]), right: ord.indexOf(0), say: 'Hình nào là hình khai triển của hình trụ?',
        hint: 'Hình trụ có đúng hai đáy là hình tròn: một ở trên, một ở dưới.', ok: 'Một hình chữ nhật và hai hình tròn ở hai phía: gấp được hình trụ.', tilt: 50 });
    },
  };
}

const SYM = ['■', '★', '●', '✕', '▲', '♥'];
function taskOpp49() {
  return {
    id: 'n49opp',
    make: (rng) => {
      const good = NET_GOOD();
      return { cs: orient(rng.pick(good), rng.int(0, 3), rng() < 0.5), sym: rng.shuffle([...SYM]), q: rng.int(0, 5) };
    },
    async mount(f, { cs, sym, q }) {
      mark('n49opp');
      const faces = cubeNet(cs, { labels: sym });
      const opp = oppositeFace(faces, q);
      f.q.innerHTML = `Gấp thành hình lập phương. Mặt nào <b>đối diện</b> mặt <b>${sym[q]}</b>?`;
      const t = createNet(f.tool);
      t.set(faces);
      t.state(q, 'glow');
      const others = sym.filter((_, i) => i !== q && i !== opp);
      const choices = shuffleBy([sym[opp], ...others.slice(0, 3)], q + opp + cs.length);
      await f.choose({ options: choices.map(s => ({ html: s, value: s })), answer: sym[opp], say: 'Gấp thành hình lập phương. Mặt nào đối diện với mặt được tô?',
        hint: 'Mặt đối diện không có cạnh chung với mặt được tô. Trong một hàng, hai ô cách nhau một ô thì đối diện.' });
      t.state(opp, 'glow');
      await sleep(300);
      await t.fold(1, 1600);
      f.finish({ ok: `${sym[q]} và ${sym[opp]} là hai mặt đối diện.` });
    },
  };
}

function taskBox49() {
  return {
    id: 'n49box',
    make: (rng) => { const a = rng.int(3, 5), b = rng.int(2, 3), c = rng.int(1, 2); return { a, b, c: c === b ? c + 1 : c, ord: rng.shuffle([0, 1, 2]), bad: rng.pick(['wrongBase', 'noTop']) }; },
    async mount(f, { a, b, c, ord, bad }) {
      mark('n49box');
      const nets = [boxNet(a, b, c, { labels: false }), boxNet(a, b, c, { labels: false, bad: 'sameSide' }), boxNet(a, b, c, { labels: false, bad })];
      f.q.innerHTML = 'Hình nào là hình khai triển của <b>hình hộp chữ nhật</b>?';
      await pickNet(f, { list: ord.map(i => nets[i]), right: ord.indexOf(0), say: 'Hình nào là hình khai triển của hình hộp chữ nhật?',
        hint: 'Cần đủ 6 mặt. Hai đáy bằng nhau, nằm ở hai phía của hàng mặt bên.', ok: 'Đủ 6 mặt, hai đáy ở hai phía: gấp được hình hộp chữ nhật.' });
    },
  };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Bài 50. Diện tích xung quanh và diện tích toàn phần của hình hộp chữ nhật
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
const SIDES = ['s0', 's1', 's2', 's3'];
const B50 = {
  explore: {
    setup: (board) => createNet(board, { steps: 3 }),
    steps: [
      async (c) => {
        const t = c.t;
        t.set(boxNet(5, 4, 2, { labels: false, unit: 'm' }), { at: 1 });
        t.state('top', 'off');
        t.caption('Chuồng gà dài <b>5 m</b>, rộng <b>4 m</b>, cao <b>2 m</b>');
        await c.say('Các bạn quây lưới làm chuồng gà hình hộp chữ nhật dài 5 mét, rộng 4 mét, cao 2 mét. Bốn mặt xung quanh làm bằng lưới. Cần bao nhiêu mét vuông lưới?');
        await c.say('Bấm Mở để trải bốn mặt xung quanh ra.', 'Bấm <b>Mở</b>');
        await c.choose([{ html: '📂 Mở', value: 1 }], 1);
        t.state('top', 'on');
        await t.fold(0, 1600);
        t.state(SIDES, 'glow');
        t.caption('Bốn mặt bên trải thành <b>một hình chữ nhật</b>');
        await c.say('Bốn mặt xung quanh trải ra thành một hình chữ nhật. Chiều dài của nó là 4 cộng 5 cộng 4 cộng 5, đúng bằng chu vi mặt đáy. Chiều rộng là chiều cao 2 mét.');
      },
      async (c) => {
        const t = c.t;
        t.caption('Diện tích xung quanh = <b>chu vi đáy × chiều cao</b>');
        await c.say('Diện tích xung quanh là tổng diện tích bốn mặt bên. Ta lấy chu vi mặt đáy nhân với chiều cao. Diện tích xung quanh là bao nhiêu?');
        await c.choose(['18 m²', '36 m²', '40 m³'].map(v => ({ html: v, value: v })), '36 m²', { hint: (v) => (v === '18 m²' ? 'Chu vi đáy là 18 m, còn nhân với chiều cao 2 m.' : 'Đó là thể tích. Diện tích dùng m².') });
        await showSteps(t, ['Sxq = (5 + 4) × 2 × 2', '= 18 × 2', '= 36 (m²)']);
        await c.say('Chu vi đáy là 5 cộng 4 rồi nhân 2, bằng 18 mét. Nhân chiều cao 2 mét được 36 mét vuông.');
      },
      async (c) => {
        const t = c.use((b) => createNet(b, { steps: 3 }));
        t.set(boxNet(5, 4, 2, { labels: false, unit: 'm' }));
        t.state(['top', 'bot'], 'glow');
        t.caption('Diện tích toàn phần = Sxq + <b>hai đáy</b>');
        await c.say('Nếu bọc cả mặt trên và mặt dưới thì cần thêm diện tích hai đáy. Diện tích tất cả các mặt gọi là diện tích toàn phần.', 'Stp = Sxq + <b>2 đáy</b>');
        await c.say('Mỗi đáy là 5 nhân 4 bằng 20 mét vuông. Diện tích toàn phần là bao nhiêu?');
        await c.choose(['56 m²', '76 m²', '40 m²'].map(v => ({ html: v, value: v })), '76 m²', { hint: (v) => (v === '56 m²' ? 'Có hai đáy, không phải một.' : 'Cộng Sxq 36 m² với hai đáy.') });
        await showSteps(t, ['2 đáy: 5 × 4 × 2 = 40 (m²)', 'Stp = 36 + 40', '= 76 (m²)']);
        await t.fold(1);
      },
      async (c) => {
        const t = c.use((b) => createNet(b, { steps: 3 }));
        t.set(boxNet(5, 4, 2, { labels: false, unit: 'm' }), { at: 1 });
        t.state('top', 'off');
        t.caption('Bể cá <b>không có nắp</b>: chỉ <b>một đáy</b>');
        await c.say('Bể cá bằng kính không có nắp. Kính làm bể gồm bốn mặt xung quanh và một mặt đáy. Cần bao nhiêu mét vuông kính?');
        await c.choose(['76 m²', '56 m²', '36 m²'].map(v => ({ html: v, value: v })), '56 m²', { hint: (v) => (v === '76 m²' ? 'Bể không có nắp nên chỉ có một đáy.' : 'Còn mặt đáy nữa.') });
        await showSteps(t, ['Sxq + 1 đáy', '= 36 + 20', '= 56 (m²)']);
        await c.say('Bể không nắp: diện tích xung quanh cộng một đáy, 36 cộng 20 bằng 56 mét vuông. Đọc kĩ đề xem có những mặt nào.');
      },
    ],
  },
  tasks: () => [taskSxq50(), taskStp50(), taskTank50(), taskChoose50(), taskCmp50()],
};

function boxDims(rng) {
  const u = rng.pick(['cm', 'dm', 'm']);
  if (rng() < 0.25) { const a = rng.int(3, 9) + 0.5, b = rng.int(2, Math.floor(a)) , c = rng.int(2, 8); return { a, b, c, u }; }
  const a = rng.int(4, 12), b = rng.int(2, a - 1), c = rng.int(2, 10);
  return { a, b, c, u: u === 'cm' ? 'cm' : u, k: rng.int(0, 99) };
}
/** Tấm hình khai triển hộp a × b × c gấp sẵn; mở ra khi xong. */
function boxBoard(f, a, b, c, steps = 3) {
  const t = createNet(f.tool, { steps });
  t.set(boxNet(a, b, c, { labels: false }), { at: 1 });
  return t;
}
const dimTxt = (a, b, c, u) => `dài ${D(a)} ${u}, rộng ${D(b)} ${u}, cao ${D(c)} ${u}`;
const dimSay = (a, b, c, u) => `dài ${D(a)} ${US[u]}, rộng ${D(b)} ${US[u]}, cao ${D(c)} ${US[u]}`;

function taskSxq50() {
  return {
    id: 's50sxq',
    make: boxDims,
    async mount(f, { a, b, c, u }) {
      mark('s50sxq');
      const P = (a + b) * 2, S = P * c;
      f.q.innerHTML = `Hộp ${dimTxt(a, b, c, u)}. S<sub>xq</sub> = ${BOX} ${sq(u)}`;
      const t = boxBoard(f, a, b, c);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: A(S), max: 7, say: `Hình hộp chữ nhật ${dimSay(a, b, c, u)}. Tính diện tích xung quanh.`,
        hint: (v) => (Math.abs(v - (a + b) * c) < 1e-9 ? 'Chu vi đáy là (dài + rộng) × 2.' : Math.abs(v - a * b * c) < 1e-9 ? 'Đó là thể tích. Sxq = chu vi đáy × chiều cao.' : 'Lấy chu vi mặt đáy nhân với chiều cao.') });
      await t.fold(0, 1300);
      t.state(SIDES, 'glow');
      await showSteps(t, [`Sxq = (${D(a)} + ${D(b)}) × 2 × ${D(c)}`, `= ${D(P)} × ${D(c)}`, `= ${D(S)} (${sq(u)})`]);
      f.finish({ ok: `Sxq = (${D(a)} + ${D(b)}) × 2 × ${D(c)} = ${D(S)} ${sq(u)}` });
    },
  };
}

function taskStp50() {
  return {
    id: 's50stp',
    make: boxDims,
    async mount(f, { a, b, c, u }) {
      mark('s50stp');
      const S = (a + b) * 2 * c, B = a * b, T = S + 2 * B;
      f.q.innerHTML = `Hộp ${dimTxt(a, b, c, u)}. S<sub>tp</sub> = ${BOX} ${sq(u)}`;
      const t = boxBoard(f, a, b, c);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: A(T), max: 7, say: `Hình hộp chữ nhật ${dimSay(a, b, c, u)}. Tính diện tích toàn phần.`,
        hint: (v) => (Math.abs(v - S - B) < 1e-9 ? 'Hình hộp có hai đáy.' : Math.abs(v - S) < 1e-9 ? 'Đó mới là diện tích xung quanh. Cộng thêm hai đáy.' : 'Stp = Sxq + diện tích hai đáy.') });
      await t.fold(0, 1300);
      t.state(['top', 'bot'], 'glow');
      await showSteps(t, [`Sxq = ${D(S)} (${sq(u)})`, `2 đáy = ${D(a)} × ${D(b)} × 2 = ${D(2 * B)}`, `Stp = ${D(T)} (${sq(u)})`]);
      f.finish({ ok: `Stp = ${D(S)} + ${D(2 * B)} = ${D(T)} ${sq(u)}` });
    },
  };
}

function taskTank50() {
  return {
    id: 's50tank',
    make: (rng) => ({ k: rng.int(0, 1), a: rng.pick([rng.int(4, 12), rng.int(15, 30)]), b: 0, c: 0, s: rng.int(0, 99), r: [rng.int(2, 8), rng.int(2, 8)] }),
    async mount(f, { k, a, r: [b0, c0] }) {
      mark('s50tank');
      const b = Math.min(b0, a - 1) || 2;
      const [name, u, c] = k === 0 ? ['Bể cá bằng kính không có nắp', 'dm', c0] : ['Bể bơi lát gạch đáy và xung quanh', 'm', 1 + b0 / 10 + 0.2];
      const cc = clean(c);
      const S = (a + b) * 2 * cc, B = a * b, T = S + B;
      f.q.innerHTML = `${name}, ${dimTxt(a, b, cc, u).replace('cao', k ? 'sâu' : 'cao')}. Diện tích cần ${k ? 'lát' : 'làm kính'}: ${BOX} ${sq(u)}`;
      const t = boxBoard(f, a, b, cc);
      t.state('top', 'off');
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: A(T), max: 8, say: `${name}, ${dimSay(a, b, cc, u)}. Tính diện tích cần ${k ? 'lát gạch' : 'làm kính'}.`,
        hint: (v) => (Math.abs(v - S - 2 * B) < 1e-9 ? 'Không có nắp: chỉ một đáy.' : Math.abs(v - S) < 1e-9 ? 'Còn mặt đáy nữa.' : 'Diện tích xung quanh cộng một đáy.') });
      await t.fold(0, 1300);
      t.state([...SIDES, 'bot'], 'glow');
      await showSteps(t, [`Sxq = ${D(S)} (${sq(u)})`, `1 đáy = ${D(a)} × ${D(b)} = ${D(B)}`, `${D(S)} + ${D(B)} = ${D(T)} (${sq(u)})`]);
      f.finish({ ok: `Sxq + 1 đáy = ${D(S)} + ${D(B)} = ${D(T)} ${sq(u)}` });
    },
  };
}

function taskChoose50() {
  return {
    id: 's50choose',
    make: (rng) => { const a = rng.int(4, 10), b = rng.int(2, a - 1), c = rng.int(2, 9); return { a, b, c, u: rng.pick(['cm', 'dm', 'm']), which: rng.int(0, 1) }; },
    async mount(f, { a, b, c, u, which }) {
      mark('s50choose');
      const S = (a + b) * 2 * c, T = S + 2 * a * b;
      const right = `${fmt(which ? T : S)} ${sq(u)}`;
      f.q.innerHTML = `Hộp ${dimTxt(a, b, c, u)}. Diện tích ${which ? 'toàn phần' : 'xung quanh'} là:`;
      const t = boxBoard(f, a, b, c, 0);
      const list = which ? [right, `${fmt(S + a * b)} ${sq(u)}`, `${fmt(S)} ${sq(u)}`, `${fmt(a * b * c)} ${cu(u)}`] : [right, `${fmt((a + b) * c)} ${sq(u)}`, `${fmt(T)} ${sq(u)}`, `${fmt(a * b * c)} ${cu(u)}`];
      await f.choose({ options: opts(list, a * 7 + b + c), answer: right, say: `Chọn diện tích ${which ? 'toàn phần' : 'xung quanh'} đúng.`,
        hint: which ? 'Stp = chu vi đáy × chiều cao + hai đáy.' : 'Sxq = chu vi đáy × chiều cao. Chu vi đáy = (dài + rộng) × 2.' });
      await t.fold(0, 1300);
      t.state(which ? [...SIDES, 'top', 'bot'] : SIDES, 'glow');
      f.finish({ ok: which ? `Stp = ${fmt(S)} + ${fmt(2 * a * b)} = ${fmt(T)} ${sq(u)}` : `Sxq = (${a} + ${b}) × 2 × ${c} = ${fmt(S)} ${sq(u)}` });
    },
  };
}

/** Hai hộp khác đơn vị: hộp nào có Stp lớn hơn (phải đổi cùng đơn vị). */
function taskCmp50() {
  return {
    id: 's50cmp',
    make: (rng) => {
      for (;;) {
        const A1 = [rng.int(12, 30) / 10, rng.int(10, 25) / 10, rng.int(10, 25) / 10]; // dm
        const B1 = [rng.int(10, 30), rng.int(8, 25), rng.int(5, 20)]; // cm
        const sa = 100 * ((A1[0] + A1[1]) * 2 * A1[2] + 2 * A1[0] * A1[1]), sb = (B1[0] + B1[1]) * 2 * B1[2] + 2 * B1[0] * B1[1];
        if (Math.abs(sa - sb) > 120 && (sa - sb) * (B1[0] - A1[0]) < 0) return { A1, B1, swap: rng.int(0, 1) };
      }
    },
    async mount(f, { A1, B1, swap }) {
      mark('s50cmp');
      const st = (d) => (d[0] + d[1]) * 2 * d[2] + 2 * d[0] * d[1];
      const sa = clean(st(A1)), sb = st(B1);
      const boxes = [{ d: A1, u: 'dm', s: sa, cm: sa * 100 }, { d: B1, u: 'cm', s: sb, cm: sb }];
      if (swap) boxes.reverse();
      const ans = boxes[0].cm > boxes[1].cm ? 'A' : 'B';
      f.q.innerHTML = 'Hộp nào có diện tích toàn phần lớn hơn?';
      const t = createCubes(f.tool);
      t.set(boxes.map((b, i) => {
        const k = b.u === 'dm' ? 10 : 1; // vẽ theo cm thật
        return { solid: { a: b.d[0] * k / 6, b: b.d[1] * k / 6, c: b.d[2] * k / 6, n: 1 }, color: i ? 'pink' : 'green', label: 'AB'[i], labels: { a: `${D(b.d[0])} ${b.u}`, b: `${D(b.d[1])} ${b.u}`, c: `${D(b.d[2])} ${b.u}` } };
      }), { gap: 2.2 });
      await f.choose({ options: [{ html: 'Hộp A', value: 'A' }, { html: 'Hộp B', value: 'B' }], answer: ans, say: 'Hộp nào có diện tích toàn phần lớn hơn? Xem kĩ đơn vị đo.',
        hint: 'Hai hộp đo bằng hai đơn vị khác nhau. Đổi về cùng một đơn vị rồi mới so sánh: 1 dm² = 100 cm².' });
      t.caption(`A: ${D(boxes[0].s)} ${sq(boxes[0].u)} · B: ${D(boxes[1].s)} ${sq(boxes[1].u)}`);
      f.finish({ ok: `Đổi cùng đơn vị: A ${fmt(clean(boxes[0].cm))} cm², B ${fmt(clean(boxes[1].cm))} cm². Hộp ${ans} lớn hơn.` });
    },
  };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Bài 51. Diện tích xung quanh và diện tích toàn phần của hình lập phương
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
/** Hình lập phương: hàng 4 mặt bên + đáy dưới (id bot) + đáy trên (id top), cùng id với boxNet. */
const cubeBox = (a) => boxNet(a, a, a, { side: '#FDBA74', base: '#FDE68A', labels: false });
const B51 = {
  explore: {
    setup: (board) => createNet(board, { steps: 3 }),
    steps: [
      async (c) => {
        const t = c.t;
        t.set(cubeBox(3), { at: 1 });
        t.caption('Thùng gỗ hình lập phương cạnh <b>30 cm</b>');
        await c.say('Thùng gỗ hình lập phương cạnh 30 xăng-ti-mét. Các bạn dán giấy màu cho bốn mặt xung quanh. Bấm Mở để trải các mặt ra.', 'Bấm <b>Mở</b>');
        await c.choose([{ html: '📂 Mở', value: 1 }], 1);
        await t.fold(0, 1500);
        t.state(SIDES, 'glow');
        t.caption('Bốn mặt bên là <b>4 hình vuông</b> bằng nhau');
        await c.say('Bốn mặt bên là bốn hình vuông bằng nhau. Diện tích một mặt là 30 nhân 30. Tổng diện tích giấy cần dùng là bao nhiêu?');
        await c.choose(['120 cm²', '3 600 cm²', '5 400 cm²'].map(v => ({ html: v, value: v })), '3 600 cm²', { hint: (v) => (v === '120 cm²' ? 'Đó là 30 × 4. Phải lấy diện tích một mặt, 30 × 30, rồi nhân 4.' : 'Chỉ dán bốn mặt xung quanh.') });
        await showSteps(t, ['1 mặt: 30 × 30 = 900 (cm²)', 'Sxq = 900 × 4', '= 3 600 (cm²)']);
        await c.say('Diện tích xung quanh của hình lập phương bằng diện tích một mặt nhân với 4.', 'Sxq = <b>1 mặt × 4</b>');
      },
      async (c) => {
        const t = c.use((b) => createNet(b, { steps: 3 }));
        t.set(cubeBox(3));
        t.state([...SIDES, 'top', 'bot'], 'glow');
        t.caption('Gối hình lập phương cạnh <b>30 cm</b>: may cả <b>6 mặt</b>');
        await c.say('Bạn may chiếc gối hình lập phương cạnh 30 xăng-ti-mét, may cả sáu mặt. Cần bao nhiêu vải?');
        await c.choose(['3 600 cm²', '5 400 cm²', '180 cm²'].map(v => ({ html: v, value: v })), '5 400 cm²', { hint: (v) => (v === '180 cm²' ? 'Đó là 30 × 6. Lấy diện tích một mặt nhân 6.' : 'Gối có 6 mặt, không phải 4.') });
        await showSteps(t, ['1 mặt: 30 × 30 = 900 (cm²)', 'Stp = 900 × 6', '= 5 400 (cm²)']);
        await c.say('Diện tích toàn phần của hình lập phương bằng diện tích một mặt nhân với 6.', 'Stp = <b>1 mặt × 6</b>');
        await t.fold(1);
      },
      async (c) => {
        const t = c.use((b) => createNet(b, { steps: 3 }));
        t.set(cubeBox(3), { at: 1 });
        t.state('bot', 'off');
        t.caption('Phủ kem <b>4 mặt bên</b> và <b>mặt trên</b>');
        await c.say('Bánh hình lập phương cạnh 10 xăng-ti-mét, phủ kem bốn mặt xung quanh và mặt trên, mặt đáy đặt trên đĩa. Phủ kem mấy mặt?');
        await c.choose([4, 5, 6].map(v => ({ html: `${v} mặt`, value: v })), 5, { hint: 'Bốn mặt bên và một mặt trên.' });
        await showSteps(t, ['1 mặt: 10 × 10 = 100 (cm²)', '100 × 5', '= 500 (cm²)']);
        await c.say('Năm mặt: 100 nhân 5 bằng 500 xăng-ti-mét vuông. Đọc kĩ đề xem có mấy mặt.');
      },
    ],
  },
  tasks: () => [taskSxq51(), taskStp51(), taskChoose51(), taskFive51(), taskJoin51()],
};

function cubeEdge(rng) {
  const u = rng.pick(['cm', 'dm', 'm']);
  if (rng() < 0.25) return { a: rng.pick([1.5, 2.5, 0.5, 1.2]), u: u === 'cm' ? 'dm' : u };
  return { a: rng.int(3, 15) * (u === 'cm' && rng() < 0.3 ? 2 : 1), u };
}
function cubeBoard(f, steps = 3) {
  const t = createNet(f.tool, { steps });
  t.set(cubeBox(1), { at: 1 });
  return t;
}
function taskSxq51() {
  return {
    id: 's51sxq',
    make: cubeEdge,
    async mount(f, { a, u }) {
      mark('s51sxq');
      const F = a * a, S = F * 4;
      f.q.innerHTML = `Hình lập phương cạnh ${D(a)} ${u}. S<sub>xq</sub> = ${BOX} ${sq(u)}`;
      const t = cubeBoard(f);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: A(S), max: 7, say: `Hình lập phương cạnh ${D(a)} ${US[u]}. Tính diện tích xung quanh.`,
        hint: (v) => (Math.abs(v - a * 4) < 1e-9 ? 'Em lấy cạnh × 4. Phải lấy diện tích một mặt (cạnh × cạnh) rồi nhân 4.' : Math.abs(v - F * 6) < 1e-9 ? 'Đó là diện tích toàn phần. Xung quanh chỉ 4 mặt.' : 'Diện tích một mặt nhân với 4.') });
      await t.fold(0, 1300);
      t.state(SIDES, 'glow');
      await showSteps(t, [`1 mặt: ${D(a)} × ${D(a)} = ${D(F)}`, `Sxq = ${D(F)} × 4`, `= ${D(S)} (${sq(u)})`]);
      f.finish({ ok: `Sxq = ${D(a)} × ${D(a)} × 4 = ${D(S)} ${sq(u)}` });
    },
  };
}
function taskStp51() {
  return {
    id: 's51stp',
    make: cubeEdge,
    async mount(f, { a, u }) {
      mark('s51stp');
      const F = a * a, T = F * 6;
      f.q.innerHTML = `Hình lập phương cạnh ${D(a)} ${u}. S<sub>tp</sub> = ${BOX} ${sq(u)}`;
      const t = cubeBoard(f);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: A(T), max: 7, say: `Hình lập phương cạnh ${D(a)} ${US[u]}. Tính diện tích toàn phần.`,
        hint: (v) => (Math.abs(v - a * 6) < 1e-9 ? 'Em lấy cạnh × 6. Phải lấy diện tích một mặt rồi nhân 6.' : Math.abs(v - F * 4) < 1e-9 ? 'Đó là diện tích xung quanh. Toàn phần có 6 mặt.' : 'Diện tích một mặt nhân với 6.') });
      await t.fold(0, 1300);
      t.state([...SIDES, 'top', 'bot'], 'glow');
      await showSteps(t, [`1 mặt: ${D(a)} × ${D(a)} = ${D(F)}`, `Stp = ${D(F)} × 6`, `= ${D(T)} (${sq(u)})`]);
      f.finish({ ok: `Stp = ${D(a)} × ${D(a)} × 6 = ${D(T)} ${sq(u)}` });
    },
  };
}
function taskChoose51() {
  return {
    id: 's51choose',
    make: (rng) => ({ a: rng.int(3, 12), u: rng.pick(['cm', 'dm', 'm']), which: rng.int(0, 1) }),
    async mount(f, { a, u, which }) {
      mark('s51choose');
      const k = which ? 6 : 4;
      const right = `${fmt(a * a * k)} ${sq(u)}`;
      f.q.innerHTML = `Hình lập phương cạnh ${a} ${u}. Diện tích ${which ? 'toàn phần' : 'xung quanh'} là:`;
      const t = cubeBoard(f, 0);
      await f.choose({ options: opts([right, `${fmt(a * k)} ${sq(u)}`, `${fmt(a * a * (10 - k))} ${sq(u)}`, `${fmt(a * a * a)} ${cu(u)}`], a + k), answer: right,
        say: `Chọn diện tích ${which ? 'toàn phần' : 'xung quanh'} đúng.`, hint: `Diện tích một mặt (cạnh × cạnh) nhân với ${k}.` });
      await t.fold(0, 1300);
      t.state(which ? [...SIDES, 'top', 'bot'] : SIDES, 'glow');
      f.finish({ ok: `${a} × ${a} × ${k} = ${fmt(a * a * k)} ${sq(u)}` });
    },
  };
}
const FIVE = [['Phủ kem bốn mặt xung quanh và mặt trên chiếc bánh', 'bot'], ['Sơn bên ngoài chiếc hộp không có nắp', 'top'], ['Dán giấy bốn mặt bên và mặt đáy chậu cây', 'top']];
function taskFive51() {
  return {
    id: 's51five',
    make: (rng) => ({ k: rng.int(0, FIVE.length - 1), a: rng.int(5, 20) }),
    async mount(f, { k, a }) {
      mark('s51five');
      const [what, off] = FIVE[k];
      f.q.innerHTML = `${what} hình lập phương cạnh ${a} cm. Diện tích: ${BOX} cm²`;
      const t = cubeBoard(f);
      t.state(off, 'off');
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: a * a * 5, max: 6, say: `${what} hình lập phương cạnh ${a} xăng-ti-mét. Tính diện tích.`,
        hint: (v) => (v === a * a * 6 ? 'Có một mặt không tính.' : v === a * a * 4 ? 'Còn một mặt nữa.' : 'Đếm số mặt cần tính, rồi nhân với diện tích một mặt.') });
      await t.fold(0, 1300);
      t.state(off, 'off');
      t.state([...SIDES, off === 'top' ? 'bot' : 'top'], 'glow');
      await showSteps(t, [`1 mặt: ${a} × ${a} = ${a * a}`, `${a * a} × 5`, `= ${fmt(a * a * 5)} (cm²)`]);
      f.finish({ ok: `5 mặt: ${a * a} × 5 = ${fmt(a * a * 5)} cm²` });
    },
  };
}
function taskJoin51() {
  return {
    id: 's51join',
    make: (rng) => ({ a: rng.int(2, 9) }),
    async mount(f, { a }) {
      mark('s51join');
      f.q.innerHTML = `Ghép 2 hình lập phương cạnh ${a} cm thành hình hộp chữ nhật. S<sub>tp</sub> hình hộp = ${BOX} cm²`;
      const t = createCubes(f.tool, { steps: 3 });
      t.set([{ dims: [2, 1, 1], color: (i) => (i ? 'orange' : 'yellow'), labels: { a: `${2 * a} cm`, b: `${a} cm`, c: `${a} cm` } }], { maxS: 150 });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: a * a * 10, max: 5, say: `Ghép hai hình lập phương cạnh ${a} xăng-ti-mét thành hình hộp chữ nhật. Tính diện tích toàn phần của hình hộp.`,
        hint: (v) => (v === a * a * 12 ? 'Hai mặt áp vào nhau bị che mất, không tính.' : `Hình hộp dài ${2 * a} cm, rộng ${a} cm, cao ${a} cm. Hoặc: 12 mặt nhỏ bớt 2 mặt áp vào nhau.`) });
      await t.shift(0, (i) => i === 1, 0.8);
      await showSteps(t, [`2 khối: ${a * a} × 12 = ${a * a * 12}`, `bớt 2 mặt áp vào nhau`, `${a * a * 12} − ${a * a * 2} = ${a * a * 10} (cm²)`]);
      await t.shift(0, (i) => i === 1, 0);
      f.finish({ ok: `Stp = ${a * a} × 10 = ${a * a * 10} cm², không gấp 2 lần ${a * a * 6}.` });
    },
  };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Bài 52. Thể tích của hình hộp chữ nhật
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
const B52 = {
  explore: {
    setup: (board) => createCubes(board, { steps: 3 }),
    steps: [
      async (c) => {
        const t = c.t;
        t.set([{ box: [6, 5, 4], dims: [6, 5, 4], color: 'yellow', hidden: true, labels: { a: '6 dm', b: '5 dm', c: '4 dm' } }], { maxS: 90 });
        t.caption('Hộp kính dài <b>6 dm</b>, rộng <b>5 dm</b>, cao <b>4 dm</b>');
        await c.say('Bạn xếp các hình lập phương 1 đề-xi-mét khối vào hộp kính dài 6, rộng 5, cao 4 đề-xi-mét. Xếp lớp đáy trước. Bấm vào hộp.', 'Bấm vào hộp để xếp <b>lớp đáy</b>');
        await waitTap(c, t, 0, 'Bấm vào hộp kính.');
        await revealLayer(t, 0, 0, (n) => t.caption(`Lớp đáy: <b>${n}</b> hình`));
        await c.say('Lớp đáy có mấy hình?');
        await c.choose([11, 30, 22].map(v => ({ html: String(v), value: v })), 30, { hint: '5 hàng, mỗi hàng 6 hình.' });
        t.caption('Lớp đáy: <b>6 × 5 = 30</b> hình');
        await c.say('Lớp đáy có 5 hàng, mỗi hàng 6 hình: 6 nhân 5 bằng 30 hình.');
      },
      async (c) => {
        const t = c.t;
        await c.say('Hộp cao 4 đề-xi-mét nên xếp được 4 lớp như thế. Bấm để xếp tiếp.', 'Bấm để xếp <b>các lớp còn lại</b>');
        await c.choose([{ html: '🧊 Xếp tiếp', value: 1 }], 1);
        await t.reveal(0, { by: 'layer', count: (n) => t.caption(`Đã xếp thêm <b>${n}</b> hình`) });
        t.caption('4 lớp, mỗi lớp 30 hình: <b>6 × 5 × 4 = 120</b> hình');
        await showSteps(t, ['V = 6 × 5 × 4', '= 120 (dm³)']);
        await c.say('4 lớp, mỗi lớp 30 hình: 120 hình lập phương 1 đề-xi-mét khối. Thể tích hộp là 120 đề-xi-mét khối.');
        await c.say('Muốn tính thể tích hình hộp chữ nhật, ta lấy chiều dài nhân với chiều rộng rồi nhân với chiều cao, cùng một đơn vị đo.', 'V = <b>a × b × c</b>');
      },
      async (c) => {
        const t = c.use((b) => createCubes(b, { steps: 2 }));
        t.set([{ solid: { a: 8, b: 5, c: 6, n: 1 }, color: 'blue', labels: { a: '8 cm', b: '5 cm', c: '6 cm' } }], { maxS: 60 });
        t.caption('Dài <b>8 cm</b>, rộng <b>5 cm</b>, cao <b>6 cm</b>');
        await c.say('Hình hộp chữ nhật dài 8, rộng 5, cao 6 xăng-ti-mét. Thể tích là bao nhiêu?');
        await c.choose(['40 cm³', '240 cm³', '240 cm²', '156 cm²'].map(v => ({ html: v, value: v })), '240 cm³', { hint: (v) => (v === '40 cm³' ? 'Mới nhân dài với rộng. Còn nhân chiều cao.' : v === '240 cm²' ? 'Thể tích dùng đơn vị khối cm³.' : 'Đó là diện tích toàn phần. Thể tích = dài × rộng × cao.') });
        await showSteps(t, ['V = 8 × 5 × 6', '= 240 (cm³)']);
      },
      async (c) => {
        const t = c.use((b) => createCubes(b, { steps: 2 }));
        t.set([{ box: [5, 3, 4], cells: [], water: 2, label: 'Trước', labels: { a: '5 dm', b: '3 dm' } }, { box: [5, 3, 4], cells: [], water: 3, stone: 0.9, label: 'Sau' }], { gap: 1.8, maxS: 80 });
        t.caption('Thả tảng đá: nước dâng từ <b>2 dm</b> lên <b>3 dm</b>');
        await c.say('Bể dài 5, rộng 3 đề-xi-mét, nước cao 2 đề-xi-mét. Thả tảng đá chìm vào, nước dâng lên 3 đề-xi-mét. Thể tích tảng đá bằng thể tích phần nước dâng lên. Thể tích đá là bao nhiêu?');
        await c.choose(['15 dm³', '45 dm³', '30 dm³'].map(v => ({ html: v, value: v })), '15 dm³', { hint: (v) => (v === '45 dm³' ? 'Đó là cả nước lẫn đá. Chỉ tính phần nước dâng lên, cao 1 dm.' : 'Phần nước dâng lên cao 3 − 2 = 1 dm.') });
        await showSteps(t, ['5 × 3 × (3 − 2)', '= 15 (dm³)']);
      },
    ],
  },
  tasks: () => [taskCalc52(), taskLayer52(), taskChoose52(), taskStone52(), taskFit52(), taskUnit52()],
};

/** Hiện một lớp j của hình n (rơi từng hàng). */
async function revealLayer(t, n, j, count) {
  const els = t.cubeEls(n).filter(e => +e.dataset.k.split(',')[1] === j && e.classList.contains('g5c-hid'));
  const rows = [...new Set(els.map(e => +e.dataset.k.split(',')[2]))].sort((p, q) => q - p);
  let done = 0;
  for (const k of rows) {
    const batch = els.filter(e => +e.dataset.k.split(',')[2] === k);
    batch.forEach(e => { e.classList.remove('g5c-hid'); e.animate([{ transform: `translateY(${-t.size() * 2}px)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: anim(380), easing: 'cubic-bezier(.3,1.25,.5,1)' }); });
    done += batch.length;
    count?.(done);
    await sleep(anim(300));
  }
  await sleep(anim(300));
}

/** Hình hộp vẽ được bằng các hình lập phương (đủ nhỏ) hoặc khối liền có ghi kích thước. */
function drawBox(t, a, b, c, u, { hidden = false, box = false } = {}) {
  const small = [a, b, c].every(Number.isInteger) && a * b * c <= 150 && Math.max(a, b, c) <= 8;
  const labels = { a: `${D(a)} ${u}`, b: `${D(b)} ${u}`, c: `${D(c)} ${u}` };
  if (small) t.set([{ dims: [a, b, c], ...(box ? { box: [a, b, c] } : {}), hidden, color: 'yellow', labels }], { maxS: 80 });
  else t.set([{ solid: { a, b, c, n: 1 }, color: 'blue', labels }], { maxS: 80 });
  return small;
}
function taskCalc52() {
  return {
    id: 'v52calc',
    make: (rng) => {
      const u = rng.pick(['cm', 'dm', 'm']);
      if (rng() < 0.3) return { a: rng.int(11, 40) / 10, b: rng.int(2, 9) / (u === 'm' ? 10 : 1), c: rng.int(2, 8), u };
      if (rng() < 0.5) return { a: rng.int(3, 8), b: rng.int(2, 5), c: rng.int(2, 5), u };
      return { a: rng.int(8, 25), b: rng.int(4, 15), c: rng.int(3, 12), u };
    },
    async mount(f, { a, b, c, u }) {
      mark('v52calc');
      const V = a * b * c;
      f.q.innerHTML = `Hình hộp chữ nhật ${dimTxt(a, b, c, u)}. V = ${BOX} ${cu(u)}`;
      const t = createCubes(f.tool, { steps: 2 });
      const small = drawBox(t, a, b, c, u, { hidden: true, box: true });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: A(V), max: 8, say: `Hình hộp chữ nhật ${dimSay(a, b, c, u)}. Tính thể tích.`,
        hint: (v) => (Math.abs(v - a * b) < 1e-9 ? 'Mới nhân dài với rộng. Còn nhân với chiều cao.' : Math.abs(v - (a + b) * 2 * c) < 1e-9 ? 'Đó là diện tích xung quanh. V = dài × rộng × cao.' : 'Lấy chiều dài nhân chiều rộng rồi nhân chiều cao.') });
      if (small) await t.reveal(0, { by: 'layer' });
      await showSteps(t, [`V = ${D(a)} × ${D(b)} × ${D(c)}`, `= ${D(V)} (${cu(u)})`]);
      f.finish({ ok: `V = ${D(a)} × ${D(b)} × ${D(c)} = ${D(V)} ${cu(u)}` });
    },
  };
}
function taskLayer52() {
  return {
    id: 'v52layer',
    make: (rng) => ({ a: rng.int(3, 6), b: rng.int(2, 4), c: rng.int(2, 4) }),
    async mount(f, { a, b, c }) {
      mark('v52layer');
      f.q.innerHTML = `Mỗi lớp ${BOX} hình. Hộp chứa ${BOX} hình 1 cm³.`;
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      const t = createCubes(f.tool);
      t.set([{ box: [a, b, c], dims: [a, b, c], hidden: true, color: 'green', labels: { a: `${a} cm`, b: `${b} cm`, c: `${c} cm` } }], { maxS: 80 });
      await revealLayer(t, 0, 0);
      await f.ask({ box: b1, answer: a * b, max: 3, say: 'Xếp các hình lập phương 1 xăng-ti-mét khối vào hộp. Mỗi lớp có bao nhiêu hình?', hint: `Lớp đáy có ${b} hàng, mỗi hàng ${a} hình.` });
      await f.ask({ box: b2, answer: a * b * c, max: 4, say: `Hộp cao ${c} xăng-ti-mét, xếp được ${c} lớp. Hộp chứa bao nhiêu hình?`, hint: `${a * b} hình mỗi lớp, ${c} lớp.` });
      await t.reveal(0, { by: 'layer' });
      t.caption(`${a} × ${b} × ${c} = <b>${a * b * c}</b> cm³`);
      f.finish({ ok: `${a * b} × ${c} = ${a * b * c} hình: thể tích ${a * b * c} cm³.` });
    },
  };
}
function taskChoose52() {
  return {
    id: 'v52choose',
    make: (rng) => { const a = rng.int(4, 12), b = rng.int(2, a - 1); return { a, b, c: rng.int(2, 9), u: rng.pick(['cm', 'dm', 'm']) }; },
    async mount(f, { a, b, c, u }) {
      mark('v52choose');
      const right = `${fmt(a * b * c)} ${cu(u)}`;
      f.q.innerHTML = `Hình hộp chữ nhật ${dimTxt(a, b, c, u)}. Thể tích là:`;
      const t = createCubes(f.tool);
      drawBox(t, a, b, c, u);
      await f.choose({ options: opts([right, `${fmt(a * b * c)} ${sq(u)}`, `${fmt((a + b) * 2 * c)} ${sq(u)}`, `${fmt(a * b)} ${cu(u)}`], a * 3 + b + c), answer: right,
        say: 'Chọn thể tích đúng của hình hộp chữ nhật.', hint: 'V = dài × rộng × cao, đơn vị khối.' });
      f.finish({ ok: `V = ${a} × ${b} × ${c} = ${right}` });
    },
  };
}
function taskStone52() {
  return {
    id: 'v52stone',
    make: (rng) => { const h1 = rng.int(2, 5); return { a: rng.int(4, 10), b: rng.int(3, 6), h1, d: rng.pick([1, 1, 2, 0.5]) }; },
    async mount(f, { a, b, h1, d }) {
      mark('v52stone');
      const h2 = clean(h1 + d), H = Math.ceil(h2 + 1);
      const V = clean(a * b * d);
      f.q.innerHTML = `Bể dài ${a} dm, rộng ${b} dm. Thả đá vào, nước dâng từ ${h1} dm lên ${D(h2)} dm. Thể tích đá: ${BOX} dm³`;
      const t = createCubes(f.tool, { steps: 2 });
      const sc = 6 / Math.max(a, H * 1.2);
      t.set([{ box: [a * sc, b * sc, H * sc], cells: [], water: h1 * sc, label: 'Trước' }, { box: [a * sc, b * sc, H * sc], cells: [], water: h2 * sc, stone: Math.min(1, d * sc + 0.4), label: 'Sau' }], { gap: 1.6, maxS: 90 });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: A(V), max: 6, say: `Bể dài ${a}, rộng ${b} đề-xi-mét. Thả tảng đá chìm vào, nước dâng từ ${h1} lên ${D(h2)} đề-xi-mét. Thể tích tảng đá là bao nhiêu?`,
        hint: (v) => (Math.abs(v - a * b * h2) < 1e-9 ? 'Đó là cả nước và đá. Chỉ lấy phần nước dâng lên.' : `Phần nước dâng lên cao ${D(h2)} − ${h1} = ${D(d)} dm.`) });
      await showSteps(t, [`${a} × ${b} × (${D(h2)} − ${h1})`, `= ${D(V)} (dm³)`]);
      f.finish({ ok: `Thể tích đá = thể tích nước dâng: ${a} × ${b} × ${D(d)} = ${D(V)} dm³` });
    },
  };
}
function taskFit52() {
  return {
    id: 'v52fit',
    make: (rng) => { const p = rng.pick([2, 3, 4]); return { p, a: p * rng.int(1, 3), b: rng.int(2, 4), c: rng.int(2, 4) }; },
    async mount(f, { p, a, b, c }) {
      mark('v52fit');
      const n = (a * b * c) / p;
      f.q.innerHTML = `Xếp các khối gỗ ${p} cm × 1 cm × 1 cm vào hộp ${a} cm × ${b} cm × ${c} cm. Nhiều nhất ${BOX} khối.`;
      const t = createCubes(f.tool);
      t.set([{ box: [a, b, c], dims: [a, b, c], hidden: true, color: (i) => (Math.floor(i / p) % 2 ? 'orange' : 'yellow') }], { maxS: 80 });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: n, max: 4, say: `Xếp các khối gỗ dài ${p} xăng-ti-mét vào hộp. Xếp được nhiều nhất bao nhiêu khối?`,
        hint: (v) => (v === a * b * c ? `Mỗi khối gỗ chiếm ${p} ô, không phải 1 ô.` : `Hộp có ${a * b * c} cm³, mỗi khối ${p} cm³. Chiều dài ${a} cm vừa ${a / p} khối.`) });
      await t.reveal(0, { by: 'row' });
      t.caption(`${a * b * c} : ${p} = <b>${n}</b> khối`);
      f.finish({ ok: `V hộp ${a * b * c} cm³, mỗi khối ${p} cm³: ${n} khối, xếp vừa khít.` });
    },
  };
}
function taskUnit52() {
  return {
    id: 'v52unit',
    make: (rng) => ({ a: rng.int(10, 20) / 10, b: rng.int(3, 9), c: rng.int(2, 8) * 10 }),
    async mount(f, { a, b, c }) {
      mark('v52unit');
      const ad = clean(a * 10), cd = c / 10, V = clean(ad * b * cd);
      f.q.innerHTML = `Hộp dài ${D(a)} m, rộng ${b} dm, cao ${c} cm. V = ${BOX} dm³`;
      const t = createCubes(f.tool, { steps: 2 });
      t.set([{ solid: { a: ad, b, c: cd, n: 1 }, color: 'green', labels: { a: `${D(a)} m`, b: `${b} dm`, c: `${c} cm` } }], { maxS: 70 });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: A(V), max: 6, say: `Hộp dài ${D(a)} mét, rộng ${b} đề-xi-mét, cao ${c} xăng-ti-mét. Tính thể tích theo đề-xi-mét khối.`,
        hint: (v) => (Math.abs(v - a * b * c) < 1e-9 ? 'Ba kích thước khác đơn vị. Đổi hết ra đề-xi-mét trước.' : `${D(a)} m = ${D(ad)} dm; ${c} cm = ${D(cd)} dm.`) });
      await showSteps(t, [`${D(ad)} × ${b} × ${D(cd)}`, `= ${D(V)} (dm³)`]);
      f.finish({ ok: `Đổi ra dm: ${D(ad)} × ${b} × ${D(cd)} = ${D(V)} dm³` });
    },
  };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Bài 53. Thể tích của hình lập phương
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
const B53 = {
  explore: {
    setup: (board) => createCubes(board, { steps: 2 }),
    steps: [
      async (c) => {
        const t = c.t;
        t.set([{ dims: [3, 3, 3], hidden: true, color: 'pink', labels: { a: '3 cm', b: '3 cm', c: '3 cm' } }], { maxS: 110 });
        t.caption('Hình lập phương cạnh <b>3 cm</b>');
        await c.say('Hình lập phương cũng là hình hộp chữ nhật có ba kích thước bằng nhau. Xếp hình lập phương cạnh 3 xăng-ti-mét bằng các hình 1 xăng-ti-mét khối. Bấm vào khung.', 'Bấm để <b>xếp</b>');
        await waitTap(c, t, 0, 'Bấm vào khung hình.');
        await t.reveal(0, { by: 'layer', count: (n) => t.caption(`Đã xếp <b>${n}</b> hình 1 cm³`) });
        await c.say('Mỗi lớp 3 nhân 3 bằng 9 hình, có 3 lớp. Thể tích là bao nhiêu?');
        await c.choose(['9 cm³', '27 cm³', '18 cm³'].map(v => ({ html: v, value: v })), '27 cm³', { hint: (v) => (v === '9 cm³' ? 'Đó mới là một lớp.' : 'Cạnh nhân cạnh rồi nhân cạnh: 3 × 3 × 3.') });
        await showSteps(t, ['V = 3 × 3 × 3', '= 27 (cm³)']);
        await c.say('Muốn tính thể tích hình lập phương, ta lấy cạnh nhân với cạnh rồi nhân với cạnh.', 'V = <b>a × a × a</b>');
      },
      async (c) => {
        const t = c.use((b) => createCubes(b, { steps: 2 }));
        t.set([{ solid: { a: 6, b: 6, c: 6, n: 1 }, color: 'orange', labels: { a: '6 cm', b: '6 cm', c: '6 cm' } }], { maxS: 50 });
        t.caption('Khối ru-bích cạnh <b>6 cm</b>');
        await c.say('Khối ru-bích hình lập phương cạnh 6 xăng-ti-mét. Thể tích là bao nhiêu?');
        await c.choose(['36 cm²', '216 cm²', '36 cm³', '216 cm³'].map(v => ({ html: v, value: v })), '216 cm³', { hint: (v) => (v.startsWith('36') ? '36 là diện tích một mặt. Còn nhân thêm cạnh.' : 'Thể tích dùng đơn vị khối cm³.') });
        await showSteps(t, ['V = 6 × 6 × 6', '= 216 (cm³)']);
      },
      async (c) => {
        const t = c.use((b) => createCubes(b));
        t.set([{ dims: [3, 3, 2], color: 'blue', label: 'Mai' }, { dims: [2, 2, 2], color: 'yellow', label: 'Rô-bốt' }], { gap: 1.8 });
        t.caption('Mai bỏ bớt bao nhiêu hình để được hình như Rô-bốt?');
        await c.say('Hình của Mai gồm 3 nhân 3 nhân 2 bằng 18 hình. Hình của Rô-bốt là hình lập phương 2 nhân 2 nhân 2. Mai phải bỏ đi bao nhiêu hình?');
        await c.choose([6, 8, 10, 12].map(v => ({ html: String(v), value: v })), 10, { hint: 'Hình của Rô-bốt có 2 × 2 × 2 = 8 hình. 18 − 8.' });
        await t.remove(0, (i, j, k) => i === 2 || k === 2);
        t.caption('18 − 8 = <b>10</b> hình');
        await c.say('Bỏ đi 10 hình, còn lại 8 hình: đúng hình lập phương của Rô-bốt.');
      },
    ],
  },
  tasks: () => [taskCalc53(), taskChoose53(), taskRemove53(), taskScale53(), taskCake53()],
};
function taskCalc53() {
  return {
    id: 'v53calc',
    make: (rng) => {
      if (rng() < 0.35) { const [a, u] = rng.pick([[1.5, 'dm'], [2.5, 'dm'], [0.4, 'm'], [0.6, 'm'], [1.2, 'm'], [0.5, 'm'], [1.1, 'dm']]); return { a, u }; }
      return { a: rng.int(2, 12), u: rng.pick(['cm', 'dm', 'm']) };
    },
    async mount(f, { a, u }) {
      mark('v53calc');
      const V = clean(a * a * a);
      f.q.innerHTML = `Hình lập phương cạnh ${D(a)} ${u}. V = ${BOX} ${cu(u)}`;
      const t = createCubes(f.tool, { steps: 2 });
      const small = Number.isInteger(a) && a <= 5;
      if (small) t.set([{ dims: [a, a, a], hidden: true, color: 'pink', labels: { a: `${a} ${u}`, b: `${a} ${u}`, c: `${a} ${u}` } }], { maxS: 90 });
      else t.set([{ solid: { a: 1, b: 1, c: 1, n: 1 }, color: 'pink', labels: { a: `${D(a)} ${u}`, b: `${D(a)} ${u}`, c: `${D(a)} ${u}` } }], { maxS: 220 });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: A(V), max: 8, say: `Hình lập phương cạnh ${D(a)} ${US[u]}. Tính thể tích.`,
        hint: (v) => (Math.abs(v - a * 3) < 1e-9 ? 'Không phải cạnh × 3. Lấy cạnh × cạnh × cạnh.' : Math.abs(v - a * a) < 1e-9 ? 'Đó là diện tích một mặt. Nhân thêm cạnh.' : 'Cạnh nhân cạnh rồi nhân cạnh. Đếm đủ chữ số ở phần thập phân.') });
      if (small) await t.reveal(0, { by: 'layer' });
      await showSteps(t, [`V = ${D(a)} × ${D(a)} × ${D(a)}`, `= ${D(V)} (${cu(u)})`]);
      f.finish({ ok: `V = ${D(a)} × ${D(a)} × ${D(a)} = ${D(V)} ${cu(u)}` });
    },
  };
}
function taskChoose53() {
  return {
    id: 'v53choose',
    make: (rng) => ({ a: rng.int(3, 10), u: rng.pick(['cm', 'dm']), what: rng.int(0, 2) }),
    async mount(f, { a, u, what }) {
      mark('v53choose');
      const name = ['Khối ru-bích', 'Hộp quà', 'Viên đá lạnh lớn'][what];
      const right = `${fmt(a ** 3)} ${cu(u)}`;
      f.q.innerHTML = `${name} hình lập phương cạnh ${a} ${u}. Thể tích là:`;
      const t = createCubes(f.tool);
      t.set([{ solid: { a: 1, b: 1, c: 1, n: Math.min(a, 6) }, color: ['orange', 'pink', 'blue'][what], labels: { a: `${a} ${u}`, b: `${a} ${u}`, c: `${a} ${u}` } }], { maxS: 220 });
      await f.choose({ options: opts([right, `${fmt(a ** 3)} ${sq(u)}`, `${fmt(a * a)} ${cu(u)}`, `${fmt(a * a)} ${sq(u)}`], a + what), answer: right,
        say: `${name} hình lập phương cạnh ${a} ${US[u]}. Chọn thể tích đúng.`, hint: (v) => (v.endsWith('²') ? 'Thể tích dùng đơn vị khối.' : 'Cạnh × cạnh × cạnh, không phải cạnh × cạnh.') });
      f.finish({ ok: `V = ${a} × ${a} × ${a} = ${right}` });
    },
  };
}
function taskRemove53() {
  return {
    id: 'v53remove',
    make: (rng) => { const s = rng.int(2, 3); return { s, a: s + rng.int(1, 2), h: s + rng.int(0, 1) }; },
    async mount(f, { s, a, h }) {
      mark('v53remove');
      const all = a * a * h, keep = s ** 3;
      f.q.innerHTML = `Bỏ bớt ${BOX} hình để được hình lập phương ${s} × ${s} × ${s}.`;
      const t = createCubes(f.tool);
      t.set([{ dims: [a, a, h], color: 'blue', label: `${a} × ${a} × ${h}` }, { dims: [s, s, s], color: 'yellow', label: `${s} × ${s} × ${s}` }], { gap: 1.8 });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: all - keep, max: 3, say: `Hình xanh gồm ${a} nhân ${a} nhân ${h} hình. Phải bỏ bớt bao nhiêu hình để được hình lập phương cạnh ${s}?`,
        hint: `Hình xanh có ${a} × ${a} × ${h} = ${all} hình, hình vàng có ${s} × ${s} × ${s} = ${keep} hình.` });
      await t.remove(0, (i, j, k) => i >= s || j >= s || k >= s);
      t.caption(`${all} − ${keep} = <b>${all - keep}</b>`);
      f.finish({ ok: `${all} − ${keep} = ${all - keep} hình.` });
    },
  };
}
function taskScale53() {
  return {
    id: 'v53scale',
    make: (rng) => ({ n: rng.int(2, 4), s: rng.int(2, 5) }),
    async mount(f, { n, s }) {
      mark('v53scale');
      const e = n * s, V = e ** 3;
      f.q.innerHTML = `Xếp ${n} × ${n} × ${n} hình lập phương nhỏ cạnh ${s} cm thành hình lập phương lớn. V = ${BOX} cm³`;
      const t = createCubes(f.tool, { steps: 2 });
      t.set([{ dims: [n, n, n], color: 'green', labels: { a: `${e} cm`, b: `${e} cm`, c: `${e} cm` } }], { maxS: 90 });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: V, max: 6, say: `Xếp các hình lập phương nhỏ cạnh ${s} xăng-ti-mét thành hình lập phương lớn, mỗi cạnh ${n} hình. Tính thể tích hình lớn.`,
        hint: (v) => (v === n ** 3 ? `Đó là số hình nhỏ. Mỗi hình nhỏ có thể tích ${s ** 3} cm³.` : v === n ** 3 * s * s ? 'Mỗi hình nhỏ có thể tích cạnh × cạnh × cạnh.' : `Cạnh hình lớn: ${n} × ${s} = ${e} cm.`) });
      await showSteps(t, [`Cạnh: ${n} × ${s} = ${e} (cm)`, `V = ${e} × ${e} × ${e} = ${fmt(V)} (cm³)`]);
      f.finish({ ok: `Cạnh ${e} cm: V = ${fmt(V)} cm³ (= ${n ** 3} × ${s ** 3}).` });
    },
  };
}
function taskCake53() {
  return {
    id: 'v53cake',
    make: (rng) => { const h = rng.int(3, 6); return { h, a: h * 2 }; },
    async mount(f, { a, h }) {
      mark('v53cake');
      const V = a * a * h, cut = h ** 3;
      f.q.innerHTML = `Bánh đáy vuông cạnh ${a} cm, cao ${h} cm. Cắt ra một miếng lập phương cạnh ${h} cm. Phần còn lại: ${BOX} cm³`;
      const t = createCubes(f.tool, { steps: 3 });
      t.set([{ dims: [2, 2, 1], color: (i, j, k) => (i === 1 && k === 0 ? 'pink' : 'yellow'), labels: { a: `${a} cm`, b: `${a} cm`, c: `${h} cm` } }], { maxS: 140 });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: V - cut, max: 5, say: `Bánh hình hộp đáy vuông cạnh ${a}, cao ${h} xăng-ti-mét. Cắt một miếng hình lập phương cạnh ${h} xăng-ti-mét. Thể tích phần còn lại là bao nhiêu?`,
        hint: (v) => (v === V ? 'Còn trừ đi miếng đã cắt.' : `Cả bánh: ${a} × ${a} × ${h}. Miếng cắt: ${h} × ${h} × ${h}.`) });
      await t.shift(0, (i, j, k) => i === 1 && k === 0, 0.9, 0.4);
      await showSteps(t, [`Cả bánh: ${a} × ${a} × ${h} = ${V}`, `Miếng cắt: ${h} × ${h} × ${h} = ${cut}`, `${V} − ${cut} = ${V - cut} (cm³)`]);
      f.finish({ ok: `${V} − ${cut} = ${V - cut} cm³` });
    },
  };
}

let styled = false;
function injectVolStyles() {
  if (styled) return;
  styled = true;
  css('g5-vol', `
    .g5v-tab { flex: 1; min-height: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 3cqh; font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .g5v-tab table { border-collapse: collapse; font-size: min(6.4cqh, 3.6cqi); background: #fff; }
    .g5v-tab th { background: #DBEAFE; color: #1E3A8A; font-weight: 800; }
    .g5v-tab th, .g5v-tab td { border: 1.5px solid #94A3B8; padding: 0.25em 0.8em; text-align: left; }
    .g5v-tab td:last-child { text-align: right; white-space: nowrap; }
    .g5v-calc { font-size: min(6.4cqh, 3.8cqi); font-weight: 800; min-height: 1.3em; text-align: center; }
    .g5v-calc b { color: #DC2626; }
    @container (orientation: portrait) { .g5v-tab table { font-size: min(4.4cqh, 4.6cqi); } .g5v-calc { font-size: min(4.6cqh, 5.2cqi); } }
  `);
}

export const VOLUME_LESSONS = { 45: B45, 46: B46, 47: B47, 49: B49, 50: B50, 51: B51, 52: B52, 53: B53 };

// ── Luyện Tính lớp 5 ──────────────────────────────────────────────────────────────────────────────────
export const VOLUME_DRILL_LEVELS = [
  { id: 'd5-vol-1', n: 1, title: 'Đếm thể tích', desc: 'Đếm hình lập phương cả lớp phía sau, hình bị khuyết, xếp theo lớp.', knowledge: 'thể tích một hình, xếp lớp', sgk: 45,
    say: 'Đếm cả các hình ở phía sau. Đếm theo lớp cho nhanh!', tasks: [taskCount45(), taskMiss45(), taskCount46(), taskLayer52()] },
  { id: 'd5-vol-2', n: 2, title: 'Đổi đơn vị thể tích', desc: 'Vd. 5 dm³ 6 cm³ = 5 006 cm³; 2 400 dm³ = 2,4 m³; 250 cm³ = 0,25 dm³.', knowledge: 'm³, dm³, cm³, mỗi bậc gấp 1 000', sgk: 47,
    say: 'Mỗi đơn vị đo thể tích có ba ô chữ số, gấp 1 000 lần!', tasks: [taskConv46(), taskConv47(), taskCalc46(), taskCalc47()] },
  { id: 'd5-vol-3', n: 3, title: 'Diện tích xung quanh, toàn phần', desc: 'Hình hộp chữ nhật, hình lập phương, bể không nắp.', knowledge: 'Sxq = chu vi đáy × chiều cao; Stp = Sxq + 2 đáy', sgk: 50,
    say: 'Xung quanh là bốn mặt bên. Toàn phần thì cộng thêm hai đáy!', tasks: [taskSxq50(), taskStp50(), taskTank50(), taskSxq51(), taskStp51(), taskFive51()] },
  { id: 'd5-vol-4', n: 4, title: 'Thể tích hình hộp, hình lập phương', desc: 'V = a × b × c; V = a × a × a; nước dâng, đổi cùng đơn vị.', knowledge: 'thể tích hình hộp chữ nhật, hình lập phương', sgk: 52,
    say: 'Dài nhân rộng nhân cao, cùng một đơn vị đo!', tasks: [taskCalc52(), taskCalc53(), taskStone52(), taskUnit52(), taskScale53()] },
];

export { NET_COLORS, clashes };
