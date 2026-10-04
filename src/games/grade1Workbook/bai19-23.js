/**
 * Vở bài tập Toán 1 — Tập một: Bài 19–23 (sách trang 21–27).
 * Hình vẽ lại: scripts/redraw/g1_bai19.py, g1_bai21.py, g1_bai22.py, g1_bai23.py (kit_l1_b19.py).
 * Bỏ qua: "Viết số" (tập viết), "Xếp hình theo mẫu" (xếp hình thật), Bài 23 bài 2 "Viết các số từ 0 đến 10" (tập viết).
 */
import { blank, listValidate } from '../grade3Workbook.js';
import imgB19Dots1 from '../../assets/grade1-workbook/bai19_q2_dots1.svg';
import imgB19Dots2 from '../../assets/grade1-workbook/bai19_q2_dots2.svg';
import imgB19Dots3 from '../../assets/grade1-workbook/bai19_q2_dots3.svg';
import imgB19Dots4 from '../../assets/grade1-workbook/bai19_q2_dots4.svg';
import imgB21Dots1 from '../../assets/grade1-workbook/bai21_q2_dots1.svg';
import imgB21Dots2 from '../../assets/grade1-workbook/bai21_q2_dots2.svg';
import imgB21Dots3 from '../../assets/grade1-workbook/bai21_q2_dots3.svg';
import imgB21Dots4 from '../../assets/grade1-workbook/bai21_q2_dots4.svg';
import imgB21Dots5 from '../../assets/grade1-workbook/bai21_q2_dots5.svg';
import imgB21Dots6 from '../../assets/grade1-workbook/bai21_q2_dots6.svg';
import imgB22Ducks from '../../assets/grade1-workbook/bai22_q1_ducks.svg';
import imgB22Palms from '../../assets/grade1-workbook/bai22_q1_palms.svg';
import imgB22Squirrels from '../../assets/grade1-workbook/bai22_q1_squirrels.svg';
import imgB22Horses from '../../assets/grade1-workbook/bai22_q1_horses.svg';
import imgB22Flowers from '../../assets/grade1-workbook/bai22_q1_flowers.svg';
import imgB22Jackets from '../../assets/grade1-workbook/bai22_q1_jackets.svg';
import imgB22Sticks from '../../assets/grade1-workbook/bai22_q2_sticks.svg';
import imgB22Shapes from '../../assets/grade1-workbook/bai22_q3_shapes.svg';
import imgB22Tree from '../../assets/grade1-workbook/bai22_q5_tree.svg';
import imgB22TreeSample from '../../assets/grade1-workbook/bai22_q5_tree_sample.svg';
import imgB23Palms from '../../assets/grade1-workbook/bai23_q1_palms.svg';
import imgB23Ducks from '../../assets/grade1-workbook/bai23_q1_ducks.svg';
import imgB23Bikes from '../../assets/grade1-workbook/bai23_q1_bikes.svg';
import imgB23Horses from '../../assets/grade1-workbook/bai23_q1_horses.svg';
import imgB23Squirrels from '../../assets/grade1-workbook/bai23_q1_squirrels.svg';
import imgB23Flowers from '../../assets/grade1-workbook/bai23_q1_flowers.svg';
import imgB23Pears from '../../assets/grade1-workbook/bai23_q1_pears.svg';
import imgB23Pattern from '../../assets/grade1-workbook/bai23_q5_pattern.svg';

// ── Local helpers ───────────────────────────────────────────────────────────

// A picture with its answer boxes right under it, each box at a fixed share of
// the picture's width (where the picture's lines end): the dice rings of "Số ?"
// (left card, whole ring, right card) and the "tách 10" trees.
// `cells` = [{ at: 25 (percent), given?: '9' }]; a cell without `given` is one "..." slot.
function underPic(img, width, cells) {
  const spans = cells.map(c => `<span style="position:absolute;left:${c.at}%;top:0;transform:translateX(-50%)">${c.given != null
    ? `<span style="display:inline-flex;align-items:center;justify-content:center;width:2.6rem;height:2.6rem;border:2px solid #475569;border-radius:0.55rem;background:#fff;font-size:1.25rem;font-weight:700">${c.given}</span>`
    : '...'}</span>`).join('');
  return `<span style="display:inline-block;width:${width}px;max-width:100%;vertical-align:top">`
    + `<img src="${img}" alt="" style="display:block;width:100%;height:auto">`
    + `<span style="display:block;position:relative;height:3.1rem">${spans}</span></span>`;
}

// "Số ?" under a ring of two dot cards: left card, whole ring, right card.
const DOT_COLS = [{ at: 100 / 6 }, { at: 50 }, { at: 500 / 6 }];
function dotsBlank(img, left, right) {
  const ans = [left, left + right, right].map(String);
  return { label: underPic(img, 300, DOT_COLS), answer: ans.join(','), validate: listValidate(ans), boxes: true };
}

// "Số ?" with several correct numbers (8 < ... : 9 or 10): any number 0–10 that fits.
function fitsValidate(test) {
  return (value) => {
    const v = String(value).trim();
    return /^\d{1,2}$/.test(v) && +v <= 10 && test(+v);
  };
}

// One strip of number cells; null = empty cell, filled with `full[i]`.
function strip(given, full) {
  return [given.map((g, i) => (g == null ? blank(full[i]) : g))];
}
const range = (a, b) => (a <= b
  ? Array.from({ length: b - a + 1 }, (_, i) => a + i)
  : Array.from({ length: a - b + 1 }, (_, i) => a - i));

// A chain of boxes joined by arrows ("0 → □ → 2"); answer = the empty boxes in order.
function chain(label, answers) {
  const a = answers.map(String);
  return { label, answer: a.join(','), validate: listValidate(a), boxes: true };
}

// ── Units ───────────────────────────────────────────────────────────────────

export const BAI_19_23 = [
  {
    id: 'bai-19', number: 19, title: 'Số 9',
    questions: [
      {
        type: 'fill',
        q: '2. Số ?\nÔ trái: số chấm ở thẻ trái. Ô giữa: số chấm ở cả hai thẻ. Ô phải: số chấm ở thẻ phải.',
        blanks: [
          dotsBlank(imgB19Dots1, 8, 1),
          dotsBlank(imgB19Dots2, 7, 2),
          dotsBlank(imgB19Dots3, 6, 3),
          dotsBlank(imgB19Dots4, 5, 4),
        ],
        hints: ['Đếm chấm ở từng thẻ, rồi đếm tất cả chấm trong vòng.'],
      },
      {
        type: 'compare',
        q: '3. > < = ?',
        rows: [
          { left: '8', right: '9', answer: '<' },
          { left: '7', right: '8', answer: '<' },
          { left: '9', right: '7', answer: '>' },
          { left: '9', right: '8', answer: '>' },
          { left: '9', right: '8', answer: '>' },
          { left: '8', right: '9', answer: '<' },
          { left: '7', right: '6', answer: '>' },
          { left: '9', right: '7', answer: '>' },
          { left: '9', right: '9', answer: '=' },
          { left: '7', right: '9', answer: '<' },
          { left: '9', right: '6', answer: '>' },
          { left: '9', right: '6', answer: '>' },
        ],
      },
      {
        type: 'fill',
        q: '4. Số ?',
        blanks: [
          { label: '8 < ...', answer: '9', validate: fitsValidate(n => 8 < n) },
          { label: '... > 8', answer: '9', validate: fitsValidate(n => n > 8) },
          { label: '7 < ...', answer: '8', validate: fitsValidate(n => 7 < n) },
          { label: '... > 7', answer: '8', validate: fitsValidate(n => n > 7) },
          { label: '7 < ... < 9', answer: '8', validate: fitsValidate(n => 7 < n && n < 9) },
          { label: '6 < ... < 8', answer: '7', validate: fitsValidate(n => 6 < n && n < 8) },
        ],
        hints: ['Có thể có nhiều số đúng, viết một số là được.'],
      },
      {
        type: 'fill',
        q: '5. Viết số thích hợp vào ô trống :',
        blanks: [
          chain('1 → ... → ... → ... → 5 → ... → ... → ... → ...', [2, 3, 4, 6, 7, 8, 9]),
          chain('... ← ... ← ... ← 6 ← ... ← ... ← ... ← 2 ← 1', [9, 8, 7, 5, 4, 3]),
        ],
        hints: ['Hàng dưới đi theo mũi tên, từ phải sang trái: 1, 2, 3, …'],
      },
    ],
  },
  {
    id: 'bai-20', number: 20, title: 'Số 0',
    questions: [
      {
        type: 'table',
        q: '2. Viết số thích hợp vào ô trống :',
        tables: [
          { rows: strip([0, 1, null, 3, null, 5], range(0, 5)) },
          { rows: strip([0, null, 2, null, null, null], range(0, 5)) },
          { rows: strip([null, null, 2, null, null, null], range(0, 5)) },
          { rows: strip([null, 1, null, null, null, 5, null, null, 8, null], range(0, 9)) },
        ],
      },
      {
        type: 'fill',
        q: '3. Viết số thích hợp vào ô trống :',
        blanks: [
          chain('0 → ... → 2', [1]),
          chain('... → 1 → ... → 3 → ... → 5', [0, 2, 4]),
          chain('6 → ... → 8', [7]),
          chain('5 → ... → ... → 8 → ...', [6, 7, 9]),
          chain('... → 9', [8]),
          chain('4 → ...', [5]),
          chain('... → 1', [0]),
          chain('... → ... → 2', [0, 1]),
        ],
      },
      {
        type: 'compare',
        q: '4. > < = ?',
        rows: [
          { left: '0', right: '1', answer: '<' },
          { left: '0', right: '5', answer: '<' },
          { left: '7', right: '0', answer: '>' },
          { left: '2', right: '0', answer: '>' },
          { left: '0', right: '2', answer: '<' },
          { left: '8', right: '0', answer: '>' },
          { left: '0', right: '4', answer: '<' },
          { left: '2', right: '2', answer: '=' },
          { left: '0', right: '3', answer: '<' },
          { left: '9', right: '0', answer: '>' },
          { left: '0', right: '6', answer: '<' },
          { left: '0', right: '0', answer: '=' },
        ],
      },
      {
        type: 'choice',
        q: '5. Khoanh vào số bé nhất :',
        options: ['9', '5', '0', '2'],
        answer: 2,
      },
    ],
  },
  {
    id: 'bai-21', number: 21, title: 'Số 10',
    questions: [
      {
        type: 'fill',
        q: '2. Số ?\nÔ trái: số chấm ở thẻ trái. Ô giữa: số chấm ở cả hai thẻ. Ô phải: số chấm ở thẻ phải.',
        blanks: [
          dotsBlank(imgB21Dots1, 9, 1),
          dotsBlank(imgB21Dots2, 8, 2),
          dotsBlank(imgB21Dots3, 7, 3),
          dotsBlank(imgB21Dots4, 6, 4),
          dotsBlank(imgB21Dots5, 5, 5),
          dotsBlank(imgB21Dots6, 10, 0),
        ],
        hints: ['Thẻ không có chấm nào thì viết số 0.'],
      },
      {
        type: 'table',
        q: '3. Viết số thích hợp vào ô trống :',
        tables: [
          { rows: strip([0, null, 2, null, null, null, 6, null, null, null, null], range(0, 10)) },
          { rows: strip([10, null, null, null, null, null, 4, null, null, null, null], range(10, 0)) },
        ],
      },
      {
        type: 'compare',
        q: '4. Khoanh vào số lớn nhất :',
        rows: [
          { left: 'a) 4 , 2 , 7 , 1.', options: ['4', '2', '7', '1'], answer: '7' },
          { left: 'b) 8 , 10 , 9 , 6.', options: ['8', '10', '9', '6'], answer: '10' },
        ],
      },
    ],
  },
  {
    id: 'bai-22', number: 22, title: 'Luyện tập',
    questions: [
      {
        type: 'match', bigImg: true,
        q: '1. Nối (theo mẫu) :',
        left: [
          { id: 'ducks', img: imgB22Ducks, text: '' },
          { id: 'palms', img: imgB22Palms, text: '' },
          { id: 'squirrels', img: imgB22Squirrels, text: '' },
          { id: 'horses', img: imgB22Horses, text: '' },
          { id: 'flowers', img: imgB22Flowers, text: '' },
          { id: 'jackets', img: imgB22Jackets, text: '' },
        ],
        right: [
          { id: 'n8', text: '8' },
          { id: 'n9', text: '9' },
          { id: 'n10', text: '10' },
        ],
        pairs: [['ducks', 'n8'], ['palms', 'n10'], ['squirrels', 'n10'], ['horses', 'n9'], ['flowers', 'n9'], ['jackets', 'n10']],
        matchSample: ['squirrels', 'n10'],
        hints: ['Đếm số con vật, đồ vật trong mỗi vòng. Một số có thể nối với nhiều vòng.'],
      },
      {
        type: 'fill', img: imgB22Sticks,
        q: '2. Vẽ thêm cho đủ 10 (theo mẫu) :\nMỗi ô cần vẽ thêm mấy que tính để có đủ 10 que?',
        blanks: [
          { label: 'Ô 1: ...', answer: '3', boxes: true },
          { label: 'Ô 2: ...', answer: '2', boxes: true },
          { label: 'Ô 3: ...', answer: '4', boxes: true },
          { label: 'Ô 4: ...', answer: '5', boxes: true },
        ],
        hints: ['Mẫu có 10 que tính. Đếm số que đã có trong ô rồi đếm thêm cho đến 10.'],
      },
      {
        type: 'fill', img: imgB22Shapes,
        q: '3. Điền số thích hợp vào ô trống :',
        blanks: [
          { label: 'a) Có mấy hình tam giác ? ...', answer: '10', boxes: true },
          { label: 'b) Có mấy hình vuông ? ...', answer: '9', boxes: true },
        ],
        hints: ['Đếm từng hàng một rồi cộng lại.'],
      },
      {
        type: 'compare',
        q: '4. a) > < = ?',
        rows: [
          { left: '0', right: '1', answer: '<' },
          { left: '8', right: '5', answer: '>' },
          { left: '6', right: '9', answer: '<' },
          { left: '10', right: '9', answer: '>' },
          { left: '0', right: '2', answer: '<' },
          { left: '5', right: '0', answer: '>' },
          { left: '9', right: '6', answer: '>' },
          { left: '9', right: '10', answer: '<' },
          { left: '0', right: '3', answer: '<' },
          { left: '8', right: '0', answer: '>' },
          { left: '9', right: '9', answer: '=' },
          { left: '10', right: '10', answer: '=' },
        ],
      },
      {
        type: 'fill',
        q: '4. b) Trong các số từ 0 đến 10 :',
        blanks: [
          { label: 'Số bé nhất là : ...', answer: '0', boxes: true },
          { label: 'Số lớn nhất là : ...', answer: '10', boxes: true },
        ],
      },
      {
        type: 'fill',
        q: `5. Số ?\n<img src="${imgB22TreeSample}" alt="10 gồm 9 và 1" style="width:180px;max-width:100%">`,
        blanks: [
          { label: underPic(imgB22Tree, 180, [{ at: 25, given: '8' }, { at: 75 }]), answer: '2', boxes: true },
          { label: underPic(imgB22Tree, 180, [{ at: 25, given: '7' }, { at: 75 }]), answer: '3', boxes: true },
          { label: underPic(imgB22Tree, 180, [{ at: 25, given: '6' }, { at: 75 }]), answer: '4', boxes: true },
          { label: underPic(imgB22Tree, 180, [{ at: 25 }, { at: 75, given: '5' }]), answer: '5', boxes: true },
        ],
        hints: ['10 gồm 9 và 1, 10 gồm 8 và mấy?'],
      },
    ],
  },
  {
    id: 'bai-23', number: 23, title: 'Luyện tập chung',
    questions: [
      {
        type: 'match', bigImg: true,
        q: '1. Nối (theo mẫu) :',
        left: [
          { id: 'palms', img: imgB23Palms, text: '' },
          { id: 'ducks', img: imgB23Ducks, text: '' },
          { id: 'bikes', img: imgB23Bikes, text: '' },
          { id: 'horses', img: imgB23Horses, text: '' },
          { id: 'squirrels', img: imgB23Squirrels, text: '' },
          { id: 'flowers', img: imgB23Flowers, text: '' },
          { id: 'pears', img: imgB23Pears, text: '' },
        ],
        right: [
          { id: 'n3', text: '3' },
          { id: 'n5', text: '5' },
          { id: 'n9', text: '9' },
          { id: 'n4', text: '4' },
          { id: 'n6', text: '6' },
          { id: 'n8', text: '8' },
          { id: 'n10', text: '10' },
        ],
        pairs: [['palms', 'n3'], ['ducks', 'n5'], ['bikes', 'n4'], ['horses', 'n6'], ['squirrels', 'n8'], ['flowers', 'n10'], ['pears', 'n9']],
        matchSample: ['palms', 'n3'],
        hints: ['Đếm số đồ vật trong mỗi vòng tròn rồi nối với số đó.'],
      },
      {
        type: 'table',
        q: '3. Số ?',
        rows: strip([null, 1, null, null, 4, null, null, null, null, 9, null], range(0, 10)),
      },
      {
        type: 'fill',
        q: '4. Xếp các số 8, 2, 1, 5, 10 :',
        blanks: [
          { label: 'a) Theo thứ tự từ bé đến lớn :<br>... → ... → ... → ... → ...', answer: '1,2,5,8,10', validate: listValidate(['1', '2', '5', '8', '10']), tiles: ['8', '2', '1', '5', '10'], boxes: true },
          { label: 'b) Theo thứ tự từ lớn đến bé :<br>... ... ... ... ...', answer: '10,8,5,2,1', validate: listValidate(['10', '8', '5', '2', '1']), tiles: ['8', '2', '1', '5', '10'], boxes: true },
        ],
      },
      {
        type: 'choice', img: imgB23Pattern,
        q: '5. b) Xếp hình còn thiếu vào ô trống :\nÔ trống cần hình nào?',
        options: ['△ Hình tam giác', '○ Hình tròn', '□ Hình vuông'],
        answer: 1,
        hints: ['Cứ hai hình tam giác thì đến một hình tròn.'],
      },
    ],
  },
];
