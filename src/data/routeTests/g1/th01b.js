/** Kiểm tra tổng hợp 1 (Đề 2): Bài 1–9 Vở BT Toán 1 (Nhanh 1 + Nhanh 2). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { things, pairRows, shape, shapes, track } from './art.js';

export default {
  id: 'l1-th-01b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 1 (Đề 2)',
  short: 'Tổng hợp 1 · Đề 2',
  after: { book: 'workbook1', units: '1-9' },
  desc: 'Nhiều hơn, ít hơn; hình vuông, hình tròn, hình tam giác; đếm và viết các số 1 đến 5',
  time: 30,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      { type: 'mc', bai: 8, point: 0, level: 1,
        prompt: 'Có mấy quả táo?', fig: things('apple', 5),
        options: ['3', '4', '5', '2'], ans: 2 },
      // Đáp án nhiễu: hình tam giác (xếp 3 que), hình tròn (không xếp được bằng que thẳng).
      { type: 'mc', bai: 3, point: 2, level: 1,
        prompt: 'Xếp 4 que tính được hình nào?',
        options: [shape('triangle'), shape('circle'), shape('square')], ans: 2 },
      { type: 'tf', bai: [4, 3], point: 0, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        say: 'Đúng ghi Đ, sai ghi S. Hình tam giác có 3 góc. Hình vuông có 3 cạnh. Mặt đồng hồ có dạng hình tròn. Xếp 3 que tính được hình vuông.',
        items: ['Hình tam giác có 3 góc.', 'Hình vuông có 3 cạnh.', 'Mặt đồng hồ có dạng hình tròn.', 'Xếp 3 que tính được hình vuông.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      { type: 'mc', bai: 2, point: 1, level: 1,
        prompt: 'Nối mỗi con ếch với một bông hoa. Bên nào nhiều hơn?', fig: pairRows('frog', 3, 'flower', 5),
        say: 'Nối mỗi con ếch với một bông hoa. Ếch nhiều hơn, hoa nhiều hơn, hay bằng nhau?',
        options: ['Ếch nhiều hơn', 'Hoa nhiều hơn', 'Bằng nhau'], ans: 1 },
      // Đáp án nhiễu: 3 (đếm ngược lại), 4 (đọc lại số cuối), 1.
      { type: 'mc', bai: 8, point: 2, level: 1,
        prompt: 'Đếm xuôi: 2, 3, 4 rồi đến số mấy?',
        say: 'Đếm xuôi: 2, 3, 4, rồi đến số mấy?',
        options: ['3', '5', '1', '4'], ans: 1 },
      // 4 hình vuông trong 7 hình. Đáp án nhiễu: 7 (đếm hết các hình), 3 và 5 (đếm sót, đếm lặp).
      { type: 'mc', bai: 3, point: 0, level: 2,
        prompt: 'Có mấy hình vuông?', fig: shapes(['square', 'triangle', 'square', 'circle', 'square', 'triangle', 'square']),
        options: ['3', '4', '5', '7'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'pick', bai: 6, point: 0, level: 1,
        prompt: 'Khoanh vào 3 ngôi sao.', icon: 'star', count: 5, cols: 5, ans: 3 },
      { type: 'match', bai: [6, 8], point: 1, level: 2,
        prompt: 'Nối mỗi hình với số thích hợp:',
        say: 'Đếm đồ vật trong mỗi hình, rồi nối với số đúng.',
        left: [things('fish', 2), things('chick', 5), things('ball', 4), things('frog', 3)],
        right: ['4', '3', '5', '2'], ans: [3, 2, 0, 1] },
      // Bẫy: hàng thìa giãn dài bằng hàng cốc. Bé phải nối từng cặp mới thấy còn thừa 2 cái cốc.
      { type: 'fill', bai: 2, point: 2, level: 3,
        prompt: 'Nối mỗi cái cốc với một cái thìa.', fig: pairRows('cup', 5, 'spoon', 3, { spread: true }),
        say: 'Nối mỗi cái cốc với một cái thìa. Bên nào ít hơn? Cần thêm mấy cái thìa để mỗi cốc có một thìa?',
        items: [
          { t: 'Bên … ít hơn.', ans: ['thìa'], choices: ['cốc', 'thìa'] },
          { t: 'Cần thêm … cái thìa để mỗi cốc có một thìa.', ans: 2 },
        ] },
      { type: 'fill', bai: 8, point: 2, level: 3,
        prompt: 'Ếch đứng ở số 5. Ếch nhảy lùi 2 ô. Ếch tới số mấy?', fig: track(1, 5, 5, 'frog'),
        say: 'Ếch đứng ở số 5. Ếch nhảy lùi 2 ô. Ếch tới số mấy?',
        items: [{ t: 'Ếch tới số …', ans: 3 }] },
    ] },
  ],
};
