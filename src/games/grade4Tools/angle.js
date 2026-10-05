/**
 * 📐 Thước đo góc (Bài 7, 8, 9, 35).
 *  - Góc đỉnh O, hai cạnh OA, OB vẽ trên giấy. Thước đo góc bán nguyệt trong suốt, hai vòng số:
 *    vòng trong số 0 ở bên phải, vòng ngoài số 0 ở bên trái (như thước thật).
 *  - Kéo thân thước để dời, kéo núm tròn ở đầu thước để xoay. Gần đỉnh O thì hít vào, gần một cạnh thì xoay khớp.
 *    Khi tâm ở O và vạch 0 nằm trên một cạnh: vòng số có số 0 trên cạnh đó sáng lên, vòng kia mờ đi,
 *    và số đo hiện ở chỗ cạnh còn lại cắt thước.
 *  - Quạt góc (Bài 8): kéo đầu cạnh OB để mở góc; nền tô màu theo loại góc (nhọn, vuông, tù, bẹt).
 *  - Đồng hồ: hai kim tạo góc, tô màu theo loại góc.
 * Góc tính theo độ, ngược chiều kim đồng hồ từ hướng sang phải (toán học); SVG trục y hướng xuống.
 */

import { css, emitter, INK, sfx } from './frame.js';
import { sleep } from '../grade3Drills/kit.js';
import { calmMotion } from '../grade3Games/fly.js';

const W = 1000, H = 560;
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}, html = '') => {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (html) e.innerHTML = html;
  return e;
};
const rad = (d) => (d * Math.PI) / 180;
const norm = (d) => ((d % 360) + 360) % 360;
/** Hiệu góc nhỏ nhất (−180, 180]. */
const diff = (a, b) => { const d = norm(a - b); return d > 180 ? d - 360 : d; };
const pt = (o, deg, r) => ({ x: o.x + r * Math.cos(rad(deg)), y: o.y - r * Math.sin(rad(deg)) });
const anim = (ms) => (calmMotion() ? Math.round(ms * 0.8) : ms);

export const KIND = (deg) => (deg < 89.5 ? 'nhọn' : deg <= 90.5 ? 'vuông' : deg < 179.5 ? 'tù' : 'bẹt');
const KIND_COLOR = { 'nhọn': '#FDE68A', 'vuông': '#BBF7D0', 'tù': '#FDBA74', 'bẹt': '#FCA5A5' };
const KIND_INK = { 'nhọn': '#A16207', 'vuông': '#15803D', 'tù': '#C2410C', 'bẹt': '#B91C1C' };

const PR = 300; // bán kính thước

/** Thước đo góc vẽ quanh tâm (0,0): cung phía trên (y âm). */
function protractorSvg() {
  let ticks = '';
  for (let d = 0; d <= 180; d++) {
    const len = d % 10 === 0 ? 30 : d % 5 === 0 ? 20 : 11;
    const a = pt({ x: 0, y: 0 }, d, PR), b = pt({ x: 0, y: 0 }, d, PR - len);
    ticks += `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="${INK}" stroke-width="${d % 10 ? 1.4 : 2.4}"/>`;
  }
  let inner = '', outer = '';
  for (let d = 0; d <= 180; d += 10) {
    const pi = pt({ x: 0, y: 0 }, d, PR - 76), po = pt({ x: 0, y: 0 }, d, PR - 45);
    const rot = 90 - d;
    inner += `<text x="${pi.x.toFixed(1)}" y="${pi.y.toFixed(1)}" transform="rotate(${rot} ${pi.x.toFixed(1)} ${pi.y.toFixed(1)})" class="g4a-in">${d}</text>`;
    outer += `<text x="${po.x.toFixed(1)}" y="${po.y.toFixed(1)}" transform="rotate(${rot} ${po.x.toFixed(1)} ${po.y.toFixed(1)})" class="g4a-out">${180 - d}</text>`;
  }
  return `
    <path d="M${-PR - 24} 0 A ${PR + 24} ${PR + 24} 0 0 1 ${PR + 24} 0 V 22 H ${-PR - 24} Z" class="g4a-body"/>
    <path d="M${-PR + 105} 0 A ${PR - 105} ${PR - 105} 0 0 1 ${PR - 105} 0" fill="none" stroke="${INK}" stroke-width="1.5" opacity="0.5"/>
    ${ticks}
    <g class="g4a-ring g4a-ring-in">${inner}</g>
    <g class="g4a-ring g4a-ring-out">${outer}</g>
    <line x1="${-PR - 24}" y1="0" x2="${PR + 24}" y2="0" stroke="${INK}" stroke-width="2.5"/>
    <circle r="7" fill="#fff" stroke="#DC2626" stroke-width="3"/><line x1="0" y1="-14" x2="0" y2="14" stroke="#DC2626" stroke-width="2.5"/>
    <g class="g4a-knob" transform="translate(${PR + 58} 0)"><circle r="30" fill="#FDE047" stroke="${INK}" stroke-width="4"/>
      <path d="M-12 -8 A 14 14 0 1 1 -12 8" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M-20 4 L-12 10 L-6 2" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>`;
}

/**
 * host: phần tử chứa. opts: o (đỉnh), a, b (hướng hai cạnh, độ), names (['A','O','B']), protractor (có thước),
 * fan (kéo được cạnh OB), shade (tô màu loại góc), clock (giờ: vẽ mặt đồng hồ thay cho hai cạnh).
 */
export function createAngle(host, { o = { x: 500, y: 430 }, a = 0, b = 60, names = ['A', 'O', 'B'], protractor = true, fan = false, shade = false, rayLen = 340 } = {}) {
  injectAngleStyles();
  const t = emitter({});
  host.innerHTML = `<div class="g4a"><div class="g4a-cap">&nbsp;</div><svg class="g4a-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet"></svg></div>`;
  const svg = host.querySelector('svg');
  // Nền: tờ giấy kẻ ô nhạt
  svg.append(el('g', { 'aria-hidden': 'true' }, `
    <defs><pattern id="g4a-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0 H0 V40" fill="none" stroke="#E0F2FE" stroke-width="2"/></pattern></defs>
    <rect x="-1000" y="-1000" width="${W + 2000}" height="${H + 2000}" fill="url(#g4a-grid)"/>`));
  const gShade = el('g');
  const gRays = el('g');
  const gProt = el('g', { class: 'g4a-prot' }, protractorSvg());
  const gRead = el('g');
  svg.append(gShade, gRays, gProt, gRead);
  const S = { o: { ...o }, a, b, names, shade, fan, px: 160, py: 520, rot: 0, onO: false, onRay: null };
  if (!protractor) gProt.style.display = 'none';

  t.svg = svg;
  t.state = S;
  t.caption = (html) => { host.querySelector('.g4a-cap').innerHTML = html || '&nbsp;'; };
  /** Số đo góc AOB (0..180). */
  t.measure = () => Math.abs(diff(S.b, S.a));
  t.kind = () => KIND(t.measure());

  function drawRays() {
    const A = pt(S.o, S.a, rayLen), B = pt(S.o, S.b, rayLen);
    const m = t.measure();
    gShade.innerHTML = '';
    if (S.shade) {
      const k = KIND(m);
      const r = 120;
      const p1 = pt(S.o, S.a, r), p2 = pt(S.o, S.b, r);
      const sweep = diff(S.b, S.a) > 0 ? 0 : 1;
      if (k === 'vuông') {
        const q = 46, c1 = pt(S.o, S.a, q), c2 = pt(S.o, S.b, q), c3 = { x: c1.x + c2.x - S.o.x, y: c1.y + c2.y - S.o.y };
        gShade.innerHTML = `<path d="M${S.o.x} ${S.o.y} L${p1.x} ${p1.y} A ${r} ${r} 0 0 ${sweep} ${p2.x} ${p2.y} Z" fill="${KIND_COLOR[k]}" stroke="${KIND_INK[k]}" stroke-width="3"/>
          <path d="M${c1.x} ${c1.y} L${c3.x} ${c3.y} L${c2.x} ${c2.y}" fill="none" stroke="${KIND_INK[k]}" stroke-width="4"/>`;
      } else {
        gShade.innerHTML = `<path d="M${S.o.x} ${S.o.y} L${p1.x} ${p1.y} A ${r} ${r} 0 ${m > 180 ? 1 : 0} ${sweep} ${p2.x} ${p2.y} Z" fill="${KIND_COLOR[k]}" stroke="${KIND_INK[k]}" stroke-width="3"/>`;
      }
    }
    // tên điểm giữ trong khung nhìn (cạnh OB xoay sát mép trái/phải thì chữ không bị cắt)
    const vb = svg.viewBox.baseVal;
    const lab = (P, deg, txt) => {
      const q = pt(S.o, deg, rayLen + (S.fan ? 58 : 34));
      const x = vb && vb.width ? Math.min(vb.x + vb.width - 30, Math.max(vb.x + 30, q.x)) : q.x;
      const lift = Math.abs(x - q.x) > 4 ? (S.fan ? 52 : 36) : 0; // bị kéo vào trong: nhấc lên, khỏi đè đầu cạnh / chấm kéo
      return `<text x="${x}" y="${q.y + 14 - lift}" class="g4a-name">${txt}</text>`;
    };
    gRays.innerHTML = `
      <line x1="${S.o.x}" y1="${S.o.y}" x2="${A.x}" y2="${A.y}" class="g4a-ray"/>
      <line x1="${S.o.x}" y1="${S.o.y}" x2="${B.x}" y2="${B.y}" class="g4a-ray g4a-ray-b"/>
      <circle cx="${S.o.x}" cy="${S.o.y}" r="7" fill="${INK}"/>
      ${lab(A, S.a, S.names[0])}${lab(B, S.b, S.names[2])}
      <text x="${S.o.x - 30}" y="${S.o.y + 44}" class="g4a-name">${S.names[1]}</text>
      ${S.fan ? `<g class="g4a-handle" transform="translate(${B.x} ${B.y})"><circle r="30" fill="#60A5FA" stroke="${INK}" stroke-width="4"/><circle r="9" fill="#fff"/></g>` : ''}`;
  }

  function placeProt() {
    gProt.setAttribute('transform', `translate(${S.px} ${S.py}) rotate(${-S.rot})`);
    // Khớp: tâm ở O, đường 0 trùng một cạnh, cạnh kia nằm dưới cung thước.
    S.onO = Math.hypot(S.px - S.o.x, S.py - S.o.y) < 1;
    S.onRay = null;
    gRead.innerHTML = '';
    gProt.classList.remove('g4a-use-in', 'g4a-use-out');
    if (!S.onO) return;
    for (const [ray, other] of [[S.a, S.b], [S.b, S.a]]) {
      const right = Math.abs(diff(S.rot, ray)) < 0.6; // đầu phải thước (số 0 vòng trong) nằm trên cạnh
      const left = Math.abs(diff(S.rot + 180, ray)) < 0.6; // đầu trái (số 0 vòng ngoài)
      if (!right && !left) continue;
      const rel = diff(other, S.rot); // góc của cạnh kia so với đầu phải
      if (rel < -0.5 || rel > 180.5) continue; // cạnh kia không nằm dưới cung
      S.onRay = { ray, ring: right ? 'in' : 'out' };
      gProt.classList.add(right ? 'g4a-use-in' : 'g4a-use-out');
      const val = Math.round(t.measure());
      const p = pt(S.o, other, PR + 70);
      gRead.innerHTML = `<g class="g4a-readout" transform="translate(${p.x} ${p.y})"><rect x="-62" y="-30" width="124" height="60" rx="14" fill="#fff" stroke="#DC2626" stroke-width="4"/>
        <text x="0" y="16" class="g4a-readtxt">${val}°</text></g>
        <line x1="${pt(S.o, other, PR - 4).x}" y1="${pt(S.o, other, PR - 4).y}" x2="${pt(S.o, other, PR + 40).x}" y2="${pt(S.o, other, PR + 40).y}" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>`;
      break;
    }
  }

  t.set = (o) => { Object.assign(S, o); drawRays(); placeProt(); };
  t.showReadout = (on) => { gRead.style.visibility = on ? '' : 'hidden'; };
  t.isAligned = () => !!S.onRay;
  t.protVisible = (on) => { gProt.style.display = on ? '' : 'none'; };

  /** Thầy làm mẫu: thước bay tới (x, y, rot). */
  t.moveProt = async (x, y, rot, ms = 900) => {
    const x0 = S.px, y0 = S.py, r0 = S.rot, dr = diff(rot, r0);
    const dur = anim(ms), t0 = performance.now();
    await new Promise((res) => {
      const step = (now) => {
        const k = Math.min(1, (now - t0) / dur), e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
        S.px = x0 + (x - x0) * e; S.py = y0 + (y - y0) * e; S.rot = r0 + dr * e;
        if (k >= 1) { S.px = x; S.py = y; S.rot = norm(rot); }
        placeProt();
        if (k < 1) requestAnimationFrame(step); else res();
      };
      requestAnimationFrame(step);
    });
    t.emit('prot');
  };
  /** Thầy làm mẫu: mở cạnh OB tới góc `deg` (so với OA, ngược chiều kim đồng hồ). */
  t.openTo = async (deg, ms = 900) => {
    const b0 = S.b, b1 = S.a + deg, dur = anim(ms), t0 = performance.now();
    await new Promise((res) => {
      const step = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        S.b = b0 + (b1 - b0) * k;
        drawRays(); placeProt();
        if (k < 1) requestAnimationFrame(step); else res();
      };
      requestAnimationFrame(step);
    });
    t.emit('fan');
  };

  // ── Kéo thả ─────────────────────────────────────────────────────────────────────────────────────
  const toSvg = (e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };
  let drag = null;
  let locked = false;
  t.lock = (on) => { locked = on; svg.classList.toggle('g4a-locked', on); };
  svg.addEventListener('pointerdown', (e) => {
    if (locked) return;
    const p = toSvg(e);
    if (S.fan && e.target.closest('.g4a-handle')) drag = { kind: 'fan' };
    else if (e.target.closest('.g4a-knob')) drag = { kind: 'rot' };
    else if (e.target.closest('.g4a-prot')) drag = { kind: 'move', dx: S.px - p.x, dy: S.py - p.y };
    else return;
    svg.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  svg.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const p = toSvg(e);
    if (drag.kind === 'move') {
      S.px = p.x + drag.dx; S.py = p.y + drag.dy;
      if (Math.hypot(S.px - S.o.x, S.py - S.o.y) < 34) { S.px = S.o.x; S.py = S.o.y; }
      placeProt();
    } else if (drag.kind === 'rot') {
      let r = norm(Math.atan2(-(p.y - S.py), p.x - S.px) * 180 / Math.PI);
      // hít vào cạnh khi gần (đầu phải hoặc đầu trái thước)
      for (const ray of [S.a, S.b]) for (const c of [ray, ray + 180]) if (Math.abs(diff(r, c)) < 6) r = norm(c);
      S.rot = r;
      placeProt();
    } else if (drag.kind === 'fan') {
      let d = norm(Math.atan2(-(p.y - S.o.y), p.x - S.o.x) * 180 / Math.PI);
      let rel = norm(d - S.a);
      if (rel > 270) rel = 0; else if (rel > 180) rel = 180;
      for (const c of [90, 180, 0]) if (Math.abs(rel - c) < 4) rel = c;
      S.b = S.a + Math.round(rel);
      drawRays(); placeProt();
      t.emit('fan');
    }
  });
  const up = () => { if (drag) { const k = drag.kind; drag = null; if (k !== 'fan' && S.onRay) sfx.ding(); t.emit(k); } };
  svg.addEventListener('pointerup', up);
  svg.addEventListener('pointercancel', up);

  // Giãn khung nhìn theo chỗ trống (giữ đỉnh O ở giữa dưới).
  const fit = () => {
    const r = svg.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const asp = r.width / r.height;
    if (asp > W / H) { const w = H * asp; svg.setAttribute('viewBox', `${(W - w) / 2} 0 ${w} ${H}`); }
    // màn dọc: chừa thêm 100 mỗi bên, thước xoay nghiêng quanh O (gần mép trái) không bị cắt
    else { const ww = W + 200, h = ww / asp; svg.setAttribute('viewBox', `-100 ${(H - h) * 0.7} ${ww} ${h}`); }
    drawRays();
  };
  const ro = new ResizeObserver(() => { if (!svg.isConnected) { ro.disconnect(); return; } fit(); });
  ro.observe(svg);

  drawRays();
  placeProt();
  return t;
}

/** Mặt đồng hồ: hai kim lúc h giờ, góc giữa hai kim tô màu theo loại. */
export function createClockAngle(host, h) {
  injectAngleStyles();
  const t = emitter({});
  host.innerHTML = `<div class="g4a"><div class="g4a-cap">&nbsp;</div><svg class="g4a-svg" viewBox="-262 -262 524 640" preserveAspectRatio="xMidYMid meet"></svg></div>`;
  const svg = host.querySelector('svg');
  t.caption = (html) => { host.querySelector('.g4a-cap').innerHTML = html || '&nbsp;'; };
  t.set = (hh, { shade = true } = {}) => {
    const hourDeg = 90 - (hh % 12) * 30, minDeg = 90;
    const m = Math.abs(diff(hourDeg, minDeg));
    const k = KIND(m);
    const r = 95;
    const p1 = pt({ x: 0, y: 0 }, minDeg, r), p2 = pt({ x: 0, y: 0 }, hourDeg, r);
    const sweep = diff(hourDeg, minDeg) > 0 ? 0 : 1;
    let nums = '';
    for (let i = 1; i <= 12; i++) { const p = pt({ x: 0, y: 0 }, 90 - i * 30, 196); nums += `<text x="${p.x}" y="${p.y + 16}" class="g4a-cnum">${i}</text>`; }
    let ticks = '';
    for (let i = 0; i < 60; i++) { const a = pt({ x: 0, y: 0 }, i * 6, 236), b = pt({ x: 0, y: 0 }, i * 6, i % 5 ? 226 : 214); ticks += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${INK}" stroke-width="${i % 5 ? 2 : 5}"/>`; }
    const H1 = pt({ x: 0, y: 0 }, hourDeg, 120), M1 = pt({ x: 0, y: 0 }, minDeg, 172);
    svg.innerHTML = `<circle r="250" fill="#fff" stroke="${INK}" stroke-width="10"/>${ticks}${nums}
      ${shade ? (k === 'bẹt' ? `<path d="M0 ${-r} A ${r} ${r} 0 0 ${sweep} 0 ${r} Z" fill="${KIND_COLOR[k]}" stroke="${KIND_INK[k]}" stroke-width="3"/>`
        : `<path d="M0 0 L${p1.x} ${p1.y} A ${r} ${r} 0 0 ${sweep} ${p2.x} ${p2.y} Z" fill="${KIND_COLOR[k]}" stroke="${KIND_INK[k]}" stroke-width="3" opacity="0.9"/>`) : ''}
      <line x1="0" y1="0" x2="${H1.x}" y2="${H1.y}" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>
      <line x1="0" y1="0" x2="${M1.x}" y2="${M1.y}" stroke="#2563EB" stroke-width="10" stroke-linecap="round"/>
      <circle r="13" fill="${INK}"/>`;
    t.kind = k;
    return k;
  };
  t.set(h);
  return t;
}

let styled = false;
function injectAngleStyles() {
  if (styled) return;
  styled = true;
  css('g4-angle', `
    .g4a { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow: hidden; border-radius: 0.8rem; }
    .g4a-cap { flex: none; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(6.5cqh, 4cqi); line-height: 1.25; min-height: 1.3em; padding-top: 0.6cqh; }
    .g4a-cap b { color: #DC2626; }
    .g4a-svg { flex: 1; min-height: 0; width: 100%; height: 100%; font-family: 'Baloo 2', sans-serif; touch-action: none; user-select: none; }
    .g4a-body { fill: rgba(186, 230, 253, 0.55); stroke: #0369A1; stroke-width: 3; }
    .g4a-prot { cursor: grab; }
    .g4a-knob { cursor: grab; }
    .g4a-locked .g4a-prot, .g4a-locked .g4a-knob { cursor: default; }
    .g4a-in, .g4a-out { font-weight: 800; font-size: 21px; text-anchor: middle; dominant-baseline: middle; transition: opacity .25s, fill .25s; }
    .g4a-in { fill: #1D4ED8; }
    .g4a-out { fill: #B45309; font-size: 19px; }
    .g4a-use-in .g4a-ring-out, .g4a-use-out .g4a-ring-in { opacity: 0.18; }
    .g4a-use-in .g4a-in, .g4a-use-out .g4a-out { fill: #DC2626; font-size: 22px; }
    .g4a-ray { stroke: ${INK}; stroke-width: 6; stroke-linecap: round; }
    .g4a-name { font-weight: 800; font-size: 40px; fill: ${INK}; text-anchor: middle; }
    .g4a-handle { cursor: grab; }
    .g4a-readtxt { font-weight: 800; font-size: 40px; fill: #DC2626; text-anchor: middle; }
    .g4a-cnum { font-weight: 800; font-size: 44px; fill: ${INK}; text-anchor: middle; }
  `);
}

export { KIND_COLOR, KIND_INK, sleep };
