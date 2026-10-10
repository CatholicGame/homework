/** Kiểm tra giữa học kì I, Đề 5: Bài 1–24 Vở BT Toán 1 (Nhanh 1 đến 5). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { things, mixed, pairRows, plate } from './art.js';

export default {
  id: 'l1-gk-1e',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 5)',
  short: 'Giữa kì I · Đề 5',
  after: { book: 'workbook1', units: '1-24' },
  desc: 'Hình tam giác; đọc, đếm các số từ 0 đến 10; dấu <, >, =; số gồm mấy và mấy; chia đều hai đĩa',
  time: 35,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      { type: 'mc', bai: 18, point: 1, level: 1,
        prompt: 'Có mấy củ cà rốt?', fig: things('carrot', 8, { cols: 4 }),
        options: ['7', '8', '9', '6'], ans: 1 },
      // Đáp án nhiễu: 4 (nhầm với hình vuông), 2, 5.
      { type: 'mc', bai: 4, point: 1, level: 1,
        prompt: 'Xếp mấy que tính thì được một hình tam giác?',
        options: ['2', '3', '4', '5'], ans: 1 },
      { type: 'match', bai: [19, 20, 21], point: 0, level: 1,
        prompt: 'Nối số với cách đọc:',
        say: 'Nối mỗi số với cách đọc của số đó.',
        left: ['9', '0', '10'], right: ['mười', 'chín', 'không'], ans: [1, 2, 0] },
      // Đáp án nhiễu: viết ngược chiều dấu (7 < 5) hoặc đảo chỗ hai số (5 > 7).
      { type: 'mc', bai: 11, point: 0, level: 2,
        prompt: 'Đếm bóng, đếm cốc. Viết đúng là:', fig: pairRows('ball', 7, 'cup', 5),
        say: 'Đếm số quả bóng, đếm số cái cốc. Cách viết nào đúng: 7 lớn hơn 5, 7 bé hơn 5, hay 5 lớn hơn 7?',
        options: ['7 > 5', '7 < 5', '5 > 7'], ans: 0 },
      { type: 'pick', bai: 6, point: 0, level: 1,
        prompt: 'Khoanh vào 3 quả cam.', icon: 'orange', count: 5, cols: 5, ans: 3 },
      // Đáp án nhiễu: 6 và 2 (ghép được 8), 4 và 2, 3 và 3 (ghép được 6).
      { type: 'mc', bai: 17, point: 2, level: 2,
        prompt: 'Hai số nào ghép lại được 7?',
        options: ['4 và 2', '5 và 2', '6 và 2', '3 và 3'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'fill', bai: [16, 19, 20], point: 0, level: 1,
        prompt: 'Đếm rồi viết số:',
        items: [
          { t: '… con chim', fig: things('bird', 6, { cols: 3 }), ans: 6 },
          { t: '… chấm tròn', fig: things('dot', 9, { cols: 5 }), ans: 9 },
          { t: '… quả táo', fig: plate('apple', 0, 120), ans: 0 },
        ] },
      { type: 'compare', bai: [10, 11, 13], point: 2, level: 2,
        prompt: 'Điền dấu >, <, =:',
        say: 'Điền dấu lớn hơn, bé hơn, hoặc bằng. 2 và 9. 9 và 2. 5 và 5. 10 và 1.',
        items: ['2 □ 9', '9 □ 2', '5 □ 5', '10 □ 1'] },
      // Hai loại xen kẽ: đếm riêng từng loại rồi viết 10 gồm mấy và mấy.
      { type: 'fill', bai: 21, point: 2, level: 3,
        prompt: 'Có 10 con vật. Có mấy con chim, mấy con cá?',
        fig: mixed(['bird', 'fish', 'bird', 'bird', 'fish', 'bird', 'fish', 'bird', 'fish', 'bird']),
        say: 'Đếm số con chim, đếm số con cá. Rồi viết: 10 gồm 6 và mấy.',
        items: [{ t: '… con chim', ans: 6 }, { t: '… con cá', ans: 4 }, { t: '10 gồm 6 và …', ans: 4 }] },
      { type: 'fill', bai: 18, point: 2, level: 3,
        prompt: 'Bà có 8 quả táo, chia đều vào hai đĩa. Mỗi đĩa có mấy quả?', fig: things('apple', 8, { cols: 4 }),
        say: 'Bà có 8 quả táo, chia đều vào hai đĩa, hai đĩa có số táo bằng nhau. Mỗi đĩa có mấy quả?',
        items: [{ t: '8 gồm … và …', ans: [4, 4] }, { t: 'Mỗi đĩa có … quả táo.', ans: 4 }] },
    ] },
  ],
};
