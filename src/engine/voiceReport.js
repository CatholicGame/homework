/**
 * Báo cho admin những máy không có giọng đọc tiếng Việt (sách Tiền tiểu học đọc to mọi lời dặn).
 * Không hiện gì cho bé / bố mẹ — chỉ ghi lên Firestore `voiceIssues/{uid}_{deviceId}`:
 *   { uid, email, status, browser, os, device, model, ua, voices, langs, online, createdAt, lastSeenAt }
 * status: 'online' (không có giọng tiếng Việt, đang đọc bằng giọng trực tuyến) · 'none' (không đọc
 * được) · 'local' (máy đã báo trước đây, nay đã có giọng tiếng Việt).
 * Mỗi máy ghi tối đa 1 lần/ngày, trừ khi tình trạng đổi. Admin xem ở tab 🔊 Giọng đọc (#admin).
 */

import { firebaseSession } from './leaderboard.js';

const COLLECTION = 'voiceIssues';
const DEVICE_KEY = 'voice-device-id';
const SENT_KEY = 'voice-report';

function store(key, value) {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch { /* storage unavailable */ }
  return null;
}

function deviceId() {
  let id = store(DEVICE_KEY);
  if (!id) {
    id = Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
    store(DEVICE_KEY, id);
  }
  return id;
}

/** Trình duyệt, hệ điều hành, loại máy đọc từ userAgent (đủ để admin biết máy nào). */
export function describeDevice(ua = navigator.userAgent) {
  const v = (re) => ua.match(re)?.[1] || '';
  const iPadOS = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
  let browser = 'Khác';
  if (/Zalo/i.test(ua)) browser = 'Zalo (trong app)';
  else if (/FBAN|FBAV|FB_IAB/.test(ua)) browser = 'Facebook (trong app)';
  else if (/coc_coc|CocCoc/i.test(ua)) browser = `Cốc Cốc ${v(/coc_coc_browser\/([\d.]+)/i)}`;
  else if (/SamsungBrowser/.test(ua)) browser = `Samsung Internet ${v(/SamsungBrowser\/([\d.]+)/)}`;
  else if (/EdgA?\/|EdgiOS/.test(ua)) browser = `Edge ${v(/Edg(?:A|iOS)?\/([\d.]+)/)}`;
  else if (/OPR\/|Opera/.test(ua)) browser = `Opera ${v(/OPR\/([\d.]+)/)}`;
  else if (/Firefox\/|FxiOS/.test(ua)) browser = `Firefox ${v(/(?:Firefox|FxiOS)\/([\d.]+)/)}`;
  else if (/CriOS/.test(ua)) browser = `Chrome iOS ${v(/CriOS\/([\d.]+)/)}`;
  else if (/Chrome\//.test(ua)) browser = `Chrome ${v(/Chrome\/([\d.]+)/)}`;
  else if (/Safari\//.test(ua)) browser = `Safari ${v(/Version\/([\d.]+)/)}`;

  let os = 'Khác';
  if (/Windows NT/.test(ua)) os = /Windows NT 10/.test(ua) ? 'Windows 10/11' : `Windows NT ${v(/Windows NT ([\d.]+)/)}`;
  else if (/Android/.test(ua)) os = `Android ${v(/Android ([\d.]+)/)}`;
  else if (/iPhone|iPad|iPod/.test(ua)) os = `iOS ${v(/OS ([\d_]+)/).replace(/_/g, '.')}`;
  else if (iPadOS) os = 'iPadOS';
  else if (/Mac OS X/.test(ua)) os = `macOS ${v(/Mac OS X ([\d_]+)/).replace(/_/g, '.')}`;
  else if (/CrOS/.test(ua)) os = 'ChromeOS';
  else if (/Linux/.test(ua)) os = 'Linux';

  const tablet = iPadOS || /iPad|Tablet/.test(ua) || (/Android/.test(ua) && !/Mobile/.test(ua));
  const phone = !tablet && /Mobi|iPhone|iPod|Android/.test(ua);
  const device = tablet ? 'Máy tính bảng' : phone ? 'Điện thoại' : 'Máy tính';
  // Android ghi tên máy trong userAgent: "...; SM-A536E Build/..." hoặc "...; Redmi Note 11)".
  const model = /Android/.test(ua) ? (v(/Android [\d.]+; (?:[a-z]{2}-[a-z]{2}; )?([^;)]+?)(?: Build\/|\))/i) || '') : (iPadOS || /iPad/.test(ua) ? 'iPad' : /iPhone/.test(ua) ? 'iPhone' : '');
  return { browser: browser.trim(), os: os.trim(), device, model: model.trim() };
}

/**
 * Ghi tình trạng giọng đọc của máy này (lặng lẽ, lỗi thì bỏ qua).
 * @param {'local'|'online'|'none'|'unknown'} status
 * @param {{ voices: number, langs: string[] }} info
 */
export async function reportVoiceStatus(status, info) {
  if (status === 'unknown') return;
  const day = new Date().toISOString().slice(0, 10);
  let sent = null;
  try { sent = JSON.parse(store(SENT_KEY) || 'null'); } catch { sent = null; }
  // Máy có giọng tiếng Việt: chỉ ghi khi trước đây đã báo lỗi (để admin thấy đã khắc phục).
  if (status === 'local' && (!sent || sent.status === 'local')) return;
  if (sent && sent.status === status && sent.day === day) return;
  try {
    const fb = await firebaseSession();
    if (!fb) return; // chưa kết nối Firebase: lần sau thử lại
    const { db, fs, auth } = fb;
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const ref = fs.doc(db, COLLECTION, `${uid}_${deviceId()}`);
    const dev = describeDevice();
    const data = {
      uid,
      email: (auth.currentUser.email || '').slice(0, 200),
      status,
      browser: dev.browser.slice(0, 60),
      os: dev.os.slice(0, 60),
      device: dev.device.slice(0, 40),
      model: dev.model.slice(0, 80),
      ua: navigator.userAgent.slice(0, 400),
      voices: Math.min(info?.voices || 0, 9999),
      langs: (info?.langs || []).join(', ').slice(0, 400),
      online: navigator.onLine !== false,
      lastSeenAt: fs.serverTimestamp(),
    };
    const existing = await fs.getDoc(ref);
    if (existing.exists()) await fs.updateDoc(ref, data);
    else await fs.setDoc(ref, { ...data, createdAt: fs.serverTimestamp() });
    store(SENT_KEY, JSON.stringify({ status, day }));
  } catch { /* không có mạng / rules chưa triển khai: bỏ qua */ }
}

// ── Admin ────────────────────────────────────────────────────────────────────
const toMs = (ts) => (ts?.toMillis ? ts.toMillis() : 0);

export async function fetchVoiceIssues() {
  const fb = await firebaseSession();
  if (!fb) throw new Error('need-connect');
  const { db, fs } = fb;
  const snap = await fs.getDocs(fs.collection(db, COLLECTION));
  return snap.docs.map((d) => {
    const r = d.data();
    return { id: d.id, ...r, createdAt: toMs(r.createdAt), lastSeenAt: toMs(r.lastSeenAt) || Date.now() };
  }).sort((a, b) => b.lastSeenAt - a.lastSeenAt);
}

export async function deleteVoiceIssue(id) {
  const fb = await firebaseSession();
  if (!fb) throw new Error('need-connect');
  await fb.fs.deleteDoc(fb.fs.doc(fb.db, COLLECTION, id));
}
