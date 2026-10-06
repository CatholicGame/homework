/**
 * Giọng đọc tiếng Việt: tên điểm, tên hình (A, AB, ABCD, MNPQ, O…) đọc theo tên chữ cái tiếng Việt
 * như thầy cô đọc ở lớp: "cạnh AB" → "cạnh a bê", "hình MNPQ" → "hình em-mờ en-nờ pê quy".
 * Giọng Việt của máy tự đọc chữ in hoa lúc kiểu Anh ("ây bi") lúc kiểu Việt, nên phải đổi trước khi đọc.
 * Thế kỉ viết số La Mã ("thế kỉ XX") đọc thành số: "thế kỉ hai mươi".
 * Chỉ dùng cho giọng tiếng Việt; chữ hiện trên màn hình giữ nguyên.
 */

import { docSo } from './numberWords.js';

const NAMES = {
  A: 'a', B: 'bê', C: 'xê', D: 'đê', E: 'e', F: 'ép', G: 'giê', H: 'hát', I: 'i', J: 'gi', K: 'ca',
  L: 'e-lờ', M: 'em-mờ', N: 'en-nờ', O: 'o', P: 'pê', Q: 'quy', R: 'e-rờ', S: 'ét-xì', T: 'tê',
  U: 'u', V: 'vê', W: 'vê kép', X: 'ích-xì', Y: 'i dài', Z: 'dét',
};
// Chữ viết tắt đọc nguyên cụm, không đánh vần từng chữ.
const KEEP = new Set(['SGK', 'OK']);
const ROMAN = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

function romanValue(s) {
  let v = 0;
  for (let i = 0; i < s.length; i++) {
    const a = ROMAN[s[i]], b = ROMAN[s[i + 1]] || 0;
    v += a < b ? -a : a;
  }
  return v;
}

/** Câu tiếng Việt → câu để giọng Việt đọc (đánh vần tên điểm, đọc số La Mã sau "thế kỉ"). */
export function speakableVi(text) {
  return String(text)
    .replace(/(thế kỉ|thế kỷ)\s+([IVXLCDM]+)(?![\p{L}\d])/giu, (_, w, r) => `${w} ${docSo(romanValue(r.toUpperCase()))}`)
    .replace(/(?<![\p{L}\d])([A-Z]{1,5})(?![\p{L}\d])/gu, (m) => (KEEP.has(m) ? m : [...m].map(c => NAMES[c]).join(' ')));
}
