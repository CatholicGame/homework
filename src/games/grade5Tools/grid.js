/**
 * 🟩 Lưới 100 ô (Toán 5, Bài 4, 10): một hoặc vài hình vuông 10 × 10 (hoặc băng giấy 10 ô).
 * Tô theo thứ tự: hết hình vuông này sang hình vuông khác, trong mỗi hình vuông tô từng cột (1 cột = 1 phần mười),
 * trong cột tô từng ô (1 ô = 1 phần trăm). Bấm hoặc kéo trên lưới: tô tới ô đó. Nút: + 1 cột, + 1 ô, − 1 ô, Xoá.
 * Màu theo hàng (khi split): hình vuông tô kín = đơn vị (tím), cột kín = phần mười (cam), ô lẻ = phần trăm (hồng).
 * Dòng trên: phân số (57/100, 2 38/100) và số thập phân (0,57; 2,38).
 */

import { css, emitter, INK, sfx } from '../grade4Tools/frame.js';
import { calmMotion } from '../grade3Games/fly.js';
import { sleep } from '../grade3Drills/kit.js';
import { fr, mixed, decKey } from './num.js';
import { PLACE5, decHtml } from './dplace.js';

const NS = 'http://www.w3.org/2000/svg';
const S = 100; // cạnh một hình vuông (đơn vị vẽ)
const GAP = 14;

/**
 * host: phần tử chứa. grids: số hình vuông; bar: băng giấy 10 ô (mỗi ô 1 phần mười) thay cho hình vuông.
 * value: số ô tô sẵn. show: 'frac' | 'dec' | 'both' | 'none' (dòng trên). split: tô màu theo hàng.
 * buttons: hàng nút điều khiển. edit: cho bấm / kéo.
 */
export function createGrid(host, { grids = 1, bar = false, value = 0, show = 'both', split = true, buttons = true, edit = true, color = '#60A5FA' } = {}) {
  injectGridStyles();
  const t = emitter({});
  const rows = bar ? 1 : 10;
  const per = rows * 10; // ô mỗi hình
  const cap = grids * per;
  const unit = per; // mẫu số
  let n = 0, locked = !edit, mode = show;
  const btns = bar
    ? [['+ 1 phần', 1], ['− 1 phần', -1]]
    : [['+ 1 cột', 10], ['+ 1 ô', 1], ['− 1 ô', -1]];
  host.innerHTML = `
    <div class="g5g ${bar ? 'g5g-bar' : grids === 1 && (buttons || show !== 'none') ? 'g5g-one' : ''}">
      <div class="g5g-top"><div class="g5g-read">&nbsp;</div><div class="g5g-parts">&nbsp;</div></div>
      <svg class="g5g-svg" preserveAspectRatio="xMidYMid meet"></svg>
      ${buttons ? `<div class="g5g-btns">${btns.map(([l, d]) => `<button type="button" class="g5g-btn" data-d="${d}">${l}</button>`).join('')}<button type="button" class="g5g-btn g5g-clr" data-d="0">↺ Xoá</button></div>` : ''}
    </div>`;
  const root = host.querySelector('.g5g');
  const svg = root.querySelector('svg');
  const cw = S / 10, ch = bar ? 40 : S / 10; // ô vuông (băng giấy: ô chữ nhật cao)
  const gw = S, gh = rows * ch;
  const gs = [];
  for (let g = 0; g < grids; g++) {
    const grp = document.createElementNS(NS, 'g');
    let html = `<rect x="0" y="0" width="${gw}" height="${gh}" fill="#fff"/>`;
    for (let c = 0; c < 10; c++) for (let r = 0; r < rows; r++) {
      html += `<rect class="g5g-c" data-i="${g * per + c * rows + r}" x="${c * cw}" y="${r * ch}" width="${cw}" height="${ch}" fill="#fff"/>`;
    }
    for (let i = 1; i < 10; i++) html += `<line x1="${i * cw}" y1="0" x2="${i * cw}" y2="${gh}" stroke="${bar ? INK : '#94A3B8'}" stroke-width="${bar ? 0.8 : 0.5}"/>`;
    for (let i = 1; i < rows; i++) html += `<line x1="0" y1="${i * ch}" x2="${gw}" y2="${i * ch}" stroke="#CBD5E1" stroke-width="0.4"/>`;
    html += `<rect x="0" y="0" width="${gw}" height="${gh}" fill="none" stroke="${INK}" stroke-width="1.6" rx="0.6"/>`;
    grp.innerHTML = html;
    svg.append(grp);
    gs.push(grp);
  }
  const cellEls = [...svg.querySelectorAll('.g5g-c')].sort((a, b) => a.dataset.i - b.dataset.i);

  // Bố trí: chọn số hình mỗi hàng sao cho hình to nhất trong chỗ có.
  let layout = { cols: grids };
  const fit = () => {
    const r = svg.getBoundingClientRect();
    if (!r.width || !r.height) return;
    let best = null;
    for (let c = 1; c <= grids; c++) {
      const rr = Math.ceil(grids / c);
      const w = c * gw + (c - 1) * GAP, h = rr * gh + (rr - 1) * GAP;
      const k = Math.min(r.width / w, r.height / h);
      if (!best || k > best.k + 1e-6) best = { c, rr, w, h, k };
    }
    layout = { cols: best.c };
    gs.forEach((g, i) => {
      const cx = i % best.c, cy = Math.floor(i / best.c);
      // hàng cuối thiếu hình: căn giữa
      const inRow = Math.min(best.c, grids - cy * best.c);
      const off = ((best.c - inRow) * (gw + GAP)) / 2;
      g.setAttribute('transform', `translate(${off + cx * (gw + GAP)} ${cy * (gh + GAP)})`);
    });
    svg.setAttribute('viewBox', `-3 -3 ${best.w + 6} ${best.h + 6}`);
  };
  const ro = new ResizeObserver(() => { if (!svg.isConnected) { ro.disconnect(); return; } fit(); });
  ro.observe(svg);
  fit();

  /** Màu ô thứ i khi đã tô. */
  const fillOf = (i) => {
    if (!split) return color;
    const g = Math.floor(i / per);
    if ((g + 1) * per <= n) return PLACE5[0].c; // hình tô kín: đơn vị
    if (bar) return PLACE5[-1].c;
    const c = Math.floor((i % per) / rows);
    const colEnd = g * per + (c + 1) * rows;
    return colEnd <= n ? PLACE5[-1].c : PLACE5[-2].c;
  };
  function paint(prev) {
    cellEls.forEach((e, i) => {
      const on = i < n;
      e.setAttribute('fill', on ? fillOf(i) : '#fff');
    });
    // ô mới tô: nảy nhẹ
    if (n > prev) {
      const fresh = cellEls.slice(prev, n);
      const st = Math.min(40, 400 / fresh.length);
      fresh.forEach((e, k) => {
        e.style.transformBox = 'fill-box';
        e.style.transformOrigin = 'center';
        e.animate([{ transform: 'scale(0.3)', opacity: 0.4 }, { transform: 'scale(1)', opacity: 1 }], { duration: calmMotion() ? 240 : 200, delay: k * st, easing: 'ease-out', fill: 'backwards' });
      });
    }
    readout();
  }

  /** Các phần: [đơn vị, phần mười, phần trăm]. */
  t.parts = () => {
    const w = Math.floor(n / per), r = n % per;
    return bar ? [w, r, 0] : [w, Math.floor(r / 10), r % 10];
  };
  t.str = () => decKey(n / unit);
  function readout() {
    const top = root.querySelector('.g5g-read'), pt = root.querySelector('.g5g-parts');
    if (mode === 'none') { top.innerHTML = '&nbsp;'; pt.innerHTML = '&nbsp;'; return; }
    const w = Math.floor(n / per), r = n % per;
    const frac = w && grids > 1 ? (r ? mixed(w, r, unit) : String(w)) : fr(n, unit);
    const decs = decHtml(t.str());
    top.innerHTML = mode === 'frac' ? frac : mode === 'dec' ? decs : `${frac} <span class="g5g-eq">=</span> ${decs}`;
    const [u, a, b] = t.parts();
    const items = [];
    if (u || grids > 1) items.push(`<b style="color:${PLACE5[0].ink}">${u}</b> đơn vị`);
    items.push(`<b style="color:${PLACE5[-1].ink}">${a}</b> phần mười`);
    if (!bar) items.push(`<b style="color:${PLACE5[-2].ink}">${b}</b> phần trăm`);
    pt.innerHTML = mode === 'frac' ? `Đã tô <b>${n}</b> ${bar ? 'phần' : 'ô'}` : items.join(' · ');
  }

  t.root = root; t.svg = svg; t.per = per; t.cap = cap;
  Object.defineProperty(t, 'n', { get: () => n });
  Object.defineProperty(t, 'value', { get: () => n / unit });
  /** Đặt số ô tô (không chờ). */
  t.set = (k, { quiet = true } = {}) => {
    const prev = n;
    n = Math.max(0, Math.min(cap, Math.round(k)));
    paint(prev);
    if (!quiet && n !== prev) sfx.pop(Math.min(9, n % 10));
    if (n !== prev) t.emit('change', n);
  };
  /** Thầy tô dần tới k: từng hình, từng cột, rồi từng ô. */
  t.fillTo = async (k, { gap = 260 } = {}) => {
    while (n < k) {
      let step = 1;
      if (k - n >= per && n % per === 0) step = per;
      else if (!bar && k - n >= rows && n % rows === 0) step = rows;
      t.set(n + step);
      sfx.pop(Math.min(9, Math.floor(n / step) % 10));
      await sleep(calmMotion() ? gap * 1.2 : gap);
    }
  };
  t.lock = (on) => { locked = on; root.classList.toggle('g5g-locked', on); };
  t.show = (m) => { mode = m; readout(); };
  /** Viền sáng một cột (g: hình, c: cột) hoặc cả hình (c = null). null = bỏ. */
  t.glow = (g, c = null) => {
    svg.querySelector('.g5g-glow')?.remove();
    if (g == null) return;
    const r = document.createElementNS(NS, 'rect');
    r.setAttribute('class', 'g5g-glow');
    r.setAttribute('x', c == null ? -1 : c * cw); r.setAttribute('y', -1);
    r.setAttribute('width', c == null ? gw + 2 : cw); r.setAttribute('height', c == null ? gh + 2 : gh + 2);
    r.setAttribute('fill', 'none'); r.setAttribute('stroke', '#FACC15'); r.setAttribute('stroke-width', 2.4);
    gs[g].append(r);
  };
  /** Nhãn dưới cột / ô (Bài 4: 1/10, 1/100). */
  t.btn = (d) => root.querySelector(`.g5g-btn[data-d="${d}"]`);

  // Bấm / kéo: tô tới ô dưới ngón tay (bấm lại ô cuối đang tô → bỏ ô đó).
  const cellAt = (e) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    return el?.classList?.contains('g5g-c') ? +el.dataset.i : null;
  };
  let drag = false, downAt = null;
  svg.addEventListener('pointerdown', (e) => {
    if (locked) return;
    const i = cellAt(e);
    if (i == null) return;
    drag = true; downAt = i;
    svg.setPointerCapture?.(e.pointerId);
    t.set(i + 1 === n ? i : i + 1, { quiet: false });
  });
  svg.addEventListener('pointermove', (e) => {
    if (!drag || locked) return;
    const i = cellAt(e);
    if (i == null || i === downAt) return;
    downAt = -1;
    if (i + 1 !== n) t.set(i + 1, { quiet: false });
  });
  const up = () => { drag = false; };
  svg.addEventListener('pointerup', up);
  svg.addEventListener('pointercancel', up);
  root.querySelector('.g5g-btns')?.addEventListener('click', (e) => {
    const b = e.target.closest('.g5g-btn');
    if (!b || locked) return;
    const d = +b.dataset.d;
    if (d === 0) { t.set(0); sfx.tap(); return; }
    // + 1 cột: tô kín cột đang dở (hoặc thêm một cột mới)
    const next = d === 10 ? Math.min(cap, (Math.floor(n / 10) + 1) * 10) : n + d;
    if (next < 0 || next > cap) { sfx.boing?.(); return; }
    t.set(next, { quiet: false });
  });

  t.set(value);
  return t;
}

let styled = false;
function injectGridStyles() {
  if (styled) return;
  styled = true;
  css('g5-grid', `
    .g5g { flex: 1; min-height: 0; display: grid; grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr) auto; gap: 1.2cqh 2cqi; padding: 1.4cqh 1.6cqi; box-sizing: border-box; font-family: 'Baloo 2', sans-serif; color: #1E293B; }
    .g5g-top { flex: none; display: flex; flex-direction: column; align-items: center; gap: 0.2cqh; }
    .g5g-read { font-weight: 800; font-size: min(9cqh, 6cqi); line-height: 1.15; min-height: 1.6em; display: flex; align-items: center; gap: 0.3em; white-space: nowrap; }
    .g5g-read .g5-fr { font-size: 0.8em; }
    .g5g-eq { color: #64748B; }
    .g5g-parts { font-weight: 700; font-size: min(4.4cqh, 3cqi); color: #475569; line-height: 1.2; min-height: 1.2em; text-align: center; }
    .g5g-parts b { font-weight: 800; }
    .g5g-svg { min-height: 0; width: 100%; height: 100%; touch-action: none; user-select: none; }
    /* Một hình vuông, tờ giấy nằm ngang: lưới to kín chiều cao bên trái, số và nút bên phải */
    @container (min-aspect-ratio: 5/4) {
      .g5g-one { grid-template-columns: minmax(0, 1fr) minmax(0, 40cqi); grid-template-rows: minmax(0, 1fr) auto; grid-template-areas: "svg top" "svg btns"; }
      .g5g-one .g5g-svg { grid-area: svg; }
      .g5g-one .g5g-top { grid-area: top; align-self: center; }
      .g5g-one .g5g-btns { grid-area: btns; display: grid; grid-template-columns: 1fr 1fr; gap: 1.6cqh 1.2cqi; }
      .g5g-one .g5g-read { font-size: min(13cqh, 8cqi); }
      .g5g-one .g5g-parts { font-size: min(5cqh, 2.8cqi); }
      .g5g-one .g5g-btn { font-size: min(5.4cqh, 3cqi); padding: 0.35em 0.3em; }
    }
    .g5g-c { cursor: pointer; }
    .g5g-locked .g5g-c { cursor: default; }
    .g5g-btns { flex: none; display: flex; gap: 1.2cqi; justify-content: center; }
    .g5g-btn { flex: 0 1 22%; font-family: inherit; font-weight: 800; font-size: min(5cqh, 3.2cqi); padding: 0.2em 0.4em; border: 3px solid ${INK}; border-radius: 0.7em; cursor: pointer; touch-action: manipulation;
      background: ${PLACE5[-1].c}; color: #fff; text-shadow: 0 2px 0 rgba(63,58,64,0.5); box-shadow: 0 5px 0 rgba(63,58,64,0.4); white-space: nowrap; }
    .g5g-btn[data-d="1"] { background: ${PLACE5[-2].c}; }
    .g5g-btn[data-d="-1"] { background: #fff; color: #334155; text-shadow: none; }
    .g5g-bar .g5g-btn[data-d="1"] { background: ${PLACE5[-1].c}; }
    .g5g-clr { background: #E2E8F0 !important; color: #334155 !important; text-shadow: none !important; }
    .g5g-btn:active { transform: translateY(4px); box-shadow: 0 1px 0 rgba(63,58,64,0.4); }
    .g5g-locked .g5g-btn { opacity: 0.4; cursor: default; }
    @container (orientation: portrait) {
      .g5g-read { font-size: min(7cqh, 9cqi); }
      .g5g-parts { font-size: min(3.6cqh, 4.4cqi); }
      .g5g-btn { font-size: min(4cqh, 4.6cqi); flex-basis: 24%; }
    }
  `);
}
