/** Kiểm tra tổng hợp 4 (Đề 2): Bài 22–29 Toán 5 (Nhanh 7 + Nhanh 8, ôn Bài 1–21). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { triangle, trapezoid, round } from './art.js';

export default {
  id: 'l5-th-04b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 4 (Đề 2)',
  short: 'Tổng hợp 4 · Đề 2',
  after: { book: 'tool5', units: '22-29' },
  desc: 'Chia số thập phân cho số thập phân; chia cho 10, 100; nhận dạng và diện tích hình tam giác; diện tích hình thang; chu vi hình tròn; ôn cộng số thập phân, so sánh đơn vị đo diện tích',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Góc B là góc vuông nên ABC là tam giác vuông. Nhiễu: tam giác nhọn, tù, đều (nhầm tên các loại tam giác).
      { type: 'mc', bai: 25, point: 0, level: 1,
        prompt: 'Hình tam giác ABC dưới đây là:',
        fig: triangle({ kind: 'right' }),
        options: ['Tam giác nhọn', 'Tam giác vuông', 'Tam giác tù', 'Tam giác đều'], ans: 1 },
      // Chia cho 100: chuyển dấu phẩy sang trái hai chữ số: 0,485. Nhiễu: nhân 100 (4 850), chuyển một chữ số (4,85), chuyển ba chữ số (0,0485).
      { type: 'mc', bai: 23, point: 2, level: 1,
        prompt: '48,5 : 100 = ?',
        options: ['4 850', '4,85', '0,485', '0,0485'], ans: 2 },
      // d = 10 cm nên r = 5 cm; C = 3,14 × 10 = 31,4 cm. Ý sai: diện tích phải dùng bán kính: 3,14 × 5 × 5 = 78,5 cm², không dùng đường kính.
      { type: 'tf', bai: 27, point: 3, level: 1,
        prompt: 'Hình tròn tâm O có đường kính AB = 10 cm. Đúng ghi Đ, sai ghi S:',
        fig: round({ d: '10 cm' }),
        items: [
          'Bán kính của hình tròn là 5 cm.',
          'Chu vi hình tròn là 3,14 × 10 = 31,4 (cm).',
          'Diện tích hình tròn là 3,14 × 10 × 10 = 314 (cm²).',
          'Đường kính dài gấp 2 lần bán kính.',
        ],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // Ôn cộng số thập phân (Bài 19): (3,72 + 4,28) + 5,9 = 8 + 5,9 = 13,9. Nhiễu: coi 5,9 là 5,09 khi đặt tính (13,09),
      // quên nhớ (12,9), dấu phẩy sai chỗ (1,39).
      { type: 'mc', bai: 19, point: 3, level: 1, review: true,
        prompt: 'Giá trị của biểu thức 3,72 + 5,9 + 4,28 là:',
        options: ['13,09', '12,9', '1,39', '13,9'], ans: 3 },
      // 57 : 9,5 = 570 : 95 = 6. Nhiễu: không thêm 0 vào số bị chia (57 : 95 → 0,6), thêm thừa chữ số 0 (60), lấy phần nguyên rồi ghép bừa phần thập phân (6,5).
      { type: 'mc', bai: 22, point: 3, level: 2,
        prompt: 'Kết quả của phép chia 57 : 9,5 là:',
        options: ['0,6', '6', '60', '6,5'], ans: 1 },
      // Tam giác tù, chân đường cao ngoài đáy: S = 6 × 4 : 2 = 12 cm². Nhiễu: quên chia 2 (24), cộng đáy và cao (10), đơn vị độ dài (12 cm).
      { type: 'mc', bai: 25, point: 2, level: 2,
        prompt: 'Diện tích hình tam giác ABC dưới đây là:',
        fig: triangle({ kind: 'obtuse', base: '6 cm', h: '4 cm' }),
        options: ['24 cm²', '10 cm²', '12 cm²', '12 cm'], ans: 2 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Chia cho số tự nhiên (45,6 : 8), chia còn dư thì thêm 0 vào số dư (9,3 : 6 = 1,55), số chia là số thập phân (6,12 : 1,8 = 61,2 : 18).
      { type: 'calc', bai: 22, point: 1, level: 1, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['45,6 : 8', '9,3 : 6', '6,12 : 1,8'] },
      // Ôn so sánh đơn vị đo diện tích (Bài 16): 4 m² 5 dm² = 4,05 m² < 4,5 m²; 2,5 ha = 25 000 m²; 7 dm² = 700 cm² > 70 cm²; 1 km² = 100 ha < 1 000 ha.
      { type: 'compare', bai: 16, point: 1, level: 2, review: true,
        prompt: 'Điền dấu >, <, = thích hợp:',
        items: [
          { t: '4 m² 5 dm² □ 4,5 m²', ans: '<' },
          { t: '2,5 ha □ 25 000 m²', ans: '=' },
          { t: '7 dm² □ 70 cm²', ans: '>' },
          { t: '1 km² □ 1 000 ha', ans: '<' },
        ] },
      // Chu vi bánh xe 3,14 × 65 = 204,1 cm; 100 vòng: 204,1 × 100 = 20 410 cm = 204,1 m (chia 100).
      { type: 'fill', bai: [23, 27], point: 1, level: 3,
        prompt: 'Bánh xe đạp của Minh có đường kính 65 cm. Khi bánh xe lăn trên mặt đất 100 vòng thì xe đi được bao nhiêu mét?',
        items: [
          { t: 'Chu vi bánh xe: 3,14 × 65 = … (cm)', ans: [204.1] },
          { t: 'Lăn 100 vòng, xe đi được: … × 100 = … (cm)', ans: [204.1, 20410] },
          { t: 'Đổi: 20 410 cm = … m', ans: [204.1] },
        ] },
      // S = (120 + 80) × 75 : 2 = 7 500 m²; 7 500 : 100 = 75 (lần 100 m²); thóc 65 × 75 = 4 875 kg.
      { type: 'fill', bai: [26, 23], point: 2, level: 3,
        prompt: 'Một thửa ruộng hình thang có đáy lớn 120 m, đáy bé 80 m, chiều cao 75 m. Cứ 100 m² thu hoạch được 65 kg thóc. Hỏi thửa ruộng đó thu hoạch được bao nhiêu ki-lô-gam thóc?',
        fig: trapezoid({ top: '80 m', bottom: '120 m', h: '75 m', width: 260 }),
        items: [
          { t: 'Diện tích thửa ruộng: (120 + 80) × 75 : 2 = … (m²)', ans: [7500] },
          { t: '7 500 m² gấp 100 m² số lần là: 7 500 : 100 = … (lần)', ans: [75] },
          { t: 'Số thóc thu hoạch được: 65 × … = … (kg)', ans: [75, 4875] },
        ] },
    ] },
  ],
};
