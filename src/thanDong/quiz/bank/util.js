/**
 * Công cụ chung của bộ câu hỏi "Ai tài năng nhất?" (bank/g1.js … g5.js). Hàm thuần, không DOM: trình duyệt (quizDev) và máy chủ
 * phòng (realtime/questions.js) dùng chung. Mỗi khuôn câu nhận `r` (số ngẫu nhiên 0..1, có hạt giống khi cần) và trả
 * { q, a, w: [nhiễu…], ex } với a / w là chữ (đã định dạng); `mk` lo phần còn lại: đủ ba phương án nhiễu khác nhau, id theo nội dung.
 */

export const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
export const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
export function shuffle(r, arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/** Số nguyên viết kiểu sách giáo khoa: từ 10 000 trở lên tách lớp bằng dấu cách ("45 678"), số âm không dùng. */
export function fmt(n) {
  const s = String(Math.round(n));
  return Math.abs(n) >= 10000 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : s;
}
/** Số thập phân: dấu phẩy, bỏ số 0 thừa ở cuối ("2,50" → "2,5"). */
export function fmtD(n, dp = 3) {
  const fixed = (Math.round(n * 10 ** dp) / 10 ** dp).toFixed(dp).replace(/\.?0+$/, '');
  const [i, d] = fixed.split('.');
  return d ? `${fmt(+i)},${d}` : fmt(+i);
}
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
export { gcd };
/** Phân số tối giản "a/b" (b = 1 thì chỉ a). */
export function frac(a, b, reduce = true) {
  if (reduce) { const g = gcd(a, b); a /= g; b /= g; }
  return b === 1 ? String(a) : `${a}/${b}`;
}

/** Băm ngắn của chữ (FNV-1a): id câu theo nội dung, để `seen` tránh hỏi lại đúng câu ấy. */
export function hash(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 0x01000193) >>> 0;
  return h.toString(36);
}

/**
 * Phương án nhiễu cho đáp án số `ans` (đơn vị `unit` viết sau số): các lỗi hay gặp do khuôn đưa vào trước (`wrong`), thiếu thì thêm
 * số gần đáp án (±1, ±2, ±10, lệch một hàng). Bỏ số âm (trừ khi allowNeg), bỏ trùng đáp án. Trả mảng số.
 */
export function near(r, ans, wrong = [], { allowNeg = false, dec = false, step = null } = {}) {
  const out = [];
  const ok = (v) => Number.isFinite(v) && (allowNeg || v >= 0) && Math.abs(v - ans) > 1e-9 && !out.some(x => Math.abs(x - v) < 1e-9);
  for (const v of wrong) if (ok(v)) out.push(v);
  const s = step ?? (dec ? (Math.abs(ans) < 1 ? 0.1 : 1) : Math.max(1, 10 ** Math.max(0, String(Math.round(Math.abs(ans))).length - 2)));
  const cands = shuffle(r, [ans + s, ans - s, ans + 2 * s, ans - 2 * s, ans + 10 * s, ans - 10 * s, ans + 1, ans - 1, ans * 10, Math.round(ans / 10)]);
  for (const v of cands) { if (out.length >= 6) break; if (ok(v)) out.push(dec ? Math.round(v * 1000) / 1000 : v); }
  return out;
}

/**
 * Câu số: đáp án `ans` (số), nhiễu từ near(); fmtFn định dạng số (fmt / fmtD), unit nối sau (" cm").
 */
export function numQ(r, q, ans, wrong, ex, { unit = '', f = fmt, ...o } = {}) {
  const w = near(r, ans, wrong, o).map(v => f(v) + unit);
  return { q, a: f(ans) + unit, w, ex };
}

/**
 * Câu hoàn chỉnh cho bộ đề: { id, q, o: [đúng, nhiễu ×3], ex, cat } (o[0] là đáp án, pick.js ask() xáo khi hỏi).
 * Nhiễu trùng chữ với đáp án hay trùng nhau thì bỏ; khuôn phải đưa đủ ít nhất ba nhiễu khác nhau (kiểm ở scripts/thandong-check.mjs).
 */
export function mk(grade, level, cat, c) {
  const w = [];
  for (const x of c.w) if (x !== c.a && !w.includes(x)) w.push(x);
  const o = [c.a, ...w.slice(0, 3)];
  return { id: `g${grade}L${level}-${hash(c.q + '|' + c.a)}`, q: c.q, o, ex: c.ex || '', cat, ...(c.fixed ? { fixed: true, a: c.fixedA } : {}) };
}
