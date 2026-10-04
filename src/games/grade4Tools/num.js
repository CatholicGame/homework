/** Số lớp 4: viết tách lớp (2 712 615), đọc bằng chữ, tên hàng / lớp. */

/** 2712615 → "2 712 615" (sách lớp 4 tách từ 4 chữ số: 8 289). */
export function fmt(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
/** Như fmt nhưng dấu cách thường (giọng đọc, chữ trong câu). */
export const fmtSp = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** Tên hàng theo vị trí từ phải sang (0 = đơn vị … 8 = trăm triệu). */
export const PLACE = ['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn', 'trăm nghìn', 'triệu', 'chục triệu', 'trăm triệu'];
export const placeName = (p) => `hàng ${PLACE[p]}`;
/** Lớp của hàng p: 0 = lớp đơn vị, 1 = lớp nghìn, 2 = lớp triệu. */
export const CLASS = ['lớp đơn vị', 'lớp nghìn', 'lớp triệu'];
export const classOf = (p) => Math.floor(p / 3);
/** Màu từng lớp: đơn vị xanh lá, nghìn xanh dương, triệu tím. Ba hàng của một lớp: nhạt → đậm. */
export const CLASS_HUE = [
  ['#86EFAC', '#4ADE80', '#16A34A'],
  ['#93C5FD', '#60A5FA', '#2563EB'],
  ['#D8B4FE', '#C084FC', '#9333EA'],
];
export const CLASS_INK = ['#166534', '#1E40AF', '#6B21A8'];
export const CLASS_BG = ['#DCFCE7', '#DBEAFE', '#F3E8FF'];
export const placeColor = (p) => CLASS_HUE[classOf(p)][p % 3];

const DIG = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
const GROUP = ['', 'nghìn', 'triệu', 'tỉ'];

/** Đọc một nhóm 3 chữ số. full = không phải nhóm đứng đầu (đọc cả "không trăm", "linh"). */
function readGroup(g, full) {
  const h = Math.floor(g / 100), t = Math.floor(g / 10) % 10, u = g % 10;
  const out = [];
  if (h || full) out.push(DIG[h], 'trăm');
  if (t === 0) { if (u) { if (h || full) out.push('linh'); out.push(DIG[u]); } }
  else if (t === 1) { out.push('mười'); if (u) out.push(u === 5 ? 'lăm' : DIG[u]); }
  else { out.push(DIG[t], 'mươi'); if (u) out.push(u === 1 ? 'mốt' : u === 4 ? 'tư' : u === 5 ? 'lăm' : DIG[u]); }
  return out.join(' ');
}

/** 36515 → "ba mươi sáu nghìn năm trăm mười lăm". */
export function readVN(n) {
  if (n === 0) return 'không';
  const groups = [];
  for (let x = n; x > 0; x = Math.floor(x / 1000)) groups.push(x % 1000);
  const parts = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    const g = groups[i];
    if (!g) continue;
    parts.push(readGroup(g, i < groups.length - 1));
    if (GROUP[i]) parts.push(GROUP[i]);
  }
  return parts.join(' ');
}
export const capFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/** Các chữ số từ phải sang: 3615 → [5,1,6,3]. */
export const digitsOf = (n, len = String(n).length) => Array.from({ length: len }, (_, i) => Math.floor(n / 10 ** i) % 10);

/** Viết thành tổng: 36515 → [30000, 6000, 500, 10, 5] (bỏ hàng có chữ số 0). */
export const expand = (n) => digitsOf(n).map((d, i) => d * 10 ** i).filter(Boolean).reverse();

/** Làm tròn đến hàng 10^p. */
export const roundTo = (n, p) => Math.round(n / 10 ** p) * 10 ** p;
