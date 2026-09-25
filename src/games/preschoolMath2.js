/**
 * Bé Học Vui Toán — Tiền tiểu học, Tập 2: So sánh (bằng nhau, nhiều hơn – ít hơn, dấu > < =).
 * Nội dung: preschool/data2.js · engine chung: preschool/engine.js.
 */

import { renderPreschool } from './preschool/engine.js';
import { BOOK2 } from './preschool/data2.js';

export function render(app, onBack) {
  renderPreschool(app, onBack, BOOK2);
}
