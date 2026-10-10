/** Kiểm tra cuối học kì I (Đề 5): Bài 1–34 Vở BT Toán 1 (Nhanh 1 đến 7). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { things, pairRows } from './art.js';

export default {
  id: 'l1-ck-1e',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 5)',
  short: 'Cuối kì I · Đề 5',
  after: { book: 'workbook1', units: '1-34' },
  desc: 'Nhiều hơn, ít hơn; đếm ngược; số 8, số 9; dấu >; số gồm mấy và mấy; phép cộng trong phạm vi 5, phép trừ trong phạm vi 3',
  time: 35,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Đáp án nhiễu: 7 và 9 (đếm sót, đếm lặp), 6.
      { type: 'mc', bai: 18, point: 1, level: 1,
        prompt: 'Có mấy cái cốc?', fig: things('cup', 8, { cols: 4 }),
        options: ['6', '7', '8', '9'], ans: 2 },
      // Bẫy: hàng hoa giãn dài bằng hàng chim. Bé phải nối từng cặp, không nhìn hàng nào dài hơn.
      { type: 'mc', bai: 2, point: 2, level: 2,
        prompt: 'Nối mỗi con chim với một bông hoa. Bên nào ít hơn?', fig: pairRows('bird', 5, 'flower', 4, { spread: true }),
        say: 'Nối mỗi con chim với một bông hoa. Chim ít hơn, hoa ít hơn, hay bằng nhau?',
        options: ['Chim ít hơn', 'Hoa ít hơn', 'Bằng nhau'], ans: 1 },
      // Đáp án nhiễu: 4 (đếm xuôi), 3 (lặp lại số đầu), 0.
      { type: 'mc', bai: 6, point: 2, level: 1,
        prompt: 'Đếm ngược: 3, 2, …. Số tiếp theo là:',
        say: 'Đếm ngược: 3, 2, mấy. Số tiếp theo là số mấy?',
        options: ['4', '1', '0', '3'], ans: 1 },
      // Đáp án nhiễu: 7 (bằng 7, không lớn hơn), 5 và 6 (bé hơn 7).
      { type: 'mc', bai: 11, point: 1, level: 1,
        prompt: 'Số nào lớn hơn 7?',
        options: ['5', '7', '9', '6'], ans: 2 },
      { type: 'tf', bai: [25, 27, 29, 31], point: 1, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        say: 'Đúng ghi Đ, sai ghi S. 1 cộng 1 bằng 2. 3 cộng 2 bằng 4. 0 cộng 4 bằng 4. 2 cộng 2 bằng 5.',
        items: ['1 + 1 = 2', '3 + 2 = 4', '0 + 4 = 4', '2 + 2 = 5'], ans: ['Đ', 'S', 'Đ', 'S'] },
      { type: 'pick', bai: 19, point: 1, level: 1,
        prompt: 'Khoanh vào 9 ngôi sao.', icon: 'star', count: 10, cols: 5, ans: 9 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [25, 29, 31, 34], point: 1, level: 1,
        prompt: 'Tính:',
        items: ['2 + 1', '1 + 4', '3 + 0', '2 + 3', '3 − 2', '3 − 1'] },
      { type: 'fill', bai: [16, 17, 18], point: 2, level: 2,
        prompt: 'Số?',
        say: 'Điền số. 6 gồm 3 và mấy. 8 gồm 6 và mấy. 7 gồm mấy và 2.',
        items: [{ t: '6 gồm 3 và …', ans: 3 }, { t: '8 gồm 6 và …', ans: 2 }, { t: '7 gồm … và 2', ans: 5 }] },
      { type: 'fill', bai: 34, point: 0, level: 3,
        prompt: 'Viết phép tính thích hợp:', fig: things('apple', 2, { gone: 1 }),
        say: 'Có 2 quả táo, bé ăn 1 quả. Viết phép tính thích hợp.',
        items: [{ t: '2 □ 1 = …', ans: ['−', 1], choices: ['+', '−'] }] },
      { type: 'fill', bai: [25, 34], point: 2, level: 3,
        prompt: 'Điền dấu + hoặc −:',
        say: 'Điền dấu cộng hoặc dấu trừ. 2 mấy 1 bằng 3. 3 mấy 1 bằng 2. 3 mấy 2 bằng 1. 1 mấy 2 bằng 3.',
        items: [
          { t: '2 □ 1 = 3', ans: ['+'], choices: ['+', '−'] },
          { t: '3 □ 1 = 2', ans: ['−'], choices: ['+', '−'] },
          { t: '3 □ 2 = 1', ans: ['−'], choices: ['+', '−'] },
          { t: '1 □ 2 = 3', ans: ['+'], choices: ['+', '−'] },
        ] },
    ] },
  ],
};
