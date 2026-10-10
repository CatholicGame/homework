/**
 * Vở bài tập Toán 1 — Tập hai (Kết nối tri thức): Bài 21 "Số có hai chữ số" (sách trang 4–15),
 * Bài 22 "So sánh số có hai chữ số" (trang 16–21).
 * Mọi hình vẽ lại theo nét riêng: scripts/redraw/g1t2_bai21.py, g1t2_bai22.py (bộ vẽ kit_l1t2_a.py).
 * Bài "tô màu" có hình SVG: bé tô thật lên hình (engine/colorPaint.js), câu hỏi kèm phần chấm được.
 */
import { blank, setValidate, listValidate, dsValidate, phraseValidate } from '../grade3Workbook.js';
// Bài 21
import imgB21Apples12 from '../../assets/grade1-workbook-2/bai21_t1_q1_apples12.svg';
import imgB21Apples14 from '../../assets/grade1-workbook-2/bai21_t1_q1_apples14.svg';
import imgB21Apples15 from '../../assets/grade1-workbook-2/bai21_t1_q1_apples15.svg';
import imgB21Apples17 from '../../assets/grade1-workbook-2/bai21_t1_q1_apples17.svg';
import imgB21Apples18 from '../../assets/grade1-workbook-2/bai21_t1_q1_apples18.svg';
import imgB21Fruits from '../../assets/grade1-workbook-2/bai21_t1_q2_fruits.svg';
import svgB21Fruits from '../../assets/grade1-workbook-2/bai21_t1_q2_fruits.svg?raw';
import imgB21Apple from '../../assets/grade1-workbook-2/bai21_apple.svg';
import imgB21Tomato from '../../assets/grade1-workbook-2/bai21_tomato.svg';
import imgB21Elephant from '../../assets/grade1-workbook-2/bai21_elephant.svg';
import imgB21Dots from '../../assets/grade1-workbook-2/bai21_t1_q4_dots.svg';
import imgB21Jar from '../../assets/grade1-workbook-2/bai21_jar.svg';
import imgB21BearHeart from '../../assets/grade1-workbook-2/bai21_bear_heart.svg';
import imgB21BearBelly from '../../assets/grade1-workbook-2/bai21_bear_belly.svg';
import imgB21Animals from '../../assets/grade1-workbook-2/bai21_t2_q2_animals.svg';
import svgB21Animals from '../../assets/grade1-workbook-2/bai21_t2_q2_animals.svg?raw';
import imgB21Duck from '../../assets/grade1-workbook-2/bai21_duck.svg';
import imgB21Turtle from '../../assets/grade1-workbook-2/bai21_turtle.svg';
import imgB21Chick from '../../assets/grade1-workbook-2/bai21_chick.svg';
import imgB21Houses from '../../assets/grade1-workbook-2/bai21_t2_q4_houses.svg';
import imgB21Cubes from '../../assets/grade1-workbook-2/bai21_t3_q1_cubes.svg';
import imgB21TruckR from '../../assets/grade1-workbook-2/bai21_truck_r.svg';
import imgB21TruckL from '../../assets/grade1-workbook-2/bai21_truck_l.svg';
import imgB21Bags from '../../assets/grade1-workbook-2/bai21_t3_q4_bags.svg';
import imgB21T4Mau from '../../assets/grade1-workbook-2/bai21_t4_q1_mau.svg';
import imgB21T4A from '../../assets/grade1-workbook-2/bai21_t4_q1_a.svg';
import imgB21T4B from '../../assets/grade1-workbook-2/bai21_t4_q1_b.svg';
import imgB21T4C from '../../assets/grade1-workbook-2/bai21_t4_q1_c.svg';
import imgB21T4D from '../../assets/grade1-workbook-2/bai21_t4_q1_d.svg';
import imgB21T5Mau from '../../assets/grade1-workbook-2/bai21_t5_q1_mau.svg';
import imgB21T5A from '../../assets/grade1-workbook-2/bai21_t5_q1_a.svg';
import imgB21T5B from '../../assets/grade1-workbook-2/bai21_t5_q1_b.svg';
import imgB21T5C from '../../assets/grade1-workbook-2/bai21_t5_q1_c.svg';
import imgB21Boat from '../../assets/grade1-workbook-2/bai21_boat.svg';
import imgB21Sinker28 from '../../assets/grade1-workbook-2/bai21_t5_q3_sinker28.svg';
import imgB21Sinker31 from '../../assets/grade1-workbook-2/bai21_t5_q3_sinker31.svg';
import imgB21Sinker46 from '../../assets/grade1-workbook-2/bai21_t5_q3_sinker46.svg';
import imgB21Sinker55 from '../../assets/grade1-workbook-2/bai21_t5_q3_sinker55.svg';
import imgB21Sinker74 from '../../assets/grade1-workbook-2/bai21_t5_q3_sinker74.svg';
import imgB21Bowl from '../../assets/grade1-workbook-2/bai21_t5_q4_bowl.svg';
import imgB21Grid from '../../assets/grade1-workbook-2/bai21_t6_q1_grid.svg';
import imgB21Bee from '../../assets/grade1-workbook-2/bai21_bee.svg';
import imgB21Flower25 from '../../assets/grade1-workbook-2/bai21_t6_q2_flower25.svg';
import imgB21Flower34 from '../../assets/grade1-workbook-2/bai21_t6_q2_flower34.svg';
import imgB21Flower49 from '../../assets/grade1-workbook-2/bai21_t6_q2_flower49.svg';
import imgB21Flower53 from '../../assets/grade1-workbook-2/bai21_t6_q2_flower53.svg';
import imgB21Flower77 from '../../assets/grade1-workbook-2/bai21_t6_q2_flower77.svg';
import imgB21Flower86 from '../../assets/grade1-workbook-2/bai21_t6_q2_flower86.svg';

// Bài 22
import imgB22Mau from '../../assets/grade1-workbook-2/bai22_t1_q1_mau.svg';
import imgB22A from '../../assets/grade1-workbook-2/bai22_t1_q1_a.svg';
import imgB22B from '../../assets/grade1-workbook-2/bai22_t1_q1_b.svg';
import imgB22C from '../../assets/grade1-workbook-2/bai22_t1_q1_c.svg';
import imgB22Mangoes from '../../assets/grade1-workbook-2/bai22_t1_q3_mangoes.svg';
import imgB22Flowers from '../../assets/grade1-workbook-2/bai22_t1_q4_flowers.svg';
import imgB22Robots from '../../assets/grade1-workbook-2/bai22_t2_q1_robots.svg';
import imgB22VanA from '../../assets/grade1-workbook-2/bai22_t3_q1_van_a.svg';
import imgB22VanB from '../../assets/grade1-workbook-2/bai22_t3_q1_van_b.svg';
import imgB22VanC from '../../assets/grade1-workbook-2/bai22_t3_q1_van_c.svg';
import imgB22VanD from '../../assets/grade1-workbook-2/bai22_t3_q1_van_d.svg';
import imgB22Bears from '../../assets/grade1-workbook-2/bai22_t3_q3_bears.svg';
import imgB22Friends from '../../assets/grade1-workbook-2/bai22_t3_q4_friends.svg';
// ── Local helpers ───────────────────────────────────────────────────────────

const BLUE = '#29A9E0'; // xanh của sách: chữ mẫu, viền ô
const sampleText = (s) => `<span class="gw-sample-text">${s}</span>`;

// A picture printed inline in a label / question.
const pic = (src, h, alt = '') => `<img src="${src}" alt="${alt}" style="height:${h}px;width:auto;max-width:100%;vertical-align:middle;margin:2px 6px 2px 0">`;

// A picture with its number written on it (the oval of a jar, a bear's sign, an elephant's tag):
// a given number, or "..." = the box the child writes in, sitting on the picture where the book's
// empty oval is. at = [left %, top %] of the oval's centre in the picture.
const onPic = (src, w, given, at, sample = false) => `<span style="position:relative;display:inline-block;width:min(${w}px, 21vw);margin:2px 4px;vertical-align:middle">`
  + `<img src="${src}" alt="" style="display:block;width:100%;height:auto">`
  + `<span style="position:absolute;left:${at[0]}%;top:${at[1]}%;transform:translate(-50%,-50%);font-weight:800;font-size:1.2rem;line-height:1${sample ? `;color:${BLUE}` : ''}">${given ?? '...'}</span></span>`;
const JAR = [imgB21Jar, 92, [50, 61.5]];
const BEAR_H = [imgB21BearHeart, 106, [50, 63.5]];
const BEAR_B = [imgB21BearBelly, 100, [50, 68.5]];
const ELE = [imgB21Elephant, 128, [66.4, 67]];
// items: [kind, number | null] → one row of pictures; the answer lists the blanks left to right
const picRow = (prefix, items) => ({
  label: `${prefix}${items.map(([[src, w, at], n]) => onPic(src, w, n == null ? null : String(n), at)).join('')}`,
  answer: items.filter(([, n, a]) => n == null).map(([, , a]) => String(a)).join(','),
  boxes: true,
});

// A picture with its answer boxes right under it, each box at a share of the picture's width
// (Tập Một's underPic): `cells` = [{ at: 25 (percent), given?: '10' }]; no `given` = one "..." slot.
function underPic(img, width, cells) {
  const spans = cells.map(c => `<span style="position:absolute;left:${c.at}%;top:0;transform:translateX(-50%)">${c.given != null
    ? `<span style="display:inline-flex;align-items:center;justify-content:center;width:3rem;height:2.6rem;border:2px solid ${BLUE};background:#fff;font-size:1.2rem;font-weight:700;color:${BLUE}">${c.given}</span>`
    : '...'}</span>`).join('');
  return `<span style="display:inline-block;width:${width}px;max-width:100%;vertical-align:top">`
    + `<img src="${img}" alt="" style="display:block;width:100%;height:auto">`
    + `<span style="display:block;position:relative;height:3.1rem">${spans}</span></span>`;
}

// "... gồm ... chục và ... đơn vị." under a picture of tens and ones.
const gomRow = (prefix, img, n, tensGiven, h = 110) => ({
  label: `${prefix}${pic(img, h)} ... gồm ${tensGiven ? Math.floor(n / 10) : '...'} chục và ... đơn vị.`,
  answer: tensGiven ? `${n},${n % 10}` : `${n},${Math.floor(n / 10)},${n % 10}`,
});

// The number-bond tree of Bài 21 Tiết 5 Q2: the number in a circle, two lines down to two boxes.
const BOND_SVG = (n) => `<svg viewBox="0 0 150 56" width="150" height="56" style="display:block" aria-hidden="true">`
  + `<line x1="75" y1="28" x2="30" y2="56" stroke="#3F3A40" stroke-width="2.4"/><line x1="75" y1="28" x2="120" y2="56" stroke="#3F3A40" stroke-width="2.4"/>`
  + `<circle cx="75" cy="26" r="22" fill="#BFE6F7" stroke="#3F3A40" stroke-width="2.4"/>`
  + `<text x="75" y="34" text-anchor="middle" font-size="22" font-weight="700" fill="#231F20">${n}</text></svg>`;
const SBOX = `display:inline-flex;align-items:center;justify-content:center;width:3rem;height:2.6rem;border:2px solid ${BLUE};background:#fff;font-size:1.2rem;font-weight:700;color:${BLUE}`;
const bond = (n, l = '...', r = '...') => `<span style="display:inline-flex;flex-direction:column;align-items:center;margin:2px 10px 2px 0;vertical-align:top">${BOND_SVG(n)}`
  + `<span style="display:flex;justify-content:space-between;width:150px;margin-top:2px">${l}${r}</span></span>`;

// Number cards printed in the question ("Ghép hai tấm thẻ").
const CARD = 'display:inline-flex;align-items:center;justify-content:center;width:2.4em;height:2.9em;margin:6px 14px 6px 0;border-radius:4px;border:2px solid #3F3A40;background:#BFE6F7;font-weight:800;font-size:1.3em;color:#231F20';
const cards = (...nums) => `<span style="display:inline-flex;flex-wrap:wrap">${nums.map((n, i) => `<span style="${CARD};transform:rotate(${i % 2 ? 6 : -6}deg)">${n}</span>`).join('')}</span>`;

// The colour list of Bài 21 Tiết 6 Q1b, as the book's table.
const TD = `border:1.5px solid ${BLUE};padding:3px 10px;text-align:center`;
const COLOR_TABLE = `<table style="border-collapse:collapse;margin:6px 0;font-size:.95em">`
  + `<tr><th style="${TD};background:#DDF1FC;font-weight:600">Màu</th><th style="${TD};background:#DDF1FC;font-weight:600">Ô có số</th></tr>`
  + `<tr><td style="${TD}">Vàng</td><td style="${TD}">4, 5, 6, 14, 15, 16, 24, 25, 26, 35</td></tr>`
  + `<tr><td style="${TD}">Đỏ</td><td style="${TD}">41, 42, 43, 44, 45, 46, 47, 48, 49, 53, 54, 55,<br>56, 57, 63, 64, 65, 66, 67, 73, 74, 75, 76, 77</td></tr>`
  + `<tr><td style="${TD}">Xanh</td><td style="${TD}">84, 86, 94, 96</td></tr></table>`;

// The 0–99 board of Bài 21 Tiết 6 Q1a: numbers the book prints, the others are blanks.
const GRID_GIVEN = [[0, 1, 2, 3, 4, 5, 8, 9], [0, 1, 2, 7, 8, 9], [0, 1, 2, 4, 5, 6, 7, 8, 9], [0, 1, 5, 6, 7, 9],
  [0, 2, 3, 4, 6, 7, 8, 9], [0, 1, 2, 5, 7, 8, 9], [0, 1, 2, 4, 5, 6, 7, 8, 9], [0, 3, 4, 5, 9],
  [0, 4, 5, 6, 7, 8, 9], [0, 1, 4, 5, 9]];
const gridRows = () => GRID_GIVEN.map((given, r) => Array.from({ length: 10 }, (_, c) => (given.includes(c) ? r * 10 + c : blank(r * 10 + c))));

// A row of a number chain (Bài 21 Tiết 4 Q2): null = blank, filled from the counting order.
const chain = (label, first, step, givenIdx) => ({
  label,
  cells: Array.from({ length: 10 }, (_, i) => (givenIdx.includes(i) ? first + i * step : blank(first + i * step))),
});

// Bài 21 Tiết 2 Q3: one line of the book's two columns, "Mười một : ......   18 : ......":
// a) the number for the words, b) the words for the number ("lăm"/"năm", "mốt"/"một" both fine).
const SOAN = ['', '', '', '', '', '', '', '', '', '', 'mười', 'mười một', 'mười hai', 'mười ba', 'mười bốn', 'mười lăm', 'mười sáu', 'mười bảy', 'mười tám', 'mười chín'];
const readRow = (words, n, right) => {
  const m = +right.replace(/\D/g, '');
  return { label: `<span style="display:inline-block;min-width:7.4em">${words} :</span> ...<span style="display:inline-block;width:2.5em"></span><span style="display:inline-block;min-width:3.4em">${right} :</span> ...`, answer: `${n},${SOAN[m]}`, validate: listValidate([String(n), SOAN[m]]) };
};

// ── Bài 22 helpers ──

// "Viết (theo mẫu)" under two stick pictures: two groups of three boxes, "24 < 27" and "27 > 24",
// both true comparisons of the two counts, in either order. The keypad offers the numbers the
// pictures show and the three signs (one tile per box).
function cmpBothValidate(x, y) {
  const fwd = `${x},${x > y ? '>' : '<'},${y}`;
  const back = `${y},${y > x ? '>' : '<'},${x}`;
  return (value) => {
    const v = String(value).split(',').map(t => t.trim());
    const a = v.slice(0, 3).join(','), b = v.slice(3).join(',');
    return (a === fwd && b === back) || (a === back && b === fwd);
  };
}
const STICK_TILES = ['36', '42', '45', '43', '27', '30', '>', '<', '='];
const GAP = '<span style="display:inline-block;width:1.4em"></span>';
const cmpPairBlank = (prefix, img, l, r) => ({
  label: `${prefix}${pic(img, 112)}<br>... ... ...${GAP}... ... ...`,
  answer: `${l},${l > r ? '>' : '<'},${r},${r},${r > l ? '>' : '<'},${l}`,
  boxes: true, tiles: STICK_TILES, validate: cmpBothValidate(l, r),
});
const sbox = (t) => `<span style="${SBOX};width:2.6rem;margin:0 -1px">${t}</span>`;

// One "Viết dấu >; <; =" row; a side may be a sum the child works out first ("40 + 7").
const valueOf = (x) => (typeof x === 'number' ? x : String(x).split('+').reduce((t, k) => t + Number(k), 0));
const cmpRow = (a, b) => {
  const va = valueOf(a), vb = valueOf(b);
  return { left: String(a), right: String(b), answer: va < vb ? '<' : va > vb ? '>' : '=' };
};
// "Tô màu quả có số lớn nhất / bé nhất": each group is a row of number buttons (the child picks
// the one to colour; the colouring itself is on the picture).
const pickRow = (label, nums, want) => ({
  left: label, options: nums.map(String),
  answer: String(want === 'max' ? Math.max(...nums) : Math.min(...nums)),
});
// The numbers written in a cloud, like the book (Bài 22 Tiết 2 Q2, Q3).
const cloud = (t) => `<span style="display:inline-block;padding:.5em 1.4em;margin:2px 8px 2px 0;border-radius:2em;background:#BFE6F7;font-weight:700;vertical-align:middle">${t}</span>`;
const orderRow = (prefix, nums, desc) => {
  const sorted = [...nums].sort((x, y) => (desc ? y - x : x - y)).map(String);
  return { label: `${prefix}${cloud(nums.join(', '))} ...`, answer: sorted.join(', '), validate: listValidate(sorted), tiles: nums.map(String) };
};
const NAMES = ['Mai', 'Việt', 'Nam'];
const nameBlank = (label, name) => ({ label, answer: name, validate: phraseValidate(name), tiles: NAMES, tileOne: true });
// "Đố vui" 6 và 9: xoay ngược thẻ 6 thành 9 thì ghép được 99; ghép thường được 96, cũng nhận.
const okAny = (...vals) => (v) => vals.includes(String(v).trim());

export const BAI_21_22 = [
  // ── BÀI 21 (trang 4–15) ───────────────────────────────────────────────────
  {
    id: 'bai-21', number: 21, title: 'Số có hai chữ số',
    questions: [
      // Tiết 1 (trang 4–5)
      {
        type: 'match', section: 'Tiết 1', bigImg: true,
        q: '1. Viết số thích hợp vào ô trống rồi nối (theo mẫu).\nĐếm số quả táo ở mỗi khung, chọn số đó, rồi nối số với cách đọc.',
        left: [
          { id: 'p12', img: imgB21Apples12 }, { id: 'p14', img: imgB21Apples14 }, { id: 'p17', img: imgB21Apples17 },
          { id: 'p15', img: imgB21Apples15 }, { id: 'p18', img: imgB21Apples18 },
        ],
        middle: [{ id: 'n12', text: '12' }, { id: 'n14', text: '14' }, { id: 'n15', text: '15' }, { id: 'n17', text: '17' }, { id: 'n18', text: '18' }],
        right: [
          { id: 'w17', text: 'Mười bảy' }, { id: 'w12', text: 'Mười hai' }, { id: 'w18', text: 'Mười tám' },
          { id: 'w14', text: 'Mười bốn' }, { id: 'w15', text: 'Mười lăm' },
        ],
        pairs: [
          ['p12', 'n12'], ['n12', 'w12'], ['p14', 'n14'], ['n14', 'w14'], ['p17', 'n17'], ['n17', 'w17'],
          ['p15', 'n15'], ['n15', 'w15'], ['p18', 'n18'], ['n18', 'w18'],
        ],
        matchSample: [['p12', 'n12'], ['n12', 'w12']],
        hints: ['Tháp táo có 10 quả. Đếm tiếp các quả bên cạnh: 11, 12, 13…'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB21Fruits,
        tapCount: { svg: svgB21Fruits, groups: { a: 'quả táo', b: 'quả cà chua' } },
        q: '2. Đếm số quả rồi viết số thích hợp vào ô trống.',
        blanks: [
          { label: `a) ... ${pic(imgB21Apple, 40, 'quả táo')}`, answer: '10', boxes: true },
          { label: `b) ... ${pic(imgB21Tomato, 40, 'quả cà chua')}`, answer: '16', boxes: true },
        ],
        hints: ['Chạm vào từng quả để đếm, đếm xong quả nào thì không đếm lại quả đó.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết số thích hợp vào ô trống.\nCác chú voi xếp hàng theo thứ tự từ 10 đến 20: hàng trên đi từ trái sang phải, hàng dưới đi tiếp từ phải sang trái.',
        blanks: [
          picRow('', [[ELE, 10], [ELE, 11], [ELE, 12], [ELE, null, 13], [ELE, null, 14], [ELE, 15]]),
          picRow('', [[ELE, 20], [ELE, null, 19], [ELE, null, 18], [ELE, null, 17], [ELE, 16]]),
        ],
        hints: ['Sau 15 là 16 (chú voi cuối hàng dưới), rồi đếm tiếp sang trái: 17, 18, 19, 20.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB21Dots,
        q: '4. Nối các số theo thứ tự từ bé đến lớn rồi tô màu.\nNối xong, em được hình con gì?',
        options: ['Con mèo', 'Con chó', 'Con gà'],
        answer: 0,
        hints: ['Kéo bút từ số 1 sang số 2, 3, 4… đến số 17. Hình có hai tai nhọn và bộ ria.'],
      },
      // Tiết 2 (trang 6–7)
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Viết số thích hợp vào ô trống.',
        blanks: [
          picRow('a) ', [[JAR, 9], [BEAR_H, 10], [JAR, null, 11], [BEAR_H, null, 12], [JAR, 13], [BEAR_H, null, 14]]),
          picRow('b) ', [[BEAR_B, 20], [JAR, null, 19], [BEAR_B, 18], [JAR, 17], [BEAR_B, null, 16], [JAR, null, 15]]),
        ],
        hints: ['a) đếm thêm 1: 9, 10, 11… b) đếm bớt 1: 20, 19, 18…'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB21Animals,
        tapCount: { svg: svgB21Animals, groups: { a: 'con vịt', b: 'con rùa', c: 'con gà' } },
        q: '2. Đếm rồi viết số thích hợp vào ô trống.\nTrong hình trên có:',
        blanks: [
          { label: `Có ... ${pic(imgB21Duck, 44, 'con vịt')}`, answer: '11', boxes: true },
          { label: `Có ... ${pic(imgB21Turtle, 36, 'con rùa')}`, answer: '12', boxes: true },
          { label: `Có ... ${pic(imgB21Chick, 44, 'con gà')}`, answer: '14', boxes: true },
        ],
        hints: ['Chạm vào từng con vật để đếm. Đếm hết loại này rồi mới đếm loại khác.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `3. Viết vào chỗ chấm (theo mẫu).\nMẫu: a) ${sampleText('Chín : 9')}     b) ${sampleText('20 : hai mươi')}`,
        blanks: [
          readRow('a) Mười một', 11, 'b) 18'),
          readRow('Mười ba', 13, '16'),
          readRow('Mười lăm', 15, '14'),
          readRow('Mười bảy', 17, '12'),
          readRow('Mười chín', 19, '10'),
        ],
        hints: ['Số 15 đọc là "mười lăm", số 10 đọc là "mười".'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB21Houses,
        q: '4. Biết rằng chú thỏ sẽ trốn vào ngôi nhà số 11, chú chó sẽ trốn vào ngôi nhà số 16. Tô màu đỏ ngôi nhà chú thỏ sẽ trốn vào, màu vàng ngôi nhà chú chó sẽ trốn vào.\nĐếm các ngôi nhà từ ngôi nhà số 1:',
        blanks: [{ label: 'Có tất cả ... ngôi nhà.', answer: '18' }],
        hints: ['Đếm tiếp từ ngôi nhà số 4: 5, 6, 7… Ngôi nhà số 11 ở chỗ dãy nhà rẽ xuống.'],
      },
      // Tiết 3 (trang 8–9)
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Viết số thích hợp vào ô trống (theo mẫu).\nMỗi cột có 10 khối vuông.',
        blanks: [{
          label: underPic(imgB21Cubes, 700, [{ at: 9.4, given: '10' }, { at: 32, answer: true }, { at: 59.4 }, { at: 86.7 }]),
          answer: '20,30,40', boxes: true,
        }],
        hints: ['1 cột là 10 khối, 2 cột là 20 khối. Đếm theo chục: 10, 20, 30, 40.'],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '2. Nối (theo mẫu).\nNối mỗi xe tải với cây xăng ghi số đúng với chữ trên xe.',
        left: [
          { id: 't20', img: imgB21TruckR, text: 'Hai mươi', row: 1, span: 2 },
          { id: 't30', img: imgB21TruckR, text: 'Ba mươi', row: 3, span: 2 },
          { id: 't50', img: imgB21TruckR, text: 'Năm mươi', row: 5, span: 2 },
          { id: 't40', img: imgB21TruckR, text: 'Bốn mươi', row: 7, span: 2 },
        ],
        middle: [
          { id: 'p30', text: '30' }, { id: 'p40', text: '40' }, { id: 'p20', text: '20' }, { id: 'p50', text: '50' },
          { id: 'p60', text: '60' }, { id: 'p70', text: '70' }, { id: 'p80', text: '80' }, { id: 'p90', text: '90' },
        ],
        right: [
          { id: 'r60', img: imgB21TruckL, text: 'Sáu mươi', row: 1, span: 2 },
          { id: 'r90', img: imgB21TruckL, text: 'Chín mươi', row: 3, span: 2 },
          { id: 'r70', img: imgB21TruckL, text: 'Bảy mươi', row: 5, span: 2 },
          { id: 'r80', img: imgB21TruckL, text: 'Tám mươi', row: 7, span: 2 },
        ],
        pairs: [
          ['t20', 'p20'], ['t30', 'p30'], ['t50', 'p50'], ['t40', 'p40'],
          ['p60', 'r60'], ['p90', 'r90'], ['p70', 'r70'], ['p80', 'r80'],
        ],
        matchSample: ['t20', 'p20'],
        hints: ['"Hai mươi" viết là 20, "Chín mươi" viết là 90.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Viết số tròn chục thích hợp vào ô trống.',
        blanks: [
          picRow('a) ', [[BEAR_H, 10], [JAR, null, 20], [BEAR_H, 30], [JAR, 40], [BEAR_H, null, 50], [JAR, null, 60]]),
          picRow('b) ', [[JAR, 90], [BEAR_B, 80], [JAR, null, 70], [BEAR_B, 60], [JAR, null, 50], [BEAR_B, null, 40]]),
        ],
        hints: ['a) đếm thêm 1 chục: 10, 20, 30… b) đếm bớt 1 chục: 90, 80, 70…'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB21Bags,
        q: `4. Biết mỗi túi có 10 quả cà chua. Tô màu (theo mẫu).\n${sampleText('40 quả cà chua: tô màu 4 túi.')}`,
        blanks: [
          { label: '10 quả cà chua: tô màu ... túi.', answer: '1' },
          { label: '20 quả cà chua: tô màu ... túi.', answer: '2' },
          { label: '50 quả cà chua: tô màu ... túi.', answer: '5' },
          { label: '70 quả cà chua: tô màu ... túi.', answer: '7' },
        ],
        hints: ['Mỗi túi là 1 chục quả. 50 là 5 chục, nên tô 5 túi.'],
      },
      // Tiết 4 (trang 10–11)
      {
        type: 'fill', section: 'Tiết 4',
        q: `1. Viết số thích hợp vào chỗ chấm (theo mẫu).\nMỗi túi có 10 quả táo.\nMẫu: ${pic(imgB21T4Mau, 110, '4 túi táo và 5 quả táo')} ${sampleText('45 gồm 4 chục và 5 đơn vị.')}`,
        blanks: [
          gomRow('a) ', imgB21T4A, 54, true),
          gomRow('b) ', imgB21T4B, 67),
          gomRow('c) ', imgB21T4C, 86),
          gomRow('d) ', imgB21T4D, 71),
        ],
        hints: ['Đếm số túi để biết số chục, đếm số quả lẻ để biết số đơn vị.'],
      },
      {
        type: 'table', section: 'Tiết 4',
        q: '2. Viết số thích hợp vào ô trống.',
        rows: [
          chain('a)', 31, 1, [0, 1, 2, 5, 8]),
          chain('b)', 50, 1, [0, 1, 3, 6, 9]),
          chain('c)', 89, -1, [0, 2, 3, 5, 7]),
        ],
        hints: ['a), b) đếm thêm 1. c) đếm bớt 1: 89, 88, 87…'],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: `3. Viết số thích hợp vào ô trống (theo mẫu).\nBa chú gấu mang ba số liền nhau.\nMẫu: ${[21, 22, 23].map(n => onPic(BEAR_B[0], 70, String(n), BEAR_B[2], true)).join('')}`,
        blanks: [
          picRow('a) ', [[BEAR_B, 46], [BEAR_B, null, 47], [BEAR_B, null, 48]]),
          picRow('b) ', [[BEAR_B, null, 72], [BEAR_B, 73], [BEAR_B, null, 74]]),
          picRow('c) ', [[BEAR_B, null, 97], [BEAR_B, null, 98], [BEAR_B, 99]]),
        ],
        hints: ['Số liền sau thì thêm 1, số liền trước thì bớt 1.'],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '4. Đúng ghi Đ, sai ghi S.',
        blanks: [
          { label: 'a) Ba mươi tư viết là 34. ...', answer: 'Đ', validate: dsValidate(true) },
          { label: 'Ba mươi tư viết là 304. ...', answer: 'S', validate: dsValidate(false) },
          { label: 'b) Số 66 là số có một chữ số. ...', answer: 'S', validate: dsValidate(false) },
          { label: 'Số 66 là số có hai chữ số. ...', answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['Ba mươi tư gồm 3 chục và 4 đơn vị. Số 66 có hai chữ số 6.'],
      },
      // Tiết 5 (trang 12–13)
      {
        type: 'fill', section: 'Tiết 5',
        q: `1. Viết số thích hợp vào chỗ chấm (theo mẫu).\nMỗi bó có 10 que tính.\nMẫu: ${pic(imgB21T5Mau, 90, '3 bó que tính và 8 que tính')} ${sampleText('38 gồm 3 chục và 8 đơn vị.')}`,
        blanks: [
          gomRow('a) ', imgB21T5A, 63, false, 90),
          gomRow('b) ', imgB21T5B, 55, false, 90),
          gomRow('c) ', imgB21T5C, 71, false, 90),
        ],
        hints: ['Mỗi bó là 1 chục que tính. Đếm số bó, rồi đếm số que lẻ.'],
      },
      {
        type: 'fill', section: 'Tiết 5',
        q: `2. Viết số thích hợp vào ô trống (theo mẫu).\nMẫu: ${bond(27, `<span style="${SBOX}">20</span>`, `<span style="${SBOX}">7</span>`)}`,
        blanks: [
          { label: bond(32), answer: '30,2', boxes: true },
          { label: bond(46), answer: '40,6', boxes: true },
          { label: bond(75), answer: '70,5', boxes: true },
        ],
        hints: ['27 gồm 2 chục và 7 đơn vị nên tách thành 20 và 7.'],
      },
      {
        type: 'match', section: 'Tiết 5',
        q: '3. Nối (theo mẫu).\nNối mỗi chiếc thuyền với quả chì ghi số đúng với chữ trên thuyền.',
        left: [
          { id: 'b31', img: imgB21Boat, text: 'Ba mươi mốt' }, { id: 'b74', img: imgB21Boat, text: 'Bảy mươi tư' },
          { id: 'b46', img: imgB21Boat, text: 'Bốn mươi sáu' }, { id: 'b28', img: imgB21Boat, text: 'Hai mươi tám' },
          { id: 'b55', img: imgB21Boat, text: 'Năm mươi lăm' },
        ],
        right: [
          { id: 's28', img: imgB21Sinker28 }, { id: 's31', img: imgB21Sinker31 }, { id: 's46', img: imgB21Sinker46 },
          { id: 's55', img: imgB21Sinker55 }, { id: 's74', img: imgB21Sinker74 },
        ],
        pairs: [['b31', 's31'], ['b74', 's74'], ['b46', 's46'], ['b28', 's28'], ['b55', 's55']],
        matchSample: ['b28', 's28'],
        hints: ['"Bảy mươi tư" viết là 74, "Năm mươi lăm" viết là 55.'],
      },
      {
        type: 'fill', section: 'Tiết 5', img: imgB21Bowl,
        q: '4. Tô màu.\n– Vùng chứa các số có một chữ số tô màu xanh lá cây.\n– Vùng chứa số 11, 44 tô màu vàng.\n– Vùng chứa các số tròn chục tô màu xanh nước biển.\nViết các số theo từng màu:',
        blanks: [
          { label: 'Màu xanh lá cây: ...', answer: '1, 2, 3, 7, 8, 9', validate: setValidate(['1', '2', '3', '7', '8', '9']), tiles: ['20', '11', '80', '3', '44', '9', '2', '1', '7', '40', '8'] },
          { label: 'Màu vàng: ...', answer: '11, 44', validate: setValidate(['11', '44']), tiles: ['20', '11', '80', '3', '44', '9', '2', '1', '7', '40', '8'] },
          { label: 'Màu xanh nước biển: ...', answer: '20, 40, 80', validate: setValidate(['20', '40', '80']), tiles: ['20', '11', '80', '3', '44', '9', '2', '1', '7', '40', '8'] },
        ],
        hints: ['Số có một chữ số: từ 0 đến 9. Số tròn chục có chữ số 0 ở hàng đơn vị: 10, 20, 30…'],
      },
      // Tiết 6 (trang 14–15)
      {
        type: 'table', section: 'Tiết 6',
        q: '1. a) Viết số thích hợp vào ô trống.',
        rows: gridRows(),
        hints: ['Mỗi hàng có cùng chữ số hàng chục: hàng 10, 11, 12…, hàng 20, 21, 22… Đếm thêm 1 theo hàng.'],
      },
      {
        // Câu b) tô lên bảng câu a) đã viết xong; tách riêng để bảng số không bị che (đã xem trang 14).
        type: 'compare', section: 'Tiết 6', img: imgB21Grid,
        q: `1. b) Tô màu vào bảng vừa hoàn thiện ở câu a) theo bảng màu sau:
${COLOR_TABLE}Mỗi ô dưới đây tô màu gì?`,
        rows: [
          { left: 'Ô số 15', options: ['Vàng', 'Đỏ', 'Xanh'], answer: 'Vàng' },
          { left: 'Ô số 47', options: ['Vàng', 'Đỏ', 'Xanh'], answer: 'Đỏ' },
          { left: 'Ô số 86', options: ['Vàng', 'Đỏ', 'Xanh'], answer: 'Xanh' },
          { left: 'Ô số 74', options: ['Vàng', 'Đỏ', 'Xanh'], answer: 'Đỏ' },
        ],
        hints: ['Tìm số đó trong bảng màu: số nằm ở hàng nào thì tô màu của hàng đó.'],
      },
      {
        type: 'match', section: 'Tiết 6',
        q: '2. Nối (theo mẫu).\nNối mỗi chú ong với bông hoa ghi số đúng với chữ trên ong.',
        left: [
          { id: 'e34', img: imgB21Bee, text: 'Ba mươi tư', row: 1, span: 2 },
          { id: 'e53', img: imgB21Bee, text: 'Năm mươi ba', row: 3, span: 2 },
          { id: 'e77', img: imgB21Bee, text: 'Bảy mươi bảy', row: 5, span: 2 },
        ],
        middle: [
          { id: 'f25', img: imgB21Flower25 }, { id: 'f34', img: imgB21Flower34 }, { id: 'f49', img: imgB21Flower49 },
          { id: 'f53', img: imgB21Flower53 }, { id: 'f77', img: imgB21Flower77 }, { id: 'f86', img: imgB21Flower86 },
        ],
        right: [
          { id: 'e25', img: imgB21Bee, text: 'Hai mươi lăm', row: 1, span: 2 },
          { id: 'e49', img: imgB21Bee, text: 'Bốn mươi chín', row: 3, span: 2 },
          { id: 'e86', img: imgB21Bee, text: 'Tám mươi sáu', row: 5, span: 2 },
        ],
        pairs: [['e34', 'f34'], ['e53', 'f53'], ['e77', 'f77'], ['f25', 'e25'], ['f49', 'e49'], ['f86', 'e86']],
        matchSample: ['e34', 'f34'],
        hints: ['"Bốn mươi chín" viết là 49, "Tám mươi sáu" viết là 86.'],
      },
      {
        type: 'table', section: 'Tiết 6',
        q: '3. Viết (theo mẫu).',
        tables: [
          {
            headers: ['Chục', 'Đơn vị', 'Viết số'], colWidths: ['6.5rem', '6.5rem', '6.5rem'],
            rows: [{ sample: true, cells: [1, 4, 14] }, [4, 1, blank(41)], [3, 8, blank(38)], [7, 7, blank(77)]],
          },
          {
            headers: ['Chục', 'Đơn vị', 'Viết số'], colWidths: ['6.5rem', '6.5rem', '6.5rem'],
            rows: [[2, blank(6), 26], [blank(5), 3, 53], [blank(6), blank(9), 69], [blank(9), blank(8), 98]],
          },
        ],
        hints: ['Chữ số bên trái là số chục, chữ số bên phải là số đơn vị: 26 gồm 2 chục và 6 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 6',
        q: `4. Viết các số thích hợp vào chỗ chấm.\nGhép hai tấm thẻ bên được các số:\n${cards(6, 8)}`,
        blanks: [{ label: '...', answer: '68, 86', validate: setValidate(['68', '86']) }],
        hints: ['Đặt thẻ 6 trước thẻ 8 được một số, đổi chỗ hai thẻ được số thứ hai.'],
      },
    ],
  },
  // ── BÀI 22 (trang 16–21) ──────────────────────────────────────────────────
  {
    id: 'bai-22', number: 22, title: 'So sánh số có hai chữ số',
    questions: [
      // Tiết 1 (trang 16–17)
      {
        type: 'fill', section: 'Tiết 1',
        q: `1. Viết (theo mẫu).\nMỗi bó có 10 que tính.\nMẫu: ${pic(imgB22Mau, 96, '2 bó và 4 que, 2 bó và 7 que')}<br><span style="display:inline-flex;margin-left:3.2em">${sbox('24')}${sbox('&lt;')}${sbox('27')}</span>${GAP}<span style="display:inline-flex">${sbox('27')}${sbox('&gt;')}${sbox('24')}</span>`,
        blanks: [
          cmpPairBlank('a) ', imgB22A, 36, 42),
          cmpPairBlank('b) ', imgB22B, 45, 43),
          cmpPairBlank('c) ', imgB22C, 27, 30),
        ],
        hints: ['Đếm số bó (số chục) và số que lẻ (số đơn vị) ở mỗi khung. Số nào nhiều chục hơn thì lớn hơn.'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '2. Viết dấu >; <; = thích hợp vào ô trống.',
        rows: [
          cmpRow(25, 28), cmpRow(64, 59), cmpRow(56, 75),
          cmpRow(32, 29), cmpRow(78, 87), cmpRow(19, 19),
          cmpRow(48, 50), cmpRow(95, 99), cmpRow(84, 48),
        ],
        hints: ['So sánh chữ số hàng chục trước. Hàng chục bằng nhau thì so sánh chữ số hàng đơn vị.'],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB22Mangoes,
        q: '3. Tô màu quả xoài có số lớn nhất.\nỞ mỗi khung, quả xoài nào có số lớn nhất?',
        rows: [
          pickRow('a)', [35, 39, 37], 'max'), pickRow('b)', [48, 46, 39], 'max'),
          pickRow('c)', [74, 69, 80], 'max'), pickRow('d)', [68, 86, 81], 'max'),
        ],
        hints: ['Số có chữ số hàng chục lớn hơn thì lớn hơn: 80 > 74 > 69.'],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB22Flowers,
        q: '4. Tô màu bông hoa có số bé nhất.\nỞ mỗi hàng, bông hoa nào có số bé nhất?',
        rows: [pickRow('a)', [25, 29, 21], 'min'), pickRow('b)', [63, 56, 59], 'min'), pickRow('c)', [73, 90, 87], 'min')],
        hints: ['Hàng chục bằng nhau thì xem hàng đơn vị: 21 < 25 < 29.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '5. Mai trồng được 16 cây hoa. Việt trồng được 14 cây hoa. Nam trồng được 17 cây hoa. Viết tên bạn thích hợp vào chỗ chấm.',
        blanks: [
          nameBlank('– Bạn ... trồng được nhiều cây hoa nhất.', 'Nam'),
          nameBlank('– Bạn ... trồng được ít cây hoa nhất.', 'Việt'),
        ],
        hints: ['So sánh ba số 16, 14, 17: số nào lớn nhất, số nào bé nhất?'],
      },
      // Tiết 2 (trang 18–19)
      {
        type: 'compare', section: 'Tiết 2', img: imgB22Robots,
        q: '1. a) Tô màu vào tấm thẻ có số lớn hơn trong mỗi cặp số.\nb) Tô màu vào tấm thẻ có số bé hơn trong mỗi cặp số.\nChọn số trên tấm thẻ em tô màu.',
        rows: [
          pickRow('a) 13 và 19', [13, 19], 'max'), pickRow('45 và 50', [45, 50], 'max'), pickRow('76 và 66', [76, 66], 'max'),
          pickRow('b) 84 và 79', [84, 79], 'min'), pickRow('94 và 96', [94, 96], 'min'), pickRow('36 và 63', [36, 63], 'min'),
        ],
        hints: ['a) chọn số lớn hơn, b) chọn số bé hơn. So sánh hàng chục trước.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết các số theo thứ tự từ bé đến lớn.',
        blanks: [
          orderRow('a) ', [29, 24, 27]), orderRow('b) ', [69, 78, 64]),
          orderRow('c) ', [55, 61, 67, 59]), orderRow('d) ', [85, 58, 39, 90]),
        ],
        hints: ['Tìm số bé nhất viết trước, rồi đến số bé tiếp theo.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Viết các số theo thứ tự từ lớn đến bé.',
        blanks: [
          orderRow('a) ', [38, 31, 35], true), orderRow('b) ', [48, 29, 42], true),
          orderRow('c) ', [73, 58, 79, 56], true), orderRow('d) ', [96, 45, 59, 88], true),
        ],
        hints: ['Tìm số lớn nhất viết trước, rồi đến số lớn tiếp theo.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '4. Viết dấu >; <; = thích hợp vào ô trống.\nChiếc xe đi từ Xuất phát đến Đích, qua từng ô:',
        rows: [
          cmpRow(9, 12), cmpRow(18, 14), cmpRow(37, 40), cmpRow(56, 49), cmpRow(66, 68), cmpRow(74, 54),
          cmpRow(83, 38), cmpRow(96, 96), cmpRow(60, 57), cmpRow(89, 91), cmpRow(25, 30), cmpRow(51, 36),
          cmpRow(99, 79), cmpRow(30, 30), cmpRow(29, 31), cmpRow(38, 37), cmpRow(26, 28), cmpRow(56, 65),
        ],
        hints: ['Số có một chữ số bé hơn số có hai chữ số: 9 < 12.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `5. Đố vui.\nCho hai tấm thẻ dưới đây:\n${cards(6, 9)}\nViết số thích hợp vào chỗ chấm.`,
        blanks: [{ label: 'Ghép hai tấm thẻ trên được số lớn nhất là: ...', answer: '99', validate: okAny('99', '96') }],
        hints: ['Ghép thẻ 9 đứng trước thẻ 6 được 96. Đố vui: thử xoay ngược tấm thẻ số 6 xem nó thành số mấy!'],
      },
      // Tiết 3 (trang 20–21)
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Đúng ghi Đ, sai ghi S.',
        blanks: [
          { label: `a) ${pic(imgB22VanA, 104, '23 < 32')} ...`, answer: 'Đ', validate: dsValidate(true) },
          { label: `b) ${pic(imgB22VanB, 104, '58 > 48')} ...`, answer: 'Đ', validate: dsValidate(true) },
          { label: `c) ${pic(imgB22VanC, 104, '69 > 80')} ...`, answer: 'S', validate: dsValidate(false) },
          { label: `d) ${pic(imgB22VanD, 104, '75 < 77')} ...`, answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['69 có 6 chục, 80 có 8 chục, nên 69 bé hơn 80.'],
      },
      {
        type: 'compare', section: 'Tiết 3',
        q: '2. Viết dấu >; <; = thích hợp vào ô trống.',
        rows: [
          cmpRow(34, 31), cmpRow(56, 65), cmpRow(62, 43),
          cmpRow(27, 19), cmpRow(89, 95), cmpRow(48, 60),
          cmpRow(45, '40 + 7'), cmpRow(54, '50 + 4'), cmpRow(86, '70 + 9'),
        ],
        hints: ['Tính phép cộng trước: 40 + 7 = 47, rồi so sánh 45 với 47.'],
      },
      {
        type: 'compare', section: 'Tiết 3', img: imgB22Bears,
        q: '3. Tô màu xanh vào gấu bông có số bé nhất, màu đỏ vào gấu bông có số lớn nhất.\nChọn số trên gấu bông em tô mỗi màu.',
        rows: [
          pickRow('a) Gấu bông tô màu xanh', [43, 66, 99], 'min'), pickRow('a) Gấu bông tô màu đỏ', [43, 66, 99], 'max'),
          pickRow('b) Gấu bông tô màu xanh', [86, 64, 97, 75], 'min'), pickRow('b) Gấu bông tô màu đỏ', [86, 64, 97, 75], 'max'),
        ],
        hints: ['Số bé nhất có chữ số hàng chục bé nhất; số lớn nhất có chữ số hàng chục lớn nhất.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB22Friends,
        q: '4. Mai có 32 bông hoa. Việt có 29 bông hoa. Nam có 35 bông hoa.\nViết tên bạn thích hợp vào chỗ chấm.',
        blanks: [
          nameBlank('a) Mai có nhiều hoa hơn ...', 'Việt'),
          nameBlank('b) Mai có ít hoa hơn ...', 'Nam'),
          nameBlank('c) ... có nhiều hoa nhất.', 'Nam'),
          nameBlank('d) ... có ít hoa nhất.', 'Việt'),
        ],
        hints: ['So sánh 32, 29 và 35: 29 < 32 < 35.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: `5. Viết các số thích hợp vào chỗ chấm.\nCho ba tấm thẻ dưới đây:\n${cards(3, 5, 7)}`,
        blanks: [{ label: 'Ghép hai trong ba tấm thẻ trên được các số: ...', answer: '35, 37, 53, 57, 73, 75', validate: setValidate(['35', '37', '53', '57', '73', '75']) }],
        hints: ['Chọn thẻ đứng trước (3, 5 hoặc 7), rồi chọn một trong hai thẻ còn lại đứng sau.'],
      },
    ],
  },
];
