/** Kiểm tra giữa học kì I (Đề 4): Bài 1–18 Vở BT Toán 2 (Nhanh 1 đến 5). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { balance, vessels } from './art.js';

export default {
  id: 'l2-gk-1d',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 4)',
  short: 'Giữa kì I · Đề 4',
  after: { book: 'workbook2', units: '1-18' },
  desc: 'Viết số thành tổng chục và đơn vị; số liền trước, liền sau; bảng cộng, bảng trừ; bài toán thêm, ít hơn; cân đĩa, lít',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: cộng hai chữ số (6 + 8), viết ngược chục và đơn vị (80 + 6), viết cả hai chữ số thành chục (60 + 80).
      { type: 'mc', bai: 1, point: 0, level: 1,
        prompt: 'Viết số 68 thành tổng của chục và đơn vị: 68 = …',
        options: ['60 + 8', '6 + 8', '80 + 6', '60 + 80'], ans: 0 },
      // Ý sai: nhầm số liền trước với số liền sau.
      { type: 'tf', bai: 2, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Số liền sau của 39 là 40.', 'Số liền trước của 70 là 71.', 'Số liền trước của 10 là 9.', 'Số liền sau của 99 là 98.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: đổi tên số trừ với số bị trừ, hiệu; dùng tên của phép cộng (số hạng).
      { type: 'mc', bai: 3, point: 1, level: 1,
        prompt: 'Trong phép trừ 65 − 23 = 42, số 23 gọi là:',
        options: ['Số trừ', 'Số bị trừ', 'Hiệu', 'Số hạng'], ans: 0 },
      // Nhiễu: nhầm đĩa thấp hơn là nhẹ hơn (quả bóng), nghĩ hai vật nặng bằng nhau.
      { type: 'mc', bai: 15, point: 0, level: 1,
        prompt: 'Đĩa cân bên phải thấp hơn đĩa cân bên trái. Vật nào nhẹ hơn?',
        fig: balance([{ kind: 'tao', label: 'quả táo' }], [{ kind: 'bong', label: 'quả bóng' }], { tilt: 'right' }),
        options: ['Quả táo', 'Quả bóng', 'Hai vật nặng bằng nhau'], ans: 0 },
      { type: 'pick', bai: 9, point: 0, level: 1,
        prompt: 'Lan có 9 quả cam, mẹ cho Lan thêm 3 quả cam. Khoanh vào số quả cam Lan có tất cả:',
        icon: 'orange', count: 15, cols: 5, ans: 12 },
      // Ý sai: lệch một (6 + 7 = 12 phải là 13, 7 + 9 = 15 phải là 16).
      { type: 'tf', bai: 7, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['9 + 5 = 14', '6 + 7 = 12', '8 + 4 = 12', '7 + 9 = 15'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: số trừ thêm 1 mà nghĩ hiệu cũng thêm 1 (9), trừ thêm hai lần (6), lấy luôn số bị trừ (10).
      { type: 'mc', bai: 12, point: 2, level: 1,
        prompt: '11 − 2 = 9, 11 − 3 = 8, 11 − 4 = …',
        options: ['7', '9', '6', '10'], ans: 0 },
      { type: 'match', bai: 11, point: 0, level: 1,
        prompt: 'Nối phép tính với kết quả đúng:',
        left: ['11 − 5', '13 − 4', '16 − 8', '12 − 9'],
        right: ['8', '6', '3', '9'], ans: [1, 3, 0, 2] },
      // Nhiễu: cộng hai số (17 l), đọc số lít của xô (12 l), viết sai đơn vị (7 kg).
      { type: 'mc', bai: [4, 16], point: 0, level: 2,
        prompt: 'Xô đựng nhiều hơn can bao nhiêu lít nước?',
        fig: vessels([{ kind: 'xo', l: 12 }, { kind: 'can', l: 5 }]),
        options: ['7 l', '17 l', '12 l', '7 kg'], ans: 0 },
      // 10 − 4 = 6 l; rót ra 4 l ít hơn 6 l còn lại. Ý sai: cộng (14 l), viết sai đơn vị (kg).
      { type: 'tf', bai: 16, point: 2, level: 2,
        prompt: 'Bình có 10 l nước. Mẹ rót ra 4 l để nấu canh. Đúng ghi Đ, sai ghi S:',
        items: ['Trong bình còn lại 6 l nước.', 'Trong bình còn lại 14 l nước.', 'Số nước mẹ rót ra ít hơn số nước còn lại.', 'Trong bình còn lại 6 kg nước.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 9 + 2 = 11 < 12, 9 + 3 = 12 không bé hơn 12. Nhiễu: nghĩ 9 + 3 = 12 cũng được (3), chọn số bé nhất (1), chép số 12.
      { type: 'mc', bai: 8, point: 2, level: 3,
        prompt: '9 + □ < 12. Số lớn nhất điền được vào ô trống là:',
        options: ['2', '3', '1', '12'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 5, point: 1, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['51 + 36', '95 − 43', '60 + 29', '77 − 5'] },
      { type: 'fill', bai: [8, 12], point: 1, level: 2,
        prompt: 'Số?',
        items: ['□ + 7 = 15', '5 + □ = 14', '12 − □ = 4', '□ − 8 = 9'] },
      {
        type: 'word', bai: 13, point: 1, level: 3,
        text: 'Nhà bác An nuôi 16 con gà. Số con vịt ít hơn số con gà 7 con. Hỏi nhà bác An nuôi bao nhiêu con vịt?',
        given: ['Nhà bác An nuôi 16 con gà.', 'Số vịt ít hơn số gà 7 con.'],
        ask: 'Nhà bác An nuôi bao nhiêu con vịt?',
        hint: 'Ít hơn thì lấy số con gà trừ đi 7.',
        sentence: ['Nhà bác An', 'nuôi', 'số con vịt', 'là:'],
        decoys: ['nhiều hơn'],
        expr: { a: 16, op: '−', b: 7, result: 9, unit: 'con vịt' },
        units: ['con vịt', 'con gà', 'kg'],
      },
      // Chục là 3, đơn vị bé hơn 3: 30, 31, 32.
      { type: 'fill', bai: 1, point: 0, level: 3,
        prompt: 'Viết tất cả các số có hai chữ số mà chữ số hàng chục là 3 và chữ số hàng đơn vị bé hơn 3:',
        items: [{ t: '…, …, …', ans: [30, 31, 32], anyOrder: true }] },
    ] },
  ],
};
