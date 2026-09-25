/**
 * Vở bài tập Toán 2 — Tập một: Bài 19–24 (sách trang 69–93).
 * Phép cộng, phép trừ (có nhớ) trong phạm vi 100.
 */
import { exprValidate, stripVN } from '../grade3Workbook.js';
import imgB19Bags from '../../assets/grade2-workbook/bai19_t1_q3_bags.png';
import imgB19Pyramid from '../../assets/grade2-workbook/bai19_t2_q4_pyramid.svg';
import imgB19Maze from '../../assets/grade2-workbook/bai19_t3_q5_maze.png';
import imgB20Matches from '../../assets/grade2-workbook/bai20_t1_q3_matches.svg';
import imgB20Circuit from '../../assets/grade2-workbook/bai20_t1_q4_circuit.svg';
import imgB20Caterpillar from '../../assets/grade2-workbook/bai20_t2_q5_caterpillar.png';
import imgB20Cricket from '../../assets/grade2-workbook/bai20_t3_q3_cricket.png';
import imgB21Scale from '../../assets/grade2-workbook/bai21_t1_q3_scale.png';
import imgB21Trucks from '../../assets/grade2-workbook/bai21_t1_q4_trucks.png';
import imgB21Frog from '../../assets/grade2-workbook/bai21_t1_q5_frog.png';
import imgB21Snails from '../../assets/grade2-workbook/bai21_t2_q2_snails.png';
import imgB21Grid from '../../assets/grade2-workbook/bai21_t2_q5_grid.svg';
import imgB22Chicken from '../../assets/grade2-workbook/bai22_t2_q3_chicken.png';
import imgB23Shapes from '../../assets/grade2-workbook/bai23_t2_q2_shapes.svg';
import imgB23Monkey from '../../assets/grade2-workbook/bai23_t2_q5_monkey.png';
import imgB23Solids from '../../assets/grade2-workbook/bai23_t3_q3_solids.svg';
import imgB23Gifts from '../../assets/grade2-workbook/bai23_t5_q3_gifts.png';
import imgB24Animals from '../../assets/grade2-workbook/bai24_t1_q4_animals.png';
import imgB24Robot from '../../assets/grade2-workbook/bai24_t1_q5_robot.png';
import imgB24Dragonfly from '../../assets/grade2-workbook/bai24_t2_q2_dragonfly.png';

// "Đặt tính rồi tính." / "Tính." — one answer line per phép tính, result computed
// here so a typo in the answer key is impossible.
const calc = (a, op, b) => ({ label: `${a} ${op} ${b}`, answer: String(op === '+' ? a + b : a - b) });
const calcEq = (a, op, b) => ({ label: `${a} ${op} ${b} = ...`, answer: String(op === '+' ? a + b : a - b) });
const nums = (s) => (String(s).match(/\d+/g) || []).map(Number);

// Every number the child wrote, in order ("40, 41, 42", "40 < 41 < 42", "40 41 42").
function numListValidate(expected) {
  const target = expected.join('|');
  return (value) => nums(value).join('|') === target;
}
// The same numbers in any order ("43, 48" / "48 và 43").
function numSetValidate(expected) {
  const target = [...expected].sort((a, b) => a - b).join('|');
  return (value) => nums(value).sort((a, b) => a - b).join('|') === target;
}
// "... + ... + ... = ...": the three addends in any order, then the total.
function sumSlotsValidate(addends, total) {
  const target = [...addends].sort((a, b) => a - b).join('|');
  return (value) => {
    const v = String(value).split(',').map(s => Number(s.trim()));
    return v.length === addends.length + 1 && v.slice(0, -1).sort((a, b) => a - b).join('|') === target && v[v.length - 1] === total;
  };
}
// Several equations written one per slot, in any order (Bài 24 Tiết 2 Q5).
function eqSetValidate(eqs) {
  const norm = (s) => String(s).replace(/\s+/g, '').replace(/[−–—]/g, '-');
  const target = eqs.map(norm).sort().join('|');
  return (value) => String(value).split(',').map(norm).sort().join('|') === target;
}
// A shape name written with or without the word "hình" ("hình tròn" / "tròn").
function shapeValidate(name) {
  const norm = (s) => stripVN(s).replace(/[^a-z]/g, '').replace(/^hinh/, '');
  const target = norm(name);
  return (value) => norm(value) === target;
}

export const BAI_19_24 = [
  // ── BÀI 19 (trang 69–71) ─────────────────────────────────────────────────
  {
    id: 'bai-19', number: 19, title: 'Phép cộng (có nhớ) số có hai chữ số với số có một chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [calcEq(34, '+', 7), calcEq(82, '+', 9), calcEq(16, '+', 5), calcEq(48, '+', 3)],
        hints: ['Cộng hàng đơn vị trước: 4 + 7 = 11, viết 1 nhớ 1 sang hàng chục.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [calc(76, '+', 5), calc(87, '+', 4), calc(82, '+', 8), calc(39, '+', 9)],
        hints: ['Viết các chữ số cùng hàng thẳng cột, rồi cộng từ phải sang trái.'],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB19Bags,
        q: '3. Kết quả của phép tính ghi trên mỗi bao gạo là cân nặng của bao đó. Tô màu cam vào bao gạo nặng nhất, màu xanh vào bao gạo nhẹ nhất và màu vàng vào bao gạo còn lại.',
        rows: [
          { left: 'Bao gạo 68 kg + 9 kg', options: ['Cam', 'Xanh', 'Vàng'], answer: 'Vàng' },
          { left: 'Bao gạo 69 kg + 3 kg', options: ['Cam', 'Xanh', 'Vàng'], answer: 'Xanh' },
          { left: 'Bao gạo 73 kg + 7 kg', options: ['Cam', 'Xanh', 'Vàng'], answer: 'Cam' },
        ],
        hints: ['Tính cân nặng từng bao: 68 + 9 = 77, 69 + 3 = 72, 73 + 7 = 80.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đặt tính rồi tính.',
        blanks: [calc(46, '+', 4), calc(63, '+', 7), calc(25, '+', 7), calc(15, '+', 9)],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. Nối phép tính với kết quả của phép tính đó.',
        left: [{ id: 'c56', text: '56 + 8' }, { id: 'c16', text: '16 + 9' }, { id: 'c77', text: '77 + 4' }],
        right: [{ id: 'r25', text: '25' }, { id: 'r64', text: '64' }, { id: 'r81', text: '81' }],
        pairs: [['c56', 'r64'], ['c16', 'r25'], ['c77', 'r81']],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '3. Trong hộp bút có 24 cái bút chì và 6 cái bút mực. Hỏi trong hộp có tất cả bao nhiêu cái bút?',
        blanks: [{ label: 'Số cái bút', answer: '30' }],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB19Pyramid,
        q: '4. Số?',
        blanks: [
          { label: 'Ô a: ...', answer: '11' },
          { label: 'Ô b: ...', answer: '16' },
          { label: 'Ô c: ...', answer: '20' },
          { label: 'Ô d: ...', answer: '36' },
        ],
        hints: ['Số ở mỗi ô bằng tổng hai số ở hai ô ngay bên dưới: 3 + 4 = 7, 4 + 5 = 9.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Đặt tính rồi tính.',
        blanks: [calc(78, '+', 6), calc(69, '+', 3), calc(66, '+', 6), calc(55, '+', 8)],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true,
        q: '2. Buổi sáng, bác Lâm đánh bắt được 29 kg cá. Buổi chiều, bác Lâm đánh bắt được hơn buổi sáng 6 kg cá. Hỏi buổi chiều, bác Lâm đánh bắt được bao nhiêu ki-lô-gam cá?',
        blanks: [{ label: 'Số ki-lô-gam cá buổi chiều', answer: '35' }],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Tính.',
        blanks: [calcEq(37, '+', 8), calcEq(74, '+', 9), calcEq(63, '+', 7), calcEq(55, '+', 5)],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Tính.',
        blanks: [
          { label: 'a) 25 + 5 + 9 = ...', answer: '39' },
          { label: 'b) 46 + 7 + 3 = ...', answer: '56' },
        ],
        hints: ['Tính lần lượt từ trái sang phải: 25 + 5 = 30, rồi 30 + 9.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB19Maze,
        q: '5. Bạn nhím cần đến khu rừng thông. Em hãy tô màu con đường bạn nhím đi rồi viết số thích hợp vào chỗ chấm.',
        blanks: [{
          label: 'Tổng các số trên con đường nhím đi là: ... + ... + ... = ...',
          answer: '30,27,13,70', validate: sumSlotsValidate([30, 27, 13], 70),
        }],
        hints: ['Đi ngược từ khu rừng thông xuống: con đường đi qua số 13 rồi số 27.'],
      },
    ],
  },

  // ── BÀI 20 (trang 72–76) ─────────────────────────────────────────────────
  {
    id: 'bai-20', number: 20, title: 'Phép cộng (có nhớ) số có hai chữ số với số có hai chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [calcEq(35, '+', 17), calcEq(29, '+', 11), calcEq(68, '+', 23), calcEq(79, '+', 12)],
        hints: ['Cộng hàng đơn vị trước, được 10 trở lên thì nhớ 1 sang hàng chục.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [calc(75, '+', 16), calc(59, '+', 17), calc(24, '+', 66), calc(33, '+', 45)],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB20Matches,
        q: '3. Viết phép tính đúng thu được sau khi chuyển một que tính ở kết quả trong hình bên:',
        blanks: [{ label: 'Phép tính đúng:', answer: '43 + 17 = 60', validate: exprValidate('43+17=60') }],
        hints: ['43 + 17 bằng bao nhiêu? Chuyển một que tính để số 66 thành số đó.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB20Circuit, multi: true,
        q: '4. Tô màu vàng cho những bóng đèn phát sáng. Biết bóng đèn chỉ phát sáng nếu nó được nối bởi hai số có tổng bằng 60.\nChọn tất cả các bóng đèn phát sáng.',
        options: ['Bóng đèn A', 'Bóng đèn B', 'Bóng đèn C', 'Bóng đèn D'],
        answer: [0, 3],
        hints: ['Lần theo hai dây của mỗi bóng đèn để tìm hai cục pin nối với nó (chỗ dây vòng qua là hai dây không nối với nhau).'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đặt tính rồi tính.',
        blanks: [calc(45, '+', 7), calc(19, '+', 79), calc(34, '+', 58), calc(37, '+', 53)],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. Nối dây cứu hoả với trụ cứu hoả thích hợp (theo mẫu).',
        left: [{ id: 'h20', text: '20 + 30' }, { id: 'h15', text: '15 + 55' }, { id: 'h7', text: '7 + 56' }, { id: 'h83', text: '83 + 8' }],
        right: [{ id: 'r70', text: '70' }, { id: 'r50', text: '50' }, { id: 'r91', text: '91' }, { id: 'r63', text: '63' }],
        pairs: [['h20', 'r50'], ['h15', 'r70'], ['h7', 'r63'], ['h83', 'r91']],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. Nối (theo mẫu).',
        left: [
          { id: 't35', text: '35 kg + 6 kg' }, { id: 't8', text: '8 kg + 19 kg' },
          { id: 't27', text: '27 kg + 37 kg' }, { id: 't67', text: '67 kg + 17 kg' },
        ],
        right: [{ id: 'r41', text: '41 kg' }, { id: 'r64', text: '64 kg' }, { id: 'r84', text: '84 kg' }, { id: 'r27', text: '27 kg' }],
        pairs: [['t35', 'r41'], ['t8', 'r27'], ['t27', 'r64'], ['t67', 'r84']],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. Buổi sáng, cô Hoa thu hoạch được 17 l mật ong. Buổi chiều, cô Hoa thu hoạch được 23 l. Hỏi ngày hôm đó cô Hoa thu hoạch được bao nhiêu lít mật ong?',
        blanks: [{ label: 'Số lít mật ong', answer: '40' }],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB20Caterpillar,
        q: '5. Viết số thích hợp vào chỗ chấm.',
        blanks: [{ label: 'Con sâu phải bò ... cm để đến chiếc lá.', answer: '51' }],
        hints: ['Con sâu bò hết đoạn 36 cm rồi thêm đoạn 15 cm.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Đặt tính rồi tính.',
        blanks: [calc(25, '+', 37), calc(37, '+', 25), calc(18, '+', 43), calc(43, '+', 18)],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Viết vào chỗ chấm cho thích hợp.\nCác chú heo đất ghi: 18 + 23; 32 + 8; 22 + 20.',
        blanks: [{
          label: 'Kết quả các phép tính ghi trên heo đất được viết theo thứ tự từ bé đến lớn là:',
          answer: '40, 41, 42', validate: numListValidate([40, 41, 42]),
        }],
        hints: ['Tính từng phép tính trước, rồi sắp xếp các kết quả từ bé đến lớn.'],
      },
      {
        type: 'compare', section: 'Tiết 3', img: imgB20Cricket,
        q: '3. Có hai con đường để dế mèn đi đến bờ cỏ (như hình vẽ). Tô màu xanh con đường ngắn hơn và màu đỏ con đường còn lại.',
        rows: [
          { left: 'Con đường phía trên (40 cm, 10 cm, 20 cm)', options: ['Xanh', 'Đỏ'], answer: 'Xanh' },
          { left: 'Con đường phía dưới (20 cm, 60 cm)', options: ['Xanh', 'Đỏ'], answer: 'Đỏ' },
        ],
        hints: ['Cộng độ dài các đoạn của mỗi con đường: 40 + 10 + 20 và 20 + 60.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Tính.',
        blanks: [
          { label: '35 + 15 + 6 = ...', answer: '56' }, { label: '29 + 11 + 4 = ...', answer: '44' },
          { label: '68 + 22 + 7 = ...', answer: '97' }, { label: '47 + 33 + 9 = ...', answer: '89' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '1. Tính.',
        blanks: [calcEq(73, '+', 7), calcEq(64, '+', 26), calcEq(15, '+', 38), calcEq(43, '+', 18)],
      },
      {
        type: 'match', section: 'Tiết 4',
        q: '2. Nối (theo mẫu).\nNối mỗi con diều với số trên tia số bằng kết quả phép tính ghi trên diều.',
        left: [{ id: 'k20', text: '20 + 40' }, { id: 'k37', text: '37 + 48' }, { id: 'k45', text: '45 + 45' }, { id: 'k90', text: '90 + 10' }],
        right: [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100].map(n => ({ id: `n${n}`, text: String(n) })),
        pairs: [['k20', 'n60'], ['k37', 'n85'], ['k45', 'n90'], ['k90', 'n100']],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '3. Viết số thích hợp vào chỗ trống.',
        blanks: [
          { label: 'a) 26 —(+ 37)→ ... —(+ 17)→ ...', answer: '63,80' },
          { label: 'b) 26 —(+ 17)→ ... —(+ 37)→ ...', answer: '43,80' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 4', wordProblem: true,
        q: '4. Nhà bạn Hoa nuôi một đàn thỏ có 18 con. Mùa hè vừa rồi, đàn thỏ đẻ thêm 12 con thỏ nữa. Hỏi nhà bạn Hoa có tất cả bao nhiêu con thỏ?',
        blanks: [{ label: 'Số con thỏ', answer: '30' }],
      },
    ],
  },

  // ── BÀI 21 (trang 77–79) ─────────────────────────────────────────────────
  {
    id: 'bai-21', number: 21, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [calcEq(28, '+', 38), calcEq(46, '+', 24), calcEq(51, '+', 39), calcEq(65, '+', 17)],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '2. Ngỗng cân nặng 5 kg. Ngỗng nhẹ hơn dê 15 kg. Hỏi dê cân nặng bao nhiêu ki-lô-gam?',
        blanks: [{ label: 'Số ki-lô-gam dê cân nặng', answer: '20' }],
        hints: ['Ngỗng nhẹ hơn dê 15 kg nghĩa là dê nặng hơn ngỗng 15 kg.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB21Scale,
        q: '3. Số?',
        blanks: [{ label: 'Con bò: ... kg', answer: '31' }],
        hints: ['Cân thăng bằng: con bò nặng bằng con lợn và con dê cộng lại.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB21Trucks,
        q: '4. Mỗi xe cứu hoả đến đám cháy theo một con đường. Mỗi xe sẽ lấy hết nước trong bình đặt trên con đường đó. Đánh dấu ✓ vào ô trống đặt trước xe lấy được nhiều nước hơn.',
        options: ['Xe cứu hoả ở trên', 'Xe cứu hoả ở dưới'],
        answer: 0,
        hints: ['Xe ở trên lấy 48 l + 32 l, xe ở dưới lấy 30 l + 39 l.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB21Frog,
        q: '5. Viết số thích hợp vào chỗ chấm.\nBạn ếch tham gia thi nhảy xa. Lần thứ nhất xuất phát từ lá sen, bạn ấy nhảy qua 6 lá và được 35 điểm (như hình vẽ). Lần thứ hai, cũng xuất phát từ lá sen đó, bạn ấy nhảy qua 8 lá.',
        blanks: [
          { label: 'a) Lần nhảy thứ hai, bạn ếch được ... điểm.', answer: '45' },
          { label: 'b) Cả hai lần nhảy, bạn ếch được ... điểm.', answer: '80' },
        ],
        hints: ['Nhảy qua 6 lá (5, 10, 15, 20, 25, 30) thì đáp xuống lá 35. Nhảy qua 8 lá thì đáp xuống lá nào?'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính.',
        blanks: [calcEq(51, '+', 29), calcEq(72, '+', 8), calcEq(36, '+', 34)],
      },
      {
        type: 'compare', section: 'Tiết 2', img: imgB21Snails,
        q: '2. Tô màu vàng con đường dài nhất, màu xanh con đường ngắn nhất.',
        rows: [
          { left: 'Con đường 49 cm và 11 cm', options: ['Vàng', 'Xanh', 'Không tô'], answer: 'Xanh' },
          { left: 'Con đường 9 cm và 52 cm', options: ['Vàng', 'Xanh', 'Không tô'], answer: 'Không tô' },
          { left: 'Con đường 100 cm', options: ['Vàng', 'Xanh', 'Không tô'], answer: 'Vàng' },
        ],
        hints: ['Tính độ dài mỗi con đường: 49 + 11 và 9 + 52.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '3. Ngày thứ nhất, bác Thanh trồng được 35 cây đu đủ. Ngày thứ hai, bác trồng được 15 cây chuối. Hỏi cả hai ngày bác Thanh trồng được bao nhiêu cây đu đủ và chuối?',
        blanks: [{ label: 'Số cây đu đủ và chuối', answer: '50' }],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. Mực nước trong bể cao 48 cm. Sau cơn mưa, mực nước trong bể tăng thêm 12 cm. Hỏi lúc này mực nước trong bể cao bao nhiêu xăng-ti-mét?',
        blanks: [{ label: 'Số xăng-ti-mét mực nước cao', answer: '60' }],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB21Grid,
        q: '5. Số?',
        blanks: [
          { label: 'Ô a: ...', answer: '19' },
          { label: 'Ô b: ...', answer: '7' },
          { label: 'Ô c: ...', answer: '15' },
          { label: 'Ô d: ...', answer: '10' },
        ],
        hints: ['Làm cột bên phải trước: 14 − 4 = ô d. Sau đó làm hàng dưới cùng: 25 − ô c = ô d.'],
      },
    ],
  },

  // ── BÀI 22 (trang 80–84) ─────────────────────────────────────────────────
  {
    id: 'bai-22', number: 22, title: 'Phép trừ (có nhớ) số có hai chữ số cho số có một chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [calcEq(54, '−', 8), calcEq(40, '−', 9), calcEq(72, '−', 4), calcEq(81, '−', 3)],
        hints: ['4 không trừ được 8, lấy 14 trừ 8 bằng 6, viết 6 nhớ 1; 5 trừ 1 bằng 4.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [calc(73, '−', 6), calc(22, '−', 4), calc(34, '−', 7), calc(60, '−', 4)],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '3. Nối (theo mẫu).',
        left: [{ id: 'b76', text: '76' }, { id: 'b52', text: '52' }, { id: 'b35', text: '35' }, { id: 'b64', text: '64' }],
        right: [{ id: 'e40', text: '40 − 5' }, { id: 'e84', text: '84 − 8' }, { id: 'e61', text: '61 − 9' }, { id: 'e73', text: '73 − 9' }],
        pairs: [['b76', 'e84'], ['b52', 'e61'], ['b35', 'e40'], ['b64', 'e73']],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '4. Trên bến có 52 chiếc thuyền. Lúc sau, có 8 chiếc thuyền rời bến. Hỏi trên bến còn lại bao nhiêu chiếc thuyền?',
        blanks: [{ label: 'Số chiếc thuyền còn lại', answer: '44' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đặt tính rồi tính.',
        blanks: [calc(80, '−', 6), calc(43, '−', 5), calc(57, '−', 8), calc(73, '−', 7)],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. a) Nối mỗi con ong với bông hoa thích hợp (theo mẫu).',
        left: [{ id: 'o60', text: '60 − 3' }, { id: 'o53', text: '53 − 6' }, { id: 'o71', text: '71 − 9' }, { id: 'o95', text: '95 − 7' }],
        right: [{ id: 'f62', text: '62' }, { id: 'f57', text: '57' }, { id: 'f47', text: '47' }, { id: 'f88', text: '88' }],
        pairs: [['o60', 'f57'], ['o53', 'f47'], ['o71', 'f62'], ['o95', 'f88']],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '2. b) Tô màu vàng vào bông hoa ghi số lớn nhất, màu xanh vào bông hoa ghi số bé nhất và màu đỏ vào các bông hoa còn lại.',
        rows: [
          { left: 'Bông hoa 62', options: ['Vàng', 'Xanh', 'Đỏ'], answer: 'Đỏ' },
          { left: 'Bông hoa 57', options: ['Vàng', 'Xanh', 'Đỏ'], answer: 'Đỏ' },
          { left: 'Bông hoa 47', options: ['Vàng', 'Xanh', 'Đỏ'], answer: 'Xanh' },
          { left: 'Bông hoa 88', options: ['Vàng', 'Xanh', 'Đỏ'], answer: 'Vàng' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB22Chicken,
        q: '3. Đường đến ổ rơm của gà mái mơ đi qua ba phép tính có kết quả bằng nhau. Hãy tô màu cho đường đi đến ổ rơm của gà mái mơ.\nĐường đi đến ổ rơm thứ mấy (đếm từ trên xuống)?',
        options: ['Ổ rơm thứ nhất', 'Ổ rơm thứ hai', 'Ổ rơm thứ ba', 'Ổ rơm thứ tư'],
        answer: 1,
        hints: ['38 + 9 = 47. Ở mỗi ngã rẽ, chọn đường có phép tính cũng bằng 47.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. Cây mít nhà bà có 32 quả. Có 5 quả mít chín và được bà lấy xuống. Hỏi trên cây còn lại bao nhiêu quả mít?',
        blanks: [{ label: 'Số quả mít còn lại', answer: '27' }],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Đặt tính rồi tính.',
        blanks: [calc(45, '−', 6), calc(20, '−', 9), calc(72, '−', 4), calc(80, '−', 7)],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Viết số thích hợp vào chỗ trống.',
        blanks: [
          { label: 'a) 62 —(+ 8)→ ... —(− 3)→ ...', answer: '70,67' },
          { label: 'b) 30 —(− 2)→ ... —(+ 8)→ ...', answer: '28,36' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nBạn chim sẽ vào tổ ghi phép tính có kết quả lớn nhất. Bạn chim sẽ vào tổ nào?',
        options: ['50 − 5', '55 − 9', '51 − 7'],
        answer: 1,
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Viết mỗi số 40, 50 và 70 vào một ô trống để được các phép tính đúng.',
        blanks: [
          { label: '90 − ... = 40', answer: '50' },
          { label: '... − ... = 30', answer: '70,40' },
        ],
        hints: ['Mỗi số chỉ dùng một lần. 90 trừ số nào bằng 40?'],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true,
        q: '5. Chó nặng 25 kg. Chó nặng hơn khỉ 7 kg. Hỏi khỉ nặng bao nhiêu ki-lô-gam?',
        blanks: [{ label: 'Số ki-lô-gam khỉ nặng', answer: '18' }],
        hints: ['Chó nặng hơn khỉ nên khỉ nhẹ hơn chó 7 kg.'],
      },
      {
        type: 'table', section: 'Tiết 4',
        q: '1. Số?',
        rows: [
          ['Số bị trừ', 52, 77, 23, 24, 70],
          ['Số trừ', 4, 8, 6, 9, 30],
          ['Hiệu', { blank: true, answer: '48' }, { blank: true, answer: '69' }, { blank: true, answer: '17' }, { blank: true, answer: '15' }, { blank: true, answer: '40' }],
        ],
        hints: ['Hiệu = Số bị trừ − Số trừ.'],
      },
      {
        type: 'match', section: 'Tiết 4',
        q: '2. Mỗi chiếc ví sẽ được đặt vào chiếc túi ghi phép tính có kết quả là số ghi trên chiếc ví đó. Em hãy nối để tìm túi đựng cho mỗi chiếc ví.',
        left: [{ id: 'v19', text: '19' }, { id: 'v86', text: '86' }, { id: 'v51', text: '51' }],
        right: [{ id: 'g25', text: '25 − 6' }, { id: 'g60', text: '60 − 9' }, { id: 'g91', text: '91 − 5' }],
        pairs: [['v19', 'g25'], ['v86', 'g91'], ['v51', 'g60']],
      },
      {
        type: 'compare', section: 'Tiết 4',
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Kết quả tính 50 + 20 − 7 là:', options: ['A. 53', 'B. 63', 'C. 73'], answer: 'B' },
          { left: 'b) Kết quả tính 42 − 5 + 18 là:', options: ['A. 35', 'B. 45', 'C. 55'], answer: 'C' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 4', wordProblem: true,
        q: '4. Mi vẽ một bức tranh có 33 bông hoa màu đỏ và màu vàng, trong đó có 9 bông hoa màu đỏ. Hỏi có bao nhiêu bông hoa được Mi tô màu vàng?',
        blanks: [{ label: 'Số bông hoa màu vàng', answer: '24' }],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '5. Châu chấu bật nhảy đến các bụi cỏ ghi số theo thứ tự các số là kết quả của các phép tính dưới đây.\n20 − 8 → 40 − 6 → 32 − 9 → 52 − 7\nEm hãy tô màu các bụi cỏ mà châu chấu nhảy đến.\nCác bụi cỏ ghi số: 13, 43, 55, 51, 12, 34, 23, 64, 32, 65, 14, 45.',
        blanks: [{ label: 'Châu chấu nhảy lần lượt đến các bụi cỏ ghi số: ..., ..., ..., ...', answer: '12,34,23,45' }],
      },
    ],
  },

  // ── BÀI 23 (trang 85–90) ─────────────────────────────────────────────────
  {
    id: 'bai-23', number: 23, title: 'Phép trừ (có nhớ) số có hai chữ số cho số có hai chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [calcEq(71, '−', 25), calcEq(60, '−', 18), calcEq(82, '−', 45), calcEq(35, '−', 29)],
        hints: ['Trừ hàng đơn vị trước; không trừ được thì mượn 1 chục, rồi nhớ 1 vào số trừ ở hàng chục.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. a) Đặt tính rồi tính.',
        blanks: [calc(52, '−', 25), calc(83, '−', 38), calc(50, '−', 24), calc(53, '−', 17)],
      },
      {
        type: 'choice', section: 'Tiết 1', multi: true,
        q: '2. b) Tô màu vào các bông hoa ghi phép tính đúng.\nChọn tất cả các bông hoa cần tô màu.',
        options: ['42 − 17 = 15', '73 − 54 = 19', '57 − 28 = 29'],
        answer: [1, 2],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '3. Trên cành cây có 30 con chim. Lúc sau có 14 con chim bay đi. Hỏi trên cành cây còn lại bao nhiêu con chim?',
        blanks: [{ label: 'Số con chim còn lại', answer: '16' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đặt tính rồi tính.',
        blanks: [calc(36, '−', 18), calc(52, '−', 34), calc(80, '−', 37), calc(70, '−', 52)],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB23Shapes,
        q: '2. Quan sát hình dưới đây.\na) Tô màu vào các hình ghi phép tính đúng.\nb) Viết tiếp vào chỗ chấm cho thích hợp (theo mẫu).',
        blanks: [{ label: 'Các hình ghi phép tính đúng là: hình vuông; ...', answer: 'hình tròn', validate: shapeValidate('hình tròn') }],
        hints: ['Tính lại từng phép tính rồi so với kết quả ghi trên hình.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '3. Trong bến xe có 40 ô tô. Lúc sau có 16 ô tô rời bến. Hỏi trong bến còn lại bao nhiêu ô tô?',
        blanks: [{ label: 'Số ô tô còn lại', answer: '24' }],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '4. >; <; = ?',
        rows: [
          { left: 'a) 42 − 15', right: '20 + 10', answer: '<' },
          { left: '70 − 26', right: '20 + 30', answer: '<' },
          { left: 'b) 62 − 25', right: '50 − 25', answer: '>' },
          { left: '51 − 16', right: '44 − 16', answer: '>' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB23Monkey,
        q: '5. Tại mỗi ngã rẽ, bạn khỉ sẽ đi theo con đường ghi phép tính có kết quả nhỏ hơn. Khoanh vào món ăn mà bạn khỉ sẽ đến.',
        options: ['Chuối', 'Dừa', 'Ngô', 'Mía'],
        answer: 0,
        hints: ['Ngã rẽ đầu tiên: so sánh 30 − 7 và 30 − 6.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Tính nhẩm.',
        blanks: [calcEq(100, '−', 20), calcEq(100, '−', 60), calcEq(100, '−', 10)],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true,
        q: '2. Xe máy chở 70 kg hàng. Xe đạp chở ít hơn xe máy 55 kg hàng. Hỏi xe đạp chở bao nhiêu ki-lô-gam hàng?',
        blanks: [{ label: 'Số ki-lô-gam hàng xe đạp chở', answer: '15' }],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB23Solids,
        q: '3. Quan sát hình dưới đây.\na) Viết số thích hợp vào chỗ chấm.\nb) Tô màu vàng vào hình khối ghi phép tính có kết quả lớn nhất, màu đỏ vào hình khối ghi phép tính có kết quả bé nhất.',
        blanks: [
          { label: 'a) Khối lập phương ghi phép tính có kết quả bằng ...', answer: '34' },
          { label: 'b) Kết quả lớn nhất (tô màu vàng): ...', answer: '34' },
          { label: 'Kết quả bé nhất (tô màu đỏ): ...', answer: '19' },
        ],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '4. Nối hai phép tính có kết quả bằng nhau.',
        left: [
          { id: 'u52a', text: '52 − 3' }, { id: 'u52b', text: '52 − 23' }, { id: 'u60', text: '60 − 21' },
          { id: 'u70', text: '70 − 43' }, { id: 'u100', text: '100 − 50' },
        ],
        right: [
          { id: 'd80', text: '80 − 30' }, { id: 'd20', text: '20 + 7' }, { id: 'd41', text: '41 − 12' },
          { id: 'd60', text: '60 − 11' }, { id: 'd32', text: '32 + 7' },
        ],
        pairs: [['u52a', 'd60'], ['u52b', 'd41'], ['u60', 'd32'], ['u70', 'd20'], ['u100', 'd80']],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '1. Đặt tính rồi tính.',
        blanks: [calc(51, '−', 25), calc(72, '−', 36), calc(96, '−', 48), calc(70, '−', 35)],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '2. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          { label: '5... − 25 = 26', answer: '1', boxes: true },
          { label: '72 − ...7 = 3...', answer: '3,5', boxes: true },
          { label: '...0 − 38 = 3...', answer: '7,2', boxes: true },
          { label: '...6 − 1... = 29', answer: '4,7', boxes: true },
        ],
        hints: ['Thử lại bằng phép cộng: 26 + 25 = 5☐.'],
      },
      {
        type: 'fill', section: 'Tiết 4', wordProblem: true,
        q: '3. Một toà nhà có 90 cửa sổ. Có 52 cửa sổ đang mở. Hỏi có bao nhiêu cửa sổ không mở?',
        blanks: [{ label: 'Số cửa sổ không mở', answer: '38' }],
      },
      {
        type: 'compare', section: 'Tiết 4',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Kết quả tính 42 + 28 − 26 là:', options: ['A. 34', 'B. 44', 'C. 54'], answer: 'B' },
          { left: 'b) Kết quả tính 42 − 34 + 62 là:', options: ['A. 60', 'B. 70', 'C. 80'], answer: 'B' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 4',
        q: '5. Hãy giúp gà con tìm mẹ, biết rằng gà mẹ đang đứng ở ô ghi phép tính có kết quả lớn nhất. Tô màu vàng cho gà mẹ và gà con.\nGà mẹ đứng ở ô nào?',
        options: ['50 − 6', '61 − 13', '73 − 23'],
        answer: 2,
      },
      {
        type: 'table', section: 'Tiết 5',
        q: '1. Số?',
        rows: [
          ['Số bị trừ', 46, 60, 70, 51, 90],
          ['Số trừ', 19, 27, 32, 15, 20],
          ['Hiệu', 27, { blank: true, answer: '33' }, { blank: true, answer: '38' }, { blank: true, answer: '36' }, { blank: true, answer: '70' }],
        ],
      },
      {
        type: 'compare', section: 'Tiết 5',
        q: '2. Tô màu đỏ vào bông hoa ghi phép tính có kết quả lớn nhất, màu vàng vào bông hoa ghi phép tính có kết quả bé nhất.',
        rows: [
          { left: 'Bông hoa 40 − 16', options: ['Đỏ', 'Vàng', 'Không tô'], answer: 'Không tô' },
          { left: 'Bông hoa 50 − 30', options: ['Đỏ', 'Vàng', 'Không tô'], answer: 'Không tô' },
          { left: 'Bông hoa 62 − 36', options: ['Đỏ', 'Vàng', 'Không tô'], answer: 'Đỏ' },
          { left: 'Bông hoa 31 − 17', options: ['Đỏ', 'Vàng', 'Không tô'], answer: 'Vàng' },
        ],
        hints: ['Tính kết quả từng bông hoa: 24, 20, 26, 14.'],
      },
      {
        type: 'choice', section: 'Tiết 5', img: imgB23Gifts,
        q: '3. Khoanh vào chữ đặt dưới hộp quà ghi phép tính đúng nhưng không có dạng khối lập phương.',
        options: ['32 − 18 = 14', '57 − 29 = 28', '50 − 16 = 44'],
        answer: 0,
        hints: ['Hộp B có dạng khối lập phương. Kiểm tra lại phép tính trên hai hộp còn lại.'],
      },
      {
        type: 'fill', section: 'Tiết 5', wordProblem: true,
        q: '4. Vườn nhà bác Mạnh trồng 28 cây cam và quýt, trong đó có 19 cây quýt. Hỏi trong vườn nhà bác Mạnh có bao nhiêu cây cam?',
        blanks: [{ label: 'Số cây cam', answer: '9' }],
      },
    ],
  },

  // ── BÀI 24 (trang 91–93) ─────────────────────────────────────────────────
  {
    id: 'bai-24', number: 24, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Đặt tính rồi tính.',
        blanks: [calc(35, '−', 9), calc(41, '−', 6), calc(70, '−', 34), calc(55, '−', 26)],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Số?',
        blanks: [{ label: '68 —(+ 5)→ ... —(− 8)→ ... —(− 36)→ ...', answer: '73,65,29' }],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '3. Rô-bốt cần leo qua 52 bậc cầu thang. Rô-bốt đã leo được 19 bậc. Hỏi Rô-bốt cần leo thêm bao nhiêu bậc cầu thang nữa?',
        blanks: [{ label: 'Số bậc cầu thang cần leo thêm', answer: '33' }],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB24Animals,
        q: '4. Dựa vào câu chuyện của sóc, chuột và nhím, em hãy khoanh vào chữ đặt trước câu trả lời đúng.\nPhép tính nào sau đây có kết quả là số hạt dẻ của sóc?',
        options: ['73 − 33', '61 − 26', '83 − 45'],
        answer: 2,
        hints: ['Số hạt dẻ của sóc lớn hơn 35 và bé hơn 40.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB24Robot,
        q: '5. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Ghép hai trong ba thẻ số trên được các số có hai chữ số lớn hơn 40 và bé hơn 50 là:', answer: '43, 48', validate: numSetValidate([43, 48]) },
          { label: 'b) Tìm tổng và hiệu của số tìm được ở câu a với số trên tấm thẻ còn lại.<br>Số bé hơn: tổng là ..., hiệu là ...', answer: '51,35' },
          { label: 'Số lớn hơn: tổng là ..., hiệu là ...', answer: '51,45' },
        ],
        hints: ['Số lớn hơn 40 và bé hơn 50 phải có chữ số hàng chục là 4.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính.',
        blanks: [
          { label: '25 + 65 − 40 = ...', answer: '50' },
          { label: '100 − 50 − 25 = ...', answer: '25' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB24Dragonfly,
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp.\nChuồn chuồn bay theo hướng sợi dây dưới đây, xuất phát từ mũi tên.',
        blanks: [
          { label: 'a) Chuồn chuồn sẽ gặp bông hoa đầu tiên ghi số ... và gặp bông hoa sau cùng ghi số ...', answer: '19,7' },
          { label: 'b) Tính tổng các số trên ba bông hoa mà chuồn chuồn đã gặp.<br>...', answer: '87' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '3. Một cửa hàng, buổi sáng bán được 52 l nước mắm, buổi chiều bán được 43 l nước mắm. Hỏi cả hai buổi cửa hàng bán được bao nhiêu lít nước mắm?',
        blanks: [{ label: 'Số lít nước mắm', answer: '95' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết chữ số thích hợp vào chỗ chấm.',
        blanks: [
          { label: '70 − 29 > 4...', answer: '0' },
          { label: '81 − 23 < 5...', answer: '9' },
        ],
        hints: ['Tính 70 − 29 và 81 − 23 trước, rồi so sánh với số có hai chữ số ở bên phải.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '5. Viết tiếp vào chỗ chấm cho thích hợp.\nTừ sáu số 30, 52, 18, 5, 25, 34 lập được các phép trừ là:',
        blanks: [{
          label: '30 − 5 = 25; ...; ...; ...',
          answer: '30 − 25 = 5, 52 − 18 = 34, 52 − 34 = 18',
          validate: eqSetValidate(['30-25=5', '52-18=34', '52-34=18']),
        }],
        hints: ['Chọn hai số trong sáu số, lấy số lớn trừ số bé; nếu kết quả cũng là một trong sáu số thì đó là một phép trừ cần tìm.'],
      },
    ],
  },
];
