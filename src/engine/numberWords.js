/**
 * Số đọc bằng chữ ("hai mươi lăm", "bốn trăm linh tư"): nhận ra một đáp án là
 * cách đọc số, và chấm mọi cách viết đúng như nhau.
 *   tư = bốn, lăm = năm, mốt = một, lẻ = linh, ngàn = nghìn
 * nên 404 nhận cả "bốn trăm linh tư" lẫn "bốn trăm linh bốn", 25 nhận cả
 * "hai mươi lăm" lẫn "hai mươi năm"; hoa/thường, dấu chấm cuối, khoảng trắng
 * thừa đều không tính.
 */

const NUM_WORDS = new Set(['không', 'một', 'mốt', 'hai', 'ba', 'bốn', 'tư', 'năm', 'lăm', 'sáu', 'bảy', 'tám', 'chín',
  'mười', 'mươi', 'trăm', 'linh', 'lẻ', 'nghìn', 'ngàn']);
const SAME = { 'tư': 'bốn', 'lăm': 'năm', 'mốt': 'một', 'lẻ': 'linh', 'ngàn': 'nghìn' };

const wordsOf = (s) => String(s ?? '').normalize('NFC').toLowerCase().replace(/[.,;!]/g, ' ').trim().split(/\s+/);

/** Đáp án chỉ gồm các chữ đọc số ("Hai mươi lăm", "chín trăm linh một"). */
export function isNumberWords(s) {
  const ws = wordsOf(s);
  return ws[0] !== '' && ws.every(w => NUM_WORDS.has(w));
}

export function foldReading(s) {
  return wordsOf(s).map(w => SAME[w] || w).join(' ');
}

/** Hai cách đọc cùng một số (theo các cách viết tương đương ở trên). */
export function sameReading(a, b) {
  return foldReading(a) === foldReading(b);
}
