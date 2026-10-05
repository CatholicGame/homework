/**
 * Số đọc bằng chữ ("hai mươi lăm", "bốn trăm linh tư"): nhận ra một đáp án là
 * cách đọc số, và chấm mọi cách viết đúng như nhau.
 *   tư = bốn, lăm = năm, mốt = một, lẻ = linh, ngàn = nghìn
 * nên 404 nhận cả "bốn trăm linh tư" lẫn "bốn trăm linh bốn", 25 nhận cả
 * "hai mươi lăm" lẫn "hai mươi năm"; hoa/thường, dấu chấm cuối, khoảng trắng
 * thừa đều không tính.
 */

const NUM_WORDS = new Set(['không', 'một', 'mốt', 'hai', 'ba', 'bốn', 'tư', 'năm', 'lăm', 'sáu', 'bảy', 'tám', 'chín',
  'mười', 'mươi', 'trăm', 'linh', 'lẻ', 'nghìn', 'ngàn', 'triệu', 'tỉ', 'tỷ']);
const SAME = { 'tư': 'bốn', 'lăm': 'năm', 'mốt': 'một', 'lẻ': 'linh', 'ngàn': 'nghìn', 'tỷ': 'tỉ' };

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

const ONES = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
const SCALE = ['', 'nghìn', 'triệu', 'tỉ'];

// Ba chữ số của một lớp. full: lớp đứng sau lớp khác ("không trăm linh năm"); không full: lớp đầu ("năm").
function group(g, full) {
  const h = Math.floor(g / 100), t = Math.floor(g / 10) % 10, u = g % 10;
  const w = [];
  if (h || full) w.push(ONES[h], 'trăm');
  if (t === 0) { if (u) { if (w.length) w.push('linh'); w.push(ONES[u]); } }
  else {
    w.push(...(t === 1 ? ['mười'] : [ONES[t], 'mươi']));
    if (u) w.push(u === 5 ? 'lăm' : u === 1 && t > 1 ? 'mốt' : ONES[u]);
  }
  return w;
}

/**
 * Cách đọc số tự nhiên như SGK Toán 4: tách lớp từ phải sang trái, đọc từng lớp từ trái sang phải.
 *   342157413 → "ba trăm bốn mươi hai triệu một trăm năm mươi bảy nghìn bốn trăm mười ba"
 *   70008 → "bảy mươi nghìn không trăm linh tám"; 1000001 → "một triệu không trăm linh một"
 * zeroClass: lớp toàn chữ số 0 ở giữa đọc "không nghìn" (sách có viết "bảy trăm triệu không nghìn hai trăm ba mươi mốt").
 */
export function docSo(n, { zeroClass = false } = {}) {
  n = Math.floor(Number(n));
  if (!n) return 'không';
  const gs = [];
  for (let x = n; x > 0; x = Math.floor(x / 1000)) gs.push(x % 1000);
  const w = [];
  for (let i = gs.length - 1; i >= 0; i--) {
    const g = gs[i], top = i === gs.length - 1;
    if (!g) {
      const rest = gs.slice(0, i).some(Boolean);
      if (zeroClass && rest && i > 0) w.push('không', SCALE[i]);
      continue;
    }
    w.push(...group(g, !top));
    if (SCALE[i]) w.push(SCALE[i]);
  }
  return w.join(' ');
}

/** Ô "Đọc số" cho số lớn: nhận cách đọc chuẩn và cách đọc có "không nghìn" (lớp giữa bằng 0); tư = bốn, lẻ = linh… */
export function docSoValidate(n) {
  const forms = [docSo(n), docSo(n, { zeroClass: true })].map(foldReading);
  return (v) => forms.includes(foldReading(v));
}
