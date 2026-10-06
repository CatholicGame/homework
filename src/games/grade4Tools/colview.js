/**
 * ✍️ Đặt tính (Khám phá): phép tính dọc thẳng cột, trên đầu mỗi cột có tên hàng (cùng màu lớp như bảng hàng).
 * Từng bước theo columnSteps của Luyện Tính lớp 3: cột đang tính sáng lên, chữ số viết hiện ra, số nhớ bay sang cột trái.
 */

import { css, emitter, INK, sfx } from './frame.js';
import { flyOne } from '../grade3Games/fly.js';
import { columnSteps } from '../grade3Drills/column.js';
import { PLACE, classOf, CLASS_INK, CLASS_BG } from './num.js';

const SIGN = { '+': '+', '-': '−', '*': '×' };

export function createColumn(host, op, a, b) {
  injectColStyles();
  const t = emitter({});
  const R = op === '+' ? a + b : op === '-' ? a - b : a * b;
  const L = Math.max(String(a).length, String(b).length, String(R).length);
  const steps = columnSteps(op, a, b);
  const dig = (n, i) => { const s = String(n); return i < s.length ? s[s.length - 1 - i] : ''; };
  const cols = Array.from({ length: L }, (_, k) => L - 1 - k); // trái → phải
  host.innerHTML = `
    <div class="g4k" style="--n:${L + 1}">
      <div class="g4k-grid">
        <div></div>${cols.map(i => `<div class="g4k-h" style="--ink:${CLASS_INK[classOf(i)]};--bg:${CLASS_BG[classOf(i)]}">${PLACE[i]}</div>`).join('')}
        <div></div>${cols.map(i => `<div class="g4k-c g4k-carry" data-r="c" data-i="${i}"></div>`).join('')}
        <div></div>${cols.map(i => `<div class="g4k-c" data-r="a" data-i="${i}">${dig(a, i)}</div>`).join('')}
        <div class="g4k-sign">${SIGN[op]}</div>${cols.map(i => `<div class="g4k-c g4k-b" data-r="b" data-i="${i}">${op === '*' ? (i === 0 ? b : '') : dig(b, i)}</div>`).join('')}
        <div></div>${cols.map(i => `<div class="g4k-c g4k-res" data-r="r" data-i="${i}"></div>`).join('')}
      </div>
    </div>`;
  const root = host.querySelector('.g4k');
  const at = (r, i) => root.querySelector(`[data-r="${r}"][data-i="${i}"]`);
  t.root = root; t.steps = steps; t.result = R; t.at = at;
  t.glow = (i) => root.querySelectorAll('.g4k-c, .g4k-h').forEach(e => e.classList.toggle('g4k-on', i != null && +e.dataset.i === i));
  root.querySelectorAll('.g4k-h').forEach((e, k) => { e.dataset.i = cols[k]; });
  /** Viết kết quả bước (một hoặc hai chữ số, chữ số cuối ở cột i). */
  t.write = (s) => {
    const w = s.write;
    for (let k = 0; k < w.length; k++) { const e = at('r', s.i + w.length - 1 - k); if (e) { e.textContent = w[k]; e.classList.add('g4k-new'); } }
    sfx.pop(s.i);
  };
  /** Số nhớ: bay từ chữ số vừa viết lên đầu cột bên trái (trừ: viết nhỏ cạnh chữ số số trừ). */
  t.carry = (s) => new Promise((res) => {
    const from = at('r', s.i - 1);
    const to = op === '-' ? at('b', s.i) : at('c', s.i);
    const mark = op === '-' ? `<span class="g4k-borrow">+${s.write}</span>` : s.write;
    const fs = parseFloat(getComputedStyle(from).fontSize) * 0.6;
    flyOne(`<div class="g4k-fly" style="font-size:${fs}px">${op === '-' ? '+1' : s.write}</div>`, from.getBoundingClientRect(), to.getBoundingClientRect(), {
      minMs: 420, maxMs: 640, onLand: () => { if (op === '-') to.insertAdjacentHTML('beforeend', mark); else to.textContent = s.write; sfx.tap(); res(); },
    });
  });
  return t;
}

let styled = false;
function injectColStyles() {
  if (styled) return;
  styled = true;
  css('g4-col', `
    .g4k { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; font-family: 'Baloo 2', sans-serif; }
    .g4k-grid { display: grid; grid-template-columns: repeat(var(--n), min(15cqh, calc(84cqi / var(--n)))); grid-auto-rows: auto; gap: 0.6cqh 0.4cqi; }
    .g4k-h { font-weight: 800; color: var(--ink); background: var(--bg); border-radius: 0.5em; text-align: center; font-size: min(3.8cqh, calc(24cqi / var(--n))); line-height: 1.05; padding: 0.25em 0.1em; display: grid; place-items: center; min-height: 2.4em; }
    .g4k-c { font-weight: 800; color: #1E293B; text-align: center; font-size: min(14cqh, calc(76cqi / var(--n))); line-height: 1.15; border-radius: 0.2em; position: relative; transition: background .2s; min-height: 1.15em; }
    .g4k-carry { color: #DC2626; font-size: min(7cqh, calc(42cqi / var(--n))); min-height: 1.1em; }
    .g4k-b { border-bottom: 3px solid ${INK}; }
    .g4k-sign { font-weight: 800; font-size: min(13cqh, calc(66cqi / var(--n))); color: #1E293B; display: grid; place-items: center; }
    .g4k-res { color: #1D4ED8; }
    .g4k-on { background: #FEF08A; }
    .g4k-new { animation: g4kNew .4s ease; }
    @keyframes g4kNew { from { transform: scale(1.6); color: #16A34A; } }
    .g4k-borrow { position: absolute; right: -0.15em; top: -0.15em; font-size: 0.42em; color: #DC2626; }
    .g4k-fly { width: 100%; height: 100%; display: grid; place-items: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #DC2626; }
    @media (prefers-reduced-motion: reduce) { .g4k-new { animation: none; } }
  `);
}
