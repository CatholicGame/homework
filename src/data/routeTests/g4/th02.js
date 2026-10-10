/** Kiểm tra tổng hợp 2 (Đề 1): Bài 7–12 Toán 4 (Nhanh 3 + Nhanh 4, ôn Bài 1–6). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { protractor, clock, geo } from './art.js';

/** Thêm chữ (số đo góc) lên một hình SVG đã vẽ. */
const withText = (fig, list) => fig.replace('</svg>', list.map(([x, y, t]) =>
  `<text x="${x}" y="${y}" font-size="14" font-weight="700" fill="#dc2626" text-anchor="middle">${t}</text>`).join('') + '</svg>');

export default {
  id: 'l4-th-02',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 2 (Đề 1)',
  short: 'Tổng hợp 2 · Đề 1',
  after: { book: 'tool4', units: '7-12' },
  desc: 'Đo góc; góc nhọn, góc tù, góc bẹt; số có sáu chữ số; hàng và lớp; số đến lớp triệu; ôn số chẵn, đặt tính',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Cạnh OA ở vạch 0°, cạnh OB ở vạch 60°. Nhiễu: đọc vòng số ngược (120°), đoán là góc vuông (90°), đọc lệch một vạch 10° (50°).
      { type: 'mc', bai: 7, point: 1, level: 1,
        prompt: 'Góc đỉnh O, cạnh OA, OB có số đo là:',
        fig: protractor(60),
        options: ['60°', '120°', '90°', '50°'], ans: 0 },
      // Ý sai: nghĩ góc vuông là góc tù; góc bẹt bằng 180° chứ không phải 100°.
      { type: 'tf', bai: 8, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Góc 35° là góc nhọn.', 'Góc 90° là góc tù.', 'Góc 150° là góc tù.', 'Góc bẹt bằng 100°.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 3 trăm nghìn, 5 nghìn, 2 chục = 305 020. Nhiễu: viết liền các chữ số (352 000), đặt 5 vào hàng trăm (300 520), đặt 5 vào hàng chục nghìn (350 020).
      { type: 'mc', bai: 10, point: 1, level: 1,
        prompt: 'Số gồm 3 trăm nghìn, 5 nghìn và 2 chục viết là:',
        options: ['305 020', '352 000', '300 520', '350 020'], ans: 0 },
      // Đọc số đến lớp triệu theo từng lớp ba chữ số.
      { type: 'match', bai: 12, point: 1, level: 1,
        prompt: 'Nối mỗi số với cách đọc của số đó:',
        left: ['5 400 000', '45 000 000', '540 000', '4 050 000'],
        right: ['Năm trăm bốn mươi nghìn', 'Bốn triệu không trăm năm mươi nghìn', 'Năm triệu bốn trăm nghìn', 'Bốn mươi lăm triệu'],
        ans: [2, 3, 0, 1] },
      // Ôn số chẵn (Bài 3), cần cho số có nhiều chữ số. Nhiễu: số lớn nhất nhưng lẻ (99 999), số có sáu chữ số (100 000), chọn số toàn chữ số chẵn (88 888).
      { type: 'mc', bai: 3, point: 0, level: 2, review: true,
        prompt: 'Số chẵn lớn nhất có năm chữ số là:',
        options: ['99 998', '99 999', '100 000', '88 888'], ans: 0 },
      // Lúc 6 giờ hai kim nằm trên một đường thẳng: góc bẹt. Nhiễu: góc vuông (như lúc 3 giờ), góc tù, góc nhọn.
      { type: 'mc', bai: 8, point: 1, level: 2,
        prompt: 'Lúc 6 giờ, kim giờ và kim phút của đồng hồ tạo thành góc gì?',
        fig: clock(6, 0),
        options: ['Góc bẹt', 'Góc vuông', 'Góc tù', 'Góc nhọn'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Ôn đặt tính trong phạm vi 100 000 (Bài 2), các Bài sau đều dùng.
      { type: 'calc', bai: 2, point: 0, level: 1, col: true, review: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['38 465 + 46 728', '90 312 − 45 867', '16 207 × 5', '74 136 : 4'] },
      // Giá trị của chữ số 6 phụ thuộc vào hàng: trăm nghìn, nghìn, trăm, đơn vị.
      { type: 'table', bai: 11, point: 1, level: 2,
        prompt: 'Viết giá trị của chữ số 6 trong mỗi số vào ô trống:',
        head: ['Số', 'Giá trị của chữ số 6'],
        rows: [['613 250', '…'], ['246 019', '…'], ['390 682', '…'], ['158 406', '…']],
        ans: [[600000], [6000], [600], [6]] },
      // 8 993 082: lớp triệu 8, lớp nghìn 993, lớp đơn vị 082. Chữ số 9 ở hàng trăm nghìn có giá trị 900 000.
      { type: 'fill', bai: 12, point: 2, level: 3,
        prompt: 'Năm 2019, Thành phố Hồ Chí Minh có 8 993 082 người.',
        items: [
          { t: 'Số 8 993 082 gồm … triệu, … nghìn và … đơn vị.', ans: [8, 993, 82] },
          { t: 'Chữ số 9 ở hàng trăm nghìn có giá trị là …', ans: [900000] },
        ] },
      // Góc AOC là góc bẹt (180°): góc BOC = 180° − 65° = 115°, lớn hơn 90° nên là góc tù.
      { type: 'fill', bai: 8, point: 1, level: 3,
        prompt: 'Góc AOC là góc bẹt. Góc AOB có số đo 65°.',
        fig: withText(geo({ pts: { A: [30, 120], O: [160, 120], C: [290, 120], B: [118, 29] }, segs: ['AC', 'OB'],
          pos: { A: 's', O: 's', C: 's', B: 'n' }, w: 320, h: 150 }), [[128, 106, '65°'], [184, 98, '?']]),
        items: [
          { t: 'Góc BOC có số đo là … °', ans: [115] },
          { t: 'Góc BOC là góc …', ans: ['tù'], choices: ['nhọn', 'vuông', 'tù', 'bẹt'] },
        ] },
    ] },
  ],
};
