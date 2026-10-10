/** Kiểm tra tổng hợp 4 (Đề 1): Bài 23–29 Vở BT Toán 3 (Nhanh 7 + Nhanh 8, ôn Bài 1–22). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l3-th-04',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 4 (Đề 1)',
  short: 'Tổng hợp 4 · Đề 1',
  after: { book: 'workbook', units: '23-29' },
  desc: 'Nhân, chia số có hai chữ số với (cho) số có một chữ số; gấp lên, giảm đi một số lần; chia có dư; bài toán hai bước; ôn bảng nhân, bảng chia, tìm thừa số',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: lấy 40 cộng 2 (42), quên viết chữ số 0 (8), viết thừa một chữ số 0 (800).
      { type: 'mc', bai: 23, point: 3, level: 1,
        prompt: 'Nhân nhẩm: 40 × 2 = ?',
        options: ['80', '42', '8', '800'], ans: 0 },
      // Ôn bảng nhân, bảng chia 6, 7, 8, 9. Ý sai: nhầm sang tích liền kề (8 × 6 = 48, không phải 46), 63 : 7 = 9.
      { type: 'tf', bai: [9, 10, 11, 12], point: 1, level: 1, review: true,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['7 × 8 = 56', '54 : 9 = 6', '8 × 6 = 46', '63 : 7 = 8'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // Nhiễu: "gấp" mà cộng thêm 4 (10), lấy 6 − 4 (2), viết liền hai chữ số (64).
      { type: 'mc', bai: 24, point: 1, level: 1,
        prompt: 'Gấp 6 lên 4 lần thì được:',
        options: ['24', '10', '2', '64'], ans: 0 },
      // Số dư bé hơn số chia nên lớn nhất là 5. Nhiễu: lấy bằng số chia (6), bé hơn một (4), nghĩ số dư chỉ là 1.
      { type: 'mc', bai: 25, point: 2, level: 2,
        prompt: 'Trong phép chia cho 6, số dư lớn nhất có thể là:',
        options: ['5', '6', '4', '1'], ans: 0 },
      // Phân biệt gấp lên với thêm, giảm đi với bớt: 24 × 3 = 72, 24 : 3 = 8, 24 + 3 = 27, 24 − 3 = 21.
      { type: 'match', bai: [24, 27], point: 3, level: 2,
        prompt: 'Nối mỗi ô bên trái với kết quả đúng:',
        left: ['Gấp 24 lên 3 lần', 'Giảm 24 đi 3 lần', 'Thêm 3 vào 24', 'Bớt 3 ở 24'],
        right: ['21', '72', '27', '8'],
        ans: [1, 3, 2, 0] },
      // 58 : 5 = 11 (dư 3). Nhiễu: số dư lớn hơn số chia (10 dư 8), trừ sai ở lượt hai (11 dư 2), thương quá lớn (12 × 5 = 60 > 58).
      { type: 'mc', bai: 26, point: 3, level: 2,
        prompt: 'Kết quả của phép chia 58 : 5 là:',
        options: ['11 (dư 3)', '10 (dư 8)', '11 (dư 2)', '12 (dư 2)'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [23, 26], point: 0, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['27 × 3', '18 × 5', '96 : 3', '75 : 6'] },
      // Ôn tìm thừa số (bảng nhân 6, 9), chặng này dùng để thử lại phép chia.
      { type: 'findx', bai: 13, point: 0, level: 2, review: true,
        prompt: 'Tìm x:',
        items: ['x × 6 = 42', '9 × x = 72'] },
      {
        type: 'word', bai: 27, point: 0, level: 3,
        text: 'Trang trại nhà bác Hai nuôi 84 con vịt. Số con gà bằng số con vịt giảm đi 4 lần. Hỏi trang trại nuôi bao nhiêu con gà?',
        given: ['Có 84 con vịt.', 'Số gà bằng số vịt giảm đi 4 lần.'],
        ask: 'Trang trại nuôi bao nhiêu con gà?',
        hint: 'Giảm một số đi 4 lần thì lấy số đó chia cho 4.',
        sentence: ['Trang trại', 'nuôi', 'số con gà', 'là:'],
        decoys: ['cả gà và vịt'],
        expr: { a: 84, op: ':', b: 4, result: 21, unit: 'con gà' },
        units: ['con gà', 'con vịt', 'lần'],
      },
      // Bước 1: buổi chiều 35 × 2 = 70 (kg); bước 2: cả ngày 35 + 70 = 105 (kg).
      { type: 'fill', bai: 28, point: 2, level: 3,
        prompt: 'Buổi sáng cửa hàng bán được 35 kg gạo. Buổi chiều bán được số gạo gấp đôi buổi sáng. Hỏi cả ngày cửa hàng bán được bao nhiêu ki-lô-gam gạo?',
        items: [
          { t: 'Buổi chiều bán được: 35 × … = … (kg)', ans: [2, 70] },
          { t: 'Cả ngày bán được: 35 + … = … (kg)', ans: [70, 105] },
        ] },
    ] },
  ],
};
