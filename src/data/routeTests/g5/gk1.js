/** Kiểm tra giữa học kì I (Đề 1): Bài 1–18 Toán 5 (Nhanh 1 đến 5). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l5-gk-1',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 1)',
  short: 'Giữa kì I · Đề 1',
  after: { book: 'tool5', units: '1-18' },
  desc: 'Số tự nhiên; phân số thập phân; cộng, nhân, chia phân số; hỗn số; số thập phân, hàng của số thập phân, sắp xếp; viết số đo dạng số thập phân; làm tròn; héc-ta, mét vuông',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // "Mười hai phẩy không bảy" = 12,07. Nhiễu: bỏ chữ số 0 (12,7), thêm một chữ số 0 (12,007), đặt dấu phẩy sai chỗ (120,7).
      { type: 'mc', bai: 10, point: 3, level: 1,
        prompt: 'Số "mười hai phẩy không bảy" viết là:',
        options: ['12,07', '12,7', '12,007', '120,7'], ans: 0 },
      // Chữ số 7 trong 3 725 409 ở hàng trăm nghìn. Nhiễu: lấy chữ số (7), lệch một hàng (70 000), nhầm hàng triệu (7 000 000).
      { type: 'mc', bai: 1, point: 1, level: 1,
        prompt: 'Trong số 3 725 409, chữ số 7 có giá trị là:',
        options: ['7', '70 000', '700 000', '7 000 000'], ans: 2 },
      // Phân số thập phân có mẫu số 10, 100, 1000. Nhiễu: mẫu 20 (có số 0 tận cùng), 100 ở tử số, mẫu 11 (gần 10).
      { type: 'mc', bai: 4, point: 1, level: 1,
        prompt: 'Phân số nào dưới đây là phân số thập phân?',
        options: ['{9/20}', '{7/100}', '{100/7}', '{10/11}'], ans: 1 },
      // 3{2/5} = (3 × 5 + 2)/5 = {17/5}. Nhiễu: nhân 3 × 2 ({6/5}), ghép 3 và 2 thành 32 ({32/5}), đảo tử và mẫu ({5/17}).
      { type: 'mc', bai: 7, point: 2, level: 1,
        prompt: 'Hỗn số 3{2/5} viết thành phân số là:',
        options: ['{17/5}', '{6/5}', '{32/5}', '{5/17}'], ans: 0 },
      // 36,257: phần nguyên 36; 2 phần mười, 5 phần trăm, 7 phần nghìn.
      // Ý sai: chữ số 7 ở hàng phần nghìn chứ không phải phần trăm; chữ số 6 thuộc phần nguyên (hàng đơn vị).
      { type: 'tf', bai: 10, point: 2, level: 1,
        prompt: 'Cho số thập phân 36,257. Đúng ghi Đ, sai ghi S:',
        items: ['Phần nguyên của số là 36.', 'Chữ số 2 thuộc hàng phần mười.', 'Chữ số 7 thuộc hàng phần trăm.', 'Chữ số 6 thuộc hàng phần mười.'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // 4 m 5 cm = 4{5/100} m = 4,05 m. Nhiễu: quên chữ số 0 của hàng phần mười (4,5), coi cm là phần nghìn (4,005), bỏ dấu phẩy (45).
      { type: 'mc', bai: 12, point: 1, level: 1,
        prompt: '4 m 5 cm = … m. Số thích hợp viết vào chỗ chấm là:',
        options: ['4,05', '4,5', '4,005', '45'], ans: 0 },
      // Chữ số hàng phần mười là 5 nên làm tròn lên 28.
      // Nhiễu: bỏ phần thập phân (27), làm tròn đến hàng phần mười (27,6), làm tròn đến hàng chục (30).
      { type: 'mc', bai: 13, point: 0, level: 1,
        prompt: 'Làm tròn số 27,58 đến số tự nhiên gần nhất thì được số:',
        options: ['28', '27', '27,6', '30'], ans: 0 },
      // 1 ha = 10 000 m²; 1 km² = 100 ha; 3 ha = 30 000 m²; 5 km² = 500 ha.
      { type: 'match', bai: 15, point: 2, level: 1,
        prompt: 'Nối hai số đo bằng nhau:',
        left: ['1 ha', '1 km²', '3 ha', '5 km²'],
        right: ['100 ha', '30 000 m²', '10 000 m²', '500 ha'], ans: [2, 0, 1, 3] },
      // 8 chia hết cho 4: {1/4} = {2/8}, cộng được {7/8}.
      // Nhiễu: cộng tử với tử, mẫu với mẫu ({6/12}), lấy mẫu chung nhưng quên đổi tử số ({6/8}), nhân thay cộng ({5/32}).
      { type: 'mc', bai: 6, point: 2, level: 2,
        prompt: '{1/4} + {5/8} = ?',
        options: ['{7/8}', '{6/12}', '{6/8}', '{5/32}'], ans: 0 },
      // 3 m² = 300 dm², thêm 7 dm² là 307 dm². Nhiễu: ghép 3 và 7 (37), coi 1 m² = 100 dm² nhưng đặt 7 ở hàng chục (370), coi 1 m² = 1 000 dm² (3 007).
      { type: 'mc', bai: 16, point: 1, level: 2,
        prompt: '3 m² 7 dm² = … dm². Số thích hợp viết vào chỗ chấm là:',
        options: ['307', '37', '370', '3 007'], ans: 0 },
      // Phần nguyên đều là 5; so phần mười: 0 < 1 < 8; 5,08 < 5,081 (thêm 0: 5,080 < 5,081).
      // Nhiễu: số nào ít chữ số thì bé hơn, số nào nhiều chữ số thì lớn hơn (5,8; 5,08; 5,18; 5,081),
      // nghĩ 5,081 < 5,08 vì "081" (5,081; 5,08; …), xếp từ lớn đến bé.
      { type: 'mc', bai: 11, point: 3, level: 3,
        prompt: 'Các số 5,08; 5,8; 5,18; 5,081 xếp theo thứ tự từ bé đến lớn là:',
        options: ['5,08; 5,081; 5,18; 5,8', '5,8; 5,08; 5,18; 5,081', '5,081; 5,08; 5,18; 5,8', '5,8; 5,18; 5,081; 5,08'],
        cols: 1, ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 1, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['46 385 + 27 958', '80 412 − 36 875', '2 345 × 26', '21 924 : 36'] },
      // {2/3} × {9/10} = {18/30} = {3/5}; {3/4} : {9/8} = {3/4} × {8/9} = {24/36} = {2/3}; {3/4} của 240 kg là 240 × 3 : 4 = 180 kg.
      { type: 'fill', bai: 5, point: 3, level: 2,
        prompt: 'Tính (rút gọn nếu được):',
        items: [
          { t: '{2/3} × {9/10} = {…/…}', ans: [3, 5] },
          { t: '{3/4} : {9/8} = {…/…}', ans: [2, 3] },
          { t: '{3/4} của 240 kg là … kg', ans: [180] },
        ] },
      // Tổng và hiệu: nửa chu vi 64 m là tổng; dài = (64 + 12) : 2 = 38; rộng = 38 − 12 = 26; S = 38 × 26 = 988 m².
      { type: 'fill', bai: [2, 8], point: 4, level: 3,
        prompt: 'Một mảnh vườn hình chữ nhật có nửa chu vi là 64 m, chiều dài hơn chiều rộng 12 m. Tính diện tích mảnh vườn.',
        items: [
          { t: 'Chiều dài mảnh vườn: (64 + 12) : 2 = … (m)', ans: [38] },
          { t: 'Chiều rộng mảnh vườn: 38 − 12 = … (m)', ans: [26] },
          { t: 'Diện tích mảnh vườn: 38 × 26 = … (m²)', ans: [988] },
        ] },
      // S = 400 × 150 = 60 000 m² = 6 ha; cà phê {2/3} của 6 ha = 4 ha.
      { type: 'fill', bai: [15, 5], point: 1, level: 3,
        prompt: 'Một nông trại hình chữ nhật có chiều dài 400 m, chiều rộng 150 m. Người ta dùng {2/3} diện tích nông trại để trồng cà phê. Hỏi diện tích trồng cà phê là bao nhiêu héc-ta?',
        items: [
          { t: 'Diện tích nông trại: 400 × 150 = … (m²)', ans: [60000] },
          { t: 'Đổi: 60 000 m² = … ha', ans: [6] },
          { t: 'Diện tích trồng cà phê: 6 × {2/3} = … (ha)', ans: [4] },
        ] },
    ] },
  ],
};
