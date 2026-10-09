/**
 * Bài 66: Xem đồng hồ. Tháng – năm. Hai Khám phá:
 *  - b66  ⏰ Đồng hồ kim: bấm "+1 giờ / +5 phút / +1 phút", kim quay tới giờ mới (kim dài quét cả vòng khi thêm 1 giờ),
 *         bảng bên cạnh hiện giờ điện tử và cách đọc.
 *  - b66b 📅 Tháng – năm: 12 nút tháng (bấm → hiện số ngày, tháng 31 ngày là các khớp nắm tay), rồi tờ lịch tháng 12
 *         (bấm ngày, đếm thêm 7 ngày là tuần sau).
 * Đồng hồ vẽ lại của Lớp 2 (grade2Games/art/clock.js): kim dừng trước vòng số.
 */

import { css, emitter, INK } from '../../grade4Tools/frame.js';
import { alarmClockSvg, CLOCK } from '../../grade2Games/art/clock.js';
import { calmMotion } from '../../grade3Games/fly.js';
import { sleep, sfx, ask } from './kit.js';

const two = (n) => String(n).padStart(2, '0');
const reading = (tot) => { const h = Math.floor(tot / 60) % 24, m = tot % 60; return m ? `${h} giờ ${m} phút` : `${h} giờ`; };

export function createClock(host, { H = 8, M = 0 } = {}) {
  injectTimeCss();
  const t = emitter({});
  host.innerHTML = `
    <div class="x3t">
      <div class="x3t-face">${alarmClockSvg()}</div>
      <div class="x3t-side">
        <div class="x3t-dig"><span>&nbsp;</span></div>
        <div class="x3t-read">&nbsp;</div>
        <div class="x3t-btns">
          <button type="button" class="x3t-btn" data-add="60"><b>+1</b> giờ</button>
          <button type="button" class="x3t-btn" data-add="5"><b>+5</b> phút</button>
          <button type="button" class="x3t-btn" data-add="1"><b>+1</b> phút</button>
        </div>
      </div>
    </div>`;
  const root = host.querySelector('.x3t');
  const svg = root.querySelector('svg');
  let tot = H * 60 + M, shown = tot, busy = false, locked = true, pm = false;
  t.root = root;
  Object.defineProperty(t, 'tot', { get: () => tot });
  const draw = (v) => {
    const set = (id, a) => svg.querySelector(`[data-hand="${id}"]`)?.setAttribute('transform', `rotate(${a.toFixed(2)} ${CLOCK.cx} ${CLOCK.cy})`);
    set('h', ((v / 60) % 12) * 30);
    set('m', (v % 60) * 6);
  };
  const label = () => {
    const h = Math.floor(tot / 60) % 12 || 12, m = tot % 60, h24 = pm ? h + 12 : h;
    root.querySelector('.x3t-dig span').textContent = `${two(h24)} : ${two(m)}`;
    root.querySelector('.x3t-read').innerHTML = pm ? `${h} giờ ${m ? `${m} phút ` : ''}tối<br><small>= ${h24} giờ${m ? ` ${m} phút` : ''}</small>` : reading(Math.floor(tot / 60) % 12 === 0 ? 12 * 60 + m : tot);
  };
  /** Kim quay tới tổng số phút v (theo chiều kim đồng hồ). */
  t.go = (v, { ms = null } = {}) => new Promise((res) => {
    const from = shown, d = v - from;
    tot = v;
    const dur = ms ?? Math.min(2200, 350 + Math.abs(d) * 28) * (calmMotion() ? 1.3 : 1);
    const t0 = performance.now();
    busy = true;
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur), e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
      shown = from + d * e;
      draw(shown);
      if (k < 1) setTimeout(() => step(performance.now()), 16); // hẹn giờ thay rAF: tab ẩn vẫn quay xong
      else { shown = v; draw(v); busy = false; label(); sfx.tick?.(); t.emit('change'); res(); }
    };
    step(t0);
  });
  t.set = (v) => { tot = shown = v; draw(v); label(); };
  t.evening = (on) => { pm = on; root.classList.toggle('x3t-pm', on); label(); };
  t.lock = (on) => { locked = on; root.classList.toggle('x3t-locked', on); };
  t.only = (adds) => root.querySelectorAll('.x3t-btn').forEach(b => b.classList.toggle('x3t-off', !!adds && !adds.includes(+b.dataset.add)));
  t.btn = (add) => root.querySelector(`.x3t-btn[data-add="${add}"]`);
  root.addEventListener('click', (e) => {
    const b = e.target.closest('.x3t-btn');
    if (!b || locked || busy || b.classList.contains('x3t-off')) return;
    sfx.tap();
    t.go(tot + +b.dataset.add);
  });
  t.set(tot);
  t.lock(true);
  return t;
}

async function press(c, t, add, target, { say, shown, nudge }) {
  t.lock(false); t.only([add]);
  await c.say(say, shown);
  await c.until(t, () => t.tot === target, { nudge, el: () => t.btn(add) });
  t.lock(true); t.only(null);
  sfx.ding();
}

const B66 = {
  title: 'Bài 66: Xem đồng hồ',
  setup: (board) => createClock(board, { H: 8, M: 0 }),
  steps: [
    async (c) => {
      const t = c.t;
      await c.say('Kim ngắn chỉ giờ, kim dài chỉ phút. Đồng hồ đang chỉ 8 giờ.', 'Kim <b>ngắn</b> chỉ giờ · kim <b>dài</b> chỉ phút');
      await press(c, t, 60, 9 * 60, { say: 'Bấm thêm 1 giờ. Xem kim dài đi thế nào!', shown: 'Bấm <b>+1 giờ</b>', nudge: 'Bấm nút +1 giờ.' });
      await c.say('Kim dài đi đúng một vòng thì kim ngắn chỉ sang số tiếp theo. Một giờ bằng 60 phút.', 'Kim dài đi 1 vòng = <b>60 phút = 1 giờ</b>');
    },
    async (c) => {
      const t = c.t;
      await press(c, t, 5, 9 * 60 + 20, {
        say: 'Kim dài đi từ số này sang số kế tiếp là 5 phút. Bấm cộng 5 phút cho tới khi đồng hồ chỉ 9 giờ 20 phút.',
        shown: 'Bấm <b>+5 phút</b> tới <b>9 giờ 20 phút</b>', nudge: 'Bấm nút +5 phút. Mỗi lần kim dài sang một số.',
      });
      await c.say('Kim dài chỉ số 4: đếm 5, 10, 15, 20. Đồng hồ chỉ 9 giờ 20 phút.', 'Kim dài chỉ số 4: 5, 10, 15, <b>20 phút</b>');
    },
    async (c) => {
      const t = c.t;
      await press(c, t, 1, 9 * 60 + 23, {
        say: 'Giữa hai số có 5 vạch nhỏ, mỗi vạch là 1 phút. Bấm cộng 1 phút tới 9 giờ 23 phút.',
        shown: 'Bấm <b>+1 phút</b> tới <b>9 giờ 23 phút</b>', nudge: 'Bấm nút +1 phút.',
      });
      await c.say('Kim dài qua số 4 thêm 3 vạch: 20 phút thêm 3 phút là 23 phút.', '20 + 3 = <b>23 phút</b>');
    },
    async (c) => {
      const t = c.t;
      t.root.classList.add('x3t-hide');
      await t.go(4 * 60 + 38);
      await ask(c, {
        say: 'Đồng hồ chỉ mấy giờ?', shown: 'Đồng hồ chỉ mấy giờ?',
        options: [{ html: '4 giờ 38 phút', value: 1 }, { html: '5 giờ 38 phút', value: 2 }, { html: '4 giờ 43 phút', value: 3 }], answer: 1,
        hint: (v) => (v === 2 ? 'Kim ngắn chưa tới số 5, nên vẫn là 4 giờ.' : 'Kim dài qua số 7 thêm 3 vạch: 35 thêm 3.'),
        ok: 'Kim ngắn ở giữa số 4 và số 5, kim dài qua số 7 thêm 3 vạch. 4 giờ 38 phút.',
      });
      t.root.classList.remove('x3t-hide');
    },
    async (c) => {
      const t = c.t;
      t.root.classList.add('x3t-hide');
      await t.go(8 * 60 + 50);
      await c.say('Kim dài chỉ số 10: 8 giờ 50 phút. Còn 10 phút nữa là 9 giờ, nên còn đọc là 9 giờ kém 10 phút.', '8 giờ 50 phút = <b>9 giờ kém 10 phút</b>');
      await ask(c, {
        say: 'Nếu kim dài chỉ số 9 thì đọc là gì?', shown: 'Kim dài chỉ số 9: 8 giờ 45 phút, hay…',
        options: [{ html: '9 giờ kém 15', value: 1 }, { html: '8 giờ kém 15', value: 2 }, { html: '9 giờ 15', value: 3 }], answer: 1,
        hint: 'Từ số 9 tới số 12 còn 15 phút nữa là 9 giờ.',
        ok: '8 giờ 45 phút, còn 15 phút nữa là 9 giờ: 9 giờ kém 15 phút.',
      });
      t.root.classList.remove('x3t-hide');
    },
    async (c) => {
      const t = c.t;
      await t.go(20 * 60 + 15, { ms: 1800 });
      t.evening(true);
      await c.say('Buổi tối, đồng hồ chỉ 8 giờ 15 phút. Tính cả ngày thì giờ buổi chiều và buổi tối thêm 12.', 'Buổi tối: 8 + 12 = <b>20</b>');
      await ask(c, {
        say: '8 giờ 15 phút tối còn gọi là mấy giờ?', shown: '8 giờ 15 phút tối = ?',
        options: [{ html: '18 giờ 15 phút', value: 18 }, { html: '20 giờ 15 phút', value: 20 }, { html: '10 giờ 15 phút', value: 10 }], answer: 20,
        hint: 'Lấy 8 cộng 12.', ok: '8 cộng 12 bằng 20. 20 giờ 15 phút.',
      });
    },
  ],
};

// ── 📅 Tháng – năm ──────────────────────────────────────────────────────────────────────────────────
const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const WD = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'];
const WDS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export function createYear(host) {
  injectTimeCss();
  const t = emitter({});
  host.innerHTML = `<div class="x3y">${DAYS.map((d, i) => `<button type="button" class="x3y-m${d === 31 ? ' x3y-31' : ''}" data-m="${i + 1}">
    <span class="x3y-name">Tháng ${i + 1}</span><span class="x3y-days">${i === 1 ? '28 hoặc 29' : d} ngày</span></button>`).join('')}</div>`;
  const root = host.querySelector('.x3y');
  let open = 0, locked = true;
  t.root = root;
  t.count = () => open;
  t.m = (m) => root.querySelector(`[data-m="${m}"]`);
  t.reveal = (m) => { const b = t.m(m); if (b.classList.contains('x3y-on')) return; b.classList.add('x3y-on'); open++; sfx.pop(m % 10); t.emit('change'); };
  t.lock = (on) => { locked = on; };
  root.addEventListener('click', (e) => { const b = e.target.closest('.x3y-m'); if (b && !locked) t.reveal(+b.dataset.m); });
  return t;
}

/** Tờ lịch tháng (ngày 1 vào thứ first, 0 = Thứ Hai); bấm ngày → sự kiện 'day'. */
export function createMonth(host, { month = 12, first = 0 } = {}) {
  injectTimeCss();
  const t = emitter({});
  const n = DAYS[month - 1];
  const cells = [];
  for (let i = 0; i < first; i++) cells.push('<div class="x3c-d x3c-empty"></div>');
  for (let d = 1; d <= n; d++) cells.push(`<button type="button" class="x3c-d${(first + d - 1) % 7 === 6 ? ' x3c-sun' : ''}" data-d="${d}">${d}</button>`);
  while (cells.length % 7) cells.push('<div class="x3c-d x3c-empty"></div>');
  host.innerHTML = `<div class="x3c"><div class="x3c-top">Tháng ${month}</div>
    <div class="x3c-grid" style="--rows:${cells.length / 7}">${WDS.map((w, i) => `<div class="x3c-h${i === 6 ? ' x3c-sun' : ''}">${w}</div>`).join('')}${cells.join('')}</div></div>`;
  const root = host.querySelector('.x3c');
  t.root = root;
  t.day = (d) => root.querySelector(`[data-d="${d}"]`);
  t.mark = (d, cls = 'x3c-ring') => t.day(d)?.classList.add(cls);
  t.weekday = (d) => WD[(first + d - 1) % 7];
  root.addEventListener('click', (e) => { const b = e.target.closest('[data-d]'); if (b) { sfx.tap(); t.emit('day', +b.dataset.d); } });
  return t;
}

const B66B = {
  title: 'Bài 66: Tháng – năm',
  setup: (board) => createYear(board),
  steps: [
    async (c) => {
      const t = c.t;
      t.lock(false);
      await c.say('Một năm có 12 tháng. Em bấm vào từng tháng để xem tháng đó có bao nhiêu ngày.', 'Một năm có <b>12 tháng</b>. Bấm từng tháng!');
      await c.until(t, () => t.count() === 12, { nudge: 'Bấm vào tháng chưa mở.', el: () => [...t.root.querySelectorAll('.x3y-m:not(.x3y-on)')][0] });
      t.lock(true);
      await c.say('Các tháng màu cam có 31 ngày. Tháng 4, 6, 9, 11 có 30 ngày. Tháng 2 có 28 hoặc 29 ngày.', 'Cam: <b>31 ngày</b> · 4, 6, 9, 11: 30 ngày · tháng 2: 28 hoặc 29');
    },
    async (c) => {
      t66Fist(c.t);
      await c.say('Mẹo nhớ: nắm tay lại, đếm tháng lần lượt trên khớp và chỗ lõm. Tháng ở khớp nhô lên có 31 ngày.', 'Đếm trên <b>nắm tay</b>: khớp nhô = 31 ngày');
      await ask(c, {
        say: 'Tháng nào dưới đây có 30 ngày?', shown: 'Tháng nào có <b>30 ngày</b>?',
        options: [{ html: 'Tháng 5', value: 5 }, { html: 'Tháng 6', value: 6 }, { html: 'Tháng 8', value: 8 }], answer: 6,
        hint: 'Nhìn các tháng màu xanh.', ok: 'Tháng 6 có 30 ngày.',
      });
    },
    async (c) => {
      const t = c.use((b) => createMonth(b, { month: 12, first: 0 }));
      t.mark(8);
      await c.say('Đây là tờ lịch tháng 12. Ngày 8 tháng 12 là thứ Hai. Một tuần có 7 ngày. Thứ Hai tuần sau là ngày nào? Bấm vào ngày đó.',
        'Ngày 8 là <b>Thứ Hai</b>. Bấm vào <b>Thứ Hai tuần sau</b>.');
      let ok = false;
      const off = t.on((ev, d) => { if (ev !== 'day') return; if (d === 15) ok = true; else c.hint('Đếm thêm 7 ngày, hoặc nhìn ngay dưới ngày 8.'); });
      await c.until(t, () => ok, { nudge: 'Ngày ở ngay dưới ngày 8.', el: () => t.day(15) });
      off();
      t.mark(15, 'x3c-ok');
      sfx.ding();
      await c.say('8 cộng 7 bằng 15. Thứ Hai tuần sau là ngày 15.', '8 + 7 = <b>15</b>');
    },
    async (c) => {
      const t = c.t;
      t.mark(31);
      await c.say('Ngày 31 tháng 12 là ngày cuối cùng của năm.', 'Ngày <b>31 tháng 12</b>: ngày cuối năm');
      await ask(c, {
        say: 'Ngày 31 tháng 12 là thứ Tư. Vậy ngày 1 tháng 1 năm sau là thứ mấy?', shown: '31/12 là Thứ Tư → 1/1 năm sau là?',
        options: [{ html: 'Thứ Ba', value: 2 }, { html: 'Thứ Năm', value: 4 }, { html: 'Thứ Sáu', value: 5 }], answer: 4,
        hint: 'Ngày hôm sau của thứ Tư.', ok: 'Ngày 1 tháng 1 là ngày hôm sau, nên là thứ Năm.',
      });
    },
  ],
};
/** Đánh dấu các tháng 31 ngày như khớp nắm tay (đã có màu cam), làm sáng lần lượt. */
function t66Fist(t) {
  [1, 3, 5, 7, 8, 10, 12].forEach((m, i) => setTimeout(() => t.m(m)?.classList.add('x3y-knuckle'), i * 120));
}

export const TIME = { b66: B66, b66b: B66B };

let styled = false;
function injectTimeCss() {
  if (styled) return;
  styled = true;
  css('x3t-css', `
    .x3t { flex: 1; min-height: 0; display: flex; gap: 2cqi; padding: 2cqh 2cqi 17cqh; box-sizing: border-box; font-family: 'Baloo 2', sans-serif; }
    .x3t-face { flex: 1 1 0; min-width: 0; min-height: 0; display: grid; place-items: center; }
    .x3t-face svg { width: 100%; height: 100%; }
    .x3t .g2c-ghost { display: none; }
    .x3t-side { flex: 0 0 38%; display: flex; flex-direction: column; gap: 2cqh; justify-content: center; min-height: 0; }
    .x3t-dig { background: #0F766E; border: 3px solid ${INK}; border-radius: 0.6em; padding: 0.15em 0.3em; text-align: center; }
    .x3t-dig span { display: block; background: #CCFBF1; color: #134E4A; border-radius: 0.3em; font-weight: 800; font-size: min(9cqh, 6cqi); line-height: 1.2; letter-spacing: 0.04em; }
    .x3t-read { text-align: center; font-weight: 800; color: #1E3A8A; font-size: min(6.5cqh, 4cqi); line-height: 1.2; min-height: 2.4em; display: grid; place-items: center; }
    .x3t-read small { font-size: 0.8em; color: #7C3AED; }
    .x3t-hide .x3t-dig span, .x3t-hide .x3t-read { color: transparent; }
    .x3t-btns { display: flex; flex-direction: column; gap: 1.6cqh; }
    .x3t-btn { font-family: inherit; font-weight: 800; color: #1E3A8A; background: #fff; border: 2px solid #93C5FD; border-radius: 0.8em; box-shadow: 0 5px 0 #60A5FA; font-size: min(6cqh, 3.6cqi); padding: 0.2em 0.4em; cursor: pointer; touch-action: manipulation; }
    .x3t-btn b { color: #DC2626; font-size: 1.15em; }
    .x3t-btn:active { transform: translateY(4px); box-shadow: 0 1px 0 #60A5FA; }
    .x3t-off { opacity: 0.3; pointer-events: none; }
    .x3t-locked .x3t-btn { cursor: default; }
    .x3t-pm .x3t-face svg { filter: drop-shadow(0 0 0 #000); }
    .x3t-pm { background: linear-gradient(180deg, #1E3A8A22, transparent 60%); border-radius: 1rem; }
    @media (orientation: portrait) { .x3t { padding-bottom: 21cqh; } }
    @container (max-aspect-ratio: 1/1) {
      .x3t { flex-direction: column; }
      .x3t-side { flex: none; }
      .x3t-dig span { font-size: min(6cqh, 9cqi); }
      .x3t-read { font-size: min(4.6cqh, 6cqi); min-height: 2.4em; }
      .x3t-btns { flex-direction: row; }
      .x3t-btn { flex: 1 1 0; font-size: min(4.4cqh, 5.6cqi); }
    }

    .x3y { flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); grid-template-rows: repeat(3, minmax(0, 1fr)); gap: 1.8cqh 1.6cqi; padding: 2cqh 2cqi 17cqh; box-sizing: border-box; font-family: 'Baloo 2', sans-serif; }
    .x3y-m { min-width: 0; min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.2em; background: #fff; border: 2px solid #BFDBFE; border-radius: 0.9rem; box-shadow: 0 5px 0 #93C5FD; cursor: pointer; font-family: inherit; touch-action: manipulation; container-type: size; }
    .x3y-name { font-weight: 800; color: #1E3A8A; font-size: min(26cqh, 18cqi); line-height: 1.1; }
    .x3y-days { font-weight: 800; font-size: min(20cqh, 13cqi); line-height: 1.1; color: transparent; border-bottom: 2px dashed #CBD5E1; }
    .x3y-on .x3y-days { color: #1D4ED8; border-color: transparent; }
    .x3y-on { background: #EFF6FF; animation: x3yPop .35s ease; }
    .x3y-on.x3y-31 { background: #FFEDD5; border-color: #FDBA74; box-shadow: 0 5px 0 #FB923C; }
    .x3y-on.x3y-31 .x3y-days { color: #C2410C; }
    .x3y-knuckle { outline: 4px solid #F97316; outline-offset: 2px; }
    @keyframes x3yPop { 50% { transform: scale(1.06); } }
    @container (max-aspect-ratio: 1/1) { .x3y { grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: repeat(4, minmax(0, 1fr)); padding-bottom: 14cqh; } }

    .x3c { flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 1.5cqh 2cqi 17cqh; box-sizing: border-box; font-family: 'Baloo 2', sans-serif; }
    .x3c-top { flex: none; text-align: center; font-weight: 800; color: #fff; background: #E5484D; border: 2px solid ${INK}; border-radius: 0.6em 0.6em 0 0; font-size: min(6cqh, 4cqi); line-height: 1.3; }
    .x3c-grid { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); grid-template-rows: auto repeat(var(--rows), minmax(0, 1fr)); border: 2px solid ${INK}; border-top: 0; background: #fff; container-type: size; }
    .x3c-h { text-align: center; font-weight: 800; color: #1E3A8A; background: #DBEAFE; font-size: min(5cqh, 4cqi); padding: 0.1em 0; }
    .x3c-d { border: 1px solid #E2E8F0; background: #fff; font-family: inherit; font-weight: 800; color: #1E293B; font-size: min(9cqh, 5.4cqi); display: grid; place-items: center; cursor: pointer; padding: 0; }
    .x3c-empty { cursor: default; background: #F8FAFC; }
    .x3c-sun { color: #DC2626; }
    .x3c-ring { box-shadow: inset 0 0 0 4px #F59E0B; background: #FEF3C7; }
    .x3c-ok { box-shadow: inset 0 0 0 4px #22C55E; background: #DCFCE7; animation: x3yPop .35s ease; }
    @container (max-aspect-ratio: 1/1) { .x3c { padding-bottom: 14cqh; } }
    @media (prefers-reduced-motion: reduce) { .x3y-on, .x3c-ok { animation: none; } }
  `);
}
