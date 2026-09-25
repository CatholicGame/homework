/**
 * Vở bài tập Toán 2 — Tập một: Bài 7–12 (sách trang 29–50).
 */
import { dsValidate, listValidate, swapPairValidate, sampleCell, mau } from '../grade3Workbook.js';
import imgB7T1Q1 from '../../assets/grade2-workbook/bai7_t1_q1_sticks.svg';
import imgB7T1Q2 from '../../assets/grade2-workbook/bai7_t1_q2_cubes.svg';
import imgB7T2Q4 from '../../assets/grade2-workbook/bai7_t2_q4_shapes.svg';
import imgB7T3Q1 from '../../assets/grade2-workbook/bai7_t3_q1_split.svg';
import imgB7T3Q3 from '../../assets/grade2-workbook/bai7_t3_q3_split.svg';
import imgB7T4Q1 from '../../assets/grade2-workbook/bai7_t4_q1b_pyramid.svg';
import imgB7T4Q2 from '../../assets/grade2-workbook/bai7_t4_q2_flow.svg';
import imgB7T5Q1 from '../../assets/grade2-workbook/bai7_t5_q1b_flow.svg';
import imgB7T5Q2 from '../../assets/grade2-workbook/bai7_t5_q2_mushrooms.png';
import imgB7T5Q3 from '../../assets/grade2-workbook/bai7_t5_q3_cubes.svg';
import imgB7T5Q4 from '../../assets/grade2-workbook/bai7_t5_q4_dice.png';
import imgB8T1Q3 from '../../assets/grade2-workbook/bai8_t1_q3_lanterns.png';
import imgB8T2Q2 from '../../assets/grade2-workbook/bai8_t2_q2_flow.svg';
import imgB10T1Q1 from '../../assets/grade2-workbook/bai10_t1_q1b_flow.svg';
import imgB10T1Q4 from '../../assets/grade2-workbook/bai10_t1_q4_cubes.svg';
import imgB11T3Q2 from '../../assets/grade2-workbook/bai11_t3_q2_wheels.svg';
import imgB11T4Q5 from '../../assets/grade2-workbook/bai11_t4_q5_flow.svg';
import imgB11T5Q4 from '../../assets/grade2-workbook/bai11_t5_q4_flow.svg';
import imgB12T1Q3 from '../../assets/grade2-workbook/bai12_t1_q3_frog.png';

// One addition/subtraction written by the child ("9 + 6", "9 + 6 = 15"):
// spaces and the dash look-alikes don't matter, a "+" may be written in either
// order (6 + 9), and a result, if written, must be the right one.
function normExpr(s) {
  const v = String(s).replace(/\s+/g, '').replace(/[−–—]/g, '-');
  const m = v.match(/^(\d+)([+-])(\d+)(?:=(\d+))?$/);
  if (!m) return null;
  const [, a, op, b, r] = m;
  const val = op === '+' ? Number(a) + Number(b) : Number(a) - Number(b);
  if (r !== undefined && Number(r) !== val) return null;
  return op === '+' ? [Number(a), Number(b)].sort((x, y) => x - y).join('+') : `${Number(a)}-${Number(b)}`;
}
// A set of such expressions in one blank (or spread over several slots of one
// row), in any order, separated by commas / semicolons / "và".
function exprSetValidate(exprs) {
  const target = exprs.map(normExpr).sort().join('|');
  return (value) => {
    const parts = String(value).split(/\s*(?:[,;]|\svà\s)\s*/).map(p => p.trim()).filter(Boolean).map(normExpr);
    if (parts.some(p => p === null)) return false;
    return parts.sort().join('|') === target;
  };
}
// Numbers written in a fixed order ("11, 13, 14, 17" or "11 13 14 17").
function orderedValidate(nums) {
  const target = nums.join('|');
  return (value) => String(value).split(/[^\d]+/).filter(Boolean).map(Number).join('|') === target;
}
const seq = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
const b = (answer) => ({ blank: true, answer: String(answer) });
// Bảng "Số hạng / Số hạng / Tổng" (hoặc bảng "+"): ô tổng nào in sẵn trong sách thì truyền vào `given`.
const sumRows = (top, bottom, given, head = ['Số hạng', 'Số hạng', 'Tổng']) => [
  [head[0], ...top], [head[1], ...bottom],
  [head[2], ...top.map((t, i) => (given.includes(i) ? t + bottom[i] : b(t + bottom[i])))],
];
const plusRows = (top, bottom, given) => sumRows(top, bottom, given, ['+', '', '']);
// "12 − 3 = ..." rows of a Tính nhẩm list; the a)/b)/c) letter goes on the first of each group.
const calc = (label, answer) => ({ label: `${label} = ...`, answer: String(answer) });

export const BAI_7_12 = [
  // ── BÀI 7 (trang 29–34) ───────────────────────────────────────────────────
  {
    id: 'bai-7', number: 7, title: 'Phép cộng (qua 10) trong phạm vi 20',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB7T1Q1,
        q: '1. a) Tính 8 + 5.\nb) Tính 9 + 3.',
        blanks: [
          { label: 'a) • Tách: 5 = ... + ...', answer: '2,3', validate: listValidate(['2', '3']) },
          { label: '• 8 + ... = ...', answer: '2,10', validate: listValidate(['2', '10']) },
          { label: '• 10 + ... = ...', answer: '3,13', validate: listValidate(['3', '13']) },
          { label: '8 + 5 = ...', answer: '13' },
          { label: 'b) Đếm tiếp: 9, ..., ..., ...', answer: '10,11,12', validate: listValidate(['10', '11', '12']) },
          { label: '9 + 3 = ...', answer: '12' },
        ],
        hints: ['Tách 5 thành 2 và 3: 8 + 2 = 10, rồi 10 + 3 = 13.', 'Đếm tiếp 3 số sau 9: 10, 11, 12.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB7T1Q2,
        q: '2. a) Tính 8 + 4.\nb) Tính.',
        blanks: [
          { label: 'a) • Tách: 4 = ... + ...', answer: '2,2', validate: listValidate(['2', '2']) },
          { label: '• 8 + ... = ...', answer: '2,10', validate: listValidate(['2', '10']) },
          { label: '• 10 + ... = ...', answer: '2,12', validate: listValidate(['2', '12']) },
          { label: '8 + 4 = ...', answer: '12' },
          calc('b) 9 + 4', 13), calc('8 + 6', 14), calc('9 + 2', 11),
        ],
        hints: ['8 cần thêm 2 để được 10, nên tách 4 thành 2 và 2.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Tính nhẩm.',
        blanks: [
          calc('a) 8 + 5', 13), calc('5 + 8', 13), calc('b) 8 + 4', 12), calc('4 + 8', 12),
          calc('c) 9 + 3', 12), calc('3 + 9', 12), calc('d) 9 + 4', 13), calc('4 + 9', 13),
        ],
        hints: ['Đổi chỗ hai số trong phép cộng thì kết quả không thay đổi.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính 6 + 9.',
        blanks: [
          { label: 'Cách 1:<br>• Tách: 9 = 4 + ...', answer: '5' },
          { label: '• 6 + ... = ...', answer: '4,10', validate: listValidate(['4', '10']) },
          { label: '• 10 + ... = ...', answer: '5,15', validate: listValidate(['5', '15']) },
          { label: '6 + 9 = ...', answer: '15' },
          { label: 'Cách 2:<br>• Tách: 6 = ... + 1', answer: '5' },
          { label: '• 1 + 9 = ...', answer: '10' },
          { label: '• 10 + ... = ...', answer: '5,15', validate: listValidate(['5', '15']) },
          { label: '6 + 9 = ...', answer: '15' },
        ],
        hints: ['Cách 1: 6 cần thêm 4 để được 10. Cách 2: 9 cần thêm 1 để được 10.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. a) Số?\nb) Tính.',
        tables: [{ label: 'a)', rows: sumRows([9, 9, 9, 9, 9, 9, 9, 9], seq(2, 9), [0, 7]) }],
        blanks: [calc('b) 9 + 5 − 4', 10), calc('10 − 3 + 6', 13)],
        hints: ['Tính lần lượt từ trái sang phải: 9 + 5 = 14, rồi 14 − 4.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. Nối mỗi con mèo với con cá bắt được (theo mẫu).',
        left: [{ id: 'm1', text: '8 + 6' }, { id: 'm2', text: '9 + 4' }, { id: 'm3', text: '9 + 3' }, { id: 'm4', text: '9 + 8' }],
        right: [{ id: 'c13', text: '13' }, { id: 'c14', text: '14' }, { id: 'c12', text: '12' }, { id: 'c17', text: '17' }],
        pairs: [['m1', 'c14'], ['m2', 'c13'], ['m3', 'c12'], ['m4', 'c17']],
        hints: ['Mẫu: 8 + 6 = 14, nên con mèo 8 + 6 bắt con cá 14.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB7T2Q4,
        q: '4. Viết số thích hợp vào chỗ chấm.\nTrong hình bên có:',
        blanks: [
          { label: 'a) ... hình tam giác.', answer: '8' },
          { label: 'b) ... hình tròn.', answer: '9' },
          { label: 'c) Có tất cả bao nhiêu hình tròn và hình tam giác?<br>... + ... = ...', answer: '9,8,17', validate: swapPairValidate(9, 8, 17) },
        ],
        hints: ['Đếm từng hàng: hàng trên cùng có 3 hình tam giác và 3 hình tròn.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB7T3Q1,
        q: '1. a) Tính 7 + 4.',
        blanks: [
          { label: 'a) Tách: 4 = 3 + ...', answer: '1' },
          { label: '7 + 4 = 10 + ... = ...', answer: '1,11', validate: listValidate(['1', '11']) },
          { label: '7 + 4 = ...', answer: '11' },
          { label: 'b) Tách: 7 = ... + ...', answer: '3,4', validate: listValidate(['3', '4']) },
          { label: '7 + 7 = 10 + ... = ...', answer: '4,14', validate: listValidate(['4', '14']) },
          { label: '7 + 7 = ...', answer: '14' },
        ],
        hints: ['7 cần thêm 3 để được 10.'],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: '2. a) Số?',
        rows: plusRows([7, 7, 7, 7, 7, 7, 7], seq(3, 9), [0, 6]),
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '2. b) Nối (theo mẫu).',
        left: [
          { id: 'l1', text: '9 + 3' }, { id: 'l2', text: '7 + 4' }, { id: 'l3', text: '7 + 3' }, { id: 'l4', text: '7 + 7' },
          { id: 'l5', text: '7 + 6' }, { id: 'l6', text: '7 + 9' }, { id: 'l7', text: '7 + 8' },
        ],
        right: seq(10, 18).map(n => ({ id: `r${n}`, text: String(n) })),
        pairs: [['l1', 'r12'], ['l2', 'r11'], ['l3', 'r10'], ['l4', 'r14'], ['l5', 'r13'], ['l6', 'r16'], ['l7', 'r15']],
        hints: ['Mẫu: 9 + 3 = 12, nên quả bóng 9 + 3 nối với số 12 trên tia số.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB7T3Q3,
        q: '3. Số?',
        blanks: [
          { label: 'a) Tách: 4 = 2 + ...', answer: '2' },
          { label: '8 + 4 = ...', answer: '12' },
          { label: 'b) Tách: 9 = 2 + ...', answer: '7' },
          { label: '8 + 9 = ...', answer: '17' },
          { label: 'c) 8 + 3 = ...', answer: '11' },
        ],
        hints: ['8 cần thêm 2 để được 10.'],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: '4. Số?',
        rows: sumRows([8, 8, 8, 8, 8, 8, 8, 8], seq(2, 9), [0, 7]),
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '5. Trên sân có 8 con gà và 6 con vịt. Hỏi cả gà và vịt có bao nhiêu con?',
        wordProblem: true,
        blanks: [{ label: 'Số con gà và vịt', answer: '14' }],
      },
      {
        type: 'table', section: 'Tiết 4', img: imgB7T4Q1,
        q: '1. Số?',
        tables: [{ label: 'a)', rows: plusRows([6, 6, 6, 6, 6, 6, 6], seq(4, 10), [0, 6]) }],
        blanks: [
          { label: 'b) Hàng 2 (từ dưới lên): 3, 3, 3, ...', answer: '3' },
          { label: 'Hàng 3: 6, 6, ...', answer: '6' },
          { label: 'Hàng 4: 12, ...', answer: '12' },
          { label: 'Hàng trên cùng: ...', answer: '24' },
        ],
        hints: ['b) Mỗi số bằng tổng hai số ở ngay dưới nó: 1 + 2 = 3, 3 + 3 = 6.'],
      },
      {
        type: 'fill', section: 'Tiết 4', img: imgB7T4Q2,
        q: '2. Số?',
        blanks: [
          { label: 'a) 6 (+ 6) → ... (+ 6) → ...', answer: '12,18', validate: listValidate(['12', '18']) },
          { label: 'b) 8 (+ 6) → ... (− 4) → ... (+ 6) → ...', answer: '14,10,16', validate: listValidate(['14', '10', '16']) },
        ],
      },
      {
        type: 'match', section: 'Tiết 4',
        q: '3. Nối hai phép tính có cùng kết quả (theo mẫu).',
        left: [
          { id: 'o1', text: '8 + 5' }, { id: 'o2', text: '8 + 4' }, { id: 'o3', text: '8 + 3' },
          { id: 'o4', text: '9 + 8' }, { id: 'o5', text: '9 + 5' }, { id: 'o6', text: '7 + 8' },
        ],
        right: [
          { id: 'h1', text: '7 + 6' }, { id: 'h2', text: '6 + 8' }, { id: 'h3', text: '6 + 9' },
          { id: 'h4', text: '8 + 9' }, { id: 'h5', text: '6 + 5' }, { id: 'h6', text: '7 + 5' },
        ],
        pairs: [['o1', 'h1'], ['o2', 'h6'], ['o3', 'h5'], ['o4', 'h4'], ['o5', 'h2'], ['o6', 'h3']],
        hints: ['Mẫu: 8 + 5 = 13 và 7 + 6 = 13, nên chú ong 8 + 5 nối với bông hoa 7 + 6.'],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '4. Nhóm học hát có 8 bạn nữ và 7 bạn nam. Hỏi nhóm học hát có tất cả bao nhiêu bạn?',
        wordProblem: true,
        blanks: [{ label: 'Số bạn', answer: '15' }],
      },
      {
        type: 'table', section: 'Tiết 5', img: imgB7T5Q1,
        q: '1. Số?',
        tables: [{ label: 'a)', rows: plusRows([6, 6, 7, 8, 9, 8, 7, 9], [5, 6, 4, 5, 7, 6, 7, 9], [1, 7]) }],
        blanks: [{ label: 'b) 9 (+ 6) → ... (− 5) → ...', answer: '15,10', validate: listValidate(['15', '10']) }],
      },
      {
        type: 'compare', section: 'Tiết 5', img: imgB7T5Q2,
        q: '2. a) Khoanh vào chữ đặt trước câu trả lời đúng.\nBạn Sao hái được các cây nấm ghi phép tính có kết quả là 14.',
        rows: [{ left: 'Số cây nấm bạn Sao hái được là:', options: ['A. 3', 'B. 4', 'C. 5'], answer: 'B' }],
        hints: ['Tính kết quả của từng cây nấm rồi đếm những cây có kết quả bằng 14.'],
      },
      {
        type: 'fill', section: 'Tiết 5', img: imgB7T5Q2,
        q: '2. b) Viết phép tính thích hợp vào chỗ chấm.',
        blanks: [
          { label: '• Các phép tính có kết quả lớn hơn 14 là: ...', answer: '9 + 6, 9 + 7, 8 + 9', validate: exprSetValidate(['9+6', '9+7', '8+9']) },
          { label: '• Các phép tính có kết quả bé hơn 14 là: ...', answer: '5 + 8, 8 + 4', validate: exprSetValidate(['5+8', '8+4']) },
        ],
        hints: ['Viết các phép tính cách nhau bởi dấu phẩy, ví dụ: 9 + 6, 9 + 7.'],
      },
      {
        type: 'fill', section: 'Tiết 5', img: imgB7T5Q3,
        q: '3. Viết số thích hợp vào chỗ chấm.\nTổng số khối lập phương nhỏ ở hình A và hình B là:',
        blanks: [{ label: '... + ... = ...', answer: '8,4,12', validate: swapPairValidate(8, 4, 12) }],
        hints: ['Hình A có 2 tầng, mỗi tầng 4 khối. Hình B chỉ có 1 lớp 4 khối.'],
      },
      {
        type: 'compare', section: 'Tiết 5', img: imgB7T5Q4,
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [{ left: 'Trong bốn con xúc xắc ở trên, hai con xúc xắc có hiệu số chấm ở các mặt trên bằng 3 là:', options: ['A. Xúc xắc 2 và 4', 'B. Xúc xắc 1 và 3', 'C. Xúc xắc 1 và 4'], answer: 'C' }],
        hints: ['Đếm số chấm ở mặt trên của mỗi con xúc xắc: con 1 có 6 chấm.'],
      },
    ],
  },

  // ── BÀI 8 (trang 35–37) ───────────────────────────────────────────────────
  {
    id: 'bai-8', number: 8, title: 'Bảng cộng (qua 10)',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [calc('8 + 7', 15), calc('7 + 4', 11), calc('8 + 4', 12), calc('6 + 6', 12),
          calc('6 + 5', 11), calc('9 + 5', 14), calc('9 + 3', 12), calc('7 + 6', 13)],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. a) Nối mỗi chú sóc với hạt dẻ nhặt được (theo mẫu).',
        left: [{ id: 's1', text: '9 + 8' }, { id: 's2', text: '7 + 6' }, { id: 's3', text: '8 + 6' }, { id: 's4', text: '6 + 5' }],
        right: [{ id: 'h13', text: '13' }, { id: 'h17', text: '17' }, { id: 'h11', text: '11' }, { id: 'h14', text: '14' }],
        pairs: [['s1', 'h17'], ['s2', 'h13'], ['s3', 'h14'], ['s4', 'h11']],
        hints: ['Mẫu: 9 + 8 = 17, nên chú sóc 9 + 8 nhặt hạt dẻ 17.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. b) Viết các số ghi trên những hạt dẻ mà các chú sóc nhặt được theo thứ tự từ bé đến lớn:\n(Các hạt dẻ ghi: 13, 17, 11, 14)',
        blanks: [{ label: 'Từ bé đến lớn:', answer: '11, 13, 14, 17', validate: orderedValidate([11, 13, 14, 17]) }],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB8T1Q3,
        q: '3. a) Viết các phép tính ghi ở đèn lồng có kết quả bằng 12:',
        blanks: [{ label: 'Các phép tính:', answer: '7 + 5, 6 + 6', validate: exprSetValidate(['7+5', '6+6']) }],
        hints: ['Tính kết quả phép tính ở từng đèn lồng. Viết các phép tính cách nhau bởi dấu phẩy.'],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB8T1Q3,
        q: '3. b) Khoanh vào chữ đặt trước câu trả lời đúng.\nBạn Hoa lấy các đèn lồng ghi phép tính có kết quả bằng 14, bạn Cúc lấy các đèn lồng ghi phép tính có kết quả bằng 12, bạn Bình lấy các đèn lồng còn lại.',
        rows: [{ left: 'Bạn lấy được nhiều đèn lồng nhất là:', options: ['A. Cúc', 'B. Hoa', 'C. Bình'], answer: 'B' }],
        hints: ['Đếm số đèn lồng có kết quả bằng 14, bằng 12 và số đèn lồng còn lại.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: plusRows([6, 7, 7, 8, 9, 9], [5, 6, 7, 6, 5, 8], [0, 5]),
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB8T2Q2,
        q: '2. Số?',
        blanks: [
          { label: 'a) 7 (+ 6) → ... (− 10) → ...', answer: '13,3', validate: listValidate(['13', '3']) },
          { label: 'b) 5 (+ 3) → ... (+ 7) → ... (− 5) → ...', answer: '8,15,10', validate: listValidate(['8', '15', '10']) },
        ],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. a) Nối mỗi chú gấu với tổ ong lấy được (theo mẫu).',
        left: [{ id: 'g1', text: '8 + 6' }, { id: 'g2', text: '9 + 3' }, { id: 'g3', text: '7 + 4' }],
        right: [{ id: 't12', text: '12' }, { id: 't14', text: '14' }, { id: 't11', text: '11' }],
        pairs: [['g1', 't14'], ['g2', 't12'], ['g3', 't11']],
        hints: ['Mẫu: 9 + 3 = 12, nên chú gấu 9 + 3 lấy tổ ong 12.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. b) Viết các số ghi ở tổ ong theo thứ tự từ bé đến lớn.\n(Các tổ ong ghi: 12, 14, 11)\nc) Viết tiếp vào chỗ chấm.\n(Các chú gấu ghi: 8 + 6, 9 + 3, 7 + 4)',
        blanks: [
          { label: 'b) Từ bé đến lớn:', answer: '11, 12, 14', validate: orderedValidate([11, 12, 14]) },
          { label: 'c) Phép tính trên chú gấu có kết quả lớn nhất là ...', answer: '8 + 6', validate: exprSetValidate(['8+6']) },
        ],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '4. >; <; = ?',
        rows: [
          { left: 'a) 6 + 5', right: '11', answer: '=' },
          { left: '6 + 7', right: '12', answer: '>' },
          { left: 'b) 9 + 3', right: '3 + 9', answer: '=' },
          { left: '9 + 4', right: '9 + 5', answer: '<' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '5. Để giúp đỡ đồng bào vùng bão lụt, buổi sáng có 9 chuyến ô tô chở hàng cứu trợ, buổi chiều có 7 chuyến ô tô chở hàng cứu trợ vào miền Trung. Hỏi cả buổi sáng và buổi chiều có bao nhiêu chuyến ô tô chở hàng cứu trợ?',
        wordProblem: true,
        blanks: [{ label: 'Số chuyến ô tô', answer: '16' }],
      },
    ],
  },

  // ── BÀI 9 (trang 38–39) ───────────────────────────────────────────────────
  {
    id: 'bai-9', number: 9, title: 'Bài toán về thêm, bớt một số đơn vị',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Lớp học bơi có 9 bạn. Hôm nay có thêm 5 bạn tham gia. Hỏi hôm nay lớp học bơi có tất cả bao nhiêu bạn?',
        wordProblem: true,
        blanks: [{ label: 'Số bạn', answer: '14' }],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Trên sân có 6 con gà, lúc sau có thêm 5 con gà chạy đến. Hỏi lúc này trên sân có tất cả bao nhiêu con gà?',
        wordProblem: true,
        blanks: [{ label: 'Số con gà', answer: '11' }],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Đàn lợn nhà Núi có 8 con. Mẹ Núi mua thêm 4 con lợn về nuôi cùng. Hỏi lúc này đàn lợn nhà Núi có bao nhiêu con?',
        wordProblem: true,
        blanks: [{ label: 'Số con lợn', answer: '12' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Xe buýt đang chở 35 người. Tới bến đỗ, có 12 người xuống xe. Hỏi lúc này trên xe buýt còn lại bao nhiêu người?',
        wordProblem: true,
        blanks: [{ label: 'Số người còn lại', answer: '23' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Trên cành cây có 16 con chim đang đậu. Lúc sau có 5 con bay đi. Hỏi trên cành cây còn lại bao nhiêu con chim đang đậu?',
        wordProblem: true,
        blanks: [{ label: 'Số con chim còn lại', answer: '11' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Giải bài toán theo tóm tắt sau:\n<em>Tóm tắt</em>\nCó: 45 con gà\nBán: 14 con gà\nCòn lại: ... con gà?',
        wordProblem: true,
        blanks: [{ label: 'Số con gà còn lại', answer: '31' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Có 15 con vịt ở trên bờ, lúc sau có 3 con vịt xuống ao bơi. Hỏi trên bờ còn lại bao nhiêu con vịt?',
        wordProblem: true,
        blanks: [{ label: 'Số con vịt còn lại', answer: '12' }],
      },
    ],
  },

  // ── BÀI 10 (trang 40–42) ──────────────────────────────────────────────────
  {
    id: 'bai-10', number: 10, title: 'Luyện tập chung',
    questions: [
      {
        type: 'table', section: 'Tiết 1', img: imgB10T1Q1,
        q: '1. Số?',
        tables: [{ label: 'a)', rows: plusRows([6, 7, 8, 9, 5, 4, 3, 2], [9, 8, 7, 6, 6, 7, 8, 9], [0, 7]) }],
        blanks: [{ label: 'b) 7 (+ 2) → ... (+ 6) → ... (− 5) → ...', answer: '9,15,10', validate: listValidate(['9', '15', '10']) }],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. a) Nối (theo mẫu).',
        left: [
          { id: 'q1', text: '9 + 4' }, { id: 'q2', text: '8 + 7' }, { id: 'q3', text: '6 + 5' },
          { id: 'q4', text: '8 + 9' }, { id: 'q5', text: '9 + 9' }, { id: 'q6', text: '7 + 7' },
        ],
        right: seq(11, 18).map(n => ({ id: `n${n}`, text: String(n) })),
        pairs: [['q1', 'n13'], ['q2', 'n15'], ['q3', 'n11'], ['q4', 'n17'], ['q5', 'n18'], ['q6', 'n14']],
        hints: ['Mẫu: 6 + 5 = 11, nên quả bóng 6 + 5 nối với số 11 trên tia số.'],
      },
      {
        type: 'choice', section: 'Tiết 1', multi: true,
        q: '2. b) Tô màu vào các quả bóng ghi phép tính có kết quả lớn hơn 12 và bé hơn 16.\n(Chọn tất cả các quả bóng cần tô màu.)',
        options: ['9 + 4', '8 + 7', '6 + 5', '8 + 9', '9 + 9', '7 + 7'],
        answer: [0, 1, 5],
        hints: ['Các số lớn hơn 12 và bé hơn 16 là 13, 14, 15.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '3. a) Nối hai phép tính có cùng kết quả (theo mẫu).\n(Cột trái: đoàn tàu A — cột phải: đoàn tàu B)',
        left: [{ id: 'a1', text: '9 + 4' }, { id: 'a2', text: '8 + 8' }, { id: 'a3', text: '6 + 6' }, { id: 'a4', text: '7 + 4' }],
        right: [{ id: 'b1', text: '9 + 7' }, { id: 'b2', text: '6 + 7' }, { id: 'b3', text: '6 + 5' }, { id: 'b4', text: '3 + 9' }],
        pairs: [['a1', 'b2'], ['a2', 'b1'], ['a3', 'b4'], ['a4', 'b3']],
        hints: ['Mẫu: 9 + 4 = 13 và 6 + 7 = 13.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. b) Viết số thích hợp vào chỗ chấm.\nc) Viết tiếp vào chỗ chấm cho thích hợp.\n(Đoàn tàu A: 9 + 4, 8 + 8, 6 + 6, 7 + 4 — Đoàn tàu B: 9 + 7, 6 + 7, 6 + 5, 3 + 9)',
        blanks: [
          { label: 'b) Ở đoàn tàu A, phép tính có kết quả bé nhất là: ... + ... = ...', answer: '7,4,11', validate: swapPairValidate(7, 4, 11) },
          { label: 'c) Ở đoàn tàu B, các phép tính có kết quả lớn hơn 11 là:<br>9 + 7 = 16; ... ; ...', answer: '6 + 7 = 13, 3 + 9 = 12', validate: exprSetValidate(['6+7=13', '3+9=12']) },
        ],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB10T1Q4,
        q: '4. Một bạn đã xếp các khối lập phương nhỏ thành ba hình A, B, C (như hình vẽ).\na) Khoanh vào chữ ở dưới hình có số khối lập phương nhỏ ít nhất.',
        rows: [{ left: 'Hình có số khối lập phương nhỏ ít nhất:', options: ['A', 'B', 'C'], answer: 'C' }],
        hints: ['Hình A có 8 khối, hình B có 6 khối.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB10T1Q4,
        q: '4. b) Viết số thích hợp vào chỗ chấm.',
        blanks: [{ label: 'Cả ba hình có ... khối lập phương nhỏ.', answer: '18' }],
        hints: ['Hình A có 8 khối, hình B có 6 khối, hình C có 4 khối.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: sumRows([9, 9, 9, 9, 9, 9, 9, 9], seq(2, 9), [0, 7]),
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Một cửa hàng buổi sáng bán được 6 chiếc xe đạp, buổi chiều bán thêm được 3 chiếc. Hỏi cả ngày, cửa hàng bán được bao nhiêu chiếc xe đạp?',
        wordProblem: true,
        blanks: [{ label: 'Số chiếc xe đạp', answer: '9' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Có 8 con vịt đang ở trên bờ, sau đó có 6 con vịt ở dưới ao lên bờ. Hỏi lúc này ở trên bờ có bao nhiêu con vịt?',
        wordProblem: true,
        blanks: [{ label: 'Số con vịt', answer: '14' }],
      },
    ],
  },

  // ── BÀI 11 (trang 43–48) ──────────────────────────────────────────────────
  {
    id: 'bai-11', number: 11, title: 'Phép trừ (qua 10) trong phạm vi 20',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. a) Tính 11 − 4.\nb) Tính 12 − 3.',
        blanks: [
          { label: 'a) • Tách: 11 = 10 + 1<br>• 10 − 4 = ...', answer: '6' },
          { label: '• 6 + ... = ...', answer: '1,7', validate: listValidate(['1', '7']) },
          { label: '11 − 4 = ...', answer: '7' },
          { label: 'b) • Tách: 12 = 10 + ...', answer: '2' },
          { label: '• 10 − ... = ...', answer: '3,7', validate: listValidate(['3', '7']) },
          { label: '• ... + ... = ...', answer: '7,2,9', validate: swapPairValidate(7, 2, 9) },
          { label: '12 − 3 = ...', answer: '9' },
        ],
        hints: ['Lấy 10 trừ trước rồi cộng thêm phần lẻ: 10 − 4 = 6, 6 + 1 = 7.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Tính nhẩm.',
        blanks: [calc('11 − 2', 9), calc('11 − 5', 6), calc('11 − 3', 8), calc('11 − 6', 5), calc('11 − 8', 3),
          calc('11 − 9', 2), calc('11 − 7', 4), calc('11 − 4', 7), calc('11 − 1', 10)],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '3. Nối (theo mẫu).',
        left: [
          { id: 'e1', text: '11 − 6' }, { id: 'e2', text: '12 − 3' }, { id: 'e3', text: '11 − 3' },
          { id: 'e4', text: '11 − 5' }, { id: 'e5', text: '11 − 7' }, { id: 'e6', text: '11 − 4' },
        ],
        right: seq(4, 9).map(n => ({ id: `f${n}`, text: String(n) })),
        pairs: [['e1', 'f5'], ['e2', 'f9'], ['e3', 'f8'], ['e4', 'f6'], ['e5', 'f4'], ['e6', 'f7']],
        hints: ['Mẫu: 11 − 6 = 5, nên chú ong 11 − 6 nối với bông hoa 5.'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '4. Tô màu vàng vào quả ghi phép tính có kết quả bé nhất, màu xanh vào quả ghi phép tính có kết quả lớn nhất.\n(Chọn quả cần tô cho mỗi màu.)',
        rows: [
          { left: 'Tô màu vàng:', options: ['11 − 2', '11 − 8', '11 − 4', '11 − 9'], answer: '11 − 9' },
          { left: 'Tô màu xanh:', options: ['11 − 2', '11 − 8', '11 − 4', '11 − 9'], answer: '11 − 2' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. a) Tính 13 − 4.\nb) Tính 12 − 6.',
        blanks: [
          { label: 'a) • Tách: 13 = 10 + ...', answer: '3' },
          { label: '• 10 − 4 = ...', answer: '6' },
          { label: '• 6 + ... = ...', answer: '3,9', validate: listValidate(['3', '9']) },
          { label: '13 − 4 = ...', answer: '9' },
          { label: 'b) • Tách: 12 = 10 + ...', answer: '2' },
          { label: '• 10 − ... = ...', answer: '6,4', validate: listValidate(['6', '4']) },
          { label: '• ... + ... = ...', answer: '4,2,6', validate: swapPairValidate(4, 2, 6) },
          { label: '12 − 6 = ...', answer: '6' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Tính nhẩm.',
        blanks: [calc('12 − 3', 9), calc('12 − 4', 8), calc('12 − 5', 7), calc('12 − 6', 6),
          calc('12 − 9', 3), calc('12 − 8', 4), calc('12 − 7', 5), calc('12 − 2', 10)],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '3. Số?',
        rows: [['−', 13, 13, 13, 13, 13, 13], ['', 9, 8, 7, 6, 5, 4], ['', 4, b(5), b(6), b(7), b(8), b(9)]],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Nam có 13 quyển vở, Nam đã dùng 8 quyển. Hỏi Nam còn lại bao nhiêu quyển vở chưa dùng?',
        wordProblem: true,
        blanks: [{ label: 'Số quyển vở chưa dùng', answer: '5' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '5. Đ, S?',
        blanks: [
          { label: '13 − 6 = 7 ...', boxes: true, answer: 'Đ', validate: dsValidate(true) },
          { label: '12 − 5 = 8 ...', boxes: true, answer: 'S', validate: dsValidate(false) },
          { label: '12 − 7 > 4 ...', boxes: true, answer: 'Đ', validate: dsValidate(true) },
          { label: '12 − 8 = 3 ...', boxes: true, answer: 'S', validate: dsValidate(false) },
          { label: '13 − 8 = 5 ...', boxes: true, answer: 'Đ', validate: dsValidate(true) },
          { label: '13 − 9 < 4 ...', boxes: true, answer: 'S', validate: dsValidate(false) },
        ],
        hints: ['Tính kết quả phép trừ trước rồi mới so sánh. 13 − 9 = 4, mà 4 không bé hơn 4.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. a) Tính 14 − 7.\nb) Tính 15 − 6.',
        blanks: [
          { label: 'a) • Tách: 14 = 10 + ...', answer: '4' },
          { label: '• 10 − 7 = ...', answer: '3' },
          { label: '• ... + ... = ...', answer: '3,4,7', validate: swapPairValidate(3, 4, 7) },
          { label: '14 − 7 = ...', answer: '7' },
          { label: 'b) • Tách: 15 = 10 + ...', answer: '5' },
          { label: '• 10 − ... = ...', answer: '6,4', validate: listValidate(['6', '4']) },
          { label: '• ... + ... = ...', answer: '4,5,9', validate: swapPairValidate(4, 5, 9) },
          { label: '15 − 6 = ...', answer: '9' },
        ],
      },
      {
        type: 'table', section: 'Tiết 3', img: imgB11T3Q2,
        q: '2. Số?\n(Viết vào vòng ngoài kết quả của phép trừ: số ở giữa trừ đi số ở vòng trong.)',
        tables: [
          { label: 'a) 14 −', rows: [['Vòng trong', 9, 7, 5, 6, 8], ['Vòng ngoài', b(5), b(7), sampleCell(9), b(8), b(6)]] },
          { label: 'b) 15 −', rows: [['Vòng trong', 9, 6, 5, 8, 7], ['Vòng ngoài', b(6), b(9), b(10), b(7), b(8)]] },
        ],
        hints: ['Mẫu: 14 − 5 = 9.'],
      },
      {
        type: 'compare', section: 'Tiết 3',
        q: '3. Tô màu đỏ vào những máy bay ghi phép trừ có hiệu bằng 6, màu xanh vào những máy bay ghi phép trừ có hiệu bằng 8.\n(Chọn màu cho mỗi máy bay.)',
        rows: [
          { left: '15 − 7', options: ['Đỏ', 'Xanh'], answer: 'Xanh' },
          { left: '12 − 4', options: ['Đỏ', 'Xanh'], answer: 'Xanh' },
          { left: '13 − 7', options: ['Đỏ', 'Xanh'], answer: 'Đỏ' },
          { left: '14 − 6', options: ['Đỏ', 'Xanh'], answer: 'Xanh' },
          { left: '15 − 9', options: ['Đỏ', 'Xanh'], answer: 'Đỏ' },
          { left: '14 − 8', options: ['Đỏ', 'Xanh'], answer: 'Đỏ' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Một giỏ có 15 quả măng cụt, Mai lấy ra 6 quả. Hỏi trong giỏ còn lại bao nhiêu quả măng cụt?',
        wordProblem: true,
        blanks: [{ label: 'Số quả măng cụt còn lại', answer: '9' }],
      },
      {
        type: 'compare', section: 'Tiết 3',
        q: '5. >; <; = ?',
        rows: [
          { left: 'a) 14 − 6', right: '8', answer: '=' },
          { left: '15 − 7', right: '9', answer: '<' },
          { left: 'b) 5', right: '14 − 9', answer: '=' },
          { left: '9', right: '15 − 8', answer: '>' },
          { left: 'c) 13 − 8', right: '7', answer: '<' },
          { left: '14 − 7', right: '6', answer: '>' },
        ],
      },
      {
        type: 'table', section: 'Tiết 4', blanksFirst: true,
        q: '1. a) Tính nhẩm.\nb) Số?',
        blanks: [calc('a) 16 − 7', 9), calc('17 − 8', 9), calc('18 − 9', 9), calc('16 − 8', 8), calc('17 − 9', 8), calc('16 − 9', 7)],
        tables: [{ label: 'b)', rows: [['Số bị trừ', 17, 18, 16, 17, 16, 16], ['Số trừ', 9, 9, 7, 8, 8, 9], ['Hiệu', b(8), b(9), b(9), b(9), b(8), b(7)]] }],
      },
      {
        type: 'compare', section: 'Tiết 4',
        q: '2. Tô màu xanh vào quả ghi phép trừ có hiệu lớn nhất, màu vàng vào quả ghi phép trừ có hiệu bé nhất.\n(Chọn quả cần tô cho mỗi màu.)',
        rows: [
          { left: 'Tô màu xanh:', options: ['16 − 9', '15 − 8', '15 − 9', '14 − 6', '17 − 8'], answer: '17 − 8' },
          { left: 'Tô màu vàng:', options: ['16 − 9', '15 − 8', '15 − 9', '14 − 6', '17 − 8'], answer: '15 − 9' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '3. Mai hái được 17 bông hoa, Mi hái được 8 bông hoa. Hỏi Mai hái được hơn Mi bao nhiêu bông hoa?',
        wordProblem: true,
        blanks: [{ label: 'Số bông hoa Mai hái được hơn Mi', answer: '9' }],
      },
      {
        type: 'compare', section: 'Tiết 4',
        q: '4. >; <; = ?',
        rows: [
          { left: 'a) 17 − 8', right: '9', answer: '=' },
          { left: '18 − 9', right: '8', answer: '>' },
          { left: 'b) 16 − 9', right: '15 − 7', answer: '<' },
          { left: '16 − 7', right: '14 − 6', answer: '>' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 4', img: imgB11T4Q5,
        q: '5. Số?',
        blanks: [
          { label: 'a) 17 (− 9) → ... (+ 6) → ...', answer: '8,14', validate: listValidate(['8', '14']) },
          { label: 'b) 9 (+ 7) → ... (− 8) → ...', answer: '16,8', validate: listValidate(['16', '8']) },
        ],
      },
      {
        type: 'fill', section: 'Tiết 5',
        q: '1. Số?\n(Đi từ Xuất phát đến Đích.)',
        blanks: [
          { label: 'Xuất phát → 11 − 7 = ...', boxes: true, answer: '4' },
          { label: '14 − 8 = ...', boxes: true, answer: '6' },
          { label: '11 − 6 = ...', boxes: true, answer: '5' },
          { label: '13 − 9 = ...', boxes: true, answer: '4' },
          { label: '12 − 5 = ...', boxes: true, answer: '7' },
          { label: '16 − 7 = ...', boxes: true, answer: '9' },
          { label: '13 − 6 = ...', boxes: true, answer: '7' },
          { label: '15 − 8 = ...', boxes: true, answer: '7' },
          { label: '14 − 5 = ...', boxes: true, answer: '9' },
          { label: '17 − 9 = ... → Đích', boxes: true, answer: '8' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 5',
        q: '2. Tính.',
        blanks: [
          calc('a) 9 + 6', 15), calc('6 + 9', 15), calc('15 − 9', 6), calc('15 − 6', 9),
          calc('b) 6 + 7', 13), calc('7 + 6', 13), calc('13 − 6', 7), calc('13 − 7', 6),
          calc('c) 4 + 8', 12), calc('8 + 4', 12), calc('12 − 4', 8), calc('12 − 8', 4),
        ],
        hints: ['Từ một phép cộng, ta viết được hai phép trừ: 9 + 6 = 15 nên 15 − 9 = 6 và 15 − 6 = 9.'],
      },
      {
        type: 'fill', section: 'Tiết 5',
        q: '3. Tính nhẩm.',
        blanks: [calc('a) 13 − 3 − 5', 5), calc('13 − 8', 5), calc('b) 16 − 6 − 3', 7), calc('16 − 9', 7),
          calc('c) 17 − 7 − 1', 9), calc('17 − 8', 9)],
      },
      {
        type: 'fill', section: 'Tiết 5', img: imgB11T5Q4,
        q: '4. Số?',
        blanks: [{ label: '7 (+ 8) → ... (− 6) → ... (+ 5) → ...', answer: '15,9,14', validate: listValidate(['15', '9', '14']) }],
      },
      {
        type: 'fill', section: 'Tiết 5',
        q: '5. Cô Lan có 14 quả trứng gà. Cô dùng 5 quả để làm bánh. Hỏi cô Lan còn lại bao nhiêu quả trứng gà?',
        wordProblem: true,
        blanks: [{ label: 'Số quả trứng gà còn lại', answer: '9' }],
      },
    ],
  },

  // ── BÀI 12 (trang 49–50) ──────────────────────────────────────────────────
  {
    id: 'bai-12', number: 12, title: 'Bảng trừ (qua 10)',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [calc('12 − 4', 8), calc('14 − 6', 8), calc('17 − 8', 9), calc('15 − 6', 9), calc('18 − 9', 9), calc('13 − 5', 8)],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [{ left: 'Phép tính nào dưới đây có kết quả lớn nhất?', options: ['A. 14 − 8', 'B. 12 − 3', 'C. 13 − 6', 'D. 15 − 7'], answer: 'B' }],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB12T1Q3,
        q: `3. Số?\n${mau('12 − 3')}`,
        blanks: [
          { label: '11 − ...', boxes: true, answer: '2' },
          { label: '16 − ...', boxes: true, answer: '7' },
          { label: '18 − ...', boxes: true, answer: '9' },
          { label: '17 − ...', boxes: true, answer: '8' },
          { label: '13 − ...', boxes: true, answer: '4' },
        ],
        hints: ['Mỗi phép trừ đều có kết quả bằng số 9 trên chú ếch: 12 − 3 = 9.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Cả Mai và Mi hái được 15 bông hoa, riêng Mi hái được 7 bông hoa. Hỏi Mai hái được mấy bông hoa?',
        wordProblem: true,
        blanks: [{ label: 'Số bông hoa Mai hái được', answer: '8' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính nhẩm.',
        blanks: [calc('11 − 4', 7), calc('15 − 7', 8), calc('11 − 8', 3), calc('18 − 9', 9), calc('14 − 6', 8),
          calc('12 − 7', 5), calc('13 − 5', 8), calc('16 − 9', 7), calc('17 − 9', 8)],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Tính nhẩm.',
        blanks: [calc('a) 15 − 5 − 4', 6), calc('15 − 9', 6), calc('b) 13 − 3 − 4', 6), calc('13 − 7', 6),
          calc('c) 12 − 2 − 6', 4), calc('12 − 8', 4)],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Có 13 bạn và 8 quả bóng, mỗi bạn lấy một quả. Hỏi có bao nhiêu bạn không lấy được bóng?',
        wordProblem: true,
        blanks: [{ label: 'Số bạn không lấy được bóng', answer: '5' }],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '4. >; <; = ?',
        rows: [
          { left: 'a) 12 − 5', right: '6', answer: '>' },
          { left: '13 − 8', right: '5', answer: '=' },
          { left: 'b) 14 − 9', right: '11 − 7', answer: '>' },
          { left: '15 − 9', right: '12 − 3', answer: '<' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '5. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: '12 − ... = 5', answer: '7' },
          { label: '14 − ... = 9', answer: '5' },
          { label: '16 − ... = 8', answer: '8' },
        ],
      },
    ],
  },
];
