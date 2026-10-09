/** Khám phá Toán 3 Tập Hai: EXPLORES[key] = { title, setup, steps } cho runExplore (grade4Tools/frame.js). */
import { NUMBERS } from './numbers.js';
import { ROMAN } from './roman.js';
import { GEO } from './geo.js';
import { CALC } from './calc.js';
import { TIME } from './time.js';
import { MONEY } from './money.js';
import { DATA } from './data.js';

export const EXPLORES = { ...NUMBERS, ...ROMAN, ...GEO, ...CALC, ...TIME, ...MONEY, ...DATA };
