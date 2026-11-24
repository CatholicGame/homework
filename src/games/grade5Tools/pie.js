/**
 * 🥧 Biểu đồ hình quạt tròn (Toán 5 Bài 64): cả hình tròn là 100%, mỗi hình quạt là tỉ số phần trăm của một phần.
 *   - vành ngoài chia 100 vạch (5% vạch dài hơn, 25% có số) để thấy 25% = một phần tư, 50% = nửa hình tròn;
 *   - grow(): các quạt mọc dần theo chiều kim đồng hồ từ đỉnh (12 giờ);
 *   - chú thích bên cạnh (màn dọc: bên dưới): mỗi phần là một nút to (màu, tên, %), có ô gõ số (legendBox);
 *   - drag(i): em kéo chấm tròn ở mép quạt i để tô đúng số phần trăm (hít theo bước), sự kiện 'change' / 'drop';
 *   - chạm quạt hoặc hàng chú thích: sự kiện 'tap' (i).
 * pieSvg(): hình quạt nhỏ tĩnh (để làm nút chọn "biểu đồ nào đúng").
 */

import { css, emitter, INK, EDGE, sfx } from '../grade4Tools/frame.js';
import { calmMotion } from '../grade3Games/fly.js';
import { dec } from './num.js';

export const PIE_COLORS = ['#60A5FA', '#F472B6', '#FACC15', '#4ADE80', '#C084FC', '#FB923C'];
const R = 100;
const ms = (n) => (calmMotion() ? Math.round(n * 0.8) : n);
const r1 = (v) => Math.round(v * 100) / 100;
/** Điểm trên đường tròn bán kính r ở vị trí p% (0% ở đỉnh, theo chiều kim đồng hồ). */
const at = (p, r = R) => { const a = (p / 100) * 2 * Math.PI - Math.PI / 2; return { x: r1(r * Math.cos(a)), y: r1(r * Math.sin(a)) }; };
/** Hình quạt từ a% đến b%. */
function wedge(a, b, r = R) {
  if (b - a <= 0) return '';
  if (b - a >= 99.999) return `M0 ${-r} A${r} ${r} 0 1 1 0 ${r} A${r} ${r} 0 1 1 0 ${-r} Z`;
  const p = at(a, r), q = at(b, r);
  return `M0 0 L${p.x} ${p.y} A${r} ${r} 0 ${b - a > 50 ? 1 : 0} 1 ${q.x} ${q.y} Z`;
}
/** "12,5%". */
export const pctText = (p) => `${dec(p)}%`;

/** Vành 100 vạch (+ số 0%, 25%, 50%, 75%). */
function ring(labels = true) {
  let g = '';
  for (let k = 0; k < 100; k++) {
    const long = k % 25 === 0 ? 13 : k % 5 === 0 ? 8 : 4;
    const a = at(k, R + 2), b = at(k, R + 2 + long);
    g += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${k % 5 ? '#94A3B8' : '#475569'}" stroke-width="${k % 25 === 0 ? 2.4 : k % 5 === 0 ? 1.6 : 0.9}"/>`;
  }
  if (labels) [[0, '0%'], [25, '25%'], [50, '50%'], [75, '75%']].forEach(([p, s]) => {
    const c = at(p, R + 26);
    g += `<text x="${c.x}" y="${c.y + 5}" text-anchor="middle" font-size="14" font-weight="800" fill="#475569" font-family="Baloo 2, sans-serif">${s}</text>`;
  });
  return `<g class="g5pie-ring">${g}</g>`;
}

/** Hình quạt tĩnh: parts [{ pct, color }], kèm % trong quạt. */
export function pieSvg(parts, { labels = true, cls = '' } = {}) {
  let s = 0, body = '';
  parts.forEach((p, i) => {
    const color = p.color || PIE_COLORS[i % PIE_COLORS.length];
    body += `<path d="${wedge(s, s + p.pct)}" fill="${color}" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>`;
    s += p.pct;
  });
  s = 0;
  if (labels) parts.forEach((p) => {
    const c = at(s + p.pct / 2, p.pct < 12 ? R * 0.74 : R * 0.58);
    body += `<text x="${c.x}" y="${c.y + 8}" text-anchor="middle" font-size="${p.pct < 12 ? 20 : 26}" font-weight="800" fill="${INK}" font-family="Baloo 2, sans-serif" style="paint-order:stroke;stroke:#fff;stroke-width:5px">${pctText(p.pct)}</text>`;
    s += p.pct;
  });
  return `<svg class="g5pie-mini ${cls}" viewBox="-106 -106 212 212" aria-hidden="true">${body}<circle r="${R}" fill="none" stroke="${INK}" stroke-width="3"/></svg>`;
}

/**
 * parts: [{ label, pct, color?, auto? }] (auto: phần còn lại tự bằng 100% trừ các phần khác, dùng khi kéo).
 * opts: title (dòng trên cùng), labels (in % trong quạt: true | mảng bool), legend (true), hidden (mảng chỉ số chú thích
 *       hiện "?" thay số %), shown (0: chưa vẽ quạt nào, chờ grow()), explore (chừa đáy cho nút chọn của Khám phá).
 */
export function createPie(host, parts, { title = '', labels = true, legend = true, hidden = [], shown = 1, explore = false, ticks = true } = {}) {
  injectPieStyles();
  const t = emitter({});
  const P = parts.map((p, i) => ({ ...p, color: p.color || PIE_COLORS[i % PIE_COLORS.length] }));
  const lab = Array.isArray(labels) ? [...labels] : P.map(() => labels);
  const hid = new Set(hidden);
  let prog = shown; // 0..1: phần đã mọc
  let hl = -1, dragI = -1, step = 5, handle = false;
  host.innerHTML = `<div class="g5pie-wrap ${explore ? 'g5pie-ex' : ''}">
      <div class="g5pie-cap">${title || '&nbsp;'}</div>
      <div class="g5pie ${legend ? '' : 'g5pie-nolg'}">
        <div class="g5pie-pie"><svg viewBox="-136 -136 272 272" aria-hidden="true">
          <circle r="${R}" fill="#F8FAFC"/>
          <g class="g5pie-w"></g>${ticks ? ring() : ''}<circle r="${R}" fill="none" stroke="${INK}" stroke-width="3"/>
          <g class="g5pie-l"></g><g class="g5pie-h"></g></svg></div>
        ${legend ? `<div class="g5pie-lg" style="--k:${P.length}">${P.map((p, i) => `<button type="button" class="g5pie-row" data-i="${i}">
            <span class="g5pie-sw" style="background:${p.color}"></span><span class="g5pie-name">${p.label}</span><span class="g5pie-v"></span></button>`).join('')}</div>` : ''}
      </div>
    </div>`;
  const root = host.querySelector('.g5pie-wrap');
  const svg = root.querySelector('svg');
  const W = svg.querySelector('.g5pie-w'), L = svg.querySelector('.g5pie-l'), H = svg.querySelector('.g5pie-h');
  const rows = [...root.querySelectorAll('.g5pie-row')];

  const starts = () => { let s = 0; return P.map(p => { const a = s; s += p.pct; return a; }); };
  const fixAuto = () => {
    const k = P.findIndex(p => p.auto);
    if (k >= 0) P[k].pct = Math.max(0, 100 - P.reduce((a, p, i) => a + (i === k ? 0 : p.pct), 0));
  };
  function draw() {
    const S = starts(), lim = prog * 100;
    W.innerHTML = P.map((p, i) => {
      const a = S[i], b = Math.min(S[i] + p.pct, lim);
      return b > a ? `<path class="g5pie-q ${hl >= 0 && hl !== i ? 'g5pie-dim' : ''} ${hl === i ? 'g5pie-on' : ''}" data-i="${i}" d="${wedge(a, b)}" fill="${p.color}" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>` : '';
    }).join('');
    L.innerHTML = prog < 1 ? '' : P.map((p, i) => {
      if (!lab[i] || p.pct <= 0) return '';
      const small = p.pct < 12;
      const c = at(S[i] + p.pct / 2, small ? R * 0.76 : R * 0.6);
      return `<text x="${c.x}" y="${c.y + (small ? 6 : 8)}" text-anchor="middle" font-size="${small ? 17 : 23}" font-weight="800" fill="${INK}" font-family="Baloo 2, sans-serif" style="paint-order:stroke;stroke:#fff;stroke-width:5px">${pctText(p.pct)}</text>`;
    }).join('');
    if (handle && dragI >= 0) {
      const e = at(S[dragI] + P[dragI].pct);
      H.innerHTML = `<line x1="0" y1="0" x2="${e.x}" y2="${e.y}" stroke="${INK}" stroke-width="3"/><circle class="g5pie-knob" cx="${e.x}" cy="${e.y}" r="13" fill="#FDE047" stroke="${INK}" stroke-width="3"/>`;
    } else H.innerHTML = '';
    rows.forEach((r, i) => {
      r.classList.toggle('g5pie-dim', hl >= 0 && hl !== i);
      r.classList.toggle('g5pie-on', hl === i);
      const v = r.querySelector('.g5pie-v');
      if (!v.querySelector('.g4-box')) v.textContent = hid.has(i) ? '?' : pctText(P[i].pct);
    });
  }

  t.root = root;
  t.parts = () => P.map(p => ({ ...p }));
  t.pct = (i) => P[i].pct;
  t.caption = (html) => { root.querySelector('.g5pie-cap').innerHTML = html || '&nbsp;'; };
  t.row = (i) => rows[i];
  t.set = (i, p) => { P[i].pct = p; fixAuto(); draw(); t.emit('change', p); };
  t.label = (i, on = true) => { lab[i] = on; draw(); };
  t.labels = (on = true) => { lab.fill(on); draw(); };
  t.reveal = (i) => { hid.delete(i); const v = rows[i]?.querySelector('.g5pie-v'); if (v) v.textContent = pctText(P[i].pct); draw(); };
  t.hide = (i) => { hid.add(i); draw(); };
  t.hl = (i = -1) => { hl = i; draw(); };
  /** Ô gõ số % trong hàng chú thích i (ô trống như sách). */
  t.legendBox = (i) => {
    const v = rows[i].querySelector('.g5pie-v');
    v.innerHTML = '<span class="g4-box"></span><span class="g5pie-pc">%</span>';
    return v.querySelector('.g4-box');
  };
  /** Đổi chữ cột giá trị của hàng i (vd. "10 bạn"). */
  t.value = (i, html) => { rows[i].querySelector('.g5pie-v').innerHTML = html; };
  t.mark = (i, cls = 'ok') => rows[i]?.classList.add(`g5pie-${cls}`);
  t.pulse = (i) => {
    const q = W.querySelector(`[data-i="${i}"]`);
    q?.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.07)' }, { transform: 'scale(1)' }], { duration: ms(520), easing: 'ease-in-out' });
    rows[i]?.animate([{ transform: 'none' }, { transform: 'scale(1.05)' }, { transform: 'none' }], { duration: ms(520) });
  };
  /** Các quạt mọc dần từ đỉnh theo chiều kim đồng hồ. */
  t.grow = (dur = 1400) => new Promise((res) => {
    const d = ms(dur), t0 = performance.now();
    prog = 0; draw();
    sfx.swish?.();
    const tick = (now) => {
      prog = Math.min(1, (now - t0) / d);
      draw();
      if (prog < 1) requestAnimationFrame(tick); else res();
    };
    requestAnimationFrame(tick);
  });
  /** Quạt i kéo được: mép cuối của quạt theo ngón tay, hít theo bước st (%). */
  t.drag = (i, st = 5) => { dragI = i; step = st; handle = true; root.classList.add('g5pie-drag'); draw(); };
  t.undrag = () => { handle = false; dragI = -1; root.classList.remove('g5pie-drag'); draw(); };

  // ── chạm, kéo ─────────────────────────────────────────────────────────────────────────────────────
  const toPct = (e) => {
    const b = svg.getBoundingClientRect();
    const x = ((e.clientX - b.left) / b.width) * 272 - 136, y = ((e.clientY - b.top) / b.height) * 272 - 136;
    let a = Math.atan2(y, x) + Math.PI / 2;
    if (a < 0) a += 2 * Math.PI;
    return { p: (a / (2 * Math.PI)) * 100, r: Math.hypot(x, y) };
  };
  let dragging = false, last = null;
  svg.addEventListener('pointerdown', (e) => {
    const { p, r } = toPct(e);
    if (handle && dragI >= 0 && r > 18 && r < R + 40) {
      dragging = true; svg.setPointerCapture?.(e.pointerId); move(p); e.preventDefault(); return;
    }
    const q = e.target.closest('.g5pie-q');
    if (q) { sfx.tap(); t.emit('tap', +q.dataset.i); }
  });
  const move = (p) => {
    const S = starts();
    const others = P.reduce((a, x, i) => a + (i === dragI || x.auto ? 0 : x.pct), 0);
    let v = Math.round((p - S[dragI]) / step) * step;
    // gần đỉnh (100%) khi đang ở nửa sau: lấy cả vòng
    if (p - S[dragI] < 0) v = 0;
    v = Math.max(0, Math.min(100 - others, v));
    if (v !== P[dragI].pct) { P[dragI].pct = v; fixAuto(); draw(); if (v % 25 === 0) sfx.tick?.(); t.emit('change', v); }
    last = v;
  };
  svg.addEventListener('pointermove', (e) => { if (dragging) move(toPct(e).p); });
  const up = () => { if (!dragging) return; dragging = false; t.emit('drop', last ?? P[dragI].pct); };
  svg.addEventListener('pointerup', up);
  svg.addEventListener('pointercancel', up);
  rows.forEach((r, i) => r.addEventListener('click', () => { sfx.tap(); t.emit('tap', i); }));

  fixAuto();
  draw();
  if (import.meta.env.DEV) window.__g5pie = t;
  return t;
}

let styled = false;
function injectPieStyles() {
  if (styled) return;
  styled = true;
  css('g5-pie', `
    .g5pie-wrap { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; gap: 1cqh; container-type: size; box-sizing: border-box; padding: 0.5cqh 0.5cqi; }
    .g5pie-ex { padding-bottom: 19cqh; }
    .g5pie-cap { flex: none; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E3A5F; font-size: min(6cqh, 3.6cqi); line-height: 1.2; }
    .g5pie { flex: 1 1 0; min-height: 0; display: flex; gap: 2.5cqi; align-items: stretch; justify-content: center; }
    .g5pie-pie { flex: none; height: 100%; aspect-ratio: 1; max-width: 56cqi; display: flex; align-items: center; justify-content: center; }
    .g5pie-pie svg { width: 100%; height: 100%; overflow: visible; touch-action: none; }
    .g5pie-nolg .g5pie-pie { max-width: 100%; }
    .g5pie-q { cursor: pointer; transform-box: view-box; transform-origin: 0 0; transition: opacity .25s; }
    .g5pie-dim { opacity: 0.4; }
    .g5pie-drag .g5pie-knob { cursor: grab; animation: g5pieKnob 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 50%; }
    @keyframes g5pieKnob { 50% { transform: scale(1.25); } }
    .g5pie-lg { flex: 1 1 0; min-width: 0; max-width: 46cqi; display: flex; flex-direction: column; justify-content: center; gap: 1.6cqh; }
    .g5pie-row { flex: 1 1 0; max-height: 20cqh; min-height: 0; display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 0.5em; padding: 0.2em 0.6em;
      font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(calc(40cqh / var(--k)), 5.6cqh, 3.3cqi); line-height: 1.1; text-align: left;
      background: #fff; border: 2px solid ${EDGE}; border-radius: 0.7em; box-shadow: 0 5px 0 ${EDGE}; cursor: pointer; touch-action: manipulation; transition: opacity .25s, background .2s; }
    .g5pie-row:active { transform: translateY(3px); box-shadow: 0 2px 0 ${EDGE}; }
    .g5pie-row.g5pie-on { background: #FEF9C3; border-color: #F59E0B; box-shadow: 0 5px 0 #D97706; }
    .g5pie-row.g5pie-ok { border-color: #22C55E; box-shadow: 0 5px 0 #16A34A; }
    .g5pie-sw { width: 1.1em; height: 1.1em; border-radius: 0.25em; border: 2px solid ${INK}; }
    .g5pie-name { min-width: 0; overflow-wrap: anywhere; }
    .g5pie-v { justify-self: end; color: #1D4ED8; white-space: nowrap; display: inline-flex; align-items: center; gap: 0.1em; }
    .g5pie-v .g4-box { min-width: 2.2em; }
    .g5pie-mini { width: 100%; height: 100%; }
    @container (max-aspect-ratio: 6/5) {
      .g5pie { flex-direction: column; align-items: center; gap: 2cqh; }
      .g5pie-pie { flex: 1 1 0; min-height: 0; width: 100%; height: auto; aspect-ratio: auto; max-width: none; }
      .g5pie-lg { width: 100%; max-width: none; flex: none; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: auto; gap: 1.2cqh 2cqi; }
      .g5pie-row { max-height: none; min-height: 9cqh; font-size: min(4.6cqh, 5.4cqi); }
      .g5pie-cap { font-size: min(4.6cqh, 5.4cqi); }
    }
  `);
}
