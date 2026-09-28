/**
 * Nối mỗi cấp trò chơi với bài học trong sách đang mở.
 * Chỉ để hiện thông tin "phù hợp nếu em đã học…" và dấu ✓ — không bao giờ khoá trò.
 *
 * level.lessons = { workbook: ['bai-31'], practice: ['tuan-13'] }
 * ctx (từ renderWorkbook): { book: 'workbook'|'practice', units, unitName, storageKey, openUnit }
 */

import { scopedKey } from '../../engine/auth.js';

export function lessonUnits(level, ctx) {
  const ids = level.lessons?.[ctx.book] || [];
  return ids.map(id => ctx.units.find(u => u.id === id)).filter(Boolean);
}

/** Bé đã làm (bấm "Kiểm tra" ít nhất một câu) bài nào trong danh sách chưa. */
export function hasDoneAny(level, ctx) {
  let data = {};
  try { data = JSON.parse(localStorage.getItem(scopedKey(ctx.storageKey))) || {}; } catch { /* storage unavailable */ }
  return lessonUnits(level, ctx).some(u => Object.values(data[u.id] || {}).some(rec => (rec?.attempts || 0) > 0));
}

/** "Bài 31. Gam" (short: "Bài 31") hoặc "Bài 9, 10, 11, 12" khi có nhiều bài. */
export function lessonText(level, ctx, { short = false } = {}) {
  const units = lessonUnits(level, ctx);
  if (!units.length) return '';
  if (units.length === 1 && !short) return ctx.unitName(units[0]);
  const word = ctx.book === 'practice' ? 'Tuần' : 'Bài';
  return `${word} ${units.map(u => u.number).join(', ')}`;
}

export const bookName = (ctx) => (ctx.book === 'practice' ? 'sách Luyện tập' : 'Vở bài tập');
