/**
 * Giữ tay lên một từ tiếng Anh → bong bóng nghĩa tiếng Việt (chỉ khi đang học Toán bằng tiếng Anh).
 *
 * Bong bóng ghi: mỗi từ một dòng (từ · IPA Anh–Mỹ src/i18n/en/ipa.js · nghĩa theo thuật ngữ sách
 * src/i18n/en/glossary.js), nghĩa cả cụm nếu có ("number line" → tia số), và câu gốc tiếng Việt của
 * dòng chữ ấy (engine/i18n.js giữ lại chữ gốc), để bé đọc được và đối chiếu đúng ngữ cảnh bài học.
 *
 * Cách mở: bấm một lần vào chữ thường (đề bài, nhãn, ô bảng); giữ 450 ms ở bất cứ đâu, kể cả chữ trên nút
 * (xê dịch quá 10 px là huỷ; lần nhả tay đó không tính là bấm); máy tính: bôi đen một từ / cụm từ.
 * Không dùng nhấp đúp (trùng tiện ích tra từ của trình duyệt). Chạm chỗ khác, cuộn trang hoặc sau 8 giây thì ẩn.
 * Bong bóng hiện là đọc to từ / cụm tiếng Anh (engine/speakEn.js); nút 🔊 cạnh mỗi từ để nghe lại.
 */

import { isEnglish, originalText, parseEnglishNumber, vnRead } from './i18n.js';
import { sayEn, stopEn, unlockSpeech } from './speakEn.js';

const HOLD_MS = 450;
const MOVE_PX = 10;
const SKIP = 'input, textarea, select, [data-no-i18n], .vk-panel, .wh-bubble, svg';

let glossary = null; // { phrases: Map, words: Map, ipa: Map, maxWords }
let loading = null;
function loadGlossary() {
  // Từ vựng thêm theo từng sách: src/i18n/en/glossary/<sách>.js = { words, phrases, ipa }.
  const extra = Object.values(import.meta.glob('../i18n/en/glossary/*.js', { import: 'default' }));
  return (loading ||= Promise.all([
    import('../i18n/en/glossary.js').then(m => m.default).catch(() => ({})),
    import('../i18n/en/ipa.js').then(m => m.default).catch(() => ({})),
    ...extra.map(load => load().catch(() => ({}))),
  ]).then(([base, baseIpa, ...more]) => {
    // Bảng chung thắng khi trùng khoá (nghĩa đã duyệt theo sách Toán 2).
    const g = {
      phrases: Object.assign({}, ...more.map(m => m.phrases), base.phrases),
      words: Object.assign({}, ...more.map(m => m.words), base.words),
    };
    const ipa = Object.assign({}, ...more.map(m => m.ipa), baseIpa);
    const phrases = new Map(Object.entries(g.phrases || {}).map(([k, v]) => [k.toLowerCase().replace(/[’']/g, "'"), v]));
    const maxWords = Math.max(1, ...[...phrases.keys()].map(k => k.split(' ').length));
    glossary = {
      phrases, maxWords,
      words: new Map(Object.entries(g.words || {}).map(([k, v]) => [k.toLowerCase(), v])),
      ipa: new Map(Object.entries(ipa).map(([k, v]) => [k.toLowerCase().replace(/’/g, "'"), v])),
    };
  }));
}

// Phiên âm IPA của đúng dạng từ trên màn hình ("boxes", "weighs"); số ghép "twenty-five" ghép từng phần.
function ipaOf(w) {
  const k = w.toLowerCase().replace(/’/g, "'");
  if (glossary.ipa.has(k)) return glossary.ipa.get(k);
  for (const l of lemmas(k).slice(1)) if (glossary.ipa.has(l)) return null; // có từ gốc nhưng không có dạng này: thà không ghi
  const parts = k.split('-');
  if (parts.length > 1 && parts.every(p => glossary.ipa.has(p))) return parts.map(p => glossary.ipa.get(p)).join(' ');
  return null;
}

// Các dòng trong bong bóng: mỗi từ một dòng (bỏ chữ cái lẻ như "A", "b"), tối đa 8 dòng.
function rowsOf(text) {
  const rows = [];
  for (const [w] of text.matchAll(WORD_RE)) {
    if (w.length === 1 && !/^[aI]$/.test(w)) continue;
    const lw = w.toLowerCase().replace(/’/g, "'");
    if (rows.some(r => r.key === lw)) continue;
    const vi = wordMeaning(lw), ipa = ipaOf(w);
    if (!vi && !ipa) continue;
    rows.push({ key: lw, w, ipa, vi, weak: !vi || vi.startsWith('(') });
    if (rows.length === 8) break;
  }
  return rows;
}

// ── Tra nghĩa ─────────────────────────────────────────────────────────────────
const IRREGULAR_S = new Set(['is', 'has', 'was', 'does', 'this', 'its', 'us', 'as', 'bus', 'yes', 'plus', 'minus', 'class', 'glass', 'grass', 'less', 'across', 'always', 'tens']);
function lemmas(w) {
  const out = [w];
  if (/'s$/.test(w)) return [w, ...lemmas(w.slice(0, -2))]; // "robot's" → "robot"
  if (w.length > 3 && !IRREGULAR_S.has(w)) {
    if (w.endsWith('ies')) out.push(`${w.slice(0, -3)}y`);
    if (w.endsWith('es')) out.push(w.slice(0, -2));
    if (w.endsWith('s')) out.push(w.slice(0, -1));
  }
  if (w.endsWith('ing') && w.length > 5) out.push(w.slice(0, -3), `${w.slice(0, -3)}e`, w.slice(0, -4));
  if (w.endsWith('ed') && w.length > 4) out.push(w.slice(0, -2), w.slice(0, -1), w.slice(0, -3));
  if (w.endsWith('er') && w.length > 4) out.push(w.slice(0, -2), w.slice(0, -3));
  if (w.endsWith('est') && w.length > 5) out.push(w.slice(0, -3), w.slice(0, -4));
  return out;
}
function wordMeaning(w) {
  const n = parseEnglishNumber(w);
  if (n != null && n < 1000) return vnRead(n);
  for (const l of lemmas(w)) if (glossary.words.has(l)) return glossary.words.get(l);
  return null;
}

// Từ ở vị trí offset trong chuỗi, kèm các từ lân cận (để khớp cụm từ chứa nó).
const WORD_RE = /[A-Za-z]+(?:[’'-][A-Za-z]+)*/g;
function lookup(text, offset) {
  const toks = [...text.matchAll(WORD_RE)].map(m => ({ w: m[0], s: m.index, e: m.index + m[0].length }));
  const i = toks.findIndex(t => offset >= t.s && offset <= t.e);
  if (i < 0) return null;
  const low = (a, b) => toks.slice(a, b + 1).map(t => t.w.toLowerCase().replace(/’/g, "'")).join(' ');
  // Cụm dài nhất chứa từ này (vd. "number line", "the number just after").
  for (let len = Math.min(glossary.maxWords, toks.length); len >= 2; len--) {
    for (let a = Math.max(0, i - len + 1); a <= i && a + len - 1 < toks.length; a++) {
      const key = low(a, a + len - 1);
      // Từ cuối số nhiều: "number lines" → "number line".
      const sing = key.replace(/(ies|es|s)$/, (m) => (m === 'ies' ? 'y' : ''));
      const hit = [key, key.replace(/^the /, ''), sing, key.replace(/s$/, '')].map(k => glossary.phrases.get(k)).find(Boolean);
      if (hit) return { s: toks[a].s, e: toks[a + len - 1].e, en: text.slice(toks[a].s, toks[a + len - 1].e), vi: hit };
    }
  }
  const t = toks[i];
  return { s: t.s, e: t.e, en: t.w, vi: null };
}

// Vị trí chữ dưới ngón tay. caretPositionFromPoint / caretRangeFromPoint có thể trả null hoặc sai
// chỗ (một số bản Chrome, chữ user-select: none) → tự dò các từ trong phần tử dưới ngón tay.
function caretAt(x, y) {
  let c = null;
  if (document.caretPositionFromPoint) {
    const p = document.caretPositionFromPoint(x, y);
    if (p) c = { node: p.offsetNode, offset: p.offset };
  } else {
    const r = document.caretRangeFromPoint?.(x, y);
    if (r) c = { node: r.startContainer, offset: r.startOffset };
  }
  if (c?.node?.nodeType === Node.TEXT_NODE && wordRectAt(c.node, c.offset, x, y)) return c;
  return scanAt(x, y);
}
function wordRectAt(node, offset, x, y) {
  const m = [...node.data.matchAll(WORD_RE)].find(t => offset >= t.index && offset <= t.index + t[0].length);
  if (!m) return false;
  const r = document.createRange();
  r.setStart(node, m.index);
  r.setEnd(node, m.index + m[0].length);
  return [...r.getClientRects()].some(b => x >= b.left - 6 && x <= b.right + 6 && y >= b.top - 8 && y <= b.bottom + 8);
}
function scanAt(x, y) {
  const el = document.elementFromPoint(x, y);
  if (!el) return null;
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const r = document.createRange();
  let n;
  while ((n = w.nextNode())) {
    for (const m of n.data.matchAll(WORD_RE)) {
      r.setStart(n, m.index);
      r.setEnd(n, m.index + m[0].length);
      if ([...r.getClientRects()].some(b => x >= b.left && x <= b.right && y >= b.top && y <= b.bottom)) {
        return { node: n, offset: m.index + 1 };
      }
    }
  }
  return null;
}

// ── Bong bóng ─────────────────────────────────────────────────────────────────
let bubble = null, mark = null, hideTimer = null;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function hide() {
  clearTimeout(hideTimer);
  bubble?.remove(); mark?.remove();
  bubble = mark = null;
  hideCoach();
}

// Đặt bong bóng trên rect (không đủ chỗ thì xuống dưới), không tràn khỏi màn hình; mũi nhọn chỉ vào giữa rect.
function place(el, rect) {
  const bw = el.offsetWidth, bh = el.offsetHeight, pad = 8;
  const left = Math.min(Math.max(pad, rect.left + rect.width / 2 - bw / 2), innerWidth - bw - pad);
  const above = rect.top - bh - 12;
  el.style.left = `${left}px`;
  el.style.top = `${above >= pad ? above : rect.bottom + 12}px`;
  el.classList.toggle('wh-below', above < pad);
  el.style.setProperty('--wh-tip', `${Math.min(Math.max(16, rect.left + rect.width / 2 - left), bw - 16)}px`);
}

// hit = { en, vi? }: vi là nghĩa của cả cụm (nếu bảng từ vựng có); từng từ trong en thành một dòng.
function bubbleHtml(hit, src) {
  const rows = rowsOf(hit.en);
  const ipa = (x) => (x ? `<span class="wh-ipa">/${esc(x)}/</span>` : '');
  const say = (w) => `<button type="button" class="wh-say" data-say="${esc(w).replace(/"/g, '&quot;')}" aria-label="Nghe đọc ${esc(w)}">🔊</button>`;
  let body;
  if (!hit.vi && rows.length === 1) {
    const r = rows[0];
    body = `<div class="wh-one">${say(r.w)}<b class="wh-w" lang="en">${esc(r.w)}</b>${ipa(r.ipa)}</div>
      ${r.vi ? `<div class="wh-mean${r.weak ? ' wh-weak' : ''}">${esc(r.vi)}</div>` : ''}`;
  } else {
    body = `${hit.vi ? `<div class="wh-head">${say(hit.en)}<b class="wh-w" lang="en">${esc(hit.en)}</b><div class="wh-mean">${esc(hit.vi)}</div></div>` : ''}
      <div class="wh-rows">${rows.map(r => `
        <div class="wh-row${r.weak ? ' wh-weak' : ''}">${say(r.w)}<b lang="en">${esc(r.w)}</b>${ipa(r.ipa) || '<span></span>'}<span class="wh-vi">${esc(r.vi || '')}</span></div>`).join('')}
      </div>`;
  }
  const s = src && src.trim();
  return body + (s && s !== hit.en ? `<div class="wh-src"><span aria-hidden="true">📖</span> ${esc(s)}</div>` : '');
}

function show(node, hit, rect) {
  hide();
  const src = originalText(node);
  mark = document.createElement('div');
  mark.className = 'wh-mark';
  Object.assign(mark.style, { left: `${rect.left - 3}px`, top: `${rect.top - 2}px`, width: `${rect.width + 6}px`, height: `${rect.height + 4}px` });
  bubble = document.createElement('div');
  bubble.className = 'wh-bubble';
  bubble.setAttribute('data-no-i18n', '');
  bubble.setAttribute('role', 'tooltip');
  bubble.setAttribute('lang', 'vi');
  bubble.innerHTML = bubbleHtml(hit, src);
  document.body.append(mark, bubble);
  place(bubble, rect);
  hideTimer = setTimeout(hide, 8000);
  sayEn(hit.en);
  coachLearned(); // bé đã tự mở nghĩa một lần → thôi hướng dẫn
}

// ── Hướng dẫn lần đầu ─────────────────────────────────────────────────────────
// Bé chưa biết chạm vào chữ để xem nghĩa: khi đang học tiếng Anh, chọn một từ đang thấy trên màn hình,
// tô sáng + bàn tay 👆 gõ nhẹ + bong bóng "Chạm vào một từ…". Mỗi lần mở ứng dụng tối đa một lần, tối đa
// COACH_MAX lần; bé tự mở nghĩa một lần là thôi hẳn. Chạm đâu cũng ẩn (chạm đúng từ thì hiện nghĩa luôn).
const COACH_KEY = 'tth:wordHintCoach';
const COACH_MAX = 3;
let coachEls = null, coachTimer = null, coachShownThisVisit = false, coachObserver = null;

function coachState() {
  try { return JSON.parse(localStorage.getItem(COACH_KEY)) || { n: 0, done: false }; } catch { return { n: 0, done: false }; }
}
function saveCoach(s) { try { localStorage.setItem(COACH_KEY, JSON.stringify(s)); } catch { /* chế độ riêng tư */ } }
function coachLearned() {
  const s = coachState();
  if (s.done) return;
  saveCoach({ ...s, done: true });
  coachObserver?.disconnect();
}
const coachWanted = () => isEnglish() && !coachShownThisVisit && !bubble && !document.hidden
  && (s => !s.done && s.n < COACH_MAX)(coachState());

function hideCoach() {
  clearTimeout(coachTimer);
  coachEls?.forEach(el => el.remove());
  coachEls = null;
}

// Từ đầu tiên (đọc từ trên xuống) đang nằm trọn trong màn hình, là chữ thường (không phải nút) và có nghĩa.
function coachTarget() {
  const app = document.getElementById('app');
  if (!app) return null;
  const walker = document.createTreeWalker(app, NodeFilter.SHOW_TEXT);
  const r = document.createRange();
  let n, seen = 0;
  while ((n = walker.nextNode()) && seen++ < 600) {
    const el = n.parentElement;
    if (!el || el.closest(SKIP) || !/[A-Za-z]{3}/.test(n.data)) continue;
    for (const m of n.data.matchAll(WORD_RE)) {
      if (m[0].length < 3 || !wordMeaning(m[0].toLowerCase())) continue;
      r.setStart(n, m.index);
      r.setEnd(n, m.index + m[0].length);
      const b = r.getClientRects()[0];
      if (!b || b.width < 8 || b.top < 70 || b.bottom > innerHeight - 60 || b.left < 0 || b.right > innerWidth) continue;
      if (isClickable(el)) break; // chữ trên nút: bấm là bấm nút, không dạy ở đây
      return b;
    }
  }
  return null;
}

function showCoach() {
  if (!coachWanted()) return;
  loadGlossary().then(() => {
    if (!coachWanted()) return;
    const rect = coachTarget();
    if (!rect) return;
    coachShownThisVisit = true;
    const s = coachState();
    saveCoach({ ...s, n: s.n + 1 });
    const ring = document.createElement('div');
    ring.className = 'wh-mark wh-coach-ring';
    Object.assign(ring.style, { left: `${rect.left - 4}px`, top: `${rect.top - 3}px`, width: `${rect.width + 8}px`, height: `${rect.height + 6}px` });
    const hand = document.createElement('div');
    hand.className = 'wh-coach-hand';
    hand.textContent = '👆';
    hand.setAttribute('aria-hidden', 'true');
    Object.assign(hand.style, { left: `${rect.left + rect.width / 2 - 14}px`, top: `${rect.bottom - 2}px` });
    const tip = document.createElement('div');
    tip.className = 'wh-bubble wh-coach-tip';
    tip.setAttribute('data-no-i18n', '');
    tip.setAttribute('role', 'status');
    tip.setAttribute('lang', 'vi');
    const verb = matchMedia('(hover: hover) and (pointer: fine)').matches ? 'Bấm' : 'Chạm';
    tip.innerHTML = `<div class="wh-coach-title">${verb} vào một từ tiếng Anh</div><div class="wh-coach-sub">để xem nghĩa tiếng Việt và nghe đọc từ đó.</div>`;
    document.body.append(ring, hand, tip);
    place(tip, rect);
    // Bàn tay ở phía đối diện bong bóng để không che chữ hướng dẫn.
    if (tip.classList.contains('wh-below')) { hand.textContent = '👇'; hand.style.top = `${rect.top - 34}px`; }
    coachEls = [ring, hand, tip];
    coachTimer = setTimeout(hideCoach, 7000);
  });
}

// Màn hình mới (đổi câu, mở bài) → thử hướng dẫn sau khi giao diện đứng yên.
let coachDebounce = null;
function watchForCoach() {
  if (coachObserver || coachState().done) return;
  const app = document.getElementById('app');
  if (!app) return;
  // Không đặt lại hẹn giờ ở mỗi thay đổi: màn có đồng hồ / hoạt hình đổi DOM liên tục vẫn được hướng dẫn.
  const kick = () => {
    if (coachDebounce || !coachWanted()) return;
    coachDebounce = setTimeout(() => { coachDebounce = null; showCoach(); }, 1200);
  };
  coachObserver = new MutationObserver(kick);
  coachObserver.observe(app, { childList: true, subtree: true });
  kick();
}

function hintAt(x, y) {
  const c = caretAt(x, y);
  if (!c || c.node?.nodeType !== Node.TEXT_NODE) return false;
  const el = c.node.parentElement;
  if (!el?.closest('#app') || el.closest(SKIP)) return false;
  const hit = lookup(c.node.data, c.offset);
  if (!hit || (!hit.vi && !rowsOf(hit.en).length && !originalText(c.node))) return false;
  const range = document.createRange();
  range.setStart(c.node, hit.s);
  range.setEnd(c.node, hit.e);
  // Từ có thể xuống dòng: lấy mảnh chứa ngón tay; ngón tay phải nằm trên chữ thật.
  const rects = [...range.getClientRects()];
  const rect = rects.find(r => x >= r.left - 6 && x <= r.right + 6 && y >= r.top - 8 && y <= r.bottom + 8);
  if (!rect) return false;
  show(c.node, hit, rect);
  return true;
}

// ── Bôi đen / nhấp đúp (máy tính) ───────────────────────────────────────────────
// Một từ / cụm từ bôi đen → nghĩa của cả cụm nếu có, không thì nghĩa từng từ.
function selectionMeaning(text) {
  const key = text.toLowerCase().replace(/’/g, "'").replace(/[^a-z' -]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!key) return null;
  return glossary.phrases.get(key) ?? glossary.phrases.get(key.replace(/^the /, '')) ?? null;
}
function hintSelection() {
  const sel = getSelection();
  if (!sel || sel.isCollapsed || !sel.rangeCount) return;
  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  const text = sel.toString().trim();
  if (node.nodeType !== Node.TEXT_NODE || !text || text.length > 60 || !/[A-Za-z]/.test(text)) return;
  const el = node.parentElement;
  if (!el?.closest('#app') || el.closest(SKIP)) return;
  const vi = selectionMeaning(text);
  if (!vi && !rowsOf(text).length && !originalText(node)) return;
  const rect = range.getBoundingClientRect();
  show(node, { en: text, vi }, rect);
}

// ── Giữ tay ───────────────────────────────────────────────────────────────────
let timer = null, start = null, shownByHold = false;

function cancel() { clearTimeout(timer); timer = null; start = null; }

function onDown(e) {
  unlockSpeech();
  // Nút 🔊 trong bong bóng: giữ bong bóng, đọc lại khi nhả tay (onClick).
  if (e.target.closest?.('.wh-say')) {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hide, 8000);
    return;
  }
  hide(); // bong bóng không nhận chạm (pointer-events: none): chạm đâu cũng ẩn
  if (!isEnglish() || e.button > 0 || e.target.closest?.(SKIP)) return;
  shownByHold = false;
  start = { x: e.clientX, y: e.clientY };
  loadGlossary();
  clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    if (!start || !glossary) return;
    shownByHold = hintAt(start.x, start.y);
  }, HOLD_MS);
}
function onMove(e) {
  if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > MOVE_PX) cancel();
}
function onUp(e) {
  cancel();
  // Chuột: bôi đen xong (hoặc nhấp đúp) → hiện nghĩa phần đã chọn.
  if (e.pointerType === 'mouse' && isEnglish() && !shownByHold) {
    loadGlossary().then(() => setTimeout(hintSelection, 0));
  }
}
// Nhả tay sau khi bong bóng hiện: không bấm vào nút / ô dưới ngón tay.
// Chữ thuộc nút / ô bấm được (con trỏ hình bàn tay): bấm một lần vẫn là bấm, giữ tay mới xem nghĩa.
const CLICKABLE = 'button, a, label, select, summary, [role="button"], [tabindex]:not([tabindex="-1"])';
function isClickable(el) {
  for (let n = el; n && n !== document.body; n = n.parentElement) {
    if (n.matches(CLICKABLE) || getComputedStyle(n).cursor === 'pointer') return true;
  }
  return false;
}

function onClick(e) {
  const sayBtn = e.target.closest?.('.wh-say');
  if (sayBtn) {
    e.preventDefault();
    e.stopPropagation();
    shownByHold = false;
    sayEn(sayBtn.dataset.say);
    return;
  }
  // Nhả tay sau khi bong bóng hiện: không bấm vào nút / ô dưới ngón tay.
  if (shownByHold) {
    shownByHold = false;
    e.preventDefault();
    e.stopPropagation();
    return;
  }
  // Bấm một lần vào chữ thường (đề bài, nhãn, ô bảng) → nghĩa. Không dùng nhấp đúp: trùng tiện ích tra từ của trình duyệt.
  if (!isEnglish() || !getSelection()?.isCollapsed) return;
  const t = e.target;
  if (!(t instanceof Element) || !t.closest('#app') || t.closest(SKIP) || isClickable(t)) return;
  const { clientX: x, clientY: y } = e;
  loadGlossary().then(() => hintAt(x, y));
}

let inited = false;
export function initWordHint() {
  if (inited) return;
  inited = true;
  document.addEventListener('pointerdown', onDown, true);
  document.addEventListener('pointermove', onMove, true);
  document.addEventListener('pointerup', onUp, true);
  document.addEventListener('pointercancel', cancel, true);
  document.addEventListener('click', onClick, true);
  // Giữ tay trên iPad/điện thoại không mở menu chọn chữ / "Sao chép" khi đang học tiếng Anh.
  document.addEventListener('contextmenu', (e) => { if (isEnglish() && (timer || bubble)) e.preventDefault(); }, true);
  addEventListener('scroll', hide, true);
  addEventListener('resize', hide);
  window.addEventListener('tth:lang-changed', () => { hide(); stopEn(); });
  watchForCoach();
}
