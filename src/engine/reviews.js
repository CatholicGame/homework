/**
 * Đánh giá ứng dụng (1–5 sao + cảm nhận) — lưu trên Firestore `reviews/{firebaseUid}`:
 *   { rating, comment, name, avatar, grade, createdAt, updatedAt, reply?: { message, updatedAt } }
 * Mỗi tài khoản một đánh giá: gửi lại là sửa đánh giá cũ. Ai đăng nhập cũng xem được.
 * `reply` là phản hồi của admin (trang #admin), bé không sửa được (firestore.rules).
 */

import { firebaseSession } from './leaderboard.js';
import { getProfile, getProfileGrade } from './profile.js';

const COLLECTION = 'reviews';
const FETCH_LIMIT = 500;
export const NAME_MAX = 40;
export const COMMENT_MAX = 1000;
export const REPLY_MAX = 1000;

const toMs = (ts) => (ts?.toMillis ? ts.toMillis() : 0);

async function session() {
  const fb = await firebaseSession();
  if (!fb) throw new Error('need-connect');
  return fb;
}

function toReview(d) {
  const r = d.data();
  return {
    id: d.id,
    rating: r.rating,
    comment: r.comment || '',
    name: r.name || '',
    avatar: r.avatar || '',
    grade: r.grade || 0,
    createdAt: toMs(r.createdAt),
    updatedAt: toMs(r.updatedAt) || Date.now(), // serverTimestamp chưa về khi vừa ghi
    reply: r.reply?.message ? { message: r.reply.message, updatedAt: toMs(r.reply.updatedAt) } : null,
  };
}

/**
 * Tất cả đánh giá (mới nhất trước) và đánh giá của chính bé.
 * @returns {Promise<{ reviews: Array, mine: object|null }>} — ném 'need-connect' nếu cần kết nối Firebase.
 */
export async function fetchReviews() {
  const { db, fs, auth } = await session();
  const snap = await fs.getDocs(fs.query(fs.collection(db, COLLECTION), fs.orderBy('updatedAt', 'desc'), fs.limit(FETCH_LIMIT)));
  const reviews = snap.docs.map(toReview);
  const mine = reviews.find(r => r.id === auth.currentUser?.uid) || null;
  return { reviews, mine };
}

/** Gửi hoặc sửa đánh giá của mình. */
export async function submitReview({ rating, comment, name }) {
  const { db, fs, auth } = await session();
  const ref = fs.doc(db, COLLECTION, auth.currentUser.uid);
  const grade = getProfileGrade();
  const data = {
    rating,
    comment: String(comment || '').trim().slice(0, COMMENT_MAX),
    name: String(name || '').trim().slice(0, NAME_MAX),
    avatar: getProfile().avatar || '',
    grade: typeof grade === 'number' ? grade : 0,
    updatedAt: fs.serverTimestamp(),
  };
  // update giữ nguyên createdAt và phản hồi của admin; lần đầu thì tạo mới.
  const existing = await fs.getDoc(ref);
  if (existing.exists()) await fs.updateDoc(ref, data);
  else await fs.setDoc(ref, { ...data, createdAt: fs.serverTimestamp() });
}

// ── Admin ────────────────────────────────────────────────────────────────────

/** Ghi (hoặc xoá, nếu message rỗng) phản hồi của admin cho một đánh giá. */
export async function replyReview(id, message) {
  const { db, fs } = await session();
  const text = String(message || '').trim().slice(0, REPLY_MAX);
  await fs.updateDoc(fs.doc(db, COLLECTION, id), {
    reply: text ? { message: text, updatedAt: fs.serverTimestamp() } : fs.deleteField(),
  });
}

export async function deleteReview(id) {
  const { db, fs } = await session();
  await fs.deleteDoc(fs.doc(db, COLLECTION, id));
}

/** { count, average, distribution: { 1..5: số lượt } } */
export function reviewStats(reviews) {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let sum = 0;
  reviews.forEach((r) => {
    distribution[Math.max(1, Math.min(5, Math.round(r.rating)))]++;
    sum += r.rating;
  });
  return { count: reviews.length, average: reviews.length ? sum / reviews.length : 0, distribution };
}
