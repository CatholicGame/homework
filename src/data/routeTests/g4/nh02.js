/** Kiểm tra nhanh 2: Bài 4–6 Toán 4 (biểu thức chứa chữ; giải bài toán có ba bước tính). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l4-nh-02',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 2',
  short: 'Nhanh 2',
  after: { book: 'tool4', units: '4-6' },
  desc: 'Biểu thức chứa chữ; giải bài toán có ba bước tính',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // 125 + 8 = 133. Nhiễu: quên nhớ sang hàng chục (123), trừ thay cộng (117), nhân thay cộng (1 000).
      { type: 'mc', bai: 4, point: 0, level: 1,
        prompt: 'Với a = 8 thì giá trị của biểu thức 125 + a là:',
        options: ['123', '133', '117', '1 000'], ans: 1 },
      // a × b = 24 (ý sai lấy a + b = 10); (a + b) × 2 = 20 (ý sai tính b × 2 trước: 6 + 8 = 14).
      { type: 'tf', bai: 4, point: 1, level: 1,
        prompt: 'Với a = 6, b = 4. Đúng ghi Đ, sai ghi S:',
        items: ['a + b = 10', 'a − b = 2', 'a × b = 10', '(a + b) × 2 = 14'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // P = a × 4 = 25 × 4 = 100 cm. Nhiễu: nhân 2 như nửa chu vi (50), cộng 4 (29), tính a × a là diện tích (625).
      { type: 'mc', bai: 4, point: 2, level: 1,
        prompt: 'Một viên gạch hình vuông có cạnh a = 25 cm. Chu vi viên gạch (P = a × 4) là:',
        options: ['100 cm', '50 cm', '29 cm', '625 cm'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // (15 + 25) × 3 = 40 × 3 = 120; 500 − 45 × 4 = 500 − 180 = 320 (nhân trước, trừ sau).
      { type: 'fill', bai: 4, point: 1, level: 2,
        prompt: 'Tính giá trị của biểu thức:',
        items: [
          { t: 'Với a = 15, b = 25, c = 3 thì (a + b) × c = (15 + 25) × 3 = … × 3 = …', ans: [40, 120] },
          { t: 'Với a = 500, b = 45, c = 4 thì a − b × c = 500 − 45 × 4 = 500 − … = …', ans: [180, 320] },
        ] },
      // Bước 1: 48 × 3 = 144 hộp; bước 2: 65 + 38 = 103 hộp; bước 3: 144 − 103 = 41 hộp.
      { type: 'fill', bai: 5, point: 1, level: 3,
        prompt: 'Một cửa hàng có 3 thùng sữa, mỗi thùng có 48 hộp. Buổi sáng cửa hàng bán được 65 hộp, buổi chiều bán được 38 hộp. Hỏi cửa hàng còn lại bao nhiêu hộp sữa?',
        items: [
          { t: 'Cửa hàng có tất cả: 48 × 3 = … (hộp)', ans: [144] },
          { t: 'Cả ngày bán được: 65 + 38 = … (hộp)', ans: [103] },
          { t: 'Cửa hàng còn lại: … − … = … (hộp)', ans: [144, 103, 41] },
        ] },
    ] },
  ],
};
