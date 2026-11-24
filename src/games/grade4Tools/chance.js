/**
 * 🎲 Kiểm đếm (Toán 4 Bài 51 Số lần xuất hiện của một sự kiện).
 *   createChance: thí nghiệm (vòng quay, hộp bóng, túi bút, đồng xu, xúc xắc, 4 hộp quà) bên trái, bảng kiểm đếm bên phải.
 *     Bấm nút → đồ vật chuyển động (vòng quay, bóng nhô lên khỏi hộp …) → em chạm đúng hàng của sự kiện vừa xảy ra,
 *     một vạch bay vào hàng đó. Làm tay vài lần rồi "⏩ Làm nhanh" cho đủ số lần. Ô "Số lần" để gõ số đếm được.
 *   createRace: đường đua (thỏ Chẵn / thỏ Lẻ, 11 chú rùa số 2–12): gieo hai xúc xắc, em chạm con vật được tiến.
 *   tallySvg: vạch kiểm đếm, kiểu ô vuông của sách lớp 4 (4 cạnh + 1 đường chéo = 5) hoặc kiểu bốn vạch gạch chéo.
 */

import { css, emitter, INK, EDGE, sfx } from './frame.js';
import { calmMotion, flyOne } from '../grade3Games/fly.js';
import { shake } from '../grade3Drills/kit.js';
import { SLOT_CSS } from './practice.js';

const ms = (n) => (calmMotion() ? Math.round(n * 0.8) : n);
const wait = (n) => new Promise(r => setTimeout(r, n));
/**
 * Chờ một hoạt ảnh xong, có hạn giờ (tab ẩn / máy bận thì hoạt ảnh có thể treo): a[FIN] thay cho a.finished.
 */
const FIN = Symbol('g4ceFin');
if (typeof Animation !== 'undefined' && !Animation.prototype[FIN]) {
  Object.defineProperty(Animation.prototype, FIN, { get() { const d = Number(this.effect?.getTiming?.().duration) || 0; return Promise.race([this.finished.catch(() => {}), wait(d + 500)]); } });
}
const ST = `stroke="${INK}" stroke-width="3" stroke-linejoin="round"`;
export const TALLY_INK = '#2563EB';

/**
 * Vạch kiểm đếm n lần. style 'square': mỗi nhóm là một ô vuông (trái, trên, phải, dưới) và một đường chéo thứ năm.
 * 'classic': bốn vạch đứng, vạch thứ năm gạch chéo. groups: số nhóm giữ chỗ (bề rộng cố định). fresh: vạch cuối vẽ dần.
 */
export function tallySvg(n, { style = 'square', groups = 0, fresh = false, color = TALLY_INK, cls = '' } = {}) {
  const G = Math.max(1, groups, Math.ceil(n / 5));
  const s = 30, gap = 16, W = G * (s + gap) - gap + 8, H = s + 8;
  let out = '';
  for (let k = 0; k < n; k++) {
    const g = Math.floor(k / 5), m = k % 5, x = 4 + g * (s + gap), y = 4;
    let d;
    if (style === 'square') d = [`M${x} ${y}V${y + s}`, `M${x} ${y}H${x + s}`, `M${x + s} ${y}V${y + s}`, `M${x} ${y + s}H${x + s}`, `M${x} ${y + s}L${x + s} ${y}`][m];
    else d = m < 4 ? `M${x + 3 + m * 8} ${y}V${y + s}` : `M${x - 3} ${y + s - 6}L${x + 30} ${y + 6}`;
    out += `<path d="${d}" pathLength="1" class="${fresh && k === n - 1 ? 'g4ce-draw' : ''}"/>`;
  }
  return `<svg class="g4ce-tally ${cls}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMinYMid meet" aria-hidden="true"><g fill="none" stroke="${color}" stroke-width="3.6" stroke-linecap="round">${out}</g></svg>`;
}

// ── Hình nhỏ của sự kiện (viewBox 0 0 40 40) ──────────────────────────────────────────────────────────
export const COLOR = {
  red: { fill: '#EF4444', name: 'đỏ' }, yellow: { fill: '#FACC15', name: 'vàng' }, blue: { fill: '#3B82F6', name: 'xanh' }, green: { fill: '#22C55E', name: 'xanh lá' },
  purple: { fill: '#A855F7', name: 'tím' },
};
const ball = (fill, cx = 20, cy = 20, r = 14) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${ST}/><ellipse cx="${cx - r * 0.35}" cy="${cy - r * 0.38}" rx="${r * 0.22}" ry="${r * 0.3}" fill="#fff" opacity=".55"/>`;
const pen = (fill, x, y, rot = 0, sc = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})"><rect x="-4" y="-18" width="8" height="30" rx="2" fill="${fill}" ${ST}/><path d="M-4 12 L0 20 L4 12 Z" fill="#FDE7C3" ${ST}/><rect x="-4" y="-18" width="8" height="7" fill="#fff" opacity=".6"/></g>`;
const PIPS = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
/** Mặt xúc xắc tâm (x, y), cạnh s. */
export const dieFace = (f, x = 20, y = 20, s = 30, cls = '') => `<g class="${cls}"><rect x="${x - s / 2}" y="${y - s / 2}" width="${s}" height="${s}" rx="${s * 0.18}" fill="#fff" stroke="#F59E0B" stroke-width="${Math.max(2, s * 0.07)}"/>
  ${PIPS[f].map(([a, b]) => `<circle cx="${x + a * s * 0.27}" cy="${y + b * s * 0.27}" r="${s * 0.09}" fill="#DC2626"/>`).join('')}</g>`;
const coinFace = (side, cx = 20, cy = 20, r = 15) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${side ? '#FCD34D' : '#FDE68A'}" stroke="#B45309" stroke-width="${r * 0.12}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.75}" fill="none" stroke="#D97706" stroke-width="${r * 0.06}"/>
  ${side ? `<path d="M${cx} ${cy - r * 0.5} L${cx + r * 0.15} ${cy - r * 0.15} L${cx + r * 0.5} ${cy - r * 0.12} L${cx + r * 0.22} ${cy + r * 0.1} L${cx + r * 0.32} ${cy + r * 0.48} L${cx} ${cy + r * 0.26} L${cx - r * 0.32} ${cy + r * 0.48} L${cx - r * 0.22} ${cy + r * 0.1} L${cx - r * 0.5} ${cy - r * 0.12} L${cx - r * 0.15} ${cy - r * 0.15} Z" fill="#D97706"/>`
    : `<text x="${cx}" y="${cy + r * 0.24}" text-anchor="middle" font-size="${r * 0.7}" font-weight="800" fill="#B45309" font-family="Baloo 2, sans-serif">500</text>`}`;
const candy = (x = 20, y = 20, sc = 1) => `<g transform="translate(${x} ${y}) scale(${sc})"><path d="M-9 0 L-17 -7 L-17 7 Z M9 0 L17 -7 L17 7 Z" fill="#F472B6" ${ST}/><circle r="10" fill="#EC4899" ${ST}/><path d="M-6 -4 Q0 -9 6 -4" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>`;
const eraser = (x = 20, y = 20, sc = 1) => `<g transform="translate(${x} ${y}) scale(${sc}) rotate(-15)"><rect x="-15" y="-8" width="30" height="16" rx="3" fill="#fff" ${ST}/><path d="M-1 -8 H12 Q15 -8 15 -5 V5 Q15 8 12 8 H-1 Z" fill="#60A5FA" ${ST}/></g>`;
const sector = (fill) => `<path d="M20 22 L5 8 A20 20 0 0 1 35 8 Z" fill="${fill}" ${ST}/><path d="M20 22 L20 32" stroke="${INK}" stroke-width="3"/>`;
export const EVART = {
  wheel: (c) => sector(COLOR[c].fill),
  ball: (c) => ball(COLOR[c].fill),
  pens: (a, b) => `${pen(COLOR[a].fill, 13, 19, -14, 0.95)}${pen(COLOR[b].fill, 27, 19, 14, 0.95)}`,
  coin: (side) => coinFace(side),
  die: (f) => dieFace(f),
  candy: () => candy(20, 20, 0.95),
  eraser: () => eraser(20, 20, 1),
};
const pic = (inner, cls = '') => `<svg class="${cls}" viewBox="0 0 40 40" aria-hidden="true">${inner}</svg>`;

// ── Đồ vật thí nghiệm (viewBox 0 0 300 260) ───────────────────────────────────────────────────────────
const VB = '0 0 300 260';
const WHEEL = { cx: 150, cy: 120, r: 98 };
const pt = (a, r = WHEEL.r) => [WHEEL.cx + r * Math.sin(a * Math.PI / 180), WHEEL.cy - r * Math.cos(a * Math.PI / 180)];

/**
 * Mỗi đồ vật: { html, act (chữ trên nút), sample(rng) → chi tiết kết quả, play(svg, detail, fast) → hoạt hình,
 * reset(svg, fast), out(svg) → phần tử kết quả (chỗ vạch bay ra) }.
 */
const DEVICES = {
  /** Vòng quay: sectors = màu từng phần (theo chiều kim đồng hồ, phần 0 ở đỉnh). */
  wheel: ({ sectors = ['yellow', 'red', 'yellow', 'red'] } = {}) => {
    const n = sectors.length, span = 360 / n;
    let rot = 0;
    const paths = sectors.map((c, k) => {
      const a1 = k * span - span / 2, a2 = k * span + span / 2;
      const [x1, y1] = pt(a1), [x2, y2] = pt(a2);
      return `<path d="M${WHEEL.cx} ${WHEEL.cy} L${x1.toFixed(1)} ${y1.toFixed(1)} A${WHEEL.r} ${WHEEL.r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${COLOR[c].fill}" stroke="#fff" stroke-width="4"/>`;
    }).join('');
    const studs = [...Array(n * 2)].map((_, k) => { const [x, y] = pt(k * span / 2 + span / 4, WHEEL.r + 9); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4" fill="#FEF9C3"/>`; }).join('');
    return {
      act: '🎡 Quay',
      html: `<svg viewBox="${VB}" class="g4ce-svg"><path d="M118 232 L130 196 H170 L182 232 Z" fill="#B45309" ${ST}/><rect x="96" y="230" width="108" height="14" rx="5" fill="#92400E" ${ST}/>
        <circle cx="${WHEEL.cx}" cy="${WHEEL.cy}" r="${WHEEL.r + 16}" fill="#16A34A" ${ST}/>${studs}
        <g class="g4ce-wheel">${paths}<circle cx="${WHEEL.cx}" cy="${WHEEL.cy}" r="${WHEEL.r}" fill="none" ${ST}/></g>
        <circle cx="${WHEEL.cx}" cy="${WHEEL.cy}" r="17" fill="#EC4899" ${ST}/><ellipse cx="${WHEEL.cx - 5}" cy="${WHEEL.cy - 6}" rx="5" ry="4" fill="#fff" opacity=".6"/>
        <path class="g4ce-out" d="M136 -4 H164 L150 26 Z" fill="#22C55E" ${ST}/><circle cx="150" cy="4" r="4" fill="#FDE047"/></svg>`,
      sample: (rng) => { const k = Math.floor(rng() * n); return { k, off: (rng() - 0.5) * span * 0.7, color: sectors[k] }; },
      async play(svg, d, fast) {
        const target = d.k * span + d.off; // góc (trên vòng quay) cần dừng dưới mũi tên
        const from = rot;
        rot = from + 360 * (fast ? 2 : 4) + ((((-target - from) % 360) + 360) % 360);
        const g = svg.querySelector('.g4ce-wheel');
        const a = g.animate([{ transform: `rotate(${from}deg)` }, { transform: `rotate(${rot}deg)` }], { duration: ms(fast ? 700 : 2200), easing: 'cubic-bezier(.15,.7,.2,1)', fill: 'forwards' });
        if (!fast) { for (let i = 0; i < 6; i++) setTimeout(() => sfx.tick(), i * 130 + i * i * 22); }
        await a[FIN];
      },
      reset() {},
      out: (svg) => svg.querySelector('.g4ce-out'),
    };
  },
  /** Hộp bóng: balls = ['blue', 'blue', 'blue', 'yellow']. Lấy một quả, nhìn màu rồi trả lại. */
  box: ({ balls = ['blue', 'blue', 'blue', 'yellow'] } = {}) => {
    const n = balls.length;
    const pos = balls.map((_, i) => [96 + (i % 4) * 36 + (Math.floor(i / 4) % 2) * 18, 206 - Math.floor(i / 4) * 32]);
    return {
      act: '✋ Lấy bóng',
      html: `<svg viewBox="${VB}" class="g4ce-svg"><path d="M60 110 L90 86 H250 L220 110 Z" fill="#BFDBFE" ${ST}/><path d="M220 110 L250 86 V214 L220 238 Z" fill="#93C5FD" ${ST}/>
        <path d="M128 98 L140 90 H200 L188 98 Z" fill="#1E3A8A" opacity=".75"/>
        ${balls.map((c, i) => `<g class="g4ce-ball" data-i="${i}">${ball(COLOR[c].fill, pos[i][0], pos[i][1], 16)}</g>`).join('')}
        <rect x="60" y="110" width="160" height="128" fill="#DBEAFE" fill-opacity=".45" ${ST}/><path d="M68 120 V150" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/></svg>`,
      sample: (rng) => { const i = Math.floor(rng() * n); return { i, color: balls[i] }; },
      async play(svg, d, fast) {
        const b = svg.querySelector(`.g4ce-ball[data-i="${d.i}"]`);
        const [x, y] = pos[d.i];
        b.classList.add('g4ce-out');
        sfx.swish();
        await b.animate([{ transform: 'none' }, { transform: `translate(${164 - x}px, ${y > 150 ? -70 - (y - 150) * 0.2 : -60}px)`, offset: 0.55 }, { transform: `translate(${150 - x}px, ${40 - y}px) scale(1.5)` }],
          { duration: ms(fast ? 380 : 900), easing: 'ease-in-out', fill: 'forwards' })[FIN];
      },
      async reset(svg, d, fast) {
        const b = svg.querySelector(`.g4ce-ball[data-i="${d.i}"]`);
        if (!b) return;
        const [x, y] = pos[d.i];
        await b.animate([{ transform: `translate(${150 - x}px, ${40 - y}px) scale(1.5)` }, { transform: 'none' }], { duration: ms(fast ? 200 : 450), easing: 'ease-in', fill: 'forwards' })[FIN];
        b.classList.remove('g4ce-out');
      },
      out: (svg) => svg.querySelector('.g4ce-ball.g4ce-out') || svg,
    };
  },
  /** Túi bút: pens = ['blue', 'blue', 'yellow'], lấy 2 chiếc cùng lúc. */
  pens: ({ pens = ['blue', 'blue', 'yellow'] } = {}) => {
    const n = pens.length;
    const xs = pens.map((_, i) => 120 + i * (60 / Math.max(1, n - 1)));
    return {
      act: '✋ Lấy 2 bút',
      html: `<svg viewBox="${VB}" class="g4ce-svg">
        ${pens.map((c, i) => `<g class="g4ce-pen" data-i="${i}">${pen(COLOR[c].fill, xs[i], 116, (i - (n - 1) / 2) * 12, 2.2)}</g>`).join('')}
        <path d="M70 130 Q60 238 150 240 Q240 238 230 130 Q190 112 150 124 Q110 112 70 130 Z" fill="#0F766E" ${ST}/><path d="M80 134 Q150 150 220 134" fill="none" stroke="#5EEAD4" stroke-width="4" opacity=".7"/>
        <path d="M70 130 Q150 160 230 130" fill="none" ${ST}/></svg>`,
      sample: (rng) => { const a = Math.floor(rng() * n); let b = Math.floor(rng() * (n - 1)); if (b >= a) b++; return { a, b, colors: [pens[a], pens[b]] }; },
      async play(svg, d, fast) {
        sfx.swish();
        const go = (i, dx) => svg.querySelector(`.g4ce-pen[data-i="${i}"]`).animate([{ transform: 'none' }, { transform: `translate(${150 + dx - xs[i]}px, -90px)` }], { duration: ms(fast ? 360 : 850), easing: 'ease-out', fill: 'forwards' })[FIN];
        svg.querySelector(`.g4ce-pen[data-i="${d.a}"]`).classList.add('g4ce-out');
        await Promise.all([go(d.a, -34), go(d.b, 34)]);
      },
      async reset(svg, d, fast) {
        const back = (i) => svg.querySelector(`.g4ce-pen[data-i="${i}"]`).animate([{ transform: 'none' }], { duration: ms(fast ? 180 : 400), easing: 'ease-in', fill: 'forwards' })[FIN];
        await Promise.all([back(d.a), back(d.b)]);
        svg.querySelectorAll('.g4ce-pen').forEach(p => p.classList.remove('g4ce-out'));
      },
      out: (svg) => svg.querySelector('.g4ce-pen.g4ce-out') || svg,
    };
  },
  /** Đồng xu: sấp (0) / ngửa (1). */
  coin: () => ({
    act: '🪙 Tung',
    html: `<svg viewBox="${VB}" class="g4ce-svg"><ellipse cx="150" cy="236" rx="90" ry="12" fill="#CBD5E1" opacity=".6"/>
      <g class="g4ce-coin g4ce-out">${coinFace(1, 150, 140, 78)}</g></svg>`,
    sample: (rng) => ({ side: rng() < 0.5 ? 0 : 1 }),
    async play(svg, d, fast) {
      const g = svg.querySelector('.g4ce-coin');
      const flips = fast ? 3 : 7, dur = ms(fast ? 600 : 1500);
      const frames = [];
      for (let k = 0; k <= flips * 2; k++) frames.push({ transform: `translateY(${-Math.sin(Math.PI * k / (flips * 2)) * 110}px) scaleY(${k % 2 ? 0.08 : 1})`, offset: k / (flips * 2) });
      sfx.swish();
      let face = 1;
      const timer = setInterval(() => { face = 1 - face; g.innerHTML = coinFace(face, 150, 140, 78); }, dur / (flips * 2));
      await g.animate(frames, { duration: dur, easing: 'linear' })[FIN];
      clearInterval(timer);
      g.innerHTML = coinFace(d.side, 150, 140, 78);
      sfx.tick();
    },
    reset() {},
    out: (svg) => svg.querySelector('.g4ce-coin'),
  }),
  /** Một xúc xắc. */
  die: () => ({
    act: '🎲 Gieo',
    html: `<svg viewBox="${VB}" class="g4ce-svg"><ellipse cx="150" cy="226" rx="80" ry="12" fill="#CBD5E1" opacity=".6"/><g class="g4ce-die g4ce-out">${dieFace(6, 150, 130, 140)}</g></svg>`,
    sample: (rng) => ({ face: 1 + Math.floor(rng() * 6) }),
    async play(svg, d, fast) {
      const g = svg.querySelector('.g4ce-die');
      const dur = ms(fast ? 500 : 1300);
      const timer = setInterval(() => { g.innerHTML = dieFace(1 + Math.floor(Math.random() * 6), 150, 130, 140); sfx.tick(); }, fast ? 110 : 150);
      await g.animate([{ transform: 'none' }, { transform: 'translate(-30px, -60px) rotate(-200deg)', offset: 0.35 }, { transform: 'translate(20px, -20px) rotate(-330deg)', offset: 0.7 }, { transform: 'rotate(-360deg)' }],
        { duration: dur, easing: 'ease-out' })[FIN];
      clearInterval(timer);
      g.innerHTML = dieFace(d.face, 150, 130, 140);
    },
    reset() {},
    out: (svg) => svg.querySelector('.g4ce-die'),
  }),
  /** Bốn hộp giống nhau: items = ['candy', 'eraser', 'eraser', 'eraser']; xáo vị trí rồi mở một hộp. */
  boxes: ({ items = ['candy', 'eraser', 'eraser', 'eraser'] } = {}) => {
    const n = items.length, X = (i) => 42 + i * 72;
    let order = items.map((_, i) => i); // order[slot] = hộp
    const boxSvg = (i) => `<g class="g4ce-bx" data-b="${i}"><g class="g4ce-inner">${items[i] === 'candy' ? candy(0, 150, 1.3) : eraser(0, 150, 1.3)}</g>
      <path d="M-30 150 H30 V200 H-30 Z" fill="#14B8A6" ${ST}/><path d="M-30 150 L-30 200" stroke="#0F766E" stroke-width="6"/>
      <g class="g4ce-lid"><path d="M-34 136 H34 V152 H-34 Z" fill="#2DD4BF" ${ST}/><path d="M-12 140 L0 148 L12 140" fill="none" stroke="#fff" stroke-width="2.5" opacity=".8"/></g></g>`;
    return {
      act: '📦 Chọn hộp',
      html: `<svg viewBox="0 60 300 160" class="g4ce-svg"><rect x="10" y="200" width="280" height="14" rx="6" fill="#D6A15B" ${ST}/>${items.map((_, i) => `<g class="g4ce-slot" transform="translate(${X(i)} 0)">${boxSvg(i)}</g>`).join('')}</svg>`,
      sample: (rng) => { const slot = Math.floor(rng() * n); return { slot, shuffle: Math.floor(rng() * 1e6) }; },
      // kết quả của chi tiết: cần biết hộp ở chỗ đó sau khi xáo, nên tính khi xáo (xem play)
      async play(svg, d, fast) {
        const slots = [...svg.querySelectorAll('.g4ce-slot')];
        // xáo: đổi chỗ hai cặp hộp (đổi hình theo thứ tự order)
        let s = d.shuffle;
        const swaps = fast ? 1 : 2;
        for (let k = 0; k < swaps; k++) {
          const a = s % n, b = (a + 1 + ((s >> 3) % (n - 1))) % n; s = Math.floor(s / 7) + 13;
          const ea = slots[a].firstElementChild, eb = slots[b].firstElementChild;
          const dx = X(b) - X(a);
          sfx.swish();
          await Promise.all([
            ea.animate([{ transform: 'none' }, { transform: `translate(${dx / 2}px, -26px)` }, { transform: `translate(${dx}px, 0)` }], { duration: ms(fast ? 220 : 520), easing: 'ease-in-out' })[FIN],
            eb.animate([{ transform: 'none' }, { transform: `translate(${-dx / 2}px, 26px)` }, { transform: `translate(${-dx}px, 0)` }], { duration: ms(fast ? 220 : 520), easing: 'ease-in-out' })[FIN],
          ]);
          slots[a].append(eb); slots[b].append(ea);
          [order[a], order[b]] = [order[b], order[a]];
        }
        d.item = items[order[d.slot]];
        const bx = slots[d.slot].firstElementChild;
        bx.classList.add('g4ce-out');
        sfx.tap();
        await Promise.all([
          bx.querySelector('.g4ce-lid').animate([{ transform: 'none' }, { transform: 'translate(26px, -46px) rotate(28deg)' }], { duration: ms(fast ? 220 : 500), easing: 'ease-out', fill: 'forwards' })[FIN],
          bx.querySelector('.g4ce-inner').animate([{ transform: 'none' }, { transform: 'translateY(-52px)' }], { duration: ms(fast ? 260 : 600), easing: 'ease-out', fill: 'forwards' })[FIN],
        ]);
      },
      async reset(svg, d, fast) {
        const bx = svg.querySelector('.g4ce-bx.g4ce-out');
        if (!bx) return;
        await Promise.all([bx.querySelector('.g4ce-lid'), bx.querySelector('.g4ce-inner')].map(e => e.animate([{ transform: 'none' }], { duration: ms(fast ? 150 : 350), fill: 'forwards' })[FIN]));
        bx.classList.remove('g4ce-out');
      },
      out: (svg) => svg.querySelector('.g4ce-bx.g4ce-out') || svg,
    };
  },
};

/**
 * Thí nghiệm + bảng kiểm đếm.
 *   device: 'wheel' | 'box' | 'pens' | 'coin' | 'die' | 'boxes' | hàm(dev) → { act, html, sample, play, reset, out }; dev: tham số đồ vật (sectors, balls, pens, items).
 *   events: [{ label, art (svg 40×40), test(chi tiết) }]; trials: số lần; manual: số lần làm tay trước khi bật "Làm nhanh".
 *   rig: dãy sự kiện định sẵn (Khám phá: đúng 9 đỏ, 11 vàng như sách).
 * Sự kiện phát ra: 'rolled' (k), 'mark' (k), 'wrong' (k chạm, k đúng), 'early' (chạm hàng khi chưa có kết quả), 'done'.
 */
export function createChance(host, { device, dev = {}, events, trials = 10, manual = 3, style = 'square', rig = null, rng = Math.random, explore = false, head = 'Sự kiện', fastLabel = '⏩ Làm nhanh' }) {
  injectChanceStyles();
  const t = emitter({});
  const D = typeof device === 'function' ? device(dev) : DEVICES[device](dev); // hàm: đồ vật riêng của sách khác (cùng giao diện DEVICES)
  const K = events.length, groups = Math.ceil(trials / 5);
  host.innerHTML = `<div class="g4ce ${explore ? 'g4ce-ex' : ''}" style="--k:${K}">
      <div class="g4ce-dev">
        <div class="g4ce-stage">${D.html}</div>
        <div class="g4ce-ctl">
          <button type="button" class="g4ce-btn g4ce-act">${D.act}</button>
          <button type="button" class="g4ce-btn g4ce-fast" disabled>${fastLabel}</button>
        </div>
        <div class="g4ce-turn">Lần <b class="g4ce-i">0</b> / ${trials}</div>
      </div>
      <div class="g4ce-tbl">
        <div class="g4ce-hd"><span>${head}</span><span>Kiểm đếm</span><span>Số lần</span></div>
        ${events.map((e, k) => `<button type="button" class="g4ce-row" data-k="${k}">
          <span class="g4ce-ev">${pic(e.art, 'g4ce-evpic')}<span class="g4ce-evl">${e.label}</span></span>
          <span class="g4ce-marks">${tallySvg(0, { style, groups })}</span>
          <span class="g4ce-cnt"></span></button>`).join('')}
      </div>
    </div>`;
  const root = host.querySelector('.g4ce');
  const svg = root.querySelector('.g4ce-svg');
  const act = root.querySelector('.g4ce-act'), fastBtn = root.querySelector('.g4ce-fast');
  const rows = [...root.querySelectorAll('.g4ce-row')];
  const turnEl = root.querySelector('.g4ce-i');
  const counts = Array(K).fill(0);
  let done = 0, phase = 'idle', cur = -1, detail = null, fast = false, locked = false;
  t.root = root;
  t.counts = counts;
  t.trials = trials;
  t.events = events;
  Object.defineProperty(t, 'done', { get: () => done });
  Object.defineProperty(t, 'cur', { get: () => (phase === 'await' ? cur : -1) });
  Object.defineProperty(t, 'phase', { get: () => phase });
  t.countBox = (k) => rows[k].querySelector('.g4ce-cnt');
  t.showCount = (k, v = counts[k]) => { const b = t.countBox(k); b.textContent = v; b.classList.add('g4-box-ok'); };
  t.row = (k) => rows[k];
  t.hl = (k, cls = 'g4ce-hl') => rows.forEach((r, i) => r.classList.toggle(cls, i === k || (Array.isArray(k) && k.includes(i))));
  t.lock = (v = true) => { locked = v; buttons(); };
  t.actBtn = act; t.fastBtn = fastBtn;
  /** Đổi kiểu vạch (bốn vạch gạch chéo ↔ ô vuông của sách lớp 4), vẽ lại các hàng. */
  t.setStyle = (sty) => { style = sty; rows.forEach((r, k) => { r.querySelector('.g4ce-marks').innerHTML = tallySvg(counts[k], { style, groups }); }); };

  const evOf = (d) => events.findIndex(e => e.test(d));
  const buttons = () => {
    act.disabled = locked || phase !== 'idle' || done >= trials;
    fastBtn.disabled = locked || phase !== 'idle' || done >= trials || done < manual;
    act.classList.toggle('g4ce-ready', !act.disabled && done < manual);
    fastBtn.classList.toggle('g4ce-ready', !fastBtn.disabled);
    root.classList.toggle('g4ce-await', phase === 'await');
  };
  const pickDetail = () => {
    const want = rig ? rig[done] : null;
    for (let k = 0; k < 200; k++) { const d = D.sample(rng); if (want == null || events[want].test(d)) return d; }
    return D.sample(rng);
  };

  /** Một vạch bay từ đồ vật vào hàng k. */
  const addMark = (k) => new Promise((res) => {
    const from = D.out(svg).getBoundingClientRect();
    const box = rows[k].querySelector('.g4ce-marks');
    const to = box.getBoundingClientRect();
    const n = counts[k];
    const s = to.height * 0.7;
    // chỗ vạch mới trong hàng (theo nhóm)
    const G = groups, gx = to.left + (to.height * 0.05) + (Math.floor(n / 5) * (to.width / Math.max(G, 1)));
    const land = { left: Math.min(to.right - s, gx), top: to.top + to.height * 0.15, width: s, height: s };
    const src = { left: from.left + from.width / 2 - s / 2, top: from.top + from.height / 2 - s / 2, width: s, height: s };
    flyOne(pic(events[k].art), src, land, { minMs: fast ? 220 : 380, maxMs: fast ? 380 : 640, onLand: () => {
      counts[k]++;
      box.innerHTML = tallySvg(counts[k], { style, groups, fresh: true });
      sfx.pop(counts[k] % 8);
      res();
    } });
  });

  t.roll = async () => {
    if (phase !== 'idle' || done >= trials || locked) return;
    phase = 'rolling'; buttons();
    sfx.tap();
    detail = pickDetail();
    await D.play(svg, detail, fast);
    cur = evOf(detail);
    t.emit('rolled', cur);
    if (fast) { await addMark(cur); await next(); return; }
    phase = 'await'; buttons();
  };
  async function next() {
    done++;
    turnEl.textContent = done;
    t.emit('mark', cur);
    const d = detail;
    await D.reset(svg, d, fast);
    phase = done >= trials ? 'end' : 'idle';
    buttons();
    if (phase === 'end') { fast = false; t.emit('done'); }
  }
  t.tapRow = async (k) => {
    if (locked) return;
    if (phase !== 'await') { if (phase === 'idle') { t.emit('early', k); } return; }
    if (k !== cur) { shake(rows[k]); t.emit('wrong', k, cur); return; }
    phase = 'marking'; buttons();
    sfx.tap();
    await addMark(k);
    await next();
  };
  t.fast = async () => {
    if (phase !== 'idle' || done < manual || done >= trials || locked) return;
    fast = true;
    while (done < trials && fast) { phase = 'idle'; await t.roll(); }
  };
  act.onclick = () => t.roll();
  fastBtn.onclick = () => t.fast();
  rows.forEach((r, k) => r.addEventListener('click', () => t.tapRow(k)));
  buttons();
  if (import.meta.env.DEV) window.__g4chance = t;
  return t;
}

// ── Đường đua: thỏ Chẵn / Lẻ, rùa 2–12 ─────────────────────────────────────────────────────────────────
const rabbitArt = (fill, label) => `<svg viewBox="0 0 60 48" aria-hidden="true"><g ${ST}><path d="M22 14 Q14 -6 24 2 Q28 8 28 16 Z" fill="${fill}"/><path d="M31 14 Q34 -6 40 4 Q40 10 35 17 Z" fill="${fill}"/>
  <ellipse cx="22" cy="34" rx="16" ry="11" fill="${fill}"/><circle cx="36" cy="22" r="10" fill="${fill}"/><circle cx="6" cy="31" r="4" fill="#fff"/></g>
  <circle cx="39" cy="20" r="1.8" fill="${INK}"/><circle cx="46" cy="24" r="2" fill="#F472B6"/>
  <text x="22" y="39" text-anchor="middle" font-size="11" font-weight="800" fill="${INK}" font-family="Baloo 2, sans-serif">${label}</text></svg>`;
const turtleArt = (fill, num) => `<svg viewBox="0 0 60 48" aria-hidden="true"><g ${ST}><ellipse cx="48" cy="30" rx="7" ry="6" fill="#86EFAC"/><ellipse cx="16" cy="42" rx="5" ry="3.5" fill="#86EFAC"/><ellipse cx="38" cy="42" rx="5" ry="3.5" fill="#86EFAC"/>
  <path d="M6 38 Q8 12 27 12 Q46 12 46 38 Z" fill="${fill}"/></g><circle cx="50" cy="28" r="1.6" fill="${INK}"/>
  <text x="26" y="35" text-anchor="middle" font-size="19" font-weight="800" fill="${INK}" font-family="Baloo 2, sans-serif">${num}</text></svg>`;
const TURTLE_FILLS = ['#FDE047', '#F87171', '#FCA5A5', '#C4B5FD', '#93C5FD', '#FCD34D', '#FDBA74', '#A5F3FC', '#FDE68A', '#FBCFE8', '#FB923C'];

/**
 * lanes: [{ id, label, art }]; len: số bước tới đích; rule(a, b) → chỉ số làn được tiến; stopAfter: số con về đích thì dừng.
 * Gieo → em chạm đúng làn (sai: 'wrong'). Làm tay `manual` lần rồi "Làm nhanh". Sự kiện 'move' (i), 'finish' (i), 'done'.
 */
export function createRace(host, { lanes, len = 6, rule, stopAfter = 1, manual = 3, rng = Math.random, op = '×' }) {
  injectChanceStyles();
  const t = emitter({});
  const L = lanes.length;
  host.innerHTML = `<div class="g4rc" style="--l:${L};--len:${len}">
      <div class="g4ce-dev g4rc-dev">
        <div class="g4ce-stage"><svg viewBox="0 0 300 200" class="g4ce-svg g4rc-dice"><ellipse cx="150" cy="176" rx="120" ry="12" fill="#CBD5E1" opacity=".6"/>
          <g class="g4rc-d0 g4ce-out">${dieFace(1, 92, 100, 100)}</g><g class="g4rc-d1">${dieFace(1, 208, 100, 100)}</g></svg></div>
        <div class="g4rc-sum">&nbsp;</div>
        <div class="g4ce-ctl"><button type="button" class="g4ce-btn g4ce-act">🎲 Gieo</button><button type="button" class="g4ce-btn g4ce-fast" disabled>⏩ Làm nhanh</button></div>
      </div>
      <div class="g4rc-track">
        ${lanes.map((l, i) => `<button type="button" class="g4rc-lane" data-i="${i}"><span class="g4rc-path"></span>${[...Array(len)].map((_, s) => `<span class="g4rc-dot ${s === len - 1 ? 'g4rc-goal' : ''}" style="left: calc(var(--tok) * 0.5 + ${s + 1} * var(--step))">${s === len - 1 ? 'ĐÍCH' : ''}</span>`).join('')}
          <span class="g4rc-tok">${l.art}</span><span class="g4rc-rank"></span></button>`).join('')}
      </div>
    </div>`;
  const root = host.querySelector('.g4rc');
  const laneEls = [...root.querySelectorAll('.g4rc-lane')];
  const act = root.querySelector('.g4ce-act'), fastBtn = root.querySelector('.g4ce-fast');
  const sumEl = root.querySelector('.g4rc-sum');
  const pos = Array(L).fill(0), order = [];
  let phase = 'idle', cur = -1, dice = [1, 1], fast = false, rolls = 0;
  t.root = root; t.pos = pos; t.order = order;
  Object.defineProperty(t, 'cur', { get: () => (phase === 'await' ? cur : -1) });
  Object.defineProperty(t, 'rolls', { get: () => rolls });
  t.lane = (i) => laneEls[i];
  t.hl = (i, cls = 'g4ce-hl') => laneEls.forEach((r, k) => r.classList.toggle(cls, k === i || (Array.isArray(i) && i.includes(k))));
  const buttons = () => {
    act.disabled = phase !== 'idle';
    fastBtn.disabled = phase !== 'idle' || rolls < manual;
    act.classList.toggle('g4ce-ready', !act.disabled && rolls < manual);
    fastBtn.classList.toggle('g4ce-ready', !fastBtn.disabled);
  };
  const place = (i, animate) => {
    const tok = laneEls[i].querySelector('.g4rc-tok');
    const tr = `translateX(calc(${pos[i]} * var(--step)))`;
    if (animate) tok.animate([{ transform: tok.style.transform || 'translateX(0)' }, { transform: `${tr} translateY(-18%)`, offset: 0.5 }, { transform: tr }], { duration: ms(fast ? 220 : 480), easing: 'ease-out' });
    tok.style.transform = tr;
  };
  t.roll = async () => {
    if (phase !== 'idle') return;
    phase = 'rolling'; buttons();
    sfx.tap();
    dice = [1 + Math.floor(rng() * 6), 1 + Math.floor(rng() * 6)];
    sumEl.innerHTML = '&nbsp;';
    const gs = [root.querySelector('.g4rc-d0'), root.querySelector('.g4rc-d1')];
    const dur = ms(fast ? 380 : 1000);
    const timer = setInterval(() => { gs[0].innerHTML = dieFace(1 + Math.floor(Math.random() * 6), 92, 100, 100); gs[1].innerHTML = dieFace(1 + Math.floor(Math.random() * 6), 208, 100, 100); if (!fast) sfx.tick(); }, 120);
    await Promise.all(gs.map((g, k) => g.animate([{ transform: 'none' }, { transform: `translateY(-40px) rotate(${k ? 180 : -180}deg)`, offset: 0.4 }, { transform: 'rotate(360deg)' }], { duration: dur, easing: 'ease-out' })[FIN]));
    clearInterval(timer);
    gs[0].innerHTML = dieFace(dice[0], 92, 100, 100); gs[1].innerHTML = dieFace(dice[1], 208, 100, 100);
    cur = rule(dice[0], dice[1]);
    sumEl.innerHTML = `${dice[0]} ${op} ${dice[1]} = <b>${op === '×' ? dice[0] * dice[1] : dice[0] + dice[1]}</b>`;
    rolls++;
    t.emit('rolled', cur, dice);
    if (fast) { await move(cur); return; }
    phase = 'await'; buttons();
    root.classList.add('g4ce-await');
  };
  t.dice = () => [...dice];
  async function move(i) {
    phase = 'moving'; buttons();
    root.classList.remove('g4ce-await');
    if (pos[i] < len) { pos[i]++; place(i, true); sfx.pop(pos[i]); }
    t.emit('move', i);
    await wait(ms(fast ? 240 : 520));
    if (pos[i] >= len && !order.includes(i)) {
      order.push(i);
      laneEls[i].classList.add('g4rc-fin');
      laneEls[i].querySelector('.g4rc-rank').textContent = order.length;
      sfx.ding();
      t.emit('finish', i);
    }
    if (order.length >= stopAfter) { phase = 'end'; fast = false; buttons(); t.emit('done'); return; }
    phase = 'idle'; buttons();
  }
  t.tapLane = async (i) => {
    if (phase !== 'await') { if (phase === 'idle') t.emit('early', i); return; }
    if (i !== cur) { shake(laneEls[i]); t.emit('wrong', i, cur); return; }
    sfx.tap();
    await move(i);
  };
  t.fast = async () => {
    if (phase !== 'idle' || rolls < manual) return;
    fast = true;
    while (phase === 'idle' && fast) await t.roll();
  };
  act.onclick = () => t.roll();
  fastBtn.onclick = () => t.fast();
  laneEls.forEach((el, i) => el.addEventListener('click', () => t.tapLane(i)));
  laneEls.forEach((_, i) => place(i, false));
  buttons();
  return t;
}

export const rabbitLanes = () => [{ id: 'chan', label: 'Chẵn', art: rabbitArt('#CBD5E1', 'Chẵn') }, { id: 'le', label: 'Lẻ', art: rabbitArt('#FDBA74', 'Lẻ') }];
export const turtleLanes = () => [...Array(11)].map((_, i) => ({ id: i + 2, label: String(i + 2), art: turtleArt(TURTLE_FILLS[i], i + 2) }));

let styled = false;
function injectChanceStyles() {
  if (styled) return;
  styled = true;
  css('g4-chance', `
    .g4ce, .g4rc { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 2cqi; box-sizing: border-box; padding: 1cqh 0.5cqi; }
    .g4ce-ex { padding-bottom: 19cqh; }
    .g4ce-dev { min-height: 0; display: flex; flex-direction: column; gap: 1.2cqh; background: linear-gradient(180deg, #EFF6FF, #F8FAFC); border: 1.5px solid ${EDGE}; border-radius: 1rem; padding: 1.2cqh 1cqi; }
    .g4ce-stage { flex: 1 1 0; min-height: 0; display: flex; }
    .g4ce-svg { flex: 1; min-width: 0; min-height: 0; width: 100%; height: 100%; overflow: visible; }
    .g4ce-wheel { transform-box: view-box; transform-origin: ${WHEEL.cx}px ${WHEEL.cy}px; }
    .g4ce-coin, .g4ce-die, .g4rc-d0, .g4rc-d1 { transform-box: fill-box; transform-origin: 50% 50%; }
    .g4ce-ball, .g4ce-pen, .g4ce-lid, .g4ce-inner, .g4ce-slot > g { transform-box: view-box; }
    .g4ce-ctl { flex: none; display: flex; gap: 1cqi; }
    .g4ce-btn { flex: 1 1 0; min-width: 0; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: min(5cqh, 2.1cqi); line-height: 1.15; padding: 0.3em 0.2em; overflow: hidden; text-overflow: ellipsis; border-radius: 0.8em; cursor: pointer; touch-action: manipulation;
      background: #fff; color: #1E293B; border: 2px solid ${EDGE}; box-shadow: 0 5px 0 ${EDGE}; white-space: nowrap; }
    .g4ce-btn:active:not(:disabled) { transform: translateY(4px); box-shadow: 0 1px 0 ${EDGE}; }
    .g4ce-btn:disabled { opacity: 0.45; cursor: default; }
    .g4ce-act.g4ce-ready { background: linear-gradient(180deg, #4ADE80, #22C55E); color: #fff; border-color: #15803D; box-shadow: 0 5px 0 #15803D; animation: g4ceGo 1.5s ease-in-out infinite; }
    .g4ce-fast.g4ce-ready { background: #FEF3C7; border-color: #F59E0B; box-shadow: 0 5px 0 #D97706; color: #92400E; }
    @keyframes g4ceGo { 50% { transform: scale(1.04); } }
    .g4ce-turn { flex: none; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #64748B; font-size: min(4.6cqh, 2.2cqi); line-height: 1.2; }
    .g4ce-turn b { color: #1D4ED8; }
    .g4ce-tbl { min-height: 0; display: grid; grid-template-rows: auto repeat(var(--k), minmax(0, 1fr)); gap: 1cqh; container-type: size; }
    .g4ce-hd, .g4ce-row { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1.5fr) minmax(0, 0.55fr); align-items: center; gap: 1cqi; }
    .g4ce-hd { font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #475569; font-size: min(7cqh, 4.4cqi); line-height: 1.2; text-align: center; background: #E0F2FE; border-radius: 0.6em; padding: 0.15em 0.3em; }
    .g4ce-row { min-height: 0; max-height: 34cqh; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; background: #fff; border: 2px solid ${EDGE}; border-radius: 0.8rem; box-shadow: 0 5px 0 ${EDGE};
      padding: 0.6cqh 1cqi; cursor: pointer; touch-action: manipulation; transition: background 0.2s, border-color 0.2s; align-content: center; grid-template-rows: minmax(0, 1fr); }
    .g4ce-row:active { transform: translateY(3px); box-shadow: 0 2px 0 ${EDGE}; }
    .g4ce-await .g4ce-row { border-color: #FCD34D; box-shadow: 0 5px 0 #FCD34D; }
    .g4ce-hl { background: #FEF9C3; border-color: #F59E0B !important; box-shadow: 0 5px 0 #D97706 !important; }
    .g4ce-ev { min-width: 0; display: flex; align-items: center; gap: 0.3em; height: 100%; max-height: 22cqh; }
    .g4ce-evpic { flex: none; height: min(80%, 16cqh); aspect-ratio: 1; }
    .g4ce-evl { min-width: 0; font-size: min(calc(42cqh / var(--k)), 4.6cqi, 7cqh); line-height: 1.1; text-align: left; }
    .g4ce-marks { min-width: 0; height: min(70%, 13cqh); display: flex; }
    .g4ce-tally { height: 100%; width: 100%; }
    .g4ce-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: g4ceDraw 0.35s ease-out forwards; }
    @keyframes g4ceDraw { to { stroke-dashoffset: 0; } }
    ${SLOT_CSS('.g4ce-cnt')}
    .g4ce-cnt { justify-self: center; min-width: 1.8em; height: 1.3em; padding: 0 0.2em; font-size: min(calc(46cqh / var(--k)), 7cqi, 9cqh); }
    .g4ce-cnt.g3d-on { animation: g4ceBlink 1.1s ease-in-out infinite; }
    @keyframes g4ceBlink { 50% { box-shadow: 0 0 0 0.16em #FDE68A; } }
    /* Đường đua */
    .g4rc { grid-template-columns: minmax(0, 0.62fr) minmax(0, 1.38fr); }
    .g4rc-sum { flex: none; text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #334155; font-size: min(7cqh, 3.4cqi); line-height: 1.2; min-height: 1.2em; }
    .g4rc-sum b { color: #DC2626; }
    .g4rc-track { min-height: 0; display: grid; grid-template-rows: repeat(var(--l), minmax(0, 1fr)); gap: 0.6cqh; container-type: size; border-radius: 1rem; padding: 0.6cqh 0.8cqi;
      background: linear-gradient(180deg, #BBF7D0, #86EFAC); border: 1.5px solid #4ADE80; }
    .g4rc-lane { position: relative; min-height: 0; display: flex; align-items: center; border: none; background: none; padding: 0; cursor: pointer; touch-action: manipulation; border-radius: 0.6rem;
      --tok: min(calc(120cqh / var(--l)), 12cqi); --step: calc((100cqi - var(--tok) * 1.1 - 3cqi) / var(--len)); }
    .g4rc-path { position: absolute; left: calc(var(--tok) * 0.5); right: 0.5cqi; top: 50%; height: 40%; transform: translateY(-50%); background: #FCD9A5; border-radius: 999px; }
    .g4rc-dot { position: absolute; top: 50%; transform: translate(-50%, -50%); height: min(calc(30cqh / var(--l)), 4cqi); aspect-ratio: 1; border-radius: 999px; background: #fff; display: flex; align-items: center; justify-content: center;
      font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: min(calc(17cqh / var(--l)), 2.2cqi); color: #DC2626; box-sizing: border-box; }
    .g4rc-goal { aspect-ratio: auto; padding: 0 0.35em; }
    .g4rc-tok { position: relative; z-index: 1; width: var(--tok); height: 100%; display: flex; align-items: center; }
    .g4rc-tok svg { width: 100%; max-height: 100%; filter: drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff); }
    .g4ce-await .g4rc-lane { box-shadow: inset 0 0 0 2px #FCD34D; }
    .g4rc-lane.g4ce-hl { background: #FEF9C3; }
    .g4rc-rank { position: absolute; right: 0.4cqi; top: 50%; transform: translateY(-50%); font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #fff; background: #F59E0B; border-radius: 50%;
      width: min(calc(60cqh / var(--l)), 6cqi); aspect-ratio: 1; display: none; align-items: center; justify-content: center; font-size: min(calc(40cqh / var(--l)), 3.6cqi); z-index: 2; }
    .g4rc-fin .g4rc-rank { display: flex; }
    @container (aspect-ratio < 1.6) {
      .g4ce, .g4rc { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) minmax(0, 1fr); gap: 1.4cqh; }
      .g4rc { grid-template-rows: minmax(0, 0.5fr) minmax(0, 1.5fr); }
      .g4ce-btn { font-size: min(3.4cqh, 4.6cqi); }
      .g4ce-turn { font-size: min(2.8cqh, 4cqi); }
      .g4rc-sum { font-size: min(3.6cqh, 5cqi); }
      .g4ce-dev { gap: 0.8cqh; }
    }
    @media (prefers-reduced-motion: reduce) {
      .g4ce-act.g4ce-ready { animation: none; }
      .g4ce-draw { animation-duration: 0.5s; }
    }
  `);
}

/** Hình tĩnh của một đồ vật thí nghiệm (câu "Nêu các sự kiện có thể xảy ra"). */
export const deviceSvg = (device, dev = {}) => DEVICES[device](dev).html;
