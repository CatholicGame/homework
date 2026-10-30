/**
 * Tiếng Việt 3 Tập Một (Kết nối tri thức): 4 chủ điểm, Bài 1–32 + 2 bài ôn tập.
 * Dữ liệu từng bài: data/cd1.js … cd4.js (định dạng: docs/lop_3/sgk_tv3_tap1/thiet-ke-cong-cu.md §3).
 */

import { makeBook } from './book.js';
import { BANK } from './bank.js';
import CD1 from './data/cd1.js';
import CD2 from './data/cd2.js';
import CD3 from './data/cd3.js';
import CD4 from './data/cd4.js';

export const TV3 = makeBook({
  prefix: 'tvtool3', kicker: '📚 Tiếng Việt 3', source: 'SGK Tiếng Việt 3 Tập Một',
  data: [...CD1, ...CD2, ...CD3, ...CD4], bank: BANK,
  topics: [
    ['Chủ điểm 1', 'Những trải nghiệm thú vị', [1, 2, 3, 4, 5, 6, 7, 8]],
    ['Chủ điểm 2', 'Cổng trường rộng mở', [9, 10, 11, 12, 13, 14, 15, 16, 'gk']],
    ['Chủ điểm 3', 'Mái nhà yêu thương', [17, 18, 19, 20, 21, 22, 23, 24]],
    ['Chủ điểm 4', 'Cộng đồng gắn bó', [25, 26, 27, 28, 29, 30, 31, 32, 'ck']],
  ],
});
