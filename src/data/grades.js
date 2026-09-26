/**
 * Danh sách lớp (Tiền tiểu học, lớp 1–5) và các sách/trò chơi của từng lớp.
 * Bé chọn lớp trong hồ sơ; trang chủ chỉ hiện card của lớp đó.
 */

// Mã lớp của Tiền tiểu học. Không dùng 0: 0 / thiếu nghĩa là "chưa chọn lớp" (hồ sơ, bảng xếp hạng,
// firestore.rules). Mã này phải khớp với firestore.rules và BOOK_GRADE trong engine/stars.js.
export const PRESCHOOL = -1;

export const GRADES = [
  {
    num: PRESCHOOL, title: 'Tiền tiểu học', short: '🧸', sub: 'Tiền TH', icon: '🧸', color: '#EC4899',
    games: [
      { id: 'pre1-math', icon: '🐰', color: '#EC4899', title: 'Bé Học Vui Toán — Tập 1', desc: 'Đếm và viết số 1–20' },
      { id: 'pre2-math', icon: '🐊', color: '#7C3AED', title: 'Bé Học Vui Toán — Tập 2', desc: 'So sánh: bằng nhau, nhiều hơn – ít hơn, dấu > < =' },
      { id: 'pre4-math', icon: '🧮', color: '#F59E0B', title: 'Bé Tập Làm Toán', desc: '99 đề toán chuẩn bị vào lớp 1: cộng trừ, số đến 100, hình, quy luật, giờ, tiền' },
      { id: 'pre3-abc', icon: '🔤', color: '#0EA5E9', title: 'Làm quen chữ cái', desc: 'Tô chữ cái, chữ ghép, dấu thanh' },
    ],
  },
  { num: 1, title: 'Lớp 1', icon: '1️⃣', color: '#FF6B9D', games: [] },
  {
    num: 2, title: 'Lớp 2', icon: '2️⃣', color: '#60A5FA',
    games: [
      { id: 'grade2-workbook', icon: '📒', color: '#0EA5E9', title: 'Vở Bài Tập Toán 2 — Tập Một', desc: 'Bài 1–36 — Kết nối tri thức với cuộc sống' },
      { id: 'grade2-workbook-2', icon: '📙', color: '#F59E0B', title: 'Vở Bài Tập Toán 2 — Tập Hai', desc: 'Bài 37–75 — Kết nối tri thức với cuộc sống' },
    ],
  },
  {
    num: 3, title: 'Lớp 3', icon: '3️⃣', color: '#34D399',
    games: [
      { id: 'grade3-workbook', icon: '📗', color: '#10B981', title: 'Vở Bài Tập Toán 3', desc: 'Tập Một — Kết nối tri thức với cuộc sống' },
      { id: 'grade3-practice', icon: '📘', color: '#3B82F6', title: 'Luyện Tập Toán 3', desc: 'Tập Một — Luyện tập theo tuần (Kết nối tri thức)' },
      { id: 'grade3-exam', icon: '📝', color: '#F97316', title: 'Ôn Luyện Đề', desc: 'Đề 1 — Bộ đề ôn luyện VioEdu khối 3' },
    ],
  },
  { num: 4, title: 'Lớp 4', icon: '4️⃣', color: '#C084FC', games: [] },
  { num: 5, title: 'Lớp 5', icon: '5️⃣', color: '#FBBF24', games: [] },
];

export function getGrade(num) {
  return GRADES.find(g => g.num === num) || null;
}

/** Tên lớp để hiển thị: "Lớp 3", "Tiền tiểu học"; `fallback` khi chưa chọn lớp. */
export function gradeTitle(num, fallback = '') {
  return getGrade(num)?.title || (num ? `Lớp ${num}` : fallback);
}
