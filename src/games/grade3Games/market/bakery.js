/**
 * 🍰 Chợ phiên — Tiệm bánh: một phần mấy và hình tròn. Thiết kế: docs/lop_3/thiet-ke-tro-choi-tap1.md §4.1.
 *   Cấp 1: khách cần 1/n cái bánh. Kiểu "cắt": chọn số phần (đường cắt nét đứt hiện trên bánh) → 🔪 Cắt →
 *          chạm một miếng đưa khách. Kiểu "chọn" (bẫy): ba bánh đã cắt sẵn — một bánh đúng, một bánh cắt đủ
 *          số miếng nhưng KHÔNG bằng nhau, một bánh sai số phần; bé chạm một miếng.
 *   Cấp 2: 1/n của một nhóm — chạm bánh quy trên đĩa để bỏ vào hộp (12 cái, lấy 1/3 → 4 cái), tự "Đưa khách".
 *   Cấp 3: bánh tròn có tâm O. "Kéo dao" cắt đôi (phải qua tâm), "chọn đường cắt" trong ba nét đứt,
 *          "cỡ bánh": đường kính = bán kính × 2 (bánh cỡ 16–26 cm như ngoài tiệm).
 * Mọi thao tác có chuyển động: dao lướt theo đường cắt, miếng bánh / bánh quy / hộp bay tới khách.
 */

import {
  INK, roundCakeSvg, roundCakeChordSvg, chordGeom, sheetCakeSvg, sheetGrid, cutLineSvg, centerDotSvg,
  roundCakeSideSvg, knifeSvg, cookieSvg, plateSvg, cakeBoxSvg,
} from '../art/bakery.js';
import { NPCS, npcPic, cap } from '../npc.js';
import { mountStall, Q } from './stall.js';
import { stallMeta, levelMeta } from '../catalog.js';
import { flyOne, svgBoxOnScreen } from '../fly.js';
import { sfx } from '../../preschool/fx.js';

const W = 600, H = 400;
const WORD = ['', 'một', 'hai', 'ba', 'tư', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
/** Phân số viết dọc (tử trên, mẫu dưới) như sách. */
const frac = (a, b) => `<span class="g3k-frac"><b>${a}</b><b>${b}</b></span>`;
/** Đọc phân số cho giọng nói: 1/4 → "một phần tư". */
const fracWord = (b) => `một phần ${WORD[b]}`;

export const CAKE_LEVELS = [
  {
    ...levelMeta('cake-1'), missions: 5,
    knowledge: 'một phần mấy (1/2, 1/3 … 1/9)',
    ask: (n) => `Cắt bánh thành các phần bằng nhau giúp ${n.me} nhé!`,
    desc: 'Khách cần 1/4 cái bánh: chia bánh thành 4 phần bằng nhau rồi đưa 1 phần. Cẩn thận bánh cắt không đều!',
    how: [['cut', 'Chọn số phần'], ['knife', 'Cắt'], ['piece', 'Đưa 1 miếng']],
  },
  {
    ...levelMeta('cake-2'), missions: 5,
    knowledge: 'một phần mấy của một nhóm đồ vật, phép chia trong bảng',
    ask: (n) => `Lấy bánh quy vào hộp cho ${n.me} nhé!`,
    desc: 'Đĩa có 12 cái bánh quy, khách lấy 1/3 số bánh: 12 : 3 = 4 cái. Chạm bánh để bỏ vào hộp.',
    how: [['plate', 'Đĩa có mấy cái'], ['box', 'Bỏ vào hộp'], ['✓', 'Đưa khách']],
  },
  {
    ...levelMeta('cake-3'), missions: 5,
    knowledge: 'tâm, bán kính, đường kính của hình tròn',
    ask: (n) => `Cắt đôi bánh tròn thật đều giúp ${n.me} nhé!`,
    desc: 'Cắt đôi bánh qua tâm O, tìm bán kính và đường kính, đo bánh bằng thước. Đường kính dài gấp 2 lần bán kính.',
    how: [['center', 'Tìm tâm O'], ['drag', 'Kéo dao qua O'], ['half', 'Hai nửa bằng nhau']],
  },
];

// ── Sinh dữ liệu ──
/** Góc cắt bánh tròn n phần bằng nhau. */
const equalCuts = (n) => Array.from({ length: n }, (_, i) => (i * 360) / n);

/** n phần KHÔNG bằng nhau (nhìn là thấy lệch): lệch mỗi đường cắt tới ±38% một phần. */
function unequalCuts(rng, n) {
  const base = 360 / n;
  for (;;) {
    const a = [0, ...Array.from({ length: n - 1 }, (_, i) => (i + 1) * base + (rng() * 2 - 1) * base * 0.38)];
    const sizes = a.map((x, i) => (i + 1 < n ? a[i + 1] : 360) - x);
    if (Math.max(...sizes) - Math.min(...sizes) >= base * 0.4) return a.map(x => Math.round(x));
  }
}

function unequalSheet(rng, n) {
  const { xs, ys } = sheetGrid(n);
  const c = xs.length + 1;
  for (;;) {
    const nx = xs.map((x) => x + (rng() * 2 - 1) * (0.42 / c));
    const w = [0, ...nx, 1].map((x, i, arr) => (i ? x - arr[i - 1] : 1)).slice(1);
    if (Math.min(...w) >= 0.45 / c && Math.max(...w) - Math.min(...w) >= 0.5 / c) return { xs: nx, ys };
  }
}

/** Mô tả một bánh đã cắt sẵn (kiểu "chọn"). */
function makeCake(rng, shape, n, equal) {
  if (shape === 'round') return { shape, n, equal, cuts: equal ? equalCuts(n) : unequalCuts(rng, n) };
  return { shape, n, equal, ...(equal ? sheetGrid(n) : unequalSheet(rng, n)) };
}

function pickNpc(rng, history) {
  const recent = history.slice(-3).map(m => m.npc.id);
  return rng.pick(NPCS.filter(n => !recent.includes(n.id)));
}

// ── Hình nhỏ cho dãy "cách chơi", bảng hiệu, hoá đơn ──
function cakeIcon(size = 40) {
  return `<svg viewBox="10 70 240 190" width="${size}" height="${size}" aria-hidden="true">${roundCakeSideSvg(130, 255, 170)}</svg>`;
}
const HOW_PICS = {
  cut: () => `<svg viewBox="0 0 120 120" width="44" height="44" aria-hidden="true">${roundCakeSvg(60, 60, 46, { plate: false })}${[0, 90, 180, 270].map(a => cutLineSvg(60, 60, 60 + 46 * Math.sin(a * Math.PI / 180), 60 - 46 * Math.cos(a * Math.PI / 180))).join('')}</svg>`,
  knife: () => `<svg viewBox="0 -30 200 60" width="44" height="44" aria-hidden="true">${knifeSvg(5, 0, 190, 0)}</svg>`,
  piece: () => `<svg viewBox="0 0 120 120" width="44" height="44" aria-hidden="true">${roundCakeSvg(52, 60, 44, { cuts: [0, 90, 180, 270], apart: 2, pulled: { 1: 12 }, plate: false })}</svg>`,
  plate: () => `<svg viewBox="0 0 120 120" width="44" height="44" aria-hidden="true">${plateSvg(60, 60, 56)}${[[40, 44], [76, 44], [58, 70], [36, 78], [82, 78]].map(([x, y], i) => cookieSvg(x, y, 14, ['chip', 'jam', 'butter'][i % 3], i)).join('')}</svg>`,
  box: () => `<svg viewBox="0 -40 150 130" width="44" height="44" aria-hidden="true">${cakeBoxSvg(62, 86, 100, { open: true })}</svg>`,
  center: () => `<svg viewBox="0 0 120 120" width="44" height="44" aria-hidden="true">${roundCakeSvg(60, 60, 50, { plate: false })}${centerDotSvg(60, 60, 7)}</svg>`,
  drag: () => `<svg viewBox="0 0 120 120" width="44" height="44" aria-hidden="true">${roundCakeSvg(60, 60, 50, { plate: false })}${cutLineSvg(20, 20, 100, 100, { dash: false })}${centerDotSvg(60, 60, 7)}</svg>`,
  half: () => `<svg viewBox="0 0 120 120" width="44" height="44" aria-hidden="true">${roundCakeChordSvg(60, 60, 48, { ang: 90, dist: 0, apart: 5, plate: false })}</svg>`,
};

export const CAKE_GAME = {
  ...stallMeta('cake'),
  unitWord: 'khách',
  levels: CAKE_LEVELS,
  stallIcon: () => cakeIcon(56),
  summaryText: (ok, total) => `Em đã bán bánh cho <strong>${ok}/${total}</strong> khách hài lòng.`,

  howTo(level) {
    return [...level.how.map(([p, label]) => ({ pic: HOW_PICS[p]?.() || p, label })), { pic: '😊', label: 'Khách vui' }];
  },

  makeMission(rng, level, history) {
    const npc = pickNpc(rng, history);
    const prev = history[history.length - 1];
    const i = history.length;
    if (level.id === 'cake-1') {
      const kind = i === 1 || i === 3 ? 'pick' : 'cut';
      let d;
      do { d = rng.int(2, kind === 'pick' ? 8 : 9); } while (prev && d === prev.d);
      if (kind === 'cut') {
        const shape = d <= 8 && d !== 7 && rng() < 0.35 ? 'sheet' : 'round';
        return { npc, kind, d, shape };
      }
      const shape = () => (rng() < 0.6 ? 'round' : 'sheet');
      const other = d === 2 ? rng.pick([3, 4]) : d === 8 ? rng.pick([6, 7]) : d + rng.pick([-1, 1]);
      const cakes = rng.shuffle([
        { ...makeCake(rng, shape(), d, true), right: true },
        makeCake(rng, shape(), d, false),
        makeCake(rng, shape(), other, true),
      ]);
      return { npc, kind, d, cakes };
    }
    if (level.id === 'cake-2') {
      let n, k;
      do { n = rng.int(2, 5); k = rng.int(2, 6); } while (n * k > 24 || n * k < 6 || (prev && prev.n === n && prev.k === k));
      const kinds = Array.from({ length: n * k }, () => rng.pick(['chip', 'jam', 'butter']));
      return { npc, n, k, total: n * k, kinds };
    }
    const kind = ['drag', 'size', 'line', 'name', 'ruler'][i % 5];
    const usedD = history.filter(h => h.D).map(h => h.D);
    const pickD = () => { const pool = [16, 18, 20, 22, 24, 26].filter(d => !usedD.includes(d)); return rng.pick(pool.length ? pool : [16, 18, 20, 22, 24, 26]); };
    if (kind === 'size') {
      const L = rng.pick([['A', 'B'], ['M', 'N'], ['C', 'D'], ['P', 'Q']]);
      return { npc, kind, D: pickD(), give: rng() < 0.5 ? 'r' : 'd', ang: rng.pick([90, 60, 120, 45, 135, 30, 150]), L, say: rng.int(0, 1) };
    }
    if (kind === 'name') {
      const L = rng.shuffle(['A', 'B', 'C', 'D', 'M', 'N', 'P', 'Q', 'E', 'G', 'H', 'K']).slice(0, 5);
      return { npc, kind, ask: rng() < 0.5 ? 'r' : 'd', base: rng.int(0, 11) * 30, L };
    }
    if (kind === 'ruler') {
      const b0 = rng.pick([0, 0, 2, 4]);
      return { npc, kind, D: pickD(), b0, ask: b0 ? 'd' : 'r' };
    }
    if (kind === 'line') {
      // Ba nét đứt: một đường kính + hai đường không qua tâm (lệch 25–50% bán kính), hướng khác nhau.
      const base = rng.int(0, 5) * 30;
      const lines = rng.shuffle([
        { ang: base, dist: 0 },
        { ang: base + 60, dist: 0.25 + rng() * 0.12 },
        { ang: base + 120, dist: 0.38 + rng() * 0.12 },
      ]);
      return { npc, kind, lines };
    }
    return { npc, kind, rot: rng.int(0, 5) * 30 };
  },

  mountMission(stage, m, level, api) {
    const n = m.npc;
    const st = mountStall(stage, {
      npc: n, api, theme: 'cake',
      sign: `${cakeIcon(34)}<span><strong>Tiệm bánh</strong><br>Bánh ngon!</span>`,
      counter: '<div class="g3k-host"></div>',
    });
    const host = st.counter.querySelector('.g3k-host');
    const npcBox = stage.querySelector('.g3f-npc');
    host.innerHTML = `<svg class="g3k-scene" viewBox="0 0 ${W} ${H}" role="img" aria-label="Quầy bánh"><g data-layer></g><g data-fx></g><g data-ui></g></svg>`;
    const svg = host.querySelector('svg');
    const ctx = {
      n, api, st, svg, npcBox,
      layer: svg.querySelector('[data-layer]'),
      fx: svg.querySelector('[data-fx]'),
      ui: svg.querySelector('[data-ui]'),
    };
    const mount = level.id === 'cake-1' ? (m.kind === 'cut' ? mountCut : mountPick)
      : level.id === 'cake-2' ? mountCookies
        : m.kind === 'size' ? mountSize : m.kind === 'name' ? mountName : m.kind === 'ruler' ? mountRuler : mountCenterCut;
    const out = mount(ctx, m);
    if (isTall()) cropToArt(ctx);
    return out;
  },
};

// ─────────────────────────────────────────────── dùng chung
/** Điện thoại cầm dọc: cảnh ngang 600×400 bị bề ngang bó nhỏ — nút ra dải riêng dưới cảnh, cảnh ôm sát hình. */
const isTall = () => matchMedia('(orientation: portrait) and (max-width: 600px)').matches;

/** Khung cảnh ôm sát phần hình (bánh, đĩa, hộp…) thay vì cả 600×400 — bánh to lên theo chỗ trống.
 *  Hình vẽ thêm về sau (miếng bánh tách ra, dao…) nằm ngoài thì khung nới ra, không bao giờ thu lại. */
function cropToArt(ctx) {
  const { svg, layer } = ctx;
  let box = null;
  const fit = () => {
    if (!svg.isConnected) return mo.disconnect();
    let b;
    try { b = layer.getBBox(); } catch { return; }
    if (!b.width || !b.height) return;
    const pad = 14;
    const x0 = Math.max(0, b.x - pad), y0 = Math.max(0, b.y - pad);
    const x1 = Math.min(W, b.x + b.width + pad), y1 = Math.min(H, b.y + b.height + pad);
    box = box ? { x0: Math.min(box.x0, x0), y0: Math.min(box.y0, y0), x1: Math.max(box.x1, x1), y1: Math.max(box.y1, y1) } : { x0, y0, x1, y1 };
    svg.setAttribute('viewBox', `${box.x0} ${box.y0} ${box.x1 - box.x0} ${box.y1 - box.y0}`);
  };
  const mo = new MutationObserver(fit);
  mo.observe(layer, { childList: true, subtree: true });
  fit();
}

/** Nút HTML đặt trong cảnh SVG (co giãn cùng cảnh). Điện thoại dọc: một dải nút to ngay dưới cảnh. */
function ui(ctx, x, y, w, h, html) {
  if (isTall()) {
    const strip = document.createElement('div');
    strip.className = 'g3k-ctrls g3k-ctrls-strip';
    strip.innerHTML = html;
    ctx.st.counter.appendChild(strip);
    return strip;
  }
  ctx.ui.insertAdjacentHTML('beforeend', `<foreignObject x="${x}" y="${y}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" class="g3k-ctrls">${html}</div></foreignObject>`);
  return ctx.ui.lastElementChild;
}

/** Nhắc bé nhìn vào nút cần bấm (rung nhẹ + sáng viền). */
function pulse(el) {
  if (!el) return;
  el.classList.remove('g3k-nudge');
  void el.getBoundingClientRect();
  el.classList.add('g3k-nudge');
}

/**
 * Dao lướt theo các nét cắt, để lại vết cắt. strokes = [[x0, y0, x1, y1], …]. Luôn chạy (kể cả giảm chuyển
 * động) — bé cần thấy bánh được cắt ở đâu.
 */
function knifeStrokes(ctx, strokes, onDone) {
  const per = Math.max(170, Math.min(420, 1500 / strokes.length));
  let k = 0;
  let trail = '';
  const step = () => {
    if (!ctx.svg.isConnected) return;
    if (k >= strokes.length) { ctx.fx.innerHTML = ''; return onDone(); }
    const [x0, y0, x1, y1] = strokes[k];
    const t0 = performance.now();
    const len = Math.hypot(x1 - x0, y1 - y0) || 1;
    const ux = (x1 - x0) / len, uy = (y1 - y0) / len;
    const rot = (Math.atan2(uy, ux) * 180) / Math.PI;
    sfx.swish();
    const frame = (now) => {
      if (!ctx.svg.isConnected) return;
      const t = Math.min(1, (now - t0) / per);
      const px = x0 + (x1 - x0) * t, py = y0 + (y1 - y0) * t;
      const kl = 150;
      ctx.fx.innerHTML = trail + `<line x1="${x0}" y1="${y0}" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`
        + knifeSvg(px - ux * kl, py - uy * kl, kl, rot);
      if (t < 1) return requestAnimationFrame(frame);
      trail += `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
      k++;
      setTimeout(step, 60);
    };
    requestAnimationFrame(frame);
  };
  step();
}

/** Toạ độ màn hình khách để đồ bay tới (vừa tay khách). */
function customerBox(ctx, aspect, i = 0, count = 1) {
  const r = ctx.npcBox.getBoundingClientRect();
  const h = Math.min(r.height * 0.32, r.width * 0.55);
  const w = h * aspect;
  return { left: r.left + r.width / 2 - w / 2 + (i - (count - 1) / 2) * w * 0.4, top: r.top + r.height * 0.45, width: w, height: h };
}

/** Miếng bánh (g[data-piece]) bay tới khách; miếng gốc ẩn đi. */
function flyPiece(ctx, pieceG, onLand) {
  const outline = pieceG.querySelector('[data-outline]');
  const bb = outline.getBBox();
  const pad = 5;
  const clone = pieceG.cloneNode(true);
  clone.removeAttribute('transform');
  let html = clone.outerHTML;
  // Đổi id vùng cắt: miếng gốc có thể bị vẽ lại trong lúc bản sao đang bay.
  clone.querySelectorAll('[id]').forEach((el) => { html = html.split(`"${el.id}"`).join(`"${el.id}f"`).split(`#${el.id})`).join(`#${el.id}f)`); });
  const box = { x: bb.x - pad, y: bb.y - pad, w: bb.width + pad * 2, h: bb.height + pad * 2 };
  const r = outline.getBoundingClientRect();
  const s = r.width / bb.width || 1;
  const from = { left: r.left - pad * s, top: r.top - pad * s, width: box.w * s, height: box.h * s };
  pieceG.style.visibility = 'hidden';
  sfx.pop(3);
  return flyOne(`<svg viewBox="${box.x} ${box.y} ${box.w} ${box.h}" preserveAspectRatio="none" aria-hidden="true">${html}</svg>`,
    from, customerBox(ctx, box.w / box.h), { minMs: 550, maxMs: 850, spin: 8, onLand });
}

/** Khách vui khi nhận đồ, cảm ơn. */
function happy(ctx) {
  ctx.npcBox.innerHTML = npcPic(ctx.n, 'happy');
  ctx.st.thanks();
}

// ─────────────────────────────────────────────── cấp 1: cắt bánh
const ROUND = { cx: 215, cy: 200, r: 150 };
const SHEET = { x: 45, y: 90, w: 330, h: 220 };

function mountCut(ctx, m) {
  const { n, st } = ctx;
  const d = m.d;
  const round = m.shape === 'round';
  let parts = 1;           // số phần bé chọn (1 = chưa chia)
  let cut = false, locked = false;
  const ctrl = ui(ctx, 410, 70, 185, 270, `
    <div class="g3k-step" data-stepper>
      <button type="button" class="g3k-step-btn" data-step="-1" aria-label="Bớt một phần">−</button>
      <span class="g3k-step-val"><b data-n>1</b><small>phần</small></span>
      <button type="button" class="g3k-step-btn" data-step="1" aria-label="Thêm một phần">+</button>
    </div>
    <button type="button" class="g3g-btn g3g-btn-primary" data-act="cut" disabled><b>🔪 Cắt</b></button>
    <button type="button" class="g3g-btn g3g-btn-ghost" data-act="redo" disabled><b>↺ Làm lại</b></button>`);
  const $ = (s) => ctrl.querySelector(s);
  const maxParts = round ? 9 : 8;

  const guides = () => {
    if (parts < 2) return '';
    if (round) {
      const { cx, cy, r } = ROUND;
      return equalCuts(parts).map(a => cutLineSvg(cx, cy, cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180))).join('');
    }
    const { xs, ys } = sheetGrid(parts);
    const { x, y, w, h } = SHEET;
    return xs.map(f => cutLineSvg(x + f * w, y, x + f * w, y + h)).join('') + ys.map(f => cutLineSvg(x, y + f * h, x + w, y + f * h)).join('');
  };
  const draw = () => {
    const pieces = cut ? parts : 1;
    const cake = round
      ? roundCakeSvg(ROUND.cx, ROUND.cy, ROUND.r, { cuts: pieces > 1 ? equalCuts(pieces) : null, apart: pieces > 1 ? 4 : 0 })
      : sheetCakeSvg(SHEET.x, SHEET.y, SHEET.w, SHEET.h, { ...(pieces > 1 ? sheetGrid(pieces) : {}), apart: pieces > 1 ? 4 : 0 });
    ctx.layer.innerHTML = `<g class="${cut && !locked ? 'g3k-pickable' : ''}">${cake}</g>${cut ? '' : guides()}`;
    $('[data-n]').textContent = parts;
    $('[data-step="-1"]').disabled = cut || locked || parts <= 1;
    $('[data-step="1"]').disabled = cut || locked || parts >= maxParts;
    $('[data-act="cut"]').disabled = cut || locked || parts < 2;
    $('[data-act="redo"]').disabled = !cut || locked;
    ctrl.classList.toggle('g3k-cut-ready', !cut && parts >= 2 && !locked);
  };
  draw();

  ctrl.querySelectorAll('[data-step]').forEach(b => {
    b.onclick = () => { parts = Math.max(1, Math.min(maxParts, parts + Number(b.dataset.step))); sfx.tap(); draw(); };
  });
  $('[data-act="cut"]').onclick = () => {
    if (cut || locked || parts < 2) return;
    locked = true;
    draw();
    knifeStrokes(ctx, strokesFor(parts), () => {
      cut = true; locked = false;
      draw();
      st.speak(`Cắt xong rồi! Đưa cho ${n.me} một miếng nhé!`, null, `Chạm <b>1 miếng</b> đưa cho ${n.me}!`);
    });
  };
  $('[data-act="redo"]').onclick = () => { if (!cut || locked) return; cut = false; sfx.tap(); draw(); };

  function strokesFor(k) {
    if (round) {
      const { cx, cy, r } = ROUND;
      const at = (a) => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)];
      // Số chẵn: mỗi nhát là một đường kính; số lẻ: từ tâm ra mép.
      if (k % 2 === 0) return equalCuts(k).slice(0, k / 2).map(a => [...at(a + 180), ...at(a)]);
      return equalCuts(k).map(a => [cx, cy, ...at(a)]);
    }
    const { xs, ys } = sheetGrid(k);
    const { x, y, w, h } = SHEET;
    return [...xs.map(f => [x + f * w, y - 6, x + f * w, y + h + 6]), ...ys.map(f => [x - 6, y + f * h, x + w + 6, y + f * h])];
  }

  ctx.layer.addEventListener('click', (e) => {
    if (locked) return;
    if (!cut) {
      // Bấm vào bánh khi chưa cắt: khách nhắc chọn số phần rồi cắt; nút cần bấm rung nhẹ.
      pulse(parts < 2 ? $('[data-stepper]') : $('[data-act="cut"]'));
      st.speak(`Cắt bánh trước đã ${n.you} ơi! Chọn số phần rồi bấm Cắt nhé.`, null, parts < 2 ? 'Chọn <b>số phần</b> trước nhé! 👉' : 'Bấm <b>🔪 Cắt</b> nhé! 👉');
      return;
    }
    const piece = e.target.closest('[data-piece]');
    if (!piece) return;
    locked = true;
    draw();
    const pg = ctx.layer.querySelector(`[data-piece="${piece.dataset.piece}"]`);
    flyPiece(ctx, pg, () => {
      if (parts === d) return happy(ctx);
      st.speak(parts < d ? `Miếng này to quá, ${n.me} chỉ cần ${fracWord(d)} cái bánh thôi!` : `Miếng này nhỏ quá, ${n.me} cần ${fracWord(d)} cái bánh cơ!`, 'sad',
        `Đây là ${frac(1, parts)} cái bánh!`);
      ctx.api.fail(`Bánh chia thành <b>${parts} phần</b> bằng nhau — 1 miếng là ${frac(1, parts)} cái bánh, chưa phải ${frac(1, d)}.`,
        `Muốn lấy ${frac(1, d)} cái bánh: chia bánh thành <b>${d} phần bằng nhau</b> rồi lấy 1 phần.`);
    });
  });

  st.speak(`${cap(n.you)} ơi, bán cho ${n.me} ${fracWord(d)} cái bánh nhé!`, null, `Cho ${n.me} <b class="g3f-want">${frac(1, d)}</b> cái bánh nhé!`);
}


// ─────────────────────────────────────────────── cấp 1: chọn bánh đã cắt sẵn (bẫy)
const SLOT_X = [100, 300, 500];

function mountPick(ctx, m) {
  const { n, st } = ctx;
  const d = m.d;
  let locked = false;
  const drawCake = (c, i) => {
    const cx = SLOT_X[i];
    const art = c.shape === 'round'
      ? roundCakeSvg(cx, 200, 78, { cuts: c.cuts, apart: 2.5 })
      : sheetCakeSvg(cx - 86, 142, 172, 116, { xs: c.xs, ys: c.ys, apart: 2.5, seed: 3 + i });
    return `<g data-cake="${i}" class="g3k-pickable">${art}</g>`;
  };
  ctx.layer.innerHTML = m.cakes.map(drawCake).join('');

  ctx.layer.addEventListener('click', (e) => {
    if (locked) return;
    const piece = e.target.closest('[data-piece]');
    const cakeG = e.target.closest('[data-cake]');
    if (!piece || !cakeG) return;
    locked = true;
    ctx.layer.querySelectorAll('.g3k-pickable').forEach(el => el.classList.remove('g3k-pickable'));
    const c = m.cakes[Number(cakeG.dataset.cake)];
    flyPiece(ctx, piece, () => {
      if (c.right) return happy(ctx);
      // Chỉ cho bé bánh đúng.
      ctx.layer.querySelector(`[data-cake="${m.cakes.findIndex(k => k.right)}"]`)?.classList.add('g3k-right');
      if (!c.equal) {
        st.speak(`Các miếng của bánh này không bằng nhau ${n.you} ơi!`, 'sad', 'Các miếng <b>không bằng nhau</b>!');
        ctx.api.fail(`Bánh này cắt ${c.n} miếng nhưng các miếng <b>không bằng nhau</b> — 1 miếng không phải ${frac(1, d)} cái bánh.`,
          `${frac(1, d)} cái bánh: bánh chia thành <b>${d} phần bằng nhau</b>, lấy 1 phần. Bánh đúng đang sáng xanh.`);
        return;
      }
      st.speak(`Đây là ${fracWord(c.n)} cái bánh rồi, ${n.me} cần ${fracWord(d)} cơ!`, 'sad', `Đây là ${frac(1, c.n)} cái bánh!`);
      ctx.api.fail(`Bánh này chia <b>${c.n} phần</b> bằng nhau — 1 miếng là ${frac(1, c.n)} cái bánh, chưa phải ${frac(1, d)}.`,
        `${frac(1, d)} cái bánh: bánh chia thành <b>${d} phần bằng nhau</b>, lấy 1 phần. Bánh đúng đang sáng xanh.`);
    });
  });

  st.speak(`${cap(n.you)} chọn cho ${n.me} một miếng đúng ${fracWord(d)} cái bánh nhé! Nhìn kỹ các miếng có bằng nhau không.`, null,
    `Chọn 1 miếng là <b class="g3f-want">${frac(1, d)}</b> cái bánh!`);
}

// ─────────────────────────────────────────────── cấp 2: bánh quy
const PLATE = { cx: 195, cy: 205, r: 180 };
const BOX = { cx: 452, by: 318, w: 170 };

/** Vị trí bánh quy trên đĩa: lưới tổ ong, lấy các ô gần tâm nhất. */
function cookieSpots(total) {
  const r = total <= 12 ? 26 : total <= 18 ? 23 : 20;
  const gap = r * 2.25;
  const pts = [];
  for (let row = -6; row <= 6; row++) {
    for (let col = -6; col <= 6; col++) {
      const x = PLATE.cx + (col + (row % 2 ? 0.5 : 0)) * gap, y = PLATE.cy + row * gap * 0.87;
      const dd = Math.hypot(x - PLATE.cx, y - PLATE.cy);
      if (dd + r <= PLATE.r * 0.82) pts.push({ x, y, dd });
    }
  }
  pts.sort((a, b) => a.dd - b.dd);
  return { r, pts: pts.slice(0, total) };
}

/** Chỗ đặt bánh quy thứ i trong lòng hộp mở (xếp hàng 4, chồng lên khi nhiều). */
function boxSpot(i) {
  const w = BOX.w, dx = w * 0.28, dy = w * 0.2;
  const x0 = BOX.cx - w / 2, top = BOX.by - w * 0.62;
  const row = Math.floor(i / 4), col = i % 4;
  const depth = row % 2 ? 0.3 : 0.7;
  return { x: x0 + w * 0.2 + col * w * 0.2 + dx * depth, y: top - dy * depth - Math.floor(row / 2) * 16 + 4, r: 15 };
}

function mountCookies(ctx, m) {
  const { n, st, svg } = ctx;
  const { r, pts } = cookieSpots(m.total);
  const onPlate = pts.map(() => true);
  const inBox = [];                     // chỉ số bánh theo thứ tự bỏ vào
  const flying = new Set();             // bánh đang bay vào hộp — chỗ trong hộp để trống tới lúc đáp
  let locked = false;
  const btns = ui(ctx, 380, 330, 218, 70, `
    <div class="g3k-row">
      <button type="button" class="g3g-btn g3g-btn-ghost" data-act="back" disabled><b>↩ Lấy ra</b></button>
      <button type="button" class="g3g-btn g3g-btn-primary" data-act="give" disabled><b>✓ Đưa khách</b></button>
    </div>`);
  const $ = (s) => btns.querySelector(s);

  const draw = () => {
    const boxCookies = inBox.map((ci, k) => { if (flying.has(ci)) return ''; const s = boxSpot(k); return cookieSvg(s.x, s.y, s.r, m.kinds[ci], ci); }).join('');
    ctx.layer.innerHTML = plateSvg(PLATE.cx, PLATE.cy, PLATE.r)
      + `<g class="${locked ? '' : 'g3k-pickable'}">${pts.map((p, i) => (onPlate[i] ? `<g data-cookie="${i}"><circle cx="${p.x}" cy="${p.y}" r="${r * 1.12}" fill="transparent"/>${cookieSvg(p.x, p.y, r, m.kinds[i], i)}</g>` : '')).join('')}</g>`
      + tag(22, 18, `${m.total} cái`)
      + `<g data-box>${cakeBoxSvg(BOX.cx, BOX.by, BOX.w, { open: true, inner: boxCookies })}</g>`
      + (inBox.length ? badge(BOX.cx - BOX.w / 2 + 4, BOX.by - BOX.w * 0.62 + 20, inBox.length) : '');
    $('[data-act="back"]').disabled = locked || !inBox.length;
    $('[data-act="give"]').disabled = locked || !inBox.length;
  };
  draw();

  const cookieFly = (kind, seed) => `<svg viewBox="-30 -30 60 60" aria-hidden="true">${cookieSvg(0, 0, 28, kind, seed)}</svg>`;
  ctx.layer.addEventListener('click', (e) => {
    if (locked) return;
    const g = e.target.closest('[data-cookie]');
    if (!g) return;
    const i = Number(g.dataset.cookie);
    if (!onPlate[i]) return;
    const p = pts[i];
    const from = svgBoxOnScreen(svg, p.x - r, p.y - r, r * 2, r * 2);
    onPlate[i] = false;
    const k = inBox.length;
    inBox.push(i);
    const s = boxSpot(k);
    const to = svgBoxOnScreen(svg, s.x - s.r, s.y - s.r, s.r * 2, s.r * 2);
    flying.add(i);
    draw();
    sfx.tap();
    flyOne(cookieFly(m.kinds[i], i), from, to, { minMs: 320, maxMs: 520, spin: 30, onLand: () => { flying.delete(i); if (!locked) draw(); sfx.pop(Math.min(6, inBox.length)); } });
  });
  $('[data-act="back"]').onclick = () => {
    if (locked || flying.size || !inBox.length) return;
    const k = inBox.length - 1;
    const i = inBox.pop();
    const s = boxSpot(k), p = pts[i];
    const from = svgBoxOnScreen(svg, s.x - s.r, s.y - s.r, s.r * 2, s.r * 2);
    const to = svgBoxOnScreen(svg, p.x - r, p.y - r, r * 2, r * 2);
    draw();
    flyOne(cookieFly(m.kinds[i], i), from, to, { minMs: 320, maxMs: 520, onLand: () => { onPlate[i] = true; if (!locked) draw(); } });
  };
  $('[data-act="give"]').onclick = () => {
    if (locked || flying.size || !inBox.length) return;
    locked = true;
    const c = inBox.length;
    // Đóng nắp hộp rồi hộp bay tới khách.
    const boxView = { x: BOX.cx - BOX.w / 2 - 6, y: BOX.by - BOX.w * 0.62 - BOX.w * 0.2 - BOX.w * 0.2, w: BOX.w + BOX.w * 0.28 + 12, h: BOX.w * 0.62 + BOX.w * 0.4 + 6 };
    draw();
    const boxG = ctx.layer.querySelector('[data-box]');
    boxG.innerHTML = cakeBoxSvg(BOX.cx, BOX.by, BOX.w);
    ctx.layer.querySelector('.g3k-badge')?.remove();
    sfx.tap();
    setTimeout(() => {
      const from = svgBoxOnScreen(svg, boxView.x, boxView.y, boxView.w, boxView.h);
      boxG.style.visibility = 'hidden';
      flyOne(`<svg viewBox="${boxView.x} ${boxView.y} ${boxView.w} ${boxView.h}" preserveAspectRatio="none" aria-hidden="true">${cakeBoxSvg(BOX.cx, BOX.by, BOX.w)}</svg>`,
        from, customerBox(ctx, boxView.w / boxView.h), {
          minMs: 600, maxMs: 900, onLand: () => {
            if (c === m.k) return happy(ctx);
            st.speak(c < m.k ? `Hộp thiếu bánh rồi ${n.you} ơi!` : `Nhiều quá, ${n.me} chỉ lấy ${fracWord(m.n)} số bánh thôi!`, 'sad',
              c < m.k ? 'Hộp <b>thiếu</b> bánh!' : 'Hộp <b>nhiều</b> bánh quá!');
            ctx.api.fail(`${m.total} cái chia thành ${m.n} phần bằng nhau, mỗi phần <b>${m.total} : ${m.n} = ${m.k} cái</b>. Em bỏ vào hộp ${c} cái.`,
              `Muốn lấy ${frac(1, m.n)} số bánh: lấy số bánh chia cho ${m.n}.`);
          },
        });
    }, 350);
  };

  st.speak(`${cap(n.you)} lấy cho ${n.me} ${fracWord(m.n)} số bánh quy trên đĩa nhé! Đĩa có ${m.total} cái.`, null,
    `Lấy <b class="g3f-want">${frac(1, m.n)}</b> số bánh quy trên đĩa nhé!`);
}

/** Nhãn số trên cảnh (vd. "12 cái" cạnh đĩa). */
function tag(x, y, text) {
  const w = text.length * 13 + 26;
  return `<g><rect x="${x}" y="${y}" width="${w}" height="36" rx="18" fill="#fff" stroke="${INK}" stroke-width="3"/>`
    + `<text x="${x + w / 2}" y="${y + 25}" font-size="21" font-weight="800" fill="${INK}" text-anchor="middle" font-family="Quicksand, 'Baloo 2', sans-serif">${text}</text></g>`;
}
/** Số bánh đã bỏ vào hộp (tròn cam trên mép hộp). */
function badge(x, y, k) {
  return `<g class="g3k-badge"><circle cx="${x}" cy="${y}" r="19" fill="#FB923C" stroke="#fff" stroke-width="3"/>`
    + `<text x="${x}" y="${y + 7}" font-size="20" font-weight="800" fill="#fff" text-anchor="middle" font-family="Quicksand, sans-serif">${k}</text></g>`;
}

// ─────────────────────────────────────────────── cấp 3: dao qua tâm
const C3 = { cx: 230, cy: 200, r: 150 };
const TOL = 0.12;                   // dao cách tâm dưới 12% bán kính coi như đi qua tâm

/** Tâm O + chữ O. glow: dao đang đi qua tâm. */
function centerO(glow = false, lx = C3.cx + 12, ly = C3.cy - 10, anchor = 'start') {
  return `<circle cx="${C3.cx}" cy="${C3.cy}" r="${glow ? 13 : 0}" fill="#86EFAC" opacity=".8"/>${centerDotSvg(C3.cx, C3.cy, 6.5)}`
    + `<text x="${lx}" y="${ly}" font-size="24" font-weight="800" fill="${INK}" text-anchor="${anchor}" font-family="Quicksand, sans-serif" paint-order="stroke" stroke="#fff" stroke-width="5">O</text>`;
}

/** Đường thẳng qua p, q → (ang, dist ≥ 0) theo quy ước chordGeom. */
function lineToChord(p, q) {
  const len = Math.hypot(q.x - p.x, q.y - p.y) || 1;
  const ux = (q.x - p.x) / len, uy = (q.y - p.y) / len;
  let nx = -uy, ny = ux;
  let d = (p.x - C3.cx) * nx + (p.y - C3.cy) * ny;
  if (d < 0) { nx = -nx; ny = -ny; d = -d; }
  return { ang: (Math.atan2(ny, nx) * 180) / Math.PI + 90, dist: d };
}

function mountCenterCut(ctx, m) {
  const { n, st, svg } = ctx;
  const { cx, cy, r } = C3;
  let locked = false;
  const drawWhole = (extra = '') => {
    ctx.layer.innerHTML = roundCakeSvg(cx, cy, r, { center: false }) + extra + centerO();
  };
  const drag = m.kind === 'drag';
  if (drag) {
    drawWhole();
    ctx.ui.innerHTML = knifeRest();
  } else {
    // Ba nét đứt, chạm một nét để cắt theo nét đó.
    const segs = m.lines.map((l, i) => {
      const g = chordGeom(cx, cy, r, l.ang, l.dist * r);
      const ext = 18, [a, b] = [g.e0, g.e1];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L;
      const p0 = [a[0] - ux * ext, a[1] - uy * ext], p1 = [b[0] + ux * ext, b[1] + uy * ext];
      return `<g data-line="${i}" class="g3k-line">${cutLineSvg(...p0, ...p1)}<line x1="${p0[0]}" y1="${p0[1]}" x2="${p1[0]}" y2="${p1[1]}" stroke="transparent" stroke-width="34" stroke-linecap="round"/></g>`;
    }).join('');
    drawWhole(`<g class="g3k-pickable">${segs}</g>`);
  }

  function doCut(ang, dist) {
    locked = true;
    ctx.ui.innerHTML = '';
    const ok = dist <= r * TOL;
    const dd = ok ? 0 : dist;
    const g = chordGeom(cx, cy, r, ang, dd);
    drawWhole();
    knifeStrokes(ctx, [[g.e0[0], g.e0[1], g.e1[0], g.e1[1]]], () => {
      ctx.layer.innerHTML = roundCakeChordSvg(cx, cy, r, { ang, dist: dd, apart: 5, center: false }) + centerO(ok);
      if (ok) {
        st.speak('Đường cắt đi qua tâm O, hai nửa bằng nhau!', null, 'Hai nửa <b>bằng nhau</b>! 🎉');
        setTimeout(() => {
          const pg = ctx.layer.querySelector('[data-piece="0"]');
          flyPiece(ctx, pg, () => happy(ctx));
        }, 700);
        return;
      }
      // Chỉ cho bé đường cắt đúng: song song với nhát vừa cắt, đi qua tâm O.
      const good = chordGeom(cx, cy, r, ang, 0);
      ctx.fx.innerHTML = `<line x1="${good.e0[0]}" y1="${good.e0[1]}" x2="${good.e1[0]}" y2="${good.e1[1]}" stroke="#16A34A" stroke-width="4" stroke-dasharray="10 7" stroke-linecap="round"/>`;
      st.speak(`Hai miếng không bằng nhau ${n.you} ơi!`, 'sad', 'Hai miếng <b>không bằng nhau</b>!');
      ctx.api.fail('Đường cắt <b>không đi qua tâm O</b> nên hai miếng không bằng nhau.',
        'Muốn cắt đôi bánh tròn, đặt dao đi qua tâm O (nét xanh) — đường cắt đó là một <b>đường kính</b>.');
    });
  }

  if (!drag) {
    ctx.layer.addEventListener('click', (e) => {
      if (locked) return;
      const l = e.target.closest('[data-line]');
      if (!l) return;
      const line = m.lines[Number(l.dataset.line)];
      doCut(line.ang, line.dist * r);
    });
    st.speak(`${cap(n.you)} cắt đôi bánh giúp ${n.me} nhé! Chọn đường cắt chia bánh thành hai phần bằng nhau.`, null,
      `Chọn đường cắt chia đôi bánh <b class="g3f-want">bằng nhau</b>!`);
    return;
  }

  // Cầm dao kéo qua bánh: dao đi theo ngón tay (lưỡi dao ngay dưới ngón tay, mũi dao hướng theo chiều kéo).
  // Nét cắt nối chỗ dao vào bánh với chỗ dao ra khỏi bánh (hoặc chỗ thả tay nếu thả trên bánh).
  // Bấm thẳng lên bánh rồi kéo cũng được.
  svg.classList.add('g3k-drag');
  const toSvg = (e) => {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };
  const inside = (p) => Math.hypot(p.x - cx, p.y - cy) <= r;
  let carrying = false, entry = null, last = null, prev = null, rot = -70;
  const clearO = () => ctx.layer.querySelectorAll('.g3k-o').forEach(el => el.remove());
  const drawKnife = (q) => {
    const a = (rot * Math.PI) / 180, ux = Math.cos(a), uy = Math.sin(a);
    let line = '';
    let glow = false;
    if (entry && last && Math.hypot(last.x - entry.x, last.y - entry.y) > 10) {
      const c = lineToChord(entry, last);
      if (c.dist < r * 0.95) {
        const g = chordGeom(cx, cy, r, c.ang, c.dist);
        line = `<line x1="${g.e0[0]}" y1="${g.e0[1]}" x2="${g.e1[0]}" y2="${g.e1[1]}" stroke="#E4572E" stroke-width="4" stroke-dasharray="10 7" stroke-linecap="round"/>`
          + `<line x1="${entry.x}" y1="${entry.y}" x2="${last.x}" y2="${last.y}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
        glow = c.dist <= r * TOL;
      }
    }
    ctx.fx.innerHTML = line + knifeSvg(q.x - ux * 120, q.y - uy * 120, 150, rot);
    clearO();
    if (glow) ctx.layer.insertAdjacentHTML('beforeend', `<g class="g3k-o">${centerO(true)}</g>`);
  };
  const reset = (hint) => {
    carrying = false; entry = null; last = null; prev = null; rot = -70;
    ctx.fx.innerHTML = '';
    clearO();
    ctx.ui.innerHTML = knifeRest();
    if (hint) st.speak(`Cầm dao kéo cắt ngang qua cả cái bánh nhé ${n.you}!`, null, 'Kéo dao <b>qua cả cái bánh</b> nhé!');
  };
  /** Dao đã đi qua bánh: đủ dài thì cắt, quá ngắn (chỉ quẹt mép) thì bỏ qua để bé kéo tiếp. */
  const tryCut = (final) => {
    if (!entry || !last) return false;
    const c = lineToChord(entry, last);
    if (Math.hypot(last.x - entry.x, last.y - entry.y) < r * 0.6 || c.dist >= r * 0.9) {
      if (final) reset(true); else { entry = null; last = null; }
      return false;
    }
    carrying = false;
    ctx.fx.innerHTML = '';
    clearO();
    doCut(c.ang, c.dist);
    return true;
  };
  svg.addEventListener('pointerdown', (e) => {
    if (locked) return;
    const p = toSvg(e);
    const onKnife = e.target.closest('.g3k-knife-rest');
    if (!onKnife && Math.hypot(p.x - cx, p.y - cy) > r * 1.35) return;
    e.preventDefault();
    try { svg.setPointerCapture(e.pointerId); } catch { /* con trỏ không còn */ }
    carrying = true;
    prev = p;
    entry = inside(p) ? p : null;
    last = entry;
    ctx.ui.innerHTML = '';
    drawKnife(p);
  });
  svg.addEventListener('pointermove', (e) => {
    if (!carrying || locked) return;
    const q = toSvg(e);
    const dx = q.x - prev.x, dy = q.y - prev.y;
    if (Math.hypot(dx, dy) > 4) {
      // Mũi dao quay dần theo hướng kéo (không giật khi tay run).
      const want = (Math.atan2(dy, dx) * 180) / Math.PI;
      const d = ((want - rot + 540) % 360) - 180;
      rot += d * 0.35;
      prev = q;
    }
    if (inside(q)) {
      if (!entry) entry = q;
      last = q;
    } else if (entry && tryCut(false)) return;   // dao vừa ra khỏi mép bánh bên kia
    drawKnife(q);
  });
  svg.addEventListener('pointerup', (e) => {
    if (!carrying || locked) return;
    const q = toSvg(e);
    if (inside(q) && entry) last = q;
    // Chưa đưa dao vào bánh (chỉ nhấc dao lên rồi thả) → đặt dao lại chỗ cũ, khách nhắc cách cắt.
    if (!entry) reset(true); else tryCut(true);
  });
  svg.addEventListener('pointercancel', () => { if (!locked) reset(false); });

  st.speak(`${cap(n.you)} cắt đôi cái bánh này giúp ${n.me} nhé! Hai phần phải bằng nhau. Cầm con dao kéo qua bánh nhé.`, null,
    `Cầm dao cắt đôi bánh <b class="g3f-want">bằng nhau</b>!`);
}

/** Con dao nằm chờ cạnh bánh + bàn tay mời cầm lên. */
function knifeRest() {
  return `<g class="g3k-knife-rest" role="button" aria-label="Con dao — cầm kéo qua bánh">`
    + `<rect x="440" y="170" width="120" height="175" rx="20" fill="transparent"/>${knifeSvg(470, 330, 150, -70)}`
    + `<text class="g3k-hand" x="512" y="312" font-size="38" text-anchor="middle">👆</text></g>`;
}

// ─────────────────────────────────────────────── cấp 3: bán kính, đường kính
const BLUE = '#2563EB', GREEN = '#16A34A', ORANGE = '#EA580C';
const f0 = (v) => Math.round(v * 10) / 10;
const txt = (x, y, t, { color = INK, size = 24, anchor = 'middle' } = {}) => `<text x="${f0(x)}" y="${f0(y)}" font-size="${size}" font-weight="800" fill="${color}" text-anchor="${anchor}" font-family="Quicksand, sans-serif" paint-order="stroke" stroke="#fff" stroke-width="6">${t}</text>`;
/** Đoạn thẳng có viền trắng cho nổi trên mặt bánh. */
const segLine = (p, q, color, w = 5) => `<line x1="${f0(p[0])}" y1="${f0(p[1])}" x2="${f0(q[0])}" y2="${f0(q[1])}" stroke="#fff" stroke-width="${w + 5}" stroke-linecap="round"/>`
  + `<line x1="${f0(p[0])}" y1="${f0(p[1])}" x2="${f0(q[0])}" y2="${f0(q[1])}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
const dot = (p) => `<circle cx="${f0(p[0])}" cy="${f0(p[1])}" r="6" fill="${INK}"/>`;
/** Điểm trên mép bánh theo góc (0° = 12 giờ, chiều kim đồng hồ); k > 1 = ra ngoài mép. */
const rim = (a, k = 1) => [C3.cx + C3.r * k * Math.sin((a * Math.PI) / 180), C3.cy - C3.r * k * Math.cos((a * Math.PI) / 180)];
/** Tên điểm đặt ngoài mép bánh, ngay đầu mút. */
const rimLabel = (a, t) => { const [x, y] = rim(a, 1.13); return txt(x, y + 9, t); };
/** Hình tròn nhỏ có một đoạn (hoá đơn): d = đường kính, còn lại bán kính. */
const segIcon = (d) => `<svg viewBox="0 0 60 60" width="28" height="28" aria-hidden="true"><circle cx="30" cy="30" r="26" fill="#FFF8EC" stroke="${INK}" stroke-width="3"/><line x1="${d ? 4 : 30}" y1="30" x2="56" y2="30" stroke="${BLUE}" stroke-width="4"/><circle cx="30" cy="30" r="3.5" fill="#E4572E"/></svg>`;

/** Trả lời đúng: ẩn nét vẽ trên mặt bánh, bánh bay tới khách. */
function serveCake(ctx) {
  setTimeout(() => {
    ctx.layer.querySelectorAll('[data-marks], text').forEach(el => { el.style.visibility = 'hidden'; });
    flyPiece(ctx, ctx.layer.querySelector('[data-piece="0"]'), () => happy(ctx));
  }, 900);
}

/**
 * Cỡ bánh: cho bán kính hỏi đường kính hoặc ngược lại. Mỗi lượt đổi hướng đoạn thẳng, tên điểm, lời khách.
 * Số đo bán kính ghi cạnh đoạn OA; số đo đường kính ghi giữa đoạn, phía đối diện chữ O.
 */
function mountSize(ctx, m) {
  const { n, st } = ctx;
  const { cx, cy, r } = C3;
  const R = m.D / 2;
  const [LA, LB] = m.L;
  const A = rim(m.ang), B = rim(m.ang + 180);
  const ux = (A[0] - cx) / r, uy = (A[1] - cy) / r;
  // pháp tuyến hướng lên trên (y âm)
  let nx = uy, ny = -ux;
  if (ny > 0 || (ny === 0 && nx > 0)) { nx = -nx; ny = -ny; }
  const oLab = [cx + nx * 26 - ux * 24, cy + ny * 26 - uy * 24 + 8];
  const radLab = (t, color) => txt(cx + ux * r * 0.5 + nx * 30, cy + uy * r * 0.5 + ny * 30 + 9, t, { color, size: 26 });
  const diaLab = (t, color) => txt(cx - nx * 34, cy - ny * 34 + 9, t, { color, size: 26 });
  const radius = (color, t) => segLine([cx, cy], A, color) + radLab(t, color);
  const diameter = (color, t) => segLine(B, A, color) + diaLab(t, color);
  const ptsA = dot(A) + rimLabel(m.ang, LA);
  const ptsB = dot(B) + rimLabel(m.ang + 180, LB);
  const given = m.give === 'r' ? radius(BLUE, `${R} cm`) + ptsA : diameter(BLUE, `${m.D} cm`) + ptsA + ptsB;
  let locked = false;
  const paint = (under = '', over = '') => {
    ctx.layer.innerHTML = roundCakeSvg(cx, cy, r, { center: false }) + `<g data-marks>${under}${given}${over}</g>` + centerO(false, oLab[0], oLab[1], 'middle');
  };
  paint();
  // Chạm vào bánh khi chưa trả lời: nhắc nhìn sang máy tính tiền.
  ctx.layer.addEventListener('click', () => { if (!locked) st.nudge(); });
  const ans = m.give === 'r' ? m.D : R;
  const bill = m.give === 'r'
    ? st.row(segIcon(false), `Bán kính O${LA}`, `<b>${R} cm</b>`) + st.row(segIcon(true), 'Đường kính', Q, true)
    : st.row(segIcon(true), `Đường kính ${LA}${LB}`, `<b>${m.D} cm</b>`) + st.row(segIcon(false), 'Bán kính', Q, true);
  const lines = m.give === 'r'
    ? [[`Bánh của ${n.me} có bán kính ${R} xăng-ti-mét. Đường kính của bánh dài bao nhiêu xăng-ti-mét hả ${n.you}?`, `Bán kính <b>${R} cm</b>. Đường kính bao nhiêu?`],
      [`${cap(n.me)} cần hộp rộng đúng bằng đường kính bánh. Bánh có bán kính ${R} xăng-ti-mét, vậy hộp rộng bao nhiêu xăng-ti-mét?`, `Bán kính <b>${R} cm</b>. Hộp rộng bằng <b>đường kính</b>: bao nhiêu?`]]
    : [[`Bánh của ${n.me} có đường kính ${m.D} xăng-ti-mét. Bán kính của bánh dài bao nhiêu xăng-ti-mét hả ${n.you}?`, `Đường kính <b>${m.D} cm</b>. Bán kính bao nhiêu?`],
      [`${cap(n.me)} muốn cắm nến cách tâm O đúng bằng bán kính. Bánh cỡ ${m.D} xăng-ti-mét, tức là đường kính ${m.D} xăng-ti-mét. Bán kính là bao nhiêu?`, `Bánh cỡ <b>${m.D} cm</b> (đường kính). Bán kính bao nhiêu?`]];
  const [spoken, shown] = lines[m.say];
  st.speak(spoken, null, shown);
  st.ask(bill, 'cm', (v, pad) => {
    locked = true;
    // Hiện số đo còn lại (xanh lá) để bé thấy đường kính gấp đôi bán kính.
    if (m.give === 'r') paint(diameter(GREEN, `${m.D} cm`) + ptsB);
    else paint('', radius(GREEN, `${R} cm`));
    if (v !== ans) {
      pad.lock('g3g-keypad-bad');
      st.fail(m.give === 'r' ? `Đường kính dài gấp 2 lần bán kính: <b>${R} × 2 = ${m.D} cm</b>.` : `Bán kính bằng một nửa đường kính: <b>${m.D} : 2 = ${R} cm</b>.`,
        'Đường kính = bán kính × 2 · Bán kính = đường kính : 2');
      return;
    }
    pad.lock('g3g-keypad-ok');
    serveCake(ctx);
  });
}

/**
 * Tìm bán kính / đường kính: trên bánh có ba đoạn — một bán kính, một đường kính, một đoạn nối hai điểm
 * trên mép nhưng không qua tâm. Bé chạm đoạn khách hỏi.
 */
function mountName(ctx, m) {
  const { n, st } = ctx;
  const { cx, cy, r } = C3;
  const b = m.base;
  const [L1, L2, L3, L4, L5] = m.L;
  const chord = chordGeom(cx, cy, r, b + 150, r * 0.5);
  const angOf = (p) => (Math.atan2(p[0] - cx, -(p[1] - cy)) * 180) / Math.PI;
  const segs = [
    { type: 'r', p: [cx, cy], q: rim(b), name: `O${L1}`, labels: [[b, L1]] },
    { type: 'd', p: rim(b + 60), q: rim(b + 240), name: `${L2}${L3}`, labels: [[b + 60, L2], [b + 240, L3]] },
    { type: 'c', p: chord.e0, q: chord.e1, name: `${L4}${L5}`, labels: [[angOf(chord.e0), L4], [angOf(chord.e1), L5]] },
  ];
  // Chữ O đặt trong góc trống giữa bán kính và đường kính.
  const ox = cx + 30 * Math.sin(((b + 30) * Math.PI) / 180), oy = cy - 30 * Math.cos(((b + 30) * Math.PI) / 180) + 8;
  let locked = false;
  const paint = (hl = {}) => {
    ctx.layer.innerHTML = roundCakeSvg(cx, cy, r, { center: false })
      + `<g data-marks class="${locked ? '' : 'g3k-pickable'}">`
      + segs.map((s, i) => `<g data-seg="${i}">${segLine(s.p, s.q, hl[i] || BLUE)}`
        + `<line x1="${f0(s.p[0])}" y1="${f0(s.p[1])}" x2="${f0(s.q[0])}" y2="${f0(s.q[1])}" stroke="transparent" stroke-width="34" stroke-linecap="round"/></g>`).join('')
      + segs.map(s => (s.type === 'r' ? dot(s.q) : dot(s.p) + dot(s.q)) + s.labels.map(([a, t]) => rimLabel(a, t)).join('')).join('')
      + `</g>${centerO(false, ox, oy, 'middle')}`;
  };
  paint();
  const word = m.ask === 'r' ? 'bán kính' : 'đường kính';
  const right = segs.findIndex(s => s.type === m.ask);
  ctx.layer.addEventListener('click', (e) => {
    if (locked) return;
    const g = e.target.closest('[data-seg]');
    if (!g) return;
    const i = Number(g.dataset.seg);
    locked = true;
    sfx.tap();
    if (i === right) {
      paint({ [i]: GREEN });
      st.speak(`Đúng rồi, ${segs[i].name} là một ${word}!`, null, `<b>${segs[i].name}</b> là ${word}! 🎉`);
      serveCake(ctx);
      return;
    }
    paint({ [i]: ORANGE, [right]: GREEN });
    const s = segs[i];
    const why = s.type === 'c' ? `${s.name} <b>không đi qua tâm O</b> nên không phải bán kính, cũng không phải đường kính.`
      : s.type === 'd' ? `${s.name} đi qua tâm O, nối hai điểm trên mép bánh — đó là <b>đường kính</b>.`
        : `${s.name} nối tâm O với một điểm trên mép bánh — đó là <b>bán kính</b>.`;
    st.speak(`Chưa đúng rồi ${n.you} ơi!`, 'sad', `Đó chưa phải ${word}!`);
    ctx.api.fail(`${why} ${cap(word)} là <b>${segs[right].name}</b> (nét xanh lá).`,
      'Bán kính: nối tâm O với một điểm trên mép. Đường kính: đi qua tâm O, nối hai điểm trên mép.');
  });
  st.speak(`${cap(n.you)} chỉ cho ${n.me} đâu là một ${word} của cái bánh này nhé!`, null, `Chạm vào một <b class="g3f-want">${word}</b> của bánh!`);
}

/**
 * Đo bằng thước: bánh đặt trên thước xăng-ti-mét, hai nét đứt dóng từ hai đầu đường kính xuống thước.
 * Thước bắt đầu ở vạch 0 → hỏi bán kính (đọc đường kính rồi chia 2); lệch vạch 0 → hỏi đường kính
 * (vạch cuối trừ vạch đầu).
 */
function mountRuler(ctx, m) {
  const { n, st } = ctx;
  const r = C3.r;
  const D = m.D, R = D / 2, b0 = m.b0, b1 = b0 + D;
  const u = (2 * r) / D;                       // đơn vị cảnh của 1 cm
  const len = b1 + 2;
  const x0 = (W - len * u - 26) / 2;
  const cx = x0 + (b0 + D / 2) * u, cy = 172;
  const ry = 345;
  const every = u < 18 ? 2 : 1;
  let ticks = '';
  for (let k = 0; k <= len; k++) {
    const x = x0 + k * u;
    const big = k % every === 0;
    ticks += `<line x1="${f0(x)}" y1="${ry}" x2="${f0(x)}" y2="${ry + (big ? 16 : 9)}" stroke="${INK}" stroke-width="2"/>`;
    if (big) ticks += `<text x="${f0(x)}" y="${ry + 36}" font-size="${u < 18 ? 14 : 16}" font-weight="700" fill="${INK}" text-anchor="middle" font-family="Quicksand, sans-serif">${k}</text>`;
  }
  const ruler = `<rect x="${f0(x0 - 12)}" y="${ry}" width="${f0(len * u + 50)}" height="46" rx="6" fill="#FDE68A" stroke="${INK}" stroke-width="3"/>${ticks}`
    + `<text x="${f0(x0 + len * u + 18)}" y="${ry + 36}" font-size="14" font-weight="700" fill="${INK}" font-family="Quicksand, sans-serif">cm</text>`;
  const A = [cx + r, cy], B = [cx - r, cy];
  const guide = (p) => `<line x1="${f0(p[0])}" y1="${f0(p[1])}" x2="${f0(p[0])}" y2="${ry}" stroke="#E4572E" stroke-width="3" stroke-dasharray="7 6"/>`;
  const center = `${centerDotSvg(cx, cy, 6.5)}${txt(cx, cy - 16, 'O')}`;
  let locked = false;
  const paint = (over = '') => {
    ctx.layer.innerHTML = ruler + roundCakeSvg(cx, cy, r, { center: false, plate: false })
      + `<g data-marks>${guide(B)}${guide(A)}${segLine(B, A, BLUE)}${dot(A)}${dot(B)}${over}</g>`
      + txt(A[0] + 20, A[1] + 9, 'A') + txt(B[0] - 20, B[1] + 9, 'B') + center;
  };
  paint();
  ctx.layer.addEventListener('click', () => { if (!locked) st.nudge(); });
  if (m.ask === 'r') {
    st.speak(`Bánh đặt trên thước. ${cap(n.you)} đo giúp ${n.me} bán kính của bánh dài bao nhiêu xăng-ti-mét nhé!`, null, 'Nhìn thước: <b class="g3f-want">bán kính</b> bao nhiêu cm?');
  } else {
    st.speak(`Bánh đặt trên thước, nhưng mép bánh không nằm ở vạch 0 đâu. Đường kính AB của bánh dài bao nhiêu xăng-ti-mét hả ${n.you}?`, null, 'Nhìn thước: <b class="g3f-want">đường kính AB</b> bao nhiêu cm?');
  }
  const ans = m.ask === 'r' ? R : D;
  const bill = m.ask === 'r'
    ? st.row('📏', 'Đường kính AB', '<b>… cm</b>') + st.row(segIcon(false), 'Bán kính', Q, true)
    : st.row('📏', 'Đường kính AB', Q, true);
  st.ask(bill, 'cm', (v, pad) => {
    locked = true;
    // Tô vạch đầu / vạch cuối trên thước + số đo.
    const mark = (k) => `<line x1="${f0(x0 + k * u)}" y1="${ry - 2}" x2="${f0(x0 + k * u)}" y2="${ry + 22}" stroke="${GREEN}" stroke-width="5" stroke-linecap="round"/>`;
    paint(mark(b0) + mark(b1) + txt(cx - r / 2, cy + 36, `${D} cm`, { color: GREEN, size: 26 })
      + (m.ask === 'r' ? segLine([cx, cy], A, GREEN) + txt(cx + r / 2, cy - 14, `${R} cm`, { color: GREEN, size: 24 }) : ''));
    if (v !== ans) {
      pad.lock('g3g-keypad-bad');
      const read = b0 ? `Đường kính AB: từ vạch ${b0} đến vạch ${b1} là <b>${b1} − ${b0} = ${D} cm</b>.` : `Đường kính AB: từ vạch 0 đến vạch ${D} là <b>${D} cm</b>.`;
      st.fail(m.ask === 'r' ? `${read} Bán kính = <b>${D} : 2 = ${R} cm</b>.` : read,
        m.ask === 'r' ? 'Đọc đường kính trên thước rồi chia 2 được bán kính.' : 'Mép bánh không ở vạch 0: lấy vạch cuối trừ vạch đầu.');
      return;
    }
    pad.lock('g3g-keypad-ok');
    serveCake(ctx);
  });
}
