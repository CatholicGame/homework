/**
 * "🟢 N người đang xem" ở trang chủ. N = số thật + số đệm (docs/nguoixem.md).
 *
 * Số đệm tính từ đồng hồ theo giờ Việt Nam (UTC+7), không cần máy chủ: mọi máy cùng lúc thấy cùng số.
 * Số thật: mỗi máy đã đăng nhập ghi `presence/{uid}` = { at } mỗi 4 phút khi tab đang hiện,
 * rồi đếm bản ghi có `at` trong 6 phút gần nhất (getCountFromServer).
 */

import { firebaseSession } from './leaderboard.js';

// Giờ đông người, theo giờ Việt Nam: [giờ bắt đầu, giờ kết thúc, số đệm thấp, cao] (17.5 = 17h30).
// Buổi trưa là giờ phụ huynh nghỉ trưa vào xem app, nên chỉ tăng nhẹ.
const PEAKS = {
  weekday: [[17.5, 22, 100, 200], [11.5, 12.5, 30, 60]],
  weekend: [[9, 22, 100, 200]],
};
const WEEKEND = [6, 0];   // thứ Bảy, Chúa Nhật
const QUIET = [4, 14];    // ngoài giờ đông người
const RAMP = 0.75;        // giờ lên / xuống dần trước giờ bắt đầu và sau giờ kết thúc

const BEAT = 4 * 60e3;        // ghi presence
const WINDOW = 6 * 60e3;      // ai ghi trong khoảng này thì đang xem
const COUNT_EVERY = 2 * 60e3; // đếm số thật, vào mốc chung của mọi máy
const TICK = 5e3;             // vẽ lại số

const VN = 7 * 3600e3;

// ── Số đệm ───────────────────────────────────────────────────────────────────
// Nhiễu trơn: mỗi nút (mốc chia hết cho `period`) có một giá trị giả ngẫu nhiên theo chỉ số nút,
// giữa hai nút nội suy cos → số nhích từ từ, mọi máy giống nhau.
function hash(n) {
  let x = (n | 0) ^ 0x9e3779b9;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967295 * 2 - 1; // −1…1
}
function smooth(t, period, salt) {
  const k = Math.floor(t / period);
  const f = (1 - Math.cos((t / period - k) * Math.PI)) / 2;
  return hash(k * 31 + salt) * (1 - f) + hash((k + 1) * 31 + salt) * f;
}
const clamp01 = x => Math.min(1, Math.max(0, x));
const ease = x => x * x * (3 - 2 * x);

/** 0 ngoài khung giờ, 1 trong khung, lên / xuống dần trong RAMP giờ. */
const level = (h, start, end) => ease(clamp01(Math.min((h - start + RAMP) / RAMP, (end + RAMP - h) / RAMP)));

/** Số đệm lúc t (ms). */
export function buffer(t = Date.now()) {
  // Sóng chậm (25 phút) quyết định mức, sóng nhanh hơn làm số nhích; giãn ×1.5 để chạm gần hai đầu khoảng.
  const n = 0.6 * smooth(t, 25 * 60e3, 1) + 0.3 * smooth(t, 7 * 60e3, 2) + 0.1 * smooth(t, 90e3, 3);
  const u = clamp01((n * 1.5 + 1) / 2);
  const at = (lo, hi) => lo + (hi - lo) * u;
  const vn = new Date(t + VN);
  const h = vn.getUTCHours() + vn.getUTCMinutes() / 60 + vn.getUTCSeconds() / 3600;
  const quiet = at(...QUIET);
  let v = quiet;
  for (const [start, end, lo, hi] of PEAKS[WEEKEND.includes(vn.getUTCDay()) ? 'weekend' : 'weekday']) {
    const k = level(h, start, end);
    v = Math.max(v, quiet * (1 - k) + at(lo, hi) * k);
  }
  return Math.round(v + smooth(t, 40e3, 4) * 2);
}

// ── Số thật ──────────────────────────────────────────────────────────────────
let real = 1;          // chưa đếm được: chỉ tính máy này
let started = false;

async function beat() {
  if (document.visibilityState !== 'visible') return;
  try {
    const fb = await firebaseSession();
    const uid = fb?.auth.currentUser?.uid;
    if (!uid) return;
    const { fs, db } = fb;
    await fs.setDoc(fs.doc(db, 'presence', uid), { at: fs.serverTimestamp() });
  } catch { /* mạng lỗi: lần sau ghi lại */ }
}

async function count() {
  try {
    const fb = await firebaseSession();
    if (!fb?.auth.currentUser) { real = 1; return; }
    const { fs, db } = fb;
    const since = fs.Timestamp.fromMillis(Date.now() - WINDOW);
    const snap = await fs.getCountFromServer(fs.query(fs.collection(db, 'presence'), fs.where('at', '>=', since)));
    real = Math.max(1, snap.data().count);
  } catch { real = 1; }
}

function startSync() {
  if (started) return;
  started = true;
  beat();
  count();
  setInterval(beat, BEAT);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') beat(); });
  // Mốc chung: chia hết cho COUNT_EVERY, cộng 3 giây (để các lần ghi vừa xong kịp vào).
  const next = () => setTimeout(() => { count(); next(); }, COUNT_EVERY - (Date.now() % COUNT_EVERY) + 3e3);
  next();
}

// ── Hiển thị ─────────────────────────────────────────────────────────────────
export const liveCountHtml = () => `
  <p class="home-live" id="home-live" aria-live="off">
    <span class="home-live-dot" aria-hidden="true"></span>
    <span><strong class="home-live-n">${real + buffer()}</strong> người đang xem</span>
  </p>`;

/** Gắn vào phần tử .home-live; tự dừng khi trang chủ bị thay. */
export function startLiveCount(el) {
  if (!el) return;
  startSync();
  const num = el.querySelector('.home-live-n');
  const timer = setInterval(() => {
    if (!el.isConnected) { clearInterval(timer); return; }
    const n = String(real + buffer());
    if (num.textContent === n) return;
    num.textContent = n;
    num.classList.remove('is-bump');
    void num.offsetWidth;
    num.classList.add('is-bump');
  }, TICK);
}
