/** Kiểm tra giữa học kì I (Đề 4): Bài 1–18 Toán 5 (Nhanh 1 đến 5). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { decLine, angles } from './art.js';

export default {
  id: 'l5-gk-1d',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 4)',
  short: 'Giữa kì I · Đề 4',
  after: { book: 'tool5', units: '1-18' },
  desc: 'Hàng và lớp; quy đồng mẫu số; phân số thập phân trên tia số; nhân, chia, phân số của một số; góc tù; đọc số thập phân, so sánh; viết số đo dạng số thập phân; làm tròn; héc-ta, ki-lô-mét vuông',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // 305,08: phần nguyên "ba trăm linh năm", phần thập phân "không tám".
      // Nhiễu: bỏ chữ số 0 sau dấu phẩy (phẩy tám), đọc nhầm phần nguyên (ba trăm năm mươi, ba mươi lăm).
      { type: 'mc', bai: 10, point: 3, level: 1,
        prompt: 'Số thập phân 305,08 đọc là:',
        options: ['Ba trăm linh năm phẩy không tám', 'Ba trăm linh năm phẩy tám', 'Ba trăm năm mươi phẩy tám', 'Ba mươi lăm phẩy không tám'],
        cols: 1, ans: 0 },
      // 5 triệu, 4 chục nghìn, 3 trăm: 5 040 300. Nhiễu: đặt 4 vào hàng trăm nghìn (5 403 000, 5 400 300), quên hàng triệu (540 300).
      { type: 'mc', bai: 1, point: 0, level: 1,
        prompt: 'Số gồm 5 triệu, 4 chục nghìn và 3 trăm viết là:',
        options: ['5 040 300', '5 403 000', '540 300', '5 400 300'], ans: 0 },
      // Đoạn 0 đến 1 chia 10 phần, A ở vạch thứ 7: {7/10}. Nhiễu: nghĩ mỗi phần là {1/100} ({7/100}), lấy số vạch làm mẫu ({1/7}), đảo tử mẫu ({10/7}).
      { type: 'mc', bai: 4, point: 3, level: 1,
        prompt: 'Đoạn từ 0 đến 1 trên tia số chia thành 10 phần bằng nhau. Điểm A ứng với phân số thập phân nào?',
        fig: decLine({ labels: { 7: 'A' } }),
        options: ['{7/10}', '{7/100}', '{1/7}', '{10/7}'], ans: 0 },
      // Góc 3 (120°) lớn hơn góc vuông, bé hơn góc bẹt. Nhiễu: góc nhọn, góc vuông, góc bẹt "trông mở rộng nhất".
      { type: 'mc', bai: 8, point: 2, level: 1,
        prompt: 'Góc nào là góc tù?',
        fig: angles([
          { v: 'O', a: 'A', b: 'B', deg: 45, label: 'Góc 1' },
          { v: 'E', a: 'G', b: 'H', deg: 90, label: 'Góc 2' },
          { v: 'K', a: 'M', b: 'N', deg: 120, label: 'Góc 3' },
          { v: 'P', a: 'Q', b: 'R', deg: 180, label: 'Góc 4' },
        ], { cell: 180 }),
        options: ['Góc 1', 'Góc 2', 'Góc 3', 'Góc 4'], ans: 2 },
      // 2,349 → 2,3 (xét hàng phần trăm 4, chỉ làm tròn một lần); 19,7 → 20.
      // Ý sai: 5,45 làm tròn đến hàng phần mười là 5,5 (chữ số 5 thì làm tròn lên); 8,135 đến hàng phần trăm là 8,14.
      { type: 'tf', bai: 13, point: 3, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Làm tròn 2,349 đến hàng phần mười được 2,3.', 'Làm tròn 19,7 đến số tự nhiên gần nhất được 20.', 'Làm tròn 5,45 đến hàng phần mười được 5,4.', 'Làm tròn 8,135 đến hàng phần trăm được 8,13.'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // 2 tấn 45 kg = 2{45/1000} tấn = 2,045 tấn. Nhiễu: thiếu chữ số 0 (2,45), thừa chữ số 0 (2,0045), bỏ dấu phẩy (245).
      { type: 'mc', bai: 12, point: 1, level: 1,
        prompt: 'Một chiếc ô tô con nặng 2 tấn 45 kg. Viết cân nặng đó theo đơn vị tấn:',
        options: ['2,045 tấn', '2,45 tấn', '2,0045 tấn', '245 tấn'], ans: 0 },
      // 1 m² = 100 dm² = 10 000 cm² nên 4 m² = 40 000 cm². Nhiễu: chỉ nhân 100 (400), nhân 1 000 như độ dài (4 000), nhân 100 000 (400 000).
      { type: 'mc', bai: 16, point: 1, level: 1,
        prompt: '4 m² = … cm². Số thích hợp viết vào chỗ chấm là:',
        options: ['40 000', '400', '4 000', '400 000'], ans: 0 },
      // 12 chia hết cho 6 nên mẫu số chung là 12. Nhiễu: lấy tích hai mẫu (72), lấy tổng (18), lấy mẫu bé (6).
      { type: 'mc', bai: 3, point: 3, level: 1,
        prompt: 'Quy đồng mẫu số hai phân số {5/6} và {7/12}, mẫu số chung bé nhất là:',
        options: ['12', '72', '18', '6'], ans: 0 },
      // {2/5} × {3/4} = {6/20} = {3/10}; {3/4} : {1/2} = {6/4} = {3/2}; {5/6} × {3/5} = {15/30} = {1/2}; {4/9} : {2/3} = {12/18} = {2/3}.
      { type: 'match', bai: 5, point: 3, level: 2,
        prompt: 'Nối mỗi phép tính với kết quả của nó:',
        left: ['{2/5} × {3/4}', '{3/4} : {1/2}', '{5/6} × {3/5}', '{4/9} : {2/3}'],
        right: ['{1/2}', '{3/10}', '{2/3}', '{3/2}'], ans: [1, 3, 0, 2] },
      // 1 km² = 100 ha nên 500 ha = 5 km². Nhiễu: chia 10 (50), chia 1 000 (0,5), nhân 100 (50 000).
      { type: 'mc', bai: 15, point: 2, level: 2,
        prompt: 'Hồ Tây (Hà Nội) có diện tích khoảng 500 ha. Diện tích đó khoảng bao nhiêu ki-lô-mét vuông?',
        options: ['5 km²', '50 km²', '0,5 km²', '50 000 km²'], ans: 0 },
      // 6,□8 > 6,79: phần mười phải ≥ 7; bằng 7 thì 6,78 < 6,79 nên chỉ được 8 hoặc 9.
      // Nhiễu: chỉ so hàng phần mười, quên xét tiếp hàng phần trăm khi bằng 7 (7, 8, 9), chỉ nghĩ tới số lớn nhất (9), cho là không có.
      { type: 'mc', bai: 11, point: 1, level: 3,
        prompt: 'Chữ số nào viết vào ô trống để có 6,□8 > 6,79?',
        options: ['8 hoặc 9', '7, 8 hoặc 9', 'Chỉ có 9', 'Không có chữ số nào'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 1, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['38 547 + 46 869', '90 205 − 57 638', '3 076 × 48', '33 852 : 52'] },
      // Hai đơn vị diện tích liền nhau gấp 100 lần: 308 dm²; 25 m²; 640 ha; 120 000 m².
      { type: 'fill', bai: [16, 15], point: 2, level: 2,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: '3 m² 8 dm² = … dm²', ans: [308] },
          { t: '2 500 dm² = … m²', ans: [25] },
          { t: '6 km² 40 ha = … ha', ans: [640] },
          { t: '12 ha = … m²', ans: [120000] },
        ] },
      // Lần đầu {3/8} của 24 = 9 m; lần sau {1/3} của 24 = 8 m; còn 24 − 9 − 8 = 7 m.
      { type: 'fill', bai: 5, point: 4, level: 3,
        prompt: 'Một tấm vải dài 24 m. Lần đầu người ta cắt {3/8} tấm vải để may áo, lần sau cắt {1/3} tấm vải để may quần. Hỏi tấm vải còn lại bao nhiêu mét?',
        items: [
          { t: 'Lần đầu cắt: 24 × {3/8} = … (m)', ans: [9] },
          { t: 'Lần sau cắt: 24 × {1/3} = … (m)', ans: [8] },
          { t: 'Tấm vải còn lại: 24 − 9 − 8 = … (m)', ans: [7] },
        ] },
      // S = 125 × 90 = 11 250 m² = 1,125 ha; làm tròn hàng phần mười 1,1 (phần trăm là 2); hàng phần trăm 1,13 (phần nghìn là 5).
      { type: 'fill', bai: [15, 13], point: 1, level: 3,
        prompt: 'Một thửa ruộng hình chữ nhật dài 125 m, rộng 90 m. Tính diện tích thửa ruộng, viết theo héc-ta rồi làm tròn.',
        items: [
          { t: 'Diện tích thửa ruộng: 125 × 90 = … (m²)', ans: [11250] },
          { t: 'Viết theo héc-ta: 11 250 m² = … ha', ans: [1.125] },
          { t: 'Làm tròn đến hàng phần mười: khoảng … ha', ans: [1.1] },
          { t: 'Làm tròn đến hàng phần trăm: khoảng … ha', ans: [1.13] },
        ] },
    ] },
  ],
};
