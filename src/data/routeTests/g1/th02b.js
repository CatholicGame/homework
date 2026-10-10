/** Kiểm tra tổng hợp 2 (Đề 2): Bài 10–18 Vở BT Toán 1 (Nhanh 3 + Nhanh 4, ôn Bài 1–9). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { things, pairRows, shapes } from './art.js';

export default {
  id: 'l1-th-02b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 2 (Đề 2)',
  short: 'Tổng hợp 2 · Đề 2',
  after: { book: 'workbook1', units: '10-18' },
  desc: 'So sánh số, dấu <, >, =; đọc, đếm các số 6, 7, 8; số gồm mấy và mấy; ôn hình và đếm đến 5',
  time: 30,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      { type: 'mc', bai: 17, point: 1, level: 1,
        prompt: 'Có mấy cái cốc?', fig: things('cup', 7, { cols: 4 }),
        options: ['6', '8', '7', '5'], ans: 2 },
      // Đáp án nhiễu: 6 (bằng, không lớn hơn), 5 và 4 (bé hơn 6).
      { type: 'mc', bai: 11, point: 1, level: 1,
        prompt: 'Số nào lớn hơn 6?',
        options: ['5', '4', '7', '6'], ans: 2 },
      { type: 'match', bai: [16, 17, 18], point: 0, level: 1,
        prompt: 'Nối số với cách đọc:',
        say: 'Nối mỗi số với cách đọc số đó.',
        left: ['6', '7', '8'],
        right: ['tám', 'sáu', 'bảy'], ans: [1, 2, 0] },
      // 2 hình tam giác. Đáp án nhiễu: 5 (đếm hết các hình), 1 và 3 (đếm sót, đếm lặp).
      { type: 'mc', bai: 4, point: 0, level: 2, review: true,
        prompt: 'Có mấy hình tam giác?', fig: shapes(['circle', 'triangle', 'square', 'triangle', 'circle']),
        options: ['1', '2', '3', '5'], ans: 1 },
      { type: 'tf', bai: [10, 11, 13], point: 2, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        say: 'Đúng ghi Đ, sai ghi S. 5 bằng 5. 7 lớn hơn 8. 4 bé hơn 6. 8 bằng 6.',
        items: ['5 = 5', '7 > 8', '4 < 6', '8 = 6'], ans: ['Đ', 'S', 'Đ', 'S'] },
      // Đáp án nhiễu: 3 (nhớ nhầm "8 gồm 5 và 3"), 1 (nhầm "7 gồm 6 và 1"), 4.
      { type: 'mc', bai: 18, point: 2, level: 2,
        prompt: '8 gồm 6 và mấy?',
        options: ['3', '2', '1', '4'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'compare', bai: [10, 11, 13], point: 1, level: 1,
        prompt: 'Điền dấu >, <, =:',
        say: 'Điền dấu lớn hơn, bé hơn, hoặc bằng.',
        items: ['7 □ 5', '3 □ 8', '6 □ 6', '1 □ 2'] },
      { type: 'pick', bai: 8, point: 0, level: 1, review: true,
        prompt: 'Khoanh vào 5 quả cam.', icon: 'orange', count: 8, cols: 4, ans: 5 },
      { type: 'fill', bai: [10, 11], point: 1, level: 3,
        prompt: 'Trong các số 6, 3, 8, 5:',
        say: 'Trong các số 6, 3, 8, 5, số nào lớn nhất, số nào bé nhất?',
        items: [{ t: 'Số lớn nhất là …', ans: 8 }, { t: 'Số bé nhất là …', ans: 3 }] },
      // Nối từng cặp: thừa 2 bạn thỏ nên số bóng bé hơn số thỏ.
      { type: 'fill', bai: [10, 16, 18], point: 0, level: 3,
        prompt: 'Mỗi bạn thỏ được một quả bóng.', fig: pairRows('rabbit', 8, 'ball', 6),
        say: 'Mỗi bạn thỏ được một quả bóng. Đếm số thỏ, số bóng. Còn mấy bạn thỏ chưa có bóng? Chọn dấu đúng.',
        items: [
          { t: '… con thỏ', ans: 8 },
          { t: '… quả bóng', ans: 6 },
          { t: 'Còn … bạn thỏ chưa có bóng.', ans: 2 },
          { t: 'Số quả bóng □ số con thỏ', ans: ['<'], choices: ['>', '<', '='] },
        ] },
    ] },
  ],
};
