/**
 * Toán 4 Tập Hai (Kết nối tri thức), chủ đề 11–12: Bài 60 Phép cộng phân số, Bài 61 Phép trừ phân số, Bài 63 Phép nhân
 * phân số, Bài 64 Phép chia phân số, Bài 65 Tìm phân số của một số. Công cụ 🍕 Phân số: bảng phân số của lớp 5
 * (grade5Tools/frac.js: băng, bánh, bình) + đồ dùng riêng ../fracops4.js (cắt phần, gộp phần, hình vuông 1 m², chia đều đồ vật,
 * thẻ đảo ngược).
 * Phạm vi lớp 4: cộng trừ cùng mẫu; khác mẫu khi mẫu này chia hết cho mẫu kia (quy đồng một phân số); số tự nhiên với
 * phân số; kết quả rút gọn khi được. Nhân tử × tử, mẫu × mẫu; nhân với số tự nhiên. Chia = nhân phân số đảo ngược.
 * Phân số của một số: 2/3 của 12 = 12 : 3 × 2.
 * Các trang sách tr. 74–97 chưa có ảnh: dựng theo kiến thức chuẩn SGK, ví dụ Khám phá tự đặt (xem ghi chú từng bài).
 */

import { createFrac, COL, svgText, svgFrac, tween } from '../../grade5Tools/frac.js';
import { fr, frSay, gcd, simp } from '../../grade5Tools/num.js';
import { BOX } from '../practice.js';
import { INK, sfx } from '../frame.js';
import { anim } from '../canvas.js';
import { moveParts, enableCut, createArea, createShare, fracCard } from '../fracops4.js';

/** Phần đáy tờ giấy chừa cho nút chọn / nút công cụ trong Khám phá. */
const RES = 0.22;
const X0 = 175, BW = 630; // băng: lề trái (chừa tên), bề rộng (chừa nhãn phân số bên phải)
const PINK = '#F472B6';

/** n hàng xếp dọc trong vùng [top, bottom]: [{ y, h }]. */
function rowsY(t, n, { top = 20, bottom = t.bot - 14, maxH = t.tall ? 190 : 120 } = {}) {
  const slot = (bottom - top) / n;
  const h = Math.min(maxH, slot * 0.68);
  return [...Array(n)].map((_, i) => ({ y: top + slot * i + (slot - h) / 2, h }));
}
const bar = (t, id, row, spec = {}) => t.fig(id, {
  kind: 'bar', x: X0, y: row.y, w: BW, h: row.h, lab: true, nameSize: Math.min(t.tall ? 40 : 42, row.h * 0.45), ...spec,
});
/** Đề trong một khối (không để các phân số xếp dọc). */
const setQ = (f, html) => { f.q.innerHTML = `<div class="g5f-ql">${html}</div>`; };
const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1);
const NEU = '<small>Rút gọn kết quả (nếu được).</small>';
const opWord = (op) => (op === '+' ? 'cộng' : op === '×' ? 'nhân' : op === ':' ? 'chia' : 'trừ');
/** Rút gọn được (và không thành số tự nhiên) thì có thêm bước "= ▢/▢". */
const reducible = (r, M) => gcd(r, M) > 1 && M / gcd(r, M) > 1;
const tail = (r, M) => (reducible(r, M) ? ` = ${fr(BOX, BOX)}` : '');
/** Bước rút gọn: hai ô (tử, mẫu). */
async function askSimp(f, nb, db, r, M) {
  const [p, q] = simp(r, M), g = r / p;
  await f.ask({ box: nb, answer: p, say: 'Rút gọn phân số.', hint: `${r} và ${M} cùng chia hết cho ${g}. Chia cả tử số và mẫu số cho ${g}.` });
  await f.ask({ box: db, answer: q, hint: `${M} : ${g} = ${q}.` });
}
/** Hỏi một phân số tối giản [p, q] (bài toán lời văn). raw: kết quả chưa rút gọn để nhắc. */
async function askFrac(f, nb, db, p, q, { say, hint = '', raw = null } = {}) {
  const h = (v, i) => (raw && v === raw[i] && raw[i] !== [p, q][i] ? `Rút gọn: ${raw[0]} và ${raw[1]} cùng chia hết cho ${gcd(raw[0], raw[1])}.` : hint);
  await f.ask({ box: nb, answer: p, say, hint: (v) => h(v, 0) });
  await f.ask({ box: db, answer: q, hint: (v) => h(v, 1) || 'Mẫu số chưa đúng.' });
}

/** Bình (kind 'jug') xếp ngang: n bình cao như nhau (cùng 1 l), chừa ô nhãn trên và tên dưới. */
function jugs(t, n, { bottom = t.bot - 64 } = {}) {
  const ls = t.tall ? 64 : 48;
  const y = ls * 2.35 + 10;
  const h = bottom - y;
  const slot = 1000 / n;
  const w = Math.min(t.tall ? 230 : 190, slot * 0.5, h * 0.75);
  return [...Array(n)].map((_, i) => ({ x: slot * (i + 0.5) - w * 0.62, y, w, h, labSize: ls, nameSize: t.tall ? 52 : 40 }));
}

/** Bánh tròn: ngang ba bánh một hàng; dọc hai bánh trên, một bánh dưới. Trả về [{ x, y, w, h, cx, cy }], cỡ chữ tên / nhãn. */
function pies(t, n = 3) {
  const top = 12, bot = t.bot - 8;
  const nameS = t.tall ? 46 : 40, labS = t.tall ? 54 : 48;
  const pad = nameS * 1.35 + labS * 2.2;
  const mk = (cx, y, s) => ({ x: cx - s / 2, y, w: s, h: s, cx, cy: y + s / 2, nameS, labS });
  if (!t.tall || n < 3) {
    const s = Math.min(300, bot - top - pad, (1000 / n) * 0.8);
    const y = top + nameS * 1.35 + (bot - top - pad - s) / 2;
    return [...Array(n)].map((_, i) => mk((1000 / n) * (i + 0.5), y, s));
  }
  const rowH = (bot - top) / 2;
  const s = Math.min(380, rowH - pad, 1000 * 0.36);
  const y1 = top + nameS * 1.35 + (rowH - pad - s) / 2, y2 = y1 + rowH;
  return [mk(260, y1, s), mk(740, y1, s), mk(500, y2, s)];
}
/** Tên trên mỗi bánh, dấu giữa các bánh (+ / − và =). */
function pieMarks(t, P, names, op = '+') {
  let s = names.map((nm, i) => svgText(P[i].cx, P[i].y - P[i].nameS * 0.45, P[i].nameS, nm)).join('');
  const sz = P[0].labS * 1.4;
  if (!t.tall) {
    s += svgText((P[0].cx + P[1].cx) / 2, P[0].cy + sz * 0.35, sz, op, { fill: '#DC2626' });
    s += svgText((P[1].cx + P[2].cx) / 2, P[1].cy + sz * 0.35, sz, '=', { fill: '#DC2626' });
  } else {
    s += svgText(500, P[0].cy + sz * 0.35, sz, op, { fill: '#DC2626' });
    s += svgText(P[2].x - sz * 0.9, P[2].cy + sz * 0.35, sz, '=', { fill: '#DC2626' });
  }
  t.addBg(s);
}

/** Hình vuông 1 m² ở giữa vùng [top, bottom], chừa chỗ nhãn trên / trái / dưới. */
function areaSquare(t, cols, rows, { top = 14, bottom = t.bot + (t.H - t.bot) * 0.12, unit = '1 m' } = {}) {
  const ls = t.tall ? 62 : 46;
  const y = top + ls * 2.25;
  const side = Math.min(bottom - y, 1000 - ls * 5.5, t.tall ? 760 : 999);
  const x = 500 - side / 2 + ls * 0.6;
  return createArea(t, { x, y, w: side, h: side, cols, rows, ls, unit });
}

/** Ngoặc dưới băng + chữ (tổng số). */
const braceUnder = (x, y, w, text, s = 44) => `<path d="M${x} ${y} v 14 h ${w} v -14 M${x + w / 2} ${y + 14} v 12" fill="none" stroke="${INK}" stroke-width="3"/>${svgText(x + w / 2, y + 26 + s, s, text)}`;

// ══ Bài 60. Phép cộng phân số ══════════════════════════════════════════════════════════════════════════
// chưa đối chiếu sách
const B60 = {
  explore: {
    setup: (board) => createFrac(board, { reserve: RES }),
    steps: [
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 3);
        bar(t, 'm', R[0], { n: 8, k: 0, lab: false, name: 'Mai' });
        bar(t, 'v', R[1], { n: 8, k: 0, lab: false, name: 'Việt', color: COL.B });
        bar(t, 's', R[2], { n: 8, k: 0, lab: false, name: 'Cả hai', color2: COL.B });
        t.caption(`Mai sơn ${fr(3, 8)}, Việt sơn ${fr(2, 8)} bức tường`);
        await c.say('Bức tường chia thành 8 phần bằng nhau. Mai sơn ba phần tám bức tường, Việt sơn hai phần tám bức tường. Cả hai bạn sơn được mấy phần bức tường?');
        await c.say('Em hãy tô phần Mai sơn: 3 phần.', `Bấm để tô phần của Mai: <b>${fr(3, 8)}</b>`);
        t.tappable('m');
        await c.until(t, () => t.get('m').k === 3, { nudge: 'Bấm vào phần thứ ba, tính từ bên trái.', el: () => t.figEl('m') });
        t.tappable('m', false);
        t.set('m', { lab: true });
        await c.say('Bây giờ tô phần Việt sơn: 2 phần.', `Bấm để tô phần của Việt: <b>${fr(2, 8)}</b>`);
        t.tappable('v');
        await c.until(t, () => t.get('v').k === 2, { nudge: 'Bấm vào phần thứ hai, tính từ bên trái.', el: () => t.figEl('v') });
        t.tappable('v', false);
        t.set('v', { lab: true });
        await c.say('Mai sơn 3 phần, Việt sơn 2 phần.');
      },
      async (c) => {
        const t = c.t;
        await c.say('Gộp phần sơn của hai bạn lại.', 'Bấm <b>Gộp lại</b>');
        const [b] = t.btns([{ html: '🧩 Gộp lại' }]);
        await c.tap(b);
        t.btns([]);
        await moveParts(t, 'm', 's');
        await moveParts(t, 'v', 's', { at: 3, slot: 'k2' });
        t.caption(`${fr(3, 8)} + ${fr(2, 8)} = ?`);
        await c.say('Cả hai bạn sơn được mấy phần bức tường?');
        await c.choose([{ html: fr(5, 8), value: 1 }, { html: fr(5, 16), value: 2 }], 1, { hint: 'Bức tường vẫn chia 8 phần bằng nhau. Đếm các phần đã sơn.' });
        t.set('s', { lab: true });
        t.caption(`${fr(3, 8)} + ${fr(2, 8)} = ${fr('3 + 2', 8)} = ${fr(5, 8)}`);
        await c.say('Cả hai bạn sơn được năm phần tám bức tường. Muốn cộng hai phân số cùng mẫu số, ta cộng hai tử số và giữ nguyên mẫu số.', 'Cùng mẫu số: <b>cộng hai tử số</b>, giữ nguyên mẫu số');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const P = pies(t, 3);
        t.fig('a', { kind: 'pie', ...P[0], n: 4, k: 1, lab: true, labSize: P[0].labS });
        t.fig('b', { kind: 'pie', ...P[1], n: 8, k: 3, lab: true, labSize: P[1].labS });
        t.fig('c', { kind: 'pie', ...P[2], n: 8, k: 0, labSize: P[2].labS });
        pieMarks(t, P, ['Rô-bốt', 'Mai', 'Cả hai']);
        t.caption(`${fr(1, 4)} + ${fr(3, 8)} = ?`);
        await c.say('Rô-bốt ăn một phần tư cái bánh, Mai ăn ba phần tám cái bánh. Cả hai bạn ăn mấy phần cái bánh?');
        await c.say('Hai phân số khác mẫu số: miếng bánh của Rô-bốt to hơn miếng của Mai. Phải làm cho các miếng bằng nhau đã.');
        await c.say('8 chia hết cho 4, nên lấy 8 làm mẫu số chung. Cắt mỗi miếng bánh của Rô-bốt thành 2 miếng.', 'Mẫu số chung: <b>8</b>');
        const [b] = t.btns([{ html: '🔪 Cắt mỗi miếng thành 2' }]);
        await c.tap(b);
        t.btns([]);
        await t.split('a', 2);
        t.caption(`${fr(1, 4)} = ${fr('1 × 2', '4 × 2')} = ${fr(2, 8)}`);
        await c.say('Nhân cả tử số và mẫu số với 2: một phần tư bằng hai phần tám.');
      },
      async (c) => {
        const t = c.t;
        await c.say('Bây giờ các miếng bánh bằng nhau. Gộp lại.', 'Bấm <b>Gộp lại</b>');
        const [b] = t.btns([{ html: '🧩 Gộp lại' }]);
        await c.tap(b);
        t.btns([]);
        const A = t.get('a'), B = t.get('b'), C = t.get('c');
        const flyPie = async (from, to, turn) => {
          const els = [...from.g.querySelectorAll('[data-part]')].filter(e => +e.dataset.part < from.k);
          const g = t.add('<g></g>');
          els.forEach(e => g.append(e.cloneNode(true)));
          g.style.transformBox = 'view-box';
          g.style.transformOrigin = `${from.x + from.w / 2}px ${from.y + from.h / 2}px`;
          sfx.swish();
          const dx = to.x - from.x, dy = to.y - from.y;
          await g.animate([{ transform: 'none' }, { transform: `translate(${dx}px, ${dy}px) rotate(${turn}deg)` }], { duration: anim(750), easing: 'ease-in-out', fill: 'both' }).finished;
          g.remove();
        };
        await flyPie(A, C, 0);
        await t.shade('c', 2);
        await flyPie(B, C, 90);
        await t.shade('c', 5);
        t.caption(`${fr(2, 8)} + ${fr(3, 8)} = ?`);
        await c.choose([{ html: fr(5, 8), value: 1 }, { html: fr(4, 12), value: 2 }, { html: fr(4, 8), value: 3 }], 1, { hint: 'Cùng mẫu số 8: cộng hai tử số 2 và 3.' });
        t.set('c', { lab: true });
        t.caption(`${fr(1, 4)} + ${fr(3, 8)} = ${fr(2, 8)} + ${fr(3, 8)} = ${fr(5, 8)}`);
        await c.say('Cả hai bạn ăn năm phần tám cái bánh. Muốn cộng hai phân số khác mẫu số, ta quy đồng mẫu số rồi cộng hai phân số đó.', 'Khác mẫu số: <b>quy đồng</b> rồi cộng');
      },
      async (c) => {
        const t = c.t;
        t.caption(`Nam viết: ${fr(1, 4)} + ${fr(3, 8)} = ${fr(4, 12)}`);
        await c.say('Bạn Nam cộng tử số với tử số, mẫu số với mẫu số: một phần tư cộng ba phần tám bằng bốn phần mười hai. Nam làm đúng hay sai?');
        await c.choose(['Đúng', 'Sai'], 'Sai', { hint: 'Nhìn bánh: cả hai bạn ăn năm phần tám cái bánh.' });
        t.caption(`${fr(1, 4)} + ${fr(3, 8)} = ${fr(5, 8)}, không phải ${fr(4, 12)}`);
        await c.say('Sai. Không cộng mẫu số với nhau. Phải quy đồng mẫu số, rồi cộng hai tử số.');
      },
    ],
  },
  tasks: () => [taskSame('+', 'cong-cung'), taskUnlike('+', 'cong-khac'), taskNat('+', 'cong-tn'), taskWord('+', 'cong-loi'), taskComm()],
};

/** Cộng / trừ hai phân số cùng mẫu số; ba băng (hai số hạng / số bị trừ và số trừ, kết quả tô khi đúng). */
function taskSame(op, id) {
  return {
    id,
    make: (rng) => {
      for (;;) {
        const n = rng.int(4, 12);
        let a, b;
        if (op === '+') { a = rng.int(1, n - 2); b = rng.int(1, n - 1 - a); } else { a = rng.int(2, n - 1); b = rng.int(1, a - 1); }
        const r = op === '+' ? a + b : a - b;
        if (r > 0 && r < n) return { n, a, b };
      }
    },
    async mount(f, { n, a, b }) {
      const r = op === '+' ? a + b : a - b;
      const red = reducible(r, n);
      setQ(f, `${fr(a, n)} ${op} ${fr(b, n)} = ${fr(BOX, BOX)}${tail(r, n)}${red ? NEU : ''}`);
      const t = createFrac(f.tool, { cap: false });
      const R = rowsY(t, 3, { bottom: t.H - 14, maxH: t.tall ? 170 : 110 });
      bar(t, 'a', R[0], { n, k: a });
      bar(t, 'b', R[1], { n, k: b, color: op === '+' ? COL.B : PINK });
      bar(t, 'c', R[2], { n, k: 0, lab: false, color2: COL.B });
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: r, say: `${op === '+' ? 'Cộng' : 'Trừ'} hai phân số cùng mẫu số.`, hint: op === '+' ? `Cộng hai tử số: ${a} + ${b}.` : `Trừ hai tử số: ${a} − ${b}.` });
      await f.ask({ box: B[1], answer: n, hint: 'Giữ nguyên mẫu số.' });
      if (op === '+') { await moveParts(t, 'a', 'c'); await moveParts(t, 'b', 'c', { at: a, slot: 'k2' }); } else await t.shade('c', r);
      t.set('c', { lab: true });
      if (red) await askSimp(f, B[2], B[3], r, n);
      const [p, q] = simp(r, n);
      f.finish({ ok: cap(`${frSay(a, n)} ${opWord(op)} ${frSay(b, n)} bằng ${frSay(p, q)}.`) });
    },
  };
}

/** Hai phân số khác mẫu, mẫu số này chia hết cho mẫu số kia: [a, s] và [c, L], L = s × m. */
function genUnlike(rng, op, { max = 1 } = {}) {
  for (;;) {
    const s = rng.int(2, 6), m = rng.int(2, s <= 3 ? 4 : 3), L = s * m;
    const a = rng.int(1, s - 1), c = rng.int(1, L - 1);
    if (gcd(a, s) !== 1 || gcd(c, L) !== 1) continue;
    const A = a * m, r = op === '+' ? A + c : Math.abs(A - c);
    if (r <= 0 || (op === '+' && r >= L * max) || r === L) continue;
    // phép trừ: phân số lớn hơn đứng trước; phép cộng: thứ tự ngẫu nhiên
    const smallFirst = op === '+' ? rng.int(0, 1) === 1 : A > c;
    return { a, s, c, L, m, smallFirst };
  }
}

/** Cộng / trừ khác mẫu (mẫu này chia hết cho mẫu kia), từng bước: quy đồng một phân số rồi tính. */
function taskUnlike(op, id) {
  return {
    id,
    make: (rng) => genUnlike(rng, op),
    async mount(f, { a, s, c, L, m, smallFirst }) {
      const A = a * m, r = op === '+' ? A + c : smallFirst ? A - c : c - A;
      const red = reducible(r, L);
      const conv = `${fr(BOX, BOX)}`;
      setQ(f, smallFirst
        ? `${fr(a, s)} ${op} ${fr(c, L)} = ${conv} ${op} ${fr(c, L)} = ${fr(BOX, BOX)}${tail(r, L)}${red ? NEU : ''}`
        : `${fr(c, L)} ${op} ${fr(a, s)} = ${fr(c, L)} ${op} ${conv} = ${fr(BOX, BOX)}${tail(r, L)}${red ? NEU : ''}`);
      const t = createFrac(f.tool, { cap: false });
      const R = rowsY(t, 3, { bottom: t.H - 14, maxH: t.tall ? 170 : 110 });
      const [ia, ib] = smallFirst ? ['a', 'b'] : ['b', 'a'];
      bar(t, ia, smallFirst ? R[0] : R[1], { n: s, k: a, color: smallFirst ? COL.A : COL.B });
      bar(t, ib, smallFirst ? R[1] : R[0], { n: L, k: c, color: smallFirst ? (op === '+' ? COL.B : PINK) : COL.A });
      bar(t, 'c', R[2], { n: L, k: 0, lab: false, color2: COL.B });
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[1], answer: L, say: 'Quy đồng mẫu số. Mẫu số chung là bao nhiêu?', hint: `${L} chia hết cho ${s}: lấy ${L} làm mẫu số chung.` });
      await f.ask({ box: B[0], answer: A, hint: `${L} : ${s} = ${m}. Nhân cả tử số với ${m}: ${a} × ${m}.` });
      await t.split(ia, m);
      await f.ask({ box: B[2], answer: r, hint: op === '+' ? 'Cùng mẫu số rồi: cộng hai tử số.' : 'Cùng mẫu số rồi: trừ hai tử số.' });
      await f.ask({ box: B[3], answer: L, hint: 'Giữ nguyên mẫu số chung.' });
      if (op === '+') {
        const [x, y] = smallFirst ? ['a', 'b'] : ['b', 'a'];
        const first = t.get(x).k;
        await moveParts(t, x, 'c');
        await moveParts(t, y, 'c', { at: first, slot: 'k2' });
      } else await t.shade('c', r);
      t.set('c', { lab: true });
      if (red) await askSimp(f, B[4], B[5], r, L);
      const [p, q] = simp(r, L);
      f.finish({ ok: `Kết quả là ${frSay(p, q)}.` });
    },
  };
}

/** Số tự nhiên cộng / trừ phân số: n ± a/b = ▢/b ± a/b = ▢/b. Băng: n băng nguyên, chia b phần khi viết thành phân số. */
function taskNat(op, id) {
  return {
    id,
    make: (rng) => {
      const n = rng.int(1, 3);
      let b, a;
      do { b = rng.int(2, 9); a = rng.int(1, b - 1); } while (gcd(a, b) !== 1);
      return { n, a, b };
    },
    async mount(f, { n, a, b }) {
      const N = n * b, r = op === '+' ? N + a : N - a;
      setQ(f, `${n} ${op} ${fr(a, b)} = ${fr(BOX, b)} ${op} ${fr(a, b)} = ${fr(BOX, b)}`);
      const t = createFrac(f.tool, { cap: false });
      const rows = op === '+' ? n + 1 : n;
      const R = rowsY(t, rows, { bottom: t.H - 14, maxH: t.tall ? 160 : 90 });
      for (let i = 0; i < n; i++) bar(t, `w${i}`, R[i], { n: 1, k: 1, lab: false, name: '1' });
      if (op === '+') bar(t, 'p', R[n], { n: b, k: a, color: COL.B });
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: N, say: `Viết ${n} thành phân số có mẫu số ${b}.`, hint: `1 = ${b} phần ${b}. ${n} = ${n} × ${b} phần ${b}.` });
      await Promise.all([...Array(n)].map((_, i) => t.split(`w${i}`, b)));
      for (let i = 0; i < n; i++) t.set(`w${i}`, { name: '', lab: true });
      await f.ask({ box: B[1], answer: r, hint: op === '+' ? `Cộng hai tử số: ${N} + ${a}.` : `Trừ hai tử số: ${N} − ${a}.` });
      if (op === '−') {
        // bớt a phần cuối (hồng nhạt)
        for (let i = 0; i < n; i++) {
          const keep = Math.max(0, Math.min(b, r - i * b));
          t.set(`w${i}`, { k: keep, k2: b - keep, color2: '#FBCFE8', labTop: keep });
        }
        sfx.swish();
      }
      f.finish({ ok: `${n} ${opWord(op)} ${frSay(a, b)} bằng ${frSay(r, b)}.` });
    },
  };
}

/** Bài toán lời văn cộng / trừ (cùng mẫu hoặc mẫu này chia hết cho mẫu kia). */
const WORD_ADD = [
  { kind: 'jug', text: (A, B) => `Giờ thứ nhất vòi nước chảy được ${A} bể, giờ thứ hai chảy được ${B} bể. Sau hai giờ vòi chảy được mấy phần bể?`, unit: 'bể' },
  { kind: 'road', text: (A, B) => `Ngày thứ nhất đội công nhân sửa được ${A} quãng đường, ngày thứ hai sửa được ${B} quãng đường. Cả hai ngày sửa được mấy phần quãng đường?`, unit: 'quãng đường' },
  { kind: 'bar', text: (A, B) => `Mai đọc được ${A} quyển truyện, Nam đọc tiếp ${B} quyển truyện. Hai bạn đọc được mấy phần quyển truyện?`, unit: 'quyển' },
];
const WORD_SUB = [
  { kind: 'jug', text: (A, B) => `Bể đang chứa ${A} bể nước. Người ta dùng hết ${B} bể nước. Trong bể còn lại mấy phần bể nước?`, unit: 'bể' },
  { kind: 'bar', text: (A, B) => `Mai có ${A} m ruy băng. Mai dùng ${B} m để gói quà. Mai còn lại bao nhiêu mét ruy băng?`, unit: 'm' },
  { kind: 'road', text: (A, B) => `Đội công nhân phải sửa ${A} quãng đường trong tuần này, đã sửa được ${B} quãng đường. Còn phải sửa mấy phần quãng đường?`, unit: 'quãng đường' },
];
function taskWord(op, id) {
  const list = op === '+' ? WORD_ADD : WORD_SUB;
  return {
    id,
    make: (rng) => {
      const k = rng.int(0, list.length - 1);
      if (rng.int(0, 2) === 0) {
        const n = rng.int(5, 12);
        let a, b;
        do { a = rng.int(1, n - 1); b = rng.int(1, n - 1); } while ((op === '+' ? a + b >= n : a <= b) || a === b);
        return { k, x: [a, n], y: [b, n] };
      }
      const u = genUnlike(rng, op);
      const P = [u.a, u.s], Q = [u.c, u.L];
      return { k, x: u.smallFirst ? P : Q, y: u.smallFirst ? Q : P };
    },
    async mount(f, { k, x, y }) {
      const ctx = list[k];
      const M = Math.max(x[1], y[1]);
      const X = x[0] * (M / x[1]), Y = y[0] * (M / y[1]);
      const r = op === '+' ? X + Y : X - Y;
      const [p, q] = simp(r, M);
      setQ(f, `${ctx.text(fr(x[0], x[1]), fr(y[0], y[1]))}<small>Trả lời: ${fr(BOX, BOX)} ${ctx.unit} (rút gọn nếu được)</small>`);
      const t = createFrac(f.tool, { cap: false });
      if (ctx.kind === 'jug') {
        const h = t.H - 40, w = Math.min(520, h * 1.5);
        t.fig('j', { kind: 'jug', x: 500 - w / 2, y: 20, w, h, n: M, k: op === '+' ? 0 : X, color: COL.WATER, color2: COL.WATER2, handle: false });
      } else {
        const [r0] = rowsY(t, 1, { bottom: t.H - 14, maxH: t.tall ? 200 : 120 });
        if (ctx.kind === 'road') t.addBg(`<rect x="60" y="${r0.y - 10}" width="880" height="${r0.h + 20}" rx="10" fill="#94A3B8"/>`);
        t.fig('j', { kind: 'bar', x: 60, y: r0.y, w: 880, h: r0.h, n: M, k: op === '+' ? 0 : X, color: ctx.kind === 'road' ? '#FACC15' : PINK, color2: ctx.kind === 'road' ? '#FDE68A' : '#F9A8D4' });
      }
      const B = f.q.querySelectorAll('.g4-box');
      await askFrac(f, B[0], B[1], p, q, {
        say: op === '+' ? 'Đọc kĩ đề rồi tính tổng hai phân số.' : 'Đọc kĩ đề rồi tính hiệu hai phân số.',
        hint: x[1] === y[1] ? `Phép tính: ${frSay(x[0], x[1])} ${op === '+' ? 'cộng' : 'trừ'} ${frSay(y[0], y[1])}.` : `Quy đồng mẫu số: mẫu số chung là ${M}.`, raw: [r, M],
      });
      if (ctx.kind === 'jug') await (op === '+' ? t.fill('j', X, Y, 1200) : t.fill('j', r, 0, 1200));
      else await (op === '+' ? t.shade('j', X, Y) : t.shade('j', r, 0));
      f.finish({ ok: cap(`${frSay(x[0], x[1])} ${opWord(op)} ${frSay(y[0], y[1])} bằng ${frSay(p, q)}.`) });
    },
  };
}

/** Tính chất giao hoán, kết hợp của phép cộng phân số: điền phân số còn thiếu. */
function taskComm() {
  return {
    id: 'cong-tc',
    make: (rng) => {
      const n = rng.int(5, 15);
      const pick = () => rng.int(1, n - 1);
      return { kind: rng.int(0, 1), n, a: pick(), b: pick(), c: pick() };
    },
    async mount(f, { kind, n, a, b, c }) {
      const F = (x) => fr(x, n);
      if (kind === 0) setQ(f, `${F(a)} + ${F(b)} = ${F(b)} + ${fr(BOX, BOX)}<small>Đổi chỗ các phân số trong một tổng.</small>`);
      else setQ(f, `( ${F(a)} + ${F(b)} ) + ${F(c)} = ${F(a)} + ( ${F(b)} + ${fr(BOX, BOX)} )<small>Cộng phân số thứ nhất với tổng hai phân số còn lại.</small>`);
      const B = f.q.querySelectorAll('.g4-box');
      const want = kind === 0 ? a : c;
      await f.ask({ box: B[0], answer: want, say: kind === 0 ? 'Điền phân số còn thiếu: đổi chỗ hai phân số.' : 'Điền phân số còn thiếu: nhóm hai phân số sau lại.', hint: kind === 0 ? 'Đổi chỗ các phân số trong một tổng thì tổng không thay đổi.' : `Phân số còn thiếu là phân số thứ ba: ${frSay(c, n)}.` });
      await f.ask({ box: B[1], answer: n, hint: 'Mẫu số giữ nguyên như đề.' });
      f.finish({ ok: kind === 0 ? 'Đổi chỗ các phân số trong một tổng thì tổng không thay đổi.' : 'Cộng tổng hai phân số với phân số thứ ba, hay cộng phân số thứ nhất với tổng hai phân số còn lại, kết quả như nhau.' });
    },
  };
}

// ══ Bài 61. Phép trừ phân số ═══════════════════════════════════════════════════════════════════════════
// chưa đối chiếu sách
const B61 = {
  explore: {
    setup: (board) => createFrac(board, { reserve: RES }),
    steps: [
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 2, { maxH: t.tall ? 210 : 140 });
        bar(t, 'a', R[0], { n: 7, k: 5, name: 'Có' });
        bar(t, 'b', R[1], { n: 7, k: 0, lab: false, name: 'Cắt', color: PINK });
        t.caption(`Có ${fr(5, 7)} băng giấy, cắt ${fr(3, 7)} băng giấy`);
        await c.say('Mai có năm phần bảy băng giấy màu. Mai cắt ba phần bảy băng giấy để làm hoa. Mai còn lại mấy phần băng giấy?');
        await c.say('Em hãy bấm vào phần tô màu để cắt đi 3 phần.', 'Bấm để <b>cắt 3 phần</b>');
        const off = enableCut(t, 'a', 'b', { max: 3 });
        await c.until(t, () => t.get('a').cut >= 3, { nudge: 'Bấm vào băng giấy màu cam, mỗi lần cắt một phần.', el: () => t.figEl('a') });
        off();
        t.set('b', { lab: true });
        t.caption(`${fr(5, 7)} − ${fr(3, 7)} = ?`);
        await c.choose([{ html: fr(2, 7), value: 1 }, { html: fr(8, 7), value: 2 }, { html: fr(2, 0), value: 3 }], 1, { hint: 'Băng giấy vẫn chia 7 phần. Đếm các phần màu cam còn lại.' });
        t.caption(`${fr(5, 7)} − ${fr(3, 7)} = ${fr('5 − 3', 7)} = ${fr(2, 7)}`);
        await c.say('Mai còn lại hai phần bảy băng giấy. Muốn trừ hai phân số cùng mẫu số, ta trừ tử số của phân số thứ nhất cho tử số của phân số thứ hai và giữ nguyên mẫu số.', 'Cùng mẫu số: <b>trừ hai tử số</b>, giữ nguyên mẫu số');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const J = jugs(t, 2);
        t.fig('j', { kind: 'jug', ...J[0], n: 4, k: 3, color: COL.WATER, name: 'Bình 1 l', lab: true });
        t.fig('c', { kind: 'jug', ...J[1], n: 8, k: 0, color: COL.WATER, name: 'Ca 1 l', handle: true });
        t.caption(`Bình có ${fr(3, 4)} l nước, rót ra ${fr(3, 8)} l`);
        await c.say('Bình có ba phần tư lít nước. Rót ra ca ba phần tám lít. Trong bình còn lại bao nhiêu lít nước?');
        await c.say('Hai phân số khác mẫu số. 8 chia hết cho 4: lấy 8 làm mẫu số chung. Chia mỗi vạch của bình thành 2.', 'Mẫu số chung: <b>8</b>');
        let [b] = t.btns([{ html: '✂️ Chia mỗi vạch thành 2' }]);
        await c.tap(b);
        t.btns([]);
        await t.split('j', 2);
        t.caption(`${fr(3, 4)} = ${fr(6, 8)}`);
        await c.say('Ba phần tư lít bằng sáu phần tám lít. Bây giờ rót ra ca ba phần tám lít.');
        [b] = t.btns([{ html: `🫗 Rót ${fr(3, 8)} l` }]);
        await c.tap(b);
        t.btns([]);
        const J0 = J[0], J1 = J[1];
        const sx = J0.x + J0.w * 0.95, sy = J0.y + 4, tx = J1.x + J1.w * 0.5, ty = J1.y + 6;
        const stream = t.add(`<path d="M${sx} ${sy} Q ${(sx + tx) / 2} ${Math.min(sy, ty) - 110} ${tx} ${ty} L ${tx} ${J1.y + J1.h}" fill="none" stroke="${COL.WATER}" stroke-width="16" stroke-linecap="round" opacity="0.85" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/>`);
        sfx.swish();
        await tween(350, (e) => stream.setAttribute('stroke-dashoffset', String(100 - 100 * e)));
        await Promise.all([t.fill('j', 3, 0, 1300), t.fill('c', 3, 0, 1300)]);
        await tween(250, (e) => stream.setAttribute('opacity', String(0.85 * (1 - e))));
        stream.remove();
        t.set('c', { lab: true });
        t.caption(`${fr(3, 4)} − ${fr(3, 8)} = ?`);
        await c.choose([{ html: fr(3, 8), value: 1 }, { html: fr(0, 4), value: 2 }, { html: fr(6, 8), value: 3 }], 1, { hint: 'Nhìn bình: còn mấy vạch trong 8 vạch?' });
        t.caption(`${fr(3, 4)} − ${fr(3, 8)} = ${fr(6, 8)} − ${fr(3, 8)} = ${fr(3, 8)} (l)`);
        await c.say('Trong bình còn lại ba phần tám lít. Muốn trừ hai phân số khác mẫu số, ta quy đồng mẫu số rồi trừ hai phân số đó.', 'Khác mẫu số: <b>quy đồng</b> rồi trừ');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 2, { maxH: t.tall ? 210 : 140 });
        bar(t, 'a', R[0], { n: 1, k: 1, lab: false, name: '1 m' });
        bar(t, 'b', R[1], { n: 5, k: 0, lab: false, name: 'Cắt', color: PINK });
        t.caption(`1 − ${fr(2, 5)} = ?`);
        await c.say('Sợi dây dài 1 mét, cắt đi hai phần năm mét. Còn lại bao nhiêu mét? Viết 1 thành phân số có mẫu số 5.');
        let [b] = t.btns([{ html: '✂️ Chia thành 5 phần' }]);
        await c.tap(b);
        t.btns([]);
        await t.split('a', 5);
        t.set('a', { lab: true, name: '' });
        t.caption(`1 = ${fr(5, 5)}`);
        await c.say('1 bằng năm phần năm. Bấm vào sợi dây để cắt đi 2 phần.', 'Bấm để <b>cắt 2 phần</b>');
        const off = enableCut(t, 'a', 'b', { max: 2 });
        await c.until(t, () => t.get('a').cut >= 2, { nudge: 'Bấm vào sợi dây màu cam.', el: () => t.figEl('a') });
        off();
        t.set('b', { lab: true });
        await c.choose([{ html: fr(3, 5), value: 1 }, { html: fr(1, 5), value: 2 }, { html: fr(2, 5), value: 3 }], 1, { hint: 'Đếm các phần màu cam còn lại.' });
        t.caption(`1 − ${fr(2, 5)} = ${fr(5, 5)} − ${fr(2, 5)} = ${fr(3, 5)} (m)`);
        await c.say('Còn lại ba phần năm mét. Viết số tự nhiên thành phân số cùng mẫu số, rồi trừ.');
      },
    ],
  },
  tasks: () => [taskSame('−', 'tru-cung'), taskUnlike('−', 'tru-khac'), taskNat('−', 'tru-tn'), taskWord('−', 'tru-loi'), taskSubCheck()],
};

/** Đúng hay sai: lỗi "trừ tử với tử, mẫu với mẫu", quên quy đồng, hoặc phép trừ đúng. */
function taskSubCheck() {
  return {
    id: 'tru-ds',
    make: (rng) => {
      for (;;) {
        const u = genUnlike(rng, '−');
        const [x, y] = u.smallFirst ? [[u.a, u.s], [u.c, u.L]] : [[u.c, u.L], [u.a, u.s]];
        const kind = rng.pick(['right', 'right', 'both', 'noconv']);
        if (kind === 'both' && (x[0] <= y[0] || x[1] <= y[1])) continue;
        if (kind === 'noconv' && x[0] <= y[0]) continue;
        return { x, y, kind };
      }
    },
    async mount(f, { x, y, kind }) {
      const M = Math.max(x[1], y[1]);
      const r = x[0] * (M / x[1]) - y[0] * (M / y[1]);
      const shown = kind === 'right' ? [r, M] : kind === 'both' ? [x[0] - y[0], x[1] - y[1]] : [x[0] - y[0], M];
      const ok = kind === 'right';
      setQ(f, `${fr(x[0], x[1])} − ${fr(y[0], y[1])} = ${fr(shown[0], shown[1])}`);
      const pending = f.choose({
        options: ['Đúng', 'Sai'], answer: ok ? 'Đúng' : 'Sai', say: 'Phép trừ này đúng hay sai?',
        hint: ok ? `Quy đồng mẫu số ${M} rồi trừ thử.` : kind === 'both' ? 'Có được trừ mẫu số cho mẫu số không?' : 'Hai phân số chưa cùng mẫu số: phải quy đồng trước.',
      });
      const t = createFrac(f.tool, { cap: false });
      const R = rowsY(t, 3, { bottom: t.H - 14, maxH: t.tall ? 170 : 110 });
      bar(t, 'a', R[0], { n: x[1], k: x[0] });
      bar(t, 'b', R[1], { n: y[1], k: y[0], color: PINK });
      bar(t, 'c', R[2], { n: M, k: 0, lab: false, color: COL.G });
      await pending;
      await Promise.all([x[1] < M ? t.split('a', M / x[1]) : null, y[1] < M ? t.split('b', M / y[1]) : null]);
      await t.shade('c', r);
      t.set('c', { lab: true });
      f.finish({ ok: ok ? 'Quy đồng mẫu số rồi trừ hai tử số: đúng.' : `Đúng phải là ${frSay(r, M)}. Quy đồng mẫu số rồi trừ hai tử số.` });
    },
  };
}

// ══ Bài 63. Phép nhân phân số ══════════════════════════════════════════════════════════════════════════
// chưa đối chiếu sách
const B63 = {
  explore: {
    setup: (board) => createFrac(board, { reserve: RES }),
    steps: [
      async (c) => {
        const t = c.t;
        t.clear();
        const A = areaSquare(t, 5, 3);
        c.t.area = A;
        t.caption(`Hình chữ nhật dài ${fr(4, 5)} m, rộng ${fr(2, 3)} m`);
        await c.say('Tính diện tích hình chữ nhật có chiều dài bốn phần năm mét, chiều rộng hai phần ba mét. Ta dùng hình vuông cạnh 1 mét, diện tích 1 mét vuông.');
        await c.say('Cạnh trên chia 5 phần bằng nhau. Bấm để tô 4 cột: chiều dài bốn phần năm mét.', `Bấm tô <b>4 cột</b>: dài ${fr(4, 5)} m`);
        A.set({ mode: 'cols' });
        await c.until(t, () => A.st.a === 4, { nudge: 'Bấm vào cột thứ tư, tính từ bên trái.', el: () => A.g });
        A.set({ mode: null });
        await c.say('Cạnh bên chia 3 phần bằng nhau. Bấm để tô 2 hàng: chiều rộng hai phần ba mét.', `Bấm tô <b>2 hàng</b>: rộng ${fr(2, 3)} m`);
        A.set({ mode: 'rows' });
        await c.until(t, () => A.st.c === 2, { nudge: 'Bấm vào hàng thứ hai, tính từ trên xuống.', el: () => A.g });
        A.set({ mode: null });
        await c.say('Phần tô cả hai màu chính là hình chữ nhật cần tính diện tích.');
      },
      async (c) => {
        const t = c.t, A = t.area;
        t.caption('Hình vuông 1 m² chia thành mấy ô bằng nhau?');
        await c.say('Hình vuông 1 mét vuông được chia thành mấy ô bằng nhau?');
        await c.choose([{ html: '15 ô', value: 15 }, { html: '8 ô', value: 8 }, { html: '5 ô', value: 5 }], 15, { hint: '5 cột, mỗi cột 3 ô.' });
        await A.showCells();
        t.caption(`Hình chữ nhật gồm 8 ô: diện tích = ?`);
        await c.say('Hình chữ nhật gồm 8 ô như thế. Diện tích hình chữ nhật là bao nhiêu?');
        await c.choose([{ html: `${fr(8, 15)} m²`, value: 1 }, { html: `${fr(6, 8)} m²`, value: 2 }, { html: `${fr(2, 15)} m²`, value: 3 }], 1, { hint: 'Có 8 ô trong 15 ô bằng nhau của 1 mét vuông.' });
        t.caption(`${fr(4, 5)} × ${fr(2, 3)} = ${fr('4 × 2', '5 × 3')} = ${fr(8, 15)} (m²)`);
        await c.say('Diện tích là tám phần mười lăm mét vuông. Muốn nhân hai phân số, ta lấy tử số nhân tử số, mẫu số nhân mẫu số.', 'Tử số × tử số, <b>mẫu số × mẫu số</b>');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 2, { maxH: t.tall ? 200 : 130 });
        bar(t, 'a', R[0], { n: 7, k: 2, name: '1 đoạn', color: '#F472B6' });
        bar(t, 'r', R[1], { n: 7, k: 0, lab: false, name: '3 đoạn', color: '#F472B6' });
        t.caption(`Mỗi đoạn ruy băng dài ${fr(2, 7)} m. 3 đoạn dài?`);
        await c.say('Mỗi đoạn ruy băng dài hai phần bảy mét. Ba đoạn như thế dài bao nhiêu mét? Bấm 3 lần, mỗi lần nối thêm một đoạn.');
        let n = 0, busy = false;
        const [b] = t.btns([{ html: `➕ Nối thêm ${fr(2, 7)} m` }]);
        b.onclick = async () => {
          if (busy || n >= 3) return;
          busy = true;
          sfx.tap();
          await moveParts(t, 'a', 'r', { at: t.get('r').k });
          n++;
          busy = false;
          if (n >= 3) b.disabled = true;
          t.emit('add', n);
        };
        await c.until(t, () => n >= 3, { nudge: 'Bấm nút Nối thêm.', el: b });
        t.btns([]);
        t.set('r', { lab: true });
        t.caption(`${fr(2, 7)} × 3 = ?`);
        await c.choose([{ html: fr(6, 7), value: 1 }, { html: fr(6, 21), value: 2 }, { html: fr(5, 7), value: 3 }], 1, { hint: 'Mỗi phần vẫn là một phần bảy mét. Đếm các phần đã tô.' });
        t.caption(`${fr(2, 7)} × 3 = ${fr('2 × 3', 7)} = ${fr(6, 7)} (m)`);
        await c.say('Ba đoạn dài sáu phần bảy mét. Nhân phân số với số tự nhiên: nhân tử số với số đó, giữ nguyên mẫu số. Ba nhân hai phần bảy cũng bằng sáu phần bảy.', 'Nhân với số tự nhiên: <b>tử số × số đó</b>, giữ mẫu số');
      },
    ],
  },
  tasks: () => [taskMul('nhan-ps'), taskMulNat(), taskMulArea(), taskSquare(), taskMulPick()],
};

/** Nhân hai phân số trên hình vuông (cột = mẫu số thứ hai, hàng = mẫu số thứ nhất), đúng thì hiện các ô chung. */
function taskMul(id) {
  return {
    id,
    make: (rng) => {
      for (;;) {
        const b = rng.int(2, 6), d = rng.int(2, 6), a = rng.int(1, b - 1), c = rng.int(1, d - 1);
        if (gcd(a, b) === 1 && gcd(c, d) === 1) return { a, b, c, d };
      }
    },
    async mount(f, { a, b, c, d }) {
      const r = a * c, M = b * d, red = reducible(r, M);
      setQ(f, `${fr(a, b)} × ${fr(c, d)} = ${fr(BOX, BOX)}${tail(r, M)}${red ? NEU : ''}`);
      const t = createFrac(f.tool, { cap: false });
      const A = areaSquare(t, d, b, { top: 6, bottom: t.H - 8, unit: '' });
      A.set({ a: c, c: a });
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: r, say: 'Nhân hai phân số.', hint: `Tử số nhân tử số: ${a} × ${c}. Đếm các ô tô cả hai màu.` });
      await f.ask({ box: B[1], answer: M, hint: `Mẫu số nhân mẫu số: ${b} × ${d}. Hình vuông chia thành bao nhiêu ô?` });
      await A.showCells();
      if (red) await askSimp(f, B[2], B[3], r, M);
      const [p, q] = simp(r, M);
      f.finish({ ok: cap(`${frSay(a, b)} nhân ${frSay(c, d)} bằng ${frSay(p, q)}.`) });
    },
  };
}

/** Nhân phân số với số tự nhiên (hai chiều): n băng a/b nối lại. */
function taskMulNat() {
  return {
    id: 'nhan-tn',
    make: (rng) => {
      for (;;) {
        const b = rng.int(3, 9), a = rng.int(1, b - 1), n = rng.int(2, 4);
        if (gcd(a, b) === 1 && (a * n) % b !== 0) return { a, b, n, left: rng.int(0, 1) };
      }
    },
    async mount(f, { a, b, n, left }) {
      const r = a * n, red = reducible(r, b);
      setQ(f, `${left ? `${n} × ${fr(a, b)}` : `${fr(a, b)} × ${n}`} = ${fr(BOX, BOX)}${tail(r, b)}${red ? NEU : ''}`);
      const t = createFrac(f.tool, { cap: false });
      const R = rowsY(t, n, { bottom: t.H - 14, maxH: t.tall ? 150 : 80 });
      for (let i = 0; i < n; i++) bar(t, `p${i}`, R[i], { n: b, k: a, color: i % 2 ? COL.B : COL.A, name: `${i + 1}` });
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: r, say: 'Nhân phân số với số tự nhiên.', hint: `Nhân tử số với ${n}: ${a} × ${n}. Hoặc đếm các phần tô của ${n} băng.` });
      await f.ask({ box: B[1], answer: b, hint: 'Giữ nguyên mẫu số.' });
      for (let i = 0; i < n; i++) await t.pulse(`p${i}`);
      if (red) await askSimp(f, B[2], B[3], r, b);
      const [p, q] = simp(r, b);
      f.finish({ ok: `${n} lần ${frSay(a, b)} là ${frSay(p, q)}.` });
    },
  };
}

/** Diện tích hình chữ nhật có cạnh là phân số (trong hình vuông 1 m²). */
function taskMulArea() {
  return {
    id: 'nhan-dt',
    make: (rng) => {
      for (;;) {
        const b = rng.int(2, 6), d = rng.int(2, 6), a = rng.int(1, b - 1), c = rng.int(1, d - 1);
        if (gcd(a, b) === 1 && gcd(c, d) === 1 && a / b > c / d) return { a, b, c, d };
      }
    },
    async mount(f, { a, b, c, d }) {
      const r = a * c, M = b * d, [p, q] = simp(r, M);
      setQ(f, `Hình chữ nhật dài ${fr(a, b)} m, rộng ${fr(c, d)} m. Diện tích: ${fr(BOX, BOX)} m²<small>Rút gọn kết quả (nếu được).</small>`);
      const t = createFrac(f.tool, { cap: false });
      const A = areaSquare(t, b, d, { top: 6, bottom: t.H - 8 });
      A.set({ a, c });
      const B = f.q.querySelectorAll('.g4-box');
      await askFrac(f, B[0], B[1], p, q, { say: 'Tính diện tích hình chữ nhật: chiều dài nhân chiều rộng.', hint: `${frSay(a, b)} nhân ${frSay(c, d)}: tử số nhân tử số, mẫu số nhân mẫu số.`, raw: [r, M] });
      await A.showCells();
      f.finish({ ok: `Diện tích là ${frSay(p, q)} mét vuông.` });
    },
  };
}

/** Hình vuông cạnh a/b m: chu vi (× 4) hoặc diện tích (cạnh × cạnh). */
function taskSquare() {
  return {
    id: 'nhan-vuong',
    make: (rng) => {
      for (;;) {
        const b = rng.int(3, 9), a = rng.int(1, b - 1), kind = rng.int(0, 1);
        if (gcd(a, b) === 1 && (kind === 1 || (4 * a) % b !== 0)) return { a, b, kind };
      }
    },
    async mount(f, { a, b, kind }) {
      const r = kind ? a * a : a * 4, M = kind ? b * b : b, [p, q] = simp(r, M);
      setQ(f, `Hình vuông cạnh ${fr(a, b)} m. ${kind ? 'Diện tích' : 'Chu vi'}: ${fr(BOX, BOX)} ${kind ? 'm²' : 'm'}<small>Rút gọn kết quả (nếu được).</small>`);
      const t = createFrac(f.tool, { cap: false });
      const ls = t.tall ? 58 : 44;
      const S = Math.min(t.H - ls * 3.2 - 20, 1000 - ls * 7);
      const x = 500 - S / 2, y = (t.H - S) / 2 + ls * 0.4;
      const tick = (x1, y1, x2, y2) => { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, v = x1 === x2; return `<line x1="${v ? mx - 14 : mx}" y1="${v ? my : my - 14}" x2="${v ? mx + 14 : mx}" y2="${v ? my : my + 14}" stroke="${INK}" stroke-width="4"/>`; };
      t.add(`<rect class="g4fo-sq" x="${x}" y="${y}" width="${S}" height="${S}" fill="${kind ? '#BFDBFE' : '#fff'}" stroke="${kind ? INK : '#F97316'}" stroke-width="${kind ? 3.5 : 9}" stroke-linejoin="round"/>
        ${tick(x, y, x + S, y)}${tick(x, y + S, x + S, y + S)}${tick(x, y, x, y + S)}${tick(x + S, y, x + S, y + S)}`);
      t.add(svgFrac(500, y - ls * 1.2, a, b, ls) + svgText(500 + ls * 1.05, y - ls * 0.85, ls * 0.85, 'm', { anchor: 'start' }));
      const B = f.q.querySelectorAll('.g4-box');
      await askFrac(f, B[0], B[1], p, q, {
        say: kind ? 'Tính diện tích hình vuông: cạnh nhân cạnh.' : 'Tính chu vi hình vuông: cạnh nhân 4.',
        hint: kind ? `${frSay(a, b)} nhân ${frSay(a, b)}.` : `${frSay(a, b)} nhân 4: nhân tử số với 4.`, raw: [r, M],
      });
      await t.anim('.g4fo-sq', [{ opacity: 0.4 }, { opacity: 1 }], 500);
      f.finish({ ok: `${kind ? 'Diện tích' : 'Chu vi'} hình vuông là ${frSay(p, q)} ${kind ? 'mét vuông' : 'mét'}.` });
    },
  };
}

/** Chọn phép nhân đúng (tránh lỗi cộng tử, cộng mẫu; nhân chéo). */
function taskMulPick() {
  return {
    id: 'nhan-chon',
    make: (rng) => {
      for (;;) {
        const b = rng.int(2, 7), d = rng.int(2, 7), a = rng.int(1, 6), c = rng.int(1, 6);
        const opts = [[a * c, b * d], [a + c, b + d], [a * d, b * c]];
        if (a !== b && c !== d && b !== d && new Set(opts.map(o => o.join('/'))).size === 3) return { a, b, c, d, order: rng.shuffle([0, 1, 2]) };
      }
    },
    async mount(f, { a, b, c, d, order }) {
      const opts = [[a * c, b * d], [a + c, b + d], [a * d, b * c]];
      setQ(f, `${fr(a, b)} × ${fr(c, d)} = ?`);
      await f.choose({
        options: order.map(i => ({ html: `<span style="font-size:1.3em">${fr(opts[i][0], opts[i][1])}</span>`, value: i })), answer: 0,
        say: 'Chọn kết quả đúng.', hint: (v) => (v === 1 ? 'Phép nhân không cộng tử số, cộng mẫu số.' : 'Tử số nhân tử số, mẫu số nhân mẫu số.'),
      });
      f.finish({ ok: `${fr(a, b)} × ${fr(c, d)} = ${fr(`${a} × ${c}`, `${b} × ${d}`)} = ${fr(a * c, b * d)}` });
    },
  };
}

// ══ Bài 64. Phép chia phân số ══════════════════════════════════════════════════════════════════════════
// chưa đối chiếu sách
/** Hàng thẻ phân số giữa vùng vẽ (ngang); dọc thì to hơn. */
function cardRow(t) {
  const fs = t.tall ? 96 : 74;
  return { fs, cy: Math.max(fs * 1.4 + 10, Math.min(t.bot * 0.42, t.bot - fs * 1.6)) };
}
const B64 = {
  explore: {
    setup: (board) => createFrac(board, { reserve: RES }),
    steps: [
      async (c) => {
        const t = c.t;
        t.clear();
        const fs = t.tall ? 130 : 100;
        const card = fracCard(t, 500, t.bot * 0.45, 2, 3, fs);
        t.caption('Phân số đảo ngược');
        await c.say('Đây là phân số hai phần ba. Đổi chỗ tử số và mẫu số, ta được phân số đảo ngược. Bấm vào thẻ để đảo ngược.', 'Bấm vào thẻ để <b>đảo ngược</b>');
        card.tap(true);
        await c.until(t, () => card.st.flipped, { nudge: 'Bấm vào thẻ phân số.', el: () => card.g });
        t.caption(`${fr(2, 3)} và ${fr(3, 2)} là hai phân số đảo ngược`);
        await c.say('Tử số 2 xuống dưới, mẫu số 3 lên trên: ba phần hai. Hai phần ba và ba phần hai là hai phân số đảo ngược của nhau.');
        t.caption(`Phân số đảo ngược của ${fr(4, 7)} là?`);
        await c.choose([{ html: fr(7, 4), value: 1 }, { html: fr(4, 7), value: 2 }, { html: fr(1, 7), value: 3 }], 1, { hint: 'Đổi chỗ tử số và mẫu số.' });
        t.caption(`Đảo ngược ${fr(4, 7)} được ${fr(7, 4)}`);
        await c.say('Phân số đảo ngược của bốn phần bảy là bảy phần tư.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const { fs, cy } = cardRow(t);
        const xs = t.tall ? [150, 325, 500, 675, 850] : [200, 355, 510, 665, 820];
        const sz = fs * (t.tall ? 0.72 : 0.85);
        const c1 = fracCard(t, xs[0], cy, 7, 15, sz);
        const sign = t.add(svgText(xs[1], cy + fs * 0.32, fs, ':', { fill: '#DC2626' }));
        const c2 = fracCard(t, xs[2], cy, 2, 3, sz, { fill: '#EFF6FF', edge: '#93C5FD' });
        t.add(svgText(xs[3], cy + fs * 0.32, fs, '=', { fill: '#DC2626' }));
        const ans = t.add(svgText(xs[4], cy + fs * 0.32, fs, '?', { fill: '#94A3B8' }));
        void c1;
        t.caption(`Diện tích ${fr(7, 15)} m², chiều rộng ${fr(2, 3)} m. Chiều dài?`);
        await c.say('Hình chữ nhật có diện tích bảy phần mười lăm mét vuông, chiều rộng hai phần ba mét. Tính chiều dài. Chiều dài bằng diện tích chia cho chiều rộng.');
        await c.say('Muốn chia cho một phân số, ta nhân với phân số đảo ngược. Bấm vào thẻ hai phần ba để đảo ngược.', `Bấm vào thẻ ${fr(2, 3)} để <b>đảo ngược</b>`);
        c2.tap(true);
        await c.until(t, () => c2.st.flipped, { nudge: 'Bấm vào thẻ hai phần ba.', el: () => c2.g });
        sign.textContent = '×';
        sign.animate([{ transform: 'scale(1.6)', transformOrigin: `${xs[1]}px ${cy}px` }, { transform: 'none', transformOrigin: `${xs[1]}px ${cy}px` }], { duration: anim(500) });
        t.caption(`${fr(7, 15)} : ${fr(2, 3)} = ${fr(7, 15)} × ${fr(3, 2)}`);
        await c.say('Phép chia thành phép nhân: bảy phần mười lăm nhân ba phần hai. Bằng bao nhiêu?');
        await c.choose([{ html: fr(21, 30), value: 1 }, { html: fr(14, 45), value: 2 }, { html: fr(10, 17), value: 3 }], 1, { hint: 'Tử số nhân tử số: 7 × 3. Mẫu số nhân mẫu số: 15 × 2.' });
        ans.textContent = '';
        t.add(`<g class="g4fo-ans">${svgFrac(xs[4], cy, 7, 10, sz, '#15803D')}</g>`);
        t.caption(`${fr(7, 15)} × ${fr(3, 2)} = ${fr(21, 30)} = ${fr(7, 10)} (m)`);
        await c.say('Bảy phần mười lăm nhân ba phần hai bằng hai mươi mốt phần ba mươi, rút gọn được bảy phần mười. Chiều dài là bảy phần mười mét.', 'Chia cho phân số: <b>nhân với phân số đảo ngược</b>');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const A = areaSquare(t, 10, 3);
        t.caption(`Thử lại: ${fr(7, 10)} × ${fr(2, 3)} = ?`);
        await c.say('Thử lại: chiều dài nhân chiều rộng phải bằng diện tích. Bấm tô 7 cột: chiều dài bảy phần mười mét.', `Bấm tô <b>7 cột</b>: ${fr(7, 10)} m`);
        A.set({ mode: 'cols' });
        await c.until(t, () => A.st.a === 7, { nudge: 'Bấm vào cột thứ bảy, tính từ bên trái.', el: () => A.g });
        A.set({ mode: 'rows' });
        await c.say('Bấm tô 2 hàng: chiều rộng hai phần ba mét.', `Bấm tô <b>2 hàng</b>: ${fr(2, 3)} m`);
        await c.until(t, () => A.st.c === 2, { nudge: 'Bấm vào hàng thứ hai, tính từ trên xuống.', el: () => A.g });
        A.set({ mode: null });
        await A.showCells();
        await c.choose([{ html: `${fr(14, 30)} = ${fr(7, 15)}`, value: 1 }, { html: fr(9, 13), value: 2 }, { html: fr(7, 30), value: 3 }], 1, { hint: 'Đếm số ô xanh lá trong 30 ô.' });
        t.caption(`${fr(7, 10)} × ${fr(2, 3)} = ${fr(14, 30)} = ${fr(7, 15)} (m²) ✓`);
        await c.say('Mười bốn phần ba mươi bằng bảy phần mười lăm, đúng bằng diện tích đề bài. Vậy chiều dài bảy phần mười mét là đúng.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 2, { maxH: t.tall ? 210 : 130 });
        bar(t, 'a', R[0], { n: 4, k: 3, name: 'Có' });
        bar(t, 'b', R[1], { n: 4, k: 0, lab: false, name: '1 bạn', color: COL.B });
        t.caption(`${fr(3, 4)} cái bánh chia đều cho 2 bạn`);
        await c.say('Chia đều ba phần tư cái bánh cho 2 bạn. Mỗi bạn được mấy phần cái bánh? Cắt mỗi phần thành 2 phần.');
        const [b] = t.btns([{ html: '🔪 Cắt mỗi phần thành 2' }]);
        await c.tap(b);
        t.btns([]);
        await Promise.all([t.split('a', 2), t.split('b', 2)]);
        await c.say('Có 6 phần nhỏ, chia đều cho 2 bạn thì mỗi bạn 3 phần. Bấm để tô phần của một bạn.', 'Bấm tô phần của <b>một bạn</b>');
        t.tappable('b');
        await c.until(t, () => t.get('b').k === 3, { nudge: 'Tô 3 phần nhỏ.', el: () => t.figEl('b') });
        t.tappable('b', false);
        t.set('b', { lab: true });
        t.caption(`${fr(3, 4)} : 2 = ?`);
        await c.choose([{ html: fr(3, 8), value: 1 }, { html: fr(6, 4), value: 2 }, { html: fr(3, 2), value: 3 }], 1, { hint: 'Băng chia 8 phần bằng nhau, mỗi bạn 3 phần.' });
        t.caption(`${fr(3, 4)} : 2 = ${fr(3, 4)} × ${fr(1, 2)} = ${fr(3, 8)}`);
        await c.say('Mỗi bạn được ba phần tám cái bánh. Chia cho 2 cũng là nhân với phân số đảo ngược của 2, tức là một phần hai.');
      },
    ],
  },
  tasks: () => [taskInv(), taskDiv('chia-ps'), taskDivNat(), taskDivWord()],
};

/** Viết phân số đảo ngược; đúng thì thẻ đảo. */
function taskInv() {
  return {
    id: 'dao',
    make: (rng) => { let a, b; do { a = rng.int(1, 12); b = rng.int(2, 12); } while (a === b); return { a, b }; },
    async mount(f, { a, b }) {
      setQ(f, `Phân số đảo ngược của ${fr(a, b)} là ${fr(BOX, BOX)}`);
      const t = createFrac(f.tool, { cap: false });
      const card = fracCard(t, 500, t.H / 2 - (t.tall ? 30 : 20), a, b, Math.min(t.H / 3.2, t.tall ? 150 : 110));
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: b, say: 'Viết phân số đảo ngược.', hint: 'Đổi chỗ: mẫu số lên trên làm tử số.' });
      await f.ask({ box: B[1], answer: a, hint: 'Tử số xuống dưới làm mẫu số.' });
      await card.flip();
      f.finish({ ok: cap(`${frSay(a, b)} và ${frSay(b, a)} là hai phân số đảo ngược.`) });
    },
  };
}

/** Chia hai phân số, từng bước như sách: a/b : c/d = a/b × ▢/▢ = ▢/▢ (= rút gọn). */
function taskDiv(id) {
  return {
    id,
    make: (rng) => {
      for (;;) {
        const b = rng.int(2, 9), a = rng.int(1, 9), d = rng.int(2, 9), c = rng.int(1, 9);
        if (c !== d && gcd(a, b) === 1 && gcd(c, d) === 1 && b * c > 1 && (a * d) % (b * c) !== 0) return { a, b, c, d };
      }
    },
    async mount(f, { a, b, c, d }) {
      const r = a * d, M = b * c, red = reducible(r, M);
      setQ(f, `${fr(a, b)} : ${fr(c, d)} = ${fr(a, b)} × ${fr(BOX, BOX)} = ${fr(BOX, BOX)}${tail(r, M)}${red ? NEU : ''}`);
      // hai thẻ phân số: đúng phân số đảo ngược thì thẻ thứ hai lật, dấu chia thành dấu nhân
      const t = createFrac(f.tool, { cap: false });
      const fs = Math.min(t.H / 3.4, t.tall ? 130 : 105), cy = t.H / 2 - fs * 0.1;
      fracCard(t, 330, cy, a, b, fs);
      const sign = t.add(svgText(500, cy + fs * 0.35, fs * 1.2, ':', { fill: '#DC2626' }));
      const card = fracCard(t, 670, cy, c, d, fs, { fill: '#EFF6FF', edge: '#93C5FD' });
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: d, say: 'Chia cho một phân số: nhân với phân số đảo ngược.', hint: `Đảo ngược ${frSay(c, d)}: mẫu số ${d} lên trên.` });
      await f.ask({ box: B[1], answer: c, hint: `Tử số ${c} xuống dưới.` });
      await card.flip();
      sign.textContent = '×';
      await f.ask({ box: B[2], answer: r, hint: `Tử số nhân tử số: ${a} × ${d}.` });
      await f.ask({ box: B[3], answer: M, hint: `Mẫu số nhân mẫu số: ${b} × ${c}.` });
      if (red) await askSimp(f, B[4], B[5], r, M);
      const [p, q] = simp(r, M);
      f.finish({ ok: `Kết quả là ${frSay(p, q)}.` });
    },
  };
}

/** Chia phân số cho số tự nhiên: a/b : n = a/b × 1/n. Băng a/b chia n, tô một phần. */
function taskDivNat() {
  return {
    id: 'chia-tn',
    make: (rng) => {
      for (;;) {
        const b = rng.int(2, 6), a = rng.int(1, b - 1), n = rng.int(2, 4);
        if (gcd(a, b) === 1 && b * n <= 24) return { a, b, n };
      }
    },
    async mount(f, { a, b, n }) {
      const M = b * n, red = reducible(a, M);
      setQ(f, `${fr(a, b)} : ${n} = ${fr(a, b)} × ${fr(BOX, BOX)} = ${fr(BOX, BOX)}${tail(a, M)}`);
      const t = createFrac(f.tool, { cap: false });
      const R = rowsY(t, 2, { bottom: t.H - 14, maxH: t.tall ? 180 : 100 });
      bar(t, 'a', R[0], { n: b, k: a });
      bar(t, 'b', R[1], { n: b, k: 0, lab: false, color: COL.B });
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: 1, say: `Chia cho ${n}: nhân với phân số đảo ngược của ${n}.`, hint: `${n} viết thành ${n} phần 1. Đảo ngược được 1 phần ${n}.` });
      await f.ask({ box: B[1], answer: n, hint: `Mẫu số là ${n}.` });
      await Promise.all([t.split('a', n), t.split('b', n)]);
      await f.ask({ box: B[2], answer: a, hint: `Tử số nhân tử số: ${a} × 1.` });
      await f.ask({ box: B[3], answer: M, hint: `Mẫu số nhân mẫu số: ${b} × ${n}.` });
      await t.shade('b', a);
      t.set('b', { lab: true });
      if (red) await askSimp(f, B[4], B[5], a, M);
      const [p, q] = simp(a, M);
      f.finish({ ok: cap(`${frSay(a, b)} chia ${n} bằng ${frSay(p, q)}.`) });
    },
  };
}

/** Bài toán lời văn chia phân số. */
const LENS = [[3, 4], [4, 5], [5, 6], [2, 3], [3, 5], [5, 7], [7, 8], [7, 10], [5, 8], [6, 7]];
const WIDS = [[1, 2], [2, 3], [1, 3], [2, 5], [3, 5], [1, 4], [3, 7], [3, 4]];
function taskDivWord() {
  return {
    id: 'chia-loi',
    make: (rng) => {
      const kind = rng.pick(['rect', 'bag', 'cut']);
      if (kind === 'rect') {
        for (;;) {
          const L = rng.pick(LENS), W = rng.pick(WIDS);
          if (L[0] / L[1] > W[0] / W[1]) return { kind, L, W };
        }
      }
      if (kind === 'bag') {
        for (;;) {
          const b = rng.int(2, 9), a = rng.int(1, b - 1), n = rng.int(2, 5);
          if (gcd(a, b) === 1) return { kind, A: [a, b], n };
        }
      }
      // cắt tấm vải A m thành các mảnh 1/k m: được A × k mảnh
      for (;;) {
        const b = rng.int(2, 5), a = rng.int(1, b - 1), m = rng.int(2, 3);
        if (gcd(a, b) === 1) return { kind, A: [a, b], k: b * m };
      }
    },
    async mount(f, m) {
      const B = () => f.q.querySelectorAll('.g4-box');
      if (m.kind === 'rect') {
        const { L, W } = m;
        const S = simp(L[0] * W[0], L[1] * W[1]);
        setQ(f, `Hình chữ nhật có diện tích ${fr(S[0], S[1])} m², chiều rộng ${fr(W[0], W[1])} m. Chiều dài: ${fr(BOX, BOX)} m<small>Rút gọn kết quả (nếu được).</small>`);
        const raw = [S[0] * W[1], S[1] * W[0]];
        await askFrac(f, B()[0], B()[1], L[0], L[1], { say: 'Chiều dài bằng diện tích chia cho chiều rộng.', hint: `${frSay(S[0], S[1])} chia ${frSay(W[0], W[1])}: nhân với ${frSay(W[1], W[0])}.`, raw });
        f.finish({ ok: `Chiều dài là ${frSay(L[0], L[1])} mét.` });
      } else if (m.kind === 'bag') {
        const { A, n } = m;
        const [p, q] = simp(A[0], A[1] * n);
        setQ(f, `Có ${fr(A[0], A[1])} kg đường, chia đều vào ${n} túi. Mỗi túi: ${fr(BOX, BOX)} kg<small>Rút gọn kết quả (nếu được).</small>`);
        await askFrac(f, B()[0], B()[1], p, q, { say: `Chia ${frSay(A[0], A[1])} cho ${n}.`, hint: `${frSay(A[0], A[1])} chia ${n} bằng ${frSay(A[0], A[1])} nhân 1 phần ${n}.`, raw: [A[0], A[1] * n] });
        f.finish({ ok: `Mỗi túi có ${frSay(p, q)} ki-lô-gam đường.` });
      } else {
        const { A, k } = m;
        const ans = (A[0] * k) / A[1];
        setQ(f, `Tấm vải dài ${fr(A[0], A[1])} m, cắt thành các mảnh dài ${fr(1, k)} m. Cắt được ${BOX} mảnh`);
        await f.ask({ box: B()[0], answer: ans, say: `Lấy ${frSay(A[0], A[1])} chia cho 1 phần ${k}.`, hint: `${frSay(A[0], A[1])} chia 1 phần ${k} bằng ${frSay(A[0], A[1])} nhân ${k}, được ${A[0] * k} phần ${A[1]}.` });
        f.finish({ ok: `Cắt được ${ans} mảnh vải.` });
      }
    },
  };
}

// ══ Bài 65. Tìm phân số của một số ═════════════════════════════════════════════════════════════════════
// chưa đối chiếu sách
const ITEMS = { cam: 'quả cam', tao: 'quả táo', keo: 'cái kẹo', bi: 'viên bi', but: 'cái bút' };
const B65 = {
  explore: {
    setup: (board) => createFrac(board, { reserve: RES }),
    steps: [
      async (c) => {
        const t = c.t;
        t.clear();
        const S = createShare(t, { N: 12, b: 3, kind: 'cam' });
        t.share4 = S;
        t.caption(`Rổ có 12 quả cam. ${fr(2, 3)} số cam là mấy quả?`);
        await c.say('Rổ có 12 quả cam. Hai phần ba số cam trong rổ là bao nhiêu quả cam?');
        await c.say('Hai phần ba: chia số cam thành 3 phần bằng nhau, lấy 2 phần. Bấm để chia đều 12 quả cam thành 3 phần.', 'Chia đều thành <b>3 phần</b>');
        const [b] = t.btns([{ html: '🍊 Chia đều thành 3 phần' }]);
        await c.tap(b);
        t.btns([]);
        await S.share();
        t.caption('12 : 3 = 4 (quả)');
        await c.say('Mỗi phần có 4 quả cam: 12 chia 3 bằng 4.');
      },
      async (c) => {
        const t = c.t, S = t.share4;
        await c.say('Hai phần ba số cam là 2 phần như thế. Bấm để lấy 2 đĩa.', 'Bấm lấy <b>2 đĩa</b>');
        S.pickable(true);
        await c.until(t, () => S.st.picked === 2, { nudge: 'Bấm vào hai đĩa cam.', el: () => t.svg.querySelector('.g4fo-plate') });
        S.pickable(false);
        t.caption(`${fr(2, 3)} số cam = ? quả`);
        await c.choose(['8 quả', '4 quả', '6 quả'], '8 quả', { hint: 'Hai đĩa, mỗi đĩa 4 quả.' });
        t.caption(`${fr(2, 3)} của 12 quả: 12 : 3 × 2 = 8 (quả)`);
        await c.say('Hai phần ba của 12 quả cam là 8 quả. Muốn tìm hai phần ba của 12, ta lấy 12 chia cho 3 rồi nhân với 2.', 'Tìm <b>phân số của một số</b>: chia cho mẫu số, nhân với tử số');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const ls = t.tall ? 50 : 42;
        const [r] = rowsY(t, 1, { top: 30, bottom: t.bot - ls * 2.4, maxH: t.tall ? 220 : 190 });
        bar(t, 'a', r, { x: 90, w: 820, n: 5, k: 0, lab: false });
        t.addBg(braceUnder(90, r.y + r.h + 12, 820, '35 học sinh', ls));
        for (let i = 0; i < 5; i++) t.add(svgText(90 + (i + 0.5) * 164, r.y + r.h / 2 + ls * 0.4, ls * 1.2, '?', { fill: '#94A3B8', cls: 'g4fo-per' }));
        t.caption(`Lớp có 35 học sinh, ${fr(3, 5)} số học sinh là nữ`);
        await c.say('Lớp 4A có 35 học sinh, trong đó ba phần năm số học sinh là học sinh nữ. Lớp 4A có bao nhiêu học sinh nữ?');
        await c.say('Chia 35 học sinh thành 5 phần bằng nhau. Mỗi phần có mấy học sinh?');
        await c.choose(['7', '5', '30'], '7', { hint: '35 chia 5.' });
        t.qa('.g4fo-per').forEach(e => { e.textContent = '7'; e.style.fill = INK; });
        await c.say('Mỗi phần 7 học sinh. Ba phần năm là 3 phần. Bấm để tô 3 phần.', 'Bấm tô <b>3 phần</b>');
        t.tappable('a');
        await c.until(t, () => t.get('a').k === 3, { nudge: 'Bấm vào phần thứ ba, tính từ bên trái.', el: () => t.figEl('a') });
        t.tappable('a', false);
        t.qa('.g4fo-per').forEach(e => { e.parentNode.append(e); }); // số nằm trên phần tô
        await c.say('Chọn phép tính tìm số học sinh nữ.');
        await c.choose(['35 : 5 × 3', '35 : 3 × 5', '35 × 5 : 3'], '35 : 5 × 3', { hint: 'Chia cho mẫu số 5 trước, rồi nhân với tử số 3.' });
        t.caption(`${fr(3, 5)} của 35: 35 : 5 × 3 = 21 (học sinh)`);
        await c.say('35 chia 5 bằng 7, 7 nhân 3 bằng 21. Lớp 4A có 21 học sinh nữ.');
      },
    ],
  },
  tasks: () => [taskOfItems(), taskOfCalc(), taskOfWord(), taskOfPick(), taskOfRest()],
};

/** Đồ vật đã chia đều vào b đĩa; a/b của N là mấy? Đúng thì nhấc a đĩa. */
function taskOfItems() {
  return {
    id: 'pso-hinh',
    make: (rng) => {
      for (;;) {
        const b = rng.int(2, 5), per = rng.int(2, 6), a = rng.int(1, b - 1);
        if (gcd(a, b) === 1) return { b, per, a, kind: rng.pick(Object.keys(ITEMS)) };
      }
    },
    async mount(f, { b, per, a, kind }) {
      const N = b * per, what = ITEMS[kind];
      setQ(f, `${fr(a, b)} của ${N} ${what} là ${BOX} ${what}`);
      const t = createFrac(f.tool, { cap: false });
      const S = createShare(t, { N, b, kind, top: 6, bottom: t.H - 40, shared: true, basket: false });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: per * a, say: `Tìm ${frSay(a, b)} của ${N} ${what}.`, hint: `${N} ${what} chia đều ${b} phần, mỗi phần ${per}. Lấy ${a} phần.` });
      S.take(a);
      sfx.pop(a);
      f.finish({ ok: `${N} : ${b} × ${a} = ${per * a} ${what}.` });
    },
  };
}

/** Tính a/b của N theo hai bước: N : b = ▢, ▢ × a = ▢. Băng N chia b phần. */
function taskOfCalc() {
  return {
    id: 'pso-tinh',
    make: (rng) => {
      for (;;) {
        const b = rng.int(3, 9), per = rng.int(2, 12), a = rng.int(2, b - 1);
        if (gcd(a, b) === 1) return { b, per, a };
      }
    },
    async mount(f, { b, per, a }) {
      const N = b * per;
      setQ(f, `${fr(a, b)} của ${N}:<br>${N} : ${b} = ${BOX}<br>${BOX} × ${a} = ${BOX}`);
      const t = createFrac(f.tool, { cap: false });
      const ls = t.tall ? 50 : 40;
      const [r] = rowsY(t, 1, { top: 10, bottom: t.H - ls * 2.4, maxH: t.tall ? 200 : 120 });
      const w = 820, pw = w / b;
      bar(t, 'a', r, { x: 90, w, n: b, k: 0, lab: false });
      t.addBg(braceUnder(90, r.y + r.h + 12, w, String(N), ls));
      for (let i = 0; i < b; i++) t.add(svgText(90 + (i + 0.5) * pw, r.y + r.h / 2 + Math.min(ls, pw * 0.4) * 0.4, Math.min(ls * 1.1, pw * 0.45), '?', { fill: '#94A3B8', cls: 'g4fo-per' }));
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: per, say: `Tìm ${frSay(a, b)} của ${N}. Trước hết chia ${N} cho mẫu số ${b}.`, hint: `${N} chia ${b}.` });
      t.qa('.g4fo-per').forEach(e => { e.textContent = per; e.style.fill = INK; });
      B[1].textContent = per;
      B[1].classList.add('g4-box-ok');
      await f.ask({ box: B[2], answer: per * a, say: `Rồi nhân với tử số ${a}.`, hint: `${per} × ${a}.` });
      await t.shade('a', a);
      t.qa('.g4fo-per').forEach(e => e.parentNode.append(e));
      f.finish({ ok: cap(`${frSay(a, b)} của ${N} là ${per * a}.`) });
    },
  };
}

/** Bài toán lời văn tìm phân số của một số. */
const OF_WORD = [
  { max: 40, text: (N, F) => `Lớp 4A có ${N} học sinh, trong đó ${F} số học sinh là học sinh nữ. Lớp 4A có bao nhiêu học sinh nữ?`, ans: 'Học sinh nữ', unit: 'học sinh' },
  { max: 120, text: (N, F) => `Một cửa hàng có ${N} kg gạo, đã bán ${F} số gạo. Cửa hàng đã bán bao nhiêu ki-lô-gam gạo?`, ans: 'Đã bán', unit: 'kg' },
  { max: 90, text: (N, F) => `Quãng đường từ nhà Nam đến thành phố dài ${N} km. Nam đã đi ${F} quãng đường. Nam đã đi bao nhiêu ki-lô-mét?`, ans: 'Đã đi', unit: 'km' },
  { max: 60, text: (N, F) => `Vườn nhà Mai có ${N} cây ăn quả, ${F} số cây là cây cam. Vườn có bao nhiêu cây cam?`, ans: 'Cây cam', unit: 'cây' },
  { max: 60, text: (N, F) => `Mẹ mua ${N} quả trứng, đã dùng ${F} số trứng để làm bánh. Mẹ đã dùng bao nhiêu quả trứng?`, ans: 'Đã dùng', unit: 'quả' },
];
function genOf(rng, max) {
  for (;;) {
    const b = rng.int(2, 9), per = rng.int(2, 15), a = rng.int(1, b - 1);
    if (gcd(a, b) === 1 && b * per <= max && b * per >= 10) return { b, per, a };
  }
}
/** Sơ đồ: băng N chia b phần, tô a phần (khi đã trả lời). */
function ofBar(t, N, b, label) {
  const ls = t.tall ? 50 : 40;
  const [r] = rowsY(t, 1, { top: 10, bottom: t.H - ls * 2.4, maxH: t.tall ? 190 : 110 });
  bar(t, 'a', r, { x: 90, w: 820, n: b, k: 0, lab: false });
  t.addBg(braceUnder(90, r.y + r.h + 12, 820, label, ls));
}
function taskOfWord() {
  return {
    id: 'pso-loi',
    make: (rng) => { const k = rng.int(0, OF_WORD.length - 1); return { k, ...genOf(rng, OF_WORD[k].max) }; },
    async mount(f, { k, b, per, a }) {
      const ctx = OF_WORD[k], N = b * per;
      setQ(f, `${ctx.text(N, fr(a, b))}<small>${ctx.ans}: ${BOX} ${ctx.unit}</small>`);
      const t = createFrac(f.tool, { cap: false });
      ofBar(t, N, b, `${N} ${ctx.unit}`);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: per * a, say: `Tìm ${frSay(a, b)} của ${N}.`, hint: `Lấy ${N} chia ${b}, được ${per}, rồi nhân với ${a}.` });
      await t.shade('a', a);
      f.finish({ ok: `${N} : ${b} × ${a} = ${per * a} (${ctx.unit})` });
    },
  };
}

/** Chọn phép tính đúng để tìm a/b của N. */
function taskOfPick() {
  return {
    id: 'pso-chon',
    make: (rng) => ({ ...genOf(rng, 60), order: rng.shuffle([0, 1, 2]) }),
    async mount(f, { b, per, a, order }) {
      const N = b * per;
      const opts = [`${N} : ${b} × ${a}`, `${N} : ${a} × ${b}`, `${N} × ${b} : ${a}`];
      setQ(f, `Muốn tìm ${fr(a, b)} của ${N}, ta làm phép tính nào?`);
      await f.choose({
        options: order.map(i => ({ html: opts[i], value: i })), answer: 0, say: `Tìm ${frSay(a, b)} của ${N}: chọn phép tính đúng.`,
        hint: `Chia cho mẫu số ${b} trước, rồi nhân với tử số ${a}.`,
      });
      f.finish({ ok: `${N} : ${b} × ${a} = ${per * a}.` });
    },
  };
}

/** Hai bước: tìm a/b của N rồi tìm phần còn lại. */
function taskOfRest() {
  return {
    id: 'pso-con',
    make: (rng) => ({ ...genOf(rng, 90), road: rng.int(0, 1) }),
    async mount(f, { b, per, a, road }) {
      const N = b * per, x = per * a;
      setQ(f, road
        ? `Quãng đường dài ${N} km. Ô tô đã đi ${fr(a, b)} quãng đường.<small>Đã đi: ${BOX} km · Còn phải đi: ${BOX} km</small>`
        : `Thùng có ${N} l nước, đã dùng ${fr(a, b)} số nước.<small>Đã dùng: ${BOX} l · Còn lại: ${BOX} l</small>`);
      const t = createFrac(f.tool, { cap: false });
      ofBar(t, N, b, `${N} ${road ? 'km' : 'l'}`);
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: x, say: `Bước một: tìm ${frSay(a, b)} của ${N}.`, hint: `${N} : ${b} × ${a}.` });
      await t.shade('a', a);
      await f.ask({ box: B[1], answer: N - x, say: 'Bước hai: tìm phần còn lại.', hint: `${N} − ${x}.` });
      f.finish({ ok: `${road ? 'Còn phải đi' : 'Còn lại'} ${N - x} ${road ? 'km' : 'lít'}.` });
    },
  };
}

export const FRACOPS_LESSONS = { 60: B60, 61: B61, 63: B63, 64: B64, 65: B65 };
