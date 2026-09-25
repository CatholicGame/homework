/**
 * Bé Học Vui Toán — Tiền tiểu học, Tập 1: Đếm và viết số (1–20).
 * Nội dung: preschool/data.js · engine chung: preschool/engine.js.
 */

import { renderPreschool } from './preschool/engine.js';
import { BOOK1 } from './preschool/data.js';

export function render(app, onBack) {
  renderPreschool(app, onBack, BOOK1);
}
