/** Số và màu số dùng chung cho các tập Bé Học Vui Toán. */

export const NUMBER_WORDS = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười'];

/** Đọc số 0–20 bằng chữ: 15 → "mười lăm", 20 → "hai mươi". */
export function numberWord(n) {
  if (n <= 10) return NUMBER_WORDS[n];
  if (n === 20) return 'hai mươi';
  const u = n - 10;
  return `mười ${u === 5 ? 'lăm' : NUMBER_WORDS[u]}`;
}

// Màu số trong sách (thẻ số đầu mỗi bài).
export const NUMBER_COLORS = ['#64748B', '#1D9BF0', '#EF4444', '#FACC15', '#22C55E', '#EC4899', '#F97316', '#2563EB', '#14B8A6', '#9333EA', '#0EA5E9'];
