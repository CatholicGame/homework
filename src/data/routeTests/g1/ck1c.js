/** Kiểm tra cuối học kì I (Đề 3): Bài 1–34 Vở BT Toán 1 (Nhanh 1 đến 7). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { things, groups } from './art.js';

export default {
  id: 'l1-ck-1c',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 3)',
  short: 'Cuối kì I · Đề 3',
  after: { book: 'workbook1', units: '1-34' },
  desc: 'Số 10; hình tam giác; dấu <; dãy số đến 8; phép cộng trong phạm vi 5, số 0 trong phép cộng, phép trừ trong phạm vi 3',
  time: 35,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Đáp án nhiễu: 9 (đếm sót), 11 (đếm lặp), 8.
      { type: 'mc', bai: 21, point: 0, level: 1,
        prompt: 'Có mấy quả táo?', fig: things('apple', 10, { cols: 5 }),
        options: ['9', '10', '11', '8'], ans: 1 },
      // Đáp án nhiễu: 4 (nhầm với hình vuông), 2, 5.
      { type: 'mc', bai: 4, point: 1, level: 1,
        prompt: 'Cần mấy que tính để xếp được một hình tam giác?',
        options: ['2', '3', '4', '5'], ans: 1 },
      { type: 'match', bai: [6, 8], point: 0, level: 1,
        prompt: 'Đếm rồi nối với số:',
        say: 'Đếm mỗi nhóm đồ vật rồi nối với số đúng.',
        left: [things('cup', 3), things('flower', 5), things('frog', 1)],
        right: ['1', '3', '5'], ans: [1, 2, 0] },
      { type: 'tf', bai: [27, 29], point: 1, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        say: 'Đúng ghi Đ, sai ghi S. 2 cộng 3 bằng 3 cộng 2. 3 cộng 1 bằng 5. 2 cộng 2 bằng 4. 1 cộng 3 bằng 4 cộng 1.',
        items: ['2 + 3 = 3 + 2', '3 + 1 = 5', '2 + 2 = 4', '1 + 3 = 4 + 1'], ans: ['Đ', 'S', 'Đ', 'S'] },
      // Đáp án nhiễu: 0 (nghĩ cộng với 0 thì ra 0), 6 (cộng thêm 1), 4.
      { type: 'mc', bai: 31, point: 0, level: 1,
        prompt: '5 + 0 = …',
        say: '5 cộng 0 bằng mấy?',
        options: ['0', '5', '6', '4'], ans: 1 },
      // Đáp án nhiễu: quay mũi nhọn của dấu về số lớn (6 < 4, 4 > 6), hoặc viết dấu bằng.
      { type: 'mc', bai: 10, point: 2, level: 2,
        prompt: 'Chọn cách viết đúng:',
        say: 'Chọn cách viết đúng. 6 bé hơn 4. 4 bé hơn 6. 4 lớn hơn 6. 6 bằng 4.',
        options: ['6 < 4', '4 < 6', '4 > 6', '6 = 4'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'fill', bai: [16, 17, 18], point: 1, level: 2,
        prompt: 'Viết số còn thiếu:',
        say: 'Viết số còn thiếu. 4, 5, mấy, 7, mấy. 8, 7, mấy, 5, mấy.',
        items: [{ t: '4, 5, …, 7, …', ans: [6, 8] }, { t: '8, 7, …, 5, …', ans: [6, 4] }] },
      { type: 'calc', bai: [25, 27, 29, 34], point: 1, level: 1,
        prompt: 'Tính:',
        items: ['1 + 1', '2 + 2', '1 + 4', '2 + 3', '3 − 1', '2 − 1'] },
      { type: 'fill', bai: 27, point: 0, level: 3,
        prompt: 'Viết phép tính thích hợp:', fig: groups('fish', 2, 2, { label: 'bơi tới' }),
        say: 'Trong bể có 2 con cá, 2 con cá nữa bơi tới. Viết phép tính thích hợp.',
        items: [{ t: '… + … = …', ans: [2, 2, 4] }] },
      { type: 'fill', bai: 34, point: 2, level: 3,
        prompt: 'Số?',
        say: '2 cộng 1 bằng 3, nên 3 trừ 1 bằng mấy? 1 cộng 2 bằng 3, nên 3 trừ 2 bằng mấy?',
        items: [{ t: '2 + 1 = 3, nên 3 − 1 = …', ans: 2 }, { t: '1 + 2 = 3, nên 3 − 2 = …', ans: 1 }] },
    ] },
  ],
};
