/** Kiểm tra giữa học kì I (Đề 5): Bài 1–18 Toán 5 (Nhanh 1 đến 5). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l5-gk-1e',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 5)',
  short: 'Giữa kì I · Đề 5',
  after: { book: 'tool5', units: '1-18' },
  desc: 'Số chẵn; phân số bằng nhau; cộng, trừ phân số; hỗn số; tấn, tạ, yến, giờ; số thập phân, so sánh; viết số đo dạng số thập phân; làm tròn; héc-ta; các đơn vị đo diện tích',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Phần nguyên 5 > 4; 5,1 > 5,02 vì phần mười 1 > 0.
      // Nhiễu: số nhiều chữ số hơn thì lớn hơn (5,02, 4,99), chọn số đứng đầu (4,9).
      { type: 'mc', bai: 11, point: 3, level: 1,
        prompt: 'Số lớn nhất trong các số 4,9; 5,02; 4,99; 5,1 là:',
        options: ['4,9', '5,02', '4,99', '5,1'], ans: 3 },
      // Hai số chẵn liên tiếp hơn kém 2. Nhiễu: ba số tự nhiên liên tiếp, ba số lẻ liên tiếp, ba số tròn chục.
      { type: 'mc', bai: 1, point: 4, level: 1,
        prompt: 'Dãy nào gồm ba số chẵn liên tiếp?',
        options: ['2 024; 2 026; 2 028', '2 024; 2 025; 2 026', '2 023; 2 025; 2 027', '2 020; 2 030; 2 040'], cols: 1, ans: 0 },
      // {3/4} nhân cả tử và mẫu với 3: {9/12}.
      // Nhiễu: cộng 1 vào tử và mẫu ({4/5}), nhân tử với 2, mẫu với 3 ({6/12}), chỉ nhân mẫu ({3/8}).
      { type: 'mc', bai: 3, point: 1, level: 1,
        prompt: 'Phân số nào bằng phân số {3/4}?',
        options: ['{4/5}', '{9/12}', '{6/12}', '{3/8}'], ans: 1 },
      // {23/10} = 2{3/10}. Nhiễu: lấy cả tử làm phần nguyên (23{1/10}), đảo phần nguyên và tử (3{2/10}), đảo tử mẫu của phần phân số (2{10/3}).
      { type: 'mc', bai: 7, point: 3, level: 1,
        prompt: 'Phân số thập phân {23/10} viết thành hỗn số là:',
        options: ['2{3/10}', '23{1/10}', '3{2/10}', '2{10/3}'], ans: 0 },
      // Ý sai: 1 yến = 10 kg (không phải 100 kg); 1 thế kỉ = 100 năm (không phải 10 năm).
      { type: 'tf', bai: 8, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['1 tấn = 10 tạ', '1 yến = 100 kg', '{1/10} giờ = 6 phút', '1 thế kỉ = 10 năm'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 7 kg 8 g = 7{8/1000} kg = 7,008 kg. Nhiễu: bỏ hai chữ số 0 (7,8), bỏ một chữ số 0 (7,08), quên dấu phẩy (78).
      { type: 'mc', bai: 12, point: 3, level: 1,
        prompt: '7 kg 8 g = … kg. Số thích hợp viết vào chỗ chấm là:',
        options: ['7,008', '7,8', '7,08', '78'], ans: 0 },
      // Hàng phần mười là 6 (≥ 5) nên làm tròn lên 5 kg.
      // Nhiễu: bỏ phần thập phân (4 kg), làm tròn đến nửa ki-lô-gam (4,5 kg), làm tròn quá (6 kg).
      { type: 'mc', bai: 13, point: 0, level: 1,
        prompt: 'Một con ngỗng nặng 4,6 kg. Làm tròn cân nặng đó đến số tự nhiên gần nhất thì được:',
        options: ['4 kg', '5 kg', '4,5 kg', '6 kg'], ans: 1 },
      // Hình vuông cạnh 100 m: 100 × 100 = 10 000 m² = 1 ha.
      // Nhiễu: nhầm với hình vuông cạnh 1 km (1 km²), chỉ lấy cạnh (100 m²), nhân thừa 10 (10 ha).
      { type: 'mc', bai: 15, point: 1, level: 1,
        prompt: 'Một mảnh đất hình vuông có cạnh 100 m. Diện tích mảnh đất đó là:',
        options: ['1 ha', '1 km²', '100 m²', '10 ha'], ans: 0 },
      // Ý sai: 1 dm² = 100 cm² (không phải 10); 8 m² 3 dm² = 803 dm² (không phải 83).
      { type: 'tf', bai: 16, point: 1, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['1 m² = 100 dm²', '1 dm² = 10 cm²', '5 cm² 7 mm² = 507 mm²', '8 m² 3 dm² = 83 dm²'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Hai giờ chảy {2/5} + {1/3} = {6/15} + {5/15} = {11/15} bể; còn 1 − {11/15} = {4/15} bể.
      // Nhiễu: quên trừ ({11/15}), cộng tử với tử, mẫu với mẫu được {3/8} rồi lấy 1 trừ ({5/8}), lấy {2/5} − {1/3} ({1/15}).
      { type: 'mc', bai: 6, point: 1, level: 3,
        prompt: 'Một bể chưa có nước. Giờ thứ nhất vòi chảy được {2/5} bể, giờ thứ hai chảy được {1/3} bể. Hỏi còn bao nhiêu phần bể chưa có nước?',
        options: ['{4/15}', '{11/15}', '{5/8}', '{1/15}'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 1, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['65 729 + 18 486', '61 003 − 27 548', '4 607 × 23', '25 296 : 48'] },
      // {7/10} = 0,7; {25/100} = 0,25; {3/1000} = 0,003; 2{6/100} = 2,06.
      { type: 'fill', bai: 10, point: 0, level: 2,
        prompt: 'Viết thành số thập phân:',
        items: [
          { t: '{7/10} = …', ans: [0.7] },
          { t: '{25/100} = …', ans: [0.25] },
          { t: '{3/1000} = …', ans: [0.003] },
          { t: '2{6/100} = …', ans: [2.06] },
        ] },
      // 3 m² 5 dm² = 305 dm² < 350 dm²; 7 ha = 70 000 m²; 2 km² = 200 ha < 2 000 ha; 45 cm² = 4 500 mm².
      { type: 'compare', bai: 16, point: 2, level: 2,
        prompt: 'Điền dấu >, <, = thích hợp:',
        items: [
          { t: '3 m² 5 dm² □ 350 dm²', ans: '<' },
          { t: '7 ha □ 70 000 m²', ans: '=' },
          { t: '2 km² □ 2 000 ha', ans: '<' },
          { t: '45 cm² □ 4 500 mm²', ans: '=' },
        ] },
      // Tổng 1 250, hiệu 170: keo (1 250 + 170) : 2 = 710 cây; bạch đàn 710 − 170 = 540 cây.
      { type: 'fill', bai: 2, point: 4, level: 3,
        prompt: 'Một đội trồng rừng trồng được 1 250 cây keo và cây bạch đàn. Số cây keo nhiều hơn số cây bạch đàn 170 cây. Hỏi đội đã trồng bao nhiêu cây mỗi loại?',
        items: [
          { t: 'Số cây keo: (1 250 + 170) : 2 = … (cây)', ans: [710] },
          { t: 'Số cây bạch đàn: 710 − 170 = … (cây)', ans: [540] },
        ] },
      // Nền 6 × 4 = 24 m² = 2 400 dm²; viên gạch cạnh 40 cm = 4 dm có diện tích 16 dm²; cần 2 400 : 16 = 150 viên.
      { type: 'fill', bai: [16, 8], point: 1, level: 3,
        prompt: 'Nền một căn phòng hình chữ nhật dài 6 m, rộng 4 m. Người ta lát nền bằng những viên gạch hình vuông cạnh 40 cm (40 cm = 4 dm). Hỏi cần bao nhiêu viên gạch để lát kín nền phòng?',
        items: [
          { t: 'Diện tích nền phòng: 6 × 4 = … (m²)', ans: [24] },
          { t: 'Đổi: 24 m² = … dm²', ans: [2400] },
          { t: 'Diện tích một viên gạch: 4 × 4 = … (dm²)', ans: [16] },
          { t: 'Số viên gạch cần dùng: 2 400 : 16 = … (viên)', ans: [150] },
        ] },
    ] },
  ],
};
