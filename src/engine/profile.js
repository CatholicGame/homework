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

/** { gender?: 'boy'|'girl', avatar?: 'boys/boy3', name?: string, grade?: 1–5 | -1 (Tiền tiểu học), setupDone?: true } */
export function getProfile() {
  try { return JSON.parse(localStorage.getItem(storeKey())) || {}; } catch { return {}; }
}

export function saveProfile(patch, { fromRemote = false } = {}) {
  const p = { ...getProfile(), ...patch, setupDone: true };
  try { localStorage.setItem(storeKey(), JSON.stringify(p)); } catch { /* storage unavailable */ }
  if (!fromRemote) window.dispatchEvent(new CustomEvent('tth:profile-changed'));
  return p;
}

/**
 * Đã xong bước thiết lập hồ sơ: đã chọn lớp (bắt buộc — trang chủ và bảng xếp hạng
 * dựa vào lớp); avatar và biệt danh thì có thể bỏ qua.
 */
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
