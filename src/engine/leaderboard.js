/**
 * Bảng xếp hạng sao giữa các học sinh — lưu trên Firebase (Firestore).
 *
 * Mỗi bé có một hồ sơ công khai `leaderboard/{firebaseUid}`:
 *   { nickname, avatar, grade, totalStars, gradeStars: { g3: 120, … },
 *     dayKey, dayStars, weekKey, weekStars, monthKey, monthStars, updatedAt }
 * grade = lớp bé chọn trong hồ sơ; bảng chỉ so sánh các bạn cùng lớp.
 * gradeStars = sao ở sách của từng lớp (1–5) — "Mọi lúc" dùng gradeStars của lớp đó.
 * day/week/month = sao của lớp đang học trong ngày/tuần/tháng có khoá tương ứng
 * (khoá theo giờ máy: 'YYYY-MM-DD', thứ Hai đầu tuần, 'YYYY-MM').
 * Chỉ biệt danh và avatar được công khai — không lưu email hay tên thật.
 *
 * Đăng nhập Firebase dùng lại access token Google sẵn có (auth.js), nên không
 * hiện thêm màn đăng nhập. Firebase tự giữ phiên, chỉ cần token ở lần đầu.
 * SDK Firebase được tải lười (dynamic import) để không làm nặng lần mở app.
 */

import { getCurrentUser, getAccessToken, getStoredAccessToken } from './auth.js';
import { getTotalStars, getStarsByGrade, getGradePeriodStars } from './stars.js';
import { getProfile, NAME_MAX } from './profile.js';

// Cấu hình web app Firebase (công khai, không phải bí mật) — Project settings → Your apps.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCk5c9yZPSXUs3YrAHtgf92UvDxutT1_hk',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'mathtieuhoc.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'mathtieuhoc',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:500123229695:web:8b8405a83c6daa4a9e1bca',
};

const COLLECTION = 'leaderboard';
const FETCH_LIMIT = 500;
const CACHE_MS = 60_000;

export function isLeaderboardConfigured() {
  return !!(firebaseConfig.apiKey && firebaseConfig.projectId);
}

let fbPromise = null;
function loadFirebase() {
  if (!fbPromise) {
    fbPromise = Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
      import('firebase/firestore'),
    ]).then(([appMod, authMod, fs]) => {
      const app = appMod.initializeApp(firebaseConfig);
      return { auth: authMod.getAuth(app), db: fs.getFirestore(app), authMod, fs };
    }).catch((e) => { fbPromise = null; throw e; });
  }
  return fbPromise;
}

/** Phiên Firebase có đúng là tài khoản Google đang dùng trong app không. */
function matchesCurrentUser(fbUser) {
  const googleId = getCurrentUser()?.id;
  return !!fbUser && !!googleId
    && fbUser.providerData.some(p => p.providerId === 'google.com' && p.uid === googleId);
}

async function signInWithToken(fb, accessToken) {
  const { authMod, auth } = fb;
  await authMod.signInWithCredential(auth, authMod.GoogleAuthProvider.credential(null, accessToken));
  return fb;
}

/**
 * Firebase đã đăng nhập đúng tài khoản; không mở popup.
 * Trả về null nếu cần bé bấm "Kết nối" (token Google đã hết hạn).
 */
async function ensureSignedInSilently() {
  if (!isLeaderboardConfigured() || !getCurrentUser()) return null;
  const fb = await loadFirebase();
  await fb.auth.authStateReady();
  if (matchesCurrentUser(fb.auth.currentUser)) return fb;
  if (fb.auth.currentUser) await fb.auth.signOut(); // phiên của tài khoản khác trên máy này
  const token = getStoredAccessToken();
  if (!token) return null;
  try {
    return await signInWithToken(fb, token);
  } catch (e) {
    if (e?.code === 'auth/invalid-credential') return null; // token bị từ chối → để bé bấm kết nối lại
    throw e;
  }
}

/** Phiên Firebase dùng chung cho các module khác (đăng ký học sinh, trang admin). */
export const firebaseSession = ensureSignedInSilently;

/** Có cần bé bấm nút kết nối (có thể mở popup Google) trước khi xem bảng không. */
export async function needsConnect() {
  return !(await ensureSignedInSilently());
}

/**
 * Kết nối bằng popup Google. PHẢI gọi trực tiếp trong sự kiện click
 * (getAccessToken mở popup ngay, trước mọi await).
 */
export function connectLeaderboard() {
  const tokenP = getAccessToken();
  return Promise.all([tokenP, loadFirebase()]).then(([token, fb]) => signInWithToken(fb, token));
}

/** Đăng xuất Firebase cùng lúc với đăng xuất Google. */
export function signOutLeaderboard() {
  lastPushed = null;
  lastProfile = null;
  lastRegistered = null;
  cache = null;
  fbPromise?.then(fb => fb.auth.signOut()).catch(() => {});
}

// ── Đẩy điểm của mình lên ───────────────────────────────────────────────────
let lastPushed = null; // { uid, json } — tránh ghi lại khi không có gì thay đổi
let pushTimer = null;

function myEntry(remote = {}) {
  const p = getProfile();
  // Lấy số lớn hơn: sổ sao đang lưu riêng từng máy, không để máy có ít sao ghi đè.
  const gradeStars = { ...(remote.gradeStars || {}) };
  for (const [g, n] of Object.entries(getStarsByGrade())) {
    gradeStars[`g${g}`] = Math.max(gradeStars[`g${g}`] || 0, n);
  }
  const grade = p.grade || 0;
  const periods = getGradePeriodStars(grade);
  // Cùng lớp và cùng khoảng thời gian thì cũng lấy số lớn hơn (máy khác có thể đã ghi nhiều hơn).
  const period = (name) => {
    const { key, stars } = periods[name];
    const same = remote.grade === grade && remote[`${name}Key`] === key;
    return { [`${name}Key`]: key, [`${name}Stars`]: same ? Math.max(stars, remote[`${name}Stars`] || 0) : stars };
  };
  return {
    nickname: (p.name || '').trim().slice(0, NAME_MAX),
    avatar: p.avatar || '',
    grade,
    totalStars: Math.max(getTotalStars(), remote.totalStars || 0),
    gradeStars,
    ...period('day'),
    ...period('week'),
    ...period('month'),
  };
}

async function pushNow() {
  const fb = await ensureSignedInSilently();
  if (!fb) return null;
  const { db, fs, auth } = fb;
  const uid = auth.currentUser.uid;
  const ref = fs.doc(db, COLLECTION, uid);
  let remote = lastPushed?.uid === uid ? lastPushed.entry : null;
  if (!remote) {
    const snap = await fs.getDoc(ref);
    remote = snap.exists() ? snap.data() : {};
  }
  const entry = myEntry(remote);
  if (!entry.grade) return uid; // chưa chọn lớp thì chưa lên bảng
  const json = JSON.stringify(entry);
  if (lastPushed?.uid === uid && lastPushed.json === json) return uid;
  if (entry.totalStars === 0 && !remote.totalStars && !lastPushed) {
    // Chưa có sao thì chưa lên bảng — tránh tạo hồ sơ rỗng.
    lastPushed = { uid, json, entry };
    return uid;
  }
  await fs.setDoc(ref, { ...entry, updatedAt: fs.serverTimestamp() });
  lastPushed = { uid, json, entry };
  if (cache) cache = null;
  return uid;
}

/** Cập nhật điểm của mình lên bảng (gộp nhiều lần gọi liền nhau). Không bao giờ ném lỗi. */
export function syncMyScore({ delay = 1500 } = {}) {
  if (!isLeaderboardConfigured() || !getCurrentUser()) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(() => { pushNow().catch(() => {}); }, delay);
}

window.addEventListener('tth:stars-changed', () => syncMyScore());

// ── Hồ sơ riêng của bé (đồng bộ giữa các máy) ───────────────────────────────
// `profiles/{firebaseUid}`: { gender, avatar, name, grade, updatedAt } — chỉ chính bé đọc/ghi được.
const PROFILES = 'profiles';
let lastProfile = null; // { uid, json }

function profileEntry() {
  const p = getProfile();
  return {
    gender: p.gender === 'boy' || p.gender === 'girl' ? p.gender : '',
    avatar: p.avatar || '',
    name: (p.name || '').trim().slice(0, NAME_MAX),
    grade: p.grade || 0,
  };
}

async function pushProfileNow() {
  const fb = await ensureSignedInSilently();
  if (!fb) return;
  const { db, fs, auth } = fb;
  const uid = auth.currentUser.uid;
  const entry = profileEntry();
  if (!entry.grade) return;
  const json = JSON.stringify(entry);
  if (lastProfile?.uid === uid && lastProfile.json === json) return;
  await fs.setDoc(fs.doc(db, PROFILES, uid), { ...entry, updatedAt: fs.serverTimestamp() });
  lastProfile = { uid, json };
}

/** Đưa hồ sơ trên máy này lên Firebase. Không bao giờ ném lỗi. */
export function syncMyProfile() {
  if (!isLeaderboardConfigured() || !getCurrentUser()) return;
  pushProfileNow().catch(() => {});
}

window.addEventListener('tth:profile-changed', () => syncMyProfile());

/**
 * Hồ sơ đã thiết lập trên máy khác của cùng tài khoản, hoặc null (chưa có / không kết nối được).
 * Máy cũ chưa kịp đưa hồ sơ lên thì lấy tạm từ bảng xếp hạng (biệt danh, avatar, lớp).
 */
export async function fetchRemoteProfile() {
  const fb = await ensureSignedInSilently();
  if (!fb) {
    console.warn('[profile] Không khôi phục được hồ sơ: chưa có phiên Firebase và token Google đã hết hạn.');
    return null;
  }
  const { db, fs, auth } = fb;
  const uid = auth.currentUser.uid;
  const snap = await fs.getDoc(fs.doc(db, PROFILES, uid));
  if (snap.exists() && snap.data().grade) {
    const { gender, avatar, name, grade } = snap.data();
    lastProfile = { uid, json: JSON.stringify({ gender, avatar, name, grade }) };
    return { gender: gender || undefined, avatar: avatar || undefined, name: name || '', grade };
  }
  const lb = await fs.getDoc(fs.doc(db, COLLECTION, uid));
  if (lb.exists() && lb.data().grade) {
    const { nickname, avatar, grade } = lb.data();
    const gender = avatar?.startsWith('boys/') ? 'boy' : avatar?.startsWith('girls/') ? 'girl' : undefined;
    return { gender, avatar: avatar || undefined, name: nickname || '', grade };
  }
  console.warn(`[profile] Firebase chưa có hồ sơ cho uid ${uid}.`);
  return null;
}

// ── Sổ đăng ký học sinh (cho trang admin) ────────────────────────────────────
// `users/{firebaseUid}`: { email, name, grade, createdAt, lastSeenAt } — chỉ chính bé và admin đọc được.
// Ghi tối đa một lần mỗi ngày trên mỗi máy (lastSeenAt dùng để đếm học sinh đang hoạt động).
const USERS = 'users';
let lastRegistered = null; // `${uid}|${dayKey}`

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

async function registerNow() {
  const fb = await ensureSignedInSilently();
  if (!fb) return;
  const { db, fs, auth } = fb;
  const fbUser = auth.currentUser;
  const mark = `${fbUser.uid}|${todayKey()}`;
  const storeKey = `tth_registered_${fbUser.uid}`;
  let stored = null;
  try { stored = localStorage.getItem(storeKey); } catch { /* storage unavailable */ }
  if (lastRegistered === mark || stored === mark) return;
  const ref = fs.doc(db, USERS, fbUser.uid);
  const snap = await fs.getDoc(ref);
  const entry = {
    email: fbUser.email || '',
    name: (getCurrentUser()?.name || fbUser.displayName || '').slice(0, 100),
    grade: getProfile().grade || 0,
    lastSeenAt: fs.serverTimestamp(),
  };
  if (snap.exists()) await fs.updateDoc(ref, entry);
  else await fs.setDoc(ref, { ...entry, createdAt: fs.serverTimestamp() });
  lastRegistered = mark;
  try { localStorage.setItem(storeKey, mark); } catch { /* storage unavailable */ }
}

/** Ghi nhận bé đã đăng ký / vừa mở app hôm nay. Không bao giờ ném lỗi. */
export function registerUser() {
  if (!isLeaderboardConfigured() || !getCurrentUser()) return;
  registerNow().catch(() => {});
}

// ── Đọc bảng xếp hạng ───────────────────────────────────────────────────────
let cache = null; // { at, grade, data }

/**
 * Các bạn cùng lớp với bé (theo lớp chọn trong hồ sơ).
 * @returns {Promise<{ myUid: string, grade: number, rows: Array<{ uid, nickname, avatar, grade, gradeStars, dayKey, dayStars, … }> }>}
 *   Ném lỗi 'need-connect' nếu cần bấm kết nối.
 */
export async function fetchLeaderboard({ force = false } = {}) {
  const grade = getProfile().grade || 0;
  if (!force && cache && cache.grade === grade && Date.now() - cache.at < CACHE_MS) return cache.data;
  clearTimeout(pushTimer);
  const myUid = await pushNow(); // đảm bảo điểm mới nhất của mình có trên bảng
  if (!myUid) throw new Error('need-connect');
  const { db, fs } = await loadFirebase();
  // Chỉ lọc bằng một điều kiện "==" để không cần tạo chỉ mục ghép; sắp xếp ở máy.
  const snap = await fs.getDocs(fs.query(
    fs.collection(db, COLLECTION),
    fs.where('grade', '==', grade),
    fs.limit(FETCH_LIMIT),
  ));
  const rows = snap.docs.map(d => ({ uid: d.id, ...d.data() }));
  const data = { myUid, grade, rows };
  cache = { at: Date.now(), grade, data };
  return data;
}
