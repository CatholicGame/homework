/**
 * Bộ câu hỏi "Ai tài năng nhất?" theo lớp 1–5: mỗi lớp 15 bậc. Câu số i của ván lấy ở bậc i, một nửa từ câu viết tay
 * (bank/fixed/g<lớp>.js FIXED[i]: đố vui, kiến thức, lời văn, tư duy), một nửa sinh theo khuôn (bank/g<lớp>.js LEVELS[i] =
 * [chủ đề, [khuôn…]], số ngẫu nhiên). Có hạt giống `rand` thì mọi máy rút như nhau. Hàm thuần: trình duyệt (quizDev, bản dev
 * không có máy chủ phòng) và máy chủ phòng (realtime/questions.js) dùng chung. Kiểm tra cả bộ: `node scripts/thandong-check.mjs`.
 */
import { LEVELS as G1 } from './g1.js';
import { LEVELS as G2 } from './g2.js';
import { LEVELS as G3 } from './g3.js';
import { LEVELS as G4 } from './g4.js';
import { LEVELS as G5 } from './g5.js';
import { FIXED as F1 } from './fixed/g1.js';
import { FIXED as F2 } from './fixed/g2.js';
import { FIXED as F3 } from './fixed/g3.js';
import { FIXED as F4 } from './fixed/g4.js';
import { FIXED as F5 } from './fixed/g5.js';
import { mk, pick } from './util.js';
import { ask } from '../pick.js';

export const GRADES = { 1: G1, 2: G2, 3: G3, 4: G4, 5: G5 };
export const FIXED = { 1: F1, 2: F2, 3: F3, 4: F4, 5: F5 };
/** Phần câu viết tay trong mỗi bậc (còn lại sinh theo khuôn). */
export const FIXED_SHARE = 0.5;

/** Câu viết tay thứ `i` của bậc `level` lớp `grade` (dùng cho kiểm tra cả bộ). */
export function fixedQuestion(grade, level, i) {
  const g = gradeOf(grade), c = FIXED[g][level - 1][i];
  return mk(g, level, GRADES[g][level - 1][0], c);
}
export const gradeOf = (g) => (GRADES[g] ? +g : 3);

/** Một câu (chưa xáo) của bậc `level` (1..15) lớp `grade`: { id, q, o: [đúng, nhiễu ×3], ex, cat }. */
export function makeQuestion(grade, level, rand = Math.random) {
  const [cat, tpls] = GRADES[gradeOf(grade)][level - 1];
  const fixed = FIXED[gradeOf(grade)]?.[level - 1];
  if (fixed?.length && rand() < FIXED_SHARE) return fixedQuestion(grade, level, Math.floor(rand() * fixed.length));
  for (let i = 0; i < 12; i++) {
    const q = mk(grade, level, cat, pick(rand, tpls)(rand));
    if (q.o.length === 4) return q;
  }
  throw new Error(`thandong: lớp ${grade} bậc ${level} không sinh đủ bốn phương án`);
}

/** Một ván 15 câu đã xáo phương án, tránh câu đã hỏi trong phòng (`seen`: Set id). */
export function gameFor(grade, { seen = new Set(), rand = Math.random } = {}) {
  return Array.from({ length: 15 }, (_, i) => {
    let q = makeQuestion(grade, i + 1, rand);
    for (let k = 0; k < 6 && seen.has(q.id); k++) q = makeQuestion(grade, i + 1, rand);
    return ask(q, i + 1, rand);
  });
}
