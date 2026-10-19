/** Kiểm tra giữa học kì I (Đề 3): Bài 1–18 Toán 5 (Nhanh 1 đến 5). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { fracBars } from './art.js';

export default {
  id: 'l5-gk-1c',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 3)',
  short: 'Giữa kì I · Đề 3',
  after: { book: 'tool5', units: '1-18' },
  desc: 'Viết số thành tổng; so sánh phân số; trừ phân số; hỗn số; tấn, yến; số thập phân, so sánh; viết số đo diện tích dạng số thập phân; làm tròn; héc-ta; các đơn vị đo diện tích',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // 3 cm = {3/100} m = 0,03 m. Nhiễu: coi cm là phần mười (0,3), giữ nguyên số (3,0), thêm thừa chữ số 0 (0,003).
      { type: 'mc', bai: 10, point: 0, level: 1,
        prompt: '3 cm = … m. Số thích hợp viết vào chỗ chấm là:',
        options: ['0,03', '0,3', '3,0', '0,003'], ans: 0 },
      // Ý sai: 730 502 = … + 500 + 2 (không phải 20); 90 406 = 90 000 + 400 + 6 (không phải 60), chữ số đặt nhầm hàng.
      { type: 'tf', bai: 1, point: 2, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['605 270 = 600 000 + 5 000 + 200 + 70', '48 019 = 40 000 + 8 000 + 10 + 9', '730 502 = 700 000 + 30 000 + 500 + 20', '90 406 = 90 000 + 400 + 60'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // Hai băng tô hết, băng thứ ba tô 3 trong 4 phần: 2{3/4}.
      // Nhiễu: đếm cả băng thứ ba là một băng (3{3/4}), quên các băng tô hết ({3/4}), lấy phần không tô (2{1/4}).
      { type: 'mc', bai: 7, point: 0, level: 1,
        prompt: 'Mỗi băng giấy là 1 đơn vị. Hỗn số chỉ phần đã tô màu là:',
        fig: fracBars([{ n: 4, k: 4 }, { n: 4, k: 4 }, { n: 4, k: 3 }]),
        options: ['2{3/4}', '3{3/4}', '{3/4}', '2{1/4}'], ans: 0 },
      // Cùng tử số 5: mẫu bé nhất (6) thì phân số lớn nhất. Nhiễu: chọn mẫu lớn nhất ({5/11}), mẫu bé thứ hai ({5/7}), mẫu khác ({5/9}).
      { type: 'mc', bai: 3, point: 4, level: 1,
        prompt: 'Phân số lớn nhất trong các phân số {5/7}; {5/9}; {5/6}; {5/11} là:',
        options: ['{5/7}', '{5/9}', '{5/6}', '{5/11}'], ans: 2 },
      // Diện tích: mỗi đơn vị hai chữ số: 5 m² 6 dm² = 5{6/100} m² = 5,06 m².
      // Nhiễu: viết một chữ số như độ dài (5,6), ba chữ số (5,006), quên dấu phẩy (56).
      { type: 'mc', bai: 12, point: 2, level: 1,
        prompt: '5 m² 6 dm² = … m². Số thích hợp viết vào chỗ chấm là:',
        options: ['5,06', '5,6', '5,006', '56'], ans: 0 },
      // Hàng phần nghìn là 6 (≥ 5) nên làm tròn lên 4,74.
      // Nhiễu: làm tròn xuống (4,73), làm tròn đến hàng phần mười (4,7), làm tròn lên ở hàng phần mười (4,8).
      { type: 'mc', bai: 13, point: 2, level: 1,
        prompt: 'Làm tròn số 4,736 đến hàng phần trăm thì được số:',
        options: ['4,74', '4,73', '4,7', '4,8'], ans: 0 },
      // 2 m² 5 dm² = 205 dm²; 615 dm² = 6 m² 15 dm²; 40 cm² 4 mm² = 4 004 mm²; 7 km² 20 ha = 720 ha.
      { type: 'match', bai: 16, point: 2, level: 1,
        prompt: 'Nối hai số đo bằng nhau:',
        left: ['2 m² 5 dm²', '615 dm²', '40 cm² 4 mm²', '7 km² 20 ha'],
        right: ['4 004 mm²', '720 ha', '205 dm²', '6 m² 15 dm²'], ans: [2, 3, 0, 1] },
      // 3 tấn = 3 000 kg, 5 yến = 50 kg: 3 050 kg. Nhiễu: coi 1 yến = 100 kg (3 500), viết liền 3 và 05 (305), coi 5 yến = 5 kg (3 005).
      { type: 'mc', bai: 8, point: 0, level: 1,
        prompt: 'Một con voi nặng 3 tấn 5 yến. Con voi đó nặng bao nhiêu ki-lô-gam?',
        options: ['3 050 kg', '3 500 kg', '305 kg', '3 005 kg'], ans: 0 },
      // 2 = {10/5}; {10/5} − {3/5} = {7/5}.
      // Nhiễu: viết 2 thành {5/5} như số 1 ({2/5}), cộng thay trừ ({13/5}), lấy 3 − 2 ở tử số ({1/5}).
      { type: 'mc', bai: 6, point: 3, level: 2,
        prompt: '2 − {3/5} = ?',
        options: ['{7/5}', '{2/5}', '{13/5}', '{1/5}'], ans: 0 },
      // A: 150 × 150 = 22 500 m²; B: 400 × 50 = 20 000 m². A lớn hơn 2 500 m².
      // Nhiễu: thấy B dài hơn nên lớn hơn, so chu vi (A 600 m, B 900 m, hơn kém 300), cho là bằng nhau.
      { type: 'mc', bai: 15, point: 3, level: 3,
        prompt: 'Mảnh đất A hình vuông cạnh 150 m. Mảnh đất B hình chữ nhật dài 400 m, rộng 50 m. Mảnh đất nào có diện tích lớn hơn?',
        options: ['Mảnh A, lớn hơn 2 500 m²', 'Mảnh B, lớn hơn 2 500 m²', 'Mảnh B, lớn hơn 300 m²', 'Hai mảnh rộng bằng nhau'],
        cols: 1, ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'compare', bai: 11, point: 3, level: 2,
        prompt: 'Điền dấu >, <, = thích hợp:',
        items: ['0,9 □ 0,45', '2,875 □ 3,1', '12,30 □ 12,3', '7,08 □ 7,079'] },
      { type: 'calc', bai: 2, point: 1, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['53 608 + 29 475', '70 000 − 38 456', '1 208 × 35', '14 040 : 45'] },
      // {5/8} × {4/15} = {20/120} = {1/6}; {7/12} : {7/4} = {28/84} = {1/3}; 1{1/2} + 2{1/3} = {3/2} + {7/3} = {9/6} + {14/6} = {23/6}.
      { type: 'fill', bai: [5, 7], point: 2, level: 2,
        prompt: 'Tính (rút gọn nếu được):',
        items: [
          { t: '{5/8} × {4/15} = {…/…}', ans: [1, 6] },
          { t: '{7/12} : {7/4} = {…/…}', ans: [1, 3] },
          { t: '1{1/2} + 2{1/3} = {…/…}', ans: [23, 6] },
        ] },
      // Tổng 52, hiệu 28: tuổi bố (52 + 28) : 2 = 40; tuổi con 40 − 28 = 12.
      { type: 'fill', bai: 2, point: 4, level: 3,
        prompt: 'Năm nay tuổi bố và tuổi con cộng lại là 52 tuổi. Bố hơn con 28 tuổi. Tính tuổi của mỗi người.',
        items: [
          { t: 'Tuổi bố: (52 + 28) : 2 = … (tuổi)', ans: [40] },
          { t: 'Tuổi con: 40 − 28 = … (tuổi)', ans: [12] },
        ] },
      // S = 35 × 20 = 700 m²; trồng rau {2/5} × 700 = 280 m² = 28 000 dm² (1 m² = 100 dm²).
      { type: 'fill', bai: [5, 16], point: 1, level: 3,
        prompt: 'Một mảnh vườn hình chữ nhật dài 35 m, rộng 20 m. Người ta dùng {2/5} diện tích mảnh vườn để trồng rau. Tính diện tích trồng rau, rồi viết số đo đó theo đề-xi-mét vuông.',
        items: [
          { t: 'Diện tích mảnh vườn: 35 × 20 = … (m²)', ans: [700] },
          { t: 'Diện tích trồng rau: 700 × {2/5} = … (m²)', ans: [280] },
          { t: 'Đổi: 280 m² = … dm²', ans: [28000] },
        ] },
    ] },
  ],
};
