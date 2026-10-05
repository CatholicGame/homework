/**
 * Số lớp 5: số thập phân (dấu phẩy, tách lớp phần nguyên), đọc số thập phân, phân số và hỗn số (viết chồng như sách).
 */

import { fmt, readVN } from '../grade4Tools/num.js';
import { css } from '../grade4Tools/frame.js';

export { fmt, readVN };

/** Bỏ sai số dấu phẩy động: 0.1 + 0.2 → 0.3. */
export const clean = (x) => Math.round(x * 1e9) / 1e9;

/** 1234.5 → "1 234,5"; dp: số chữ số phần thập phân cố định (giữ 0 cuối: dec(2.5, 2) → "2,50"). */
export function dec(x, dp = null) {
  const v = clean(x);
  const s = dp == null ? String(v) : v.toFixed(dp);
  const [i, d] = s.split('.');
  return (i.startsWith('-') ? '−' + fmt(+i.slice(1)) : fmt(+i)) + (d ? `,${d}` : '');
}
/** Như dec nhưng không tách lớp (dùng làm đáp án cho ô gõ: "1234,5"). */
export const decKey = (x, dp = null) => {
  const v = clean(x);
  return (dp == null ? String(v) : v.toFixed(dp)).replace('.', ',');
};
/** Số chữ số phần thập phân của x (theo cách viết gọn nhất). */
export const dpOf = (x) => (String(clean(x)).split('.')[1] || '').length;

const DIG = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
/**
 * Đọc số thập phân như sách: phần nguyên, "phẩy", phần thập phân đọc như số tự nhiên, các chữ số 0 đứng đầu đọc
 * "không": 12,004 → "mười hai phẩy không không bốn"; 325,431 → "ba trăm hai mươi lăm phẩy bốn trăm ba mươi mốt".
 * s: chuỗi "12,004" (giữ nguyên số 0 cuối nếu có) hoặc số.
 */
export function readDec(s) {
  const [i, d] = (typeof s === 'number' ? decKey(s) : String(s).replace(/\s/g, '')).split(',');
  let out = readVN(+i);
  if (d) {
    const lead = d.match(/^0*/)[0].length;
    const rest = d.slice(lead);
    out += ' phẩy ' + [...Array(lead)].map(() => 'không').concat(rest ? [readVN(+rest)] : []).join(' ');
  }
  return out;
}
export const digitWord = (d) => DIG[d];

// ── Phân số ─────────────────────────────────────────────────────────────────────────────────────────
export const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
export const lcm = (a, b) => (a / gcd(a, b)) * b;
/** Rút gọn tối giản: [6, 8] → [3, 4]. */
export const simp = (a, b) => { const g = gcd(a, b) || 1; return [a / g, b / g]; };

/** Phân số viết chồng (HTML). a, b có thể là số hoặc HTML (ô trống). */
export function fr(a, b, cls = '') {
  injectNumStyles();
  return `<span class="g5-fr ${cls}"><span class="g5-fr-n">${a}</span><span class="g5-fr-d">${b}</span></span>`;
}
/** Hỗn số: 2 3/4 (phần nguyên to, phân số nhỏ bên phải). */
export const mixed = (w, a, b, cls = '') => `<span class="g5-mx ${cls}">${w}${fr(a, b)}</span>`;
/** Phân số dạng chữ cho giọng đọc: "ba phần tư". */
export const frSay = (a, b) => `${readVN(a)} phần ${readVN(b)}`;
export const mixedSay = (w, a, b) => `${readVN(w)} và ${frSay(a, b)}`;

let styled = false;
function injectNumStyles() {
  if (styled) return;
  styled = true;
  css('g5-num', `
    .g5-fr { display: inline-flex; flex-direction: column; align-items: center; vertical-align: middle; line-height: 1.05; font-size: 0.82em; margin: 0 0.12em; }
    .g5-fr-n, .g5-fr-d { display: block; padding: 0 0.15em; min-width: 1em; text-align: center; }
    .g5-fr-n { border-bottom: 0.09em solid currentColor; padding-bottom: 0.04em; }
    .g5-fr-d { padding-top: 0.04em; }
    .g5-fr .g4-box { min-width: 1.6em; height: 1.1em; }
    .g5-mx { display: inline-flex; align-items: center; gap: 0.05em; }
  `);
}
