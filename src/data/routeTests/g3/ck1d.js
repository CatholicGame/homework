/** Kiểm tra cuối học kì I (Đề 4): Bài 1–44 Vở BT Toán 3 Tập Một (Nhanh 1 đến 11). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { ruler, geo } from './art.js';

export default {
  id: 'l3-ck-1d',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 4)',
  short: 'Cuối kì I · Đề 4',
  after: { book: 'workbook', units: '1-44' },
  desc: 'Cộng, trừ nhẩm số tròn trăm; bảng nhân, bảng chia; trung điểm, hình chữ nhật; gấp lên, giảm đi một số lần; đơn vị đo mm, g, ml, °C; chia số có ba chữ số; bài toán hai bước tính',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: làm phép cộng (1100), quên chữ số 0 (30), chép số trừ (400).
      { type: 'mc', bai: 2, point: 0, level: 1,
        prompt: 'Tính nhẩm: 700 − 400 = ?',
        options: ['300', '1100', '30', '400'], ans: 0 },
      // Đếm thêm 3: 18 + 3 = 21. Nhiễu: đếm thêm 1 (19), đếm thêm 2 (20), nhảy qua một số (27).
      { type: 'mc', bai: 5, point: 1, level: 1,
        prompt: 'Số thích hợp viết vào chỗ chấm: 12, 15, 18, …, 24 là:',
        options: ['21', '19', '20', '27'], ans: 0 },
      { type: 'pick', bai: 14, point: 0, level: 1,
        prompt: 'Tô màu {1/4} hình tròn:',
        shape: 'circle', parts: 4, ans: 1 },
      // 48 : 8 = 6. Nhiễu: lấy 48 − 8 (40), lấy 48 + 8 (56), nhầm bảng chia (7).
      { type: 'mc', bai: 11, point: 3, level: 1,
        prompt: 'Có 48 cái bút chia đều vào 8 hộp. Mỗi hộp có:',
        options: ['6 cái', '40 cái', '56 cái', '7 cái'], ans: 0 },
      // C ở vạch 2, D ở vạch 10, CD = 8 cm; trung điểm cách C 4 cm, ở vạch 2 + 4 = 6.
      // Nhiễu: quên C bắt đầu ở vạch 2 (4), lấy giữa vạch 0 và 10 (5), lấy độ dài CD (8).
      { type: 'mc', bai: 16, point: 2, level: 3,
        prompt: 'Trung điểm I của đoạn thẳng CD nằm ở vạch số mấy trên thước?',
        fig: ruler(8, { from: 2, name: 'CD' }),
        options: ['6', '4', '5', '8'], ans: 0 },
      // Ý sai: nhầm chiều rộng với chiều dài (AD = 4 cm); hình chữ nhật có hai cạnh dài khác hai cạnh ngắn nên không là hình vuông.
      { type: 'tf', bai: 19, point: 2, level: 1,
        prompt: 'ABCD là hình chữ nhật. Đúng ghi Đ, sai ghi S:',
        fig: geo({ pts: { A: [40, 30], B: [220, 30], C: [220, 150], D: [40, 150] }, segs: ['AB', 'BC', 'CD', 'DA'], lens: { AB: '6 cm', BC: '4 cm' }, pos: { A: 'nw', B: 'ne', C: 'se', D: 'sw' }, w: 260, h: 176 }),
        items: ['Hình ABCD có 4 góc vuông.', 'Cạnh CD dài 6 cm.', 'Cạnh AD dài 6 cm.', 'ABCD là hình vuông.'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // 12 × 5 = 60. Nhiễu: lấy 12 + 5 (17), quên cộng 10 của 2 × 5 (50), viết 5 rồi viết 10 (510).
      { type: 'mc', bai: 23, point: 2, level: 2,
        prompt: 'Mỗi hộp có 12 cái bánh. Hỏi 5 hộp như thế có bao nhiêu cái bánh?',
        options: ['60 cái', '17 cái', '50 cái', '510 cái'], ans: 0 },
      // 75 : 4 = 18 (dư 3). Nhiễu: lấy thương (18), lấy số chia (4), lấy chữ số đầu (7).
      { type: 'mc', bai: 26, point: 3, level: 2,
        prompt: 'Phép chia 75 : 4 có số dư là:',
        options: ['3', '18', '4', '7'], ans: 0 },
      { type: 'match', bai: [30, 31, 32, 33], point: 0, level: 1,
        prompt: 'Nối mỗi câu với đơn vị thích hợp:',
        left: ['Hộp sữa tươi có 180 …', 'Gói mì cân nặng 75 …', 'Chiếc bút chì dài 175 …', 'Trưa hè nóng 35 …'],
        right: ['g', '°C', 'ml', 'mm'], ans: [2, 0, 3, 1] },
      // 4 trăm × 2 = 8 trăm. Nhiễu: thiếu một chữ số 0 (80), lấy 400 + 2 (402), thừa chữ số 0 (8000).
      { type: 'mc', bai: 36, point: 3, level: 1,
        prompt: 'Tính nhẩm: 400 × 2 = ?',
        options: ['800', '80', '402', '8000'], ans: 0 },
      // 48 : 8 = 6 (lần), 48 − 8 = 40 (cây). Ý sai: nhầm "gấp mấy lần" với "nhiều hơn bao nhiêu"; đảo số lớn, số bé.
      { type: 'tf', bai: 39, point: 0, level: 3,
        prompt: 'Vườn nhà bác Tư có 48 cây cam và 8 cây bưởi. Đúng ghi Đ, sai ghi S:',
        items: ['Số cây cam gấp 6 lần số cây bưởi.', 'Số cây cam nhiều hơn số cây bưởi 6 cây.', 'Số cây cam nhiều hơn số cây bưởi 40 cây.', 'Số cây bưởi gấp 6 lần số cây cam.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [23, 36, 37], point: 0, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['24 × 4', '139 × 5', '476 : 4', '738 : 6'] },
      { type: 'table', bai: [24, 27], point: 1, level: 2,
        prompt: 'Viết số thích hợp vào ô trống:',
        head: ['Số đã cho', 'Gấp lên 3 lần', 'Giảm đi 3 lần'],
        rows: [[12, '…', '…'], [27, '…', '…'], [30, '…', '…']],
        ans: [[36, 4], [81, 9], [90, 10]] },
      {
        type: 'word', bai: 37, point: 0, level: 2,
        text: 'Trang trại có 216 quả trứng, người ta xếp vào các hộp, mỗi hộp 6 quả. Hỏi xếp được bao nhiêu hộp trứng?',
        given: ['Có 216 quả trứng.', 'Mỗi hộp 6 quả.'],
        ask: 'Xếp được bao nhiêu hộp trứng?',
        hint: 'Mỗi hộp 6 quả thì lấy 216 chia cho 6.',
        sentence: ['Số hộp trứng', 'xếp được', 'là:'],
        decoys: ['mỗi hộp'],
        expr: { a: 216, op: ':', b: 6, result: 36, unit: 'hộp' },
        units: ['hộp', 'quả trứng', 'kg'],
      },
      // Bước 1: 200 × 4 = 800 (ml). Bước 2: 1 l = 1000 ml; 1000 − 800 = 200 (ml).
      { type: 'fill', bai: [28, 32], point: 2, level: 3,
        prompt: 'Mẹ có 1 l nước cam, mẹ rót vào 4 cốc, mỗi cốc 200 ml. Hỏi mẹ còn lại bao nhiêu mi-li-lít nước cam?',
        items: [
          { t: 'Rót vào 4 cốc: … × … = … (ml)', ans: [200, 4, 800] },
          { t: '1 l = … ml. Còn lại: … − … = … (ml)', ans: [1000, 1000, 800, 200] },
        ] },
    ] },
  ],
};
