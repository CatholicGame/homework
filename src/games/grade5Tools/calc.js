/**
 * 📟 Máy tính cầm tay (Toán 5 Tập Hai, Bài 42, 43): bàn phím 5 × 5 đúng như hình trong sách
 *   OFF MRC M− M+ ÷ / % 7 8 9 × / +/− 4 5 6 − / ON/C 1 2 3 + (cao 2 hàng) / CE 0 . =
 * Máy đơn giản: tính lần lượt theo thứ tự bấm (5 + 2 × 3 = 21). Phím %: a × b % → a × b : 100 (giá trị phần trăm),
 * a ÷ b % → a : b × 100 (tỉ số phần trăm), a + b % / a − b % → cộng, trừ b% của a. Màn hình dùng dấu chấm thập phân như máy thật.
 * Bên cạnh máy (ngang) hoặc phía trên (dọc): băng ghi các phím đã bấm.
 *
 * Sự kiện 'key' (phím), 'result' (số trên màn hình sau = hoặc %). t.press('128+136=') thầy bấm; t.glow(k) nháy phím;
 * t.display (chuỗi màn hình), t.value (số), t.on.
 */

import { css, emitter, INK, sfx } from '../grade4Tools/frame.js';
import { calmMotion } from '../grade3Games/fly.js';
import { sleep } from '../grade3Drills/kit.js';

const KEYS = [
  ['OFF', 'MRC', 'M-', 'M+', '÷'],
  ['%', '7', '8', '9', '×'],
  ['+/-', '4', '5', '6', '-'],
  ['ON/C', '1', '2', '3', '+'],
  ['CE', '0', '.', '='],
];
const LABEL = { '-': '−', 'M-': 'M−', '+/-': '+/−' };
/** Chữ gõ tắt cho press(): mỗi kí tự là một phím, trừ các tên dài trong ngoặc vuông: "[ON/C]780000×5%=". */
const tokens = (s) => s.match(/\[[^\]]+\]|./g).map((k) => (k[0] === '[' ? k.slice(1, -1) : k === '*' ? '×' : k === '/' ? '÷' : k === ':' ? '÷' : k === ',' ? '.' : k)).filter((k) => k !== ' ');

const num = (s) => Number(s);
/** Số hiện trên màn hình: tối đa 10 chữ số, bỏ số 0 thừa. */
function show(x) {
  if (!isFinite(x)) return 'E';
  let s = String(Math.round(x * 1e8) / 1e8);
  if (s.includes('e')) return 'E';
  const digits = s.replace(/[-.]/g, '').length;
  if (digits > 10) { const i = s.indexOf('.'); s = i < 0 ? 'E' : String(+x.toFixed(Math.max(0, 10 - i + (x < 0 ? 1 : 0)))); }
  return s;
}

export function createCalc(host, { on = true, tape = true } = {}) {
  injectCalcStyles();
  const t = emitter({});
  host.innerHTML = `
    <div class="g5c ${tape ? '' : 'g5c-notape'}">
      <div class="g5c-body">
        <div class="g5c-screen"><span class="g5c-mem"></span><span class="g5c-op"></span><span class="g5c-disp">0</span></div>
        <div class="g5c-keys">${KEYS.map((row, ri) => row.map((k) => `<button type="button" class="g5c-k ${/^[0-9.]$/.test(k) ? 'g5c-num' : ''} ${k === 'ON/C' || k === 'CE' ? 'g5c-red' : ''} ${k === '+' ? 'g5c-tall' : ''} ${k === '=' ? 'g5c-eq' : ''}" data-k="${k}" ${k === '+' ? `style="grid-row: ${ri + 1} / span 2; grid-column: 5"` : ''}>${LABEL[k] || k}</button>`).join('')).join('')}</div>
      </div>
      ${tape ? '<div class="g5c-tape"><div class="g5c-tape-h">Em đã bấm</div><div class="g5c-tape-k"></div><div class="g5c-read">&nbsp;</div></div>' : ''}
    </div>`;
  const root = host.querySelector('.g5c');
  const disp = root.querySelector('.g5c-disp'), opEl = root.querySelector('.g5c-op'), memEl = root.querySelector('.g5c-mem');
  const tapeK = root.querySelector('.g5c-tape-k'), readEl = root.querySelector('.g5c-read');
  let power = on, acc = null, op = null, cur = '0', fresh = true, mem = 0, mrc = false, locked = false;
  let log = [];
  const setDisp = (s) => {
    disp.textContent = power ? s : ''; opEl.textContent = power && op ? (LABEL[op] || op) : ''; memEl.textContent = power && mem ? 'M' : '';
    // đọc màn hình kiểu Việt Nam: dấu chấm của máy là dấu phẩy
    if (readEl) readEl.innerHTML = power && s && s !== 'E' ? `Màn hình: <b>${s.replace('-', '−').replace('.', ',')}</b>${s.includes('.') ? ' <small>(dấu chấm là dấu phẩy)</small>' : ''}` : '&nbsp;';
  };
  const apply = (a, o, b) => (o === '+' ? a + b : o === '-' ? a - b : o === '×' ? a * b : o === '÷' ? a / b : b);
  let shown = '0';
  const out = (x) => { shown = show(x); setDisp(shown); };
  const reset = () => { acc = null; op = null; cur = '0'; fresh = true; out(0); };

  function key(k) {
    if (k === 'ON/C') {
      if (!power) { power = true; reset(); return; }
      reset(); log = []; return;
    }
    if (!power) return;
    if (k === 'OFF') { power = false; setDisp(''); log = []; return; }
    if (/^[0-9]$/.test(k)) {
      if (fresh) { cur = k; fresh = false; } else if (cur.replace(/[-.]/g, '').length < 10) cur = cur === '0' ? k : cur + k;
      shown = cur; setDisp(cur); mrc = false; return;
    }
    if (k === '.') { if (fresh) { cur = '0.'; fresh = false; } else if (!cur.includes('.')) cur += '.'; shown = cur; setDisp(cur); return; }
    if (k === 'CE') { cur = '0'; fresh = true; out(0); return; }
    if (k === '+/-') { const v = -num(shown); cur = show(v); fresh = false; out(v); return; }
    if (['+', '-', '×', '÷'].includes(k)) {
      if (op && !fresh) { acc = apply(acc, op, num(cur)); out(acc); }
      else if (!op || acc === null) acc = num(shown);
      op = k; fresh = true; setDisp(shown); return;
    }
    if (k === '=') {
      if (op) { const r = apply(acc, op, num(fresh ? shown : cur)); acc = null; op = null; fresh = true; out(r); }
      t.emit('result', num(shown));
      return;
    }
    if (k === '%') {
      if (!op) return;
      const a = acc, b = num(fresh ? shown : cur);
      const r = op === '×' ? (a * b) / 100 : op === '÷' ? (a / b) * 100 : op === '+' ? a + (a * b) / 100 : a - (a * b) / 100;
      acc = null; op = null; fresh = true; out(r);
      t.emit('result', num(shown));
      return;
    }
    if (k === 'M+') { mem += num(shown); fresh = true; setDisp(shown); return; }
    if (k === 'M-') { mem -= num(shown); fresh = true; setDisp(shown); return; }
    if (k === 'MRC') { if (mrc) { mem = 0; mrc = false; setDisp(shown); return; } mrc = true; cur = show(mem); fresh = false; out(mem); }
  }

  function paintTape() {
    if (!tapeK) return;
    tapeK.innerHTML = log.map((k) => `<span class="g5c-chip ${/^[0-9.]$/.test(k) ? '' : 'g5c-chip-op'}">${LABEL[k] || k}</span>`).join('');
    tapeK.scrollTop = tapeK.scrollHeight;
  }
  root.querySelector('.g5c-keys').addEventListener('click', (e) => {
    const b = e.target.closest('.g5c-k');
    if (!b || locked) return;
    hit(b.dataset.k, true);
  });
  function hit(k, user) {
    const b = root.querySelector(`.g5c-k[data-k="${CSS.escape(k)}"]`);
    if (b) { b.classList.remove('g5c-press'); void b.offsetWidth; b.classList.add('g5c-press'); }
    sfx.tap?.();
    key(k);
    if (k === 'ON/C' || k === 'OFF') log = k === 'ON/C' ? [] : log; else log.push(k);
    paintTape();
    t.emit('key', k, user);
  }

  /** Thầy bấm lần lượt các phím (chuỗi gõ tắt, xem tokens). */
  t.press = async (s, { gap = 420 } = {}) => {
    for (const k of tokens(s)) { hit(k, false); await sleep(calmMotion() ? gap * 1.15 : gap); }
  };
  t.key = (k) => hit(k, false);
  t.glow = (k) => {
    root.querySelectorAll('.g5c-glow').forEach((b) => b.classList.remove('g5c-glow'));
    if (k != null) root.querySelector(`.g5c-k[data-k="${CSS.escape(k)}"]`)?.classList.add('g5c-glow');
  };
  t.btn = (k) => root.querySelector(`.g5c-k[data-k="${CSS.escape(k)}"]`);
  t.lock = (v = true) => { locked = v; root.classList.toggle('g5c-locked', v); };
  t.clearTape = () => { log = []; paintTape(); };
  t.tokens = tokens;
  Object.defineProperty(t, 'display', { get: () => (power ? shown : '') });
  Object.defineProperty(t, 'value', { get: () => num(shown) });
  Object.defineProperty(t, 'power', { get: () => power });
  Object.defineProperty(t, 'log', { get: () => [...log] });
  t.root = root;
  if (power) reset(); else setDisp('');
  return t;
}

/** Dãy phím (chuỗi gõ tắt) vẽ thành các ô phím nhỏ, dùng trong câu hỏi, phương án chọn. */
export function keyChips(s) {
  injectCalcStyles();
  return `<span class="g5c-chips">${tokens(s).map((k) => `<span class="g5c-chip ${/^[0-9.]$/.test(k) ? '' : 'g5c-chip-op'}">${LABEL[k] || k}</span>`).join('')}</span>`;
}

let styled = false;
function injectCalcStyles() {
  if (styled) return;
  styled = true;
  css('g5-calc', `
    .g5c { flex: 1; min-height: 0; width: 100%; height: 100%; display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 2cqi; align-items: stretch; justify-content: center; padding: 1.5cqh 2cqi; box-sizing: border-box; font-family: 'Baloo 2', sans-serif; }
    .g5c-notape { grid-template-columns: auto; }
    .g5c-body { height: 100%; aspect-ratio: 0.66; max-width: 60cqi; justify-self: center; background: linear-gradient(180deg, #9CA3AF, #6B7280); border: 3px solid ${INK}; border-radius: 6% / 4%; padding: 4% 5%; box-sizing: border-box;
      display: grid; grid-template-rows: 22% 1fr; gap: 4%; box-shadow: 0 6px 0 rgba(63,58,64,0.35); container-type: size; }
    .g5c-screen { position: relative; background: #D9F99D; border: 3px solid #4B5563; border-radius: 0.5em; display: flex; align-items: flex-end; justify-content: flex-end; padding: 0 5cqi 1.5cqh; box-shadow: inset 0 3px 6px rgba(0,0,0,0.25); }
    .g5c-disp { font-family: 'Courier New', monospace; font-weight: 700; font-size: min(13cqh, 13cqi); color: #1F2937; letter-spacing: 0.04em; line-height: 1; }
    .g5c-op, .g5c-mem { position: absolute; top: 1cqh; font-weight: 800; font-size: min(6cqh, 7cqi); color: #374151; }
    .g5c-op { left: 5cqi; } .g5c-mem { left: 16cqi; }
    .g5c-keys { display: grid; grid-template-columns: repeat(5, 1fr); grid-template-rows: repeat(5, 1fr); gap: 2.4cqh 3cqi; }
    .g5c-k { border: 2px solid ${INK}; border-radius: 0.45em; background: #E5E7EB; color: #111827; font-family: inherit; font-weight: 800; font-size: min(6.4cqh, 8cqi); cursor: pointer; touch-action: manipulation; padding: 0;
      box-shadow: 0 0.35em 0 #4B5563; transition: transform .08s, box-shadow .08s; white-space: nowrap; }
    .g5c-num { background: #F9FAFB; font-size: min(8cqh, 10cqi); }
    .g5c-red { background: #EF4444; color: #fff; }
    .g5c-k:active, .g5c-press { transform: translateY(0.3em); box-shadow: 0 0.05em 0 #4B5563; }
    .g5c-press { animation: g5c-p 0.22s ease-out; }
    @keyframes g5c-p { 0% { transform: translateY(0.3em); filter: brightness(0.85); } 100% { transform: none; filter: none; } }
    .g5c-glow { outline: 0.25em solid #FACC15; outline-offset: 0.08em; animation: g5c-g 1s ease-in-out infinite; }
    @keyframes g5c-g { 50% { outline-color: #F59E0B; } }
    @media (prefers-reduced-motion: reduce) { .g5c-glow { animation: none; } .g5c-press { animation-duration: 0.35s; } }
    .g5c-locked .g5c-k { cursor: default; }
    .g5c-tape { min-width: 0; display: flex; flex-direction: column; background: #fff; border: 2px solid #CBD5E1; border-radius: 0.9em; padding: 1cqh 1.4cqi; overflow: hidden; }
    .g5c-tape-h { font-weight: 800; color: #64748B; font-size: min(4.6cqh, 3cqi); }
    .g5c-tape-k { flex: 1; min-height: 0; overflow: hidden; display: flex; flex-wrap: wrap; align-content: flex-start; gap: 0.35em; padding-top: 0.6cqh; font-size: min(8cqh, 4.6cqi); }
    .g5c-read { flex: none; font-weight: 800; color: #334155; font-size: min(7cqh, 3.6cqi); line-height: 1.2; border-top: 2px dashed #CBD5E1; padding-top: 0.8cqh; }
    .g5c-read b { color: #15803D; font-size: 1.25em; }
    .g5c-read small { font-size: 0.6em; color: #64748B; }
    .g5c-chips { display: inline-flex; flex-wrap: wrap; gap: 0.18em; vertical-align: middle; }
    .g5c-chip { display: inline-flex; align-items: center; justify-content: center; min-width: 1.35em; height: 1.5em; padding: 0 0.22em; border: 1.5px solid #6B7280; border-radius: 0.3em; background: #F3F4F6; font-weight: 800; line-height: 1; box-shadow: 0 0.12em 0 #9CA3AF; font-family: 'Baloo 2', sans-serif; }
    .g5c-chip-op { background: #DBEAFE; border-color: #3B82F6; }
    @container (orientation: portrait) {
      .g5c { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 0.22fr) minmax(0, 1fr); }
      .g5c-notape { grid-template-rows: minmax(0, 1fr); }
      .g5c-tape { order: -1; }
      .g5c-tape-h { font-size: min(3.4cqh, 4.4cqi); }
      .g5c-tape-k { font-size: min(4cqh, 5.4cqi); }
      .g5c-tape { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 0 2cqi; }
      .g5c-tape-k { flex: 1 1 60%; }
      .g5c-read { flex: 1 1 100%; font-size: min(3.6cqh, 4.8cqi); }
      .g5c-body { max-width: 92cqi; }
    }
  `);
}
