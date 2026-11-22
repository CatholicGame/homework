/**
 * 🎯 Ước lượng (Bài 45): mỗi số một thước ngắn giữa hai mốc tròn (vd. 5 000 và 6 000, vạch chia mỗi 1/10), cờ cắm đúng
 * chỗ của số (tỉ lệ với giá trị). Em chạm mốc gần hơn: cờ trượt về mốc đó, bên phải hiện "≈ 6 000".
 * Chạm mốc xa hơn: mốc rung, t.onWrong(k, v) (thầy nhắc). Dòng dưới cùng (t.sum) ghi phép tính ước lượng.
 *   items: [{ n, unit }] (unit = 10, 100, 1 000, 10 000: làm tròn đến hàng đó). t.rounded(k), t.ask(k) → Promise.
 * Lớp CSS: g4es-.
 */

import { css, emitter, EDGE, sfx } from './frame.js';
import { shake } from '../grade3Drills/kit.js';
import { fmt } from './num.js';

export const roundU = (n, u) => Math.round(n / u) * u;

export function createEstimate(host, items, { title = '' } = {}) {
  injectStyles();
  const t = emitter({});
  const rows = items.map(({ n, unit }) => {
    const lo = Math.floor(n / unit) * unit, hi = lo + unit;
    return { n, unit, lo, hi, p: (n - lo) / unit, done: false, ans: roundU(n, unit) };
  });
  host.innerHTML = `
    <div class="g4es" style="--rows:${rows.length}">
      ${title ? `<div class="g4es-title">${title}</div>` : ''}
      ${rows.map((r, k) => `
        <div class="g4es-row" data-k="${k}">
          <button type="button" class="g4es-end" data-e="lo">${fmt(r.lo)}</button>
          <div class="g4es-rail">
            <div class="g4es-ticks"></div><div class="g4es-mid"></div>
            <div class="g4es-mkw" style="transform:translateX(${(r.p * 100).toFixed(2)}%)"><div class="g4es-mk"><span>${fmt(r.n)}</span></div></div>
          </div>
          <button type="button" class="g4es-end" data-e="hi">${fmt(r.hi)}</button>
          <div class="g4es-res">&nbsp;</div>
        </div>`).join('')}
      <div class="g4es-sum">&nbsp;</div>
    </div>`;
  const root = host.querySelector('.g4es');
  t.root = root;
  t.rows = rows;
  t.onWrong = null;
  t.rowEl = (k) => root.querySelector(`.g4es-row[data-k="${k}"]`);
  t.rounded = (k) => rows[k].done;
  t.sum = (html) => { const e = root.querySelector('.g4es-sum'); e.innerHTML = html || '&nbsp;'; e.classList.remove('g4es-pop'); void e.offsetWidth; if (html) e.classList.add('g4es-pop'); };
  /** Làm tròn hàng k bằng mã (không chờ em chạm). */
  t.snap = (k) => {
    const r = rows[k], row = t.rowEl(k);
    if (r.done) return;
    r.done = true;
    row.querySelector('.g4es-mkw').style.transform = `translateX(${r.ans === r.lo ? 0 : 100}%)`;
    row.querySelector(`[data-e="${r.ans === r.lo ? 'lo' : 'hi'}"]`).classList.add('g4es-end-ok');
    const res = row.querySelector('.g4es-res');
    res.innerHTML = `≈ <b>${fmt(r.ans)}</b>`;
    res.classList.add('g4es-pop');
    sfx.ding();
    t.emit('round', k);
  };
  /** Chờ em làm tròn hàng k (mốc nhấp nháy). */
  t.ask = (k) => new Promise((res) => {
    if (rows[k].done) { res(); return; }
    t.rowEl(k).classList.add('g4es-now');
    const off = t.on(() => { if (rows[k].done) { off(); t.rowEl(k).classList.remove('g4es-now'); res(); } });
  });
  root.querySelectorAll('.g4es-row').forEach((row) => {
    const k = +row.dataset.k, r = rows[k];
    row.querySelectorAll('.g4es-end').forEach((b) => {
      b.onclick = () => {
        if (r.done) return;
        const v = b.dataset.e === 'lo' ? r.lo : r.hi;
        if (v === r.ans) { sfx.tap(); t.snap(k); return; }
        shake(b);
        sfx.boing?.();
        t.onWrong?.(k, v);
      };
    });
  });
  return t;
}

let styled = false;
function injectStyles() {
  if (styled) return;
  styled = true;
  css('g4-estimate', `
    .g4es { flex: 1; min-height: 0; display: flex; flex-direction: column; justify-content: space-evenly; gap: 1.5cqh; padding: 1cqh 1.5cqi 1.5cqh; box-sizing: border-box; font-family: 'Baloo 2', sans-serif; }
    .g4es-title { flex: none; text-align: center; font-weight: 800; color: #475569; font-size: min(6cqh, 4cqi); }
    .g4es-row { flex: 1 1 0; min-height: 0; max-height: 34cqh; display: grid; grid-template-columns: auto 1fr auto 24cqi; align-items: end; gap: 0 1.2cqi; }
    .g4es-end { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: min(7cqh, 3.8cqi); padding: 0.1em 0.45em; border-radius: 0.5em; cursor: pointer; touch-action: manipulation;
      border: 2px solid #93C5FD; background: #EFF6FF; color: #1D4ED8; box-shadow: 0 5px 0 #93C5FD; margin-bottom: 0.2em; }
    .g4es-end:active { transform: translateY(4px); box-shadow: 0 1px 0 #93C5FD; }
    .g4es-end-ok { border-color: #22C55E; background: #DCFCE7; color: #166534; box-shadow: 0 5px 0 #16A34A; }
    .g4es-now .g4es-end:not(.g4es-end-ok) { animation: g4esBlink 1.3s ease-in-out infinite; }
    @keyframes g4esBlink { 50% { box-shadow: 0 5px 0 #93C5FD, 0 0 0 5px #FDE047; } }
    .g4es-rail { position: relative; align-self: stretch; }
    .g4es-ticks { position: absolute; left: 0; right: 0; bottom: 1.2cqh; height: min(5cqh, 3cqi); border-bottom: 4px solid #334155;
      background: repeating-linear-gradient(90deg, #64748B 0 3px, transparent 3px 10%); background-size: 100% 60%; background-repeat: no-repeat; background-position: bottom; }
    .g4es-ticks::before, .g4es-ticks::after { content: ''; position: absolute; bottom: -4px; width: 4px; height: 160%; background: #334155; }
    .g4es-ticks::before { left: 0; } .g4es-ticks::after { right: 0; }
    .g4es-mid { position: absolute; left: calc(50% - 2px); bottom: 1.2cqh; width: 4px; height: min(8cqh, 4.6cqi); background: #94A3B8; border-radius: 2px; }
    .g4es-mkw { position: absolute; left: 0; right: 0; bottom: 1.2cqh; top: 0; transition: transform .7s cubic-bezier(.45,.05,.35,1.2); pointer-events: none; }
    .g4es-mk { position: absolute; left: 0; bottom: 0; top: 0; width: 0; }
    .g4es-mk::before { content: ''; position: absolute; left: -2px; bottom: 0; width: 4px; height: 72%; background: #DC2626; border-radius: 2px; }
    .g4es-mk span { position: absolute; left: 0; top: 0; transform: translateX(-50%); white-space: nowrap; font-weight: 800; color: #fff; background: #DC2626; border-radius: 0.45em;
      padding: 0.02em 0.4em; font-size: min(7cqh, 3.8cqi); line-height: 1.2; box-shadow: 0 3px 0 #991B1B; }
    .g4es-res { font-weight: 800; color: #15803D; font-size: min(8cqh, 4.4cqi); white-space: nowrap; margin-bottom: 0.1em; }
    .g4es-sum { flex: none; text-align: center; font-weight: 800; color: #1E293B; font-size: min(8cqh, 4.8cqi); line-height: 1.2; min-height: 1.2em; }
    .g4es-sum b { color: #15803D; }
    .g4es-pop { animation: g4esPop .45s ease; }
    @keyframes g4esPop { from { transform: scale(1.35); opacity: 0.2; } }
    @media (prefers-reduced-motion: reduce) {
      .g4es-mkw { transition-duration: .55s; transition-timing-function: ease-in-out; }
      .g4es-pop { animation: g4esCalm .45s ease; } @keyframes g4esCalm { from { opacity: 0.2; } }
      .g4es-now .g4es-end:not(.g4es-end-ok) { animation-duration: 2.4s; }
    }
    @container (orientation: portrait) {
      .g4es-row { grid-template-columns: auto 1fr auto; grid-template-rows: 1fr auto; max-height: 36cqh; }
      .g4es-res { grid-column: 1 / -1; text-align: center; font-size: min(5cqh, 7cqi); }
      .g4es-end { font-size: min(4.4cqh, 5.4cqi); }
      .g4es-mk span { font-size: min(4.4cqh, 5.6cqi); }
      .g4es-sum { font-size: min(5cqh, 6.4cqi); }
      .g4es-ticks { height: min(3cqh, 5cqi); }
    }
  `);
  void EDGE;
}
