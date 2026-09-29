/**
 * 🚚 Xe chở hàng — bé điều phối kho hàng. Thiết kế: docs/lop_3/thiet-ke-tro-choi-tap1.md §4.2.
 *   trucks: N thùng, mỗi xe chở k thùng → CẦN MẤY XE? (chia có dư → thùng lẻ vẫn cần thêm 1 xe)
 *   crates: N hộp bánh, mỗi thùng k hộp → ĐÓNG ĐƯỢC MẤY THÙNG ĐẦY? (chia có dư → bỏ phần dư)
 *   rows / less (hai bước tính): tìm số thùng trong kho trước (a dãy × b thùng, hoặc N − số đã chở đi), rồi tính số xe.
 * Bé gõ số trước, rồi tự xếp thùng lên từng xe (nhiều xe thì máy xếp) để kiểm chứng: gõ ít thì còn thùng nằm lại
 * kho, gõ nhiều thì có xe chạy không. Xe xếp xong thì chạy đi.
 * Dùng khung quầy của Chợ phiên (market/stall.js: khách + máy tính + thẻ kết quả), theme 'depot'.
 */

import {
  truckSvg, truckSize, truckIcon, TRUCK_COLORS, storeSvg, storeSize, crateSvg, crateSize, crateIcon,
  boxIcon, packIcon, FLY_BOX, flyPack,
} from './art/trucks.js';
import { WORKER_NPCS as NPCS, cap } from './npc.js';
import { mountStall, Q } from './market/stall.js';
import { stallMeta, levelMeta } from './catalog.js';
import { sfx } from '../preschool/fx.js';
import { flyOne, calmMotion } from './fly.js';

const TAP_MAX = 8; // từ 8 xe / thùng trở xuống bé tự bấm xếp từng xe; nhiều hơn thì máy xếp lần lượt
const DRAW_MAX = 30; // gõ quá số này thì không vẽ (chỉ báo sai)

export const TRUCK_LEVELS = [
  {
    ...levelMeta('truck-1'), missions: 5,
    knowledge: 'phép chia hết, phép chia có dư',
    ask: (n) => `Kho nhiều thùng lắm — tính giúp ${n.me} cần mấy xe!`,
    desc: '23 thùng, mỗi xe chở 5 thùng → 4 xe đầy, còn 3 thùng lẻ vẫn cần thêm 1 xe: 5 xe.',
    kinds: ['trucks'], quot: [2, 6],
    how: [['🧮', 'Tính số xe'], ['truck', 'Xếp lên xe'], ['🚚💨', 'Xe chạy']],
  },
  {
    ...levelMeta('truck-2'), missions: 6,
    knowledge: 'chia số có hai chữ số cho số có một chữ số, phép chia có dư',
    ask: (n) => `Chở hết hàng thì thêm xe, đóng thùng thì chỉ tính thùng đầy!`,
    desc: 'Xen kẽ: chở hết thùng (thùng lẻ cần thêm xe) và đóng hộp bánh vào thùng (chỉ tính thùng đầy).',
    kinds: ['trucks', 'crates'], total: [20, 99], maxQ: 16,
    how: [['🧮', 'Tính'], ['truck', 'Xếp lên xe'], ['crate', 'Đóng thùng']],
  },
  {
    ...levelMeta('truck-3'), missions: 5,
    knowledge: 'bài toán giải bằng hai bước tính',
    ask: (n) => `Tính số thùng trong kho trước, rồi mới tính số xe!`,
    desc: 'Hai bước: kho có 4 dãy, mỗi dãy 9 thùng → 36 thùng; mỗi xe chở 6 thùng → 6 xe.',
    kinds: ['rows', 'less'],
    how: [['box', 'Số thùng'], ['🧮', 'Số xe'], ['truck', 'Xếp lên xe']],
  },
  {
    ...levelMeta('truck-4'), missions: 5,
    knowledge: 'chia số có ba chữ số cho số có một chữ số',
    ask: (n) => `Kho lớn của ${n.me} có hơn một trăm thùng — tính giúp ${n.me}!`,
    desc: 'Số thùng có ba chữ số (tới 190): 125 thùng, mỗi xe 9 thùng → 14 xe.',
    kinds: ['trucks', 'crates'], total: [100, 190], k: [6, 9], maxQ: 22,
    how: [['🧮', 'Tính'], ['truck', 'Xe chạy'], ['crate', 'Đóng thùng']],
  },
];

/** Chọn k (không trùng lượt trước) và q, r sao cho N = q × k + r nằm trong [lo, hi], q ≤ maxQ. */
function pickDiv(rng, { lo, hi, k: [k0, k1] = [3, 9], maxQ = 99, prevK, remChance = 0.85 }) {
  for (let t = 0; t < 200; t++) {
    const k = rng.int(k0, k1);
    if (k === prevK && k1 > k0) continue;
    const r = rng() < remChance ? rng.int(1, k - 1) : 0;
    const qLo = Math.max(2, Math.ceil((lo - r) / k)), qHi = Math.min(maxQ, Math.floor((hi - r) / k));
    if (qLo > qHi) continue;
    const q = rng.int(qLo, qHi);
    return { k, q, r, N: q * k + r };
  }
  return { k: 5, q: 4, r: 3, N: 23 };
}

export const TRUCK_GAME = {
  ...stallMeta('truck'),
  unitWord: 'đơn hàng',
  npcs: NPCS, // người ở kho / bến xe thay cho khách đi chợ
  levels: TRUCK_LEVELS,
  stallIcon: () => truckIcon(4, 56, 3),
  summaryText: (ok, total) => `Em đã giao đúng <strong>${ok}/${total}</strong> đơn hàng.`,

  howTo(level) {
    const pic = (p) => (p === 'truck' ? truckIcon(4, 48, 3) : p === 'crate' ? crateIcon(6, 44) : p === 'box' ? boxIcon(40) : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '😊', label: 'Khách vui' }];
  },

  makeMission(rng, level, history) {
    const prev = history[history.length - 1];
    const recentNpcs = history.slice(-3).map(m => m.npc.id);
    const npc = rng.pick(NPCS.filter(n => !recentNpcs.includes(n.id)));
    const kind = level.kinds.length > 1
      ? (prev ? level.kinds.find(k => k !== prev.kind) : rng.pick(level.kinds))
      : level.kinds[0];
    const color = rng.int(0, TRUCK_COLORS.length - 1);
    const base = { npc, kind, color };

    if (kind === 'rows') {
      // a dãy × b thùng (b ≤ 10 để thấy rõ từng dãy), mỗi xe k thùng, cần ≤ 10 xe.
      for (;;) {
        const a = rng.int(2, 5), b = rng.int(6, 10), N = a * b;
        const k = rng.int(Math.max(3, Math.ceil(N / 10)), 9);
        if (k === prev?.k) continue;
        return { ...base, a, b, N, k, q: Math.floor(N / k), r: N % k };
      }
    }
    if (kind === 'less') {
      // N thùng, đã chở đi d thùng; số còn lại M chở bằng xe k thùng (≤ 10 xe).
      for (;;) {
        const N = rng.int(40, 90), d = rng.int(10, Math.min(40, N - 20)), M = N - d;
        const k = rng.int(Math.max(3, Math.ceil(M / 10)), 9);
        if (k === prev?.k) continue;
        return { ...base, N: M, start: N, d, k, q: Math.floor(M / k), r: M % k };
      }
    }
    if (level.quot) {
      // Cấp 1: phép chia trong bảng (thương 2–6), thỉnh thoảng chia hết để bé không đoán "lúc nào cũng thêm xe".
      const d = pickDiv(rng, { lo: 12, hi: 60, maxQ: level.quot[1], prevK: prev?.k, remChance: 0.8 });
      return { ...base, ...d };
    }
    const [lo, hi] = level.total;
    return { ...base, ...pickDiv(rng, { lo, hi, k: level.k, maxQ: level.maxQ, prevK: prev?.k }) };
  },

  mountMission(stage, m, level, api) {
    const n = m.npc;
    const { k } = m;
    const crates = m.kind === 'crates';
    const item = crates ? 'pack' : 'box';
    const word = crates ? 'hộp' : 'thùng';
    const { counter, main, speak, row, ask, nudge, thanks } = mountStall(stage, {
      npc: n, api, theme: 'depot',
      sign: crates
        ? `${crateIcon(k, 38, 0)}<span><strong>Thùng các-tông</strong><br>Mỗi thùng <b>${k} hộp</b></span>`
        : `${truckIcon(k, 44, 0, TRUCK_COLORS[m.color])}<span><strong>Xe tải</strong><br>Mỗi xe chở <b>${k} thùng</b></span>`,
      counter: `
        <div class="g3t-bench">
          <div class="g3t-store"><div class="g3t-shed"><div class="g3t-items"></div><span class="g3t-cap"></span></div></div>
          <div class="g3t-lot"></div>
        </div>`,
    });
    const bench = counter.querySelector('.g3t-bench');
    const storeCell = counter.querySelector('.g3t-store');
    const shed = counter.querySelector('.g3t-shed');
    const itemsEl = counter.querySelector('.g3t-items');
    const capEl = counter.querySelector('.g3t-cap');
    const lot = counter.querySelector('.g3t-lot');

    // ── Kho và bãi xe co giãn theo khung, CÙNG MỘT TỈ LỆ (thùng ở kho và thùng trên xe là một). Thử các cách chia
    // khung (cột trái / phải khi ngang, trên / dưới khi dọc) và cách xếp kho (hàng 10 / hàng 5), lấy cách cho
    // thùng to nhất.
    const fixedCols = m.kind === 'rows' ? m.b : 0;
    let storeCols = fixedCols || 10, storeMax = m.kind === 'less' ? m.start : m.N, storeCount = storeMax;
    const unit = crates ? crateSize(k) : truckSize(k);
    let lotCount = 1;
    const drawStore = () => {
      itemsEl.innerHTML = storeSvg(storeCount, { rows: Math.ceil(storeMax / storeCols), cols: storeCols, item });
    };
    const lotScale = (W, H) => {
      let best = 0;
      for (let cols = 1; cols <= lotCount; cols++) {
        const rows = Math.ceil(lotCount / cols);
        best = Math.max(best, Math.min((W - 8 * (cols - 1)) / (cols * unit.w), (H - 8 * (rows - 1)) / (rows * unit.h)));
      }
      return best;
    };
    const fit = () => {
      if (!lot.isConnected) return obs.disconnect();
      const cs = getComputedStyle(bench);
      const stacked = matchMedia('(orientation: portrait)').matches;
      const W = bench.clientWidth, gap = 10;
      const H = bench.clientHeight - parseFloat(cs.paddingTop);
      if (!W || !H) return;
      const ovW = 22, ovH = capEl.offsetHeight + 30; // viền + đệm của kho, dòng chữ dưới kho
      let top = { s: 0 };
      for (const cols of fixedCols ? [fixedCols] : storeMax <= 40 ? [10, 5] : [10]) {
        const sz = storeSize(Math.ceil(storeMax / cols), cols, item);
        for (let f = 0.2; f <= 0.76; f += 0.02) {
          const sw = stacked ? W : W * f - gap / 2, sh = stacked ? H * f - gap / 2 : H;
          const lw = stacked ? W : W - sw - gap, lh = stacked ? H - sh - gap : H;
          const s = Math.min(3, (sw - ovW) / sz.w, (sh - ovH) / sz.h, lotScale(lw, lh));
          if (s > top.s) top = { s, cols, sz, need: stacked ? Math.ceil(sz.h * s + ovH) : Math.ceil(sz.w * s + ovW) };
        }
      }
      if (!top.s) return;
      if (top.cols !== storeCols) { storeCols = top.cols; drawStore(); }
      bench.style.gridTemplateColumns = stacked ? 'minmax(0, 1fr)' : `${top.need}px minmax(0, 1fr)`;
      bench.style.gridTemplateRows = stacked ? `${top.need}px minmax(0, 1fr)` : 'minmax(0, 1fr)';
      const svg = itemsEl.querySelector('svg');
      svg.style.width = `${Math.floor(top.sz.w * top.s)}px`;
      svg.style.height = `${Math.floor(top.sz.h * top.s)}px`;
      lot.style.setProperty('--u-w', `${Math.floor(unit.w * top.s)}px`);
    };
    const obs = new ResizeObserver(fit);
    obs.observe(counter);
    const setStore = (count, label) => { storeCount = count; drawStore(); if (label != null) capEl.innerHTML = label; fit(); };
    const setLot = (html, count) => { lotCount = Math.max(1, count); lot.innerHTML = html; fit(); };

    // Các thùng / hộp trong kho (theo thứ tự vẽ) — lấy từ cuối khi chở đi.
    const storeItems = () => [...itemsEl.querySelectorAll('.g3t-bx')];
    /** Bay `count` thùng cuối của kho tới các chỗ `targets` (ẩn tới khi thùng đáp), lần lượt. Trả về ms tới lúc đáp hết. */
    const moveOut = (count, targets, { gap = 220, minMs = 480, maxMs = 900 } = {}, label = null) => {
      const first = storeCount - count;
      const from = storeItems().slice(first, storeCount).map(g => g.getBoundingClientRect());
      setStore(first, label);
      let end = 0;
      from.forEach((rect, i) => {
        const t = targets[i];
        if (t) t.style.opacity = '0';
        end = Math.max(end, flyOne(crates ? flyPack() : FLY_BOX, rect,
          t ? t.getBoundingClientRect() : offRight(rect), {
            delay: i * gap, minMs, maxMs, spin: (i % 2 ? -1 : 1) * 10, className: 'g3t-fly',
            onLand: () => { if (t) { t.style.opacity = ''; if (!calmMotion()) t.classList.add('g3t-pop'); } sfx.tap(); },
          }));
      });
      return end;
    };
    // Chỗ "ra khỏi kho" (thùng đã chở đi từ sáng): mép phải bãi xe.
    const offRight = (rect) => {
      const L = lot.getBoundingClientRect();
      return { left: L.right - rect.width, top: L.top + L.height / 2, width: rect.width, height: rect.height };
    };

    // Chỗ trống ở bãi xe trước khi tính: xe / thùng mờ có dấu "?" — bấm vào thì khách nhắc tính trước.
    const ghost = () => {
      setLot(`<button type="button" class="g3t-ghost" aria-label="Chưa có ${crates ? 'thùng' : 'xe'}">${crates ? crateSvg(k, 0) : truckSvg(k, 0, { color: '#CBD5E1' })}<b>?</b></button>`, 1);
      lot.querySelector('.g3t-ghost').onclick = () => {
        speak(`${cap(n.you)} tính ở máy tính trước đã!`, null, 'Tính ở máy tính trước!');
        nudge();
      };
    };

    const need = crates ? m.q : m.q + (m.r ? 1 : 0);
    const formula = crates
      ? `${m.N} : ${k} = ${m.q}${m.r ? ` (dư ${m.r})` : ''} → ${m.q} thùng đầy`
      : `${m.N} : ${k} = ${m.q}${m.r ? ` (dư ${m.r}) → ${m.q} + 1 = ${need} xe` : ''}`;

    // ── Bước tìm số thùng trong kho (hai bước tính) ─────────────────────────────────────────────────────
    if (m.kind === 'rows') {
      setStore(m.N, `<b>${m.a} dãy</b>`);
      ghost();
      speak(`Kho có ${m.a} dãy, mỗi dãy ${m.b} thùng. Mỗi xe chở ${k} thùng. Trước hết, kho có tất cả bao nhiêu thùng?`, null,
        `<b class="g3f-want">${m.a} dãy</b>, mỗi dãy <b class="g3f-want">${m.b} thùng</b>. Kho có bao nhiêu thùng?`);
      ask(row(boxIcon(), '1 dãy', `<b>${m.b} thùng</b>`) + row(boxIcon(), `${m.a} dãy`, Q, true), 'thùng', (v, pad) => {
        if (v !== m.N) {
          pad.lock('g3g-keypad-bad');
          return failWith(`Sai số thùng rồi ${n.you} ơi.`, `${m.a} dãy, mỗi dãy ${m.b} thùng: kho có <b>${m.N} thùng</b>.`, `${m.b} × ${m.a} = ${m.N}`);
        }
        pad.lock('g3g-keypad-ok');
        sfx.ding();
        capEl.innerHTML = `<b>${m.N} thùng</b>`;
        setTimeout(askCount, 600);
      });
    } else if (m.kind === 'less') {
      setStore(m.start, `<b>${m.start} thùng</b>`);
      ghost();
      speak(`Kho có ${m.start} thùng. Sáng nay đã chở đi ${m.d} thùng.`, null,
        `Kho có <b class="g3f-want">${m.start} thùng</b>. Sáng nay đã chở đi <b class="g3f-want">${m.d} thùng</b>.`);
      // d thùng rời kho (bay ra mép phải bãi xe), nhanh dần để không phải chờ lâu.
      const t = moveOut(m.d, [], { gap: Math.max(40, Math.min(160, 2400 / m.d)), minMs: 420, maxMs: 650 });
      capEl.innerHTML = `Còn ${Q} thùng`;
      setTimeout(() => {
        speak(`Kho còn bao nhiêu thùng hả ${n.you}?`, null, `Chở đi <b class="g3f-want">${m.d} thùng</b>. Kho còn bao nhiêu thùng?`);
        ask(row(boxIcon(), 'Có', `<b>${m.start} thùng</b>`) + row(truckIcon(3, 30, 3), 'Đã chở', `<b>${m.d} thùng</b>`)
          + row(boxIcon(), 'Còn', Q, true), 'thùng', (v, pad) => {
          if (v !== m.N) {
            pad.lock('g3g-keypad-bad');
            return failWith(`Sai số thùng còn lại rồi ${n.you} ơi.`, `${m.start} thùng, chở đi ${m.d} thùng: còn <b>${m.N} thùng</b>.`, `${m.start} − ${m.d} = ${m.N}`);
          }
          pad.lock('g3g-keypad-ok');
          sfx.ding();
          capEl.innerHTML = `<b>${m.N} thùng</b>`;
          setTimeout(askCount, 600);
        });
      }, t + 300);
    } else {
      setStore(m.N, `<b>${m.N} ${word}</b>`);
      ghost();
      askCount();
    }

    function failWith(line, text, tip) {
      main.classList.remove('g3t-busy');
      speak(line, 'sad', line);
      api.fail(text, tip);
    }

    // ── Tính số xe / số thùng đầy ─────────────────────────────────────────────────────────────────────
    function askCount() {
      if (crates) {
        speak(`${cap(n.me)} có ${m.N} hộp bánh, mỗi thùng xếp ${k} hộp. Cửa hàng chỉ nhận thùng đầy. Đóng được mấy thùng đầy?`, null,
          `<b class="g3f-want">${m.N} hộp</b> bánh. Đóng được mấy <b class="g3f-want">thùng đầy</b>?`);
        ask(row(packIcon(), 'Có', `<b>${m.N} hộp</b>`) + row(crateIcon(k, 30), '1 thùng', `<b>${k} hộp</b>`)
          + row(crateIcon(k, 30), 'Thùng đầy', Q, true), 'thùng', (b, pad) => { pad.lock(); dispatch(b); });
        return;
      }
      const lead = m.kind === 'trucks' ? `${cap(n.me)} cần chở ${m.N} thùng hàng. ` : '';
      speak(`${lead}Mỗi xe chở ${k} thùng. Phải chở hết thùng, cần mấy xe?`, null,
        `${m.kind === 'trucks' ? `Chở <b class="g3f-want">${m.N} thùng</b>. ` : ''}Mỗi xe <b class="g3f-want">${k} thùng</b>. Cần mấy xe?`);
      ask(row(boxIcon(), 'Có', `<b>${m.N} thùng</b>`) + row(truckIcon(k, 30, k), '1 xe', `<b>${k} thùng</b>`)
        + row(truckIcon(k, 30, 0), 'Cần', Q, true), 'xe', (b, pad) => { pad.lock(); dispatch(b); });
    }

    // ── Kiểm chứng: đưa đúng số xe / thùng bé gõ ra bãi, xếp lần lượt ──────────────────────────────────
    function dispatch(b) {
      if (!b || b > DRAW_MAX) return judge(b, 0);
      main.classList.add('g3t-busy');
      const unitHtml = (i) => (crates ? crateSvg(k, 0) : truckSvg(k, 0, { color: TRUCK_COLORS[(m.color + i) % TRUCK_COLORS.length] }));
      setLot(Array.from({ length: b }, (_, i) =>
        `<button type="button" class="g3t-unit ${crates ? 'g3t-crate' : 'g3t-truck'}" data-u="${i}" aria-label="${crates ? 'Thùng' : 'Xe'} ${i + 1}">${unitHtml(i)}</button>`).join(''), b);
      const units = [...lot.querySelectorAll('.g3t-unit')];
      const loaded = new Set();
      let busy = 0; // số xe đang xếp / đang chạy — chờ xong hết mới kết luận
      let over = false;

      // Xe chạy vào bãi từ bên trái, lần lượt (thùng các-tông thì trượt nhẹ vào chỗ).
      const L = lot.getBoundingClientRect();
      units.forEach((u, i) => {
        const r = u.getBoundingClientRect();
        u.animate(crates
          ? [{ transform: 'translateY(-30px)', opacity: 0 }, { transform: 'none', opacity: 1 }]
          : [{ transform: `translateX(${Math.round(L.left - r.right - 10)}px)` }, { transform: 'none' }],
        { duration: crates ? 320 : 650, delay: i * (b > 12 ? 40 : 110), easing: 'cubic-bezier(.2,.8,.3,1)', fill: 'backwards' });
      });
      const arrive = (b > 12 ? 40 : 110) * b + 650;
      const tap = b <= TAP_MAX;

      const pointNext = () => {
        units.forEach(u => u.classList.remove('g3t-next'));
        if (tap && storeCount > 0) units.find((u, i) => !loaded.has(i))?.classList.add('g3t-next');
      };

      /** Xếp thùng lên xe / hộp vào thùng thứ i. Trả về ms tới khi xong (kể cả xe chạy đi). */
      const load = (i, fast) => {
        const u = units[i];
        loaded.add(i);
        u.classList.add('g3t-loaded');
        const c = Math.min(k, storeCount);
        u.innerHTML = crates ? crateSvg(k, c, { mark: false }) : truckSvg(k, c, { color: TRUCK_COLORS[(m.color + i) % TRUCK_COLORS.length] });
        const targets = [...u.querySelectorAll('.g3t-bx')];
        const left = storeCount - c;
        const land = c ? moveOut(c, targets, fast ? { gap: Math.max(35, Math.min(140, 6000 / (b * k))), minMs: 420, maxMs: 620 } : {},
          left ? `Còn <b>${left} ${word}</b>` : `Hết ${word}`) : 0;
        if (crates) {
          setTimeout(() => u.classList.add(c >= k ? 'g3t-full' : 'g3t-short'), land);
          return land + 200;
        }
        if (!c) { u.classList.add('g3t-empty'); return 0; } // không còn thùng: xe nằm lại bãi
        // Xe xếp xong thì chạy sang phải, ra khỏi bãi (chỗ đỗ còn vạch mờ).
        setTimeout(() => {
          sfx.swish();
          const r = u.getBoundingClientRect(), R = lot.getBoundingClientRect();
          u.classList.remove('g3t-next');
          const go = u.animate([{ transform: 'none' }, { transform: `translateX(${Math.round(R.right - r.left + 12)}px)` }],
            { duration: 900, easing: 'cubic-bezier(.5,0,.8,.6)', fill: 'forwards' });
          go.finished.then(() => { u.style.visibility = 'hidden'; }, () => {});
        }, land + 250);
        return land + 250 + 900;
      };

      const finishIfDone = () => {
        if (over || busy) return;
        if (storeCount > 0 && loaded.size < b) return; // còn thùng và còn xe chưa xếp
        over = true;
        units.forEach((u, i) => { u.classList.remove('g3t-next'); if (!loaded.has(i)) u.classList.add(crates ? 'g3t-short' : 'g3t-empty'); });
        setTimeout(() => judge(b, storeCount), 350);
      };

      if (tap) {
        setTimeout(() => {
          pointNext();
          speak(crates ? `Bấm vào từng thùng để xếp hộp bánh!` : `Bấm vào từng xe để xếp thùng lên xe!`, null,
            crates ? 'Bấm vào từng thùng để xếp hộp!' : 'Bấm vào từng xe để xếp thùng!');
        }, arrive);
        lot.addEventListener('click', (e) => {
          const u = e.target.closest('[data-u]');
          const i = Number(u?.dataset.u);
          if (!u || over || loaded.has(i) || storeCount === 0) return;
          busy++;
          const t = load(i, false);
          pointNext();
          setTimeout(() => { busy--; finishIfDone(); }, t);
        });
      } else {
        // Nhiều xe: máy xếp lần lượt từng xe (nhanh dần để cả lượt không quá ~12 giây).
        const step = Math.max(350, Math.min(1400, 11000 / b));
        let i = 0;
        const tick = () => {
          if (i >= b || storeCount === 0) { finishIfDone(); return; }
          busy++;
          const t = load(i++, true);
          setTimeout(() => { busy--; finishIfDone(); }, t);
          setTimeout(tick, step);
        };
        setTimeout(tick, arrive);
      }
    }

    function judge(b, left) {
      if (b === need) { main.classList.remove('g3t-busy'); thanks(); return; }
      if (b > need && b <= DRAW_MAX) {
        // Chỗ sai nằm ở bãi (xe chạy không / thùng chưa đầy): xe đã chạy đi thì dọn khỏi bãi để xe / thùng
        // bị đánh dấu to ra giữa bãi, thẻ kết quả nằm sang phía kho cho khỏi che.
        const gone = [...lot.querySelectorAll('.g3t-unit')].filter(u => u.style.visibility === 'hidden');
        gone.forEach(u => { u.style.display = 'none'; });
        if (gone.length) { lotCount = b - gone.length; fit(); }
        main.classList.add('g3t-card-store');
      }
      const answer = crates
        ? `${m.N} hộp, mỗi thùng ${k} hộp: đóng được <b>${m.q} thùng đầy</b>${m.r ? `, còn ${m.r} hộp lẻ` : ''}.`
        : `${m.N} thùng, mỗi xe chở ${k} thùng: cần <b>${need} xe</b>.`;
      if (crates) {
        if (b > need) {
          const lastPacks = Math.max(0, m.N - (b - 1) * k);
          return failWith(lastPacks ? 'Thùng cuối chưa đầy mà!' : 'Có thùng trống không kìa!', answer,
            m.r && b === need + 1
              ? `Thùng cuối chỉ có ${m.r} hộp, chưa đầy nên không tính. ${formula}.`
              : formula);
        }
        return failWith(`Còn ${left || m.N - b * k} hộp, đủ đóng thêm thùng nữa!`, answer,
          `Còn từ ${k} hộp trở lên thì đóng thêm được 1 thùng đầy. ${formula}.`);
      }
      if (b < need) {
        return failWith(`Còn ${left || m.N - b * k} thùng chưa có xe chở kìa!`, answer,
          m.r && b === m.q
            ? `Còn ${m.r} thùng lẻ cũng phải chở, nên cần thêm 1 xe: ${formula}.`
            : `${formula}.`);
      }
      return failWith(`Thừa ${b - need} xe chạy không rồi!`, answer, `${formula}.`);
    }
  },
};
