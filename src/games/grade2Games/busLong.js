/**
 * 🚌 Xe buýt lên xuống cấp 6 — Tàu Bắc – Nam, phạm vi 1 000 (Bài 59–62). Thiết kế: docs/lop_2/thiet-ke-tro-choi.md §4.2.
 * Đoàn tàu 10 toa, mỗi toa 100 ghế xếp 10 hàng × 10 ghế (khe giữa sau hàng / ghế thứ 5) nên một toa đầy = 1 trăm,
 * một hàng = 1 chục. Ở sân ga khách đứng theo đoàn: đoàn 100 người (tấm 10 × 10), nhóm 10 người (một hàng), khách lẻ.
 * Bé gõ số trước, bấm "🚪 Mở cửa": khách lẻ lên / xuống trước (hàng đơn vị), rồi nhóm 10, rồi đoàn 100 — đúng thứ tự
 * đặt tính. Ghế được lấp (hoặc trống) lần lượt nên đủ 10 khách lẻ là đầy một hàng: thẻ "nhớ 1" hiện ngay chỗ đó;
 * trừ mà hàng cuối không đủ khách lẻ thì một hàng đầy bị "tháo" (thẻ "tháo 1"). Bảng đếm trên đầu máy chạy theo.
 */

import { locoSvg, standingSvg, flyStanding, MAN_W, MAN_H, INK } from './art/bus.js';
import { cap } from '../grade3Games/npc.js';
import { mountStall, Q } from '../grade3Games/market/stall.js';
import { makeRng } from '../grade3Games/loop.js';
import { flyOne, calmMotion } from '../grade3Games/fly.js';
import { sfx } from '../preschool/fx.js';

const MINUS = '−';
const WANT = (t) => `<b class="g3f-want">${t}</b>`;
const SHIRTS = ['#F07167', '#6FB7EA', '#7BCB8B', '#FFD166', '#B9A7F0', '#F4A259', '#6CCFB5', '#F7A1C4'];
export const LONG_STOPS = ['Ga Hà Nội', 'Ga Thanh Hóa', 'Ga Vinh', 'Ga Đồng Hới', 'Ga Huế', 'Ga Đà Nẵng', 'Ga Quảng Ngãi', 'Ga Nha Trang', 'Ga Sài Gòn'];

// ── Hình: toa 100 ghế ──
const P = 8; // bước ghế
const gx = (c) => c * P + (c >= 5 ? 3 : 0);
const GRID = gx(9) + P; // 83
const CAR_W = GRID + 12, CAR_H = 112, GRID_X = 6, GRID_Y = 17;
const CARS = 10;
const seatPos = (i) => ({ x: GRID_X + gx(i % 10) + P / 2, y: GRID_Y + gx(Math.floor(i / 10)) + P / 2 });
const dot = (x, y, fill, cls = '') => `<circle${cls ? ` class="${cls}"` : ''} cx="${x}" cy="${y}" r="3.1" fill="${fill}" stroke="${INK}" stroke-width="0.7"/>`;
const EMPTY = '#E2E8F0';

/** Đoàn khách ở sân ga: 'h' tấm 10 × 10, 't' một hàng 10, 'u' một người đứng. */
const GROUP = { h: { w: GRID + 6, h: GRID + 6 }, t: { w: GRID + 6, h: P + 6 }, u: { w: MAN_W, h: MAN_H } };
function groupSvg(kind, tone = 0) {
  if (kind === 'u') return standingSvg(0, 0, tone);
  const rows = kind === 'h' ? 10 : 1;
  let s = `<rect x="0.5" y="0.5" width="${GROUP[kind].w - 1}" height="${GROUP[kind].h - 1}" rx="3" fill="#FFF7ED" stroke="#F59E0B" stroke-width="1.2"/>`;
  for (let r = 0; r < rows; r++) for (let c = 0; c < 10; c++) s += dot(3 + gx(c) + P / 2, 3 + gx(r) + P / 2, SHIRTS[(tone + r * 3 + c) % SHIRTS.length]);
  return s;
}
const flyGroup = (kind, tone) => (kind === 'u' ? flyStanding(tone)
  : `<svg viewBox="0 0 ${GROUP[kind].w} ${GROUP[kind].h}" preserveAspectRatio="none" aria-hidden="true">${groupSvg(kind, tone)}</svg>`);

function carSvg(k) {
  let s = `<g class="g2t-car" data-car="${k}">`
    + `<rect x="1" y="1" width="${CAR_W - 2}" height="${CAR_H - 12}" rx="6" fill="${k % 2 ? '#7BCB8B' : '#6CCFB5'}" stroke="${INK}" stroke-width="1.8"/>`
    + `<rect x="${GRID_X - 2}" y="${GRID_Y - 2}" width="${GRID + 4}" height="${GRID + 4}" rx="3" fill="#F8FAFC" stroke="${INK}" stroke-width="1"/>`
    + `<text class="g2t-carname" x="6" y="12">Toa ${k + 1}</text><text class="g2t-carnum" x="${CAR_W - 6}" y="12" text-anchor="end" data-carnum="${k}"></text>`;
  for (let i = 0; i < 100; i++) { const { x, y } = seatPos(i); s += dot(x, y, EMPTY, 'g2t-seat'); }
  const wy = CAR_H - 8;
  s += [16, 34, CAR_W - 34, CAR_W - 16].map(x => `<circle cx="${x}" cy="${wy}" r="7" fill="#4B4F58" stroke="${INK}" stroke-width="1.5"/><circle cx="${x}" cy="${wy}" r="2.8" fill="#CBD5E1"/>`).join('');
  return `${s}<rect x="-6" y="${CAR_H - 22}" width="7" height="4" fill="${INK}"/></g>`;
}
const LOCO_W = 70, LOCO_DY = CAR_H - 84; // locoSvg cao 84: hạ xuống cho bánh xe cùng ray với toa

// ── Sinh nhiệm vụ: như phép tính của Xưởng đóng gói (nhớ / tháo nhiều nhất một hàng) ──
const split = (n) => ({ h: Math.floor(n / 100), t: Math.floor(n / 10) % 10, u: n % 10 });
export function makeLong(rng, h, lv = {}) {
  const plan = h[0]?.plan || (lv.op ? [lv.op] : ['add', 'sub', 'add', 'sub', rng.pick(['add', 'sub'])]);
  const op = plan[h.length % plan.length];
  const carry = lv.carry === false ? 'none' : lv.carry ? rng.pick(['u', 'u', 't']) : rng.pick(['u', 't', 'none', 'u']);
  for (let n = 0; n < 500; n++) {
    const a = rng.int(130, 860), k = rng.int(rng() < 0.3 ? 12 : 102, 420);
    const A = split(a), B = split(k);
    if (B.u === 0 || h.some(x => x.a === a)) continue;
    if (op === 'add') {
      if (a + k > 999) continue;
      const cu = A.u + B.u >= 10, ct = A.t + B.t + (cu ? 1 : 0) >= 10;
      if ((carry === 'u' && (!cu || ct)) || (carry === 't' && (cu || !ct)) || (carry === 'none' && (cu || ct))) continue;
      return { dir: 1, a, k, ans: a + k, plan, carry };
    }
    if (k >= a - 20) continue;
    const bu = A.u < B.u, bt = A.t - (bu ? 1 : 0) < B.t;
    if ((carry === 'u' && (!bu || bt)) || (carry === 't' && (bu || !bt)) || (carry === 'none' && (bu || bt))) continue;
    if (A.t === 0 && bu) continue; // tháo cả toa để lấy khách lẻ: lớp 2 chưa học
    return { dir: -1, a, k, ans: a - k, plan, carry };
  }
  return { dir: 1, a: 456, k: 138, ans: 594, plan, carry: 'u' };
}

/** Thứ tự đoàn khách đi: khách lẻ, nhóm 10, đoàn 100 (đặt tính từ phải sang trái). */
const groupsOf = (k) => { const d = split(k); return [...Array(d.u).fill('u'), ...Array(d.t).fill('t'), ...Array(d.h).fill('h')]; };
const SIZE = { u: 1, t: 10, h: 100 };

export function mountLong(stage, m, level, api, { injectStyles }) {
  injectStyles();
  injectLongStyles();
  const n = m.npc;
  const tone = makeRng(m.seed);
  const groups = groupsOf(m.k);
  const { counter, main, speak, row, ask, nudge } = mountStall(stage, {
    npc: n, api, theme: 'bus', cameo: false,
    sign: `<span class="g2b-sign-pic">🚉</span><span><strong>${m.stop}</strong><br>Tàu Bắc – Nam 10 toa</span>`,
    counter: `
      <div class="g2b-bench">
        <div class="g2b-view"><svg class="g2b-svg g2t-svg" xmlns="http://www.w3.org/2000/svg"></svg></div>
        <button type="button" class="g2b-act" data-act="go">🚪 Mở cửa</button>
      </div>`,
  });
  const bench = counter.querySelector('.g2b-bench');
  const view = counter.querySelector('.g2b-view');
  const svg = counter.querySelector('.g2b-svg');
  const actBtn = counter.querySelector('[data-act="go"]');

  // Ghế g (0–999) có người: màu áo. Lên thì đoàn khách đứng chờ sẵn ở sân ga; xuống thì sân ga có chỗ trống.
  const seats = Array.from({ length: CARS * 100 }, (_, g) => (g < m.a ? SHIRTS[tone.int(0, 7)] : null));
  const slots = groups.map((kind, j) => ({ kind, tone: tone.int(0, 999), here: m.dir > 0, j }));
  const st = { guess: null, busy: false, over: false, count: m.a };
  if (import.meta.env.DEV) window.__g2long = { m, st, seats, slots };

  // ── Bố cục: toa theo hàng (2, 5 hoặc 10 toa mỗi hàng), sân ga dưới đoàn tàu; lấy cách cho hình to nhất ──
  const ROW = CAR_H + 12, GAP = 18;
  let L = null;
  function platform(maxW) {
    // Đoàn 100 → một hàng tấm; nhóm 10 xếp chồng thành cột; khách lẻ hàng 5 người.
    const d = split(m.k), pos = [];
    let x = 44, y = 0, h = 0;
    const place = (w, hh) => { if (x + w > maxW && x > 44) { x = 44; y += h + 10; h = 0; } const p = { x, y }; x += w + 10; h = Math.max(h, hh); return p; };
    const hs = [], ts = [], us = [];
    for (let i = 0; i < d.h; i++) hs.push(place(GROUP.h.w, GROUP.h.h));
    if (d.t) {
      const col = place(GROUP.t.w, d.t * (GROUP.t.h + 4));
      for (let i = 0; i < d.t; i++) ts.push({ x: col.x, y: col.y + (d.t - 1 - i) * (GROUP.t.h + 4) });
    }
    if (d.u) {
      const cols = Math.min(5, d.u), rows = Math.ceil(d.u / 5);
      const blk = place(cols * (MAN_W + 4), rows * (MAN_H + 4));
      for (let i = 0; i < d.u; i++) us.push({ x: blk.x + (i % 5) * (MAN_W + 4), y: blk.y + Math.floor(i / 5) * (MAN_H + 4) });
    }
    let iu = 0, it = 0, ih = 0;
    for (const g of groups) pos.push(g === 'u' ? us[iu++] : g === 't' ? ts[it++] : hs[ih++]);
    return { pos, w: Math.max(x - 10, 100), h: y + h + 12 };
  }
  function layouts() {
    const out = [];
    for (const cols of [2, 5, 10]) {
      const rows = Math.ceil(CARS / cols);
      const vw = cols * (CAR_W + 6) - 6 + 6 + LOCO_W, vh = rows * ROW - 12;
      const pf = platform(Math.max(vw, 320));
      out.push({ cols, rows, vw, vh, pf, W: Math.max(vw, pf.w), H: vh + GAP + Math.max(pf.h, 70) });
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
  // Đầu máy ở đầu hàng trên cùng (bên trái), các toa nối sau.
  const carPos = (k) => ({ x: LOCO_W + 6 + (k % L.cols) * (CAR_W + 6), y: Math.floor(k / L.cols) * ROW });
  const pfY = () => L.vh + GAP;

  function render() {
    L = pickLayout();
    if (!L) return;
    let s = '';
    for (let r = 0; r < L.rows; r++) {
      const y = r * ROW + CAR_H - 3;
      s += `<rect x="-6" y="${y}" width="${L.vw + 12}" height="6" rx="2" fill="#A8A29E"/><path d="M-6 ${y + 3} H${L.vw + 6}" stroke="#57534E" stroke-width="1.6" stroke-dasharray="3 5"/>`;
    }
    s += `<g class="g2b-drive">`;
    s += `<g transform="translate(${LOCO_W},${LOCO_DY}) scale(-1,1)">${locoSvg({ count: '' })}</g>`;
    s += `<text class="g2t-count" x="${LOCO_W - 23}" y="${LOCO_DY + 24}" text-anchor="middle">${st.count}</text>`;
    for (let k = 0; k < CARS; k++) { const p = carPos(k); s += `<g transform="translate(${p.x},${p.y})">${carSvg(k)}</g>`; }
    s += `</g>`;
    // Sân ga
    const py = pfY();
    s += `<rect x="0" y="${py + Math.max(L.pf.h, 70) - 8}" width="${L.W}" height="8" rx="3" fill="#CBD5E1"/>`;
    s += `<g transform="translate(14,${py + Math.max(L.pf.h, 70) - 8 - 64})"><rect x="-1.8" y="20" width="3.6" height="44" fill="#64748B"/><rect x="-13" y="0" width="26" height="26" rx="5" fill="#2563EB" stroke="${INK}" stroke-width="1.6"/><text x="0" y="18" text-anchor="middle" font-size="15">🚆</text></g>`;
    slots.forEach((g, j) => {
      const p = L.pf.pos[j];
      s += `<g class="g2t-grp${g.here ? '' : ' g2t-grp-empty'}" data-g="${j}" transform="translate(${p.x},${py + p.y})">`
        + `<rect class="g2t-gslot" width="${GROUP[g.kind].w}" height="${GROUP[g.kind].h}" rx="3"/>`
        + `<g class="g2t-gin">${g.here ? groupSvg(g.kind, g.tone) : ''}</g></g>`;
    });
    svg.setAttribute('viewBox', `-6 -6 ${L.W + 12} ${L.H + 12}`);
    svg.style.width = `${Math.floor((L.W + 12) * L.s)}px`;
    svg.style.height = `${Math.floor((L.H + 12) * L.s)}px`;
    svg.innerHTML = s;
    paintAll();
  }
  const seatEl = (g) => svg.querySelectorAll(`[data-car="${Math.floor(g / 100)}"] .g2t-seat`)[g % 100];
  function paintSeat(g) { const el = seatEl(g); if (el) el.setAttribute('fill', seats[g] || EMPTY); }
  function paintCarNum(k) {
    const el = svg.querySelector(`[data-carnum="${k}"]`);
    if (el) el.textContent = String(seats.slice(k * 100, k * 100 + 100).filter(Boolean).length || '');
  }
  function paintAll() {
    svg.querySelectorAll('.g2t-car').forEach(car => {
      const k = +car.dataset.car;
      car.querySelectorAll('.g2t-seat').forEach((el, i) => el.setAttribute('fill', seats[k * 100 + i] || EMPTY));
      paintCarNum(k);
    });
  }
  let pending = false;
  const obs = new ResizeObserver(() => {
    if (!bench.isConnected) return obs.disconnect();
    if (st.busy) { pending = true; return; }
    render();
  });
  obs.observe(view);

  const showCount = (v) => {
    st.count = v;
    const el = svg.querySelector('.g2t-count');
    if (el) { el.textContent = v; el.classList.remove('g2b-tick'); void el.getBBox?.(); el.classList.add('g2b-tick'); }
  };
  /** Khung trên màn hình của các ghế g0 … g1-1 nằm trong toa chứa nhiều ghế nhất (đích / gốc của hình bay). */
  function seatsRect(g0, g1) {
    const per = {};
    for (let g = g0; g < g1; g++) per[Math.floor(g / 100)] = (per[Math.floor(g / 100)] || 0) + 1;
    const k = +Object.entries(per).sort((a, b) => b[1] - a[1])[0][0];
    let box = null;
    for (let g = Math.max(g0, k * 100); g < Math.min(g1, k * 100 + 100); g++) {
      const r = seatEl(g)?.getBoundingClientRect();
      if (!r) continue;
      box = box ? { l: Math.min(box.l, r.left), t: Math.min(box.t, r.top), r: Math.max(box.r, r.right), b: Math.max(box.b, r.bottom) } : { l: r.left, t: r.top, r: r.right, b: r.bottom };
    }
    return box && { left: box.l, top: box.t, width: box.r - box.l, height: box.b - box.t };
  }
  const slotRect = (j) => svg.querySelector(`[data-g="${j}"] .g2t-gslot`)?.getBoundingClientRect();
  /** Thẻ nhỏ "nhớ 1" / "tháo 1" trên ghế g (hàng vừa đầy / vừa bị tháo). */
  function tag(g, text) {
    const r = seatEl(g)?.getBoundingClientRect();
    if (!r) return;
    const el = document.createElement('div');
    el.className = 'g2t-tag';
    el.textContent = text;
    Object.assign(el.style, { left: `${r.left + r.width / 2}px`, top: `${r.top}px` });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), calmMotion() ? 1900 : 1500);
  }

  /** Lấp (lên) / bỏ trống (xuống) size ghế từ ghế g0, lần lượt từng hàng — nhìn thấy khách vào chỗ. */
  function sweep(g0, size, tone0, on, ms) {
    const step = size === 1 ? 0 : ms / Math.ceil(size / 10);
    for (let r = 0; r * 10 < size; r++) {
      setTimeout(() => {
        for (let g = g0 + r * 10; g < Math.min(g0 + size, g0 + r * 10 + 10); g++) {
          seats[g] = on ? SHIRTS[(tone0 + g) % SHIRTS.length] : null;
          paintSeat(g);
        }
        paintCarNum(Math.floor((g0 + r * 10) / 100));
        if (Math.floor((g0 + size - 1) / 100) !== Math.floor(g0 / 100)) paintCarNum(Math.floor((g0 + size - 1) / 100));
      }, r * step);
    }
  }

  function intro() {
    const up = m.dir > 0;
    speak(`Tàu đang có ${m.a} người. Tới ${m.stop}, có ${m.k} người ${up ? 'lên' : 'xuống'} tàu. Bây giờ tàu có bao nhiêu người?`, null,
      `Tàu có ${WANT(`${m.a} người`)}. ${up ? 'Lên' : 'Xuống'} ${WANT(`${m.k} người`)}. Tàu có bao nhiêu người?`);
    const Pp = (x) => `<b>${x} người</b>`;
    return row('🚆', 'Trên tàu', Pp(m.a)) + row(up ? '🙋' : '🚶', up ? 'Lên tàu' : 'Xuống tàu', Pp(m.k)) + row('🚆', 'Bây giờ', Q, true);
  }

  render();
  ask(intro(), 'người', (v, pad) => {
    if (st.guess != null) return;
    st.guess = v;
    pad.lock();
    actBtn.classList.add('g2b-act-ready');
    const line = `Bấm Mở cửa cho khách ${m.dir > 0 ? 'lên' : 'xuống'} tàu!`;
    speak(line, null, `👉 ${line}`);
  });

  actBtn.onclick = () => {
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
    sfx.swish();
    run();
  };

  /** Từng đoàn khách lên / xuống: khách lẻ trước, rồi nhóm 10, rồi đoàn 100. */
  function run() {
    const calm = calmMotion();
    const GAP_MS = { u: calm ? 420 : 330, t: calm ? 560 : 460, h: calm ? 820 : 700 };
    let t = 350, prev = null;
    let count = m.a;
    slots.forEach((g) => {
      if (prev && prev !== g.kind) t += 350; // nghỉ một nhịp khi sang hàng chục / hàng trăm
      prev = g.kind;
      const size = SIZE[g.kind];
      const from = count;
      count += m.dir * size;
      const lo = Math.min(from, count); // ghế lo … lo+size-1 được lấp / bỏ trống
      const crossRow = g.kind === 'u' && (m.dir > 0 ? count % 10 === 0 : from % 10 === 0);
      const crossCar = g.kind === 't' && (m.dir > 0 ? count % 100 === 0 : from % 100 === 0);
      const at = t, after = count;
      if (m.dir > 0) {
        setTimeout(() => {
          g.here = false;
          svg.querySelector(`[data-g="${g.j}"]`)?.classList.add('g2t-grp-empty');
          const gin = svg.querySelector(`[data-g="${g.j}"] .g2t-gin`);
          const fromR = slotRect(g.j);
          if (gin) gin.innerHTML = '';
          flyOne(flyGroup(g.kind, g.tone), fromR, seatsRect(lo, lo + size), {
            minMs: 420, maxMs: 650,
            onLand: () => {
              sweep(lo, size, g.tone, true, 260);
              showCount(from + size);
              sfx.pop(Math.min(8, size === 1 ? (from + 1) % 10 : 4));
              if (crossRow) tag(lo, 'nhớ 1');
              if (crossCar) tag(lo, 'nhớ 1');
            },
          });
        }, at);
      } else {
        setTimeout(() => {
          const fromR = seatsRect(lo, lo + size);
          sweep(lo, size, 0, false, 200);
          showCount(after);
          if (crossRow) tag(lo + size - 1, 'tháo 1');
          if (crossCar) tag(lo + size - 1, 'tháo 1');
          flyOne(flyGroup(g.kind, g.tone), fromR, slotRect(g.j), {
            minMs: 420, maxMs: 650,
            onLand: () => {
              g.here = true;
              const el = svg.querySelector(`[data-g="${g.j}"]`);
              el?.classList.remove('g2t-grp-empty');
              const gin = el?.querySelector('.g2t-gin');
              if (gin) gin.innerHTML = groupSvg(g.kind, g.tone);
              sfx.pop(Math.min(8, size === 1 ? 3 : 5));
            },
          });
        }, at);
      }
      t += GAP_MS[g.kind];
    });
    setTimeout(judge, t + 900);
  }

  function judge() {
    st.busy = false;
    st.over = true;
    if (pending) { pending = false; render(); }
    const v = st.guess, ans = m.ans;
    const q = main.closest('.g3f-scene')?.querySelector('.g3f-bill-q .g3f-q');
    if (q) { q.textContent = `${ans} người`; q.classList.add('g2b-bill-ans'); }
    const f = `${m.a} ${m.dir > 0 ? '+' : MINUS} ${m.k} = ${ans}`;
    if (v === ans) {
      speak(`Đúng rồi! Giỏi quá ${n.you} ơi!`, 'happy', `Đúng rồi! Giỏi quá ${n.you} ơi! 🎉`);
      api.succeed(`${n.name} rất vui! <b>${f}</b>`);
      setTimeout(() => {
        sfx.swish();
        svg.querySelectorAll('.g2b-drive').forEach(g => g.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${-(L?.W || 400) - 80}px)` }],
          { duration: calmMotion() ? 1900 : 1400, easing: 'cubic-bezier(.5,0,.8,.6)', fill: 'forwards' }));
      }, 500);
    } else {
      const line = `Trên tàu có ${ans} người, không phải ${v} người!`;
      speak(line, 'sad', line);
      const el = svg.querySelector('.g2t-count');
      el?.classList.add('g2t-count-bad');
      const carryTip = m.carry === 'none' ? 'Đặt tính rồi tính từ hàng đơn vị, hàng chục rồi hàng trăm.'
        : m.dir > 0 ? `Cộng từ hàng đơn vị: đủ 10 thì nhớ 1 sang hàng ${m.carry === 'u' ? 'chục' : 'trăm'}.`
          : `Trừ từ hàng đơn vị: hàng ${m.carry === 'u' ? 'đơn vị' : 'chục'} không trừ được thì lấy thêm 10 rồi trừ, nhớ 1 sang hàng ${m.carry === 'u' ? 'chục' : 'trăm'} của số trừ.`;
      api.fail(`${cap(n.you)} gõ <b>${v}</b>. Tàu có ${m.a} người, ${m.dir > 0 ? 'lên' : 'xuống'} ${m.k} người: tàu có <b>${ans} người</b>.`,
        `${m.dir > 0 ? 'Lên tàu là thêm' : 'Xuống tàu là bớt'}: ${f}. ${carryTip}`);
    }
    requestAnimationFrame(() => {
      const card = main.querySelector(':scope > .g3g-result');
      if (!card) return;
      bench.style.paddingBottom = `${card.offsetHeight + 12}px`;
      render();
    });
  }
}

function injectLongStyles() {
  if (document.getElementById('g2t-styles')) return;
  const st = document.createElement('style');
  st.id = 'g2t-styles';
  st.textContent = `
    .g2t-carname, .g2t-carnum { font: 800 9px 'Baloo 2', Quicksand, sans-serif; fill: #fff; paint-order: stroke; stroke: rgba(15,23,42,.45); stroke-width: 2px; }
    .g2t-carnum { fill: #FEF08A; }
    .g2t-count { font: 800 16px 'Courier New', monospace; fill: #86EFAC; }
    .g2t-count-bad { fill: #FCA5A5; }
    .g2t-gslot { fill: none; stroke: #94A3B8; stroke-width: 1; stroke-dasharray: 3 3; opacity: 0; }
    .g2t-grp-empty .g2t-gslot { opacity: 1; }
    .g2t-tag { position: fixed; z-index: 60; transform: translate(-50%, -110%); pointer-events: none; background: #F97316; color: #fff; border: 2px solid #fff; border-radius: 999px; padding: 0 .5em; font: 800 .95rem 'Baloo 2', Quicksand, sans-serif; box-shadow: 0 3px 8px rgba(0,0,0,.2); animation: g2tTag 1.5s ease forwards; }
    @keyframes g2tTag { 0% { opacity: 0; margin-top: 6px; } 15% { opacity: 1; margin-top: 0; } 80% { opacity: 1; } 100% { opacity: 0; margin-top: -10px; } }
    @media (prefers-reduced-motion: reduce) { .g2t-tag { animation-duration: 1.9s; } }
  `;
  document.head.appendChild(st);
}
