/** Kiểm tra cuối học kì I (Đề 1): Bài 1–35 Toán 5 (Nhanh 1 đến 8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { triangle, trapezoid } from './art.js';

export default {
  id: 'l5-ck-1',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 1)',
  short: 'Cuối kì I · Đề 1',
  after: { book: 'tool5', units: '1-35' },
  desc: 'Số tự nhiên, phân số, hỗn số; số thập phân, so sánh, làm tròn, viết số đo; ha, km²; cộng, trừ, nhân, chia số thập phân; diện tích hình tam giác, hình thang; chu vi, diện tích hình tròn',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // "Mười hai phẩy không bốn" = 12,04. Nhiễu: bỏ chữ số 0 (12,4), thêm một chữ số 0 (12,004), quên dấu phẩy chỗ đúng (120,4).
      { type: 'mc', bai: 10, point: 3, level: 1,
        prompt: 'Số thập phân "mười hai phẩy không bốn" viết là:',
        options: ['12,4', '12,04', '12,004', '120,4'], ans: 1 },
      // 3 728 056: chữ số 7 ở hàng trăm nghìn. Nhiễu: lấy chữ số (7), nhầm hàng chục nghìn (70 000), hàng triệu (7 000 000).
      { type: 'mc', bai: 1, point: 1, level: 1,
        prompt: 'Trong số 3 728 056, chữ số 7 có giá trị là:',
        options: ['7', '70 000', '700 000', '7 000 000'], ans: 2 },
      // Phân số thập phân có mẫu số 10, 100, 1 000. Ý sai: mẫu 20 không phải; 100 nằm ở tử số cũng không phải.
      { type: 'tf', bai: 4, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['{7/10} là phân số thập phân.', '{9/20} là phân số thập phân.', '{43/100} là phân số thập phân.', '{100/7} là phân số thập phân.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 0,9 = 0,900 lớn nhất. Nhiễu: nghĩ số nhiều chữ số hơn thì lớn hơn (0,875), nhìn 45 > 9 (0,45), 0,09.
      { type: 'mc', bai: 11, point: 3, level: 1,
        prompt: 'Số lớn nhất trong các số 0,45; 0,875; 0,9; 0,09 là:',
        options: ['0,45', '0,875', '0,9', '0,09'], ans: 2 },
      // 3 m 8 cm = 3{8/100} m = 3,08 m. Nhiễu: viết 8 ngay sau dấu phẩy (3,8), coi 1 m = 1 000 cm (3,008), quên dấu phẩy (38).
      { type: 'mc', bai: 12, point: 1, level: 1,
        prompt: '3 m 8 cm = … m. Số thích hợp viết vào chỗ chấm là:',
        options: ['3,8', '3,08', '3,008', '38'], ans: 1 },
      // 7,46: chữ số hàng phần trăm là 6 ≥ 5 nên làm tròn lên 7,5. Nhiễu: làm tròn xuống (7,4), làm tròn đến số tự nhiên (7), đến hàng phần trăm (7,47).
      { type: 'mc', bai: 13, point: 1, level: 1,
        prompt: 'Làm tròn số 7,46 đến hàng phần mười thì được số:',
        options: ['7,4', '7,5', '7', '7,47'], ans: 1 },
      // 1 km² = 100 ha = 1 000 000 m²; 1 ha = 10 000 m² nên 5 ha = 50 000 m². Nhầm thường gặp: coi 1 km² = 1 000 ha như độ dài.
      { type: 'match', bai: 15, point: 1, level: 1,
        prompt: 'Nối mỗi dòng ở cột A với số thích hợp ở cột B:',
        heads: ['A', 'B'],
        left: ['1 km² = … ha', '1 ha = … m²', '1 km² = … m²', '5 ha = … m²'],
        right: ['10 000', '100', '50 000', '1 000 000'], ans: [1, 0, 3, 2] },
      // 6,53 + 12,8 = 19,33. Nhiễu: căn phải như số tự nhiên (7,81), quên nhớ sang hàng đơn vị (18,33), đặt sai dấu phẩy (193,3).
      { type: 'mc', bai: 19, point: 3, level: 1,
        prompt: 'Kết quả của phép tính 6,53 + 12,8 là:',
        options: ['7,81', '18,33', '19,33', '193,3'], ans: 2 },
      // Hình thang vuông: AD vuông góc với hai đáy nên AD là chiều cao. Ý sai: BC không song song với AD.
      { type: 'tf', bai: 26, point: 1, level: 1,
        prompt: 'ABCD là hình thang vuông. Đúng ghi Đ, sai ghi S:',
        fig: trapezoid({ right: true, width: 260 }),
        items: ['AB và DC là hai đáy của hình thang.', 'Cạnh AD vuông góc với cạnh DC.', 'AD là chiều cao của hình thang.', 'Cạnh BC song song với cạnh AD.'],
        ans: ['Đ', 'Đ', 'Đ', 'S'] },
      // 2{3/5} = (2 × 5 + 3)/5 = {13/5}. Nhiễu: ghép 2 và 3 thành 23, nhân 2 × 3, cộng 2 + 3.
      { type: 'mc', bai: 7, point: 2, level: 2,
        prompt: 'Hỗn số 2{3/5} viết thành phân số là:',
        options: ['{23/5}', '{13/5}', '{6/5}', '{5/5}'], ans: 1 },
      // 64 × 57 = 3 648: đếm chữ số phần thập phân của cả hai thừa số. Ý sai: 0,64 × 5,7 có ba chữ số thập phân = 3,648.
      { type: 'tf', bai: 21, point: 3, level: 2,
        prompt: 'Biết 64 × 57 = 3 648. Đúng ghi Đ, sai ghi S:',
        items: ['6,4 × 5,7 = 36,48', '6,4 × 0,57 = 3,648', '0,64 × 5,7 = 36,48', '64 × 0,57 = 36,48'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // 19,95 : 19 = 1,05 (hạ 9 được 9 < 19 nên viết 0 vào thương). Nhiễu: quên viết 0 (1,5), đặt dấu phẩy sai (10,5), thừa chữ số 0 (1,005).
      { type: 'mc', bai: 22, point: 2, level: 2,
        prompt: 'Kết quả của phép chia 19,95 : 19 là:',
        options: ['1,5', '1,05', '10,5', '1,005'], ans: 1 },
      // 1 m = 100 cm nên 12,6 cm = 12,6 : 100 m = 0,126 m. Nhiễu: chia 10 (1,26), nhân 10 (126), chia 1 000 (0,0126).
      { type: 'mc', bai: 23, point: 3, level: 2,
        prompt: '12,6 cm = … m. Số thích hợp viết vào chỗ chấm là:',
        options: ['1,26', '0,126', '126', '0,0126'], ans: 1 },
      // 2 dm = 20 cm; S = 20 × 15 : 2 = 150 cm². Nhiễu: quên đổi đơn vị (2 × 15 : 2 = 15), quên chia 2 (300), quên đổi và quên chia 2 (30).
      { type: 'mc', bai: 25, point: 3, level: 3,
        prompt: 'Hình tam giác ABC có đáy BC = 2 dm, chiều cao AH = 15 cm. Diện tích hình tam giác ABC là:',
        fig: triangle({ base: '2 dm', h: '15 cm', width: 260 }),
        options: ['150 cm²', '15 cm²', '300 cm²', '30 cm²'], ans: 0 },
      // Một vòng lăn = chu vi bánh xe = 3,14 × 0,6 = 1,884 (m); 10 vòng: 18,84 m.
      // Nhiễu: chỉ tính một vòng (1,884 m), lấy đường kính nhân 2 nữa (37,68 m), lấy 3,14 nhân bán kính 0,3 m mà quên nhân 2 (9,42 m).
      { type: 'mc', bai: 27, point: 1, level: 3,
        prompt: 'Bánh xe đạp của Minh có đường kính 0,6 m. Khi bánh xe lăn trên mặt đất được 10 vòng thì xe đi được quãng đường dài:',
        options: ['1,884 m', '18,84 m', '37,68 m', '9,42 m'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [19, 20, 21, 22], point: 0, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['35,76 + 8,9', '52,4 − 17,86', '2,7 × 4,6', '87,5 : 25'] },
      // {3/4} + {1/6} = {9/12} + {2/12} = {11/12}; {5/6} − {1/3} = {5/6} − {2/6} = {3/6} = {1/2}.
      { type: 'fill', bai: 6, point: 0, level: 2,
        prompt: 'Tính (rút gọn kết quả nếu được):',
        items: [
          { t: '{3/4} + {1/6} = {…/…}', ans: [11, 12] },
          { t: '{5/6} − {1/3} = {…/…}', ans: [1, 2] },
        ] },
      // x = 10,2 − 3,75 = 6,45; x = 9 : 2,5 = 3,6.
      { type: 'findx', bai: [20, 22], point: 0, level: 2,
        prompt: 'Tìm x:',
        items: [{ t: 'x + 3,75 = 10,2', ans: 6.45 }, { t: 'x × 2,5 = 9', ans: 3.6 }] },
      // S = (120 + 80) × 60 : 2 = 6 000 m²; 6 000 : 100 = 60 lần 100 m²; 60 × 65 = 3 900 kg.
      { type: 'fill', bai: 26, point: 2, level: 3,
        prompt: 'Một thửa ruộng hình thang có đáy lớn 120 m, đáy bé 80 m, chiều cao 60 m. Trung bình cứ 100 m² thu hoạch được 65 kg thóc. Hỏi thửa ruộng thu hoạch được bao nhiêu ki-lô-gam thóc?',
        items: [
          { t: 'Diện tích thửa ruộng: (… + …) × … : 2 = … (m²)', ans: [120, 80, 60, 6000] },
          { t: 'Thửa ruộng thu hoạch được … kg thóc.', ans: 3900 },
        ] },
      // Bán kính 6 : 2 = 3 (m); S = 3,14 × 3 × 3 = 28,26 m² (dùng bán kính, không dùng đường kính).
      { type: 'fill', bai: 27, point: 3, level: 3,
        prompt: 'Một bồn hoa hình tròn có đường kính 6 m. Tính diện tích bồn hoa.',
        items: [
          { t: 'Bán kính bồn hoa là … m.', ans: 3 },
          { t: 'Diện tích bồn hoa: 3,14 × … × … = … (m²)', ans: [3, 3, 28.26] },
        ] },
    ] },
  ],
};
