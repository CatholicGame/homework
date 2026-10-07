/**
 * 🖍️ Tô màu — câu hỏi bảo "tô màu" thì bé được tô thật lên hình.
 *
 * Chỉ là đồ dùng học tập: không ghi vào ô trả lời, không chấm điểm (đáp án
 * vẫn do các ô / lựa chọn của câu hỏi). Hình của câu được thay bằng chính SVG đó
 * (tải lại dạng inline, cùng cỡ) và hộp bút màu nằm ngay dưới hình, bé tô thẳng
 * lên hình. Hình đã có đồ dùng khác (Kéo dài, Ê ke, Thử cân…) thì giữ ảnh, nút
 * "🖍️ Tô màu" mở một lớp phủ lớn như trước. Cách tô:
 *   • chạm vào một hình kín còn trắng (hình tròn, ô vuông, bông hoa…) → tô kín;
 *   • kéo ngón tay / chuột → tô bằng nét bút sáp (dùng được cho mọi hình:
 *     con đường, quả táo, một phần của hình…);
 *   • "Tẩy": chạm hình để xoá màu, kéo qua nét để xoá nét; "↩ Hoàn tác", "Xoá hết".
 * Màu đã tô được nhớ theo hình (localStorage), và hiện luôn trên hình trong
 * câu hỏi — cả ở câu khác dùng chung hình đó (Bài 3: câu 2a tô, câu 2c đếm).
 *
 *   q.paint = true / false   bật / tắt; mặc định: q.q có "tô màu" (không tính
 *                            "đã tô màu") và q.img là SVG
 */

import { scopedKey } from './auth.js';
import { isEnglish, localizeSvgText } from './i18n.js';

const SVG_CACHE = new Map();
const SHAPES = 'circle, ellipse, rect, polygon, path';
const DRAG_START_PX = 6;

// Bút màu theo tên màu trong đề; không nêu màu nào thì đưa cả hộp.
const COLORS = {
  red: ['Đỏ', '#EF4444'],
  orange: ['Cam', '#FB923C'],
  yellow: ['Vàng', '#FACC15'],
  green: ['Xanh lá', '#22C55E'],
  blue: ['Xanh dương', '#3B82F6'],
  purple: ['Tím', '#A855F7'],
  pink: ['Hồng', '#F472B6'],
  brown: ['Nâu', '#A16207'],
};
const NAMED = [
  [/màu\s+đỏ/, ['red']],
  [/màu\s+cam/, ['orange']],
  [/màu\s+vàng/, ['yellow']],
  [/màu\s+xanh\s+lá/, ['green']],
  [/màu\s+xanh\s+(dương|da trời|nước biển)/, ['blue']],
  [/màu\s+xanh(?!\s+(lá|dương|da trời|nước biển))/, ['blue', 'green']],
  [/màu\s+tím/, ['purple']],
  [/màu\s+hồng/, ['pink']],
  [/màu\s+nâu/, ['brown']],
];

export function crayonsFor(text) {
  const t = String(text || '').toLowerCase();
  const keys = [];
  NAMED.forEach(([re, ks]) => { if (re.test(t)) ks.forEach(k => { if (!keys.includes(k)) keys.push(k); }); });
  return keys.length ? keys : Object.keys(COLORS);
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const isSvgUrl = (url) => /\.svg($|[?#])|^data:image\/svg/i.test(String(url || ''));

export function isPaintQuestion(q) {
  if (q.paint != null) return !!q.paint && isSvgUrl(q.img);
  const text = String(q.q || '').replace(/đã\s+(được\s+)?tô\s+màu/gi, '');
  return /tô\s+màu/i.test(text) && isSvgUrl(q.img);
}

function loadSvg(url) {
  // Học bằng tiếng Anh: chữ trong hình cũng dịch (engine/i18n.js); bộ nhớ đệm tách theo ngôn ngữ.
  const key = `${isEnglish() ? 'en' : 'vi'}|${url}`;
  if (!SVG_CACHE.has(key)) SVG_CACHE.set(key, fetch(url).then(r => r.text()).then(localizeSvgText));
  return SVG_CACHE.get(key);
}

// ── lưu theo hình ───────────────────────────────────────────────────────────
function keyOf(url) {
  let h = 0;
  for (let i = 0; i < url.length; i++) h = (h * 31 + url.charCodeAt(i)) | 0;
  return scopedKey(`gw-paint:${(h >>> 0).toString(36)}:${url.length}`);
}
const empty = () => ({ fills: {}, strokes: [] });
const isEmpty = (s) => !Object.keys(s.fills).length && !s.strokes.length;
function loadState(url) {
  try {
    const s = JSON.parse(localStorage.getItem(keyOf(url)) || 'null');
    if (s && typeof s.fills === 'object' && Array.isArray(s.strokes)) return s;
  } catch { /* storage blocked */ }
  return empty();
}
function saveState(url, s) {
  try {
    if (isEmpty(s)) localStorage.removeItem(keyOf(url));
    else localStorage.setItem(keyOf(url), JSON.stringify(s));
  } catch { /* storage blocked */ }
  window.dispatchEvent(new CustomEvent('tth:data-changed'));
}

// ── vẽ trạng thái lên một <svg> ─────────────────────────────────────────────
const NS = 'http://www.w3.org/2000/svg';
function paintInto(svg, state, shapes) {
  shapes.forEach((el, i) => {
    const c = state.fills[i];
    if (c) el.style.setProperty('fill', COLORS[c]?.[1] || c);
    else el.style.removeProperty('fill');
  });
  let layer = svg.querySelector(':scope > g[data-gw-strokes]');
  if (!layer) {
    layer = document.createElementNS(NS, 'g');
    layer.setAttribute('data-gw-strokes', '');
    layer.setAttribute('fill', 'none');
    layer.setAttribute('stroke-linecap', 'round');
    layer.setAttribute('stroke-linejoin', 'round');
    layer.setAttribute('style', 'mix-blend-mode:multiply');
    svg.appendChild(layer);
  }
  layer.replaceChildren(...state.strokes.map((s, i) => strokeEl(s, i)));
  return layer;
}
function strokeEl(s, i) {
  const p = document.createElementNS(NS, 'path');
  p.setAttribute('d', s.d);
  p.setAttribute('stroke', COLORS[s.c]?.[1] || s.c);
  p.setAttribute('stroke-width', s.w);
  p.setAttribute('stroke-opacity', '0.8');
  if (i != null) p.dataset.gwStroke = i;
  return p;
}
const shapesOf = (svg) => [...svg.querySelectorAll(SHAPES)].filter(el => !el.closest('defs, clipPath, mask, pattern, [data-gw-strokes]'));

// Hình trong câu hỏi: hiện bản đã tô (blob URL) thay cho hình gốc.
const PAINTED_URLS = new Map();
async function paintedUrl(url, state) {
  const text = await loadSvg(url);
  const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
  const svg = doc.documentElement;
  paintInto(svg, state, shapesOf(svg));
  const out = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' }));
  const old = PAINTED_URLS.get(url);
  if (old) URL.revokeObjectURL(old);
  PAINTED_URLS.set(url, out);
  return out;
}
async function showOnCard(img, url) {
  const state = loadState(url);
  if (isEmpty(state)) {
    delete img.dataset.paintedSrc;
    if (img.dataset.showingOrig !== '1') img.src = url;
    return;
  }
  const painted = await paintedUrl(url, state);
  if (!img.isConnected) return;
  img.dataset.svgSrc = url; // lightbox.js: "📷 Ảnh gốc" vẫn tìm được ảnh gốc
  img.dataset.paintedSrc = painted;
  if (img.dataset.showingOrig !== '1') img.src = painted;
}

// Hình đã có đồ dùng khác (Kéo dài, Ê ke, Đếm chu vi, Thử cân…) gắn vào <img>: giữ ảnh, tô màu mở lớp phủ.
const OTHER_TOOLS = '.gp-open, .gt-row, .gt-open, .pm-open, .np-open, .bal-open, .pour-open';

/**
 * Gọi cho mọi câu có q.img: câu tô màu được tô ngay trên hình của câu (hộp bút
 * màu dưới hình); câu nào dùng hình đã được tô (ở câu khác) thì hiện hình đã tô.
 */
export function attachColorPaint(root, q) {
  const img = root.querySelector('.e3-question-card > .e3-q-img');
  if (!img || !isSvgUrl(q.img)) return;
  const url = q.img;
  if (!isEmpty(loadState(url))) showOnCard(img, url);
  if (!isPaintQuestion(q)) return;
  injectStyles();
  // Chờ các đồ dùng khác của câu gắn xong (cùng lượt vẽ, trước khi màn hình hiện ra).
  queueMicrotask(() => {
    if (!img.isConnected) return;
    if (img.parentElement.querySelector(`:scope > :is(${OTHER_TOOLS})`)) attachPopupButton(img, q);
    else attachInline(img, q);
  });
}

// 🖍️ Tô thẳng lên hình của câu: <img> được thay bằng chính SVG đó (cùng lớp e3-q-img, cùng
// width/height nên cùng cỡ, không xê dịch), hộp bút màu nằm ngay dưới hình.
async function attachInline(img, q) {
  const url = q.img;
  const colorKeys = crayonsFor(q.q);
  const orig = img.nextElementSibling?.classList.contains('e3-orig-toggle') ? img.nextElementSibling : null;
  orig?.remove(); // "📷 Ảnh gốc" đổi src của <img>, không dùng được cho hình tô
  const bar = document.createElement('div');
  bar.className = 'cp-bar';
  bar.innerHTML = crayonButtons(colorKeys)
    + '<button type="button" class="cp-btn cp-undo" title="Hoàn tác" aria-label="Hoàn tác">↩</button>'
    + '<button type="button" class="cp-btn cp-clear">Xoá hết</button>';
  img.after(bar);

  const text = await loadSvg(url);
  if (!img.isConnected) return;
  const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
  const svg = document.importNode(doc.documentElement, true);
  if (svg.tagName.toLowerCase() !== 'svg') return;
  svg.setAttribute('class', `${img.className} cp-inline`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', img.alt || 'Hình');
  img.replaceWith(svg);
  mountPainter(svg, bar, url, colorKeys);
}

const crayonButtons = (keys) => [...keys.map(k => [k, ...COLORS[k]]), ['', '🧽 Tẩy', '#fff']]
  .map(([key, label, fill]) => `<button type="button" class="cp-crayon" data-cp="${key}"><span class="cp-dot" style="background:${fill}"></span>${label}</button>`)
  .join('');

function attachPopupButton(img, q) {
  const url = q.img;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'cp-open';
  btn.textContent = '🖍️ Tô màu';
  btn.classList.toggle('cp-open-hint', isEmpty(loadState(url)));
  // Sau hình (và sau nút "📷 Ảnh gốc" của lightbox.js nếu có).
  (img.nextElementSibling?.classList.contains('e3-orig-toggle') ? img.nextElementSibling : img).after(btn);
  btn.onclick = () => openPainter(url, crayonsFor(q.q), ruleOf(q.q), () => {
    btn.classList.toggle('cp-open-hint', isEmpty(loadState(url)));
    showOnCard(img, url);
  });
}

// Yêu cầu tô màu của đề (các dòng có "tô màu"), nhắc lại trên lớp phủ.
function ruleOf(text) {
  const lines = String(text || '').split('\n')
    .map(l => l.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const rule = lines.filter(l => /tô\s+màu/i.test(l.replace(/đã\s+(được\s+)?tô\s+màu/gi, '')));
  return (rule.length ? rule : lines).join('\n');
}

// "màu đỏ", "màu vàng"… trong đề được tô đúng màu bút, để bé nối lời đề với bút.
const WORD_COLOR = [
  [/màu\s+xanh\s+lá(\s+cây)?/gi, 'green'], [/màu\s+xanh\s+(dương|da trời|nước biển)/gi, 'blue'],
  [/màu\s+xanh(?!\s+(lá|dương|da trời|nước biển))/gi, 'blue'], [/màu\s+đỏ/gi, 'red'], [/màu\s+vàng/gi, 'yellow'],
  [/màu\s+cam/gi, 'orange'], [/màu\s+tím/gi, 'purple'], [/màu\s+hồng/gi, 'pink'], [/màu\s+nâu/gi, 'brown'],
];
function markColors(html) {
  // đánh dấu trước, thay sau: tránh một cụm bị bọc hai lần
  const found = [];
  WORD_COLOR.forEach(([re, key]) => {
    html = html.replace(re, m => `\u0001${found.push([m, key]) - 1}\u0002`);
  });
  return html.replace(/\u0001(\d+)\u0002/g, (_, i) => {
    const [m, key] = found[+i];
    return `<span class="cp-word" style="background:${COLORS[key][1]}${key === 'yellow' ? ';color:#1E293B;text-shadow:none' : ''}">${m}</span>`;
  });
}

// ── lớp phủ tô màu ──────────────────────────────────────────────────────────
async function openPainter(url, colorKeys, rule, onClose) {
  injectStyles();
  const overlay = document.createElement('div');
  overlay.className = 'cp-overlay';
  overlay.innerHTML = `
    <div class="cp-panel" role="dialog" aria-label="Tô màu">
      <div class="cp-head">
        <span class="cp-title">🖍️ Chọn bút màu, chạm vào hình để tô kín, hoặc kéo để tô.</span>
        <button type="button" class="cp-btn cp-undo" title="Hoàn tác">↩ Hoàn tác</button>
        <button type="button" class="cp-btn cp-clear">Xoá hết</button>
        <button type="button" class="cp-btn cp-close" aria-label="Xong">✓ Xong</button>
      </div>
      ${rule ? `<div class="cp-rule">${markColors(esc(rule)).replace(/\n/g, '<br>')}</div>` : ''}
      <div class="cp-crayons">${crayonButtons(colorKeys)}</div>
      <div class="cp-figure"></div>
    </div>`;
  document.body.appendChild(overlay);
  const close = () => {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
    onClose();
  };
  const onKey = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  overlay.querySelector('.cp-close').onclick = close;

  const fig = overlay.querySelector('.cp-figure');
  fig.innerHTML = await loadSvg(url);
  const svg = fig.querySelector('svg');
  if (!svg) return;
  svg.removeAttribute('width');
  svg.removeAttribute('height');
  mountPainter(svg, overlay, url, colorKeys);
}

// Bút màu, chạm tô kín / kéo tô nét, tẩy, hoàn tác trên một <svg> đã nằm trong trang.
// ctl chứa các nút .cp-crayon, .cp-undo, .cp-clear.
function mountPainter(svg, ctl, url, colorKeys) {
  const shapes = shapesOf(svg);
  const vb = svg.viewBox.baseVal;
  const svgArea = (vb && vb.width ? vb.width * vb.height : 1);
  const brushW = +((vb?.width || 800) * 0.022).toFixed(1);
  // Hình kín còn trắng / trong suốt, không phải khung nền → chạm để tô kín.
  const fillable = new Set(shapes.filter(el => {
    if (el.tagName === 'path' && !/z/i.test(el.getAttribute('d') || '')) return false;
    const cs = getComputedStyle(el);
    if (cs.stroke === 'none' && cs.fill === 'none') return false;
    if (!isBlankFill(cs.fill)) return false;
    try {
      const b = el.getBBox();
      // bbox của hình → đơn vị viewBox (hình có thể nằm trong <g transform>)
      const m = svg.getScreenCTM()?.inverse().multiply(el.getScreenCTM());
      const scale = m ? Math.abs(m.a * m.d - m.b * m.c) : 1;
      const area = b.width * b.height * scale;
      return area > svgArea * 0.0004 && area < svgArea * 0.45;
    } catch { return false; }
  }));
  fillable.forEach(el => el.classList.add('cp-fillable'));
  svg.classList.add('cp-svg');

  let state = loadState(url);
  const undo = [];
  let pick = colorKeys[0];
  const snapshot = () => { undo.push(JSON.stringify(state)); if (undo.length > 60) undo.shift(); };
  const commit = () => { saveState(url, state); draw(); };
  function draw() {
    paintInto(svg, state, shapes);
    ctl.querySelectorAll('.cp-crayon').forEach(b => b.classList.toggle('cp-on', b.dataset.cp === pick));
    ctl.querySelector('.cp-undo').disabled = !undo.length;
    ctl.querySelector('.cp-clear').disabled = isEmpty(state);
    svg.classList.toggle('cp-erasing', !pick);
  }

  ctl.querySelectorAll('.cp-crayon').forEach(b => b.addEventListener('click', () => { pick = b.dataset.cp; draw(); }));
  ctl.querySelector('.cp-undo').onclick = () => { if (undo.length) { state = JSON.parse(undo.pop()); commit(); } };
  ctl.querySelector('.cp-clear').onclick = () => { if (!isEmpty(state)) { snapshot(); state = empty(); commit(); } };

  // chạm = tô kín / tẩy hình; kéo = nét bút / tẩy nét
  const toSvg = (e) => {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  };
  const hits = (e) => document.elementsFromPoint(e.clientX, e.clientY);
  let down = null;
  svg.addEventListener('pointerdown', (e) => {
    if (e.button > 0) return;
    e.preventDefault();
    svg.setPointerCapture(e.pointerId);
    down = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false, pts: [toSvg(e)], live: null, erased: false };
  });
  svg.addEventListener('pointermove', (e) => {
    if (!down || e.pointerId !== down.id) return;
    if (!down.moved && Math.hypot(e.clientX - down.x, e.clientY - down.y) < DRAG_START_PX) return;
    if (!down.moved) {
      down.moved = true;
      snapshot();
      if (pick) {
        down.live = strokeEl({ c: pick, w: brushW, d: `M${down.pts[0]}` });
        svg.querySelector(':scope > g[data-gw-strokes]').appendChild(down.live);
      }
    }
    if (pick) {
      down.pts.push(toSvg(e));
      down.live.setAttribute('d', `M${down.pts.join(' L')}`);
    } else {
      const hit = hits(e).find(el => el.dataset?.gwStroke != null);
      if (hit) {
        state.strokes.splice(+hit.dataset.gwStroke, 1);
        down.erased = true;
        draw();
      }
    }
  });
  const finish = (e) => {
    if (!down || e.pointerId !== down.id) return;
    const d = down;
    down = null;
    if (d.moved) {
      if (pick) state.strokes.push({ c: pick, w: brushW, d: `M${d.pts.join(' L')}` });
      else if (!d.erased) undo.pop();
      commit();
      return;
    }
    if (e.type === 'pointercancel') return;
    const under = hits(e);
    const shape = under.find(el => fillable.has(el));
    const i = shape ? shapes.indexOf(shape) : -1;
    if (!pick) {
      const hit = under.find(el => el.dataset?.gwStroke != null);
      if (hit) { snapshot(); state.strokes.splice(+hit.dataset.gwStroke, 1); commit(); }
      else if (i >= 0 && state.fills[i]) { snapshot(); delete state.fills[i]; commit(); }
      return;
    }
    snapshot();
    if (i >= 0) {
      if (state.fills[i] === pick) delete state.fills[i];
      else state.fills[i] = pick;
    } else {
      // chạm chỗ không phải hình kín: chấm một chấm bút
      state.strokes.push({ c: pick, w: brushW, d: `M${d.pts[0]} L${d.pts[0]}` });
    }
    commit();
  };
  svg.addEventListener('pointerup', finish);
  svg.addEventListener('pointercancel', finish);
  draw();
}

function isBlankFill(fill) {
  if (!fill || fill === 'none' || fill === 'transparent') return true;
  const m = fill.match(/rgba?\(([^)]+)\)/);
  if (!m) return false;
  const [r, g, b, a = 1] = m[1].split(',').map(Number);
  return +a === 0 || (r >= 245 && g >= 245 && b >= 245);
}

function injectStyles() {
  if (document.getElementById('cp-styles')) return;
  const style = document.createElement('style');
  style.id = 'cp-styles';
  style.textContent = `
    .cp-open {
      display: block; margin: 6px auto 0; padding: 5px 14px;
      border: 1.5px solid #EC4899; border-radius: 999px; background: #FDF2F8; color: #9D174D;
      font: 700 0.9rem Quicksand, sans-serif; cursor: pointer;
    }
    .cp-open:hover { background: #FCE7F3; }
    .cp-open.cp-open-hint { animation: cp-bob 1.4s ease-in-out infinite; }
    @keyframes cp-bob { 50% { transform: translateY(-3px); } }
    .gw-app .gw-pin-zone .gw-card-has-img > .cp-open { grid-column: 2; }
    svg.cp-inline { touch-action: none; cursor: crosshair; user-select: none; -webkit-user-select: none; }
    .cp-bar {
      display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.4rem;
      margin-top: 0.5rem;
    }
    .cp-bar .cp-crayon { padding: 0.35rem 0.75rem; font-size: 0.95rem; }
    .cp-bar .cp-undo { font-size: 1.1rem; padding: 0 0.8rem; }
    /* Màn ngang (hình ở cột phải): hộp bút xuống dòng theo bề rộng hình, không kéo rộng cột. */
    .gw-app .gw-pin-zone .gw-card-has-img > .cp-bar { grid-column: 2; width: 0; min-width: 100%; }
    .cp-overlay {
      position: fixed; inset: 0; z-index: 5000;
      background: rgba(15, 23, 42, 0.8);
      display: flex; align-items: center; justify-content: center; padding: 12px;
    }
    .cp-panel {
      background: #fff; border-radius: 1rem; box-shadow: 0 10px 40px rgba(0,0,0,.35);
      width: min(1100px, 100%); max-height: 100%; overflow: auto;
      padding: 0.8rem 1rem 1rem; display: flex; flex-direction: column; gap: 0.6rem;
    }
    .cp-head { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
    .cp-title { flex: 1 1 14rem; font: 600 0.85rem Quicksand, sans-serif; color: #64748B; }
    .cp-word { padding: 0 0.3em; border-radius: 0.35em; color: #fff; text-shadow: 0 1px 1px rgba(0,0,0,.35); white-space: nowrap; }
    .cp-rule {
      font: 700 1.1rem/1.45 Quicksand, sans-serif; color: #1E293B;
      background: #FFFBEB; border: 1.5px solid #FCD34D; border-radius: 0.75rem; padding: 0.5rem 0.9rem;
    }
    .cp-btn {
      flex: none; height: 2.2rem; padding: 0 0.9rem; border-radius: 1.1rem;
      border: 1.5px solid #CBD5E1; background: #fff; color: #1e293b;
      font: 700 0.9rem Quicksand, sans-serif; cursor: pointer;
    }
    .cp-btn:disabled { opacity: .45; cursor: default; }
    .cp-close { background: #10B981; border-color: #10B981; color: #fff; }
    .cp-crayons { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; }
    .cp-crayon {
      display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.9rem;
      border: 2px solid #cbd5e1; border-radius: 999px; background: #fff;
      font: 700 1rem Quicksand, sans-serif; color: #334155; cursor: pointer;
    }
    .cp-dot { width: 1.3rem; height: 1.3rem; border-radius: 50%; border: 2px solid #231F20; }
    .cp-crayon.cp-on { border-color: #F59E0B; box-shadow: 0 0 0 3px rgba(245, 158, 11, .35); transform: translateY(-2px); }
    .cp-figure svg { display: block; width: 100%; height: auto; max-height: 72vh; max-height: 72dvh; touch-action: none; cursor: crosshair; user-select: none; }
    .cp-svg * { pointer-events: none; }
    .cp-svg .cp-fillable { pointer-events: all; cursor: pointer; transition: fill .15s; }
    .cp-svg [data-gw-strokes] path { pointer-events: stroke; }
    .cp-svg.cp-erasing { cursor: cell; }
  `;
  document.head.appendChild(style);
}
