/** Kiểm tra tổng hợp 1 (Đề 1): Bài 1–6 Toán 5 (Nhanh 1 + Nhanh 2). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l5-th-01',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 1 (Đề 1)',
  short: 'Tổng hợp 1 · Đề 1',
  after: { book: 'tool5', units: '1-6' },
  desc: 'Giá trị chữ số theo hàng; đặt tính, tính thuận tiện; so sánh phân số; phân số thập phân; nhân, chia phân số, phân số của một số; cộng, trừ phân số khác mẫu số',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // 5 370 812: chữ số 7 ở hàng chục nghìn, giá trị 70 000. Nhiễu: lấy chính chữ số (7), nhầm hàng trăm (700), nhầm hàng trăm nghìn (700 000).
      { type: 'mc', bai: 1, point: 1, level: 1,
        prompt: 'Trong số 5 370 812, chữ số 7 có giá trị là:',
        options: ['7', '700', '70 000', '700 000'], ans: 2 },
      // Cùng tử số: mẫu bé hơn thì lớn hơn ({5/6} > {5/8}); cùng mẫu so tử ({7/9} > {4/9}); {8/12} rút gọn được {2/3};
      // khác mẫu quy đồng: {3/5} = {9/15} < {10/15} = {2/3}. Ý sai: so tử khi cùng mẫu bị đảo, nghĩ {3/5} lớn hơn vì 3 > 2.
      { type: 'tf', bai: 3, point: 4, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['{5/6} > {5/8}', '{7/9} < {4/9}', '{2/3} = {8/12}', '{3/5} > {2/3}'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Phân số thập phân có mẫu số 10, 100, 1000. Nhiễu: mẫu 20 ({7/20}), 100 ở tử số ({100/3}), mẫu 12.
      { type: 'mc', bai: 4, point: 1, level: 1,
        prompt: 'Phân số nào dưới đây là phân số thập phân?',
        options: ['{7/20}', '{9/100}', '{100/3}', '{5/12}'], ans: 1 },
      // Nhân: tử × tử, mẫu × mẫu; chia: nhân với phân số đảo ngược ({2/3} × {5/4} = {10/12} = {5/6}); cộng, trừ cùng mẫu giữ mẫu, rút gọn {6/9} = {2/3}.
      { type: 'match', bai: 5, point: 2, level: 1,
        prompt: 'Tính rồi nối mỗi phép tính với kết quả đúng (đã rút gọn):',
        left: ['{3/4} × {5/7}', '{2/3} : {4/5}', '{4/9} + {2/9}', '{6/7} − {2/7}'],
        right: ['{2/3}', '{15/28}', '{4/7}', '{5/6}'],
        ans: [1, 3, 0, 2] },
      // {1/3} + {2/5} = {5/15} + {6/15} = {11/15}. Nhiễu: cộng tử với tử, mẫu với mẫu ({3/8}), nhân hai phân số ({2/15}), cộng tử nhưng lấy mẫu chung không quy đồng tử ({3/15}).
      { type: 'mc', bai: 6, point: 1, level: 2,
        prompt: 'Kết quả của phép tính {1/3} + {2/5} là:',
        options: ['{11/15}', '{3/8}', '{2/15}', '{3/15}'], ans: 0 },
      // Nhân một số với một tổng: 48 × 27 + 48 × 73 = 48 × (27 + 73) = 48 × 100 = 4 800.
      // Nhiễu: viết thiếu chữ số 0 (480), thừa chữ số 0 (48 000), chỉ tính một tích 48 × 73 (3 504).
      { type: 'mc', bai: 2, point: 3, level: 2,
        prompt: 'Tính thuận tiện: 48 × 27 + 48 × 73 = ?',
        options: ['480', '4 800', '48 000', '3 504'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Đặt tính thẳng cột; nhân với số có hai chữ số thì tích riêng thứ hai lùi sang trái một cột.
      { type: 'calc', bai: 2, point: 0, level: 1, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['52 374 + 38 659', '80 215 − 46 738', '2 047 × 36', '18 624 : 48'] },
      // Nhân cả tử và mẫu với cùng một số: {3/5} = {6/10}; {7/25} = {28/100}; {9/4} = {225/100}. Chia: {36/300} = {12/100}.
      { type: 'fill', bai: 4, point: 2, level: 2,
        prompt: 'Viết mỗi phân số sau thành phân số thập phân có mẫu số đã cho:',
        items: [
          { t: 'Mẫu số 10: {3/5} = {…/…}', ans: [6, 10] },
          { t: 'Mẫu số 100: {7/25} = {…/…}', ans: [28, 100] },
          { t: 'Mẫu số 100: {36/300} = {…/…}', ans: [12, 100] },
          { t: 'Mẫu số 100: {9/4} = {…/…}', ans: [225, 100] },
        ] },
      // Phân số của một số: 1 200 × {3/4} = 900 kg đã bán; còn lại 1 200 − 900 = 300 kg.
      { type: 'fill', bai: 5, point: 4, level: 3,
        prompt: 'Nhà bác An thu hoạch được 1 200 kg thóc. Bác bán {3/4} số thóc đó. Hỏi nhà bác An còn lại bao nhiêu ki-lô-gam thóc?',
        items: [
          { t: 'Số thóc đã bán: 1 200 × {3/4} = … (kg)', ans: [900] },
          { t: 'Số thóc còn lại: 1 200 − 900 = … (kg)', ans: [300] },
        ] },
      // Cộng khác mẫu: {2/5} + {1/3} = {6/15} + {5/15} = {11/15}; trừ số tự nhiên: 1 − {11/15} = {15/15} − {11/15} = {4/15}.
      { type: 'fill', bai: 6, point: 3, level: 3,
        prompt: 'Một vòi nước giờ thứ nhất chảy được {2/5} bể, giờ thứ hai chảy được {1/3} bể. Hỏi sau hai giờ vòi chảy được bao nhiêu phần bể? Còn bao nhiêu phần bể nữa thì đầy?',
        items: [
          { t: 'Sau hai giờ vòi chảy được: {2/5} + {1/3} = {…/…} (bể)', ans: [11, 15] },
          { t: 'Còn thiếu: 1 − {11/15} = {…/…} (bể)', ans: [4, 15] },
        ] },
    ] },
  ],
};
