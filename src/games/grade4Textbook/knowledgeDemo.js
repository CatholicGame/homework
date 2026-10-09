/**
 * Ví dụ "xem từng bước" trong lớp 📘 Kiến thức (SGK Toán 4): thay đoạn chữ dài bằng hình / bảng chữ số,
 * mỗi lần bấm Tiếp thì hiện một bước và có lời giải thích (như hướng dẫn của trò chơi).
 * Có bước hỏi em (chọn đúng mới đi tiếp) và nút "Thử với" để đổi số, xem lại cách làm với số khác.
 *
 *   KNOWLEDGE['bai-9'].demos = [{ kind: 'compare', a: 693251, b: 693500 }]
 *   KNOWLEDGE['bai-4'].demos = [{ kind: 'expr', rows: [{ expr: '3 + a' }], vars: { a: 1 }, tries: [{ label: 'a = 1', vars: { a: 1 } }, …] }]
 *   tries: các nút đổi ví dụ; mỗi nút ghép (Object.assign) vào spec gốc rồi dựng lại từ bước đầu. Nút đầu là ví dụ đang xem.
 *
 * Loại ví dụ (kind) nằm trong demos/: board.js (bảng chữ số), lines.js (dãy tính), frac.js (phân số),
 * diagram.js (sơ đồ, biểu đồ, tia số), geo.js (hình học). Mỗi loại: build(spec) → { title, frames } (xem demos/util.js).
 *
 * demoHtml(spec) trả về khung; bindDemos(host) dựng các bước và gắn nút.
 */

import { BOARD, BOARD_CSS } from './demos/board.js';
import { LINES, LINES_CSS } from './demos/lines.js';
import { FRAC, FRAC_CSS } from './demos/frac.js';
import { DIAGRAM, DIAGRAM_CSS } from './demos/diagram.js';
import { GEO, GEO_CSS } from './demos/geo.js';
import { playSfx } from '../../engine/sfx.js';

const BUILD = { ...BOARD, ...LINES, ...FRAC, ...DIAGRAM, ...GEO };

/**
 * Thêm loại ví dụ của sách khác (Lớp 1, 2, 3, 5: src/games/gradeNKnowledge/demos*.js) mà không sửa file này.
 * kinds: { tên: build(spec) → { title, frames } }; cssText chèn một lần theo id. Tên loại không được trùng.
 */
export function registerDemos(kinds, cssText = '', id = '') {
  for (const k of Object.keys(kinds)) {
    if (BUILD[k] && BUILD[k] !== kinds[k]) throw new Error(`knowledgeDemo: loại "${k}" đã có`);
    BUILD[k] = kinds[k];
  }
  if (cssText && typeof document !== 'undefined') {
    const sid = `kd-css-${id || Object.keys(kinds)[0]}`;
    if (!document.getElementById(sid)) {
      const el = document.createElement('style');
      el.id = sid;
      el.textContent = cssText;
      document.head.appendChild(el);
    }
  }
}

const specs = new Map();
let seq = 0;

const merged = (spec, i) => (spec.tries ? { ...spec, ...spec.tries[i] } : spec);
function build(spec) {
  const fn = BUILD[spec.kind];
  if (!fn) throw new Error(`knowledgeDemo: chưa có loại "${spec.kind}"`);
  return fn(spec);
}

export function demoHtml(spec) {
  const id = `kd${++seq}`;
  specs.set(id, spec);
  const d = build(merged(spec, 0));
  return `
    <div class="kd" data-kd="${id}">
      <div class="kd-title">👆 <span>${spec.title || d.title}</span></div>
      ${spec.tries ? `<div class="kd-tries"><span>Thử với:</span>${spec.tries.map((t, i) => `<button type="button" class="kd-try${i ? '' : ' on'}" data-i="${i}">${t.label}</button>`).join('')}</div>` : ''}
      <div class="kd-stage" role="button" tabindex="0" aria-label="Bước tiếp theo"></div>
      <div class="kd-result"></div>
      <p class="kd-cap" aria-live="polite"></p>
      <div class="kd-dots"></div>
      <div class="kd-nav">
        <button type="button" class="kd-prev" aria-label="Lùi một bước">◀</button>
        <button type="button" class="kd-next"></button>
        <div class="kd-ask"></div>
      </div>
    </div>`;
}

const sfx = (name) => { try { playSfx(name); } catch { /* chưa có âm thanh */ } };

/** Dựng các bước cho mọi khung .kd trong host và gắn nút Lùi / Tiếp (chạm vào hình cũng là Tiếp). */
export function bindDemos(host) {
  injectStyles();
  host.querySelectorAll('.kd').forEach((el) => {
    const spec = specs.get(el.dataset.kd);
    if (!spec) return;
    const stage = el.querySelector('.kd-stage'), cap = el.querySelector('.kd-cap'), out = el.querySelector('.kd-result');
    const prev = el.querySelector('.kd-prev'), next = el.querySelector('.kd-next'), dots = el.querySelector('.kd-dots');
    const askBox = el.querySelector('.kd-ask'), titleEl = el.querySelector('.kd-title span');
    let D, n, at, answered;
    const load = (i) => {
      const s = merged(spec, i);
      D = build(s); n = D.frames.length; at = 0; answered = new Set();
      if (!spec.title) titleEl.innerHTML = D.title;
      show();
    };
    const blocked = () => !!D.frames[at].ask && !answered.has(at);
    const show = () => {
      const f = D.frames[at];
      stage.innerHTML = f.html;
      out.innerHTML = f.result ? `<span class="${at === n - 1 ? 'is-new' : ''}">${f.result}</span>` : '';
      cap.innerHTML = f.ask && answered.has(at) && f.ask.ok ? f.ask.ok : f.caption;
      cap.classList.toggle('is-ask', blocked());
      prev.disabled = at === 0;
      next.textContent = at === 0 ? '▶ Xem từng bước' : at === n - 1 ? '↺ Xem lại' : 'Tiếp ▶';
      next.classList.toggle('is-wait', at === 0 || (!!f.ask && answered.has(at)));
      const ask = blocked();
      next.hidden = ask;
      askBox.hidden = !ask;
      askBox.innerHTML = ask ? f.ask.options.map((o, k) => `<button type="button" class="kd-opt" data-k="${k}">${o}</button>`).join('') : '';
      askBox.style.setProperty('--n', ask ? f.ask.options.length : 1);
      dots.innerHTML = D.frames.map((x, k) => `<i class="${k === at ? 'on' : k < at ? 'done' : ''}${x.ask ? ' q' : ''}"></i>`).join('');
    };
    askBox.onclick = (e) => {
      const b = e.target.closest('.kd-opt');
      if (!b) return;
      const f = D.frames[at];
      if (Number(b.dataset.k) === f.ask.answer) {
        sfx('correct');
        answered.add(at);
        show();
      } else {
        sfx('wrong');
        b.classList.remove('is-wrong'); void b.offsetWidth; b.classList.add('is-wrong');
        b.disabled = true;
        cap.innerHTML = `${f.caption}<br><span class="kd-again">Chưa đúng. Em nhìn lại hình rồi chọn lại.</span>`;
      }
    };
    const go = (d) => {
      if (d > 0 && blocked()) return;
      at = d > 0 && at === n - 1 ? 0 : Math.max(0, Math.min(n - 1, at + d));
      if (at === 0 && d > 0) answered = new Set();
      sfx('tap');
      show();
    };
    next.onclick = () => go(1);
    prev.onclick = () => go(-1);
    stage.onclick = () => { if (at < n - 1) go(1); };
    stage.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stage.onclick(); } };
    el.querySelectorAll('.kd-try').forEach((b) => {
      b.onclick = () => {
        el.querySelectorAll('.kd-try').forEach(x => x.classList.toggle('on', x === b));
        sfx('tap');
        load(Number(b.dataset.i));
      };
    });
    load(0);
    // trang thử scripts/knowledge-dev.html: nhảy tới bước k (coi như đã trả lời các câu hỏi trước đó)
    el.kdJump = (k, tryIdx) => {
      if (tryIdx != null && spec.tries) { el.querySelectorAll('.kd-try').forEach((x, i) => x.classList.toggle('on', i === tryIdx)); load(tryIdx); }
      at = Math.max(0, Math.min(n - 1, k < 0 ? n + k : k));
      for (let i = 0; i < at; i++) answered.add(i);
      show();
      return n;
    };
  });
}

let styles = false;
function injectStyles() {
  if (styles) return;
  styles = true;
  const st = document.createElement('style');
  st.textContent = `
    .kd { margin: 0.6rem 0 0.4rem; background: #fff; border: 2px solid #FDE68A; border-radius: 1rem; padding: 0.7rem 0.8rem; color: #1E293B; }
    .kd-title { font-weight: 800; color: #A16207; font-size: 1.05rem; }
    .kd-title .gw-frac { font-size: 0.85em; }
    .kd-tries { display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; margin-top: 0.4rem; font-size: 0.9rem; color: #78716C; font-weight: 700; }
    .kd-try { border: 2px solid #FCD34D; background: #FFFBEB; color: #92400E; border-radius: 999px; padding: 0.15rem 0.7rem; font: 800 0.95rem Quicksand, sans-serif; cursor: pointer; min-height: 2rem; }
    .kd-try.on { background: #F59E0B; border-color: #F59E0B; color: #fff; }
    .kd-try .gw-frac { font-size: 0.8em; }
    .kd-stage { container-type: inline-size; display: flex; justify-content: center; align-items: center; padding: 0.4rem 0 0.2rem; cursor: pointer; -webkit-tap-highlight-color: transparent; outline: none; }
    .kd-stage > * { max-width: 100%; }
    .kd-svg { display: block; width: 100%; height: auto; max-height: min(20rem, 55vh); overflow: visible; font-family: Quicksand, sans-serif; }
    .kd-svg text { paint-order: stroke; stroke: #fff; stroke-width: 3px; stroke-linejoin: round; }
    .kd-svg text.plain { stroke: none; }
    .kd-ghost { visibility: hidden; }
    .kd-stage .is-new { animation: kdDrop 0.5s cubic-bezier(.3,1.6,.5,1) both; }
    .kd-svg .is-new { animation: kdPop 0.55s cubic-bezier(.3,1.5,.5,1) both; transform-box: fill-box; transform-origin: center; }
    .kd-svg .is-grow { animation: kdGrow 0.7s ease-out both; transform-box: fill-box; transform-origin: left center; }
    .kd-svg .is-draw { stroke-dasharray: var(--len, 600); stroke-dashoffset: 0; animation: kdDraw 0.9s ease-out both; }
    .kd-svg .is-fade { animation: kdFade 0.6s ease-out both; }
    .kd-svg .is-move { animation: kdMove 1s ease-in-out both; }
    .kd-band.is-new { animation: kdBand 0.4s ease-out both; }
    ${BOARD_CSS}
    ${LINES_CSS}
    ${FRAC_CSS}
    ${DIAGRAM_CSS}
    ${GEO_CSS}
    .kd-result { min-height: 1.5em; text-align: center; font: 800 clamp(1.15rem, 4.6vw, 1.6rem)/1.4 Quicksand, sans-serif; color: #16A34A; }
    .kd-result > span { display: inline-block; background: #DCFCE7; border-radius: 0.6em; padding: 0 0.6em; }
    .kd-result .gw-frac { font-size: 0.8em; }
    .kd-cap { min-height: 4.6em; margin: 0.3rem 0 0.45rem; background: #F0F9FF; border-radius: 0.7rem; padding: 0.45rem 0.75rem; color: #0C4A6E; font-size: 1.05rem; line-height: 1.5; }
    .kd-cap.is-ask { background: #FFF7ED; color: #7C2D12; box-shadow: inset 0 0 0 2px #FDBA74; }
    .kd-cap b { color: #C2410C; }
    .kd-again { color: #DC2626; font-weight: 700; }
    .kd-nav { display: flex; align-items: center; gap: 0.6rem; }
    .kd-nav button { min-height: 2.8rem; border-radius: 999px; font: 800 1.05rem Quicksand, sans-serif; cursor: pointer; }
    .kd-prev { width: 3.2rem; flex: none; border: 2px solid #CBD5E1; background: #fff; color: #475569; box-shadow: 0 3px 0 #CBD5E1; }
    .kd-prev:disabled { opacity: 0.35; cursor: default; }
    .kd-next { flex: 1; border: none; background: linear-gradient(90deg, #F59E0B, #F97316); color: #fff; box-shadow: 0 4px 0 #C2410C; }
    .kd-next[hidden], .kd-ask[hidden] { display: none; }
    .kd-ask { flex: 1; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); gap: 0.45rem; }
    .kd-ask .kd-opt { border: 2px solid #93C5FD; background: #EFF6FF; color: #1E3A8A; box-shadow: 0 4px 0 #93C5FD; padding: 0.2rem 0.4rem; line-height: 1.15; font-size: clamp(0.9rem, 3.4vw, 1.15rem); }
    .kd-ask .kd-opt:disabled { opacity: 0.45; cursor: default; }
    .kd-ask .kd-opt.is-wrong { animation: kdShake 0.4s; border-color: #FCA5A5; background: #FEF2F2; color: #B91C1C; box-shadow: 0 4px 0 #FCA5A5; }
    .kd-ask .kd-opt .gw-frac { font-size: 0.85em; }
    .kd-nav button:active:not(:disabled) { transform: translateY(2px); box-shadow: none; }
    .kd-next.is-wait { animation: kdBreath 1.6s ease-in-out infinite; }
    .kd-dots { display: flex; flex-wrap: wrap; gap: 0.3rem; justify-content: center; margin-bottom: 0.45rem; }
    .kd-dots i { width: 0.5rem; height: 0.5rem; border-radius: 50%; background: #E2E8F0; }
    .kd-dots i.q { border-radius: 2px; transform: rotate(45deg); }
    .kd-dots i.done { background: #FCD34D; }
    .kd-dots i.on { background: #F97316; transform: scale(1.3); }
    .kd-dots i.q.on { transform: rotate(45deg) scale(1.3); }
    .kd-result .is-new { animation: kdDrop 0.5s cubic-bezier(.3,1.6,.5,1) both; }
    @keyframes kdBand { from { opacity: 0; transform: scaleY(0.4); } }
    @keyframes kdDrop { from { opacity: 0; transform: translateY(-0.6em) scale(1.4); } }
    @keyframes kdPop { from { opacity: 0; transform: scale(0.4); } }
    @keyframes kdGrow { from { transform: scaleX(0); } }
    @keyframes kdDraw { from { stroke-dashoffset: var(--len, 600); } }
    @keyframes kdFade { from { opacity: 0; } }
    @keyframes kdMove { from { transform: translate(var(--dx, 0), var(--dy, 0)) rotate(var(--rot, 0deg)); } }
    @keyframes kdBreath { 50% { transform: scale(1.04); } }
    @keyframes kdShake { 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
    @media (prefers-reduced-motion: reduce) {
      .kd-stage .is-new, .kd-svg .is-new, .kd-svg .is-grow, .kd-band.is-new, .kd-result .is-new { animation: kdFade 0.6s ease-out both; }
      .kd-svg .is-draw { animation: kdDraw 1.4s linear both; }
      .kd-svg .is-move { animation: kdMove 1.8s ease-in-out both; }
      .kd-next.is-wait { animation: none; }
    }
    @media (min-width: 720px) { .kd-cap { font-size: 1.15rem; } }
  `;
  document.head.appendChild(st);
}
