/**
 * 🧵 Chợ phiên — Quầy may ruy băng: mi-li-mét. Thiết kế: docs/lop_3/thiet-ke-tro-choi-tap1.md §4.1.
 * Dải ruy băng nằm trên thước, đầu dải đúng vạch 0, cuộn ở bên phải. Bé kéo cây kéo dọc thước (hoặc bấm
 * ◀ ▶ nhích từng mi-li-mét), nhìn kính lúp cho rõ vạch, rồi TỰ bấm "✂️ Cắt" — app không báo trước lúc đúng.
 *   Cấp 1: "Cắt 45 mm" — đếm vạch mm từ vạch cm.
 *   Cấp 2: đổi đơn vị, xen kẽ: đổi "6 cm 5 mm" ra mm ở máy tính rồi cắt · đo đoạn đã cắt sẵn (bao nhiêu mm)
 *          · cắt thẳng theo "7 cm 3 mm".
 *   Cấp 3: giá theo cm — cắt k cm (có lượt khách nói bằng mm: "70 mm" = 7 cm) rồi tính tiền k × giá 1 cm.
 * Đúng thì đoạn ruy băng bay tới tay khách.
 */

import {
  RIBBONS, RIBBON_COLORS, rulerSvg, rulerX, ribbonRollSvg, ribbonStripSvg, ribbonPieceSvg, scissorsSvg,
  magnifierSvg, rollRackSvg, sewingTableSvg, COLORS,
} from '../art/ribbon.js';
import { NPCS, npcPic, cap } from '../npc.js';
import { mountStall, Q } from './stall.js';
import { stallMeta, levelMeta } from '../catalog.js';
import { flyOne, svgBoxOnScreen, calmMotion } from '../fly.js';
import { sfx } from '../../preschool/fx.js';

export const RIBBON_LEVELS = [
  {
    ...levelMeta('ribbon-1'), missions: 5, cm: 10,
    knowledge: 'mi-li-mét, đọc vạch trên thước',
    ask: (n) => `Cắt ruy băng cho đúng số mi-li-mét giúp ${n.me}!`,
    desc: 'Kéo cây kéo tới đúng vạch rồi bấm Cắt. Ví dụ "Cắt 45 mm": từ vạch 4 đếm thêm 5 vạch nhỏ.',
    how: [['drag', 'Kéo kéo tới vạch'], ['lens', 'Nhìn kính lúp'], ['✂️', 'Cắt']],
  },
  {
    ...levelMeta('ribbon-2'), missions: 5, cm: 10,
    knowledge: 'mi-li-mét, 1 cm = 10 mm',
    ask: (n) => `Đổi xăng-ti-mét ra mi-li-mét rồi cắt giúp ${n.me}!`,
    desc: '1 cm = 10 mm. "Cắt 6 cm 5 mm" là cắt 65 mm. Có lượt phải đo đoạn ruy băng dài bao nhiêu mi-li-mét.',
    how: [['🧮', '6 cm 5 mm = ? mm'], ['drag', 'Kéo kéo tới vạch'], ['✂️', 'Cắt']],
  },
  {
    ...levelMeta('ribbon-3'), missions: 5, cm: 15,
    knowledge: 'xăng-ti-mét, mi-li-mét và nhân số có hai chữ số với số có một chữ số',
    ask: (n) => `Cắt ruy băng rồi tính tiền giúp ${n.me}!`,
    desc: '1 cm ruy băng giá 3 nghìn đồng, khách mua 8 cm: cắt 8 cm rồi tính 3 × 8 = 24 nghìn đồng.',
    how: [['drag', 'Cắt đủ số cm'], ['🧮', 'Tính tiền'], ['piece', 'Đưa khách']],
  },
];

// ── Bố cục cảnh (đơn vị viewBox, rộng 600) ──
// Màn ngang: 600 × 400 — giá treo + kính lúp ở trên, bàn cắt ở dưới. Màn dọc: cảnh cao theo đúng khung còn trống
// (đo lúc dựng, dựng lại khi khung đổi cỡ) — phần trên (giá treo, kính lúp) cao ra, bàn cắt nằm sát đáy, không chừa
// khoảng trống dưới quầy.
const W = 600;
const RX = 22, RH = 52;                    // thước: lề trái, bề cao
const RULER_W = 472;                       // bề ngang thước (chừa chỗ cho cuộn bên phải)
const SH = 20;                             // bề rộng dải ruy băng
const SCI = 96;                            // chiều dài cây kéo
const isTall = () => matchMedia('(orientation: portrait)').matches;

/** Toạ độ cảnh. dy = phần cao thêm của màn dọc (bàn cắt dời xuống dy). */
function layout(dy) {
  const RY = 244 + dy;
  const top = 176 + dy;                    // mép trên bàn cắt
  // Màn dọc: giá treo trải ngang hàng trên cùng; kính lúp to ngay bên dưới (cán chéo xuống về phía thước).
  const r = dy ? Math.max(56, Math.min(150, (top - 160) * 0.5)) : 76;
  const lens = dy ? { cx: 340, cy: 150 + r, r } : { cx: 474, cy: 92, r: 76 };
  return {
    tall: dy > 0, dy, H: 400 + dy, RY, STRIP_Y: RY - SH - 2, LENS: lens,
    rack: dy ? [44, 530, 46, 22] : [40, 318, 40, 19],
    zoomK: r / 76 * 0.85 + 0.15,
  };
}

const geom = (level) => {
  const ppm = RULER_W / (level.cm * 10 + 10);
  const x = (mm) => rulerX(RX, mm, { ppm });
  const end = RX + RULER_W;
  return { ppm, x, zero: x(0), end, rollX: end + 44, rollR: 34, zoom: ppm < 3.5 ? 2.7 : 2.2 };
};

/** "65 mm" → "6 cm 5 mm" (bỏ phần 0). */
const cmmm = (mm) => {
  const c = Math.floor(mm / 10), r = mm % 10;
  return [c ? `${c} cm` : '', r ? `${r} mm` : ''].filter(Boolean).join(' ');
};
const spokenMm = (mm) => `${mm} mi-li-mét`;
const spokenCmMm = (mm) => {
  const c = Math.floor(mm / 10), r = mm % 10;
  return [c ? `${c} xăng-ti-mét` : '', r ? `${r} mi-li-mét` : ''].filter(Boolean).join(' ');
};

function pickNpc(rng, history) {
  const recent = history.slice(-3).map(m => m.npc.id);
  return rng.pick(NPCS.filter(n => !recent.includes(n.id)));
}

/** Số mm ngẫu nhiên trong [lo, hi], khoảng 2/3 số lần là số lẻ vạch (không tròn chục), khác lần trước. */
function pickMm(rng, lo, hi, prev) {
  const odd = rng() < 0.68;
  let v;
  do { v = rng.int(lo, hi); } while ((odd ? v % 10 === 0 : v % 10 !== 0) || v === prev);
  return v;
}

// ── Hình nhỏ: bảng hiệu, hoá đơn, dãy "cách chơi" ──
const rollIcon = (size = 40, color = 'pink') =>
  `<svg viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true">${ribbonRollSvg(62, 44, 34, color, { tail: 20 })}</svg>`;
const pieceIcon = (size = 28, color = 'pink') =>
  `<svg viewBox="-50 -22 100 44" width="${size}" height="${size}" aria-hidden="true">${ribbonPieceSvg(0, 0, 80, 22, color, { rot: -12, wave: 4 })}</svg>`;
const rulerIcon = (size = 28) =>
  `<svg viewBox="4 -2 92 40" width="${size}" height="${size}" aria-hidden="true">${rulerSvg(8, 6, { cm: 2, ppm: 3.4, pad: 2, h: 26 })}</svg>`;
const HOW_PICS = {
  drag: () => `<svg viewBox="0 -20 120 90" width="44" height="44" aria-hidden="true">${ribbonStripSvg(6, 114, 26, 14, 'pink')}${rulerSvg(2, 42, { cm: 3, ppm: 3.4, pad: 2, h: 26 })}${scissorsSvg(62, 12, 70, 90, { open: 20 })}</svg>`,
  lens: () => `<svg viewBox="0 0 100 100" width="44" height="44" aria-hidden="true">${magnifierSvg(44, 44, 32, rulerSvg(0, 30, { cm: 2, ppm: 5, pad: 2, h: 34 }), { sx: 36, sy: 42, zoom: 1.6, handle: 45 })}</svg>`,
  piece: () => pieceIcon(44),
};

export const RIBBON_GAME = {
  ...stallMeta('ribbon'),
  unitWord: 'khách',
  levels: RIBBON_LEVELS,
  stallIcon: () => rollIcon(56),
  summaryText: (ok, total) => `Em đã cắt ruy băng cho <strong>${ok}/${total}</strong> khách hài lòng.`,

  howTo(level) {
    return [...level.how.map(([p, label]) => ({ pic: HOW_PICS[p]?.() || p, label })), { pic: '😊', label: 'Khách vui' }];
  },

  makeMission(rng, level, history) {
    const npc = pickNpc(rng, history);
    const prev = history[history.length - 1];
    const i = history.length;
    const color = rng.pick(RIBBON_COLORS.filter(c => c !== prev?.color));
    if (level.id === 'ribbon-1') return { npc, color, kind: 'cut', mm: pickMm(rng, 12, 96, prev?.mm) };
    if (level.id === 'ribbon-2') {
      const kind = ['convert', 'measure', 'cutcm', 'convert', 'measure'][i % 5];
      // Đổi đơn vị luôn có cả cm lẫn mm ("6 cm 5 mm"); cắt thẳng thỉnh thoảng tròn cm ("8 cm").
      let mm;
      do { mm = kind === 'cutcm' ? pickMm(rng, 21, 96, prev?.mm) : rng.int(21, 96); } while ((kind !== 'cutcm' && mm % 10 === 0) || mm === prev?.mm);
      return { npc, color, kind, mm };
    }
    let k, p;
    do {
      k = rng.int(3, 14);
      p = rng.int(2, k >= 10 ? 6 : 9);
    } while (k * p > 90 || k * p < 10 || (prev && prev.k === k));
    // Lượt 2 và 4: khách nói số mi-li-mét tròn chục ("70 mm") — bé tự đổi ra cm để tính tiền.
    return { npc, color, kind: 'price', k, p, mm: k * 10, inMm: i % 2 === 1 };
  },

  mountMission(stage, m, level, api) {
    const n = m.npc;
    const C = RIBBONS[m.color];
    const G = geom(level);
    const price = m.kind === 'price';
    const st = mountStall(stage, {
      npc: n, api, theme: 'ribbon',
      sign: price
        ? `${rollIcon(34, m.color)}<span><strong>Ruy băng</strong><br>1 cm giá <b>${m.p} nghìn đồng</b></span>`
        : `${rollIcon(34, m.color)}<span><strong>Ruy băng</strong><br>Đủ màu!</span>`,
      counter: '<div class="g3r-host"></div>',
    });
    const { speak, row, ask, nudge, fail, thanks } = st;
    const host = st.counter.querySelector('.g3r-host');
    const npcBox = stage.querySelector('.g3f-npc');
    const benchId = `g3rb${Math.random().toString(36).slice(2, 7)}`;
    const measure = m.kind === 'measure';

    // ── Trạng thái ──
    const maxMm = level.cm * 10;
    let mm = 0;                      // vị trí kéo (mi-li-mét, luôn tròn vạch)
    let open = 20;                   // góc mở lưỡi kéo
    let cutAt = null;                // đã cắt ở vạch nào
    let marks = [];
    let canCut = m.kind !== 'convert'; // đổi đơn vị: tính ở máy tính trước rồi mới cắt
    let locked = measure;
    let moved = false;
    let pieceUp = 0;                 // đoạn đã cắt nhấc lên một chút cho thấy đã rời
    let pieceGone = false;
    let dragging = false;

    // Phần tử của cảnh — dựng lại khi xoay máy (màn ngang ↔ dọc), trạng thái ở trên giữ nguyên.
    let L, svg, bench, hintG, uiG, lensG, cutBtn, table;
    const zoom = () => G.zoom * L.zoomK;

    const draw = () => {
      const x = G.x(mm);
      const rollCy = L.RY - 2 - G.rollR;
      let s = table + rulerSvg(RX, L.RY, { cm: level.cm, ppm: G.ppm, h: RH, marks });
      const roll = ribbonRollSvg(G.rollX, rollCy, G.rollR, m.color, { depth: G.rollR * 0.85 });
      if (measure) {
        // Đoạn đã cắt sẵn nằm trên thước từ vạch 0; phần còn lại vẫn ở cuộn.
        s += ribbonStripSvg(G.x(maxMm - 4), G.rollX, L.STRIP_Y, SH, m.color) + roll
          + (pieceGone ? '' : `<g data-piece>${ribbonStripSvg(G.zero, G.x(m.mm), L.STRIP_Y, SH, m.color)}</g>`);
      } else if (cutAt === null) {
        s += ribbonStripSvg(G.zero, G.rollX, L.STRIP_Y, SH, m.color) + roll;
      } else {
        const cx = G.x(cutAt);
        s += ribbonStripSvg(cx + 2, G.rollX, L.STRIP_Y, SH, m.color) + roll
          + (pieceGone ? '' : `<g data-piece transform="translate(0 ${-pieceUp})">${ribbonStripSvg(G.zero, cx - 1, L.STRIP_Y, SH, m.color)}</g>`);
      }
      if (!measure && !pieceGone) {
        // Nét chỉ chỗ lưỡi kéo sẽ cắt — dóng xuống vạch trên thước.
        if (cutAt === null) s += `<line x1="${x.toFixed(1)}" y1="${L.STRIP_Y - 4}" x2="${x.toFixed(1)}" y2="${L.RY + RH * 0.5}" stroke="#E4572E" stroke-width="1.6" stroke-dasharray="4 3"/>`;
        s += scissorsSvg(x, L.STRIP_Y + SH - SCI * 0.6, SCI, 90, { open }); // mũi kéo dừng ở mép dưới dải — không che vạch thước
      }
      bench.innerHTML = s;
      // Kính lúp luôn soi chỗ lưỡi kéo (lượt đo: soi đầu đoạn ruy băng).
      const fx = measure ? G.x(m.mm) : x, z = zoom();
      lensG.setAttribute('transform', `translate(${(L.LENS.cx - z * fx).toFixed(1)} ${(L.LENS.cy - z * (L.RY + 8)).toFixed(1)}) scale(${z})`);
      hintG.innerHTML = !moved && canCut && !locked ? `<text class="g3k-hand" x="${(x + 26).toFixed(1)}" y="${L.STRIP_Y - 58}" font-size="34" text-anchor="middle">👆</text>` : '';
      syncUi();
    };

    function syncUi() {
      if (!cutBtn) return;
      cutBtn.disabled = locked || !canCut || mm <= 0;
      uiG.querySelectorAll('[data-step]').forEach(b => { b.disabled = locked || !canCut; });
    }

    // Đổi đơn vị: động vào kéo khi chưa tính → khách nhắc tính trước, máy tính tiền rung nhẹ.
    let lastHint = -Infinity;
    const hintCalc = () => {
      nudge();
      if (performance.now() - lastHint < 2500) return;
      lastHint = performance.now();
      speak(`Khoan đã ${n.you} ơi! Đổi ${spokenCmMm(m.mm)} ra mi-li-mét trước!`, null, 'Đổi ra <b>mm</b> ở máy tính trước! 👉');
    };
    const setMm = (v) => {
      const nv = Math.max(0, Math.min(maxMm, Math.round(v)));
      if (nv !== mm) { mm = nv; if (!calmMotion() || nv % 5 === 0) sfx.tap(); }
      moved = true;
      draw();
    };

    // Kéo cây kéo: chạm bất cứ đâu trên dải ruy băng / thước, kéo đi theo ngón tay (bám vạch mm gần nhất).
    const toSvg = (e) => {
      const pt = svg.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY;
      return pt.matrixTransform(svg.getScreenCTM().inverse());
    };
    const zone = (p) => p.y > L.STRIP_Y - 90 && p.y < L.RY + RH + 6 && p.x > RX - 10 && p.x < G.end + 6;

    function build() {
      // Màn dọc: đo khung (cảnh rộng 600) → bề cao cảnh; tối thiểu cao thêm 120, tối đa 520.
      let dy = 0;
      if (isTall()) {
        const r = host.getBoundingClientRect();
        dy = r.width > 0 && r.height > 0 ? Math.round(Math.max(120, Math.min(520, (W * r.height) / r.width - 400))) : 240;
      }
      L = layout(dy);
      table = sewingTableSvg(8, 176 + L.dy, 584, 220);
      host.innerHTML = `
        <svg class="g3r-scene${L.tall ? ' g3r-tall' : ''}" viewBox="0 0 ${W} ${L.H}" role="img" aria-label="Bàn cắt ruy băng có thước mi-li-mét">
          ${rollRackSvg(...L.rack)}
          <g id="${benchId}" data-bench></g>
          <g data-hint></g>
          <g data-lens-host></g>
          <g data-ui></g>
        </svg>`;
      svg = host.querySelector('svg');
      bench = svg.querySelector('[data-bench]');
      hintG = svg.querySelector('[data-hint]');
      uiG = svg.querySelector('[data-ui]');
      svg.querySelector('[data-lens-host]').innerHTML = magnifierSvg(L.LENS.cx, L.LENS.cy, L.LENS.r, `<use href="#${benchId}"/>`, { sx: G.zero, sy: L.RY + 8, zoom: zoom(), handle: 135 });
      lensG = svg.querySelector('[data-lens]');

      // ── Nút: ◀ ▶ nhích 1 mm, ✂️ Cắt (tự xác nhận) ──
      uiG.innerHTML = measure ? '' : `<foreignObject x="${RX}" y="${332 + L.dy}" width="${W - RX * 2}" height="62"><div xmlns="http://www.w3.org/1999/xhtml" class="g3r-ctrls">
          <button type="button" class="g3g-btn g3g-btn-ghost g3r-nudge" data-step="-1" aria-label="Lùi kéo 1 mi-li-mét">◀</button>
          <button type="button" class="g3g-btn g3g-btn-ghost g3r-nudge" data-step="1" aria-label="Tiến kéo 1 mi-li-mét">▶</button>
          <button type="button" class="g3g-btn g3g-btn-primary g3r-cut" data-act="cut" disabled><b>✂️ Cắt</b><small>Đặt kéo đúng vạch rồi bấm</small></button>
        </div></foreignObject>`;
      cutBtn = uiG.querySelector('[data-act="cut"]');
      if (cutBtn) cutBtn.onclick = onCut;
      uiG.querySelectorAll('[data-step]').forEach(b => {
        b.onclick = () => { if (!canCut) return hintCalc(); if (!locked) setMm(mm + Number(b.dataset.step)); };
      });

      if (!measure) {
        svg.classList.add('g3r-drag');
        svg.addEventListener('pointerdown', (e) => {
          if (locked || e.target.closest('foreignObject')) return;
          const p = toSvg(e);
          if (!zone(p)) return;
          if (!canCut) return hintCalc();
          e.preventDefault();
          try { svg.setPointerCapture(e.pointerId); } catch { /* con trỏ không còn */ }
          dragging = true;
          setMm((p.x - G.zero) / G.ppm);
        });
        svg.addEventListener('pointermove', (e) => { if (dragging && !locked) setMm((toSvg(e).x - G.zero) / G.ppm); });
        ['pointerup', 'pointercancel'].forEach(ev => svg.addEventListener(ev, () => { dragging = false; }));
        svg.tabIndex = 0;
        svg.addEventListener('keydown', (e) => {
          if (locked || !canCut) return;
          if (e.key === 'ArrowLeft') { e.preventDefault(); setMm(mm - 1); }
          if (e.key === 'ArrowRight') { e.preventDefault(); setMm(mm + 1); }
        });
      }
      draw();
    }
    build();
    // Xoay máy giữa lượt (nút ngang / dọc hoặc xoay tay), hay khung đổi cỡ (máy tính tiền hiện ra ở màn dọc):
    // dựng lại cảnh theo khổ mới — chỉ khi khổ thật sự đổi, và không dựng lại giữa lúc đang kéo.
    stage.classList.add('g3r-stage');
    const ro = new ResizeObserver(() => {
      if (!host.isConnected) { ro.disconnect(); return; }
      if (dragging) return;
      const r = host.getBoundingClientRect();
      const tall = isTall();
      const dy = tall && r.width > 0 ? Math.max(120, Math.min(520, (W * r.height) / r.width - 400)) : 0;
      if (tall !== L.tall || Math.abs(dy - L.dy) > 12) build();
    });
    ro.observe(host);
    if (import.meta.env.DEV) window.__g3ribbon = { set: (v) => { canCut = true; setMm(v); }, get: () => mm };

    /** Toạ độ màn hình tay khách cho đoạn ruy băng (tỉ lệ dài / rộng aspect). */
    const customerBox = (aspect) => {
      const r = npcBox.getBoundingClientRect();
      const w = Math.min(r.width * 0.9, r.height * 0.5 * aspect, 180);
      const h = w / aspect;
      return { left: r.left + r.width / 2 - w / 2, top: r.top + r.height * 0.5, width: w, height: h };
    };
    /** Đoạn ruy băng đã cắt bay tới tay khách, uốn nhẹ như dải vải. */
    const flyPiece = (len, onLand) => {
      const x0 = G.zero, x1 = G.x(len);
      const pw = x1 - x0, pad = 10;           // bề dài đoạn ruy băng (đơn vị cảnh)
      const from = svgBoxOnScreen(svg, x0 - pad, L.STRIP_Y - pieceUp - pad, pw + pad * 2, SH + pad * 2);
      const html = `<svg viewBox="${-pw / 2 - pad} ${-SH / 2 - pad} ${pw + pad * 2} ${SH + pad * 2}" preserveAspectRatio="none" aria-hidden="true">${ribbonPieceSvg(0, 0, pw, SH, m.color, { wave: 4 })}</svg>`;
      pieceGone = true;
      draw();
      sfx.pop(3);
      flyOne(html, from, customerBox((pw + pad * 2) / (SH + pad * 2)), { minMs: 600, maxMs: 900, spin: 10, onLand });
    };
    const happy = () => { npcBox.innerHTML = npcPic(n, 'happy'); thanks(); };

    // ── Cắt ──
    const snip = (onDone) => {
      sfx.swish();
      const t0 = performance.now(), dur = 170;
      const frame = (now) => {
        if (!host.isConnected) return;
        const k = Math.min(1, (now - t0) / dur);
        open = 20 * (1 - k);
        draw();
        if (k < 1) return requestAnimationFrame(frame);
        cutAt = mm;
        const t1 = performance.now();
        const lift = (now2) => {
          if (!host.isConnected) return;
          const k2 = Math.min(1, (now2 - t1) / 260);
          pieceUp = 8 * k2;
          open = 20 * k2;
          draw();
          if (k2 < 1) return requestAnimationFrame(lift);
          onDone();
        };
        requestAnimationFrame(lift);
      };
      requestAnimationFrame(frame);
    };

    const want = m.mm;
    const tipFor = () => {
      const c = Math.floor(want / 10), r = want % 10;
      if (price) return m.inMm ? `${want} mm = ${m.k} cm (1 cm = 10 mm): cắt ở vạch số <b>${m.k}</b>.` : `Cắt đúng ở vạch có số <b>${m.k}</b>. Mỗi số trên thước là 1 cm.`;
      if (!r) return `${cmmm(want)} = ${want} mm: cắt đúng ở vạch có số <b>${c}</b>.`;
      return `1 cm = 10 mm. Tìm vạch số <b>${c}</b> (${c * 10} mm) rồi đếm thêm <b>${r} vạch nhỏ</b> là ${want} mm.`;
    };

    function onCut() {
      if (!cutBtn || cutBtn.disabled) return;
      locked = true;
      syncUi();
      snip(() => {
        const ok = cutAt === want;
        marks = [{ mm: want, color: ok ? COLORS.OK : COLORS.WARN, label: price && !m.inMm ? `${m.k} cm` : `${want} mm` }];
        draw();
        if (!ok) {
          const short = cutAt < want;
          speak(short ? `Ngắn quá ${n.you} ơi! ${cap(n.me)} cần ${price && !m.inMm ? `${m.k} xăng-ti-mét` : spokenMm(want)} cơ.` : `Dài quá ${n.you} ơi! ${cap(n.me)} chỉ cần ${price && !m.inMm ? `${m.k} xăng-ti-mét` : spokenMm(want)} thôi.`, 'sad',
            short ? 'Ngắn quá rồi!' : 'Dài quá rồi!');
          api.fail(`Em cắt <b>${cutAt} mm</b> (${cmmm(cutAt)}), khách cần <b>${want} mm</b> (${cmmm(want)}), ${short ? 'ngắn' : 'dài'} hơn ${Math.abs(want - cutAt)} mm.`, tipFor());
          return;
        }
        sfx.ding();
        if (price) return askPrice();
        speak(`Đúng ${spokenMm(want)} rồi!`, null, `Đúng <b>${want} mm</b>! 🎉`);
        setTimeout(() => flyPiece(want, happy), 450);
      });
    }

    // ── Cấp 3: tính tiền ──
    function askPrice() {
      const total = m.k * m.p;
      speak(`Đúng ${m.k} xăng-ti-mét rồi! 1 xăng-ti-mét giá ${m.p} nghìn đồng. ${cap(n.me)} phải trả bao nhiêu tiền hả ${n.you}?`, null,
        `<b>${m.k} cm</b>, 1 cm giá <b>${m.p} nghìn đồng</b>. Bao nhiêu tiền?`);
      ask(row(pieceIcon(28, m.color), '1 cm', `<b>${m.p} nghìn</b>`) + row(pieceIcon(28, m.color), `${m.k} cm`, Q, true), 'nghìn đồng', (v, pad) => {
        if (v !== total) {
          pad.lock('g3g-keypad-bad');
          fail(`${m.k} cm, mỗi cm ${m.p} nghìn đồng: <b>${m.p} × ${m.k} = ${total} nghìn đồng</b>.`, `Giá 1 cm nhân với số cm: ${m.p} × ${m.k} = ${total}.`);
          return;
        }
        pad.lock('g3g-keypad-ok');
        flyPiece(want, happy);
      });
    }

    // ── Bắt đầu nhiệm vụ ──
    const colorWord = `ruy băng ${C.name}`;
    if (m.kind === 'cut') {
      speak(`${cap(n.you)} cắt cho ${n.me} ${spokenMm(want)} ${colorWord}!`, null, `Cắt cho ${n.me} <b class="g3f-want">${want} mm</b>!`);
      return;
    }
    if (m.kind === 'cutcm') {
      speak(`${cap(n.you)} cắt cho ${n.me} ${spokenCmMm(want)} ${colorWord}!`, null, `Cắt cho ${n.me} <b class="g3f-want">${cmmm(want)}</b>!`);
      return;
    }
    if (price) {
      speak(m.inMm
        ? `${cap(n.you)} bán cho ${n.me} ${spokenMm(want)} ${colorWord}!`
        : `${cap(n.you)} bán cho ${n.me} ${m.k} xăng-ti-mét ${colorWord}!`, null,
      `Bán cho ${n.me} <b class="g3f-want">${m.inMm ? `${want} mm` : `${m.k} cm`}</b>!`);
      return;
    }
    if (m.kind === 'convert') {
      speak(`${cap(n.you)} cắt cho ${n.me} ${spokenCmMm(want)} ${colorWord}! ${cap(spokenCmMm(want))} là bao nhiêu mi-li-mét?`, null,
        `<b class="g3f-want">${cmmm(want)}</b> là bao nhiêu mm?`);
      ask(row(rulerIcon(), 'Khách cần', `<b>${cmmm(want)}</b>`) + row(pieceIcon(28, m.color), 'Đổi ra', Q, true), 'mm', (v, pad) => {
        if (v !== want) {
          pad.lock('g3g-keypad-bad');
          locked = true;
          draw();
          const c = Math.floor(want / 10);
          fail(`${cmmm(want)} = <b>${want} mm</b>.`, `1 cm = 10 mm, nên ${c} cm = ${c * 10} mm; thêm ${want % 10} mm là ${want} mm.`);
          return;
        }
        pad.lock('g3g-keypad-ok');
        canCut = true;
        speak(`Đúng rồi! ${cap(n.you)} cắt ${spokenMm(want)}!`, null, `Cắt <b class="g3f-want">${want} mm</b>!`);
        draw();
        // Đã đổi xong: máy tính tiền về nghỉ — màn dọc điện thoại lấy lại chỗ cho thước khi cắt.
        setTimeout(() => { if (host.isConnected) st.rest(); }, 900);
      });
      return;
    }
    // Đo đoạn đã cắt sẵn
    speak(`${cap(n.me)} có đoạn ${colorWord} này. Nó dài bao nhiêu mi-li-mét hả ${n.you}?`, null, 'Đoạn ruy băng dài <b class="g3f-want">bao nhiêu mm</b>?');
    ask(row(pieceIcon(28, m.color), 'Dài', Q, true), 'mm', (v, pad) => {
      marks = [{ mm: want, color: v === want ? COLORS.OK : COLORS.WARN, label: `${want} mm` }];
      draw();
      if (v !== want) {
        pad.lock('g3g-keypad-bad');
        const c = Math.floor(want / 10);
        fail(`Đầu đoạn ruy băng ở vạch 0, đầu kia ở vạch <b>${want} mm</b> (${cmmm(want)}).`,
          `Đầu kia qua vạch số ${c} (${c * 10} mm) thêm ${want % 10} vạch nhỏ: ${c * 10} + ${want % 10} = ${want} mm.`);
        return;
      }
      pad.lock('g3g-keypad-ok');
      speak(`Đúng ${spokenMm(want)} rồi!`, null, `Đúng <b>${want} mm</b>! 🎉`);
      setTimeout(() => flyPiece(want, happy), 450);
    });
  },
};

