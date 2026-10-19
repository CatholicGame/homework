/** Kiểm tra nhanh 6: Bài 19–21 Toán 5 (phép cộng, phép trừ, phép nhân số thập phân). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l5-nh-06',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 6',
  short: 'Nhanh 6',
  after: { book: 'tool5', units: '19-21' },
  desc: 'Phép cộng, phép trừ, phép nhân số thập phân',
  time: 30,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Dấu phẩy thẳng dấu phẩy: 6,53 + 12,80 = 19,33. Nhiễu: căn phải như số tự nhiên (653 + 128 = 781 → 7,81),
      // quên nhớ 1 từ phần thập phân sang phần nguyên (18,33), quên viết dấu phẩy ở tổng (1 933).
      { type: 'mc', bai: 19, point: 3, level: 1,
        prompt: 'Kết quả của phép cộng 6,53 + 12,8 là:',
        options: ['7,81', '19,33', '18,33', '1 933'], ans: 1 },
      // 10 − 4,7 coi là 10,0 − 4,7 = 5,3. Nhiễu: trừ phần nguyên rồi giữ nguyên ,7 (6,7), quên nhớ 1 sang phần nguyên (6,3),
      // lấy 7 − 0 ở hàng phần mười (5,7).
      { type: 'mc', bai: 20, point: 2, level: 1,
        prompt: 'Kết quả của phép trừ 10 − 4,7 là:',
        options: ['6,7', '6,3', '5,3', '5,7'], ans: 2 },
      // 4,3 × 3,6 = 15,48 (hai thừa số có tất cả 2 chữ số thập phân); 2,5 × 4 = 10; 0,2 × 0,3 = 0,06 (thiếu chữ số thì viết thêm 0,
      // không phải 0,6); 1,25 × 3 = 3,75.
      { type: 'tf', bai: 21, point: 3, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['4,3 × 3,6 = 15,48', '2,5 × 4 = 10', '0,2 × 0,3 = 0,6', '1,25 × 3 = 3,75'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // 4,43 − 4,16 = 0,27 (hiệu bé hơn 1 thì phần nguyên là 0). Nhiễu: quên dấu phẩy (27), quên nhớ (0,37), lấy 4 − 3 ở phần nguyên (1,27).
      { type: 'mc', bai: 20, point: 3, level: 1,
        prompt: 'Kết quả của phép trừ 4,43 − 4,16 là:',
        options: ['0,27', '27', '0,37', '1,27'], ans: 0 },
      // 151 × 25 = 3 775, thừa số 1,51 có hai chữ số thập phân nên tách hai chữ số: 37,75. Nhiễu: tách một (377,5), ba (3,775), tính sai (36,75).
      { type: 'mc', bai: 21, point: 0, level: 1,
        prompt: 'Kết quả của phép nhân 1,51 × 25 là:',
        options: ['377,5', '37,75', '3,775', '36,75'], ans: 1 },
      // Tính thuận tiện: (3,75 + 6,25) + 2,8 = 10 + 2,8 = 12,8. Nhiễu: viết 2,8 thành 2,08 (12,08), nhớ thừa (13,8), quên nhớ (11,8).
      { type: 'mc', bai: 19, point: 3, level: 2,
        prompt: 'Giá trị của biểu thức 3,75 + 2,8 + 6,25 là:',
        options: ['12,8', '12,08', '13,8', '11,8'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // 35,64 + 8,9 = 44,54 (8,90 thẳng dấu phẩy); 50,2 − 17,46 = 32,74 (coi 50,20); 6,25 × 7 = 43,75; 2,4 × 1,5 = 3,6 (3,60).
      { type: 'calc', bai: [19, 20, 21], point: 0, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['35,64 + 8,9', '50,2 − 17,46', '6,25 × 7', '2,4 × 1,5'] },
      // Cam: 2,5 × 35 000 = 87 500 đồng; táo: 1,2 × 60 000 = 72 000 đồng; cả hai: 159 500 đồng; tiền thừa: 200 000 − 159 500 = 40 500 đồng.
      { type: 'fill', bai: 21, point: 1, level: 3,
        prompt: 'Mẹ mua 2,5 kg cam và 1,2 kg táo. 1 kg cam giá 35 000 đồng, 1 kg táo giá 60 000 đồng. Mẹ đưa cô bán hàng 200 000 đồng. Hỏi cô bán hàng phải trả lại mẹ bao nhiêu tiền?',
        items: [
          { t: 'Tiền mua cam: 2,5 × 35 000 = … (đồng)', ans: [87500] },
          { t: 'Tiền mua táo: 1,2 × 60 000 = … (đồng)', ans: [72000] },
          { t: 'Tiền phải trả lại: 200 000 − (87 500 + 72 000) = … (đồng)', ans: [40500] },
        ] },
      // Đếm chữ số phần thập phân của cả hai thừa số: 6,4 × 5,7 = 36,48 (hai chữ số); 6,4 × 0,57 = 3,648 (ba); 0,64 × 57 = 36,48 (hai).
      { type: 'fill', bai: 21, point: 3, level: 2,
        prompt: 'Biết 64 × 57 = 3 648. Viết kết quả của các phép nhân sau:',
        items: [
          { t: '6,4 × 5,7 = …', ans: [36.48] },
          { t: '6,4 × 0,57 = …', ans: [3.648] },
          { t: '0,64 × 57 = …', ans: [36.48] },
        ] },
      // Lần sau 12,5 + 3,75 = 16,25 l; hai lần 12,5 + 16,25 = 28,75 l; còn 45 − 28,75 = 16,25 l (coi 45 là 45,00).
      { type: 'fill', bai: 20, point: 2, level: 3,
        prompt: 'Một thùng có 45 l dầu. Lần đầu lấy ra 12,5 l dầu, lần sau lấy ra nhiều hơn lần đầu 3,75 l dầu. Hỏi trong thùng còn lại bao nhiêu lít dầu?',
        items: [
          { t: 'Lần sau lấy ra: 12,5 + 3,75 = … (l)', ans: [16.25] },
          { t: 'Cả hai lần lấy ra: 12,5 + 16,25 = … (l)', ans: [28.75] },
          { t: 'Trong thùng còn lại: 45 − 28,75 = … (l)', ans: [16.25] },
        ] },
    ] },
  ],
};
