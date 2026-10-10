/** Kiểm tra nhanh 1: Bài 1–3 Vở BT Toán 2 (số đến 100, tia số, thành phần phép cộng, phép trừ). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { numberLine } from './art.js';

export default {
  id: 'l2-nh-01',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 1',
  short: 'Nhanh 1',
  after: { book: 'workbook2', units: '1-3' },
  desc: 'Số đến 100, tia số, số liền trước, số liền sau; tên thành phần phép cộng, phép trừ',
  time: 15,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: viết ngược chục và đơn vị (36), viết rời "6 chục" thành 60 rồi ghép 3 (603), cộng 6 + 3 (9).
      { type: 'mc', bai: 1, point: 0, level: 1,
        prompt: 'Số gồm 6 chục và 3 đơn vị là:',
        options: ['36', '63', '603', '9'], ans: 1 },
      // Nhiễu: số liền trước (58), thêm 1 chục (69), quên nhớ sang hàng chục (50).
      { type: 'mc', bai: 2, point: 1, level: 1,
        prompt: 'Số liền sau của 59 là:',
        options: ['58', '60', '69', '50'], ans: 1 },
      // Ý sai: đổi tên số trừ với hiệu.
      { type: 'tf', bai: 3, point: 1, level: 1,
        prompt: 'Cho phép trừ 58 − 3 = 55. Đúng ghi Đ, sai ghi S:',
        items: ['58 là số bị trừ.', '3 là hiệu.', '55 là hiệu.', '55 là số trừ.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'fill', bai: 2, point: 0, level: 2,
        prompt: 'Viết số thích hợp vào ô trống trên tia số (theo thứ tự từ trái sang phải):',
        fig: numberLine({ from: 40, n: 11, labels: { 2: null, 5: null, 9: null } }),
        items: [{ t: '…, …, …', ans: [42, 45, 49] }] },
      { type: 'fill', bai: [1, 3], point: 2, level: 3,
        prompt: 'Số bị trừ là số lớn nhất có hai chữ số, số trừ là 5. Viết phép trừ rồi tìm hiệu:',
        items: [{ t: '… − … = …', ans: [99, 5, 94] }] },
    ] },
  ],
};
