/** Kiểm tra cuối học kì I (Đề 5): Bài 1–36 Vở BT Toán 2 (Nhanh 1 đến 8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { calendar, clock } from './art.js';

// Hình phẳng nhỏ: dùng cho phương án và dãy hình theo quy luật.
const INK = '#1f2937';
const SHAPE = {
  tri: (x, y, s, c = '#fde68a') => `<path d="M${x} ${y - s / 2} L${x + s / 2} ${y + s / 2} L${x - s / 2} ${y + s / 2} Z" fill="${c}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`,
  sq: (x, y, s, c = '#bfdbfe') => `<rect x="${x - s / 2}" y="${y - s / 2}" width="${s}" height="${s}" fill="${c}" stroke="${INK}" stroke-width="2.2"/>`,
  ci: (x, y, s, c = '#fecaca') => `<circle cx="${x}" cy="${y}" r="${s / 2}" fill="${c}" stroke="${INK}" stroke-width="2.2"/>`,
  quad: (x, y, s, c = '#bbf7d0') => `<path d="M${x - s / 2} ${y + s / 2} L${x - s / 4} ${y - s / 2} L${x + s / 2} ${y - s / 3} L${x + s / 3} ${y + s / 2} Z" fill="${c}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`,
  pent: (x, y, s, c = '#e9d5ff') => `<path d="${[0, 1, 2, 3, 4].map(k => { const a = (k * 72 - 90) * Math.PI / 180; return `${k ? 'L' : 'M'}${(x + s / 2 * Math.cos(a)).toFixed(1)} ${(y + s / 2 * Math.sin(a)).toFixed(1)}`; }).join(' ')} Z" fill="${c}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`,
};
const one = (k) => `<svg viewBox="0 0 80 80" width="80" xmlns="http://www.w3.org/2000/svg">${SHAPE[k](40, 40, 56)}</svg>`;
// Dãy hình: tròn, tam giác, vuông, tròn, tam giác, vuông, tròn, tam giác, ô "?".
const PATTERN = ['ci', 'tri', 'sq', 'ci', 'tri', 'sq', 'ci', 'tri'];
const patternFig = `<svg viewBox="0 0 ${PATTERN.length * 46 + 50} 56" width="320" xmlns="http://www.w3.org/2000/svg">${PATTERN.map((k, i) => SHAPE[k](26 + i * 46, 28, 34)).join('')}<rect x="${PATTERN.length * 46 + 6}" y="8" width="40" height="40" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.8" stroke-dasharray="4 3"/><text x="${PATTERN.length * 46 + 26}" y="35" font-size="20" font-weight="700" fill="#92400e" text-anchor="middle">?</text></svg>`;

export default {
  id: 'l2-ck-1e',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 5)',
  short: 'Cuối kì I · Đề 5',
  after: { book: 'workbook2', units: '1-36' },
  desc: 'Hình tứ giác, hình theo quy luật, vẽ đoạn thẳng; giờ buổi chiều, tờ lịch; cộng, trừ có nhớ; số đến 100; bảng cộng, bảng trừ; ki-lô-gam, lít',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: hình tam giác (3 cạnh), hình tròn, hình 5 cạnh.
      { type: 'mc', bai: 26, point: 2, level: 1,
        prompt: 'Hình nào có 4 cạnh và 4 đỉnh?',
        options: [one('tri'), one('quad'), one('ci'), one('pent')], ans: 1 },
      // Nhiễu: lấy số hạng với tổng (40 và 65, 25 và 65), chỉ lấy tổng (65).
      { type: 'mc', bai: 3, point: 0, level: 1,
        prompt: 'Trong phép cộng 40 + 25 = 65, các số hạng là:',
        options: ['40 và 25', '40 và 65', '25 và 65', '65'], ans: 0 },
      { type: 'pick', bai: 12, point: 0, level: 1,
        prompt: 'Có 18 ngôi sao, Hà đã tô màu 9 ngôi sao. Khoanh vào số ngôi sao chưa tô màu:',
        icon: 'star', count: 18, cols: 6, ans: 9 },
      // Nhiễu: đọc chữ số 6 thành giờ (6 giờ chiều), không đổi buổi (4 giờ sáng), lấy chữ số 1 (1 giờ chiều).
      { type: 'mc', bai: 29, point: 1, level: 1,
        prompt: '16 giờ còn gọi là:',
        options: ['4 giờ chiều', '6 giờ chiều', '4 giờ sáng', '1 giờ chiều'], ans: 0 },
      // Ý sai: quên trả nhớ ở hàng chục (70 − 26 = 54, 62 − 17 = 55).
      { type: 'tf', bai: [20, 23], point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['45 + 38 = 83', '70 − 26 = 54', '27 + 27 = 54', '62 − 17 = 55'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: làm phép cộng (24 l), viết sai đơn vị (12 kg), quên viết đơn vị (12).
      { type: 'mc', bai: 16, point: 2, level: 1,
        prompt: '18 l − 6 l = ?',
        options: ['12 l', '24 l', '12 kg', '12'], ans: 0 },
      { type: 'match', bai: [1, 2], point: 0, level: 1,
        prompt: 'Nối mỗi dòng với số đúng:',
        left: ['Số gồm 8 chục và 5 đơn vị', 'Số liền sau của 49', 'Số bé nhất có hai chữ số', 'Số liền trước của 100'],
        right: ['10', '85', '99', '50'], ans: [1, 3, 0, 2] },
      // Nhiễu: lấy 5 − 1 ở hàng đơn vị (64), làm phép cộng (66), trả nhớ hai lần (46).
      { type: 'mc', bai: 22, point: 2, level: 1,
        prompt: 'Kết quả của phép tính 61 − 5 là:',
        options: ['56', '64', '66', '46'], ans: 0 },
      // Ý sai: đổi vai kim ngắn, kim dài; đọc số 3 ở kim dài là 3 phút.
      { type: 'tf', bai: 29, point: 2, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['1 giờ = 60 phút.', 'Kim ngắn chỉ phút, kim dài chỉ giờ.', 'Kim dài chỉ số 6 là 30 phút.', 'Kim dài chỉ số 3 là 3 phút.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Tháng 10 năm 2026: ngày 1 là Thứ Năm, ngày 15 cũng là Thứ Năm. Nhiễu: đọc nhầm cột bên cạnh (Thứ Sáu, Thứ Tư), cột đỏ.
      { type: 'mc', bai: 30, point: 0, level: 1,
        prompt: 'Xem tờ lịch. Ngày 15 tháng 10 (khoanh đỏ) là thứ mấy?',
        fig: calendar({ month: 10, first: 3, days: 31, mark: [15] }),
        options: ['Thứ Năm', 'Thứ Sáu', 'Thứ Tư', 'Chủ nhật'], ans: 0 },
      // Quy luật lặp: tròn, tam giác, vuông. Sau tam giác là hình vuông.
      { type: 'mc', bai: 27, point: 2, level: 2,
        prompt: 'Các hình được xếp theo quy luật. Hình thích hợp ở ô có dấu ? là:',
        fig: patternFig,
        options: [one('ci'), one('tri'), one('sq')], ans: 2 },
      { type: 'match', bai: 29, point: 2, level: 2,
        prompt: 'Nối đồng hồ với giờ đúng:',
        left: [clock(7, 15, { size: 110 }), clock(2, 30, { size: 110 }), clock(11, 0, { size: 110 })],
        right: ['11 giờ', '7 giờ 15 phút', '2 giờ 30 phút'], ans: [1, 2, 0] },
      // Số bị trừ = hiệu + số trừ = 45 + 27 = 72. Nhiễu: lấy hiệu trừ số trừ (18), quên nhớ (62).
      { type: 'mc', bai: [3, 20], point: 2, level: 2,
        prompt: 'Trong một phép trừ, số trừ là 27, hiệu là 45. Số bị trừ là:',
        options: ['72', '18', '62'], ans: 0 },
      // 22 − 7 − 7 = 8. Nhiễu: lùi một tuần (15), cộng thêm một tuần (29), lùi ba tuần (1).
      { type: 'mc', bai: 30, point: 2, level: 3,
        prompt: 'Thứ Năm tuần này là ngày 22. Thứ Năm cách đây 2 tuần là ngày:',
        options: ['8', '15', '29', '1'], ans: 0 },
      // 2B: 34 + 2 = 36 bạn; 2C: 36 − 5 = 31 bạn; lớp 2B đông nhất.
      { type: 'tf', bai: 13, point: 0, level: 3,
        prompt: 'Lớp 2A có 34 bạn. Lớp 2B nhiều hơn lớp 2A 2 bạn. Lớp 2C ít hơn lớp 2B 5 bạn. Đúng ghi Đ, sai ghi S:',
        items: ['Lớp 2B có 36 bạn.', 'Lớp 2C có 31 bạn.', 'Lớp 2C có nhiều bạn nhất.'],
        ans: ['Đ', 'Đ', 'S'] },
      // 7 − 4 = 3. Nhiễu: cộng hai túi (11 kg), lấy số kg của một túi (4 kg, 7 kg).
      { type: 'mc', bai: [4, 15], point: 0, level: 3,
        prompt: 'Túi cam nặng 4 kg, túi táo nặng 7 kg. Cần cho thêm vào túi cam bao nhiêu ki-lô-gam cam để hai túi nặng bằng nhau?',
        options: ['3 kg', '11 kg', '4 kg', '7 kg'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [19, 20, 22, 23], point: 0, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['38 + 6', '17 + 58', '93 − 5', '74 − 39'] },
      { type: 'fill', bai: [8, 12, 15, 16], point: 0, level: 2,
        prompt: 'Số?',
        items: [
          '□ + 8 = 17',
          '14 − □ = 6',
          { t: '13 kg − … kg = 7 kg', ans: 6 },
          { t: '… l + 7 l = 12 l', ans: 5 },
        ] },
      {
        type: 'word', bai: [4, 22], point: 0, level: 2,
        text: 'Nhà Lan nuôi 42 con gà và 7 con ngỗng. Hỏi số con gà nhiều hơn số con ngỗng bao nhiêu con?',
        given: ['Nhà Lan nuôi 42 con gà.', 'Nhà Lan nuôi 7 con ngỗng.'],
        ask: 'Số con gà nhiều hơn số con ngỗng bao nhiêu con?',
        hint: 'Muốn biết nhiều hơn bao nhiêu thì lấy số lớn trừ số bé: 42 trừ 7.',
        sentence: ['Số con gà', 'nhiều hơn', 'số con ngỗng', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 42, op: '−', b: 7, result: 35, unit: 'con' },
        units: ['con', 'kg', 'l'],
      },
      // CD dài hơn AB 3 cm: 6 + 3 = 9 cm.
      { type: 'draw', bai: [13, 27], point: 0, level: 3,
        items: [
          { prompt: 'a) Vẽ đoạn thẳng AB dài 6 cm.', name: 'AB', len: 6 },
          { prompt: 'b) Vẽ đoạn thẳng CD dài hơn đoạn thẳng AB 3 cm.', name: 'CD', len: 9 },
        ] },
    ] },
  ],
};
