/**
 * Hệ thống sao — phần thưởng ảo.
 *
 * Mỗi bài tập có độ khó 1–5 sao (bảng STAR_RATINGS, khoá `sách:bài:câu`).
 * Giải đúng một bài lần đầu sẽ nhận sao của bài đó; làm lại (kể cả sau khi
 * "làm lại từ đầu") không nhận thêm, nên không thể "cày" sao.
 * Luật sao: mỗi lần "Kiểm tra" sai trước khi giải đúng thì bài đó bớt 1 sao, nhưng
 * luôn còn ít nhất MIN_STARS — không bao giờ trừ vào sao đã nhận. Số lần sai lưu trong
 * sổ sao (không bị xoá khi "làm lại từ đầu").
 * Sổ sao lưu theo từng tài khoản đăng nhập (sau này đồng bộ lên Google Drive).
 */

import { getCurrentUser } from './auth.js';
import { STAR_RATINGS } from '../data/starRatings.js';
import { recordSolve, dayKey, weekKey, monthKey } from './activity.js';
import { recordSolveForSpin, showSpinToast } from './stickers.js';

export const MAX_STARS = 5;
export const MIN_STARS = 1;

function ledgerKey() {
  return `tth_stars_${getCurrentUser()?.id || 'guest'}`;
}

/**
 * { earned: { key: sao }, at: { key: 'YYYY-MM-DD' }, wrong: { key: số lần sai } } — `at` là
 * ngày nhận sao (dùng cho bảng xếp hạng ngày/tuần/tháng; bài cộng bù từ trước không có ngày);
 * `wrong` chỉ giữ các bài chưa nhận sao.
 */
function loadLedger() {
  try {
    const d = JSON.parse(localStorage.getItem(ledgerKey()));
    if (d && d.earned) return { at: {}, wrong: {}, ...d };
  } catch { /* ignore */ }
  return { earned: {}, at: {}, wrong: {} };
}

function saveLedger(d) {
  try { localStorage.setItem(ledgerKey(), JSON.stringify(d)); } catch { /* storage unavailable */ }
}

/**
 * Dự phòng cho câu mới chưa có trong bảng xếp hạng: ước lượng theo dạng bài.
 */
function estimateStars(q) {
  if (!q) return 2;
  if (q.wordProblem) return 4;
  const answers = (q.blanks?.length || 0) + (q.rows?.length || 0) + (q.pairs?.length || 0) + (q.tables?.length || 0) * 4;
  let s = answers <= 2 ? 1 : answers <= 8 ? 2 : 3;
  if (q.img) s++;
  return Math.min(MAX_STARS, Math.max(1, s));
}

/** Số sao (1–5) của một bài tập. */
export function getQuestionStars(key, q) {
  const r = STAR_RATINGS[key];
  return r >= 1 && r <= MAX_STARS ? r : estimateStars(q);
}

/** Số sao còn nhận được nếu giải đúng bài này bây giờ (đã trừ các lần sai). */
export function availableStars(key, q) {
  const n = getQuestionStars(key, q);
  return Math.max(Math.min(MIN_STARS, n), n - (loadLedger().wrong[key] || 0));
}

/**
 * Ghi một lần "Kiểm tra" sai. Trả về số sao còn nhận được, hoặc null nếu bài đã
 * nhận sao từ trước (làm lại thì không tính).
 */
export function recordWrong(key, q) {
  const d = loadLedger();
  if (key in d.earned) return null;
  d.wrong[key] = (d.wrong[key] || 0) + 1;
  saveLedger(d);
  return availableStars(key, q);
}

/** Lời nhắc sau một lần sai: số sao còn nhận được. */
export function wrongStarsText(left, key, q) {
  if (left == null) return '';
  return left < getQuestionStars(key, q) && left <= MIN_STARS
    ? `Làm đúng vẫn nhận ${left} ⭐ nhé!`
    : `Làm đúng sẽ nhận ${left} ⭐.`;
}

/** Luật sao hiện trên câu chưa nhận sao, trước khi bé trả lời. */
export function renderStarRule(key, q) {
  const d = loadLedger();
  if (key in d.earned) return '';
  const full = getQuestionStars(key, q);
  const left = availableStars(key, q);
  const text = left < full
    ? `Còn nhận được <strong>${left} ⭐</strong> (đã sai ${d.wrong[key] || 0} lần${left <= MIN_STARS ? '' : `, sai nữa bớt 1 ⭐`})`
    : full > MIN_STARS
      ? `Đúng ngay lần đầu: <strong>${full} ⭐</strong> · mỗi lần sai bớt 1 ⭐ (còn ít nhất ${MIN_STARS} ⭐)`
      : `Làm đúng: <strong>${full} ⭐</strong>`;
  return `<div class="star-rule">🎯 ${text}</div>`;
}

/** Bài này đã được nhận sao chưa. */
export function hasEarned(key) {
  return key in loadLedger().earned;
}

/** Số sao đã nhận ở một bài (0 nếu chưa). */
export function earnedFor(key) {
  return loadLedger().earned[key] || 0;
}

// Tiền tố khoá sao của từng sách → lớp (1–5). Thêm sách mới thì thêm một dòng.
const BOOK_GRADE = { exam: 3, workbook: 3, practice: 3, workbook2: 2 };

/**
 * Sao của một lớp theo từng khoảng thời gian (giờ máy):
 * { all, day: { key, stars }, week: { key, stars }, month: { key, stars } }.
 */
export function getGradePeriodStars(grade) {
  const now = new Date();
  const keys = { day: dayKey(now), week: weekKey(now), month: monthKey(now) };
  const out = { all: 0, day: { key: keys.day, stars: 0 }, week: { key: keys.week, stars: 0 }, month: { key: keys.month, stars: 0 } };
  const { earned, at } = loadLedger();
  for (const [key, n] of Object.entries(earned)) {
    if (BOOK_GRADE[key.split(':')[0]] !== grade) continue;
    out.all += n;
    const day = at[key];
    if (!day) continue;
    if (day === keys.day) out.day.stars += n;
    if (day >= keys.week) out.week.stars += n; // tuần hiện tại: từ thứ Hai tới nay
    if (day.startsWith(keys.month)) out.month.stars += n;
  }
  return out;
}

/** Sao đã nhận theo từng lớp: { 3: 120, … } (chỉ gồm lớp có sao). */
export function getStarsByGrade() {
  const out = {};
  for (const [key, n] of Object.entries(loadLedger().earned)) {
    const g = BOOK_GRADE[key.split(':')[0]];
    if (g) out[g] = (out[g] || 0) + n;
  }
  return out;
}

/** Tổng số sao của người dùng hiện tại. */
export function getTotalStars() {
  return Object.values(loadLedger().earned).reduce((s, n) => s + n, 0);
}

/**
 * Trao sao khi giải đúng. Trả về số sao vừa nhận (0 nếu bài đã nhận trước đó).
 * `silent`: ghi sổ mà không hiện hiệu ứng (dùng khi cộng bù cho bài đã giải từ trước).
 */
export function awardStars(key, q, { silent = false } = {}) {
  const d = loadLedger();
  if (key in d.earned) return 0;
  const n = availableStars(key, q);
  d.earned[key] = n;
  delete d.wrong[key];
  if (!silent) d.at[key] = dayKey();
  saveLedger(d);
  window.dispatchEvent(new CustomEvent('tth:stars-changed'));
  if (!silent) {
    recordSolve(n);
    showStarToast(n);
    // Cứ đủ 5 bài thì được 1 lượt quay sticker (báo sau khi hiệu ứng sao bay xong).
    if (recordSolveForSpin()) setTimeout(showSpinToast, 1200);
  }
  return n;
}

// Sổ tiến trình cũ của từng sách: khoá localStorage → tiền tố khoá sao.
const LEGACY_PROGRESS = { 'gw-progress-v1': 'workbook', 'gp-progress-v1': 'practice', 'g2w-progress-v1': 'workbook2', 'g2w2-progress-v1': 'workbook2' };

/**
 * Cộng bù (không hiệu ứng) sao cho những bài đã giải từ trước khi có hệ thống sao.
 * Gọi khi khởi động; bài đã có trong sổ sao sẽ được bỏ qua.
 */
export function creditLegacyProgress() {
  const d = loadLedger();
  let changed = false;
  for (const [storageKey, book] of Object.entries(LEGACY_PROGRESS)) {
    let data;
    try { data = JSON.parse(localStorage.getItem(storageKey)) || {}; } catch { continue; }
    for (const [unitId, recs] of Object.entries(data)) {
      for (const [idx, rec] of Object.entries(recs || {})) {
        const key = `${book}:${unitId}:${idx}`;
        if (rec?.solved && !(key in d.earned)) {
          d.earned[key] = getQuestionStars(key, null);
          changed = true;
        }
      }
    }
  }
  if (changed) saveLedger(d);
}

/**
 * Chuỗi HTML hiển thị độ khó: ★★★☆☆ (tô vàng nếu đã nhận).
 * `avail` < n: các sao đã mất do trả lời sai hiện mờ; `got`: số sao đã nhận thực tế.
 */
export function renderStarRating(n, earned = false, { avail = n, got = n } = {}) {
  const keep = earned ? Math.min(got, n) : Math.min(avail, n);
  const full = '★'.repeat(keep), lost = '★'.repeat(n - keep), empty = '☆'.repeat(MAX_STARS - n);
  const title = earned
    ? `Đã nhận ${keep}/${n} sao`
    : keep < n ? `Độ khó ${n} sao — còn nhận được ${keep} sao` : `Độ khó: ${n}/${MAX_STARS} sao — giải đúng để nhận ${n} sao`;
  return `<span class="star-rating${earned ? ' star-rating-earned' : ''}" title="${title}" aria-label="${title}"><span class="star-full">${full}</span><span class="star-lost">${lost}</span><span class="star-empty">${empty}</span></span>`;
}

/** Hiệu ứng "+3 ⭐" bay lên giữa màn hình. */
export function showStarToast(n) {
  if (!n) return;
  const el = document.createElement('div');
  el.className = 'star-toast';
  el.innerHTML = `<span class="star-toast-num">+${n}</span><span class="star-toast-icon">⭐</span>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}

/** Thanh sao của một câu theo trạng thái hiện tại: đã nhận / còn nhận được bao nhiêu. */
export function renderQuestionStars(key, q) {
  const got = earnedFor(key);
  return renderStarRating(getQuestionStars(key, q), got > 0, { avail: availableStars(key, q), got });
}

/** Vẽ lại thanh sao và luật sao của câu đang mở (sau khi sai hoặc vừa nhận sao). */
export function refreshQuestionStars(root, key, q) {
  const rating = root.querySelector('.e3-q-num .star-rating');
  if (rating) rating.outerHTML = renderQuestionStars(key, q);
  const rule = root.querySelector('.star-rule');
  if (rule) {
    const html = renderStarRule(key, q);
    if (html) rule.outerHTML = html; else rule.remove();
  }
}
