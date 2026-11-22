/**
 * 🔟 Thêm, bớt chữ số 0 (Bài 41: Nhân, chia với 10, 100, 1 000,…): bảng hàng (triệu → đơn vị, màu theo lớp), các chữ
 * số là thẻ nằm trong cột hàng của mình.
 *   × 10 / × 100 / × 1 000: mọi chữ số trượt sang trái 1, 2, 3 hàng, chữ số 0 hiện ra ở các hàng bên phải.
 *   : 10 / : 100 / : 1 000 (số tròn chục, trăm, nghìn): các chữ số 0 bên phải rơi ra, các chữ số còn lại trượt sang phải.
 * Dòng trên cùng: phép tính (t.eq). Hàng nút (ops) bấm được; chia khi không đủ chữ số 0 thì nút rung (sự kiện 'blocked').
 * ops: false (Thực hành) → không có hàng nút, bảng to hơn; t.apply(op) chạy hiệu ứng bằng mã.
 * Lớp CSS: g4sh-.
 */

import { css, emitter, INK, EDGE, sfx } from './frame.js';
import { calmMotion } from '../grade3Games/fly.js';
import { fmt, PLACE, classOf, CLASS_INK, CLASS_BG, capFirst } from './num.js';
import { shake } from '../grade3Drills/kit.js';

const OP_LABEL = { '*10': '× 10', '*100': '× 100', '*1000': '× 1 000', ':10': ': 10', ':100': ': 100', ':1000': ': 1 000' };
const zerosOf = (n) => { let k = 0; while (n && n % 10 === 0) { n /= 10; k++; } return k; };

export function createShift(host, n, { ops = ['*10', '*100', '*1000', ':10', ':100', ':1000'], cols = 7, eq = true } = {}) {
  injectStyles();
  const t = emitter({});
  const places = Array.from({ length: cols }, (_, k) => cols - 1 - k);
  host.innerHTML = `
    <div class="g4sh${ops ? '' : ' g4sh-noops'}" style="--cols:${cols}">
      ${eq ? '<div class="g4sh-eq">&nbsp;</div>' : ''}
      <div class="g4sh-table">
        <div class="g4sh-heads">${places.map(p => `<div class="g4sh-h" style="--ink:${CLASS_INK[classOf(p)]};--bg:${CLASS_BG[classOf(p)]}">${capFirst(PLACE[p])}</div>`).join('')}</div>
        <div class="g4sh-row">${places.map(p => `<div class="g4sh-slot" style="--bg:${CLASS_BG[classOf(p)]}"></div>`).join('')}<div class="g4sh-tiles"></div></div>
      </div>
      ${ops ? `<div class="g4sh-ops">${ops.map(o => `<button type="button" class="g4sh-op g4sh-op-${o[0] === '*' ? 'm' : 'd'}" data-op="${o}">${OP_LABEL[o]}</button>`).join('')}</div>` : ''}
    </div>`;
  const root = host.querySelector('.g4sh');
  const layer = root.querySelector('.g4sh-tiles');
  const eqEl = root.querySelector('.g4sh-eq');
  let tiles = []; // { el, place, digit }
  let busy = false;
  const pos = (tile) => { tile.el.style.transform = `translateX(${(cols - 1 - tile.place) * 100}%)`; };
  const mk = (digit, place, cls = '') => {
    const el = document.createElement('div');
    el.className = `g4sh-tile ${cls}`;
    el.innerHTML = `<span>${digit}</span>`;
    const tile = { el, place, digit };
    pos(tile);
    layer.append(el);
    return tile;
  };
  t.value = n;
  t.root = root;
  t.set = (v) => {
    layer.innerHTML = '';
    tiles = [...String(v)].reverse().map((ch, p) => mk(ch, p));
    t.value = v;
  };
  t.set(n);
  t.eq = (html) => { if (eqEl) eqEl.innerHTML = html || '&nbsp;'; };
  /** Chỉ cho bấm các nút trong danh sách (null: mọi nút). */
  t.enable = (list) => root.querySelectorAll('.g4sh-op').forEach((b) => { b.disabled = !!list && !list.includes(b.dataset.op); });
  t.btn = (op) => root.querySelector(`[data-op="${op}"]`);
  /** Ẩn / hiện hàng nút (giữ chỗ). */
  t.showOps = (on) => { const o = root.querySelector('.g4sh-ops'); if (o) o.style.visibility = on ? '' : 'hidden'; };
  /** Có làm được phép này không (chia: đủ chữ số 0 ở bên phải; nhân: còn chỗ trong bảng). */
  t.can = (op) => {
    const k = op.length - 2;
    return op[0] === ':' ? zerosOf(t.value) >= k : String(t.value).length + k <= cols;
  };
  const ms = () => (calmMotion() ? 520 : 650);
  /** Chạy hiệu ứng của op, đổi giá trị. Trả về Promise khi xong. */
  t.apply = async (op) => {
    const k = op.length - 2; // '*10' → 1, '*1000' → 3
    if (busy || !t.can(op)) return false;
    busy = true;
    if (op[0] === '*') {
      tiles.forEach(x => { x.place += k; pos(x); });
      sfx.pop(2);
      await wait(ms() * 0.7);
      for (let p = k - 1; p >= 0; p--) {
        const z = mk('0', p, 'g4sh-zero g4sh-in');
        tiles.push(z);
        sfx.pop(5 - p);
        await wait(140);
      }
      t.value *= 10 ** k;
    } else {
      const gone = tiles.filter(x => x.place < k);
      gone.forEach(x => x.el.classList.add('g4sh-out'));
      sfx.pop(1);
      await wait(ms() * 0.6);
      gone.forEach(x => x.el.remove());
      tiles = tiles.filter(x => x.place >= k);
      tiles.forEach(x => { x.place -= k; pos(x); });
      sfx.pop(3);
      t.value /= 10 ** k;
    }
    await wait(ms());
    busy = false;
    t.emit('change', t.value, op);
    return true;
  };
  root.querySelectorAll('.g4sh-op').forEach((b) => {
    b.onclick = async () => {
      if (busy || b.disabled) return;
      const op = b.dataset.op;
      if (!t.can(op)) { shake(b); sfx.boing?.(); t.emit('blocked', op); return; }
      sfx.tap();
      await t.apply(op);
    };
  });
  return t;
}

const wait = (ms) => new Promise(r => setTimeout(r, ms));
export { fmt, zerosOf };

let styled = false;
function injectStyles() {
  if (styled) return;
  styled = true;
  css('g4-zeroshift', `
    .g4sh { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 2cqh; padding: 1cqh 1.5cqi 2cqh; box-sizing: border-box; font-family: 'Baloo 2', sans-serif; }
    .g4sh-eq { flex: none; text-align: center; font-weight: 800; color: #1E293B; font-size: min(10cqh, 6.4cqi); line-height: 1.2; min-height: 1.2em; }
    .g4sh-eq b { color: #DC2626; }
    .g4sh-table { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; border: 2px solid ${EDGE}; border-radius: 0.9rem; overflow: hidden; background: #fff; }
    .g4sh-heads { flex: none; display: grid; grid-template-columns: repeat(var(--cols), 1fr); }
    .g4sh-h { background: var(--bg); color: var(--ink); font-weight: 800; text-align: center; font-size: min(4.2cqh, 2.6cqi); line-height: 1.1; padding: 0.35em 0.1em; display: grid; place-items: center; min-height: 2.4em;
      border-right: 1px solid #fff; }
    .g4sh-row { flex: 1 1 0; min-height: 0; position: relative; display: grid; grid-template-columns: repeat(var(--cols), 1fr); container-type: size; }
    .g4sh-slot { background: color-mix(in srgb, var(--bg) 45%, #fff); border-right: 1px dashed #CBD5E1; }
    .g4sh-tiles { position: absolute; inset: 0; pointer-events: none; }
    .g4sh-tile { position: absolute; left: 0; top: 0; bottom: 0; width: calc(100% / var(--cols)); display: grid; place-items: center;
      transition: transform .65s cubic-bezier(.45,.05,.35,1.15); }
    .g4sh-tile span { display: grid; place-items: center; width: 78%; aspect-ratio: 0.8; max-height: 88%; border-radius: 0.18em; background: #fff; border: 2px solid #BFDBFE;
      box-shadow: 0 0.06em 0 #93C5FD; font-weight: 800; color: #1E3A8A; font-size: min(62cqh, 10cqw); line-height: 1; }
    .g4sh-zero span { color: #DC2626; border-color: #FCA5A5; box-shadow: 0 0.06em 0 #F87171; background: #FEF2F2; }
    .g4sh-in span { animation: g4shIn .45s cubic-bezier(.3,1.6,.5,1) both; }
    @keyframes g4shIn { from { transform: scale(0.1) translateY(-60%); opacity: 0; } }
    .g4sh-out span { animation: g4shOut .5s ease-in both; }
    @keyframes g4shOut { to { transform: translateY(120%) rotate(25deg); opacity: 0; } }
    .g4sh-ops { flex: none; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2cqh 1.4cqi; }
    .g4sh-op { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: min(6.4cqh, 4cqi); line-height: 1.15; padding: 0.15em 0.3em; border-radius: 0.6em; cursor: pointer; touch-action: manipulation;
      border: 2px solid #93C5FD; background: #EFF6FF; color: #1D4ED8; box-shadow: 0 5px 0 #93C5FD; }
    .g4sh-op-d { border-color: #FDBA74; background: #FFF7ED; color: #C2410C; box-shadow: 0 5px 0 #FDBA74; }
    .g4sh-op:disabled { opacity: 0.35; cursor: default; }
    .g4sh-op:active { transform: translateY(4px); box-shadow: 0 1px 0 #93C5FD; }
    @media (prefers-reduced-motion: reduce) {
      .g4sh-tile { transition-duration: .5s; transition-timing-function: ease-in-out; }
      .g4sh-in span { animation: g4shInCalm .4s ease both; } @keyframes g4shInCalm { from { opacity: 0; } }
      .g4sh-out span { animation: g4shOutCalm .45s ease both; } @keyframes g4shOutCalm { to { opacity: 0; transform: translateY(30%); } }
    }
    @container (orientation: portrait) {
      .g4sh-h { font-size: min(2.6cqh, 3.4cqi); }
      .g4sh-eq { font-size: min(7cqh, 9cqi); }
      .g4sh-op { font-size: min(4.4cqh, 6.4cqi); }
      .g4sh-tile span { font-size: min(40cqh, 11cqw); }
    }
  `);
  void INK;
}
