/**
 * Toán 5 (SGK Kết nối tri thức): Tập Một chủ đề 1–6 (Bài 1–35), Tập Hai chủ đề 7–12 (Bài 36–75) → công cụ dùng để học bài đó.
 * Nguồn duy nhất cho danh sách bài; nội dung Khám phá / Thực hành nằm trong lessons/*.js.
 * Thiết kế và tổng hợp kiến thức: docs/lop_5/thiet-ke-cong-cu-tap1.md, docs/lop_5/thiet-ke-cong-cu-tap2.md.
 */

/** Công cụ: biểu tượng + tên (hiện trên thẻ bài). */
export const TOOLS = {
  place: { icon: '🧱', name: 'Bảng hàng' },
  column: { icon: '✍️', name: 'Đặt tính' },
  frac: { icon: '🍫', name: 'Băng phân số' },
  grid: { icon: '🟩', name: 'Lưới 100 ô' },
  dplace: { icon: '🧮', name: 'Bảng hàng thập phân' },
  dline: { icon: '📏', name: 'Tia số phóng to' },
  units: { icon: '🪜', name: 'Bảng đơn vị đo' },
  bigarea: { icon: '🗺️', name: 'Bản đồ km², ha' },
  dcol: { icon: '✍️', name: 'Đặt tính số thập phân' },
  shift: { icon: '🔀', name: 'Dịch dấu phẩy' },
  tri: { icon: '🔺', name: 'Cắt ghép tam giác' },
  trap: { icon: '🔷', name: 'Cắt ghép hình thang' },
  circle: { icon: '⭕', name: 'Com-pa và hình tròn' },
  review4: { icon: '🔁', name: 'Công cụ lớp 4: cân, thước đo góc, đồng hồ' },
  // Tập Hai
  ratio: { icon: '🟦', name: 'Sơ đồ phần bằng nhau' },
  pct: { icon: '💯', name: 'Lưới phần trăm' },
  map: { icon: '📍', name: 'Bản đồ tỉ lệ' },
  calc: { icon: '📟', name: 'Máy tính cầm tay' },
  cubes: { icon: '🧊', name: 'Xếp hình lập phương' },
  vunits: { icon: '🪜', name: 'Bảng đơn vị thể tích' },
  net: { icon: '📦', name: 'Hình khai triển' },
  tcol: { icon: '⏱️', name: 'Đặt tính số đo thời gian' },
  move: { icon: '🚗', name: 'Đường chuyển động' },
  stats: { icon: '📋', name: 'Bảng số liệu' },
  pie: { icon: '🥧', name: 'Biểu đồ quạt tròn' },
  chance: { icon: '🎲', name: 'Kiểm đếm' },
};

const T = (num, title, sub, lessons, tap = 1) => ({ num, title, sub, tap, lessons: lessons.map(l => ({ ...l, tap })) });
const L = (n, title, tools, extra = {}) => ({ n, id: `bai-${n}`, title, tools, ...extra });

export const TOPICS = [
  T(1, 'Ôn tập và bổ sung', 'Số tự nhiên, phân số, phân số thập phân, hỗn số', [
    L(1, 'Ôn tập số tự nhiên', ['place']),
    L(2, 'Ôn tập các phép tính với số tự nhiên', ['column']),
    L(3, 'Ôn tập phân số', ['frac']),
    L(4, 'Phân số thập phân', ['grid', 'dline']),
    L(5, 'Ôn tập các phép tính với phân số', ['frac']),
    L(6, 'Cộng, trừ hai phân số khác mẫu số', ['frac']),
    L(7, 'Hỗn số', ['frac']),
    L(8, 'Ôn tập hình học và đo lường', ['review4']),
    L(9, 'Luyện tập chung', [], { mix: [1, 2, 3, 5, 6, 7] }),
  ]),
  T(2, 'Số thập phân', 'Đọc, viết, so sánh, làm tròn số thập phân', [
    L(10, 'Khái niệm số thập phân', ['grid', 'dplace', 'dline']),
    L(11, 'So sánh các số thập phân', ['dplace']),
    L(12, 'Viết số đo đại lượng dưới dạng số thập phân', ['units']),
    L(13, 'Làm tròn số thập phân', ['dline']),
    L(14, 'Luyện tập chung', [], { mix: [10, 11, 12, 13] }),
  ]),
  T(3, 'Một số đơn vị đo diện tích', 'Ki-lô-mét vuông, héc-ta, bảng đơn vị đo diện tích', [
    L(15, 'Ki-lô-mét vuông. Héc-ta', ['bigarea']),
    L(16, 'Các đơn vị đo diện tích', ['units']),
    L(17, 'Thực hành và trải nghiệm với một số đơn vị đo đại lượng', [], { mix: [15, 16] }),
    L(18, 'Luyện tập chung', [], { mix: [15, 16, 12] }),
  ]),
  T(4, 'Các phép tính với số thập phân', 'Cộng, trừ, nhân, chia số thập phân', [
    L(19, 'Phép cộng số thập phân', ['dcol']),
    L(20, 'Phép trừ số thập phân', ['dcol']),
    L(21, 'Phép nhân số thập phân', ['dcol']),
    L(22, 'Phép chia số thập phân', ['dcol']),
    L(23, 'Nhân, chia số thập phân với 10; 100; 1 000;… hoặc với 0,1; 0,01; 0,001;…', ['shift']),
    L(24, 'Luyện tập chung', [], { mix: [19, 20, 21, 22, 23] }),
  ]),
  T(5, 'Một số hình phẳng. Chu vi và diện tích', 'Tam giác, hình thang, hình tròn', [
    L(25, 'Hình tam giác. Diện tích hình tam giác', ['tri']),
    L(26, 'Hình thang. Diện tích hình thang', ['trap']),
    L(27, 'Đường tròn. Chu vi và diện tích hình tròn', ['circle']),
    L(28, 'Thực hành và trải nghiệm đo, vẽ, lắp ghép, tạo hình', [], { mix: [25, 26, 27] }),
    L(29, 'Luyện tập chung', [], { mix: [25, 26, 27] }),
  ]),
  T(6, 'Ôn tập học kì 1', 'Ôn số thập phân, phép tính, hình phẳng, đo lường', [
    L(30, 'Ôn tập số thập phân', [], { mix: [10, 11, 13] }),
    L(31, 'Ôn tập các phép tính với số thập phân', [], { mix: [19, 20, 21, 22, 23] }),
    L(32, 'Ôn tập một số hình phẳng', [], { mix: [25, 26, 27] }),
    L(33, 'Ôn tập diện tích, chu vi một số hình phẳng', [], { mix: [25, 26, 27] }),
    L(34, 'Ôn tập đo lường', [], { mix: [12, 15, 16, 23] }),
    L(35, 'Ôn tập chung', [], { mix: [6, 7, 11, 13, 21, 22, 25, 27] }),
  ]),
  // ── Tập Hai ──────────────────────────────────────────────────────────────
  T(7, 'Tỉ số và các bài toán liên quan', 'Tỉ số, tỉ số phần trăm, tỉ lệ bản đồ, tổng tỉ, hiệu tỉ, máy tính cầm tay', [
    L(36, 'Tỉ số. Tỉ số phần trăm', ['ratio', 'pct']),
    L(37, 'Tỉ lệ bản đồ và ứng dụng', ['map']),
    L(38, 'Tìm hai số khi biết tổng và tỉ số của hai số đó', ['ratio']),
    L(39, 'Tìm hai số khi biết hiệu và tỉ số của hai số đó', ['ratio']),
    L(40, 'Tìm tỉ số phần trăm của hai số', ['pct']),
    L(41, 'Tìm giá trị phần trăm của một số', ['pct']),
    L(42, 'Máy tính cầm tay', ['calc']),
    L(43, 'Thực hành và trải nghiệm sử dụng máy tính cầm tay', [], { mix: [42, 40, 41] }),
    L(44, 'Luyện tập chung', [], { mix: [36, 37, 38, 39, 40, 41] }),
  ], 2),
  T(8, 'Thể tích. Đơn vị đo thể tích', 'Thể tích một hình, cm³, dm³, m³', [
    L(45, 'Thể tích của một hình', ['cubes']),
    L(46, 'Xăng-ti-mét khối. Đề-xi-mét khối', ['cubes', 'vunits']),
    L(47, 'Mét khối', ['cubes', 'vunits']),
    L(48, 'Luyện tập chung', [], { mix: [45, 46, 47] }),
  ], 2),
  T(9, 'Diện tích và thể tích của một số hình khối', 'Hình khai triển, diện tích xung quanh, toàn phần, thể tích', [
    L(49, 'Hình khai triển của hình lập phương, hình hộp chữ nhật và hình trụ', ['net']),
    L(50, 'Diện tích xung quanh và diện tích toàn phần của hình hộp chữ nhật', ['net']),
    L(51, 'Diện tích xung quanh và diện tích toàn phần của hình lập phương', ['net']),
    L(52, 'Thể tích của hình hộp chữ nhật', ['cubes']),
    L(53, 'Thể tích của hình lập phương', ['cubes']),
    L(54, 'Thực hành tính toán và ước lượng thể tích một số hình khối', [], { mix: [52, 53, 46, 47] }),
    L(55, 'Luyện tập chung', [], { mix: [49, 50, 51, 52, 53] }),
  ], 2),
  T(10, 'Số đo thời gian, vận tốc. Chuyển động đều', 'Đơn vị đo thời gian, cộng trừ nhân chia số đo thời gian, vận tốc, quãng đường, thời gian', [
    L(56, 'Các đơn vị đo thời gian', ['tcol']),
    L(57, 'Cộng, trừ số đo thời gian', ['tcol']),
    L(58, 'Nhân, chia số đo thời gian với một số', ['tcol']),
    L(59, 'Vận tốc của một chuyển động đều', ['move']),
    L(60, 'Quãng đường, thời gian của một chuyển động đều', ['move']),
    L(61, 'Thực hành tính toán và ước lượng về vận tốc, quãng đường, thời gian trong chuyển động đều', [], { mix: [59, 60] }),
    L(62, 'Luyện tập chung', [], { mix: [56, 57, 58, 59, 60] }),
  ], 2),
  T(11, 'Một số yếu tố thống kê và xác suất', 'Số liệu, biểu đồ hình quạt tròn, tỉ số số lần lặp lại', [
    L(63, 'Thu thập, phân loại, sắp xếp các số liệu', ['stats']),
    L(64, 'Biểu đồ hình quạt tròn', ['pie']),
    L(65, 'Tỉ số của số lần lặp lại một sự kiện so với tổng số lần thực hiện', ['chance']),
    L(66, 'Thực hành và trải nghiệm thu thập, phân tích, biểu diễn các số liệu thống kê', [], { mix: [63, 64, 65] }),
    L(67, 'Luyện tập chung', [], { mix: [63, 64, 65] }),
  ], 2),
  T(12, 'Ôn tập cuối năm', 'Ôn số, phép tính, tỉ số, hình học, đo lường, chuyển động, thống kê', [
    L(68, 'Ôn tập số tự nhiên, phân số, số thập phân', [], { mix: [1, 3, 4, 7, 10, 11, 13] }),
    L(69, 'Ôn tập các phép tính với số tự nhiên, phân số, số thập phân', [], { mix: [2, 5, 6, 19, 20, 21, 22, 23] }),
    L(70, 'Ôn tập tỉ số, tỉ số phần trăm', [], { mix: [36, 38, 39, 40, 41] }),
    L(71, 'Ôn tập hình học', [], { mix: [25, 26, 27, 50, 51, 52, 53] }),
    L(72, 'Ôn tập đo lường', [], { mix: [12, 16, 46, 47, 56, 57, 58] }),
    L(73, 'Ôn tập toán chuyển động đều', [], { mix: [59, 60] }),
    L(74, 'Ôn tập một số yếu tố thống kê và xác suất', [], { mix: [63, 64, 65] }),
    L(75, 'Ôn tập chung', [], { mix: [11, 22, 36, 41, 52, 57, 60, 64] }),
  ], 2),
];

/** Trang đầu của Bài 1–35 trong SGK (mục lục trang 4–5); Bài 35 hết ở trang 138. PDF: trang sách + 1. */
const START = [6, 9, 11, 14, 16, 20, 23, 26, 29, 32, 38, 42, 47, 51, 53, 56, 60, 62, 65, 68, 71, 76, 83, 88, 91, 98, 105, 113, 116, 120, 123, 127, 130, 133, 135, 139];

/** Trang đầu của Bài 36–75 trong SGK Tập Hai (mục lục trang 2–3); Bài 75 hết ở trang 134. PDF: trang sách + 1. */
const START2 = [4, 8, 12, 15, 18, 21, 23, 27, 28, 30, 33, 35, 38, 40, 44, 48, 51, 54, 58, 60, 64, 67, 71, 76, 78, 82, 84, 87, 90, 94, 96, 100, 103, 107, 111, 113, 119, 121, 123, 128, 135];
const pagesOf = (n) => {
  const [arr, i] = n <= 35 ? [START, n - 1] : [START2, n - 36];
  return [arr[i], Math.max(arr[i], arr[i + 1] - 1)];
};

export const LESSONS = TOPICS.flatMap(t => t.lessons.map(l => ({ ...l, topic: t.num, pages: pagesOf(l.n) })));
export const lessonByN = (n) => LESSONS.find(l => l.n === n);

/** "Tập Một" / "Tập Hai" của bài. */
export const tapName = (l) => (l?.tap === 2 ? 'Tập Hai' : 'Tập Một');

/** "trang 32–37" / "trang 12". */
export const pagesText = (l) => `trang ${l.pages[0]}${l.pages[1] > l.pages[0] ? `–${l.pages[1]}` : ''}`;
