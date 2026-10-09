/** Khám phá Toán 2 Tập Hai: EXPLORES[key] = { title, setup, steps } cho runExplore (grade4Tools/frame.js). */
import { MUL_EXPLORES } from './mul.js';
import { NUM_EXPLORES } from './numbers.js';
import { MEASURE_EXPLORES } from './measure.js';
import { CALC_EXPLORES } from './calc.js';
import { STATS_EXPLORES } from './stats.js';

export const EXPLORES = { ...MUL_EXPLORES, ...NUM_EXPLORES, ...MEASURE_EXPLORES, ...CALC_EXPLORES, ...STATS_EXPLORES };
