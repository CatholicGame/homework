/** Kiểm tra cuối học kì I (Đề 2): Bài 1–37 Toán 4 (Nhanh 1 đến 8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { protractor, sumDiff, geo } from './art.js';

export default {
  id: 'l4-ck-1b',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 2)',
  short: 'Cuối kì I · Đề 2',
  after: { book: 'tool4', units: '1-37' },
  desc: 'Số có nhiều chữ số, hàng và lớp; góc nhọn, góc tù, góc bẹt; yến, tạ, tấn, mét vuông, thế kỉ; cộng, trừ số có nhiều chữ số; tổng và hiệu; bài toán ba bước tính; song song, hình thoi',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: "linh" viết thành chục (580 420), viết rời 500 và 8 nghìn (5 008 420), đặt 20 vào hàng chục và đơn vị sai chỗ (508 042).
      { type: 'mc', bai: 10, point: 1, level: 1,
        prompt: 'Số "năm trăm linh tám nghìn bốn trăm hai mươi" viết là:',
        options: ['580 420', '508 420', '5 008 420', '508 042'], ans: 1 },
      // 47 205 136: chữ số 4 ở hàng chục triệu, chữ số 7 ở hàng triệu.
      // Nhiễu: nhầm sang hàng của chữ số đứng trước, nhầm lớp, đúng hàng nhưng sai lớp.
      { type: 'mc', bai: 12, point: 2, level: 1,
        prompt: 'Chữ số 7 trong số 47 205 136 thuộc hàng nào, lớp nào?',
        options: ['Hàng triệu, lớp triệu', 'Hàng chục triệu, lớp triệu', 'Hàng trăm nghìn, lớp nghìn', 'Hàng triệu, lớp nghìn'], ans: 0 },
      // Ý sai: số lẻ liền sau của 3 517 là 3 519 (nhầm với số liền sau 3 518); 60 000 tận cùng 0 là số chẵn.
      { type: 'tf', bai: 3, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Số chẵn liền sau 4 998 là 5 000.', 'Số lẻ liền sau 3 517 là 3 518.', 'Hai số lẻ liên tiếp hơn kém nhau 2 đơn vị.', 'Số 60 000 là số lẻ.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 3 tấn = 3 000 kg, 5 tạ = 500 kg. Nhiễu: ghép số (305 kg, 35 kg), đổi 5 tạ = 50 kg (3 050 kg).
      { type: 'mc', bai: 17, point: 0, level: 1,
        prompt: '3 tấn 5 tạ = … kg. Số thích hợp viết vào chỗ chấm là:',
        options: ['305', '3 050', '3 500', '35'], ans: 2 },
      { type: 'match', bai: [7, 8], point: 0, level: 1,
        prompt: 'Nối mỗi góc với tên gọi của nó:',
        heads: ['Số đo', 'Tên góc'],
        left: ['Góc có số đo 30°', 'Góc có số đo 90°', 'Góc có số đo 150°', 'Góc có số đo 180°'],
        right: ['Góc tù', 'Góc bẹt', 'Góc nhọn', 'Góc vuông'], ans: [2, 3, 0, 1] },
      // Nhiễu: đọc theo phía bên kia của thước (60°), đọc số in gần nhất (100°), lấy số vạch lớn (12°).
      { type: 'mc', bai: 7, point: 1, level: 1,
        prompt: 'Dùng thước đo góc như hình. Số đo của góc đỉnh O; cạnh OA, OB là:',
        fig: protractor(120),
        options: ['60°', '120°', '100°', '12°'], ans: 1 },
      // Chữ số hàng nghìn là 8 nên làm tròn lên: 350 000.
      // Nhiễu: làm tròn xuống (340 000), làm tròn đến hàng trăm nghìn (300 000), đến hàng nghìn (349 000).
      { type: 'mc', bai: 13, point: 1, level: 1,
        prompt: 'Làm tròn số 348 615 đến hàng chục nghìn thì được số:',
        options: ['340 000', '350 000', '300 000', '349 000'], ans: 1 },
      // Ý sai: đổi đơn vị diện tích như đơn vị độ dài (1 dm² = 10 cm², 5 m² = 50 dm²).
      { type: 'tf', bai: 18, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['1 m² = 100 dm²', '1 dm² = 10 cm²', '1 cm² = 100 mm²', '5 m² = 50 dm²'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Năm 1890 thuộc thế kỉ XIX (từ năm 1801 đến năm 1900).
      // Nhiễu: lấy hai chữ số đầu (XVIII), làm tròn 1890 thành 1900 rồi lấy 19 + 1 (XX), đảo chữ La Mã IX thành XI.
      { type: 'mc', bai: 19, point: 1, level: 2,
        prompt: 'Chủ tịch Hồ Chí Minh sinh năm 1890. Năm đó thuộc thế kỉ nào?',
        options: ['Thế kỉ XVIII', 'Thế kỉ XIX', 'Thế kỉ XX', 'Thế kỉ XI'], ans: 1 },
      // 150 + 30 × 2 = 210. Nhiễu: tính từ trái sang phải (360), cộng cả 2 (182), chỉ lấy a × 2 (300).
      { type: 'mc', bai: 4, point: 1, level: 2,
        prompt: 'Giá trị của biểu thức a + b × 2 với a = 150, b = 30 là:',
        options: ['360', '210', '182', '300'], ans: 1 },
      // Ý sai: cộng nhầm 113 + 62 = 165; nghĩ đổi chỗ các số hạng thì tổng thay đổi.
      { type: 'tf', bai: 24, point: 2, level: 2,
        prompt: 'Mai tính 38 + 75 + 62 bằng cách thuận tiện. Đúng ghi Đ, sai ghi S:',
        items: ['Mai nhóm 38 với 62 vì 38 + 62 = 100.', '38 + 75 + 62 = 100 + 75 = 175', '38 + 75 + 62 = 113 + 62 = 165', 'Đổi chỗ các số hạng thì tổng thay đổi.'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // Nhiễu: cạnh kề NP, MQ (vuông góc với MN, không song song).
      { type: 'mc', bai: 29, point: 1, level: 1,
        prompt: 'Cho hình chữ nhật MNPQ. Cạnh MN song song với cạnh nào?',
        fig: geo({ pts: { M: [50, 30], N: [250, 30], P: [250, 120], Q: [50, 120] }, segs: ['MN', 'NP', 'PQ', 'QM'], pos: { P: 's', Q: 's' }, h: 150 }),
        options: ['Cạnh NP', 'Cạnh PQ', 'Cạnh MQ'], ans: 1 },
      // Ý sai: hai đường thẳng vuông góc tạo bốn góc vuông, góc AOC không phải góc nhọn.
      { type: 'tf', bai: 27, point: 0, level: 2,
        prompt: 'Quan sát hình. Đúng ghi Đ, sai ghi S:',
        fig: geo({ pts: { A: [30, 80], B: [270, 80], C: [150, 18], D: [150, 142], O: [150, 80] }, segs: ['AB', 'CD'], pos: { O: 'se', C: 'e', D: 'e' }, h: 160 }),
        items: ['Đường thẳng AB vuông góc với đường thẳng CD.', 'Hai đường thẳng AB và CD tạo thành bốn góc vuông chung đỉnh O.', 'Góc AOC là góc nhọn.'],
        ans: ['Đ', 'Đ', 'S'] },
      // Ý sai: cạnh kề AB và BC cắt nhau tại B nên không song song.
      { type: 'tf', bai: 31, point: 1, level: 2,
        prompt: 'ABCD là hình thoi. Đúng ghi Đ, sai ghi S:',
        fig: geo({ pts: { A: [150, 18], B: [250, 85], C: [150, 152], D: [50, 85] }, segs: ['AB', 'BC', 'CD', 'DA'], lens: { AB: '6 cm' }, pos: { B: 'e', C: 's', D: 'w' }, h: 175 }),
        items: ['Cạnh BC dài 6 cm.', 'Cạnh AB song song với cạnh DC.', 'Cạnh AB song song với cạnh BC.', 'Chu vi hình thoi ABCD là 24 cm.'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // Tháng 10: 125 480 + 18 750 = 144 230; cả hai tháng: 125 480 + 144 230 = 269 710.
      // Nhiễu: chỉ tính tháng 10 (144 230), quên phần nhiều hơn 125 480 × 2 (250 960), trừ thay vì cộng (106 730).
      { type: 'mc', bai: 22, point: 1, level: 3,
        prompt: 'Tháng 9 một nhà máy sản xuất được 125 480 chai nước, tháng 10 sản xuất nhiều hơn tháng 9 là 18 750 chai. Cả hai tháng nhà máy sản xuất được bao nhiêu chai nước?',
        options: ['144 230 chai', '250 960 chai', '269 710 chai', '106 730 chai'], ans: 2 },
      // Từ 100 đến 999: 999 − 100 + 1 = 900 số. Nhiễu: lấy số lớn nhất (999), quên cộng 1 (899), đếm cả 1 000 (1 000).
      { type: 'mc', bai: 15, point: 1, level: 3,
        prompt: 'Có bao nhiêu số tự nhiên có ba chữ số?',
        options: ['999', '900', '899', '1 000'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [22, 23], point: 0, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['465 287 + 328 946', '730 512 − 254 738', '29 806 + 7 495', '100 000 − 46 528'] },
      { type: 'compare', bai: [14, 17], point: 1, level: 2,
        prompt: 'Điền dấu >, <, = thích hợp:',
        items: ['999 999 □ 1 000 000', '4 205 386 □ 4 250 386', { t: '3 tạ 5 kg □ 350 kg', ans: '<' }, { t: '2 tấn □ 2 000 kg', ans: '=' }] },
      // Tuổi con: (46 − 28) : 2 = 9; tuổi bố: 9 + 28 = 37.
      { type: 'fill', bai: 25, point: 0, level: 3,
        prompt: 'Tổng số tuổi của hai bố con là 46 tuổi. Bố hơn con 28 tuổi. Hỏi bố bao nhiêu tuổi, con bao nhiêu tuổi?',
        fig: sumDiff({ sum: '46 tuổi', diff: '28 tuổi', names: ['Tuổi bố', 'Tuổi con'], small: 0.3 }),
        items: [
          { t: 'Tuổi con là: (… − …) : 2 = … (tuổi)', ans: [46, 28, 9] },
          { t: 'Tuổi bố là … tuổi.', ans: 37 },
        ] },
      // 185 000 × 5 = 925 000; 240 000 × 3 = 720 000; 2 000 000 − 925 000 − 720 000 = 355 000.
      { type: 'fill', bai: 5, point: 1, level: 3,
        prompt: 'Nhà trường mua 5 thùng sữa, mỗi thùng giá 185 000 đồng và 3 thùng bánh, mỗi thùng giá 240 000 đồng. Nhà trường đưa cô bán hàng 2 000 000 đồng. Hỏi cô bán hàng phải trả lại bao nhiêu tiền?',
        items: [
          { t: 'Mua sữa hết … đồng.', ans: 925000 },
          { t: 'Mua bánh hết … đồng.', ans: 720000 },
          { t: 'Cô bán hàng trả lại … đồng.', ans: 355000 },
        ] },
    ] },
  ],
};
