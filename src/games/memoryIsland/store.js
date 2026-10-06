/**
 * Dữ liệu của 🏝️ Đảo Trí Nhớ trên máy, theo tài khoản (scopedKey 'memory-v1', đồng bộ Drive qua tth:data-changed):
 * {
 *   facts: { 'g3:7x8': { seen, ok, bad, miss, last } },   // seen: số ván gặp; ok/bad: Ôn nhanh đúng/sai; miss: lật nhầm
 *   best:  { 'flip:g3-t7+g3-g:1': 16 },                  // ít lần lật nhất theo túi thẻ + cấp
 *   last:  { topics: ['g3-t7'], level: 1 },              // lựa chọn lần trước (mở lại màn Túi thẻ là sẵn)
 * }
 * Hạng Rương (§11) làm ở giai đoạn sau, dựa trên ok/bad/last ở đây.
 * Chơi cả lớp (§15.7) không được gọi các hàm ghi ở đây.
 */

import { scopedKey } from '../../engine/auth.js';

const KEY = 'memory-v1';

export function load() {
  try {
    const d = JSON.parse(localStorage.getItem(scopedKey(KEY)));
    if (d && typeof d === 'object') return { facts: {}, best: {}, last: null, ...d };
  } catch { /* hỏng thì làm lại */ }
  return { facts: {}, best: {}, last: null };
}

function save(d) {
  try { localStorage.setItem(scopedKey(KEY), JSON.stringify(d)); } catch { /* storage unavailable */ }
  window.dispatchEvent(new CustomEvent('tth:data-changed')); // → cloudSync.js
}

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/**
 * Ghi kết quả một ván Bãi Lật Thẻ.
 * seen: uid các thẻ có trên bàn; miss: { uid: số lần lật nhầm }; quiz: { uid: true/false } (Ôn nhanh).
 * Trả về { best, newBest } của túi thẻ + cấp này.
 */
export function recordFlipRound({ seen, miss, quiz, bestKey, flips }) {
  const d = load();
  const day = today();
  for (const uid of seen) {
    const f = d.facts[uid] || (d.facts[uid] = { seen: 0, ok: 0, bad: 0, miss: 0 });
    f.seen++;
    f.miss += miss[uid] || 0;
    if (uid in quiz) { if (quiz[uid]) f.ok++; else f.bad++; }
    f.last = day;
  }
  const prev = d.best[bestKey];
  const newBest = prev == null || flips < prev;
  if (newBest) d.best[bestKey] = flips;
  save(d);
  return { best: newBest ? flips : prev, prevBest: prev, newBest: newBest && prev != null };
}

export function saveLast(last) {
  const d = load();
  d.last = last;
  save(d);
}

/** Độ "hay quên" của một thẻ: > 0 là cần ôn (sai Ôn nhanh nhiều hơn đúng, hoặc hay lật nhầm). */
export function weakness(stat) {
  if (!stat) return 0;
  return (stat.bad || 0) * 2 - (stat.ok || 0) + Math.floor((stat.miss || 0) / 3);
}
