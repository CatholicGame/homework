/** Kiểm tra nhanh 8: Bài 27–32 Toán 4 (hai đường thẳng vuông góc, song song; hình bình hành, hình thoi). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { geo } from './art.js';

// Dấu góc vuông (ô vuông nhỏ đỏ) ở đỉnh [x, y], hai cạnh theo hướng u, v (vectơ đơn vị), chèn vào hình geo.
const square = (x, y, [ux, uy], [vx, vy], s = 12) =>
  `<path d="M${x + ux * s} ${y + uy * s} L${x + (ux + vx) * s} ${y + (uy + vy) * s} L${x + vx * s} ${y + vy * s}" fill="none" stroke="#dc2626" stroke-width="1.8"/>`;
const withMarks = (svg, marks) => svg.replace('</svg>', `${marks.join('')}</svg>`);

// Một hình tứ giác nhỏ làm phương án trắc nghiệm.
const quad = (pts) => `<svg viewBox="0 0 120 90" width="110" xmlns="http://www.w3.org/2000/svg"><path d="M${pts.map(p => p.join(' ')).join(' L')} Z" fill="#e0f2fe" stroke="#1f2937" stroke-width="2.4" stroke-linejoin="round"/></svg>`;

export default {
  id: 'l4-nh-08',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 8',
  short: 'Nhanh 8',
  after: { book: 'tool4', units: '27-32' },
  desc: 'Hai đường thẳng vuông góc, song song; hình bình hành, hình thoi',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Hai đường thẳng vuông góc tạo thành 4 góc vuông chung đỉnh O. Nhiễu: chỉ đếm góc có đánh dấu (1),
      // chỉ đếm hai góc phía trên (2), quên một góc (3).
      { type: 'mc', bai: 27, point: 0, level: 1,
        prompt: 'Đường thẳng AB vuông góc với đường thẳng CD tại O. Hai đường thẳng đó tạo thành mấy góc vuông chung đỉnh O?',
        fig: withMarks(geo({ pts: { A: [40, 80], B: [260, 80], C: [150, 18], D: [150, 142], O: [150, 80] }, segs: ['AB', 'CD'], pos: { A: 'w', B: 'e', C: 'e', D: 'e', O: 'sw' }, h: 160 }),
          [square(150, 80, [1, 0], [0, -1])]),
        options: ['1 góc vuông', '2 góc vuông', '3 góc vuông', '4 góc vuông'], ans: 3 },
      // Hình chữ nhật ABCD: AB song song DC, AD song song BC. Ý sai: hai cạnh chung đỉnh (AB và AD, DC và BC)
      // vuông góc với nhau chứ không song song.
      { type: 'tf', bai: 29, point: 1, level: 1,
        prompt: 'Cho hình chữ nhật ABCD. Đúng ghi Đ, sai ghi S:',
        fig: geo({ pts: { A: [50, 30], B: [250, 30], C: [250, 120], D: [50, 120] }, segs: ['AB', 'BC', 'CD', 'DA'], pos: { A: 'nw', B: 'ne', C: 'se', D: 'sw' }, h: 145 }),
        items: ['AB song song với DC.', 'AB song song với AD.', 'AD song song với BC.', 'DC song song với BC.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Hình thoi có bốn cạnh bằng nhau. Nhiễu: hình bình hành có hai cạnh kề không bằng nhau,
      // hình chữ nhật, hình thang (chỉ một cặp cạnh song song).
      { type: 'mc', bai: 31, point: 1, level: 1,
        prompt: 'Hình nào dưới đây là hình thoi?',
        options: [
          quad([[10, 75], [80, 75], [110, 20], [40, 20]]),
          quad([[10, 20], [110, 20], [110, 75], [10, 75]]),
          quad([[60, 5], [95, 45], [60, 85], [25, 45]]),
          quad([[35, 20], [85, 20], [112, 75], [8, 75]]),
        ], ans: 2 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Hình thang vuông ABCD: góc A, góc D vuông nên AD vuông góc với AB và DC; góc C nhọn nên BC không vuông góc với DC.
      { type: 'fill', bai: 27, point: 1, level: 2,
        prompt: 'Dùng ê ke kiểm tra rồi viết vào chỗ chấm:',
        fig: withMarks(geo({ pts: { A: [50, 30], B: [170, 30], C: [260, 120], D: [50, 120] }, segs: ['AB', 'BC', 'CD', 'DA'], pos: { A: 'nw', B: 'ne', C: 'se', D: 'sw' }, h: 145 }),
          [square(50, 30, [1, 0], [0, 1]), square(50, 120, [1, 0], [0, -1])]),
        items: [
          { t: 'Cạnh AD vuông góc với cạnh … và cạnh …', ans: ['AB', 'DC'], choices: ['AB', 'BC', 'DC'], anyOrder: true },
          { t: 'Cạnh BC có vuông góc với cạnh DC không? …', ans: 'Không', choices: ['Có', 'Không'] },
        ] },
      // Hình bình hành có các cạnh đối diện bằng nhau: DC = AB = 25 m, AD = BC = 18 m; 25 + 18 + 25 + 18 = 86 m.
      { type: 'fill', bai: 31, point: 0, level: 3,
        prompt: 'Bác Tư rào xung quanh một mảnh đất hình bình hành ABCD có cạnh AB dài 25 m, cạnh BC dài 18 m. Hỏi bác Tư cần bao nhiêu mét lưới để rào?',
        fig: geo({ pts: { A: [70, 30], B: [270, 30], C: [230, 120], D: [30, 120] }, segs: ['AB', 'BC', 'CD', 'DA'], lens: { AB: '25 m', BC: '18 m' }, pos: { A: 'nw', B: 'ne', C: 'se', D: 'sw' }, h: 145 }),
        items: [
          { t: 'Cạnh DC dài … m, cạnh AD dài … m.', ans: [25, 18] },
          { t: 'Bác Tư cần số mét lưới là: 25 + 18 + 25 + 18 = … (m)', ans: 86 },
        ] },
    ] },
  ],
};
