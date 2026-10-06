/**
 * 🔀 Dịch dấu phẩy (Toán 5 Bài 23): băng ô chữ số cố định, dấu phẩy đỏ nhảy từng ô (mỗi bước một tiếng tích,
 * số thứ tự bước hiện trên ô vừa vượt qua). Hết chữ số mà dấu phẩy còn phải đi thì một ô 0 mờ mọc ra rồi đậm lên.
 * Xong thì bỏ chữ số 0 thừa ở đầu phần nguyên và cuối phần thập phân (mờ đi), dấu phẩy ở cuối số thì ẩn.
 * Thẻ phép tính (×10, :0,1…) to bên dưới; bấm thẻ → sự kiện 'op'. rows: số băng (2 băng để so ×0,1 với :10).
 */

import { css, emitter, INK, sfx } from '../grade4Tools/frame.js';
import { sleep } from '../grade3Drills/kit.js';
import { anim } from '../grade4Tools/canvas.js';
import { fmt } from './num.js';

const S = 12; // số ô của băng
const B0 = 6; // ranh giới dấu phẩy lúc đầu

/** "×100" → { m: '×', k: 100, n: +2 }; ":0,01" → { m: ':', k: 0.01, n: +2 }. n: số bước dấu phẩy (dương = sang phải). */
export function parseOp(s) {
  const m = s[0] === ':' ? ':' : '×';
  const ks = s.slice(1).replace(/\s/g, '');
  const k = +ks.replace(',', '.');
  const z = k >= 1 ? Math.round(Math.log10(k)) : -Math.round(-Math.log10(k));
  return { m, k, ks, n: m === '×' ? z : -z, s };
}
/** Kết quả dịch dấu phẩy trên chuỗi "27,86" (n > 0 sang phải). */
export function shiftStr(str, n) {
  let [i, f = ''] = str.split(',');
  if (n > 0) { f = f.padEnd(n, '0'); i += f.slice(0, n); f = f.slice(n); } else if (n < 0) { i = i.padStart(-n + 1, '0'); f = i.slice(n) + f; i = i.slice(0, n); }
  i = i.replace(/^0+(?=\d)/, '') || '0';
  f = f.replace(/0+$/, '');
  return i + (f ? `,${f}` : '');
}
/** "1234,5" → "1 234,5". */
export const prettyDec = (s) => { const [i, d] = String(s).split(','); return fmt(+i) + (d !== undefined ? `,${d}` : ''); };
const opHtml = (s) => { const o = parseOp(s); return `${o.m} ${prettyDec(o.ks)}`; };

/**
 * host: phần tử chứa. values: chuỗi số mỗi băng ("27,86"). cards: các thẻ phép tính hiện dưới băng.
 * eq: dòng phép tính trên mỗi băng.
 */
export function createShift(host, { values = ['27,86'], cards = ['×10', '×100', '×1000', ':10', ':100', ':1000'], eq = true } = {}) {
  injectShiftStyles();
  const t = emitter({});
  const cardRows = cards.length > 6 ? [cards.slice(0, Math.ceil(cards.length / 2)), cards.slice(Math.ceil(cards.length / 2))] : [cards];
  host.innerHTML = `
    <div class="g5s ${values.length > 1 ? 'g5s-two' : ''}">
      <div class="g5s-rows">
        ${values.map((_, r) => `
          <div class="g5s-row" data-r="${r}">
            ${eq ? '<div class="g5s-eq">&nbsp;</div>' : ''}
            <div class="g5s-strip">
              ${[...Array(S)].map((__, i) => `<div class="g5s-c" data-i="${i}"><span></span></div>`).join('')}
              <div class="g5s-cl"><div class="g5s-cm">,</div></div>
              <div class="g5s-hops"></div>
            </div>
            <div class="g5s-dir">&nbsp;</div>
          </div>`).join('')}
      </div>
      ${cards.length ? `<div class="g5s-cards">${cardRows.map(row => `<div class="g5s-crow">${row.map(c => `<button type="button" class="g5s-card ${c[0] === ':' ? 'g5s-div' : ''}" data-op="${c}">${opHtml(c)}</button>`).join('')}</div>`).join('')}</div>` : ''}
    </div>`;
  const root = host.querySelector('.g5s');
  t.root = root;
  let locked = false;
  t.card = (op) => root.querySelector(`.g5s-card[data-op="${op}"]`);
  t.lock = (on) => { locked = on; root.classList.toggle('g5s-locked', on); };
  t.only = (ops) => root.querySelectorAll('.g5s-card').forEach(b => b.classList.toggle('g5s-off', !!ops && !ops.includes(b.dataset.op)));
  t.mark = (op) => root.querySelectorAll('.g5s-card').forEach(b => b.classList.toggle('g5s-on', b.dataset.op === op));
  root.querySelectorAll('.g5s-card').forEach(b => {
    b.onclick = () => { if (locked || b.classList.contains('g5s-off')) return; sfx.tap(); t.emit('op', b.dataset.op); };
  });
  t.rows = values.map((v, r) => makeRow(root.querySelector(`.g5s-row[data-r="${r}"]`), v));
  /** Phép tính trên băng r (mặc định băng 0). */
  t.apply = (op, r = 0, o) => t.rows[r].apply(op, o);
  t.set = (v, r = 0) => t.rows[r].set(v);
  return t;
}

function makeRow(row, value) {
  const strip = row.querySelector('.g5s-strip');
  const layer = row.querySelector('.g5s-cl');
  const hopsEl = row.querySelector('.g5s-hops');
  const cell = (i) => strip.querySelector(`.g5s-c[data-i="${i}"]`);
  let dg = Array(S).fill(null);
  let b = B0;
  const x = (bb) => `translateX(${(bb / S) * 100}%)`;
  const R = {
    get str() {
      const occ = dg.map((d, i) => (d == null ? -1 : i)).filter(i => i >= 0);
      if (!occ.length) return '0';
      let s = '';
      for (let i = Math.min(occ[0], b); i <= Math.max(occ[occ.length - 1], b - 1); i++) { if (i === b) s += ','; s += dg[i] ?? 0; }
      return shiftStr(s.startsWith(',') ? `0${s}` : s, 0);
    },
  };
  function paint() {
    for (let i = 0; i < S; i++) {
      const c = cell(i);
      c.querySelector('span').textContent = dg[i] ?? '';
      c.classList.toggle('g5s-has', dg[i] != null);
    }
    const occ = dg.map((d, i) => (d == null ? -1 : i)).filter(i => i >= 0);
    layer.classList.toggle('g5s-cl-end', !occ.some(i => i >= b));
    layer.style.transform = x(b);
  }
  R.set = (v) => {
    dg = Array(S).fill(null);
    const [i, f = ''] = String(v).split(',');
    b = B0;
    [...i].forEach((d, k) => { dg[B0 - i.length + k] = +d; });
    [...f].forEach((d, k) => { dg[B0 + k] = +d; });
    hopsEl.innerHTML = '';
    R.dir('&nbsp;');
    paint();
  };
  R.eq = (html) => { const e = row.querySelector('.g5s-eq'); if (e) e.innerHTML = html || '&nbsp;'; };
  R.dir = (html) => { row.querySelector('.g5s-dir').innerHTML = html; };
  R.cell = cell;
  R.strip = strip;

  /** Một ô 0 mọc ra (mờ rồi đậm). */
  async function grow(i) {
    dg[i] = 0;
    paint();
    const c = cell(i);
    c.classList.add('g5s-new');
    c.animate([{ transform: 'scaleX(0.2)', opacity: 0.2 }, { transform: 'none', opacity: 1 }], { duration: anim(360), easing: 'ease-out' });
    sfx.pop(2);
    await sleep(anim(380));
  }
  /** Bỏ chữ số 0 thừa (mờ đi). */
  async function drop(i) {
    const c = cell(i);
    await c.querySelector('span').animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(-30%)' }], { duration: anim(420), fill: 'forwards' }).finished.catch(() => {});
    dg[i] = null;
    c.querySelector('span').getAnimations().forEach(a => a.cancel());
    c.classList.remove('g5s-new');
    paint();
  }

  /** Dời dấu phẩy n bước (n > 0 sang phải), từng bước có tiếng tích; tự thêm / bỏ chữ số 0. */
  R.move = async (n, { label = true } = {}) => {
    hopsEl.innerHTML = '';
    if (label && n) R.dir(`${n > 0 ? 'sang phải' : 'sang trái'} <b>${Math.abs(n)}</b> chữ số ${n > 0 ? '➡️' : '⬅️'}`);
    strip.querySelectorAll('.g5s-new').forEach(c => c.classList.remove('g5s-new'));
    const sg = Math.sign(n);
    for (let h = 0; h < Math.abs(n); h++) {
      const nb = b + sg;
      // ô vừa vượt qua: sang phải là ô b, sang trái là ô b - 1; còn trống thì mọc 0
      const passed = sg > 0 ? b : b - 1;
      if (passed < 0 || passed >= S) break;
      if (dg[passed] == null) await grow(passed);
      const a = layer.animate([{ transform: x(b) }, { transform: x(nb) }], { duration: anim(330), easing: 'cubic-bezier(.4,0,.3,1.3)' });
      b = nb;
      layer.style.transform = x(b);
      hopsEl.insertAdjacentHTML('beforeend', `<span class="g5s-hop" style="left:${((passed + 0.5) / S) * 100}%">${h + 1}</span>`);
      hopsEl.lastElementChild.animate([{ transform: 'translate(-50%, 40%) scale(0.3)', opacity: 0 }, { transform: 'translate(-50%, 0) scale(1)', opacity: 1 }], { duration: anim(300), easing: 'ease-out' });
      sfx.pop(h + 3);
      await a.finished.catch(() => {});
      await sleep(anim(120));
    }
    // chỗ trống giữa dấu phẩy và chữ số (phần thập phân) thì là 0
    let occ = dg.map((d, i) => (d == null ? -1 : i)).filter(i => i >= 0);
    for (let i = b; occ.length && i < occ[0]; i++) await grow(i);
    occ = dg.map((d, i) => (d == null ? -1 : i)).filter(i => i >= 0);
    if (!occ.some(i => i < b) && b > 0) await grow(b - 1); // phần nguyên rỗng: 0
    await R.tidy();
    return R.str;
  };
  /** Bỏ 0 thừa ở đầu phần nguyên, cuối phần thập phân. */
  R.tidy = async () => {
    const lead = [], tail = [];
    for (let i = 0; i < b - 1; i++) { if (dg[i] == null) continue; if (dg[i] === 0) lead.push(i); else break; }
    for (let i = S - 1; i >= b; i--) { if (dg[i] == null) continue; if (dg[i] === 0) tail.push(i); else break; }
    if (lead.length || tail.length) {
      await sleep(anim(250));
      await Promise.all([...lead, ...tail].map(drop));
    }
    paint();
  };
  /** Áp dụng phép tính "×100", ":0,1"… Trả về chuỗi kết quả. */
  R.apply = async (op, o) => R.move(parseOp(op).n, o);
  R.set(value);
  return R;
}

let styled = false;
function injectShiftStyles() {
  if (styled) return;
  styled = true;
  css('g5-shift', `
    .g5s { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 2cqh; padding: 1cqh 1.4cqi; box-sizing: border-box; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; }
    .g5s-rows { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; justify-content: space-evenly; gap: 1cqh; container-type: size; }
    .g5s-row { display: flex; flex-direction: column; gap: 0.6cqh; }
    .g5s-eq { text-align: center; font-size: min(17cqh, 7.4cqi); line-height: 1.15; white-space: nowrap; }
    .g5s-eq b { color: #DC2626; }
    .g5s-eq .g5s-q { display: inline-block; min-width: 3.4em; border-bottom: 0.08em dashed #FCA5A5; color: #DC2626; }
    .g5s-strip { position: relative; display: grid; grid-template-columns: repeat(${S}, minmax(0, 1fr)); margin-top: 7cqh; }
    .g5s-c { height: min(38cqh, 13cqi); display: grid; place-items: center; border: 2px dashed #E2E8F0; border-left-width: 1px; border-right-width: 1px; font-size: min(28cqh, 10cqi); line-height: 1; transform-origin: 50% 100%; }
    .g5s-c.g5s-has { background: #EFF6FF; border: 2px solid #93C5FD; border-left-width: 1px; border-right-width: 1px; }
    .g5s-c.g5s-new { background: #FEF08A; border-color: #F59E0B; }
    .g5s-c.g5s-new span { color: #B45309; }
    .g5s-cl { position: absolute; left: 0; right: 0; bottom: 0; height: 100%; pointer-events: none; }
    .g5s-cm { position: absolute; left: 0; bottom: -0.3em; transform: translateX(-50%); color: #DC2626; font-size: min(34cqh, 12cqi); line-height: 1; text-shadow: 0 0 0.08em #fff, 0 0 0.08em #fff; }
    .g5s-cl-end .g5s-cm { opacity: 0.2; }
    .g5s-hops { position: absolute; left: 0; right: 0; bottom: 100%; height: 7cqh; pointer-events: none; }
    .g5s-hop { position: absolute; bottom: 0; transform: translateX(-50%); min-width: 1.4em; text-align: center; font-size: min(5.4cqh, 2.8cqi); line-height: 1.4; color: #fff; background: #F97316; border: 1.5px solid #C2410C; border-radius: 999px; }
    .g5s-dir { text-align: center; font-size: min(9cqh, 4cqi); color: #475569; min-height: 1.3em; line-height: 1.3; margin-top: min(9cqh, 3.4cqi); }
    .g5s-dir b { color: #DC2626; }
    .g5s-two .g5s-eq { font-size: min(11cqh, 6cqi); }
    .g5s-two .g5s-c { height: min(18cqh, 13cqi); font-size: min(14cqh, 10cqi); }
    .g5s-two .g5s-cm { font-size: min(18cqh, 12cqi); }
    .g5s-two .g5s-dir { font-size: min(6cqh, 3.4cqi); margin-top: min(4cqh, 3cqi); }
    .g5s-two .g5s-strip { margin-top: 4cqh; }
    .g5s-two .g5s-hops { height: 4cqh; }
    .g5s-two .g5s-hop { font-size: min(3.6cqh, 2.4cqi); }
    .g5s-cards { flex: none; display: flex; flex-direction: column; gap: 1.2cqh; }
    .g5s-crow { display: flex; gap: 1cqi; }
    .g5s-card { flex: 1 1 0; min-width: 0; font: inherit; font-size: min(6cqh, 3.6cqi); line-height: 1.2; padding: 0.25em 0.2em; border: 3px solid #1D4ED8; border-radius: 0.6em; background: #DBEAFE; color: #1E3A8A;
      box-shadow: 0 5px 0 #1D4ED8; cursor: pointer; touch-action: manipulation; white-space: nowrap; }
    .g5s-card.g5s-div { background: #FCE7F3; border-color: #BE185D; color: #831843; box-shadow: 0 5px 0 #BE185D; }
    .g5s-card:active { transform: translateY(4px); box-shadow: 0 1px 0 #1D4ED8; }
    .g5s-card.g5s-off { opacity: 0.35; cursor: default; }
    .g5s-card.g5s-on { background: #FEF08A; border-color: #CA8A04; color: #713F12; box-shadow: 0 5px 0 #CA8A04; }
    .g5s-locked .g5s-card { cursor: default; }
    @container (orientation: portrait) {
      .g5s-eq { font-size: min(10cqh, 8.6cqi); }
      .g5s-c { font-size: min(18cqh, 6.4cqi); }
      .g5s-dir { font-size: min(6cqh, 5.4cqi); }
      .g5s-hop { font-size: min(4cqh, 4cqi); }
    }
    @media (orientation: portrait) {
      .g5s-crow { flex-wrap: wrap; }
      .g5s-card { flex: 1 1 30%; font-size: min(4.6cqh, 6.4cqi); padding: 0.4em 0.2em; }
      .g5s-c { height: min(38cqh, 15cqi); }
    }
  `);
}
