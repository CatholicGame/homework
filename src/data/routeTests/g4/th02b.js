/** Kiểm tra tổng hợp 2 (Đề 2): Bài 7–12 Toán 4 (Nhanh 3 + Nhanh 4, ôn Bài 1–6). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { protractor, angles, geo } from './art.js';

/** Thêm chữ (số đo góc) và dấu góc vuông lên một hình SVG đã vẽ. */
const withText = (fig, list, extra = '') => fig.replace('</svg>', extra + list.map(([x, y, t]) =>
  `<text x="${x}" y="${y}" font-size="14" font-weight="700" fill="#dc2626" text-anchor="middle">${t}</text>`).join('') + '</svg>');

export default {
  id: 'l4-th-02b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 2 (Đề 2)',
  short: 'Tổng hợp 2 · Đề 2',
  after: { book: 'tool4', units: '7-12' },
  desc: 'Đọc số đo góc; nhận ra góc tù; số 1 000 000; giá trị chữ số theo hàng; hàng và lớp triệu; ôn tính nhẩm, đặt tính',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Cạnh MN ở vạch 0°, cạnh MP ở vạch 130° (giữa vạch số 120 và 140). Nhiễu: đọc vòng số ngược (50°), đọc lệch một vạch (120°, 140°).
      { type: 'mc', bai: 7, point: 1, level: 1,
        prompt: 'Góc đỉnh M, cạnh MN, MP có số đo là:',
        fig: protractor(130, { names: ['M', 'N', 'P'] }),
        options: ['130°', '50°', '120°', '140°'], ans: 0 },
      // Góc 1 nhọn (50°), góc 2 tù (125°), góc 3 vuông, góc 4 bẹt. Nhiễu: chọn góc nhọn, góc vuông, góc bẹt (nghĩ cứ lớn hơn góc vuông là tù).
      { type: 'mc', bai: 8, point: 0, level: 1,
        prompt: 'Trong các góc dưới đây, góc nào là góc tù?',
        fig: angles([{ v: 'O', deg: 50, label: 'Góc 1' }, { v: 'I', deg: 125, label: 'Góc 2' }, { v: 'K', deg: 90, label: 'Góc 3' }, { v: 'H', deg: 180, label: 'Góc 4' }], { cell: 160 }),
        options: ['Góc 2', 'Góc 1', 'Góc 3', 'Góc 4'], ans: 0 },
      // Ý sai: số liền sau của 99 999 là 100 000 (viết thừa chữ số 0); 100 000 là số bé nhất có sáu chữ số, không phải năm chữ số.
      { type: 'tf', bai: 10, point: 2, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['1 000 000 = 10 trăm nghìn.', '999 999 là số lớn nhất có sáu chữ số.', 'Số liền sau của 99 999 là 1 000 000.', '100 000 là số bé nhất có năm chữ số.'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // 806 457: chữ số 6 ở hàng nghìn. Nhiễu: lấy chữ số (6), nhầm hàng trăm (600), nhầm hàng chục nghìn (60 000).
      { type: 'mc', bai: 11, point: 1, level: 1,
        prompt: 'Trong số 806 457, chữ số 6 có giá trị là:',
        options: ['6 000', '6', '600', '60 000'], ans: 0 },
      // 30 405 000 có tám chữ số, chữ số 3 ở hàng chục triệu. Nhiễu: đếm thiếu một chữ số (hàng triệu), đếm thừa (hàng trăm triệu), chỉ nhìn "30 405" (hàng chục nghìn).
      { type: 'mc', bai: 12, point: 2, level: 2,
        prompt: 'Trong số 30 405 000, chữ số 3 thuộc hàng nào?',
        options: ['Hàng chục triệu', 'Hàng triệu', 'Hàng trăm triệu', 'Hàng chục nghìn'], ans: 0 },
      // Ôn tính nhẩm số tròn nghìn, tròn chục nghìn (Bài 2), cần khi đổi hàng và lớp: 90 000, 50 000, 24 000, 20 000.
      { type: 'match', bai: 2, point: 2, level: 2, review: true,
        prompt: 'Tính nhẩm rồi nối mỗi phép tính với kết quả đúng:',
        left: ['50 000 + 40 000', '70 000 − 20 000', '4 000 × 6', '80 000 : 4'],
        right: ['24 000', '90 000', '20 000', '50 000'],
        ans: [1, 3, 0, 2] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Ôn đặt tính (Bài 2): cộng, trừ có nhớ, nhân, chia số có năm chữ số.
      { type: 'calc', bai: 2, point: 1, level: 1, col: true, review: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['63 725 + 28 486', '81 000 − 36 459', '14 609 × 6', '95 830 : 5'] },
      // 10 triệu = 1 chục triệu, 10 chục triệu = 1 trăm triệu, 10 trăm nghìn = 1 triệu.
      { type: 'fill', bai: 12, point: 0, level: 2,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: '3 chục triệu = … triệu', ans: [30] },
          { t: '5 trăm triệu = … chục triệu', ans: [50] },
          { t: '40 000 000 = … chục triệu', ans: [4] },
          { t: '2 triệu = … trăm nghìn', ans: [20] },
        ] },
      // Số lớn nhất: chữ số lớn đặt ở hàng cao (865 310). Số bé nhất: chữ số 0 không đứng đầu (103 568, không phải 013 568).
      { type: 'fill', bai: 10, point: 1, level: 3,
        prompt: 'Dùng cả sáu chữ số 0, 3, 5, 8, 1, 6 (mỗi chữ số dùng một lần) để viết số có sáu chữ số.',
        items: [
          { t: 'Số lớn nhất viết được là: …', ans: [865310] },
          { t: 'Số bé nhất viết được là: …', ans: [103568] },
        ] },
      // Góc AOC là góc vuông (90°): góc BOC = 90° − 35° = 55°, bé hơn 90° nên là góc nhọn.
      { type: 'fill', bai: 7, point: 0, level: 3,
        prompt: 'Góc AOC là góc vuông. Góc AOB có số đo 35°.',
        fig: withText(geo({ pts: { O: [60, 140], A: [280, 140], C: [60, 12], B: [183, 54] }, segs: ['OA', 'OC', 'OB'],
          pos: { O: 'sw', A: 's', C: 'e', B: 'ne' }, w: 310, h: 165 }), [[118, 130, '35°'], [86, 98, '?']],
          '<path d="M72 140 V128 H60" fill="none" stroke="#dc2626" stroke-width="1.8"/>'),
        items: [
          { t: 'Góc BOC có số đo là … °', ans: [55] },
          { t: 'Góc BOC là góc …', ans: ['nhọn'], choices: ['nhọn', 'vuông', 'tù', 'bẹt'] },
        ] },
    ] },
  ],
};
