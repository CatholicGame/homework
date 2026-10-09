/**
 * Ví dụ "xem từng bước" cho 📘 Kiến thức Toán 1: chủ yếu là hình (bé lớp 1 chưa đọc nhiều chữ).
 * Đăng kí vào knowledgeDemo.js bằng registerDemos; mọi tên loại bắt đầu bằng "g1-".
 *
 *   { kind: 'g1-pair', top: 'cup', bottom: 'spoon', a: 4, b: 3 }       nhiều hơn, ít hơn (nối từng cặp)
 *   { kind: 'g1-shape', focus: ['square', 'circle'], ask: 'circle' }   hình vuông, hình tròn, hình tam giác
 *   { kind: 'g1-count', n: 6, thing: 'bird', from: 5 }                 đếm đồ vật, viết số (from: n − 1 thêm 1)
 *   { kind: 'g1-stairs', from: 1, to: 5, ask: 3 }                      bậc thang khối: đếm xuôi, đếm ngược
 *   { kind: 'g1-cmp', a: 2, b: 5, thing: 'apple' }                     so sánh, dấu < > = (miệng cá sấu)
 *   { kind: 'g1-add', a: 1, b: 2, thing: 'bird', swap?, col?, plate? } gộp hai nhóm: phép cộng
 *   { kind: 'g1-sub', a: 3, b: 1 }                                     ếch nhảy đi: phép trừ
 *   { kind: 'g1-zero', n: 3 }                                          cá bơi đi hết: số 0
 *   { kind: 'g1-bond', n: 6, a: 4 }                                    6 gồm 4 và 2 (tách chấm tròn)
 */

import { registerDemos } from '../grade4Textbook/knowledgeDemo.js';
import { frames, svg, C, numAsk } from '../grade4Textbook/demos/util.js';

// ── Dụng cụ vẽ ───────────────────────────────────────────────────────────────
const r1 = (v) => Math.round(v * 10) / 10;
const T = (x, y, t, { size = 16, fill = C.ink, weight = 800, anchor = 'middle', cls = '', style = '' } = {}) =>
  `<text x="${r1(x)}" y="${r1(y)}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}" dominant-baseline="middle"${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}>${t}</text>`;
const rect = (x, y, w, h, { fill = 'none', stroke = 'none', sw = 1.5, rx = 3, cls = '', style = '', dash = '' } = {}) =>
  `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}/>`;
const ln = (x1, y1, x2, y2, { stroke = C.ink, sw = 2, dash = '', cls = '', style = '' } = {}) =>
  `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}/>`;
const path = (d, { stroke = C.ink, sw = 2, fill = 'none', cls = '', style = '' } = {}) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}/>`;
const circ = (x, y, r, { fill = 'none', stroke = 'none', sw = 1.5, cls = '', style = '', dash = '' } = {}) =>
  `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}/>`;
const ell = (x, y, rx, ry, { fill = 'none', stroke = 'none', sw = 1.5, rot = 0 } = {}) =>
  `<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${rot ? ` transform="rotate(${rot} ${r1(x)} ${r1(y)})"` : ''}/>`;
const g = (cls, body, style = '') => `<g${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}>${body}</g>`;
const delay = (i, step = 0.15) => (i ? `animation-delay:${(i * step).toFixed(2)}s` : '');
const mv = (dx, dy, i = 0, step = 0.15) => `--dx:${r1(dx)}px;--dy:${r1(dy)}px;${delay(i, step)}`;
const lt = '&lt;', gt = '&gt;';

const WORDS = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười'];
const word = (n) => WORDS[n] ?? String(n);
const cap1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// ── Đồ vật vẽ riêng (tâm x, y; cỡ s) ────────────────────────────────────────
const EDGE = '#64748B';
const THINGS = {
  apple: { name: 'quả táo', short: 'táo', draw: (x, y, s) => circ(x, y + s * 0.04, s * 0.4, { fill: '#EF4444', stroke: '#B91C1C', sw: 1.2 })
    + ell(x - s * 0.15, y - s * 0.08, s * 0.08, s * 0.12, { fill: '#FCA5A5', rot: 20 })
    + ln(x, y - s * 0.34, x + s * 0.04, y - s * 0.5, { stroke: '#78350F', sw: s * 0.06 })
    + ell(x + s * 0.17, y - s * 0.42, s * 0.14, s * 0.07, { fill: '#22C55E', rot: -25 }) },
  bird: { name: 'con chim', short: 'chim', draw: (x, y, s) => path(`M${r1(x - s * 0.3)} ${r1(y + s * 0.05)} L${r1(x - s * 0.5)} ${r1(y - s * 0.1)} L${r1(x - s * 0.46)} ${r1(y + s * 0.16)} Z`, { fill: '#0284C7', stroke: '#0284C7', sw: 1 })
    + ell(x, y + s * 0.05, s * 0.36, s * 0.28, { fill: '#38BDF8', stroke: '#0284C7', sw: 1.2 })
    + circ(x + s * 0.22, y - s * 0.16, s * 0.18, { fill: '#38BDF8', stroke: '#0284C7', sw: 1.2 })
    + path(`M${r1(x - s * 0.14)} ${r1(y)} q${r1(s * 0.14)} ${r1(s * 0.2)} ${r1(s * 0.3)} 0`, { stroke: '#0369A1', sw: 1.6, fill: '#7DD3FC' })
    + path(`M${r1(x + s * 0.38)} ${r1(y - s * 0.2)} l${r1(s * 0.16)} ${r1(s * 0.05)} l${r1(-s * 0.16)} ${r1(s * 0.06)} Z`, { fill: '#F59E0B', stroke: '#F59E0B', sw: 1 })
    + circ(x + s * 0.26, y - s * 0.2, s * 0.04, { fill: '#0F172A' }) },
  fish: { name: 'con cá', short: 'cá', draw: (x, y, s) => path(`M${r1(x - s * 0.28)} ${r1(y)} L${r1(x - s * 0.5)} ${r1(y - s * 0.2)} L${r1(x - s * 0.5)} ${r1(y + s * 0.2)} Z`, { fill: '#FB923C', stroke: '#EA580C', sw: 1.2 })
    + ell(x + s * 0.05, y, s * 0.36, s * 0.24, { fill: '#FDBA74', stroke: '#EA580C', sw: 1.2 })
    + circ(x + s * 0.24, y - s * 0.05, s * 0.05, { fill: '#0F172A' }) },
  frog: { name: 'con ếch', short: 'ếch', draw: (x, y, s) => ell(x, y + s * 0.08, s * 0.4, s * 0.3, { fill: '#4ADE80', stroke: '#15803D', sw: 1.2 })
    + circ(x - s * 0.18, y - s * 0.2, s * 0.13, { fill: '#4ADE80', stroke: '#15803D', sw: 1.2 }) + circ(x + s * 0.18, y - s * 0.2, s * 0.13, { fill: '#4ADE80', stroke: '#15803D', sw: 1.2 })
    + circ(x - s * 0.18, y - s * 0.21, s * 0.08, { fill: '#fff' }) + circ(x + s * 0.18, y - s * 0.21, s * 0.08, { fill: '#fff' })
    + circ(x - s * 0.17, y - s * 0.2, s * 0.04, { fill: '#0F172A' }) + circ(x + s * 0.19, y - s * 0.2, s * 0.04, { fill: '#0F172A' })
    + path(`M${r1(x - s * 0.16)} ${r1(y + s * 0.08)} q${r1(s * 0.16)} ${r1(s * 0.12)} ${r1(s * 0.32)} 0`, { stroke: '#166534', sw: 1.6 }) },
  star: { name: 'ngôi sao', short: 'sao', draw: (x, y, s) => {
    const pts = Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? s * 0.2 : s * 0.46; return `${r1(x + r * Math.cos(a))},${r1(y + s * 0.04 + r * Math.sin(a))}`; }).join(' ');
    return `<polygon points="${pts}" fill="#FACC15" stroke="#CA8A04" stroke-width="1.2" stroke-linejoin="round"/>`;
  } },
  cup: { name: 'cái cốc', short: 'cốc', draw: (x, y, s) => path(`M${r1(x + s * 0.24)} ${r1(y - s * 0.12)} c${r1(s * 0.24)} 0 ${r1(s * 0.24)} ${r1(s * 0.3)} 0 ${r1(s * 0.3)}`, { stroke: '#2563EB', sw: s * 0.07 })
    + path(`M${r1(x - s * 0.32)} ${r1(y - s * 0.3)} L${r1(x + s * 0.3)} ${r1(y - s * 0.3)} L${r1(x + s * 0.22)} ${r1(y + s * 0.36)} L${r1(x - s * 0.24)} ${r1(y + s * 0.36)} Z`, { fill: '#60A5FA', stroke: '#2563EB', sw: 1.2 })
    + rect(x - s * 0.24, y - s * 0.12, s * 0.46, s * 0.1, { fill: '#BFDBFE', rx: 1 }) },
  spoon: { name: 'cái thìa', short: 'thìa', draw: (x, y, s) => rect(x - s * 0.05, y - s * 0.05, s * 0.1, s * 0.5, { fill: '#94A3B8', stroke: '#64748B', sw: 1, rx: s * 0.05 })
    + ell(x, y - s * 0.22, s * 0.16, s * 0.22, { fill: '#CBD5E1', stroke: '#64748B', sw: 1.2 }) },
  rabbit: { name: 'con thỏ', short: 'thỏ', draw: (x, y, s) => ell(x - s * 0.13, y - s * 0.24, s * 0.08, s * 0.24, { fill: '#fff', stroke: EDGE, sw: 1.2, rot: -10 })
    + ell(x + s * 0.13, y - s * 0.24, s * 0.08, s * 0.24, { fill: '#fff', stroke: EDGE, sw: 1.2, rot: 10 })
    + ell(x - s * 0.13, y - s * 0.24, s * 0.035, s * 0.15, { fill: '#F9A8D4', rot: -10 }) + ell(x + s * 0.13, y - s * 0.24, s * 0.035, s * 0.15, { fill: '#F9A8D4', rot: 10 })
    + circ(x, y + s * 0.16, s * 0.28, { fill: '#fff', stroke: EDGE, sw: 1.2 })
    + circ(x - s * 0.1, y + s * 0.1, s * 0.04, { fill: '#0F172A' }) + circ(x + s * 0.1, y + s * 0.1, s * 0.04, { fill: '#0F172A' })
    + circ(x, y + s * 0.2, s * 0.04, { fill: '#F472B6' }) },
  carrot: { name: 'củ cà rốt', short: 'cà rốt', draw: (x, y, s) => path(`M${r1(x)} ${r1(y - s * 0.26)} l${r1(-s * 0.12)} ${r1(-s * 0.2)} M${r1(x)} ${r1(y - s * 0.26)} l0 ${r1(-s * 0.24)} M${r1(x)} ${r1(y - s * 0.26)} l${r1(s * 0.12)} ${r1(-s * 0.2)}`, { stroke: '#16A34A', sw: s * 0.07 })
    + path(`M${r1(x - s * 0.17)} ${r1(y - s * 0.26)} L${r1(x + s * 0.17)} ${r1(y - s * 0.26)} L${r1(x)} ${r1(y + s * 0.48)} Z`, { fill: '#FB923C', stroke: '#EA580C', sw: 1.2 })
    + ln(x - s * 0.08, y - s * 0.06, x + s * 0.02, y - s * 0.06, { stroke: '#EA580C', sw: 1.2 }) + ln(x - s * 0.02, y + s * 0.14, x + s * 0.06, y + s * 0.14, { stroke: '#EA580C', sw: 1.2 }) },
  flower: { name: 'bông hoa', short: 'hoa', draw: (x, y, s) => [0, 1, 2, 3, 4].map((i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5; return circ(x + s * 0.22 * Math.cos(a), y + s * 0.22 * Math.sin(a), s * 0.17, { fill: '#F472B6', stroke: '#DB2777', sw: 1 }); }).join('')
    + circ(x, y, s * 0.13, { fill: '#FDE047', stroke: '#CA8A04', sw: 1 }) },
  chick: { name: 'con gà con', short: 'gà con', draw: (x, y, s) => ell(x, y + s * 0.12, s * 0.34, s * 0.28, { fill: '#FDE047', stroke: '#CA8A04', sw: 1.2 })
    + circ(x + s * 0.12, y - s * 0.16, s * 0.2, { fill: '#FDE047', stroke: '#CA8A04', sw: 1.2 })
    + path(`M${r1(x + s * 0.3)} ${r1(y - s * 0.2)} l${r1(s * 0.14)} ${r1(s * 0.05)} l${r1(-s * 0.14)} ${r1(s * 0.05)} Z`, { fill: '#F97316', stroke: '#F97316', sw: 1 })
    + circ(x + s * 0.17, y - s * 0.2, s * 0.035, { fill: '#0F172A' }) },
  ball: { name: 'quả bóng', short: 'bóng', draw: (x, y, s) => path(`M${r1(x)} ${r1(y + s * 0.3)} q${r1(-s * 0.08)} ${r1(s * 0.1)} 0 ${r1(s * 0.2)}`, { stroke: '#94A3B8', sw: 1.4 })
    + path(`M${r1(x - s * 0.05)} ${r1(y + s * 0.34)} L${r1(x + s * 0.05)} ${r1(y + s * 0.34)} L${r1(x)} ${r1(y + s * 0.27)} Z`, { fill: '#7C3AED', stroke: '#7C3AED', sw: 1 })
    + ell(x, y - s * 0.06, s * 0.3, s * 0.36, { fill: '#A78BFA', stroke: '#7C3AED', sw: 1.2 })
    + ell(x - s * 0.11, y - s * 0.18, s * 0.06, s * 0.1, { fill: '#EDE9FE', rot: 25 }) },
  dot: { name: 'chấm tròn', short: 'chấm', draw: (x, y, s) => circ(x, y, s * 0.36, { fill: '#3B82F6', stroke: '#1D4ED8', sw: 1.2 }) },
};
const thing = (k) => THINGS[k] || THINGS.apple;
const item = (k, x, y, s, cls = '', style = '') => g(cls, thing(k).draw(x, y, s), style);

/** Bộ bước (như stepper của demos/diagram.js): s.show(k) hiện phần mới, s.hide(k) cất, s.c(k) cho class, s.snap(lời) chụp. */
function stepper(title, W, H, draw) {
  const f = frames(title), on = new Set();
  let fresh = new Set();
  const s = {
    has: (k) => on.has(k),
    isNew: (k) => fresh.has(k),
    show(...k) { k.flat().forEach((x) => { on.add(x); fresh.add(x); }); return s; },
    hide(...k) { k.flat().forEach((x) => on.delete(x)); return s; },
    c: (k, anim = 'is-new') => (!on.has(k) ? 'kd-ghost' : fresh.has(k) ? anim : ''),
    snap(caption, extra = {}) { f.add(svg(W, H, draw(s)), caption, extra); fresh = new Set(); return s; },
    done: () => f.done(),
  };
  return s;
}

/** Ba lựa chọn số (0 tới 10). */
const ask1 = (n, ok) => numAsk(n, { near: [1, -1, 2, -2], ok });

/** Dấu so sánh hình miệng cá sấu: miệng há về phía số lớn hơn (sign '<' | '>' | '='). */
function croc(x, y, sign, size = 40, cls = '') {
  const h = size * 0.5, w = size * 0.55, col = '#16A34A';
  if (sign === '=') return g(cls, ln(x - w, y - h * 0.35, x + w, y - h * 0.35, { stroke: col, sw: size * 0.16 }) + ln(x - w, y + h * 0.35, x + w, y + h * 0.35, { stroke: col, sw: size * 0.16 }));
  const d = sign === '<' ? 1 : -1; // mũi nhọn ở bên trái khi '<'
  const tip = x - d * w, open = x + d * w;
  return g(cls, path(`M${r1(open)} ${r1(y - h)} L${r1(tip)} ${r1(y)} L${r1(open)} ${r1(y + h)}`, { stroke: col, sw: size * 0.18 })
    + circ(tip + d * w * 1.05, y - h * 0.62, size * 0.1, { fill: '#fff', stroke: '#14532D', sw: 1.6 }) + circ(tip + d * w * 1.05, y - h * 0.62, size * 0.04, { fill: '#14532D' }));
}

// ── Bài 2: nhiều hơn, ít hơn ────────────────────────────────────────────────
function pair(spec) {
  const { top = 'cup', bottom = 'spoon', a = 4, b = 3 } = spec;
  const A = thing(top), B = thing(bottom), m = Math.max(a, b), k = Math.min(a, b);
  const sp = Math.min(64, 320 / m), sz = Math.min(54, sp * 0.86), X0 = 180 - ((m - 1) * sp) / 2, yA = 46, yB = 150;
  const s = stepper(`${cap1(A.short)} và ${B.short}`, 360, 200, (s) => {
    let out = rect(6, 6, 348, 188, { fill: '#F8FAFC', rx: 16 });
    for (let i = 0; i < k; i++) out += ln(X0 + i * sp, yA + sz * 0.48, X0 + i * sp, yB - sz * 0.6, { stroke: C.orange, sw: 3, dash: '6 5', cls: s.c('lines', 'is-fade'), style: delay(i, 0.3) });
    const ring = (x, y) => circ(x, y, sz * 0.62, { fill: '#FEF3C7', stroke: C.orange, sw: 2.5, dash: '6 4', cls: s.c('extra') });
    for (let i = k; i < m; i++) out += a > b ? ring(X0 + i * sp, yA) : ring(X0 + i * sp, yB);
    for (let i = 0; i < a; i++) out += item(top, X0 + i * sp, yA, sz, '', '');
    for (let i = 0; i < b; i++) out += item(bottom, X0 + i * sp, yB, sz, '', '');
    return out;
  });
  const more = a > b ? A : B, less = a > b ? B : A, left = m - k;
  s.snap(`Có ${A.short} và ${B.short}. Bên nào nhiều hơn?`);
  s.show('lines').snap(`Nối mỗi ${A.short} với một ${B.short}.`);
  s.show('extra').snap(`Còn thừa <b>${left} ${more.short}</b>.`);
  s.snap('Bên nào nhiều hơn?', { ask: { options: [`${cap1(A.short)} nhiều hơn`, `${cap1(B.short)} nhiều hơn`], answer: a > b ? 0 : 1, ok: `Đúng rồi! ${cap1(more.short)} còn thừa nên <b>nhiều hơn</b>.` } });
  s.snap(`Số ${more.short} <b>nhiều hơn</b> số ${less.short}.<br>Số ${less.short} <b>ít hơn</b> số ${more.short}.`, { result: `${cap1(less.short)} ít hơn ${more.short}` });
  return s.done();
}

// ── Bài 3, 4: hình vuông, hình tròn, hình tam giác ──────────────────────────
const SHAPE_NAME = { square: 'hình vuông', circle: 'hình tròn', triangle: 'hình tam giác' };
function shapeAt(kind, x, y, r, fill, stroke, flip = false) {
  if (kind === 'circle') return circ(x, y, r, { fill, stroke, sw: 2 });
  if (kind === 'square') return rect(x - r * 0.9, y - r * 0.9, r * 1.8, r * 1.8, { fill, stroke, sw: 2, rx: 2 });
  const h = r * 1.8, d = flip ? -1 : 1;
  return path(`M${r1(x)} ${r1(y - d * h / 2)} L${r1(x + r)} ${r1(y + d * h / 2)} L${r1(x - r)} ${r1(y + d * h / 2)} Z`, { fill, stroke, sw: 2 });
}
function shape(spec) {
  const { focus = ['square', 'circle'], ask = 'circle', sticks = focus[0] === 'circle' ? 'square' : focus[0] } = spec;
  const kinds = focus.includes('triangle') ? ['square', 'circle', 'triangle'] : ['square', 'circle'];
  // hai hàng hình lẫn lộn, khác màu, khác cỡ
  const LIST = focus.includes('triangle')
    ? [['triangle', 22, '#86EFAC', '#16A34A'], ['circle', 20, '#93C5FD', '#2563EB'], ['square', 19, '#FCA5A5', '#DC2626'], ['triangle', 15, '#FDE68A', '#CA8A04', true], ['square', 14, '#C4B5FD', '#7C3AED'],
      ['circle', 14, '#FDBA74', '#EA580C'], ['triangle', 17, '#F9A8D4', '#DB2777'], ['square', 22, '#A5F3FC', '#0891B2'], ['circle', 24, '#FDE68A', '#CA8A04'], ['triangle', 23, '#93C5FD', '#2563EB', true]]
    : [['square', 20, '#FCA5A5', '#DC2626'], ['circle', 22, '#93C5FD', '#2563EB'], ['square', 14, '#FDE68A', '#CA8A04'], ['circle', 15, '#86EFAC', '#16A34A'], ['square', 23, '#C4B5FD', '#7C3AED'],
      ['circle', 24, '#FDBA74', '#EA580C'], ['square', 16, '#A5F3FC', '#0891B2'], ['circle', 18, '#F9A8D4', '#DB2777'], ['square', 21, '#86EFAC', '#16A34A'], ['circle', 14, '#FCA5A5', '#DC2626']];
  const pos = (i) => [40 + (i % 5) * 70, 40 + Math.floor(i / 5) * 66];
  const s = stepper(cap1(focus.map((k) => SHAPE_NAME[k]).join(', ')), 360, 272, (s) => {
    let out = rect(6, 6, 348, 138, { fill: '#F8FAFC', rx: 16 });
    const lit = focus.find((k) => s.has(`f-${k}`) && !s.has('all'));
    LIST.forEach(([k, r, fill, stroke, flip], i) => {
      const [x, y] = pos(i), dim = lit && k !== lit;
      out += g(dim ? 'g1-dim' : lit === k && s.isNew(`f-${k}`) ? 'g1-glow' : '', shapeAt(k, x, y, r, fill, stroke, flip), lit === k ? delay(i % 5, 0.1) : '');
    });
    // vùng dưới: bên trái hình để hỏi, bên phải xếp que tính
    out += rect(6, 154, 160, 112, { fill: '#FFF7ED', rx: 16, cls: s.c('ask', 'is-fade') });
    out += g(s.c('ask'), shapeAt(ask, 86, 210, 38, '#FDE68A', '#CA8A04') + T(86, 210, '?', { size: 34, fill: '#92400E' }));
    out += rect(176, 154, 178, 112, { fill: '#F0FDF4', rx: 16, cls: s.c('sticks', 'is-fade') });
    const stick = (x1, y1, x2, y2, i) => g(s.c('sticks', 'is-fade'), ln(x1, y1, x2, y2, { stroke: '#D97706', sw: 7 }) + ln(x1, y1, x1 + (x2 - x1) * 0.08, y1 + (y2 - y1) * 0.08, { stroke: '#DC2626', sw: 8 }), delay(i, 0.35));
    if (sticks === 'triangle') {
      const P = [[265, 168], [310, 250], [220, 250]];
      out += stick(...P[0], ...P[1], 0) + stick(...P[1], ...P[2], 1) + stick(...P[2], ...P[0], 2);
    } else {
      const P = [[227, 170], [303, 170], [303, 246], [227, 246]];
      out += stick(...P[0], ...P[1], 0) + stick(...P[1], ...P[2], 1) + stick(...P[2], ...P[3], 2) + stick(...P[3], ...P[0], 3);
    }
    return out;
  });
  s.snap('Có nhiều hình. Em nhìn hình dạng.');
  focus.forEach((k) => { s.show(`f-${k}`).snap(`Đây là các <b>${SHAPE_NAME[k]}</b>.`); s.hide(`f-${k}`); });
  s.show('ask').snap('Hình này là hình gì?', { ask: { options: kinds.map((k) => cap1(SHAPE_NAME[k])), answer: kinds.indexOf(ask), ok: `Đúng rồi! Đây là <b>${SHAPE_NAME[ask]}</b>.` } });
  const nst = sticks === 'triangle' ? 3 : 4;
  s.show('sticks').snap(`Xếp ${nst} que tính, được <b>${SHAPE_NAME[sticks]}</b>.`, { result: `${nst} que tính: ${SHAPE_NAME[sticks]}` });
  return s.done();
}

// ── Đếm đồ vật, viết số (Bài 6, 8, 16 tới 21) ───────────────────────────────
/** Dấu chấm của một số: xếp như ô mười (hai hàng năm). */
function dotCard(x, y, n, { r = 7, gap = 19, cls = '', color = '#3B82F6' } = {}) {
  let out = rect(x, y, gap * 5 + 8, gap * 2 + 8, { fill: '#fff', stroke: C.line, sw: 1.5, rx: 8 });
  for (let i = 0; i < 10; i++) {
    const cx = x + 4 + gap / 2 + (i % 5) * gap, cy = y + 4 + gap / 2 + Math.floor(i / 5) * gap;
    out += circ(cx, cy, r, i < n ? { fill: color } : { stroke: '#E2E8F0', sw: 1.2 });
  }
  return g(cls, out);
}
function count(spec) {
  const { n = 3, thing: k = 'apple', from = null } = spec;
  const A = thing(k), rows = n > 5 ? 2 : 1, per = rows === 2 ? 5 : n;
  const sp = rows === 2 ? 62 : Math.min(96, 320 / per), sz = Math.min(sp * 0.82, rows === 2 ? 52 : 76);
  const X0 = 180 - ((Math.min(per, 5) - 1) * sp) / 2, Y0 = rows === 2 ? 48 : 70;
  const at = (i) => [X0 + (i % 5) * sp, Y0 + Math.floor(i / 5) * (sp + 10)];
  const yB = 170;
  const s = stepper(`Số ${n}`, 360, 236, (s) => {
    let out = rect(6, 6, 348, 152, { fill: '#F8FAFC', rx: 16 });
    for (let i = 0; i < n; i++) {
      const [x, y] = at(i), extra = from != null && i >= from;
      out += item(k, x, y, sz, extra ? s.c('more') : s.c('base'), extra ? '' : delay(i, 0.08));
      out += g(s.c('tags'), circ(x + sz * 0.42, y - sz * 0.42, 11, { fill: C.orange }) + T(x + sz * 0.42, y - sz * 0.42 + 1, i + 1, { size: 14, fill: '#fff', cls: 'plain' }), delay(i, 0.35));
    }
    out += g(s.c('num'), rect(64, yB, 92, 60, { fill: '#EFF6FF', rx: 12 }) + T(110, yB + 32, n, { size: 50, fill: C.blue }));
    out += dotCard(176, yB + 6, n, { cls: s.c('dots') });
    return out;
  });
  if (from != null) {
    s.show('base').snap(`Có <b>${from}</b> ${A.name}.`);
    s.show('more').snap(`Thêm <b>${n - from}</b> ${A.name}.`);
  } else {
    s.show('base', 'more').snap(`Có mấy ${A.name}? Em đếm.`);
  }
  s.snap(`Có tất cả mấy ${A.name}?`, { ask: ask1(n, `Đúng rồi! Có <b>${n}</b> ${A.name}.`) });
  s.show('tags').snap(`Đếm: ${Array.from({ length: n }, (_, i) => word(i + 1)).join(', ')}.`);
  s.show('num').snap(`Viết số <b>${n}</b>. Đọc là <b>${word(n)}</b>.`);
  s.show('dots').snap(`${n} chấm tròn cũng là <b>${n}</b>.`, { result: from != null ? `${from} thêm ${n - from} là ${n}` : `Số ${n}` });
  return s.done();
}

// ── Bậc thang khối: thứ tự các số ───────────────────────────────────────────
function stairs(spec) {
  const { from = 1, to = 5, ask = Math.min(to - 1, from + 2) } = spec;
  const cnt = to - from + 1, cw = Math.min(56, 330 / cnt), X0 = 180 - (cnt * cw) / 2, yBase = 186;
  const ch = Math.min(cw - 4, 132 / Math.max(to, 1));
  const xc = (v) => X0 + (v - from + 0.5) * cw;
  const s = stepper(`Các số từ ${from} đến ${to}`, 360, 250, (s) => {
    let out = rect(6, 6, 348, 238, { fill: '#F8FAFC', rx: 16 });
    out += ln(X0 - 4, yBase, X0 + cnt * cw + 4, yBase, { stroke: C.soft, sw: 2 });
    for (let v = from; v <= to; v++) {
      const i = v - from;
      let col = '';
      for (let j = 0; j < v; j++) col += rect(xc(v) - (cw - 6) / 2, yBase - (j + 1) * ch, cw - 6, ch - 2, { fill: v === ask && s.has('mark') ? '#FDBA74' : '#93C5FD', stroke: v === ask && s.has('mark') ? C.orange : '#3B82F6', sw: 1.2, rx: 3 });
      out += g(i === 0 ? s.c('c0') : s.c('cols'), col, i ? delay(i - 1, 0.15) : '');
      out += T(xc(v), yBase + 22, v, { size: Math.min(26, cw * 0.7), fill: v === ask && s.has('mark') ? C.orange : C.ink, cls: s.c('nums'), style: delay(i, 0.15) });
    }
    const yA = 20;
    out += g(s.c('up', 'is-fade'), path(`M${r1(xc(from))} ${yA} L${r1(xc(to))} ${yA}`, { stroke: C.green, sw: 3 }) + path(`M${r1(xc(to) - 8)} ${yA - 6} L${r1(xc(to))} ${yA} L${r1(xc(to) - 8)} ${yA + 6}`, { stroke: C.green, sw: 3 }));
    out += g(s.c('down', 'is-fade'), path(`M${r1(xc(to))} ${yA + 16} L${r1(xc(from))} ${yA + 16}`, { stroke: C.violet, sw: 3 }) + path(`M${r1(xc(from) + 8)} ${yA + 10} L${r1(xc(from))} ${yA + 16} L${r1(xc(from) + 8)} ${yA + 22}`, { stroke: C.violet, sw: 3 }));
    return out;
  });
  const list = Array.from({ length: cnt }, (_, i) => from + i);
  s.show('c0').snap(from === 0 ? 'Cột số 0 không có khối nào.' : `Cột đầu có <b>${from}</b> khối.`);
  s.show('cols').snap('Mỗi cột sau <b>thêm 1</b> khối.');
  s.show('nums', 'up').snap(`Đếm xuôi: <b>${list.join(', ')}</b>.`);
  s.show('mark').snap(`Số nào đứng ngay sau ${ask}?`, { ask: ask1(ask + 1, `Đúng rồi! ${ask} thêm 1 là <b>${ask + 1}</b>.`) });
  s.hide('mark').show('down').snap(`Đếm ngược: <b>${list.slice().reverse().join(', ')}</b>.`, { result: list.join(', ') });
  return s.done();
}

// ── Bài 10, 11, 13: bé hơn, lớn hơn, bằng nhau ──────────────────────────────
function cmp(spec) {
  const { a = 2, b = 5, thing: k = 'apple' } = spec;
  const A = thing(k), m = Math.max(a, b), kk = Math.min(a, b);
  const sp = 52, sz = 44, X0 = 104, yA = 40, yB = 104;
  const sign = a < b ? '<' : a > b ? '>' : '=';
  const yE = 182;
  const s = stepper(`${a} và ${b}`, 360, 226, (s) => {
    let out = rect(6, 6, 348, 132, { fill: '#F8FAFC', rx: 16 });
    for (let i = 0; i < kk; i++) out += ln(X0 + i * sp, yA + sz * 0.42, X0 + i * sp, yB - sz * 0.46, { stroke: C.orange, sw: 3, dash: '5 4', cls: s.c('pair', 'is-fade'), style: delay(i, 0.3) });
    for (let i = kk; i < m; i++) out += circ(X0 + i * sp, a > b ? yA : yB, sz * 0.6, { fill: '#FEF3C7', stroke: C.orange, sw: 2.5, dash: '6 4', cls: s.c('pair'), style: delay(kk, 0.3) });
    for (let i = 0; i < a; i++) out += item(k, X0 + i * sp, yA, sz);
    for (let i = 0; i < b; i++) out += item(k, X0 + i * sp, yB, sz);
    out += g(s.c('cnt'), circ(44, yA, 22, { fill: '#DBEAFE' }) + T(44, yA + 1, a, { size: 30, fill: C.blue }) + circ(44, yB, 22, { fill: '#DBEAFE' }) + T(44, yB + 1, b, { size: 30, fill: C.blue }));
    out += rect(70, yE - 36, 220, 72, { fill: '#F0FDF4', rx: 16, cls: s.c('eq', 'is-fade') });
    out += g(s.c('eq'), T(118, yE + 2, a, { size: 52, fill: C.ink }) + T(242, yE + 2, b, { size: 52, fill: C.ink }));
    out += rect(156, yE - 26, 48, 52, { fill: '#fff', stroke: C.soft, sw: 2, rx: 8, dash: '5 4', cls: s.c('box') });
    out += croc(180, yE, sign, 44, s.c('sign'));
    return out;
  });
  s.snap(`Hàng trên và hàng dưới, hàng nào nhiều ${A.short} hơn?`);
  s.show('cnt').snap(`Hàng trên có <b>${a}</b>. Hàng dưới có <b>${b}</b>.`);
  s.show('pair').snap(a === b ? 'Nối từng cặp: <b>không thừa</b> quả nào.' : `Nối từng cặp: hàng ${a > b ? 'trên' : 'dưới'} <b>còn thừa ${m - kk}</b>.`);
  s.show('eq', 'box').snap(`${a} ... ${b}: em chọn dấu nào?`, { ask: { options: [lt, gt, '='], answer: ['<', '>', '='].indexOf(sign),
    ok: a === b ? `Đúng rồi! ${a} <b>bằng</b> ${b}.` : `Đúng rồi! ${a} <b>${a < b ? 'bé hơn' : 'lớn hơn'}</b> ${b}.` } });
  const say = { '<': `<b>${a} bé hơn ${b}</b>. Miệng dấu <b>há về phía số lớn hơn</b>.`, '>': `<b>${a} lớn hơn ${b}</b>. Miệng dấu <b>há về phía số lớn hơn</b>.`, '=': `<b>${a} bằng ${b}</b>. Viết dấu <b>=</b>.` }[sign];
  s.hide('box').show('sign').snap(say, { result: `${a} ${sign === '<' ? lt : sign === '>' ? gt : '='} ${b}` });
  return s.done();
}

// ── Phép cộng: gộp hai nhóm (Bài 25, 27, 29, 31) ────────────────────────────
function groupPos(n, cx, cy, sp) {
  const per = n > 3 ? Math.ceil(n / 2) : n, rows = n > 3 ? 2 : 1;
  return Array.from({ length: n }, (_, i) => {
    const r = Math.floor(i / per), inRow = r === rows - 1 ? n - per * (rows - 1) : per, c = i - r * per;
    return [cx + (c - (inRow - 1) / 2) * sp, cy + (r - (rows - 1) / 2) * sp * 0.9];
  });
}
function add(spec) {
  const { a = 1, b = 2, thing: k = 'apple', swap = false, col = false, plate = k === 'apple' } = spec;
  const A = thing(k), sum = a + b, sz = 48, sp = 50, cy = 72, xL = 96, xR = 264;
  const PL = groupPos(a, xL, cy, sp), PR = groupPos(b, xR, cy, sp);
  const yE = 196, yS = 236;
  const s = stepper(`${a} + ${b}`, 360, swap ? 256 : 226, (s) => {
    let out = rect(6, 6, 348, 154, { fill: '#F8FAFC', rx: 16 });
    out += rect(14, 14, 332, 138, { fill: '#FEF9C3', stroke: '#FACC15', sw: 2.5, rx: 18, cls: s.c('join', 'is-fade') });
    const holder = (x) => (plate ? ell(x, cy + 34, 72, 18, { fill: '#fff', stroke: '#CBD5E1', sw: 2 }) : rect(x - 74, 22, 148, 104, { fill: '#fff', stroke: '#E2E8F0', sw: 1.5, rx: 14 }));
    out += holder(xL) + holder(xR);
    PL.forEach(([x, y], i) => { out += item(k, x, y, sz, s.c('A'), delay(i, 0.1)); });
    PR.forEach(([x, y], i) => { out += item(k, x, y, sz, s.c('B'), delay(i, 0.1)); });
    out += T(180, cy, '+', { size: 34, fill: C.orange, cls: s.c('plus') });
    out += g(s.c('nA'), T(xL, 140, a, { size: 22, fill: C.blue })) + g(s.c('nB'), T(xR, 140, b, { size: 22, fill: C.blue }));
    const eq = `${a} + ${b} = ${sum}`;
    out += T(col ? 140 : 180, yE, eq, { size: 40, fill: C.green, cls: s.c('eq') });
    if (swap) out += T(col ? 140 : 180, yS, `${b} + ${a} = ${sum}`, { size: 30, fill: C.violet, cls: s.c('sw') });
    if (col) {
      const x = 300;
      out += g(s.c('col'), T(x + 8, yE - 22, a, { size: 22 }) + T(x - 14, yE - 4, '+', { size: 20, fill: C.orange }) + T(x + 8, yE + 2, b, { size: 22 })
        + ln(x - 18, yE + 16, x + 22, yE + 16, { stroke: C.ink, sw: 2 }) + T(x + 8, yE + 32, sum, { size: 22, fill: C.green }));
    }
    return out;
  });
  const zero = (n) => (plate ? `Đĩa này <b>không có</b> ${A.short} nào: <b>0</b>.` : `Không có ${A.short} nào: <b>0</b>.`);
  s.show('A', 'nA').snap(a ? `Có <b>${a}</b> ${A.name}.` : zero(a));
  s.show('B', 'nB', 'plus').snap(b ? `Thêm <b>${b}</b> ${A.name}.` : zero(b));
  s.show('join').snap(`Gộp lại. Có tất cả mấy ${A.name}?`, { ask: ask1(sum, `Đúng rồi! Có tất cả <b>${sum}</b> ${A.name}.`) });
  s.show('eq').snap(`Viết: <b>${a} + ${b} = ${sum}</b>.<br>Đọc: ${word(a)} cộng ${word(b)} bằng ${word(sum)}.`, swap || col ? {} : { result: `${a} + ${b} = ${sum}` });
  if (col) s.show('col').snap('Viết theo cột: số dưới thẳng số trên, kẻ gạch ngang, viết kết quả.', swap ? {} : { result: `${a} + ${b} = ${sum}` });
  if (swap) s.show('sw').snap(`Đổi chỗ hai số: <b>${b} + ${a}</b> cũng bằng <b>${sum}</b>.`, { result: `${a} + ${b} = ${b} + ${a}` });
  return s.done();
}

// ── Bài 34: phép trừ (ếch nhảy khỏi lá sen) ─────────────────────────────────
function sub(spec) {
  const { a = 3, b = 1, thing: k = 'frog' } = spec;
  const A = thing(k), r = a - b, sz = 48, sp = 56, X0 = 120 - ((a - 1) * sp) / 2, y0 = 70;
  const s = stepper(`${a} − ${b}`, 360, 206, (s) => {
    let out = rect(6, 6, 348, 136, { fill: '#BAE6FD', rx: 16 });
    out += path('M14 116 q30 -10 60 0 t60 0 t60 0 t60 0 t60 0 t60 0', { stroke: '#7DD3FC', sw: 3 });
    out += ell(122, 96, 106, 26, { fill: '#4ADE80', stroke: '#16A34A', sw: 2 });
    for (let i = 0; i < a; i++) {
      const x = X0 + i * sp, gone = i >= r, tx = 300 - (a - 1 - i) * 46, ty = 112;
      if (gone && s.has('jump')) out += g(s.isNew('jump') ? 'is-move g1-gone' : 'g1-gone', item(k, tx, ty, sz * 0.8), mv(x - tx, y0 - ty, i - r, 0.3));
      else out += item(k, x, y0, sz);
    }
    for (let i = r; i < a; i++) out += g(s.c('jump', 'is-fade'), ell(300 - (a - 1 - i) * 46, 126, 24, 7, { stroke: '#fff', sw: 2.5 }), delay(i - r + 2, 0.3));
    out += T(180, 176, `${a} − ${b} = ${r}`, { size: 42, fill: C.red, cls: s.c('eq') });
    return out;
  });
  s.snap(`Có <b>${a}</b> ${A.name} trên lá sen.`);
  s.show('jump').snap(`<b>${b}</b> ${A.name} nhảy xuống nước.`);
  s.snap(`Trên lá sen còn mấy ${A.name}?`, { ask: ask1(r, `Đúng rồi! Còn <b>${r}</b> ${A.name}.`) });
  s.show('eq').snap(`Bớt đi: làm tính <b>trừ</b>. Viết: <b>${a} − ${b} = ${r}</b>.<br>Đọc: ${word(a)} trừ ${word(b)} bằng ${word(r)}.`, { result: `${a} − ${b} = ${r}` });
  return s.done();
}

// ── Bài 20: số 0 (cá bơi đi hết) ────────────────────────────────────────────
function zero(spec) {
  const { n = 3 } = spec;
  const sz = 58, P = groupPos(n, 122, 84, 62);
  let left = n;
  const s = stepper('Số 0', 360, 236, () => {
    let out = rect(6, 6, 348, 224, { fill: '#F8FAFC', rx: 16 });
    out += path('M42 40 Q30 140 122 146 Q214 140 202 40 Z', { fill: '#E0F2FE', stroke: '#38BDF8', sw: 3 });
    out += ell(122, 40, 80, 9, { fill: '#BAE6FD', stroke: '#38BDF8', sw: 2.5 });
    for (let i = 0; i < n; i++) {
      const [x, y] = P[i];
      if (i < left) out += item('fish', x, y, sz);
      else if (i === left && left === cur) out += g('g1-leave', item('fish', x, y, sz));
    }
    out += rect(236, 48, 96, 80, { fill: '#EFF6FF', rx: 14 });
    out += T(284, 90, left, { size: 60, fill: left ? C.blue : C.orange, cls: left === cur ? 'is-new' : '' });
    if (lineOn) {
      for (let v = 0; v <= 5; v++) {
        const x = 40 + v * 56;
        out += g(lineNew ? 'is-new' : '', rect(x - 20, 168, 40, 44, { fill: v === 0 ? '#FED7AA' : '#fff', stroke: v === 0 ? C.orange : C.line, sw: 2, rx: 8 }) + T(x, 191, v, { size: 26, fill: v === 0 ? C.orange : C.ink }), delay(v, 0.12));
      }
    }
    return out;
  });
  let cur = -1, lineOn = false, lineNew = false;
  s.snap(`Trong bể có <b>${n}</b> con cá.`);
  for (let i = n - 1; i >= 1; i--) { left = i; cur = i; s.snap(`1 con bơi đi. Còn <b>${i}</b> con.`); }
  left = 0; cur = 0;
  s.snap('1 con bơi đi. Còn mấy con?', { ask: { options: ['0', '1', '2'], answer: 0, ok: 'Đúng rồi! Không còn con nào: viết số <b>0</b>.' } });
  cur = -2; lineOn = true; lineNew = true;
  s.snap('Số 0 đứng trước số 1. <b>0 bé hơn 1</b>.', { result: `0 ${lt} 1` });
  return s.done();
}

// ── Tách số: 6 gồm 4 và 2 (Bài 16 tới 21) ───────────────────────────────────
function bond(spec) {
  const { n = 6, a = Math.ceil(n / 2) } = spec;
  const b = n - a, gap = 24, r = 9;
  const top = (i) => [180 - 2 * gap + (i % 5) * gap, 40 + Math.floor(i / 5) * gap];
  const box = (cx, cnt) => (i) => { const per = Math.min(cnt, 5) || 1; return [cx - ((per - 1) * gap) / 2 + (i % 5) * gap, (cnt > 5 ? 166 : 178) + Math.floor(i / 5) * gap]; };
  const L = box(86, a), R = box(274, b);
  const s = stepper(`${n} gồm ${a} và ${b}`, 360, 262, (s) => {
    let out = rect(6, 6, 348, 250, { fill: '#F8FAFC', rx: 16 });
    out += rect(110, 20, 140, 70, { fill: '#fff', stroke: C.line, sw: 1.5, rx: 12 });
    out += g(s.c('lines', 'is-fade'), ln(150, 92, 100, 146, { stroke: C.soft, sw: 2.5 }) + ln(210, 92, 260, 146, { stroke: C.soft, sw: 2.5 }));
    out += rect(16, 150, 140, 56, { fill: '#fff', stroke: C.line, sw: 1.5, rx: 12, cls: s.c('split', 'is-fade') });
    out += rect(204, 150, 140, 56, { fill: '#fff', stroke: C.line, sw: 1.5, rx: 12, cls: s.c('split', 'is-fade') });
    for (let i = 0; i < n; i++) {
      const [x, y] = top(i), red = i < a;
      if (!s.has('split')) out += circ(x, y, r, { fill: red ? C.red : C.blue });
      else {
        out += circ(x, y, r, { stroke: '#E2E8F0', sw: 1.5 });
        const [tx, ty] = red ? L(i) : R(i - a);
        out += circ(tx, ty, r, { fill: red ? C.red : C.blue, cls: s.isNew('split') ? 'is-move' : '', style: s.isNew('split') ? mv(x - tx, y - ty, i, 0.08) : '' });
      }
    }
    out += g(s.c('nN'), circ(276, 56, 22, { fill: '#DBEAFE' }) + T(276, 57, n, { size: 28, fill: C.blue }));
    out += g(s.c('nA'), circ(86, 232, 18, { fill: '#FEE2E2' }) + T(86, 233, a, { size: 24, fill: C.red }));
    out += g(s.c('nB'), circ(274, 232, 18, { fill: '#DBEAFE' }) + T(274, 233, b, { size: 24, fill: C.blue }));
    return out;
  });
  s.show('nN').snap(`Có <b>${n}</b> chấm tròn: chấm đỏ và chấm xanh.`);
  s.show('split', 'lines').snap('Tách ra hai phần.');
  s.show('nA').snap(`Bên trái có <b>${a}</b> chấm đỏ.`);
  s.snap('Bên phải có mấy chấm xanh?', { ask: ask1(b, `Đúng rồi! Bên phải có <b>${b}</b> chấm.`) });
  s.show('nB').snap(`<b>${n} gồm ${a} và ${b}</b>.`, { result: `${n} gồm ${a} và ${b}` });
  return s.done();
}

const CSS = `
  .kd-svg .g1-dim { opacity: 0.18; transition: opacity 0.4s; }
  .kd-svg .g1-glow { animation: kdPop 0.55s cubic-bezier(.3,1.5,.5,1) both; transform-box: fill-box; transform-origin: center; }
  .kd-svg .g1-gone { opacity: 0.55; }
  .kd-svg .g1-gone.is-move { animation: g1Jump 1s ease-in-out both; }
  .kd-svg .g1-leave { animation: g1Leave 1.1s ease-in both; }
  @keyframes g1Jump { 0% { transform: translate(var(--dx), var(--dy)); opacity: 1; } 45% { transform: translate(calc(var(--dx) * 0.5), calc(var(--dy) * 0.5 - 40px)); opacity: 1; } 100% { transform: translate(0, 0); opacity: 0.55; } }
  @keyframes g1Leave { to { transform: translate(120px, -30px); opacity: 0; } }
  @media (prefers-reduced-motion: reduce) {
    .kd-svg .g1-glow { animation: kdFade 0.8s ease-out both; }
    .kd-svg .g1-gone.is-move { animation: g1Jump 1.8s ease-in-out both; }
    .kd-svg .g1-leave { animation: g1Leave 1.8s ease-in both; }
  }
`;

export const G1_DEMOS = { 'g1-pair': pair, 'g1-shape': shape, 'g1-count': count, 'g1-stairs': stairs, 'g1-cmp': cmp, 'g1-add': add, 'g1-sub': sub, 'g1-zero': zero, 'g1-bond': bond };
registerDemos(G1_DEMOS, CSS, 'g1');
