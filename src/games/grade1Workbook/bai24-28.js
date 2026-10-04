/**
 * Vở bài tập Toán 1 — Tập một: Bài 24, Tự kiểm tra, Bài 25–28 (sách trang 28–33).
 * Luyện tập chung, Tự kiểm tra, Phép cộng trong phạm vi 3, 4.
 * Mọi hình là SVG vẽ lại theo nét riêng (scripts/redraw/g1_bai24_28.py).
 */
import { blank, listValidate, opsValidate } from '../grade3Workbook.js';
import imgB24Shapes from '../../assets/grade1-workbook/bai24_q5_shapes.svg';
import imgKtFarm from '../../assets/grade1-workbook/kt_q1_farm.svg';
import icCow from '../../assets/grade1-workbook/kt_q1_cow.svg';
import icHorse from '../../assets/grade1-workbook/kt_q1_horse.svg';
import icPig from '../../assets/grade1-workbook/kt_q1_pig.svg';
import icDuck from '../../assets/grade1-workbook/kt_q1_duck.svg';
import icHen from '../../assets/grade1-workbook/kt_q1_hen.svg';
import icDog from '../../assets/grade1-workbook/kt_q1_dog.svg';
import imgKtShapes from '../../assets/grade1-workbook/kt_q4_shapes.svg';
import imgB25Birds from '../../assets/grade1-workbook/bai25_q4_birds.svg';
import imgB26Dogs from '../../assets/grade1-workbook/bai26_q1a_dogs.svg';
import imgB26Rabbits from '../../assets/grade1-workbook/bai26_q1b_rabbits.svg';
import imgB27Ducks from '../../assets/grade1-workbook/bai27_q4_ducks.svg';
import imgB28Kids from '../../assets/grade1-workbook/bai28_q5_kids.svg';

// Số trong vòng tròn (dãy số Bài 24, mũi tên "+1" Bài 28).
// Số cho sẵn trong ô vuông (dãy số Bài 24).
const sq = (n) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:2.3rem;height:2.3rem;border:2px solid #475569;border-radius:4px;font-weight:700;line-height:1">${n}</span>`;
const circ = (n) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:2.3rem;height:2.3rem;border:2px solid #475569;border-radius:50%;font-weight:700;line-height:1">${n}</span>`;
// Mũi tên có ghi phép tính ở trên ("+1 ⟶").
const ar = (op) => `<span style="display:inline-flex;flex-direction:column;align-items:center;line-height:1;vertical-align:middle;margin:0 2px"><span style="font-size:.85em">${op}</span><span style="font-size:1.3em">⟶</span></span>`;
// Phép cộng viết theo cột như sách: số trên, dấu + bên trái, số dưới, gạch ngang, kết quả.
// '...' ở vị trí nào thì ô trống ở đó.
const VROW = 'height:2.9rem;display:flex;align-items:center;justify-content:flex-end';
const vcol = (a, b, r) => `<span style="display:inline-flex;align-items:center;gap:4px;margin:0 14px 6px 0;vertical-align:middle;font-size:1.25rem"><span style="font-weight:700">+</span><span style="display:inline-flex;flex-direction:column;min-width:2.8rem;line-height:1"><span style="${VROW}">${a}</span><span style="${VROW};border-bottom:2px solid #475569">${b}</span><span style="${VROW}">${r}</span></span></span>`;
const icon = (src, alt) => `<img src="${src}" alt="${alt}" style="height:2.8rem;vertical-align:middle;margin-left:6px">`;
// Một mắt xích "① +1⟶ ☐" không bị ngắt dòng giữa chừng.
const link = (n, op) => `<span style="display:inline-flex;align-items:center;white-space:nowrap;margin:0 14px 6px 0">${circ(n)}${ar(op)}...</span>`;

// Một phép cộng có kết quả để trống ("2 + 1 = ...").
const add = (a, b) => ({ label: `${a} + ${b} = ...`, answer: String(a + b), boxes: true });
// Chỗ chấm trong phép cộng viết ngang ("4 = 3 + ...", "1 + 1 = ...").
const addDots = (a, b) => ({ label: `${a} + ${b} = ...`, answer: String(a + b) });

// Hai số có tổng bằng t, theo thứ tự nào cũng được ("3 = ... + ...", "... + ... = 4").
function sumToValidate(t) {
  return (value) => {
    const v = String(value).split(',').map(s => s.trim());
    return v.length === 2 && v.every(s => /^\d+$/.test(s)) && Number(v[0]) + Number(v[1]) === t;
  };
}
// "Viết phép tính thích hợp" (5 ô): a + b = c hoặc b + a = c (cả c = a + b).
function eqValidate(a, b, c) {
  const ok = new Set([`${a}+${b}=${c}`, `${b}+${a}=${c}`, `${c}=${a}+${b}`, `${c}=${b}+${a}`]);
  return (value) => ok.has(String(value).replace(/\s+/g, '').replace(/,/g, ''));
}
const eqBlank = (a, b, c) => ({
  label: '... ... ... ... ...', boxes: true, answer: `${a},+,${b},=,${c}`,
  validate: eqValidate(a, b, c),
});

export const BAI_24_28 = [
  // ── BÀI 24 (trang 28) ────────────────────────────────────────────────────
  {
    id: 'bai-24', number: 24, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill',
        q: '1. Số ?',
        blanks: [
          { label: `${sq(0)} → ${sq(1)} → ...`, answer: '2', boxes: true },
          { label: `... → ${circ(2)} → ${circ(3)}`, answer: '1', boxes: true },
          { label: `${sq(6)} → ... → ${sq(8)}`, answer: '7', boxes: true },
          { label: `... → ${sq(1)} → ... → ... → ... → ${sq(5)}`, answer: '0,2,3,4', boxes: true, validate: listValidate(['0', '2', '3', '4']) },
          { label: `... ← ${circ(9)} ← ... ← ${circ(7)}`, answer: '10,8', boxes: true, validate: listValidate(['10', '8']) },
        ],
        hints: ['Đi theo chiều mũi tên, mỗi lần thêm 1: 7, 8, 9, 10.'],
      },
      {
        type: 'compare',
        q: '2. > < = ?',
        rows: [
          { left: '8', right: '5', answer: '>' },
          { left: '3', right: '6', answer: '<' },
          { left: '10', right: '9', answer: '>' },
          { left: '2', right: '2', answer: '=' },
          { left: '0', right: '1', answer: '<' },
          { left: '4', right: '9', answer: '<' },
          { left: '7', right: '7', answer: '=' },
          { left: '9', right: '10', answer: '<' },
          { left: '0', right: '2', answer: '<' },
          { left: '1', right: '0', answer: '>' },
        ],
      },
      {
        type: 'fill',
        q: '3. Số ?',
        blanks: [
          { label: '... < 1', answer: '0', boxes: true },
          { label: '... > 9', answer: '10', boxes: true },
          { label: '6 < ... < 8', answer: '7', boxes: true },
        ],
        hints: ['Số nào bé hơn 1? Số nào lớn hơn 9? Số nào ở giữa 6 và 8?'],
      },
      {
        type: 'fill',
        q: '4. Viết các số 6, 2, 9, 4, 7 :',
        blanks: [
          { label: 'a) Theo thứ tự từ bé đến lớn: ...', answer: '2, 4, 6, 7, 9', validate: listValidate(['2', '4', '6', '7', '9']), tiles: ['6', '2', '9', '4', '7'] },
          { label: 'b) Theo thứ tự từ lớn đến bé: ...', answer: '9, 7, 6, 4, 2', validate: listValidate(['9', '7', '6', '4', '2']), tiles: ['6', '2', '9', '4', '7'] },
        ],
      },
      {
        type: 'fill', img: imgB24Shapes,
        q: '5. Điền số thích hợp vào ô trống :',
        blanks: [
          { label: 'a) Có mấy hình tam giác? ...', answer: '3', boxes: true },
          { label: 'b) Có mấy hình vuông? ...', answer: '5', boxes: true },
        ],
        hints: ['Đếm cả hình nhỏ và hình to ghép từ các hình nhỏ.'],
      },
    ],
  },

  // ── TỰ KIỂM TRA (trang 29) ───────────────────────────────────────────────
  {
    id: 'tu-kiem-tra', number: 'KT', title: 'Tự kiểm tra',
    questions: [
      {
        type: 'fill', img: imgKtFarm,
        q: '1. Số ?',
        blanks: [
          { label: `...${icon(icCow, 'bò')}`, answer: '4' },
          { label: `...${icon(icHorse, 'ngựa')}`, answer: '2' },
          { label: `...${icon(icPig, 'lợn')}`, answer: '3' },
          { label: `...${icon(icDuck, 'vịt')}`, answer: '10' },
          { label: `...${icon(icHen, 'gà')}`, answer: '8' },
          { label: `...${icon(icDog, 'chó')}`, answer: '0' },
        ],
        hints: ['Đếm từng loại con vật trong tranh. Loại nào không có trong tranh thì viết 0.'],
      },
      {
        type: 'table',
        q: '2. Số ?',
        tables: [
          { rows: [[0, 1, 2, blank(3), blank(4), 5]] },
          { rows: [[5, blank(6), 7, 8, blank(9)]] },
          { rows: [[blank(0), 1, 2]] },
          { rows: [[3, 2, 1, blank(0)]] },
          { rows: [[7, 6, blank(5), 4]] },
          { rows: [[blank(10), 9, blank(8), 7]] },
        ],
      },
      {
        type: 'compare',
        q: '3. > < = ?',
        rows: [
          { left: '0', right: '1', answer: '<' },
          { left: '7', right: '7', answer: '=' },
          { left: '10', right: '6', answer: '>' },
          { left: '8', right: '5', answer: '>' },
          { left: '3', right: '9', answer: '<' },
          { left: '4', right: '8', answer: '<' },
        ],
      },
      {
        type: 'fill', img: imgKtShapes,
        q: '4. Số ?',
        blanks: [
          { label: '... hình tam giác', answer: '2' },
          { label: '... hình vuông', answer: '5' },
        ],
        hints: ['Đếm cả hình to và hình nhỏ. Chỗ hai hình vuông chồng lên nhau cũng là một hình vuông nhỏ.'],
      },
    ],
  },

  // ── BÀI 25 (trang 30) ────────────────────────────────────────────────────
  {
    id: 'bai-25', number: 25, title: 'Phép cộng trong phạm vi 3',
    questions: [
      {
        type: 'fill',
        q: '1. Số ?',
        blanks: [
          add(1, 2),
          add(1, 1),
          { label: '3 = ... + ...', answer: '1,2', boxes: true, validate: sumToValidate(3) },
          add(2, 1),
          { label: '2 = 1 + ...', answer: '1', boxes: true },
          { label: '3 = ... + ...', answer: '2,1', boxes: true, validate: sumToValidate(3) },
        ],
      },
      {
        type: 'fill',
        q: '2. Viết số thích hợp vào chỗ chấm :',
        blanks: [
          {
            label: vcol(1, 1, '...') + vcol(2, 1, '...') + vcol(1, 2, '...') + vcol(1, '...', 2) + vcol('...', 2, 3) + vcol(2, '...', 3),
            answer: '2,3,3,1,1,1', boxes: true, validate: listValidate(['2', '3', '3', '1', '1', '1']),
          },
        ],
        hints: ['Cộng hai số ở trên gạch ngang. Ví dụ: 1 + ... = 2 thì số cần viết là 1.'],
      },
      {
        type: 'match',
        q: '3. Nối phép cộng với số thích hợp :',
        left: [{ id: 'a', text: '1 + 1' }, { id: 'b', text: '1 + 2' }, { id: 'c', text: '2 + 1' }],
        right: [{ id: 'n2', text: '2' }, { id: 'n3', text: '3' }, { id: 'n4', text: '4' }],
        pairs: [['a', 'n2'], ['b', 'n3'], ['c', 'n3']],
        hints: ['Có số được nối với hai phép cộng, có số không được nối.'],
      },
      {
        type: 'fill', img: imgB25Birds,
        q: '4. Viết phép tính thích hợp :',
        blanks: [eqBlank(1, 2, 3)],
        hints: ['Có 1 con chim, thêm 2 con chim. Có tất cả mấy con chim?'],
      },
    ],
  },

  // ── BÀI 26 (trang 31) ────────────────────────────────────────────────────
  {
    id: 'bai-26', number: 26, title: 'Luyện tập',
    questions: [
      {
        type: 'fill', img: imgB26Dogs, blanksAnyOrder: true,
        q: '1. a) Số ?',
        blanks: [
          { label: '... + ... = ...', answer: '1,2,3', boxes: true },
          { label: '... + ... = ...', answer: '2,1,3', boxes: true },
        ],
        hints: ['1 con chó và 2 con chó là 3 con chó. Viết hai phép cộng: đổi chỗ hai số.'],
      },
      {
        type: 'fill', img: imgB26Rabbits,
        q: '1. b) Viết dấu + vào ô trống :',
        blanks: [
          { label: '2 ... 1 = 3', answer: '+', boxes: true, validate: opsValidate(['+']), tiles: ['+', '−'] },
          { label: '1 ... 2 = 3', answer: '+', boxes: true, validate: opsValidate(['+']), tiles: ['+', '−'] },
        ],
      },
      {
        type: 'fill',
        q: '2. Viết số thích hợp vào chỗ chấm :',
        blanks: [
          {
            label: vcol(1, 1, '...') + vcol(2, 1, '...') + vcol(1, 2, '...') + vcol('...', 1, 2) + vcol(2, '...', 3) + vcol('...', 2, 3),
            answer: '2,3,3,1,1,1', boxes: true, validate: listValidate(['2', '3', '3', '1', '1', '1']),
          },
        ],
      },
      {
        type: 'fill',
        q: '3. Số ?',
        blanks: [
          { label: '1 + ... = 2', answer: '1', boxes: true },
          { label: '... + 1 = 3', answer: '2', boxes: true },
          { label: '3 = ... + 1', answer: '2', boxes: true },
          { label: '... + 1 = 2', answer: '1', boxes: true },
          { label: '2 + ... = 3', answer: '1', boxes: true },
          { label: '3 = 1 + ...', answer: '2', boxes: true },
          add(1, 1),
          add(2, 1),
          { label: '1 + 2 = 2 + ...', answer: '1', boxes: true },
        ],
      },
    ],
  },

  // ── BÀI 27 (trang 32) ────────────────────────────────────────────────────
  {
    id: 'bai-27', number: 27, title: 'Phép cộng trong phạm vi 4',
    questions: [
      {
        type: 'fill',
        q: '1. Viết số thích hợp vào chỗ chấm :',
        blanks: [
          addDots(2, 2), addDots(3, 1), addDots(1, 1),
          { label: '4 = 3 + ...', answer: '1' },
          { label: '4 = 1 + ...', answer: '3' },
          addDots(1, 3), addDots(2, 1), addDots(1, 2),
          { label: '4 = 2 + ...', answer: '2' },
          { label: '3 = 1 + ...', answer: '2' },
        ],
      },
      {
        type: 'fill',
        q: '2. Viết số thích hợp vào chỗ chấm :',
        blanks: [
          {
            label: vcol(2, 2, '...') + vcol(3, 1, '...') + vcol(1, 2, '...') + vcol(1, 3, '...'),
            answer: '4,4,3,4', boxes: true, validate: listValidate(['4', '4', '3', '4']),
          },
          {
            label: vcol(1, '...', 3) + vcol(3, '...', 4) + vcol(2, '...', 4) + vcol(1, '...', 4),
            answer: '2,1,2,3', boxes: true, validate: listValidate(['2', '1', '2', '3']),
          },
        ],
      },
      {
        type: 'compare',
        q: '3. > < = ?',
        rows: [
          { left: '3', right: '2 + 1', answer: '=' },
          { left: '3', right: '1 + 3', answer: '<' },
          { left: '3', right: '1 + 1', answer: '>' },
          { left: '1 + 2', right: '4', answer: '<' },
          { left: '3 + 1', right: '4', answer: '=' },
          { left: '2 + 2', right: '4', answer: '=' },
        ],
        hints: ['Tính phép cộng trước rồi mới so sánh hai số.'],
      },
      {
        type: 'fill', img: imgB27Ducks,
        q: '4. Viết phép tính thích hợp :',
        blanks: [eqBlank(3, 1, 4)],
        hints: ['Dưới ao có 3 con vịt, thêm 1 con vịt nữa đi xuống ao.'],
      },
      {
        type: 'fill',
        q: '5. Số ?',
        blanks: [{ label: '... + ... = 4', answer: '1,3', boxes: true, validate: sumToValidate(4) }],
        hints: ['Tìm hai số cộng lại bằng 4. Có nhiều cách viết đúng.'],
      },
    ],
  },

  // ── BÀI 28 (trang 33) ────────────────────────────────────────────────────
  {
    id: 'bai-28', number: 28, title: 'Luyện tập',
    questions: [
      {
        type: 'fill',
        q: '1. Tính :',
        blanks: [
          { ...addDots(1, 1), label: 'a) 1 + 1 = ...' }, addDots(1, 2), addDots(2, 2), addDots(1, 1),
          addDots(2, 1), addDots(1, 3), addDots(3, 1), addDots(1, 2),
          addDots(3, 1), addDots(1, 1), addDots(1, 3), addDots(2, 1),
          {
            label: 'b) ' + vcol(3, 1, '...') + vcol(2, 1, '...') + vcol(1, 1, '...') + vcol(2, 2, '...') + vcol(1, 2, '...') + vcol(1, 3, '...'),
            answer: '4,3,2,4,3,4', boxes: true, validate: listValidate(['4', '3', '2', '4', '3', '4']),
          },
        ],
      },
      {
        type: 'fill',
        q: '2. Viết số thích hợp vào ô trống :',
        blanks: [
          {
            label: link(1, '+1') + link(1, '+2') + link(3, '+1') + link(2, '+1'),
            answer: '2,3,4,3', boxes: true, validate: listValidate(['2', '3', '4', '3']),
          },
          {
            label: link(2, '+1') + link(2, '+2') + link(1, '+3') + link(1, '+2'),
            answer: '3,4,4,3', boxes: true, validate: listValidate(['3', '4', '4', '3']),
          },
        ],
        hints: ['Số trong vòng tròn cộng với số trên mũi tên: 1 + 1 = 2.'],
      },
      {
        type: 'fill',
        q: '3. Tính :',
        blanks: [
          { label: '1 + 1 + 2 = ...', answer: '4' },
          { label: '2 + 1 + 1 = ...', answer: '4' },
          { label: '1 + 2 + 1 = ...', answer: '4' },
        ],
        hints: ['Cộng hai số đầu trước, được bao nhiêu cộng tiếp số thứ ba.'],
      },
      {
        type: 'compare',
        q: '4. > < = ?',
        rows: [
          { left: '2 + 1', right: '4', answer: '<' },
          { left: '2 + 2', right: '4', answer: '=' },
          { left: '2 + 1', right: '3', answer: '=' },
          { left: '2 + 2', right: '3', answer: '>' },
          { left: '2 + 1', right: '1 + 3', answer: '<' },
          { left: '1 + 3', right: '3 + 1', answer: '=' },
        ],
      },
      {
        type: 'fill', img: imgB28Kids,
        q: '5. Viết phép tính thích hợp :',
        blanks: [eqBlank(2, 2, 4)],
        hints: ['Có 2 bạn đứng chờ, thêm 2 bạn chạy tới.'],
      },
    ],
  },
];
