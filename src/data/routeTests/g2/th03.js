/** Kiểm tra tổng hợp 3 (Đề 1): Bài 15–24 Vở BT Toán 2 (Nhanh 5 + Nhanh 6, ôn Bài 1–14). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { balance, pourCups } from './art.js';

export default {
  id: 'l2-th-03',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 3 (Đề 1)',
  short: 'Tổng hợp 3 · Đề 1',
  after: { book: 'workbook2', units: '15-24' },
  desc: 'Ki-lô-gam, lít; cộng, trừ có nhớ trong phạm vi 100; ôn bảng cộng, bảng trừ qua 10',
  time: 35,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Đĩa trái thấp hơn. Nhiễu: nghĩ đĩa cao hơn là nặng hơn (quả lê), nghĩ hai quả bằng nhau.
      { type: 'mc', bai: 15, point: 0, level: 1,
        prompt: 'Nhìn cân đĩa. Quả nào nặng hơn?', fig: balance(['tao'], ['le'], { tilt: 'left' }),
        options: ['Quả táo', 'Quả lê', 'Hai quả nặng bằng nhau'], ans: 0 },
      // Nhiễu: chỉ nhìn một ca (1 l), đếm cả cái can (5 l), viết sai đơn vị (4 kg).
      { type: 'mc', bai: 16, point: 1, level: 2,
        prompt: 'Rót hết nước trong can sang các ca 1 l thì được đầy 4 ca. Can có bao nhiêu lít nước?',
        fig: pourCups({ kind: 'can', l: 4, label: false }, 4),
        options: ['4 l', '1 l', '5 l', '4 kg'], ans: 0 },
      // Ôn bảng trừ (cần cho trừ có nhớ). Ý sai: lệch một (13 − 8 = 6, 12 − 7 = 4).
      { type: 'tf', bai: 12, point: 0, level: 1, review: true,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['11 − 4 = 7', '13 − 8 = 6', '16 − 9 = 7', '12 − 7 = 4'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: quên nhớ (33), viết cả 13 xuống (313), cộng 6 vào hàng chục (97).
      { type: 'mc', bai: 19, point: 2, level: 1,
        prompt: 'Kết quả của phép tính 37 + 6 là:',
        options: ['43', '33', '313', '97'], ans: 0 },
      // Nhiễu: lấy 8 − 5 ở hàng đơn vị (43), quên trả 1 ở hàng chục (47), cộng thay vì trừ (53).
      { type: 'mc', bai: 22, point: 1, level: 2,
        prompt: 'Kết quả của phép tính 45 − 8 là:',
        options: ['37', '43', '47', '53'], ans: 0 },
      // Ôn bảng cộng (cần cho cộng có nhớ).
      { type: 'match', bai: 8, point: 0, level: 1, review: true,
        prompt: 'Nối mỗi phép tính với kết quả đúng:',
        left: ['8 + 7', '9 + 5', '6 + 6', '7 + 9'],
        right: ['14', '16', '12', '15'],
        ans: [3, 0, 2, 1] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [20, 23], point: 0, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['36 + 47', '58 + 29', '72 − 38', '90 − 46'] },
      { type: 'calc', bai: [15, 16], point: 3, level: 2,
        prompt: 'Tính:',
        items: [
          { t: '25 kg + 18 kg', ans: 43, unit: 'kg' },
          { t: '40 l − 15 l', ans: 25, unit: 'l' },
          { t: '9 kg + 6 kg', ans: 15, unit: 'kg' },
          { t: '16 l − 9 l', ans: 7, unit: 'l' },
        ] },
      {
        type: 'word', bai: [16, 23], point: 2, level: 3,
        text: 'Một cửa hàng có 52 l nước mắm, đã bán đi 27 l. Hỏi cửa hàng còn lại bao nhiêu lít nước mắm?',
        given: ['Cửa hàng có 52 l nước mắm.', 'Đã bán đi 27 l.'],
        ask: 'Cửa hàng còn lại bao nhiêu lít nước mắm?',
        hint: 'Bán đi thì bớt đi: lấy số lít lúc đầu trừ số lít đã bán.',
        sentence: ['Cửa hàng', 'còn lại', 'số lít nước mắm', 'là:'],
        decoys: ['đã bán'],
        expr: { a: 52, op: '−', b: 27, result: 25, unit: 'l' },
        units: ['l', 'kg', 'cửa hàng'],
      },
      // Cân thăng bằng: hộp quà nặng 5 + 2 + 1 = 8 kg. Bỏ quả cân 1 kg thì đĩa phải nhẹ đi, đĩa trái thấp xuống.
      { type: 'fill', bai: 15, point: 2, level: 3,
        prompt: 'Cân đang thăng bằng.', fig: balance([{ kind: 'hop', size: 52 }], [5, 2, 1]),
        items: [
          { t: 'Hộp quà nặng … kg.', ans: 8 },
          { t: 'Bỏ quả cân 1 kg ra khỏi đĩa phải thì đĩa … thấp hơn.', ans: ['trái'], choices: ['trái', 'phải'] },
        ] },
    ] },
  ],
};
