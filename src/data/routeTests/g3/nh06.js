/** Kiểm tra nhanh 6: Bài 19–22 Vở BT Toán 3 (hình tam giác, hình tứ giác, hình chữ nhật, hình vuông; vẽ hình; khối lập phương, khối hộp chữ nhật). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { geo, polys, solids } from './art.js';

const shape = (pts) => polys([{ pts }], { w: 80, h: 70, width: 104 });

export default {
  id: 'l3-nh-06',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 6',
  short: 'Nhanh 6',
  after: { book: 'workbook', units: '19-22' },
  desc: 'Hình tam giác, hình tứ giác, hình chữ nhật, hình vuông; vẽ hình; khối lập phương, khối hộp chữ nhật',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: A hình chữ nhật (4 góc vuông, cạnh không bằng nhau), C hình thoi (4 cạnh bằng nhau, góc không vuông), D hình tứ giác thường.
      { type: 'mc', bai: 19, point: 3, level: 1,
        prompt: 'Hình nào là hình vuông?',
        options: [
          shape([[5, 18], [75, 18], [75, 52], [5, 52]]),
          shape([[15, 10], [65, 10], [65, 60], [15, 60]]),
          shape([[40, 8], [75, 35], [40, 62], [5, 35]]),
          shape([[22, 12], [56, 12], [74, 58], [6, 58]]),
        ], ans: 1 },
      // Com-pa mở rộng bằng bán kính = 6 : 2 = 3 cm. Nhiễu: lấy luôn đường kính (6 cm), nhân 2 thay vì chia 2 (12 cm).
      { type: 'mc', bai: 20, point: 1, level: 1,
        prompt: 'Muốn vẽ hình tròn tâm O có đường kính 6 cm, em mở com-pa rộng:',
        options: ['6 cm', '3 cm', '12 cm'], ans: 1 },
      // Hình chữ nhật MNPQ: MN = QP = 6 cm, NP = MQ = 3 cm (hình vẽ 30 px = 1 cm).
      // Ý sai: nhầm MQ là cạnh dài; 4 góc vuông nên tưởng là hình vuông.
      { type: 'tf', bai: 19, point: 2, level: 1,
        prompt: 'Cho hình chữ nhật MNPQ. Đúng ghi Đ, sai ghi S:',
        fig: geo({ pts: { M: [40, 34], N: [220, 34], P: [220, 124], Q: [40, 124] },
          segs: ['MN', 'NP', 'PQ', 'QM'], lens: { MN: '6 cm', NP: '3 cm' },
          pos: { M: 'nw', N: 'ne', P: 'se', Q: 'sw' }, w: 260, h: 150 }),
        items: ['Hình MNPQ có 4 góc vuông.', 'Cạnh QP dài 6 cm.', 'Cạnh MQ dài 6 cm.', 'Hình MNPQ là hình vuông.'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Bé hay đếm thiếu các đỉnh, cạnh bị khuất (đếm 7 đỉnh, 9 cạnh, 3 mặt nhìn thấy).
      { type: 'table', bai: 21, point: 3, level: 2,
        prompt: 'Viết số thích hợp vào ô trống:',
        fig: solids(['cube', 'box']),
        head: ['Khối', 'Số đỉnh', 'Số cạnh', 'Số mặt'],
        rows: [['Khối lập phương', '…', '…', '…'], ['Khối hộp chữ nhật', '…', '…', '…']],
        ans: [[8, 12, 6], [8, 12, 6]] },
      // 3 hình chữ nhật nhỏ, 2 hình ghép từ 2 hình nhỏ, 1 hình ghép từ 3 hình nhỏ: 6 hình.
      // Các hình là 70 × 110, 140 × 110, 210 × 110: không có hình vuông. Bé hay chỉ đếm 3 hoặc 4.
      { type: 'fill', bai: 19, point: 4, level: 3,
        prompt: 'Hình bên có bao nhiêu hình chữ nhật?',
        fig: polys([
          { pts: [[10, 10], [80, 10], [80, 120], [10, 120]] },
          { pts: [[80, 10], [150, 10], [150, 120], [80, 120]] },
          { pts: [[150, 10], [220, 10], [220, 120], [150, 120]] },
        ], { w: 230, h: 130, width: 220 }),
        items: [{ t: 'Có … hình chữ nhật.', ans: 6 }] },
    ] },
  ],
};
