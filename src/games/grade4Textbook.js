/**
 * Lớp 4 — Sách giáo khoa Toán 4 (NXB Giáo dục Việt Nam, tái bản lần thứ sáu, 2011), 175 bài, sách trang 3–179.
 * Nguồn: docs/lop_4/Sách giáo khoa Toán 4.pdf (bản quét; chỉ số trang 0-based = trang sách).
 * Dùng chung engine/giao diện với Vở Bài Tập Toán 3 (grade3Workbook.js → renderWorkbook). Mục lục: grade4Textbook/catalog.js.
 * Câu hỏi của từng nhóm bài nằm trong src/games/grade4Textbook/b*.js (export QUESTIONS = { 'bai-N': [câu, …] }).
 * Phép tính số lớn (cộng, trừ, nhân, chia đặt tính) có nút "✍️ Tính" mở tờ vở đặt tính của Luyện Tính
 * (engine/calcPlay.js); bé tự ghi kết quả. Mọi hình vẽ lại bằng SVG nét riêng (src/assets/grade4-textbook,
 * bộ vẽ scripts/redraw/g4t_*.py). Sao ghi ngay trong câu (q.stars), nhóm sao 'textbook4'.
 */

import { renderWorkbook } from './grade3Workbook.js';
import { CATALOG } from './grade4Textbook/catalog.js';

const files = import.meta.glob('./grade4Textbook/b*.js', { eager: true });
const QUESTIONS = Object.assign({}, ...Object.values(files).map(m => m.QUESTIONS || {}));

// Chỉ hiện bài đã có câu hỏi (bài chỉ có phần bài học, không có bài tập, không có trong danh sách).
export const UNITS = CATALOG.map(c => ({ ...c, questions: QUESTIONS[c.id] || [] })).filter(u => u.questions.length);

const TEXTBOOK4_CONFIG = {
  units: UNITS,
  storageKey: 'g4s-progress-v1',
  starBook: 'textbook4',
  lastUnitKey: 'g4s-last-unit',
  badge: '📖',
  title: 'Sách Toán 4',
  subtitle: 'Sách giáo khoa Toán 4, bài 1–175 (trang 3–179)',
  menuLabel: 'Chọn bài để luyện tập:',
  unitWord: 'bài',
  unitName: (u) => `${u.title} · trang ${u.page}`,
};

export function render(app, onBack) {
  renderWorkbook(app, onBack, TEXTBOOK4_CONFIG);
}
