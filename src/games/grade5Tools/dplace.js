/**
 * 🧮 Bảng hàng thập phân (Toán 5, Bài 10, 11).
 *  - createDPlace: cột Trăm | Chục | Đơn vị | , | Phần mười | Phần trăm | Phần nghìn. Khay dưới có thẻ giá trị
 *    100, 10, 1, 1/10, 1/100, 1/1000. Bấm thẻ ở khay → thẻ bay vào cột; đủ 10 thẻ trong một cột thì 10 thẻ bay dồn
 *    sang cột bên trái thành 1 thẻ (10 phần trăm = 1 phần mười, 10 phần mười = 1 đơn vị). Bấm thẻ trong cột → bỏ ra.
 *    Số trên bảng: mỗi chữ số mang màu của hàng; dòng đọc số (readDec) và dòng "gồm … ".
 *  - createDCompare ("máy soi"): hai số thẳng hàng theo dấu phẩy, hàng vắng hiện chữ số 0 mờ. Máy soi phần nguyên
 *    trước (cả khối), rồi lần lượt phần mười, phần trăm, phần nghìn; dừng ở chỗ khác nhau đầu tiên.
 * Giá trị bên trong tính theo phần nghìn (số nguyên) để không lệch dấu phẩy động.
 */

import { css, emitter, sfx } from '../grade4Tools/frame.js';
import { SLOT_CSS } from '../grade4Tools/practice.js';
import { flyOne } from '../grade3Games/fly.js';
import { sleep } from '../grade3Drills/kit.js';
import { fmt, readDec, clean } from './num.js';
import { capFirst } from '../grade4Tools/num.js';

/** Màu và tên từng hàng (dùng chung cho lưới 100 ô, tia số, câu hỏi). */
export const PLACE5 = {
  3: { name: 'Nghìn', c: '#94A3B8', ink: '#334155', bg: '#F1F5F9' },
  2: { name: 'Trăm', c: '#4ADE80', ink: '#166534', bg: '#DCFCE7' },
  1: { name: 'Chục', c: '#60A5FA', ink: '#1E40AF', bg: '#DBEAFE' },
  0: { name: 'Đơn vị', c: '#C084FC', ink: '#6B21A8', bg: '#F3E8FF' },
  '-1': { name: 'Phần mười', c: '#FB923C', ink: '#C2410C', bg: '#FFEDD5' },
  '-2': { name: 'Phần trăm', c: '#F472B6', ink: '#BE185D', bg: '#FCE7F3' },
  '-3': { name: 'Phần nghìn', c: '#FACC15', ink: '#A16207', bg: '#FEF9C3' },
};
export const placeName = (p) => (PLACE5[p] ? PLACE5[p].name.toLowerCase() : '');
const inkOf = (p) => PLACE5[p]?.ink || '#1E293B';
const COMMA_INK = '#DC2626';

/** Chữ trên thẻ màu, không viền: mực đậm của hàng (màu thẻ là màu vừa, chữ trắng viền đen khó đọc). */
const CHIP_TEXT = 'color-mix(in srgb, var(--t) 70%, #000)';

/** Tách chuỗi số thập phân "1 000,071" → { i: '1000', d: '071' }. */
export function splitDec(s) {
  const [i, d = ''] = String(typeof s === 'number' ? String(clean(s)).replace('.', ',') : s).replace(/\s/g, '').split(',');
  return { i, d };
}

/**
 * Số thập phân có màu theo hàng: mỗi chữ số mang màu của hàng, dấu phẩy đỏ. mark: hàng cần gạch chân.
 * color = false: không tô màu (chỉ gạch chân).
 */
export function decHtml(s, { color = true, mark = null } = {}) {
  injectDPlaceStyles();
  const { i, d } = splitDec(s);
  const dig = (ch, p) => `<span class="g5d-ch${p === mark ? ' g5d-mark' : ''}"${color ? ` style="color:${inkOf(p)}"` : ''}>${ch}</span>`;
  let out = '';
  for (let k = 0; k < i.length; k++) {
    const p = i.length - 1 - k;
    if (k && p % 3 === 2) out += '<span class="g4n-sp"></span>';
    out += dig(i[k], p);
  }
  if (d) out += `<span class="g5d-cm"${color ? '' : ' style="color:inherit"'}>,</span>` + [...d].map((ch, k) => dig(ch, -(k + 1))).join('');
  return `<span class="g5d-n">${out}</span>`;
}

/** Thẻ giá trị: 100 · 10 · 1 · 1/10 · 1/100 · 1/1000 (stack: phân số viết chồng). */
const valLabel = (p, stack = false) => {
  if (p >= 0) return `<span>${fmt(10 ** p)}</span>`;
  const den = fmt(10 ** -p);
  return stack ? `<span class="g5d-fr"><b>1</b><b>${den}</b></span>` : `<span>1/${den}</span>`;
};
const chipHtml = (p) => `<div class="g5d-chip" style="--c:${PLACE5[p].c};--t:${PLACE5[p].ink};--n:${p >= 0 ? String(10 ** p).length : 2 - p + 2}">${valLabel(p)}</div>`;

/**
 * host: phần tử chứa. int: số hàng phần nguyên (≤ 3), dec: số hàng phần thập phân (≤ 3).
 * value: số ban đầu. tray: khay thẻ. read: dòng đọc số. parts: dòng "gồm …".
 */
export function createDPlace(host, { int = 3, dec = 3, value = 0, tray = true, read = true, parts = true } = {}) {
  injectDPlaceStyles();
  const t = emitter({});
  const places = [];
  for (let p = int - 1; p >= -dec; p--) places.push(p);
  const counts = {};
  for (const p of places) counts[p] = 0;
  let busy = 0, locked = false, picking = false;
  const tmpl = `repeat(${int}, minmax(0, 1fr)) minmax(0, 0.42fr) repeat(${dec}, minmax(0, 1fr))`;
  const cells = (fn, comma) => places.map((p) => (p === -1 ? comma : '') + fn(p)).join('') + (dec === 0 ? comma : '');
  host.innerHTML = `
    <div class="g5d" style="--cols:${int + dec}">
      <div class="g5d-top">
        <div class="g5d-num" aria-live="polite"></div>
        ${read ? '<div class="g5d-read">&nbsp;</div>' : ''}
        ${parts ? '<div class="g5d-parts">&nbsp;</div>' : ''}
      </div>
      <div class="g5d-grid" style="grid-template-columns:${tmpl}">
        ${cells(p => `<div class="g5d-head" style="--ink:${inkOf(p)}">${PLACE5[p].name}</div>`, '<div class="g5d-head"></div>')}
        ${cells(p => `<button type="button" class="g5d-col" data-p="${p}" style="--bg:${PLACE5[p].bg}" aria-label="${PLACE5[p].name}"><div class="g5d-stack"></div></button>`, '<div class="g5d-ccol"></div>')}
        ${cells(p => `<div class="g5d-dig" data-p="${p}" style="--ink:${inkOf(p)}"></div>`, '<div class="g5d-dig g5d-comma">,</div>')}
        ${tray ? cells(p => `<button type="button" class="g5d-src" data-p="${p}" style="--c:${PLACE5[p].c};--t:${PLACE5[p].ink}" aria-label="Thêm thẻ ${PLACE5[p].name}">+${valLabel(p, true)}</button>`, '<div></div>') : ''}
      </div>
    </div>`;
  const root = host.querySelector('.g5d');
  const col = (p) => root.querySelector(`.g5d-col[data-p="${p}"]`);
  const stack = (p) => col(p).querySelector('.g5d-stack');
  const dig = (p) => root.querySelector(`.g5d-dig[data-p="${p}"]`);
  const src = (p) => root.querySelector(`.g5d-src[data-p="${p}"]`);

  t.root = root; t.places = places; t.counts = counts; t.col = col; t.dig = dig; t.src = src;
  /** Giá trị theo phần nghìn (số nguyên). */
  Object.defineProperty(t, 'k', { get: () => places.reduce((s, p) => s + counts[p] * 10 ** (p + 3), 0) });
  /** Giá trị (số thập phân). */
  Object.defineProperty(t, 'value', { get: () => t.k / 1000 });
  /** Chuỗi gọn nhất: "325,431", "4,07", "0". */
  t.str = () => {
    const k = t.k, ip = Math.floor(k / 1000);
    const d = String(k % 1000).padStart(3, '0').replace(/0+$/, '');
    return d ? `${ip},${d}` : String(ip);
  };

  function render() {
    const s = t.str();
    const { i, d } = splitDec(s);
    for (const p of places) {
      const el = dig(p);
      const show = p >= 0 ? p < i.length : -p <= d.length;
      el.textContent = show || counts[p] ? counts[p] : '';
      el.classList.toggle('g5d-dig-big', counts[p] >= 10);
    }
    root.querySelector('.g5d-num').innerHTML = decHtml(s);
    const r = root.querySelector('.g5d-read');
    if (r) r.textContent = capFirst(readDec(s));
    const pt = root.querySelector('.g5d-parts');
    if (pt) {
      const items = places.filter(p => counts[p]).map(p => `<b style="color:${inkOf(p)}">${counts[p]}</b> ${placeName(p)}`);
      pt.innerHTML = items.length ? `Gồm ${items.join(', ')}` : '&nbsp;';
    }
  }

  /** Đặt ngay một giá trị (không bay). */
  t.set = (v) => {
    let k = Math.round(clean(+String(v).replace(',', '.')) * 1000);
    for (let p = int - 1; p >= -dec; p--) {
      const u = 10 ** (p + 3);
      counts[p] = Math.floor(k / u) % 10;
    }
    for (const p of places) stack(p).innerHTML = Array.from({ length: counts[p] }, () => chipHtml(p)).join('');
    render();
  };

  /** Thêm một thẻ vào hàng p (bay từ khay). Đủ 10 thì gộp sang hàng bên trái. */
  t.add = async (p, { quiet = false } = {}) => {
    busy++;
    try {
      const st = stack(p);
      st.insertAdjacentHTML('beforeend', chipHtml(p));
      const el = st.lastElementChild;
      el.style.visibility = 'hidden';
      const from = src(p);
      if (from) await new Promise(res => flyOne(chipHtml(p), from.getBoundingClientRect(), el.getBoundingClientRect(), { minMs: 320, maxMs: 520, onLand: res }));
      el.style.visibility = '';
      counts[p]++;
      if (!quiet) sfx.pop(Math.min(counts[p], 9));
      render();
      t.emit('add', p);
      if (counts[p] >= 10) await carry(p);
    } finally { busy--; }
  };

  /** 10 thẻ hàng p bay dồn thành 1 thẻ hàng p + 1. */
  async function carry(p) {
    if (p + 1 > int - 1) return;
    col(p).classList.add('g5d-full');
    await sleep(380);
    const target = stack(p + 1);
    target.insertAdjacentHTML('beforeend', chipHtml(p + 1));
    const slot = target.lastElementChild;
    slot.style.visibility = 'hidden';
    const to = slot.getBoundingClientRect();
    const chips = [...stack(p).children].reverse();
    await new Promise((res) => {
      let left = chips.length;
      chips.forEach((c, i) => {
        flyOne(chipHtml(p), c.getBoundingClientRect(), to, { delay: i * 50, minMs: 380, maxMs: 560, onLand: () => { if (--left === 0) res(); } });
        setTimeout(() => { c.style.visibility = 'hidden'; }, i * 50);
      });
    });
    stack(p).innerHTML = '';
    counts[p] = 0;
    col(p).classList.remove('g5d-full');
    slot.style.visibility = '';
    slot.classList.add('g5d-pop');
    counts[p + 1]++;
    sfx.ding();
    render();
    t.emit('carry', p);
    if (counts[p + 1] >= 10) await carry(p + 1);
  }

  /** Bỏ một thẻ ở hàng p (bay về khay). */
  t.remove = (p) => {
    if (!counts[p]) return;
    const el = stack(p).lastElementChild;
    const s = src(p);
    if (el && s) flyOne(chipHtml(p), el.getBoundingClientRect(), s.getBoundingClientRect(), { minMs: 280, maxMs: 420 });
    el?.remove();
    counts[p]--;
    sfx.tap();
    render();
    t.emit('remove', p);
  };

  /** Thầy làm mẫu: thêm thẻ tới khi được số v, từng hàng từ trái sang phải. */
  t.fill = async (v, { gap = 140 } = {}) => {
    const k = Math.round(clean(+String(v).replace(',', '.')) * 1000);
    for (const p of places) {
      const want = Math.floor(k / 10 ** (p + 3)) % 10;
      while (counts[p] < want) { await t.add(p); await sleep(gap); }
    }
  };

  /** Làm sáng các cột (hàng) đã cho, cột khác mờ. null = bỏ. */
  t.glow = (ps) => {
    const on = ps == null ? null : new Set([].concat(ps));
    for (const p of places) {
      col(p).classList.toggle('g5d-glow', !!on?.has(p));
      col(p).classList.toggle('g5d-dim', !!on && !on.has(p));
      dig(p).classList.toggle('g5d-dim', !!on && !on.has(p));
    }
  };
  /** Làm sáng ô dấu phẩy. */
  t.glowComma = (on) => root.querySelector('.g5d-comma').classList.toggle('g5d-cglow', on);

  t.lock = (on) => { locked = on; root.classList.toggle('g5d-locked', on); };
  /** Chỉ cho bấm khay ở các hàng này (null = mọi hàng). */
  t.only = (ps) => {
    const on = ps == null ? null : new Set([].concat(ps));
    for (const p of places) src(p)?.classList.toggle('g5d-off', !!on && !on.has(p));
  };
  /** Chế độ chọn: bấm một cột → sự kiện ('pick', hàng). */
  t.pickMode = (on) => { picking = on; root.classList.toggle('g5d-picking', on); };
  /** Che / hiện số trên bảng (em tự lập theo lời tả). */
  t.hideTop = (on) => { root.querySelector('.g5d-top').style.visibility = on ? 'hidden' : ''; };

  root.addEventListener('click', (e) => {
    if (picking) {
      const c = e.target.closest('.g5d-col');
      if (c) { sfx.tap(); t.emit('pick', +c.dataset.p); }
      return;
    }
    if (locked || busy) return;
    const s = e.target.closest('.g5d-src');
    if (s && !s.classList.contains('g5d-off')) { t.add(+s.dataset.p).then(() => t.emit('change')); return; }
    const c = e.target.closest('.g5d-col');
    if (c && counts[+c.dataset.p]) { t.remove(+c.dataset.p); t.emit('change'); }
  });

  t.set(value);
  return t;
}

/**
 * Máy soi so sánh hai số thập phân a, b (chuỗi "2,875" để giữ số 0 cuối như "0,70").
 * t.scan() → { at: 'int' | hàng | null, sign }.
 */
export function createDCompare(host, a, b, { ov = false } = {}) {
  injectDPlaceStyles();
  const t = emitter({});
  const A = splitDec(a), B = splitDec(b);
  const I = Math.max(A.i.length, B.i.length, 1), D = Math.max(A.d.length, B.d.length);
  const places = [];
  for (let p = I - 1; p >= -D; p--) places.push(p);
  const tmpl = `repeat(${I}, minmax(0, 1fr))${D ? ` minmax(0, 0.4fr) repeat(${D}, minmax(0, 1fr))` : ''}`;
  const digitOf = (N, p) => {
    if (p >= 0) { const k = N.i.length - 1 - p; return k >= 0 ? N.i[k] : null; }
    return N.d[-p - 1] ?? null;
  };
  const cell = (N, row) => places.map((p) => {
    const d = digitOf(N, p);
    return (p === -1 ? `<div class="g5c-d g5c-cm">${N.d ? ',' : '<span class="g5c-ghost">,</span>'}</div>` : '')
      + `<div class="g5c-d g5c-${row}" data-p="${p}" style="--ink:${inkOf(p)}">${d == null ? '<span class="g5c-ghost">0</span>' : d}</div>`;
  }).join('');
  const head = places.map(p => (p === -1 ? '<div></div>' : '') + `<div class="g5c-head" style="--ink:${inkOf(p)};--bg:${PLACE5[p]?.bg || '#F1F5F9'}">${PLACE5[p]?.name || ''}</div>`).join('');
  host.innerHTML = `
    <div class="g5c ${ov ? 'g5c-ov' : ''}" style="--cols:${I + D}">
      <div class="g5c-line"><span class="g5c-num">${decHtml(a)}</span><span class="g5c-sign"></span><span class="g5c-num">${decHtml(b)}</span></div>
      <div class="g5c-grid" style="grid-template-columns:${tmpl}">
        ${head}${cell(A, 'a')}${cell(B, 'b')}
        <div class="g5c-scan" aria-hidden="true"><span>🔍</span></div>
      </div>
    </div>`;
  const root = host.querySelector('.g5c');
  const grid = root.querySelector('.g5c-grid');
  const scanEl = root.querySelector('.g5c-scan');
  t.root = root;
  t.sign = root.querySelector('.g5c-sign');
  const cellsAt = (p) => [...root.querySelectorAll(`.g5c-a[data-p="${p}"], .g5c-b[data-p="${p}"]`)];
  /** Khung soi phủ các cột ps (đo theo vị trí thật vì cột dấu phẩy hẹp hơn). */
  const moveScan = (ps) => {
    const g = grid.getBoundingClientRect();
    const rs = ps.flatMap(cellsAt).map(e => e.getBoundingClientRect());
    const l = Math.min(...rs.map(r => r.left)), r = Math.max(...rs.map(r => r.right));
    const top = Math.min(...rs.map(r => r.top)), bot = Math.max(...rs.map(r => r.bottom));
    const pad = 6;
    scanEl.style.transform = `translate(${l - g.left - pad}px, ${top - g.top - pad}px)`;
    scanEl.style.width = `${r - l + 2 * pad}px`;
    scanEl.style.height = `${bot - top + 2 * pad}px`;
    scanEl.style.opacity = '1';
  };
  const val = (N, ps) => +ps.map(p => digitOf(N, p) ?? '0').join('');

  /** Soi phần nguyên (cả khối), rồi từng hàng phần thập phân. */
  t.scan = async ({ gap = 700 } = {}) => {
    const ints = places.filter(p => p >= 0);
    moveScan(ints);
    sfx.tap();
    await sleep(gap);
    const ia = val(A, ints), ib = val(B, ints);
    if (ia !== ib) {
      ints.flatMap(cellsAt).forEach(c => c.classList.add('g5c-hit'));
      return { at: 'int', sign: ia > ib ? '>' : '<' };
    }
    ints.flatMap(cellsAt).forEach(c => c.classList.add('g5c-same'));
    for (const p of places.filter(q => q < 0)) {
      moveScan([p]);
      sfx.tap();
      await sleep(gap);
      const da = +(digitOf(A, p) ?? 0), db = +(digitOf(B, p) ?? 0);
      if (da !== db) {
        cellsAt(p).forEach(c => c.classList.add('g5c-hit'));
        return { at: p, sign: da > db ? '>' : '<' };
      }
      cellsAt(p).forEach(c => c.classList.add('g5c-same'));
    }
    return { at: null, sign: '=' };
  };
  /** Hiện các chữ số 0 mờ (đậm dần lên) để thấy hai số thẳng hàng. */
  t.ghosts = (on) => root.classList.toggle('g5c-ghost-on', on);
  t.setSign = (s) => { t.sign.textContent = s; t.sign.classList.add('g4c-sign-on'); t.sign.animate([{ transform: 'scale(0.4)' }, { transform: 'scale(1)' }], { duration: 300, easing: 'ease-out' }); };
  t.reset = () => {
    scanEl.style.opacity = '0';
    root.querySelectorAll('.g5c-hit, .g5c-same').forEach(c => c.classList.remove('g5c-hit', 'g5c-same'));
    t.sign.textContent = ''; t.sign.classList.remove('g4c-sign-on');
  };
  return t;
}

let styled = false;
function injectDPlaceStyles() {
  if (styled) return;
  styled = true;
  css('g5-dplace', `
    .g5d-n { white-space: nowrap; }
    .g5d-cm { color: ${COMMA_INK}; }
    .g5d-mark { color: #DC2626 !important; text-decoration: underline; text-decoration-thickness: 0.12em; text-underline-offset: 0.12em; text-decoration-color: #DC2626; }
    .g5d { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 1cqh; padding: 1.4cqh 1.6cqi; font-family: 'Baloo 2', sans-serif; color: #1E293B; box-sizing: border-box; }
    .g5d-top { flex: none; display: flex; flex-direction: column; align-items: center; gap: 0.2cqh; }
    .g5d-num { font-weight: 800; font-size: min(10cqh, 7cqi); line-height: 1; min-height: 1em; }
    .g5d-read, .g5d-parts { font-weight: 700; font-size: min(4.4cqh, 3cqi); color: #475569; line-height: 1.2; text-align: center; min-height: 1.2em; }
    .g5d-parts b { font-weight: 800; }
    .g5d-grid { flex: 1; min-height: 0; display: grid; grid-template-rows: auto minmax(0, 1fr) auto auto; gap: 0.8cqh 0.7cqi; }
    .g5d-head { text-align: center; font-weight: 800; color: var(--ink); font-size: min(3.6cqh, 2.5cqi); line-height: 1.05; min-height: 2.1em; display: grid; place-items: end center; }
    .g5d-col { position: relative; background: var(--bg); border: 2px solid rgba(63,58,64,0.16) !important; border-radius: 0.8rem; padding: 0.6cqh 0.5cqi; cursor: pointer; min-height: 0; box-shadow: 0 3px 0 rgba(63,58,64,0.1); transition: opacity .2s; font-family: inherit; }
    .g5d-ccol { position: relative; }
    .g5d-ccol::before { content: ''; position: absolute; left: 50%; top: 4%; bottom: 4%; border-left: 3px dashed #FCA5A5; }
    .g5d-stack { height: 100%; display: flex; flex-direction: column-reverse; container-type: size; }
    .g5d-chip { flex: none; height: calc(10% - 0.6cqh); margin-top: 0.6cqh; background: var(--c); border: 1.5px solid rgba(63,58,64,0.22); border-radius: 0.35em; display: grid; place-items: center; box-sizing: border-box; overflow: hidden; }
    .g5d-chip span { font-weight: 800; color: ${CHIP_TEXT}; font-size: min(8cqh, calc(165cqi / var(--n, 4))); line-height: 1; white-space: nowrap; }
    .g3-fly .g5d-chip { width: 100%; height: 100%; margin: 0; }
    .g3-fly .g5d-chip span { font-size: 1.05rem; }
    .g5d-dig { text-align: center; font-weight: 800; color: var(--ink); font-size: min(9cqh, 5.4cqi); line-height: 1.05; min-height: 1.05em; border-bottom: 3px solid #E2E8F0; }
    .g5d-comma { color: ${COMMA_INK}; border-bottom-color: transparent; }
    .g5d-cglow { animation: g5dC 0.8s ease-in-out 3; }
    @keyframes g5dC { 50% { transform: scale(1.5); } }
    .g5d-dig-big { color: #DC2626 !important; }
    .g5d-src { border: 1.5px solid rgba(63,58,64,0.2); border-radius: 0.7em; background: var(--c); color: ${CHIP_TEXT}; font-weight: 800; cursor: pointer; padding: 0.1em 0.1em; font-family: inherit;
      font-size: min(4.4cqh, 2.8cqi); box-shadow: 0 4px 0 rgba(63,58,64,0.22); white-space: nowrap; display: flex; align-items: center; justify-content: center; gap: 0.15em; min-height: 2.5em; touch-action: manipulation; }
    .g5d-src:active { transform: translateY(3px); box-shadow: 0 1px 0 rgba(63,58,64,0.22); }
    .g5d-fr { display: inline-flex; flex-direction: column; align-items: center; line-height: 1; font-size: 0.85em; }
    .g5d-fr b { display: block; padding: 0 0.1em; }
    .g5d-fr b:first-child { border-bottom: 0.1em solid currentColor; }
    .g5d-off { opacity: 0.3; pointer-events: none; filter: grayscale(0.7); }
    .g5d-glow { box-shadow: 0 0 0 4px #FACC15, 0 3px 0 rgba(63,58,64,0.1); }
    .g5d-dim { opacity: 0.35; }
    .g5d-full { animation: g5dFull .38s ease-in-out 2; }
    @keyframes g5dFull { 50% { background: #FEF08A; } }
    .g5d-pop { animation: g5dPop .45s cubic-bezier(.2,1.6,.4,1); }
    @keyframes g5dPop { from { transform: scale(0.3); } }
    .g5d-locked .g5d-src, .g5d-locked .g5d-col { cursor: default; }
    .g5d-picking .g5d-col:hover { box-shadow: 0 0 0 4px #FDE68A, 0 3px 0 rgba(63,58,64,0.1); }
    .g5d-picking .g5d-src { opacity: 0.35; pointer-events: none; }
    @container (orientation: portrait) {
      .g5d-head { font-size: min(2.6cqh, 3.2cqi); }
      .g5d-num { font-size: min(8cqh, 11cqi); }
      .g5d-read, .g5d-parts { font-size: min(3.4cqh, 4.2cqi); }
      .g5d-src { font-size: min(3.6cqh, 4.2cqi); }
      .g5d-dig { font-size: min(7cqh, 8cqi); }
      .g5d-chip span { font-size: min(7.5cqh, calc(120cqi / var(--n, 4))); }
    }
    @media (prefers-reduced-motion: reduce) { .g5d-pop { animation: none; } .g5d-cglow { animation: g5dCcalm 1s ease-in-out 2; } @keyframes g5dCcalm { 50% { opacity: 0.4; } } }

    .g5c { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 4cqh; padding: 3cqh 3cqi; font-family: 'Baloo 2', sans-serif; justify-content: center; box-sizing: border-box; }
    .g5c-ov { padding-bottom: 22cqh; }
    .g5c-line { display: flex; align-items: center; justify-content: center; gap: 0.5em; font-weight: 800; font-size: min(13cqh, 8cqi); line-height: 1.1; }
    .g5c-grid { position: relative; display: grid; gap: 1.2cqh 0.6cqi; }
    .g5c-head { text-align: center; font-weight: 800; color: var(--ink); background: var(--bg); border-radius: 0.5em; font-size: min(3.4cqh, 2.2cqi); line-height: 1.05; padding: 0.2em 0.1em; min-height: 2.2em; display: grid; place-items: center; }
    .g5c-d { position: relative; z-index: 1; text-align: center; font-weight: 800; color: var(--ink); font-size: min(18cqh, 11cqi); line-height: 1.1; border: 2px solid #E2E8F0; border-radius: 0.3em; background: #fff; min-height: 1.15em; transition: background .25s, border-color .25s; }
    .g5c-cm { color: ${COMMA_INK}; border-color: transparent; background: none; }
    .g5c-ghost { color: #CBD5E1; }
    .g5c-ghost-on .g5c-ghost { color: #94A3B8; }
    .g5c-same { background: #F1F5F9; }
    .g5c-hit { background: #FEF08A; border-color: #F59E0B; }
    .g5c-scan { position: absolute; z-index: 2; left: 0; top: 0; width: 10%; height: 10%; border: 3px solid #EF4444; border-radius: 0.6em; opacity: 0; transition: transform .45s ease, width .45s ease, height .45s ease, opacity .2s; pointer-events: none; box-sizing: border-box; }
    .g5c-scan span { position: absolute; right: -0.55em; top: -0.75em; font-size: min(7cqh, 4.5cqi); }
    ${SLOT_CSS('.g5c-sign')}
    .g5c-sign { width: 1.4em; height: 1.2em; border-width: 3px; }
    @container (orientation: portrait) {
      .g5c-line { font-size: min(8cqh, 10cqi); }
      .g5c-head { font-size: min(2.6cqh, 3.1cqi); }
      .g5c-d { font-size: min(10cqh, 11cqi); }
    }
    @media (prefers-reduced-motion: reduce) { .g5c-scan { transition: transform .6s linear, width .6s linear, height .6s linear, opacity .3s; } }
  `);
}
