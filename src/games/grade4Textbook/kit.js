/**
 * Đồ dùng chung cho dữ liệu SGK Toán 4 (grade4Textbook/b*.js).
 *
 *   calc('4637 + 8245', 12882)       ô "4637 + 8245 = ..." có nút ✍️ Tính (đặt tính cộng, trừ, nhân, chia)
 *   calc('a) 4637 + 8245', 12882)    nhãn có tiền tố a), b)… vẫn đọc đúng phép tính
 *   divCalc(18418, 4)                 "18418 : 4 = ... (dư ...)" khi có dư, có nút ✍️ Tính
 *   nham('7000 + 2000', 9000)         tính nhẩm: ô điền, không có nút đặt tính
 *   placeSum(8723)                    "8723 = ..." → 8000 + 700 + 20 + 3 (đúng từng hàng, đúng thứ tự)
 *   readCell(63850) / readBlank(...)  ô "Đọc số" (bàn phím chữ; số lớn có thêm "triệu", "tỉ")
 *   num(42571) → "42 571"             cách viết số của sách (từ 5 chữ số trở lên tách lớp bằng khoảng trắng)
 *
 * Phân số: fr(3, 4) trong đề / nhãn / lựa chọn; ô viết phân số: "{/}" trong nhãn, đáp án "3,4",
 * validate: fracValidate(3, 4) (mọi phân số bằng) hoặc fracValidate(3, 4, true) (đúng phân số đó, vd. rút gọn tối giản).
 */

import { blank, listValidate, fr, fracValidate, mau, dsValidate, textValidate } from '../grade3Workbook.js';
import { docSo, docSoValidate } from '../../engine/numberWords.js';

export { blank, listValidate, fr, fracValidate, mau, dsValidate, textValidate, docSo, docSoValidate };

export const num = (n) => (Math.abs(n) >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(n));

/** Ô phép tính có nút ✍️ Tính. expr: "4637 + 8245" (có thể kèm "a) "); opts thêm vào ô (validate, …). */
export function calc(expr, answer, opts = {}) {
  return { label: `${expr} = ...`, answer: String(answer), calc: true, ...opts };
}

/** Phép chia đặt tính: hết thì "D : d = ...", có dư thì "D : d = ... (dư ...)". prefix: "a) ". */
export function divCalc(D, d, prefix = '') {
  const q = Math.floor(D / d), r = D % d;
  if (!r) return { label: `${prefix}${D} : ${d} = ...`, answer: String(q), calc: `${D} : ${d}` };
  return { label: `${prefix}${D} : ${d} = ... (dư ...)`, answer: `${q},${r}`, validate: listValidate([String(q), String(r)]), calc: `${D} : ${d}` };
}

/** Tính nhẩm: ô điền thường (không đặt tính). */
export function nham(expr, answer, opts = {}) {
  return { label: `${expr} = ...`, answer: String(answer), ...opts };
}

/** Các số hạng theo hàng của n, bỏ hàng 0: 8723 → [8000, 700, 20, 3]. */
export function placeParts(n) {
  const s = String(n);
  return [...s].map((d, i) => Number(d) * 10 ** (s.length - 1 - i)).filter(Boolean);
}

/** "Viết số thành tổng (theo mẫu)": 52314 = 50000 + 2000 + 300 + 10 + 4 — đúng từng hàng, theo thứ tự. */
export function placeSum(n, prefix = '') {
  const parts = placeParts(n);
  const want = parts.join('+');
  return {
    label: `${prefix}${num(n)} = ...`, answer: parts.join(' + '),
    validate: (v) => String(v).replace(/\s+/g, '') === want,
  };
}

/** Ô bảng "Đọc số": mọi cách đọc đúng (tư = bốn, lẻ = linh, "không nghìn"). */
export function readCell(n) {
  return blank(docSo(n), { validate: docSoValidate(n) });
}

/** Ô điền "Đọc số": nhãn label (vd. "96 315: ..."). */
export function readBlank(label, n) {
  return { label, answer: docSo(n), validate: docSoValidate(n) };
}
