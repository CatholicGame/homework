/**
 * Sticker phần thưởng — cứ giải đúng solvesPerSpin() bài (lần đầu, có nhận sao)
 * thì được 1 lượt quay; mỗi lượt quay trúng một bộ trên vòng quay và nhận
 * 1 sticker của bộ đó (ưu tiên sticker bé chưa có).
 *
 * Bạn trai / bạn gái (theo hồ sơ) có vòng quay và các bộ sticker riêng.
 * Lưu theo từng tài khoản đăng nhập.
 */

import { getCurrentUser } from './auth.js';
import { getProfile, getProfileGrade } from './profile.js';
// CSS đi kèm module: trang chủ (banner) và trang vòng quay đều nạp module này.
import '../styles/stickers.css';

/**
 * Số bài cho 1 lượt quay, theo khối trong hồ sơ. Lớp 2–3 có ~650–750 câu, bộ sưu tập
 * ~65 sticker → 10 bài/lượt để gần hết sách mới đủ bộ; Tiền tiểu học (~260 câu) giữ 5.
 */
export function solvesPerSpin() {
  const grade = getProfileGrade();
  return grade == null || grade === -1 ? 5 : 10;
}

const FILES = import.meta.glob('../assets/sticker/{boy,girl}/*/*.png', { eager: true, import: 'default' });

export const WHEEL_IMG = {
  boy: new URL('../assets/sticker/boy_spin.png', import.meta.url).href,
  girl: new URL('../assets/sticker/girl_spin.png', import.meta.url).href,
};
export const CONFETTI_IMG = new URL('../assets/sticker/confetti_effect.svg', import.meta.url).href;
export const CONFETTI_SFX = new URL('../assets/sticker/confetti_sfx.mp3', import.meta.url).href;

/**
 * Các ô trên ảnh vòng quay, theo chiều kim đồng hồ bắt đầu từ vạch 12 giờ
 * (mỗi ô rộng bằng nhau). `folder` là thư mục sticker của bộ đó.
 */
const WHEELS = {
  boy: [
    { folder: 'dragonball', name: 'Bảy viên ngọc rồng', icon: '🐉' },
    { folder: 'transformers', name: 'Robot biến hình', icon: '🤖' },
    { folder: 'dino', name: 'Khủng long', icon: '🦖' },
    { folder: 'job', name: 'Nghề nghiệp', icon: '👨‍🚀' },
    { folder: 'sea_animal', name: 'Sinh vật biển', icon: '🐠' },
  ],
  girl: [
    { folder: 'cute_animal', name: 'Thú cưng dễ thương', icon: '🐱' },
    { folder: 'doll', name: 'Búp bê', icon: '🪆' },
    { folder: 'flower', name: 'Vườn hoa', icon: '🌸' },
    { folder: 'hello_kitty', name: 'Hello Kitty', icon: '🎀' },
  ],
};

function listStickers(gender, folder) {
  const prefix = `../assets/sticker/${gender}/${folder}/`;
  return Object.entries(FILES)
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, url]) => ({ id: `${gender}/${folder}/${path.slice(prefix.length, -4)}`, url }))
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
}

/** Vòng quay của bé: bạn gái → vòng hồng, còn lại → vòng bạn trai. */
export function getGender() {
  if (import.meta.env.DEV) {
    const forced = sessionStorage.getItem('tth_dev_gender');
    if (forced === 'boy' || forced === 'girl') return forced;
  }
  return getProfile().gender === 'girl' ? 'girl' : 'boy';
}

/** Các bộ sticker của vòng quay: [{ folder, name, icon, stickers: [{ id, url }] }]. */
export function getSets(gender = getGender()) {
  return WHEELS[gender].map(s => ({ ...s, stickers: listStickers(gender, s.folder) }));
}

function storeKey() {
  return `tth_stickers_${getCurrentUser()?.id || 'guest'}`;
}

/**
 * { solves: số bài giải đúng từ khi có sticker, earned: số lượt quay đã được, spinsUsed,
 *   progress: số bài đã làm tới lượt kế tiếp, owned: { id: số lần nhận }, at: { id: 'YYYY-MM-DD' } }
 * Lượt đã được lưu riêng (không tính lại từ solves) để đổi số bài/lượt không làm mất lượt cũ.
 */
function load() {
  try {
    const d = JSON.parse(localStorage.getItem(storeKey()));
    if (d && typeof d.solves === 'number') {
      const out = { spinsUsed: 0, owned: {}, at: {}, ...d };
      // Dữ liệu cũ (luôn 5 bài/lượt) chưa có earned/progress.
      if (typeof out.earned !== 'number') {
        out.earned = Math.floor(out.solves / 5);
        out.progress = out.solves % 5;
      }
      return out;
    }
  } catch { /* ignore */ }
  return { solves: 0, earned: 0, spinsUsed: 0, progress: 0, owned: {}, at: {} };
}

function save(d) {
  try { localStorage.setItem(storeKey(), JSON.stringify(d)); } catch { /* storage unavailable */ }
  window.dispatchEvent(new CustomEvent('tth:stickers-changed'));
}

/** Tiến độ: { spins: lượt quay còn lại, progress: số bài đã làm tới lượt kế tiếp (0…need-1), need } */
export function getSpinStatus() {
  const d = load();
  const need = solvesPerSpin();
  return {
    spins: Math.max(0, d.earned - d.spinsUsed),
    progress: Math.min(d.progress, need - 1),
    need,
  };
}

/**
 * Ghi một bài vừa giải đúng lần đầu. Trả về true nếu bài này vừa đủ để nhận thêm 1 lượt quay.
 */
export function recordSolveForSpin() {
  const d = load();
  d.solves++;
  d.progress++;
  const got = d.progress >= solvesPerSpin();
  if (got) {
    d.earned++;
    d.progress = 0;
  }
  save(d);
  return got;
}

/** { id: số lần nhận } của các sticker bé đã có. */
export function getOwned() {
  return load().owned;
}

/** { id: 'YYYY-MM-DD' } — ngày nhận sticker lần đầu. */
export function getReceivedDates() {
  return load().at;
}

export function countOwned(gender = getGender()) {
  const owned = load().owned;
  return getSets(gender).reduce((n, s) => n + s.stickers.filter(st => owned[st.id]).length, 0);
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Dùng 1 lượt quay. Trả về { setIndex, set, sticker, isNew } hoặc null nếu hết lượt.
 * Ô trúng được chọn trong các bộ còn sticker chưa có (hết cả thì chọn bất kỳ, nhận sticker trùng).
 */
export function spin(gender = getGender()) {
  const d = load();
  if (d.earned - d.spinsUsed <= 0) return null;
  const sets = getSets(gender);
  const missing = (s) => s.stickers.filter(st => !d.owned[st.id]);
  const open = sets.map((s, i) => i).filter(i => missing(sets[i]).length);
  const setIndex = open.length ? pick(open) : Math.floor(Math.random() * sets.length);
  const set = sets[setIndex];
  const pool = missing(set).length ? missing(set) : set.stickers;
  const sticker = pick(pool);
  const isNew = !d.owned[sticker.id];
  d.spinsUsed++;
  d.owned[sticker.id] = (d.owned[sticker.id] || 0) + 1;
  if (isNew) {
    const now = new Date();
    d.at[sticker.id] = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }
  save(d);
  return { setIndex, set, sticker, isNew, segments: sets.length };
}

/** Chỉ dùng ở bản dev (phím tắt thử nghiệm): cộng `n` lượt quay. */
export function devAddSpins(n) {
  const d = load();
  d.solves += n * solvesPerSpin();
  d.earned += n;
  save(d);
}

/** Chỉ dùng ở bản dev: xoá hết lượt quay và sticker của tài khoản hiện tại. */
export function devReset() {
  try { localStorage.removeItem(storeKey()); } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent('tth:stickers-changed'));
}

/** Thông báo nhỏ khi vừa đủ số bài để nhận lượt quay. */
export function showSpinToast() {
  const el = document.createElement('div');
  el.className = 'spin-toast';
  el.innerHTML = '<span class="spin-toast-icon">🎁</span><span>Em được <strong>1 lượt quay sticker</strong>!</span>';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}
