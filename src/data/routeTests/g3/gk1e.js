/** Kiểm tra giữa học kì I (Đề 5): Bài 1–22 Vở BT Toán 3 (Nhanh 1 đến 6). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { geo, circle, solids } from './art.js';

export default {
  id: 'l3-gk-1e',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 5)',
  short: 'Giữa kì I · Đề 5',
  after: { book: 'workbook', units: '1-22' },
  desc: 'Ba số liên tiếp; trừ có nhớ; bảng nhân, bảng chia 3, 5, 7; so sánh phép nhân, phép chia; thừa số, số bị chia; một phần mấy; ít hơn; trung điểm, hình tròn, hình chữ nhật, góc vuông, cạnh của khối lập phương',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: lùi một (598), nhầm hàng chục (610), nhầm hàng trăm (500).
      { type: 'mc', bai: 1, point: 4, level: 1,
        prompt: 'Ba số liên tiếp: 599, …, 601. Số ở giữa là:',
        options: ['598', '600', '610', '500'], ans: 1 },
      // 3 × 7 = 21, 5 × 6 = 30, 27 : 3 = 9, 40 : 5 = 8.
      { type: 'match', bai: [4, 5], point: 2, level: 1,
        prompt: 'Nối phép tính với kết quả đúng:',
        left: ['3 × 7', '5 × 6', '27 : 3', '40 : 5'],
        right: ['8', '9', '21', '30'], ans: [2, 3, 1, 0] },
      // 532 − 178 = 354. Nhiễu: quên trả 1 ở hàng chục (364), quên trả 1 ở hàng trăm (454), lấy số lớn trừ số bé ở từng cột (446).
      { type: 'mc', bai: 2, point: 3, level: 1,
        prompt: 'Kết quả của phép trừ 532 − 178 là:',
        options: ['364', '454', '354', '446'], ans: 2 },
      // Ý sai: lệch một hàng trong bảng chia 7 (49 : 7 là 7, 63 : 7 là 9).
      { type: 'tf', bai: 10, point: 2, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['7 × 8 = 56', '49 : 7 = 6', '7 × 5 = 35', '63 : 7 = 8'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 15 : 5 = 3.
      { type: 'pick', bai: 14, point: 3, level: 1,
        prompt: 'Khoanh vào {1/5} số ngôi sao:',
        icon: 'star', count: 15, cols: 5, ans: 3 },
      // CD = 6 × 2 = 12 cm. Nhiễu: chép OC (6 cm), lấy một nửa (3 cm), lấy 6 cộng 2 (8 cm).
      { type: 'mc', bai: 16, point: 1, level: 2,
        prompt: 'O là trung điểm của đoạn thẳng CD. Biết đoạn thẳng OC dài 6 cm. Đoạn thẳng CD dài:',
        options: ['6 cm', '12 cm', '3 cm', '8 cm'], ans: 1 },
      // CD đối diện AB nên bằng AB. Nhiễu: chép BC (5 cm), cộng hai cạnh (13 cm), lấy 8 trừ 5 (3 cm).
      { type: 'mc', bai: 19, point: 2, level: 2,
        prompt: 'Hình chữ nhật ABCD có cạnh AB dài 8 cm, cạnh BC dài 5 cm. Cạnh CD dài:',
        fig: geo({ pts: { A: [30, 25], B: [230, 25], C: [230, 110], D: [30, 110] }, segs: ['AB', 'BC', 'CD', 'DA'],
          lens: { AB: '8 cm', BC: '5 cm' }, pos: { C: 's', D: 's' }, w: 280, h: 140 }),
        options: ['8 cm', '5 cm', '13 cm', '3 cm'], ans: 0 },
      // AB đi qua tâm O là đường kính, không phải bán kính.
      { type: 'tf', bai: 17, point: 1, level: 1,
        prompt: 'Quan sát hình tròn tâm O. Đúng ghi Đ, sai ghi S:',
        fig: circle({ pts: { A: 150, B: 330, C: 60 }, segs: ['AB', 'OC'] }),
        items: ['O là tâm của hình tròn.', 'OC là bán kính.', 'AB là bán kính.', 'OA và OC dài bằng nhau.'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // Khối lập phương có 12 cạnh. Nhiễu: chỉ đếm cạnh nhìn thấy (9), nhầm với số đỉnh (8), số mặt (6).
      { type: 'mc', bai: 21, point: 3, level: 2,
        prompt: 'Con xúc xắc có dạng khối lập phương. Khối lập phương có bao nhiêu cạnh?',
        fig: solids(['cube']),
        options: ['6 cạnh', '8 cạnh', '9 cạnh', '12 cạnh'], ans: 3 },
      // Góc vuông ở E, D và hai góc ở H: 4. Góc ở A, B, C không vuông.
      // Nhiễu: chỉ đếm hai góc ở đáy (2), đếm một góc ở H (3), cho góc ở A và C cũng vuông (6).
      { type: 'mc', bai: 18, point: 2, level: 3,
        prompt: 'Dùng ê ke kiểm tra. Hình bên có mấy góc vuông?',
        fig: geo({ pts: { A: [30, 75], B: [130, 25], C: [230, 75], D: [230, 145], H: [130, 145], E: [30, 145] },
          segs: ['AB', 'BC', 'CD', 'DH', 'HE', 'EA', 'BH'], pos: { A: 'w', C: 'e', D: 's', H: 's', E: 's' }, w: 260, h: 170 }),
        options: ['2 góc', '3 góc', '4 góc', '6 góc'], ans: 2 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 1, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['186 + 527', '643 − 395', '358 + 64', '900 − 274'] },
      // 48 < 49; 7 = 7; 54 > 48; 9 = 9.
      { type: 'compare', bai: [9, 10, 11, 12], point: 1, level: 2,
        prompt: 'Điền dấu >, <, = thích hợp:',
        items: ['6 × 8 □ 7 × 7', '56 : 8 □ 42 : 6', '9 × 6 □ 8 × 6', '81 : 9 □ 3 × 3'] },
      {
        type: 'word', bai: 2, point: 4, level: 3,
        text: 'Buổi sáng cửa hàng bán được 265 kg gạo. Buổi chiều bán được ít hơn buổi sáng 78 kg gạo. Hỏi buổi chiều cửa hàng bán được bao nhiêu ki-lô-gam gạo?',
        given: ['Buổi sáng bán được 265 kg gạo.', 'Buổi chiều bán ít hơn buổi sáng 78 kg.'],
        ask: 'Buổi chiều bán được bao nhiêu ki-lô-gam gạo?',
        hint: 'Ít hơn thì lấy số gạo buổi sáng trừ đi 78 kg.',
        sentence: ['Buổi chiều', 'cửa hàng bán được số', 'ki-lô-gam gạo', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 265, op: '−', b: 78, result: 187, unit: 'kg' },
        units: ['kg', 'l', 'bao'],
      },
      // Thừa số kia = 63 : 9 = 7; số bị chia = 8 × 4 = 32.
      { type: 'fill', bai: 13, point: 0, level: 3,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: 'Tích của hai số là 63, một thừa số là 9. Thừa số kia là …', ans: 7 },
          { t: 'Thương là 8, số chia là 4. Số bị chia là …', ans: 32 },
        ] },
    ] },
  ],
};
