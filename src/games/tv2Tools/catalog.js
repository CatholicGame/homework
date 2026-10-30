/**
 * Tiếng Việt 2 Tập Một (Kết nối tri thức): 4 chủ điểm, Bài 1–32 + 2 bài ôn tập.
 * Nguồn: Vở bài tập Tiếng Việt 2 Tập Một, docs/lop_2/vo-bai-tap-tieng-viet-2-tap-mot.pdf.
 * Dữ liệu từng bài: data/cd1.js … cd4.js (định dạng: docs/lop_2/vbt_tv2_tap1/thiet-ke-cong-cu.md §3).
 */

import { makeBook } from '../tv3Tools/book.js';
import { BANK } from './bank.js';
import CD1 from './data/cd1.js';
import CD2 from './data/cd2.js';
import CD3 from './data/cd3.js';
import CD4 from './data/cd4.js';

export const TV2 = makeBook({
  prefix: 'tvtool2', kicker: '📚 Tiếng Việt 2', source: 'Vở bài tập Tiếng Việt 2 Tập Một',
  data: [...CD1, ...CD2, ...CD3, ...CD4], bank: BANK,
  // lớp 2 học dấu chấm, chấm hỏi, chấm than, phẩy (chưa có dấu hai chấm)
  punct: ['.', '?', '!', ','],
  desc: { vocab: 'Bản thân, trường học, đồ chơi, gia đình…', punct: 'Chọn dấu chấm, chấm hỏi, chấm than, dấu phẩy' },
  topics: [
    ['Chủ điểm 1', 'Em lớn lên từng ngày', [1, 2, 3, 4, 5, 6, 7, 8]],
    ['Chủ điểm 2', 'Đi học vui sao', [9, 10, 11, 12, 13, 14, 15, 16, 'gk']],
    ['Chủ điểm 3', 'Niềm vui tuổi thơ', [17, 18, 19, 20, 21, 22, 23, 24]],
    ['Chủ điểm 4', 'Mái ấm gia đình', [25, 26, 27, 28, 29, 30, 31, 32, 'ck']],
  ],
});
