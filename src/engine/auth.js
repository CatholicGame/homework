/**
 * Google Sign-In (hoặc dùng thử không đăng nhập — isGuest).
 *
 * Hai cách, tự chọn theo máy chủ (GET /api/auth/config):
 *   - Máy chủ có GOOGLE_CLIENT_SECRET (api/auth/*): chuyển trang sang Google, máy chủ giữ refresh
 *     token trong cookie HttpOnly → refreshAccessToken() lấy access token mới bất cứ lúc nào,
 *     không popup — lưu Google Drive tự động mãi (cloudSync.js).
 *   - Chưa có: Google Identity Services (token model) trên trình duyệt — popup, token ~1 giờ,
 *     hết hạn phải bấm để xin lại.
 * Quyền drive.appdata: thư mục ẩn của app trong Google Drive của người dùng.
 */

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
  || '500123229695-se84qoeglj63vr8vserhqfmfmcfafia4.apps.googleusercontent.com';

const SCOPES = [
  'openid',
  'email',
  'profile',
  'https://www.googleapis.com/auth/drive.appdata',
].join(' ');

const USER_KEY = 'tth_user';
const TOKEN_KEY = 'tth_token';
const GUEST_KEY = 'tth_guest';
const SESSION_KEY = 'tth_offline'; // máy này có phiên máy chủ (cookie refresh token)

// ── đăng nhập qua máy chủ (refresh token) ────────────────────────────────────
let serverOffline = null; // true/false khi đã biết, null khi chưa hỏi
let configPromise = null;
function loadServerConfig() {
  configPromise ||= fetch('/api/auth/config', { cache: 'no-store' })
    .then(r => (r.ok ? r.json() : {}))
    .catch(() => ({}))
    .then((c) => { serverOffline = c?.offline === true; return serverOffline; });
  return configPromise;
}

/** Chuyển cả trang sang Google (không popup). Quay về /?login=ok → completeServerLogin(). */
function startServerLogin(hint) {
  location.assign(`/api/auth/login${hint ? `?hint=${encodeURIComponent(hint)}` : ''}`);
  return new Promise(() => {}); // trang đang rời đi
}

let refreshing = null;
function fetchServerToken() {
  refreshing ||= fetch('/api/auth/token', { method: 'POST', credentials: 'same-origin' })
    .then(async (r) => {
      if (r.status === 401) { writeJSON(SESSION_KEY, null); return null; }
      if (!r.ok) return null;
      const b = await r.json();
      const me = getCurrentUser();
      if (me && b.user?.id && b.user.id !== me.id) return null; // cookie của tài khoản khác
      saveToken(b);
      return b;
    })
    .catch(() => null)
    .finally(() => { refreshing = null; });
  return refreshing;
}

/** Máy này đăng nhập qua máy chủ (lấy lại token không cần bấm). */
export function hasServerSession() {
  return readJSON(SESSION_KEY) === true;
}

/** Access token mới từ refresh token (không popup); null nếu không có phiên máy chủ. */
export function refreshAccessToken() {
  if (!hasServerSession()) return Promise.resolve(null);
  return fetchServerToken().then(b => b?.access_token || null);
}

/** Token còn hạn, hoặc lấy mới qua máy chủ — không bao giờ mở popup. */
export async function getFreshAccessToken() {
  return getStoredAccessToken() || refreshAccessToken();
}

/**
 * Vừa quay về từ Google (/?login=ok): lấy token + hồ sơ từ máy chủ. Gọi khi khởi động, trước khi vẽ trang.
 * @returns {Promise<object|null>} user
 */
export async function completeServerLogin() {
  const b = await fetchServerToken();
  if (!b?.user?.id) return null;
  writeJSON(USER_KEY, b.user);
  writeJSON(GUEST_KEY, null);
  writeJSON(SESSION_KEY, true);
  // cloudSync.js gộp dữ liệu khách vào tài khoản rồi đồng bộ Drive.
  window.dispatchEvent(new CustomEvent('tth:signed-in', { detail: { user: b.user } }));
  return b.user;
}

let gisPromise = null;
let tokenClient = null;
let pending = null; // { resolve, reject } of the in-flight token request

function loadGis() {
  if (window.google?.accounts?.oauth2) return Promise.resolve();
  if (gisPromise) return gisPromise;
  gisPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => { gisPromise = null; reject(new Error('Không tải được Google Sign-In')); };
    document.head.appendChild(s);
  });
  return gisPromise;
}

function getTokenClient() {
  if (tokenClient) return tokenClient;
  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    include_granted_scopes: true,
    callback: (resp) => {
      const p = pending; pending = null;
      if (!p) return;
      if (resp.error) p.reject(new Error(resp.error_description || resp.error));
      else p.resolve(resp);
    },
    error_callback: (err) => {
      const p = pending; pending = null;
      const e = new Error(err?.type === 'popup_closed' ? 'Bạn đã đóng cửa sổ đăng nhập'
        : err?.type === 'popup_failed_to_open' ? 'Trình duyệt này không mở được cửa sổ đăng nhập Google'
        : (err?.message || 'Đăng nhập thất bại'));
      e.code = err?.type;
      p?.reject(e);
    },
  });
  return tokenClient;
}

function readJSON(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
function writeJSON(key, val) {
  try {
    if (val == null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(val));
  } catch { /* storage unavailable */ }
}

/** Người dùng đã đăng nhập (lưu lại giữa các lần mở app), hoặc null. */
export function getCurrentUser() {
  return readJSON(USER_KEY);
}

/** Đang dùng thử không đăng nhập: dữ liệu chỉ lưu trên máy này (khoá …guest). */
export function isGuest() {
  return !getCurrentUser() && readJSON(GUEST_KEY) === true;
}
export function enterGuest() { writeJSON(GUEST_KEY, true); }
/** Rời chế độ khách để hiện màn đăng nhập (dữ liệu khách vẫn giữ, đăng nhập xong sẽ gộp vào tài khoản). */
export function leaveGuest() { writeJSON(GUEST_KEY, null); }

/** Chủ của dữ liệu trên máy: id Google, hoặc 'guest'. */
export function userScope() {
  return getCurrentUser()?.id || 'guest';
}

/**
 * Khoá localStorage riêng cho người đang dùng: `${base}@${id|guest}`.
 * Bản cũ lưu chung cả máy dưới `base` — người đầu tiên mở sau bản cập nhật nhận lại dữ liệu đó.
 */
export function scopedKey(base) {
  const key = `${base}@${userScope()}`;
  try {
    if (localStorage.getItem(key) == null) {
      const legacy = localStorage.getItem(base);
      if (legacy != null) { localStorage.setItem(key, legacy); localStorage.removeItem(base); }
    }
  } catch { /* storage unavailable */ }
  return key;
}

/**
 * Mở popup Google để lấy access token. Phải gọi trực tiếp trong sự kiện click
 * (trình duyệt chặn popup nếu không).
 * @param {{ hint?: string, consent?: boolean }} opts
 */
function requestToken({ hint, consent } = {}) {
  return new Promise((resolve, reject) => {
    pending?.reject(new Error('cancelled'));
    pending = { resolve, reject };
    getTokenClient().requestAccessToken({
      prompt: consent ? 'consent' : (hint ? '' : 'select_account'),
      ...(hint ? { login_hint: hint } : {}),
    });
  }).then(saveToken);
}

function saveToken(resp) {
  const token = {
    accessToken: resp.access_token,
    expiresAt: Date.now() + (Number(resp.expires_in) || 3600) * 1000,
    scope: resp.scope,
    clientId: CLIENT_ID,
  };
  writeJSON(TOKEN_KEY, token);
  window.dispatchEvent(new CustomEvent('tth:token')); // có token mới → đồng bộ Drive (cloudSync.js)
  return token;
}

/** Đăng nhập: chọn tài khoản Google, lấy hồ sơ (tên, email, ảnh). */
export async function signIn() {
  // Máy chủ có refresh token: chuyển trang sang Google (serverOffline đã biết từ preloadAuth).
  if (serverOffline) return startServerLogin();
  // Safari (iPad) chỉ cho mở popup nếu gọi đồng bộ trong click — không await
  // gì trước requestToken khi thư viện đã tải sẵn (preloadAuth).
  const token = window.google?.accounts?.oauth2
    ? await requestToken()
    : await loadGis().then(() => requestToken());
  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${token.accessToken}` },
  });
  if (!res.ok) throw new Error('Không lấy được thông tin tài khoản');
  const info = await res.json();
  const user = { id: info.sub, name: info.name || info.email, email: info.email, picture: info.picture };
  writeJSON(USER_KEY, user);
  writeJSON(GUEST_KEY, null);
  // cloudSync.js gộp dữ liệu khách vào tài khoản rồi đồng bộ Drive (chạy đồng bộ, trước khi vẽ lại trang).
  window.dispatchEvent(new CustomEvent('tth:signed-in', { detail: { user } }));
  return user;
}

/**
 * Access token còn hạn để gọi Google Drive API (dùng cho tính năng lưu trữ sau này).
 * Nếu hết hạn sẽ xin lại (có thể mở popup ngắn) — nên gọi từ thao tác của người dùng.
 */
export async function getAccessToken() {
  const t = getStoredAccessToken();
  if (t) return t;
  const hint = getCurrentUser()?.email;
  if (serverOffline) {
    // Chưa có phiên máy chủ (đăng nhập từ bản cũ) hoặc phiên hết → đăng nhập lại một lần là xong.
    return (await refreshAccessToken()) || startServerLogin(hint);
  }
  // Như signIn: thư viện đã tải thì mở popup ngay, không await trước (Safari iPad).
  const fresh = window.google?.accounts?.oauth2
    ? await requestToken({ hint })
    : await loadGis().then(() => requestToken({ hint }));
  return fresh.accessToken;
}

/**
 * Xin lại quyền Google Drive (màn đồng ý hiện lại các ô quyền) — khi bé đã bỏ tick
 * "Xem và quản lý dữ liệu ứng dụng trong Google Drive" lúc đăng nhập. Gọi trong click.
 */
export async function requestDriveAccess() {
  const hint = getCurrentUser()?.email;
  if (serverOffline) return startServerLogin(hint); // luôn hiện màn đồng ý
  const fresh = window.google?.accounts?.oauth2
    ? await requestToken({ hint, consent: true })
    : await loadGis().then(() => requestToken({ hint, consent: true }));
  return fresh.accessToken;
}

/** Các quyền của token đang lưu (chuỗi cách nhau bằng dấu cách), hoặc ''. */
export function getStoredTokenScope() {
  return readJSON(TOKEN_KEY)?.scope || '';
}

/**
 * Access token đã lưu nếu còn hạn, không bao giờ mở popup; hết hạn thì null.
 * Token cấp cho Client ID cũ cũng coi như hết hạn (Firebase chỉ nhận token của project mình).
 */
export function getStoredAccessToken() {
  const t = readJSON(TOKEN_KEY);
  return t && t.clientId === CLIENT_ID && t.expiresAt - Date.now() > 60_000 ? t.accessToken : null;
}

/** Đăng xuất: thu hồi quyền truy cập và xoá phiên đăng nhập trên máy này. */
export function signOut() {
  const t = readJSON(TOKEN_KEY);
  writeJSON(TOKEN_KEY, null);
  writeJSON(USER_KEY, null);
  if (hasServerSession()) {
    writeJSON(SESSION_KEY, null);
    fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin', keepalive: true }).catch(() => {});
  }
  if (t?.accessToken && window.google?.accounts?.oauth2) {
    window.google.accounts.oauth2.revoke(t.accessToken, () => {});
  }
}

/**
 * Hỏi máy chủ có đăng nhập kiểu refresh token không; nếu không thì tải trước thư viện Google
 * để nút đăng nhập mở popup ngay khi bấm.
 */
export function preloadAuth() {
  return loadServerConfig().then(offline => (offline ? null : loadGis().then(getTokenClient))).catch(() => {});
}

// Biết sớm cách đăng nhập (getAccessToken/requestDriveAccess cần biết ngay trong click).
if (typeof window !== 'undefined') loadServerConfig();
