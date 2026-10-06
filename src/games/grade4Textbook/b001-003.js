/**
 * SGK Toán 4: bài 1–3, Ôn tập các số đến 100 000 (sách trang 3–5).
 * Hình vẽ lại: scripts/redraw/g4t_bai001_003.py (bộ vẽ kit_g4t.py).
 */
import { blank, listValidate, mau, calc, divCalc, nham, placeSum, readCell, num } from './kit.js';
import imgTiaSo from '../../assets/grade4-textbook/bai1_q1_tiaso.svg';
import imgChuVi from '../../assets/grade4-textbook/bai1_q4_chuvi.svg';

const cmp = (l, r, a, b) => ({ left: l, right: r, answer: a > b ? '>' : a < b ? '<' : '=' });
const order = (label, nums) => ({ label: `${label} ...`, answer: nums.map(num).join('; '), validate: listValidate(nums.map(num)) });

export const QUESTIONS = {
  // ── Bài 1. Ôn tập các số đến 100 000 (trang 3–4) ──────────────────────────────────────────────
  'bai-1': [
    {
      type: 'fill', stars: 1, img: imgTiaSo,
      q: '1. a) Viết số thích hợp vào dưới mỗi vạch của tia số.\nb) Viết số thích hợp vào chỗ chấm.',
      blanks: [
        { label: 'a) 0 ; 10 000 ; ... ; 30 000 ; ... ; ... ; ...', answer: '20000,40000,50000,60000', validate: listValidate(['20000', '40000', '50000', '60000']) },
        { label: 'b) 36 000 ; 37 000 ; ... ; ... ; ... ; 41 000 ; ...', answer: '38000,39000,40000,42000', validate: listValidate(['38000', '39000', '40000', '42000']) },
      ],
      hints: ['a) Hai vạch liền nhau hơn kém nhau 10 000.', 'b) Mỗi số hơn số đứng trước 1 000.'],
    },
    {
      type: 'table', stars: 2,
      q: '2. Viết theo mẫu:',
      headers: ['Viết số', 'Chục nghìn', 'Nghìn', 'Trăm', 'Chục', 'Đơn vị', 'Đọc số'],
      rows: [
        { sample: true, cells: ['42 571', 4, 2, 5, 7, 1, 'bốn mươi hai nghìn năm trăm bảy mươi mốt'] },
        [blank(63850), blank(6), blank(3), blank(8), blank(5), blank(0), 'sáu mươi ba nghìn tám trăm năm mươi'],
        ['91 907', blank(9), blank(1), blank(9), blank(0), blank(7), readCell(91907)],
        ['16 212', blank(1), blank(6), blank(2), blank(1), blank(2), readCell(16212)],
        [blank(8105), '', blank(8), blank(1), blank(0), blank(5), 'tám nghìn một trăm linh năm'],
        [blank(70008), 7, 0, 0, 0, 8, readCell(70008)],
      ],
      hints: ['Đọc số từ trái sang phải: "... nghìn" rồi đến trăm, chục, đơn vị. Hàng chục bằng 0 thì đọc "linh".'],
    },
    {
      type: 'fill', stars: 2,
      q: `3. a) Viết mỗi số sau thành tổng (theo mẫu): 8723 ; 9171 ; 3082 ; 7006.\n${mau('8723 = 8000 + 700 + 20 + 3')}\nb) Viết theo mẫu:\n${mau('9000 + 200 + 30 + 2 = 9232')}`,
      blanks: [
        placeSum(9171, 'a) '), placeSum(3082), placeSum(7006),
        nham('b) 7000 + 300 + 50 + 1', 7351), nham('6000 + 200 + 30', 6230),
        nham('6000 + 200 + 3', 6203), nham('5000 + 2', 5002),
      ],
      hints: ['a) Mỗi chữ số khác 0 cho một số hạng: chữ số hàng nghìn → … 000, hàng trăm → … 00, hàng chục → … 0.'],
    },
    {
      type: 'fill', stars: 2, img: imgChuVi,
      q: '4. Tính chu vi các hình sau:',
      blanks: [
        { label: 'Chu vi hình tứ giác ABCD là: ... cm', answer: '17' },
        { label: 'Chu vi hình chữ nhật MNPQ là: ... cm', answer: '24' },
        { label: 'Chu vi hình vuông GHIK là: ... cm', answer: '20' },
      ],
      hints: ['Chu vi = tổng độ dài các cạnh. Hình chữ nhật: (dài + rộng) × 2. Hình vuông: cạnh × 4.'],
      // 🐜 Đo chu vi (engine/perimPlay.js): toạ độ theo bai1_q4_chuvi.svg.
      perimPlay: [
        { label: 'ABCD', path: 'ABCD', lens: [6, 4, 3, 4], points: { A: [30, 190], B: [130, 40], C: [200, 140], D: [150, 215] }, fill: 0 },
        { label: 'MNPQ', path: 'MNPQ', rect: [8, 4], points: { M: [310, 80], N: [510, 80], P: [510, 200], Q: [310, 200] }, fill: 1 },
        { label: 'GHIK', path: 'GHIK', square: 5, points: { G: [610, 60], H: [750, 60], I: [750, 200], K: [610, 200] }, fill: 2 },
      ],
    },
  ],

  // ── Bài 2. Ôn tập các số đến 100 000 (tiếp theo) (trang 4–5) ──────────────────────────────────
  'bai-2': [
    {
      type: 'fill', stars: 1,
      q: '1. Tính nhẩm:',
      blanks: [
        nham('7000 + 2000', 9000), nham('9000 − 3000', 6000), nham('8000 : 2', 4000), nham('3000 × 2', 6000),
        nham('16000 : 2', 8000), nham('8000 × 3', 24000), nham('11000 × 3', 33000), nham('49000 : 7', 7000),
      ],
      hints: ['Nhẩm theo nghìn: 7 nghìn + 2 nghìn = 9 nghìn, vậy 7000 + 2000 = 9000.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Đặt tính rồi tính:',
      blanks: [
        calc('a) 4637 + 8245', 12882), calc('7035 − 2316', 4719), calc('325 × 3', 975), divCalc(25968, 3),
        calc('b) 5916 + 2358', 8274), calc('6471 − 518', 5953), calc('4162 × 4', 16648), divCalc(18418, 4),
      ],
      hints: ['Bấm ✍️ Tính để đặt tính trên tờ vở: viết các chữ số thẳng cột, tính từ hàng đơn vị. Phép chia thì chia từ trái sang phải.'],
    },
    {
      type: 'compare', stars: 1,
      q: '3. >, <, = ?',
      rows: [
        cmp('4327', '3742', 4327, 3742), cmp('5870', '5890', 5870, 5890), cmp('65 300', '9530', 65300, 9530),
        cmp('28 676', '28 676', 28676, 28676), cmp('97 321', '97 400', 97321, 97400), cmp('100 000', '99 999', 100000, 99999),
      ],
    },
    {
      type: 'fill', stars: 2,
      q: '4. a) Viết các số sau theo thứ tự từ bé đến lớn: 65 371 ; 75 631 ; 56 731 ; 67 351.\nb) Viết các số sau theo thứ tự từ lớn đến bé: 82 697 ; 62 978 ; 92 678 ; 79 862.',
      blanks: [
        { ...order('a)', [56731, 65371, 67351, 75631]), tiles: ['65 371', '75 631', '56 731', '67 351'], tileSep: '; ' },
        { ...order('b)', [92678, 82697, 79862, 62978]), tiles: ['82 697', '62 978', '92 678', '79 862'], tileSep: '; ' },
      ],
      hints: ['So sánh chữ số hàng chục nghìn trước; bằng nhau thì so đến hàng nghìn.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: `5. Bác Lan ghi chép việc mua hàng theo bảng sau:<table class="gw-book-table"><tr><th>Loại hàng</th><th>Giá tiền</th><th>Số lượng mua</th></tr><tr><td>Bát</td><td>2500 đồng 1 cái</td><td>5 cái</td></tr><tr><td>Đường</td><td>6400 đồng 1kg</td><td>2kg</td></tr><tr><td>Thịt</td><td>35 000 đồng 1kg</td><td>2kg</td></tr></table>`,
      blanks: [
        { label: 'a) Tiền mua bát: ... đồng', answer: '12500' },
        { label: 'Tiền mua đường: ... đồng', answer: '12800' },
        { label: 'Tiền mua thịt: ... đồng', answer: '70000' },
        { label: 'b) Bác Lan mua tất cả hết ... đồng', answer: '95300' },
        { label: 'c) Nếu có 100 000 đồng thì sau khi mua số hàng trên bác Lan còn ... đồng', answer: '4700' },
      ],
      calcFree: true,
      hints: ['Tiền mua mỗi loại = giá tiền 1 cái (1kg) × số lượng.', 'b) Cộng tiền ba loại hàng. c) Lấy 100 000 trừ số tiền đã mua.'],
    },
  ],

  // ── Bài 3. Ôn tập các số đến 100 000 (tiếp theo) (trang 5) ────────────────────────────────────
  'bai-3': [
    {
      type: 'fill', stars: 2,
      q: '1. Tính nhẩm:',
      blanks: [
        nham('a) 6000 + 2000 − 4000', 4000), nham('90000 − (70000 − 20000)', 40000), nham('90000 − 70000 − 20000', 0), nham('12000 : 6', 2000),
        nham('b) 21000 × 3', 63000), nham('9000 − 4000 × 2', 1000), nham('(9000 − 4000) × 2', 10000), nham('8000 − 6000 : 3', 6000),
      ],
      hints: ['Trong ngoặc tính trước; nhân, chia trước rồi cộng, trừ sau.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Đặt tính rồi tính:',
      blanks: [
        calc('a) 6083 + 2378', 8461), calc('28763 − 23359', 5404), calc('2570 × 5', 12850), divCalc(40075, 7),
        calc('b) 56346 + 2854', 59200), calc('43000 − 21308', 21692), calc('13065 × 4', 52260), divCalc(65040, 5),
      ],
      hints: ['Bấm ✍️ Tính để đặt tính trên tờ vở rồi ghi kết quả vào ô.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Tính giá trị của biểu thức:',
      blanks: [
        { label: 'a) 3257 + 4659 − 1300 = ...', answer: '6616' },
        { label: 'b) 6000 − 1300 × 2 = ...', answer: '3400' },
        { label: 'c) (70850 − 50230) × 3 = ...', answer: '61860' },
        { label: 'd) 9000 + 1000 : 2 = ...', answer: '9500' },
      ],
      calcFree: true,
      hints: ['Chỉ có cộng, trừ: tính từ trái sang phải. Có nhân, chia: tính nhân, chia trước. Có ngoặc: tính trong ngoặc trước.'],
    },
    {
      type: 'fill', stars: 3,
      q: '4. Tìm x:',
      blanks: [
        { label: 'a) x + 875 = 9936 → x = ...', answer: '9061' },
        { label: 'x − 725 = 8259 → x = ...', answer: '8984' },
        { label: 'b) x × 2 = 4826 → x = ...', answer: '2413' },
        { label: 'x : 3 = 1532 → x = ...', answer: '4596' },
      ],
      calcFree: true,
      hints: ['Số hạng = tổng − số hạng kia; số bị trừ = hiệu + số trừ.', 'Thừa số = tích : thừa số kia; số bị chia = thương × số chia.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '5. Một nhà máy sản xuất trong 4 ngày được 680 chiếc ti vi. Hỏi trong 7 ngày nhà máy đó sản xuất được bao nhiêu chiếc ti vi, biết số ti vi sản xuất mỗi ngày là như nhau?',
      blanks: [
        { label: 'Mỗi ngày sản xuất được ... chiếc ti vi.', answer: '170' },
        { label: 'Trong 7 ngày sản xuất được ... chiếc ti vi.', answer: '1190' },
      ],
      calcFree: true,
      hints: ['Tìm số ti vi một ngày trước (680 : 4), rồi nhân với 7.'],
    },
  ],
};
