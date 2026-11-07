/**
 * Bộ câu hỏi "Ai tài năng nhất?" theo lớp 1–5: mỗi lớp 15 bậc (bank/g<lớp>.js LEVELS[i] = [chủ đề, [khuôn…]]), câu số i của ván lấy
 * một khuôn của bậc i, sinh số ngẫu nhiên (có hạt giống `rand` thì mọi máy sinh như nhau). Hàm thuần: trình duyệt (quizDev, bản dev
 * không có máy chủ phòng) và máy chủ phòng (realtime/questions.js) dùng chung. Kiểm tra cả bộ: `node scripts/thandong-check.mjs`.
 */
import { LEVELS as G1 } from './g1.js';
import { LEVELS as G2 } from './g2.js';
import { LEVELS as G3 } from './g3.js';
import { LEVELS as G4 } from './g4.js';
import { LEVELS as G5 } from './g5.js';
import { mk, pick } from './util.js';
import { ask } from '../pick.js';

export const GRADES = { 1: G1, 2: G2, 3: G3, 4: G4, 5: G5 };
export const gradeOf = (g) => (GRADES[g] ? +g : 3);

/** Một câu (chưa xáo) của bậc `level` (1..15) lớp `grade`: { id, q, o: [đúng, nhiễu ×3], ex, cat }. */
export function makeQuestion(grade, level, rand = Math.random) {
  const [cat, tpls] = GRADES[gradeOf(grade)][level - 1];
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
