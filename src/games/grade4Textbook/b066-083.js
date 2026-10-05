/**
 * SGK Toán 4: bài 66–83, Phép chia (sách trang 76–93): chia một tổng, một tích cho một số, chia cho số có một,
 * hai, ba chữ số, thương có chữ số 0, luyện tập chung.
 * Hình vẽ lại: scripts/redraw/g4t_bai066_083.py (bộ vẽ kit_g4t.py).
 */
import { listValidate, dsValidate, textValidate, mau, fr, blank, divCalc, nham } from './kit.js';
import imgSaiODau from '../../assets/grade4-textbook/bai76_q4_saiodau.svg';
import imgSachBan from '../../assets/grade4-textbook/bai82_q4_bieudo.svg';
import imgHinhCN from '../../assets/grade4-textbook/bai83_q1_hinhchunhat.svg';
import imgGioMua from '../../assets/grade4-textbook/bai83_q2_bieudo.svg';

/** Một dòng có nhiều ô "...": đáp án theo thứ tự các ô. */
const steps = (label, answers) => ({ label, answer: answers.join(','), validate: listValidate(answers.map(String)) });

/** "80 : 40 = 80 : (... × ...) = ...": bé chọn hai thừa số (khác 1) có tích bằng số chia, rồi ghi kết quả. */
const tichValidate = (d, result) => (v) => {
  const [a, b, c] = String(v).split(',').map(s => Number(s.trim()));
  return a > 1 && b > 1 && a * b === d && c === result;
};

/** Ô ghi tên ngày (bàn phím chữ có sẵn tên các ngày); nhận "Thứ năm", "thứ 5", "5". */
const DAYS = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
const DAY_NUM = { 'thứ hai': 2, 'thứ ba': 3, 'thứ tư': 4, 'thứ năm': 5, 'thứ sáu': 6, 'thứ bảy': 7 };
const dayValidate = (day) => {
  const plain = textValidate(day);
  const n = DAY_NUM[day.toLowerCase()];
  return (v) => plain(v) || (n && String(v).trim().toLowerCase().replace(/^(thứ|thu)\s*/, '') === String(n));
};
const dayBlank = (label, day) => ({ label, answer: day, validate: dayValidate(day), tiles: DAYS, tileOne: true });

/** Ô khoanh chữ A, B, C, D. */
const letter = (label, ans) => ({ label, answer: ans, validate: textValidate(ans), tiles: ['A', 'B', 'C', 'D'], tileOne: true });

const HINT_DIV = 'Bấm ✍️ Tính để đặt tính chia trên tờ vở: chia từ trái sang phải, mỗi lần chia, nhân, trừ rồi hạ chữ số tiếp theo.';
const HINT_DIV2 = 'Ước lượng thương: làm tròn số chia (vd. 67 → 70) rồi nhẩm. Số dư luôn phải bé hơn số chia.';

export const QUESTIONS = {
  // ── Bài 66. Chia một tổng cho một số (trang 76) ───────────────────────────────────────────────
  'bai-66': [
    {
      type: 'fill', stars: 2,
      q: `1. a) Tính bằng hai cách: (15 + 35) : 5 ; (80 + 4) : 4.\nb) Tính bằng hai cách (theo mẫu): 18 : 6 + 24 : 6 ; 60 : 3 + 9 : 3.\n${mau('12 : 4 + 20 : 4 = 3 + 5 = 8 ; 12 : 4 + 20 : 4 = (12 + 20) : 4 = 32 : 4 = 8')}`,
      blanks: [
        steps('a) Cách 1: (15 + 35) : 5 = ... : 5 = ...', [50, 10]),
        steps('Cách 2: (15 + 35) : 5 = 15 : 5 + 35 : 5 = ... + ... = ...', [3, 7, 10]),
        steps('Cách 1: (80 + 4) : 4 = ... : 4 = ...', [84, 21]),
        steps('Cách 2: (80 + 4) : 4 = 80 : 4 + 4 : 4 = ... + ... = ...', [20, 1, 21]),
        steps('b) Cách 1: 18 : 6 + 24 : 6 = ... + ... = ...', [3, 4, 7]),
        steps('Cách 2: 18 : 6 + 24 : 6 = (18 + 24) : 6 = ... : 6 = ...', [42, 7]),
        steps('Cách 1: 60 : 3 + 9 : 3 = ... + ... = ...', [20, 3, 23]),
        steps('Cách 2: 60 : 3 + 9 : 3 = (60 + 9) : 3 = ... : 3 = ...', [69, 23]),
      ],
      hints: ['Cách 1: tính trong ngoặc trước. Cách 2: chia từng số hạng cho số chia rồi cộng các kết quả.'],
    },
    {
      type: 'fill', stars: 2,
      q: `2. Tính bằng hai cách (theo mẫu): a) (27 − 18) : 3 ; b) (64 − 32) : 8.\n${mau('(35 − 21) : 7 = 14 : 7 = 2 ; (35 − 21) : 7 = 35 : 7 − 21 : 7 = 5 − 3 = 2')}`,
      blanks: [
        steps('a) Cách 1: (27 − 18) : 3 = ... : 3 = ...', [9, 3]),
        steps('Cách 2: (27 − 18) : 3 = 27 : 3 − 18 : 3 = ... − ... = ...', [9, 6, 3]),
        steps('b) Cách 1: (64 − 32) : 8 = ... : 8 = ...', [32, 4]),
        steps('Cách 2: (64 − 32) : 8 = 64 : 8 − 32 : 8 = ... − ... = ...', [8, 4, 4]),
      ],
      hints: ['Chia một hiệu cho một số: có thể chia số bị trừ và số trừ cho số chia, rồi lấy hai kết quả trừ cho nhau.'],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: '3. Lớp 4A có 32 học sinh chia thành các nhóm, mỗi nhóm có 4 học sinh. Lớp 4B có 28 học sinh cũng chia thành các nhóm, mỗi nhóm có 4 học sinh. Hỏi tất cả có bao nhiêu nhóm?',
      blanks: [{ label: 'Tất cả có ... nhóm', answer: '15' }],
      hints: ['Tìm số nhóm của từng lớp rồi cộng lại, hoặc lấy tổng số học sinh hai lớp chia cho 4.'],
    },
  ],

  // ── Bài 67. Chia cho số có một chữ số (trang 77) ──────────────────────────────────────────────
  'bai-67': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [
        divCalc(278157, 3, 'a) '), divCalc(304968, 4), divCalc(408090, 5),
        divCalc(158735, 3, 'b) '), divCalc(475908, 5), divCalc(301849, 7),
      ],
      hints: [HINT_DIV],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '2. Người ta đổ đều 128 610l xăng vào 6 bể. Hỏi mỗi bể đó có bao nhiêu lít xăng?',
      blanks: [{ label: 'Mỗi bể có ... l xăng', answer: '21435' }],
      hints: ['Đổ đều vào 6 bể: lấy số lít xăng chia cho 6.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '3. Người ta xếp 187 250 cái áo vào các hộp, mỗi hộp 8 áo. Hỏi có thể xếp được vào nhiều nhất bao nhiêu hộp và còn thừa mấy cái áo?',
      blanks: [
        { label: 'Xếp được nhiều nhất ... hộp', answer: '23406' },
        { label: 'Còn thừa ... cái áo', answer: '2' },
      ],
      hints: ['Lấy 187 250 chia cho 8: thương là số hộp, số dư là số áo còn thừa.'],
    },
  ],

  // ── Bài 68. Luyện tập (trang 78) ──────────────────────────────────────────────────────────────
  'bai-68': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [divCalc(67494, 7, 'a) '), divCalc(42789, 5), divCalc(359361, 9, 'b) '), divCalc(238057, 8)],
      hints: [HINT_DIV],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '2. Tìm hai số biết tổng và hiệu của chúng lần lượt là:\na) 42 506 và 18 472 ; b) 137 895 và 85 287.',
      blanks: [
        { label: 'a) Số lớn là: ...', answer: '30489' },
        { label: 'Số bé là: ...', answer: '12017' },
        { label: 'b) Số lớn là: ...', answer: '111591' },
        { label: 'Số bé là: ...', answer: '26304' },
      ],
      hints: ['Số lớn = (tổng + hiệu) : 2. Số bé = (tổng − hiệu) : 2.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Một chuyến xe lửa có 3 toa xe, mỗi toa chở 14 580kg hàng và có 6 toa xe khác, mỗi toa chở 13 275kg hàng. Hỏi trung bình mỗi toa xe chở bao nhiêu ki-lô-gam hàng?',
      blanks: [
        { label: '3 toa xe chở ... kg hàng', answer: '43740' },
        { label: '6 toa xe chở ... kg hàng', answer: '79650' },
        { label: 'Chuyến xe lửa có tất cả ... toa xe', answer: '9' },
        { label: 'Trung bình mỗi toa xe chở ... kg hàng', answer: '13710' },
      ],
      hints: ['Tìm tổng số hàng của tất cả các toa, rồi chia cho tổng số toa (3 + 6).'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '4. Tính bằng hai cách: a) (33164 + 28528) : 4 ; b) (403494 − 16415) : 7.',
      blanks: [
        steps('a) Cách 1: (33164 + 28528) : 4 = ... : 4 = ...', [61692, 15423]),
        steps('Cách 2: (33164 + 28528) : 4 = 33164 : 4 + 28528 : 4 = ... + ... = ...', [8291, 7132, 15423]),
        steps('b) Cách 1: (403494 − 16415) : 7 = ... : 7 = ...', [387079, 55297]),
        steps('Cách 2: (403494 − 16415) : 7 = 403494 : 7 − 16415 : 7 = ... − ... = ...', [57642, 2345, 55297]),
      ],
      hints: ['Cách 1: tính trong ngoặc trước. Cách 2: chia từng số cho số chia rồi cộng (hoặc trừ) hai kết quả.'],
    },
  ],

  // ── Bài 69. Chia một số cho một tích (trang 78–79) ────────────────────────────────────────────
  'bai-69': [
    {
      type: 'fill', stars: 2,
      q: '1. Tính giá trị của biểu thức:',
      blanks: [nham('a) 50 : (2 × 5)', 5), nham('b) 72 : (9 × 8)', 1), nham('c) 28 : (7 × 2)', 2)],
      hints: ['Tính tích trong ngoặc rồi chia, hoặc chia lần lượt cho từng thừa số: 50 : 2 : 5.'],
    },
    {
      type: 'fill', stars: 3,
      q: `2. Chuyển mỗi phép chia sau đây thành phép chia một số chia cho một tích rồi tính (theo mẫu):\n${mau('60 : 15 = 60 : (5 × 3) = 60 : 5 : 3 = 12 : 3 = 4')}`,
      blanks: [
        { label: 'a) 80 : 40 = 80 : (... × ...) = ...', answer: '10,4,2', validate: tichValidate(40, 2) },
        { label: 'b) 150 : 50 = 150 : (... × ...) = ...', answer: '10,5,3', validate: tichValidate(50, 3) },
        { label: 'c) 80 : 16 = 80 : (... × ...) = ...', answer: '8,2,5', validate: tichValidate(16, 5) },
      ],
      hints: ['Viết số chia thành tích hai số (vd. 40 = 10 × 4), rồi chia lần lượt: 80 : 10 : 4.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '3. Có 2 bạn học sinh, mỗi bạn mua 3 quyển vở cùng loại và tất cả phải trả 7200 đồng. Tính giá tiền mỗi quyển vở.',
      blanks: [{ label: 'Giá tiền mỗi quyển vở là: ... đồng', answer: '1200' }],
      hints: ['Tìm số quyển vở cả hai bạn mua (2 × 3), rồi lấy 7200 chia cho số quyển đó.'],
    },
  ],

  // ── Bài 70. Chia một tích cho một số (trang 79) ───────────────────────────────────────────────
  'bai-70': [
    {
      type: 'fill', stars: 2,
      q: '1. Tính bằng hai cách: a) (8 × 23) : 4 ; b) (15 × 24) : 6.',
      blanks: [
        steps('a) Cách 1: (8 × 23) : 4 = ... : 4 = ...', [184, 46]),
        steps('Cách 2: (8 × 23) : 4 = (8 : 4) × 23 = ... × 23 = ...', [2, 46]),
        steps('b) Cách 1: (15 × 24) : 6 = ... : 6 = ...', [360, 60]),
        steps('Cách 2: (15 × 24) : 6 = 15 × (24 : 6) = 15 × ... = ...', [4, 60]),
      ],
      hints: ['Cách 1: tính tích trước rồi chia. Cách 2: lấy thừa số chia hết cho số chia, chia trước rồi nhân với thừa số kia.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Tính bằng cách thuận tiện nhất: (25 × 36) : 9.',
      blanks: [steps('(25 × 36) : 9 = 25 × ... = ...', [4, 100])],
      hints: ['36 chia hết cho 9: tính 36 : 9 trước rồi nhân với 25.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: `3. Một cửa hàng có 5 tấm vải, mỗi tấm dài 30m. Cửa hàng đã bán được ${fr(1, 5)} số vải. Hỏi cửa hàng đã bán được bao nhiêu mét vải?`,
      blanks: [
        { label: 'Cửa hàng có tất cả ... m vải', answer: '150' },
        { label: 'Cửa hàng đã bán được ... m vải', answer: '30' },
      ],
      hints: [`Tìm số mét vải của 5 tấm, rồi chia cho 5 để được ${fr(1, 5)} số vải.`],
    },
  ],

  // ── Bài 71. Chia hai số có tận cùng là các chữ số 0 (trang 80) ────────────────────────────────
  'bai-71': [
    {
      type: 'fill', stars: 2,
      q: '1. Tính:',
      blanks: [divCalc(420, 60, 'a) '), divCalc(4500, 500), divCalc(85000, 500, 'b) '), divCalc(92000, 400)],
      hints: ['Cùng xoá một, hai, … chữ số 0 ở tận cùng của số chia và số bị chia, rồi chia như thường: 420 : 60 = 42 : 6.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '2. Tìm x:',
      blanks: [
        { label: 'a) x × 40 = 25600 → x = ...', answer: '640' },
        { label: 'b) x × 90 = 37800 → x = ...', answer: '420' },
      ],
      hints: ['Muốn tìm thừa số chưa biết, lấy tích chia cho thừa số đã biết.'],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: '3. Người ta dự định xếp 180 tấn hàng lên các toa xe lửa. Hỏi:\na) Nếu mỗi toa xe chở được 20 tấn hàng thì cần mấy toa xe loại đó?\nb) Nếu mỗi toa xe chở được 30 tấn hàng thì cần mấy toa xe loại đó?',
      blanks: [
        { label: 'a) Cần ... toa xe', answer: '9' },
        { label: 'b) Cần ... toa xe', answer: '6' },
      ],
      hints: ['Lấy số tấn hàng chia cho số tấn mỗi toa chở được.'],
    },
  ],

  // ── Bài 72. Chia cho số có hai chữ số (trang 81) ──────────────────────────────────────────────
  'bai-72': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [divCalc(288, 24, 'a) '), divCalc(740, 45), divCalc(469, 67, 'b) '), divCalc(397, 56)],
      hints: [HINT_DIV, HINT_DIV2],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '2. Người ta xếp đều 240 bộ bàn ghế vào 15 phòng học. Hỏi mỗi phòng xếp được bao nhiêu bộ bàn ghế?',
      blanks: [{ label: 'Mỗi phòng xếp được ... bộ bàn ghế', answer: '16' }],
      hints: ['Xếp đều vào 15 phòng: lấy 240 chia cho 15.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '3. Tìm x:',
      blanks: [
        { label: 'a) x × 34 = 714 → x = ...', answer: '21' },
        { label: 'b) 846 : x = 18 → x = ...', answer: '47' },
      ],
      hints: ['Tìm thừa số: lấy tích chia cho thừa số kia. Tìm số chia: lấy số bị chia chia cho thương.'],
    },
  ],

  // ── Bài 73. Chia cho số có hai chữ số (tiếp theo) (trang 82) ──────────────────────────────────
  'bai-73': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [divCalc(4674, 82, 'a) '), divCalc(2488, 35), divCalc(5781, 47, 'b) '), divCalc(9146, 72)],
      hints: [HINT_DIV, HINT_DIV2],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '2. Người ta đóng gói 3500 bút chì theo từng tá (mỗi tá gồm 12 cái). Hỏi đóng gói được nhiều nhất bao nhiêu tá bút chì và còn thừa mấy bút chì?',
      blanks: [
        { label: 'Đóng gói được nhiều nhất ... tá bút chì', answer: '291' },
        { label: 'Còn thừa ... bút chì', answer: '8' },
      ],
      hints: ['Lấy 3500 chia cho 12: thương là số tá, số dư là số bút chì còn thừa.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '3. Tìm x:',
      blanks: [
        { label: 'a) 75 × x = 1800 → x = ...', answer: '24' },
        { label: 'b) 1855 : x = 35 → x = ...', answer: '53' },
      ],
      hints: ['Tìm thừa số: lấy tích chia cho thừa số kia. Tìm số chia: lấy số bị chia chia cho thương.'],
    },
  ],

  // ── Bài 74. Luyện tập (trang 83) ──────────────────────────────────────────────────────────────
  'bai-74': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [divCalc(855, 45, 'a) '), divCalc(579, 36), divCalc(9009, 33, 'b) '), divCalc(9276, 39)],
      hints: [HINT_DIV, HINT_DIV2],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '2. Tính giá trị của biểu thức:',
      blanks: [
        { label: 'a) 4237 × 18 − 34578 = ...', answer: '41688' },
        { label: '8064 : 64 × 37 = ...', answer: '4662' },
        { label: 'b) 46857 + 3444 : 28 = ...', answer: '46980' },
        { label: '601759 − 1988 : 14 = ...', answer: '601617' },
      ],
      hints: ['Nhân, chia trước; cộng, trừ sau. Chỉ có nhân và chia thì tính từ trái sang phải.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Mỗi bánh xe đạp cần có 36 nan hoa. Hỏi có 5260 nan hoa thì lắp được nhiều nhất bao nhiêu chiếc xe đạp 2 bánh và còn thừa bao nhiêu nan hoa?',
      blanks: [
        { label: 'Mỗi xe đạp cần ... nan hoa', answer: '72' },
        { label: 'Lắp được nhiều nhất ... chiếc xe đạp', answer: '73' },
        { label: 'Còn thừa ... nan hoa', answer: '4' },
      ],
      hints: ['Một xe đạp có 2 bánh: tìm số nan hoa của một xe, rồi lấy 5260 chia cho số đó.'],
    },
  ],

  // ── Bài 75. Chia cho số có hai chữ số (tiếp theo) (trang 83–84) ───────────────────────────────
  'bai-75': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [divCalc(23576, 56, 'a) '), divCalc(31628, 48), divCalc(18510, 15, 'b) '), divCalc(42546, 37)],
      hints: [HINT_DIV, HINT_DIV2],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '2. Một vận động viên đua xe đạp trong 1 giờ 15 phút đi được 38km 400m. Hỏi trung bình mỗi phút người đó đi được bao nhiêu mét?',
      blanks: [
        { label: '1 giờ 15 phút = ... phút', answer: '75' },
        { label: '38km 400m = ... m', answer: '38400' },
        { label: 'Trung bình mỗi phút người đó đi được ... m', answer: '512' },
      ],
      hints: ['Đổi thời gian ra phút (1 giờ = 60 phút) và quãng đường ra mét (1km = 1000m), rồi chia.'],
    },
  ],

  // ── Bài 76. Luyện tập (trang 84) ──────────────────────────────────────────────────────────────
  'bai-76': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [
        divCalc(4725, 15, 'a) '), divCalc(4674, 82), divCalc(4935, 44),
        divCalc(35136, 18, 'b) '), divCalc(18408, 52), divCalc(17826, 48),
      ],
      hints: [HINT_DIV, HINT_DIV2],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '2. Cứ 25 viên gạch hoa thì lát được 1m² nền nhà. Hỏi nếu dùng hết 1050 viên gạch loại đó thì lát được bao nhiêu mét vuông nền nhà?',
      blanks: [{ label: 'Lát được ... m² nền nhà', answer: '42' }],
      hints: ['Mỗi 25 viên lát được 1m²: lấy 1050 chia cho 25.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Một đội sản xuất có 25 người. Tháng 1 đội đó làm được 855 sản phẩm, tháng 2 làm được 920 sản phẩm, tháng 3 làm được 1350 sản phẩm. Hỏi trong cả ba tháng đó trung bình mỗi người của đội làm được bao nhiêu sản phẩm?',
      blanks: [
        { label: 'Cả ba tháng đội làm được ... sản phẩm', answer: '3125' },
        { label: 'Trung bình mỗi người làm được ... sản phẩm', answer: '125' },
      ],
      hints: ['Cộng số sản phẩm của ba tháng, rồi chia cho số người của đội.'],
    },
    {
      type: 'fill', stars: 4, img: imgSaiODau,
      q: '4. Sai ở đâu? Hai phép chia 12345 : 67 dưới đây đều có chỗ sai. Ghi Đ (đúng) hoặc S (sai), rồi viết kết quả đúng.',
      blanks: [
        { label: 'a) Phép chia a) là đúng ...', answer: 'S', validate: dsValidate(false) },
        { label: 'b) Thương 184 của phép chia b) là đúng ...', answer: 'Đ', validate: dsValidate(true) },
        { label: 'Số dư 47 của phép chia b) là đúng ...', answer: 'S', validate: dsValidate(false) },
        { label: 'Phép chia đúng: 12345 : 67 = ... (dư ...)', answer: '184,17', validate: listValidate(['184', '17']) },
      ],
      hints: ['Ở mỗi bước, số dư phải bé hơn số chia: 95 lớn hơn 67 là chưa chia hết.', 'Thử lại: thương × số chia + số dư phải bằng 12345.'],
    },
  ],

  // ── Bài 77. Thương có chữ số 0 (trang 85) ─────────────────────────────────────────────────────
  'bai-77': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [
        divCalc(8750, 35, 'a) '), divCalc(23520, 56), divCalc(11780, 42),
        divCalc(2996, 28, 'b) '), divCalc(2420, 12), divCalc(13870, 45),
      ],
      hints: [HINT_DIV, 'Lần hạ nào số được bé hơn số chia thì viết 0 vào thương rồi hạ tiếp.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '2. Một máy bơm nước trong 1 giờ 12 phút bơm được 97 200l nước vào bể bơi. Hỏi trung bình mỗi phút máy đó bơm được bao nhiêu lít nước?',
      blanks: [
        { label: '1 giờ 12 phút = ... phút', answer: '72' },
        { label: 'Trung bình mỗi phút máy bơm được ... l nước', answer: '1350' },
      ],
      hints: ['Đổi 1 giờ 12 phút ra phút (1 giờ = 60 phút), rồi lấy số lít nước chia cho số phút.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Một mảnh đất hình chữ nhật có tổng độ dài hai cạnh liên tiếp bằng 307m, chiều dài hơn chiều rộng là 97m.\na) Tính chu vi mảnh đất đó;\nb) Tính diện tích mảnh đất đó.',
      blanks: [
        { label: 'Chiều dài mảnh đất là: ... m', answer: '202' },
        { label: 'Chiều rộng mảnh đất là: ... m', answer: '105' },
        { label: 'a) Chu vi mảnh đất là: ... m', answer: '614' },
        { label: 'b) Diện tích mảnh đất là: ... m²', answer: '21210' },
      ],
      hints: ['Hai cạnh liên tiếp là chiều dài và chiều rộng: biết tổng 307 và hiệu 97, tìm hai số.', 'Chu vi = (dài + rộng) × 2. Diện tích = dài × rộng.'],
    },
  ],

  // ── Bài 78. Chia cho số có ba chữ số (trang 86) ───────────────────────────────────────────────
  'bai-78': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [divCalc(2120, 424, 'a) '), divCalc(1935, 354), divCalc(6420, 321, 'b) '), divCalc(4957, 165)],
      hints: [HINT_DIV, 'Ước lượng thương: làm tròn số chia (vd. 424 → 400) rồi nhẩm.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '2. Tính giá trị của biểu thức:',
      blanks: [
        { label: 'a) 1995 × 253 + 8910 : 495 = ...', answer: '504753' },
        { label: 'b) 8700 : 25 : 4 = ...', answer: '87' },
      ],
      hints: ['Nhân, chia trước; cộng sau. Chỉ có phép chia thì tính từ trái sang phải.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Có hai cửa hàng, mỗi cửa hàng đều nhận về 7128m vải. Trung bình mỗi ngày cửa hàng thứ nhất bán được 264m vải, cửa hàng thứ hai bán được 297m vải. Hỏi cửa hàng nào bán hết số vải đó sớm hơn và sớm hơn mấy ngày?',
      blanks: [
        { label: 'Cửa hàng thứ nhất bán hết trong ... ngày', answer: '27' },
        { label: 'Cửa hàng thứ hai bán hết trong ... ngày', answer: '24' },
        {
          label: 'Cửa hàng thứ ... bán hết sớm hơn ... ngày', answer: '2,3',
          validate: (v) => { const [a, b] = String(v).split(',').map(s => s.trim().toLowerCase()); return (a === '2' || a === 'hai') && b === '3'; },
        },
      ],
      hints: ['Lấy 7128 chia cho số mét vải bán mỗi ngày để biết mỗi cửa hàng bán trong mấy ngày, rồi so sánh.'],
    },
  ],

  // ── Bài 79. Luyện tập (trang 87) ──────────────────────────────────────────────────────────────
  'bai-79': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [
        divCalc(708, 354, 'a) '), divCalc(7552, 236), divCalc(9060, 453),
        divCalc(704, 234, 'b) '), divCalc(8770, 365), divCalc(6260, 156),
      ],
      hints: [HINT_DIV, 'Ước lượng thương: làm tròn số chia (vd. 236 → 200 hoặc 240) rồi nhẩm.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '2. Người ta xếp những gói kẹo vào 24 hộp, mỗi hộp chứa 120 gói. Hỏi nếu mỗi hộp chứa 160 gói kẹo thì cần có bao nhiêu hộp để xếp hết số gói kẹo đó?',
      blanks: [
        { label: 'Số gói kẹo là: ... gói', answer: '2880' },
        { label: 'Cần có ... hộp', answer: '18' },
      ],
      hints: ['Tìm tổng số gói kẹo (24 hộp, mỗi hộp 120 gói), rồi chia cho 160.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '3. Tính bằng hai cách: a) 2205 : (35 × 7) ; b) 3332 : (4 × 49).',
      blanks: [
        steps('a) Cách 1: 2205 : (35 × 7) = 2205 : ... = ...', [245, 9]),
        steps('Cách 2: 2205 : (35 × 7) = 2205 : 35 : 7 = ... : 7 = ...', [63, 9]),
        steps('b) Cách 1: 3332 : (4 × 49) = 3332 : ... = ...', [196, 17]),
        steps('Cách 2: 3332 : (4 × 49) = 3332 : 4 : 49 = ... : 49 = ...', [833, 17]),
      ],
      hints: ['Cách 1: tính tích trong ngoặc trước. Cách 2: chia lần lượt cho từng thừa số.'],
    },
  ],

  // ── Bài 80. Chia cho số có ba chữ số (tiếp theo) (trang 87–88) ────────────────────────────────
  'bai-80': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [divCalc(62321, 307, 'a) '), divCalc(81350, 187, 'b) ')],
      hints: [HINT_DIV, 'Ước lượng thương: làm tròn số chia (vd. 307 → 300) rồi nhẩm.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '2. Tìm x:',
      blanks: [
        { label: 'a) x × 405 = 86265 → x = ...', answer: '213' },
        { label: 'b) 89658 : x = 293 → x = ...', answer: '306' },
      ],
      hints: ['Tìm thừa số: lấy tích chia cho thừa số kia. Tìm số chia: lấy số bị chia chia cho thương.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '3. Một nhà máy sản xuất trong một năm được 49 410 sản phẩm. Hỏi trung bình mỗi ngày nhà máy đó sản xuất được bao nhiêu sản phẩm, biết một năm làm việc 305 ngày?',
      blanks: [{ label: 'Trung bình mỗi ngày sản xuất được ... sản phẩm', answer: '162' }],
      hints: ['Lấy số sản phẩm cả năm chia cho số ngày làm việc.'],
    },
  ],

  // ── Bài 81. Luyện tập (trang 89) ──────────────────────────────────────────────────────────────
  'bai-81': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [
        divCalc(54322, 346, 'a) '), divCalc(25275, 108), divCalc(86679, 214),
        divCalc(106141, 413, 'b) '), divCalc(123220, 404), divCalc(172869, 258),
      ],
      hints: [HINT_DIV, 'Ước lượng thương: làm tròn số chia (vd. 346 → 350) rồi nhẩm.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '2. Người ta chia đều 18kg muối vào 240 gói. Hỏi mỗi gói có bao nhiêu gam muối?',
      blanks: [
        { label: '18kg = ... g', answer: '18000' },
        { label: 'Mỗi gói có ... g muối', answer: '75' },
      ],
      hints: ['Đổi 18kg ra gam (1kg = 1000g), rồi chia cho 240.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '3. Một sân bóng đá hình chữ nhật có diện tích 7140m², chiều dài 105m.\na) Tìm chiều rộng của sân bóng đá;\nb) Tính chu vi của sân bóng đá.',
      blanks: [
        { label: 'a) Chiều rộng sân bóng đá là: ... m', answer: '68' },
        { label: 'b) Chu vi sân bóng đá là: ... m', answer: '346' },
      ],
      hints: ['Chiều rộng = diện tích : chiều dài. Chu vi = (dài + rộng) × 2.'],
    },
  ],

  // ── Bài 82. Luyện tập chung (trang 90–91) ─────────────────────────────────────────────────────
  'bai-82': [
    {
      type: 'table', stars: 3, calcFree: true,
      calcs: ['27 × 23', '152 × 134', '66178 : 203', '16250 : 125'],
      q: '1. Viết số thích hợp vào ô trống:',
      tables: [
        {
          rows: [
            ['Thừa số', 27, blank(23), 23, 152, 134, blank(134)],
            ['Thừa số', 23, 27, blank(27), 134, blank(152), 152],
            ['Tích', blank(621), 621, 621, blank(20368), 20368, 20368],
          ],
        },
        {
          rows: [
            ['Số bị chia', 66178, 66178, blank(66178), 16250, 16250, blank(16250)],
            ['Số chia', 203, blank(203), 326, 125, blank(125), 125],
            ['Thương', blank(326), 326, 203, blank(130), 130, 130],
          ],
        },
      ],
      hints: ['Tìm thừa số: lấy tích chia cho thừa số kia.', 'Tìm số chia: lấy số bị chia chia cho thương. Tìm số bị chia: lấy thương nhân với số chia.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Đặt tính rồi tính:',
      blanks: [divCalc(39870, 123, 'a) '), divCalc(25863, 251, 'b) '), divCalc(30395, 217, 'c) ')],
      hints: [HINT_DIV],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Một Sở Giáo dục - Đào tạo nhận được 468 thùng hàng, mỗi thùng có 40 bộ đồ dùng học toán. Người ta đã chia đều số bộ đồ dùng đó cho 156 trường. Hỏi mỗi trường nhận được bao nhiêu bộ đồ dùng học toán?',
      blanks: [
        { label: 'Số bộ đồ dùng học toán là: ... bộ', answer: '18720' },
        { label: 'Mỗi trường nhận được ... bộ đồ dùng học toán', answer: '120' },
      ],
      hints: ['Tìm tổng số bộ đồ dùng (468 thùng, mỗi thùng 40 bộ), rồi chia đều cho 156 trường.'],
    },
    {
      type: 'fill', stars: 3, img: imgSachBan,
      q: '4. Biểu đồ dưới đây nói về số sách giáo khoa của một cửa hàng bán được trong bốn tuần trước ngày khai giảng. Dựa vào biểu đồ hãy trả lời các câu hỏi sau:',
      blanks: [
        { label: 'a) Tuần 1 bán được ít hơn tuần 4 ... cuốn sách', answer: '1000' },
        { label: 'b) Tuần 2 bán được nhiều hơn tuần 3 ... cuốn sách', answer: '500' },
        { label: 'c) Trung bình mỗi tuần bán được ... cuốn sách', answer: '5500' },
      ],
      calcFree: true,
      hints: ['Đọc số sách mỗi tuần ở đỉnh cột, dóng sang trục bên trái.', 'c) Cộng số sách của bốn tuần rồi chia cho 4.'],
    },
  ],

  // ── Bài 83. Luyện tập chung (trang 91–93) ─────────────────────────────────────────────────────
  'bai-83': [
    {
      type: 'fill', stars: 3, img: imgHinhCN,
      q: '1. Mỗi bài tập dưới đây có nêu kèm theo một số câu trả lời A, B, C, D (là đáp số, kết quả tính, …). Hãy khoanh vào chữ đặt trước câu trả lời đúng.',
      blanks: [
        letter('a) Số nào trong các số dưới đây có chữ số 9 biểu thị cho 9000? A. 93 574 ; B. 29 687 ; C. 17 932 ; D. 80 296. Chữ: ...', 'B'),
        letter('b) Phép cộng 24675 + 45327 có kết quả là: A. 699 912 ; B. 69 902 ; C. 70 002 ; D. 60 002. Chữ: ...', 'C'),
        letter('c) Phép trừ 8634 − 3059 có kết quả là: A. 5625 ; B. 5685 ; C. 5675 ; D. 5575. Chữ: ...', 'D'),
        letter('d) Thương của phép chia 67200 : 80 là số có mấy chữ số? A. 5 chữ số ; B. 4 chữ số ; C. 3 chữ số ; D. 2 chữ số. Chữ: ...', 'C'),
        letter('e) Trong các hình chữ nhật (hình vẽ), hình nào có diện tích lớn hơn 30cm²? A. Hình M ; B. Hình N ; C. Hình P ; D. Hình Q. Chữ: ...', 'C'),
      ],
      calcs: ['24675 + 45327', '8634 − 3059', '67200 : 80'],
      hints: ['a) Chữ số 9 biểu thị 9000 khi nó đứng ở hàng nghìn.', 'e) Diện tích hình chữ nhật = chiều dài × chiều rộng: tính từng hình rồi so với 30cm².'],
    },
    {
      type: 'fill', stars: 2, img: imgGioMua,
      q: '2. Biểu đồ dưới đây cho biết số giờ có mưa của từng ngày trong một tuần lễ (có mưa nhiều) ở một huyện vùng biển. Trả lời các câu hỏi sau:',
      blanks: [
        dayBlank('a) Ngày có mưa với số giờ nhiều nhất là: ...', 'Thứ năm'),
        { label: 'b) Ngày thứ sáu có mưa trong ... giờ', answer: '2' },
        dayBlank('c) Ngày không có mưa trong tuần lễ là: ...', 'Thứ tư'),
      ],
      hints: ['Cột cao nhất là ngày mưa nhiều giờ nhất; ngày không có cột là ngày không mưa.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '3. Một trường tiểu học có 672 học sinh, số học sinh nữ nhiều hơn số học sinh nam là 92 em. Hỏi trường đó có bao nhiêu học sinh nữ, bao nhiêu học sinh nam?',
      blanks: [
        { label: 'Số học sinh nữ là: ... em', answer: '382' },
        { label: 'Số học sinh nam là: ... em', answer: '290' },
      ],
      hints: ['Số lớn = (tổng + hiệu) : 2: số học sinh nữ = (672 + 92) : 2.'],
    },
  ],
};

