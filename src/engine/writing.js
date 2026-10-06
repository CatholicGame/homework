/**
 * ✍️ Luyện Viết Văn: lưu bài viết của bé (theo tài khoản, đồng bộ Drive qua cloudSync — khoá `writing-v1`)
 * và gọi cô giáo DeepSeek chấm bài (api/writing/review.js).
 *
 * Dữ liệu: { essays: { [id]: { id, prompt, text, createdAt, updatedAt,
 *   review?: { scores, total, summary, strengths, issues, vocab, tips, at, text: bài lúc chấm },
 *   history?: [{ at, total }] } } }
 */

import { scopedKey } from './auth.js';
import { getIdToken } from './leaderboard.js';

export const MAX_WORDS = 300;
export const MAX_PROMPT = 600;
const STORE = 'writing-v1';

export const countWords = (s) => (String(s || '').trim().match(/\S+/g) || []).length;

function load() {
  try {
    const v = JSON.parse(localStorage.getItem(scopedKey(STORE)));
    return v && typeof v === 'object' && v.essays ? v : { essays: {} };
  } catch {
    return { essays: {} };
  }
}

function save(data) {
  try { localStorage.setItem(scopedKey(STORE), JSON.stringify(data)); } catch { /* đầy bộ nhớ */ }
  window.dispatchEvent(new CustomEvent('tth:data-changed')); // → cloudSync.js
}

/** Bài mới nhất lên đầu. */
export function listEssays() {
  return Object.values(load().essays).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
}

export function getEssay(id) {
  return load().essays[id] || null;
}

export function createEssay(prompt = '') {
  const now = Date.now();
  const essay = { id: `w${now.toString(36)}${Math.random().toString(36).slice(2, 6)}`, prompt, text: '', createdAt: now, updatedAt: now };
  const data = load();
  data.essays[essay.id] = essay;
  save(data);
  return essay;
}

/** Ghi đè các trường của một bài (prompt, text, review, history). */
export function updateEssay(id, patch) {
  const data = load();
  const cur = data.essays[id];
  if (!cur) return null;
  data.essays[id] = { ...cur, ...patch, updatedAt: Date.now() };
  save(data);
  return data.essays[id];
}

export function deleteEssay(id) {
  const data = load();
  if (!data.essays[id]) return;
  delete data.essays[id];
  save(data);
}

/** Bài đã sửa sau lần chấm gần nhất. */
export const isStale = (essay) => !!essay.review && essay.review.text !== essay.text;

/**
 * Gửi bài cho cô chấm. Lỗi: Error với .code = 'auth' | 'limit' | 'too-long' | 'ai' | 'net' | …
 */
export async function requestReview({ prompt, text, grade }) {
  let token = null;
  try { token = await getIdToken(); } catch { /* không mở được phiên: máy chủ trả 401 */ }
  let res;
  try {
    res = await fetch('/api/writing/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify({ prompt, text, grade }),
    });
  } catch {
    throw Object.assign(new Error('net'), { code: 'net' });
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.review) throw Object.assign(new Error(body.error || 'ai'), { code: body.error || 'ai' });
  return body.review;
}

/**
 * Vị trí các lỗi trong bài: mỗi lỗi lấy lần xuất hiện đầu tiên chưa bị lỗi khác chiếm.
 * @returns {{ start, end, issue, n }[]} theo thứ tự trong bài, n = số thứ tự lỗi (1, 2, …)
 */
export function markRanges(text, issues) {
  const taken = [];
  const free = (s, e) => taken.every(r => e <= r.start || s >= r.end);
  for (const issue of issues || []) {
    let at = text.indexOf(issue.text);
    while (at >= 0 && !free(at, at + issue.text.length)) at = text.indexOf(issue.text, at + 1);
    if (at >= 0) taken.push({ start: at, end: at + issue.text.length, issue });
  }
  return taken.sort((a, b) => a.start - b.start).map((r, i) => ({ ...r, n: i + 1 }));
}
