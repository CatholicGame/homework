/**
 * ✍️ Luyện Viết Văn: lưu bài viết của bé (theo tài khoản, đồng bộ Drive qua cloudSync — khoá `writing-v1`)
 * và gọi cô giáo DeepSeek chấm bài (api/writing/review.js).
 *
 * Dữ liệu: { essays: { [id]: { id, grade, prompt, text, createdAt, updatedAt,
 *   review?: { scores, total, summary, strengths, issues, vocab, tips, at, text: bài lúc chấm },
 *   history?: [{ at, total }],
 *   wordBank?: { prompt: đề lúc gợi ý, groups: [{ title, words[] }], at } } } }
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

/** Bài của lớp `grade`, mới nhất lên đầu. Bài cũ chưa ghi lớp thì gán lớp đang học (một lần). */
export function listEssays(grade) {
  const data = load();
  const old = Object.values(data.essays).filter(e => !e.grade);
  if (old.length) {
    old.forEach(e => { e.grade = grade; });
    save(data);
  }
  return Object.values(data.essays).filter(e => e.grade === grade).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
}

export function getEssay(id) {
  return load().essays[id] || null;
}

export function createEssay(grade, prompt = '') {
  const now = Date.now();
  const essay = { id: `w${now.toString(36)}${Math.random().toString(36).slice(2, 6)}`, grade, prompt, text: '', createdAt: now, updatedAt: now };
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
  return askTeacher({ prompt, text, grade }, 'review');
}

/** Bộ từ ngữ gợi ý cho đề: { groups: [{ title, words[] }] }. Lỗi như requestReview. */
export async function requestVocab({ prompt, grade }) {
  return askTeacher({ mode: 'vocab', prompt, grade }, 'vocab');
}

async function askTeacher(payload, field) {
  let token = null;
  try { token = await getIdToken(); } catch { /* không mở được phiên: máy chủ trả 401 */ }
  let res;
  try {
    res = await fetch('/api/writing/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(payload),
    });
  } catch {
    throw Object.assign(new Error('net'), { code: 'net' });
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body[field]) throw Object.assign(new Error(body.error || 'ai'), { code: body.error || 'ai' });
  return body[field];
}

/**
 * Vị trí các lỗi trong bài: mỗi lỗi lấy lần xuất hiện đầu tiên chưa bị lỗi khác chiếm.
 * @returns {{ start, end, issue, n }[]} theo thứ tự trong bài, n = số thứ tự lỗi (1, 2, …)
 */
export function markRanges(text, issues) {
  const taken = [];
  const free = (s, e) => taken.every(r => e <= r.start || s >= r.end);
  for (const issue of issues || []) {
    const hits = [];
    for (let at = text.indexOf(issue.text); at >= 0; at = text.indexOf(issue.text, at + 1)) {
      if (free(at, at + issue.text.length)) hits.push(at);
    }
    // Lỗi viết hoa ("con mèo" → "Con mèo"): đoạn trích hay lặp lại giữa câu, chọn chỗ đứng đầu câu.
    const fix = issue.suggestions?.[0] || '';
    const capital = /^\p{Ll}/u.test(issue.text) && /^\p{Lu}/u.test(fix);
    const atStart = (a) => /(^|[.!?]["”)]?\s+|\n\s*)$/.test(text.slice(0, a));
    const at = (capital ? hits.find(atStart) : undefined) ?? hits[0];
    if (at !== undefined) taken.push({ start: at, end: at + issue.text.length, issue });
  }
  return taken.sort((a, b) => a.start - b.start).map((r, i) => ({ ...r, n: i + 1 }));
}
