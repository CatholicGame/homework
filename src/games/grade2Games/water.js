/**
 * 💧 Quầy nước (Chợ phiên của bé, lớp 2) — thiết kế: docs/lop_2/thiet-ke-tro-choi.md §4.3. Bám Bài 16 "Lít" và Bài 17, 18:
 *   fill / count (cấp 1; Bài 16 tiết 1 câu 3, Bài 17 tiết 2 câu 3, 4): bấm giữ vòi rót đầy ca 1 l, chạm ca để đổ vào
 *          đồ đựng; đầy thì bé tự bấm "Đầy rồi" (app không báo trước). fill: can ghi sẵn số lít, rót cho đầy.
 *          count: bình / xô / ấm chưa biết chứa mấy lít, rót đầy rồi gõ số lít (bằng số ca đã đổ).
 *          Đổ thêm khi đã đầy thì nước tràn ra sàn: lượt đó thất bại.
 *   cmp1   (cấp 2; Bài 16 tiết 1 câu 1): cốc, chai, bình, ấm… có nước; bé đổ vào ca 1 l rồi chọn câu như vở
 *          "… đựng nhiều hơn / ít hơn / đúng 1 l nước". Có lượt bình to mà ít nước, chai thon mà nhiều nước.
 *   addsub (cấp 3; Bài 16 tiết 2, Bài 18): "đổ hai can vào thùng" (cộng) / "can to rót ra đầy can nhỏ" (trừ).
 *          Bé gõ số trước, rồi bấm đổ nước: thùng có vạch lít cho thấy kết quả.
 * Dùng khung quầy của Chợ phiên lớp 3 (market/stall.js), theme 'water'.
 */

import {
  caVessel, canVessel, bucketVessel, jarVessel, bottleVessel, cupVessel, kettleVessel, tankVessel,
  barrelGeom, barrelSvg, streamSvg, puddleSvg, waterSvg, vesselIcon, INK,
} from './art/water.js';
import { stallMeta, levelMeta } from './catalog.js';
import { injectVegStyles, injectWaterStyles } from './styles.js';
import { NPCS, cap } from '../grade3Games/npc.js';
import { mountStall, Q } from '../grade3Games/market/stall.js';
import { calmMotion } from '../grade3Games/fly.js';
import { sfx } from '../preschool/fx.js';

const L = '<i class="g2w-l">l</i>'; // ký hiệu lít nghiêng như sách
const LT = (n) => `${n} ${L}`;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export const WATER_LEVELS = [
  {
    ...levelMeta('water-1'), missions: 5, kind: 'fill',
    knowledge: 'lít, ca 1 lít',
    ask: (n) => `${cap(n.you)} dùng ca 1 lít rót nước giúp ${n.me}!`,
    desc: 'Bấm giữ vòi rót đầy ca 1 l, chạm ca để đổ vào can. Can 4 l đầy sau 4 ca 1 l.',
    how: [['💧', 'Rót đầy ca'], ['ca', 'Đổ vào can'], ['✓', 'Đầy rồi']],
  },
  {
    ...levelMeta('water-2'), missions: 5, kind: 'cmp1',
    knowledge: 'lít, nhiều hơn, ít hơn 1 lít',
    ask: (n) => `${cap(n.you)} xem đồ đựng nào có nhiều hơn 1 lít nước!`,
    desc: 'Đổ nước vào ca 1 l. Ca chưa tới vạch là ít hơn 1 l; ca đầy mà vẫn còn nước là nhiều hơn 1 l.',
    how: [['🫗', 'Đổ vào ca'], ['ca', 'Nhìn vạch 1 l'], ['👆', 'Chọn câu đúng']],
  },
  {
    ...levelMeta('water-3'), missions: 5, kind: 'addsub',
    knowledge: 'cộng, trừ với đơn vị lít',
    ask: (n) => `${cap(n.you)} tính số lít nước rồi đổ ra kiểm tra giúp ${n.me}!`,
    desc: 'Can 5 l và can 3 l đổ vào thùng: 5 l + 3 l = 8 l. Can to có 12 l, rót ra đầy can 4 l: còn 12 l − 4 l = 8 l.',
    how: [['🧮', 'Gõ số lít'], ['🫗', 'Đổ nước'], ['📏', 'Xem vạch']],
  },
];

// ── Sinh nhiệm vụ ───────────────────────────────────────────────────────────────────────────────
const CAN_COLORS = ['#F4A259', '#7BCB8B', '#F07167', '#B9A7F0'];
const COUNT_KINDS = [
  { kind: 'xo', name: 'xô', caps: [3, 4, 5, 6] },
  { kind: 'binh', name: 'bình', caps: [2, 3, 4, 5] },
  { kind: 'am', name: 'ấm', caps: [2, 3] },
  { kind: 'can', name: 'can', caps: [3, 4, 5, 6] },
];
// Cấp 2: đồ đựng (cap = sức chứa, v = lượng nước đang có). tricky: nhìn dễ nhầm (bình to ít nước, chai thon nhiều nước).
const CMP_POOL = {
  less: [
    { kind: 'coc', name: 'cốc', cap: 0.5, v: 0.4 }, { kind: 'coc', name: 'cốc', cap: 0.5, v: 0.3 },
    { kind: 'chai', name: 'chai', cap: 0.5, v: 0.5 }, { kind: 'am', name: 'ấm', cap: 2, v: 0.6 },
  ],
  equal: [
    { kind: 'chai', name: 'chai', cap: 1, v: 1 }, { kind: 'binh', name: 'bình', cap: 2, v: 1 }, { kind: 'am', name: 'ấm', cap: 2, v: 1 }, { kind: 'can', name: 'can', cap: 2, v: 1 },
  ],
  more: [
    { kind: 'binh', name: 'bình', cap: 3, v: 2 }, { kind: 'can', name: 'can', cap: 5, v: 3 },
    { kind: 'xo', name: 'xô', cap: 5, v: 2.5 }, { kind: 'am', name: 'ấm', cap: 2, v: 1.6 },
  ],
  trickyLess: [{ kind: 'binh', name: 'bình', cap: 4, v: 0.6, tricky: true }, { kind: 'xo', name: 'xô', cap: 6, v: 0.7, tricky: true }],
  trickyMore: [{ kind: 'chai', name: 'chai', cap: 2, v: 1.8, tricky: true }],
};
const ANS_OF = { less: 'less', equal: 'equal', more: 'more', trickyLess: 'less', trickyMore: 'more' };

function shuffle(rng, arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = rng.int(0, i); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const lastOf = (h) => h[h.length - 1];

function makeFill(rng, history) {
  const i = history.length;
  const prev = lastOf(history);
  if (i % 2 === 0) {
    // fill: can ghi số lít
    const caps = [2, 3, 4, 5, 6].filter(c => c !== prev?.cap && !history.some(h => h.mode === 'fill' && h.cap === c));
    return { mode: 'fill', kind: 'can', name: 'can', cap: rng.pick(caps.length ? caps : [3, 4, 5]), color: rng.pick(CAN_COLORS) };
  }
  const used = history.map(h => h.kind);
  const pool = COUNT_KINDS.filter(k => !used.includes(k.kind) || k.kind === 'can');
  const k = rng.pick(pool.filter(x => x.kind !== 'can').length ? pool.filter(x => x.kind !== 'can') : COUNT_KINDS);
  return { mode: 'count', kind: k.kind, name: k.name, cap: rng.pick(k.caps), color: rng.pick(CAN_COLORS) };
}

function makeCmp(rng, history) {
  const plan = history[0]?.plan || ['more', ...shuffle(rng, ['less', 'equal', rng() < 0.5 ? 'trickyLess' : 'trickyMore', 'less'])];
  const type = plan[history.length % plan.length];
  const seen = new Set(history.map(h => `${h.obj.kind}${h.obj.v}`));
  const usedKinds = history.map(h => h.obj.kind);
  let pool = CMP_POOL[type].filter(o => !seen.has(`${o.kind}${o.v}`) && !usedKinds.includes(o.kind));
  if (!pool.length) pool = CMP_POOL[type].filter(o => !seen.has(`${o.kind}${o.v}`) && o.kind !== lastOf(history)?.obj.kind);
  if (!pool.length) pool = CMP_POOL[type];
  return { plan, type, obj: rng.pick(pool), ans: ANS_OF[type] };
}

function makeAddSub(rng, history) {
  const prev = lastOf(history);
  const op = prev ? (prev.op === 'add' ? 'sub' : 'add') : rng.pick(['add', 'sub']);
  const seen = new Set(history.map(h => `${h.op}${h.a}-${h.b}`));
  for (let t = 0; ; t++) {
    let a, b;
    if (op === 'add') { a = rng.int(2, 9); b = rng.int(1, 8); if (a === b || a + b > 18) continue; }
    else { a = rng.int(6, 15); b = rng.int(2, 6); if (a - b < 1) continue; }
    if (seen.has(`${op}${a}-${b}`) && t < 30) continue;
    const ans = op === 'add' ? a + b : a - b;
    return { op, a, b, ans, tankCap: Math.max(a, ans) > 10 ? 20 : 10, colors: shuffle(rng, CAN_COLORS).slice(0, 2) };
  }
}

const MAKERS = { fill: makeFill, cmp1: makeCmp, addsub: makeAddSub };

/** Đồ đựng của một nhiệm vụ. */
function vesselOf(kind, cap, opts = {}) {
  if (kind === 'can') return canVessel(cap, opts);
  if (kind === 'xo') return bucketVessel(cap, opts);
  const { color, ...glass } = opts; // bình, chai: thủy tinh trong, không tô màu thân
  if (kind === 'binh') return jarVessel(cap, glass);
  if (kind === 'chai') return bottleVessel(cap, glass);
  if (kind === 'coc') return cupVessel(cap);
  return kettleVessel(cap);
}

// ── Trò chơi ────────────────────────────────────────────────────────────────────────────────────
export const WATER_GAME = {
  ...stallMeta('water'),
  unitWord: 'khách',
  starPrefix: 'g2games',
  levels: WATER_LEVELS,
  stallIcon: () => vesselIcon(canVessel(5, { color: '#6FB7EA' }), 4, 56),
  summaryText: (ok, total) => `Em đã đong nước đúng cho <strong>${ok}/${total}</strong> khách.`,

  howTo(level) {
    const pic = (p) => (p === 'ca' ? vesselIcon(caVessel(), 1, 44) : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '😊', label: 'Khách vui' }];
  },

  makeMission(rng, level, history) {
    const m = MAKERS[level.kind](rng, history);
    const recent = history.slice(-3).map(x => x.npc.id);
    return { ...m, level: level.kind, npc: rng.pick(NPCS.filter(n => !recent.includes(n.id))) };
  },

  mountMission(stage, m, level, api) {
    injectVegStyles();
    injectWaterStyles();
    if (import.meta.env.DEV) window.__g2water = m;
    return mountWater(stage, m, api);
  },
};

// ── Cảnh chung ──────────────────────────────────────────────────────────────────────────────────
const VBW = 640, VBH = 420, FY = 404;
// Màn dọc: quầy hẹp mà cao, xếp đồ vật sát nhau hơn để khung nhìn (ôm sát đồ vật) hẹp lại và cảnh to lên.
const narrow = () => matchMedia('(orientation: portrait)').matches;

/** Hoạt ảnh theo thời gian: fn(t 0..1) mỗi khung hình. */
function animate(ms, fn) {
  return new Promise((res) => {
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - t0) / ms);
      fn(t);
      if (t < 1) requestAnimationFrame(step); else res();
    };
    requestAnimationFrame(step);
  });
}
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/**
 * Một đồ đựng đặt trên cảnh: nhóm <g> gốc ở giữa đáy (x, y), nghiêng được quanh mỏ rót.
 * set(v) vẽ lại mặt nước; move({x, y, a}) đặt vị trí; spoutAt() toạ độ cảnh của mỏ rót.
 */
function placeVessel(layer, vs, x, y, v = 0, attrs = '') {
  layer.insertAdjacentHTML('beforeend', `<g ${attrs}><g data-back>${vs.back}</g><g data-water></g><g data-front>${vs.front}</g></g>`);
  const el = layer.lastElementChild;
  const water = el.querySelector('[data-water]');
  const st = { x, y, a: 0, v };
  const draw = () => el.setAttribute('transform', `translate(${st.x.toFixed(1)} ${st.y.toFixed(1)}) rotate(${st.a.toFixed(1)} ${vs.spout.x.toFixed(1)} ${vs.spout.y.toFixed(1)})`);
  const set = (nv) => { st.v = Math.max(0, nv); water.innerHTML = waterSvg(vs, st.v, st.a); };
  set(v);
  draw();
  return {
    el, vs, st, set, home: { x, y },
    move(p) { Object.assign(st, p); draw(); if ('a' in p) set(st.v); },
    spoutAt: () => ({ x: st.x + vs.spout.x, y: st.y + vs.spout.y }),
    surfaceY: () => st.y + vs.levelY(Math.min(st.v, vs.cap)),
    mouthAt: () => ({ x: st.x + vs.mouth.x, y: st.y + vs.mouth.y }),
  };
}

/** Nghiêng `src` đổ `amount` lít vào `dst` (đặt mỏ rót trên miệng dst). spill: phần tràn (dst đã đầy) chảy ra sàn. */
async function pour(src, dst, amount, { streamG, puddleG, msPerL = 650, keepTilt = false } = {}) {
  const home = { x: src.st.x, y: src.st.y, a: 0 };
  const mouth = dst.mouthAt();
  const tgt = { x: mouth.x - src.vs.spout.x - 6, y: mouth.y - src.vs.spout.y - 26 };
  const lift = { x: (home.x + tgt.x) / 2, y: Math.min(home.y, tgt.y) - 40 };
  sfx.swish?.();
  await animate(420, (t) => {
    const e = ease(t), u = 1 - e;
    src.move({ x: u * u * home.x + 2 * u * e * lift.x + e * e * tgt.x, y: u * u * home.y + 2 * u * e * lift.y + e * e * tgt.y });
  });
  await animate(260, (t) => src.move({ a: 62 * ease(t) }));
  const v0 = src.st.v, d0 = dst.st.v;
  const room = Math.max(0, dst.vs.cap - d0);
  let spilt = 0;
  await animate(Math.max(350, amount * msPerL), (t) => {
    const moved = amount * t;
    src.set(v0 - moved);
    const into = Math.min(moved, room);
    dst.set(d0 + into);
    spilt = moved - into;
    const s = src.spoutAt();
    const endY = spilt > 0 ? FY - 4 : dst.surfaceY();
    streamG.innerHTML = streamSvg(s.x + 3, s.y + 2, endY, 8);
    if (spilt > 0 && puddleG) puddleG.innerHTML = puddleSvg(mouth.x + 30, FY + 4, 60 + spilt * 70);
  });
  streamG.innerHTML = '';
  if (keepTilt) return spilt;
  await animate(220, (t) => src.move({ a: 62 * (1 - ease(t)) }));
  await animate(380, (t) => {
    const e = ease(t);
    src.move({ x: tgt.x + (home.x - tgt.x) * e, y: tgt.y + (home.y - tgt.y) * e });
  });
  return spilt;
}

function mountWater(stage, m, api) {
  const n = m.npc;
  const nopad = m.level === 'cmp1' || m.mode === 'fill';
  const signLine = { fill: 'Đong bằng ca 1 lít', cmp1: 'So với 1 lít', addsub: 'Cộng, trừ số lít' }[m.level];
  const s = mountStall(stage, {
    npc: n, api, theme: 'water', cameo: false,
    sign: `${vesselIcon(canVessel(4, { color: '#6FB7EA', label: false }), 3, 30)}<span><strong>Quầy nước</strong><br>${signLine}</span>`,
    counter: `
      <div class="g2w-scene"><svg class="g2w-svg" viewBox="0 0 ${VBW} ${VBH}" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <rect data-floor x="0" y="${FY}" width="${VBW}" height="14" rx="4" fill="#D6B98C"/>
        <g data-bg></g><g data-puddle></g><g data-items></g><g data-stream></g><g data-over></g>
      </svg></div>
      <div class="g2w-acts" data-acts></div>`,
  });
  if (nopad) stage.querySelector('.g3f-scene').classList.add('g2v-nopad');
  const { counter, main, speak, row, ask, nudge } = s;
  const svg = counter.querySelector('.g2w-svg');
  const layer = (k) => svg.querySelector(`[data-${k}]`);
  const bg = layer('bg'), items = layer('items'), streamG = layer('stream'), puddleG = layer('puddle'), over = layer('over');
  const acts = counter.querySelector('[data-acts]');
  // Thẻ kết quả: cất hàng nút, thu cảnh lên phía trên thẻ để bé vẫn thấy nước trong đồ đựng.
  new MutationObserver(() => requestAnimationFrame(() => {
    const card = main.querySelector(':scope > .g3g-result');
    if (!card) return;
    acts.hidden = true;
    counter.style.paddingBottom = `${card.offsetHeight + 12}px`;
  })).observe(main, { childList: true });
  const ok = (text, line) => { speak(line || `Cảm ơn ${n.you}!`, 'happy', line || `Cảm ơn ${n.you}! 🎉`); api.succeed(text); };
  const bad = (line, text, tip) => { speak(line, 'sad', line); api.fail(text, tip); };
  const btn = (label, attrs = '', cls = '') => `<button type="button" class="g3g-btn g2w-btn ${cls}" ${attrs}>${label}</button>`;
  const ctx = { m, n, svg, bg, items, streamG, puddleG, over, acts, speak, row, ask, nudge, ok, bad, btn };
  (m.level === 'fill' ? levelFill : m.level === 'cmp1' ? levelCmp : levelAddSub)(ctx);
  // Khung nhìn ôm sát đồ vật (chừa phía trên cho ca / can nhấc lên khi đổ): cảnh to hết cỡ quầy, không chừa khoảng trống.
  const boxes = [bg, items].map(g => g.getBBox()).filter(b => b.width);
  if (boxes.length) {
    const x0 = Math.min(...boxes.map(b => b.x)) - 22, x1 = Math.max(...boxes.map(b => b.x + b.width)) + 22;
    const y0 = Math.min(...boxes.map(b => b.y)) - 64;
    svg.setAttribute('viewBox', `${x0.toFixed(1)} ${y0.toFixed(1)} ${(x1 - x0).toFixed(1)} ${(FY + 14 - y0).toFixed(1)}`);
    const floor = svg.querySelector('[data-floor]');
    floor.setAttribute('x', x0.toFixed(1)); floor.setAttribute('width', (x1 - x0).toFixed(1));
  }
}

// ════ Cấp 1: rót bằng ca 1 lít ══════════════════════════════════════════════════════════════════
function levelFill({ m, n, svg, bg, items, streamG, puddleG, acts, speak, row, ask, nudge, ok, bad, btn }) {
  const bar = barrelGeom(18, 58, 118, 196);
  bg.innerHTML = barrelSvg(bar, false, FY);
  const tapG = bg.querySelector('[data-tap]');
  const ca = placeVessel(items, caVessel(), bar.nozzle.x, FY, 0, 'class="g2w-ca" data-ca');
  const labelled = m.mode === 'fill';
  const tvs = vesselOf(m.kind, m.cap, { color: m.color, label: labelled });
  const tgt = placeVessel(items, tvs, narrow() ? bar.nozzle.x + 60 + tvs.w / 2 + 70 : 470, FY, 0);
  const what = labelled ? `can ${m.cap} l` : m.name;
  const whatHtml = labelled ? `can <b>${LT(m.cap)}</b>` : `<b>${m.name}</b>`;

  acts.innerHTML = `${btn('💧 Giữ để rót', 'data-hold', 'g2w-hold')}${btn('🫗 Đổ vào ' + (labelled ? 'can' : m.name), 'data-pour', 'g2w-pour')}${btn('✓ Đầy rồi', 'data-full', 'g2w-full')}
    <span class="g2w-tally" data-tally aria-live="polite"></span>`;
  const tally = acts.querySelector('[data-tally]');
  let pours = 0, busy = false, done = false, holding = false;
  const drawTally = () => {
    tally.innerHTML = pours ? `Đã đổ: ${Array.from({ length: pours }, (_, i) => `<span class="g2w-cup">${vesselIcon(caVessel(), 1, 26)}<b>${i + 1}</b></span>`).join('')}` : '';
  };
  const hint = (sel) => { const el = acts.querySelector(sel); el.classList.remove('g2w-hint'); void el.offsetWidth; el.classList.add('g2w-hint'); };
  const setHint = () => {
    acts.querySelector('[data-hold]').classList.toggle('g2w-next', !busy && !done && ca.st.v < 1);
    acts.querySelector('[data-pour]').classList.toggle('g2w-next', !busy && !done && ca.st.v >= 1);
    svg.classList.toggle('g2w-ca-ready', !busy && !done && ca.st.v >= 1);
  };

  // Giữ vòi: ca đầy tới vạch 1 l thì vòi tự khoá (bé không phải canh).
  const RATE = 0.75; // lít / giây
  let last = 0;
  const flow = (now) => {
    if (!holding) return;
    const dt = last ? (now - last) / 1000 : 0;
    last = now;
    ca.set(Math.min(1, ca.st.v + dt * RATE));
    streamG.innerHTML = streamSvg(bar.nozzle.x, bar.nozzle.y + 2, ca.surfaceY(), 8);
    if (ca.st.v >= 1) {
      stopHold();
      sfx.ding?.();
      if (!pours) speak(`Ca đầy 1 lít rồi! Đổ vào ${what} đi!`, null, `Ca đầy <b>1 ${L}</b> rồi! 👉 Đổ vào ${whatHtml}`);
      return;
    }
    requestAnimationFrame(flow);
  };
  const startHold = (e) => {
    e?.preventDefault?.();
    if (busy || done || holding) return;
    if (ca.st.v >= 1) { speak('Ca đầy rồi, đổ vào đã!', null, 'Ca đầy rồi, 👉 đổ vào đã!'); hint('[data-pour]'); return; }
    holding = true; last = 0;
    bg.innerHTML = barrelSvg(bar, true, FY);
    requestAnimationFrame(flow);
  };
  function stopHold() {
    if (!holding) return;
    holding = false;
    streamG.innerHTML = '';
    bg.innerHTML = barrelSvg(bar, false, FY);
    setHint();
  }
  const holdBtn = acts.querySelector('[data-hold]');
  for (const el of [holdBtn, svg]) {
    el.addEventListener('pointerdown', (e) => { if (el === svg && !e.target.closest('[data-tap], .g2w-tap')) return; startHold(e); });
  }
  // Thả tay ở đâu cũng khoá vòi; rời màn chơi thì gỡ bộ nghe.
  const up = () => {
    if (!svg.isConnected) { window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); return; }
    stopHold();
  };
  window.addEventListener('pointerup', up);
  window.addEventListener('pointercancel', up);
  void tapG;

  const doPour = async () => {
    if (busy || done) return;
    if (ca.st.v < 1) { speak('Rót đầy ca 1 lít trước đã!', null, '👉 Giữ vòi rót đầy ca <b>1 l</b> trước!'); hint('[data-hold]'); return; }
    busy = true; setHint();
    const spilt = await pour(ca, tgt, 1, { streamG, puddleG });
    pours++;
    drawTally();
    busy = false;
    if (spilt > 0.01) {
      done = true; setHint();
      sfx.boing?.();
      return bad('Tràn ra ngoài rồi!', `${cap(what)} chỉ chứa được <b>${LT(m.cap)}</b>, đổ ${m.cap} ca là đầy.`,
        `Mỗi ca chứa 1 l. Nước tới vạch đỏ là ${what} đầy rồi: bấm "Đầy rồi", đừng đổ thêm.`);
    }
    sfx.pop?.(pours);
    setHint();
  };
  acts.querySelector('[data-pour]').onclick = doPour;
  svg.addEventListener('click', (e) => { if (e.target.closest('[data-ca]')) doPour(); });

  acts.querySelector('[data-full]').onclick = () => {
    if (busy || done) return;
    if (!pours) { speak(`Rót nước vào ${what} trước đã!`, null, `👉 Rót nước vào ${whatHtml} trước!`); hint('[data-hold]'); return; }
    done = true; setHint();
    acts.querySelectorAll('button').forEach(b => { b.disabled = true; });
    const full = tgt.st.v >= m.cap - 0.01;
    if (!full) {
      return bad(`${cap(what)} chưa đầy mà!`, `${cap(what)} mới có <b>${LT(pours)}</b>, còn thiếu <b>${LT(m.cap - pours)}</b> mới đầy.`,
        `Nhìn mặt nước: nước lên tới vạch đỏ là đầy. ${cap(what)} chứa được ${m.cap} l, cần đổ ${m.cap} ca 1 l.`);
    }
    if (m.mode === 'fill') return ok(`Can <b>${LT(m.cap)}</b> đầy sau <b>${m.cap} ca</b> 1 ${L}.`);
    // count: gõ số lít
    speak(`${cap(m.name)} này chứa được mấy lít nước?`, null, `${cap(m.name)} chứa được <b class="g3f-want">mấy lít</b>?`);
    ask(row(vesselIcon(caVessel(), 1, 28), `${cap(m.name)} chứa`, `${Q} ${L}`, true), 'l', (v, pad) => {
      pad.lock(v === m.cap ? 'g3g-keypad-ok' : 'g3g-keypad-bad');
      tally.classList.add('g2w-tally-show');
      if (v === m.cap) return ok(`${cap(m.name)} chứa được <b>${LT(m.cap)}</b> nước: đổ <b>${m.cap} ca</b> 1 ${L} là đầy.`);
      bad(`${cap(m.name)} chứa ${m.cap} lít cơ!`, `Em đã đổ <b>${m.cap} ca</b> 1 ${L}: ${m.name} chứa được <b>${LT(m.cap)}</b>.`,
        'Mỗi ca 1 l. Đếm số ca đã đổ là biết số lít.');
    });
  };

  const opening = labelled
    ? [`${cap(n.you)} rót đầy can ${m.cap} lít giúp ${n.me}! Dùng ca 1 lít để đong.`, `Rót đầy <b class="g3f-want">can ${LT(m.cap)}</b>!`]
    : [`${cap(m.name)} này chứa được mấy lít? ${cap(n.you)} dùng ca 1 lít rót cho đầy rồi đếm!`, `${cap(m.name)} chứa <b class="g3f-want">mấy lít</b>?`];
  speak(opening[0], null, opening[1]);
  setHint();
  void nudge;
}

// ════ Cấp 2: nhiều hơn, ít hơn, đúng 1 lít ══════════════════════════════════════════════════════
function levelCmp({ m, n, items, streamG, puddleG, acts, speak, ok, bad, btn }) {
  const o = m.obj;
  const vs = vesselOf(o.kind, o.cap, { color: '#6FB7EA', label: false });
  const obj = placeVessel(items, vs, 190, FY, o.v, 'class="g2w-obj" data-obj');
  const ca = placeVessel(items, caVessel(), narrow() ? 190 + vs.w / 2 + 130 : 440, FY, 0);
  const name = o.name;
  const WORDS = { more: 'nhiều hơn 1 l nước', less: 'ít hơn 1 l nước', equal: 'đúng 1 l nước' };
  const sentence = (a) => `${cap(name)} đựng ${WORDS[a].replace(' l ', ` ${L} `)}.`;
  acts.innerHTML = `${btn(`🫗 Đổ ${name} vào ca 1 ${L}`, 'data-pour', 'g2w-pour g2w-next')}
    <div class="g2v-choices" hidden>${['more', 'less', 'equal'].map((a, i) => `<button type="button" class="g2v-choice" data-a="${a}"><b>${'ABC'[i]}</b><span>${sentence(a)}</span></button>`).join('')}</div>`;
  const choices = acts.querySelector('.g2v-choices');
  let poured = false, busy = false;
  const doPour = async () => {
    if (poured || busy) return;
    busy = true;
    acts.querySelector('[data-pour]').hidden = true;
    await pour(obj, ca, Math.min(o.v, 1), { streamG, puddleG, msPerL: 1100 });
    busy = false; poured = true;
    const left = obj.st.v > 0.01;
    speak(ca.st.v >= 0.99 ? (left ? `Ca đầy 1 lít rồi mà ${name} vẫn còn nước!` : `Nước vừa tới vạch 1 lít!`) : 'Nước chưa tới vạch 1 lít.', null,
      '👉 Nhìn vạch <b>1 l</b> rồi chọn câu đúng!');
    choices.hidden = false;
  };
  acts.querySelector('[data-pour]').onclick = doPour;
  items.addEventListener('click', (e) => { if (e.target.closest('[data-obj]')) doPour(); });
  choices.addEventListener('click', (e) => {
    const b = e.target.closest('[data-a]');
    if (!b || choices.classList.contains('g2v-locked')) return;
    choices.classList.add('g2v-locked');
    choices.querySelector(`[data-a="${m.ans}"]`).classList.add('g2v-right');
    if (b.dataset.a === m.ans) {
      const extra = o.tricky ? (m.ans === 'less' ? ` ${cap(name)} to nhưng ít nước.` : ` ${cap(name)} thon nhưng nhiều nước.`) : '';
      return ok(`<b>${sentence(m.ans)}</b>${extra}`, `Đúng rồi! ${sentence(m.ans).replace(/<[^>]+>/g, '')}`);
    }
    b.classList.add('g2v-wrong');
    const tip = m.ans === 'more' ? `Ca đầy tới vạch 1 l mà ${name} vẫn còn nước: ${name} đựng nhiều hơn 1 l.`
      : m.ans === 'less' ? `Đổ hết nước mà ca chưa tới vạch 1 l: ${name} đựng ít hơn 1 l.${o.tricky ? ` Đồ đựng to chưa chắc đã nhiều nước.` : ''}`
        : 'Đổ hết nước thì vừa tới vạch 1 l: đúng 1 l.';
    bad('Nhìn lại vạch 1 lít nào!', `Câu đúng là: <b>${sentence(m.ans)}</b>`, tip);
  });
  speak(`${cap(name)} này đựng nhiều hơn hay ít hơn 1 lít nước? ${cap(n.you)} đổ vào ca 1 lít để xem!`, null,
    `${cap(name)} đựng <b class="g3f-want">nhiều hơn</b> hay <b class="g3f-want">ít hơn</b> 1 ${L}?`);
}

// ════ Cấp 3: cộng, trừ số lít ═══════════════════════════════════════════════════════════════════
function levelAddSub({ m, n, items, over, streamG, puddleG, acts, speak, row, ask, nudge, ok, bad, btn }) {
  const add = m.op === 'add';
  let tank, cans;
  if (add) {
    // can vẽ theo tỉ lệ vạch lít của thùng: 1 lít trong can = 1 lít trong thùng
    const tvs = tankVessel(m.tankCap, { w: 160, h: 290 });
    const ca1 = canVessel(m.a, { color: m.colors[0], unit: tvs.unit }), ca2 = canVessel(m.b, { color: m.colors[1], unit: tvs.unit });
    const x1 = 14 + ca1.w / 2, x2 = x1 + ca1.w / 2 + ca2.w / 2 + 18;
    cans = [placeVessel(items, ca1, x1, FY, m.a), placeVessel(items, ca2, x2, FY, m.b)];
    tank = placeVessel(items, tvs, narrow() ? x2 + ca2.w / 2 + 130 : Math.max(480, x2 + ca2.w / 2 + 100), FY, 0);
  } else {
    const tvs = tankVessel(m.tankCap, { w: 118, h: 250 });
    tank = placeVessel(items, tvs, 150, FY, m.a);
    const cb = canVessel(m.b, { color: m.colors[0], unit: tvs.unit });
    cans = [placeVessel(items, cb, narrow() ? 150 + 59 + cb.w / 2 + 70 : 470, FY, 0)];
  }
  const ops = add ? `${LT(m.a)} + ${LT(m.b)}` : `${LT(m.a)} − ${LT(m.b)}`;
  const q = add
    ? [`Đổ hết nước ở can ${m.a} lít và can ${m.b} lít vào thùng. Thùng có mấy lít nước?`, `Đổ hai can vào thùng: thùng có <b class="g3f-want">mấy lít</b>?`]
    : [`Can to có ${m.a} lít nước. Rót ra đầy can ${m.b} lít. Can to còn lại mấy lít nước?`, `Can to <b>${LT(m.a)}</b>, rót ra đầy can <b>${LT(m.b)}</b>: còn <b class="g3f-want">mấy lít</b>?`];
  acts.innerHTML = btn('🫗 Đổ nước kiểm tra', 'data-go', 'g2w-go g2w-wait');
  const go = acts.querySelector('[data-go]');
  let armed = null;
  go.onclick = async () => {
    if (!armed) { speak('Tính rồi gõ số lít vào máy tính trước đã!', null, '👉 Gõ số lít trước!'); nudge(); return; }
    const { v, pad } = armed; armed = null;
    go.disabled = true; go.classList.remove('g2w-ready');
    if (add) {
      for (const c of cans) await pour(c, tank, c.st.v, { streamG, puddleG, msPerL: 380 });
    } else {
      await pour(tank, cans[0], m.b, { streamG, puddleG, msPerL: 420 });
    }
    // Mặt nước trong thùng: vạch đúng số lít sáng lên.
    const src = tank;
    const y = src.st.y + src.vs.levelY(m.ans);
    const bx = add ? src.st.x - src.vs.w / 2 - 74 : src.st.x + src.vs.w / 2 + 8; // thùng bên phải: nhãn nằm bên trái thùng
    over.innerHTML = `<path d="M${(src.st.x - src.vs.w / 2 - 10).toFixed(1)} ${y.toFixed(1)} h${(src.vs.w + 20).toFixed(1)}" stroke="#F97316" stroke-width="3" stroke-dasharray="8 6"/>`
      + `<rect x="${bx.toFixed(1)}" y="${(y - 15).toFixed(1)}" width="66" height="30" rx="9" fill="#F97316" stroke="${INK}" stroke-width="2"/>`
      + `<text x="${(bx + 33).toFixed(1)}" y="${(y + 7).toFixed(1)}" text-anchor="middle" font-size="19" font-weight="800" fill="#fff" font-family="Quicksand, sans-serif">${m.ans} l</text>`;
    const qBox = document.querySelector('.g3f-ask .g3f-bill-q .g3f-q'); // dấu "?" trên hoá đơn hiện đáp số thật
    if (qBox) { qBox.textContent = m.ans; qBox.classList.add('g2v-bill-ans'); }
    await sleep(calmMotion() ? 500 : 350);
    const fact = add ? `Thùng có ${ops} = <b>${LT(m.ans)}</b> nước.` : `Can to còn ${ops} = <b>${LT(m.ans)}</b> nước.`;
    if (v === m.ans) { pad.lock('g3g-keypad-ok'); return ok(`Đúng! ${fact}`); }
    pad.lock('g3g-keypad-bad');
    bad(`Mặt nước ở vạch ${m.ans} lít cơ!`, fact, add ? 'Đổ thêm nước vào thì số lít nhiều lên: làm phép cộng.' : 'Rót bớt nước ra thì số lít còn lại ít đi: làm phép trừ.');
  };
  ask(row('💧', add ? 'Thùng có' : 'Còn lại', `${Q} ${L}`, true), 'l', (v, pad) => {
    pad.lock();
    armed = { v, pad };
    go.classList.remove('g2w-wait'); go.classList.add('g2w-ready');
    speak('Bấm đổ nước để kiểm tra!', null, '👉 Bấm <b>🫗 Đổ nước kiểm tra</b>!');
  });
  speak(q[0], null, q[1]);
}
