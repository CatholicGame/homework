/** Kiểm tra giữa học kì I, Đề 4: Bài 1–24 Vở BT Toán 1 (Nhanh 1 đến 5). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { things, pairRows } from './art.js';

export default {
  id: 'l1-gk-1d',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 4)',
  short: 'Giữa kì I · Đề 4',
  after: { book: 'workbook1', units: '1-24' },
  desc: 'Nhiều hơn, ít hơn; các số từ 1 đến 10; bằng nhau, dấu <, >, =; số gồm mấy và mấy; so sánh ba số',
  time: 35,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      { type: 'mc', bai: 21, point: 0, level: 1,
        prompt: 'Có mấy ngôi sao?', fig: things('star', 10, { cols: 5 }),
        options: ['8', '9', '10', '11'], ans: 2 },
      { type: 'mc', bai: 2, point: 2, level: 1,
        prompt: 'Nối mỗi con chim với một con cá. Bên nào ít hơn?', fig: pairRows('bird', 4, 'fish', 6),
        say: 'Nối mỗi con chim với một con cá. Chim ít hơn, cá ít hơn, hay bằng nhau?',
        options: ['Chim ít hơn', 'Cá ít hơn', 'Bằng nhau'], ans: 0 },
      { type: 'pick', bai: 8, point: 0, level: 1,
        prompt: 'Khoanh vào 5 con thỏ.', icon: 'rabbit', count: 7, cols: 7, ans: 5 },
      // Ý sai: đếm ngược bị đảo chỗ 5 và 6; "8 gồm 5 và 2" (5 và 2 là 7).
      { type: 'tf', bai: [17, 18], point: 2, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Đếm xuôi: 5, 6, 7, 8.', 'Đếm ngược: 8, 7, 5, 6.', '7 gồm 4 và 3.', '8 gồm 5 và 2.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Bẫy: phương án đầu có hàng thìa giãn dài bằng hàng cốc nhưng ít hơn một cái.
      { type: 'mc', bai: 13, point: 0, level: 2,
        prompt: 'Hình nào có số cốc bằng số thìa?',
        say: 'Nối mỗi cái cốc với một cái thìa. Hình nào có số cốc bằng số thìa?',
        options: [pairRows('cup', 5, 'spoon', 4, { spread: true }), pairRows('cup', 4, 'spoon', 4), pairRows('cup', 3, 'spoon', 4)], ans: 1 },
      // Đáp án nhiễu: 7 (số đứng trước 8), 10 (nhảy hai bậc), 6.
      { type: 'mc', bai: 19, point: 0, level: 1,
        prompt: '8 thêm 1 là mấy?',
        options: ['7', '9', '10', '6'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'compare', bai: [10, 11, 13], point: 1, level: 1,
        prompt: 'Điền dấu >, <, =:',
        say: 'Điền dấu lớn hơn, bé hơn, hoặc bằng. 6 và 9. 10 và 7. 8 và 8. 1 và 0.',
        items: ['6 □ 9', '10 □ 7', '8 □ 8', '1 □ 0'] },
      { type: 'fill', bai: [16, 17, 21], point: 0, level: 2,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        say: '5 thêm 1 là mấy. 6 thêm 1 là mấy. 9 thêm 1 là mấy.',
        items: [{ t: '5 thêm 1 là …', ans: 6 }, { t: '6 thêm 1 là …', ans: 7 }, { t: '9 thêm 1 là …', ans: 10 }] },
      { type: 'fill', bai: [2, 18], point: 1, level: 3,
        prompt: 'Mỗi con thỏ được một củ cà rốt. Còn mấy con thỏ chưa có cà rốt?', fig: pairRows('rabbit', 8, 'carrot', 6),
        items: [
          { t: '… con thỏ', ans: 8 },
          { t: '… củ cà rốt', ans: 6 },
          { t: 'Còn … con thỏ chưa có cà rốt.', ans: 2 },
        ] },
      { type: 'fill', bai: [19, 21], point: 1, level: 3,
        prompt: 'Ba bạn đi hái hoa. Bạn nào hái được nhiều hoa nhất?',
        say: 'Đếm số bông hoa của Lan, của Hoa, của Minh. Rồi chọn bạn hái được nhiều hoa nhất.',
        items: [
          { t: 'Lan: … bông hoa', fig: things('flower', 7, { cols: 4 }), ans: 7 },
          { t: 'Hoa: … bông hoa', fig: things('flower', 10, { cols: 5 }), ans: 10 },
          { t: 'Minh: … bông hoa', fig: things('flower', 9, { cols: 5 }), ans: 9 },
          { t: 'Bạn … hái được nhiều hoa nhất.', ans: ['Hoa'], choices: ['Lan', 'Hoa', 'Minh'] },
        ] },
    ] },
  ],
};
