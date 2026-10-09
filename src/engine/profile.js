/**
 * Hồ sơ của bé: bạn trai/bạn gái, avatar và biệt danh.
 *
 * Hỏi một lần sau lần đăng nhập đầu tiên; bé có thể bỏ qua và chỉnh lại sau
 * trong menu avatar. Lưu theo từng tài khoản trên máy, và đồng bộ lên Firebase
 * (leaderboard.js) để máy khác đăng nhập cùng tài khoản không phải hỏi lại.
 */

import { getCurrentUser } from './auth.js';

const byNumber = (files) => Object.entries(files)
  .map(([path, url]) => ({ id: path.match(/avatar\/(.+)\.png$/)[1], url }))
  .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

export const AVATARS = {
  boy: byNumber(import.meta.glob('../assets/sticker/avatar/boys/*.png', { eager: true, import: 'default' })),
  girl: byNumber(import.meta.glob('../assets/sticker/avatar/girls/*.png', { eager: true, import: 'default' })),
};

export const NAME_MAX = 20;

function storeKey() {
  return `tth_profile_${getCurrentUser()?.id || 'guest'}`;
}

/**
 * { gender?: 'boy'|'girl', avatar?: 'boys/boy3', name?: string, grade?: 1–5 | -1 (Tiền tiểu học), setupDone?: true,
 *   pendingPush?: true } — pendingPush: bé vừa sửa trên máy này mà chưa đưa lên Firebase được
 * (lúc đồng bộ thì bản trên máy thắng; không có cờ này thì bản trên Firebase — sửa ở máy khác — thắng).
 */
export function getProfile() {
  try { return JSON.parse(localStorage.getItem(storeKey())) || {}; } catch { return {}; }
}

export function saveProfile(patch, { fromRemote = false } = {}) {
  const p = { ...getProfile(), ...patch, setupDone: true };
  // Xác nhận của phụ huynh đi theo hồ sơ của mọi tài khoản trên máy này.
  if (!p.consentAt) {
    try { const at = JSON.parse(localStorage.getItem(CONSENT_KEY))?.at; if (at) p.consentAt = at; } catch { /* ignore */ }
  }
  if (fromRemote) delete p.pendingPush;
  else p.pendingPush = true;
  try { localStorage.setItem(storeKey(), JSON.stringify(p)); } catch { /* storage unavailable */ }
  if (!fromRemote) window.dispatchEvent(new CustomEvent('tth:profile-changed'));
  return p;
}

/** Đã đưa hồ sơ lên Firebase: bỏ cờ pendingPush (không báo đổi hồ sơ). */
export function markProfileSynced() {
  const p = getProfile();
  if (!p.pendingPush) return;
  delete p.pendingPush;
  try { localStorage.setItem(storeKey(), JSON.stringify(p)); } catch { /* storage unavailable */ }
}

/**
 * Đã xong bước thiết lập hồ sơ: đã chọn lớp (bắt buộc — trang chủ và bảng xếp hạng
 * dựa vào lớp); avatar và biệt danh thì có thể bỏ qua.
 */
/**
 * Vừa đăng nhập, tài khoản chưa có hồ sơ (trên máy lẫn Firebase) mà lúc dùng thử bé đã
 * chọn avatar/lớp → dùng luôn hồ sơ đó (đẩy lên Firebase), không hỏi lại.
 */
export function adoptGuestProfile() {
  const key = 'tth_profile_guest';
  if (!getCurrentUser()) return false;
  let guest = null;
  try { guest = JSON.parse(localStorage.getItem(key)); } catch { /* ignore */ }
  if (!guest?.setupDone || !guest.grade) return false;
  const { setupDone, pendingPush, ...rest } = guest;
  saveProfile(rest);
  try { localStorage.removeItem(key); } catch { /* ignore */ }
  return true;
}

// ── Xác nhận của phụ huynh (Nghị định 13/2023) ──────────────────────────────
// Hỏi một lần ở bước chọn avatar, lưu vĩnh viễn trên máy (không theo tài khoản, nên bé dùng thử
// rồi đăng nhập không phải hỏi lại) và ghi một bản lên Firebase consents/{uid} (leaderboard.js).
export const CONSENT_TEXT = 'Tôi xác nhận mình là cha, mẹ hoặc người giám hộ và đồng ý để iMath lưu kết quả học tập của con theo Nghị định 13/2023.';
const CONSENT_KEY = 'tth_parent_consent';

/** Thời điểm phụ huynh xác nhận (ms), null nếu chưa. */
export function parentConsentAt() {
  try {
    const at = JSON.parse(localStorage.getItem(CONSENT_KEY))?.at;
    if (at) return at;
  } catch { /* ignore */ }
  return getProfile().consentAt || null;
}

export function saveParentConsent() {
  const at = parentConsentAt() || Date.now();
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ at, text: CONSENT_TEXT })); } catch { /* storage unavailable */ }
  return at;
}

export function isSetupDone() {
  const p = getProfile();
  return !!p.setupDone && !!p.grade;
}

/** Lớp bé đang học (1–5, -1 = Tiền tiểu học), null nếu chưa chọn. */
export function getProfileGrade() {
  return getProfile().grade || null;
}

export function avatarUrl(id) {
  if (!id) return null;
  return [...AVATARS.boy, ...AVATARS.girl].find(a => a.id === id)?.url || null;
}

/** Tên hiển thị: tên bé tự đặt, nếu chưa có thì lấy chữ cuối trong tên tài khoản Google. */
export function displayName() {
  const p = getProfile();
  if (p.name) return p.name;
  const full = (getCurrentUser()?.name || '').trim();
  return full.split(/\s+/).pop() || 'bạn';
}
