/** Kiểm tra tổng hợp 1 (Đề 2): Bài 1–6 Vở BT Toán 2 (Nhanh 1 + Nhanh 2). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { twoRows } from './art.js';

export default {
  id: 'l2-th-01b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 1 (Đề 2)',
  short: 'Tổng hợp 1 · Đề 2',
  after: { book: 'workbook2', units: '1-6' },
  desc: 'Đọc, viết, so sánh số đến 100; số liền trước, số liền sau; tổng, hiệu; hơn, kém nhau bao nhiêu; cộng, trừ không nhớ',
  time: 35,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: viết ngược (16), viết rời 60 và 1 (601), quên hàng đơn vị (60).
      { type: 'mc', bai: 1, point: 1, level: 1,
        prompt: 'Số "sáu mươi mốt" viết là:',
        options: ['61', '16', '601', '60'], ans: 0 },
      // Ý sai: nhầm liền trước với liền sau (50 → 51), thêm 1 chục thay vì 1 đơn vị (64 → 74).
      { type: 'tf', bai: 2, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Số liền sau của 39 là 40.', 'Số liền trước của 50 là 51.', 'Số liền trước của 81 là 80.', 'Số liền sau của 64 là 74.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: số hạng (nhầm tên), hiệu và số bị trừ (tên của phép trừ).
      { type: 'mc', bai: 3, point: 0, level: 1,
        prompt: 'Trong phép cộng 52 + 6 = 58, số 58 gọi là:',
        options: ['Số hạng', 'Tổng', 'Hiệu', 'Số bị trừ'], ans: 1 },
      // Nhiễu: 99 (quên chữ số khác nhau), 89 (đổi chỗ), 90 (số tròn chục lớn nhất).
      { type: 'mc', bai: 1, point: 3, level: 2,
        prompt: 'Số lớn nhất có hai chữ số khác nhau là:',
        options: ['98', '99', '89', '90'], ans: 0 },
      { type: 'match', bai: 5, point: 0, level: 2,
        prompt: 'Tính nhẩm rồi nối mỗi phép tính với kết quả đúng:',
        left: ['20 + 60', '70 − 40', '10 + 40', '90 − 30'],
        right: ['50', '80', '60', '30'],
        ans: [1, 3, 0, 2] },
      // Nhiễu: đổi chiều (Mai hơn Hà), cộng hai số (14), chép số cam của Mai (5).
      { type: 'mc', bai: 4, point: 1, level: 2,
        prompt: 'Hà có 9 quả cam, Mai có 5 quả cam. Chọn câu đúng:', fig: twoRows('Hà', 'cam', 9, 'Mai', 'cam', 5),
        options: ['Hà hơn Mai 4 quả cam.', 'Mai hơn Hà 4 quả cam.', 'Hà hơn Mai 14 quả cam.', 'Mai kém Hà 5 quả cam.'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 5, point: 1, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['54 + 32', '6 + 71', '98 − 45', '87 − 7'] },
      { type: 'table', bai: 3, point: 2, level: 1,
        prompt: 'Viết số thích hợp vào ô trống:',
        items: [
          { prompt: 'a)', head: ['Số hạng', 'Số hạng', 'Tổng'], rows: [[34, 5, '…'], [20, 70, '…'], [61, 15, '…']], ans: [[39], [90], [76]] },
          { prompt: 'b)', head: ['Số bị trừ', 'Số trừ', 'Hiệu'], rows: [[58, 6, '…'], [90, 40, '…'], [76, 25, '…']], ans: [[52], [50], [51]] },
        ] },
      {
        type: 'word', bai: 4, point: 0, level: 3,
        text: 'Đàn vịt có 64 con, đàn gà có 41 con. Hỏi đàn gà kém đàn vịt bao nhiêu con?',
        given: ['Đàn vịt có 64 con.', 'Đàn gà có 41 con.'],
        ask: 'Đàn gà kém đàn vịt bao nhiêu con?',
        hint: 'Muốn biết số bé kém số lớn bao nhiêu, ta lấy số lớn trừ số bé.',
        sentence: ['Đàn gà', 'kém đàn vịt', 'số con', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 64, op: '−', b: 41, result: 23, unit: 'con' },
        units: ['con', 'đàn', 'quả trứng'],
      },
      { type: 'fill', bai: [1, 2], point: 2, level: 3,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: 'Các số 47, 74, 70, 44 xếp theo thứ tự từ bé đến lớn: …, …, …, …', ans: [44, 47, 70, 74] },
          { t: 'Số liền sau của số lớn nhất có hai chữ số là …', ans: 100 },
        ] },
    ] },
  ],
};
