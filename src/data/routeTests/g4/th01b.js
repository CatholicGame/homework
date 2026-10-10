/** Kiểm tra tổng hợp 1 (Đề 2): Bài 1–6 Toán 4 (Nhanh 1 + Nhanh 2). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l4-th-01b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 1 (Đề 2)',
  short: 'Tổng hợp 1 · Đề 2',
  after: { book: 'tool4', units: '1-6' },
  desc: 'Đọc, viết số đến 100 000, làm tròn số; số chẵn, số lẻ; giá trị biểu thức; biểu thức chứa hai chữ, chu vi hình vuông; bài toán có ba bước tính',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: "linh bảy" viết thành 70 (42 070), bỏ chữ số 0 hàng trăm (4 207), viết thừa một chữ số 0 (420 007).
      { type: 'mc', bai: 1, point: 0, level: 1,
        prompt: 'Số "Bốn mươi hai nghìn không trăm linh bảy" viết là:',
        options: ['42 007', '42 070', '4 207', '420 007'], ans: 0 },
      // Số lẻ có chữ số tận cùng lẻ. Nhiễu đều bắt đầu bằng chữ số lẻ (nhìn chữ số đầu thay vì chữ số tận cùng).
      { type: 'mc', bai: 3, point: 0, level: 1,
        prompt: 'Trong các số sau, số nào là số lẻ?',
        options: ['47 213', '30 586', '52 790', '71 004'], ans: 0 },
      // a = 6, b = 4. Ý sai: a − b mà cộng (10); bỏ ngoặc, tính 6 + 4 × 2 = 14 (đúng là 10 × 2 = 20).
      { type: 'tf', bai: 4, point: 1, level: 1,
        prompt: 'Với a = 6 và b = 4, đúng ghi Đ, sai ghi S:',
        items: ['a + b = 10', 'a × b = 24', 'a − b = 10', '(a + b) × 2 = 14'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // 64 820: chữ số hàng nghìn là 4 nên làm tròn xuống 60 000.
      // Nhiễu: làm tròn lên (70 000), làm tròn đến hàng nghìn (65 000), bỏ ba chữ số cuối (64 000).
      { type: 'mc', bai: 1, point: 3, level: 1,
        prompt: 'Làm tròn số 64 820 đến hàng chục nghìn thì được số:',
        options: ['60 000', '70 000', '65 000', '64 000'], ans: 0 },
      // Nhân, chia trước; có ngoặc tính trong ngoặc trước: 6 000; 54 000; 14 000; 4 000.
      { type: 'match', bai: 2, point: 3, level: 2,
        prompt: 'Nối mỗi biểu thức với giá trị của nó:',
        left: ['24 000 − 6 000 × 3', '(24 000 − 6 000) × 3', '36 000 : 4 + 5 000', '36 000 : (4 + 5)'],
        right: ['54 000', '4 000', '6 000', '14 000'],
        ans: [2, 0, 3, 1] },
      // P = 18 × 4 = 72 cm. Nhiễu: nhân 2 (36 cm), nhầm diện tích 18 × 18 (324 cm), lấy 18 + 4 (22 cm).
      { type: 'mc', bai: 4, point: 2, level: 2,
        prompt: 'Một khung ảnh hình vuông có cạnh 18 cm. Chu vi khung ảnh là:',
        options: ['72 cm', '36 cm', '324 cm', '22 cm'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 1, level: 1, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['56 078 + 9 645', '70 000 − 34 285', '20 917 × 4', '65 412 : 6'] },
      // Thay a, b bằng số rồi tính: 129, 500; 2 005, 10 000; 603, 1 800.
      { type: 'table', bai: 4, point: 1, level: 2,
        prompt: 'Viết giá trị của biểu thức vào ô trống:',
        head: ['a', 'b', 'a + b', 'a × b'],
        rows: [[125, 4, '…', '…'], ['2 000', 5, '…', '…'], [600, 3, '…', '…']],
        ans: [[129, 500], [2005, 10000], [603, 1800]] },
      {
        type: 'word', bai: 2, point: 1, level: 3,
        text: 'Một xưởng may mỗi ngày may được 1 250 chiếc áo. Hỏi trong 6 ngày xưởng may được bao nhiêu chiếc áo?',
        given: ['Mỗi ngày may được 1 250 chiếc áo.', 'May trong 6 ngày.'],
        ask: 'Trong 6 ngày xưởng may được bao nhiêu chiếc áo?',
        hint: '1 250 chiếc áo được lấy 6 lần, làm phép nhân.',
        sentence: ['Trong 6 ngày', 'xưởng may được', 'số chiếc áo', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 1250, op: '×', b: 6, result: 7500, unit: 'chiếc áo' },
        units: ['chiếc áo', 'ngày', 'xưởng'],
      },
      // Bước 1: sách giáo khoa 1 240 × 3 = 3 720; bước 2: còn lại 3 720 − 900 = 2 820; bước 3: tất cả 1 240 + 2 820 = 4 060.
      { type: 'fill', bai: 5, point: 1, level: 3,
        prompt: 'Thư viện trường có 1 240 quyển truyện. Số sách giáo khoa gấp 3 lần số truyện. Thư viện đã tặng 900 quyển sách giáo khoa cho trường bạn. Hỏi thư viện còn lại tất cả bao nhiêu quyển truyện và sách giáo khoa?',
        items: [
          { t: 'Số sách giáo khoa lúc đầu: 1 240 × 3 = … (quyển)', ans: [3720] },
          { t: 'Số sách giáo khoa còn lại: … − 900 = … (quyển)', ans: [3720, 2820] },
          { t: 'Thư viện còn lại tất cả: 1 240 + … = … (quyển)', ans: [2820, 4060] },
        ] },
    ] },
  ],
};
