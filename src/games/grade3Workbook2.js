/**
 * Lớp 3 — Vở Bài Tập Toán 3 (Tập Hai)
 * Nguồn: Vở bài tập Toán 3 — Tập hai (Lê Anh Vinh chủ biên), bộ sách "Kết nối tri thức
 * với cuộc sống" (NXB Giáo dục Việt Nam). Bài 45–81 (đánh số tiếp Tập một), mỗi bài chia theo Tiết.
 * Dùng chung engine/giao diện với Tập Một (grade3Workbook.js → renderWorkbook).
 * Nội dung từng bài nằm trong src/games/grade3Workbook2/bai45-48.js … bai79-81.js.
 */

import { renderWorkbook } from './grade3Workbook.js';
import { BAI_45_48 } from './grade3Workbook2/bai45-48.js';
import { BAI_49_51 } from './grade3Workbook2/bai49-51.js';
import { BAI_52_54 } from './grade3Workbook2/bai52-54.js';
import { BAI_55_58 } from './grade3Workbook2/bai55-58.js';
import { BAI_59_62 } from './grade3Workbook2/bai59-62.js';
import { BAI_63_67 } from './grade3Workbook2/bai63-67.js';
import { BAI_68_71 } from './grade3Workbook2/bai68-71.js';
import { BAI_72_75 } from './grade3Workbook2/bai72-75.js';
import { BAI_76_78 } from './grade3Workbook2/bai76-78.js';
import { BAI_79_81 } from './grade3Workbook2/bai79-81.js';

const UNITS = [...BAI_45_48, ...BAI_49_51, ...BAI_52_54, ...BAI_55_58, ...BAI_59_62, ...BAI_63_67, ...BAI_68_71, ...BAI_72_75, ...BAI_76_78, ...BAI_79_81];

// Khoá sao dùng chung tiền tố 'workbook' với Tập Một (mã bài bai-45… không trùng).
const WORKBOOK_TAP2_CONFIG = {
  units: UNITS,
  storageKey: 'gw2-progress-v1',
  starBook: 'workbook',
  lastUnitKey: 'gw2-last-unit',
  badge: '📕',
  title: 'Vở Bài Tập Toán 3',
  subtitle: 'Tập Hai, Bài 45–81',
  menuLabel: 'Chọn bài để luyện tập:',
  unitWord: 'bài',
  unitName: (u) => `Bài ${u.number}. ${u.title}`,
};

export function render(app, onBack) {
  renderWorkbook(app, onBack, WORKBOOK_TAP2_CONFIG);
}
