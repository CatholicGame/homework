/** Kiểm tra tổng hợp 3 (Đề 2): Bài 16–22 Vở BT Toán 3 (Nhanh 5 + Nhanh 6, ôn Bài 1–15). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { circle, angles, geo, solids } from './art.js';

export default {
  id: 'l3-th-03b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 3 (Đề 2)',
  short: 'Tổng hợp 3 · Đề 2',
  after: { book: 'workbook', units: '16-22' },
  desc: 'Trung điểm; đường kính, bán kính; góc vuông, góc không vuông; hình tứ giác, hình chữ nhật; khối lập phương, khối hộp chữ nhật; ôn đường gấp khúc, cộng, trừ có nhớ',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: quên cạnh cuối QM, lấy đường chéo MP, NQ, chỉ kể hai cạnh.
      { type: 'mc', bai: 19, point: 1, level: 1,
        prompt: 'Hình tứ giác MNPQ có các cạnh là:',
        fig: geo({ pts: { M: [40, 30], N: [230, 24], P: [260, 120], Q: [60, 112] }, segs: ['MN', 'NP', 'PQ', 'QM'], pos: { M: 'nw', N: 'ne', P: 'se', Q: 'sw' }, w: 300, h: 146 }),
        options: ['MN, NP, PQ, QM', 'MN, NP, PQ', 'MP, NQ, MN, PQ', 'MN, PQ'], ans: 0 },
      // Nhiễu: bán kính IE (một đầu là tâm), đoạn EG nối hai điểm trên đường tròn nhưng không qua tâm.
      { type: 'mc', bai: 17, point: 2, level: 1,
        prompt: 'Đoạn thẳng nào là đường kính của hình tròn tâm I?',
        fig: circle({ center: 'I', pts: { C: 160, D: 340, E: 80, G: 20 }, segs: ['CD', 'IE', 'EG'] }),
        options: ['IE', 'EG', 'CD'], ans: 2 },
      // Ý sai: nhầm số đỉnh với số mặt (6 đỉnh), nhầm số cạnh với số đỉnh (8 cạnh).
      { type: 'tf', bai: 21, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        fig: solids([{ kind: 'cube', label: 'Khối lập phương' }, { kind: 'box', label: 'Khối hộp chữ nhật' }], { cell: 150 }),
        items: ['Khối hộp chữ nhật có 6 mặt.', 'Khối lập phương có 6 đỉnh.', 'Các mặt của khối lập phương là hình vuông.', 'Khối hộp chữ nhật có 8 cạnh.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Góc 90° nằm ngang, 60°, 90° xoay nghiêng, 110°: không có dấu góc vuông, bé phải dùng ê ke.
      { type: 'match', bai: 18, point: 2, level: 2, multi: true,
        prompt: 'Dùng ê ke kiểm tra rồi nối mỗi góc với tên đúng:',
        fig: angles([
          { v: 'A', deg: 90, mark: false, label: 'Góc 1' },
          { v: 'B', deg: 60, label: 'Góc 2' },
          { v: 'C', deg: 90, turn: -15, mark: false, label: 'Góc 3' },
          { v: 'D', deg: 110, turn: -10, label: 'Góc 4' },
        ]),
        left: ['Góc 1', 'Góc 2', 'Góc 3', 'Góc 4'],
        right: ['Góc vuông', 'Góc không vuông'],
        ans: [0, 1, 0, 1] },
      // 12 + 15 + 9 = 36. Nhiễu: thiếu một đoạn (27 cm = 12 + 15, 24 cm = 15 + 9, 21 cm = 12 + 9).
      { type: 'mc', bai: 7, point: 1, level: 1, review: true,
        prompt: 'Độ dài đường gấp khúc ABCD là:',
        fig: geo({ pts: { A: [24, 110], B: [100, 30], C: [190, 104], D: [276, 36] }, segs: ['AB', 'BC', 'CD'], lens: { AB: '12 cm', BC: '15 cm', CD: '9 cm' }, pos: { A: 'w', C: 's', D: 'e' }, w: 300, h: 130 }),
        options: ['36 cm', '27 cm', '24 cm', '21 cm'], ans: 0 },
      // 10 : 2 = 5. Nhiễu: chép độ dài CD (10 cm), gấp đôi (20 cm), lấy 10 trừ 2 (8 cm).
      { type: 'mc', bai: 16, point: 2, level: 2,
        prompt: 'Đoạn thẳng CD dài 10 cm, I là trung điểm của đoạn thẳng CD. Đoạn thẳng CI dài:',
        options: ['5 cm', '10 cm', '20 cm', '8 cm'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 3, level: 1, review: true,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['638 + 247', '185 + 476', '914 − 358', '400 − 163'] },
      { type: 'fill', bai: 20, point: 2, level: 2,
        prompt: 'Bạn Lan vẽ một hình chữ nhật trên giấy ô vuông, chiều dài 6 ô, chiều rộng 4 ô. Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: 'Hai cạnh dài của hình chữ nhật, mỗi cạnh dài … ô.', ans: 6 },
          { t: 'Muốn vẽ hình vuông có cạnh bằng chiều rộng thì mỗi cạnh của hình vuông dài … ô.', ans: 4 },
          { t: 'Hình chữ nhật Lan vẽ có … góc vuông.', ans: 4 },
        ] },
      {
        type: 'word', bai: 17, point: 2, level: 3,
        text: 'Mặt chiếc đồng hồ treo tường là hình tròn có bán kính 15 cm. Hỏi đường kính của mặt đồng hồ dài bao nhiêu xăng-ti-mét?',
        given: ['Bán kính mặt đồng hồ là 15 cm.', 'Đường kính dài gấp 2 lần bán kính.'],
        ask: 'Đường kính của mặt đồng hồ dài bao nhiêu xăng-ti-mét?',
        hint: 'Đường kính dài gấp 2 lần bán kính: lấy 15 nhân với 2.',
        sentence: ['Đường kính', 'của mặt đồng hồ', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 15, op: '×', b: 2, result: 30, unit: 'cm' },
        units: ['cm', 'kg', 'giờ'],
      },
      // Hình chữ nhật ABCD có hai đường chéo cắt nhau ở O. Tam giác nhỏ: OAB, OBC, OCD, ODA; tam giác lớn: ABC, BCD, CDA, DAB. Tất cả 8.
      { type: 'fill', bai: 19, point: 4, level: 3,
        prompt: 'Đếm hình:',
        fig: geo({ pts: { A: [30, 22], B: [270, 22], C: [270, 122], D: [30, 122], O: [150, 72] }, segs: ['AB', 'BC', 'CD', 'DA', 'AC', 'BD'], pos: { A: 'nw', B: 'ne', C: 'se', D: 'sw', O: 's' }, w: 300, h: 146 }),
        items: [{ t: 'Hình bên có … hình tam giác.', ans: 8 }] },
    ] },
  ],
};
