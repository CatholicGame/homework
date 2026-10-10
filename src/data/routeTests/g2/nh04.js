/** Kiểm tra nhanh 4: Bài 11–14 Vở BT Toán 2 (phép trừ qua 10, bảng trừ, bài toán nhiều hơn, ít hơn). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l2-nh-04',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 4',
  short: 'Nhanh 4',
  after: { book: 'workbook2', units: '11-14' },
  desc: 'Phép trừ qua 10 trong phạm vi 20, bảng trừ; bài toán nhiều hơn, ít hơn',
  time: 15,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: cộng thay trừ (18), hụt 1, dư 1.
      { type: 'mc', bai: 12, point: 0, level: 1,
        prompt: '13 − 5 = ?',
        options: ['7', '8', '18', '9'], ans: 1 },
      // Cách đúng: 10 trừ trước rồi cộng phần lẻ. Nhiễu: trừ lẻ trước, cộng thay trừ.
      { type: 'mc', bai: 11, point: 0, level: 1,
        prompt: 'Tính 15 − 7 bằng cách tách 15 = 10 + 5. Cách làm đúng là:', cols: 1,
        options: ['10 − 7 = 3; 3 + 5 = 8', '10 − 5 = 5; 7 − 5 = 2', '10 + 7 = 17; 17 − 5 = 12'], ans: 0 },
      { type: 'match', bai: 12, point: 1, level: 1, multi: true,
        prompt: 'Nối phép tính với kết quả:',
        left: ['11 − 3', '14 − 6', '12 − 7', '16 − 9'],
        right: ['5', '7', '8'], ans: [2, 2, 0, 1] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'fill', bai: 12, point: 1, level: 2,
        prompt: 'Biết 9 + 7 = 16. Viết số thích hợp vào ô trống:',
        items: ['16 − 9 = □', '16 − 7 = □', '16 − □ = 9'] },
      // "Ít hơn" thì trừ (bé hay cộng vì thấy chữ "hơn").
      {
        type: 'word', bai: 13, point: 1, level: 3,
        text: 'Tổ Một trồng được 15 cây hoa, tổ Hai trồng được ít hơn tổ Một 6 cây hoa. Hỏi tổ Hai trồng được bao nhiêu cây hoa?',
        given: ['Tổ Một trồng được 15 cây hoa.', 'Tổ Hai ít hơn tổ Một 6 cây hoa.'],
        ask: 'Tổ Hai trồng được bao nhiêu cây hoa?',
        hint: 'Ít hơn thì lấy số của tổ Một trừ đi 6.',
        sentence: ['Tổ Hai', 'trồng được', 'số cây hoa', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 15, op: '−', b: 6, result: 9, unit: 'cây hoa' },
        units: ['cây hoa', 'tổ', 'bạn'],
      },
    ] },
  ],
};
