/**
 * Công cụ dữ liệu của Toán 2 Tập Hai:
 *   createSorter  băng chuyền đưa từng đồ vật tới; em bấm nút to của loại đúng → đồ vật bay vào nút.
 *                 Trong nút: vạch kiểm đếm (Bài 64) hoặc hình nhỏ của đồ vật (Bài 46 khối trụ, khối cầu).
 *   createPicto   biểu đồ tranh (Bài 65): bảng số liệu + mỗi hàng là một nút to, bấm để thêm một hình.
 *   createChance  hộp bóng (Bài 66): bấm hộp → lấy ra một quả bóng, ghi lại ở dải kết quả.
 */

import { css, emitter, sfx } from '../../grade4Tools/frame.js';
import { flyOne } from '../../grade3Games/fly.js';
import { sleep } from '../../grade3Drills/kit.js';
import { INK, ballSvg, BALL_COLOR } from './art.js';

/** Vạch kiểm đếm: nhóm 5 vạch (4 vạch đứng + 1 vạch chéo). */
export function tallySvg(n, max = 10) {
  const groups = Math.max(1, Math.ceil(max / 5));
  const W = groups * 60 - 10;
  let s = '';
  for (let k = 0; k < n; k++) {
    const g = Math.floor(k / 5), j = k % 5, x0 = g * 60;
    s += j < 4 ? `<line x1="${x0 + 6 + j * 11}" y1="6" x2="${x0 + 6 + j * 11}" y2="44" class="x2zd-mark"/>`
      : `<line x1="${x0}" y1="38" x2="${x0 + 46}" y2="12" class="x2zd-mark x2zd-mark-x"/>`;
  }
  return `<svg viewBox="-4 0 ${W + 8} 50" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${s}</svg>`;
}

/**
 * kinds: [{ id, name, icon (svg html) }], seq: [id…], art(id) → svg html (vừa khung), result: 'tally' | 'thumbs'.
 */
export function createSorter(host, { kinds, seq, art, result = 'tally', max = 10, kindOf = (id) => id } = {}) {
  injectDataStyles();
  const t = emitter({});
  const counts = Object.fromEntries(kinds.map(k => [k.id, 0]));
  host.innerHTML = `
    <div class="x2zd-sort x2zd-r-${result}" style="--k:${kinds.length}">
      <div class="x2zd-cap">&nbsp;</div>
      <div class="x2zd-belt">
        <div class="x2zd-now"></div>
        <div class="x2zd-queue">${Array.from({ length: 4 }, () => '<div class="x2zd-q"></div>').join('')}</div>
      </div>
      <div class="x2zd-kinds">${kinds.map(k => `
        <button type="button" class="x2zd-kind" data-k="${k.id}">
          <div class="x2zd-khead"><span class="x2zd-kicon">${k.icon}</span><span class="x2zd-kname">${k.name}</span></div>
          <div class="x2zd-kres">${result === 'tally' ? `<div class="x2zd-tally">${tallySvg(0, max)}</div>` : `<div class="x2zd-thumbs">${Array.from({ length: 6 }, () => '<span></span>').join('')}</div>`}</div>
          <div class="x2zd-kcount">&nbsp;</div>
        </button>`).join('')}</div>
    </div>`;
  const root = host.querySelector('.x2zd-sort');
  const nowEl = root.querySelector('.x2zd-now');
  const qEls = [...root.querySelectorAll('.x2zd-q')];
  const btn = (id) => root.querySelector(`.x2zd-kind[data-k="${id}"]`);
  let pos = 0, busy = false;
  t.root = root; t.counts = counts; t.btn = btn;
  Object.defineProperty(t, 'current', { get: () => seq[pos] ?? null });
  Object.defineProperty(t, 'busy', { get: () => busy });
  t.caption = (html) => { root.querySelector('.x2zd-cap').innerHTML = `<span>${html || '&nbsp;'}</span>`; };
  const renderBelt = () => {
    nowEl.innerHTML = seq[pos] != null ? art(seq[pos]) : '<span class="x2zd-empty">✓</span>';
    nowEl.classList.remove('x2zd-in'); void nowEl.offsetWidth; nowEl.classList.add('x2zd-in');
    qEls.forEach((q, i) => { q.innerHTML = seq[pos + 1 + i] != null ? art(seq[pos + 1 + i]) : ''; });
  };
  /** Đồ vật hiện tại bay vào nút của loại id. */
  t.sort = async () => {
    const item = seq[pos];
    if (item == null || busy) return;
    busy = true;
    const id = kindOf(item);
    const b = btn(id);
    const target = result === 'tally' ? b.querySelector('.x2zd-tally') : b.querySelectorAll('.x2zd-thumbs > span')[counts[id]];
    const to = target.getBoundingClientRect();
    const sz = Math.min(to.height || 60, 80);
    const toBox = result === 'tally' ? { left: to.left + to.width / 2 - sz / 2, top: to.top + to.height / 2 - sz / 2, width: sz, height: sz } : to;
    nowEl.style.visibility = 'hidden';
    sfx.swish();
    await new Promise(res => flyOne(art(item), nowEl.getBoundingClientRect(), toBox, { minMs: 420, maxMs: 700, onLand: res }));
    counts[id]++;
    if (result === 'tally') b.querySelector('.x2zd-tally').innerHTML = tallySvg(counts[id], max);
    else target.innerHTML = art(item);
    b.classList.remove('x2zd-hit'); void b.offsetWidth; b.classList.add('x2zd-hit');
    sfx.pop(counts[id]);
    pos++;
    nowEl.style.visibility = '';
    renderBelt();
    busy = false;
    t.emit('sorted', id);
  };
  /** Hiện số đếm trong mỗi nút. */
  t.reveal = (ids = kinds.map(k => k.id)) => { for (const id of [].concat(ids)) btn(id).querySelector('.x2zd-kcount').textContent = counts[id]; };
  t.glow = (id) => kinds.forEach(k => btn(k.id).classList.toggle('x2zd-on', k.id === id));
  root.addEventListener('click', (e) => { const b = e.target.closest('.x2zd-kind'); if (b) t.emit('kind', b.dataset.k); });
  renderBelt();
  return t;
}

/** kinds: [{ id, name, icon }], data: { id: số }, max: số ô mỗi hàng. */
export function createPicto(host, { kinds, data, max = 6, title = '' } = {}) {
  injectDataStyles();
  const t = emitter({});
  const counts = Object.fromEntries(kinds.map(k => [k.id, 0]));
  host.innerHTML = `
    <div class="x2zd-pic" style="--k:${kinds.length};--m:${max}">
      <div class="x2zd-cap">&nbsp;</div>
      <div class="x2zd-picbody">
        <div class="x2zd-table">
          <div class="x2zd-th">${title}</div>
          ${kinds.map(k => `<div class="x2zd-tr"><span class="x2zd-ticon">${k.icon}</span><b>${data[k.id]}</b></div>`).join('')}
        </div>
        <div class="x2zd-rows">${kinds.map(k => `
          <button type="button" class="x2zd-row" data-k="${k.id}">
            <span class="x2zd-rlab">${k.name}</span>
            <span class="x2zd-cells">${Array.from({ length: max }, () => '<span class="x2zd-cell"></span>').join('')}</span>
          </button>`).join('')}</div>
      </div>
    </div>`;
  const root = host.querySelector('.x2zd-pic');
  const row = (id) => root.querySelector(`.x2zd-row[data-k="${id}"]`);
  const icon = (id) => kinds.find(k => k.id === id).icon;
  let busy = 0;
  t.root = root; t.counts = counts; t.row = row;
  Object.defineProperty(t, 'busy', { get: () => busy > 0 });
  t.caption = (html) => { root.querySelector('.x2zd-cap').innerHTML = `<span>${html || '&nbsp;'}</span>`; };
  t.add = async (id) => {
    if (counts[id] >= max) return;
    const cell = row(id).querySelectorAll('.x2zd-cell')[counts[id]];
    counts[id]++;
    busy++;
    const from = row(id).querySelector('.x2zd-rlab').getBoundingClientRect();
    const sz = cell.getBoundingClientRect();
    await new Promise(res => flyOne(icon(id), { left: from.left + from.width / 2 - sz.width / 2, top: from.top, width: sz.width, height: sz.height }, sz, { minMs: 320, maxMs: 520, onLand: res }));
    cell.innerHTML = icon(id);
    cell.classList.add('x2zd-cell-in');
    sfx.pop(counts[id]);
    busy--;
    t.emit('added', id);
  };
  t.fill = (id, n) => { for (let i = counts[id]; i < n; i++) { row(id).querySelectorAll('.x2zd-cell')[i].innerHTML = icon(id); counts[id]++; } };
  t.glow = (ids) => { const on = ids == null ? null : new Set([].concat(ids)); kinds.forEach(k => row(k.id).classList.toggle('x2zd-on', !!on?.has(k.id))); };
  /** Ghép cặp hai hàng: các ô thừa của hàng nhiều hơn sáng lên. */
  t.pair = (a, b) => {
    const [hi, lo] = counts[a] >= counts[b] ? [a, b] : [b, a];
    row(hi).querySelectorAll('.x2zd-cell').forEach((c, i) => c.classList.toggle('x2zd-extra', i >= counts[lo] && i < counts[hi]));
  };
  root.addEventListener('click', (e) => { const b = e.target.closest('.x2zd-row'); if (b) t.emit('row', b.dataset.k); });
  return t;
}

/** jars: [[màu…]] (tối đa 3 hộp, mỗi hộp ≤ 6 quả). Dải kết quả: 6 lần lấy gần nhất. */
export function createChance(host, { jars, names = ['A', 'B', 'C'] } = {}) {
  injectDataStyles();
  const t = emitter({});
  host.innerHTML = `
    <div class="x2zd-ch">
      <div class="x2zd-cap">&nbsp;</div>
      <div class="x2zd-jars">${[0, 1, 2].map(k => `
        <button type="button" class="x2zd-jar ${jars[k] ? '' : 'x2zd-jar-off'}" data-j="${k}">
          <div class="x2zd-glass"><div class="x2zd-balls">${(jars[k] || []).map(cl => `<span class="x2zd-ball">${ballSvg(cl)}</span>`).join('')}</div></div>
          <div class="x2zd-jname">Hộp ${names[k]}</div>
        </button>`).join('')}</div>
      <div class="x2zd-hand"><span class="x2zd-hlab">Lấy được:</span>${Array.from({ length: 6 }, () => '<span class="x2zd-got"></span>').join('')}</div>
    </div>`;
  const root = host.querySelector('.x2zd-ch');
  const jarEl = (k) => root.querySelector(`.x2zd-jar[data-j="${k}"]`);
  const got = [...root.querySelectorAll('.x2zd-got')];
  let n = 0, busy = false;
  t.root = root; t.jar = jarEl;
  Object.defineProperty(t, 'draws', { get: () => n });
  Object.defineProperty(t, 'busy', { get: () => busy });
  t.caption = (html) => { root.querySelector('.x2zd-cap').innerHTML = `<span>${html || '&nbsp;'}</span>`; };
  t.focus = (k) => [0, 1, 2].forEach(j => jarEl(j).classList.toggle('x2zd-dim', k != null && j !== k));
  t.clearHand = () => { n = 0; got.forEach(g => { g.innerHTML = ''; }); };
  /** Lấy một quả ở vị trí i của hộp k (kịch bản chọn), ghi lên dải kết quả. */
  t.draw = async (k, i) => {
    if (busy) return null;
    busy = true;
    const balls = jarEl(k).querySelectorAll('.x2zd-ball');
    const b = balls[i % balls.length];
    const color = jars[k][i % balls.length];
    const slot = got[n % got.length];
    if (n >= got.length && n % got.length === 0) t.clearHand();
    b.classList.add('x2zd-ball-out');
    sfx.swish();
    await new Promise(res => flyOne(ballSvg(color), b.getBoundingClientRect(), slot.getBoundingClientRect(), { minMs: 420, maxMs: 650, onLand: res }));
    slot.innerHTML = ballSvg(color);
    slot.classList.remove('x2zd-got-in'); void slot.offsetWidth; slot.classList.add('x2zd-got-in');
    b.classList.remove('x2zd-ball-out');
    n++;
    sfx.pop(n);
    busy = false;
    t.emit('drawn', color);
    return color;
  };
  root.addEventListener('click', (e) => { const j = e.target.closest('.x2zd-jar'); if (j && !j.classList.contains('x2zd-jar-off') && !j.classList.contains('x2zd-dim')) t.emit('jar', +j.dataset.j); });
  return t;
}
export const colorName = (c) => BALL_COLOR[c][1];

let styled = false;
function injectDataStyles() {
  if (styled) return;
  styled = true;
  css('x2zd-data', `
    .x2zd-sort, .x2zd-pic, .x2zd-ch { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 1.6cqh; padding: 1cqh 1.5cqi 2cqh; font-family: 'Baloo 2', sans-serif; }
    .x2zd-cap { flex: none; height: 10cqh; display: grid; place-items: center; font-weight: 800; color: #1E293B; font-size: min(7cqh, 5cqi); line-height: 1.05; text-align: center; }
    /* băng chuyền */
    .x2zd-belt { flex: 0 0 30cqh; display: grid; grid-template-columns: 34cqh minmax(0, 1fr); align-items: end; gap: 2cqi; padding: 1cqh 2cqi 3.2cqh; border-radius: 1.2rem; position: relative;
      background: linear-gradient(180deg, #E0F2FE 0 62%, #86EFAC 62% 100%); overflow: hidden; }
    .x2zd-belt::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 3.2cqh; background: repeating-linear-gradient(90deg, #64748B 0 3cqh, #94A3B8 3cqh 6cqh); }
    .x2zd-now { grid-column: 1; height: 25cqh; width: 25cqh; justify-self: center; display: grid; place-items: center;
      filter: drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff); }
    .x2zd-now svg { width: 100%; height: 100%; }
    .x2zd-in { animation: x2zdIn .45s ease-out; }
    @keyframes x2zdIn { from { transform: translateX(40cqi); } }
    .x2zd-empty { font-size: 14cqh; color: #16A34A; font-weight: 800; }
    .x2zd-queue { grid-column: 2; overflow: hidden; display: flex; gap: 1cqi; align-items: end; height: 13cqh; opacity: 0.8; }
    .x2zd-q { flex: 0 0 13cqh; height: 13cqh; }
    .x2zd-q svg { width: 100%; height: 100%; }
    .x2zd-kinds { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: repeat(var(--k), minmax(0, 1fr)); gap: 1.6cqi; margin-bottom: 13cqh; }
    .x2zd-kind, .x2zd-row, .x2zd-jar { border: 2px solid #BFDBFE; border-radius: 1rem; background: #fff; box-shadow: 0 6px 0 #93C5FD; cursor: pointer; touch-action: manipulation; font-family: inherit; color: #1E293B; padding: 0; }
    .x2zd-kind:active, .x2zd-row:active, .x2zd-jar:active { transform: translateY(4px); box-shadow: 0 2px 0 #93C5FD; }
    .x2zd-kind { min-width: 0; min-height: 0; display: flex; flex-direction: column; padding: 1cqh 1cqi; gap: 0.6cqh; container-type: size; }
    .x2zd-khead { flex: none; height: 26cqh; display: flex; align-items: center; justify-content: center; gap: 4cqi; }
    .x2zd-kicon { height: 100%; aspect-ratio: 1; }
    .x2zd-kicon svg { width: 100%; height: 100%; }
    .x2zd-kname { font-weight: 800; font-size: min(13cqh, 13cqi); line-height: 1.05; }
    .x2zd-kres { flex: 1 1 0; min-height: 0; display: grid; place-items: center; }
    .x2zd-tally { width: 100%; height: 100%; }
    .x2zd-tally svg { width: 100%; height: 100%; }
    .x2zd-mark { stroke: #1D4ED8; stroke-width: 4.5; stroke-linecap: round; animation: x2zdMark .35s ease-out; }
    .x2zd-mark-x { stroke: #DC2626; }
    @keyframes x2zdMark { from { stroke-dasharray: 60; stroke-dashoffset: 60; } to { stroke-dasharray: 60; stroke-dashoffset: 0; } }
    .x2zd-thumbs { width: 100%; height: 100%; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 1cqh 1cqi; }
    .x2zd-thumbs > span { min-width: 0; min-height: 0; display: grid; place-items: center; }
    .x2zd-thumbs svg { width: 100%; height: 100%; }
    .x2zd-kcount { flex: none; height: 16cqh; display: grid; place-items: center; font-weight: 800; color: #16A34A; font-size: 14cqh; line-height: 1; }
    .x2zd-hit { animation: x2zdHit .35s ease; }
    @keyframes x2zdHit { 50% { transform: scale(1.04); } }
    .x2zd-on { border-color: #FACC15; box-shadow: 0 0 0 4px #FDE047, 0 6px 0 #EAB308; }
    /* biểu đồ tranh */
    .x2zd-picbody { flex: 1 1 0; min-height: 0; display: flex; gap: 2cqi; margin-bottom: 13cqh; }
    .x2zd-table { flex: 0 0 22%; display: flex; flex-direction: column; border: 2px solid #CBD5E1; border-radius: 1rem; overflow: hidden; background: #fff; }
    .x2zd-th { flex: none; padding: 0.3em; text-align: center; font-weight: 800; font-size: min(4.2cqh, 2.8cqi); background: #E0F2FE; color: #0C4A6E; line-height: 1.1; }
    .x2zd-tr { flex: 1 1 0; min-height: 0; display: flex; align-items: center; justify-content: space-around; border-top: 2px solid #E2E8F0; font-size: min(8cqh, 5cqi); }
    .x2zd-ticon { height: 70%; aspect-ratio: 1; } .x2zd-ticon svg { width: 100%; height: 100%; }
    .x2zd-tr b { color: #C2410C; }
    .x2zd-rows { flex: 1 1 0; min-width: 0; display: grid; grid-template-rows: repeat(var(--k), minmax(0, 1fr)); gap: 1.4cqh; }
    .x2zd-row { min-height: 0; display: flex; align-items: center; gap: 1cqi; padding: 0.6cqh 1cqi; container-type: size; }
    .x2zd-rlab { flex: 0 0 22%; font-weight: 800; font-size: min(30cqh, 6cqi); text-align: left; line-height: 1.05; }
    .x2zd-cells { flex: 1 1 0; height: 100%; display: grid; grid-template-columns: repeat(var(--m), 1fr); gap: 0.6cqi; align-items: center; }
    .x2zd-cell { width: min(78cqh, calc(72cqi / var(--m))); aspect-ratio: 1; justify-self: center; border-radius: 0.4em; background: #F8FAFC; outline: 1px dashed #CBD5E1; }
    .x2zd-cell svg { width: 100%; height: 100%; display: block; }
    .x2zd-cell-in { animation: x2zdHit .3s ease; }
    .x2zd-extra { background: #FEF08A; outline: 3px solid #FACC15; }
    /* hộp bóng */
    .x2zd-jars { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2cqi; }
    .x2zd-jar { min-width: 0; min-height: 0; display: flex; flex-direction: column; align-items: center; padding: 1.4cqh 1cqi; gap: 1cqh; container-type: size; background: #FFFBEB; border-color: #FDE68A; box-shadow: 0 6px 0 #FCD34D; }
    .x2zd-glass { flex: none; height: 76cqh; box-sizing: border-box; width: min(100%, 62cqh); border: 3px solid #93C5FD; border-top-width: 8px; border-radius: 0.6em 0.6em 1.4em 1.4em; background: rgba(224,242,254,0.6); display: grid; place-items: end center; padding: 4%; }
    .x2zd-balls { width: 100%; display: grid; grid-template-columns: repeat(2, 1fr); gap: 4%; }
    .x2zd-ball { aspect-ratio: 1; display: block; transition: opacity .2s; }
    .x2zd-ball svg { width: 100%; height: 100%; display: block; }
    .x2zd-ball-out { opacity: 0.15; }
    .x2zd-jname { flex: none; font-weight: 800; font-size: min(12cqh, 14cqi); color: #92400E; }
    .x2zd-jar-off { visibility: hidden; }
    .x2zd-dim { opacity: 0.3; pointer-events: none; }
    .x2zd-hand { flex: none; height: 15cqh; box-sizing: border-box; margin-bottom: 13cqh; display: flex; align-items: center; gap: 1.4cqi; padding: 1cqh 2cqi; border-radius: 1rem; background: #F1F5F9; border: 2px dashed #CBD5E1; }
    .x2zd-hlab { flex: none; font-weight: 800; font-size: min(5.4cqh, 3.6cqi); color: #475569; }
    .x2zd-got { flex: none; width: min(11cqh, 11cqi); height: min(11cqh, 11cqi); border-radius: 50%; background: #fff; }
    .x2zd-got svg { width: 100%; height: 100%; display: block; }
    .x2zd-got-in { animation: x2zdHit .35s ease; }
    @media (orientation: portrait) {
      .x2zd-picbody { flex-direction: column; }
      .x2zd-table { flex: 0 0 auto; flex-direction: row; }
      .x2zd-th { flex: 0 0 26%; display: grid; place-items: center; }
      .x2zd-tr { border-top: none; border-left: 2px solid #E2E8F0; padding: 0.6cqh 0; }
      .x2zd-ticon { height: 6cqh; }
    }
    @media (prefers-reduced-motion: reduce) {
      .x2zd-in { animation: x2zdInCalm .45s ease-out; } @keyframes x2zdInCalm { from { opacity: 0.2; } }
      .x2zd-hit, .x2zd-cell-in, .x2zd-got-in { animation: none; }
    }
  `);
  void INK; void sleep;
}
