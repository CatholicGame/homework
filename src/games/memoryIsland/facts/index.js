/**
 * Kho thẻ theo lớp của 🏝️ Đảo Trí Nhớ (docs/thiet-ke-tro-choi-tri-nho.md §2, §12).
 * Cấu trúc thẻ: facts/kit.js. Mỗi lớp một tệp `gN.js` export `topics`.
 *
 * topicsFor(grade) → [{ id, icon, title, sub, lessons, facts: [thẻ…] }], thẻ có thêm:
 *   uid: 'g3:7x8' (khoá lưu, cố định qua nhiều ngày), topic: chủ đề chứa thẻ.
 */

import { topics as g3 } from './g3.js';

const BY_GRADE = { 3: g3 };
const cache = {};

/** Lớp có kho thẻ (lớp khác dùng tạm kho gần nhất bên dưới, rồi bên trên). */
export const GRADES_WITH_FACTS = Object.keys(BY_GRADE).map(Number);

export function factGrade(grade) {
  if (BY_GRADE[grade]) return grade;
  const lower = GRADES_WITH_FACTS.filter((g) => g < grade);
  return lower.length ? Math.max(...lower) : Math.min(...GRADES_WITH_FACTS);
}

export function topicsFor(grade) {
  const g = factGrade(grade);
  if (!cache[g]) {
    cache[g] = BY_GRADE[g].map((t) => {
      const topic = { ...t };
      topic.facts = t.facts().map((f) => ({ ...f, uid: `g${g}:${f.id}`, topic }));
      return topic;
    });
  }
  return cache[g];
}

export function topicById(grade, id) {
  return topicsFor(grade).find((t) => t.id === id) || null;
}
