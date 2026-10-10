/** Kiểm tra tổng hợp 5 (Đề 2): Bài 30–37 Vở BT Toán 3 (Nhanh 9 + Nhanh 10, ôn Bài 1–29). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { rulerMm, jug } from './art.js';

export default {
  id: 'l3-th-05b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 5 (Đề 2)',
  short: 'Tổng hợp 5 · Đề 2',
  after: { book: 'workbook', units: '30-37' },
  desc: 'Đổi mm, g, ml; tính với số đo; so sánh nhiệt độ; nhân, chia số có ba chữ số với (cho) số có một chữ số; ôn bảng chia 7, gấp lên, giảm đi một số lần',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Ý sai: nhầm 1 kg = 100 g (như 1 m = 100 cm), nhầm 1 m = 100 mm (đúng là 1000 mm).
      { type: 'tf', bai: [30, 31, 32], point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['1 cm = 10 mm', '1 kg = 100 g', '1 l = 1000 ml', '1 m = 100 mm'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Số °C lớn nhất là nóng nhất. Nhiễu: chọn số bé nhất (Đà Lạt), số đứng giữa (Huế, Hà Nội).
      { type: 'mc', bai: 33, point: 3, level: 1,
        prompt: 'Nhiệt độ cùng một buổi trưa: Hà Nội 24 °C, Huế 29 °C, Đà Lạt 18 °C, Cần Thơ 33 °C. Nơi nào nóng nhất?',
        options: ['Cần Thơ', 'Đà Lạt', 'Huế', 'Hà Nội'], ans: 0 },
      // Ôn bảng chia 7. Nhiễu: lấy 42 − 7 (35), lệch một (5, 7).
      { type: 'mc', bai: 10, point: 2, level: 1, review: true,
        prompt: 'Kết quả của phép chia 42 : 7 là:',
        options: ['6', '35', '5', '7'], ans: 0 },
      // 250 g + 150 g = 400 g; 1 kg − 300 g = 1000 g − 300 g = 700 g; 200 ml × 3 = 600 ml; 900 ml : 3 = 300 ml.
      { type: 'match', bai: [31, 32], point: 3, level: 2,
        prompt: 'Nối mỗi phép tính với kết quả đúng:',
        left: ['250 g + 150 g', '1 kg − 300 g', '200 ml × 3', '900 ml : 3'],
        right: ['700 g', '400 g', '300 ml', '600 ml'],
        ans: [1, 0, 3, 2] },
      // MN đặt từ vạch 1 cm tới vạch 3 cm 7 mm: dài 27 mm. Nhiễu: đọc vạch cuối mà quên đầu không ở vạch 0 (37 mm),
      // chỉ đếm vạch nhỏ lẻ (7 mm), chỉ đếm số cm (2 cm).
      { type: 'mc', bai: 30, point: 2, level: 2,
        prompt: 'Đoạn thẳng MN dài bao nhiêu mi-li-mét?',
        fig: rulerMm(27, { from: 10, cm: 5, name: 'MN' }),
        options: ['27 mm', '37 mm', '7 mm', '2 cm'], ans: 0 },
      // Nước ở vạch 350 ml. Nhiễu: đọc phần còn trống (150 ml), đọc vạch có số tròn trăm gần nhất (300, 400).
      { type: 'mc', bai: 32, point: 2, level: 1,
        prompt: 'Trong ca có bao nhiêu mi-li-lít nước?',
        fig: jug(350, { cap: 500, step: 50 }),
        options: ['350 ml', '150 ml', '300 ml', '400 ml'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // 816 : 4 = 204: lượt giữa 1 bé hơn 4 thì viết 0 vào thương.
      { type: 'calc', bai: [36, 37], point: 0, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['126 × 4', '207 × 3', '738 : 6', '816 : 4'] },
      // Ôn gấp lên, giảm đi một số lần: chặng này nhân, chia số có ba chữ số cũng gặp các dạng này.
      { type: 'fill', bai: [24, 27], point: 0, level: 2, review: true,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: 'Gấp 9 lên 6 lần thì được …', ans: 54 },
          { t: 'Giảm 56 đi 7 lần thì được …', ans: 8 },
          { t: 'Gấp 15 lên 4 lần thì được …', ans: 60 },
          { t: 'Giảm 84 đi 4 lần thì được …', ans: 21 },
        ] },
      {
        type: 'word', bai: 37, point: 1, level: 3,
        text: 'Thư viện trường có 168 quyển truyện, cô thủ thư xếp đều lên 4 giá sách. Hỏi mỗi giá có bao nhiêu quyển truyện?',
        given: ['Có 168 quyển truyện.', 'Xếp đều lên 4 giá.'],
        ask: 'Mỗi giá có bao nhiêu quyển truyện?',
        hint: 'Chia đều thành 4 phần thì làm phép chia cho 4.',
        sentence: ['Mỗi giá sách', 'có số', 'quyển truyện', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 168, op: ':', b: 4, result: 42, unit: 'quyển truyện' },
        units: ['quyển truyện', 'giá sách', 'bạn'],
      },
      // Bước 1: rót ra 220 × 4 = 880 (ml); bước 2: còn lại 1 l = 1000 ml, 1000 − 880 = 120 (ml).
      { type: 'fill', bai: [32, 36], point: 3, level: 3,
        prompt: 'Mẹ có 1 l nước cam. Mẹ rót ra 4 cốc, mỗi cốc 220 ml. Hỏi trong bình còn lại bao nhiêu mi-li-lít nước cam?',
        items: [
          { t: 'Số nước cam đã rót: 220 × … = … (ml)', ans: [4, 880] },
          { t: 'Số nước cam còn lại: 1000 − … = … (ml)', ans: [880, 120] },
        ] },
    ] },
  ],
};
