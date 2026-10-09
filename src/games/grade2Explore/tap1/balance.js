/**
 * ⚖️ Cân đĩa (Toán 2: ki-lô-gam). Khay đồ ở dưới; chạm đồ ở khay → bay lên đĩa của nó (đồ vật: đĩa trái, quả cân: đĩa phải);
 * chạm đồ trên đĩa → về khay (khi được phép). Lệch bao nhiêu cũng nghiêng hết cỡ về bên nặng hơn, như cân thật.
 */

import { createStage, kitchen, INK, sfx, svgEl, anim, sleep } from './stage.js';
import { WEIGHT_ART } from './art.js';

const TILT = 9; // độ
const SC = 1.6; // đồ vật vẽ to gấp SC lần cỡ gốc

export function createBalance(host, { items = [], left = [], right = [] } = {}) {
  const t = createStage(host, { bg: kitchen(0.7) });
  const T = t.tall;
  const P = T ? { x: 500, y: 360, arm: 320, hang: 210, base: 820, tray: 950, slot: 150 } : { x: 500, y: 250, arm: 310, hang: 200, base: 610, tray: 680, slot: 130 };
  t.draw(`
    <g class="x2w-stand">
      <path d="M${P.x - 130} ${P.base} H${P.x + 130} L${P.x + 90} ${P.base - 40} H${P.x - 90} Z" fill="#94A3B8" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
      <rect x="${P.x - 16}" y="${P.y}" width="32" height="${P.base - P.y - 40}" fill="#CBD5E1" stroke="${INK}" stroke-width="4"/>
    </g>
    <g class="x2w-beam"><rect x="${P.x - P.arm - 10}" y="${P.y - 12}" width="${2 * P.arm + 20}" height="24" rx="12" fill="#F59E0B" stroke="${INK}" stroke-width="4"/>
      <path d="M${P.x} ${P.y} L${P.x} ${P.y - 80}" stroke="#DC2626" stroke-width="7" stroke-linecap="round"/></g>
    <circle cx="${P.x}" cy="${P.y}" r="16" fill="#fff" stroke="${INK}" stroke-width="4"/>
    <path d="M${P.x - 22} ${P.y - 92} L${P.x} ${P.y - 74} L${P.x + 22} ${P.y - 92}" fill="none" stroke="${INK}" stroke-width="4"/>
    ${[-1, 1].map((s) => `<g class="x2w-pan" data-side="${s}">
      <path d="M-150 0 L0 ${-P.hang} L150 0" fill="none" stroke="${INK}" stroke-width="3"/>
      <path d="M-175 0 H175 Q150 34 0 34 Q-150 34 -175 0 Z" fill="#E2E8F0" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
      <g class="x2w-on"></g></g>`).join('')}
    <g class="x2w-tray"><rect x="40" y="${P.tray - P.slot / 2 - 8}" width="920" height="${P.slot + 16}" rx="24" fill="#FFF7ED" stroke="#E7C9A0" stroke-width="4"/></g>
    <g class="x2w-items"></g>`);
  const beam = t.q('.x2w-beam');
  const pans = { '-1': t.q('.x2w-pan[data-side="-1"]'), 1: t.q('.x2w-pan[data-side="1"]') };
  const where = new Map(); // id → 'tray' | -1 | 1
  const byId = new Map(items.map((it) => [it.id, it]));
  let angle = 0, locked = false, canBack = true;
  const trayX = (i) => 40 + (920 / items.length) * (i + 0.5);

  function pose(a) {
    angle = a;
    beam.setAttribute('transform', `rotate(${a} ${P.x} ${P.y})`);
    const r = (a * Math.PI) / 180;
    for (const s of [-1, 1]) {
      const x = P.x + s * P.arm * Math.cos(r), y = P.y + s * P.arm * Math.sin(r);
      pans[s].setAttribute('transform', `translate(${x} ${y + P.hang})`);
    }
  }
  const sum = (s) => items.filter((it) => where.get(it.id) === s).reduce((a, it) => a + it.g, 0);
  const target = () => { const d = sum(-1) - sum(1); return d > 0 ? -TILT : d < 0 ? TILT : 0; };
  async function settle() {
    const a0 = angle, a1 = target();
    if (a0 === a1) return;
    const ms = anim(700), t0 = performance.now();
    await new Promise((res) => {
      const step = (now) => {
        const k = Math.min(1, (now - t0) / ms), e = 1 - (1 - k) ** 3;
        pose(a0 + (a1 - a0) * e + (k < 1 ? Math.sin(k * Math.PI * 3) * (1 - k) * 2 : 0));
        if (k < 1) requestAnimationFrame(step); else res();
      };
      requestAnimationFrame(step);
    });
    pose(a1);
    sfx.tap?.();
  }
  function layoutPan(s) {
    const on = items.filter((it) => where.get(it.id) === s);
    // tối đa 3 đồ một tầng, tầng sau xếp chồng lên trên
    for (let r = 0; r * 3 < on.length; r++) {
      const row = on.slice(r * 3, r * 3 + 3);
      const w = row.reduce((a, it) => a + (it.w || 80) * SC, 0);
      let x = -w / 2;
      const base = on.slice(0, r * 3).length ? -Math.max(...on.slice((r - 1) * 3, r * 3).map((it) => (it.h || 70) * SC)) * r : 0;
      for (const it of row) {
        const e = t.q(`[data-tap="w:${it.id}"]`);
        const ww = (it.w || 80) * SC;
        e.setAttribute('transform', `translate(${x + ww / 2} ${base - ((it.h || 70) * SC) / 2 - 2}) scale(${(it.s || 1) * SC})`);
        x += ww;
      }
    }
  }
  function draw() {
    const box = t.q('.x2w-items');
    box.innerHTML = '';
    for (const s of [-1, 1]) pans[s].querySelector('.x2w-on').innerHTML = '';
    items.forEach((it, i) => {
      const w = where.get(it.id);
      const html = `<g data-tap="w:${it.id}" transform="translate(${trayX(i)} ${P.tray}) scale(${(it.s || 1) * SC})">${it.art}</g>`;
      if (w === 'tray') box.insertAdjacentHTML('beforeend', html); else pans[w].querySelector('.x2w-on').insertAdjacentHTML('beforeend', html);
    });
    layoutPan(-1); layoutPan(1);
    refresh();
  }
  function refresh() {
    t.qa('[data-tap^="w:"]').forEach((e) => {
      const it = byId.get(e.dataset.tap.slice(2));
      const w = where.get(it.id);
      e.classList.toggle('x2a-off', locked || (w !== 'tray' && !canBack) || it.fixed);
    });
  }
  const center = (e) => { const b = e.getBBox(); const r = t.svg.getScreenCTM().inverse().multiply(e.getScreenCTM()); return [r.e + r.a * (b.x + b.width / 2), r.f + r.d * (b.y + b.height / 2)]; };

  /** Đưa đồ id lên đĩa s (-1 trái, 1 phải) hoặc về khay ('tray'), có bay. */
  t.move = async (id, s) => {
    const it = byId.get(id);
    const old = t.q(`[data-tap="w:${id}"]`);
    const [x0, y0] = center(old);
    where.set(id, s);
    draw();
    const e = t.q(`[data-tap="w:${id}"]`);
    const [x1, y1] = center(e);
    sfx.pop?.(2);
    await t.flyIn(e, x0 - x1, y0 - y1, 520, { lift: 80 });
    await settle();
    if (it) t.emit('change');
  };
  Object.defineProperty(t, 'state', { get: () => Math.sign(sum(-1) - sum(1)) }); // 1: trái nặng hơn, 0: thăng bằng
  t.sum = sum;
  t.where = (id) => where.get(id);
  t.el = (id) => t.q(`[data-tap="w:${id}"]`);
  t.lock = (on) => { locked = on; refresh(); };
  t.back = (on) => { canBack = on; refresh(); };
  t.reset = (list, l = [], r = []) => {
    items.splice(0, items.length, ...list);
    byId.clear(); list.forEach((it) => byId.set(it.id, it));
    where.clear();
    list.forEach((it) => where.set(it.id, l.includes(it.id) ? -1 : r.includes(it.id) ? 1 : 'tray'));
    pose(target());
    draw();
  };
  t.on(async (ev, key) => {
    if (ev !== 'tap' || locked || !key.startsWith('w:')) return;
    const it = byId.get(key.slice(2));
    if (!it || it.fixed) return;
    const w = where.get(it.id);
    if (w === 'tray') await t.move(it.id, it.side || -1);
    else if (canBack) await t.move(it.id, 'tray');
  });
  t.reset(items, left, right);
  return t;
}

/** Quả cân 1 kg / 2 kg / 5 kg cho khay (đĩa phải). */
export const weight = (id, kg) => ({ id, art: WEIGHT_ART[`kg${kg}`], g: kg * 1000, side: 1, w: kg === 5 ? 96 : kg === 2 ? 84 : 72, h: 70, name: `quả cân ${kg} kg` });
export { sleep };
