/**
 * 🪜 Bảng đơn vị có ô chữ số (Toán 5 Bài 12, 16): một hàng ô chữ số dưới tên các đơn vị.
 * Độ dài, khối lượng: mỗi đơn vị một ô (bậc gấp 10). Diện tích: mỗi đơn vị hai ô (bậc gấp 100); giữa ha và m²
 * có cặp ô ẩn (dam², sách không dạy) nên ha sang m² là 4 ô (gấp 10 000).
 *
 * Bấm thẻ số đo ("3 m", "8 cm") → các chữ số bay vào đúng ô (chữ số hàng đơn vị của số đo vào ô của đơn vị đó).
 * Ô trống kẹp giữa hiện 0 vàng (chữ số 0 giữ chỗ: 3 m 8 cm = 3,08 m). Bấm tên một đơn vị → dấu phẩy đỏ trượt tới
 * ngay sau ô của đơn vị đó và số thập phân hiện ra; chữ số 0 ở cuối phần thập phân mờ đi (bỏ được).
 * Sự kiện (t.on): 'drop' (thẻ i đã vào bảng), 'target' (đổi đơn vị đích).
 */

import { css, emitter, INK, sfx } from '../grade4Tools/frame.js';
import { flyDigit, sleep } from '../grade3Drills/kit.js';
import { anim } from '../grade4Tools/canvas.js';
import { fmt } from './num.js';

/** [tên, tên đọc, ẩn?]. Ô màu theo đơn vị (xen kẽ để thấy rõ nhóm ô). */
export const UNIT_KINDS = {
  len: { per: 1, lead: 1, units: [['km', 'ki-lô-mét'], ['hm', 'héc-tô-mét'], ['dam', 'đề-ca-mét'], ['m', 'mét'], ['dm', 'đề-xi-mét'], ['cm', 'xăng-ti-mét'], ['mm', 'mi-li-mét']] },
  mass: { per: 1, lead: 1, units: [['tấn', 'tấn'], ['tạ', 'tạ'], ['yến', 'yến'], ['kg', 'ki-lô-gam'], ['hg', 'héc-tô-gam'], ['dag', 'đề-ca-gam'], ['g', 'gam']] },
  area: { per: 2, lead: 0, units: [['km²', 'ki-lô-mét vuông'], ['ha', 'héc-ta'], ['dam²', '', true], ['m²', 'mét vuông'], ['dm²', 'đề-xi-mét vuông'], ['cm²', 'xăng-ti-mét vuông'], ['mm²', 'mi-li-mét vuông']] },
  vol: { per: 1, lead: 1, units: [['l', 'lít'], ['dl', '', true], ['cl', '', true], ['ml', 'mi-li-lít']] },
};
/** Chỉ số đơn vị theo tên: unitIdx('len', 'cm') → 5. */
export const unitIdx = (kind, name) => UNIT_KINDS[kind].units.findIndex(u => u[0] === name);
/** Tên đọc của đơn vị (cho giọng). */
export const unitSay = (kind, name) => UNIT_KINDS[kind].units[unitIdx(kind, name)][1];
/** "3 m² 6 dm²" → "3 mét vuông 6 đề-xi-mét vuông" (giọng đọc). */
export const sayUnits = (s) => s
  .replace(/km²/g, ' ki-lô-mét vuông').replace(/dm²/g, ' đề-xi-mét vuông').replace(/cm²/g, ' xăng-ti-mét vuông').replace(/mm²/g, ' mi-li-mét vuông').replace(/m²/g, ' mét vuông')
  .replace(/\bha\b/g, 'héc-ta').replace(/\bkm\b/g, 'ki-lô-mét').replace(/\bhm\b/g, 'héc-tô-mét').replace(/\bdam\b/g, 'đề-ca-mét').replace(/\bdm\b/g, 'đề-xi-mét')
  .replace(/\bcm\b/g, 'xăng-ti-mét').replace(/\bmm\b/g, 'mi-li-mét').replace(/\bkg\b/g, 'ki-lô-gam').replace(/\bg\b/g, 'gam').replace(/\bml\b/g, 'mi-li-lít').replace(/\bl\b/g, 'lít')
  .replace(/(\d),(\d)/g, '$1 phẩy $2').replace(/ {2,}/g, ' ');

const BG = ['#DBEAFE', '#FCE7F3', '#DCFCE7', '#FEF3C7', '#EDE9FE', '#CFFAFE', '#FFE4E6'];
const HINK = ['#1E40AF', '#9D174D', '#166534', '#92400E', '#5B21B6', '#155E75', '#9F1239'];

/**
 * host: phần tử chứa. kind: 'len' | 'mass' | 'area' | 'vol'. from, to: khoảng đơn vị hiện trên bảng (chỉ số trong
 * UNIT_KINDS[kind].units). top: hàng thẻ số đo + kết quả ở trên; read: dòng chữ dưới bảng.
 */
export function createUnits(host, { kind = 'len', from = 0, to = null, top = true, read = true } = {}) {
  injectUnitStyles();
  const K = UNIT_KINDS[kind];
  const last = to ?? K.units.length - 1;
  const per = K.per;
  const span = (u) => per + (u === from ? K.lead : 0);
  const N = (last - from + 1) * per + K.lead;
  const ones = (u) => (last - u) * per; // ô hàng đơn vị của đơn vị u (đếm từ phải, 0 = ô cuối)
  const t = emitter({});
  t.kind = kind; t.N = N; t.from = from; t.to = last;

  let cells = '';
  for (let p = N - 1; p >= 0; p--) {
    const u = Math.max(from, last - Math.floor(p / per));
    const first = p === ones(u) + span(u) - 1;
    cells += `<div class="g5u-c ${first ? 'g5u-c1' : ''} ${K.units[u][2] ? 'g5u-chid' : ''} ${p === 0 ? 'g5u-cz' : ''}" data-p="${p}" style="--bg:${BG[u % BG.length]}"><span></span></div>`;
  }
  host.innerHTML = `
    <div class="g5u g5u-${kind}" style="--n:${N}">
      ${top ? '<div class="g5u-top"><div class="g5u-chips"></div><span class="g5u-eq">=</span><div class="g5u-res">&nbsp;</div></div>' : ''}
      <div class="g5u-tab">
        ${per === 2 ? '<div class="g5u-per">mỗi đơn vị <b>2 ô</b> · gấp <b>100</b> lần</div>' : `<div class="g5u-per">mỗi đơn vị <b>1 ô</b> · gấp <b>10</b> lần</div>`}
        <div class="g5u-grid">
          ${K.units.slice(from, last + 1).map((u, k) => {
            const i = from + k;
            return `<button type="button" class="g5u-h ${u[2] ? 'g5u-hid' : ''}" data-u="${i}" style="grid-column: span ${span(i)}; --bg:${BG[i % BG.length]}; --ink:${HINK[i % HINK.length]}" ${u[2] ? 'disabled tabindex="-1"' : ''}>${u[2] ? '' : u[0]}</button>`;
          }).join('')}
          ${cells}
          <div class="g5u-cl"><div class="g5u-cm">,</div></div>
        </div>
      </div>
      ${read ? '<div class="g5u-read"><span>&nbsp;</span></div>' : ''}
    </div>`;
  const root = host.querySelector('.g5u');
  const cell = (p) => root.querySelector(`.g5u-c[data-p="${p}"]`);
  const head = (u) => root.querySelector(`.g5u-h[data-u="${u}"]`);
  const layer = root.querySelector('.g5u-cl');
  t.root = root; t.head = head; t.cell = cell;

  let placed = new Map(); // p → chữ số em đã đặt
  let parts = [];
  const dropped = new Set();
  let target = null;
  let zeros = false;
  let locked = false;
  let busy = 0;

  /** Các ô hiện chữ số và kiểu ô ('pz' = 0 giữ chỗ, 'tz' = 0 cuối phần thập phân, bỏ được). */
  function layout() {
    const ps = [...placed.keys()];
    const nz = ps.filter(p => placed.get(p) > 0);
    const out = new Map();
    if (!ps.length) return { out, str: '' };
    const T = target == null ? null : ones(target);
    const hiNZ = nz.length ? Math.max(...nz) : (T ?? 0);
    const lowNZ = nz.length ? Math.min(...nz) : (T ?? 0);
    const topP = T == null ? Math.max(...ps) : Math.max(hiNZ, T);
    const bot = T == null ? Math.min(...ps) : Math.min(T, Math.min(...ps));
    for (let p = topP; p >= bot; p--) {
      const has = placed.has(p);
      if (!has && !zeros && target == null) continue;
      const d = has ? placed.get(p) : 0;
      let k = has ? '' : 'pz';
      if (T != null && p < T && p < lowNZ) k = 'tz';
      out.set(p, { d, k });
    }
    let str = '';
    if (T != null) {
      let ip = '', fp = '';
      for (let p = topP; p >= bot; p--) { const d = out.get(p)?.d ?? 0; if (p >= T) ip += d; else fp += d; }
      fp = fp.replace(/0+$/, '');
      str = (ip.replace(/^0+(?=\d)/, '') || '0') + (fp ? `,${fp}` : '');
    }
    return { out, str };
  }

  function render() {
    const { out, str } = layout();
    for (let p = 0; p < N; p++) {
      const c = cell(p), o = out.get(p);
      c.querySelector('span').textContent = o ? o.d : '';
      c.classList.toggle('g5u-pz', o?.k === 'pz');
      c.classList.toggle('g5u-tz', o?.k === 'tz');
    }
    root.querySelectorAll('.g5u-h').forEach(h => h.classList.toggle('g5u-hon', target != null && +h.dataset.u === target));
    t.decimal = str;
    const res = root.querySelector('.g5u-res');
    if (res) res.innerHTML = target != null && str ? `${pretty(str)} <small>${K.units[target][0]}</small>` : '&nbsp;';
    layer.classList.toggle('g5u-cl-on', target != null);
    layer.classList.toggle('g5u-cl-end', target != null && !str.includes(','));
  }
  const pretty = (s) => { const [i, d] = s.split(','); return fmt(+i) + (d ? `,${d}` : ''); };
  const commaX = (u) => `translateX(${((N - ones(u)) / N) * 100}%)`;

  /** Đặt các thẻ số đo: [{ u, v }] (u: chỉ số đơn vị). Xoá bảng. */
  t.setParts = (ps) => {
    parts = ps; placed = new Map(); dropped.clear(); target = null; zeros = false;
    layer.style.transform = '';
    const box = root.querySelector('.g5u-chips');
    if (box) {
      box.innerHTML = ps.map((q, i) => `<button type="button" class="g5u-chip" data-i="${i}"><span class="g5u-cn">${String(q.v).split('').map(d => `<i>${d}</i>`).join('')}</span> ${K.units[q.u][0]}</button>`).join('');
      box.querySelectorAll('.g5u-chip').forEach(b => { b.onclick = () => { if (!locked && !busy) t.drop(+b.dataset.i); }; });
    }
    render();
  };
  t.chip = (i) => root.querySelector(`.g5u-chip[data-i="${i}"]`);
  t.dropped = (i) => dropped.has(i);
  t.allDropped = () => parts.every((_, i) => dropped.has(i));
  Object.defineProperty(t, 'target', { get: () => target });

  /** Thẻ i: các chữ số bay vào ô (chữ số hàng đơn vị vào ô của đơn vị). */
  t.drop = async (i, { quiet = false } = {}) => {
    if (dropped.has(i)) return;
    dropped.add(i);
    busy++;
    const q = parts[i];
    const ds = String(q.v).split('').reverse();
    const chip = t.chip(i);
    chip?.classList.add('g5u-used');
    const spans = chip ? [...chip.querySelectorAll('.g5u-cn i')].reverse() : [];
    await Promise.all(ds.map((d, k) => new Promise((res) => {
      const p = ones(q.u) + k;
      const to = cell(p);
      setTimeout(() => {
        const from = spans[k] || to;
        flyDigit(d, from, to, { onLand: () => { placed.set(p, +d); render(); sfx.pop(k); res(); } });
      }, (ds.length - 1 - k) * 160);
    })));
    busy--;
    if (!quiet) t.emit('drop', i);
  };

  /** Hiện các chữ số 0 giữ chỗ (ô trống kẹp giữa) và nhấp nháy chúng. */
  t.fillZeros = async () => {
    zeros = true;
    render();
    const els = [...root.querySelectorAll('.g5u-pz')];
    els.forEach((e, k) => e.animate([{ transform: 'scale(0.4)', opacity: 0 }, { transform: 'scale(1.18)', opacity: 1, offset: 0.6 }, { transform: 'none' }], { duration: anim(520), delay: k * 140, fill: 'backwards' }));
    if (els.length) sfx.ding();
    await sleep(anim(520) + els.length * 140);
    return els.length;
  };
  t.zeroCount = () => root.querySelectorAll('.g5u-pz').length;

  /** Dấu phẩy trượt tới ngay sau ô của đơn vị u. */
  t.setTarget = async (u, { quiet = false } = {}) => {
    if (K.units[u]?.[2]) return;
    const prev = target;
    busy++;
    const before = prev == null ? null : commaX(prev);
    target = u;
    zeros = true;
    render();
    const after = commaX(u);
    layer.style.transform = after;
    const hops = prev == null ? 0 : Math.abs(ones(u) - ones(prev));
    if (before && hops) {
      const a = layer.animate([{ transform: before }, { transform: after }], { duration: anim(260 * hops + 200), easing: 'ease-in-out' });
      for (let h = 0; h < hops; h++) setTimeout(() => sfx.tap(), anim(260 * h + 200));
      await a.finished.catch(() => {});
    } else {
      layer.querySelector('.g5u-cm').animate([{ transform: 'translate(-50%, -120%) scale(1.6)', opacity: 0 }, { transform: 'translate(-50%, 0) scale(1)', opacity: 1 }], { duration: anim(500), easing: 'cubic-bezier(.3,1.4,.5,1)' });
      sfx.swish();
      await sleep(anim(500));
    }
    root.querySelectorAll('.g5u-pz').forEach(e => e.animate([{ transform: 'scale(1.08)' }, { transform: 'none' }], { duration: anim(300) }));
    const res = root.querySelector('.g5u-res');
    res?.animate([{ transform: 'scale(1.2)' }, { transform: 'none' }], { duration: anim(380) });
    busy--;
    if (!quiet) t.emit('target', u);
  };

  /** Chạy nhanh cả bài: thả mọi thẻ, hiện 0 giữ chỗ, đặt dấu phẩy (dùng khi kiểm chứng đáp án / nhắc). */
  t.play = async (ps, u) => {
    if (ps) t.setParts(ps);
    for (let i = 0; i < parts.length; i++) await t.drop(i, { quiet: true });
    await t.fillZeros();
    if (u != null) await t.setTarget(u, { quiet: true });
  };
  /** Đặt thẳng số thập phân s ("2,15") theo đơn vị u (không bay). */
  t.setDecimal = (s, u) => {
    parts = []; placed = new Map(); dropped.clear(); zeros = true; target = u;
    const [ip, fp = ''] = s.split(',');
    const T = ones(u);
    [...ip].reverse().forEach((d, k) => { if (k === 0 || +ip >= 10 ** k) placed.set(T + k, +d); });
    [...fp].forEach((d, k) => placed.set(T - 1 - k, +d));
    layer.style.transform = commaX(u);
    const box = root.querySelector('.g5u-chips');
    if (box) box.innerHTML = '';
    render();
  };
  t.read = (html) => { const r = root.querySelector('.g5u-read span'); if (r) r.innerHTML = html || '&nbsp;'; };
  t.top = (html) => { const r = root.querySelector('.g5u-chips'); if (r) r.innerHTML = html; };
  t.lock = (on) => { locked = on; root.classList.toggle('g5u-locked', on); };
  /** Chỉ cho bấm một số đơn vị (null = tất cả). */
  t.only = (us) => root.querySelectorAll('.g5u-h:not(.g5u-hid)').forEach(h => { h.classList.toggle('g5u-off', !!us && !us.includes(+h.dataset.u)); });
  t.glow = (u) => root.querySelectorAll('.g5u-h').forEach(h => h.classList.toggle('g5u-glow', u != null && +h.dataset.u === u));

  root.querySelectorAll('.g5u-h:not(.g5u-hid)').forEach(h => {
    h.onclick = () => {
      if (locked || busy || h.classList.contains('g5u-off') || !placed.size) return;
      const u = +h.dataset.u;
      if (u === target) return;
      t.setTarget(u);
    };
  });
  t.setParts([]);
  return t;
}

let styled = false;
function injectUnitStyles() {
  if (styled) return;
  styled = true;
  css('g5-units', `
    .g5u { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 1.2cqh; padding: 1cqh 1.4cqi 0; box-sizing: border-box; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; }
    .g5u-top { flex: none; display: flex; align-items: center; justify-content: center; gap: 1.4cqi; font-size: min(10cqh, 5.6cqi); line-height: 1.15; min-height: 1.5em; }
    .g5u-chips { display: flex; gap: 1cqi; }
    .g5u-chip { font: inherit; color: #7C2D12; background: #FED7AA; border: 1.5px solid #FB923C; border-radius: 0.45em; padding: 0.02em 0.4em; box-shadow: 0 4px 0 rgba(63,58,64,0.2); cursor: pointer; touch-action: manipulation; white-space: nowrap; }
    .g5u-chip:active { transform: translateY(4px); box-shadow: 0 1px 0 rgba(63,58,64,0.35); }
    .g5u-chip i { font-style: normal; }
    .g5u-chip.g5u-used { background: #F1F5F9; color: #94A3B8; border-color: #CBD5E1; box-shadow: none; cursor: default; }
    .g5u-eq { color: #64748B; }
    .g5u-res { min-width: 4.4em; text-align: center; color: #DC2626; border-bottom: 0.08em dashed #FCA5A5; white-space: nowrap; }
    .g5u-res small { font-size: 0.75em; color: #1E293B; }
    .g5u-tab { flex: 1 1 0; min-height: 0; container-type: size; display: flex; flex-direction: column; justify-content: center; gap: 1.5cqh; padding-bottom: 6cqh; box-sizing: border-box; }
    .g5u-grid { position: relative; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); grid-template-rows: auto auto; }
    .g5u-h { font: inherit; font-size: min(14cqh, calc(34cqi / var(--n) + 1.4cqi)); line-height: 1; padding: 0.25em 0.05em; margin: 0 0.12cqi 0.8cqh; border: 1.5px solid rgba(63,58,64,0.22); border-radius: 0.4em; background: var(--bg); color: var(--ink);
      box-shadow: 0 4px 0 rgba(63,58,64,0.3); cursor: pointer; touch-action: manipulation; white-space: nowrap; overflow: hidden; }
    .g5u-h:active { transform: translateY(3px); box-shadow: 0 1px 0 rgba(63,58,64,0.3); }
    .g5u-h.g5u-hid { background: #F8FAFC; border: 3px dashed #CBD5E1; box-shadow: none; cursor: default; }
    .g5u-h.g5u-hon { background: #FEE2E2; color: #B91C1C; border-color: #DC2626; box-shadow: 0 4px 0 #DC2626; }
    .g5u-h.g5u-off { opacity: 0.45; cursor: default; }
    .g5u-h.g5u-glow { animation: g5uGlow 1.1s ease-in-out infinite; }
    @keyframes g5uGlow { 50% { box-shadow: 0 0 0 5px #FDE047, 0 0 16px 5px #FACC15; } }
    .g5u-locked .g5u-h { cursor: default; }
    .g5u-c { position: relative; height: min(60cqh, calc(220cqi / var(--n))); display: grid; place-items: center; background: var(--bg); border: 2px solid #94A3B8; border-left-width: 1px; border-right-width: 1px;
      font-size: min(42cqh, calc(105cqi / var(--n))); line-height: 1; color: #1E293B; }
    .g5u-c1 { border-left: 3px solid ${INK}; }
    .g5u-cz { border-right: 3px solid ${INK}; }
    .g5u-c.g5u-chid { background: #F8FAFC; }
    .g5u-pz span { color: #B45309; }
    .g5u-pz { background: #FEF08A !important; box-shadow: inset 0 0 0 3px #F59E0B; }
    .g5u-tz span { color: #CBD5E1; }
    .g5u-cl { position: absolute; left: 0; right: 0; bottom: 0; height: min(60cqh, calc(220cqi / var(--n))); pointer-events: none; opacity: 0; transition: opacity .25s; }
    .g5u-cl-on { opacity: 1; }
    .g5u-cm { position: absolute; left: 0; bottom: -0.32em; transform: translateX(-50%); color: #DC2626; font-size: min(46cqh, calc(118cqi / var(--n))); line-height: 1; text-shadow: 0 0 0.08em #fff, 0 0 0.08em #fff; }
    .g5u-cl-end .g5u-cm { opacity: 0.25; }
    .g5u-per { text-align: center; font-size: min(7cqh, 3.2cqi); color: #64748B; font-weight: 700; }
    .g5u-per b { color: #1E293B; }
    .g5u-read { flex: none; text-align: center; font-size: min(7cqh, 4cqi); line-height: 1.3; min-height: 2.7em; color: #1E293B; display: flex; align-items: center; justify-content: center; }
    .g5u-read b { color: #DC2626; }
    @container (orientation: portrait) {
      .g5u-c, .g5u-cl { height: min(45cqh, calc(300cqi / var(--n))); }
      .g5u-top { font-size: min(6cqh, 7.4cqi); }
      .g5u-read { font-size: min(4.6cqh, 5.6cqi); }
    }
    @container (max-aspect-ratio: 1/1) { .g5u-per { font-size: min(6cqh, 5cqi); } }
  `);
}
