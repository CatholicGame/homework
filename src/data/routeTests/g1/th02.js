/** Kiểm tra tổng hợp 2 (Đề 1): Bài 10–18 Vở BT Toán 1 (Nhanh 3 + Nhanh 4, ôn Bài 1–9). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { things, pairRows, groups, shape, shapes } from './art.js';

export default {
  id: 'l1-th-02',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 2 (Đề 1)',
  short: 'Tổng hợp 2 · Đề 1',
  after: { book: 'workbook1', units: '10-18' },
  desc: 'Bé hơn, lớn hơn, bằng nhau; dấu <, >, =; các số 6, 7, 8; ôn hình phẳng',
  time: 30,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      { type: 'mc', bai: 16, point: 1, level: 1,
        prompt: 'Có mấy con cá?', fig: things('fish', 6, { cols: 3 }),
        options: ['5', '6', '7', '8'], ans: 1 },
      // Đáp án nhiễu: dấu ngược (3 > 5), đổi chỗ hai số (5 < 3), dấu bằng.
      { type: 'mc', bai: 10, point: 1, level: 1,
        prompt: '3 bé hơn 5. Chọn cách viết đúng:',
        say: '3 bé hơn 5. Chọn cách viết đúng.',
        options: ['3 > 5', '3 < 5', '5 < 3', '3 = 5'], ans: 1 },
      // Hai ý sai là lỗi hay gặp: nghĩ 7 gồm hai số bằng nhau (4 và 4, 3 và 3).
      { type: 'tf', bai: 17, point: 2, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['7 gồm 5 và 2.', '7 gồm 4 và 4.', '7 gồm 6 và 1.', '7 gồm 3 và 3.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      { type: 'mc', bai: 4, point: 0, level: 1, review: true,
        prompt: 'Hình nào có 3 cạnh?',
        options: [shape('square'), shape('circle'), shape('triangle')], ans: 2 },
      // Bẫy: hàng hoa giãn dài bằng hàng ếch. Đáp án nhiễu: đổi chỗ hai số, dấu ngược, "dài bằng nhau nên bằng nhau".
      { type: 'mc', bai: 11, point: 0, level: 2,
        prompt: 'Nối mỗi con ếch với một bông hoa. Chọn cách viết đúng:', fig: pairRows('frog', 6, 'flower', 4, { spread: true }),
        say: 'Nối mỗi con ếch với một bông hoa. Đếm số ếch, số hoa, rồi chọn cách viết đúng.',
        options: ['6 > 4', '4 > 6', '6 < 4', '6 = 4'], ans: 0 },
      // Đáp án nhiễu: 7 (quên thêm 1), 6 (đếm lùi).
      { type: 'mc', bai: 18, point: 0, level: 1,
        prompt: 'Có 7 quả bóng, thêm 1 quả bóng. Có tất cả mấy quả bóng?', fig: groups('ball', 7, 1),
        say: 'Có 7 quả bóng, thêm 1 quả bóng. Có tất cả mấy quả bóng?',
        options: ['6', '8', '7'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'compare', bai: [10, 11, 13], point: 1, level: 1,
        prompt: 'Điền dấu >, <, =:',
        say: 'Điền dấu lớn hơn, bé hơn, hoặc bằng.',
        items: ['4 □ 7', '6 □ 2', '5 □ 5', '8 □ 7'] },
      { type: 'fill', bai: [3, 4], point: 0, level: 2, review: true,
        prompt: 'Đếm rồi viết số:', fig: shapes(['triangle', 'square', 'triangle', 'circle', 'square', 'triangle', 'circle']),
        say: 'Đếm số hình tam giác, số hình vuông. Viết số vào chỗ chấm.',
        items: [{ t: '… hình tam giác', ans: 3 }, { t: '… hình vuông', ans: 2 }] },
      { type: 'fill', bai: [16, 17, 18], point: 1, level: 3,
        prompt: 'Viết các số 7, 5, 8, 6 theo thứ tự từ bé đến lớn:',
        say: 'Viết các số 7, 5, 8, 6 theo thứ tự từ bé đến lớn.',
        items: [{ t: '…, …, …, …', ans: [5, 6, 7, 8] }] },
      // Bẫy: táo của Mai xếp một hàng dài, táo của Hà xếp gọn hai hàng. Bé phải đếm, không nhìn hàng dài.
      { type: 'fill', bai: [11, 17, 18], point: 0, level: 3,
        prompt: 'Đếm táo của mỗi bạn. Bạn nào có nhiều táo hơn?',
        say: 'Đếm số táo của Mai, số táo của Hà. Bạn nào có nhiều táo hơn?',
        items: [
          { t: 'Mai có … quả táo.', fig: things('apple', 7, { cols: 7 }), ans: 7 },
          { t: 'Hà có … quả táo.', fig: things('apple', 8, { cols: 4 }), ans: 8 },
          { t: 'Bạn … có nhiều táo hơn.', ans: ['Hà'], choices: ['Mai', 'Hà'] },
        ] },
    ] },
  ],
};
