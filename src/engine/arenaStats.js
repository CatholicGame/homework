/**
 * Thống kê người chơi 🏆 Đấu Trường Nhí cho trang admin (#admin tab 🏆 Đấu Trường), theo cách của Kinh Thánh (engine/gameStats.js).
 *
 * Firestore (firestore.rules mục arena / arenaPlays):
 *   arena/{uid}       mỗi tài khoản một bản ghi, tự cộng dồn: name, email, guest, grade, firstAt, lastAt, lastDay ('YYYY-MM-DD' giờ VN),
 *                     days (số ngày có vào), lobby (lần mở sảnh), visits (lần vào trường quay), seated (lần ngồi vào ghế),
 *                     started (lần chương trình bắt đầu khi đang trong phòng), ended (xem tới hết), pod (lần đứng bục thi),
 *                     wins (hạng nhất), best (điểm cao nhất), stars (sao đã nhận), answered / right (câu đã trả lời / đúng),
 *                     quits (bỏ giữa chừng đã biết: bấm rời phòng, hoặc thoát app rồi quay lại)
 *   arenaPlays/{auto} một dòng mỗi chương trình của mình: uid, name, grade, at, role ('pod' bục thi | 'aud' khán giả), rank (1–4,
 *                     khán giả 0), score, stars; bỏ giữa chừng thêm quit: true, why ('leave' bấm rời phòng | 'app' thoát app / đóng tab),
 *                     mode (vòng đang chiếu: open, khoidong, tangtoc, vedich, win), startAt (ms lúc bắt đầu)
 *
 * Bỏ giữa chừng: lúc chương trình bắt đầu (showStart) thì cộng started, ghi ngay, và nhớ chương trình đang xem trong localStorage
 * (`dt-show-open`). Xem tới hết (showEnd) thì cộng ended, xoá dấu. Rời phòng giữa chừng (showLeave) thì ghi dòng quit 'leave' ngay.
 * Thoát app thì dấu còn lại: lần sau mở sảnh (arenaLobby) ghi dòng quit 'app'. Người không quay lại vẫn đếm được qua started − ended.
 *
 * Tính cả khách dùng thử (tài khoản ẩn danh, guest: true). Không ghi: chưa có tài khoản Firebase, phòng thử nội bộ,
 * trình duyệt tự động (navigator.webdriver). Các lần cộng gom lại, ghi chừng 30 giây một lần và khi rời trang.
 */
import { firebaseSession } from './leaderboard.js';
import { getCurrentUser } from './auth.js';
import { getProfile, getProfileGrade } from './profile.js';
import { testRoom } from '../thanDong/engine/admin.js';
import { isAdminUser } from './admin.js';

const COL = 'arena', PLAYS = 'arenaPlays', OPEN = 'dt-show-open';
const FLUSH = 30000;
const KEYS = ['lobby', 'visits', 'seated', 'started', 'ended', 'pod', 'wins', 'stars', 'answered', 'right', 'quits'];
let pend = null, timer = 0;
const vnDay = (ms = Date.now()) => new Date(ms + 7 * 3600000).toISOString().slice(0, 10);
const toMs = (ts) => (ts?.toMillis ? ts.toMillis() : 0);
// không ghi: phòng thử, trình duyệt tự động, tài khoản admin (chạy thử không lẫn vào số liệu của bé)
const off = () => testRoom() || isAdminUser() || (typeof navigator !== 'undefined' && navigator.webdriver);
/** Dòng arenaPlays tự xoá sau PLAY_KEEP (chính sách TTL của Firestore trên trường expireAt, bật một lần ở Console). */
const PLAY_KEEP = 30 * 864e5;
const myName = () => String(getProfile().name || getCurrentUser()?.name || '').slice(0, 60);
const grade = () => { const g = getProfileGrade(); return Number.isInteger(g) && g >= -1 && g <= 5 ? g : 0; };

function add(delta, best = 0) {
  if (off()) return;
  pend ||= { best: 0, ...Object.fromEntries(KEYS.map(k => [k, 0])) };
  for (const [k, v] of Object.entries(delta)) pend[k] += v;
  pend.best = Math.max(pend.best, best);
  clearTimeout(timer);
  timer = setTimeout(flush, FLUSH);
}

/** Ghi những gì đã gom (gọi được nhiều lần; lỗi mạng thì giữ lại lần sau). */
export async function flush() {
  clearTimeout(timer);
  const d = pend;
  if (!d) return;
  pend = null;
  try {
    const fb = await firebaseSession();
    const user = fb?.auth.currentUser;
    if (!user) return;   // chưa có tài khoản: bỏ (không đếm được ai)
    const { db, fs } = fb, ref = fs.doc(db, COL, user.uid), today = vnDay();
    const old = (await fs.getDoc(ref)).data() || {};
    const data = {
      name: myName(), email: user.email || '', guest: !!user.isAnonymous, grade: grade(),
      lastAt: fs.serverTimestamp(), lastDay: today, days: fs.increment(old.lastDay === today ? 0 : 1),
      best: Math.max(old.best || 0, d.best),
      ...Object.fromEntries(KEYS.map(k => [k, fs.increment(d[k])])),
    };
    if (!old.firstAt) data.firstAt = fs.serverTimestamp();
    await fs.setDoc(ref, data, { merge: true });
  } catch (e) {
    console.warn('[arenaStats]', e);
    if (!pend) pend = d;
    else { for (const k of KEYS) pend[k] += d[k]; pend.best = Math.max(pend.best, d.best); }
  }
}

async function addPlay(extra) {
  if (off()) return;
  try {
    const fb = await firebaseSession();
    const user = fb?.auth.currentUser;
    if (!user) return;
    const { db, fs } = fb;
    await fs.addDoc(fs.collection(db, PLAYS), { uid: user.uid, name: myName(), grade: grade(), at: fs.serverTimestamp(),
      expireAt: fs.Timestamp.fromMillis(Date.now() + PLAY_KEEP), ...extra });
  } catch (e) { console.warn('[arenaStats] plays', e); }
}

// ---- dấu chương trình đang xem (bỏ giữa chừng)
function readOpen() {
  try { const o = JSON.parse(localStorage.getItem(OPEN)); return o && o.uid === (getCurrentUser()?.id || 'guest') ? o : null; } catch { return null; }
}
function writeOpen(o) {
  try { if (o) localStorage.setItem(OPEN, JSON.stringify(o)); else localStorage.removeItem(OPEN); } catch { /* không nhớ được thì thôi */ }
}
const MODES = ['open', 'khoidong', 'tangtoc', 'vedich', 'win'];
function quit(o, why) {
  writeOpen(null);
  add({ quits: 1 });
  flush();
  addPlay({ role: o.pod ? 'pod' : 'aud', rank: 0, score: Math.max(0, Math.min(10000, o.score | 0)), stars: 0, quit: true, why,
    mode: MODES.includes(o.mode) ? o.mode : '', startAt: Math.max(0, Math.round(o.at || 0)) });
}

/** Mở sảnh ngoài (thẻ 🏆). Còn dấu một chương trình chưa xem hết (thoát app lần trước) thì ghi là bỏ giữa chừng. */
export function arenaLobby() {
  const o = readOpen();
  if (o) quit(o, 'app');
  add({ lobby: 1 });
}
/** Bước vào trường quay (sân khấu thật, không phải sân khấu thử). */
export const arenaVisit = () => add({ visits: 1 });
/** Đã ngồi vào ghế trong khán phòng. */
export const arenaSeated = () => add({ seated: 1 });
/** Mình đã chốt một câu (bục thi hoặc khán giả). */
export const arenaAnswer = (ok) => add({ answered: 1, right: ok ? 1 : 0 });

/** Chương trình bắt đầu khi mình đang trong phòng: cộng started, ghi ngay, nhớ dấu. */
export function showStart() {
  if (off()) return;
  const o = readOpen();
  if (o) quit(o, 'app');
  writeOpen({ uid: getCurrentUser()?.id || 'guest', at: Date.now(), mode: 'open', pod: false, score: 0 });
  add({ started: 1 });
  flush();
}
/** Đang chiếu tới vòng mode, mình đang ở bục hay không, điểm hiện có (để dòng bỏ giữa chừng ghi đúng chỗ dừng). */
export function showProgress({ mode, pod, score } = {}) {
  const o = readOpen();
  if (!o) return;
  const n = { ...o, ...(mode ? { mode } : {}), ...(pod != null ? { pod: !!pod } : {}), ...(score != null ? { score: score | 0 } : {}) };
  if (n.mode !== o.mode || n.pod !== o.pod || n.score !== o.score) writeOpen(n);
}
/** Xem tới hết ({ onPod, score, rank, stars } của api.onShowEnd). */
export function showEnd({ onPod = false, score = 0, rank = 0, stars = 0 } = {}) {
  if (off()) return;
  const o = readOpen();
  writeOpen(null);
  score = Math.max(0, Math.min(10000, score | 0));
  add({ ended: o ? 1 : 0, pod: onPod ? 1 : 0, wins: onPod && rank === 1 ? 1 : 0, stars: Math.max(0, Math.min(1000, stars | 0)) }, score);
  flush();
  addPlay({ role: onPod ? 'pod' : 'aud', rank: onPod ? Math.max(0, Math.min(4, rank | 0)) : 0, score, stars: Math.max(0, Math.min(1000, stars | 0)) });
}
/** Rời phòng (Về sảnh, nút quay lại) khi chương trình đang chiếu mà chưa xem hết. */
export function showLeave() {
  const o = readOpen();
  if (o) quit(o, 'leave');
}

if (typeof window !== 'undefined') {
  addEventListener('pagehide', () => { flush(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) flush(); });
}

/** Trang admin: mọi người đã từng vào (mới nhất trước) và các chương trình gần đây. */
export async function fetchArenaStats(limit = 80) {
  const fb = await firebaseSession();
  if (!fb) throw new Error('need-connect');
  const { db, fs } = fb;
  const [people, plays] = await Promise.all([
    fs.getDocs(fs.collection(db, COL)),
    fs.getDocs(fs.query(fs.collection(db, PLAYS), fs.orderBy('at', 'desc'), fs.limit(limit))),
  ]);
  return {
    people: people.docs.map(d => { const g = d.data(); return { uid: d.id, ...g, firstAt: toMs(g.firstAt), lastAt: toMs(g.lastAt) }; })
      .sort((a, b) => b.lastAt - a.lastAt),
    plays: plays.docs.map(d => { const p = d.data(); return { id: d.id, ...p, at: toMs(p.at) }; }),
  };
}
