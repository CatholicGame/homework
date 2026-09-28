/**
 * 🥚 Chợ phiên — Quầy trứng: đóng trứng vào hộp. Thiết kế: docs/lop_3/thiet-ke-tro-choi-tap1.md §4.1.
 *   mul: khách lấy n hộp k quả → bé chạm từng hộp để đóng (thấy các nhóm bằng nhau) → tính tổng số trứng.
 *   div: khách mang N quả đến nhờ xếp hộp k quả → bé tính số hộp → máy đóng hộp theo số bé gõ để kiểm chứng.
 *   rem: như div nhưng có trứng thừa (chia có dư) → bé tính số hộp và số quả thừa.
 */

import { cartonSvg, cartonSize, cartonIcon, looseEggsSvg, looseTraySize, eggSvg } from '../art/eggs.js';
import { NPCS, cap } from '../npc.js';
import { mountStall, Q } from './stall.js';
import { sfx } from '../../preschool/fx.js';
import { flyOne, calmMotion } from '../fly.js';

const eggIcon = (size = 26) => `<svg viewBox="-11 -12 22 24" width="${size}" height="${size}" aria-hidden="true">${eggSvg(0, 0, 10.5)}</svg>`;
const carton = (k) => cartonIcon(k, 30);
const PACK_MAX = 60; // gõ số hộp quá lớn thì không vẽ hết (chỉ báo sai)

// Một quả trứng rời để bay (khung vừa khít quả: rx = 0,78 r, ry = r với r = 9,5 như trong khay / hộp).
const FLY_EGG = `<svg viewBox="-7.41 -9.5 14.82 19" preserveAspectRatio="none" aria-hidden="true">${eggSvg(0, 0, 9.5)}</svg>`;

/** Các quả trứng (nhóm <g>) trong một hình SVG, theo thứ tự vẽ. */
const eggsIn = (el) => [...(el?.querySelectorAll('svg > g') || [])];

/**
 * Trứng bay theo đường cong từ khay (fromRects: vị trí các quả vừa lấy khỏi khay) vào đúng ô trong hộp
 * (toEls: các quả đã vẽ trong hộp — ẩn đi cho tới khi quả bay tới nơi), LẦN LƯỢT từng quả: mỗi quả bay
 * 0,5–1 giây (xa thì lâu hơn), quả sau cất cánh cách quả trước `gap` ms; đáp xuống thì nảy nhẹ trong ô và
 * kêu "cạch". Trả về số ms tới khi quả cuối đáp.
 */
function flyEggs(fromRects, toEls, { gap = 260, minMs = 500, maxMs = 1000 } = {}) {
  const n = Math.min(fromRects.length, toEls.length);
  let end = 0;
  for (let i = 0; i < n; i++) {
    const target = toEls[i];
    target.style.opacity = '0';
    end = Math.max(end, flyOne(FLY_EGG, fromRects[i], target.getBoundingClientRect(), {
      delay: i * gap, minMs, maxMs, spin: (i % 2 ? -1 : 1) * 16, className: 'g3e-fly',
      onLand: () => {
        target.style.opacity = '';
        if (!calmMotion()) target.classList.add('g3e-egg-pop'); // nảy nhẹ khi rơi vào ô
        sfx.tap();
      },
    }));
  }
  return end;
}

export const EGG_LEVELS = [
  {
    id: 'egg-1', n: 1, title: 'Hộp 2, 5, 10 quả', missions: 5,
    knowledge: 'bảng nhân 2, bảng nhân 5 (lớp 2)',
    lessons: { workbook: ['bai-4', 'bai-7'], practice: ['tuan-2', 'tuan-3'] },
    ask: (n) => `Đóng trứng vào hộp rồi đếm giúp ${n.me} có bao nhiêu quả nhé!`,
    desc: 'Khách lấy mấy hộp trứng, mỗi hộp 2, 5 hoặc 10 quả: đóng hộp rồi tính tất cả bao nhiêu quả.',
    sizes: [2, 5, 10], kinds: ['mul'], boxes: [2, 9],
    how: [['carton', 'Đóng hộp'], ['✖️', 'Tính số trứng']],
  },
  {
    id: 'egg-2', n: 2, title: 'Nhân và chia', missions: 5,
    knowledge: 'bảng nhân 3 đến 9, bảng chia 3 đến 9',
    lessons: { workbook: ['bai-5', 'bai-6', 'bai-9', 'bai-10', 'bai-11', 'bai-12'], practice: ['tuan-2', 'tuan-3', 'tuan-4', 'tuan-5', 'tuan-6'] },
    ask: (n) => `Đóng hộp 3, 4, 6, 8, 9 quả — nhân hay chia giúp ${n.me} nhé!`,
    desc: 'Hộp 3, 4, 6, 8, 9 quả: khách lấy mấy hộp thì nhân; khách mang trứng đến nhờ xếp hộp thì chia.',
    sizes: [3, 4, 6, 8, 9], kinds: ['mul', 'div'], boxes: [2, 9],
    how: [['carton', 'Đóng hộp'], ['✖️', 'Nhân'], ['➗', 'Chia']],
  },
  {
    id: 'egg-3', n: 3, title: 'Trứng thừa ra', missions: 5,
    knowledge: 'phép chia hết, phép chia có dư',
    lessons: { workbook: ['bai-25'], practice: ['tuan-10'] },
    ask: (n) => `Xếp trứng vào hộp — được mấy hộp, thừa mấy quả giúp ${n.me} nhé!`,
    desc: 'Chia có dư: 50 quả xếp hộp 6 quả → 8 hộp, thừa 2 quả.',
    sizes: [3, 4, 5, 6, 7, 8, 9], kinds: ['rem'], boxes: [2, 9],
    how: [['➗', 'Số hộp'], ['egg', 'Số quả thừa'], ['carton', 'Đóng hộp']],
  },
  {
    id: 'egg-4', n: 4, title: 'Nhiều trứng', missions: 5,
    knowledge: 'chia số có 2–3 chữ số cho số có 1 chữ số',
    lessons: { workbook: ['bai-26', 'bai-37'], practice: ['tuan-11', 'tuan-15'] },
    ask: (n) => `Trang trại nhà ${n.me} nhiều trứng lắm — xếp hộp giúp ${n.me} nhé!`,
    desc: 'Số trứng có hai, ba chữ số (tới 150 quả): 96 quả xếp hộp 8 quả → 12 hộp.',
    sizes: [2, 3, 4, 5, 6, 7, 8, 9], kinds: ['div', 'rem'], boxes: [10, 30], maxEggs: 150,
    how: [['➗', 'Số hộp'], ['egg', 'Số quả thừa'], ['carton', 'Đóng hộp']],
  },
];

export const EGG_GAME = {
  id: 'egg',
  title: 'Quầy trứng',
  icon: '🥚',
  unitWord: 'khách',
  levels: EGG_LEVELS,
  stallIcon: () => cartonIcon(6, 56),
  summaryText: (ok, total) => `Em đã giúp <strong>${ok}/${total}</strong> khách hài lòng.`,

  howTo(level) {
    const pic = (p) => (p === 'carton' ? cartonIcon(6, 44) : p === 'egg' ? eggIcon(40) : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '😊', label: 'Khách vui' }];
  },

  makeMission(rng, level, history) {
    const prev = history[history.length - 1];
    const recentNpcs = history.slice(-3).map(m => m.npc.id);
    const npc = rng.pick(NPCS.filter(n => !recentNpcs.includes(n.id)));
    // Cấp 2 xen kẽ nhân / chia; cấp 3 thỉnh thoảng chia hết để bé không đoán "lúc nào cũng dư".
    let kind = level.kinds.length > 1
      ? (prev ? level.kinds.find(k => k !== prev.kind) : rng.pick(level.kinds))
      : level.kinds[0];
    if (kind === 'rem' && level.id === 'egg-3' && rng() < 0.2) kind = 'div';
    const k = rng.pick(level.sizes.filter(s => s !== prev?.k));
    const hi = Math.min(level.boxes[1], level.maxEggs ? Math.floor((level.maxEggs - k + 1) / k) : 99);
    let q;
    do { q = rng.int(level.boxes[0], hi); } while (prev && q === prev.q && hi > level.boxes[0]);
    const r = kind === 'rem' ? rng.int(1, k - 1) : 0;
    return { npc, kind, k, q, r, eggs: q * k + r };
  },

  mountMission(stage, m, level, api) {
    const n = m.npc;
    const { k, q, r, eggs: N } = m;
    const { counter, main, speak, row, ask, fail, thanks } = mountStall(stage, {
      npc: n, api,
      sign: `${cartonIcon(k, 34)}<span><strong>Hộp trứng</strong><br>Mỗi hộp <b>${k} quả</b></span>`,
      counter: `
        <div class="g3e-bench">
          <div class="g3e-tray"><div class="g3e-vi"><div class="g3e-tray-eggs"></div><span class="g3e-cap"></span></div></div>
          <div class="g3e-boxes"></div>
        </div>`,
    });
    const trayCell = counter.querySelector('.g3e-tray');
    const trayEggs = counter.querySelector('.g3e-tray-eggs');
    const cap_ = counter.querySelector('.g3e-cap');
    const boxesEl = counter.querySelector('.g3e-boxes');

    // Co giãn theo khung, CÙNG MỘT TỈ LỆ cho cả hai bên: quả trứng ở khay to đúng bằng quả trứng / ô
    // trong hộp (trứng là một, chỉ chuyển từ khay sang hộp). Tỉ lệ = số nhỏ hơn giữa "lưới hộp vừa bàn
    // đóng hộp" và "khay vừa ô bên trái" (tối đa 3,2 lần cỡ gốc). Khay xếp hàng 10, khung hẹp (vd. lúc
    // mở máy tính tiền) thì hàng 5 — chọn cách nào cho trứng to hơn.
    // Hình hộp có viền 2 đơn vị quanh mỗi phía (viewBox của cartonSvg) — tính cả viền để lưới không tràn.
    const { w: cw0, h: ch0 } = cartonSize(k);
    const cw = cw0 + 4, ch = ch0 + 4;
    let boxCount = 1;
    let trayMax = 1, trayCols = 10, looseCount = 0; // khay giữ nguyên cỡ lúc đầy (trayMax quả)
    const drawTray = () => { trayEggs.innerHTML = looseEggsSvg(looseCount, Math.ceil(trayMax / trayCols), trayCols); };
    const fit = () => {
      if (!boxesEl.isConnected) return obs.disconnect();
      const W = boxesEl.clientWidth, H = boxesEl.clientHeight, gap = 8;
      if (!W || !H) return;
      let best = 0;
      for (let cols = 1; cols <= boxCount; cols++) {
        const rows = Math.ceil(boxCount / cols);
        best = Math.max(best, Math.min((W - gap * (cols - 1)) / cols, ((H - gap * (rows - 1)) / rows) * (cw / ch)));
      }
      const tw = trayCell.clientWidth - 24, th = trayCell.clientHeight - cap_.offsetHeight - 36;
      const scaleFor = (cols) => {
        const { w, h } = looseTraySize(Math.ceil(trayMax / cols), cols);
        return Math.max(0.4, Math.min(best / cw, tw / w, th / h, 3.2));
      };
      // Hàng 5 chỉ khi ít trứng (≤ 50): nhiều hơn thì thành cột dài khó đếm theo chục.
      const cols = trayMax <= 50 && scaleFor(5) > scaleFor(10) * 1.05 ? 5 : 10;
      if (cols !== trayCols) { trayCols = cols; drawTray(); }
      const s = scaleFor(cols);
      const { w: vw, h: vh } = looseTraySize(Math.ceil(trayMax / cols), cols);
      const svg = trayEggs.querySelector('svg');
      boxesEl.style.setProperty('--box-w', `${Math.floor(cw * s)}px`);
      svg.style.width = `${Math.floor(vw * s)}px`;
      svg.style.height = `${Math.floor(vh * s)}px`;
    };
    const obs = new ResizeObserver(fit);
    obs.observe(counter);
    const setBoxes = (html, count) => { boxCount = Math.max(1, count); boxesEl.innerHTML = html; fit(); };
    const setLoose = (count, label) => { looseCount = count; drawTray(); cap_.innerHTML = label; fit(); };

    const done = () => { main.classList.remove('g3e-packing'); thanks(); };

    if (m.kind === 'mul') {
      // ── Khách lấy n hộp: bé chạm từng hộp trống để đóng trứng vào, rồi tính tất cả bao nhiêu quả. ──
      const total = q * k;
      const filled = new Set();
      // Khay của quầy có đủ trứng cho khách và dư một ít (không ghi số — bé tự tính); mỗi hộp đóng
      // xong thì khay bớt đúng k quả.
      let stock = Math.ceil((total + 3) / 10) * 10;
      trayMax = stock;
      setLoose(stock, 'Trứng của quầy');
      setBoxes(Array.from({ length: q }, (_, i) =>
        `<button type="button" class="g3e-box${i === 0 ? ' g3e-next' : ''}" data-b="${i}" aria-label="Hộp ${i + 1}">${cartonSvg(k, 0)}</button>`).join(''), q);
      // Vẽ lại riêng hộp vừa đóng (các hộp khác giữ nguyên — trứng đang bay vào hộp trước không bị mất).
      const fillBox = (btn) => {
        btn.innerHTML = cartonSvg(k, k);
        btn.classList.add('g3e-box-full');
        boxesEl.querySelectorAll('.g3e-next').forEach(el => el.classList.remove('g3e-next'));
        boxesEl.querySelector('.g3e-box:not(.g3e-box-full)')?.classList.add('g3e-next');
      };
      speak(`${cap(n.you)} lấy cho ${n.me} ${q} hộp trứng nhé!`, null, `Lấy cho ${n.me} <b class="g3f-want">${q} hộp</b> trứng nhé!`);
      boxesEl.addEventListener('click', (e) => {
        const b = e.target.closest('[data-b]');
        if (!b || filled.has(Number(b.dataset.b)) || filled.size >= q) return;
        filled.add(Number(b.dataset.b));
        // k quả cuối của khay bay sang hộp này, lần lượt từng quả.
        const from = eggsIn(trayEggs).slice(stock - k, stock).map(g => g.getBoundingClientRect());
        stock -= k;
        setLoose(stock, 'Trứng của quầy');
        fillBox(b);
        const t = flyEggs(from, eggsIn(b));
        if (filled.size === q) setTimeout(askTotal, t + 400);
      });
      const askTotal = () => {
        speak(`Tất cả có bao nhiêu quả trứng hả ${n.you}?`, null, 'Tất cả bao nhiêu quả?');
        ask(row(carton(k), '1 hộp', `<b>${k} quả</b>`) + row(carton(k), `${q} hộp`, Q, true), 'quả', (v, pad) => {
          if (v === total) { pad.lock('g3g-keypad-ok'); thanks(); return; }
          pad.lock('g3g-keypad-bad');
          fail(`${q} hộp, mỗi hộp ${k} quả: tất cả <b>${total} quả</b>.`, `${k} × ${q} = ${total}`);
        });
      };
      return;
    }

    // ── Khách mang N quả đến: bé tính số hộp (và số quả thừa), rồi đóng hộp theo đúng số bé gõ để kiểm chứng. ──
    const rem = m.kind === 'rem';
    trayMax = N;
    setLoose(N, `<b>${N} quả</b>`);
    setBoxes(`<div class="g3e-ghost">${cartonSvg(k, 0)}<b>?</b></div>`, 1);
    const tail = rem ? 'Được mấy hộp, thừa mấy quả?' : 'Được mấy hộp?';
    speak(`${cap(n.me)} mang đến ${N} quả trứng. ${cap(n.you)} xếp mỗi hộp ${k} quả, ${tail.toLowerCase()}`, null,
      `<b class="g3f-want">${N} quả</b> trứng. ${tail}`);
    const formula = `${N} : ${k} = ${q}${r ? ` (dư ${r})` : ''}`;
    const answerText = `${N} quả, mỗi hộp ${k} quả: được <b>${q} hộp</b>${r ? `, thừa <b>${r} quả</b>` : ''}.`;
    const bill = (b, cur) => row(eggIcon(), 'Có', `<b>${N} quả</b>`)
      + row(carton(k), '1 hộp', `<b>${k} quả</b>`)
      + row(carton(k), 'Số hộp', b == null ? Q : `<b>${b} hộp</b>`, cur === 'b')
      + (rem ? row(eggIcon(), 'Thừa', Q, cur === 'l') : '');

    ask(bill(null, 'b'), 'hộp', (b, pad) => {
      pad.lock();
      if (!rem) return pack(b, 0);
      ask(bill(b, 'l'), 'quả', (l, pad2) => { pad2.lock(); pack(b, l); });
    });

    /** Đóng lần lượt b hộp từ số trứng đang có: hộp nào đủ trứng thì đầy, hết trứng thì hộp cuối thiếu / trống. */
    function pack(b, l) {
      const ok = b === q && (!rem || l === r);
      const judge = () => {
        if (ok) return done();
        main.classList.remove('g3e-packing');
        fail(answerText, rem && b === q && l >= k
          ? `Số quả thừa phải bé hơn ${k} — đủ ${k} quả thì đóng thêm được 1 hộp.`
          : formula);
      };
      if (!b || b > PACK_MAX) return judge();
      main.classList.add('g3e-packing');
      const inBox = Array.from({ length: b }, (_, i) => Math.max(0, Math.min(k, N - i * k)));
      setBoxes(inBox.map(() => `<div class="g3e-box">${cartonSvg(k, 0)}</div>`).join(''), b);
      const boxEls = [...boxesEl.children];
      let left = N, i = 0;
      // Ít hộp (≤ 4): từng quả bay chậm, lần lượt như lúc bé tự đóng. Nhiều hộp thì nhanh dần để cả lượt
      // đóng không quá ~12 giây (vẫn đủ thấy trứng bay vào từng hộp).
      const flight = b <= 4 ? { gap: 260 } : { gap: Math.max(40, Math.min(200, 9000 / (b * k))), minMs: 500, maxMs: 700 };
      const delay = b <= 4 ? k * flight.gap + 350 : Math.max(250, Math.min(1200, 11000 / b));
      let lastLand = 0;
      const tick = () => {
        const box = boxEls[i];
        const from = eggsIn(trayEggs).slice(left - inBox[i], left).map(g => g.getBoundingClientRect());
        left -= inBox[i];
        box.innerHTML = cartonSvg(k, inBox[i]);
        box.classList.add(inBox[i] >= k ? 'g3e-box-full' : 'g3e-box-short');
        setLoose(left, left ? `Còn <b>${left} quả</b>` : 'Hết trứng');
        lastLand = performance.now() + flyEggs(from, eggsIn(box), flight);
        i++;
        if (i < b) setTimeout(tick, delay);
        else setTimeout(judge, Math.max(0, lastLand - performance.now()) + 500);
      };
      setTimeout(tick, 350);
    }
  },
};
