/**
 * 🔎 Tìm theo chữ trong danh sách bài (sách, công cụ, Luyện Tính).
 *
 * Khớp theo TỪ trọn vẹn ("tu" không khớp "tuần"). Gõ không dấu thì không xét dấu ("goc tu" = "góc tù");
 * gõ có dấu thì phải đúng dấu ("song song" không khớp "sông"). Ưu tiên cả cụm đứng liền nhau;
 * không chỗ nào có cả cụm thì mới nhận các từ đúng thứ tự, đứng gần nhau (m.loose). Mỗi màn danh sách tự lọc ô
 * của mình; ở đây chỉ có:
 *   searchBox({ value, placeholder, onQuery })  ô tìm (gõ → onQuery(q) sau 150 ms, ✕ / Esc xoá)
 *   matcher(q)              → m(chữ đã prep) khớp cả cụm; m.loose(…) các từ gần nhau; null khi ô trống / quá ngắn
 *   pickTest(m, prepped[])  m nếu có chỗ khớp cả cụm, không thì m.loose
 *   prep(s)                 chữ để tìm: { l: thường có dấu, f: không dấu }
 *   fold(s)                 bỏ thẻ HTML, bỏ dấu, đ → d, chữ thường
 *   snippet(raw, q)         một đoạn ngắn quanh chỗ khớp, chữ khớp tô <mark>
 *   textOf(value)           gom chữ trong một câu hỏi / bài (bỏ đáp án, đường dẫn hình, hàm chấm)
 *   stringsOfFn(fn)         các câu chữ viết trong một hàm (lời thầy trong bước Khám phá…)
 */

const FOLD_CACHE = new Map();

/** Một kí tự → dạng không dấu thường ('' cho dấu thanh rời). */
function foldChar(c) {
  let f = FOLD_CACHE.get(c);
  if (f == null) {
    f = c.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'd').toLowerCase();
    FOLD_CACHE.set(c, f);
  }
  return f;
}

export function plain(s) {
  return String(s ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ').trim();
}

export function fold(s) {
  let out = '';
  for (const c of plain(s)) out += foldChar(c);
  return out;
}

const lower = (s) => plain(s).toLowerCase();
const hasMarks = (q) => fold(q) !== lower(q).replace(/\s+/g, ' ').trim();
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const word = (w) => `(?<![\\p{L}\\p{N}])${reEsc(w)}(?![\\p{L}\\p{N}])`;

/** Chữ đã chuẩn bị để tìm: l = chữ thường giữ dấu, f = không dấu. */
export const prep = (s) => ({ l: lower(s), f: fold(s) });

/** Từ cần tìm + so theo dạng nào (có dấu / không dấu). */
function parse(q) {
  const marked = hasMarks(q);
  const t = (marked ? lower(q) : fold(q)).split(' ').filter(Boolean);
  return { t, key: marked ? 'l' : 'f' };
}

/** null: chưa tìm (ô trống hoặc chỉ 1 kí tự). m(x): cả cụm liền nhau; m.loose(x): các từ đúng thứ tự, gần nhau. */
export function matcher(q) {
  const { t, key } = parse(q);
  if (!t.length || t.join('').length < 2) return null;
  const phrase = new RegExp(t.map(word).join('[\\s,.;:·–-]+'), 'u');
  // rải rác: đúng thứ tự, giữa hai từ tìm có tối đa 2 từ khác ("đường cao của hình tam giác"),
  // không nhận "chữ số hàng trăm, …, đơn vị" cho "chu vi"
  const gap = '[\\s,.;:–-]+(?:[^\\s·]+[\\s,.;:–-]+){0,2}';
  const near = new RegExp(t.map(word).join(gap), 'u');
  const pick = (x) => (typeof x === 'string' ? x : x?.[key] ?? '');
  const m = (x) => phrase.test(pick(x));
  m.loose = t.length > 1 ? (x) => near.test(pick(x)) : m;
  return m;
}

/** Có chỗ nào khớp cả cụm thì dùng m, không thì m.loose. */
export function pickTest(m, items) {
  return items.some((x) => m(x)) ? m : m.loose;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Đoạn quanh chỗ khớp đầu tiên (~max kí tự), các từ khớp tô <mark>. '' nếu không khớp. */
export function snippet(raw, q, max = 90) {
  const text = plain(raw);
  const { t, key } = parse(q);
  if (!t.length) return '';
  // chữ đã fold + vị trí từng kí tự fold trong chữ gốc
  let f = '';
  const at = [];
  const chars = [...text];
  chars.forEach((c, i) => { const x = foldChar(c); for (let k = 0; k < x.length; k++) { f += x[k]; at.push(i); } });
  const hits = [];
  const isL = (c) => /[\p{L}\p{N}]/u.test(c || '');
  const byTerm = t.map((w) => {
    const wf = fold(w);
    const list = [];
    let i = f.indexOf(wf);
    while (i >= 0) {
      const a = at[i], b = at[i + wf.length - 1] + 1;
      // từ trọn vẹn; gõ có dấu thì phải đúng dấu
      if (!isL(chars[a - 1]) && !isL(chars[b]) && (key === 'f' || chars.slice(a, b).join('').toLowerCase() === w)) list.push([a, b]);
      i = f.indexOf(wf, i + wf.length);
    }
    return list;
  });
  // có cả cụm liền nhau thì chỉ tô cả cụm ("chu vi"), không tô lẻ "chữ" ở chỗ khác
  const sep = (a, b) => /^[\s,.;:·–-]+$/.test(chars.slice(a, b).join(''));
  byTerm[0].forEach(([a0, b0]) => {
    let end = b0;
    for (let k = 1; k < byTerm.length; k++) {
      const next = byTerm[k].find(([a]) => a > end && sep(end, a));
      if (!next) return;
      end = next[1];
    }
    hits.push([a0, end]);
  });
  if (!hits.length) byTerm.forEach((list) => hits.push(...list));
  if (!hits.length) return '';
  hits.sort((a, b) => a[0] - b[0]);
  const first = hits[0][0];
  let s = Math.max(0, first - Math.floor(max / 3));
  let e = Math.min(chars.length, s + max);
  s = Math.max(0, e - max);
  // không cắt giữa từ
  while (s > 0 && chars[s - 1] !== ' ') s--;
  while (e < chars.length && chars[e] !== ' ') e++;
  let html = '';
  let i = s;
  hits.filter(([a, b]) => b > s && a < e).forEach(([a, b]) => {
    if (a < i) return;
    html += esc(chars.slice(i, a).join('')) + `<mark>${esc(chars.slice(a, b).join(''))}</mark>`;
    i = b;
  });
  html += esc(chars.slice(i, e).join(''));
  return `${s > 0 ? '… ' : ''}${html}${e < chars.length ? ' …' : ''}`;
}

// Không đưa vào chỗ tìm: đáp án (lộ bài), hình, hàm chấm…
const SKIP_KEYS = new Set(['answer', 'answers', 'accept', 'validate', 'img', 'image', 'src', 'svg', 'id', 'key', 'color', 'pourPlay', 'balancePlay', 'geoPlay', 'ekePlay', 'rulerPlay', 'countPlay', 'areaPlay', 'pairPlay', 'tiles', 'solution', 'stars', 'type', 'section', 'mode', 'kind', 'layout']);
const IS_ASSET = /^(data:|https?:|\/|\.\.?\/)|\.(svg|png|jpe?g|webp|mp3)(\?|$)/i;

/** Mọi chữ trong một câu hỏi (đề, các dòng điền, lựa chọn, gợi ý, ô bảng…), nối bằng " · ". */
export function textOf(value, depth = 0, out = []) {
  if (value == null || depth > 5) return out;
  if (typeof value === 'string') {
    if (!IS_ASSET.test(value) && /\p{L}/u.test(value)) out.push(plain(value));
  } else if (Array.isArray(value)) {
    value.forEach((v) => textOf(v, depth + 1, out));
  } else if (typeof value === 'object') {
    Object.entries(value).forEach(([k, v]) => { if (!SKIP_KEYS.has(k) && !k.startsWith('__')) textOf(v, depth + 1, out); });
  }
  return depth === 0 ? out.join(' · ') : out;
}

/**
 * Các câu chữ tiếng Việt viết trong mã của hàm (lời thầy c.say('…'), chú thích trên hình…).
 * Bỏ chuỗi kĩ thuật (lớp CSS, màu, đường dẫn); ${…} trong chuỗi mẫu thay bằng "…".
 */
export function stringsOfFn(fn) {
  if (typeof fn !== 'function') return '';
  const src = fn.toString();
  const out = [];
  const re = /'((?:\\.|[^'\\\n])*)'|"((?:\\.|[^"\\\n])*)"|`((?:\\.|[^`\\])*)`/g;
  let m;
  while ((m = re.exec(src))) {
    let s = m[1] ?? m[2] ?? m[3] ?? '';
    if (m[3] != null) s = s.replace(/\$\{[^}]*\}/g, ' … ');
    s = plain(s.replace(/\\n/g, ' ').replace(/\\(.)/g, '$1'));
    // câu chữ thật: có chữ cái và (có dấu tiếng Việt hoặc có khoảng trắng); bỏ "g4-…", "#fff", "M0 0 L…"
    if (s.length < 3 || !/\p{L}/u.test(s)) continue;
    if (!/[À-ỹ]/.test(s) && !/\s/.test(s)) continue;
    if (/^[\w#.:-]+(\s[\w#.:-]+)*$/.test(s) && !/[À-ỹ]/.test(s)) continue;
    out.push(s);
  }
  return out.join(' · ');
}

// ── ô tìm ────────────────────────────────────────────────────────────────────
export function searchBox({ value = '', placeholder = 'Tìm bài…', onQuery, cls = '' }) {
  injectStyles();
  const box = document.createElement('div');
  box.className = `ls-box ${cls}`;
  box.innerHTML = `
    <span class="ls-icon" aria-hidden="true">🔎</span>
    <input type="search" class="ls-input" enterkeyhint="search" autocomplete="off" spellcheck="false" aria-label="${placeholder}">
    <button type="button" class="ls-clear" aria-label="Xoá">✕</button>`;
  const input = box.querySelector('.ls-input');
  const clear = box.querySelector('.ls-clear');
  input.placeholder = placeholder;
  input.value = value;
  let timer = 0;
  const fire = () => { clearTimeout(timer); box.classList.toggle('ls-has', !!input.value); onQuery(input.value); };
  input.addEventListener('input', () => { clearTimeout(timer); box.classList.toggle('ls-has', !!input.value); timer = setTimeout(fire, 150); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && input.value) { e.stopPropagation(); input.value = ''; fire(); }
    if (e.key === 'Enter') { input.blur(); fire(); }
  });
  clear.onclick = () => { input.value = ''; fire(); input.focus(); };
  box.classList.toggle('ls-has', !!value);
  return box;
}

/** Dòng "Không tìm thấy …" / số kết quả, đặt ngay dưới ô tìm. */
export function resultNote(el, q, count, unit = 'bài') {
  if (!el) return;
  el.hidden = !matcher(q);
  el.innerHTML = count
    ? `Tìm thấy <b>${count}</b> ${unit} có “${esc(plain(q))}”`
    : `Không tìm thấy ${unit} nào có “${esc(plain(q))}”. Thử gõ ngắn hơn hoặc dùng từ khác.`;
  el.classList.toggle('ls-none', !count);
}

function injectStyles() {
  if (document.getElementById('ls-styles')) return;
  const style = document.createElement('style');
  style.id = 'ls-styles';
  style.textContent = `
    .ls-box {
      position: relative; display: flex; align-items: center; width: 100%; max-width: 640px; box-sizing: border-box;
      margin: 0.4rem auto 0.6rem; background: #fff; border: 2px solid #CBD5E1; border-radius: 999px;
      box-shadow: 0 2px 8px rgba(15,23,42,.06); transition: border-color .15s, box-shadow .15s;
    }
    .ls-box:focus-within { border-color: #6366F1; box-shadow: 0 0 0 4px rgba(99,102,241,.15); }
    .ls-icon { padding: 0 0.2rem 0 0.9rem; font-size: 1.05rem; }
    .ls-input {
      flex: 1 1 auto; min-width: 0; border: none; outline: none; background: transparent;
      font: 600 1.05rem Quicksand, sans-serif; color: #1E293B; padding: 0.65rem 0.5rem;
    }
    .ls-input::-webkit-search-cancel-button { display: none; }
    .ls-clear {
      visibility: hidden; flex: none; width: 2rem; height: 2rem; margin-right: 0.4rem; border-radius: 50%;
      border: none; background: #E2E8F0; color: #475569; font: 800 0.9rem Quicksand, sans-serif; cursor: pointer;
    }
    .ls-has .ls-clear { visibility: visible; }
    .ls-note { width: 100%; max-width: 640px; margin: -0.2rem auto 0.6rem; font: 600 0.9rem Quicksand, sans-serif; color: #475569; text-align: center; }
    .ls-note.ls-none { color: #9A3412; background: #FFF7ED; border-radius: 0.8rem; padding: 0.6rem 0.8rem; }
    .ls-snip { display: block; margin-top: 0.2rem; font: 500 0.85rem/1.35 Quicksand, sans-serif; color: #475569; }
    .ls-snip mark, .ls-hit mark { background: #FEF08A; color: inherit; border-radius: 0.2em; padding: 0 0.1em; }
    .ls-hide { display: none !important; }
  `;
  document.head.appendChild(style);
}
