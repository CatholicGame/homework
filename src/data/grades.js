/**
 * Danh sách lớp 1–5 và các sách/trò chơi của từng lớp.
 * Bé chọn lớp trong hồ sơ; trang chủ chỉ hiện card của lớp đó.
 */

export const GRADES = [
  { num: 1, title: 'Lớp 1', icon: '1️⃣', color: '#FF6B9D', games: [] },
  { num: 2, title: 'Lớp 2', icon: '2️⃣', color: '#60A5FA', games: [] },
  {
    num: 3, title: 'Lớp 3', icon: '3️⃣', color: '#34D399',
    games: [
      { id: 'grade3-exam', icon: '📝', title: 'Ôn Luyện Đề', desc: 'Đề 1 — Bộ đề ôn luyện VioEdu khối 3' },
      { id: 'grade3-workbook', icon: '📗', title: 'Vở Bài Tập Toán 3', desc: 'Tập Một — Kết nối tri thức với cuộc sống' },
      { id: 'grade3-practice', icon: '📘', title: 'Luyện Tập Toán 3', desc: 'Tập Một — Luyện tập theo tuần (Kết nối tri thức)' },
    ],
  },
  { num: 4, title: 'Lớp 4', icon: '4️⃣', color: '#C084FC', games: [] },
  { num: 5, title: 'Lớp 5', icon: '5️⃣', color: '#FBBF24', games: [] },
];

export function getGrade(num) {
  return GRADES.find(g => g.num === num) || null;
}
