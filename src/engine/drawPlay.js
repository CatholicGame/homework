/**
 * ✏️ Thực hành vẽ: bài "Hãy vẽ …" (SGK Toán 4) làm được ngay trên máy, theo đúng các bước của sách,
 * bằng đồ dùng thật: thước có vạch xăng-ti-mét, mi-li-mét và ê ke. Vẽ xong, bé vẽ lại vào vở.
 *
 *   • Mỗi câu là một dãy bước lấy từ đề (hoặc từ cách vẽ của sách: hình chữ nhật, hình vuông).
 *   • 📏 Vẽ đoạn thẳng: thước đặt sẵn, vạch 0 ở điểm đầu; bé kéo ✏️ dọc mép thước tới đúng vạch.
 *   • 📐 Vẽ đường vuông góc: bé kéo ê ke cho góc vuông chạm điểm, một cạnh nằm trên đường thẳng
 *     (gần đường thì ê ke tự xoay theo đường, trượt dọc đường), rồi bấm ✏️ Kẻ theo cạnh ê ke.
 *     Song song = hai lần vuông góc (như sách).
 *   • Nối hai điểm, chạm chỗ hai đường cắt nhau để đặt tên điểm, đo đoạn thẳng (chạm hai điểm),
 *     đặt ê ke vào chỗ hai đường cắt nhau để kiểm tra có vuông góc không.
 *   • Kết quả đo / kiểm tra điền ngay vào ô trả lời (như các đồ dùng hình học khác); vẫn chấm khi bấm Kiểm tra.
 *     Câu chỉ có vẽ: ô "Đã vẽ" (blank.drawDone) được điền khi vẽ xong tất cả các bước.
 * Kết quả giữ theo câu (MEMO): mở lại thấy hình đang vẽ dở.
 *
 *   q.drawPlay = hình | [hình, …]   (nhiều hình a, b, c: mỗi hình một thẻ)
 *   hình = {
 *     label: 'a)',                       tên thẻ khi có nhiều hình
 *     title: 'hình chữ nhật ABCD',       gọi hình khi vẽ xong
 *     rect: [dài, rộng] | square: cạnh, names: 'ABCD', at: [x, y]   vẽ theo cách của sách (DC, ê ke tại D, DA, ê ke tại C, CB, nối AB);
 *                                                                    at = vị trí điểm A (cm trên giấy)
 *     given: { points: { A: [x, y, dx?, dy?] }, segs: ['AB'], lines: { CD: ['C', 'D'] } }   hình cho sẵn (cm; dx, dy: chỗ ghi tên)
 *     steps: [                           các bước tiếp theo (sau rect/square)
 *       { seg: 'DC', at: [x, y], dir: 0, len: 5 }    đoạn thẳng từ D theo hướng dir (độ: 0 phải, 90 xuống, 270 lên)
 *       { seg: 'BI', dir: 0, len: 3, onLine: true }  đoạn nằm trên đường đã có ("lấy đoạn …")
 *       { mark: 'M', from: 'A', toward: 'D', len: 2 } chấm điểm trên đoạn (trung điểm)
 *       { perp: 'DC', through: 'D', id: 'pD', name: 'G', ends: ['A', 'B'], label: 'X' }
 *                                                     ê ke: đường qua điểm, vuông góc với DC; name: tên chỗ cắt DC
 *       { par: 'BC', through: 'A', id: 'AX', label: 'X' }  song song = hai bước vuông góc
 *       { join: 'AB' }                               nối hai điểm
 *       { meet: ['AX', 'CY'], name: 'D' }            chạm chỗ hai đường cắt nhau
 *       { measure: ['AC', 'BD'], fill: { blank, equal: true, yes: 'Có', no: 'Không' } }
 *       { check: ['AC', 'BD'], fill: { blank, yes: 'Có', no: 'Không' } }   ê ke vào chỗ hai đường cắt nhau
 *       … mọi bước có thể kèm say: 'lời dặn riêng'
 *     ],
 *     paper: [rộng, cao],                giấy (cm), mặc định vừa hình + chỗ để ê ke
 *     done: số ô,                        câu chỉ có vẽ: ô nhận "Đã vẽ"
 *   }
 *   q.drawAfter = true                    câu tính toán (vẽ theo tỉ lệ): làm đúng rồi mới mở để vẽ
 */

import { fillBlanks } from './geoTools.js';
import { audioCtx, playSfx } from './sfx.js';

const NS = 'http://www.w3.org/2000/svg';
const U = 60; // đơn vị SVG cho 1 cm
const INK = '#1E293B';
const PEN = '#2563EB';
const HELP = '#60A5FA';
const OK = '#16A34A';
const BAD = '#DC2626';
const EKE_L1 = 4.2, EKE_L2 = 2.8; // hai cạnh góc vuông của ê ke (cm)
export const DRAW_DONE = 'Đã vẽ';

const calm = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const norm = (d) => ((d % 360) + 360) % 360;
const diff = (a, b) => { const d = norm(a - b); return d > 180 ? d - 360 : d; };
const uv = (d) => ({ x: Math.cos(rad(d)), y: Math.sin(rad(d)) });
const dirOf = (p, q) => norm(deg(Math.atan2(q.y - p.y, q.x - p.x)));
const dist = (p, q) => Math.hypot(p.x - q.x, p.y - q.y);
const along = (p, d, t) => { const u = uv(d); return { x: p.x + u.x * t, y: p.y + u.y * t }; };
const foot = (p, L) => { const u = uv(L.d); const k = (p.x - L.a.x) * u.x + (p.y - L.a.y) * u.y; return { x: L.a.x + k * u.x, y: L.a.y + k * u.y }; };
const lineDist = (p, L) => dist(p, foot(p, L));
const keyOf = (s) => [...s].sort().join('');
const X = (v) => +(v * U).toFixed(2);
const isPerp = (d1, d2) => Math.abs(Math.abs(diff(d1, d2)) - 90) < 0.6;
/** Chỗ hai đường thẳng cắt nhau (null nếu song song). */
function meetOf(L1, L2) {
  const u = uv(L1.d), v = uv(L2.d);
  const den = u.x * v.y - u.y * v.x;
  if (Math.abs(den) < 1e-9) return null;
  const t = ((L2.a.x - L1.a.x) * v.y - (L2.a.y - L1.a.y) * v.x) / den;
  return { x: L1.a.x + u.x * t, y: L1.a.y + u.y * t };
}
/** Độ dài đọc trên thước: "4 cm 6 mm", "5 cm", "7 mm". */
export function lenText(t) {
  const mm = Math.round(t * 10);
  const cm = Math.floor(mm / 10), r = mm % 10;
  if (!cm) return `${r} mm`;
  return r ? `${cm} cm ${r} mm` : `${cm} cm`;
}

function el(tag, attrs = {}, parent) {
  const e = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  if (parent) parent.appendChild(e);
  return e;
}

// ── âm thanh ngắn ───────────────────────────────────────────────────────────
function tone(freqs, { type = 'sine', gap = 0.09, dur = 0.22, vol = 0.14 } = {}) {
  const actx = audioCtx();
  if (!actx) return;
  freqs.forEach((f, i) => {
    const t = actx.currentTime + i * gap;
    const o = actx.createOscillator();
    const g = actx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(actx.destination);
    o.start(t); o.stop(t + dur + 0.02);
  });
}
const soundTick = () => playSfx('tick', { vol: 0.6 }) || tone([880], { type: 'triangle', dur: 0.04, vol: 0.05 });
const soundStep = () => playSfx('piece') || tone([660, 880], { gap: 0.08, dur: 0.16 });
const soundWrong = () => playSfx('wrong') || tone([300, 240], { type: 'triangle', gap: 0.1, dur: 0.18, vol: 0.1 });
const soundDone = () => playSfx('complete') || tone([523, 659, 784, 1046], { gap: 0.1, dur: 0.3 });

// ── dữ liệu: các bước ───────────────────────────────────────────────────────
function normStep(s) {
  if (s.seg) return { ...s, kind: 'seg', from: s.seg[0], to: s.seg[1] };
  if (s.mark) return { ...s, kind: 'mark', name: s.mark };
  if (s.perp) return { ...s, kind: 'perp', base: s.perp, id: s.id || `p${s.through}` };
  if (s.join) return { ...s, kind: 'join', a: s.join[0], b: s.join[1] };
  if (s.meet) return { ...s, kind: 'meet' };
  if (s.measure) return { ...s, kind: 'measure', segs: [].concat(s.measure) };
  if (s.check) return { ...s, kind: 'check', lines: s.check };
  throw new Error(`drawPlay: bước lạ ${JSON.stringify(s)}`);
}

function expand(d0) {
  const d = { ...d0 };
  let steps = [];
  const shape = d.rect || (d.square != null ? [d.square, d.square] : null);
  if (shape) {
    const [w, h] = shape;
    const [A, B, C, D] = [...(d.names || 'ABCD')];
    const [x0, y0] = d.at || [1.4, 1.5];
    steps.push(
      { seg: D + C, at: [x0, y0 + h], dir: 0, len: w },
      { perp: D + C, through: D, id: `p${D}`, helper: true },
      { seg: D + A, dir: 270, len: h, onLine: true },
      { perp: D + C, through: C, id: `p${C}`, helper: true },
      { seg: C + B, dir: 270, len: h, onLine: true },
      { join: A + B },
    );
    d.title ||= `${d.rect ? 'hình chữ nhật' : 'hình vuông'} ${A}${B}${C}${D}`;
  }
  steps.push(...(d.steps || []));
  // song song = hai lần vuông góc (sách: vẽ MN qua E vuông góc AB, rồi CD qua E vuông góc MN)
  steps = steps.flatMap((s) => {
    if (!s.par) return [s];
    const help = s.help || `h${s.id}`;
    return [
      { perp: s.par, through: s.through, id: help, helper: true, say: s.say1 || `Bước 1: vẽ đường thẳng đi qua ${s.through} và vuông góc với ${s.par}.` },
      { perp: help, through: s.through, id: s.id, label: s.label, ends: s.ends, name: s.name, say: s.say2 || `Bước 2: vẽ đường thẳng đi qua ${s.through} và vuông góc với đường vừa vẽ. Ta được đường thẳng song song với ${s.par}.` },
    ];
  });
  d.steps = steps.map(normStep);
  return d;
}

function blankState(d) {
  const st = { P: {}, off: {}, segs: [], lines: {}, marks: [], meas: {}, checks: {} };
  Object.entries(d.given?.points || {}).forEach(([n, [x, y, dx, dy]]) => {
    st.P[n] = { x, y };
    if (dx != null) st.off[n] = { x: dx, y: dy };
  });
  (d.given?.segs || []).forEach((s) => st.segs.push([s[0], s[1], 'given']));
  Object.entries(d.given?.lines || {}).forEach(([id, [a, b]]) => {
    st.lines[id] = { a: st.P[a], d: dirOf(st.P[a], st.P[b]), given: true };
  });
  return st;
}

/** Đường thẳng theo tên: đường đã kẻ (id) hoặc đường qua hai điểm có tên. */
function lineOf(st, id) {
  if (st.lines[id]) return st.lines[id];
  const [a, b] = [st.P[id[0]], st.P[id[1]]];
  return a && b && id.length === 2 ? { a, d: dirOf(a, b) } : null;
}

/** Áp dụng kết quả đúng của một bước lên hình. */
function apply(st, s) {
  if (s.kind === 'seg') {
    if (!st.P[s.from]) st.P[s.from] = { x: s.at[0], y: s.at[1] };
    st.P[s.to] = along(st.P[s.from], s.dir, s.len);
    st.segs.push([s.from, s.to]);
  } else if (s.kind === 'mark') {
    st.P[s.name] = along(st.P[s.from], dirOf(st.P[s.from], st.P[s.toward]), s.len);
  } else if (s.kind === 'perp') {
    const L = lineOf(st, s.base);
    const f = foot(st.P[s.through], L);
    st.lines[s.id] = { a: f, d: norm(L.d + 90), helper: !!s.helper, label: s.label, ends: s.ends, through: s.through };
    st.marks.push({ at: f, d1: L.d, d2: norm(L.d + 90), through: s.through });
    if (s.name) st.P[s.name] = f;
  } else if (s.kind === 'join') {
    st.segs.push([s.a, s.b]);
  } else if (s.kind === 'meet') {
    st.P[s.name] = meetOf(lineOf(st, s.meet[0]), lineOf(st, s.meet[1]));
  } else if (s.kind === 'measure') {
    s.segs.forEach((g) => { st.meas[keyOf(g)] = dist(st.P[g[0]], st.P[g[1]]); });
  } else if (s.kind === 'check') {
    const [L1, L2] = s.lines.map((id) => lineOf(st, id));
    const at = meetOf(L1, L2);
    st.checks[keyOf(s.lines.join(''))] = { at, ok: isPerp(L1.d, L2.d), d1: L1.d, d2: L2.d };
  }
}

/** Ảnh chụp hình sau từng bước: snaps[k] = hình khi đã xong k bước. */
function simulate(d) {
  const st = blankState(d);
  const snaps = [structuredClone(st)];
  d.steps.forEach((s) => { apply(st, s); snaps.push(structuredClone(st)); });
  return snaps;
}

const sayOf = (s, k, d) => {
  if (s.say) return s.say;
  if (s.kind === 'seg') return s.onLine
    ? `Trên đường thẳng vừa kẻ, lấy đoạn thẳng <b>${s.from}${s.to} = ${s.len} cm</b>.`
    : `Vẽ đoạn thẳng <b>${s.from}${s.to} = ${s.len} cm</b>.`;
  if (s.kind === 'mark') return `Chấm điểm <b>${s.name}</b> trên ${s.from}${s.toward}, cách ${s.from} <b>${s.len} cm</b>.`;
  if (s.kind === 'perp') {
    const onBase = d.snaps && lineDist(d.snaps[k].P[s.through], lineOf(d.snaps[k], s.base)) < 0.01;
    return onBase ? `Vẽ đường thẳng vuông góc với <b>${s.base}</b> tại <b>${s.through}</b>.`
      : `Vẽ đường thẳng đi qua <b>${s.through}</b> và vuông góc với <b>${s.base}</b>${s.name ? `, cắt ${s.base} tại <b>${s.name}</b>` : ''}.`;
  }
  if (s.kind === 'join') return `Nối <b>${s.a}</b> với <b>${s.b}</b>.`;
  if (s.kind === 'meet') return `Hai đường ${s.meet[0]} và ${s.meet[1]} cắt nhau tại điểm <b>${s.name}</b>. Chạm vào chỗ đó.`;
  if (s.kind === 'measure') return `Dùng thước đo ${s.segs.map((g) => `<b>${g}</b>`).join(' và ')}.`;
  return `Dùng ê ke kiểm tra: <b>${s.lines[0]}</b> và <b>${s.lines[1]}</b> có vuông góc với nhau không?`;
};
const howOf = (s, onBase) => ({
  seg: `👆 Kéo ✏️ dọc mép thước, từ vạch 0 tới vạch ${s.len}.`,
  mark: `👆 Kéo ✏️ dọc mép thước tới vạch ${s.len}.`,
  perp: onBase ? '👆 Kéo ê ke cho góc vuông chạm điểm, một cạnh nằm trên đường thẳng, rồi bấm ✏️ Kẻ.'
    : '👆 Kéo ê ke cho một cạnh nằm trên đường thẳng, trượt tới khi cạnh kia chạm điểm, rồi bấm ✏️ Kẻ.',
  join: '👆 Chạm điểm đầu rồi chạm điểm cuối (hoặc kéo từ điểm này sang điểm kia).',
  meet: '👆 Chạm vào chỗ hai đường thẳng gặp nhau.',
  measure: '👆 Chạm hai đầu của đoạn thẳng (hoặc chạm vào đoạn thẳng) để đặt thước đo.',
  check: '👆 Kéo ê ke cho góc vuông chạm chỗ hai đường cắt nhau. Xem cạnh kia có khít không.',
}[s.kind]);

// ── kết quả điền vào ô trả lời ──────────────────────────────────────────────
const MEMO = new WeakMap();
const memoOf = (q, k) => {
  let m = MEMO.get(q);
  if (!m) MEMO.set(q, (m = []));
  return (m[k] ||= { done: 0, meas: {} });
};
const drawingsOf = (q) => (q.drawPlay ? [].concat(q.drawPlay).map(expand) : []);

function fillsOf(q, drawings) {
  const vals = {};
  drawings.forEach((d, k) => {
    const m = memoOf(q, k);
    const snaps = d.snaps || (d.snaps = simulate(d));
    d.steps.forEach((s, i) => {
      if (!s.fill || i >= m.done) return;
      const st = snaps[i + 1];
      [].concat(s.fill).forEach((f) => {
        let ok = true;
        if (s.kind === 'measure') {
          const ls = s.segs.map((g) => st.meas[keyOf(g)]);
          ok = ls.every((v) => Math.abs(v - ls[0]) < 0.05);
          if (f.len != null) { vals[f.blank] = lenText(ls[f.len]).replace(/ cm$/, ''); return; }
        } else if (s.kind === 'check') ok = st.checks[keyOf(s.lines.join(''))].ok;
        vals[f.blank] = ok ? (f.yes || 'Có') : (f.no || 'Không');
      });
    });
    if (d.done != null && m.done >= d.steps.length) vals[d.done] = DRAW_DONE;
  });
  return vals;
}

// ── nút trong câu ───────────────────────────────────────────────────────────
export function attachDrawPlay(root, q, solved) {
  if (!q.drawPlay) return;
  injectStyles();
  const card = root.querySelector('.e3-question-card');
  if (!card) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `gt-open dp-open${q.drawAfter && !solved ? ' dp-locked' : ''}`;
  btn.textContent = '✏️ Thực hành vẽ';
  const open = (k = 0) => openDrawPlay(q, (vals) => fillBlanks(root, vals), k);
  btn.onclick = () => open();
  const row = card.querySelector(':scope > .gt-row');
  if (row) row.prepend(btn);
  else {
    const nr = document.createElement('div');
    nr.className = 'gt-row dp-row';
    nr.appendChild(btn);
    const img = card.querySelector(':scope > .e3-q-img');
    if (img) {
      let at = img;
      while (at.nextElementSibling?.matches('.e3-orig-toggle, .gp-open, .cp-open')) at = at.nextElementSibling;
      at.after(nr);
    } else (card.querySelector(':scope > .e3-q-text') || card.lastElementChild).after(nr);
  }
  // Ô "Đã vẽ": không gõ được, chạm vào thì mở giấy vẽ. Giữ nguyên ô (nút Kiểm tra đang theo dõi nó),
  // chặn bàn phím ảo ở pha bắt sự kiện của khung chứa ô.
  (q.blanks || []).forEach((b, i) => {
    if (!b.drawDone) return;
    const tab = Math.max(0, [].concat(q.drawPlay).findIndex((d) => d.done === i));
    root.querySelectorAll(`.e3-blank-input[data-idx="${i}"]`).forEach((inp) => {
      inp.classList.add('dp-done-input');
      inp.placeholder = '✏️ chạm để vẽ';
      const wrap = inp.parentElement;
      const block = (e) => {
        if (e.target !== inp) return;
        e.stopPropagation();
        if (e.type === 'focus') { inp.blur(); return; }
        e.preventDefault();
        if (e.type === 'click' && !inp.disabled) open(tab);
      };
      ['pointerdown', 'mousedown', 'touchstart', 'click', 'focus'].forEach((t) => wrap.addEventListener(t, block, { capture: true, passive: false }));
    });
  });
}

/** Câu tính toán vừa làm đúng: hiện nút ✏️ và mời bé vẽ ngay dưới lời khen. */
export function revealDrawPlay(root, q, banner) {
  if (!q?.drawAfter || !q.drawPlay) return;
  root.querySelectorAll('.dp-locked').forEach((b) => b.classList.remove('dp-locked'));
  if (!banner) return;
  const cta = document.createElement('button');
  cta.type = 'button';
  cta.className = 'dp-cta';
  cta.textContent = '✏️ Vẽ hình trên giấy';
  cta.onclick = () => openDrawPlay(q, (vals) => fillBlanks(root, vals));
  banner.after(cta);
}

// ── lớp phủ ─────────────────────────────────────────────────────────────────
export function openDrawPlay(q, onApply, first = 0) {
  injectStyles();
  const drawings = drawingsOf(q);
  drawings.forEach((d) => { d.snaps = simulate(d); });
  const overlay = document.createElement('div');
  overlay.className = 'dp-overlay';
  overlay.innerHTML = `
    <div class="dp-panel" role="dialog" aria-label="Thực hành vẽ">
      <div class="dp-head">
        <div class="dp-tabs${drawings.length < 2 ? ' dp-single' : ''}">${drawings.length < 2 ? '<span class="dp-title">✏️ Thực hành vẽ</span>'
          : drawings.map((d, i) => `<button type="button" class="dp-tab" data-k="${i}">${d.label || `Hình ${i + 1}`}</button>`).join('')}</div>
        <button type="button" class="dp-close">✓ Xong</button>
      </div>
      <div class="dp-task">
        <span class="dp-stepno"></span>
        <div class="dp-task-text"><div class="dp-say"></div><div class="dp-how"></div></div>
      </div>
      <div class="dp-stage">
        <svg class="dp-svg" preserveAspectRatio="xMidYMid meet"></svg>
      </div>
      <div class="dp-foot">
        <div class="dp-dots"></div>
        <div class="dp-btns">
          <button type="button" class="dp-turn" title="Xoay ê ke">🔄<span class="dp-long"> Xoay ê ke</span></button>
          <button type="button" class="dp-go"></button>
          <button type="button" class="dp-reset" title="Vẽ lại từ đầu">↺</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const $ = (s) => overlay.querySelector(s);
  const filled = new Set();
  let mounted = null;
  let cur = Math.min(first, drawings.length - 1);

  const close = () => {
    mounted?.destroy();
    overlay.remove();
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', onResize);
    ro?.disconnect();
    filled.forEach((e) => { e.classList.remove('gt-filled'); void e.offsetWidth; e.classList.add('gt-filled'); });
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  $('.dp-close').onclick = close;
  const changed = () => { (onApply?.(fillsOf(q, drawings)) || []).forEach((e) => filled.add(e)); };

  const show = (k) => {
    mounted?.destroy();
    cur = k;
    overlay.querySelectorAll('.dp-tab').forEach((b) => b.classList.toggle('dp-on', +b.dataset.k === k));
    mounted = mountDrawing({ overlay, $, changed, close, memo: memoOf(q, k) }, drawings[k]);
    overlay.__dp = mounted.api;
  };
  overlay.querySelectorAll('.dp-tab').forEach((b) => { b.onclick = () => show(+b.dataset.k); });
  // xoay máy / đổi cỡ: khung vẽ đổi cỡ thì dựng lại giấy cho kín khung (các bước đã xong giữ trong MEMO)
  let rz = 0, size = '';
  const stage = $('.dp-stage');
  const onResize = () => {
    clearTimeout(rz);
    rz = setTimeout(() => {
      const r = stage.getBoundingClientRect(), now = `${Math.round(r.width / 6)}x${Math.round(r.height / 6)}`;
      if (now === size || !overlay.isConnected || mounted?.api.busy()) return;
      size = now;
      show(cur);
    }, 200);
  };
  const ro = window.ResizeObserver ? new ResizeObserver(onResize) : null;
  ro?.observe(stage);
  window.addEventListener('resize', onResize);
  requestAnimationFrame(() => { const r = stage.getBoundingClientRect(); size = `${Math.round(r.width / 6)}x${Math.round(r.height / 6)}`; show(cur); });
  return overlay;
}

function mountDrawing(ctx, d) {
  const { $, memo, changed } = ctx;
  const svg = $('.dp-svg');
  const steps = d.steps;
  const snaps = d.snaps;
  const fin = snaps[snaps.length - 1];
  // giấy: vừa hình (lúc vẽ xong) + chỗ bên phải để ê ke, rồi giãn cho kín khung (hình nằm giữa)
  const pts = Object.values(fin.P);
  const xs = pts.map((p) => p.x), ys = pts.map((p) => p.y);
  const fx0 = Math.min(...xs), fx1 = Math.max(...xs), fy0 = Math.min(...ys), fy1 = Math.max(...ys);
  const box = $('.dp-stage').getBoundingClientRect();
  const tall = box.width > 80 && box.height > box.width;
  // khung dọc (điện thoại dọc): chỗ để ê ke ở dưới hình thay vì bên phải
  const W0 = tall ? Math.max(6, Math.ceil(fx1 + 1.4)) : d.paper?.[0] ?? Math.max(9, Math.ceil(fx1 + 5.6));
  const H0 = tall ? Math.max(9, Math.ceil(fy1 + 5.4)) : d.paper?.[1] ?? Math.max(6.4, Math.ceil(fy1 + 1.4));
  let x0 = 0, x1 = W0, y0 = 0, y1 = H0;
  const asp = box.width > 80 && box.height > 80 ? box.width / box.height : (W0 + 0.6) / (H0 + 0.6);
  if (asp > (W0 + 0.6) / (H0 + 0.6)) {
    const extra = (H0 + 0.6) * asp - 0.6 - W0;
    const a = Math.max(0, Math.min(extra, (extra + (x1 - fx1) - (fx0 - x0)) / 2));
    x0 -= a; x1 += extra - a;
  } else {
    const extra = (W0 + 0.6) / asp - 0.6 - H0;
    const b = Math.max(0, Math.min(extra, (extra + (y1 - fy1) - (fy0 - y0)) / 2));
    y0 -= b; y1 += extra - b;
  }
  const cen = { x: xs.reduce((a, v) => a + v, 0) / xs.length, y: ys.reduce((a, v) => a + v, 0) / ys.length };
  svg.setAttribute('viewBox', `${X(x0 - 0.3)} ${X(y0 - 0.3)} ${X(x1 - x0 + 0.6)} ${X(y1 - y0 + 0.6)}`);
  svg.innerHTML = '';
  // giấy ô li nhạt: ô 1 cm
  const gPaper = el('g', {}, svg);
  el('rect', { x: X(x0), y: X(y0), width: X(x1 - x0), height: X(y1 - y0), rx: 10, fill: '#FFFEF7', stroke: '#E2E8F0', 'stroke-width': 3 }, gPaper);
  let grid = '';
  for (let i = Math.ceil(x0 + 0.01); i < x1; i++) grid += `M${X(i)} ${X(y0)}V${X(y1)}`;
  for (let j = Math.ceil(y0 + 0.01); j < y1; j++) grid += `M${X(x0)} ${X(j)}H${X(x1)}`;
  el('path', { d: grid, class: 'dp-grid' }, gPaper);
  const gLines = el('g', {}, svg), gSegs = el('g', {}, svg), gMarks = el('g', {}, svg), gMeas = el('g', {}, svg);
  // tên điểm nằm trên thước, ê ke (không bị che)
  const gTool = el('g', {}, svg), gFx = el('g', {}, svg), gPts = el('g', {}, svg);

  let st = structuredClone(snaps[Math.min(memo.done, steps.length)]);
  Object.assign(st.meas, memo.meas);
  let k = Math.min(memo.done, steps.length);
  let busy = false;
  let tool = null; // công cụ của bước đang làm: { down, move, up, go?, turn?, destroy }
  const timers = [];
  const later = (fn, ms) => { const t = setTimeout(fn, calm() ? Math.round(ms * 0.7) : ms); timers.push(t); return t; };

  // lời nhắc / nhận xét hiện ở dòng dưới của thanh nhiệm vụ (không đè lên hình)
  const how = $('.dp-how');
  let howText = '';
  const say = (html, cls = '') => {
    how.className = `dp-how${html ? ` dp-msg ${cls}` : ''}`;
    if (html) how.innerHTML = html; else how.textContent = howText;
  };
  const goBtn = $('.dp-go'), turnBtn = $('.dp-turn');

  // ── vẽ hình hiện có ───────────────────────────────────────────────────────
  const clip = (a, dd) => {
    const u = uv(dd), ts = [];
    if (Math.abs(u.x) > 1e-9) ts.push((x0 - a.x) / u.x, (x1 - a.x) / u.x);
    if (Math.abs(u.y) > 1e-9) ts.push((y0 - a.y) / u.y, (y1 - a.y) / u.y);
    const ok = ts.filter((t) => { const x = a.x + t * u.x, y = a.y + t * u.y; return x >= x0 - 1e-6 && x <= x1 + 1e-6 && y >= y0 - 1e-6 && y <= y1 + 1e-6; });
    return [along(a, dd, Math.min(...ok)), along(a, dd, Math.max(...ok))];
  };
  const nameOff = (n, p) => {
    if (st.off[n]) return st.off[n];
    const v = { x: p.x - cen.x, y: p.y - cen.y }, l = Math.hypot(v.x, v.y);
    return l < 0.3 ? { x: 0, y: -0.5 } : { x: (v.x / l) * 0.5, y: (v.y / l) * 0.5 };
  };
  function render(fresh = {}) {
    gLines.innerHTML = ''; gSegs.innerHTML = ''; gMarks.innerHTML = ''; gMeas.innerHTML = ''; gPts.innerHTML = '';
    Object.entries(st.lines).forEach(([id, L]) => {
      const [p0, p1] = clip(L.a, L.d);
      el('line', { x1: X(p0.x), y1: X(p0.y), x2: X(p1.x), y2: X(p1.y), class: L.given ? 'dp-line-given' : L.helper ? 'dp-line-help' : 'dp-line' }, gLines);
      const lab = (txt, end) => {
        const e = end > 0 ? p1 : p0, u = uv(L.d), n = { x: -u.y, y: u.x };
        const s = end > 0 ? -1 : 1;
        const at = { x: e.x + u.x * s * 0.55 + n.x * 0.4, y: e.y + u.y * s * 0.55 + n.y * 0.4 };
        const t = el('text', { x: X(at.x), y: X(at.y), class: 'dp-name dp-name-line' }, gLines);
        t.textContent = txt;
      };
      if (L.ends) { lab(L.ends[0], -1); lab(L.ends[1], 1); }
      // tên đường (AX: chữ X) ở đầu xa điểm đi qua
      if (L.label) { const thr = st.P[L.through] || L.a; lab(L.label, dist(p1, thr) >= dist(p0, thr) ? 1 : -1); }
    });
    st.segs.forEach(([a, b, given], i) => {
      const pa = st.P[a], pb = st.P[b];
      const ln = el('line', { x1: X(pa.x), y1: X(pa.y), x2: X(pb.x), y2: X(pb.y), class: given ? 'dp-seg dp-seg-given' : 'dp-seg' }, gSegs);
      if (fresh.seg === i) grow(ln, pa, pb);
    });
    const mark = (at, d1, d2, color, toward) => {
      // ∟ ở góc phía trong hình (hoặc phía điểm đi qua)
      const s = 0.42;
      let u = uv(d1), v = uv(d2);
      const ref = toward || cen;
      if ((ref.x - at.x) * u.x + (ref.y - at.y) * u.y < -1e-6) u = { x: -u.x, y: -u.y };
      if ((ref.x - at.x) * v.x + (ref.y - at.y) * v.y < -1e-6) v = { x: -v.x, y: -v.y };
      el('path', { d: `M${X(at.x + u.x * s)} ${X(at.y + u.y * s)} L${X(at.x + (u.x + v.x) * s)} ${X(at.y + (u.y + v.y) * s)} L${X(at.x + v.x * s)} ${X(at.y + v.y * s)}`, fill: 'none', stroke: color, 'stroke-width': 4 }, gMarks);
    };
    st.marks.forEach((m) => {
      const thr = st.P[m.through];
      mark(m.at, m.d1, m.d2, OK, thr && dist(thr, m.at) > 0.1 ? { x: (thr.x + cen.x) / 2, y: (thr.y + cen.y) / 2 } : null);
    });
    Object.values(st.checks).forEach((c) => {
      if (c.ok) mark(c.at, c.d1, c.d2, OK, { x: c.at.x + 1, y: c.at.y - 1 });
    });
    Object.entries(st.meas).forEach(([key, v]) => {
      const seg = findSeg(key);
      if (!seg) return;
      const [pa, pb] = seg;
      // hai đường chéo cắt nhau ở giữa hình: số đo ghi gần đầu đoạn cho khỏi chồng nhau
      let mid = { x: (pa.x + pb.x) / 2, y: (pa.y + pb.y) / 2 };
      const diag = dist(mid, cen) < 0.5;
      if (diag) mid = { x: pa.x + (pb.x - pa.x) * 0.22, y: pa.y + (pb.y - pa.y) * 0.22 };
      const u = uv(dirOf(pa, pb)); let n = { x: -u.y, y: u.x };
      if ((mid.x - cen.x) * n.x + (mid.y - cen.y) * n.y < 0) n = { x: -n.x, y: -n.y };
      const off = diag ? 0 : 0.45;
      chip(gMeas, { x: mid.x + n.x * off, y: mid.y + n.y * off }, lenText(v), fresh.meas === key);
    });
    Object.entries(st.P).forEach(([n, p]) => {
      const g = el('g', { class: `dp-pt${fresh.pt === n ? ' dp-pop' : ''}` }, gPts);
      el('circle', { cx: X(p.x), cy: X(p.y), r: 7, fill: INK }, g);
      if (n.startsWith('_')) return;
      const o = nameOff(n, p);
      const t = el('text', { x: X(p.x + o.x), y: X(p.y + o.y), class: 'dp-name' }, g);
      t.textContent = n.replace(/\d+$/, '');
    });
  }
  const findSeg = (key) => {
    const s = st.segs.find(([a, b]) => keyOf(a + b) === key);
    return s ? [st.P[s[0]], st.P[s[1]]] : null;
  };
  function chip(parent, at, text, pop) {
    const g = el('g', { class: `dp-chip${pop ? ' dp-pop' : ''}`, transform: `translate(${X(at.x)} ${X(at.y)})` }, parent);
    const w = 14 + text.length * 13.5;
    el('rect', { x: -w / 2, y: -19, width: w, height: 38, rx: 19 }, g);
    const t = el('text', { x: 0, y: 1 }, g);
    t.textContent = text;
    return g;
  }
  /** Đoạn mới kẻ: dài dần từ đầu này sang đầu kia. */
  function grow(ln, p0, p1) {
    if (!ln.animate) return;
    const len = dist(p0, p1) * U;
    ln.style.strokeDasharray = `${len}`;
    const a = ln.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: calm() ? 500 : 800, easing: 'ease-out' });
    a.onfinish = () => { ln.style.strokeDasharray = ''; };
  }

  // ── thước ────────────────────────────────────────────────────────────────
  /** Thước dài RL cm, vạch 0 ở o, mép thước dọc hướng dd, thân thước về phía side (+1: bên phải hướng đi). */
  function rulerAt(parent, o, dd, RL, side) {
    const g = el('g', { class: 'dp-ruler', transform: `translate(${X(o.x)} ${X(o.y)}) rotate(${dd})` }, parent);
    const w = 1.25 * side;
    el('rect', { x: X(-0.45), y: Math.min(0, X(w)), width: X(RL + 1.4), height: Math.abs(X(w)), rx: 8, class: 'dp-ruler-body' }, g);
    let ticks = '';
    for (let i = 0; i <= RL * 10; i++) {
      const h = i % 10 === 0 ? 0.42 : i % 5 === 0 ? 0.3 : 0.17;
      ticks += `M${X(i / 10)} 0V${X(h * side)}`;
    }
    el('path', { d: ticks, class: 'dp-ruler-tick' }, g);
    for (let i = 0; i <= RL; i++) {
      const t = el('text', { x: X(i), y: X(0.78 * side), class: 'dp-ruler-num', transform: `rotate(${-dd} ${X(i)} ${X(0.78 * side)})` }, g);
      t.textContent = i;
    }
    const cmText = el('text', { x: X(RL + 0.62), y: X(0.62 * side), class: 'dp-ruler-cm', transform: `rotate(${-dd} ${X(RL + 0.62)} ${X(0.62 * side)})` }, g);
    cmText.textContent = 'cm';
    return g;
  }
  /** Phía đặt thân thước: tránh phía có hình. */
  const sideAway = (o, dd) => {
    const u = uv(dd), n = { x: -u.y, y: u.x };
    return (cen.x - o.x) * n.x + (cen.y - o.y) * n.y > 0 ? -1 : 1;
  };

  // ── ê ke ─────────────────────────────────────────────────────────────────
  function makeEke() {
    const g = el('g', { class: 'dp-eke' }, gTool);
    const body = el('g', { class: 'dp-eke-body' }, g);
    el('path', { d: `M0 0 L${X(EKE_L1)} 0 L0 ${X(-EKE_L2)} Z`, class: 'dp-eke-tri' }, body);
    el('path', { d: `M${X(0.75)} ${X(-0.55)} L${X(EKE_L1 * 0.55)} ${X(-0.55)} L${X(0.75)} ${X(-EKE_L2 * 0.6)} Z`, class: 'dp-eke-hole' }, body);
    let ticks = '';
    for (let i = 1; i < EKE_L1 * 2; i++) ticks += `M${X(i / 2)} 0V${-(i % 2 ? 9 : 16)}`;
    el('path', { d: ticks, class: 'dp-eke-tick' }, body);
    el('path', { d: `M0 ${X(-0.42)} H${X(0.42)} V0`, fill: 'none', stroke: BAD, 'stroke-width': 4 }, body);
    const E = { g, c: { x: x1 - 0.5, y: y1 - 0.5 }, rot: 270 };
    E.place = () => { g.setAttribute('transform', `translate(${X(E.c.x)} ${X(E.c.y)}) rotate(${E.rot})`); };
    E.hit = (p) => {
      const v = { x: p.x - E.c.x, y: p.y - E.c.y }, r = rad(-E.rot);
      const lx = v.x * Math.cos(r) - v.y * Math.sin(r), ly = v.x * Math.sin(r) + v.y * Math.cos(r);
      return (lx > -0.5 && ly < 0.5 && lx / EKE_L1 + -ly / EKE_L2 < 1.12) || Math.hypot(lx, ly) < 0.7;
    };
    E.legs = () => [norm(E.rot), norm(E.rot - 90)];
    E.place();
    return E;
  }
  const nearestAligned = (r, dd) => {
    let best = dd, bd = 999;
    for (let i = 0; i < 4; i++) { const c = norm(dd + i * 90); const e = Math.abs(diff(r, c)); if (e < bd) { bd = e; best = c; } }
    return best;
  };
  /** Đưa ê ke từ chỗ cũ tới chỗ mới (có chuyển động). */
  function slideEke(E, c, rot, ms = 600) {
    return new Promise((res) => {
      const c0 = { ...E.c }, r0 = E.rot, dr = diff(rot, r0), t0 = performance.now(), dur = calm() ? ms * 0.6 : ms;
      const stepF = (now) => {
        const t = Math.min(1, (now - t0) / dur), e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
        E.c = { x: c0.x + (c.x - c0.x) * e, y: c0.y + (c.y - c0.y) * e }; E.rot = r0 + dr * e;
        E.place();
        if (t < 1) requestAnimationFrame(stepF); else { E.rot = norm(rot); E.place(); res(); }
      };
      requestAnimationFrame(stepF);
    });
  }

  // ── bút chì ──────────────────────────────────────────────────────────────
  function pencilAt(parent, p) {
    const g = el('g', { class: 'dp-pencil', transform: `translate(${X(p.x)} ${X(p.y)})` }, parent);
    el('circle', { r: 30, class: 'dp-pencil-ring' }, g);
    const t = el('text', { x: 14, y: -16, class: 'dp-pencil-icon' }, g);
    t.textContent = '✏️';
    el('circle', { r: 7, fill: PEN }, g);
    return g;
  }

  // ── các bước ─────────────────────────────────────────────────────────────
  const dots = $('.dp-dots');
  const stepNo = $('.dp-stepno');
  function paintDots() {
    dots.innerHTML = steps.map((_, i) => `<i class="${i < k ? 'dp-dot-done' : i === k ? 'dp-dot-on' : ''}"></i>`).join('');
  }
  function setTask(s) {
    $('.dp-say').innerHTML = s ? sayOf(s, k, d) : `🎉 Em đã vẽ xong${d.title ? ` ${d.title}` : ''}!`;
    const onBase = s?.kind === 'perp' && lineDist(st.P[s.through], lineOf(st, s.base)) < 0.01;
    howText = s ? howOf(s, onBase) : '📒 Bây giờ em lấy thước và ê ke, vẽ hình này vào vở theo đúng các bước vừa làm.';
    stepNo.textContent = s ? `Bước ${k + 1}/${steps.length}` : 'Xong';
    stepNo.classList.toggle('dp-stepno-done', !s);
  }
  function setButtons(kind) {
    const eke = kind === 'perp' || kind === 'check';
    turnBtn.style.visibility = eke ? 'visible' : 'hidden';
    goBtn.style.visibility = kind === 'perp' || kind === 'end' ? 'visible' : 'hidden';
    goBtn.innerHTML = kind === 'end' ? '✓ Xong' : '✏️ Kẻ<span class="dp-long"> theo cạnh ê ke</span>';
    goBtn.classList.remove('dp-ready');
    goBtn.classList.toggle('dp-go-end', kind === 'end');
  }

  function startStep() {
    $('.dp-task').classList.remove('dp-task-done');
    tool?.destroy?.();
    tool = null;
    gTool.innerHTML = ''; gFx.innerHTML = '';
    paintDots();
    if (k >= steps.length) { setTask(null); setButtons('end'); say(''); finish(); return; }
    const s = steps[k];
    setTask(s);
    say('');
    setButtons(s.kind);
    tool = TOOLS[s.kind](s);
  }

  /** Bước k làm đúng: hình nhận kết quả, điền ô, sang bước sau. */
  function commit(fresh = {}, wait = 900) {
    const s = steps[k];
    const prevSegs = st.segs.length;
    const meas = st.meas;
    st = structuredClone(snaps[k + 1]);
    Object.assign(st.meas, meas, snaps[k + 1].meas);
    if (s.kind === 'join') fresh.seg = prevSegs; // đoạn kẻ theo thước (seg) đã hiện dần khi kéo bút
    k++;
    memo.done = k;
    tool?.destroy?.();
    tool = null;
    gTool.innerHTML = '';
    render(fresh);
    paintDots();
    changed();
    soundStep();
    busy = true;
    later(() => { busy = false; startStep(); }, wait);
  }
  function wrong(html) {
    soundWrong();
    say(html, 'dp-bad');
  }

  function finish() {
    goBtn.onclick = ctx.close;
    $('.dp-task').classList.add('dp-task-done');
    soundDone();
  }
  function reset() {
    timers.forEach(clearTimeout);
    busy = false;
    k = 0;
    memo.done = 0;
    memo.meas = {};
    st = structuredClone(snaps[0]);
    render();
    startStep();
  }

  // ── công cụ từng loại bước ───────────────────────────────────────────────
  const TOOLS = {
    seg: (s) => rulerTool(s, st.P[s.from] || { x: s.at[0], y: s.at[1] }, s.dir, s.len, true, Math.max(5, Math.ceil(s.len) + 2)),
    mark: (s) => rulerTool(s, st.P[s.from], dirOf(st.P[s.from], st.P[s.toward]), s.len, false, Math.ceil(dist(st.P[s.from], st.P[s.toward])) + 1),
    perp: (s) => ekeTool(s),
    check: (s) => ekeTool(s),
    join: (s) => pickTool(s),
    measure: (s) => pickTool(s),
    meet: (s) => pickTool(s),
  };

  /** Kéo bút dọc thước tới đúng vạch. */
  function rulerTool(s, o, dd, len, draw, RL) {
    const fresh = !st.P[s.from];
    const side = sideAway(o, dd);
    const g = el('g', { class: 'dp-in' }, gTool);
    rulerAt(g, o, dd, RL, side);
    const preview = el('line', { x1: X(o.x), y1: X(o.y), x2: X(o.x), y2: X(o.y), class: draw ? 'dp-seg dp-seg-live' : 'dp-hide' }, g);
    if (fresh) { el('circle', { cx: X(o.x), cy: X(o.y), r: 7, fill: INK }, g); const t = el('text', { x: X(o.x - 0.45), y: X(o.y - 0.45), class: 'dp-name' }, g); t.textContent = s.from; }
    const pen = pencilAt(g, o);
    let tip = 0, drag = false;
    const readout = el('g', {}, g);
    const setTip = (t) => {
      t = Math.max(0, Math.min(RL, Math.round(t * 10) / 10));
      if (Math.abs(t - Math.round(t)) <= 0.15) t = Math.round(t); // hít vào vạch xăng-ti-mét
      if (t !== tip) soundTick();
      tip = t;
      const p = along(o, dd, t);
      pen.setAttribute('transform', `translate(${X(p.x)} ${X(p.y)})`);
      preview.setAttribute('x2', X(p.x)); preview.setAttribute('y2', X(p.y));
      readout.innerHTML = '';
      if (t > 0) { const u = uv(dd); const n = { x: u.y * side, y: -u.x * side }; chip(readout, { x: p.x + n.x * 0.7, y: p.y + n.y * 0.7 }, lenText(t)); }
    };
    const proj = (p) => { const u = uv(dd); return (p.x - o.x) * u.x + (p.y - o.y) * u.y; };
    const near = (p) => {
      const t = proj(p), q = along(o, dd, t);
      return (t > -0.8 && t < RL + 0.8 && dist(p, q) < 1.8) || dist(p, along(o, dd, tip)) < 0.9;
    };
    const check = () => {
      if (Math.abs(tip - len) < 0.01) {
        say(`✔ ${draw ? `${s.from}${s.to}` : `${s.from}${s.name}`} = ${len} cm`, 'dp-good');
        commit({ pt: draw ? s.to : s.name });
      } else if (tip > 0) {
        wrong(`${draw ? 'Đoạn thẳng đang dài' : 'Điểm đang cách ' + s.from} <b>${lenText(tip)}</b>. Cần <b>${len} cm</b>: kéo ✏️ tới vạch ${len}.`);
      }
    };
    return {
      down(p) { if (!near(p)) { wrong('Kéo ✏️ dọc mép thước.'); blink(pen); return false; } drag = true; say(''); setTip(proj(p)); return true; },
      move(p) { if (drag) setTip(proj(p)); },
      up() { if (!drag) return; drag = false; check(); },
      solve() { setTip(len); check(); },
    };
  }

  /** Ê ke: vẽ đường vuông góc (perp) hoặc kiểm tra góc ở chỗ hai đường cắt nhau (check). */
  function ekeTool(s) {
    const E = makeEke();
    const isCheck = s.kind === 'check';
    let L = null, target, lines2;
    if (isCheck) {
      lines2 = s.lines.map((id) => lineOf(st, id));
      target = meetOf(lines2[0], lines2[1]);
    } else {
      L = lineOf(st, s.base);
      target = foot(st.P[s.through], L);
    }
    let aligned = false, drag = null;
    const status = () => {
      E.g.classList.toggle('dp-eke-ok', aligned && (!isCheck || verdictOk()));
      E.g.classList.toggle('dp-eke-gap', aligned && isCheck && !verdictOk());
      goBtn.classList.toggle('dp-ready', aligned && !isCheck);
    };
    const verdictOk = () => isPerp(lines2[0].d, lines2[1].d);
    const snap = (c) => {
      if (isCheck) {
        if (dist(c, target) < 0.8) {
          E.c = { ...target };
          const r1 = nearestAligned(E.rot, lines2[0].d), r2 = nearestAligned(E.rot, lines2[1].d);
          E.rot = Math.abs(diff(E.rot, r1)) <= Math.abs(diff(E.rot, r2)) ? r1 : r2;
          return true;
        }
        E.c = c;
        return false;
      }
      if (dist(c, target) < 0.8) { E.c = { ...target }; E.rot = nearestAligned(E.rot, L.d); return true; }
      if (lineDist(c, L) < 0.55) { E.c = foot(c, L); E.rot = nearestAligned(E.rot, L.d); return false; }
      E.c = c;
      return false;
    };
    const gapFx = () => {
      gFx.innerHTML = '';
      if (!aligned || !isCheck) return;
      // cạnh kia của ê ke so với đường còn lại: khít → ∟ xanh, hở → nêm đỏ
      const legs = E.legs();
      const onFirst = legs.findIndex((g) => Math.abs(diff(g, lines2[0].d)) < 0.6 || Math.abs(Math.abs(diff(g, lines2[0].d)) - 180) < 0.6) >= 0;
      const other = onFirst ? lines2[1] : lines2[0];
      if (verdictOk()) {
        say(`✔ Cạnh ê ke khít với cả ${s.lines[0]} và ${s.lines[1]}: hai đường <b>vuông góc</b> với nhau.`, 'dp-good');
      } else {
        const leg = legs.find((g) => isPerp(g, onFirst ? lines2[0].d : lines2[1].d));
        let od = other.d; if (Math.abs(diff(od, leg)) > 90) od = norm(od + 180);
        const p1 = along(target, leg, 2), p2 = along(target, od, 2);
        el('path', { d: `M${X(target.x)} ${X(target.y)} L${X(p1.x)} ${X(p1.y)} L${X(p2.x)} ${X(p2.y)} Z`, fill: 'rgba(220,38,38,.25)', stroke: BAD, 'stroke-width': 3 }, gFx);
        say(`✘ Cạnh ê ke <b>không khít</b>, còn khe hở: hai đường không vuông góc.`, 'dp-bad');
      }
    };
    let done = false;
    const finishCheck = () => {
      if (done) return;
      done = true;
      gapFx();
      commit({}, 2200);
    };
    const go = async () => {
      if (busy) return;
      if (!aligned) {
        const onBase = lineDist(st.P[s.through], L) < 0.01;
        wrong(onBase ? `Đặt ê ke trước: góc vuông chạm <b>${s.through}</b>, một cạnh nằm trên <b>${s.base}</b>.`
          : `Đặt ê ke trước: một cạnh nằm trên <b>${s.base}</b>, trượt tới khi cạnh kia chạm <b>${s.through}</b>.`);
        blink(E.g);
        return;
      }
      busy = true;
      goBtn.classList.remove('dp-ready');
      say('');
      // bút chì chạy theo cạnh ê ke
      const dd = norm(L.d + 90);
      const [p0, p1] = clip(target, dd);
      const ln = el('line', { x1: X(p0.x), y1: X(p0.y), x2: X(p1.x), y2: X(p1.y), class: s.helper ? 'dp-line-help' : 'dp-line' }, gFx);
      const total = dist(p0, p1) * U;
      ln.style.strokeDasharray = `${total}`;
      ln.style.strokeDashoffset = `${total}`;
      const pen = pencilAt(gFx, p0);
      const dur = calm() ? 700 : 1100, t0 = performance.now();
      await new Promise((res) => {
        const f = (now) => {
          const t = Math.min(1, (now - t0) / dur);
          ln.style.strokeDashoffset = `${total * (1 - t)}`;
          const p = { x: p0.x + (p1.x - p0.x) * t, y: p0.y + (p1.y - p0.y) * t };
          pen.setAttribute('transform', `translate(${X(p.x)} ${X(p.y)})`);
          if (t < 1) requestAnimationFrame(f); else res();
        };
        requestAnimationFrame(f);
      });
      busy = false;
      gFx.innerHTML = '';
      say(`✔ Đường thẳng đi qua ${s.through}, vuông góc với ${s.base}${s.name ? `, cắt ${s.base} tại ${s.name}` : ''}.`, 'dp-good');
      commit({ pt: s.name }, 1300);
    };
    goBtn.onclick = go;
    turnBtn.onclick = () => {
      if (busy) return;
      E.rot = norm(E.rot + 90);
      aligned = snap(E.c);
      E.place(); status(); gapFx();
      if (aligned && isCheck) finishCheck();
    };
    const solve = async () => {
      await slideEke(E, target, nearestAligned(E.rot, (isCheck ? lines2[0] : L).d), 300);
      aligned = true; status();
      if (isCheck) finishCheck(); else await go();
    };
    return {
      down(p) {
        if (!E.hit(p)) { blink(E.g); return false; }
        drag = { off: { x: E.c.x - p.x, y: E.c.y - p.y }, p0: p, t0: performance.now(), moved: false };
        say('');
        return true;
      },
      move(p) {
        if (!drag) return;
        if (dist(p, drag.p0) > 0.15) drag.moved = true;
        const was = aligned;
        aligned = snap({ x: p.x + drag.off.x, y: p.y + drag.off.y });
        if (aligned && !was) soundTick();
        E.place(); status();
      },
      up() {
        if (!drag) return;
        const tap = !drag.moved && performance.now() - drag.t0 < 350;
        drag = null;
        if (tap) { E.rot = norm(E.rot + 90); aligned = snap(E.c); E.place(); }
        status();
        if (aligned) {
          if (isCheck) finishCheck();
          else say('✔ Ê ke đã đặt đúng. Bấm <b>✏️ Kẻ theo cạnh ê ke</b>.', 'dp-good');
        }
      },
      solve,
      destroy() { goBtn.onclick = null; turnBtn.onclick = null; },
    };
  }

  /** Chạm điểm / đoạn: nối hai điểm, đo đoạn thẳng, chạm chỗ hai đường cắt nhau. */
  function pickTool(s) {
    const g = el('g', { class: 'dp-in' }, gTool);
    let first = null, rubber = null, downAt = null;
    const need = s.kind === 'measure' ? s.segs.map(keyOf) : [];
    const ptNear = (p, r = 0.6) => {
      let best = null, bd = r;
      Object.entries(st.P).forEach(([n, q]) => { const e = dist(p, q); if (e < bd) { bd = e; best = n; } });
      return best;
    };
    const segNear = (p) => st.segs.map(([a, b]) => [a, b]).find(([a, b]) => {
      const pa = st.P[a], pb = st.P[b], L = { a: pa, d: dirOf(pa, pb) }, f = foot(p, L);
      const t = dist(pa, f) + dist(f, pb) - dist(pa, pb);
      return t < 0.05 && dist(p, f) < 0.4;
    });
    const ring = (n, cls = 'dp-ring') => { const q = st.P[n]; el('circle', { cx: X(q.x), cy: X(q.y), r: 22, class: cls }, g); };
    const clearSel = () => { g.innerHTML = ''; first = null; rubber = null; };
    const measureSeg = (a, b) => {
      const key = keyOf(a + b);
      if (!findSeg(key)) { wrong(`Chưa có đoạn thẳng <b>${a}${b}</b>. Chạm hai đầu của một đoạn thẳng.`); return; }
      const pa = st.P[a], pb = st.P[b], v = dist(pa, pb);
      gFx.innerHTML = '';
      const dd = dirOf(pa, pb);
      const side = sideAway({ x: (pa.x + pb.x) / 2, y: (pa.y + pb.y) / 2 }, dd);
      rulerAt(gFx, pa, dd, Math.max(4, Math.ceil(v) + 1), side).classList.add('dp-in');
      st.meas[key] = v;
      memo.meas[key] = v;
      render({ meas: key });
      say(`📏 ${a}${b} = <b>${lenText(v)}</b>`, 'dp-good');
      soundStep();
      if (need.length && need.every((n) => st.meas[n] != null)) {
        const ls = need.map((n) => st.meas[n]);
        const same = ls.every((x) => Math.abs(x - ls[0]) < 0.05);
        if (need.length > 1) say(`📏 ${s.segs.map((x) => `${x} = ${lenText(st.meas[keyOf(x)])}`).join(', ')}: ${same ? 'hai đoạn <b>bằng nhau</b>.' : 'hai đoạn <b>không bằng nhau</b>.'}`, 'dp-good');
        commit({}, 2400);
      }
    };
    const tryJoin = (a, b) => {
      if (keyOf(a + b) !== keyOf(s.a + s.b)) { wrong(`Đề bảo nối <b>${s.a}</b> với <b>${s.b}</b>.`); clearSel(); return; }
      clearSel();
      // thước đặt dọc hai điểm, bút kẻ
      const pa = st.P[s.a], pb = st.P[s.b], dd = dirOf(pa, pb);
      rulerAt(gFx, pa, dd, Math.max(4, Math.ceil(dist(pa, pb)) + 1), sideAway({ x: (pa.x + pb.x) / 2, y: (pa.y + pb.y) / 2 }, dd)).classList.add('dp-in');
      later(() => { gFx.innerHTML = ''; }, 900);
      say(`✔ Nối ${s.a} với ${s.b}.`, 'dp-good');
      commit({}, 1000);
    };
    const tapAt = (p) => {
      if (s.kind === 'meet') {
        const at = meetOf(lineOf(st, s.meet[0]), lineOf(st, s.meet[1]));
        if (dist(p, at) < 0.7) { say(`✔ Điểm ${s.name}`, 'dp-good'); commit({ pt: s.name }); }
        else wrong(`Chạm đúng chỗ đường <b>${s.meet[0]}</b> gặp đường <b>${s.meet[1]}</b>.`);
        return;
      }
      const n = ptNear(p);
      if (!n) {
        if (s.kind === 'measure') { const sg = segNear(p); if (sg) { clearSel(); measureSeg(sg[0], sg[1]); return; } }
        clearSel();
        return;
      }
      if (!first) { first = n; ring(n); soundTick(); return; }
      if (n === first) { clearSel(); return; }
      const a = first;
      clearSel();
      if (s.kind === 'join') tryJoin(a, n); else measureSeg(a, n);
    };
    const solve = () => {
      if (s.kind === 'meet') tapAt(meetOf(lineOf(st, s.meet[0]), lineOf(st, s.meet[1])));
      else if (s.kind === 'join') tryJoin(s.a, s.b);
      else s.segs.forEach((x) => { if (st.meas[keyOf(x)] == null) measureSeg(x[0], x[1]); });
    };
    return {
      down(p) {
        downAt = p;
        if (s.kind !== 'meet' && !first) {
          const n = ptNear(p);
          if (n) { first = n; ring(n); rubber = el('line', { x1: X(st.P[n].x), y1: X(st.P[n].y), x2: X(p.x), y2: X(p.y), class: 'dp-rubber' }, g); soundTick(); first = n; downAt = { ...p, fromPt: n }; }
        }
        return true;
      },
      move(p) { if (rubber && downAt?.fromPt) { rubber.setAttribute('x2', X(p.x)); rubber.setAttribute('y2', X(p.y)); } },
      up(p) {
        const from = downAt?.fromPt;
        downAt = null;
        if (from) {
          rubber?.remove(); rubber = null;
          const n = ptNear(p);
          if (n && n !== from) { clearSel(); if (s.kind === 'join') tryJoin(from, n); else measureSeg(from, n); return; }
          if (dist(p, st.P[from]) < 0.6) return; // chạm một điểm: giữ chọn, chờ điểm thứ hai
          clearSel();
          return;
        }
        tapAt(p);
      },
      solve,
    };
  }

  function blink(node) {
    node.classList.remove('dp-blink'); void node.getBBox?.(); node.classList.add('dp-blink');
    later(() => node.classList.remove('dp-blink'), 1400);
  }

  // ── chạm / kéo ───────────────────────────────────────────────────────────
  const toCm = (e) => { const q = svg.createSVGPoint(); q.x = e.clientX; q.y = e.clientY; const r = q.matrixTransform(svg.getScreenCTM().inverse()); return { x: r.x / U, y: r.y / U }; };
  let active = false;
  const onDown = (e) => {
    if (busy || !tool) return;
    if (tool.down(toCm(e)) === false) return;
    active = true;
    try { svg.setPointerCapture(e.pointerId); } catch { /* */ }
    e.preventDefault();
  };
  const onMove = (e) => { if (active && tool) tool.move(toCm(e)); };
  const onUp = (e) => { if (!active) return; active = false; tool?.up(toCm(e)); };
  svg.addEventListener('pointerdown', onDown);
  svg.addEventListener('pointermove', onMove);
  svg.addEventListener('pointerup', onUp);
  svg.addEventListener('pointercancel', onUp);
  const onReset = () => { if (!busy) reset(); };
  $('.dp-reset').onclick = onReset;

  render();
  startStep();

  return {
    destroy() {
      timers.forEach(clearTimeout);
      tool?.destroy?.();
      svg.removeEventListener('pointerdown', onDown);
      svg.removeEventListener('pointermove', onMove);
      svg.removeEventListener('pointerup', onUp);
      svg.removeEventListener('pointercancel', onUp);
    },
    // dùng cho trang thử (scripts/draw-dev.html): làm đúng bước đang mở
    api: { solve: () => tool?.solve?.(), step: () => k, steps: steps.length, busy: () => busy },
  };
}

function injectStyles() {
  if (document.getElementById('dp-styles')) return;
  const style = document.createElement('style');
  style.id = 'dp-styles';
  style.textContent = `
    .gt-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin: 6px auto 0; }
    .gw-app .gw-pin-zone .gw-card-has-img > .gt-row { grid-column: 2; }
    .dp-open {
      padding: 4px 12px; border: 1.5px solid #2563EB; border-radius: 999px; background: #EFF6FF; color: #1E40AF;
      font: 800 0.9rem Quicksand, sans-serif; cursor: pointer;
    }
    .dp-open:hover { background: #DBEAFE; }
    .dp-locked { display: none !important; }
    .dp-cta {
      display: block; margin: 8px auto 0; padding: 0.55rem 1.2rem; border: none; border-radius: 999px; background: #2563EB; color: #fff;
      font: 800 1rem Quicksand, sans-serif; cursor: pointer; box-shadow: 0 3px 0 #1E40AF;
    }
    .e3-blank-input.dp-done-input { flex: 0 0 auto; width: 10rem; max-width: 100%; cursor: pointer; text-align: center; }
    .gt-filled { animation: dp-filled 1.4s ease-out; }
    @keyframes dp-filled { 0%, 40% { background: #FEF08A; box-shadow: 0 0 0 4px #FDE047; } }

    .dp-overlay {
      position: fixed; inset: 0; z-index: 5000; background: rgba(15, 23, 42, 0.8);
      display: flex; align-items: stretch; justify-content: center; padding: 10px;
    }
    .dp-panel {
      background: #fff; border-radius: 1rem; box-shadow: 0 10px 40px rgba(0,0,0,.35);
      width: min(1300px, 100%); height: 100%; overflow: hidden;
      padding: 0.6rem 0.8rem 0.7rem; display: flex; flex-direction: column; gap: 0.45rem;
    }
    .dp-head { flex: none; display: flex; align-items: center; gap: 0.5rem; }
    .dp-tabs { flex: 1 1 auto; display: flex; justify-content: center; gap: 4px; padding: 3px; border-radius: 999px; background: #F1F5F9; min-width: 0; overflow-x: auto; }
    .dp-tabs.dp-single { background: transparent; }
    .dp-title { font: 800 1.15rem Quicksand, sans-serif; color: #0F172A; padding: 0.35rem 0; }
    .dp-tab {
      flex: 0 0 auto; padding: 0.4rem 1.1rem; border-radius: 999px; border: none; background: transparent;
      font: 800 1rem Quicksand, sans-serif; color: #475569; cursor: pointer; white-space: nowrap;
    }
    .dp-tab.dp-on { background: #2563EB; color: #fff; box-shadow: 0 2px 6px rgba(37,99,235,.35); }
    .dp-close {
      flex: none; height: 2.3rem; padding: 0 1rem; border-radius: 1.15rem; border: none; background: #10B981; color: #fff;
      font: 700 0.95rem Quicksand, sans-serif; cursor: pointer;
    }
    .dp-task {
      flex: none; display: flex; align-items: center; gap: 0.7rem; padding: 0.45rem 0.8rem; border-radius: 0.9rem;
      background: #EFF6FF; box-shadow: inset 0 0 0 2px #BFDBFE; height: 5.6rem; box-sizing: border-box;
    }
    .dp-stepno {
      flex: none; padding: 0.3rem 0.7rem; border-radius: 999px; background: #2563EB; color: #fff;
      font: 800 0.95rem Quicksand, sans-serif; white-space: nowrap;
    }
    .dp-task-text { flex: 1; min-width: 0; max-height: 100%; overflow-y: auto; }
    .dp-say { font: 700 1.15rem/1.35 Quicksand, sans-serif; color: #0F172A; }
    .dp-say b { color: #1D4ED8; font-weight: 900; }
    .dp-how { font: 600 0.9rem/1.35 Quicksand, sans-serif; color: #64748B; min-height: 1.35em; }
    .dp-how.dp-msg { font-weight: 700; font-size: 0.98rem; color: #0F172A; }
    .dp-how.dp-good { color: #047857; }
    .dp-how.dp-bad { color: #B45309; }
    .dp-how b { font-weight: 900; }
    .dp-task-done { background: #ECFDF5; box-shadow: inset 0 0 0 2px #6EE7B7; }
    .dp-task-done .dp-say { color: #047857; font-weight: 800; }
    .dp-task-done .dp-how { color: #334155; font-weight: 700; font-size: 0.98rem; }
    .dp-stepno-done { background: #10B981; }
    .dp-go.dp-go-end { background: #10B981; box-shadow: 0 3px 0 #047857; animation: none; }
    .dp-stage {
      position: relative; flex: 1 1 0; min-height: 0; border-radius: 0.8rem; overflow: hidden;
      background: #F8FAFC; box-shadow: inset 0 0 0 1.5px #E2E8F0;
    }
    .dp-svg { display: block; width: 100%; height: 100%; touch-action: none; user-select: none; -webkit-user-select: none; overflow: visible; }
    .dp-grid { stroke: #E0F2FE; stroke-width: 2; fill: none; }
    .dp-line { stroke: ${PEN}; stroke-width: 3.5; stroke-linecap: round; }
    .dp-line-help { stroke: ${HELP}; stroke-width: 3; stroke-dasharray: 14 9; stroke-linecap: round; }
    .dp-line-given { stroke: ${INK}; stroke-width: 4; stroke-linecap: round; }
    .dp-seg { stroke: ${INK}; stroke-width: 6; stroke-linecap: round; }
    .dp-seg-live { stroke: ${PEN}; }
    .dp-hide { display: none; }
    .dp-name { font: 800 34px Quicksand, sans-serif; fill: #0F172A; text-anchor: middle; dominant-baseline: central; paint-order: stroke; stroke: #FFFEF7; stroke-width: 7px; pointer-events: none; }
    .dp-name-line { fill: #1D4ED8; }
    .dp-chip rect { fill: #fff; stroke: #0EA5E9; stroke-width: 3; }
    .dp-chip text { font: 800 24px Quicksand, sans-serif; fill: #0369A1; text-anchor: middle; dominant-baseline: central; }
    .dp-ruler-body { fill: rgba(254, 249, 195, 0.92); stroke: #CA8A04; stroke-width: 2.5; }
    .dp-ruler-tick { stroke: #713F12; stroke-width: 2; }
    .dp-ruler-num { font: 800 22px Quicksand, sans-serif; fill: #713F12; text-anchor: middle; dominant-baseline: central; }
    .dp-ruler-cm { font: 700 16px Quicksand, sans-serif; fill: #A16207; text-anchor: middle; dominant-baseline: central; }
    .dp-pencil { cursor: grab; }
    .dp-pencil-ring { fill: rgba(37, 99, 235, 0.14); stroke: ${PEN}; stroke-width: 3; stroke-dasharray: 6 5; }
    .dp-pencil-icon { font-size: 40px; pointer-events: none; }
    .dp-eke-body { cursor: grab; }
    .dp-eke-tri { fill: rgba(253, 224, 71, 0.55); stroke: #A16207; stroke-width: 4; stroke-linejoin: round; }
    .dp-eke-hole { fill: rgba(255,255,255,.75); stroke: #A16207; stroke-width: 3; }
    .dp-eke-tick { stroke: #A16207; stroke-width: 2; }
    .dp-eke-ok .dp-eke-tri { fill: rgba(134, 239, 172, 0.6); stroke: #15803D; }
    .dp-eke-gap .dp-eke-tri { fill: rgba(254, 202, 202, 0.6); stroke: ${BAD}; }
    .dp-ring { fill: rgba(37, 99, 235, 0.15); stroke: ${PEN}; stroke-width: 4; }
    .dp-rubber { stroke: ${PEN}; stroke-width: 4; stroke-dasharray: 10 8; stroke-linecap: round; }
    .dp-in { animation: dp-in .35s ease-out; }
    @keyframes dp-in { from { opacity: 0; } }
    .dp-pop { animation: dp-pop .5s ease-out; transform-box: fill-box; transform-origin: center; }
    @keyframes dp-pop { 0% { opacity: 0; transform: scale(.4); } 60% { opacity: 1; transform: scale(1.2); } }
    .dp-blink { animation: dp-blink .45s ease-in-out 3; }
    @keyframes dp-blink { 50% { opacity: .35; } }
    .dp-foot { flex: none; display: flex; align-items: center; justify-content: space-between; gap: 0.8rem; min-height: 3.3rem; }
    .dp-dots { display: flex; gap: 6px; flex-wrap: wrap; }
    .dp-dots i { width: 14px; height: 14px; border-radius: 50%; background: #E2E8F0; }
    .dp-dots i.dp-dot-done { background: #10B981; }
    .dp-dots i.dp-dot-on { background: #2563EB; box-shadow: 0 0 0 3px #BFDBFE; }
    .dp-btns { display: flex; align-items: center; gap: 0.5rem; }
    .dp-go, .dp-turn {
      height: 3.1rem; padding: 0 1.1rem; border-radius: 1rem; border: none; font: 800 1.05rem Quicksand, sans-serif; cursor: pointer;
    }
    .dp-go { background: #CBD5E1; color: #fff; }
    .dp-go.dp-ready { background: #2563EB; box-shadow: 0 3px 0 #1E40AF; animation: dp-glow 1.2s ease-in-out infinite; }
    @keyframes dp-glow { 50% { box-shadow: 0 3px 0 #1E40AF, 0 0 0 6px #BFDBFE; } }
    .dp-turn { background: #FEF3C7; color: #92400E; box-shadow: inset 0 0 0 2px #FCD34D; }
    .dp-reset {
      width: 3rem; height: 3rem; border-radius: 50%; border: 2px solid #CBD5E1; background: #fff;
      font: 800 1.4rem Quicksand, sans-serif; color: #334155; cursor: pointer;
    }
    /* điện thoại ngang (thấp): nút sang cột bên phải giấy vẽ, chữ nhỏ lại */
    @media (max-height: 520px) and (orientation: landscape) {
      .dp-overlay { padding: 4px; }
      .dp-panel {
        display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto auto 1fr;
        gap: 0.35rem 0.5rem; padding: 0.4rem 0.5rem;
      }
      .dp-head { grid-column: 1 / -1; }
      .dp-task { grid-column: 1 / -1; height: 4.4rem; padding: 0.3rem 0.6rem; }
      .dp-stage { grid-column: 1; grid-row: 3; }
      .dp-foot { grid-column: 2; grid-row: 3; flex-direction: column; justify-content: flex-end; align-items: stretch; min-height: 0; }
      .dp-btns { flex-direction: column; align-items: stretch; }
      .dp-dots { display: none; }
      .dp-long { display: none; }
      .dp-title, .dp-tab { font-size: 0.9rem; padding-top: 0.2rem; padding-bottom: 0.2rem; }
      .dp-close { height: 1.9rem; }
      .dp-say { font-size: 0.9rem; line-height: 1.25; }
      .dp-how { font-size: 0.78rem; line-height: 1.25; }
      .dp-go, .dp-turn { height: 2.7rem; padding: 0 0.6rem; font-size: 0.95rem; }
      .dp-reset { align-self: center; width: 2.6rem; height: 2.6rem; }
    }
    @media (prefers-reduced-motion: reduce) {
      .dp-go.dp-ready { animation: none; box-shadow: 0 3px 0 #1E40AF, 0 0 0 5px #BFDBFE; }
    }
    /* điện thoại dọc: nút gọn, chấm bước ẩn (đã có "Bước k/n") */
    @media (max-width: 600px) {
      .dp-long { display: none; }
      .dp-dots { display: none; }
      .dp-foot { justify-content: flex-end; }
      .dp-panel { padding: 0.5rem; }
      .dp-task { height: 7.4rem; padding: 0.4rem 0.6rem; gap: 0.5rem; }
      .dp-stepno { font-size: 0.8rem; padding: 0.25rem 0.5rem; }
      .dp-say { font-size: 1rem; }
      .dp-how { font-size: 0.8rem; }
      .dp-go, .dp-turn { height: 2.8rem; padding: 0 0.7rem; font-size: 0.92rem; }
      .dp-dots i { width: 10px; height: 10px; }
    }
  `;
  document.head.appendChild(style);
}
