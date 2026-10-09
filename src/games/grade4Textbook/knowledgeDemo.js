/**
 * Ví dụ "xem từng bước" trong lớp 📘 Kiến thức (SGK Toán 4): thay đoạn chữ dài bằng bảng chữ số xếp thẳng cột
 * theo hàng, mỗi lần bấm Tiếp thì sáng một cột và có lời giải thích (như hướng dẫn của trò chơi).
 *
 *   KNOWLEDGE['bai-9'].demos = [{ kind: 'compare', a: 693251, b: 693500 }]
 *   kind: 'compare' (so sánh a, b) | 'add' (a + b) | 'sub' (a − b) | 'mul1' (a × b, b một chữ số)
 *
 * demoHtml(spec) trả về khung giữ chỗ; bindDemos(host) dựng các bước và gắn nút.
 * Mọi hàng của bảng có sẵn từ bước đầu (chữ số chưa viết là ô trống), nên bảng không đổi cỡ giữa các bước.
 */

const PLACES = ['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn', 'trăm nghìn', 'triệu', 'chục triệu', 'trăm triệu'];
const esc = (t) => String(t).replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fmt = (n) => { const s = String(n); return s.length <= 4 ? s : s.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); };
const ROW_H = { head: 'auto', carry: '0.6em', borrow: '0.6em', num: '1.25em', sign: '0.95em', line: '0.4em' };

/** Bảng: các hàng (layout) × W cột chữ số; mỗi bước là một bản chụp (frame) của bảng. */
function board(layout, W) {
  const cells = {};
  layout.forEach(r => { cells[r.k] = Array.from({ length: W }, () => null); });
  const b = { layout, W, cells, bands: [], result: '', frames: [] };
  b.put = (k, n) => { const str = String(n); for (let j = 0; j < str.length; j++) cells[k][W - str.length + j] = { t: str[j] }; };
  b.snap = (caption) => {
    b.frames.push(JSON.parse(JSON.stringify({ cells, bands: b.bands, result: b.result, caption })));
    Object.values(cells).forEach(row => row.forEach(c => { if (c) c.isNew = false; }));
    b.bands.forEach(x => { x.isNew = false; });
  };
  if (cells.head) cells.head = cells.head.map((_, i) => ({ t: PLACES[W - 1 - i] || '' }));
  return b;
}

const digitAt = (n, W, i) => { const s = String(n); const k = i - (W - s.length); return k >= 0 ? Number(s[k]) : null; };

function compareDemo({ a, b }) {
  const la = String(a).length, lb = String(b).length, W = Math.max(la, lb);
  const B = board([{ k: 'head', kind: 'head' }, { k: 'a', kind: 'num' }, { k: 's', kind: 'sign' }, { k: 'b', kind: 'num' }], W);
  B.put('a', a); B.put('b', b);
  const fa = fmt(a), fb = fmt(b);
  B.snap(`So sánh <b>${fa}</b> và <b>${fb}</b>. Viết hai số thẳng hàng với nhau theo từng hàng.`);
  const count = (on) => ['a', 'b'].forEach(k => { let n = 0; B.cells[k].forEach(c => { if (c) c.n = on ? ++n : 0; }); });
  count(true);
  if (la !== lb) {
    const [small, big] = a < b ? [fa, fb] : [fb, fa];
    for (let i = 0; i < Math.abs(la - lb); i++) B.bands.push({ col: i, tone: 'diff', isNew: true });
    B.snap(`Đếm chữ số: ${fa} có <b>${la} chữ số</b>, ${fb} có <b>${lb} chữ số</b>.`);
    B.result = `${fa} ${a < b ? '<' : '>'} ${fb}`;
    B.snap(`Số nào có ít chữ số hơn thì bé hơn. Vậy <b>${small} &lt; ${big}</b>, hay ${big} &gt; ${small}.`);
    return B;
  }
  B.snap(`Hai số đều có <b>${W} chữ số</b>. Ta so từng cặp chữ số cùng hàng, bắt đầu từ hàng cao nhất (bên trái).`);
  count(false);
  for (let i = 0; i < W; i++) {
    const da = digitAt(a, W, i), db = digitAt(b, W, i), place = PLACES[W - 1 - i];
    B.bands = B.bands.filter(x => x.tone === 'eq');
    if (da === db) {
      B.cells.s[i] = { t: '=', c: 'eq', isNew: true };
      B.bands.push({ col: i, tone: 'hot', isNew: true });
      B.snap(i < W - 1
        ? `Hàng ${place}: ${da} và ${db} <b>bằng nhau</b>, xét tiếp hàng bên phải.`
        : `Hàng ${place}: ${da} và ${db} <b>bằng nhau</b>. Mọi cặp đều bằng nhau.`);
      B.bands[B.bands.length - 1].tone = 'eq';
      continue;
    }
    const sg = da < db ? '<' : '>';
    B.cells.s[i] = { t: sg, c: 'diff', isNew: true };
    B.bands.push({ col: i, tone: 'diff', isNew: true });
    B.snap(`Hàng ${place}: <b>${da} ${sg === '<' ? '&lt;' : '&gt;'} ${db}</b>. Đây là cặp đầu tiên khác nhau, cặp này quyết định số nào lớn hơn.`);
    for (let j = i + 1; j < W; j++) ['a', 'b'].forEach(k => { B.cells[k][j].c = 'dim'; });
    B.result = `${fa} ${sg} ${fb}`;
    const rev = sg === '<' ? '&gt;' : '&lt;';
    B.snap(`Vậy <b>${fa} ${sg === '<' ? '&lt;' : '&gt;'} ${fb}</b>, hay ${fb} ${rev} ${fa}.${i < W - 1 ? ' Các hàng sau không cần so nữa.' : ''}`);
    return B;
  }
  B.result = `${fa} = ${fb}`;
  B.snap(`Vậy <b>${fa} = ${fb}</b>.`);
  return B;
}

/** Cộng, trừ, nhân với số có một chữ số: đặt tính rồi tính từ phải sang trái, đúng lời của sách. */
function columnDemo({ kind, a, b }) {
  const op = { add: '+', sub: '−', mul1: '×' }[kind];
  const res = kind === 'add' ? a + b : kind === 'sub' ? a - b : a * b;
  const la = String(a).length, W = Math.max(la, String(b).length, String(res).length);
  const layout = [{ k: 'head', kind: 'head' }];
  if (kind !== 'sub') layout.push({ k: 'carry', kind: 'carry' });
  layout.push({ k: 'a', kind: 'num' }, { k: 'b', kind: 'num', lead: op });
  if (kind === 'sub') layout.push({ k: 'borrow', kind: 'borrow' });
  layout.push({ k: 'line', kind: 'line' }, { k: 'r', kind: 'num' });
  const B = board(layout, W);
  B.put('a', a); B.put('b', b);
  const fa = fmt(a), fb = fmt(b), fr = fmt(res);
  const how = { add: 'Cộng', sub: 'Trừ', mul1: 'Nhân' }[kind];
  B.snap(kind === 'mul1'
    ? `Đặt tính: viết ${fb} dưới hàng đơn vị của ${fa}, viết dấu ×, kẻ gạch ngang. Nhân từ phải sang trái.`
    : `Đặt tính: viết ${fb} dưới ${fa}, các chữ số cùng hàng thẳng cột, viết dấu ${op}, kẻ gạch ngang. ${how} từ phải sang trái.`);
  const steps = kind === 'mul1' ? la : Math.max(la, String(b).length);
  let c = 0;
  for (let k = 0; k < steps; k++) {
    const i = W - 1 - k, last = k === steps - 1;
    const x = digitAt(a, W, i) ?? 0, y = digitAt(b, W, i);
    let txt, val, next = 0;
    if (kind === 'add') {
      const s = x + (y ?? 0) + c;
      txt = y === null ? (c ? `${x} thêm 1 bằng ${s}` : `hạ ${x}`) : `${x} cộng ${y} bằng ${x + y}${c ? `, thêm 1 bằng ${s}` : ''}`;
      if (s >= 10 && !last) { val = s % 10; next = 1; } else val = s;
    } else if (kind === 'sub') {
      const yy = (y ?? 0) + c, parts = [];
      if (c && y !== null) parts.push(`${y} thêm 1 bằng ${yy}`);
      if (x < yy) {
        B.cells.a[i].c = 'ten'; B.cells.a[i].isNew = true;
        parts.push(`${x + 10} trừ ${yy} bằng ${x + 10 - yy}`); val = x + 10 - yy; next = 1;
      } else if (y === null && !c) { parts.push(`hạ ${x}`); val = x; }
      else { parts.push(`${x} trừ ${yy} bằng ${x - yy}`); val = x - yy; }
      txt = parts.join(', ');
    } else {
      const p = b * x + c;
      txt = `${b} nhân ${x} bằng ${b * x}${c ? `, thêm ${c} bằng ${p}` : ''}`;
      if (p >= 10 && !last) { val = p % 10; next = Math.floor(p / 10); } else val = p;
    }
    const lead0 = kind === 'sub' && last && val === 0 && k > 0;
    if (!lead0) String(val).split('').reverse().forEach((d, j) => { B.cells.r[i - j] = { t: d, c: 'res', isNew: true }; });
    if (next) {
      const row = kind === 'sub' ? 'borrow' : 'carry';
      B.cells[row][i - 1] = { t: kind === 'sub' ? '+1' : String(next), isNew: true };
    }
    const write = lead0 ? 'không viết chữ số 0 ở đầu' : `viết ${val}${next ? ` nhớ ${next}` : ''}`;
    B.bands = [{ col: i, tone: 'hot', isNew: true }];
    B.snap(`Hàng ${PLACES[k]}: ${txt}, <b>${write}</b>.`);
    c = next;
  }
  B.bands = [];
  B.cells.r.forEach(x => { if (x) x.c = 'ok'; });
  B.result = `${fa} ${op} ${fb} = ${fr}`;
  B.snap(`Vậy <b>${fa} ${op} ${fb} = ${fr}</b>.`);
  return B;
}

const BUILD = { compare: compareDemo, add: columnDemo, sub: columnDemo, mul1: columnDemo };

const TITLE = {
  compare: s => `So sánh ${fmt(s.a)} và ${fmt(s.b)}`,
  add: s => `${fmt(s.a)} + ${fmt(s.b)}`,
  sub: s => `${fmt(s.a)} − ${fmt(s.b)}`,
  mul1: s => `${fmt(s.a)} × ${fmt(s.b)}`,
};

export function demoHtml(spec) {
  return `
    <div class="kd" data-spec='${JSON.stringify(spec)}'>
      <div class="kd-title">👆 ${TITLE[spec.kind](spec)}</div>
      <div class="kd-stage" role="button" tabindex="0" aria-label="Bước tiếp theo"></div>
      <div class="kd-result"></div>
      <p class="kd-cap" aria-live="polite"></p>
      <div class="kd-dots"></div>
      <div class="kd-nav">
        <button type="button" class="kd-prev" aria-label="Lùi một bước">◀</button>
        <button type="button" class="kd-next"></button>
      </div>
    </div>`;
}

function frameHtml(B, f) {
  const cols = ['auto'], colOf = [];
  for (let i = 0; i < B.W; i++) {
    if (i > 0 && (B.W - 1 - i) % 3 === 2) cols.push('0.3em'); // khoảng trống giữa hai lớp
    cols.push('var(--kc)'); colOf[i] = cols.length;
  }
  const rows = B.layout.map(r => ROW_H[r.kind]);
  let h = '';
  f.bands.forEach(x => {
    h += `<i class="kd-band is-${x.tone}${x.isNew ? ' is-new' : ''}" style="grid-column:${colOf[x.col]};grid-row:1/${rows.length + 1}"></i>`;
  });
  B.layout.forEach((r, ri) => {
    const row = ri + 1;
    if (r.lead) h += `<span class="kd-lead" style="grid-row:${row};grid-column:1">${r.lead}</span>`;
    if (r.kind === 'line') { h += `<i class="kd-line" style="grid-row:${row};grid-column:2/${cols.length + 1}"></i>`; return; }
    f.cells[r.k].forEach((c, i) => {
      if (!c) return;
      const cls = `kd-${r.kind}${c.c ? ` ${c.c}` : ''}${c.isNew ? ' is-new' : ''}`;
      h += `<span class="${cls}"${c.n ? ` data-n="${c.n}"` : ''} style="grid-row:${row};grid-column:${colOf[i]}">${esc(c.t)}</span>`;
    });
  });
  const ems = B.W * 1.3 + (cols.length - 1 - B.W) * 0.3 + 1.6; // bề ngang bảng tính theo em: cỡ chữ = khung chia cho số này
  return `<div class="kd-board" style="--n:${ems};grid-template-columns:${cols.join(' ')};grid-template-rows:${rows.join(' ')}">${h}</div>`;
}

/** Dựng các bước cho mọi khung .kd trong host và gắn nút Lùi / Tiếp (chạm vào bảng cũng là Tiếp). */
export function bindDemos(host) {
  injectStyles();
  host.querySelectorAll('.kd').forEach((el) => {
    const spec = JSON.parse(el.dataset.spec);
    const B = BUILD[spec.kind](spec);
    const stage = el.querySelector('.kd-stage'), cap = el.querySelector('.kd-cap'), out = el.querySelector('.kd-result');
    const prev = el.querySelector('.kd-prev'), next = el.querySelector('.kd-next'), dots = el.querySelector('.kd-dots');
    const n = B.frames.length;
    let at = 0;
    const show = () => {
      const f = B.frames[at];
      stage.innerHTML = frameHtml(B, f);
      out.innerHTML = f.result ? `<span class="${at === n - 1 ? 'is-new' : ''}">${esc(f.result)}</span>` : '';
      cap.innerHTML = f.caption;
      prev.disabled = at === 0;
      next.textContent = at === 0 ? '▶ Xem từng bước' : at === n - 1 ? '↺ Xem lại' : 'Tiếp ▶';
      next.classList.toggle('is-wait', at === 0);
      dots.innerHTML = B.frames.map((_, k) => `<i class="${k === at ? 'on' : k < at ? 'done' : ''}"></i>`).join('');
    };
    const go = (d) => { at = d > 0 && at === n - 1 ? 0 : Math.max(0, Math.min(n - 1, at + d)); show(); };
    next.onclick = () => go(1);
    prev.onclick = () => go(-1);
    stage.onclick = () => { if (at < n - 1) go(1); };
    stage.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stage.onclick(); } };
    show();
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
    .kd-stage { container-type: inline-size; display: flex; justify-content: center; padding: 0.4rem 0 0.2rem; cursor: pointer; -webkit-tap-highlight-color: transparent; outline: none; }
    .kd-board { --kc: 1.3em; display: grid; justify-items: center; align-items: center; font: 800 clamp(1.05rem, calc(100cqi / var(--n)), 2.3rem)/1 Quicksand, sans-serif; }
    .kd-board > * { z-index: 1; }
    .kd-band { z-index: 0; align-self: stretch; justify-self: stretch; border-radius: 0.3em; margin: 0 0.04em; }
    .kd-band.is-hot { background: #BAE6FD; box-shadow: inset 0 0 0 2px #38BDF8; }
    .kd-band.is-eq { background: #DCFCE7; }
    .kd-band.is-diff { background: #FED7AA; box-shadow: inset 0 0 0 2px #FB923C; }
    .kd-head { font-size: clamp(0.58rem, 0.29em, 0.72rem); font-weight: 700; color: #64748B; text-align: center; line-height: 1.15; padding: 0.25em 0.1em 0.5em; align-self: end; }
    .kd-num { position: relative; width: var(--kc); text-align: center; color: #1E293B; }
    .kd-num.dim { color: #CBD5E1; }
    .kd-num.res { color: #2563EB; }
    .kd-num.ok { color: #16A34A; }
    .kd-num[data-n]::after { content: attr(data-n); position: absolute; top: -0.3em; right: -0.1em; font-size: 0.36em; line-height: 1.4em; min-width: 1.4em;
      border-radius: 999px; background: #F59E0B; color: #fff; }
    .kd-num.ten::before { content: '1'; position: absolute; left: -0.12em; top: -0.12em; font-size: 0.45em; color: #DC2626; }
    .kd-carry, .kd-borrow { font-size: 0.45em; color: #DC2626; }
    .kd-sign { font-size: 0.75em; color: #16A34A; }
    .kd-sign.diff { font-size: 1em; color: #EA580C; }
    .kd-lead { font-size: 0.85em; color: #475569; padding-right: 0.25em; }
    .kd-line { justify-self: stretch; height: 3px; border-radius: 3px; background: #334155; }
    .kd-result { min-height: 1.5em; text-align: center; font: 800 clamp(1.25rem, 5vw, 1.75rem)/1.4 Quicksand, sans-serif; color: #16A34A; }
    .kd-result span { display: inline-block; background: #DCFCE7; border-radius: 0.6em; padding: 0 0.6em; }
    .kd-cap { min-height: 4.6em; margin: 0.3rem 0 0.45rem; background: #F0F9FF; border-radius: 0.7rem; padding: 0.45rem 0.75rem; color: #0C4A6E; font-size: 1.05rem; line-height: 1.5; }
    .kd-cap b { color: #C2410C; }
    .kd-nav { display: flex; align-items: center; gap: 0.6rem; }
    .kd-nav button { min-height: 2.8rem; border-radius: 999px; font: 800 1.05rem Quicksand, sans-serif; cursor: pointer; }
    .kd-prev { width: 3.2rem; border: 2px solid #CBD5E1; background: #fff; color: #475569; box-shadow: 0 3px 0 #CBD5E1; }
    .kd-prev:disabled { opacity: 0.35; cursor: default; }
    .kd-next { flex: 1; border: none; background: linear-gradient(90deg, #F59E0B, #F97316); color: #fff; box-shadow: 0 4px 0 #C2410C; }
    .kd-nav button:active:not(:disabled) { transform: translateY(2px); box-shadow: none; }
    .kd-next.is-wait { animation: kdBreath 1.6s ease-in-out infinite; }
    .kd-dots { display: flex; gap: 0.3rem; justify-content: center; margin-bottom: 0.45rem; }
    .kd-dots i { width: 0.5rem; height: 0.5rem; border-radius: 50%; background: #E2E8F0; }
    .kd-dots i.done { background: #FCD34D; }
    .kd-dots i.on { background: #F97316; transform: scale(1.3); }
    .kd-band.is-new { animation: kdBand 0.4s ease-out both; }
    .kd-num.is-new, .kd-carry.is-new, .kd-borrow.is-new, .kd-sign.is-new, .kd-result .is-new { animation: kdDrop 0.5s cubic-bezier(.3,1.6,.5,1) both; }
    .kd-num.ten.is-new::before { animation: kdDrop 0.5s ease-out both; }
    @keyframes kdBand { from { opacity: 0; transform: scaleY(0.4); } }
    @keyframes kdDrop { from { opacity: 0; transform: translateY(-0.6em) scale(1.4); } }
    @keyframes kdBreath { 50% { transform: scale(1.04); } }
    @media (prefers-reduced-motion: reduce) {
      .kd-band.is-new, .kd-num.is-new, .kd-carry.is-new, .kd-borrow.is-new, .kd-sign.is-new, .kd-result .is-new, .kd-num.ten.is-new::before { animation: kdFade 0.6s ease-out both; }
      .kd-next.is-wait { animation: none; }
      @keyframes kdFade { from { opacity: 0; } }
    }
    @media (min-width: 720px) { .kd-cap { font-size: 1.15rem; } }
  `;
  document.head.appendChild(st);
}
