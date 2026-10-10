/** Kiểm tra cuối học kì I (Đề 3): Bài 1–36 Vở BT Toán 2 (Nhanh 1 đến 8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { ruler, pourCups, clock, balance } from './art.js';

// Dãy hình theo quy luật: tam giác, vuông, vuông lặp lại; ô cuối là dấu ?.
const PAT = ['tri', 'sq', 'sq', 'tri', 'sq', 'sq', 'tri'];
const patShape = (k, x) => k === 'tri'
  ? `<path d="M${x} 10 L${x + 18} 44 L${x - 18} 44 Z" fill="#fde68a" stroke="#1f2937" stroke-width="2.2" stroke-linejoin="round"/>`
  : `<rect x="${x - 17}" y="10" width="34" height="34" fill="#bfdbfe" stroke="#1f2937" stroke-width="2.2"/>`;
const PATTERN_FIG = `<svg viewBox="0 0 ${PAT.length * 46 + 50} 56" width="320" xmlns="http://www.w3.org/2000/svg">${PAT.map((k, i) => patShape(k, 26 + i * 46)).join('')}<rect x="${PAT.length * 46 + 6}" y="8" width="40" height="40" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.8" stroke-dasharray="4 3"/><text x="${PAT.length * 46 + 26}" y="35" font-size="20" font-weight="700" fill="#92400e" text-anchor="middle">?</text></svg>`;

export default {
  id: 'l2-ck-1c',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 3)',
  short: 'Cuối kì I · Đề 3',
  after: { book: 'workbook2', units: '1-36' },
  desc: 'Ngày, giờ, xem đồng hồ; trừ có nhớ; đo đoạn thẳng; lít; bài toán ít hơn, thêm; số bị trừ, số trừ, hiệu; hơn kém nhau bao nhiêu',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: chỉ tính nửa ngày (12 giờ), nhầm với số phút của một giờ (60 giờ), nhầm với số ngày của tuần (7 giờ).
      { type: 'mc', bai: 29, point: 0, level: 1,
        prompt: 'Một ngày có bao nhiêu giờ?',
        options: ['24 giờ', '12 giờ', '60 giờ', '7 giờ'], ans: 0 },
      // Nhiễu: số liền sau (61), bớt 1 chục (50), viết sai chữ số hàng chục (69).
      { type: 'mc', bai: 2, point: 2, level: 1,
        prompt: 'Số liền trước của 60 là:',
        options: ['59', '61', '50', '69'], ans: 0 },
      { type: 'pick', bai: 12, point: 0, level: 1,
        prompt: 'Khoanh vào số ngôi sao bằng kết quả của phép tính 12 − 5:',
        icon: 'star', count: 12, cols: 6, ans: 7 },
      // Nhiễu: lấy 8 − 3 rồi không mượn (55), mượn rồi trừ thêm 1 chục nữa (35), làm phép cộng (61).
      { type: 'mc', bai: 22, point: 1, level: 1,
        prompt: 'Kết quả của phép tính 53 − 8 là:',
        options: ['45', '55', '35', '61'], ans: 0 },
      // Ý sai: đọc vạch cuối (7) làm độ dài khi đoạn thẳng không bắt đầu ở vạch 0.
      { type: 'tf', bai: 25, point: 1, level: 1,
        prompt: 'Đặt thước đo đoạn thẳng MN như hình. Đúng ghi Đ, sai ghi S:',
        fig: ruler(6, { from: 1, cm: 10, name: 'MN' }),
        items: ['Điểm M ở vạch 1.', 'Đoạn thẳng MN dài 7 cm.', 'Đoạn thẳng MN dài 6 cm.'],
        ans: ['Đ', 'S', 'Đ'] },
      // Nhiễu: quên nhớ 1 sang hàng chục (73), viết cả 13 xuống (713), cộng nhầm hàng đơn vị (82).
      { type: 'mc', bai: 20, point: 2, level: 1,
        prompt: 'Kết quả của phép tính 36 + 47 là:',
        options: ['83', '73', '713', '82'], ans: 0 },
      // Ý sai: 6 + 8 bằng 14, không phải 15.
      { type: 'tf', bai: [7, 8], point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['7 + 9 = 9 + 7', '8 + 6 = 14', '6 + 8 = 15', '9 + 4 = 4 + 9'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // Nhiễu: chỉ đếm 1 ca (1 l), đếm thêm cả xô (6 l), đếm thiếu một ca (4 l).
      { type: 'mc', bai: 16, point: 1, level: 1,
        prompt: 'Rót hết nước trong xô sang các ca 1 l thì được đầy 5 ca như hình. Xô có bao nhiêu lít nước?',
        fig: pourCups({ kind: 'xo', l: 5, label: false }, 5),
        options: ['5 l', '1 l', '6 l', '4 l'], ans: 0 },
      { type: 'match', bai: 29, point: 2, level: 1,
        prompt: 'Nối đồng hồ với giờ đúng:',
        left: [clock(3, 0, { size: 96 }), clock(6, 30, { size: 96 }), clock(10, 15, { size: 96 })],
        right: ['10 giờ 15 phút', '3 giờ', '6 giờ 30 phút'], ans: [1, 2, 0] },
      // Đĩa trái thấp hơn nên quả cam nặng hơn. Nhiễu: nhầm đĩa cao hơn là nặng hơn, nghĩ hai quả nặng bằng nhau.
      { type: 'mc', bai: 15, point: 0, level: 1,
        prompt: 'Nhìn cân đĩa. Câu nào đúng?',
        fig: balance([{ kind: 'cam', label: 'quả cam' }], [{ kind: 'chuoi', label: 'quả chuối' }], { tilt: 'left' }),
        options: ['Quả cam nặng hơn quả chuối.', 'Quả chuối nặng hơn quả cam.', 'Quả cam nặng bằng quả chuối.'], ans: 0 },
      // Nhiễu: thấy "ít hơn" mà cộng (73 tuổi), lấy số tuổi ít hơn (5 tuổi), trừ nhầm 1 chục (58 tuổi).
      { type: 'mc', bai: 13, point: 1, level: 2,
        prompt: 'Năm nay ông 68 tuổi. Bà ít hơn ông 5 tuổi. Năm nay bà bao nhiêu tuổi?',
        options: ['63 tuổi', '73 tuổi', '5 tuổi', '58 tuổi'], ans: 0 },
      // Ý sai: 50 − 7 = 43; viết 47 là lấy 7 − 0 ở hàng đơn vị.
      { type: 'tf', bai: 22, point: 1, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: [{ col: '42 − 6', res: '36' }, { col: '50 − 7', res: '47' }, { col: '81 − 9', res: '72' }],
        ans: ['Đ', 'S', 'Đ'] },
      // Lặp lại nhóm: tam giác, vuông, vuông. Sau tam giác là hình vuông.
      { type: 'mc', bai: 27, point: 2, level: 2,
        prompt: 'Các hình được xếp theo quy luật. Hình thích hợp ở ô có dấu ? là:',
        fig: PATTERN_FIG,
        options: ['Hình vuông', 'Hình tam giác', 'Hình tròn'], ans: 0 },
      // 6 + 7 + 7 = 20. Nhiễu: chỉ cộng một tuần (13), cộng 2 ngày (8), giữ ngày nhưng đổi thứ (Thứ Hai ngày 20).
      { type: 'mc', bai: 30, point: 2, level: 3,
        prompt: 'Hôm nay là Chủ nhật ngày 6. Sau đúng 2 tuần nữa là:',
        options: ['Chủ nhật ngày 20', 'Chủ nhật ngày 13', 'Thứ Hai ngày 20', 'Chủ nhật ngày 8'], ans: 0 },
      // 35 − 8 = 27; 27 + 5 = 32; 32 bé hơn 35.
      { type: 'tf', bai: [16, 22], point: 2, level: 3,
        prompt: 'Can có 35 l nước. Bác Tư rót ra 8 l, sau đó rót thêm vào can 5 l. Đúng ghi Đ, sai ghi S:',
        items: ['Sau khi rót ra, can còn 27 l nước.', 'Sau khi rót thêm, can có 32 l nước.', 'Lúc cuối, can có nhiều nước hơn lúc đầu.'],
        ans: ['Đ', 'Đ', 'S'] },
      // Nam 28 kg, Bình 28 + 5 = 33 kg, Cường 33 − 7 = 26 kg. Nhiễu: chọn bạn có số cho sẵn (Nam), đọc nhầm (Cường).
      { type: 'mc', bai: [13, 19], point: 0, level: 3,
        prompt: 'Nam cân nặng 28 kg. Bình nặng hơn Nam 5 kg. Cường nhẹ hơn Bình 7 kg. Bạn nào nặng nhất?',
        options: ['Bình', 'Nam', 'Cường', 'Ba bạn nặng bằng nhau'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [19, 20, 22, 23], point: 1, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['8 + 56', '29 + 47', '60 − 23', '45 − 9'] },
      { type: 'table', bai: [3, 23], point: 1, level: 2,
        prompt: 'Viết số thích hợp vào ô trống:',
        head: ['Số bị trừ', 'Số trừ', 'Hiệu'],
        rows: [[72, 35, '…'], [90, 46, '…'], [61, 8, '…']],
        ans: [[37], [44], [53]] },
      {
        type: 'word', bai: [9, 19], point: 0, level: 2,
        text: 'Trong vườn có 34 cây cam. Bác Ba trồng thêm 8 cây cam nữa. Hỏi trong vườn có tất cả bao nhiêu cây cam?',
        given: ['Trong vườn có 34 cây cam.', 'Bác Ba trồng thêm 8 cây cam.'],
        ask: 'Trong vườn có tất cả bao nhiêu cây cam?',
        hint: 'Trồng thêm thì số cây nhiều lên: lấy 34 cộng 8.',
        sentence: ['Trong vườn', 'có tất cả', 'số cây cam', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 34, op: '+', b: 8, result: 42, unit: 'cây cam' },
        units: ['cây cam', 'quả cam', 'vườn'],
      },
      // 15 − 8 = 7: An hơn Bình 7 viên, nên Bình cần thêm 7 viên thì bằng An.
      { type: 'fill', bai: [4, 11], point: 0, level: 3,
        prompt: 'An có 15 viên bi, Bình có 8 viên bi. Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: 'An có nhiều hơn Bình … viên bi.', ans: 7 },
          { t: 'Bình cần có thêm … viên bi nữa thì số bi của Bình bằng số bi của An.', ans: 7 },
        ] },
    ] },
  ],
};
