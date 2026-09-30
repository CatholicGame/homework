/**
 * 🚌 Xe buýt lên xuống — thiết kế: docs/lop_2/thiet-ke-tro-choi.md §4.2.
 * Bé là phụ xe của bác tài. Ghế xếp hàng 10 (xe hai tầng, mỗi tầng 10 ghế) để đếm theo chục.
 * Bé gõ số vào máy tính TRƯỚC, rồi tự bấm nút (Mở cửa / Mở rèm / Ghép cặp) để khách lên, xuống thật: bảng đếm trên
 * xe chạy theo từng người — đó là phần kiểm chứng. App không báo trước lúc đúng.
 *   addsub:  xe có a người, lên / xuống k người → xe có bao nhiêu người? (thêm, bớt — Bài 9)
 *   more:    xe xanh có a người, xe đỏ nhiều hơn / ít hơn d người → xe đỏ có bao nhiêu? Xe đỏ kéo rèm kín (Bài 13)
 *   compare: hai xe a và b người → hơn, kém nhau mấy người? Ghép cặp từng ghế, đếm phần thừa (Bài 4)
 *   find:    xe có a người, còn c người → mấy người xuống? / cần đủ c người → mấy người nữa lên? (Bài 3)
 *   train:   tàu hỏa 5 toa × 20 ghế, lên / xuống có nhớ trong phạm vi 100 (Bài 19–23)
 * Dùng khung quầy của Chợ phiên lớp 3 (market/stall.js: bác tài + máy tính + thẻ kết quả), theme 'bus'.
 */

import {
  busSvg, carSvg, locoSvg, stopSignSvg, standingSvg, seatedSvg, flySeated, flyStanding, busIcon, trainIcon,
  seatXY, BUS_COLORS, SEATS, BUS_W, CAR_W, LOCO_W, VEH_H, MAN_W, MAN_H, WIN_W, WIN_H,
} from './art/bus.js';
import { stallMeta, levelMeta } from './catalog.js';
import { injectBusStyles } from './styles.js';
import { WORKER_NPCS, cap } from '../grade3Games/npc.js';
import imgDriver from '../../assets/grade2-games/bus/driver.webp';
import { mountStall, Q } from '../grade3Games/market/stall.js';
import { makeRng } from '../grade3Games/loop.js';
import { flyOne, calmMotion, svgBoxOnScreen } from '../grade3Games/fly.js';
import { sfx } from '../preschool/fx.js';

const MINUS = '−';
// Bác Ba tài xế xe buýt trường: cùng tên, xưng hô với bác tài lớp 3 nhưng hình riêng (src/assets/school_bus_driver.png
// cắt nền, thu còn 480px cao). Chưa có mặt buồn: 'sad' dùng lại hình thường (vẫn lắc đầu).
const DRIVER = { ...WORKER_NPCS.find(n => n.id === 'taixe'), id: 'taixe-bus', img: imgDriver, sad: imgDriver };
const WANT = (t) => `<b class="g3f-want">${t}</b>`;
const BUS_STOPS = ['Trạm Chợ Hoa', 'Trạm Trường học', 'Trạm Công viên', 'Trạm Bệnh viện', 'Trạm Thư viện', 'Trạm Bưu điện', 'Trạm Sân bóng'];
const TRAIN_STOPS = ['Ga Hà Nội', 'Ga Vinh', 'Ga Huế', 'Ga Đà Nẵng', 'Ga Nha Trang', 'Ga Sài Gòn'];

export const BUS_LEVELS = [
  {
    ...levelMeta('bus-1'), missions: 5, kind: 'addsub',
    knowledge: 'bài toán về thêm, bớt một số đơn vị',
    ask: (n) => `Có khách lên, có khách xuống. ${cap(n.you)} đếm giúp ${n.me} xem trên xe có bao nhiêu người!`,
    desc: 'Xe có 12 người, lên thêm 5 người: 12 + 5 = 17 người. Lên xe là thêm, xuống xe là bớt.',
    how: [['🧮', 'Gõ số người'], ['🚪', 'Mở cửa'], ['bus', 'Xe chạy']],
  },
  {
    ...levelMeta('bus-2'), missions: 5, kind: 'more',
    knowledge: 'bài toán về nhiều hơn, ít hơn một số đơn vị',
    ask: (n) => `Xe đỏ còn kéo rèm. ${cap(n.you)} tính xem xe đỏ có bao nhiêu người!`,
    desc: 'Xe xanh có 15 người, xe đỏ nhiều hơn 4 người: 15 + 4 = 19 người. Ít hơn thì làm phép trừ.',
    how: [['🧮', 'Gõ số người'], ['🪟', 'Mở rèm'], ['bus', 'Xe chạy']],
  },
  {
    ...levelMeta('bus-3'), missions: 5, kind: 'compare',
    knowledge: 'hơn, kém nhau bao nhiêu',
    ask: (n) => `Hai xe đỗ cạnh nhau. Xe này hơn xe kia mấy người?`,
    desc: 'Xe xanh 18 người, xe đỏ 13 người: 18 − 13 = 5, hai xe hơn kém nhau 5 người. Ghép cặp từng ghế để kiểm tra.',
    how: [['🧮', 'Gõ số người'], ['🔗', 'Ghép cặp'], ['bus', 'Xe chạy']],
  },
  {
    ...levelMeta('bus-4'), missions: 5, kind: 'find',
    knowledge: 'số hạng, tổng, số bị trừ, số trừ, hiệu',
    ask: (n) => `Lúc đầu và lúc sau xe có bao nhiêu người? ${cap(n.you)} tìm số người lên, xuống!`,
    desc: 'Xe có 18 người, tới trạm còn 11 người: 18 − 11 = 7 người đã xuống.',
    how: [['🧮', 'Gõ số người'], ['🚪', 'Mở cửa'], ['bus', 'Xe chạy']],
  },
  {
    ...levelMeta('bus-5'), missions: 5, kind: 'train',
    knowledge: 'phép cộng, phép trừ có nhớ trong phạm vi 100',
    ask: (n) => `Tàu hỏa có 5 toa, mỗi toa 20 ghế. ${cap(n.you)} đếm khách giúp ${n.me}!`,
    desc: 'Tàu có 38 người, ga này lên 27 người: 38 + 27 = 65 người.',
    how: [['🧮', 'Gõ số người'], ['🚪', 'Mở cửa'], ['train', 'Tàu chạy']],
  },
];

// ── Sinh nhiệm vụ ───────────────────────────────────────────────────────────────────────────────
const lastOf = (h) => h[h.length - 1];
const nextDir = (rng, h) => (lastOf(h) ? -lastOf(h).dir : rng.pick([1, -1]));

function makeAddSub(rng, h) {
  const dir = nextDir(rng, h);
  const seen = new Set(h.map(x => `${x.a}${x.dir}${x.k}`));
  let a, k;
  do {
    const cross = rng() < 0.65; // phần lớn qua 10 (Bài 7–12 vừa học)
    if (dir > 0) {
      a = cross ? rng.int(3, 9) : rng.int(3, 15);
      k = cross ? rng.int(11 - a, 9) : rng.int(2, Math.min(9, 20 - a));
    } else {
      a = cross ? rng.int(11, 18) : rng.int(8, 20);
      k = cross ? rng.int(a - 9, 9) : rng.int(2, Math.min(9, a - 1));
    }
  } while (seen.has(`${a}${dir}${k}`) || a + dir * k < 1 || a + dir * k > SEATS);
  return { dir, a, k, ans: a + dir * k, stopMax: k };
}

function makeMore(rng, h) {
  const dir = nextDir(rng, h);
  let a, d;
  do {
    d = rng.int(2, 7);
    a = dir > 0 ? rng.int(4, SEATS - d) : rng.int(d + 3, SEATS);
  } while (h.some(x => x.a === a && x.d === d));
  return { dir, a, d, ans: a + dir * d, stopMax: 0 };
}

function makeCompare(rng, h) {
  let a, b;
  do {
    a = rng.int(6, SEATS);
    b = rng.int(4, SEATS);
  } while (Math.abs(a - b) < 2 || Math.abs(a - b) > 9 || h.some(x => x.a === a && x.b === b));
  // Hỏi theo xe nhiều hơn ("nhiều hơn mấy người") hoặc xe ít hơn ("ít hơn mấy người"), xen kẽ.
  const say = lastOf(h)?.say === 'more' ? 'less' : lastOf(h) ? 'more' : rng.pick(['more', 'less']);
  return { dir: 0, a, b, say, ans: Math.abs(a - b), stopMax: 0 };
}

function makeFind(rng, h) {
  const dir = nextDir(rng, h);
  let a, k;
  do {
    k = rng.int(2, 9);
    a = dir > 0 ? rng.int(3, SEATS - k) : rng.int(k + 3, SEATS);
  } while (h.some(x => x.a === a && x.k === k));
  // Cần thêm người lên: ở trạm đứng chờ nhiều hơn số cần (bé không đếm người đứng chờ ra đáp số).
  const crowd = dir > 0 ? k + rng.int(2, 4) : 0;
  return { dir, a, k, c: a + dir * k, ans: k, crowd, stopMax: dir > 0 ? crowd : k };
}

// Tên phép tính theo đúng tên Bài 19, 20, 22, 23 (focus từ grade2Games/catalog.js unitFocus).
const carryText = (sign, digits) => `phép ${sign > 0 ? 'cộng' : 'trừ'} có nhớ số có hai chữ số ${sign > 0 ? 'với' : 'cho'} số có ${digits === 1 ? 'một' : 'hai'} chữ số`;

// Mở từ Bài 19–23 (lv.sign, lv.digits): chỉ lên (cộng) hoặc chỉ xuống (trừ), số người đúng số chữ số của bài.
function makeTrain(rng, h, lv = {}) {
  const dir = lv.sign || nextDir(rng, h);
  const seen = new Set(h.map(x => `${x.a}${x.dir}${x.k}`));
  let a, k;
  do {
    const two = lv.digits ? lv.digits === 2 : rng() < 0.65; // số người lên / xuống có hai chữ số
    if (dir > 0) {
      a = rng.int(1, 6) * 10 + rng.int(2, 9);
      const u = rng.int(10 - (a % 10), 9); // luôn có nhớ
      const maxT = Math.floor((99 - a - u) / 10);
      k = two && maxT >= 1 ? rng.int(1, Math.min(maxT, 4)) * 10 + u : u;
    } else {
      a = rng.int(3, 9) * 10 + rng.int(0, 7);
      const u = rng.int((a % 10) + 1, 9);
      const maxT = Math.floor((a - u - 5) / 10);
      k = two && maxT >= 1 ? rng.int(1, Math.min(maxT, 4)) * 10 + u : u;
    }
  } while (seen.has(`${a}${dir}${k}`) || a + dir * k < 5 || a + dir * k > 99 || (lv.digits === 2 && k < 10));
  return { dir, a, k, ans: a + dir * k, stopMax: k };
}

const MAKERS = { addsub: makeAddSub, more: makeMore, compare: makeCompare, find: makeFind, train: makeTrain };

// ── Trò chơi ────────────────────────────────────────────────────────────────────────────────────
export const BUS_GAME = {
  ...stallMeta('bus'),
  unitWord: 'chuyến',
  npcs: [DRIVER],
  starPrefix: 'g2games',
  levels: BUS_LEVELS,
  stallIcon: () => busIcon(64),
  summaryText: (ok, total) => `Em đã đếm đúng khách <strong>${ok}/${total}</strong> chuyến xe.`,

  howTo(level) {
    const pic = (p) => (p === 'bus' ? busIcon(72) : p === 'train' ? trainIcon(76) : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '😊', label: 'Bác vui' }];
  },

  /** Mở từ biểu tượng của Bài 19, 20, 22, 23 (grade2Games/catalog.js unitFocus): chỉ phép tính của bài. */
  focus(level, { sign, digits } = {}) {
    if (!sign || level.kind !== 'train') return level;
    return { ...level, sign, digits, knowledge: carryText(sign, digits) };
  },

  makeMission(rng, level, history) {
    const sameKind = history.filter(x => x.kind === level.kind);
    const m = MAKERS[level.kind](rng, sameKind, level);
    const stops = level.kind === 'train' ? TRAIN_STOPS : BUS_STOPS;
    const used = history.map(x => x.stop);
    const stop = rng.pick(stops.filter(s => !used.slice(-3).includes(s)));
    return { ...m, kind: level.kind, stop, npc: DRIVER, seed: rng.int(1, 1e9) };
  },

  mountMission(stage, m, level, api) {
    injectBusStyles();
    const n = m.npc;
    const train = m.kind === 'train';
    const two = m.kind === 'more' || m.kind === 'compare';
    const tone = makeRng(m.seed);
    const newTone = () => tone.int(0, 999);
    const actLabel = m.kind === 'more' ? '🪟 Mở rèm' : m.kind === 'compare' ? '🔗 Ghép cặp' : '🚪 Mở cửa';
    const vehWord = train ? 'tàu' : 'xe';

    const { counter, main, speak, row, ask, nudge } = mountStall(stage, {
      npc: n, api, theme: 'bus', cameo: false, // chỗ sai hiện ngay trên xe: bác tài không nhảy xuống đứng che xe
      sign: `<span class="g2b-sign-pic">${train ? '🚉' : '🚏'}</span><span><strong>${m.stop}</strong><br>${train ? 'Tàu hỏa 5 toa' : 'Xe buýt 2 tầng'}</span>`,
      counter: `
        <div class="g2b-bench">
          <div class="g2b-view"><svg class="g2b-svg" xmlns="http://www.w3.org/2000/svg"></svg></div>
          <button type="button" class="g2b-act" data-act="go">${actLabel}</button>
        </div>`,
    });
    const bench = counter.querySelector('.g2b-bench');
    const view = counter.querySelector('.g2b-view');
    const svg = counter.querySelector('.g2b-svg');
    const actBtn = counter.querySelector('[data-act="go"]');

    // ── Trạng thái: các xe (hoặc 5 toa) và người đứng ở trạm ──
    const empty = () => Array(SEATS).fill(null);
    const fill = (seats, count, from = 0) => { for (let i = from; i < from + count; i++) seats[i] = newTone(); return seats; };
    const V = []; // { seats, mark, color, label, curtain, count }
    if (train) {
      for (let c = 0; c < 5; c++) V.push({ seats: empty(), mark: {}, color: c % 2 ? '#7BCB8B' : '#6CCFB5', label: `Toa ${c + 1}` });
      for (let g = 0; g < m.a; g++) V[Math.floor(g / SEATS)].seats[g % SEATS] = newTone();
    } else if (two) {
      V.push({ seats: fill(empty(), m.a), mark: {}, color: BUS_COLORS.blue, label: 'Xe xanh', count: m.a });
      const b = m.kind === 'compare' ? m.b : m.ans;
      V.push({ seats: fill(empty(), b), mark: {}, color: BUS_COLORS.red, label: 'Xe đỏ', count: m.kind === 'compare' ? b : '?', curtain: m.kind === 'more' });
    } else {
      V.push({ seats: fill(empty(), m.a), mark: {}, color: BUS_COLORS.yellow, label: '', count: m.a });
    }
    // Người đứng ở trạm: lên xe thì đứng chờ sẵn; xuống xe thì xuống đứng vào các chỗ trống.
    const stopSlots = m.stopMax;
    const stopPeople = [];
    const crowd = m.kind === 'find' ? m.crowd : m.dir > 0 && (m.kind === 'addsub' || m.kind === 'train') ? m.k : 0;
    for (let j = 0; j < crowd; j++) stopPeople.push(newTone());
    const stopNums = {}; // số thứ tự ghi trên đầu người vừa xuống / vừa lên (đếm cho bé thấy)

    // Ghế thứ g của "xe đích" (xe duy nhất / xe đỏ / cả đoàn tàu).
    const target = m.kind === 'more' ? 1 : 0;
    const locate = (g) => (train ? { v: Math.floor(g / SEATS), i: g % SEATS } : { v: target, i: g });
    const cap_ = train ? SEATS * 5 : SEATS;
    const occupied = () => (train ? V.reduce((s, x) => s + x.seats.filter(t => t != null).length, 0) : V[target].seats.filter(t => t != null).length);

    // ── Bố cục: thử xếp trạm bên phải / bên dưới xe, tàu 1–2 toa mỗi hàng; lấy cách cho hình to nhất ──
    const ROW_H = VEH_H + 14, GAP = 16, PX = 19, PY = 34;
    let L = null;
    function layouts() {
      const out = [];
      const carCols = train ? [1, 2, 3] : [1];
      const stopCols = stopSlots > 20 ? [10] : stopSlots > 5 ? [5, 10] : [5];
      for (const cc of carCols) {
        // Khối xe: các xe (toa) theo hàng; đầu máy nối vào cuối hàng đầu.
        const units = train ? 5 : V.length;
        const cols = train ? cc : 1;
        const rows = Math.ceil(units / cols);
        const unitW = train ? CAR_W : BUS_W;
        const vw = cols * unitW + (cols - 1) * 8 + (train ? 8 + LOCO_W : 0);
        const vh = rows * ROW_H - 14;
        for (const sc of stopCols) {
          const sRows = Math.max(1, Math.ceil(stopSlots / sc));
          const sw = stopSlots ? 40 + sc * PX + (sc > 5 ? 5 : 0) : 0;
          const sh = stopSlots ? Math.max(VEH_H, sRows * PY + 8) : 0;
          const base = { cols, rows, unitW, vw, vh, sc, sw, sh };
          out.push({ ...base, side: true, W: vw + (sw ? GAP + sw : 0), H: Math.max(vh, sh) });
          if (sw) out.push({ ...base, side: false, W: Math.max(vw, sw), H: vh + GAP + sh });
        }
      }
      return out;
    }
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
    const vehPos = (k) => {
      const c = k % L.cols, r = Math.floor(k / L.cols);
      return { x: c * (L.unitW + 8), y: r * ROW_H + (L.side ? Math.max(0, (L.H - L.vh) / 2) : 0) };
    };
    const stopPos = () => (L.side ? { x: L.vw + GAP, y: L.H - L.sh } : { x: Math.max(0, (L.W - L.sw) / 2), y: L.vh + GAP });
    const manXY = (j) => {
      const c = j % L.sc, r = Math.floor(j / L.sc);
      const p = stopPos();
      return { x: p.x + 38 + c * PX + (c >= 5 ? 5 : 0), y: p.y + L.sh - 8 - (r + 1) * PY + 4 }; // hàng 0 đứng sát vỉa hè
    };

    function render() {
      L = pickLayout();
      if (!L) return;
      let s = '';
      // Đường (và đường ray khi là tàu) dưới mỗi hàng xe.
      for (let r = 0; r < L.rows; r++) {
        const y = vehPos(r * L.cols).y + VEH_H - 6;
        s += train
          ? `<rect x="-6" y="${y}" width="${L.vw + 12}" height="6" rx="2" fill="#A8A29E"/><path d="M-6 ${y + 3} H${L.vw + 6}" stroke="#57534E" stroke-width="1.6" stroke-dasharray="3 5"/>`
          : `<rect x="-6" y="${y}" width="${L.vw + 12}" height="10" rx="3" fill="#94A3B8"/><path d="M4 ${y + 5} H${L.vw - 4}" stroke="#F8FAFC" stroke-width="1.6" stroke-dasharray="10 8"/>`;
      }
      V.forEach((veh, k) => {
        const p = vehPos(k);
        const body = train ? carSvg(k, veh) : busSvg(k, { ...veh, doorOpen: st.door });
        s += `<g transform="translate(${p.x},${p.y})"><g class="g2b-drive">${body}${seatBadges(k)}</g></g>`;
      });
      if (train) {
        const p = vehPos(Math.min(L.cols, 5) - 1);
        s += `<g transform="translate(${p.x + L.unitW + 8},${p.y})"><g class="g2b-drive">${locoSvg({ count: st.shown ?? m.a })}</g></g>`;
      }
      if (stopSlots) {
        const p = stopPos();
        s += `<rect x="${p.x}" y="${p.y + L.sh - 8}" width="${L.sw}" height="8" rx="3" fill="#CBD5E1"/>`;
        s += stopSignSvg(p.x + 16, p.y + L.sh - 8 - Math.max(58, Math.min(L.sh - 8, 76)), Math.max(58, Math.min(L.sh - 8, 76)), { train });
        for (let j = 0; j < stopSlots; j++) {
          const { x, y } = manXY(j);
          const t = stopPeople[j];
          s += `<g class="g2b-man${t == null ? ' g2b-man-empty' : ''}" data-p="${j}">${t == null ? '' : standingSvg(x, y, t)}`
            + `${stopNums[j] ? numBadge(x + MAN_W / 2, y - 3, stopNums[j]) : ''}`
            + `<rect class="g2b-slot" x="${x}" y="${y}" width="${MAN_W}" height="${MAN_H}" fill="none"/></g>`;
        }
      }
      svg.setAttribute('viewBox', `-6 -6 ${L.W + 12} ${L.H + 12}`);
      svg.style.width = `${Math.floor((L.W + 12) * L.s)}px`;
      svg.style.height = `${Math.floor((L.H + 12) * L.s)}px`;
      svg.innerHTML = s;
    }
    // Số thứ tự (ghép cặp: phần thừa được đánh số 1, 2, 3…) vẽ trên ghế.
    const seatNums = {}; // "v:i" → số
    function seatBadges(k) {
      let s = '';
      for (const [key, num] of Object.entries(seatNums)) {
        const [v, i] = key.split(':').map(Number);
        if (v !== k) continue;
        const { x, y } = seatXY(i);
        s += numBadge(x + WIN_W / 2, y - 1, num);
      }
      return s;
    }
    const numBadge = (cx, cy, num) => `<g class="g2b-num" transform="translate(${cx},${cy})"><circle r="7.5"/><text text-anchor="middle" dy="3.6">${num}</text></g>`;

    // onBoard: số người đang ngồi trên xe đích theo hình (bảng đếm chạy theo từng người, không nhảy trước).
    const st = { guess: null, busy: false, over: false, door: false, shown: null, onBoard: m.kind === 'more' ? 0 : m.a };
    if (import.meta.env.DEV) window.__g2bus = { m, st, V, stopPeople };
    let pending = false;
    const obs = new ResizeObserver(() => {
      if (!bench.isConnected) return obs.disconnect();
      if (st.busy) { pending = true; return; }
      render();
    });
    obs.observe(view);

    // ── Bảng đếm khách trên xe: chạy theo từng người lên / xuống ──
    const countEl = () => (train ? svg.querySelector('.g2b-loco .g2b-count') : svg.querySelector(`[data-v="${target}"] .g2b-count`));
    const showCount = (v) => {
      if (train) st.shown = v; else V[target].count = v;
      const el = countEl();
      if (el) { el.textContent = v; el.classList.remove('g2b-tick'); void el.getBBox?.(); el.classList.add('g2b-tick'); }
    };
    const seatEl = (v, i) => svg.querySelector(`[data-s="${v}:${i}"]`);
    const slotRect = (el) => el?.querySelector('.g2b-slot')?.getBoundingClientRect();
    /** Khung đầu + vai của người đứng (cùng tỉ lệ ô cửa sổ) — chỗ bắt đầu / kết thúc hình bay. */
    const upperRect = (r) => r && ({ left: r.left, top: r.top, width: r.width, height: r.width * WIN_H / WIN_W });
    const gapFor = (count) => Math.max(45, Math.min(300, 2600 / Math.max(1, count)));

    // ── Xe buýt: khách đi qua cửa (đầu xe, tầng dưới) rồi đi dọc lối tới ghế; xuống thì ngược lại, từng người một ──
    const DOOR_SEAT = { x: 242, y: 36 }; // ô người ngồi (đầu + vai) đứng trong khung cửa
    const DOOR_MAN = { x: 243, y: 38 }; // người đứng trong khung cửa (22 × 33)
    const STAIR_X = seatXY(9).x; // cầu thang lên tầng trên ở sát đầu xe
    const WALK = 0.42; // tốc độ đi trong xe (đơn vị hình / ms)
    const HOP_MS = 480; // trạm ↔ cửa
    const vehEl = (v) => svg.querySelector(`[data-v="${v}"]`);
    /** Lối đi từ cửa tới ghế i: đi ngang tầng dưới; ghế tầng trên thì lên cầu thang ở đầu xe rồi đi ngang. */
    function aisle(i) {
      const { x, y } = seatXY(i);
      const pts = [DOOR_SEAT];
      if (y < DOOR_SEAT.y) pts.push({ x: STAIR_X, y: DOOR_SEAT.y }, { x: STAIR_X, y });
      pts.push({ x, y });
      return pts;
    }
    const pathLen = (pts) => pts.slice(1).reduce((s, p, k) => s + Math.hypot(p.x - pts[k].x, p.y - pts[k].y), 0);
    const walkMs = (pts) => Math.max(220, Math.round(pathLen(pts) / WALK));
    /** Hình (ô người ngồi) đi theo đường gấp khúc pts (toạ độ trong xe v), đều tốc. Trả về ms tới lúc tới nơi. */
    function walk(html, v, pts, { delay = 0, ms, onStart, onLand }) {
      const el0 = vehEl(v);
      const boxes = pts.map(p => svgBoxOnScreen(el0, p.x, p.y, WIN_W, WIN_H));
      if (!boxes[0]?.width) { setTimeout(() => { onStart?.(); onLand?.(); }, delay); return delay; }
      const el = document.createElement('div');
      el.className = 'g3-fly g2b-walker';
      el.innerHTML = html;
      const b0 = boxes[0];
      Object.assign(el.style, { left: `${b0.left}px`, top: `${b0.top}px`, width: `${b0.width}px`, height: `${b0.height}px`, visibility: 'hidden' });
      document.body.appendChild(el);
      const seg = boxes.slice(1).map((b, k) => Math.hypot(b.left - boxes[k].left, b.top - boxes[k].top));
      const total = seg.reduce((a, b) => a + b, 0) || 1;
      let acc = 0;
      const frames = boxes.map((b, k) => {
        if (k) acc += seg[k - 1];
        return { offset: Math.min(1, acc / total), transform: `translate(${(b.left - b0.left).toFixed(1)}px, ${(b.top - b0.top).toFixed(1)}px)` };
      });
      setTimeout(() => { el.style.visibility = ''; onStart?.(); }, delay);
      el.animate(frames, { duration: ms, delay, easing: 'linear', fill: 'both' })
        .finished.then(() => { el.remove(); onLand?.(); }, () => el.remove());
      return delay + ms;
    }
    const doorManBox = (v) => svgBoxOnScreen(vehEl(v), DOOR_MAN.x, DOOR_MAN.y, MAN_W, MAN_H);

    /** Người đứng cuối hàng ở trạm lên ghế trống đầu tiên của xe đích. Trả về ms tới lúc ngồi xuống. */
    function boardOne(delay, num) {
      const j = stopPeople.length - 1;
      const t = stopPeople.pop();
      const g = occupied();
      const { v, i } = locate(g);
      V[v].seats[i] = t;
      const man = svg.querySelector(`[data-p="${j}"]`);
      const seat = seatEl(v, i);
      setTimeout(() => { if (man) { man.style.visibility = 'hidden'; } }, delay);
      if (num) seatNums[`${v}:${i}`] = num;
      const sit = () => {
        const { x, y } = seatXY(i);
        seat.querySelector('.g2b-who').innerHTML = seatedSvg(x, y, t);
        if (num) seat.insertAdjacentHTML('beforeend', numBadge(x + WIN_W / 2, y - 1, num));
        showCount(++st.onBoard);
        sfx.pop(Math.min(8, num || 0));
      };
      if (train) {
        return flyOne(flySeated(t), upperRect(slotRect(man)), slotRect(seat), { delay, minMs: 380, maxMs: 700, onLand: sit });
      }
      // Bước lên cửa, rồi đi dọc lối vào ghế.
      const pts = aisle(i), ms = walkMs(pts);
      flyOne(flyStanding(t), slotRect(man), doorManBox(v), {
        delay, minMs: HOP_MS, maxMs: HOP_MS,
        onLand: () => walk(flySeated(t), v, pts, { ms, onLand: sit }),
      });
      return delay + HOP_MS + ms;
    }
    /**
     * Người ngồi ghế cuối xuống xe, đứng vào chỗ trống tiếp theo ở trạm.
     * Xe buýt: delay là lúc sớm nhất được tới cửa (người trước đã ra); trả về { door, end } (ms).
     */
    function alightOne(delay, num) {
      const g = occupied() - 1;
      const { v, i } = locate(g);
      const t = V[v].seats[i];
      V[v].seats[i] = null;
      const j = stopPeople.length;
      stopPeople.push(t);
      if (num) stopNums[j] = num;
      const seat = seatEl(v, i);
      const man = svg.querySelector(`[data-p="${j}"]`);
      const stand = () => {
        const { x, y } = manXY(j);
        if (man) {
          man.classList.remove('g2b-man-empty');
          man.insertAdjacentHTML('afterbegin', standingSvg(x, y, t));
          if (num) man.insertAdjacentHTML('beforeend', numBadge(x + MAN_W / 2, y - 3, num));
        }
        sfx.pop(Math.min(8, num || 0));
      };
      const leaveSeat = () => { seat.querySelector('.g2b-who').innerHTML = ''; };
      if (train) {
        const from = slotRect(seat);
        setTimeout(() => { leaveSeat(); showCount(--st.onBoard); }, delay);
        const end = flyOne(flyStanding(t), from && { left: from.left, top: from.top, width: from.width, height: from.width * MAN_H / MAN_W }, slotRect(man), {
          delay, minMs: 380, maxMs: 700, onLand: stand,
        });
        return { door: delay, end };
      }
      // Rời ghế, đi dọc lối ra cửa, qua cửa (bảng đếm bớt 1) rồi bước xuống trạm.
      const pts = aisle(i).reverse(), ms = walkMs(pts);
      const door = Math.max(delay, ms + 300);
      walk(flySeated(t), v, pts, {
        delay: door - ms, ms, onStart: leaveSeat,
        onLand: () => {
          showCount(--st.onBoard);
          flyOne(flyStanding(t), doorManBox(v), slotRect(man), { minMs: HOP_MS, maxMs: HOP_MS, onLand: stand });
        },
      });
      return { door, end: door + HOP_MS };
    }

    // ── Lời bác tài, hoá đơn ──
    const P = (x) => `<b>${x} người</b>`;
    const bus = train ? '🚆' : '🚌';
    function intro() {
      const at = `Tới ${m.stop}`;
      if (m.kind === 'addsub' || m.kind === 'train') {
        const Veh = cap(vehWord);
        const up = m.dir > 0;
        speak(`${Veh} đang có ${m.a} người. ${at}, có ${m.k} người ${up ? 'lên' : 'xuống'} ${vehWord}. Bây giờ ${vehWord} có bao nhiêu người?`, null,
          `${Veh} có ${WANT(`${m.a} người`)}. ${up ? 'Lên' : 'Xuống'} ${WANT(`${m.k} người`)}. ${Veh} có bao nhiêu người?`);
        return row(bus, `Trên ${vehWord}`, P(m.a)) + row(up ? '🙋' : '🚶', up ? `Lên ${vehWord}` : `Xuống ${vehWord}`, P(m.k)) + row(bus, 'Bây giờ', Q, true);
      }
      if (m.kind === 'more') {
        const w = m.dir > 0 ? 'nhiều hơn' : 'ít hơn';
        speak(`Xe xanh có ${m.a} người. Xe đỏ có ${w} xe xanh ${m.d} người. Xe đỏ có bao nhiêu người?`, null,
          `Xe xanh ${WANT(`${m.a} người`)}. Xe đỏ <b>${w}</b> ${WANT(`${m.d} người`)}. Xe đỏ có bao nhiêu người?`);
        return row('🔵', 'Xe xanh', P(m.a)) + row('🔴', `Xe đỏ ${w}`, P(m.d)) + row('🔴', 'Xe đỏ', Q, true);
      }
      if (m.kind === 'compare') {
        const big = m.a > m.b ? 'xanh' : 'đỏ', small = m.a > m.b ? 'đỏ' : 'xanh';
        const q = m.say === 'more' ? `Xe ${big} nhiều hơn xe ${small} mấy người?` : `Xe ${small} ít hơn xe ${big} mấy người?`;
        speak(`Xe xanh có ${m.a} người, xe đỏ có ${m.b} người. ${q}`, null,
          `Xe xanh ${WANT(`${m.a} người`)}, xe đỏ ${WANT(`${m.b} người`)}. ${q}`);
        return row('🔵', 'Xe xanh', P(m.a)) + row('🔴', 'Xe đỏ', P(m.b)) + row('⚖️', m.say === 'more' ? 'Nhiều hơn' : 'Ít hơn', Q, true);
      }
      // find
      if (m.dir < 0) {
        speak(`Xe có ${m.a} người. ${at}, xe còn ${m.c} người. Có mấy người đã xuống xe?`, null,
          `Xe có ${WANT(`${m.a} người`)}, còn ${WANT(`${m.c} người`)}. Mấy người xuống?`);
        return row('🚌', 'Lúc đầu', P(m.a)) + row('🚌', 'Còn lại', P(m.c)) + row('🚶', 'Đã xuống', Q, true);
      }
      speak(`Xe có ${m.a} người. Bác chờ xe có đủ ${m.c} người mới chạy. Cần mấy người nữa lên xe?`, null,
        `Xe có ${WANT(`${m.a} người`)}. Cần đủ ${WANT(`${m.c} người`)}. Mấy người nữa lên?`);
      return row('🚌', 'Đang có', P(m.a)) + row('🚌', 'Cần đủ', P(m.c)) + row('🙋', 'Lên thêm', Q, true);
    }

    // ── Chơi ──
    render();
    const bill = intro();
    ask(bill, 'người', (v, pad) => {
      if (st.guess != null) return;
      st.guess = v;
      pad.lock();
      actBtn.classList.add('g2b-act-ready');
      const line = m.kind === 'more' ? 'Bấm Mở rèm xem xe đỏ có bao nhiêu người!'
        : m.kind === 'compare' ? 'Bấm Ghép cặp để so hai xe!'
          : m.kind === 'find' && m.dir > 0 ? 'Bấm Mở cửa cho khách lên xe!'
            : m.dir > 0 ? `Bấm Mở cửa cho khách lên ${vehWord}!` : `Bấm Mở cửa cho khách xuống ${vehWord}!`;
      speak(line, null, `👉 ${line}`);
    });

    const go = () => {
      if (st.over || st.busy) return;
      if (st.guess == null) {
        speak(`${cap(n.you)} gõ số người vào máy tính trước đã!`, null, 'Gõ số người vào máy tính trước!');
        nudge();
        return;
      }
      st.busy = true;
      actBtn.disabled = true;
      actBtn.classList.remove('g2b-act-ready');
      sfx.tap();
      if (m.kind === 'more') return reveal();
      if (m.kind === 'compare') return pairUp();
      openDoor();
    };
    actBtn.onclick = go;
    svg.addEventListener('click', (e) => { if (e.target.closest('.g2b-door')) go(); });

    function openDoor() {
      st.door = true;
      svg.querySelectorAll('.g2b-door').forEach(d => d.classList.add('g2b-door-open'));
      sfx.swish();
      const k = m.k;
      const up = m.dir > 0;
      // Xe buýt: mỗi lượt qua cửa một người, nên giãn cách đủ để người trước kịp đi khỏi cửa.
      const gap = train ? gapFor(k) : Math.max(230, Math.min(450, 3600 / Math.max(1, k)));
      let end = 0, next = 350;
      for (let q = 0; q < k; q++) {
        const num = m.kind === 'find' ? q + 1 : 0; // tìm số người lên / xuống: đánh số từng người cho bé đếm
        if (up) { end = Math.max(end, boardOne(350 + q * gap, num)); continue; }
        const r = alightOne(train ? 350 + q * gap : next, num);
        next = r.door + gap;
        end = Math.max(end, r.end);
      }
      setTimeout(() => {
        st.door = false;
        svg.querySelectorAll('.g2b-door').forEach(d => d.classList.remove('g2b-door-open'));
        judge();
      }, end + 450);
    }

    /** Xe đỏ kéo rèm từng cửa sổ theo thứ tự ghế: bảng đếm chạy theo số người; cửa sổ trống mở cuối cùng. */
    function reveal() {
      const red = V[1];
      const gap = gapFor(m.ans) * 0.8;
      let count = 0;
      for (let i = 0; i < SEATS; i++) {
        const has = red.seats[i] != null;
        const at = has ? 300 + i * gap : 300 + m.ans * gap + 200;
        setTimeout(() => {
          const c = svg.querySelector(`[data-v="1"] .g2b-curtain[data-c="${i}"]`);
          c?.classList.add('g2b-curtain-up');
          if (has) { count++; showCount(count); sfx.pop(Math.min(8, count % 10)); }
        }, at);
      }
      setTimeout(() => {
        red.curtain = false;
        // Phần hơn / kém: xe đỏ nhiều hơn → ghế thừa của xe đỏ sáng lên; ít hơn → ghế thừa của xe xanh.
        const [lo, hi, v] = m.dir > 0 ? [m.a, m.ans, 1] : [m.ans, m.a, 0];
        for (let i = lo; i < hi; i++) { V[v].mark[i] = 'g2b-extra'; seatNums[`${v}:${i}`] = i - lo + 1; }
        render();
        setTimeout(judge, 700);
      }, 300 + m.ans * gap + 700);
    }

    /** Ghép cặp: ghế i xe xanh với ghế i xe đỏ (theo cột, lần lượt); người không có cặp được đánh số 1, 2, 3… */
    function pairUp() {
      const lo = Math.min(m.a, m.b), hi = Math.max(m.a, m.b), big = m.a > m.b ? 0 : 1;
      const gap = gapFor(lo) * 0.7;
      for (let i = 0; i < lo; i++) {
        setTimeout(() => {
          V[0].mark[i] = V[1].mark[i] = 'g2b-paired';
          seatEl(0, i)?.classList.add('g2b-paired');
          seatEl(1, i)?.classList.add('g2b-paired');
          sfx.tap();
        }, 300 + i * gap);
      }
      for (let i = lo; i < hi; i++) {
        setTimeout(() => {
          V[big].mark[i] = 'g2b-extra';
          seatNums[`${big}:${i}`] = i - lo + 1;
          render();
          sfx.pop(i - lo);
        }, 300 + lo * gap + 250 + (i - lo) * 420);
      }
      setTimeout(judge, 300 + lo * gap + 250 + (hi - lo) * 420 + 500);
    }

    // ── Kết luận ──
    function judge() {
      st.busy = false;
      st.over = true;
      if (pending) pending = false;
      const v = st.guess, ans = m.ans;
      const ok = v === ans;
      if (!ok && (m.kind === 'addsub' || m.kind === 'train' || m.kind === 'more')) {
        // Chỗ sai hiện trên xe: gõ ít hơn → người ngồi ghế thứ v+1… có dấu "!"; gõ nhiều hơn → ghế trống bị viền đỏ.
        for (let g = Math.min(v, ans); g < Math.min(cap_, Math.max(v, ans)); g++) {
          const { v: vv, i } = locate(g);
          V[vv].mark[i] = v < ans ? 'g2b-over' : 'g2b-miss';
        }
      }
      render();
      // Dòng "?" trên hoá đơn hiện đáp số thật.
      const q = main.closest('.g3f-scene')?.querySelector('.g3f-bill-q .g3f-q');
      if (q) { q.textContent = `${ans} người`; q.classList.add('g2b-bill-ans'); }
      if (ok) return win();
      const text = answerText();
      const line = m.kind === 'compare' || m.kind === 'find'
        ? `Ơ, ${n.you} gõ ${v} người, chưa đúng rồi!`
        : `Trên ${m.kind === 'more' ? 'xe đỏ' : vehWord} có ${ans} người, không phải ${v} người!`;
      speak(line, 'sad', line);
      api.fail(`${cap(n.you)} gõ <b>${v}</b>. ${text}`, tipText());
      afterCard();
    }

    function win() {
      speak(`Đúng rồi! Giỏi quá ${n.you} ơi!`, 'happy', `Đúng rồi! Giỏi quá ${n.you} ơi! 🎉`);
      api.succeed(`${n.name} rất vui! <b>${formula()}</b>`);
      // Xe (tàu) chạy tiếp sang phải.
      setTimeout(() => {
        sfx.swish();
        const vs = [...svg.querySelectorAll('.g2b-drive')];
        const far = (L?.W || 400) + 60;
        vs.forEach((g, i) => g.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${far}px)` }],
          { duration: calmMotion() ? 1800 : 1300, delay: i * (train ? 0 : 150), easing: 'cubic-bezier(.5,0,.8,.6)', fill: 'forwards' }));
      }, 500);
      afterCard();
    }

    /** Thẻ kết quả nằm ở đáy khung: thu hình lên phía trên để vẫn thấy chỗ đúng / sai trên xe. */
    function afterCard() {
      requestAnimationFrame(() => {
        const card = main.querySelector(':scope > .g3g-result');
        if (!card) return;
        bench.style.paddingBottom = `${card.offsetHeight + 12}px`;
        render();
      });
    }

    function formula() {
      if (m.kind === 'addsub' || m.kind === 'train') return `${m.a} ${m.dir > 0 ? '+' : MINUS} ${m.k} = ${m.ans}`;
      if (m.kind === 'more') return `${m.a} ${m.dir > 0 ? '+' : MINUS} ${m.d} = ${m.ans}`;
      if (m.kind === 'compare') return `${Math.max(m.a, m.b)} ${MINUS} ${Math.min(m.a, m.b)} = ${m.ans}`;
      return m.dir < 0 ? `${m.a} ${MINUS} ${m.c} = ${m.k}` : `${m.c} ${MINUS} ${m.a} = ${m.k}`;
    }
    function answerText() {
      if (m.kind === 'addsub' || m.kind === 'train') return `${cap(vehWord)} có ${m.a} người, ${m.dir > 0 ? 'lên' : 'xuống'} ${m.k} người: ${vehWord} có <b>${m.ans} người</b>.`;
      if (m.kind === 'more') return `Xe xanh ${m.a} người, xe đỏ ${m.dir > 0 ? 'nhiều hơn' : 'ít hơn'} ${m.d} người: xe đỏ có <b>${m.ans} người</b>.`;
      if (m.kind === 'compare') return `${m.a} người và ${m.b} người: hai xe hơn kém nhau <b>${m.ans} người</b>.`;
      return m.dir < 0 ? `Xe có ${m.a} người, còn ${m.c} người: <b>${m.k} người</b> đã xuống.` : `Xe có ${m.a} người, cần đủ ${m.c} người: thêm <b>${m.k} người</b>.`;
    }
    function tipText() {
      const f = formula();
      if (m.kind === 'addsub') {
        if (m.dir > 0 && m.a < 10 && m.ans > 10) {
          const d = 10 - m.a;
          return `Lên xe là thêm: ${f}. Tách ${m.k} = ${d} + ${m.k - d}: ${m.a} + ${d} = 10, 10 + ${m.k - d} = ${m.ans}.`;
        }
        if (m.dir < 0 && m.a > 10 && m.ans < 10) {
          const d = m.a - 10;
          return `Xuống xe là bớt: ${f}. Tách ${m.k} = ${d} + ${m.k - d}: ${m.a} ${MINUS} ${d} = 10, 10 ${MINUS} ${m.k - d} = ${m.ans}.`;
        }
        return m.dir > 0 ? `Lên xe là thêm: ${f}.` : `Xuống xe là bớt: ${f}.`;
      }
      if (m.kind === 'more') return m.dir > 0 ? `Nhiều hơn thì làm phép cộng: ${f}.` : `Ít hơn thì làm phép trừ: ${f}.`;
      if (m.kind === 'compare') return `Muốn biết hơn kém nhau bao nhiêu, lấy số lớn trừ số bé: ${f}.`;
      if (m.kind === 'find') return m.dir < 0 ? `Số người xuống = lúc đầu ${MINUS} còn lại: ${f}.` : `Số người lên thêm = cần đủ ${MINUS} đang có: ${f}.`;
      return `${m.dir > 0 ? 'Lên tàu là thêm' : 'Xuống tàu là bớt'}: ${f}. Đặt tính rồi tính, nhớ 1 sang hàng chục.`;
    }
  },
};
