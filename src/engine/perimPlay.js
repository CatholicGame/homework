/**
 * 🐜 Đo chu vi: bé thấy chu vi là "đi một vòng quanh hình" rồi mới tính.
 *
 *   • Chạm từng cạnh (hoặc bấm 🐜 Đi một vòng): con kiến bò dọc cạnh đó, cạnh sáng màu, hiện số đo;
 *     cạnh ngắn có số nguyên thì mỗi đơn vị kiến bò qua hiện một vạch (đếm được 1, 2, 3…).
 *   • Bò xong một cạnh: đoạn màu đó bay xuống, duỗi thẳng nối vào "sợi dây" dưới hình.
 *     Trên mỗi đoạn là số đo cạnh, dưới chỗ nối là tổng tới đó (3, 7, 10, 14): phép cộng hiện ra trên dây.
 *   • Bảng phép tính điền dần từng số hạng: Chu vi = 3 + 4 + 3 + 4 = 14 (cm).
 *   • Đi đủ vòng: tổng hiện ra, ô trả lời của câu được điền. Hình chữ nhật / hình vuông / tam giác đều
 *     hiện thêm cách tính nhanh, (dài + rộng) × 2 hay cạnh × 4, cạnh trên hình sáng theo từng nhóm,
 *     sợi dây chia làm 2 (4, 3) phần bằng nhau.
 * Mở được ngay từ đầu, không chấm điểm; bé vẫn bấm Kiểm tra như thường. Kết quả giữ theo câu (MEMO).
 * Máy tắt hiệu ứng (prefers-reduced-motion): kiến vẫn bò, đoạn dây vẫn bay, chậm và êm hơn.
 *
 *   q.perimPlay = hình | [hình, …] (câu có nhiều hình a, b, c: mỗi hình một nút)
 *   hình = {
 *     rect: [dài, rộng] | square: cạnh | lens: [AB, BC, CA…]   độ dài các cạnh theo thứ tự đi vòng
 *     path: 'ABCD',          tên các đỉnh theo thứ tự đi vòng (không có: đỉnh không tên; '_x' = một đỉnh không tên)
 *     unit: 'cm',
 *     points: { A: [x, y] }, có: kiến bò trên hình của bài (q.img hoặc img riêng, toạ độ viewBox);
 *                            không có: tự vẽ hình theo số đo (hình chữ nhật dài nằm ngang, đa giác nội tiếp)
 *     img,                   hình riêng của hình này (mặc định q.img khi có points)
 *     toScale: true,         hình của bài vẽ đúng tỉ lệ: hiện vạch từng đơn vị trên cạnh (hình tự vẽ: tự biết)
 *     crop: false,           hiện cả hình của bài (mặc định: chỉ phần quanh hình đang đo)
 *     label: 'a)',           tên nút khi câu có nhiều hình
 *     name: 'mảnh vườn',     gọi hình theo đề (mặc định theo loại: hình chữ nhật ABCD…)
 *     look: 'garden' | 'pond' | 'paper' | 'field'   màu nền hình tự vẽ (cỏ, nước, giấy, sân)
 *     texts: ['2 dm', …],    nhãn cạnh khác số đo đem cộng (vd. đổi đơn vị trước)
 *     kind: 'para',          hình bình hành (cách nhanh như hình chữ nhật); mặc định theo số cạnh
 *     skip: [3], skipText: 'bờ sông'   cạnh không tính (vd. rào quanh mảnh đất trừ phía bờ sông)
 *     minus: { v: 1, text: 'lối vào 1 m' }   đi đủ vòng rồi bớt đi (vd. hàng rào chừa lối vào)
 *     eqLabel: 'Hàng rào dài',   chữ đầu bảng phép tính (mặc định "Chu vi hình …")
 *     fill: 0 | { blank, input } | [..]   ô nhận kết quả (số thứ tự ô trống, từ 0)
 *           { blank, input, side: 0 }   ô nhận độ dài cạnh 0 (vd. "P = a × 4 = 3 × 4 = 12")
 *   }
 */

import { fillBlanks, figureBox } from './geoTools.js';

const NS = 'http://www.w3.org/2000/svg';
const INK = '#1E293B';
const PALETTE = ['#2563EB', '#F97316', '#16A34A', '#A855F7', '#DB2777', '#0891B2', '#CA8A04', '#DC2626'];
const KIND_NAME = { rect: 'hình chữ nhật', square: 'hình vuông', para: 'hình bình hành', tri: 'hình tam giác', quad: 'hình tứ giác', poly: 'hình' };
const LOOK = {
  paper: ['#E0F2FE', '#0C4A6E'],
  garden: ['#BBF7D0', '#166534'],
  field: ['#D9F99D', '#3F6212'],
  pond: ['#BAE6FD', '#075985'],
};

const calm = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const lerp = (a, b, t) => add(a, mul(sub(b, a), t));
const len = (a) => Math.hypot(a[0], a[1]);
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const shown = (n) => n.replace(/\d+$/, '');
const hidden = (n) => n.startsWith('_');
const num = (v) => String(+(+v).toFixed(3)).replace('.', ',');

function el(tag, attrs = {}, parent) {
  const e = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  if (parent) parent.appendChild(e);
  return e;
}

// ── âm thanh ngắn ───────────────────────────────────────────────────────────
let actx = null;
function tone(freqs, { type = 'sine', gap = 0.09, dur = 0.22, vol = 0.16 } = {}) {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
  } catch { return; }
  freqs.forEach((f, i) => {
    const t = actx.currentTime + i * gap;
    const o = actx.createOscillator();
    const g = actx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(actx.destination);
    o.start(t); o.stop(t + dur + 0.02);
  });
}
const soundStep = (n) => tone([440 + (n % 10) * 45], { type: 'triangle', dur: 0.06, vol: 0.08 });
const soundPiece = (n) => tone([600 + n * 70, 900 + n * 70], { gap: 0.07, dur: 0.14 });
const soundDone = () => tone([523, 659, 784, 1046], { gap: 0.1, dur: 0.3 });

// ── hình ────────────────────────────────────────────────────────────────────
function normalize(s) {
  let lens, kind = s.kind, path = s.path;
  if (s.rect) { const [a, b] = s.rect; lens = [a, b, a, b]; kind ||= 'rect'; }
  else if (s.square != null) { lens = [s.square, s.square, s.square, s.square]; kind ||= 'square'; }
  else lens = s.lens;
  // đề không gọi tên đỉnh (không có path): đỉnh không tên
  path = path ? (Array.isArray(path) ? path : [...path]) : lens.map((_, i) => `_${i}`);
  if (!kind) kind = lens.length === 3 ? 'tri' : lens.length === 4 ? 'quad' : 'poly';
  const names = path.every((n) => !hidden(n));
  const title = s.name || `${KIND_NAME[kind]}${names ? ` ${path.map(shown).join('')}` : ''}`;
  return { ...s, lens, kind, path, unit: s.unit || 'cm', named: names, title };
}

const counted = (s) => s.lens.map((v, i) => (s.skip?.includes(i) ? 0 : v));
const walkTotal = (s) => counted(s).reduce((a, b) => a + b, 0);
const resultOf = (s) => walkTotal(s) - (s.minus?.v || 0);
const needOf = (s) => s.lens.length - (s.skip?.length || 0);

/** Các hình đo chu vi của câu (đã chuẩn hoá). */
export const perimShapes = (q) => (q.perimPlay ? [].concat(q.perimPlay).map(normalize) : []);

// Đa giác nội tiếp đường tròn có các cạnh cho trước (tam giác, tứ giác… bất kì vẽ được).
function cyclic(sides) {
  const n = sides.length;
  const m = sides.indexOf(Math.max(...sides));
  const others = sides.filter((_, i) => i !== m);
  const ang = (s, R) => 2 * Math.asin(Math.min(1, s / (2 * R)));
  const sumO = (R) => others.reduce((t, s) => t + ang(s, R), 0);
  const smax = sides[m];
  let lo = smax / 2, hi = smax * 1e4;
  const inside = sumO(lo) + Math.PI >= 2 * Math.PI;
  const F = inside ? (R) => sumO(R) + ang(smax, R) - 2 * Math.PI : (R) => sumO(R) - ang(smax, R);
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if ((F(mid) > 0) === inside) lo = mid; else hi = mid;
  }
  const R = (lo + hi) / 2;
  const theta = sides.map((s, i) => (i === m ? 0 : ang(s, R)));
  theta[m] = 2 * Math.PI - theta.reduce((a, b) => a + b, 0);
  let phi = 0;
  const pts = [];
  for (let i = 0; i < n; i++) { pts.push([R * Math.cos(phi), R * Math.sin(phi)]); phi += theta[i]; }
  // cạnh dài nhất nằm ngang ở dưới, đi vòng theo chiều kim đồng hồ trên màn hình
  const a = pts[m], b = pts[(m + 1) % n];
  const rot = -Math.atan2(b[1] - a[1], b[0] - a[0]);
  let out = pts.map(([x, y]) => [x * Math.cos(rot) - y * Math.sin(rot), x * Math.sin(rot) + y * Math.cos(rot)]);
  if (out.reduce((t, p) => t + p[1], 0) / n < out[m][1]) out = out.map(([x, y]) => [x, -y]);
  // cạnh dài nhất giờ là cạnh dưới; đổi chiều đi cho theo chiều kim đồng hồ (tổng diện tích có hướng > 0)
  let area = 0;
  out.forEach((p, i) => { const q = out[(i + 1) % n]; area += p[0] * q[1] - q[0] * p[1]; });
  if (area < 0) out = out.map(([x, y]) => [-x, y]);
  return out;
}

// Hình tự vẽ: vừa khung 600 × 380; cạnh rất ngắn so với cạnh dài được vẽ dài ra cho dễ chạm.
function drawnPoints(s) {
  const W = 600, H = 380;
  let pts, scaled = true;
  if (s.kind === 'rect' || s.kind === 'square') {
    const a = s.lens[0], b = s.lens[1];
    let w = a, h = b;
    if (h < w / 3.2) { h = w / 3.2; scaled = false; }
    if (w < h / 1.6) { w = h / 1.6; scaled = false; }
    pts = [[0, 0], [w, 0], [w, h], [0, h]];
  } else if (s.kind === 'para' || (s.kind === 'quad' && s.lens[0] === s.lens[2] && s.lens[1] === s.lens[3])) {
    // tứ giác có các cạnh đối bằng nhau: vẽ nghiêng (hình bình hành), không lẫn với hình chữ nhật
    const a = s.lens[0], b = Math.max(s.lens[1], a / 3), t = (62 * Math.PI) / 180;
    if (b !== s.lens[1]) scaled = false;
    pts = [[b * Math.cos(t), 0], [a + b * Math.cos(t), 0], [a, b * Math.sin(t)], [0, b * Math.sin(t)]];
  } else {
    const mx = Math.max(...s.lens);
    if (s.lens.some((l) => l < mx / 3.5)) scaled = false;
    pts = cyclic(s.lens.map((l) => Math.max(l, mx / 3.5)));
  }
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys);
  const k = Math.min(W / (Math.max(...xs) - x0), H / (Math.max(...ys) - y0));
  const w = (Math.max(...xs) - x0) * k, h = (Math.max(...ys) - y0) * k;
  // khung ôm sát hình (hình dẹt vẫn có khung đủ cao cho nhãn cạnh)
  const bh = Math.max(h, w * 0.22);
  const P = {};
  s.path.forEach((n, i) => { P[n] = [(pts[i][0] - x0) * k, (pts[i][1] - y0) * k + (bh - h) / 2]; });
  return { P, box: { x: 0, y: 0, w, h: bh }, scaled };
}

// ── nút trong câu ───────────────────────────────────────────────────────────
export function attachPerimPlay(root, q) {
  if (!q.perimPlay) return;
  injectStyles();
  const card = root.querySelector('.e3-question-card');
  if (!card) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'gt-open pm-open';
  btn.textContent = '🐜 Đo chu vi';
  btn.onclick = () => openPerimPlay(q, (vals) => fillBlanks(root, vals));
  const row = card.querySelector(':scope > .gt-row');
  if (row) { row.appendChild(btn); return; }
  const img = card.querySelector(':scope > .e3-q-img');
  const nr = document.createElement('div');
  nr.className = 'gt-row pm-row';
  nr.appendChild(btn);
  if (img) {
    let at = img;
    while (at.nextElementSibling?.matches('.e3-orig-toggle, .gp-open, .cp-open')) at = at.nextElementSibling;
    at.after(nr);
  } else {
    (card.querySelector(':scope > .e3-q-text') || card.lastElementChild).after(nr);
  }
}

// Kết quả giữ theo câu: MEMO.get(q)[số thứ tự hình] = [{ i: cạnh, rev }] theo thứ tự bé đi.
const MEMO = new WeakMap();
const memoOf = (q, k) => {
  let m = MEMO.get(q);
  if (!m) MEMO.set(q, (m = []));
  return (m[k] ||= []);
};

function fillsOf(q, shapes) {
  const vals = {};
  shapes.forEach((s, k) => {
    if (s.fill == null || memoOf(q, k).length !== needOf(s)) return;
    const total = num(resultOf(s));
    [].concat(s.fill).forEach((r) => {
      const blank = typeof r === 'number' ? r : r.blank;
      const v = r.side != null ? num(s.lens[r.side]) : total;
      if (r.input == null) { vals[blank] = v; return; }
      const a = Array.isArray(vals[blank]) ? vals[blank] : [];
      a[r.input] = v;
      vals[blank] = a;
    });
  });
  return vals;
}

// ── lớp phủ ─────────────────────────────────────────────────────────────────
export function openPerimPlay(q, onApply, first = 0) {
  injectStyles();
  const shapes = perimShapes(q);
  const overlay = document.createElement('div');
  overlay.className = 'pm-overlay';
  overlay.innerHTML = `
    <div class="pm-panel" role="dialog" aria-label="Đo chu vi">
      <div class="pm-head">
        <div class="pm-tabs${shapes.length < 2 ? ' pm-single' : ''}">${shapes.length < 2 ? '<span class="pm-title">🐜 Đo chu vi</span>'
          : shapes.map((s, i) => `<button type="button" class="pm-tab" data-k="${i}">${s.label || `Hình ${i + 1}`}</button>`).join('')}</div>
        <button type="button" class="pm-close">✓ Xong</button>
      </div>
      <div class="pm-how" aria-hidden="true">
        <span>👆 Chạm từng cạnh cho kiến bò quanh hình.</span>
        <span>🧵 Mỗi cạnh nối vào sợi dây bên dưới.</span>
        <span>➕ Cộng các cạnh là ra <b>chu vi</b>.</span>
      </div>
      <div class="pm-stage">
        <svg class="pm-svg" preserveAspectRatio="xMidYMid meet"></svg>
        <div class="pm-verdict">&nbsp;</div>
      </div>
      <div class="pm-foot">
        <div class="pm-board">
          <div class="pm-eq"></div>
          <div class="pm-fast"></div>
        </div>
        <div class="pm-btns">
          <button type="button" class="pm-walk">🐜 Đi một vòng</button>
          <button type="button" class="pm-reset" title="Làm lại">↺</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const $ = (s) => overlay.querySelector(s);
  const svg = $('.pm-svg');
  const verdict = $('.pm-verdict');
  const filled = new Set();
  let mounted = null;

  const close = () => {
    mounted?.destroy();
    overlay.remove();
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', onResize);
    filled.forEach((e) => { e.classList.remove('gt-filled'); void e.offsetWidth; e.classList.add('gt-filled'); });
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  $('.pm-close').onclick = close;
  const changed = () => { (onApply?.(fillsOf(q, shapes)) || []).forEach((e) => filled.add(e)); };
  const say = (html, cls = '') => {
    verdict.className = `pm-verdict${html ? ' pm-show' : ''} ${cls}`;
    verdict.innerHTML = html || '&nbsp;';
  };

  const show = async (k) => {
    mounted?.destroy();
    mounted = null;
    overlay.querySelectorAll('.pm-tab').forEach((b) => b.classList.toggle('pm-on', +b.dataset.k === k));
    const s = shapes[k];
    let P, box, src = null, full = null, scaled = false;
    if (s.points) {
      P = s.points;
      src = s.img || q.img;
      full = await figureBox(src);
      // khung quanh hình này (hình của bài có thể vẽ nhiều hình), chừa chỗ cho số đo, tên đỉnh
      const xs = s.path.map((v) => P[v][0]), ys = s.path.map((v) => P[v][1]);
      const m = Math.max(62, 0.16 * Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)));
      const x0 = Math.max(full.x, Math.min(...xs) - m), y0 = Math.max(full.y, Math.min(...ys) - m);
      const x1 = Math.min(full.x + full.w, Math.max(...xs) + m), y1 = Math.min(full.y + full.h, Math.max(...ys) + m);
      box = s.crop === false ? full : { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
    } else ({ P, box, scaled } = drawnPoints(s));
    if (!overlay.isConnected) return;
    mounted = mountShape({ svg, overlay, $, say, changed, quiet: calm(), memo: memoOf(q, k) }, { ...s, toScale: s.toScale ?? scaled }, P, box, src, full);
  };
  overlay.querySelectorAll('.pm-tab').forEach((b) => { b.onclick = () => { cur = +b.dataset.k; show(cur); }; });
  let cur = first;
  // xoay máy / đổi cỡ cửa sổ: dựng lại theo cỡ mới (kết quả giữ trong MEMO)
  let rz = 0;
  const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (!mounted?.busy()) show(cur); }, 250); };
  window.addEventListener('resize', onResize);
  requestAnimationFrame(() => show(first));
  return overlay;
}

function mountShape(ctx, s, P, box, src, full) {
  const { svg, $, say } = ctx;
  const n = s.path.length;
  const edges = s.path.map((a, i) => ({ i, a, b: s.path[(i + 1) % n], v: s.lens[i], skip: !!s.skip?.includes(i), text: s.texts?.[i] || `${num(s.lens[i])} ${s.unit}`, color: PALETTE[i % PALETTE.length] }));
  const need = needOf(s); // số cạnh kiến phải đi
  const ropeTotal = walkTotal(s); // sợi dây: các cạnh kiến đi
  const total = resultOf(s); // kết quả (bớt lối vào nếu có)
  const minus = s.minus;
  const walked = ctx.memo; // [{ i, rev }]
  let timers = [];
  let raf = 0;
  const later = (ms, f) => { const t = setTimeout(f, ms); timers.push(t); return t; };

  // ── bảng phép tính (dựng trước khi đo sân: bảng cao bao nhiêu thì sân còn bấy nhiêu) ──
  const eq = $('.pm-eq'), fast = $('.pm-fast');
  eq.innerHTML = `<span class="pm-eq-lbl">${s.eqLabel || `Chu vi ${s.title}`}:</span> <span class="pm-eq-row">${Array.from({ length: need }, (_, j) => `${j ? '<i>+</i>' : ''}<span class="pm-t" data-j="${j}">?</span>`).join('')}${minus ? `<i>−</i><span class="pm-t pm-minus">${num(minus.v)}</span>` : ''}<span class="pm-nw"><i>=</i><span class="pm-sum">?</span><span class="pm-unit">(${s.unit})</span></span></span>`;
  const fastText = () => {
    const a = s.lens[0], b = s.lens[1];
    const allEq = s.lens.every((x) => Math.abs(x - a) < 1e-9);
    if (s.skip?.length) return null;
    const less = minus ? ` − <b>${num(minus.v)}</b>` : '';
    if ((s.kind === 'rect' || s.kind === 'para') && !allEq) return { html: `Cách nhanh: (<b>${num(a)}</b> + <b>${num(b)}</b>) × 2${less} = <b>${num(total)}</b> (${s.unit})`, parts: 2, groups: [[0, 1], [2, 3]] };
    if (allEq && n >= 3) return { html: `Cách nhanh: <b>${num(a)}</b> × ${n}${less} = <b>${num(total)}</b> (${s.unit})`, parts: n, groups: edges.map((e) => [e.i]) };
    return null;
  };
  const FAST = fastText();
  const hintFast = () => {
    fast.className = 'pm-fast';
    fast.innerHTML = s.skip?.length ? `Không tính cạnh ${s.skipText || 'tô xanh đứt nét'}.`
      : s.kind === 'rect' ? 'Hình chữ nhật: 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau.'
        : s.kind === 'para' ? 'Hình bình hành: hai cạnh đối diện dài bằng nhau.'
          : FAST ? `Các cạnh của ${s.title} dài bằng nhau.` : 'Chu vi là tổng độ dài các cạnh của hình.';
  };
  const paintEq = () => {
    eq.querySelectorAll('.pm-t[data-j]').forEach((t, j) => {
      const w = walked[j];
      t.textContent = w ? num(edges[w.i].v) : '?';
      t.classList.toggle('pm-t-on', !!w);
      t.style.background = w ? edges[w.i].color : '';
    });
    const done = walked.length === need;
    const sum = eq.querySelector('.pm-sum');
    sum.textContent = done ? num(total) : '?';
    sum.classList.toggle('pm-sum-on', done);
  };

  hintFast();
  paintEq();
  // ── khung nhìn: hình ở trên to hết cỡ, dải sợi dây ở dưới trải hết bề ngang (theo cỡ thật của sân) ──
  const stage = svg.parentElement.getBoundingClientRect();
  const Wpx = Math.max(200, stage.width), Hpx = Math.max(200, stage.height);
  const zonePx = Math.min(170, Math.max(120, Hpx * 0.3));
  const padPx = Wpx < 560 ? 44 : 64; // chỗ cho nhãn cạnh, tên đỉnh, lời nhắn trên cùng
  const topPx = Wpx < 560 ? 92 : padPx; // màn hẹp: lời nhắn trên cùng hai dòng
  const u = Math.max(box.w / (Wpx - 2 * padPx), box.h / (Hpx - zonePx - topPx - padPx)); // đơn vị hình / px
  const vbW = Wpx * u, vbH = Hpx * u;
  const cx = box.x + box.w / 2;
  const vbX = cx - vbW / 2;
  const figH = (Hpx - zonePx) * u;
  const vbY = box.y + box.h / 2 - figH / 2 - u * (topPx - padPx) / 2 - u * 10;
  svg.replaceChildren();
  svg.setAttribute('viewBox', `${vbX} ${vbY} ${vbW} ${vbH}`);
  const ppu = () => svg.getScreenCTM()?.a || 1;
  const px = (v) => v / ppu(); // v px màn hình → đơn vị hình
  const screenAt = (at, parent, attrs = {}) => {
    const g = el('g', attrs, parent);
    g.setAttribute('transform', `translate(${at[0]} ${at[1]}) scale(${px(1)})`);
    return g;
  };
  const pill = (at, text, color, parent, cls = '') => {
    const g = screenAt(at, parent, { class: `pm-pill ${cls}` });
    const w = 16 + text.length * 9.6;
    el('rect', { x: -w / 2, y: -15, width: w, height: 30, rx: 15, fill: '#fff', stroke: color, 'stroke-width': 3 }, g);
    el('text', { y: 6.5, class: 'pm-pilltext', fill: color }, g).textContent = text;
    return g;
  };

  const L = { fig: el('g', {}, svg), edges: el('g', {}, svg), marks: el('g', {}, svg), rope: el('g', {}, svg), fly: el('g', {}, svg), ant: el('g', {}, svg) };
  const poly = s.path.map((v) => P[v]);
  const C = mul(poly.reduce((t, p) => add(t, p), [0, 0]), 1 / n);
  if (src) {
    // chỉ hiện phần hình quanh hình đang đo
    const id = `pm-clip-${Math.random().toString(36).slice(2, 8)}`;
    el('rect', { x: box.x, y: box.y, width: box.w, height: box.h }, el('clipPath', { id }, el('defs', {}, L.fig)));
    el('image', { href: src, x: full.x, y: full.y, width: full.w, height: full.h, preserveAspectRatio: 'none', 'clip-path': `url(#${id})` }, L.fig);
  }
  else {
    const [fillC, ink] = LOOK[s.look] || LOOK.paper;
    el('polygon', { points: poly.map((p) => p.join(',')).join(' '), fill: fillC, stroke: ink, 'stroke-width': 3, 'stroke-linejoin': 'round', 'vector-effect': 'non-scaling-stroke' }, L.fig);
    if (s.look === 'garden' || s.look === 'field') {
      // vài khóm cỏ trong hình
      const xs = poly.map((p) => p[0]), ys = poly.map((p) => p[1]);
      const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
      for (let r = 1; r < 4; r++) for (let c = 1; c < 6; c++) {
        const at = [x0 + ((c - 0.5 + (r % 2) * 0.5) / 5.5) * (x1 - x0), y0 + (r / 4) * (y1 - y0)];
        const g = screenAt(at, L.fig, { opacity: 0.55 });
        el('path', { d: 'M-6 4 L-3 -5 L0 3 L3 -7 L6 4', fill: 'none', stroke: ink, 'stroke-width': 2, 'stroke-linejoin': 'round' }, g);
      }
    }
    if (s.named) s.path.forEach((v) => {
      const d = sub(P[v], C);
      const at = add(P[v], mul(d, px(22) / (len(d) || 1)));
      el('text', { y: 8, class: 'pm-vname' }, screenAt(at, L.fig)).textContent = shown(v);
    });
  }

  // ── cạnh: chỗ chạm + nét màu khi kiến đã đi qua ──
  const edgeG = edges.map((e) => {
    const A = P[e.a], B = P[e.b];
    if (e.skip) {
      // cạnh không tính: xanh đứt nét, không chạm được
      const g = el('g', { class: 'pm-skip' }, L.edges);
      el('line', { x1: A[0], y1: A[1], x2: B[0], y2: B[1], class: 'pm-skip-line', 'vector-effect': 'non-scaling-stroke' }, g);
      return g;
    }
    const g = el('g', { class: 'pm-edge', 'data-i': e.i }, L.edges);
    el('line', { x1: A[0], y1: A[1], x2: B[0], y2: B[1], class: 'pm-edge-hit', 'vector-effect': 'non-scaling-stroke' }, g);
    el('line', { x1: A[0], y1: A[1], x2: B[0], y2: B[1], class: 'pm-edge-line', stroke: e.color, 'vector-effect': 'non-scaling-stroke' }, g);
    g.addEventListener('click', () => enqueue(e.i));
    return g;
  });
  const outward = (e) => {
    const A = P[e.a], B = P[e.b];
    const d = sub(B, A);
    const nr = [-d[1] / len(d), d[0] / len(d)];
    return dot(sub(C, A), nr) > 0 ? mul(nr, -1) : nr;
  };
  const markG = edges.map(() => el('g', {}, L.marks));
  // vạch đơn vị trên cạnh: hình vẽ đúng tỉ lệ, cạnh số nguyên, không quá dài, các vạch không quá sát
  const ticksOf = (e) => {
    if (!s.toScale) return 0;
    const m = Math.round(e.v);
    if (Math.abs(e.v - m) > 1e-9 || m < 2 || m > 20) return 0;
    return len(sub(P[e.b], P[e.a])) / m / px(1) >= 11 ? m : 0;
  };
  const labelEdge = (e) => {
    // nhãn số đo nằm phía trong hình (hình của bài thường ghi số đo phía ngoài)
    const A = P[e.a], B = P[e.b];
    const out = outward(e);
    const w = 16 + e.text.length * 9.6;
    const off = px(Math.abs(out[0]) * w / 2 + Math.abs(out[1]) * 15 + 8);
    pill(add(mul(add(A, B), 0.5), mul(out, -off)), e.text, e.color, markG[e.i], 'pm-pop');
  };
  const tickAt = (e, j, m, rev) => {
    const A = P[rev ? e.b : e.a], B = P[rev ? e.a : e.b];
    const at = lerp(A, B, j / m);
    const out = outward(e);
    el('line', { x1: at[0], y1: at[1], x2: at[0] + out[0] * px(9), y2: at[1] + out[1] * px(9), stroke: e.color, class: 'pm-tick', 'vector-effect': 'non-scaling-stroke' }, markG[e.i]);
  };

  // ── sợi dây ──
  const zoneY = vbY + figH + u * 10;
  L.fig.prepend(el('rect', { x: vbX, y: zoneY, width: vbW, height: vbY + vbH - zoneY, class: 'pm-zone' }));
  const ropeX0 = vbX + u * Math.max(40, Wpx * 0.06);
  const ropeW = vbW - 2 * (ropeX0 - vbX);
  const ropeY = zoneY + (vbY + vbH - zoneY) * 0.48;
  const kR = ropeW / ropeTotal;
  el('line', { x1: ropeX0, y1: ropeY, x2: ropeX0 + ropeW, y2: ropeY, class: 'pm-rope-track', 'vector-effect': 'non-scaling-stroke' }, L.rope);
  const ropePieces = el('g', {}, L.rope);
  const ropeMarks = el('g', {}, L.rope);
  const ropeFast = el('g', {}, L.rope);
  const tickRope = (x, label) => {
    el('line', { x1: x, y1: ropeY - px(11), x2: x, y2: ropeY + px(11), class: 'pm-rope-tick', 'vector-effect': 'non-scaling-stroke' }, ropeMarks);
    el('text', { y: 24, class: 'pm-rope-sum' }, screenAt([x, ropeY + px(14)], ropeMarks)).textContent = label;
  };
  tickRope(ropeX0, '0');
  const placePiece = (e, j0) => {
    const x0 = ropeX0 + j0 * kR, x1 = x0 + e.v * kR;
    el('line', { x1: x0, y1: ropeY, x2: x1, y2: ropeY, stroke: e.color, class: 'pm-rope-piece', 'vector-effect': 'non-scaling-stroke' }, ropePieces);
    el('text', { y: 0, class: 'pm-rope-len', fill: e.color }, screenAt([(x0 + x1) / 2, ropeY - px(14)], ropeMarks)).textContent = num(e.v);
    tickRope(x1, num(j0 + e.v));
  };

  // ── kiến ──
  const ant = el('g', { class: 'pm-ant' }, L.ant);
  const antBody = el('g', {}, ant);
  [[-4, 1], [1, 1], [6, 1]].forEach(([x]) => [-1, 1].forEach((sg) => {
    el('path', { d: `M${x} 0 Q${x - 2} ${sg * 8} ${x - 6} ${sg * 12}`, class: 'pm-ant-leg' }, antBody);
  }));
  el('ellipse', { cx: -10, cy: 0, rx: 9, ry: 6.5, class: 'pm-ant-part' }, antBody);
  el('circle', { cx: 1, cy: 0, r: 4.5, class: 'pm-ant-part' }, antBody);
  el('circle', { cx: 10, cy: 0, r: 5.5, class: 'pm-ant-part' }, antBody);
  el('path', { d: 'M13 -3 Q18 -9 22 -8 M13 3 Q18 9 22 8', class: 'pm-ant-leg' }, antBody);
  el('circle', { cx: 12, cy: -2.2, r: 1.4, fill: '#fff' }, antBody);
  el('circle', { cx: 12, cy: 2.2, r: 1.4, fill: '#fff' }, antBody);
  const antPose = { p: P[s.path[0]], th: 0, at: s.path[0] };
  const renderAnt = (step = 0) => {
    const k = px(1.35);
    ant.setAttribute('transform', `translate(${antPose.p[0]} ${antPose.p[1]}) rotate(${(antPose.th * 180) / Math.PI}) scale(${k})`);
    antBody.setAttribute('transform', step % 2 ? 'translate(0 0.8)' : '');
  };
  // cờ xuất phát ở đỉnh đầu tiên
  const flag = screenAt(P[s.path[0]], L.marks, { class: 'pm-flag' });
  el('line', { x1: 0, y1: 0, x2: 0, y2: -34, stroke: INK, 'stroke-width': 2.5 }, flag);
  el('path', { d: 'M0 -34 L18 -28 L0 -22 Z', fill: '#DC2626' }, flag);

  const animate = (ms, f) => new Promise((res) => {
    const t0 = performance.now();
    const step = () => {
      if (!ctx.overlay.isConnected) return res();
      const t = Math.min(1, (performance.now() - t0) / ms);
      f(t);
      if (t < 1) raf = requestAnimationFrame(step);
      else res();
    };
    raf = requestAnimationFrame(step);
  });

  // ── đi một cạnh ──
  const queue = [];
  let busy = false;
  const isWalked = (i) => walked.some((w) => w.i === i);
  const ropeSoFar = () => walked.reduce((t, w) => t + edges[w.i].v, 0);
  function enqueue(i) {
    if (edges[i].skip) return;
    if (isWalked(i) || queue.includes(i)) {
      if (isWalked(i)) {
        const j = walked.findIndex((w) => w.i === i);
        const t = eq.querySelector(`.pm-t[data-j="${j}"]`);
        t.classList.remove('pm-blink'); void t.offsetWidth; t.classList.add('pm-blink');
        say(`Cạnh ${edgeName(edges[i])} kiến đi rồi, dài <b>${edges[i].text}</b>.`, 'pm-ask');
      }
      return;
    }
    queue.push(i);
    run();
  }
  const edgeName = (e) => (s.named ? `<b>${shown(e.a)}${shown(e.b)}</b>` : 'này');
  async function run() {
    if (busy) return;
    busy = true;
    while (queue.length && ctx.overlay.isConnected) await walkEdge(queue.shift());
    busy = false;
  }
  async function walkEdge(i) {
    const e = edges[i];
    // kiến đứng ở đầu nào của cạnh thì đi từ đầu đó
    const rev = antPose.at === e.b;
    const A = P[rev ? e.b : e.a], B = P[rev ? e.a : e.b];
    const th = Math.atan2(B[1] - A[1], B[0] - A[0]);
    say('');
    if (len(sub(antPose.p, A)) > 0.5) {
      // nhảy tới đầu cạnh
      const p0 = antPose.p, th0 = antPose.th;
      let dth = th - th0; while (dth > Math.PI) dth -= 2 * Math.PI; while (dth < -Math.PI) dth += 2 * Math.PI;
      await animate(ctx.quiet ? 650 : 420, (t) => {
        const k = easeInOut(t);
        antPose.p = add(lerp(p0, A, k), [0, ctx.quiet ? 0 : -Math.sin(Math.PI * t) * px(40)]);
        antPose.th = th0 + dth * k;
        renderAnt();
      });
    }
    antPose.th = th;
    edgeG[i].classList.add('pm-walking');
    const m = ticksOf(e);
    let shownTicks = 0;
    const ms = (ctx.quiet ? 1500 : 1000) * Math.min(1.6, Math.max(0.7, len(sub(B, A)) / (box.w * 0.5)));
    const line = edgeG[i].querySelector('.pm-edge-line');
    await animate(ms, (t) => {
      antPose.p = lerp(A, B, t);
      renderAnt(Math.floor(t * 14));
      // nét màu mọc theo kiến
      const p = lerp(A, B, t);
      line.setAttribute('x1', A[0]); line.setAttribute('y1', A[1]); line.setAttribute('x2', p[0]); line.setAttribute('y2', p[1]);
      while (m && shownTicks < m && t >= (shownTicks + 1) / m - 1e-6) { shownTicks++; tickAt(e, shownTicks, m, rev); soundStep(shownTicks); }
    });
    if (!ctx.overlay.isConnected) return;
    antPose.at = rev ? e.a : e.b;
    edgeG[i].classList.replace('pm-walking', 'pm-walked');
    labelEdge(e);
    const j0 = ropeSoFar();
    walked.push({ i, rev });
    paintEq();
    say(`${s.named ? `Cạnh ${edgeName(e)}` : 'Cạnh này'} dài <b>${e.text}</b>.`, 'pm-mix');
    // đoạn màu bay xuống, duỗi thẳng trên sợi dây
    const x0 = ropeX0 + j0 * kR;
    const T0 = [x0, ropeY], T1 = [x0 + e.v * kR, ropeY];
    const fl = el('line', { stroke: e.color, class: 'pm-rope-piece pm-flying', 'vector-effect': 'non-scaling-stroke' }, L.fly);
    await animate(ctx.quiet ? 900 : 650, (t) => {
      const k = easeInOut(t);
      const a = lerp(A, T0, k), b = lerp(B, T1, k);
      fl.setAttribute('x1', a[0]); fl.setAttribute('y1', a[1]); fl.setAttribute('x2', b[0]); fl.setAttribute('y2', b[1]);
    });
    fl.remove();
    placePiece(e, j0);
    soundPiece(walked.length);
    ctx.changed();
    if (walked.length === need) finish();
  }

  function finish(silent) {
    paintEq();
    $('.pm-walk').disabled = true;
    if (minus) {
      // bớt đi một đoạn ở cuối sợi dây (lối vào…): đoạn đó xám, gạch chéo, có kéo cắt
      L.rope.querySelectorAll('.pm-cut').forEach((g) => g.remove());
      const x1 = ropeX0 + ropeW, x0 = x1 - minus.v * kR;
      const g = el('g', { class: 'pm-cut' }, L.rope);
      el('line', { x1: x0, y1: ropeY, x2: x1, y2: ropeY, class: 'pm-cut-line', 'vector-effect': 'non-scaling-stroke' }, g);
      el('text', { y: 0, class: 'pm-cut-text' }, screenAt([Math.min((x0 + x1) / 2, x1 - px(50)), ropeY - px(62)], g)).textContent = `✂️ ${minus.text || `bớt ${num(minus.v)} ${s.unit}`}`;
      el('line', { x1: x0, y1: ropeY - px(16), x2: x0, y2: ropeY + px(16), class: 'pm-cut-mark', 'vector-effect': 'non-scaling-stroke' }, g);
      el('text', { y: 24, class: 'pm-rope-sum pm-cut-sum' }, screenAt([x0, ropeY + px(36)], g)).textContent = num(total);
    }
    if (!silent) {
      soundDone();
      const all = s.skip?.length ? `Kiến đi hết ${need} cạnh` : 'Kiến đi đủ một vòng';
      say(minus ? `🎉 ${all}: <b>${num(ropeTotal)} ${s.unit}</b>. Bớt ${minus.text || num(minus.v)}: còn <b>${num(total)} ${s.unit}</b>.`
        : `🎉 ${all}! ${s.eqLabel ? `${s.eqLabel}:` : `Chu vi ${s.title} là`} <b>${num(total)} ${s.unit}</b>.`, 'pm-good');
    }
    if (!FAST) { fast.className = 'pm-fast'; fast.innerHTML = `Cộng độ dài ${need} cạnh${minus ? `, bớt ${num(minus.v)}` : ''}: <b>${num(total)} ${s.unit}</b>.`; return; }
    fast.className = 'pm-fast pm-fast-on';
    fast.innerHTML = FAST.html;
    // sợi dây chia thành các phần bằng nhau, mỗi phần là một nhóm cạnh (dài + rộng, hay một cạnh)
    ropeFast.replaceChildren();
    const part = ropeW / FAST.parts;
    const groupText = FAST.groups.map((g) => g.map((i) => num(s.lens[i])).join(' + '));
    const marks = [];
    for (let j = 0; j < FAST.parts; j++) {
      const g = el('g', { class: 'pm-bracket', opacity: silent ? 1 : 0 }, ropeFast);
      const x0 = ropeX0 + j * part + px(3), x1 = ropeX0 + (j + 1) * part - px(3), y = ropeY - px(40);
      el('path', { d: `M${x0} ${y + px(8)} V${y} H${x1} V${y + px(8)}`, class: 'pm-bracket-line', 'vector-effect': 'non-scaling-stroke' }, g);
      el('text', { y: -6, class: 'pm-bracket-text' }, screenAt([(x0 + x1) / 2, y], g)).textContent = groupText[j];
      marks.push(g);
    }
    // ẩn số đo từng đoạn để chỗ cho ngoặc nhóm
    ropeMarks.querySelectorAll('.pm-rope-len').forEach((t) => t.setAttribute('visibility', 'hidden'));
    if (silent) return;
    // từng nhóm cạnh sáng lên trên hình, cùng lúc ngoặc của nhóm hiện trên dây
    FAST.groups.forEach((g, j) => later(700 + j * (ctx.quiet ? 900 : 650), () => {
      marks[j].setAttribute('opacity', 1);
      edgeG.forEach((eg, i) => eg.classList.toggle('pm-glow', g.includes(i)));
      tone([700 + j * 90], { type: 'triangle', dur: 0.12, vol: 0.1 });
    }));
    later(700 + FAST.groups.length * (ctx.quiet ? 900 : 650) + 400, () => edgeG.forEach((eg) => eg.classList.remove('pm-glow')));
  }

  // ── nút ──
  const walkBtn = $('.pm-walk');
  walkBtn.disabled = false;
  walkBtn.onclick = () => {
    // đi tiếp từ chỗ kiến đứng, theo thứ tự quanh hình
    let at = s.path.indexOf(antPose.at);
    for (let k = 0; k < n; k++) {
      const i = (at + k) % n;
      if (!edges[i].skip && !isWalked(i) && !queue.includes(i)) queue.push(i);
    }
    at = -1;
    run();
  };
  const reset = () => {
    queue.length = 0;
    walked.length = 0;
    timers.forEach(clearTimeout); timers = [];
    cancelAnimationFrame(raf);
    busy = false;
    markG.forEach((g) => g.replaceChildren());
    ropePieces.replaceChildren(); ropeMarks.replaceChildren(); ropeFast.replaceChildren();
    L.rope.querySelectorAll('.pm-cut').forEach((g) => g.remove());
    L.fly.replaceChildren();
    tickRope(ropeX0, '0');
    edgeG.forEach((g) => {
      g.classList.remove('pm-walked', 'pm-walking', 'pm-glow');
      const l = g.querySelector('.pm-edge-line'), h = g.querySelector('.pm-edge-hit');
      ['x1', 'y1', 'x2', 'y2'].forEach((a) => l.setAttribute(a, h.getAttribute(a)));
    });
    antPose.p = P[s.path[0]]; antPose.at = s.path[0]; antPose.th = Math.atan2(P[s.path[1]][1] - P[s.path[0]][1], P[s.path[1]][0] - P[s.path[0]][0]);
    renderAnt();
    walkBtn.disabled = false;
    say('');
    paintEq(); hintFast();
  };
  $('.pm-reset').onclick = () => { reset(); ctx.changed(); };

  // đợi khung có cỡ thật rồi mới vẽ những thứ theo px màn hình
  const ready = () => {
    antPose.th = Math.atan2(P[s.path[1]][1] - P[s.path[0]][1], P[s.path[1]][0] - P[s.path[0]][0]);
    // mở lại: dựng lại các cạnh đã đi, không hoạt ảnh
    let j0 = 0;
    walked.forEach(({ i, rev }) => {
      const e = edges[i];
      edgeG[i].classList.add('pm-walked');
      const m = ticksOf(e);
      for (let t = 1; t <= m; t++) tickAt(e, t, m, rev);
      labelEdge(e);
      placePiece(e, j0);
      j0 += e.v;
      antPose.at = rev ? e.a : e.b;
      antPose.p = P[antPose.at];
    });
    paintEq();
    renderAnt();
    if (walked.length === need) finish(true);
  };
  ready();
  ctx.overlay.__pm = { walk: (i) => enqueue(i), all: () => walkBtn.onclick(), busy: () => busy || queue.length > 0 };
  return { busy: () => busy, destroy: () => { timers.forEach(clearTimeout); cancelAnimationFrame(raf); queue.length = 0; } };
}

function injectStyles() {
  if (document.getElementById('pm-styles')) return;
  const style = document.createElement('style');
  style.id = 'pm-styles';
  style.textContent = `
    .gt-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin: 6px auto 0; }
    .gw-app .gw-pin-zone .gw-card-has-img > .gt-row { grid-column: 2; }
    .pm-open {
      padding: 4px 12px; border: 1.5px solid #0EA5E9; border-radius: 999px; background: #F0F9FF; color: #075985;
      font: 700 0.85rem Quicksand, sans-serif; cursor: pointer;
    }
    .pm-open:hover { background: #E0F2FE; }
    .gt-filled { animation: pm-filled 1.4s ease-out; }
    @keyframes pm-filled { 0%, 40% { background: #FEF08A; box-shadow: 0 0 0 4px #FDE047; } }
    .pm-overlay {
      position: fixed; inset: 0; z-index: 5000; background: rgba(15, 23, 42, 0.8);
      display: flex; align-items: stretch; justify-content: center; padding: 10px;
    }
    .pm-panel {
      background: #fff; border-radius: 1rem; box-shadow: 0 10px 40px rgba(0,0,0,.35);
      width: min(1200px, 100%); height: 100%; overflow: hidden;
      padding: 0.6rem 0.8rem 0.8rem; display: flex; flex-direction: column; gap: 0.5rem;
    }
    .pm-head { flex: none; display: flex; align-items: center; gap: 0.5rem; }
    .pm-tabs { flex: 1 1 auto; display: flex; justify-content: center; gap: 4px; padding: 3px; border-radius: 999px; background: #F1F5F9; min-width: 0; overflow-x: auto; }
    .pm-tabs.pm-single { background: transparent; }
    .pm-title { font: 800 1.15rem Quicksand, sans-serif; color: #0F172A; padding: 0.35rem 0; }
    .pm-tab {
      flex: 0 0 auto; padding: 0.4rem 1rem; border-radius: 999px; border: none; background: transparent;
      font: 800 1rem Quicksand, sans-serif; color: #475569; cursor: pointer; white-space: nowrap;
    }
    .pm-tab.pm-on { background: #0284C7; color: #fff; box-shadow: 0 2px 6px rgba(2,132,199,.35); }
    .pm-close {
      flex: none; height: 2.3rem; padding: 0 1rem; border-radius: 1.15rem; border: none; background: #10B981; color: #fff;
      font: 700 0.95rem Quicksand, sans-serif; cursor: pointer;
    }
    .pm-how {
      flex: none; display: flex; flex-wrap: wrap; justify-content: center; gap: 0 1rem;
      font: 600 0.88rem/1.4 Quicksand, sans-serif; color: #64748B; text-align: center; user-select: none;
    }
    .pm-how b { color: #334155; }
    .pm-stage {
      position: relative; flex: 1 1 0; min-height: 0; border-radius: 0.8rem; overflow: hidden;
      background: #fff; box-shadow: inset 0 0 0 1.5px #E2E8F0;
    }
    .pm-svg { display: block; width: 100%; height: 100%; touch-action: manipulation; user-select: none; }
    .pm-verdict {
      position: absolute; left: 50%; top: 10px; transform: translateX(-50%);
      width: max-content; max-width: calc(100% - 20px); text-align: center;
      padding: 0.5rem 1rem; border-radius: 0.9rem; background: #fff; box-shadow: 0 4px 14px rgba(15,23,42,.18);
      font: 700 1.1rem/1.35 Quicksand, sans-serif; color: #1E293B; visibility: hidden; pointer-events: none;
    }
    .pm-verdict.pm-show { visibility: visible; }
    .pm-verdict.pm-good { box-shadow: 0 0 0 3px #10B981, 0 4px 14px rgba(15,23,42,.18); }
    .pm-verdict.pm-mix { box-shadow: 0 0 0 3px #2563EB, 0 4px 14px rgba(15,23,42,.18); }
    .pm-verdict.pm-ask { box-shadow: 0 0 0 3px #F59E0B, 0 4px 14px rgba(15,23,42,.18); }

    .pm-foot { flex: none; display: flex; align-items: center; justify-content: center; gap: 0.8rem; flex-wrap: wrap; }
    .pm-board {
      flex: 1 1 22rem; min-width: 0; padding: 0.45rem 0.9rem; border-radius: 0.9rem; background: #F8FAFC; box-shadow: inset 0 0 0 2px #E2E8F0;
      display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
    }
    .pm-eq { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.2rem 0.45rem; font: 700 1.05rem Quicksand, sans-serif; color: #334155; }
    .pm-eq-row { display: inline-flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.3rem; }
    .pm-eq i { font-style: normal; font: 800 1.35rem Quicksand, sans-serif; color: #475569; }
    .pm-t, .pm-sum {
      min-width: 2.4rem; padding: 0.15rem 0.5rem; border-radius: 0.6rem; text-align: center;
      font: 900 1.45rem Quicksand, sans-serif; color: #94A3B8; background: #fff; box-shadow: inset 0 0 0 2px #CBD5E1;
    }
    .pm-t-on { color: #fff; box-shadow: none; }
    .pm-sum { min-width: 3.4rem; }
    .pm-nw { display: inline-flex; align-items: center; gap: 0.3rem; white-space: nowrap; }
    .pm-sum-on { color: #fff; background: #10B981; box-shadow: 0 0 0 3px #A7F3D0; }
    .pm-unit { font: 800 1.1rem Quicksand, sans-serif; color: #475569; }
    .pm-blink { animation: pm-blink .45s ease-in-out 4; }
    @keyframes pm-blink { 50% { transform: scale(1.18); box-shadow: 0 0 0 4px #FDE047; } }
    .pm-fast { min-height: 1.6rem; font: 600 0.98rem Quicksand, sans-serif; color: #64748B; text-align: center; }
    .pm-fast-on { color: #0F172A; font-weight: 700; font-size: 1.12rem; }
    .pm-fast b { color: #0369A1; font-weight: 900; }
    .pm-btns { flex: none; display: flex; align-items: center; gap: 0.6rem; }
    .pm-walk {
      height: 3.2rem; padding: 0 1.2rem; border-radius: 1rem; border: none; background: #F59E0B; color: #fff;
      font: 800 1.1rem Quicksand, sans-serif; cursor: pointer; box-shadow: 0 3px 0 #B45309;
    }
    .pm-walk:disabled { background: #CBD5E1; box-shadow: none; cursor: default; }
    .pm-reset {
      width: 3rem; height: 3rem; border-radius: 50%; border: 2px solid #CBD5E1; background: #fff;
      font: 800 1.4rem Quicksand, sans-serif; color: #334155; cursor: pointer;
    }

    .pm-edge { cursor: pointer; }
    .pm-edge-hit { stroke: transparent; stroke-width: 30; stroke-linecap: round; }
    .pm-edge-line { stroke-width: 8; stroke-linecap: round; opacity: 0; }
    .pm-edge:hover .pm-edge-hit { stroke: rgba(2,132,199,.14); }
    .pm-walking .pm-edge-line, .pm-walked .pm-edge-line { opacity: .9; }
    .pm-glow .pm-edge-line { stroke-width: 13; filter: drop-shadow(0 0 5px #FACC15); }
    .pm-tick { stroke-width: 3; stroke-linecap: round; }
    .pm-vname { font: 800 20px Quicksand, sans-serif; fill: #0F172A; text-anchor: middle; }
    .pm-pilltext { font: 800 16px Quicksand, sans-serif; text-anchor: middle; }
    .pm-pop { animation: pm-pop .45s ease-out; }
    @keyframes pm-pop { 0% { opacity: 0; } 60% { opacity: 1; } }
    .pm-ant-part { fill: #4A2C17; }
    .pm-ant-leg { fill: none; stroke: #4A2C17; stroke-width: 1.8; stroke-linecap: round; }
    .pm-ant { pointer-events: none; filter: drop-shadow(0 2px 1px rgba(0,0,0,.25)); }
    .pm-flag { pointer-events: none; }
    .pm-zone { fill: #FFFBEB; }
    .pm-skip-line { stroke: #0EA5E9; stroke-width: 7; stroke-dasharray: 10 8; stroke-linecap: round; }
    .pm-minus { color: #64748B; box-shadow: inset 0 0 0 2px #94A3B8; background: #F1F5F9; }
    .pm-cut-line { stroke: #94A3B8; stroke-width: 15; stroke-dasharray: 3 3; }
    .pm-cut-mark { stroke: #DC2626; stroke-width: 3; }
    .pm-cut-text { font: 800 16px Quicksand, sans-serif; fill: #475569; text-anchor: middle; }
    .pm-cut-sum { fill: #DC2626; }
    .pm-rope-track { stroke: #CBD5E1; stroke-width: 4; stroke-dasharray: 2 7; stroke-linecap: round; }
    .pm-rope-piece { stroke-width: 11; }
    .pm-rope-tick { stroke: #334155; stroke-width: 2.5; }
    .pm-rope-sum { font: 900 18px Quicksand, sans-serif; fill: #334155; text-anchor: middle; }
    .pm-rope-len { font: 900 18px Quicksand, sans-serif; text-anchor: middle; }
    .pm-bracket-line { fill: none; stroke: #0369A1; stroke-width: 3; stroke-linejoin: round; }
    .pm-bracket-text { font: 800 17px Quicksand, sans-serif; fill: #0369A1; text-anchor: middle; }
    @media (max-width: 560px) {
      .pm-tab { padding: 0.4rem 0.7rem; font-size: 0.9rem; }
      .pm-how { font-size: 0.8rem; }
      .pm-t, .pm-sum { font-size: 1.2rem; min-width: 2rem; }
      .pm-walk { height: 2.8rem; font-size: 1rem; }
      .pm-fast { min-height: 2.7rem; }
    }
  `;
  document.head.appendChild(style);
}
