/** Kiểm tra nhanh 5: Bài 19–24 Vở BT Toán 1 (các số 9, 0, 10). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { things, plate } from './art.js';

export default {
  id: 'l1-nh-05',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 5',
  short: 'Nhanh 5',
  after: { book: 'workbook1', units: '19-24' },
  desc: 'Các số 9, 0, 10',
  time: 15,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      { type: 'mc', bai: 19, point: 1, level: 1,
        prompt: 'Có mấy quả bóng?', fig: things('ball', 9, { cols: 5 }),
        options: ['7', '8', '9', '10'], ans: 2 },
      // Đáp án nhiễu: 1 (đếm cả cái đĩa), 10 (nhầm số 0 với số 10).
      { type: 'mc', bai: 20, point: 0, level: 1,
        prompt: 'Trên đĩa có mấy quả táo?', fig: plate('apple', 0),
        options: ['1', '10', '0'], ans: 2 },
      // Ý sai: 10 < 9 (nhìn chữ số 1 bé hơn 9), 9 > 10.
      { type: 'tf', bai: [20, 21], point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        say: 'Đúng ghi Đ, sai ghi S. 0 bé hơn 1. 10 bé hơn 9. Số 10 có hai chữ số: chữ số 1 và chữ số 0. 9 lớn hơn 10.',
        items: ['0 < 1', '10 < 9', 'Số 10 có hai chữ số: 1 và 0.', '9 > 10'], ans: ['Đ', 'S', 'Đ', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'fill', bai: [19, 21], point: 2, level: 2,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        say: 'Viết số thích hợp. 9 gồm 6 và mấy. 10 gồm 7 và mấy. 10 gồm mấy và 4.',
        items: [{ t: '9 gồm 6 và …', ans: 3 }, { t: '10 gồm 7 và …', ans: 3 }, { t: '10 gồm … và 4', ans: 6 }] },
      { type: 'fill', bai: [20, 21], point: 2, level: 3,
        prompt: 'Xếp các số 9, 0, 10, 5 theo thứ tự từ bé đến lớn:',
        say: 'Xếp các số 9, 0, 10, 5 theo thứ tự từ bé đến lớn.',
        items: [{ t: '…, …, …, …', ans: [0, 5, 9, 10] }] },
    ] },
  ],
};
