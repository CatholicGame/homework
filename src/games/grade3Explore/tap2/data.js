/**
 * Bài 73 (thu thập, phân loại, ghi chép số liệu, bảng số liệu) và Bài 74 (khả năng xảy ra của một sự kiện).
 *  - 🧺 Phân loại: dãy quả trong giỏ ở trên (quả đang xét to, sáng); ba nút loại quả to, mỗi lần bấm đúng thì quả bay
 *    vào nút và thêm một vạch đếm (vạch thứ 5 gạch chéo); xong thì số đếm bay vào bảng số liệu (giữ chỗ từ đầu).
 *  - 🎁 Hộp bóng: nhắm mắt lấy một quả bóng trong hộp (bóng bay ra khay rồi về hộp), rồi nói chắc chắn / có thể / không thể.
 */

import { css, emitter, INK } from '../../grade4Tools/frame.js';
import { flyOne } from '../../grade3Games/fly.js';
import { sleep, sfx, ask } from './kit.js';

const FRUIT = {
  tao: { name: 'Táo', svg: `<svg viewBox="0 0 60 60" aria-hidden="true"><path d="M30 16 C18 8 6 16 8 32 C10 48 22 56 30 50 C38 56 50 48 52 32 C54 16 42 8 30 16 Z" fill="#EF4444" stroke="${INK}" stroke-width="3"/><path d="M30 16 Q31 8 36 4" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M33 10 Q42 4 46 10 Q40 14 33 10 Z" fill="#4ADE80" stroke="${INK}" stroke-width="2"/><ellipse cx="20" cy="26" rx="4" ry="7" fill="#fff" opacity="0.5"/></svg>` },
  cam: { name: 'Cam', svg: `<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="33" r="22" fill="#FB923C" stroke="${INK}" stroke-width="3"/><path d="M30 11 Q34 6 40 7" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M31 12 Q24 4 18 9 Q24 14 31 12 Z" fill="#4ADE80" stroke="${INK}" stroke-width="2"/><g fill="#C2410C" opacity="0.5"><circle cx="22" cy="30" r="1.6"/><circle cx="36" cy="38" r="1.6"/><circle cx="30" cy="24" r="1.6"/><circle cx="40" cy="28" r="1.6"/></g></svg>` },
  xoai: { name: 'Xoài', svg: `<svg viewBox="0 0 60 60" aria-hidden="true"><path d="M14 40 C6 24 18 8 34 10 C50 12 56 30 46 44 C38 54 20 54 14 40 Z" fill="#FACC15" stroke="${INK}" stroke-width="3"/><path d="M34 10 Q36 4 40 3" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="24" cy="26" rx="4" ry="8" fill="#fff" opacity="0.5" transform="rotate(-25 24 26)"/></svg>` },
};

/** Vạch đếm: nhóm 5 (4 vạch đứng + 1 vạch chéo). */
function tallyHtml(n) {
  let out = '';
  for (let g = 0; g < Math.ceil(n / 5); g++) {
    const k = Math.min(5, n - g * 5);
    out += `<svg class="x3s-tally" viewBox="0 0 54 40" aria-hidden="true">${Array.from({ length: Math.min(4, k) }, (_, i) => `<line x1="${8 + i * 11}" y1="4" x2="${8 + i * 11}" y2="36" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`).join('')}${k === 5 ? `<line x1="2" y1="30" x2="48" y2="10" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/>` : ''}</svg>`;
  }
  return out;
}

export function createSort(host, items, kinds) {
  injectDataCss();
  const t = emitter({});
  host.innerHTML = `
    <div class="x3s">
      <div class="x3s-row">${items.map((k, i) => `<div class="x3s-it" data-i="${i}">${FRUIT[k].svg}</div>`).join('')}</div>
      <div class="x3s-kinds">${kinds.map(k => `<button type="button" class="x3s-kind" data-k="${k}"><span class="x3s-pic">${FRUIT[k].svg}</span><span class="x3s-name">${FRUIT[k].name}</span>
        <span class="x3s-marks"></span><span class="x3s-n">&nbsp;</span></button>`).join('')}</div>
      <table class="x3s-table"><tr><th>Loại quả</th>${kinds.map(k => `<td>${FRUIT[k].name}</td>`).join('')}</tr>
        <tr><th>Số quả</th>${kinds.map(k => `<td data-k="${k}"><span>&nbsp;</span></td>`).join('')}</tr></table>
    </div>`;
  const root = host.querySelector('.x3s');
  const counts = Object.fromEntries(kinds.map(k => [k, 0]));
  let cur = 0, locked = true, busy = false;
  t.root = root; t.counts = counts;
  t.cur = () => cur;
  t.kind = (k) => root.querySelector(`.x3s-kind[data-k="${k}"]`);
  t.want = () => items[cur];
  const mark = () => root.querySelectorAll('.x3s-it').forEach((e, i) => { e.classList.toggle('x3s-now', i === cur); e.classList.toggle('x3s-gone', i < cur); });
  /** Quả đang xét bay vào nút loại k (đúng loại). */
  t.put = (k) => new Promise((res) => {
    const it = root.querySelector(`.x3s-it[data-i="${cur}"]`);
    busy = true;
    const btn = t.kind(k);
    flyOne(FRUIT[k].svg, it.getBoundingClientRect(), btn.querySelector('.x3s-pic').getBoundingClientRect(), {
      minMs: 300, maxMs: 480, onLand: () => {
        counts[k]++;
        btn.querySelector('.x3s-marks').innerHTML = tallyHtml(counts[k]);
        btn.querySelector('.x3s-n').textContent = counts[k];
        btn.classList.remove('x3s-bump'); void btn.offsetWidth; btn.classList.add('x3s-bump');
        sfx.pop(counts[k]);
        busy = false;
        t.emit('change');
        res();
      },
    });
    it.classList.add('x3s-gone');
    cur++;
    mark();
  });
  /** Số đếm bay vào bảng. */
  t.toTable = async () => {
    for (const k of kinds) {
      const from = t.kind(k).querySelector('.x3s-n'), cell = root.querySelector(`td[data-k="${k}"] span`);
      await new Promise(res => flyOne(`<div class="x3s-fly">${counts[k]}</div>`, from.getBoundingClientRect(), cell.getBoundingClientRect(), {
        minMs: 380, maxMs: 560, onLand: () => { cell.textContent = counts[k]; cell.parentElement.classList.add('x3s-filled'); sfx.pop(2); res(); },
      }));
    }
  };
  t.glowTable = (on) => root.querySelector('.x3s-table').classList.toggle('x3s-tglow', on);
  t.lock = (on) => { locked = on; root.classList.toggle('x3s-locked', on); };
  root.addEventListener('click', (e) => {
    const b = e.target.closest('.x3s-kind');
    if (!b || locked || busy || cur >= items.length) return;
    if (b.dataset.k === items[cur]) { sfx.tap(); t.put(b.dataset.k); } else { sfx.boing(); b.classList.remove('x3s-no'); void b.offsetWidth; b.classList.add('x3s-no'); t.emit('wrong', b.dataset.k); }
  });
  mark();
  // DEV: bấm tự động đúng loại (trang tự chạy Khám phá, scripts/.tmp/x3b/auto.html)
  if (import.meta.env.DEV) window.__x3auto = () => { if (!root.isConnected || locked || busy || cur >= items.length) return false; t.kind(items[cur]).click(); return true; };
  return t;
}

const ITEMS = ['tao', 'cam', 'tao', 'xoai', 'cam', 'tao', 'tao', 'xoai', 'cam', 'xoai', 'tao', 'cam'];

async function sortUntil(c, t, n) {
  t.lock(false);
  const off = t.on((ev, k) => { if (ev === 'wrong') c.hint(`Quả đang sáng là quả ${FRUIT[t.want()].name.toLowerCase()}, không phải ${FRUIT[k].name.toLowerCase()}.`); });
  await c.until(t, () => t.cur() >= n, { nudge: () => `Quả đang sáng là quả gì? Bấm nút ${FRUIT[t.want()]?.name}.`, el: () => t.kind(t.want()) });
  off();
  t.lock(true);
}

const B73 = {
  title: 'Bài 73: Thu thập, phân loại, ghi chép số liệu. Bảng số liệu',
  setup: (board) => createSort(board, ITEMS, ['tao', 'cam', 'xoai']),
  steps: [
    async (c) => {
      const t = c.t;
      await c.say('Mai có một giỏ quả. Mai muốn biết mỗi loại có bao nhiêu quả. Em giúp Mai phân loại: quả đang sáng là quả gì thì bấm vào nút loại quả đó.',
        'Quả đang sáng là quả gì? <b>Bấm nút loại quả đó.</b>');
      await sortUntil(c, t, 4);
      await c.say('Mỗi quả được ghi một vạch. Ghi chép bằng vạch giúp không bị sót.', 'Mỗi quả: ghi <b>một vạch</b>');
    },
    async (c) => {
      const t = c.t;
      await c.say('Phân loại tiếp cho hết giỏ. Cứ đủ 4 vạch thì vạch thứ năm gạch chéo, để đếm theo nhóm 5.', 'Vạch thứ 5 <b>gạch chéo</b>: đếm theo nhóm 5');
      await sortUntil(c, t, ITEMS.length);
      sfx.ding();
    },
    async (c) => {
      const t = c.t;
      await c.say('Bây giờ ghi số đếm được vào bảng số liệu.', 'Ghi vào <b>bảng số liệu</b>');
      await t.toTable();
      t.glowTable(true);
      await c.say('Bảng số liệu cho biết: 5 quả táo, 4 quả cam, 3 quả xoài.', 'Táo <b>5</b> · Cam <b>4</b> · Xoài <b>3</b>');
      t.glowTable(false);
    },
    async (c) => {
      await ask(c, {
        say: 'Nhìn bảng số liệu. Loại quả nào nhiều nhất?', shown: 'Loại quả nào <b>nhiều nhất</b>?',
        options: [{ html: 'Táo', value: 'tao' }, { html: 'Cam', value: 'cam' }, { html: 'Xoài', value: 'xoai' }], answer: 'tao',
        hint: 'Tìm số lớn nhất ở hàng Số quả.', ok: 'Táo có 5 quả, nhiều nhất.',
      });
      await ask(c, {
        say: 'Số táo nhiều hơn số xoài bao nhiêu quả?', shown: 'Táo nhiều hơn xoài mấy quả?',
        options: [1, 2, 8], answer: 2, hint: 'Lấy 5 trừ 3.', ok: '5 trừ 3 bằng 2. Táo nhiều hơn xoài 2 quả.',
      });
    },
  ],
};

// ── Bài 74: Khả năng xảy ra ───────────────────────────────────────────────────────────────────────────
const BALL = { do: '#EF4444', xanh: '#3B82F6', vang: '#FACC15' };
const ballSvg = (c) => `<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="${BALL[c]}" stroke="${INK}" stroke-width="3"/><ellipse cx="13" cy="13" rx="5" ry="4" fill="#fff" opacity="0.6"/></svg>`;

export function createBag(host) {
  injectDataCss();
  const t = emitter({});
  host.innerHTML = `
    <div class="x3b">
      <div class="x3b-box"><div class="x3b-balls"></div><div class="x3b-front"><span>🙈</span></div></div>
      <div class="x3b-side">
        <div class="x3b-out"><span class="x3b-slot"></span><span class="x3b-said">&nbsp;</span></div>
        <button type="button" class="x3b-draw">✋ Lấy một quả bóng</button>
      </div>
    </div>`;
  const root = host.querySelector('.x3b');
  const balls = root.querySelector('.x3b-balls');
  const slot = root.querySelector('.x3b-slot');
  let content = [], seq = [], k = 0;
  t.root = root;
  t.btn = root.querySelector('.x3b-draw');
  t.fill = (list, order) => {
    content = list; seq = order || list; k = 0;
    balls.innerHTML = list.map((c, i) => `<span class="x3b-ball" data-i="${i}" style="--r:${(i * 37) % 40 - 20}deg">${ballSvg(c)}</span>`).join('');
    slot.innerHTML = '';
    root.querySelector('.x3b-said').innerHTML = '&nbsp;';
  };
  /** Lấy ra quả tiếp theo trong thứ tự đã định (em không nhìn thấy trong hộp). */
  t.draw = () => new Promise((res) => {
    const c = seq[k % seq.length];
    k++;
    const src = [...balls.children].find(b => content[+b.dataset.i] === c && !b.classList.contains('x3b-taken'));
    const prev = balls.querySelector('.x3b-taken');
    prev?.classList.remove('x3b-taken');
    src.classList.add('x3b-taken');
    slot.innerHTML = '';
    sfx.swish();
    flyOne(ballSvg(c), src.getBoundingClientRect(), slot.getBoundingClientRect(), {
      minMs: 450, maxMs: 650, spin: 200, onLand: () => {
        slot.innerHTML = ballSvg(c);
        root.querySelector('.x3b-said').innerHTML = `Bóng <b style="color:${BALL[c]}">${{ do: 'đỏ', xanh: 'xanh', vang: 'vàng' }[c]}</b>`;
        sfx.pop(3);
        t.emit('draw', c);
        res(c);
      },
    });
  });
  return t;
}

const CHOICE3 = [{ html: 'Chắc chắn', value: 'cc' }, { html: 'Có thể', value: 'ct' }, { html: 'Không thể', value: 'kt' }];

async function drawTimes(c, t, n) {
  for (let i = 0; i < n; i++) {
    c.show(i ? 'Bấm <b>lấy</b> thêm lần nữa!' : 'Bấm <b>✋ Lấy một quả bóng</b>');
    await c.tap(t.btn);
    await t.draw();
    await sleep(300);
  }
}

const B74 = {
  title: 'Bài 74: Khả năng xảy ra của một sự kiện',
  setup: (board) => { const t = createBag(board); t.fill(['do', 'do', 'do', 'do']); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      await c.say('Trong hộp có 4 quả bóng đỏ. Em nhắm mắt, lấy ra một quả bóng.', 'Hộp có <b>4 quả bóng đỏ</b>');
      await drawTimes(c, t, 2);
      await ask(c, {
        say: 'Lấy được quả bóng đỏ là chắc chắn, có thể, hay không thể?', shown: 'Lấy được bóng <b>đỏ</b>:',
        options: CHOICE3, answer: 'cc', hint: 'Trong hộp chỉ có bóng đỏ.', ok: 'Quả nào cũng đỏ, nên chắc chắn lấy được bóng đỏ.',
      });
    },
    async (c) => {
      await ask(c, {
        say: 'Còn lấy được quả bóng xanh thì sao?', shown: 'Lấy được bóng <b>xanh</b>:',
        options: CHOICE3, answer: 'kt', hint: 'Trong hộp có quả bóng xanh nào không?', ok: 'Hộp không có bóng xanh, nên không thể lấy được bóng xanh.',
      });
    },
    async (c) => {
      const t = c.t;
      t.fill(['do', 'do', 'vang', 'vang'], ['do', 'vang', 'vang', 'do']);
      await c.say('Bây giờ hộp có 2 quả bóng đỏ và 2 quả bóng vàng. Lấy thử ba lần xem.', 'Hộp có <b>2 đỏ, 2 vàng</b>. Lấy thử ba lần!');
      await drawTimes(c, t, 3);
      await ask(c, {
        say: 'Lấy được quả bóng đỏ là chắc chắn, có thể, hay không thể?', shown: 'Lấy được bóng <b>đỏ</b>:',
        options: CHOICE3, answer: 'ct', hint: 'Lần thì được đỏ, lần thì được vàng.', ok: 'Có lần đỏ, có lần vàng. Lấy được bóng đỏ là có thể.',
      });
    },
    async (c) => {
      await ask(c, {
        say: 'Gieo một xúc xắc 6 mặt, có từ 1 đến 6 chấm. Được mặt 7 chấm là chắc chắn, có thể, hay không thể?', shown: 'Xúc xắc 6 mặt: được mặt <b>7 chấm</b>',
        options: CHOICE3, answer: 'kt', hint: 'Xúc xắc chỉ có các mặt từ 1 đến 6 chấm.', ok: 'Không có mặt 7 chấm, nên không thể.',
      });
    },
  ],
};

export const DATA = { b73: B73, b74: B74 };

let styled = false;
function injectDataCss() {
  if (styled) return;
  styled = true;
  css('x3s-css', `
    .x3s { flex: 1; min-height: 0; container: x3s / size; display: flex; flex-direction: column; gap: 1.6cqh; padding: 1.6cqh 2cqi 16cqh; box-sizing: border-box; font-family: 'Baloo 2', sans-serif; }
    .x3s-row { flex: 0 0 24cqh; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); gap: 0.6cqi; align-items: center; background: #FEF3C7; border: 2px solid #FCD34D; border-radius: 1rem; padding: 0.8cqh 1cqi; }
    .x3s-it { min-width: 0; height: 100%; display: grid; place-items: center; transition: transform .25s, opacity .25s; }
    .x3s-it svg { width: 100%; height: 100%; }
    .x3s-now { transform: scale(1.25); filter: drop-shadow(0 0 6px #F59E0B); z-index: 1; }
    .x3s-gone { opacity: 0.15; }
    .x3s-kinds { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2cqi; }
    .x3s-kind { min-width: 0; min-height: 0; display: grid; grid-template-columns: auto 1fr; grid-template-rows: auto minmax(0, 1fr); gap: 0.6cqh 0.6cqi; align-items: center; background: #fff; border: 2px solid #BFDBFE; border-radius: 1rem; box-shadow: 0 6px 0 #93C5FD; padding: 1cqh 1cqi; cursor: pointer; font-family: inherit; touch-action: manipulation; container-type: size; }
    .x3s-kind:active { transform: translateY(4px); box-shadow: 0 2px 0 #93C5FD; }
    .x3s-pic { width: min(30cqh, 26cqi); aspect-ratio: 1; }
    .x3s-pic svg { width: 100%; height: 100%; }
    .x3s-name { font-weight: 800; color: #1E3A8A; font-size: min(18cqh, 15cqi); text-align: left; line-height: 1; }
    .x3s-marks { grid-column: 1 / -1; min-height: 0; height: 100%; display: flex; flex-wrap: wrap; gap: 2cqi; align-content: center; justify-content: center; }
    .x3s-tally { height: min(30cqh, 22cqi); width: auto; }
    .x3s-n { position: absolute; }
    .x3s-kind { position: relative; }
    .x3s-n { right: 0.4em; top: 0.2em; font-weight: 800; color: #DC2626; font-size: min(20cqh, 14cqi); line-height: 1; }
    .x3s-bump { animation: x3sBump .3s ease; }
    .x3s-no { animation: x3sNo .35s ease; }
    @keyframes x3sBump { 50% { transform: scale(1.04); } }
    @keyframes x3sNo { 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
    .x3s-locked .x3s-kind { cursor: default; }
    .x3s-table { flex: none; border-collapse: collapse; background: #fff; font-weight: 800; font-size: min(5.4cqh, 3.4cqi); text-align: center; width: 100%; table-layout: fixed; }
    .x3s-table th, .x3s-table td { border: 2px solid ${INK}; padding: 0.1em 0.3em; line-height: 1.25; }
    .x3s-table th { background: #E0F2FE; color: #0C4A6E; }
    .x3s-table td span { display: inline-block; min-width: 1.2em; }
    .x3s-filled { background: #DCFCE7; color: #15803D; }
    .x3s-tglow { box-shadow: 0 0 0 5px #FACC15; }
    .x3s-fly { width: 100%; height: 100%; display: grid; place-items: center; font: 800 1.6rem 'Baloo 2', sans-serif; color: #DC2626; }
    @media (orientation: portrait) { .x3s { padding-bottom: 13cqh; } }
    @container x3s (max-aspect-ratio: 1/1) {
      .x3s-row { flex-basis: 18cqh; }
      .x3s-kinds { grid-template-columns: 1fr; grid-template-rows: repeat(3, minmax(0, 1fr)); gap: 1.2cqh; }
      .x3s-kind { grid-template-columns: auto auto 1fr; grid-template-rows: 1fr; }
      .x3s-pic { width: min(70cqh, 16cqi); }
      .x3s-name { font-size: min(36cqh, 9cqi); }
      .x3s-marks { grid-column: auto; }
      .x3s-tally { height: min(55cqh, 12cqi); }
      .x3s-n { font-size: min(40cqh, 9cqi); top: 50%; transform: translateY(-50%); }
      .x3s-table { font-size: min(4.4cqh, 6cqi); }
    }

    .x3b { flex: 1; min-height: 0; display: flex; gap: 3cqi; padding: 2cqh 3cqi 17cqh; box-sizing: border-box; font-family: 'Baloo 2', sans-serif; }
    .x3b-box { flex: 1 1 0; min-width: 0; position: relative; display: flex; flex-direction: column; justify-content: flex-end; }
    .x3b-balls { position: absolute; left: 12%; right: 12%; top: 8%; height: 45%; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); align-items: end; gap: 2%; }
    .x3b-ball { display: block; transform: rotate(var(--r)); }
    .x3b-ball svg { width: 100%; height: auto; display: block; }
    .x3b-taken { visibility: hidden; }
    .x3b-front { position: relative; height: 60%; background: linear-gradient(180deg, #FDBA74, #FB923C); border: 4px solid ${INK}; border-radius: 0.6rem 0.6rem 1rem 1rem; display: grid; place-items: center; box-shadow: inset 0 10px 0 rgba(255,255,255,0.3); }
    .x3b-front::before { content: ''; position: absolute; left: 44%; right: 44%; top: 0; bottom: 0; background: #F43F5E; border-left: 3px solid ${INK}; border-right: 3px solid ${INK}; }
    .x3b-front span { position: relative; font-size: min(14cqh, 9cqi); }
    .x3b-side { flex: 0 0 40%; display: flex; flex-direction: column; gap: 2cqh; justify-content: center; }
    .x3b-out { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1cqh; background: #F0F9FF; border: 2px dashed #7DD3FC; border-radius: 1rem; container-type: size; }
    .x3b-slot { width: min(55cqh, 50cqi); aspect-ratio: 1; display: grid; place-items: center; }
    .x3b-slot svg { width: 100%; height: 100%; }
    .x3b-said { font-weight: 800; color: #1E293B; font-size: min(14cqh, 11cqi); line-height: 1.2; min-height: 1.2em; }
    .x3b-draw { flex: none; font-family: inherit; font-weight: 800; color: #fff; background: linear-gradient(180deg, #4ADE80, #22C55E); border: 2px solid #15803D; border-radius: 1rem; box-shadow: 0 6px 0 #15803D; font-size: min(6cqh, 3.6cqi); padding: 0.4em 0.5em; cursor: pointer; touch-action: manipulation; }
    .x3b-draw:active { transform: translateY(4px); box-shadow: 0 2px 0 #15803D; }
    @container (max-aspect-ratio: 1/1) {
      .x3b { flex-direction: column; padding-bottom: 14cqh; }
      .x3b-side { flex: 0 0 42%; flex-direction: row; }
      .x3b-out { flex: 1 1 0; }
      .x3b-draw { flex: 0 0 40%; font-size: min(4.6cqh, 6cqi); }
    }
    @media (prefers-reduced-motion: reduce) { .x3s-bump, .x3s-no { animation: none; } .x3s-now { transform: scale(1.12); } }
  `);
}
