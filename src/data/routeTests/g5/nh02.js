/** Kiểm tra nhanh 2: Bài 4–6 Toán 5 (phân số thập phân; các phép tính với phân số; cộng, trừ hai phân số khác mẫu số). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l5-nh-02',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 2',
  short: 'Nhanh 2',
  after: { book: 'tool5', units: '4-6' },
  desc: 'Phân số thập phân; các phép tính với phân số; cộng, trừ hai phân số khác mẫu số',
  time: 30,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Phân số thập phân có mẫu số 10, 100, 1000…: {7/100}. Nhiễu: mẫu số 20 (có chữ số 0 tận cùng nhưng không phải 10, 100…),
      // 100 nằm ở tử số ({100/59}), {3/5} viết được thành phân số thập phân nhưng bản thân chưa phải.
      { type: 'mc', bai: 4, point: 1, level: 1,
        prompt: 'Phân số nào dưới đây là phân số thập phân?',
        options: ['{9/20}', '{7/100}', '{100/59}', '{3/5}'], ans: 1 },
      // Tử nhân tử, mẫu nhân mẫu: {2/3} × {4/5} = {8/15}. Nhiễu: cộng tử, cộng mẫu ({6/8}), nhân chéo như phép chia ({10/12}),
      // cộng tử nhưng nhân mẫu ({6/15}).
      { type: 'mc', bai: 5, point: 2, level: 1,
        prompt: 'Kết quả của phép nhân {2/3} × {4/5} là:',
        options: ['{6/8}', '{10/12}', '{8/15}', '{6/15}'], ans: 2 },
      // Khác mẫu số phải quy đồng: {1/5} + {1/2} = {2/10} + {5/10} = {7/10}, không phải cộng tử, cộng mẫu ({2/7}).
      // {1/3} + {1/6} = {2/6} + {1/6} = {3/6} = {1/2}; {3/4} − {1/2} = {3/4} − {2/4} = {1/4}; 2 − {3/5} = {10/5} − {3/5} = {7/5}.
      { type: 'tf', bai: 6, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['{1/5} + {1/2} = {2/7}', '{1/3} + {1/6} = {1/2}', '{3/4} − {1/2} = {1/4}', '2 − {3/5} = {7/5}'],
        ans: ['S', 'Đ', 'Đ', 'Đ'] },
      // Nhân với 5 cả tử và mẫu: {13/20} = {65/100}. Nhiễu: chỉ đổi mẫu số ({13/100}), nhân 2 được {26/40} (mẫu 40 không phải 10, 100),
      // cộng 20 vào tử ({33/100}).
      { type: 'mc', bai: 4, point: 2, level: 1,
        prompt: 'Phân số {13/20} viết thành phân số thập phân là:',
        options: ['{13/100}', '{65/100}', '{26/40}', '{33/100}'], ans: 1 },
      // Chia là nhân với phân số đảo ngược: {3/4} : {1/2} = {3/4} × {2/1} = {6/4} = {3/2}. Nhiễu: nhân thẳng ({3/8}),
      // đảo phân số thứ nhất ({4/6}), trừ ({1/4}).
      { type: 'mc', bai: 5, point: 3, level: 1,
        prompt: 'Kết quả của phép chia {3/4} : {1/2} là:',
        options: ['{3/8}', '{3/2}', '{4/6}', '{1/4}'], ans: 1 },
      // {3/4} của 32 kg là 32 × {3/4} = 24 kg. Nhiễu: chỉ chia 4 (8), nhân 4 (128), cộng 3 (35).
      { type: 'mc', bai: 5, point: 4, level: 2,
        prompt: 'Một bao gạo nặng 32 kg. {3/4} bao gạo đó nặng là:',
        options: ['24 kg', '8 kg', '128 kg', '35 kg'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Nhân (chia) cả tử và mẫu với cùng một số: {3/4} = {75/100} (× 25), {7/25} = {28/100} (× 4), {36/200} = {18/100} (: 2).
      // Chọn phân số chỉ đưa được về một mẫu số (10 hoặc 100) để đáp án duy nhất. Lỗi hay gặp: chỉ nhân mẫu số, quên nhân tử số.
      { type: 'fill', bai: 4, point: 2, level: 2,
        prompt: 'Viết mỗi phân số sau thành phân số thập phân có mẫu số là 10 hoặc 100:',
        items: [
          { t: '{3/4} = {…/…}', ans: [75, 100] },
          { t: '{7/25} = {…/…}', ans: [28, 100] },
          { t: '{36/200} = {…/…}', ans: [18, 100] },
        ] },
      // Hai ngày đọc: {2/5} + {1/3} = {6/15} + {5/15} = {11/15}; cả quyển là 1 = {15/15}, còn lại {15/15} − {11/15} = {4/15}.
      { type: 'fill', bai: 6, point: 3, level: 3,
        prompt: 'Ngày thứ nhất Lan đọc được {2/5} quyển truyện, ngày thứ hai đọc được {1/3} quyển truyện đó. Hỏi sau hai ngày Lan đã đọc được bao nhiêu phần quyển truyện và còn bao nhiêu phần quyển truyện chưa đọc?',
        items: [
          { t: 'Hai ngày Lan đọc được: {2/5} + {1/3} = {…/…} (quyển truyện)', ans: [11, 15] },
          { t: 'Phần chưa đọc: 1 − {11/15} = {…/…} (quyển truyện)', ans: [4, 15] },
        ] },
      // Chọn phép tính có kết quả tối giản ngay: {2/3} + {1/5} = {10/15} + {3/15} = {13/15}; {1/2} + {3/8} = {4/8} + {3/8} = {7/8};
      // 2 + {3/7} = {14/7} + {3/7} = {17/7}. Lỗi hay gặp: cộng tử với tử, mẫu với mẫu ({3/8}).
      { type: 'fill', bai: 6, point: 0, level: 2,
        prompt: 'Tính:',
        items: [
          { t: '{2/3} + {1/5} = {…/…}', ans: [13, 15] },
          { t: '{1/2} + {3/8} = {…/…}', ans: [7, 8] },
          { t: '2 + {3/7} = {…/…}', ans: [17, 7] },
        ] },
      // Sáng 120 × {2/5} = 48 kg; chiều 120 × {1/3} = 40 kg; còn 120 − 48 − 40 = 32 kg.
      { type: 'fill', bai: 5, point: 4, level: 3,
        prompt: 'Một cửa hàng có 120 kg gạo. Buổi sáng bán được {2/5} số gạo, buổi chiều bán được {1/3} số gạo đó. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam gạo?',
        items: [
          { t: 'Buổi sáng bán được: 120 × {2/5} = … (kg)', ans: [48] },
          { t: 'Buổi chiều bán được: 120 × {1/3} = … (kg)', ans: [40] },
          { t: 'Cửa hàng còn lại: 120 − 48 − 40 = … (kg)', ans: [32] },
        ] },
    ] },
  ],
};
