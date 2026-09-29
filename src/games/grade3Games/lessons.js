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

/**
 * "Bài 31. Gam" (short: "Bài 31") hoặc "Bài 9, 10, 11, 12" khi có nhiều bài.
 * Bài không có trong thẻ sách đang mở (lớp 2: Bài 39 ở Tập Hai, mở trò từ Tập Một) vẫn ghi số, đọc từ mã 'bai-39'.
 */
export function lessonText(level, ctx, { short = false } = {}) {
  return unitsText(level.lessons?.[ctx.book] || [], ctx, { short });
}

/** Như lessonText nhưng gộp mọi cấp của một quầy (thẻ chọn quầy): "Bài 39, 40". */
export function stallLessonText(levels, ctx) {
  const ids = [...new Set(levels.flatMap(l => l.lessons?.[ctx.book] || []))];
  return unitsText(ids, ctx, { short: true });
}

function unitsText(ids, ctx, { short }) {
  const found = ids.map(id => ctx.units.find(u => u.id === id));
  if (found.length === 1 && found[0] && !short) return ctx.unitName(found[0]);
  const nums = ids.map((id, i) => found[i]?.number ?? Number(id.match(/-(\d+)$/)?.[1])).filter(Boolean).sort((a, b) => a - b);
  if (!nums.length) return '';
  const word = ctx.book === 'practice' ? 'Tuần' : 'Bài';
  return `${word} ${nums.join(', ')}`;
}

export const bookName = (ctx) => (ctx.book === 'practice' ? 'sách Luyện tập' : 'Vở bài tập');
