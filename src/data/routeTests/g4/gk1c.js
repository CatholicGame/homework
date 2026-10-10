/** Kiểm tra giữa học kì I (Đề 3): Bài 1–21 Toán 4 (Nhanh 1 đến 6). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { protractor } from './art.js';

export default {
  id: 'l4-gk-1c',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 3)',
  short: 'Giữa kì I · Đề 3',
  after: { book: 'tool4', units: '1-21' },
  desc: 'Số 1 000 000; hàng và lớp; số chẵn, số lẻ; biểu thức chứa chữ; bài toán ba bước; góc; làm tròn số; dãy số tự nhiên; tạ, mét vuông, thế kỉ',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: số liền trước (999 998), đếm thiếu một chữ số 0 (100 000), đếm thừa một chữ số 0 (10 000 000).
      { type: 'mc', bai: 10, point: 2, level: 1,
        prompt: 'Số liền sau của số 999 999 là:',
        options: ['1 000 000', '999 998', '100 000', '10 000 000'], ans: 0 },
      // Ý sai: nghĩ góc tù bằng 180° (đó là góc bẹt).
      { type: 'tf', bai: [7, 8], point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Góc vuông bằng 90°.', 'Góc nhọn bé hơn góc vuông.', 'Góc tù bằng 180°.', 'Góc bẹt bằng hai góc vuông.'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // 830 516: chữ số 3 ở hàng chục nghìn, lớp nghìn.
      // Nhiễu: lệch một hàng (hàng nghìn), đúng hàng nhưng sai lớp (lớp đơn vị), đếm hàng từ trái sang (hàng trăm).
      { type: 'mc', bai: 11, point: 0, level: 1,
        prompt: 'Chữ số 3 trong số 830 516 thuộc hàng nào, lớp nào?',
        options: ['Hàng chục nghìn, lớp nghìn', 'Hàng nghìn, lớp nghìn', 'Hàng chục nghìn, lớp đơn vị', 'Hàng trăm, lớp đơn vị'], cols: 1, ans: 0 },
      // Mặt bàn học khoảng 60 cm × 100 cm = 60 dm². Nhiễu: đơn vị quá bé (cm², mm²), quá lớn (m², bằng cả căn phòng).
      { type: 'mc', bai: 18, point: 1, level: 1,
        prompt: 'Chọn số đo thích hợp: Mặt bàn học của em có diện tích khoảng:',
        options: ['60 dm²', '60 cm²', '60 m²', '60 mm²'], ans: 0 },
      // Nhiễu: lấy 180° − 35° (145°), đọc lệch sang vạch số bên cạnh (30°, 40°).
      { type: 'mc', bai: 7, point: 1, level: 1,
        prompt: 'Đặt thước đo góc như hình. Góc MON có số đo là:',
        fig: protractor(35, { names: ['O', 'M', 'N'] }),
        options: ['35°', '145°', '30°', '40°'], ans: 0 },
      // Ý sai: 2 468 và 2 470 là hai số chẵn liên tiếp chứ không phải số lẻ.
      { type: 'tf', bai: 3, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị.', 'Số liền sau của một số lẻ là số chẵn.', '2 468 và 2 470 là hai số lẻ liên tiếp.', '5 131; 5 133; 5 135 là ba số lẻ liên tiếp.'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // 1 tạ 20 kg = 100 kg + 20 kg = 120 kg. Nhiễu: coi 1 tạ = 1 000 kg (1 020 kg), viết 1 rồi thêm 20 thành 1 200, quên tạ (20 kg).
      { type: 'mc', bai: 17, point: 1, level: 1,
        prompt: 'Một chú voi con nặng 1 tạ 20 kg. Chú voi con nặng bao nhiêu ki-lô-gam?',
        options: ['120 kg', '1 020 kg', '1 200 kg', '20 kg'], ans: 0 },
      // 1890 thuộc thế kỉ XIX (từ 1801 đến 1900). Nhiễu: lấy hai chữ số đầu 18 (XVIII), thế kỉ sau (XX), viết nhầm số La Mã XI.
      { type: 'mc', bai: 19, point: 1, level: 1,
        prompt: 'Bác Hồ sinh năm 1890. Năm đó thuộc thế kỉ nào?',
        options: ['Thế kỉ XVIII', 'Thế kỉ XIX', 'Thế kỉ XX', 'Thế kỉ XI'], ans: 1 },
      // a = 6: 6 × 9 + 12 = 66; 120 − 6 × 5 = 90; (6 + 14) × 3 = 60; 84 : 6 + 6 = 20.
      { type: 'match', bai: 4, point: 0, level: 2,
        prompt: 'Với a = 6, nối mỗi biểu thức với giá trị của nó:',
        left: ['a × 9 + 12', '120 − a × 5', '(a + 14) × 3', '84 : a + a'],
        right: ['20', '60', '66', '90'], ans: [2, 3, 1, 0] },
      // Hàng chục nghìn: xét chữ số hàng nghìn 8 nên làm tròn lên 40 000.
      // Nhiễu: làm tròn xuống (30 000), làm tròn đến hàng nghìn (38 000), đến hàng trăm (38 500).
      { type: 'mc', bai: 13, point: 1, level: 2,
        prompt: 'Một sân vận động có 38 470 chỗ ngồi. Làm tròn số chỗ ngồi đến hàng chục nghìn thì được:',
        options: ['40 000', '30 000', '38 000', '38 500'], ans: 0 },
      // Mỗi số hơn số trước 3 đơn vị: số thứ 10 là 2 + 3 × 9 = 29.
      // Nhiễu: số thứ 11 (32), số thứ 9 (26), lấy 10 × 3 (30).
      { type: 'mc', bai: 15, point: 1, level: 3,
        prompt: 'Cho dãy số 2, 5, 8, 11, 14, … Số thứ mười của dãy là:',
        options: ['29', '32', '26', '30'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 0, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['63 708 + 19 495', '82 030 − 47 156', '21 864 × 4', '75 096 : 8'] },
      { type: 'table', bai: 10, point: 1, level: 2,
        prompt: 'Viết số thích hợp vào ô trống:',
        head: ['Trăm nghìn', 'Chục nghìn', 'Nghìn', 'Trăm', 'Chục', 'Đơn vị', 'Viết số'],
        rows: [[4, 0, 6, 2, 9, 1, '…'], ['…', '…', 5, 0, '…', 8, '735 078']],
        ans: [[406291], [7, 3, 7]] },
      {
        type: 'word', bai: 2, point: 0, level: 2,
        text: 'Vụ mùa này bác Tư thu hoạch được 2 450 kg thóc. Bác Năm thu hoạch được nhiều hơn bác Tư 375 kg thóc. Hỏi bác Năm thu hoạch được bao nhiêu ki-lô-gam thóc?',
        given: ['Bác Tư thu hoạch 2 450 kg thóc.', 'Bác Năm nhiều hơn bác Tư 375 kg.'],
        ask: 'Bác Năm thu hoạch được bao nhiêu ki-lô-gam thóc?',
        hint: 'Nhiều hơn thì lấy số thóc của bác Tư cộng thêm 375.',
        sentence: ['Bác Năm', 'thu hoạch được', 'số thóc', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 2450, op: '+', b: 375, result: 2825, unit: 'kg' },
        units: ['kg', 'tạ', 'bao'],
      },
      // Diện tích vườn 25 × 12 = 300 m²; trồng hoa 300 − 60 = 240 m²; số cây hoa 240 × 5 = 1 200 cây.
      { type: 'fill', bai: [5, 18], point: 1, level: 3,
        prompt: 'Một mảnh vườn hình chữ nhật có chiều dài 25 m, chiều rộng 12 m. Người ta dành 60 m² để trồng rau, phần còn lại trồng hoa. Cứ mỗi mét vuông trồng 5 cây hoa. Hỏi mảnh vườn trồng được bao nhiêu cây hoa?',
        items: [
          { t: 'Diện tích mảnh vườn: 25 × 12 = … (m²)', ans: [300] },
          { t: 'Diện tích trồng hoa: 300 − 60 = … (m²)', ans: [240] },
          { t: 'Số cây hoa trồng được: 240 × 5 = … (cây)', ans: [1200] },
        ] },
    ] },
  ],
};
