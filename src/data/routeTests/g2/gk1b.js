/** Kiểm tra giữa học kì I (Đề 2): Bài 1–18 Vở BT Toán 2 (Nhanh 1 đến 5). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { sticks, numberLine, things, twoRows, balance } from './art.js';

export default {
  id: 'l2-gk-1b',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 2)',
  short: 'Giữa kì I · Đề 2',
  after: { book: 'workbook2', units: '1-18' },
  desc: 'Chục và đơn vị, tia số; hơn kém nhau bao nhiêu; số bị trừ, số trừ, hiệu; bài toán thêm, bớt; ki-lô-gam, lít',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: đọc que lẻ trước (27), đếm tất cả bó và que như que lẻ (9), viết rời 70 và 2 (702).
      { type: 'mc', bai: 1, point: 0, level: 1,
        prompt: 'Có tất cả bao nhiêu que tính? (mỗi bó có 10 que)',
        fig: sticks(7, 2),
        options: ['72', '27', '9', '702'], ans: 0 },
      // Nhiễu: đếm từ vạch thứ nhất là 31 (33), đếm thừa một vạch (35), viết ngược chục và đơn vị (43).
      { type: 'mc', bai: 2, point: 0, level: 1,
        prompt: 'Điểm A trên tia số ứng với số nào?',
        fig: numberLine({ from: 30, n: 11, labels: { 4: 'A' } }),
        options: ['33', '34', '35', '43'], ans: 1 },
      // Ý sai: quên viết đơn vị, viết nhầm đơn vị lít.
      { type: 'tf', bai: 15, point: 3, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['6 kg + 3 kg = 9 kg', '15 kg − 5 kg = 10 l', '4 kg + 4 kg = 8 kg', '10 kg − 3 kg = 6 kg'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Đổi chỗ các số hạng. Nhiễu: tổng thêm 1 (18), lấy 9 − 8 (1), ghép hai số (98).
      { type: 'mc', bai: 7, point: 3, level: 1,
        prompt: 'Biết 8 + 9 = 17. Vậy 9 + 8 = …',
        options: ['17', '18', '1', '98'], ans: 0 },
      // Nhiễu: thấy "bay đi" mà vẫn cộng (19), trừ nhầm (10, 12).
      { type: 'mc', bai: 9, point: 1, level: 1,
        prompt: 'Trên cành có 15 con chim, 4 con bay đi. Trên cành còn lại mấy con chim?',
        fig: things('bird', 15, { cols: 5, gone: 4 }),
        options: ['19', '11', '10', '12'], ans: 1 },
      { type: 'pick', bai: 11, point: 0, level: 1,
        prompt: 'Có 13 bông hoa, bạn Hoa hái đi 5 bông. Khoanh vào số bông hoa còn lại:',
        icon: 'flower', count: 13, cols: 5, ans: 8 },
      // Nhiễu: chép số trừ (6), cộng hai số (19), chép số bị trừ (13).
      { type: 'mc', bai: 12, point: 1, level: 1,
        prompt: 'Biết 7 + 6 = 13. Vậy 13 − 6 = …',
        options: ['7', '6', '19', '13'], ans: 0 },
      // Hai ô trái cùng nối kg, hai ô cùng nối l.
      { type: 'match', bai: [15, 16], point: 1, level: 1, multi: true,
        prompt: 'Nối mỗi câu với đơn vị thích hợp:',
        left: ['Bao xi măng nặng 50 …', 'Bể cá chứa 30 … nước', 'Bé Na cân nặng 18 …', 'Hộp sữa to có 2 … sữa'],
        right: ['kg', 'l'], ans: [0, 1, 0, 1] },
      // Nhiễu: cộng hai hàng (15), chỉ đọc số của một hàng (9, 6).
      { type: 'mc', bai: 4, point: 0, level: 2,
        prompt: 'Số gà nhiều hơn số thỏ bao nhiêu con?',
        fig: twoRows('Gà', 'chick', 9, 'Thỏ', 'rabbit', 6),
        options: ['3', '15', '9', '6'], ans: 0 },
      // Lớn hơn 56, bé hơn 60, hàng đơn vị là 8: số 58. Nhiễu: quên điều kiện bé hơn 60 (68), viết ngược (85), lấy số ngay sau 56 (57).
      { type: 'mc', bai: 1, point: 2, level: 3,
        prompt: 'Số nào lớn hơn 56, bé hơn 60 và có chữ số hàng đơn vị là 8?',
        options: ['58', '68', '85', '57'], ans: 0 },
      // Can đỏ: 9 + 4 = 13 l. Can vàng: 13 − 6 = 7 l. Ý sai: can nhiều nhất là can đỏ, can ít nhất là can vàng.
      { type: 'tf', bai: [13, 16], point: 0, level: 3,
        prompt: 'Can xanh có 9 l nước. Can đỏ có nhiều hơn can xanh 4 l nước. Can vàng có ít hơn can đỏ 6 l nước. Đúng ghi Đ, sai ghi S:',
        items: ['Can đỏ có 13 l nước.', 'Can vàng có 7 l nước.', 'Can vàng có nhiều nước nhất.', 'Can xanh có ít nước nhất.'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 5, point: 1, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['34 + 52', '86 − 25', '40 + 38', '97 − 7'] },
      { type: 'table', bai: [3, 12], point: 2, level: 2,
        prompt: 'Viết số thích hợp vào ô trống:',
        head: ['Số bị trừ', 'Số trừ', 'Hiệu'],
        rows: [[14, 6, '…'], [16, 9, '…'], [58, 20, '…'], [76, 5, '…']],
        ans: [[8], [7], [38], [71]] },
      {
        type: 'word', bai: [9, 16], point: 0, level: 2,
        text: 'Thùng có 8 l nước, mẹ đổ thêm vào thùng 5 l nước. Hỏi trong thùng có tất cả bao nhiêu lít nước?',
        given: ['Thùng có 8 l nước.', 'Mẹ đổ thêm 5 l nước.'],
        ask: 'Trong thùng có tất cả bao nhiêu lít nước?',
        hint: 'Đổ thêm thì số lít nước nhiều lên: lấy 8 cộng 5.',
        sentence: ['Trong thùng', 'có tất cả', 'số lít nước', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 8, op: '+', b: 5, result: 13, unit: 'l' },
        units: ['l', 'kg', 'thùng'],
      },
      // Hộp + 2 kg nặng bằng 5 kg + 4 kg = 9 kg, nên hộp nặng 9 − 2 = 7 kg.
      { type: 'fill', bai: 15, point: 2, level: 3,
        prompt: 'Cân thăng bằng. Hộp bánh nặng bao nhiêu ki-lô-gam?',
        fig: balance([{ kind: 'hop', label: 'hộp bánh' }, 2], [5, 4]),
        items: [{ t: 'Hộp bánh nặng … kg.', ans: 7 }] },
    ] },
  ],
};
