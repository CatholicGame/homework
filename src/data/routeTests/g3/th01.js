/** Kiểm tra tổng hợp 1 (Đề 1): Bài 1–8 Vở BT Toán 3 (Nhanh 1 + Nhanh 2). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { clock } from './art.js';

export default {
  id: 'l3-th-01',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 1 (Đề 1)',
  short: 'Tổng hợp 1 · Đề 1',
  after: { book: 'workbook', units: '1-8' },
  desc: 'Số đến 1 000; cộng, trừ trong phạm vi 1 000; tìm số hạng, số bị trừ, số trừ; bảng nhân, bảng chia 2, 3, 4, 5; xem giờ',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: đổi chỗ chục và đơn vị (460), viết rời 400 và 6 (4006), đọc "linh" thành "mười" (416).
      { type: 'mc', bai: 1, point: 1, level: 1,
        prompt: 'Số "bốn trăm linh sáu" viết là:',
        options: ['406', '460', '4006', '416'], ans: 0 },
      // Ý sai: lệch một hàng trong bảng chia 3 (27 : 3 = 9, 24 : 3 = 8).
      { type: 'tf', bai: 5, point: 3, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['3 × 7 = 21', '27 : 3 = 8', '3 × 6 = 18', '24 : 3 = 7'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: nhầm tên số đứng đầu (số bị trừ), tên kết quả (hiệu), tên của phép cộng (số hạng).
      { type: 'mc', bai: 3, point: 2, level: 1,
        prompt: 'Trong phép trừ 85 − 23 = 62, số 23 gọi là:',
        options: ['Số bị trừ', 'Số trừ', 'Hiệu', 'Số hạng'], ans: 1 },
      { type: 'match', bai: 6, point: 1, level: 1,
        prompt: 'Tính nhẩm rồi nối mỗi phép tính với kết quả đúng:',
        left: ['4 × 5', '4 × 8', '36 : 4', '28 : 4'],
        right: ['7', '9', '20', '32'],
        ans: [2, 3, 1, 0] },
      // Nhiễu: sai buổi (4 giờ sáng), cộng 10 thay vì 12 (14 giờ), chép số 12.
      { type: 'mc', bai: 7, point: 2, level: 2,
        prompt: 'Buổi chiều, Nam đi đá bóng lúc đồng hồ chỉ như hình dưới. Nam đi đá bóng lúc:',
        fig: clock(4, 0),
        options: ['16 giờ', '4 giờ sáng', '14 giờ', '12 giờ'], ans: 0 },
      // Nhiễu: chép số hộp (5 cái), lấy 20 trừ 5 (15 cái), lấy 20 cộng 5 (25 cái).
      { type: 'mc', bai: 4, point: 3, level: 2,
        prompt: 'Có 20 cái bánh xếp đều vào 5 hộp. Mỗi hộp có mấy cái bánh?',
        options: ['4 cái', '5 cái', '15 cái', '25 cái'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 1, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['356 + 218', '472 + 65', '634 − 271', '800 − 345'] },
      { type: 'findx', bai: 3, point: 1, level: 2,
        prompt: 'Tìm x:',
        items: ['x + 245 = 580', 'x − 136 = 408', '720 − x = 350'] },
      {
        type: 'word', bai: 6, point: 3, level: 3,
        text: 'Mỗi chiếc ghế có 4 cái chân. Hỏi 8 chiếc ghế như thế có bao nhiêu cái chân?',
        given: ['Mỗi chiếc ghế có 4 cái chân.', 'Có 8 chiếc ghế.'],
        ask: '8 chiếc ghế có bao nhiêu cái chân?',
        hint: 'Mỗi ghế 4 chân, 8 ghế thì 4 được lấy 8 lần: lấy 4 nhân với 8.',
        sentence: ['8 chiếc ghế', 'có số', 'cái chân', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 4, op: '×', b: 8, result: 32, unit: 'cái chân' },
        units: ['cái chân', 'chiếc ghế', 'kg'],
      },
      // 987 − 100 = 887.
      { type: 'fill', bai: [1, 2], point: 3, level: 3,
        prompt: 'Số lớn nhất có ba chữ số khác nhau hơn số bé nhất có ba chữ số bao nhiêu? Viết phép tính rồi tìm kết quả:',
        items: [{ t: '… − … = …', ans: [987, 100, 887] }] },
    ] },
  ],
};
