/** Kiểm tra giữa học kì I (Đề 2): Bài 1–18 Toán 5 (Nhanh 1 đến 5). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { hundred } from './art.js';

export default {
  id: 'l5-gk-1b',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 2)',
  short: 'Giữa kì I · Đề 2',
  after: { book: 'tool5', units: '1-18' },
  desc: 'So sánh số tự nhiên; rút gọn phân số; phân số thập phân; cộng, trừ phân số; số thập phân; giờ, phút; viết số đo dạng số thập phân; làm tròn; ki-lô-mét vuông, héc-ta; mi-li-mét vuông',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Số có bảy chữ số lớn nhất. Nhiễu: chỉ nhìn chữ số đầu (998 765, 999 999 có nhiều chữ số 9), lấy số đứng đầu dãy (985 432).
      { type: 'mc', bai: 1, point: 3, level: 1,
        prompt: 'Số lớn nhất trong các số 985 432; 1 002 345; 998 765; 999 999 là:',
        options: ['985 432', '1 002 345', '998 765', '999 999'], ans: 1 },
      // {18/24} chia cả tử và mẫu cho 6 được {3/4}. Nhiễu: chưa rút gọn hết ({9/12}, {6/8}), đảo tử và mẫu ({4/3}).
      { type: 'mc', bai: 3, point: 2, level: 1,
        prompt: 'Rút gọn phân số {18/24} được phân số tối giản là:',
        options: ['{3/4}', '{9/12}', '{6/8}', '{4/3}'], ans: 0 },
      // Tô 37 ô trong 100 ô: {37/100} = 0,37. Nhiễu: coi là 37 phần mười (3,7), thêm một chữ số 0 (0,037), quên dấu phẩy (37).
      { type: 'mc', bai: 10, point: 0, level: 1,
        prompt: 'Hình vuông được chia thành 100 ô bằng nhau. Số thập phân chỉ phần đã tô màu là:',
        fig: hundred(37),
        options: ['0,37', '3,7', '0,037', '37'], ans: 0 },
      // Ý sai: 3 m 8 cm = 3,08 m (không phải 3,8 m); 6 dm = 0,6 m (không phải 0,06 m).
      { type: 'tf', bai: 12, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['8 kg 75 g = 8,075 kg', '3 m 8 cm = 3,8 m', '275 g = 0,275 kg', '6 dm = 0,06 m'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 2 giờ = 120 phút, thêm 15 phút là 135 phút. Nhiễu: ghép 2 và 15 (215), chỉ đổi 1 giờ (75), quên 15 phút (120).
      { type: 'mc', bai: 8, point: 1, level: 1,
        prompt: 'Một bộ phim dài 2 giờ 15 phút. Bộ phim đó dài bao nhiêu phút?',
        options: ['135 phút', '215 phút', '75 phút', '120 phút'], ans: 0 },
      // Hàng phần trăm là 7 (≥ 5) nên làm tròn lên 6,5. Nhiễu: làm tròn xuống (6,4), làm tròn đến số tự nhiên (6, 7).
      { type: 'mc', bai: 13, point: 1, level: 1,
        prompt: 'Làm tròn số 6,47 đến hàng phần mười thì được số:',
        options: ['6,5', '6,4', '6', '7'], ans: 0 },
      // Nhân cả tử và mẫu: {3/5} = {6/10}; {9/25} = {36/100}; {1/2} = {5/10}; {3/125} = {24/1000}.
      { type: 'match', bai: 4, point: 2, level: 1,
        prompt: 'Nối mỗi phân số với phân số thập phân bằng nó:',
        left: ['{3/5}', '{9/25}', '{1/2}', '{3/125}'],
        right: ['{5/10}', '{24/1000}', '{6/10}', '{36/100}'], ans: [2, 3, 0, 1] },
      // 1 cm² = 100 mm². Nhiễu: coi gấp 10 lần như độ dài (50), gấp 1 000 lần (5 000), đổi ngược chiều (0,05).
      { type: 'mc', bai: 16, point: 0, level: 1,
        prompt: '5 cm² = … mm². Số thích hợp viết vào chỗ chấm là:',
        options: ['500', '50', '5 000', '0,05'], ans: 0 },
      // Ý sai: cộng tử với tử, mẫu với mẫu ({1/2} + {1/3} = {5/6}, không phải {2/5}); {4/5} − {1/2} = {3/10}, không phải {3/3}.
      { type: 'tf', bai: 5, point: 1, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['{2/7} + {3/7} = {5/7}', '{1/2} + {1/3} = {2/5}', '{3/4} − {1/4} = {1/2}', '{4/5} − {1/2} = {3/3}'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 1 km² = 100 ha nên 3 km² = 300 ha. Nhiễu: coi 1 km² = 10 ha (30), 1 km² = 1 000 ha (3 000), nhầm với 1 km² = 1 000 000 m² (3 000 000).
      { type: 'mc', bai: 15, point: 2, level: 2,
        prompt: 'Một khu rừng có diện tích 3 km². Diện tích khu rừng đó là:',
        options: ['300 ha', '30 ha', '3 000 ha', '3 000 000 ha'], ans: 0 },
      // x là số tự nhiên lớn hơn 2,8 và bé hơn 6,05: 3, 4, 5, 6 (4 số).
      // Nhiễu: bỏ số 6 vì nghĩ 6 > 6,05 (3 số), đếm cả 7 hoặc cả 2 (5 số), đếm từ 1 đến 6 (6 số).
      { type: 'mc', bai: 11, point: 0, level: 3,
        prompt: 'Có bao nhiêu số tự nhiên x thoả mãn 2,8 < x < 6,05?',
        options: ['3 số', '4 số', '5 số', '6 số'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // {2/3} + {1/4} = {8/12} + {3/12} = {11/12}; {5/6} − {2/9} = {15/18} − {4/18} = {11/18}; 3 − {4/7} = {21/7} − {4/7} = {17/7}.
      { type: 'fill', bai: 6, point: 1, level: 2,
        prompt: 'Tính (rút gọn nếu được):',
        items: [
          { t: '{2/3} + {1/4} = {…/…}', ans: [11, 12] },
          { t: '{5/6} − {2/9} = {…/…}', ans: [11, 18] },
          { t: '3 − {4/7} = {…/…}', ans: [17, 7] },
        ] },
      // 7,25 m; 5 kg 40 g = 5,040 kg = 5,04 kg; 3 tấn 6 tạ = 3,6 tấn; 9 cm = 0,09 m.
      { type: 'fill', bai: 12, point: 3, level: 2,
        prompt: 'Viết số thập phân thích hợp vào chỗ chấm:',
        items: [
          { t: '7 m 25 cm = … m', ans: [7.25] },
          { t: '5 kg 40 g = … kg', ans: [5.04] },
          { t: '3 tấn 6 tạ = … tấn', ans: [3.6] },
          { t: '9 cm = … m', ans: [0.09] },
        ] },
      // Sáng bán {3/8} của 840 = 315 kg; còn 525 kg; chiều bán {2/5} của 525 = 210 kg; còn 315 kg.
      { type: 'fill', bai: 5, point: 4, level: 3,
        prompt: 'Một cửa hàng có 840 kg gạo. Buổi sáng bán được {3/8} số gạo, buổi chiều bán được {2/5} số gạo còn lại. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam gạo?',
        items: [
          { t: 'Buổi sáng bán được: 840 × {3/8} = … (kg)', ans: [315] },
          { t: 'Số gạo còn lại sau buổi sáng: 840 − 315 = … (kg)', ans: [525] },
          { t: 'Buổi chiều bán được: 525 × {2/5} = … (kg)', ans: [210] },
          { t: 'Cửa hàng còn lại: 525 − 210 = … (kg)', ans: [315] },
        ] },
      // 2 ha = 20 000 m²; thửa lớn (20 000 + 1 600) : 2 = 10 800 m²; thửa bé 10 800 − 1 600 = 9 200 m².
      { type: 'fill', bai: [2, 15], point: 4, level: 3,
        prompt: 'Hai thửa ruộng có tổng diện tích là 2 ha. Thửa thứ nhất rộng hơn thửa thứ hai 1 600 m². Tính diện tích mỗi thửa ruộng theo mét vuông.',
        items: [
          { t: 'Đổi: 2 ha = … m²', ans: [20000] },
          { t: 'Thửa thứ nhất: (20 000 + 1 600) : 2 = … (m²)', ans: [10800] },
          { t: 'Thửa thứ hai: 10 800 − 1 600 = … (m²)', ans: [9200] },
        ] },
    ] },
  ],
};
