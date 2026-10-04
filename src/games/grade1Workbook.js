/**
 * Lớp 1 — Vở bài tập Toán 1 (Tập Một)
 * Nguồn: Vở bài tập Toán 1 — Tập một (NXB Giáo dục Việt Nam). Bài 1–34 và bài Tự kiểm tra (sách trang 3–39).
 * Dùng chung engine/giao diện với Vở Bài Tập Toán 3 (grade3Workbook.js → renderWorkbook).
 * Nội dung từng bài nằm trong src/games/grade1Workbook/*.js; mọi hình là SVG vẽ lại theo nét riêng
 * (src/assets/grade1-workbook, bộ vẽ scripts/redraw/g1_*.py).
 */

import { renderWorkbook } from './grade3Workbook.js';
import { BAI_1_6 } from './grade1Workbook/bai01-06.js';
import { BAI_7_12 } from './grade1Workbook/bai07-12.js';
import { BAI_13_18 } from './grade1Workbook/bai13-18.js';
import { BAI_19_23 } from './grade1Workbook/bai19-23.js';
import { BAI_24_28 } from './grade1Workbook/bai24-28.js';
import { BAI_29_34 } from './grade1Workbook/bai29-34.js';

const UNITS = [...BAI_1_6, ...BAI_7_12, ...BAI_13_18, ...BAI_19_23, ...BAI_24_28, ...BAI_29_34];

const WORKBOOK1_CONFIG = {
  units: UNITS,
  storageKey: 'g1w-progress-v1',
  starBook: 'workbook1',
  lastUnitKey: 'g1w-last-unit',
  badge: '📒',
  title: 'Vở Bài Tập Toán 1',
  subtitle: 'Tập Một, Bài 1–34',
  menuLabel: 'Chọn bài để luyện tập:',
  unitWord: 'bài',
  // Bài "Tự kiểm tra" không có số bài.
  unitName: (u) => (typeof u.number === 'number' ? `Bài ${u.number}. ${u.title}` : u.title),
};

export function render(app, onBack) {
  renderWorkbook(app, onBack, WORKBOOK1_CONFIG);
}
