/**
 * 📊 Bảng mạnh / yếu sau mỗi trận Đấu Trường Nhí: từ các câu em đã trả lời trong trận (câu của mình, câu trả lời ké khi đứng bục,
 * hoặc câu khán giả), gom theo chủ đề (`t` của câu, questions.js), môn và vòng thi.
 *   summarize(log) → { right, n, subj: { toan: [đúng, số câu], tv }, rounds: { kd, tt, vd }, strong: [...], weak: [...] }
 *   log: [{ t: chủ đề, m: 'toan' | 'tv', r: 'kd' | 'tt' | 'vd', ok }]
 *   statsHtml(sum) → HTML bảng (thẻ kết thúc trận, trang Thành tích); saveMatch / loadMatches: lịch sử trận theo tài khoản
 *   (khoá `dautruong-matches-v1`, cloudSync.js đồng bộ như giấy chứng nhận).
 */
import { scopedKey } from '../engine/auth.js';

const KEY = 'dautruong-matches-v1';
const MAX = 60;
const SUBJ = { toan: 'Toán', tv: 'Tiếng Việt' };
const ROUND = { kd: 'Khởi động', tt: 'Tăng tốc', vd: 'Về đích' };
/** Chủ đề đạt từ mức này là "mạnh", dưới là "cần ôn". */
const STRONG = 0.75;

const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function summarize(log = []) {
  const add = (o, k, ok) => { const v = (o[k] ||= [0, 0]); v[1]++; if (ok) v[0]++; };
  const subj = {}, rounds = {}, topics = {};
  for (const x of log) {
    add(subj, x.m === 'tv' ? 'tv' : 'toan', x.ok);
    if (x.r) add(rounds, x.r, x.ok);
    const k = `${x.m === 'tv' ? 'tv' : 'toan'}|${x.t || SUBJ[x.m] || 'Toán'}`;
    add(topics, k, x.ok);
  }
  const list = Object.entries(topics).map(([k, [r, n]]) => { const [m, t] = k.split('|'); return { t, m, r, n }; });
  const rate = (x) => x.r / x.n;
  const strong = list.filter(x => rate(x) >= STRONG).sort((a, b) => b.r - a.r || rate(b) - rate(a) || a.t.localeCompare(b.t, 'vi'));
  const weak = list.filter(x => rate(x) < STRONG).sort((a, b) => (b.n - b.r) - (a.n - a.r) || rate(a) - rate(b) || a.t.localeCompare(b.t, 'vi'));
  return { right: log.filter(x => x.ok).length, n: log.length, subj, rounds, strong, weak };
}

function row(x) {
  const pct = Math.round((x.r / x.n) * 100);
  return `<tr><td><span class="ms-t">${esc(x.t)}</span><small>${SUBJ[x.m]}</small></td><td class="ms-n">${x.r}/${x.n}</td>
    <td class="ms-bar"><i style="width:${pct}%"></i></td></tr>`;
}
function chip(label, v) {
  if (!v) return '';
  const pct = Math.round((v[0] / v[1]) * 100);
  return `<span class="ms-chip"><b>${label}</b> ${v[0]}/${v[1]}<i style="--p:${pct}%"></i></span>`;
}

/** Bảng của một trận (sum từ summarize). Không có câu nào thì chuỗi rỗng. */
export function statsHtml(sum) {
  if (!sum || !sum.n) return '';
  ensureCss();
  const part = (cls, title, list, empty) => `<div class="ms-part ${cls}"><b class="ms-h">${title}</b>${list.length
    ? `<table><tbody>${list.map(row).join('')}</tbody></table>` : `<p class="ms-empty">${empty}</p>`}</div>`;
  return `<div class="ms" aria-label="Thống kê trận">
    <div class="ms-chips">${chip('Toán', sum.subj.toan)}${chip('Tiếng Việt', sum.subj.tv)}</div>
    <div class="ms-chips is-round">${Object.keys(ROUND).map(k => chip(ROUND[k], sum.rounds[k])).join('')}</div>
    ${part('is-strong', '💪 Em làm tốt', sum.strong, 'Trận sau cố lên, em sẽ có phần làm tốt!')}
    ${part('is-weak', '📚 Cần ôn thêm', sum.weak, 'Không có phần nào cần ôn. Giỏi lắm!')}
  </div>`;
}

export function loadMatches() {
  let list = [];
  try { list = JSON.parse(localStorage.getItem(scopedKey(KEY))) || []; } catch { /* hỏng: coi như chưa có */ }
  return Array.isArray(list) ? list.filter(x => x && x.at && x.sum).sort((a, b) => b.at - a.at) : [];
}
/** Lưu một trận { at, grade, onPod, rank, score, sum } (trùng `at` thì bỏ qua). */
export function saveMatch(m) {
  if (!m?.sum?.n) return;
  const list = loadMatches();
  if (list.some(x => x.at === m.at)) return;
  list.unshift(m);
  try { localStorage.setItem(scopedKey(KEY), JSON.stringify(list.slice(0, MAX))); } catch { /* bộ nhớ đầy / bị chặn */ }
  window.dispatchEvent(new CustomEvent('tth:data-changed'));   // → cloudSync.js
}

function ensureCss() {
  if (document.getElementById('ms-css')) return;
  document.head.insertAdjacentHTML('beforeend', `<style id="ms-css">
  .ms { display: grid; gap: 8px; width: 100%; text-align: left; }
  .ms-chips { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
  .ms-chip { position: relative; overflow: hidden; display: inline-flex; gap: 4px; align-items: baseline; padding: 4px 10px; border-radius: 999px;
    border: 1px solid rgba(127, 127, 160, 0.35); font-size: 13px; font-variant-numeric: tabular-nums; }
  .ms-chip b { font-weight: 800; }
  .ms-chip i { position: absolute; left: 0; bottom: 0; height: 3px; width: var(--p); background: #2fbf71; }
  .ms-chips.is-round .ms-chip { font-size: 12px; }
  .ms-part { display: grid; gap: 4px; }
  .ms-h { font-size: 14px; font-weight: 800; }
  .ms table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .ms td { padding: 3px 4px; border-top: 1px solid rgba(127, 127, 160, 0.2); vertical-align: middle; }
  .ms-t { font-weight: 700; }
  .ms td small { margin-left: 6px; font-size: 11px; opacity: 0.7; white-space: nowrap; }
  .ms-n { width: 3.2em; text-align: right; font-weight: 800; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .ms-bar { width: 26%; }
  .ms-bar i { display: block; height: 8px; min-width: 3px; border-radius: 4px; background: #2fbf71; }
  .ms-part.is-weak .ms-bar i { background: #f08a24; }
  .ms-empty { margin: 0; font-size: 12.5px; opacity: 0.8; }
  </style>`);
}
