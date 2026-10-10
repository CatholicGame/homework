/** Kiểm tra giữa học kì I, Đề 3: Bài 1–24 Vở BT Toán 1 (Nhanh 1 đến 5). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { things, mixed, shapes, track } from './art.js';

export default {
  id: 'l1-gk-1c',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 3)',
  short: 'Giữa kì I · Đề 3',
  after: { book: 'workbook1', units: '1-24' },
  desc: 'Đếm hình tam giác; các số từ 1 đến 10, số 0; dấu <, >; số gồm mấy và mấy; đếm thêm trên dãy số',
  time: 35,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      { type: 'mc', bai: 16, point: 1, level: 1,
        prompt: 'Có mấy con gà con?', fig: things('chick', 6, { cols: 3 }),
        options: ['5', '6', '7', '8'], ans: 1 },
      // Đáp án nhiễu: 2 (bỏ sót một hình), 4 (đếm lẫn một hình vuông), 6 (đếm tất cả các hình).
      { type: 'mc', bai: 4, point: 0, level: 2,
        prompt: 'Có mấy hình tam giác?', fig: shapes(['triangle', 'square', 'triangle', 'circle', 'triangle', 'square']),
        options: ['2', '3', '4', '6'], ans: 1 },
      { type: 'match', bai: [16, 17, 18], point: 1, level: 1,
        prompt: 'Đếm rồi nối với số:',
        say: 'Đếm đồ vật trong mỗi hình, rồi nối với số đúng.',
        left: [things('ball', 7, { cols: 4 }), things('cup', 6, { cols: 3 }), things('carrot', 8, { cols: 4 })],
        right: ['6', '8', '7'], ans: [2, 0, 1] },
      // Đáp án nhiễu: > (nhầm hướng dấu), =.
      { type: 'mc', bai: 10, point: 2, level: 1,
        prompt: 'Chọn dấu đúng: 4 … 7',
        say: 'Chọn dấu đúng: 4 mấy 7. Bé hơn, lớn hơn, hay bằng?',
        options: ['<', '>', '='], ans: 0 },
      // Đáp án nhiễu: 13 (lấy 3 cộng 10), 6 và 8 (nhớ lệch một cặp).
      { type: 'mc', bai: 21, point: 2, level: 2,
        prompt: '10 gồm 3 và mấy?',
        options: ['6', '7', '8', '13'], ans: 1 },
      // Ý sai: 10 < 9 (tưởng 10 bé vì có chữ số 0), số 0 đọc là "mười".
      { type: 'tf', bai: [20, 21], point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        say: 'Đúng ghi Đ, sai ghi S. 0 bé hơn 1. 10 bé hơn 9. Số 10 có hai chữ số: 1 và 0. Số 0 đọc là mười.',
        items: ['0 < 1', '10 < 9', 'Số 10 có hai chữ số: 1 và 0.', 'Số 0 đọc là "mười".'], ans: ['Đ', 'S', 'Đ', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Hai loại xen kẽ: bé phải đếm riêng từng loại.
      { type: 'fill', bai: [6, 8], point: 0, level: 1,
        prompt: 'Có mấy con ếch, mấy con chim?', fig: mixed(['frog', 'bird', 'frog', 'frog', 'bird']),
        say: 'Đếm số con ếch, rồi đếm số con chim. Viết số vào chỗ chấm.',
        items: [{ t: '… con ếch', ans: 3 }, { t: '… con chim', ans: 2 }] },
      { type: 'fill', bai: [17, 18], point: 2, level: 2,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        say: '8 gồm 6 và mấy. 8 gồm mấy và 4. 7 gồm 5 và mấy.',
        items: [{ t: '8 gồm 6 và …', ans: 2 }, { t: '8 gồm … và 4', ans: 4 }, { t: '7 gồm 5 và …', ans: 2 }] },
      { type: 'fill', bai: 19, point: 1, level: 3,
        prompt: 'Ếch đứng ở số 6. Ếch nhảy tiếp 3 ô. Ếch tới số mấy?', fig: track(3, 10, 6, 'frog'),
        items: [{ t: 'Ếch tới số …', ans: 9 }] },
      { type: 'fill', bai: [10, 11], point: 1, level: 3,
        prompt: 'Mai có 5 quả bóng. Nam có 8 quả bóng. Bạn nào có ít bóng hơn?',
        say: 'Mai có 5 quả bóng. Nam có 8 quả bóng. Chọn dấu, rồi chọn bạn có ít bóng hơn.',
        items: [
          { t: '5 □ 8', ans: ['<'], choices: ['>', '<', '='] },
          { t: 'Bạn … có ít bóng hơn.', ans: ['Mai'], choices: ['Mai', 'Nam'] },
        ] },
    ] },
  ],
};
