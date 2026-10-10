/** Kiểm tra nhanh 10: Bài 36–37 Vở BT Toán 3 (nhân, chia số có ba chữ số với, cho số có một chữ số). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l3-nh-10',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 10',
  short: 'Nhanh 10',
  after: { book: 'workbook', units: '36-37' },
  desc: 'Nhân số có ba chữ số với số có một chữ số; chia số có ba chữ số cho số có một chữ số',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: quên nhớ sang hàng chục (365), viết cả 15 không nhớ (3615), cộng thay nhân (128).
      { type: 'mc', bai: 36, point: 2, level: 1,
        prompt: '125 × 3 = ?',
        options: ['365', '375', '3615', '128'], ans: 1 },
      // Nhiễu: thiếu chữ số 0 (20), thừa chữ số 0 (2000), nhầm sang 600 : 2 (300).
      { type: 'mc', bai: 37, point: 3, level: 1,
        prompt: 'Tính nhẩm: 600 : 3 = ?',
        options: ['20', '200', '2000', '300'], ans: 1 },
      // Ý sai: quên viết 0 vào thương khi số đem chia bé hơn số chia (816 : 4 = 24, 412 : 2 = 26).
      { type: 'tf', bai: 37, point: 2, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['636 : 3 = 212', '816 : 4 = 24', '545 : 5 = 109', '412 : 2 = 26'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [36, 37], point: 0, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['214 × 4', '108 × 6', '846 : 3', '275 : 5'] },
      {
        type: 'word', bai: 37, point: 1, level: 3,
        text: 'Cửa hàng có 168 kg gạo, chia đều vào 4 bao. Hỏi mỗi bao có bao nhiêu ki-lô-gam gạo?',
        given: ['Có 168 kg gạo.', 'Chia đều vào 4 bao.'],
        ask: 'Mỗi bao có bao nhiêu ki-lô-gam gạo?',
        hint: 'Chia đều vào 4 bao thì lấy số gạo chia cho 4.',
        sentence: ['Mỗi bao', 'có số', 'ki-lô-gam gạo', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 168, op: ':', b: 4, result: 42, unit: 'kg' },
        units: ['kg', 'bao', 'g'],
      },
    ] },
  ],
};
