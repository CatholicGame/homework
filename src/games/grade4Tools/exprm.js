/**
 * ⚙️ Máy biểu thức chữ (Bài 4, 24): màn hình máy hiện biểu thức có chữ (2 + a). Thay chữ bằng một số → số bay vào
 * chỗ chữ, bánh răng quay, máy ra giá trị; mỗi lần thay ghi thêm một dòng vào bảng kết quả.
 * Tuỳ chọn: hình vuông / hình chữ nhật có cạnh vẽ theo tỉ lệ giá trị chữ (công thức chu vi).
 */

import { css, emitter, INK, sfx } from './frame.js';
import { sleep } from '../grade3Drills/kit.js';
import { fmt, fmtSp } from './num.js';
import { flyOne } from '../grade3Games/fly.js';

const OP_WORD = { '+': 'cộng', '-': 'trừ', '*': 'nhân', '/': 'chia', ':': 'chia' };
export const LETTER_COLOR = { a: '#2563EB', b: '#16A34A', c: '#DB2777', m: '#7C3AED', n: '#EA580C', p: '#0891B2' };
const isLetter = (x) => /^[a-z]$/.test(x);
/** Bề ngang một dòng máy (đơn vị ~ kí tự): biểu thức + "= ?" + viền, để cỡ chữ vừa khung máy. */
const lineWidth = (tokens) => tokens.reduce((w, x) => w + (isLetter(x) ? 1.6 : String(show(x)).length) + 0.4, 0) + 9;
const show = (x) => (x === '*' ? '×' : x === '/' ? ':' : x === '-' ? '−' : x);

/** Giá trị biểu thức (tokens: số, chữ, + - * / ( )), vals: { a: 4 }. */
export function evalTokens(tokens, vals) {
  const src = tokens.map(x => (isLetter(x) ? `(${vals[x]})` : x === ':' ? '/' : x === '×' ? '*' : x === '−' ? '-' : x)).join(' ');
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${src});`)();
}
export const exprText = (tokens, vals = null) => tokens.map(x => (isLetter(x) && vals ? fmt(vals[x]) : show(x))).join(' ').replace(/\( /g, '(').replace(/ \)/g, ')');

/**
 * host; machines: [{ tokens }] (một hoặc hai máy cạnh nhau); shape: 'square' | 'rect' | null; rows: số dòng bảng giữ chỗ.
 */
export function createExpr(host, { machines, shape = null, rows = 4, title = '' }) {
  injectExprStyles();
  const t = emitter({});
  const letters = [...new Set(machines.flatMap(m => m.tokens.filter(isLetter)))];
  host.innerHTML = `
    <div class="g4e ${shape ? 'g4e-has-shape' : ''}">
      <div class="g4e-top">
        <div class="g4e-ms">${machines.map((m, k) => `
          <div class="g4e-machine" data-k="${k}">
            <div class="g4e-gears" aria-hidden="true"><span>⚙️</span><span>⚙️</span></div>
            <div class="g4e-fit"><div class="g4e-line" style="--w:${lineWidth(m.tokens)}">
              <div class="g4e-screen">${m.tokens.map((x, i) => (isLetter(x)
                ? `<span class="g4e-let" data-l="${x}" data-i="${i}" style="--c:${LETTER_COLOR[x]}">${x}</span>`
                : `<span class="g4e-tok">${show(x)}</span>`)).join('')}</div>
              <div class="g4e-outrow">= <span class="g4e-out">?</span></div>
            </div></div>
          </div>`).join('')}</div>
        ${shape ? '<div class="g4e-shape"><svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet"></svg></div>' : ''}
      </div>
      <table class="g4e-table">
        <thead><tr>${letters.map(l => `<th style="color:${LETTER_COLOR[l]}">${l}</th>`).join('')}${machines.map(m => `<th>${exprText(m.tokens)}</th>`).join('')}</tr></thead>
        <tbody>${Array.from({ length: rows }, () => `<tr>${letters.map(() => '<td>&nbsp;</td>').join('')}${machines.map(() => '<td></td>').join('')}</tr>`).join('')}</tbody>
      </table>
      ${title ? `<div class="g4e-title">${title}</div>` : ''}
    </div>`;
  const root = host.querySelector('.g4e');
  let row = 0;
  t.root = root;
  t.letters = letters;

  function drawShape(vals) {
    const svg = root.querySelector('.g4e-shape svg');
    if (!svg) return;
    const a = vals?.a, b = shape === 'rect' ? vals?.b : a;
    if (a == null) { svg.innerHTML = ''; return; }
    // hình chữ nhật lệch trái để nhãn b (bên phải) nằm trọn trong khung 400
    const rect = shape === 'rect', cx = rect ? 140 : 200;
    const k = (rect ? 190 : 220) / Math.max(a, b || a, 10);
    const w = a * k, h = (b || a) * k, x = cx - w / 2, y = 150 - h / 2;
    svg.innerHTML = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#FEF3C7" stroke="${INK}" stroke-width="2.5"/>
      <text x="${cx}" y="${y - 14}" class="g4e-sl" fill="${LETTER_COLOR.a}">a = ${a} cm</text>
      ${shape === 'rect' ? `<text x="${x + w + 12}" y="${150 + 10}" class="g4e-sl" fill="${LETTER_COLOR.b}" style="text-anchor:start">b = ${b} cm</text>` : ''}`;
  }

  /** Thay chữ bằng số, máy chạy, ra kết quả; ghi một dòng vào bảng. Trả về các kết quả. */
  t.feed = async (vals, { record = true, hideOut = false } = {}) => {
    drawShape(vals);
    const results = [];
    for (const [k, m] of machines.entries()) {
      const mach = root.querySelector(`.g4e-machine[data-k="${k}"]`);
      for (const el of mach.querySelectorAll('.g4e-let')) {
        el.textContent = fmt(vals[el.dataset.l]);
        el.classList.remove('g4e-fed'); void el.offsetWidth; el.classList.add('g4e-fed');
        sfx.pop(2);
        await sleep(220);
      }
      mach.classList.add('g4e-run');
      await sleep(650);
      mach.classList.remove('g4e-run');
      const r = evalTokens(m.tokens, vals);
      results.push(r);
      const out = mach.querySelector('.g4e-out');
      out.textContent = hideOut ? '?' : fmt(r);
      out.classList.remove('g4e-pop'); void out.offsetWidth; out.classList.add('g4e-pop');
      if (!hideOut) sfx.ding();
    }
    if (record && row < rows) {
      const tr = root.querySelectorAll('.g4e-table tbody tr')[row++];
      tr.innerHTML = `${letters.map(l => `<td style="color:${LETTER_COLOR[l]}">${fmt(vals[l])}</td>`).join('')}${results.map(r => `<td><b>${fmt(r)}</b></td>`).join('')}`;
      tr.classList.add('g4e-newrow');
    }
    return results;
  };
  t.reveal = (k = 0) => { const out = root.querySelectorAll('.g4e-out')[k]; const v = evalTokens(machines[k].tokens, t.lastVals || {}); out.textContent = fmt(v); };
  t.out = (k = 0) => root.querySelectorAll('.g4e-out')[k];
  /** Đưa chữ về như cũ. */
  t.reset = () => { root.querySelectorAll('.g4e-let').forEach(el => { el.textContent = el.dataset.l; el.classList.remove('g4e-fed'); }); root.querySelectorAll('.g4e-out').forEach(o => { o.textContent = '?'; }); };
  t.clearRows = () => { row = 0; root.querySelectorAll('.g4e-table tbody tr').forEach(tr => { tr.innerHTML = `${letters.map(() => '<td>&nbsp;</td>').join('')}${machines.map(() => '<td></td>').join('')}`; }); };
  return t;
}

/**
 * Các bước tính như sách: thay chữ bằng số rồi mỗi bước tính một phép (trong ngoặc trước, nhân chia trước cộng trừ).
 * Trả về [{ toks, at, op, inParen }]: toks = dãy sau bước đó (số là Number), at = vị trí số vừa tính được
 * (bước 0: at = -1), op = phép vừa tính ("194 × 4"), opSay = câu đọc ("194 nhân 4"), inParen = phép đó nằm trong ngoặc.
 */
export function evalSteps(tokens, vals) {
  let toks = tokens.map(x => (isLetter(x) ? vals[x] : /^\d+$/.test(x) ? +x : x));
  const out = [{ toks, at: -1 }];
  const calc = (a, op, b) => (op === '+' ? a + b : op === '-' ? a - b : op === '*' ? a * b : a / b);
  while (toks.length > 1) {
    // đoạn cần tính: ngoặc trong cùng, không có thì cả dãy
    let lo = 0, hi = toks.length;
    const open = toks.lastIndexOf('(');
    if (open >= 0) { lo = open + 1; hi = toks.indexOf(')', open); }
    const seg = toks.slice(lo, hi);
    let k = seg.findIndex(x => x === '*' || x === '/' || x === ':');
    if (k < 0) k = seg.findIndex(x => x === '+' || x === '-');
    const i = lo + k;
    const v = calc(toks[i - 1], toks[i], toks[i + 1]);
    let next = [...toks.slice(0, i - 1), v, ...toks.slice(i + 2)];
    let at = i - 1;
    // ngoặc chỉ còn một số → bỏ ngoặc ngay trong bước này
    if (open >= 0 && next[at - 1] === '(' && next[at + 1] === ')') { next = [...next.slice(0, at - 1), v, ...next.slice(at + 2)]; at -= 1; }
    out.push({ toks: next, at, op: `${fmt(toks[i - 1])} ${show(toks[i])} ${fmt(toks[i + 1])}`,
      opSay: `${fmtSp(toks[i - 1])} ${OP_WORD[toks[i]]} ${fmtSp(toks[i + 1])}`, inParen: open >= 0 });
    toks = next;
  }
  return out;
}

/**
 * ⚙️ Máy tính từng bước (Thực hành Bài 4): màn hình máy là các dòng tính như vở
 *   a × 4
 *   = 194 × 4
 *   = [?]
 * Mọi dòng giữ chỗ từ đầu (ẩn), hiện dần. Ô kết quả mỗi bước là .g4-box để hỏi bằng bàn phím.
 */
export function createExprSteps(host, { tokens, vals }) {
  injectExprStyles();
  const steps = evalSteps(tokens, vals);
  const tokHtml = (toks, at, sub) => toks.map((x, i) => {
    if (i === at) return '<span class="g4-box g4x-ans"></span>';
    if (typeof x === 'number') {
      const l = sub ? tokens[i] : null;
      return isLetter(l) ? `<span class="g4x-num" data-l="${l}" style="--c:${LETTER_COLOR[l]}">${fmt(x)}</span>` : `<span>${fmt(x)}</span>`;
    }
    return `<span>${show(x)}</span>`;
  }).join(' ').replace(/<span>\(<\/span> /g, '<span>(</span>').replace(/ <span>\)<\/span>/g, '<span>)</span>');
  const exprHtml = tokens.map(x => (isLetter(x) ? `<span class="g4e-let" style="--c:${LETTER_COLOR[x]}">${x}</span>` : `<span>${show(x)}</span>`)).join(' ')
    .replace(/<span>\(<\/span> /g, '<span>(</span>').replace(/ <span>\)<\/span>/g, '<span>)</span>');
  // bề ngang dòng dài nhất (kí tự; ô trống tính như 3 kí tự) để cỡ chữ vừa khung
  const width = Math.max(...steps.map(st => 2 + st.toks.reduce((w, x, i) => w + (i === st.at ? 4 : String(typeof x === 'number' ? fmt(x) : x).length + 1), 0)));
  host.innerHTML = `
    <div class="g4e g4x">
      <div class="g4e-machine g4x-machine">
        <div class="g4e-gears" aria-hidden="true"><span>⚙️</span><span>⚙️</span></div>
        <div class="g4e-screen g4x-screen" style="--n:${steps.length + 1};--w:${width}">
          <div class="g4x-line"><span class="g4x-eq"></span><span class="g4x-body">${exprHtml}</span></div>
          ${steps.map((st, k) => `<div class="g4x-line g4x-wait" data-k="${k}"><span class="g4x-eq">=</span><span class="g4x-body">${tokHtml(st.toks, st.at, k === 0)}</span></div>`).join('')}
        </div>
      </div>
    </div>`;
  const root = host.querySelector('.g4x');
  const line = (k) => root.querySelector(`.g4x-line[data-k="${k}"]`);
  const t = { root, steps };
  t.line = line;
  /** Hiện dòng k (bước k; bước 0 = thay chữ bằng số). Trả về ô kết quả của bước (nếu có). */
  t.show = (k) => { const el = line(k); el.classList.remove('g4x-wait'); return el.querySelector('.g4x-ans'); };
  /** Bước 0: số bay từ `from(letter)` (phần tử trong đề) vào chỗ chữ. */
  t.substitute = async (from) => {
    const el = line(0);
    const nums = [...el.querySelectorAll('.g4x-num')];
    nums.forEach(n => { n.style.visibility = 'hidden'; });
    el.classList.remove('g4x-wait');
    await Promise.all(nums.map((n, i) => new Promise((res) => {
      const src = from?.(n.dataset.l);
      const land = () => { n.style.visibility = ''; n.classList.add('g4e-fed'); sfx.pop(2); res(); };
      if (!src) { setTimeout(land, i * 200); return; }
      const fs = parseFloat(getComputedStyle(n).fontSize);
      flyOne(`<span class="g4x-fly" style="font-size:${fs}px;--c:${n.style.getPropertyValue('--c')}">${n.textContent}</span>`, src.getBoundingClientRect(), n.getBoundingClientRect(), { delay: i * 200, minMs: 420, maxMs: 700, onLand: land });
    })));
    const m = root.querySelector('.g4x-machine');
    m.classList.add('g4e-run');
    await sleep(600);
    m.classList.remove('g4e-run');
  };
  return t;
}

let styled = false;
function injectExprStyles() {
  if (styled) return;
  styled = true;
  css('g4-expr', `
    .g4e { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 2cqh; padding: 2cqh 2cqi; font-family: 'Baloo 2', sans-serif; box-sizing: border-box; }
    /* Khám phá: nút chọn đè lên đáy tờ giấy, chừa sẵn chỗ để không che bảng và dòng công thức */
    .g4-board:not(.g4-pboard) > .g4e { padding-bottom: calc(min(6.4cqh, 3.6cqi) * 2 + 2cqh + 12px); }
    @media (orientation: portrait) { .g4-board:not(.g4-pboard) > .g4e { padding-bottom: calc(min(5.2cqh, 7.4cqi) * 2.1 + 2cqh + 12px); } }
    .g4e-top { flex: 1 1 0; min-height: 0; display: flex; gap: 2cqi; align-items: stretch; }
    .g4e-ms { flex: 1 1 0; display: flex; gap: 2cqi; min-width: 0; }
    @media (orientation: portrait) { .g4e-ms { flex-direction: column; gap: 1.6cqh; } }
    .g4e-machine { flex: 1 1 0; min-width: 0; position: relative; background: linear-gradient(180deg, #94A3B8, #64748B); border: 2px solid #475569; border-radius: 1.2rem; padding: 2cqh 1.4cqi; display: flex; flex-direction: column; justify-content: center; gap: 1.4cqh; box-shadow: 0 6px 0 rgba(63,58,64,0.35); }
    .g4e-gears { position: absolute; top: -0.4em; right: 0.3em; font-size: min(6cqh, 4cqi); display: flex; gap: 0.05em; }
    .g4e-gears span { display: inline-block; }
    .g4e-run .g4e-gears span { animation: g4eSpin .6s linear infinite; }
    .g4e-run .g4e-gears span + span { animation-direction: reverse; }
    @keyframes g4eSpin { to { transform: rotate(360deg); } }
    .g4e-fit { flex: 1 1 0; min-height: 0; container-type: size; display: flex; align-items: center; justify-content: center; }
    .g4e-line { display: flex; align-items: center; justify-content: center; gap: 0.3em; max-width: 100%; font-size: min(42cqh, calc(150cqi / var(--w))); }
    .g4e-line .g4e-screen { font-size: inherit; flex: 0 1 auto; min-width: 0; }
    .g4e-screen { background: #ECFEFF; border: max(1.5px, 0.04em) solid #334155; border-radius: 0.8rem; padding: 0.15em 0.3em; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.18em; font-weight: 800; color: #0F172A; font-size: min(9cqh, 5cqi); line-height: 1.2; min-height: 1.5em; }
    .g4e-let { display: inline-grid; place-items: center; min-width: 1.2em; padding: 0 0.15em; border-radius: 0.3em; background: var(--c); color: #fff; }
    .g4e-fed { animation: g4eFed .45s ease; background: #fff; color: var(--c); box-shadow: inset 0 0 0 3px var(--c); }
    @keyframes g4eFed { from { transform: scale(1.7) translateY(-0.4em); } }
    .g4e-outrow { flex: none; white-space: nowrap; color: #fff; font-weight: 800; line-height: 1.2; text-shadow: 0 0.05em 0 rgba(15,23,42,0.35); }
    .g4e-out { display: inline-block; min-width: 2.5em; text-align: center; background: #FEF08A; color: #92400E; border: max(1.5px, 0.04em) solid #B45309; border-radius: 0.5em; text-shadow: none; padding: 0 0.3em; }
    .g4e-pop { animation: g4ePop .45s cubic-bezier(.2,1.6,.4,1); }
    @keyframes g4ePop { from { transform: scale(0.4); } }
    .g4e-shape { flex: 0 0 34%; background: #fff; border: 2px dashed #CBD5E1; border-radius: 1rem; display: flex; }
    .g4e-shape svg { flex: 1; width: 100%; height: 100%; }
    .g4e-sl { font-weight: 800; font-size: 30px; text-anchor: middle; font-family: 'Baloo 2', sans-serif; }
    .g4e-table { flex: none; border-collapse: collapse; width: 100%; font-size: min(4.6cqh, 4.8cqi); font-weight: 800; text-align: center; table-layout: fixed; }
    .g4e-table th { background: #E0F2FE; color: #0F172A; border: 1.5px solid #94A3B8; padding: 0.1em 0.3em; }
    .g4e-table td { border: 1.5px solid #94A3B8; padding: 0.05em 0.3em; color: #1E293B; height: 1.3em; background: #fff; }
    .g4e-newrow td { animation: g4eRow .5s ease; }
    @keyframes g4eRow { from { background: #FEF08A; } }
    .g4e-title { text-align: center; font-weight: 800; color: #1E293B; font-size: min(5.5cqh, 3.4cqi); }
    /* Máy tính từng bước: các dòng chia đều màn hình máy; chữ to nhất có thể theo chiều cao (--n dòng) và dòng dài nhất (--w kí tự) */
    .g4x-machine { padding: 2.4cqh 2cqi; }
    .g4x-screen { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: auto auto; grid-auto-rows: 1fr; align-items: center; justify-content: center; gap: 0 0.3em;
      padding: 0.2em 0.5em; font-size: min(calc(48cqh / var(--n)), calc(150cqi / var(--w))); }
    .g4x-line { display: contents; }
    .g4x-eq { text-align: right; color: #475569; }
    .g4x-body { white-space: nowrap; }
    .g4x-wait > * { visibility: hidden; }
    .g4x-num { color: var(--c); display: inline-block; }
    .g4x-body .g4e-let { margin: 0 0.08em; }
    .g4x-num.g4e-fed { background: none; box-shadow: none; }
    .g4x-ans { min-width: 2.6em; height: 1.2em; padding: 0 0.25em; }
    .g4x-fly { font-family: 'Baloo 2', sans-serif; font-weight: 800; color: var(--c); white-space: nowrap; line-height: 1; }
    @media (prefers-reduced-motion: reduce) { .g4e-run .g4e-gears span { animation-duration: 1.6s; } .g4e-fed, .g4e-pop { animation: none; } }
  `);
}
