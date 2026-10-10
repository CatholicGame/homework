/** Kiểm tra tổng hợp 5 (Đề 1): Bài 30–37 Vở BT Toán 3 (Nhanh 9 + Nhanh 10, ôn Bài 1–29). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { rulerMm, thermometer, balance, jug } from './art.js';

export default {
  id: 'l3-th-05',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 5 (Đề 1)',
  short: 'Tổng hợp 5 · Đề 1',
  after: { book: 'workbook', units: '30-37' },
  desc: 'Mi-li-mét, gam, mi-li-lít, độ C; nhân, chia số có ba chữ số với (cho) số có một chữ số; ôn chia có dư, nhân chia số có hai chữ số',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // AB từ vạch 0 dài 34 mm. Nhiễu: chỉ đếm vạch nhỏ lẻ (4 mm), chỉ đọc số cm (3 mm), đảo chữ số (43 mm).
      { type: 'mc', bai: 30, point: 2, level: 1,
        prompt: 'Đoạn thẳng AB dài bao nhiêu mi-li-mét?',
        fig: rulerMm(34, { cm: 5 }),
        options: ['34 mm', '4 mm', '3 mm', '43 mm'], ans: 0 },
      // Ôn chia có dư: số dư phải bé hơn số chia. Ý sai: dư 6 khi chia 4 (38 : 4 = 9 dư 2), dư 8 khi chia 7 (50 : 7 = 7 dư 1).
      { type: 'tf', bai: 25, point: 2, level: 1, review: true,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: [
          { div: '47 : 5', q: '9', work: ['45', '2'] },
          { div: '38 : 4', q: '8', work: ['32', '6'] },
          { div: '29 : 3', q: '9', work: ['27', '2'] },
          { div: '50 : 7', q: '6', work: ['42', '8'] },
        ],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Cột đỏ tới vạch 28. Nhiễu: đếm từ 30 theo chiều ngược (32), đảo chữ số (23), lấy vạch có số gần nhất (30).
      { type: 'mc', bai: 33, point: 1, level: 1,
        prompt: 'Nhiệt kế chỉ bao nhiêu độ C?',
        fig: thermometer(28),
        options: ['28 °C', '32 °C', '23 °C', '30 °C'], ans: 0 },
      // Nhân nhẩm số tròn trăm, chia nhẩm số tròn trăm.
      { type: 'match', bai: [36, 37], point: 3, level: 1,
        prompt: 'Tính nhẩm rồi nối mỗi phép tính với kết quả đúng:',
        left: ['200 × 4', '800 : 2', '300 × 3', '900 : 3'],
        right: ['300', '400', '800', '900'],
        ans: [2, 1, 3, 0] },
      // 500 g + 200 g + 100 g = 800 g. Nhiễu: quên quả cân 100 g (700 g), đếm số quả cân (3 g), chỉ lấy quả to nhất (500 g).
      { type: 'mc', bai: 31, point: 2, level: 2,
        prompt: 'Cân thăng bằng. Gói bánh cân nặng bao nhiêu gam?',
        fig: balance([{ kind: 'banh', label: 'gói bánh' }], ['500 g', '200 g', '100 g']),
        options: ['800 g', '700 g', '3 g', '500 g'], ans: 0 },
      // Nước ở vạch 600 ml, bình 1 l = 1000 ml: cần thêm 1000 − 600 = 400 (ml). Nhiễu: đọc mức nước (600), cộng 1000 + 600, đọc lệch một vạch (300).
      { type: 'mc', bai: 32, point: 1, level: 2,
        prompt: 'Bình chứa được 1 l nước. Cần rót thêm bao nhiêu mi-li-lít nước nữa thì đầy bình?',
        fig: jug(600),
        options: ['400 ml', '600 ml', '1600 ml', '300 ml'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // 357 : 5 = 71 (dư 2): hàng trăm 3 bé hơn 5 nên lấy 35 chia trước.
      { type: 'calc', bai: [36, 37], point: 0, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['214 × 3', '135 × 6', '496 : 4', '357 : 5'] },
      // Ôn bảng nhân 7, chia số có hai chữ số, nhân số có hai chữ số: 7 × 8 = 56, 56 : 4 = 14, 14 × 5 = 70.
      { type: 'chain', bai: [11, 23, 26], point: 1, level: 2, review: true,
        prompt: 'Số?',
        items: [{ start: 7, steps: ['× 8', ': 4', '× 5'] }] },
      {
        type: 'word', bai: 36, point: 2, level: 3,
        text: 'Mỗi hộp sữa có 180 ml sữa. Mẹ mua cho Bình 4 hộp sữa. Hỏi 4 hộp sữa có tất cả bao nhiêu mi-li-lít sữa?',
        given: ['Mỗi hộp có 180 ml sữa.', 'Mẹ mua 4 hộp.'],
        ask: '4 hộp sữa có tất cả bao nhiêu mi-li-lít sữa?',
        hint: '4 hộp, mỗi hộp 180 ml: 180 ml được lấy 4 lần, làm phép nhân.',
        sentence: ['4 hộp sữa', 'có tất cả', 'số mi-li-lít sữa', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 180, op: '×', b: 4, result: 720, unit: 'ml' },
        units: ['ml', 'hộp', 'g'],
      },
      // Bước 1: còn lại 1000 − 280 = 720 (g); bước 2: mỗi hũ 720 : 3 = 240 (g).
      { type: 'fill', bai: [31, 37], point: 3, level: 3,
        prompt: 'Bác Tư có 1 kg đường, bác đã dùng 280 g để làm bánh. Số đường còn lại bác chia đều vào 3 hũ. Hỏi mỗi hũ có bao nhiêu gam đường?',
        items: [
          { t: 'Số đường còn lại: 1000 − … = … (g)', ans: [280, 720] },
          { t: 'Mỗi hũ có: … : 3 = … (g)', ans: [720, 240] },
        ] },
    ] },
  ],
};
