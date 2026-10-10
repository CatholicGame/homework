/** Kiểm tra giữa học kì I (Đề 5): Bài 1–21 Toán 4 (Nhanh 1 đến 6). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { protractor } from './art.js';

export default {
  id: 'l4-gk-1e',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 5)',
  short: 'Giữa kì I · Đề 5',
  after: { book: 'tool4', units: '1-21' },
  desc: 'Đọc số đến lớp triệu; số liền trước, liền sau; tính nhẩm số tròn nghìn; chu vi hình vuông; bài toán ba bước; đo góc, góc tù; làm tròn số; dãy số; mét vuông, giây, thế kỉ',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: đọc lệch lớp (5 400 300), bỏ lớp triệu (504 300), đọc lớp đơn vị thành ba mươi.
      { type: 'mc', bai: 12, point: 1, level: 1,
        prompt: 'Số 5 040 300 đọc là:',
        options: [
          'Năm triệu không trăm bốn mươi nghìn ba trăm',
          'Năm triệu bốn trăm nghìn ba trăm',
          'Năm trăm linh bốn nghìn ba trăm',
          'Năm triệu không trăm bốn mươi nghìn ba mươi',
        ], cols: 1, ans: 0 },
      // Ý sai: số liền sau của 69 999 là 70 000 (nhớ sang hàng chục nghìn); so sánh theo chữ số đầu mà quên số chữ số (99 000 > 9 900).
      { type: 'tf', bai: 1, point: 2, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Số liền trước của 40 000 là 39 999.', 'Số liền sau của 69 999 là 60 000.', '58 401 > 58 399', '99 000 < 9 900'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: lấy 180° − 110° (70°), đọc lệch sang vạch số bên cạnh (100°, 120°).
      { type: 'mc', bai: 7, point: 1, level: 1,
        prompt: 'Đặt thước đo góc như hình. Góc AOB có số đo là:',
        fig: protractor(110),
        options: ['110°', '70°', '100°', '120°'], ans: 0 },
      // 908 457: chữ số 8 ở hàng nghìn. Nhiễu: lệch lên hàng chục nghìn (80 000), lệch xuống hàng trăm (800), lấy chữ số (8).
      { type: 'mc', bai: 11, point: 1, level: 1,
        prompt: 'Trong số 908 457, chữ số 8 có giá trị là:',
        options: ['8 000', '80 000', '800', '8'], ans: 0 },
      // 2 phút = 120 giây; 1 thế kỉ = 100 năm; 3 phút 5 giây = 185 giây; 5 thế kỉ = 500 năm.
      { type: 'match', bai: 19, point: 0, level: 1,
        prompt: 'Nối hai số đo bằng nhau:',
        left: ['2 phút', '1 thế kỉ', '3 phút 5 giây', '5 thế kỉ'],
        right: ['100 năm', '120 giây', '185 giây', '500 năm'], ans: [1, 0, 2, 3] },
      // Chữ số hàng chục nghìn là 1 nên làm tròn xuống 6 800 000.
      // Nhiễu: làm tròn lên (6 900 000), làm tròn đến hàng chục nghìn (6 820 000), đến hàng triệu (7 000 000).
      { type: 'mc', bai: 13, point: 0, level: 1,
        prompt: 'Làm tròn số 6 815 270 đến hàng trăm nghìn thì được số:',
        options: ['6 800 000', '6 900 000', '6 820 000', '7 000 000'], ans: 0 },
      // P = 135 × 4 = 540 m. Nhiễu: cộng thay nhân (139), quên nhớ khi nhân (520), lấy cạnh nhân cạnh (18 225).
      { type: 'mc', bai: 4, point: 2, level: 1,
        prompt: 'Một sân hình vuông có cạnh a = 135 m. Chu vi P = a × 4 của sân là:',
        options: ['540 m', '139 m', '520 m', '18 225 m'], ans: 0 },
      // Ý sai: góc 90° là góc vuông, không phải góc tù.
      { type: 'tf', bai: 8, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Góc 125° là góc tù.', 'Góc 89° là góc nhọn.', 'Góc 90° là góc tù.', 'Góc bẹt bằng 180°.'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // 4 × 4 = 16 dm². Nhiễu: tính chu vi (16 dm, sai đơn vị), lấy 4 × 2 (8 dm²), thêm chữ số 0 khi đổi (160 dm²).
      { type: 'mc', bai: 18, point: 1, level: 2,
        prompt: 'Một viên gạch lát nền hình vuông có cạnh 4 dm. Diện tích viên gạch là:',
        options: ['16 dm²', '16 dm', '8 dm²', '160 dm²'], ans: 0 },
      // Mỗi số gấp đôi số trước: 8 000 × 2 = 16 000.
      // Nhiễu: thấy 2 000 → 4 000 rồi cộng thêm 2 000 (10 000), cộng thêm 1 000 (9 000), cộng thêm 4 000 (12 000).
      { type: 'mc', bai: 15, point: 1, level: 3,
        prompt: 'Số thích hợp viết tiếp vào dãy số 1 000, 2 000, 4 000, 8 000, … là:',
        options: ['16 000', '10 000', '9 000', '12 000'], ans: 0 },
      // Bảy chữ số khác nhau bé nhất: 1 đứng đầu, rồi 0, 2, 3, 4, 5, 6.
      // Nhiễu: không dùng chữ số 0 (1 234 567), lặp chữ số 0 (1 000 000), đặt 0 sai chỗ (1 203 456).
      { type: 'mc', bai: 14, point: 1, level: 3,
        prompt: 'Số bé nhất có bảy chữ số khác nhau là:',
        options: ['1 023 456', '1 234 567', '1 000 000', '1 203 456'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 0, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['29 657 + 54 286', '73 001 − 28 456', '10 875 × 8', '96 534 : 6'] },
      // 24 000 : 3 = 8 000; × 5 = 40 000; + 15 000 = 55 000; − 45 000 = 10 000.
      // 90 000 − 30 000 = 60 000; : 6 = 10 000; × 7 = 70 000.
      { type: 'chain', bai: 2, point: 2, level: 2,
        prompt: 'Tính nhẩm rồi viết số thích hợp:',
        items: [
          { start: '24 000', steps: [': 3', '× 5', '+ 15 000', '− 45 000'] },
          { start: '90 000', steps: ['− 30 000', ': 6', '× 7'] },
        ] },
      {
        type: 'word', bai: 18, point: 1, level: 2,
        text: 'Phòng học của lớp 4A có dạng hình chữ nhật, chiều dài 8 m, chiều rộng 6 m. Hỏi diện tích phòng học là bao nhiêu mét vuông?',
        given: ['Chiều dài 8 m.', 'Chiều rộng 6 m.'],
        ask: 'Diện tích phòng học là bao nhiêu mét vuông?',
        hint: 'Diện tích hình chữ nhật bằng chiều dài nhân với chiều rộng (cùng đơn vị đo).',
        sentence: ['Diện tích', 'phòng học', 'là:'],
        decoys: ['chu vi'],
        expr: { a: 8, op: '×', b: 6, result: 48, unit: 'm²' },
        units: ['m²', 'm', 'dm²'],
      },
      // Xe lớn 45 × 6 = 270; xe nhỏ 16 × 4 = 64; cả đội xe 270 + 64 = 334; chưa có chỗ 350 − 334 = 16.
      { type: 'fill', bai: 5, point: 1, level: 3,
        prompt: 'Trường tổ chức cho 350 học sinh đi tham quan. Đội xe có 6 xe lớn, mỗi xe chở 45 học sinh và 4 xe nhỏ, mỗi xe chở 16 học sinh. Hỏi còn bao nhiêu học sinh chưa có chỗ ngồi trên xe?',
        items: [
          { t: '6 xe lớn chở được: 45 × 6 = … (học sinh)', ans: [270] },
          { t: '4 xe nhỏ chở được: 16 × 4 = … (học sinh)', ans: [64] },
          { t: 'Cả đội xe chở được: 270 + 64 = … (học sinh)', ans: [334] },
          { t: 'Số học sinh chưa có chỗ: 350 − 334 = … (học sinh)', ans: [16] },
        ] },
    ] },
  ],
};
