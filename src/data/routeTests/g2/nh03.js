/** Kiểm tra nhanh 3: Bài 7–10 Vở BT Toán 2 (phép cộng qua 10, bảng cộng, bài toán thêm, bớt). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l2-nh-03',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 3',
  short: 'Nhanh 3',
  after: { book: 'workbook2', units: '7-10' },
  desc: 'Phép cộng qua 10 trong phạm vi 20, bảng cộng; bài toán thêm, bớt',
  time: 15,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: quên chục (4), hụt 1 (13), dư 1 (15).
      { type: 'mc', bai: 8, point: 0, level: 1,
        prompt: '9 + 5 = ?',
        options: ['13', '14', '4', '15'], ans: 1 },
      // Làm tròn 10: 8 cần thêm 2. Nhiễu: tách đôi (3 và 3), tách ngẫu nhiên.
      { type: 'mc', bai: 7, point: 0, level: 1,
        prompt: 'Tính 8 + 6 bằng cách làm tròn 10. Ta tách 6 thành:',
        options: ['3 và 3', '2 và 4', '1 và 5', '6 và 0'], ans: 1 },
      // Ý sai: hụt 1 khi đếm tiếp, 6 + 6 nhầm thành 13.
      { type: 'tf', bai: [7, 8], point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['7 + 6 = 6 + 7', '8 + 5 = 12', '9 + 4 = 13', '6 + 6 = 13'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'compare', bai: 8, point: 2, level: 2,
        prompt: 'Điền dấu >, <, = thích hợp:',
        items: ['8 + 4 □ 13', '6 + 9 □ 15', '7 + 7 □ 9 + 4', '5 + 8 □ 6 + 6'] },
      {
        type: 'word', bai: 9, point: 0, level: 3,
        text: 'Mẹ mua 9 quả trứng, bà cho thêm 6 quả trứng. Hỏi nhà em có tất cả bao nhiêu quả trứng?',
        given: ['Mẹ mua 9 quả trứng.', 'Bà cho thêm 6 quả trứng.'],
        ask: 'Có tất cả bao nhiêu quả trứng?',
        hint: 'Cho thêm thì số trứng nhiều lên: làm phép cộng.',
        sentence: ['Nhà em', 'có tất cả', 'số quả trứng', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 9, op: '+', b: 6, result: 15, unit: 'quả trứng' },
        units: ['quả trứng', 'con gà', 'kg'],
      },
    ] },
  ],
};
