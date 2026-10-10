/** Kiểm tra nhanh 1: Bài 1–3 Vở BT Toán 3 (số đến 1 000; cộng, trừ trong phạm vi 1 000; tìm số hạng, số bị trừ, số trừ). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l3-nh-01',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 1',
  short: 'Nhanh 1',
  after: { book: 'workbook', units: '1-3' },
  desc: 'Số đến 1 000; cộng, trừ trong phạm vi 1 000; tìm số hạng, số bị trừ, số trừ',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: viết từng phần "4 trăm" "7" thành 4007, nhầm "linh bảy" thành bảy chục (470), nhầm "mười bảy" (417).
      { type: 'mc', bai: 1, point: 1, level: 1,
        prompt: 'Số "bốn trăm linh bảy" viết là:',
        options: ['4007', '470', '407', '417'], ans: 2 },
      // Các số gần giống nhau (356, 305, 350, 536) để bé phải nhìn từng hàng.
      { type: 'match', bai: 1, point: 2, level: 1,
        prompt: 'Nối mỗi số với tổng thích hợp:',
        left: ['356', '305', '350', '536'],
        right: ['300 + 50', '300 + 5', '500 + 30 + 6', '300 + 50 + 6'],
        ans: [3, 1, 0, 2] },
      // Nhiễu: cộng thay vì trừ (925), trừ quên trả 1 ở hàng chục (445), trừ sai hàng trăm (335).
      { type: 'mc', bai: 3, point: 1, level: 1,
        prompt: 'Số thích hợp điền vào ô trống: □ + 245 = 680',
        options: ['925', '435', '445', '335'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 1, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['465 + 278', '307 + 586', '734 − 258', '602 − 147'] },
      {
        type: 'word', bai: 2, point: 4, level: 3,
        text: 'Một cửa hàng buổi sáng bán được 425 kg gạo, buổi chiều bán được ít hơn buổi sáng 138 kg gạo. Hỏi buổi chiều cửa hàng bán được bao nhiêu ki-lô-gam gạo?',
        given: ['Buổi sáng bán được 425 kg gạo.', 'Buổi chiều bán ít hơn buổi sáng 138 kg.'],
        ask: 'Buổi chiều bán được bao nhiêu ki-lô-gam gạo?',
        hint: '"Ít hơn" thì làm phép trừ.',
        sentence: ['Buổi chiều', 'cửa hàng bán được', 'số ki-lô-gam gạo', 'là:'],
        decoys: ['cả hai buổi'],
        expr: { a: 425, op: '−', b: 138, result: 287, unit: 'kg' },
        units: ['kg', 'l', 'bao'],
      },
    ] },
  ],
};
