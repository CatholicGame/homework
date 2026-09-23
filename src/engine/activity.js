/**
 * Nhật ký học hằng ngày — dữ liệu cho bảng theo dõi ở trang chủ.
 *
 * Mỗi ngày (theo giờ máy) lưu: số bài giải đúng lần đầu, số sao nhận được,
 * số lượt trả lời và số lượt trả lời đúng. Lưu theo từng tài khoản đăng nhập
 * (sau này đồng bộ lên Google Drive cùng sổ sao).
 */

import { getCurrentUser } from './auth.js';

export const DAILY_GOAL_STARS = 15;

function storeKey() {
  return `tth_activity_${getCurrentUser()?.id || 'guest'}`;
}

function load() {
  try {
    const d = JSON.parse(localStorage.getItem(storeKey()));
    if (d && d.days) return d;
  } catch { /* ignore */ }
  return { days: {} };
}

function save(d) {
  try { localStorage.setItem(storeKey(), JSON.stringify(d)); } catch { /* storage unavailable */ }
}

/** 'YYYY-MM-DD' theo giờ địa phương (không dùng UTC để 7h sáng VN vẫn là hôm nay). */
export function dayKey(date = new Date()) {
  const y = date.getFullYear(), m = String(date.getMonth() + 1).padStart(2, '0'), d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Khoá tuần: ngày thứ Hai đầu tuần (giờ địa phương), 'YYYY-MM-DD'. */
export function weekKey(date = new Date()) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return dayKey(d);
}

/** Khoá tháng: 'YYYY-MM'. */
export function monthKey(date = new Date()) {
  return dayKey(date).slice(0, 7);
}

function bump(fields) {
  const d = load();
  const k = dayKey();
  const day = d.days[k] || (d.days[k] = { solved: 0, stars: 0, attempts: 0, correct: 0 });
  for (const [f, n] of Object.entries(fields)) day[f] = (day[f] || 0) + n;
  save(d);
}

/** Một lượt bấm "Kiểm tra"/chọn đáp án. */
export function recordAttempt(correct) {
  bump({ attempts: 1, correct: correct ? 1 : 0 });
}

/** Giải đúng một bài lần đầu và nhận `stars` sao. */
export function recordSolve(stars) {
  bump({ solved: 1, stars });
}

/** Sách/trò chơi mở gần nhất (cho nút "Tiếp tục học"). */
export function setLastGame(gameId) {
  const d = load();
  d.lastGame = gameId;
  save(d);
}

export function getLastGame() {
  return load().lastGame || null;
}

const EMPTY_DAY = { solved: 0, stars: 0, attempts: 0, correct: 0 };

/** Số liệu cho bảng theo dõi: hôm nay, chuỗi ngày liên tiếp, 7 ngày gần nhất. */
export function getDashboard() {
  const { days } = load();
  const today = new Date();
  const todayKey = dayKey(today);

  const last7 = [];
  for (let i = 6; i >= 0; i--) {
    const dt = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    last7.push({ date: dt, key: dayKey(dt), ...EMPTY_DAY, ...days[dayKey(dt)] });
  }

  // Chuỗi ngày học liên tiếp (có ít nhất 1 bài giải đúng). Hôm nay chưa học
  // thì chuỗi vẫn tính đến hôm qua — chưa bị "đứt" cho tới hết ngày.
  let streak = 0;
  const learned = (k) => (days[k]?.solved || 0) > 0;
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (!learned(todayKey)) cursor.setDate(cursor.getDate() - 1);
  while (learned(dayKey(cursor))) { streak++; cursor.setDate(cursor.getDate() - 1); }

  return { today: { ...EMPTY_DAY, ...days[todayKey] }, streak, last7 };
}
