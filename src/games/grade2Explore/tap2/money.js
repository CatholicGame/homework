/**
 * 🪙 Quầy hàng (Bài 56 Giới thiệu tiền Việt Nam): món hàng có thẻ giá ở trên quầy, khay trả tiền, ví ở dưới.
 * Bấm tờ tiền trong ví → bay lên khay (chỗ trong ví giữ nguyên, để trống); bấm tờ trên khay → bay về ví.
 * Tờ tiền vẽ lại đơn giản (noteSvg của Quầy tạp hóa lớp 2). Sự kiện: ('pay', giá trị) / ('back', giá trị).
 */

import { css, emitter, sfx } from '../../grade4Tools/frame.js';
import { flyOne } from '../../grade3Games/fly.js';
import { noteSvg, fmtMoney } from '../../grade2Games/shop.js';
import { itemSvg, INK } from './art.js';

const flyNote = (v) => noteSvg(v).replace('class="g2s-note-svg"', 'width="100%" height="100%" preserveAspectRatio="none"');
const TRAY = 5;

export function createMoney(host, { wallet = [100, 200, 500, 1000], item = null } = {}) {
  injectMoneyStyles();
  const t = emitter({});
  host.innerHTML = `
    <div class="x2m">
      <div class="x2zm-cap">&nbsp;</div>
      <div class="x2zm-counter">
        <div class="x2zm-goods"></div>
        <div class="x2zm-tray"><div class="x2zm-tslots">${Array.from({ length: TRAY }, (_, i) => `<button type="button" class="x2zm-tslot" data-t="${i}" aria-label="Tờ tiền trên khay"></button>`).join('')}</div>
          <div class="x2zm-sum">&nbsp;</div></div>
      </div>
      <div class="x2zm-wallet"></div>
    </div>`;
  const root = host.querySelector('.x2m');
  const goods = root.querySelector('.x2zm-goods');
  const walletEl = root.querySelector('.x2zm-wallet');
  const tslots = [...root.querySelectorAll('.x2zm-tslot')];
  const sumEl = root.querySelector('.x2zm-sum');
  let notes = [], tray = Array(TRAY).fill(null), locked = false;
  t.root = root;
  Object.defineProperty(t, 'total', { get: () => tray.reduce((s, x) => s + (x ? x.v : 0), 0) });
  Object.defineProperty(t, 'paid', { get: () => tray.filter(Boolean).map(x => x.v) });
  t.caption = (html) => { root.querySelector('.x2zm-cap').innerHTML = `<span>${html || '&nbsp;'}</span>`; };
  t.lock = (on) => { locked = on; };

  const render = () => {
    tslots.forEach((s, i) => { s.innerHTML = tray[i] ? noteSvg(tray[i].v) : ''; s.classList.toggle('x2zm-full', !!tray[i]); });
    const tot = t.total;
    sumEl.innerHTML = tot ? `${fmtMoney(tot)} đồng` : '&nbsp;';
  };
  /** Ví mới. */
  t.setWallet = (vals) => {
    notes = vals.map((v, i) => ({ v, i, out: false }));
    tray.fill(null);
    walletEl.style.setProperty('--n', Math.max(4, vals.length));
    walletEl.innerHTML = notes.map(n => `<button type="button" class="x2zm-note" data-w="${n.i}" aria-label="${n.v} đồng">${noteSvg(n.v)}</button>`).join('');
    render();
  };
  /** Món hàng: { art, name, price } (null = không có). */
  t.setItem = (it) => {
    goods.innerHTML = it ? `<div class="x2zm-art">${itemSvg(it.art)}</div><div class="x2zm-tag"><span>${it.name}</span><b>${fmtMoney(it.price)} đồng</b></div>` : '';
    goods.classList.toggle('x2zm-empty', !it);
  };
  t.wbtn = (i) => walletEl.querySelector(`[data-w="${i}"]`);
  t.noteIndex = (v) => notes.findIndex(n => n.v === v && !n.out);

  /** Đưa tờ thứ i của ví lên khay. */
  t.pay = (i) => new Promise((res) => {
    const n = notes[i];
    const k = tray.indexOf(null);
    if (!n || n.out || k < 0) { res(); return; }
    n.out = true;
    tray[k] = n;
    const btn = t.wbtn(i);
    const from = btn.getBoundingClientRect();
    btn.classList.add('x2zm-gone');
    tslots[k].classList.add('x2zm-wait');
    sfx.swish();
    flyOne(flyNote(n.v), from, tslots[k].getBoundingClientRect(), { minMs: 420, maxMs: 700, onLand: () => { tslots[k].classList.remove('x2zm-wait'); render(); sfx.tap(); t.emit('pay', n.v); res(); } });
  });
  /** Trả tờ ở ô khay k về ví. */
  t.back = (k) => new Promise((res) => {
    const n = tray[k];
    if (!n) { res(); return; }
    tray[k] = null;
    const from = tslots[k].getBoundingClientRect();
    render();
    const btn = t.wbtn(n.i);
    flyOne(flyNote(n.v), from, btn.getBoundingClientRect(), { minMs: 380, maxMs: 600, onLand: () => { n.out = false; btn.classList.remove('x2zm-gone'); sfx.tap(); t.emit('back', n.v); res(); } });
  });
  t.clearTray = async () => { for (let k = 0; k < TRAY; k++) if (tray[k]) await t.back(k); };

  root.addEventListener('click', (e) => {
    if (locked) return;
    const w = e.target.closest('.x2zm-note');
    if (w && !w.classList.contains('x2zm-gone')) { t.pay(+w.dataset.w); return; }
    const s = e.target.closest('.x2zm-tslot');
    if (s && tray[+s.dataset.t]) t.back(+s.dataset.t);
  });
  t.setWallet(wallet);
  t.setItem(item);
  return t;
}

let styled = false;
function injectMoneyStyles() {
  if (styled) return;
  styled = true;
  css('x2zm-money', `
    .x2m { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 1.6cqh; padding: 1cqh 1.5cqi 2cqh; font-family: 'Baloo 2', sans-serif; }
    .x2zm-cap { flex: none; height: 10cqh; display: grid; place-items: center; font-weight: 800; color: #1E293B; font-size: min(7cqh, 5cqi); line-height: 1.05; text-align: center; }
    .x2zm-counter { flex: 1 1 0; min-height: 0; display: flex; gap: 2cqi; padding: 2cqh 2cqi; border-radius: 1.2rem; container-type: size;
      background: linear-gradient(180deg, #DBEAFE 0 18%, #FDE7C3 18% 100%); box-shadow: inset 0 -1cqh 0 #D9A066; position: relative; }
    .x2zm-counter::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 18%; border-radius: 1.2rem 1.2rem 0 0;
      background: repeating-linear-gradient(90deg, #F87171 0 8%, #fff 8% 16%); clip-path: polygon(0 0, 100% 0, 100% 70%, 96% 100%, 92% 70%, 88% 100%, 84% 70%, 80% 100%, 76% 70%, 72% 100%, 68% 70%, 64% 100%, 60% 70%, 56% 100%, 52% 70%, 48% 100%, 44% 70%, 40% 100%, 36% 70%, 32% 100%, 28% 70%, 24% 100%, 20% 70%, 16% 100%, 12% 70%, 8% 100%, 4% 70%, 0 100%); }
    .x2zm-goods { flex: 0 0 34%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 1cqh; padding-top: 18cqh; min-width: 0; }
    .x2zm-art { flex: 1 1 0; min-height: 0; aspect-ratio: 1; max-width: 100%; }
    .x2zm-art svg { width: 100%; height: 100%; display: block; }
    .x2zm-tag { flex: none; display: flex; flex-direction: column; align-items: center; background: #fff; border: 2px solid #FDBA74; border-radius: 0.8em; padding: 0.15em 0.6em; font-size: min(6.5cqh, 4.6cqi); line-height: 1.15; color: ${INK}; }
    .x2zm-tag span { font-weight: 700; font-size: 0.8em; } .x2zm-tag b { color: #C2410C; white-space: nowrap; }
    .x2zm-empty { visibility: hidden; }
    .x2zm-tray { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 1cqh; padding-top: 18cqh; }
    .x2zm-tslots { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 1.4cqh 1.4cqi;
      background: #fff; border: 2px dashed #CBD5E1; border-radius: 1rem; padding: 1.4cqh 1.4cqi; }
    .x2zm-tslot { border: none; background: transparent; padding: 0; min-width: 0; min-height: 0; cursor: pointer; display: grid; place-items: center; }
    .x2zm-tslot svg { width: 100%; height: 100%; max-height: 100%; }
    .x2zm-tslot:not(.x2zm-full) { cursor: default; }
    .x2zm-wait { visibility: hidden; }
    .x2zm-sum { flex: none; height: 9cqh; display: grid; place-items: center; font-weight: 800; color: #15803D; font-size: min(7.5cqh, 5.2cqi); background: #F0FDF4; border-radius: 0.8rem; }
    .x2zm-wallet { flex: none; height: 23cqh; margin-bottom: 13cqh; display: grid; grid-template-columns: repeat(var(--n), 1fr); gap: 1.4cqi; padding: 1.2cqh 1.4cqi; border-radius: 1rem;
      background: linear-gradient(180deg, #A16207, #854D0E); box-shadow: 0 5px 0 #713F12; }
    .x2zm-note { border: none; background: transparent; padding: 0; min-width: 0; cursor: pointer; display: grid; place-items: center; transition: transform .15s; }
    .x2zm-note svg { width: 100%; height: 100%; filter: drop-shadow(0 3px 0 rgba(0,0,0,.25)); }
    .x2zm-note:active { transform: translateY(3px); }
    .x2zm-gone { visibility: hidden; }
  `);
}
