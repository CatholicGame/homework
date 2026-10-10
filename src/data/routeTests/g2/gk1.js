/** Kiểm tra giữa học kì I (Đề 1): Bài 1–18 Vở BT Toán 2 (Nhanh 1 đến 5). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { balance, vessels } from './art.js';

export default {
  id: 'l2-gk-1',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 1)',
  short: 'Giữa kì I · Đề 1',
  after: { book: 'workbook2', units: '1-18' },
  desc: 'Số đến 100; số hạng, tổng; cộng, trừ trong phạm vi 100; bảng cộng, bảng trừ qua 10; nhiều hơn; ki-lô-gam, lít',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: viết rời "năm mươi" thành 50 rồi ghép 4 (504), viết ngược chục và đơn vị (45), chỉ viết số chục (50).
      { type: 'mc', bai: 1, point: 1, level: 1,
        prompt: 'Số "năm mươi tư" viết là:',
        options: ['504', '54', '45', '50'], ans: 1 },
      // Nhiễu: nhầm đĩa cao hơn là nặng hơn (quả táo), nghĩ hai đồ vật cùng ở trên cân là nặng bằng nhau.
      { type: 'mc', bai: 15, point: 0, level: 1,
        prompt: 'Đĩa cân bên trái thấp hơn đĩa cân bên phải. Vật nào nặng hơn?',
        fig: balance([{ kind: 'hop', label: 'hộp quà' }], [{ kind: 'tao', label: 'quả táo' }], { tilt: 'left' }),
        options: ['Hộp quà', 'Quả táo', 'Hai vật nặng bằng nhau'], ans: 0 },
      // Ý sai: gọi số hạng là tổng.
      { type: 'tf', bai: 3, point: 0, level: 1,
        prompt: 'Cho phép cộng 34 + 25 = 59. Đúng ghi Đ, sai ghi S:',
        items: ['34 là số hạng.', '25 là tổng.', '59 là tổng.', '34 + 25 cũng gọi là tổng.'],
        ans: ['Đ', 'S', 'Đ', 'Đ'] },
      // Nhiễu: nhầm sang đơn vị khối lượng (kg), đơn vị độ dài (cm).
      { type: 'mc', bai: 16, point: 0, level: 1,
        prompt: 'Chọn đơn vị thích hợp: Chai nước mắm có 1 …',
        options: ['l', 'kg', 'cm'], ans: 0 },
      // 8 + 6 = 14.
      { type: 'pick', bai: 7, point: 1, level: 1,
        prompt: 'Khoanh vào số ngôi sao bằng kết quả của phép tính 8 + 6:',
        icon: 'star', count: 16, cols: 8, ans: 14 },
      // Nhiễu: đếm tiếp thiếu một (12), đếm tiếp thừa một (14), lấy 8 trừ 5 (3).
      { type: 'mc', bai: 8, point: 0, level: 1,
        prompt: 'Kết quả của phép tính 8 + 5 là:',
        options: ['12', '13', '14', '3'], ans: 1 },
      // Nhiễu: lấy 5 trừ 3 (2 l), ghép hai số (53 l), viết sai đơn vị (8 kg).
      { type: 'mc', bai: 16, point: 2, level: 1,
        prompt: 'Cả hai can có tất cả bao nhiêu lít nước?',
        fig: vessels([{ kind: 'can', l: 5 }, { kind: 'can', l: 3 }], { op: '+' }),
        options: ['8 l', '2 l', '53 l', '8 kg'], ans: 0 },
      // Ý sai: lệch một (16 − 7 = 8 phải là 9, 11 − 8 = 4 phải là 3).
      { type: 'tf', bai: 11, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['12 − 4 = 8', '16 − 7 = 8', '13 − 6 = 7', '11 − 8 = 4'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      { type: 'match', bai: 12, point: 0, level: 2,
        prompt: 'Nối phép tính với kết quả đúng:',
        left: ['12 − 5', '14 − 6', '15 − 9', '11 − 2'],
        right: ['6', '7', '8', '9'], ans: [1, 2, 0, 3] },
      // 6 + 9 = 15, 8 + 7 = 15. Nhiễu: viết luôn tổng (15), lấy 9 − 8 (1), chép số 9.
      { type: 'mc', bai: [7, 8], point: 1, level: 3,
        prompt: 'Số thích hợp điền vào ô trống: 8 + □ = 6 + 9',
        options: ['7', '15', '1', '9'], ans: 0 },
      // Bao đường 10 − 4 = 6 kg, bao đỗ 6 + 2 = 8 kg. Nhiễu: thấy "nhẹ hơn" mà cộng (16 kg), trừ cả hai lần (4 kg), quên bước bao đường (12 kg).
      { type: 'mc', bai: [13, 15], point: 1, level: 3,
        prompt: 'Bao gạo nặng 10 kg. Bao đường nhẹ hơn bao gạo 4 kg. Bao đỗ nặng hơn bao đường 2 kg. Bao đỗ nặng bao nhiêu ki-lô-gam?',
        options: ['8 kg', '16 kg', '4 kg', '12 kg'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 5, point: 1, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['43 + 25', '78 − 36', '52 + 7', '69 − 40'] },
      { type: 'compare', bai: [7, 8, 11], point: 1, level: 2,
        prompt: 'Điền dấu >, <, = thích hợp:',
        items: ['9 + 4 □ 12', '15 − 7 □ 8', '6 + 8 □ 8 + 6', '13 − 5 □ 9'] },
      {
        type: 'word', bai: 13, point: 0, level: 2,
        text: 'Tổ Một trồng được 14 cây hoa. Tổ Hai trồng được nhiều hơn Tổ Một 5 cây hoa. Hỏi Tổ Hai trồng được bao nhiêu cây hoa?',
        given: ['Tổ Một trồng được 14 cây hoa.', 'Tổ Hai trồng nhiều hơn Tổ Một 5 cây hoa.'],
        ask: 'Tổ Hai trồng được bao nhiêu cây hoa?',
        hint: 'Nhiều hơn thì lấy số cây hoa của Tổ Một cộng thêm 5.',
        sentence: ['Tổ Hai', 'trồng được', 'số cây hoa', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 14, op: '+', b: 5, result: 19, unit: 'cây hoa' },
        units: ['cây hoa', 'tổ', 'kg'],
      },
      { type: 'fill', bai: [1, 4], point: 3, level: 3,
        prompt: 'Số lớn nhất có hai chữ số hơn số bé nhất có hai chữ số bao nhiêu? Viết phép tính rồi tìm kết quả:',
        items: [{ t: '… − … = …', ans: [99, 10, 89] }] },
    ] },
  ],
};
