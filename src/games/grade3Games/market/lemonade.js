/**
 * 🍋 Chợ phiên — Quầy nước chanh: bấm giữ cần gạt của bình có vòi để rót nước chanh vào ca đong có vạch
 * mi-li-lít, thả tay đúng vạch khách cần rồi TỰ XÁC NHẬN ("Rót xong") — app không báo trước lúc đủ.
 * Rót quá thì giữ "Đổ bớt" (nghiêng ca đổ ra khay hứng). Thiết kế: docs/lop_3/thiet-ke-tro-choi-tap1.md §4.1.
 *   Cấp 1: ca 500 ml, vạch mỗi 100 ml, chỉ ghi "500 ml" như Bài 32 — bé đếm vạch.
 *   Cấp 2: ca 1 l, vạch dài có số mỗi 100 ml, vạch ngắn ở giữa là 50 ml ("Rót 350 ml").
 *   Cấp 3: hai bước — 3 ly, mỗi ly 200 ml → rót 600 ml; bình 1 l còn lại bao nhiêu ml?
 */

import {
  INK, jugGeom, jugParts, jugWater, jugSpout, dispenserGeom, dispenserBody, dispenserLiquid, spigotSvg,
  streamSvg, glassSvg, glassIcon, glassFlySvg, GLASS_BOX,
} from '../art/lemonade.js';
import { NPCS, npcPic, cap } from '../npc.js';
import { mountStall, Q } from './stall.js';
import { stallMeta, levelMeta } from '../catalog.js';
import { flyOne, svgBoxOnScreen, calmMotion } from '../fly.js';
import { sfx } from '../../preschool/fx.js';

const fmt = (n) => (n >= 1000 ? `${Math.floor(n / 1000)} ${String(n % 1000).padStart(3, '0')}` : String(n));
const L = '<i class="g3l-l">l</i>'; // ký hiệu lít nghiêng như sách (HTML — trong SVG dùng L_SVG)
// Trong <svg> không được dùng <i> (trình duyệt coi là thẻ HTML, đóng luôn thẻ svg).
const L_SVG = '<tspan font-family="Georgia, Times New Roman, serif" font-style="italic" font-weight="400">l</tspan>';

export const LEMON_LEVELS = [
  {
    ...levelMeta('lemon-1'), missions: 5,
    knowledge: 'mi-li-lít, đếm vạch trên ca',
    ask: (n) => `Rót nước chanh cho đúng vạch giúp ${n.me}!`,
    desc: 'Ca 500 ml, mỗi vạch 100 ml. Bấm giữ vòi để rót, thả tay đúng vạch khách cần: 300 ml là 3 vạch.',
    jug: { cap: 500, step: 100, longEvery: 1, labels: 'top' }, rate: 110, tol: 18,
    kind: 'pour', amounts: [100, 200, 300, 400],
    how: [['tap', 'Giữ vòi để rót'], ['jug', 'Nhìn vạch'], ['✓', 'Rót xong']],
  },
  {
    ...levelMeta('lemon-2'), missions: 5,
    knowledge: 'mi-li-lít, lít (1 l = 1 000 ml)',
    ask: (n) => `Ca 1 lít có vạch 50 ml — rót thật khéo giúp ${n.me}!`,
    desc: 'Ca 1 l có số mỗi 100 ml; vạch ngắn ở giữa là thêm 50 ml. Ví dụ: "Rót 350 ml".',
    jug: { cap: 1000, step: 50, longEvery: 2, labels: 'long' }, rate: 150, tol: 12,
    kind: 'pour', amounts: [150, 250, 350, 450, 550, 650, 750, 850, 200, 400, 600, 800],
    how: [['tap', 'Giữ vòi để rót'], ['jug', 'Vạch 50 ml'], ['✓', 'Rót xong']],
  },
  {
    ...levelMeta('lemon-3'), missions: 5,
    knowledge: 'mi-li-lít, lít (1 l = 1 000 ml) và bài toán giải bằng hai bước tính',
    ask: (n) => `Pha mấy ly nước chanh rồi xem bình còn bao nhiêu giúp ${n.me}!`,
    desc: 'Hai bước: 3 ly, mỗi ly 200 ml → rót 600 ml. Bình có 1 l = 1 000 ml, còn lại bao nhiêu?',
    jug: { cap: 1000, step: 50, longEvery: 2, labels: 'long' }, rate: 150, tol: 12,
    kind: 'multi', cups: [100, 150, 200, 250, 300], count: [2, 4],
    how: [['✖️', 'Tính số ml'], ['tap', 'Rót'], ['➖', 'Còn lại']],
  },
];

// ── Bố cục cảnh (đơn vị viewBox): bệ gỗ + bình có vòi bên trái, ca đong dưới vòi, ly bên phải ──
const W = 600, H = 460;
const TOP = 36; // phía trên nắp bình để trống — cắt bớt cho cảnh to hơn
const FLOOR = 452;
const DISP = dispenserGeom(32, 60, 138, 154);
const JUG = { cx: 252, by: 440, w: 150, h: 208 };
const TRAY = { x0: 150, x1: 420, y: 440 };

// Điện thoại xoay ngang: cảnh rất thấp — cắt bớt nửa trên bình (vòi và phần dưới bình vẫn thấy) để ca đong to hơn.
const isShort = () => matchMedia('(orientation: landscape) and (max-height: 500px)').matches;
const TOP_SHORT = 136;
// Điện thoại cầm dọc: cảnh ngang bị bề ngang bó nhỏ — bình + ca giữ nguyên chỗ, ly xếp một hàng trên kệ
// bên dưới; hai nút ra một dải HTML dưới cảnh (cỡ theo màn hình, không co theo cảnh). Cảnh hẹp (x 4–430) nên to hơn hẳn.
const isTall = () => matchMedia('(orientation: portrait) and (max-width: 600px)').matches;
const TALL = { x: 4, w: 426, h: 622, shelfY: 604 };

/** Vị trí các ly (tâm đáy) theo số ly. short: cảnh bị cắt nửa trên → các ly xếp một hàng thấp. */
function glassSlots(n, short, tall) {
  if (tall) {
    if (n <= 1) return [{ cx: 215, by: TALL.shelfY, w: 84, h: 110 }];
    return Array.from({ length: n }, (_, i) => ({ cx: 215 + (i - (n - 1) / 2) * 92, by: TALL.shelfY, w: 60, h: 80 }));
  }
  if (n <= 1) return [{ cx: 512, by: 306, w: 84, h: 110 }];
  if (short) return Array.from({ length: n }, (_, i) => ({ cx: 436 + i * 47 + (4 - n) * 23, by: 306, w: 46, h: 62 }));
  const w = 60, h = 80;
  const cols = [470, 552];
  const rows = n <= 2 ? [300] : [198, 306];
  const out = [];
  rows.forEach(by => cols.forEach(cx => { if (out.length < n) out.push({ cx, by, w, h }); }));
  return out;
}

export const LEMON_GAME = {
  ...stallMeta('lemon'),
  unitWord: 'khách',
  levels: LEMON_LEVELS,
  stallIcon: () => glassIcon(56),
  summaryText: (ok, total) => `Em đã pha nước chanh cho <strong>${ok}/${total}</strong> khách hài lòng.`,

  howTo(level) {
    const pics = {
      tap: `<svg viewBox="148 140 70 94" width="44" height="44" aria-hidden="true">${spigotSvg(DISP, true)}${streamSvg(DISP.nozzle.x, DISP.nozzle.y + 2, 228, 7)}</svg>`,
      jug: jugIcon(level),
    };
    return [...level.how.map(([p, label]) => ({ pic: pics[p] || p, label })), { pic: '😊', label: 'Khách vui' }];
  },

  makeMission(rng, level, history) {
    const prev = history[history.length - 1];
    const recentNpcs = history.slice(-3).map(m => m.npc.id);
    const npc = rng.pick(NPCS.filter(n => !recentNpcs.includes(n.id)));
    if (level.kind === 'multi') {
      let k, n;
      do {
        k = rng.pick(level.cups);
        n = rng.int(level.count[0], level.count[1]);
      } while (k * n > 900 || (prev && k === prev.k && n === prev.n));
      return { npc, k, n, target: k * n };
    }
    // Cấp 2: hơn nửa số lần là vạch ngắn (… 50 ml) — đúng chỗ bé cần luyện.
    let pool = level.amounts;
    if (level.id === 'lemon-2') pool = rng() < 0.65 ? pool.filter(a => a % 100) : pool.filter(a => !(a % 100));
    let target;
    do { target = rng.pick(pool); } while (prev && target === prev.target && pool.length > 1);
    return { npc, target };
  },

  mountMission(stage, m, level, api) {
    const n = m.npc;
    const multi = level.kind === 'multi';
    const t = m.target;
    const { counter, main, speak, row, ask, nudge, fail, thanks } = mountStall(stage, {
      npc: n, api, theme: 'lemon',
      sign: `${glassIcon(34)}<span><strong>Nước chanh</strong><br>${multi ? `Mỗi ly <b>${m.k} ml</b>` : 'Tươi mát!'}</span>`,
      counter: `
        <svg class="g3l-bunting" viewBox="0 0 400 16" preserveAspectRatio="none" aria-hidden="true">${bunting()}</svg>
        <div class="g3l-host"></div>`,
    });
    const host = counter.querySelector('.g3l-host');
    const npcBox = stage.querySelector('.g3f-npc');

    // ── Dựng cảnh ──
    const jc = level.jug;
    const g = jugGeom(JUG.cx, JUG.by, JUG.w, JUG.h, jc.cap, jc.step);
    const clipJ = `g3lj${Math.random().toString(36).slice(2, 7)}`;
    const clipD = `${clipJ}d`;
    const parts = jugParts(g, { labels: jc.labels, longEvery: jc.longEvery, clipId: clipJ, labelOf: (v) => (v >= 1000 ? `1 ${L_SVG}` : `${v} ml`) });
    const body = dispenserBody(DISP, clipD);
    const short = isShort();
    const tall = !short && isTall();
    const slots = glassSlots(multi ? m.n : 1, short, tall);
    const vb = tall ? `${TALL.x} ${TOP} ${TALL.w} ${TALL.h - TOP}` : `0 ${short ? TOP_SHORT : TOP} ${W} ${H - (short ? TOP_SHORT : TOP)}`;
    // Bình cấp 3 có đúng 1 l (ghi trên nhãn bình); cấp 1–2 là bình to của quầy, không ghi số.
    const dispCap = multi ? 1080 : 3200;
    let disp = multi ? 1000 : 2900;
    const ctrlsHtml = `
            <button type="button" class="g3g-btn g3g-btn-ghost g3l-dump" disabled><b>↷ Đổ bớt</b><small>Bấm giữ</small></button>
            <button type="button" class="g3g-btn g3g-btn-primary g3l-done" disabled><b>✓ Rót xong</b><small>Rót xong hãy xác nhận</small></button>`;
    const PIV = { x: g.cx + g.w / 2 - g.w * 0.07, y: g.by };   // ca nghiêng quanh góc đáy phía mỏ rót
    host.innerHTML = `
      <svg class="g3l-scene" viewBox="${vb}" role="img" aria-label="Bình nước chanh có vòi và ca đong">
        <defs>${parts.clip}${body.clip}</defs>
        <rect x="18" y="${DISP.y + DISP.h}" width="166" height="${FLOOR - DISP.y - DISP.h}" rx="8" fill="#E9B872" stroke="${INK}" stroke-width="3"/>
        <path d="M18,${DISP.y + DISP.h + 16} H184 M18,${FLOOR - 70} H184 M18,${FLOOR - 140} H184" stroke="${INK}" stroke-width="2" opacity=".35"/>
        <g data-disp-back>${body.back}</g>
        <g data-disp-liquid></g>
        <g>${body.front}${multi ? dispLabel() : ''}</g>
        <rect x="${TRAY.x0}" y="${TRAY.y}" width="${TRAY.x1 - TRAY.x0}" height="12" rx="4" fill="#9AA8B6" stroke="${INK}" stroke-width="3"/>
        <path d="${Array.from({ length: 13 }, (_, i) => `M${TRAY.x0 + 12 + i * 20.5},${TRAY.y + 3} v6`).join(' ')}" stroke="${INK}" stroke-width="2" opacity=".5"/>
        <g data-jug-back>${parts.back}</g>
        <g data-jug-water></g>
        <g data-stream></g>
        <g data-jug-front>${parts.front}${parts.labels}<g data-jug-mark></g></g>
        <g data-dump></g>
        <g data-spigot></g>
        <g data-glasses></g>
        <g class="g3l-tap" data-tap tabindex="0" role="button" aria-label="Vòi rót — bấm giữ để rót">
          <rect x="${DISP.bx - 14}" y="${DISP.pivot.y - 58}" width="92" height="${DISP.nozzle.y - DISP.pivot.y + 72}" rx="16" fill="transparent"/>
          <text class="g3l-hand" x="${DISP.pivot.x + 26}" y="${DISP.pivot.y - 34}" font-size="34" text-anchor="middle">👈</text>
        </g>
        ${tall ? `<rect x="24" y="${TALL.shelfY}" width="382" height="12" rx="4" fill="#E9B872" stroke="${INK}" stroke-width="3"/>` : ''}
        ${tall ? '' : `<foreignObject x="428" y="${FLOOR - 118}" width="170" height="118"><div xmlns="http://www.w3.org/1999/xhtml" class="g3l-ctrls">${ctrlsHtml}</div></foreignObject>`}
      </svg>`;
    const svg = host.querySelector('svg');
    if (tall) host.insertAdjacentHTML('afterend', `<div class="g3l-ctrls g3l-ctrls-row">${ctrlsHtml}</div>`);
    const $ = (sel) => svg.querySelector(sel);
    const waterG = $('[data-jug-water]'), jugBackG = $('[data-jug-back]'), jugFrontG = $('[data-jug-front]'), streamG = $('[data-stream]'), dumpG = $('[data-dump]');
    const spigotG = $('[data-spigot]'), liquidG = $('[data-disp-liquid]'), glassesG = $('[data-glasses]'), tapG = $('[data-tap]');
    const doneBtn = counter.querySelector('.g3l-done'), dumpBtn = counter.querySelector('.g3l-dump');
    const clipPath = svg.querySelector(`#${clipJ} path`);
    const flip = clipPath.getAttribute('transform');

    // ── Trạng thái rót ──
    let ml = 0;            // nước trong ca
    let canPour = !multi;  // cấp 3: tính số ml trước rồi mới rót
    let locked = false;
    let pouring = false, dumping = false, heldAt = 0, tilt = 0;
    let everPoured = false;
    const glassFill = slots.map(() => 0);
    const glassDone = slots.map(() => false);

    const drawGlasses = () => {
      glassesG.innerHTML = slots.map((s, i) => `<g data-glass="${i}">${glassSvg(s.cx, s.by, s.w, s.h, { fill: glassFill[i], done: glassDone[i] })}${multi ? glassTag(s, m.k) : ''}</g>`).join('');
    };
    const render = () => {
      waterG.innerHTML = jugWater(g, ml, clipJ);
      liquidG.innerHTML = dispenserLiquid(DISP, disp / dispCap, clipD);
      spigotG.innerHTML = spigotSvg(DISP, pouring);
      // Dòng chảy: từ đầu vòi xuống mặt nước trong ca (hoặc đáy ca khi ca còn rỗng).
      streamG.innerHTML = pouring ? streamSvg(DISP.nozzle.x, DISP.nozzle.y + 1, ml > 0 ? g.mlY(ml) + 2 : g.by - 5, 8) : '';
      const rot = `rotate(${tilt.toFixed(1)} ${PIV.x.toFixed(1)} ${PIV.y})`;
      // Thân ca nghiêng; mặt nước (cắt theo thân ca đã nghiêng) vẫn nằm ngang như nước thật.
      jugBackG.setAttribute('transform', rot);
      jugFrontG.setAttribute('transform', rot);
      clipPath.setAttribute('transform', `${rot} ${flip}`);
      if (dumping && ml > 0 && tilt > 6) {
        const sp = jugSpout(g);
        const a = (tilt * Math.PI) / 180, dx = sp.x - PIV.x, dy = sp.y - PIV.y;
        const x = PIV.x + dx * Math.cos(a) - dy * Math.sin(a), y = PIV.y + dx * Math.sin(a) + dy * Math.cos(a);
        dumpG.innerHTML = streamSvg(x + 2, y + 2, TRAY.y, 6);
      } else dumpG.innerHTML = '';
      tapG.classList.toggle('g3l-tap-hint', canPour && !everPoured && !locked);
      doneBtn.disabled = locked || !canPour || ml < 5 || pouring || dumping;
      dumpBtn.disabled = locked || !canPour || ml <= 0;
    };
    drawGlasses();
    render();
    if (import.meta.env.DEV) window.__g3lemon = { set(v) { ml = v; render(); }, get: () => ml };

    // Vòng rót: giữ càng lâu vòi mở càng to (chạm nhẹ chỉ rót một ít — để bé chỉnh cho khớp vạch).
    let last = 0, raf = 0, lastSound = 0;
    const loop = () => {
      if (!svg.isConnected) return;
      // Đo bằng performance.now() (tham số của rAF là giờ đầu khung hình, có thể sớm hơn lúc bấm) — không để dt âm.
      const now = performance.now();
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000 || 0));
      last = now;
      const ramp = Math.min(1, 0.25 + Math.max(0, now - heldAt) / 700);
      if (pouring) {
        const add = Math.min(level.rate * ramp * dt, disp, g.maxMl - ml);
        ml += add; disp -= add;
        if (disp <= 0 || ml >= g.maxMl) pouring = false;
        if (now - lastSound > 150) { lastSound = now; sfx.pop(Math.round((ml / jc.cap) * 6)); }
      }
      tilt += ((dumping ? 16 : 0) - tilt) * Math.min(1, dt * 12);
      if (dumping && tilt > 12) ml = Math.max(0, ml - level.rate * 0.8 * ramp * dt);
      if (dumping && ml <= 0) dumping = false;
      render();
      raf = pouring || dumping || tilt > 0.3 ? requestAnimationFrame(loop) : 0;
      if (!raf) { tilt = 0; render(); }
    };
    const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); } };
    // Cấp 3: bấm vòi khi chưa tính số ml → khách nhắc tính trước, máy tính tiền rung nhẹ để bé nhìn sang.
    let lastHint = -Infinity;
    const hintCalc = () => {
      nudge();
      if (performance.now() - lastHint < 2500) return;
      lastHint = performance.now();
      speak(`Khoan đã ${n.you} ơi! Tính xem cần rót tất cả bao nhiêu mi-li-lít trước!`, null,
        `Tính số <b>ml</b> ở máy tính trước! 👉`);
    };
    const startPour = () => {
      if (!canPour && multi && !locked) return hintCalc();
      if (!canPour || locked || dumping || disp <= 0) return; pouring = true; everPoured = true; heldAt = performance.now(); kick(); };
    const stopPour = () => { pouring = false; };
    const startDump = () => { if (!canPour || locked || pouring || ml <= 0) return; dumping = true; heldAt = performance.now(); kick(); };
    const stopDump = () => { dumping = false; };
    const holdable = (el, start, stop) => {
      el.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        try { el.setPointerCapture?.(e.pointerId); } catch { /* con trỏ không còn hoạt động */ }
        start();
      });
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => el.addEventListener(ev, stop));
      el.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); start(); } });
      el.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') stop(); });
      el.addEventListener('contextmenu', (e) => e.preventDefault());
    };
    holdable(tapG, startPour, stopPour);
    holdable(dumpBtn, startDump, stopDump);

    // ── Tự xác nhận: đúng vạch (sai số bằng bề dày vạch) thì rót ra ly; lệch thì khách phàn nàn ──
    const spoken = (v) => `${v} mi-li-lít`;
    doneBtn.onclick = () => {
      if (doneBtn.disabled) return;
      locked = true;
      render();
      const d = ml - t;
      if (Math.abs(d) <= level.tol) {
        ml = t;
        render();
        markTick('#16A34A');
        return serve();
      }
      const few = d < 0;
      markTick('#EA580C');
      speak(few ? `Chưa đủ ${spoken(t)} mà ${n.you}!` : `Nhiều quá ${n.you} ơi, ${n.me} chỉ cần ${spoken(t)} thôi!`, 'sad',
        few ? `Chưa tới vạch <b>${t} ml</b>!` : `Quá vạch <b>${t} ml</b> rồi!`);
      api.fail(few ? `Mặt nước <b>chưa tới</b> vạch <b>${t} ml</b> — còn thiếu.` : `Mặt nước đã <b>quá</b> vạch <b>${t} ml</b> — nhiều quá.`, tipFor(level, t));
    };

    /** Tô vạch đích (sau khi bé đã xác nhận): xanh khi đúng, cam khi sai — kèm số ml cạnh vạch. */
    function markTick(color) {
      const i = t / jc.step;
      const y = g.mlY(t);
      const x1 = g.cx + g.w / 2 - g.w * 0.07 - g.w * 0.1; // chân vạch (sau khi lật)
      $('[data-jug-mark]').innerHTML = `<line x1="${x1 - g.w * 0.22}" y1="${y}" x2="${x1 + 2}" y2="${y}" stroke="${color}" stroke-width="5" stroke-linecap="round"/>`
        + (svg.querySelector(`[data-label="${i}"]`) ? '' : `<text x="${x1 - g.w * 0.26}" y="${y + 5}" font-size="15" font-weight="800" fill="${color}" text-anchor="end" font-family="Quicksand, sans-serif" paint-order="stroke" stroke="#fff" stroke-width="4">${t} ml</text>`);
      svg.querySelector(`[data-label="${i}"]`)?.setAttribute('fill', color);
    }

    /** Rót từ ca ra từng ly (giọt bay từ mỏ ca sang ly, ca vơi dần, ly đầy dần) rồi trao ly cho khách. */
    function serve() {
      const per = t / slots.length;
      let i = 0;
      const next = () => {
        if (i >= slots.length) return setTimeout(handOver, 300);
        const s = slots[i];
        const from = svgBoxOnScreen(svg, jugSpout(g).x - 12, jugSpout(g).y - 12, 24, 24);
        const to = svgBoxOnScreen(svg, s.cx - 12, s.by - s.h * 0.9, 24, 24);
        flyOne(DROP, from, to, {
          minMs: 380, maxMs: 600,
          onLand: () => {
            const idx = i;
            const start = performance.now(), mlStart = ml;
            const dur = calmMotion() ? 500 : 650;
            const step = (now) => {
              const k = Math.min(1, (now - start) / dur);
              ml = mlStart - per * k;
              glassFill[idx] = k;
              render(); drawGlasses();
              if (k < 1) return requestAnimationFrame(step);
              glassDone[idx] = true;
              drawGlasses();
              if (!calmMotion()) glassesG.querySelector(`[data-glass="${idx}"]`)?.classList.add('g3l-pop');
              sfx.tap();
              i++;
              setTimeout(next, 220);
            };
            requestAnimationFrame(step);
          },
        });
      };
      next();
    }

    /** Ly bay tới tay khách, lần lượt; khách vui khi ly cuối tới nơi. */
    function handOver() {
      const target = npcBox.getBoundingClientRect();
      let end = 0;
      slots.forEach((s, i) => {
        const k = s.w / 50;
        const b = GLASS_BOX;
        const from = svgBoxOnScreen(svg, s.cx + b.x * k, s.by + b.y * k, b.w * k, b.h * k);
        const sz = Math.min(target.width * 0.5, from?.height || 80);
        const to = { left: target.left + target.width / 2 - sz * 0.4 + (i - (slots.length - 1) / 2) * sz * 0.35, top: target.top + target.height * 0.45, width: sz * 0.8, height: sz };
        end = Math.max(end, flyOne(glassFlySvg(), from, to, {
          delay: i * 220, minMs: 550, maxMs: 850,
          onLand: () => { sfx.tap(); },
        }));
        setTimeout(() => { const el = glassesG.querySelector(`[data-glass="${i}"]`); if (el) el.style.opacity = '0'; }, i * 220 + 16);
      });
      setTimeout(() => {
        npcBox.innerHTML = npcPic(n, 'happy');
        if (multi) return askLeft();
        thanks();
      }, end + 150);
    }

    function askLeft() {
      const left = 1000 - t;
      speak(`Bình có 1 lít nước chanh. Rót ra ${spoken(t)} thì bình còn lại bao nhiêu mi-li-lít hả ${n.you}?`, null,
        `Bình <b>1 ${L}</b>, rót <b>${t} ml</b>. Còn lại bao nhiêu?`);
      ask(row(dispIcon(), 'Bình có', `<b>1 ${L}</b>`) + row(glassIcon(28), 'Đã rót', `<b>${t} ml</b>`) + row(dispIcon(), 'Còn lại', Q, true), 'ml', (v, pad) => {
        if (v === left) { pad.lock('g3g-keypad-ok'); thanks(); return; }
        pad.lock('g3g-keypad-bad');
        fail(`1 ${L} = 1 000 ml. Còn lại <b>1 000 − ${t} = ${left} ml</b>.`, `Đổi 1 ${L} = 1 000 ml rồi trừ đi số ml đã rót.`);
      });
    }

    // ── Bắt đầu nhiệm vụ ──
    if (!multi) {
      speak(`${cap(n.you)} rót cho ${n.me} ${spoken(t)} nước chanh!`, null, `Rót cho ${n.me} <b class="g3f-want">${t} ml</b>!`);
      return;
    }
    speak(`Cho ${n.me} ${m.n} ly nước chanh, mỗi ly ${spoken(m.k)}! Cần rót tất cả bao nhiêu mi-li-lít?`, null,
      `<b class="g3f-want">${m.n} ly</b>, mỗi ly <b>${m.k} ml</b>. Tất cả bao nhiêu ml?`);
    ask(row(glassIcon(28), '1 ly', `<b>${m.k} ml</b>`) + row(glassIcon(28), `${m.n} ly`, Q, true), 'ml', (v, pad) => {
      if (v !== t) {
        pad.lock('g3g-keypad-bad');
        fail(`${m.n} ly, mỗi ly ${m.k} ml: cần <b>${t} ml</b>.`, `${m.k} × ${m.n} = ${t}`);
        return;
      }
      pad.lock('g3g-keypad-ok');
      canPour = true;
      speak(`Đúng rồi! ${cap(n.you)} rót ${spoken(t)} vào ca!`, null, `Rót <b class="g3f-want">${t} ml</b> vào ca!`);
      render();
    });
  },
};

const DROP = `<svg viewBox="-12 -16 24 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0,-14 Q9,-2 9,4 A9,9 0 0 1 -9,4 Q-9,-2 0,-14 Z" fill="#FFF0A6" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/><path d="M-4,1 Q-4,-3 -1,-6" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`;

/** Mẹo khi rót lệch vạch — theo kiểu ca của cấp. */
function tipFor(level, t) {
  const { step, labels } = level.jug;
  if (labels === 'top') return `Mỗi vạch là ${step} ml: đếm từ đáy ca lên <b>${t / step} vạch</b> là ${t} ml. Rót quá thì giữ "Đổ bớt".`;
  if (t % 100) {
    const lo = t - 50, hi = t + 50;
    return `Vạch ngắn nằm giữa hai vạch có số: giữa ${lo} ml và ${hi >= 1000 ? `1 ${L}` : `${hi} ml`} là <b>${t} ml</b>. Rót quá thì giữ "Đổ bớt".`;
  }
  return `Rót tới vạch dài có số <b>${t} ml</b> — mặt nước nằm ngang đúng vạch. Rót quá thì giữ "Đổ bớt".`;
}

/** Nhãn "1 l" dán trên bình (cấp 3). */
function dispLabel() {
  const { x, y, w, h } = DISP;
  const cy = y + h * 0.66; // thấp trên thân bình — vẫn thấy khi cảnh bị cắt nửa trên (điện thoại ngang)
  return `<rect x="${x + w * 0.24}" y="${cy - 18}" width="${w * 0.52}" height="36" rx="8" fill="#FFD166" stroke="${INK}" stroke-width="3"/>`
    + `<text x="${x + w / 2}" y="${cy + 9}" font-size="26" font-weight="700" fill="${INK}" text-anchor="middle" font-family="Quicksand, sans-serif">1 <tspan font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-weight="400">l</tspan></text>`;
}

/** Dây cờ tam giác (xanh dương / xanh lá / vàng) trên mép quầy — như ảnh mẫu stand.png. */
function bunting() {
  const cols = ['#7CC6E8', '#7BCB8B', '#FFD166'];
  let out = `<path d="M0,1.5 H400" stroke="${INK}" stroke-width="1.2"/>`;
  for (let i = 0; i < 20; i++) out += `<path d="M${i * 20 + 1},1.5 L${i * 20 + 19},1.5 L${i * 20 + 10},15 Z" fill="${cols[i % 3]}" stroke="${INK}" stroke-width="1"/>`;
  return out;
}

/** Nhãn "150 ml" dán trên thân mỗi ly (cấp 3) — thấy ngay mỗi ly cần bao nhiêu. */
function glassTag(s, k) {
  const fs = Math.max(12, s.w * 0.25), w = fs * 3.5, h = fs * 1.45, cy = s.by - s.h * 0.4;
  return `<rect x="${s.cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="#fff" stroke="${INK}" stroke-width="2"/>`
    + `<text x="${s.cx}" y="${cy + fs * 0.36}" font-size="${fs}" font-weight="800" fill="${INK}" text-anchor="middle" font-family="Quicksand, 'Baloo 2', sans-serif">${k} ml</text>`;
}

/** Bình có vòi thu nhỏ (hoá đơn cấp 3). */
function dispIcon() {
  const id = `g3ldi${Math.random().toString(36).slice(2, 7)}`;
  const b = dispenserBody(DISP, id);
  return `<svg viewBox="22 40 196 184" width="28" height="28" aria-hidden="true"><defs>${b.clip}</defs>${b.back}${dispenserLiquid(DISP, 0.8, id)}${b.front}${spigotSvg(DISP, false)}</svg>`;
}

/** Hình ca đong nhỏ cho dãy "cách chơi". */
function jugIcon(level) {
  const jc = level.jug;
  const g = jugGeom(50, 96, 60, 84, jc.cap, jc.step);
  const id = `g3lji${level.n}`;
  const p = jugParts(g, { labels: 'none', longEvery: jc.longEvery, clipId: id, labelOf: () => '' });
  return `<svg viewBox="0 0 100 104" width="44" height="44" aria-hidden="true"><defs>${p.clip}</defs>${p.back}${jugWater(g, jc.cap * 0.6, id)}${p.front}</svg>`;
}
