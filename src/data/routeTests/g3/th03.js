/** Kiểm tra tổng hợp 3 (Đề 1): Bài 16–22 Vở BT Toán 3 (Nhanh 5 + Nhanh 6, ôn Bài 1–15). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { circle, angles, geo, solids } from './art.js';

export default {
  id: 'l3-th-03',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 3 (Đề 1)',
  short: 'Tổng hợp 3 · Đề 1',
  after: { book: 'workbook', units: '16-22' },
  desc: 'Trung điểm của đoạn thẳng; hình tròn, bán kính, đường kính; góc vuông; hình tam giác, hình vuông, hình chữ nhật; khối lập phương; ôn một phần mấy, cộng, trừ có nhớ',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: đường kính AB (cũng đi qua tâm), đoạn CD nối hai điểm trên đường tròn nhưng không qua tâm.
      { type: 'mc', bai: 17, point: 1, level: 1,
        prompt: 'Đoạn thẳng nào là bán kính của hình tròn tâm O?',
        fig: circle({ pts: { A: 20, B: 200, C: 120, D: 60 }, segs: ['OC', 'AB', 'CD'] }),
        options: ['OC', 'AB', 'CD'], ans: 0 },
      // Ý sai: hình chữ nhật chỉ có hai cặp cạnh bằng nhau; tứ giác có 4 đỉnh.
      { type: 'tf', bai: 19, point: 3, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Hình vuông có 4 góc vuông.', 'Hình chữ nhật có 4 cạnh bằng nhau.', 'Hình tam giác có 3 cạnh.', 'Hình tứ giác có 3 đỉnh.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Góc 1: 60°, Góc 2: 90° (không có dấu, xoay nghiêng), Góc 3: 120°.
      { type: 'mc', bai: 18, point: 2, level: 1,
        prompt: 'Dùng ê ke kiểm tra rồi cho biết góc nào là góc vuông:',
        fig: angles([
          { v: 'O', a: 'A', b: 'B', deg: 60, label: 'Góc 1' },
          { v: 'M', a: 'N', b: 'P', deg: 90, turn: 15, mark: false, label: 'Góc 2' },
          { v: 'I', a: 'K', b: 'H', deg: 120, label: 'Góc 3' },
        ], { cell: 140 }),
        options: ['Góc 1', 'Góc 2', 'Góc 3'], ans: 1 },
      // Nhiễu: chỉ đếm các mặt nhìn thấy (3), nhầm số đỉnh (8), nhầm số cạnh (12).
      { type: 'mc', bai: 21, point: 0, level: 1,
        prompt: 'Khối lập phương có bao nhiêu mặt?',
        fig: solids(['cube']),
        options: ['6 mặt', '3 mặt', '8 mặt', '12 mặt'], ans: 0 },
      // AB = BC = 3 cm. Nhiễu: AD (B ở giữa nhưng AB = 3 cm, BD = 5 cm), BD (B là đầu mút), CD (B không nằm trên CD).
      { type: 'mc', bai: 16, point: 1, level: 2,
        prompt: 'Điểm B là trung điểm của đoạn thẳng nào?',
        fig: geo({ pts: { A: [20, 70], B: [110, 70], C: [200, 70], D: [260, 70] }, segs: ['AB', 'BC', 'CD'], lens: { AB: '3 cm', BC: '3 cm', CD: '2 cm' }, pos: { A: 's', B: 's', C: 's', D: 's' }, w: 280, h: 100 }),
        options: ['AC', 'AD', 'BD', 'CD'], ans: 0 },
      // 36 : 4 = 9. Nhiễu: lấy 36 trừ 4 (32 kg), lấy 36 cộng 4 (40 kg), lệch một hàng (8 kg).
      { type: 'mc', bai: 14, point: 3, level: 2, review: true,
        prompt: '{1/4} của 36 kg là:',
        options: ['9 kg', '32 kg', '40 kg', '8 kg'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 1, level: 1, review: true,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['527 + 368', '249 + 453', '830 − 467', '706 − 248'] },
      { type: 'fill', bai: [17, 20], point: 2, level: 2,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: 'Hình tròn có bán kính 5 cm thì đường kính dài … cm.', ans: 10 },
          { t: 'Hình tròn có đường kính 12 cm thì bán kính dài … cm.', ans: 6 },
          { t: 'Muốn vẽ đường tròn bán kính 3 cm, ta mở com-pa rộng … cm.', ans: 3 },
        ] },
      {
        type: 'word', bai: 16, point: 2, level: 3,
        text: 'Đoạn thẳng AB dài 14 cm. M là trung điểm của đoạn thẳng AB. Hỏi đoạn thẳng AM dài bao nhiêu xăng-ti-mét?',
        given: ['Đoạn thẳng AB dài 14 cm.', 'M là trung điểm của AB.'],
        ask: 'Đoạn thẳng AM dài bao nhiêu xăng-ti-mét?',
        hint: 'Trung điểm chia đoạn thẳng thành hai phần bằng nhau: lấy 14 chia cho 2.',
        sentence: ['Độ dài', 'đoạn thẳng AM', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 14, op: ':', b: 2, result: 7, unit: 'cm' },
        units: ['cm', 'm', 'kg'],
      },
      // Tam giác nhỏ ABD, ADE, AEC; ghép hai: ABE, ADC; ghép ba: ABC. Tất cả 6.
      { type: 'fill', bai: 19, point: 4, level: 3,
        prompt: 'Đếm hình:',
        fig: geo({ pts: { A: [150, 22], B: [30, 120], D: [110, 120], E: [190, 120], C: [270, 120] }, segs: ['AB', 'AC', 'BC', 'AD', 'AE'], pos: { B: 's', D: 's', E: 's', C: 's' }, w: 300, h: 146 }),
        items: [{ t: 'Hình bên có … hình tam giác.', ans: 6 }] },
    ] },
  ],
};
