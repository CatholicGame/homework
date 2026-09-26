/**
 * Bé Tập Làm Toán — 99 đề toán cho trẻ mẫu giáo (Tiền tiểu học, chuẩn bị vào lớp 1).
 * Nội dung: preschool/data4.js · engine chung: preschool/engine.js · dạng chơi riêng: preschool/play4.js.
 */

import { renderPreschool } from './preschool/engine.js';
import { BOOK4 } from './preschool/data4.js';

export function render(app, onBack) {
  renderPreschool(app, onBack, BOOK4);
}
