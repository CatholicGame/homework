/** Kiểm tra nhanh 7: Bài 29–34 Vở BT Toán 1 (cộng trong phạm vi 5, số 0 trong phép cộng, trừ trong phạm vi 3). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { things, groups } from './art.js';

export default {
  id: 'l1-nh-07',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 7',
  short: 'Nhanh 7',
  after: { book: 'workbook1', units: '29-34' },
  desc: 'Phép cộng trong phạm vi 5, số 0 trong phép cộng, phép trừ trong phạm vi 3',
  time: 15,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Đáp án nhiễu: 3 (làm tính trừ), 4 (quên con mới tới), 6 (đếm thừa).
      { type: 'mc', bai: 29, point: 0, level: 1,
        prompt: 'Có 4 con cá, 1 con cá bơi tới. Có tất cả mấy con cá?', fig: groups('fish', 4, 1, { label: 'bơi tới' }),
        options: ['3', '4', '5', '6'], ans: 2 },
      // Đáp án nhiễu: 2 (đếm số con bay đi), 3 (đếm cả con bị gạch), 5 (làm tính cộng).
      { type: 'mc', bai: 34, point: 0, level: 1,
        prompt: 'Có 3 con chim, 2 con bay đi. Còn lại mấy con chim?', fig: things('bird', 3, { gone: 2 }),
        options: ['1', '2', '3', '5'], ans: 0 },
      { type: 'match', bai: [29, 31, 34], point: 1, level: 1,
        prompt: 'Nối phép tính với kết quả:',
        say: 'Nối mỗi phép tính với kết quả. 2 cộng 3. 0 cộng 4. 3 trừ 1.',
        left: ['2 + 3', '0 + 4', '3 − 1'],
        right: ['2', '4', '5'], ans: [2, 1, 0] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'compare', bai: [29, 31, 34], point: 1, level: 2,
        prompt: 'Điền dấu >, <, =:',
        say: 'Tính rồi điền dấu lớn hơn, bé hơn, hoặc bằng vào ô trống.',
        items: ['2 + 3 □ 4', '3 − 1 □ 2', '0 + 4 □ 5', '3 − 2 □ 2'] },
      { type: 'fill', bai: [29, 34], point: 0, level: 3,
        prompt: 'Viết phép tính thích hợp:',
        say: 'Hình trên: có 2 quả táo, thêm 3 quả táo. Hình dưới: có 3 con thỏ, 1 con chạy đi. Viết phép tính thích hợp.',
        items: [
          { t: '2 □ 3 = …', fig: groups('apple', 2, 3), ans: ['+', 5], choices: ['+', '−'] },
          { t: '3 □ 1 = …', fig: things('rabbit', 3, { gone: 1 }), ans: ['−', 2], choices: ['+', '−'] },
        ] },
    ] },
  ],
};
