/** Khám phá Toán 3 Tập Một: EXPLORES[key] = { title, setup, steps } cho runExplore (grade4Tools/frame.js). */
import { tableExplore, FIND_MUL, REMAINDER } from './tables.js';

export const EXPLORES = {
  b4: tableExplore(2, { m: 5, askMul: 6, askDiv: 8, title: 'Bài 4: Bảng nhân 2, bảng chia 2' }),
  b4b: tableExplore(5, { m: 3, askMul: 7, askDiv: 6, title: 'Bài 4: Bảng nhân 5, bảng chia 5' }),
  b5: tableExplore(3, { m: 4, askMul: 6, askDiv: 7, title: 'Bài 5: Bảng nhân 3, bảng chia 3' }),
  b6: tableExplore(4, { m: 3, askMul: 7, askDiv: 6, title: 'Bài 6: Bảng nhân 4, bảng chia 4' }),
  b9: tableExplore(6, { m: 3, askMul: 7, askDiv: 8, title: 'Bài 9: Bảng nhân 6, bảng chia 6' }),
  b10: tableExplore(7, { m: 3, askMul: 6, askDiv: 8, title: 'Bài 10: Bảng nhân 7, bảng chia 7' }),
  b11: tableExplore(8, { m: 3, askMul: 7, askDiv: 6, title: 'Bài 11: Bảng nhân 8, bảng chia 8' }),
  b12: tableExplore(9, { m: 2, askMul: 7, askDiv: 8, title: 'Bài 12: Bảng nhân 9, bảng chia 9' }),
  b13: FIND_MUL,
  b25: REMAINDER,
};
import { B1, B2, B23, B36 } from './numbers.js';
Object.assign(EXPLORES, { b1: B1, b2: B2, b23: B23, b36: B36 });
import { B26, B37 } from './divide.js';
Object.assign(EXPLORES, { b26: B26, b37: B37 });
import { B3, B14, B24, B27, B28, B39 } from './bars.js';
Object.assign(EXPLORES, { b3: B3, b14: B14, b24: B24, b27: B27, b28: B28, b39: B39 });
import { B7, B16, B17, B18, B19, B21 } from './geometry.js';
Object.assign(EXPLORES, { b7: B7, b16: B16, b17: B17, b18: B18, b19: B19, b21: B21 });
import { B30, B31, B32, B33 } from './measure.js';
import { B38 } from './expr.js';
Object.assign(EXPLORES, { b30: B30, b31: B31, b32: B32, b33: B33, b38: B38 });
