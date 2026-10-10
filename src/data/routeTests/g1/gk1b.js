/** Kiểm tra giữa học kì I, Đề 2: Bài 1–24 Vở BT Toán 1 (Nhanh 1 đến 5). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { things, shape, pairRows } from './art.js';

export default {
  id: 'l1-gk-1b',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 2)',
  short: 'Giữa kì I · Đề 2',
  after: { book: 'workbook1', units: '1-24' },
  desc: 'Hình tam giác; đếm các số từ 0 đến 10; dấu <, >, =; số gồm mấy và mấy; xếp thứ tự các số',
  time: 35,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      { type: 'mc', bai: 8, point: 0, level: 1,
        prompt: 'Có mấy con ếch?', fig: things('frog', 5),
        options: ['4', '5', '6', '3'], ans: 1 },
      { type: 'mc', bai: 4, point: 0, level: 1,
        prompt: 'Hình nào là hình tam giác?',
        options: [shape('circle'), shape('square'), shape('triangle')], ans: 2 },
      // Ý sai: 8 > 9 (đọc ngược dấu), 3 > 7 (nhầm hướng dấu).
      { type: 'tf', bai: [10, 11, 13], point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        say: 'Đúng ghi Đ, sai ghi S. 4 bé hơn 6. 8 lớn hơn 9. 5 bằng 5. 3 lớn hơn 7.',
        items: ['4 < 6', '8 > 9', '5 = 5', '3 > 7'], ans: ['Đ', 'S', 'Đ', 'S'] },
      { type: 'pick', bai: 17, point: 1, level: 1,
        prompt: 'Khoanh vào 7 bông hoa.', icon: 'flower', count: 9, cols: 5, ans: 7 },
      // Đáp án nhiễu: 1 (nhớ nhầm "6 gồm 5 và 1"), 3 (nhầm "3 và 3"), 10 (lấy 6 cộng 4).
      { type: 'mc', bai: 16, point: 2, level: 2,
        prompt: '6 gồm 4 và mấy?',
        options: ['1', '2', '3', '10'], ans: 1 },
      // Đáp án nhiễu: 9 (tưởng 10 bé vì có chữ số 0), 8 (số đứng đầu), 2.
      { type: 'mc', bai: 21, point: 3, level: 2,
        prompt: 'Số lớn nhất trong các số 8, 2, 10, 9 là:',
        say: 'Số lớn nhất trong các số 8, 2, 10, 9 là số nào?',
        options: ['8', '2', '10', '9'], ans: 2 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'fill', bai: [19, 21], point: 1, level: 1,
        prompt: 'Đếm rồi viết số:',
        items: [
          { t: '… quả táo', fig: things('apple', 9, { cols: 5 }), ans: 9 },
          { t: '… ngôi sao', fig: things('star', 10, { cols: 5 }), ans: 10 },
        ] },
      { type: 'fill', bai: [8, 20], point: 2, level: 2,
        prompt: 'Viết số còn thiếu:',
        say: 'Viết số còn thiếu. 0, 1, mấy, 3, mấy. 5, 4, mấy, 2, mấy, 0.',
        items: [{ t: '0, 1, …, 3, …', ans: [2, 4] }, { t: '5, 4, …, 2, …, 0', ans: [3, 1] }] },
      // Bẫy: hàng thìa giãn dài bằng hàng cốc. Bé phải đếm hoặc nối từng cặp, không nhìn hàng nào dài hơn.
      { type: 'fill', bai: [10, 11], point: 0, level: 3,
        prompt: 'Đếm rồi điền số và dấu >, <, =:', fig: pairRows('cup', 6, 'spoon', 4, { spread: true }),
        say: 'Đếm số cái cốc, đếm số cái thìa. Viết số, rồi chọn dấu lớn hơn, bé hơn hay bằng.',
        items: [{ t: '… cái cốc □ … cái thìa', ans: [6, '>', 4], choices: ['>', '<', '='] }] },
      { type: 'fill', bai: 20, point: 2, level: 3,
        prompt: 'Xếp các số 6, 0, 9, 4 theo thứ tự từ bé đến lớn:',
        say: 'Xếp các số 6, 0, 9, 4 theo thứ tự từ bé đến lớn.',
        items: [{ t: '…, …, …, …', ans: [0, 4, 6, 9] }] },
    ] },
  ],
};
