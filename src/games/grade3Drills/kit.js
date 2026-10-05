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
export const PLACE = ['Hàng đơn vị', 'Hàng chục', 'Hàng trăm', 'Hàng nghìn', 'Hàng chục nghìn', 'Hàng trăm nghìn', 'Hàng triệu', 'Hàng chục triệu'];

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
// comma: thêm phím dấu phẩy (số thập phân, lớp 5): 1–9 / , 0 ⌫ / OK.
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'ok'];
const KEYS_COMMA = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'del', 'ok'];
function keypadHtml(comma) {
  return `<div class="g3d-keys g3d-keys-off${comma ? ' g3d-keys-comma' : ''}">${(comma ? KEYS_COMMA : KEYS).map(k => k === 'del'
    ? '<button type="button" class="g3d-key g3d-key-del" data-k="del" aria-label="Xoá">⌫</button>'
    : k === 'ok' ? '<button type="button" class="g3d-key g3d-key-ok" data-k="ok">OK</button>'
      : `<button type="button" class="g3d-key${k === ',' ? ' g3d-key-comma' : ''}" data-k="${k}"${k === ',' ? ' aria-label="Dấu phẩy"' : ''}>${k}</button>`).join('')}</div>`;
}

/**
 * Vẽ cảnh vào `stage`. board: HTML tờ vở. Trả về
 *   { scene, paper, say(text, shown?, mood?), show(shown), hint(text, shown?), pad, done(mistakes, { ok, tip }) }.
 * pad.want({ max, auto, onType(s), onSubmit(s) }) — auto: đủ `max` chữ số là tự nộp (ô một chữ số trong phép tính
 * dọc); không auto thì bấm OK. pad.off() — bàn phím nghỉ.
 */
export function mountDrill(stage, { api, board, cls = '', comma = false }) {
  injectGameStyles();
  injectDrillStyles();
  stage.innerHTML = `
    <div class="g3d-scene ${cls} animate-fadeIn" data-result-host>
      ${CLASSROOM}
      <div class="g3d-teach">
        <div class="g3d-npc">${npcPic(TEACHER, 'wait')}</div>
        <div class="g3d-bubble"><span class="g3d-name">${TEACHER.name}</span><span class="g3d-say">&nbsp;</span></div>
      </div>
      <div class="g3d-padzone">${keypadHtml(comma)}</div>
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
    else if (k === ',') { if (!comma || typed.includes(',') || typed.length >= cur.max) return; typed = (typed || '0') + ','; }
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
    else if (e.key === ',' || e.key === '.') press(',');
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

/** Đánh dấu các chữ số đang dùng ở bước này (khung cam, không nhấp nháy); [] / null = bỏ hết. */
export function setUse(root, els) {
  root.querySelectorAll('.g3d-use').forEach(el => el.classList.remove('g3d-use'));
  for (const el of [].concat(els || []).filter(Boolean)) el.classList.add('g3d-use');
}

/**
 * Mũi tên đỏ trên tờ vở chỉ "số nào với số nào" (vd. 9 × 3: từ chữ số 9 của thừa số thứ hai tới chữ số 3).
 * Lớp SVG phủ lên lưới `grid`, vẽ lại theo cỡ ô khi lưới đổi cỡ (xoay máy). draw([{ from, to, bend }]):
 * from / to là một ô hoặc mảng ô (mũi tên nối hai khối ô); bend 1 = cong xuống / men bên phải, -1 = cong lên / men bên trái.
 */
export function arrowLayer(grid) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'g3d-arrows');
  svg.setAttribute('aria-hidden', 'true');
  grid.appendChild(svg);
  let list = [];
  const box = (els, g) => {
    const rs = [].concat(els).filter(Boolean).map(e => e.getBoundingClientRect());
    const l = Math.min(...rs.map(r => r.left)), t = Math.min(...rs.map(r => r.top));
    const r = Math.max(...rs.map(x => x.right)), b = Math.max(...rs.map(x => x.bottom));
    return { x: (l + r) / 2 - g.left, y: (t + b) / 2 - g.top, hw: (r - l) / 2, hh: (b - t) / 2 };
  };
  const arrow = ({ from, to, bend = 1 }, g, cell) => {
    const A = box(from, g), B = box(to, g);
    // Nửa bề ngang, nửa chiều cao của chữ số (nhỏ hơn ô): mũi tên bắt đầu, kết thúc sát chữ số, không đè lên.
    const gx = (R) => Math.max(R.hw - cell * 0.3, cell * 0.12), gy = (R) => Math.max(R.hh - cell * 0.2, cell * 0.12);
    const gap = cell * 0.12, s = bend < 0 ? -1 : 1;
    const overX = Math.abs(B.x - A.x) < A.hw + B.hw - 2, overY = Math.abs(B.y - A.y) < A.hh + B.hh - 2;
    let x1, y1, x2, y2, px, py, k;
    if (overX && !overY) { // trên dưới cùng cột: đi men bên cạnh chữ số (phải, hoặc trái khi bend < 0)
      [x1, y1, x2, y2] = [A.x + s * (gx(A) + gap), A.y, B.x + s * (gx(B) + gap), B.y];
      [px, py, k] = [s, 0, cell * 0.4];
    } else if (overY && !overX) { // cùng hàng: vòng phía dưới (hoặc phía trên khi bend < 0)
      [x1, y1, x2, y2] = [A.x, A.y + s * (gy(A) + gap), B.x, B.y + s * (gy(B) + gap)];
      [px, py, k] = [0, s, Math.max(cell * 0.4, Math.min(Math.abs(B.x - A.x) * 0.15, cell))];
    } else { // chéo: theo đường nối hai chữ số, cong nhẹ
      const len = Math.hypot(B.x - A.x, B.y - A.y) || 1;
      const ux = (B.x - A.x) / len, uy = (B.y - A.y) / len;
      const t = (R) => Math.min(gx(R) / Math.max(Math.abs(ux), 1e-6), gy(R) / Math.max(Math.abs(uy), 1e-6)) + gap;
      [x1, y1, x2, y2] = [A.x + ux * t(A), A.y + uy * t(A), B.x - ux * t(B), B.y - uy * t(B)];
      [px, py] = [-uy, ux];
      if (py < 0 || (py === 0 && px < 0)) { px = -px; py = -py; }
      k = s * Math.min(Math.hypot(x2 - x1, y2 - y1) * 0.25, cell * 0.6);
    }
    const cx = (x1 + x2) / 2 + px * k, cy = (y1 + y2) / 2 + py * k;
    const tl = Math.hypot(x2 - cx, y2 - cy) || 1, tx = (x2 - cx) / tl, ty = (y2 - cy) / tl;
    const h = cell * 0.22, w = cell * 0.13;
    const head = `${x2},${y2} ${x2 - tx * h - ty * w},${y2 - ty * h + tx * w} ${x2 - tx * h + ty * w},${y2 - ty * h - tx * w}`;
    return `<path d="M${x1} ${y1} Q${cx} ${cy} ${x2 - tx * h * 0.6} ${y2 - ty * h * 0.6}" pathLength="1" style="stroke-width:${Math.max(2.5, cell * 0.06)}px"/><polygon points="${head}"/>`;
  };
  const render = (anim) => {
    const g = grid.getBoundingClientRect();
    if (!list.length || !g.width) { svg.innerHTML = ''; return; }
    const cell = grid.querySelector('.g3d-c')?.offsetWidth || 40;
    svg.setAttribute('viewBox', `0 0 ${g.width} ${g.height}`);
    svg.classList.toggle('g3d-arrows-in', !!anim); // vẽ dần khi mới chỉ; vẽ lại vì đổi cỡ thì hiện ngay
    svg.innerHTML = list.map(a => arrow(a, g, cell)).join('');
  };
  const ro = new ResizeObserver(() => { if (!grid.isConnected) ro.disconnect(); else render(false); });
  ro.observe(grid);
  return {
    draw(items) { list = items.filter(a => a.from && a.to); render(true); },
    clear() { list = []; svg.innerHTML = ''; },
  };
}

/** Hiện một ô đang trống bằng một nhịp "viết ra" (dấu +, dấu × chưa có chỗ bay từ đề xuống). */
export function popIn(el, text) {
  el.textContent = text;
  el.classList.remove('g3d-popin');
  void el.offsetWidth;
  el.classList.add('g3d-popin');
  sfx.pop(3);
}

// ── Kẻ vạch bằng thước (đặt tính) ─────────────────────────────────────────────────────────────────────
const PENCIL = `<svg viewBox="0 0 44 44" aria-hidden="true"><g stroke="${INK}" stroke-width="2.5" stroke-linejoin="round">
  <path d="M3 41 L8 29 L33 4 L40 11 L15 36 Z" fill="#FACC15"/><path d="M3 41 L8 29 L15 36 Z" fill="#FDE7C3"/>
  <path d="M3 41 L5.5 35 L9 38.5 Z" fill="${INK}"/><path d="M33 4 L40 11 L43 8 Q44 5 41 2 Q38 1 36 1 Z" fill="#F472B6"/>
  <path d="M10.5 31.5 L35.5 6.5" fill="none" stroke-width="1.5"/></g></svg>`;
const ruleTold = { h: false, v: false }; // thầy đọc to cách kẻ lần đầu (mỗi kiểu vạch), sau đó chỉ hiện chữ

/**
 * Em tự kẻ vạch bằng thước: thước trượt vào nằm sát chỗ kẻ, bút chờ ở đầu vạch (bút mờ chạy mẫu); em đặt bút ở đầu
 * vạch rồi kéo theo thước, nét kẻ chạy theo bút. Kẻ đủ thì thước cất đi. Thước và bút đè lên chỗ đang trống, không đẩy gì.
 * spec:
 *   số `row`                          vạch ngang dưới hàng data-r = row, suốt mọi cột (đặt tính cột);
 *   { row, cols }                     vạch ngang dưới hàng lưới `row` (1-based), cols = "đầu / cuối" (đường kẻ lưới);
 *   { vertical: true, col, rows }     vạch dọc mép trái cột lưới `col`, rows = "đầu / cuối"; kẻ từ trên xuống, thước bên phải.
 *   cls: lớp thêm cho vạch kẻ (vd. nét mảnh).
 * Trả về { done: Promise, finish() } (finish: DEV tự kẻ để chụp màn hình).
 */
export function traceRule(grid, spec, { say, show, hint }) {
  const sp = typeof spec === 'number' ? { row: spec + 1, cols: '1 / -1' } : spec;
  const vert = !!sp.vertical;
  const area = vert ? `grid-row:${sp.rows};grid-column:${sp.col} / span 1` : `grid-row:${sp.row} / span 1;grid-column:${sp.cols}`;
  const v = vert ? ' g3d-v' : '';
  grid.insertAdjacentHTML('beforeend', `
    <div class="g3d-rule${v}${sp.cls ? ` ${sp.cls}` : ''}" style="${area}"></div>
    <div class="g3d-trace${v} g3d-trace-idle" style="${area};--p:0">
      <div class="g3d-ruler"></div><div class="g3d-trace-guide"></div>
      <div class="g3d-ghost"><div class="g3d-pencil">${PENCIL}</div></div>
      <div class="g3d-pencil g3d-pencil-me">${PENCIL}</div>
    </div>`);
  const line = grid.lastElementChild.previousElementSibling;
  const zone = grid.lastElementChild;
  const me = zone.querySelector('.g3d-pencil-me');
  const guide = zone.querySelector('.g3d-trace-guide'); // đo theo vạch mờ (vạch kẻ thật đang thu về 0)
  const dir = vert ? 'từ trên xuống dưới' : 'từ trái sang phải';
  if (ruleTold[vert ? 'v' : 'h']) show(`📏 <b>Kẻ vạch ${vert ? 'dọc' : 'ngang'}</b> bằng thước: kéo bút <b>${dir}</b>.`);
  else {
    ruleTold[vert ? 'v' : 'h'] = true;
    say(`Em dùng thước kẻ vạch ${vert ? 'dọc' : 'ngang'}. Đặt bút ở ${vert ? 'đầu trên' : 'đầu bên trái'} rồi kéo ${dir}.`,
      `📏 <b>Kẻ vạch ${vert ? 'dọc' : 'ngang'}</b> bằng thước: đặt bút ở <b>${vert ? 'đầu trên' : 'đầu bên trái'}</b>, kéo ${dir}.`);
  }
  let p = 0, drawing = false, end;
  const done = new Promise(r => { end = r; });
  const setP = (x) => { p = x; zone.style.setProperty('--p', x); line.style.transform = `${vert ? 'scaleY' : 'scaleX'}(${x})`; };
  const finish = () => {
    if (!end) return;
    const r = end;
    end = null;
    drawing = false;
    setP(1);
    sfx.ding();
    zone.classList.add('g3d-trace-out');
    setTimeout(() => zone.remove(), 450);
    setTimeout(r, 350);
  };
  /** Vị trí bút dọc theo vạch (0 = đầu, 1 = cuối) và độ dài vạch (px). */
  const posOf = (e) => {
    const b = guide.getBoundingClientRect();
    return vert ? { at: (e.clientY - b.top) / b.height, len: b.height } : { at: (e.clientX - b.left) / b.width, len: b.width };
  };
  const cellPx = () => grid.querySelector('.g3d-c')?.offsetWidth || 40;
  zone.addEventListener('pointerdown', (e) => {
    if (!end) return;
    e.preventDefault();
    const { at, len } = posOf(e);
    if ((at - p) * len > cellPx() * 0.9) { // đặt bút xa chỗ đang kẻ dở: nhắc đặt bút ở đầu nét
      me.classList.remove('g3d-pencil-nudge');
      void me.offsetWidth;
      me.classList.add('g3d-pencil-nudge');
      sfx.boing();
      hint(`Kẻ ${dir}: đặt bút vào chỗ cây bút đang chờ rồi kéo ${vert ? 'xuống' : 'sang phải'}.`,
        `✏️ Đặt bút vào <b>chỗ cây bút</b> rồi kéo ${vert ? 'xuống' : 'sang phải'}.`);
      return;
    }
    drawing = true;
    zone.classList.remove('g3d-trace-idle');
    try { zone.setPointerCapture(e.pointerId); } catch { /* bút giả lập (thử tự động) */ }
  });
  zone.addEventListener('pointermove', (e) => {
    if (!drawing || !end) return;
    const { at, len } = posOf(e);
    const x = Math.min(1, at);
    if (x > p && (x - p) * len < cellPx() * 1.6) setP(x); // chỉ kẻ tiếp theo bút, không nhảy cóc
    if ((1 - p) * len < cellPx() * 0.25) finish();
  });
  const up = () => { drawing = false; };
  zone.addEventListener('pointerup', up);
  zone.addEventListener('pointercancel', up);
  return { done, finish };
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
    /* Có phím dấu phẩy: 3 cột × 5 hàng (OK cả hàng cuối); khung dẹt: 7 cột × 2 hàng (1–6 ⌫ / 7 8 9 , 0 OK). */
    .g3d-keys-comma { grid-template-rows: repeat(5, minmax(0, 1fr)); }
    .g3d-keys-comma .g3d-key-ok { grid-column: span 3; }
    .g3d-key-comma { background: #E0F2FE; color: #0369A1; box-shadow: 0 4px 0 #7DD3FC; }
    @container (aspect-ratio > 1.7) {
      .g3d-keys-comma { grid-template-columns: repeat(7, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); }
      .g3d-keys-comma .g3d-key { order: 2; }
      .g3d-keys-comma .g3d-key:nth-child(-n+6) { order: 0; }
      .g3d-keys-comma .g3d-key-del { order: 1; }
      .g3d-keys-comma .g3d-key-ok { order: 3; grid-column: span 2; }
    }
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
    /* Đặt tính cột (column.js, grade4Drills/mul.js): hàng số nhớ trên cùng chỉ cao 0,55 ô, ô li bắt đầu từ dưới hàng đó. */
    .g3c-grid { background-position: 0 calc(var(--cell) * 0.55); }
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
    /* Chữ số đang dùng ở bước này + mũi tên "nhân số nào với số nào" (arrowLayer) */
    .g3d-use { background: #FEF3C7; box-shadow: inset 0 0 0 3px #F59E0B; border-radius: 0.2em; }
    .g3d-arrows { position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; z-index: 2; }
    .g3d-arrows path { fill: none; stroke: #DC2626; stroke-linecap: round; }
    .g3d-arrows polygon { fill: #DC2626; stroke: #DC2626; stroke-width: 1.5px; stroke-linejoin: round; }
    .g3d-arrows-in path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: g3dDraw .45s ease-out forwards; }
    .g3d-arrows-in polygon { opacity: 0; animation: g3dFade .15s .4s forwards; }
    @keyframes g3dDraw { to { stroke-dashoffset: 0; } }
    @keyframes g3dFade { to { opacity: 1; } }
    @media (prefers-reduced-motion: reduce) {
      .g3d-arrows-in path, .g3d-arrows-in polygon { stroke-dasharray: none; stroke-dashoffset: 0; opacity: 0; animation: g3dFade .45s ease forwards; }
    }
    /* Dấu phép tính viết ra (popIn) */
    .g3d-popin { animation: g3dPopIn .35s cubic-bezier(.2,1.5,.4,1); }
    @keyframes g3dPopIn { from { transform: scale(0.2); opacity: 0; } }
    /* Kẻ vạch bằng thước (traceRule): vạch kẻ dưới một hàng (dọc: mép trái một cột); thước + bút đè lên chỗ đang trống */
    .g3d-rule { position: absolute; left: 0; right: 0; bottom: -2.5px; height: 5px; background: #1E293B; border-radius: 3px; transform: scaleX(0); transform-origin: 0 50%; pointer-events: none; z-index: 1; }
    .g3d-trace { --off: calc(var(--cell) * 0.35); position: absolute; left: calc(var(--off) * -1); right: calc(var(--off) * -1); top: calc(100% - var(--cell) * 0.6); height: calc(var(--cell) * 1.45);
      z-index: 3; touch-action: none; cursor: crosshair; animation: g3dRulerIn .45s cubic-bezier(.2,1.2,.4,1); }
    @keyframes g3dRulerIn { from { transform: translateX(-25%); opacity: 0; } }
    .g3d-trace-out { animation: g3dRulerOut .45s ease forwards; pointer-events: none; }
    @keyframes g3dRulerOut { to { transform: translateY(40%); opacity: 0; } }
    .g3d-ruler { position: absolute; left: 0; right: 0; top: calc(var(--cell) * 0.6 + 5px); height: calc(var(--cell) * 0.6); box-sizing: border-box; border: 3px solid ${INK}; border-radius: 0.3rem;
      background-color: #FDE68A; box-shadow: 0 4px 0 rgba(63,58,64,0.25);
      background-image: repeating-linear-gradient(90deg, ${INK} 0 2px, transparent 2px calc(var(--cell) / 2)), repeating-linear-gradient(90deg, #A16207 0 1.5px, transparent 1.5px calc(var(--cell) / 10));
      background-size: 100% 42%, 100% 22%; background-repeat: no-repeat; background-position: calc(var(--off) - 4px) 0, calc(var(--off) - 4px) 0; }
    .g3d-trace-guide { position: absolute; left: var(--off); right: var(--off); top: calc(var(--cell) * 0.6 - 2px); border-top: 4px dashed #94A3B8; pointer-events: none; }
    .g3d-pencil { position: absolute; left: calc(var(--off) + var(--p) * (100% - 2 * var(--off))); top: calc(var(--cell) * 0.6); width: calc(var(--cell) * 0.62); height: calc(var(--cell) * 0.62);
      transform: translate(-94%, -94%); pointer-events: none; filter: drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff); }
    /* Thân bút nghiêng sang trái phía trên: lúc chờ ở đầu vạch không che dấu phép tính */
    .g3d-pencil svg { width: 100%; height: 100%; display: block; transform: scaleX(-1); }
    .g3d-pencil-nudge { animation: g3dShake .4s ease; }
    .g3d-trace-idle .g3d-pencil-me { animation: g3dBlinkO 1.1s ease-in-out infinite; }
    @keyframes g3dBlinkO { 50% { opacity: 0.45; } }
    /* Bút mờ chạy mẫu từ trái sang phải khi em chưa kẻ */
    .g3d-ghost { position: absolute; inset: 0; left: var(--off); right: var(--off); pointer-events: none; opacity: 0; }
    .g3d-ghost .g3d-pencil { left: 0; opacity: 0.45; }
    .g3d-trace-idle .g3d-ghost { animation: g3dGhost 2.4s ease-in-out .6s infinite; }
    @keyframes g3dGhost { 0% { opacity: 0; transform: none; } 15% { opacity: 1; transform: none; } 80% { opacity: 1; transform: translateX(100%); } 100% { opacity: 0; transform: translateX(100%); } }
    /* Vạch dọc: kẻ từ trên xuống, thước nằm bên phải vạch */
    .g3d-rule.g3d-v { left: -2.5px; right: auto; top: 0; bottom: 0; width: 5px; height: auto; transform: scaleY(0); transform-origin: 50% 0; }
    .g3d-trace.g3d-v { left: calc(var(--cell) * -0.6); right: auto; width: calc(var(--cell) * 1.3); top: calc(var(--off) * -1); bottom: calc(var(--off) * -1); height: auto; animation-name: g3dRulerInV; }
    @keyframes g3dRulerInV { from { transform: translateY(-25%); opacity: 0; } }
    .g3d-v.g3d-trace-out { animation-name: g3dRulerOutV; }
    @keyframes g3dRulerOutV { to { transform: translateX(40%); opacity: 0; } }
    .g3d-v .g3d-ruler { left: calc(var(--cell) * 0.6 + 5px); right: auto; width: calc(var(--cell) * 0.6); top: 0; bottom: 0; height: auto;
      background-image: repeating-linear-gradient(180deg, ${INK} 0 2px, transparent 2px calc(var(--cell) / 2)), repeating-linear-gradient(180deg, #A16207 0 1.5px, transparent 1.5px calc(var(--cell) / 10));
      background-size: 42% 100%, 22% 100%; background-position: 0 calc(var(--off) - 4px), 0 calc(var(--off) - 4px); }
    .g3d-v .g3d-trace-guide { left: calc(var(--cell) * 0.6 - 2px); right: auto; top: var(--off); bottom: var(--off); border-top: none; border-left: 4px dashed #94A3B8; }
    .g3d-v .g3d-pencil { left: calc(var(--cell) * 0.6); top: calc(var(--off) + var(--p) * (100% - 2 * var(--off))); }
    .g3d-v .g3d-ghost { left: 0; right: 0; top: var(--off); bottom: var(--off); }
    .g3d-v .g3d-ghost .g3d-pencil { left: calc(var(--cell) * 0.6); top: 0; }
    .g3d-trace-idle.g3d-v .g3d-ghost { animation-name: g3dGhostV; }
    @keyframes g3dGhostV { 0% { opacity: 0; transform: none; } 15% { opacity: 1; transform: none; } 80% { opacity: 1; transform: translateY(100%); } 100% { opacity: 0; transform: translateY(100%); } }
    @media (prefers-reduced-motion: reduce) {
      .g3d-trace, .g3d-trace.g3d-v { animation: g3dFadeIn .45s ease; }
      .g3d-v.g3d-trace-out { animation: g3dRulerOutCalm .45s ease forwards; }
      .g3d-trace-out { animation: g3dRulerOutCalm .45s ease forwards; }
      @keyframes g3dRulerOutCalm { to { opacity: 0; } }
      .g3d-trace-idle .g3d-ghost { animation-duration: 4s; }
      .g3d-popin { animation: g3dFadeIn .35s ease; }
      @keyframes g3dFadeIn { from { opacity: 0; } }
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
