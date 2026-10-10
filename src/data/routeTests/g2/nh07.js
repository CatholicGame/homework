/** Kiểm tra nhanh 7: Bài 25–28 Vở BT Toán 2 (điểm, đoạn thẳng, ba điểm thẳng hàng, đường gấp khúc, hình tứ giác, vẽ đoạn thẳng). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { geo, polys, ruler } from './art.js';

export default {
  id: 'l2-nh-07',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 7',
  short: 'Nhanh 7',
  after: { book: 'workbook2', units: '25-28' },
  desc: 'Điểm, đoạn thẳng, ba điểm thẳng hàng, đường gấp khúc, hình tứ giác, vẽ đoạn thẳng',
  time: 15,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // M, N, P cùng nằm trên một đường thẳng (không vẽ đường thẳng, bé đặt thước để thử).
      { type: 'mc', bai: 25, point: 3, level: 1,
        prompt: 'Ba điểm nào thẳng hàng?',
        fig: geo({ pts: { M: [40, 100], N: [140, 70], P: [240, 40], Q: [150, 125] }, pos: { Q: 's' }, h: 150 }),
        options: ['M, N, Q', 'M, N, P', 'N, P, Q', 'M, P, Q'], ans: 1 },
      // Đoạn thẳng bắt đầu ở vạch 2. Nhiễu: đọc vạch cuối (8 cm), đọc vạch đầu (2 cm), đếm vạch thừa (7 cm).
      { type: 'mc', bai: 25, point: 1, level: 1,
        prompt: 'Đoạn thẳng AB dài mấy xăng-ti-mét?',
        fig: ruler(6, { from: 2, cm: 10 }),
        options: ['8 cm', '6 cm', '2 cm', '7 cm'], ans: 1 },
      // Nhiễu: chỉ cộng hai đoạn (8 cm, 9 cm), lấy số đoạn thẳng (3 cm).
      { type: 'mc', bai: 26, point: 1, level: 1,
        prompt: 'Độ dài đường gấp khúc ABCD là:',
        fig: geo({ pts: { A: [30, 110], B: [100, 40], C: [190, 110], D: [270, 50] }, segs: ['AB', 'BC', 'CD'], lens: { AB: '5 cm', BC: '3 cm', CD: '4 cm' }, pos: { A: 's', C: 's' } }),
        options: ['8 cm', '12 cm', '9 cm', '3 cm'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'draw', bai: 27, point: 0, level: 2,
        items: [
          { prompt: 'a) Vẽ đoạn thẳng MN dài 7 cm.', name: 'MN', len: 7 },
          { prompt: 'b) Vẽ đoạn thẳng PQ dài hơn đoạn thẳng MN 2 cm.', name: 'PQ', len: 9 },
        ] },
      // Hai hình tứ giác nhỏ và hình tứ giác lớn ghép từ cả hai: 3 hình. Bé hay chỉ đếm 2.
      { type: 'fill', bai: 26, point: 2, level: 3,
        prompt: 'Hình bên có mấy hình tứ giác?',
        fig: polys([
          { pts: [[10, 10], [110, 10], [110, 100], [10, 100]], color: '#e0f2fe' },
          { pts: [[110, 10], [250, 10], [250, 100], [110, 100]], color: '#e0f2fe' },
        ], { w: 260, h: 110, width: 220 }),
        items: [{ t: 'Có … hình tứ giác.', ans: 3 }] },
    ] },
  ],
};
