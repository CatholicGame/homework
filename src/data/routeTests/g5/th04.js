/** Kiểm tra tổng hợp 4 (Đề 1): Bài 22–29 Toán 5 (Nhanh 7 + Nhanh 8, ôn Bài 1–21). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { triangle, trapezoid, round } from './art.js';

export default {
  id: 'l5-th-04',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 4 (Đề 1)',
  short: 'Tổng hợp 4 · Đề 1',
  after: { book: 'tool5', units: '22-29' },
  desc: 'Chia số thập phân; nhân, chia với 10, 100 hoặc 0,1; 0,01; đường cao và diện tích hình tam giác; diện tích hình thang; chu vi, diện tích hình tròn; ôn nhân số thập phân, đơn vị đo diện tích',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhân với 100: chuyển dấu phẩy sang phải hai chữ số: 304,5. Nhiễu: chuyển một chữ số (30,45), bỏ dấu phẩy (3 045), chuyển sang trái (0,03045).
      { type: 'mc', bai: 23, point: 0, level: 1,
        prompt: '3,045 × 100 = ?',
        options: ['30,45', '304,5', '3 045', '0,03045'], ans: 1 },
      // AH vuông góc với đáy BC nên AH là đường cao. Nhiễu: cạnh bên AB, AC (không vuông góc với BC), chính đáy BC.
      { type: 'mc', bai: 25, point: 1, level: 1,
        prompt: 'Trong hình tam giác ABC dưới đây, đường cao ứng với đáy BC là:',
        fig: triangle({ kind: 'acute' }),
        options: ['AB', 'AC', 'AH', 'BC'], ans: 2 },
      // d = r × 2 = 3 × 2 = 6 cm. Nhiễu: lấy luôn bán kính (3 cm), chia 2 (1,5 cm), nhân 3 (9 cm).
      { type: 'mc', bai: 27, point: 0, level: 1,
        prompt: 'Hình tròn tâm O có bán kính OA = 3 cm. Đường kính của hình tròn đó là:',
        fig: round({ r: '3 cm' }),
        options: ['6 cm', '3 cm', '1,5 cm', '9 cm'], ans: 0 },
      // Ôn nhân số thập phân (Bài 21), cần cho diện tích hình tròn: 4 × 2 = 8, hai chữ số phần thập phân nên 0,08.
      // Nhiễu: tách một chữ số (0,8), không đặt dấu phẩy (8), tách ba chữ số (0,008).
      { type: 'mc', bai: 21, point: 3, level: 1, review: true,
        prompt: '0,4 × 0,2 = ?',
        options: ['0,8', '8', '0,08', '0,008'], ans: 2 },
      // 32 : 8 = 4, viết dấu phẩy; 2 : 8 không được, viết 0; 24 : 8 = 3: thương 4,03.
      // Nhiễu: quên viết 0 (4,3), viết thừa 0 (4,003), dấu phẩy sai chỗ (40,3).
      { type: 'mc', bai: 22, point: 2, level: 2,
        prompt: 'Kết quả của phép chia 32,24 : 8 là:',
        options: ['4,3', '4,03', '4,003', '40,3'], ans: 1 },
      // S = (5 + 9) × 4 : 2 = 28 cm². Nhiễu: quên chia 2 (56), nhân cả ba số (180), cộng cả ba số (18).
      { type: 'mc', bai: 26, point: 2, level: 2,
        prompt: 'Diện tích hình thang ABCD dưới đây là:',
        fig: trapezoid({ top: '5 cm', bottom: '9 cm', h: '4 cm' }),
        options: ['56 cm²', '180 cm²', '18 cm²', '28 cm²'], ans: 3 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Chia cho số tự nhiên (75,6 : 6), chia còn dư thì thêm 0 vào số dư (7,8 : 4 = 1,95), số chia là số thập phân (8,64 : 2,4 = 86,4 : 24).
      { type: 'calc', bai: 22, point: 0, level: 1, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['75,6 : 6', '7,8 : 4', '8,64 : 2,4'] },
      // Ôn đơn vị đo diện tích (Bài 16), cần khi tính diện tích hình: m², dm² gấp kém nhau 100 lần; 1 ha = 10 000 m²; 1 km² = 100 ha.
      { type: 'fill', bai: 16, point: 2, level: 2, review: true,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: '2 m² 7 dm² = … dm²', ans: [207] },
          { t: '45 dm² = … m²', ans: [0.45] },
          { t: '3 ha = … m²', ans: [30000] },
          { t: '150 ha = … km²', ans: [1.5] },
        ] },
      // Đổi 2,5 dm = 25 cm (cùng đơn vị) rồi S = 25 × 18 : 2 = 225 cm². Lỗi hay gặp: nhân 2,5 × 18 không đổi đơn vị.
      { type: 'fill', bai: 25, point: 3, level: 3,
        prompt: 'Một miếng bìa hình tam giác có đáy dài 2,5 dm, chiều cao 18 cm. Tính diện tích miếng bìa đó theo xăng-ti-mét vuông.',
        items: [
          { t: 'Đổi: 2,5 dm = … cm', ans: [25] },
          { t: 'Diện tích miếng bìa: … × 18 : 2 = … (cm²)', ans: [25, 225] },
        ] },
      // Bán kính 6 : 2 = 3 m; diện tích 3,14 × 3 × 3 = 28,26 m² (dùng bán kính); chu vi 3,14 × 6 = 18,84 m.
      { type: 'fill', bai: 27, point: 3, level: 3,
        prompt: 'Một bồn hoa hình tròn có đường kính 6 m. Tính diện tích bồn hoa và chiều dài hàng rào quây quanh bồn hoa (chu vi).',
        fig: round({ d: '6 m', size: 160 }),
        items: [
          { t: 'Bán kính bồn hoa: 6 : 2 = … (m)', ans: [3] },
          { t: 'Diện tích bồn hoa: 3,14 × … × … = … (m²)', ans: [3, 3, 28.26] },
          { t: 'Chiều dài hàng rào: 3,14 × 6 = … (m)', ans: [18.84] },
        ] },
    ] },
  ],
};
