/**
 * Bài 47: Làm quen với chữ số La Mã. Công cụ 🥢 Que tính La Mã: khay có ba thẻ que tính I (1 que), V (2 que chụm),
 * X (2 que bắt chéo). Bấm thẻ ở khay → thẻ bay vào hàng, ghép thành số La Mã; bảng trên hiện giá trị (I đứng bên trái
 * V, X thì bớt 1; bên phải thì thêm). Bấm thẻ trong hàng → bỏ ra. Hàng giữ chỗ 6 thẻ từ đầu, cỡ thẻ cố định.
 */

import { css, emitter, INK } from '../../grade4Tools/frame.js';
import { flyOne } from '../../grade3Games/fly.js';
import { sleep, sfx, ask } from './kit.js';

const VAL = { I: 1, V: 5, X: 10 };
const SLOTS = 6;
/** Số → chữ số La Mã (1–39). */
export function toRoman(n) {
  let s = 'X'.repeat(Math.floor(n / 10));
  const u = n % 10;
  s += ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'][u];
  return s;
}
/** Giá trị của chuỗi La Mã viết đúng (1–39), sai cách viết → null. */
export function romanValue(s) {
  if (!s) return 0;
  let v = 0;
  for (let i = 0; i < s.length; i++) {
    const a = VAL[s[i]], b = VAL[s[i + 1]] || 0;
    v += a < b ? -a : a;
  }
  return v > 0 && v < 40 && toRoman(v) === s ? v : null;
}

const STICK = (x1, y1, x2, y2) => `
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="11" stroke-linecap="round"/>
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#F5C26B" stroke-width="7" stroke-linecap="round"/>
  <circle cx="${x1}" cy="${y1}" r="6.5" fill="#EF4444" stroke="${INK}" stroke-width="2"/>`;
const ART = {
  I: STICK(30, 10, 30, 90),
  V: `${STICK(8, 10, 30, 90)}${STICK(52, 10, 30, 90)}`,
  X: `${STICK(10, 10, 50, 90)}${STICK(50, 10, 10, 90)}`,
};
const tileHtml = (L) => `<div class="x3r-tile" data-l="${L}"><svg viewBox="0 0 60 100" aria-hidden="true">${ART[L]}</svg><b>${L}</b></div>`;

export function createRoman(host) {
  injectRomanCss();
  const t = emitter({});
  host.innerHTML = `
    <div class="x3r">
      <div class="x3r-top"><span class="x3r-str">&nbsp;</span><span class="x3r-eq">&nbsp;</span></div>
      <div class="x3r-row">${Array.from({ length: SLOTS }, () => '<div class="x3r-slot"></div>').join('')}</div>
      <div class="x3r-tray">
        ${['I', 'V', 'X'].map(L => `<button type="button" class="x3r-src" data-l="${L}" aria-label="${L}">${tileHtml(L)}<span>= ${VAL[L]}</span></button>`).join('')}
        <button type="button" class="x3r-src x3r-clear" aria-label="Xoá hết"><span class="x3r-ico">↺</span><span>Xoá</span></button>
      </div>
    </div>`;
  const root = host.querySelector('.x3r');
  const slots = [...root.querySelectorAll('.x3r-slot')];
  const src = (L) => root.querySelector(`.x3r-src[data-l="${L}"]`);
  let letters = [];
  let locked = true;
  t.root = root;
  t.src = src;
  t.clearBtn = root.querySelector('.x3r-clear');
  Object.defineProperty(t, 'str', { get: () => letters.join('') });
  Object.defineProperty(t, 'value', { get: () => romanValue(t.str) });

  function render() {
    const s = t.str, v = romanValue(s);
    root.querySelector('.x3r-str').textContent = s || ' ';
    const eq = root.querySelector('.x3r-eq');
    eq.textContent = !s ? ' ' : v ? `= ${v}` : '= ?';
    eq.classList.toggle('x3r-bad', !!s && !v);
    // I đứng trước V / X (bớt 1): vẽ dấu trừ nhỏ trên thẻ đó
    slots.forEach((sl, i) => sl.querySelector('.x3r-tile')?.classList.toggle('x3r-minus', VAL[letters[i]] < (VAL[letters[i + 1]] || 0)));
  }

  /** Thêm chữ L vào cuối hàng (bay từ khay). */
  t.add = (L, { quiet = false } = {}) => new Promise((res) => {
    if (letters.length >= SLOTS) { res(); return; }
    const i = letters.length;
    letters.push(L);
    const slot = slots[i];
    slot.innerHTML = tileHtml(L);
    const el = slot.firstElementChild;
    el.style.visibility = 'hidden';
    if (!quiet) sfx.tap();
    flyOne(tileHtml(L), src(L).querySelector('.x3r-tile').getBoundingClientRect(), slot.getBoundingClientRect(), {
      minMs: 300, maxMs: 480, className: 'x3r-fly',
      onLand: () => { el.style.visibility = ''; el.classList.add('x3r-land'); sfx.pop(i); render(); t.emit('change'); res(); },
    });
  });
  /** Bỏ chữ ở vị trí i (các chữ sau dồn sang trái). */
  t.removeAt = (i) => {
    const L = letters[i];
    if (!L) return;
    const tile = slots[i].firstElementChild;
    flyOne(tileHtml(L), tile.getBoundingClientRect(), src(L).querySelector('.x3r-tile').getBoundingClientRect(), { minMs: 260, maxMs: 400, className: 'x3r-fly' });
    letters.splice(i, 1);
    slots.forEach((sl, k) => { sl.innerHTML = letters[k] ? tileHtml(letters[k]) : ''; });
    sfx.tap();
    render();
    t.emit('change');
  };
  t.clear = () => { letters = []; slots.forEach(sl => { sl.innerHTML = ''; }); render(); t.emit('change'); };
  /** Thầy xếp cả chuỗi s (từng thẻ bay). */
  t.set = async (s) => { t.clear(); for (const L of s) { await t.add(L); await sleep(180); } };
  t.lock = (on) => { locked = on; root.classList.toggle('x3r-locked', on); };
  t.only = (ls) => root.querySelectorAll('.x3r-src[data-l]').forEach(b => b.classList.toggle('x3r-off', !!ls && !ls.includes(b.dataset.l)));
  t.glow = (L) => root.querySelectorAll('.x3r-src').forEach(b => b.classList.toggle('x3r-glow', b.dataset.l === L));

  root.addEventListener('click', (e) => {
    if (locked) return;
    const s = e.target.closest('.x3r-src');
    if (s?.classList.contains('x3r-clear')) { sfx.tap(); if (letters.length) t.clear(); return; }
    if (s && !s.classList.contains('x3r-off')) { t.add(s.dataset.l); return; }
    const sl = e.target.closest('.x3r-slot');
    if (sl && sl.firstElementChild) t.removeAt(slots.indexOf(sl));
  });
  t.lock(true);
  render();
  return t;
}

/** Em xếp số La Mã target; sai thứ tự thì nhắc bỏ thẻ ra. */
async function build(c, t, target, { say, shown, hint }) {
  t.lock(false);
  await c.say(say, shown);
  let warned = '';
  const off = t.on(() => {
    const s = t.str;
    if (s && !target.startsWith(s) && warned !== s) { warned = s; c.hint(hint(s)); }
  });
  await c.until(t, () => t.str === target, {
    nudge: () => (target.startsWith(t.str) ? `Bấm thẻ ${target[t.str.length]}.` : 'Bấm vào thẻ trong hàng để bỏ ra.'),
    el: () => (target.startsWith(t.str) ? t.src(target[t.str.length]) : t.clearBtn),
  });
  off();
  t.lock(true);
  sfx.ding();
}

export const ROMAN = {
  b47: {
    title: 'Bài 47: Làm quen với chữ số La Mã',
    setup: (board) => createRoman(board),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Người La Mã viết số bằng các chữ cái. Em ghép chúng bằng que tính.', 'Chữ số La Mã: ghép bằng <b>que tính</b>');
        for (const [L, w] of [['I', 'một'], ['V', 'năm'], ['X', 'mười']]) { t.glow(L); await c.say(`Chữ ${L} là ${w}.`, `<b>${L}</b> = ${VAL[L]}`); }
        t.glow(null);
        t.only(['I']);
        await build(c, t, 'I', { say: 'Bấm thẻ I.', shown: 'Bấm thẻ <b>I</b>.', hint: () => 'Bấm thẻ I có một que.' });
        t.only(null);
      },
      async (c) => {
        const t = c.t;
        await build(c, t, 'III', { say: 'Ghép thêm que để được số ba.', shown: 'Ghép thành số <b>3</b>.', hint: () => 'Số 3 là ba chữ I đứng cạnh nhau.' });
        await c.say('Hai chữ I là hai, ba chữ I là ba.', 'II = 2 · <b>III = 3</b>');
      },
      async (c) => {
        const t = c.t;
        await t.set('VI');
        await c.say('Chữ I đứng bên phải chữ V thì thêm 1: V I là sáu.', 'I bên <b>phải</b> V: thêm 1 → <b>VI = 6</b>');
        t.clear();
        await build(c, t, 'IV', {
          say: 'Còn chữ I đứng bên trái chữ V thì bớt 1. Em ghép số bốn.', shown: 'I bên <b>trái</b> V: bớt 1. Ghép số <b>4</b>.',
          hint: (s) => (s === 'V' ? 'Chữ I phải đứng trước, bên trái chữ V. Bấm Xoá rồi ghép lại.' : 'Số 4 là chữ I rồi đến chữ V.'),
        });
        await c.say('I V là bốn: năm bớt một.', '<b>IV = 4</b> (5 bớt 1)');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        await build(c, t, 'IX', {
          say: 'Tương tự, ghép số chín: mười bớt một.', shown: 'Ghép số <b>9</b> (10 bớt 1).',
          hint: () => 'Số 9: chữ I đứng bên trái chữ X.',
        });
        await c.say('I X là chín. Còn X I là mười một.', '<b>IX = 9</b>');
        await t.set('XI');
        await c.say('X I: mười thêm một, là mười một.', '<b>XI = 11</b> (10 thêm 1)');
      },
      async (c) => {
        const t = c.t;
        t.clear();
        await build(c, t, 'XIX', {
          say: 'Thử khó hơn: ghép số mười chín. Mười chín là mười với chín.', shown: 'Ghép số <b>19</b> = 10 và 9.',
          hint: () => '19 là X rồi đến IX.',
        });
        await c.say('X I X là mười chín. X X là hai mươi.', '<b>XIX = 19</b> · XX = 20');
      },
      async (c) => {
        const t = c.t;
        await t.set('XVIII');
        await ask(c, {
          say: 'Số La Mã này là số mấy?', shown: '<b>XVIII</b> là số mấy?',
          options: [13, 18, 22], answer: 18, hint: 'X là 10, V là 5, ba chữ I là 3.',
          ok: 'X V I I I là mười tám: mười, năm, và ba.', okShown: 'XVIII = 10 + 5 + 3 = <b>18</b>',
        });
      },
    ],
  },
};

let styled = false;
function injectRomanCss() {
  if (styled) return;
  styled = true;
  css('x3r-css', `
    .x3r { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 2cqh; padding: 2cqh 2cqi; font-family: 'Baloo 2', sans-serif; box-sizing: border-box; }
    .x3r-top { flex: none; display: flex; align-items: baseline; justify-content: center; gap: 0.4em; font-weight: 800; font-size: min(13cqh, 9cqi); line-height: 1.1; min-height: 1.15em; }
    .x3r-str { color: #B45309; letter-spacing: 0.06em; font-family: Georgia, 'Times New Roman', serif; }
    .x3r-eq { color: #1E3A8A; }
    .x3r-eq.x3r-bad { color: #DC2626; }
    .x3r-row { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: repeat(${SLOTS}, minmax(0, 1fr)); gap: 1.4cqi; background: #FFF7ED; border: 2px solid #FED7AA; border-radius: 1rem; padding: 2cqh 2cqi; container-type: size; }
    .x3r-slot { min-width: 0; min-height: 0; display: grid; place-items: center; border-radius: 0.8rem; background: rgba(255,255,255,0.7); border: 2px dashed #FDBA74; cursor: pointer; }
    .x3r-slot:empty { cursor: default; }
    .x3r-tile { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; }
    .x3r-tile svg { flex: 1 1 0; min-height: 0; width: 100%; }
    .x3r-tile b { flex: none; font-family: Georgia, 'Times New Roman', serif; font-weight: 800; color: #B45309; font-size: min(18cqh, 9cqi); line-height: 1; }
    .x3r-slot .x3r-tile b { font-size: min(16cqh, 7cqi); }
    .x3r-minus::after { content: '−1'; position: absolute; top: 0; right: 0; font-weight: 800; color: #fff; background: #EF4444; border-radius: 999px; padding: 0 0.35em; font-size: min(9cqh, 4cqi); }
    .x3r-land { animation: x3rLand .32s ease-out; }
    @keyframes x3rLand { 0% { transform: translateY(-18%) scale(1.06, 0.88); } 60% { transform: scale(0.96, 1.05); } }
    .x3r-tray { flex: 0 0 26cqh; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 2cqi; }
    .x3r-src { min-width: 0; min-height: 0; display: grid; grid-template-rows: minmax(0, 1fr) auto; align-items: stretch; justify-items: stretch; gap: 0.5cqh; background: #fff; border: 2px solid #FDBA74; border-radius: 1rem; box-shadow: 0 5px 0 #FB923C; cursor: pointer; padding: 1cqh 0.5cqi; font-family: inherit; touch-action: manipulation; container-type: size; }
    .x3r-src:active { transform: translateY(4px); box-shadow: 0 1px 0 #FB923C; }
    .x3r-src .x3r-tile { min-height: 0; height: 100%; flex-direction: row; gap: 4cqi; }
    .x3r-src .x3r-tile svg { flex: none; height: 100%; width: auto; max-width: 50%; }
    .x3r-src .x3r-tile b { font-size: min(45cqh, 32cqi); }
    .x3r-src > span { font-weight: 800; color: #9A3412; font-size: min(20cqh, 16cqi); line-height: 1; text-align: center; }
    .x3r-clear { border-color: #CBD5E1; box-shadow: 0 5px 0 #94A3B8; }
    .x3r-src > .x3r-ico { min-height: 0; display: grid; place-items: center; font-size: min(55cqh, 40cqi); color: #475569; }
    .x3r-clear > span:last-child { color: #475569; }
    .x3r-glow { box-shadow: 0 0 0 5px #FACC15, 0 5px 0 #FB923C; }
    .x3r-off { opacity: 0.3; pointer-events: none; filter: grayscale(0.6); }
    .x3r-locked .x3r-src, .x3r-locked .x3r-slot { cursor: default; }
    .g3-fly.x3r-fly { z-index: 4500; container-type: size; }
    .g3-fly.x3r-fly .x3r-tile b { font-size: 22cqh; font-family: Georgia, serif; color: #B45309; }
    .g3-fly.x3r-fly .x3r-tile { display: flex; flex-direction: column; }
    .g3-fly.x3r-fly .x3r-tile svg { flex: 1 1 0; min-height: 0; width: 100%; }
    @media (orientation: portrait) {
      .x3r-row { grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); }
      .x3r-slot .x3r-tile b { font-size: min(10cqh, 9cqi); }
      .x3r-tray { flex-basis: 20cqh; gap: 1.6cqi; }
      .x3r-src .x3r-tile { flex-direction: column; gap: 0; }
      .x3r-src .x3r-tile svg { max-width: 100%; flex: 1 1 0; min-height: 0; width: 100%; }
      .x3r-src .x3r-tile b { font-size: min(26cqh, 34cqi); }
    }
    @media (prefers-reduced-motion: reduce) { .x3r-land { animation: x3rCalm .3s ease-out; } @keyframes x3rCalm { from { opacity: 0.4; } } }
  `);
}
