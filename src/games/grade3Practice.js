/**
 * Lớp 3 — Luyện tập Toán 3 (Tập Một)
 * Nguồn: Luyện tập Toán lớp 3 — Tập một (Lê Anh Vinh chủ biên), bộ sách "Kết nối tri thức
 * với cuộc sống" (NXB Giáo dục Việt Nam). Sách chia theo Tuần, mỗi tuần 3 Tiết.
 * Dùng chung engine/giao diện với Vở Bài Tập (grade3Workbook.js → renderWorkbook).
 * Nội dung từng tuần nằm trong src/games/grade3Practice/*.js.
 */

import { renderWorkbook } from './grade3Workbook.js';
import { WEEKS_1_4 } from './grade3Practice/tuan01-04.js';
import { WEEKS_5_8 } from './grade3Practice/tuan05-08.js';
import { WEEKS_9_12 } from './grade3Practice/tuan09-12.js';
import { WEEKS_13_15 } from './grade3Practice/tuan13-15.js';
import { WEEKS_16_18 } from './grade3Practice/tuan16-18.js';

const UNITS = [...WEEKS_1_4, ...WEEKS_5_8, ...WEEKS_9_12, ...WEEKS_13_15, ...WEEKS_16_18];

const PRACTICE_CONFIG = {
  units: UNITS,
  storageKey: 'gp-progress-v1',
  lastUnitKey: 'gp-last-unit',
  badge: '📘',
  title: 'Luyện Tập Toán 3',
  subtitle: 'Tập Một — Kết nối tri thức với cuộc sống',
  menuLabel: 'Chọn tuần để luyện tập:',
  unitWord: 'tuần',
  // The end-of-term test unit has no week number (number: 'KT').
  unitName: (u) => (typeof u.number === 'number' ? `Tuần ${u.number}. ${u.title}` : u.title),
  note: 'Nguồn: Luyện tập Toán lớp 3 — Tập một, bộ sách Kết nối tri thức với cuộc sống (NXB Giáo dục Việt Nam).',
};

export function render(app, onBack) {
  renderWorkbook(app, onBack, PRACTICE_CONFIG);
}
