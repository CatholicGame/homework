/** Kiểm tra cuối học kì I (Đề 2): Bài 1–36 Vở BT Toán 2 (Nhanh 1 đến 8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { digital, calendar, polys, balance, geo, vessels } from './art.js';

// Hình nhỏ cho phương án: đoạn thẳng, đường cong, đường thẳng, đường gấp khúc.
const box = (body) => `<svg viewBox="0 0 120 70" width="120" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="3.6" fill="#1f2937"/>`;
const STROKE = 'stroke="#1f2937" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"';
const LINE_SEG = box(`<path d="M20 50 L100 20" ${STROKE}/>${dot(20, 50)}${dot(100, 20)}`);
const LINE_CURVE = box(`<path d="M12 50 C40 0 70 70 108 18" ${STROKE}/>`);
const LINE_STRAIGHT = box(`<path d="M4 58 L116 12" ${STROKE}/>${dot(36, 45)}${dot(84, 25)}`);
const LINE_ZIGZAG = box(`<path d="M12 54 L42 16 L76 52 L108 18" ${STROKE}/>${dot(12, 54)}${dot(42, 16)}${dot(76, 52)}${dot(108, 18)}`);

export default {
  id: 'l2-ck-1b',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 2)',
  short: 'Cuối kì I · Đề 2',
  after: { book: 'workbook2', units: '1-36' },
  desc: 'Đồng hồ điện tử, tờ lịch; cộng, trừ có nhớ; đường cong, hình tứ giác; so sánh số; nhiều hơn, hơn kém; cân thăng bằng',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: số lớn nhất có hai chữ số khác nhau (98), số tròn chục lớn nhất (90), số có ba chữ số (100).
      { type: 'mc', bai: 1, point: 3, level: 1,
        prompt: 'Số lớn nhất có hai chữ số là:',
        options: ['99', '98', '90', '100'], ans: 0 },
      // Nhiễu: đọc chữ số 9 thành giờ (9 giờ tối), không đổi sang buổi tối (7 giờ sáng), lấy chữ số 1 (1 giờ chiều).
      { type: 'mc', bai: 29, point: 3, level: 1,
        prompt: 'Đồng hồ điện tử chỉ giờ như hình. Lúc đó là:',
        fig: digital('19:00'),
        options: ['7 giờ tối', '9 giờ tối', '7 giờ sáng', '1 giờ chiều'], ans: 0 },
      // Ý sai: quên nhớ 1 sang hàng chục (46 + 7 = 43), lấy số trừ bé trừ số lớn ở hàng đơn vị (71 − 4 = 73).
      { type: 'tf', bai: [19, 22], point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: [{ col: '38 + 5', res: '43' }, { col: '46 + 7', res: '43' }, { col: '52 − 6', res: '46' }, { col: '71 − 4', res: '73' }],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: làm phép cộng (110), quên chữ số 0 của số tròn chục (3), lấy số thứ hai (40).
      { type: 'mc', bai: 5, point: 0, level: 1,
        prompt: 'Tính nhẩm: 70 − 40 = ?',
        options: ['30', '110', '3', '40'], ans: 0 },
      { type: 'pick', bai: 13, point: 0, level: 1,
        prompt: 'Lan có 6 bông hoa. Mai có nhiều hơn Lan 5 bông hoa. Khoanh vào số bông hoa của Mai:',
        icon: 'flower', count: 14, cols: 7, ans: 11 },
      // Nhiễu: đoạn thẳng, đường thẳng, đường gấp khúc (đều tạo bởi nét thẳng).
      { type: 'mc', bai: 25, point: 2, level: 1,
        prompt: 'Hình nào là đường cong?',
        options: [LINE_SEG, LINE_CURVE, LINE_STRAIGHT, LINE_ZIGZAG], ans: 1 },
      { type: 'match', bai: 29, point: 3, level: 1,
        prompt: 'Nối đồng hồ điện tử với cách đọc giờ:',
        left: [digital('08:00', { size: 100 }), digital('14:00', { size: 100 }), digital('21:00', { size: 100 })],
        right: ['9 giờ tối', '8 giờ sáng', '2 giờ chiều'], ans: [1, 2, 0] },
      // Nhiễu: nhớ nhầm bảng trừ (9, 7), làm phép cộng (24).
      { type: 'mc', bai: 12, point: 0, level: 1,
        prompt: 'Kết quả của phép tính 16 − 8 là:',
        options: ['8', '9', '7', '24'], ans: 0 },
      // Tháng 12 năm 2026: ngày 1 là Thứ Ba, ngày 25 là Thứ Sáu. Nhiễu: đọc nhầm sang cột bên cạnh, cột Chủ nhật màu đỏ.
      { type: 'mc', bai: 30, point: 0, level: 1,
        prompt: 'Xem tờ lịch tháng 12. Ngày 25 tháng 12 (khoanh đỏ) là thứ mấy?',
        fig: calendar({ month: 12, first: 1, days: 31, mark: [25] }),
        options: ['Thứ Sáu', 'Thứ Năm', 'Thứ Bảy', 'Chủ nhật'], ans: 0 },
      // Ý sai: viết nhầm đơn vị lít cho khối lượng.
      { type: 'tf', bai: 15, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Ki-lô-gam viết tắt là kg.', 'Quả cân 5 kg nặng hơn quả cân 2 kg.', '20 kg + 30 kg = 50 l', '40 kg − 10 kg = 30 kg'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // 4 đoạn thẳng AB, BC, CD, DE. Nhiễu: đếm số điểm (5), đếm thiếu (3), coi cả đường là một đoạn (1).
      { type: 'mc', bai: 26, point: 0, level: 2,
        prompt: 'Đường gấp khúc ABCDE gồm mấy đoạn thẳng?',
        fig: geo({ pts: { A: [20, 100], B: [80, 30], C: [150, 96], D: [210, 34], E: [280, 90] }, segs: ['AB', 'BC', 'CD', 'DE'], pos: { A: 'w', C: 's', E: 'e' }, h: 126 }),
        options: ['4', '5', '3', '1'], ans: 0 },
      { type: 'match', bai: 20, point: 1, level: 2,
        prompt: 'Tính rồi nối phép tính với kết quả đúng:',
        left: ['48 + 24', '38 + 24', '46 + 36'],
        right: ['82', '72', '62'], ans: [1, 2, 0] },
      // Tứ giác: hình vuông, hình thang, hình chữ nhật, tứ giác lệch (4). Nhiễu: chỉ đếm hình vuông và hình chữ nhật (2),
      // bỏ sót tứ giác lệch (3), đếm cả hình (6).
      { type: 'mc', bai: 26, point: 2, level: 2,
        prompt: 'Trong hình dưới đây có bao nhiêu hình tứ giác?',
        fig: polys([
          { pts: [[10, 20], [60, 20], [60, 70], [10, 70]], color: '#bfdbfe' },
          { pts: [[80, 70], [105, 20], [130, 70]], color: '#fde68a' },
          { pts: [[150, 70], [165, 25], [205, 25], [220, 70]], color: '#bbf7d0' },
          { pts: [[240, 30], [300, 30], [300, 70], [240, 70]], color: '#fecaca' },
          { pts: [[320, 20], [370, 70], [320, 70]], color: '#fde68a' },
          { pts: [[390, 35], [430, 15], [450, 65], [400, 75]], color: '#e9d5ff' },
        ], { w: 460, h: 90, width: 320 }),
        options: ['4', '2', '3', '6'], ans: 0 },
      // 50 − 18 = 32. Nhiễu: làm phép cộng (68 quả), không trả nhớ (42 quả), lấy 8 − 0 ở hàng đơn vị (48 quả).
      { type: 'mc', bai: [9, 23], point: 1, level: 2,
        prompt: 'Cửa hàng có 50 quả bóng, đã bán 18 quả. Cửa hàng còn lại:',
        options: ['32 quả', '68 quả', '42 quả', '48 quả'], ans: 0 },
      // Xô 10 l, can 5 l, chai 2 l: 10 − 5 = 5, 5 + 2 = 7, 10 − 2 = 8 (không phải 12), 5 + 5 = 10.
      { type: 'tf', bai: [4, 16], point: 2, level: 3,
        prompt: 'Nhìn hình rồi đúng ghi Đ, sai ghi S:',
        fig: vessels([{ kind: 'xo', l: 10 }, { kind: 'can', l: 5 }, { kind: 'chai', l: 2 }]),
        items: ['Xô đựng nhiều hơn can 5 l.', 'Can và chai đựng tất cả 7 l.', 'Chai đựng ít hơn xô 12 l.', 'Hai can như thế đựng được bằng một xô.'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // 18 − 4 = 14 ngày là đúng 2 tuần, nên ngày 18 cũng là Thứ Sáu. Nhiễu: đếm lệch một ngày.
      { type: 'mc', bai: 30, point: 2, level: 3,
        prompt: 'Thứ Sáu tuần này là ngày 4. Ngày 18 của tháng đó là thứ mấy?',
        options: ['Thứ Sáu', 'Thứ Bảy', 'Thứ Năm', 'Chủ nhật'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [20, 23], point: 1, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['39 + 45', '26 + 54', '73 − 28', '90 − 36'] },
      { type: 'compare', bai: [1, 8, 12, 19], point: 2, level: 2,
        prompt: 'Điền dấu >, <, = thích hợp:',
        items: ['58 □ 85', '9 + 8 □ 16', '15 − 6 □ 9', '38 + 7 □ 46'] },
      {
        type: 'word', bai: [4, 23], point: 0, level: 3,
        text: 'Đàn gà có 64 con, đàn vịt có 27 con. Hỏi đàn gà nhiều hơn đàn vịt bao nhiêu con?',
        given: ['Đàn gà có 64 con.', 'Đàn vịt có 27 con.'],
        ask: 'Đàn gà nhiều hơn đàn vịt bao nhiêu con?',
        hint: 'Muốn biết nhiều hơn bao nhiêu thì lấy số lớn trừ số bé: 64 trừ 27.',
        sentence: ['Đàn gà', 'nhiều hơn đàn vịt', 'số con', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 64, op: '−', b: 27, result: 37, unit: 'con' },
        units: ['con', 'đàn', 'kg'],
      },
      // Hộp + 1 kg nặng bằng 5 kg + 5 kg + 2 kg = 12 kg, nên hộp nặng 12 − 1 = 11 kg.
      { type: 'fill', bai: 15, point: 2, level: 3,
        prompt: 'Cân thăng bằng. Thùng hàng nặng bao nhiêu ki-lô-gam?',
        fig: balance([{ kind: 'hop', label: 'thùng hàng' }, 1], [5, 5, 2]),
        items: [{ t: 'Thùng hàng nặng … kg.', ans: 11 }] },
    ] },
  ],
};
