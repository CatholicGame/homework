/** Kiểm tra tổng hợp 3 (Đề 1): Bài 19–28 Vở BT Toán 1 (Nhanh 5 + Nhanh 6, ôn Bài 1–18). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { things, groups, shape } from './art.js';

export default {
  id: 'l1-th-03',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 3 (Đề 1)',
  short: 'Tổng hợp 3 · Đề 1',
  after: { book: 'workbook1', units: '19-28' },
  desc: 'Các số 9, 0, 10; phép cộng trong phạm vi 3, 4; ôn dấu <, >, = và hình vuông',
  time: 30,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      { type: 'mc', bai: 19, point: 1, level: 1,
        prompt: 'Có mấy con cá?', fig: things('fish', 9, { cols: 5 }),
        options: ['8', '9', '10', '7'], ans: 1 },
      // Đáp án nhiễu: 2 (chỉ đếm nhóm thêm vào), 1 (chỉ đếm nhóm đầu), 4 (đếm lặp).
      { type: 'mc', bai: 25, point: 0, level: 1,
        prompt: 'Có 1 quả bóng, thêm 2 quả bóng. Có tất cả mấy quả bóng?', fig: groups('ball', 1, 2),
        options: ['2', '3', '1', '4'], ans: 1 },
      { type: 'tf', bai: [10, 11, 13], point: 2, level: 1, review: true,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        say: 'Đúng ghi Đ, sai ghi S. 6 bé hơn 8. 7 lớn hơn 7. 5 bằng 5. 2 lớn hơn 4.',
        items: ['6 < 8', '7 > 7', '5 = 5', '2 > 4'], ans: ['Đ', 'S', 'Đ', 'S'] },
      { type: 'mc', bai: 3, point: 0, level: 1, review: true,
        prompt: 'Hình nào có 4 cạnh bằng nhau?',
        options: [shape('triangle'), shape('square'), shape('circle')], ans: 1 },
      // Đáp án nhiễu: 2 và 4 (nhầm cặp 8 và 2, 6 và 4), 7 (chép lại số đã cho).
      { type: 'mc', bai: 21, point: 2, level: 2,
        prompt: '10 gồm 7 và mấy?',
        options: ['2', '3', '4', '7'], ans: 1 },
      // Đáp án nhiễu: 1 (chép số ở vế trái), 4 (viết kết quả), 2.
      { type: 'mc', bai: 27, point: 1, level: 2,
        prompt: '3 + 1 = 1 + …',
        say: '3 cộng 1 bằng 1 cộng mấy?',
        options: ['3', '1', '4', '2'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [25, 27], point: 1, level: 1,
        prompt: 'Tính:',
        items: ['1 + 1', '2 + 1', '1 + 3', '2 + 2', '1 + 2', '3 + 1'] },
      { type: 'compare', bai: [19, 20, 21, 27], point: 1, level: 2,
        prompt: 'Điền dấu >, <, =:',
        say: 'Điền dấu lớn hơn, bé hơn, hoặc bằng.',
        items: ['9 □ 10', '4 □ 0', '10 □ 10', '2 + 2 □ 3'] },
      { type: 'fill', bai: 27, point: 0, level: 3,
        prompt: 'Viết phép tính thích hợp:', fig: groups('frog', 2, 2, { label: 'nhảy tới' }),
        say: 'Có 2 con ếch, 2 con ếch nhảy tới. Viết phép tính thích hợp.',
        items: [{ t: '… + … = …', ans: [2, 2, 4] }] },
      { type: 'fill', bai: [25, 27], point: 1, level: 3,
        prompt: 'Số?',
        say: 'Điền số còn thiếu vào ô trống.',
        items: ['□ + 1 = 3', '1 + □ = 4', '□ + 2 = 4', '3 + □ = 4'] },
    ] },
  ],
};
