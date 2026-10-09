/**
 * 🥢 Que tính (Toán 2): bó 1 chục que bên trái, que rời bên phải, như trong SGK.
 *   - Nút "+1 bó", "+1 que" ở dưới: bó / que bay vào chỗ của nó.
 *   - Đủ 10 que rời: nút "🎀 Bó lại" sáng, 10 que bay dồn sang thành 1 bó (cộng có nhớ).
 *   - Bấm một bó khi được phép tháo: bó bung ra 10 que rời (trừ có nhớ). Bấm que / bó khi được phép lấy: que bay đi.
 * Chỗ của 9 bó (thêm 1 chỗ cho bó vừa đổi) và 20 que rời giữ sẵn từ đầu, không xê dịch.
 */

import { createStage, desk, sfx, sleep } from './stage.js';
import { stick, bundle } from './art.js';

const ALL = { addTen: true, addOne: true, bundle: true, untie: false, takeOne: false, takeTen: false };

export function createSticks(host, { value = 0 } = {}) {
  const t = createStage(host, { bg: desk(0.13) });
  const tall = t.tall;
  // Bố cục theo hình tờ giấy
  const L = tall
    ? { head: [110, 90], tens: [30, 215, 940, 370], ones: [30, 600, 940, 350], tray: 965, bx: (i) => 75 + i * 94, by: () => 400, bh: 320,
      sx: (j) => 75 + (j % 10) * 94, sy: (j) => (j < 10 ? 690 : 862), sh: 150 }
    : { head: [95, 90], tens: [24, 200, 460, 440], ones: [512, 200, 464, 440], tray: 660, bx: (i) => 70 + (i % 5) * 92, by: (i) => (i < 5 ? 312 : 528), bh: 196,
      sx: (j) => 545 + (j % 10) * 44, sy: (j) => (j < 10 ? 316 : 526), sh: 180 };
  const [hy, hh] = L.head;
  const zone = (r, cls) => `<rect class="${cls}" x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" rx="22" fill="#FFFBEB" stroke="#E7C9A0" stroke-width="4"/>`;
  const HT = tall ? [30, 460] : [L.tens[0], L.tens[2]], HO = tall ? [510, 460] : [L.ones[0], L.ones[2]];
  const btnW = tall ? [300, 290, 290] : [300, 200, 210];
  const btnX = tall ? [30, 355, 670] : [104, 548, 762];
  t.draw(`
    <g class="x2s-head">
      <rect x="${HT[0]}" y="${hy}" width="${HT[1]}" height="${hh}" rx="18" fill="#DBEAFE" stroke="#93C5FD" stroke-width="3"/>
      <rect x="${HO[0]}" y="${hy}" width="${HO[1]}" height="${hh}" rx="18" fill="#DCFCE7" stroke="#86EFAC" stroke-width="3"/>
      <text x="${HT[0] + HT[1] * 0.3}" y="${hy + hh / 2}" class="x2a-t" font-size="40" fill="#1E40AF">Chục</text>
      <text class="x2s-dt x2a-t" x="${HT[0] + HT[1] * 0.75}" y="${hy + hh / 2 + 2}" font-size="76" fill="#1E40AF">0</text>
      <text x="${HO[0] + HO[1] * 0.3}" y="${hy + hh / 2}" class="x2a-t" font-size="40" fill="#166534">Đơn vị</text>
      <text class="x2s-do x2a-t" x="${HO[0] + HO[1] * 0.75}" y="${hy + hh / 2 + 2}" font-size="76" fill="#166534">0</text>
    </g>
    ${zone(L.tens, 'x2s-zt')}${zone(L.ones, 'x2s-zo')}
    <g class="x2s-items"></g>
    <g class="x2s-tray">
      ${['addTen', 'addOne', 'bundle'].map((k, i) => `<g class="x2s-btn" data-tap="${k}" data-btn="${k}">
        <rect x="${btnX[i]}" y="${L.tray}" width="${btnW[i]}" height="74" rx="20" fill="${['#BFDBFE', '#BBF7D0', '#FBCFE8'][i]}" stroke="${['#60A5FA', '#4ADE80', '#F472B6'][i]}" stroke-width="3"/>
        <rect x="${btnX[i]}" y="${L.tray + 66}" width="${btnW[i]}" height="10" rx="5" fill="${['#60A5FA', '#4ADE80', '#F472B6'][i]}" opacity="0.6"/>
        <text x="${btnX[i] + btnW[i] / 2}" y="${L.tray + 37}" class="x2a-t" font-size="38" fill="${['#1E40AF', '#166534', '#9D174D'][i]}">${['+ 1 bó chục', '+ 1 que', '🎀 Bó lại'][i]}</text></g>`).join('')}
    </g>`);
  const items = t.q('.x2s-items');
  const tens = Array(10).fill(null);   // <g> bó ở chỗ i
  const ones = Array(20).fill(null);   // <g> que ở chỗ j
  let allow = { ...ALL };
  let locked = false;
  let busy = false;

  const nT = () => tens.filter(Boolean).length;
  const nO = () => ones.filter(Boolean).length;
  Object.defineProperty(t, 'tens', { get: nT });
  Object.defineProperty(t, 'ones', { get: nO });
  Object.defineProperty(t, 'value', { get: () => nT() * 10 + nO() });
  Object.defineProperty(t, 'busy', { get: () => busy });

  function head() {
    t.q('.x2s-dt').textContent = nT();
    const o = t.q('.x2s-do');
    o.textContent = nO();
    o.setAttribute('fill', nO() >= 10 ? '#DC2626' : '#166534');
    refresh();
  }
  function refresh() {
    const on = { addTen: allow.addTen && nT() < 9, addOne: allow.addOne && nO() < 20, bundle: allow.bundle && nO() >= 10 };
    for (const k of Object.keys(on)) {
      const b = t.q(`[data-btn="${k}"]`);
      const off = locked || !on[k];
      b.classList.toggle('x2a-off', off);
      b.style.opacity = off ? 0.38 : 1;
    }
    t.qa('.x2s-ten').forEach((g) => g.classList.toggle('x2a-off', locked || !(allow.untie || allow.takeTen)));
    t.qa('.x2s-one').forEach((g) => g.classList.toggle('x2a-off', locked || !allow.takeOne));
  }
  const mkTen = (i) => {
    const g = t.add(`<g class="x2s-ten" data-tap="ten:${i}" transform="translate(${L.bx(i)} ${L.by(i)})">${bundle(L.bh)}</g>`, items);
    tens[i] = g; return g;
  };
  const mkOne = (j) => {
    const g = t.add(`<g class="x2s-one" data-tap="one:${j}" transform="translate(${L.sx(j)} ${L.sy(j)})">${stick(L.sh)}</g>`, items);
    ones[j] = g; return g;
  };
  const free = (arr) => arr.findIndex((x) => !x);

  t.set = (v) => {
    items.innerHTML = '';
    tens.fill(null); ones.fill(null);
    for (let i = 0; i < Math.floor(v / 10); i++) mkTen(i);
    for (let j = 0; j < v % 10; j++) mkOne(j);
    head();
  };
  t.lock = (on) => { locked = on; refresh(); };
  /** Cho phép thao tác nào (các khoá khác về mặc định). */
  t.allow = (o = {}) => { allow = { addTen: false, addOne: false, bundle: false, untie: false, takeOne: false, takeTen: false, ...o }; locked = false; refresh(); };
  t.btn = (k) => t.q(`[data-btn="${k}"]`);
  t.tenEl = (i = tens.findIndex(Boolean)) => tens[i];
  t.oneEl = () => ones.find(Boolean);
  t.glow = (z) => {
    t.q('.x2s-zt').setAttribute('stroke', z === 'tens' ? '#FACC15' : '#E7C9A0');
    t.q('.x2s-zo').setAttribute('stroke', z === 'ones' ? '#FACC15' : '#E7C9A0');
    t.q('.x2s-zt').setAttribute('stroke-width', z === 'tens' ? 10 : 4);
    t.q('.x2s-zo').setAttribute('stroke-width', z === 'ones' ? 10 : 4);
  };

  const btnPos = (k) => { const i = ['addTen', 'addOne', 'bundle'].indexOf(k); return [btnX[i] + btnW[i] / 2, L.tray + 37]; };

  t.addTen = async () => {
    const i = free(tens); if (i < 0) return;
    const g = mkTen(i);
    const [x, y] = btnPos('addTen');
    sfx.pop?.(nT());
    head();
    await t.flyIn(g, x - L.bx(i), y - L.by(i), 480, { lift: 60 });
  };
  t.addOne = async () => {
    const j = free(ones); if (j < 0) return;
    const g = mkOne(j);
    const [x, y] = btnPos('addOne');
    sfx.pop?.(nO());
    head();
    await t.flyIn(g, x - L.sx(j), y - L.sy(j), 420, { lift: 50 });
  };
  /** 10 que rời bay dồn thành 1 bó. */
  t.bundleUp = async () => {
    if (nO() < 10) return;
    const i = free(tens);
    const js = ones.map((g, j) => (g ? j : -1)).filter((j) => j >= 0).slice(0, 10);
    await Promise.all(js.map((j, k) => t.anim(ones[j], [{ transform: 'none' }, { transform: `translate(${L.bx(i) - L.sx(j)}px, ${L.by(i) - L.sy(j)}px)` }],
      650, { delay: k * 30, easing: 'ease-in-out', fill: 'forwards' })));
    js.forEach((j) => { ones[j].remove(); ones[j] = null; });
    // que còn lại dồn về đầu hàng
    const rest = ones.filter(Boolean);
    ones.fill(null);
    rest.forEach((g, j) => { ones[j] = g; g.setAttribute('transform', `translate(${L.sx(j)} ${L.sy(j)})`); g.dataset.tap = `one:${j}`; });
    const g = mkTen(i);
    sfx.ding?.();
    head();
    await t.pop(g);
  };
  /** Tháo bó ở chỗ i thành 10 que rời. */
  t.untie = async (i = tens.findLastIndex(Boolean)) => {
    const g = tens[i]; if (!g) return;
    tens[i] = null;
    await t.anim(g, [{ transform: 'scale(1)' }, { transform: 'scale(1.15) rotate(-6deg)' }, { transform: 'scale(1)' }], 380);
    g.remove();
    // dồn bó còn lại về đầu
    const rest = tens.filter(Boolean); tens.fill(null);
    rest.forEach((b, k) => { tens[k] = b; b.setAttribute('transform', `translate(${L.bx(k)} ${L.by(k)})`); b.dataset.tap = `ten:${k}`; });
    const made = [];
    for (let k = 0; k < 10; k++) { const j = free(ones); if (j < 0) break; made.push([mkOne(j), j]); }
    head();
    sfx.swish?.();
    await Promise.all(made.map(([s, j], k) => t.anim(s, [{ transform: `translate(${L.bx(i) - L.sx(j)}px, ${L.by(i) - L.sy(j)}px)` }, { transform: 'none' }],
      620, { delay: k * 35, fill: 'backwards' })));
  };
  const takeAway = async (g) => {
    await t.anim(g, [{ transform: 'none', opacity: 1 }, { transform: 'translate(0px, -140px) rotate(25deg)', opacity: 0 }], 420, { fill: 'forwards' });
    g.remove();
  };
  t.takeOne = async (j = ones.findLastIndex(Boolean)) => {
    const g = ones[j]; if (!g) return;
    ones[j] = null; head(); sfx.tap?.();
    await takeAway(g);
  };
  t.takeTen = async (i = tens.findLastIndex(Boolean)) => {
    const g = tens[i]; if (!g) return;
    tens[i] = null; head(); sfx.tap?.();
    await takeAway(g);
  };

  // Bấm của em
  t.on(async (ev, key) => {
    if (ev !== 'tap' || locked || busy) return;
    const [kind, n] = key.split(':');
    let job = null;
    if (kind === 'addTen' && allow.addTen && nT() < 9) job = t.addTen;
    else if (kind === 'addOne' && allow.addOne && nO() < 20) job = t.addOne;
    else if (kind === 'bundle' && allow.bundle && nO() >= 10) job = t.bundleUp;
    else if (kind === 'ten' && allow.untie) job = () => t.untie(+n);
    else if (kind === 'ten' && allow.takeTen) job = () => t.takeTen(+n);
    else if (kind === 'one' && allow.takeOne) job = () => t.takeOne(+n);
    if (!job) return;
    busy = true;
    try { await job(); } finally { busy = false; }
    t.emit('change', t.value);
  });

  t.set(value);
  return t;
}

/** Chờ đến khi số que tính bằng v (em bấm), nhắc thiếu / thừa. */
export async function buildSticks(c, t, v, { nudge } = {}) {
  const want = [Math.floor(v / 10), v % 10];
  const off = t.on((ev) => {
    if (ev !== 'change') return;
    if (t.tens > want[0]) c.hint(`Chỉ cần ${want[0]} bó chục thôi.`);
    else if (t.ones > want[1] && t.ones < 10) c.hint(`Chỉ cần ${want[1]} que rời thôi.`);
  });
  try {
    await c.until(t, () => t.value === v && !t.busy, {
      nudge: nudge || (() => (t.tens < want[0] ? `Bấm "cộng 1 bó chục" cho đủ ${want[0]} bó.` : `Bấm "cộng 1 que" cho đủ ${want[1]} que rời.`)),
      el: () => (t.tens < want[0] ? t.btn('addTen') : t.btn('addOne')),
    });
  } finally { off(); }
  await sleep(200);
}
