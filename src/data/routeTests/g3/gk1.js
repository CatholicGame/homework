/** Kiểm tra giữa học kì I (Đề 1): Bài 1–22 Vở BT Toán 3 (Nhanh 1 đến 6). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { circle, angles, polys } from './art.js';

export default {
  id: 'l3-gk-1',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 1)',
  short: 'Giữa kì I · Đề 1',
  after: { book: 'workbook', units: '1-22' },
  desc: 'Số đến 1 000; cộng, trừ có nhớ; bảng nhân, bảng chia; tìm thành phần; một phần mấy; trung điểm, hình tròn, góc vuông, đếm hình, khối lập phương',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: viết rời 600 và 8 (6008), đổi chỗ chục và đơn vị (680), nhầm "linh" với "mười" (618).
      { type: 'mc', bai: 1, point: 1, level: 1,
        prompt: 'Số "sáu trăm linh tám" viết là:',
        options: ['6008', '680', '608', '618'], ans: 2 },
      // Nhiễu: lấy 24 trừ 3 (21), lệch một hàng trong bảng chia 3 (7, 9).
      { type: 'mc', bai: 5, point: 2, level: 1,
        prompt: 'Kết quả của phép chia 24 : 3 là:',
        options: ['7', '8', '9', '21'], ans: 1 },
      // Ý sai: lệch một hàng trong bảng nhân 9 (9 × 7 là 63, 9 × 4 là 36).
      { type: 'tf', bai: 12, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['9 × 6 = 54', '9 × 7 = 64', '9 × 8 = 72', '9 × 4 = 35'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 20 : 4 = 5.
      { type: 'pick', bai: 14, point: 3, level: 1,
        prompt: 'Khoanh vào {1/4} số bông hoa:',
        icon: 'flower', count: 20, cols: 5, ans: 5 },
      // Nhiễu: chọn bán kính (OA, OC, OB) vì cũng nối với tâm.
      { type: 'mc', bai: 17, point: 2, level: 1,
        prompt: 'Trong hình tròn tâm O, đoạn thẳng nào là đường kính?',
        fig: circle({ pts: { A: 0, B: 180, C: 60 }, segs: ['AB', 'OC'] }),
        options: ['OA', 'AB', 'OC', 'OB'], ans: 1 },
      // Nhiễu: góc nhọn (Góc 1), góc tù (Góc 3) trông "gần vuông".
      { type: 'mc', bai: 18, point: 2, level: 1,
        prompt: 'Dùng ê ke kiểm tra. Góc nào là góc vuông?',
        fig: angles([
          { v: 'O', a: 'A', b: 'B', deg: 60, label: 'Góc 1' },
          { v: 'E', a: 'G', b: 'H', deg: 90, mark: false, label: 'Góc 2' },
          { v: 'K', a: 'M', b: 'N', deg: 120, label: 'Góc 3' },
        ]),
        options: ['Góc 1', 'Góc 2', 'Góc 3'], ans: 1 },
      // □ × 4 = 28 → 7; 36 : □ = 9 → 4; □ : 5 = 6 → 30; 6 × □ = 48 → 8.
      { type: 'match', bai: 13, point: 0, level: 2,
        prompt: 'Nối mỗi phép tính với số thích hợp ở ô trống:',
        left: ['□ × 4 = 28', '36 : □ = 9', '□ : 5 = 6', '6 × □ = 48'],
        right: ['4', '7', '8', '30'], ans: [1, 0, 3, 2] },
      // Ý sai: nhầm số đỉnh (8) với số mặt (6).
      { type: 'tf', bai: 21, point: 0, level: 1,
        prompt: 'Con xúc xắc có dạng khối lập phương. Đúng ghi Đ, sai ghi S:',
        items: ['Khối lập phương có 6 mặt.', 'Khối lập phương có 6 đỉnh.', 'Các mặt của khối lập phương là hình vuông.', 'Khối lập phương có 12 cạnh.'],
        ans: ['Đ', 'S', 'Đ', 'Đ'] },
      // 3 hình nhỏ + 2 hình ghép hai + 1 hình lớn = 6. Nhiễu: chỉ đếm hình nhỏ (3), thêm hình lớn (4), quên hình lớn (5).
      { type: 'mc', bai: 19, point: 4, level: 3,
        prompt: 'Hình bên có tất cả bao nhiêu hình chữ nhật?',
        fig: polys([
          { pts: [[10, 10], [60, 10], [60, 80], [10, 80]], color: '#fde68a' },
          { pts: [[60, 10], [110, 10], [110, 80], [60, 80]], color: '#fde68a' },
          { pts: [[110, 10], [160, 10], [160, 80], [110, 80]], color: '#fde68a' },
        ], { w: 170, h: 90, width: 190 }),
        options: ['3 hình', '4 hình', '5 hình', '6 hình'], ans: 3 },
      // AM = 12 : 2 = 6 cm, AN = 6 : 2 = 3 cm, NB = 12 − 3 = 9 cm. Nhiễu: dừng ở AN (3 cm), dừng ở AM (6 cm), chép AB (12 cm).
      { type: 'mc', bai: 16, point: 2, level: 3,
        prompt: 'Đoạn thẳng AB dài 12 cm. M là trung điểm của đoạn thẳng AB, N là trung điểm của đoạn thẳng AM. Đoạn thẳng NB dài bao nhiêu xăng-ti-mét?',
        options: ['9 cm', '3 cm', '6 cm', '12 cm'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 1, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['375 + 248', '806 − 429', '562 + 79', '730 − 56'] },
      { type: 'findx', bai: [3, 13], point: 1, level: 2,
        prompt: 'Tìm x:',
        items: ['x + 256 = 600', 'x − 138 = 462', 'x × 6 = 54', 'x : 7 = 8'] },
      {
        type: 'word', bai: 11, point: 3, level: 2,
        text: 'Cô Lan làm được 56 cái bánh, cô xếp đều vào 8 hộp. Hỏi mỗi hộp có bao nhiêu cái bánh?',
        given: ['Có 56 cái bánh.', 'Xếp đều vào 8 hộp.'],
        ask: 'Mỗi hộp có bao nhiêu cái bánh?',
        hint: 'Chia đều 56 cái bánh vào 8 hộp thì làm phép chia.',
        sentence: ['Mỗi hộp', 'có số', 'cái bánh', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 56, op: ':', b: 8, result: 7, unit: 'cái bánh' },
        units: ['cái bánh', 'hộp', 'kg'],
      },
      { type: 'fill', bai: [1, 2], point: 2, level: 3,
        prompt: 'Số lớn nhất có ba chữ số khác nhau trừ đi số bé nhất có ba chữ số thì được bao nhiêu? Viết phép tính rồi tìm kết quả:',
        items: [{ t: '… − … = …', ans: [987, 100, 887] }] },
    ] },
  ],
};
