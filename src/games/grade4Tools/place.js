/**
 * 🧱 Bảng hàng: mỗi cột là một hàng (đơn vị, chục, trăm, nghìn…), khay dưới có thẻ giá trị (1, 10, 100…).
 * Bấm thẻ ở khay → thẻ bay vào cột; số trên bảng đổi ngay. Đủ 10 thẻ trong một cột thì 10 thẻ bay dồn sang cột
 * bên trái thành 1 thẻ (10 chục nghìn = 1 trăm nghìn). Bấm thẻ trong cột → bỏ thẻ đó ra.
 * Ba hàng cùng lớp chung một màu (đơn vị xanh lá, nghìn xanh dương, triệu tím). Chế độ hạt (bàn tính) cho lớp triệu.
 */

import { css, emitter, sfx } from './frame.js';
import { SLOT_CSS } from './practice.js';
import { flyOne } from '../grade3Games/fly.js';
import { sleep } from '../grade3Drills/kit.js';
import { fmt, readVN, capFirst, PLACE, CLASS, classOf, placeColor, CLASS_INK, CLASS_BG, digitsOf, expand } from './num.js';

const label = (p) => fmt(10 ** p);
/** Chữ trên thẻ màu, không viền: trắng trên màu đậm (hàng thứ ba của lớp), mực của lớp trên màu nhạt. */
const chipInk = (p) => (p % 3 === 2 ? '#fff' : CLASS_INK[classOf(p)]);
const chipHtml = (p) => `<div class="g4p-chip" style="--c:${placeColor(p)};--t:${chipInk(p)};--n:${label(p).length}"><span>${label(p)}</span></div>`;
const unitChip = (u) => `<div class="g4p-chip g4p-uchip" style="--c:${u.bg}">${u.art}</div>`;
const beadHtml = (p) => `<div class="g4p-bead" style="--c:${placeColor(p)}"></div>`;

/** Số có màu theo lớp: <span class="g4n-l1">36</span> <span class="g4n-l0">515</span>. */
export function numHtml(n, { cls = true } = {}) {
  const s = String(n);
  const groups = [];
  for (let end = s.length; end > 0; end -= 3) groups.unshift(s.slice(Math.max(0, end - 3), end));
  return groups.map((g, i) => `<span class="g4n" style="${cls ? `color:${CLASS_INK[groups.length - 1 - i]}` : ''}">${g}</span>`).join('<span class="g4n-sp"></span>');
}

/**
 * host: phần tử chứa. opts: cols (số hàng), value, classes (vạch lớp), tray (khay thẻ), beads (bàn tính hạt),
 * read (dòng đọc số), sum (giữ chỗ dòng viết thành tổng).
 */
export function createPlace(host, { cols = 5, value = 0, classes = false, tray = true, beads = false, read = true, sum = true, units = null, top = null } = {}) {
  // units (tuỳ chọn): đơn vị đo thay cho hàng số — [{ name, art, bg, ink }] từ phải sang trái (vd. kg, yến, tạ, tấn);
  // top(counts, value) → { num, read } hiện ở bảng trên.
  injectPlaceStyles();
  const t = emitter({});
  const counts = Array(cols).fill(0);
  let gen = 0;
  let locked = false;
  const places = Array.from({ length: cols }, (_, i) => cols - 1 - i); // trái → phải: hàng cao → đơn vị

  const bands = [];
  for (const p of places) {
    const c = classOf(p);
    if (!bands.length || bands[bands.length - 1].c !== c) bands.push({ c, n: 1 }); else bands[bands.length - 1].n++;
  }
  const U = (p) => units?.[p];
  const head = (p) => (U(p) ? U(p).name : `Hàng ${PLACE[p]}`);
  const hInk = (p) => (U(p) ? U(p).ink : CLASS_INK[classOf(p)]);
  const hBg = (p) => (U(p) ? U(p).light : CLASS_BG[classOf(p)]);
  host.innerHTML = `
    <div class="g4p ${beads ? 'g4p-beads' : ''} ${units ? 'g4p-units' : ''}" style="--cols:${cols}">
      <div class="g4p-top">
        <div class="g4p-num" aria-live="polite"></div>
        ${read ? '<div class="g4p-read">&nbsp;</div>' : ''}
        ${sum ? '<div class="g4p-sum">&nbsp;</div>' : ''}
      </div>
      <div class="g4p-grid">
        ${classes ? bands.map(b => `<div class="g4p-band" style="grid-column: span ${b.n}; --bg:${CLASS_BG[b.c]}; --ink:${CLASS_INK[b.c]}">${capFirst(CLASS[b.c])}</div>`).join('') : ''}
        ${places.map(p => `<div class="g4p-head" style="--ink:${hInk(p)}">${head(p)}</div>`).join('')}
        ${places.map(p => `<button type="button" class="g4p-col" data-p="${p}" style="--bg:${hBg(p)}" aria-label="${head(p)}"><div class="g4p-stack"></div></button>`).join('')}
        ${places.map(p => `<div class="g4p-dig" data-p="${p}" style="--ink:${hInk(p)}"></div>`).join('')}
        ${tray ? places.map(p => `<button type="button" class="g4p-src" data-p="${p}" style="--c:${U(p) ? U(p).bg : placeColor(p)};--t:${chipInk(p)}${U(p) ? `;--ink:${U(p).ink}` : ''}" aria-label="Thêm ${head(p)}">${U(p) ? `<span>+1 ${U(p).name}</span>` : beads ? `<span>+</span>${beadHtml(p)}` : `<span>+${label(p)}</span>`}</button>`).join('') : ''}
      </div>
    </div>`;
  const root = host.querySelector('.g4p');
  const col = (p) => root.querySelector(`.g4p-col[data-p="${p}"]`);
  const stack = (p) => col(p).querySelector('.g4p-stack');
  const dig = (p) => root.querySelector(`.g4p-dig[data-p="${p}"]`);
  const src = (p) => root.querySelector(`.g4p-src[data-p="${p}"]`);
  const piece = (p) => (U(p) ? unitChip(U(p)) : beads ? beadHtml(p) : chipHtml(p));

  t.root = root;
  t.cols = cols;
  t.top = top;
  Object.defineProperty(t, 'value', { get: () => counts.reduce((s, c, p) => s + c * 10 ** p, 0) });
  t.counts = counts;
  t.col = col; t.dig = dig; t.src = src;

  function render() {
    const v = t.value;
    const top = v ? String(v).length - 1 : 0;
    for (const p of places) {
      const d = dig(p);
      d.textContent = p <= top ? counts[p] : '';
      d.classList.toggle('g4p-dig-big', counts[p] >= 10);
    }
    const r = root.querySelector('.g4p-read');
    if (units && t.top) {
      const o = t.top(counts, v);
      root.querySelector('.g4p-num').innerHTML = o.num;
      if (r) r.innerHTML = o.read || '&nbsp;';
    } else {
      root.querySelector('.g4p-num').innerHTML = numHtml(v);
      if (r) r.textContent = v ? capFirst(readVN(v)) : ' ';
    }
  }

  function placeChips(p, n) {
    stack(p).innerHTML = Array.from({ length: n }, () => piece(p)).join('');
  }

  /** Đặt ngay một giá trị (không bay). */
  t.set = (v) => {
    const ds = digitsOf(v, cols);
    gen++; incoming.fill(0); carrying.fill(false); queued.forEach(q => q.splice(0).forEach(x => x.res())); // thẻ đang bay của bảng cũ không ghi vào bảng mới
    for (const p of places) { counts[p] = ds[p] || 0; placeChips(p, counts[p]); }
    render();
    t.showSum(false);
  };

  // Bấm nhanh liên tục được: số trên bảng đổi ngay lúc bấm, thẻ bay nhảy vào cột rồi xếp chồng lên.
  // Một cột giữ tối đa 10 thẻ (kể cả thẻ đang bay tới); đủ 10 thẻ đã đáp thì cả 10 bay dồn sang cột bên trái,
  // bấm thêm lúc cột đang đủ 10 thì xếp hàng chờ, bay vào ngay khi cột đổi xong.
  const incoming = Array(cols).fill(0); // thẻ đổi từ cột bên phải đang bay tới (chưa tính vào counts)
  const carrying = Array(cols).fill(false);
  const queued = Array.from({ length: cols }, () => []); // lần bấm khi cột đã đủ 10
  const room = (p) => p + 1 >= cols || counts[p] + incoming[p] < 10; // cột cao nhất không đổi được nên không chờ

  /** Thêm một thẻ vào hàng p (bay từ khay hoặc từ `from`). Đủ 10 thì đổi sang hàng bên trái. Xong khi thẻ đáp (và đổi xong). */
  t.add = (p, { from = null, quiet = false } = {}) => {
    if (!room(p)) { if (!quiet) sfx.tap(); return new Promise(res => queued[p].push({ from, quiet, res })); } // bay vào ngay sau khi cột đổi xong
    counts[p]++;
    render();
    t.emit('add', p);
    const st = stack(p);
    st.insertAdjacentHTML('beforeend', piece(p));
    const el = st.lastElementChild;
    el.dataset.fly = '1';
    el.style.visibility = 'hidden';
    const fromEl = from || src(p);
    if (!quiet) sfx.tap();
    const g = gen;
    return new Promise((res) => {
      const land = () => {
        if (g !== gen) { res(); return; }
        delete el.dataset.fly;
        el.style.visibility = '';
        el.classList.add('g4p-land');
        if (!quiet) sfx.pop(Math.min(counts[p], 9));
        checkCarry(p).then(res);
      };
      if (fromEl) flyOne(piece(p), fromEl.getBoundingClientRect(), el.getBoundingClientRect(), { minMs: 260, maxMs: 420, className: 'g4p-fly', onLand: land });
      else land();
    });
  };

  /** Cột p đủ 10 thẻ và cả 10 đã đáp → đổi. */
  function checkCarry(p) {
    if (carrying[p] || counts[p] < 10 || p + 1 >= cols || stack(p).querySelector('[data-fly]')) return Promise.resolve();
    return carry(p);
  }

  /** 10 thẻ hàng p nhảy dồn thành 1 thẻ hàng p+1. */
  async function carry(p) {
    const g = gen;
    carrying[p] = true;
    incoming[p + 1]++;
    col(p).classList.add('g4p-full');
    await sleep(220);
    if (g !== gen) return;
    const target = stack(p + 1);
    target.insertAdjacentHTML('beforeend', piece(p + 1));
    const slot = target.lastElementChild;
    slot.dataset.fly = '1';
    slot.style.visibility = 'hidden';
    const to = slot.getBoundingClientRect();
    const chips = [...stack(p).children].reverse();
    await new Promise((res) => {
      let left = chips.length;
      chips.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        flyOne(piece(p), r, to, { delay: i * 40, minMs: 340, maxMs: 480, className: 'g4p-fly', onLand: () => { if (--left === 0) res(); } });
        setTimeout(() => { c.style.visibility = 'hidden'; }, i * 40);
      });
    });
    if (g !== gen) return;
    stack(p).innerHTML = '';
    counts[p] = 0;
    col(p).classList.remove('g4p-full');
    delete slot.dataset.fly;
    slot.style.visibility = '';
    slot.classList.add('g4p-pop');
    incoming[p + 1]--;
    counts[p + 1]++;
    carrying[p] = false;
    sfx.ding();
    render();
    t.emit('carry', p);
    while (queued[p].length && room(p)) { const q = queued[p].shift(); t.add(p, q).then(q.res); }
    await checkCarry(p + 1);
  }

  /** Bỏ một thẻ (đã đáp) ở hàng p. */
  t.remove = (p) => {
    if (!counts[p] || carrying[p]) return;
    const el = [...stack(p).children].reverse().find(x => !x.dataset.fly);
    if (!el) return;
    const s = src(p);
    if (s) flyOne(piece(p), el.getBoundingClientRect(), s.getBoundingClientRect(), { minMs: 280, maxMs: 420, className: 'g4p-fly' });
    el.remove();
    counts[p]--;
    sfx.tap();
    render();
    t.emit('remove', p);
  };

  /** Thầy làm mẫu: thêm thẻ cho tới khi được số v (mỗi hàng từ trái sang). */
  t.fill = async (v, { gap = 160 } = {}) => {
    const ds = digitsOf(v, cols);
    for (const p of places) {
      while (counts[p] < ds[p]) { await t.add(p); await sleep(gap); }
    }
  };

  /** Làm sáng các cột (mảng hàng) — các cột khác mờ đi. null = bỏ. */
  t.glow = (ps) => {
    const on = ps == null ? null : new Set([].concat(ps));
    for (const p of places) {
      col(p).classList.toggle('g4p-glow', !!on?.has(p));
      col(p).classList.toggle('g4p-dim', !!on && !on.has(p));
      dig(p).classList.toggle('g4p-dim', !!on && !on.has(p));
    }
  };

  /** Dòng viết thành tổng: 36 515 = 30 000 + 6 000 + 500 + 10 + 5. fly: từng số hạng bay từ cột xuống. */
  t.showSum = async (on, { fly = false } = {}) => {
    const box = root.querySelector('.g4p-sum');
    if (!box) return;
    if (!on) { box.innerHTML = '&nbsp;'; return; }
    const v = t.value;
    const terms = expand(v);
    box.innerHTML = `${numHtml(v)} = ${terms.map((x) => {
      const p = String(x).length - 1;
      return `<span class="g4p-term" data-p="${p}" style="color:${CLASS_INK[classOf(p)]};${fly ? 'visibility:hidden' : ''}">${fmt(x)}</span>`;
    }).join(' + ')}`;
    if (!fly) return;
    for (const el of box.querySelectorAll('.g4p-term')) {
      const p = +el.dataset.p;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      await new Promise(res => flyOne(`<div class="g4p-flyterm" style="font-size:${fs}px;color:${CLASS_INK[classOf(p)]}">${el.textContent}</div>`,
        dig(p).getBoundingClientRect(), el.getBoundingClientRect(), { minMs: 420, maxMs: 650, onLand: res }));
      el.style.visibility = '';
      sfx.pop(p);
      await sleep(120);
    }
  };

  t.lock = (on) => { locked = on; root.classList.toggle('g4p-locked', on); };
  /** Chỉ cho bấm khay ở các hàng này (null = mọi hàng). */
  t.only = (ps) => {
    const on = ps == null ? null : new Set([].concat(ps));
    for (const p of places) src(p)?.classList.toggle('g4p-off', !!on && !on.has(p));
  };

  let picking = false;
  /** Chế độ chọn: bấm một cột → sự kiện ('pick', hàng) thay vì bỏ thẻ. */
  t.pickMode = (on) => { picking = on; root.classList.toggle('g4p-picking', on); };

  root.addEventListener('click', (e) => {
    if (picking) {
      const c = e.target.closest('.g4p-col');
      if (c) { sfx.tap(); t.emit('pick', +c.dataset.p); }
      return;
    }
    if (locked) return;
    const s = e.target.closest('.g4p-src');
    if (s && !s.classList.contains('g4p-off')) { t.add(+s.dataset.p).then(() => t.emit()); return; }
    const c = e.target.closest('.g4p-col');
    if (c && counts[+c.dataset.p]) { t.remove(+c.dataset.p); t.emit(); }
  });

  t.set(value);
  return t;
}

/**
 * So sánh hai số: hai tầng xếp thẳng cột theo hàng; máy soi đi từ trái sang phải, dừng ở cột đầu tiên khác nhau.
 * t.scan() → { at: hàng khác nhau | -1, sign }.
 */
export function createCompare(host, a, b) {
  injectPlaceStyles();
  const t = emitter({});
  const cols = Math.max(String(a).length, String(b).length);
  const places = Array.from({ length: cols }, (_, i) => cols - 1 - i);
  const cell = (n, p) => {
    const len = String(n).length;
    return p < len ? digitsOf(n, len)[p] : '';
  };
  host.innerHTML = `
    <div class="g4c" style="--cols:${cols}">
      <div class="g4c-grid">
        ${places.map(p => `<div class="g4c-head" style="--ink:${CLASS_INK[classOf(p)]};--bg:${CLASS_BG[classOf(p)]}">${PLACE[p]}</div>`).join('')}
        ${places.map(p => `<div class="g4c-d g4c-a" data-p="${p}" style="--ink:${CLASS_INK[classOf(p)]}">${cell(a, p)}</div>`).join('')}
        ${places.map(p => `<div class="g4c-d g4c-b" data-p="${p}" style="--ink:${CLASS_INK[classOf(p)]}">${cell(b, p)}</div>`).join('')}
        <div class="g4c-scan" aria-hidden="true"></div>
      </div>
      <div class="g4c-line"><span class="g4c-num">${numHtml(a)}</span><span class="g4c-sign"></span><span class="g4c-num">${numHtml(b)}</span></div>
    </div>`;
  const root = host.querySelector('.g4c');
  const scanEl = root.querySelector('.g4c-scan');
  t.root = root;
  t.sign = root.querySelector('.g4c-sign');
  const cellsAt = (p) => root.querySelectorAll(`.g4c-d[data-p="${p}"]`);
  const moveScan = (i) => { scanEl.style.transform = `translateX(${i * 100}%)`; scanEl.style.opacity = '1'; };
  scanEl.style.width = `calc(100% / ${cols})`;

  /** Soi từ trái sang phải. Trả về hàng khác nhau đầu tiên (hoặc -1 nếu bằng nhau). */
  t.scan = async ({ gap = 650 } = {}) => {
    const la = String(a).length, lb = String(b).length;
    if (la !== lb) {
      // Số nhiều chữ số hơn thì lớn hơn: hàng cao nhất của số dài sáng lên, bên kia trống.
      const p = cols - 1;
      moveScan(0);
      cellsAt(p).forEach(c => c.classList.add('g4c-hit'));
      return { at: p, sign: la > lb ? '>' : '<', byLength: true };
    }
    for (let i = 0; i < cols; i++) {
      const p = places[i];
      moveScan(i);
      sfx.tap();
      await sleep(gap);
      const [ca, cb] = cellsAt(p);
      if (ca.textContent !== cb.textContent) {
        ca.classList.add('g4c-hit'); cb.classList.add('g4c-hit');
        return { at: p, sign: +ca.textContent > +cb.textContent ? '>' : '<' };
      }
      ca.classList.add('g4c-same'); cb.classList.add('g4c-same');
    }
    return { at: -1, sign: '=' };
  };
  t.setSign = (s) => { t.sign.textContent = s; t.sign.classList.add('g4c-sign-on'); };
  t.reset = () => {
    scanEl.style.opacity = '0';
    root.querySelectorAll('.g4c-hit, .g4c-same').forEach(c => c.classList.remove('g4c-hit', 'g4c-same'));
    t.sign.textContent = ''; t.sign.classList.remove('g4c-sign-on');
  };
  return t;
}

let styled = false;
function injectPlaceStyles() {
  if (styled) return;
  styled = true;
  css('g4-place', `
    .g4p { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 1.2cqh; padding: 1.6cqh 1.6cqi; font-family: 'Baloo 2', sans-serif; color: #1E293B; box-sizing: border-box; }
    .g4p-top { flex: none; display: flex; flex-direction: column; align-items: center; gap: 0.3cqh; }
    .g4p-num { font-weight: 800; font-size: min(10cqh, 7cqi); line-height: 1; letter-spacing: 0.02em; min-height: 1em; }
    .g4n-sp { display: inline-block; width: 0.22em; }
    .g4p-read { font-weight: 700; font-size: min(4.6cqh, 3.1cqi); color: #475569; line-height: 1.2; text-align: center; min-height: 1.2em; }
    .g4p-sum { font-weight: 700; font-size: min(4.6cqh, 3.1cqi); line-height: 1.2; min-height: 1.2em; text-align: center; }
    .g4p-flyterm { width: 100%; height: 100%; display: grid; place-items: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; white-space: nowrap; line-height: 1; }
    .g4p-grid { flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); grid-template-rows: auto auto minmax(0, 1fr) auto auto; gap: 0.8cqh 0.8cqi; }
    .g4p-grid:not(:has(.g4p-band)) { grid-template-rows: auto minmax(0, 1fr) auto auto; }
    .g4p-band { background: var(--bg); color: var(--ink); border: 2px solid color-mix(in srgb, var(--ink) 35%, transparent); border-radius: 0.6em; text-align: center; font-weight: 800; font-size: min(3.6cqh, 2.4cqi); padding: 0.1em; }
    .g4p-head { text-align: center; font-weight: 800; color: var(--ink); font-size: min(3.6cqh, calc(23cqi / var(--cols))); line-height: 1.05; min-height: 2.1em; display: grid; place-items: end center; }
    .g4p-col { position: relative; background: var(--bg); border: 2px solid rgba(63,58,64,0.16) !important; border-radius: 0.8rem; padding: 0.6cqh 0.5cqi; cursor: pointer; min-height: 0; box-shadow: 0 3px 0 rgba(63,58,64,0.1); transition: opacity .2s, filter .2s; font-family: inherit; }
    .g4p-stack { height: 100%; display: flex; flex-direction: column-reverse; container-type: size; }
    .g4p-chip { flex: none; height: calc(10% - 0.6cqh); margin-top: 0.6cqh; background: var(--c); border: 1.5px solid rgba(63,58,64,0.22); border-radius: 0.35em; display: grid; place-items: center; box-sizing: border-box; overflow: hidden; }
    .g4p-chip span { font-weight: 800; color: var(--t, #fff); font-size: min(8cqh, calc(175cqi / var(--n, 6))); line-height: 1; white-space: nowrap; }
    .g3-fly .g4p-chip { width: 100%; height: 100%; margin: 0; }
    .g4p-uchip { background: var(--c); padding: 0; display: grid; place-items: center; }
    .g4p-units .g4p-stack { flex-direction: row; flex-wrap: wrap-reverse; align-content: flex-start; }
    .g4p-units .g4p-chip { width: calc(50% - 0.6cqi); height: calc(20% - 0.8cqh); margin: 0.4cqh 0.3cqi; }
    .g4p-uchip svg { height: 100%; width: auto; max-width: 100%; display: block; }
    .g4p-units .g4p-head { font-size: min(5cqh, calc(26cqi / var(--cols))); }
    .g4p-units .g4p-src { font-size: min(4.4cqh, calc(20cqi / var(--cols))); color: var(--ink); }
    .g3-fly .g4p-chip span { font-size: 1.1rem; }
    .g4p-beads .g4p-stack { align-items: center; }
    .g4p-beads .g4p-stack::before { content: ''; position: absolute; top: 0.4cqh; bottom: 0.4cqh; left: 50%; width: 6px; margin-left: -3px; background: #94A3B8; border-radius: 3px; }
    .g4p-beads .g4p-col { padding-top: 1.2cqh; }
    .g4p-bead { position: relative; flex: none; height: calc(10% - 0.6cqh); margin-top: 0.6cqh; aspect-ratio: 1.5; max-width: 90%; border-radius: 50%; background: var(--c); border: 1.5px solid rgba(63,58,64,0.3); box-sizing: border-box; }
    .g3-fly .g4p-bead { width: 100%; height: 100%; margin: 0; }
    .g4p-dig { text-align: center; font-weight: 800; color: var(--ink); font-size: min(9cqh, calc(42cqi / var(--cols))); line-height: 1.05; min-height: 1.05em; border-bottom: 3px solid #E2E8F0; }
    .g4p-dig-big { color: #DC2626; }
    .g4p-src { border: 1.5px solid rgba(63,58,64,0.2); border-radius: 0.7em; background: var(--c); color: var(--t, #fff); font-weight: 800; cursor: pointer; padding: 0.15em 0.1em; font-family: inherit;
      font-size: min(4.8cqh, calc(23cqi / var(--cols))); box-shadow: 0 4px 0 rgba(63,58,64,0.22); white-space: nowrap; display: flex; align-items: center; justify-content: center; gap: 0.2em; min-height: 2.1em; }
    .g4p-src:active { transform: translateY(3px); box-shadow: 0 1px 0 rgba(63,58,64,0.22); }
    .g4p-src .g4p-bead { height: 1.1em; margin: 0; }
    .g4p-beads .g4p-src { font-size: min(4.6cqh, calc(30cqi / var(--cols))); }
    .g4p-off { opacity: 0.3; pointer-events: none; filter: grayscale(0.7); }
    .g4p-glow { box-shadow: 0 0 0 4px #FACC15, 0 3px 0 rgba(63,58,64,0.1); }
    .g4p-dim { opacity: 0.35; }
    .g4p-full { animation: g4pFull .35s ease-in-out 2; }
    @keyframes g4pFull { 50% { background: #FEF08A; } }
    .g4p-pop { animation: g4pPop .45s cubic-bezier(.2,1.6,.4,1); }
    .g3-fly.g4p-fly { z-index: 4500; container-type: size; font-family: 'Baloo 2', sans-serif; }
    .g3-fly.g4p-fly .g4p-chip span { font-size: min(70cqh, calc(175cqi / var(--n, 6))); }
    .g4p-land { animation: g4pLand .32s ease-out; transform-origin: 50% 100%; }
    @keyframes g4pLand { 0% { transform: translateY(-35%) scale(1.06, 0.86); } 55% { transform: translateY(0) scale(0.95, 1.08); } }
    @keyframes g4pPop { from { transform: scale(0.3); } }
    .g4p-locked .g4p-src, .g4p-locked .g4p-col { cursor: default; }
    .g4p-picking .g4p-col:hover { box-shadow: 0 0 0 4px #FDE68A, 0 3px 0 rgba(63,58,64,0.1); }
    .g4p-picking .g4p-src { opacity: 0.35; pointer-events: none; }
    @media (prefers-reduced-motion: reduce) { .g4p-pop, .g4p-land { animation: g4pCalm .3s ease-out; } @keyframes g4pCalm { from { opacity: 0.4; } } }

    .g4c { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 3cqh; padding: 3cqh 3cqi; font-family: 'Baloo 2', sans-serif; justify-content: center; }
    .g4c-grid { position: relative; display: grid; grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); gap: 1cqh 0.6cqi; }
    .g4c-head { text-align: center; font-weight: 800; color: var(--ink); background: var(--bg); border-radius: 0.5em; font-size: min(3.4cqh, calc(15cqi / var(--cols))); line-height: 1.05; padding: 0.2em 0.1em; min-height: 2.2em; display: grid; place-items: center; }
    .g4c-d { position: relative; z-index: 1; text-align: center; font-weight: 800; color: var(--ink); font-size: min(15cqh, calc(60cqi / var(--cols))); line-height: 1.1; border: 2px solid #E2E8F0; border-radius: 0.3em; background: #fff; min-height: 1.15em; transition: background .25s, border-color .25s; }
    .g4c-same { background: #F1F5F9; color: #94A3B8; }
    .g4c-hit { background: #FEF08A; border-color: #F59E0B; }
    .g4c-scan { position: absolute; z-index: 2; left: 0; top: 0; bottom: 0; border: 3px solid #EF4444; border-radius: 0.6em; opacity: 0; transition: transform .45s ease, opacity .2s; pointer-events: none; box-sizing: border-box; }
    .g4c-line { display: flex; align-items: center; justify-content: center; gap: 0.5em; font-weight: 800; font-size: min(9cqh, 5.6cqi); }
    ${SLOT_CSS('.g4c-sign')}
    .g4c-sign { width: 1.4em; height: 1.3em; border-width: 3px; }
  `);
}
