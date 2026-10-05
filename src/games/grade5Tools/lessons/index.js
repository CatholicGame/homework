/**
 * Nội dung từng bài Toán 5: { explore: { setup, steps }, tasks: () => [task…] } (cùng định dạng Toán 4,
 * xem grade4Tools/lessons/index.js). Bài Luyện tập chung / Ôn tập (catalog: mix) không có Khám phá;
 * Thực hành trộn các dạng câu của các bài trong mix.
 */

import { REVIEW_LESSONS } from './review.js';
import { FRACTION_LESSONS } from './fractions.js';
import { DECIMAL_LESSONS } from './decimals.js';
import { UNIT_LESSONS } from './units.js';
import { CALC_LESSONS } from './calc.js';
import { DIV_LESSONS } from './calcDiv.js';
import { SHAPE_LESSONS } from './shapes.js';
import { lessonByN } from '../catalog.js';

const CONTENT = { ...REVIEW_LESSONS, ...FRACTION_LESSONS, ...DECIMAL_LESSONS, ...UNIT_LESSONS, ...CALC_LESSONS, ...DIV_LESSONS, ...SHAPE_LESSONS };

export const exploreOf = (n) => CONTENT[n]?.explore || null;

/** Các dạng câu Thực hành; mỗi câu ghi src = bài SGK chứa kiến thức của câu đó (bài trộn: bài gốc). */
export function tasksOf(n) {
  const l = lessonByN(n);
  const of = (k) => (CONTENT[k]?.tasks() || []).map(t => ({ ...t, src: k }));
  return l?.mix ? l.mix.flatMap(of) : of(n);
}
