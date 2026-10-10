/** Kiểm tra nhanh 3: Bài 10–15 Vở BT Toán 1 (bé hơn, lớn hơn, bằng nhau; số trong phạm vi 5). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { pairRows } from './art.js';

export default {
  id: 'l1-nh-03',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 3',
  short: 'Nhanh 3',
  after: { book: 'workbook1', units: '10-15' },
  desc: 'Bé hơn, lớn hơn, bằng nhau; dấu <, >, =',
  time: 15,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Đáp án nhiễu: quay ngược dấu (2 > 4), đổi chỗ hai số (4 < 2).
      { type: 'mc', bai: 10, point: 1, level: 1,
        prompt: '2 bé hơn 4. Viết thế nào?',
        say: '2 bé hơn 4. Chọn cách viết đúng.',
        options: ['2 > 4', '2 < 4', '4 < 2'], ans: 1 },
      // Nối từng cặp: chim còn thừa nên 5 lớn hơn 3. Nhiễu: quay ngược dấu, dấu bằng.
      { type: 'mc', bai: 11, point: 0, level: 1,
        prompt: 'Có 5 con chim, 3 bông hoa. Chọn cách viết đúng:', fig: pairRows('bird', 5, 'flower', 3),
        say: 'Có 5 con chim, 3 bông hoa. Chọn cách viết đúng: 5 bé hơn 3, 5 lớn hơn 3, hay 5 bằng 3?',
        options: ['5 < 3', '5 > 3', '5 = 3'], ans: 1 },
      // Ý sai: dấu = giữa hai số khác nhau, dấu > giữa hai số bằng nhau.
      { type: 'tf', bai: [13, 10, 11], point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        say: 'Đúng ghi Đ, sai ghi S. 4 bằng 4. 2 bằng 3. 1 bé hơn 5. 5 lớn hơn 5.',
        items: ['4 = 4', '2 = 3', '1 < 5', '5 > 5'], ans: ['Đ', 'S', 'Đ', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'compare', bai: [10, 11, 13], point: 2, level: 2,
        prompt: 'Điền dấu >, <, =:',
        say: 'Điền dấu lớn hơn, bé hơn, hoặc bằng vào ô trống.',
        items: ['1 □ 3', '5 □ 2', '4 □ 4', '2 □ 5'] },
      // Chỉ dùng số 1 đến 5 (chưa học số 0, số 6): mỗi chỗ chấm chỉ có một số đúng.
      { type: 'fill', bai: [10, 11], point: 1, level: 3,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        say: 'Viết số thích hợp. 1 bé hơn mấy, bé hơn 3. Mấy lớn hơn 4. 4 lớn hơn mấy, lớn hơn 2.',
        items: [{ t: '1 < … < 3', ans: 2 }, { t: '… > 4', ans: 5 }, { t: '4 > … > 2', ans: 3 }] },
    ] },
  ],
};
