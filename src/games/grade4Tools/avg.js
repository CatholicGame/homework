/**
 * 🧃 San đều (Bài 46 Tìm số trung bình cộng): các cốc nước cam cao thấp khác nhau, mức nước vẽ đúng tỉ lệ số đo.
 * Em chạm cốc nhiều hơn rồi chạm cốc ít hơn: nước rót sang cho tới khi hai cốc bằng nhau. San tới khi mọi cốc
 * bằng nhau thì mức chung đó là số trung bình cộng (= tổng : số cốc).
 *
 * createAvg(host, { values, names, unit, step, cap, interactive, onBad }) → t
 *   t.values (mảng hiện tại), t.equal(), t.pour(i, j), t.level() (tự san đều có chuyển động), t.showAvg(v | null),
 *   t.lock(on), t.cup(i) (phần tử để nhắc), t.on(fn) — mỗi lần rót xong.
 */

import { css, emitter, INK, sfx } from './frame.js';
import { sleep } from '../grade3Drills/kit.js';
import { calmMotion } from '../grade3Games/fly.js';
import { fmt } from './num.js';

const JUICE = ['#FB923C', '#FACC15', '#F472B6', '#4ADE80', '#60A5FA', '#C084FC'];
const NS = 'http://www.w3.org/2000/svg';

export function createAvg(host, { values, names = [], step = 1, cap = null, interactive = true, onBad = null, colors = null, hidden = [] }) {
  injectAvgStyles();
  const t = emitter({});
  const n = values.length;
  t.values = [...values];
  const total = values.reduce((s, v) => s + v, 0);
  const CAP = cap || Math.max(...values) * 1.12;
  host.innerHTML = '<div class="g4sd"><div class="g4sd-cap">&nbsp;</div><svg class="g4sd-svg" preserveAspectRatio="xMidYMid meet"></svg></div>';
  const hide = new Set(hidden);
  const svg = host.querySelector('svg');
  let G = null, sel = -1, locked = !interactive, busy = false, avgShown = null;

  /** Bố cục theo đúng tỉ lệ chỗ trống (ngang: cốc thấp rộng; dọc: cốc cao). */
  function layout() {
    const r = svg.getBoundingClientRect();
    const W = 1000;
    const H = r.width > 10 && r.height > 10 ? Math.round(Math.min(1700, Math.max(420, (W * r.height) / r.width))) : 560;
    const slot = W / n;
    const cw = Math.min(250, slot * 0.6, H * 0.45);
    const fs = Math.round(Math.min(66, cw * 0.36, H * 0.08));
    const longest = Math.max(1, ...names.map(s => String(s).length));
    const nf = Math.round(Math.min(fs, (slot * 0.96) / (longest * 0.55)));
    const top = fs * 1.9, bottom = H - nf * 1.7 - 10;
    return { W, H, slot, cw, fs, nf, top, bottom, ch: bottom - top };
  }
  const cx = (i) => G.slot * (i + 0.5);
  const yOf = (v) => G.bottom - (v / CAP) * G.ch;

  function draw() {
    G = layout();
    svg.setAttribute('viewBox', `0 0 ${G.W} ${G.H}`);
    const tickStep = CAP <= 30 * step ? step : CAP <= 120 ? 5 : CAP <= 300 ? 10 : 50;
    let g = '';
    for (let i = 0; i < n; i++) {
      const x = cx(i) - G.cw / 2, col = colors?.[i] || JUICE[0];
      let ticks = '';
      for (let v = tickStep; v < CAP; v += tickStep) {
        const big = v % (tickStep * 5) === 0;
        ticks += `<line x1="${x + 3}" x2="${x + (big ? 22 : 12)}" y1="${yOf(v)}" y2="${yOf(v)}" stroke="#94A3B8" stroke-width="${big ? 2.5 : 1.5}"/>`;
      }
      g += `<g class="g4sd-cup" data-i="${i}">
        <rect class="g4sd-hit" x="${x - 14}" y="${G.top - G.fs * 1.8}" width="${G.cw + 28}" height="${G.bottom - G.top + G.fs * 1.8 + 8}" fill="transparent"/>
        <rect x="${x}" y="${G.top}" width="${G.cw}" height="${G.ch}" rx="${G.cw * 0.08}" fill="#F8FAFC"/>
        <rect class="g4sd-juice" x="${x + 4}" y="${G.top}" width="${G.cw - 8}" height="${G.ch - 4}" rx="${G.cw * 0.06}" fill="${col}"/>
        <rect class="g4sd-shine" x="${x + G.cw * 0.12}" y="${G.top + 10}" width="${G.cw * 0.09}" height="${G.ch - 30}" rx="${G.cw * 0.045}" fill="#fff" opacity="0.45"/>
        ${ticks}
        <rect class="g4sd-glass" x="${x}" y="${G.top}" width="${G.cw}" height="${G.ch}" rx="${G.cw * 0.08}" fill="none" stroke="${INK}" stroke-opacity="0.7" stroke-width="4"/>
        <g class="g4sd-tag"><rect x="${cx(i) - G.cw * 0.55}" y="${G.top - G.fs * 1.65}" width="${G.cw * 1.1}" height="${G.fs * 1.4}" rx="${G.fs * 0.35}" fill="#fff" stroke="#CBD5E1" stroke-width="2"/>
          <text class="g4sd-v" x="${cx(i)}" y="${G.top - G.fs * 0.5}" font-size="${G.fs}">${fmt(t.values[i])}</text></g>
        ${names[i] ? `<text class="g4sd-name" x="${cx(i)}" y="${G.H - G.nf * 0.55 - 6}" font-size="${G.nf}">${names[i]}</text>` : ''}
      </g>`;
    }
    g += `<g class="g4sd-avg" visibility="hidden"><line x1="${cx(0) - G.cw / 2 - 20}" x2="${cx(n - 1) + G.cw / 2 + 20}" y1="0" y2="0" stroke="#DC2626" stroke-width="5" stroke-dasharray="16 10"/></g>`;
    g += '<path class="g4sd-stream" d="" fill="none" stroke-linecap="round" visibility="hidden"/>';
    svg.innerHTML = g;
    svg.querySelectorAll('.g4sd-cup').forEach((el) => { el.onclick = () => tap(+el.dataset.i); });
    update(false);
    if (avgShown != null) t.showAvg(avgShown);
  }

  /** Mức nước theo t.values (scaleY từ đáy: chỉ transform, có chuyển động). */
  function update(anim = true) {
    svg.querySelectorAll('.g4sd-cup').forEach((el, i) => {
      const j = el.querySelector('.g4sd-juice');
      j.style.transition = anim ? `transform ${calmMotion() ? 900 : 700}ms ease-in-out` : 'none';
      j.style.transform = `scaleY(${hide.has(i) ? 0 : Math.max(0, t.values[i] / CAP)})`;
      el.querySelector('.g4sd-v').textContent = hide.has(i) ? '?' : fmt(t.values[i]);
      el.classList.toggle('g4sd-sel', i === sel);
    });
  }

  async function tap(i) {
    if (locked || busy) return;
    sfx.tap();
    if (sel < 0) { sel = i; update(false); return; }
    if (sel === i) { sel = -1; update(false); return; }
    const a = sel;
    sel = -1;
    update(false);
    const d = Math.floor((t.values[a] - t.values[i]) / 2 / step) * step;
    if (d <= 0) {
      sfx.boing();
      onBad?.(t.values[a] === t.values[i] ? 'same' : t.values[a] < t.values[i] ? 'low' : 'small', a, i);
      return;
    }
    await t.pour(a, i, d);
  }

  /** Rót d từ cốc a sang cốc b (dòng nước cong bay qua, mức nước đổi dần). */
  t.pour = async (a, b, d = Math.floor((t.values[a] - t.values[b]) / 2 / step) * step) => {
    busy = true;
    const s = svg.querySelector('.g4sd-stream');
    const x1 = cx(a) + (b > a ? G.cw * 0.3 : -G.cw * 0.3), x2 = cx(b) + (b > a ? -G.cw * 0.2 : G.cw * 0.2);
    const y1 = G.top - 4, y2 = G.top + 20, peak = G.top - G.fs * 2.6;
    s.setAttribute('d', `M${x1} ${y1} Q${(x1 + x2) / 2} ${peak} ${x2} ${y2}`);
    s.setAttribute('stroke', svg.querySelectorAll('.g4sd-juice')[a].getAttribute('fill'));
    s.setAttribute('stroke-width', Math.max(10, G.cw * 0.08));
    s.setAttribute('visibility', 'visible');
    const len = s.getTotalLength?.() || 600;
    s.style.strokeDasharray = `${len}`;
    const dur = calmMotion() ? 700 : 450;
    await s.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: dur, easing: 'ease-in', fill: 'both' }).finished.catch(() => {});
    sfx.pop(4);
    t.values[a] -= d;
    t.values[b] += d;
    update(true);
    await sleep(calmMotion() ? 900 : 700);
    await s.animate([{ strokeDashoffset: 0 }, { strokeDashoffset: -len }], { duration: dur * 0.8, easing: 'ease-out', fill: 'both' }).finished.catch(() => {});
    s.setAttribute('visibility', 'hidden');
    busy = false;
    t.emit('pour', a, b);
  };

  t.equal = () => t.values.every(v => v === t.values[0]);
  t.total = total;
  t.avg = total / n;

  /** Tự san đều: rót từ cốc nhiều nhất sang cốc ít nhất tới khi bằng nhau. */
  t.level = async () => {
    for (let k = 0; k < 12 && !t.equal(); k++) {
      const hi = t.values.indexOf(Math.max(...t.values)), lo = t.values.indexOf(Math.min(...t.values));
      const need = Math.min(t.values[hi] - t.avg, t.avg - t.values[lo]);
      if (need <= 0) break;
      await t.pour(hi, lo, need);
    }
  };

  /** Vạch đỏ ở mức trung bình (null: ẩn). */
  t.showAvg = (v) => {
    avgShown = v;
    const g = svg.querySelector('.g4sd-avg');
    if (v == null) { g.setAttribute('visibility', 'hidden'); return; }
    const y = yOf(v);
    g.querySelector('line').setAttribute('y1', y);
    g.querySelector('line').setAttribute('y2', y);
    g.setAttribute('visibility', 'visible');
  };
  t.caption = (html) => { host.querySelector('.g4sd-cap').innerHTML = html || '&nbsp;'; };
  /** Hiện cốc đang giấu (?): nước dâng lên tới số đo. */
  t.reveal = (i) => { hide.delete(i); sfx.pop(5); update(true); };
  t.lock = (on) => { locked = on; sel = -1; update(false); svg.classList.toggle('g4sd-locked', on); };
  t.cup = (i) => svg.querySelectorAll('.g4sd-cup')[i];
  /** Đặt lại số đo (không chuyển động), vd. Xem lại. */
  t.reset = (vals) => { t.values = [...vals]; update(false); };

  draw();
  if (locked) svg.classList.add('g4sd-locked');
  // xoay màn: vẽ lại theo khung mới, giữ nguyên mức nước
  let lastW = 0, lastH = 0;
  const ro = new ResizeObserver(() => {
    if (!svg.isConnected) { ro.disconnect(); return; }
    const r = svg.getBoundingClientRect();
    if (Math.abs(r.width - lastW) < 2 && Math.abs(r.height - lastH) < 2) return;
    lastW = r.width; lastH = r.height;
    if (!busy) draw();
  });
  ro.observe(svg);
  t.svg = svg;
  return t;
}

let styled = false;
function injectAvgStyles() {
  if (styled) return;
  styled = true;
  css('g4-avg', `
    .g4sd { flex: 1; min-height: 0; display: flex; flex-direction: column; border-radius: 0.8rem; overflow: hidden;
      background: linear-gradient(180deg, #E0F2FE 0%, #F0F9FF 62%, #FDE68A 62%, #FCD34D 100%); }
    .g4sd-cap { flex: none; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(6.5cqh, 4cqi); line-height: 1.25; min-height: 1.3em; padding-top: 0.6cqh; }
    .g4sd-cap b { color: #DC2626; }
    @media (orientation: portrait) { .g4sd-cap { font-size: min(4.6cqh, 6.4cqi); } }
    .g4sd-svg { flex: 1; min-height: 0; width: 100%; height: 100%; font-family: 'Baloo 2', sans-serif; user-select: none; }
    .g4sd-cup { cursor: pointer; }
    .g4sd-locked .g4sd-cup { cursor: default; }
    .g4sd-juice { transform-box: fill-box; transform-origin: 50% 100%; }
    .g4sd-v { font-weight: 800; fill: #1E293B; text-anchor: middle; }
    .g4sd-name { font-weight: 800; fill: ${INK}; text-anchor: middle; }
    .g4sd-sel .g4sd-glass { stroke: #F59E0B; stroke-opacity: 1; stroke-width: 9; }
    .g4sd-sel .g4sd-tag rect { fill: #FEF3C7; stroke: #F59E0B; }
    @media (hover: hover) { .g4sd-svg:not(.g4sd-locked) .g4sd-cup:hover .g4sd-glass { stroke: #60A5FA; stroke-opacity: 1; } }
  `);
}
