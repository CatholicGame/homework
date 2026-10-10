/** Kiểm tra giữa học kì I (Đề 3): Bài 1–18 Vở BT Toán 2 (Nhanh 1 đến 5). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { pourCups, balance } from './art.js';

export default {
  id: 'l2-gk-1c',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 3)',
  short: 'Giữa kì I · Đề 3',
  after: { book: 'workbook2', units: '1-18' },
  desc: 'Đọc số, so sánh số; cộng qua 10, bảng cộng, bảng trừ; bài toán bớt, ít hơn; lít; số liền sau, hiệu',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: đọc "năm" thay cho "lăm" (bảy mươi năm), đọc ngược (năm mươi bảy), đọc rời từng chữ số như số có ba chữ số.
      { type: 'mc', bai: 1, point: 1, level: 1,
        prompt: 'Số 75 đọc là:',
        options: ['Bảy mươi năm', 'Bảy mươi lăm', 'Năm mươi bảy', 'Bảy trăm linh năm'], ans: 1 },
      // Nhiễu: tách cả 6 thay cho phần còn lại (6), tách nhầm 6 = 2 + 4 (4), lấy luôn tổng (15).
      { type: 'mc', bai: 7, point: 0, level: 1,
        prompt: 'Tính 9 + 6 bằng cách làm tròn 10: 9 + 6 = 9 + 1 + …',
        options: ['5', '6', '4', '15'], ans: 0 },
      // Ý sai: nghĩ có 1 ca nên chỉ có 1 l, hoặc đếm thêm cả can.
      { type: 'tf', bai: 16, point: 1, level: 1,
        prompt: 'Rót hết nước trong can sang các ca 1 l thì được đầy 4 ca như hình. Đúng ghi Đ, sai ghi S:',
        fig: pourCups({ kind: 'can', l: 4, label: false }, 4),
        items: ['Can có 4 l nước.', 'Can có 1 l nước.', 'Mỗi ca chứa 1 l nước.', 'Can có 5 l nước.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Cân thăng bằng. Nhiễu: nghĩ quả to hơn thì nặng hơn, hoặc đọc ngược.
      { type: 'mc', bai: 15, point: 0, level: 1,
        prompt: 'Cân thăng bằng. Chọn câu đúng:',
        fig: balance([{ kind: 'cam', label: 'quả cam' }], [{ kind: 'le', label: 'quả lê' }]),
        options: ['Quả cam nặng bằng quả lê.', 'Quả cam nặng hơn quả lê.', 'Quả cam nhẹ hơn quả lê.'], ans: 0 },
      { type: 'match', bai: 8, point: 0, level: 1,
        prompt: 'Nối phép tính với kết quả đúng:',
        left: ['8 + 4', '7 + 7', '9 + 6', '5 + 8'],
        right: ['13', '12', '15', '14'], ans: [1, 3, 2, 0] },
      // Nhiễu: cộng (19), lệch một (6, 4).
      { type: 'mc', bai: 11, point: 0, level: 1,
        prompt: 'Kết quả của phép tính 12 − 7 là:',
        options: ['5', '19', '6', '4'], ans: 0 },
      // Nhiễu: thấy "ít hơn" mà cộng (16 quả), lấy số quả ít hơn (4 quả), lấy số quả hàng trên (12 quả).
      { type: 'mc', bai: 13, point: 1, level: 1,
        prompt: 'Hàng trên có 12 quả cam. Hàng dưới có ít hơn hàng trên 4 quả cam. Hàng dưới có:',
        options: ['8 quả cam', '16 quả cam', '4 quả cam', '12 quả cam'], ans: 0 },
      // 7 + 4 = 11.
      { type: 'pick', bai: 13, point: 0, level: 1,
        prompt: 'Bình có 7 ngôi sao. An có nhiều hơn Bình 4 ngôi sao. Khoanh vào số ngôi sao của An:',
        icon: 'star', count: 14, cols: 7, ans: 11 },
      // Nhiễu: xếp ngược từ lớn đến bé, giữ nguyên thứ tự đề cho, chỉ so chữ số hàng đơn vị.
      { type: 'mc', bai: 1, point: 2, level: 2,
        prompt: 'Các số 45, 54, 49, 50 xếp theo thứ tự từ bé đến lớn là:',
        options: ['45, 49, 50, 54', '54, 50, 49, 45', '45, 54, 49, 50', '50, 54, 45, 49'], ans: 0 },
      // 50 − 35 = 15. Nhiễu: cộng hai số (85), trừ hàng chục sai (25), chép số của Hà (50).
      { type: 'mc', bai: [4, 5], point: 0, level: 3,
        prompt: 'Lan gấp được 35 ngôi sao, Hà gấp được 50 ngôi sao. Lan cần gấp thêm bao nhiêu ngôi sao để có số ngôi sao bằng Hà?',
        options: ['15', '85', '25', '50'], ans: 0 },
      // Bao ngô 15 − 6 = 9 kg, bao khoai 8 kg nên bao khoai nhẹ nhất. Ý sai: cộng khi thấy "nhẹ hơn" (21 kg); 15 − 8 = 7, không phải 6.
      { type: 'tf', bai: [13, 15], point: 1, level: 3,
        prompt: 'Bao gạo nặng 15 kg. Bao ngô nhẹ hơn bao gạo 6 kg. Bao khoai nặng 8 kg. Đúng ghi Đ, sai ghi S:',
        items: ['Bao ngô nặng 9 kg.', 'Bao ngô nặng 21 kg.', 'Bao khoai nhẹ nhất.', 'Bao gạo nặng hơn bao khoai 6 kg.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 5, point: 2, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['25 + 63', '89 − 54', '3 + 71', '46 − 6'] },
      { type: 'fill', bai: 12, point: 1, level: 2,
        prompt: 'Dựa vào phép cộng, viết kết quả hai phép trừ:',
        items: [
          { t: '9 + 5 = 14, nên 14 − 5 = … và 14 − 9 = …', ans: [9, 5] },
          { t: '8 + 7 = 15, nên 15 − 7 = … và 15 − 8 = …', ans: [8, 7] },
        ] },
      {
        type: 'word', bai: 9, point: 1, level: 2,
        text: 'Tủ sách của lớp có 17 quyển truyện. Các bạn mượn về nhà 9 quyển. Hỏi tủ sách của lớp còn lại bao nhiêu quyển truyện?',
        given: ['Tủ sách có 17 quyển truyện.', 'Các bạn mượn đi 9 quyển.'],
        ask: 'Tủ sách còn lại bao nhiêu quyển truyện?',
        hint: 'Mượn đi thì số truyện bớt đi: lấy 17 trừ 9.',
        sentence: ['Tủ sách của lớp', 'còn lại', 'số quyển truyện', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 17, op: '−', b: 9, result: 8, unit: 'quyển truyện' },
        units: ['quyển truyện', 'bạn', 'l'],
      },
      // Số liền sau của 49 là 50; 50 − 20 = 30.
      { type: 'fill', bai: [2, 3], point: 1, level: 3,
        prompt: 'Số bị trừ là số liền sau của 49, số trừ là 20. Viết phép trừ rồi tìm hiệu:',
        items: [{ t: '… − … = …', ans: [50, 20, 30] }] },
    ] },
  ],
};
