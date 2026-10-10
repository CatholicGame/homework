/** Kiểm tra tổng hợp 2 (Đề 1): Bài 9–15 Vở BT Toán 3 (Nhanh 3 + Nhanh 4, ôn Bài 1–8). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l3-th-02',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 2 (Đề 1)',
  short: 'Tổng hợp 2 · Đề 1',
  after: { book: 'workbook', units: '9-15' },
  desc: 'Bảng nhân, bảng chia 6, 7, 8, 9; tìm thừa số, số bị chia, số chia; một phần mấy; ôn tìm số trừ, cộng, trừ có nhớ',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: chép số chia (6), lệch một hàng (8), lấy 42 trừ 6 (36).
      { type: 'mc', bai: 9, point: 2, level: 1,
        prompt: 'Kết quả của phép tính 42 : 6 là:',
        options: ['7', '6', '8', '36'], ans: 0 },
      // Ý sai: 7 × 8 nhầm sang 9 × 6 (54), 7 × 4 nhầm sang 7 × 3 (21).
      { type: 'tf', bai: 10, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['7 × 6 = 42', '7 × 8 = 54', '7 × 9 = 63', '7 × 4 = 21'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      { type: 'match', bai: [11, 12], point: 1, level: 1,
        prompt: 'Tính nhẩm rồi nối mỗi phép tính với kết quả đúng:',
        left: ['8 × 7', '9 × 6', '72 : 8', '63 : 9'],
        right: ['7', '9', '54', '56'],
        ans: [3, 2, 1, 0] },
      { type: 'pick', bai: 14, point: 1, level: 1,
        prompt: 'Tô màu {1/4} hình vuông dưới đây.',
        shape: 'square-x', ans: 1 },
      // Nhiễu: lấy tích trừ thừa số (49), lấy tích cộng thừa số (63), nhầm bảng nhân 7 với bảng nhân 6 (9).
      { type: 'mc', bai: 13, point: 0, level: 2,
        prompt: 'Số thích hợp điền vào ô trống: □ × 7 = 56',
        options: ['8', '49', '63', '9'], ans: 0 },
      // 650 − 280 = 370. Nhiễu: cộng (930), quên trả 1 ở hàng trăm (470), chép hiệu (280).
      { type: 'mc', bai: 3, point: 4, level: 2, review: true,
        prompt: 'Số thích hợp điền vào ô trống: 650 − □ = 280',
        options: ['370', '930', '470', '280'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 1, level: 1, review: true,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['458 + 327', '296 + 185', '741 − 456', '520 − 274'] },
      { type: 'fill', bai: 13, point: 2, level: 2,
        prompt: 'Số?',
        items: ['□ : 6 = 7', '□ : 9 = 4', '48 : □ = 8', '56 : □ = 7'] },
      {
        type: 'word', bai: 14, point: 3, level: 3,
        text: 'Mẹ mua 18 quả trứng. Mẹ đã dùng {1/3} số trứng đó để làm bánh. Hỏi mẹ đã dùng bao nhiêu quả trứng?',
        given: ['Mẹ mua 18 quả trứng.', 'Mẹ dùng {1/3} số trứng để làm bánh.'],
        ask: 'Mẹ đã dùng bao nhiêu quả trứng?',
        hint: 'Muốn tìm {1/3} của 18 quả trứng, ta lấy 18 chia cho 3.',
        sentence: ['Mẹ', 'đã dùng', 'số quả trứng', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 18, op: ':', b: 3, result: 6, unit: 'quả trứng' },
        units: ['quả trứng', 'cái bánh', 'kg'],
      },
      // 7 × 3 + 2 = 23; 35 : 7 = 5.
      { type: 'fill', bai: 10, point: 3, level: 3,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: 'Bố đi công tác 3 tuần lễ và 2 ngày. Bố đi công tác tất cả … ngày.', ans: 23 },
          { t: '35 ngày là … tuần lễ.', ans: 5 },
        ] },
    ] },
  ],
};
