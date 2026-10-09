/**
 * 🫗 Rót nước (Toán 2: lít). Các đồ đựng vẽ to theo đúng số lít (diện tích phần đựng = số lít × L_AREA): ca 1 l, chai 1 l,
 * can / bình nhiều lít (có vạch chia lít). Chạm đồ đựng có nước → thầy (kịch bản) chọn rót sang đâu; đồ đựng bay tới,
 * nghiêng, dòng nước chảy, mực nước hai bên đổi dần.
 */

import { createStage, kitchen, INK, sfx, svgEl, anim, sleep } from './stage.js';

const L_AREA = 15200;
const WATER = '#7DD3FC', WLINE = '#0EA5E9', GLASS = '#F0F9FF';
let uid = 0;

function shape(v) {
  if (v.kind === 'bottle') return { w: 92, h: L_AREA * v.cap / 92 };
  if (v.kind === 'cup') return { w: 125, h: L_AREA * v.cap / 125 };
  const w = v.w || 195;
  return { w, h: (L_AREA * v.cap) / w };
}

export function createPour(host, { vessels = [], zoom = 1, at = null } = {}) {
  const t = createStage(host, { bg: kitchen(0.72) });
  const id0 = ++uid;
  const V = new Map();
  // zoom: phóng cả cảnh quanh điểm at (đồ đựng ít lít vẫn đúng tỉ lệ với nhau nhưng to kín tờ giấy)
  const [zx, zy] = at || [500, t.H * 0.7];
  t.draw(`<g class="x2p-zoom" transform="translate(${zx} ${zy}) scale(${zoom}) translate(${-zx} ${-zy})"><g class="x2p-shelf"></g><g class="x2p-items"></g><g class="x2p-fx"></g></g>`);
  const box = t.q('.x2p-items'), fx = t.q('.x2p-fx');

  function body(v) {
    const { w, h } = shape(v);
    v.W = w; v.Hh = h;
    const cid = `x2p-c${id0}-${v.id}`;
    let outline;
    if (v.kind === 'bottle') outline = `M${-w / 2} 0 V${-h + 16} Q${-w / 2} ${-h - 4} ${-w / 4} ${-h - 10} V${-h - 40} H${w / 4} V${-h - 10} Q${w / 2} ${-h - 4} ${w / 2} ${-h + 16} V0 Z`;
    else outline = `M${-w / 2} ${-h - 8} V-4 Q${-w / 2} 0 ${-w / 2 + 6} 0 H${w / 2 - 6} Q${w / 2} 0 ${w / 2} -4 V${-h - 8}`;
    const marks = v.marks ? Array.from({ length: v.cap - 1 }, (_, i) => {
      const y = -h * ((i + 1) / v.cap);
      return `<path d="M${w / 2 - 26} ${y} H${w / 2}" stroke="${INK}" stroke-width="3"/><text x="${w / 2 + 10}" y="${y}" class="x2a-t" font-size="26" style="text-anchor:start" dominant-baseline="central">${i + 1} l</text>`;
    }).join('') : '';
    const handle = v.kind === 'cup' ? `<path d="M${w / 2} ${-h * 0.8} Q${w / 2 + 34} ${-h * 0.8} ${w / 2 + 34} ${-h * 0.5} Q${w / 2 + 34} ${-h * 0.2} ${w / 2} ${-h * 0.2}" fill="none" stroke="${INK}" stroke-width="5"/>` : '';
    const capLine = v.full ? `<path d="M${-w / 2} ${-h} H${w / 2}" stroke="#DC2626" stroke-width="3" stroke-dasharray="8 6"/>` : '';
    return `<defs><clipPath id="${cid}"><rect x="${-w / 2 + 3}" y="${-h}" width="${w - 6}" height="${h - 3}"/></clipPath></defs>
      <path d="${outline}${v.kind === 'bottle' ? '' : ''}" fill="${GLASS}" stroke="none"/>
      <g clip-path="url(#${cid})"><rect class="x2p-w" x="${-w / 2}" y="${-h * v.v / v.cap}" width="${w}" height="${h * v.v / v.cap + 2}" fill="${WATER}"/>
        <path class="x2p-wl" d="M${-w / 2} ${-h * v.v / v.cap} H${w / 2}" stroke="${WLINE}" stroke-width="4"/></g>
      ${marks}${capLine}${handle}
      <path d="${outline}" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      ${v.label ? `<text x="0" y="40" class="x2a-t x2a-halo" font-size="38">${v.label}</text>` : ''}`;
  }
  function level(v) {
    const h = v.Hh, y = -h * v.v / v.cap;
    const g = t.q(`[data-tap="v:${v.id}"]`);
    g.querySelector('.x2p-w').setAttribute('y', y);
    g.querySelector('.x2p-w').setAttribute('height', h * v.v / v.cap + 2);
    g.querySelector('.x2p-wl').setAttribute('d', `M${-v.W / 2} ${y} H${v.W / 2}`);
    g.querySelector('.x2p-wl').setAttribute('opacity', v.v > 0.001 ? 1 : 0);
  }
  t.reset = (list) => {
    box.innerHTML = ''; V.clear();
    const shelf = t.q('.x2p-shelf');
    shelf.innerHTML = '';
    for (const v of list) {
      V.set(v.id, v);
      // giá gỗ dưới đồ đựng không đứng trên mặt quầy
      if (v.shelf) { const w = shape(v).w + 90; shelf.insertAdjacentHTML('beforeend', `<rect x="${v.x - w / 2}" y="${v.y}" width="${w}" height="22" rx="6" fill="#C08A50" stroke="${INK}" stroke-width="3"/><path d="M${v.x - w / 2 + 20} ${v.y + 22} l20 40 M${v.x + w / 2 - 20} ${v.y + 22} l-20 40" stroke="${INK}" stroke-width="6"/>`); }
      box.insertAdjacentHTML('beforeend', `<g data-tap="v:${v.id}" transform="translate(${v.x} ${v.y})">${body(v)}</g>`);
      level(v);
    }
  };
  t.get = (id) => V.get(id);
  t.el = (id) => t.q(`[data-tap="v:${id}"]`);
  t.lock = (on) => t.qa('[data-tap^="v:"]').forEach((e) => e.classList.toggle('x2a-off', on));

  /** Rót từ a sang b: tới khi b đầy hoặc a hết (hoặc amount lít). */
  t.pour = async (a, b, amount = Infinity) => {
    const A = V.get(a), B = V.get(b);
    const q = Math.min(A.v, B.cap - B.v, amount);
    if (q <= 0) return 0;
    const ga = t.el(a);
    const dir = B.x >= A.x ? 1 : -1;
    // nâng a lên trên miệng b, nghiêng về phía b
    const tx = B.x - dir * (A.W / 2 + 30) - A.x, ty = (B.y - B.Hh - 40) - (A.y - A.Hh * 0.2);
    ga.parentNode.append(ga); // lên trên cùng
    await t.anim(ga, [{ transform: 'none' }, { transform: `translate(${tx}px, ${ty}px) rotate(${dir * 70}deg)` }], 650, { fill: 'forwards', easing: 'ease-in-out' });
    const sx = B.x - dir * 12, sy0 = B.y - B.Hh - 30;
    const stream = svgEl('path', { d: `M${sx} ${sy0} V${B.y - 6}`, stroke: WATER, 'stroke-width': 14, 'stroke-linecap': 'round', opacity: 0.9 });
    fx.append(stream);
    sfx.swish?.();
    const a0 = A.v, b0 = B.v, ms = anim(500 + q * 450), t0 = performance.now();
    await new Promise((res) => {
      const step = (now) => {
        const k = Math.min(1, (now - t0) / ms);
        A.v = a0 - q * k; B.v = b0 + q * k;
        level(A); level(B);
        stream.setAttribute('d', `M${sx} ${sy0} V${B.y - B.Hh * B.v / B.cap}`);
        if (k < 1) requestAnimationFrame(step); else res();
      };
      requestAnimationFrame(step);
    });
    A.v = Math.round((a0 - q) * 1000) / 1000; B.v = Math.round((b0 + q) * 1000) / 1000;
    level(A); level(B);
    stream.remove();
    await t.anim(ga, [{ transform: `translate(${tx}px, ${ty}px) rotate(${dir * 70}deg)` }, { transform: 'none' }], 550, { fill: 'forwards', easing: 'ease-in-out' });
    t.pop(t.el(b));
    sfx.ding?.();
    t.emit('pour', a, b, q);
    return q;
  };
  t.reset(vessels);
  return t;
}

/** Chờ em chạm đồ đựng `src` nhiều lần; mỗi lần rót sang đồ đựng kế tiếp chưa đầy trong `targets`, tới khi done(). */
export async function pourByTaps(c, t, src, targets, done, { nudge = 'Chạm vào bình có nước để rót.', amount = Infinity } = {}) {
  let busy = false;
  const off = t.on(async (ev, key) => {
    if (ev !== 'tap' || busy || key !== `v:${src}`) return;
    const to = targets.find((id) => t.get(id).v < t.get(id).cap - 0.001);
    if (!to || t.get(src).v <= 0.001) return;
    busy = true;
    try { await t.pour(src, to, amount); } finally { busy = false; t.emit('done'); }
  });
  try { await c.until(t, () => !busy && done(), { nudge, el: () => t.el(src) }); } finally { off(); }
}
export { sleep };
