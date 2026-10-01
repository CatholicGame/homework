/**
 * Đa ngôn ngữ (Tiếng Việt / English) — tiếng Anh CHỈ dành cho Toán.
 *
 * Cách làm: code và dữ liệu sách vẫn viết tiếng Việt như cũ. Khi chọn English, một MutationObserver
 * dịch chữ trên màn hình lúc hiển thị (từng text node + title/placeholder/aria-label/alt) theo từ điển
 * Việt → Anh (src/i18n/en/*.js). Chưa có bản dịch thì giữ nguyên tiếng Việt.
 *
 * Từ điển: khoá là câu tiếng Việt đã gọn khoảng trắng. Số trong câu được thay bằng {0}, {1}…
 * nên một mục "Còn {0} ⭐ nữa…" dùng được cho mọi số. Mẫu riêng (regex) cho câu có tên, chữ…
 *
 * Phạm vi: chỉ trang nằm trong EN_PAGES mới dịch (trang chung + sách Toán đã dịch xong);
 * VI_ONLY (Làm quen chữ cái, Giáo lý) luôn 100% tiếng Việt. Vùng có [data-no-i18n] không bị dịch.
 *
 * Đáp án: bé được viết đáp án bằng tiếng Anh ("twenty-five", "8 tens and 2 ones", T/F) —
 * toVietnameseAnswer() đổi về dạng tiếng Việt của sách trước khi chấm.
 */

import UI_EN from '../i18n/en/ui.js'; // giao diện chung: nạp sẵn để trang chủ không nháy tiếng Việt
// Chữ giao diện chung thêm theo từng đợt dịch: src/i18n/en/ui/*.js = { entries, patterns }.
const UI_EXTRA = Object.values(import.meta.glob('../i18n/en/ui/*.js', { eager: true, import: 'default' }));

const LANG_KEY = 'tth-lang';
const VI_ONLY = new Set(['pre3-abc', 'giao-ly']);

// Trang chung (luôn dịch khi chọn English) + sách Toán đã có từ điển nội dung.
// Sách chưa dịch xong vẫn hiện tiếng Việt (thẻ ở trang chủ có nhãn 🇻🇳).
const BOOK_DICTS = {
  'grade2-workbook': () => import('../i18n/en/grade2Workbook.js'),
  'grade2-workbook-2': () => import('../i18n/en/grade2Workbook2.js'),
  'grade3-workbook': () => import('../i18n/en/grade3Workbook.js'),
  'grade3-workbook-2': () => import('../i18n/en/grade3Workbook2.js'),
  'grade3-practice': () => import('../i18n/en/grade3Practice.js'),
  'grade3-exam': () => import('../i18n/en/grade3Exam.js'),
  'pre1-math': () => import('../i18n/en/preschoolMath.js'),
  'pre2-math': () => import('../i18n/en/preschoolMath.js'),
  'pre4-math': () => import('../i18n/en/preschoolMath.js'),
};
const BASE_DICT = 'grade2-workbook';
const CHROME_PAGES = new Set(['home', 'login', 'profile', 'leaderboard', 'stickers', 'reviews']);

export const LANGS = [
  { id: 'vi', flag: '🇻🇳', label: 'Tiếng Việt', short: 'VI' },
  { id: 'en', flag: '🇬🇧', label: 'English', short: 'EN' },
];

let lang = readLang();
let page = 'home';
let active = false;
const exact = new Map();     // khoá đã gọn → bản dịch
const templ = new Map();     // khoá có {0}… → bản dịch có {0}…
const patterns = [];         // [regex, (match, tr) => string | null]
const dicts = new Map();     // tên từ điển đã tải → nội dung
let inUse = null;            // các từ điển đang dùng (chuỗi khoá)
const reverse = new Map();   // bản dịch ngắn (thường) → câu Việt
const answerMap = new Map(); // từ đáp án tiếng Anh (thường) → tiếng Việt
const svgWords = new Map();  // chữ chỉ dùng trong hình SVG (thứ trên tờ lịch "Hai", "Ba"…)
const svgStacks = new Map(); // cụm chữ SVG viết thành nhiều <text> liền nhau ("THÁNG" / "MƯỜI" / "HAI")
const origText = new WeakMap();  // text node → chữ gốc tiếng Việt
const lastOut = new WeakMap();   // text node → chữ đã dịch (bỏ qua mutation do chính mình)
const origAttr = new WeakMap();  // element → { attr: gốc }
const ATTRS = ['title', 'placeholder', 'aria-label', 'alt'];
const VN_CHAR = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const missing = import.meta.env.DEV ? new Set() : null;
if (missing) window.__i18nMissing = missing;

function readLang() {
  try { return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'vi'; } catch { return 'vi'; }
}

export function getLang() { return lang; }
/** Trang đang mở có đang hiện tiếng Anh không (dùng cho đáp án, giọng đọc, bàn phím chữ). */
export function isEnglish() { return active; }
/** Sách này đã có bản tiếng Anh chưa (nhãn 🇻🇳 trên thẻ ở trang chủ). */
export function hasEnglish(gameId) { return !!BOOK_DICTS[gameId]; }

export function setLang(next) {
  lang = next === 'en' ? 'en' : 'vi';
  try { localStorage.setItem(LANG_KEY, lang); } catch { /* storage unavailable */ }
  window.dispatchEvent(new CustomEvent('tth:lang-changed', { detail: { lang } }));
}

/**
 * Gọi mỗi khi router đổi trang (main.js navigate). Trả về Promise xong khi từ điển của trang đã tải.
 */
export function setI18nPage(pageId) {
  page = pageId || 'home';
  active = lang === 'en' && !VI_ONLY.has(page) && (CHROME_PAGES.has(page) || !!BOOK_DICTS[page]);
  document.documentElement.lang = active ? 'en' : 'vi';
  if (!active) return Promise.resolve();
  if (!BOOK_DICTS[page]) { useDicts([]); return Promise.resolve(); }
  // Từ điển Vở BT Toán 2 Tập 1 làm nền chung (thuật ngữ đã duyệt: Chục, Đơn vị, Số liền sau…);
  // từ điển của sách nạp sau nên thắng khi trùng khoá. Mỗi sách chỉ dùng nền + từ điển của chính nó,
  // để khoá ngắn của sách này ("có", "hình") không lọt sang sách khác.
  const names = [...new Set([BASE_DICT, page])];
  const want = page;
  return Promise.all(names.map(n => load(n, BOOK_DICTS[n]))).then(() => {
    if (!active || page !== want) return;
    useDicts(names);
    translateTree(document.body);
  });
}

function load(name, loader) {
  if (dicts.has(name)) return Promise.resolve();
  return loader().then((m) => { dicts.set(name, m.default || {}); })
    .catch((e) => console.warn('[i18n] Không tải được từ điển', name, e));
}

// Dựng lại bảng tra từ giao diện chung + các từ điển sách đã chọn (theo thứ tự, sau thắng trước).
function useDicts(names) {
  const key = names.join('|');
  if (inUse === key) return;
  inUse = key;
  [exact, templ, reverse, answerMap, svgWords, svgStacks].forEach(m => m.clear());
  patterns.length = 0;
  addDict(UI_EN);
  UI_EXTRA.forEach(addDict);
  names.forEach(n => dicts.has(n) && addDict(dicts.get(n)));
}

/**
 * { entries: { 'câu Việt': 'English' }, patterns: [[/^…$/, (m, tr) => '…']], answers: { 'english': 'tiếng Việt' } }
 * answers: chữ bé gõ / chọn bằng tiếng Anh → chữ trong đáp án của sách ("heavier than" → "nặng hơn").
 */
export function addDict({ entries = {}, patterns: pats = [], answers = {}, svg = {}, svgLines = {} }) {
  for (const [vi, en] of Object.entries(svg)) svgWords.set(norm(vi), en);
  for (const [vi, en] of Object.entries(svgLines)) svgStacks.set(norm(vi), en);
  for (const [vi, en] of Object.entries(entries)) {
    const k = norm(vi);
    if (/\{\d+\}/.test(k)) templ.set(k, en); else exact.set(k, en);
    // Thẻ chữ / lựa chọn ngắn: bé chọn bản tiếng Anh → đổi lại tiếng Việt khi chấm.
    if (en && en.length <= 24 && !/\{\d+\}/.test(k)) {
      const r = norm(en).toLowerCase();
      if (!reverse.has(r)) reverse.set(r, k);
    }
  }
  for (const [en, vi] of Object.entries(answers)) answerMap.set(norm(en).toLowerCase(), vi);
  patterns.push(...pats);
}

const norm = (s) => String(s).replace(/\s+/g, ' ').trim();
const NUM_RE = /\d+(?:[.,]\d+)*/g;

/** Dịch một câu (đã gọn khoảng trắng). null = chưa có bản dịch. */
export function tr(s) {
  const k = norm(s);
  if (!k) return k;
  if (exact.has(k)) return exact.get(k);
  // Số trong câu → {0}, {1}…
  const nums = [];
  const t = k.replace(NUM_RE, (n) => `{${nums.push(n) - 1}}`);
  if (nums.length && templ.has(t)) return templ.get(t).replace(/\{(\d+)\}/g, (_, i) => nums[+i] ?? '');
  for (const [re, fn] of patterns) {
    const m = k.match(re);
    if (m) {
      const out = fn(m, tr);
      if (out != null) return out;
    }
  }
  return generic(k);
}

// Mẫu chung cho đề toán: "1. …", "a) …", "– …", "…:", "… (theo mẫu)." và cách đọc số.
function generic(k) {
  const num = vnReadingToNumber(k);
  if (num != null) return englishNumber(num);
  // "Ba mươi lăm" (đầu câu viết hoa, từ hai chữ trở lên) → "Thirty-five"
  if (/^[A-ZÀ-Ỹ]/.test(k) && k.includes(' ')) {
    const cap = vnReadingToNumber(k[0].toLowerCase() + k.slice(1));
    if (cap != null) { const en = englishNumber(cap); return en[0].toUpperCase() + en.slice(1); }
  }
  // "Bài 1 · Tiết 2", "12 câu · ⭐ 0/30", "Còn lại: ... con gà?": dịch từng phần.
  for (const sep of [' · ', '...']) {
    if (!k.includes(sep)) continue;
    const parts = k.split(sep).map(p => (/[A-Za-zÀ-ỹ]/.test(p) ? tr(p) : p.trim()));
    if (parts.every(p => p != null)) return parts.join(sep === '...' ? ' ... ' : sep).replace(/\s+/g, ' ').trim();
    return null;
  }
  let m = k.match(/^((?:\d+[a-z]?\.|[a-zđ]\)|[–-])\s*(?:[a-zđ]\)\s*)?)(.+)$/i);
  if (m) {
    const rest = tr(m[2]);
    return rest == null ? null : `${m[1].replace(/\s*$/, ' ')}${rest}`;
  }
  m = k.match(/^(.+?)\s*([:?!.]|\.\.\.|…)$/);
  if (m && exact.has(m[1])) return `${exact.get(m[1])}${m[2]}`;
  return null;
}

/** Chữ gốc tiếng Việt của một text node đã dịch (engine/wordHint.js); null nếu chưa dịch. */
export function originalText(node) {
  return origText.has(node) && lastOut.get(node) === node.data ? origText.get(node) : null;
}

// ── DOM ───────────────────────────────────────────────────────────────────────
function skip(el) {
  return !el || !!el.closest('[data-no-i18n], textarea, script, style, [contenteditable="true"]');
}

// Ô chỉ gồm chữ và <br> ("Hàng<br>chục<br>nghìn"): dịch cả cụm một lần nếu từ điển có,
// đặt bản dịch vào dòng đầu, các dòng sau để trống và ẩn <br>.
function translateBrGroup(node) {
  const el = node.parentElement;
  if (!el || skip(el)) return false;
  if (el.dataset.i18nBr === '1') return true;
  const kids = [...el.childNodes];
  if (kids.length < 3 || !kids.some(k => k.nodeName === 'BR')
    || !kids.every(k => k.nodeName === 'BR' || k.nodeType === Node.TEXT_NODE)) return false;
  const texts = kids.filter(k => k.nodeType === Node.TEXT_NODE && k.data.trim());
  if (texts.length < 2) return false;
  const en = exact.get(norm(texts.map(t => t.data).join(' ')));
  if (en == null) return false;
  el.dataset.i18nBr = '1';
  texts.forEach((t, i) => {
    origText.set(t, t.data);
    const out = i === 0 ? en : '';
    lastOut.set(t, out);
    t.data = out;
  });
  kids.forEach(k => { if (k.nodeName === 'BR') k.style.display = 'none'; });
  return true;
}

function translateText(node) {
  if (lastOut.get(node) === node.data) return;
  if (translateBrGroup(node)) return;
  const src = node.data;
  if (!/[A-Za-zÀ-ỹ]/.test(src) || skip(node.parentElement)) return;
  const en = tr(src);
  if (en == null) {
    if (missing && VN_CHAR.test(src)) missing.add(norm(src));
    return;
  }
  const lead = src.match(/^\s*/)[0], trail = src.match(/\s*$/)[0];
  origText.set(node, src);
  const out = lead + en + trail;
  lastOut.set(node, out);
  if (out !== src) node.data = out;
}

function translateAttrs(el) {
  // Ô textarea (bài giải): chữ bé viết không dịch, nhưng placeholder / title của ô vẫn dịch.
  if (skip(el.tagName === 'TEXTAREA' ? el.parentElement : el)) return;
  for (const a of ATTRS) {
    const v = el.getAttribute(a);
    if (!v || !/[A-Za-zÀ-ỹ]/.test(v)) continue;
    const saved = origAttr.get(el) || {};
    if (saved[`${a}:out`] === v) continue;
    const en = tr(v);
    if (en == null) { if (missing && VN_CHAR.test(v)) missing.add(norm(v)); continue; }
    saved[a] = v;
    saved[`${a}:out`] = en;
    origAttr.set(el, saved);
    if (en !== v) el.setAttribute(a, en);
  }
}

function translateTree(root) {
  if (!active || !root) return;
  if (root.nodeType === Node.TEXT_NODE) { translateText(root); return; }
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  if (skip(root)) return;
  translateAttrs(root);
  if (root.tagName === 'IMG') localizeImg(root);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let n;
  while ((n = walker.nextNode())) {
    if (n.nodeType === Node.TEXT_NODE) translateText(n);
    else { translateAttrs(n); if (n.tagName === 'IMG') localizeImg(n); }
  }
}

// ── Hình SVG: chữ vẽ trong hình (<text>) cũng dịch, hiện bản dịch bằng blob URL ─────────────
const isSvgUrl = (u) => /\.svg($|[?#])|^data:image\/svg/i.test(u || '');
const svgUrlCache = new Map(); // url gốc → Promise<blob url | null>
const fromSvg = new WeakMap(); // img → blob url mình đã gắn

// Phông nhúng trong SVG chỉ có chữ của bản tiếng Việt → gắn thêm mặt chữ Latin (chỉ tải khi cần).
let latinFaces = null;
const loadLatinFaces = () => (latinFaces ||= import('../i18n/svgLatinFont.js').then(m => m.LATIN_FACES).catch(() => ({})));

/** Dịch chữ trong một tệp SVG (chuỗi) → Promise<chuỗi>. Không có gì để dịch thì trả lại nguyên văn. */
export async function localizeSvgText(text) {
  if (!active || !/<text/i.test(text)) return text;
  const faces = await loadLatinFaces();
  const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
  if (doc.querySelector('parsererror')) return text;
  let changed = false;
  // Chữ xếp nhiều dòng bằng các <text> liền nhau ("THÁNG" / "MƯỜI" / "HAI"): thử cả cụm trước.
  const lines = [...doc.querySelectorAll('text')].filter(t => !t.querySelector('tspan'));
  const done = new Set();
  for (let i = 0; i < lines.length; i++) {
    for (let len = Math.min(3, lines.length - i); len >= 2; len--) {
      const group = lines.slice(i, i + len);
      const en = svgStacks.get(norm(group.map(t => t.textContent).join(' ')));
      if (en == null) continue;
      group.forEach((t, j) => { t.textContent = j === 0 ? en : ''; done.add(t); });
      changed = true;
      i += len - 1;
      break;
    }
  }
  doc.querySelectorAll('text, tspan').forEach((el) => {
    if (done.has(el)) return;
    el.childNodes.forEach((n) => {
      if (n.nodeType !== Node.TEXT_NODE || !/[A-Za-zÀ-ỹ]/.test(n.data)) return;
      const k = norm(n.data);
      const en = svgWords.get(k) ?? tr(k);
      if (en == null) { if (missing && VN_CHAR.test(k)) missing.add(`[svg] ${k}`); return; }
      if (en !== k) { n.data = en; changed = true; }
    });
  });
  if (!changed) return text;
  const weights = [...new Set([...text.matchAll(/font-family:'Quicksand';font-weight:(\d+)/g)].map(m => m[1]))];
  const css = weights.filter(w => faces[w])
    .map(w => `@font-face{font-family:'Quicksand';font-weight:${w};src:url(data:font/woff2;base64,${faces[w]}) format('woff2')}`).join('');
  if (css) {
    const style = doc.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.textContent = css; // khai báo sau cùng → được ưu tiên cho chữ Latin
    doc.documentElement.appendChild(style);
  }
  return new XMLSerializer().serializeToString(doc.documentElement);
}

function localizeImg(img) {
  const src = img.getAttribute('src');
  if (!active || !isSvgUrl(src) || fromSvg.get(img) === src || skip(img)) return;
  if (!svgUrlCache.has(src)) {
    svgUrlCache.set(src, fetch(src).then(r => r.text()).then(async (t) => {
      const out = await localizeSvgText(t);
      return out === t ? null : URL.createObjectURL(new Blob([out], { type: 'image/svg+xml' }));
    }).catch(() => null));
  }
  svgUrlCache.get(src).then((url) => {
    if (!url || !active || img.getAttribute('src') !== src) return;
    img.dataset.i18nSrc = src; // lightbox.js: "📷 Ảnh gốc" tìm theo hình gốc
    fromSvg.set(img, url);
    img.setAttribute('src', url);
  });
}

let observer = null;
export function initI18n() {
  if (observer) return;
  observer = new MutationObserver((list) => {
    if (!active) return;
    for (const m of list) {
      if (m.type === 'characterData') translateText(m.target);
      else if (m.attributeName === 'src') localizeImg(m.target);
      else if (m.type === 'attributes') translateAttrs(m.target);
      else m.addedNodes.forEach(translateTree);
    }
  });
  observer.observe(document.body, {
    childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: [...ATTRS, 'src'],
  });
}

// ── Số: đọc tiếng Việt ↔ tiếng Anh ─────────────────────────────────────────────
const VN_ONES = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
export function vnRead(n) { // giống soDoc() của grade3Workbook.js (0–999)
  const h = Math.floor(n / 100), rem = n % 100, t = Math.floor(rem / 10), u = rem % 10;
  const parts = [];
  if (h > 0) parts.push(`${VN_ONES[h]} trăm`);
  if (h > 0 && t === 0 && u > 0) parts.push(`linh ${VN_ONES[u]}`);
  else if (t === 0 && u > 0 && h === 0) parts.push(VN_ONES[u]);
  else if (t === 1) parts.push(`mười${u === 0 ? '' : u === 5 ? ' lăm' : ` ${VN_ONES[u]}`}`);
  else if (t >= 2) parts.push(`${VN_ONES[t]} mươi${u === 0 ? '' : u === 1 ? ' mốt' : u === 5 ? ' lăm' : ` ${VN_ONES[u]}`}`);
  return parts.length ? parts.join(' ') : 'không';
}
/** Đọc số đến 99 999 như sách Toán 3: 18 023 → "mười tám nghìn không trăm hai mươi ba". */
export function vnReadBig(n) {
  if (n < 1000) return vnRead(n);
  const th = Math.floor(n / 1000), r = n % 1000;
  if (!r) return `${vnRead(th)} nghìn`;
  const tail = r < 100 ? `không trăm ${r < 10 ? `linh ${VN_ONES[r]}` : vnRead(r)}` : vnRead(r);
  return `${vnRead(th)} nghìn ${tail}`;
}
// Theo từng từ (\b của JS không hiểu chữ có dấu như "ư").
const FOLD = { mốt: 'một', lăm: 'năm', tư: 'bốn', lẻ: 'linh' };
const foldRead = (s) => norm(s).toLowerCase().split(' ').map(w => FOLD[w] || w).join(' ');
let vnReadMap = null;
function vnReadingToNumber(s) {
  // Chỉ chữ thường như sách viết ("hai mươi lăm"); "HAI", "BA" (tiêu đề lịch, tên) không phải số.
  if (!/^[a-zà-ỹ ]+$/.test(s) || s.length > 40) return null;
  if (!vnReadMap) {
    vnReadMap = new Map();
    for (let n = 0; n < 1000; n++) vnReadMap.set(foldRead(vnRead(n)), n);
  }
  return vnReadMap.get(foldRead(s)) ?? null;
}

const EN_ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const EN_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
/** 25 → "twenty-five", 304 → "three hundred and four", 5000 → "five thousand". */
export function englishNumber(n) {
  if (n < 20) return EN_ONES[n];
  if (n < 100) return EN_TENS[Math.floor(n / 10)] + (n % 10 ? `-${EN_ONES[n % 10]}` : '');
  if (n < 1000) return `${EN_ONES[Math.floor(n / 100)]} hundred${n % 100 ? ` and ${englishNumber(n % 100)}` : ''}`;
  const th = Math.floor(n / 1000), r = n % 1000;
  return `${englishNumber(th)} thousand${r ? (r < 100 ? ' and ' : ' ') + englishNumber(r) : ''}`;
}
/** "twenty five" / "Twenty-five" / "three hundred and four" → số; null nếu không phải. */
export function parseEnglishNumber(s) {
  const ws = String(s).toLowerCase().replace(/[-,]/g, ' ').split(/\s+/).filter(w => w && w !== 'and');
  if (!ws.length) return null;
  let total = 0, cur = 0;
  for (const w of ws) {
    const o = EN_ONES.indexOf(w), t = EN_TENS.indexOf(w);
    if (o >= 0) cur += o;
    else if (t >= 2) cur += t * 10;
    else if (w === 'hundred') cur = (cur || 1) * 100;
    else if (w === 'thousand') { total += (cur || 1) * 1000; cur = 0; }
    else return null;
  }
  return total + cur;
}

// Bàn phím chữ "Đọc số" khi học bằng tiếng Anh (virtualKeyboard.js).
export const EN_WORD_ROWS = [
  ['one', 'two', 'three', 'four', 'five'],
  ['six', 'seven', 'eight', 'nine', 'ten'],
  ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen'],
  ['sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'],
  ['thirty', 'forty', 'fifty', 'sixty', 'seventy'],
  ['eighty', 'ninety', 'hundred', 'thousand', 'and'],
  ['zero', '⌫', '✓'],
];

/**
 * Đáp án bé gõ bằng tiếng Anh → dạng tiếng Việt mà validator của sách hiểu.
 * opts.ds: ô Đ/S (T/F). Không đổi gì khi đang ở tiếng Việt.
 */
export function toVietnameseAnswer(value, { ds = false } = {}) {
  if (!active) return value;
  const v = String(value).trim();
  if (ds) {
    if (/^(t|true)$/i.test(v)) return 'Đ';
    if (/^(f|false)$/i.test(v)) return 'S';
    return value;
  }
  if (!/[a-z]{2,}/i.test(v)) return value;
  // Ô nhiều chỗ trống ("seven,thirteen,nineteen"): đổi từng phần.
  if (v.includes(',') && v.split(',').every(p => p.trim() && parseEnglishNumber(p) != null)) {
    return v.split(',').map(p => toVietnameseAnswer(p.trim())).join(',');
  }
  // Cả câu đáp án có trong từ điển (kể cả có "and": "eight thousand … and seven square centimeters").
  const lowV = norm(v).toLowerCase();
  const whole = answerMap.get(lowV) ?? answerMap.get(lowV.replace(/ and /g, ' '));
  if (whole != null) return whole;
  const n = parseEnglishNumber(v);
  if (n != null && n < 100000) return vnReadBig(n);
  // "8 tens and 2 ones" → "8 chục và 2 đơn vị"
  const m = v.match(/^(\d+)\s*tens?\s*(?:and\s*)?(\d+)\s*ones?$/i);
  if (m) return `${m[1]} chục và ${m[2]} đơn vị`;
  // Ngày tháng: "January 27", "27 January", "from June 20 to June 24" → "ngày 27 tháng 1"…
  let d = v.replace(MONTH_DAY, (_, mo, day) => `ngày ${day} tháng ${monthNo(mo)}`)
    .replace(DAY_MONTH, (_, day, mo) => `ngày ${day} tháng ${monthNo(mo)}`);
  if (d !== v) return d.replace(/^from\s+/i, 'Từ ').replace(/\s+to\s+/i, ' đến ').replace(/^on\s+/i, '');
  // Danh sách từ: "Bottle, Kettle, Bucket, Can", "Nam, Robot", "heavier than", "red".
  d = v.split(/(\s*[,;]\s*|\s+and\s+|\s*&\s*)/i).map((tok, i) => {
    if (i % 2) return /and|&/i.test(tok) ? ' và ' : tok;
    const k = norm(tok).toLowerCase().replace(/^the\s+/, '');
    return answerMap.get(k) ?? reverse.get(k) ?? WEEKDAY_VI[k] ?? tok;
  }).join('');
  return d;
}

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const monthNo = (mo) => MONTHS.findIndex(x => x.startsWith(mo.toLowerCase().slice(0, 3))) + 1;
const MON = String.raw`(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?`;
const MONTH_DAY = new RegExp(String.raw`\b${MON}\s+(\d{1,2})(?:st|nd|rd|th)?\b`, 'gi');
const DAY_MONTH = new RegExp(String.raw`\b(\d{1,2})(?:st|nd|rd|th)?\s+(?:of\s+)?${MON}\b`, 'gi');
// Thứ: "Wednesday" → "Tư" (ô sau chữ "thứ …" và weekdayValidate đều nhận).
const WEEKDAY_VI = {
  monday: 'Hai', tuesday: 'Ba', wednesday: 'Tư', thursday: 'Năm', friday: 'Sáu', saturday: 'Bảy', sunday: 'Chủ nhật',
};
