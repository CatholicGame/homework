/** Kiểm tra nhanh 1: Bài 1–5 Vở BT Toán 1 (chưa học số: chỉ hình, chọn, nối). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { pairRows, shape } from './art.js';

export default {
  id: 'l1-nh-01',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 1',
  short: 'Nhanh 1',
  after: { book: 'workbook1', units: '1-5' },
  desc: 'Nhiều hơn, ít hơn; hình vuông, hình tròn, hình tam giác',
  time: 15,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      { type: 'mc', bai: 3, point: 0, level: 1,
        prompt: 'Hình nào là hình vuông?',
        options: [shape('triangle'), shape('circle'), shape('square')], ans: 2 },
      { type: 'mc', bai: 2, point: 1, level: 1,
        prompt: 'Nối mỗi cái cốc với một cái thìa. Bên nào nhiều hơn?', fig: pairRows('cup', 3, 'spoon', 5),
        say: 'Nối mỗi cái cốc với một cái thìa. Cốc nhiều hơn, thìa nhiều hơn, hay bằng nhau?',
        options: ['Cốc nhiều hơn', 'Thìa nhiều hơn', 'Bằng nhau'], ans: 1 },
      { type: 'tf', bai: [3, 4], point: 0, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        say: 'Đúng ghi Đ, sai ghi S. Hình vuông có 4 cạnh bằng nhau. Hình tam giác có 4 cạnh. Xếp 3 que tính được hình tam giác. Hình tròn có 3 góc.',
        items: ['Hình vuông có 4 cạnh bằng nhau.', 'Hình tam giác có 4 cạnh.', 'Xếp 3 que tính được hình tam giác.', 'Hình tròn có 3 góc.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'match', bai: [3, 4], point: 0, level: 1,
        prompt: 'Nối hình với tên của hình:',
        say: 'Nối mỗi hình với tên của hình đó.',
        left: [shape('circle', 52), shape('triangle', 52), shape('square', 52)],
        right: ['Hình vuông', 'Hình tròn', 'Hình tam giác'], ans: [1, 2, 0] },
      // Bẫy: hàng thỏ giãn dài bằng hàng cà rốt. Bé phải nối từng cặp, không nhìn hàng nào dài hơn.
      { type: 'mc', bai: 2, point: 2, level: 3,
        prompt: 'Nối mỗi củ cà rốt với một con thỏ. Bên nào ít hơn?', fig: pairRows('carrot', 5, 'rabbit', 4, { spread: true }),
        say: 'Nối mỗi củ cà rốt với một con thỏ. Cà rốt ít hơn, thỏ ít hơn, hay bằng nhau?',
        options: ['Cà rốt ít hơn', 'Thỏ ít hơn', 'Bằng nhau'], ans: 1 },
    ] },
  ],
};
