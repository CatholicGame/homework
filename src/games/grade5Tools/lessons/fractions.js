/**
 * 🍫 Phân số (Toán 5 Tập Một): Bài 3 Ôn tập phân số, Bài 5 Ôn tập các phép tính với phân số,
 * Bài 6 Cộng, trừ hai phân số khác mẫu số, Bài 7 Hỗn số. Công cụ: grade5Tools/frac.js (băng, bình nước, bánh, mô hình diện tích).
 *   Bài 3: tô phần, gộp phần (24/40 = 12/20 = 3/5, tối giản), chia lại phần (quy đồng 3/5 và 7/10), cùng tử so mẫu.
 *   Bài 5: cộng cùng mẫu, lỗi "cộng tử với tử, mẫu với mẫu", nhân bằng mô hình diện tích, chia = nhân đảo ngược, phân số của một số.
 *   Bài 6: Việt đổ 1/5 l, Mai đổ 1/2 l: quy đồng thì vạch ca chia lại thành 10, đổ chung 7/10 l; 1/2 − 1/5 = 3/10.
 *   Bài 7: chia 5 bánh trung thu cho 4 bạn → 1 1/4; hỗn số ↔ phân số trên băng.
 * Cuối file: FRACTION_DRILL_LEVELS / FRACTION_DRILL_TASKS cho Luyện Tính lớp 5 (🍫 Phân số).
 */

import { createFrac, COL, svgFrac, svgMixed, svgText } from '../frac.js';
import { BOX } from '../../grade4Tools/practice.js';
import { INK, sfx } from '../../grade4Tools/frame.js';
import { sleep } from '../../grade3Drills/kit.js';
import { fr, mixed, frSay, mixedSay, readVN, gcd, simp } from '../num.js';

/** Phần đáy tờ giấy chừa cho nút chọn / nút công cụ trong Khám phá. */
const RES = 0.22;
const X0 = 110, BW = 700; // băng: lề trái (chừa tên), bề rộng (chừa nhãn phân số bên phải)

/** n hàng xếp dọc trong vùng [top, bottom]: [{ y, h }]. */
function rowsY(t, n, { top = 20, bottom = t.bot - 14, maxH = t.tall ? 190 : 120 } = {}) {
  const slot = (bottom - top) / n;
  const h = Math.min(maxH, slot * 0.68);
  return [...Array(n)].map((_, i) => ({ y: top + slot * i + (slot - h) / 2, h }));
}
const bar = (t, id, row, spec = {}) => t.fig(id, { kind: 'bar', x: X0, y: row.y, w: BW, h: row.h, lab: true, ...spec });
/** Bay bản sao hình `from` xuống hàng `row` thành hình mới `to`. */
async function copyDown(t, from, to, row) {
  const f = t.get(from);
  const clone = await t.fly(f.g, 0, row.y - f.y, 650);
  clone.remove();
  const { g, uid, id, ...spec } = f;
  return t.fig(to, { ...spec, y: row.y, h: row.h });
}
const gt = '&gt;', lt = '&lt;';
const signHtml = (s) => (s === '>' ? gt : s === '<' ? lt : s);
const signWord = (s) => (s === '>' ? 'lớn hơn' : s === '<' ? 'bé hơn' : 'bằng');

// ══ Bài 3. Ôn tập phân số ═════════════════════════════════════════════════════════════════════════════
const B3 = {
  explore: {
    setup: (board) => createFrac(board, { reserve: RES }),
    steps: [
      async (c) => {
        const t = c.t;
        t.clear();
        const [r] = rowsY(t, 1, { maxH: t.tall ? 230 : 160 });
        bar(t, 'a', r, { n: 5, k: 0, lab: false });
        t.caption('Băng giấy chia <b>5 phần bằng nhau</b>');
        await c.say('Băng giấy được chia thành 5 phần bằng nhau. Em hãy bấm để tô 3 phần.', 'Bấm để tô <b>3 phần</b>.');
        t.tappable('a');
        await c.until(t, () => t.get('a').k === 3, { nudge: 'Bấm vào phần thứ ba tính từ bên trái.', el: () => t.figEl('a') });
        t.tappable('a', false);
        t.set('a', { k: 3, lab: true });
        t.caption(`${fr(3, 5)}: tô <b>3</b> phần, chia <b>5</b> phần`);
        await c.say('Đã tô 3 trong 5 phần bằng nhau: ba phần năm. Mẫu số 5 là số phần bằng nhau. Tử số 3 là số phần được tô.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 3);
        bar(t, 'a', R[0], { n: 40, k: 24 });
        t.caption(`${fr(24, 40)} = ?`);
        await c.say('Băng này chia 40 phần, tô 24 phần: hai mươi bốn phần bốn mươi. Gộp các phần lại để có phân số gọn hơn.');
        let [b] = t.btns([{ html: '🧩 Gộp 2 phần thành 1' }]);
        await c.tap(b);
        t.btns([]);
        await copyDown(t, 'a', 'b', R[1]);
        await t.merge('b', 2);
        t.caption(`${fr(24, 40)} = ${fr('24 : 2', '40 : 2')} = ${fr(12, 20)}`);
        await c.say('Chia cả tử số và mẫu số cho 2, được mười hai phần hai mươi. Phần tô vẫn dài như cũ.');
        [b] = t.btns([{ html: '🧩 Gộp 4 phần thành 1' }]);
        await c.tap(b);
        t.btns([]);
        await copyDown(t, 'b', 'c', R[2]);
        await t.merge('c', 4);
        t.caption(`${fr(12, 20)} = ${fr('12 : 4', '20 : 4')} = ${fr(3, 5)}`);
        await c.say('Chia tiếp cả tử số và mẫu số cho 4, được ba phần năm.');
        t.caption(`${fr(24, 40)} = ${fr(12, 20)} = ${fr(3, 5)}`);
        await c.say('Phần tô của ba băng dài bằng nhau. Vậy hai mươi bốn phần bốn mươi bằng mười hai phần hai mươi và bằng ba phần năm.');
      },
      async (c) => {
        const t = c.t;
        t.caption(`${fr(3, 5)} còn rút gọn được nữa không?`);
        await c.say('Ba phần năm còn rút gọn được nữa không?');
        await c.choose(['Còn rút gọn được', 'Không rút gọn được nữa'], 'Không rút gọn được nữa', { hint: '3 và 5 có cùng chia hết cho số nào lớn hơn 1 không?' });
        t.caption(`${fr(3, 5)} là <b>phân số tối giản</b>`);
        await c.say('3 và 5 không cùng chia hết cho số nào lớn hơn 1. Ba phần năm là phân số tối giản.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 2, { maxH: t.tall ? 210 : 130 });
        bar(t, 'a', R[0], { n: 5, k: 3 });
        bar(t, 'b', R[1], { n: 10, k: 7, color: COL.B });
        t.caption(`So sánh ${fr(3, 5)} và ${fr(7, 10)}`);
        await c.say('So sánh ba phần năm và bảy phần mười. Hai băng chia khác nhau nên chưa so được ngay.');
        await c.say('10 chia hết cho 5, lấy 10 làm mẫu số chung. Chia mỗi phần của băng trên thành 2 phần.', 'Mẫu số chung: <b>10</b>');
        const [b] = t.btns([{ html: '✂️ Chia mỗi phần thành 2' }]);
        await c.tap(b);
        t.btns([]);
        await t.split('a', 2);
        t.caption(`${fr(3, 5)} = ${fr('3 × 2', '5 × 2')} = ${fr(6, 10)}`);
        await c.say('Nhân cả tử số và mẫu số với 2: ba phần năm bằng sáu phần mười. Phần tô không đổi.');
        await c.choose(['>', '<', '='].map(s => ({ html: `${fr(6, 10)} ${signHtml(s)} ${fr(7, 10)}`, value: s })), '<', { hint: 'Cùng mẫu số 10: so sánh hai tử số 6 và 7.' });
        t.caption(`${fr(3, 5)} = ${fr(6, 10)} ${lt} ${fr(7, 10)}`);
        await c.say('Cùng mẫu số, 6 bé hơn 7. Vậy ba phần năm bé hơn bảy phần mười.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 2, { maxH: t.tall ? 210 : 130 });
        bar(t, 'a', R[0], { n: 5, k: 2 });
        bar(t, 'b', R[1], { n: 7, k: 2, color: COL.B });
        t.caption(`So sánh ${fr(2, 5)} và ${fr(2, 7)}`);
        await c.say('Hai phân số cùng tử số 2. Mỗi băng tô 2 phần.');
        await c.choose(['>', '<', '='].map(s => ({ html: `${fr(2, 5)} ${signHtml(s)} ${fr(2, 7)}`, value: s })), '>', { hint: 'Nhìn phần tô: băng nào tô dài hơn?' });
        t.caption(`${fr(2, 5)} ${gt} ${fr(2, 7)}: cùng tử số, mẫu bé hơn thì lớn hơn`);
        await c.say('Băng chia 5 có mỗi phần to hơn. Hai phân số cùng tử số, phân số nào có mẫu số bé hơn thì lớn hơn.');
      },
    ],
  },
  tasks: () => [taskRead(), taskEqual(), taskSimp(), taskIrr(), taskCmp()],
};

// ── Thực hành Bài 3 ──
/** Tô phần: viết phân số (băng hoặc hình tròn). */
function taskRead() {
  return {
    id: 'fread',
    make: (rng) => { const n = rng.int(3, 10); return { n, k: rng.int(1, n - 1), pie: rng.int(0, 1) }; },
    async mount(f, { n, k, pie }) {
      setQ(f, `Phân số chỉ phần tô màu: ${fr(BOX, BOX)}`);
      const t = createFrac(f.tool, { cap: false });
      if (pie) {
        const s = Math.min(t.H - 40, 560);
        t.fig('a', { kind: 'pie', cake: false, x: 500 - s / 2, y: (t.H - s) / 2, w: s, h: s, n, k, color: COL.A });
      } else {
        const [r] = rowsY(t, 1, { bottom: t.H - 20, maxH: t.tall ? 260 : 170 });
        t.fig('a', { kind: 'bar', x: 120, y: r.y, w: 760, h: r.h, n, k });
      }
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: k, say: 'Viết phân số chỉ phần tô màu.', hint: 'Tử số là số phần được tô màu. Đếm các phần tô.' });
      await f.ask({ box: B[1], answer: n, hint: 'Mẫu số là số phần bằng nhau. Đếm tất cả các phần.' });
      f.finish({ ok: `Phần tô màu là ${frSay(k, n)}.` });
    },
  };
}

/** Phân số bằng nhau: a/b = ?/(b×m) hoặc (a×m)/(b×m) = ?/b. Băng dưới chia sẵn, đúng thì tô. */
function taskEqual(id = 'fequal') {
  return {
    id,
    make: (rng) => { const b = rng.int(2, 6); let a; do { a = rng.int(1, b - 1); } while (gcd(a, b) !== 1); return { a, b, m: rng.int(2, b > 4 ? 4 : 5), up: rng.int(0, 1) }; },
    async mount(f, { a, b, m, up }) {
      const [p, q, P, Q] = up ? [a, b, a * m, b * m] : [a * m, b * m, a, b];
      setQ(f, `${fr(p, q)} = ${fr(BOX, Q)}`);
      const t = createFrac(f.tool, { cap: false });
      const R = rowsY(t, 2, { bottom: t.H - 16, maxH: t.tall ? 200 : 110 });
      bar(t, 'a', R[0], { n: q, k: p });
      bar(t, 'b', R[1], { n: Q, k: 0, lab: false, color: COL.B });
      const k = up ? m : m;
      await f.ask({
        box: f.q.querySelector('.g4-box'), answer: P, say: 'Điền tử số để được phân số bằng nhau.',
        hint: up ? `Mẫu số ${q} nhân ${k} được ${Q}. Tử số cũng nhân ${k}.` : `Mẫu số ${q} chia ${k} được ${Q}. Tử số cũng chia ${k}.`,
      });
      await t.shade('b', P);
      t.set('b', { lab: true });
      f.finish({ ok: `${frSay(p, q)} bằng ${frSay(P, Q)}.` });
    },
  };
}

/** Rút gọn đến tối giản: băng chia (p×g) phần, đúng thì gộp lại. */
function taskSimp(id = 'fsimp') {
  return {
    id,
    make: (rng) => {
      let q, p;
      do { q = rng.int(2, 9); p = rng.int(1, q - 1); } while (gcd(p, q) !== 1);
      return { p, q, g: rng.int(2, Math.max(2, Math.min(6, Math.floor(40 / q)))) };
    },
    async mount(f, { p, q, g }) {
      const P = p * g, Q = q * g;
      setQ(f, `Rút gọn: ${fr(P, Q)} = ${fr(BOX, BOX)}<small>Viết phân số tối giản.</small>`);
      const t = createFrac(f.tool, { cap: false });
      const [r] = rowsY(t, 1, { bottom: t.H - 16, maxH: t.tall ? 240 : 190 });
      const fig = bar(t, 'a', r, { n: Q, k: P });
      const B = f.q.querySelectorAll('.g4-box');
      const hint = (v, want, all) => (v !== want && all % v === 0 && v > want ? 'Chưa tối giản: tử số và mẫu số còn cùng chia hết cho một số nữa.' : `Chia cả tử số và mẫu số cho ${g}.`);
      await f.ask({ box: B[0], answer: p, say: 'Rút gọn phân số đến tối giản.', hint: (v) => hint(v, p, P) });
      await f.ask({ box: B[1], answer: q, hint: (v) => hint(v, q, Q) });
      if (fig) await t.merge('a', g);
      f.finish({ ok: `${frSay(P, Q)} rút gọn được ${frSay(p, q)}.` });
    },
  };
}

/** Chọn phân số tối giản trong 4 phân số. */
function taskIrr() {
  return {
    id: 'firr',
    make: (rng) => {
      let q, p;
      do { q = rng.int(4, 15); p = rng.int(2, q + 3); } while (gcd(p, q) !== 1 || p === q);
      const bad = [];
      while (bad.length < 3) {
        const d = rng.int(4, 15), n = rng.int(2, d + 3), g = gcd(n, d);
        if (g > 1 && n !== d && !bad.some(x => x[0] === n && x[1] === d)) bad.push([n, d]);
      }
      const opts = rng.shuffle([[p, q], ...bad]);
      return { opts, ans: opts.findIndex(o => o[0] === p && o[1] === q) };
    },
    async mount(f, { opts, ans }) {
      setQ(f, 'Phân số nào là <b>phân số tối giản</b>?');
      await f.choose({
        options: opts.map((o, i) => ({ html: `<span style="font-size:1.4em">${fr(o[0], o[1])}</span>`, value: i })), answer: ans,
        say: 'Phân số nào là phân số tối giản?',
        hint: (i) => { const [n, d] = opts[i]; const g = gcd(n, d); return `${n} và ${d} cùng chia hết cho ${g}, rút gọn được.`; },
      });
      const [n, d] = opts[ans];
      f.finish({ ok: `${n} và ${d} không cùng chia hết cho số nào lớn hơn 1.` });
    },
  };
}

/** So sánh hai phân số (cùng mẫu, cùng tử, một mẫu chia hết cho mẫu kia, bằng nhau): chọn >, <, =. */
function taskCmp() {
  return {
    id: 'fcmp',
    make: (rng) => {
      const kind = rng.pick(['den', 'num', 'mul', 'eq']);
      if (kind === 'den') { const n = rng.int(5, 12); let a, b; do { a = rng.int(1, n - 1); b = rng.int(1, n - 1); } while (a === b); return { kind, A: [a, n], B: [b, n] }; }
      if (kind === 'num') { const a = rng.int(1, 4); let m, n; do { m = rng.int(a + 1, 10); n = rng.int(a + 1, 10); } while (m === n || gcd(a, m) !== 1 || gcd(a, n) !== 1); return { kind, A: [a, m], B: [a, n] }; }
      const b = rng.int(2, 5), m = rng.int(2, 3), a = rng.int(1, b - 1);
      if (kind === 'eq') return rng.int(0, 1) ? { kind, A: [a, b], B: [a * m, b * m] } : { kind, A: [a * m, b * m], B: [a, b] };
      let c; do { c = rng.int(1, b * m - 1); } while (c === a * m);
      return rng.int(0, 1) ? { kind, A: [a, b], B: [c, b * m] } : { kind, A: [c, b * m], B: [a, b] };
    },
    async mount(f, { kind, A, B }) {
      const va = A[0] / A[1], vb = B[0] / B[1];
      const ans = Math.abs(va - vb) < 1e-9 ? '=' : va > vb ? '>' : '<';
      setQ(f, `${fr(A[0], A[1])} <span class="g4-box" style="min-width:1.4em"></span> ${fr(B[0], B[1])}`);
      const pending = f.choose({
        options: ['>', '<', '='].map(s => ({ html: signHtml(s), value: s })), answer: ans, say: 'Chọn dấu thích hợp.',
        hint: kind === 'den' ? 'Cùng mẫu số: so sánh hai tử số.' : kind === 'num' ? 'Cùng tử số: phân số nào có mẫu số bé hơn thì lớn hơn.' : 'Quy đồng mẫu số rồi so sánh hai tử số.',
      });
      const t = createFrac(f.tool, { cap: false });
      const R = rowsY(t, 2, { bottom: t.H - 16, maxH: t.tall ? 190 : 100 });
      bar(t, 'a', R[0], { n: A[1], k: A[0] });
      bar(t, 'b', R[1], { n: B[1], k: B[0], color: COL.B });
      await pending;
      const box = f.q.querySelector('.g4-box');
      box.innerHTML = signHtml(ans);
      box.classList.add('g4-box-ok');
      if (kind === 'mul' || kind === 'eq') {
        const [small, big] = A[1] < B[1] ? ['a', 'b'] : ['b', 'a'];
        await t.split(small, t.get(big).n / t.get(small).n);
      }
      f.finish({ ok: `${frSay(A[0], A[1])} ${signWord(ans)} ${frSay(B[0], B[1])}.` });
    },
  };
}

// ══ Bài 5. Ôn tập các phép tính với phân số ═══════════════════════════════════════════════════════════
/** Mô hình diện tích ở giữa tờ giấy (chừa chỗ nhãn trên và trái). */
function areaBox(t, cols, rows, top = 20, bottom = t.bot - 14) {
  const ls = t.tall ? 64 : 46;
  const y = top + ls * 2.3, maxH = bottom - y;
  let w = Math.min(t.tall ? 760 : 640, maxH * 1.5), h = Math.min(maxH, w / 1.5);
  if (t.tall) { w = Math.min(760, maxH); h = Math.min(maxH, w); }
  return { x: 500 - w / 2 + ls * 0.8, y, w, h, cols, rows, labSize: ls };
}

const B5 = {
  explore: {
    setup: (board) => createFrac(board, { reserve: RES }),
    steps: [
      async (c) => {
        const t = c.t;
        t.clear();
        const [r] = rowsY(t, 1, { maxH: t.tall ? 230 : 160 });
        bar(t, 'a', r, { n: 7, k: 0, lab: false });
        t.caption(`${fr(2, 7)} + ${fr(3, 7)} = ?`);
        await c.say('Cộng hai phân số cùng mẫu số: hai phần bảy cộng ba phần bảy.');
        await t.shade('a', 2);
        await sleep(300);
        await t.shade('a', 2, 3);
        t.set('a', { lab: true });
        await c.choose([{ html: fr(5, 7), value: 1 }, { html: fr(5, 14), value: 2 }], 1, { hint: 'Băng vẫn chia 7 phần bằng nhau. Đếm số phần đã tô.' });
        t.caption(`${fr(2, 7)} + ${fr(3, 7)} = ${fr('2 + 3', 7)} = ${fr(5, 7)}`);
        await c.say('Cộng hai tử số, giữ nguyên mẫu số: năm phần bảy.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 3);
        bar(t, 'a', R[0], { n: 2, k: 1 });
        bar(t, 'b', R[1], { n: 3, k: 1, color: COL.B });
        bar(t, 'c', R[2], { n: 5, k: 2, color: '#CBD5E1', labColor: '#DC2626' });
        t.caption(`Bạn viết: ${fr(1, 2)} + ${fr(1, 3)} = ${fr(2, 5)}. Đúng hay sai?`);
        await c.say('Một bạn cộng tử với tử, mẫu với mẫu: một phần hai cộng một phần ba bằng hai phần năm. Đúng hay sai?');
        await c.choose(['Đúng', 'Sai'], 'Sai', { hint: 'So phần tô của một phần hai với hai phần năm.' });
        await t.pulse('a');
        await c.say('Sai. Chỉ riêng một phần hai đã lớn hơn hai phần năm, cộng thêm thì càng lớn. Không cộng tử với tử, mẫu với mẫu.');
        await c.say('Phải quy đồng mẫu số trước. Mẫu số chung là 6.', 'Quy đồng: mẫu số chung <b>6</b>');
        const [b] = t.btns([{ html: '✂️ Quy đồng' }]);
        await c.tap(b);
        t.btns([]);
        await Promise.all([t.split('a', 3), t.split('b', 2)]);
        t.set('c', { n: 6, k: 0, lab: false, color: COL.A, color2: COL.B, labColor: INK });
        await t.shade('c', 3);
        await t.shade('c', 3, 2);
        t.set('c', { lab: true });
        t.caption(`${fr(1, 2)} + ${fr(1, 3)} = ${fr(3, 6)} + ${fr(2, 6)} = ${fr(5, 6)}`);
        await c.say('Một phần hai bằng ba phần sáu, một phần ba bằng hai phần sáu. Cộng lại được năm phần sáu.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const A = areaBox(t, 5, 3);
        t.fig('m', { kind: 'area', ...A, a: 4, c: 2, stage: 1 });
        t.caption(`${fr(2, 3)} × ${fr(4, 5)} = ?`);
        await c.say('Phép nhân: hai phần ba nhân bốn phần năm. Hình vuông là 1. Phần tô vàng là bốn phần năm hình.');
        const [b] = t.btns([{ html: `Lấy ${fr(2, 3)} của phần đó` }]);
        await c.tap(b);
        t.btns([]);
        t.set('m', { stage: 2 });
        sfx.swish();
        await t.anim([t.figEl('m').querySelector('.g5f-rows')], [{ opacity: 0 }, { opacity: 0.6 }], 700);
        await c.say('Chia hình thành 3 hàng, lấy 2 hàng. Phần tô cả hai màu là hai phần ba của bốn phần năm.');
        await c.choose([{ html: fr(8, 15), value: 1 }, { html: fr(6, 8), value: 2 }, { html: fr(2, 15), value: 3 }], 1, { hint: 'Hình được chia thành mấy ô bằng nhau? Phần chung có mấy ô?' });
        t.set('m', { stage: 3 });
        await t.anim(t.figEl('m').querySelectorAll('.g5f-cell').length ? [...t.figEl('m').querySelectorAll('.g5f-cell')] : [], [{ opacity: 0 }, { opacity: 1 }], 300, { stagger: 60 });
        t.caption(`${fr(2, 3)} × ${fr(4, 5)} = ${fr('2 × 4', '3 × 5')} = ${fr(8, 15)}`);
        await c.say('Hình có 15 ô bằng nhau, phần chung có 8 ô: tám phần mười lăm. Nhân tử số với tử số, mẫu số với mẫu số.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 2, { maxH: t.tall ? 210 : 130 });
        bar(t, 'a', R[0], { n: 4, k: 3 });
        bar(t, 'b', R[1], { n: 4, k: 0, lab: false, color: COL.B });
        t.caption(`${fr(3, 4)} : 2 = ?`);
        await c.say('Chia ba phần tư cái bánh cho 2 bạn. Chia mỗi phần thành 2 phần.');
        const [b] = t.btns([{ html: '✂️ Chia mỗi phần thành 2' }]);
        await c.tap(b);
        t.btns([]);
        await Promise.all([t.split('a', 2), t.split('b', 2)]);
        await t.shade('b', 3);
        t.set('b', { lab: true });
        t.caption(`${fr(3, 4)} : 2 = ${fr(3, 4)} × ${fr(1, 2)} = ${fr(3, 8)}`);
        await c.say('Mỗi bạn được ba phần tám. Chia cho 2 cũng là lấy một phần hai: nhân với một phần hai.');
        t.caption(`${fr(2, 3)} : ${fr(4, 5)} = ${fr(2, 3)} × ?`);
        await c.say('Chia cho một phân số là nhân với phân số đảo ngược. Hai phần ba chia bốn phần năm bằng hai phần ba nhân với phân số nào?');
        await c.choose([{ html: fr(4, 5), value: 1 }, { html: fr(5, 4), value: 2 }, { html: fr(3, 2), value: 3 }], 2, { hint: 'Đảo ngược phân số thứ hai: tử số thành mẫu số, mẫu số thành tử số.' });
        t.caption(`${fr(2, 3)} : ${fr(4, 5)} = ${fr(2, 3)} × ${fr(5, 4)} = ${fr(10, 12)} = ${fr(5, 6)}`);
        await c.say('Hai phần ba nhân năm phần tư bằng mười phần mười hai, rút gọn được năm phần sáu.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const [r] = rowsY(t, 1, { maxH: t.tall ? 260 : 170 });
        bar(t, 'a', r, { n: 4, k: 0, lab: false });
        orangeDots(t, X0, r.y, BW, r.h, 4, 5);
        t.caption(`${fr(3, 4)} của 20 quả cam là bao nhiêu quả?`);
        await c.say('Có 20 quả cam. Tìm ba phần tư của 20 quả cam. Chia 20 quả thành 4 phần bằng nhau, mỗi phần 5 quả.');
        await t.shade('a', 3);
        await c.choose(['5 quả', '12 quả', '15 quả'], '15 quả', { hint: 'Lấy 3 phần, mỗi phần 5 quả.' });
        t.caption(`20 × ${fr(3, 4)} = 15 (quả)`);
        await c.say('Ba phần, mỗi phần 5 quả: 15 quả. Muốn tìm ba phần tư của 20, ta lấy 20 nhân ba phần tư.');
      },
    ],
  },
  tasks: () => [taskAddSame(), taskMistake(), taskMul(), taskDiv(), taskOf()],
};

/** Các quả cam (vòng tròn) xếp đều trong từng phần của băng. */
function orangeDots(t, x, y, w, h, parts, per) {
  const pw = w / parts;
  const cols = per <= 3 ? per : Math.ceil(per / 2), rows = Math.ceil(per / cols);
  const r = Math.min(pw / (cols * 2.4), h / (rows * 2.5));
  let s = '';
  for (let p = 0; p < parts; p++) for (let i = 0; i < per; i++) {
    const cx = x + p * pw + (pw / cols) * ((i % cols) + 0.5), cy = y + (h / rows) * (Math.floor(i / cols) + 0.5);
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#F97316" stroke="${INK}" stroke-width="2.5"/><path d="M${cx} ${cy - r} q ${r * 0.4} ${-r * 0.5} ${r * 0.8} ${-r * 0.3}" stroke="#16A34A" stroke-width="${r * 0.3}" fill="none" stroke-linecap="round"/>`;
  }
  return t.add(`<g pointer-events="none">${s}</g>`);
}

/** Hỏi một phân số tối giản [p, q] qua hai ô (tử rồi mẫu). unsimp: tử/mẫu chưa rút gọn (nếu có) để nhắc. */
async function askFrac(f, nBox, dBox, p, q, { say, hint = '', unsimp = null } = {}) {
  const h = (v, want, raw) => (raw && v === raw && raw !== want ? 'Kết quả phải là phân số tối giản. Rút gọn rồi mới viết.' : hint);
  await f.ask({ box: nBox, answer: p, say, hint: (v) => h(v, p, unsimp?.[0]) });
  await f.ask({ box: dBox, answer: q, hint: (v) => h(v, q, unsimp?.[1]) || 'Mẫu số chưa đúng.' });
}
/** Đề trong một khối (câu không có công cụ: khung đề là cột flex, không để các phân số xếp dọc). */
const setQ = (f, html) => { f.q.innerHTML = `<div class="g5f-ql">${html}</div>`; };
const TOI_GIAN = '<small>Viết kết quả là phân số tối giản.</small>';

/** Cộng, trừ cùng mẫu (kết quả tối giản). Hai băng + băng kết quả để sẵn. */
function taskAddSame() {
  return {
    id: 'faddsame',
    make: (rng) => {
      const n = rng.int(5, 12), op = rng.pick(['+', '−']);
      let a, b;
      if (op === '+') { a = rng.int(1, n - 2); b = rng.int(1, n - 1 - a); } else { a = rng.int(2, n - 1); b = rng.int(1, a - 1); }
      return { n, a, b, op };
    },
    async mount(f, { n, a, b, op }) {
      const r = op === '+' ? a + b : a - b;
      const [p, q] = simp(r, n);
      setQ(f, `${fr(a, n)} ${op} ${fr(b, n)} = ${fr(BOX, BOX)}${TOI_GIAN}`);
      const t = createFrac(f.tool, { cap: false });
      const R = rowsY(t, 3, { bottom: t.H - 14, maxH: t.tall ? 170 : 90 });
      bar(t, 'a', R[0], { n, k: a });
      bar(t, 'b', R[1], { n, k: b, color: COL.B });
      bar(t, 'c', R[2], { n, k: 0, lab: false, color: COL.G });
      const B = f.q.querySelectorAll('.g4-box');
      await askFrac(f, B[0], B[1], p, q, { say: op === '+' ? 'Cộng hai phân số cùng mẫu số.' : 'Trừ hai phân số cùng mẫu số.', hint: op === '+' ? 'Cộng hai tử số, giữ nguyên mẫu số.' : 'Trừ hai tử số, giữ nguyên mẫu số.', unsimp: [r, n] });
      await t.shade('c', r);
      t.set('c', { lab: true });
      f.finish({ ok: `Kết quả là ${frSay(p, q)}.` });
    },
  };
}

/** Đúng hay sai: "cộng tử với tử, mẫu với mẫu" (sai) hoặc phép cộng quy đồng đúng. */
function taskMistake() {
  return {
    id: 'fmistake',
    make: (rng) => {
      let a, b, c, d;
      do { b = rng.int(2, 6); d = rng.int(2, 6); a = rng.int(1, b - 1); c = rng.int(1, d - 1); } while (b === d || a / b + c / d >= 1 || gcd(a, b) !== 1 || gcd(c, d) !== 1);
      return { a, b, c, d, wrong: rng.int(0, 2) > 0 ? 1 : 0 };
    },
    async mount(f, { a, b, c, d, wrong }) {
      const [p, q] = wrong ? [a + c, b + d] : simp(a * d + c * b, b * d);
      setQ(f, `${fr(a, b)} + ${fr(c, d)} = ${fr(p, q)}`);
      const pending = f.choose({ options: ['Đúng', 'Sai'], answer: wrong ? 'Sai' : 'Đúng', say: 'Phép tính này đúng hay sai?', hint: wrong ? 'So phần tô của kết quả với từng phân số.' : 'Quy đồng mẫu số rồi cộng thử.' });
      const t = createFrac(f.tool, { cap: false });
      const R = rowsY(t, 3, { bottom: t.H - 14, maxH: t.tall ? 170 : 90 });
      bar(t, 'a', R[0], { n: b, k: a });
      bar(t, 'b', R[1], { n: d, k: c, color: COL.B });
      bar(t, 'c', R[2], { n: q, k: p, color: wrong ? '#CBD5E1' : COL.G });
      await pending;
      if (wrong) {
        t.set('c', { labColor: '#DC2626' });
        f.finish({ ok: 'Không được cộng tử với tử, mẫu với mẫu.' });
      } else f.finish({ ok: 'Quy đồng mẫu số rồi cộng, kết quả đúng.' });
    },
  };
}

/** Nhân hai phân số (mô hình diện tích), kết quả tối giản. */
function taskMul(id = 'fmul') {
  return {
    id,
    make: (rng) => {
      let a, b, c, d;
      do { b = rng.int(2, 6); d = rng.int(2, 6); a = rng.int(1, b - 1); c = rng.int(1, d - 1); } while (gcd(a, b) !== 1 || gcd(c, d) !== 1);
      return { a, b, c, d };
    },
    async mount(f, { a, b, c, d }) {
      const [p, q] = simp(a * c, b * d);
      setQ(f, `${fr(a, b)} × ${fr(c, d)} = ${fr(BOX, BOX)}${TOI_GIAN}`);
      const t = createFrac(f.tool, { cap: false });
      const A = areaBox(t, d, b, 10, t.H - 10);
      t.fig('m', { kind: 'area', ...A, a: c, c: a, stage: 2 });
      const B = f.q.querySelectorAll('.g4-box');
      await askFrac(f, B[0], B[1], p, q, { say: 'Nhân hai phân số.', hint: 'Tử số nhân tử số, mẫu số nhân mẫu số. Đếm các ô tô cả hai màu.', unsimp: [a * c, b * d] });
      t.set('m', { stage: 3 });
      f.finish({ ok: `Kết quả là ${frSay(p, q)}.` });
    },
  };
}

/** Chia phân số: a/b : c/d = a/b × [d/c] = kết quả tối giản (từng dòng như sách). */
function taskDiv(id = 'fdiv') {
  return {
    id,
    make: (rng) => {
      const nat = rng.int(0, 2) === 0;
      const b = rng.int(2, 9), a = rng.int(1, 12);
      if (nat) return { a, b, c: rng.int(2, 6), d: 1 };
      let c, d; do { d = rng.int(2, 9); c = rng.int(1, 9); } while (c === d);
      return { a, b, c, d };
    },
    async mount(f, { a, b, c, d }) {
      const [p, q] = simp(a * d, b * c);
      const nat = d === 1;
      setQ(f, `${fr(a, b)} : ${nat ? c : fr(c, d)} = ${fr(a, b)} × ${fr(BOX, BOX)} = ${fr(BOX, BOX)}${TOI_GIAN}`);
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: d, say: nat ? 'Chia cho một số tự nhiên: nhân với phân số đảo ngược của nó.' : 'Chia cho một phân số: nhân với phân số đảo ngược.', hint: nat ? `${c} viết thành ${c} phần 1. Đảo ngược được 1 phần ${c}.` : 'Đảo ngược phân số thứ hai: mẫu số lên trên.' });
      await f.ask({ box: B[1], answer: c, hint: 'Tử số cũ xuống dưới làm mẫu số.' });
      await askFrac(f, B[2], B[3], p, q, { hint: 'Nhân tử số với tử số, mẫu số với mẫu số rồi rút gọn.', unsimp: [a * d, b * c] });
      f.finish({ ok: `Kết quả là ${frSay(p, q)}.` });
    },
  };
}

const OF_ITEMS = [
  ['quả cam', 'Rổ có', [12, 16, 20, 24, 30]], ['cái kẹo', 'Túi có', [12, 15, 18, 24, 28]], ['viên bi', 'Hộp có', [16, 20, 24, 30, 36]],
  ['học sinh', 'Lớp có', [28, 30, 32, 35, 36]], ['kg gạo', 'Bao có', [40, 50, 60]], ['quyển vở', 'Chồng có', [10, 12, 15, 20]],
];
/** Phân số của một số: a/b của N. Băng N chia b phần (vẽ vật khi ít, ghi số khi nhiều). */
function taskOf(id = 'fof') {
  return {
    id,
    make: (rng) => {
      const k = rng.int(0, OF_ITEMS.length - 1);
      const N = rng.pick(OF_ITEMS[k][2]);
      const divs = [2, 3, 4, 5, 6, 8, 10].filter(x => N % x === 0 && x < N);
      const b = rng.pick(divs);
      let a; do { a = rng.int(1, b - 1); } while (gcd(a, b) !== 1);
      return { k, N, a, b };
    },
    async mount(f, { k, N, a, b }) {
      const [what, has] = OF_ITEMS[k];
      const ans = (N / b) * a;
      setQ(f, `${has} ${N} ${what}. ${fr(a, b)} của ${N} ${what} là ${BOX} ${what}`);
      const t = createFrac(f.tool, { cap: false });
      const [r] = rowsY(t, 1, { bottom: t.H - 60, maxH: t.tall ? 260 : 150 });
      bar(t, 'a', r, { x: 90, w: 780, n: b, k: 0, lab: false });
      const per = N / b;
      if (what === 'quả cam' && per <= 8) orangeDots(t, 90, r.y, 780, r.h, b, per);
      else for (let i = 0; i < b; i++) t.add(svgText(90 + (i + 0.5) * (780 / b), r.y + r.h / 2 + 18, Math.min(52, 780 / b / 2.2), '?', { fill: '#94A3B8', cls: `g5o-q g5o-q${i}` }));
      t.add(`<path d="M90 ${r.y + r.h + 14} v 14 h 780 v -14" fill="none" stroke="${INK}" stroke-width="3"/>` + svgText(480, r.y + r.h + 64, 44, `${N} ${what}`));
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, say: `Tìm ${frSay(a, b)} của ${N} ${what}.`, hint: `Chia ${N} thành ${b} phần bằng nhau, mỗi phần ${N / b}. Lấy ${a} phần.` });
      t.qa('.g5o-q').forEach(e => { e.textContent = per; e.style.fill = INK; });
      await t.shade('a', a);
      f.finish({ ok: `${N} × ${frSay(a, b)} = ${ans} ${what}.` });
    },
  };
}

// ══ Bài 6. Cộng, trừ hai phân số khác mẫu số ═════════════════════════════════════════════════════════
const VIET = '#3B82F6', MAI = '#7DD3FC';
/** n bình xếp hàng ngang (cao như nhau: cùng 1 l), chừa ô nhãn phía trên và tên phía dưới. */
function jugs(t, n, { top = null, bottom = t.bot - 64 } = {}) {
  const ls = t.tall ? 64 : 48;
  const y = top ?? ls * 2.35 + 10;
  const h = bottom - y;
  const slot = 1000 / n;
  const w = Math.min(t.tall ? 220 : 190, slot * 0.5, h * 0.75);
  return [...Array(n)].map((_, i) => ({ x: slot * (i + 0.5) - w * 0.62, y, w, h, labSize: ls, nameSize: t.tall ? 52 : 40 }));
}

const B6 = {
  explore: {
    setup: (board) => createFrac(board, { reserve: RES }),
    steps: [
      async (c) => {
        const t = c.t;
        t.clear();
        const J = jugs(t, 3);
        t.fig('v', { kind: 'jug', ...J[0], n: 5, k: 1, color: VIET, name: 'Việt', lab: true });
        t.fig('m', { kind: 'jug', ...J[1], n: 2, k: 1, color: MAI, name: 'Mai', lab: true });
        t.fig('j', { kind: 'jug', ...J[2], n: 1, k: 0, color: VIET, color2: MAI, name: 'Bình' });
        t.caption(`${fr(1, 5)} + ${fr(1, 2)} = ? (<i>l</i>)`);
        await c.say('Việt đổ một phần năm lít nước, Mai đổ một phần hai lít nước vào bình. Cả hai bạn đổ bao nhiêu lít nước?');
        await c.say('Mỗi ca đựng 1 lít. Ca của Việt chia 5 vạch, ca của Mai chia 2 vạch. Vạch khác nhau nên chưa cộng ngay được.');
      },
      async (c) => {
        const t = c.t;
        await c.say('Hai mẫu số 5 và 2 không chia hết cho nhau. Lấy mẫu số chung là tích của chúng: 5 nhân 2 bằng 10.', 'Mẫu số chung: 5 × 2 = <b>10</b>');
        const [b] = t.btns([{ html: '✂️ Quy đồng mẫu số' }]);
        await c.tap(b);
        t.btns([]);
        await t.split('v', 2);
        t.caption(`${fr(1, 5)} = ${fr('1 × 2', '5 × 2')} = ${fr(2, 10)}`);
        await c.say('Ca của Việt: mỗi phần chia đôi. Một phần năm bằng hai phần mười.');
        await t.split('m', 5);
        t.caption(`${fr(1, 2)} = ${fr('1 × 5', '2 × 5')} = ${fr(5, 10)}`);
        await c.say('Ca của Mai: mỗi phần chia thành 5. Một phần hai bằng năm phần mười.');
        await t.split('j', 10);
      },
      async (c) => {
        const t = c.t;
        t.caption(`${fr(2, 10)} + ${fr(5, 10)} = ?`);
        const [b] = t.btns([{ html: '💧 Đổ vào bình' }]);
        await c.say('Bây giờ đổ nước của hai bạn vào bình.');
        await c.tap(b);
        t.btns([]);
        await t.pour('v', 'j', { toK: 2, slot: 'k' });
        await t.pour('m', 'j', { toK: 5, slot: 'k2' });
        t.set('v', { lab: false }); t.set('m', { lab: false });
        t.set('j', { lab: true });
        await c.choose([{ html: `${fr(7, 10)} <i>l</i>`, value: 1 }, { html: `${fr(2, 7)} <i>l</i>`, value: 2 }, { html: `${fr(2, 10)} <i>l</i>`, value: 3 }], 1, { hint: 'Đếm số vạch nước trong bình. Mỗi vạch là một phần mười lít.' });
        t.caption(`${fr(1, 5)} + ${fr(1, 2)} = ${fr(2, 10)} + ${fr(5, 10)} = ${fr(7, 10)} (<i>l</i>)`);
        await c.say('Việt và Mai đã đổ bảy phần mười lít nước vào bình.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const J = jugs(t, 2);
        t.fig('m', { kind: 'jug', ...J[0], n: 10, k: 0, color: MAI, name: 'Mai', lab: true });
        t.fig('v', { kind: 'jug', ...J[1], n: 10, k: 0, color: VIET, name: 'Việt', lab: true });
        t.caption(`${fr(1, 2)} − ${fr(1, 5)} = ? (<i>l</i>)`);
        await Promise.all([t.fill('m', 5), t.fill('v', 2)]);
        await c.say('Ai đổ nhiều nước hơn, và nhiều hơn bao nhiêu lít?');
        const m = t.get('m'), u = m.h / 10;
        t.add(`<g class="g5f-gap"><rect x="${m.x}" y="${m.y + m.h - 5 * u}" width="${m.w}" height="${3 * u}" fill="#FDE047" opacity="0.65"/>
          <path d="M${m.x - 16} ${m.y + m.h - 5 * u} h -16 v ${3 * u} h 16" fill="none" stroke="#DC2626" stroke-width="6"/></g>`);
        await t.anim([t.q('.g5f-gap')], [{ opacity: 0 }, { opacity: 1 }], 600);
        await c.choose([
          { html: `Mai nhiều hơn ${fr(3, 10)} <i>l</i>`, value: 1 }, { html: `Việt nhiều hơn ${fr(3, 10)} <i>l</i>`, value: 2 }, { html: `Mai nhiều hơn ${fr(3, 7)} <i>l</i>`, value: 3 },
        ], 1, { hint: 'So mực nước hai ca. Đếm số vạch chênh lệch.' });
        t.caption(`${fr(1, 2)} − ${fr(1, 5)} = ${fr(5, 10)} − ${fr(2, 10)} = ${fr(3, 10)} (<i>l</i>)`);
        await c.say('Mai đổ nhiều hơn Việt ba phần mười lít nước.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 2, { maxH: t.tall ? 210 : 130 });
        bar(t, 'a', R[0], { n: 5, k: 2 });
        bar(t, 'b', R[1], { n: 4, k: 1, color: COL.B });
        t.caption(`${fr(2, 5)} − ${fr(1, 4)} = ?`);
        await c.say('Thử thêm: hai phần năm trừ một phần tư. Mẫu số chung là 5 nhân 4 bằng 20.', 'Mẫu số chung: 5 × 4 = <b>20</b>');
        const [b] = t.btns([{ html: '✂️ Quy đồng mẫu số' }]);
        await c.tap(b);
        t.btns([]);
        await Promise.all([t.split('a', 4), t.split('b', 5)]);
        t.caption(`${fr(2, 5)} − ${fr(1, 4)} = ${fr(8, 20)} − ${fr(5, 20)} = ${fr(3, 20)}`);
        await c.say('Hai phần năm bằng tám phần hai mươi, một phần tư bằng năm phần hai mươi. Tám trừ năm được ba phần hai mươi.');
        t.caption('Quy đồng mẫu số rồi cộng (hoặc trừ)');
        await c.say('Muốn cộng hoặc trừ hai phân số khác mẫu số, ta quy đồng mẫu số rồi cộng hoặc trừ hai phân số đã quy đồng.');
      },
    ],
  },
  tasks: () => [taskAddUnlike('+'), taskAddUnlike('−'), taskSign(), taskNat(), taskWord()],
};

/** Cặp mẫu số như sách: nguyên tố cùng nhau (mẫu chung = tích) hoặc mẫu này chia hết cho mẫu kia (mẫu chung = mẫu lớn). */
const PAIRS = [[2, 3], [2, 5], [3, 4], [3, 5], [2, 7], [4, 5], [3, 7], [2, 9], [5, 6], [3, 8],
  [2, 4], [2, 6], [3, 6], [2, 8], [4, 8], [3, 9], [5, 10], [2, 10], [4, 12], [3, 12], [6, 12]];

/**
 * Cộng / trừ khác mẫu, từng bước như sách: a/b ± c/d = ▢/M ± ▢/M = ▢/M (= tối giản nếu rút gọn được).
 * Em gõ mẫu số chung trước (băng chia lại), rồi hai tử số, rồi kết quả.
 */
function taskAddUnlike(op, id = op === '+' ? 'fadd' : 'fsub') {
  return {
    id,
    make: (rng) => {
      for (;;) {
        let [b, d] = rng.pick(PAIRS);
        if (rng.int(0, 1)) [b, d] = [d, b];
        const a = rng.int(1, b - 1), c = rng.int(1, d - 1);
        const v = op === '+' ? a / b + c / d : a / b - c / d;
        if (v > 0 && v < 1 && gcd(a, b) === 1 && gcd(c, d) === 1) return { a, b, c, d };
      }
    },
    async mount(f, { a, b, c, d }) {
      const M = (b * d) / gcd(b, d);
      const A = a * (M / b), C = c * (M / d), r = op === '+' ? A + C : A - C;
      const [p, q] = simp(r, M);
      const red = q !== M;
      setQ(f, `${fr(a, b)} ${op} ${fr(c, d)} = ${fr(BOX, BOX)} ${op} ${fr(BOX, BOX)} = ${fr(BOX, BOX)}${red ? ` = ${fr(BOX, BOX)}` : ''}${TOI_GIAN}`);
      const t = createFrac(f.tool, { cap: false });
      const R = rowsY(t, 3, { bottom: t.H - 14, maxH: t.tall ? 170 : 90 });
      bar(t, 'a', R[0], { n: b, k: a });
      bar(t, 'b', R[1], { n: d, k: c, color: COL.B });
      bar(t, 'c', R[2], { n: 1, k: 0, lab: false, color: op === '+' ? COL.A : COL.G, color2: COL.B });
      const B = [...f.q.querySelectorAll('.g4-box')];
      const coprime = gcd(b, d) === 1;
      await f.ask({ box: B[1], answer: M, say: 'Quy đồng mẫu số. Mẫu số chung là bao nhiêu?', hint: coprime ? `${b} và ${d} không chia hết cho nhau: mẫu số chung là tích ${b} × ${d}.` : `${Math.max(b, d)} chia hết cho ${Math.min(b, d)}: lấy ${Math.max(b, d)} làm mẫu số chung.` });
      for (const i of [3, 5]) { B[i].textContent = M; B[i].classList.add('g4-box-ok'); }
      await Promise.all([t.split('a', M / b), t.split('b', M / d), t.split('c', M)]);
      await f.ask({ box: B[0], answer: A, hint: `${M} : ${b} = ${M / b}. Nhân tử số ${a} với ${M / b}.` });
      await f.ask({ box: B[2], answer: C, hint: `${M} : ${d} = ${M / d}. Nhân tử số ${c} với ${M / d}.` });
      await f.ask({ box: B[4], answer: r, hint: op === '+' ? 'Cộng hai tử số, giữ nguyên mẫu số.' : 'Trừ hai tử số, giữ nguyên mẫu số.' });
      if (op === '+') await t.shade('c', A, C); else await t.shade('c', r);
      t.set('c', { lab: true });
      if (red) await askFrac(f, B[6], B[7], p, q, { say: 'Rút gọn kết quả.', hint: `${r} và ${M} cùng chia hết cho ${gcd(r, M)}.` });
      f.finish({ ok: `Kết quả là ${frSay(p, q)}.` });
    },
  };
}

/** Chọn dấu + hay − : a/b ? c/d = kết quả. */
function taskSign() {
  return {
    id: 'fsign',
    make: (rng) => {
      for (;;) {
        const [b, d] = rng.pick(PAIRS.slice(0, 10)).slice().sort(() => rng() - 0.5);
        const a = rng.int(1, b - 1), c = rng.int(1, d - 1);
        if (a / b > c / d && gcd(a, b) === 1 && gcd(c, d) === 1) return { a, b, c, d, op: rng.pick(['+', '−']) };
      }
    },
    async mount(f, { a, b, c, d, op }) {
      const [p, q] = simp(op === '+' ? a * d + c * b : a * d - c * b, b * d);
      setQ(f, `${fr(a, b)} <span class="g4-box" style="min-width:1.4em"></span> ${fr(c, d)} = ${fr(p, q)}`);
      await f.choose({ options: [{ html: '+', value: '+' }, { html: '−', value: '−' }], answer: op, say: 'Chọn dấu cộng hay dấu trừ.', hint: 'Quy đồng mẫu số rồi thử cộng, thử trừ.' });
      const box = f.q.querySelector('.g4-box');
      box.textContent = op;
      box.classList.add('g4-box-ok');
      f.finish({ ok: `${frSay(a, b)} ${op === '+' ? 'cộng' : 'trừ'} ${frSay(c, d)} bằng ${frSay(p, q)}.` });
    },
  };
}

/** Số tự nhiên cộng / trừ phân số: n ± a/b = ▢/b ± a/b = ▢/b. Băng: n băng nguyên chia b phần. */
function taskNat(id = 'fnat') {
  return {
    id,
    make: (rng) => {
      const op = rng.pick(['+', '−']), n = rng.int(1, 3);
      let b, a;
      do { b = rng.int(2, 9); a = rng.int(1, op === '+' ? b - 1 : n * b - 1); } while (gcd(a, b) !== 1);
      return { n, a, b, op };
    },
    async mount(f, { n, a, b, op }) {
      const N = n * b, r = op === '+' ? N + a : N - a;
      setQ(f, op === '+' ? `${n} + ${fr(a, b)} = ${fr(BOX, b)} + ${fr(a, b)} = ${fr(BOX, b)}` : `${n} − ${fr(a, b)} = ${fr(BOX, b)} − ${fr(a, b)} = ${fr(BOX, b)}`);
      const t = createFrac(f.tool, { cap: false });
      const rows = op === '+' ? n + 1 : n;
      const R = rowsY(t, rows, { bottom: t.H - 14, maxH: t.tall ? 160 : 90 });
      for (let i = 0; i < n; i++) bar(t, `w${i}`, R[i], { n: 1, k: 1, lab: false, color: COL.A, name: '1' });
      if (op === '+') bar(t, 'p', R[n], { n: b, k: a, color: COL.B });
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: N, say: `Viết ${n} thành phân số có mẫu số ${b}.`, hint: `1 = ${b} phần ${b}. ${n} = ${n} × ${b} phần ${b}.` });
      await Promise.all([...Array(n)].map((_, i) => t.split(`w${i}`, b)));
      for (let i = 0; i < n; i++) t.set(`w${i}`, { lab: true, name: '' });
      await f.ask({ box: B[1], answer: r, hint: op === '+' ? 'Cộng hai tử số, giữ nguyên mẫu số.' : 'Trừ hai tử số, giữ nguyên mẫu số.' });
      if (op === '−') {
        // bỏ a phần cuối (xám)
        for (let i = n - 1; i >= 0; i--) t.set(`w${i}`, { k: Math.max(0, Math.min(b, r - i * b)), k2: Math.max(0, b - Math.max(0, r - i * b)), color2: '#E2E8F0', labTop: Math.max(0, Math.min(b, r - i * b)) });
        sfx.swish();
      }
      f.finish({ ok: `Kết quả là ${frSay(r, b)}.` });
    },
  };
}

/** Bài toán lời văn: hai vòi nước chảy vào bể / đội sửa đường hai tuần. */
function taskWord() {
  return {
    id: 'fword',
    make: (rng) => {
      for (;;) {
        let [b, d] = rng.pick(PAIRS);
        if (rng.int(0, 1)) [b, d] = [d, b];
        const a = rng.int(1, b - 1), c = rng.int(1, d - 1);
        if (a / b + c / d < 1 && gcd(a, b) === 1 && gcd(c, d) === 1) return { a, b, c, d, ctx: rng.int(0, 1) };
      }
    },
    async mount(f, { a, b, c, d, ctx }) {
      const M = (b * d) / gcd(b, d), r = a * (M / b) + c * (M / d);
      const [p, q] = simp(r, M);
      f.q.innerHTML = ctx === 0
        ? `Vòi thứ nhất chảy được ${fr(a, b)} bể, vòi thứ hai chảy được ${fr(c, d)} bể. Cả hai vòi: ${fr(BOX, BOX)} bể${TOI_GIAN}`
        : `Tuần đầu sửa ${fr(a, b)} quãng đường, tuần sau sửa ${fr(c, d)} quãng đường. Cả hai tuần: ${fr(BOX, BOX)} quãng đường${TOI_GIAN}`;
      const t = createFrac(f.tool, { cap: false });
      let id;
      if (ctx === 0) {
        const h = t.H - 40, w = Math.min(560, h * 1.6);
        t.fig('bể', { kind: 'jug', x: 500 - w / 2, y: 20, w, h, n: M, k: 0, color: VIET, color2: MAI, handle: false });
        id = 'bể';
      } else {
        const [r0] = rowsY(t, 1, { bottom: t.H - 14, maxH: t.tall ? 200 : 120 });
        t.add(`<g>${[...Array(12)].map((_, i) => `<rect x="${60 + i * 75}" y="${r0.y + r0.h / 2 - 4}" width="40" height="8" fill="#fff"/>`).join('')}</g>`);
        t.fig('road', { kind: 'bar', x: 60, y: r0.y, w: 880, h: r0.h, n: M, k: 0, color: COL.A, color2: COL.Y });
        id = 'road';
      }
      const B = f.q.querySelectorAll('.g4-box');
      await askFrac(f, B[0], B[1], p, q, { say: 'Cộng hai phân số khác mẫu số.', hint: `Quy đồng mẫu số: mẫu số chung là ${M}.`, unsimp: [r, M] });
      if (ctx === 0) await t.fill(id, a * (M / b), c * (M / d), 1200); else await t.shade(id, a * (M / b), c * (M / d));
      f.finish({ ok: `${frSay(a, b)} cộng ${frSay(c, d)} bằng ${frSay(p, q)}.` });
    },
  };
}

// ══ Bài 7. Hỗn số ══════════════════════════════════════════════════════════════════════════════════════
const KIDS = ['Mai', 'Việt', 'Nam', 'Mi'];
const PINK = '#DB2777', GREEN = '#16A34A';

/** Vị trí 5 bánh (khay trên) và 4 đĩa (dưới; dọc: 2 × 2). */
function cakeLayout(t) {
  const tall = t.tall;
  const R = tall ? Math.min(78, (t.bot - 190) / 8.2, 920 / 12.5) : Math.min(58, t.bot * 0.13);
  const cy0 = 24 + R * 1.3;
  const cakes = [...Array(5)].map((_, i) => ({ cx: 500 + (i - 2) * R * 2.5, cy: cy0 }));
  const plates = [];
  const top0 = cy0 + R * 1.3 + 24, rowH = (t.bot - top0) / 2;
  for (let i = 0; i < 4; i++) {
    if (tall) plates.push({ cx: 270 + (i % 2) * 460, cy: top0 + rowH * Math.floor(i / 2) + R * 1.4 + 4 });
    else plates.push({ cx: 500 + (i - 1.5) * 240 - R * 0.15, cy: t.bot - R * 1.7 - 30 }); // đĩa rộng 4,1R: 4 đĩa vừa khổ 1000
  }
  return { R, cakes, plates };
}

const B7 = {
  explore: {
    setup: (board) => createFrac(board, { reserve: RES }),
    steps: [
      async (c) => {
        const t = c.t;
        t.clear();
        const L = cakeLayout(t), R = L.R;
        t.draw(`<rect x="${L.cakes[0].cx - R * 1.6}" y="${L.cakes[0].cy - R * 1.3}" width="${L.cakes[4].cx - L.cakes[0].cx + R * 3.2}" height="${R * 2.6}" rx="${R * 0.6}" fill="#FEF3C7" stroke="${INK}" stroke-width="3"/>
          ${L.plates.map((p, i) => `<ellipse cx="${p.cx + R * 0.15}" cy="${p.cy}" rx="${R * 2.05}" ry="${R * 1.35}" fill="#fff" stroke="${INK}" stroke-width="3"/>
            <ellipse cx="${p.cx + R * 0.15}" cy="${p.cy}" rx="${R * 1.8}" ry="${R * 1.12}" fill="none" stroke="#CBD5E1" stroke-width="3"/>
            ${svgText(p.cx + R * 0.15, p.cy + R * 1.35 + (t.tall ? 56 : 40), t.tall ? 48 : 34, KIDS[i])}`).join('')}`);
        L.cakes.forEach((k, i) => t.fig(`c${i}`, { kind: 'pie', x: k.cx - R, y: k.cy - R, w: 2 * R, h: 2 * R, n: 1, k: 1 }));
        L.plates.forEach((p, i) => t.fig(`p${i}`, { kind: 'pie', x: p.cx - R * 0.85 - R, y: p.cy - R, w: 2 * R, h: 2 * R, n: 1, k: 0 }));
        t.caption('Chia đều <b>5 cái bánh</b> cho <b>4 bạn</b>');
        await c.say('Chia đều 5 cái bánh trung thu cho 4 bạn thì mỗi bạn được mấy phần cái bánh?');
        const [b] = t.btns([{ html: '🥮 Mỗi bạn 1 cái' }]);
        await c.tap(b);
        t.btns([]);
        for (let i = 0; i < 4; i++) {
          const k = L.cakes[i], p = L.plates[i];
          const cl = await t.fly(t.figEl(`c${i}`), p.cx - R * 0.85 - k.cx, p.cy - k.cy, 600);
          cl.remove();
          t.del(`c${i}`);
          t.set(`p${i}`, { k: 1 });
          sfx.pop(i);
        }
        t.caption('Mỗi bạn 1 cái, còn thừa <b>1 cái</b>');
        await c.say('Mỗi bạn lấy một cái thì còn thừa lại một cái.');
      },
      async (c) => {
        const t = c.t;
        const L = cakeLayout(t), R = L.R;
        await c.say('Chia đều cái bánh còn thừa thành 4 phần.');
        const [b] = t.btns([{ html: '🔪 Cắt bánh thành 4 phần' }]);
        await c.tap(b);
        t.btns([]);
        await t.split('c4', 4);
        await sleep(300);
        const k = L.cakes[4];
        for (let j = 3; j >= 0; j--) {
          const p = L.plates[j];
          const mid = -Math.PI / 2 + (j + 0.5) * (Math.PI / 2);
          const sx = k.cx + Math.cos(mid) * R * 0.45, sy = k.cy + Math.sin(mid) * R * 0.45;
          const tx = p.cx + R * 1.05, ty = p.cy;
          await t.fly(t.figEl('c4').querySelector(`[data-part="${j}"]`), tx - sx, ty - sy, 650);
          t.set('c4', { k: j });
          sfx.pop(j);
        }
        t.del('c4');
        t.caption(`Mỗi bạn: <b>1</b> cái bánh và <b>${fr(1, 4)}</b> cái bánh`);
        await c.say('Vậy mỗi bạn được 1 cái bánh và một phần tư cái bánh.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const tall = t.tall;
        const R = tall ? 120 : Math.min(90, (t.bot - 60) * 0.3);
        const cx = tall ? 340 : 200, cy = tall ? 40 + R : t.bot / 2 - 20;
        t.fig('w', { kind: 'pie', x: cx - R, y: cy - R, w: 2 * R, h: 2 * R, n: 1, k: 1 });
        t.fig('q', { kind: 'pie', x: cx + R * 0.6, y: cy - R, w: 2 * R, h: 2 * R, n: 4, k: 1, ghost: false });
        const s = tall ? 110 : 84;
        t.add(svgText(cx, cy + R + s * 0.75, s * 0.8, '1', { fill: PINK }) + svgFrac(cx + R * 1.6, cy + R + s * 0.4, 1, 4, s * 0.55, GREEN));
        const mx = tall ? 500 : 690, my = tall ? cy + R + s * 2.6 : cy - 10;
        const bw = s * 2.3, c1 = mx - bw / 2 - s * 0.12, c2 = mx + bw / 2 + s * 0.12;
        t.add(`<g class="g5f-mx">
          <rect x="${c1 - bw / 2}" y="${my - s * 1.2}" width="${bw}" height="${s * 2.5}" rx="14" fill="#FDF2F8" stroke="${PINK}" stroke-width="4" stroke-dasharray="10 7"/>
          <rect x="${c2 - bw / 2}" y="${my - s * 1.2}" width="${bw}" height="${s * 2.5}" rx="14" fill="#F0FDF4" stroke="${GREEN}" stroke-width="4" stroke-dasharray="10 7"/>
          ${svgText(c1, my + s * 0.5, s * 1.5, '1', { fill: PINK })}${svgFrac(c2, my - s * 0.05, 1, 4, s * 0.9, GREEN)}
          ${svgText(c1, my + s * 1.72, s * 0.32, 'Phần nguyên', { fill: PINK })}${svgText(c2, my + s * 1.72, s * 0.32, 'Phần phân số', { fill: GREEN })}</g>`);
        await t.anim([t.q('.g5f-mx')], [{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'none' }], 700);
        t.caption(`1 và ${fr(1, 4)} viết gọn là ${mixed(1, 1, 4)}: <b>hỗn số</b>`);
        await c.say('1 và một phần tư viết gọn là 1 một phần tư. Đây là hỗn số. Phần nguyên là 1, phần phân số là một phần tư.');
        await c.choose(['một và một phần tư', 'mười một phần tư', 'một phần tư và một'], 'một và một phần tư', { hint: 'Đọc phần nguyên, chữ "và" rồi đọc phần phân số.' });
        await c.say('Đọc phần nguyên, chữ và, rồi đến phần phân số. Phần phân số của hỗn số luôn bé hơn 1.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 3, { maxH: t.tall ? 200 : 120 });
        bar(t, 'w0', R[0], { n: 1, k: 1, lab: false, color: '#F9A8D4' });
        bar(t, 'w1', R[1], { n: 1, k: 1, lab: false, color: '#F9A8D4' });
        bar(t, 'p', R[2], { n: 10, k: 7, color: '#86EFAC' });
        t.caption(`${mixed(2, 7, 10)} = ?`);
        await c.say('Hỗn số 2 bảy phần mười: 2 băng nguyên và bảy phần mười băng. Viết thành phân số.');
        const [b] = t.btns([{ html: '✂️ Chia băng nguyên thành 10 phần' }]);
        await c.tap(b);
        t.btns([]);
        await Promise.all([t.split('w0', 10), t.split('w1', 10)]);
        t.set('w0', { lab: true }); t.set('w1', { lab: true });
        t.caption(`${mixed(2, 7, 10)} = ${fr('2 × 10 + 7', 10)} = ?`);
        await c.say('Mỗi băng nguyên là mười phần mười. Có tất cả bao nhiêu phần mười?');
        await c.choose([{ html: fr(27, 10), value: 1 }, { html: fr(9, 10), value: 2 }, { html: fr(27, 100), value: 3 }], 1, { hint: 'Hai băng nguyên có 20 phần, thêm 7 phần nữa.' });
        t.caption(`${mixed(2, 7, 10)} = ${fr('2 × 10 + 7', 10)} = ${fr(27, 10)}`);
        await c.say('2 nhân 10 cộng 7 bằng 27. Hai bảy phần mười bằng hai mươi bảy phần mười.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 4, { maxH: t.tall ? 170 : 100 });
        R.forEach((r, i) => bar(t, `b${i}`, r, { n: 10, k: 0, lab: false, color: i < 3 ? '#F9A8D4' : '#86EFAC' }));
        t.caption(`${fr(31, 10)} = ?`);
        await c.say('Ngược lại: ba mươi mốt phần mười. Tô 31 phần, mỗi băng 10 phần.');
        for (let i = 0; i < 4; i++) { await t.shade(`b${i}`, i < 3 ? 10 : 1); t.set(`b${i}`, { lab: true }); }
        t.caption(`31 : 10 = 3 (dư 1)`);
        await c.choose([{ html: mixed(3, 1, 10), value: 1 }, { html: mixed(1, 3, 10), value: 2 }, { html: mixed(30, 1, 10), value: 3 }], 1, { hint: 'Đủ mấy băng nguyên? Băng cuối tô mấy phần?' });
        t.caption(`${fr(31, 10)} = ${mixed(3, 1, 10)}`);
        await c.say('31 chia 10 được 3, dư 1. Ba mươi mốt phần mười bằng 3 một phần mười.');
      },
    ],
  },
  tasks: () => [taskReadMixed(), taskToFrac(), taskToMixed(), taskMixedRead(), taskMixedTrap()],
};

/** Vẽ hỗn số w a/b: w hình nguyên + một hình chia b phần tô a (băng hoặc bánh). Trả về id các hình. */
function drawMixed(t, w, a, b, { cake = false, fill = true, pad = 14 } = {}) {
  if (cake) {
    const n = w + 1;
    const R = Math.min((t.H - 2 * pad) / 2, 1000 / n / 2.3, t.tall ? 200 : 150);
    for (let i = 0; i < n; i++) {
      const cx = 500 + (i - (n - 1) / 2) * R * 2.3;
      t.fig(`m${i}`, { kind: 'pie', x: cx - R, y: t.H / 2 - R, w: 2 * R, h: 2 * R, n: i < w ? 1 : b, k: i < w ? 1 : a, ghost: true });
    }
    return;
  }
  const R = rowsY(t, w + 1, { top: pad, bottom: t.H - pad, maxH: t.tall ? 150 : 90 });
  for (let i = 0; i <= w; i++) bar(t, `m${i}`, R[i], { n: i < w ? (fill ? 1 : b) : b, k: i < w ? (fill ? 1 : b) : a, lab: false, color: i < w ? '#F9A8D4' : '#86EFAC' });
}

/** Viết hỗn số chỉ phần tô / số bánh. */
function taskReadMixed(id = 'fmread') {
  return {
    id,
    make: (rng) => { const b = rng.int(2, 8); return { w: rng.int(1, 3), a: rng.int(1, b - 1), b, cake: rng.int(0, 1) }; },
    async mount(f, { w, a, b, cake }) {
      setQ(f, `${cake ? 'Số bánh' : 'Phần tô màu'} viết thành hỗn số: ${mixed(BOX, BOX, BOX)}`);
      const t = createFrac(f.tool, { cap: false });
      drawMixed(t, w, a, b, { cake: !!cake });
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: w, say: 'Viết hỗn số.', hint: cake ? 'Phần nguyên: đếm số bánh nguyên.' : 'Phần nguyên: đếm số băng tô kín.' });
      await f.ask({ box: B[1], answer: a, hint: 'Tử số: số phần được tô của hình cuối.' });
      await f.ask({ box: B[2], answer: b, hint: 'Mẫu số: hình cuối chia thành mấy phần bằng nhau?' });
      f.finish({ ok: `Hỗn số ${mixedSay(w, a, b)}.` });
    },
  };
}

/** Hỗn số → phân số: w a/b = (w × b + a)/b = ▢/b. */
function taskToFrac(id = 'fmtofrac') {
  return {
    id,
    make: (rng) => {
      const b = rng.pick([2, 3, 4, 5, 6, 8, 10, 10, 100]);
      let a; do { a = rng.int(1, b - 1); } while (gcd(a, b) !== 1 && b !== 100 && b !== 10);
      return { w: rng.int(1, b === 100 ? 9 : 4), a, b };
    },
    async mount(f, { w, a, b }) {
      const p = w * b + a;
      setQ(f, `${mixed(w, a, b)} = ${fr(`${w} × ${b} + ${a}`, b)} = ${fr(BOX, b)}`);
      if (b <= 10 && w <= 3) {
        const t = createFrac(f.tool, { cap: false });
        drawMixed(t, w, a, b, { fill: false });
      }
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: p, max: 4, say: 'Viết hỗn số thành phân số.', hint: `Phần nguyên ${w} bằng ${w * b} phần ${b}. Cộng thêm ${a} phần.` });
      f.finish({ ok: `${mixedSay(w, a, b)} bằng ${frSay(p, b)}.` });
    },
  };
}

/** Phân số → hỗn số: p/q = ▢ ▢/q (chia p cho q: thương là phần nguyên, số dư là tử số). */
function taskToMixed(id = 'fmtomixed') {
  return {
    id,
    make: (rng) => { const q = rng.pick([2, 3, 4, 5, 6, 8, 10]); return { w: rng.int(1, 3), a: rng.int(1, q - 1), q }; },
    async mount(f, { w, a, q }) {
      const p = w * q + a;
      setQ(f, `${fr(p, q)} = ${mixed(BOX, BOX, q)}`);
      const t = createFrac(f.tool, { cap: false });
      drawMixed(t, w, 0, q, { fill: false });
      for (let i = 0; i < w; i++) t.set(`m${i}`, { k: 0 });
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: w, say: 'Viết phân số thành hỗn số.', hint: `${p} chia ${q} được mấy? Đó là phần nguyên.` });
      for (let i = 0; i < w; i++) await t.shade(`m${i}`, q);
      await f.ask({ box: B[1], answer: a, hint: `${p} : ${q} = ${w} dư ${a}. Số dư là tử số.` });
      await t.shade(`m${w}`, a);
      f.finish({ ok: `${frSay(p, q)} bằng ${mixedSay(w, a, q)}.` });
    },
  };
}

/** Đọc hỗn số / phần nguyên, phần phân số (nút chọn). */
function taskMixedRead() {
  return {
    id: 'fmsay',
    make: (rng) => { const b = rng.int(3, 10); let a; do { a = rng.int(1, b - 1); } while (gcd(a, b) !== 1); return { w: rng.int(1, 9), a, b, mode: rng.pick(['say', 'part', 'whole']) }; },
    async mount(f, { w, a, b, mode }) {
      let options, answer, q, say;
      if (mode === 'say') {
        q = `Hỗn số <span style="font-size:1.3em">${mixed(w, a, b)}</span> đọc là:`;
        say = 'Hỗn số này đọc là gì?';
        answer = mixedSay(w, a, b);
        options = [answer, `${frSay(a, b)} và ${readVN(w)}`, `${readVN(w)} và ${frSay(b, a)}`];
      } else {
        q = `Hỗn số <span style="font-size:1.3em">${mixed(w, a, b)}</span> có ${mode === 'part' ? 'phần phân số' : 'phần nguyên'} là:`;
        say = mode === 'part' ? 'Phần phân số của hỗn số là gì?' : 'Phần nguyên của hỗn số là gì?';
        options = [{ html: String(w), value: 'w' }, { html: fr(a, b), value: 'f' }, { html: fr(w * b + a, b), value: 'x' }];
        answer = mode === 'part' ? 'f' : 'w';
      }
      setQ(f, q);
      const opts = (Array.isArray(options) ? options : []).map(o => (typeof o === 'string' ? { html: o, value: o } : o));
      const order = [...opts].sort((x, y) => (String(x.value) < String(y.value) ? -1 : 1));
      await f.choose({ options: order, answer, say, hint: mode === 'say' ? 'Đọc phần nguyên, chữ "và" rồi đọc phần phân số.' : 'Phần nguyên là số tự nhiên đứng trước. Phần phân số bé hơn 1.' });
      f.finish({ ok: mode === 'say' ? `Đọc là ${mixedSay(w, a, b)}.` : `Phần nguyên là ${w}, phần phân số là ${frSay(a, b)}.` });
    },
  };
}

/** Bẫy hay nhầm: 1 9/100 = 109/100 (không phải 19/100); 703/100 = 7 3/100 (không phải 70 3/100). */
function taskMixedTrap() {
  return {
    id: 'fmtrap',
    make: (rng) => ({ w: rng.int(1, 9), a: rng.int(1, 9), b: rng.pick([100, 100, 1000]), back: rng.int(0, 1), ord: rng.shuffle([0, 1, 2]) }),
    async mount(f, { w, a, b, back, ord }) {
      const p = w * b + a;
      let options;
      if (!back) {
        setQ(f, `<span style="font-size:1.3em">${mixed(w, a, b)}</span> viết thành phân số là:`);
        options = [{ html: fr(p, b), value: 1 }, { html: fr(`${w}${a}`, b), value: 2 }, { html: fr(w + a, b), value: 3 }];
      } else {
        setQ(f, `<span style="font-size:1.3em">${fr(p, b)}</span> viết thành hỗn số là:`);
        options = [{ html: mixed(w, a, b), value: 1 }, { html: mixed(w * 10, a, b), value: 2 }, { html: mixed(w, a * 10, b), value: 3 }];
      }
      await f.choose({ options: ord.map(i => options[i]), answer: 1, say: back ? 'Viết phân số thành hỗn số.' : 'Viết hỗn số thành phân số.', hint: `${w} bằng ${w * b} phần ${b}. Cẩn thận các chữ số 0.` });
      f.finish({ ok: `${mixedSay(w, a, b)} bằng ${frSay(p, b)}.` });
    },
  };
}

export const FRACTION_LESSONS = { 3: B3, 5: B5, 6: B6, 7: B7 };

// ══ Luyện Tính lớp 5: 🍫 Phân số (dạng câu dùng chung khung Thực hành practice.js) ═══════════════════
/**
 * Ba cấp: quy đồng và cộng trừ khác mẫu · nhân chia · hỗn số ↔ phân số. Mỗi task có src (bài SGK) và level.
 * Chạy bằng practiceGame(lesson, tasks, BOOK5) như Thực hành.
 */
export const FRACTION_DRILL_LEVELS = [
  { id: 'frac-addsub', title: 'Quy đồng, cộng trừ khác mẫu', icon: '➕', tasks: [
    { ...taskEqual('dq-equal'), src: 3 }, { ...taskAddUnlike('+', 'dq-add'), src: 6 }, { ...taskAddUnlike('−', 'dq-sub'), src: 6 },
    { ...taskNat('dq-nat'), src: 6 }, { ...taskSimp('dq-simp'), src: 3 },
  ] },
  { id: 'frac-muldiv', title: 'Nhân, chia phân số', icon: '✖️', tasks: [
    { ...taskMul('dm-mul'), src: 5 }, { ...taskDiv('dm-div'), src: 5 }, { ...taskOf('dm-of'), src: 5 },
  ] },
  { id: 'frac-mixed', title: 'Hỗn số và phân số', icon: '🥮', tasks: [
    { ...taskToFrac('dh-tofrac'), src: 7 }, { ...taskToMixed('dh-tomixed'), src: 7 }, { ...taskReadMixed('dh-read'), src: 7 },
  ] },
];
export const FRACTION_DRILL_TASKS = FRACTION_DRILL_LEVELS.flatMap(l => l.tasks.map(t => ({ ...t, level: l.id })));
