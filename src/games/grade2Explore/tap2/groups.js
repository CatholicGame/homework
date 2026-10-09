/**
 * 🍎 Nhóm đồ vật (Phép nhân, phép chia lớp 2): hàng đĩa / rổ / hộp trên mặt bàn, khay đồ vật ở dưới.
 * Bấm đĩa → sự kiện ('box', i); bấm khay → ('tray'). Kịch bản quyết định đặt bao nhiêu (t.put bay từng quả).
 * Mọi đĩa giữ chỗ từ đầu (đĩa chưa dùng mờ, viền đứt), cỡ quả cố định theo sức chứa cap.
 */

import { css, emitter, sfx } from '../../grade4Tools/frame.js';
import { flyOne } from '../../grade3Games/fly.js';
import { sleep } from '../../grade3Drills/kit.js';
import { itemSvg, itemFly, INK } from './art.js';

/** Tường bếp có cửa sổ, kệ, chậu cây; mặt bàn gỗ ở dưới (đĩa đặt trên bàn). */
const WALL = `<svg class="x2zg-wall" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <rect width="1000" height="400" fill="#FEF6E4"/><path d="M0 0 H1000 V40 H0Z" fill="#FDE7C3"/>
  <g stroke="${INK}" stroke-width="4" stroke-linejoin="round"><rect x="400" y="40" width="200" height="150" rx="8" fill="#BAE6FD"/>
  <path d="M500 40 V190 M400 115 H600" fill="none"/><path d="M430 90 q10-18 30-10 q14-16 32 0 q16 0 14 14 h-80 q-8-4 4-4z" fill="#fff" stroke-width="3"/>
  <circle cx="565" cy="72" r="16" fill="#FDE047" stroke-width="3"/>
  <path d="M380 34 Q400 120 386 196 L416 196 Q420 110 404 34Z M620 34 Q600 120 614 196 L584 196 Q580 110 596 34Z" fill="#F9A8D4"/>
  <path d="M120 120 H300 V132 H120Z" fill="#D97706"/><rect x="140" y="80" width="34" height="40" rx="6" fill="#86EFAC"/><rect x="190" y="70" width="28" height="50" rx="6" fill="#FCA5A5"/>
  <path d="M240 120 L246 96 H284 L290 120Z" fill="#FB923C"/><path d="M265 96 Q250 60 262 52 Q270 70 266 96 Q282 58 296 64 Q284 84 268 96" fill="#4ADE80" stroke-width="3"/>
  <circle cx="800" cy="100" r="44" fill="#fff"/><path d="M800 70 V100 L822 112" fill="none" stroke-linecap="round"/></g>
  <path d="M0 232 H1000 V400 H0Z" fill="#F2C48D"/><path d="M0 232 H1000 V246 H0Z" fill="#D9A066"/>
  <path d="M0 300 H1000 M0 360 H1000" stroke="#E7B57A" stroke-width="4"/></svg>`;

const grid = (cap) => (cap <= 2 ? [2, 1] : cap <= 4 ? [2, 2] : cap <= 6 ? [3, 2] : cap <= 8 ? [4, 2] : [5, 2]);

/**
 * n: số đĩa (≤ 10), cap: số quả tối đa mỗi đĩa (≤ 10), item: tên hình (art.js), box: 'plate' | 'basket' | 'box' | 'vase',
 * tray: số quả trên khay lúc đầu, trayCap: số ô của khay (giữ chỗ), names: nhãn dưới đĩa (tuỳ chọn).
 */
export function createGroups(host, { n = 3, cap = 5, item = 'apple', box = 'plate', tray = 0, trayCap = tray, shown = n } = {}) {
  injectGroupStyles();
  const t = emitter({});
  const [sc, sr] = grid(cap);
  const cols = n <= 5 ? n : Math.ceil(n / 2);
  const rows = n <= 5 ? 1 : 2;
  const tc = trayCap <= 10 ? Math.max(trayCap, 5) : Math.ceil(trayCap / 2);
  const tr = trayCap <= 10 ? 1 : 2;
  host.innerHTML = `
    <div class="x2zg-g ${trayCap ? '' : 'x2zg-g-notray'}" style="--cols:${cols};--rows:${rows};--sc:${sc};--sr:${sr};--tc:${tc};--tr:${tr}">
      <div class="x2zg-expr" aria-live="polite">&nbsp;</div>
      <div class="x2zg-table ${rows === 1 ? 'x2zg-table-wall' : ''}">${rows === 1 ? WALL : ''}
        ${Array.from({ length: n }, (_, i) => `
          <button type="button" class="x2zg-box x2zg-${box}" data-i="${i}" aria-label="Đĩa ${i + 1}">
            <div class="x2zg-slots">${Array.from({ length: cap }, () => '<span class="x2zg-slot"></span>').join('')}</div>
            <div class="x2zg-tag">&nbsp;</div>
          </button>`).join('')}
      </div>
      ${trayCap ? `<button type="button" class="x2zg-tray" aria-label="Khay">
        <div class="x2zg-tslots">${Array.from({ length: trayCap }, () => '<span class="x2zg-tslot"></span>').join('')}</div></button>` : ''}
    </div>`;
  const root = host.querySelector('.x2zg-g');
  const boxes = [...root.querySelectorAll('.x2zg-box')];
  const trayEl = root.querySelector('.x2zg-tray');
  const tslots = trayEl ? [...trayEl.querySelectorAll('.x2zg-tslot')] : [];
  const counts = Array(n).fill(0);
  let left = 0, locked = false, gen = 0;
  t.root = root; t.counts = counts; t.boxes = boxes; t.trayEl = trayEl;
  Object.defineProperty(t, 'left', { get: () => left });
  Object.defineProperty(t, 'total', { get: () => counts.reduce((s, c) => s + c, 0) });

  const slot = (i, k) => boxes[i].querySelectorAll('.x2zg-slot')[k];
  t.setTray = (k) => { left = k; tslots.forEach((s, j) => { s.innerHTML = j < k ? itemSvg(item) : ''; }); };
  t.clear = () => { gen++; counts.fill(0); root.querySelectorAll('.x2zg-slot').forEach(s => { s.innerHTML = ''; }); boxes.forEach((_, i) => t.tag(i, '')); };
  t.show = (k) => boxes.forEach((b, i) => b.classList.toggle('x2zg-ghost', i >= k));
  t.expr = (html) => { root.querySelector('.x2zg-expr').innerHTML = `<span>${html || '&nbsp;'}</span>`; };
  t.tag = (i, html) => { boxes[i].querySelector('.x2zg-tag').innerHTML = html || '&nbsp;'; };
  t.glow = (is) => { const on = is == null ? null : new Set([].concat(is)); boxes.forEach((b, i) => b.classList.toggle('x2zg-on', !!on?.has(i))); };
  t.lock = (on) => { locked = on; root.classList.toggle('x2zg-locked', on); };
  t.box = (i) => boxes[i];

  /** Đặt k quả vào đĩa i (bay từ khay; khay hết thì bay từ giữa khay). */
  t.put = async (i, k = 1, { gap = 170 } = {}) => {
    const g = gen;
    const lands = [];
    for (let j = 0; j < k; j++) {
      if (counts[i] >= boxes[i].querySelectorAll('.x2zg-slot').length) break;
      const to = slot(i, counts[i]);
      counts[i]++;
      let fromRect;
      if (left > 0) { const s = tslots[left - 1]; fromRect = s.getBoundingClientRect(); s.innerHTML = ''; left--; } else {
        const r = (trayEl || boxes[i]).getBoundingClientRect(), w = to.getBoundingClientRect().width || 40;
        fromRect = { left: r.left + r.width / 2 - w / 2, top: r.top - w, width: w, height: w };
      }
      sfx.tap();
      lands.push(new Promise((res) => flyOne(itemFly(item), fromRect, to.getBoundingClientRect(), {
        minMs: 380, maxMs: 620, onLand: () => { if (g === gen) { to.innerHTML = itemSvg(item, 'x2zg-land'); sfx.pop(counts[i]); } res(); },
      })));
      await sleep(gap);
    }
    await Promise.all(lands);
    t.emit('put', i);
  };
  /** Đặt ngay (không bay). */
  t.fill = (i, k) => { for (let j = 0; j < k; j++) { slot(i, counts[i]).innerHTML = itemSvg(item); counts[i]++; } };

  root.addEventListener('click', (e) => {
    if (locked) return;
    const b = e.target.closest('.x2zg-box');
    if (b && !b.classList.contains('x2zg-ghost')) { t.emit('box', +b.dataset.i); return; }
    if (e.target.closest('.x2zg-tray')) t.emit('tray');
  });
  t.show(shown);
  t.setTray(tray);
  return t;
}

/** Dòng phép tính to: các phần có màu (số hạng, thừa số…). */
export const P = (x, c = '#1D4ED8') => `<b style="color:${c}">${x}</b>`;

let styled = false;
function injectGroupStyles() {
  if (styled) return;
  styled = true;
  css('x2zg-groups', `
    .x2zg-g { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 1.6cqh; padding: 1cqh 1.5cqi 2cqh; font-family: 'Baloo 2', sans-serif; }
    .x2zg-expr { flex: none; height: 13cqh; display: grid; place-items: center; font-weight: 800; color: #1E293B; font-size: min(9cqh, 6.2cqi); line-height: 1; white-space: nowrap; }
    .x2zg-expr small { font-size: 0.55em; color: #64748B; font-weight: 700; }
    .x2zg-table { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); grid-template-rows: repeat(var(--rows), minmax(0, 1fr));
      gap: 1.6cqh 1.4cqi; padding: 1.6cqh 1.4cqi; border-radius: 1.2rem; background: linear-gradient(180deg, #FDE7C3, #F4C98E); box-shadow: inset 0 -0.6cqh 0 #D9A066; }
    .x2zg-table { position: relative; overflow: hidden; }
    .x2zg-wall { position: absolute; inset: 0; width: 100%; height: 100%; }
    .x2zg-table-wall { background: #F2C48D; box-shadow: none; }
    .x2zg-table-wall .x2zg-box { --top: calc(100cqh - var(--ph) - var(--th) - 1cqh); }
    .x2zg-box { position: relative; min-width: 0; min-height: 0; container-type: size; border: none; cursor: pointer; touch-action: manipulation; padding: 0;
      background: transparent; transition: transform .2s, opacity .3s;
      --ph: min(78cqh, 80cqi); --th: min(17cqh, 24cqi); --pw: min(96cqi, calc(var(--ph) * 1.5)); --top: calc((100cqh - var(--ph) - var(--th)) / 2); }
    .x2zg-basket, .x2zg-carton { --ph: min(78cqh, 105cqi); }
    .x2zg-box::before { content: ''; position: absolute; left: 50%; top: var(--top); width: var(--pw); height: var(--ph); transform: translateX(-50%); box-sizing: border-box;
      border-radius: 50%; background: radial-gradient(ellipse at 50% 45%, #fff 55%, #E0F2FE 56%, #fff 70%); border: 2px solid #BAE6FD; box-shadow: 0 0.8cqh 0 #93C5FD; }
    .x2zg-basket::before { border-radius: 0.8em 0.8em 40% 40%; background: repeating-linear-gradient(90deg, #F59E0B 0 7%, #FBBF24 7% 14%); border-color: #B45309; box-shadow: 0 0.8cqh 0 #92400E; }
    .x2zg-carton::before { border-radius: 0.5em; background: linear-gradient(#FCD9A8, #E9B872); border-color: #B7791F; box-shadow: 0 0.8cqh 0 #B7791F; }
    .x2zg-slots { position: absolute; left: 50%; top: calc(var(--top) + var(--ph) / 2); transform: translate(-50%, -50%); display: grid; place-content: center;
      --s: min(calc(var(--ph) * 0.62 / var(--sr)), calc(var(--pw) * 0.8 / var(--sc)));
      grid-template-columns: repeat(var(--sc), var(--s)); grid-auto-rows: var(--s); gap: 0.4cqh 0.4cqi; }
    .x2zg-slot, .x2zg-tslot { display: block; width: 100%; height: 100%; }
    .x2zg-slot svg, .x2zg-tslot svg { width: 100%; height: 100%; display: block; }
    .x2zg-land { animation: x2zgLand .35s ease; }
    @keyframes x2zgLand { 40% { transform: scale(1.25); } }
    .x2zg-tag { position: absolute; left: 0; right: 0; top: calc(var(--top) + var(--ph)); height: var(--th); display: grid; place-items: center; font-weight: 800; color: #1D4ED8; font-size: calc(var(--th) * 0.85); line-height: 1; }
    .x2zg-on::before { border-color: #FACC15; box-shadow: 0 0 0 4px #FDE047, 0 0.8cqh 0 #EAB308; }
    .x2zg-ghost { opacity: 0.25; pointer-events: none; }
    .x2zg-ghost::before { border-style: dashed; }
    .x2zg-locked .x2zg-box, .x2zg-locked .x2zg-tray { cursor: default; }
    .x2zg-tray { flex: none; height: 20cqh; container-type: size; border: 2px solid #E9D5A6; border-radius: 1rem; cursor: pointer; touch-action: manipulation;
      background: linear-gradient(180deg, #FFFBEB, #FEF3C7); box-shadow: 0 5px 0 #E9C46A; display: grid; place-items: center; padding: 0.6cqh 1cqi; }
    .x2zg-tray:active { transform: translateY(3px); box-shadow: 0 2px 0 #E9C46A; }
    .x2zg-locked .x2zg-tray:active { transform: none; }
    .x2zg-tslots { display: grid; gap: 1cqh 1cqi; grid-template-columns: repeat(var(--tc), min(calc(86cqh / var(--tr)), calc(92cqi / var(--tc)))); grid-auto-rows: min(calc(86cqh / var(--tr)), calc(92cqi / var(--tc))); }
    .x2zg-g-notray .x2zg-table { margin-bottom: 14cqh; }
    @media (prefers-reduced-motion: reduce) { .x2zg-land { animation: x2zgCalm .4s ease; } @keyframes x2zgCalm { from { opacity: .3; } } }
  `);
}
