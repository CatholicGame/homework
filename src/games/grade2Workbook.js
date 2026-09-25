/**
 * Lớp 2 — Vở bài tập Toán 2 (Tập Một)
 * Nguồn: Vở bài tập Toán 2 — Tập một (Lê Anh Vinh chủ biên), bộ sách "Kết nối tri thức
 * với cuộc sống" (NXB Giáo dục Việt Nam). Bài 1–36, mỗi bài chia theo Tiết.
 * Tập Hai (Bài 37–75) là card riêng: grade2Workbook2.js.
 * Dùng chung engine/giao diện với Vở Bài Tập Toán 3 (grade3Workbook.js → renderWorkbook).
 * Nội dung từng bài nằm trong src/games/grade2Workbook/*.js.
 */

import { renderWorkbook } from './grade3Workbook.js';
import { BAI_1_6 } from './grade2Workbook/bai01-06.js';
import { BAI_7_12 } from './grade2Workbook/bai07-12.js';
import { BAI_13_18 } from './grade2Workbook/bai13-18.js';
import { BAI_19_24 } from './grade2Workbook/bai19-24.js';
import { BAI_25_30 } from './grade2Workbook/bai25-30.js';
import { BAI_31_36 } from './grade2Workbook/bai31-36.js';

const UNITS = [...BAI_1_6, ...BAI_7_12, ...BAI_13_18, ...BAI_19_24, ...BAI_25_30, ...BAI_31_36];

const WORKBOOK2_TAP1_CONFIG = {
  units: UNITS,
  storageKey: 'g2w-progress-v1',
  starBook: 'workbook2',
  lastUnitKey: 'g2w-last-unit',
  badge: '📒',
  title: 'Vở Bài Tập Toán 2',
  subtitle: 'Tập Một — Kết nối tri thức với cuộc sống',
  menuLabel: 'Chọn bài để luyện tập:',
  unitWord: 'bài',
  unitName: (u) => `Bài ${u.number}. ${u.title}`,
  note: 'Nguồn: Vở bài tập Toán 2 — Tập một, bộ sách Kết nối tri thức với cuộc sống (NXB Giáo dục Việt Nam).',
};

export function render(app, onBack) {
  renderWorkbook(app, onBack, WORKBOOK2_TAP1_CONFIG);
}
