/**
 * Đồng bộ tiến trình học với Google Drive của người đăng nhập (thư mục ẩn appDataFolder —
 * chỉ app này đọc được, không hiện trong Drive của bạn).
 *
 * Mọi thứ vẫn lưu trên máy (localStorage) như cũ; module này gom các khoá của người đang
 * đăng nhập thành một tệp `tien-trinh.json` trên Drive và gộp hai chiều:
 *   - sổ sao, nhật ký học, sticker (khoá `tth_*_${id}`)
 *   - đáp án các sách, tô màu, điểm cao trò chơi, lịch sử thi (khoá `…@${id}`, xem auth.scopedKey)
 * Hồ sơ (tên, avatar, lớp) đã đồng bộ qua Firebase (leaderboard.js) nên không nằm ở đây.
 *
 * Gộp 3 chiều với bản đã đồng bộ lần trước (`tth_cloudbase_${id}`): phần chỉ một bên đổi thì
 * lấy bên đó (kể cả xoá — "làm lại bài" không bị máy khác kéo về), hai bên cùng đổi thì cộng
 * dồn (số lấy lớn hơn, đúng/sai lấy "đã đúng", danh sách hợp lại).
 *
 * Token Google sống ~1 giờ: đăng nhập qua máy chủ (api/auth, refresh token) thì tự lấy token mới,
 * lưu hoàn toàn tự động. Đăng nhập kiểu cũ (popup) thì hết hạn phải bấm nút ☁️ ở trang chủ —
 * bấm một lần sẽ chuyển sang đăng nhập qua máy chủ.
 */

import { getCurrentUser, getStoredAccessToken, getStoredTokenScope, getAccessToken, getFreshAccessToken, hasServerSession, requestDriveAccess, userScope, scopedKey } from './auth.js';

const FILE_NAME = 'tien-trinh.json';
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.appdata';
const FILES_API = 'https://www.googleapis.com/drive/v3/files';
const UPLOAD_API = 'https://www.googleapis.com/upload/drive/v3/files';

// Khoá đặt theo tài khoản từ trước: `${tên}_${id}`.
const PER_USER = ['tth_stars', 'tth_activity', 'tth_stickers'];
// Khoá trước đây lưu chung cả máy, nay là `${tên}@${id}` (auth.scopedKey).
const SCOPED = ['gw-progress-v1', 'gw2-progress-v1', 'gp-progress-v1', 'g2w-progress-v1', 'g2w2-progress-v1', 'g1w-progress-v1', 'g4s-progress-v1',
  'g3games-best-v1', 'g3ws-v1', 'g3drill-weak-v1', 'memory-v1', 'math_game_progress', 'math_exam_history', 'writing-v1'];
const SCOPED_PREFIX = ['gw-paint:'];

const isScopedName = (n) => SCOPED.includes(n) || SCOPED_PREFIX.some(p => n.startsWith(p));
const storageKeyOf = (name, scope) => (PER_USER.includes(name) ? `${name}_${scope}` : `${name}@${scope}`);

// ── dữ liệu trên máy ─────────────────────────────────────────────────────────
function allKeys() {
  const out = [];
  try { for (let i = 0; i < localStorage.length; i++) out.push(localStorage.key(i)); } catch { /* storage unavailable */ }
  return out;
}

/** { tên: giá trị } của một người trên máy này. */
function readLocal(scope) {
  const data = {};
  for (const k of allKeys()) {
    let name = null;
    const p = PER_USER.find(n => k === `${n}_${scope}`);
    if (p) name = p;
    else if (k.endsWith(`@${scope}`) && isScopedName(k.slice(0, -scope.length - 1))) name = k.slice(0, -scope.length - 1);
    if (!name) continue;
    try { const v = JSON.parse(localStorage.getItem(k)); if (v != null) data[name] = v; } catch { /* hỏng thì bỏ */ }
  }
  return data;
}

/** Ghi `next` xuống máy (chỉ khoá đổi); không phát tth:data-changed. Trả về có gì đổi không. */
function writeLocal(scope, next, prev) {
  let changed = false;
  try {
    for (const name of new Set([...Object.keys(prev), ...Object.keys(next)])) {
      if (same(next[name], prev[name])) continue;
      changed = true;
      if (next[name] === undefined) localStorage.removeItem(storageKeyOf(name, scope));
      else localStorage.setItem(storageKeyOf(name, scope), JSON.stringify(next[name]));
    }
  } catch (e) { console.warn('[cloud] Không ghi được dữ liệu xuống máy:', e); }
  return changed;
}

/** Khoá cũ lưu chung cả máy → chuyển sang khoá của người đang dùng (một lần). */
function claimLegacyKeys() {
  for (const k of allKeys()) if (k && !k.includes('@') && isScopedName(k)) scopedKey(k);
}

// ── gộp ──────────────────────────────────────────────────────────────────────
/** JSON không phụ thuộc thứ tự khoá (hai máy ghi cùng dữ liệu theo thứ tự khác nhau). */
function stable(v) {
  if (Array.isArray(v)) return `[${v.map(stable).join(',')}]`;
  if (v && typeof v === 'object') return `{${Object.keys(v).sort().map(k => `${JSON.stringify(k)}:${stable(v[k])}`).join(',')}}`;
  return v === undefined ? 'undefined' : JSON.stringify(v);
}
const same = (a, b) => stable(a) === stable(b);
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const itemId = (x) => (isObj(x) && 'id' in x ? `id:${x.id}` : JSON.stringify(x));

/** Gộp 3 chiều; `base` undefined = chưa đồng bộ lần nào → cộng dồn hai bên. */
export function merge3(base, local, remote) {
  if (same(local, remote)) return local;
  if (base !== undefined && same(local, base)) return remote;
  if (base !== undefined && same(remote, base)) return local;
  if (local === undefined || remote === undefined) {
    const kept = local === undefined ? remote : local;
    // Một bên xoá (vd. "làm lại bài"), bên kia sửa thêm: chỉ giữ phần bên kia mới thêm/sửa.
    if (isObj(base) && isObj(kept)) {
      const out = merge3(base, local ?? {}, remote ?? {});
      return Object.keys(out).length ? out : undefined;
    }
    return kept;
  }
  if (isObj(local) && isObj(remote)) {
    const b = isObj(base) ? base : {};
    const out = {};
    for (const k of new Set([...Object.keys(remote), ...Object.keys(local)])) {
      const v = merge3(isObj(base) ? b[k] : undefined, local[k], remote[k]);
      if (v !== undefined) out[k] = v;
    }
    return out;
  }
  if (Array.isArray(local) && Array.isArray(remote)) {
    const baseIds = new Set(Array.isArray(base) ? base.map(itemId) : []);
    const localIds = new Set(local.map(itemId));
    const remoteIds = new Set(remote.map(itemId));
    const seen = new Set();
    const out = [];
    for (const x of [...local, ...remote]) {
      const id = itemId(x);
      if (seen.has(id)) continue;
      seen.add(id);
      // Có trong bản chung mà một bên đã bỏ → coi như đã xoá.
      if (baseIds.has(id) && !(localIds.has(id) && remoteIds.has(id))) continue;
      out.push(x);
    }
    return out;
  }
  if (typeof local === 'number' && typeof remote === 'number') return Math.max(local, remote);
  if (typeof local === 'boolean' && typeof remote === 'boolean') return local || remote;
  return local;
}

function mergeBundle(base = {}, local, remote = {}, { fresh = false } = {}) {
  const out = {};
  for (const name of new Set([...Object.keys(local), ...Object.keys(remote), ...Object.keys(base)])) {
    let v = merge3(fresh ? undefined : base[name], local[name], remote[name]);
    if (v === undefined) continue;
    if (name === 'tth_stars' && isObj(v.wrong) && isObj(v.earned)) {
      // `wrong` chỉ giữ bài chưa nhận sao.
      for (const k of Object.keys(v.wrong)) if (k in v.earned) delete v.wrong[k];
    }
    if (name === 'math_exam_history' && Array.isArray(v)) v = [...v].sort((a, b) => (b?.id || 0) - (a?.id || 0)).slice(0, 20);
    out[name] = v;
  }
  return out;
}

// ── trạng thái đồng bộ của từng người trên máy ───────────────────────────────
const metaKey = (scope) => `tth_cloud_${scope}`;
const baseKey = (scope) => `tth_cloudbase_${scope}`;
function readJSON(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } }
function writeJSON(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* storage full */ } }
const loadMeta = (scope) => readJSON(metaKey(scope)) || {};
const saveMeta = (scope, patch) => writeJSON(metaKey(scope), { ...loadMeta(scope), ...patch });

let state = 'idle'; // idle | syncing | ok | needs-auth | needs-permission | offline | error
function setState(s) {
  if (s === state) return;
  state = s;
  window.dispatchEvent(new CustomEvent('tth:cloud-status'));
}

/** { state, dirty, lastSync } — cho nút ☁️ ở trang chủ. state 'guest' khi chưa đăng nhập. */
export function getCloudStatus() {
  const user = getCurrentUser();
  if (!user) return { state: 'guest', dirty: false, lastSync: 0 };
  const m = loadMeta(user.id);
  const needsAuth = !hasDriveToken() && !hasServerSession();
  let s = state;
  if (s === 'idle' || s === 'ok') s = needsAuth && m.dirty ? 'needs-auth' : (m.lastSync ? 'ok' : s);
  return { state: s, dirty: !!m.dirty, lastSync: m.lastSync || 0 };
}

function hasDriveToken() {
  return !!getStoredAccessToken() && (getStoredTokenScope() || '').includes(DRIVE_SCOPE);
}

// ── Google Drive ─────────────────────────────────────────────────────────────
async function drive(token, url, opts = {}) {
  const res = await fetch(url, { ...opts, headers: { Authorization: `Bearer ${token}`, ...opts.headers } });
  if (!res.ok) {
    const e = new Error(`Drive ${res.status}`);
    e.status = res.status;
    throw e;
  }
  return res;
}

async function findFileId(token) {
  const q = encodeURIComponent(`name='${FILE_NAME}'`);
  const res = await drive(token, `${FILES_API}?spaces=appDataFolder&q=${q}&fields=files(id,modifiedTime)&orderBy=modifiedTime desc&pageSize=10`);
  return (await res.json()).files?.[0]?.id || null;
}

async function download(token, id) {
  const res = await drive(token, `${FILES_API}/${id}?alt=media`);
  return res.json();
}

async function upload(token, id, bundle) {
  const json = JSON.stringify(bundle);
  if (id) {
    await drive(token, `${UPLOAD_API}/${id}?uploadType=media`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: json,
    });
    return id;
  }
  const b = `tth${Math.random().toString(36).slice(2)}`;
  const body = `--${b}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`
    + `${JSON.stringify({ name: FILE_NAME, parents: ['appDataFolder'], mimeType: 'application/json' })}\r\n`
    + `--${b}\r\nContent-Type: application/json\r\n\r\n${json}\r\n--${b}--`;
  const res = await drive(token, `${UPLOAD_API}?uploadType=multipart&fields=id`, {
    method: 'POST', headers: { 'Content-Type': `multipart/related; boundary=${b}` }, body,
  });
  return (await res.json()).id;
}

// ── đồng bộ ──────────────────────────────────────────────────────────────────
let running = null;
let changeSeq = 0;
let timer = null;

async function run(token) {
  const scope = getCurrentUser()?.id;
  if (!scope) return;
  const seq = changeSeq;
  setState('syncing');
  try {
    let fileId = loadMeta(scope).fileId || await findFileId(token);
    let remote = null;
    if (fileId) {
      try { remote = await download(token, fileId); } catch (e) {
        if (e.status !== 404) throw e;
        fileId = await findFileId(token); // tệp đã bị xoá (gỡ quyền app trong Google) → tạo lại
        remote = fileId ? await download(token, fileId) : null;
      }
    }
    if (getCurrentUser()?.id !== scope) return; // đã đổi tài khoản trong lúc tải

    // Đọc–gộp–ghi liền nhau (không await ở giữa) để không mất bài bé vừa làm.
    const local = readLocal(scope);
    const base = readJSON(baseKey(scope)) || undefined;
    const remoteData = remote?.data || {};
    const merged = mergeBundle(base, local, remoteData, { fresh: !base });
    const pulled = writeLocal(scope, merged, local);

    if (!fileId || !same(merged, remoteData)) {
      fileId = await upload(token, fileId, { v: 1, savedAt: new Date().toISOString(), data: merged });
    }
    writeJSON(baseKey(scope), merged);
    saveMeta(scope, { fileId, lastSync: Date.now(), ...(changeSeq === seq ? { dirty: false } : {}) });
    setState('ok');
    if (changeSeq !== seq) syncSoon(1000); // bé làm thêm trong lúc đang tải lên → lưu nốt
    if (pulled) window.dispatchEvent(new CustomEvent('tth:cloud-pulled'));
  } catch (e) {
    console.warn('[cloud] Đồng bộ Google Drive lỗi:', e?.status || e);
    if (e?.status === 401) setState('needs-auth');
    else if (e?.status === 403) setState('needs-permission');
    else setState(navigator.onLine === false ? 'offline' : 'error');
  }
}

/**
 * Đồng bộ ngay. Không `interactive` thì chỉ chạy khi còn token (không mở popup).
 * `interactive` PHẢI gọi trực tiếp trong click: có thể mở popup Google xin lại token/quyền Drive.
 */
export function syncNow({ interactive = false } = {}) {
  if (!getCurrentUser()) return Promise.resolve();
  clearTimeout(timer);
  timer = null;
  if (running) return running;
  let tokenP;
  if (hasDriveToken()) tokenP = Promise.resolve(getStoredAccessToken());
  else if (!interactive) tokenP = getFreshAccessToken(); // qua máy chủ, không popup; không có phiên → null
  else if (getStoredAccessToken() || state === 'needs-permission') tokenP = requestDriveAccess();
  else tokenP = getAccessToken();
  running = tokenP.then((t) => {
    if (!t) return setState(loadMeta(userScope()).dirty ? 'needs-auth' : 'idle');
    return hasDriveToken() ? run(t) : setState('needs-permission');
  })
    .catch((e) => { console.warn('[cloud] Chưa lấy được quyền Google Drive:', e?.message || e); setState('needs-auth'); })
    .finally(() => { running = null; });
  return running;
}

let dueAt = 0; // muộn nhất phải đồng bộ: bé gõ liên tục (bài văn tự lưu) thì không hoãn mãi
function syncSoon(ms = 5000, maxWait = 20_000) {
  const now = Date.now();
  if (!timer) dueAt = now + maxWait;
  clearTimeout(timer);
  timer = setTimeout(() => syncNow(), Math.max(0, Math.min(ms, dueAt - now)));
}

/** Trước khi đăng xuất: đẩy nốt phần chưa lưu (tối đa vài giây). */
export function flushCloud(timeoutMs = 5000) {
  const user = getCurrentUser();
  if (!user || !loadMeta(user.id).dirty || !(hasDriveToken() || hasServerSession())) return Promise.resolve();
  return Promise.race([syncNow(), new Promise(r => setTimeout(r, timeoutMs))]);
}

/** Dữ liệu khách trên máy → gộp vào tài khoản vừa đăng nhập, rồi xoá bản khách. */
function adoptGuestData(uid) {
  const guest = readLocal('guest');
  if (!Object.keys(guest).length) return;
  const mine = readLocal(uid);
  writeLocal(uid, mergeBundle(undefined, mine, guest, { fresh: true }), mine);
  for (const name of Object.keys(guest)) {
    try { localStorage.removeItem(storageKeyOf(name, 'guest')); } catch { /* ignore */ }
  }
  saveMeta(uid, { dirty: true });
}

let lastPull = 0;
export function initCloudSync() {
  claimLegacyKeys();

  window.addEventListener('tth:data-changed', () => {
    const user = getCurrentUser();
    if (!user) return;
    changeSeq++;
    if (!loadMeta(user.id).dirty) saveMeta(user.id, { dirty: true });
    if (hasDriveToken() || hasServerSession()) syncSoon();
    else setState('needs-auth');
  });
  window.addEventListener('tth:signed-in', (e) => {
    const uid = e.detail?.user?.id;
    if (!uid) return;
    setState('idle');
    claimLegacyKeys();
    adoptGuestData(uid);
    syncSoon(0);
  });
  // Token mới (đăng nhập lại, bấm Kết nối bảng xếp hạng…) → tranh thủ đồng bộ.
  window.addEventListener('tth:token', () => { if (getCurrentUser()) syncSoon(300); });
  document.addEventListener('visibilitychange', () => {
    const user = getCurrentUser();
    if (!user) return;
    if (document.visibilityState === 'hidden') {
      if (loadMeta(user.id).dirty) syncNow(); // bé tắt/chuyển app: lưu ngay
    } else if (Date.now() - lastPull > 60_000) { lastPull = Date.now(); syncNow(); } // lấy bài làm ở máy khác
  });

  if (getCurrentUser()) { lastPull = Date.now(); syncSoon(1000); }
}

/** Gọi khi vào trang chủ: lấy bài làm ở máy khác (tối đa mỗi phút một lần). */
export function pullIfStale() {
  if (!getCurrentUser() || Date.now() - lastPull < 60_000) return;
  lastPull = Date.now();
  syncNow();
}
