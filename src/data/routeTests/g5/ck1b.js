/** Kiểm tra cuối học kì I (Đề 2): Bài 1–35 Toán 5 (Nhanh 1 đến 8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { triangle, trapezoid } from './art.js';

export default {
  id: 'l5-ck-1b',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 2)',
  short: 'Cuối kì I · Đề 2',
  after: { book: 'tool5', units: '1-35' },
  desc: 'So sánh số tự nhiên, phân số, phân số thập phân, tấn, tạ; hàng của số thập phân, sắp xếp, làm tròn, viết số đo diện tích; trừ, nhân, chia số thập phân; hình tam giác vuông, diện tích hình tam giác, hình thang, hình tròn',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // So số chữ số trước: 1 020 345 và 1 002 345 có bảy chữ số, so hàng trăm nghìn rồi chục nghìn: 1 020 345 lớn nhất.
      // Nhiễu: thấy chữ số đầu 9 lớn (987 654, 998 760), so chưa tới hàng chục nghìn (1 002 345).
      { type: 'mc', bai: 1, point: 3, level: 1,
        prompt: 'Số lớn nhất trong các số 987 654; 1 002 345; 998 760; 1 020 345 là:',
        options: ['987 654', '1 002 345', '998 760', '1 020 345'], ans: 3 },
      // 45,327: sau dấu phẩy lần lượt phần mười (3), phần trăm (2), phần nghìn (7).
      // Nhiễu: đếm nhầm một hàng (phần mười, phần nghìn), quên chữ số ở bên phải dấu phẩy là phần thập phân (hàng chục).
      { type: 'mc', bai: 10, point: 2, level: 1,
        prompt: 'Trong số 45,327, chữ số 2 thuộc hàng nào?',
        options: ['Hàng phần mười', 'Hàng phần trăm', 'Hàng phần nghìn', 'Hàng chục'], ans: 1 },
      // Cùng tử số: mẫu bé hơn thì lớn hơn, nên {5/8} < {5/7} (ý sai). {2/3} = {8/12}; {3/4} = {9/12} > {8/12} = {2/3}.
      { type: 'tf', bai: 3, point: 4, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['{5/8} > {5/7}', '{7/12} > {5/12}', '{2/3} = {8/12}', '{3/4} > {2/3}'],
        ans: ['S', 'Đ', 'Đ', 'Đ'] },
      // {3/25} = (3 × 4)/(25 × 4) = {12/100}. Nhiễu: chỉ đổi mẫu số (3/100), nhân 10 cả hai (30/250 không phải phân số thập phân),
      // nhân tử số với 25 thay vì với 4 (75/100).
      { type: 'mc', bai: 4, point: 2, level: 1,
        prompt: 'Phân số {3/25} viết thành phân số thập phân là:',
        options: ['{3/100}', '{30/250}', '{12/100}', '{75/100}'], ans: 2 },
      // 3 tấn = 3 000 kg; 5 tạ = 500 kg; tổng 3 500 kg. Nhiễu: ghép chữ số (305), coi 5 tạ = 50 kg (3 050), coi 1 tạ = 1 000 kg (35 000).
      { type: 'mc', bai: 8, point: 0, level: 1,
        prompt: 'Một xe tải chở 3 tấn 5 tạ hàng. Xe chở được bao nhiêu ki-lô-gam hàng?',
        options: ['305 kg', '3 050 kg', '3 500 kg', '35 000 kg'], ans: 2 },
      // 31,56: chữ số hàng phần mười là 5 nên làm tròn lên 32. Nhiễu: làm tròn xuống (31), làm tròn đến hàng phần mười (31,6), bỏ hàng đơn vị (30).
      { type: 'mc', bai: 13, point: 0, level: 1,
        prompt: 'Bạn Lan cân nặng 31,56 kg. Làm tròn số đo đó đến số tự nhiên gần nhất thì được:',
        options: ['31 kg', '32 kg', '31,6 kg', '30 kg'], ans: 1 },
      // 4,43 − 4,16 = 0,27. Nhiễu: lấy chữ số lớn trừ chữ số bé ở hàng phần trăm (0,33), đặt sai dấu phẩy (2,7), viết sai phần nguyên (1,27).
      { type: 'mc', bai: 20, point: 3, level: 1,
        prompt: 'Kết quả của phép tính 4,43 − 4,16 là:',
        options: ['0,33', '2,7', '0,27', '1,27'], ans: 2 },
      // Chia cho 100: chuyển dấu phẩy sang trái hai chữ số. Nhiễu: nhân 100 (53 428), chuyển một chữ số (53,428), ba chữ số (0,53428).
      { type: 'mc', bai: 23, point: 2, level: 1,
        prompt: '534,28 : 100 = ?',
        options: ['53 428', '53,428', '5,3428', '0,53428'], ans: 2 },
      // Tam giác vuông tại B: cạnh góc vuông AB là đường cao ứng với đáy BC. Ý sai: tam giác vuông không có góc tù, không có ba góc nhọn.
      { type: 'tf', bai: 25, point: 1, level: 1,
        prompt: 'Quan sát hình tam giác ABC. Đúng ghi Đ, sai ghi S:',
        fig: triangle({ kind: 'right', width: 240 }),
        items: ['Tam giác ABC là tam giác vuông.', 'AB là đường cao ứng với đáy BC.', 'Tam giác ABC có một góc tù.', 'Tam giác ABC có ba góc nhọn.'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // Diện tích: mỗi đơn vị hai chữ số. Ý sai: 4 m² 5 dm² = 4,05 m² (không phải 4,5). 2 kg 75 g = 2,075 kg.
      { type: 'tf', bai: 12, point: 2, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['3 m² 6 dm² = 3,06 m²', '56 dm² = 0,56 m²', '4 m² 5 dm² = 4,5 m²', '7 m² 40 dm² = 7,4 m²'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // 2,875 < 3,09 < 3,1 < 3,25. Nhiễu: thấy 9 > 1 nên cho 3,09 > 3,1; xếp theo số chữ số; xếp ngược.
      { type: 'mc', bai: 11, point: 1, level: 2,
        prompt: 'Các số 3,1; 2,875; 3,09; 3,25 xếp theo thứ tự từ bé đến lớn là:',
        options: ['3,1; 3,09; 3,25; 2,875', '2,875; 3,09; 3,1; 3,25', '2,875; 3,1; 3,09; 3,25', '3,25; 3,1; 3,09; 2,875'], ans: 1 },
      // 615 dm² = 600 dm² + 15 dm² = 6 m² 15 dm² (1 m² = 100 dm²).
      // Nhiễu: coi 1 m² = 10 dm² (61 m² 5 dm²), tách sai (6 m² 5 dm²), quên đổi (615 m²).
      { type: 'mc', bai: 16, point: 2, level: 2,
        prompt: '615 dm² = …',
        options: ['61 m² 5 dm²', '6 m² 15 dm²', '615 m²', '6 m² 5 dm²'], ans: 1 },
      // 1,25 × 6 = 7,5 l. Nhiễu: quên dấu phẩy ở tích (75 l), tách thừa chữ số (0,75 l), cộng 6 vào phần nguyên (7,25 l).
      { type: 'mc', bai: 21, point: 0, level: 2,
        prompt: 'Mỗi chai nước mắm chứa 1,25 l. Hỏi 6 chai như thế chứa bao nhiêu lít nước mắm?',
        options: ['75 l', '7,5 l', '0,75 l', '7,25 l'], ans: 1 },
      // S = (5 + 9) × 4 : 2 = 28 cm². Nhiễu: quên chia 2 (56), cộng các số đo (18), nhân hai đáy rồi nhân chiều cao, chia 2 (90).
      { type: 'mc', bai: 26, point: 2, level: 2,
        prompt: 'Diện tích hình thang ABCD dưới đây là:',
        fig: trapezoid({ top: '5 cm', bottom: '9 cm', h: '4 cm', width: 260 }),
        options: ['56 cm²', '28 cm²', '18 cm²', '90 cm²'], ans: 1 },
      // 30 : 8 = 3 dư 6; viết dấu phẩy, thêm 0: 60 : 8 = 7 dư 4; 40 : 8 = 5. Thương 3,75 kg.
      // Nhiễu: viết số dư ngay sau dấu phẩy (3,6), dừng ở hàng phần mười (3,7), đặt sai dấu phẩy (37,5).
      { type: 'mc', bai: 22, point: 1, level: 3,
        prompt: 'Cô Hoa chia đều 30 kg gạo vào 8 túi. Mỗi túi có bao nhiêu ki-lô-gam gạo?',
        options: ['3,6 kg', '3,75 kg', '3,7 kg', '37,5 kg'], ans: 1 },
      // Bán kính 20 : 2 = 10 cm; S = 3,14 × 10 × 10 = 314 cm².
      // Nhiễu: dùng đường kính thay bán kính (1 256), tính chu vi (62,8), chỉ nhân một lần bán kính (31,4).
      { type: 'mc', bai: 27, point: 3, level: 3,
        prompt: 'Một chiếc đĩa hình tròn có đường kính 20 cm. Diện tích mặt đĩa là:',
        options: ['1 256 cm²', '62,8 cm²', '314 cm²', '31,4 cm²'], ans: 2 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [19, 20, 21, 22], point: 0, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['48,5 + 26,75', '60 − 23,45', '3,24 × 2,5', '45,36 : 12'] },
      // {5/8} của 96 = 96 × 5 : 8 = 60; {2/3} × {9/10} = {18/30} = {3/5}; {4/5} : {2/3} = {4/5} × {3/2} = {12/10} = {6/5}.
      { type: 'fill', bai: 5, point: 4, level: 2,
        prompt: 'Viết số thích hợp vào chỗ chấm (phân số rút gọn nếu được):',
        items: [
          { t: '{5/8} của 96 kg là … kg', ans: 60 },
          { t: '{2/3} × {9/10} = {…/…}', ans: [3, 5] },
          { t: '{4/5} : {2/3} = {…/…}', ans: [6, 5] },
        ] },
      // 280 000 × 2,5 = 700 000 đồng; 1 000 000 − 700 000 = 300 000 đồng.
      { type: 'fill', bai: 21, point: 0, level: 3,
        prompt: 'Mẹ mua 2,5 kg thịt bò, mỗi ki-lô-gam giá 280 000 đồng. Mẹ đưa cô bán hàng 1 000 000 đồng. Hỏi cô bán hàng phải trả lại mẹ bao nhiêu tiền?',
        items: [
          { t: 'Mua thịt bò hết: 280 000 × 2,5 = … (đồng)', ans: 700000 },
          { t: 'Cô bán hàng trả lại mẹ … đồng.', ans: 300000 },
        ] },
      // Chiều cao 36 × 2 : 3 = 24 m; S = 36 × 24 : 2 = 432 m².
      { type: 'fill', bai: 25, point: 2, level: 3,
        prompt: 'Một vườn hoa hình tam giác có đáy 36 m, chiều cao bằng {2/3} độ dài đáy. Tính diện tích vườn hoa.',
        items: [
          { t: 'Chiều cao của vườn hoa là … m.', ans: 24 },
          { t: 'Diện tích vườn hoa: … × … : 2 = … (m²)', ans: [36, 24, 432] },
        ] },
    ] },
  ],
};
