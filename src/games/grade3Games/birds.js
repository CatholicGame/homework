/**
 * 🐦 Săn chim — thiết kế: docs/tro-choi-san-chim.md. Một trò, hai quầy, dùng chung cho lớp 2 và lớp 3
 * (quầy chụp ảnh chỉ hợp với mẫu giáo, lớp 1: không có ở đây):
 *   🥅 Lưới và lồng: bé tính trước trên bàn phím, rồi vung lưới bắt chim, bỏ chim vào lồng để kiểm chứng: bắt thêm cho đủ
 *      lồng, mỗi lồng mấy con (nhân), chia đều / chia theo lồng (chia), chim dư đậu nóc lồng (chia có dư), bắt rồi thả
 *      (hai bước). Làm đúng thì mở lồng, chim bay đi.
 *   🎯 Ná cao su: mỗi chim đeo một vòng số, bé kéo dây ná bắn trúng con mang kết quả của phép tính trên bảng. Trúng đúng
 *      con thì chim giật mình rơi vào giỏ (không có cảnh chim chết); trúng con sai thì nó kêu và bay mất.
 * Không đếm giờ: chim bay vòng lại mãi. Chụp hụt, vung lưới trượt, bắn trượt chỉ cần làm lại; chỉ trả lời sai mới
 * là thất bại. Khung quầy dùng chung với Chợ phiên (market/stall.js), theme 'bird'.
 */

import { BIRDS, birdSvg, CAGE_BACK, CAGE_FRONT, NET_BAG, NET_DROP, SLING, SLING_TIPS, STONE, BASKET, FIELD_BACKDROP } from './art/birds.js';
import { NPCS } from './npc.js';
import { mountStall, Q } from './market/stall.js';
import { stallMeta as meta3, levelMeta as lv3 } from './catalog.js';
import { stallMeta as meta2, levelMeta as lv2 } from '../grade2Games/catalog.js';
import { sfx } from '../preschool/fx.js';
import { flyOne, calmMotion } from './fly.js';

const MINUS = '−';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const WANT = (t) => `<b class="g3f-want">${t}</b>`;
const BQ = '<b class="g3k-q">?</b>'; // dấu "?" trên bảng (Q của hoá đơn quá nhỏ cho bảng to)
const npcAs = (id, name) => ({ ...NPCS.find(n => n.id === id), id: `${id}-bird`, name });
const NPC_NET = npcAs('ong', 'Ông Sáu trạm chim');
const NPC_SLING = npcAs('bin', 'Bạn Bin');
const perched = (sp) => birdSvg(sp, { perch: true });
const rectOf = (el) => el.getBoundingClientRect();

// ════ Bộ máy bầu trời: chim / đàn chim bay theo làn, vòng lại mãi; ná và viên đạn chạy chung một vòng lặp ════════
/**
 * field: khung cảnh (position: relative). Mỗi vật bay: { el, x, y (tỉ lệ bề rộng / bề cao khung, tâm vật), vx, vy (tỉ lệ / giây) }.
 * Vật đi hết mép thì quay lại mép bên kia (leave: bay đi luôn, tự gỡ). frozen: đứng yên (ảnh chụp, chim trúng ná).
 */
function makeSky(field, layer) {
  const items = new Set();
  const frames = new Set();
  const slow = calmMotion() ? 0.65 : 1; // máy tắt hiệu ứng: bay chậm, êm hơn (không bỏ chuyển động)
  let W = field.clientWidth, H = field.clientHeight;
  const measure = (it) => { it.w = it.el.offsetWidth; it.h = it.el.offsetHeight; };
  const ro = new ResizeObserver(() => { W = field.clientWidth; H = field.clientHeight; items.forEach(it => { it.relayout?.(); measure(it); }); });
  ro.observe(field);
  let last = performance.now(), t = 0;
  const tick = (now) => {
    if (!field.isConnected) { ro.disconnect(); return; }
    const dt = Math.min(0.25, (now - last) / 1000); // máy chậm / khựng: chim không bò chậm lại
    last = now; t += dt;
    for (const it of items) {
      if (!it.frozen) {
        const k = (it.leave ? 1 : slow) * (it.speedMul || 1);
        it.x += it.vx * dt * k;
        it.y += (it.vy || 0) * dt * k;
        if (it.g) it.vy = (it.vy || 0) + it.g * dt;
        const half = it.w / W / 2 + 0.03;
        const out = it.x > 1 + half || it.x < -half || it.y < -0.4 || it.y > 1.4;
        if (out && it.leave) { items.delete(it); it.el.remove(); continue; }
        if (it.vx > 0 && it.x > 1 + half) it.x = -half;
        if (it.vx < 0 && it.x < -half) it.x = 1 + half;
      }
      const bob = it.frozen || it.leave || it.g ? 0 : Math.sin(t * 2.1 + it.phase) * H * 0.01;
      it.px = it.x * W;
      it.py = it.y * H + bob;
      it.el.style.transform = `translate(${(it.px - it.w / 2).toFixed(1)}px, ${(it.py - it.h / 2).toFixed(1)}px)${it.spin ? ` rotate(${(t * it.spin) % 360}deg)` : ''}`;
    }
    frames.forEach(f => f(dt));
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  return {
    get W() { return W; }, get H() { return H; }, items,
    add(el, opts) {
      el.classList.add('g3k-it');
      layer.appendChild(el);
      const it = { el, phase: Math.random() * 6, ...opts };
      measure(it);
      it.px = it.x * W; it.py = it.y * H;
      el.style.transform = `translate(${(it.px - it.w / 2).toFixed(1)}px, ${(it.py - it.h / 2).toFixed(1)}px)`;
      items.add(it);
      return it;
    },
    remove(it) { items.delete(it); it.el.remove(); },
    onFrame(f) { frames.add(f); return () => frames.delete(f); },
    /** Mọi chim còn trên trời bay đi hết (trước khi hiện thẻ kết quả: thẻ đè lên khoảng trời trống). */
    scatter() {
      items.forEach(it => { it.leave = true; it.frozen = false; it.g = 0; it.vx = (it.vx >= 0 ? 1 : -1) * 0.75; it.vy = -0.35; });
      return sleep(900);
    },
  };
}

/** Một con chim bay (có thể đeo vòng số). */
function flyingBird(sp, { flip = false, tag = null, cls = '' } = {}) {
  const el = document.createElement('div');
  el.className = `g3k-fly ${cls}`;
  el.innerHTML = `${birdSvg(sp, { flip })}${tag !== null ? `<span class="g3k-ring"><span class="g3k-string"></span><b>${tag}</b></span>` : ''}`;
  return el;
}

/**
 * Đàn chim xếp theo nhóm (mỗi nhóm một khối lưới nhỏ, các nhóm cách nhau rõ) — để đếm theo nhóm.
 * Trả về { el, groups: [el], layout(maxW, maxH) } — layout() đặt lại cỡ theo khung (gọi khi đổi cỡ màn hình).
 */
function makeFlock(sp, sizes, { flip = false } = {}) {
  const el = document.createElement('div');
  el.className = 'g3k-flock';
  const groups = sizes.map((k) => {
    const g = document.createElement('div');
    g.className = 'g3k-grp';
    g.innerHTML = Array.from({ length: k }, (_, i) => `<span class="g3k-fb" style="--j:${((i * 37) % 7) / 7}">${birdSvg(sp, { flip })}</span>`).join('');
    el.appendChild(g);
    return g;
  });
  const order = flip ? [...groups].reverse() : groups; // bay sang trái: nhóm đầu đàn ở bên trái
  const GAP = 0.9;
  // Mỗi nhóm là một khối c cột; các nhóm xếp thành 1 hoặc 2 dải (màn dọc hẹp: 2 dải cho chim to hơn).
  // Thử mọi cách, chọn cách cho chim to nhất. Nhóm 10 con (đếm chục) luôn là 2 × 5 hoặc 5 × 2.
  const fit = (c, bands, maxW, maxH, cap) => {
    const cols = sizes.map(k => (k === 10 ? (c <= 2 ? 2 : 5) : Math.min(k, c)));
    const rows = sizes.map((k, i) => Math.ceil(k / cols[i]));
    const per = Math.ceil(sizes.length / bands);
    const bandsIdx = Array.from({ length: bands }, (_, b) => order.slice(b * per, (b + 1) * per).map(g => groups.indexOf(g))).filter(b => b.length);
    const wCols = Math.max(...bandsIdx.map(b => b.reduce((a, i) => a + cols[i], 0) + GAP * (b.length - 1)));
    const hRows = bandsIdx.reduce((a, b) => a + Math.max(...b.map(i => rows[i])) * 0.82, 0) + GAP * 0.8 * (bandsIdx.length - 1);
    return { cols, rows, bandsIdx, cell: Math.max(10, Math.min(maxW / wCols, maxH / (hRows + 0.2), cap)) };
  };
  const layout = (maxW, maxH, cap) => {
    let best = null;
    for (const bands of sizes.length > 2 ? [1, 2] : [1]) {
      for (let c = 1; c <= 5; c++) {
        const o = fit(c, bands, maxW, maxH, cap);
        if (!best || o.cell > best.cell + 0.5) best = o;
      }
    }
    const { cols, rows, bandsIdx, cell } = best;
    let y = 0, W = 0;
    bandsIdx.forEach((band) => {
      const bh = Math.max(...band.map(i => rows[i])) * cell * 0.82;
      let x = 0;
      band.forEach((i) => {
        const g = groups[i], c = cols[i], r = rows[i];
        const top = y + (bh - r * cell * 0.82) / 2;
        Object.assign(g.style, { left: `${x}px`, top: `${top}px`, width: `${c * cell}px`, height: `${r * cell * 0.82}px` });
        [...g.querySelectorAll('.g3k-fb')].forEach((b, n) => {
          Object.assign(b.style, { left: `${(n % c) * cell}px`, top: `${Math.floor(n / c) * cell * 0.82}px`, width: `${cell}px`, height: `${cell * 0.74}px` });
        });
        x += (c + GAP) * cell;
      });
      W = Math.max(W, x - GAP * cell);
      y += bh + GAP * 0.8 * cell;
    });
    el.style.width = `${W}px`;
    el.style.height = `${y - GAP * 0.8 * cell}px`;
  };
  return { el, groups, layout };
}

// ════ Khung chung của màn chơi ══════════════════════════════════════════════════════════════════════════════
const SIGN = { net: '🥅 Bắt chim, chia vào lồng', sling: '🎯 Thi bắn ná' };

function mountField(stage, m, api, { npc, mode, pad }) {
  const s = mountStall(stage, {
    npc, api, theme: 'bird', cameo: false,
    sign: `<span>${SIGN[mode]}</span>`,
    counter: `
      <div class="g3k-bench g3k-mode-${mode}">
        <div class="g3k-field" data-field>
          ${FIELD_BACKDROP}
          <div class="g3k-ground" data-ground></div>
          <div class="g3k-air" data-air></div>
          <div class="g3k-fx" data-fx></div>
          <div class="g3k-board" data-board><span class="g3k-say">&nbsp;</span></div>
        </div>
      </div>`,
  });
  const scene = stage.querySelector('.g3f-scene');
  scene.classList.add('g3k-on');
  if (!pad) scene.classList.add('g3k-nopad');
  const q = (sel) => s.counter.querySelector(sel);
  const field = q('[data-field]');
  const sky = makeSky(field, q('[data-air]'));
  const board = q('[data-board]');
  const say = (html) => { board.innerHTML = `<span class="g3k-say">${html}</span>`; };
  const hint = (el) => { if (!el) return; el.classList.remove('g3k-hint'); void el.offsetWidth; el.classList.add('g3k-hint'); };
  const ok = (text, line) => { s.speak(line, 'happy', `${line} 🎉`); api.succeed(text); };
  const bad = (line, text, tip) => { s.speak(line, 'sad', line); api.fail(text, tip); };
  return { ...s, s, m, n: npc, field, sky, ground: q('[data-ground]'), fx: q('[data-fx]'), board, say, hint, ok, bad, scene };
}

/** Hiệu ứng lưới chụp xuống tại (px, py) trong khung, rộng w. */
function netDrop(fx, px, py, w) {
  const el = document.createElement('div');
  el.className = 'g3k-netdrop';
  Object.assign(el.style, { left: `${px - w / 2}px`, top: `${py - w * 0.55}px`, width: `${w}px`, height: `${w}px` });
  el.innerHTML = NET_DROP;
  fx.appendChild(el);
  sfx.swish();
  setTimeout(() => el.remove(), 700);
}

// ════ 🥅 Lưới và lồng ════════════════════════════════════════════════════════════════════════════════════════
const NET_SP = ['se', 'chaomao', 'sao', 'bocau', 'en'];

function makeNet(rng, level, history) {
  const prev = history[history.length - 1];
  const sp = rng.pick(NET_SP.filter(x => x !== prev?.sp));
  const seen = new Set(history.map(h => h.key));
  const tables = level.tables || level.pool;
  for (let t = 0; t < 80; t++) {
    let m;
    const kind = level.kind === 'div'
      ? (history.length % 2 ? 'group' : 'share')
      : level.kind;
    if (kind === 'add') {
      const a = rng.int(5, 9), b = rng.int(Math.max(11, a + 3), Math.min(18, a + 9));
      m = { kind, a, b, ans: b - a };
    } else if (kind === 'mul') {
      const s = rng.pick(tables), k = rng.int(2, s === 2 ? 6 : 5);
      m = { kind, s, k, ans: s * k };
    } else if (kind === 'share') {
      // Chia đều vào k lồng (k = số chia). Lồng chứa tối đa 9 con, tối đa 6 lồng một hàng.
      const ks = tables.filter(x => x <= 6);
      if (!ks.length) { m = null; } else {
        const k = rng.pick(ks), qn = rng.int(2, k >= 5 ? 6 : 8);
        m = { kind, k, q: qn, N: k * qn, ans: qn };
      }
    } else if (kind === 'group') {
      const sz = rng.pick(tables), qn = rng.int(2, 6);
      m = { kind, s: sz, q: qn, N: sz * qn, ans: qn };
    } else if (kind === 'rem') {
      const sz = rng.pick(tables), qn = rng.int(2, 5), r = rng.int(1, sz - 1);
      m = { kind, s: sz, q: qn, r, N: sz * qn + r, ans: qn };
    } else { // two: k lồng × s con, thả r con
      const k = rng.int(3, 5), sz = rng.int(3, 9), r = rng.int(2, Math.min(9, k * sz - 4));
      m = { kind, k, s: sz, r, ans: k * sz - r };
    }
    if (!m) { // bảng chia 7, 8, 9: không có đủ chỗ cho 7–9 lồng chia đều → chia theo lồng
      const sz = rng.pick(tables), qn = rng.int(2, 6);
      m = { kind: 'group', s: sz, q: qn, N: sz * qn, ans: qn };
    }
    m.key = JSON.stringify(m);
    if (!seen.has(m.key) || t === 79) return { ...m, sp };
  }
  return null;
}

/**
 * Một lồng tre: `slots` ô chim xếp `cols` cột (outline: số ô hiện viền chờ), nhãn sức chứa.
 * Chim đậu từ đáy lồng lên (top: lồng to "bắt thêm" xếp như khung mười ô, hàng trên trước).
 */
function cageHtml(i, slots, cols, { outline = 0, label = '', wide = false, top = false } = {}) {
  const rows = Math.ceil(slots / cols);
  const order = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) order.push((top ? r : rows - 1 - r) * cols + c);
  const rank = new Map(order.slice(0, slots).map((cell, k) => [cell, k]));
  const cells = Array.from({ length: rows * cols }, (_, cell) => (rank.has(cell)
    ? `<span class="g3k-slot${rank.get(cell) < outline ? ' g3k-slot-o' : ''}" data-o="${rank.get(cell)}"></span>`
    : '<span class="g3k-slot-x"></span>')).join('');
  return `<div class="g3k-cage${wide ? ' g3k-cage-wide' : ''}" data-cage="${i}">
    ${CAGE_BACK}
    <div class="g3k-roof" data-roof></div>
    <div class="g3k-slots" style="--cols:${cols};--rows:${rows}">${cells}</div>
    ${CAGE_FRONT}
    <span class="g3k-cap" data-cap>${label}</span>
  </div>`;
}
const cageCols = (s) => (s <= 3 ? s : s === 4 ? 2 : 3);

function modeNet(c) {
  const { m, sky, ground, fx, say, s, n } = c;
  const name = BIRDS[m.sp].name;
  // ── Bố cục lồng: giữ đủ chỗ từ đầu lượt (số lồng giữ chỗ không để lộ đáp án).
  let cages;
  if (m.kind === 'add') cages = cageHtml(0, 20, 10, { outline: m.b, label: `${m.b} chỗ`, wide: true, top: true });
  else if (m.kind === 'mul' || m.kind === 'two') cages = Array.from({ length: m.k }, (_, i) => cageHtml(i, m.s, cageCols(m.s), { outline: m.s, label: `${m.s} con` })).join('');
  else if (m.kind === 'share') cages = Array.from({ length: m.k }, (_, i) => cageHtml(i, m.q, Math.min(3, m.q))).join(''); // ô không viền: không lộ đáp án
  else cages = Array.from({ length: 6 }, (_, i) => cageHtml(i, m.s, cageCols(m.s), { outline: m.s, label: `${m.s} con` })).join('');
  const nCages = m.kind === 'add' ? 1 : m.kind === 'share' || m.kind === 'mul' || m.kind === 'two' ? m.k : 6;
  ground.innerHTML = `
    <div class="g3k-platform">
      <button type="button" class="g3k-bag" data-bag>${NET_BAG}<b class="g3k-bagn" data-bagn>0</b></button>
      <div class="g3k-cages" style="--n:${nCages};--pc:${nCages <= 4 ? nCages : 3}" data-cages>${cages}</div>
    </div>`;
  const bag = ground.querySelector('[data-bag]');
  const bagN = ground.querySelector('[data-bagn]');
  const cageEls = [...ground.querySelectorAll('[data-cage]')];
  const slotsOf = (i) => [...cageEls[i].querySelectorAll('.g3k-slot')].sort((a, b) => a.dataset.o - b.dataset.o);
  const fill = (slot) => { slot.innerHTML = perched(m.sp); slot.classList.add('g3k-slot-full'); };
  const countIn = (i) => cageEls[i].querySelectorAll('.g3k-slot-full').length;
  let inBag = 0;
  const setBag = (v) => { inBag = v; bagN.textContent = v; bag.classList.toggle('g3k-bag-has', v > 0); };

  // Bay một con chim từ khung `from` vào ô `slot` (ô được tô khi chim đáp).
  const flyTo = (from, slot, delay = 0) => new Promise(res => {
    flyOne(perched(m.sp), from, rectOf(slot), { delay, minMs: 380, maxMs: 700, onLand: () => { fill(slot); sfx.pop(2); res(); } });
  });
  const freeSlot = (i) => slotsOf(i).find(x => !x.classList.contains('g3k-slot-full') && !x.dataset.taken);
  const take = (slot) => { slot.dataset.taken = '1'; return slot; };

  let answered = false, answer = null, busy = false;
  // Trên trời chưa được bắt khi chưa tính xong: lưới không chụp, máy tính rung và khách nhắc.
  const needAnswer = (line) => { s.nudge(); s.speak(line, null, line); };

  /** Chim đơn / đàn nhỏ bay trên trời (bắt từng con, từng đàn). */
  const lanes = [0.2, 0.34, 0.27];
  const spawn = (size, lane, startX) => {
    const flip = lane % 2 === 1;
    let el, relayout = null;
    if (size === 1) el = flyingBird(m.sp, { flip });
    else {
      const f = makeFlock(m.sp, [size], { flip });
      el = f.el;
      el.classList.add('g3k-mini');
      relayout = () => f.layout(sky.W * 0.22, sky.H * 0.17, sky.H * 0.1);
      relayout();
    }
    const it = sky.add(el, { x: startX, y: lanes[lane % lanes.length], vx: (flip ? -1 : 1) * (0.07 + lane * 0.012), size, relayout });
    el.addEventListener('pointerdown', (e) => { e.preventDefault(); onTapFlyer(it); });
    return it;
  };

  let onTapFlyer = () => {};
  const catchFx = (it) => netDrop(fx, it.px, it.py, it.w * 1.25);

  // ── Cấp bắt thêm / nhân / hai bước: tính trước, rồi bắt.
  if (m.kind === 'add' || m.kind === 'mul' || m.kind === 'two') {
    if (m.kind === 'add') for (let k = 0; k < m.a; k++) fill(slotsOf(0)[k]);
    const size = m.kind === 'add' ? 1 : m.s;
    [0, 1, 2].forEach(l => spawn(size, l, [0.1, 0.75, 0.45][l]));
    let need = 0, caught = 0, nextCage = 0;
    const lines = {
      add: [`Lồng có ${m.a} con ${name.replace(/^chim /, '')}. Cần đủ ${m.b} con. Phải bắt thêm mấy con?`, `Lồng có ${m.a} con. Cần đủ ${WANT(`${m.b} con`)}.`],
      mul: [`Có ${m.k} lồng, mỗi lồng ${m.s} con. Cần bắt tất cả bao nhiêu con?`, `${m.k} lồng, mỗi lồng ${WANT(`${m.s} con`)}.`],
      two: [`Bắt chim cho đầy ${m.k} lồng, mỗi lồng ${m.s} con. Sau đó thả ${m.r} con bay đi. Còn lại bao nhiêu con?`, `${m.k} lồng × ${m.s} con, thả ${WANT(`${m.r} con`)}.`],
    }[m.kind];
    say(lines[1]);
    s.speak(lines[0], null, lines[1]);
    const bill = {
      add: s.row('🏠', 'Trong lồng', `${m.a} con`) + s.row('🎯', 'Cần có', `${m.b} con`) + s.row('🥅', 'Bắt thêm', Q, true),
      mul: s.row('🏠', 'Số lồng', `${m.k} lồng`) + s.row('🐦', 'Mỗi lồng', `${m.s} con`) + s.row('🥅', 'Tất cả', Q, true),
      two: s.row('🏠', `${m.k} lồng`, `${m.s} con`) + s.row('🕊️', 'Thả đi', `${m.r} con`) + s.row('🐦', 'Còn lại', Q, true),
    }[m.kind];
    s.ask(bill, 'con', (v, pad) => {
      pad.lock();
      answered = true; answer = v;
      if (m.kind === 'add') {
        need = v;
        if (need === 0 || need > m.b - m.a + 6) return finishAdd(); // không bắt nổi / không cần bắt: kiểm tra luôn
        say(`Vung lưới bắt ${WANT(`${need} con`)}: <b data-got>0</b>/${need}`);
        s.speak(`Chạm vào chim để vung lưới bắt ${need} con!`, null, `Bắt ${need} con!`);
      } else {
        say(`Chạm vào đàn ${m.s} con để bắt!`);
        s.speak(`Chạm vào từng đàn ${m.s} con để bắt, bỏ đầy ${m.k} lồng!`, null, 'Chạm vào đàn chim!');
      }
    });
    onTapFlyer = async (it) => {
      if (!answered) return needAnswer(m.kind === 'add' ? 'Tính trước: cần bắt thêm mấy con?' : m.kind === 'mul' ? 'Tính trước: cần bắt tất cả bao nhiêu con?' : 'Tính trước: còn lại bao nhiêu con?');
      if (busy || it.leave) return;
      if (m.kind !== 'add' && nextCage >= m.k) return;
      busy = true;
      catchFx(it);
      it.frozen = true;
      await sleep(260);
      const birds = it.size === 1 ? [it.el] : [...it.el.querySelectorAll('.g3k-fb')];
      const from = birds.map(rectOf);
      const lane = [...sky.items].indexOf(it);
      sky.remove(it);
      if (m.kind === 'add') {
        caught++;
        const slot = freeSlot(0);
        const roof = cageEls[0].querySelector('[data-roof]');
        if (slot) await flyTo(from[0], take(slot));
        else { // lồng đã đầy: chim thừa đậu trên nóc lồng
          const sp = document.createElement('span');
          sp.className = 'g3k-roofbird';
          roof.appendChild(sp);
          await new Promise(r => flyOne(perched(m.sp), from[0], rectOf(sp), { minMs: 380, maxMs: 700, onLand: () => { sp.innerHTML = perched(m.sp); sfx.pop(2); r(); } }));
        }
        const got = c.board.querySelector('[data-got]');
        if (got) got.textContent = caught;
        busy = false;
        if (caught >= need) return finishAdd();
        spawn(1, (lane + 1) % 3, Math.random() < 0.5 ? -0.1 : 1.1);
      } else {
        const ci = nextCage++;
        await Promise.all(from.map((r, k) => flyTo(r, take(freeSlot(ci)), k * 70)));
        busy = false;
        if (nextCage >= m.k) return m.kind === 'mul' ? finishMul() : startRelease();
        if (sky.items.size < 2) spawn(m.s, nextCage % 3, Math.random() < 0.5 ? -0.15 : 1.15);
      }
    };
    const finishAdd = async () => {
      await sky.scatter();
      const total = m.a + need;
      say(`${m.b} ${MINUS} ${m.a} = <b class="g3k-ans">${m.b - m.a}</b>`);
      const right = need === m.b - m.a;
      const fact = `Lồng có ${m.a} con, cần đủ ${m.b} con: ${m.b} ${MINUS} ${m.a} = <b>${m.b - m.a}</b>. Bắt thêm ${m.b - m.a} con.`;
      if (right) { await release([0]); return c.ok(fact, `Lồng đầy rồi! Thả chim bay thôi!`); }
      cageEls[0].classList.add(total < m.b ? 'g3k-cage-short' : 'g3k-cage-over');
      c.bad(total < m.b ? `Lồng còn ${m.b - total} chỗ trống!` : `Thừa ${total - m.b} con, không còn chỗ!`, fact,
        `Cần có ${m.b} con, trong lồng đã có ${m.a} con: lấy ${m.b} ${MINUS} ${m.a} để biết phải bắt thêm mấy con.`);
    };
    const finishMul = async () => {
      await sky.scatter();
      await countCages(m.k);
      say(`${m.s} × ${m.k} = <b class="g3k-ans">${m.ans}</b>`);
      const fact = `${m.k} lồng, mỗi lồng ${m.s} con: ${m.s} × ${m.k} = <b>${m.ans}</b> con.`;
      if (answer === m.ans) { await release([...Array(m.k).keys()]); return c.ok(fact, `Đúng rồi, ${m.ans} con!`); }
      c.bad(`Tất cả ${m.ans} con mới đúng!`, fact, `Mỗi lồng ${m.s} con, có ${m.k} lồng: lấy ${m.s} × ${m.k}.`);
    };
    // Hai bước: lồng đầy rồi thì thả r con (nút ở chỗ túi lưới), đếm số còn lại.
    const startRelease = async () => {
      await sky.scatter();
      bag.innerHTML = `<span class="g3k-free-btn">🕊️<b>Thả ${m.r} con</b></span>`;
      bag.classList.add('g3k-bag-free');
      c.hint(bag);
      say(`Chạm ${WANT('🕊️ Thả')} để thả ${m.r} con!`);
      s.speak(`Lồng đầy rồi! Chạm nút Thả để thả ${m.r} con bay đi.`, null, `Thả ${m.r} con!`);
      bag.onclick = async () => {
        if (busy) return;
        busy = true;
        bag.disabled = true;
        const full = cageEls.flatMap((_, i) => slotsOf(i).filter(x => x.classList.contains('g3k-slot-full'))).reverse().slice(0, m.r);
        for (const slot of full) {
          slot.classList.remove('g3k-slot-full');
          slot.classList.add('g3k-slot-o');
          const svg = slot.querySelector('svg');
          if (svg) { svg.classList.add('g3k-away'); setTimeout(() => { slot.innerHTML = ''; }, 900); }
          sfx.swish();
          await sleep(calmMotion() ? 260 : 180);
        }
        await sleep(900);
        await countCages(m.k);
        say(`${m.s} × ${m.k} ${MINUS} ${m.r} = <b class="g3k-ans">${m.ans}</b>`);
        const fact = `Bắt ${m.k} lồng × ${m.s} con: ${m.s} × ${m.k} = ${m.k * m.s} con. Thả ${m.r} con: ${m.k * m.s} ${MINUS} ${m.r} = <b>${m.ans}</b> con.`;
        if (answer === m.ans) { await release([...Array(m.k).keys()]); return c.ok(fact, `Đúng rồi, còn ${m.ans} con!`); }
        c.bad(`Còn lại ${m.ans} con mới đúng!`, fact, 'Bước 1: tính số chim bắt được (phép nhân). Bước 2: bớt đi số chim đã thả (phép trừ).');
      };
    };
  } else {
    // ── Cấp chia: vung lưới bắt cả đàn, tính, rồi chạm túi lưới để chia vào lồng.
    const f = makeFlock(m.sp, chunk(m.N, 9));
    const relayout = () => f.layout(sky.W * 0.42, sky.H * 0.3, sky.H * 0.1);
    relayout();
    const it = sky.add(f.el, { x: 0, y: 0.32, vx: 0.08, relayout });
    it.x = it.w / sky.W / 2 + 0.06;
    f.el.addEventListener('pointerdown', (e) => { e.preventDefault(); onTapFlyer(it); });
    const short = name.replace(/^chim /, '');
    say(`Vung lưới bắt đàn ${short}!`);
    s.speak(`Đàn ${name} bay qua kìa! Chạm vào đàn chim để vung lưới bắt cả đàn.`, null, 'Chạm vào đàn chim!');
    let caught = false, round = 0, cageI = 0;
    const lines = {
      share: [`Bắt được ${m.N} con. Chia đều vào ${m.k} lồng thì mỗi lồng mấy con?`, `${m.N} con chia đều ${WANT(`${m.k} lồng`)}.`,
        s.row('🐦', 'Bắt được', `${m.N} con`) + s.row('🏠', 'Chia đều', `${m.k} lồng`) + s.row('🏠', 'Mỗi lồng', Q, true)],
      group: [`Bắt được ${m.N} con. Mỗi lồng ${m.s} con thì được mấy lồng?`, `${m.N} con, mỗi lồng ${WANT(`${m.s} con`)}.`,
        s.row('🐦', 'Bắt được', `${m.N} con`) + s.row('🏠', 'Mỗi lồng', `${m.s} con`) + s.row('🏠', 'Số lồng', Q, true)],
      rem: [`Bắt được ${m.N} con. Mỗi lồng ${m.s} con thì được mấy lồng đầy, còn thừa mấy con?`, `${m.N} con, mỗi lồng ${WANT(`${m.s} con`)}.`,
        s.row('🐦', 'Bắt được', `${m.N} con`) + s.row('🏠', 'Mỗi lồng', `${m.s} con`) + s.row('🏠', 'Lồng đầy', Q, true)],
    }[m.kind];
    let leftAns = null;
    const askMain = () => {
      say(lines[1]);
      s.speak(lines[0], null, lines[1]);
      s.ask(lines[2], m.kind === 'share' ? 'con' : 'lồng', (v, pad) => {
        pad.lock();
        answer = v;
        if (m.kind === 'rem' && leftAns === null) {
          const bill2 = s.row('🏠', 'Lồng đầy', `${v} lồng`) + s.row('🐦', 'Còn thừa', Q, true);
          s.speak('Còn thừa mấy con?', null, 'Còn thừa mấy con?');
          s.ask(bill2, 'con', (v2, pad2) => { pad2.lock(); leftAns = v2; readyToShare(); });
          return;
        }
        readyToShare();
      });
    };
    const readyToShare = () => {
      answered = true;
      bag.classList.add('g3k-bag-go');
      c.hint(bag);
      const line = m.kind === 'share' ? 'Chạm túi lưới: mỗi lồng một con!' : `Chạm túi lưới: bỏ ${m.s} con vào một lồng!`;
      say(line);
      s.speak(line, null, line);
    };
    onTapFlyer = async (fl) => {
      if (caught || busy) return;
      busy = true;
      catchFx({ px: fl.px, py: fl.py, w: Math.max(fl.w, fl.h * 1.3) });
      fl.frozen = true;
      await sleep(300);
      const birds = [...fl.el.querySelectorAll('.g3k-fb')];
      const step = Math.max(1, Math.ceil(birds.length / 14)); // tối đa 14 con bay thật, số trên túi tăng đủ
      const flights = birds.filter((_, k) => k % step === 0).map(b => rectOf(b));
      sky.remove(fl);
      let shown = 0;
      await Promise.all(flights.map((r, k) => new Promise(res => flyOne(perched(m.sp), r, rectOf(bag), {
        delay: k * 60, minMs: 380, maxMs: 650,
        onLand: () => { shown = Math.min(m.N, shown + step); setBag(k === flights.length - 1 ? m.N : shown); sfx.pop(k % 6); res(); },
      }))));
      setBag(m.N);
      caught = true;
      busy = false;
      askMain();
    };
    bag.onclick = async () => {
      if (!caught) { c.hint(f.el); s.speak('Chạm vào đàn chim để bắt trước!', null, 'Bắt chim trước!'); return; }
      if (!answered) return needAnswer(m.kind === 'share' ? 'Tính trước: mỗi lồng mấy con?' : m.kind === 'group' ? 'Tính trước: được mấy lồng?' : 'Tính trước: mấy lồng đầy, thừa mấy con?');
      if (busy || inBag === 0) return;
      busy = true;
      const from = rectOf(bag.querySelector('svg'));
      if (m.kind === 'share') {
        // Một lượt chia: mỗi lồng một con.
        round++;
        setBag(inBag - m.k);
        await Promise.all(cageEls.map((_, i) => flyTo(from, take(freeSlot(i)), i * 90)));
        cageEls.forEach((el, i) => { el.querySelector('[data-cap]').textContent = `${countIn(i)} con`; });
        busy = false;
        if (inBag === 0) finishDiv();
      } else if (inBag >= m.s) {
        const ci = cageI++;
        setBag(inBag - m.s);
        await Promise.all(Array.from({ length: m.s }, (_, k) => flyTo(from, take(freeSlot(ci)), k * 70)));
        cageEls[ci].classList.add('g3k-cage-done');
        busy = false;
        if (inBag === 0) finishDiv();
      } else {
        // Còn ít hơn một lồng: chim dư bay lên đậu nóc lồng kế tiếp.
        const roof = cageEls[cageI].querySelector('[data-roof]');
        const n0 = inBag;
        setBag(0);
        await Promise.all(Array.from({ length: n0 }, (_, k) => {
          const sp = document.createElement('span');
          sp.className = 'g3k-roofbird';
          roof.appendChild(sp);
          return new Promise(r => flyOne(perched(m.sp), from, rectOf(sp), { delay: k * 80, minMs: 380, maxMs: 650, onLand: () => { sp.innerHTML = perched(m.sp); sfx.pop(k); r(); } }));
        }));
        cageEls[cageI].classList.add('g3k-cage-roof');
        busy = false;
        finishDiv();
      }
    };
    const finishDiv = async () => {
      bag.classList.remove('g3k-bag-go');
      await sleep(400);
      const facts = {
        share: `${m.N} con chia đều vào ${m.k} lồng: ${m.N} : ${m.k} = <b>${m.q}</b>. Mỗi lồng ${m.q} con.`,
        group: `${m.N} con, mỗi lồng ${m.s} con: ${m.N} : ${m.s} = <b>${m.q}</b>. Được ${m.q} lồng.`,
        rem: `${m.N} : ${m.s} = ${m.q} (dư ${m.r}): <b>${m.q}</b> lồng đầy, thừa <b>${m.r}</b> con đậu trên nóc lồng.`,
      };
      say(m.kind === 'share' ? `${m.N} : ${m.k} = <b class="g3k-ans">${m.q}</b>` : m.kind === 'group' ? `${m.N} : ${m.s} = <b class="g3k-ans">${m.q}</b>` : `${m.N} : ${m.s} = <b class="g3k-ans">${m.q}</b> (dư <b class="g3k-ans">${m.r}</b>)`);
      const right = answer === m.ans && (m.kind !== 'rem' || leftAns === m.r);
      const used = m.kind === 'share' ? [...Array(m.k).keys()] : [...Array(m.q).keys()];
      if (right) { await release(used, m.kind === 'rem'); return c.ok(facts[m.kind], m.kind === 'share' ? `Đúng rồi, mỗi lồng ${m.q} con!` : `Đúng rồi, ${m.q} lồng!`); }
      const tips = {
        share: `Chia đều cho ${m.k} lồng là lấy số chim chia cho ${m.k}.`,
        group: `Mỗi lồng ${m.s} con: lấy số chim chia cho ${m.s} để biết được mấy lồng.`,
        rem: `Lấy ${m.N} chia cho ${m.s}: thương là số lồng đầy, số dư là số chim thừa (luôn bé hơn ${m.s}).`,
      };
      c.bad(m.kind === 'share' ? `Mỗi lồng ${m.q} con mới đúng!` : m.kind === 'group' ? `Được ${m.q} lồng mới đúng!` : `${m.q} lồng đầy, thừa ${m.r} con mới đúng!`, facts[m.kind], tips[m.kind]);
    };
  }

  /** Đếm số chim trong từng lồng, nhãn lồng hiện tổng tới lúc đó (5, 10, 15…). */
  async function countCages(k) {
    let sum = 0;
    for (let i = 0; i < k; i++) {
      const cap = cageEls[i].querySelector('[data-cap]');
      if (!countIn(i)) { cap.textContent = ''; continue; } // lồng trống (đã thả hết): không ghi số
      sum += countIn(i);
      cap.textContent = sum;
      cap.classList.add('g3k-cap-sum');
      cageEls[i].classList.add('g3k-cage-done');
      sfx.pop(i);
      await sleep(calmMotion() ? 600 : 450);
    }
  }
  /** Làm đúng: mở lồng, chim bay đi (trạm đã đeo vòng cho chim). */
  async function release(idx, roofToo = false) {
    idx.forEach((i, k) => {
      const birds = [...cageEls[i].querySelectorAll('.g3k-slot-full svg'), ...(roofToo || i === 0 ? cageEls[i].querySelectorAll('.g3k-roofbird svg') : [])];
      birds.forEach((b, j) => { b.style.animationDelay = `${(k * 3 + j) * 40}ms`; b.classList.add('g3k-away'); });
    });
    cageEls.forEach(el => el.querySelectorAll('.g3k-roofbird svg').forEach(b => b.classList.add('g3k-away')));
    sfx.swish();
    await sleep(1100);
  }
}

/** 23 → [9, 9, 5]: chia đàn đông thành các khối tối đa 9 con (để đàn gọn trên trời, không gợi ý phép chia). */
function chunk(N, size) {
  const out = [];
  for (let left = N; left > 0; left -= size) out.push(Math.min(size, left));
  return out;
}

// ════ 🎯 Ná cao su ═══════════════════════════════════════════════════════════════════════════════════════════
const SLING_SP = ['se', 'chaomao', 'sao', 'bocau', 'en', 'vit'];
const words = (t) => t.replace(/×/g, ' nhân ').replace(/:/g, ' chia ').replace(/\+/g, ' cộng ').replace(new RegExp(MINUS, 'g'), ' trừ ').replace(/\(/g, ' mở ngoặc ').replace(/\)/g, ' đóng ngoặc ');

/** Hai số nhiễu (lỗi hay gặp trước, rồi lệch 1, 2) — khác đáp án, khác nhau, dương. */
function decoys(rng, ans, prefer, n = 2) {
  const out = [];
  const okv = (v) => Number.isInteger(v) && v > 0 && v !== ans && !out.includes(v) && v < 10000;
  for (const v of prefer) if (out.length < n && okv(v)) out.push(v);
  for (const d of rng.shuffle([1, -1, 2, -2, 10, -10, 3])) if (out.length < n && okv(ans + d)) out.push(ans + d);
  return out;
}

const OPS = {
  // Lớp 2 — cộng, trừ qua 10 trong phạm vi 20.
  qua10(rng, lv) {
    if (lv.sign !== -1 && (lv.sign === 1 || rng() < 0.5)) {
      let a, b; do { a = rng.int(2, 9); b = rng.int(2, 9); } while (a + b < 11);
      const ans = a + b;
      return { text: `${a} + ${b}`, ans, wrong: decoys(rng, ans, [ans - 10, ans + 1, ans - 1]), tip: `${a} + ${b}: thêm ${10 - a} cho đủ 10, rồi thêm ${b - (10 - a)} nữa: ${ans}.` };
    }
    let a, b; do { a = rng.int(11, 18); b = rng.int(2, 9); } while (a % 10 >= b || a - b < 2);
    const ans = a - b;
    return { text: `${a} ${MINUS} ${b}`, ans, wrong: decoys(rng, ans, [b - (a - 10), ans + 1, ans - 1]), tip: `${a} ${MINUS} ${b}: bớt ${a - 10} cho tròn 10, rồi bớt tiếp ${b - (a - 10)}: ${ans}.` };
  },
  // Lớp 2 — cộng, trừ có nhớ trong phạm vi 100.
  carry100(rng, lv) {
    const two = lv.digits ? lv.digits === 2 : rng() < 0.6;
    if (lv.sign !== -1 && (lv.sign === 1 || rng() < 0.5)) {
      let a, b; do { a = rng.int(15, 78); b = two ? rng.int(12, 59) : rng.int(3, 9); } while ((a % 10) + (b % 10) < 10 || a + b > 99);
      const ans = a + b;
      return { text: `${a} + ${b}`, ans, wrong: decoys(rng, ans, [ans - 10, ans + 1, ans - 1]), tip: `Cộng đơn vị: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}, viết ${(a + b) % 10} nhớ 1 sang hàng chục: ${a} + ${b} = ${ans}.` };
    }
    let a, b; do { a = rng.int(31, 98); b = two ? rng.int(12, 69) : rng.int(3, 9); } while (a % 10 >= b % 10 || a - b < 5);
    const ans = a - b;
    return { text: `${a} ${MINUS} ${b}`, ans, wrong: decoys(rng, ans, [ans + 10, ans + 1, ans - 1]), tip: `${a % 10} không trừ được ${b % 10}: lấy ${10 + (a % 10)} ${MINUS} ${b % 10} = ${10 + (a % 10) - (b % 10)}, nhớ 1 sang hàng chục: ${a} ${MINUS} ${b} = ${ans}.` };
  },
  // Bảng nhân, bảng chia (lớp 2: bảng 2, 5; lớp 3: bảng 2 → 9).
  table(rng, lv) {
    const t = rng.pick(lv.tables || lv.pool);
    const k = rng.int(lv.kmin || 2, 10 - (lv.kmin ? 0 : 1));
    if (rng() < 0.5) {
      const ans = t * k;
      return { text: `${t} × ${k}`, ans, wrong: decoys(rng, ans, [t * (k + 1), t * (k - 1), ans + 1]), tip: `Bảng nhân ${t}: ${t} × ${k} = ${ans}.` };
    }
    return { text: `${t * k} : ${t}`, ans: k, wrong: decoys(rng, k, [k + 1, k - 1, t]), tip: `${t} × ${k} = ${t * k}, nên ${t * k} : ${t} = ${k}.` };
  },
  // Lớp 2 — cộng, trừ trong phạm vi 1 000.
  thousand(rng, lv) {
    const add = lv.add ?? rng() < 0.5;
    const carry = lv.carry ?? rng() < 0.5;
    for (let t = 0; t < 200; t++) {
      const a = rng.int(120, 880), b = rng.int(lv.carry === false ? 100 : 15, 499);
      const cu = add ? (a % 10) + (b % 10) >= 10 : a % 10 < b % 10;
      if (cu !== carry) continue;
      if (add && a + b > 999) continue;
      if (!add && a - b < 50) continue;
      if (carry && !add && Math.floor(a / 10) % 10 === 0) continue; // không mượn qua số 0 (lớp 2)
      if (carry && add && Math.floor(a / 10) % 10 + Math.floor(b / 10) % 10 >= 9) continue; // chỉ nhớ một lần
      const ans = add ? a + b : a - b;
      return add
        ? { text: `${a} + ${b}`, ans, wrong: decoys(rng, ans, carry ? [ans - 10, ans + 100] : [ans + 100, ans - 10, ans + 1]), tip: `Đặt tính rồi cộng từ phải sang trái: đơn vị, chục, trăm${carry ? ' (nhớ 1 sang hàng chục)' : ''}: ${a} + ${b} = ${ans}.` }
        : { text: `${a} ${MINUS} ${b}`, ans, wrong: decoys(rng, ans, carry ? [ans + 10, ans - 100] : [ans - 100, ans + 10, ans + 1]), tip: `Đặt tính rồi trừ từ phải sang trái: đơn vị, chục, trăm${carry ? ' (mượn 1 chục)' : ''}: ${a} ${MINUS} ${b} = ${ans}.` };
    }
    return OPS.qua10(rng, lv);
  },
  // Lớp 3 — nhân, chia số có hai, ba chữ số với số có một chữ số.
  big(rng) {
    const d = rng.int(2, 9);
    if (rng() < 0.5) {
      let a; do { a = rng() < 0.5 ? rng.int(12, 49) : rng.int(102, 329); } while (a * d > 999 || (a % 10) * d < 10);
      const ans = a * d;
      // Lỗi hay gặp: quên nhớ (nhân từng chữ số, chỉ giữ chữ số hàng đơn vị).
      const digs = String(a).split('').map(Number);
      const noCarry = Number(digs.map((x, i) => (i === 0 ? x * d : (x * d) % 10)).join(''));
      return { text: `${a} × ${d}`, ans, wrong: decoys(rng, ans, [noCarry, ans + 10, ans - d]), tip: `Nhân từ phải sang trái: ${a % 10} × ${d} = ${(a % 10) * d}, viết ${((a % 10) * d) % 10} nhớ ${Math.floor(((a % 10) * d) / 10)}… ${a} × ${d} = ${ans}.` };
    }
    let qn; do { qn = rng() < 0.5 ? rng.int(12, 49) : rng.int(102, 199); } while (qn * d > 999);
    const N = qn * d;
    return { text: `${N} : ${d}`, ans: qn, wrong: decoys(rng, qn, [qn + 10, qn - 10, qn + 1]), tip: `Chia từ trái sang phải. Thử lại: ${qn} × ${d} = ${N}.` };
  },
  // Lớp 3 — giá trị biểu thức (thứ tự thực hiện, dấu ngoặc).
  expr(rng) {
    const form = rng.int(0, 4);
    const a = rng.int(10, 60), b = rng.int(2, 9), c = rng.int(2, 9);
    if (form === 0) { const ans = a + b * c; return { text: `${a} + ${b} × ${c}`, ans, wrong: decoys(rng, ans, [(a + b) * c]), tip: `Nhân trước, cộng sau: ${b} × ${c} = ${b * c}, ${a} + ${b * c} = ${ans}.` }; }
    if (form === 1) { const x = Math.max(a, b * c + rng.int(5, 30)); const ans = x - b * c; return { text: `${x} ${MINUS} ${b} × ${c}`, ans, wrong: decoys(rng, ans, [(x - b) * c]), tip: `Nhân trước, trừ sau: ${b} × ${c} = ${b * c}, ${x} ${MINUS} ${b * c} = ${ans}.` }; }
    if (form === 2) { const p = rng.int(2, 9), ans = (p + b) * c; return { text: `(${p} + ${b}) × ${c}`, ans, wrong: decoys(rng, ans, [p + b * c]), tip: `Trong ngoặc trước: ${p} + ${b} = ${p + b}, rồi ${p + b} × ${c} = ${ans}.` }; }
    if (form === 3) { const y = b * c, ans = a + c; return { text: `${a} + ${y} : ${b}`, ans, wrong: decoys(rng, ans, [Number.isInteger((a + y) / b) ? (a + y) / b : ans + b]), tip: `Chia trước, cộng sau: ${y} : ${b} = ${c}, ${a} + ${c} = ${ans}.` }; }
    // (x − y) : b, y chia hết cho b: lỗi hay gặp là chia trước (x − y : b).
    const y = b * rng.int(2, 6), qn = rng.int(3, 9), x = y + b * qn;
    return { text: `(${x} ${MINUS} ${y}) : ${b}`, ans: qn, wrong: decoys(rng, qn, [x - y / b]), tip: `Trong ngoặc trước: ${x} ${MINUS} ${y} = ${x - y}, rồi ${x - y} : ${b} = ${qn}.` };
  },
};

function makeSling(rng, level, history) {
  const seen = new Set(history.map(h => h.text));
  let e;
  for (let t = 0; t < 40; t++) { e = OPS[level.op](rng, level); if (!seen.has(e.text)) break; }
  const values = rng.shuffle([e.ans, ...e.wrong]);
  const sps = rng.shuffle(SLING_SP).slice(0, values.length);
  return { ...e, values, sps };
}

function modeSling(c) {
  const { m, sky, ground, fx, field, say, s } = c;
  ground.innerHTML = `
    <div class="g3k-basket" data-basket>${BASKET}<span class="g3k-basket-in" data-bin></span></div>
    <div class="g3k-slingbox" data-sling>${SLING}<span class="g3k-hand" aria-hidden="true">👆</span></div>
    <div class="g3k-basket g3k-ghost" aria-hidden="true"></div>`;
  const slingBox = ground.querySelector('[data-sling]');
  const basketIn = ground.querySelector('[data-bin]');
  // Dây ná + đường ngắm + viên đạn: lớp vẽ phủ cả khung (toạ độ px của khung).
  fx.innerHTML = `<svg class="g3k-band" data-band><path data-aim stroke-dasharray="2 14" stroke-linecap="round"/><path data-b1/><path data-b2/></svg><span class="g3k-stone" data-stone>${STONE}</span>`;
  const band = fx.querySelector('[data-band]');
  const aim = fx.querySelector('[data-aim]');
  const b1 = fx.querySelector('[data-b1]'), b2 = fx.querySelector('[data-b2]');
  const stone = fx.querySelector('[data-stone]');

  // Ba con chim đeo vòng số, bay theo ba làn, hai hướng.
  const lanes = [0.25, 0.42, 0.59];
  const birds = m.values.map((v, i) => {
    const flip = i % 2 === 1;
    const el = flyingBird(m.sps[i], { flip, tag: v, cls: 'g3k-tagged' });
    const it = sky.add(el, { x: [0.2, 0.7, 0.45][i], y: lanes[i], vx: (flip ? -1 : 1) * (0.055 + i * 0.01), v });
    el.addEventListener('pointerdown', (e) => { e.preventDefault(); if (!shot) { c.hint(slingBox); say('Dùng ná để bắn: kéo dây ná xuống rồi thả tay!'); } });
    return it;
  });

  const geo = () => {
    const fr = rectOf(field), sr = rectOf(slingBox.querySelector('svg'));
    const sx = sr.width / 100, sy = sr.height / 140;
    const tips = SLING_TIPS.map(([x, y]) => [sr.left - fr.left + x * sx, sr.top - fr.top + y * sy]);
    return { tips, anchor: [(tips[0][0] + tips[1][0]) / 2, tips[0][1] + 4 * sy], unit: sr.height };
  };
  const stoneSize = () => Math.max(18, sky.H * 0.045);
  const putStone = (x, y) => {
    const z = stoneSize();
    Object.assign(stone.style, { width: `${z}px`, height: `${z}px`, transform: `translate(${x - z / 2}px, ${y - z / 2}px)` });
  };
  const drawBand = (p) => {
    band.setAttribute('viewBox', `0 0 ${sky.W} ${sky.H}`);
    const g = geo();
    const [px, py] = p || g.anchor;
    b1.setAttribute('d', `M${g.tips[0][0]} ${g.tips[0][1]} L${px} ${py}`);
    b2.setAttribute('d', `M${g.tips[1][0]} ${g.tips[1][1]} L${px} ${py}`);
    if (!shot) putStone(px, py);
  };
  let shot = null, misses = 0, over = false, pull = null;
  requestAnimationFrame(() => drawBand());
  new ResizeObserver(() => { if (!pull) drawBand(); }).observe(field);

  const MAXP = () => sky.H * 0.17;
  slingBox.addEventListener('pointerdown', (e) => {
    if (shot || over) return;
    e.preventDefault();
    try { slingBox.setPointerCapture(e.pointerId); } catch { /* sự kiện giả lập (trang xem trước) */ }
    slingBox.classList.add('g3k-pulling');
    pull = { x0: e.clientX, y0: e.clientY, dx: 0, dy: 0 };
  });
  slingBox.addEventListener('pointermove', (e) => {
    if (!pull) return;
    let dx = e.clientX - pull.x0, dy = e.clientY - pull.y0;
    const L = Math.hypot(dx, dy), mx = MAXP();
    if (L > mx) { dx *= mx / L; dy *= mx / L; }
    dy = Math.max(dy, 0); // chỉ kéo xuống (bắn lên trời)
    pull.dx = dx; pull.dy = dy;
    const g = geo();
    const p = [g.anchor[0] + dx, g.anchor[1] + dy];
    drawBand(p);
    // Đường ngắm: từ ná theo hướng ngược chiều kéo, tới mép trên khung.
    if (Math.hypot(dx, dy) > 8) {
      const ux = -dx / Math.hypot(dx, dy), uy = -dy / Math.hypot(dx, dy);
      const len = Math.min(sky.H * 1.2, uy < -0.05 ? (g.anchor[1] - 0) / -uy : sky.H);
      aim.setAttribute('d', `M${g.anchor[0]} ${g.anchor[1]} L${g.anchor[0] + ux * len} ${g.anchor[1] + uy * len}`);
    } else aim.setAttribute('d', '');
  });
  const release = () => {
    if (!pull) return;
    const { dx, dy } = pull;
    pull = null;
    slingBox.classList.remove('g3k-pulling');
    aim.setAttribute('d', '');
    const L = Math.hypot(dx, dy);
    if (L < sky.H * 0.035 || dy < 4) { drawBand(); return; }
    const g = geo();
    const speed = sky.H * (1.5 + (L / MAXP()) * 0.9); // px / giây
    shot = { x: g.anchor[0] + dx, y: g.anchor[1] + dy, vx: (-dx / L) * speed, vy: (-dy / L) * speed };
    slingBox.querySelector('.g3k-hand')?.remove();
    sfx.swish();
    drawBand();
  };
  slingBox.addEventListener('pointerup', release);
  slingBox.addEventListener('pointercancel', release);

  sky.onFrame((dt) => {
    if (!shot || over) return;
    shot.x += shot.vx * dt; shot.y += shot.vy * dt;
    putStone(shot.x, shot.y);
    const hit = birds.find(b => !b.leave && sky.items.has(b) && Math.hypot(b.px - shot.x, (b.py - b.h * 0.18) - shot.y) < b.w * 0.42);
    if (hit) return onHit(hit);
    if (shot.y < -20 || shot.x < -20 || shot.x > sky.W + 20) {
      shot = null;
      misses++;
      sfx.boing();
      drawBand();
      say(misses >= 2 ? `Ngắm theo đường chấm rồi thả tay! ${m.text} = ${BQ}` : `Trượt rồi, bắn lại! ${m.text} = ${BQ}`);
      if (misses >= 2) c.hint(slingBox);
    }
  });

  const onHit = async (b) => {
    over = true;
    shot = null;
    stone.style.transform = 'translate(-200px, -200px)';
    const right = b.v === m.ans;
    if (right) {
      // Chim giật mình, xù lông, sao quay quanh đầu, rơi xuống giỏ.
      sfx.pop(5);
      b.frozen = true;
      b.el.classList.add('g3k-dizzy');
      await sleep(500);
      b.frozen = false; b.vx = 0; b.vy = 0.05; b.g = 0.9; b.spin = 0;
      await new Promise(res => {
        const off = sky.onFrame(() => {
          if (b.y < 0.74) return;
          off();
          const from = rectOf(b.el.querySelector('svg'));
          sky.remove(b);
          flyOne(perched(m.sps[m.values.indexOf(b.v)]), from, rectOf(basketIn), { minMs: 380, maxMs: 600, onLand: () => { basketIn.innerHTML = `${perched(m.sps[m.values.indexOf(b.v)])}<span class="g3k-stars">💫</span>`; sfx.pop(7); res(); } });
        });
      });
      await sky.scatter();
      say(`${m.text} = <b class="g3k-ans">${m.ans}</b>`);
      return c.ok(`${m.text} = <b>${m.ans}</b>. Trúng rồi!`, `Trúng rồi! ${words(m.text)} bằng ${m.ans}.`);
    }
    // Trúng con mang số sai: nó kêu, bay vụt đi; con mang số đúng sáng lên.
    sfx.boing();
    b.el.classList.add('g3k-squawk');
    const good = birds.find(x => x.v === m.ans);
    good.el.classList.add('g3k-glow');
    good.frozen = true;
    await sleep(600);
    b.leave = true; b.vx = (b.vx >= 0 ? 1 : -1) * 0.8; b.vy = -0.5;
    await sleep(1100);
    say(`${m.text} = <b class="g3k-ans">${m.ans}</b>`);
    await sky.scatter();
    c.bad(`Con chim số ${m.ans} mới đúng!`, `${m.text} = <b>${m.ans}</b>, không phải ${b.v}.`, m.tip);
  };

  say(`${m.text} = ${BQ}`);
  s.speak(`Bắn con chim mang kết quả của ${words(m.text)}!`, null, `Bắn con chim số đúng!`);
}

// ════ Các cấp ════════════════════════════════════════════════════════════════════════════════════════════════
const NET_HOW_FIRST = [['🧮', 'Tính trước'], ['🥅', 'Bắt chim'], ['🏠', 'Bỏ vào lồng']];
const NET_HOW_DIV = [['🥅', 'Bắt cả đàn'], ['🧮', 'Tính'], ['🏠', 'Chia vào lồng']];
const SLING_HOW = [['🧮', 'Tính nhẩm'], ['🎯', 'Kéo dây ná'], ['🐦', 'Trúng chim số đúng']];

const LEVELS3 = {
  net: [
    { ...lv3('bird-net-1'), missions: 6, kind: 'div', pool: [3, 4, 5, 6, 7, 8, 9], tables: null, knowledge: 'bảng chia 3 đến bảng chia 9',
      ask: (n) => `Giúp ${n.me} chia chim vào lồng: chia đều, hoặc mỗi lồng mấy con!`,
      desc: '24 con chia đều vào 4 lồng: 24 : 4 = 6, mỗi lồng 6 con. 24 con, mỗi lồng 6 con: 24 : 6 = 4 lồng.', how: NET_HOW_DIV },
    { ...lv3('bird-net-2'), missions: 5, kind: 'rem', pool: [3, 4, 5, 6, 7, 8, 9], tables: null, knowledge: 'phép chia có dư',
      ask: (n) => `Mỗi lồng chỉ chứa được mấy con thôi, chim thừa thì đậu nóc lồng!`,
      desc: '17 con, mỗi lồng 5 con: 17 : 5 = 3 (dư 2). 3 lồng đầy, 2 con đậu trên nóc lồng.', how: NET_HOW_DIV },
    { ...lv3('bird-net-3'), missions: 5, kind: 'two', knowledge: 'bài toán giải bằng hai bước tính',
      ask: (n) => `Bắt chim cho đầy lồng, rồi thả bớt. Tính giúp ${n.me} còn lại bao nhiêu con!`,
      desc: '3 lồng, mỗi lồng 6 con: 6 × 3 = 18 con. Thả 5 con: 18 − 5 = 13 con.', how: [['🧮', 'Tính hai bước'], ['🥅', 'Bắt đầy lồng'], ['🕊️', 'Thả bớt']] },
  ],
  sling: [
    { ...lv3('bird-sling-1'), missions: 6, op: 'table', pool: [2, 3, 4, 5, 6, 7, 8, 9], tables: null, knowledge: 'bảng nhân 2 đến 9 và bảng chia 2 đến 9',
      ask: () => 'Hội làng thi bắn ná! Bắn trúng con chim mang đúng kết quả!', desc: '7 × 8 = 56: bắn con chim đeo vòng số 56.', how: SLING_HOW },
    { ...lv3('bird-sling-2'), missions: 6, op: 'big', knowledge: 'phép nhân với số có một chữ số và phép chia cho số có một chữ số',
      ask: () => 'Số lớn hơn rồi! Tính nhẩm hoặc đặt tính ra giấy, rồi bắn!', desc: '124 × 3 = 372: bắn con chim đeo vòng số 372.', how: SLING_HOW },
    { ...lv3('bird-sling-3'), missions: 6, op: 'expr', knowledge: 'tính giá trị biểu thức',
      ask: () => 'Nhân, chia trước; cộng, trừ sau. Trong ngoặc làm trước!', desc: '20 + 4 × 5 = 20 + 20 = 40 (không phải 120).', how: SLING_HOW },
  ],
};

const LEVELS2 = {
  net: [
    { ...lv2('bird2-net-1'), missions: 5, kind: 'add', knowledge: 'bài toán thêm và phép trừ trong phạm vi 20',
      ask: (n) => `Lồng còn chỗ trống! Tính xem phải bắt thêm mấy con cho đủ!`,
      desc: 'Lồng có 8 con, cần đủ 13 con: 13 − 8 = 5, bắt thêm 5 con.', how: NET_HOW_FIRST },
    { ...lv2('bird2-net-2'), missions: 5, kind: 'mul', pool: [2, 5], tables: null, knowledge: 'bảng nhân 2, bảng nhân 5',
      ask: (n) => `Mỗi lồng 2 con hoặc 5 con. Tính xem cần bắt tất cả bao nhiêu con!`,
      desc: '4 lồng, mỗi lồng 5 con: 5 × 4 = 20 con.', how: NET_HOW_FIRST },
    { ...lv2('bird2-net-3'), missions: 6, kind: 'div', pool: [2, 5], tables: null, knowledge: 'phép chia, bảng chia 2, bảng chia 5',
      ask: (n) => `Giúp ${n.me} chia chim vào lồng: chia đều, hoặc mỗi lồng mấy con!`,
      desc: '10 con chia đều vào 2 lồng: 10 : 2 = 5, mỗi lồng 5 con. 10 con, mỗi lồng 5 con: 10 : 5 = 2 lồng.', how: NET_HOW_DIV },
  ],
  sling: [
    { ...lv2('bird2-sling-1'), missions: 6, op: 'qua10', knowledge: 'phép cộng qua 10 và phép trừ qua 10',
      ask: () => 'Hội làng thi bắn ná! Bắn trúng con chim mang đúng kết quả!', desc: '8 + 7 = 15: bắn con chim đeo vòng số 15.', how: SLING_HOW },
    { ...lv2('bird2-sling-2'), missions: 6, op: 'carry100', knowledge: 'phép cộng có nhớ và phép trừ có nhớ trong phạm vi 100',
      ask: () => 'Cộng, trừ có nhớ! Nhớ 1 sang hàng chục!', desc: '46 + 28 = 74: bắn con chim đeo vòng số 74.', how: SLING_HOW },
    { ...lv2('bird2-sling-3'), missions: 6, op: 'table', pool: [2, 5], tables: null, kmin: 1, knowledge: 'bảng nhân 2, bảng nhân 5, bảng chia 2, bảng chia 5',
      ask: () => 'Bảng nhân, bảng chia 2 và 5! Bắn trúng con chim số đúng!', desc: '35 : 5 = 7: bắn con chim đeo vòng số 7.', how: SLING_HOW },
    { ...lv2('bird2-sling-4'), missions: 6, op: 'thousand', knowledge: 'phép cộng và phép trừ trong phạm vi 1 000',
      ask: () => 'Số có ba chữ số! Đặt tính ra giấy rồi bắn!', desc: '452 + 236 = 688: bắn con chim đeo vòng số 688.', how: SLING_HOW },
  ],
};

// ════ Ba quầy ════════════════════════════════════════════════════════════════════════════════════════════════
const MODES = {
  net: { npc: NPC_NET, make: makeNet, mount: modeNet, pad: true, unitWord: 'lượt bắt chim', icon: () => `<span style="display:inline-block;width:56px;height:56px">${NET_BAG}</span>`,
    summary: (ok, total) => `Em đã làm đúng <strong>${ok}/${total}</strong> lượt bắt chim cho trạm.` },
  sling: { npc: NPC_SLING, make: makeSling, mount: modeSling, pad: false, unitWord: 'lượt bắn', icon: () => `<span style="display:inline-block;width:46px;height:64px">${SLING}</span>`,
    summary: (ok, total) => `Em đã bắn trúng <strong>${ok}/${total}</strong> con chim mang số đúng.` },
};

function birdGame(mode, meta, levels, starPrefix) {
  const md = MODES[mode];
  return {
    ...meta,
    unitWord: md.unitWord,
    npcs: [md.npc],
    starPrefix,
    levels,
    againText: 'Chơi lại (đàn chim mới)',
    stallIcon: md.icon,
    summaryText: md.summary,
    howTo(level) { return [...level.how.map(([pic, label]) => ({ pic, label })), { pic: '😊', label: 'Trạm chim vui' }]; },
    /** Mở từ một bài học bảng nhân / chia: chỉ ra phép tính của bảng đó; bài cộng, trừ: chỉ phép của bài. */
    focus(level, f) {
      const out = { ...level };
      if (f.tables && 'tables' in level) out.tables = f.tables;
      if (f.sign && level.op === 'qua10') out.sign = f.sign;
      if (f.sign && level.op === 'carry100') { out.sign = f.sign; out.digits = f.digits; }
      if (f.op && level.op === 'thousand') { out.add = f.op === 'add'; out.carry = f.carry; }
      return out;
    },
    makeMission(rng, level, history) {
      return { ...md.make(rng, level, history), mode };
    },
    mountMission(stage, m, level, api) {
      injectBirdStyles();
      if (import.meta.env.DEV) window.__g3bird = m;
      const c = mountField(stage, m, api, { npc: md.npc, mode, pad: md.pad });
      md.mount(c);
    },
  };
}

export const BIRD_GAMES_G3 = ['net', 'sling'].map(md => birdGame(md, meta3(`bird-${md}`), LEVELS3[md], 'g3games'));
export const BIRD_GAMES_G2 = ['net', 'sling'].map(md => birdGame(md, meta2(`bird2-${md}`), LEVELS2[md], 'g2games'));
// Cho trang xem trước (scripts/games-preview.html?mod=grade3Games/birds.js&game=BIRD_NET_3…).
export const [BIRD_NET_3, BIRD_SLING_3] = BIRD_GAMES_G3;
export const [BIRD_NET_2, BIRD_SLING_2] = BIRD_GAMES_G2;

// ════ Kiểu dáng ══════════════════════════════════════════════════════════════════════════════════════════════
function injectBirdStyles() {
  if (document.getElementById('g3k-styles')) return;
  const st = document.createElement('style');
  st.id = 'g3k-styles';
  st.textContent = `
    .g3f-theme-bird .g3f-awning { background: repeating-linear-gradient(90deg, #65A30D 0 30px, #ECFCCB 30px 60px); border-bottom-color: #3F6212; }
    .g3f-theme-bird .g3f-counter { background: #ECFCCB; border-bottom-color: #4D7C0F; padding: .35rem; }
    .g3f-theme-bird .g3f-sign { display: none; }
    .g3k-nopad .g3f-ask { display: none; }
    .g3k-nopad .g3f-npc { flex: 1 1 auto; }
    .g3k-nopad .g3f-npc img { max-height: 420px; }
    .g3k-bench { flex: 1 1 0; min-height: 0; width: 100%; display: flex; font-family: 'Baloo 2', Quicksand, sans-serif; }
    /* Cảnh: trời + đồng quê phủ kín; mặt đất (dụng cụ, lồng, giỏ) giữ cố định ở đáy — chiều cao theo quầy. */
    .g3k-field { --gh: .22; position: relative; flex: 1 1 0; min-height: 0; overflow: hidden; border-radius: 1rem; border: 3px solid #3F6212;
      background: linear-gradient(#7DD3FC, #BAE6FD 45%, #E0F2FE 70%); container-type: size; touch-action: none; user-select: none; -webkit-user-select: none; }
    .g3k-mode-net .g3k-field { --gh: .4; }
    .g3k-mode-sling .g3k-field { --gh: .26; }
    .g3k-backdrop { position: absolute; left: 0; right: 0; bottom: calc(var(--gh) * 100% - 4px); width: 100%; height: 42%; display: block; }
    .g3k-ground { position: absolute; left: 0; right: 0; bottom: 0; height: calc(var(--gh) * 100%); z-index: 2; display: flex; align-items: stretch; justify-content: space-between; gap: 2%;
      padding: 1.2% 2%; box-sizing: border-box; background: linear-gradient(#4ADE80, #22C55E 30%, #16A34A); border-top: 3px solid #3F6212; }
    .g3k-air { position: absolute; inset: 0; z-index: 3; pointer-events: none; }
    .g3k-fx { position: absolute; inset: 0; z-index: 5; pointer-events: none; }
    .g3k-board { position: absolute; z-index: 6; top: 2%; left: 50%; transform: translateX(-50%); max-width: 94%; pointer-events: none; }
    .g3k-say { display: block; background: #fff; border: 4px solid #4D7C0F; border-radius: 1rem; padding: .05em .8em; box-shadow: 0 4px 0 #3F6212; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      font: 800 min(6.4cqh, 4.6cqi) 'Baloo 2', Quicksand, sans-serif; color: #365314; text-align: center; }
    .g3k-say .g3f-want { font-size: 1.12em; }
    .g3k-ans { color: #16A34A; }
    .g3k-q { display: inline-block; min-width: 1.1em; padding: 0 .15em; border-radius: .3em; background: #F97316; color: #fff; text-align: center; line-height: 1.15; }
    .g3k-it { position: absolute; left: 0; top: 0; pointer-events: auto; will-change: transform; cursor: pointer; touch-action: none; }
    .g3k-ghost { visibility: hidden; }
    .g3k-hint { animation: g3kNudge .6s ease; }
    @keyframes g3kNudge { 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
    .g3k-on .g3f-main > .g3g-result { bottom: auto; top: 14%; }

    /* Chim: viền trắng để nổi trên trời; cánh vỗ. */
    .g3k-bsvg { display: block; width: 100%; height: 100%; overflow: visible; filter: drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff); }
    .g3k-wing { transform-origin: 0px -4px; animation: g3kFlap .32s ease-in-out infinite alternate; }
    @keyframes g3kFlap { from { transform: scaleY(1); } to { transform: scaleY(-.55); } }
    @media (prefers-reduced-motion: reduce) { .g3k-wing { animation-duration: .7s; } }
    .g3k-fly { position: absolute; width: 22cqh; display: flex; flex-direction: column; align-items: center; }
    .g3k-fly > .g3k-bsvg { width: 100%; height: auto; aspect-ratio: 116 / 84; }
    .g3k-tagged { width: 19cqh; }
    .g3k-ring { display: flex; flex-direction: column; align-items: center; margin-top: -1.2cqh; }
    .g3k-string { width: 3px; height: 1.6cqh; background: ${'#3F3A40'}; }
    .g3k-ring b { min-width: 2.2em; padding: 0 .35em; border-radius: .7em; background: #fff; border: 3px solid #3F3A40; box-shadow: 0 3px 0 #F59E0B;
      font: 900 6.2cqh/1.15 'Baloo 2', Quicksand, sans-serif; color: #9A3412; text-align: center; }
    .g3k-dizzy .g3k-bsvg { animation: g3kShake .4s ease 2; }
    .g3k-dizzy::after { content: '💫'; position: absolute; top: -18%; left: 40%; font-size: 6cqh; animation: g3kSpin 1s linear infinite; }
    .g3k-squawk .g3k-bsvg { animation: g3kShake .3s ease 3; }
    .g3k-squawk::after { content: '!'; position: absolute; top: -20%; right: 4%; font: 900 9cqh/1 'Baloo 2', sans-serif; color: #DC2626; }
    .g3k-glow::before { content: ''; position: absolute; inset: -14%; border-radius: 50%; background: radial-gradient(closest-side, rgba(254,240,138,.95), rgba(254,240,138,0)); animation: g3kPulse 1s ease-in-out infinite; z-index: -1; }
    @keyframes g3kShake { 25% { transform: rotate(-12deg); } 75% { transform: rotate(12deg); } }
    @keyframes g3kSpin { to { transform: rotate(360deg); } }
    @keyframes g3kPulse { 50% { opacity: .5; } }

    /* Đàn chim xếp nhóm (makeFlock): mỗi con định vị tuyệt đối trong nhóm. */
    .g3k-flock { position: absolute; }
    .g3k-grp { position: absolute; border-radius: 1rem; }
    .g3k-fb { position: absolute; transform: translate(calc(var(--j) * 8%), calc(var(--j) * -10%)); }
    .g3k-fb .g3k-bsvg { width: 100%; height: 100%; }
    .g3k-mini { cursor: pointer; }

    /* 🥅 Bục gỗ: túi lưới bên trái, dãy lồng tre. Lồng giữ đủ chỗ từ đầu lượt. */
    .g3k-platform { flex: 1; display: flex; gap: 1.5%; align-items: stretch; background: #D6A15B; border: 4px solid #78350F; border-radius: 1rem; padding: 1%; box-shadow: 0 5px 0 #78350F; min-width: 0; }
    .g3k-bag { flex: 0 0 16%; position: relative; border: 4px solid #fff; border-radius: 1rem; background: linear-gradient(#ECFCCB, #BEF264); box-shadow: 0 5px 0 #4D7C0F; cursor: pointer; padding: 2%; touch-action: manipulation; display: grid; place-items: center; }
    .g3k-bag .g3k-netsvg { width: 100%; height: 100%; }
    .g3k-bagn { position: absolute; right: 4%; top: 4%; min-width: 1.6em; border-radius: 999px; background: #64748B; color: #fff; font: 900 6cqh/1.3 'Baloo 2', sans-serif; text-align: center; border: 3px solid #fff; }
    .g3k-bag-has .g3k-bagn { background: #EA580C; }
    .g3k-bag-go { animation: g3kGo 1.1s ease-in-out infinite; }
    @keyframes g3kGo { 50% { box-shadow: 0 5px 0 #4D7C0F, 0 0 0 7px #FDE68A; } }
    .g3k-bag-free { background: linear-gradient(#E0F2FE, #7DD3FC); box-shadow: 0 5px 0 #0369A1; }
    .g3k-free-btn { display: flex; flex-direction: column; align-items: center; font: 900 7cqh/1 'Baloo 2', sans-serif; color: #075985; }
    .g3k-free-btn b { font-size: .55em; }
    .g3k-cages { flex: 1; min-width: 0; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); gap: 1.5%; align-items: stretch; }
    .g3k-cage { position: relative; min-width: 0; padding-top: 14%; }
    .g3k-cage-bg, .g3k-cage-fg { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 86%; display: block; }
    .g3k-cage-fg { pointer-events: none; z-index: 2; }
    .g3k-slots { position: absolute; z-index: 1; left: 12%; right: 12%; top: 38%; bottom: 13%; display: grid; grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); grid-template-rows: repeat(var(--rows), minmax(0, 1fr)); gap: 2%; align-items: end; }
    .g3k-cage-wide .g3k-slots { left: 6%; right: 6%; top: 34%; }
    .g3k-slot { position: relative; min-width: 0; min-height: 0; height: 100%; display: grid; place-items: end center; }
    .g3k-slot svg { width: 100%; height: 100%; }
    .g3k-slot-x { min-width: 0; }
    .g3k-slot-o::before { content: ''; position: absolute; inset: 8%; border: 2px dashed rgba(120,53,15,.55); border-radius: 40%; }
    .g3k-slot-full::before { display: none; }
    .g3k-roof { position: absolute; z-index: 3; left: 4%; right: 4%; top: 0; height: 22%; display: flex; justify-content: center; gap: 2%; }
    .g3k-roofbird { height: 100%; aspect-ratio: 116 / 84; }
    .g3k-roofbird svg { width: 100%; height: 100%; }
    .g3k-cap { position: absolute; z-index: 3; left: 50%; bottom: -2%; transform: translateX(-50%); background: #FEF3C7; border: 3px solid #78350F; border-radius: .6rem; padding: 0 .4em; font: 800 4.2cqh/1.2 'Baloo 2', sans-serif; color: #7C2D12; white-space: nowrap; }
    .g3k-cap:empty { visibility: hidden; }
    .g3k-cap-sum { background: #F97316; color: #fff; border-color: #fff; }
    .g3k-cage-done .g3k-cage-bg path { fill: #FEF08A; opacity: 1; }
    .g3k-cage-short .g3k-slot-o:not(.g3k-slot-full)::before { border-color: #DC2626; border-style: solid; background: rgba(254,202,202,.6); }
    .g3k-cage-over .g3k-roof, .g3k-cage-roof .g3k-roof { background: rgba(254,226,226,.75); border-radius: .6rem; }
    .g3k-away { animation: g3kAway .9s cubic-bezier(.5,0,.8,.5) both; }
    @keyframes g3kAway { to { transform: translate(40%, -260%) scale(.8); opacity: 0; } }
    .g3k-netdrop { position: absolute; animation: g3kDrop .5s ease-out both; }
    .g3k-netdrop svg { width: 100%; height: 100%; }
    @keyframes g3kDrop { from { transform: translateY(-50%) scale(1.3); opacity: 0; } 60% { opacity: 1; } to { transform: none; opacity: .9; } }

    /* 🎯 Ná to ở giữa, giỏ bên trái; dây ná + đường ngắm vẽ trên lớp phủ. */
    .g3k-basket { flex: 0 0 20%; position: relative; display: flex; align-items: flex-end; justify-content: center; }
    .g3k-basketsvg { width: 100%; height: 80%; }
    .g3k-basket-in { position: absolute; left: 30%; right: 30%; bottom: 52%; aspect-ratio: 116 / 84; }
    .g3k-basket-in svg { width: 100%; height: 100%; }
    .g3k-stars { position: absolute; left: 50%; top: -40%; font-size: 4.5cqh; }
    .g3k-slingbox { position: relative; flex: 0 0 34%; align-self: stretch; display: flex; justify-content: center; align-items: flex-end; cursor: grab; touch-action: none; margin-top: -14cqh; }
    .g3k-slingsvg { height: 100%; width: auto; max-width: 100%; }
    .g3k-pulling { cursor: grabbing; }
    .g3k-hand { position: absolute; left: 50%; top: 22%; font-size: 7cqh; animation: g3kPull 1.6s ease-in-out infinite; pointer-events: none; }
    @keyframes g3kPull { 0%, 20% { transform: translate(-50%, 0); opacity: 0; } 35% { opacity: 1; } 75% { transform: translate(-50%, 60%); opacity: 1; } 100% { transform: translate(-50%, 60%); opacity: 0; } }
    .g3k-band { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
    .g3k-band path { fill: none; stroke: #F43F5E; stroke-width: 6; stroke-linecap: round; filter: drop-shadow(0 0 1.5px #3F3A40); }
    .g3k-band [data-aim] { stroke: #fff; stroke-width: 6; opacity: .9; filter: none; }
    .g3k-stone { position: absolute; left: 0; top: 0; display: block; }
    .g3k-stone svg { width: 100%; height: 100%; display: block; }

    @media (orientation: landscape) and (max-height: 500px) { .g3k-mode-net .g3k-field { --gh: .52; } }
    @media (orientation: portrait) {
      .g3k-mode-net .g3k-field { --gh: .44; }
      .g3k-cages { grid-template-columns: repeat(var(--pc), minmax(0, 1fr)); grid-auto-rows: minmax(0, 1fr); }
      .g3k-cages:has(.g3k-cage-wide) { grid-template-columns: 1fr; }
      .g3k-say { font-size: min(4.6cqh, 5.4cqi); }
      .g3k-fly { width: 15cqh; } .g3k-tagged { width: 14cqh; }
      .g3k-ring b { font-size: 4.6cqh; }
    }
  `;
  document.head.appendChild(st);
}
