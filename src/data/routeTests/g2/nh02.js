/** Kiểm tra nhanh 2: Bài 4–6 Vở BT Toán 2 (hơn, kém nhau bao nhiêu; cộng, trừ không nhớ trong phạm vi 100). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { twoRows } from './art.js';

export default {
  id: 'l2-nh-02',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 2',
  short: 'Nhanh 2',
  after: { book: 'workbook2', units: '4-6' },
  desc: 'Hơn, kém nhau bao nhiêu; cộng, trừ không nhớ trong phạm vi 100',
  time: 15,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: cộng chữ số rồi quên chục (7), viết 40 + 3 (43), lấy 40 − 30 (10).
      { type: 'mc', bai: 5, point: 0, level: 1,
        prompt: 'Tính nhẩm: 40 + 30 = ?',
        options: ['7', '43', '70', '10'], ans: 2 },
      // Nhiễu: cộng hai số (13), lấy luôn một trong hai số (8, 5).
      { type: 'mc', bai: 4, point: 2, level: 1,
        prompt: 'Lan có 8 bông hoa, Huệ có 5 bông hoa. Lan có nhiều hơn Huệ mấy bông hoa?',
        fig: twoRows('Lan', 'flower', 8, 'Huệ', 'flower', 5),
        options: ['13', '3', '8', '5'], ans: 1 },
      // Ý sai: cộng 2 vào hàng chục (đặt lệch cột), trừ đúng nhưng viết lệch.
      { type: 'tf', bai: 5, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: [{ col: '43 + 25', res: '68' }, { col: '36 + 2', res: '56' }, { col: '65 − 4', res: '61' }, { col: '78 − 45', res: '43' }],
        ans: ['Đ', 'S', 'Đ', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 5, point: 1, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['52 + 34', '87 − 25', '40 + 18', '69 − 7'] },
      // Bé phải biết "kém" cũng lấy số lớn trừ số bé.
      { type: 'fill', bai: [4, 5], point: 0, level: 3,
        prompt: 'Hà có 24 nhãn vở, Mai có 36 nhãn vở.',
        items: [
          { t: 'Bạn … có nhiều nhãn vở hơn.', ans: ['Mai'], choices: ['Hà', 'Mai'] },
          { t: 'Hà kém Mai … nhãn vở.', ans: 12 },
        ] },
    ] },
  ],
};
