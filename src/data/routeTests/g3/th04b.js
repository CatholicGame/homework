/** Kiểm tra tổng hợp 4 (Đề 2): Bài 23–29 Vở BT Toán 3 (Nhanh 7 + Nhanh 8, ôn Bài 1–22). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l3-th-04b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 4 (Đề 2)',
  short: 'Tổng hợp 4 · Đề 2',
  after: { book: 'workbook', units: '23-29' },
  desc: 'Đặt tính nhân, chia; phép chia hết, chia có dư; gấp lên, giảm đi một số lần; bài toán hai bước; ôn bảng nhân 9, tìm thừa số',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Ý sai: quên cộng số nhớ (36 × 2: 6 × 2 = 12 viết 2 nhớ 1, 3 × 2 = 6 thêm 1 là 7, ra 72; 27 × 3 = 81).
      { type: 'tf', bai: 23, point: 2, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: [
          { col: '24 × 3', res: '72' },
          { col: '36 × 2', res: '62' },
          { col: '15 × 4', res: '60' },
          { col: '27 × 3', res: '61' },
        ],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Ôn bảng nhân 9. Nhiễu: nhầm sang 8 × 7 (56), 9 × 8 (72), lấy 9 + 7 (16).
      { type: 'mc', bai: 12, point: 1, level: 1, review: true,
        prompt: 'Kết quả của phép nhân 9 × 7 là:',
        options: ['63', '56', '72', '16'], ans: 0 },
      // 36 : 4 = 9; 29 : 3 = 9 (dư 2); 45 : 7 = 6 (dư 3); 50 : 8 = 6 (dư 2).
      { type: 'mc', bai: 25, point: 0, level: 1,
        prompt: 'Phép chia nào là phép chia hết?',
        options: ['36 : 4', '29 : 3', '45 : 7', '50 : 8'], ans: 0 },
      // Ý sai: "giảm đi 4 lần" mà trừ 4 (16), "gấp lên 4 lần" mà cộng 4 (24).
      { type: 'tf', bai: [24, 27], point: 3, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Giảm 20 đi 4 lần được 5.', 'Giảm 20 đi 4 lần được 16.', 'Gấp 20 lên 4 lần được 24.', 'Gấp 20 lên 4 lần được 80.'],
        ans: ['Đ', 'S', 'S', 'Đ'] },
      // 72 : 6 = 12. Nhiễu: lấy 72 − 6 (66), 72 + 6 (78), chỉ viết chữ số hàng đơn vị của thương (2).
      { type: 'mc', bai: 26, point: 1, level: 2,
        prompt: 'Bác Ba xếp 72 quả trứng vào các khay, mỗi khay 6 quả. Bác xếp được bao nhiêu khay trứng?',
        options: ['12 khay', '66 khay', '78 khay', '2 khay'], ans: 0 },
      // 17 : 5 = 3 (dư 2); 23 : 4 = 5 (dư 3); 30 : 6 = 5; 19 : 3 = 6 (dư 1).
      { type: 'match', bai: 25, point: 1, level: 1,
        prompt: 'Nối mỗi phép chia với kết quả đúng:',
        left: ['17 : 5', '23 : 4', '30 : 6', '19 : 3'],
        right: ['6 (dư 1)', '5', '3 (dư 2)', '5 (dư 3)'],
        ans: [2, 3, 1, 0] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [23, 26], point: 0, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['16 × 6', '38 × 2', '68 : 2', '89 : 4'] },
      // Ôn tìm thừa số, tìm tích: 56 : 7 = 8, 54 : 9 = 6, 8 × 6 = 48.
      { type: 'table', bai: 13, point: 0, level: 2, review: true,
        prompt: 'Viết số thích hợp vào ô trống:',
        head: ['Thừa số', 'Thừa số', 'Tích'],
        rows: [[7, '…', 56], ['…', 9, 54], [8, 6, '…']],
        ans: [[8], [6], [48]] },
      {
        type: 'word', bai: 24, point: 0, level: 3,
        text: 'Bao gạo nhỏ cân nặng 15 kg. Bao gạo to cân nặng gấp 3 lần bao gạo nhỏ. Hỏi bao gạo to cân nặng bao nhiêu ki-lô-gam?',
        given: ['Bao gạo nhỏ nặng 15 kg.', 'Bao gạo to nặng gấp 3 lần bao nhỏ.'],
        ask: 'Bao gạo to cân nặng bao nhiêu ki-lô-gam?',
        hint: 'Gấp một số lên 3 lần thì lấy số đó nhân với 3.',
        sentence: ['Bao gạo to', 'cân nặng', 'số ki-lô-gam', 'là:'],
        decoys: ['cả hai bao'],
        expr: { a: 15, op: '×', b: 3, result: 45, unit: 'kg' },
        units: ['kg', 'bao', 'lần'],
      },
      // Bước 1: trẻ em 45 : 5 = 9 (người); bước 2: cả đoàn 45 + 9 = 54 (người).
      { type: 'fill', bai: 28, point: 1, level: 3,
        prompt: 'Một đoàn khách tham quan có 45 người lớn. Số trẻ em bằng số người lớn giảm đi 5 lần. Hỏi cả đoàn có bao nhiêu người?',
        items: [
          { t: 'Số trẻ em là: 45 : … = … (người)', ans: [5, 9] },
          { t: 'Cả đoàn có: 45 + … = … (người)', ans: [9, 54] },
        ] },
    ] },
  ],
};
