/** Kiểm tra nhanh 3: Bài 7–9 Toán 4 (đo góc, đơn vị đo góc; góc nhọn, góc tù, góc bẹt). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { protractor, angles, clock } from './art.js';

export default {
  id: 'l4-nh-03',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 3',
  short: 'Nhanh 3',
  after: { book: 'tool4', units: '7-9' },
  desc: 'Đo góc, đơn vị đo góc; góc nhọn, góc tù, góc bẹt',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Cạnh OA ở vạch 0°, cạnh OB ở vạch 50°. Nhiễu: đếm từ đầu bên trái thước (130°),
      // đọc theo số ghi gần nhất (60°), đếm vạch nhỏ sai (45°).
      { type: 'mc', bai: 7, point: 1, level: 1,
        prompt: 'Dùng thước đo góc như hình. Góc đỉnh O, cạnh OA, OB có số đo là:',
        fig: protractor(50),
        options: ['130°', '50°', '60°', '45°'], ans: 1 },
      // Bé hơn 90° là góc nhọn, bằng 90° là góc vuông, từ hơn 90° đến dưới 180° là góc tù, 180° là góc bẹt.
      { type: 'match', bai: 8, point: 0, level: 1,
        prompt: 'Nối số đo góc với tên của góc:',
        left: ['35°', '90°', '140°', '180°'],
        right: ['Góc tù', 'Góc nhọn', 'Góc bẹt', 'Góc vuông'],
        ans: [1, 3, 0, 2] },
      // Góc 2 (150°) gần thẳng nên dễ bị nhầm là góc bẹt; góc bẹt bằng hai góc vuông.
      { type: 'tf', bai: 8, point: 1, level: 1,
        prompt: 'Quan sát hình. Đúng ghi Đ, sai ghi S:',
        fig: angles([
          { v: 'O', a: 'A', b: 'B', deg: 180, label: 'Góc 1' },
          { v: 'M', a: 'N', b: 'P', deg: 150, label: 'Góc 2' },
        ], { cell: 180 }),
        items: ['Góc 1 là góc bẹt.', 'Góc 2 là góc bẹt.', 'Góc 1 bằng hai góc vuông.', 'Góc 2 là góc tù.'],
        ans: ['Đ', 'S', 'Đ', 'Đ'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Đọc số đo ở cạnh thứ hai khi cạnh thứ nhất nằm trên vạch 0°: 110°, 35°.
      { type: 'fill', bai: 7, point: 1, level: 2,
        prompt: 'Đọc số đo của mỗi góc rồi viết vào chỗ chấm:',
        items: [
          { t: 'Góc đỉnh O, cạnh OM, ON có số đo là …°.', ans: 110, fig: protractor(110, { names: ['O', 'M', 'N'] }) },
          { t: 'Góc đỉnh I, cạnh IP, IQ có số đo là …°.', ans: 35, fig: protractor(35, { names: ['I', 'P', 'Q'] }) },
        ] },
      // Kim giờ và kim phút: 2 giờ là 60° (nhọn), 9 giờ là 90° (vuông), 4 giờ là 120° (tù), 6 giờ là 180° (bẹt).
      { type: 'fill', bai: 8, point: 0, level: 3,
        prompt: 'Kim giờ và kim phút của đồng hồ tạo thành góc gì? Chọn nhọn, vuông, tù hoặc bẹt:',
        items: [
          { t: 'Lúc 2 giờ: góc …', ans: 'nhọn', choices: ['nhọn', 'vuông', 'tù', 'bẹt'], fig: clock(2, 0, { size: 110 }) },
          { t: 'Lúc 9 giờ: góc …', ans: 'vuông', choices: ['nhọn', 'vuông', 'tù', 'bẹt'], fig: clock(9, 0, { size: 110 }) },
          { t: 'Lúc 4 giờ: góc …', ans: 'tù', choices: ['nhọn', 'vuông', 'tù', 'bẹt'], fig: clock(4, 0, { size: 110 }) },
          { t: 'Lúc 6 giờ: góc …', ans: 'bẹt', choices: ['nhọn', 'vuông', 'tù', 'bẹt'], fig: clock(6, 0, { size: 110 }) },
        ] },
    ] },
  ],
};
