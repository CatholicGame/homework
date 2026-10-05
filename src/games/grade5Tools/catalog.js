/**
 * Toán 5 Tập Một (SGK Kết nối tri thức): 6 chủ đề, Bài 1–35 → công cụ dùng để học bài đó.
 * Nguồn duy nhất cho danh sách bài; nội dung Khám phá / Thực hành nằm trong lessons/*.js.
 * Thiết kế và tổng hợp kiến thức: docs/lop_5/thiet-ke-cong-cu-tap1.md.
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
};

const T = (num, title, sub, lessons) => ({ num, title, sub, lessons });
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
];

/** Trang đầu của Bài 1–35 trong SGK (mục lục trang 4–5); Bài 35 hết ở trang 138. PDF: trang sách + 1. */
const START = [6, 9, 11, 14, 16, 20, 23, 26, 29, 32, 38, 42, 47, 51, 53, 56, 60, 62, 65, 68, 71, 76, 83, 88, 91, 98, 105, 113, 116, 120, 123, 127, 130, 133, 135, 139];

export const LESSONS = TOPICS.flatMap(t => t.lessons.map(l => ({ ...l, topic: t.num, pages: [START[l.n - 1], Math.max(START[l.n - 1], START[l.n] - 1)] })));
export const lessonByN = (n) => LESSONS.find(l => l.n === n);

/** "trang 32–37" / "trang 12". */
export const pagesText = (l) => `trang ${l.pages[0]}${l.pages[1] > l.pages[0] ? `–${l.pages[1]}` : ''}`;
