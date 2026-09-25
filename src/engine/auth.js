/**
 * Google Sign-In — chỉ cho vào ứng dụng sau khi đăng nhập.
 *
 * Dùng Google Identity Services (token model) chạy hoàn toàn trên trình duyệt:
 * chỉ cần Client ID (công khai), KHÔNG dùng client_secret. Xin sẵn quyền
 * drive.appdata để sau này lưu tiến trình vào thư mục ẩn của ứng dụng trong
 * Google Drive cá nhân của người dùng.
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
  }).then((resp) => {
    const token = {
      accessToken: resp.access_token,
      expiresAt: Date.now() + (Number(resp.expires_in) || 3600) * 1000,
      scope: resp.scope,
      clientId: CLIENT_ID,
    };
    writeJSON(TOKEN_KEY, token);
    return token;
  });
}

/** Đăng nhập: chọn tài khoản Google, lấy hồ sơ (tên, email, ảnh). */
export async function signIn() {
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
  // Như signIn: thư viện đã tải thì mở popup ngay, không await trước (Safari iPad).
  const fresh = window.google?.accounts?.oauth2
    ? await requestToken({ hint })
    : await loadGis().then(() => requestToken({ hint }));
  return fresh.accessToken;
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
  if (t?.accessToken && window.google?.accounts?.oauth2) {
    window.google.accounts.oauth2.revoke(t.accessToken, () => {});
  }
}

/** Tải trước thư viện Google để nút đăng nhập mở popup ngay khi bấm. */
export function preloadAuth() {
  return loadGis().then(getTokenClient).catch(() => {});
}
