/**
 * 🧺 Bảng đồ vật cho Khám phá Toán 1: các khu (khung 10 ô, đĩa, kệ, giỏ, ao…) trên cảnh đồng cỏ, mỗi khu là một
 * lưới ô cố định (cỡ đồ vật không đổi trong cả bài), đồ vật bay từ ô này sang ô kia (flyOne). Thanh phép tính ở
 * trên, chỗ trống cho nút chọn ở dưới: mọi vùng giữ nguyên chỗ từ đầu tới cuối, không xô lệch.
 *
 * createGroups(board, {
 *   zones: [{ id, type: 'frame' | 'plate' | 'shelf' | 'basket' | 'pond' | 'ground' | 'track', cols, rows, cap: true }],
 *   tall: { areas, cols, rows }, wide?: { areas, cols, rows }   lưới CSS của các khu (khung đứng / khung ngang)
 *   items: [{ zone, kind, ...opts }], expr: true (thanh phép tính), foot: true (chỗ nút chọn) })
 * → t: on(fn) (c.until), onTap = (item) => …, add, move, away, items, count, cap, expr, fillQ, glow, live,
 *      mark, unmark, countUp, pair, unpair, cross, shake, clear.
 */

import { css, emitter } from '../grade4Tools/frame.js';
import { flyOne } from '../grade3Games/fly.js';
import { sfx } from '../preschool/fx.js';
import { itemSvg, MEADOW, INK } from './art.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Các ô của thanh phép tính: số, dấu, '?' (ô trống chờ điền), '□' (ô dấu chờ điền). */
export function ex(...tokens) {
  return tokens.map((k) => {
    if (k === '?') return '<span class="x1g-q"></span>';
    if (k === '□') return '<span class="x1g-q x1g-qs"></span>';
    if (/^[+\-−=<>]$/.test(k)) return `<span class="x1g-s">${k === '-' ? '−' : k}</span>`;
    if (/^[^\d?]+$/.test(String(k))) return `<span class="x1g-w">${k}</span>`;
    return `<span class="x1g-n">${k}</span>`;
  }).join('');
}

export function createGroups(board, { zones, tall, wide = null, items = [], expr = true, foot = true, scene = MEADOW }) {
  injectStyles();
  // Số hàng / cột mặc định lấy theo chuỗi vùng: "'a b' 'c c'" → 2 hàng, 2 cột đều nhau.
  const grid = (g) => {
    const rows = g.areas.match(/'[^']*'/g) || ["'x'"];
    const nc = rows[0].replace(/'/g, '').trim().split(/\s+/).length;
    return { areas: g.areas, cols: g.cols || `repeat(${nc}, minmax(0, 1fr))`, rows: g.rows || `repeat(${rows.length}, minmax(0, 1fr))` };
  };
  const T = grid(tall), Wd = grid(wide || tall);
  const style = [`--ta: ${T.areas}`, `--tc: ${T.cols}`, `--tr: ${T.rows}`, `--wa: ${Wd.areas}`, `--wc: ${Wd.cols}`, `--wr: ${Wd.rows}`].join(';');
  board.innerHTML = `
    <div class="x1g">
      ${scene}
      ${expr ? '<div class="x1g-top"><div class="x1g-expr x1g-off">&nbsp;</div></div>' : '<div class="x1g-top x1g-top-thin"></div>'}
      <div class="x1g-main" style="${style}">
        ${zones.map((z) => `
          <div class="x1g-zone x1g-z-${z.type || 'plate'}" data-z="${z.id}" style="grid-area:${z.id}">
            ${z.cap ? '<div class="x1g-cap"><span class="x1g-capin x1g-off">&nbsp;</span></div>' : ''}
            <div class="x1g-fit"><div class="x1g-slots" style="--c:${z.cols};--r:${z.rows || 1}">
              ${Array.from({ length: z.cols * (z.rows || 1) }, (_, i) => `<div class="x1g-slot" data-i="${i}"></div>`).join('')}
            </div></div>
          </div>`).join('')}
        <svg class="x1g-lines" aria-hidden="true"></svg>
      </div>
      ${foot ? '<div class="x1g-foot"></div>' : ''}
    </div>`;
  const root = board.querySelector('.x1g');
  const main = root.querySelector('.x1g-main');
  const lines = root.querySelector('.x1g-lines');
  const byEl = new WeakMap();
  const all = new Set();
  const pairs = [];

  const t = emitter({ onTap: null });
  const zoneEl = (id) => root.querySelector(`.x1g-zone[data-z="${id}"]`);
  const slotsOf = (id) => [...zoneEl(id).querySelectorAll('.x1g-slot')];
  const itemEl = (it) => it.el;

  function render(it) {
    it.el.innerHTML = itemSvg(it.kind, it.opts);
  }
  function place(it, slot) {
    it.zone = slot.closest('.x1g-zone').dataset.z;
    it.slot = +slot.dataset.i;
    slot.append(it.el);
    slot.dataset.busy = '1';
  }
  function free(it) {
    const s = it.el.parentElement;
    if (s?.classList.contains('x1g-slot')) delete s.dataset.busy;
  }

  t.add = (zone, kind, opts = {}, { slot = null, pop = false } = {}) => {
    const s = slot == null ? slotsOf(zone).find((x) => !x.dataset.busy) : slotsOf(zone)[slot];
    if (!s) return null;
    const el = document.createElement('div');
    el.className = 'x1g-item';
    const it = { el, kind, opts, tag: opts.tag ?? kind, zone, slot: 0 };
    render(it);
    byEl.set(el, it);
    all.add(it);
    place(it, s);
    if (pop) { el.classList.add('x1g-pop'); sfx.pop(t.count(zone)); }
    return it;
  };
  items.forEach(({ zone, kind, slot = null, ...opts }) => t.add(zone, kind, opts, { slot }));

  /** Đổi hình của một đồ vật (thẻ số ? → số). */
  t.update = (it, opts) => {
    Object.assign(it.opts, opts);
    const m = it.el.querySelector('.x1g-mark');
    render(it);
    if (m) it.el.append(m);
    it.el.classList.remove('x1g-pop'); void it.el.offsetWidth; it.el.classList.add('x1g-pop');
  };
  t.items = (zone) => [...all].filter((it) => it.zone === zone && it.el.isConnected).sort((a, b) => a.slot - b.slot);
  t.count = (zone) => t.items(zone).length;
  t.zoneEl = zoneEl;
  t.slotEl = (zone, i) => slotsOf(zone)[i];

  const inset = (r, k = 0.06) => ({ left: r.left + r.width * k, top: r.top + r.height * k, width: r.width * (1 - 2 * k), height: r.height * (1 - 2 * k) });

  /** Đồ vật bay sang ô trống đầu tiên (hoặc ô `slot`) của khu `zone`. Promise khi đáp. */
  t.move = (it, zone, { slot = null, delay = 0, quiet = false } = {}) => {
    const s = slot == null ? slotsOf(zone).find((x) => !x.dataset.busy) : slotsOf(zone)[slot];
    if (!s || !it.el.isConnected) return Promise.resolve(false);
    s.dataset.busy = '1';
    return new Promise((res) => {
      const go = () => {
        const from = it.el.getBoundingClientRect();
        const html = it.el.innerHTML;
        unpairItem(it);
        free(it);
        it.el.remove();
        it.el.classList.remove('x1g-pop', 'x1g-live', 'x1g-glow', 'x1g-shake');
        it.el.querySelector('.x1g-mark')?.remove();
        let landed = false;
        const land = () => {
          if (landed) return;
          landed = true;
          if (!s.isConnected) { res(false); return; }
          place(it, s);
          void it.el.offsetWidth;
          it.el.classList.add('x1g-pop');
          if (!quiet) sfx.pop(t.count(zone));
          t.emit('move', it);
          res(true);
        };
        // onLand của flyOne, hoặc hết giờ bay (máy ngủ / trình duyệt không chạy hoạt ảnh) thì vẫn đáp
        const ms = flyOne(`<div class="x1g-flyin">${html}</div>`, from, inset(s.getBoundingClientRect(), 0.06), { minMs: 420, maxMs: 760, onLand: land });
        setTimeout(land, ms + 350);
      };
      if (delay) setTimeout(go, delay); else go();
    });
  };

  /** Đồ vật bay ra khỏi bảng (chim bay đi, cá được vớt ra…). */
  t.away = (it, { dir = 'up' } = {}) => new Promise((res) => {
    if (!it.el.isConnected) { res(); return; }
    const from = it.el.getBoundingClientRect();
    const b = root.getBoundingClientRect();
    const to = dir === 'up'
      ? { left: from.left + b.width * 0.25, top: b.top - from.height * 1.2, width: from.width * 0.7, height: from.height * 0.7 }
      : { left: b.right + from.width * 0.3, top: from.top, width: from.width, height: from.height };
    const html = it.el.innerHTML;
    unpairItem(it);
    free(it);
    it.el.remove();
    all.delete(it);
    sfx.swish();
    t.emit('away', it);
    let done = false;
    const end = () => { if (!done) { done = true; res(); } };
    setTimeout(end, flyOne(`<div class="x1g-flyin">${html}</div>`, from, to, { minMs: 600, maxMs: 900, onLand: end }) + 350);
  });

  t.clear = (zone) => { for (const it of zone ? t.items(zone) : [...all]) { unpairItem(it); free(it); it.el.remove(); all.delete(it); } };

  /** Chữ / số dưới tên khu (giữ chỗ từ đầu, chỉ hiện khi có chữ). */
  t.cap = (zone, html) => {
    const c = zoneEl(zone).querySelector('.x1g-capin');
    if (!c) return;
    const on = html != null && html !== '';
    c.innerHTML = on ? html : '&nbsp;';
    c.classList.toggle('x1g-off', !on);
    if (on) { c.classList.remove('x1g-pop'); void c.offsetWidth; c.classList.add('x1g-pop'); }
  };

  const exprEl = root.querySelector('.x1g-expr');
  t.expr = (html) => {
    if (!exprEl) return;
    const on = !!html;
    exprEl.innerHTML = on ? html : '&nbsp;';
    exprEl.classList.toggle('x1g-off', !on);
    if (on) { exprEl.classList.remove('x1g-pop'); void exprEl.offsetWidth; exprEl.classList.add('x1g-pop'); }
  };
  /** Điền ô trống đầu tiên của phép tính. */
  t.fillQ = (text) => {
    const q = exprEl?.querySelector('.x1g-q:not(.x1g-q-on)');
    if (!q) return;
    q.textContent = text;
    q.classList.add('x1g-q-on', 'x1g-pop');
    sfx.pop(3);
  };
  t.qEl = () => exprEl?.querySelector('.x1g-q:not(.x1g-q-on)');

  const asEls = (x) => [].concat(x).filter(Boolean).map((y) => (typeof y === 'string' ? zoneEl(y) : y.el || y));
  t.glow = (x, on = true) => { asEls(x).forEach((e) => e.classList.toggle('x1g-glow', on)); };
  t.unglow = () => root.querySelectorAll('.x1g-glow').forEach((e) => e.classList.remove('x1g-glow'));
  /** Đồ vật bấm được (khẽ nhún nhảy): pred(item) hoặc null để tắt. */
  t.live = (pred) => { for (const it of all) it.el.classList.toggle('x1g-live', !!pred && pred(it)); };
  t.shake = (it) => { const e = it.el || it; e.classList.remove('x1g-shake'); void e.offsetWidth; e.classList.add('x1g-shake'); sfx.boing(); };
  t.cross = (it, on = true) => { it.el.classList.toggle('x1g-crossed', on); if (on) sfx.swish(); };

  t.mark = (it, n) => {
    let m = it.el.querySelector('.x1g-mark');
    if (!m) { m = document.createElement('span'); m.className = 'x1g-mark'; it.el.append(m); }
    m.textContent = n;
  };
  t.unmark = (zone) => { for (const it of zone ? t.items(zone) : [...all]) it.el.querySelector('.x1g-mark')?.remove(); };
  /** Đếm từng đồ vật của khu: số nhỏ hiện lần lượt trên mỗi đồ vật, chữ dưới khu đổi theo. */
  t.countUp = async (zone, { ms = 520, cap = true, list = null } = {}) => {
    const its = list || t.items(zone);
    for (let i = 0; i < its.length; i++) {
      t.mark(its[i], i + 1);
      its[i].el.classList.remove('x1g-pop'); void its[i].el.offsetWidth; its[i].el.classList.add('x1g-pop');
      sfx.pop(i);
      if (cap) t.cap(zone, String(i + 1));
      await sleep(ms);
    }
    return its.length;
  };

  // ── Nối từng cặp (một đồ vật hàng trên với một đồ vật hàng dưới) ───────────────────────────────────
  function drawLines() {
    const m = main.getBoundingClientRect();
    if (!m.width) return;
    lines.setAttribute('viewBox', `0 0 ${m.width.toFixed(1)} ${m.height.toFixed(1)}`);
    lines.innerHTML = pairs.map(({ a, b, fresh }) => {
      const ra = a.el.getBoundingClientRect(), rb = b.el.getBoundingClientRect();
      const down = rb.top > ra.top;
      const x1 = ra.left + ra.width / 2 - m.left, y1 = (down ? ra.bottom - ra.height * 0.08 : ra.top + ra.height * 0.08) - m.top;
      const x2 = rb.left + rb.width / 2 - m.left, y2 = (down ? rb.top + rb.height * 0.08 : rb.bottom - rb.height * 0.08) - m.top;
      const len = Math.hypot(x2 - x1, y2 - y1).toFixed(1);
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="${fresh ? 'x1g-draw' : ''}" style="--len:${len}"/>
        <circle cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" r="5"/><circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="5"/>`;
    }).join('');
    pairs.forEach((p) => { p.fresh = false; });
  }
  function unpairItem(it) {
    const i = pairs.findIndex((p) => p.a === it || p.b === it);
    if (i < 0) return;
    pairs[i].a.paired = pairs[i].b.paired = false;
    pairs.splice(i, 1);
    drawLines();
  }
  t.pair = (a, b) => {
    a.paired = b.paired = true;
    pairs.push({ a, b, fresh: true });
    drawLines();
    sfx.tick();
    t.emit('pair', a, b);
  };
  t.unpair = () => { pairs.forEach((p) => { p.a.paired = p.b.paired = false; }); pairs.length = 0; drawLines(); };
  t.pairs = () => pairs.length;

  const ro = new ResizeObserver(() => { if (!root.isConnected) { ro.disconnect(); return; } if (pairs.length) drawLines(); });
  ro.observe(main);

  root.addEventListener('click', (e) => {
    const el = e.target.closest('.x1g-item');
    const it = el && byEl.get(el);
    if (it) { t.emit('tap', it); t.onTap?.(it); return; }
    const z = e.target.closest('.x1g-zone');
    if (z) { t.emit('zone', z.dataset.z); t.onZone?.(z.dataset.z); }
  });

  t.root = root;
  if (import.meta.env.DEV) window.__x1t = t;
  return t;
}

let styled = false;
function injectStyles() {
  if (styled) return;
  styled = true;
  css('x1g-css', `
    .x1g { flex: 1; min-height: 0; position: relative; display: flex; flex-direction: column; overflow: hidden; border-radius: inherit;
      background: linear-gradient(#BAE6FD, #E0F2FE 55%, #ECFCCB); font-family: 'Baloo 2', sans-serif; user-select: none; -webkit-user-select: none; }
    .x1g-backdrop { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; pointer-events: none; }
    .x1g > :not(.x1g-backdrop) { position: relative; z-index: 1; }
    .x1g-top { flex: none; height: 17cqh; display: flex; align-items: center; justify-content: center; padding: 1.6cqh 3cqi 0; box-sizing: border-box; }
    .x1g-top-thin { height: 3cqh; }
    .x1g-expr { height: 100%; min-width: 46%; max-width: 100%; box-sizing: border-box; display: flex; align-items: center; justify-content: center; gap: 0.18em;
      padding: 0 0.5em; background: #fff; border: 2px solid #BFDBFE; border-radius: 0.5em; box-shadow: 0 5px 0 #93C5FD;
      font-size: min(10cqh, 8cqi); font-weight: 800; line-height: 1; color: #1E293B; white-space: nowrap; }
    .x1g-off { visibility: hidden; }
    .x1g-w { font-size: 0.62em; color: #475569; padding: 0 0.1em; }
    .x1g-pick { cursor: pointer; }
    .x1g-n { min-width: 0.7em; text-align: center; }
    .x1g-s { color: #DC2626; }
    .x1g-q { display: inline-grid; place-items: center; min-width: 1.1em; height: 1.1em; border: 3px dashed #F59E0B; border-radius: 0.2em; background: #FEF9C3; color: #15803D; box-sizing: border-box; }
    .x1g-q-on { border: 3px solid #22C55E; background: #DCFCE7; }
    .x1g-qs.x1g-q-on { color: #DC2626; }
    .x1g-main { flex: 1 1 0; min-height: 0; display: grid; gap: 5cqh 2.6cqi; padding: 4.4cqh 3cqi 0; box-sizing: border-box;
      grid-template-areas: var(--ta); grid-template-columns: var(--tc); grid-template-rows: var(--tr); }
    @container (aspect-ratio > 1.3) {
      .x1g-main { grid-template-areas: var(--wa); grid-template-columns: var(--wc); grid-template-rows: var(--wr); }
    }
    .x1g-foot { flex: none; height: 17cqh; }
    .x1g-zone { min-width: 0; min-height: 0; display: flex; flex-direction: column; border-radius: 1.2rem; padding: 1.2cqh 1.2cqi; box-sizing: border-box; transition: box-shadow .25s; }
    .x1g-z-plate, .x1g-z-shelf, .x1g-z-board { background: #fff; border: 2px solid #E2E8F0; box-shadow: 0 5px 0 rgba(63,58,64,0.12); }
    .x1g-z-shelf { border-bottom: 1.1cqh solid #B45309; border-radius: 1.2rem 1.2rem 0.5rem 0.5rem; }
    .x1g-z-plate { border-radius: 50% / 38%; background: radial-gradient(ellipse at 50% 45%, #fff 60%, #F1F5F9); padding: 1.6cqh 3cqi; }
    .x1g-z-basket { background: repeating-linear-gradient(90deg, #FCD34D 0 14px, #FBBF24 14px 16px); border: 3px solid #B45309; border-radius: 0.8rem 0.8rem 2.2rem 2.2rem; box-shadow: 0 5px 0 #92400E; }
    .x1g-z-pond { background: radial-gradient(ellipse at 50% 40%, #BAE6FD, #7DD3FC); border: 3px solid #0EA5E9; border-radius: 45% / 40%; box-shadow: 0 5px 0 #0369A1; padding: 2.4cqh 4cqi; }
    .x1g-z-ground { background: transparent; }
    .x1g-z-ground .x1g-item svg { filter: drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff); }
    /* Số của khu: nhãn đè lên mép trên của khu (không lấy chỗ của đồ vật) */
    .x1g-zone { position: relative; }
    .x1g-cap { position: absolute; z-index: 2; left: 0; right: 0; top: -3.6cqh; height: 7.2cqh; display: grid; place-items: center; pointer-events: none; }
    .x1g-capin { box-shadow: 0 0 0 2px #BFDBFE; }
    .x1g-capin { font-size: min(6.4cqh, 7cqi); font-weight: 800; line-height: 1; color: #1D4ED8; background: #EFF6FF; border-radius: 0.4em; padding: 0.05em 0.5em; white-space: nowrap; }
    .x1g-z-basket .x1g-capin { background: #fff; color: #92400E; }
    .x1g-fit { flex: 1 1 0; min-height: 0; min-width: 0; container-type: size; display: grid; place-items: center; }
    .x1g-slots { display: grid; grid-template-columns: repeat(var(--c), minmax(0, 1fr)); grid-template-rows: repeat(var(--r), minmax(0, 1fr));
      width: min(100cqw, 100cqh * var(--c) / var(--r)); height: min(100cqh, 100cqw * var(--r) / var(--c)); }
    .x1g-slot { position: relative; min-width: 0; min-height: 0; }
    .x1g-z-frame { background: transparent; }
    .x1g-z-frame .x1g-slots { background: #fff; border-radius: 0.6rem; box-shadow: 0 0 0 1.4cqmin #fff, 0 0 0 calc(1.4cqmin + 2px) #E2E8F0, 0 calc(1.4cqmin + 6px) 0 rgba(63,58,64,0.12); }
    .x1g-z-frame .x1g-fit { padding: 2.6cqh 1.6cqi 1.6cqh; place-items: start center; }
    .x1g-z-frame .x1g-slot { border: 2px solid #CBD5E1; margin: -1px; border-radius: 0.35rem; background: #F8FAFC; }
    .x1g-z-frame .x1g-slot.x1g-glow { background: #FEF9C3; border-color: #F59E0B; }
    .x1g-z-track .x1g-slot { margin: 0 3%; }
    .x1g-z-track .x1g-item svg { filter: drop-shadow(0 4px 0 rgba(30,58,138,0.25)); }
    .x1g-item { position: absolute; inset: 6%; cursor: pointer; touch-action: manipulation; }
    .x1g-item > svg, .x1g-flyin > svg { display: block; width: 100%; height: 100%; }
    .x1g-flyin { width: 100%; height: 100%; }
    .x1g-pop { animation: x1gPop .38s ease-out; }
    @keyframes x1gPop { 0% { transform: scale(.6); } 70% { transform: scale(1.12); } 100% { transform: scale(1); } }
    .x1g-live { animation: x1gLive 1.4s ease-in-out infinite; }
    @keyframes x1gLive { 50% { transform: translateY(-6%) scale(1.06); } }
    .x1g-glow { box-shadow: 0 0 0 4px #FDE047, 0 0 18px 6px #FACC15 !important; }
    .x1g-item.x1g-glow { box-shadow: none !important; filter: drop-shadow(0 0 6px #F59E0B) drop-shadow(0 0 3px #FACC15); }
    .x1g-shake { animation: x1gShake .45s; }
    @keyframes x1gShake { 20%, 60% { transform: translateX(-8%); } 40%, 80% { transform: translateX(8%); } }
    .x1g-crossed::after { content: ''; position: absolute; inset: 4%; background:
      linear-gradient(45deg, transparent 45%, ${INK} 45%, ${INK} 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, ${INK} 45%, ${INK} 55%, transparent 55%); }
    .x1g-crossed > svg { opacity: .45; }
    .x1g-mark { position: absolute; right: -6%; top: -8%; width: 40%; aspect-ratio: 1; border-radius: 50%; display: grid; place-items: center;
      background: #1D4ED8; color: #fff; font-weight: 800; line-height: 1; font-size: min(calc(100cqh / var(--r) * 0.24), calc(100cqw / var(--c) * 0.24)); border: 2px solid #fff; }
    .x1g-lines { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 3; overflow: visible; }
    .x1g-lines line { stroke: #DC2626; stroke-width: 5; stroke-linecap: round; }
    .x1g-lines circle { fill: #DC2626; }
    .x1g-lines .x1g-draw { stroke-dasharray: var(--len); stroke-dashoffset: var(--len); animation: x1gDraw .4s ease-out forwards; }
    @keyframes x1gDraw { to { stroke-dashoffset: 0; } }
    .x1-cn { font-size: 1.7em; line-height: 1; }
    @media (prefers-reduced-motion: reduce) {
      .x1g-pop { animation: x1gFade .4s ease-out; }
      @keyframes x1gFade { from { opacity: .3; } }
      .x1g-live { animation: x1gLiveCalm 2s ease-in-out infinite; }
      @keyframes x1gLiveCalm { 50% { filter: drop-shadow(0 0 6px #FACC15); } }
      .x1g-shake { animation: x1gShakeCalm .5s; }
      @keyframes x1gShakeCalm { 50% { filter: drop-shadow(0 0 6px #F87171); } }
      .x1g-lines .x1g-draw { animation-duration: .6s; }
    }
  `);
}
