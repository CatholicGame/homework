/** Kiểm tra tổng hợp 1 (Đề 2): Bài 1–8 Vở BT Toán 3 (Nhanh 1 + Nhanh 2). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l3-th-01b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 1 (Đề 2)',
  short: 'Tổng hợp 1 · Đề 2',
  after: { book: 'workbook', units: '1-8' },
  desc: 'Số đến 1 000; cộng, trừ có nhớ; số hạng, tổng, số bị trừ; bảng nhân, bảng chia 2, 3, 4, 5; đơn vị đo độ dài',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: viết chữ số thay số chục (2), nhầm hàng trăm (200), ghép chục và đơn vị (27).
      { type: 'mc', bai: 1, point: 2, level: 1,
        prompt: 'Số thích hợp điền vào chỗ chấm: 527 = 500 + … + 7',
        options: ['20', '2', '200', '27'], ans: 0 },
      // Nhiễu: lệch một hàng (8), lấy 45 trừ 5 (40), lấy 45 cộng 5 (50).
      { type: 'mc', bai: 4, point: 2, level: 1,
        prompt: 'Kết quả của phép tính 45 : 5 là:',
        options: ['9', '8', '40', '50'], ans: 0 },
      // Ý sai: gọi số hạng là tổng.
      { type: 'tf', bai: 3, point: 0, level: 1,
        prompt: 'Cho phép cộng 246 + 135 = 381. Đúng ghi Đ, sai ghi S:',
        items: ['246 là số hạng.', '135 là tổng.', '381 là tổng.', '381 − 135 = 246'],
        ans: ['Đ', 'S', 'Đ', 'Đ'] },
      { type: 'match', bai: 5, point: 3, level: 1,
        prompt: 'Tính nhẩm rồi nối mỗi phép tính với kết quả đúng:',
        left: ['3 × 4', '3 × 9', '18 : 3', '30 : 3'],
        right: ['6', '10', '12', '27'],
        ans: [2, 3, 0, 1] },
      // Nhiễu: nhầm 1 dm = 1 cm (4), nhầm sang mét (400), cộng 4 với 10 (14).
      { type: 'mc', bai: 7, point: 4, level: 2,
        prompt: 'Số thích hợp điền vào chỗ chấm: 4 dm = … cm',
        options: ['40', '4', '400', '14'], ans: 0 },
      // Nhiễu: nhân sai số lần (4 × 4), cộng thay vì nhân (5 + 4), lấy thừa một lần (5 × 5).
      { type: 'mc', bai: 4, point: 0, level: 2,
        prompt: 'Tổng 5 + 5 + 5 + 5 viết thành phép nhân là:',
        options: ['5 × 4', '4 × 4', '5 + 4', '5 × 5'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 2, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['267 + 148', '539 + 76', '715 − 362', '603 − 128'] },
      // 340 + 125 = 465, 572 − 218 = 354, 900 − 450 = 450.
      { type: 'table', bai: 3, point: 3, level: 2,
        prompt: 'Viết số thích hợp vào ô trống:',
        head: ['Số bị trừ', 'Số trừ', 'Hiệu'],
        rows: [['…', 125, 340], [572, '…', 218], [900, 450, '…']],
        ans: [[465], [354], [450]] },
      {
        type: 'word', bai: 6, point: 2, level: 3,
        text: 'Có 32 quả cam xếp đều vào 4 đĩa. Hỏi mỗi đĩa có bao nhiêu quả cam?',
        given: ['Có 32 quả cam.', 'Xếp đều vào 4 đĩa.'],
        ask: 'Mỗi đĩa có bao nhiêu quả cam?',
        hint: 'Chia đều thành 4 phần thì lấy 32 chia cho 4.',
        sentence: ['Mỗi đĩa', 'có số', 'quả cam', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 32, op: ':', b: 4, result: 8, unit: 'quả cam' },
        units: ['quả cam', 'đĩa', 'kg'],
      },
      // 6 × 3 = 18, 18 : 2 = 9, 9 × 4 = 36; 40 : 5 = 8, 8 × 3 = 24, 24 : 4 = 6.
      { type: 'chain', bai: [4, 5, 6], point: 2, level: 3,
        prompt: 'Số?',
        items: [{ start: 6, steps: ['× 3', ': 2', '× 4'] }, { start: 40, steps: [': 5', '× 3', ': 4'] }] },
    ] },
  ],
};
