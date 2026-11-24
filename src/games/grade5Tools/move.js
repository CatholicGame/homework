/**
 * 🚗 Đường chuyển động (Toán 5 Bài 59–61): con đường vẽ SVG (trời, đồi, cây), vạch quãng đường bên dưới, xe / người đi
 * chạy đều trên đường, đồng hồ góc trên đếm thời gian. Mỗi giờ (phút, giây) xe đi được một đoạn bằng nhau = vận tốc:
 * đoạn đó tô màu và có ngoặc ghi số đo. Hình tỉ lệ đúng: vị trí trên đường tỉ lệ với quãng đường.
 *
 * createMove(host, { dist, unit, vehicle, water, ov }):
 *   t.x(d) toạ độ của mốc d; t.drive(d, ms, clock) xe chạy tới mốc d (đồng hồ đổi chữ khi tới);
 *   t.seg(d0, d1, label, i) tô đoạn d0..d1 và ghi số đo ở trên; t.flag(d, text) cắm cờ mốc dưới đường;
 *   t.clock(text) chữ trên đồng hồ; t.caption(html).
 * Khung hình tính theo tỉ lệ ô chứa (ngang: đường dài, dọc: trời cao hơn, chữ to hơn) để hình kín chỗ.
 */

import { css, emitter, INK, sfx, watchUnits } from '../grade4Tools/frame.js';
import { anim } from '../grade4Tools/canvas.js';
import { sleep } from '../grade3Drills/kit.js';
import { calmMotion } from '../grade3Games/fly.js';

const SEG = ['#FDE047', '#F9A8D4', '#86EFAC', '#93C5FD', '#FDBA74', '#C4B5FD'];

/** Hình xe / người nhìn ngang, hướng sang phải; gốc (0, 0) ở giữa đáy (chạm mặt đường). s: cỡ. */
export function vehicleSvg(kind, s = 1) {
  const W = (v) => (v * s).toFixed(1);
  const wheel = (x, r = 13) => `<circle cx="${W(x)}" cy="${W(-r)}" r="${W(r)}" fill="#334155" stroke="${INK}" stroke-width="3"/><circle cx="${W(x)}" cy="${W(-r)}" r="${W(r * 0.4)}" fill="#CBD5E1"/>`;
  if (kind === 'car') {
    return `<path d="M${W(-62)} ${W(-16)}V${W(-40)}Q${W(-62)} ${W(-48)} ${W(-52)} ${W(-48)}H${W(-30)}L${W(-14)} ${W(-70)}H${W(26)}L${W(44)} ${W(-48)}H${W(56)}Q${W(64)} ${W(-48)} ${W(64)} ${W(-38)}V${W(-16)}Z" fill="#EF4444" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M${W(-24)} ${W(-50)}L${W(-11)} ${W(-64)}H${W(4)}V${W(-50)}Z M${W(10)} ${W(-50)}V${W(-64)}H${W(23)}L${W(36)} ${W(-50)}Z" fill="#BAE6FD" stroke="${INK}" stroke-width="2.5"/>
      <rect x="${W(54)}" y="${W(-42)}" width="${W(9)}" height="${W(7)}" rx="2" fill="#FDE047"/>${wheel(-36)}${wheel(38)}`;
  }
  if (kind === 'bus') {
    return `<rect x="${W(-72)}" y="${W(-78)}" width="${W(144)}" height="${W(64)}" rx="${W(10)}" fill="#F59E0B" stroke="${INK}" stroke-width="3.5"/>
      ${[-58, -30, -2, 26].map(x => `<rect x="${W(x)}" y="${W(-70)}" width="${W(22)}" height="${W(20)}" rx="3" fill="#BAE6FD" stroke="${INK}" stroke-width="2"/>`).join('')}
      <rect x="${W(52)}" y="${W(-70)}" width="${W(16)}" height="${W(34)}" rx="3" fill="#BAE6FD" stroke="${INK}" stroke-width="2"/>${wheel(-44)}${wheel(46)}`;
  }
  if (kind === 'bike' || kind === 'moto') {
    const body = kind === 'moto'
      ? `<path d="M${W(-30)} ${W(-24)}L${W(-6)} ${W(-40)}H${W(20)}L${W(32)} ${W(-24)}Z" fill="#2563EB" stroke="${INK}" stroke-width="3"/>`
      : `<path d="M${W(-30)} ${W(-16)}L${W(-6)} ${W(-40)}L${W(16)} ${W(-40)}L${W(30)} ${W(-16)}M${W(-6)} ${W(-40)}L${W(0)} ${W(-16)}L${W(16)} ${W(-40)}" fill="none" stroke="#16A34A" stroke-width="${W(4.5)}" stroke-linecap="round"/>`;
    return `${wheel(-30, 16)}${wheel(30, 16)}${body}
      <path d="M${W(-4)} ${W(-42)}L${W(4)} ${W(-74)}" stroke="#2563EB" stroke-width="${W(11)}" stroke-linecap="round"/>
      <path d="M${W(4)} ${W(-68)}L${W(18)} ${W(-50)}L${W(20)} ${W(-42)}" stroke="#FCD34D" stroke-width="${W(5)}" stroke-linecap="round" fill="none"/>
      <path d="M${W(-4)} ${W(-42)}L${W(8)} ${W(-28)}L${W(4)} ${W(-14)}" stroke="#1E3A8A" stroke-width="${W(6)}" stroke-linecap="round" fill="none"/>
      <circle cx="${W(6)}" cy="${W(-86)}" r="${W(10)}" fill="#FCD34D" stroke="${INK}" stroke-width="2.5"/>
      <path d="M${W(-5)} ${W(-90)}Q${W(6)} ${W(-104)} ${W(17)} ${W(-90)}Z" fill="${kind === 'moto' ? '#DC2626' : '#F97316'}" stroke="${INK}" stroke-width="2"/>`;
  }
  if (kind === 'boat') {
    return `<path d="M${W(-70)} ${W(-30)}H${W(70)}L${W(52)} ${W(-4)}H${W(-56)}Z" fill="#F8FAFC" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
      <rect x="${W(-34)}" y="${W(-58)}" width="${W(56)}" height="${W(28)}" rx="${W(6)}" fill="#F97316" stroke="${INK}" stroke-width="3"/>
      <rect x="${W(-26)}" y="${W(-52)}" width="${W(14)}" height="${W(12)}" rx="2" fill="#BAE6FD"/><rect x="${W(-6)}" y="${W(-52)}" width="${W(14)}" height="${W(12)}" rx="2" fill="#BAE6FD"/>
      <path d="M${W(-70)} ${W(-30)}H${W(70)}" stroke="#DC2626" stroke-width="${W(4)}"/>`;
  }
  // người đi bộ / chạy (walk, run)
  const run = kind === 'run';
  return `<path d="M0 ${W(-44)}L${W(run ? 18 : 10)} ${W(-2)}M0 ${W(-44)}L${W(run ? -20 : -10)} ${W(-4)}" stroke="#1E3A8A" stroke-width="${W(8)}" stroke-linecap="round"/>
    <path d="M0 ${W(-44)}L${W(2)} ${W(-80)}" stroke="${run ? '#DC2626' : '#0EA5E9'}" stroke-width="${W(16)}" stroke-linecap="round"/>
    <path d="M${W(2)} ${W(-74)}L${W(run ? 20 : 12)} ${W(-56)}M${W(2)} ${W(-74)}L${W(run ? -16 : -10)} ${W(-58)}" stroke="#FCD34D" stroke-width="${W(6)}" stroke-linecap="round"/>
    <circle cx="${W(4)}" cy="${W(-96)}" r="${W(12)}" fill="#FCD34D" stroke="${INK}" stroke-width="2.5"/>
    <path d="M${W(-8)} ${W(-100)}Q${W(4)} ${W(-114)} ${W(16)} ${W(-100)}" fill="#1E293B"/>`;
}

const tree = (x, y, s) => `<g><rect x="${x - 5 * s}" y="${y - 30 * s}" width="${10 * s}" height="${30 * s}" fill="#92400E" stroke="${INK}" stroke-width="2.5"/>
  <circle cx="${x}" cy="${y - 46 * s}" r="${24 * s}" fill="#22C55E" stroke="${INK}" stroke-width="3"/></g>`;
const cloud = (x, y, s) => `<g fill="#fff" stroke="#CBD5E1" stroke-width="2"><ellipse cx="${x}" cy="${y}" rx="${46 * s}" ry="${20 * s}"/><ellipse cx="${x - 22 * s}" cy="${y - 10 * s}" rx="${22 * s}" ry="${16 * s}"/><ellipse cx="${x + 16 * s}" cy="${y - 16 * s}" rx="${26 * s}" ry="${20 * s}"/></g>`;

/**
 * dist: tổng quãng đường (số, theo unit). unit: 'km' | 'm'. vehicle: 'car' | 'bus' | 'bike' | 'moto' | 'walk' | 'run' | 'boat'.
 * water: sông thay đường (ca nô). ov: chừa đáy cho nút chọn đè (Khám phá). marks: mốc ghi số dưới đường (mặc định 0 và dist).
 */
export function createMove(host, { dist = 100, unit = 'km', vehicle = 'car', water = vehicle === 'boat', ov = false, marks = null, tu = 'giờ' } = {}) {
  injectMoveStyles();
  const t = emitter({});
  host.innerHTML = `<div class="g5mv ${ov ? 'g5mv-ov' : ''}"><div class="g5mv-cap">&nbsp;</div><div class="g5mv-box"><svg class="g5mv-svg" preserveAspectRatio="xMidYMid meet"></svg></div></div>`;
  const svg = host.querySelector('svg');
  const box = host.querySelector('.g5mv-box');
  watchUnits(svg);
  const bw = box.clientWidth || 1000, bh = box.clientHeight || 480;
  const W = 1000;
  const portrait = bh > bw * 0.9;
  const H = Math.round(Math.max(380, Math.min(2000, (W * bh) / bw)));
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const k = portrait ? 1.7 : bw < 700 ? 1.3 : 1; // chữ to hơn khi khung hẹp
  const fs = Math.max(34 * k, H * 0.062);
  const roadH = Math.max(70 * k, Math.min(H * 0.2, 150 * k)); // đường cao theo khung, xe to theo đường
  const vs = (roadH / 70) * 1.05;
  const x0 = Math.max(70, 72 * vs), x1 = W - Math.max(70, 72 * vs); // xe (gốc ở giữa) không lọt ra ngoài khung ở hai đầu đường
  const roadY = H - roadH - fs * 2.9 - 10; // mép trên mặt đường (dưới: hàng số đo + hàng cờ)

  t.portrait = portrait; t.H = H; t.k = k;
  t.x = (d) => x0 + (x1 - x0) * Math.max(0, Math.min(1, d / dist));

  // Cảnh: trời, mặt trời, mây, đồi, cây, đường (hoặc sông), vạch giữa.
  const ground = water ? '#38BDF8' : '#9CA3AF';
  let g = `<defs><linearGradient id="g5mvSky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#BAE6FD"/><stop offset="1" stop-color="#E0F2FE"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#g5mvSky)"/>
    <circle cx="${W - 90}" cy="${70 * k}" r="${34 * k}" fill="#FDE047" stroke="#F59E0B" stroke-width="3"/>
    ${cloud(W * 0.42, 64 * k, k)}${cloud(W * 0.7, 110 * k, 0.8 * k)}
    <path d="M0 ${roadY - 30}Q${W * 0.18} ${roadY - 120 * k} ${W * 0.38} ${roadY - 40}T${W * 0.75} ${roadY - 50}T${W} ${roadY - 60}V${H}H0Z" fill="#86EFAC" stroke="#4ADE80" stroke-width="3"/>
    ${tree(W * 0.12, roadY - 6, 0.9 * k)}${tree(W * 0.56, roadY - 8, k)}${tree(W * 0.86, roadY - 6, 0.8 * k)}
    <rect x="0" y="${roadY}" width="${W}" height="${roadH}" fill="${ground}" stroke="${INK}" stroke-width="3"/>
    ${water ? `<path d="M0 ${roadY + roadH * 0.55}${[...Array(20)].map((_, i) => `q25 -10 50 0`).join('')}" fill="none" stroke="#E0F2FE" stroke-width="3"/>`
      : `<line x1="0" y1="${roadY + roadH / 2}" x2="${W}" y2="${roadY + roadH / 2}" stroke="#fff" stroke-width="5" stroke-dasharray="26 22"/>`}
    <rect x="0" y="${roadY + roadH}" width="${W}" height="${H - roadY - roadH}" fill="#FFFBEB"/>
    <g class="g5mv-segs"></g>
    <line x1="${x0}" y1="${roadY + roadH + 6}" x2="${x1}" y2="${roadY + roadH + 6}" stroke="${INK}" stroke-width="3"/>
    <g class="g5mv-marks"></g>
    <g class="g5mv-flags"></g>
    <g class="g5mv-car" transform="translate(${x0} ${roadY + roadH * 0.72})">${vehicleSvg(vehicle, vs)}</g>
    <g class="g5mv-labels"></g>
     <g class="g5mv-clock"><rect x="20" y="16" width="${fs * 8.2}" height="${fs * 1.7}" rx="${fs * 0.45}" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <text x="${20 + fs * 4.1}" y="${16 + fs * 1.2}" font-size="${fs}" class="g5mv-t g5mv-ct">⏱️ 0 ${tu}</text></g>`;
  svg.innerHTML = g;
  const q = (s) => svg.querySelector(s);
  t.q = q; t.svg = svg;
  const mark = (d, label = d, color = INK) => {
    const x = t.x(d);
    q('.g5mv-marks').insertAdjacentHTML('beforeend', `<g><line x1="${x}" y1="${roadY + roadH - 2}" x2="${x}" y2="${roadY + roadH + 18}" stroke="${color}" stroke-width="4"/>
      <text x="${x < W * 0.2 ? x - 12 : x > W * 0.8 ? x + 12 : x}" y="${roadY + roadH + 18 + fs}" font-size="${fs * 0.9}" class="g5mv-t" fill="${color}"
        style="text-anchor:${x < W * 0.2 ? 'start' : x > W * 0.8 ? 'end' : 'middle'}">${label}</text></g>`);
  };
  t.mark = mark;
  (marks || [[0, `0 ${unit}`], [dist, `${String(dist).replace('.', ',')} ${unit}`]]).forEach(([d, l]) => mark(d, l));
  let pos = 0;
  const car = q('.g5mv-car');
  const carY = roadY + roadH * 0.72;
  t.clock = (text) => { q('.g5mv-ct').textContent = `⏱️ ${text}`; };
  t.caption = (html) => { host.querySelector('.g5mv-cap').innerHTML = html || '&nbsp;'; };
  /** Xe chạy đều tới mốc d trong ms; clock: chữ đồng hồ khi tới nơi. */
  t.drive = async (d, ms = 1200, clock = null) => {
    const from = t.x(pos), to = t.x(d), dur = anim(ms), t0 = performance.now();
    sfx.swish?.();
    await new Promise((res) => {
      const step = (now) => {
        const e = Math.min(1, (now - t0) / dur);
        const bob = calmMotion() ? 0 : Math.sin(e * Math.PI * 8) * 2;
        car.setAttribute('transform', `translate(${from + (to - from) * e} ${carY + bob})`);
        if (e < 1) requestAnimationFrame(step); else res();
      };
      requestAnimationFrame(step);
      setTimeout(res, dur + 500);
    });
    car.setAttribute('transform', `translate(${to} ${carY})`);
    pos = d;
    if (clock != null) t.clock(clock);
  };
  t.place = (d) => { pos = d; car.setAttribute('transform', `translate(${t.x(d)} ${carY})`); };
  /** Tô đoạn d0..d1 trên mặt đường + ngoặc ghi số đo phía trên (màu thứ i). */
  t.seg = async (d0, d1, label, i = 0, { row = 0 } = {}) => {
    const a = t.x(d0), b = t.x(d1), c = SEG[i % SEG.length];
    const yb = roadY - 14 - row * fs * 1.4;
    const mid = (a + b) / 2;
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const lab = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    el.innerHTML = `<rect x="${a}" y="${roadY + 4}" width="${b - a}" height="${roadH - 8}" fill="${c}" fill-opacity="0.85" stroke="${INK}" stroke-width="2"/>`;
    // ngoặc + số đo vẽ trên lớp trên cùng (xe đi qua không che chữ)
    lab.innerHTML = `<path d="M${a + 2} ${yb + 10}Q${a + 2} ${yb} ${a + 14} ${yb}H${mid - 10}L${mid} ${yb - 10}L${mid + 10} ${yb}H${b - 14}Q${b - 2} ${yb} ${b - 2} ${yb + 10}" fill="none" stroke="${INK}" stroke-width="3"/>
      ${label ? `<text x="${mid}" y="${yb - 18}" font-size="${fs * (b - a < 120 ? 0.8 : 1)}" class="g5mv-t g5mv-halo">${label}</text>` : ''}`;
    q('.g5mv-segs').append(el);
    q('.g5mv-labels').append(lab);
    [el, lab].forEach(e => e.animate([{ opacity: 0 }, { opacity: 1 }], { duration: anim(300) }));
    sfx.pop?.(i + 2);
    await sleep(anim(320));
    return el;
  };
  t.clearSegs = () => { q('.g5mv-segs').innerHTML = ''; q('.g5mv-labels').innerHTML = ''; };
  /** Cờ mốc phía trên đường (vd. "1 giờ"). */
  t.flag = (d, text, color = '#DC2626') => {
    const x = t.x(d);
    q('.g5mv-flags').insertAdjacentHTML('beforeend', `<g><line x1="${x}" y1="${roadY + roadH}" x2="${x}" y2="${roadY - 4}" stroke="${color}" stroke-width="3" stroke-dasharray="6 5"/>
      <text x="${x}" y="${roadY + roadH + 18 + fs * 2.05}" font-size="${fs * 0.78}" class="g5mv-t" fill="${color}">${text}</text></g>`);
  };
  t.clearFlags = () => { q('.g5mv-flags').innerHTML = ''; };
  return t;
}

let styled = false;
function injectMoveStyles() {
  if (styled) return;
  styled = true;
  css('g5-move', `
    .g5mv { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; border-radius: 0.8rem; overflow: hidden; }
    .g5mv-ov { padding-bottom: 19cqh; }
    .g5mv-cap { flex: none; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(6.5cqh, 4cqi); line-height: 1.25; min-height: 1.3em; }
    .g5mv-cap b { color: #DC2626; }
    .g5mv-box { flex: 1 1 0; min-height: 0; display: flex; }
    .g5mv-svg { flex: 1; width: 100%; height: 100%; user-select: none; }
    .g5mv-t { font-family: 'Baloo 2', sans-serif; font-weight: 800; text-anchor: middle; }
    .g5mv-t:not([fill]) { fill: ${INK}; }
    .g5mv-halo { paint-order: stroke; stroke: #fff; stroke-width: 8px; stroke-linejoin: round; }
    @container (orientation: portrait) { .g5mv-cap { font-size: min(4.6cqh, 6.4cqi); min-height: 2.5em; text-wrap: balance; } }
  `);
}
