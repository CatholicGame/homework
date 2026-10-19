/** Kiểm tra nhanh 4: Bài 10–12 Toán 5 (khái niệm số thập phân; so sánh các số thập phân; viết số đo đại lượng dưới dạng số thập phân). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { decLine } from './art.js';

export default {
  id: 'l5-nh-04',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 4',
  short: 'Nhanh 4',
  after: { book: 'tool5', units: '10-12' },
  desc: 'Khái niệm số thập phân; so sánh các số thập phân; viết số đo đại lượng dưới dạng số thập phân',
  time: 30,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Từ 0 đến 1 chia 10 phần, mỗi phần {1/10} = 0,1; A ở vạch thứ 7: 0,7. Nhiễu: đếm vạch thành số tự nhiên (7),
      // nhầm phần mười với phần trăm (0,07 và {7/100}).
      { type: 'mc', bai: 10, point: 0, level: 1,
        prompt: 'Điểm A trên tia số ứng với số nào?',
        fig: decLine({ from: 0, step: 0.1, n: 11, labels: { 7: 'A' } }),
        options: ['7', '0,7', '0,07', '{7/100}'], ans: 1 },
      // 0,9 = 0,90 > 0,45 (so hàng phần mười, không so số chữ số); 2,875 < 3,1 vì phần nguyên 2 < 3; 0,7 = 0,70;
      // 5,08 < 5,1 vì hàng phần mười 0 < 1 (thấy 08 > 1 nên tưởng lớn hơn).
      { type: 'tf', bai: 11, point: 3, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['0,9 > 0,45', '2,875 > 3,1', '0,7 = 0,70', '5,08 > 5,1'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 5 m 7 cm = 5{7/100} m = 5,07 m (cm là hàng phần trăm của mét). Nhiễu: viết 7 ngay sau dấu phẩy (5,7),
      // thêm hai chữ số 0 như đổi ra mm (5,007), ghép thành 57.
      { type: 'mc', bai: 12, point: 1, level: 1,
        prompt: '5 m 7 cm = … m. Số thích hợp điền vào chỗ chấm là:',
        options: ['5,7', '5,07', '5,007', '57'], ans: 1 },
      // Hàng phần nghìn có chữ số 4, hàng phần mười, phần trăm trống thì viết 0: 12,004. Nhiễu: thiếu một chữ số 0 (12,04), bỏ hết 0 (12,4), thừa 0.
      { type: 'mc', bai: 10, point: 3, level: 1,
        prompt: 'Số thập phân "mười hai phẩy không không bốn" được viết là:',
        options: ['12,04', '12,004', '12,4', '12,0004'], ans: 1 },
      // 25,368: 3 phần mười, 6 phần trăm, 8 phần nghìn. Nhiễu: đếm hàng như số tự nhiên (hàng chục), lệch một hàng.
      { type: 'mc', bai: 10, point: 2, level: 1,
        prompt: 'Trong số 25,368, chữ số 6 thuộc hàng nào?',
        options: ['Hàng chục', 'Hàng phần mười', 'Hàng phần trăm', 'Hàng phần nghìn'], ans: 2 },
      // Cùng phần nguyên 7, so hàng phần mười: 7,1 có 1, các số kia có 0, nên 7,1 lớn nhất. Nhiễu: số nhiều chữ số hơn (7,089), 09 > 1 (7,09).
      { type: 'mc', bai: 11, point: 1, level: 2,
        prompt: 'Số lớn nhất trong các số 7,09; 7,1; 7,089; 7,01 là:',
        options: ['7,09', '7,1', '7,089', '7,01'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Khối lượng: mỗi đơn vị một chữ số (8 kg 75 g = 8,075 kg; 450 g = 0,45 kg; 3 tấn 25 kg = 3,025 tấn);
      // diện tích: mỗi đơn vị hai chữ số (2 m² 6 dm² = 2,06 m², không phải 2,6).
      { type: 'fill', bai: 12, point: 3, level: 2,
        prompt: 'Viết số thập phân thích hợp vào chỗ chấm:',
        items: [
          { t: '8 kg 75 g = … kg', ans: [8.075] },
          { t: '450 g = … kg', ans: [0.45] },
          { t: '3 tấn 25 kg = … tấn', ans: [3.025] },
          { t: '2 m² 6 dm² = … m²', ans: [2.06] },
        ] },
      // Ai chạy hết ít giây nhất thì nhanh nhất. So phần nguyên rồi hàng phần mười, phần trăm: 15,75 < 15,8 < 16,05 < 16,1.
      // Lỗi hay gặp: thấy 16,05 nhiều chữ số hơn 16,1 nên cho là lớn hơn; thấy 75 > 8 nên cho 15,75 > 15,8; nghĩ nhiều giây là nhanh.
      { type: 'fill', bai: 11, point: 1, level: 3,
        prompt: 'Bốn bạn thi chạy 100 m. Thời gian chạy của An là 15,8 giây, của Bình là 16,05 giây, của Chi là 15,75 giây, của Dũng là 16,1 giây.',
        items: [
          { t: 'Viết các số đo thời gian theo thứ tự từ bé đến lớn: … giây; … giây; … giây; … giây', ans: [15.75, 15.8, 16.05, 16.1] },
          { t: 'Bạn chạy nhanh nhất là bạn …', ans: 'Chi', choices: ['An', 'Bình', 'Chi', 'Dũng'] },
          { t: 'Bạn chạy chậm nhất là bạn …', ans: 'Dũng', choices: ['An', 'Bình', 'Chi', 'Dũng'] },
        ] },
      // Độ dài: mỗi đơn vị một chữ số. 3 m 45 cm = 3,45 m; 7 m 4 dm = 7,4 m; 6 km 25 m = 6,025 km (thiếu hàng trăm mét viết 0); 9 dm = 0,9 m.
      { type: 'fill', bai: 12, point: 1, level: 2,
        prompt: 'Viết số thập phân thích hợp vào chỗ chấm:',
        items: [
          { t: '3 m 45 cm = … m', ans: [3.45] },
          { t: '7 m 4 dm = … m', ans: [7.4] },
          { t: '6 km 25 m = … km', ans: [6.025] },
          { t: '9 dm = … m', ans: [0.9] },
        ] },
      // 45 kg 500 g = 45,5 kg; 45 kg 50 g = 45,05 kg (không phải 45,5). So sánh 45,5 > 45,05 = 45,05: bao thứ nhất nặng nhất,
      // bao thứ hai bằng bao thứ ba. Bẫy: thấy 500 g và 50 g đều viết thành 45,5.
      { type: 'fill', bai: 12, point: 1, level: 3,
        prompt: 'Có ba bao gạo. Bao thứ nhất nặng 45 kg 500 g, bao thứ hai nặng 45,05 kg, bao thứ ba nặng 45 kg 50 g.',
        items: [
          { t: 'Bao thứ nhất: 45 kg 500 g = … kg', ans: [45.5] },
          { t: 'Bao thứ ba: 45 kg 50 g = … kg', ans: [45.05] },
          { t: 'Bao nặng nhất là …', ans: 'bao thứ nhất', choices: ['bao thứ nhất', 'bao thứ hai', 'bao thứ ba'] },
          { t: 'Bao thứ hai nặng bằng …', ans: 'bao thứ ba', choices: ['bao thứ nhất', 'bao thứ ba'] },
        ] },
    ] },
  ],
};
