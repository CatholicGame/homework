/** Kiểm tra giữa học kì I (Đề 4): Bài 1–22 Vở BT Toán 3 (Nhanh 1 đến 6). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { geo, circle, angles } from './art.js';

export default {
  id: 'l3-gk-1d',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 4)',
  short: 'Giữa kì I · Đề 4',
  after: { book: 'workbook', units: '1-22' },
  desc: 'Đọc số có ba chữ số; số bị trừ, số trừ, hiệu; bảng nhân 4, bảng chia 8; tìm thừa số, số bị chia, số chia; một phần mấy; mét và xăng-ti-mét; điểm ở giữa, bán kính, góc vuông, đếm hình tam giác, khối lập phương',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: đọc "linh" thay "mười" (905), đọc như hai số rời (chín mươi mười lăm), đảo chục và đơn vị (951).
      { type: 'mc', bai: 1, point: 1, level: 1,
        prompt: 'Số 915 đọc là:',
        options: ['Chín trăm mười lăm', 'Chín trăm linh năm', 'Chín mươi mười lăm', 'Chín trăm năm mươi mốt'], ans: 0 },
      // Đếm thêm 4. Nhiễu: đếm thêm 2 (22), đếm thêm 6 (26), nhầm vị trí, lấy số cuối cộng 4 (32).
      { type: 'mc', bai: 6, point: 1, level: 1,
        prompt: 'Số thích hợp điền vào chỗ chấm: 12, 16, 20, …, 28 là:',
        options: ['22', '24', '26', '32'], ans: 1 },
      // 640 − 275 = 365. Ý sai: gọi số trừ là hiệu.
      { type: 'tf', bai: 3, point: 2, level: 1,
        prompt: 'Cho phép trừ 640 − 275 = 365. Đúng ghi Đ, sai ghi S:',
        items: ['640 là số bị trừ.', '275 là hiệu.', '365 là hiệu.', '275 là số trừ.'],
        ans: ['Đ', 'S', 'Đ', 'Đ'] },
      // Nhiễu: lệch một hàng trong bảng chia 8 (8), lấy 72 trừ 8 (64), nhớ nhầm 8 × 7 = 72 (7).
      { type: 'mc', bai: 11, point: 2, level: 1,
        prompt: 'Kết quả của phép chia 72 : 8 là:',
        options: ['8', '9', '64', '7'], ans: 1 },
      // I nằm giữa C và D, ba điểm thẳng hàng. Nhiễu: K ở khoảng giữa nhưng không nằm trên đoạn CD; C là một đầu mút.
      { type: 'mc', bai: 16, point: 0, level: 1,
        prompt: 'Điểm nào là điểm ở giữa hai điểm C và D?',
        fig: geo({ pts: { C: [20, 85], I: [120, 85], D: [270, 85], K: [175, 30] }, segs: ['CD'], pos: { C: 's', I: 's', D: 's' }, w: 290, h: 115 }),
        options: ['Điểm I', 'Điểm K', 'Điểm C'], ans: 0 },
      // 8 ô, {1/4} là 8 : 4 = 2 ô.
      { type: 'pick', bai: 14, point: 3, level: 2,
        prompt: 'Tô màu {1/4} số ô vuông của hình chữ nhật dưới đây:',
        shape: 'rect', grid: [4, 2], ans: 2 },
      // OA là bán kính, bằng một nửa đường kính: 10 : 2 = 5 cm. Nhiễu: chép đường kính (10 cm), gấp đôi (20 cm), lấy 10 trừ 2 (8 cm).
      { type: 'mc', bai: 17, point: 3, level: 2,
        prompt: 'Hình tròn tâm O có đường kính AB dài 10 cm. Đoạn thẳng OA dài:',
        fig: circle({ pts: { A: 180, B: 0 }, segs: ['AB'] }),
        options: ['5 cm', '10 cm', '20 cm', '8 cm'], ans: 0 },
      // Xúc xắc, rubik: khối lập phương; hộp bánh, viên gạch: khối hộp chữ nhật.
      { type: 'match', bai: 21, point: 2, level: 1, multi: true,
        prompt: 'Nối mỗi đồ vật với tên khối có dạng của đồ vật đó:',
        left: ['Con xúc xắc', 'Hộp bánh', 'Viên gạch', 'Khối rubik'],
        right: ['Khối lập phương', 'Khối hộp chữ nhật'], ans: [0, 1, 1, 0] },
      // Góc 1 vuông, Góc 2 (70°) không vuông, Góc 3 vuông nhưng đặt nghiêng, Góc 4 (110°) không vuông.
      // Nhiễu: chỉ nhận góc đặt thẳng (1 góc), thấy góc 110° "gần vuông" (3 góc), cho mọi góc là vuông (4 góc).
      { type: 'mc', bai: 18, point: 2, level: 3,
        prompt: 'Dùng ê ke kiểm tra. Có mấy góc vuông trong các góc dưới đây?',
        fig: angles([
          { v: 'O', a: 'A', b: 'B', deg: 90, mark: false, label: 'Góc 1' },
          { v: 'E', a: 'G', b: 'H', deg: 70, label: 'Góc 2' },
          { v: 'K', a: 'M', b: 'N', deg: 90, turn: 20, mark: false, label: 'Góc 3' },
          { v: 'P', a: 'Q', b: 'R', deg: 110, label: 'Góc 4' },
        ]),
        options: ['1 góc', '2 góc', '3 góc', '4 góc'], ans: 1 },
      // Tam giác ABD, ADC và tam giác lớn ABC: 3 hình. Nhiễu: chỉ đếm hai hình nhỏ (2), đếm thừa (4), chỉ thấy hình lớn (1).
      { type: 'mc', bai: 19, point: 4, level: 3,
        prompt: 'Hình bên có tất cả bao nhiêu hình tam giác?',
        fig: geo({ pts: { A: [150, 22], B: [30, 125], D: [150, 125], C: [270, 125] }, segs: ['AB', 'AC', 'BD', 'DC', 'AD'],
          pos: { B: 's', D: 's', C: 's' }, w: 300, h: 150 }),
        options: ['2 hình', '3 hình', '4 hình', '1 hình'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 1, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['254 + 318', '672 − 145', '409 + 296', '830 − 472'] },
      { type: 'findx', bai: 13, point: 0, level: 2,
        prompt: 'Tìm x:',
        items: ['x × 7 = 63', 'x : 8 = 6', '54 : x = 9', '5 × x = 45'] },
      {
        type: 'word', bai: 7, point: 4, level: 2,
        text: 'Mẹ có một sợi ruy băng dài 1 m. Mẹ cắt ra 35 cm để gói quà. Hỏi sợi ruy băng còn lại dài bao nhiêu xăng-ti-mét?',
        given: ['Sợi ruy băng dài 1 m = 100 cm.', 'Mẹ cắt ra 35 cm.'],
        ask: 'Sợi ruy băng còn lại dài bao nhiêu xăng-ti-mét?',
        hint: 'Đổi 1 m = 100 cm rồi lấy 100 cm trừ đi phần đã cắt.',
        sentence: ['Sợi ruy băng', 'còn lại', 'dài là:'],
        decoys: ['tất cả'],
        expr: { a: 100, op: '−', b: 35, result: 65, unit: 'cm' },
        units: ['cm', 'm', 'kg'],
      },
      // 9 × 7 = 63 nên … = 7; 8 × 1 = 8 nên 64 : 8; 6 × 6 = 36 nên 36 : 1.
      { type: 'fill', bai: [11, 12], point: 3, level: 3,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [{ t: '… × 9 = 9 × 7', ans: 7 }, { t: '64 : … = 8 × 1', ans: 8 }, { t: '… : 1 = 6 × 6', ans: 36 }] },
    ] },
  ],
};
