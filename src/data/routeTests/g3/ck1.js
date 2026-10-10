/** Kiểm tra cuối học kì I (Đề 1): Bài 1–44 Vở BT Toán 3 Tập Một (Nhanh 1 đến 11). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { balance, thermometer, solids } from './art.js';

export default {
  id: 'l3-ck-1',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 1)',
  short: 'Cuối kì I · Đề 1',
  after: { book: 'workbook', units: '1-44' },
  desc: 'Bảng nhân, bảng chia; nhân, chia số có ba chữ số với số có một chữ số; gấp lên, giảm đi một số lần; gam, mi-li-lít, nhiệt độ; biểu thức số; bài toán hai bước tính',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: đổi chỗ chục và đơn vị (750), viết từng phần 700 và 5 (7005), đọc "linh" thành "mười" (715).
      { type: 'mc', bai: 1, point: 1, level: 1,
        prompt: 'Số "bảy trăm linh năm" viết là:',
        options: ['705', '750', '7005', '715'], ans: 0 },
      { type: 'match', bai: [4, 5, 6, 10], point: 2, level: 1,
        prompt: 'Nối phép tính với kết quả đúng:',
        left: ['56 : 7', '4 × 9', '3 × 8', '45 : 5'],
        right: ['36', '8', '9', '24'], ans: [1, 0, 3, 2] },
      // 28 : 4 = 7. Nhiễu: lấy số phần (4 kg), lấy 28 − 4 (24 kg), lấy 28 + 4 (32 kg).
      { type: 'mc', bai: 14, point: 3, level: 1,
        prompt: '{1/4} của 28 kg là:',
        options: ['7 kg', '4 kg', '24 kg', '32 kg'], ans: 0 },
      // 12 : 2 = 6. Nhiễu: lấy cả đoạn (12 cm), gấp đôi (24 cm), chia 3 (4 cm).
      { type: 'mc', bai: 16, point: 2, level: 1,
        prompt: 'Đoạn thẳng AB dài 12 cm, M là trung điểm của đoạn thẳng AB. Đoạn thẳng AM dài:',
        options: ['6 cm', '12 cm', '24 cm', '4 cm'], ans: 0 },
      // Ý sai: chỉ đếm các cạnh nhìn thấy rõ ở mặt trước và mặt trên (8 cạnh).
      { type: 'tf', bai: 21, point: 0, level: 2,
        prompt: 'Quan sát khối lập phương. Đúng ghi Đ, sai ghi S:',
        fig: solids(['cube']),
        items: ['Khối lập phương có 8 đỉnh.', 'Khối lập phương có 6 mặt.', 'Khối lập phương có 8 cạnh.', 'Các mặt của khối lập phương là hình vuông.'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // 27 × 3 = 81. Nhiễu: quên nhớ 2 sang hàng chục (61), viết cả 21 xuống (621), lấy 27 + 3 (30).
      { type: 'mc', bai: 23, point: 2, level: 1,
        prompt: 'Kết quả của phép tính 27 × 3 là:',
        options: ['81', '61', '621', '30'], ans: 0 },
      // Ý sai: "giảm đi 4 lần" làm thành trừ 4 (20); "gấp lên 2 lần" làm thành cộng 2 (9).
      { type: 'tf', bai: [24, 27], point: 3, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Gấp 6 lên 3 lần được 18.', 'Giảm 24 đi 4 lần được 20.', 'Giảm 35 đi 5 lần được 7.', 'Gấp 7 lên 2 lần được 9.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 500 g + 200 g = 700 g. Nhiễu: lấy 500 − 200 (300 g), chỉ đọc một quả cân (500 g), viết nhầm đơn vị (700 kg).
      { type: 'mc', bai: 31, point: 2, level: 1,
        prompt: 'Cân thăng bằng. Quả bí ngô cân nặng:',
        fig: balance([{ kind: 'bi_ngo', label: 'bí ngô' }], ['500 g', '200 g']),
        options: ['700 g', '300 g', '500 g', '700 kg'], ans: 0 },
      // Nhiễu: đọc vạch số gần nhất (30 °C), nhớ nhiệt độ cơ thể người (37 °C), đảo chữ số (23 °C).
      { type: 'mc', bai: 33, point: 1, level: 1,
        prompt: 'Nhiệt kế chỉ bao nhiêu độ C?',
        fig: thermometer(32),
        options: ['32 °C', '30 °C', '37 °C', '23 °C'], ans: 0 },
      // Ý sai: tính từ trái sang phải khi có cả cộng và chia (15); 40 − 20 : 4 = 35, không phải 5.
      { type: 'tf', bai: 38, point: 2, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['40 + 20 : 4 = 15', '40 + 20 : 4 = 45', '(40 + 20) : 4 = 15', '40 − 20 : 4 = 5'],
        ans: ['S', 'Đ', 'Đ', 'S'] },
      // 4 chục = 40; 40 : 8 = 5. Nhiễu: lấy 40 − 8 (32 lần), đọc 4 chục là 4 rồi lấy 8 : 4 (2 lần), lấy 40 + 8 (48 lần).
      { type: 'mc', bai: 39, point: 0, level: 3,
        prompt: 'Mẹ mua 4 chục quả trứng gà và 8 quả trứng vịt. Số trứng gà gấp mấy lần số trứng vịt?',
        options: ['5 lần', '32 lần', '2 lần', '48 lần'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [26, 36, 37], point: 0, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['146 × 3', '96 : 4', '725 : 5', '208 × 4'] },
      { type: 'findx', bai: [3, 13], point: 1, level: 2,
        prompt: 'Tìm x:',
        items: ['x + 245 = 610', 'x × 6 = 54', 'x : 7 = 9'] },
      {
        type: 'word', bai: [32, 36], point: 0, level: 3,
        text: 'Mỗi hộp sữa có 180 ml sữa. Hỏi 4 hộp sữa như thế có tất cả bao nhiêu mi-li-lít sữa?',
        given: ['Mỗi hộp có 180 ml sữa.', 'Có 4 hộp sữa như thế.'],
        ask: '4 hộp sữa có bao nhiêu mi-li-lít sữa?',
        hint: '4 hộp, mỗi hộp 180 ml: lấy 180 nhân với 4.',
        sentence: ['4 hộp sữa', 'có số', 'mi-li-lít sữa', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 180, op: '×', b: 4, result: 720, unit: 'ml' },
        units: ['ml', 'hộp', 'l'],
      },
      // Bước 1: 236 − 48 = 188 (kg). Bước 2: 236 + 188 = 424 (kg).
      { type: 'fill', bai: 28, point: 2, level: 3,
        prompt: 'Buổi sáng cửa hàng bán được 236 kg gạo, buổi chiều bán được ít hơn buổi sáng 48 kg gạo. Hỏi cả hai buổi cửa hàng bán được bao nhiêu ki-lô-gam gạo?',
        items: [
          { t: 'Buổi chiều bán được: … − … = … (kg)', ans: [236, 48, 188] },
          { t: 'Cả hai buổi bán được: … + … = … (kg)', ans: [236, 188, 424] },
        ] },
    ] },
  ],
};
