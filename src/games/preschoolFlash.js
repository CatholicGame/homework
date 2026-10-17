/**
 * 🃏 Thẻ chữ cái (Tiền tiểu học) — 29 thẻ chữ cái tiếng Việt: lật thẻ, tìm chữ trong tên hình, ghép chữ với hình.
 * Nội dung: preschool/data6.js (BOOK6) · engine chung: preschool/engine.js · dạng chơi: preschool/play6.js.
 */

import { renderPreschool } from './preschool/engine.js';
import { BOOK6 } from './preschool/data6.js';

export function render(app, onBack) {
  renderPreschool(app, onBack, BOOK6);
}
