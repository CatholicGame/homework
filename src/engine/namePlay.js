/**
 * 🔤 Gọi tên (q.namePlay): bé chạm lên hình để gọi tên điểm, đỉnh, cạnh, đoạn thẳng, đường gấp khúc, ba điểm
 * thẳng hàng, cặp cạnh đối diện. Chạm tới đâu, tên bay xuống dải dưới hình và điền ngay vào ô trả lời tới đó (như
 * đồ dùng hình học, geoTools.js); bé vẫn sửa được, vẫn bấm Kiểm tra như thường. Kết quả giữ theo câu (MEMO).
 * Giọng đọc: mỗi lần chạm đọc tên ("đỉnh em-mờ"), lời nhắc, lời khen đọc cả câu; nút 🔊 tắt / bật (chung với
 * giọng của sách mầm non).
 *
 * q.namePlay = { shapes: [hình, …] }. Mỗi hình mở một lớp phủ:
 *   col      thứ tự hình trong hàng tiêu đề của bảng (nút "👆 Chạm" dưới hình); không có: hình của câu (q.img),
 *            nút dưới hình (button: chữ trên nút, mặc định "🔤 Gọi tên")
 *   img      ảnh (mặc định q.img); points: { A: [x, y] } theo viewBox của ảnh. Tên 'M2' hiện là M (hai hình
 *            chung một ảnh cùng tên điểm); viết tên nhiều điểm liền nhau: 'M2N2'.
 *   segs     các đoạn vẽ liền trên hình: ['AB', 'MP'] (đoạn MP đi qua N thì N nằm trên MP). Mặc định: cạnh của order.
 *   order    đa giác, các đỉnh đi vòng quanh hình: 'SAC' (cạnh SA, AC, CS)
 *   sample   hình mẫu: chạm thì máy làm mẫu một lượt, không điền gì
 *   tasks    các việc, làm lần lượt (tab trên đầu). Mặc định khi có order: đỉnh rồi cạnh (verts, sides).
 *     { kind: 'verts' | 'points', of?, fill }   chạm các đỉnh / các điểm (of: tên cần tìm, mặc định mọi điểm)
 *     { kind: 'sides', fill }                   chạm các cạnh (hoặc hai đỉnh liền nhau; đường chéo: báo không phải cạnh)
 *     { kind: 'segs', of: ['MN', …], given?, fill }  chạm đoạn thẳng, hoặc hai điểm cùng nằm trên một đoạn vẽ
 *     { kind: 'path', of: ['ABCD', …], fill }   chạm lần lượt các điểm dọc đường gấp khúc
 *     { kind: 'collinear', of: ['BND'], given?: ['ANC'], fill }  chạm ba điểm thẳng hàng
 *     { kind: 'opposite', poly: 'ABCD', of: ['AB DC', 'AD BC'], fill }  chạm hai cạnh không chung đỉnh
 *     fill: số thứ tự ô trống của câu, hoặc [hàng, cột] ô của bảng. given: tên đã in sẵn (mẫu), không điền.
 *     input: n  chỗ trống thứ n của ô (ô "tâm là ...; đường kính là ..."); inputs: [2, 3, 4] mỗi tên một chỗ trống.
 *     value: 'Đ'  tìm được of[0] thì điền chữ này (câu Đ, S); các tên khác trong of chỉ để không báo sai.
 *     tip: lời nhắc riêng của việc (đầu việc và khi chạm sai), vd. bán kính nối tâm với một điểm trên đường tròn.
 *     fills: [0, 1, 2] mỗi kết quả một ô, theo thứ tự tìm được; hoặc { I: 0, O: 2 } mỗi tên vào ô của nó. join: ' và ' nối mọi kết quả thẳng hàng vào một ô.
 *     fill: '#choice' + choice: n  câu khoanh: tìm được thì nháy đáp án thứ n (như đồ dùng hình học).
 *     title / row: chữ trên tab / đầu dòng kết quả (mặc định theo kind).
 *     Việc chỉ dùng một phần ảnh (hình a), hình b) cạnh nhau) thì khung nhìn phóng to phần đó.
 * shape.verts / shape.sides (Bài 19 Lớp 3): ô điền của hai việc mặc định.
 */

import { figureBox, fillBlanks } from './geoTools.js';
import { flyOne } from '../games/grade3Games/fly.js';
import { say as rawSay, stopSpeaking, isMuted, setMuted } from '../games/preschool/fx.js';
import { isEnglish } from './i18n.js';
import { speakableVi } from './letterNames.js';
import { audioCtx, playSfx } from './sfx.js';

const NS = 'http://www.w3.org/2000/svg';
const MEMO = new WeakMap();
const COL = { verts: '#7C3AED', points: '#7C3AED', sides: '#EA580C', segs: '#EA580C', path: '#0284C7', collinear: '#16A34A', opposite: '#DB2777' };
const PAIR_COL = ['#DB2777', '#0891B2', '#CA8A04', '#7C3AED'];
const KIND = {
  verts: { title: 'Chạm các <b>đỉnh</b>', row: 'Các đỉnh:', one: 'Đỉnh' },
  points: { title: 'Chạm các <b>điểm</b>', row: 'Các điểm:', one: 'Điểm' },
  sides: { title: 'Chạm các <b>cạnh</b>', row: 'Các cạnh:', one: 'Cạnh' },
  segs: { title: 'Chạm các <b>đoạn thẳng</b>', row: 'Đoạn thẳng:', one: 'Đoạn thẳng' },
  path: { title: 'Đi theo <b>đường gấp khúc</b>', row: 'Đường gấp khúc:', one: 'Đường gấp khúc' },
  collinear: { title: 'Chạm <b>3 điểm thẳng hàng</b>', row: 'Thẳng hàng:', one: 'Ba điểm' },
  opposite: { title: 'Chạm <b>2 cạnh đối diện</b>', row: 'Đối diện:', one: 'Cặp cạnh' },
};
const NUM = ['①', '②', '③', '④', '⑤', '⑥'];

const parse = (s) => (Array.isArray(s) ? s : String(s).match(/_?[A-Z]\d*/g) || []);
const shown = (n) => n.replace(/\d+$/, '');
const hidden = (n) => n.startsWith('_');
const nm = (arr) => arr.map(shown).join('');
// Giọng Việt: tên điểm đọc theo tên chữ cái (AB → a bê); bỏ thẻ HTML của lời nhắc.
const speak = (html, opts) => {
  const text = String(html).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
  if (text) rawSay(isEnglish() ? text : speakableVi(text), opts);
};

function el(tag, attrs = {}, parent) {
  const e = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  if (parent) parent.appendChild(e);
  return e;
}

// ── âm thanh ngắn ──
function tone(freqs, { gap = 0.09, dur = 0.2, vol = 0.16, type = 'sine' } = {}) {
  try {
    const actx = audioCtx();
    if (!actx) return;
    freqs.forEach((f, i) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = type;
      o.frequency.value = f;
      const t = actx.currentTime + i * gap;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(actx.destination);
      o.start(t);
      o.stop(t + dur + 0.02);
    });
  } catch { /* không có âm thanh */ }
}
const soundPick = (n) => playSfx('pop', { rate: 2 ** ((n % 6) * 2 / 12) }) || tone([523 + (n % 6) * 70], { dur: 0.15 });
const soundNo = () => playSfx('wrong') || tone([220, 180], { type: 'triangle', gap: 0.12, dur: 0.18, vol: 0.13 });
const soundStep = () => playSfx('correct') || tone([523, 659, 784], { gap: 0.09, dur: 0.25 });
const soundDone = () => playSfx('complete') || tone([523, 659, 784, 1046], { gap: 0.1, dur: 0.3 });

// ── chuẩn bị hình: điểm, đoạn vẽ, việc ──
const sidesOf = (order) => order.map((v, i) => [v, order[(i + 1) % order.length]]);
function prep(shape, q) {
  const P = shape.points;
  const order = shape.order ? parse(shape.order) : null;
  const sideList = order ? sidesOf(order) : [];
  const segs = shape.segs ? shape.segs.map(parse) : sideList;
  const raw = shape.tasks || (order ? [{ kind: 'verts', fill: shape.verts }, { kind: 'sides', fill: shape.sides }] : []);
  const tasks = raw.map((t) => {
    let of;
    if (t.kind === 'verts') of = (t.of ? parse(t.of) : order).map((v) => [v]);
    else if (t.kind === 'points') of = (t.of ? parse(t.of) : Object.keys(P).filter((n) => !hidden(n))).map((v) => [v]);
    else if (t.kind === 'sides') of = sideList;
    else if (t.kind === 'opposite') of = t.of.map((p) => p.split(/\s+/).map(parse));
    else of = (t.of || []).map(parse);
    const sides = t.kind === 'opposite' ? sidesOf(parse(t.poly)) : null;
    return { ...t, of, sides, given: (t.given || []).map(parse) };
  });
  return { img: shape.img || q.img, P, order, sideList, segs, tasks };
}

// hình học nhỏ
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const len = (a) => Math.hypot(a[0], a[1]);
/** Điểm p nằm trên đoạn ab (lệch tối đa tol đơn vị hình); trả về vị trí t (0 → 1) hoặc null. */
function onSeg(p, a, b, tol) {
  const ab = sub(b, a), ap = sub(p, a);
  const L = len(ab);
  if (!L) return null;
  const t = dot(ap, ab) / (L * L);
  if (t < -0.02 || t > 1.02) return null;
  const d = Math.abs(ab[0] * ap[1] - ab[1] * ap[0]) / L;
  return d <= tol ? t : null;
}
const keyOf = (arr) => [...arr].sort().join('|');
const itemKey = (kind, it) => (kind === 'opposite' ? it.map(keyOf).sort().join('#') : keyOf(it));
const sameItem = (kind, a, b) => (kind === 'path'
  ? a.join('|') === b.join('|') || a.join('|') === [...b].reverse().join('|')
  : itemKey(kind, a) === itemKey(kind, b));
const sameSide = (a, b) => keyOf(a) === keyOf(b);

// đồ dùng khác trên cùng hình: khi đó gọi tên vẫn là nút + lớp phủ
const OTHER_TOOLS = ['geoPlay', 'ekePlay', 'rulerPlay', 'countPlay', 'areaPlay', 'pairPlay', 'perimPlay', 'drawPlay', 'balancePlay', 'pourPlay', 'tapCount', 'paint'];

// ── nút ──
export function attachNamePlay(root, q) {
  const cfg = q.namePlay;
  if (!cfg) return;
  injectStyles();
  const heads = [...root.querySelectorAll('#gw-table thead img')];
  const own = [];
  cfg.shapes.forEach((shape) => {
    if (shape.col != null) {
      const img = heads[shape.col];
      const th = img?.closest('th');
      if (!th) return;
      th.classList.add('np-th');
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `np-open${shape.sample ? ' np-open-sample' : ''}`;
      b.textContent = shape.sample ? '👀 Mẫu' : '👆 Chạm';
      b.title = shape.sample ? 'Xem mẫu' : 'Chạm lên hình để gọi tên';
      th.appendChild(b);
      const open = () => openNamePlay(root, q, shape);
      b.onclick = open;
      img.classList.add('np-img');
      img.addEventListener('click', (e) => { e.stopPropagation(); open(); });
    } else own.push(shape);
  });
  if (!own.length) return;
  const img = root.querySelector('.e3-question-card > img.e3-q-img');
  if (!img) return;
  // hình chỉ có việc gọi tên: bé chạm thẳng lên hình của câu, không phải mở lớp phủ
  if (own.length === 1 && !OTHER_TOOLS.some((k) => q[k]) && !/tô\s+màu/i.test(q.q || '') && !img.parentElement.querySelector(':scope > .gt-row')) {
    openNamePlay(root, q, own[0], img);
    return;
  }
  // hình có đồ dùng khác: nút dưới hình (cùng hàng với đồ dùng hình học nếu có), mở lớp phủ
  let row = img.parentElement.querySelector(':scope > .gt-row');
  if (!row) {
    row = document.createElement('div');
    row.className = 'np-btnrow';
    let at = img;
    while (at.nextElementSibling?.matches('.e3-orig-toggle, .gp-open, .cp-open')) at = at.nextElementSibling;
    at.after(row);
  }
  own.forEach((shape) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'np-open np-open-img';
    b.textContent = shape.button || '🔤 Gọi tên';
    b.onclick = () => openNamePlay(root, q, shape);
    row.appendChild(b);
  });
}

const memoOf = (q, shape, n) => {
  let m = MEMO.get(q);
  if (!m) MEMO.set(q, (m = new Map()));
  if (!m.has(shape)) m.set(shape, Array.from({ length: n }, () => []));
  return m.get(shape);
};

/** Ô của bảng: ghi chữ (bỏ qua nếu ô đã khoá). Trả về ô vừa đổi. */
function fillCell(root, [r, c], text) {
  const inp = root.querySelector(`.gw-table-input[data-r="${r}"][data-c="${c}"]`);
  if (!inp || inp.disabled || inp.value === text) return null;
  inp.value = text;
  inp.dispatchEvent(new Event('input', { bubbles: true }));
  return inp;
}
function clearFill(root, fill) {
  if (fill === '#choice') { root.querySelectorAll('.e3-option.gt-suggest').forEach((o) => o.classList.remove('gt-suggest')); return; }
  const inputs = Array.isArray(fill)
    ? [root.querySelector(`.gw-table-input[data-r="${fill[0]}"][data-c="${fill[1]}"]`)]
    : fill == null ? [] : [...root.querySelectorAll(`.e3-blank-input[data-idx="${fill}"]`)];
  inputs.forEach((inp) => {
    if (inp && !inp.disabled && inp.value && !inp.classList.contains('gw-ds-input')) { inp.value = ''; inp.dispatchEvent(new Event('input', { bubbles: true })); }
  });
}

/**
 * Mở việc gọi tên của một hình. inlineImg: hình của câu (<img>) → làm thẳng trên hình đó: hình được thay bằng SVG
 * cùng cỡ (ảnh cũ ẩn đi, vẫn dùng cho "📷 Ảnh gốc"), dải việc + lời nhắc nằm ngay dưới hình, không có lớp phủ.
 */
export function openNamePlay(root, q, shape, inlineImg = null) {
  injectStyles();
  const inline = !!inlineImg;
  const S = prep(shape, q);
  const { P, tasks } = S;
  const sample = !!shape.sample;
  const memo = sample ? tasks.map(() => []) : memoOf(q, shape, tasks.length);
  const filled = new Set();

  const steps = tasks.map((t, i) => `<button type="button" class="np-step" data-s="${i}">${tasks.length > 1 ? `${NUM[i]} ` : ''}${t.title || KIND[t.kind].title}</button>`).join('');
  const rows = tasks.map((t, i) => `<div class="np-row" data-s="${i}"><span class="np-lbl" style="--c:${COL[t.kind]}">${t.row || KIND[t.kind].row}</span><span class="np-chips"></span></div>`).join('');
  const overlay = document.createElement('div');
  if (inline) {
    // kết quả điền thẳng vào ô trả lời ngay dưới, nên không cần dải tên (np-rows ẩn)
    overlay.className = 'np-inline';
    overlay.innerHTML = `
      <div class="np-ihead">
        <div class="np-steps">${steps}</div>
        <button type="button" class="np-mute" title="Tắt / bật giọng đọc"></button>
        <button type="button" class="np-reset" title="Làm lại">↺</button>
      </div>
      <div class="np-say np-show"><span>&nbsp;</span></div>
      <div class="np-rows" hidden>${rows}</div>`;
    const svgEl = el('svg', { class: `${inlineImg.className} np-inline-svg`, preserveAspectRatio: 'xMidYMid meet', role: 'img', 'aria-label': inlineImg.alt || 'Hình' });
    inlineImg.before(svgEl);
    inlineImg.classList.add('np-hide');
    (inlineImg.nextElementSibling?.classList.contains('e3-orig-toggle') ? inlineImg.nextElementSibling : inlineImg).after(overlay);
    // "📷 Ảnh gốc" (lightbox.js) đổi ảnh <img>: đang xem ảnh gốc thì hiện ảnh, ẩn hình chạm
    new MutationObserver(() => {
      const orig = inlineImg.dataset.showingOrig === '1';
      inlineImg.classList.toggle('np-hide', !orig);
      svgEl.classList.toggle('np-hide', orig);
      overlay.classList.toggle('np-hide', orig);
    }).observe(inlineImg, { attributes: true, attributeFilter: ['data-showing-orig'] });
  } else overlay.className = 'np-overlay';
  if (!inline) overlay.innerHTML = `
    <div class="np-panel" role="dialog" aria-label="Gọi tên trên hình">
      <div class="np-head">
        <div class="np-steps">${steps}</div>
        <button type="button" class="np-mute" title="Tắt / bật giọng đọc"></button>
        <button type="button" class="np-close">✓ Xong</button>
      </div>
      <div class="np-stage">
        <svg class="np-svg" preserveAspectRatio="xMidYMid meet"></svg>
        <div class="np-say"><span>&nbsp;</span></div>
      </div>
      <div class="np-bar">
        <div class="np-rows">${rows}</div>
        <button type="button" class="np-reset" title="Làm lại" ${sample ? 'hidden' : ''}>↺</button>
      </div>
    </div>`;
  if (!inline) document.body.appendChild(overlay);
  const svg = inline ? inlineImg.previousElementSibling : overlay.querySelector('.np-svg');
  const sayBox = overlay.querySelector('.np-say');
  const chipsOf = (i) => overlay.querySelector(`.np-row[data-s="${i}"] .np-chips`);
  const timers = new Set();
  const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); if (overlay.isConnected) fn(); }, ms); timers.add(t); };
  let raf = 0;

  const close = () => {
    timers.forEach(clearTimeout);
    cancelAnimationFrame(raf);
    stopSpeaking();
    overlay.remove();
    document.removeEventListener('keydown', onKey);
    filled.forEach((e) => { e.classList.remove('np-filled'); void e.offsetWidth; e.classList.add('np-filled'); });
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  if (!inline) {
    document.addEventListener('keydown', onKey);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('.np-close').onclick = close;
  }
  overlay.querySelectorAll('.np-step').forEach((b) => { b.onclick = () => { if (!sample) setTask(+b.dataset.s); }; });

  const muteBtn = overlay.querySelector('.np-mute');
  const paintMute = () => { muteBtn.textContent = isMuted() ? '🔇' : '🔊'; };
  paintMute();
  muteBtn.onclick = () => { setMuted(!isMuted()); paintMute(); if (!isMuted()) speak(sayBox.textContent); };
  /** Lời nhắc trên hình, đọc to luôn. `voice`: câu đọc khác chữ hiện (ngắn hơn khi bé chạm nhanh); false = không đọc. */
  const say = (html, cls = '', { voice, queue = false } = {}) => {
    sayBox.className = `np-say${html ? ' np-show' : ''} ${cls}`;
    sayBox.innerHTML = `<span>${html || '&nbsp;'}</span>`;
    if (voice !== false && (voice ?? html)) speak(voice ?? html, { queue });
  };
  // trên hình của câu (nhỏ hơn lớp phủ): chấm, nét, nhãn nhỏ lại một chút
  const ppu = () => (svg.getScreenCTM()?.a || 1) / (inline ? 0.72 : 1);
  // nhóm ngoài mang translate; hiệu ứng nảy chạy ở nhóm trong (.np-in) không có transform, để tâm phóng là
  // chính điểm đó (CSS scale trên thẻ có transform="translate…" phóng quanh gốc SVG, hình bay ra xa)
  const screenAt = (at, parent, attrs = {}) => {
    const g = el('g', attrs, parent);
    g.setAttribute('transform', `translate(${at[0]} ${at[1]}) scale(${1 / ppu()})`);
    return el('g', { class: 'np-in' }, g);
  };
  const bump = (g) => { const i = g.querySelector('.np-in') || g; i.classList.remove('np-bump'); void i.getBBox(); i.classList.add('np-bump'); };
  const toScreen = (pt) => {
    const m = svg.getScreenCTM();
    return { left: m.a * pt[0] + m.c * pt[1] + m.e, top: m.b * pt[0] + m.d * pt[1] + m.f };
  };
  const mid = (a, b) => [(P[a][0] + P[b][0]) / 2, (P[a][1] + P[b][1]) / 2];

  let box = null;
  let tol = 6;
  let cur = 0;
  let sel = []; // điểm vừa chạm của việc đang làm (cạnh, đoạn, đường gấp khúc, thẳng hàng)
  let selSide = null; // cặp cạnh đối diện: cạnh vừa chạm
  let L = null;
  let area = null; // phần ảnh đang phóng to (null: cả ảnh)
  const ptOrder = Object.keys(P);
  const ptEl = (v) => L.pts.querySelector(`[data-v="${v}"]`);

  // ── hình học trên các đoạn vẽ ──
  /** Đoạn vẽ chứa cả các điểm (null nếu không có). */
  const lineWith = (...ns) => S.segs.find(([a, b]) => ns.every((n) => onSeg(P[n], P[a], P[b], tol) != null)) || null;
  /** x, y liền nhau trên một đoạn vẽ (không có điểm có tên nào nằm giữa). */
  const adjacent = (x, y) => {
    const s = lineWith(x, y);
    if (!s) return false;
    const [a, b] = s;
    const tx = onSeg(P[x], P[a], P[b], tol), ty = onSeg(P[y], P[a], P[b], tol);
    return !ptOrder.some((n) => {
      if (n === x || n === y) return false;
      const t = onSeg(P[n], P[a], P[b], tol);
      return t != null && t > Math.min(tx, ty) + 0.01 && t < Math.max(tx, ty) - 0.01;
    });
  };
  const canon = (pair) => [...pair].sort((a, b) => ptOrder.indexOf(a) - ptOrder.indexOf(b));

  // ── khung nhìn theo việc: việc chỉ ở một phần ảnh (hình a), hình b)) thì phóng to phần đó ──
  function areaOf(t) {
    if (inline) return null; // hình của câu giữ nguyên khung, không phóng to
    const names = [...new Set([...t.of.flat(2), ...t.given.flat()])].filter((n) => P[n]);
    if (names.length < 2 || names.length === ptOrder.length) return null;
    const xs = names.map((n) => P[n][0]), ys = names.map((n) => P[n][1]);
    const r = { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
    const m = Math.max(r.w, r.h, box.w * 0.15) * 0.22;
    const R = { x: r.x - m, y: r.y - m, w: r.w + 2 * m, h: r.h + 2 * m };
    // phóng to khi phần đó to lên ít nhất 1,3 lần trên khung hình thật
    const st = svg.getBoundingClientRect();
    if (!st.width) return null;
    const fit = (w, h) => Math.min(st.width / w, st.height / h);
    return fit(R.w, R.h) / fit(box.w, box.h) >= 1.3 ? R : null;
  }
  const vbOf = (R) => { if (inline) return [R.x, R.y, R.w, R.h]; const pad = Math.max(R.w, R.h) * 0.05; return [R.x - pad, R.y - pad, R.w + 2 * pad, R.h + 2 * pad]; };
  function zoomTo(R, then) {
    const target = vbOf(R);
    const from = svg.getAttribute('viewBox')?.split(/\s+/).map(Number);
    cancelAnimationFrame(raf);
    if (!from || from.every((v, i) => Math.abs(v - target[i]) < 0.5)) { svg.setAttribute('viewBox', target.join(' ')); then(); return; }
    const t0 = performance.now(), ms = 380;
    const step = () => {
      const u = Math.min(1, (performance.now() - t0) / ms);
      const e = u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2;
      svg.setAttribute('viewBox', from.map((v, i) => v + (target[i] - v) * e).join(' '));
      if (u < 1) raf = requestAnimationFrame(step); else then();
    };
    raf = requestAnimationFrame(step);
  }

  // ── vẽ: ảnh, vùng chạm, dấu đã tìm (vẽ lại khi đổi việc / khung nhìn: chữ, chấm theo px màn hình) ──
  function build() {
    svg.replaceChildren();
    const image = el('image', { href: S.img, x: box.x, y: box.y, width: box.w, height: box.h, preserveAspectRatio: 'none' }, svg);
    // phóng to một phần: chỉ hiện phần đó (hình bên cạnh không lấn vào, không có chấm chạm)
    const inArea = (v) => !area || (P[v][0] >= area.x && P[v][0] <= area.x + area.w && P[v][1] >= area.y && P[v][1] <= area.y + area.h);
    if (area) {
      const clip = el('clipPath', { id: 'np-clip' }, el('defs', {}, svg));
      el('rect', { x: area.x, y: area.y, width: area.w, height: area.h }, clip);
      image.setAttribute('clip-path', 'url(#np-clip)');
    }
    L = { found: el('g', {}, svg), live: el('g', {}, svg), segs: el('g', {}, svg), pts: el('g', {}, svg), top: el('g', {}, svg) };
    const t = tasks[cur];
    const k = 1 / ppu();
    const segList = t.kind === 'opposite' ? t.sides : S.segs;
    segList.filter((s) => s.every(inArea)).forEach((s) => {
      const [a, b] = s;
      const g = el('g', { class: 'np-seg', 'data-s': keyOf(s) }, L.segs);
      el('line', { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], class: 'np-seg-hit', 'stroke-width': 34 * k }, g);
      el('line', { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], class: 'np-seg-line', 'stroke-width': 9 * k }, g);
      g.addEventListener('click', (e) => tapSeg(s, e));
    });
    ptOrder.filter((n) => !hidden(n) && inArea(n)).forEach((v) => {
      const inner = screenAt(P[v], L.pts, { class: 'np-vert', 'data-v': v });
      el('circle', { r: 28, class: 'np-vert-hit' }, inner);
      el('circle', { r: 15, class: 'np-vert-ring' }, inner);
      el('circle', { r: 7, class: 'np-vert-dot' }, inner);
      inner.parentNode.addEventListener('click', (e) => { e.stopPropagation(); tapPoint(v); });
    });
    memo[cur].forEach((it, i) => mark(t, it, i, false));
    // các đỉnh / điểm đã tìm ở việc chạm điểm vẫn tô đặc khi sang việc khác
    tasks.forEach((x, i) => { if (i !== cur && (x.kind === 'verts' || x.kind === 'points')) memo[i].forEach(([v]) => ptEl(v)?.classList.add('np-got')); });
  }

  /** Dấu một kết quả trên hình (anim: vừa tìm được). */
  function mark(t, it, i, anim = true) {
    const k = 1 / ppu();
    const c = COL[t.kind];
    if (t.kind === 'verts' || t.kind === 'points') {
      const g = ptEl(it[0]);
      g?.classList.add('np-got');
      if (anim && g) bump(g);
      return;
    }
    if (t.kind === 'path') {
      el('polyline', { points: it.map((n) => P[n].join(',')).join(' '), class: `np-path${anim ? ' np-path-in' : ''}`, stroke: c, 'stroke-width': 9 * k, 'stroke-opacity': 0.6 }, L.found);
      return;
    }
    if (t.kind === 'collinear') {
      const [a, , b] = [...it].sort((x, y) => P[x][0] - P[y][0] || P[x][1] - P[y][1]);
      el('line', { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], stroke: c, 'stroke-width': 9 * k, 'stroke-linecap': 'round', 'stroke-opacity': 0.75, class: anim ? 'np-path-in' : '' }, L.found);
      it.forEach((n) => ptEl(n)?.classList.add('np-got-g'));
      return;
    }
    if (t.kind === 'opposite') {
      // hai cạnh cùng màu, mỗi cặp một màu; tên cạnh ở giữa, đẩy ra ngoài hình
      const pc = PAIR_COL[i % PAIR_COL.length];
      const poly = parse(t.poly);
      const cen = poly.reduce((s, n) => [s[0] + P[n][0] / poly.length, s[1] + P[n][1] / poly.length], [0, 0]);
      it.forEach(([a, b]) => {
        el('line', { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], stroke: pc, 'stroke-width': 9 * k, 'stroke-linecap': 'round', class: anim ? 'np-path-in' : '' }, L.found);
        const m = mid(a, b), out = sub(m, cen), d = len(out) || 1;
        tag([m[0] + (out[0] / d) * 30 * k, m[1] + (out[1] / d) * 30 * k], nm([a, b]), pc, anim);
      });
      return;
    }
    // cạnh / đoạn thẳng: tô đậm, tên ở giữa, đẩy ra một bên (các đoạn chồng lên nhau thì đẩy xa dần)
    const [a, b] = it;
    el('line', { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], stroke: c, 'stroke-width': 9 * k, 'stroke-linecap': 'round', class: anim ? 'np-path-in' : '' }, L.found);
    const m = mid(a, b);
    let out;
    if (S.order && t.kind === 'sides') {
      const cen = S.order.reduce((s, n) => [s[0] + P[n][0] / S.order.length, s[1] + P[n][1] / S.order.length], [0, 0]);
      out = sub(m, cen);
    } else {
      const d = sub(P[b], P[a]);
      out = [d[1], -d[0]];
      if (out[1] > 0) out = [-out[0], -out[1]]; // nhãn lên phía trên
    }
    const d = len(out) || 1;
    const line = lineWith(a, b);
    const same = memo[cur].slice(0, i).filter((x) => lineWith(...x) === line).length;
    const off = 34 + same * 40;
    tag([m[0] + (out[0] / d) * off * k, m[1] + (out[1] / d) * off * k], nm([a, b]), c, anim);
  }
  function tag(at, text, c, anim) {
    const g = screenAt(at, L.top, { class: 'np-tag' });
    if (anim) g.classList.add('np-tag-in');
    const w = 18 + text.length * 13;
    el('rect', { x: -w / 2, y: -17, width: w, height: 34, rx: 17, fill: '#fff', stroke: c, 'stroke-width': 3 }, g);
    el('text', { y: 7.5, class: 'np-tagtext', fill: c }, g).textContent = text;
  }

  const chipText = (t, it) => (t.kind === 'collinear' ? it.map(shown).join(', ') : t.kind === 'opposite' ? it.map(nm).join(' và ') : nm(it));
  const chipCol = (t, i) => (t.kind === 'opposite' ? PAIR_COL[i % PAIR_COL.length] : COL[t.kind]);
  function paintChips(i) {
    const t = tasks[i];
    chipsOf(i).innerHTML = memo[i].length ? memo[i].map((it, j) => `<span class="np-chip" style="--c:${chipCol(t, j)}">${chipText(t, it)}</span>`).join('') : '<span class="np-chip np-empty">chưa có</span>';
  }
  function valueOf(t, list, cell) {
    if (t.kind === 'verts' || t.kind === 'points') return list.map(([v]) => shown(v)).join(', ');
    if (t.kind === 'collinear') {
      const xs = list.map((it) => it.map(shown).join(', '));
      return cell ? xs.join('; ') : t.join ? xs.join(t.join) : xs;
    }
    if (t.kind === 'opposite') {
      const xs = list.flatMap((it) => it.map(nm));
      return cell ? xs.join(', ') : xs;
    }
    return list.map(nm).join(', ');
  }
  function fill(i) {
    const t = tasks[i];
    if (sample || !memo[i].length) return;
    // mỗi kết quả một ô (bộ ba thứ nhất vào ô fills[0], …)
    // hoặc theo tên: { I: 0, O: 2, IA: 1, IB: 1 } (các tên cùng ô nối bằng dấu phẩy, theo thứ tự của of)
    if (t.fills) {
      const xs = memo[i].map((it) => chipText(t, it));
      const vals = {};
      if (Array.isArray(t.fills)) t.fills.slice(0, xs.length).forEach((b, k) => { vals[b] = xs[k]; });
      else t.of.map((it) => chipText(t, it)).filter((x) => xs.includes(x) && t.fills[x] != null).forEach((x) => { const b = t.fills[x]; vals[b] = vals[b] ? `${vals[b]}, ${x}` : x; });
      fillBlanks(root, vals).forEach((e) => filled.add(e));
      return;
    }
    if (t.fill == null) return;
    // ô có nhiều chỗ trống: input = chỗ trống thứ mấy (cả danh sách vào đó); inputs = mỗi tên một chỗ trống
    if (t.input != null || t.inputs) {
      const v = t.value ?? valueOf(t, memo[i], true);
      const slots = [];
      if (t.inputs) (Array.isArray(v) ? v : String(v).split(/\s*[,;]\s*/)).forEach((x, k) => { if (k < t.inputs.length) slots[t.inputs[k]] = x; });
      else slots[t.input] = Array.isArray(v) ? v.join(', ') : v;
      fillBlanks(root, { [t.fill]: slots }).forEach((e) => filled.add(e));
      return;
    }
    // value: chữ cố định khi làm xong việc (vd. 'Đ' cho "Ba điểm C, D, E thẳng hàng")
    if (t.value != null) { if (memo[i].some((it) => sameItem(t.kind, it, t.of[0]))) fillBlanks(root, { [t.fill]: t.value }).forEach((e) => filled.add(e)); return; }
    // câu khoanh: tìm được thì nháy đáp án t.choice
    if (t.fill === '#choice') { fillBlanks(root, { '#choice': t.choice }).forEach((e) => filled.add(e)); return; }
    if (Array.isArray(t.fill)) { const e = fillCell(root, t.fill, valueOf(t, memo[i], true)); if (e) filled.add(e); return; }
    fillBlanks(root, { [t.fill]: valueOf(t, memo[i], false) }).forEach((e) => filled.add(e));
  }
  /** Tên bay từ hình xuống dải dưới; chip hiện khi tên tới nơi. */
  function flyName(i, text, from, c) {
    if (inline) { paintChips(i); return; }
    const host = chipsOf(i);
    host.querySelector('.np-empty')?.remove();
    const chip = document.createElement('span');
    chip.className = 'np-chip';
    chip.style.setProperty('--c', c);
    chip.textContent = text;
    chip.style.visibility = 'hidden';
    host.appendChild(chip);
    const to = chip.getBoundingClientRect();
    const fr = { left: from.left - to.width / 2, top: from.top - to.height / 2, width: to.width, height: to.height };
    const ms = flyOne(`<span class="np-chip np-fly" style="--c:${c}">${text}</span>`, fr, to, { minMs: 380, maxMs: 650 });
    later(() => { chip.style.visibility = ''; chip.classList.add('np-pop'); }, ms);
  }

  const need = (t) => t.of.filter((x) => !t.given.some((g) => sameItem(t.kind, x, g)));
  const doneTask = (i) => need(tasks[i]).every((x) => memo[i].some((y) => sameItem(tasks[i].kind, x, y)));

  /** Ghi một kết quả của việc đang làm. */
  function record(it, fromPt) {
    const t = tasks[cur];
    let txt = chipText(t, it);
    if (t.given.some((g) => sameItem(t.kind, g, it))) {
      soundNo();
      say(`<b>${txt}</b> đã viết sẵn rồi (mẫu). Tìm cái khác.`, 'np-ask');
      return;
    }
    if (memo[cur].some((x) => sameItem(t.kind, x, it))) {
      soundNo();
      say(`<b>${txt}</b> em đã tìm rồi.`, 'np-ask');
      return;
    }
    const ref = t.of.find((x) => sameItem(t.kind, x, it));
    if (!ref) {
      soundNo();
      say(`<b>${txt}</b> chưa đúng yêu cầu của câu này.${t.tip ? ` ${t.tip}` : ''}`, 'np-bad');
      return;
    }
    // ghi theo cách viết của sách (BCDE chứ không EDCB, QM chứ không MQ)
    it = ref;
    txt = chipText(t, it);
    memo[cur].push(it);
    const n = memo[cur].length;
    soundPick(n);
    mark(t, it, n - 1);
    flyName(cur, txt, toScreen(fromPt), chipCol(t, n - 1));
    fill(cur);
    paintSteps();
    const left = need(t).length - n;
    if (left > 0) {
      say(`<b>${txt}</b>. ${t.kind === 'sides' ? `Cạnh nối đỉnh ${shown(it[0])} với đỉnh ${shown(it[1])}. ` : ''}Còn ${left} nữa.`, 'np-good', { voice: `${KIND[t.kind].one} ${txt}.` });
      return;
    }
    const next = tasks.findIndex((_, i) => !doneTask(i));
    (next < 0 ? soundDone : soundStep)();
    say(doneLine(cur), 'np-good');
    if (next >= 0) later(() => setTask(next, { queue: true }), 1500);
  }
  function doneLine(i) {
    const t = tasks[i];
    const list = memo[i].map((it) => chipText(t, it)).join('; ');
    if (t.kind === 'verts') return `Hình có <b>${t.of.length} đỉnh</b>: ${list}.`;
    if (t.kind === 'sides') return `Xong! Hình có <b>${t.of.length} cạnh</b>: ${list}.`;
    if (t.kind === 'points') return `Có <b>${t.of.length} điểm</b>: ${list}.`;
    if (t.kind === 'collinear') return `Ba điểm thẳng hàng: <b>${list}</b>.`;
    if (t.kind === 'opposite') return `Các cặp cạnh đối diện: <b>${list}</b>.`;
    return `Xong: <b>${list}</b>.`;
  }

  // ── chạm điểm ──
  function tapPoint(v) {
    const t = tasks[cur];
    if (t.kind === 'verts' || t.kind === 'points') {
      if (!t.of.some(([x]) => x === v)) { soundNo(); say(t.tip ? `<b>${shown(v)}</b> chưa đúng. ${t.tip}` : `<b>${shown(v)}</b> không thuộc hình này.`, 'np-bad'); return; }
      record([v], P[v]);
      return;
    }
    if (t.kind === 'opposite') {
      soundNo();
      say('Chạm vào <b>các cạnh</b> của hình.', 'np-ask');
      return;
    }
    if (sel.includes(v)) {
      // chạm lại điểm vừa chọn: bỏ chọn cả lượt
      if (t.kind !== 'path' || sel[sel.length - 1] === v) { clearSel(); say('', '', { voice: false }); return; }
      soundNo();
      say(`Đường gấp khúc không đi qua <b>${shown(v)}</b> hai lần.`, 'np-bad');
      return;
    }
    if (t.kind === 'path' && sel.length && !adjacent(sel[sel.length - 1], v)) {
      soundNo();
      flashDiag(sel[sel.length - 1], v);
      say(`Từ <b>${shown(sel[sel.length - 1])}</b> không có đoạn thẳng đi thẳng tới <b>${shown(v)}</b>. Đi theo nét vẽ.`, 'np-bad');
      return;
    }
    sel.push(v);
    ptEl(v)?.classList.add('np-sel');
    soundPick(sel.length);
    drawLive();
    if (t.kind === 'sides' || t.kind === 'segs') {
      if (sel.length < 2) { say(`Điểm <b>${shown(v)}</b>. Chạm điểm ở đầu kia.`, 'np-ask', { voice: `${shown(v)}.` }); return; }
      const [a, b] = sel;
      clearSel();
      if (t.kind === 'sides') {
        const s = S.sideList.find(([x, y]) => (x === a && y === b) || (x === b && y === a));
        if (s) { record(s, mid(...s)); return; }
        soundNo();
        flashDiag(a, b);
        say(`<b>${nm([a, b])}</b> không phải cạnh: nó đi xuyên qua giữa hình. Cạnh là đường viền nối hai đỉnh <b>liền nhau</b>.`, 'np-bad');
        return;
      }
      if (lineWith(a, b)) { const s = canon([a, b]); record(s, mid(...s)); return; }
      soundNo();
      flashDiag(a, b);
      say(`Không có đoạn thẳng nào nối <b>${shown(a)}</b> với <b>${shown(b)}</b> trên hình.`, 'np-bad');
      return;
    }
    if (t.kind === 'collinear') {
      if (sel.length < 3) { say(`Đã chọn <b>${sel.map(shown).join(', ')}</b>. Chạm thêm ${3 - sel.length} điểm.`, 'np-ask', { voice: `${shown(v)}.` }); return; }
      const trio = [...sel];
      clearSel();
      if (lineWith(...trio)) { record(trio, P[trio[1]]); return; }
      soundNo();
      flashDiag(trio[0], trio[2]);
      say(`<b>${trio.map(shown).join(', ')}</b> không cùng nằm trên một đường thẳng nên không thẳng hàng.`, 'np-bad');
      return;
    }
    // đường gấp khúc: đi tới đâu nét cam hiện tới đó; khớp một đường cần tìm thì ghi
    const hit = t.of.find((x) => sameItem('path', x, sel));
    if (hit) { const it = [...sel]; clearSel(); record(it, P[it[it.length - 1]]); return; }
    if (sel.length >= Math.max(...t.of.map((x) => x.length))) {
      const name = nm(sel);
      clearSel();
      soundNo();
      say(`<b>${name}</b> chưa đúng yêu cầu. Chạm lại từ điểm đầu.`, 'np-bad');
      return;
    }
    say(`Đang đi: <b>${nm(sel)}</b>…`, 'np-ask', { voice: `${shown(v)}.` });
  }
  function clearSel() {
    sel.forEach((n) => ptEl(n)?.classList.remove('np-sel'));
    sel = [];
    drawLive();
  }
  function drawLive() {
    L.live.querySelectorAll('.np-live').forEach((x) => x.remove());
    if (sel.length < 2) return;
    el('polyline', { points: sel.map((n) => P[n].join(',')).join(' '), class: 'np-live', 'stroke-width': 9 / ppu() }, L.live);
  }
  function flashDiag(a, b) {
    const ln = el('line', { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], class: 'np-diag', 'stroke-width': 6 / ppu() }, L.live);
    later(() => ln.remove(), 1600);
  }

  // ── chạm đoạn vẽ ──
  /**
   * Đoạn vẽ có điểm có tên ở giữa (đường kính MN qua tâm O): cả đoạn không phải đoạn cần tìm mà khúc giữa hai
   * điểm liền nhau chỗ bé chạm là đoạn cần tìm (bán kính OM) thì ghi khúc đó.
   */
  function pieceOf(t, s, e) {
    const whole = canon(s);
    if (!e || t.of.some((x) => sameItem(t.kind, x, whole))) return whole;
    const m = svg.getScreenCTM();
    if (!m) return whole;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    const [a, b] = s;
    const on = ptOrder.map((n) => [n, onSeg(P[n], P[a], P[b], tol)]).filter(([, u]) => u != null).sort((x, y) => x[1] - y[1]);
    const u = onSeg([pt.x, pt.y], P[a], P[b], Infinity);
    if (u == null) return whole;
    for (let i = 0; i + 1 < on.length; i++) {
      if (u >= on[i][1] && u <= on[i + 1][1]) {
        const piece = canon([on[i][0], on[i + 1][0]]);
        return t.of.some((x) => sameItem(t.kind, x, piece)) ? piece : whole;
      }
    }
    return whole;
  }
  function tapSeg(s, e) {
    const t = tasks[cur];
    if (t.kind === 'verts' || t.kind === 'points') {
      soundNo();
      say(t.kind === 'verts' ? 'Đỉnh là <b>điểm ở góc</b> của hình. Chạm vào chấm tròn.' : 'Chạm vào <b>chấm tròn</b> của mỗi điểm.', 'np-ask');
      L.pts.querySelectorAll('.np-vert:not(.np-got)').forEach(bump);
      return;
    }
    if (t.kind === 'sides') { clearSel(); record(s, mid(...s)); return; }
    if (t.kind === 'segs') { clearSel(); const c = pieceOf(t, s, e); record(c, mid(...c)); return; }
    if (t.kind === 'opposite') { tapOpposite(s); return; }
    soundNo();
    say('Chạm vào <b>các điểm</b> (chấm tròn).', 'np-ask');
    L.pts.querySelectorAll('.np-vert').forEach(bump);
  }
  // cặp cạnh đối diện: chạm cạnh thứ nhất (sáng lên), chạm cạnh thứ hai
  function tapOpposite(s) {
    const segEl = (x) => L.segs.querySelector(`[data-s="${keyOf(x)}"]`);
    if (!selSide) {
      selSide = s;
      segEl(s)?.classList.add('np-seg-sel');
      soundPick(1);
      say(`Cạnh <b>${nm(s)}</b>. Chạm cạnh đối diện với nó.`, 'np-ask', { voice: `Cạnh ${nm(s)}.` });
      return;
    }
    const a = selSide;
    segEl(a)?.classList.remove('np-seg-sel');
    selSide = null;
    if (sameSide(a, s)) { say('', '', { voice: false }); return; }
    const common = a.find((n) => s.includes(n));
    if (common) {
      soundNo();
      say(`<b>${nm(a)}</b> và <b>${nm(s)}</b> có chung đỉnh <b>${shown(common)}</b>: đó là hai cạnh <b>kề nhau</b>. Hai cạnh đối diện không có chung đỉnh nào.`, 'np-bad');
      return;
    }
    const m = mid(...a), m2 = mid(...s);
    record([a, s], [(m[0] + m2[0]) / 2, (m[1] + m2[1]) / 2]);
  }

  function paintSteps() {
    overlay.querySelectorAll('.np-step').forEach((x) => {
      const i = +x.dataset.s;
      x.classList.toggle('np-on', i === cur);
      x.classList.toggle('np-done', doneTask(i));
    });
    overlay.querySelectorAll('.np-row').forEach((x) => x.classList.toggle('np-row-on', +x.dataset.s === cur));
    (overlay.querySelector('.np-panel') || svg).dataset.kind = tasks[cur].kind;
  }
  function startLine(t) {
    if (t.tip) return t.tip;
    if (t.kind === 'verts') return 'Chạm từng <b>đỉnh</b> của hình.';
    if (t.kind === 'sides') return 'Chạm từng <b>cạnh</b>. Cạnh là đoạn thẳng nối hai đỉnh liền nhau.';
    if (t.kind === 'points') return 'Chạm từng <b>điểm</b> có tên.';
    if (t.kind === 'segs') return 'Chạm một <b>đoạn thẳng</b>, hoặc chạm hai điểm ở hai đầu.';
    if (t.kind === 'path') return 'Chạm lần lượt các điểm <b>dọc theo đường gấp khúc</b>, từ đầu này tới đầu kia.';
    if (t.kind === 'opposite') return `Hình <b>${nm(parse(t.poly))}</b>: chạm một cạnh, rồi chạm cạnh <b>đối diện</b> với nó.`;
    return `Chạm <b>3 điểm</b> cùng nằm trên một đường thẳng${t.given.length ? ` (khác ${t.given.map((g) => g.map(shown).join(', ')).join('; ')})` : ''}.`;
  }
  // queue: đọc nối sau câu khen vừa đọc, không cắt ngang; silent: chỉ hiện chữ (vừa mở câu, bé chưa chạm gì)
  function setTask(i, { queue = false, silent = false } = {}) {
    cur = i;
    sel = [];
    selSide = null;
    paintSteps();
    area = areaOf(tasks[i]);
    zoomTo(area || box, () => {
      build();
      if (!sample) say(doneTask(i) ? doneLine(i) : startLine(tasks[i]), doneTask(i) ? 'np-good' : 'np-ask', { queue, voice: silent ? false : undefined });
    });
  }

  overlay.querySelector('.np-reset').onclick = () => {
    memo.forEach((m) => { m.length = 0; });
    tasks.forEach((t) => (t.fills ? [...new Set(Object.values(t.fills))] : [t.fill]).forEach((f) => clearFill(root, f)));
    tasks.forEach((_, i) => paintChips(i));
    setTask(0);
  };

  // hình mẫu: máy làm mẫu từng việc
  function demo() {
    let at = 700;
    tasks.forEach((t, i) => {
      if (i) { later(() => setTask(i), at); at += 700; }
      later(() => say(`Xem mẫu: ${(t.title || KIND[t.kind].title).replace(/^./, (c) => c.toLowerCase())}…`, 'np-ask', { queue: true }), at);
      at += 900;
      need(t).forEach((x) => {
        if (t.kind === 'verts' || t.kind === 'points') { later(() => tapPoint(x[0]), at); at += 850; }
        else if (t.kind === 'sides') { later(() => tapSeg(x), at); at += 950; }
        else if (t.kind === 'opposite') { later(() => tapSeg(x[0]), at); later(() => tapSeg(x[1]), at + 600); at += 1500; }
        else { x.forEach((n, j) => later(() => tapPoint(n), at + j * 450)); at += x.length * 450 + 700; }
      });
      at += 2400; // đọc xong câu "Hình có … đỉnh: …" rồi mới sang việc sau
    });
    later(() => say(`Mẫu: ${tasks.map((t, i) => `${(t.row || KIND[t.kind].row).replace(/:$/, '').toLowerCase()} <b>${memo[i].map((it) => chipText(t, it)).join(', ')}</b>`).join(', ')}.`, 'np-good', { voice: false }), at - 1800);
  }

  figureBox(S.img).then((b) => {
    box = b;
    tol = Math.max(b.w, b.h) * 0.008;
    svg.setAttribute('viewBox', vbOf(box).join(' '));
    // cùng cỡ gốc như ảnh <img> (max-width: 100% thu nhỏ theo khung)
    if (inline) { svg.setAttribute('width', box.w); svg.setAttribute('height', box.h); }
    requestAnimationFrame(() => {
      tasks.forEach((_, i) => paintChips(i));
      setTask(sample ? 0 : Math.max(0, tasks.findIndex((_, i) => !doneTask(i))), { silent: inline });
      // hình của câu đổi cỡ (xoay máy, kéo thanh chia vùng): vẽ lại chấm, nét theo cỡ mới
      if (inline) {
        let w = svg.getBoundingClientRect().width;
        const ro = new ResizeObserver(() => {
          if (!svg.isConnected) { ro.disconnect(); return; }
          const nw = svg.getBoundingClientRect().width;
          if (Math.abs(nw - w) > 2) { w = nw; build(); }
        });
        ro.observe(svg);
      }
      if (sample) demo();
      overlay.__np = { tapPoint, tapSeg: (s) => tapSeg(parse(s)), setTask }; // trang thử
    });
  });
  return overlay;
}

function injectStyles() {
  if (document.getElementById('np-styles')) return;
  const st = document.createElement('style');
  st.id = 'np-styles';
  st.textContent = `
    .np-th { cursor: pointer; }
    .np-img { cursor: pointer; transition: transform .15s; }
    .np-img:hover { transform: scale(1.04); }
    .np-open {
      display: block; margin: 0.3rem auto 0; padding: 0.3rem 0.7rem; border-radius: 999px; border: 2px solid #7C3AED;
      background: #F5F3FF; color: #6D28D9; font: 800 0.85rem Quicksand, sans-serif; cursor: pointer; white-space: nowrap;
      box-shadow: 0 3px 0 #C4B5FD;
    }
    .np-open:active { transform: translateY(2px); box-shadow: 0 1px 0 #C4B5FD; }
    .np-open-sample { border-color: #0284C7; background: #F0F9FF; color: #0369A1; box-shadow: 0 3px 0 #BAE6FD; }
    .np-btnrow { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin: 0.4rem 0 0.2rem; }
    .np-open-img { display: inline-block; margin: 0; padding: 0.45rem 1rem; font-size: 0.95rem; }
    .np-filled { animation: npFilled 1.2s ease-out; }
    .e3-option.gt-suggest:not(:disabled) { animation: np-suggest 1s ease-in-out 3; box-shadow: 0 0 0 3px #FACC15; }
    @keyframes np-suggest { 50% { box-shadow: 0 0 0 7px #FDE047; } }
    @keyframes npFilled { 0%, 40% { box-shadow: 0 0 0 4px #A78BFA; background: #F5F3FF; } }

    .np-overlay {
      position: fixed; inset: 0; z-index: 5000; background: rgba(15, 23, 42, 0.8);
      display: flex; align-items: stretch; justify-content: center; padding: 10px;
    }
    .np-panel {
      background: #fff; border-radius: 1rem; box-shadow: 0 10px 40px rgba(0,0,0,.35);
      width: min(1100px, 100%); height: 100%; overflow: hidden;
      padding: 0.6rem 0.8rem 0.8rem; display: flex; flex-direction: column; gap: 0.5rem; font-family: Quicksand, sans-serif;
    }
    .np-head { flex: none; display: flex; align-items: center; gap: 0.5rem; }
    .np-steps { flex: 1; display: flex; justify-content: center; gap: 0.4rem; flex-wrap: wrap; }
    .np-step { padding: 0.4rem 0.9rem; border-radius: 999px; border: none; background: #F1F5F9; color: #64748B; font: 700 1rem Quicksand, sans-serif; white-space: nowrap; cursor: pointer; }
    .np-step.np-done { background: #DCFCE7; color: #15803D; }
    .np-step.np-done::before { content: '✓ '; }
    .np-step.np-on { background: #0284C7; color: #fff; box-shadow: 0 2px 6px rgba(2,132,199,.35); }
    .np-mute { flex: none; width: 2.3rem; height: 2.3rem; border-radius: 50%; border: 2px solid #CBD5E1; background: #fff; font-size: 1.1rem; cursor: pointer; }
    .np-close { flex: none; height: 2.3rem; padding: 0 1rem; border-radius: 1.15rem; border: none; background: #10B981; color: #fff; font: 700 0.95rem Quicksand, sans-serif; cursor: pointer; }
    .np-stage { position: relative; flex: 1 1 0; min-height: 0; border-radius: 0.8rem; overflow: hidden; background: #fff; box-shadow: inset 0 0 0 1.5px #E2E8F0; }
    .np-svg { display: block; width: 100%; height: 100%; touch-action: manipulation; user-select: none; -webkit-tap-highlight-color: transparent; }
    .np-say {
      position: absolute; left: 50%; top: 10px; transform: translateX(-50%); width: max-content; max-width: calc(100% - 20px);
      text-align: center; padding: 0.5rem 1rem; border-radius: 0.9rem; background: #fff; box-shadow: 0 4px 14px rgba(15,23,42,.18);
      font: 700 1.1rem/1.35 Quicksand, sans-serif; color: #1E293B; visibility: hidden; pointer-events: none;
    }
    .np-say.np-show { visibility: visible; }
    .np-say.np-good { box-shadow: 0 0 0 3px #10B981, 0 4px 14px rgba(15,23,42,.18); }
    .np-say.np-bad { box-shadow: 0 0 0 3px #DC2626, 0 4px 14px rgba(15,23,42,.18); }
    .np-say.np-ask { box-shadow: 0 0 0 3px #F59E0B, 0 4px 14px rgba(15,23,42,.18); }

    .np-bar { flex: none; display: flex; align-items: center; gap: 0.7rem; padding: 0 0.4rem; }
    .np-rows { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.3rem; }
    .np-row { display: flex; align-items: center; gap: 0.5rem; min-height: 2.5rem; flex-wrap: wrap; border-radius: 0.7rem; padding: 0 0.3rem; }
    .np-row-on { background: #F8FAFC; }
    .np-lbl { font-weight: 800; font-size: 1.05rem; color: var(--c); min-width: 5.4rem; }
    .np-chips { display: flex; flex-wrap: wrap; gap: 0.35rem; }
    .np-chip { min-width: 2.4rem; text-align: center; padding: 0.3rem 0.7rem; border-radius: 0.7rem; font: 800 1.2rem Quicksand, sans-serif; color: #fff; background: var(--c); display: inline-block; white-space: nowrap; }
    .np-chip.np-empty { background: #F1F5F9; color: #94A3B8; font-size: 0.95rem; font-weight: 700; }
    .np-chip.np-pop { animation: npPop .3s ease-out; }
    @keyframes npPop { 0% { transform: scale(1.35); } }
    .np-fly { position: absolute; inset: 0; display: grid; place-items: center; padding: 0; }
    .np-reset { flex: none; width: 2.8rem; height: 2.8rem; border-radius: 50%; border: 2px solid #CBD5E1; background: #fff; font-size: 1.3rem; cursor: pointer; color: #475569; }
    .np-reset[hidden] { display: none; }

    .np-seg { cursor: pointer; }
    .np-seg-hit { stroke: transparent; stroke-linecap: round; }
    .np-seg-line { stroke: transparent; stroke-linecap: round; transition: stroke .2s; }
    :is(.np-panel, .np-inline-svg)[data-kind="sides"] .np-seg-line, :is(.np-panel, .np-inline-svg)[data-kind="segs"] .np-seg-line, :is(.np-panel, .np-inline-svg)[data-kind="opposite"] .np-seg-line { stroke: rgba(234,88,12,0.14); }
    :is(.np-panel, .np-inline-svg)[data-kind="sides"] .np-seg:hover .np-seg-line, :is(.np-panel, .np-inline-svg)[data-kind="segs"] .np-seg:hover .np-seg-line, :is(.np-panel, .np-inline-svg)[data-kind="opposite"] .np-seg:hover .np-seg-line { stroke: rgba(234,88,12,0.35); }
    .np-seg.np-seg-sel .np-seg-line { stroke: #F59E0B !important; }
    .np-path { fill: none; stroke-linecap: round; stroke-linejoin: round; }
    .np-path-in { animation: npIn .5s ease-out; }
    @keyframes npIn { from { opacity: 0; } }
    .np-live { fill: none; stroke: #F59E0B; stroke-linecap: round; stroke-linejoin: round; }
    .np-diag { stroke: #DC2626; stroke-dasharray: 10 8; stroke-linecap: round; }
    .np-vert { cursor: pointer; }
    .np-vert-hit { fill: transparent; }
    .np-vert-ring { fill: rgba(124,58,237,0.12); stroke: #7C3AED; stroke-width: 3; }
    .np-vert-dot { fill: #fff; stroke: #7C3AED; stroke-width: 3; }
    :is(.np-panel, .np-inline-svg)[data-kind="verts"] .np-vert:not(.np-got) .np-vert-ring, :is(.np-panel, .np-inline-svg)[data-kind="points"] .np-vert:not(.np-got) .np-vert-ring { animation: npRing 1.4s ease-in-out infinite; }
    @keyframes npRing { 50% { r: 21px; fill: rgba(124,58,237,0.22); } }
    .np-vert.np-got .np-vert-dot { fill: #7C3AED; }
    .np-vert.np-got .np-vert-ring { fill: rgba(124,58,237,0.2); }
    .np-vert.np-got-g .np-vert-dot { fill: #16A34A; stroke: #16A34A; }
    :is(.np-panel, .np-inline-svg):not([data-kind="verts"]):not([data-kind="points"]) .np-vert .np-vert-ring { fill: transparent; stroke-opacity: 0.45; }
    :is(.np-panel, .np-inline-svg)[data-kind="opposite"] .np-vert { pointer-events: none; opacity: 0.5; }
    .np-vert.np-sel .np-vert-ring { stroke: #F59E0B; stroke-opacity: 1 !important; fill: rgba(245,158,11,0.3) !important; stroke-width: 4; }
    .np-bump { animation: npBump .45s ease-out; transform-box: fill-box; transform-origin: center; }
    @keyframes npBump { 40% { scale: 1.5; } }
    .np-tagtext { font: 800 21px Quicksand, sans-serif; text-anchor: middle; }
    .np-tag-in { animation: npTag .35s ease-out; transform-box: fill-box; transform-origin: center; }
    @keyframes npTag { from { opacity: 0; scale: 0.4; } }
    /* chạm thẳng trên hình của câu */
    .np-hide { display: none !important; }
    .np-rows[hidden] { display: none; }
    .np-inline-svg { touch-action: manipulation; user-select: none; -webkit-user-select: none; -webkit-tap-highlight-color: transparent; }
    .np-inline { width: 100%; max-width: 680px; margin: 0.45rem auto 0; display: flex; flex-direction: column; gap: 0.35rem; font-family: Quicksand, sans-serif; }
    .np-ihead { display: flex; align-items: center; gap: 0.4rem; }
    .np-ihead .np-steps { justify-content: flex-start; }
    .np-ihead .np-step { font-size: 0.92rem; padding: 0.3rem 0.75rem; }
    .np-ihead .np-mute, .np-ihead .np-reset { width: 2.2rem; height: 2.2rem; font-size: 1.05rem; }
    /* lời nhắc giữ sẵn chỗ hai dòng: đổi lời không đẩy ô trả lời lên xuống */
    .np-inline .np-say {
      position: static; transform: none; width: auto; max-width: none; visibility: visible; text-align: left;
      min-height: calc(2 * 1.35em + 0.7rem); display: flex; align-items: center;
      padding: 0.35rem 0.8rem; font-size: 1rem; box-shadow: 0 0 0 2px #E2E8F0; border-radius: 0.8rem;
    }
    .np-inline .np-say.np-good { box-shadow: 0 0 0 2.5px #10B981; background: #F0FDF4; }
    .np-inline .np-say.np-bad { box-shadow: 0 0 0 2.5px #DC2626; background: #FEF2F2; }
    .np-inline .np-say.np-ask { box-shadow: 0 0 0 2.5px #F59E0B; background: #FFFBEB; }
    /* màn ngang thấp: hình ở cột phải (grade3Workbook.js), dải việc nằm dưới hình cùng cột */
    @media (min-width: 720px) and (max-height: 760px) {
      .gw-app .gw-pin-zone .gw-card-has-img > .np-inline { grid-column: 2; grid-row: 14; max-width: 48vw; }
    }
    @media (max-width: 600px) {
      .np-step { font-size: 0.86rem; padding: 0.35rem 0.6rem; }
      .np-say { font-size: 0.98rem; }
      .np-lbl { min-width: 4.6rem; font-size: 0.95rem; }
      .np-chip { font-size: 1.05rem; padding: 0.25rem 0.55rem; }
    }
    @media (prefers-reduced-motion: reduce) {
      :is(.np-panel, .np-inline-svg) .np-vert .np-vert-ring { animation: none !important; }
      .np-bump, .np-tag-in, .np-chip.np-pop, .np-path-in { animation-duration: .6s; animation-timing-function: linear; }
    }
  `;
  document.head.appendChild(st);
}
