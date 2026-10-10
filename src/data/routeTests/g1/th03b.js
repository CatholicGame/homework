/** Kiểm tra tổng hợp 3 (Đề 2): Bài 19–28 Vở BT Toán 1 (Nhanh 5 + Nhanh 6, ôn Bài 1–18). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { things, groups, plate, twoPlates } from './art.js';

export default {
  id: 'l1-th-03b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 3 (Đề 2)',
  short: 'Tổng hợp 3 · Đề 2',
  after: { book: 'workbook1', units: '19-28' },
  desc: 'Đếm, đọc, so sánh các số 0, 9, 10; phép cộng trong phạm vi 3, 4; ôn số gồm mấy và mấy, dấu <, >',
  time: 30,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      { type: 'mc', bai: 21, point: 0, level: 1,
        prompt: 'Có mấy bông hoa?', fig: things('flower', 10, { cols: 5 }),
        options: ['8', '9', '10'], ans: 2 },
      // Đáp án nhiễu: 8 (quên thêm 1), 10 (thêm 2), 7 (đếm lùi).
      { type: 'mc', bai: 19, point: 0, level: 1,
        prompt: 'Có 8 con gà con, thêm 1 con gà con. Có tất cả mấy con gà con?', fig: groups('chick', 8, 1),
        options: ['7', '9', '8', '10'], ans: 1 },
      { type: 'match', bai: [25, 27], point: 0, level: 1,
        prompt: 'Nối phép tính với kết quả:',
        say: 'Tính, rồi nối mỗi phép tính với kết quả đúng.',
        left: ['3 + 1', '1 + 1', '1 + 2'],
        right: ['3', '4', '2'], ans: [1, 2, 0] },
      // Đáp án nhiễu: 1 + 1 (bằng 2), 2 + 2 và 1 + 3 (bằng 4).
      { type: 'mc', bai: 25, point: 1, level: 1,
        prompt: 'Phép tính nào có kết quả bằng 3?',
        options: ['1 + 1', '2 + 1', '2 + 2', '1 + 3'], ans: 1 },
      { type: 'tf', bai: [20, 21], point: 1, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        say: 'Đúng ghi Đ, sai ghi S. Số 10 có hai chữ số. Số 9 đứng sau số 10. 0 bé hơn 1. 10 gồm 6 và 3.',
        items: ['Số 10 có hai chữ số.', 'Số 9 đứng sau số 10.', '0 < 1', '10 gồm 6 và 3.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Đáp án nhiễu: 2 (nhầm "6 gồm 4 và 2"), 4, 9 (lấy 6 cộng 3).
      { type: 'mc', bai: 16, point: 2, level: 2, review: true,
        prompt: '6 gồm 3 và mấy?',
        options: ['2', '3', '4', '9'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'fill', bai: [19, 20], point: 0, level: 1,
        prompt: 'Đếm rồi viết số:',
        items: [
          { t: '… quả táo', fig: plate('apple', 0, 120), ans: 0 },
          { t: '… con ếch', fig: things('frog', 9, { cols: 5 }), ans: 9 },
        ] },
      { type: 'compare', bai: [25, 27], point: 1, level: 2,
        prompt: 'Điền dấu >, <, =:',
        say: 'Tính, rồi điền dấu lớn hơn, bé hơn, hoặc bằng.',
        items: ['1 + 2 □ 3', '2 + 2 □ 3', '1 + 1 □ 4', '3 + 1 □ 4'] },
      { type: 'fill', bai: [10, 11], point: 1, level: 3, review: true,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        say: 'Viết số thích hợp. 3 bé hơn mấy, bé hơn 5. 7 lớn hơn mấy, lớn hơn 5.',
        items: [{ t: '3 < … < 5', ans: 4 }, { t: '7 > … > 5', ans: 6 }] },
      { type: 'fill', bai: 27, point: 0, level: 3,
        prompt: 'Thỏ có 4 củ cà rốt, bày vào hai đĩa. Đĩa thứ nhất có 1 củ. Đĩa thứ hai có mấy củ?',
        fig: twoPlates('carrot', 1),
        items: [{ t: '1 + … = 4', ans: 3 }, { t: 'Đĩa thứ hai có … củ cà rốt.', ans: 3 }] },
    ] },
  ],
};
