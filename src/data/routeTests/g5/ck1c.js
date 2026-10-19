/** Kiểm tra cuối học kì I (Đề 3): Bài 1–35 Toán 5 (Nhanh 1 đến 8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { hundred, decLine, triangle, trapezoid, round } from './art.js';

export default {
  id: 'l5-ck-1c',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 3)',
  short: 'Cuối kì I · Đề 3',
  after: { book: 'tool5', units: '1-35' },
  desc: 'Viết số thành tổng, phân số bằng nhau, phân số thập phân trên tia số, hỗn số; số thập phân, viết số đo khối lượng, độ dài, làm tròn, ha; cộng, trừ, chia số thập phân, nhân với 0,1; đường cao hình thang, hình tam giác tù, chu vi hình tròn',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Tô 35 ô trong 100 ô: {35/100} = 0,35. Nhiễu: 3,5 (một chữ số sau dấu phẩy), 0,035 (thừa chữ số 0), 35 (quên dấu phẩy).
      { type: 'mc', bai: 10, point: 0, level: 1,
        prompt: 'Hình vuông được chia thành 100 ô bằng nhau. Số thập phân chỉ phần đã tô màu là:',
        fig: hundred(35, { size: 150 }),
        options: ['3,5', '0,35', '0,035', '35'], ans: 1 },
      // 6 040 205 = 6 000 000 + 40 000 + 200 + 5. Nhiễu: nhầm 4 ở hàng trăm nghìn, nhầm 2 ở hàng nghìn, bỏ một chữ số 0 của hàng triệu.
      { type: 'mc', bai: 1, point: 2, level: 1,
        prompt: 'Số 6 040 205 viết thành tổng là:',
        options: ['6 000 000 + 400 000 + 200 + 5', '6 000 000 + 40 000 + 2 000 + 5', '6 000 000 + 40 000 + 200 + 5', '600 000 + 40 000 + 200 + 5'], ans: 2 },
      // {3/5} = {6/10} (nhân cả tử và mẫu với 2). Nhiễu: đảo tử mẫu ({5/3}), cộng thêm 3 vào cả tử và mẫu ({6/8}), nhân tử 3 mẫu 5 ({9/25}).
      { type: 'mc', bai: 3, point: 1, level: 1,
        prompt: 'Phân số nào bằng phân số {3/5}?',
        options: ['{5/3}', '{6/8}', '{6/10}', '{9/25}'], ans: 2 },
      // "Ba và hai phần bảy": phần nguyên 3, phần phân số {2/7}. Nhiễu: đổi chỗ phần nguyên và tử số, đảo tử mẫu, viết liền 32.
      { type: 'mc', bai: 7, point: 1, level: 1,
        prompt: 'Hỗn số "ba và hai phần bảy" viết là:',
        options: ['2{3/7}', '3{2/7}', '3{7/2}', '{32/7}'], ans: 1 },
      // 1 kg = 1 000 g nên 8 kg 75 g = 8,075 kg; 275 g = 0,275 kg; 1 m = 100 cm: 2 m 15 cm = 2,15 m; 5 m 4 dm = 5,4 m.
      { type: 'match', bai: 12, point: 1, level: 1,
        prompt: 'Nối mỗi số đo ở cột A với số thập phân bằng nó ở cột B:',
        heads: ['A', 'B'],
        left: ['8 kg 75 g = … kg', '275 g = … kg', '2 m 15 cm = … m', '5 m 4 dm = … m'],
        right: ['5,4', '8,075', '2,15', '0,275'], ans: [1, 3, 2, 0] },
      // 6,325: chữ số hàng phần nghìn là 5 nên làm tròn lên 6,33. Nhiễu: làm tròn xuống (6,32), làm tròn đến hàng phần mười (6,3), làm tròn hai lần (6,4).
      { type: 'mc', bai: 13, point: 2, level: 1,
        prompt: 'Làm tròn số 6,325 đến hàng phần trăm thì được số:',
        options: ['6,32', '6,33', '6,3', '6,4'], ans: 1 },
      // Nhân với 0,1: chuyển dấu phẩy sang trái một chữ số. Nhiễu: chuyển sang phải (152,3), hai chữ số (0,1523), viết thêm 0 (15,230 = 15,23).
      { type: 'mc', bai: 23, point: 1, level: 1,
        prompt: '15,23 × 0,1 = ?',
        options: ['152,3', '1,523', '0,1523', '15,230'], ans: 1 },
      // AH vuông góc với hai đáy là đường cao. Nhiễu: cạnh bên AD, BC (không vuông góc với đáy), đáy lớn DC.
      { type: 'mc', bai: 26, point: 1, level: 1,
        prompt: 'Đoạn thẳng nào là đường cao của hình thang ABCD?',
        fig: trapezoid({ width: 250 }),
        options: ['AD', 'AH', 'BC', 'DC'], ans: 1 },
      // 25,9 − 13,84 = 25,90 − 13,84 = 12,06. Nhiễu: lấy 4 − 0 thay vì mượn (12,14), viết 25,9 thành 25,09 (11,25), quên dấu phẩy chỗ đúng (120,6).
      { type: 'mc', bai: 20, point: 2, level: 1,
        prompt: 'Kết quả của phép tính 25,9 − 13,84 là:',
        options: ['12,14', '11,25', '12,06', '120,6'], ans: 2 },
      // Từ 0 đến 1 chia 10 phần, A ở vạch thứ 7: {7/10}. Nhiễu: {7/100} (nhầm mẫu), {1/7} (đảo), {3/10} (đếm từ 1 ngược lại).
      { type: 'mc', bai: 4, point: 3, level: 2,
        prompt: 'Đoạn từ 0 đến 1 trên tia số được chia thành 10 phần bằng nhau. Điểm A ứng với phân số thập phân nào?',
        fig: decLine({ from: 0, step: 0.1, n: 11, labels: { 7: 'A' } }),
        options: ['{7/100}', '{1/7}', '{3/10}', '{7/10}'], ans: 3 },
      // 3 − {1/4} = {12/4} − {1/4} = {11/4}; {1/3} + {1/6} = {3/6} = {1/2}; {5/6} − {1/2} = {2/6} = {1/3}.
      // Ý sai: {2/5} + {1/2} = {9/10}, không cộng tử với tử, mẫu với mẫu.
      { type: 'tf', bai: 6, point: 0, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['{1/3} + {1/6} = {1/2}', '{2/5} + {1/2} = {3/7}', '3 − {1/4} = {11/4}', '{5/6} − {1/2} = {1/3}'],
        ans: ['Đ', 'S', 'Đ', 'Đ'] },
      // 200 × 200 = 40 000 m² = 4 ha. Nhiễu: coi 1 ha = 1 000 m² (40 ha), coi 1 ha = 100 000 m² (0,4 ha), tính chu vi 800 m rồi coi là 8 ha.
      { type: 'mc', bai: 15, point: 2, level: 2,
        prompt: 'Một khu đất hình vuông có cạnh 200 m. Diện tích khu đất là bao nhiêu héc-ta?',
        options: ['40 ha', '4 ha', '0,4 ha', '8 ha'], ans: 1 },
      // (4,75 + 5,25) + 13,8 = 10 + 13,8 = 23,8. Nhiễu: quên nhớ (22,8), viết 23,08 (sai hàng), chỉ cộng hai số đầu (18,55).
      { type: 'mc', bai: 19, point: 3, level: 2,
        prompt: 'Tính bằng cách thuận tiện: 4,75 + 13,8 + 5,25 = ?',
        options: ['22,8', '23,8', '23,08', '18,55'], ans: 1 },
      // Tam giác tù: chân đường cao H nằm ngoài đáy BC (trên phần kéo dài). Ý sai: H nằm trên cạnh BC.
      { type: 'tf', bai: 25, point: 1, level: 2,
        prompt: 'Quan sát hình tam giác ABC. Đúng ghi Đ, sai ghi S:',
        fig: triangle({ kind: 'obtuse', width: 260 }),
        items: ['Tam giác ABC là tam giác tù.', 'AH là đường cao ứng với đáy BC.', 'Điểm H nằm trên cạnh BC.', 'Diện tích tam giác ABC bằng BC × AH : 2.'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // Chuyển dấu phẩy ở số chia và số bị chia cùng số chữ số. Ý sai: 3,6 : 0,12 = 360 : 12 (phải viết thêm 0), không phải 36 : 12.
      { type: 'tf', bai: 22, point: 3, level: 3,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['2,48 : 1,6 = 24,8 : 16', '57 : 9,5 = 570 : 95', '3,6 : 0,12 = 36 : 12', '7 : 0,5 = 14'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // C = 3,14 × 5 × 2 = 31,4 cm. Nhiễu: tính diện tích (78,5), quên nhân 2 (15,7), nhân 4 (62,8).
      { type: 'mc', bai: 27, point: 1, level: 3,
        prompt: 'Chu vi của hình tròn tâm O dưới đây là:',
        fig: round({ r: '5 cm', size: 160 }),
        options: ['78,5 cm', '15,7 cm', '31,4 cm', '62,8 cm'], ans: 2 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [19, 20, 21, 22], point: 0, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['86,4 + 7,58', '73,05 − 28,6', '2,35 × 4,2', '35,28 : 7'] },
      // 1 m² = 100 dm²; 1 cm² = 100 mm²; 1 km² = 100 ha.
      { type: 'table', bai: 16, point: 2, level: 2,
        prompt: 'Viết số thích hợp vào ô trống:',
        head: ['Số đo', 'Đổi ra đơn vị', 'Kết quả'],
        rows: [['2 m² 5 dm²', 'dm²', '…'], ['40 cm² 4 mm²', 'mm²', '…'], ['12 km² 50 ha', 'ha', '…']],
        ans: [[205], [4004], [1250]] },
      // Tổng 64,8 l, hiệu 7,2 l: thùng thứ nhất (64,8 + 7,2) : 2 = 36 l; thùng thứ hai 36 − 7,2 = 28,8 l.
      { type: 'fill', bai: 2, point: 4, level: 3,
        prompt: 'Hai thùng dầu có tất cả 64,8 l. Thùng thứ nhất nhiều hơn thùng thứ hai 7,2 l. Hỏi mỗi thùng có bao nhiêu lít dầu?',
        items: [
          { t: 'Thùng thứ nhất: (… + …) : 2 = … (l)', ans: [64.8, 7.2, 36] },
          { t: 'Thùng thứ hai có … l dầu.', ans: 28.8 },
        ] },
      // S = 25,5 × 12,4 = 316,2 m²; rau: 316,2 × 2,5 = 790,5 kg.
      { type: 'fill', bai: 21, point: 1, level: 3,
        prompt: 'Một mảnh vườn hình chữ nhật có chiều dài 25,5 m, chiều rộng 12,4 m. Trung bình mỗi mét vuông thu hoạch được 2,5 kg rau. Hỏi cả mảnh vườn thu hoạch được bao nhiêu ki-lô-gam rau?',
        items: [
          { t: 'Diện tích mảnh vườn: 25,5 × 12,4 = … (m²)', ans: 316.2 },
          { t: 'Cả mảnh vườn thu hoạch được … kg rau.', ans: 790.5 },
        ] },
    ] },
  ],
};
