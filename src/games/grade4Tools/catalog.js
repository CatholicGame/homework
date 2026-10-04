/**
 * Toán 4 Tập Một (SGK Kết nối tri thức): 7 chủ đề, Bài 1–37 → công cụ dùng để học bài đó.
 * Nguồn duy nhất cho danh sách bài; nội dung Khám phá / Thực hành nằm trong lessons.js.
 * Thiết kế: docs/lop_4/thiet-ke-cong-cu-tap1.md.
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
};

const T = (num, title, sub, lessons) => ({ num, title, sub, lessons });
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
];

/** Trang đầu của Bài 1–37 trong SGK (mục lục trang 4–5); Bài 37 hết ở trang 130. */
const START = [6, 9, 12, 14, 19, 21, 23, 26, 31, 33, 37, 41, 45, 47, 50, 52, 56, 60, 66, 69, 73, 76, 79, 82, 86, 88, 91, 94, 98, 101, 105, 110, 114, 118, 121, 125, 127, 131];

export const LESSONS = TOPICS.flatMap(t => t.lessons.map(l => ({ ...l, topic: t.num, pages: [START[l.n - 1], Math.max(START[l.n - 1], START[l.n] - 1)] })));
export const lessonByN = (n) => LESSONS.find(l => l.n === n);

/** "trang 33–36" / "trang 12". */
export const pagesText = (l) => `trang ${l.pages[0]}${l.pages[1] > l.pages[0] ? `–${l.pages[1]}` : ''}`;
