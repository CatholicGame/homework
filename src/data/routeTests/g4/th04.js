/** Kiểm tra tổng hợp 4 (Đề 1): Bài 22–32 Toán 4 (Nhanh 7 + Nhanh 8, ôn Bài 1–21). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { geo, angles, sumDiff } from './art.js';

/** Các hình phẳng xếp thành hàng, tên "Hình 1", "Hình 2"… dưới mỗi hình. list = [[[x, y], …], …] trong ô 110 × 90. */
function shapes(list, { cell = 110 } = {}) {
  const body = list.map((pts, i) => {
    const d = `M${pts.map(([x, y]) => `${x + i * cell} ${y}`).join(' L')} Z`;
    return `<path d="${d}" fill="#e0f2fe" stroke="#1f2937" stroke-width="2.2" stroke-linejoin="round"/>`
      + `<text x="${i * cell + cell / 2}" y="108" font-size="14" font-weight="700" fill="#475569" text-anchor="middle">Hình ${i + 1}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${list.length * cell} 116" width="${Math.min(list.length * cell, 440)}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

export default {
  id: 'l4-th-04',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 4 (Đề 1)',
  short: 'Tổng hợp 4 · Đề 1',
  after: { book: 'tool4', units: '22-32' },
  desc: 'Cộng, trừ các số có nhiều chữ số; tính chất giao hoán; tổng và hiệu; hai đường thẳng vuông góc, song song; hình thoi; ôn góc nhọn, tìm thành phần',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Giao hoán: đổi chỗ hai số hạng, tổng không đổi. Nhiễu: chép lại số hạng đã có (3 816), điền luôn tổng (8 541).
      { type: 'mc', bai: 24, point: 0, level: 1,
        prompt: 'Số thích hợp điền vào chỗ chấm: 4 725 + 3 816 = 3 816 + …',
        options: ['4 725', '3 816', '8 541'], ans: 0 },
      // Hai đường thẳng vuông góc tạo thành 4 góc vuông chung đỉnh O. Nhiễu: chỉ đếm góc ở một phía (2), chỉ thấy một góc (1), đếm thiếu (3).
      { type: 'mc', bai: 27, point: 0, level: 1,
        prompt: 'Đường thẳng AB vuông góc với đường thẳng CD tại O. Hai đường thẳng đó tạo thành mấy góc vuông chung đỉnh O?',
        fig: geo({ pts: { A: [40, 80], B: [260, 80], C: [150, 14], D: [150, 146], O: [150, 80] }, segs: ['AB', 'CD'],
          pos: { A: 'w', B: 'e', C: 'e', D: 'e', O: 'se' }, w: 300, h: 160 }),
        options: ['4', '2', '1', '3'], ans: 0 },
      // Hình chữ nhật: cạnh đối diện song song. Ý sai: AB và AD cắt nhau tại A (vuông góc), BC và DC cắt nhau tại C.
      { type: 'tf', bai: 29, point: 1, level: 1,
        prompt: 'Cho hình chữ nhật ABCD. Đúng ghi Đ, sai ghi S:',
        fig: geo({ pts: { A: [40, 30], B: [260, 30], C: [260, 120], D: [40, 120] }, segs: ['AB', 'BC', 'CD', 'DA'],
          pos: { C: 's', D: 's' }, w: 300, h: 150 }),
        items: ['AB song song với DC.', 'AD song song với BC.', 'AB song song với AD.', 'BC song song với DC.'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // Hình 3 có bốn cạnh bằng nhau. Nhiễu: hình bình hành (cạnh đối diện bằng nhau nhưng hai cạnh kề không bằng nhau), hình chữ nhật, hình thang.
      { type: 'mc', bai: 31, point: 1, level: 1,
        prompt: 'Hình nào dưới đây là hình thoi?',
        fig: shapes([
          [[5, 72], [75, 72], [105, 28], [35, 28]],
          [[10, 25], [100, 25], [100, 75], [10, 75]],
          [[55, 18], [100, 48], [55, 78], [10, 48]],
          [[10, 75], [100, 75], [75, 25], [35, 25]],
        ]),
        options: ['Hình 3', 'Hình 1', 'Hình 2', 'Hình 4'], ans: 0 },
      // Số lớn = (90 + 16) : 2 = 53. Nhiễu: số bé (37), quên chia 2 (106), lấy tổng trừ hiệu (74).
      { type: 'mc', bai: 25, point: 0, level: 2,
        prompt: 'Tổng của hai số là 90, hiệu của hai số là 16. Số lớn là:',
        fig: sumDiff({ sum: '90', diff: '16', small: 0.7 }),
        options: ['53', '37', '106', '74'], ans: 0 },
      // Ôn góc nhọn (Bài 8), cần để nhận ra góc vuông của hai đường thẳng vuông góc. Góc 40° và 70° là góc nhọn.
      // Nhiễu: đếm cả góc vuông (3), chỉ đếm góc nhỏ nhất (1), đếm tất cả (4).
      { type: 'mc', bai: 8, point: 0, level: 2, review: true,
        prompt: 'Trong các góc dưới đây, có mấy góc nhọn?',
        fig: angles([{ v: 'O', deg: 40, label: 'Góc 1' }, { v: 'I', deg: 100, label: 'Góc 2' }, { v: 'K', deg: 70, label: 'Góc 3' }, { v: 'H', deg: 90, label: 'Góc 4' }]),
        options: ['2', '3', '1', '4'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [22, 23], point: 0, level: 1, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: [{ t: '254 638 + 179 485', ans: 434123 }, { t: '708 152 + 96 379', ans: 804531 }, { t: '830 500 − 274 836', ans: 555664 }, { t: '5 041 207 − 1 386 549', ans: 3654658 }] },
      // Ôn tìm số hạng, số bị trừ (Bài 2), dùng để thử lại phép cộng, phép trừ: 100 000 − 25 780 = 74 220; 31 605 + 48 395 = 80 000.
      { type: 'findx', bai: 2, point: 4, level: 2, review: true,
        prompt: 'Tìm x:',
        items: [{ t: 'x + 25 780 = 100 000', ans: 74220 }, { t: 'x − 48 395 = 31 605', ans: 80000 }] },
      {
        type: 'word', bai: 23, point: 1, level: 3,
        text: 'Năm 2024, một tỉnh trồng được 125 400 cây xanh. Năm 2025, tỉnh đó trồng được ít hơn năm 2024 là 18 750 cây. Hỏi năm 2025 tỉnh đó trồng được bao nhiêu cây xanh?',
        given: ['Năm 2024 trồng được 125 400 cây.', 'Năm 2025 trồng ít hơn 18 750 cây.'],
        ask: 'Năm 2025 tỉnh đó trồng được bao nhiêu cây xanh?',
        hint: '"Ít hơn" thì lấy số cây năm 2024 trừ đi 18 750.',
        sentence: ['Năm 2025', 'tỉnh đó trồng được', 'số cây xanh', 'là:'],
        decoys: ['cả hai năm'],
        expr: { a: 125400, op: '−', b: 18750, result: 106650, unit: 'cây' },
        units: ['cây', 'năm', 'tỉnh'],
      },
      // Lớp 4A (số lớn) = (156 + 18) : 2 = 87; lớp 4B = 87 − 18 = 69; thử lại 87 + 69 = 156.
      { type: 'fill', bai: 25, point: 1, level: 3,
        prompt: 'Hai lớp 4A và 4B thu gom được tất cả 156 kg giấy vụn. Lớp 4A thu gom được nhiều hơn lớp 4B 18 kg. Hỏi mỗi lớp thu gom được bao nhiêu ki-lô-gam giấy vụn?',
        fig: sumDiff({ sum: '156 kg', diff: '18 kg', names: ['Lớp 4A', 'Lớp 4B'], small: 0.79 }),
        items: [
          { t: 'Lớp 4A thu gom được: (156 + 18) : 2 = … (kg)', ans: [87] },
          { t: 'Lớp 4B thu gom được: … − 18 = … (kg)', ans: [87, 69] },
          { t: 'Thử lại: 87 + 69 = …', ans: [156] },
        ] },
    ] },
  ],
};
