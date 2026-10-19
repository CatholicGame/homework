/** Kiểm tra nhanh 5: Bài 13–18 Toán 5 (làm tròn số thập phân; ki-lô-mét vuông, héc-ta; các đơn vị đo diện tích). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l5-nh-05',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 5',
  short: 'Nhanh 5',
  after: { book: 'tool5', units: '13-18' },
  desc: 'Làm tròn số thập phân; ki-lô-mét vuông, héc-ta; các đơn vị đo diện tích',
  time: 30,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Hàng phần mười là 6 ≥ 5 nên làm tròn lên: 47,62 → 48. Nhiễu: bỏ phần thập phân (47), làm tròn đến hàng phần mười (47,6),
      // làm tròn đến hàng chục (50).
      { type: 'mc', bai: 13, point: 0, level: 1,
        prompt: 'Làm tròn số 47,62 đến số tự nhiên gần nhất được:',
        options: ['47', '48', '47,6', '50'], ans: 1 },
      // 1 ha = 10 000 m² nên 3 ha = 30 000 m². Nhiễu: coi 1 ha = 100 m² (300), 1 000 m² (3 000), nhầm với km² (3 000 000).
      { type: 'mc', bai: 15, point: 1, level: 1,
        prompt: '3 ha = … m². Số thích hợp điền vào chỗ chấm là:',
        options: ['300', '3 000', '30 000', '3 000 000'], ans: 2 },
      // Hai đơn vị diện tích liền nhau gấp 100 lần: 1 m² = 100 dm² (không phải 10); 5 m² 8 dm² = 500 + 8 = 508 dm²; 1 km² = 100 ha.
      { type: 'tf', bai: 16, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['1 m² = 10 dm²', '1 dm² = 100 cm²', '5 m² 8 dm² = 508 dm²', '1 km² = 100 ha'],
        ans: ['S', 'Đ', 'Đ', 'Đ'] },
      // Hàng phần trăm là 2, nhìn chữ số hàng phần nghìn 5 ≥ 5 nên làm tròn lên: 6,325 → 6,33. Nhiễu: làm tròn xuống (6,32),
      // làm tròn đến hàng phần mười (6,3), làm tròn hai lần (6,4).
      { type: 'mc', bai: 13, point: 2, level: 1,
        prompt: 'Làm tròn số 6,325 đến hàng phần trăm được:',
        options: ['6,32', '6,33', '6,3', '6,4'], ans: 1 },
      // 1 cm² = 100 mm²: 40 cm² 4 mm² = 4 000 + 4 = 4 004 mm². Nhiễu: ghép số (404), coi 4 mm² là 40 (4 040), coi 1 cm² = 1 000 mm² (40 004).
      { type: 'mc', bai: 16, point: 2, level: 1,
        prompt: '40 cm² 4 mm² = … mm². Số thích hợp điền vào chỗ chấm là:',
        options: ['404', '4 004', '4 040', '40 004'], ans: 1 },
      // 1 km² = 100 ha: 64 800 ha = 64 800 : 100 = 648 km². Nhiễu: chia 10 (6 480), chia 1 000 (64,8), nhân 100 (6 480 000).
      { type: 'mc', bai: 15, point: 2, level: 2,
        prompt: 'Một khu rừng rộng 64 800 ha. Diện tích khu rừng đó là bao nhiêu ki-lô-mét vuông?',
        options: ['6 480 km²', '648 km²', '64,8 km²', '6 480 000 km²'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Nhìn chữ số ngay bên phải hàng cần làm tròn: 8,346 → 8,3 (4 < 5); 8,346 → 8,35 (6 ≥ 5); 1,449 → 1,4 (chỉ nhìn chữ số 4
      // hàng phần trăm, không làm tròn hai lần thành 1,5); 25,5 → 26 (5 thì làm tròn lên).
      { type: 'fill', bai: 13, point: 3, level: 2,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: 'Làm tròn 8,346 đến hàng phần mười được …', ans: [8.3] },
          { t: 'Làm tròn 8,346 đến hàng phần trăm được …', ans: [8.35] },
          { t: 'Làm tròn 1,449 đến hàng phần mười được …', ans: [1.4] },
          { t: 'Làm tròn 25,5 đến số tự nhiên gần nhất được …', ans: [26] },
        ] },
      // Diện tích 400 × 250 = 100 000 m² = 10 ha (1 ha = 10 000 m²); trồng lúa {3/5} diện tích: 10 × {3/5} = 6 ha.
      { type: 'fill', bai: 15, point: 2, level: 3,
        prompt: 'Một cánh đồng hình chữ nhật có chiều dài 400 m, chiều rộng 250 m. Người ta trồng lúa trên {3/5} diện tích cánh đồng. Hỏi diện tích trồng lúa là bao nhiêu héc-ta?',
        items: [
          { t: 'Diện tích cánh đồng: 400 × 250 = … (m²)', ans: [100000] },
          { t: 'Đổi: 100 000 m² = … ha', ans: [10] },
          { t: 'Diện tích trồng lúa: 10 × {3/5} = … (ha)', ans: [6] },
        ] },
      // Mỗi đơn vị hai chữ số: 7 m² 25 dm² = 725 dm²; 615 dm² = 6 m² 15 dm²; 3 km² 40 ha = 340 ha; 2 m² 5 dm² = 205 dm² (không phải 25).
      { type: 'fill', bai: 16, point: 2, level: 2,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: '7 m² 25 dm² = … dm²', ans: [725] },
          { t: '615 dm² = … m² … dm²', ans: [6, 15] },
          { t: '3 km² 40 ha = … ha', ans: [340] },
          { t: '2 m² 5 dm² = … dm²', ans: [205] },
        ] },
      // Nền 6 × 4 = 24 m² = 2 400 dm² (1 m² = 100 dm²); viên gạch 4 × 4 = 16 dm²; 2 400 : 16 = 150 viên.
      // Lỗi hay gặp: đổi 24 m² = 240 dm² như độ dài.
      { type: 'fill', bai: 16, point: 1, level: 3,
        prompt: 'Nền một căn phòng hình chữ nhật có chiều dài 6 m, chiều rộng 4 m. Người ta lát nền bằng loại gạch hình vuông cạnh 4 dm. Hỏi cần bao nhiêu viên gạch để lát kín nền căn phòng đó (phần mạch vữa không đáng kể)?',
        items: [
          { t: 'Diện tích nền căn phòng: 6 × 4 = … (m²) = … dm²', ans: [24, 2400] },
          { t: 'Diện tích một viên gạch: 4 × 4 = … (dm²)', ans: [16] },
          { t: 'Số viên gạch cần dùng: 2 400 : 16 = … (viên)', ans: [150] },
        ] },
    ] },
  ],
};
