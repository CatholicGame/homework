/**
 * Toán 4 Tập Hai, Bài 53, 54, 55, 56, 57, 58: Phân số: khái niệm, phép chia, tính chất cơ bản, rút gọn, quy đồng, so sánh.
 * Công cụ 🍕 Phân số: grade4Tools/frac4.js (hình tròn, hình chữ nhật chia ô, nhóm hoa) trên băng phân số của Toán 5
 * (grade5Tools/frac.js: băng chia phần, chia nhỏ / gộp phần có chuyển động).
 *   Bài 53: chia hình tròn 6 phần, em tô 1 phần, 2 phần → 1/6, 2/6; tử số, mẫu số; hình chữ nhật 2 × 4.
 *   Bài 54: chia đều 3 (rồi 5) cái bánh cho 4 bạn: em bấm từng bánh, bánh cắt 4 miếng bay vào 4 đĩa → 3/4, 5/4.
 *   Bài 55: băng của Việt (2/3) và của Mai (4/6) dài bằng nhau; nhân / chia cả tử và mẫu.
 *   Bài 56: lớp 35 bạn, 20 bạn nữ: 20/35 gộp 5 phần thành 1 → 4/7, tối giản; 12/18 → 6/9 → 2/3.
 *   Bài 57: quy đồng 2/3 và 5/6 (mẫu này chia hết cho mẫu kia), 1/3 và 2/5 (tích hai mẫu).
 *   Bài 58: cùng mẫu số, so sánh với 1, khác mẫu số (quy đồng).
 */

import { createFrac4, frRead, frReadCap, setQ, rowsY, signHtml, signWord, sectorPath, partAngle, flowerSvg, COL, svgFrac, svgText, fr, INK, gcd } from '../frac4.js';
import { BOX } from '../practice.js';
import { css, sfx } from '../frame.js';
import { anim } from '../canvas.js';

import { readVN } from '../num.js';

/** Phần đáy tờ giấy chừa cho nút chọn / nút công cụ trong Khám phá. */
const RES = 0.22;
const X0 = 110, BW = 700; // băng: lề trái (chừa tên), bề rộng (chừa nhãn phân số bên phải)
const BLUE = '#38BDF8', PINK = '#F472B6', GREEN = '#4ADE80', YEL = '#FBBF24';

/** Phân số to trong nút chọn. */
const big = (a, b) => `<span class="g4fr-big">${fr(a, b)}</span>`;
const bar = (t, id, row, spec = {}) => t.fig(id, { kind: 'bar', x: X0, y: row.y, w: BW, h: row.h, lab: true, ...spec });
/** Bay bản sao băng `from` xuống hàng `row` thành băng mới `to`. */
async function copyDown(t, from, to, row) {
  const f = t.get(from);
  const clone = await t.fly(f.g, 0, row.y - f.y, 650);
  clone.remove();
  const { g, uid, id, ...spec } = f;
  return t.fig(to, { ...spec, y: row.y, h: row.h });
}
/**
 * Băng a/b có thể dài hơn 1 đơn vị (5/4): mỗi phần rộng unitW / b, có max(a, b) phần, tô a phần; nhãn a/b bên phải
 * (nhãn sẵn của băng ghi k/n nên tự vẽ).
 */
function longBar(t, id, row, unitW, a, b, spec = {}) {
  const n = Math.max(a, b), w = (unitW * n) / b;
  const f = t.fig(id, { kind: 'bar', x: X0, y: row.y, w, h: row.h, n, k: a, lab: false, ...spec });
  const ls = Math.min(64, row.h * 0.46);
  t.addBg(svgFrac(X0 + w + 30 + ls * 0.7, row.y + row.h / 2, a, b, ls));
  return f;
}
/** Vạch đỏ đứt đánh dấu 1 đơn vị. */
const unitLine = (t, x, y0, y1) => t.add(`<line x1="${x}" y1="${y0 - 10}" x2="${x}" y2="${y1 + 10}" stroke="#DC2626" stroke-width="5" stroke-dasharray="12 9" pointer-events="none"/>`);
/** Phân số hai màu trong SVG (tử, mẫu khác màu). */
function frac2(x, y, a, b, s, ca, cb) {
  const hw = (Math.max(String(a).length, String(b).length) * s * 0.56 + s * 0.3) / 2;
  return `${svgText(x, y - s * 0.14, s, a, { fill: ca })}<line x1="${x - hw}" y1="${y}" x2="${x + hw}" y2="${y}" stroke="${INK}" stroke-width="${Math.max(3, s * 0.07)}" stroke-linecap="round"/>${svgText(x, y + s * 0.84, s, b, { fill: cb })}`;
}
/** Nhãn phân số đặt riêng (xoá được bằng t.svg.querySelector('.g4fr-lab')). */
function label(t, x, y, a, b, s, fill = INK) {
  t.svg.querySelectorAll('.g4fr-lab').forEach(e => e.remove());
  const g = t.add(`<g class="g4fr-lab">${svgFrac(x, y, a, b, s, fill)}</g>`);
  g.animate([{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'none' }], { duration: anim(380), easing: 'ease-out' });
  return g;
}
/** Lưới rows × cols ô vuông vừa vùng [left, right] × [top, bottom]. */
function fitGrid(rows, cols, { top, bottom, left = 60, right = 940, max = 240 }) {
  const s = Math.min((right - left) / cols, (bottom - top) / rows, max);
  const w = s * cols, h = s * rows;
  return { x: (left + right) / 2 - w / 2, y: (top + bottom) / 2 - h / 2, w, h, rows, cols };
}
/** Chọn ngẫu nhiên k số khác nhau trong 0..n-1. */
const pickSet = (rng, n, k) => rng.shuffle([...Array(n).keys()]).slice(0, k).sort((a, b) => a - b);
/** Phân số tối giản ngẫu nhiên p/q (p < q nếu proper). */
function irr(rng, qLo, qHi, proper = true) {
  for (;;) { const q = rng.int(qLo, qHi), p = rng.int(1, proper ? q - 1 : q + 4); if (p !== q && gcd(p, q) === 1) return [p, q]; }
}
const uniqBy = (arr, key) => { const s = new Set(); return arr.filter(x => { const k = key(x); if (s.has(k)) return false; s.add(k); return true; }); };
const frKey = (o) => `${o[0]}/${o[1]}`;

// ══ Bài 53. Khái niệm phân số ═══════════════════════════════════════════════════════════════════════
/** Hình tròn bên trái, nhãn bên phải (màn ngang) hoặc hình trên, nhãn dưới (màn dọc). */
function pieLayout(t) {
  const top = 16, bot = t.bot - 10;
  if (!t.tall) { const r = Math.min(255, (bot - top) / 2 - 6); return { cx: 300, cy: (top + bot) / 2, r, lx: 700, ly: (top + bot) / 2 - 18, ls: Math.min(110, r * 0.62) }; }
  const r = Math.min(340, (bot - top) * 0.3);
  const cy = top + r + 24, rest = bot - (cy + r);
  return { cx: 500, cy, r, lx: 420, ly: cy + r + rest / 2 - 40, ls: Math.min(130, rest * 0.32) };
}
/** Phân số to có chú thích "Tử số", "Mẫu số" bên phải. */
function annotFrac(t, x, y, a, b, s) {
  t.svg.querySelectorAll('.g4fr-lab').forEach(e => e.remove());
  const tx = x + s * 0.95, fs = s * 0.46;
  return t.add(`<g class="g4fr-lab">${svgFrac(x, y, `${a}`, `${b}`, s, INK)}
    <g class="g4fr-an1" opacity="0"><line x1="${tx - 8}" y1="${y - s * 0.45}" x2="${x + s * 0.5}" y2="${y - s * 0.45}" stroke="#EA580C" stroke-width="5" stroke-linecap="round"/>
      ${svgText(tx, y - s * 0.3, fs, 'Tử số', { anchor: 'start', fill: '#EA580C' })}</g>
    <g class="g4fr-an2" opacity="0"><line x1="${tx - 8}" y1="${y + s * 0.52}" x2="${x + s * 0.5}" y2="${y + s * 0.52}" stroke="#2563EB" stroke-width="5" stroke-linecap="round"/>
      ${svgText(tx, y + s * 0.67, fs, 'Mẫu số', { anchor: 'start', fill: '#2563EB' })}</g></g>`);
}
const showAn = (t, k) => { const e = t.svg.querySelector(`.g4fr-an${k}`); if (e) { e.setAttribute('opacity', '1'); e.animate([{ opacity: 0 }, { opacity: 1 }], { duration: anim(400) }); } };

const B53 = {
  explore: {
    setup: (board) => createFrac4(board, { reserve: RES }),
    steps: [
      async (c) => {
        const t = c.t;
        t.clear();
        const L = pieLayout(t);
        t.shape('p', { kind: 'circle', cx: L.cx, cy: L.cy, r: L.r, n: 1, k: 0, color: BLUE, pick: true });
        t.caption('Chia hình tròn thành <b>6 phần bằng nhau</b>');
        await c.say('Các bạn chia cái bánh thành 6 phần bằng nhau, mỗi bạn lấy 1 phần. Em bấm nút để chia hình tròn thành 6 phần.', 'Bấm <b>✂️ Chia 6 phần</b>');
        const [b] = t.btns([{ html: '✂️ Chia 6 phần' }]);
        await c.tap(b);
        t.btns([]);
        await t.splitShape('p', 6);
        await c.say('Hình tròn đã chia thành 6 phần bằng nhau. Em bấm vào một phần để tô màu.', 'Bấm để tô màu <b>1 phần</b>');
        t.tapShape('p');
        await c.until(t, () => t.count('p') === 1, { nudge: 'Bấm vào một phần của hình tròn.', el: () => t.shapeEl('p') });
        t.tapShape('p', false);
        label(t, L.lx, L.ly, 1, 6, L.ls);
        t.caption(`Đã tô màu <b>một phần sáu</b> hình tròn: ${fr(1, 6)}`);
        await c.say('Đã tô màu một phần sáu hình tròn. Một phần sáu viết là: số 1 ở trên gạch ngang, số 6 ở dưới gạch ngang.');
      },
      async (c) => {
        const t = c.t;
        const L = pieLayout(t);
        t.caption('Ưu tiên em Mi được <b>2 phần</b>');
        await c.say('Ưu tiên em Mi được 2 phần. Em tô màu cho đủ 2 phần.', 'Tô màu cho đủ <b>2 phần</b>');
        t.tapShape('p');
        await c.until(t, () => t.count('p') === 2, { nudge: 'Bấm thêm một phần nữa. Hình tròn có đúng 2 phần tô màu.', el: () => t.shapeEl('p') });
        t.tapShape('p', false);
        t.svg.querySelectorAll('.g4fr-lab').forEach(e => e.remove());
        await c.say('Đã tô màu hai phần sáu hình tròn. Hai phần sáu viết thế nào?', 'Hai phần sáu viết là?');
        await c.choose([{ html: big(2, 6), value: 1 }, { html: big(6, 2), value: 2 }, { html: big(2, 4), value: 3 }], 1, { hint: 'Số phần tô màu viết ở trên gạch ngang, số phần bằng nhau của cả hình viết ở dưới.' });
        label(t, L.lx, L.ly, 2, 6, L.ls);
        t.caption(`Đã tô màu <b>hai phần sáu</b> hình tròn: ${fr(2, 6)}`);
        await c.say('Đúng rồi. Một phần sáu và hai phần sáu là những phân số.', `${fr(1, 6)} và ${fr(2, 6)} là những <b>phân số</b>`);
      },
      async (c) => {
        const t = c.t;
        const L = pieLayout(t);
        const s = L.ls * 1.05;
        annotFrac(t, t.tall ? L.lx - 40 : L.lx - 50, L.ly, 2, 6, s);
        t.caption(`Phân số ${fr(2, 6)}: tử số? mẫu số?`);
        await c.say('Mẫu số chỉ số phần bằng nhau của cả hình tròn. Trong phân số hai phần sáu, số nào là mẫu số?', 'Số nào là <b>mẫu số</b>?');
        await c.choose(['2', '6'], '6', { hint: 'Hình tròn được chia thành mấy phần bằng nhau?' });
        showAn(t, 2);
        await c.say('6 là mẫu số, viết dưới gạch ngang: hình tròn chia thành 6 phần bằng nhau.', '<b>6</b> là mẫu số: số phần bằng nhau');
        showAn(t, 1);
        t.caption(`${fr(2, 6)}: <b>2</b> là tử số, <b>6</b> là mẫu số`);
        await c.say('2 là tử số, viết trên gạch ngang, chỉ số phần đã tô màu. Mẫu số là số tự nhiên khác 0.', '<b>2</b> là tử số: số phần đã tô màu');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const box = t.tall ? fitGrid(2, 4, { top: 30, bottom: t.bot * 0.62, left: 60, right: 940 }) : fitGrid(2, 4, { top: 20, bottom: t.bot - 10, left: 40, right: 600 });
        t.shape('g', { kind: 'grid', ...box, k: 0, color: GREEN, pick: true });
        const lx = t.tall ? 500 : 800, ly = t.tall ? (box.y + box.h + t.bot) / 2 - 40 : box.y + box.h / 2 - 18, ls = t.tall ? 120 : 100;
        t.caption('Hình chữ nhật chia <b>8 phần bằng nhau</b>');
        await c.say('Hình chữ nhật này chia thành 8 phần bằng nhau. Em tô màu 3 phần bất kì.', 'Tô màu <b>3 phần</b>');
        t.tapShape('g');
        await c.until(t, () => t.count('g') === 3, { nudge: 'Bấm vào các ô để tô. Tô đúng 3 ô.', el: () => t.shapeEl('g') });
        t.tapShape('g', false);
        await c.say('Phân số nào chỉ phần đã tô màu?', 'Phân số chỉ phần đã tô màu?');
        await c.choose([{ html: big(3, 8), value: 1 }, { html: big(8, 3), value: 2 }, { html: big(3, 5), value: 3 }], 1, { hint: 'Mẫu số là số phần bằng nhau của cả hình: đếm tất cả các ô.' });
        label(t, lx, ly, 3, 8, ls);
        t.caption(`Đã tô màu <b>ba phần tám</b> hình chữ nhật: ${fr(3, 8)}`);
        await c.say('Đã tô màu ba phần tám hình chữ nhật. Tử số 3, mẫu số 8.');
      },
    ],
  },
  tasks: () => [taskKRead(), taskKParts(), taskKWrite(), taskKName(), taskKSet(), taskKWall()],
};

const GRIDS = [[1, 3], [1, 4], [1, 5], [2, 2], [2, 3], [2, 4], [2, 5], [3, 3], [1, 6], [3, 4]];
/** Vẽ hình (tròn / chữ nhật chia ô / nhóm hoa) giữa vùng vẽ Thực hành. */
function drawPracticeShape(t, m, id = 'a') {
  const H = t.H;
  // Hình lớn theo chỗ có (màn dọc vùng vẽ cao: hình tròn to hơn, hoa xếp nhiều hàng).
  if (m.kind === 'circle') { const r = Math.min(H / 2 - 18, 460); return t.shape(id, { kind: 'circle', cx: 500, cy: H / 2, r, n: m.n, on: m.on, color: m.color }); }
  if (m.kind === 'grid') return t.shape(id, { kind: 'grid', ...fitGrid(m.rows, m.cols, { top: 16, bottom: H - 16, left: 60, right: 940, max: 300 }), on: m.on, color: m.color });
  // số cột cho ô hoa to nhất trong vùng 920 × (H − 24)
  let cols = 1;
  for (let c = 1; c <= m.n; c++) { const cell = (c2) => Math.min(920 / c2, (H - 24) / Math.ceil(m.n / c2)); if (cell(c) > cell(cols)) cols = c; }
  const rows = Math.ceil(m.n / cols);
  const g = fitGrid(rows, cols, { top: 12, bottom: H - 12, left: 40, right: 960, max: 320 });
  return t.shape(id, { kind: 'set', ...g, n: m.n, cols, on: m.on, color: m.color });
}

/** Viết phân số chỉ phần đã tô màu (hình tròn, hình chữ nhật chia ô, nhóm hoa). */
function taskKRead() {
  return {
    id: 'kread',
    make: (rng) => {
      const kind = rng.pick(['circle', 'grid', 'grid', 'set']);
      const color = rng.pick([BLUE, GREEN, '#FB923C', PINK, YEL]);
      if (kind === 'circle') { const n = rng.int(3, 8); return { kind, n, on: pickSet(rng, n, rng.int(1, n - 1)), color }; }
      if (kind === 'grid') { const [rows, cols] = rng.pick(GRIDS); const n = rows * cols; return { kind, rows, cols, n, on: pickSet(rng, n, rng.int(1, n - 1)), color }; }
      const n = rng.int(3, 8); return { kind, n, on: pickSet(rng, n, rng.int(1, n - 1)), color: PINK };
    },
    async mount(f, m) {
      const k = m.on.length;
      const what = m.kind === 'set' ? 'số bông hoa đã tô màu' : 'phần đã tô màu';
      setQ(f, `Phân số chỉ ${what}: ${fr(BOX, BOX)}`);
      const t = createFrac4(f.tool, { cap: false });
      drawPracticeShape(t, m);
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: k, say: `Viết phân số chỉ ${what}.`, hint: m.kind === 'set' ? 'Tử số là số bông hoa đã tô màu.' : 'Tử số là số phần đã tô màu. Đếm các phần tô màu.' });
      await f.ask({ box: B[1], answer: m.n, hint: m.kind === 'set' ? 'Mẫu số là số bông hoa của cả nhóm.' : 'Mẫu số là số phần bằng nhau của cả hình. Đếm tất cả các phần.' });
      f.finish({ ok: `Phần tô màu là ${frRead(k, m.n)}.` });
    },
  };
}

/** Tử số, mẫu số của một phân số (hoặc phân số có tử số, mẫu số cho trước). */
function taskKParts() {
  return {
    id: 'kparts',
    make: (rng) => ({ a: rng.int(1, 19), b: rng.int(2, 25), rev: rng.int(0, 1) }),
    async mount(f, { a, b, rev }) {
      if (!rev) {
        setQ(f, `Phân số ${fr(a, b)} có<br>tử số ${BOX}, mẫu số ${BOX}`);
        const B = f.q.querySelectorAll('.g4-box');
        await f.ask({ box: B[0], answer: a, say: `Phân số ${frRead(a, b)} có tử số là mấy, mẫu số là mấy?`, hint: 'Tử số viết trên gạch ngang.' });
        await f.ask({ box: B[1], answer: b, hint: 'Mẫu số viết dưới gạch ngang.' });
      } else {
        setQ(f, `Phân số có tử số <b>${a}</b>, mẫu số <b>${b}</b>: ${fr(BOX, BOX)}`);
        const B = f.q.querySelectorAll('.g4-box');
        await f.ask({ box: B[0], answer: a, say: `Viết phân số có tử số ${a}, mẫu số ${b}.`, hint: `Tử số ${a} viết trên gạch ngang.` });
        await f.ask({ box: B[1], answer: b, hint: `Mẫu số ${b} viết dưới gạch ngang.` });
      }
      f.finish({ ok: `${frReadCap(a, b)}: tử số ${a}, mẫu số ${b}.` });
    },
  };
}

/** Viết phân số từ cách đọc (Bảy phần mười chín). */
function taskKWrite() {
  return {
    id: 'kwrite',
    make: (rng) => { const b = rng.int(2, 60); return { a: rng.int(1, Math.min(60, b + 10)), b }; },
    async mount(f, { a, b }) {
      setQ(f, `Viết phân số: <b>${frReadCap(a, b)}</b>.<br>${fr(BOX, BOX)}`);
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: a, say: `Viết phân số ${frRead(a, b)}.`, hint: `Đọc trước chữ "phần" là tử số: ${readVN(a)}.` });
      await f.ask({ box: B[1], answer: b, hint: `Đọc sau chữ "phần" là mẫu số: ${b === 4 ? 'tư (bốn)' : readVN(b)}.` });
      f.finish({ ok: `${frReadCap(a, b)}: tử số ${a}, mẫu số ${b}.` });
    },
  };
}

/** Chọn cách đọc của một phân số. */
function taskKName() {
  return {
    id: 'kname',
    make: (rng) => { const [a, b] = [rng.int(1, 12), rng.int(2, 15)]; return a === b ? { a: a + 1, b } : { a, b }; },
    async mount(f, { a, b }) {
      setQ(f, `Phân số ${fr(a, b)} đọc là:`);
      const opts = uniqBy([[a, b], [b, a], [a, b + 1], [a + 1, b]], frKey).slice(0, 3);
      const sh = opts.map(o => ({ html: frReadCap(o[0], o[1]), value: frKey(o) }));
      f.choicesBox.classList.add('g4-choices-col', 'g4-choices-long');
      await f.choose({ options: shuffleBy(sh, a * 7 + b), answer: frKey([a, b]), say: 'Phân số này đọc là gì?', hint: 'Đọc tử số trước, rồi đọc "phần", rồi đọc mẫu số.' });
      f.finish({ ok: `Phân số này đọc là ${frRead(a, b)}.` });
    },
  };
}
/** Trộn cố định theo hạt (mount không có rng; thứ tự nút không lộ đáp án). */
function shuffleBy(arr, seed) {
  const a = [...arr];
  let s = seed * 9301 + 49297;
  for (let i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/** Nút thẻ to trong vùng công cụ (nhóm hoa, lọ hoa…): trả về phần tử chứa để f.choose({ host }). */
function cardHost(f) {
  f.tool.innerHTML = '<div class="g4fr-cards"></div>';
  return f.tool.firstElementChild;
}

/**
 * Nhóm hoa trong một nút thẻ: ba bản vẽ (thẻ cao hẹp, gần vuông, dẹt), CSS chọn bản theo tỉ lệ thẻ (container query);
 * số cột chọn cho hoa to nhất theo tỉ lệ thẻ.
 */
function flowerCard(k, n, color) {
  const one = (aspect, cls) => {
    let best = 1, bs = 0;
    for (let c = 1; c <= n; c++) { const r = Math.ceil(n / c); const sz = Math.min(aspect / c, 1 / r); if (sz > bs + 1e-9) { bs = sz; best = c; } }
    const cols = best, rows = Math.ceil(n / cols);
    let g = '';
    for (let i = 0; i < n; i++) g += flowerSvg(40 * (i % cols) + 20, 40 * Math.floor(i / cols) + 20, 18, i < k, color);
    return `<svg class="g4fr-flset ${cls}" viewBox="0 0 ${cols * 40} ${rows * 40}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${g}</svg>`;
  };
  return `${one(0.38, 'g4fr-fl-t')}${one(0.85, 'g4fr-fl-m')}${one(3.4, 'g4fr-fl-w')}`;
}
/** Hình nào đã tô màu a/b số bông hoa? */
function taskKSet() {
  return {
    id: 'kset',
    make: (rng) => {
      const b = rng.int(3, 6), a = rng.int(1, b - 1);
      const wrong = uniqBy([[b - a, b], [a + 1 < b ? a + 1 : a - 1, b], [a, a + b]], frKey).filter(o => o[0] > 0 && !(o[0] === a && o[1] === b)).slice(0, 2);
      const cards = rng.shuffle([[a, b], ...wrong]);
      return { a, b, cards, ans: cards.findIndex(o => o[0] === a && o[1] === b), color: rng.pick(['#F472B6', '#FB923C', '#38BDF8']) };
    },
    async mount(f, { a, b, cards, ans, color }) {
      setQ(f, `Hình nào đã tô màu ${fr(a, b)} số bông hoa?`);
      const host = cardHost(f);
      await f.choose({
        host, cls: 'g4fr-card',
        options: cards.map((o, i) => ({ value: i, html: flowerCard(o[0], o[1], color) })),
        answer: ans, say: `Hình nào đã tô màu ${frRead(a, b)} số bông hoa?`,
        hint: (i) => `Hình này có ${cards[i][1]} bông hoa, tô màu ${cards[i][0]} bông: ${frRead(cards[i][0], cards[i][1])}.`,
      });
      f.finish({ ok: `Có ${b} bông hoa, tô màu ${a} bông: ${frRead(a, b)}.` });
    },
  };
}

/** Bức tường của Mai: phân số chỉ phần đã sơn / chưa sơn. */
function taskKWall() {
  return {
    id: 'kwall',
    make: (rng) => {
      const cols = rng.int(3, 6), n = 2 * cols;
      const t1 = rng.int(1, cols), t2 = rng.int(t1 === cols ? 0 : 1, cols);
      const k = t1 + t2;
      if (k === 0 || k === n) return { cols, t1: 2, t2: 1, ask: rng.pick(['done', 'todo']) };
      return { cols, t1, t2, ask: rng.pick(['done', 'todo']) };
    },
    async mount(f, { cols, t1, t2, ask }) {
      const n = 2 * cols, k = t1 + t2, want = ask === 'done' ? k : n - k;
      setQ(f, `Phân số chỉ phần bức tường Mai <b>${ask === 'done' ? 'đã sơn' : 'chưa sơn'}</b> là:`);
      const opts = uniqBy([[want, n], [n - want, n], [n, want], [want, n - want]].filter(o => o[1] > 0 && o[0] > 0), frKey);
      const pending = f.choose({
        options: shuffleBy(opts, cols * 13 + t1 * 3 + t2).map(o => ({ html: big(o[0], o[1]), value: frKey(o) })), answer: frKey([want, n]),
        say: `Phân số nào chỉ phần bức tường Mai ${ask === 'done' ? 'đã sơn' : 'chưa sơn'}?`,
        hint: `Bức tường chia ${n} phần bằng nhau: mẫu số là ${n}. Đếm các phần ${ask === 'done' ? 'màu vàng' : 'còn trắng'}.`,
      });
      const t = createFrac4(f.tool, { cap: false });
      const on = [...[...Array(t1)].map((_, i) => i), ...[...Array(t2)].map((_, i) => cols + i)];
      t.shape('w', { kind: 'grid', ...fitGrid(2, cols, { top: 14, bottom: t.H - 14, left: 160, right: 840, max: 200 }), on, color: YEL });
      await pending;
      f.finish({ ok: `Bức tường ${n} phần, ${ask === 'done' ? 'đã sơn' : 'chưa sơn'} ${want} phần: ${frRead(want, n)}.` });
    },
  };
}

// ══ Bài 54. Phân số và phép chia số tự nhiên ═══════════════════════════════════════════════════════
const KIDS = ['Mai', 'Việt', 'Nam', 'Mi'];
/** Hàng bánh trên, 4 đĩa dưới (màn ngang một hàng, màn dọc 2 × 2). */
function cakeLayout(t, nc) {
  const top = 12, bot = t.bot - 6;
  const cakeH = (bot - top) * (t.tall ? 0.3 : 0.38);
  const cr = Math.min(cakeH / 2 - 6, 1000 / nc / 2 - 16, t.tall ? 150 : 92);
  const cakes = [...Array(nc)].map((_, i) => ({ cx: 500 + (i - (nc - 1) / 2) * (2 * cr + 24), cy: top + cakeH / 2, r: cr }));
  const two = nc > 4;
  const y0 = top + cakeH + 8, rest = bot - y0;
  const cols = t.tall ? 2 : 4, rows = t.tall ? 2 : 1;
  const pw = 1000 / cols, ph = rest / rows;
  const nameS = t.tall ? 46 : 32;
  const pr = Math.min((ph - nameS * 1.4) / 2.9, (pw - 30) / (two ? 5.2 : 2.9), t.tall ? 130 : 70);
  const plates = KIDS.map((name, i) => {
    const cx = pw * ((i % cols) + 0.5), cy = y0 + ph * Math.floor(i / cols) + (ph - nameS * 1.2) / 2;
    return { name, cx, cy, pr, two, count: 0 };
  });
  return { cakes, plates, nameS };
}
function drawPlates(t, L) {
  let s = '';
  for (const p of L.plates) {
    const rx = p.two ? p.pr * 2.55 : p.pr * 1.42, ry = p.pr * 1.32;
    s += `<ellipse cx="${p.cx}" cy="${p.cy + p.pr * 0.08}" rx="${rx}" ry="${ry}" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <ellipse cx="${p.cx}" cy="${p.cy + p.pr * 0.08}" rx="${rx * 0.86}" ry="${ry * 0.84}" fill="none" stroke="#CBD5E1" stroke-width="3"/>
      ${svgText(p.cx, p.cy + ry + L.nameS * 1.02, L.nameS, p.name, { fill: '#7C2D12' })}`;
    p.dots = p.two ? [p.cx - p.pr - 6, p.cx + p.pr + 6] : [p.cx];
    s += p.dots.map(x => `<circle cx="${x}" cy="${p.cy}" r="${p.pr}" fill="none" stroke="#E2E8F0" stroke-width="3" stroke-dasharray="8 7"/>`).join('');
  }
  t.addBg(s);
}
/**
 * Em bấm bánh i: bánh cắt thành 4 miếng, mỗi miếng bay vào đĩa một bạn (miếng thứ s của đĩa nằm ở góc tư s % 4
 * của vòng thứ s / 4: đủ 4 miếng thành một cái bánh).
 */
async function serveCake(t, L, i) {
  const c = L.cakes[i];
  await t.splitShape(`c${i}`, 4);
  t.reshape(`c${i}`, { k: 0, faint: true, off: 'none' });
  sfx.swish();
  const flights = L.plates.map((p, j) => {
    const s = p.count++;
    const q = s % 4, dx = p.dots[Math.min(p.dots.length - 1, Math.floor(s / 4))], dy = p.cy;
    const d = sectorPath(dx, dy, p.pr, partAngle(q, 4), partAngle(q + 1, 4));
    const el = t.add(`<g class="g4fr-piece"><path d="${d}" fill="${COL.CAKE}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="${sectorPath(dx, dy, p.pr * 0.72, partAngle(q, 4), partAngle(q + 1, 4))}" fill="${COL.CAKE2}" opacity="0.45"/></g>`);
    el.style.transformBox = 'view-box';
    el.style.transformOrigin = '0 0';
    const rot = (j - q) * 90, sc = c.r / p.pr;
    return el.animate([
      { transform: `translate(${c.cx}px, ${c.cy}px) rotate(${rot}deg) scale(${sc}) translate(${-dx}px, ${-dy}px)` },
      { transform: `translate(${dx}px, ${dy}px) rotate(0deg) scale(1) translate(${-dx}px, ${-dy}px)` },
    ], { duration: anim(780), delay: anim(140) * j, easing: 'ease-in-out', fill: 'both' }).finished;
  });
  await Promise.all(flights);
  sfx.pop(i);
}
/** Cảnh chia nc cái bánh cho 4 bạn; em bấm từng cái bánh. */
async function shareScene(c, nc) {
  const t = c.t;
  t.clear();
  const L = cakeLayout(t, nc);
  drawPlates(t, L);
  for (let i = 0; i < nc; i++) t.shape(`c${i}`, { kind: 'circle', ...L.cakes[i], n: 1, k: 1, cake: true });
  t.caption(`Chia đều <b>${nc} cái bánh</b> cho <b>4 bạn</b>: ${nc} : 4 = ?`);
  await c.say(nc === 3
    ? 'Chia đều 3 cái bánh cho 3 bạn thì mỗi bạn được 1 cái bánh. Nếu chia đều 3 cái bánh cho 4 bạn thì mỗi bạn được mấy phần cái bánh?'
    : 'Nếu chia đều 5 cái bánh cho 4 bạn thì mỗi bạn được mấy phần cái bánh?');
  await c.say('Em bấm vào từng cái bánh. Mỗi cái bánh được cắt thành 4 phần bằng nhau, chia cho mỗi bạn 1 phần.', 'Bấm vào <b>từng cái bánh</b>');
  let served = 0, busy = false;
  const done = new Set();
  for (let i = 0; i < nc; i++) {
    const g = t.shapeEl(`c${i}`);
    g.style.cursor = 'pointer';
    g.addEventListener('click', async () => {
      if (done.has(i) || busy) return;
      done.add(i); busy = true;
      g.style.cursor = '';
      await serveCake(t, L, i);
      busy = false;
      served++;
      t.emit('cake', served);
    });
  }
  await c.until(t, () => served === nc, { nudge: 'Bấm vào cái bánh còn nguyên.', el: () => t.shapeEl(`c${[...Array(nc).keys()].find(i => !done.has(i)) ?? 0}`) });
  return L;
}

const B54 = {
  explore: {
    setup: (board) => createFrac4(board, { reserve: RES }),
    steps: [
      async (c) => {
        const t = c.t;
        await shareScene(c, 3);
        await c.say('Mỗi bạn được 3 phần, mỗi phần là một phần tư cái bánh. Mỗi bạn được bao nhiêu cái bánh?', 'Mỗi bạn được bao nhiêu cái bánh?');
        await c.choose([{ html: big(3, 4), value: 1 }, { html: big(4, 3), value: 2 }, { html: big(1, 4), value: 3 }], 1, { hint: 'Mỗi cái bánh chia 4 phần bằng nhau. Đĩa của mỗi bạn có mấy phần?' });
        t.caption(`3 : 4 = ${fr(3, 4)} (cái bánh)`);
        await c.say('Mỗi bạn được ba phần tư cái bánh. Ta viết: 3 chia 4 bằng ba phần tư.');
      },
      async (c) => {
        const t = c.t;
        await shareScene(c, 5);
        await c.say('Mỗi bạn được 5 phần, mỗi phần là một phần tư cái bánh. Mỗi bạn được bao nhiêu cái bánh?', 'Mỗi bạn được bao nhiêu cái bánh?');
        await c.choose([{ html: big(4, 5), value: 1 }, { html: big(5, 4), value: 2 }, { html: big(1, 5), value: 3 }], 2, { hint: 'Đĩa của mỗi bạn có mấy phần? Mỗi phần là một phần tư cái bánh.' });
        t.caption(`5 : 4 = ${fr(5, 4)} (cái bánh)`);
        await c.say('Mỗi bạn được năm phần tư cái bánh, nhiều hơn 1 cái bánh. Ta viết: 5 chia 4 bằng năm phần tư.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const s = t.tall ? 120 : Math.min(96, (t.bot - 40) / 4.4);
        const y1 = t.tall ? t.bot * 0.24 : t.bot * 0.3, y2 = t.tall ? t.bot * 0.66 : t.bot * 0.78;
        const OR = '#EA580C', BL = '#2563EB', FX = 490 + s * 0.95;
        const row = (y, a, b, ans) => `${svgText(470, y + s * 0.36, s, `<tspan style="fill:${OR}">${a}</tspan> : <tspan style="fill:${BL}">${b}</tspan> =`, { anchor: 'end' })}
          <g class="g4fr-ans">${ans ? svgFrac(FX, y, a, b, s) : svgFrac(FX, y, '?', '?', s, '#94A3B8')}</g>`;
        t.add(`<g class="g4fr-r1">${row(y1, 7, 5, false)}</g>`);
        t.caption('Viết thương thành phân số');
        await c.say('Thương của phép chia 7 cho 5 viết thành phân số nào?', '7 : 5 = ?');
        await c.choose([{ html: big(7, 5), value: 1 }, { html: big(5, 7), value: 2 }], 1, { hint: 'Như 3 chia 4 bằng ba phần tư: số bị chia viết trên, số chia viết dưới.' });
        t.svg.querySelector('.g4fr-r1 .g4fr-ans').innerHTML = frac2(FX, y1, 7, 5, s, OR, BL);
        t.caption(`Tử số là <b>số bị chia</b>, mẫu số là <b>số chia</b>`);
        await c.say('Thương của phép chia số tự nhiên cho số tự nhiên khác 0 viết được thành phân số: tử số là số bị chia, mẫu số là số chia.');
        t.add(`<g>${svgText(470, y2 + s * 0.36, s, '17 =', { anchor: 'end' })}<g class="g4fr-r2">${svgFrac(FX, y2, '?', '?', s, '#94A3B8')}</g></g>`);
        t.caption('Số tự nhiên viết thành phân số');
        await c.say('17 chia 1 bằng 17. Vậy số 17 viết thành phân số nào?', '17 = ?');
        await c.choose([{ html: big(1, 17), value: 1 }, { html: big(17, 1), value: 2 }, { html: big(17, 17), value: 3 }], 2, { hint: '17 chia 1 bằng 17: số bị chia 17, số chia 1.' });
        t.svg.querySelector('.g4fr-r2').innerHTML = svgFrac(FX, y2, 17, 1, s);
        t.caption(`17 = ${fr(17, 1)}: mẫu số bằng <b>1</b>`);
        await c.say('Mọi số tự nhiên viết được thành phân số có tử số là số đó và mẫu số bằng 1.');
      },
    ],
  },
  tasks: () => [taskDQuot(), taskDNat(), taskDOne(), taskDShare(), taskDSeg(), taskDUnit()],
};

/** Viết thương thành phân số. */
function taskDQuot() {
  return {
    id: 'dquot',
    make: (rng) => { for (;;) { const b = rng.pick([rng.int(2, 12), rng.int(13, 99), rng.int(100, 200)]), a = rng.int(1, 210); if (a % b) return { a, b }; } },
    async mount(f, { a, b }) {
      setQ(f, `Viết thương dưới dạng phân số:<br>${a} : ${b} = ${fr(BOX, BOX)}`);
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: a, say: `Viết thương của ${a} chia ${b} dưới dạng phân số.`, hint: `Tử số là số bị chia: ${a}.` });
      await f.ask({ box: B[1], answer: b, hint: `Mẫu số là số chia: ${b}.` });
      f.finish({ ok: `${a} chia ${b} bằng ${frRead(a, b)}: tử số là số bị chia, mẫu số là số chia.` });
    },
  };
}

/** Mẫu: 18 : 9 = 18/9 = 2 (chia hết, kể cả 0 : 6 và 42 : 42). */
function taskDNat() {
  return {
    id: 'dnat',
    make: (rng) => {
      const kind = rng.pick(['n', 'n', 'n', 'zero', 'same']);
      const b = rng.int(2, 25);
      if (kind === 'same') { const x = rng.int(2, 60); return { a: x, b: x }; }
      return kind === 'zero' ? { a: 0, b } : { a: b * rng.int(2, 9), b };
    },
    async mount(f, { a, b }) {
      const v = a / b;
      setQ(f, `${a} : ${b} = ${fr(a, b)} = ${BOX}`);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: v, say: `Viết ${a} chia ${b} thành phân số, rồi tính thương.`,
        hint: a === 0 ? '0 chia cho số nào khác 0 cũng bằng 0.' : a === b ? 'Một số chia cho chính nó bằng 1.' : `${b} nhân mấy bằng ${a}?` });
      f.finish({ ok: `${a} chia ${b} bằng ${frRead(a, b)}, bằng ${v}.` });
    },
  };
}

/** Số tự nhiên viết thành phân số có mẫu số 1. */
function taskDOne() {
  return {
    id: 'done',
    make: (rng) => ({ n: rng.pick([0, rng.int(2, 20), rng.int(21, 99), rng.int(100, 500)]), rev: rng.int(0, 2) === 0 }),
    async mount(f, { n, rev }) {
      setQ(f, rev ? `${fr(n, 1)} = ${BOX}` : `${n} = ${fr(BOX, 1)}`);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: n, say: rev ? `${frRead(n, 1)} bằng số nào?` : `Viết số ${n} thành phân số có mẫu số 1.`,
        hint: rev ? `${n} chia 1 bằng ${n}.` : 'Mọi số tự nhiên viết được thành phân số có tử số là số đó, mẫu số bằng 1.' });
      f.finish({ ok: `${n} bằng ${frRead(n, 1)}.` });
    },
  };
}

// Hình vẽ cho bài toán chia đều: thùng, can, bình, ca, túi gạo, quả cân.
const ICON = {
  barrel: (x, y, w, h) => `<rect x="${x + w * 0.1}" y="${y + h * 0.08}" width="${w * 0.8}" height="${h * 0.9}" rx="${w * 0.14}" fill="#B45309" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="${x + w / 2}" cy="${y + h * 0.1}" rx="${w * 0.4}" ry="${h * 0.08}" fill="#D97706" stroke="${INK}" stroke-width="3"/>
    <line x1="${x + w * 0.1}" y1="${y + h * 0.4}" x2="${x + w * 0.9}" y2="${y + h * 0.4}" stroke="#78350F" stroke-width="4"/><line x1="${x + w * 0.1}" y1="${y + h * 0.75}" x2="${x + w * 0.9}" y2="${y + h * 0.75}" stroke="#78350F" stroke-width="4"/>`,
  can: (x, y, w, h) => `<rect x="${x + w * 0.12}" y="${y + h * 0.22}" width="${w * 0.76}" height="${h * 0.76}" rx="${w * 0.1}" fill="#FDE047" stroke="${INK}" stroke-width="3"/>
    <rect x="${x + w * 0.2}" y="${y + h * 0.06}" width="${w * 0.22}" height="${h * 0.18}" rx="3" fill="#2563EB" stroke="${INK}" stroke-width="2.5"/>
    <path d="M${x + w * 0.5} ${y + h * 0.24} v ${-h * 0.12} h ${w * 0.3} v ${h * 0.12}" fill="none" stroke="${INK}" stroke-width="5"/>`,
  bottle: (x, y, w, h) => `<path d="M${x + w * 0.38} ${y} h ${w * 0.24} v ${h * 0.14} q ${w * 0.32} ${h * 0.06} ${w * 0.32} ${h * 0.24} v ${h * 0.56} q 0 ${h * 0.06} ${-w * 0.08} ${h * 0.06} h ${-w * 0.64} q ${-w * 0.08} 0 ${-w * 0.08} ${-h * 0.06} v ${-h * 0.56} q 0 ${-h * 0.18} ${w * 0.32} ${-h * 0.24} z" fill="#BBF7D0" stroke="${INK}" stroke-width="3"/>
    <rect x="${x + w * 0.1}" y="${y + h * 0.55}" width="${w * 0.8}" height="${h * 0.42}" fill="#60A5FA" opacity="0.7"/>`,
  cup: (x, y, w, h) => `<path d="M${x + w * 0.1} ${y + h * 0.12} h ${w * 0.66} l ${-w * 0.06} ${h * 0.84} h ${-w * 0.54} z" fill="#DBEAFE" stroke="${INK}" stroke-width="3"/>
    <path d="M${x + w * 0.16} ${y + h * 0.4} h ${w * 0.55} l ${-w * 0.04} ${h * 0.55} h ${-w * 0.47} z" fill="#60A5FA" opacity="0.75"/>
    <path d="M${x + w * 0.74} ${y + h * 0.28} q ${w * 0.24} 0 ${w * 0.2} ${h * 0.22} q -${w * 0.02} ${h * 0.16} -${w * 0.24} ${h * 0.16}" fill="none" stroke="${INK}" stroke-width="4"/>`,
  bag: (x, y, w, h) => `<path d="M${x + w * 0.14} ${y + h * 0.1} h ${w * 0.72} l ${w * 0.06} ${h * 0.86} h ${-w * 0.84} z" fill="#DCFCE7" stroke="${INK}" stroke-width="3"/>
    <path d="M${x + w * 0.14} ${y + h * 0.1} q ${w * 0.36} ${h * 0.1} ${w * 0.72} 0" fill="none" stroke="#16A34A" stroke-width="4"/>
    <text x="${x + w / 2}" y="${y + h * 0.64}" class="g4v-t" font-size="${w * 0.26}" style="fill:#15803D">GẠO</text>`,
  weight: (x, y, w, h, lab) => `<path d="M${x + w * 0.2} ${y + h * 0.3} h ${w * 0.6} l ${w * 0.16} ${h * 0.66} h ${-w * 0.92} z" fill="#FCD34D" stroke="${INK}" stroke-width="3"/>
    <rect x="${x + w * 0.38}" y="${y + h * 0.12}" width="${w * 0.24}" height="${h * 0.2}" rx="6" fill="#FCD34D" stroke="${INK}" stroke-width="3"/>
    <text x="${x + w / 2}" y="${y + h * 0.78}" class="g4v-t" font-size="${Math.min(w * 0.3, h * 0.3)}">${lab}</text>`,
};
const SHARE = {
  barrel: { src: 'barrel', dst: 'can', q: (a, b) => `Có <b>${a} thùng</b> nước như nhau, chia đều vào <b>${b} can</b>. Mỗi can có:`, unit: 'thùng', word: 'thùng', say: (a, b) => `Có ${a} thùng nước như nhau, chia đều vào ${b} can. Lượng nước ở mỗi can bằng mấy phần lượng nước của một thùng?` },
  water: { src: 'bottle', dst: 'cup', q: (a, b) => `Rót hết <b>${a} l</b> nước được đầy <b>${b} ca</b> như nhau. Mỗi ca có:`, unit: 'l', word: 'lít', say: (a, b) => `Rót hết ${a} lít nước được đầy ${b} ca như nhau. Mỗi ca có mấy phần lít nước?` },
  rice: { src: 'weight', dst: 'bag', q: (a, b) => `<b>${b} túi gạo</b> như nhau cân nặng <b>${a} kg</b>. Một túi cân nặng:`, unit: 'kg', word: 'ki-lô-gam', say: (a, b) => `${b} túi gạo như nhau cân nặng ${a} ki-lô-gam. Một túi gạo cân nặng mấy phần ki-lô-gam?` },
};
/** Bên trái: thứ đem chia (a thùng / bình a l / quả cân a kg); mũi tên; bên phải: b thứ nhận. */
function drawShare(t, kind, a, b) {
  const H = t.H, S = SHARE[kind];
  const tall = H > 640;
  let s = '';
  const nSrc = kind === 'barrel' ? a : 1;
  if (!tall) {
    const h = Math.min(H - 40, 230), w = h * 0.8;
    const sw = Math.min(w, 300 / nSrc);
    for (let i = 0; i < nSrc; i++) s += ICON[S.src](170 - (nSrc * sw) / 2 + i * sw, H / 2 - (sw / 0.8) / 2, sw * 0.95, sw / 0.8 * 0.95, `${a} kg`);
    if (kind === 'water') s += svgText(170, H / 2 + 30, 54, `${a} l`, { fill: '#14532D' });
    s += `<path d="M 340 ${H / 2} h 90 m -26 -22 l 26 22 l -26 22" fill="none" stroke="#94A3B8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
    const per = b > 4 ? Math.ceil(b / 2) : b, rows = Math.ceil(b / per);
    const cw = Math.min(520 / per, (H - 30) / rows / 1.15), ch = cw * 1.1;
    for (let i = 0; i < b; i++) s += ICON[S.dst](470 + (i % per) * cw + (520 - per * cw) / 2, H / 2 - (rows * ch) / 2 + Math.floor(i / per) * ch, cw * 0.9, ch * 0.9);
  } else {
    const h = Math.min(H * 0.38, 280);
    const sw = Math.min(h * 0.8, 800 / nSrc);
    for (let i = 0; i < nSrc; i++) s += ICON[S.src](500 - (nSrc * sw) / 2 + i * sw, 20, sw * 0.95, sw / 0.8 * 0.95, `${a} kg`);
    if (kind === 'water') s += svgText(500, 20 + h * 0.75, 64, `${a} l`, { fill: '#14532D' });
    const ay = 30 + h + 10;
    s += `<path d="M 500 ${ay} v 70 m -22 -26 l 22 26 l 22 -26" fill="none" stroke="#94A3B8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
    const per = b > 4 ? Math.ceil(b / 2) : b, rows = Math.ceil(b / per);
    const top = ay + 90, room = H - top - 10;
    const cw = Math.min(900 / per, room / rows / 1.15), ch = cw * 1.1;
    for (let i = 0; i < b; i++) s += ICON[S.dst](500 - (per * cw) / 2 + (i % per) * cw, top + Math.floor(i / per) * ch, cw * 0.9, ch * 0.9);
  }
  t.add(`<g pointer-events="none">${s}</g>`);
}

/** Bài toán chia đều: thương viết thành phân số (thùng → can, l nước → ca, kg gạo → túi). */
function taskDShare() {
  return {
    id: 'dshare',
    make: (rng) => {
      const kind = rng.pick(['barrel', 'water', 'rice']);
      for (;;) {
        const a = kind === 'barrel' ? rng.int(2, 4) : rng.int(3, 9), b = kind === 'rice' ? rng.int(2, 5) : rng.int(3, 7);
        if (a % b) return { kind, a, b };
      }
    },
    async mount(f, { kind, a, b }) {
      const S = SHARE[kind];
      if (kind === 'barrel') {
        setQ(f, S.q(a, b));
        const opts = uniqBy([[a, b], [b, a], [a, a + b]], frKey);
        const pending = f.choose({ options: shuffleBy(opts, a * 11 + b).map(o => ({ html: `${big(o[0], o[1])} thùng`, value: frKey(o) })), answer: frKey([a, b]), say: S.say(a, b),
          hint: `Chia ${a} thùng cho ${b} can: ${a} : ${b}. Tử số là số bị chia, mẫu số là số chia.` });
        const t = createFrac4(f.tool, { cap: false });
        drawShare(t, kind, a, b);
        await pending;
      } else {
        setQ(f, `${S.q(a, b)} ${fr(BOX, BOX)} ${S.unit}`);
        const t = createFrac4(f.tool, { cap: false });
        drawShare(t, kind, a, b);
        const B = f.q.querySelectorAll('.g4-box');
        await f.ask({ box: B[0], answer: a, say: S.say(a, b), hint: `Phép chia ${a} : ${b}. Tử số là số bị chia ${a}.` });
        await f.ask({ box: B[1], answer: b, hint: `Mẫu số là số chia: ${b}.` });
      }
      f.finish({ ok: `${a} chia ${b} bằng ${frRead(a, b)} ${S.word}.` });
    },
  };
}

const PTS = ['C', 'D', 'E', 'G', 'H', 'I', 'K'];
/** Đoạn thẳng AB chia n đoạn bằng nhau: AD = ?/? AB (hoặc ?/? m khi AB = 1 m). */
function taskDSeg() {
  return {
    id: 'dseg',
    make: (rng) => { const n = rng.int(3, 8); return { n, k: rng.int(2, n - 1), m: rng.int(0, 1) }; },
    async mount(f, { n, k, m }) {
      const names = ['A', ...PTS.slice(0, n - 1), 'B'];
      const P = names[k];
      setQ(f, m ? `AB = 1 m. A${P} = ${fr(BOX, BOX)} m` : `A${P} = ${fr(BOX, BOX)} AB`);
      const t = createFrac4(f.tool, { cap: false });
      const H = t.H, fs = Math.min(96, H * 0.24), y = H / 2 - fs * 0.45, x0 = 70, x1 = 930, step = (x1 - x0) / n;
      let s = `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
      s += `<line class="g4fr-seg" x1="${x0}" y1="${y}" x2="${x0 + k * step}" y2="${y}" stroke="#F97316" stroke-width="16" stroke-linecap="round" opacity="0.85"/>`;
      for (let i = 0; i <= n; i++) {
        const x = x0 + i * step;
        s += `<line x1="${x}" y1="${y - 22}" x2="${x}" y2="${y + 22}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
        s += svgText(x, y + 22 + fs * 1.05, fs, names[i], { fill: i === k || i === 0 ? '#C2410C' : INK });
      }
      if (m) s += svgText(500, y - 46, fs * 0.8, 'AB = 1 m', { fill: '#2563EB' });
      t.add(`<g pointer-events="none">${s}</g>`);
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: k, say: m ? `Đoạn thẳng AB dài 1 mét, chia thành ${n} đoạn bằng nhau. A ${P} bằng mấy phần của 1 mét?` : `Đoạn thẳng AB chia thành ${n} đoạn bằng nhau. A ${P} bằng mấy phần AB?`, hint: `Đếm số đoạn nhỏ từ A tới ${P}.` });
      await f.ask({ box: B[1], answer: n, hint: `AB chia thành mấy đoạn bằng nhau?` });
      f.finish({ ok: `A${P} bằng ${frRead(k, n)} ${m ? 'mét' : 'AB'}.` });
    },
  };
}

const UNITS = [{ u: 'kg', w: 'ki-lô-gam' }, { u: 'l', w: 'lít' }, { u: 'tấn', w: 'tấn' }, { u: 'm<sup>2</sup>', w: 'mét vuông' }, { u: 'm', w: 'mét' }];
/** Chọn số đo thích hợp với cách đọc (Ba phần tư ki-lô-gam). */
function taskDUnit() {
  return {
    id: 'dunit',
    make: (rng) => { const [a, b] = irr(rng, 2, 12, rng.int(0, 3) > 0); return { a, b, u: rng.int(0, UNITS.length - 1), u2: rng.int(0, UNITS.length - 2) }; },
    async mount(f, { a, b, u, u2 }) {
      const U = UNITS[u], O = UNITS.filter((_, i) => i !== u)[u2];
      setQ(f, `Chọn số đo: <b>${frReadCap(a, b)} ${U.w}</b>`);
      const opts = uniqBy([[a, b, U], [b, a, U], [a, b, O], [a, b + 1, U]], o => `${o[0]}/${o[1]}${o[2].u}`);
      await f.choose({ options: shuffleBy(opts, a * 5 + b + u).map(o => ({ html: `${big(o[0], o[1])} ${o[2].u}`, value: `${o[0]}/${o[1]}${o[2].u}` })), answer: `${a}/${b}${U.u}`,
        say: `Số đo nào đọc là ${frRead(a, b)} ${U.w}?`, hint: (v) => (v.endsWith(U.u) && !v.startsWith(`${a}/${b}`) ? 'Tử số đọc trước chữ "phần", mẫu số đọc sau.' : `Đơn vị là ${U.w}.`) });
      f.finish({ ok: `${frReadCap(a, b)} ${U.w}.` });
    },
  };
}

// ══ Bài 55. Tính chất cơ bản của phân số ═════════════════════════════════════════════════════════════
const B55 = {
  explore: {
    setup: (board) => createFrac4(board, { reserve: RES }),
    steps: [
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 2, { maxH: t.tall ? 210 : 130 });
        bar(t, 'v', R[0], { n: 3, k: 0, lab: false, color: GREEN, name: 'Việt' });
        bar(t, 'm', R[1], { n: 3, k: 0, lab: false, color: '#EF4444', name: 'Mai' });
        t.caption('Có hai băng giấy <b>như nhau</b>');
        await c.say('Có hai băng giấy như nhau. Việt chia băng giấy thành 3 phần bằng nhau. Em tô màu 2 phần băng của Việt.', 'Tô màu <b>2 phần</b> băng của Việt');
        t.tappable('v');
        await c.until(t, () => t.get('v').k === 2, { nudge: 'Bấm vào phần thứ hai của băng trên.', el: () => t.figEl('v') });
        t.tappable('v', false);
        t.set('v', { lab: true });
        await c.say('Việt tô màu hai phần ba băng giấy. Mai chia băng giấy thành 6 phần bằng nhau: em bấm nút chia mỗi phần thành 2.', 'Bấm <b>✂️ Chia mỗi phần thành 2</b>');
        const [b] = t.btns([{ html: '✂️ Chia mỗi phần thành 2' }]);
        await c.tap(b);
        t.btns([]);
        await t.split('m', 2);
        await c.say('Băng của Mai có 6 phần bằng nhau. Em tô màu 4 phần.', 'Tô màu <b>4 phần</b> băng của Mai');
        t.tappable('m');
        await c.until(t, () => t.get('m').k === 4, { nudge: 'Bấm vào phần thứ tư của băng dưới.', el: () => t.figEl('m') });
        t.tappable('m', false);
        t.set('m', { lab: true });
        const x = X0 + BW * 2 / 3;
        t.add(`<line x1="${x}" y1="${R[0].y - 14}" x2="${x}" y2="${R[1].y + R[1].h + 14}" stroke="#DC2626" stroke-width="5" stroke-dasharray="12 9" pointer-events="none"/>`);
        await c.say('Nhìn vào hình vẽ: phần tô màu của hai băng dài bằng nhau. Chọn dấu thích hợp.', `${fr(2, 3)} ? ${fr(4, 6)}`);
        await c.choose(['>', '<', '='].map(s => ({ html: `${fr(2, 3)} ${signHtml(s)} ${fr(4, 6)}`, value: s })), '=', { hint: 'Phần tô màu của hai băng dài bằng nhau.' });
        t.caption(`${fr(2, 3)} băng giấy bằng ${fr(4, 6)} băng giấy: ${fr(2, 3)} = ${fr(4, 6)}`);
        await c.say('Hai phần ba băng giấy bằng bốn phần sáu băng giấy. Ta nói phân số hai phần ba bằng phân số bốn phần sáu.');
      },
      async (c) => {
        const t = c.t;
        t.caption(`${fr(2, 3)} = ${fr('2 × ?', '3 × ?')} = ${fr(4, 6)}`);
        await c.say('Mỗi phần của Việt được chia thành 2 phần. Từ hai phần ba sang bốn phần sáu, cả tử số và mẫu số được nhân với mấy?', 'Cả tử số và mẫu số nhân với mấy?');
        await c.choose(['2', '3', '4'], '2', { hint: '3 nhân mấy được 6? 2 nhân mấy được 4?' });
        t.caption(`${fr(2, 3)} = ${fr('2 × 2', '3 × 2')} = ${fr(4, 6)}`);
        await c.say('Nhân cả tử số và mẫu số với 2: hai phần ba bằng bốn phần sáu.');
        await c.say('Ngược lại, gộp mỗi 2 phần của Mai thành 1 phần. Em bấm nút gộp.', 'Bấm <b>🧩 Gộp 2 phần thành 1</b>');
        const [b] = t.btns([{ html: '🧩 Gộp 2 phần thành 1' }]);
        await c.tap(b);
        t.btns([]);
        await t.merge('m', 2);
        t.caption(`${fr(4, 6)} = ${fr('4 : 2', '6 : 2')} = ${fr(2, 3)}`);
        await c.say('Chia cả tử số và mẫu số cho 2: bốn phần sáu bằng hai phần ba. Đây là tính chất cơ bản của phân số.');
        t.caption('Nhân hoặc chia cả tử số và mẫu số với <b>cùng một số</b> (khác 0)');
        await c.say('Nếu nhân cả tử số và mẫu số với cùng một số tự nhiên khác 0, hoặc chia hết cả tử số và mẫu số cho cùng một số tự nhiên khác 0, thì được một phân số bằng phân số đã cho.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 2, { maxH: t.tall ? 210 : 130 });
        bar(t, 'a', R[0], { n: 4, k: 3 });
        bar(t, 'b', R[1], { n: 4, k: 3, lab: false, color: BLUE });
        t.caption(`${fr(3, 4)} = ${fr('?', 12)}`);
        await c.say('Em thử: ba phần tư bằng mấy phần mười hai? Muốn băng dưới có 12 phần, mỗi phần chia thành mấy phần?', 'Mỗi phần chia thành mấy phần?');
        await c.choose(['2', '3', '4'], '3', { hint: '4 nhân mấy được 12?' });
        await t.split('b', 3);
        t.caption(`${fr(3, 4)} = ${fr('3 × 3', '4 × 3')} = ${fr('?', 12)}`);
        await c.say('Mẫu số nhân 3 thì tử số cũng nhân 3. Tử số mới là mấy?', 'Tử số mới là mấy?');
        await c.choose(['6', '9', '12'], '9', { hint: 'Đếm số phần tô màu của băng dưới, hoặc tính 3 nhân 3.' });
        t.set('b', { lab: true });
        t.caption(`${fr(3, 4)} = ${fr('3 × 3', '4 × 3')} = ${fr(9, 12)}`);
        await c.say('Ba phần tư bằng chín phần mười hai. Phần tô màu của hai băng vẫn dài bằng nhau.');
      },
    ],
  },
  tasks: () => [taskEMul(), taskEDiv(), taskEFind(), taskEMiss(), taskECard(), taskEQuot(), taskEChain()],
};

/** a/b = (a × m)/(b × m) = ?/?: băng dưới chia nhỏ sau khi em điền. */
function taskEMul() {
  return {
    id: 'emul',
    make: (rng) => { const [p, q] = irr(rng, 2, 9); return { p, q, m: rng.int(2, q > 6 ? 3 : 4) }; },
    async mount(f, { p, q, m }) {
      setQ(f, `${fr(p, q)} = ${fr(`${p} × ${m}`, `${q} × ${m}`)} = ${fr(BOX, BOX)}`);
      const t = createFrac4(f.tool, { cap: false });
      const R = rowsY(t, 2, { bottom: t.H - 14, maxH: t.tall ? 190 : 110 });
      bar(t, 'a', R[0], { n: q, k: p });
      bar(t, 'b', R[1], { n: q, k: p, lab: false, color: BLUE });
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: p * m, say: 'Nhân cả tử số và mẫu số rồi viết phân số mới.', hint: `${p} × ${m} = ?` });
      await f.ask({ box: B[1], answer: q * m, hint: `${q} × ${m} = ?` });
      await t.split('b', m);
      t.set('b', { lab: true });
      f.finish({ ok: `${frReadCap(p, q)} bằng ${frRead(p * m, q * m)}.` });
    },
  };
}

/** (a)/(b) = (a : m)/(b : m) = ?/?: băng gộp phần sau khi em điền. */
function taskEDiv() {
  return {
    id: 'ediv',
    make: (rng) => { const [p, q] = irr(rng, 2, 9); return { p, q, m: rng.int(2, q > 6 ? 4 : 5) }; },
    async mount(f, { p, q, m }) {
      const P = p * m, Q = q * m;
      setQ(f, `${fr(P, Q)} = ${fr(`${P} : ${m}`, `${Q} : ${m}`)} = ${fr(BOX, BOX)}`);
      const t = createFrac4(f.tool, { cap: false });
      const R = rowsY(t, 2, { bottom: t.H - 14, maxH: t.tall ? 190 : 110 });
      bar(t, 'a', R[0], { n: Q, k: P });
      bar(t, 'b', R[1], { n: Q, k: P, lab: false, color: BLUE });
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: p, say: 'Chia cả tử số và mẫu số rồi viết phân số mới.', hint: `${P} : ${m} = ?` });
      await f.ask({ box: B[1], answer: q, hint: `${Q} : ${m} = ?` });
      await t.merge('b', m);
      t.set('b', { lab: true });
      f.finish({ ok: `${frReadCap(P, Q)} bằng ${frRead(p, q)}.` });
    },
  };
}

/** Tìm số nhân / số chia: 2/5 = (2 × ?)/(5 × ?) = 10/25; 36/40 = (36 : ?)/(40 : ?) = 9/10. */
function taskEFind() {
  return {
    id: 'efind',
    make: (rng) => { const [p, q] = irr(rng, 2, 10); return { p, q, m: rng.int(2, 9), div: rng.int(0, 1) }; },
    async mount(f, { p, q, m, div }) {
      const P = p * m, Q = q * m;
      setQ(f, div ? `${fr(P, Q)} = ${fr(`${P} : ${BOX}`, `${Q} : ${BOX}`)} = ${fr(p, q)}` : `${fr(p, q)} = ${fr(`${p} × ${BOX}`, `${q} × ${BOX}`)} = ${fr(P, Q)}`);
      const B = f.q.querySelectorAll('.g4-box');
      const hint = div ? `${Q} chia cho mấy được ${q}?` : `${q} nhân với mấy được ${Q}?`;
      await f.ask({ box: B[0], answer: m, say: div ? 'Chia cả tử số và mẫu số cho cùng số nào?' : 'Nhân cả tử số và mẫu số với cùng số nào?', hint });
      await f.ask({ box: B[1], answer: m, hint: 'Tử số và mẫu số phải cùng nhân (hoặc cùng chia) một số.' });
      f.finish({ ok: div ? `Chia cả tử số và mẫu số cho ${m}.` : `Nhân cả tử số và mẫu số với ${m}.` });
    },
  };
}

/** Củ cà rốt (SVG) có số, làm nút chọn. */
const carrot = (n) => `<span class="g4fr-carrot"><svg viewBox="0 0 120 46" aria-hidden="true"><path d="M8 23 q 10 -18 34 -18 h 50 q 22 4 26 18 q -4 14 -26 18 h -50 q -24 0 -34 -18 z" transform="rotate(180 60 23)" fill="#FB923C" stroke="${INK}" stroke-width="2.5"/>
  <path d="M104 23 l 14 -14 M104 23 l 15 0 M104 23 l 14 14" stroke="#16A34A" stroke-width="5" stroke-linecap="round"/></svg><b>${n}</b></span>`;
/** Chọn số còn thiếu của phân số trong tấm bìa (2/3 = ?/6) bằng củ cà rốt. */
function taskEMiss() {
  return {
    id: 'emiss',
    make: (rng) => {
      const [p, q] = irr(rng, 2, 9);
      const m = rng.int(2, 6), dir = rng.pick(['up', 'down']), hide = rng.pick(['n', 'd']);
      return { p, q, m, dir, hide };
    },
    async mount(f, { p, q, m, dir, hide }) {
      const [A, B] = dir === 'up' ? [[p, q], [p * m, q * m]] : [[p * m, q * m], [p, q]];
      const ans = hide === 'n' ? B[0] : B[1];
      setQ(f, `${fr(A[0], A[1])} = ${hide === 'n' ? fr(BOX, B[1]) : fr(B[0], BOX)}`);
      // nhầm hay gặp: cộng thêm thay vì nhân (2/3 = ?/6 → 5), số gần đúng
      const known = hide === 'n' ? 1 : 0; // vị trí đã biết của phân số sau
      const addErr = A[1 - known] + (B[known] - A[known]);
      const cand = [ans, addErr, ans + 1, ans - 1, ans * 2, ans + 2].filter(v => v > 0);
      const opts = [...new Set(cand)].slice(0, 4);
      const box = f.q.querySelector('.g4-box');
      const kn = known ? 'mẫu số' : 'tử số', un = known ? 'tử số' : 'mẫu số';
      await f.choose({ options: shuffleBy(opts, p * 3 + q * 7 + m).map(v => ({ html: carrot(v), value: v })), answer: ans, cls: 'g4fr-cbtn',
        say: 'Chọn củ cà rốt có số thích hợp.',
        hint: dir === 'up' ? `${kn[0].toUpperCase() + kn.slice(1)} ${A[known]} nhân ${m} được ${B[known]}: ${un} ${A[1 - known]} cũng nhân ${m}.`
          : `${kn[0].toUpperCase() + kn.slice(1)} ${A[known]} chia ${m} được ${B[known]}: ${un} ${A[1 - known]} cũng chia ${m}.` });
      box.textContent = ans;
      box.classList.add('g4-box-ok');
      f.finish({ ok: `${frReadCap(A[0], A[1])} bằng ${frRead(B[0], B[1])}.` });
    },
  };
}

/** Cùng giảm m lần tử số và mẫu số của phân số trên tấm thẻ. */
function taskECard() {
  return {
    id: 'ecard',
    make: (rng) => { const [p, q] = irr(rng, 2, 9, false); return { p, q, m: rng.int(2, 5) }; },
    async mount(f, { p, q, m }) {
      const P = p * m, Q = q * m;
      setQ(f, `Cùng giảm <b>${m} lần</b> tử số và mẫu số của ${fr(P, Q)}, ta được phân số nào bằng nó?`);
      const opts = uniqBy([[p, q], [p, Q], [P, q], [q, p]].filter(o => o[0] !== o[1]), frKey);
      await f.choose({ options: shuffleBy(opts, P + Q * 3).map(o => ({ html: big(o[0], o[1]), value: frKey(o) })), answer: frKey([p, q]),
        say: `Cùng giảm ${m} lần cả tử số và mẫu số của phân số ${frRead(P, Q)}, ta được phân số nào?`, hint: `Chia cả tử số ${P} và mẫu số ${Q} cho ${m}.` });
      f.finish({ ok: `Chia cả tử số và mẫu số cho ${m}, được ${frRead(p, q)}.` });
    },
  };
}

/** Thương không đổi: (a × k) : (b × k) = a : b. */
function taskEQuot() {
  return {
    id: 'equot',
    make: (rng) => {
      const op = rng.pick(['×', ':']);
      const k = rng.int(2, 5), v = rng.int(2, 9);
      const b = op === ':' ? k * rng.int(1, 4) : rng.int(2, 9);
      return { a: b * v, b, k, op };
    },
    async mount(f, { a, b, k, op }) {
      const v = a / b;
      setQ(f, `${a} : ${b} = ${v}<br>(${a} ${op} ${k}) : (${b} ${op} ${k}) = ${BOX}`);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: v, say: `${op === '×' ? 'Nhân' : 'Chia'} số bị chia và số chia ${op === '×' ? 'với' : 'cho'} cùng số ${k}. Thương là mấy?`,
        hint: `Tính ${op === '×' ? a * k : a / k} : ${op === '×' ? b * k : b / k}. Thương không thay đổi.` });
      f.finish({ ok: `${op === '×' ? 'Nhân' : 'Chia'} số bị chia và số chia ${op === '×' ? 'với' : 'cho'} cùng một số thì thương không thay đổi: vẫn bằng ${v}.` });
    },
  };
}

/** Dãy phân số bằng nhau: 2/3 = 6/? = ?/18 = ?/45. */
function taskEChain() {
  return {
    id: 'echain',
    make: (rng) => {
      const [p, q] = irr(rng, 2, 7);
      const ms = rng.shuffle([2, 3, 4, 5, 6, 7, 8]).slice(0, 3).sort((a, b) => a - b);
      return { p, q, ms };
    },
    async mount(f, { p, q, ms }) {
      const [m1, m2, m3] = ms;
      setQ(f, `${fr(p, q)} = ${fr(p * m1, BOX)} = ${fr(BOX, q * m2)} = ${fr(BOX, q * m3)}`);
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: q * m1, say: 'Điền số để được các phân số bằng nhau.', hint: `${p} nhân ${m1} được ${p * m1}: mẫu số ${q} cũng nhân ${m1}.` });
      await f.ask({ box: B[1], answer: p * m2, hint: `${q} nhân ${m2} được ${q * m2}: tử số ${p} cũng nhân ${m2}.` });
      await f.ask({ box: B[2], answer: p * m3, hint: `${q} nhân ${m3} được ${q * m3}: tử số ${p} cũng nhân ${m3}.` });
      f.finish({ ok: `Nhân cả tử số và mẫu số của ${frRead(p, q)} với ${m1}, ${m2}, ${m3}.` });
    },
  };
}

// ══ Bài 56. Rút gọn phân số ═════════════════════════════════════════════════════════════════════════
const B56 = {
  explore: {
    setup: (board) => createFrac4(board, { reserve: RES }),
    steps: [
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 2, { maxH: t.tall ? 210 : 130 });
        bar(t, 'a', R[0], { n: 35, k: 20, color: PINK });
        t.caption(`Lớp có 35 bạn, 20 bạn nữ: ${fr(20, 35)} số học sinh`);
        await c.say('Lớp mình có 35 bạn, trong đó có 20 bạn nữ. Số bạn nữ bằng hai mươi phần ba mươi lăm số học sinh cả lớp. Ta rút gọn phân số này: tìm phân số bằng nó nhưng tử số và mẫu số bé hơn.');
        await c.say('20 và 35 cùng chia hết cho số nào?', '20 và 35 cùng chia hết cho số nào?');
        await c.choose(['2', '3', '5'], '5', { hint: '20 và 35 có chữ số tận cùng là 0 và 5.' });
        await c.say('Cùng chia hết cho 5. Em bấm nút gộp mỗi 5 phần thành 1 phần.', 'Bấm <b>🧩 Gộp 5 phần thành 1</b>');
        const [b] = t.btns([{ html: '🧩 Gộp 5 phần thành 1' }]);
        await c.tap(b);
        t.btns([]);
        await copyDown(t, 'a', 'b', R[1]);
        await t.merge('b', 5);
        t.caption(`${fr(20, 35)} = ${fr('20 : 5', '35 : 5')} = ${fr(4, 7)}`);
        await c.say('Chia tử số và mẫu số cho 5, được bốn phần bảy. Phần tô màu vẫn dài như cũ. Phân số hai mươi phần ba mươi lăm đã được rút gọn thành bốn phần bảy.');
      },
      async (c) => {
        const t = c.t;
        t.caption(`${fr(4, 7)} còn rút gọn được nữa không?`);
        await c.say('Bốn phần bảy còn rút gọn được nữa không?');
        await c.choose(['Còn rút gọn được', 'Không rút gọn được nữa'], 'Không rút gọn được nữa', { hint: '4 và 7 có cùng chia hết cho số nào lớn hơn 1 không?' });
        t.caption(`${fr(4, 7)} là <b>phân số tối giản</b>`);
        await c.say('4 và 7 không cùng chia hết cho số tự nhiên nào lớn hơn 1. Bốn phần bảy là phân số tối giản. Khi rút gọn phân số, ta phải rút gọn đến phân số tối giản.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 3, { maxH: t.tall ? 180 : 100 });
        bar(t, 'a', R[0], { n: 18, k: 12, color: GREEN });
        t.caption(`Rút gọn ${fr(12, 18)}`);
        await c.say('Rút gọn mười hai phần mười tám. 12 và 18 cùng chia hết cho 2. Em chia cho 2 trước.', 'Bấm <b>🧩 Gộp 2 phần thành 1</b>');
        let [b] = t.btns([{ html: '🧩 Gộp 2 phần thành 1' }]);
        await c.tap(b);
        t.btns([]);
        await copyDown(t, 'a', 'b', R[1]);
        await t.merge('b', 2);
        t.caption(`${fr(12, 18)} = ${fr(6, 9)}`);
        await c.say('Được sáu phần chín. Sáu phần chín còn rút gọn được không? 6 và 9 cùng chia hết cho số nào?', '6 và 9 cùng chia hết cho số nào?');
        await c.choose(['2', '3', '6'], '3', { hint: '6 và 9 đều có trong bảng nhân 3.' });
        [b] = t.btns([{ html: '🧩 Gộp 3 phần thành 1' }]);
        await c.tap(b);
        t.btns([]);
        await copyDown(t, 'b', 'c', R[2]);
        await t.merge('c', 3);
        t.caption(`${fr(12, 18)} = ${fr(6, 9)} = ${fr(2, 3)}`);
        await c.say('Được hai phần ba: phân số tối giản. Vậy mười hai phần mười tám rút gọn được hai phần ba.');
      },
    ],
  },
  tasks: () => [taskRIrr(), taskRSimp(), taskRVase(), taskRChain(), taskRPick(), taskRProd(), taskRRabbit()],
};

/** Phân số nào tối giản (hoặc chưa tối giản)? */
function taskRIrr() {
  return {
    id: 'rirr',
    make: (rng) => {
      const wantIrr = rng.int(0, 1) === 1;
      const good = () => irr(rng, 3, 20);
      const bad = () => { for (;;) { const [p, q] = irr(rng, 2, 9); const g = rng.int(2, 5); if (q * g <= 60) return [p * g, q * g]; } };
      const opts = [wantIrr ? good() : bad()];
      while (opts.length < 4) { const o = wantIrr ? bad() : good(); if (!opts.some(x => frKey(x) === frKey(o))) opts.push(o); }
      const sh = rng.shuffle(opts);
      return { wantIrr, opts: sh, ans: sh.findIndex(o => frKey(o) === frKey(opts[0])) };
    },
    async mount(f, { wantIrr, opts, ans }) {
      setQ(f, wantIrr ? 'Phân số nào là <b>phân số tối giản</b>?' : 'Phân số nào <b>chưa tối giản</b>?');
      await f.choose({
        options: opts.map((o, i) => ({ html: big(o[0], o[1]), value: i })), answer: ans, say: `Phân số nào ${wantIrr ? '' : 'chưa '}tối giản?`,
        hint: (i) => { const [n, d] = opts[i]; const g = gcd(n, d); return g > 1 ? `${n} và ${d} cùng chia hết cho ${g}: còn rút gọn được.` : `${n} và ${d} không cùng chia hết cho số nào lớn hơn 1: đã tối giản.`; },
      });
      const [n, d] = opts[ans];
      f.finish({ ok: wantIrr ? `${n} và ${d} không cùng chia hết cho số nào lớn hơn 1.` : `${n} và ${d} cùng chia hết cho ${gcd(n, d)}.` });
    },
  };
}

/** Rút gọn đến tối giản; băng gộp phần sau khi em điền (mẫu số nhỏ). */
function taskRSimp() {
  return {
    id: 'rsimp',
    make: (rng) => {
      if (rng.int(0, 3) === 0) { const [p, q] = irr(rng, 2, 9); const g = rng.pick([10, 15, 20, 25]); return { p, q, g }; }
      const [p, q] = irr(rng, 2, 9);
      return { p, q, g: rng.int(2, Math.max(2, Math.min(6, Math.floor(40 / q)))) };
    },
    async mount(f, { p, q, g }) {
      const P = p * g, Q = q * g;
      setQ(f, `Rút gọn: ${fr(P, Q)} = ${fr(BOX, BOX)}<small>Viết phân số tối giản.</small>`);
      const t = Q <= 40 ? createFrac4(f.tool, { cap: false }) : null;
      if (t) { const [r] = rowsY(t, 1, { bottom: t.H - 16, maxH: t.tall ? 240 : 190 }); bar(t, 'a', r, { n: Q, k: P }); }
      const B = f.q.querySelectorAll('.g4-box');
      const hint = (v, want, all) => (v !== want && all % v === 0 && v > want ? 'Chưa tối giản: tử số và mẫu số còn cùng chia hết cho một số nữa.' : `${P} và ${Q} cùng chia hết cho ${g}.`);
      await f.ask({ box: B[0], answer: p, say: 'Rút gọn phân số đến phân số tối giản.', hint: (v) => hint(v, p, P) });
      await f.ask({ box: B[1], answer: q, hint: (v) => hint(v, q, Q) });
      if (t) await t.merge('a', g);
      f.finish({ ok: `Chia cả tử số và mẫu số cho ${g}: ${frRead(P, Q)} rút gọn được ${frRead(p, q)}.` });
    },
  };
}

const VASE_COL = ['#F97316', '#7DD3FC', '#FB923C', '#C084FC'];
/** Lọ hoa (SVG) có phân số trên thân, làm nút chọn. */
const vase = (o, i) => `<span class="g4fr-vase"><svg viewBox="0 0 100 120" aria-hidden="true"><path d="M34 6 h32 v14 q 0 8 10 18 q 18 18 14 48 q -4 26 -22 30 h -36 q -18 -4 -22 -30 q -4 -30 14 -48 q 10 -10 10 -18 z" fill="${VASE_COL[i % 4]}" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="50" cy="78" rx="26" ry="30" fill="#fff" opacity="0.85"/></svg><span class="g4fr-vase-fr">${fr(o[0], o[1])}</span></span>`;
/** Rút gọn phân số ghi ở bông hoa được phân số nào ghi ở lọ hoa? */
function taskRVase() {
  return {
    id: 'rvase',
    make: (rng) => {
      const [p, q] = irr(rng, 2, 8);
      const g = rng.int(2, 5);
      const opts = [[p, q]];
      while (opts.length < 4) { const o = irr(rng, 2, 8); if (!opts.some(x => frKey(x) === frKey(o))) opts.push(o); }
      const sh = rng.shuffle(opts);
      return { P: p * g, Q: q * g, opts: sh, ans: sh.findIndex(o => o[0] === p && o[1] === q) };
    },
    async mount(f, { P, Q, opts, ans }) {
      setQ(f, `Rút gọn ${fr(P, Q)} được phân số ghi ở lọ hoa nào?`);
      f.tool.innerHTML = `<div class="g4fr-vflow"><svg viewBox="0 0 200 200" class="g4fr-flower">${flowerSvg(100, 100, 98, true, '#F472B6')}<circle cx="100" cy="100" r="52" fill="#FDE047" stroke="${INK}" stroke-width="3"/></svg><span class="g4fr-ffr">${fr(P, Q)}</span></div><div class="g4fr-cards g4fr-vases"></div>`;
      const host = f.tool.querySelector('.g4fr-cards');
      await f.choose({ host, cls: 'g4fr-card', options: opts.map((o, i) => ({ html: vase(o, i), value: i })), answer: ans, say: `Rút gọn phân số ${frRead(P, Q)} được phân số ghi ở lọ hoa nào?`,
        hint: () => `Tìm số lớn nhất mà ${P} và ${Q} cùng chia hết, rồi chia cả tử số và mẫu số cho số đó.` });
      const [p, q] = opts[ans];
      f.finish({ ok: `${frReadCap(P, Q)} rút gọn được ${frRead(p, q)}.` });
    },
  };
}

/** 12/18 = 6/? = ?/3: rút gọn hai bước. */
function taskRChain() {
  return {
    id: 'rchain',
    make: (rng) => { const [p, q] = irr(rng, 2, 7); const [a, b] = rng.pick([[2, 2], [2, 3], [3, 2], [2, 5], [5, 2], [3, 3]]); return { p, q, a, b }; },
    async mount(f, { p, q, a, b }) {
      const P = p * a * b, Q = q * a * b;
      setQ(f, `${fr(P, Q)} = ${fr(p * b, BOX)} = ${fr(BOX, q)}`);
      const B = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: B[0], answer: q * b, say: 'Điền số để được các phân số bằng nhau.', hint: `${P} chia ${a} được ${p * b}: mẫu số ${Q} cũng chia ${a}.` });
      await f.ask({ box: B[1], answer: p, hint: `${q * b} chia ${b} được ${q}: tử số ${p * b} cũng chia ${b}.` });
      f.finish({ ok: `${frReadCap(P, Q)} bằng ${frRead(p * b, q * b)} và bằng ${frRead(p, q)}.` });
    },
  };
}

/** Rút gọn 48/60 được phân số tối giản là: (bốn lựa chọn, có các bước rút gọn dở dang). */
function taskRPick() {
  return {
    id: 'rpick',
    make: (rng) => { const [p, q] = irr(rng, 3, 9); return { p, q, g: rng.pick([4, 6, 8, 12]) }; },
    async mount(f, { p, q, g }) {
      const P = p * g, Q = q * g;
      setQ(f, `Rút gọn ${fr(P, Q)} được phân số <b>tối giản</b> là:`);
      const half = [P / 2, Q / 2];
      const part = g % 3 === 0 ? [P / 3, Q / 3] : [P / 4, Q / 4];
      const wrong = p > 1 ? [p - 1, q] : [p + 1, q];
      const opts = uniqBy([[p, q], half, part, wrong, [q, p]], frKey).slice(0, 4);
      await f.choose({ options: shuffleBy(opts, P + Q).map(o => ({ html: big(o[0], o[1]), value: frKey(o) })), answer: frKey([p, q]), say: `Rút gọn phân số ${frRead(P, Q)} được phân số tối giản nào?`,
        hint: (v) => { const [n, d] = v.split('/').map(Number); return gcd(n, d) > 1 ? `${frReadCap(n, d)} chưa tối giản: còn rút gọn được.` : `${frReadCap(n, d)} không bằng ${frRead(P, Q)}.`; } });
      f.finish({ ok: `${frReadCap(P, Q)} rút gọn được ${frRead(p, q)}: ${p} và ${q} không cùng chia hết cho số nào lớn hơn 1.` });
    },
  };
}

/** Tính (theo mẫu): (12 × 11 × 13)/(13 × 17 × 11) = 12/17: chia nhẩm cả tích trên và tích dưới. */
function taskRProd() {
  return {
    id: 'rprod',
    make: (rng) => {
      for (;;) {
        const p = rng.int(2, 49), q = rng.int(2, 49);
        if (p === q || gcd(p, q) !== 1) continue;
        const b = rng.int(3, 49), c = rng.int(3, 49);
        if (new Set([p, q, b, c]).size < 4) continue;
        return { p, q, b, c, ord: rng.pick([[0, 1, 2], [1, 0, 2], [2, 1, 0], [1, 2, 0]]) };
      }
    },
    async mount(f, { p, q, b, c, ord }) {
      const den = [q, b, c];
      const top = `${p} × ${b} × ${c}`, bot = ord.map(i => den[i]).join(' × ');
      setQ(f, `${fr(top, bot)} = ${fr(BOX, BOX)}`);
      const B = f.q.querySelectorAll('.g4-box');
      const hint = `Cả tích ở trên và tích ở dưới cùng chia nhẩm cho ${b}, rồi chia nhẩm cho ${c}.`;
      await f.ask({ box: B[0], answer: p, say: 'Tính theo mẫu: chia nhẩm cả tích ở trên và tích ở dưới cho cùng một số.', hint });
      await f.ask({ box: B[1], answer: q, hint });
      f.finish({ ok: `Chia nhẩm cả tích trên và tích dưới cho ${b} và ${c}, còn ${frRead(p, q)}.` });
    },
  };
}

const RABBITS = [{ name: 'Thỏ nâu', col: '#C08457' }, { name: 'Thỏ xám', col: '#A8A29E' }, { name: 'Thỏ trắng', col: '#FFFFFF' }];
/** Đầu thỏ (SVG) tâm (x, y) cỡ s. */
function rabbitSvg(x, y, s, col) {
  return `<ellipse cx="${x - s * 0.28}" cy="${y - s * 0.75}" rx="${s * 0.16}" ry="${s * 0.5}" fill="${col}" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="${x + s * 0.28}" cy="${y - s * 0.75}" rx="${s * 0.16}" ry="${s * 0.5}" fill="${col}" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="${x - s * 0.28}" cy="${y - s * 0.72}" rx="${s * 0.07}" ry="${s * 0.34}" fill="#FBCFE8"/><ellipse cx="${x + s * 0.28}" cy="${y - s * 0.72}" rx="${s * 0.07}" ry="${s * 0.34}" fill="#FBCFE8"/>
    <circle cx="${x}" cy="${y}" r="${s * 0.5}" fill="${col}" stroke="${INK}" stroke-width="3"/>
    <circle cx="${x - s * 0.18}" cy="${y - s * 0.08}" r="${s * 0.06}" fill="${INK}"/><circle cx="${x + s * 0.18}" cy="${y - s * 0.08}" r="${s * 0.06}" fill="${INK}"/>
    <path d="M${x - s * 0.06} ${y + s * 0.1} h ${s * 0.12} l ${-s * 0.06} ${s * 0.07} z" fill="#F472B6"/>
    <path d="M${x} ${y + s * 0.17} q ${-s * 0.08} ${s * 0.1} ${-s * 0.16} ${s * 0.04} M${x} ${y + s * 0.17} q ${s * 0.08} ${s * 0.1} ${s * 0.16} ${s * 0.04}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`;
}
/** Thỏ mẹ chia giỏ cà rốt: hai thỏ con nào được số phần bằng nhau? */
function taskRRabbit() {
  return {
    id: 'rrabbit',
    make: (rng) => {
      const [p, q] = irr(rng, 2, 5);
      const [m1, m2] = rng.shuffle([1, 2, 5, 10, 25].filter(m => q * m <= 100)).slice(0, 2);
      let o;
      do { o = irr(rng, 2, 10); } while (o[0] * q === o[1] * p);
      const fr3 = [[p * m1, q * m1], [p * m2, q * m2], o];
      const order = rng.shuffle([0, 1, 2]);
      return { fr3: order.map(i => fr3[i]), odd: order.indexOf(2) };
    },
    async mount(f, { fr3, odd }) {
      setQ(f, 'Hai thỏ con nào được thỏ mẹ chia số phần giỏ cà rốt <b>bằng nhau</b>?');
      const pairs = [[0, 1], [0, 2], [1, 2]];
      const ans = pairs.findIndex(pr => !pr.includes(odd));
      const pending = f.choose({ options: pairs.map((pr, i) => ({ html: `${RABBITS[pr[0]].name} và ${RABBITS[pr[1]].name.replace('Thỏ ', 'thỏ ')}`, value: i })), answer: ans,
        say: 'Rút gọn các phân số rồi so sánh: hai thỏ con nào được số phần bằng nhau?', hint: 'Rút gọn mỗi phân số đến tối giản rồi so sánh.' });
      f.choicesBox.classList.add('g4fr-pairs');
      const t = createFrac4(f.tool, { cap: false });
      const H = t.H, s = Math.min(200, H * 0.3), fs = Math.min(110, s * 0.6);
      let svg = '';
      fr3.forEach((o, i) => {
        const x = 170 + i * 330, y = s * 1.25 + 4;
        svg += rabbitSvg(x, y, s, RABBITS[i].col);
        svg += svgText(x, y + s * 0.5 + s * 0.42, s * 0.3, RABBITS[i].name, { fill: '#7C2D12' });
        svg += svgFrac(x, y + s * 0.92 + fs * 0.95, o[0], o[1], fs);
      });
      t.add(`<g pointer-events="none">${svg}</g>`);
      await pending;
      const [a, b] = pairs[ans];
      f.finish({ ok: `${frReadCap(fr3[a][0], fr3[a][1])} bằng ${frRead(fr3[b][0], fr3[b][1])}: ${RABBITS[a].name.toLowerCase()} và ${RABBITS[b].name.toLowerCase()} được bằng nhau.` });
    },
  };
}

// ══ Bài 57. Quy đồng mẫu số các phân số ═════════════════════════════════════════════════════════════
// chưa đối chiếu sách (không có ảnh trang 62–63): dựng theo kiến thức chuẩn SGK Toán 4 KNTT, mẫu số này chia hết cho
// mẫu số kia là chính, thêm trường hợp lấy tích hai mẫu số.
const B57 = {
  explore: {
    setup: (board) => createFrac4(board, { reserve: RES }),
    steps: [
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 2, { maxH: t.tall ? 210 : 130 });
        bar(t, 'a', R[0], { n: 3, k: 2 });
        bar(t, 'b', R[1], { n: 6, k: 5, color: BLUE });
        t.caption(`Quy đồng mẫu số ${fr(2, 3)} và ${fr(5, 6)}`);
        await c.say('Hai băng giấy chia khác nhau: một băng 3 phần, một băng 6 phần. Quy đồng mẫu số là làm cho hai phân số có cùng mẫu số mà vẫn bằng phân số cũ.');
        await c.say('6 chia hết cho 3. Ta chọn mẫu số chung là số nào?', 'Mẫu số chung là?');
        await c.choose(['3', '6', '9'], '6', { hint: '6 chia hết cho 3: lấy mẫu số lớn hơn làm mẫu số chung.' });
        await c.say('Mẫu số chung là 6. 6 chia 3 được 2: chia mỗi phần của băng trên thành 2 phần.', 'Bấm <b>✂️ Chia mỗi phần thành 2</b>');
        const [b] = t.btns([{ html: '✂️ Chia mỗi phần thành 2' }]);
        await c.tap(b);
        t.btns([]);
        await t.split('a', 2);
        t.caption(`${fr(2, 3)} = ${fr('2 × 2', '3 × 2')} = ${fr(4, 6)} · giữ nguyên ${fr(5, 6)}`);
        await c.say('Hai phần ba bằng bốn phần sáu. Giữ nguyên năm phần sáu. Quy đồng mẫu số hai phần ba và năm phần sáu được bốn phần sáu và năm phần sáu.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 2, { maxH: t.tall ? 210 : 130 });
        bar(t, 'a', R[0], { n: 3, k: 1 });
        bar(t, 'b', R[1], { n: 5, k: 2, color: BLUE });
        t.caption(`Quy đồng mẫu số ${fr(1, 3)} và ${fr(2, 5)}`);
        await c.say('Một phần ba và hai phần năm: 5 không chia hết cho 3. Ta lấy tích hai mẫu số làm mẫu số chung. 3 nhân 5 bằng mấy?', '3 × 5 = ?');
        await c.choose(['8', '15', '35'], '15', { hint: '3 nhân 5.' });
        await c.say('Mẫu số chung là 15. Băng trên chia mỗi phần thành 5, băng dưới chia mỗi phần thành 3.', 'Bấm <b>✂️ Quy đồng</b>');
        const [b] = t.btns([{ html: '✂️ Quy đồng' }]);
        await c.tap(b);
        t.btns([]);
        await Promise.all([t.split('a', 5), t.split('b', 3)]);
        t.caption(`${fr(1, 3)} = ${fr('1 × 5', '3 × 5')} = ${fr(5, 15)} · ${fr(2, 5)} = ${fr('2 × 3', '5 × 3')} = ${fr(6, 15)}`);
        await c.say('Nhân cả tử số và mẫu số của một phần ba với 5, của hai phần năm với 3. Được năm phần mười lăm và sáu phần mười lăm.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 2, { maxH: t.tall ? 210 : 130 });
        bar(t, 'a', R[0], { n: 4, k: 3 });
        bar(t, 'b', R[1], { n: 8, k: 5, color: BLUE });
        t.caption(`Quy đồng mẫu số ${fr(3, 4)} và ${fr(5, 8)}`);
        await c.say('Em tự quy đồng ba phần tư và năm phần tám. Mẫu số chung là 8. Chia mỗi phần của băng trên thành mấy phần?', 'Chia mỗi phần thành mấy phần?');
        await c.choose(['2', '4', '8'], '2', { hint: '8 chia 4 được mấy?' });
        await t.split('a', 2);
        t.caption(`${fr(3, 4)} = ${fr('3 × 2', '4 × 2')} = ${fr('?', 8)}`);
        await c.choose(['5', '6', '7'], '6', { hint: 'Đếm số phần tô màu của băng trên, hoặc tính 3 nhân 2.' });
        t.caption(`${fr(3, 4)} = ${fr(6, 8)} · giữ nguyên ${fr(5, 8)}`);
        await c.say('Quy đồng mẫu số ba phần tư và năm phần tám được sáu phần tám và năm phần tám.');
      },
    ],
  },
  tasks: () => [taskQMsc(), taskQDiv(), taskQProd(), taskQCheck()],
};

/** Hai phân số có mẫu số này chia hết cho mẫu số kia (hoặc hai mẫu nhỏ nguyên tố cùng nhau). */
function pairDiv(rng) {
  for (;;) {
    const b = rng.int(2, 9), m = rng.int(2, b > 5 ? 3 : 5), d = b * m;
    const a = rng.int(1, b - 1), c = rng.int(1, d - 1);
    if (gcd(a, b) === 1 && gcd(c, d) === 1) return rng.int(0, 1) ? { A: [a, b], B: [c, d], m } : { A: [c, d], B: [a, b], m };
  }
}
function pairProd(rng) {
  for (;;) {
    const b = rng.int(2, 7), d = rng.int(2, 7);
    if (b === d || gcd(b, d) !== 1) continue;
    const a = rng.int(1, b - 1), c = rng.int(1, d - 1);
    return { A: [a, b], B: [c, d] };
  }
}

/** Chọn mẫu số chung. */
function taskQMsc() {
  return {
    id: 'qmsc',
    make: (rng) => (rng.int(0, 2) ? { ...pairDiv(rng), kind: 'div' } : { ...pairProd(rng), kind: 'prod' }),
    async mount(f, { A, B, kind }) {
      const msc = kind === 'div' ? Math.max(A[1], B[1]) : A[1] * B[1];
      setQ(f, `Quy đồng mẫu số ${fr(A[0], A[1])} và ${fr(B[0], B[1])}.<br>Chọn mẫu số chung:`);
      const opts = [...new Set([msc, A[1] + B[1], Math.min(A[1], B[1]), kind === 'div' ? A[1] * B[1] : Math.max(A[1], B[1]), msc * 2])].slice(0, 4);
      await f.choose({ options: shuffleBy(opts, A[1] * 5 + B[1]).map(v => ({ html: String(v), value: v })), answer: msc, cls: 'g4-choice-big', say: 'Chọn mẫu số chung.',
        hint: kind === 'div' ? `${Math.max(A[1], B[1])} chia hết cho ${Math.min(A[1], B[1])}: lấy ${Math.max(A[1], B[1])} làm mẫu số chung.` : `Mẫu số chung phải chia hết cho cả ${A[1]} và ${B[1]}: lấy ${A[1]} × ${B[1]}.` });
      f.finish({ ok: `Mẫu số chung là ${msc}.` });
    },
  };
}

/** Quy đồng khi mẫu số này chia hết cho mẫu số kia: điền tử số mới; băng chia nhỏ sau khi điền. */
function taskQDiv() {
  return {
    id: 'qdiv',
    make: (rng) => pairDiv(rng),
    async mount(f, { A, B, m }) {
      const [S, L] = A[1] < B[1] ? [A, B] : [B, A];
      setQ(f, `Quy đồng mẫu số ${fr(A[0], A[1])} và ${fr(B[0], B[1])}:<br>${fr(S[0], S[1])} = ${fr(`${S[0]} × ${BOX}`, `${S[1]} × ${m}`)} = ${fr(BOX, L[1])} · giữ nguyên ${fr(L[0], L[1])}`);
      const t = createFrac4(f.tool, { cap: false });
      const R = rowsY(t, 2, { bottom: t.H - 14, maxH: t.tall ? 190 : 110 });
      bar(t, 's', R[0], { n: S[1], k: S[0] });
      bar(t, 'l', R[1], { n: L[1], k: L[0], color: BLUE });
      const Bx = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: Bx[0], answer: m, say: `Mẫu số chung là ${L[1]}. Quy đồng phân số ${frRead(S[0], S[1])}.`, hint: 'Tử số nhân với cùng số như mẫu số.' });
      await f.ask({ box: Bx[1], answer: S[0] * m, hint: `${S[0]} × ${m} = ?` });
      await t.split('s', m);
      f.finish({ ok: `Được ${frRead(S[0] * m, L[1])} và ${frRead(L[0], L[1])}.` });
    },
  };
}

/** Quy đồng lấy tích hai mẫu số: điền hai tử số mới. */
function taskQProd() {
  return {
    id: 'qprod',
    make: (rng) => pairProd(rng),
    async mount(f, { A, B }) {
      const M = A[1] * B[1];
      setQ(f, `Quy đồng mẫu số ${fr(A[0], A[1])} và ${fr(B[0], B[1])}<small>Mẫu số chung: ${A[1]} × ${B[1]} = ${M}</small>${fr(A[0], A[1])} = ${fr(BOX, M)} · ${fr(B[0], B[1])} = ${fr(BOX, M)}`);
      const t = createFrac4(f.tool, { cap: false });
      const R = rowsY(t, 2, { bottom: t.H - 14, maxH: t.tall ? 190 : 110 });
      bar(t, 'a', R[0], { n: A[1], k: A[0] });
      bar(t, 'b', R[1], { n: B[1], k: B[0], color: BLUE });
      const Bx = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: Bx[0], answer: A[0] * B[1], say: 'Quy đồng mẫu số hai phân số, lấy tích hai mẫu số làm mẫu số chung.', hint: `Nhân cả tử số và mẫu số của ${frRead(A[0], A[1])} với ${B[1]}.` });
      await t.split('a', B[1]);
      await f.ask({ box: Bx[1], answer: B[0] * A[1], hint: `Nhân cả tử số và mẫu số của ${frRead(B[0], B[1])} với ${A[1]}.` });
      await t.split('b', A[1]);
      f.finish({ ok: `Được ${frRead(A[0] * B[1], M)} và ${frRead(B[0] * A[1], M)}.` });
    },
  };
}

/** Bạn quy đồng đúng hay sai? (lỗi hay gặp: quên nhân tử số, cộng thay vì nhân) */
function taskQCheck() {
  return {
    id: 'qcheck',
    make: (rng) => {
      const { A, B, m } = pairDiv(rng);
      const err = rng.pick(['ok', 'ok', 'num', 'add']);
      return { A, B, m, err };
    },
    async mount(f, { A, B, m, err }) {
      const [S, L] = A[1] < B[1] ? [A, B] : [B, A];
      const top = err === 'num' ? S[0] : err === 'add' ? S[0] + (L[1] - S[1]) : S[0] * m;
      const okAns = top === S[0] * m;
      setQ(f, `Bạn quy đồng mẫu số ${fr(S[0], S[1])} và ${fr(L[0], L[1])} được ${fr(top, L[1])} và ${fr(L[0], L[1])}. Đúng hay sai?`);
      await f.choose({ options: [{ html: 'Đúng', value: true }, { html: 'Sai', value: false }], answer: okAns, cls: 'g4-choice-big', say: 'Bạn quy đồng đúng hay sai?',
        hint: `${S[1]} nhân ${m} được ${L[1]}: tử số ${S[0]} cũng phải nhân ${m}.` });
      f.finish({ ok: `${frReadCap(S[0], S[1])} bằng ${frRead(S[0] * m, L[1])}.` });
    },
  };
}

// ══ Bài 58. So sánh phân số ═════════════════════════════════════════════════════════════════════════
// chưa đối chiếu sách (không có ảnh trang 64–68): so sánh cùng mẫu số, so sánh với 1, khác mẫu số (quy đồng),
// cùng tử số (nếu sách lớp 4 có).
const B58 = {
  explore: {
    setup: (board) => createFrac4(board, { reserve: RES }),
    steps: [
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 2, { maxH: t.tall ? 210 : 130 });
        bar(t, 'a', R[0], { n: 5, k: 0, lab: false });
        bar(t, 'b', R[1], { n: 5, k: 3, color: BLUE });
        t.caption(`So sánh ${fr(2, 5)} và ${fr(3, 5)}`);
        await c.say('So sánh hai phần năm và ba phần năm. Băng dưới đã tô ba phần năm. Em tô màu hai phần năm ở băng trên.', 'Tô màu <b>2 phần</b> băng trên');
        t.tappable('a');
        await c.until(t, () => t.get('a').k === 2, { nudge: 'Bấm vào phần thứ hai của băng trên.', el: () => t.figEl('a') });
        t.tappable('a', false);
        t.set('a', { lab: true });
        await c.choose(['>', '<', '='].map(s => ({ html: `${fr(2, 5)} ${signHtml(s)} ${fr(3, 5)}`, value: s })), '<', { hint: 'Phần tô màu băng nào ngắn hơn?' });
        t.caption(`${fr(2, 5)} &lt; ${fr(3, 5)}: cùng mẫu số, tử số bé hơn thì bé hơn`);
        await c.say('Hai phân số cùng mẫu số: phân số nào có tử số bé hơn thì bé hơn, tử số lớn hơn thì lớn hơn, tử số bằng nhau thì bằng nhau.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 3, { maxH: t.tall ? 170 : 100 });
        const w = 560;
        t.fig('one', { kind: 'bar', x: X0, y: R[0].y, w, h: R[0].h, n: 1, k: 1, color: '#FDE68A', name: '1' });
        longBar(t, 'a', R[1], w, 3, 4);
        longBar(t, 'b', R[2], w, 5, 4, { color: BLUE });
        unitLine(t, X0 + w, R[0].y, R[2].y + R[2].h);
        t.caption(`So sánh với 1: ${fr(3, 4)} và ${fr(5, 4)}`);
        await c.say('Băng trên cùng là 1 đơn vị. Ba phần tư so với 1 thế nào?', `${fr(3, 4)} ? 1`);
        await c.choose(['>', '<', '='].map(s => ({ html: `${fr(3, 4)} ${signHtml(s)} 1`, value: s })), '<', { hint: 'Phần tô màu của ba phần tư chưa tới vạch đỏ.' });
        await c.say('Ba phần tư bé hơn 1: tử số 3 bé hơn mẫu số 4. Còn năm phần tư so với 1 thế nào?', `${fr(5, 4)} ? 1`);
        await c.choose(['>', '<', '='].map(s => ({ html: `${fr(5, 4)} ${signHtml(s)} 1`, value: s })), '>', { hint: 'Phần tô màu của năm phần tư vượt qua vạch đỏ.' });
        t.caption(`${fr(3, 4)} &lt; 1 · ${fr(4, 4)} = 1 · ${fr(5, 4)} &gt; 1`);
        await c.say('Tử số bé hơn mẫu số thì phân số bé hơn 1. Tử số bằng mẫu số thì bằng 1. Tử số lớn hơn mẫu số thì lớn hơn 1.');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        const R = rowsY(t, 2, { maxH: t.tall ? 210 : 130 });
        bar(t, 'a', R[0], { n: 4, k: 3 });
        bar(t, 'b', R[1], { n: 8, k: 5, color: BLUE });
        t.caption(`So sánh ${fr(3, 4)} và ${fr(5, 8)}`);
        await c.say('Ba phần tư và năm phần tám khác mẫu số. Ta quy đồng mẫu số rồi so sánh. Mẫu số chung là 8.', 'Bấm <b>✂️ Chia mỗi phần thành 2</b>');
        const [b] = t.btns([{ html: '✂️ Chia mỗi phần thành 2' }]);
        await c.tap(b);
        t.btns([]);
        await t.split('a', 2);
        t.caption(`${fr(3, 4)} = ${fr(6, 8)} · so sánh ${fr(6, 8)} và ${fr(5, 8)}`);
        await c.choose(['>', '<', '='].map(s => ({ html: `${fr(3, 4)} ${signHtml(s)} ${fr(5, 8)}`, value: s })), '>', { hint: 'Cùng mẫu số 8: so sánh 6 và 5.' });
        t.caption(`${fr(6, 8)} &gt; ${fr(5, 8)} nên ${fr(3, 4)} &gt; ${fr(5, 8)}`);
        await c.say('Sáu phần tám lớn hơn năm phần tám, nên ba phần tư lớn hơn năm phần tám. Hai phân số khác mẫu số: quy đồng mẫu số rồi so sánh hai tử số.');
      },
    ],
  },
  tasks: () => [taskSSame(), taskSOne(), taskSDiff(), taskSBig(), taskSNum(), taskSLess()],
};

/** So sánh hai phân số (bảng hai băng), chọn dấu. kind: 'den' cùng mẫu, 'one' so với 1, 'div' khác mẫu, 'num' cùng tử. */
async function cmpMount(f, kind, A, B) {
  const va = A[0] / A[1], vb = B[0] / B[1];
  const ans = Math.abs(va - vb) < 1e-9 ? '=' : va > vb ? '>' : '<';
  const right = B[1] === 1 ? '1' : fr(B[0], B[1]);
  setQ(f, `${fr(A[0], A[1])} <span class="g4-box" style="min-width:1.4em"></span> ${right}`);
  const pending = f.choose({
    options: ['>', '<', '='].map(s => ({ html: signHtml(s), value: s })), answer: ans, cls: 'g4-choice-big', say: 'Chọn dấu thích hợp.',
    hint: kind === 'den' ? 'Cùng mẫu số: so sánh hai tử số.' : kind === 'one' ? 'So sánh tử số với mẫu số.' : kind === 'num' ? 'Cùng tử số: phân số nào có mẫu số bé hơn thì lớn hơn.' : 'Quy đồng mẫu số rồi so sánh hai tử số.',
  });
  const t = createFrac4(f.tool, { cap: false });
  const R = rowsY(t, 2, { bottom: t.H - 16, maxH: t.tall ? 190 : 100 });
  if (kind === 'one') {
    // băng 1 đơn vị ở dưới; phân số lớn hơn 1 (7/5) là băng dài hơn, mỗi phần vẫn bằng 1/5 đơn vị
    const over = Math.max(1, A[0] / A[1]), unitW = Math.min(560, 720 / over);
    longBar(t, 'a', R[0], unitW, A[0], A[1]);
    t.fig('b', { kind: 'bar', x: X0, y: R[1].y, w: unitW, h: R[1].h, n: 1, k: 1, color: '#FDE68A', name: '1' });
    unitLine(t, X0 + unitW, R[0].y, R[1].y + R[1].h);
  } else {
    bar(t, 'a', R[0], { n: A[1], k: A[0] });
    bar(t, 'b', R[1], { n: B[1], k: B[0], color: BLUE });
  }
  await pending;
  const box = f.q.querySelector('.g4-box');
  box.innerHTML = signHtml(ans);
  box.classList.add('g4-box-ok');
  if (kind === 'div' && A[1] !== B[1]) {
    const [small, bigF] = A[1] < B[1] ? ['a', 'b'] : ['b', 'a'];
    await t.split(small, t.get(bigF).n / t.get(small).n);
  }
  f.finish({ ok: `${frReadCap(A[0], A[1])} ${signWord(ans)} ${B[1] === 1 ? '1' : frRead(B[0], B[1])}.` });
}

function taskSSame() {
  return {
    id: 'ssame',
    make: (rng) => { const n = rng.int(3, 12); let a, b; do { a = rng.int(1, n - 1); b = rng.int(1, n - 1); } while (a === b && rng.int(0, 3)); return { A: [a, n], B: [b, n] }; },
    mount: (f, { A, B }) => cmpMount(f, 'den', A, B),
  };
}
function taskSOne() {
  return {
    id: 'sone',
    make: (rng) => { const n = rng.int(2, 9); const a = rng.pick([rng.int(1, n - 1), n, rng.int(n + 1, Math.min(2 * n - 1, n + 4))]); return { A: [Math.max(1, a), n] }; },
    mount: (f, { A }) => cmpMount(f, 'one', A, [1, 1]),
  };
}
function taskSDiff() {
  return {
    id: 'sdiff',
    make: (rng) => { for (;;) { const { A, B } = pairDiv(rng); if (A[0] * B[1] !== B[0] * A[1]) return { A, B }; } },
    mount: (f, { A, B }) => cmpMount(f, 'div', A, B),
  };
}
function taskSNum() {
  return {
    id: 'snum',
    make: (rng) => { const a = rng.int(1, 4); let m, n; do { m = rng.int(a + 1, 10); n = rng.int(a + 1, 10); } while (m === n); return { A: [a, m], B: [a, n] }; },
    mount: (f, { A, B }) => cmpMount(f, 'num', A, B),
  };
}

/** Phân số nào lớn nhất / bé nhất (cùng mẫu số hoặc mẫu số này chia hết cho mẫu số kia). */
function taskSBig() {
  return {
    id: 'sbig',
    make: (rng) => {
      const n = rng.pick([6, 8, 9, 10, 12]);
      const ds = [n, ...[2, 3, 4, 5, 6].filter(d => n % d === 0 && d < n)];
      const items = [];
      while (items.length < 4) {
        const d = rng.pick(ds), a = rng.int(1, d - 1);
        if (gcd(a, d) !== 1 && d !== n) continue;
        if (!items.some(o => o[0] * n / o[1] === a * n / d)) items.push([a, d]);
      }
      return { items, big: rng.int(0, 1) === 1, n };
    },
    async mount(f, { items, big: wantBig, n }) {
      const vals = items.map(o => o[0] / o[1]);
      const target = wantBig ? Math.max(...vals) : Math.min(...vals);
      const ans = vals.indexOf(target);
      setQ(f, `Phân số nào <b>${wantBig ? 'lớn nhất' : 'bé nhất'}</b>?`);
      await f.choose({ options: items.map((o, i) => ({ html: big(o[0], o[1]), value: i })), answer: ans, say: `Phân số nào ${wantBig ? 'lớn nhất' : 'bé nhất'}?`,
        hint: `Quy đồng mẫu số các phân số với mẫu số chung ${n}, rồi so sánh các tử số.` });
      f.finish({ ok: `${frReadCap(items[ans][0], items[ans][1])} ${wantBig ? 'lớn nhất' : 'bé nhất'}, bằng ${frRead(items[ans][0] * n / items[ans][1], n)}.` });
    },
  };
}

/** Phân số nào bé hơn 1 (lớn hơn 1, bằng 1)? */
function taskSLess() {
  return {
    id: 'sless',
    make: (rng) => {
      const want = rng.pick(['<', '>', '=']);
      const mk = (s) => { const d = rng.int(2, 12); return s === '<' ? [rng.int(1, d - 1), d] : s === '>' ? [rng.int(d + 1, d + 9), d] : [d, d]; };
      const others = ['<', '>', '='].filter(s => s !== want);
      const items = rng.shuffle([mk(want), mk(others[0]), mk(others[1]), mk(others[rng.int(0, 1)])]);
      return { want, items };
    },
    async mount(f, { want, items }) {
      const rel = (o) => (o[0] < o[1] ? '<' : o[0] > o[1] ? '>' : '=');
      const ans = items.findIndex(o => rel(o) === want);
      const W = { '<': 'bé hơn 1', '>': 'lớn hơn 1', '=': 'bằng 1' }[want];
      setQ(f, `Phân số nào <b>${W}</b>?`);
      await f.choose({ options: items.map((o, i) => ({ html: big(o[0], o[1]), value: i })), answer: ans, say: `Phân số nào ${W}?`,
        hint: (i) => `${frReadCap(items[i][0], items[i][1])}: tử số ${items[i][0]} ${items[i][0] < items[i][1] ? 'bé hơn' : items[i][0] > items[i][1] ? 'lớn hơn' : 'bằng'} mẫu số ${items[i][1]}, nên ${signWord(rel(items[i]))} 1.` });
      f.finish({ ok: `${frReadCap(items[ans][0], items[ans][1])} ${W}.` });
    },
  };
}

css('g4-tap2frac', `
  .g4fr-big .g5-fr { font-size: 1.25em; }
  .g4fr-cards { flex: 1 1 0; min-height: 0; display: flex; gap: 2cqi; padding: 1cqh 0; box-sizing: border-box; }
  .g4fr-cards.g4-choices-on { display: flex; }
  .g4fr-cards .g4fr-card { flex: 1 1 0; min-width: 0; min-height: 0; display: flex; align-items: center; justify-content: center; padding: 2cqh 1.4cqi; }
  .g4fr-flset { width: 100%; height: 100%; display: none; }
  .g4fr-cards .g4fr-card { container-type: size; }
  @container (aspect-ratio < 0.6) { .g4fr-fl-t { display: block; } }
  @container (aspect-ratio >= 0.6) and (aspect-ratio < 1.8) { .g4fr-fl-m { display: block; } }
  @container (aspect-ratio >= 1.8) { .g4fr-fl-w { display: block; } }
  @container (orientation: portrait) {
    .g4fr-cards { flex-direction: column; gap: 2cqh; }
  }
  .g4fr-vflow { flex: 0 0 34%; min-height: 0; position: relative; display: flex; align-items: center; justify-content: center; container-type: size; }
  .g4fr-flower { height: 100%; width: auto; max-width: 100%; }
  .g4fr-ffr { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 19cqh; color: #7C2D12; }
  .g4fr-vases .g4fr-card { padding: 1cqh 0.6cqi; }
  .g4fr-vase { position: relative; display: block; height: 100%; aspect-ratio: 100 / 120; max-width: 100%; max-height: 100%; container-type: size; }
  .g4fr-vase svg { width: 100%; height: 100%; display: block; }
  .g4fr-vase-fr { position: absolute; left: 50%; top: 64%; transform: translate(-50%, -50%); font-size: 19cqw; color: #1E293B; }
  @container (orientation: portrait) { .g4fr-vases { flex-direction: row; gap: 1.4cqi; } .g4fr-vflow { flex-basis: 40%; } }
  .g4fr-carrot { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 100%; max-width: 9em; }
  .g4fr-carrot svg { width: 100%; height: auto; }
  .g4fr-carrot b { position: absolute; left: 38%; top: 50%; transform: translate(-50%, -52%); color: #fff; text-shadow: 0 2px 0 rgba(154,52,18,0.5); font-size: 1.15em; }
  .g4fr-pairs .g4-choice { font-size: min(4.6cqh, 2.8cqi); }
  @container (orientation: portrait) { .g4fr-pairs .g4-choice { font-size: min(4.4cqh, 4.6cqi); } }
`);

export const FRAC_LESSONS = { 53: B53, 54: B54, 55: B55, 56: B56, 57: B57, 58: B58 };

