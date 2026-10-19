/** Kiểm tra nhanh 8: Bài 25–29 Toán 5 (diện tích hình tam giác, hình thang; chu vi và diện tích hình tròn). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { triangle, trapezoid, round } from './art.js';

export default {
  id: 'l5-nh-08',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 8',
  short: 'Nhanh 8',
  after: { book: 'tool5', units: '25-29' },
  desc: 'Diện tích hình tam giác, hình thang; chu vi và diện tích hình tròn',
  time: 30,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Tam giác vuông tại B: cạnh góc vuông AB vuông góc với đáy BC nên AB là đường cao. Nhiễu: cạnh huyền AC,
      // chính đáy BC, quen gọi đường cao là AH dù hình không có H.
      { type: 'mc', bai: 25, point: 1, level: 1,
        prompt: 'Hình tam giác ABC có góc vuông tại B. Đường cao ứng với đáy BC là:',
        fig: triangle({ kind: 'right' }),
        options: ['AC', 'AB', 'BC', 'AH'], ans: 1 },
      // S = (5 + 9) × 4 : 2 = 28 cm². Nhiễu: quên chia 2 (56), nhân cả ba số (180), cộng cả ba số (18).
      { type: 'mc', bai: 26, point: 2, level: 1,
        prompt: 'Diện tích hình thang ABCD là:',
        fig: trapezoid({ top: '5 cm', bottom: '9 cm', h: '4 cm' }),
        options: ['56 cm²', '180 cm²', '28 cm²', '18 cm²'], ans: 2 },
      // Đường kính AB = 10 cm, bán kính 10 : 2 = 5 cm; chu vi 3,14 × 10 = 31,4 cm (lấy 3,14 × 10 × 2 = 62,8 là nhân đôi đường kính).
      { type: 'tf', bai: 27, point: 1, level: 1,
        prompt: 'Quan sát hình tròn tâm O. Đúng ghi Đ, sai ghi S:',
        fig: round({ d: '10 cm' }),
        items: ['AB là một đường kính của hình tròn.', 'Bán kính của hình tròn là 5 cm.', 'Chu vi của hình tròn là 31,4 cm.', 'Chu vi của hình tròn là 62,8 cm.'],
        ans: ['Đ', 'Đ', 'Đ', 'S'] },
      // Tam giác có một góc tù là tam giác tù. Nhiễu: tam giác nhọn (ba góc nhọn), vuông (một góc vuông), đều (ba cạnh bằng nhau).
      { type: 'mc', bai: 25, point: 0, level: 1,
        prompt: 'Hình tam giác có một góc tù được gọi là:',
        options: ['Tam giác nhọn', 'Tam giác vuông', 'Tam giác tù', 'Tam giác đều'], ans: 2 },
      // d = r × 2 = 3 × 2 = 6 cm. Nhiễu: chia 2 (1,5), cộng thêm (9), lấy chu vi 3,14 × 3 (9,42).
      { type: 'mc', bai: 27, point: 0, level: 1,
        prompt: 'Hình tròn có bán kính 3 cm thì đường kính là:',
        options: ['1,5 cm', '6 cm', '9 cm', '9,42 cm'], ans: 1 },
      // S = 3,14 × 5 × 5 = 78,5 cm². Nhiễu: tính chu vi (31,4), 3,14 × 5 (15,7), 3,14 × 10 × 10 (314, dùng đường kính).
      { type: 'mc', bai: 27, point: 2, level: 2,
        prompt: 'Diện tích hình tròn có bán kính 5 cm là:',
        options: ['31,4 cm²', '78,5 cm²', '15,7 cm²', '314 cm²'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Tam giác tù: đường cao nằm ngoài, S = 12 × 7 : 2 = 42 cm². Đáy 2 dm, cao 15 cm: đổi 2 dm = 20 cm trước, S = 20 × 15 : 2 = 150 cm²
      // (lỗi hay gặp: lấy 2 × 15 : 2 = 15 vì không đổi đơn vị).
      { type: 'fill', bai: 25, point: 3, level: 2,
        prompt: 'Tính diện tích: a) hình tam giác ABC trong hình; b) hình tam giác có đáy 2 dm, chiều cao 15 cm.',
        fig: triangle({ kind: 'obtuse', base: '12 cm', h: '7 cm', width: 260 }),
        items: [
          { t: 'Diện tích tam giác ABC: 12 × 7 : 2 = … (cm²)', ans: [42] },
          { t: 'Đổi 2 dm = … cm. Diện tích: … × 15 : 2 = … (cm²)', ans: [20, 20, 150] },
        ] },
      // Diện tích dùng bán kính: r = 4 : 2 = 2 m; S = 3,14 × 2 × 2 = 12,56 m²; tiền cây giống 12,56 × 25 000 = 314 000 đồng.
      // Lỗi hay gặp: lấy luôn đường kính 3,14 × 4 × 4 = 50,24.
      { type: 'fill', bai: 27, point: 3, level: 3,
        prompt: 'Một bồn hoa hình tròn có đường kính 4 m. Mỗi mét vuông bồn hoa cần 25 000 đồng tiền mua cây giống. Hỏi trồng kín bồn hoa đó cần bao nhiêu tiền mua cây giống?',
        items: [
          { t: 'Bán kính bồn hoa: 4 : 2 = … (m)', ans: [2] },
          { t: 'Diện tích bồn hoa: 3,14 × 2 × 2 = … (m²)', ans: [12.56] },
          { t: 'Tiền mua cây giống: 12,56 × 25 000 = … (đồng)', ans: [314000] },
        ] },
      // S = (a + b) × h : 2: (12 + 8) × 5 : 2 = 50 cm²; (2,4 + 1,6) × 1,5 : 2 = 4 × 1,5 : 2 = 3 m².
      { type: 'fill', bai: 26, point: 2, level: 2,
        prompt: 'Tính diện tích hình thang có: a) đáy lớn 12 cm, đáy bé 8 cm, chiều cao 5 cm; b) đáy lớn 2,4 m, đáy bé 1,6 m, chiều cao 1,5 m.',
        items: [
          { t: 'a) (12 + 8) × 5 : 2 = … (cm²)', ans: [50] },
          { t: 'b) (2,4 + 1,6) × 1,5 : 2 = … (m²)', ans: [3] },
        ] },
      // Chiều cao 60 × {3/5} = 36 m; S = (60 + 40) × 36 : 2 = 1 800 m²; thóc 1 800 : 100 × 65 = 1 170 kg.
      { type: 'fill', bai: 26, point: 2, level: 3,
        prompt: 'Một thửa ruộng hình thang có đáy lớn 60 m, đáy bé 40 m, chiều cao bằng {3/5} đáy lớn. Trung bình cứ 100 m² ruộng thu hoạch được 65 kg thóc. Hỏi cả thửa ruộng thu hoạch được bao nhiêu ki-lô-gam thóc?',
        items: [
          { t: 'Chiều cao thửa ruộng: 60 × {3/5} = … (m)', ans: [36] },
          { t: 'Diện tích thửa ruộng: (60 + 40) × 36 : 2 = … (m²)', ans: [1800] },
          { t: 'Số thóc thu hoạch được: 1 800 : 100 × 65 = … (kg)', ans: [1170] },
        ] },
    ] },
  ],
};
