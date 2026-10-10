/** Kiểm tra nhanh 5: Bài 16–18 Vở BT Toán 3 (trung điểm của đoạn thẳng; hình tròn, tâm, bán kính, đường kính; góc vuông). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { geo, circle, angles } from './art.js';

export default {
  id: 'l3-nh-05',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 5',
  short: 'Nhanh 5',
  after: { book: 'workbook', units: '16-18' },
  desc: 'Trung điểm của đoạn thẳng; hình tròn, tâm, bán kính, đường kính; góc vuông',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // AI = 3 cm, IM = 1 cm, MB = 4 cm: AM = MB = 4 cm. Hình vẽ 30 px = 1 cm.
      // Nhiễu: I nằm giữa A và B nhưng AI ≠ IB; K cách đều A và B (KA = KB) nhưng không nằm trên đoạn AB.
      { type: 'mc', bai: 16, point: 1, level: 1,
        prompt: 'Điểm nào là trung điểm của đoạn thẳng AB?',
        fig: geo({ pts: { A: [20, 70], I: [110, 70], M: [140, 70], B: [260, 70], K: [140, 24] },
          segs: ['AI', 'IM', 'MB'], lens: { AI: '3 cm', IM: '1 cm', MB: '4 cm' },
          pos: { A: 's', I: 's', M: 's', B: 's', K: 'e' }, w: 280, h: 100 }),
        options: ['Điểm I', 'Điểm M', 'Điểm K'], ans: 1 },
      // Góc 2 vuông (xoay 30°, không đánh dấu). Góc 1 là 60°, góc 3 là 130°.
      // Ý sai: góc 1 nhọn gần vuông; góc 3 tù.
      { type: 'tf', bai: 18, point: 2, level: 1,
        prompt: 'Dùng ê ke kiểm tra các góc dưới đây. Đúng ghi Đ, sai ghi S:',
        fig: angles([
          { v: 'O', a: 'A', b: 'B', deg: 60, label: 'Góc 1' },
          { v: 'I', a: 'C', b: 'D', deg: 90, turn: 30, mark: false, label: 'Góc 2' },
          { v: 'K', a: 'E', b: 'G', deg: 130, label: 'Góc 3' },
        ], { cell: 150 }),
        items: ['Góc 1 là góc vuông.', 'Góc 2 là góc vuông.', 'Góc 3 là góc vuông.'],
        ans: ['S', 'Đ', 'S'] },
      // AB đi qua tâm O (A ở 20°, B ở 200°): đường kính. OC: bán kính.
      { type: 'match', bai: 17, point: 1, level: 1,
        prompt: 'Nối cho đúng với hình tròn tâm O:',
        fig: circle({ pts: { A: 20, B: 200, C: 110 }, segs: ['AB', 'OC'] }),
        left: ['Điểm O', 'Đoạn thẳng OC', 'Đoạn thẳng AB'],
        right: ['bán kính', 'tâm', 'đường kính'],
        ans: [1, 0, 2] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Ý c làm ngược: biết một nửa, tìm cả đoạn.
      { type: 'fill', bai: 16, point: 2, level: 2,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: 'Đoạn thẳng AB dài 12 cm, M là trung điểm của AB. Đoạn thẳng AM dài … cm.', ans: 6 },
          { t: 'Đoạn thẳng CD dài 8 cm, I là trung điểm của CD. Đoạn thẳng ID dài … cm.', ans: 4 },
          { t: 'O là trung điểm của đoạn thẳng EG, OE dài 5 cm. Đoạn thẳng EG dài … cm.', ans: 10 },
        ] },
      // Góc vuông: đỉnh A, đỉnh D, đỉnh B (cạnh BA, BH), đỉnh H (cạnh HB, HD), đỉnh H (cạnh HB, HC): 5 góc.
      // Góc đỉnh B cạnh BA, BC và góc đỉnh C đều không vuông. Bé hay quên hai góc vuông ở H.
      { type: 'fill', bai: 18, point: 2, level: 3,
        prompt: 'Quan sát hình bên:',
        fig: geo({ pts: { A: [30, 24], B: [170, 24], C: [250, 124], D: [30, 124], H: [170, 124] },
          segs: ['AB', 'BC', 'CD', 'DA', 'BH'],
          pos: { A: 'nw', B: 'n', C: 'se', D: 'sw', H: 's' }, w: 280, h: 150 }),
        items: [
          { t: 'Hình bên có … góc vuông.', ans: 5 },
          { t: 'Góc đỉnh C, cạnh CB, CD là góc …', ans: 'không vuông', choices: ['vuông', 'không vuông'] },
        ] },
    ] },
  ],
};
