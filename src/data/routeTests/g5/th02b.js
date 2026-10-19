/** Kiểm tra tổng hợp 2 (Đề 2): Bài 7–12 Toán 5 (Nhanh 3 + Nhanh 4, ôn Bài 1–6). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { hundred } from './art.js';

export default {
  id: 'l5-th-02b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 2 (Đề 2)',
  short: 'Tổng hợp 2 · Đề 2',
  after: { book: 'tool5', units: '7-12' },
  desc: 'Phân số thập phân và số thập phân; viết phân số thành hỗn số; hàng của số thập phân; góc tù; tìm số thập phân lớn nhất; đổi đơn vị độ dài, khối lượng ra số thập phân; giờ và phút; ôn phân số thập phân, đặt tính',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Tô 37 ô trong 100 ô: {37/100} = 0,37. Nhiễu: coi là phần mười (3,7), thêm một chữ số 0 (0,037), quên phần nguyên 0 và dấu phẩy (37).
      { type: 'mc', bai: 10, point: 0, level: 1,
        prompt: 'Hình vuông được chia thành 100 ô bằng nhau. Phần đã tô màu viết dưới dạng số thập phân là:',
        fig: hundred(37),
        options: ['3,7', '0,037', '0,37', '37'], ans: 2 },
      // {27/10} = 2{7/10} (27 : 10 = 2 dư 7). Nhiễu: lấy tử làm phần nguyên (27{1/10}), đổi chỗ hai chữ số (7{2/10}), đảo mẫu và dư (2{1/7}).
      { type: 'mc', bai: 7, point: 3, level: 1,
        prompt: 'Phân số {27/10} viết thành hỗn số là:',
        options: ['2{7/10}', '27{1/10}', '7{2/10}', '2{1/7}'], ans: 0 },
      // 36,725: 7 hàng phần mười, 2 hàng phần trăm, 5 hàng phần nghìn (giá trị {5/1000}). Ý sai: đếm hàng lệch một bậc, coi chữ số cuối là hàng đơn vị.
      { type: 'tf', bai: 10, point: 2, level: 1,
        prompt: 'Cho số 36,725. Đúng ghi Đ, sai ghi S:',
        items: ['Phần nguyên của số đó là 36.', 'Chữ số 7 thuộc hàng phần mười.', 'Chữ số 2 thuộc hàng phần nghìn.', 'Chữ số 5 có giá trị là 5 đơn vị.'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // 125° lớn hơn 90° và bé hơn 180°: góc tù. Nhiễu: góc nhọn, góc vuông, góc bẹt.
      { type: 'mc', bai: 8, point: 2, level: 1,
        prompt: 'Góc có số đo 125° là:',
        options: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'], ans: 2 },
      // So hàng phần mười trước: 0,8 có 8 phần mười, lớn nhất. Nhiễu: chọn số có nhiều chữ số nhất (0,795), số có hai chữ số (0,75), nhìn 9 ở 0,09.
      { type: 'mc', bai: 11, point: 3, level: 2,
        prompt: 'Số lớn nhất trong các số 0,795; 0,8; 0,75; 0,09 là:',
        options: ['0,795', '0,8', '0,75', '0,09'], ans: 1 },
      // Ôn Bài 4, dùng để viết số thập phân: {3/25} = {3 × 4 / 25 × 4} = {12/100}. Nhiễu: giữ tử đổi mẫu ({3/100}), nhân 10 ra mẫu 250 ({30/250}), nhân 2 ra mẫu 50 ({6/50}).
      { type: 'mc', bai: 4, point: 2, level: 2, review: true,
        prompt: 'Phân số {3/25} viết thành phân số thập phân là:',
        options: ['{3/100}', '{30/250}', '{6/50}', '{12/100}'], ans: 3 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Ôn đặt tính với số tự nhiên (Bài 2): nền cho cộng, trừ, nhân, chia số thập phân sau này.
      { type: 'calc', bai: 2, point: 0, level: 1, col: true, review: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['45 608 + 27 594', '60 302 − 18 465', '264 × 35', '12 768 : 56'] },
      // Mỗi đơn vị độ dài, khối lượng một chữ số: 6 kg 45 g = 6,045 kg (không phải 6,45); 7 m 5 dm = 7,5 m; 2 tấn 350 kg = 2,35 tấn; 360 g = 0,36 kg.
      { type: 'fill', bai: 12, point: 1, level: 2,
        prompt: 'Viết số thập phân thích hợp vào chỗ chấm:',
        items: [
          { t: '7 m 5 dm = … m', ans: [7.5] },
          { t: '6 kg 45 g = … kg', ans: [6.045] },
          { t: '2 tấn 350 kg = … tấn', ans: [2.35] },
          { t: '360 g = … kg', ans: [0.36] },
        ] },
      // 1{1/2} giờ = 1 giờ 30 phút = 90 phút; 19 giờ 45 phút + 1 giờ 30 phút = 21 giờ 15 phút (60 phút đổi thành 1 giờ).
      { type: 'fill', bai: 8, point: 1, level: 3,
        prompt: 'Một bộ phim hoạt hình bắt đầu chiếu lúc 19 giờ 45 phút và kéo dài 1{1/2} giờ. Hỏi bộ phim kết thúc lúc mấy giờ?',
        items: [
          { t: '1{1/2} giờ = … phút', ans: [90] },
          { t: 'Bộ phim kết thúc lúc … giờ … phút.', ans: [21, 15] },
        ] },
      // Đổi về xăng-ti-mét để trừ: 5 m 6 cm = 506 cm; 506 − 235 = 271 cm; 271 cm = 2,71 m.
      { type: 'fill', bai: 12, point: 0, level: 3,
        prompt: 'Một cuộn dây dài 5 m 6 cm. Bác thợ cắt đi 2 m 35 cm. Hỏi cuộn dây còn lại dài bao nhiêu mét (viết dưới dạng số thập phân)?',
        items: [
          { t: '5 m 6 cm = … cm', ans: [506] },
          { t: 'Cuộn dây còn lại: 506 − 235 = … (cm)', ans: [271] },
          { t: '271 cm = … m', ans: [2.71] },
        ] },
    ] },
  ],
};
