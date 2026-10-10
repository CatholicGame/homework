/** Kiểm tra tổng hợp 2 (Đề 2): Bài 7–14 Vở BT Toán 2 (Nhanh 3 + Nhanh 4, ôn Bài 1–6). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l2-th-02b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 2 (Đề 2)',
  short: 'Tổng hợp 2 · Đề 2',
  after: { book: 'workbook2', units: '7-14' },
  desc: 'Cộng, trừ qua 10 trong phạm vi 20; bảng cộng, bảng trừ; bài toán thêm, ít hơn; ôn số liền sau, đặt tính cộng, trừ không nhớ',
  time: 35,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Đổi chỗ các số hạng. Nhiễu: chép số 8 ở vế trái, viết tổng (14), lấy 8 − 6 (2).
      { type: 'mc', bai: 7, point: 3, level: 1,
        prompt: '6 + 8 = 8 + …',
        options: ['6', '8', '14', '2'], ans: 0 },
      // Ý sai: lệch một (7 + 7 = 15, 5 + 9 = 13).
      { type: 'tf', bai: 8, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['9 + 2 = 11', '7 + 7 = 15', '8 + 6 = 14', '5 + 9 = 13'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: cộng (18), lệch một (7), lấy 5 − 3 ở hàng đơn vị (2).
      { type: 'mc', bai: 11, point: 1, level: 1,
        prompt: '13 − 5 = ?',
        options: ['8', '18', '7', '2'], ans: 0 },
      // Nhiễu: số liền trước (18), thêm 1 chục (29), viết 1 rồi viết 10 (110).
      { type: 'mc', bai: 2, point: 1, level: 1, review: true,
        prompt: 'Số liền sau của 19 là:',
        options: ['20', '18', '29', '110'], ans: 0 },
      { type: 'match', bai: 12, point: 1, level: 2,
        prompt: 'Nối mỗi phép trừ với phép cộng giúp em tính nhẩm phép trừ đó:',
        heads: ['Phép trừ', 'Phép cộng'],
        left: ['12 − 3', '15 − 7', '11 − 5', '14 − 9'],
        right: ['9 + 5 = 14', '6 + 5 = 11', '8 + 7 = 15', '9 + 3 = 12'],
        ans: [3, 2, 1, 0] },
      // Nhiễu: thấy "ít hơn" mà cộng (21), chép số ít hơn (6), trừ sai lệch một (8).
      { type: 'mc', bai: 13, point: 1, level: 2,
        prompt: 'Thùng thứ nhất có 15 quả bưởi. Thùng thứ hai ít hơn thùng thứ nhất 6 quả. Thùng thứ hai có mấy quả bưởi?',
        options: ['9', '21', '6', '8'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'compare', bai: [8, 12], point: 2, level: 2,
        prompt: 'Điền dấu >, <, = thích hợp:',
        items: ['8 + 5 □ 12', '9 + 7 □ 16', '14 − 6 □ 9', '17 − 9 □ 7'] },
      { type: 'calc', bai: 5, point: 1, level: 1, review: true,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['35 + 42', '78 − 53', '60 + 9', '96 − 6'] },
      {
        type: 'word', bai: 9, point: 0, level: 3,
        text: 'Bể cá nhà Nam có 8 con cá vàng. Bố mua thêm 6 con cá vàng thả vào bể. Hỏi trong bể có tất cả bao nhiêu con cá vàng?',
        given: ['Bể có 8 con cá vàng.', 'Bố thả thêm 6 con cá vàng.'],
        ask: 'Trong bể có tất cả bao nhiêu con cá vàng?',
        hint: 'Thêm vào thì nhiều lên: lấy số cá lúc đầu cộng số cá thả thêm.',
        sentence: ['Trong bể', 'có tất cả', 'số con cá vàng', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 8, op: '+', b: 6, result: 14, unit: 'con cá vàng' },
        units: ['con cá vàng', 'cái bể', 'con chim'],
      },
      { type: 'chain', bai: [7, 11], point: 0, level: 3,
        prompt: 'Số?',
        items: [{ start: 7, steps: ['+ 6', '− 5', '+ 9', '− 8'] }] },
    ] },
  ],
};
