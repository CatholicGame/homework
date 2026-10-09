/**
 * Bảng xếp hạng sao giữa các học sinh — lưu trên Firebase (Firestore).
 *
 * Mỗi bé có một hồ sơ công khai `leaderboard/{firebaseUid}`:
 *   { nickname, avatar, grade, totalStars, gradeStars: { g3: 120, … },
 *     dayKey, dayStars, weekKey, weekStars, monthKey, monthStars, updatedAt }
 * grade = lớp bé chọn trong hồ sơ; bảng chỉ so sánh các bạn cùng lớp.
 * gradeStars = sao ở sách của từng lớp (1–5, g-1 = Tiền tiểu học) — "Mọi lúc" dùng gradeStars của lớp đó.
 * day/week/month = sao của lớp đang học trong ngày/tuần/tháng có khoá tương ứng
 * (khoá theo giờ máy: 'YYYY-MM-DD', thứ Hai đầu tuần, 'YYYY-MM').
 * Chỉ biệt danh và avatar được công khai — không lưu email hay tên thật.
 *
 * Đăng nhập Firebase dùng lại access token Google sẵn có (auth.js), nên không
 * hiện thêm màn đăng nhập. Firebase tự giữ phiên, chỉ cần token ở lần đầu.
 * SDK Firebase được tải lười (dynamic import) để không làm nặng lần mở app.
 */

import { getCurrentUser, getAccessToken, getFreshAccessToken, isGuest, leaveGuest } from './auth.js';
import { getTotalStars, getStarsByGrade, getGradePeriodStars } from './stars.js';
import { getProfile, saveProfile, markProfileSynced, NAME_MAX, CONSENT_TEXT, parentConsentAt } from './profile.js';
import { castRows, makeLaunch } from './leaderboardCast.js';
import { describeDevice } from './voiceReport.js';
import { deviceKey } from './deviceKey.js';

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
  // Trình duyệt tự động (Playwright, script kiểm tra) không ghi lên Firebase thật: mỗi lần chạy là
  // một trình duyệt trống, trước đây tạo ra một khách mới trên trang admin.
  if (typeof navigator !== 'undefined' && navigator.webdriver) return false;
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
      // Không dùng getAuth(): nó gắn popupRedirectResolver, và trên điện thoại / iPad / Safari
      // Firebase chờ tải iframe OAuth (authDomain) trước khi authStateReady() xong — iframe đó
      // bị treo trên domain chưa khai báo, bé chờ hết giờ rồi bị hỏi lại hồ sơ. App đăng nhập
      // bằng token Google (signInWithCredential), không cần popup/redirect của Firebase.
      const auth = authMod.initializeAuth(app, {
        persistence: [authMod.indexedDBLocalPersistence, authMod.browserLocalPersistence],
      });
      return { auth, db: fs.getFirestore(app), authMod, fs };
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
  // Phiên khách (ẩn danh) trên máy này vừa đăng nhập Google → ghi nhận trước khi thoát phiên đó.
  if (fb.auth.currentUser?.isAnonymous) {
    await markGuestConverted(fb).catch(() => {});
    // Sao của khách đã gộp vào tài khoản (cloudSync.adoptGuestData) → bỏ dòng khách, bé không hiện hai lần trên bảng.
    await fb.fs.deleteDoc(fb.fs.doc(fb.db, COLLECTION, fb.auth.currentUser.uid)).catch(() => {});
  }
  if (fb.auth.currentUser) await fb.auth.signOut(); // phiên của tài khoản khác trên máy này
  const token = await getFreshAccessToken(); // hết hạn thì lấy mới qua máy chủ (nếu có phiên)
  if (!token) return null;
  try {
    return await signInWithToken(fb, token);
  } catch (e) {
    if (e?.code === 'auth/invalid-credential') return null; // token bị từ chối → để bé bấm kết nối lại
    throw e;
  }
}

/**
 * Khách dùng thử: phiên Firebase ẩn danh (mỗi trình duyệt một uid, giữ qua các lần mở app) để
 * có tên trên bảng xếp hạng và được đếm ở trang admin. Cần bật Anonymous trong Firebase Console.
 */
async function ensureGuestSession() {
  if (!isLeaderboardConfigured() || !isGuest()) return null;
  const fb = await loadFirebase();
  const { auth, authMod } = fb;
  await auth.authStateReady();
  if (!isGuest()) return null;
  if (!(await openGuestSession(fb))) {
    // Máy này đã có khách khác: thoát chế độ khách, màn đăng nhập báo phải dùng email.
    leaveGuest();
    window.dispatchEvent(new CustomEvent('tth:guest-blocked'));
    return null;
  }
  return fb;
}

// ── Mỗi máy một khách ────────────────────────────────────────────────────────
// `guestDevices/{mã máy}`: { uid, createdAt } — uid ẩn danh đầu tiên dùng thử trên máy (deviceKey.js,
// giống nhau ở mọi trình duyệt / cửa sổ ẩn danh). Thêm dấu trên máy (không xoá khi đăng nhập / đăng xuất)
// cho trường hợp mã máy đổi. Phiên khách đang có vẫn dùng tiếp; chỉ chặn khi phải tạo uid ẩn danh mới.
const GUEST_DEVICES = 'guestDevices';
const DEVICE_GUEST_MARK = 'tth_device_guest';
const BLOCKED_FLAG = 'tth_guest_blocked';

const localGet = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const localSet = (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } };

/** Mã máy còn trống hoặc đã thuộc về uid này. Lỗi (luật chưa deploy, mất mạng) → cho qua. */
async function claimGuestDevice(fb, uid, fresh) {
  try {
    const { db, fs } = fb;
    const ref = fs.doc(db, GUEST_DEVICES, await deviceKey());
    const snap = await fs.getDoc(ref);
    if (!snap.exists()) {
      await fs.setDoc(ref, { uid, createdAt: fs.serverTimestamp() });
      return true;
    }
    return snap.data().uid === uid || !fresh;
  } catch (e) {
    console.warn('[guest] Không kiểm tra được mã máy:', e?.code || e);
    return true;
  }
}

/** Phiên Firebase ẩn danh cho khách. false = máy này đã có khách khác (uid mới vừa tạo bị xoá). */
async function openGuestSession(fb) {
  const { auth, authMod } = fb;
  if (auth.currentUser && !auth.currentUser.isAnonymous) await auth.signOut(); // phiên Google cũ còn sót
  const fresh = !auth.currentUser;
  if (fresh) await authMod.signInAnonymously(auth);
  const uid = auth.currentUser.uid;
  const mark = localGet(DEVICE_GUEST_MARK);
  const ok = !(fresh && mark && mark !== uid) && await claimGuestDevice(fb, uid, fresh);
  if (!ok) {
    await auth.currentUser.delete().catch(() => auth.signOut());
    localSet(BLOCKED_FLAG, '1');
    return false;
  }
  if (!mark) localSet(DEVICE_GUEST_MARK, uid);
  return true;
}

/**
 * Bé bấm "Đồng ý, dùng thử": mở phiên khách nếu máy chưa có khách nào khác.
 * @returns {Promise<boolean|'disabled'>} false = máy này đã dùng thử rồi, phải đăng nhập email;
 *   'disabled' = admin vừa tắt dùng thử.
 */
export async function startGuest() {
  if (!isLeaderboardConfigured()) return true;
  if (!(await isGuestEnabled())) return 'disabled';
  let fb;
  try {
    fb = await loadFirebase();
    await fb.auth.authStateReady();
  } catch {
    return true; // không tải được Firebase (mất mạng): vẫn cho dùng thử như trước
  }
  try {
    return await openGuestSession(fb);
  } catch (e) {
    // Chưa bật Anonymous / mất mạng: không có uid nào để đếm trùng, cho dùng thử như trước.
    console.warn('[guest] Không mở được phiên khách:', e?.code || e);
    return true;
  }
}

// ── Bật / tắt dùng thử (admin) ───────────────────────────────────────────────
// `config/app`: { guestEnabled, updatedAt } — ai cũng đọc được (cả lúc chưa đăng nhập), chỉ admin ghi.
// Chưa có bản ghi / không đọc được → tắt. Khách đang dùng thử trên máy vẫn dùng tiếp.
const CONFIG_REF = ['config', 'app'];

/** Admin có đang cho phép bé mới bấm "Dùng thử" không. */
export async function isGuestEnabled() {
  if (!isLeaderboardConfigured()) return true; // trình duyệt kiểm tra tự động: giữ luồng khách như trước
  try {
    const { db, fs } = await loadFirebase();
    const snap = await fs.getDoc(fs.doc(db, ...CONFIG_REF));
    return snap.exists() && snap.data().guestEnabled === true;
  } catch (e) {
    console.warn('[guest] Không đọc được config/app:', e?.code || e);
    return false;
  }
}

/** Trang admin bật / tắt nút "Dùng thử" ở màn đăng nhập. */
export async function setGuestEnabled(on) {
  const fb = await ensureSignedInSilently();
  if (!fb) throw new Error('need-connect');
  const { db, fs } = fb;
  await fs.setDoc(fs.doc(db, ...CONFIG_REF), { guestEnabled: !!on, updatedAt: fs.serverTimestamp() });
}

/** Máy này từng bị chặn tạo khách thứ hai — màn đăng nhập hiện lời nhắc ngay. */
export function isGuestBlockedHere() {
  return localGet(BLOCKED_FLAG) === '1';
}

/** Phiên cho bảng xếp hạng: tài khoản Google, hoặc ẩn danh nếu đang dùng thử. */
const ensureBoardSession = () => (getCurrentUser() ? ensureSignedInSilently() : ensureGuestSession());

/** Phiên Firebase dùng chung cho các module khác (đăng ký học sinh, trang admin). */
export const firebaseSession = ensureSignedInSilently;

/** Firebase ID token của phiên đang dùng (Google hoặc khách), để gọi /api/* cần biết là người dùng app; null nếu cần kết nối. */
export async function getIdToken() {
  const fb = await ensureBoardSession();
  return fb?.auth.currentUser ? fb.auth.currentUser.getIdToken() : null;
}

/** Có cần bé bấm nút kết nối (có thể mở popup Google) trước khi xem bảng không. */
export async function needsConnect() {
  return !(await ensureBoardSession());
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
  profileSync = null;
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
  // Chờ lấy hồ sơ mới nhất (biệt danh sửa ở máy khác) để không ghi biệt danh cũ lên bảng.
  await profileSync?.catch(() => {});
  const fb = await ensureBoardSession();
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
  rememberBoardStars(entry.gradeStars);
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

// Sao từng lớp đã ghi trên bảng (gộp mọi máy) — nhớ trên máy để header hiện đúng số như bảng xếp hạng.
const boardStarsKey = () => `tth_boardstars_${getCurrentUser()?.id || 'guest'}`;

function rememberBoardStars(gradeStars) {
  const json = JSON.stringify(gradeStars);
  try {
    if (localStorage.getItem(boardStarsKey()) === json) return;
    localStorage.setItem(boardStarsKey(), json);
  } catch { return; }
  window.dispatchEvent(new CustomEvent('tth:board-stars-changed'));
}

/** Sao của một lớp như trên bảng xếp hạng "Mọi lúc": số lớn hơn giữa máy này và bảng (máy khác). */
export function getBoardGradeStars(grade) {
  let board = {};
  try { board = JSON.parse(localStorage.getItem(boardStarsKey())) || {}; } catch { /* ignore */ }
  return Math.max(getStarsByGrade()[grade] || 0, board[`g${grade}`] || 0);
}

/** Cập nhật điểm của mình lên bảng (gộp nhiều lần gọi liền nhau). Không bao giờ ném lỗi. */
export function syncMyScore({ delay = 1500 } = {}) {
  if (!isLeaderboardConfigured() || (!getCurrentUser() && !isGuest())) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(() => { pushNow().catch(() => {}); }, delay);
}

window.addEventListener('tth:stars-changed', () => syncMyScore());

// ── Hồ sơ riêng của bé (đồng bộ giữa các máy) ───────────────────────────────
// `profiles/{firebaseUid}`: { gender, avatar, name, grade, updatedAt } — chỉ chính bé đọc/ghi được.
const PROFILES = 'profiles';
let lastProfile = null; // { uid, json }

function normEntry(p) {
  return {
    gender: p.gender === 'boy' || p.gender === 'girl' ? p.gender : '',
    avatar: p.avatar || '',
    name: (p.name || '').trim().slice(0, NAME_MAX),
    grade: p.grade || 0,
  };
}

let profileSync = null; // lần đồng bộ hồ sơ đang chạy — pushNow chờ nó xong

/**
 * Đồng bộ hồ sơ hai chiều. Bé vừa sửa trên máy này (pendingPush) → đưa lên; ngược lại
 * bản trên Firebase (có thể vừa sửa ở máy khác) ghi đè bản trên máy.
 * Trả về true nếu hồ sơ trên máy vừa được thay bằng bản trên Firebase.
 */
async function syncProfileNow() {
  const fb = await ensureSignedInSilently();
  if (!fb) return false;
  recordConsent(fb).catch((e) => console.warn('[profile] Chưa ghi được xác nhận phụ huynh:', e?.code || e));
  const { db, fs, auth } = fb;
  const uid = auth.currentUser.uid;
  const ref = fs.doc(db, PROFILES, uid);
  const local = getProfile();
  const entry = normEntry(local);
  const json = JSON.stringify(entry);
  if (!local.pendingPush) {
    const snap = await fs.getDoc(ref);
    const remote = snap.exists() && snap.data().grade ? normEntry(snap.data()) : null;
    if (remote) {
      const remoteJson = JSON.stringify(remote);
      lastProfile = { uid, json: remoteJson };
      if (getCurrentUser() && remoteJson !== json && !getProfile().pendingPush) {
        saveProfile({ gender: remote.gender || undefined, avatar: remote.avatar || undefined, name: remote.name, grade: remote.grade }, { fromRemote: true });
        return true;
      }
      return false;
    }
  }
  if (!entry.grade) return false;
  if (!(lastProfile?.uid === uid && lastProfile.json === json)) {
    await fs.setDoc(ref, { ...entry, updatedAt: fs.serverTimestamp() });
    lastProfile = { uid, json };
  }
  if (JSON.stringify(normEntry(getProfile())) === json) markProfileSynced();
  return false;
}

// `consents/{firebaseUid}`: { text, at, createdAt } — bằng chứng phụ huynh đã đồng ý (Nghị định 13/2023).
// Ghi một lần, không sửa được; riêng với profiles để luật chưa deploy không chặn đồng bộ hồ sơ.
let consentRecorded = null; // uid đã ghi
async function recordConsent({ db, fs, auth }) {
  const uid = auth.currentUser.uid;
  const at = parentConsentAt();
  if (!at || consentRecorded === uid) return;
  const ref = fs.doc(db, 'consents', uid);
  if (!(await fs.getDoc(ref)).exists()) {
    await fs.setDoc(ref, { text: CONSENT_TEXT, at, createdAt: fs.serverTimestamp() });
  }
  consentRecorded = uid;
}

/**
 * Đồng bộ hồ sơ giữa máy này và Firebase. Không bao giờ ném lỗi.
 * @returns {Promise<boolean>} true nếu hồ sơ trên máy vừa được cập nhật từ máy khác.
 */
export function syncMyProfile() {
  if (!isLeaderboardConfigured() || !getCurrentUser()) return Promise.resolve(false);
  const run = (profileSync || Promise.resolve()).catch(() => {}).then(syncProfileNow);
  profileSync = run.catch(() => false);
  return profileSync;
}

window.addEventListener('tth:profile-changed', () => syncMyProfile());

/** fetchRemoteProfile() trả về giá trị này khi phải để bé bấm "Kết nối" (token Google đã hết hạn). */
export const NEEDS_CONNECT = 'needs-connect';

/**
 * Hồ sơ đã thiết lập trên máy khác của cùng tài khoản, null nếu chưa có, hoặc
 * NEEDS_CONNECT nếu chưa có phiên Firebase mà token Google đã hết hạn.
 * Máy cũ chưa kịp đưa hồ sơ lên thì lấy tạm từ bảng xếp hạng (biệt danh, avatar, lớp).
 */
export async function fetchRemoteProfile() {
  const fb = await ensureSignedInSilently();
  if (!fb) {
    console.warn('[profile] Chưa có phiên Firebase và token Google đã hết hạn — cần bấm Kết nối.');
    return isLeaderboardConfigured() ? NEEDS_CONNECT : null;
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

// ── Khách dùng thử (cho trang admin) ─────────────────────────────────────────
// `guests/{uid ẩn danh}`: { nickname, avatar, grade, stars, device, days, createdAt, lastSeenAt, convertedAt? }
// days: các ngày có mở app ('YYYY-MM-DD' giờ trên máy) — trang admin tính khách có quay lại không.
// Firebase Anonymous Auth (bật trong Firebase Console → Authentication → Sign-in method → Anonymous):
// mỗi trình duyệt một uid, giữ qua các lần mở app. Ghi tối đa một lần mỗi ngày.
const GUESTS = 'guests';
let lastGuestMark = null;

function guestEntry(fs) {
  const p = getProfile();
  const d = describeDevice();
  return {
    nickname: (p.name || '').slice(0, 20),
    avatar: (p.avatar || '').slice(0, 40),
    grade: p.grade || 0,
    stars: Math.min(getTotalStars(), 20000),
    device: [d.device, d.model, d.os, d.browser].filter(Boolean).join(' · ').slice(0, 120),
    days: fs.arrayUnion(todayKey()),
    lastSeenAt: fs.serverTimestamp(),
  };
}

async function registerGuestNow() {
  const fb = await ensureGuestSession();
  if (!fb) return;
  const { auth, db, fs } = fb;
  const uid = auth.currentUser.uid;
  // Ghi lại lần nữa khi bé vừa chọn xong avatar / lớp (lần đầu có thể ghi lúc còn ở màn chọn avatar).
  const mark = `${uid}|${todayKey()}|${getProfile().setupDone ? 1 : 0}`;
  const storeKey = 'tth_guest_seen';
  let stored = null;
  try { stored = localStorage.getItem(storeKey); } catch { /* storage unavailable */ }
  if (lastGuestMark === mark || stored === mark) return;
  const ref = fs.doc(db, GUESTS, uid);
  const snap = await fs.getDoc(ref);
  if (snap.exists()) await fs.updateDoc(ref, guestEntry(fs));
  else await fs.setDoc(ref, { ...guestEntry(fs), createdAt: fs.serverTimestamp() });
  lastGuestMark = mark;
  try { localStorage.setItem(storeKey, mark); } catch { /* storage unavailable */ }
}

async function markGuestConverted(fb) {
  const { db, fs, auth } = fb;
  const ref = fs.doc(db, GUESTS, auth.currentUser.uid);
  const snap = await fs.getDoc(ref);
  if (snap.exists() && !snap.data().convertedAt) await fs.updateDoc(ref, { convertedAt: fs.serverTimestamp() });
}

/** Ghi nhận khách dùng thử vừa mở app hôm nay (thống kê ở trang admin). Không bao giờ ném lỗi. */
export function registerGuest() {
  if (!isLeaderboardConfigured() || !isGuest()) return;
  registerGuestNow().catch((e) => console.warn('[guest] Không ghi được thống kê khách:', e?.code || e));
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
  if (!force && cache && cache.grade === grade && Date.now() - cache.at < CACHE_MS) {
    return { ...cache.data, rows: [...cache.data.rows, ...castRows(grade, cache.launch)] };
  }
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
  const launch = await castLaunch(grade, rows);
  cache = { at: Date.now(), grade, data, launch };
  // Các bạn ảo tính lại mỗi lần (sao hôm nay tăng dần), không nằm trong cache Firestore.
  return { ...data, rows: [...rows, ...castRows(grade, launch)] };
}

// ── Ảnh chụp khởi động của các bạn ảo ───────────────────────────────────────
// `castLaunch/g{lớp}`: { start, top, updatedAt } — xem engine/leaderboardCast.js. Máy đầu tiên
// mở bảng của một lớp chụp lại sao bé thật cao nhất lớp (trong transaction, nên hai máy cùng lúc
// không ghi đè nhau); luật không cho sửa, nên mọi máy thấy cùng các bạn ảo mãi về sau.
// Không đọc/ghi được (mất mạng, luật chưa deploy) thì dùng bản đã lưu trên máy.
const CAST_LAUNCH = 'castLaunch';
const launchStoreKey = (grade) => `tth_castlaunch_g${grade}`;

async function castLaunch(grade, rows) {
  let launch = null;
  try {
    const { db, fs } = await loadFirebase();
    const ref = fs.doc(db, CAST_LAUNCH, `g${grade}`);
    launch = await fs.runTransaction(db, async (tx) => {
      const cur = await tx.get(ref);
      if (cur.exists()) return cur.data();
      const next = makeLaunch(rows, grade);
      tx.set(ref, { ...next, updatedAt: fs.serverTimestamp() });
      return next;
    });
  } catch (e) {
    console.warn('[leaderboard] Không đồng bộ được ảnh chụp khởi động bạn ảo:', e?.code || e);
  }
  if (!launch) {
    try { launch = JSON.parse(localStorage.getItem(launchStoreKey(grade))); } catch { /* ignore */ }
  }
  if (!launch) launch = makeLaunch(rows, grade);
  const { start, top } = launch;
  try { localStorage.setItem(launchStoreKey(grade), JSON.stringify({ start, top })); } catch { /* storage unavailable */ }
  return { start, top };
}
