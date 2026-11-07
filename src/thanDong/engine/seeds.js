/**
 * "Hạt giống" của kinh-thanh đổi thành SAO của homework (engine/stars.js): mọi sao bé nhận ở mọi sách là Mùa gặt (`harvest`, không
 * bao giờ giảm), Giỏ sao (`basket`) = tổng sao − sao đã đổi đồ trong Vật phẩm / Tủ đồ (bag.paid).
 * Trường quay ghi sao vào sổ sao chung với khoá `thandong<lớp>:…` (BOOK_GRADE trong stars.js): bảng xếp hạng, bản đồ kiến thức,
 * hoạt động trong ngày đều thấy.
 *   - ghế nóng: HOT[số câu đã vượt] sao (luật mốc 5 / 10 ở quiz/rules.js), một lần mỗi lượt (`hot:<id lượt>`)
 *   - khán giả trả lời đúng: 1 sao một câu, tối đa SEED.quizMax câu mỗi ngày
 */
import { loadBag, saveBag } from './progress.js';
import { getTotalStars, awardFixedStars } from '../../engine/stars.js';
import { hotKeep } from '../quiz/rules.js';

export const SEED = { quizMax: 15, actsMax: 0 };
export { HOT, MILESTONES, hotKeep } from '../quiz/rules.js';

/** Cấp bậc theo tổng số sao (Tủ đồ: món `need: { level }`). */
export const LEVELS = [
  { at: 0, vi: 'Hạt mầm toán học', en: 'Seedling' },
  { at: 50, vi: 'Chồi non chăm chỉ', en: 'Sprout' },
  { at: 150, vi: 'Học trò ham học', en: 'Keen pupil' },
  { at: 300, vi: 'Bạn nhỏ tinh nhanh', en: 'Quick thinker' },
  { at: 600, vi: 'Nhà toán học nhí', en: 'Little mathematician' },
  { at: 1000, vi: 'Ngôi sao của lớp', en: 'Class star' },
  { at: 1600, vi: 'Ngôi sao của trường', en: 'School star' },
  { at: 2500, vi: 'Thần đồng nhí', en: 'Young prodigy' },
  { at: 4000, vi: 'Thần đồng', en: 'Prodigy' },
  { at: 6000, vi: 'Siêu thần đồng', en: 'Super prodigy' },
];
export function levelOf(h) {
  let i = 0;
  while (i + 1 < LEVELS.length && h >= LEVELS[i + 1].at) i++;
  const cur = LEVELS[i], next = LEVELS[i + 1] || null;
  return { i, ...cur, next, k: next ? (h - cur.at) / (next.at - cur.at) : 1 };
}

let grade = 3;
/** Lớp của trường quay đang mở (khoá sao thandong<lớp>). */
export const setGrade = (g) => { grade = [1, 2, 3, 4, 5].includes(+g) ? +g : 3; };
export const vnToday = (ms = Date.now()) => new Date(ms + 7 * 3600e3).toISOString().slice(0, 10);

const sum = (o) => Object.values(o || {}).reduce((a, n) => a + (Number.isInteger(n) && n > 0 ? n : 0), 0);
export const harvest = () => getTotalStars();
export const spent = (b = loadBag()) => sum(b.paid);
export const basket = () => Math.max(0, harvest() - spent());
export function seedState() {
  const h = harvest();
  return { harvest: h, basket: basket(), level: levelOf(h), parts: {}, streak: 0 };
}

function gain(n, why, from = null) {
  if (n > 0) window.dispatchEvent(new CustomEvent('kt:hat', { detail: { gain: n, why, from } }));
  return n;
}

/** Trường quay không điểm danh (homework không có): 0 sao. */
export const checkIn = () => 0;

/** Khán giả trả lời đúng: true nếu còn được tính sao hôm nay (tối đa SEED.quizMax câu). */
export function quizRight() {
  const d = vnToday(), b = loadBag();
  const c = (b.quiz?.[d] || 0) + 1;
  b.quiz = { [d]: c };   // chỉ giữ hôm nay
  saveBag(b);
  if (c > SEED.quizMax) return false;
  gain(awardFixedStars(`thandong${grade}:aud:${d}:${c}`, 1, { toast: false }), 'quiz');
  return true;
}

/** Ghế nóng hết lượt: id lượt (duy nhất), passed câu đã vượt, stop tự dừng. Trả số sao mang về. */
export function hotSeat(id, passed, { stop = false, from = null, nick = '' } = {}) {
  const stars = hotKeep(passed, stop), at = Date.now();
  const kept = stop || passed >= 10 ? passed : 0;   // giấy khen từ câu 10
  const b = loadBag();
  if (b.hot?.[id]) return stars;
  b.hot = { ...(b.hot || {}), [id]: { passed, stars, stop: !!stop, at, grade } };
  if (kept >= 10) b.certs = { ...(b.certs || {}), [id]: { passed: kept, seeds: stars, at, grade, nick: String(nick || '').slice(0, 24) } };
  saveBag(b);
  if (stars > 0) gain(awardFixedStars(`thandong${grade}:hot:${id}`, stars, { toast: false }), 'hot', from);
  return stars;
}

/** Giấy khen đã nhận: [{ id, passed, seeds, at, nick, grade }], cao nhất (rồi mới nhất) trước. */
export const certs = () => Object.entries(loadBag().certs || {}).map(([id, c]) => ({ id, ...c }))
  .sort((a, b) => b.passed - a.passed || b.at - a.at);
