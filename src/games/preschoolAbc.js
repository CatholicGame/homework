/**
 * Làm quen chữ cái — Tiền tiểu học: bảng chữ cái, chữ ghép, dấu thanh (bé tô chữ theo nét).
 * Nội dung: preschool/data3.js · engine chung: preschool/engine.js.
 */

import { renderPreschool } from './preschool/engine.js';
import { BOOK3 } from './preschool/data3.js';

export function render(app, onBack) {
  renderPreschool(app, onBack, BOOK3);
}
