/** Khám phá Toán 2 Tập Một: EXPLORES[key] = { title, setup, steps } cho runExplore (grade4Tools/frame.js). */
import { NUMBER_EXPLORES } from './numbers.js';
import { CALC20_EXPLORES } from './calc20.js';
import { MEASURE_EXPLORES } from './measure.js';
import { CARRY_EXPLORES } from './carry.js';
import { GEO_EXPLORES } from './geometry.js';
import { TIME_EXPLORES } from './time.js';

export const EXPLORES = { ...NUMBER_EXPLORES, ...CALC20_EXPLORES, ...MEASURE_EXPLORES, ...CARRY_EXPLORES, ...GEO_EXPLORES, ...TIME_EXPLORES };
