/**
 * Vở Bài Tập Toán 2 — Tập Một (Bài 1–36): nội dung câu hỏi Việt → Anh.
 * Mỗi tệp trong ./grade2Workbook/ ứng với một tệp dữ liệu src/games/grade2Workbook/baiXX-YY.js.
 * Cách đọc số ("hai mươi lăm") không cần ghi: engine/i18n.js tự đổi.
 */

import SVG from './grade2WorkbookSvg.js';

const parts = import.meta.glob('./grade2Workbook/*.js', { eager: true, import: 'default' });

export default {
  entries: Object.assign({}, ...Object.values(parts)),
  svg: SVG, // chữ vẽ trong hình
};
