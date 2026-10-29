/**
 * Đồng bộ tiến trình học của người đăng nhập lên Firestore (luôn tự động: phiên Firebase tự làm mới
 * mãi, không phụ thuộc token Google ~1 giờ như khi còn lưu Google Drive).
 *
 * Mọi thứ vẫn lưu trên máy (localStorage) như cũ; module này gom các khoá của người đang
 * đăng nhập và gộp hai chiều:
 *   - sổ sao, nhật ký học, sticker (khoá `tth_*_${id}`)
 *   - đáp án các sách, tô màu, điểm cao trò chơi, lịch sử thi (khoá `…@${id}`, xem auth.scopedKey)
 * Hồ sơ (tên, avatar, lớp) đã đồng bộ qua Firebase (leaderboard.js) nên không nằm ở đây.
 *
 * Trên Firestore (firestore.rules, chỉ chính chủ đọc/ghi):
 *   progress/{firebaseUid}             { h: { tên: mã băm giá trị }, drive?, updatedAt }
 *   progress/{firebaseUid}/items/{tên} { v: JSON của giá trị, updatedAt }
 * Mỗi lần đồng bộ đọc 1 tài liệu `h`, chỉ tải / ghi những mục có mã băm đổi (giữ trong hạn mức miễn phí).
 *
 * Gộp 3 chiều với bản đã đồng bộ lần trước (`tth_fsbase_${id}`): phần chỉ một bên đổi thì
 * lấy bên đó (kể cả xoá — "làm lại bài" không bị máy khác kéo về), hai bên cùng đổi thì cộng
 * dồn (số lấy lớn hơn, đúng/sai lấy "đã đúng", danh sách hợp lại).
 *
 * Trước đây lưu ở Google Drive (`tien-trinh.json` trong appDataFolder): lần đầu một máy còn token
 * Drive đồng bộ, bản trên Drive được gộp vào rồi đánh dấu `drive: true`, từ đó không đọc Drive nữa.
 */

import { getCurrentUser, getStoredTokenScope, getFreshAccessToken, userScope, scopedKey } from './auth.js';
import { firebaseSession, connectLeaderboard, isLeaderboardConfigured } from './leaderboard.js';

const FILE_NAME = 'tien-trinh.json';
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.appdata';
const FILES_API = 'https://www.googleapis.com/drive/v3/files';
const PROGRESS = 'progress';
const MAX_ITEM_CHARS = 900_000; // tài liệu Firestore tối đa 1 MiB

// Khoá đặt theo tài khoản từ trước: `${tên}_${id}`.
const PER_USER = ['tth_stars', 'tth_activity', 'tth_stickers'];
// Khoá trước đây lưu chung cả máy, nay là `${tên}@${id}` (auth.scopedKey).
const SCOPED = ['gw-progress-v1', 'gw2-progress-v1', 'gp-progress-v1', 'g2w-progress-v1', 'g2w2-progress-v1', 'g1w-progress-v1', 'g1w2-progress-v1', 'g4s-progress-v1',
  'g3games-best-v1', 'g3ws-v1', 'g3drill-weak-v1', 'memory-v1', 'math_game_progress', 'math_exam_history', 'writing-v1', 'life-v1', 'tv3w-v1', 'tv3spell-v1', 'tv3spell-tests-v1'];
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
const baseKey = (scope) => `tth_fsbase_${scope}`;
const DRIVE_BASE_KEY = (scope) => `tth_cloudbase_${scope}`; // bản gộp thời còn lưu Drive, xoá sau lần đồng bộ đầu
function readJSON(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } }
function writeJSON(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* storage full */ } }
const loadMeta = (scope) => readJSON(metaKey(scope)) || {};
const saveMeta = (scope, patch) => writeJSON(metaKey(scope), { ...loadMeta(scope), ...patch });

let state = 'idle'; // idle | syncing | ok | needs-auth (chưa có phiên Firebase) | offline | error
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
  let s = state;
  if ((s === 'idle' || s === 'ok') && m.lastSync) s = 'ok';
  return { state: s, dirty: !!m.dirty, lastSync: m.lastSync || 0 };
}


// ── Google Drive (chỉ để mang bài cũ sang Firestore) ─────────────────────────
async function drive(token, url) {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    const e = new Error(`Drive ${res.status}`);
    e.status = res.status;
    throw e;
  }
  return res;
}

/** Dữ liệu trong `tien-trinh.json` trên Drive; null nếu không lấy được token mà không bấm. */
async function pullDrive() {
  const token = await getFreshAccessToken();
  if (!token || !(getStoredTokenScope() || '').includes(DRIVE_SCOPE)) return null;
  const q = encodeURIComponent(`name='${FILE_NAME}'`);
  const list = await (await drive(token, `${FILES_API}?spaces=appDataFolder&q=${q}&fields=files(id)&orderBy=modifiedTime desc&pageSize=1`)).json();
  const id = list.files?.[0]?.id;
  return id ? ((await (await drive(token, `${FILES_API}/${id}?alt=media`)).json())?.data || {}) : {};
}

// ── Firestore ────────────────────────────────────────────────────────────────
/** Mã băm ngắn của một giá trị (hai lần FNV-1a 32 bit trên JSON ổn định). */
function hashOf(v) {
  const str = stable(v);
  let a = 0x811c9dc5, b = 0x01000193 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    a = Math.imul(a ^ c, 0x01000193);
    b = Math.imul(b ^ c, 0x5bd1e995);
  }
  return (a >>> 0).toString(16).padStart(8, '0') + (b >>> 0).toString(16).padStart(8, '0');
}
// Tên khoá có thể chứa "/" (gw-paint:…) → mã hoá thành id tài liệu hợp lệ.
const itemRef = (fb, uid, name) => fb.fs.doc(fb.db, PROGRESS, uid, 'items', encodeURIComponent(name));

/** Ghi nhiều thao tác, chia lô (tối đa 500 thao tác, ~10 MiB một lô). */
async function commitAll(fb, ops) {
  let batch = fb.fs.writeBatch(fb.db), count = 0, bytes = 0;
  for (const op of ops) {
    const size = op.data?.v?.length || 0;
    if (count && (count >= 400 || bytes + size > 8_000_000)) {
      await batch.commit();
      batch = fb.fs.writeBatch(fb.db); count = 0; bytes = 0;
    }
    if (op.data) batch.set(op.ref, op.data); else batch.delete(op.ref);
    count++; bytes += size;
  }
  if (count) await batch.commit();
}

// ── đồng bộ ──────────────────────────────────────────────────────────────────
let running = null;
let changeSeq = 0;
let timer = null;

async function run(fb) {
  const scope = getCurrentUser()?.id;
  const uid = fb.auth.currentUser?.uid;
  if (!scope || !uid) return;
  const seq = changeSeq;
  setState('syncing');
  try {
    const { fs } = fb;
    const metaRef = fs.doc(fb.db, PROGRESS, uid);
    const metaSnap = await fs.getDoc(metaRef);
    const meta = metaSnap.exists() ? metaSnap.data() : null;
    const remoteHashes = meta?.h || {};
    const base = readJSON(baseKey(scope)) || undefined;

    // Mục nào mã băm khớp bản đã đồng bộ lần trước thì khỏi tải.
    const remoteData = {};
    const need = [];
    for (const [name, h] of Object.entries(remoteHashes)) {
      if (base && name in base && hashOf(base[name]) === h) remoteData[name] = base[name];
      else need.push(name);
    }
    const snaps = await Promise.all(need.map(n => fs.getDoc(itemRef(fb, uid, n))));
    snaps.forEach((d, i) => {
      if (!d.exists()) return;
      try { remoteData[need[i]] = JSON.parse(d.data().v); } catch { /* hỏng thì bỏ */ }
    });

    // Một lần cho mỗi tài khoản: gộp bài cũ trên Google Drive (nếu máy này còn token Drive).
    const fromDrive = meta?.drive ? null : await pullDrive().catch(() => null);
    if (getCurrentUser()?.id !== scope) return; // đã đổi tài khoản trong lúc tải

    // Đọc–gộp–ghi liền nhau (không await ở giữa) để không mất bài bé vừa làm.
    const local = readLocal(scope);
    const withDrive = fromDrive ? mergeBundle(undefined, local, fromDrive, { fresh: true }) : local;
    const merged = mergeBundle(base, withDrive, remoteData, { fresh: !base });
    const pulled = writeLocal(scope, merged, local);

    const ops = [];
    const hashes = {};
    for (const [name, v] of Object.entries(merged)) {
      const json = JSON.stringify(v);
      if (json.length > MAX_ITEM_CHARS) { // quá lớn cho một tài liệu: chỉ giữ trên máy
        console.warn('[cloud] Bỏ qua mục quá lớn:', name, json.length);
        if (remoteHashes[name]) hashes[name] = remoteHashes[name];
        continue;
      }
      hashes[name] = hashOf(v);
      if (hashes[name] !== remoteHashes[name]) ops.push({ ref: itemRef(fb, uid, name), data: { v: json, updatedAt: fs.serverTimestamp() } });
    }
    for (const name of Object.keys(remoteHashes)) if (!(name in hashes)) ops.push({ ref: itemRef(fb, uid, name) });
    const driveDone = !!meta?.drive || fromDrive !== null;
    if (ops.length || !meta || (driveDone && !meta.drive)) {
      // Tài liệu `h` ghi sau cùng: máy khác chỉ thấy mã băm mới khi các mục đã lên.
      ops.push({ ref: metaRef, data: { h: hashes, ...(driveDone ? { drive: true } : {}), updatedAt: fs.serverTimestamp() } });
      await commitAll(fb, ops);
    }
    writeJSON(baseKey(scope), merged);
    try { localStorage.removeItem(DRIVE_BASE_KEY(scope)); } catch { /* ignore */ }
    saveMeta(scope, { lastSync: Date.now(), ...(changeSeq === seq ? { dirty: false } : {}) });
    setState('ok');
    if (changeSeq !== seq) syncSoon(); // bé làm thêm trong lúc đang tải lên → lưu nốt
    if (pulled) window.dispatchEvent(new CustomEvent('tth:cloud-pulled'));
  } catch (e) {
    console.warn('[cloud] Đồng bộ Firestore lỗi:', e?.code || e);
    setState(navigator.onLine === false || e?.code === 'unavailable' ? 'offline' : 'error');
  }
}

/**
 * Đồng bộ ngay. Phiên Firebase tự làm mới nên không cần bấm gì; chỉ khi máy chưa từng đăng nhập
 * Firebase mà token Google đã hết hạn thì `interactive` (PHẢI gọi trong click) mở popup Google.
 */
export function syncNow({ interactive = false } = {}) {
  if (!getCurrentUser() || !isLeaderboardConfigured()) return Promise.resolve();
  clearTimeout(timer);
  timer = null;
  if (running) return running;
  const fbP = interactive && state === 'needs-auth' ? connectLeaderboard() : firebaseSession();
  running = fbP.then((fb) => {
    if (!fb) return setState(loadMeta(userScope()).dirty ? 'needs-auth' : 'idle');
    return run(fb);
  })
    .catch((e) => { console.warn('[cloud] Chưa đăng nhập được Firebase:', e?.code || e?.message || e); setState(navigator.onLine === false ? 'offline' : 'error'); })
    .finally(() => { running = null; });
  return running;
}

// Gom lưu: bé làm liên tục thì tối đa ~3 phút một lần (mỗi lần lưu tốn lượt ghi Firestore, gói miễn phí
// 20 000 lượt/ngày); rời app / tắt màn hình thì lưu ngay (visibilitychange).
let dueAt = 0;
function syncSoon(ms = 60_000, maxWait = 180_000) {
  const now = Date.now();
  if (!timer) dueAt = now + maxWait;
  clearTimeout(timer);
  timer = setTimeout(() => syncNow(), Math.max(0, Math.min(ms, dueAt - now)));
}

/** Trước khi đăng xuất: đẩy nốt phần chưa lưu (tối đa vài giây). */
export function flushCloud(timeoutMs = 5000) {
  const user = getCurrentUser();
  if (!user || !loadMeta(user.id).dirty) return Promise.resolve();
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
    syncSoon();
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
