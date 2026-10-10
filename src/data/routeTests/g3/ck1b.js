/** Kiểm tra cuối học kì I (Đề 2): Bài 1–44 Vở BT Toán 3 Tập Một (Nhanh 1 đến 11). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { angles, polys, rulerMm, jug } from './art.js';

export default {
  id: 'l3-ck-1b',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 2)',
  short: 'Cuối kì I · Đề 2',
  after: { book: 'workbook', units: '1-44' },
  desc: 'So sánh số có ba chữ số; bảng nhân, bảng chia; góc vuông, hình chữ nhật; phép chia có dư; mi-li-mét, gam, mi-li-lít; so sánh số lớn gấp mấy lần số bé',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: so hàng đơn vị hoặc hàng chục trước hàng trăm (598, 859), chọn số bé nhất (589).
      { type: 'mc', bai: 1, point: 3, level: 1,
        prompt: 'Số lớn nhất trong các số 589, 598, 859, 895 là:',
        options: ['589', '598', '859', '895'], ans: 3 },
      { type: 'pick', bai: 14, point: 3, level: 1,
        prompt: 'Khoanh vào {1/3} số ngôi sao:',
        icon: 'star', count: 18, cols: 6, ans: 6 },
      // 4 × 7 = 28. Nhiễu: lấy 4 + 7 (11), nhầm sang 6 con (24), nhầm sang 8 con (32).
      { type: 'mc', bai: 6, point: 3, level: 1,
        prompt: 'Mỗi con thỏ có 4 cái chân. Hỏi 7 con thỏ có bao nhiêu cái chân?',
        options: ['28 cái', '11 cái', '24 cái', '32 cái'], ans: 0 },
      { type: 'match', bai: [9, 10, 11, 12], point: 2, level: 1,
        prompt: 'Nối phép tính với kết quả đúng:',
        left: ['6 × 7', '72 : 8', '9 × 6', '49 : 7'],
        right: ['54', '7', '42', '9'], ans: [2, 3, 0, 1] },
      // 3 hình nhỏ + 2 hình ghép đôi + 1 hình lớn = 6. Nhiễu: chỉ đếm hình nhỏ (3), thêm hình lớn (4), thiếu một hình ghép (5).
      { type: 'mc', bai: 19, point: 4, level: 2,
        prompt: 'Hình bên có bao nhiêu hình chữ nhật?',
        fig: polys([
          { pts: [[20, 20], [100, 20], [100, 75], [20, 75]], color: '#fef3c7' },
          { pts: [[100, 20], [180, 20], [180, 75], [100, 75]], color: '#fef3c7' },
          { pts: [[180, 20], [260, 20], [260, 75], [180, 75]], color: '#fef3c7' },
        ], { w: 280, h: 95 }),
        options: ['6 hình', '3 hình', '4 hình', '5 hình'], ans: 0 },
      // Góc 1: 90°, góc 2: 60°, góc 3: 90° (xoay). Ý sai: thấy góc nghiêng nên cho là không vuông.
      { type: 'tf', bai: 18, point: 2, level: 1,
        prompt: 'Dùng ê ke kiểm tra các góc. Đúng ghi Đ, sai ghi S:',
        fig: angles([
          { v: 'O', a: 'A', b: 'B', deg: 90, mark: false, label: 'Góc 1' },
          { v: 'M', a: 'N', b: 'P', deg: 60, label: 'Góc 2' },
          { v: 'I', a: 'K', b: 'H', deg: 90, turn: 20, mark: false, label: 'Góc 3' },
        ], { h: 130 }),
        items: ['Góc đỉnh O; cạnh OA, OB là góc vuông.', 'Góc đỉnh M; cạnh MN, MP là góc vuông.', 'Góc đỉnh I; cạnh IK, IH là góc không vuông.'],
        ans: ['Đ', 'S', 'S'] },
      // Số dư bé hơn số chia nên lớn nhất là 5. Nhiễu: bằng số chia (6), bé hơn một (4), chia hết (0).
      { type: 'mc', bai: 25, point: 2, level: 3,
        prompt: 'Trong phép chia cho 6, số dư lớn nhất có thể là:',
        options: ['5', '6', '4', '0'], ans: 0 },
      // 4 cm 6 mm = 46 mm. Nhiễu: chỉ đọc vạch cm (40 mm), đảo chữ số (64 mm), đọc số cm rồi viết mm (4 mm).
      { type: 'mc', bai: 30, point: 2, level: 1,
        prompt: 'Đoạn thẳng CD dài bao nhiêu mi-li-mét?',
        fig: rulerMm(46, { cm: 6, name: 'CD' }),
        options: ['46 mm', '40 mm', '64 mm', '4 mm'], ans: 0 },
      // 126 × 3 = 378 (in 368: quên nhớ 1 sang hàng chục); 142 × 5 = 710 (in 700: quên nhớ 1 sang hàng chục).
      { type: 'tf', bai: 36, point: 2, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: [{ col: '213 × 4', res: '852' }, { col: '126 × 3', res: '368' }, { col: '105 × 6', res: '630' }, { col: '142 × 5', res: '700' }],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: thiếu vạch chia số 0 nên đọc 6 (6 ml), đọc phần còn trống (400 ml), đọc vạch phía trên (700 ml).
      { type: 'mc', bai: 32, point: 2, level: 1,
        prompt: 'Trong bình có bao nhiêu mi-li-lít nước?',
        fig: jug(600),
        options: ['600 ml', '6 ml', '400 ml', '700 ml'], ans: 0 },
      // 4 dm = 40 cm; 40 : 8 = 5. Nhiễu: không đổi đơn vị, lấy 8 : 4 (2 lần), lấy 40 − 8 (32 lần), lấy 4 + 8 (12 lần).
      { type: 'mc', bai: 39, point: 3, level: 3,
        prompt: 'Sợi dây xanh dài 4 dm, sợi dây đỏ dài 8 cm. Sợi dây xanh dài gấp mấy lần sợi dây đỏ?',
        options: ['5 lần', '2 lần', '32 lần', '12 lần'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [23, 26, 36], point: 0, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['38 × 5', '75 : 3', '214 × 3', '92 : 4'] },
      { type: 'compare', bai: [30, 31, 32], point: 1, level: 2,
        prompt: 'Điền dấu >, <, = thích hợp:',
        items: [
          { t: '5 cm □ 48 mm', ans: '>' },
          { t: '1 kg □ 990 g', ans: '>' },
          { t: '2 l □ 2000 ml', ans: '=' },
          { t: '750 g □ 1 kg', ans: '<' },
        ] },
      {
        type: 'word', bai: 26, point: 1, level: 2,
        text: 'Cô giáo có 84 quyển vở, cô chia đều cho 6 tổ. Hỏi mỗi tổ được bao nhiêu quyển vở?',
        given: ['Cô có 84 quyển vở.', 'Chia đều cho 6 tổ.'],
        ask: 'Mỗi tổ được bao nhiêu quyển vở?',
        hint: 'Chia đều cho 6 tổ thì lấy 84 chia cho 6.',
        sentence: ['Mỗi tổ', 'được số', 'quyển vở', 'là:'],
        decoys: ['cả hai'],
        expr: { a: 84, op: ':', b: 6, result: 14, unit: 'quyển vở' },
        units: ['quyển vở', 'tổ', 'quyển sách'],
      },
      // Bước 1: 14 × 3 = 42 (ngôi sao). Bước 2: 14 + 42 = 56 (ngôi sao).
      { type: 'fill', bai: [24, 28], point: 2, level: 3,
        prompt: 'Lan gấp được 14 ngôi sao giấy, số ngôi sao Hà gấp được gấp 3 lần số ngôi sao của Lan. Hỏi cả hai bạn gấp được bao nhiêu ngôi sao?',
        items: [
          { t: 'Hà gấp được: … × … = … (ngôi sao)', ans: [14, 3, 42] },
          { t: 'Cả hai bạn gấp được: … + … = … (ngôi sao)', ans: [14, 42, 56] },
        ] },
    ] },
  ],
};
