/** Kiểm tra nhanh 3: Bài 7–9 Toán 5 (hỗn số; ôn tập hình học và đo lường). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { angles } from './art.js';

export default {
  id: 'l5-nh-03',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 3',
  short: 'Nhanh 3',
  after: { book: 'tool5', units: '7-9' },
  desc: 'Hỗn số; ôn tập hình học và đo lường',
  time: 30,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Phần nguyên 2, phần phân số {3/5}: 2{3/5}. Nhiễu: đổi chỗ phần nguyên với tử số (3{2/5}), viết liền 2 và 3 thành tử số ({23/5}),
      // đảo phần phân số (2{5/3}: phần phân số lớn hơn 1 nên không phải hỗn số).
      { type: 'mc', bai: 7, point: 1, level: 1,
        prompt: 'Hỗn số "hai và ba phần năm" được viết là:',
        options: ['3{2/5}', '{23/5}', '2{3/5}', '2{5/3}'], ans: 2 },
      // 1 giờ = 60 phút: 2 giờ 15 phút = 120 + 15 = 135 phút. Nhiễu: coi 1 giờ = 100 phút (215), coi 1 giờ = 10 phút (35),
      // nhầm 15 phút là nửa giờ (150).
      { type: 'mc', bai: 8, point: 1, level: 1,
        prompt: '2 giờ 15 phút = … phút. Số thích hợp điền vào chỗ chấm là:',
        options: ['215', '135', '35', '150'], ans: 1 },
      // Góc 1 (60°) bé hơn góc vuông: nhọn; góc 2 (120°) lớn hơn góc vuông, bé hơn góc bẹt: tù, không phải vuông. Hai đường thẳng song song không cắt nhau.
      { type: 'tf', bai: 8, point: 2, level: 1,
        prompt: 'Quan sát hình. Đúng ghi Đ, sai ghi S:',
        fig: angles([
          { v: 'O', a: 'A', b: 'B', deg: 60, label: 'Góc 1' },
          { v: 'M', a: 'N', b: 'P', deg: 120, label: 'Góc 2' },
        ], { cell: 180 }),
        items: ['Góc 1 là góc nhọn.', 'Góc 2 là góc vuông.', 'Góc 2 là góc tù.', 'Hai đường thẳng song song thì không bao giờ cắt nhau.'],
        ans: ['Đ', 'S', 'Đ', 'Đ'] },
      // {27/10} = 2 và 7 phần mười: 2{7/10}. Nhiễu: đổi chỗ phần nguyên với tử số (7{2/10}), đảo phần phân số (2{10/7}), lấy 20 làm phần nguyên.
      { type: 'mc', bai: 7, point: 3, level: 1,
        prompt: 'Phân số {27/10} viết thành hỗn số là:',
        options: ['2{7/10}', '7{2/10}', '2{10/7}', '20{7/10}'], ans: 0 },
      // 1 tấn = 1 000 kg, 1 tạ = 100 kg: 3 tấn 5 tạ = 3 000 + 500 = 3 500 kg. Nhiễu: ghép số (35), coi 1 tấn = 100 kg (350), coi 5 tạ = 50 kg (3 050).
      { type: 'mc', bai: 8, point: 0, level: 1,
        prompt: '3 tấn 5 tạ = … kg. Số thích hợp điền vào chỗ chấm là:',
        options: ['35', '350', '3 500', '3 050'], ans: 2 },
      // Đổi cùng đơn vị: 1 m 2 dm = 12 dm; diện tích 12 × 5 = 60 dm². Nhiễu: tính chu vi (12 + 5) × 2 = 34, bỏ 2 dm (1 × 5), bỏ 1 m (2 × 5).
      { type: 'mc', bai: 8, point: 4, level: 2,
        prompt: 'Một hình chữ nhật có chiều dài 1 m 2 dm, chiều rộng 5 dm. Diện tích hình chữ nhật đó là:',
        options: ['60 dm²', '5 dm²', '34 dm²', '10 dm²'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Tử số = phần nguyên × mẫu số + tử số, giữ mẫu số: 3{2/5} = {17/5}; 2{3/4} = {11/4}; 5{1/6} = {31/6}.
      // Lỗi hay gặp: cộng phần nguyên vào tử số (3{2/5} thành {5/5}) hoặc nhân phần nguyên với tử số.
      { type: 'fill', bai: 7, point: 2, level: 2,
        prompt: 'Chuyển mỗi hỗn số sau thành phân số:',
        items: [
          { t: '3{2/5} = {…/…}', ans: [17, 5] },
          { t: '2{3/4} = {…/…}', ans: [11, 4] },
          { t: '5{1/6} = {…/…}', ans: [31, 6] },
        ] },
      // Chiều rộng 25 × {3/5} = 15 m; diện tích 25 × 15 = 375 m²; rau 375 × 2 = 750 kg = 7 tạ 50 kg (1 tạ = 100 kg).
      { type: 'fill', bai: 8, point: 4, level: 3,
        prompt: 'Một mảnh vườn hình chữ nhật có chiều dài 25 m, chiều rộng bằng {3/5} chiều dài. Trung bình cứ 1 m² vườn thu hoạch được 2 kg rau. Hỏi cả mảnh vườn thu hoạch được bao nhiêu ki-lô-gam rau?',
        items: [
          { t: 'Chiều rộng mảnh vườn: 25 × {3/5} = … (m)', ans: [15] },
          { t: 'Diện tích mảnh vườn: 25 × 15 = … (m²)', ans: [375] },
          { t: 'Số rau thu hoạch được: 375 × 2 = … (kg) = … tạ … kg', ans: [750, 7, 50] },
        ] },
      // Hỗn số có phần phân số thập phân: 1{9/100} = {109/100} (không phải {19/100}); 2{3/10} = {23/10}; 4{7/1000} = {4007/1000}.
      { type: 'fill', bai: 7, point: 3, level: 2,
        prompt: 'Chuyển mỗi hỗn số sau thành phân số thập phân:',
        items: [
          { t: '1{9/100} = {…/…}', ans: [109, 100] },
          { t: '2{3/10} = {…/…}', ans: [23, 10] },
          { t: '4{7/1000} = {…/…}', ans: [4007, 1000] },
        ] },
      // {3/4} giờ = 60 × {3/4} = 45 phút; cả đi, chơi, về: 45 + 20 + 50 = 115 phút = 1 giờ 55 phút (không đổi theo 10);
      // 7 giờ 30 phút + 1 giờ 55 phút = 9 giờ 25 phút.
      { type: 'fill', bai: 8, point: 1, level: 3,
        prompt: 'Nam đạp xe từ nhà ra công viên lúc 7 giờ 30 phút. Nam đi mất {3/4} giờ, chơi ở công viên 20 phút rồi đạp xe về nhà mất 50 phút. Hỏi Nam về đến nhà lúc mấy giờ?',
        items: [
          { t: '{3/4} giờ = … phút', ans: [45] },
          { t: 'Thời gian đi, chơi và về: 45 + 20 + 50 = … (phút) = … giờ … phút', ans: [115, 1, 55] },
          { t: 'Nam về đến nhà lúc … giờ … phút', ans: [9, 25] },
        ] },
    ] },
  ],
};
