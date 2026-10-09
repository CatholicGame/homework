/**
 * Bài 68: Tiền Việt Nam. Công cụ 💵 Ví tiền: hàng dưới là các tờ tiền (1 000 … 100 000 đồng, vẽ đơn giản theo màu,
 * không chép mẫu tiền thật); bấm tờ tiền → bay lên khay, bảng hiện tổng số tiền đã đưa; bấm tờ trên khay → lấy lại.
 * Phía trên: món hàng có giá ghi rõ. Khay giữ chỗ 6 tờ từ đầu, cỡ tờ cố định.
 */

import { css, emitter, INK } from '../../grade4Tools/frame.js';
import { flyOne } from '../../grade3Games/fly.js';
import { R, fmt, sleep, sfx, ask } from './kit.js';

const NOTES = [1000, 2000, 5000, 10000, 20000, 50000, 100000];
const COLOR = { 1000: ['#E9D5FF', '#7E22CE'], 2000: ['#FDE68A', '#A16207'], 5000: ['#BAE6FD', '#0369A1'], 10000: ['#FED7AA', '#C2410C'], 20000: ['#A5F3FC', '#0E7490'], 50000: ['#FBCFE8', '#BE185D'], 100000: ['#BBF7D0', '#15803D'] };
const SLOTS = 6;

/** Tờ tiền vẽ phẳng: nền màu, khung, bông hoa trang trí, số tiền to. */
export function noteSvg(v) {
  const [bg, ink] = COLOR[v];
  const txt = fmt(v);
  return `<svg class="x3m-note" viewBox="0 0 200 96" aria-hidden="true">
    <rect x="3" y="3" width="194" height="90" rx="10" fill="${bg}" stroke="${INK}" stroke-width="3"/>
    <rect x="12" y="12" width="176" height="72" rx="6" fill="none" stroke="${ink}" stroke-width="2" stroke-dasharray="6 5" opacity="0.6"/>
    <g transform="translate(40 48)" fill="${ink}" opacity="0.35">${[0, 72, 144, 216, 288].map(a => `<ellipse rx="7" ry="15" transform="rotate(${a}) translate(0 -12)"/>`).join('')}</g>
    <circle cx="40" cy="48" r="6" fill="#fff" stroke="${ink}" stroke-width="2"/>
    <text x="128" y="58" text-anchor="middle" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="${txt.length > 6 ? 34 : 38}" fill="${ink}">${txt}</text>
    <text x="128" y="80" text-anchor="middle" font-family="'Baloo 2', sans-serif" font-weight="700" font-size="15" fill="${ink}">đồng</text>
  </svg>`;
}

/** Hộp bút (món hàng). */
const PENCIL_BOX = `<svg viewBox="0 0 120 90" aria-hidden="true"><rect x="10" y="30" width="100" height="50" rx="8" fill="#60A5FA" stroke="${INK}" stroke-width="3"/>
  <rect x="24" y="8" width="12" height="34" fill="#FACC15" stroke="${INK}" stroke-width="2.5"/><path d="M24 8 L30 0 L36 8 Z" fill="#FDE68A" stroke="${INK}" stroke-width="2"/>
  <rect x="46" y="12" width="12" height="30" fill="#F87171" stroke="${INK}" stroke-width="2.5"/><path d="M46 12 L52 4 L58 12 Z" fill="#FDE68A" stroke="${INK}" stroke-width="2"/>
  <rect x="68" y="6" width="12" height="36" fill="#4ADE80" stroke="${INK}" stroke-width="2.5"/><path d="M68 6 L74 -2 L80 6 Z" fill="#FDE68A" stroke="${INK}" stroke-width="2"/>
  <rect x="10" y="30" width="100" height="16" fill="#3B82F6" stroke="${INK}" stroke-width="3"/></svg>`;

export function createMoney(host, { item = '', price = '' } = {}) {
  injectMoneyCss();
  const t = emitter({});
  host.innerHTML = `
    <div class="x3m">
      <div class="x3m-top">
        <div class="x3m-item"><div class="x3m-pic">${PENCIL_BOX}</div><div class="x3m-price">&nbsp;</div></div>
        <div class="x3m-traywrap">
          <div class="x3m-tray">${Array.from({ length: SLOTS }, () => '<div class="x3m-slot"></div>').join('')}</div>
          <div class="x3m-sum">&nbsp;</div>
        </div>
      </div>
      <div class="x3m-wallet">${NOTES.map(v => `<button type="button" class="x3m-src" data-v="${v}" aria-label="${fmt(v)} đồng">${noteSvg(v)}</button>`).join('')}</div>
    </div>`;
  const root = host.querySelector('.x3m');
  const slots = [...root.querySelectorAll('.x3m-slot')];
  let vals = [], locked = true;
  t.root = root;
  t.src = (v) => root.querySelector(`.x3m-src[data-v="${v}"]`);
  Object.defineProperty(t, 'sum', { get: () => vals.reduce((a, b) => a + b, 0) });
  Object.defineProperty(t, 'vals', { get: () => [...vals] });
  const render = () => {
    root.querySelector('.x3m-sum').innerHTML = vals.length ? `Đã đưa: <b>${fmt(t.sum)}</b> đồng` : '&nbsp;';
    slots.forEach((s, i) => { if (!s.firstElementChild && vals[i]) s.innerHTML = noteSvg(vals[i]); });
  };
  t.price = (html) => { root.querySelector('.x3m-price').innerHTML = html || '&nbsp;'; root.querySelector('.x3m-item').classList.toggle('x3m-noitem', !html); };
  t.price(price);
  /** Tờ v bay từ ví lên khay. */
  t.add = (v) => new Promise((res) => {
    if (vals.length >= SLOTS) { res(); return; }
    const i = vals.length;
    vals.push(v);
    const slot = slots[i];
    slot.innerHTML = noteSvg(v);
    const el = slot.firstElementChild;
    el.style.visibility = 'hidden';
    sfx.tap();
    flyOne(noteSvg(v), t.src(v).getBoundingClientRect(), slot.getBoundingClientRect(), {
      minMs: 320, maxMs: 520, spin: 8, onLand: () => { el.style.visibility = ''; el.classList.add('x3m-land'); sfx.pop(i); render(); t.emit('change'); res(); },
    });
  });
  t.removeAt = (i) => {
    const v = vals[i];
    if (!v) return;
    flyOne(noteSvg(v), slots[i].getBoundingClientRect(), t.src(v).getBoundingClientRect(), { minMs: 280, maxMs: 420 });
    vals.splice(i, 1);
    slots.forEach((s, k) => { s.innerHTML = vals[k] ? noteSvg(vals[k]) : ''; });
    sfx.tap();
    render();
    t.emit('change');
  };
  t.clear = () => { vals = []; slots.forEach(s => { s.innerHTML = ''; }); render(); t.emit('change'); };
  /** Các tờ trên khay bay dồn vào ô đầu thành một tờ v (đổi tiền). */
  t.merge = async (v) => {
    const to = slots[0].getBoundingClientRect();
    await Promise.all(slots.slice(1).filter(s => s.firstElementChild).map((s, k) => new Promise((res) => {
      const r = s.getBoundingClientRect(), html = s.innerHTML;
      s.innerHTML = '';
      flyOne(html, r, to, { delay: k * 90, minMs: 320, maxMs: 480, onLand: res });
    })));
    vals = [v];
    slots[0].innerHTML = noteSvg(v);
    slots[0].firstElementChild.classList.add('x3m-pop');
    sfx.ding();
    render();
  };
  t.lock = (on) => { locked = on; root.classList.toggle('x3m-locked', on); };
  t.glow = (v) => root.querySelectorAll('.x3m-src').forEach(b => b.classList.toggle('x3m-glow', +b.dataset.v === v));
  root.addEventListener('click', (e) => {
    if (locked) return;
    const s = e.target.closest('.x3m-src');
    if (s) { t.add(+s.dataset.v); return; }
    const sl = e.target.closest('.x3m-slot');
    if (sl?.firstElementChild) t.removeAt(slots.indexOf(sl));
  });
  t.lock(true);
  render();
  return t;
}

const B68 = {
  title: 'Bài 68: Tiền Việt Nam',
  setup: (board) => createMoney(board),
  steps: [
    async (c) => {
      const t = c.t;
      await c.say('Đây là các tờ tiền Việt Nam em đã học. Đơn vị là đồng.', 'Các tờ tiền: đơn vị là <b>đồng</b>');
      for (const v of NOTES) { t.glow(v); await sleep(350); }
      t.glow(null);
      await c.say(`Có các tờ ${[1000, 2000, 5000, 10000, 20000, 50000, 100000].map(R).join(', ')} đồng.`, '1 000 · 2 000 · 5 000 · 10 000 · 20 000 · 50 000 · 100 000 đồng');
      t.lock(false);
      await c.say(`Bấm vào tờ ${R(20000)} đồng.`, 'Bấm vào tờ <b>20 000 đồng</b>.');
      let warned = false;
      const off = t.on(() => { if (t.vals.some(v => v !== 20000) && !warned) { warned = true; c.hint('Tờ hai mươi nghìn có màu xanh ngọc. Bấm tờ trên khay để trả lại tờ chọn nhầm.'); } });
      await c.until(t, () => t.vals.length === 1 && t.vals[0] === 20000, { nudge: 'Tìm tờ có số 20 000.', el: () => t.src(20000) });
      off();
      t.lock(true);
      sfx.ding();
    },
    async (c) => {
      const t = c.t;
      t.clear();
      t.price('Hộp bút<br><b>35 000 đồng</b>');
      t.lock(false);
      await c.say(`Một hộp bút giá ${R(35000)} đồng. Em chọn các tờ tiền để trả vừa đủ ${R(35000)} đồng.`, 'Trả vừa đủ <b>35 000 đồng</b>');
      let warned = 0;
      const off = t.on(() => { if (t.sum > 35000 && warned !== t.sum) { warned = t.sum; c.hint('Nhiều quá rồi. Bấm vào tờ tiền trên khay để lấy lại.'); } });
      await c.until(t, () => t.sum === 35000, {
        nudge: () => (t.sum > 35000 ? 'Bấm tờ tiền trên khay để lấy lại bớt.' : `Còn thiếu ${R(35000 - t.sum)} đồng.`),
        el: () => (t.sum < 35000 ? t.src([20000, 10000, 5000, 2000, 1000].find(v => v <= 35000 - t.sum)) : null),
      });
      off();
      t.lock(true);
      sfx.ding();
      await c.say(`Đúng rồi! Em đưa vừa đủ ${R(35000)} đồng. Ví dụ: hai mươi nghìn, mười nghìn và năm nghìn.`, '20 000 + 10 000 + 5 000 = <b>35 000</b> đồng');
    },
    async (c) => {
      const t = c.t;
      t.clear();
      t.price('');
      await c.say(`Đổi tiền: 5 tờ ${R(10000)} đồng đổi được 1 tờ ${R(50000)} đồng.`, '5 tờ 10 000 đồng = <b>1 tờ 50 000 đồng</b>');
      for (let k = 0; k < 5; k++) { await t.add(10000); await sleep(120); }
      await c.say(`5 lần ${R(10000)} là ${R(50000)}.`, '10 000 × 5 = 50 000');
      await t.merge(50000);
      await ask(c, {
        say: `2 tờ ${R(50000)} đồng đổi được mấy tờ ${R(100000)} đồng?`, shown: '2 tờ 50 000 đồng = ? tờ 100 000 đồng',
        options: [{ html: '1 tờ', value: 1 }, { html: '2 tờ', value: 2 }, { html: '5 tờ', value: 5 }], answer: 1,
        hint: `${R(50000)} cộng ${R(50000)} bằng bao nhiêu?`, ok: `${R(50000)} cộng ${R(50000)} bằng ${R(100000)}: đổi được 1 tờ.`,
      });
    },
    async (c) => {
      const t = c.t;
      t.clear();
      t.price('Rau 20 000 đồng<br>Thịt 70 000 đồng');
      await t.add(100000);
      await c.say(`Mẹ mua rau hết ${R(20000)} đồng, mua thịt hết ${R(70000)} đồng. Mẹ đưa tờ ${R(100000)} đồng.`, 'Mua hết 20 000 + 70 000 = 90 000 đồng');
      await ask(c, {
        say: 'Cô bán hàng trả lại mẹ bao nhiêu tiền?', shown: '100 000 − 90 000 = ?',
        options: [{ html: '10 000 đồng', value: 10000 }, { html: '20 000 đồng', value: 20000 }, { html: '30 000 đồng', value: 30000 }], answer: 10000,
        hint: 'Lấy số tiền mẹ đưa trừ số tiền phải trả.', ok: `${R(100000)} trừ ${R(90000)} bằng ${R(10000)} đồng.`,
      });
    },
  ],
};

export const MONEY = { b68: B68 };

let styled = false;
function injectMoneyCss() {
  if (styled) return;
  styled = true;
  css('x3m-css', `
    .x3m { flex: 1; min-height: 0; display: grid; grid-template-rows: minmax(0, 1fr) 21cqh; gap: 2cqh; padding: 2cqh 2cqi 17cqh; box-sizing: border-box; font-family: 'Baloo 2', sans-serif; }
    .x3m-top { min-height: 0; display: grid; grid-template-columns: 30% minmax(0, 1fr); gap: 2cqi; }
    .x3m-item { min-width: 0; min-height: 0; overflow: hidden; display: grid; grid-template-rows: minmax(0, 1fr) auto; place-items: center; gap: 1cqh; background: #FFFBEB; border: 2px solid #FDE68A; border-radius: 1rem; padding: 1cqh; }
    .x3m-noitem .x3m-pic { visibility: hidden; }
    .x3m-pic { min-height: 0; width: 100%; height: 100%; display: grid; place-items: center; }
    .x3m-pic svg { width: 100%; height: 100%; }
    .x3m-price { text-align: center; font-weight: 800; color: #92400E; font-size: min(4.6cqh, 2.8cqi); line-height: 1.2; min-height: 2.4em; }
    .x3m-price b { color: #DC2626; }
    .x3m-traywrap { min-width: 0; min-height: 0; display: grid; grid-template-rows: minmax(0, 1fr) auto; gap: 1cqh; }
    .x3m-tray { min-height: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); gap: 1.4cqh 1.4cqi; background: #F0FDF4; border: 2px dashed #86EFAC; border-radius: 1rem; padding: 1.4cqh 1.4cqi; }
    .x3m-slot { min-width: 0; min-height: 0; display: grid; place-items: center; cursor: pointer; }
    .x3m-slot:empty { cursor: default; }
    .x3m-slot svg, .g3-fly svg.x3m-note { width: 100%; height: 100%; }
    .x3m-sum { text-align: center; font-weight: 800; color: #1E3A8A; font-size: min(5.4cqh, 3.6cqi); line-height: 1.2; min-height: 1.2em; }
    .x3m-sum b { color: #15803D; }
    .x3m-wallet { min-height: 0; display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 1cqi; }
    .x3m-src { min-width: 0; min-height: 0; padding: 0.4cqh 0.3cqi; background: #fff; border: 2px solid #E2E8F0; border-radius: 0.7rem; box-shadow: 0 5px 0 #CBD5E1; cursor: pointer; display: grid; place-items: center; touch-action: manipulation; }
    .x3m-src svg { width: 100%; height: 100%; }
    .x3m-src:active { transform: translateY(4px); box-shadow: 0 1px 0 #CBD5E1; }
    .x3m-locked .x3m-src, .x3m-locked .x3m-slot { cursor: default; }
    .x3m-glow { box-shadow: 0 0 0 5px #FACC15, 0 5px 0 #CBD5E1; transform: translateY(-4px); }
    .x3m-land { animation: x3mLand .3s ease-out; }
    .x3m-pop { animation: x3mPop .45s cubic-bezier(.2,1.6,.4,1); }
    @keyframes x3mLand { from { transform: scale(1.08) rotate(-3deg); } }
    @keyframes x3mPop { from { transform: scale(0.4); } }
    @container (max-aspect-ratio: 1/1) {
      .x3m { grid-template-rows: minmax(0, 1fr) 24cqh; }
      .x3m-top { grid-template-columns: none; grid-template-rows: 26% minmax(0, 1fr); }
      .x3m-item { grid-template-rows: none; grid-template-columns: minmax(0, 1fr) auto; }
      .x3m-price { font-size: min(4cqh, 5.4cqi); padding-right: 0.5em; }
      .x3m-tray { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .x3m-wallet { grid-template-columns: repeat(4, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); }
      .x3m-sum { font-size: min(4.4cqh, 6cqi); }
    }
    @media (orientation: portrait) { .x3m { padding-bottom: 14cqh; } }
    @media (prefers-reduced-motion: reduce) { .x3m-land, .x3m-pop { animation: x3mCalm .3s ease-out; } @keyframes x3mCalm { from { opacity: 0.4; } } }
  `);
}
