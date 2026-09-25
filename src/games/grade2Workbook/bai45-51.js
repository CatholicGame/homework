/**
 * Vở bài tập Toán 2 — Tập hai: Bài 45–51 (sách trang 24–50).
 */
import {
  blank, foldVN, stripVN, setValidate, listValidate, dsValidate, phraseValidate,
  swapPairValidate, unitValidate, sampleCell, mau,
} from '../grade3Workbook.js';
import imgB45Bananas from '../../assets/grade2-workbook/bai45_t1_q1_bananas.png';
import imgB45Oranges from '../../assets/grade2-workbook/bai45_t1_q1_oranges.png';
import imgB45Apples from '../../assets/grade2-workbook/bai45_t1_q1_apples.png';
import imgB45Pears from '../../assets/grade2-workbook/bai45_t1_q1_pears.png';
import imgB45T1Q4 from '../../assets/grade2-workbook/bai45_t1_q4_flow.svg';
import imgB45T1Q5 from '../../assets/grade2-workbook/bai45_t1_q5_triangles.svg';
import imgB45T2Q4 from '../../assets/grade2-workbook/bai45_t2_q4_flow.svg';
import imgB45T3Q3 from '../../assets/grade2-workbook/bai45_t3_q3_flow.svg';
import imgB45T4Q3 from '../../assets/grade2-workbook/bai45_t4_q3_flow.svg';
import imgB45T4Q4 from '../../assets/grade2-workbook/bai45_t4_q4_cupcakes.png';
import imgB45T5Q3 from '../../assets/grade2-workbook/bai45_t5_q3_flow.svg';
import imgB46T1Q1 from '../../assets/grade2-workbook/bai46_t1_q1_solids.png';
import imgB46Lantern from '../../assets/grade2-workbook/bai46_t1_q2_lantern.png';
import imgB46Orange from '../../assets/grade2-workbook/bai46_t1_q2_orange.png';
import imgB46Can from '../../assets/grade2-workbook/bai46_t1_q2_can.png';
import imgB46Globe from '../../assets/grade2-workbook/bai46_t1_q2_globe.png';
import imgB46Ball from '../../assets/grade2-workbook/bai46_t1_q2_ball.png';
import imgB46Battery from '../../assets/grade2-workbook/bai46_t1_q2_battery.png';
import imgB46T1Q3 from '../../assets/grade2-workbook/bai46_t1_q3_clown.png';
import imgB46T1Q4 from '../../assets/grade2-workbook/bai46_t1_q4_robots.png';
import imgB46T2Q1 from '../../assets/grade2-workbook/bai46_t2_q1_table.png';
import imgB46T2Q2 from '../../assets/grade2-workbook/bai46_t2_q2_pattern.png';
import imgB46P1 from '../../assets/grade2-workbook/bai46_t2_q3_p1.png';
import imgB46P2 from '../../assets/grade2-workbook/bai46_t2_q3_p2.png';
import imgB46P3 from '../../assets/grade2-workbook/bai46_t2_q3_p3.png';
import imgB46P4 from '../../assets/grade2-workbook/bai46_t2_q3_p4.png';
import imgB46P5 from '../../assets/grade2-workbook/bai46_t2_q3_p5.png';
import imgB46P6 from '../../assets/grade2-workbook/bai46_t2_q3_p6.png';
import imgB46T2Q4 from '../../assets/grade2-workbook/bai46_t2_q4_cans.png';
import imgB47T1Q1 from '../../assets/grade2-workbook/bai47_t1_q1_farm.png';
import imgB47T1Q2 from '../../assets/grade2-workbook/bai47_t1_q2_discs.png';
import imgB47T1Q3 from '../../assets/grade2-workbook/bai47_t1_q3_pattern.png';
import imgB47T1Q4 from '../../assets/grade2-workbook/bai47_t1_q4_snowman.png';
import imgB47Basketball from '../../assets/grade2-workbook/bai47_t2_q1_basketball.png';
import imgB47Milk from '../../assets/grade2-workbook/bai47_t2_q1_milk.png';
import imgB47Orange from '../../assets/grade2-workbook/bai47_t2_q1_orange.png';
import imgB47Cube from '../../assets/grade2-workbook/bai47_t2_q1_cube.png';
import imgB47Gift from '../../assets/grade2-workbook/bai47_t2_q1_gift.png';
import imgB47T2Q2 from '../../assets/grade2-workbook/bai47_t2_q2_nest.png';
import imgB47T2Q3 from '../../assets/grade2-workbook/bai47_t2_q3_elephant.png';
import imgB47T2Q4 from '../../assets/grade2-workbook/bai47_t2_q4_clocks.png';
import imgB48T1Q1 from '../../assets/grade2-workbook/bai48_t1_q1_blocks.svg';
import imgB48T1Q2 from '../../assets/grade2-workbook/bai48_t1_q2_blocks.svg';
import imgB48Blocks53 from '../../assets/grade2-workbook/bai48_t1_q3_53.svg';
import imgB48Blocks62 from '../../assets/grade2-workbook/bai48_t1_q3_62.svg';
import imgB48Blocks35 from '../../assets/grade2-workbook/bai48_t1_q3_35.svg';
import imgB48Blocks26 from '../../assets/grade2-workbook/bai48_t1_q3_26.svg';
import imgB48T2Q1 from '../../assets/grade2-workbook/bai48_t2_q1_trays.png';
import imgB48T2Q2 from '../../assets/grade2-workbook/bai48_t2_q2_bags.png';
import imgB49T1Q1 from '../../assets/grade2-workbook/bai49_t1_q1_numberline.svg';
import imgB49T1Q2 from '../../assets/grade2-workbook/bai49_t1_q2_cups.png';
import imgB49T1Q3 from '../../assets/grade2-workbook/bai49_t1_q3_bags.png';
import imgB49T1Q4 from '../../assets/grade2-workbook/bai49_t1_q4_sacks.png';
import imgB49T2Q2 from '../../assets/grade2-workbook/bai49_t2_q2_shelf.png';
import imgB49T2Q3 from '../../assets/grade2-workbook/bai49_t2_q3_cupcakes.png';
import imgB50T1Q4 from '../../assets/grade2-workbook/bai50_t1_q4_matches.svg';
import imgB50T2Q3 from '../../assets/grade2-workbook/bai50_t2_q3_train.png';
import imgB50T2Q4 from '../../assets/grade2-workbook/bai50_t2_q4_cows.png';
import imgB51T3Q1 from '../../assets/grade2-workbook/bai51_t3_q1_hedgehog.png';

// "Viết tích thành tổng rồi tính" (Bài 45 Tiết 4 Q2): one dotted line after
// "9 × 3 =", written like the book's Mẫu: "9 + 9 + 9 = 27" (the first factor
// repeated as many times as the second factor says, then the value). A
// trailing "Vậy 9 × 3 = 27." copied from the Mẫu is accepted too; spacing and
// x/* for × don't matter.
function productSumValidate(a, b) {
  const target = Array(b).fill(String(a)).join('+') + '=' + (a * b);
  const tail = `vay${a}x${b}=${a * b}`;
  return (value) => {
    const v = stripVN(value).replace(/\s+/g, '').replace(/[×*]/g, 'x').replace(/[.;,]/g, '').replace(/^=/, '');
    return v === target || v === target + tail;
  };
}

// "1 000" may be typed with a thousands space/dot ("1 000", "1.000", "1000") — the
// only 4-digit number in these lessons, so a space between two 3-digit numbers
// in a list ("400 600") is never joined.
const joinThousands = (s) => String(s).replace(/\b1[\s.]000\b/g, '1000');
const bigNum = (n) => blank(String(n), { validate: (v) => joinThousands(v).trim() === String(n) });

// An unordered list of numbers in one blank ("400, 600, 1 000, 200", "200 400 600 1000").
function numSetValidate(nums) {
  const target = nums.map(String).sort().join('|');
  return (value) => (joinThousands(value).match(/\d+/g) || []).sort().join('|') === target;
}

// "4 giờ 30 phút" in a table cell: also "4 giờ 30", "4:30", "4 giờ rưỡi".
function timeValidate(h, m) {
  return (value) => {
    const v = stripVN(value);
    const nums = (v.match(/\d+/g) || []).map(Number);
    if (m === 30 && /ruoi/.test(v) && nums.length === 1 && nums[0] === h) return true;
    return nums.length === 2 && nums[0] === h && nums[1] === m;
  };
}

// A number read out in words ("bảy trăm sáu mươi tư" = "... sáu mươi bốn").
function readValidate(words) {
  const norm = (s) => foldVN(s).replace(/[.,]/g, '').replace(/mươi tư/g, 'mươi bốn');
  const target = norm(words);
  return (value) => norm(value) === target;
}
const readCell = (words) => blank(words, { validate: readValidate(words) });

// The small blue number cards of Bài 51 Tiết 3 Q3.
const card = (d) => `<b class="gw-sample-text" style="display:inline-block;min-width:1.3em;text-align:center;background:#B8E5FC;border:1.5px solid #00AEEF;border-radius:5px;padding:0 3px">${d}</b>`;

// A small instruction table printed inside the question text (Bài 51 "Tô màu").
const infoTable = (head, rows) => `<table class="gw-table" style="width:auto;margin:6px 0"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;

const COLORS = ['Đỏ', 'Xanh', 'Vàng', 'Da cam'];
const nums1to10 = Array.from({ length: 10 }, (_, i) => ({ id: `n${i + 1}`, text: String(i + 1) }));

export const BAI_45_51 = [
  // ── BÀI 45 (trang 24–30) ──────────────────────────────────────────────────
  {
    id: 'bai-45', number: 45, title: 'Luyện tập chung',
    questions: [
      {
        type: 'match', section: 'Tiết 1',
        q: '1. Nối mỗi hình với phép nhân thích hợp (theo mẫu).',
        left: [
          { id: 'bananas', img: imgB45Bananas }, { id: 'oranges', img: imgB45Oranges },
          { id: 'apples', img: imgB45Apples }, { id: 'pears', img: imgB45Pears },
        ],
        right: [
          { id: 'e15', text: '5 × 3 = 15' }, { id: 'e6', text: '3 × 2 = 6' },
          { id: 'e8', text: '2 × 4 = 8' }, { id: 'e20', text: '4 × 5 = 20' },
        ],
        pairs: [['bananas', 'e8'], ['oranges', 'e15'], ['apples', 'e20'], ['pears', 'e6']],
        hints: ['Mẫu: 4 đĩa, mỗi đĩa 2 quả chuối → 2 × 4 = 8. Đếm số đĩa và số quả trên mỗi đĩa.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Tính nhẩm.',
        blanks: [
          { label: 'a) 2 × 5 = ...', answer: '10' }, { label: '2 × 3 = ...', answer: '6' },
          { label: '5 × 9 = ...', answer: '45' }, { label: '5 × 2 = ...', answer: '10' },
          { label: '2 × 6 = ...', answer: '12' }, { label: '2 × 10 = ...', answer: '20' },
          { label: '5 × 7 = ...', answer: '35' }, { label: '5 × 10 = ...', answer: '50' },
          { label: 'b) 8 : 2 = ...', answer: '4' }, { label: '16 : 2 = ...', answer: '8' },
          { label: '10 : 5 = ...', answer: '2' }, { label: '35 : 5 = ...', answer: '7' },
          { label: '10 : 2 = ...', answer: '5' }, { label: '20 : 2 = ...', answer: '10' },
          { label: '25 : 5 = ...', answer: '5' }, { label: '50 : 5 = ...', answer: '10' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '3. Mỗi hộp có 5 cái bánh. Hỏi 6 hộp như vậy có bao nhiêu cái bánh?',
        blanks: [{ label: 'Số cái bánh', answer: '30' }],
        hints: ['Lấy 5 cái bánh nhân với 6.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB45T1Q4,
        q: '4. Số?\n(Câu a: 10 : 5 × 7 = 14.)',
        blanks: [
          { label: 'a) Ô vuông: ...', answer: '2' },
          { label: 'Hình tam giác: ...', answer: '14' },
          { label: 'b) Ô vuông: ...', answer: '20' },
          { label: 'Hình tam giác: ...', answer: '10' },
          { label: '5 × 4 : 2 = ...', answer: '10' },
          { label: 'c) Ô vuông: ...', answer: '10' },
          { label: 'Hình tam giác: ...', answer: '10' },
          { label: '2 × 5 × 1 = ...', answer: '10' },
        ],
        hints: ['Làm theo chiều mũi tên: 10 : 5 = 2, rồi 2 × 7 = 14.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB45T1Q5,
        q: '5. Số?\n(Số ở giữa mỗi hình tam giác bằng tích ba số ở ba đỉnh: 2 × 2 × 1 = 4; 5 × 1 × 2 = 10.)',
        blanks: [{ label: 'Số ở giữa hình tam giác thứ ba: ...', answer: '5' }],
        hints: ['1 × 5 × 1 = ?'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Số?\n(Đi từ Xuất phát đến Đích.)',
        blanks: [
          { label: '5 × 3 = ...', answer: '15' }, { label: '8 : 2 = ...', answer: '4' },
          { label: '2 × 4 = ...', answer: '8' }, { label: '25 : 5 = ...', answer: '5' },
          { label: '2 × 8 = ...', answer: '16' }, { label: '14 : 2 = ...', answer: '7' },
          { label: '5 × 8 = ...', answer: '40' }, { label: '45 : 5 = ...', answer: '9' },
          { label: '12 : 2 = ...', answer: '6' }, { label: '2 × 9 = ...', answer: '18' },
          { label: '50 : 5 = ...', answer: '10' }, { label: '2 × 7 = ...', answer: '14' },
          { label: '5 × 6 = ...', answer: '30' },
        ],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. a) Nối để tìm chuồng cho mỗi con chim (theo mẫu).',
        left: [
          { id: 'b1', text: '🐦 4 : 2' }, { id: 'b2', text: '🐦 2 × 1' }, { id: 'b3', text: '🐦 14 : 2' },
          { id: 'b4', text: '🐦 20 : 2' }, { id: 'b5', text: '🐦 15 : 5' }, { id: 'b6', text: '🐦 20 : 5' },
          { id: 'b7', text: '🐦 5 × 2' }, { id: 'b8', text: '🐦 35 : 5' },
        ],
        right: [
          { id: 'h2', text: '🏠 2' }, { id: 'h4', text: '🏠 4' }, { id: 'h3', text: '🏠 3' },
          { id: 'h7', text: '🏠 7' }, { id: 'h10', text: '🏠 10' },
        ],
        pairs: [['b1', 'h2'], ['b2', 'h2'], ['b3', 'h7'], ['b4', 'h10'], ['b5', 'h3'], ['b6', 'h4'], ['b7', 'h10'], ['b8', 'h7']],
        hints: ['Mẫu: 2 × 1 = 2 nên con chim đó về chuồng số 2.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. b) Viết tiếp vào chỗ chấm cho thích hợp.\n(Các con chim: 4 : 2; 15 : 5; 2 × 1; 20 : 5; 14 : 2; 5 × 2; 20 : 2; 35 : 5. Các chuồng: 2, 4, 3, 7, 10.)',
        blanks: [{ label: 'Những chuồng ghi số ... là chuồng của 2 con chim.', answer: '2, 7, 10', validate: setValidate(['2', '7', '10']) }],
        hints: ['Tính kết quả trên mỗi con chim rồi đếm xem chuồng nào có 2 con.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '3. Bạn Mai xếp 25 cái bánh vào các hộp, mỗi hộp 5 cái bánh. Hỏi Mai xếp được mấy hộp bánh như vậy?',
        blanks: [{ label: 'Số hộp bánh', answer: '5' }],
        hints: ['Lấy 25 chia cho 5.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB45T2Q4,
        q: '4. Số?',
        blanks: [
          { label: 'a) Ô vuông: ...', answer: '20' },
          { label: 'Hình tam giác: ...', answer: '4' },
          { label: 'b) Ô vuông: ...', answer: '5' },
          { label: 'Hình tam giác: ...', answer: '45' },
        ],
        hints: ['Làm theo chiều mũi tên: 2 × 10 = 20, rồi 20 : 5 = ...'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '5. >; <; = ?',
        rows: [
          { left: 'a) 5 × 2', right: '9', answer: '>' },
          { left: '2 × 3', right: '7', answer: '<' },
          { left: 'b) 7', right: '12 : 2', answer: '>' },
          { left: '4', right: '20 : 5', answer: '=' },
          { left: 'c) 2 × 2', right: '10 : 2', answer: '<' },
          { left: '40 : 5', right: '2 × 6', answer: '<' },
        ],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '1. Mỗi con bướm sẽ đậu vào bông hoa ghi số là kết quả phép tính trên con bướm đó.\na) Nối mỗi con bướm với bông hoa thích hợp (theo mẫu).',
        left: [
          { id: 'u1', text: '🦋 5 × 1' }, { id: 'u2', text: '🦋 4 : 2' }, { id: 'u3', text: '🦋 25 : 5' },
          { id: 'u4', text: '🦋 15 : 5' }, { id: 'u5', text: '🦋 10 : 2' }, { id: 'u6', text: '🦋 10 : 5' },
          { id: 'u7', text: '🦋 6 : 2' },
        ],
        right: [{ id: 'f5', text: '🌼 5' }, { id: 'f2', text: '🌼 2' }, { id: 'f3', text: '🌼 3' }],
        pairs: [['u1', 'f5'], ['u2', 'f2'], ['u3', 'f5'], ['u4', 'f3'], ['u5', 'f5'], ['u6', 'f2'], ['u7', 'f3']],
        hints: ['Mẫu: 5 × 1 = 5 nên con bướm đó đậu vào bông hoa số 5.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. b) Số?\n(Các con bướm: 5 × 1; 4 : 2; 25 : 5; 15 : 5; 10 : 2; 10 : 5; 6 : 2. Các bông hoa: 5, 2, 3.)',
        blanks: [{ label: 'Bông hoa ghi số ... có nhiều bướm đậu nhất.', answer: '5' }],
        hints: ['Đếm số con bướm đậu vào mỗi bông hoa.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Số?',
        blanks: [
          { label: 'a) 5 × ... = 5', answer: '1' }, { label: '... × 1 = 2', answer: '2' },
          { label: 'b) 4 : ... = 2', answer: '2' }, { label: '10 : ... = 2', answer: '5' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB45T3Q3,
        q: '3. Số?',
        blanks: [
          { label: 'a) Hình thoi: ...', answer: '10' },
          { label: 'Hình tam giác: ...', answer: '5' },
          { label: 'Ô vuông: ...', answer: '35' },
          { label: 'b) Hình thoi: ...', answer: '8' },
          { label: 'Hình tam giác: ...', answer: '4' },
          { label: 'Ô vuông: ...', answer: '2' },
        ],
        hints: ['Làm theo chiều mũi tên: 2 × 5 = 10, 10 : 2 = 5, 5 × 7 = ...'],
      },
      {
        type: 'compare', section: 'Tiết 3',
        q: '4. >; <; = ?',
        rows: [
          { left: 'a) 5 × 3', right: '15', answer: '=' },
          { left: '10 : 2', right: '6', answer: '<' },
          { left: 'b) 12 : 2', right: '35 : 5', answer: '<' },
          { left: '2 × 4', right: '30 : 5', answer: '>' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '5. Số?',
        blanks: [
          { label: 'a) 2 × 5 = 5 × ...', answer: '2' },
          { label: 'b) 5 × 2 = 2 × ...', answer: '5' },
        ],
        hints: ['Đổi chỗ các thừa số thì tích không thay đổi.'],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '1. Tính nhẩm.',
        blanks: [
          { label: 'a) 2 × 4 = ...', answer: '8' }, { label: '8 : 2 = ...', answer: '4' }, { label: '8 : 4 = ...', answer: '2' },
          { label: 'b) 5 × 8 = ...', answer: '40' }, { label: '40 : 5 = ...', answer: '8' }, { label: '40 : 8 = ...', answer: '5' },
          { label: 'c) 2 × 7 = ...', answer: '14' }, { label: '14 : 2 = ...', answer: '7' }, { label: '14 : 7 = ...', answer: '2' },
          { label: 'd) 5 × 9 = ...', answer: '45' }, { label: '45 : 5 = ...', answer: '9' }, { label: '45 : 9 = ...', answer: '5' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: `2. Viết tích thành tổng rồi tính (theo mẫu).\n${mau('7 × 4 = 7 + 7 + 7 + 7 = 28. Vậy 7 × 4 = 28.')}`,
        blanks: [
          { label: 'a) 9 × 3 = ...', answer: '9 + 9 + 9 = 27', validate: productSumValidate(9, 3) },
          { label: 'b) 4 × 6 = ...', answer: '4 + 4 + 4 + 4 + 4 + 4 = 24', validate: productSumValidate(4, 6) },
          { label: 'c) 6 × 4 = ...', answer: '6 + 6 + 6 + 6 = 24', validate: productSumValidate(6, 4) },
        ],
        hints: ['9 × 3 là 9 được lấy 3 lần: 9 + 9 + 9 = ...'],
      },
      {
        type: 'fill', section: 'Tiết 4', img: imgB45T4Q3,
        q: '3. Số?\n(Câu a: 5 × 7 + 8 = 43.)',
        blanks: [
          { label: 'a) Ô vuông: ...', answer: '35' },
          { label: 'Hình tam giác: ...', answer: '43' },
          { label: 'b) Ô vuông: ...', answer: '16' },
          { label: 'Hình tam giác: ...', answer: '7' },
          { label: '2 × 8 − 9 = ...', answer: '7' },
          { label: 'c) Ô vuông: ...', answer: '5' },
          { label: 'Hình tam giác: ...', answer: '11' },
          { label: '25 : 5 + 6 = ...', answer: '11' },
        ],
        hints: ['Làm theo chiều mũi tên: 2 × 8 = 16, rồi 16 − 9 = ...'],
      },
      {
        type: 'fill', section: 'Tiết 4', wordProblem: true, img: imgB45T4Q4,
        q: '4. Mỗi đĩa có 5 cái bánh kem. Hỏi 8 đĩa như vậy có bao nhiêu cái bánh kem?',
        blanks: [{ label: 'Số cái bánh kem', answer: '40' }],
        hints: ['Lấy 5 cái bánh nhân với 8.'],
      },
      {
        type: 'match', section: 'Tiết 4',
        q: '5. Nối ô trống với số thích hợp (theo mẫu).',
        left: nums1to10,
        right: [{ id: 'ra', text: 'a) 2 × ☐ < 10' }, { id: 'rb', text: 'b) 5 × ☐ > 30' }],
        pairs: [['n1', 'ra'], ['n2', 'ra'], ['n3', 'ra'], ['n4', 'ra'], ['n7', 'rb'], ['n8', 'rb'], ['n9', 'rb'], ['n10', 'rb']],
        hints: ['Mẫu: 2 × 1 = 2 < 10. Thử từng số: 2 × 5 = 10 không bé hơn 10; 5 × 6 = 30 không lớn hơn 30.'],
      },
      {
        type: 'table', section: 'Tiết 5',
        q: '1. Số?',
        tables: [
          {
            label: 'a)',
            rows: [
              ['Thừa số', sampleCell(2), 5, 2, 5, 2, 5],
              ['Thừa số', sampleCell(4), 5, 6, 2, 8, 7],
              ['Tích', sampleCell(8), blank(25), blank(12), blank(10), blank(16), blank(35)],
            ],
          },
          {
            label: 'b)',
            rows: [
              ['Số bị chia', sampleCell(10), 20, 16, 45, 14, 40],
              ['Số chia', sampleCell(2), 5, 2, 5, 2, 5],
              ['Thương', sampleCell(5), blank(4), blank(8), blank(9), blank(7), blank(8)],
            ],
          },
        ],
      },
      {
        type: 'fill', section: 'Tiết 5', wordProblem: true,
        q: '2. Mẹ mua về 14 bông hoa, mẹ cắm đều vào 2 bình hoa. Hỏi mỗi bình có mấy bông hoa?',
        blanks: [{ label: 'Số bông hoa mỗi bình', answer: '7' }],
        hints: ['Lấy 14 chia cho 2.'],
      },
      {
        type: 'fill', section: 'Tiết 5', img: imgB45T5Q3,
        q: '3. Số?',
        blanks: [
          { label: 'a) Ô vuông: ...', answer: '20' },
          { label: 'Hình thoi: ...', answer: '10' },
          { label: '5 × 4 : 2 = ...', answer: '10' },
          { label: 'b) Ô vuông: ...', answer: '2' },
          { label: 'Hình thoi: ...', answer: '18' },
          { label: '10 : 5 × 9 = ...', answer: '18' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 5',
        q: '4. Số?',
        blanks: [
          { label: 'a) 5 × ... = 10', answer: '2' }, { label: '2 × ... = 10', answer: '5' }, { label: '2 × ... = 12', answer: '6' },
          { label: 'b) 12 : ... = 6', answer: '2' }, { label: '10 : ... = 2', answer: '5' }, { label: '25 : ... = 5', answer: '5' },
        ],
      },
      {
        type: 'match', section: 'Tiết 5',
        q: '5. Nối ô trống với số thích hợp (theo mẫu).',
        left: nums1to10,
        right: [{ id: 'r', text: '10 < 5 × ☐ < 46' }],
        pairs: ['n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9'].map(n => [n, 'r']),
        hints: ['Mẫu: 5 × 6 = 30, mà 10 < 30 < 46. Thử từng số từ 1 đến 10.'],
      },
    ],
  },

  // ── BÀI 46 (trang 31–34) ──────────────────────────────────────────────────
  {
    id: 'bai-46', number: 46, title: 'Khối trụ, khối cầu',
    questions: [
      {
        type: 'compare', section: 'Tiết 1', img: imgB46T1Q1,
        q: '1. Khoanh màu đỏ vào chữ đặt dưới khối trụ, màu xanh vào chữ đặt dưới khối cầu.',
        rows: [
          { left: 'Chữ khoanh màu đỏ (khối trụ):', options: ['A', 'B', 'C', 'D'], answer: 'B' },
          { left: 'Chữ khoanh màu xanh (khối cầu):', options: ['A', 'B', 'C', 'D'], answer: 'C' },
        ],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối (theo mẫu).',
        left: [
          { id: 'lantern', img: imgB46Lantern }, { id: 'orange', img: imgB46Orange }, { id: 'can', img: imgB46Can },
          { id: 'globe', img: imgB46Globe }, { id: 'ball', img: imgB46Ball }, { id: 'battery', img: imgB46Battery },
        ],
        right: [{ id: 'cau', text: 'Khối cầu' }, { id: 'tru', text: 'Khối trụ' }],
        pairs: [['lantern', 'tru'], ['orange', 'cau'], ['can', 'tru'], ['globe', 'cau'], ['ball', 'cau'], ['battery', 'tru']],
        hints: ['Mẫu: chiếc đèn lồng có dạng khối trụ.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB46T1Q3,
        q: '3. Người ta làm những chú hề bằng gỗ, ở đó có những khối gỗ dạng khối cầu. Em hãy quan sát hình vẽ rồi viết số thích hợp vào ô trống.',
        blanks: [
          { label: 'a) 1 chú hề như vậy có ... khối gỗ dạng khối cầu.', answer: '7' },
          { label: 'b) 5 chú hề như vậy có ... khối gỗ dạng khối cầu.', answer: '35' },
        ],
        hints: ['Đếm cả quả cầu trên mũ, đầu, thân, hai tay và hai chân.', 'b) Lấy số khối cầu của 1 chú hề nhân với 5.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB46T1Q4,
        q: '4. Trong bức tranh, tất cả các rô-bốt đều có thân dạng khối cầu hoặc khối trụ. Em hãy tô màu xanh cho rô-bốt có thân dạng khối cầu và màu đỏ cho rô-bốt có thân dạng khối trụ.\n(Đếm số rô-bốt được tô mỗi màu.)',
        blanks: [
          { label: 'Có ... rô-bốt thân dạng khối cầu (tô màu xanh).', answer: '3' },
          { label: 'Có ... rô-bốt thân dạng khối trụ (tô màu đỏ).', answer: '3' },
        ],
        hints: ['Thân tròn như quả bóng là khối cầu; thân dài như cái lon là khối trụ.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB46T2Q1,
        q: '1. Số?\nTrong hình trên:',
        blanks: [
          { label: 'a) Có ... vật có dạng khối trụ.', answer: '3' },
          { label: 'b) Có ... vật có dạng khối cầu.', answer: '3' },
        ],
        hints: ['Khối trụ: giò lụa, lát giò lụa, cái thớt. Khối cầu: đếm số quả chanh.'],
      },
      {
        type: 'compare', section: 'Tiết 2', img: imgB46T2Q2,
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [{ left: 'Hình thích hợp đặt vào dấu “?” là:', options: ['A', 'B', 'C'], answer: 'C' }],
        hints: ['Các hình lặp lại theo thứ tự: khối lập phương, khối trụ, khối cầu.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. Nối hai hình để ghép thành một khối cầu hoặc một khối trụ.',
        left: [{ id: 'p1', img: imgB46P1 }, { id: 'p3', img: imgB46P3 }, { id: 'p5', img: imgB46P5 }],
        right: [{ id: 'p2', img: imgB46P2 }, { id: 'p4', img: imgB46P4 }, { id: 'p6', img: imgB46P6 }],
        pairs: [['p1', 'p6'], ['p3', 'p2'], ['p5', 'p4']],
        hints: ['Hai nửa khối cầu ghép thành khối cầu. Hai nửa khối trụ bổ dọc ghép với nhau.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB46T2Q4,
        q: '4. Số?\nXếp các hộp có dạng khối trụ thành các hình theo cách sau:\nTính từ trái sang phải:',
        blanks: [
          { label: 'a) • Hình thứ ba có ... khối trụ;', answer: '6' },
          { label: '• Hình thứ tư có ... khối trụ.', answer: '10' },
          { label: 'b) Để xếp được hình thứ năm theo cách trên thì cần ... hộp.', answer: '15' },
        ],
        hints: ['Hình sau có thêm một hàng ở dưới cùng: 1, 1 + 2, 1 + 2 + 3, ...'],
      },
    ],
  },

  // ── BÀI 47 (trang 35–38) ──────────────────────────────────────────────────
  {
    id: 'bai-47', number: 47, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB47T1Q1,
        q: '1. Tô màu đỏ vào vật có dạng khối trụ, màu xanh lá cây vào vật có dạng khối cầu, màu vàng vào vật có dạng khối hộp chữ nhật.\n(Đếm số vật được tô mỗi màu.)',
        blanks: [
          { label: 'Có ... vật tô màu đỏ (khối trụ).', answer: '2' },
          { label: 'Có ... vật tô màu xanh lá cây (khối cầu).', answer: '12' },
          { label: 'Có ... vật tô màu vàng (khối hộp chữ nhật).', answer: '3' },
        ],
        hints: ['Khối trụ: cái thùng và cái hộp. Khối hộp chữ nhật: máng ăn và hai kiện rơm. Khối cầu: các quả dưa hấu.'],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB47T1Q2,
        q: '2. Khoanh vào chữ đặt dưới hình thích hợp để xếp vào vị trí trên cùng của hình bên.',
        rows: [{ left: 'Hình thích hợp là:', options: ['A', 'B', 'C', 'D'], answer: 'D' }],
        hints: ['Hình trên cùng phải có 2 lỗ để lồng vào 2 cái cọc. Màu xám và màu xanh xếp xen kẽ nhau.'],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB47T1Q3,
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [{ left: 'Hình thích hợp đặt vào dấu “?” là:', options: ['A', 'B', 'C'], answer: 'B' }],
        hints: ['Các hình lặp lại theo thứ tự: khối trụ nằm, khối trụ đứng, khối cầu.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB47T1Q4,
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nTrong hình người tuyết bên, khối tuyết dưới cùng có dạng hình khối gì?',
        options: ['Khối trụ', 'Khối lập phương', 'Khối cầu'],
        answer: 2,
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '1. Nối mỗi đồ vật với dạng hình khối của nó.',
        left: [
          { id: 'basketball', img: imgB47Basketball }, { id: 'milk', img: imgB47Milk }, { id: 'orange', img: imgB47Orange },
          { id: 'cube', img: imgB47Cube }, { id: 'gift', img: imgB47Gift },
        ],
        right: [
          { id: 'tru', text: 'Khối trụ' }, { id: 'cau', text: 'Khối cầu' },
          { id: 'lp', text: 'Khối lập phương' }, { id: 'hcn', text: 'Khối hộp chữ nhật' },
        ],
        pairs: [['basketball', 'cau'], ['milk', 'tru'], ['orange', 'cau'], ['cube', 'lp'], ['gift', 'hcn']],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB47T2Q2,
        q: '2. Số?\nCó một loài chim chỉ thích trang trí tổ bằng những đồ vật sặc sỡ.\nỞ phía trước tổ chim có:',
        blanks: [
          { label: '... đồ vật dạng khối cầu;', answer: '3' },
          { label: '... đồ vật dạng khối trụ;', answer: '7' },
          { label: '... đồ vật dạng khối lập phương.', answer: '1' },
        ],
        hints: ['Đừng quên khối trụ nằm dưới đám cỏ bên trái.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB47T2Q3,
        q: '3. Bạn voi kéo những khối gỗ như sau:\nSố?',
        blanks: [
          { label: 'a) Hai khúc gỗ dạng khối cầu cân nặng tất cả ... kg.', answer: '60' },
          { label: 'b) Bạn voi muốn kéo 1 khối gỗ dạng khối cầu và 1 khối gỗ dạng khối trụ có tổng cân nặng bé nhất. Bạn ấy đã kéo ... kg gỗ.', answer: '45' },
        ],
        hints: ['Khối cầu: 35 kg và 25 kg. Khối trụ: 30 kg và 20 kg.', 'b) Chọn khối cầu nhẹ nhất và khối trụ nhẹ nhất.'],
      },
      {
        type: 'table', section: 'Tiết 2', img: imgB47T2Q4,
        q: '4. Trong bức tranh, tê tê mẹ đang đào một cái hang dạng khối trụ để bắt mồi.\na) Hoàn thành bảng sau (theo mẫu).',
        rows: [
          ['Vào lúc', '4 giờ', '4 giờ 15 phút', blank('4 giờ 30 phút', { validate: timeValidate(4, 30) }), '5 giờ'],
          ['Hang sâu', '20 cm', blank('40 cm', { validate: unitValidate(40, 'cm') }), '60 cm', blank('90 cm', { validate: unitValidate(90, 'cm') })],
        ],
        blanks: [{ label: 'b) Số?<br>Từ lúc 4 giờ đến 5 giờ, cái hang sâu thêm ... cm.', answer: '70' }],
        hints: ['Xem đồng hồ và số đo trong mỗi bức tranh.', 'b) 90 cm − 20 cm = ...'],
      },
    ],
  },

  // ── BÀI 48 (trang 39–41) ──────────────────────────────────────────────────
  {
    id: 'bai-48', number: 48, title: 'Đơn vị, chục, trăm, nghìn',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB48T1Q1,
        q: '1. Số?\n(Mẫu: hình thứ nhất có 2 chục ô vuông, viết 20.)',
        blanks: [
          { label: 'Hình thứ hai: ...', answer: '200' },
          { label: 'Hình thứ ba: ...', answer: '2' },
          { label: 'Hình thứ tư: ...', answer: '400' },
          { label: 'Hình thứ năm: ...', answer: '4' },
          { label: 'Hình thứ sáu: ...', answer: '40' },
          { label: 'Hình thứ bảy: ...', answer: '5' },
          { label: 'Hình thứ tám: ...', answer: '70' },
          { label: 'Hình thứ chín: ...', answer: '700' },
        ],
        hints: ['Mỗi ô vuông nhỏ là 1 đơn vị, mỗi cột 10 ô là 1 chục, mỗi tấm 100 ô là 1 trăm.', 'Chùm hình ngôi sao là 3 tấm 100 ô vuông xếp chồng lên nhau.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB48T1Q2,
        q: '2. Tô màu các ô vuông (theo mẫu).\n(Mẫu: số 3 — tô màu 3 ô vuông. Viết số phần em cần tô màu ở mỗi hình.)',
        blanks: [
          { label: 'Số 100: tô màu ... tấm 100 ô vuông.', answer: '1' },
          { label: 'Số 10: tô màu ... cột 10 ô vuông.', answer: '1' },
          { label: 'Số 5: tô màu ... ô vuông.', answer: '5' },
          { label: 'Số 300: tô màu ... tấm 100 ô vuông.', answer: '3' },
          { label: 'Số 30: tô màu ... cột 10 ô vuông.', answer: '3' },
        ],
        hints: ['300 là 3 trăm, 30 là 3 chục.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '3. Nối (theo mẫu).',
        left: [
          { id: 'k53', img: imgB48Blocks53 }, { id: 'k62', img: imgB48Blocks62 },
          { id: 'k35', img: imgB48Blocks35 }, { id: 'k26', img: imgB48Blocks26 },
        ],
        right: [{ id: 'v35', text: '35' }, { id: 'v26', text: '26' }, { id: 'v53', text: '53' }, { id: 'v62', text: '62' }],
        pairs: [['k53', 'v53'], ['k62', 'v62'], ['k35', 'v35'], ['k26', 'v26']],
        hints: ['Đếm số cột (chục) rồi đếm số ô vuông lẻ (đơn vị).'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB48T2Q1,
        q: '1. Mỗi khay bánh có 10 chiếc bánh. Vẽ thêm khay và bánh cho đủ:\n(Viết số khay bánh em cần vẽ thêm.)',
        blanks: [
          { label: 'a) 30 chiếc bánh: vẽ thêm ... khay bánh.', answer: '1' },
          { label: 'b) 50 chiếc bánh: vẽ thêm ... khay bánh.', answer: '2' },
        ],
        hints: ['30 chiếc bánh là 3 khay, 50 chiếc bánh là 5 khay.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB48T2Q2,
        q: '2. Mỗi túi đựng 100 đồng xu. Khoanh vào số túi để được:\n(Viết số túi em cần khoanh.)',
        blanks: [
          { label: 'a) 500 đồng xu: khoanh ... túi.', answer: '5' },
          { label: 'b) 1 000 đồng xu: khoanh ... túi.', answer: '10' },
        ],
        hints: ['10 trăm là 1 nghìn.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Số?',
        blanks: [
          { label: 'a) Số 20 gồm ... chục và ... đơn vị.', answer: '2, 0' },
          { label: 'b) Số 54 gồm ... chục và ... đơn vị.', answer: '5, 4' },
          { label: 'c) Số 45 gồm ... chục và ... đơn vị.', answer: '4, 5' },
          { label: 'd) Số 100 gồm ... trăm, ... chục và ... đơn vị.', answer: '1, 0, 0' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết số thích hợp vào chỗ chấm.\nTrong siêu thị có bán các thùng táo, mỗi thùng đựng 100 quả táo và các túi táo, mỗi túi đựng 10 quả táo.',
        blanks: [
          { label: 'a) Buổi sáng, một trường học đã mua 4 thùng táo ở siêu thị. Vậy trường học đã mua ... quả táo ở siêu thị vào buổi sáng.', answer: '400' },
          { label: 'b) Buổi chiều, bố của Nam đã mua 5 túi táo ở siêu thị để làm quà biếu ông bà. Vậy bố của Nam đã mua ... quả táo ở siêu thị vào buổi chiều.', answer: '50' },
        ],
        hints: ['4 thùng là 4 trăm quả; 5 túi là 5 chục quả.'],
      },
    ],
  },

  // ── BÀI 49 (trang 42–44) ──────────────────────────────────────────────────
  {
    id: 'bai-49', number: 49, title: 'Các số tròn trăm, tròn chục',
    questions: [
      {
        type: 'match', section: 'Tiết 1', img: imgB49T1Q1,
        q: '1. Nối mỗi chiếc diều với vạch thích hợp trên tia số (theo mẫu).\n(Các vạch chưa ghi số được đánh dấu A, B, C, D, E, G.)',
        left: [
          { id: 'k300', text: '🪁 300' }, { id: 'k200', text: '🪁 200' }, { id: 'k700', text: '🪁 700' },
          { id: 'k500', text: '🪁 500' }, { id: 'k1000', text: '🪁 1 000' },
        ],
        right: [
          { id: 'A', text: 'Vạch A' }, { id: 'B', text: 'Vạch B' }, { id: 'C', text: 'Vạch C' },
          { id: 'D', text: 'Vạch D' }, { id: 'E', text: 'Vạch E' }, { id: 'G', text: 'Vạch G' },
        ],
        pairs: [['k300', 'B'], ['k200', 'A'], ['k700', 'D'], ['k500', 'C'], ['k1000', 'G']],
        hints: ['Mỗi vạch cách nhau 100: 100, 200, 300, 400, ...'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB49T1Q2,
        q: '2. Hãy viết một số tròn trăm còn thiếu từ 100 đến 1 000 lên mỗi chiếc cốc còn để trống trong hình dưới đây:',
        blanks: [{ label: 'Bốn cốc còn trống: ..., ..., ..., ...', answer: '200, 400, 600, 800', validate: setValidate(['200', '400', '600', '800']) }],
        hints: ['Các số tròn trăm từ 100 đến 1 000: 100, 200, 300, ..., 1 000.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB49T1Q3,
        q: '3. Viết số thích hợp vào chỗ chấm (theo mẫu).\nMột đàn kiến vận chuyển các túi gạo từ tổ cũ sang tổ mới, mỗi túi có 100 hạt gạo.\nMẫu: Ngày thứ Sáu đàn kiến chuyển được 400 hạt gạo.',
        blanks: [
          { label: 'a) Ngày thứ Bảy đàn kiến chuyển được ... hạt gạo.', answer: '600' },
          { label: 'b) Ngày Chủ nhật đàn kiến chuyển được ... hạt gạo.', answer: '200' },
        ],
        hints: ['Đếm số túi gạo: mỗi túi là 100 hạt.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB49T1Q4,
        q: '4. Viết số thích hợp vào chỗ chấm.\nHôm qua và hôm nay, gia đình sóc nhặt được tất cả 5 bao hạt dẻ. Biết mỗi bao có 100 hạt dẻ.',
        blanks: [
          { label: 'a) Hôm qua gia đình sóc nhặt được 2 bao hạt dẻ. Vậy hôm qua gia đình sóc nhặt được ... hạt dẻ.', answer: '200' },
          { label: 'b) Hôm nay, gia đình sóc nhặt được ... bao hạt dẻ. Vậy hôm nay gia đình sóc nhặt được ... hạt dẻ.', answer: '3, 300' },
        ],
        hints: ['Hôm nay nhặt được 5 − 2 = 3 bao.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: [
          { label: 'a)', cells: [350, 360, 370, blank(380), blank(390), 400, blank(410)] },
          { label: 'b)', cells: [bigNum(1000), blank(990), blank(980), blank(970), 960, 950, 940] },
        ],
        hints: ['a) Đếm thêm 10: 350, 360, 370, ...', 'b) Đếm bớt 10 từ phải sang trái: 940, 950, 960, 970, ...'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB49T2Q2,
        q: '2. Số?\nHãy ước lượng số sách ở mỗi ngăn theo số tròn chục (theo mẫu).\n(Mẫu: ngăn dưới cùng có khoảng 10 quyển sách.)',
        blanks: [
          { label: 'Ngăn thứ nhất (trên cùng): ...', answer: '20' },
          { label: 'Ngăn thứ hai: ...', answer: '40' },
          { label: 'Ngăn thứ ba: ...', answer: '30' },
        ],
        hints: ['So sánh độ dài hàng sách với ngăn dưới cùng (10 quyển).'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB49T2Q3,
        q: '3. Có 10 chiếc bánh kem ghi các số như sau:\nMai lấy những cái bánh ghi số tròn trăm. Việt lấy những cái bánh ghi số tròn chục. Việt nhường Mai lấy bánh trước.\na) Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: '• Mai sẽ lấy những cái bánh ghi số: ...', answer: '400, 600, 1 000, 200', validate: numSetValidate([400, 600, 1000, 200]) },
          { label: '• Mai lấy được ... cái bánh.', answer: '4' },
          { label: '• Việt sẽ lấy những cái bánh ghi số: ...', answer: '230, 110, 80, 750, 380, 990', validate: numSetValidate([230, 110, 80, 750, 380, 990]) },
          { label: '• Việt lấy tất cả ... cái bánh.', answer: '6' },
          { label: 'b) Viết <i class="gw-sample-text">nhiều hơn</i>, <i class="gw-sample-text">ít hơn</i> hoặc <i class="gw-sample-text">bằng</i> vào chỗ chấm cho thích hợp.<br>Số bánh của Mai ... số bánh của Việt.', answer: 'ít hơn', validate: phraseValidate('ít hơn') },
        ],
        hints: ['Số tròn trăm có hai chữ số cuối là 0 (400, 600, ...). Mai lấy trước nên Việt chỉ lấy các số tròn chục còn lại.'],
      },
    ],
  },

  // ── BÀI 50 (trang 45–46) ──────────────────────────────────────────────────
  {
    id: 'bai-50', number: 50, title: 'So sánh các số tròn trăm, tròn chục',
    questions: [
      {
        type: 'compare', section: 'Tiết 1',
        q: '1. >; <; = ?',
        rows: [
          { left: '400', right: '450', answer: '<' },
          { left: '700', right: '300', answer: '>' },
          { left: '790', right: '800', answer: '<' },
          { left: '370', right: '340', answer: '>' },
          { left: '990', right: '1 000', answer: '<' },
          { left: '90', right: '40 + 50', answer: '=' },
        ],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        rows: [{ label: 'a)', cells: [670, 680, blank(690), blank(700), 710, 720, 730, blank(740), 750, 760] }],
        blanks: [{ label: 'b) Trong các số em vừa viết ở câu a, số lớn nhất là ...; số bé nhất là ...', answer: '740, 690' }],
        hints: ['Các vạch trên tia số cách nhau 10.'],
      },
      {
        type: 'choice', section: 'Tiết 1',
        q: '3. Khoanh vào chữ đặt trước câu đúng.\nCó hai đội thu hoạch cà chua. Đội Một gồm các bạn Mai, Việt, Nam và Mi, thu hoạch được tất cả 230 quả cà chua. Đội Hai chỉ có Rô-bốt, thu hoạch được 320 quả cà chua.',
        options: [
          'Số quả cà chua đội Một thu hoạch được nhiều hơn đội Hai.',
          'Số quả cà chua đội Một thu hoạch được ít hơn đội Hai.',
          'Số quả cà chua hai đội thu hoạch được bằng nhau.',
        ],
        answer: 1,
        hints: ['So sánh 230 và 320.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB50T1Q4,
        q: '4. Viết số thích hợp vào chỗ chấm.\nXếp que tính được số 930 như hình vẽ:\nChuyển chỗ một que tính để được số tròn chục lớn hơn số đã cho.',
        blanks: [{ label: 'Số tạo được là ...', answer: '950' }],
        hints: ['Chữ số 0 ở cuối giữ nguyên. Thử chuyển một que của chữ số 3.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đ, S?',
        blanks: [
          { label: 'a) 400 > 800 ...', boxes: true, answer: 'S', validate: dsValidate(false) },
          { label: 'b) 870 = 780 ...', boxes: true, answer: 'S', validate: dsValidate(false) },
          { label: 'c) 200 < 210 ...', boxes: true, answer: 'Đ', validate: dsValidate(true) },
          { label: 'd) 560 < 560 ...', boxes: true, answer: 'S', validate: dsValidate(false) },
          { label: 'e) 510 > 490 ...', boxes: true, answer: 'Đ', validate: dsValidate(true) },
          { label: 'g) 990 > 1 000 ...', boxes: true, answer: 'S', validate: dsValidate(false) },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết các số 340, 430, 230, 320 theo thứ tự:',
        blanks: [
          { label: 'a) Từ bé đến lớn: ...', answer: '230, 320, 340, 430', validate: listValidate(['230', '320', '340', '430']) },
          { label: 'b) Từ lớn đến bé: ...', answer: '430, 340, 320, 230', validate: listValidate(['430', '340', '320', '230']) },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB50T2Q3,
        q: '3. Viết số thích hợp vào chỗ chấm.',
        blanks: [{ label: 'Để các toa tàu ghi các số theo thứ tự từ lớn đến bé, em cần đổi chỗ toa tàu ghi số ... với toa tàu ghi số ...', answer: '640, 680', validate: swapPairValidate(640, 680) }],
        hints: ['Từ lớn đến bé là 680, 670, 640.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB50T2Q4,
        q: '4. Ba con bò có cân nặng là: 800 kg, 550 kg và 680 kg. Quan sát hình rồi viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: '• Bò xám cân nặng ... kg;', answer: '800' },
          { label: '• Bò sữa cân nặng ... kg;', answer: '680' },
          { label: '• Bò tót cân nặng ... kg.', answer: '550' },
        ],
        hints: ['Bên nào nặng hơn thì bập bênh bên đó thấp xuống.'],
      },
    ],
  },

  // ── BÀI 51 (trang 47–50) ──────────────────────────────────────────────────
  {
    id: 'bai-51', number: 51, title: 'Số có ba chữ số',
    questions: [
      {
        type: 'match', section: 'Tiết 1',
        q: '1. Nối cách đọc với cách viết số tương ứng.',
        left: [
          { id: 'r361', text: 'Ba trăm sáu mươi mốt' }, { id: 'r613', text: 'Sáu trăm mười ba' },
          { id: 'r136', text: 'Một trăm ba mươi sáu' }, { id: 'r316', text: 'Ba trăm mười sáu' },
        ],
        right: [{ id: 'v136', text: '🌸 136' }, { id: 'v613', text: '🌸 613' }, { id: 'v316', text: '🌸 316' }, { id: 'v361', text: '🌸 361' }],
        pairs: [['r361', 'v361'], ['r613', 'v613'], ['r136', 'v136'], ['r316', 'v316']],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Số?',
        rows: [
          { label: 'a)', cells: [blank(300), 301, 302, 303, blank(304), 305, 306, 307, blank(308)] },
          { label: 'b)', cells: [blank(287), blank(288), 289, 290, 291, blank(292), 293, 294, 295] },
        ],
        hints: ['Hai vạch liền nhau hơn kém nhau 1 đơn vị.'],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '3. Hoàn thành bảng sau (theo mẫu).',
        headers: ['Số gồm', 'Viết số', 'Đọc số'],
        rows: [
          { sample: true, cells: ['3 trăm, 4 chục và 5 đơn vị', 345, 'ba trăm bốn mươi lăm'] },
          ['4 trăm, 5 chục và 3 đơn vị', blank(453), readCell('bốn trăm năm mươi ba')],
          ['7 trăm, 6 chục và 4 đơn vị', blank(764), readCell('bảy trăm sáu mươi tư')],
          ['6 trăm, 4 chục và 7 đơn vị', blank(647), readCell('sáu trăm bốn mươi bảy')],
        ],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: `4. Tô màu vào mỗi ngôi nhà theo chỉ dẫn.${infoTable(['Ngôi nhà ghi số gồm', 'Tô màu'], [
          ['3 trăm, 4 chục và 5 đơn vị', 'Đỏ'], ['4 trăm, 5 chục và 3 đơn vị', 'Xanh'],
          ['7 trăm, 6 chục và 4 đơn vị', 'Vàng'], ['6 trăm, 4 chục và 7 đơn vị', 'Da cam'],
        ])}Chọn màu cho mỗi ngôi nhà:`,
        rows: [
          { left: '🏠 764', options: COLORS, answer: 'Vàng' },
          { left: '🏠 345', options: COLORS, answer: 'Đỏ' },
          { left: '🏠 647', options: COLORS, answer: 'Da cam' },
          { left: '🏠 453', options: COLORS, answer: 'Xanh' },
        ],
        hints: ['764 gồm 7 trăm, 6 chục và 4 đơn vị.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '1. Nối (theo mẫu).',
        left: [
          { id: 's738', text: 'Số 738 gồm' }, { id: 's378', text: 'Số 378 gồm' },
          { id: 's783', text: 'Số 783 gồm' }, { id: 's387', text: 'Số 387 gồm' },
        ],
        right: [
          { id: 'g783', text: '7 trăm, 8 chục và 3 đơn vị.' }, { id: 'g387', text: '3 trăm, 8 chục và 7 đơn vị.' },
          { id: 'g738', text: '7 trăm, 3 chục và 8 đơn vị.' }, { id: 'g378', text: '3 trăm, 7 chục và 8 đơn vị.' },
        ],
        pairs: [['s738', 'g738'], ['s378', 'g378'], ['s783', 'g783'], ['s387', 'g387']],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. Tìm bông hoa cho ong đậu bằng cách nối (theo mẫu).',
        left: [
          { id: 'e247', text: '🐝 247' }, { id: 'e724', text: '🐝 724' }, { id: 'e472', text: '🐝 472' },
          { id: 'e742', text: '🐝 742' }, { id: 'e427', text: '🐝 427' },
        ],
        right: [
          { id: 'w472', text: 'Bốn trăm bảy mươi hai' }, { id: 'w247', text: 'Hai trăm bốn mươi bảy' },
          { id: 'w742', text: 'Bảy trăm bốn mươi hai' }, { id: 'w724', text: 'Bảy trăm hai mươi tư' },
          { id: 'w427', text: 'Bốn trăm hai mươi bảy' },
        ],
        pairs: [['e247', 'w247'], ['e724', 'w724'], ['e472', 'w472'], ['e742', 'w742'], ['e427', 'w427']],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: `3. Tô màu vào những thanh gỗ ở hàng rào theo chỉ dẫn.${infoTable(['Thanh gỗ ghi số gồm', 'Tô màu'], [
          ['4 trăm, 9 chục và 2 đơn vị', 'Xanh'], ['2 trăm, 4 chục và 9 đơn vị', 'Đỏ'], ['9 trăm, 2 chục và 4 đơn vị', 'Vàng'],
        ])}Hàng rào có các thanh gỗ ghi số: 249, 492, 249, 924, 249, 492, 249, 924, 249.\nChọn màu cho các thanh gỗ ghi mỗi số:`,
        rows: [
          { left: 'Thanh gỗ ghi số 249', options: ['Xanh', 'Đỏ', 'Vàng'], answer: 'Đỏ' },
          { left: 'Thanh gỗ ghi số 492', options: ['Xanh', 'Đỏ', 'Vàng'], answer: 'Xanh' },
          { left: 'Thanh gỗ ghi số 924', options: ['Xanh', 'Đỏ', 'Vàng'], answer: 'Vàng' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Số liền trước của 599 là ...', answer: '598' },
          { label: 'b) Số liền sau của 599 là ...', answer: '600' },
          { label: 'c) Số 599 là số liền trước của ...', answer: '600' },
          { label: 'd) Số 599 là số liền sau của ...', answer: '598' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB51T3Q1,
        q: '1. Viết số thích hợp vào chỗ chấm (theo mẫu).\nNếu đi theo mỗi chỉ dẫn bên dưới, nhím sẽ đến được khu rừng có bao nhiêu cây nấm?\n(Mẫu: đi qua cây, cây, hoa, hoa thì đến khu rừng có 672 cây nấm.)',
        blanks: [
          { label: 'a) Cây, cây, cây, hoa: ... cây nấm', answer: '267' },
          { label: 'b) Cây, cây, hoa, cây: ... cây nấm', answer: '726' },
        ],
        hints: ['Bắt đầu từ chỗ nhím, lần theo con đường đi qua đúng các cây và hoa như chỉ dẫn.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Viết số thích hợp vào chỗ chấm (theo mẫu).',
        blanks: [
          { label: 'a) Số 392 gồm ... trăm, ... chục và ... đơn vị.', answer: '3, 9, 2' },
          { label: 'b) Số 450 gồm ... trăm, ... chục và ... đơn vị.', answer: '4, 5, 0' },
          { label: 'c) Số 500 gồm ... trăm, ... chục và ... đơn vị.', answer: '5, 0, 0' },
          { label: 'd) Số ... gồm 6 trăm, 0 chục và 7 đơn vị.', answer: '607' },
          { label: 'e) Số ... gồm 6 trăm, 7 chục và 0 đơn vị.', answer: '670' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: `3. Viết tiếp vào chỗ chấm cho thích hợp.
a) Từ ba thẻ số ${card(6)}, ${card(2)} và ${card(8)}, ta có thể lập được các số có ba chữ số là: ...
b) Từ ba thẻ số ${card(4)}, ${card(0)} và ${card(8)}, ta có thể lập được các số có ba chữ số là: ...`,
        blanks: [
          { label: 'a)', answer: '268, 286, 628, 682, 826, 862', validate: setValidate(['268', '286', '628', '682', '826', '862']) },
          { label: 'b)', answer: '408, 480, 804, 840', validate: setValidate(['408', '480', '804', '840']) },
        ],
        hints: ['Lần lượt chọn chữ số hàng trăm, rồi đổi chỗ hai chữ số còn lại.', 'b) Chữ số 0 không đứng ở hàng trăm.'],
      },
    ],
  },
];
