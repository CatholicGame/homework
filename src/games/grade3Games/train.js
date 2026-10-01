/**
 * 🚆 Chuyến tàu Bắc – Nam — thiết kế: docs/lop_3/thiet-ke-tro-choi-tap1.md §4.7 (Xe buýt lên xuống, số đến 1 000).
 * Số khách tới hàng trăm nên dùng đoàn tàu: mỗi toa 100 ghế (10 hàng × 10 ghế, một hàng là một chục), tối đa 10 toa.
 * Khách trên sân ga đứng theo nhóm trăm – chục – đơn vị, lên / xuống tàu theo từng nhóm: bé thấy 347 người là
 * 3 nhóm trăm, 4 nhóm chục, 7 người. Bảng đếm trên đầu máy chạy theo từng người ngồi xuống / đứng dậy.
 * Bé gõ số vào máy tính TRƯỚC, rồi tự bấm nút cho khách lên, xuống (hoặc tua lại) — đó là phần kiểm chứng.
 *   addsub: tàu có a người, ga này lên / xuống k người → tàu có bao nhiêu người? (Bài 2)
 *   find:   tìm thành phần (Bài 3) — mấy người xuống (số trừ), mấy người lên (số hạng), lúc đầu tàu có bao nhiêu
 *           người (số hạng / số bị trừ; nút ⏪ Tua lại cho khách quay về như lúc trước ga)
 *   chain:  qua 2 ga, mỗi ga có người xuống rồi có người lên → bé tính sau mỗi ga (Bài 2 + 3)
 * Dùng khung quầy của Chợ phiên (market/stall.js: bác lái tàu + máy tính + thẻ kết quả), theme 'train'.
 */

import {
  carSvg, locoSvg, groupSvg, groupSize, flyGroup, stationSignSvg, trainIcon,
  CAR_W, CAR_H, LOCO_W, PER_CAR, CARS,
} from './art/train.js';
import { WORKER_NPCS, NPCS, cap } from './npc.js';
import { mountStall, Q } from './market/stall.js';
import { stallMeta, levelMeta } from './catalog.js';
import { makeRng } from './loop.js';
import { flyOne, calmMotion } from './fly.js';
import { sfx } from '../preschool/fx.js';

const MINUS = '−';
const DRIVER = { ...WORKER_NPCS.find(n => n.id === 'taixe'), id: 'laitau', name: 'Bác Ba lái tàu' };
// Người giao nhiệm vụ ở màn giới thiệu cấp 1, 2, 3; trong màn chơi luôn là bác lái tàu.
const INTRO_NPCS = [DRIVER, NPCS.find(n => n.id === 'chi'), NPCS.find(n => n.id === 'ong')];
const STATIONS = ['Ga Hà Nội', 'Ga Nam Định', 'Ga Thanh Hóa', 'Ga Vinh', 'Ga Đồng Hới', 'Ga Huế', 'Ga Đà Nẵng', 'Ga Quảng Ngãi', 'Ga Diêu Trì', 'Ga Nha Trang', 'Ga Tháp Chàm', 'Ga Sài Gòn'];
const WANT = (t) => `<b class="g3f-want">${t}</b>`;
const CAP_ALL = CARS * PER_CAR;

export const TRAIN_LEVELS = [
  {
    ...levelMeta('train-1'), missions: 5, kind: 'addsub',
    knowledge: 'phép cộng, phép trừ trong phạm vi 1 000',
    ask: (n) => `Tàu chở rất nhiều khách. ${cap(n.you)} đếm giúp ${n.me} xem trên tàu có bao nhiêu người!`,
    desc: 'Tàu có 345 người, ga này lên 128 người: 345 + 128 = 473 người. Lên tàu là thêm, xuống tàu là bớt.',
    how: [['🧮', 'Gõ số người'], ['🚪', 'Mở cửa'], ['train', 'Tàu chạy']],
  },
  {
    ...levelMeta('train-2'), missions: 5, kind: 'find',
    knowledge: 'tìm số hạng, tìm số bị trừ, tìm số trừ',
    ask: (n) => `Bảng đếm cho biết lúc đầu, lúc sau. ${cap(n.you)} tìm giúp ${n.me} số người lên, xuống!`,
    desc: 'Tàu có 520 người, tới ga còn 385 người: 520 − 385 = 135 người đã xuống. Tìm lúc đầu thì tua lại để kiểm tra.',
    how: [['🧮', 'Gõ số người'], ['🚪', 'Mở cửa / ⏪ Tua lại'], ['train', 'Tàu chạy']],
  },
  {
    ...levelMeta('train-3'), missions: 4, kind: 'chain',
    knowledge: 'phép cộng, phép trừ trong phạm vi 1 000',
    ask: (n) => `Tàu đi qua nhiều ga. Ga nào cũng có người xuống, người lên. ${cap(n.you)} tính sau mỗi ga!`,
    desc: 'Tàu có 460 người. Ga Vinh: xuống 125 người, lên 90 người: 460 − 125 + 90 = 425 người.',
    how: [['🧮', 'Gõ số người'], ['🚪', 'Mở cửa'], ['🚉', 'Ga tiếp theo']],
  },
];

// ── Sinh nhiệm vụ ───────────────────────────────────────────────────────────────────────────────
const lastOf = (h) => h[h.length - 1];
const digits = (n) => [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];
/** Có nhớ (cộng) / có mượn (trừ) ở hàng đơn vị hoặc hàng chục. */
function carries(a, k, dir) {
  const [, at, au] = digits(a), [, kt, ku] = digits(k);
  if (dir > 0) return au + ku >= 10 || at + kt + (au + ku >= 10 ? 1 : 0) >= 10;
  return au < ku || at - (au < ku ? 1 : 0) < kt;
}
/** k người lên / xuống: số có hai hoặc ba chữ số, phần lớn có nhớ. */
function pickK(rng, a, dir, { lo = 12, room } = {}) {
  const max = dir > 0 ? Math.min(room ?? CAP_ALL - a, 480) : Math.min(a - 30, 480);
  if (max < lo) return null;
  const want = rng() < 0.7;
  for (let t = 0; t < 40; t++) {
    const k = rng() < 0.4 ? rng.int(lo, Math.min(99, max)) : rng.int(Math.min(100, max), max);
    if (k >= lo && k <= max && carries(a, k, dir) === want) return k;
  }
  return rng.int(lo, max);
}

function makeAddSub(rng, h) {
  const dir = lastOf(h) ? -lastOf(h).dir : rng.pick([1, -1]);
  let a, k;
  do {
    a = dir > 0 ? rng.int(105, 760) : rng.int(260, 980);
    k = pickK(rng, a, dir);
  } while (k == null || h.some(x => x.a === a) || a + dir * k > CAP_ALL);
  return { dir, a, k, ans: a + dir * k };
}

/**
 * Bốn kiểu tìm thành phần (đúng tên trong Bài 3), mỗi ván đủ cả bốn (lượt thứ 5 chọn lại một kiểu):
 *   down      a − ? = c   (số trừ = số bị trừ − hiệu)
 *   up        a + ? = c   (số hạng = tổng − số hạng kia) — trên sân ga có thêm người chờ tàu khác
 *   startUp   ? + k = c   (số hạng = tổng − số hạng kia) — tua lại: k người xuống lại sân ga
 *   startDown ? − k = c   (số bị trừ = hiệu + số trừ)    — tua lại: k người lên lại tàu
 */
const FIND = ['down', 'up', 'startUp', 'startDown'];
function makeFind(rng, h) {
  const order = h[0]?.order || rng.shuffle(FIND);
  const v = h.length < 4 ? order[h.length] : rng.pick(FIND.filter(x => x !== lastOf(h)?.v));
  const dir = v === 'down' || v === 'startDown' ? -1 : 1;
  let a, k;
  do {
    a = dir > 0 ? rng.int(105, 760) : rng.int(260, 980);
    k = pickK(rng, a, dir);
  } while (k == null || h.some(x => x.a === a));
  const c = a + dir * k;
  const ans = v === 'down' || v === 'up' ? k : a;
  // Người chờ tàu khác (kiểu up): thêm một hai nhóm chục và vài người — bé không đếm sân ga ra đáp số.
  const extra = v === 'up' ? rng.int(1, 2) * 10 + rng.int(2, 6) : 0;
  return { v, order, dir, a, k, c, ans, extra };
}

function makeChain(rng, h) {
  for (;;) {
    const a = rng.int(220, 720);
    let cur = a;
    const legs = [];
    for (let s = 0; s < 2; s++) {
      const x = pickK(rng, cur, -1, { lo: 15 });
      if (x == null) break;
      const mid = cur - x;
      const y = pickK(rng, mid, 1, { lo: 15, room: CAP_ALL - mid });
      if (y == null) break;
      legs.push({ x, y, from: cur, ans: mid + y });
      cur = mid + y;
    }
    if (legs.length === 2 && !h.some(m => m.a === a)) return { a, legs, ans: cur };
  }
}

const MAKERS = { addsub: makeAddSub, find: makeFind, chain: makeChain };

/** Các nhóm trăm – chục – đơn vị của n người: [{ type: 'h' | 't' | 'o', size }]. */
const groupsOf = (n) => {
  const [h, t, o] = digits(n);
  return [...Array(h).fill('h'), ...Array(t).fill('t'), ...Array(o).fill('o')].map(type => ({ type, size: { h: 100, t: 10, o: 1 }[type] }));
};

// ── Trò chơi ────────────────────────────────────────────────────────────────────────────────────
export const TRAIN_GAME = {
  ...stallMeta('train'),
  unitWord: 'chuyến',
  npcs: INTRO_NPCS,
  levels: TRAIN_LEVELS,
  stallIcon: () => trainIcon(64),
  summaryText: (ok, total) => `Em đã đếm đúng khách <strong>${ok}/${total}</strong> chuyến tàu.`,

  howTo(level) {
    const pic = (p) => (p === 'train' ? trainIcon(64) : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '😊', label: 'Bác vui' }];
  },

  makeMission(rng, level, history) {
    const m = MAKERS[level.kind](rng, history);
    const used = history.flatMap(x => x.stops);
    const n = level.kind === 'chain' ? 2 : 1;
    const fresh = rng.shuffle(STATIONS.filter(s => !used.slice(-4).includes(s)));
    return { ...m, kind: level.kind, stops: fresh.slice(0, n), npc: DRIVER, seed: rng.int(1, 1e9) };
  },

  mountMission(stage, m, level, api) {
    injectTrainStyles();
    const n = m.npc;
    const rewind = m.kind === 'find' && (m.v === 'startUp' || m.v === 'startDown');
    const signHtml = (stop, i) => `<span class="g3n-sign-pic">🚉</span><span><strong>${stop}</strong><br>${m.kind === 'chain' ? `Ga thứ ${i + 1} / ${m.stops.length}` : 'Tàu Bắc – Nam'}</span>`;

    const { counter, main, speak, row, ask, nudge } = mountStall(stage, {
      npc: n, api, theme: 'train', cameo: false, // chỗ sai hiện ngay trên tàu: bác không nhảy xuống đứng che tàu
      sign: signHtml(m.stops[0], 0),
      counter: `
        <div class="g3n-bench">
          <div class="g3n-view"><svg class="g3n-svg" xmlns="http://www.w3.org/2000/svg"></svg></div>
          <button type="button" class="g3n-act" data-act="go"></button>
        </div>`,
    });
    const scene = stage.querySelector('.g3f-scene');
    const bench = counter.querySelector('.g3n-bench');
    const view = counter.querySelector('.g3n-view');
    const svg = counter.querySelector('.g3n-svg');
    const actBtn = counter.querySelector('[data-act="go"]');
    const signEl = scene.querySelector('.g3f-sign');

    // ── Trạng thái ──
    // occ: số ghế có người (ngồi liền từ ghế 0). Mỗi chặng (leg) có các vùng trên sân ga:
    //   zone = { key, label, groups: [{ type, size, here }] } — here: nhóm đang đứng ở sân ga.
    const legs = m.kind === 'chain'
      ? m.legs.map(l => ({ start: l.from, down: l.x, up: l.y, ans: l.ans }))
      : [{
        start: rewind ? m.c : m.a,
        down: m.dir < 0 && !rewind ? m.k : m.v === 'startUp' ? m.k : 0,
        up: m.dir > 0 && !rewind ? m.k : m.v === 'startDown' ? m.k : 0,
        ans: m.ans,
      }];
    const st = { leg: 0, occ: legs[0].start, shown: legs[0].start, guess: null, busy: false, over: false, marks: {}, rewinding: false, caption: '' };
    const maxOcc = Math.max(...legs.flatMap(l => [l.start, l.start - l.down, l.start - l.down + l.up]), m.kind === 'find' ? m.a : 0);
    const nCars = Math.min(CARS, Math.max(2, Math.ceil(maxOcc / PER_CAR) + 1));
    let zones = [];
    function setupZones() {
      const L = legs[st.leg];
      zones = [];
      if (L.up) {
        // Kiểu up: các nhóm của k người + nhóm người chờ tàu khác (giữ nguyên nhóm, không gộp lại thành số mới).
        const ORDER = { h: 0, t: 1, o: 2 };
        const crowd = [...groupsOf(L.up), ...(m.v === 'up' ? groupsOf(m.extra) : [])].sort((x, y) => ORDER[x.type] - ORDER[y.type]);
        zones.push({ key: 'up', label: m.v === 'startDown' ? 'Vừa xuống tàu' : 'Chờ lên tàu', groups: crowd.map(g => ({ ...g, here: true })) });
      }
      if (L.down) zones.push({ key: 'down', label: m.v === 'startUp' ? 'Vừa lên tàu' : 'Xuống tàu', groups: groupsOf(L.down).map(g => ({ ...g, here: false })) });
    }
    setupZones();
    const tone = makeRng(m.seed);
    zones.forEach(z => z.groups.forEach(g => { g.tone = tone.int(0, 900); }));
    const retone = () => zones.forEach(z => z.groups.forEach(g => { g.tone = tone.int(0, 900); }));

    // ── Bố cục: tàu (đầu máy + các toa theo hàng) và sân ga bên dưới hoặc bên phải; lấy cách cho hình to nhất ──
    const GAP = 8, ROW_GAP = 10, ZGAP = 14, ZPAD = 8, LABEL_H = 13, SIGN_W = 26;
    /** Xếp các nhóm của một vùng trong bề rộng maxW: các thảm trăm, các cột chục (≤ 5 hàng), lưới người lẻ (5 một hàng). */
    function flow(groups, maxW) {
      const blocks = [];
      const hs = groups.filter(g => g.type === 'h'), ts = groups.filter(g => g.type === 't'), os = groups.filter(g => g.type === 'o');
      const [hw, hh] = groupSize('h'), [tw, th] = groupSize('t'), [ow] = groupSize('o');
      hs.forEach(g => blocks.push({ w: hw, h: hh, items: [{ g, x: 0, y: 0 }] }));
      for (let i = 0; i < ts.length; i += 5) {
        const part = ts.slice(i, i + 5);
        blocks.push({ w: tw, h: part.length * (th + 2) - 2, items: part.map((g, j) => ({ g, x: 0, y: j * (th + 2) })) });
      }
      if (os.length) {
        const cols = Math.min(5, os.length), rows = Math.ceil(os.length / 5);
        blocks.push({ w: cols * (ow + 2) - 2, h: rows * (ow + 2) - 2, items: os.map((g, j) => ({ g, x: (j % 5) * (ow + 2), y: Math.floor(j / 5) * (ow + 2) })) });
      }
      let x = 0, y = 0, lineH = 0, W = 0;
      const pos = new Map();
      for (const b of blocks) {
        if (x > 0 && x + b.w > maxW) { x = 0; y += lineH + 6; lineH = 0; }
        b.items.forEach(it => pos.set(it.g, { x: x + it.x, y: y + it.y }));
        x += b.w + 6;
        W = Math.max(W, x - 6);
        lineH = Math.max(lineH, b.h);
      }
      return { pos, w: Math.max(W, 40), h: y + lineH };
    }
    /** Cả sân ga trong bề rộng maxW: các vùng cạnh nhau nếu vừa, không thì xếp chồng. */
    function platform(maxW) {
      const inner = maxW - SIGN_W - ZPAD * 2;
      const fl = zones.map(z => flow(z.groups, Math.max(60, inner)));
      const sideW = fl.reduce((s, f) => s + f.w, 0) + ZGAP * Math.max(0, fl.length - 1);
      const side = sideW <= inner;
      let x = SIGN_W + ZPAD, y = ZPAD;
      const places = fl.map((f) => {
        const p = { x, y: y + LABEL_H, f };
        if (side) x += f.w + ZGAP; else y += LABEL_H + f.h + 10;
        return p;
      });
      const h = side ? ZPAD + LABEL_H + Math.max(0, ...fl.map(f => f.h)) + ZPAD : y - 10 + ZPAD;
      const w = side ? x - ZGAP + ZPAD : SIGN_W + ZPAD + Math.max(...fl.map(f => f.w)) + ZPAD;
      return { places, w: Math.max(w, 120), h: Math.max(h, 56) };
    }
    function layouts() {
      const out = [];
      for (let cols = 1; cols <= nCars; cols++) {
        const rows = Math.ceil(nCars / cols);
        const tw = LOCO_W + GAP + cols * (CAR_W + GAP) - GAP;
        const th = rows * (CAR_H + ROW_GAP) - ROW_GAP;
        const below = platform(tw);
        out.push({ cols, rows, tw, th, side: false, plat: below, W: tw, H: th + 14 + below.h });
        for (const pw of [130, 180, 240]) {
          const p = platform(pw);
          out.push({ cols, rows, tw, th, side: true, plat: p, W: tw + 14 + p.w, H: Math.max(th, p.h) });
        }
      }
      return out;
    }
    let L = null;
    function pickLayout() {
      const cw = view.clientWidth, ch = view.clientHeight;
      if (!cw || !ch) return null;
      let best = null;
      for (const o of layouts()) {
        const s = Math.min(cw / (o.W + 12), ch / (o.H + 12));
        if (!best || s > best.s + 0.01) best = { ...o, s };
      }
      return best;
    }
    const carPos = (k) => ({ x: LOCO_W + GAP + (k % L.cols) * (CAR_W + GAP), y: Math.floor(k / L.cols) * (CAR_H + ROW_GAP) });
    const platPos = () => (L.side ? { x: L.tw + 14, y: Math.max(0, (L.H - L.plat.h) / 2) } : { x: 0, y: L.th + 14 });

    function render() {
      L = pickLayout();
      if (!L) return;
      const on = (g) => g < st.occ;
      const mark = (g) => st.marks[g] || '';
      let s = '<g class="g3n-drive">';
      // Đường ray dưới mỗi hàng toa.
      for (let r = 0; r < L.rows; r++) {
        const y = r * (CAR_H + ROW_GAP) + CAR_H - 13;
        s += `<rect x="-4" y="${y - 2}" width="${L.tw + 8}" height="4" rx="2" fill="#A8A29E"/>`;
      }
      s += locoSvg({ count: st.shown == null ? '?' : st.shown });
      for (let k = 0; k < nCars; k++) {
        const p = carPos(k);
        s += `<g transform="translate(${p.x},${p.y})">${carSvg(k, { on, mark, seed: m.seed, color: k % 2 ? '#7BCB8B' : '#6CCFB5' })}</g>`;
      }
      s += '</g>';
      // Sân ga.
      const pp = platPos(), P = L.plat;
      s += `<g class="g3n-plat" transform="translate(${pp.x},${pp.y})">`
        + `<rect width="${P.w}" height="${P.h}" rx="7" fill="#E7E5E4" stroke="#A8A29E" stroke-width="1.5"/>`
        + `<rect x="3" y="3" width="${P.w - 6}" height="4" rx="2" fill="#FACC15"/>`
        + stationSignSvg(SIGN_W / 2 + 4, 12, Math.min(P.h - 18, 60));
      zones.forEach((z, zi) => {
        const pl = P.places[zi];
        s += `<text class="g3n-zone-label" x="${pl.x}" y="${pl.y - 4}">${z.key === 'up' ? '🙋' : '🚶'} ${z.label}</text>`;
        z.groups.forEach((g, gi) => {
          const q = pl.f.pos.get(g);
          const [w, h] = groupSize(g.type);
          // Chỗ trống chờ khách xuống: viền mờ (trừ khi số người xuống là điều bé phải tìm).
          const hole = !g.here && z.key === 'down' && m.v !== 'down' ? `<rect class="g3n-hole" x="${pl.x + q.x}" y="${pl.y + q.y}" width="${w}" height="${h}" rx="${g.type === 'o' ? w / 2 : 3}"/>` : '';
          s += `<g class="g3n-grp${g.here ? '' : ' g3n-grp-empty'}" data-z="${zi}" data-g="${gi}">${g.here ? groupSvg(g.type, pl.x + q.x, pl.y + q.y, g.tone) : hole}`
            + `<rect class="g3n-slot" x="${pl.x + q.x}" y="${pl.y + q.y}" width="${w}" height="${h}" fill="none"/></g>`;
        });
      });
      if (st.caption) s += `<text class="g3n-caption" x="${P.w - 8}" y="${P.h - 7}" text-anchor="end">${st.caption}</text>`;
      s += '</g>';
      svg.setAttribute('viewBox', `-6 -6 ${L.W + 12} ${L.H + 12}`);
      svg.style.width = `${Math.floor((L.W + 12) * L.s)}px`;
      svg.style.height = `${Math.floor((L.H + 12) * L.s)}px`;
      svg.innerHTML = s;
    }

    if (import.meta.env.DEV) window.__g3train = { m, st, legs, get zones() { return zones; } };
    let pending = false;
    const obs = new ResizeObserver(() => {
      if (!bench.isConnected) return obs.disconnect();
      if (st.busy) { pending = true; return; }
      render();
    });
    obs.observe(view);

    // ── Bảng đếm, ghế, nhóm khách ──
    const seatEl = (g) => svg.querySelector(`[data-s="${g}"]`);
    const grpEl = (zi, gi) => svg.querySelector(`[data-z="${zi}"][data-g="${gi}"]`);
    const slotRect = (el) => el?.querySelector('.g3n-slot')?.getBoundingClientRect();
    /** Khung màn hình của các ghế [g0, g1) — phần nằm trong toa có nhiều ghế nhất. */
    function seatsRect(g0, g1) {
      const byCar = {};
      for (let g = g0; g < g1; g++) (byCar[Math.floor(g / PER_CAR)] ||= []).push(g);
      const list = Object.values(byCar).sort((a, b) => b.length - a.length)[0] || [g0];
      let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
      for (const g of [list[0], list[list.length - 1], ...list.filter(x => x % 10 === 0 || x % 10 === 9)]) {
        const rc = seatEl(g)?.querySelector('rect')?.getBoundingClientRect();
        if (!rc) continue;
        l = Math.min(l, rc.left); t = Math.min(t, rc.top); r = Math.max(r, rc.right); b = Math.max(b, rc.bottom);
      }
      return l === Infinity ? null : { left: l, top: t, width: r - l, height: b - t };
    }
    /** Lần lượt bật (on) hoặc tắt các ghế [g0, g1) trong ms; bảng đếm chạy theo. dir: +1 ngồi xuống, −1 đứng dậy. */
    function sweep(g0, g1, ms, dir, done) {
      const total = g1 - g0, base = st.shown;
      const el = svg.querySelector('.g3n-count');
      const t0 = performance.now();
      let k = 0;
      const step = (now) => {
        const want = Math.min(total, Math.ceil(((now - t0) / ms) * total));
        while (k < want) {
          seatEl(dir > 0 ? g0 + k : g1 - 1 - k)?.classList.toggle('g3n-on', dir > 0);
          k++;
        }
        if (el) el.textContent = base + dir * k;
        if (k < total) requestAnimationFrame(step);
        else { st.shown = base + dir * total; done?.(); }
      };
      requestAnimationFrame(step);
    }
    const FILL = { h: 520, t: 220, o: 60 };
    const FLY = { h: [560, 760], t: [420, 620], o: [360, 520] };

    /** Các nhóm của vùng `key` lên tàu (chỉ `count` người đầu, theo trăm – chục – đơn vị). Gọi done khi xong. */
    function boardZone(key, count, done) {
      const zi = zones.findIndex(z => z.key === key);
      const z = zones[zi];
      const want = groupsOf(count).map(g => g.type);
      const picks = [];
      for (const type of want) {
        const gi = z.groups.findIndex((g, i) => g.type === type && g.here && !picks.includes(i));
        picks.push(gi);
      }
      const nH = want.filter(t => t === 'h').length;
      const gapOf = (type) => (type === 'h' ? Math.max(420, 700 - nH * 30) : type === 't' ? 340 : 240);
      let at = 250, end = 0;
      picks.forEach((gi) => {
        const g = z.groups[gi];
        const g0 = st.occ, g1 = st.occ + g.size;
        st.occ = g1;
        const el = grpEl(zi, gi);
        const from = slotRect(el);
        const delay = at;
        setTimeout(() => { g.here = false; el?.classList.add('g3n-grp-empty'); el?.querySelectorAll(':scope > :not(.g3n-slot)').forEach(x => x.remove()); sfx.tap(); }, delay);
        const land = flyOne(flyGroup(g.type, g.tone), from, seatsRect(g0, g1), {
          delay, minMs: FLY[g.type][0], maxMs: FLY[g.type][1],
          onLand: () => { sfx.pop(Math.min(8, g.size === 1 ? 2 : g.size === 10 ? 4 : 7)); queueSweep(g0, g1, FILL[g.type], 1); },
        });
        end = Math.max(end, land + FILL[g.type]);
        at += gapOf(g.type);
      });
      setTimeout(done, end + 500);
    }
    // Các lượt bật ghế chạy nối tiếp (bảng đếm cộng dồn đúng thứ tự dù nhóm sau bay tới sớm).
    let sweepQ = Promise.resolve();
    function queueSweep(g0, g1, ms, dir) {
      sweepQ = sweepQ.then(() => new Promise(res => sweep(g0, g1, ms, dir, res)));
    }

    /** Khách ngồi cuối đứng dậy theo nhóm (trăm → chục → đơn vị của `count`) và xuống đứng vào vùng `key`. */
    function alightZone(key, count, done) {
      const zi = zones.findIndex(z => z.key === key);
      const z = zones[zi];
      let at = 250, end = 0;
      const nH = z.groups.filter(g => g.type === 'h').length;
      z.groups.forEach((g, gi) => {
        const g1 = st.occ, g0 = st.occ - g.size;
        st.occ = g0;
        const delay = at;
        const fill = FILL[g.type];
        setTimeout(() => {
          const from = seatsRect(g0, g1);
          queueSweep(g0, g1, fill, -1);
          sfx.tap();
          flyOne(flyGroup(g.type, g.tone), from, slotRect(grpEl(zi, gi)), {
            delay: fill, minMs: FLY[g.type][0], maxMs: FLY[g.type][1],
            onLand: () => {
              g.here = true;
              const el = grpEl(zi, gi);
              const r = el?.querySelector('.g3n-slot');
              if (el && r) {
                el.classList.remove('g3n-grp-empty');
                el.querySelector('.g3n-hole')?.remove();
                el.insertAdjacentHTML('afterbegin', groupSvg(g.type, +r.getAttribute('x'), +r.getAttribute('y'), g.tone));
              }
              sfx.pop(Math.min(8, g.size === 1 ? 2 : g.size === 10 ? 4 : 7));
            },
          });
        }, delay);
        end = Math.max(end, delay + fill + FLY[g.type][1]);
        at += g.type === 'h' ? Math.max(480, 760 - nH * 30) : g.type === 't' ? 380 : 260;
      });
      setTimeout(done, end + 500);
      return count;
    }

    // ── Lời bác lái tàu, hoá đơn ──
    const P = (x) => `<b>${x} người</b>`;
    function intro() {
      const at = `Tới ${m.stops[st.leg]}`;
      if (m.kind === 'addsub') {
        const up = m.dir > 0;
        speak(`Tàu đang có ${m.a} người. ${at}, có ${m.k} người ${up ? 'lên' : 'xuống'} tàu. Bây giờ tàu có bao nhiêu người?`, null,
          `Tàu có ${WANT(`${m.a} người`)}. ${up ? 'Lên' : 'Xuống'} ${WANT(`${m.k} người`)}. Tàu có bao nhiêu người?`);
        return row('🚆', 'Trên tàu', P(m.a)) + row(up ? '🙋' : '🚶', up ? 'Lên' : 'Xuống', P(m.k)) + row('🚆', 'Bây giờ', Q, true);
      }
      if (m.kind === 'chain') {
        const L0 = legs[st.leg];
        const first = st.leg === 0;
        speak(`${first ? `Tàu đang có ${L0.start} người. ` : ''}${at}, có ${L0.down} người xuống tàu, rồi ${L0.up} người lên tàu. Rời ga, tàu có bao nhiêu người?`, null,
          `${first ? `Tàu có ${WANT(`${L0.start} người`)}. ` : ''}Xuống ${WANT(`${L0.down} người`)}, lên ${WANT(`${L0.up} người`)}. Tàu có bao nhiêu người?`);
        return row('🚆', 'Trên tàu', P(L0.start)) + row('🚶', 'Xuống', P(L0.down)) + row('🙋', 'Lên', P(L0.up)) + row('🚆', 'Rời ga', Q, true);
      }
      // find
      if (m.v === 'down') {
        speak(`Tàu có ${m.a} người. ${at}, tàu còn ${m.c} người. Có bao nhiêu người đã xuống tàu?`, null,
          `Tàu có ${WANT(`${m.a} người`)}, còn ${WANT(`${m.c} người`)}. Mấy người xuống?`);
        return row('🚆', 'Lúc đầu', P(m.a)) + row('🚆', 'Còn lại', P(m.c)) + row('🚶', 'Đã xuống', Q, true);
      }
      if (m.v === 'up') {
        speak(`Tàu có ${m.a} người. Bác chờ tàu có đủ ${m.c} người mới chạy. Cần bao nhiêu người nữa lên tàu?`, null,
          `Tàu có ${WANT(`${m.a} người`)}. Cần đủ ${WANT(`${m.c} người`)}. Mấy người nữa lên?`);
        return row('🚆', 'Đang có', P(m.a)) + row('🚆', 'Cần đủ', P(m.c)) + row('🙋', 'Lên thêm', Q, true);
      }
      if (m.v === 'startUp') {
        speak(`Ở ${m.stops[0]} vừa có ${m.k} người lên tàu. Bây giờ tàu có ${m.c} người. Lúc trước khi tới ga, tàu có bao nhiêu người?`, null,
          `Vừa lên ${WANT(`${m.k} người`)}. Bây giờ ${WANT(`${m.c} người`)}. Lúc đầu tàu có bao nhiêu người?`);
        return row('🚆', 'Lúc đầu', Q, true) + row('🙋', 'Đã lên', P(m.k)) + row('🚆', 'Bây giờ', P(m.c));
      }
      speak(`Ở ${m.stops[0]} vừa có ${m.k} người xuống tàu. Bây giờ tàu còn ${m.c} người. Lúc trước khi tới ga, tàu có bao nhiêu người?`, null,
        `Vừa xuống ${WANT(`${m.k} người`)}. Còn ${WANT(`${m.c} người`)}. Lúc đầu tàu có bao nhiêu người?`);
      return row('🚆', 'Lúc đầu', Q, true) + row('🚶', 'Đã xuống', P(m.k)) + row('🚆', 'Còn lại', P(m.c));
    }

    // ── Chơi ──
    const actLabel = () => (rewind ? '⏪ Tua lại' : '🚪 Mở cửa');
    actBtn.textContent = actLabel();
    render();
    function askNow() {
      st.guess = null;
      const bill = intro();
      ask(bill, 'người', (v, pad) => {
        if (st.guess != null) return;
        st.guess = v;
        pad.lock();
        actBtn.classList.add('g3n-act-ready');
        const line = rewind ? 'Bấm Tua lại xem lúc đầu tàu có bao nhiêu người!'
          : m.kind === 'chain' ? 'Bấm Mở cửa cho khách xuống, lên tàu!'
            : m.dir > 0 ? 'Bấm Mở cửa cho khách lên tàu!' : 'Bấm Mở cửa cho khách xuống tàu!';
        speak(line, null, `👉 ${line}`);
      });
    }
    askNow();

    const go = () => {
      if (st.over || st.busy) return;
      if (st.guess == null) {
        speak(`${cap(n.you)} gõ số người vào máy tính trước đã!`, null, 'Gõ số người vào máy tính trước!');
        nudge();
        return;
      }
      st.busy = true;
      actBtn.disabled = true;
      actBtn.classList.remove('g3n-act-ready');
      sfx.tap();
      const Lg = legs[st.leg];
      if (rewind) {
        // Tua lại: hình ngả màu cũ, khách đi ngược — vừa lên thì xuống lại sân ga, vừa xuống thì lên lại tàu.
        st.rewinding = true;
        scene.classList.add('g3n-rewinding');
        sfx.swish();
        const after = () => { scene.classList.remove('g3n-rewinding'); judge(); };
        if (m.v === 'startUp') alightZone('down', m.k, after); else boardZone('up', m.k, after);
        return;
      }
      sfx.swish();
      const thenUp = () => (Lg.up ? boardZone('up', Lg.up, judge) : judge());
      if (Lg.down) alightZone('down', Lg.down, thenUp); else thenUp();
    };
    actBtn.onclick = go;

    // ── Kết luận ──
    function judge() {
      st.busy = false;
      if (pending) pending = false;
      const Lg = legs[st.leg];
      const v = st.guess;
      const ans = m.kind === 'chain' ? Lg.ans : m.ans;
      const ok = v === ans;
      const lastLeg = st.leg === legs.length - 1;
      if (ok && !lastLeg) return nextStation();
      st.over = true;
      if (!ok && (m.kind !== 'find' || rewind)) {
        // Chỗ sai hiện trên tàu: gõ ít hơn → người ngồi từ ghế thứ v+1 có viền đỏ; gõ nhiều hơn → ghế trống bị viền đỏ.
        const lim = nCars * PER_CAR;
        for (let g = Math.min(v, ans); g < Math.min(lim, Math.max(v, ans)); g++) st.marks[g] = v < ans ? 'g3n-over' : 'g3n-miss';
      }
      if (m.kind === 'find' && !rewind) st.caption = m.v === 'down' ? `${m.k} người đã xuống` : `${m.k} người đã lên`;
      render();
      const q = main.closest('.g3f-scene')?.querySelector('.g3f-bill-q .g3f-q');
      if (q) { q.textContent = `${ans} người`; q.classList.add('g3n-bill-ans'); }
      if (ok) return win();
      const line = m.kind === 'find' ? `Ơ, ${n.you} gõ ${v} người, chưa đúng rồi!` : `Trên tàu có ${ans} người, không phải ${v} người!`;
      speak(line, 'sad', line);
      api.fail(`${cap(n.you)} gõ <b>${v}</b>. ${answerText()}`, tipText());
      afterCard();
    }

    /** Đúng ở một ga giữa chặng: tàu chạy sang ga sau, sân ga mới, gõ tiếp. */
    function nextStation() {
      speak('Đúng rồi! Tàu chạy tiếp!', 'happy', 'Đúng rồi! Tàu chạy tiếp! 🚆');
      sfx.ding();
      st.busy = true;
      const drive = svg.querySelector('.g3n-drive');
      const far = (L?.W || 400) + 60;
      const out = drive?.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${-far}px)` }],
        { duration: calmMotion() ? 1300 : 900, delay: 600, easing: 'cubic-bezier(.5,0,.8,.6)', fill: 'forwards' });
      const arrive = () => {
        st.leg++;
        setupZones();
        retone();
        signEl.innerHTML = signHtml(m.stops[st.leg], st.leg);
        render();
        const d2 = svg.querySelector('.g3n-drive');
        d2?.animate([{ transform: `translateX(${far}px)` }, { transform: 'translateX(0)' }],
          { duration: calmMotion() ? 1300 : 900, easing: 'cubic-bezier(.2,.4,.5,1)' });
        setTimeout(() => {
          st.busy = false;
          actBtn.disabled = false;
          askNow();
        }, calmMotion() ? 1300 : 900);
      };
      if (out) out.finished.then(arrive, arrive); else arrive();
    }

    function win() {
      speak(`Đúng rồi! Giỏi quá ${n.you} ơi!`, 'happy', `Đúng rồi! Giỏi quá ${n.you} ơi! 🎉`);
      api.succeed(`${n.name} rất vui! <b>${formula()}</b>`);
      setTimeout(() => {
        sfx.swish();
        const far = (L?.W || 400) + 60;
        svg.querySelector('.g3n-drive')?.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${-far}px)` }],
          { duration: calmMotion() ? 1800 : 1300, easing: 'cubic-bezier(.5,0,.8,.6)', fill: 'forwards' });
      }, 500);
      afterCard();
    }

    /** Thẻ kết quả nằm ở đáy khung: thu hình lên phía trên để vẫn thấy chỗ đúng / sai trên tàu. */
    function afterCard() {
      requestAnimationFrame(() => {
        const card = main.querySelector(':scope > .g3g-result');
        if (!card) return;
        bench.style.paddingBottom = `${card.offsetHeight + 12}px`;
        render();
      });
    }

    function formula() {
      if (m.kind === 'addsub') return `${m.a} ${m.dir > 0 ? '+' : MINUS} ${m.k} = ${m.ans}`;
      if (m.kind === 'chain') return m.legs.map(l => `${l.from} ${MINUS} ${l.x} + ${l.y} = ${l.ans}`).join('; ');
      if (m.v === 'down') return `${m.a} ${MINUS} ${m.c} = ${m.k}`;
      if (m.v === 'up') return `${m.c} ${MINUS} ${m.a} = ${m.k}`;
      if (m.v === 'startUp') return `${m.c} ${MINUS} ${m.k} = ${m.a}`;
      return `${m.c} + ${m.k} = ${m.a}`;
    }
    function answerText() {
      if (m.kind === 'addsub') return `Tàu có ${m.a} người, ${m.dir > 0 ? 'lên' : 'xuống'} ${m.k} người: tàu có <b>${m.ans} người</b>.`;
      if (m.kind === 'chain') {
        const Lg = legs[st.leg];
        return `${m.stops[st.leg]}: ${Lg.start} ${MINUS} ${Lg.down} = ${Lg.start - Lg.down}, ${Lg.start - Lg.down} + ${Lg.up} = <b>${Lg.ans} người</b>.`;
      }
      if (m.v === 'down') return `Lúc đầu ${m.a} người, còn ${m.c} người: <b>${m.k} người</b> đã xuống.`;
      if (m.v === 'up') return `Đang có ${m.a} người, cần đủ ${m.c} người: thêm <b>${m.k} người</b>.`;
      if (m.v === 'startUp') return `Bây giờ ${m.c} người, vừa lên ${m.k} người: lúc đầu tàu có <b>${m.a} người</b>.`;
      return `Còn ${m.c} người, vừa xuống ${m.k} người: lúc đầu tàu có <b>${m.a} người</b>.`;
    }
    function tipText() {
      if (m.kind === 'addsub') return `${m.dir > 0 ? 'Lên tàu là thêm' : 'Xuống tàu là bớt'}: ${formula()}. Đặt tính thẳng cột, tính từ hàng đơn vị, nhớ sang hàng bên trái.`;
      if (m.kind === 'chain') {
        const Lg = legs[st.leg], mid = Lg.start - Lg.down;
        return `Xuống trước: ${Lg.start} ${MINUS} ${Lg.down} = ${mid}. Lên sau: ${mid} + ${Lg.up} = ${Lg.ans}.`;
      }
      if (m.v === 'down') return `${m.a} ${MINUS} ? = ${m.c}. Muốn tìm số trừ, lấy số bị trừ trừ đi hiệu: ${formula()}.`;
      if (m.v === 'up') return `${m.a} + ? = ${m.c}. Muốn tìm số hạng, lấy tổng trừ đi số hạng kia: ${formula()}.`;
      if (m.v === 'startUp') return `? + ${m.k} = ${m.c}. Muốn tìm số hạng, lấy tổng trừ đi số hạng kia: ${formula()}.`;
      return `? ${MINUS} ${m.k} = ${m.c}. Muốn tìm số bị trừ, lấy hiệu cộng với số trừ: ${formula()}.`;
    }
  },
};

/** CSS của trò 🚆 Chuyến tàu (lớp g3n-*). Khung quầy, máy tính, thẻ kết quả dùng chung với Chợ phiên (theme 'train'). */
function injectTrainStyles() {
  if (document.getElementById('g3n-styles')) return;
  const st = document.createElement('style');
  st.id = 'g3n-styles';
  st.textContent = `
    .g3f-theme-train .g3f-awning { background: repeating-linear-gradient(90deg, #F87171 0 16px, #FEE2E2 16px 22px); border-bottom-color: #B91C1C; }
    .g3f-theme-train .g3f-awning::after { display: none; }
    .g3f-theme-train .g3f-counter { background: linear-gradient(#E0F2FE, #F0F9FF 55%, #E7E5E4); border-bottom-color: #78716C; }
    .g3f-theme-train .g3f-sign { background: #2563EB; border-color: #1E3A8A; color: #fff; text-shadow: 0 1px 0 rgba(30,58,138,0.5); }
    .g3f-theme-train .g3f-sign strong { color: #FEF08A; }
    .g3f-theme-train .g3f-main::after { background: rgba(15,23,42,0.06); }
    .g3f-q.g3n-bill-ans { animation: none; background: #16A34A; font-size: 0.9em; padding: 0 0.4em; }
    .g3n-sign-pic { font-size: 1.7em; line-height: 1; }
    .g3n-bench { flex: 1; min-height: 0; width: 100%; display: flex; flex-direction: column; align-items: stretch; gap: 0.5rem; padding-top: clamp(2.8rem, 8vh, 4rem); box-sizing: border-box; }
    .g3n-view { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .g3n-svg { display: block; overflow: visible; user-select: none; -webkit-user-select: none; }
    .g3n-act { align-self: center; flex: none; border: 4px solid #fff; border-radius: 999px; padding: 0.35em 1.3em; background: linear-gradient(180deg, #4ADE80, #16A34A); color: #fff; font: 800 clamp(1.1rem, 2.2vh + 0.6rem, 1.7rem) 'Baloo 2', Quicksand, sans-serif; line-height: 1.15; text-shadow: 0 2px 0 rgba(21,128,61,.5); box-shadow: 0 5px 0 #15803D, 0 8px 18px rgba(21,128,61,.3); cursor: pointer; opacity: .55; touch-action: manipulation; }
    .g3n-act.g3n-act-ready { opacity: 1; animation: g3nBob 1.2s ease-in-out infinite; }
    .g3n-act:disabled { opacity: .35; animation: none; cursor: default; }
    .g3n-act:not(:disabled):active { transform: translateY(3px); box-shadow: 0 2px 0 #15803D; }
    @keyframes g3nBob { 0%, 100% { transform: none; } 50% { transform: translateY(-5px) scale(1.05); } }
    @media (prefers-reduced-motion: reduce) { .g3n-act.g3n-act-ready { animation-duration: 2.4s; } }
    .g3g-has-result .g3n-act { display: none; } /* thẻ kết quả: nhường hết chỗ cho tàu (điện thoại ngang rất thấp) */
    .g3g-has-result .g3n-bench { padding-top: 0.4rem; }
    .g3f-theme-train .g3f-bill-row > b, .g3f-theme-train .g3f-bill-label { white-space: nowrap; }

    .g3n-count { fill: #86EFAC; font: 800 22px 'Courier New', monospace; }
    .g3n-count-cap { fill: #94A3B8; font: 800 7px 'Baloo 2', Quicksand, sans-serif; letter-spacing: .08em; }
    .g3n-car-label { font: 800 8.5px 'Baloo 2', Quicksand, sans-serif; fill: #fff; }
    .g3n-seat > rect { fill: #CBD5E1; stroke: #94A3B8; stroke-width: .6; }
    .g3n-seat .g3n-p { display: none; }
    .g3n-seat.g3n-on .g3n-p { display: inline; }
    .g3n-seat.g3n-on > rect { fill: #E2E8F0; }
    .g3n-over > rect, .g3n-seat.g3n-on.g3n-over > rect { fill: #FEE2E2; stroke: #DC2626; stroke-width: 1.4; }
    .g3n-miss > rect { fill: #FFF1F2; stroke: #DC2626; stroke-width: 1.1; stroke-dasharray: 2 1.2; }
    .g3n-hole { fill: none; stroke: #A8A29E; stroke-width: 1; stroke-dasharray: 3 2; }
    .g3n-zone-label { font: 800 9px 'Baloo 2', Quicksand, sans-serif; fill: #44403C; }
    .g3n-caption { font: 800 11px 'Baloo 2', Quicksand, sans-serif; fill: #15803D; paint-order: stroke; stroke: #fff; stroke-width: 3px; }
    .g3n-rewinding .g3n-svg { filter: sepia(.55) saturate(.8); }
    .g3n-rewinding .g3n-view { position: relative; }
    .g3n-rewinding .g3n-view::after { content: '⏪'; position: absolute; top: 4px; left: 8px; font-size: 1.8rem; animation: g3nBlink 1s steps(2) infinite; }
    @keyframes g3nBlink { 50% { opacity: .25; } }
    @media (max-height: 500px) {
      .g3n-bench { padding-top: 2.4rem; gap: 0.3rem; }
      .g3f-theme-train .g3f-bill-row { font-size: 0.78rem; gap: 0.2rem; }
      .g3f-theme-train .g3f-bill-pic { font-size: 0.9em; }
      .g3n-act { font-size: 1rem; padding: 0.2em 1em; border-width: 3px; }
    }
    @media (orientation: portrait) {
      .g3n-bench { padding-top: 0.2rem; }
      .g3f-theme-train .g3f-sign { display: none; }
      .g3f-theme-train .g3f-bill-row { font-size: 0.86em; } /* số ba chữ số + "người" vừa một dòng trên điện thoại dọc */
    }
  `;
  document.head.appendChild(st);
}
