/** Kiểm tra cuối học kì I (Đề 1): Bài 1–37 Toán 4 (Nhanh 1 đến 8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { protractor, sumDiff, angles, geo } from './art.js';

export default {
  id: 'l4-ck-1',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 1)',
  short: 'Cuối kì I · Đề 1',
  after: { book: 'tool4', units: '1-37' },
  desc: 'Số có nhiều chữ số, làm tròn số; đo góc, góc nhọn, góc tù; yến, tạ, tấn, mét vuông, thế kỉ; cộng, trừ số có nhiều chữ số; tổng và hiệu; vuông góc, song song, hình bình hành',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: bỏ chữ "linh" nên đọc thành 250 nghìn, tách lớp từ trái sang (420 triệu), bỏ một chữ số 0 ở cuối (ba mươi).
      { type: 'mc', bai: 12, point: 1, level: 1,
        prompt: 'Số 4 205 300 đọc là:',
        options: ['Bốn triệu hai trăm linh năm nghìn ba trăm', 'Bốn triệu hai trăm năm mươi nghìn ba trăm', 'Bốn trăm hai mươi triệu năm nghìn ba trăm', 'Bốn triệu hai trăm linh năm nghìn ba mươi'], ans: 0 },
      // 738 425: chữ số 3 ở hàng chục nghìn. Nhiễu: lấy chữ số (3), nhầm hàng trăm nghìn (300 000), nhầm hàng nghìn (3 000).
      { type: 'mc', bai: 11, point: 1, level: 1,
        prompt: 'Trong số 738 425, chữ số 3 có giá trị là:',
        options: ['3', '30 000', '300 000', '3 000'], ans: 1 },
      // Ý sai: nghĩ số tận cùng là 0 không phải số chẵn. Bẫy: 72 594 có chữ số đầu lẻ nhưng vẫn là số chẵn.
      { type: 'tf', bai: 3, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['72 594 là số chẵn.', '30 618 là số chẵn.', '45 270 là số lẻ.', '89 153 là số lẻ.'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // Chữ số hàng chục nghìn là 7 nên làm tròn lên: 2 700 000.
      // Nhiễu: làm tròn xuống (2 600 000), làm tròn đến hàng chục nghìn (2 670 000), đến hàng triệu (3 000 000).
      { type: 'mc', bai: 13, point: 0, level: 1,
        prompt: 'Làm tròn số 2 671 400 đến hàng trăm nghìn thì được số:',
        options: ['2 600 000', '2 670 000', '2 700 000', '3 000 000'], ans: 2 },
      { type: 'match', bai: [17, 18, 19], point: 0, level: 1,
        prompt: 'Nối mỗi dòng ở cột A với số thích hợp ở cột B:',
        heads: ['A', 'B'],
        left: ['1 tấn = … kg', '1 yến = … kg', '1 m² = … dm²', '1 phút = … giây'],
        right: ['60', '1 000', '100', '10'], ans: [1, 3, 2, 0] },
      // Nhiễu: đọc theo phía bên kia của thước (130°), đọc lệch một vạch 10° (60°), lấy phần còn lại của góc vuông (40°).
      { type: 'mc', bai: 7, point: 1, level: 1,
        prompt: 'Dùng thước đo góc như hình. Số đo của góc đỉnh O; cạnh OA, OB là:',
        fig: protractor(50),
        options: ['50°', '130°', '60°', '40°'], ans: 0 },
      // Ý sai: nhầm góc vuông là góc nhọn; nghĩ góc tù bé hơn góc vuông.
      { type: 'tf', bai: 8, point: 0, level: 1,
        prompt: 'Quan sát các góc. Đúng ghi Đ, sai ghi S:',
        fig: angles([
          { v: 'O', a: 'A', b: 'B', deg: 60, label: 'Góc 1' },
          { v: 'M', a: 'N', b: 'P', deg: 90, label: 'Góc 2' },
          { v: 'I', a: 'K', b: 'H', deg: 135, label: 'Góc 3' },
        ], { cell: 160 }),
        items: ['Góc 1 là góc nhọn.', 'Góc 2 là góc nhọn.', 'Góc 3 là góc tù.', 'Góc 3 bé hơn góc vuông.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: số liền sau (300 001), chỉ bớt ở hàng nghìn (299 000), bớt 1 ở hàng trăm nghìn (200 000).
      { type: 'mc', bai: 15, point: 1, level: 1,
        prompt: 'Số liền trước của số 300 000 là:',
        options: ['300 001', '299 999', '299 000', '200 000'], ans: 1 },
      // Ý sai: dùng tính chất giao hoán cho phép trừ.
      { type: 'tf', bai: 24, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['4 532 + 1 768 = 1 768 + 4 532', '(37 + 63) + 18 = 37 + (63 + 18)', '836 − 125 = 125 − 836', 'a + b = b + a'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // Năm 2026 thuộc thế kỉ XXI (từ năm 2001 đến năm 2100).
      // Nhiễu: lấy hai chữ số đầu (XX), viết 21 thành XII (đảo chữ La Mã), lấy 19 (XIX).
      { type: 'mc', bai: 19, point: 1, level: 2,
        prompt: 'Năm 2026 thuộc thế kỉ nào?',
        options: ['Thế kỉ XX', 'Thế kỉ XXI', 'Thế kỉ XII', 'Thế kỉ XIX'], ans: 1 },
      // (15 + 8) × 2 = 46. Nhiễu: quên nhân 2 (23 cm), nhân trước cộng sau 15 + 8 × 2 (31 cm), lấy dài nhân rộng (120 cm).
      { type: 'mc', bai: 4, point: 2, level: 2,
        prompt: 'Chu vi hình chữ nhật tính theo công thức P = (a + b) × 2. Với a = 15 cm, b = 8 cm thì P bằng:',
        options: ['23 cm', '31 cm', '46 cm', '120 cm'], ans: 2 },
      // Ý sai: hai cạnh kề nhau AD, AB cắt nhau tại A nên không song song.
      { type: 'tf', bai: [27, 29], point: 0, level: 2,
        prompt: 'Cho hình chữ nhật ABCD. Đúng ghi Đ, sai ghi S:',
        fig: geo({ pts: { A: [50, 30], B: [250, 30], C: [250, 120], D: [50, 120] }, segs: ['AB', 'BC', 'CD', 'DA'], pos: { C: 's', D: 's' }, h: 150 }),
        items: ['Cạnh AB vuông góc với cạnh AD.', 'Cạnh AB song song với cạnh DC.', 'Cạnh AD song song với cạnh AB.', 'Cạnh BC vuông góc với cạnh DC.'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // Ý sai: nhầm cạnh kề BC bằng AB; chu vi chỉ cộng hai cạnh (7 + 4 = 11), đúng là (7 + 4) × 2 = 22 cm.
      { type: 'tf', bai: 31, point: 0, level: 2,
        prompt: 'ABCD là hình bình hành. Đúng ghi Đ, sai ghi S:',
        fig: geo({ pts: { A: [70, 30], B: [260, 30], C: [230, 120], D: [40, 120] }, segs: ['AB', 'BC', 'CD', 'DA'], lens: { AB: '7 cm', DA: '4 cm' }, pos: { C: 's', D: 's' }, h: 150 }),
        items: ['Cạnh DC dài 7 cm.', 'Cạnh BC dài 7 cm.', 'Cạnh AB song song với cạnh DC.', 'Chu vi hình bình hành ABCD là 11 cm.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 19 235 − 18 450 = 785. Nhiễu: quên nhớ ở hàng trăm (885), lấy số lớn trừ số bé ở từng hàng (1 225), cộng hai số (37 685).
      { type: 'mc', bai: 23, point: 1, level: 3,
        prompt: 'Năm 2025 dân số một xã là 18 450 người. Năm 2026 dân số xã đó là 19 235 người. Dân số xã đó đã tăng thêm:',
        options: ['885 người', '785 người', '1 225 người', '37 685 người'], ans: 1 },
      // Nhiễu: chữ số lặp lại (100 000), xếp chữ số liên tiếp từ 1 (123 456), bắt đầu bằng chữ số 0 (012 345 không phải số có sáu chữ số).
      { type: 'mc', bai: 14, point: 1, level: 3,
        prompt: 'Số bé nhất có sáu chữ số khác nhau là:',
        options: ['100 000', '102 345', '123 456', '012 345'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [22, 23], point: 0, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['352 618 + 247 935', '607 254 − 318 469', '48 375 + 26 849', '90 000 − 34 725'] },
      { type: 'fill', bai: 24, point: 2, level: 2,
        prompt: 'Tính bằng cách thuận tiện:',
        items: [
          { t: '475 + 268 + 525 = (475 + …) + 268 = … + 268 = …', ans: [525, 1000, 1268] },
          { t: '1 250 + 3 680 + 750 = 3 680 + (1 250 + …) = 3 680 + … = …', ans: [750, 2000, 5680] },
        ] },
      { type: 'findx', bai: 2, point: 4, level: 2,
        prompt: 'Tìm x:',
        items: ['x + 2 735 = 9 160', 'x − 1 806 = 4 527', 'x × 6 = 4 830'] },
      // Lớp 4A: (156 + 14) : 2 = 85 (kg); lớp 4B: 85 − 14 = 71 (kg).
      { type: 'fill', bai: 25, point: 1, level: 3,
        prompt: 'Hai lớp 4A và 4B thu gom được tất cả 156 kg giấy vụn. Lớp 4A thu gom được nhiều hơn lớp 4B 14 kg. Hỏi mỗi lớp thu gom được bao nhiêu ki-lô-gam giấy vụn?',
        fig: sumDiff({ sum: '156 kg', diff: '14 kg', names: ['Lớp 4A', 'Lớp 4B'], small: 0.8 }),
        items: [
          { t: 'Lớp 4A thu gom được: (… + …) : 2 = … (kg)', ans: [156, 14, 85] },
          { t: 'Lớp 4B thu gom được … kg giấy vụn.', ans: 71 },
        ] },
      // 120 × 6 = 720; 245 + 80 = 325; 720 − 245 − 325 = 150.
      { type: 'fill', bai: 5, point: 1, level: 3,
        prompt: 'Một cửa hàng nhập về 6 thùng vở, mỗi thùng có 120 quyển. Ngày thứ nhất cửa hàng bán được 245 quyển, ngày thứ hai bán được nhiều hơn ngày thứ nhất 80 quyển. Hỏi cửa hàng còn lại bao nhiêu quyển vở?',
        items: [
          { t: 'Cửa hàng nhập về … quyển vở.', ans: 720 },
          { t: 'Ngày thứ hai bán được … quyển vở.', ans: 325 },
          { t: 'Cửa hàng còn lại … quyển vở.', ans: 150 },
        ] },
    ] },
  ],
};
