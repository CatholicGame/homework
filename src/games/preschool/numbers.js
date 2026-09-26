/** Số và màu số dùng chung cho các tập Bé Học Vui Toán. */

export const NUMBER_WORDS = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười'];

/** Đọc số 0–100 bằng chữ: 15 → "mười lăm", 20 → "hai mươi", 21 → "hai mươi mốt", 45 → "bốn mươi lăm". */
export function numberWord(n) {
  if (n <= 10) return NUMBER_WORDS[n];
  if (n === 100) return 'một trăm';
  const t = Math.floor(n / 10), u = n % 10;
  const tens = t === 1 ? 'mười' : `${NUMBER_WORDS[t]} mươi`;
  if (!u) return tens;
  const unit = u === 5 ? 'lăm' : u === 1 && t > 1 ? 'mốt' : u === 4 && t > 1 ? 'tư' : NUMBER_WORDS[u];
  return `${tens} ${unit}`;
}

// Màu số trong sách (thẻ số đầu mỗi bài).
export const NUMBER_COLORS = ['#64748B', '#1D9BF0', '#EF4444', '#FACC15', '#22C55E', '#EC4899', '#F97316', '#2563EB', '#14B8A6', '#9333EA', '#0EA5E9'];
