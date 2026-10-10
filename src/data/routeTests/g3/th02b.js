/** Kiểm tra tổng hợp 2 (Đề 2): Bài 9–15 Vở BT Toán 3 (Nhanh 3 + Nhanh 4, ôn Bài 1–8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { polys } from './art.js';

/** Băng giấy chia theo các vạch `cuts` (0 đến 100), tô `colored` phần đầu. */
const strip = (cuts, colored) => {
  const xs = [0, ...cuts, 100].map(c => 10 + c);
  return polys(xs.slice(1).map((x, i) => ({
    pts: [[xs[i], 12], [x, 12], [x, 48], [xs[i], 48]],
    color: i < colored ? '#fca5a5' : '#ffffff',
  })), { w: 120, h: 60, width: 120 });
};

export default {
  id: 'l3-th-02b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 2 (Đề 2)',
  short: 'Tổng hợp 2 · Đề 2',
  after: { book: 'workbook', units: '9-15' },
  desc: 'Bảng nhân, bảng chia 6, 7, 8, 9; số bị chia, số chia, thương; tìm x; một phần mấy; ôn chia theo nhóm, cộng, trừ có nhớ',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: đổi chỗ hai chữ số (54), nhầm sang 8 × 5 (40), lấy 9 cộng 5 (14).
      { type: 'mc', bai: 12, point: 1, level: 1,
        prompt: 'Kết quả của phép tính 9 × 5 là:',
        options: ['45', '54', '40', '14'], ans: 0 },
      // Ý sai: lệch một hàng trong bảng chia 8 (56 : 8 = 7, 48 : 8 = 6).
      { type: 'tf', bai: 11, point: 2, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['32 : 8 = 4', '56 : 8 = 6', '64 : 8 = 8', '48 : 8 = 7'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: nhầm số đứng đầu (số bị chia), tên kết quả (thương), tên trong phép nhân (thừa số).
      { type: 'mc', bai: 13, point: 1, level: 1,
        prompt: 'Trong phép chia 42 : 7 = 6, số 7 gọi là:',
        options: ['Số bị chia', 'Số chia', 'Thương', 'Thừa số'], ans: 1 },
      // 15 : 5 = 3.
      { type: 'pick', bai: 14, point: 3, level: 1,
        prompt: 'Khoanh vào {1/5} số bông hoa:',
        icon: 'flower', count: 15, cols: 5, ans: 3 },
      // A: 3 phần bằng nhau, tô 1. B: 3 phần không bằng nhau. C: 4 phần, tô 1 ({1/4}). D: tô 2 trong 3 phần.
      { type: 'mc', bai: 14, point: 2, level: 2,
        prompt: 'Hình nào đã tô màu {1/3} hình?',
        options: [strip([33.3, 66.7], 1), strip([18, 55], 1), strip([25, 50, 75], 1), strip([33.3, 66.7], 2)], ans: 0 },
      // 35 : 5 = 7. Nhiễu: lấy 35 trừ 5 (30), lấy 35 cộng 5 (40), chép số bạn mỗi hàng (5).
      { type: 'mc', bai: 4, point: 3, level: 2, review: true,
        prompt: 'Có 35 bạn xếp thành các hàng, mỗi hàng 5 bạn. Xếp được mấy hàng?',
        options: ['7 hàng', '30 hàng', '40 hàng', '5 hàng'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 2, level: 1, review: true,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['384 + 409', '167 + 248', '903 − 517', '650 − 85'] },
      { type: 'findx', bai: 13, point: 0, level: 2,
        prompt: 'Tìm x:',
        items: ['x × 6 = 54', 'x : 8 = 6', '63 : x = 9', '7 × x = 42'] },
      {
        type: 'word', bai: 9, point: 3, level: 3,
        text: 'Có 54 quả trứng xếp vào các khay, mỗi khay 6 quả. Hỏi xếp được bao nhiêu khay trứng?',
        given: ['Có 54 quả trứng.', 'Mỗi khay 6 quả.'],
        ask: 'Xếp được bao nhiêu khay trứng?',
        hint: 'Chia theo nhóm, mỗi nhóm 6 quả: lấy 54 chia cho 6.',
        sentence: ['Số khay trứng', 'xếp được', 'là:'],
        decoys: ['mỗi khay có'],
        expr: { a: 54, op: ':', b: 6, result: 9, unit: 'khay' },
        units: ['khay', 'quả trứng', 'kg'],
      },
      // 56 = 56, 54 < 56, 8 < 9, 40 > 36.
      { type: 'compare', bai: [10, 11, 12], point: 1, level: 3,
        prompt: 'Điền dấu >, <, = thích hợp:',
        items: ['7 × 8 □ 8 × 7', '9 × 6 □ 7 × 8', '72 : 9 □ 63 : 7', '8 × 5 □ 6 × 6'] },
    ] },
  ],
};
