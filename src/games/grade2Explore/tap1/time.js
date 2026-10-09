/**
 * Bài 29 (Ngày – giờ, giờ – phút): 🕐 đồng hồ có nút "+15 phút", "+1 giờ" (kim quay thật), dải 24 giờ của một ngày.
 * Bài 30 (Ngày – tháng): 📅 tờ lịch tháng (thứ Hai đầu tuần), chạm ngày để xem thứ.
 */

import { createStage, skyGrass, desk, waitTap, sleep, sfx, INK, anim } from './stage.js';

// ── Đồng hồ ───────────────────────────────────────────────────────────────────────────────────────────
const timeText = (m) => { const h = Math.floor(m / 60) % 24, mm = m % 60; return mm ? `${h} giờ ${mm} phút` : `${h} giờ`; };

function createClock(host, { time = 7 * 60, buttons = true } = {}) {
  const t = createStage(host, { bg: desk(0.14) });
  const T = t.tall;
  const C = T ? { x: 500, y: 590, r: 310 } : { x: 360, y: 430, r: 290 };
  const { x, y, r } = C;
  let g = `<circle cx="${x}" cy="${y}" r="${r + 22}" fill="#F97316" stroke="${INK}" stroke-width="6"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${INK}" stroke-width="4"/>`;
  for (let i = 0; i < 60; i++) {
    const a = (i * 6 * Math.PI) / 180, big = i % 5 === 0, r1 = r - (big ? 26 : 14);
    g += `<path d="M${x + r1 * Math.sin(a)} ${y - r1 * Math.cos(a)} L${x + (r - 4) * Math.sin(a)} ${y - (r - 4) * Math.cos(a)}" stroke="${INK}" stroke-width="${big ? 5 : 2.5}" stroke-linecap="round"/>`;
  }
  for (let h = 1; h <= 12; h++) {
    const a = (h * 30 * Math.PI) / 180, rr = r - 66;
    g += `<text class="x2a-t" x="${x + rr * Math.sin(a)}" y="${y - rr * Math.cos(a)}" font-size="${r * 0.2}">${h}</text>`;
  }
  // kim dừng trước vòng số (không che số)
  g += `<g class="x2c-h"><path d="M${x} ${y + 24} V${y - r * 0.5}" stroke="#1E3A8A" stroke-width="20" stroke-linecap="round"/></g>
    <g class="x2c-m"><path d="M${x} ${y + 30} V${y - r * 0.74}" stroke="#DC2626" stroke-width="11" stroke-linecap="round"/></g>
    <circle cx="${x}" cy="${y}" r="16" fill="${INK}"/>`;
  const B = T ? [[60, 935, 420], [520, 935, 420]] : [[700, 300, 270], [700, 450, 270]];
  const btn = (k, [bx, by, bw], label, fill, edge, ink) => `<g data-tap="${k}" data-btn="${k}"><rect x="${bx}" y="${by}" width="${bw}" height="96" rx="24" fill="${fill}" stroke="${edge}" stroke-width="4"/>
    <rect x="${bx}" y="${by + 86}" width="${bw}" height="12" rx="6" fill="${edge}" opacity="0.6"/><text class="x2a-t" x="${bx + bw / 2}" y="${by + 46}" font-size="44" fill="${ink}">${label}</text></g>`;
  t.draw(`${g}
    <g class="x2c-read"><rect x="${T ? 250 : 680}" y="${T ? 110 : 150}" width="${T ? 500 : 310}" height="96" rx="20" fill="#fff" stroke="#CBD5E1" stroke-width="3"/>
      <text class="x2c-txt x2a-t" x="${T ? 500 : 835}" y="${T ? 158 : 198}" font-size="${T ? 54 : 44}" fill="#1E3A8A">&nbsp;</text></g>
    ${buttons ? btn('m15', B[0], '+ 15 phút', '#FEE2E2', '#F87171', '#991B1B') + btn('h1', B[1], '+ 1 giờ', '#DBEAFE', '#60A5FA', '#1E3A8A') : ''}`);
  let now = time, busy = false, locked = false;
  const hand = (m) => {
    t.q('.x2c-m').setAttribute('transform', `rotate(${(m % 60) * 6} ${x} ${y})`);
    t.q('.x2c-h').setAttribute('transform', `rotate(${((m / 60) % 12) * 30} ${x} ${y})`);
  };
  const read = (on = true) => { t.q('.x2c-txt').textContent = on ? timeText(now) : '?'; };
  Object.defineProperty(t, 'time', { get: () => now });
  Object.defineProperty(t, 'busy', { get: () => busy });
  t.read = read;
  t.set = async (m, { ms = 900 } = {}) => {
    const a = now; now = m;
    if (!ms) { hand(m); read(); return; }
    const d = anim(ms), t0 = performance.now();
    await new Promise((res) => {
      const step = (n) => { const k = Math.min(1, (n - t0) / d), e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2; hand(a + (m - a) * e); if (k < 1) requestAnimationFrame(step); else res(); };
      requestAnimationFrame(step);
    });
    hand(m); read();
    sfx.tap?.();
  };
  t.lock = (on) => { locked = on; t.qa('[data-btn]').forEach((b) => { b.classList.toggle('x2a-off', on); b.style.opacity = on ? 0.4 : 1; }); };
  t.btn = (k) => t.q(`[data-btn="${k}"]`);
  t.on(async (ev, key) => {
    if (ev !== 'tap' || locked || busy || !['m15', 'h1'].includes(key)) return;
    busy = true;
    try { await t.set(now + (key === 'm15' ? 15 : 60), { ms: key === 'm15' ? 700 : 900 }); } finally { busy = false; }
    t.emit('change', now);
  });
  hand(now); read();
  return t;
}

/** Dải 24 giờ của một ngày: mỗi giờ một ô bấm được, các buổi tô màu. */
function createDay(host) {
  const t = createStage(host, { bg: skyGrass(0.82, { trees: false }) });
  const T = t.tall;
  const PARTS = [[0, 10, 'Sáng', '#FEF08A'], [10, 12, 'Trưa', '#FDE047'], [12, 18, 'Chiều', '#FDBA74'], [18, 21, 'Tối', '#A5B4FC'], [21, 24, 'Đêm', '#818CF8']];
  const rows = 2, per = 24 / rows, w = (T ? 900 : 940) / per, x0 = T ? 50 : 30, h = T ? 150 : 140;
  const ry = (row) => (T ? 330 + row * 330 : 230 + row * 290);
  let g = '';
  for (let k = 0; k < 24; k++) {
    const row = Math.floor(k / per), col = k % per, xx = x0 + col * w, yy = ry(row);
    const part = PARTS.find(([a, b]) => k >= a && k < b);
    g += `<g data-tap="h:${k + 1}"><rect x="${xx}" y="${yy}" width="${w}" height="${h}" fill="${part[3]}" stroke="#fff" stroke-width="3"/>
      <text class="x2a-t" x="${xx + w / 2}" y="${yy + h / 2}" font-size="${T ? 44 : 42}">${k + 1}</text></g>`;
  }
  for (const [a, b, name] of PARTS) {
    const row = Math.floor(a / per);
    const xa = x0 + (a % per) * w, xb = x0 + (((b - 1) % per) + 1) * w;
    g += `<text class="x2a-t x2a-halo" x="${(xa + xb) / 2}" y="${ry(row) - 40}" font-size="${T ? 42 : 34}" fill="#7C2D12">${name}</text>`;
  }
  t.draw(`${g}<g class="x2d-mark"></g>`);
  t.cell = (hh) => t.q(`[data-tap="h:${hh}"]`);
  t.pick = (hh, color = '#DC2626') => {
    const r = t.cell(hh).querySelector('rect');
    t.add(`<rect x="${r.getAttribute('x')}" y="${r.getAttribute('y')}" width="${r.getAttribute('width')}" height="${r.getAttribute('height')}" fill="none" stroke="${color}" stroke-width="8" rx="6"/>`, t.q('.x2d-mark'));
    t.pop(t.cell(hh));
  };
  return t;
}

const b29 = {
  title: 'Bài 29: Ngày – giờ, giờ – phút',
  setup: (board) => createDay(board),
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('Một ngày có <b>24 giờ</b>');
      await c.say('Một ngày có 24 giờ, tính từ 12 giờ đêm hôm trước đến 12 giờ đêm hôm sau. Có buổi sáng, trưa, chiều, tối, đêm.', '1 ngày = <b>24 giờ</b>');
      await c.say('Sau 12 giờ trưa, ta đếm tiếp 13 giờ, 14 giờ, 15 giờ. Chạm vào ô 15 giờ.', 'Chạm vào ô <b>15 giờ</b>');
      await waitTap(c, t, (k) => k === 'h:15', { nudge: 'Ô 15 ở phần buổi chiều.', el: () => t.cell(15), bad: () => c.hint('Tìm ô có số 15, ở buổi chiều.') });
      t.pick(15);
      c.show('15 giờ còn gọi là mấy giờ chiều?');
      await c.choose([{ html: '3 giờ chiều', value: 3 }, { html: '5 giờ chiều', value: 5 }, { html: '1 giờ chiều', value: 1 }], 3, { hint: '13 giờ là 1 giờ chiều, 14 giờ là 2 giờ chiều.' });
      t.caption('15 giờ = <b>3 giờ chiều</b>');
      await c.say('15 giờ còn gọi là 3 giờ chiều. 20 giờ còn gọi là 8 giờ tối.', '15 giờ = 3 giờ chiều · 20 giờ = 8 giờ tối');
    },
    async (c) => {
      const t = c.use((b) => createClock(b, { time: 7 * 60 }));
      t.lock(true);
      await c.say('Trên đồng hồ, kim ngắn chỉ giờ, kim dài chỉ phút. Bây giờ kim dài chỉ số 12, kim ngắn chỉ số 7: 7 giờ.', 'Kim <b>ngắn</b> chỉ giờ · kim <b>dài</b> chỉ phút');
      t.lock(false);
      await c.say('Bấm cộng 1 giờ cho đồng hồ chỉ 9 giờ.', 'Bấm <b>+ 1 giờ</b> cho tới <b>9 giờ</b>');
      const off = t.on((ev) => { if (ev === 'change' && t.time > 9 * 60) c.hint('Quá 9 giờ rồi. Theo dõi kim ngắn: đếm 8, 9.'); });
      await c.until(t, () => !t.busy && t.time >= 9 * 60, { nudge: 'Bấm nút "cộng 1 giờ" màu xanh.', el: () => t.btn('h1') });
      off();
      t.lock(true);
      await t.set(9 * 60, { ms: t.time === 9 * 60 ? 0 : 600 });
      await c.say('Kim ngắn chỉ số 9, kim dài chỉ số 12: 9 giờ.', '<b>9 giờ</b>');
    },
    async (c) => {
      const t = c.t;
      t.lock(false);
      await c.say('Bấm cộng 15 phút nhiều lần cho kim dài quay đủ một vòng. Xem kim ngắn đi đến đâu.', 'Bấm <b>+ 15 phút</b> cho kim dài quay <b>một vòng</b>');
      await c.until(t, () => !t.busy && t.time >= 10 * 60, { nudge: 'Bấm nút "cộng 15 phút" màu đỏ.', el: () => t.btn('m15') });
      t.lock(true);
      await c.say('Kim dài quay một vòng là 60 phút, kim ngắn đi từ số 9 sang số 10. 1 giờ bằng 60 phút.', 'Kim dài quay 1 vòng: <b>1 giờ = 60 phút</b>');
    },
    async (c) => {
      const t = c.t;
      if (t.time !== 600) await t.set(600, { ms: 0 });
      t.lock(false);
      await c.say('Bây giờ là 10 giờ. Đặt đồng hồ chỉ 10 giờ 30 phút.', 'Đặt đồng hồ: <b>10 giờ 30 phút</b>');
      const off = t.on((ev) => { if (ev === 'change' && t.time > 630) c.hint('Quá rồi. 30 phút là hai lần 15 phút.'); });
      await c.until(t, () => !t.busy && t.time >= 630, { nudge: '30 phút là hai lần 15 phút.', el: () => t.btn('m15') });
      off();
      t.lock(true);
      if (t.time !== 630) await t.set(630, { ms: 500 });
      await c.say('Kim dài chỉ số 6: 10 giờ 30 phút, còn gọi là 10 giờ rưỡi.', '10 giờ 30 phút = <b>10 giờ rưỡi</b>');
    },
    async (c) => {
      const t = c.t;
      await t.set(4 * 60 + 15, { ms: 0 });
      t.read(false);
      c.show('Đồng hồ chỉ mấy giờ?');
      await c.say('Đồng hồ này chỉ mấy giờ?');
      await c.choose([{ html: '3 giờ 15 phút', value: 1 }, { html: '4 giờ 15 phút', value: 2 }, { html: '4 giờ 30 phút', value: 3 }], 2, { hint: 'Kim ngắn vừa qua số 4. Kim dài chỉ số 3 là 15 phút.' });
      t.read(true);
      await c.say('Kim ngắn vừa qua số 4, kim dài chỉ số 3: 4 giờ 15 phút.', '<b>4 giờ 15 phút</b>');
    },
  ],
};

// ── Lịch ──────────────────────────────────────────────────────────────────────────────────────────────
const DAYS = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'];
const SHORT = ['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'CN'];
const dow = (y, m, d) => (new Date(y, m - 1, d).getDay() + 6) % 7; // 0 = thứ Hai
const daysIn = (y, m) => new Date(y, m, 0).getDate();

function createCalendar(host, { y = 2026, m = 1 } = {}) {
  const t = createStage(host, { bg: desk(0.08) });
  const T = t.tall;
  const L = T ? { x0: 45, cw: 130, top: 120, hh: 100, ny: 270, cy: 310, ch: 118, fs: 54 } : { x0: 60, cw: 125, top: 104, hh: 84, ny: 228, cy: 258, ch: 80, fs: 44 };
  t.show = (yy, mm) => {
    t.y = yy; t.m = mm;
    const n = daysIn(yy, mm), first = dow(yy, mm, 1);
    let g = `<rect x="${L.x0 - 15}" y="${L.top}" width="${7 * L.cw + 30}" height="${L.cy + 6 * L.ch - L.top + 18}" rx="22" fill="#fff" stroke="#E2E8F0" stroke-width="4"/>
      <rect x="${L.x0 - 15}" y="${L.top}" width="${7 * L.cw + 30}" height="${L.hh}" rx="22" fill="#EF4444"/>
      <text class="x2a-t" x="500" y="${L.top + L.hh / 2}" font-size="${L.fs}" fill="#fff">Tháng ${mm}</text>`;
    SHORT.forEach((s, i) => { g += `<text class="x2a-t" x="${L.x0 + i * L.cw + L.cw / 2}" y="${L.ny}" font-size="${L.fs * 0.68}" fill="${i === 6 ? '#DC2626' : '#475569'}">${s}</text>`; });
    for (let d = 1; d <= n; d++) {
      const k = first + d - 1, col = k % 7, row = Math.floor(k / 7);
      const xx = L.x0 + col * L.cw, yy2 = L.cy + row * L.ch;
      g += `<g data-tap="d:${d}"><rect class="x2l-c" x="${xx + 4}" y="${yy2 + 4}" width="${L.cw - 8}" height="${L.ch - 8}" rx="12" fill="${col === 6 ? '#FEF2F2' : '#F8FAFC'}" stroke="#E2E8F0" stroke-width="2"/>
        <text class="x2a-t" x="${xx + L.cw / 2}" y="${yy2 + L.ch / 2}" font-size="${L.fs}" fill="${col === 6 ? '#DC2626' : INK}">${d}</text></g>`;
    }
    t.draw(`${g}<g class="x2l-mark"></g>`);
  };
  t.cell = (d) => t.q(`[data-tap="d:${d}"]`);
  t.pick = (d, color = '#F59E0B') => {
    const r = t.cell(d).querySelector('rect');
    r.setAttribute('fill', color === '#F59E0B' ? '#FEF3C7' : '#DCFCE7'); r.setAttribute('stroke', color); r.setAttribute('stroke-width', 7);
    t.pop(t.cell(d));
  };
  t.col = (d) => {
    const k = dow(t.y, t.m, d);
    const x = L.x0 + k * L.cw;
    t.add(`<rect x="${x + 2}" y="${L.ny - 30}" width="${L.cw - 4}" height="${L.cy + 6 * L.ch - L.ny + 30}" rx="16" fill="none" stroke="#2563EB" stroke-width="6" stroke-dasharray="14 8"/>`, t.q('.x2l-mark'));
  };
  t.show(y, m);
  return t;
}

const b30 = {
  title: 'Bài 30: Ngày – tháng',
  setup: (board) => createCalendar(board, { y: 2026, m: 1 }),
  steps: [
    async (c) => {
      const t = c.t;
      await c.say('Đây là tờ lịch tháng 1. Mỗi ô là một ngày. Hàng trên cùng ghi thứ: thứ Hai, thứ Ba, đến Chủ nhật.', 'Tờ lịch <b>tháng 1</b>');
      await c.say('Tháng 1 có bao nhiêu ngày? Chạm vào ngày cuối cùng của tháng.', 'Chạm vào <b>ngày cuối cùng</b> của tháng');
      await waitTap(c, t, (k) => k === 'd:31', { nudge: 'Ngày cuối cùng ở hàng dưới cùng.', el: () => t.cell(31), bad: () => c.hint('Tìm số lớn nhất trên tờ lịch.') });
      t.pick(31);
      await c.say('Tháng 1 có 31 ngày.', 'Tháng 1 có <b>31 ngày</b>');
    },
    async (c) => {
      const t = c.t;
      await c.say('Ngày 15 tháng 1 là thứ mấy? Chạm vào ngày 15.', 'Chạm vào ngày <b>15</b>');
      await waitTap(c, t, (k) => k === 'd:15', { nudge: 'Tìm ô có số 15.', el: () => t.cell(15), bad: () => c.hint('Tìm ô có số 15.') });
      t.pick(15); t.col(15);
      c.show('Ngày 15 tháng 1 là thứ mấy?');
      await c.choose(['Thứ Tư', 'Thứ Năm', 'Thứ Sáu'].map((d) => ({ html: d, value: d })), DAYS[dow(2026, 1, 15)], { hint: 'Nhìn lên hàng trên cùng, cùng cột với ngày 15.' });
      await c.say(`Ngày 15 tháng 1 là ${DAYS[dow(2026, 1, 15)]}.`, `Ngày 15 tháng 1: <b>${DAYS[dow(2026, 1, 15)]}</b>`);
    },
    async (c) => {
      const t = c.t;
      await c.say('Một tuần có 7 ngày. Thứ Năm tuần sau là ngày mấy? Chạm vào ngày đó.', 'Thứ Năm <b>tuần sau</b>: chạm vào ngày đó');
      await waitTap(c, t, (k) => k === 'd:22', { nudge: 'Ngày ngay dưới ngày 15, cùng cột.', el: () => t.cell(22), bad: () => c.hint('Cùng cột thứ Năm, ở hàng ngay dưới ngày 15.') });
      t.pick(22, '#16A34A');
      await c.say('Ngày 22. 15 cộng 7 bằng 22: sau một tuần là thêm 7 ngày.', '15 + 7 = <b>22</b>');
    },
    async (c) => {
      const t = c.t;
      t.show(2026, 1);
      const suns = Array.from({ length: 31 }, (_, i) => i + 1).filter((d) => dow(2026, 1, d) === 6);
      await c.say('Chạm vào tất cả các ngày Chủ nhật của tháng 1.', 'Chạm vào các ngày <b>Chủ nhật</b>');
      const got = new Set();
      const off = t.on((ev, key) => {
        if (ev !== 'tap' || !key.startsWith('d:')) return;
        const d = +key.slice(2);
        if (suns.includes(d)) { if (!got.has(d)) { got.add(d); t.pick(d, '#16A34A'); sfx.ding?.(); t.emit('sun'); } } else c.hint('Ngày Chủ nhật ở cột cuối cùng, chữ màu đỏ.');
      });
      await c.until(t, () => got.size === suns.length, { nudge: 'Các ngày Chủ nhật ở cột CN.', el: () => t.cell(suns.find((d) => !got.has(d))) });
      off();
      c.show('Tháng 1 có mấy ngày Chủ nhật?');
      await c.choose([3, 4, 5].map((v) => ({ html: String(v), value: v })), suns.length, { hint: 'Đếm các ô vừa chạm.' });
      await c.say(`Tháng 1 có ${suns.length} ngày Chủ nhật: ${suns.join(', ')}.`);
    },
    async (c) => {
      const t = c.t;
      t.show(2026, 2);
      await c.say('Đây là tờ lịch tháng 2. Tháng 2 có mấy ngày?', 'Tờ lịch <b>tháng 2</b>: có mấy ngày?');
      await c.choose([28, 30, 31].map((v) => ({ html: `${v} ngày`, value: v })), 28, { hint: 'Nhìn ngày cuối cùng của tờ lịch.' });
      t.pick(28);
      await c.say('Tháng 2 năm nay có 28 ngày. Có năm tháng 2 có 29 ngày.', 'Tháng 2: <b>28</b> hoặc 29 ngày');
    },
  ],
};

export const TIME_EXPLORES = { b29, b30 };
export { sleep };
