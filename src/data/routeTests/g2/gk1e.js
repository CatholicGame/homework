/** Kiểm tra giữa học kì I (Đề 5): Bài 1–18 Vở BT Toán 2 (Nhanh 1 đến 5). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { twoRows, numberLine, balance } from './art.js';

export default {
  id: 'l2-gk-1e',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 5)',
  short: 'Giữa kì I · Đề 5',
  after: { book: 'workbook2', units: '1-18' },
  desc: 'Đọc, viết số; trừ qua 10; lít; bài toán thêm, nhiều hơn; cộng, trừ trong phạm vi 100; ki-lô-gam; số hạng, tổng',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: nhầm số bé nhất có hai chữ số là 11, nhầm sang số lớn nhất (99), lấy số bé nhất có một chữ số (0).
      { type: 'mc', bai: 1, point: 3, level: 1,
        prompt: 'Số bé nhất có hai chữ số là:',
        options: ['10', '11', '99', '0'], ans: 0 },
      { type: 'match', bai: 1, point: 1, level: 1,
        prompt: 'Nối cách đọc với số:',
        left: ['Hai mươi mốt', 'Mười lăm', 'Bảy mươi', 'Năm mươi tư'],
        right: ['70', '54', '15', '21'], ans: [3, 2, 0, 1] },
      // Vạch đầu là 60, B ở vạch thứ 8. Nhiễu: đếm thừa một vạch (68), đếm thiếu một vạch (66), viết ngược (76).
      { type: 'mc', bai: 2, point: 0, level: 1,
        prompt: 'Điểm B trên tia số ứng với số nào?',
        fig: numberLine({ from: 60, n: 11, labels: { 7: 'B' } }),
        options: ['67', '68', '66', '76'], ans: 0 },
      // Nhiễu: dừng ở bước 4 + 4 mà viết phần lẻ (4), lấy 6 − 4 (2), dừng ở 10.
      { type: 'mc', bai: 11, point: 1, level: 1,
        prompt: 'Tính 14 − 6: tách 14 = 10 + 4; 10 − 6 = 4; 4 + 4 = …',
        options: ['8', '4', '2', '10'], ans: 0 },
      // Ý sai: viết nhầm đơn vị kg, cộng sai một đơn vị.
      { type: 'tf', bai: 16, point: 2, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['7 l + 3 l = 10 l', '9 l − 4 l = 5 kg', '15 l − 5 l = 10 l', '6 l + 6 l = 13 l'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Cân thăng bằng: 2 kg + 1 kg = 3 kg. Nhiễu: chỉ đọc một quả cân (2 kg), ghép hai số (21 kg), sai đơn vị (3 l).
      { type: 'mc', bai: 15, point: 2, level: 1,
        prompt: 'Cân thăng bằng. Túi cam nặng mấy ki-lô-gam?',
        fig: balance([{ kind: 'cam', label: 'túi cam' }], [2, 1]),
        options: ['3 kg', '2 kg', '21 kg', '3 l'], ans: 0 },
      // Nhiễu: thấy "lên xe" mà trừ (7 người), đếm thêm thừa hoặc thiếu một (18, 16 người).
      { type: 'mc', bai: 9, point: 0, level: 1,
        prompt: 'Xe buýt có 12 hành khách. Đến bến, có thêm 5 người lên xe, không ai xuống. Trên xe có tất cả:',
        options: ['17 người', '7 người', '18 người', '16 người'], ans: 0 },
      // Ý sai: lệch một (13 − 9 = 5 phải là 4, 14 − 5 = 8 phải là 9).
      { type: 'tf', bai: 12, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['11 − 7 = 4', '13 − 9 = 5', '17 − 9 = 8', '14 − 5 = 8'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: lấy số nhiều hơn (3), trừ 8 − 3 (5), lấy số quả hàng trên (8).
      { type: 'mc', bai: 13, point: 2, level: 2,
        prompt: 'Hàng trên có 8 quả táo. Hàng dưới có nhiều hơn hàng trên 3 quả lê. Hàng dưới có mấy quả lê?',
        fig: twoRows('Táo', 'tao', 8, 'Lê', 'le', 11),
        options: ['11', '3', '5', '8'], ans: 0 },
      // 12 − 5 = 7, 7 + 3 = 10. Nhiễu: trừ cả hai số (4), cộng hết (20), dừng sau bước một (7).
      { type: 'mc', bai: [9, 11], point: 1, level: 3,
        prompt: 'Mai có 12 viên bi. Mai cho em 5 viên bi, rồi mẹ cho Mai thêm 3 viên bi. Lúc này Mai có bao nhiêu viên bi?',
        options: ['10', '4', '20', '7'], ans: 0 },
      // Sau khi rót: can thứ nhất 8 − 2 = 6 l, can thứ hai 6 + 2 = 8 l. Ý sai: chỉ trừ ở can thứ nhất nên nghĩ bằng nhau; nghĩ can thứ nhất vẫn nhiều hơn.
      { type: 'tf', bai: 16, point: 2, level: 3,
        prompt: 'Can thứ nhất có 8 l dầu, can thứ hai có 6 l dầu. Bố rót 2 l dầu từ can thứ nhất sang can thứ hai. Đúng ghi Đ, sai ghi S:',
        items: ['Can thứ nhất còn 6 l dầu.', 'Can thứ hai có 8 l dầu.', 'Hai can có số dầu bằng nhau.', 'Can thứ nhất có nhiều dầu hơn can thứ hai.'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 5, point: 1, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['62 + 15', '48 − 23', '4 + 53', '99 − 70'] },
      { type: 'chain', bai: [7, 11], point: 0, level: 2,
        prompt: 'Số?',
        items: [{ start: 8, steps: ['+ 5', '− 6', '+ 9'] }, { start: 15, steps: ['− 7', '+ 4', '− 3'] }] },
      {
        type: 'word', bai: [4, 15], point: 0, level: 2,
        text: 'Bao gạo cân nặng 25 kg, bao ngô cân nặng 13 kg. Hỏi bao gạo nặng hơn bao ngô bao nhiêu ki-lô-gam?',
        given: ['Bao gạo nặng 25 kg.', 'Bao ngô nặng 13 kg.'],
        ask: 'Bao gạo nặng hơn bao ngô bao nhiêu ki-lô-gam?',
        hint: 'Muốn biết nặng hơn bao nhiêu thì lấy số lớn trừ số bé: 25 trừ 13.',
        sentence: ['Bao gạo', 'nặng hơn bao ngô', 'số ki-lô-gam', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 25, op: '−', b: 13, result: 12, unit: 'kg' },
        units: ['kg', 'l', 'bao'],
      },
      // a) 8 + 8 = 16. b) 15 − 8 = 7.
      { type: 'fill', bai: [3, 8], point: 0, level: 3,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: 'Hai số hạng bằng nhau và tổng là 16. Mỗi số hạng là …', ans: 8 },
          { t: 'Tổng là 15, một số hạng là 8. Số hạng kia là …', ans: 7 },
        ] },
    ] },
  ],
};
