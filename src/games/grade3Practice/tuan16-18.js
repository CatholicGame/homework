/**
 * Luyện tập Toán 3 — Tập Một: Tuần 16, 17, 18 và Tự kiểm tra cuối học kì 1
 * (sách trang 55–67; đáp án bài 4 mỗi tiết và câu 4, 8 bài kiểm tra ở trang 71).
 */

import {
  blank, exprValidate, dsValidate, letterValidate, unitValidate, nameSetValidate,
} from '../grade3Workbook.js';
import imgT16T1Q3Scale from '../../assets/grade3-practice/tuan16_t1_q3_scale.png';
import imgT17T3Q1Shapes from '../../assets/grade3-practice/tuan17_t3_q1_shapes.svg';
import imgT18T1Q2Scale from '../../assets/grade3-practice/tuan18_t1_q2_scale.png';
import imgT18T1Q3Square from '../../assets/grade3-practice/tuan18_t1_q3_square.svg';
import imgT18T1Q4Rect from '../../assets/grade3-practice/tuan18_t1_q4_rect.svg';
import imgT18T2Q2Angles from '../../assets/grade3-practice/tuan18_t2_q2_angles.svg';
import imgT18T2Q4Scale from '../../assets/grade3-practice/tuan18_t2_q4_scale.png';
import imgT18T3Q1Groups from '../../assets/grade3-practice/tuan18_t3_q1_groups.png';
import imgT18T3Q2Ant from '../../assets/grade3-practice/tuan18_t3_q2_ant.png';
import imgKtQ1Figures from '../../assets/grade3-practice/kthk1_q1_figures.svg';
import imgKtQ2Octopus from '../../assets/grade3-practice/kthk1_q2_octopus.png';
import imgKtQ3Square from '../../assets/grade3-practice/kthk1_q3_square.svg';
import imgKtQ5Vegetables from '../../assets/grade3-practice/kthk1_q5_vegetables.png';

// Tuần 16 Tiết 2 Q4: "☐ : ☐ = ☐ : ☐" with four different numbers chosen from
// 2, 3, 200, 250, 300. Any true arrangement is accepted (300 : 3 = 200 : 2 or
// 200 : 2 = 300 : 3), not just the one in the answer key.
function ratioBoxesValidate(value) {
  const nums = String(value).split(',').map(s => Number(s.replace(/\s+/g, '')));
  if (nums.length !== 4 || nums.some(n => !Number.isInteger(n) || n <= 0)) return false;
  if (new Set(nums).size !== 4 || !nums.every(n => [2, 3, 200, 250, 300].includes(n))) return false;
  const [a, b, c, d] = nums;
  return a % b === 0 && c % d === 0 && a / b === c / d;
}

const L = (ch) => blank(ch, { validate: letterValidate(ch) });

export const WEEKS_16_18 = [
  {
    id: 'tuan-16', number: 16, title: 'Tính giá trị của biểu thức số (tiếp theo). So sánh số lớn gấp mấy lần số bé',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính giá trị của biểu thức.',
        blanks: [
          { label: 'a) (48 − 13) : 7 = ...', answer: '35 : 7', validate: exprValidate('35 : 7') },
          { label: '= ...', answer: '5' },
          { label: 'b) 135 : (60 − 55) = ...', answer: '135 : 5', validate: exprValidate('135 : 5') },
          { label: '= ...', answer: '27' },
          { label: 'c) 90 : (15 : 3) = ...', answer: '90 : 5', validate: exprValidate('90 : 5') },
          { label: '= ...', answer: '18' },
          { label: 'd) 15 × (45 : 9) = ...', answer: '15 × 5', validate: exprValidate('15 × 5') },
          { label: '= ...', answer: '75' },
        ],
        hints: ['Biểu thức có dấu ngoặc thì tính trong ngoặc trước: 48 − 13 = 35, rồi 35 : 7.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Tính rồi so sánh giá trị của mỗi cặp biểu thức dưới đây.',
        blanks: [
          { label: 'a) (321 − 100) × 2 = ...', answer: '221 × 2', validate: exprValidate('221 × 2') },
          { label: '= ...', answer: '442' },
          { label: '321 − 100 × 2 = ...', answer: '321 − 200', validate: exprValidate('321 − 200') },
          { label: '= ...', answer: '121' },
          { label: 'Vậy (321 − 100) × 2 ... 321 − 100 × 2.', boxes: true, answer: '>' },
          { label: 'b) 90 + 9 : 9 = ...', answer: '90 + 1', validate: exprValidate('90 + 1') },
          { label: '= ...', answer: '91' },
          { label: '(90 + 9) : 9 = ...', answer: '99 : 9', validate: exprValidate('99 : 9') },
          { label: '= ...', answer: '11' },
          { label: 'Vậy 90 + 9 : 9 ... (90 + 9) : 9.', boxes: true, answer: '>' },
        ],
        hints: ['Có ngoặc thì tính trong ngoặc trước; không có ngoặc thì nhân, chia trước, cộng, trừ sau. Viết dấu >, < hoặc = vào ô trống.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgT16T1Q3Scale,
        q: '3. Quan sát hình vẽ dưới đây. Tính khối lượng của một chiếc ô tô, biết các chiếc ô tô có số cân nặng bằng nhau.',
        wordProblem: true,
        blanks: [{ label: 'Khối lượng của một chiếc ô tô (g)', answer: '250' }],
        hints: ['Cân thăng bằng: hai chiếc ô tô nặng bằng 200 g + 300 g = 500 g. Một chiếc ô tô nặng 500 : 2.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết số thích hợp vào chỗ chấm.\nRô-bốt thấy 5 con chuột túi mẹ và 5 con chuột túi con. Những con chuột túi con đang ở trong túi của mẹ chúng. Do đó, Rô-bốt chỉ quan sát được đầu và 2 chân trước của những con chuột túi con. Biết mỗi con chuột túi có 2 chân trước và 2 chân sau.',
        blanks: [
          { label: 'Vậy tổng số chân chuột túi mà Rô-bốt quan sát được là ... cái chân.', answer: '30' },
        ],
        hints: ['5 con chuột túi mẹ có 4 × 5 = 20 cái chân; 5 con chuột túi con chỉ thấy 2 × 5 = 10 cái chân.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Đoạn thẳng AB dài 45 cm. Đoạn thẳng AC dài 5 cm. Vậy đoạn thẳng AB dài gấp ... lần đoạn thẳng AC.', answer: '9' },
          { label: 'b) Mẹ của Mai 32 tuổi. Mai 8 tuổi. Vậy số tuổi của mẹ gấp ... lần số tuổi của Mai.', answer: '4' },
        ],
        hints: ['Muốn biết số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 45 : 5, 32 : 8.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Giá trị của biểu thức 144 − 144 : 4 là:', options: ['A. 0', 'B. 36', 'C. 72', 'D. 108'], answer: 'D' },
          { left: 'b) Giá trị của biểu thức (144 − 144) : 4 là:', options: ['A. 0', 'B. 36', 'C. 72', 'D. 108'], answer: 'A' },
        ],
        hints: ['a) Chia trước: 144 : 4 = 36, rồi 144 − 36. b) Tính trong ngoặc trước: 144 − 144 = 0, rồi 0 : 4.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Trang trại có 108 con lạc đà một bướu và 9 con lạc đà hai bướu. Hỏi số lạc đà một bướu gấp bao nhiêu lần số lạc đà hai bướu?',
        wordProblem: true,
        blanks: [{ label: 'Số lạc đà một bướu gấp số lạc đà hai bướu (lần)', answer: '12' }],
        hints: ['Lấy số lớn chia cho số bé: 108 : 9.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nViệt chọn bốn số khác nhau trong nhóm các số 2, 3, 200, 250 và 300 để điền vào các ô trống sau để được so sánh đúng:\n☐ : ☐ = ☐ : ☐',
        blanks: [
          { label: '... : ... = ... : ...', answer: '300,3,200,2', validate: ratioBoxesValidate },
          { label: 'Vậy để nhận được phép so sánh đúng thì Việt không thể chọn số ...', answer: '250' },
        ],
        hints: ['Thử chia các số tròn trăm cho 2 hoặc 3: 300 : 3 = 100, 200 : 2 = 100. Số nào không dùng đến?'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Đ, S?',
        blanks: [
          { label: 'a) 100 − 20 + 40 = 120', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) 112 − 45 + 5 = 62', answer: 'S', validate: dsValidate(false) },
          { label: 'c) 100 : 2 × 5 = 10', answer: 'S', validate: dsValidate(false) },
          { label: 'd) 120 : 6 × 2 = 40', answer: 'Đ', validate: dsValidate(true) },
          { label: 'e) 8 × 8 − 8 = 0', answer: 'S', validate: dsValidate(false) },
          { label: 'g) 27 + 63 : 3 = 30', answer: 'S', validate: dsValidate(false) },
          { label: 'h) 8 × (25 − 19) = 48', answer: 'Đ', validate: dsValidate(true) },
          { label: 'i) (12 + 8) × 4 = 80', answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['Chỉ có cộng, trừ (hoặc chỉ có nhân, chia) thì tính từ trái sang phải: 112 − 45 + 5 = 67 + 5; 100 : 2 × 5 = 50 × 5. Có cả cộng/trừ và nhân/chia thì nhân, chia trước: 27 + 63 : 3 = 27 + 21.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Tính rồi so sánh giá trị của mỗi cặp biểu thức dưới đây.',
        blanks: [
          { label: 'a) 56 : (4 × 2) = ...', answer: '56 : 8', validate: exprValidate('56 : 8') },
          { label: '= ...', answer: '7' },
          { label: '56 : 4 × 2 = ...', answer: '14 × 2', validate: exprValidate('14 × 2') },
          { label: '= ...', answer: '28' },
          { label: 'Vậy 56 : (4 × 2) ... 56 : 4 × 2.', boxes: true, answer: '<' },
          { label: 'b) 100 − 50 × 2 = ...', answer: '100 − 100', validate: exprValidate('100 − 100') },
          { label: '= ...', answer: '0' },
          { label: '100 − (50 × 2) = ...', answer: '100 − 100', validate: exprValidate('100 − 100') },
          { label: '= ...', answer: '0' },
          { label: 'Vậy 100 − 50 × 2 ... 100 − (50 × 2).', boxes: true, answer: '=' },
        ],
        hints: ['56 : 4 × 2 chỉ có nhân, chia nên tính từ trái sang phải: 56 : 4 = 14, rồi 14 × 2.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Tổng cân nặng của 3 chiếc cốc là 873 g. Biết những chiếc cốc này có cùng cân nặng. Hỏi mỗi chiếc cốc nặng bao nhiêu gam?',
        wordProblem: true,
        blanks: [{ label: 'Mỗi chiếc cốc nặng (g)', answer: '291' }],
        hints: ['Chia tổng cân nặng cho số cốc: 873 : 3.'],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nMỗi đội bóng của Trường Tiểu học Kim Đồng có 4 bạn nam và 4 bạn nữ. Có 19 bạn nam và 22 bạn nữ đã đăng kí tham gia các đội bóng của trường. Hỏi nhà trường cần tuyển thêm bao nhiêu bạn nam và bao nhiêu bạn nữ để đủ thành viên cho 6 đội bóng?',
        options: ['1 bạn nam và 2 bạn nữ', '3 bạn nam và 2 bạn nữ', '5 bạn nam và 2 bạn nữ', '3 bạn nam và 0 bạn nữ'],
        answer: 2,
        hints: ['6 đội bóng cần 4 × 6 = 24 bạn nam và 24 bạn nữ.'],
      },
    ],
  },
  {
    id: 'tuan-17', number: 17, title: 'Luyện tập chung. Ôn tập phép nhân, phép chia trong phạm vi 100, 1 000. Ôn tập biểu thức số',
    questions: [
      {
        type: 'choice', section: 'Tiết 1',
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.\nMai có một gói 24 chiếc kẹo. Bạn ấy đã chia đều số kẹo đó cho các bạn của mình thì vừa đủ, không thừa chiếc nào. Hỏi trong các số dưới đây, số nào không thể là số bạn Mai đã cho kẹo?',
        options: ['2', '3', '4', '5'],
        answer: 3,
        hints: ['Thử chia 24 cho từng số: phép chia nào có dư?'],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Viết số thích hợp vào ô trống.',
        tables: [
          { label: 'a)', rows: [[124, '×', 3, '=', blank(372)], [blank(49), '×', 5, '=', 245]] },
          { label: 'b)', rows: [[812, ':', 4, '=', blank(203)], [blank(636), ':', 6, '=', 106]] },
        ],
        hints: ['Tìm thừa số chưa biết: lấy tích chia cho thừa số đã biết (245 : 5). Tìm số bị chia: lấy thương nhân với số chia (106 × 6).'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Năm nay, ông 72 tuổi. Biết số tuổi của ông giảm đi 6 lần thì được số tuổi của anh Tùng. Hỏi năm nay anh Tùng bao nhiêu tuổi?',
        wordProblem: true,
        blanks: [{ label: 'Số tuổi của anh Tùng', answer: '12' }],
        hints: ['Giảm đi 6 lần thì chia cho 6: 72 : 6.'],
      },
      {
        type: 'choice', section: 'Tiết 1',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nCâu lạc bộ Bóng rổ của Trường Tiểu học Kim Đồng có khoảng từ 17 đến 26 thành viên. Biết số thành viên nam gấp đôi số thành viên nữ. Hỏi trong các số dưới đây, số nào có thể là số thành viên của câu lạc bộ đó?',
        options: ['19', '21', '22', '25'],
        answer: 1,
        hints: ['Số thành viên nam gấp đôi số thành viên nữ nên tổng số thành viên gấp 3 lần số thành viên nữ — tổng số chia hết cho 3.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Dựa vào kết quả của các phép tính để giải mã các ô chữ dưới đây (theo mẫu).',
        tables: [
          { rows: [['S', '117 : 9'], ['H', '93 : 3'], ['T', '48 : 4']] },
          { rows: [['A', '16 × 2'], ['N', '180 : 6'], ['C', '88 : 8']] },
          { rows: [[12, 31, 32, 11, 31], ['T', L('H'), L('A'), L('C'), L('H')]] },
          { rows: [[13, 32, 30, 31], [L('S'), L('A'), L('N'), L('H')]] },
        ],
        hints: ['Tính kết quả của cả 6 phép tính: S = 13, H = 31, T = 12, A = 32, N = 30, C = 11. Viết chữ ứng với mỗi số vào ô bên dưới.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Nam vừa tính giá trị của một số biểu thức. Mai đã giúp Nam kiểm tra lại và phát hiện ra Nam tính giá trị của một số biểu thức chưa đúng. Hãy tìm và sửa lại cho đúng.\na) 35 : 5 + 2 = 35 : 7\n= 5\nb) 63 − 60 : 10 = 63 − 6\n= 58\nc) 72 : 8 × 9 = 72 : 72\n= 1',
        blanks: [
          { label: 'a) 35 : 5 + 2 = ...', answer: '7 + 2', validate: exprValidate('7 + 2') },
          { label: '= ...', answer: '9' },
          { label: 'b) 63 − 60 : 10 = ...', answer: '63 − 6', validate: exprValidate('63 − 6') },
          { label: '= ...', answer: '57' },
          { label: 'c) 72 : 8 × 9 = ...', answer: '9 × 9', validate: exprValidate('9 × 9') },
          { label: '= ...', answer: '81' },
        ],
        hints: ['Có cộng và chia thì chia trước (35 : 5); chỉ có nhân và chia thì tính từ trái sang phải (72 : 8 trước). Kiểm tra lại cả phép trừ 63 − 6.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Nam dùng 12 que gỗ như nhau để xếp thành một khối lập phương. Biết Nam đã xếp được 7 khối lập phương. Hỏi:\na) Nam đã dùng tất cả bao nhiêu que gỗ?\nb) Nếu Nam dùng số que gỗ đó để xếp các hình tam giác, mỗi hình gồm 3 que gỗ và được xếp rời nhau, thì Nam xếp được bao nhiêu hình tam giác?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số que gỗ Nam đã dùng', answer: '84' },
          { label: 'b) Số hình tam giác Nam xếp được', answer: '28' },
        ],
        hints: ['a) 7 khối, mỗi khối 12 que: 12 × 7. b) Mỗi hình tam giác 3 que: lấy số que gỗ chia cho 3.'],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nMai vừa viết hai số liên tiếp lên một viên đá. Biết tổng của hai số đó là 9. Hỏi tích của hai số đó là bao nhiêu?',
        options: ['9', '16', '20', '25'],
        answer: 2,
        hints: ['Hai số liên tiếp có tổng bằng 9 là 4 và 5.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgT17T3Q1Shapes,
        q: '1. Số?\nĐã tô màu một phần mấy của mỗi hình?',
        blanks: [
          { label: 'a) 1/...', boxes: true, answer: '3' },
          { label: 'b) 1/...', boxes: true, answer: '4' },
          { label: 'c) 1/...', boxes: true, answer: '9' },
        ],
        hints: ['Đếm xem mỗi hình được chia thành mấy phần bằng nhau; đã tô màu 1 phần.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Tính giá trị của biểu thức.',
        blanks: [
          { label: 'a) 54 − 54 : 6 = ...', answer: '54 − 9', validate: exprValidate('54 − 9') },
          { label: '= ...', answer: '45' },
          { label: 'b) 12 × (4 : 2) = ...', answer: '12 × 2', validate: exprValidate('12 × 2') },
          { label: '= ...', answer: '24' },
          { label: 'c) 88 : 4 : 2 = ...', answer: '22 : 2', validate: exprValidate('22 : 2') },
          { label: '= ...', answer: '11' },
          { label: 'd) 145 + 55 : 5 = ...', answer: '145 + 11', validate: exprValidate('145 + 11') },
          { label: '= ...', answer: '156' },
        ],
        hints: ['Nhân, chia trước, cộng, trừ sau; có ngoặc thì tính trong ngoặc trước; chỉ có phép chia thì tính từ trái sang phải.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Nhà Pao có 10 con dê. Biết mỗi ngày các con dê đó ăn hết 5 bó cỏ. Hỏi nếu có 125 bó cỏ thì đủ cho các con dê ăn trong bao nhiêu ngày?',
        wordProblem: true,
        blanks: [{ label: 'Số ngày', answer: '25' }],
        hints: ['Cả 10 con dê mỗi ngày ăn hết 5 bó cỏ, nên lấy 125 chia cho 5.'],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nMỗi que kem có giá 1 đô la, nhưng nhà hàng khuyến mãi mua 6 que kem chỉ phải trả 5 đô la. Hỏi với 16 đô la thì Rô-bốt mua được nhiều nhất bao nhiêu que kem?',
        options: ['16 que kem', '17 que kem', '18 que kem', '19 que kem'],
        answer: 3,
        hints: ['15 đô la mua được 3 lần khuyến mãi: 6 × 3 = 18 que kem; còn 1 đô la mua thêm 1 que.'],
      },
    ],
  },
  {
    id: 'tuan-18', number: 18, title: 'Ôn tập biểu thức số (tiếp theo). Ôn tập hình học và đo lường. Ôn tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) 8 kg = ... g', answer: '8000' },
          { label: '1 000 g = ... kg', answer: '1' },
          { label: '600 g : 3 = ... g', answer: '200' },
          { label: 'b) 4 l = ... ml', answer: '4000' },
          { label: '1 000 ml = ... l', answer: '1' },
          { label: '120 ml × 5 = ... ml', answer: '600' },
        ],
        hints: ['1 kg = 1 000 g; 1 l = 1 000 ml.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgT18T1Q2Scale,
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp.\nBiết hai con gấu có số cân nặng bằng nhau.',
        blanks: [{ label: 'Một con gấu cân nặng ...', answer: '300 g', validate: unitValidate(300, 'g') }],
        hints: ['Hai con gấu nặng bằng ba quả cân 200 g: 200 × 3 = 600 (g). Một con gấu nặng 600 : 2.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgT18T1Q3Square,
        q: '3. Cho hình vuông ABCD cạnh 24 cm, E là trung điểm của cạnh AB. Tính độ dài đoạn thẳng AE.',
        wordProblem: true,
        blanks: [{ label: 'Độ dài đoạn thẳng AE (cm)', answer: '12' }],
        hints: ['Cạnh AB dài 24 cm. E là trung điểm của AB nên AE bằng một nửa AB: 24 : 2.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgT18T1Q4Rect,
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nViệt ghép hai hình vuông thành một hình chữ nhật (như hình vẽ).',
        blanks: [{ label: 'Chiều dài hình chữ nhật là ...', answer: '214 mm', validate: unitValidate(214, 'mm') }],
        hints: ['Cạnh hình vuông dài 107 mm. Chiều dài hình chữ nhật gồm 2 cạnh hình vuông: 107 × 2.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Dựa vào giá trị của mỗi biểu thức để giải mã các ô chữ dưới đây (theo mẫu).',
        tables: [
          { rows: [['Â', '20 − 20 : 2'], ['M', '4 + 6 × 2'], ['N', '6 : (2 × 3)']] },
          { rows: [['G', '(20 − 20) : 2'], ['O', '(4 + 6) × 2'], ['T', '6 : 2 × 3']] },
          { rows: [[16, 10, 9], ['M', L('Â'), L('T')]] },
          { rows: [[20, 1, 0], [L('O'), L('N'), L('G')]] },
        ],
        hints: ['Tính giá trị của cả 6 biểu thức: Â = 10, M = 16, N = 1, G = 0, O = 20, T = 9.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgT18T2Q2Angles,
        q: '2. Dùng ê ke kiểm tra góc vuông và góc không vuông rồi viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'Trong các hình trên có ... góc vuông và ... góc không vuông.', answer: '2,4', validate: (v) => String(v).replace(/\s+/g, '') === '2,4' },
        ],
        hints: ['Đặt ê ke vào từng góc. Chú ý góc đỉnh I (cạnh IP, IQ) được vẽ nghiêng nhưng vẫn là góc vuông.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Việt nuôi hai con tôm, trong đó tôm hùm cân nặng 560 g. Cân nặng của tôm hùm giảm đi 7 lần thì bằng cân nặng của tôm càng xanh. Hỏi:\na) Tôm càng xanh cân nặng bao nhiêu gam?\nb) Tôm hùm nặng hơn tôm càng xanh bao nhiêu gam?',
        wordProblem: true,
        blanks: [
          { label: 'a) Tôm càng xanh cân nặng (g)', answer: '80' },
          { label: 'b) Tôm hùm nặng hơn tôm càng xanh (g)', answer: '480' },
        ],
        hints: ['a) Giảm đi 7 lần thì chia cho 7: 560 : 7. b) Lấy 560 trừ đi cân nặng của tôm càng xanh.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgT18T2Q4Scale,
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nBiết hai quả bóng có số cân nặng bằng nhau.',
        blanks: [{ label: 'Một quả bóng cân nặng ...', answer: '300 g', validate: unitValidate(300, 'g') }],
        hints: ['Đĩa bên phải nặng 500 g + 200 g = 700 g. Bỏ quả cân 100 g ở đĩa trái thì hai quả bóng nặng 700 − 100 = 600 (g).'],
      },
      {
        type: 'compare', section: 'Tiết 3', img: imgT18T3Q1Groups,
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Hình nào dưới đây đã khoanh vào 1/4 số quả đỗ?', options: ['A', 'B'], answer: 'B' },
          { left: 'b) Hình nào dưới đây đã khoanh 1/7 số cây súp lơ?', options: ['A', 'B'], answer: 'A' },
        ],
        hints: ['a) Có 12 quả đỗ, 1/4 số quả đỗ là 12 : 4 = 3 quả. b) Có 14 cây súp lơ, 1/7 số cây là 14 : 7 = 2 cây.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgT18T3Q2Ant,
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp.\nMột con kiến muốn đi từ điểm D đến điểm A (như hình vẽ).',
        blanks: [{ label: 'Vậy con kiến đó phải đi quãng đường dài ...', answer: '138 mm', validate: unitValidate(138, 'mm') }],
        hints: ['Con kiến đi theo đường gấp khúc DCBA: 28 mm + 64 mm + 46 mm.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Hôm qua gấu nâu đã ăn bánh mì với một hũ mật ong. Hôm nay, gấu nâu lại ăn bánh mì với 75 ml mật ong. Biết lượng mật ong mà gấu nâu ăn trong ngày hôm nay đã giảm 3 lần so với lượng mật ong ăn trong ngày hôm qua. Hỏi trong hai ngày, gấu nâu ăn bánh mì với tất cả bao nhiêu mi-li-lít mật ong?',
        wordProblem: true,
        blanks: [{ label: 'Số mi-li-lít mật ong trong hai ngày', answer: '300' }],
        hints: ['Hôm qua gấu ăn gấp 3 lần hôm nay: 75 × 3 = 225 (ml). Cộng thêm lượng mật ong hôm nay.'],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nTrong hộp có 25 chiếc kẹo. Mai muốn chia hết số kẹo đó vào các túi mà số kẹo trong các túi là như nhau. Hỏi với cách chia đó thì trong mỗi túi có thể có bao nhiêu chiếc kẹo?',
        options: ['3 chiếc kẹo', '4 chiếc kẹo', '5 chiếc kẹo', '7 chiếc kẹo'],
        answer: 2,
        hints: ['Tìm số chia hết 25 mà không dư: 25 : 5 = 5.'],
      },
    ],
  },
  {
    id: 'kt-hk1', number: 'KT', title: 'Tự kiểm tra cuối học kì 1',
    questions: [
      {
        type: 'fill', section: 'Kiểm tra', img: imgKtQ1Figures,
        q: '1. a) Đánh dấu vào các góc vuông trong hình dưới đây.\nb) Quan sát hình vẽ bên rồi viết số đo thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Số góc vuông em đánh dấu được trong hình là ...', answer: '11' },
          { label: '• Bán kính của hình tròn tâm O dài ...', answer: '2 cm', validate: unitValidate(2, 'cm') },
          { label: '• Đường kính của hình tròn tâm O dài ...', answer: '4 cm', validate: unitValidate(4, 'cm') },
        ],
        hints: [
          'a) Dùng ê ke kiểm tra từng góc: các góc chân tường, các góc ở ngôi nhà bên phải (kể cả hai góc ở chỗ hở) và cả góc ở đỉnh mái nhà bên trái.',
          'b) OM là bán kính, dài 2 cm. Đường kính dài gấp 2 lần bán kính.',
        ],
      },
      {
        type: 'fill', section: 'Kiểm tra', img: imgKtQ2Octopus,
        q: '2. Quan sát số ghi trên bạn bạch tuộc rồi viết số thích hợp vào đám mây còn trống (theo mẫu).',
        blanks: [
          { label: '33 —gấp 8 lần→ <span class="gw-sample-text">264</span> —giảm 2 lần→ ...', answer: '132' },
          { label: '33 —thêm 5 đơn vị→ ... —gấp 4 lần→ ...', answer: '38,152', validate: (v) => String(v).replace(/\s+/g, '') === '38,152' },
          { label: '33 —giảm 3 lần→ ... —gấp 4 lần→ ...', answer: '11,44', validate: (v) => String(v).replace(/\s+/g, '') === '11,44' },
          { label: '33 —gấp 6 lần→ ... —giảm 9 đơn vị→ ...', answer: '198,189', validate: (v) => String(v).replace(/\s+/g, '') === '198,189' },
        ],
        hints: ['"Gấp ... lần" thì nhân, "giảm ... lần" thì chia; "thêm ... đơn vị" thì cộng, "giảm ... đơn vị" thì trừ. Mẫu: 33 × 8 = 264.'],
      },
      {
        type: 'fill', section: 'Kiểm tra', img: imgKtQ3Square,
        q: '3. Quan sát hình dưới đây rồi viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: '• Trung điểm của đoạn thẳng AB là ...', answer: 'E', validate: letterValidate('E') },
          { label: '• Trung điểm của đoạn thẳng OB là ...', answer: 'H', validate: letterValidate('H') },
          { label: '• Điểm ở giữa hai điểm O và D là ...', answer: 'G', validate: letterValidate('G') },
          { label: '• Các điểm ở giữa hai điểm B và D là ...', answer: 'H, O, G', validate: nameSetValidate(['H', 'O', 'G']) },
        ],
        hints: ['Đếm số ô vuông của lưới: E chia AB thành hai phần bằng nhau; H chia OB thành hai phần bằng nhau. G nằm giữa O và D nhưng không phải trung điểm của OD.'],
      },
      {
        type: 'compare', section: 'Kiểm tra',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Biểu thức nào dưới đây có giá trị bé nhất?', options: ['A. 2 × 0 × 1 × 9', 'B. 2 × (0 + 1 + 9)', 'C. 2 × 0 + 1 × 9', 'D. 2 × 0 × 1 + 9'], answer: 'A' },
          { left: 'b) Biểu thức nào dưới đây có giá trị lớn nhất?', options: ['A. 2 × 0 × 1 × 9', 'B. 2 × (0 + 1 + 9)', 'C. 2 × 0 + 1 × 9', 'D. 2 × 0 × 1 + 9'], answer: 'B' },
        ],
        hints: ['Tính giá trị từng biểu thức: A = 0, B = 2 × 10 = 20, C = 0 + 9 = 9, D = 0 + 9 = 9.'],
      },
      {
        type: 'fill', section: 'Kiểm tra', img: imgKtQ5Vegetables,
        q: '5. Hãy khoanh vào:\na) 1/4 số củ khoai tây.\nb) 1/3 số củ cà rốt.\nViết số củ em cần khoanh vào chỗ chấm.',
        blanks: [
          { label: 'a) 1/4 số củ khoai tây là ... củ.', answer: '2' },
          { label: 'b) 1/3 số củ cà rốt là ... củ.', answer: '3' },
        ],
        hints: ['Có 8 củ khoai tây: 8 : 4. Có 9 củ cà rốt: 9 : 3.'],
      },
      {
        type: 'fill', section: 'Kiểm tra',
        q: '6. Hai chị em nhà én vừa trở về nhà sau thời gian tránh rét ở phương Nam. Én em bay quãng đường dài 152 km. Én chị bay quãng đường dài gấp 3 lần quãng đường bay của én em. Hỏi én chị đã bay quãng đường dài bao nhiêu ki-lô-mét?',
        wordProblem: true,
        blanks: [{ label: 'Quãng đường én chị đã bay (km)', answer: '456' }],
        hints: ['Gấp 3 lần thì nhân với 3: 152 × 3.'],
      },
      {
        type: 'fill', section: 'Kiểm tra',
        q: '7. Thỏ đốm có 148 củ cà rốt. Thỏ đốm có số củ cà rốt nhiều gấp 4 lần thỏ trắng. Hỏi:\na) Thỏ trắng có bao nhiêu củ cà rốt?\nb) Thỏ đốm có nhiều hơn thỏ trắng bao nhiêu củ cà rốt?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số củ cà rốt của thỏ trắng', answer: '37' },
          { label: 'b) Thỏ đốm có nhiều hơn thỏ trắng (củ)', answer: '111' },
        ],
        hints: ['a) Số cà rốt của thỏ trắng bằng số của thỏ đốm giảm đi 4 lần: 148 : 4. b) 148 trừ đi số cà rốt của thỏ trắng.'],
      },
      {
        type: 'choice', section: 'Kiểm tra',
        q: '8. Khoanh vào chữ đặt trước câu trả lời đúng.\nMua 3 cái bút và 2 hộp ghim hết 8 đô la. Mua 3 cái bút và 4 hộp ghim hết 10 đô la. Hỏi 1 cái bút có giá là bao nhiêu đô la?',
        options: ['1 đô la', '2 đô la', '3 đô la', '4 đô la'],
        answer: 1,
        hints: ['Lần thứ hai mua nhiều hơn 2 hộp ghim và trả nhiều hơn 2 đô la, nên 1 hộp ghim giá 1 đô la. 3 cái bút giá 8 − 2 = 6 (đô la).'],
      },
    ],
  },
];
