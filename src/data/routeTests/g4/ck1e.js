/** Kiểm tra cuối học kì I (Đề 5): Bài 1–37 Toán 4 (Nhanh 1 đến 8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { protractor, sumDiff, angles, geo } from './art.js';

export default {
  id: 'l4-ck-1e',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 5)',
  short: 'Cuối kì I · Đề 5',
  after: { book: 'tool4', units: '1-37' },
  desc: 'Số có nhiều chữ số, làm tròn số; đo góc, góc nhọn, góc tù; mét vuông, tấn, giây, thế kỉ; tìm thành phần chưa biết; cộng, trừ số có nhiều chữ số; tổng và hiệu; song song, hình bình hành',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: số liền trước (69 998), quên nhớ sang hàng chục nghìn (60 000), thêm 1 vào hàng chục nghìn (79 999).
      { type: 'mc', bai: 1, point: 2, level: 1,
        prompt: 'Số liền sau của số 69 999 là:',
        options: ['69 998', '70 000', '60 000', '79 999'], ans: 1 },
      // Nhiễu: đặt 7 nghìn vào hàng chục nghìn (470 205), viết 5 đơn vị thành 5 chục (407 250), bỏ hàng chục nghìn (47 205).
      { type: 'mc', bai: 10, point: 1, level: 1,
        prompt: 'Số gồm 4 trăm nghìn, 7 nghìn, 2 trăm và 5 đơn vị viết là:',
        options: ['470 205', '407 205', '407 250', '47 205'], ans: 1 },
      // Ý sai: nhìn chữ số đầu (2 357 là số lẻ); số lẻ bé nhất có bốn chữ số là 1 001 vì 1 000 là số chẵn.
      { type: 'tf', bai: 3, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Số 1 000 là số chẵn.', 'Số 2 357 là số chẵn.', 'Số chẵn lớn nhất có bốn chữ số là 9 998.', 'Số lẻ bé nhất có bốn chữ số là 1 000.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Chữ số hàng chục nghìn là 6 nên làm tròn lên: 8 500 000.
      // Nhiễu: làm tròn xuống (8 400 000), làm tròn đến hàng chục nghìn (8 470 000), đến hàng triệu (8 000 000).
      { type: 'mc', bai: 13, point: 0, level: 1,
        prompt: 'Một thành phố có 8 465 000 người. Làm tròn số dân đến hàng trăm nghìn thì được khoảng:',
        options: ['8 400 000 người', '8 500 000 người', '8 470 000 người', '8 000 000 người'], ans: 1 },
      // Nhiễu: đọc theo phía bên kia của thước (30°), lấy số vạch lớn (15°), đọc vạch có số gần nhất (160°).
      { type: 'mc', bai: 7, point: 1, level: 1,
        prompt: 'Dùng thước đo góc như hình. Số đo của góc đỉnh K; cạnh KH, KI là:',
        fig: protractor(150, { names: ['K', 'H', 'I'] }),
        options: ['30°', '150°', '15°', '160°'], ans: 1 },
      { type: 'match', bai: 12, point: 2, level: 1,
        prompt: 'Nối mỗi số với giá trị của chữ số 6 trong số đó:',
        left: ['6 245 000', '362 450', '614 500 000', '4 562'],
        right: ['60', '60 000', '6 000 000', '600 000 000'], ans: [2, 1, 3, 0] },
      // Nhiễu: đổi như đơn vị độ dài (60 dm²), thêm ba chữ số 0 (6 000 dm²), quên đổi (6 dm²).
      { type: 'mc', bai: 18, point: 0, level: 1,
        prompt: '6 m² = … dm². Số thích hợp viết vào chỗ chấm là:',
        options: ['60', '600', '6 000', '6'], ans: 1 },
      // 2 750 + 250 = 3 000 (tròn nghìn). Nhiễu: tính lần lượt từ trái sang phải, nhóm 1 380 với 250 (không tròn), dùng phép trừ.
      { type: 'mc', bai: 24, point: 2, level: 1,
        prompt: 'Cách nào thuận tiện nhất để tính 2 750 + 1 380 + 250?',
        options: ['(2 750 + 1 380) + 250', '2 750 + (1 380 + 250)', '(2 750 + 250) + 1 380', '2 750 + 1 380 − 250'], ans: 2 },
      // Ý sai: nhầm góc tù là góc nhọn.
      { type: 'tf', bai: 8, point: 0, level: 1,
        prompt: 'Quan sát các góc. Đúng ghi Đ, sai ghi S:',
        fig: angles([
          { v: 'O', a: 'A', b: 'B', deg: 90, label: 'Góc 1' },
          { v: 'M', a: 'N', b: 'P', deg: 35, label: 'Góc 2' },
          { v: 'I', a: 'K', b: 'H', deg: 115, label: 'Góc 3' },
        ], { cell: 160 }),
        items: ['Góc 1 là góc vuông.', 'Góc 2 là góc nhọn.', 'Góc 3 là góc nhọn.', 'Góc 3 lớn hơn góc vuông.'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // 25 × 4 = 100. Nhiễu: lấy cạnh nhân cạnh (625 m), nhân 2 (50 m), lấy 25 + 4 (29 m).
      { type: 'mc', bai: 4, point: 2, level: 2,
        prompt: 'Một mảnh đất hình vuông có cạnh a = 25 m. Chu vi P = a × 4 của mảnh đất là:',
        options: ['50 m', '625 m', '100 m', '29 m'], ans: 2 },
      // 1 phút 5 giây = 65 giây < 70 giây nên An nhanh hơn 5 giây.
      // Nhiễu: chạy nhiều giây hơn mà cho là nhanh hơn (Bình), coi 1 phút = 100 giây (105 − 70 = 35).
      { type: 'mc', bai: 19, point: 0, level: 2,
        prompt: 'Chạy 100 m, bạn An hết 1 phút 5 giây, bạn Bình hết 70 giây. Bạn nào chạy nhanh hơn và nhanh hơn mấy giây?',
        options: ['Bình nhanh hơn 5 giây', 'An nhanh hơn 5 giây', 'Bình nhanh hơn 35 giây'], ans: 1 },
      // Ý sai: AD và BC nghiêng về hai phía, kéo dài sẽ cắt nhau nên không song song.
      { type: 'tf', bai: 29, point: 1, level: 2,
        prompt: 'Quan sát hình tứ giác ABCD. Đúng ghi Đ, sai ghi S:',
        fig: geo({ pts: { A: [80, 30], B: [220, 30], C: [270, 130], D: [30, 130] }, segs: ['AB', 'BC', 'CD', 'DA'], pos: { C: 's', D: 's' }, h: 160 }),
        items: ['Cạnh AB song song với cạnh DC.', 'Cạnh AD song song với cạnh BC.', 'Kéo dài mãi thì cạnh AB và cạnh DC cũng không cắt nhau.'],
        ans: ['Đ', 'S', 'Đ'] },
      // 3 143 − 986 = 2 157. Nhiễu: cộng (4 129), quên nhớ ở hàng trăm (2 257), lấy số lớn trừ số bé ở từng hàng (3 843).
      { type: 'mc', bai: 23, point: 1, level: 3,
        prompt: 'Đỉnh Phan-xi-păng cao 3 143 m, núi Bà Đen cao 986 m. Đỉnh Phan-xi-păng cao hơn núi Bà Đen bao nhiêu mét?',
        options: ['4 129 m', '2 257 m', '2 157 m', '3 843 m'], ans: 2 },
      // Ý sai: chu vi chỉ cộng hai cạnh (9 + 5 = 14), đúng là (9 + 5) × 2 = 28 cm.
      { type: 'tf', bai: 31, point: 0, level: 2,
        prompt: 'ABCD là hình bình hành. Đúng ghi Đ, sai ghi S:',
        fig: geo({ pts: { A: [70, 30], B: [260, 30], C: [220, 115], D: [30, 115] }, segs: ['AB', 'BC', 'CD', 'DA'], lens: { AB: '9 cm', BC: '5 cm' }, pos: { C: 's', D: 's' }, h: 145 }),
        items: ['Cạnh DC dài 9 cm.', 'Cạnh AD dài 5 cm.', 'Chu vi hình bình hành ABCD là 14 cm.', 'Cạnh AB song song với cạnh DC.'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // Hai số tự nhiên liên tiếp hơn kém nhau 1: số lớn (2 025 + 1) : 2 = 1 013.
      // Nhiễu: số bé (1 012), lấy 2 025 − 1 (2 024), cộng thêm 1 vào số lớn (1 014).
      { type: 'mc', bai: 15, point: 1, level: 3,
        prompt: 'Tổng của hai số tự nhiên liên tiếp là 2 025. Số lớn là:',
        options: ['1 012', '1 013', '2 024', '1 014'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [22, 23], point: 0, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['426 735 + 385 968', '803 140 − 456 287', '9 458 + 76 384', '60 205 − 18 769'] },
      // 42 015 − 15 280 = 26 735; 8 175 + 3 450 = 11 625; 9 350 : 5 = 1 870.
      { type: 'findx', bai: 2, point: 4, level: 2,
        prompt: 'Tìm x:',
        items: [{ t: 'x + 15 280 = 42 015', ans: 26735 }, { t: 'x − 3 450 = 8 175', ans: 11625 }, 'x × 5 = 9 350'] },
      // 2 tấn 50 kg = 2 050 kg; 4 tạ = 400 kg = 40 yến; 3 phút = 180 giây; 1 thế kỉ = 100 năm.
      { type: 'compare', bai: [17, 19], point: 1, level: 2,
        prompt: 'Điền dấu >, <, = thích hợp:',
        items: [{ t: '2 tấn 50 kg □ 2 500 kg', ans: '<' }, { t: '4 tạ □ 40 yến', ans: '=' }, { t: '3 phút □ 200 giây', ans: '<' }, { t: '1 thế kỉ □ 99 năm', ans: '>' }] },
      // Kho B: (12 450 + 1 350) : 2 = 6 900 (kg); kho A: 6 900 − 1 350 = 5 550 (kg).
      { type: 'fill', bai: 25, point: 1, level: 3,
        prompt: 'Hai kho chứa tất cả 12 450 kg thóc. Kho A chứa ít hơn kho B 1 350 kg thóc. Hỏi mỗi kho chứa bao nhiêu ki-lô-gam thóc?',
        fig: sumDiff({ sum: '12 450 kg', diff: '1 350 kg', names: ['Kho B', 'Kho A'], small: 0.8 }),
        items: [
          { t: 'Kho B chứa: (… + …) : 2 = … (kg)', ans: [12450, 1350, 6900] },
          { t: 'Kho A chứa … kg thóc.', ans: 5550 },
        ] },
      // Vịt: 1 250 × 3 = 3 750; ngan: 3 750 − 2 800 = 950; tất cả: 1 250 + 3 750 + 950 = 5 950.
      { type: 'fill', bai: 5, point: 1, level: 3,
        prompt: 'Một trang trại nuôi 1 250 con gà. Số con vịt gấp 3 lần số con gà. Số con ngan ít hơn số con vịt 2 800 con. Hỏi trang trại nuôi tất cả bao nhiêu con gà, vịt và ngan?',
        items: [
          { t: 'Trang trại nuôi … con vịt.', ans: 3750 },
          { t: 'Trang trại nuôi … con ngan.', ans: 950 },
          { t: 'Trang trại nuôi tất cả … con gà, vịt và ngan.', ans: 5950 },
        ] },
    ] },
  ],
};
