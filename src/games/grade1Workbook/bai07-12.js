/**
 * Vở bài tập Toán 1 — Tập một: Bài 7–12 (sách trang 9–14).
 * Hình vẽ lại: scripts/redraw/g1_bai7.py, g1_bai8.py, g1_bai9.py, g1_bai10_12.py (bộ vẽ kit_l1_b.py).
 * Bỏ các dòng tập viết ("Viết số", "Viết dấu <", "Viết dấu >"): bé luyện trên giấy.
 */
import { blank, mau } from '../grade3Workbook.js';
import imgB7Birds from '../../assets/grade1-workbook/bai7_q1_birds.svg';
import imgB7Kid from '../../assets/grade1-workbook/bai7_q1_kid.svg';
import imgB7Horses from '../../assets/grade1-workbook/bai7_q1_horses.svg';
import imgB7Flowers from '../../assets/grade1-workbook/bai7_q1_flowers.svg';
import imgB7Paddles from '../../assets/grade1-workbook/bai7_q1_paddles.svg';
import imgB7Bike from '../../assets/grade1-workbook/bai7_q1_bike.svg';
import imgB7SplitA from '../../assets/grade1-workbook/bai7_q3_split_a.svg';
import imgB7SplitB from '../../assets/grade1-workbook/bai7_q3_split_b.svg';
import imgB8Bananas from '../../assets/grade1-workbook/bai8_q3_bananas.svg';
import imgB8Trees from '../../assets/grade1-workbook/bai8_q3_trees.svg';
import imgB8Pencils from '../../assets/grade1-workbook/bai8_q3_pencils.svg';
import imgB8Cars from '../../assets/grade1-workbook/bai8_q3_cars.svg';
import imgB8Dresses from '../../assets/grade1-workbook/bai8_q3_dresses.svg';
import imgB8Pineapple from '../../assets/grade1-workbook/bai8_q3_pineapple.svg';
import imgB8Boats from '../../assets/grade1-workbook/bai8_q3_boats.svg';
import imgB8Pots from '../../assets/grade1-workbook/bai8_q3_pots.svg';
import imgB8Cup from '../../assets/grade1-workbook/bai8_q4_cup.svg';
import imgB8Balls from '../../assets/grade1-workbook/bai8_q4_balls.svg';
import imgB8Ducks from '../../assets/grade1-workbook/bai8_q4_ducks.svg';
import imgB8Apples from '../../assets/grade1-workbook/bai8_q4_apples.svg';
import imgB8Flowers from '../../assets/grade1-workbook/bai8_q4_flowers.svg';
import imgB8Dice1 from '../../assets/grade1-workbook/bai8_q4_dice1.svg';
import imgB8Dice2 from '../../assets/grade1-workbook/bai8_q4_dice2.svg';
import imgB8Dice3 from '../../assets/grade1-workbook/bai8_q4_dice3.svg';
import imgB8Dice4 from '../../assets/grade1-workbook/bai8_q4_dice4.svg';
import imgB8Dice5 from '../../assets/grade1-workbook/bai8_q4_dice5.svg';
import imgB9Birds from '../../assets/grade1-workbook/bai9_q1_birds.svg';
import imgB9Kids from '../../assets/grade1-workbook/bai9_q1_kids.svg';
import imgB9Bikes from '../../assets/grade1-workbook/bai9_q1_bikes.svg';
import imgB9Caps from '../../assets/grade1-workbook/bai9_q1_caps.svg';
import imgB9Dogs from '../../assets/grade1-workbook/bai9_q1_dogs.svg';
import imgB9Shirts from '../../assets/grade1-workbook/bai9_q1_shirts.svg';
import imgB9DiceA from '../../assets/grade1-workbook/bai9_q2_dice_a.svg';
import imgB9DiceB from '../../assets/grade1-workbook/bai9_q2_dice_b.svg';
import imgB9DiceC from '../../assets/grade1-workbook/bai9_q2_dice_c.svg';
import imgB9DiceD from '../../assets/grade1-workbook/bai9_q2_dice_d.svg';
import imgB10DiceMau from '../../assets/grade1-workbook/bai10_q2_dice_mau.svg';
import imgB10DiceA from '../../assets/grade1-workbook/bai10_q2_dice_a.svg';
import imgB10DiceB from '../../assets/grade1-workbook/bai10_q2_dice_b.svg';
import imgB10DiceC from '../../assets/grade1-workbook/bai10_q2_dice_c.svg';
import imgB11TowersMau from '../../assets/grade1-workbook/bai11_q2_towers_mau.svg';
import imgB11TowersA from '../../assets/grade1-workbook/bai11_q2_towers_a.svg';
import imgB11TowersB from '../../assets/grade1-workbook/bai11_q2_towers_b.svg';
import imgB11TowersC from '../../assets/grade1-workbook/bai11_q2_towers_c.svg';
import imgB11DiceA from '../../assets/grade1-workbook/bai11_q2_dice_a.svg';
import imgB11DiceB from '../../assets/grade1-workbook/bai11_q2_dice_b.svg';
import imgB11DiceC from '../../assets/grade1-workbook/bai11_q2_dice_c.svg';
import imgB11DiceD from '../../assets/grade1-workbook/bai11_q2_dice_d.svg';
import imgB12RabbitsMau from '../../assets/grade1-workbook/bai12_q2_rabbits_mau.svg';
import imgB12Shapes from '../../assets/grade1-workbook/bai12_q2_shapes.svg';
import imgB12BikesKids from '../../assets/grade1-workbook/bai12_q2_bikes_kids.svg';
import imgB12CapsShirts from '../../assets/grade1-workbook/bai12_q2_caps_shirts.svg';

// ── Local helpers ───────────────────────────────────────────────────────────

// A picture printed in the answer row itself, right before its "ô trống".
const pic = (src, h = 110) => `<img src="${src}" alt="" style="height:${h}px;max-width:70vw;width:auto;vertical-align:middle;margin:4px 10px 4px 0">`;

// "Số ?" under one picture: one box for the count.
const countBlank = (src, n) => ({ label: `${pic(src)}...`, answer: String(n), boxes: true });

// The colored empty boxes drawn in a figure (Bài 7 Q3, Bài 9 Q2): a matching
// color chip sits before each answer box so the child knows which one it is.
const CHIP = { y: '#FFE08A', p: '#F9C6DD', b: '#BFE3F7' };
const chip = (c) => `<span style="display:inline-block;width:1.1em;height:1.1em;background:${CHIP[c]};border:2px solid #3F3A40;border-radius:4px;vertical-align:middle;margin:0 4px 0 10px"></span>`;
const chipBlank = (src, [y, p, b]) => ({
  label: `${pic(src, 150)}<span class="gw-line-break"></span>${chip('y')}...${chip('p')}...${chip('b')}...`,
  answer: `${y},${p},${b}`,
  boxes: true,
  validate: slotsValidate([y, p, b]),
});

// Exact value per box, in order (signs included: "2", "<", "5").
function slotsValidate(expected) {
  const want = expected.map(String);
  return (value) => {
    const got = String(value).split(',').map(s => s.trim().replace(/‹/g, '<').replace(/›/g, '>'));
    return got.length === want.length && got.every((v, i) => v === want[i]);
  };
}

// "Viết (theo mẫu)": three boxes "number sign number"; the keypad offers the
// numbers 1–5 and the three signs.
const CMP_TILES = ['1', '2', '3', '4', '5', '>', '<', '='];
const cmpBlank = (src, a, b, h = 110) => {
  const sign = a < b ? '<' : a > b ? '>' : '=';
  return { label: `${pic(src, h)}... ... ...`, answer: `${a},${sign},${b}`, boxes: true, tiles: CMP_TILES, validate: slotsValidate([a, sign, b]) };
};

// Bài 12 Q2: under each picture two groups of three boxes, written like the
// sample "4 > 3" and "3 < 4": both true comparisons of the two counts, in
// either order (the child may write "3 < 5" first).
function cmpBothValidate(x, y) {
  const fwd = `${x},${x > y ? '>' : '<'},${y}`;
  const back = `${y},${y > x ? '>' : '<'},${x}`;
  return (value) => {
    const v = String(value).split(',').map(s => s.trim());
    const a = v.slice(0, 3).join(','), b = v.slice(3).join(',');
    return (a === fwd && b === back) || (a === back && b === fwd);
  };
}
const cmpPairBlank = (src, top, bottom) => ({
  label: `${pic(src, 150)}<span class="gw-line-break"></span>... ... ...<span style="display:inline-block;width:1.5em"></span>... ... ...`,
  answer: `${top},${top > bottom ? '>' : '<'},${bottom},${bottom},${bottom > top ? '>' : '<'},${top}`,
  boxes: true, tiles: CMP_TILES, validate: cmpBothValidate(top, bottom),
});

// "Nối □ với số thích hợp": the book links the box to every fitting circled
// number; the child may write one fitting number or several (all must fit).
const NUM_TILES = ['1', '2', '3', '4', '5'];
function fitsValidate(ok) {
  const allowed = new Set(ok.map(String));
  return (value) => {
    const got = String(value).split(/[,;\s]+/).map(s => s.trim()).filter(Boolean);
    return got.length > 0 && new Set(got).size === got.length && got.every(v => allowed.has(v));
  };
}
const fitBlank = (left, sign) => {
  const ok = [1, 2, 3, 4, 5].filter(n => (sign === '<' ? left < n : left > n));
  return { label: `${left} ${sign === '<' ? '&lt;' : '&gt;'} ...`, answer: ok.join(', '), tiles: NUM_TILES, validate: fitsValidate(ok) };
};

const cmpRow = (a, b) => ({ left: String(a), right: String(b), answer: a < b ? '<' : a > b ? '>' : '=' });

export const BAI_7_12 = [
  // ── BÀI 7 (trang 9) ───────────────────────────────────────────────────────
  {
    id: 'bai-7', number: 7, title: 'Luyện tập',
    questions: [
      {
        type: 'fill',
        q: '1. Số ?',
        blanks: [
          countBlank(imgB7Birds, 2), countBlank(imgB7Kid, 1), countBlank(imgB7Horses, 3),
          countBlank(imgB7Flowers, 3), countBlank(imgB7Paddles, 2), countBlank(imgB7Bike, 1),
        ],
        hints: ['Chỉ tay vào từng hình và đếm: một, hai, ba.'],
      },
      {
        type: 'table',
        q: `2. Số ?<br>${mau('1 → 2 → 3')}`,
        blanksFirst: true,
        blanks: [
          { label: '1 → ... → 3', answer: '2', boxes: true },
          { label: '... → ... → 3', answer: '1,2', boxes: true, validate: slotsValidate([1, 2]) },
        ],
        rows: [
          { sample: true, cells: [1, 2, 3] },
          [1, 2, blank(3)],
          [3, blank(2), 1],
          [3, 2, blank(1)],
          [blank(3), 2, 1],
          [1, blank(2), 3],
        ],
        hints: ['Đếm xuôi: 1, 2, 3. Đếm ngược: 3, 2, 1.'],
      },
      {
        type: 'fill',
        q: '3. Số ?<br>Viết số vào ô cùng màu.',
        blanks: [chipBlank(imgB7SplitA, [1, 2, 1]), chipBlank(imgB7SplitB, [2, 3, 1])],
        hints: ['Ô nối với vòng nhỏ: đếm ô vuông trong vòng nhỏ đó. Ô nối với vòng to: đếm tất cả ô vuông.'],
      },
    ],
  },

  // ── BÀI 8 (trang 10) ──────────────────────────────────────────────────────
  {
    id: 'bai-8', number: 8, title: 'Các số 1, 2, 3, 4, 5',
    questions: [
      {
        type: 'table',
        q: '2. Số ?',
        rows: [
          [1, blank(2), 3, 4, blank(5)],
          [1, blank(2), 3, blank(4), blank(5)],
          [blank(1), 2, blank(3), blank(4), 5],
          [5, 4, blank(3), 2, blank(1)],
          [5, blank(4), blank(3), 2, blank(1)],
          [blank(5), 4, 3, blank(2), 1],
        ],
        hints: ['Đếm xuôi: 1, 2, 3, 4, 5. Đếm ngược: 5, 4, 3, 2, 1.'],
      },
      {
        type: 'fill',
        q: '3. Số ?',
        blanks: [
          countBlank(imgB8Bananas, 5), countBlank(imgB8Trees, 3), countBlank(imgB8Pencils, 4), countBlank(imgB8Cars, 2),
          countBlank(imgB8Dresses, 3), countBlank(imgB8Pineapple, 1), countBlank(imgB8Boats, 5), countBlank(imgB8Pots, 4),
        ],
        hints: ['Đếm từng hình, đếm xong hình nào thì nhớ hình đó.'],
      },
      {
        // The book's 3-column "nối": picture group → dice face → number; the
        // sample cup → 1 dot → 1 is drawn in ink (matchSample with two links).
        type: 'match',
        q: '4. Nối theo mẫu :',
        matchSample: [['cup', 'd1'], ['d1', 'n1']],
        left: [
          { id: 'cup', img: imgB8Cup },
          { id: 'balls', img: imgB8Balls },
          { id: 'ducks', img: imgB8Ducks },
          { id: 'apples', img: imgB8Apples },
          { id: 'flowers', img: imgB8Flowers },
        ],
        middle: [
          { id: 'd3', img: imgB8Dice3 },
          { id: 'd1', img: imgB8Dice1 },
          { id: 'd4', img: imgB8Dice4 },
          { id: 'd2', img: imgB8Dice2 },
          { id: 'd5', img: imgB8Dice5 },
        ],
        right: [
          { id: 'n1', text: '1' },
          { id: 'n2', text: '2' },
          { id: 'n3', text: '3' },
          { id: 'n4', text: '4' },
          { id: 'n5', text: '5' },
        ],
        pairs: [
          ['cup', 'd1'], ['d1', 'n1'],
          ['balls', 'd3'], ['d3', 'n3'],
          ['ducks', 'd2'], ['d2', 'n2'],
          ['apples', 'd5'], ['d5', 'n5'],
          ['flowers', 'd4'], ['d4', 'n4'],
        ],
        hints: ['Đếm số đồ vật, tìm mặt xúc xắc có số chấm bằng thế, rồi nối tiếp với số.'],
      },
    ],
  },

  // ── BÀI 9 (trang 11) ──────────────────────────────────────────────────────
  {
    id: 'bai-9', number: 9, title: 'Luyện tập',
    questions: [
      {
        type: 'fill',
        q: '1. Số ?',
        blanks: [
          countBlank(imgB9Birds, 4), countBlank(imgB9Kids, 5), countBlank(imgB9Bikes, 5),
          countBlank(imgB9Caps, 3), countBlank(imgB9Dogs, 2), countBlank(imgB9Shirts, 4),
        ],
        hints: ['Chỉ tay vào từng hình và đếm.'],
      },
      {
        type: 'fill',
        q: '2. Số ?<br>Viết số vào ô cùng màu.',
        blanks: [
          chipBlank(imgB9DiceA, [3, 4, 1]), chipBlank(imgB9DiceB, [2, 4, 2]),
          chipBlank(imgB9DiceC, [4, 5, 1]), chipBlank(imgB9DiceD, [3, 5, 2]),
        ],
        hints: ['Ô nối với một mặt xúc xắc: đếm chấm của mặt đó. Ô nối với cả vòng: đếm tất cả chấm.'],
      },
      {
        type: 'table',
        q: '3. Số ?',
        blanksFirst: true,
        blanks: [
          { label: '1 → 2 → ... → ... → 5', answer: '3,4', boxes: true, validate: slotsValidate([3, 4]) },
          { label: '1 → ... → 3 → ... → ...', answer: '2,4,5', boxes: true, validate: slotsValidate([2, 4, 5]) },
        ],
        rows: [
          [1, 2, blank(3), 4, blank(5)],
          [5, 4, blank(3), blank(2), blank(1)],
          [blank(1), blank(2), 3, blank(4), 5],
          [blank(5), 4, blank(3), 2, blank(1)],
        ],
        hints: ['Đếm xuôi: 1, 2, 3, 4, 5. Đếm ngược: 5, 4, 3, 2, 1.'],
      },
    ],
  },

  // ── BÀI 10 (trang 12) ─────────────────────────────────────────────────────
  {
    id: 'bai-10', number: 10, title: 'Bé hơn. Dấu <',
    questions: [
      {
        type: 'fill', img: imgB10DiceMau,
        q: '2. Viết (theo mẫu) :',
        blanks: [cmpBlank(imgB10DiceA, 2, 5, 90), cmpBlank(imgB10DiceB, 3, 4, 90), cmpBlank(imgB10DiceC, 1, 5, 90)],
        hints: ['Đếm chấm của mặt bên trái, viết số; viết dấu; rồi đếm chấm mặt bên phải. Mũi nhọn của dấu < chỉ vào số bé hơn.'],
      },
      {
        type: 'compare',
        q: '3. Viết dấu < vào ô trống :',
        rows: [cmpRow(1, 2), cmpRow(3, 5), cmpRow(3, 4), cmpRow(1, 4), cmpRow(1, 5), cmpRow(2, 4), cmpRow(2, 5), cmpRow(2, 3)],
      },
      {
        type: 'fill',
        q: '4. Nối □ với số thích hợp :<br>Viết vào ô các số thích hợp trong 1, 2, 3, 4, 5.',
        blanks: [fitBlank(1, '<'), fitBlank(2, '<'), fitBlank(3, '<'), fitBlank(4, '<')],
        hints: ['1 < □: □ là số lớn hơn 1. Có thể chọn nhiều số.'],
      },
    ],
  },

  // ── BÀI 11 (trang 13) ─────────────────────────────────────────────────────
  {
    id: 'bai-11', number: 11, title: 'Lớn hơn. Dấu >',
    questions: [
      {
        type: 'fill', img: imgB11TowersMau,
        q: '2. Viết (theo mẫu) :',
        blanks: [
          cmpBlank(imgB11TowersA, 5, 2, 120), cmpBlank(imgB11TowersB, 5, 3, 120), cmpBlank(imgB11TowersC, 3, 2, 120),
          cmpBlank(imgB11DiceA, 5, 4, 80), cmpBlank(imgB11DiceB, 4, 2, 80),
          cmpBlank(imgB11DiceC, 5, 1, 80), cmpBlank(imgB11DiceD, 4, 1, 80),
        ],
        hints: ['Đếm ô vuông (hay chấm) bên trái, viết số; viết dấu; rồi đếm bên phải. Miệng của dấu > mở về phía số lớn hơn.'],
      },
      {
        type: 'compare',
        q: '3. Viết dấu > vào ô trống :',
        rows: [cmpRow(2, 1), cmpRow(5, 4), cmpRow(4, 3), cmpRow(3, 2), cmpRow(4, 2), cmpRow(5, 1), cmpRow(5, 3), cmpRow(5, 2)],
      },
      {
        type: 'fill',
        q: '4. Nối □ với số thích hợp :<br>Viết vào ô các số thích hợp trong 1, 2, 3, 4, 5.',
        blanks: [fitBlank(2, '>'), fitBlank(3, '>'), fitBlank(4, '>'), fitBlank(5, '>')],
        hints: ['2 > □: □ là số bé hơn 2. Có thể chọn nhiều số.'],
      },
    ],
  },

  // ── BÀI 12 (trang 14) ─────────────────────────────────────────────────────
  {
    id: 'bai-12', number: 12, title: 'Luyện tập',
    questions: [
      {
        type: 'compare',
        q: '1. > < ?',
        rows: [
          cmpRow(3, 4), cmpRow(5, 2), cmpRow(1, 3), cmpRow(2, 4),
          cmpRow(4, 3), cmpRow(2, 5), cmpRow(3, 1), cmpRow(4, 2),
        ],
      },
      {
        type: 'fill', img: imgB12RabbitsMau,
        q: '2. Viết (theo mẫu) :',
        blanks: [
          cmpPairBlank(imgB12Shapes, 5, 3),
          cmpPairBlank(imgB12BikesKids, 5, 4),
          cmpPairBlank(imgB12CapsShirts, 3, 5),
        ],
        hints: ['Đếm hàng trên, đếm hàng dưới, rồi so sánh hai số. Viết hai cách như mẫu: 4 > 3 và 3 < 4.'],
      },
      {
        type: 'fill',
        q: '3. Nối □ với số thích hợp :<br>Viết vào ô các số thích hợp trong 1, 2, 3, 4, 5.',
        blanks: [fitBlank(1, '<'), fitBlank(2, '<'), fitBlank(4, '<'), fitBlank(2, '>'), fitBlank(3, '>'), fitBlank(5, '>')],
        hints: ['Có thể chọn nhiều số, mỗi số chọn phải đúng.'],
      },
    ],
  },
];
