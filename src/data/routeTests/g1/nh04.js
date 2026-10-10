/** Kiểm tra nhanh 4: Bài 16–18 Vở BT Toán 1 (các số 6, 7, 8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { things, twoPlates } from './art.js';

export default {
  id: 'l1-nh-04',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 4',
  short: 'Nhanh 4',
  after: { book: 'workbook1', units: '16-18' },
  desc: 'Các số 6, 7, 8',
  time: 15,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      { type: 'mc', bai: 16, point: 1, level: 1,
        prompt: 'Có mấy quả táo?', fig: things('apple', 6, { cols: 3 }),
        options: ['5', '6', '7', '8'], ans: 1 },
      // Nhiễu: 7 ngôi sao (đếm thiếu một), 6 ngôi sao.
      { type: 'mc', bai: 18, point: 1, level: 1,
        prompt: 'Hình nào có 8 ngôi sao?',
        options: [things('star', 7, { cols: 4 }), things('star', 8, { cols: 4 }), things('star', 6, { cols: 3 })], ans: 1 },
      { type: 'match', bai: [16, 17, 18], point: 0, level: 1,
        prompt: 'Đếm rồi nối với số:',
        say: 'Đếm số con vật trong mỗi hình, rồi nối với số đúng.',
        left: [things('fish', 7, { cols: 4 }), things('chick', 6, { cols: 3 }), things('frog', 8, { cols: 4 })],
        right: ['6', '7', '8'], ans: [1, 0, 2] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'fill', bai: [16, 17, 18], point: 2, level: 2,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        say: 'Viết số thích hợp. 6 gồm 4 và mấy. 7 gồm mấy và 2. 8 gồm 5 và mấy.',
        items: [{ t: '6 gồm 4 và …', ans: 2 }, { t: '7 gồm … và 2', ans: 5 }, { t: '8 gồm 5 và …', ans: 3 }] },
      { type: 'fill', bai: 18, point: 2, level: 3,
        prompt: 'Có 8 củ cà rốt bày vào hai đĩa. Đĩa thứ nhất có 4 củ. Đĩa thứ hai có mấy củ?',
        fig: twoPlates('carrot', 4),
        items: [{ t: 'Đĩa thứ hai có … củ cà rốt.', ans: 4 }] },
    ] },
  ],
};
