/** Kiểm tra cuối học kì I (Đề 3): Bài 1–37 Toán 4 (Nhanh 1 đến 8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { protractor, sumDiff, angles, geo } from './art.js';

const INK = '#1f2937';
/** Các tứ giác xếp thành một hàng, tên "Hình 1", "Hình 2"… dưới mỗi hình (ô rộng 120). */
function shapeRow(list) {
  const cell = 120, h = 122;
  const body = list.map((pts, i) =>
    `<path d="M${pts.map(([x, y]) => `${x + i * cell} ${y}`).join(' L')} Z" fill="#e0f2fe" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`
    + `<text x="${i * cell + 60}" y="114" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">Hình ${i + 1}</text>`).join('');
  return `<svg viewBox="0 0 ${list.length * cell} ${h}" width="${Math.min(list.length * cell, 440)}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

export default {
  id: 'l4-ck-1c',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 3)',
  short: 'Cuối kì I · Đề 3',
  after: { book: 'tool4', units: '1-37' },
  desc: 'Số có nhiều chữ số, giá trị của chữ số; đo góc, góc tù; tấn, tạ, giây, mét vuông; cộng, trừ số có nhiều chữ số, tính thuận tiện; tổng và hiệu; song song, vuông góc, hình bình hành',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: bỏ hàng chục nghìn (6 490), đặt 9 chục vào hàng trăm (64 900), viết 9 chục thành 9 đơn vị (64 009).
      { type: 'mc', bai: 1, point: 0, level: 1,
        prompt: 'Số gồm 6 chục nghìn, 4 nghìn và 9 chục viết là:',
        options: ['6 490', '64 900', '64 090', '64 009'], ans: 2 },
      // Nhiễu: số lớn nhất có năm chữ số (99 999), số bé nhất có bảy chữ số (1 000 000), số tròn trăm nghìn (900 000).
      { type: 'mc', bai: 10, point: 2, level: 1,
        prompt: 'Số lớn nhất có sáu chữ số là:',
        options: ['99 999', '999 999', '1 000 000', '900 000'], ans: 1 },
      { type: 'match', bai: 12, point: 1, level: 1,
        prompt: 'Nối mỗi số với cách đọc đúng:',
        left: ['2 040 000', '2 400 000', '20 400 000', '2 004 000'],
        right: ['Hai triệu bốn trăm nghìn', 'Hai mươi triệu bốn trăm nghìn', 'Hai triệu không trăm linh bốn nghìn', 'Hai triệu không trăm bốn mươi nghìn'],
        ans: [3, 0, 1, 2] },
      // Góc 3 (130°) là góc tù. Nhiễu: góc nhọn (Góc 1, Góc 4), góc vuông (Góc 2).
      { type: 'mc', bai: 8, point: 0, level: 1,
        prompt: 'Trong các góc dưới đây, góc nào là góc tù?',
        fig: angles([
          { v: 'O', a: 'A', b: 'B', deg: 50, label: 'Góc 1' },
          { v: 'M', a: 'N', b: 'P', deg: 90, label: 'Góc 2' },
          { v: 'I', a: 'K', b: 'H', deg: 130, label: 'Góc 3' },
          { v: 'E', a: 'G', b: 'D', deg: 70, label: 'Góc 4' },
        ], { cell: 150 }),
        options: ['Góc 1', 'Góc 2', 'Góc 3', 'Góc 4'], ans: 2 },
      // Nhiễu: đọc theo phía bên kia của thước (110°), đọc vạch có số gần nhất (80°), đọc lệch một vạch 10° (60°).
      { type: 'mc', bai: 7, point: 1, level: 1,
        prompt: 'Dùng thước đo góc như hình. Số đo của góc đỉnh O; cạnh OA, OB là:',
        fig: protractor(70),
        options: ['110°', '80°', '70°', '60°'], ans: 2 },
      // Ý sai: 80 000 : 4 = 20 000, viết thiếu một chữ số 0.
      { type: 'tf', bai: 2, point: 2, level: 1,
        prompt: 'Tính nhẩm. Đúng ghi Đ, sai ghi S:',
        items: ['50 000 + 40 000 = 90 000', '7 000 × 4 = 28 000', '80 000 : 4 = 2 000', '70 000 − 30 000 = 40 000'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // Chữ số hàng chục nghìn là 5 nên làm tròn lên: 1 400 000.
      // Nhiễu: làm tròn xuống (1 300 000), làm tròn đến hàng chục nghìn (1 350 000), đến hàng triệu (1 000 000).
      { type: 'mc', bai: 13, point: 0, level: 1,
        prompt: 'Dân số một tỉnh là 1 352 870 người. Làm tròn số dân đến hàng trăm nghìn thì được khoảng:',
        options: ['1 300 000 người', '1 400 000 người', '1 350 000 người', '1 000 000 người'], ans: 1 },
      // 3 phút = 180 giây; 180 + 15 = 195. Nhiễu: coi 3 phút = 300 giây (315), nhân 3 × 15 (45), cộng 3 + 15 (18).
      { type: 'mc', bai: 19, point: 0, level: 2,
        prompt: '3 phút 15 giây = … giây. Số thích hợp viết vào chỗ chấm là:',
        options: ['315', '195', '45', '18'], ans: 1 },
      // Ý sai: so chữ số hàng chục nghìn 6 > 0 nên 7 360 512 lớn hơn, không bé hơn.
      { type: 'tf', bai: 14, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['89 999 < 100 000', '540 210 > 504 210', '7 360 512 < 7 306 512', '1 000 000 > 999 999'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // 4 tấn = 40 tạ; 40 − 25 = 15 tạ. Nhiễu: lấy 25 − 4 (21 tạ), đổi 4 tấn = 400 tạ (375 tạ), cộng (29 tạ).
      { type: 'mc', bai: 17, point: 1, level: 2,
        prompt: 'Một xe tải chở 4 tấn gạo. Người ta đã dỡ xuống 25 tạ gạo. Trên xe còn lại bao nhiêu tạ gạo?',
        options: ['21 tạ', '375 tạ', '15 tạ', '29 tạ'], ans: 2 },
      // Hình 3 là hình bình hành. Nhiễu: hình thang chỉ có một cặp cạnh song song (Hình 1), tứ giác thường (Hình 2),
      // hình có hai cặp cạnh kề bằng nhau nhưng không song song (Hình 4).
      { type: 'mc', bai: 31, point: 0, level: 1,
        prompt: 'Hình nào dưới đây là hình bình hành?',
        fig: shapeRow([
          [[30, 15], [90, 15], [110, 85], [10, 85]],
          [[20, 20], [95, 10], [105, 80], [15, 70]],
          [[35, 15], [110, 15], [85, 85], [10, 85]],
          [[60, 8], [95, 35], [60, 92], [25, 35]],
        ]),
        options: ['Hình 1', 'Hình 2', 'Hình 3', 'Hình 4'], ans: 2 },
      // Ý sai: tính 1 000 − m trước rồi mới nhân 4 ((1 000 − 125) × 4 = 3 500); đúng là 1 000 − 500 = 500.
      { type: 'tf', bai: 4, point: 0, level: 2,
        prompt: 'Với m = 125. Đúng ghi Đ, sai ghi S:',
        items: ['m + 75 = 200', 'm × 4 = 500', '1 000 − m × 4 = 3 500', 'm : 5 = 25'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // 12 500 000 − 9 850 000 = 2 650 000. Nhiễu: cộng hai giá (22 350 000), quên nhớ ở hàng trăm nghìn (2 750 000),
      // quên nhớ ở hàng triệu (3 650 000).
      { type: 'mc', bai: 23, point: 1, level: 3,
        prompt: 'Một chiếc ti vi giá 12 500 000 đồng, một chiếc tủ lạnh giá 9 850 000 đồng. Chiếc ti vi đắt hơn chiếc tủ lạnh bao nhiêu tiền?',
        options: ['22 350 000 đồng', '2 750 000 đồng', '2 650 000 đồng', '3 650 000 đồng'], ans: 2 },
      // Ý sai: EF cắt CD nên không song song với CD; AB, CD song song nên kéo dài mãi cũng không cắt nhau.
      { type: 'tf', bai: [27, 29], point: 0, level: 2,
        prompt: 'Quan sát hình. Đúng ghi Đ, sai ghi S:',
        fig: geo({ pts: { A: [20, 45], B: [280, 45], C: [20, 115], D: [280, 115], E: [150, 12], F: [150, 148] }, segs: ['AB', 'CD', 'EF'], pos: { C: 's', D: 's', E: 'e', F: 'e' }, h: 160 }),
        items: ['Đường thẳng AB song song với đường thẳng CD.', 'Đường thẳng EF vuông góc với đường thẳng AB.', 'Đường thẳng EF song song với đường thẳng CD.', 'Kéo dài mãi thì đường thẳng AB và đường thẳng CD sẽ cắt nhau.'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // 2 × 1 = 2 m² = 200 dm². Nhiễu: quên đổi (2 dm²), đổi như đơn vị độ dài (20 dm²), tính chu vi 6 m rồi đổi (600 dm²).
      { type: 'mc', bai: 18, point: 1, level: 3,
        prompt: 'Một tấm kính hình chữ nhật dài 2 m, rộng 1 m. Diện tích tấm kính là bao nhiêu đề-xi-mét vuông?',
        options: ['2 dm²', '20 dm²', '200 dm²', '600 dm²'], ans: 2 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [22, 23], point: 0, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['508 374 + 296 858', '914 205 − 587 649', '67 049 + 15 986', '50 400 − 27 836'] },
      // 352 108: 5 ở hàng chục nghìn; 5 017 600: 5 ở hàng triệu; 48 590 236: 5 ở hàng trăm nghìn.
      { type: 'table', bai: 12, point: 2, level: 2,
        prompt: 'Viết giá trị của chữ số 5 trong mỗi số sau:',
        head: ['Số', 'Giá trị của chữ số 5'],
        rows: [['352 108', '…'], ['5 017 600', '…'], ['48 590 236', '…']],
        ans: [[50000], [5000000], [500000]] },
      { type: 'fill', bai: 24, point: 2, level: 2,
        prompt: 'Tính bằng cách thuận tiện:',
        items: [
          { t: '2 360 + 1 975 + 640 = (2 360 + …) + 1 975 = … + 1 975 = …', ans: [640, 3000, 4975] },
          { t: '587 + 245 + 413 + 755 = (587 + …) + (245 + …) = … + … = …', ans: [413, 755, 1000, 1000, 2000] },
        ] },
      // Chiều dài: (96 + 18) : 2 = 57 (m); chiều rộng: (96 − 18) : 2 = 39 (m).
      { type: 'fill', bai: 25, point: 0, level: 3,
        prompt: 'Một mảnh vườn hình chữ nhật có nửa chu vi là 96 m, chiều dài hơn chiều rộng 18 m. Tính chiều dài, chiều rộng của mảnh vườn.',
        fig: sumDiff({ sum: '96 m', diff: '18 m', names: ['Chiều dài', 'Chiều rộng'], small: 0.68 }),
        items: [
          { t: 'Chiều dài: (… + …) : 2 = … (m)', ans: [96, 18, 57] },
          { t: 'Chiều rộng: (… − …) : 2 = … (m)', ans: [96, 18, 39] },
        ] },
      // Ngày 2: 1 250 + 340 = 1 590; ngày 3: 1 590 − 290 = 1 300; cả ba ngày: 1 250 + 1 590 + 1 300 = 4 140.
      { type: 'fill', bai: 5, point: 1, level: 3,
        prompt: 'Một đội công nhân sửa đường. Ngày thứ nhất sửa được 1 250 m, ngày thứ hai sửa được nhiều hơn ngày thứ nhất 340 m, ngày thứ ba sửa được ít hơn ngày thứ hai 290 m. Hỏi cả ba ngày đội sửa được bao nhiêu mét đường?',
        items: [
          { t: 'Ngày thứ hai đội sửa được … m đường.', ans: 1590 },
          { t: 'Ngày thứ ba đội sửa được … m đường.', ans: 1300 },
          { t: 'Cả ba ngày đội sửa được … m đường.', ans: 4140 },
        ] },
    ] },
  ],
};
