/**
 * 📋 Dãy số liệu (Toán 4 Bài 49): mỗi số liệu là một thẻ to (tên: ngày / bạn, số, đơn vị), xếp theo thứ tự ghi chép.
 *   - chạm thẻ: sự kiện 'tap' (chọn số lớn nhất, bé nhất, số thứ mấy, các số lớn hơn …);
 *   - sortable: kéo thẻ thả lên thẻ khác, hoặc chạm hai thẻ, để đổi chỗ (sắp xếp từ bé đến lớn …), sự kiện 'swap';
 *   - dòng "Dãy số liệu: 1, 2, 2, 2, 3" dưới các thẻ, có thể kèm dấu so sánh giữa hai số liền nhau (sắp xếp);
 *   - số thứ tự (1, 2, 3 …) ở góc thẻ khi cần hỏi "số thứ mấy".
 * Vùng thẻ chia đều chỗ trống (tới 10 thẻ; màn dọc nhiều thẻ thì hai hàng), chữ số to theo ô.
 */

import { css, emitter, INK, EDGE, sfx } from './frame.js';
import { calmMotion } from '../grade3Games/fly.js';
import { fmt } from './num.js';

export const ORD = ['nhất', 'hai', 'ba', 'tư', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười'];
/** "số thứ ba", "số thứ nhất". */
export const ordName = (i) => `số thứ ${ORD[i]}`;

const ms = (n) => (calmMotion() ? Math.round(n * 0.8) : n);

/**
 * items: [{ label, value, color? }]; unit: đơn vị viết sau mỗi số (km, bàn, phút …).
 * opts: sortable, ordinals (hiện số thứ tự), seq (hiện dòng dãy số liệu), signs (dấu so sánh trong dòng dãy),
 *       hidden (mọi số đang là "?"), explore (chừa đáy cho nút chọn của Khám phá).
 */
export function createStats(host, items, { unit = '', sortable = false, ordinals = false, seq = true, signs = false, hidden = false, explore = false, seqLabel = 'Dãy số liệu' } = {}) {
  injectStatsStyles();
  const t = emitter({});
  const data = items.map((it, k) => ({ ...it, k, hidden }));
  const n = data.length;
  host.innerHTML = `<div class="g4st ${explore ? 'g4st-ex' : ''}">
      <div class="g4st-cap">&nbsp;</div>
      <div class="g4st-row"><div class="g4st-grid"></div></div>
      <div class="g4st-seq">&nbsp;</div>
    </div>`;
  const root = host.querySelector('.g4st');
  const grid = root.querySelector('.g4st-grid');
  const seqEl = root.querySelector('.g4st-seq');
  const digits = Math.max(1.6, ...data.map(d => fmt(d.value).length * (d.value >= 1000 ? 0.9 : 1)));
  const labLen = Math.max(3, ...data.map(d => String(d.label).length));
  grid.style.setProperty('--n', n);
  grid.style.setProperty('--d', digits);
  grid.style.setProperty('--ld', labLen);
  grid.innerHTML = data.map((_, i) => `<button type="button" class="g4st-card" data-i="${i}"><span class="g4st-ord">${i + 1}</span><span class="g4st-lab"></span><span class="g4st-num"></span><span class="g4st-unit">${unit}</span></button>`).join('');
  const cards = [...grid.querySelectorAll('.g4st-card')];
  // Lưới thẻ theo đúng tỉ lệ chỗ trống: thử 1–3 hàng, chọn cách cho thẻ to nhất (thẻ đứng, rộng ~ 3/4 cao).
  const rowEl = root.querySelector('.g4st-row');
  const layout = () => {
    const W = rowEl.clientWidth, H = rowEl.clientHeight;
    if (!W || !H) return;
    let best = null;
    for (let r = 1; r <= Math.min(3, n); r++) {
      const c = Math.ceil(n / r), w = W / c, h = H / r;
      const score = Math.min(w, h * 0.78);
      if (!best || score > best.score * 1.04) best = { r, c, score };
    }
    grid.style.gridTemplateColumns = `repeat(${best.c}, minmax(0, 1fr))`;
    grid.style.gridTemplateRows = `repeat(${best.r}, minmax(0, 1fr))`;
    grid.style.setProperty('--cols', best.c);
    grid.style.setProperty('--rows', best.r);
    grid.style.height = `${Math.min(H, best.r * (W / best.c) * 1.9)}px`;
  };
  layout();
  const ro = new ResizeObserver(() => { if (!root.isConnected) { ro.disconnect(); return; } layout(); });
  ro.observe(rowEl);
  let locked = false, picked = -1, showSigns = signs, showSeq = seq, signDir = 'asc';
  root.classList.toggle('g4st-ords', ordinals);
  root.classList.toggle('g4st-sortable', sortable);

  const paint = (i) => {
    const d = data[i], c = cards[i];
    c.querySelector('.g4st-lab').textContent = d.label;
    c.querySelector('.g4st-num').textContent = d.hidden ? '?' : fmt(d.value);
    c.classList.toggle('g4st-hid', !!d.hidden);
    c.style.setProperty('--hue', d.color || '#DBEAFE');
  };
  const paintSeq = () => {
    if (!showSeq) { seqEl.innerHTML = '&nbsp;'; return; }
    const parts = data.map((d, i) => {
      const v = d.hidden ? '…' : fmt(d.value);
      if (!showSigns || i === n - 1) return `<span class="g4st-sv">${v}</span>`;
      const a = d.value, b = data[i + 1].value;
      const s = a < b ? '<' : a > b ? '>' : '=';
      return `<span class="g4st-sv">${v}</span><span class="g4st-sg g4st-sg-${s === (signDir === 'asc' ? '>' : '<') ? 'bad' : 'ok'}">${s}</span>`;
    });
    seqEl.innerHTML = `<span class="g4st-sl">${seqLabel}:</span> ${showSigns ? parts.join(' ') : parts.join('<span class="g4st-cm">,</span> ')}${unit ? ` <span class="g4st-su">(${unit})</span>` : ''}`;
  };
  data.forEach((_, i) => paint(i));
  paintSeq();

  t.root = root;
  t.cards = cards;
  t.n = n;
  t.values = () => data.map(d => d.value);
  t.items = () => data.map(d => ({ ...d }));
  t.labels = () => data.map(d => d.label);
  t.caption = (html) => { root.querySelector('.g4st-cap').innerHTML = html || '&nbsp;'; };
  t.lock = (v = true) => { locked = v; root.classList.toggle('g4st-locked', v); if (v) unpick(); };
  t.sortable = (v = true) => { sortable = v; root.classList.toggle('g4st-sortable', v); unpick(); };
  t.ordinals = (v = true) => root.classList.toggle('g4st-ords', v);
  t.signs = (v = true, dir = 'asc') => { showSigns = v; signDir = dir; paintSeq(); };
  t.seq = (v = true) => { showSeq = v; paintSeq(); };
  /** Đánh dấu thẻ: 'max' | 'min' | 'sel' | 'ok' | 'bad' | 'dim' | '' (bỏ). */
  t.mark = (i, cls = '') => {
    const c = cards[i];
    ['max', 'min', 'sel', 'ok', 'bad', 'dim'].forEach(x => c.classList.toggle(`g4st-${x}`, x === cls));
  };
  t.marked = (cls) => cards.map((c, i) => (c.classList.contains(`g4st-${cls}`) ? i : -1)).filter(i => i >= 0);
  t.clearMarks = () => cards.forEach((_, i) => t.mark(i, ''));
  t.pulse = (i) => { cards[i].animate([{ transform: 'none' }, { transform: 'scale(1.08)' }, { transform: 'none' }], { duration: ms(420) }); };
  /** Hiện số của thẻ i (thẻ lật). */
  t.reveal = async (i) => {
    const c = cards[i];
    await c.animate([{ transform: 'none' }, { transform: 'rotateY(90deg)' }], { duration: ms(170), easing: 'ease-in' }).finished;
    data[i].hidden = false;
    paint(i); paintSeq();
    sfx.pop(i);
    await c.animate([{ transform: 'rotateY(-90deg)' }, { transform: 'none' }], { duration: ms(200), easing: 'ease-out' }).finished;
  };
  t.revealAll = () => { data.forEach((d, i) => { d.hidden = false; paint(i); }); paintSeq(); };
  t.hideAll = () => { data.forEach((d, i) => { d.hidden = true; paint(i); }); paintSeq(); };
  /** Dãy đã xếp đúng chưa: 'asc' từ bé đến lớn, 'desc' từ lớn đến bé. */
  t.sorted = (dir = 'asc') => data.every((d, i) => i === 0 || (dir === 'asc' ? data[i - 1].value <= d.value : data[i - 1].value >= d.value));

  function unpick() { if (picked >= 0) cards[picked]?.classList.remove('g4st-pick'); picked = -1; }

  /** Đổi chỗ hai thẻ, thẻ bay sang chỗ mới. */
  t.swap = (i, j) => {
    if (i === j) return;
    const ri = cards[i].getBoundingClientRect(), rj = cards[j].getBoundingClientRect();
    [data[i], data[j]] = [data[j], data[i]];
    paint(i); paint(j); paintSeq();
    const dur = ms(340);
    cards[i].animate([{ transform: `translate(${rj.left - ri.left}px, ${rj.top - ri.top}px)` }, { transform: 'none' }], { duration: dur, easing: 'ease-out' });
    cards[j].animate([{ transform: `translate(${ri.left - rj.left}px, ${ri.top - rj.top}px)` }, { transform: 'none' }], { duration: dur, easing: 'ease-out' });
    sfx.swish();
    t.emit('swap', i, j);
  };

  t.tap = (i) => {
    if (locked) return;
    if (sortable) {
      if (picked < 0) { picked = i; cards[i].classList.add('g4st-pick'); sfx.tap(); return; }
      const a = picked;
      unpick();
      if (a !== i) t.swap(a, i);
      return;
    }
    sfx.tap();
    t.emit('tap', i);
  };

  // Kéo thả (sortable) hoặc chạm.
  let drag = null;
  grid.addEventListener('pointerdown', (e) => {
    const c = e.target.closest('.g4st-card');
    if (!c || locked) return;
    drag = { c, i: +c.dataset.i, x: e.clientX, y: e.clientY, moved: false, id: e.pointerId };
    if (sortable) c.setPointerCapture?.(e.pointerId);
  });
  grid.addEventListener('pointermove', (e) => {
    if (!drag || drag.id !== e.pointerId || !sortable) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 10) return;
    if (!drag.moved) { drag.moved = true; unpick(); drag.c.classList.add('g4st-drag'); }
    drag.c.style.transform = `translate(${dx}px, ${dy}px)`;
    const over = hit(e.clientX, e.clientY);
    cards.forEach(c => c.classList.toggle('g4st-over', c === over && c !== drag.c));
  });
  const hit = (x, y) => cards.find((c) => { const r = c.getBoundingClientRect(); return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom && c !== drag?.c; });
  const end = (e) => {
    if (!drag || drag.id !== e.pointerId) return;
    const d = drag;
    drag = null;
    cards.forEach(c => c.classList.remove('g4st-over'));
    if (!d.moved) { if (e.type === 'pointerup') t.tap(d.i); return; }
    d.c.classList.remove('g4st-drag');
    d.c.style.transform = '';
    const over = cards.find((c) => { const r = c.getBoundingClientRect(); return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom && c !== d.c; });
    if (over) t.swap(d.i, +over.dataset.i);
    else d.c.animate([{ transform: `translate(${e.clientX - d.x}px, ${e.clientY - d.y}px)` }, { transform: 'none' }], { duration: ms(260), easing: 'ease-out' });
  };
  grid.addEventListener('pointerup', end);
  grid.addEventListener('pointercancel', end);
  return t;
}

let styled = false;
function injectStatsStyles() {
  if (styled) return;
  styled = true;
  css('g4-stats', `
    .g4st { flex: 1 1 0; min-height: 0; container: g4st / size; display: flex; flex-direction: column; gap: 1.6cqh; box-sizing: border-box; padding: 1cqh 1cqi; }
    .g4st-ex { padding-bottom: 19cqh; }
    .g4st-cap { flex: none; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(7cqh, 4cqi); line-height: 1.25; min-height: 1.25em; }
    .g4st-cap b { color: #DC2626; }
    .g4st-row { flex: 1 1 0; min-height: 0; container-type: size; display: flex; }
    .g4st-grid { flex: 1; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); grid-template-rows: minmax(0, 1fr); gap: 2.4cqh 1.8cqi; --rows: 1; --cols: var(--n);
      max-height: 100%; align-self: center; }
    .g4st-card { position: relative; min-width: 0; min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.2em; touch-action: none;
      font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; background: #fff; border: 2px solid ${EDGE}; border-radius: 0.9rem; box-shadow: 0 5px 0 ${EDGE};
      padding: 0.3em 0.15em; cursor: pointer; user-select: none; transition: background 0.2s, border-color 0.2s, box-shadow 0.2s, opacity 0.2s; }
    .g4st-card:active { box-shadow: 0 2px 0 ${EDGE}; }
    .g4st-lab { flex: none; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; background: var(--hue); border-radius: 0.5em; padding: 0.05em 0.45em; color: #334155;
      font-size: min(calc(10cqh / var(--rows)), calc(105cqi / (var(--cols) * (var(--ld) + 1.6)))); line-height: 1.25; }
    .g4st-num { flex: none; line-height: 1; color: #1D4ED8; white-space: nowrap; font-size: min(calc(42cqh / var(--rows)), calc(150cqi / (var(--cols) * var(--d)))); }
    .g4st-unit { flex: none; color: #64748B; line-height: 1.1; font-size: min(calc(8cqh / var(--rows)), calc(60cqi / (var(--cols) * 2.4))); }
    .g4st-unit:empty { display: none; }
    .g4st-hid .g4st-num { color: #CBD5E1; }
    .g4st-ord { position: absolute; left: 0.35em; top: 0.3em; display: none; align-items: center; justify-content: center; width: 1.6em; height: 1.6em; border-radius: 50%;
      background: #FFEDD5; color: #C2410C; font-size: min(calc(6cqh / var(--rows)), calc(40cqi / var(--cols))); line-height: 1; }
    .g4st-ords .g4st-ord { display: flex; }
    .g4st-max { background: #FEF2F2; border-color: #F87171; box-shadow: 0 5px 0 #F87171; }
    .g4st-max .g4st-num { color: #DC2626; }
    .g4st-min { background: #EFF6FF; border-color: #60A5FA; box-shadow: 0 5px 0 #3B82F6; }
    .g4st-sel { background: #FEF9C3; border-color: #F59E0B; box-shadow: 0 5px 0 #D97706; }
    .g4st-ok { background: #DCFCE7; border-color: #4ADE80; box-shadow: 0 5px 0 #16A34A; }
    .g4st-ok .g4st-num { color: #15803D; }
    .g4st-bad { background: #FEE2E2; border-color: #FCA5A5; box-shadow: 0 5px 0 #F87171; }
    .g4st-dim { opacity: 0.45; }
    .g4st-pick { transform: translateY(-8%); border-color: #F59E0B; box-shadow: 0 10px 0 #FCD34D; background: #FFFBEB; }
    .g4st-drag { z-index: 5; transition: none; box-shadow: 0 14px 24px rgba(15,23,42,0.25); cursor: grabbing; }
    .g4st-over { border-color: #F59E0B; background: #FFFBEB; }
    .g4st-sortable .g4st-card { cursor: grab; }
    .g4st-locked .g4st-card { cursor: default; }
    .g4st-seq { flex: none; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #334155; font-size: min(8cqh, 4.6cqi); line-height: 1.25; min-height: 1.25em; text-wrap: balance; }
    .g4st-sl { color: #64748B; font-weight: 700; }
    .g4st-sv { color: #1D4ED8; white-space: nowrap; }
    .g4st-su { color: #64748B; font-weight: 700; }
    .g4st-cm { color: #94A3B8; }
    .g4st-sg { display: inline-block; min-width: 0.9em; color: #16A34A; }
    .g4st-sg-bad { color: #DC2626; }
    @container g4st (orientation: portrait) {
      .g4st-cap { font-size: min(5cqh, 6.6cqi); }
      .g4st-seq { font-size: min(5cqh, 6.4cqi); }
    }
    @media (prefers-reduced-motion: reduce) { .g4st-card { transition: background 0.3s, border-color 0.3s; } }
  `);
}
