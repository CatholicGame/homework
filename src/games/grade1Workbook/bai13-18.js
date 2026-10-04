/**
 * Vở bài tập Toán 1 — Tập một: Bài 13–18 (sách trang 15–20).
 * Hình vẽ lại bằng nét riêng: scripts/redraw/g1_bai13.py … g1_bai18.py (bộ vẽ kit_l1_c.py).
 * Bỏ các dòng tập viết ("Viết số", "Viết dấu =") vì bé luyện trên giấy.
 */
import { blank, listValidate, mau } from '../grade3Workbook.js';
import imgDice43 from '../../assets/grade1-workbook/bai13_q2_dice_43.svg';
import imgDice45 from '../../assets/grade1-workbook/bai13_q2_dice_45.svg';
import imgDice44 from '../../assets/grade1-workbook/bai13_q2_dice_44.svg';
import imgB13L1 from '../../assets/grade1-workbook/bai13_q4_left1.svg';
import imgB13L2 from '../../assets/grade1-workbook/bai13_q4_left2.svg';
import imgB13L3 from '../../assets/grade1-workbook/bai13_q4_left3.svg';
import imgB13R1 from '../../assets/grade1-workbook/bai13_q4_right1.svg';
import imgB13R2 from '../../assets/grade1-workbook/bai13_q4_right2.svg';
import imgB13R3 from '../../assets/grade1-workbook/bai13_q4_right3.svg';
import imgB14P1 from '../../assets/grade1-workbook/bai14_q2_panel1.svg';
import imgB14P2 from '../../assets/grade1-workbook/bai14_q2_panel2.svg';
import imgB14P3 from '../../assets/grade1-workbook/bai14_q2_panel3.svg';
import imgB14P4 from '../../assets/grade1-workbook/bai14_q2_panel4.svg';
import imgB14Groups from '../../assets/grade1-workbook/bai14_q3_groups.svg';
import imgB15A from '../../assets/grade1-workbook/bai15_q1_a_flowers.svg';
import imgB15B from '../../assets/grade1-workbook/bai15_q1_b_horses.svg';
import imgB15C from '../../assets/grade1-workbook/bai15_q1_c_ducks.svg';
import imgB16G1 from '../../assets/grade1-workbook/bai16_q2_group1.svg';
import imgB16G2 from '../../assets/grade1-workbook/bai16_q2_group2.svg';
import imgB16G3 from '../../assets/grade1-workbook/bai16_q2_group3.svg';
import imgB16Stairs from '../../assets/grade1-workbook/bai16_q3_stairs.svg';
import imgB17G1 from '../../assets/grade1-workbook/bai17_q2_group1.svg';
import imgB17G2 from '../../assets/grade1-workbook/bai17_q2_group2.svg';
import imgB17G3 from '../../assets/grade1-workbook/bai17_q2_group3.svg';
import imgB17Stairs from '../../assets/grade1-workbook/bai17_q3_stairs.svg';
import imgB18G1 from '../../assets/grade1-workbook/bai18_q2_group1.svg';
import imgB18G2 from '../../assets/grade1-workbook/bai18_q2_group2.svg';
import imgB18G3 from '../../assets/grade1-workbook/bai18_q2_group3.svg';
import imgB18G4 from '../../assets/grade1-workbook/bai18_q2_group4.svg';
import imgB18Kids from '../../assets/grade1-workbook/bai18_q3_kids.svg';

// ── Local helpers ───────────────────────────────────────────────────────────

// "4 > 3" written into three small boxes (number, sign, number).
const SIGN_TILES = ['1', '2', '3', '4', '5', '>', '<', '='];
const cmpBoxes = (img, a, sign, b, h = 52) => ({
  label: `<img src="${img}" alt="" style="height:${h}px;width:auto;vertical-align:middle;margin-right:10px"> ... ... ...`,
  boxes: true, tiles: SIGN_TILES,
  answer: `${a},${sign},${b}`,
  validate: (v) => String(v).replace(/[\s,]/g, '') === `${a}${sign}${b}`,
});

// "Nối ☐ với số thích hợp": the book links the box to every number that fits;
// one box holds one number, so any number that fits is right.
const anyOf = (ok) => (v) => {
  const parts = String(v).split(/[,;\s]+/).filter(Boolean);
  return parts.length > 0 && new Set(parts).size === parts.length && parts.every(p => ok.includes(p));
};

// "Số ?" under a pair of dice: left die, both dice together, right die. The
// picture's three strings end right above the three answer boxes: the picture
// is drawn 134px wide = three 2.6rem boxes with 0.3rem gaps.
const diceRow = (img, a, b) => ({
  label: `<span style="flex:0 0 100%;display:block;line-height:0"><img src="${img}" alt="" style="width:134px;height:auto;display:block"></span> ... ... ...`, boxes: true,
  answer: `${a},${a + b},${b}`, validate: listValidate([String(a), String(a + b), String(b)]),
});

// Compare rows, written column by column like the book.
const cmpRows = (pairs) => pairs.map(([l, r]) => ({ left: String(l), right: String(r), answer: l > r ? '>' : l < r ? '<' : '=' }));

// A number strip: numbers are printed, null is an empty box filled with its value.
const strip = (cells) => cells.map(([v, shown]) => (shown ? v : blank(v)));
const seqRow = (values, shownIdx) => strip(values.map((v, i) => [v, shownIdx.includes(i)]));
const range = (a, b) => (a <= b ? Array.from({ length: b - a + 1 }, (_, i) => a + i) : Array.from({ length: a - b + 1 }, (_, i) => a - i));

const CIRC = 'display:inline-flex;align-items:center;justify-content:center;width:1.7em;height:1.7em;margin:0 3px;border:2px solid #231F20;border-radius:999px;font-size:.9em;line-height:1;vertical-align:middle';
const circ = (...nums) => nums.map(n => `<span style="${CIRC}">${n}</span>`).join('');
// The staircase picture: drawn as n equal-width columns, shown 100% wide so each
// column of squares sits right above its answer box in the equal-column table.
// A picture on its own line inside a blank's label (drawn width w → shown at 72%).
const pic = (img, w) => `<span style="flex:0 0 100%;display:block;line-height:0;margin:4px 0"><img src="${img}" alt="" style="display:block;max-width:100%;width:${Math.round(w * 0.72)}px;height:auto"></span>`;
const stairs = (img) => `<img src="${img}" alt="" style="width:100%;height:auto;display:block">`;

export const BAI_13_18 = [
  // ── BÀI 13 (trang 15) ─────────────────────────────────────────────────────
  {
    id: 'bai-13', number: 13, title: 'Bằng nhau. Dấu =',
    questions: [
      {
        type: 'fill',
        q: `2. Viết (theo mẫu) :\n<img src="${imgDice43}" alt="" style="height:52px;width:auto;vertical-align:middle;margin-right:10px">${mau('4 &gt; 3 ; 3 &lt; 4')}`,
        blanksAnyOrder: true,
        blanks: [
          cmpBoxes(imgDice45, 4, '<', 5),
          cmpBoxes(imgDice45, 5, '>', 4),
          cmpBoxes(imgDice44, 4, '=', 4),
        ],
        hints: ['Đếm số chấm trên mỗi mặt xúc xắc, rồi viết dấu >, < hoặc = vào ô ở giữa.'],
      },
      {
        type: 'compare',
        q: '3. >, <, = ?',
        rows: cmpRows([[4, 5], [2, 2], [3, 1], [1, 4], [5, 2], [3, 3], [2, 3], [2, 4], [2, 5], [1, 1], [5, 1], [3, 5]]),
      },
      {
        type: 'match',
        q: '4. Làm cho bằng nhau (theo mẫu) :\nNối mỗi khung bên trái với một khung bên phải để số hình tròn bằng số hình tam giác.',
        left: [{ id: 'l1', img: imgB13L1 }, { id: 'l2', img: imgB13L2 }, { id: 'l3', img: imgB13L3 }],
        right: [{ id: 'r1', img: imgB13R1 }, { id: 'r2', img: imgB13R2 }, { id: 'r3', img: imgB13R3 }],
        pairs: [['l1', 'r3'], ['l2', 'r1'], ['l3', 'r2']],
        matchSample: ['l1', 'r3'],
        hints: ['Mẫu: khung trên có 3 hình tròn, 4 hình tam giác; thêm 2 hình tròn, 1 hình tam giác thì được 5 = 5.'],
      },
    ],
  },
  // ── BÀI 14 (trang 16) ─────────────────────────────────────────────────────
  {
    id: 'bai-14', number: 14, title: 'Luyện tập',
    questions: [
      {
        type: 'compare',
        q: '1. >, <, = ?',
        rows: cmpRows([[1, 2], [2, 2], [3, 2], [4, 3], [4, 4], [4, 5], [2, 3], [3, 5], [2, 5], [3, 4], [4, 5], [3, 5]]),
      },
      {
        type: 'fill',
        q: `2. Viết (theo mẫu) :
<img src="${imgB14P1}" alt="" style="height:96px;width:auto;vertical-align:middle;margin-right:10px">${mau('3 &gt; 2 ; 2 &lt; 3')}`,
        blanksAnyOrder: true,
        blanks: [
          cmpBoxes(imgB14P2, 4, '<', 5, 96),
          cmpBoxes(imgB14P2, 5, '>', 4, 96),
          cmpBoxes(imgB14P3, 3, '=', 3, 96),
          cmpBoxes(imgB14P4, 5, '=', 5, 96),
        ],
        hints: ['Mẫu: 3 con bướm, 2 bông hoa, nên viết 3 > 2 và 2 < 3. Đếm từng loại rồi so sánh.'],
      },
      {
        type: 'fill', img: imgB14Groups,
        q: '3. Làm cho bằng nhau (theo mẫu) :\nHình 1 và hình 3 ghép với hình nào?',
        blanks: [{
          label: 'Hình 1 ghép với ..., hình 3 ghép với ...',
          boxes: true, tiles: ['A', 'B', 'C'], answer: 'B,C',
          validate: (v) => ['B,C', 'C,B'].includes(String(v).replace(/\s/g, '').toUpperCase()),
        }],
        hints: ['Mẫu: hình A ghép với hình 2 được 3 ô tím, 3 ô trắng (3 = 3).', 'Đếm ô tím và ô trắng sau khi ghép: hai số phải bằng nhau.'],
      },
    ],
  },
  // ── BÀI 15 (trang 17) ─────────────────────────────────────────────────────
  {
    id: 'bai-15', number: 15, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill',
        q: '1. Làm cho bằng nhau (bằng cách : vẽ thêm hoặc gạch bớt) :',
        blanks: [
          { label: `a) ${pic(imgB15A, 460)} Vẽ thêm (hoặc gạch bớt) ... bông hoa.`, boxes: true, answer: '1' },
          { label: `b) ${pic(imgB15B, 700)} Vẽ thêm (hoặc gạch bớt) ... con ngựa.`, boxes: true, answer: '1' },
          { label: `c) ${pic(imgB15C, 700)} Vẽ thêm (hoặc gạch bớt) ... con vịt.`, boxes: true, answer: '1' },
        ],
        hints: ['Đếm hai bên. Bên ít hơn vẽ thêm, hoặc bên nhiều hơn gạch bớt, cho hai bên bằng nhau.'],
      },
      {
        type: 'fill',
        q: `2. Nối ☐ với số thích hợp :\nViết vào mỗi ô trống một số thích hợp trong các số ${circ(1, 2, 3)}.`,
        blanks: [
          { label: '... &lt; 2', boxes: true, tiles: ['1', '2', '3'], answer: '1', validate: anyOf(['1']) },
          { label: '... &lt; 3', boxes: true, tiles: ['1', '2', '3'], answer: '1', validate: anyOf(['1', '2']) },
          { label: '... &lt; 4', boxes: true, tiles: ['1', '2', '3'], answer: '1', validate: anyOf(['1', '2', '3']) },
        ],
        hints: ['Ô trống phải là số bé hơn số bên phải. Có ô có nhiều số đúng.'],
      },
      {
        type: 'fill',
        q: `3. Nối ☐ với số thích hợp :\nViết vào mỗi ô trống một số thích hợp trong các số ${circ(1, 2, 3, 4)}.`,
        blanks: [
          { label: '2 &gt; ...', boxes: true, tiles: ['1', '2', '3', '4'], answer: '1', validate: anyOf(['1']) },
          { label: '3 &gt; ...', boxes: true, tiles: ['1', '2', '3', '4'], answer: '1', validate: anyOf(['1', '2']) },
          { label: '4 &gt; ...', boxes: true, tiles: ['1', '2', '3', '4'], answer: '1', validate: anyOf(['1', '2', '3']) },
          { label: '5 &gt; ...', boxes: true, tiles: ['1', '2', '3', '4'], answer: '1', validate: anyOf(['1', '2', '3', '4']) },
        ],
        hints: ['Ô trống phải là số bé hơn số bên trái. Có ô có nhiều số đúng.'],
      },
    ],
  },
  // ── BÀI 16 (trang 18) ─────────────────────────────────────────────────────
  {
    id: 'bai-16', number: 16, title: 'Số 6',
    questions: [
      {
        type: 'fill',
        q: '2. Số ?',
        blanks: [diceRow(imgB16G1, 5, 1), diceRow(imgB16G2, 4, 2), diceRow(imgB16G3, 3, 3)],
        hints: ['Ô bên trái và ô bên phải: số chấm của từng mặt xúc xắc. Ô ở giữa: số chấm của cả hai mặt.'],
      },
      {
        type: 'table',
        q: '3. Viết số thích hợp vào ô trống :',
        tables: [
          { label: stairs(imgB16Stairs), rows: [range(1, 6).map(n => blank(n))] },
          {
            rows: [
              seqRow(range(1, 6), [0, 1, 5]),
              seqRow(range(1, 6), [1, 3]),
              seqRow(range(1, 6), [0, 4]),
              seqRow(range(6, 1), [0, 1, 3]),
              seqRow(range(6, 1), [0, 5]),
              seqRow(range(6, 1), [0, 4]),
            ],
          },
        ],
        hints: ['Đếm số ô vuông ở mỗi cột. Dãy số đếm thêm 1 (1, 2, 3…) hoặc bớt 1 (6, 5, 4…).'],
      },
      {
        type: 'compare',
        q: '4. >, <, = ?',
        rows: cmpRows([[6, 5], [6, 4], [6, 2], [3, 6], [6, 3], [6, 6], [6, 4], [4, 2], [6, 2], [3, 3], [3, 5], [3, 6]]),
      },
    ],
  },
  // ── BÀI 17 (trang 19) ─────────────────────────────────────────────────────
  {
    id: 'bai-17', number: 17, title: 'Số 7',
    questions: [
      {
        type: 'fill',
        q: '2. Số ?',
        blanks: [diceRow(imgB17G1, 6, 1), diceRow(imgB17G2, 5, 2), diceRow(imgB17G3, 4, 3)],
        hints: ['Ô bên trái và ô bên phải: số chấm của từng mặt xúc xắc. Ô ở giữa: số chấm của cả hai mặt.'],
      },
      {
        type: 'table',
        q: '3. Viết số thích hợp vào ô trống :',
        tables: [
          { label: stairs(imgB17Stairs), rows: [range(1, 7).map(n => blank(n))] },
          {
            rows: [
              seqRow(range(1, 7), [0, 2, 4, 6]),
              seqRow(range(1, 7), [1, 5]),
              seqRow(range(7, 1), [0, 1, 4]),
            ],
          },
        ],
        hints: ['Đếm số ô vuông ở mỗi cột. Dãy số đếm thêm 1 (1, 2, 3…) hoặc bớt 1 (7, 6, 5…).'],
      },
      {
        type: 'compare',
        q: '4. >, <, = ?',
        rows: cmpRows([[7, 6], [7, 4], [7, 2], [2, 5], [5, 7], [2, 7], [7, 3], [3, 1], [7, 1], [6, 6], [6, 7], [7, 7]]),
      },
    ],
  },
  // ── BÀI 18 (trang 20) ─────────────────────────────────────────────────────
  {
    id: 'bai-18', number: 18, title: 'Số 8',
    questions: [
      {
        type: 'fill',
        q: '2. Số ?',
        blanks: [diceRow(imgB18G1, 7, 1), diceRow(imgB18G2, 6, 2), diceRow(imgB18G3, 5, 3), diceRow(imgB18G4, 4, 4)],
        hints: ['Ô bên trái và ô bên phải: số chấm của từng mặt xúc xắc. Ô ở giữa: số chấm của cả hai mặt.'],
      },
      {
        type: 'fill', img: imgB18Kids,
        q: '3. Viết số thích hợp vào ☐ rồi đọc các số đó :',
        blanks: [{ label: '1, 2, ..., ..., ..., 6, ..., ...', boxes: true, answer: '3,4,5,7,8', validate: listValidate(['3', '4', '5', '7', '8']) }],
        hints: ['Các bạn đứng theo thứ tự đếm: 1, 2, 3…'],
      },
      {
        type: 'compare',
        q: '4. >, <, = ?',
        rows: cmpRows([[7, 8], [8, 7], [8, 8], [4, 8], [8, 4], [4, 4], [8, 5], [5, 4], [8, 4], [1, 6], [6, 8], [1, 8]]),
      },
    ],
  },
];
