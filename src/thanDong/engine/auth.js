/**
 * Người dùng cho trường quay (net.js, quizDev, nameTag): tài khoản homework, tên lấy tên bé trong hồ sơ (profile.js) trước tên Google.
 * Khách chưa đăng nhập: id rỗng (máy chủ phòng không gộp hai máy làm một người), tên theo hồ sơ.
 */
import { getCurrentUser as hwUser } from '../../engine/auth.js';
import { getProfile } from '../../engine/profile.js';

export function getCurrentUser() {
  const u = hwUser(), name = getProfile()?.name || '';
  if (!u) return name ? { id: '', email: '', name } : null;
  return { ...u, name: name || u.name || '' };
}
