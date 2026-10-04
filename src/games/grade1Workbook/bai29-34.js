/**
 * Vở bài tập Toán 1 — Tập một: Bài 29–34 (sách trang 34–39; Bài 34 chỉ có trang đầu trong Phần 1).
 * Mọi hình vẽ lại theo nét riêng: scripts/redraw/g1_bai29.py … g1_bai34.py (bộ vẽ kit_l1_29.py).
 */
import { swapPairValidate } from '../grade3Workbook.js';
import imgB29Horses from '../../assets/grade1-workbook/bai29_q3a_horses.svg';
import imgB29Birds from '../../assets/grade1-workbook/bai29_q3b_birds.svg';
import imgB30Boats from '../../assets/grade1-workbook/bai30_q5a_boats.svg';
import imgB30Rabbits from '../../assets/grade1-workbook/bai30_q5b_rabbits.svg';
import imgB31ApplesA from '../../assets/grade1-workbook/bai31_q3a_apples.svg';
import imgB31ApplesB from '../../assets/grade1-workbook/bai31_q3b_apples.svg';
import imgB32Bears from '../../assets/grade1-workbook/bai32_q3_bears.svg';
import imgB33Elephants from '../../assets/grade1-workbook/bai33_q4a_elephants.svg';
import imgB33Dogs from '../../assets/grade1-workbook/bai33_q4a_dogs.svg';
import imgB33Horses from '../../assets/grade1-workbook/bai33_q4b_horses.svg';
import imgB33Ducks from '../../assets/grade1-workbook/bai33_q4b_ducks.svg';
import imgB34Frogs from '../../assets/grade1-workbook/bai34_q4_frogs.svg';

// "2 + 3 = ..." on the book's dotted line: the result is the only blank.
const calc = (expr, res) => ({ label: `${expr} = ...`, answer: String(res) });

// A column addition/subtraction as the book prints it: the two numbers stacked
// with the sign on the left, a rule, then the result. "..." anywhere becomes a box.
const col = (a, b, op, res) => `<span style="display:inline-grid;grid-template-columns:auto auto;column-gap:6px;align-items:center;font-variant-numeric:tabular-nums;margin:4px 6px;vertical-align:middle;font-size:1.15em;line-height:1.2">`
  + `<span style="grid-row:1 / 3;padding-bottom:2px">${op}</span><span style="text-align:right">${a}</span><span style="text-align:right">${b}</span>`
  + `<span style="grid-column:1 / 3;border-top:2px solid currentColor;text-align:right;padding-top:4px">${res}</span></span>`;
const colAdd = (a, b, prefix = '') => ({ label: `${prefix}${col(a, b, '+', '...')}`, boxes: true, answer: String(a + b) });

// A picture drawn in the book above its row of 5 boxes ("Viết phép tính thích hợp").
const pic = (src, alt, w = 300) => `<img src="${src}" alt="${alt}" style="display:block;width:${w}px;max-width:100%;height:auto;margin:2px 0 6px">`;

// "Viết phép tính thích hợp": 5 boxes, one character each (3 + 2 = 5). Every
// equation the picture allows is accepted (the two groups in either order).
// Typed look-alikes count too: "-" or "–" for "−".
const normEq = (s) => String(s).replace(/[,\s]/g, '').replace(/[-–—]/g, '−');
const eqValidate = (...eqs) => {
  const ok = new Set(eqs.map(normEq));
  return (v) => ok.has(normEq(v));
};
const eqBlank = (label, eqs) => ({
  label: `${label}... ... ... ... ...`,
  boxes: true,
  answer: eqs[0].split('').join(','),
  validate: eqValidate(...eqs),
});

// A domino card: dots on each half, the book's dashed slash between the halves.
const DOM_POS = {
  1: [[0, 0]],
  2: [[-0.45, 0.35], [0.45, -0.35]],
  3: [[-0.5, 0.5], [0, 0], [0.5, -0.5]],
};
const domino = (l, r) => {
  const half = (n, cx) => DOM_POS[n].map(([x, y]) => `<circle cx="${cx + x * 22}" cy="${30 + y * 22}" r="6.5" fill="#3F3A40"/>`).join('');
  return `<svg viewBox="0 0 150 60" width="150" height="60" style="display:block;margin:0 0 6px" aria-label="${l} chấm và ${r} chấm">`
    + `<rect x="2" y="2" width="146" height="56" rx="14" fill="#FFF4DF" stroke="#3F3A40" stroke-width="2.6"/>`
    + `<line x1="86" y1="8" x2="64" y2="52" stroke="#3F3A40" stroke-width="2" stroke-dasharray="5 4"/>`
    + `${half(l, 38)}${half(r, 112)}</svg>`;
};

// A grey cell of the "+" table: the book shades sums greater than 5 (not written).
const SHADE = '<span aria-label="ô tô xám" style="display:block;min-height:1.8em;background:#D5D9DE;border-radius:4px"></span>';
const sum = (a, b) => ({ blank: true, answer: String(a + b) });

export const BAI_29_34 = [
  {
    id: 'bai-29', number: 29, title: 'Phép cộng trong phạm vi 5',
    questions: [
      {
        type: 'fill',
        q: '1. Tính :',
        blanks: [
          calc('a) 2 + 3', 5), calc('4 + 1', 5), calc('2 + 2', 4), calc('1 + 1', 2),
          calc('3 + 2', 5), calc('1 + 4', 5), calc('2 + 1', 3), calc('3 + 1', 4),
          colAdd(4, 1, 'b) '), colAdd(2, 3), colAdd(2, 2), colAdd(3, 2), colAdd(1, 4), colAdd(1, 3),
        ],
      },
      {
        type: 'fill',
        q: '2. Viết số thích hợp vào chỗ chấm :',
        blanks: [
          calc('4 + 1', 5), calc('3 + 2', 5), calc('2 + 1', 3), calc('3 + 1', 4),
          calc('1 + 4', 5), calc('2 + 3', 5), calc('1 + 2', 3), calc('2 + 2', 4),
          { label: '5 = 1 + ...', answer: '4' }, { label: '5 = 3 + ...', answer: '2' },
          { label: '3 = 2 + ...', answer: '1' }, { label: '4 = 2 + ...', answer: '2' },
        ],
      },
      {
        type: 'fill',
        q: '3. Viết phép tính thích hợp :',
        blanks: [
          eqBlank(`a) ${pic(imgB29Horses, '3 con ngựa đứng và 2 con ngựa đang phi')}<br>`, ['3+2=5', '2+3=5']),
          eqBlank(`b) ${pic(imgB29Birds, '2 con chim đậu trên cành và 3 con chim đang bay')}<br>`, ['2+3=5', '3+2=5']),
        ],
        hints: ['Đếm số con vật ở mỗi bên vạch chấm, rồi viết phép cộng. Mỗi ô viết một số hoặc một dấu, ví dụ: 1 + 1 = 2.'],
      },
      {
        type: 'fill',
        q: '4. Số ?',
        blanks: [
          { label: `${domino(3, 2)}<br>... + ... = 5`, boxes: true, answer: '3,2', validate: swapPairValidate(3, 2) },
          { label: `${domino(1, 3)}<br>... + ... = 4`, boxes: true, answer: '1,3', validate: swapPairValidate(1, 3) },
          { label: `${domino(2, 1)}<br>... + ... = 3`, boxes: true, answer: '2,1', validate: swapPairValidate(2, 1) },
        ],
        hints: ['Đếm số chấm ở mỗi nửa của thẻ.'],
      },
    ],
  },
  {
    id: 'bai-30', number: 30, title: 'Luyện tập',
    questions: [
      {
        type: 'fill',
        q: '1. Số ?',
        blanks: [
          ...[[1, 1], [1, 2], [1, 3], [1, 4], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [4, 1]]
            .map(([a, b]) => ({ label: `${a} + ${b} = ...`, boxes: true, answer: String(a + b) })),
          { label: '4 + 1 = 1 + ...', boxes: true, answer: '4' },
        ],
      },
      {
        type: 'fill',
        q: '2. Tính :',
        blanks: [colAdd(3, 2), colAdd(4, 1), colAdd(2, 2), colAdd(1, 3), colAdd(2, 3), colAdd(1, 2)],
      },
      {
        type: 'fill',
        q: '3. Tính :',
        blanks: [
          calc('3 + 1 + 1', 5), calc('1 + 2 + 2', 5), calc('2 + 1 + 1', 4),
          calc('1 + 3 + 1', 5), calc('2 + 2 + 1', 5), calc('2 + 1 + 2', 5),
        ],
        hints: ['Cộng lần lượt từ trái sang phải: 3 + 1 = 4, 4 + 1 = 5.'],
      },
      {
        type: 'compare',
        q: '4. > < = ?',
        rows: [
          { left: '5', right: '3 + 2', answer: '=' },
          { left: '4', right: '3 + 2', answer: '<' },
          { left: '3 + 2', right: '2 + 3', answer: '=' },
          { left: '5', right: '3 + 1', answer: '>' },
          { left: '4', right: '3 + 1', answer: '=' },
          { left: '1 + 2 + 2', right: '2 + 2', answer: '>' },
        ],
        hints: ['Tính kết quả phép cộng trước, rồi so sánh hai số.'],
      },
      {
        type: 'fill',
        q: '5. Viết phép tính thích hợp :',
        blanks: [
          eqBlank(`a) ${pic(imgB30Boats, '3 chiếc thuyền và 1 chiếc thuyền buồm')}<br>`, ['3+1=4', '1+3=4']),
          eqBlank(`b) ${pic(imgB30Rabbits, '3 con thỏ đứng và 2 con thỏ đang chạy')}<br>`, ['3+2=5', '2+3=5']),
        ],
        hints: ['Mỗi ô viết một số hoặc một dấu, ví dụ: 1 + 1 = 2.'],
      },
    ],
  },
  {
    id: 'bai-31', number: 31, title: 'Số 0 trong phép cộng',
    questions: [
      {
        type: 'fill',
        q: '1. Tính :',
        blanks: [
          calc('a) 4 + 0', 4), calc('3 + 0', 3), calc('0 + 2', 2), calc('1 + 0', 1),
          calc('0 + 4', 4), calc('0 + 3', 3), calc('2 + 0', 2), calc('0 + 1', 1),
          colAdd(5, 0, 'b) '), colAdd(3, 0), colAdd(0, 2), colAdd(0, 4), colAdd(1, 0),
        ],
        hints: ['Một số cộng với 0 bằng chính số đó.'],
      },
      {
        type: 'fill',
        q: '2. Viết số thích hợp vào chỗ chấm :',
        blanks: [
          { label: '4 + ... = 4', answer: '0' },
          { label: '3 + 0 = 2 + ...', answer: '1' },
          { label: '... + 2 = 4', answer: '2' },
          { label: '... + 3 = 3', answer: '0' },
          { label: '... + 2 = 2 + 0', answer: '0' },
          { label: '0 + ... = 0', answer: '0' },
        ],
      },
      {
        type: 'fill',
        q: '3. Viết phép tính thích hợp :',
        blanks: [
          eqBlank(`a) ${pic(imgB31ApplesA, 'Đĩa trên có 3 quả táo, đĩa dưới có 2 quả táo', 280)}<br>`, ['3+2=5', '2+3=5']),
          eqBlank(`b) ${pic(imgB31ApplesB, 'Đĩa trên có 3 quả táo, đĩa dưới không có quả nào', 280)}<br>`, ['3+0=3', '0+3=3']),
        ],
        hints: ['Đếm số quả táo trên mỗi đĩa. Đĩa không có quả nào thì viết số 0.'],
      },
      {
        type: 'match',
        q: '4. Nối phép tính với số thích hợp :',
        left: [{ id: 'p30', text: '3 + 0' }, { id: 'p04', text: '0 + 4' }, { id: 'p50', text: '5 + 0' }],
        right: [{ id: 'n3', text: '3' }, { id: 'n5', text: '5' }, { id: 'n4', text: '4' }],
        pairs: [['p30', 'n3'], ['p04', 'n4'], ['p50', 'n5']],
      },
    ],
  },
  {
    id: 'bai-32', number: 32, title: 'Luyện tập',
    questions: [
      {
        type: 'fill',
        q: '1. Tính :',
        blanks: [
          [0, 1], [0, 2], [0, 3], [0, 4],
          [1, 1], [1, 2], [1, 3], [1, 4],
          [2, 1], [2, 2], [2, 3],
          [3, 1], [3, 2],
          [4, 1],
        ].map(([a, b]) => calc(`${a} + ${b}`, a + b)),
      },
      {
        type: 'fill',
        q: '2. Tính :',
        blanks: [
          calc('3 + 2', 5), calc('1 + 4', 5), calc('1 + 2', 3), calc('0 + 5', 5),
          calc('2 + 3', 5), calc('4 + 1', 5), calc('2 + 1', 3), calc('5 + 0', 5),
        ],
      },
      {
        type: 'compare', img: imgB32Bears,
        q: '3. > < = ?\nDòng cuối: so sánh số gấu bông trên hai kệ (1 + 3 ... 3 + 1).',
        rows: [
          { left: '3 + 2', right: '4', answer: '>' },
          { left: '2 + 1', right: '2', answer: '>' },
          { left: '5 + 0', right: '5', answer: '=' },
          { left: '0 + 4', right: '3', answer: '>' },
          { left: '3 + 1', right: '4 + 1', answer: '<' },
          { left: '2 + 0', right: '0 + 2', answer: '=' },
          { left: '1 + 3', right: '3 + 1', answer: '=' },
        ],
        hints: ['Kệ bên trái: 1 gấu nâu và 3 gấu trắng. Kệ bên phải: 3 gấu nâu và 1 gấu trắng.'],
      },
      {
        type: 'table',
        q: '4. Viết kết quả phép cộng :',
        headers: ['+', '1', '2', '3', '4'],
        colWidths: ['16%', '21%', '21%', '21%', '21%'],
        rows: [
          ['1', sum(1, 1), sum(1, 2), sum(1, 3), sum(1, 4)],
          ['2', sum(2, 1), sum(2, 2), sum(2, 3), SHADE],
          ['3', sum(3, 1), sum(3, 2), SHADE, SHADE],
          ['4', sum(4, 1), SHADE, SHADE, SHADE],
        ],
        hints: ['Lấy số ở đầu hàng cộng với số ở đầu cột. Ví dụ: hàng 2, cột 3 là 2 + 3.'],
      },
    ],
  },
  {
    id: 'bai-33', number: 33, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill',
        q: '1. Tính :',
        blanks: [colAdd(2, 2), colAdd(5, 0), colAdd(1, 3), colAdd(3, 2), colAdd(2, 3), colAdd(0, 5)],
      },
      {
        type: 'fill',
        q: '2. Tính :',
        blanks: [
          calc('2 + 1 + 1', 4), calc('3 + 1 + 1', 5), calc('2 + 2 + 1', 5),
          calc('1 + 3 + 1', 5), calc('4 + 1 + 0', 5), calc('2 + 0 + 3', 5),
        ],
        hints: ['Cộng lần lượt từ trái sang phải.'],
      },
      {
        type: 'compare',
        q: '3. > < = ?',
        rows: [
          { left: '2 + 2', right: '5', answer: '<' },
          { left: '2 + 1', right: '1 + 2', answer: '=' },
          { left: '3 + 1', right: '3 + 2', answer: '<' },
          { left: '2 + 3', right: '5', answer: '=' },
          { left: '2 + 2', right: '1 + 2', answer: '>' },
          { left: '3 + 1', right: '1 + 3', answer: '=' },
          { left: '5 + 0', right: '5', answer: '=' },
          { left: '2 + 0', right: '1 + 2', answer: '<' },
          { left: '1 + 4', right: '4 + 1', answer: '=' },
        ],
      },
      {
        type: 'fill',
        q: '4. Viết phép tính thích hợp :',
        blanks: [
          eqBlank(`a) ${pic(imgB33Elephants, '1 con voi và 2 con voi', 280)}<br>`, ['1+2=3', '2+1=3']),
          eqBlank(`${pic(imgB33Dogs, '1 con chó và 3 con chó', 280)}<br>`, ['1+3=4', '3+1=4']),
          eqBlank(`b) ${pic(imgB33Horses, '2 con ngựa và 2 con ngựa', 280)}<br>`, ['2+2=4']),
          eqBlank(`${pic(imgB33Ducks, '2 con vịt trên bờ và 3 con vịt dưới nước', 280)}<br>`, ['2+3=5', '3+2=5']),
        ],
        hints: ['Đếm số con vật ở mỗi bên vạch chấm. Mỗi ô viết một số hoặc một dấu.'],
      },
    ],
  },
  {
    id: 'bai-34', number: 34, title: 'Phép trừ trong phạm vi 3',
    questions: [
      {
        type: 'fill',
        q: '1. Tính :',
        blanks: [
          calc('1 + 2', 3), calc('3 − 1', 2), calc('1 + 1', 2), calc('2 − 1', 1),
          calc('3 − 2', 1), calc('3 − 2', 1), calc('2 − 1', 1), calc('3 − 1', 2),
          calc('3 − 1', 2), calc('2 − 1', 1), calc('3 − 1', 2), calc('3 − 2', 1),
        ],
      },
      {
        type: 'fill',
        q: '2. Viết số thích hợp vào chỗ chấm :',
        blanks: [
          { label: col(2, 1, '−', '...'), boxes: true, answer: '1' },
          { label: col(2, '...', '−', 1), boxes: true, answer: '1' },
          { label: col(3, 2, '−', '...'), boxes: true, answer: '1' },
          { label: col(3, 1, '−', '...'), boxes: true, answer: '2' },
          { label: col(3, '...', '−', 2), boxes: true, answer: '1' },
          { label: col(3, '...', '−', 1), boxes: true, answer: '2' },
        ],
        hints: ['3 trừ mấy thì được 2? Nghĩ: 2 cộng mấy bằng 3.'],
      },
      {
        type: 'match',
        q: '3. Nối phép tính với số thích hợp :',
        left: [{ id: 'm32', text: '3 − 2' }, { id: 'm21', text: '2 − 1' }, { id: 'm31', text: '3 − 1' }],
        right: [{ id: 'k1', text: '1' }, { id: 'k2', text: '2' }, { id: 'k3', text: '3' }],
        pairs: [['m32', 'k1'], ['m21', 'k1'], ['m31', 'k2']],
        hints: ['Có số không nối với phép tính nào, có số nối với hai phép tính.'],
      },
      {
        type: 'fill',
        q: '4. Viết phép tính thích hợp :',
        blanks: [
          eqBlank(`${pic(imgB34Frogs, 'Có 3 con ếch, 1 con nhảy xuống nước bơi đi, còn 2 con trên lá sen', 320)}<br>`, ['3−1=2']),
        ],
        hints: ['Có 3 con ếch, 1 con nhảy xuống nước bơi đi. Trên lá sen còn mấy con?'],
      },
    ],
  },
];
