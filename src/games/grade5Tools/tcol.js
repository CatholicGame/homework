/**
 * ⏱️ Đặt tính số đo thời gian (Toán 5 Bài 56–58).
 *
 * createTimeCol(host, opts): tờ giấy đặt tính, các đơn vị thẳng cột (giờ thẳng giờ, phút thẳng phút).
 *   op '+', '−', '×': hai dòng số, gạch ngang, dòng kết quả (ô điền), dòng đổi "= … giờ … phút" (chừa chỗ từ đầu).
 *   op ':': dòng phép chia, các dòng tính từng bước (chừa chỗ), dòng kết quả.
 *   t.carry(c): đủ 60 ở cột c thì thẻ "60 phút = 1 giờ" bay sang cột bên trái, dòng đổi hiện kết quả.
 *   t.borrow(c): số bị trừ cột c bé hơn thì mượn 1 đơn vị cột trái: thẻ "1 giờ = 60 phút" bay sang, số mới ghi trên đầu.
 * createDecClock(host, opts): mặt đồng hồ chia 10 phần (mỗi phần 6 phút = 0,1 giờ), bấm từng phần để tô;
 *   nhiều mặt nối nhau khi quá 1 giờ (72 phút = 1 giờ + 2 phần = 1,2 giờ).
 * Không chữ "nhé", không gạch dài trong chữ cho trẻ.
 */

import { css, emitter, INK, sfx } from '../grade4Tools/frame.js';
import { anim } from '../grade4Tools/canvas.js';
import { sleep } from '../grade3Drills/kit.js';
import { flyOne, calmMotion } from '../grade3Games/fly.js';
import { BOX } from '../grade4Tools/practice.js';
import { dec } from './num.js';

/** Đơn vị lớn hơn liền kề và hệ số đổi. */
export const NEXT = { phút: ['giờ', 60], giây: ['phút', 60], giờ: ['ngày', 24], tháng: ['năm', 12], ngày: ['tuần', 7] };
export const RATE = { giờ: 60, phút: 60, ngày: 24, năm: 12, tuần: 7 }; // 1 đơn vị = bao nhiêu đơn vị bé hơn liền kề

/** [3, 45] + ['giờ', 'phút'] → "3 giờ 45 phút" (bỏ phần 0 ở đầu, giữ ít nhất một phần). */
export function tstr(vals, units) {
  const parts = vals.map((v, i) => [v, units[i]]).filter(([v], i) => v !== 0 || i === vals.length - 1 && vals.every(x => x === 0));
  const keep = parts.length ? parts : [[0, units[units.length - 1]]];
  return keep.map(([v, u]) => `${v} ${u}`).join(' ');
}
/** Đổi hết về đơn vị bé nhất. */
export const toSmall = (vals, units) => vals.reduce((s, v, i) => (i === 0 ? v : s * RATE[units[i - 1]] + v), 0);
/** Từ số đo đơn vị bé nhất về các đơn vị. */
export function fromSmall(n, units) {
  const out = [];
  for (let i = units.length - 1; i > 0; i--) { const r = RATE[units[i - 1]]; out.unshift(n % r); n = Math.floor(n / r); }
  out.unshift(n);
  return out;
}

const chip = (el, text, color = '#F59E0B') => {
  const r = el.getBoundingClientRect();
  const h = Math.max(18, r.height * 0.6);
  return { html: `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%"><span style="white-space:nowrap;font:800 ${h * 0.7}px 'Baloo 2',sans-serif;color:#fff;background:${color};border:2px solid #fff;border-radius:${h * 0.4}px;padding:0 ${h * 0.35}px;box-shadow:0 3px 8px rgba(0,0,0,.25)">${text}</span></div>`, r };
};
/** Thẻ chữ bay từ phần tử a tới phần tử b. */
export async function flyChip(a, b, text, color) {
  const { html, r } = chip(a, text, color);
  const ms = flyOne(html, r, b.getBoundingClientRect(), { minMs: 700, maxMs: 1100 });
  sfx.swish?.();
  await sleep(ms + 60);
}
const pop = (el) => el.animate([{ transform: 'scale(1.35)', color: '#DC2626' }, { transform: 'none' }], { duration: anim(calmMotion() ? 300 : 520), easing: 'ease-out' });

/**
 * host: phần tử chứa. units: ['giờ', 'phút'] (2 hoặc 3 đơn vị). a, b: mảng số theo đơn vị (b bỏ trống với ×, :).
 * op: '+', '−', '×', ':'. k: số nhân / số chia. steps: số dòng tính chừa sẵn (op ':').
 * x: có dòng đổi "= … giờ … phút" (chừa chỗ). ov: chừa đáy cho nút chọn đè (Khám phá). clock: mặt đồng hồ chia 10 bên cạnh.
 */
export function createTimeCol(host, { units = ['giờ', 'phút'], a = [0, 0], b = null, op = '+', k = 2, steps = 4, x = true, ov = false } = {}) {
  injectTcStyles();
  const t = emitter({});
  const U = units.length;
  const num = (r, c, v) => `<span class="g5tc-n" data-r="${r}" data-c="${c}">${v ?? ''}</span><span class="g5tc-u">${units[c]}</span>`;
  const boxes = (r) => units.map((u, c) => `<span class="g5tc-cell" data-r="${r}" data-c="${c}">${BOX}</span><span class="g5tc-u">${u}</span>`).join('');
  let grid;
  if (op === ':') {
    grid = `<div class="g5tc-div">
      <div class="g5tc-line g5tc-expr">${units.map((u, c) => `<span class="g5tc-n" data-r="a" data-c="${c}">${a[c]}</span> <span class="g5tc-u">${u}</span>`).join(' ')} <span class="g5tc-op">:</span> <span class="g5tc-n g5tc-k">${k}</span></div>
      ${[...Array(steps)].map((_, i) => `<div class="g5tc-line g5tc-step" data-i="${i}">&nbsp;</div>`).join('')}
      <div class="g5tc-line g5tc-res"><span class="g5tc-eq">=</span> ${units.map((u, c) => `<span class="g5tc-cell" data-r="r" data-c="${c}">${BOX}</span> <span class="g5tc-u">${u}</span>`).join(' ')}</div>
    </div>`;
  } else {
    const blank = '<span></span>';
    grid = `<div class="g5tc-grid" style="--cols:${U}">
      ${blank}${units.map((_, c) => `<span class="g5tc-note" data-c="${c}">&nbsp;</span>${blank}`).join('')}
      ${blank}${units.map((_, c) => num('a', c, a[c])).join('')}
      <span class="g5tc-op">${op}</span>${op === '×' ? units.map((_, c) => `<span class="g5tc-n g5tc-k" data-r="b" data-c="${c}">${c === U - 1 ? k : ''}</span><span class="g5tc-u"></span>`).join('') : units.map((_, c) => num('b', c, b?.[c])).join('')}
      <span class="g5tc-rule"></span>
      ${blank}${boxes('r')}
      ${x ? `<span class="g5tc-eq g5tc-x">=</span>${units.map((u, c) => `<span class="g5tc-cell g5tc-x" data-r="x" data-c="${c}">${BOX}</span><span class="g5tc-u g5tc-x">${u}</span>`).join('')}` : ''}
    </div>`;
  }
  host.innerHTML = `<div class="g5tc ${ov ? 'g5tc-ov' : ''} ${x && op !== ':' ? 'g5tc-hasx' : ''} g5tc-u${U}"><div class="g5tc-sheet">${grid}</div></div>`;
  const root = host.querySelector('.g5tc');
  t.root = root;
  t.q = (s) => root.querySelector(s);
  const cell = (r, c) => root.querySelector(`[data-r="${r}"][data-c="${c}"]`);
  t.n = (r, c) => cell(r, c);
  /** Ô điền của dòng kết quả (r) hoặc dòng đổi (x). */
  t.box = (c, r = 'r') => cell(r, c).querySelector('.g4-box');
  /** Ghi số vào ô (không chờ em gõ). */
  t.put = (c, v, r = 'r') => { if (r === 'x') t.showX(); const bx = t.box(c, r); bx.textContent = v; bx.classList.add('g4-box-ok'); pop(bx); };
  /** Điền cả dòng kết quả từ phải sang trái (mỗi cột một tiếng). */
  t.fill = async (vals, r = 'r') => { for (let c = U - 1; c >= 0; c--) { t.put(c, vals[c], r); sfx.pop?.(c + 2); await sleep(anim(380)); } };
  t.showX = () => root.querySelectorAll('.g5tc-x').forEach(e => e.classList.add('g5tc-on'));
  t.value = (c, r = 'r') => +(t.box(c, r).textContent || 0);
  t.mark = (c, on = true) => root.querySelectorAll(`[data-c="${c}"]`).forEach(e => e.classList.toggle('g5tc-hl', on));
  t.clearMarks = () => root.querySelectorAll('.g5tc-hl').forEach(e => e.classList.remove('g5tc-hl'));

  /** Đủ 60 (24, 12…) ở cột c: thẻ bay sang cột c − 1, dòng đổi hiện số mới. vals: kết quả chưa đổi. Trả về kết quả đã đổi. */
  t.carry = async (c, vals) => {
    const r = RATE[units[c - 1]];
    const out = [...vals];
    const q = Math.floor(out[c] / r);
    t.showX();
    t.mark(c);
    await flyChip(cell('r', c), cell('x', c - 1), `${q * r} ${units[c]} = ${q} ${units[c - 1]}`);
    out[c] -= q * r; out[c - 1] += q;
    t.clearMarks();
    return out;
  };
  /** Mượn 1 đơn vị cột c − 1 sang cột c (dòng số bị trừ). Ghi số mới trên đầu, gạch số cũ. */
  t.borrow = async (c) => {
    const r = RATE[units[c - 1]];
    const hi = cell('a', c - 1), lo = cell('a', c);
    const nHi = root.querySelector(`.g5tc-note[data-c="${c - 1}"]`), nLo = root.querySelector(`.g5tc-note[data-c="${c}"]`);
    await flyChip(hi, lo, `1 ${units[c - 1]} = ${r} ${units[c]}`);
    hi.classList.add('g5tc-x-out'); lo.classList.add('g5tc-x-out');
    nHi.textContent = +hi.textContent - 1; nLo.textContent = +lo.textContent + r;
    nHi.classList.add('g5tc-on'); nLo.classList.add('g5tc-on');
    pop(nHi); pop(nLo);
    sfx.ding?.();
    await sleep(anim(400));
  };
  /** Dòng tính thứ i (phép chia). */
  t.step = async (i, html) => {
    const e = root.querySelector(`.g5tc-step[data-i="${i}"]`);
    e.innerHTML = html;
    e.classList.add('g5tc-on');
    e.animate([{ opacity: 0, transform: 'translateY(-30%)' }, { opacity: 1, transform: 'none' }], { duration: anim(380), easing: 'ease-out' });
    sfx.tick?.();
    await sleep(anim(450));
  };
  t.stepEl = (i) => root.querySelector(`.g5tc-step[data-i="${i}"]`);
  return t;
}

// ── Mặt đồng hồ chia 10 phần ────────────────────────────────────────────────────────────────────────
const PAL = ['#60A5FA', '#34D399'];
/**
 * host: phần tử chứa. clocks: số mặt (1–3). big / small: tên đơn vị lớn ('giờ') và bé ('phút'), mỗi mặt = 1 đơn vị lớn = 60 đơn vị bé.
 * tap: bấm từng phần để tô (sự kiện 'tenths'). Mặt trước đầy mới tô mặt sau. t.set(n) tô n phần mười (có chuyển động).
 */
export function createDecClock(host, { clocks = 1, big = 'giờ', small = 'phút', tap = false, ov = false } = {}) {
  injectTcStyles();
  const t = emitter({});
  const R = 100, cx = 120, cy = 120;
  const sector = (i) => {
    const a0 = (i * 36 - 90) * Math.PI / 180, a1 = ((i + 1) * 36 - 90) * Math.PI / 180;
    return `M${cx} ${cy}L${cx + R * Math.cos(a0)} ${cy + R * Math.sin(a0)}A${R} ${R} 0 0 1 ${cx + R * Math.cos(a1)} ${cy + R * Math.sin(a1)}Z`;
  };
  const face = (k) => {
    let g = `<circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="#FDE68A" stroke="${INK}" stroke-width="5"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff"/>`;
    for (let i = 0; i < 10; i++) g += `<path class="g5dc-s" data-k="${k}" data-i="${i}" d="${sector(i)}" fill="${PAL[k % 2]}" fill-opacity="0" stroke="#CBD5E1" stroke-width="1.5"/>`;
    for (let i = 0; i < 60; i++) {
      const a = (i * 6 - 90) * Math.PI / 180, r2 = R - (i % 6 === 0 ? 16 : 7);
      g += `<line x1="${cx + R * Math.cos(a)}" y1="${cy + R * Math.sin(a)}" x2="${cx + r2 * Math.cos(a)}" y2="${cy + r2 * Math.sin(a)}" stroke="${INK}" stroke-width="${i % 6 === 0 ? 3.5 : 1.5}" pointer-events="none"/>`;
    }
    for (let i = 1; i <= 10; i++) {
      const a = ((i - 0.5) * 36 - 90) * Math.PI / 180;
      g += `<text x="${cx + (R - 30) * Math.cos(a)}" y="${cy + (R - 30) * Math.sin(a) + 7}" class="g5dc-n" font-size="19" pointer-events="none">${i * 6}</text>`;
    }
    g += `<circle cx="${cx}" cy="${cy}" r="6" fill="${INK}"/>`;
    return `<div class="g5dc-f" data-k="${k}"><svg viewBox="0 0 240 240">${g}</svg><div class="g5dc-l">&nbsp;</div></div>`;
  };
  host.innerHTML = `<div class="g5dc ${ov ? 'g5tc-ov' : ''}" style="--n:${clocks}"><div class="g5dc-row">${[...Array(clocks)].map((_, k) => face(k)).join('')}</div><div class="g5dc-sum">&nbsp;</div></div>`;
  const root = host.querySelector('.g5dc');
  t.root = root;
  let n = 0;
  const paint = (animK = -1) => {
    root.querySelectorAll('.g5dc-s').forEach(p => {
      const idx = +p.dataset.k * 10 + +p.dataset.i;
      p.setAttribute('fill-opacity', idx < n ? 0.85 : 0);
      if (idx === animK) p.animate([{ transform: 'scale(0.6)', transformOrigin: `${cx}px ${cy}px` }, { transform: 'scale(1)', transformOrigin: `${cx}px ${cy}px` }], { duration: anim(260), easing: 'ease-out' });
    });
    root.querySelectorAll('.g5dc-f').forEach(f => {
      const k = +f.dataset.k, m = Math.max(0, Math.min(10, n - k * 10));
      f.querySelector('.g5dc-l').innerHTML = !m ? '&nbsp;' : m === 10 ? `1 ${big}` : `${dec(m / 10)} ${big}`;
    });
  };
  t.count = () => n;
  /** Tô n phần mười (từng phần một). */
  t.set = async (to, ms = 150) => {
    while (n !== to) { n += Math.sign(to - n); paint(n - 1); sfx.tick?.(); await sleep(anim(ms)); }
    paint();
  };
  t.sum = (html) => { const s = root.querySelector('.g5dc-sum'); s.innerHTML = html || '&nbsp;'; if (html) s.animate([{ opacity: 0 }, { opacity: 1 }], { duration: anim(350) }); };
  t.face = (k) => root.querySelector(`.g5dc-f[data-k="${k}"]`);
  if (tap) {
    root.classList.add('g5dc-tap');
    root.addEventListener('click', (e) => {
      const p = e.target.closest('.g5dc-s');
      if (!p) return;
      const idx = +p.dataset.k * 10 + +p.dataset.i;
      // bấm phần đã tô cuối cùng thì bỏ tô; bấm phần sau thì tô tới đó
      n = idx < n && idx === n - 1 ? n - 1 : Math.max(n, idx + 1);
      paint(idx); sfx.pop?.(n % 10);
      t.emit('tenths', n);
    });
  }
  paint();
  return t;
}

let styled = false;
function injectTcStyles() {
  if (styled) return;
  styled = true;
  css('g5-tcol', `
    .g5tc, .g5dc { flex: 1 1 0; min-height: 0; display: flex; align-items: center; justify-content: center; container-type: size; box-sizing: border-box; }
    .g5tc-ov, .g5dc.g5tc-ov { padding-bottom: 20cqh; }
    .g5tc-sheet { background: #FFFDF5; border: 1.5px solid #E7D9B5; border-radius: 0.6em; padding: 0.3em 0.8em; box-shadow: 0 4px 0 #EADFC2;
      font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(14cqh, 7.6cqi); line-height: 1.15; }
    .g5tc-hasx .g5tc-sheet { font-size: min(12cqh, 7.6cqi); }
    .g5tc-div .g5tc-sheet, .g5tc-sheet:has(.g5tc-div) { font-size: min(10cqh, 7cqi); }
    .g5tc-ov .g5tc-sheet { font-size: min(10cqh, 6.8cqi); }
    .g5tc-u3 .g5tc-sheet { font-size: min(11cqh, 5.4cqi); }
    .g5tc-grid { display: grid; grid-template-columns: 1.1em repeat(var(--cols), auto auto); column-gap: 0.25em; align-items: center; justify-items: end; }
    .g5tc-n { min-width: 1.4em; text-align: right; font-variant-numeric: tabular-nums; position: relative; }
    .g5tc-u { justify-self: start; color: #475569; font-size: 0.78em; padding-right: 0.35em; }
    .g5tc-op { justify-self: center; color: #2563EB; }
    .g5tc-rule { grid-column: 1 / -1; justify-self: stretch; height: 0.09em; background: ${INK}; border-radius: 1em; margin: 0.08em 0; }
    .g5tc-note { font-size: 0.62em; color: #DC2626; min-height: 1.1em; visibility: hidden; justify-self: end; }
    .g5tc-note.g5tc-on { visibility: visible; }
    .g5tc-x-out { text-decoration: line-through; text-decoration-color: #DC2626; text-decoration-thickness: 0.09em; color: #94A3B8; }
    .g5tc-cell .g4-box { min-width: 1.9em; height: 1.08em; font-size: 1em; }
    .g5tc-x { visibility: hidden; }
    .g5tc-x.g5tc-on { visibility: visible; }
    .g5tc-eq { justify-self: center; color: #16A34A; }
    .g5tc-hl.g5tc-n, .g5tc-hl .g4-box { box-shadow: 0 0 0 0.08em #FACC15; border-radius: 0.2em; background: #FEF9C3; }
    .g5tc-div { display: flex; flex-direction: column; align-items: flex-start; }
    .g5tc-line { white-space: nowrap; }
    .g5tc-div .g5tc-u { padding: 0; font-size: 0.78em; }
    .g5tc-step { font-size: 0.72em; color: #334155; visibility: hidden; min-height: 1.2em; }
    .g5tc-step.g5tc-on { visibility: visible; }
    .g5tc-step b { color: #DC2626; }
    .g5tc-k { color: #2563EB; }
    .g5tc-res { margin-top: 0.1em; }
    .g5dc { flex-direction: column; gap: 1cqh; }
    .g5dc-row { flex: none; width: 100%; display: flex; justify-content: center; align-items: flex-start; gap: 2cqi; }
    .g5dc-f { flex: none; width: min(calc((96cqi - 2cqi * (var(--n) - 1)) / var(--n)), 76cqh); display: flex; flex-direction: column; align-items: center; }
    .g5dc-f svg { display: block; width: 100%; height: auto; aspect-ratio: 1; }
    .g5dc-l, .g5dc-sum { flex: none; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1D4ED8; font-size: min(7cqh, 5cqi); line-height: 1.2; }
    .g5dc-sum { color: #15803D; font-size: min(8cqh, 5.4cqi); }
    .g5dc-n { font-family: 'Baloo 2', sans-serif; font-weight: 800; text-anchor: middle; fill: #475569; }
    .g5dc-tap .g5dc-s { cursor: pointer; }
    @container (orientation: portrait) {
      .g5tc-sheet { font-size: min(9cqh, 9cqi); }
      .g5tc-sheet:has(.g5tc-div) { font-size: min(7cqh, 7.4cqi); }
      .g5tc-u3 .g5tc-sheet { font-size: min(7cqh, 7.4cqi); }
      .g5tc-ov .g5tc-sheet { font-size: min(7cqh, 8.4cqi); }
      .g5dc-row { flex-wrap: wrap; align-content: center; }
      .g5dc-f { width: min(calc((96cqi - 2cqi * (var(--n) - 1)) / var(--n)), 70cqh); }
      .g5dc[style*="--n:3"] .g5dc-f { width: min(46cqi, 36cqh); }
      .g5dc[style*="--n:2"] .g5dc-row { flex-direction: column; align-items: center; }
      .g5dc[style*="--n:2"] .g5dc-f { width: min(84cqi, 36cqh); }
      .g5dc-l, .g5dc-sum { font-size: min(5cqh, 7cqi); }
    }
  `);
}
