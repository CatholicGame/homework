/** Kiểm tra tổng hợp 3 (Đề 2): Bài 15–24 Vở BT Toán 2 (Nhanh 5 + Nhanh 6, ôn Bài 1–14). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { balance, vessels } from './art.js';

export default {
  id: 'l2-th-03b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 3 (Đề 2)',
  short: 'Tổng hợp 3 · Đề 2',
  after: { book: 'workbook2', units: '15-24' },
  desc: 'Ki-lô-gam, lít; cộng, trừ có nhớ trong phạm vi 100; ôn bài toán nhiều hơn, bảng trừ qua 10',
  time: 35,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: nhầm sang lít (l), đơn vị đo độ dài (cm).
      { type: 'mc', bai: 15, point: 1, level: 1,
        prompt: 'Chọn đơn vị thích hợp: Bao gạo nặng 10 …',
        options: ['kg', 'l', 'cm'], ans: 0 },
      { type: 'mc', bai: 16, point: 0, level: 1,
        prompt: 'Đồ vật nào có nhiều nước nhất?',
        fig: vessels([{ kind: 'can', l: 5 }, { kind: 'xo', l: 10 }, { kind: 'chai', l: 2 }]),
        options: ['Cái can', 'Cái xô', 'Cái chai'], ans: 1 },
      // Ý sai: lấy 4 − 1 ở hàng đơn vị (61 − 24 = 43), quên trả 1 ở hàng chục (73 − 9 = 74).
      { type: 'tf', bai: [22, 23], point: 1, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: [{ col: '52 − 7', res: '45' }, { col: '61 − 24', res: '43' }, { col: '80 − 35', res: '45' }, { col: '73 − 9', res: '74' }],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: quên nhớ (63), viết cả 13 xuống (613), nhớ hai lần (83).
      { type: 'mc', bai: 20, point: 2, level: 1,
        prompt: 'Kết quả của phép tính 28 + 45 là:',
        options: ['73', '63', '613', '83'], ans: 0 },
      // Ôn bài toán nhiều hơn. Nhiễu: thấy hai số mà trừ (3), cộng sai lệch một (12).
      { type: 'mc', bai: 13, point: 0, level: 2, review: true,
        prompt: 'Hà có 8 bông hoa. Mai có nhiều hơn Hà 5 bông hoa. Mai có mấy bông hoa?',
        options: ['13', '3', '12'], ans: 0 },
      // Ôn bảng trừ (cần cho trừ có nhớ).
      { type: 'match', bai: 12, point: 0, level: 1, review: true,
        prompt: 'Nối mỗi phép tính với kết quả đúng:',
        left: ['11 − 6', '14 − 8', '12 − 9', '15 − 7'],
        right: ['3', '6', '8', '5'],
        ans: [3, 1, 0, 2] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [19, 22], point: 0, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['46 + 7', '8 + 65', '34 − 6', '91 − 5'] },
      { type: 'fill', bai: [15, 16], point: 3, level: 2,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: '35 kg − 8 kg = … kg', ans: 27 },
          { t: '17 l + 26 l = … l', ans: 43 },
          { t: '50 kg − 24 kg = … kg', ans: 26 },
        ] },
      {
        type: 'word', bai: 20, point: 1, level: 3,
        text: 'Buổi sáng cửa hàng bán được 38 kg cam, buổi chiều bán được 45 kg cam. Hỏi cả ngày cửa hàng bán được bao nhiêu ki-lô-gam cam?',
        given: ['Buổi sáng bán được 38 kg cam.', 'Buổi chiều bán được 45 kg cam.'],
        ask: 'Cả ngày cửa hàng bán được bao nhiêu ki-lô-gam cam?',
        hint: 'Muốn biết cả ngày bán được bao nhiêu, ta cộng số cam buổi sáng với số cam buổi chiều.',
        sentence: ['Cả ngày', 'cửa hàng bán được', 'số ki-lô-gam cam', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 38, op: '+', b: 45, result: 83, unit: 'kg' },
        units: ['kg', 'l', 'quả cam'],
      },
      // Cân thăng bằng: hộp quà + 1 kg = 5 kg + 2 kg = 7 kg, nên hộp quà nặng 6 kg.
      { type: 'fill', bai: 15, point: 2, level: 3,
        prompt: 'Cân đang thăng bằng. Hộp quà nặng mấy ki-lô-gam?',
        fig: balance([{ kind: 'hop', size: 52 }, 1], [5, 2]),
        items: [{ t: 'Hộp quà nặng … kg.', ans: 6 }] },
    ] },
  ],
};
