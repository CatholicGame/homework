/** Kiểm tra nhanh 7: Bài 22–24 Toán 5 (phép chia số thập phân; nhân, chia số thập phân với 10; 100; 1 000 hoặc 0,1; 0,01; 0,001). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l5-nh-07',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 7',
  short: 'Nhanh 7',
  after: { book: 'tool5', units: '22-24' },
  desc: 'Phép chia số thập phân; nhân, chia số thập phân với 10; 100; 1 000 hoặc 0,1; 0,01; 0,001',
  time: 30,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhân với 100: chuyển dấu phẩy sang phải hai chữ số: 4,375 × 100 = 437,5. Nhiễu: chuyển một chữ số (43,75),
      // bỏ hẳn dấu phẩy (4 375), chuyển sang trái như chia (0,04375).
      { type: 'mc', bai: 23, point: 0, level: 1,
        prompt: 'Kết quả của phép nhân 4,375 × 100 là:',
        options: ['43,75', '437,5', '4 375', '0,04375'], ans: 1 },
      // 21,42 : 21: 21 : 21 = 1, viết dấu phẩy; hạ 4, 4 < 21 nên viết 0 vào thương; hạ 2 được 42 : 21 = 2 → 1,02.
      // Nhiễu: quên viết 0 (1,2), viết thừa 0 (1,002), đặt dấu phẩy sai chỗ (10,2).
      { type: 'mc', bai: 22, point: 2, level: 1,
        prompt: 'Kết quả của phép chia 21,42 : 21 là:',
        options: ['1,2', '1,02', '1,002', '10,2'], ans: 1 },
      // Chia cho 0,1 là chuyển dấu phẩy sang phải (36,5 : 0,1 = 365); nhân với 0,1 là chuyển sang trái (15,23 × 0,1 = 1,523, không phải 152,3);
      // 0,8 : 100 = 0,008 (thiếu chữ số thì viết thêm 0); 2,4 × 0,01 = 0,024.
      { type: 'tf', bai: 23, point: 2, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['36,5 : 0,1 = 365', '15,23 × 0,1 = 152,3', '0,8 : 100 = 0,008', '2,4 × 0,01 = 0,024'],
        ans: ['Đ', 'S', 'Đ', 'Đ'] },
      // 26 : 8 = 3 dư 2, viết dấu phẩy, thêm 0: 20 : 8 = 2 dư 4, thêm 0: 40 : 8 = 5 → 3,25. Nhiễu: dừng sớm (3,2), đảo chữ số (3,52), sai dấu phẩy (32,5).
      { type: 'mc', bai: 22, point: 1, level: 1,
        prompt: 'Kết quả của phép chia 26 : 8 là:',
        options: ['3,25', '3,2', '3,52', '32,5'], ans: 0 },
      // 1 kg = 1 000 g: 23,45 × 1 000 = 23 450 g (hết chữ số thì viết thêm 0). Nhiễu: nhân 100 (2 345), nhân 10 (234,5), chia 1 000.
      { type: 'mc', bai: 23, point: 3, level: 1,
        prompt: '23,45 kg = … g. Số thích hợp điền vào chỗ chấm là:',
        options: ['2 345', '23 450', '234,5', '0,02345'], ans: 1 },
      // Số chia có một chữ số thập phân: chuyển dấu phẩy cả hai số sang phải một chữ số, 57 thêm 0: 570 : 95 = 6.
      // Nhiễu: chỉ bỏ dấu phẩy ở số chia (57 : 95 = 0,6), chuyển hai chữ số (60), lấy 57 : 10 (5,7).
      { type: 'mc', bai: 22, point: 3, level: 2,
        prompt: 'Kết quả của phép chia 57 : 9,5 là:',
        options: ['0,6', '6', '60', '5,7'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // 86,4 : 6 = 14,4; 27 : 4 = 6,75 (còn dư thì viết dấu phẩy, thêm 0 vào số dư rồi chia tiếp);
      // 7,56 : 1,8 = 75,6 : 18 = 4,2 (chuyển dấu phẩy cả hai số sang phải một chữ số).
      { type: 'calc', bai: 22, point: 0, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['86,4 : 6', '27 : 4', '7,56 : 1,8'] },
      // Số chai: 31,5 : 0,75 = 3 150 : 75 = 42 chai; tiền bán: 42 × 45 000 = 1 890 000 đồng.
      { type: 'fill', bai: 22, point: 3, level: 3,
        prompt: 'Một cửa hàng có 31,5 l dầu ăn, đóng vào các chai, mỗi chai 0,75 l. Mỗi chai dầu ăn bán giá 45 000 đồng. Hỏi bán hết số chai dầu đó, cửa hàng thu được bao nhiêu tiền?',
        items: [
          { t: 'Số chai dầu ăn: 31,5 : 0,75 = … (chai)', ans: [42] },
          { t: 'Số tiền thu được: 42 × 45 000 = … (đồng)', ans: [1890000] },
        ] },
      // 0,375 × 1 000 = 375; 42,5 : 100 = 0,425; 7,8 × 0,01 = 0,078; 3,6 : 0,1 = 36 (chia cho 0,1 là chuyển dấu phẩy sang phải).
      { type: 'fill', bai: 23, point: 0, level: 2,
        prompt: 'Tính nhẩm:',
        items: [
          { t: '0,375 × 1 000 = …', ans: [375] },
          { t: '42,5 : 100 = …', ans: [0.425] },
          { t: '7,8 × 0,01 = …', ans: [0.078] },
          { t: '3,6 : 0,1 = …', ans: [36] },
        ] },
      // Mỗi giờ 145,5 : 3 = 48,5 km; 5 giờ 48,5 × 5 = 242,5 km.
      { type: 'fill', bai: 22, point: 0, level: 3,
        prompt: 'Một ô tô đi trong 3 giờ được 145,5 km. Hỏi nếu mỗi giờ đi được quãng đường như nhau thì trong 5 giờ ô tô đó đi được bao nhiêu ki-lô-mét?',
        items: [
          { t: 'Mỗi giờ ô tô đi được: 145,5 : 3 = … (km)', ans: [48.5] },
          { t: 'Trong 5 giờ ô tô đi được: 48,5 × 5 = … (km)', ans: [242.5] },
        ] },
    ] },
  ],
};
