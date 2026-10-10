/** Kiểm tra cuối học kì I (Đề 4): Bài 1–37 Toán 4 (Nhanh 1 đến 8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { protractor, sumDiff, geo } from './art.js';

export default {
  id: 'l4-ck-1d',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 4)',
  short: 'Cuối kì I · Đề 4',
  after: { book: 'tool4', units: '1-37' },
  desc: 'Hàng và lớp, số đến lớp triệu; số chẵn, số lẻ; đo góc, góc bẹt; yến, tạ, tấn, thế kỉ; biểu thức chứa chữ; cộng, trừ số có nhiều chữ số; tổng và hiệu; vuông góc, song song, hình thoi',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: lấy lớp đơn vị (2, 0, 3), lấy lệch một chữ số (6, 2, 0), lấy bốn chữ số đầu (8, 5, 6, 2).
      { type: 'mc', bai: 11, point: 0, level: 1,
        prompt: 'Lớp nghìn của số 856 203 gồm các chữ số:',
        options: ['2, 0, 3', '8, 5, 6', '6, 2, 0', '8, 5, 6, 2'], ans: 1 },
      // Nhiễu: "linh" viết thành chục (320 050 000), đọc "năm mươi nghìn" thành 500 nghìn (302 500 000), thiếu lớp đơn vị (302 050).
      { type: 'mc', bai: 12, point: 1, level: 1,
        prompt: 'Số "ba trăm linh hai triệu không trăm năm mươi nghìn" viết là:',
        options: ['320 050 000', '302 050 000', '302 500 000', '302 050'], ans: 1 },
      // Ý sai: 52 060 có 6 chục (60, không phải 600); 81 307 có 7 đơn vị (7, không phải 70).
      { type: 'tf', bai: 1, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['36 205 = 30 000 + 6 000 + 200 + 5', '70 418 = 70 000 + 400 + 10 + 8', '52 060 = 50 000 + 2 000 + 600', '81 307 = 80 000 + 1 000 + 300 + 70'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // Nhiễu: số bé nhất có năm chữ số nhưng là số chẵn (10 000), số có các chữ số lẻ (11 111), số lẻ lớn nhất (99 999).
      { type: 'mc', bai: 3, point: 0, level: 2,
        prompt: 'Số lẻ bé nhất có năm chữ số là:',
        options: ['10 000', '10 001', '11 111', '99 999'], ans: 1 },
      // Chữ số hàng trăm là 4 nên làm tròn xuống: 76 000.
      // Nhiễu: nhìn chữ số 5 ở hàng chục mà làm tròn lên (77 000), làm tròn đến hàng chục nghìn (80 000), đến hàng trăm (76 500).
      { type: 'mc', bai: 13, point: 1, level: 1,
        prompt: 'Làm tròn số 76 450 đến hàng nghìn thì được số:',
        options: ['77 000', '76 000', '80 000', '76 500'], ans: 1 },
      { type: 'match', bai: [17, 18], point: 0, level: 1,
        prompt: 'Nối mỗi dòng ở cột A với số đo bằng nó ở cột B:',
        heads: ['A', 'B'],
        left: ['5 yến', '2 tạ', '3 tấn', '4 m²'],
        right: ['200 kg', '400 dm²', '50 kg', '3 000 kg'], ans: [2, 0, 3, 1] },
      // Nhiễu: đọc theo phía bên kia của thước (140°), đếm thừa một vạch 10° (50°), đếm thiếu một vạch 10° (30°).
      { type: 'mc', bai: 7, point: 1, level: 1,
        prompt: 'Dùng thước đo góc như hình. Số đo của góc đỉnh M; cạnh MN, MP là:',
        fig: protractor(40, { names: ['M', 'N', 'P'] }),
        options: ['140°', '40°', '50°', '30°'], ans: 1 },
      // Nhiễu: so chữ số tận cùng (2 543 670, 2 354 670), so chữ số hàng chục nghìn trước (2 345 670).
      { type: 'mc', bai: 14, point: 1, level: 1,
        prompt: 'Số bé nhất trong các số 2 345 670; 2 354 670; 2 345 076; 2 543 670 là:',
        options: ['2 345 670', '2 354 670', '2 345 076', '2 543 670'], ans: 2 },
      // Ý sai: nghĩ góc tù bé hơn góc vuông; góc 100° lớn hơn 90° nên là góc tù, không phải góc nhọn.
      { type: 'tf', bai: 8, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Góc bẹt bằng hai góc vuông.', 'Góc bẹt có số đo 180°.', 'Góc tù bé hơn góc vuông.', 'Góc có số đo 100° là góc nhọn.'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // Năm 938 thuộc thế kỉ X (từ năm 901 đến năm 1000).
      // Nhiễu: lấy chữ số đầu (IX), đảo chữ La Mã IX thành XI, lùi thêm một thế kỉ (VIII).
      { type: 'mc', bai: 19, point: 1, level: 2,
        prompt: 'Năm 938, Ngô Quyền đánh tan quân Nam Hán trên sông Bạch Đằng. Năm đó thuộc thế kỉ nào?',
        options: ['Thế kỉ IX', 'Thế kỉ X', 'Thế kỉ XI', 'Thế kỉ VIII'], ans: 1 },
      // 2 500 − 1 800 + 700 = 1 400. Nhiễu: cộng b với c trước (0), cộng tất cả (5 000), quên c (700).
      { type: 'mc', bai: 4, point: 1, level: 2,
        prompt: 'Với a = 2 500, b = 1 800, c = 700 thì giá trị của biểu thức a − b + c là:',
        options: ['0', '1 400', '5 000', '700'], ans: 1 },
      // Ý sai: dùng tính chất kết hợp cho phép trừ ((60 − 20) − 10 = 30, còn 60 − (20 − 10) = 50).
      { type: 'tf', bai: 24, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['(125 + 75) + 340 = 125 + (75 + 340)', '(a + b) + c = a + (b + c)', '(60 − 20) − 10 = 60 − (20 − 10)', '268 + 0 + 132 = 268 + 132'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // Nhiễu: đặc điểm của hình chữ nhật (bốn góc vuông), của hình thang (một cặp cạnh song song), của hình bình hành (cạnh dài, cạnh ngắn).
      { type: 'mc', bai: 31, point: 1, level: 2,
        prompt: 'Đặc điểm nào dưới đây là của hình thoi?',
        options: ['Có bốn cạnh bằng nhau và hai cặp cạnh đối diện song song', 'Có bốn góc vuông và hai cạnh dài, hai cạnh ngắn', 'Chỉ có một cặp cạnh đối diện song song', 'Có hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau'], ans: 0 },
      // 12 480 + 2 750 = 15 230. Nhiễu: quên nhớ từ hàng chục (15 130), quên nhớ từ hàng trăm (14 230), trừ thay vì cộng (9 730).
      { type: 'mc', bai: 22, point: 1, level: 2,
        prompt: 'Một thư viện có 12 480 quyển sách. Năm nay thư viện mua thêm 2 750 quyển sách. Thư viện có tất cả bao nhiêu quyển sách?',
        options: ['15 130 quyển', '15 230 quyển', '14 230 quyển', '9 730 quyển'], ans: 1 },
      // Ý sai: cạnh BC nghiêng nên không vuông góc với AB.
      { type: 'tf', bai: [27, 29], point: 1, level: 2,
        prompt: 'Dùng ê ke kiểm tra hình tứ giác ABCD. Đúng ghi Đ, sai ghi S:',
        fig: geo({ pts: { A: [40, 30], B: [190, 30], C: [260, 130], D: [40, 130] }, segs: ['AB', 'BC', 'CD', 'DA'], pos: { C: 's', D: 's' }, h: 160 }),
        items: ['Cạnh AB vuông góc với cạnh AD.', 'Cạnh DC vuông góc với cạnh AD.', 'Cạnh AB vuông góc với cạnh BC.', 'Cạnh AB song song với cạnh DC.'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // Số thứ 10: 3 + 4 × 9 = 39. Nhiễu: số thứ chín (35), lấy 4 × 10 (40), số thứ mười một (43).
      { type: 'mc', bai: 15, point: 1, level: 3,
        prompt: 'Cho dãy số 3; 7; 11; 15; … (số sau hơn số liền trước 4 đơn vị). Số thứ mười của dãy là:',
        options: ['35', '39', '40', '43'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [22, 23], point: 0, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['273 809 + 518 476', '600 000 − 237 518', '8 765 + 45 390', '71 052 − 9 384'] },
      // 12 350 × 4 = 49 400; 49 400 − 9 400 = 40 000; 40 000 : 5 = 8 000.
      { type: 'chain', bai: 2, point: 1, level: 2,
        prompt: 'Viết số thích hợp vào ô trống:',
        items: [{ start: 12350, steps: ['× 4', '− 9 400', ': 5'] }] },
      // 5 tấn 2 tạ = 52 tạ; thửa thứ nhất: (52 + 8) : 2 = 30 (tạ); thửa thứ hai: 30 − 8 = 22 (tạ).
      { type: 'fill', bai: [25, 17], point: 0, level: 3,
        prompt: 'Hai thửa ruộng thu hoạch được tất cả 5 tấn 2 tạ thóc. Thửa thứ nhất thu hoạch được nhiều hơn thửa thứ hai 8 tạ thóc. Hỏi mỗi thửa ruộng thu hoạch được bao nhiêu tạ thóc?',
        fig: sumDiff({ sum: '5 tấn 2 tạ', diff: '8 tạ', names: ['Thửa 1', 'Thửa 2'], small: 0.73 }),
        items: [
          { t: 'Đổi: 5 tấn 2 tạ = … tạ', ans: 52 },
          { t: 'Thửa thứ nhất: (… + …) : 2 = … (tạ)', ans: [52, 8, 30] },
          { t: 'Thửa thứ hai thu hoạch được … tạ thóc.', ans: 22 },
        ] },
      // 120 000 × 2 = 240 000; 85 000 × 2 = 170 000; 500 000 − 240 000 − 170 000 = 90 000.
      { type: 'fill', bai: 5, point: 1, level: 3,
        prompt: 'Mẹ mua 2 kg thịt lợn, mỗi ki-lô-gam giá 120 000 đồng và 2 kg cá, mỗi ki-lô-gam giá 85 000 đồng. Mẹ đưa cô bán hàng 500 000 đồng. Hỏi cô bán hàng trả lại mẹ bao nhiêu tiền?',
        items: [
          { t: 'Mua thịt hết … đồng.', ans: 240000 },
          { t: 'Mua cá hết … đồng.', ans: 170000 },
          { t: 'Cô bán hàng trả lại mẹ … đồng.', ans: 90000 },
        ] },
    ] },
  ],
};
