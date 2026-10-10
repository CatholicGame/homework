/** Kiểm tra cuối học kì I (Đề 2): Bài 1–34 Vở BT Toán 1 (Nhanh 1 đến 7). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { things, groups, shapes } from './art.js';

export default {
  id: 'l1-ck-1b',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 2)',
  short: 'Cuối kì I · Đề 2',
  after: { book: 'workbook1', units: '1-34' },
  desc: 'Đếm đến 10; hình vuông; so sánh; số gồm mấy và mấy; phép cộng trong phạm vi 5, phép trừ trong phạm vi 3',
  time: 35,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Đáp án nhiễu: 8 (đếm sót một ngôi sao), 10 (đếm lặp một ngôi sao), 7.
      { type: 'mc', bai: 19, point: 1, level: 1,
        prompt: 'Có mấy ngôi sao?', fig: things('star', 9, { cols: 5 }),
        options: ['8', '9', '10', '7'], ans: 1 },
      // Đáp án nhiễu: 2 (đếm sót), 4 (đếm lẫn hình tam giác), 6 (đếm tất cả các hình).
      { type: 'mc', bai: 3, point: 0, level: 2,
        prompt: 'Có mấy hình vuông?', fig: shapes(['square', 'circle', 'square', 'triangle', 'square', 'circle']),
        options: ['2', '3', '4', '6'], ans: 1 },
      { type: 'tf', bai: [10, 11, 13], point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        say: 'Đúng ghi Đ, sai ghi S. 4 bé hơn 6. 5 lớn hơn 8. 3 bằng 3. 9 bé hơn 7.',
        items: ['4 < 6', '5 > 8', '3 = 3', '9 < 7'], ans: ['Đ', 'S', 'Đ', 'S'] },
      // Đáp án nhiễu: 3 (chép số đứng cạnh), 4 (viết luôn kết quả), 2.
      { type: 'mc', bai: 27, point: 1, level: 2,
        prompt: '1 + 3 = 3 + …. Số còn thiếu là:',
        say: '1 cộng 3 bằng 3 cộng mấy?',
        options: ['1', '3', '4', '2'], ans: 0 },
      // Đáp án nhiễu: 5 (cộng thay vì trừ), 2 (lấy số quả lăn đi), 3 (số lúc đầu).
      { type: 'mc', bai: 34, point: 0, level: 1,
        prompt: 'Có 3 quả bóng, 2 quả lăn đi. Còn lại mấy quả bóng?', fig: things('ball', 3, { gone: 2 }),
        options: ['1', '2', '3', '5'], ans: 0 },
      { type: 'pick', bai: 8, point: 0, level: 1,
        prompt: 'Khoanh vào 4 bông hoa.', icon: 'flower', count: 7, cols: 7, ans: 4 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [25, 27, 29, 31, 34], point: 1, level: 1,
        prompt: 'Tính:',
        items: ['2 + 1', '1 + 3', '3 + 2', '0 + 4', '3 − 2', '2 − 1'] },
      { type: 'fill', bai: [16, 17, 18], point: 2, level: 2,
        prompt: 'Số?',
        say: 'Điền số. 6 gồm 4 và mấy. 8 gồm 5 và mấy. 7 gồm mấy và 1.',
        items: [{ t: '6 gồm 4 và …', ans: 2 }, { t: '8 gồm 5 và …', ans: 3 }, { t: '7 gồm … và 1', ans: 6 }] },
      { type: 'fill', bai: 29, point: 0, level: 3,
        prompt: 'Viết phép tính thích hợp:', fig: groups('chick', 4, 1, { label: 'chạy tới' }),
        say: 'Có 4 con gà con, 1 con gà con chạy tới. Viết phép tính thích hợp.',
        items: [{ t: '4 □ 1 = …', ans: ['+', 5], choices: ['+', '−'] }] },
      { type: 'compare', bai: [29, 31], point: 1, level: 3,
        prompt: 'Điền dấu >, <, =:',
        say: 'Tính hai bên rồi điền dấu lớn hơn, bé hơn hoặc bằng.',
        items: ['3 + 2 □ 4 + 1', '2 + 2 □ 5', '0 + 3 □ 2 + 0', '1 + 3 □ 3 + 1'] },
    ] },
  ],
};
