/**
 * ⏰ Đồng hồ hẹn giờ & Tờ lịch — thiết kế: docs/lop_2/thiet-ke-tro-choi.md §4.5. Bám Vở BT Toán 2 Tập Một, Bài 29–31:
 *   clock-1 (Bài 29): giờ đúng. Xen kẽ đặt giờ (kéo kim ngắn, kim dài đứng yên ở số 12) và đọc giờ (gõ số giờ).
 *   clock-2 (Bài 29, 31): giờ và 15 phút, 30 phút. Kéo kim dài thì kim ngắn trượt theo như đồng hồ thật (nấc 5 phút);
 *            kéo kim ngắn thì đổi giờ, giữ phút. Xen kẽ đọc giờ bằng thẻ (thẻ bẫy: giờ kế tiếp, phút khác).
 *   clock-3 (Bài 29, 31): giờ buổi chiều, buổi tối. Đồng hồ điện tử chỉ 16 : 30 → đặt kim 4 giờ 30 phút rồi chọn buổi
 *            (cửa sổ đổi trời). Xen kẽ: đồng hồ kim + trời chiều → gõ số giờ của đồng hồ điện tử (16).
 *   clock-4 (Bài 30, 31): tờ lịch tháng. Ngày ... là thứ mấy? Thứ ... tuần này / tuần sau là ngày nào? Ngày mai, hôm qua.
 *   clock-5 (Bài 30, 31): khoanh các ngày học vẽ (thứ ... hằng tuần) rồi đếm số buổi; tháng có mấy ngày; ngày mai sang
 *            tháng mới (lật tờ lịch); còn mấy ngày nữa đến sinh nhật.
 * Tờ lịch là lịch thật của năm hiện tại. Dùng khung quầy Chợ phiên lớp 3 (market/stall.js), theme 'clock'.
 * App không báo trước lúc đúng: bé tự bấm "✓ Đặt giờ xong" / "✓ Chọn xong".
 */

import {
  alarmClockSvg, skyWindowSvg, digitalHtml, digitalText, clockIcon, calendarIcon, pinHtml, CLOCK,
} from './art/clock.js';
import { stallMeta, levelMeta } from './catalog.js';
import { injectClockStyles } from './styles.js';
import { NPCS, cap } from '../grade3Games/npc.js';
import { mountStall, Q } from '../grade3Games/market/stall.js';
import { flyOne } from '../grade3Games/fly.js';
import { sfx } from '../preschool/fx.js';

const WANT = (t) => `<b class="g3f-want">${t}</b>`;
// Cả nhà nhờ bé làm "thư ký": đặt đồng hồ, xem lịch (thứ tự = người giao nhiệm vụ ở màn giới thiệu cấp 1…5).
const FAMILY = ['ba', 'ong', 'co', 'chu', 'chi', 'anh'].map(id => NPCS.find(n => n.id === id));

export const CLOCK_LEVELS = [
  {
    ...levelMeta('clock-1'), missions: 5, kind: 'hour',
    knowledge: 'xem giờ đúng, kim ngắn chỉ giờ, kim dài chỉ số 12',
    ask: (n) => `${cap(n.you)} đặt đồng hồ, xem giờ giúp ${n.me}!`,
    desc: '6 giờ: kim ngắn chỉ số 6, kim dài chỉ số 12. Kéo kim ngắn để đặt giờ.',
    how: [['clock', 'Kéo kim ngắn'], ['✓', 'Đặt giờ xong'], ['🔔', 'Chuông reo']],
  },
  {
    ...levelMeta('clock-2'), missions: 5, kind: 'minute',
    knowledge: 'xem giờ, 15 phút, 30 phút',
    ask: (n) => `${cap(n.you)} đặt giờ hẹn giúp ${n.me}, có cả phút!`,
    desc: '7 giờ 30 phút: kim dài chỉ số 6, kim ngắn nằm giữa số 7 và số 8.',
    how: [['clock', 'Kéo kim dài'], ['✓', 'Đặt giờ xong'], ['🔔', 'Chuông reo']],
  },
  {
    ...levelMeta('clock-3'), missions: 5, kind: 'day24',
    knowledge: 'giờ buổi chiều, buổi tối: 16 giờ là 4 giờ chiều',
    ask: (n) => `Đồng hồ điện tử chỉ 16 : 30. ${cap(n.you)} đặt đồng hồ kim giúp ${n.me}!`,
    desc: '16 giờ là 4 giờ chiều, 21 giờ là 9 giờ tối. Đặt đồng hồ kim rồi chọn buổi.',
    how: [['digital', 'Xem giờ'], ['clock', 'Đặt kim'], ['🌇', 'Chọn buổi']],
  },
  {
    ...levelMeta('clock-4'), missions: 5, kind: 'week',
    knowledge: 'xem lịch: ngày, thứ, tuần',
    ask: (n) => `${cap(n.you)} xem lịch giúp ${n.me}!`,
    desc: 'Hôm nay thứ Tư ngày 12. Thứ Bảy tuần này là ngày 15. Chạm vào ngày trên tờ lịch.',
    how: [['cal', 'Xem tờ lịch'], ['👆', 'Chạm vào ngày'], ['✓', 'Chọn xong']],
  },
  {
    ...levelMeta('clock-5'), missions: 5, kind: 'month',
    knowledge: 'tháng có 30, 31 ngày, xem lịch',
    ask: (n) => `${cap(n.you)} ghi lịch hẹn cho cả nhà giúp ${n.me}!`,
    desc: 'Tháng 1 có 31 ngày. Hôm nay ngày 31 tháng 1 thì ngày mai là ngày 1 tháng 2.',
    how: [['cal', 'Xem tờ lịch'], ['⭕', 'Khoanh ngày'], ['📅', 'Lật tờ lịch']],
  },
];

// ── Giờ và hoạt động trong ngày (như tranh của Vở BT) ────────────────────────────────────────────
const PERIOD = {
  sang: { label: 'Sáng', icon: '🌅', word: 'sáng' },
  trua: { label: 'Trưa', icon: '☀️', word: 'trưa' },
  chieu: { label: 'Chiều', icon: '🌇', word: 'chiều' },
  toi: { label: 'Tối', icon: '🌙', word: 'tối' },
};
const periodOf = (H) => (H >= 4 && H <= 10 ? 'sang' : H <= 12 && H >= 11 ? 'trua' : H >= 13 && H <= 18 ? 'chieu' : 'toi');
// H: giờ trong ngày (0–23), M: phút.
const ACTS = [
  { H: 6, M: 0, what: 'thức dậy' }, { H: 6, M: 30, what: 'tập thể dục' }, { H: 6, M: 15, what: 'ăn sáng' },
  { H: 7, M: 0, what: 'đưa bé đi học' }, { H: 8, M: 0, what: 'đi chợ' }, { H: 9, M: 0, what: 'tưới cây' },
  { H: 10, M: 30, what: 'làm bánh' }, { H: 7, M: 15, what: 'đi làm' }, { H: 5, M: 30, what: 'tập thể dục' },
  { H: 11, M: 0, what: 'ăn cơm trưa' }, { H: 12, M: 15, what: 'rửa bát' },
  { H: 16, M: 0, what: 'đón bé tan học' }, { H: 17, M: 0, what: 'tưới rau' }, { H: 16, M: 30, what: 'tưới cây' },
  { H: 15, M: 30, what: 'đi bơi' }, { H: 17, M: 30, what: 'chơi bóng chuyền' }, { H: 18, M: 15, what: 'nấu cơm' },
  { H: 16, M: 15, what: 'đi bộ' }, { H: 14, M: 0, what: 'đi khám răng' }, { H: 15, M: 0, what: 'đi siêu thị' },
  { H: 19, M: 0, what: 'ăn tối' }, { H: 20, M: 15, what: 'dự tiệc sinh nhật' }, { H: 21, M: 15, what: 'đọc truyện' },
  { H: 21, M: 0, what: 'đi ngủ' }, { H: 20, M: 0, what: 'xem phim hoạt hình' }, { H: 19, M: 30, what: 'xem thời sự' },
];
const h12 = (H) => ((H + 11) % 12) + 1;
const timeText = (h, m) => (m ? `${h} giờ ${m} phút` : `${h} giờ`);
const dayTime = (a) => `${timeText(h12(a.H), a.M)} ${PERIOD[periodOf(a.H)].word}`;

// ── Tờ lịch: lịch thật của năm nay ───────────────────────────────────────────────────────────────
const WD = ['thứ Hai', 'thứ Ba', 'thứ Tư', 'thứ Năm', 'thứ Sáu', 'thứ Bảy', 'Chủ nhật'];
const WD_HEAD = ['THỨ<br>HAI', 'THỨ<br>BA', 'THỨ<br>TƯ', 'THỨ<br>NĂM', 'THỨ<br>SÁU', 'THỨ<br>BẢY', 'CHỦ<br>NHẬT'];
const YEAR = new Date().getFullYear();
const daysIn = (m) => new Date(YEAR, m, 0).getDate();
const firstCol = (m) => (new Date(YEAR, m - 1, 1).getDay() + 6) % 7; // thứ Hai = 0
const colOf = (m, d) => (firstCol(m) + d - 1) % 7;
const EVENTS = [
  { what: 'học vẽ', unit: 'buổi' }, { what: 'học đàn', unit: 'buổi' }, { what: 'học bơi', unit: 'buổi' },
  { what: 'đá bóng', unit: 'trận' }, { what: 'học võ', unit: 'buổi' },
];
const WHO_BDAY = ['bạn Na', 'bạn Tí', 'em Bin', 'mẹ', 'bố', 'ông'];

// ── Sinh nhiệm vụ ───────────────────────────────────────────────────────────────────────────────
const lastOf = (h) => h[h.length - 1];
const tries = (make, ok) => { let v; for (let t = 0; t < 60; t++) { v = make(); if (ok(v)) break; } return v; };
const used = (h, a) => h.some(x => x.act === a);
const startT = (rng, target, minute) => tries(() => rng.int(0, 11) * 60 + (minute ? rng.pick([0, 45, 20]) : 0), (t) => Math.abs(t - target) >= 120 && Math.abs(t - target) <= 600);

function makeHour(rng, h) {
  const mode = h.length % 2 ? 'readH' : 'setH';
  const act = tries(() => rng.pick(ACTS.filter(a => a.M === 0)), (a) => !used(h, a) && a.H % 12 !== (lastOf(h)?.act.H ?? -1) % 12);
  const target = (act.H % 12) * 60;
  return { mode, act, target, start: startT(rng, target, false) };
}

function makeMinute(rng, h) {
  const mode = h.length % 2 ? 'readM' : 'setM';
  const act = tries(() => rng.pick(ACTS.filter(a => a.M)), (a) => !used(h, a) && a.M !== lastOf(h)?.act.M);
  const target = (act.H % 12) * 60 + act.M;
  // Thẻ đọc giờ: đúng · giờ kế tiếp (kim ngắn đã qua số giờ) · phút đổi 15 ↔ 30.
  const hh = h12(act.H);
  const cards = rng.shuffle([timeText(hh, act.M), timeText((hh % 12) + 1, act.M), timeText(hh, act.M === 30 ? 15 : 30)]);
  return { mode, act, target, cards, start: startT(rng, target, true) };
}

function makeDay24(rng, h) {
  const mode = h.length % 2 ? 'type24' : 'set24';
  const pool = ACTS.filter(a => a.H >= 13 && (mode === 'set24' || a.M === 0));
  const act = tries(() => rng.pick(pool), (a) => !used(h, a) && a.H !== lastOf(h)?.act.H);
  const target = (act.H % 12) * 60 + act.M;
  return { mode, act, target, start: startT(rng, target, true) };
}

const pickMonth = (rng, h, ok = () => true) => tries(() => rng.int(1, 12), (m) => ok(m) && !h.some(x => x.month === m));

function makeWeek(rng, h) {
  const plan = h[0]?.plan || ['weekday', 'thisweek', rng.pick(['tomorrow', 'yesterday']), 'nextweek', 'weekday'];
  const mode = plan[h.length % plan.length];
  const month = pickMonth(rng, h);
  const days = daysIn(month);
  let m;
  if (mode === 'weekday') {
    const prev = h.filter(x => x.mode === 'weekday').map(x => x.ans);
    const d = tries(() => rng.int(8, days), (v) => !prev.includes(colOf(month, v)));
    m = { day: d, ans: colOf(month, d) };
  } else if (mode === 'thisweek') {
    m = tries(() => { const t = rng.int(2, days - 2); const c = rng.int(colOf(month, t) + 1, 6); return { today: t, col: c, ans: t + c - colOf(month, t) }; },
      (v) => colOf(month, v.today) <= 4 && v.col > colOf(month, v.today) && v.ans <= days && v.ans - v.today >= 2);
  } else if (mode === 'nextweek') {
    m = tries(() => { const t = rng.int(1, days - 7); const c = rng.int(0, 6); return { today: t, col: c, ans: t - colOf(month, t) + 7 + c }; },
      (v) => v.ans <= days && v.col !== colOf(month, v.today));
  } else {
    const t = rng.int(3, days - 2);
    m = { today: t, ans: mode === 'tomorrow' ? t + 1 : t - 1 };
  }
  return { mode, plan, month, ...m };
}

function makeMonth(rng, h) {
  const plan = h[0]?.plan || ['mark', 'days', 'rollover', 'countdown', 'mark'];
  const mode = plan[h.length % plan.length];
  if (mode === 'mark') {
    const month = pickMonth(rng, h);
    const col = rng.pick([1, 2, 3, 4, 5, 6].filter(c => !h.some(x => x.col === c)));
    const ev = rng.pick(EVENTS.filter(e => !h.some(x => x.ev === e)));
    const ans = Array.from({ length: daysIn(month) }, (_, i) => i + 1).filter(d => colOf(month, d) === col);
    return { mode, plan, month, col, ev, ans };
  }
  if (mode === 'days') {
    // Xen kẽ tháng 30 ngày và 31 ngày; thỉnh thoảng tháng 2.
    const want = rng.pick([30, 31, 31, 30, 28]);
    const month = pickMonth(rng, h, (m) => (want === 28 ? m === 2 : daysIn(m) === want));
    return { mode, plan, month, ans: daysIn(month) };
  }
  if (mode === 'rollover') {
    const next = rng.int(0, 1) === 1;
    const month = pickMonth(rng, h, (m) => (next ? m <= 11 : m >= 2));
    return next
      ? { mode, plan, month, next, today: daysIn(month), ansMonth: month + 1, ans: 1 }
      : { mode, plan, month, next, today: 1, ansMonth: month - 1, ans: daysIn(month - 1) };
  }
  const month = pickMonth(rng, h);
  const k = rng.int(3, 12);
  const today = rng.int(1, daysIn(month) - k);
  return { mode, plan, month, today, bday: today + k, ans: k, who: rng.pick(WHO_BDAY) };
}

const MAKERS = { hour: makeHour, minute: makeMinute, day24: makeDay24, week: makeWeek, month: makeMonth };

// ── Trò chơi ────────────────────────────────────────────────────────────────────────────────────
export const CLOCK_GAME = {
  ...stallMeta('clock'),
  unitWord: 'lượt',
  npcs: FAMILY,
  starPrefix: 'g2games',
  levels: CLOCK_LEVELS,
  stallIcon: () => clockIcon(60),
  summaryText: (ok, total) => `Em đã giúp cả nhà đúng <strong>${ok}/${total}</strong> lượt.`,

  howTo(level) {
    const pic = (p) => (p === 'clock' ? clockIcon(46, 7, 30) : p === 'cal' ? calendarIcon(46)
      : p === 'digital' ? '<b class="g2c-how-digital">16 : 30</b>' : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '😊', label: 'Cả nhà vui' }];
  },

  makeMission(rng, level, history) {
    const m = MAKERS[level.kind](rng, history);
    const recent = history.slice(-2).map(x => x.npc.id);
    return { ...m, level: level.kind, npc: rng.pick(FAMILY.filter(n => !recent.includes(n.id))), tone: rng.int(0, 99) };
  },

  mountMission(stage, m, level, api) {
    injectClockStyles();
    if (import.meta.env.DEV) window.__g2clock = m;
    return mountClockGame(stage, m, api);
  },
};

// ── Cảnh chung ──────────────────────────────────────────────────────────────────────────────────
const SIGN = {
  setH: 'Đặt giờ', readH: 'Xem giờ', setM: 'Đặt giờ, phút', readM: 'Xem giờ, phút', set24: 'Giờ chiều, tối', type24: 'Đồng hồ điện tử',
  weekday: 'Xem lịch', thisweek: 'Tuần này', nextweek: 'Tuần sau', tomorrow: 'Ngày mai', yesterday: 'Hôm qua',
  mark: 'Lịch hằng tuần', days: 'Tháng mấy ngày?', rollover: 'Sang tháng mới', countdown: 'Còn mấy ngày?',
};
const CAL_MODES = new Set(['weekday', 'thisweek', 'nextweek', 'tomorrow', 'yesterday', 'mark', 'days', 'rollover', 'countdown']);
const PAD_MODES = new Set(['readH', 'type24', 'days', 'countdown']); // gõ số ngay từ đầu (mark: bàn phím hiện ở bước đếm số buổi)

function mountClockGame(stage, m, api) {
  const n = m.npc;
  const cal = CAL_MODES.has(m.mode);
  const s = mountStall(stage, {
    npc: n, api, theme: 'clock', cameo: false,
    sign: `${cal ? calendarIcon(34) : clockIcon(34)}<span><strong>${cal ? 'Tờ lịch' : 'Đồng hồ'}</strong><br>${SIGN[m.mode]}</span>`,
    counter: `
      <div class="g2c-bench">
        <div class="g2c-board" data-board hidden></div>
        <div class="g2c-stage ${cal ? 'g2c-stage-cal' : ''}" data-stage></div>
        <div class="g2c-acts" data-acts></div>
      </div>`,
  });
  const scene = stage.querySelector('.g3f-scene');
  if (!PAD_MODES.has(m.mode)) scene.classList.add('g2c-nopad');
  const { counter, main } = s;
  const q = (sel) => counter.querySelector(sel);
  const bench = q('.g2c-bench'), acts = q('[data-acts]');

  // Thẻ kết quả: cất hàng nút, chừa đáy quầy để bé vẫn thấy đồng hồ, tờ lịch.
  new MutationObserver(() => requestAnimationFrame(() => {
    const card = main.querySelector(':scope > .g3g-result');
    if (!card) return;
    acts.style.visibility = 'hidden';
    bench.style.paddingBottom = `${Math.max(0, card.offsetHeight - acts.offsetHeight + 8)}px`;
  })).observe(main, { childList: true });

  const ok = (text, line) => { s.speak(line || `Cảm ơn ${n.you}!`, 'happy', `${line || `Cảm ơn ${n.you}!`} 🎉`); api.succeed(text); };
  const bad = (line, text, tip) => { s.speak(line, 'sad', line); api.fail(text, tip); };
  const hint = (el) => { if (!el) return; el.classList.remove('g2c-hint'); void el.offsetWidth; el.classList.add('g2c-hint'); };
  const doneBtn = (label) => {
    acts.insertAdjacentHTML('beforeend', `<button type="button" class="g2c-act" data-done>${label}</button>`);
    return acts.querySelector('[data-done]');
  };
  const ctx = { m, n, ...s, ok, bad, hint, doneBtn, board: q('[data-board]'), stageEl: q('[data-stage]'), acts };
  const LEVELS = {
    setH: levelSet, setM: levelSet, set24: levelSet, readH: levelReadH, readM: levelReadM, type24: levelType24,
    weekday: levelWeekday, mark: levelMark, days: levelDays, countdown: levelCountdown,
  };
  (LEVELS[m.mode] || levelPickDay)(ctx);
}

// ════ Đồng hồ kim kéo được ══════════════════════════════════════════════════════════════════════
/**
 * Vẽ đồng hồ báo thức vào `host`. T = số phút tính từ 12 giờ (0–719). grab: 'h' (chỉ kim ngắn, kim dài đứng ở 12),
 * 'both' (kim dài kéo kim ngắn theo như đồng hồ thật, nấc 5 phút; kim ngắn đổi giờ, giữ phút) hoặc false.
 */
function mountClock(host, { T = 0, grab = false }) {
  host.innerHTML = alarmClockSvg();
  const svg = host.querySelector('svg');
  const hands = { h: svg.querySelector('[data-hand="h"]'), m: svg.querySelector('[data-hand="m"]') };
  const { cx, cy } = CLOCK;
  let t = T, dragH = null, locked = !grab;
  const draw = () => {
    const ah = dragH ?? t * 0.5, am = (t % 60) * 6;
    hands.h.setAttribute('transform', `rotate(${ah.toFixed(2)} ${cx} ${cy})`);
    hands.m.setAttribute('transform', `rotate(${am.toFixed(2)} ${cx} ${cy})`);
  };
  draw();
  const angleAt = (e) => {
    const p = svg.createSVGPoint();
    p.x = e.clientX; p.y = e.clientY;
    const v = p.matrixTransform(svg.getScreenCTM().inverse());
    return ((Math.atan2(v.x - cx, cy - v.y) * 180) / Math.PI + 360) % 360;
  };
  const diff = (a, b) => { const d = Math.abs(a - b) % 360; return Math.min(d, 360 - d); };
  let which = null, lastTick = null;
  const tick = () => { const k = Math.round(t / 5); if (k !== lastTick) { lastTick = k; sfx.tap(); } };
  if (grab) {
    svg.classList.add('g2c-grabbable');
    for (const ev of ['contextmenu', 'selectstart', 'dragstart']) svg.addEventListener(ev, (e) => e.preventDefault());
    svg.addEventListener('pointerdown', (e) => {
      if (locked) return;
      const a = angleAt(e);
      const onHand = e.target.closest('[data-grab]')?.dataset.grab;
      which = grab === 'h' ? 'h' : onHand || (diff(a, (t % 60) * 6) <= diff(a, t * 0.5) ? 'm' : 'h');
      svg.setPointerCapture(e.pointerId);
      host.classList.add('g2c-dragging');
      hands[which].classList.add('g2c-hand-on');
      hands.h.classList.remove('g2c-hand-hint'); hands.m.classList.remove('g2c-hand-hint');
      move(e);
      e.preventDefault();
    });
    const move = (e) => {
      if (!which) return;
      const a = angleAt(e);
      if (which === 'm') {
        let d = a / 6 - (t % 60);
        if (d > 30) d -= 60; else if (d < -30) d += 60;
        t = (t + d + 720) % 720;
      } else dragH = a;
      draw();
      tick();
    };
    svg.addEventListener('pointermove', move);
    const up = () => {
      if (!which) return;
      if (which === 'h') {
        const mm = t % 60;
        const hh = ((Math.round(dragH / 30 - mm / 60) % 12) + 12) % 12;
        t = hh * 60 + mm;
        dragH = null;
      } else if (grab === 'both') t = (Math.round(t / 5) * 5) % 720;
      hands[which].classList.remove('g2c-hand-on');
      which = null;
      host.classList.remove('g2c-dragging');
      draw();
      api.onChange?.(t);
    };
    svg.addEventListener('pointerup', up);
    svg.addEventListener('pointercancel', up);
  }
  const api = {
    svg,
    get T() { return t; },
    lock() { locked = true; svg.classList.remove('g2c-grabbable'); },
    /** Kim mờ màu xanh chỉ giờ đúng. */
    ghost(T2) {
      const g = svg.querySelector('[data-ghost]');
      g.querySelector('[data-ghost-hand="h"]').setAttribute('transform', `rotate(${T2 * 0.5} ${cx} ${cy})`);
      g.querySelector('[data-ghost-hand="m"]').setAttribute('transform', `rotate(${(T2 % 60) * 6} ${cx} ${cy})`);
      g.classList.add('g2c-ghost-on');
    },
    /** Chuông reo: đồng hồ rung, búa gõ, tiếng reng reng. */
    ring() {
      svg.classList.add('g2c-ringing');
      for (let i = 0; i < 8; i++) setTimeout(() => sfx.pop(i % 2 ? 7 : 9), i * 110);
      setTimeout(() => svg.classList.remove('g2c-ringing'), 1500);
    },
  };
  return api;
}

/** Cảnh đồng hồ: đồng hồ to + cột bên (cửa sổ trời, đồng hồ điện tử). */
function clockScene(stageEl, { period = '', digital = null, T, grab }) {
  stageEl.innerHTML = `
    <div class="g2c-clock" data-clock></div>
    <div class="g2c-side">
      <div class="g2c-win" data-win>${skyWindowSvg(period)}</div>
      ${digital != null ? `<div class="g2c-dig" data-dig>${digital}</div>` : ''}
    </div>`;
  const clock = mountClock(stageEl.querySelector('[data-clock]'), { T, grab });
  const setSky = (p) => stageEl.querySelector('.g2c-window').setAttribute('data-period', p);
  return { clock, setSky };
}

const handTip = (h, mm) => (mm === 0 ? `${h} giờ: kim ngắn chỉ số ${h}, kim dài chỉ số 12.`
  : mm === 30 ? `${h} giờ 30 phút: kim dài chỉ số 6, kim ngắn nằm giữa số ${h} và số ${(h % 12) + 1}.`
    : `${h} giờ 15 phút: kim dài chỉ số 3, kim ngắn vừa qua số ${h} một chút.`);

// ════ Đặt giờ (cấp 1, 2, 3) ══════════════════════════════════════════════════════════════════════
function levelSet({ m, n, speak, ok, bad, hint, doneBtn, board, stageEl, acts }) {
  const { act, target } = m;
  const is24 = m.mode === 'set24';
  const p = periodOf(act.H);
  const h = h12(act.H);
  const { clock, setSky } = clockScene(stageEl, {
    period: is24 ? '' : p, digital: is24 ? digitalHtml(digitalText(act.H, act.M)) : null,
    T: m.start, grab: m.mode === 'setH' ? 'h' : 'both',
  });
  const go = doneBtn('✓ Đặt giờ xong');
  const tt = timeText(h, act.M);
  go.onclick = () => {
    clock.lock();
    go.disabled = true;
    if (clock.T !== target) {
      clock.ghost(target);
      const text = is24 ? `${act.H} giờ${act.M ? ` ${act.M} phút` : ''} là <b>${tt} ${PERIOD[p].word}</b>. ${handTip(h, act.M)}` : `${handTip(h, act.M)}`;
      return bad(`Chưa đúng ${tt} rồi!`, text, act.M ? 'Kéo kim dài trước cho đúng phút, rồi xem kim ngắn đã tới gần số giờ chưa.' : 'Kim dài đứng ở số 12. Kéo kim ngắn chỉ đúng số giờ.');
    }
    if (!is24) {
      clock.ring();
      return ok(`${cap(n.me)} ${act.what} lúc <b>${tt} ${PERIOD[p].word}</b>. ${handTip(h, act.M)}`, `Reng reng! Đúng ${tt} rồi, cảm ơn ${n.you}!`);
    }
    // Cấp 3, bước 2: chọn buổi; cửa sổ đổi trời theo thẻ bé chọn.
    board.hidden = false;
    board.innerHTML = `<span class="g2c-say">${act.H} giờ${act.M ? ` ${act.M} phút` : ''} là ${tt} buổi ${Q}</span>`;
    acts.innerHTML = `<div class="g2c-cards">${Object.entries(PERIOD).map(([k, v]) => `<button type="button" class="g2c-card" data-p="${k}"><span>${v.icon}</span>${v.label}</button>`).join('')}</div>`;
    speak(`Đúng rồi! ${act.H} giờ là ${h} giờ buổi nào?`, null, `${act.H} giờ là ${WANT(`${h} giờ buổi nào`)}?`);
    acts.querySelector('.g2c-cards').addEventListener('click', (e) => {
      const c = e.target.closest('[data-p]');
      const box = acts.querySelector('.g2c-cards');
      if (!c || box.classList.contains('g2c-locked')) return;
      box.classList.add('g2c-locked');
      setSky(c.dataset.p);
      const fact = `${act.H} giờ${act.M ? ` ${act.M} phút` : ''} là <b>${tt} ${PERIOD[p].word}</b>: ${n.me} ${act.what}.`;
      board.innerHTML = `<span class="g2c-say">${act.H} giờ${act.M ? ` ${act.M} phút` : ''} là <b class="g2c-ans">${tt} ${PERIOD[p].word}</b></span>`;
      if (c.dataset.p === p) {
        c.classList.add('g2c-right');
        clock.ring();
        return ok(fact, `Reng reng! Đúng ${tt} ${PERIOD[p].word} rồi!`);
      }
      c.classList.add('g2c-wrong');
      acts.querySelector(`[data-p="${p}"]`).classList.add('g2c-right');
      setTimeout(() => setSky(p), 900);
      bad(`${act.H} giờ là buổi ${PERIOD[p].word} cơ!`, fact, 'Từ 13 giờ đến 18 giờ là buổi chiều (13 giờ là 1 giờ chiều). Từ 19 giờ đến 22 giờ là buổi tối.');
    });
  };
  const said = is24
    ? [`${cap(n.me)} ${act.what} lúc ${act.H} giờ${act.M ? ` ${act.M} phút` : ''}. ${cap(n.you)} đặt đồng hồ kim giúp ${n.me}!`, `Đồng hồ điện tử: ${WANT(digitalText(act.H, act.M))}. 👉 Đặt kim!`]
    : [`${cap(n.me)} ${act.what} lúc ${dayTime(act)}. ${cap(n.you)} đặt đồng hồ giúp ${n.me}!`, `${cap(n.me)} ${act.what} lúc ${WANT(dayTime(act))}. 👉 Kéo ${m.mode === 'setH' ? 'kim ngắn' : 'kim'}!`];
  speak(said[0], null, said[1]);
  // Kim cần kéo sáng lên vài lần (không dùng transform: kim đang xoay bằng thuộc tính transform).
  stageEl.querySelector(m.mode === 'setH' ? '[data-hand="h"]' : '[data-hand="m"]')?.classList.add('g2c-hand-hint');
}

// ════ Đọc giờ đúng (cấp 1) ══════════════════════════════════════════════════════════════════════
function levelReadH({ m, n, speak, row, ask, ok, bad, stageEl }) {
  const { act, target } = m;
  const p = periodOf(act.H), h = h12(act.H);
  const { clock } = clockScene(stageEl, { period: p, T: target, grab: false });
  ask(row(PERIOD[p].icon, `${cap(act.what)}`, `${Q} giờ ${PERIOD[p].word}`, true), 'giờ', (v, pad) => {
    const fact = `${cap(n.me)} ${act.what} lúc <b>${h} giờ ${PERIOD[p].word}</b>. ${handTip(h, 0)}`;
    if (v === h) { pad.lock('g3g-keypad-ok'); clock.ring(); return ok(fact, `Reng reng! Đúng ${h} giờ rồi!`); }
    pad.lock('g3g-keypad-bad');
    bad(`Đồng hồ chỉ ${h} giờ cơ!`, fact, 'Kim ngắn chỉ giờ, kim dài chỉ số 12.');
  });
  speak(`${cap(n.me)} ${act.what} lúc mấy giờ ${PERIOD[p].word}? ${cap(n.you)} xem đồng hồ rồi gõ số giờ!`, null,
    `${cap(n.me)} ${act.what} lúc ${WANT('mấy giờ')} ${PERIOD[p].word}?`);
}

// ════ Đọc giờ, phút (cấp 2) ═════════════════════════════════════════════════════════════════════
function levelReadM({ m, n, speak, ok, bad, stageEl, acts }) {
  const { act, target, cards } = m;
  const p = periodOf(act.H), h = h12(act.H);
  const right = timeText(h, act.M);
  const { clock } = clockScene(stageEl, { period: p, T: target, grab: false });
  acts.innerHTML = `<div class="g2c-cards">${cards.map(c => `<button type="button" class="g2c-card g2c-card-time" data-t="${c}">${c}</button>`).join('')}</div>`;
  acts.querySelector('.g2c-cards').addEventListener('click', (e) => {
    const c = e.target.closest('[data-t]');
    const box = acts.querySelector('.g2c-cards');
    if (!c || box.classList.contains('g2c-locked')) return;
    box.classList.add('g2c-locked');
    const fact = `${cap(n.me)} ${act.what} lúc <b>${right} ${PERIOD[p].word}</b>. ${handTip(h, act.M)}`;
    if (c.dataset.t === right) { c.classList.add('g2c-right'); clock.ring(); return ok(fact, `Reng reng! Đúng ${right} rồi!`); }
    c.classList.add('g2c-wrong');
    acts.querySelector(`[data-t="${right}"]`).classList.add('g2c-right');
    bad(`Đồng hồ chỉ ${right} cơ!`, fact, 'Xem kim dài trước: chỉ số 3 là 15 phút, chỉ số 6 là 30 phút. Kim ngắn vừa qua số nào thì là mấy giờ.');
  });
  speak(`${cap(n.me)} ${act.what} lúc mấy giờ? ${cap(n.you)} xem đồng hồ rồi chọn thẻ đúng!`, null, `${cap(n.me)} ${act.what} lúc ${WANT('mấy giờ')}?`);
}

// ════ Đồng hồ điện tử (cấp 3) ═══════════════════════════════════════════════════════════════════
function levelType24({ m, n, speak, row, ask, ok, bad, stageEl }) {
  const { act, target } = m;
  const p = periodOf(act.H), h = h12(act.H);
  const { clock } = clockScene(stageEl, { period: p, T: target, grab: false, digital: digitalHtml(`${Q} : 00`, 'g2c-digital-q') });
  const dig = stageEl.querySelector('[data-dig]');
  ask(row(PERIOD[p].icon, `${h} giờ ${PERIOD[p].word}`, '') + row(digitalHtml('?', 'g2c-digital-mini'), 'Đồng hồ điện tử', `${Q} giờ`, true), 'giờ', (v, pad) => {
    dig.innerHTML = digitalHtml(`${String(v).padStart(2, '0')} : 00`, v === act.H ? 'g2c-digital-ok' : 'g2c-digital-bad');
    const fact = `${h} giờ ${PERIOD[p].word} là <b>${act.H} giờ</b>: đồng hồ điện tử chỉ <b>${digitalText(act.H, 0)}</b>.`;
    if (v === act.H) { pad.lock('g3g-keypad-ok'); clock.ring(); return ok(fact, `Reng reng! ${h} giờ ${PERIOD[p].word} là ${act.H} giờ!`); }
    pad.lock('g3g-keypad-bad');
    bad(`${h} giờ ${PERIOD[p].word} là ${act.H} giờ cơ!`, fact, `Buổi chiều, buổi tối: lấy số giờ cộng thêm 12. ${h} + 12 = ${act.H}.`);
  });
  speak(`${cap(n.me)} ${act.what} lúc ${h} giờ ${PERIOD[p].word}. Đồng hồ điện tử chỉ mấy giờ?`, null,
    `${WANT(`${h} giờ ${PERIOD[p].word}`)}. Đồng hồ điện tử chỉ ${WANT('mấy giờ')}?`);
}

// ════ Tờ lịch ═══════════════════════════════════════════════════════════════════════════════════
/** Vẽ tờ lịch tháng `month` vào `host`; nav: có nút lật tờ lịch. Trả về { cell(d), head(c), show(month) }. */
function mountCalendar(host, { month, nav = false, today = null, cake = null }) {
  let shown = month;
  const paint = (mo, flip = '') => {
    const fc = firstCol(mo), dn = daysIn(mo);
    const cells = [...Array(fc).fill(0), ...Array.from({ length: dn }, (_, i) => i + 1)];
    while (cells.length % 7) cells.push(0);
    const isToday = (d) => today && mo === today.month && d === today.day;
    host.innerHTML = `
      <div class="g2c-cal${flip ? ` g2c-flip-${flip}` : ''}" style="--rows:${cells.length / 7}">
        <div class="g2c-cal-rings"><i></i><i></i></div>
        <div class="g2c-cal-top">
          ${nav ? `<button type="button" class="g2c-nav" data-nav="-1" ${mo <= 1 ? 'disabled' : ''} aria-label="Tháng trước">‹</button>` : ''}
          <div class="g2c-cal-title">THÁNG ${mo}<small>${YEAR}</small></div>
          ${nav ? `<button type="button" class="g2c-nav" data-nav="1" ${mo >= 12 ? 'disabled' : ''} aria-label="Tháng sau">›</button>` : ''}
        </div>
        <div class="g2c-cal-grid">
          ${WD_HEAD.map((w, c) => `<button type="button" class="g2c-wd${c === 6 ? ' g2c-sun' : ''}" data-wd="${c}">${w}</button>`).join('')}
          ${cells.map((d, i) => (d ? `<button type="button" class="g2c-day${i % 7 === 6 ? ' g2c-sun' : ''}${isToday(d) ? ' g2c-today' : ''}" data-d="${d}"><span class="g2c-num">${d}</span>${isToday(d) ? '<em class="g2c-tag">Hôm nay</em>' : ''}${cake && mo === cake.month && d === cake.day ? '<i class="g2c-cake">🎂</i>' : ''}</button>` : '<span class="g2c-day g2c-blank"></span>')).join('')}
        </div>
      </div>`;
  };
  paint(month);
  const api = {
    get month() { return shown; },
    cell: (d) => host.querySelector(`[data-d="${d}"]`),
    head: (c) => host.querySelector(`[data-wd="${c}"]`),
    cells: () => [...host.querySelectorAll('[data-d]')],
    flip(dir) {
      const to = shown + dir;
      if (to < 1 || to > 12) return;
      sfx.swish();
      shown = to;
      paint(to, dir > 0 ? 'up' : 'down');
      api.onFlip?.(to);
    },
  };
  if (nav) host.addEventListener('click', (e) => { const b = e.target.closest('[data-nav]'); if (b) api.flip(Number(b.dataset.nav)); });
  return api;
}

/** Hình ghim đi từ ngày `from` tới ngày `to`, từng ngày một; onStep(d, k) khi đáp xuống ngày d (k = bước thứ mấy). */
function hop(calApi, from, to, onStep) {
  return new Promise((res) => {
    const dir = to >= from ? 1 : -1;
    const box = (d) => {
      const r = calApi.cell(d)?.getBoundingClientRect();
      if (!r) return null;
      const s = Math.min(r.width, r.height) * 0.62;
      return { left: r.left + (r.width - s) / 2, top: r.top + (r.height - s) / 2, width: s, height: s };
    };
    let d = from, k = 0;
    const step = () => {
      if (d === to) { res(); return; }
      const nd = d + dir;
      flyOne(pinHtml(), box(d), box(nd), {
        minMs: 240, maxMs: 380,
        onLand: () => { d = nd; k++; sfx.pop(Math.min(9, k)); onStep?.(d, k); step(); },
      });
    };
    step();
  });
}

const dateText = (d, mo) => `ngày ${d} tháng ${mo}`;

// ── Chạm chọn một ngày (tuần này, tuần sau, ngày mai, hôm qua, sang tháng mới) ──
function levelPickDay({ m, n, speak, ok, bad, hint, doneBtn, stageEl }) {
  const roll = m.mode === 'rollover';
  const today = { month: m.month, day: m.today };
  const calApi = mountCalendar(stageEl, { month: m.month, nav: roll, today });
  let pick = null, locked = false; // pick: { month, day }
  const mark = () => calApi.cells().forEach(c => c.classList.toggle('g2c-circle', !!pick && calApi.month === pick.month && Number(c.dataset.d) === pick.day));
  calApi.onFlip = () => mark();
  stageEl.addEventListener('click', (e) => {
    const c = e.target.closest('[data-d]');
    if (!c || locked) return;
    pick = { month: calApi.month, day: Number(c.dataset.d) };
    sfx.tap();
    mark();
  });
  const go = doneBtn('✓ Chọn xong');
  const ansMonth = roll ? m.ansMonth : m.month;
  const wdT = WD[colOf(m.month, m.today)];
  const wdC = cap(WD[m.col] || ''); // chỉ có ở lượt tuần này / tuần sau
  const texts = {
    thisweek: [`Hôm nay là ${wdT}, ngày ${m.today}. ${wdC} tuần này là ngày nào?`, `Hôm nay: ${WANT(`${wdT}, ngày ${m.today}`)}. ${wdC} tuần này là ${WANT('ngày nào')}?`],
    nextweek: [`Hôm nay là ${wdT}, ngày ${m.today}. ${wdC} tuần sau là ngày nào?`, `Hôm nay: ${WANT(`${wdT}, ngày ${m.today}`)}. ${wdC} ${WANT('tuần sau')} là ngày nào?`],
    tomorrow: [`Hôm nay là ngày ${m.today} tháng ${m.month}. Ngày mai là ngày nào?`, `Hôm nay: ${WANT(`ngày ${m.today}`)}. ${WANT('Ngày mai')} là ngày nào?`],
    yesterday: [`Hôm nay là ngày ${m.today} tháng ${m.month}. Hôm qua là ngày nào?`, `Hôm nay: ${WANT(`ngày ${m.today}`)}. ${WANT('Hôm qua')} là ngày nào?`],
    rollover: m.next
      ? [`Hôm nay là ngày ${m.today} tháng ${m.month}. Ngày mai là ngày nào, tháng nào? ${cap(n.you)} lật tờ lịch rồi chạm vào ngày đó!`, `Hôm nay: ${WANT(dateText(m.today, m.month))}. ${WANT('Ngày mai')} là ngày nào?`]
      : [`Hôm nay là ngày 1 tháng ${m.month}. Hôm qua là ngày nào, tháng nào? ${cap(n.you)} lật tờ lịch rồi chạm vào ngày đó!`, `Hôm nay: ${WANT(dateText(1, m.month))}. ${WANT('Hôm qua')} là ngày nào?`],
  }[m.mode];
  go.onclick = async () => {
    if (!pick) { speak('Chạm vào một ngày trên tờ lịch trước đã!', null, '👉 Chạm vào một ngày!'); hint(stageEl.querySelector('.g2c-cal-grid')); return; }
    locked = true;
    go.disabled = true;
    const right = pick.month === ansMonth && pick.day === m.ans;
    const fact = {
      thisweek: `${wdC} tuần này là <b>ngày ${m.ans}</b>: đi tiếp từ ${wdT} ngày ${m.today} trên cùng một hàng.`,
      nextweek: `${wdC} tuần sau là <b>ngày ${m.ans}</b>: xuống hàng dưới (tuần sau), ở cột ${WD[m.col]}.`,
      tomorrow: `Hôm nay ngày ${m.today} thì ngày mai là <b>ngày ${m.ans}</b>.`,
      yesterday: `Hôm nay ngày ${m.today} thì hôm qua là <b>ngày ${m.ans}</b>.`,
      rollover: m.next
        ? `Tháng ${m.month} có ${m.today} ngày. Ngày mai là <b>${dateText(1, m.ansMonth)}</b>.`
        : `Tháng ${m.ansMonth} có ${m.ans} ngày. Hôm qua là <b>${dateText(m.ans, m.ansMonth)}</b>.`,
    }[m.mode];
    if (roll) {
      if (calApi.month !== ansMonth) calApi.flip(ansMonth > calApi.month ? 1 : -1);
      mark();
      calApi.cell(m.ans)?.classList.add(right ? 'g2c-ok' : 'g2c-want');
    } else {
      // Kiểm chứng: ghim đi từng ngày từ hôm nay tới ngày đúng.
      await hop(calApi, m.today, m.ans, (d) => calApi.cell(d)?.classList.add('g2c-step'));
      calApi.cell(m.ans)?.classList.add(right ? 'g2c-ok' : 'g2c-want');
    }
    if (right) return ok(fact);
    const tip = {
      thisweek: 'Mỗi hàng của tờ lịch là một tuần. Đi sang phải trên cùng hàng với hôm nay.',
      nextweek: 'Tuần sau là hàng ngay dưới hàng của hôm nay.',
      tomorrow: 'Ngày mai là ngày ngay sau hôm nay (thêm 1).',
      yesterday: 'Hôm qua là ngày ngay trước hôm nay (bớt 1).',
      rollover: m.next ? `Sau ngày cuối tháng là ngày 1 của tháng sau: lật tờ lịch sang tháng ${m.ansMonth}.` : `Trước ngày 1 là ngày cuối của tháng trước: lật tờ lịch về tháng ${m.ansMonth}.`,
    }[m.mode];
    bad(`Là ${roll ? dateText(m.ans, ansMonth) : `ngày ${m.ans}`} cơ!`, fact, tip);
  };
  speak(texts[0], null, texts[1]);
  if (roll) setTimeout(() => hint(stageEl.querySelector(`[data-nav="${m.next ? 1 : -1}"]`)), 900);
}

// ── Ngày ... là thứ mấy? (chạm tên thứ) ──
function levelWeekday({ m, speak, ok, bad, hint, doneBtn, stageEl }) {
  const calApi = mountCalendar(stageEl, { month: m.month });
  calApi.cell(m.day)?.classList.add('g2c-circle');
  let pick = null, locked = false;
  stageEl.addEventListener('click', (e) => {
    const h = e.target.closest('[data-wd]');
    if (!h || locked) return;
    pick = Number(h.dataset.wd);
    sfx.tap();
    stageEl.querySelectorAll('[data-wd]').forEach(x => x.classList.toggle('g2c-wd-on', x === h));
  });
  const go = doneBtn('✓ Chọn xong');
  go.onclick = async () => {
    if (pick == null) { speak('Chạm vào tên thứ ở hàng trên cùng trước đã!', null, '👉 Chạm vào <b>tên thứ</b>!'); hint(calApi.head(0)?.parentElement); return; }
    locked = true;
    go.disabled = true;
    // Kiểm chứng: sáng dần từ ngày đó lên tới tên thứ trong cùng cột.
    const col = m.ans;
    const days = calApi.cells().map(c => Number(c.dataset.d)).filter(d => colOf(m.month, d) === col && d <= m.day).reverse();
    for (const d of days) { calApi.cell(d)?.classList.add('g2c-step'); sfx.pop(3); await new Promise(r => setTimeout(r, 220)); }
    calApi.head(col)?.classList.add(pick === col ? 'g2c-ok' : 'g2c-want');
    const fact = `${cap(dateText(m.day, m.month))} là <b>${WD[col]}</b>: ngày ${m.day} nằm ở cột ${WD[col]}.`;
    if (pick === col) return ok(fact);
    bad(`Ngày ${m.day} là ${WD[col]} cơ!`, fact, 'Tìm ngày trên tờ lịch rồi nhìn thẳng lên hàng trên cùng: tên thứ ở đầu cột.');
  };
  speak(`${cap(dateText(m.day, m.month))} là thứ mấy? Chạm vào tên thứ trên tờ lịch!`, null, `${WANT(cap(dateText(m.day, m.month)))} là ${WANT('thứ mấy')}?`);
}

// ── Khoanh các ngày hằng tuần, rồi đếm số buổi ──
function levelMark({ m, n, speak, row, ask, ok, bad, hint, doneBtn, stageEl, acts }) {
  const calApi = mountCalendar(stageEl, { month: m.month });
  const picked = new Set();
  let locked = false;
  const scene = stageEl.closest('.g3f-scene');
  scene.classList.add('g2c-nopad');
  stageEl.addEventListener('click', (e) => {
    const c = e.target.closest('[data-d]');
    if (!c || locked) return;
    const d = Number(c.dataset.d);
    if (picked.has(d)) picked.delete(d); else picked.add(d);
    c.classList.toggle('g2c-circle', picked.has(d));
    sfx.tap();
  });
  const { ev, col, ans } = m;
  const go = doneBtn('✓ Khoanh xong');
  go.onclick = () => {
    if (!picked.size) { speak(`Chạm vào các ngày ${ev.what} để khoanh trước đã!`, null, '👉 Chạm vào các ngày!'); hint(stageEl.querySelector('.g2c-cal-grid')); return; }
    locked = true;
    go.disabled = true;
    let right = picked.size === ans.length;
    calApi.cells().forEach(c => {
      const d = Number(c.dataset.d), want = ans.includes(d), got = picked.has(d);
      if (want && got) c.classList.add('g2c-ok');
      else if (want) { c.classList.add('g2c-want'); right = false; } else if (got) { c.classList.add('g2c-no'); right = false; }
    });
    calApi.head(col)?.classList.add('g2c-wd-on');
    const list = ans.join(', ');
    if (!right) {
      return bad(`Chưa đúng các ngày ${ev.what} rồi!`, `${cap(WD[col])} trong tháng ${m.month} là các ngày <b>${list}</b>.`,
        `Tìm cột ${WD[col]} trên tờ lịch: mọi ngày trong cột đó đều là ${WD[col]}.`);
    }
    // Bước 2: đếm số buổi.
    acts.innerHTML = '';
    scene.classList.remove('g2c-nopad');
    speak(`Đúng rồi! Tháng ${m.month} bé đi ${ev.what} mấy ${ev.unit}?`, null, `Tháng ${m.month} bé đi ${ev.what} ${WANT(`mấy ${ev.unit}`)}?`);
    ask(row('⭕', `Đi ${ev.what}`, `${Q} ${ev.unit}`, true), ev.unit, (v, pad) => {
      const fact = `Bé đi ${ev.what} vào ${WD[col]}: các ngày ${list}, tất cả <b>${ans.length} ${ev.unit}</b>.`;
      if (v === ans.length) { pad.lock('g3g-keypad-ok'); return ok(fact); }
      pad.lock('g3g-keypad-bad');
      bad(`Có ${ans.length} ${ev.unit} cơ!`, fact, 'Đếm các ngày đã khoanh trên tờ lịch.');
    });
  };
  speak(`${cap(n.me)} đưa bé đi ${ev.what} vào ${WD[col]} hằng tuần. ${cap(n.you)} khoanh các ngày đi ${ev.what} trong tháng ${m.month}!`, null,
    `Bé đi ${ev.what} vào ${WANT(`${WD[col]} hằng tuần`)}. 👉 Khoanh các ngày đó!`);
}

// ── Tháng có mấy ngày? ──
function levelDays({ m, speak, row, ask, ok, bad, stageEl }) {
  const calApi = mountCalendar(stageEl, { month: m.month });
  ask(row(calendarIcon(24, m.month), `Tháng ${m.month}`, `${Q} ngày`, true), 'ngày', async (v, pad) => {
    pad.lock();
    // Kiểm chứng: các ngày sáng lần lượt tới ngày cuối tháng.
    for (const c of calApi.cells()) { c.classList.add('g2c-step'); await new Promise(r => setTimeout(r, 45)); }
    calApi.cell(m.ans)?.classList.add('g2c-ok');
    sfx.pop(8);
    const fact = `Tháng ${m.month} có <b>${m.ans} ngày</b>: ngày cuối cùng trên tờ lịch là ngày ${m.ans}.`;
    if (v === m.ans) { pad.lock('g3g-keypad-ok'); return ok(fact); }
    pad.lock('g3g-keypad-bad');
    bad(`Tháng ${m.month} có ${m.ans} ngày cơ!`, fact, 'Tháng 4, 6, 9, 11 có 30 ngày. Tháng 2 có 28 hoặc 29 ngày. Các tháng còn lại có 31 ngày.');
  });
  speak(`Tháng ${m.month} có bao nhiêu ngày? Xem tờ lịch rồi gõ số!`, null, `Tháng ${m.month} có ${WANT('bao nhiêu ngày')}?`);
}

// ── Còn mấy ngày nữa đến sinh nhật? ──
function levelCountdown({ m, speak, row, ask, ok, bad, stageEl }) {
  const calApi = mountCalendar(stageEl, { month: m.month, today: { month: m.month, day: m.today }, cake: { month: m.month, day: m.bday } });
  ask(row('📍', 'Hôm nay', `<b>ngày ${m.today}</b>`) + row('🎂', 'Sinh nhật', `<b>ngày ${m.bday}</b>`) + row('⏳', 'Còn', `${Q} ngày`, true), 'ngày', async (v, pad) => {
    pad.lock();
    // Kiểm chứng: ghim đi từng ngày tới sinh nhật, mỗi ngày ghi số đếm.
    await hop(calApi, m.today, m.bday, (d, k) => {
      const c = calApi.cell(d);
      c?.classList.add('g2c-step');
      c?.insertAdjacentHTML('beforeend', `<b class="g2c-count">${k}</b>`);
    });
    calApi.cell(m.bday)?.classList.add('g2c-ok');
    const fact = `Từ ngày ${m.today} đến ngày ${m.bday}: ${m.bday} − ${m.today} = <b>${m.ans}</b>. Còn <b>${m.ans} ngày</b> nữa đến sinh nhật ${m.who}.`;
    if (v === m.ans) { pad.lock('g3g-keypad-ok'); return ok(fact, 'Sắp tới sinh nhật rồi, vui quá!'); }
    pad.lock('g3g-keypad-bad');
    bad(`Còn ${m.ans} ngày cơ!`, fact, 'Đếm từ ngày mai tới ngày sinh nhật, hoặc lấy ngày sinh nhật trừ ngày hôm nay.');
  });
  speak(`Hôm nay là ngày ${m.today}. Sinh nhật ${m.who} là ngày ${m.bday}. Còn mấy ngày nữa đến sinh nhật?`, null,
    `Hôm nay ${WANT(`ngày ${m.today}`)}, sinh nhật ${m.who} ${WANT(`ngày ${m.bday}`)}. Còn ${WANT('mấy ngày')}?`);
}
