/** Kiểm tra tổng hợp 1 (Đề 1): Bài 1–6 Vở BT Toán 2 (Nhanh 1 + Nhanh 2). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { sticks, numberLine, twoRows } from './art.js';

export default {
  id: 'l2-th-01',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 1 (Đề 1)',
  short: 'Tổng hợp 1 · Đề 1',
  after: { book: 'workbook2', units: '1-6' },
  desc: 'Số đến 100, tia số, số liền trước; số hạng, tổng, số bị trừ, số trừ, hiệu; hơn, kém nhau bao nhiêu; cộng, trừ không nhớ',
  time: 35,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // 5 bó chục và 8 que lẻ. Nhiễu: viết ngược chục và đơn vị (85), cộng 5 + 8 (13), viết rời "5 chục" thành 50 rồi ghép 8 (508).
      { type: 'mc', bai: 1, point: 0, level: 1,
        prompt: 'Có tất cả bao nhiêu que tính?', fig: sticks(5, 8),
        options: ['58', '85', '13', '508'], ans: 0 },
      // Nhiễu: số liền sau (71), bớt 1 chục (60), thêm 1 chục (80).
      { type: 'mc', bai: 2, point: 2, level: 1,
        prompt: 'Số liền trước của 70 là:',
        options: ['71', '69', '60', '80'], ans: 1 },
      // Ý sai: so hàng đơn vị trước (48 > 84), quên so hàng đơn vị khi hàng chục bằng nhau (39 < 31).
      { type: 'tf', bai: 1, point: 2, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['56 < 65', '48 > 84', '70 > 69', '39 < 31'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Hay nhầm: tổng với số hạng, số trừ với hiệu.
      { type: 'match', bai: 3, point: 0, level: 2,
        prompt: 'Nối mỗi số với tên gọi của nó:',
        heads: ['Số', 'Tên gọi'],
        left: ['Trong 25 + 4 = 29, số 29 là', 'Trong 25 + 4 = 29, số 4 là', 'Trong 67 − 7 = 60, số 67 là', 'Trong 67 − 7 = 60, số 7 là'],
        right: ['số hạng', 'tổng', 'số bị trừ', 'số trừ', 'hiệu'],
        ans: [1, 0, 2, 3] },
      // Nhiễu: cộng hai số (13), chép số cam (8), chép số táo (5).
      { type: 'mc', bai: 4, point: 2, level: 1,
        prompt: 'Ghép mỗi quả cam với một quả táo. Số cam hơn số táo là bao nhiêu quả?', fig: twoRows('Cam', 'cam', 8, 'Táo', 'tao', 5),
        options: ['3', '13', '8', '5'], ans: 0 },
      // Nhiễu: cộng thay vì tìm số trừ (110), chép hiệu (30), nhầm 8 chục − 4 chục (40).
      { type: 'mc', bai: 5, point: 0, level: 2,
        prompt: 'Số thích hợp điền vào ô trống: 80 − □ = 30',
        options: ['50', '110', '30', '40'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 5, point: 1, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['43 + 25', '67 + 2', '89 − 36', '75 − 4'] },
      { type: 'fill', bai: 2, point: 0, level: 2,
        prompt: 'Viết số tròn chục thích hợp vào ô trống trên tia số (theo thứ tự từ trái sang phải):',
        fig: numberLine({ from: 0, step: 10, n: 11, labels: { 3: null, 6: null, 8: null } }),
        items: [{ t: '…, …, …', ans: [30, 60, 80] }] },
      {
        type: 'word', bai: 4, point: 0, level: 3,
        text: 'Năm nay bố 38 tuổi, con 7 tuổi. Hỏi con kém bố bao nhiêu tuổi?',
        given: ['Bố 38 tuổi.', 'Con 7 tuổi.'],
        ask: 'Con kém bố bao nhiêu tuổi?',
        hint: 'Muốn biết số bé kém số lớn bao nhiêu, ta lấy số lớn trừ số bé.',
        sentence: ['Con', 'kém bố', 'số tuổi', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 38, op: '−', b: 7, result: 31, unit: 'tuổi' },
        units: ['tuổi', 'năm', 'người'],
      },
      // 6 chục, đơn vị kém 6 là 2 nên là 4: số 64.
      { type: 'fill', bai: [1, 4], point: 0, level: 3,
        prompt: 'Một số có hai chữ số, chữ số hàng chục là 6, chữ số hàng đơn vị kém chữ số hàng chục 2.',
        items: [{ t: 'Số đó là …', ans: 64 }, { t: 'Viết thành tổng: … = 60 + …', ans: [64, 4] }] },
    ] },
  ],
};
