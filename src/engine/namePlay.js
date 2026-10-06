/**
 * 🔤 Đỉnh, cạnh (q.namePlay): bé chạm vào một hình trong bảng, hình mở to; chạm lần lượt các ĐỈNH rồi các CẠNH.
 * Chạm tới đâu, tên bay xuống dải "Các đỉnh" / "Các cạnh" và điền ngay vào ô của bảng tới đó (như đồ dùng
 * hình học, geoTools.js); bé vẫn sửa được, vẫn bấm Kiểm tra như thường.
 *   - Bước ① đỉnh: chấm tròn ở mỗi đỉnh. Chạm trúng cạnh thì nhắc "đỉnh là điểm ở góc".
 *   - Bước ②, cạnh: chạm một cạnh, hoặc chạm hai đỉnh liền nhau. Hai đỉnh không liền nhau (đường chéo):
 *     nét đứt đỏ hiện rồi tắt, "không phải cạnh".
 *   - Hình mẫu (sample): chạm thì máy làm mẫu một lượt, không điền gì.
 *   - Giọng đọc: mỗi lần chạm đọc tên ("đỉnh em-mờ", "cạnh ca em-mờ"), lời nhắc, lời khen đọc cả câu,
 *     để bé vừa nhìn, vừa nghe, vừa làm. Nút 🔊 tắt/bật (chung với giọng của sách mầm non).
 *
 * q.namePlay = { shapes: [{ col: 1, img, points: { S: [300, 85], … }, order: 'SAC', verts: [r, c], sides: [r, c], sample? }] }
 *   col: thứ tự hình trong hàng tiêu đề của bảng; points theo viewBox của img; order: các đỉnh đi vòng quanh hình
 *   (tên cạnh theo chiều này: SA, AC, CS); verts / sides: ô của bảng (data-r, data-c) để điền.
 * Kết quả giữ theo câu (MEMO) nên đóng rồi mở lại vẫn còn.
 */

import { figureBox } from './geoTools.js';
import { flyOne, calmMotion } from '../games/grade3Games/fly.js';
import { say as rawSay, stopSpeaking, isMuted, setMuted } from '../games/preschool/fx.js';
import { isEnglish } from './i18n.js';
import { speakableVi } from './letterNames.js';

const NS = 'http://www.w3.org/2000/svg';
const INK = '#1E293B';
const VCOL = '#7C3AED'; // đỉnh
const SCOL = '#EA580C'; // cạnh
const MEMO = new WeakMap();
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
let actx = null;
function tone(freqs, { gap = 0.09, dur = 0.2, vol = 0.16, type = 'sine' } = {}) {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
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
const soundPick = (n) => tone([523 + n * 70], { dur: 0.15 });
const soundNo = () => tone([220, 180], { type: 'triangle', gap: 0.12, dur: 0.18, vol: 0.13 });
const soundStep = () => tone([523, 659, 784], { gap: 0.09, dur: 0.25 });
const soundDone = () => tone([523, 659, 784, 1046], { gap: 0.1, dur: 0.3 });

// ── nút trên hình của bảng ──
export function attachNamePlay(root, q) {
  const cfg = q.namePlay;
  if (!cfg) return;
  injectStyles();
  const imgs = [...root.querySelectorAll('#gw-table thead img')];
  cfg.shapes.forEach((shape) => {
    const img = imgs[shape.col];
    const th = img?.closest('th');
    if (!th) return;
    th.classList.add('np-th');
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `np-open${shape.sample ? ' np-open-sample' : ''}`;
    b.textContent = shape.sample ? '👀 Mẫu' : '👆 Chạm';
    b.title = shape.sample ? 'Xem mẫu: chạm đỉnh, rồi chạm cạnh' : 'Chạm các đỉnh, rồi chạm các cạnh của hình';
    th.appendChild(b);
    const open = () => openNamePlay(root, q, shape);
    b.onclick = open;
    img.classList.add('np-img');
    img.addEventListener('click', (e) => { e.stopPropagation(); open(); });
  });
}

const memoOf = (q, shape) => {
  let m = MEMO.get(q);
  if (!m) MEMO.set(q, (m = new Map()));
  if (!m.has(shape)) m.set(shape, { verts: [], sides: [] });
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

export function openNamePlay(root, q, shape) {
  injectStyles();
  const sample = !!shape.sample;
  const P = shape.points;
  const order = [...shape.order];
  const sides = order.map((v, i) => [v, order[(i + 1) % order.length]]);
  const sideName = (s) => s.join('');
  const memo = sample ? { verts: [], sides: [] } : memoOf(q, shape);
  const filled = new Set();

  const overlay = document.createElement('div');
  overlay.className = 'np-overlay';
  overlay.innerHTML = `
    <div class="np-panel" role="dialog" aria-label="Đỉnh, cạnh của hình">
      <div class="np-head">
        <div class="np-steps">
          <span class="np-step" data-s="0">① Chạm các <b>đỉnh</b></span>
          <span class="np-step" data-s="1">② Chạm các <b>cạnh</b></span>
        </div>
        <button type="button" class="np-mute" title="Tắt / bật giọng đọc"></button>
        <button type="button" class="np-close">✓ Xong</button>
      </div>
      <div class="np-stage">
        <svg class="np-svg" preserveAspectRatio="xMidYMid meet"></svg>
        <div class="np-say"><span>&nbsp;</span></div>
      </div>
      <div class="np-bar">
        <div class="np-row"><span class="np-lbl" style="--c:${VCOL}">Các đỉnh:</span><span class="np-chips" data-k="verts"></span></div>
        <div class="np-row"><span class="np-lbl" style="--c:${SCOL}">Các cạnh:</span><span class="np-chips" data-k="sides"></span></div>
        <button type="button" class="np-reset" title="Làm lại" ${sample ? 'hidden' : ''}>↺</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const svg = overlay.querySelector('.np-svg');
  const sayBox = overlay.querySelector('.np-say');
  const chips = { verts: overlay.querySelector('[data-k="verts"]'), sides: overlay.querySelector('[data-k="sides"]') };
  const timers = new Set();
  const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); if (overlay.isConnected) fn(); }, ms); timers.add(t); };

  const close = () => {
    timers.forEach(clearTimeout);
    stopSpeaking();
    overlay.remove();
    document.removeEventListener('keydown', onKey);
    filled.forEach((e) => { e.classList.remove('np-filled'); void e.offsetWidth; e.classList.add('np-filled'); });
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  overlay.querySelector('.np-close').onclick = close;

  const muteBtn = overlay.querySelector('.np-mute');
  const paintMute = () => { muteBtn.textContent = isMuted() ? '🔇' : '🔊'; };
  paintMute();
  muteBtn.onclick = () => { setMuted(!isMuted()); paintMute(); if (!isMuted()) speak(sayBox.textContent); };
  /** Lời nhắc trên hình, đọc to luôn. `voice`: câu đọc khác chữ hiện (ngắn hơn khi bé chạm nhanh); false = không đọc. */
  const say = (html, cls = '', { voice, queue = false } = {}) => {
    sayBox.className = `np-say${html ? ' np-show' : ''} ${cls}`;
    sayBox.innerHTML = `<span>${html || '&nbsp;'}</span>`;
    if (voice !== false) speak(voice ?? html, { queue });
  };
  const ppu = () => svg.getScreenCTM()?.a || 1;
  // nhóm ngoài mang translate; hiệu ứng nảy chạy ở nhóm trong (.np-in) không có transform, để tâm phóng là
  // chính điểm đó (CSS scale trên thẻ có transform="translate…" phóng quanh gốc SVG, hình bay ra xa)
  const screenAt = (at, parent, attrs = {}) => {
    const g = el('g', attrs, parent);
    g.setAttribute('transform', `translate(${at[0]} ${at[1]}) scale(${1 / ppu()})`);
    return el('g', { class: 'np-in' }, g);
  };
  const bump = (g) => { const i = g.querySelector('.np-in'); i.classList.remove('np-bump'); void i.getBBox(); i.classList.add('np-bump'); };
  const mid = (a, b) => [(P[a][0] + P[b][0]) / 2, (P[a][1] + P[b][1]) / 2];
  const cen = order.reduce((s, n) => [s[0] + P[n][0] / order.length, s[1] + P[n][1] / order.length], [0, 0]);
  const toScreen = (pt) => {
    const m = svg.getScreenCTM();
    return { left: m.a * pt[0] + m.c * pt[1] + m.e, top: m.b * pt[0] + m.d * pt[1] + m.f };
  };

  let step = 0;
  let firstV = null; // bước cạnh: đỉnh vừa chạm, chờ đỉnh thứ hai
  let L = null;

  function setStep(s) {
    step = s;
    overlay.querySelectorAll('.np-step').forEach((x) => {
      x.classList.toggle('np-on', +x.dataset.s === s);
      x.classList.toggle('np-done', +x.dataset.s < s || s === 2);
    });
    overlay.querySelector('.np-panel').dataset.step = String(s);
  }

  function paintChips() {
    chips.verts.innerHTML = memo.verts.length ? memo.verts.map((v) => `<span class="np-chip" style="--c:${VCOL}">${v}</span>`).join('') : '<span class="np-chip np-empty">chưa có</span>';
    chips.sides.innerHTML = memo.sides.length ? memo.sides.map((s) => `<span class="np-chip" style="--c:${SCOL}">${s}</span>`).join('') : '<span class="np-chip np-empty">chưa có</span>';
  }
  function fill() {
    if (sample) return;
    if (memo.verts.length) { const e = fillCell(root, shape.verts, memo.verts.join(', ')); if (e) filled.add(e); }
    if (memo.sides.length) { const e = fillCell(root, shape.sides, memo.sides.join(', ')); if (e) filled.add(e); }
  }
  /** Tên bay từ hình xuống dải dưới; dải hiện chip khi tên tới nơi. */
  function flyName(text, from, kind, color) {
    const host = chips[kind];
    host.querySelector('.np-empty')?.remove();
    const chip = document.createElement('span');
    chip.className = 'np-chip';
    chip.style.setProperty('--c', color);
    chip.textContent = text;
    chip.style.visibility = 'hidden';
    host.appendChild(chip);
    const to = chip.getBoundingClientRect();
    const fr = { left: from.left - to.width / 2, top: from.top - to.height / 2, width: to.width, height: to.height };
    const ms = flyOne(`<span class="np-chip np-fly" style="--c:${color}">${text}</span>`, fr, to, { minMs: 380, maxMs: 650 });
    later(() => { chip.style.visibility = ''; chip.classList.add('np-pop'); }, ms);
  }

  function build() {
    svg.replaceChildren();
    L = { sides: el('g', {}, svg), marks: el('g', {}, svg), hit: el('g', {}, svg), top: el('g', {}, svg) };
    // cạnh: vùng chạm dày dọc cạnh (bước ②)
    sides.forEach((s) => {
      const [a, b] = s;
      const g = el('g', { class: 'np-side', 'data-s': sideName(s) }, L.sides);
      el('line', { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], class: 'np-side-hit', 'stroke-width': 34 / ppu() }, g);
      el('line', { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], class: 'np-side-line', 'stroke-width': 9 / ppu() }, g);
      g.addEventListener('click', () => tapSide(s));
    });
    // đỉnh: vòng tròn chạm (cả hai bước)
    order.forEach((v) => {
      const inner = screenAt(P[v], L.hit, { class: 'np-vert', 'data-v': v });
      el('circle', { r: 28, class: 'np-vert-hit' }, inner);
      el('circle', { r: 15, class: 'np-vert-ring' }, inner);
      el('circle', { r: 7, class: 'np-vert-dot' }, inner);
      const g = inner.parentNode;
      g.addEventListener('click', (e) => { e.stopPropagation(); tapVert(v); });
    });
    memo.verts.forEach((v) => markVert(v, false));
    memo.sides.forEach((n) => markSide(sides.find((s) => sideName(s) === n), false));
  }

  function markVert(v, anim = true) {
    const g = L.hit.querySelector(`[data-v="${v}"]`);
    g.classList.add('np-got');
    if (anim) bump(g);
  }
  function markSide(s, anim = true) {
    const g = L.sides.querySelector(`[data-s="${sideName(s)}"]`);
    g.classList.add('np-got');
    // nhãn tên cạnh ở giữa cạnh, đẩy ra phía ngoài hình
    const m = mid(...s);
    const out = [m[0] - cen[0], m[1] - cen[1]];
    const d = Math.hypot(...out) || 1;
    const at = [m[0] + (out[0] / d) * 34 / ppu(), m[1] + (out[1] / d) * 34 / ppu()];
    const tag = screenAt(at, L.top, { class: 'np-tag' });
    if (anim) tag.classList.add('np-tag-in');
    const name = sideName(s);
    const w = 18 + name.length * 13;
    el('rect', { x: -w / 2, y: -17, width: w, height: 34, rx: 17, fill: '#fff', stroke: SCOL, 'stroke-width': 3 }, tag);
    el('text', { y: 7.5, class: 'np-tagtext', fill: SCOL }, tag).textContent = name;
  }

  function tapVert(v) {
    if (step === 0) {
      if (memo.verts.includes(v)) {
        soundNo();
        say(`Đỉnh <b>${v}</b> em đã chạm rồi.`, 'np-ask');
        markVert(v);
        return;
      }
      memo.verts.push(v);
      soundPick(memo.verts.length);
      markVert(v);
      flyName(v, toScreen(P[v]), 'verts', VCOL);
      fill();
      if (memo.verts.length < order.length) {
        say(`Đỉnh <b>${v}</b>. Còn ${order.length - memo.verts.length} đỉnh nữa.`, 'np-good', { voice: `Đỉnh ${v}.` });
      } else {
        say(`Hình có <b>${order.length} đỉnh</b>: ${memo.verts.join(', ')}.`, 'np-good');
        soundStep();
        later(() => toSides(), 1300);
      }
      return;
    }
    if (step !== 1) return;
    // bước cạnh: hai đỉnh liền nhau là một cạnh
    const g = L.hit.querySelector(`[data-v="${v}"]`);
    if (!firstV) {
      firstV = v;
      g.classList.add('np-sel');
      say(`Đỉnh <b>${v}</b>. Chạm đỉnh thứ hai của cạnh.`, 'np-ask', { voice: `Đỉnh ${v}.` });
      soundPick(0);
      return;
    }
    const a = firstV;
    L.hit.querySelector(`[data-v="${a}"]`)?.classList.remove('np-sel');
    firstV = null;
    if (a === v) { say('', '', { voice: false }); return; }
    const s = sides.find(([x, y]) => (x === a && y === v) || (x === v && y === a));
    if (s) { tapSide(s); return; }
    // đường chéo: nét đứt đỏ hiện rồi tắt
    soundNo();
    const ln = el('line', { x1: P[a][0], y1: P[a][1], x2: P[v][0], y2: P[v][1], class: 'np-diag', 'stroke-width': 6 / ppu() }, L.marks);
    later(() => ln.remove(), 1600);
    say(`<b>${a}${v}</b> không phải cạnh: nó đi xuyên qua giữa hình. Cạnh là đường viền nối hai đỉnh <b>liền nhau</b>.`, 'np-bad');
  }

  function tapSide(s) {
    if (step === 0) {
      soundNo();
      say('Đỉnh là <b>điểm ở góc</b> của hình. Chạm vào chấm tròn.', 'np-ask');
      L.hit.querySelectorAll('.np-vert:not(.np-got)').forEach(bump);
      return;
    }
    if (step !== 1) return;
    if (firstV) { L.hit.querySelector(`[data-v="${firstV}"]`)?.classList.remove('np-sel'); firstV = null; }
    const name = sideName(s);
    if (memo.sides.includes(name)) {
      soundNo();
      say(`Cạnh <b>${name}</b> em đã chạm rồi.`, 'np-ask');
      const g = L.sides.querySelector(`[data-s="${name}"]`);
      g.classList.remove('np-blink'); void g.getBBox(); g.classList.add('np-blink');
      return;
    }
    memo.sides.push(name);
    soundPick(memo.sides.length + 3);
    markSide(s);
    flyName(name, toScreen(mid(...s)), 'sides', SCOL);
    fill();
    if (memo.sides.length < sides.length) {
      say(`Cạnh <b>${name}</b> nối đỉnh ${s[0]} với đỉnh ${s[1]}. Còn ${sides.length - memo.sides.length} cạnh nữa.`, 'np-good', { voice: `Cạnh ${name}.` });
    } else {
      soundDone();
      setStep(2);
      say(`Xong! Hình có <b>${order.length} đỉnh</b>, <b>${sides.length} cạnh</b>: ${memo.sides.join(', ')}.`, 'np-good');
    }
  }

  function toSides() {
    setStep(1);
    // đọc nối sau câu "Hình có … đỉnh", không cắt ngang
    say(sample ? '' : 'Giờ chạm từng <b>cạnh</b>. Cạnh là đoạn thẳng nối hai đỉnh liền nhau.', 'np-ask', { queue: true });
  }

  overlay.querySelector('.np-reset').onclick = () => {
    memo.verts.length = 0;
    memo.sides.length = 0;
    firstV = null;
    // ô trong bảng: xoá chữ máy đã điền
    [shape.verts, shape.sides].forEach(([r, c]) => {
      const inp = root.querySelector(`.gw-table-input[data-r="${r}"][data-c="${c}"]`);
      if (inp && !inp.disabled && inp.value) { inp.value = ''; inp.dispatchEvent(new Event('input', { bubbles: true })); }
    });
    build();
    paintChips();
    setStep(0);
    say('Chạm từng <b>đỉnh</b> của hình.', 'np-ask');
  };

  // hình mẫu: máy làm mẫu từng bước
  function demo() {
    let t = 700;
    say('Xem mẫu: chạm từng <b>đỉnh</b>…', 'np-ask');
    order.forEach((v) => { later(() => tapVert(v), t); t += 900; });
    t += 2400; // đọc xong "Hình có … đỉnh: …" rồi mới sang cạnh
    sides.forEach((s) => { later(() => tapSide(s), t); t += 1000; });
    later(() => say(`Mẫu: hình có các đỉnh <b>${memo.verts.join(', ')}</b>, các cạnh <b>${memo.sides.join(', ')}</b>.`, 'np-good', { voice: false }), t + 300);
  }

  figureBox(shape.img).then((box) => {
    const pad = Math.max(box.w, box.h) * 0.06;
    svg.setAttribute('viewBox', `${box.x - pad} ${box.y - pad} ${box.w + 2 * pad} ${box.h + 2 * pad}`);
    requestAnimationFrame(() => {
      el('image', { href: shape.img, x: box.x, y: box.y, width: box.w, height: box.h, preserveAspectRatio: 'none' }, svg);
      const img = svg.lastChild;
      build();
      svg.insertBefore(img, svg.firstChild);
      paintChips();
      const allV = memo.verts.length === order.length;
      const allS = memo.sides.length === sides.length;
      setStep(allS ? 2 : allV ? 1 : 0);
      if (sample) demo();
      else say(allS ? 'Em đã làm xong hình này.' : allV ? 'Chạm từng <b>cạnh</b> của hình.' : 'Chạm từng <b>đỉnh</b> của hình.', allS ? 'np-good' : 'np-ask');
      overlay.__np = { tapVert, tapSide }; // trang thử
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
    .np-filled { animation: npFilled 1.2s ease-out; }
    @keyframes npFilled { 0%, 40% { box-shadow: 0 0 0 4px #A78BFA; background: #F5F3FF; } }

    .np-overlay {
      position: fixed; inset: 0; z-index: 5000; background: rgba(15, 23, 42, 0.8);
      display: flex; align-items: stretch; justify-content: center; padding: 10px;
    }
    .np-panel {
      background: #fff; border-radius: 1rem; box-shadow: 0 10px 40px rgba(0,0,0,.35);
      width: min(1000px, 100%); height: 100%; overflow: hidden;
      padding: 0.6rem 0.8rem 0.8rem; display: flex; flex-direction: column; gap: 0.5rem; font-family: Quicksand, sans-serif;
    }
    .np-head { flex: none; display: flex; align-items: center; gap: 0.5rem; }
    .np-steps { flex: 1; display: flex; justify-content: center; gap: 0.4rem; flex-wrap: wrap; }
    .np-step { padding: 0.4rem 0.9rem; border-radius: 999px; background: #F1F5F9; color: #64748B; font-weight: 700; font-size: 1rem; white-space: nowrap; }
    .np-step.np-on { background: #0284C7; color: #fff; box-shadow: 0 2px 6px rgba(2,132,199,.35); }
    .np-step.np-done { background: #DCFCE7; color: #15803D; }
    .np-step.np-done::before { content: '✓ '; }
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

    .np-bar { flex: none; display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto auto; gap: 0.35rem 0.7rem; align-items: center; padding: 0 0.4rem; }
    .np-row { grid-column: 1; display: flex; align-items: center; gap: 0.5rem; min-height: 2.6rem; flex-wrap: wrap; }
    .np-lbl { font-weight: 800; font-size: 1.05rem; color: var(--c); min-width: 5.4rem; }
    .np-chips { display: flex; flex-wrap: wrap; gap: 0.35rem; }
    .np-chip { min-width: 2.4rem; text-align: center; padding: 0.3rem 0.7rem; border-radius: 0.7rem; font: 800 1.2rem Quicksand, sans-serif; color: #fff; background: var(--c); display: inline-block; }
    .np-chip.np-empty { background: #F1F5F9; color: #94A3B8; font-size: 0.95rem; font-weight: 700; }
    .np-chip.np-pop { animation: npPop .3s ease-out; }
    @keyframes npPop { 0% { transform: scale(1.35); } }
    .np-fly { position: absolute; inset: 0; display: grid; place-items: center; padding: 0; }
    .np-reset { grid-row: 1 / span 2; grid-column: 2; width: 2.8rem; height: 2.8rem; border-radius: 50%; border: 2px solid #CBD5E1; background: #fff; font-size: 1.3rem; cursor: pointer; color: #475569; }

    .np-side { cursor: pointer; }
    .np-side-hit { stroke: transparent; stroke-linecap: round; }
    .np-side-line { stroke: transparent; stroke-linecap: round; transition: stroke .2s; }
    .np-panel[data-step="1"] .np-side:not(.np-got) .np-side-line { stroke: rgba(234,88,12,0.18); }
    .np-panel[data-step="1"] .np-side:not(.np-got):hover .np-side-line { stroke: rgba(234,88,12,0.4); }
    .np-side.np-got .np-side-line { stroke: ${SCOL}; }
    .np-side.np-blink .np-side-line { animation: npBlink .5s ease-in-out 3 alternate; }
    @keyframes npBlink { to { stroke: #FDE047; } }
    .np-diag { stroke: #DC2626; stroke-dasharray: 10 8; stroke-linecap: round; }
    .np-vert { cursor: pointer; }
    .np-vert-hit { fill: transparent; }
    .np-vert-ring { fill: rgba(124,58,237,0.12); stroke: ${VCOL}; stroke-width: 3; }
    .np-vert-dot { fill: #fff; stroke: ${VCOL}; stroke-width: 3; }
    .np-panel[data-step="0"] .np-vert:not(.np-got) .np-vert-ring { animation: npRing 1.4s ease-in-out infinite; }
    @keyframes npRing { 50% { r: 21px; fill: rgba(124,58,237,0.22); } }
    .np-vert.np-got .np-vert-dot { fill: ${VCOL}; }
    .np-vert.np-got .np-vert-ring { fill: rgba(124,58,237,0.2); }
    .np-panel[data-step="1"] .np-vert .np-vert-ring, .np-panel[data-step="2"] .np-vert .np-vert-ring { fill: transparent; stroke-opacity: 0.35; }
    .np-vert.np-sel .np-vert-ring { stroke: ${SCOL}; stroke-opacity: 1 !important; fill: rgba(234,88,12,0.25) !important; stroke-width: 4; }
    .np-bump { animation: npBump .45s ease-out; transform-box: fill-box; transform-origin: center; }
    @keyframes npBump { 40% { scale: 1.5; } }
    .np-tagtext { font: 800 21px Quicksand, sans-serif; text-anchor: middle; }
    .np-tag-in { animation: npTag .35s ease-out; transform-box: fill-box; transform-origin: center; }
    @keyframes npTag { from { opacity: 0; scale: 0.4; } }
    @media (max-width: 600px) {
      .np-step { font-size: 0.88rem; padding: 0.35rem 0.6rem; }
      .np-say { font-size: 0.98rem; }
      .np-lbl { min-width: 4.6rem; font-size: 0.95rem; }
    }
    @media (prefers-reduced-motion: reduce) {
      .np-panel[data-step="0"] .np-vert:not(.np-got) .np-vert-ring { animation: none; stroke-width: 4; }
      .np-bump, .np-tag-in, .np-chip.np-pop { animation-duration: .6s; animation-timing-function: linear; }
    }
  `;
  document.head.appendChild(st);
}
