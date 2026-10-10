/** Kiểm tra giữa học kì I (Đề 2): Bài 1–21 Toán 4 (Nhanh 1 đến 6). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { protractor, angles } from './art.js';

export default {
  id: 'l4-gk-1b',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 2)',
  short: 'Giữa kì I · Đề 2',
  after: { book: 'tool4', units: '1-21' },
  desc: 'Hàng và lớp; số chẵn, số lẻ; tìm thành phần chưa biết; chu vi hình chữ nhật; bài toán ba bước; đo góc, góc bẹt; làm tròn, sắp xếp số; yến, tạ, tấn; giây',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Lớp nghìn = ba chữ số hàng trăm nghìn, chục nghìn, nghìn: 7, 1, 5.
      // Nhiễu: chọn lớp đơn vị (3, 4, 9), lấy bốn chữ số đầu vì nghĩ "nghìn" có bốn chữ số, bỏ chữ số đầu (1, 5, 3).
      { type: 'mc', bai: 11, point: 0, level: 1,
        prompt: 'Các chữ số thuộc lớp nghìn của số 715 349 là:',
        options: ['3, 4, 9', '7, 1, 5', '7, 1, 5, 3', '1, 5, 3'], ans: 1 },
      // Ý sai: nhìn chữ số đầu thay vì chữ số tận cùng (10 001 lẻ), số lẻ bé nhất có năm chữ số là 10 001 chứ không phải 10 000.
      { type: 'tf', bai: 3, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['35 790 là số chẵn.', '48 263 là số lẻ.', '10 001 là số chẵn.', 'Số lẻ bé nhất có năm chữ số là 10 000.'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // Nhiễu: góc tù (Góc 3) vì "mở rộng nhất trông như thẳng", góc nhọn, góc vuông.
      { type: 'mc', bai: 8, point: 1, level: 1,
        prompt: 'Góc nào là góc bẹt?',
        fig: angles([
          { v: 'O', a: 'A', b: 'B', deg: 70, label: 'Góc 1' },
          { v: 'E', a: 'G', b: 'H', deg: 180, label: 'Góc 2' },
          { v: 'K', a: 'M', b: 'N', deg: 150, label: 'Góc 3' },
          { v: 'P', a: 'Q', b: 'R', deg: 90, label: 'Góc 4' },
        ], { cell: 180 }),
        options: ['Góc 1', 'Góc 2', 'Góc 3', 'Góc 4'], ans: 1 },
      // 473 105: 4 trăm nghìn, 7 chục nghìn. Nhiễu: 7 ở hàng trăm nghìn, hàng nghìn, hàng chục (đếm hàng từ trái sang hoặc lệch một hàng).
      { type: 'mc', bai: 12, point: 1, level: 1,
        prompt: 'Số nào dưới đây có chữ số 7 ở hàng chục nghìn?',
        options: ['734 105', '473 105', '437 105', '431 075'], ans: 1 },
      // Nhiễu: lấy 180° − 140° (40°), đọc lệch sang vạch số bên cạnh (130°, 150°).
      { type: 'mc', bai: 7, point: 1, level: 1,
        prompt: 'Đặt thước đo góc như hình. Góc AOB có số đo là:',
        fig: protractor(140),
        options: ['140°', '40°', '130°', '150°'], ans: 0 },
      // 3 yến = 30 kg; 2 tạ = 200 kg; 5 tấn = 5 000 kg; 4 tạ 5 kg = 405 kg.
      { type: 'match', bai: 17, point: 0, level: 1,
        prompt: 'Nối hai số đo bằng nhau:',
        left: ['3 yến', '2 tạ', '5 tấn', '4 tạ 5 kg'],
        right: ['30 kg', '200 kg', '405 kg', '5 000 kg'], ans: [0, 1, 3, 2] },
      // Nhiễu: ba số lẻ liên tiếp (hơn kém 2), các số tròn chục (hơn kém 10), không theo thứ tự (78, 77, 79).
      { type: 'mc', bai: 15, point: 1, level: 1,
        prompt: 'Dãy nào gồm ba số tự nhiên liên tiếp?',
        options: ['45, 47, 49', '99, 100, 101', '10, 20, 30', '78, 77, 79'], ans: 1 },
      // 3 phút = 180 giây, thêm 15 giây là 195 giây. Nhiễu: ghép 3 và 15 (315), lấy 3 × 15 (45), quên 15 giây (180).
      { type: 'mc', bai: 19, point: 0, level: 1,
        prompt: '3 phút 15 giây = … giây. Số thích hợp viết vào chỗ chấm là:',
        options: ['195', '315', '45', '180'], ans: 0 },
      // Hàng trăm nghìn: xét chữ số 4 nên 2 600 000. Hàng chục nghìn: xét chữ số 9 nên 2 650 000.
      // Ý sai: làm tròn đến hàng nghìn nhưng xét nhầm chữ số hàng nghìn (đúng là 2 649 000); làm tròn lên khi chữ số bé hơn 5.
      { type: 'tf', bai: 13, point: 1, level: 2,
        prompt: 'Làm tròn số 2 649 380. Đúng ghi Đ, sai ghi S:',
        items: ['Đến hàng trăm nghìn được 2 600 000.', 'Đến hàng chục nghìn được 2 650 000.', 'Đến hàng nghìn được 2 650 000.', 'Đến hàng trăm nghìn được 2 700 000.'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // 2 dm = 20 cm; P = (20 + 15) × 2 = 70 cm.
      // Nhiễu: không đổi đơn vị ((2 + 15) × 2 = 34), quên nhân 2 (35), lấy dài nhân rộng (300).
      { type: 'mc', bai: 4, point: 2, level: 3,
        prompt: 'Một tấm thiệp hình chữ nhật có chiều dài 2 dm, chiều rộng 15 cm. Chu vi tấm thiệp là:',
        options: ['70 cm', '34 cm', '35 cm', '300 cm'], ans: 0 },
      // Nhiễu: không xét số chữ số (đặt số bảy chữ số cuối), so sai hàng chục nghìn, xếp từ bé đến lớn.
      { type: 'mc', bai: 14, point: 1, level: 3,
        prompt: 'Các số 845 320; 1 045 320; 845 230; 854 230 xếp theo thứ tự từ lớn đến bé là:',
        options: [
          '1 045 320; 854 230; 845 320; 845 230',
          '854 230; 845 320; 845 230; 1 045 320',
          '1 045 320; 845 320; 854 230; 845 230',
          '845 230; 845 320; 854 230; 1 045 320',
        ], cols: 1, ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 0, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['56 917 + 28 346', '70 405 − 38 678', '14 309 × 6', '87 612 : 7'] },
      { type: 'findx', bai: 2, point: 4, level: 2,
        prompt: 'Tìm x:',
        items: [
          { t: 'x + 23 750 = 61 200', ans: 37450 },
          { t: 'x − 18 406 = 35 279', ans: 53685 },
          { t: 'x × 5 = 46 015', ans: 9203 },
          { t: 'x : 4 = 12 308', ans: 49232 },
        ] },
      {
        type: 'word', bai: 2, point: 1, level: 2,
        text: 'Mỗi ngày một trang trại thu được 1 236 quả trứng gà. Hỏi trong 7 ngày trang trại đó thu được bao nhiêu quả trứng gà?',
        given: ['Mỗi ngày thu được 1 236 quả trứng.', 'Thu trong 7 ngày.'],
        ask: '7 ngày thu được bao nhiêu quả trứng?',
        hint: '7 ngày, mỗi ngày 1 236 quả thì lấy 1 236 nhân với 7.',
        sentence: ['Trong 7 ngày', 'trang trại thu được', 'số quả trứng', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 1236, op: '×', b: 7, result: 8652, unit: 'quả trứng' },
        units: ['quả trứng', 'ngày', 'con gà'],
      },
      // Vé người lớn 80 000 × 2 = 160 000; vé trẻ em 50 000 × 3 = 150 000; tất cả 310 000; trả lại 500 000 − 310 000 = 190 000.
      { type: 'fill', bai: 5, point: 1, level: 3,
        prompt: 'Giá vé xem xiếc: vé người lớn 80 000 đồng, vé trẻ em 50 000 đồng. Gia đình Nam mua 2 vé người lớn và 3 vé trẻ em, bố đưa cô bán vé 500 000 đồng. Hỏi cô bán vé trả lại bố bao nhiêu tiền?',
        items: [
          { t: 'Tiền mua vé người lớn: 80 000 × 2 = … (đồng)', ans: [160000] },
          { t: 'Tiền mua vé trẻ em: 50 000 × 3 = … (đồng)', ans: [150000] },
          { t: 'Tiền mua tất cả các vé: 160 000 + 150 000 = … (đồng)', ans: [310000] },
          { t: 'Cô bán vé trả lại bố: 500 000 − 310 000 = … (đồng)', ans: [190000] },
        ] },
    ] },
  ],
};
