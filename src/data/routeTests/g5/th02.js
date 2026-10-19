/** Kiểm tra tổng hợp 2 (Đề 1): Bài 7–12 Toán 5 (Nhanh 3 + Nhanh 4, ôn Bài 1–6). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l5-th-02',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 2 (Đề 1)',
  short: 'Tổng hợp 2 · Đề 1',
  after: { book: 'tool5', units: '7-12' },
  desc: 'Đọc số thập phân; hỗn số, đổi hỗn số ra phân số; đổi đơn vị khối lượng, thời gian; diện tích hình chữ nhật; so sánh số thập phân; viết số đo dưới dạng số thập phân; ôn so sánh phân số, cộng trừ phân số',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // 12,04: phần thập phân 04 đọc "không bốn". Nhiễu: bỏ chữ số 0 (phẩy bốn = 12,4), đọc như 12,40, thêm một chữ số 0 (12,004).
      { type: 'mc', bai: 10, point: 3, level: 1, cols: 1,
        prompt: 'Số 12,04 đọc là:',
        options: ['Mười hai phẩy bốn', 'Mười hai phẩy không bốn', 'Mười hai phẩy bốn mươi', 'Mười hai phẩy không không bốn'], ans: 1 },
      // 3{2/5} = {3 × 5 + 2 / 5} = {17/5}. Nhiễu: nhân phần nguyên với tử ({6/5}), viết liền 3 và 2 ({32/5}), cộng 3 + 2 ({5/5}).
      { type: 'mc', bai: 7, point: 2, level: 1,
        prompt: 'Hỗn số 3{2/5} viết thành phân số là:',
        options: ['{6/5}', '{32/5}', '{17/5}', '{5/5}'], ans: 2 },
      // Ý sai: nghĩ số có nhiều chữ số hơn thì lớn hơn (2,8 > 2,75; 3,1 > 3,09). Bỏ chữ số 0 tận cùng phần thập phân: 5,070 = 5,07.
      { type: 'tf', bai: 11, point: 3, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['0,9 > 0,45', '2,8 < 2,75', '5,070 = 5,07', '3,1 < 3,09'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 2 tấn = 2 000 kg; 5 tạ = 50 yến; {1/4} giờ = 60 : 4 = 15 phút; 3 phút 20 giây = 180 + 20 = 200 giây (thời gian đổi theo 60, không theo 10).
      { type: 'match', bai: 8, point: 1, level: 1,
        prompt: 'Nối hai số đo bằng nhau:',
        left: ['2 tấn', '5 tạ', '{1/4} giờ', '3 phút 20 giây'],
        right: ['50 yến', '2 000 kg', '200 giây', '15 phút'],
        ans: [1, 0, 3, 2] },
      // 5 m 7 cm = 5{7/100} m = 5,07 m. Nhiễu: thiếu chữ số 0 ở hàng phần mười (5,7), coi cm là phần nghìn (5,007), viết liền (57).
      { type: 'mc', bai: 12, point: 1, level: 2,
        prompt: 'Số thích hợp điền vào chỗ chấm: 5 m 7 cm = … m',
        options: ['5,7', '5,07', '5,007', '57'], ans: 1 },
      // Ôn so sánh phân số khác mẫu (Bài 3), cần cho so sánh số thập phân: quy đồng mẫu 24: {18/24}, {15/24}, {14/24}, {16/24}.
      // Nhiễu: chọn tử số lớn nhất ({7/12}), chọn mẫu lớn ({5/8}), chọn phân số gần {3/4} ({2/3}).
      { type: 'mc', bai: 3, point: 4, level: 2, review: true,
        prompt: 'Phân số lớn nhất trong các phân số {3/4}; {5/8}; {7/12}; {2/3} là:',
        options: ['{7/12}', '{3/4}', '{5/8}', '{2/3}'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Ôn cộng, trừ phân số khác mẫu (Bài 6), dùng tiếp khi tính với hỗn số: {6/8} + {1/8} = {7/8}; {5/6} − {2/6} = {3/6} = {1/2}.
      { type: 'fill', bai: 6, point: 2, level: 1, review: true,
        prompt: 'Tính (rút gọn nếu được):',
        items: [
          { t: '{3/4} + {1/8} = {…/…}', ans: [7, 8] },
          { t: '{5/6} − {1/3} = {…/…}', ans: [1, 2] },
        ] },
      // Diện tích: mỗi đơn vị có hai chữ số. 4 m² 5 dm² = 4,05 m² (không phải 4,5); 75 dm² = 0,75 m²; độ dài một chữ số: 2 m 35 cm = 2,35 m.
      { type: 'fill', bai: 12, point: 2, level: 2,
        prompt: 'Viết số thập phân thích hợp vào chỗ chấm:',
        items: [
          { t: '4 m² 5 dm² = … m²', ans: [4.05] },
          { t: '75 dm² = … m²', ans: [0.75] },
          { t: '2 m 35 cm = … m', ans: [2.35] },
        ] },
      // Chiều rộng 25 × {3/5} = 15 m; diện tích hình chữ nhật 25 × 15 = 375 m².
      { type: 'fill', bai: 8, point: 4, level: 3,
        prompt: 'Một sân bóng mini hình chữ nhật có chiều dài 25 m, chiều rộng bằng {3/5} chiều dài. Tính diện tích sân bóng đó.',
        items: [
          { t: 'Chiều rộng: 25 × {3/5} = … (m)', ans: [15] },
          { t: 'Diện tích: 25 × 15 = … (m²)', ans: [375] },
        ] },
      // Đổi hỗn số ra phân số rồi cộng: 2{3/4} = {11/4}; 1{1/2} = {3/2}; {11/4} + {6/4} = {17/4} = 4{1/4} kg.
      { type: 'fill', bai: 7, point: 2, level: 3,
        prompt: 'Mẹ mua 2{3/4} kg thịt bò và 1{1/2} kg thịt gà. Hỏi mẹ mua tất cả bao nhiêu ki-lô-gam thịt?',
        items: [
          { t: '2{3/4} = {…/…}', ans: [11, 4] },
          { t: '1{1/2} = {…/…}', ans: [3, 2] },
          { t: 'Mẹ mua tất cả: {11/4} + {3/2} = {…/…} = …{…/…} (kg)', ans: [17, 4, 4, 1, 4] },
        ] },
    ] },
  ],
};
