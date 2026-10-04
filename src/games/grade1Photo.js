/**
 * 📷 Bé Chụp Ảnh Chim (Lớp 1) — chụp ảnh đàn chim rồi chạm đếm, đếm theo chục đến 100.
 * Nội dung: preschool/data5.js (BOOK5_G1) · engine chung của Tiền tiểu học: preschool/engine.js · dạng chơi: preschool/play5.js.
 */

import { renderPreschool } from './preschool/engine.js';
import { BOOK5_G1 } from './preschool/data5.js';

export function render(app, onBack) {
  renderPreschool(app, onBack, BOOK5_G1);
}
