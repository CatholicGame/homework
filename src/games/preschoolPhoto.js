/**
 * 📷 Bé Chụp Ảnh Chim (Tiền tiểu học) — chụp ảnh đàn chim rồi chạm đếm.
 * Nội dung: preschool/data5.js (BOOK5) · engine chung: preschool/engine.js · dạng chơi: preschool/play5.js.
 */

import { renderPreschool } from './preschool/engine.js';
import { BOOK5 } from './preschool/data5.js';

export function render(app, onBack) {
  renderPreschool(app, onBack, BOOK5);
}
