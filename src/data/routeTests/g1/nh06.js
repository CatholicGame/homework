/** Kiểm tra nhanh 6: Bài 25–28 Vở BT Toán 1 (phép cộng trong phạm vi 3, 4). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { groups } from './art.js';

export default {
  id: 'l1-nh-06',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 6',
  short: 'Nhanh 6',
  after: { book: 'workbook1', units: '25-28' },
  desc: 'Phép cộng trong phạm vi 3, 4',
  time: 15,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Đáp án nhiễu: 1 và 2 (chỉ đếm một nhóm), 4 (đếm thừa).
      { type: 'mc', bai: 25, point: 0, level: 1,
        prompt: 'Có 1 quả bóng, thêm 2 quả bóng. Có tất cả mấy quả bóng?', fig: groups('ball', 1, 2),
        options: ['1', '2', '3', '4'], ans: 2 },
      // Đáp án nhiễu: 3 (đếm thiếu), 5 (đếm thừa), 2 (chép lại số đã cho).
      { type: 'mc', bai: 27, point: 0, level: 1,
        prompt: '2 + 2 = …',
        say: '2 cộng 2 bằng mấy?',
        options: ['3', '4', '5', '2'], ans: 1 },
      // Ý sai: 1 + 2 = 2 + 2 (đổi chỗ nhưng chép sai số), 2 + 2 = 3 (tính sai).
      { type: 'tf', bai: [27, 25], point: 1, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        say: 'Đúng ghi Đ, sai ghi S. 3 cộng 1 bằng 1 cộng 3. 2 cộng 1 bằng 1 cộng 2. 1 cộng 2 bằng 2 cộng 2. 2 cộng 2 bằng 3.',
        items: ['3 + 1 = 1 + 3', '2 + 1 = 1 + 2', '1 + 2 = 2 + 2', '2 + 2 = 3'], ans: ['Đ', 'Đ', 'S', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [25, 27], point: 1, level: 1,
        prompt: 'Tính:',
        items: ['1 + 2', '3 + 1', '1 + 1', '1 + 3'] },
      { type: 'fill', bai: [25, 27], point: 0, level: 3,
        prompt: 'Số?',
        say: 'Điền số còn thiếu vào ô trống.',
        items: ['1 + □ = 3', '□ + 3 = 4', '2 + □ = 4'] },
    ] },
  ],
};
