/**
 * Khung chung của Luyện Tính (lớp 3): cảnh lớp học, thầy giáo nhắc từng bước, tờ vở ô li ở giữa, bàn phím số to.
 * Mỗi công cụ (column.js, division.js…) là một "trò" của vòng chơi chung grade3Games/loop.js:
 * makeMission(rng, level, history) → đề, mountMission(stage, đề, level, api) → vẽ và chấm.
 *
 * Bố cục (không đổi trong một lượt): ngang = cột trái (thầy giáo + bàn phím) | tờ vở; dọc = thầy giáo / tờ vở / bàn phím.
 * Bàn phím luôn giữ chỗ từ đầu lượt (mờ khi chưa cần gõ). Thẻ kết quả của loop.js đè lên cột trái (ngang) hoặc
 * vùng bàn phím (dọc), không đẩy gì.
 */

import { LAB_NPCS, npcPic, cap } from '../grade3Games/npc.js';
import { injectGameStyles } from '../grade3Games/styles.js';
import { flyOne, calmMotion } from '../grade3Games/fly.js';
import { sfx } from '../preschool/fx.js';
import { scopedKey } from '../../engine/auth.js';

export { cap, flyOne, calmMotion, sfx };

export const INK = '#3F3A40';
export const MINUS = '−';
export const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/** Thầy giáo nhắc bài (cùng hình Thầy Quang của phòng thí nghiệm: cầm sách, quả táo). */
export const TEACHER = { ...LAB_NPCS.find(n => n.id === 'giaosu'), id: 'thay-giao', name: 'Thầy Quang', me: 'thầy', you: 'em' };

/** 4523 → "4 523", 12 → "12" (sách lớp 3 tách lớp nghìn bằng dấu cách). */
export function fmt(n) {
  const s = String(n);
  return s.length <= 3 ? s : s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/** Tên hàng theo vị trí từ phải sang (0 = đơn vị). */
export const PLACE = ['Hàng đơn vị', 'Hàng chục', 'Hàng trăm', 'Hàng nghìn', 'Hàng chục nghìn', 'Hàng trăm nghìn'];

/** Chọn ngẫu nhiên có trọng số: items[i] được chọn với xác suất ∝ w(items[i]). */
export function weightedPick(rng, items, w) {
  const ws = items.map(w);
  let t = rng() * ws.reduce((s, x) => s + x, 0);
  for (let i = 0; i < items.length; i++) { t -= ws[i]; if (t <= 0) return items[i]; }
  return items[items.length - 1];
}

/** Sinh đề không trùng đề nào trong cả ván (history) — thử tối đa 60 lần. */
export function fresh(history, make, keyOf) {
  const seen = new Set(history.map(h => h?.key).filter(Boolean));
  let m;
  for (let k = 0; k < 60; k++) { m = make(); if (!seen.has(keyOf(m))) break; }
  return { ...m, key: keyOf(m) };
}

// ── Sổ phép tính hay sai (bảng nhân chia, tính nhẩm): ra lại nhiều hơn ở các lượt sau ─────────────────
const WEAK_KEY = 'g3drill-weak-v1';
export function loadWeak() {
  try { return JSON.parse(localStorage.getItem(scopedKey(WEAK_KEY))) || {}; } catch { return {}; }
}
export function noteFact(id, ok) {
  const d = loadWeak();
  const v = (d[id] || 0) + (ok ? -1 : 2);
  if (v > 0) d[id] = Math.min(v, 8); else delete d[id];
  try { localStorage.setItem(scopedKey(WEAK_KEY), JSON.stringify(d)); } catch { /* storage unavailable */ }
  window.dispatchEvent(new CustomEvent('tth:data-changed')); // → cloudSync.js
}

// ── Cảnh lớp học (SVG riêng, nét mực dày, màu tươi) ────────────────────────────────────────────────
const ST = `stroke="${INK}" stroke-width="4" stroke-linejoin="round"`;
const windowPic = (x) => `<g transform="translate(${x} 150)">
  <rect x="0" y="0" width="190" height="230" rx="8" fill="#7DD3FC" ${ST}/>
  <path d="M0 175 Q50 140 95 160 Q140 135 190 165 V230 H0 Z" fill="#86EFAC"/>
  <circle cx="140" cy="52" r="22" fill="#FDE047" stroke="${INK}" stroke-width="3"/>
  <g fill="#fff"><ellipse cx="55" cy="60" rx="30" ry="13"/><ellipse cx="72" cy="50" rx="20" ry="13"/></g>
  <rect x="38" y="120" width="12" height="60" fill="#92400E" stroke="${INK}" stroke-width="3"/>
  <circle cx="44" cy="110" r="32" fill="#22C55E" stroke="${INK}" stroke-width="3"/>
  <path d="M95 0 V230 M0 115 H190" stroke="${INK}" stroke-width="7"/><path d="M95 0 V230 M0 115 H190" stroke="#fff" stroke-width="3"/>
  <rect x="-10" y="226" width="210" height="16" rx="4" fill="#F5F5F4" ${ST}/></g>`;
const flag = (x, y, c, t) => `<g transform="translate(${x} ${y})"><path d="M-26 0 H26 L0 44 Z" fill="${c}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <text x="0" y="24" text-anchor="middle" font-size="24" font-weight="900" fill="#fff" stroke="${INK}" stroke-width="1.2" font-family="'Baloo 2', sans-serif">${t}</text></g>`;
const books = (x, y) => ['#EF4444', '#3B82F6', '#22C55E', '#F59E0B', '#A855F7', '#EC4899'].map((c, i) =>
  `<rect x="${x + i * 22}" y="${y - 70 + (i % 3) * 8}" width="20" height="${70 - (i % 3) * 8}" rx="3" fill="${c}" stroke="${INK}" stroke-width="2.5"/>`).join('');
export const CLASSROOM = `<svg class="g3d-backdrop" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <rect width="1600" height="900" fill="#FEF3C7"/>
  <rect y="0" width="1600" height="40" fill="#FDE68A"/>
  <path d="M0 40 Q200 95 400 40 Q600 95 800 40 Q1000 95 1200 40 Q1400 95 1600 40" stroke="${INK}" stroke-width="3" fill="none"/>
  ${[['#EF4444', '1'], ['#3B82F6', '+'], ['#22C55E', '2'], ['#F59E0B', '×'], ['#A855F7', '3'], ['#EC4899', '−'], ['#0EA5E9', '4'], ['#EF4444', ':'], ['#22C55E', '5']]
    .map(([c, t], i) => { const x = 100 + i * 175; const y = 40 + Math.abs(Math.sin(((x % 400) / 400) * Math.PI)) * 50; return flag(x, y, c, t); }).join('')}
  ${windowPic(70)}${windowPic(1340)}
  <g transform="translate(800 120)"><circle r="44" fill="#fff" ${ST}/><path d="M0 0 V-28 M0 0 L20 10" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><circle r="4" fill="${INK}"/></g>
  <rect x="0" y="700" width="1600" height="200" fill="#D6A15B"/>
  <path d="M0 700 H1600" stroke="${INK}" stroke-width="5"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 200} 700 L${i * 200 - 80} 900" stroke="#B7803F" stroke-width="4"/>`).join('')}
  <rect x="60" y="560" width="200" height="140" rx="6" fill="#B45309" ${ST}/><path d="M60 630 H260" stroke="${INK}" stroke-width="4"/>
  ${books(72, 626)}${books(72, 696)}
  <g transform="translate(1450 700)"><path d="M-40 0 L-30 -70 H30 L40 0 Z" fill="#F97316" ${ST}/>
    <path d="M0 -70 Q-60 -150 -20 -190 M0 -70 Q10 -170 50 -200 M0 -70 Q50 -120 80 -140" stroke="#16A34A" stroke-width="10" fill="none" stroke-linecap="round"/>
    <circle cx="-20" cy="-190" r="20" fill="#22C55E" stroke="${INK}" stroke-width="3"/><circle cx="50" cy="-200" r="22" fill="#22C55E" stroke="${INK}" stroke-width="3"/><circle cx="80" cy="-140" r="18" fill="#22C55E" stroke="${INK}" stroke-width="3"/></g>
</svg>`;

// ── Bàn phím số ────────────────────────────────────────────────────────────────────────────────────
// Phím to chia đều vùng bàn phím. Gõ bằng bàn phím máy tính cũng được (số, Backspace, Enter).
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'ok'];
function keypadHtml() {
  return `<div class="g3d-keys g3d-keys-off">${KEYS.map(k => k === 'del'
    ? '<button type="button" class="g3d-key g3d-key-del" data-k="del" aria-label="Xoá">⌫</button>'
    : k === 'ok' ? '<button type="button" class="g3d-key g3d-key-ok" data-k="ok">OK</button>'
      : `<button type="button" class="g3d-key" data-k="${k}">${k}</button>`).join('')}</div>`;
}

/**
 * Vẽ cảnh vào `stage`. board: HTML tờ vở. Trả về
 *   { scene, paper, say(text, shown?, mood?), show(shown), hint(text, shown?), pad, done(mistakes, { ok, tip }) }.
 * pad.want({ max, auto, onType(s), onSubmit(s) }) — auto: đủ `max` chữ số là tự nộp (ô một chữ số trong phép tính
 * dọc); không auto thì bấm OK. pad.off() — bàn phím nghỉ.
 */
export function mountDrill(stage, { api, board, cls = '' }) {
  injectGameStyles();
  injectDrillStyles();
  stage.innerHTML = `
    <div class="g3d-scene ${cls} animate-fadeIn" data-result-host>
      ${CLASSROOM}
      <div class="g3d-teach">
        <div class="g3d-npc">${npcPic(TEACHER, 'wait')}</div>
        <div class="g3d-bubble"><span class="g3d-name">${TEACHER.name}</span><span class="g3d-say">&nbsp;</span></div>
      </div>
      <div class="g3d-padzone">${keypadHtml()}</div>
      <div class="g3d-board"><div class="g3d-paper">${board}</div></div>
    </div>`;
  const scene = stage.querySelector('.g3d-scene');
  const sayBox = scene.querySelector('.g3d-say');
  const bubble = scene.querySelector('.g3d-bubble');
  const npcBox = scene.querySelector('.g3d-npc');
  const keys = scene.querySelector('.g3d-keys');
  const okKey = keys.querySelector('[data-k="ok"]');

  const say = (text, shown, mood) => {
    sayBox.innerHTML = shown || text;
    bubble.classList.remove('g3d-bubble-hint');
    if (mood) npcBox.innerHTML = npcPic(TEACHER, mood);
    api.say(text.replace(/<[^>]*>/g, ''));
  };
  /** Chỉ đổi chữ trong bong bóng, không đọc (câu nhắc từng bước: đọc mỗi chữ số thì quá nhiều). */
  const show = (shown) => {
    sayBox.innerHTML = shown;
    bubble.classList.remove('g3d-bubble-hint');
  };
  /** Thầy nhắc cách làm sau một lần sai (bong bóng đổi màu, nhắc bằng giọng). */
  const hint = (text, shown) => {
    say(text, `💡 ${shown || text}`);
    bubble.classList.add('g3d-bubble-hint');
  };

  // Bàn phím
  let cur = null;
  let typed = '';
  const pad = {
    want(opts) {
      cur = { max: 1, auto: false, ...opts };
      typed = '';
      keys.classList.remove('g3d-keys-off');
      okKey.hidden = !!cur.auto;
      okKey.disabled = true;
    },
    off() { cur = null; keys.classList.add('g3d-keys-off'); },
    clear() { typed = ''; cur?.onType?.(typed); okKey.disabled = true; },
    /** Gõ cả chuỗi (DEV: tự giải để chụp màn hình — window.__g3drill.step()). */
    type(str) { for (const ch of String(str)) press(ch); if (cur && !cur.auto) press('ok'); },
  };
  const press = (k) => {
    if (!cur) return;
    if (k === 'del') typed = typed.slice(0, -1);
    else if (k === 'ok') { if (!typed) return; const s = typed; sfx.tap(); cur.onSubmit(s); return; }
    else if (typed.length < cur.max) typed = typed === '0' && !cur.auto ? k : typed + k;
    else return;
    sfx.tap();
    cur.onType?.(typed);
    okKey.disabled = !typed;
    if (cur.auto && typed.length >= cur.max) { const s = typed; typed = ''; cur.onSubmit(s); }
  };
  keys.addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (b && !b.disabled) press(b.dataset.k); });
  const onKey = (e) => {
    if (!scene.isConnected) { document.removeEventListener('keydown', onKey); return; }
    if (scene.closest('.g3g-has-result')) return;
    if (/^[0-9]$/.test(e.key)) press(e.key);
    else if (e.key === 'Backspace') press('del');
    else if (e.key === 'Enter') press('ok');
    else return;
    e.preventDefault();
  };
  document.addEventListener('keydown', onKey);

  /** Kết thúc lượt: đúng hết các bước → khen; có bước phải sửa → nhắc lại cách làm. */
  const done = (mistakes, { ok = 'Em làm đúng hết các bước!', tip = '' } = {}) => {
    pad.off();
    if (!mistakes) {
      say(`Giỏi quá! ${ok}`, `Giỏi quá! ${ok}`, 'happy');
      api.succeed(ok);
    } else {
      say(`Em đã sửa ${mistakes} bước. Lần sau cố đúng ngay từ đầu!`, `Em đã sửa ${mistakes} bước.`, 'wait');
      api.fail(`Xong rồi, nhưng em đã phải sửa <b>${mistakes} bước</b>.`, tip);
    }
  };

  return { scene, paper: scene.querySelector('.g3d-paper'), say, show, hint, pad, done };
}

/** Ô vừa gõ sai: rung đỏ một nhịp. */
export function shake(els) {
  sfx.boing();
  for (const el of [].concat(els)) {
    el.classList.remove('g3d-bad');
    void el.offsetWidth;
    el.classList.add('g3d-bad');
    setTimeout(() => el.classList.remove('g3d-bad'), 650);
  }
}

/** Đặt / bỏ đánh dấu "ô đang chờ gõ" (nhấp nháy). */
export function setActive(root, els) {
  root.querySelectorAll('.g3d-on').forEach(el => el.classList.remove('g3d-on'));
  for (const el of [].concat(els || [])) el.classList.add('g3d-on');
}

/** Bay một chữ số từ ô `from` tới ô `to` (vd. chữ số nhớ, chữ số hạ xuống). */
export function flyDigit(text, from, to, opts = {}) {
  const a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
  const fs = Math.round(a.height * 0.8);
  return flyOne(`<div class="g3d-flyd" style="font-size:${fs}px">${text}</div>`, a, b, { minMs: 420, maxMs: 700, ...opts });
}

// ── Màn giới thiệu (hub grade3Games.js): cách chơi dạng dãy hình ─────────────────────────────────────
export const how = (...steps) => () => steps.map(([pic, label]) => ({ pic, label }));

let stylesDone = false;
export function injectDrillStyles() {
  if (stylesDone || document.getElementById('g3d-styles')) return;
  stylesDone = true;
  const style = document.createElement('style');
  style.id = 'g3d-styles';
  style.textContent = `
    .g3d-scene { position: relative; box-sizing: border-box; display: grid; overflow: hidden; border-radius: 1.4rem; background: #FEF3C7;
      grid-template-columns: clamp(240px, 29%, 420px) minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr);
      grid-template-areas: "teach board" "pad board"; gap: 0.7rem; padding: 0.7rem; box-shadow: 0 6px 0 #FCD34D, 0 10px 24px rgba(180,83,9,0.12); }
    .g3d-backdrop { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
    .g3d-scene > :not(.g3d-backdrop) { position: relative; z-index: 1; min-width: 0; min-height: 0; }
    .g3d-teach { grid-area: teach; display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); align-items: end; gap: 0.4rem; }
    .g3d-npc { height: clamp(110px, 24vh, 250px); display: flex; justify-content: center; align-items: flex-end; }
    .g3d-npc .g3-npc-img { height: 100%; width: auto; max-width: 100%; object-fit: contain; filter: drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff); }
    .g3d-bubble { align-self: center; position: relative; background: #fff; border: 3px solid ${INK}; border-radius: 1rem; padding: 0.45rem 0.65rem; font-weight: 700; color: #1E293B; line-height: 1.35;
      font-size: clamp(0.95rem, 1.3vh + 0.55rem, 1.35rem); min-height: 4.2em; display: flex; flex-direction: column; justify-content: center; box-shadow: 0 4px 0 rgba(63,58,64,0.25); }
    .g3d-bubble::before { content: ''; position: absolute; left: -14px; bottom: 1.2rem; border: 8px solid transparent; border-right: 12px solid ${INK}; border-left: 0; }
    .g3d-bubble::after { content: ''; position: absolute; left: -9px; bottom: calc(1.2rem + 2px); border: 6px solid transparent; border-right: 9px solid #fff; border-left: 0; }
    .g3d-bubble-hint { background: #FFFBEB; border-color: #D97706; }
    .g3d-bubble-hint::after { border-right-color: #FFFBEB; }
    .g3d-name { font-size: 0.72em; color: #BE185D; font-weight: 800; }
    .g3d-say b { color: #C2410C; }

    .g3d-padzone { grid-area: pad; container-type: size; }
    .g3d-keys { height: 100%; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: repeat(4, minmax(0, 1fr)); gap: min(2.4cqh, 3cqi);
      background: #334155; border-radius: 1.1rem; padding: min(2.4cqh, 3cqi); box-sizing: border-box; border: 3px solid ${INK}; transition: opacity .25s, filter .25s; }
    @container (aspect-ratio > 1.7) {
      .g3d-keys { grid-template-columns: repeat(6, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); }
    }
    .g3d-key { border: none; border-radius: 0.7rem; background: #F8FAFC; color: #1E293B; font-weight: 800; font-family: inherit; cursor: pointer; touch-action: manipulation;
      font-size: min(11cqh, 12cqi, 3rem); box-shadow: 0 4px 0 #94A3B8; min-height: 0; padding: 0; }
    @container (aspect-ratio > 1.7) { .g3d-key { font-size: min(26cqh, 6.5cqi, 3rem); } }
    .g3d-key:active { transform: translateY(3px); box-shadow: 0 1px 0 #94A3B8; }
    .g3d-key-del { background: #FEE2E2; color: #B91C1C; box-shadow: 0 4px 0 #FCA5A5; }
    .g3d-key-ok { background: #22C55E; color: #fff; box-shadow: 0 4px 0 #15803D; }
    .g3d-key-ok[hidden] { display: block; visibility: hidden; }
    .g3d-key:disabled { opacity: 0.45; cursor: default; }
    .g3d-keys-off { pointer-events: none; }
    .g3d-keys-off .g3d-key { background: #CBD5E1; color: #94A3B8; box-shadow: 0 4px 0 #64748B; }
    .g3g-has-result .g3d-keys { visibility: hidden; }

    .g3d-board { grid-area: board; display: flex; }
    .g3d-paper { flex: 1; min-width: 0; min-height: 0; position: relative; background: #fff; border: 3px solid ${INK}; border-radius: 1rem; box-shadow: 0 6px 0 rgba(63,58,64,0.2);
      container-type: size; display: flex; flex-direction: column; overflow: hidden; }
    .g3d-paper::before { content: ''; position: absolute; top: 0; bottom: 0; left: clamp(1.4rem, 4cqi, 3rem); border-left: 2px solid #FCA5A5; pointer-events: none; }

    /* Dòng đề trên đầu tờ vở: "Đặt tính rồi tính: 457 + 368 = ?" */
    .g3c-head { flex: none; padding: 1.2cqh 2cqi 0 calc(clamp(1.4rem, 4cqi, 3rem) + 1.2cqi); font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #334155; font-size: min(6.5cqh, 4.2cqi, 2.6rem); line-height: 1.3; }
    .g3c-head span { font-weight: 600; color: #64748B; }
    .g3c-expr { color: #1E293B; }
    .g3c-eq { color: #94A3B8; }
    .g3c-eq-done { color: #15803D; }
    .g3c-ans { display: inline-block; min-width: 3ch; }

    /* Ô chữ số trên vở: ô li xanh nhạt, chữ "mực" */
    .g3d-grid { margin: auto; display: grid; position: relative; font-family: 'Baloo 2', 'Quicksand', sans-serif; font-weight: 700; color: #1E293B; line-height: 1;
      background-image: linear-gradient(#DBEAFE 1.5px, transparent 1.5px), linear-gradient(90deg, #DBEAFE 1.5px, transparent 1.5px); background-size: var(--cell) var(--cell); }
    .g3d-c { width: var(--cell); height: var(--cell); display: grid; place-items: center; font-size: calc(var(--cell) * 0.78); position: relative; box-sizing: border-box; }
    .g3d-in { color: #1D4ED8; }
    .g3d-on { background: #FEF08A; border-radius: 0.25em; box-shadow: inset 0 0 0 3px #F59E0B; animation: g3dBlink 1.1s ease-in-out infinite; }
    @keyframes g3dBlink { 50% { box-shadow: inset 0 0 0 3px #FDE68A; background: #FEF9C3; } }
    .g3d-bad { animation: g3dShake .4s ease; background: #FECACA !important; }
    @keyframes g3dShake { 20%, 60% { transform: translateX(-6px); } 40%, 80% { transform: translateX(6px); } }
    .g3d-ok-flash { animation: g3dOk .7s ease; }
    @keyframes g3dOk { 40% { background: #BBF7D0; transform: scale(1.06); } }
    @media (prefers-reduced-motion: reduce) {
      .g3d-on { animation: none; }
      .g3d-bad { animation: none; }
      .g3d-ok-flash { animation: g3dOkCalm .7s ease; }
      @keyframes g3dOkCalm { 40% { background: #BBF7D0; } }
    }
    .g3d-flyd { width: 100%; height: 100%; display: grid; place-items: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #DC2626; line-height: 1; }

    /* Thẻ kết quả: đè lên cột thầy giáo + bàn phím (ngang) / vùng bàn phím (dọc) */
    .g3d-scene > .g3g-result { position: absolute; z-index: 5; left: 0.7rem; top: 0.7rem; bottom: 0.7rem; width: clamp(240px, 29%, 420px); overflow-y: auto; justify-content: center; text-align: center;
      border-width: 3px; border-radius: 1.3rem; box-shadow: 0 6px 0 rgba(0,0,0,0.1), 0 16px 36px rgba(0,0,0,0.25);
      transform-origin: 50% 100%; animation: g3dCard .35s cubic-bezier(.2,1.4,.4,1); }
    /* Hiệu ứng riêng: g3fPop của Chợ phiên có translateX(-50%) cho thẻ căn giữa bằng left: 50% — thẻ ở đây đặt theo
       left / right nên dùng g3fPop sẽ lệch nửa thẻ rồi giật về chỗ. */
    @keyframes g3dCard { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: none; } }
    @media (prefers-reduced-motion: reduce) { .g3d-scene > .g3g-result { animation: g3dCardCalm .3s ease; } @keyframes g3dCardCalm { from { opacity: 0; } } }
    .g3d-scene > .g3g-result .g3g-result-text { font-size: clamp(1rem, 1.8vh + 0.55rem, 1.45rem); }
    .g3d-scene > .g3g-result .g3g-tip { font-size: clamp(0.95rem, 1.4vh + 0.5rem, 1.25rem); text-align: left; }
    .g3d-scene > .g3g-result .g3g-btn { font-size: clamp(1rem, 1.6vh + 0.6rem, 1.3rem); white-space: normal; }

    @media (orientation: portrait) {
      .g3d-scene { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr) clamp(140px, 23%, 270px); grid-template-areas: "teach" "board" "pad"; }
      .g3d-teach { grid-template-columns: auto minmax(0, 1fr); }
      .g3d-npc { height: clamp(90px, 13vh, 180px); }
      .g3d-scene > .g3g-result { left: 0.7rem; right: 0.7rem; top: auto; bottom: 0.7rem; width: auto; max-height: 48%; }
    }
    @media (orientation: landscape) and (max-height: 500px) {
      .g3d-scene { gap: 0.4rem; padding: 0.4rem; grid-template-columns: clamp(220px, 32%, 320px) minmax(0, 1fr); }
      .g3d-npc { height: 70px; }
      .g3d-bubble { font-size: 0.85rem; min-height: 3.6em; padding: 0.3rem 0.5rem; }
      .g3d-scene > .g3g-result { left: 0.4rem; top: 0.4rem; bottom: 0.4rem; width: clamp(220px, 32%, 320px); padding: 0.5rem; }
    }

    /* Nút chọn to trên tờ vở (tên thành phần, dấu phép tính, phép tính của bài toán) */
    .g3d-choice { flex: 1 1 0; min-width: 0; padding: 0.2em 0.4em; background: #fff; color: #1E3A8A; border: 3px solid #93C5FD; box-shadow: 0 6px 0 #60A5FA; border-radius: 0.6em; font-family: 'Baloo 2', sans-serif; }
    .g3d-choice:active { box-shadow: 0 2px 0 #60A5FA; }
    .g3d-choice:disabled { opacity: 1; color: #94A3B8; border-color: #E2E8F0; box-shadow: 0 6px 0 #CBD5E1; cursor: default; }
    .g3d-choice-ok, .g3d-choice-ok:disabled { background: #DCFCE7; border-color: #22C55E; box-shadow: 0 6px 0 #16A34A; color: #166534; }

    /* Hàng phép tính (bảng nhân chia, tính nhẩm): mỗi phép một dòng to chia đều tờ vở */
    .g3d-rows { flex: 1; display: flex; flex-direction: column; padding: 2cqh 3cqi 2cqh calc(clamp(1.4rem, 4cqi, 3rem) + 2cqi); gap: 1.6cqh; min-height: 0; }
    .g3d-row { flex: 1 1 0; min-height: 0; display: flex; align-items: center; gap: 0.25em; border-bottom: 2px dashed #BFDBFE; font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B;
      font-size: min(var(--rowfs, 15cqh), 9cqi); line-height: 1; white-space: nowrap; position: relative; }
    .g3d-row:last-child { border-bottom: none; }
    .g3d-box { display: inline-flex; align-items: center; justify-content: center; min-width: var(--boxw, 2.2em); height: 1.2em; padding: 0 0.15em; border: 3px dashed #93C5FD; border-radius: 0.2em; color: #1D4ED8; box-sizing: border-box; }
    .g3d-box.g3d-on { border-style: solid; border-color: #F59E0B; }
    .g3d-box-ok { border: 3px solid #86EFAC; background: #F0FDF4; }
    .g3d-box-fix { border: 3px solid #FCA5A5; background: #FEF2F2; color: #B91C1C; }
    .g3d-mark { font-size: 0.7em; margin-left: 0.2em; min-width: 1.2em; }
    .g3d-row-hint { position: absolute; right: 0; bottom: 0.1em; font-size: 0.36em; color: #B45309; font-weight: 700; background: #FFFBEB; border-radius: 0.4em; padding: 0.1em 0.4em; }
  `;
  document.head.appendChild(style);
}
