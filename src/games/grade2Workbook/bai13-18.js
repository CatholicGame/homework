/**
 * Vở bài tập Toán 2 — Tập một: Bài 13–18 (sách trang 51–68).
 */
import {
  dsValidate, listValidate, phraseValidate, phraseListValidate, phraseOrderValidate, unitValidate,
} from '../grade3Workbook.js';
import imgBai14T1Q4 from '../../assets/grade2-workbook/bai14_t1_q4_flowchart.svg';
import imgBai14T3Q5 from '../../assets/grade2-workbook/bai14_t3_q5_triangle.svg';
import imgBai15T1Q1 from '../../assets/grade2-workbook/bai15_t1_q1_scale.png';
import imgBai15T1Q2 from '../../assets/grade2-workbook/bai15_t1_q2_scales.png';
import imgBai15T1Q3 from '../../assets/grade2-workbook/bai15_t1_q3_scales.png';
import imgBai15T2Q1 from '../../assets/grade2-workbook/bai15_t2_q1_scales.png';
import imgBai15T2Sack from '../../assets/grade2-workbook/bai15_t2_q2_sack.png';
import imgBai15T2Bag from '../../assets/grade2-workbook/bai15_t2_q2_bag.png';
import imgBai15T2Milk from '../../assets/grade2-workbook/bai15_t2_q2_milk.png';
import imgBai15T2Log from '../../assets/grade2-workbook/bai15_t2_q2_log.png';
import imgBai15T2Pig from '../../assets/grade2-workbook/bai15_t2_q2_pig.png';
import imgBai15T2Q3 from '../../assets/grade2-workbook/bai15_t2_q3_scales.png';
import imgBai15T3Q2 from '../../assets/grade2-workbook/bai15_t3_q2_scales.png';
import imgBai16T1Q1 from '../../assets/grade2-workbook/bai16_t1_q1_cups.png';
import imgBai16T1Jug3 from '../../assets/grade2-workbook/bai16_t1_q2_jug3.png';
import imgBai16T1Can10 from '../../assets/grade2-workbook/bai16_t1_q2_can10.png';
import imgBai16T1Jug5 from '../../assets/grade2-workbook/bai16_t1_q2_jug5.png';
import imgBai16T1Bucket from '../../assets/grade2-workbook/bai16_t1_q2_bucket.png';
import imgBai16T1Q3 from '../../assets/grade2-workbook/bai16_t1_q3_pour.png';
import imgBai16T2Q2 from '../../assets/grade2-workbook/bai16_t2_q2_groups.png';
import imgBai16T2Q3 from '../../assets/grade2-workbook/bai16_t2_q3_pour.png';
import imgBai16T2Q4 from '../../assets/grade2-workbook/bai16_t2_q4_jugs.png';
import imgBai17T1Q1 from '../../assets/grade2-workbook/bai17_t1_q1_scale.png';
import imgBai17T1Q2 from '../../assets/grade2-workbook/bai17_t1_q2_objects.png';
import imgBai17T1Q3 from '../../assets/grade2-workbook/bai17_t1_q3_dials.png';
import imgBai17T2Q1 from '../../assets/grade2-workbook/bai17_t2_q1_kids.png';
import imgBai17T2Q3 from '../../assets/grade2-workbook/bai17_t2_q3_bottles.png';
import imgBai18Q2 from '../../assets/grade2-workbook/bai18_q2_seesaw.png';
import imgBai18Q4 from '../../assets/grade2-workbook/bai18_q4_bags.png';

// "... = ......" / "Tính nhẩm" row: label + plain-number answer.
const eq = (label, answer) => ({ label, answer: String(answer) });
// A word written on the dotted line ("cam", "nặng hơn"): accents/case don't matter.
const word = (label, answer) => ({ label, answer, validate: phraseValidate(answer) });
// Several words in one row, in the book's order.
const words = (label, list) => ({ label, answer: list.join(','), validate: phraseListValidate(list) });
// Several numbers in one row, in the book's order.
const nums = (label, list) => ({ label, answer: list.join(','), validate: listValidate(list.map(String)) });
// "Đ, S ?" row.
const ds = (label, isTrue) => ({ label, answer: isTrue ? 'Đ' : 'S', validate: dsValidate(isTrue) });
// A table cell printed "...... kg": the child may write the unit or not.
const kgCell = (n) => ({ blank: true, answer: String(n), validate: unitValidate(n, 'kg') });
const L = '<i>l</i>';

export const BAI_13_18 = [
  // ── BÀI 13 (trang 51–52) ─────────────────────────────────────────────────
  {
    id: 'bai-13', number: 13, title: 'Bài toán về nhiều hơn, ít hơn một số đơn vị',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '1. Việt cắt được 9 bông hoa, Mai cắt được nhiều hơn Việt 4 bông hoa. Hỏi Mai cắt được bao nhiêu bông hoa?',
        blanks: [{ label: 'Số bông hoa Mai cắt được', answer: '13' }],
        hints: ['"Nhiều hơn" thì làm phép cộng: 9 + 4.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '2. Trên bờ có 8 con vịt, dưới ao có nhiều hơn trên bờ 5 con vịt. Hỏi dưới ao có bao nhiêu con vịt?',
        blanks: [{ label: 'Số con vịt dưới ao', answer: '13' }],
        hints: ['"Nhiều hơn" thì làm phép cộng: 8 + 5.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '3. Cành trên có 12 con chim, cành dưới có nhiều hơn cành trên 3 con chim. Hỏi cành dưới có bao nhiêu con chim?',
        blanks: [{ label: 'Số con chim ở cành dưới', answer: '15' }],
        hints: ['"Nhiều hơn" thì làm phép cộng: 12 + 3.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '1. Sóc nâu nhặt được 12 hạt dẻ, sóc xám nhặt được ít hơn sóc nâu 3 hạt dẻ. Hỏi sóc xám nhặt được bao nhiêu hạt dẻ?',
        blanks: [{ label: 'Số hạt dẻ sóc xám nhặt được', answer: '9' }],
        hints: ['"Ít hơn" thì làm phép trừ: 12 − 3.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '2. Giải bài toán theo tóm tắt sau:\n<i>Tóm tắt</i>\nHàng trên: 11 ô tô\nHàng dưới ít hơn hàng trên: 3 ô tô\nHàng dưới: ... ô tô?',
        blanks: [{ label: 'Số ô tô ở hàng dưới', answer: '8' }],
        hints: ['"Ít hơn" thì làm phép trừ: 11 − 3.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '3. Trên sân có 19 con vịt, số gà ít hơn số vịt 5 con. Hỏi trên sân có bao nhiêu con gà?',
        blanks: [{ label: 'Số con gà trên sân', answer: '14' }],
        hints: ['"Ít hơn" thì làm phép trừ: 19 − 5.'],
      },
    ],
  },

  // ── BÀI 14 (trang 53–56) ─────────────────────────────────────────────────
  {
    id: 'bai-14', number: 14, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [
          eq('a) 7 + 5 = ...', 12), eq('8 + 9 = ...', 17), eq('4 + 7 = ...', 11),
          eq('5 + 7 = ...', 12), eq('5 + 8 = ...', 13), eq('9 + 6 = ...', 15),
          eq('b) 11 − 5 = ...', 6), eq('13 − 4 = ...', 9), eq('15 − 8 = ...', 7),
          eq('12 − 9 = ...', 3), eq('14 − 6 = ...', 8), eq('16 − 7 = ...', 9),
        ],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối phép tính với kết quả của phép tính đó.',
        left: [
          { id: 'l1', text: '6 + 6' }, { id: 'l2', text: '11 − 7' }, { id: 'l3', text: '15 − 6' },
          { id: 'l4', text: '13 − 5' }, { id: 'l5', text: '5 + 9' }, { id: 'l6', text: '8 + 5' },
        ],
        right: [
          { id: 'r4', text: '4' }, { id: 'r8', text: '8' }, { id: 'r9', text: '9' },
          { id: 'r12', text: '12' }, { id: 'r13', text: '13' }, { id: 'r14', text: '14' },
        ],
        pairs: [['l1', 'r12'], ['l2', 'r4'], ['l3', 'r9'], ['l4', 'r8'], ['l5', 'r14'], ['l6', 'r13']],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '3. Mẹ mua về 7 quả táo và 7 quả vú sữa.\na) Hỏi mẹ mua tất cả bao nhiêu quả táo và vú sữa?\nb) Mẹ biếu bà 6 quả vú sữa. Hỏi mẹ còn lại bao nhiêu quả vú sữa?',
        blanks: [
          { label: 'a) Số quả táo và vú sữa mẹ mua', answer: '14' },
          { label: 'b) Số quả vú sữa mẹ còn lại', answer: '1' },
        ],
        hints: ['b) Mẹ có 7 quả vú sữa, biếu bà 6 quả.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai14T1Q4,
        q: '4. Số?',
        blanks: [
          { label: 'Hình thoi', answer: '8' },
          { label: 'Hình tam giác', answer: '14' },
          { label: 'Hình ngôi sao', answer: '5' },
        ],
        hints: ['Làm lần lượt theo mũi tên: 16 − 8, rồi cộng 6, rồi trừ 9.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '5. Viết số thích hợp vào chỗ chấm.',
        blanks: [eq('a) 6 + ... = 11', 5), eq('b) 14 − ... = 7', 7), eq('c) 9 + ... = 15', 6)],
        hints: ['6 cộng mấy bằng 11? Có thể lấy 11 − 6.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính nhẩm.',
        blanks: [
          eq('8 + 3 = ...', 11), eq('9 + 6 = ...', 15), eq('5 + 7 = ...', 12), eq('8 + 9 = ...', 17),
          eq('11 − 8 = ...', 3), eq('15 − 9 = ...', 6), eq('12 − 5 = ...', 7), eq('17 − 8 = ...', 9),
          eq('11 − 3 = ...', 8), eq('15 − 6 = ...', 9), eq('12 − 7 = ...', 5), eq('17 − 9 = ...', 8),
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Tính.',
        blanks: [
          eq('a) 7 + 4 + 5 = ...', 16), eq('b) 8 + 4 − 9 = ...', 3),
          eq('c) 13 − 6 + 8 = ...', 15), eq('d) 17 − 8 − 3 = ...', 6),
        ],
        hints: ['Tính lần lượt từ trái sang phải.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '3. Nam gấp được 13 cái thuyền, Việt gấp được ít hơn Nam 7 cái thuyền. Hỏi Việt gấp được bao nhiêu cái thuyền?',
        blanks: [{ label: 'Số cái thuyền Việt gấp được', answer: '6' }],
        hints: ['"Ít hơn" thì làm phép trừ: 13 − 7.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Đ, S?',
        blanks: [
          ds('a) 14 − 6 = 7', false), ds('b) 7 + 6 = 6 + 7', true),
          ds('c) 11 − 8 < 4', true), ds('d) 16 − 9 > 13 − 7', true),
        ],
        hints: ['Tính từng vế rồi so sánh: 14 − 6 = 8; 11 − 8 = 3; 16 − 9 = 7, 13 − 7 = 6.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '5. Nối (theo mẫu).',
        left: [2, 3, 4, 5, 6, 7, 8].map(n => ({ id: `n${n}`, text: String(n) })),
        right: [{ id: 'box', text: '4 < 12 − ? < 9' }],
        pairs: [['n4', 'box'], ['n5', 'box'], ['n6', 'box'], ['n7', 'box']],
        hints: ['Thử từng số: 12 − 4 = 8, 8 lớn hơn 4 và bé hơn 9 nên số 4 nối được. Có nhiều số nối được.'],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '1. Nối (theo mẫu).',
        left: [
          { id: 'l1', text: '11 − 5' }, { id: 'l2', text: '9 + 8' }, { id: 'l3', text: '12 − 7' },
          { id: 'l4', text: '8 + 8' }, { id: 'l5', text: '6 + 7' },
        ],
        right: [
          { id: 'r5', text: '5' }, { id: 'r6', text: '6' }, { id: 'r17', text: '17' },
          { id: 'r13', text: '13' }, { id: 'r16', text: '16' },
        ],
        pairs: [['l1', 'r6'], ['l2', 'r17'], ['l3', 'r5'], ['l4', 'r16'], ['l5', 'r13']],
      },
      {
        type: 'compare', section: 'Tiết 3',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Phép tính nào dưới đây có kết quả bé nhất?', options: ['A. 12 − 9', 'B. 14 − 6', 'C. 13 − 8'], answer: 'A' },
          { left: 'b) Phép tính nào dưới đây có kết quả lớn nhất?', options: ['A. 8 + 7', 'B. 9 + 9', 'C. 6 + 8'], answer: 'B' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Tính.',
        blanks: [
          eq('a) 8 + 4 − 7 = ...', 5), eq('b) 13 − 6 + 7 = ...', 14),
          eq('c) 3 + 9 + 5 = ...', 17), eq('d) 18 − 9 − 8 = ...', 1),
        ],
        hints: ['Tính lần lượt từ trái sang phải.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          eq('a) 6 + 5 = ...', 11), eq('5 + ... = 11', 6), eq('11 − ... = 5', 6), eq('11 − ... = 6', 5),
          eq('b) 9 + 6 = ...', 15), eq('... + 9 = 15', 6), eq('15 − ... = 6', 9), eq('15 − ... = 9', 6),
        ],
        hints: ['Dùng phép tính đầu tiên: 6 + 5 = 11 nên 11 − 5 = 6 và 11 − 6 = 5.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgBai14T3Q5,
        q: '5. Viết số thích hợp vào ô trống, biết rằng cộng ba số trên mỗi hàng đều có kết quả bằng 18.',
        blanks: [
          { label: 'Ô trống ở cạnh bên trái', answer: '9' },
          { label: 'Ô trống ở cạnh bên phải', answer: '6' },
          { label: 'Ô trống ở góc dưới bên phải', answer: '9' },
        ],
        hints: ['Hàng bên trái: 3 + ? + 6 = 18. Hàng dưới: 6 + 3 + ? = 18.'],
      },
    ],
  },

  // ── BÀI 15 (trang 57–60) ─────────────────────────────────────────────────
  {
    id: 'bai-15', number: 15, title: 'Ki-lô-gam',
    questions: [
      {
        type: 'choice', section: 'Tiết 1', img: imgBai15T1Q1,
        q: '1. Quan sát tranh rồi khoanh vào chữ đặt trước câu đúng.',
        options: ['4 bạn thỏ nhẹ hơn 3 bạn chó.', '4 bạn thỏ nặng hơn 3 bạn chó.', '4 bạn thỏ nặng bằng 3 bạn chó.'],
        answer: 1,
        hints: ['Đĩa cân nào thấp hơn thì bên đó nặng hơn.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai15T1Q2,
        q: '2. Quan sát tranh rồi viết “bưởi”, “cam” hoặc “táo” thích hợp vào chỗ chấm.',
        blanks: [
          word('a) Quả ... nặng hơn quả táo.', 'cam'),
          word('b) Quả bưởi nặng hơn quả ...', 'cam'),
          words('c) Quả ... nặng nhất, quả ... nhẹ nhất.', ['bưởi', 'táo']),
        ],
        hints: ['Đĩa cân nào thấp hơn thì quả ở đó nặng hơn.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai15T1Q3,
        q: '3. Quan sát tranh rồi viết số thích hợp vào chỗ chấm.',
        blanks: [
          eq('a) Gấu bông nặng bằng ... quả chanh.', 4),
          eq('b) Chó bông nặng bằng ... quả chanh.', 3),
          eq('c) Thỏ bông nặng bằng ... quả chanh.', 2),
        ],
        hints: ['Cân thăng bằng: đếm số quả chanh ở đĩa bên kia.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai15T2Q1,
        q: '1. Quan sát tranh rồi viết Đ (đúng), S (sai) vào ô trống.',
        blanks: [
          ds('a) Con chó nặng hơn 1 kg.', true),
          ds('b) Con mèo nặng hơn 1 kg.', false),
          ds('c) Con thỏ cân nặng 1 kg.', true),
          ds('d) Con chó nặng bằng con thỏ.', false),
          ds('e) Con thỏ nặng hơn con mèo.', true),
        ],
        hints: ['Mèo nhẹ hơn 1 kg, thỏ nặng 1 kg, chó nặng hơn 1 kg.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. Nối (theo mẫu).',
        left: [
          { id: 'sack', img: imgBai15T2Sack, text: 'Hai mươi ki-lô-gam' },
          { id: 'bag', img: imgBai15T2Bag, text: 'Năm ki-lô-gam' },
          { id: 'milk', img: imgBai15T2Milk, text: 'Hai ki-lô-gam' },
          { id: 'log', img: imgBai15T2Log, text: 'Ba mươi lăm ki-lô-gam' },
          { id: 'pig', img: imgBai15T2Pig, text: 'Một trăm ki-lô-gam' },
        ],
        right: [
          { id: 'k20', text: '20 kg' }, { id: 'k5', text: '5 kg' }, { id: 'k100', text: '100 kg' },
          { id: 'k2', text: '2 kg' }, { id: 'k35', text: '35 kg' },
        ],
        pairs: [['sack', 'k20'], ['bag', 'k5'], ['milk', 'k2'], ['log', 'k35'], ['pig', 'k100']],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai15T2Q3,
        q: '3. Quan sát tranh.\na) Viết “nặng hơn”, “nặng bằng” hoặc “nhẹ hơn” thích hợp vào chỗ chấm.\nb) Đ, S?',
        blanks: [
          words('a) Quả bí ngô ... 1 kg; quả dưa hấu ... 1 kg; nải chuối ... 1 kg.', ['nặng bằng', 'nhẹ hơn', 'nặng hơn']),
          ds('b) • Quả dưa hấu nặng nhất.', false),
          ds('• Quả bí ngô nhẹ nhất.', false),
          ds('• Nải chuối nặng nhất.', true),
        ],
        hints: ['Dưa hấu cùng một quả táo mới nặng bằng 1 kg; nải chuối nặng bằng 1 kg cùng một quả cam.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          eq('a) 40 kg + 20 kg = ... kg', 60), eq('60 kg − 20 kg = ... kg', 40), eq('60 kg − 40 kg = ... kg', 20),
          eq('b) 30 kg + 7 kg = ... kg', 37), eq('37 kg − 7 kg = ... kg', 30), eq('37 kg − 30 kg = ... kg', 7),
        ],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgBai15T3Q2,
        q: '2. Quan sát tranh rồi viết số thích hợp vào chỗ chấm.',
        blanks: [
          eq('a) Túi gạo cân nặng ... kg.', 6),
          eq('Túi đường cân nặng ... kg.', 3),
          eq('b) Cả túi gạo và túi đường cân nặng ... kg.', 9),
          eq('Túi gạo nặng hơn túi đường ... kg.', 3),
        ],
        hints: ['Cân thăng bằng: cộng các quả cân ở đĩa bên kia (1 kg + 5 kg).'],
      },
      {
        type: 'compare', section: 'Tiết 3',
        q: '3. Có ba bao thóc, bao thứ nhất nặng hơn bao thứ hai 10 kg, bao thứ hai nặng hơn bao thứ ba 10 kg.\na) Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: '• Bao thóc nào nặng nhất?', options: ['A. Bao thứ nhất', 'B. Bao thứ hai', 'C. Bao thứ ba'], answer: 'A' },
          { left: '• Bao thóc nào nhẹ nhất?', options: ['A. Bao thứ nhất', 'B. Bao thứ hai', 'C. Bao thứ ba'], answer: 'C' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Có ba bao thóc, bao thứ nhất nặng hơn bao thứ hai 10 kg, bao thứ hai nặng hơn bao thứ ba 10 kg.\nb) Viết số thích hợp vào chỗ chấm.\nBiết bao thứ hai cân nặng 50 kg. Khi đó:',
        blanks: [
          eq('• Bao thứ nhất cân nặng ... kg.', 60),
          eq('• Bao thứ ba cân nặng ... kg.', 40),
        ],
        hints: ['Bao thứ nhất nặng hơn bao thứ hai 10 kg; bao thứ ba nhẹ hơn bao thứ hai 10 kg.'],
      },
    ],
  },

  // ── BÀI 16 (trang 61–63) ─────────────────────────────────────────────────
  {
    id: 'bai-16', number: 16, title: 'Lít',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgBai16T1Q1,
        q: `1. Quan sát hình rồi viết Đ (đúng), S (sai) vào ô trống.`,
        blanks: [
          ds(`a) Bình D đựng nhiều hơn 1 ${L} nước.`, true),
          ds(`b) Cốc A đựng ít hơn 1 ${L} nước.`, true),
          ds('c) Bình C đựng lượng nước bằng lượng nước ở ca B.', true),
          ds('d) Cốc A đựng lượng nước nhiều hơn bình D.', false),
        ],
        hints: [`Ca B và bình C đều đựng 1 ${L}. Cốc A ít nước hơn, bình D nhiều nước hơn.`],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. a) Nối (theo mẫu).',
        left: [
          { id: 'j3', img: imgBai16T1Jug3 }, { id: 'c10', img: imgBai16T1Can10 },
          { id: 'j5', img: imgBai16T1Jug5 }, { id: 'b20', img: imgBai16T1Bucket },
        ],
        right: [
          { id: 'w10', text: 'Mười lít' }, { id: 'w3', text: 'Ba lít' },
          { id: 'w20', text: 'Hai mươi lít' }, { id: 'w5', text: 'Năm lít' },
        ],
        pairs: [['j3', 'w3'], ['c10', 'w10'], ['j5', 'w5'], ['b20', 'w20']],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '2. b) Trong các đồ vật ở câu a: Tô màu đỏ vào đồ vật chứa được nhiều nước nhất, màu xanh vào đồ vật chứa được ít nước nhất.',
        rows: [
          { left: 'Đồ vật tô màu đỏ:', options: ['A. Ca 3 l', 'B. Can 10 l', 'C. Ca 5 l', 'D. Xô 20 l'], answer: 'D' },
          { left: 'Đồ vật tô màu xanh:', options: ['A. Ca 3 l', 'B. Can 10 l', 'C. Ca 5 l', 'D. Xô 20 l'], answer: 'A' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai16T1Q3,
        q: '3. Viết số thích hợp vào chỗ chấm.\nRót hết nước từ bình A và bình B được đầy các cốc nước (như hình vẽ).',
        blanks: [
          nums('a) Lượng nước ở bình A là ... cốc. Lượng nước ở bình B là ... cốc.', [8, 5]),
          eq('b) Lượng nước ở cả hai bình là ... cốc.', 13),
        ],
        hints: ['Đếm số cốc dưới mỗi bình.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          eq(`a) 30 ${L} + 10 ${L} = ... ${L}`, 40), eq(`35 ${L} + 30 ${L} = ... ${L}`, 65), eq(`48 ${L} + 20 ${L} = ... ${L}`, 68),
          eq(`b) 50 ${L} − 30 ${L} = ... ${L}`, 20), eq(`39 ${L} − 9 ${L} = ... ${L}`, 30), eq(`47 ${L} − 40 ${L} = ... ${L}`, 7),
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai16T2Q2,
        q: '2. Số?',
        blanks: [
          eq(`Khung thứ hai: ... ${L}`, 10),
          eq(`Khung thứ ba: ... ${L}`, 15),
          eq(`Khung ở hàng dưới: ... ${L}`, 11),
        ],
        hints: [`Cộng số lít của các đồ vật trong mỗi khung (mẫu: 2 ${L} + 3 ${L} = 5 ${L}).`],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai16T2Q3,
        q: '3. Số?',
        blanks: [
          eq(`Khung thứ hai: ... ${L}`, 8),
          eq(`Khung thứ ba: ... ${L}`, 10),
        ],
        hints: [`Số lít còn lại trong can (mẫu: 8 ${L} − 3 ${L} = 5 ${L}).`],
      },
      {
        type: 'table', section: 'Tiết 2', img: imgBai16T2Q4,
        q: '4. Mỗi đồ vật đựng số lít nước ứng với các ca nước bên cạnh (như hình vẽ).\na) Số?',
        headers: ['Đồ vật', 'Ấm', 'Bình', 'Can', 'Xô'],
        rows: [['Số lít nước', 4, { blank: true, answer: '3' }, { blank: true, answer: '9' }, { blank: true, answer: '6' }]],
        blanks: [{
          label: 'b) Viết tên các đồ vật theo thứ tự từ đựng ít nước nhất đến đựng nhiều nước nhất:',
          answer: 'Bình, Ấm, Xô, Can', validate: phraseOrderValidate(['Bình', 'Ấm', 'Xô', 'Can']),
        }],
        hints: [`Cộng số lít ghi trên các ca: can có 3 ${L} + 2 ${L} + 2 ${L} + 2 ${L}.`],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: `5. Trong can to có 15 ${L} nước mắm. Mẹ đã rót nước mắm từ can to vào đầy một can 5 ${L}. Hỏi trong can to còn lại bao nhiêu lít nước mắm?`,
        blanks: [{ label: 'Số lít nước mắm còn lại', answer: '10' }],
        hints: ['Làm phép trừ: 15 − 5.'],
      },
    ],
  },

  // ── BÀI 17 (trang 64–66) ─────────────────────────────────────────────────
  {
    id: 'bai-17', number: 17, title: 'Thực hành và trải nghiệm với các đơn vị ki-lô-gam, lít',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgBai17T1Q1,
        q: '1. a) Em cầm quyển sách, rồi cầm cái bút chì.\nEm ước lượng xem quyển sách nặng hơn hay nhẹ hơn bút chì rồi viết “nặng hơn”, “nhẹ hơn” thích hợp vào chỗ chấm.\nb) Quan sát hình bên rồi viết “nặng hơn”, “nhẹ hơn” hoặc “cân nặng” thích hợp vào chỗ chấm.',
        blanks: [
          word('a) Quyển sách ... bút chì.', 'nặng hơn'),
          word('Bút chì ... quyển sách.', 'nhẹ hơn'),
          word('b) 5 quyển sách ... 1 kg.', 'cân nặng'),
        ],
        hints: ['b) Cân thăng bằng thì hai bên nặng bằng nhau.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai17T1Q2,
        q: '2. Em ước lượng vật nào nặng hơn, vật nào nhẹ hơn, rồi viết “nặng hơn”, “nhẹ hơn” thích hợp vào chỗ chấm.',
        blanks: [
          word('a) Quyển sách ... bút mực.', 'nặng hơn'),
          word('Bút mực ... quyển sách.', 'nhẹ hơn'),
          word('b) Bút chì ... hộp bút.', 'nhẹ hơn'),
          word('Hộp bút ... bút chì.', 'nặng hơn'),
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai17T1Q3,
        q: '3. Quan sát tranh rồi viết số thích hợp vào chỗ chấm.',
        blanks: [
          nums('a) Túi cà phê cân nặng ... kg. Túi gạo cân nặng ... kg.', [5, 7]),
          eq('b) Túi gạo và túi cà phê cân nặng tất cả ... kg.', 12),
          eq('c) Túi gạo nặng hơn túi cà phê ... kg.', 2),
        ],
        hints: ['Xem kim của mỗi cân chỉ vào số mấy.'],
      },
      {
        type: 'table', section: 'Tiết 2', img: imgBai17T2Q1,
        q: '1. Quan sát tranh rồi viết tiếp vào chỗ chấm cho thích hợp.',
        headers: ['Tên', 'Việt', 'Rô-bốt', 'Nam', 'Mai'],
        rows: [['Cân nặng', '24 kg', kgCell(20), kgCell(25), kgCell(23)]],
        blanks: [words('Bạn ... cân nặng nhất. Bạn ... cân nhẹ nhất.', ['Nam', 'Rô-bốt'])],
        hints: ['Việt cân nặng 24 kg. Mai là bạn gái; bạn trai còn lại là Nam.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai17T2Q3,
        q: '3. Viết số thích hợp vào chỗ chấm.\nMỗi bình A và B chứa được số cốc nước như hình dưới đây.',
        blanks: [
          eq('a) Bình A chứa được ... cốc nước.', 10),
          eq('Bình B chứa được ... cốc nước.', 8),
          eq('b) Cả hai bình chứa được ... cốc nước.', 18),
          eq('c) Bình A chứa được nhiều hơn bình B ... cốc nước.', 2),
        ],
        hints: ['Đếm số cốc bên cạnh mỗi bình.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `4. Viết số thích hợp vào chỗ chấm.\nDùng ca 1 ${L} múc nước ở trong thùng đổ vào xô đỏ 4 ca đầy nước và vào xô xanh 5 ca đầy nước. Khi đó:`,
        blanks: [
          eq(`a) Xô đỏ có ... ${L} nước.`, 4),
          eq(`b) Xô xanh có ... ${L} nước.`, 5),
        ],
        hints: [`Mỗi ca đựng 1 ${L} nước.`],
      },
    ],
  },

  // ── BÀI 18 (trang 67–68) ─────────────────────────────────────────────────
  {
    id: 'bai-18', number: 18, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          eq('a) 20 kg + 50 kg = ... kg', 70), eq('31 kg + 22 kg = ... kg', 53),
          eq('70 kg − 20 kg = ... kg', 50), eq('53 kg − 22 kg = ... kg', 31),
          eq(`b) 40 ${L} + 30 ${L} = ... ${L}`, 70), eq(`23 ${L} + 14 ${L} = ... ${L}`, 37),
          eq(`70 ${L} − 30 ${L} = ... ${L}`, 40), eq(`37 ${L} − 23 ${L} = ... ${L}`, 14),
        ],
      },
      {
        type: 'fill', img: imgBai18Q2,
        q: '2. Viết số thích hợp vào chỗ chấm.\nThỏ, gà, chó chơi cầu thăng bằng. Biết cả hai trường hợp dưới đây cầu đều thăng bằng.',
        blanks: [
          eq('a) Một con thỏ nặng bằng ... con gà.', 2),
          eq('b) Một con chó nặng bằng ... con thỏ.', 2),
          eq('c) Một con chó nặng bằng ... con gà.', 4),
        ],
        hints: ['Bỏ bớt ở mỗi bên cầu một con giống nhau, cầu vẫn thăng bằng.', 'Một con chó nặng bằng 2 con thỏ, mỗi con thỏ nặng bằng 2 con gà.'],
      },
      {
        type: 'fill', wordProblem: true,
        q: `3. Tại cửa hàng bán xăng, một người đi ô tô vào mua 30 ${L} xăng, một người đi xe máy vào mua 3 ${L} xăng. Hỏi cả hai người mua bao nhiêu lít xăng?`,
        blanks: [{ label: 'Số lít xăng cả hai người mua', answer: '33' }],
        hints: ['Làm phép cộng: 30 + 3.'],
      },
      {
        type: 'compare', img: imgBai18Q4,
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nCó năm túi gạo sau:',
        rows: [
          { left: 'a) Muốn lấy hai túi để được 11 kg gạo thì phải lấy ra hai túi gạo nào?', options: ['A. Túi N và túi P', 'B. Túi Q và túi S', 'C. Túi N và túi S'], answer: 'C' },
          { left: 'b) Muốn lấy ba túi để được 17 kg gạo thì phải lấy ra ba túi gạo nào?', options: ['A. Túi N, túi P và túi Q', 'B. Túi N, túi P và túi S', 'C. Túi P, túi Q và túi S'], answer: 'B' },
        ],
        hints: ['Cộng số ki-lô-gam của các túi trong từng đáp án.'],
      },
    ],
  },
];
