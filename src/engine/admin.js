/**
 * Dữ liệu cho trang admin (#admin): danh sách học sinh đã đăng ký.
 *
 * Gộp ba nguồn trên Firestore theo uid Firebase:
 *   users/{uid}       — sổ đăng ký (email, tên, ngày đăng ký, lần cuối mở app)
 *   profiles/{uid}    — hồ sơ bé (biệt danh, lớp, avatar)
 *   leaderboard/{uid} — tổng số sao
 * Bé đăng nhập trước khi có sổ đăng ký chỉ có ở profiles/leaderboard: vẫn được đếm,
 * nhưng chưa có email và ngày đăng ký cho tới lần mở app tiếp theo.
 *
 * Quyền đọc do firestore.rules quyết định (isAdmin) — danh sách email dưới đây chỉ để
 * ẩn/hiện trang, phải giữ khớp với rules.
 */

import { getCurrentUser } from './auth.js';
import { firebaseSession } from './leaderboard.js';

export const ADMIN_EMAILS = ['hapagonmolie@gmail.com'];

export function isAdminUser() {
  const email = getCurrentUser()?.email?.trim().toLowerCase();
  return !!email && ADMIN_EMAILS.includes(email);
}

const toMs = (ts) => (ts?.toMillis ? ts.toMillis() : 0);

/**
 * @returns {Promise<Array<{ uid, email, name, nickname, avatar, grade, stars, createdAt, lastSeenAt, registered }>>}
 *   Ném lỗi 'need-connect' nếu cần bấm kết nối Firebase.
 */
export async function fetchStudents() {
  const fb = await firebaseSession();
  if (!fb) throw new Error('need-connect');
  const { db, fs } = fb;
  const [users, profiles, board] = await Promise.all(
    ['users', 'profiles', 'leaderboard'].map(c => fs.getDocs(fs.collection(db, c))),
  );

  const byUid = new Map();
  const row = (uid) => {
    if (!byUid.has(uid)) {
      byUid.set(uid, { uid, email: '', name: '', nickname: '', avatar: '', grade: 0, stars: 0,
        createdAt: 0, lastSeenAt: 0, registered: false });
    }
    return byUid.get(uid);
  };

  users.forEach((d) => {
    const u = d.data();
    Object.assign(row(d.id), {
      email: u.email || '', name: u.name || '', grade: u.grade || 0,
      createdAt: toMs(u.createdAt), lastSeenAt: toMs(u.lastSeenAt), registered: true,
    });
  });
  // Hồ sơ mới hơn sổ đăng ký (sổ chỉ ghi 1 lần/ngày) nên lớp lấy từ hồ sơ.
  profiles.forEach((d) => {
    const p = d.data();
    const r = row(d.id);
    r.nickname = p.name || r.nickname;
    r.avatar = p.avatar || r.avatar;
    r.grade = p.grade || r.grade;
    r.lastSeenAt = Math.max(r.lastSeenAt, toMs(p.updatedAt));
  });
  board.forEach((d) => {
    const b = d.data();
    const r = row(d.id);
    r.nickname = r.nickname || b.nickname || '';
    r.avatar = r.avatar || b.avatar || '';
    r.grade = r.grade || b.grade || 0;
    r.stars = b.totalStars || 0;
    r.lastSeenAt = Math.max(r.lastSeenAt, toMs(b.updatedAt));
  });

  return [...byUid.values()];
}
