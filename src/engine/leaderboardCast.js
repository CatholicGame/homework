/**
 * "Diễn viên quần chúng" trên bảng xếp hạng: các bạn ảo trong data/leaderboardCast.js.
 *
 * Các bạn ảo không có hàng trên Firestore — chỉ được trộn vào kết quả fetchLeaderboard(),
 * nên trang admin (đọc thẳng users/profiles/leaderboard) không đếm nhầm là học sinh.
 *
 * Luật sao (để công bằng và tạo động lực cho bé thật):
 *   - KHỞI ĐỘNG: ngày mở bảng cho một lớp, chụp lại sao của bé thật cao nhất lớp (`top`, lưu
 *     một lần trên Firestore `castLaunch/g{lớp}`, không sửa được). LEADERS bạn ảo đứng trên bé
 *     đó một chút (bé thật cao nhất ≈ hạng LEADERS + 1), các bạn còn lại rải dần xuống 0 — các
 *     bé thật khác xen vào giữa.
 *   - MỖI NGÀY mỗi bạn được cộng sao theo nhóm: 15–30 (học nhiều), 5–15, 0–5, hoặc nghỉ. Cả lớp
 *     tính chung ≈ 30% / 30% / 30% / 10% (trung bình ≈ 10 sao/ngày/bạn, bé thật chăm được 15–30);
 *     bạn chăm (cột sao/tháng cao trong CAST) rơi vào nhóm cao nhiều hơn, bạn lười thì ngược lại,
 *     và độ hăng hái đổi theo tuần → thứ hạng đổi chỗ nhưng vẫn có đầu bảng, cuối bảng.
 *     Từ SLOW_FROM mọi bạn chỉ còn SLOW_RATE số sao đó (≈ 3 sao/ngày) để bé thật đuổi kịp.
 *   - CHỈ TĂNG, MỌI MÁY THẤY NHƯ NHAU: sao mỗi ngày tính tất định từ (bạn, ngày) bằng hàm băm,
 *     tổng = sao khởi động + các ngày đã qua; hôm nay tăng dần qua 1–3 buổi học (sáng sớm, trưa, chiều, tối).
 * Bé học 15–30 sao/ngày sẽ leo dần lên đầu; bé nghỉ vài ngày sẽ bị các bạn vượt.
 */

import { CAST } from '../data/leaderboardCast.js';
import { dayKey, weekKey, monthKey } from './activity.js';

// Số bạn ảo đứng trên bé thật cao nhất lúc khởi động, và hơn bao nhiêu (bạn đầu bảng ≈ +30%).
const LEADERS = 4;
const LEAD_MAX = 0.3;
// Lớp chưa có bé thật nào có sao: coi như bé cao nhất có chừng này sao.
const FLOOR_TOP = 20;
// Nhóm sao mỗi ngày: [từ, tới] (tới không tính).
const TIER_HIGH = [15, 31], TIER_MID = [5, 15], TIER_LOW = [0, 5];
// Từ ngày SLOW_FROM, sao mỗi ngày của mọi bạn ảo chỉ còn SLOW_RATE (30%) để bé thật đuổi kịp.
// Các ngày trước giữ nguyên nên tổng sao không bao giờ tụt.
const SLOW_FROM = '2026-10-10', SLOW_RATE = 0.3;

/** Số giả 0..1 tất định từ các khoá (FNV-1a + xáo bit). */
function rand(...keys) {
  let h = 2166136261;
  for (const ch of keys.join('|')) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  h ^= h >>> 15; h = Math.imul(h, 2246822507); h ^= h >>> 13;
  return (h >>> 0) / 4294967296;
}

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const parseDay = (k) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));

// ── Ảnh chụp ngày khởi động ─────────────────────────────────────────────────
/** @typedef {{ start: string, top: number }} Launch start = ngày khởi động 'YYYY-MM-DD'; top = sao bé thật cao nhất lớp lúc đó. */

/** Ảnh chụp khởi động cho một lớp từ các hàng leaderboard/{uid} thật cùng lớp. */
export function makeLaunch(realRows, grade, now = new Date()) {
  const top = Math.max(0, ...realRows.map(r => r.gradeStars?.[`g${grade}`] || 0));
  return { start: dayKey(now), top: top || FLOOR_TOP };
}

// ── Từng bạn ảo ─────────────────────────────────────────────────────────────
// Trong mỗi lớp, xếp các bạn theo cột "tổng sao" của CAST (rank 0 = đầu bảng lúc khởi động)
// và theo cột "sao/tháng" (diligence 0 = lười nhất … 1 = chăm nhất).
const memberCache = new Map();
function members(grade) {
  if (!memberCache.has(grade)) {
    const list = CAST.flatMap((cast, i) => (cast[2] === grade ? [{ cast, id: `cast-${i + 1}` }] : []));
    const byBase = [...list].sort((a, b) => b.cast[3] - a.cast[3]);
    const byMonth = [...list].sort((a, b) => a.cast[4] - b.cast[4]);
    const n = list.length;
    list.forEach((m) => {
      m.rank = byBase.indexOf(m);
      m.diligence = n > 1 ? byMonth.indexOf(m) / (n - 1) : 0.5;
    });
    memberCache.set(grade, list);
  }
  return memberCache.get(grade);
}

/** Sao lúc khởi động: LEADERS bạn trên `top`, các bạn sau rải dần từ ngay dưới `top` xuống 0. */
function launchStars(m, launch, n) {
  const jitter = rand(m.id, 'base');
  if (m.rank < LEADERS) {
    const lead = LEAD_MAX * (LEADERS - m.rank) / LEADERS;              // 30%, 22%, 15%, 7%
    return Math.round(launch.top * (1 + lead * (0.85 + 0.3 * jitter))) + 1;
  }
  const rest = Math.max(1, n - LEADERS - 1);
  const f = 1 - (m.rank - LEADERS) / rest;                             // 1 → 0
  return Math.min(launch.top - 1, Math.round(launch.top * 0.97 * f ** 1.4 * (0.85 + 0.15 * jitter)));
}

/** Sao cả ngày của một bạn: bốc nhóm theo độ chăm (lệch theo tuần), rồi bốc số trong nhóm. */
function dayStars(m, date) {
  const key = dayKey(date);
  const d = clamp(m.diligence + 0.3 * (rand(m.id, 'w', weekKey(date)) - 0.5), 0, 1);
  // d = 0: 5% cao / 30% vừa / 50% thấp / 15% nghỉ; d = 1: 55% / 30% / 10% / 5% → cả lớp ≈ 30/30/30/10.
  const pHigh = 0.05 + 0.5 * d, pMid = 0.3, pOff = 0.15 - 0.1 * d;
  const r = rand(m.id, 'tier', key);
  const tier = r < pHigh ? TIER_HIGH : r < pHigh + pMid ? TIER_MID : r < 1 - pOff ? TIER_LOW : null;
  if (!tier) return 0;
  const k = tier[0] + Math.floor(rand(m.id, 'n', key) * (tier[1] - tier[0]));
  return key >= SLOW_FROM ? Math.round(k * SLOW_RATE) : k;
}

// Các khung giờ học trong ngày (giờ thập phân): sáng sớm trước giờ đi học, chiều, tối.
const SLOTS = [[6, 7.5], [11.5, 13], [15, 18], [19, 21.5]];

/**
 * Các buổi học của bạn trong một ngày: 1–3 buổi ở các khung khác nhau, mỗi buổi 20–60 phút,
 * chia nhau số sao cả ngày theo `share` — nên mở bảng giờ nào cũng thấy vài bạn vừa tăng sao.
 */
function studySessions(id, date) {
  const key = dayKey(date);
  const count = 1 + Math.floor(3 * rand(id, 'c', key));
  const picked = SLOTS.map((slot, i) => ({ slot, r: rand(id, 's', i, key) }))
    .sort((a, b) => a.r - b.r).slice(0, count)
    .map(({ slot }) => slot).sort((a, b) => a[0] - b[0]);
  const weights = picked.map((_, i) => 0.5 + rand(id, 'w', i, key));
  const sum = weights.reduce((a, b) => a + b, 0);
  return picked.map(([from, to], i) => {
    const len = (20 + 40 * rand(id, 'l', i, key)) / 60;
    return { start: from + (to - from - len) * rand(id, 'h', i, key), len, share: weights[i] / sum };
  });
}

/** Phần sao hôm nay đã kiếm được tới lúc `now`. */
function todayProgress(id, now) {
  const hour = now.getHours() + now.getMinutes() / 60;
  return studySessions(id, now)
    .reduce((p, { start, len, share }) => p + share * clamp((hour - start) / len, 0, 1), 0);
}

const atHour = (date, h) => startOfDay(date).getTime() + Math.round(h * 3_600_000);

/** Sao của một bạn ảo: tổng, tháng, tuần, hôm nay — chỉ đếm từ ngày khởi động. */
function scores(m, launch, n, now) {
  const today = startOfDay(now);
  const todayKey = dayKey(today);
  const monday = addDays(today, -((today.getDay() + 6) % 7));
  const first = new Date(today.getFullYear(), today.getMonth(), 1);
  // Ngày khởi động: tổng = đúng sao khởi động (bé thật cao nhất ≈ hạng LEADERS + 1); sao "hôm nay"
  // của ngày đó coi như đã nằm trong sao khởi động nên không vượt nó. Từ hôm sau mới cộng thêm.
  const start = parseDay(launch.start);
  const base = launchStars(m, launch, n);
  const s = { total: base, month: 0, week: 0, day: 0 };
  for (let d = start; d <= today; d = addDays(d, 1)) {
    const isStart = d - start === 0;
    let k = isStart ? Math.min(base, dayStars(m, d)) : dayStars(m, d);
    if (dayKey(d) === todayKey) { k = Math.floor(k * todayProgress(m.id, now)); s.day = k; }
    if (!isStart) s.total += k;
    if (d >= first) s.month += k;
    if (d >= monday) s.week += k;
  }
  return s;
}

// Chốt chặn trên máy: nếu có lúc phải dùng ảnh chụp tạm (mất mạng, luật chưa deploy) rồi ảnh
// chụp chung về sau cho số nhỏ hơn, bé vẫn không bao giờ thấy sao của một bạn ảo bị tụt.
const SEEN_KEY = 'tth_cast_seen_v2';
function ratchet(rows, now) {
  let seen = {};
  try { seen = JSON.parse(localStorage.getItem(SEEN_KEY)) || {}; } catch { /* ignore */ }
  const dk = dayKey(now), wk = weekKey(now), mk = monthKey(now);
  for (const r of rows) {
    const p = seen[r.uid];
    if (p) {
      r.totalStars = Math.max(r.totalStars, p.t || 0);
      if (p.dk === dk) r.dayStars = Math.max(r.dayStars, p.d || 0);
      if (p.wk === wk) r.weekStars = Math.max(r.weekStars, p.w || 0);
      if (p.mk === mk) r.monthStars = Math.max(r.monthStars, p.m || 0);
      r.totalStars = Math.max(r.totalStars, r.monthStars, r.weekStars);
      r.gradeStars = { [`g${r.grade}`]: r.totalStars };
    }
    seen[r.uid] = { t: r.totalStars, dk, d: r.dayStars, wk, w: r.weekStars, mk, m: r.monthStars };
  }
  try { localStorage.setItem(SEEN_KEY, JSON.stringify(seen)); } catch { /* storage unavailable */ }
  return rows;
}

/**
 * Các bạn ảo của một lớp, cùng dạng với hàng Firestore của leaderboard/{uid}.
 * @param {number} grade
 * @param {Launch} launch ảnh chụp khởi động của lớp
 * @param {Date} [now]
 */
export function castRows(grade, launch, now = new Date()) {
  const list = members(grade);
  return ratchet(list.map((m) => {
    const s = scores(m, launch, list.length, now);
    const [nickname, avatar] = m.cast;
    return {
      uid: m.id, nickname, avatar, grade,
      totalStars: s.total, gradeStars: { [`g${grade}`]: s.total },
      dayKey: dayKey(now), dayStars: s.day,
      weekKey: weekKey(now), weekStars: s.week,
      monthKey: monthKey(now), monthStars: s.month,
    };
  }), now);
}

/** Lần cuối bạn "mở app": giữa buổi học hôm nay, hoặc cuối buổi học gần nhất trước đó. */
function lastSeen(m, now, fallback) {
  const today = startOfDay(now);
  for (let i = 0; i < 60; i++) {
    const d = addDays(today, -i);
    if (!dayStars(m, d)) continue;
    const hour = i > 0 ? 24 : now.getHours() + now.getMinutes() / 60;
    const ends = studySessions(m.id, d).filter(s => s.start < hour).map(s => Math.min(hour, s.start + s.len));
    if (ends.length) return atHour(d, Math.max(...ends));
  }
  return fallback;
}

/**
 * Tất cả bạn ảo cho trang admin (đánh dấu fake: true), cùng số sao như trên bảng xếp hạng.
 * Ngày "đăng ký" lùi trước ngày khởi động theo số sao khởi động, lần cuối = buổi học gần nhất.
 * @param {(grade: number) => Launch} launchOf ảnh chụp khởi động của từng lớp
 */
export function castStudents(launchOf, now = new Date()) {
  const grades = [...new Set(CAST.map(c => c[2]))];
  return grades.flatMap((g) => {
    const launch = launchOf(g);
    const list = members(g);
    return list.map((m) => {
      const s = scores(m, launch, list.length, now);
      const days = Math.round(launchStars(m, launch, list.length) / 10 + 3 + 20 * rand(m.id, 'reg'));
      const createdAt = atHour(addDays(parseDay(launch.start), -days), 7 + 13 * rand(m.id, 'regh'));
      return {
        uid: m.id, email: '', name: '', nickname: m.cast[0], avatar: m.cast[1], grade: g,
        stars: s.total, createdAt, lastSeenAt: lastSeen(m, now, createdAt),
        registered: false, fake: true,
      };
    });
  });
}
