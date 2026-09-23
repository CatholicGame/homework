/**
 * Hệ thống sao — phần thưởng ảo.
 *
 * Mỗi bài tập có độ khó 1–5 sao (bảng STAR_RATINGS, khoá `sách:bài:câu`).
 * Giải đúng một bài lần đầu sẽ nhận đủ số sao của bài đó; làm lại (kể cả sau khi
 * "làm lại từ đầu") không nhận thêm, nên không thể "cày" sao.
 * Sổ sao lưu theo từng tài khoản đăng nhập (sau này đồng bộ lên Google Drive).
 */

import { getCurrentUser } from './auth.js';
import { STAR_RATINGS } from '../data/starRatings.js';

export const MAX_STARS = 5;

function ledgerKey() {
  return `tth_stars_${getCurrentUser()?.id || 'guest'}`;
}

function loadLedger() {
  try {
    const d = JSON.parse(localStorage.getItem(ledgerKey()));
    if (d && d.earned) return d;
  } catch { /* ignore */ }
  return { earned: {} };
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

/** Bài này đã được nhận sao chưa. */
export function hasEarned(key) {
  return key in loadLedger().earned;
}

/** Số sao đã nhận ở một bài (0 nếu chưa). */
export function earnedFor(key) {
  return loadLedger().earned[key] || 0;
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
  const n = getQuestionStars(key, q);
  d.earned[key] = n;
  saveLedger(d);
  if (!silent) showStarToast(n);
  return n;
}

// Sổ tiến trình cũ của từng sách: khoá localStorage → tiền tố khoá sao.
const LEGACY_PROGRESS = { 'gw-progress-v1': 'workbook', 'gp-progress-v1': 'practice' };

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

/** Chuỗi HTML hiển thị độ khó: ★★★☆☆ (tô vàng nếu đã nhận). */
export function renderStarRating(n, earned = false) {
  const full = '★'.repeat(n), empty = '☆'.repeat(MAX_STARS - n);
  const title = earned ? `Đã nhận ${n} sao` : `Độ khó: ${n}/${MAX_STARS} sao — giải đúng để nhận ${n} sao`;
  return `<span class="star-rating${earned ? ' star-rating-earned' : ''}" title="${title}" aria-label="${title}"><span class="star-full">${full}</span><span class="star-empty">${empty}</span></span>`;
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
