/**
 * ✍️ ➗ Tờ đặt tính cho Khám phá Toán 4 Tập Hai (Bài 39, 43, 44): thầy làm mẫu, em làm tiếp trên cùng tờ.
 *   createLongMul(host, a, b): nhân với số có hai chữ số như vở: tích riêng thứ nhất, tích riêng thứ hai viết lùi
 *     sang trái một cột (ô bỏ trống gạch chéo), dấu +, vạch kẻ, cộng các tích riêng. Bước theo mulSteps (Luyện Tính).
 *   createLongDiv(host, D, d, { short }): chia đặt tính. short = cách viết gọn của Bài 39 (nhẩm tích rồi trừ, chỉ viết
 *     số dư rồi hạ); không short = cách viết đầy đủ của Bài 44 (viết tích có dấu trừ, vạch kẻ, hiệu). Bước theo divSteps.
 * Mọi ô có sẵn từ đầu (lưới cố định, không nhảy bố cục); chừa đáy cho nút chọn đè lên (c.choose), pad: false
 * (Thực hành, nút chọn nằm dưới công cụ) thì không chừa. autoMul / autoDiv: tự viết hết các bước (xem lời giải).
 * Lớp CSS: g4lc-.
 */

import { css, emitter, INK, sfx } from './frame.js';
import { flyOne } from '../grade3Games/fly.js';
import { divSteps } from '../grade3Drills/division.js';
import { mulSteps } from '../grade4Drills/mul.js';

const len = (n) => String(n).length;

// ── Nhân ──────────────────────────────────────────────────────────────────────────────────────────────
export function createLongMul(host, a, b, { pad = true } = {}) {
  injectStyles();
  const t = emitter({});
  const { steps, parts } = mulSteps(a, b);
  const R = a * b, nb = len(b), multi = nb > 1;
  const L = Math.max(len(a), len(b), len(R), ...parts.map((p, j) => len(p) + j));
  const rows = ['c', 'a', 'b', ...(multi ? parts.map((_, j) => `p${j}`) : []), 'r'];
  const dig = (n, i) => { const s = String(n); return i < s.length ? s[s.length - 1 - i] : ''; };
  const cols = Array.from({ length: L }, (_, k) => L - 1 - k); // trái → phải: chỉ số hàng (0 = đơn vị)
  const cells = rows.map((r) => {
    const sign = r === 'b' ? '×' : '';
    const extra = r === 'c' ? ' g4lc-carry' : r === 'r' ? ' g4lc-res' : r[0] === 'p' ? ' g4lc-part' : '';
    return `<div class="g4lc-c g4lc-sign${r === 'b' ? ' g4lc-line' : ''}" data-r="${r}" data-s>${sign}</div>`
      + cols.map(i => `<div class="g4lc-c${extra}${r === 'b' ? ' g4lc-line' : ''}" data-r="${r}" data-i="${i}">${r === 'a' ? dig(a, i) : r === 'b' ? dig(b, i) : ''}</div>`).join('');
  }).join('');
  host.innerHTML = `<div class="g4lc g4lc-mul${pad ? '' : ' g4lc-nopad'}" style="--n:${L + 1};--rows:${rows.length - 0.45}"><div class="g4lc-grid">${cells}</div></div>`;
  const root = host.querySelector('.g4lc');
  const at = (r, i) => root.querySelector(`[data-r="${r}"][data-i="${i}"]`);
  const signAt = (r) => root.querySelector(`[data-r="${r}"][data-s]`);
  Object.assign(t, { root, steps, parts, result: R, a, b, multi, at });
  const rowOf = (j) => (multi ? `p${j}` : 'r');

  t.glow = (pairs) => {
    root.querySelectorAll('.g4lc-on').forEach(e => e.classList.remove('g4lc-on'));
    for (const [r, i] of pairs || []) at(r, i)?.classList.add('g4lc-on');
  };
  /** Viết chữ số (hoặc số hai chữ số ở bước cuối) của bước nhân s vào hàng tích riêng thứ s.j. */
  t.write = (s) => {
    const w = s.write;
    for (let k = 0; k < w.length; k++) { const e = at(rowOf(s.j), s.i + s.j + w.length - 1 - k); if (e) { e.textContent = w[k]; pop(e); } }
    sfx.pop(s.i);
  };
  /** Bước cộng các tích riêng: viết vào hàng tích. */
  t.sum = (s) => {
    const w = s.write;
    for (let k = 0; k < w.length; k++) { const e = at('r', s.i + w.length - 1 - k); if (e) { e.textContent = w[k]; pop(e); } }
    sfx.pop(s.i);
  };
  /** Số nhớ bay từ chữ số vừa viết lên hàng nhớ trên đầu cột bên trái. */
  t.carry = (s) => new Promise((res) => {
    const j = s.kind === 'scarry' ? 0 : s.j;
    const from = at(s.kind === 'scarry' ? 'r' : rowOf(j), s.i + j - 1), to = at('c', s.i + j);
    const fs = parseFloat(getComputedStyle(from).fontSize) * 0.6;
    flyOne(`<div class="g4lc-fly" style="font-size:${fs}px">${s.write}</div>`, from.getBoundingClientRect(), to.getBoundingClientRect(), {
      minMs: 380, maxMs: 600, onLand: () => { to.textContent = s.write; pop(to); sfx.tap(); res(); },
    });
  });
  t.clearCarry = () => root.querySelectorAll('[data-r="c"]').forEach(e => { e.textContent = ''; });
  /** Tích riêng thứ j viết lùi: các ô bên phải bỏ trống gạch chéo đỏ. */
  t.skip = (j) => { for (let i = 0; i < j; i++) at(`p${j}`, i)?.classList.add('g4lc-skip'); sfx.pop(1); };
  /** Trước tích riêng cuối: dấu + và vạch kẻ dưới các tích riêng. */
  t.plus = () => {
    const r = `p${nb - 1}`;
    const s = signAt(r);
    s.textContent = '+'; pop(s);
    root.querySelectorAll(`[data-r="${r}"]`).forEach(e => e.classList.add('g4lc-line'));
    sfx.pop(4);
  };
  return t;
}

// ── Chia ──────────────────────────────────────────────────────────────────────────────────────────────
export function createLongDiv(host, D, d, { short = false, pad = true } = {}) {
  injectStyles();
  const t = emitter({});
  const plan = divSteps(D, d);
  const S = String(D), n = S.length, Q = String(plan.q);
  // Hàng hiển thị của mỗi bước (vr). Viết gọn: không có hàng tích, mỗi lần trừ viết số dư xuống một hàng mới.
  let subs = 0;
  const steps = plan.steps.map((s) => {
    if (!short) return { ...s, vr: s.row };
    if (s.kind === 'sub') return { ...s, vr: ++subs };
    if (s.kind === 'down') return { ...s, vr: subs };
    return { ...s, vr: s.row };
  });
  const rows = short ? subs + 1 : plan.rows;
  const right = Math.max(len(d), Q.length) + 0.6;
  let g = '';
  for (let r = 0; r < rows; r++) {
    g += `<div class="g4lc-c g4lc-sign" data-r="${r}" data-s style="grid-row:${r + 1};grid-column:1"></div>`;
    for (let i = 0; i < n; i++) g += `<div class="g4lc-c" data-r="${r}" data-i="${i}" style="grid-row:${r + 1};grid-column:${i + 2}"></div>`;
  }
  host.innerHTML = `
    <div class="g4lc g4lc-div${pad ? '' : ' g4lc-nopad'}" style="--n:${n + 1 + right + 0.4};--rows:${Math.max(rows, 3)}">
      <div class="g4lc-dwrap">
        <div class="g4lc-left" style="grid-template-columns: repeat(${n + 1}, var(--cw)); grid-template-rows: repeat(${rows}, var(--ch))">${g}</div>
        <div class="g4lc-right" style="width:calc(var(--cw) * ${right})">
          <div class="g4lc-dv">${d}</div>
          <div class="g4lc-q">${[...Q].map((_, k) => `<span data-q="${k}"></span>`).join('')}</div>
        </div>
      </div>
    </div>`;
  const root = host.querySelector('.g4lc');
  const at = (r, i) => root.querySelector(`.g4lc-c[data-r="${r}"][data-i="${i}"]`);
  [...S].forEach((ch, i) => { at(0, i).textContent = ch; at(0, i).classList.add('g4lc-dvd'); });
  Object.assign(t, { root, plan, steps, at, D, d, short, q: plan.q, rem: plan.rem });
  t.qEl = (k) => root.querySelector(`[data-q="${k}"]`);
  t.dvEl = root.querySelector('.g4lc-dv');
  t.mark = (els) => {
    root.querySelectorAll('.g4lc-on').forEach(e => e.classList.remove('g4lc-on'));
    (els || []).forEach(e => e?.classList.add('g4lc-on'));
  };
  /** Các ô của số đang đem chia: hàng r, tận cùng ở cột end, rộng w chữ số. */
  t.cells = (r, end, w) => Array.from({ length: w }, (_, k) => at(r, end - w + 1 + k));
  /** Viết số v sao cho chữ số cuối ở cột end, hàng r (sign: dấu trừ bên trái; line: vạch kẻ dưới). */
  t.writeAt = (r, end, v, { sign = false, line = false } = {}) => {
    const s = String(v);
    for (let k = 0; k < s.length; k++) {
      const e = at(r, end - s.length + 1 + k);
      e.textContent = s[k]; pop(e);
      if (line) e.classList.add('g4lc-line');
    }
    if (sign) {
      const col = end - s.length + 1;
      const e = col > 0 ? at(r, col - 1) : root.querySelector(`.g4lc-sign[data-r="${r}"]`);
      e.textContent = '−'; e.classList.add('g4lc-minus');
    }
    sfx.pop(r);
  };
  t.writeQ = (k, q) => { const e = t.qEl(k); e.textContent = q; pop(e); sfx.pop(k + 2); };
  /** Chữ số thứ i của số bị chia bay xuống hàng r. */
  t.bringDown = (r, i) => new Promise((res) => {
    const from = at(0, i), to = at(r, i);
    const fs = parseFloat(getComputedStyle(from).fontSize);
    flyOne(`<div class="g4lc-fly g4lc-fly-d" style="font-size:${fs}px">${S[i]}</div>`, from.getBoundingClientRect(), to.getBoundingClientRect(), {
      minMs: 420, maxMs: 650, onLand: () => { to.textContent = S[i]; pop(to); sfx.tap(); res(); },
    });
  });
  return t;
}

const wait = (ms) => new Promise(r => setTimeout(r, ms));

/** Tự viết hết các bước chia (lời giải hiện dần sau khi em trả lời). */
export async function autoDiv(t, ms = 260) {
  for (const s of t.steps) {
    if (s.kind === 'q') t.writeQ(s.qi, s.q);
    else if (s.kind === 'mul' && !t.short) t.writeAt(s.vr, s.end, s.p, { sign: true, line: true });
    else if (s.kind === 'sub') t.writeAt(s.vr, s.end, s.r);
    else if (s.kind === 'down') await t.bringDown(s.vr, s.col);
    else continue;
    await wait(ms);
  }
}

/** Tự viết hết các bước nhân (tích riêng, cộng). */
export async function autoMul(t, ms = 200) {
  for (const s of t.steps) {
    if (s.kind === 'part') { t.clearCarry(); if (s.j) { t.skip(s.j); if (s.j === String(t.b).length - 1) t.plus(); } continue; }
    if (s.kind === 'add') { t.clearCarry(); continue; }
    if (s.kind === 'carry' || s.kind === 'scarry') { await t.carry(s); continue; }
    if (s.kind === 'digit') t.write(s); else if (s.kind === 'sum') t.sum(s);
    await wait(ms);
  }
  t.clearCarry();
}

function pop(e) { e.classList.remove('g4lc-new'); void e.offsetWidth; e.classList.add('g4lc-new'); }

let styled = false;
function injectStyles() {
  if (styled) return;
  styled = true;
  css('g4-longcalc', `
    .g4lc { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; font-family: 'Baloo 2', sans-serif;
      padding: 1cqh 2cqi 17cqh; box-sizing: border-box; }
    .g4lc-nopad { padding-bottom: 1cqh; }
    .g4lc-mul { --cw: min(calc(80cqh / (var(--rows) * 1.12)), calc(86cqi / var(--n))); }
    .g4lc-grid { display: grid; grid-template-columns: repeat(var(--n), var(--cw)); grid-auto-rows: calc(var(--cw) * 1.12); }
    .g4lc-c { display: grid; place-items: center; position: relative; font-weight: 800; color: #1E293B; font-size: calc(var(--cw) * 0.95); line-height: 1;
      border-radius: 0.14em; transition: background .2s; }
    .g4lc-mul .g4lc-grid > [data-r="c"] { height: calc(var(--cw) * 0.62); align-self: end; }
    .g4lc-grid { grid-template-rows: calc(var(--cw) * 0.62); }
    .g4lc-carry { color: #DC2626; font-size: calc(var(--cw) * 0.5); }
    .g4lc-part { color: #2563EB; }
    .g4lc-part[data-r="p1"], .g4lc-part[data-r="p3"] { color: #DC2626; }
    .g4lc-res { color: #15803D; }
    .g4lc-sign { color: #64748B; font-size: calc(var(--cw) * 0.75); }
    .g4lc-line { box-shadow: inset 0 calc(var(--cw) * -0.05) 0 ${INK}; }
    .g4lc-on { background: #FEF08A; }
    .g4lc-new { animation: g4lcNew .4s ease; }
    @keyframes g4lcNew { from { transform: scale(1.5); color: #16A34A; } }
    .g4lc-skip::before, .g4lc-skip::after { content: ''; position: absolute; left: 26%; right: 26%; top: 50%; height: max(3px, calc(var(--cw) * 0.07));
      background: #DC2626; border-radius: 9px; opacity: 0.75; transform: rotate(38deg); animation: g4lcSkip .3s ease-out both; }
    .g4lc-skip::after { transform: rotate(-38deg); animation-delay: .12s; }
    @keyframes g4lcSkip { from { opacity: 0; } }
    .g4lc-fly { width: 100%; height: 100%; display: grid; place-items: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #DC2626; }
    .g4lc-fly-d { color: #1E3A8A; }

    /* chia: ô hẹp hơn chữ (chữ số vốn hẹp), hàng cao: màn dọc hẹp vẫn chữ to */
    .g4lc-div { --cw: min(calc(80cqh / (var(--rows) * 1.4)), calc(90cqi / var(--n))); --ch: calc(var(--cw) * 1.4); }
    .g4lc-div .g4lc-c, .g4lc-div .g4lc-dv, .g4lc-div .g4lc-q span { font-size: calc(var(--cw) * 1.12); }
    .g4lc-div .g4lc-minus { font-size: calc(var(--cw) * 0.85); }
    .g4lc-dwrap { display: flex; align-items: flex-start; }
    .g4lc-left { display: grid; border-right: max(3px, calc(var(--cw) * 0.06)) solid ${INK}; padding-right: calc(var(--cw) * 0.12); }
    .g4lc-dvd { color: #1E3A8A; }
    .g4lc-minus { color: #DC2626 !important; font-size: calc(var(--cw) * 0.75); }
    .g4lc-right { display: flex; flex-direction: column; padding-left: calc(var(--cw) * 0.15); }
    .g4lc-dv { height: var(--ch); display: flex; align-items: center; font-weight: 800; color: #7C3AED; font-size: calc(var(--cw) * 0.95);
      border-bottom: max(3px, calc(var(--cw) * 0.06)) solid ${INK}; padding: 0 0.15em; transition: background .2s; border-radius: 0.14em 0.14em 0 0; }
    .g4lc-q { height: var(--ch); display: flex; align-items: center; padding: 0 0.1em; }
    .g4lc-q span { width: calc(var(--cw) * 0.86); height: 90%; display: grid; place-items: center; font-weight: 800; color: #15803D; font-size: calc(var(--cw) * 0.95); border-radius: 0.14em; }
    .g4lc-q span:empty { box-shadow: inset 0 -2px 0 #CBD5E1; }
    @media (prefers-reduced-motion: reduce) { .g4lc-new { animation: g4lcCalm .45s ease; } @keyframes g4lcCalm { from { opacity: 0.25; color: #16A34A; } } }
  `);
}
