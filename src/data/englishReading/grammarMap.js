// 🗺️ Bản đồ ngữ pháp (src/games/englishReading.js showMap): mỗi điểm ngữ pháp của 100 bài thuộc một nhánh.
// Thêm bài mới thì thêm số bài vào đúng một nhánh (scripts/check-english-reading.mjs kiểm đủ 100 bài).
export const BRANCHES = [
  { id: 'basic', icon: '🧱', name: 'Câu cơ bản', note: 'to be, this / these, have got, there is, câu mệnh lệnh', color: '#2563EB', lessons: [1, 2, 3, 4, 7, 12] },
  { id: 'present', icon: '⏰', name: 'Thì hiện tại', note: 'hiện tại đơn, tiếp diễn, hoàn thành', color: '#0891B2', lessons: [15, 17, 18, 21, 22, 25, 26, 61, 62, 63, 72, 85] },
  { id: 'past', icon: '📜', name: 'Thì quá khứ', note: 'was / were, -ed, Did, quá khứ tiếp diễn, hoàn thành', color: '#B45309', lessons: [41, 42, 43, 44, 55, 59, 64, 65, 68, 90, 96] },
  { id: 'future', icon: '🚀', name: 'Tương lai', note: 'going to, will, will be + V-ing', color: '#7C3AED', lessons: [45, 46, 91] },
  { id: 'modal', icon: '🔑', name: 'Động từ khuyết thiếu', note: 'can, must, should, have to, could, may, might', color: '#DB2777', lessons: [9, 30, 49, 50, 54, 71, 73, 77, 87] },
  { id: 'noun', icon: '📦', name: 'Danh từ, đại từ, số lượng', note: 'số nhiều, some / any, my / his, me / him, \'s, mine', color: '#059669', lessons: [5, 6, 13, 19, 27, 28, 33, 34, 40, 57, 70] },
  { id: 'adj', icon: '🎨', name: 'Tính từ, trạng từ, so sánh', note: 'tả người, vật; -er / -est; quickly; too / enough', color: '#EA580C', lessons: [11, 37, 47, 48, 51, 53, 78, 79] },
  { id: 'prep', icon: '📍', name: 'Giới từ', note: 'vị trí, thời gian, phương tiện, chuyển động', color: '#4F46E5', lessons: [8, 23, 32, 36, 75] },
  { id: 'question', icon: '❓', name: 'Câu hỏi', note: 'Where, When, How many, Whose, câu hỏi đuôi, gián tiếp', color: '#0D9488', lessons: [14, 16, 20, 24, 29, 60, 92, 93] },
  { id: 'verb', icon: '🔗', name: 'Mẫu động từ', note: 'like + V-ing, want to, Let\'s, have something done', color: '#9333EA', lessons: [10, 31, 35, 38, 56, 58, 74, 94] },
  { id: 'link', icon: '🧩', name: 'Nối câu, câu phức', note: 'and / but / because, who / which, although, so … that', color: '#CA8A04', lessons: [39, 52, 67, 76, 86, 89, 98, 99] },
  { id: 'cond', icon: '🔀', name: 'Câu điều kiện, câu ước', note: 'if loại 0, 1, 2; unless; wish', color: '#DC2626', lessons: [66, 82, 88, 97] },
  { id: 'passive', icon: '🔄', name: 'Bị động, tường thuật', note: 'is / was + V3, said / told / asked', color: '#475569', lessons: [69, 81, 83, 84, 95] },
  { id: 'review', icon: '🔁', name: 'Ôn tập', note: 'ôn lại các thì và cấu trúc đã học', color: '#64748B', lessons: [80, 100] },
];

export const branchOf = (no) => BRANCHES.find((b) => b.lessons.includes(no));
