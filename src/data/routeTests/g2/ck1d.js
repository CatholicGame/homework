/** Kiểm tra cuối học kì I (Đề 4): Bài 1–36 Vở BT Toán 2 (Nhanh 1 đến 8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { clock, numberLine, vessels, geo, polys } from './art.js';

export default {
  id: 'l2-ck-1d',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 4)',
  short: 'Cuối kì I · Đề 4',
  after: { book: 'workbook2', units: '1-36' },
  desc: 'Giờ rưỡi, ngày trong tuần; tia số; bảng cộng, bảng trừ; lít; đoạn thẳng, đường gấp khúc; cộng, trừ có nhớ; ít hơn; giờ buổi tối',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: viết rời "chín mươi" thành 90 rồi ghép 5 (905), viết ngược chục và đơn vị (59), chỉ viết số chục (90).
      { type: 'mc', bai: 1, point: 1, level: 1,
        prompt: 'Số "chín mươi lăm" viết là:',
        options: ['95', '905', '59', '90'], ans: 0 },
      // Kim ngắn ở giữa 4 và 5, kim dài chỉ số 6. Nhiễu: đọc số lớn hơn mà kim ngắn vừa qua (5 giờ 30 phút),
      // đọc kim dài là giờ (6 giờ 4 phút), đọc số 6 là 6 phút (4 giờ 6 phút).
      { type: 'mc', bai: 29, point: 2, level: 1,
        prompt: 'Đồng hồ chỉ mấy giờ?',
        fig: clock(4, 30),
        options: ['4 giờ 30 phút', '5 giờ 30 phút', '6 giờ 4 phút', '4 giờ 6 phút'], ans: 0 },
      { type: 'pick', bai: 9, point: 0, level: 1,
        prompt: 'Trong chuồng có 9 con thỏ, bố mua thêm 4 con thỏ. Khoanh vào số con thỏ có tất cả:',
        icon: 'rabbit', count: 15, cols: 5, ans: 13 },
      // Tia số chia theo chục: 0, 10, 20, … Nhiễu: đếm từng vạch như đơn vị (6), đếm thiếu (50), đếm thừa (70).
      { type: 'mc', bai: 2, point: 0, level: 1,
        prompt: 'Số thích hợp ở vị trí dấu ? trên tia số là:',
        fig: numberLine({ from: 0, step: 10, n: 11, labels: { 6: '?' }, show: [0, 1, 2, 3, 4, 5, 10], gap: 30 }),
        options: ['60', '6', '50', '70'], ans: 0 },
      // Ý sai: 12 − 7 bằng 5, không phải 6.
      { type: 'tf', bai: [8, 12], point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['9 + 6 = 15', '12 − 7 = 6', '8 + 8 = 16', '16 − 9 = 7'],
        ans: ['Đ', 'S', 'Đ', 'Đ'] },
      // Nhiễu: lấy 3 trừ 2 (1 kg), ghép hai số (23 kg), viết nhầm đơn vị lít (5 l).
      { type: 'mc', bai: 15, point: 3, level: 1,
        prompt: 'Mẹ mua 2 kg gạo nếp và 3 kg khoai lang. Mẹ mua tất cả:',
        options: ['5 kg', '1 kg', '23 kg', '5 l'], ans: 0 },
      // Ý sai: quên nhớ 1 sang hàng chục (47 + 25 = 62, 55 + 9 = 54).
      { type: 'tf', bai: [19, 20], point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['29 + 6 = 35', '47 + 25 = 62', '18 + 18 = 36', '55 + 9 = 54'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: lấy 20 trừ 15 (5 l), viết sai đơn vị (35 kg), ghép số (215 l).
      { type: 'mc', bai: 16, point: 2, level: 1,
        prompt: 'Cả hai can có tất cả bao nhiêu lít dầu?',
        fig: vessels([{ kind: 'can', l: 20, fill: '#fde047' }, { kind: 'can', l: 15, fill: '#fde047' }], { op: '+' }),
        options: ['35 l', '5 l', '35 kg', '215 l'], ans: 0 },
      { type: 'match', bai: 29, point: 1, level: 1,
        prompt: 'Nối hai cách gọi của cùng một giờ:',
        left: ['14 giờ', '18 giờ', '21 giờ', '23 giờ'],
        right: ['9 giờ tối', '2 giờ chiều', '11 giờ đêm', '6 giờ chiều'], ans: [1, 3, 0, 2] },
      // Nhiễu: lấy ngày liền sau (11), lùi lại một tuần (3), cộng hai tuần (24).
      { type: 'mc', bai: 30, point: 2, level: 1,
        prompt: 'Hôm nay là Thứ Ba ngày 10. Thứ Ba tuần sau là ngày:',
        options: ['17', '11', '3', '24'], ans: 0 },
      // Đoạn thẳng: AB, BC, CD, DA, AC (5). Nhiễu: chỉ đếm 4 cạnh (4), đếm thêm BD không có (6), đếm 3.
      { type: 'mc', bai: 25, point: 1, level: 2,
        prompt: 'Hình vẽ dưới đây có bao nhiêu đoạn thẳng?',
        fig: geo({ pts: { A: [40, 110], B: [80, 26], C: [230, 30], D: [250, 112] }, segs: ['AB', 'BC', 'CD', 'DA', 'AC'], pos: { A: 'sw', D: 'se' }, h: 136 }),
        options: ['5', '4', '6', '3'], ans: 0 },
      // 26 + 8 = 34. Ý sai: thấy "nhiều hơn" mà trừ (18).
      { type: 'tf', bai: [13, 19], point: 0, level: 2,
        prompt: 'Hộp bút đỏ có 26 cái. Hộp bút xanh có nhiều hơn hộp bút đỏ 8 cái. Đúng ghi Đ, sai ghi S:',
        items: ['Muốn tìm số bút xanh, ta lấy 26 + 8.', 'Hộp bút xanh có 18 cái.', 'Hộp bút xanh có 34 cái.'],
        ans: ['Đ', 'S', 'Đ'] },
      // Nhiễu: lấy 4 − 0 ở hàng đơn vị (44), không trả nhớ (46), làm phép cộng (144).
      { type: 'mc', bai: 23, point: 1, level: 2,
        prompt: 'Kết quả của phép tính 90 − 54 là:',
        options: ['36', '44', '46', '144'], ans: 0 },
      // Hai đường chéo chia hình vuông thành 4 hình tam giác. Nhiễu: chỉ thấy một đường chéo (2), đếm cả hình vuông (5), đếm gấp đôi (8).
      { type: 'mc', bai: 27, point: 1, level: 2,
        prompt: 'Hình vuông dưới đây được ghép từ mấy hình tam giác nhỏ?',
        fig: polys([
          { pts: [[20, 10], [110, 10], [65, 55]], color: '#fde68a' },
          { pts: [[110, 10], [110, 100], [65, 55]], color: '#bfdbfe' },
          { pts: [[110, 100], [20, 100], [65, 55]], color: '#fecaca' },
          { pts: [[20, 100], [20, 10], [65, 55]], color: '#bbf7d0' },
        ], { w: 130, h: 110, width: 150 }),
        options: ['4', '2', '5', '8'], ans: 0 },
      // Tháng 10 năm 2026: ngày 31 là Thứ Bảy. Ngày 1 tháng 11 là Chủ nhật; ngày 30 tháng 10 là Thứ Sáu; 31 − 7 = 24 cũng là Thứ Bảy.
      { type: 'tf', bai: 30, point: 1, level: 3,
        prompt: 'Tháng 10 có 31 ngày. Ngày 31 tháng 10 là Thứ Bảy. Đúng ghi Đ, sai ghi S:',
        items: ['Ngày 1 tháng 11 là Chủ nhật.', 'Ngày 30 tháng 10 là Chủ nhật.', 'Ngày 24 tháng 10 cũng là Thứ Bảy.'],
        ans: ['Đ', 'S', 'Đ'] },
      // 65 − 28 = 37. Nhiễu: làm phép cộng (93), không trả nhớ (47), lấy 8 − 5 ở hàng đơn vị (43).
      { type: 'mc', bai: [3, 23], point: 2, level: 3,
        prompt: 'Số nào cộng với 28 thì được 65?',
        options: ['37', '93', '47', '43'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [19, 20, 22, 23], point: 0, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['67 + 9', '35 + 46', '84 − 6', '52 − 37'] },
      { type: 'fill', bai: 26, point: 1, level: 2,
        prompt: 'Viết phép tính rồi tính độ dài đường gấp khúc PQRS:',
        fig: geo({ pts: { P: [20, 100], Q: [100, 30], R: [190, 104], S: [280, 36] }, segs: ['PQ', 'QR', 'RS'], lens: { PQ: '13 cm', QR: '16 cm', RS: '9 cm' }, pos: { P: 'w', R: 's', S: 'e' }, h: 130 }),
        items: [{ t: '… cm + … cm + … cm = … cm', ans: [13, 16, 9, 38] }] },
      {
        type: 'word', bai: [13, 23], point: 1, level: 3,
        text: 'Bố cân nặng 65 kg. Con nhẹ hơn bố 38 kg. Hỏi con cân nặng bao nhiêu ki-lô-gam?',
        given: ['Bố cân nặng 65 kg.', 'Con nhẹ hơn bố 38 kg.'],
        ask: 'Con cân nặng bao nhiêu ki-lô-gam?',
        hint: 'Nhẹ hơn thì lấy cân nặng của bố trừ đi 38.',
        sentence: ['Con', 'cân nặng', 'số ki-lô-gam', 'là:'],
        decoys: ['nhiều hơn'],
        expr: { a: 65, op: '−', b: 38, result: 27, unit: 'kg' },
        units: ['kg', 'l', 'tuổi'],
      },
      // 9 giờ tối là 21 giờ; từ 6 giờ đến 21 giờ là 21 − 6 = 15 giờ.
      { type: 'fill', bai: [4, 29], point: 1, level: 3,
        prompt: 'Sáng nay Nam thức dậy lúc 6 giờ. Tối nay Nam đi ngủ lúc 9 giờ. Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: '9 giờ tối còn gọi là … giờ.', ans: 21 },
          { t: 'Từ lúc thức dậy đến lúc đi ngủ, Nam thức … giờ.', ans: 15 },
        ] },
    ] },
  ],
};
