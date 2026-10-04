/**
 * Nội dung từng bài: { explore: { setup, steps }, tasks: () => [task…] }.
 * Bài Luyện tập chung / Ôn tập (catalog: mix) không có Khám phá; Thực hành trộn các dạng câu của các bài trong mix.
 */

import { NUMBER_LESSONS } from './numbers.js';
import { ANGLE_LESSONS } from './angles.js';
import { LINE_LESSONS } from './lines.js';
import { SHAPE_LESSONS } from './shapes.js';
import { MASS_LESSONS } from './mass.js';
import { AREA_LESSONS } from './area.js';
import { TIME_LESSONS } from './time.js';
import { CALC_LESSONS } from './calc.js';
import { PARITY_LESSONS } from './parity.js';
import { EXPR_LESSONS } from './expr.js';
import { BAR_LESSONS } from './bars.js';
import { lessonByN } from '../catalog.js';

const CONTENT = { ...NUMBER_LESSONS, ...ANGLE_LESSONS, ...LINE_LESSONS, ...SHAPE_LESSONS, ...MASS_LESSONS, ...AREA_LESSONS, ...TIME_LESSONS, ...CALC_LESSONS, ...PARITY_LESSONS, ...EXPR_LESSONS, ...BAR_LESSONS };

export const exploreOf = (n) => CONTENT[n]?.explore || null;

/** Các dạng câu Thực hành; mỗi câu ghi src = bài SGK chứa kiến thức của câu đó (bài trộn: bài gốc). */
export function tasksOf(n) {
  const l = lessonByN(n);
  const of = (k) => (CONTENT[k]?.tasks() || []).map(t => ({ ...t, src: k }));
  return l?.mix ? l.mix.flatMap(of) : of(n);
}

export const hasContent = (n) => !!exploreOf(n) || tasksOf(n).length > 0;
