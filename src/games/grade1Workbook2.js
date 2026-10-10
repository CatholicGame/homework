/**
 * Lớp 1 — Vở bài tập Toán 1 (Tập Hai)
 * Nguồn: Vở bài tập Toán 1 — Tập hai (Lê Anh Vinh chủ biên), bộ sách "Kết nối tri thức
 * với cuộc sống" (NXB Giáo dục Việt Nam). Bài 21–41 (sách trang 4–108), mỗi bài chia theo Tiết.
 * Khác bộ sách với Tập Một (grade1Workbook.js) nên mã bài bai-21… trùng số: dùng kho tiến độ
 * và tiền tố sao riêng (g1w2-progress-v1, workbook1b).
 * Dùng chung engine/giao diện với Vở Bài Tập Toán 3 (grade3Workbook.js → renderWorkbook).
 * Nội dung từng bài nằm trong src/games/grade1Workbook2/*.js; mọi hình là SVG vẽ lại theo nét riêng
 * (src/assets/grade1-workbook-2, bộ vẽ scripts/redraw/g1t2_*.py).
 */

import { renderWorkbook } from './grade3Workbook.js';
import { BAI_21_22 } from './grade1Workbook2/bai21-22.js';
import { BAI_23_27 } from './grade1Workbook2/bai23-27.js';
import { BAI_28_31 } from './grade1Workbook2/bai28-31.js';
import { BAI_32_33 } from './grade1Workbook2/bai32-33.js';
import { BAI_34_37 } from './grade1Workbook2/bai34-37.js';
import { BAI_38_41 } from './grade1Workbook2/bai38-41.js';

export const UNITS = [...BAI_21_22, ...BAI_23_27, ...BAI_28_31, ...BAI_32_33, ...BAI_34_37, ...BAI_38_41];

const WORKBOOK1_TAP2_CONFIG = {
  units: UNITS,
  storageKey: 'g1w2-progress-v1',
  starBook: 'workbook1b',
  lastUnitKey: 'g1w2-last-unit',
  badge: '📗',
  title: 'Vở Bài Tập Toán 1',
  subtitle: 'Tập Hai, Bài 21–41',
  menuLabel: 'Chọn bài để luyện tập:',
  unitWord: 'bài',
  // Các dòng trả lời ngắn chia thành nhiều cột trên màn rộng, bé không phải cuộn (renderWorkbook autoColumns).
  autoColumns: true,
  unitName: (u) => `Bài ${u.number}. ${u.title}`,
};

export function render(app, onBack, { open } = {}) {
  renderWorkbook(app, onBack, { ...WORKBOOK1_TAP2_CONFIG, open });
}
