/**
 * Toán 4 (SGK Kết nối tri thức): Tập Một chủ đề 1–7 (Bài 1–37), Tập Hai chủ đề 8–13 (Bài 38–73) → công cụ dùng để học bài đó.
 * Nguồn duy nhất cho danh sách bài; nội dung Khám phá / Thực hành nằm trong lessons.js.
 * Thiết kế: docs/lop_4/thiet-ke-cong-cu-tap1.md, docs/lop_4/thiet-ke-cong-cu-tap2.md.
 */

/** Công cụ: biểu tượng + tên (hiện trên thẻ bài). */
export const TOOLS = {
  place: { icon: '🧱', name: 'Bảng hàng' },
  line: { icon: '📏', name: 'Tia số' },
  column: { icon: '✍️', name: 'Đặt tính' },
  parity: { icon: '🏘️', name: 'Phố chẵn lẻ' },
  expr: { icon: '⚙️', name: 'Máy biểu thức' },
  bars: { icon: '📊', name: 'Sơ đồ đoạn thẳng' },
  angle: { icon: '📐', name: 'Thước đo góc' },
  mass: { icon: '⚖️', name: 'Thang đơn vị' },
  area: { icon: '🔲', name: 'Lưới diện tích' },
  time: { icon: '⏱️', name: 'Giây và thế kỉ' },
  sticks: { icon: '🧩', name: 'Thanh ghép số' },
  square: { icon: '📐', name: 'Ê ke' },
  quad: { icon: '📌', name: 'Bảng ghim' },
  cards: { icon: '🃏', name: 'Thẻ số' },
  // Tập Hai
  division: { icon: '➗', name: 'Chia đặt tính' },
  shift: { icon: '🔟', name: 'Thêm, bớt chữ số 0' },
  estimate: { icon: '🎯', name: 'Ước lượng' },
  avg: { icon: '🧃', name: 'San đều' },
  stats: { icon: '📋', name: 'Dãy số liệu' },
  chart: { icon: '📊', name: 'Biểu đồ cột' },
  chance: { icon: '🎲', name: 'Kiểm đếm' },
  frac: { icon: '🍕', name: 'Phân số' },
};

const T = (num, title, sub, lessons, tap = 1) => ({ num, title, sub, tap, lessons: lessons.map(l => ({ ...l, tap })) });
const L = (n, title, tools, extra = {}) => ({ n, id: `bai-${n}`, title, tools, ...extra });

export const TOPICS = [
  T(1, 'Ôn tập và bổ sung', 'Số đến 100 000, chẵn lẻ, biểu thức chứa chữ', [
    L(1, 'Ôn tập các số đến 100 000', ['place', 'line']),
    L(2, 'Ôn tập các phép tính trong phạm vi 100 000', ['column']),
    L(3, 'Số chẵn, số lẻ', ['parity']),
    L(4, 'Biểu thức chứa chữ', ['expr']),
    L(5, 'Giải bài toán có ba bước tính', ['bars']),
    L(6, 'Luyện tập chung', [], { mix: [1, 2, 3, 4, 5] }),
  ]),
  T(2, 'Góc và đơn vị đo góc', 'Thước đo góc, góc nhọn, góc tù, góc bẹt', [
    L(7, 'Đo góc, đơn vị đo góc', ['angle']),
    L(8, 'Góc nhọn, góc tù, góc bẹt', ['angle']),
    L(9, 'Luyện tập chung', [], { mix: [7, 8] }),
  ]),
  T(3, 'Số có nhiều chữ số', 'Hàng và lớp, lớp triệu, làm tròn, so sánh', [
    L(10, 'Số có sáu chữ số. Số 1 000 000', ['place']),
    L(11, 'Hàng và lớp', ['place']),
    L(12, 'Các số trong phạm vi lớp triệu', ['place']),
    L(13, 'Làm tròn số đến hàng trăm nghìn', ['line']),
    L(14, 'So sánh các số có nhiều chữ số', ['place']),
    L(15, 'Làm quen với dãy số tự nhiên', ['line']),
    L(16, 'Luyện tập chung', [], { mix: [10, 11, 12, 13, 14, 15] }),
  ]),
  T(4, 'Một số đơn vị đo đại lượng', 'Yến, tạ, tấn; dm², m², mm²; giây, thế kỉ', [
    L(17, 'Yến, tạ, tấn', ['mass']),
    L(18, 'Đề-xi-mét vuông, mét vuông, mi-li-mét vuông', ['area']),
    L(19, 'Giây, thế kỉ', ['time']),
    L(20, 'Thực hành và trải nghiệm sử dụng một số đơn vị đo đại lượng', [], { mix: [17, 18, 19] }),
    L(21, 'Luyện tập chung', [], { mix: [17, 18, 19] }),
  ]),
  T(5, 'Phép cộng và phép trừ', 'Cộng trừ số nhiều chữ số, tính chất, tổng và hiệu', [
    L(22, 'Phép cộng các số có nhiều chữ số', ['column']),
    L(23, 'Phép trừ các số có nhiều chữ số', ['column']),
    L(24, 'Tính chất giao hoán và kết hợp của phép cộng', ['sticks', 'expr']),
    L(25, 'Tìm hai số biết tổng và hiệu của hai số đó', ['bars']),
    L(26, 'Luyện tập chung', [], { mix: [22, 23, 24, 25] }),
  ]),
  T(6, 'Đường thẳng vuông góc. Đường thẳng song song', 'Ê ke, vẽ vuông góc, song song, hình bình hành, hình thoi', [
    L(27, 'Hai đường thẳng vuông góc', ['square']),
    L(28, 'Thực hành và trải nghiệm vẽ hai đường thẳng vuông góc', ['square']),
    L(29, 'Hai đường thẳng song song', ['square']),
    L(30, 'Thực hành và trải nghiệm vẽ hai đường thẳng song song', ['square']),
    L(31, 'Hình bình hành, hình thoi', ['quad']),
    L(32, 'Luyện tập chung', [], { mix: [27, 29, 31] }),
  ]),
  T(7, 'Ôn tập học kì 1', 'Ôn số, phép tính, hình học, đo lường', [
    L(33, 'Ôn tập các số đến lớp triệu', [], { mix: [10, 11, 12, 13, 14] }),
    L(34, 'Ôn tập phép cộng, phép trừ', [], { mix: [22, 23, 24, 25] }),
    L(35, 'Ôn tập hình học', [], { mix: [7, 8, 27, 29, 31] }),
    L(36, 'Ôn tập đo lường', [], { mix: [17, 18, 19] }),
    L(37, 'Ôn tập chung', [], { mix: [12, 14, 22, 25, 8, 31, 17, 18] }),
  ]),
  // ── Tập Hai ──────────────────────────────────────────────────────────────
  T(8, 'Phép nhân và phép chia', 'Nhân, chia số nhiều chữ số, tính chất, trung bình cộng, rút về đơn vị', [
    L(38, 'Nhân với số có một chữ số', ['column']),
    L(39, 'Chia cho số có một chữ số', ['division']),
    L(40, 'Tính chất giao hoán và kết hợp của phép nhân', ['expr']),
    L(41, 'Nhân, chia với 10, 100, 1 000,…', ['shift']),
    L(42, 'Tính chất phân phối của phép nhân đối với phép cộng', ['expr']),
    L(43, 'Nhân với số có hai chữ số', ['column']),
    L(44, 'Chia cho số có hai chữ số', ['division']),
    L(45, 'Thực hành và trải nghiệm ước lượng trong tính toán', ['estimate']),
    L(46, 'Tìm số trung bình cộng', ['avg']),
    L(47, 'Bài toán liên quan đến rút về đơn vị', ['bars']),
    L(48, 'Luyện tập chung', [], { mix: [38, 39, 40, 41, 42, 43, 44, 46, 47] }),
  ], 2),
  T(9, 'Làm quen với yếu tố thống kê, xác suất', 'Dãy số liệu, biểu đồ cột, số lần xuất hiện', [
    L(49, 'Dãy số liệu thống kê', ['stats']),
    L(50, 'Biểu đồ cột', ['chart']),
    L(51, 'Số lần xuất hiện của một sự kiện', ['chance']),
    L(52, 'Luyện tập chung', [], { mix: [49, 50, 51] }),
  ], 2),
  T(10, 'Phân số', 'Khái niệm, phép chia, tính chất cơ bản, rút gọn, quy đồng, so sánh', [
    L(53, 'Khái niệm phân số', ['frac']),
    L(54, 'Phân số và phép chia số tự nhiên', ['frac']),
    L(55, 'Tính chất cơ bản của phân số', ['frac']),
    L(56, 'Rút gọn phân số', ['frac']),
    L(57, 'Quy đồng mẫu số các phân số', ['frac']),
    L(58, 'So sánh phân số', ['frac']),
    L(59, 'Luyện tập chung', [], { mix: [53, 54, 55, 56, 57, 58] }),
  ], 2),
  T(11, 'Phép cộng, phép trừ phân số', 'Cộng, trừ phân số cùng mẫu, khác mẫu', [
    L(60, 'Phép cộng phân số', ['frac']),
    L(61, 'Phép trừ phân số', ['frac']),
    L(62, 'Luyện tập chung', [], { mix: [60, 61] }),
  ], 2),
  T(12, 'Phép nhân, phép chia phân số', 'Nhân, chia phân số, tìm phân số của một số', [
    L(63, 'Phép nhân phân số', ['frac']),
    L(64, 'Phép chia phân số', ['frac']),
    L(65, 'Tìm phân số của một số', ['frac']),
    L(66, 'Luyện tập chung', [], { mix: [63, 64, 65] }),
  ], 2),
  T(13, 'Ôn tập cuối năm', 'Ôn số, phép tính, phân số, hình học, đo lường, thống kê', [
    L(67, 'Ôn tập số tự nhiên', [], { mix: [12, 13, 14, 15, 3] }),
    L(68, 'Ôn tập phép tính với số tự nhiên', [], { mix: [22, 23, 38, 39, 43, 44, 42, 46] }),
    L(69, 'Ôn tập phân số', [], { mix: [53, 54, 55, 56, 57, 58] }),
    L(70, 'Ôn tập phép tính với phân số', [], { mix: [60, 61, 63, 64, 65] }),
    L(71, 'Ôn tập hình học và đo lường', [], { mix: [7, 8, 27, 29, 31, 17, 18, 19] }),
    L(72, 'Ôn tập một số yếu tố thống kê và xác suất', [], { mix: [49, 50, 51] }),
    L(73, 'Ôn tập chung', [], { mix: [14, 43, 44, 47, 56, 60, 63, 65, 50, 31] }),
  ], 2),
];

/** Trang đầu của Bài 1–37 trong SGK Tập Một (mục lục trang 4–5); Bài 37 hết ở trang 130. */
const START = [6, 9, 12, 14, 19, 21, 23, 26, 31, 33, 37, 41, 45, 47, 50, 52, 56, 60, 66, 69, 73, 76, 79, 82, 86, 88, 91, 94, 98, 101, 105, 110, 114, 118, 121, 125, 127, 131];
/** Trang đầu của Bài 38–73 trong SGK Tập Hai (mục lục trang 2–3); Bài 73 hết ở trang 118. */
const START2 = [4, 6, 9, 14, 17, 20, 23, 27, 29, 31, 33, 36, 39, 43, 47, 49, 52, 56, 59, 62, 64, 69, 74, 80, 83, 86, 91, 95, 98, 102, 105, 107, 110, 112, 114, 116, 119];
const pagesOf = (n) => {
  const [arr, i] = n <= 37 ? [START, n - 1] : [START2, n - 38];
  return [arr[i], Math.max(arr[i], arr[i + 1] - 1)];
};

export const LESSONS = TOPICS.flatMap(t => t.lessons.map(l => ({ ...l, topic: t.num, pages: pagesOf(l.n) })));
export const lessonByN = (n) => LESSONS.find(l => l.n === n);

/** "Tập Một" / "Tập Hai" của bài. */
export const tapName = (l) => (l?.tap === 2 ? 'Tập Hai' : 'Tập Một');

/** "trang 33–36" / "trang 12". */
export const pagesText = (l) => `trang ${l.pages[0]}${l.pages[1] > l.pages[0] ? `–${l.pages[1]}` : ''}`;
