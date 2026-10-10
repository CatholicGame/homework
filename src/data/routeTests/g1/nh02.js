/** Kiểm tra nhanh 2: Bài 6–9 Vở BT Toán 1 (các số 1 đến 5). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { things, mixed } from './art.js';

export default {
  id: 'l1-nh-02',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 2',
  short: 'Nhanh 2',
  after: { book: 'workbook1', units: '6-9' },
  desc: 'Các số 1, 2, 3, 4, 5',
  time: 15,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      { type: 'mc', bai: 6, point: 0, level: 1,
        prompt: 'Có mấy con gà con?', fig: things('chick', 3),
        options: ['1', '2', '3', '4'], ans: 2 },
      { type: 'mc', bai: 8, point: 0, level: 1,
        prompt: 'Có mấy ngôi sao?', fig: things('star', 5),
        options: ['3', '4', '5', '6'], ans: 2 },
      // Đáp án nhiễu: 6 (đếm xuôi tiếp sau 5), 1 và 4 (số đã có trong dãy).
      { type: 'mc', bai: 8, point: 2, level: 2,
        prompt: 'Đếm ngược: 5, 4, …, 2, 1. Số còn thiếu là:',
        say: 'Đếm ngược: 5, 4, mấy, 2, 1. Số còn thiếu là số mấy?',
        options: ['6', '3', '1', '4'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'pick', bai: 8, point: 0, level: 1,
        prompt: 'Khoanh vào 4 quả cam.', icon: 'orange', count: 5, cols: 5, ans: 4 },
      // Hai loại xen kẽ: bé phải đếm riêng từng loại.
      { type: 'fill', bai: [6, 8], point: 0, level: 3,
        prompt: 'Có mấy con cá, mấy con chim?', fig: mixed(['bird', 'fish', 'bird', 'bird', 'fish', 'bird', 'fish']),
        say: 'Đếm số con cá, rồi đếm số con chim. Viết số vào chỗ chấm.',
        items: [{ t: '… con cá', ans: 3 }, { t: '… con chim', ans: 4 }] },
    ] },
  ],
};
