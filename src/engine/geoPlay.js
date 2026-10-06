/**
 * ↔️ Kéo dài — bé thử trên hình xem các cạnh song song hay cắt nhau.
 *
 * Chỉ là đồ dùng học tập: không ghi vào ô trả lời, không chấm điểm. Câu hỏi
 * quan sát nên mở được ngay từ đầu. Nút "↔️ Kéo dài" dưới hình mở lớp phủ lớn:
 *   • chạm các cạnh: cạnh đầu tiên là cạnh mốc (xanh), các cạnh sau (mỗi cạnh một màu)
 *     đem so với cạnh mốc, vd. BE với AG, CD, AB trong một lần;
 *   • "↔ Kéo dài": mọi cạnh mọc dài ra cả hai phía, máy quay lùi ra xa;
 *     – cắt nhau: hai đầu lao vào nhau, BỐP! (sao, tia lửa, rung, nảy lại),
 *       chấm đỏ ở chỗ gặp; cặp hơi chéo thì thước khoảng cách nhỏ dần 3, 2, 1 ô…
 *     – song song: chạy mãi, thước khoảng cách chỗ nào cũng bằng nhau.
 *     – cắt nhau và vuông góc: hiện thêm dấu góc vuông xanh ∟ ở chỗ gặp.
 * Máy tắt hiệu ứng (prefers-reduced-motion): vẫn chạy, chậm hơn, sao hiện tại
 * chỗ rồi mờ dần, không rung, không tia lửa.
 *
 *   q.geoPlay = {
 *     points: { A: [x, y], … },        toạ độ theo viewBox của hình trong sách
 *     segs: ['AB', 'BE', …],           các cạnh bé chạm được
 *     fill: 'ACDG' | ['ABCD', 'MNPQ'], (tuỳ) đa giác tô nền nhạt như sách
 *     pick: 'BE',                      (tuỳ) cạnh chọn sẵn (cạnh đề hỏi)
 *     cell: 10,                        (tuỳ) cạnh một ô lưới, để đọc khoảng cách "9 ô"
 *     origin: [20, 20],                (tuỳ) một giao điểm lưới, khi hình trong sách vẽ trên giấy kẻ ô
 *     more: [{ name, points, segs, fill, pick }],   (tuỳ) hình "Thử thêm"
 *     answer: [quy tắc…],              (tuỳ) điền kết quả bé thử được vào ô trả lời, xem ANSWER
 *   }
 * Kết quả mỗi lần kéo dài trên hình của bài (cặp song song, cắt nhau, vuông góc) giữ theo câu;
 * bé thử tới đâu, ô trả lời điền tới đó (bé vẫn sửa được, vẫn bấm Kiểm tra như thường).
 */

import { fillBlanks } from './geoTools.js';

const NS = 'http://www.w3.org/2000/svg';
const INK = '#3F3A40';
// [0] cạnh mốc; các màu sau cho từng cạnh đem so
const COLORS = ['#2563EB', '#F97316', '#16A34A', '#A855F7', '#DB2777', '#0891B2'];
const FAR = 1e5;

const calm = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const len = (a) => Math.hypot(a[0], a[1]);
const unit = (a) => mul(a, 1 / (len(a) || 1));
const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const clamp01 = (t) => Math.max(0, Math.min(1, t));

function el(tag, attrs = {}, parent) {
  const e = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  if (parent) parent.appendChild(e);
  return e;
}

export function attachGeoPlay(root, q) {
  const img = root.querySelector('.e3-question-card > .e3-q-img');
  if (!img || !q.geoPlay) return;
  injectStyles();
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'gp-open';
  btn.textContent = '↔️ Kéo dài';
  // Sau hình (và sau nút "📷 Ảnh gốc" của lightbox.js nếu có).
  (img.nextElementSibling?.classList.contains('e3-orig-toggle') ? img.nextElementSibling : img).after(btn);
  const changed = new Set();
  btn.onclick = () => {
    const ov = openGeoPlay(q.geoPlay, (rec) => {
      const m = memoOf(q);
      rec.forEach(([rel, a, b]) => m[rel].add(pairKey(a, b)));
      fillBlanks(root, answersOf(q.geoPlay.answer || [], m)).forEach((e) => changed.add(e));
    });
    // đóng lớp phủ: nháy các ô vừa điền
    new MutationObserver((_, obs) => {
      if (ov.isConnected) return;
      obs.disconnect();
      changed.forEach((e) => { e.classList.remove('gt-filled'); void e.offsetWidth; e.classList.add('gt-filled'); });
      changed.clear();
    }).observe(document.body, { childList: true });
  };
}

// ── kết quả → ô trả lời ─────────────────────────────────────────────────────
const MEMO = new WeakMap();
const memoOf = (q) => {
  if (!MEMO.has(q)) MEMO.set(q, { par: new Set(), cross: new Set(), perp: new Set() });
  return MEMO.get(q);
};
const segKey = (s) => [...s].sort().join('');
const pairKey = (a, b) => [segKey(a), segKey(b)].sort().join('|');
/**
 * ANSWER: q.geoPlay.answer = [quy tắc…] (blank = số thứ tự ô trống, từ 0)
 *   { blank, list: 'par' | 'perp', within?: 'MNPQ', exclude?: [['AB', 'DC']] }  mọi cặp vào một ô: AD, BC, DC, AB…
 *   { blank, list: 'par', with: 'BE' }                 các cạnh song song với BE
 *   { blank, pair: ['AB', 'AD'], rel: 'par' | 'perp' | 'notpar', yes: 'Đ', no: 'S' }
 *   { blank, allPar: [['PQ', 'SR'], ['PS', 'QR']], yes, no }
 */
function answersOf(rules, m) {
  const vals = {};
  const pairs = (rel) => [...m[rel]].map((k) => k.split('|'));
  const known = (k) => m.par.has(k) || m.cross.has(k);
  rules.forEach((r) => {
    const yes = r.yes ?? 'Đ', no = r.no ?? 'S';
    if (r.list) {
      let ps = pairs(r.list);
      if (r.within) ps = ps.filter((p) => [...p.join('')].every((c) => r.within.includes(c)));
      if (r.exclude) ps = ps.filter((p) => !r.exclude.some(([a, b]) => pairKey(a, b) === p.join('|')));
      const out = r.with ? ps.filter((p) => p.includes(segKey(r.with))).map((p) => p.find((x) => x !== segKey(r.with))) : ps.flat();
      if (out.length) vals[r.blank] = out;
    } else if (r.pair) {
      const k = pairKey(...r.pair);
      if (!known(k)) return;
      const ok = r.rel === 'par' ? m.par.has(k) : r.rel === 'perp' ? m.perp.has(k) : !m.par.has(k);
      if (r.rel !== 'perp' || m.cross.has(k) || m.par.has(k)) vals[r.blank] = ok ? yes : no;
    } else if (r.allPar) {
      const ks = r.allPar.map(([a, b]) => pairKey(a, b));
      if (ks.some((k) => m.cross.has(k))) vals[r.blank] = no;
      else if (ks.every((k) => m.par.has(k))) vals[r.blank] = yes;
    }
  });
  return vals;
}

// ── âm thanh ngắn (Web Audio) ───────────────────────────────────────────────
let actx = null;
function audio() {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
    return actx;
  } catch { return null; }
}
function noise(ctx, secs) {
  const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * secs), ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  return src;
}
/** "cộp": tiếng gõ trầm + tiếng bụp ngắn. */
function soundBump() {
  const ctx = audio();
  if (!ctx) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.frequency.setValueAtTime(220, t);
  o.frequency.exponentialRampToValueAtTime(55, t + 0.18);
  g.gain.setValueAtTime(0.35, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
  o.connect(g).connect(ctx.destination);
  o.start(t); o.stop(t + 0.26);
  const n = noise(ctx, 0.12);
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass'; f.frequency.value = 1400;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.25, t);
  ng.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  n.connect(f).connect(ng).connect(ctx.destination);
  n.start(t);
}
/** "vù": tiếng gió nhẹ khi hai đường chạy mãi. */
function soundWhoosh(secs) {
  const ctx = audio();
  if (!ctx) return;
  const t = ctx.currentTime;
  const n = noise(ctx, secs);
  const f = ctx.createBiquadFilter();
  f.type = 'bandpass'; f.Q.value = 1.2;
  f.frequency.setValueAtTime(400, t);
  f.frequency.exponentialRampToValueAtTime(1600, t + secs);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.001, t);
  g.gain.exponentialRampToValueAtTime(0.09, t + secs * 0.3);
  g.gain.exponentialRampToValueAtTime(0.001, t + secs);
  n.connect(f).connect(g).connect(ctx.destination);
  n.start(t);
}

// ── lớp phủ ─────────────────────────────────────────────────────────────────
export function openGeoPlay(cfg, onResult) {
  injectStyles();
  const scenes = [{ name: 'Hình của bài', ...cfg }, ...(cfg.more || [])];
  const overlay = document.createElement('div');
  overlay.className = 'gp-overlay';
  overlay.innerHTML = `
    <div class="gp-panel" role="dialog" aria-label="Kéo dài các cạnh">
      <div class="gp-head">
        <span class="gp-title">↔️ Kéo dài cạnh</span>
        <div class="gp-scenes">${scenes.length > 1 ? scenes.map((s, i) => `<button type="button" class="gp-scene" data-i="${i}">${s.name}</button>`).join('') : ''}</div>
        <button type="button" class="gp-close">✓ Xong</button>
      </div>
      <div class="gp-how" aria-hidden="true">
        <span>👆 Chạm các cạnh rồi bấm ↔ Kéo dài.</span>
        <span>💥 Gặp nhau là <b>cắt nhau</b>, ∞ không bao giờ gặp là <b>song song</b>.</span>
      </div>
      <div class="gp-stage">
        <svg class="gp-svg" preserveAspectRatio="xMidYMid meet"></svg>
        <div class="gp-verdict">&nbsp;</div>
      </div>
      <div class="gp-bar">
        <div class="gp-picked"></div>
        <div class="gp-acts">
          <button type="button" class="gp-go">↔ Kéo dài</button>
          <button type="button" class="gp-reset" title="Làm lại">↺</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const svg = overlay.querySelector('.gp-svg');
  const stage = overlay.querySelector('.gp-stage');
  const verdict = overlay.querySelector('.gp-verdict');
  const goBtn = overlay.querySelector('.gp-go');
  const chips = overlay.querySelector('.gp-picked');
  let scene = null;
  let picked = []; // picked[0]: cạnh mốc (xanh); các cạnh sau đem so với cạnh mốc
  let run = null; // phiên kéo dài đang chạy / đã xong
  let raf = 0;

  const close = () => {
    cancelAnimationFrame(raf);
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  overlay.querySelector('.gp-close').onclick = close;
  overlay.querySelectorAll('.gp-scene').forEach((b) => { b.onclick = () => load(+b.dataset.i); });
  overlay.querySelector('.gp-reset').onclick = () => { stop(); paint(); };
  goBtn.onclick = () => go();

  // ── dựng hình ──
  let L = {}; // các lớp <g>
  let base = null; // khung nhìn ban đầu {x,y,w,h}
  let cam = null;
  const pxPerUnit = () => {
    const r = svg.getBoundingClientRect();
    return Math.min(r.width / cam.w, r.height / cam.h) || 1;
  };
  const setCam = (c) => {
    cam = c;
    svg.setAttribute('viewBox', `${c.x} ${c.y} ${c.w} ${c.h}`);
    const k = 1 / pxPerUnit(); // đơn vị hình / 1 px màn hình
    L.screen.forEach((g) => {
      const at = g.__at;
      g.setAttribute('transform', `translate(${at[0]} ${at[1]}) scale(${k})`);
    });
  };
  // Nhóm vẽ theo px màn hình, đặt tại một điểm của hình (chữ, đầu mũi tên, sao…).
  const screenGroup = (at, parent) => {
    const g = el('g', {}, parent);
    g.__at = at;
    L.screen.push(g);
    return g;
  };
  const moveScreen = (g, at) => { g.__at = at; g.setAttribute('transform', `translate(${at[0]} ${at[1]}) scale(${1 / pxPerUnit()})`); };

  function load(i) {
    stop();
    scene = scenes[i];
    overlay.querySelectorAll('.gp-scene').forEach((b) => b.classList.toggle('gp-on', +b.dataset.i === i));
    const P = scene.points;
    const xs = Object.values(P).map((p) => p[0]);
    const ys = Object.values(P).map((p) => p[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const pad = Math.max(maxX - minX, maxY - minY) * 0.18 + 20;
    base = { x: minX - pad, y: minY - pad, w: maxX - minX + 2 * pad, h: maxY - minY + 2 * pad };
    const cell = scene.cell || cfg.cell || 10;

    svg.replaceChildren();
    L = { screen: [] };
    const defs = el('defs', {}, svg);
    const [ox, oy] = scene.origin || cfg.origin || [0, 0];
    const pat = (id, size, stroke, w) => {
      const p = el('pattern', { id, x: ox, y: oy, width: size, height: size, patternUnits: 'userSpaceOnUse' }, defs);
      el('path', { d: `M${size} 0H0V${size}`, fill: 'none', stroke, 'stroke-width': w, 'vector-effect': 'non-scaling-stroke' }, p);
    };
    pat('gp-g1', cell, '#DBEAFE', 1);
    pat('gp-g5', cell * 5, '#BFDBFE', 1.2);
    pat('gp-g25', cell * 25, '#93C5FD', 1.4);
    L.g1 = el('rect', { x: -FAR, y: -FAR, width: 2 * FAR, height: 2 * FAR, fill: 'url(#gp-g1)' }, svg);
    L.g5 = el('rect', { x: -FAR, y: -FAR, width: 2 * FAR, height: 2 * FAR, fill: 'url(#gp-g5)' }, svg);
    L.g25 = el('rect', { x: -FAR, y: -FAR, width: 2 * FAR, height: 2 * FAR, fill: 'url(#gp-g25)', opacity: 0 }, svg);
    [].concat(scene.fill || []).forEach((f) => el('polygon', { points: [...f].map((n) => P[n].join(',')).join(' '), fill: '#EAF4FD' }, svg));
    L.gauges = el('g', {}, svg);
    L.ext = el('g', {}, svg);
    L.segs = el('g', {}, svg);
    L.heads = el('g', {}, svg);
    L.labels = el('g', {}, svg);
    L.fx = el('g', {}, svg);

    scene.segs.forEach((name) => {
      const a = P[name[0]], b = P[name[1]];
      const g = el('g', { class: 'gp-seg', 'data-seg': name }, L.segs);
      el('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: 'gp-hit', 'vector-effect': 'non-scaling-stroke' }, g);
      el('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: 'gp-line', 'vector-effect': 'non-scaling-stroke' }, g);
      g.addEventListener('click', () => tap(name));
    });
    // Tên điểm: đẩy ra xa tâm hình.
    const c = [(minX + maxX) / 2, (minY + maxY) / 2];
    Object.entries(P).forEach(([n, p]) => {
      const g = screenGroup(p, L.labels);
      const u = unit(sub(p, c));
      const off = [Math.sign(u[0] || 1) * Math.max(Math.abs(u[0]), 0.7) * 26, Math.sign(u[1] || 1) * Math.max(Math.abs(u[1]), 0.7) * 26];
      el('text', { x: off[0], y: off[1] + 8, class: 'gp-label' }, g).textContent = n;
      el('circle', { r: 4.5, fill: INK }, g);
    });
    picked = scene.pick ? [scene.pick] : [];
    setCam(base);
    paint();
  }

  function paint() {
    L.segs.querySelectorAll('.gp-seg').forEach((g) => {
      const i = picked.indexOf(g.dataset.seg);
      g.classList.toggle('gp-pk', i >= 0);
      if (i >= 0) g.style.setProperty('--gp-c', COLORS[i]);
    });
    const chip = (name, i) => (name
      ? `<span class="gp-chip" style="background:${COLORS[i]}">${name}</span>`
      : '<span class="gp-chip gp-empty">?</span>');
    chips.innerHTML = `${chip(picked[0], 0)}<span class="gp-and">so với</span>${
      picked.length > 1 ? picked.slice(1).map((n, i) => chip(n, i + 1)).join('') : chip('', 1)}`;
    // xám (chờ) chỉ khi đang chạy; chạy xong lại xanh để bấm xem lại
    goBtn.classList.toggle('gp-ready', picked.length >= 2 && (!run || run.done));
  }

  function tap(name) {
    if (run) stop();
    const i = picked.indexOf(name);
    if (i >= 0) picked.splice(i, 1);
    else if (picked.length < COLORS.length) picked.push(name);
    else picked[picked.length - 1] = name;
    say('');
    paint();
  }

  function say(html, cls = '') {
    verdict.className = `gp-verdict${html ? ' gp-show' : ''} ${cls}`;
    verdict.innerHTML = html || '&nbsp;';
  }

  function stop() {
    cancelAnimationFrame(raf);
    run = null;
    if (!L.ext) return;
    L.ext.replaceChildren();
    L.heads.replaceChildren();
    L.gauges.replaceChildren();
    L.gauges.classList.remove('gp-gauges-done');
    L.fx.replaceChildren();
    L.screen = L.screen.filter((g) => g.isConnected);
    stage.classList.remove('gp-shake');
    if (base) setCam(base);
    say('');
    paint();
  }

  // ── kéo dài ──
  // Cạnh mốc và mọi cạnh so cùng mọc dài theo một "tầm" chung r(t), nhanh dần để tới được chỗ gặp
  // ở rất xa. Cặp cắt nhau: r tới chỗ gặp thì BỐP!, cạnh so dừng ở đó và nảy lại.
  // Cặp song song: chạy mãi, thước khoảng cách chỗ nào cũng bằng nhau.
  function go() {
    if (run) stop();
    if (picked.length < 2) {
      say(picked.length ? `Chạm thêm cạnh để so với <b style="color:${COLORS[0]}">${picked[0]}</b>.` : 'Chạm vào các cạnh trước.', 'gp-ask');
      L.segs.classList.remove('gp-nudge');
      void L.segs.getBBox();
      L.segs.classList.add('gp-nudge');
      return;
    }
    const P = scene.points;
    const cell = scene.cell || cfg.cell || 10;
    const quiet = calm();
    const slow = quiet ? 1.6 : 1;
    const baseSize = Math.max(base.w, base.h);
    const lines = picked.map((name, i) => {
      const a = P[name[0]], b = P[name[1]];
      return { name, a, b, d: unit(sub(b, a)), len: len(sub(b, a)), color: COLORS[i], lim: { pa: Infinity, pb: Infinity }, fit: {}, bounce: {} };
    });
    const [ref, ...others] = lines;
    const tag = (l) => `<b style="color:${l.color}">${l.name}</b>`;

    // Từng cặp (cạnh mốc, cạnh so): song song, hay gặp nhau ở X, mỗi cạnh phải mọc thêm bao xa.
    const need = (l, X) => {
      const s = dot(sub(X, l.a), l.d);
      return s < -0.5 ? ['pa', -s] : s > l.len + 0.5 ? ['pb', s - l.len] : [null, 0];
    };
    others.forEach((o) => {
      const cr = cross(ref.d, o.d);
      if (Math.abs(cr) < 1e-6) {
        o.gap = Math.abs(cross(sub(o.a, ref.a), ref.d));
        // cùng nằm trên một đường thẳng (vd. AB và MN ở hai hình đặt cạnh nhau): không phải song song
        if (o.gap < 1) o.same = true;
        else o.parallel = true;
        return;
      }
      o.X = add(ref.a, mul(ref.d, cross(sub(o.a, ref.a), o.d) / cr));
      [o.side, o.toX] = need(o, o.X);
      [o.refSide, o.refToX] = need(ref, o.X);
      o.at = Math.max(o.toX, o.refToX);
      o.perp = Math.abs(dot(ref.d, o.d)) < 0.02;
      o.hit = Object.entries(P).find(([, p]) => len(sub(p, o.X)) < 1)?.[0] || null;
    });
    const pars = others.filter((o) => o.parallel);
    const sames = others.filter((o) => o.same);
    const crosses = others.filter((o) => !o.parallel && !o.same);
    // hai cạnh so cùng một đường thẳng (vd. DC và QP): chỉ một bộ thước khoảng cách
    pars.forEach((o, i) => {
      o.dupGauge = pars.slice(0, i).some((q) => Math.abs(cross(sub(o.a, q.a), q.d)) < 1);
    });
    const maxAt = Math.max(0, ...crosses.map((o) => o.at));
    const short = maxAt * 0.5 + baseSize * 0.2; // phía không hướng về chỗ gặp: chỉ mọc ra một đoạn
    crosses.forEach((o) => {
      ['pa', 'pb'].forEach((s) => { o.lim[s] = s === o.side ? o.toX : short; });
      if (o.side) o.fit[o.side] = true;
    });
    if (!pars.length && !sames.length) {
      // không có cạnh song song: cạnh mốc dừng ở chỗ gặp xa nhất mỗi phía
      ['pa', 'pb'].forEach((s) => {
        const on = crosses.filter((o) => o.refSide === s);
        ref.lim[s] = on.length ? Math.max(...on.map((o) => o.refToX)) : short;
        if (on.length) ref.fit[s] = true;
      });
    }

    lines.forEach((l) => {
      l.ext = {};
      l.head = {};
      ['pa', 'pb'].forEach((s) => {
        // đường chạy mãi: vạch đứt chạy ra xa
        const forever = l.lim[s] === Infinity ? ' gp-forever' : '';
        l.ext[s] = el('line', { class: `gp-extline${forever}`, stroke: l.color, 'vector-effect': 'non-scaling-stroke' }, L.ext);
        l.head[s] = screenGroup(s === 'pa' ? l.a : l.b, L.heads);
        el('circle', { r: 11, fill: l.color, stroke: '#fff', 'stroke-width': 3 }, l.head[s]);
      });
    });
    const tip = (l, s, e) => (s === 'pa' ? add(l.a, mul(l.d, -e)) : add(l.b, mul(l.d, e)));

    // Tầm mọc chung: đứng yên D0 giây rồi nhanh dần.
    const D0 = 0.25, U = baseSize * 0.3, H = 0.55 * slow;
    const reach = (t) => (t <= D0 ? 0 : U * (2 ** ((t - D0) / H) - 1));
    const whenAt = (dist) => D0 + H * Math.log2(1 + dist / U);
    const parDur = 3.6 * slow;
    const tEnd = Math.max(crosses.length ? whenAt(maxAt) + 1.4 : 0, pars.length || sames.length ? D0 + parDur : 0);
    // song song: lùi xa nhất mà khoảng giữa hai đường vẫn đủ chỗ cho thước "9 ô"
    const minGap = pars.length ? Math.min(...pars.map((o) => o.gap)) : 0;
    const zMax = pars.length ? Math.max(1, Math.min(1.8, (minGap * pxPerUnit()) / 80)) : 1;
    if (pars.length) soundWhoosh(parDur * 0.8);

    const grid = (zoom) => {
      L.g1.setAttribute('opacity', clamp01(1.6 - zoom * 0.45));
      L.g25.setAttribute('opacity', clamp01((zoom - 2) * 0.5));
    };
    const fitCam = (pts, minScale = 1) => {
      let x0 = base.x, y0 = base.y, x1 = base.x + base.w, y1 = base.y + base.h;
      pts.forEach((p) => { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); });
      const padX = (x1 - x0) * 0.1 + 20, padY = (y1 - y0) * 0.1 + 20;
      const c = { x: x0 - padX, y: y0 - padY, w: x1 - x0 + 2 * padX, h: y1 - y0 + 2 * padY };
      if (c.w < base.w * minScale) { c.x -= (base.w * minScale - c.w) / 2; c.w = base.w * minScale; }
      if (c.h < base.h * minScale) { c.y -= (base.h * minScale - c.h) / 2; c.h = base.h * minScale; }
      return c;
    };

    // Thước khoảng cách từ cạnh mốc tới từng cạnh so chưa va chạm, viền cùng màu cạnh so.
    const gauges = () => {
      L.gauges.replaceChildren();
      L.screen = L.screen.filter((g) => g.isConnected);
      const live = others.filter((o) => !o.same && !o.dupGauge && o.crashed == null);
      if (!live.length) return;
      // vùng thật sự nhìn thấy (viewBox "meet" nên rộng hơn khung cam theo một chiều)
      const r = svg.getBoundingClientRect();
      const ppu = pxPerUnit();
      const vw = r.width / ppu, vh = r.height / ppu;
      const vx = cam.x + cam.w / 2 - vw / 2, vy = cam.y + cam.h / 2 - vh / 2;
      // điểm trên cạnh mốc theo hoành độ (hoặc tung độ nếu cạnh gần thẳng đứng), cách nhau ~130 px
      const vertical = Math.abs(ref.d[0]) < 0.3;
      const count = Math.max(2, Math.min(6, Math.floor((vertical ? r.height : r.width) / 130)));
      live.forEach((o, j) => {
        for (let k = 0; k < count; k++) {
          const f = (k + 0.5 + (j / live.length) * 0.6 - 0.3) / count;
          const A = vertical
            ? add(ref.a, mul(ref.d, (vy + vh * f - ref.a[1]) / ref.d[1]))
            : add(ref.a, mul(ref.d, (vx + vw * f - ref.a[0]) / ref.d[0]));
          const F = add(o.a, mul(o.d, dot(sub(A, o.a), o.d)));
          const dist = len(sub(A, F));
          if (o.X) {
            // chỉ phía chứa hai cạnh, trước chỗ gặp
            const sA = dot(sub(A, o.X), ref.d), sMid = dot(sub(mul(add(o.a, o.b), 0.5), o.X), ref.d);
            if (Math.sign(sA) !== Math.sign(sMid)) continue;
          }
          if (dist * ppu < 60) continue;
          el('line', { x1: A[0], y1: A[1], x2: F[0], y2: F[1], class: 'gp-gauge', 'vector-effect': 'non-scaling-stroke' }, L.gauges);
          const g = screenGroup(mul(add(A, F), 0.5), L.gauges);
          el('rect', { x: -22, y: -13, width: 44, height: 26, rx: 13, class: `gp-pill${o.parallel ? ' gp-pill-same' : ''}`, stroke: o.color }, g);
          el('text', { y: 6, class: 'gp-pilltext' }, g).textContent = `${Math.round(dist / cell)} ô`;
          moveScreen(g, g.__at);
        }
      });
    };

    // BỐP! tại chỗ gặp của cặp (cạnh mốc, o)
    const crash = (o, t) => {
      o.crashed = t;
      soundBump();
      const g = screenGroup(o.X, L.fx);
      moveScreen(g, o.X);
      el('circle', { r: 14, class: 'gp-ring' }, g);
      if (o.perp) {
        // dấu góc vuông, quay về phía hai cạnh
        const toward = (l) => {
          const s0 = dot(sub(l.a, o.X), l.d), s1 = dot(sub(l.b, o.X), l.d);
          return mul(l.d, Math.abs(s1) >= Math.abs(s0) ? Math.sign(s1) || 1 : Math.sign(s0) || 1);
        };
        const u = mul(toward(ref), 22), v = mul(toward(o), 22);
        el('path', { d: `M${u[0]} ${u[1]} L${u[0] + v[0]} ${u[1] + v[1]} L${v[0]} ${v[1]}`, class: 'gp-right' }, g);
      }
      el('circle', { r: 9, fill: '#DC2626', stroke: '#fff', 'stroke-width': 3 }, g);
      const star = el('g', { class: quiet ? 'gp-star gp-star-calm' : 'gp-star' }, g);
      const pts = [];
      for (let k = 0; k < 24; k++) {
        const r = k % 2 ? 26 : 48 + (k % 4 === 0 ? 6 : 0);
        const a = (k / 24) * Math.PI * 2 - Math.PI / 2;
        pts.push(`${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`);
      }
      el('polygon', { points: pts.join(' '), fill: '#FDE047', stroke: '#DC2626', 'stroke-width': 3, 'stroke-linejoin': 'round' }, star);
      el('text', { y: 7, class: 'gp-bop' }, star).textContent = 'BỐP!';
      if (quiet) return;
      const sparks = el('g', {}, g);
      for (let k = 0; k < 10; k++) {
        const s = el('g', { transform: `rotate(${(k / 10) * 360 + 18})` }, sparks);
        el('line', { x1: 30, y1: 0, x2: 44, y2: 0, class: 'gp-spark', stroke: k % 2 ? '#F97316' : '#FACC15' }, s);
      }
      stage.classList.remove('gp-shake');
      void stage.offsetWidth;
      stage.classList.add('gp-shake');
      // các đầu dừng ở chỗ gặp nảy lại như lò xo
      if (o.side) o.bounce[o.side] = t;
      if (o.refSide && ref.lim[o.refSide] === o.refToX) ref.bounce[o.refSide] = t;
    };

    const summary = (final) => {
      const rows = [];
      const hits = crosses.filter((o) => o.crashed != null);
      if (hits.length) {
        rows.push(`💥 ${tag(ref)} <b>cắt</b> ${hits.map((o) => `${tag(o)} ở ${o.hit ? `<b>${o.hit}</b>` : 'chỗ chấm đỏ'}${
          o.perp ? ' <span class="gp-perp">∟ vuông góc</span>' : ' <span class="gp-notperp">không vuông góc</span>'}`).join(', ')}`);
      }
      if (final && sames.length) rows.push(`═ ${tag(ref)} và ${sames.map(tag).join(', ')} nằm trên <b>cùng một đường thẳng</b>`);
      if (final && pars.length) rows.push(`∞ ${tag(ref)} <b>song song</b> với ${pars.map(tag).join(', ')}: kéo dài mãi vẫn không gặp nhau`);
      const cls = rows.length === 1 && hits.length ? 'gp-bad' : rows.length === 1 && final && pars.length ? 'gp-good' : 'gp-mix';
      say(rows.map((r) => `<div>${r}</div>`).join(''), rows.length ? cls : '');
    };

    const t0 = performance.now();
    run = { t0 };
    paint();
    const frame = () => {
      const t = (performance.now() - t0) / 1000;
      const r = reach(t);
      crosses.forEach((o) => { if (o.crashed == null && r >= o.at) { crash(o, t); summary(false); } });
      const k = 1 / pxPerUnit();
      const fitPts = [];
      lines.forEach((l) => {
        ['pa', 'pb'].forEach((s) => {
          let e = Math.min(r, l.lim[s]);
          if (l.bounce[s] != null) {
            const u = t - l.bounce[s];
            e -= 16 * k * Math.exp(-6 * u) * Math.abs(Math.sin(14 * u));
          }
          const p = tip(l, s, Math.max(0, e));
          const from = s === 'pa' ? l.a : l.b;
          l.ext[s].setAttribute('x1', from[0]); l.ext[s].setAttribute('y1', from[1]);
          l.ext[s].setAttribute('x2', p[0]); l.ext[s].setAttribute('y2', p[1]);
          moveScreen(l.head[s], p);
          if (l.fit[s]) fitPts.push(p);
        });
      });
      crosses.forEach((o) => { if (o.crashed != null) fitPts.push(o.X); });
      const c = fitCam(fitPts, 1 + (zMax - 1) * easeInOut(clamp01((t - D0) / parDur)));
      setCam(c);
      grid(c.w / base.w);
      gauges();
      if (t < tEnd) { raf = requestAnimationFrame(frame); return; }
      run.done = true;
      L.gauges.classList.add('gp-gauges-done');
      summary(true);
      // kết quả trên hình của bài (không tính hình "Thử thêm"): [quan hệ, cạnh mốc, cạnh so]
      if (scene === scenes[0] && onResult) {
        onResult([
          ...pars.map((o) => ['par', ref.name, o.name]),
          ...crosses.flatMap((o) => [['cross', ref.name, o.name], ...(o.perp ? [['perp', ref.name, o.name]] : [])]),
        ]);
      }
      paint();
    };
    raf = requestAnimationFrame(frame);
  }

  // DEV: trang thử scripts/geo-dev.html điều khiển trực tiếp.
  if (import.meta.env?.DEV) window.__gp = { pick: (...names) => { stop(); picked = names.filter(Boolean); paint(); }, go: () => go(), load: (i) => load(i), ready: () => !!scene };

  // Đợi lớp phủ có kích thước rồi mới dựng (chữ, chấm vẽ theo px màn hình).
  requestAnimationFrame(() => load(0));
  return overlay;
}

function injectStyles() {
  if (document.getElementById('gp-styles')) return;
  const style = document.createElement('style');
  style.id = 'gp-styles';
  style.textContent = `
    .gp-open {
      display: block; margin: 6px auto 0; padding: 4px 12px;
      border: 1.5px solid #2563EB; border-radius: 999px; background: #EFF6FF; color: #1E40AF;
      font: 700 0.85rem Quicksand, sans-serif; cursor: pointer;
    }
    .gp-open:hover { background: #DBEAFE; }
    .gw-app .gw-pin-zone .gw-card-has-img > .gp-open { grid-column: 2; }
    .gp-overlay {
      position: fixed; inset: 0; z-index: 5000; background: rgba(15, 23, 42, 0.8);
      display: flex; align-items: stretch; justify-content: center; padding: 10px;
    }
    .gp-panel {
      background: #fff; border-radius: 1rem; box-shadow: 0 10px 40px rgba(0,0,0,.35);
      width: min(1200px, 100%); height: 100%; overflow: hidden;
      padding: 0.6rem 0.8rem 0.8rem; display: flex; flex-direction: column; gap: 0.5rem;
    }
    .gp-head { flex: none; display: grid; grid-template-columns: auto 1fr auto; grid-template-areas: "title scenes close"; align-items: center; gap: 0.5rem; }
    .gp-title { grid-area: title; font: 800 1.15rem Quicksand, sans-serif; color: #1E293B; white-space: nowrap; }
    /* "Hình của bài | Thử thêm": một thanh chuyển liền khối */
    .gp-scenes { grid-area: scenes; justify-self: center; display: flex; padding: 3px; border-radius: 999px; background: #F1F5F9; }
    .gp-scenes:empty { display: none; }
    .gp-scene {
      padding: 0.35rem 1rem; border-radius: 999px; border: none; background: transparent;
      font: 700 0.9rem Quicksand, sans-serif; color: #475569; cursor: pointer; white-space: nowrap;
    }
    .gp-scene.gp-on { background: #2563EB; color: #fff; box-shadow: 0 2px 6px rgba(37,99,235,.35); }
    .gp-close {
      grid-area: close; height: 2.3rem; padding: 0 1rem; border-radius: 1.15rem; border: none; background: #10B981; color: #fff;
      font: 700 0.95rem Quicksand, sans-serif; cursor: pointer;
    }
    /* chỉ là lời dặn: chữ thường, không nền, không viền (ô bo tròn trông như nút, bé chạm vào) */
    .gp-how {
      flex: none; display: flex; flex-wrap: wrap; justify-content: center; gap: 0 1rem;
      font: 600 0.88rem/1.4 Quicksand, sans-serif; color: #64748B; text-align: center; cursor: default; user-select: none;
    }
    .gp-how b { color: #334155; }
    .gp-stage {
      position: relative; flex: 1 1 0; min-height: 0; border-radius: 0.8rem; overflow: hidden;
      background: #FBFDFF; box-shadow: inset 0 0 0 1.5px #DBEAFE;
    }
    .gp-svg { display: block; width: 100%; height: 100%; touch-action: manipulation; user-select: none; }
    .gp-seg { cursor: pointer; }
    .gp-hit { stroke: transparent; stroke-width: 30; stroke-linecap: round; }
    .gp-line { stroke: ${INK}; stroke-width: 4; stroke-linecap: round; }
    .gp-seg:hover .gp-line { stroke: #64748B; }
    .gp-pk .gp-line { stroke: var(--gp-c); stroke-width: 8; }
    .gp-nudge .gp-seg:not(.gp-pk) .gp-line { animation: gp-blink .5s ease-in-out 3; }
    @keyframes gp-blink { 50% { stroke: #F59E0B; stroke-width: 9; } }
    .gp-extline { stroke-width: 4; stroke-dasharray: 10 8; stroke-linecap: round; }
    /* song song: vạch đứt chạy mãi ra xa */
    .gp-extline.gp-forever { animation: gp-march .6s linear infinite; }
    @keyframes gp-march { to { stroke-dashoffset: -18; } }
    .gp-label {
      font: 700 24px Quicksand, sans-serif; fill: ${INK}; text-anchor: middle;
      stroke: #fff; stroke-width: 6; paint-order: stroke; pointer-events: none;
    }
    .gp-gauge { stroke: #64748B; stroke-width: 2; stroke-dasharray: 3 4; }
    .gp-pill { fill: #fff; stroke-width: 2.5; }
    .gp-gauges-done .gp-pill-same { fill: #ECFDF5; }
    .gp-pilltext { font: 800 15px Quicksand, sans-serif; fill: #1E293B; text-anchor: middle; }
    .gp-ring { fill: none; stroke: #DC2626; stroke-width: 3; transform-box: fill-box; transform-origin: center; animation: gp-ring 1.4s ease-out infinite; }
    @keyframes gp-ring { from { transform: scale(1); opacity: .9; } to { transform: scale(3.2); opacity: 0; } }
    .gp-star { transform-box: fill-box; transform-origin: center; animation: gp-pop 1.6s ease-out forwards; }
    .gp-star-calm { animation: gp-fade 2.6s ease-out forwards; }
    @keyframes gp-pop {
      0% { transform: scale(.2) rotate(-20deg); opacity: 1; }
      18% { transform: scale(1.25) rotate(6deg); opacity: 1; }
      32% { transform: scale(1) rotate(0); opacity: 1; }
      75% { opacity: 1; }
      100% { transform: scale(1.1); opacity: 0; }
    }
    @keyframes gp-fade { 0% { opacity: 0; } 10% { opacity: 1; } 75% { opacity: 1; } 100% { opacity: 0; } }
    .gp-right { fill: none; stroke: #10B981; stroke-width: 4; stroke-linejoin: miter; }
    .gp-perp { color: #047857; font-weight: 800; white-space: nowrap; }
    .gp-notperp { color: #64748B; font-weight: 700; white-space: nowrap; }
    .gp-bop { font: 900 19px Quicksand, sans-serif; fill: #DC2626; text-anchor: middle; }
    .gp-spark { stroke-width: 5; stroke-linecap: round; animation: gp-spark .55s ease-out forwards; }
    @keyframes gp-spark { from { transform: translateX(-12px); opacity: 1; } to { transform: translateX(34px); opacity: 0; } }
    .gp-shake { animation: gp-shake .28s linear; }
    @keyframes gp-shake {
      20% { transform: translate(-6px, 3px); } 40% { transform: translate(5px, -4px); }
      60% { transform: translate(-4px, -2px); } 80% { transform: translate(3px, 2px); }
    }
    .gp-verdict {
      position: absolute; left: 50%; top: 10px; transform: translateX(-50%);
      width: max-content; max-width: calc(100% - 20px); text-align: center;
      padding: 0.5rem 1rem; border-radius: 0.9rem; background: #fff; box-shadow: 0 4px 14px rgba(15,23,42,.18);
      font: 700 1.1rem/1.35 Quicksand, sans-serif; color: #1E293B; visibility: hidden; pointer-events: none;
    }
    .gp-verdict.gp-show { visibility: visible; }
    .gp-verdict.gp-good { box-shadow: 0 0 0 3px #10B981, 0 4px 14px rgba(15,23,42,.18); }
    .gp-verdict.gp-bad { box-shadow: 0 0 0 3px #DC2626, 0 4px 14px rgba(15,23,42,.18); }
    .gp-verdict.gp-mix { box-shadow: 0 0 0 3px #2563EB, 0 4px 14px rgba(15,23,42,.18); text-align: left; }
    .gp-verdict.gp-ask { box-shadow: 0 0 0 3px #F59E0B, 0 4px 14px rgba(15,23,42,.18); }
    .gp-bar { flex: none; display: flex; align-items: center; justify-content: center; gap: 0.7rem; flex-wrap: wrap; }
    .gp-picked { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.35rem; font: 700 1rem Quicksand, sans-serif; color: #64748B; }
    .gp-acts { display: flex; align-items: center; gap: 0.6rem; }
    .gp-chip {
      min-width: 3.4rem; text-align: center; padding: 0.35rem 0.6rem; border-radius: 0.7rem;
      font: 800 1.3rem Quicksand, sans-serif; color: #fff;
    }
    .gp-chip.gp-empty { background: #fff; color: #94A3B8; box-shadow: inset 0 0 0 2px #CBD5E1; }
    .gp-go {
      min-width: 12rem; padding: 0.7rem 1.6rem; border: none; border-radius: 1rem;
      background: #94A3B8; color: #fff; font: 800 1.35rem Quicksand, sans-serif; cursor: pointer;
      box-shadow: 0 5px 0 #64748B;
    }
    .gp-go.gp-ready { background: #2563EB; box-shadow: 0 5px 0 #1E40AF; animation: gp-bob 1.4s ease-in-out infinite; }
    .gp-go:active { transform: translateY(4px); box-shadow: 0 1px 0 #1E40AF; }
    @keyframes gp-bob { 50% { transform: translateY(-3px); } }
    .gp-reset {
      width: 3rem; height: 3rem; border-radius: 50%; border: 2px solid #CBD5E1; background: #fff;
      font: 800 1.4rem Quicksand, sans-serif; color: #334155; cursor: pointer;
    }
    @media (max-width: 560px) {
      .gp-head { grid-template-columns: 1fr auto; grid-template-areas: "title close" "scenes scenes"; row-gap: 0.4rem; }
      .gp-title { font-size: 1.05rem; }
      .gp-scenes { justify-self: stretch; }
      .gp-scene { flex: 1 1 0; padding: 0.4rem 0.5rem; font-size: 0.9rem; }
      .gp-close { height: 2.1rem; padding: 0 0.8rem; }
      .gp-how { font-size: 0.8rem; }
      .gp-bar { flex-direction: column; gap: 0.45rem; }
      .gp-go { min-width: 0; flex: 1 1 auto; }
      .gp-acts { align-self: stretch; }
      .gp-acts .gp-go { flex: 1 1 auto; }
    }
    @media (prefers-reduced-motion: reduce) {
      .gp-go.gp-ready { animation: none; }
      .gp-ring { animation-duration: 2.4s; }
      .gp-extline.gp-forever { animation-duration: 1.6s; }
    }
  `;
  document.head.appendChild(style);
}
