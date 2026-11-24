/**
 * 🧊 Xếp hình lập phương (Toán 5 Bài 45, 46, 47, 52, 53): các hình lập phương nhỏ vẽ phối cảnh xiên như sách (mặt trước
 * vuông, chiều sâu chạy chéo lên bên phải, cạnh khuất nét đứt).
 *
 *   const t = createCubes(host, { steps })     // steps: số dòng phép tính sẽ hiện sau (chừa sẵn chỗ, hình không dời)
 *   t.set([{ dims: [a, b, c] } | { cells: [[i, j, k]…] }, …])   // i: dài (sang phải), j: cao (lên), k: rộng (ra sau)
 *     tuỳ chọn mỗi hình: color ('blue' | 'yellow' | 'green' | 'pink' | 'orange' | 'white'), label ('A'), minus ([[i, j, k]] bỏ bớt),
 *     hidden (chưa hiện, chờ t.reveal), box: [A, B, C] (hộp kính chứa), labels: { a, b, c } (ghi kích thước),
 *     solid: { a, b, c, n, mini } (khối liền kẻ lưới n ô mỗi đơn vị, vd. 1 dm³ = 10 × 10 × 10 ô; mini: ô nhỏ tô đỏ).
 *   t.reveal(o, { by: 'cube' | 'row' | 'layer', count })  các hình lập phương rơi vào chỗ (đếm count(n) khi chạm)
 *   t.lift(o, gap)        tách các lớp ra (gap = khoảng hở theo đơn vị) để thấy cả hình phía sau; t.lift(o, 0) xếp lại
 *   t.shift(o, pick, dx, dy) dời một phần hình (pick(i, j, k) → true) đi dx, dy đơn vị
 *   t.mark(o, pick, color) tô một phần hình; t.count(o) số hình lập phương của hình o
 *   t.tap(o) → Promise khi em bấm vào hình o; sự kiện t.on('tap', o)
 * Dựng trên tấm vẽ createGeo (tri.js): t.caption, t.lines, t.W, t.H, t.port.
 */

import { createGeo, txt, svgEl, INK, sfx } from './tri.js';
import { anim } from '../grade4Tools/canvas.js';
import { css } from '../grade4Tools/frame.js';

/** Hướng chiều sâu (phối cảnh xiên 45°, rút ngắn một nửa). */
const DX = 0.42, DY = 0.36;
export const CUBE_COLORS = {
  blue: ['#93C5FD', '#DBEAFE', '#60A5FA'],
  yellow: ['#FDE68A', '#FEF9C3', '#FBBF24'],
  green: ['#86EFAC', '#DCFCE7', '#4ADE80'],
  pink: ['#F9A8D4', '#FCE7F3', '#F472B6'],
  orange: ['#FDBA74', '#FFEDD5', '#FB923C'],
  white: ['#F1F5F9', '#FFFFFF', '#CBD5E1'],
  red: ['#FCA5A5', '#FEE2E2', '#F87171'],
};
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/** Toạ độ màn hình (đơn vị ô, y hướng xuống) của điểm (x dài, y cao, z sâu). */
const P = (x, y, z) => ({ x: x + z * DX, y: -y - z * DY });

/** Các ô của hình chữ nhật a × b × c (trừ minus). */
export function boxCells(a, b, c, minus = []) {
  const out = [], skip = new Set(minus.map(m => m.join(',')));
  for (let j = 0; j < c; j++) for (let k = 0; k < b; k++) for (let i = 0; i < a; i++) if (!skip.has(`${i},${j},${k}`)) out.push([i, j, k]);
  return out;
}

export function createCubes(host, { steps = 0, bg = '#fff' } = {}) {
  injectCubeStyles();
  const t = createGeo(host, { bg });
  const { W, H } = t;
  // vùng hình + vùng dòng tính (chừa sẵn)
  t.box = { x: 40, y: 30, w: W - 80, h: H - 60 };
  if (steps) {
    const side = H / W < 0.62;
    if (side) { t.box.w = W * 0.56 - 50; t.stepBox = { x: W * 0.58, y: 30, w: W * 0.4, h: H - 60 }; }
    else { const sh = Math.min(H * 0.4, steps * 66 + 20); t.box.h = H - 70 - sh; t.stepBox = { x: 40, y: H - sh - 10, w: W - 80, h: sh }; }
  }
  let objs = [];
  let S = 60; // cỡ một cạnh hình lập phương (đơn vị SVG)

  /** Khung (đơn vị ô) của một hình, chưa dời; nhãn chừa theo điểm ảnh (s: cỡ ô dự kiến). */
  function bounds(o, s) {
    const [a, b, c] = o.ext;
    const pts = [P(0, 0, 0), P(a, 0, 0), P(0, c, 0), P(a, c, 0), P(0, 0, b), P(a, 0, b), P(0, c, b), P(a, c, b)];
    const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
    const fs = Math.max(30, Math.min(52, s * 0.55)) * (t.port ? 1.4 : 1); // chữ nhãn phóng to theo màn (--u)
    const w = (str) => (str ? String(str).length * fs * 0.52 + fs * 0.5 : 0);
    return { x0: Math.min(...xs) - (o.labels?.c ? w(o.labels.c) : 8) / s, x1: Math.max(...xs) + (o.labels?.b ? w(o.labels.b) : 8) / s,
      y0: Math.min(...ys) - (o.lift || 0) * c - 10 / s, y1: Math.max(...ys) + ((o.labels?.a ? fs * 1.35 : 10) + (o.label ? fs * 1.3 : 0)) / s };
  }

  t.set = (list, { gap = 1.4, maxS = 120, liftRoom = 0 } = {}) => {
    objs = list.map((o) => {
      const cells = o.cells || (o.dims ? boxCells(...o.dims, o.minus) : []);
      const ext = o.solid ? [o.solid.a, o.solid.b, o.solid.c] : o.box ? [...o.box] : [0, 1, 2].map(d => Math.max(0, ...cells.map(q => q[d] + 1)));
      return { ...o, cells, ext, lift: liftRoom, el: null, off: { x: 0, y: 0 } };
    });
    let bs, guess = maxS;
    for (let it = 0; it < 3; it++) { // cỡ ô phụ thuộc chỗ chừa cho nhãn (tính theo điểm ảnh): lặp vài lần cho khớp
      bs = objs.map(o => bounds(o, guess));
      const w = bs.reduce((s, b) => s + b.x1 - b.x0, 0) + gap * (objs.length - 1), h = Math.max(...bs.map(b => b.y1 - b.y0));
      const w2 = Math.max(...bs.map(b => b.x1 - b.x0)), h2 = bs.reduce((s, b) => s + b.y1 - b.y0, 0) + gap * (objs.length - 1);
      guess = Math.min(maxS, Math.max(Math.min(t.box.w / w, t.box.h / h), Math.min(t.box.w / w2, t.box.h / h2)));
    }
    // xếp ngang hay chồng dọc: chọn cách cho hình to hơn
    const dims = (v) => [v ? Math.max(...bs.map(b => b.x1 - b.x0)) : bs.reduce((s, b) => s + b.x1 - b.x0, 0) + gap * (objs.length - 1),
      v ? bs.reduce((s, b) => s + b.y1 - b.y0, 0) + gap * (objs.length - 1) : Math.max(...bs.map(b => b.y1 - b.y0))];
    const sOf = ([w, h]) => Math.min(t.box.w / w, t.box.h / h);
    const vert = objs.length > 1 && sOf(dims(true)) > sOf(dims(false)) * 1.05;
    const [tw, th] = dims(vert);
    S = Math.min(t.box.w / tw, t.box.h / th, maxS);
    let cx = t.box.x + (t.box.w - tw * S) / 2, cy = t.box.y + (t.box.h - th * S) / 2;
    t.L.fig.innerHTML = '';
    objs.forEach((o, n) => {
      const b = bs[n];
      const g = svgEl('g', { class: 'g5c-obj', 'data-o': n });
      t.L.fig.append(g);
      o.el = g;
      // gốc (0,0,0) của hình: thẳng hàng đáy (ngang) / giữa (dọc)
      if (vert) {
        o.ox = t.box.x + (t.box.w - (b.x1 - b.x0) * S) / 2 - b.x0 * S;
        o.oy = cy - b.y0 * S;
        cy += (b.y1 - b.y0 + gap) * S;
      } else {
        o.ox = cx - b.x0 * S;
        o.oy = cy + th * S - b.y1 * S; // mọi hình cùng đường đáy
        cx += (b.x1 - b.x0 + gap) * S;
      }
      draw(o, n);
    });
    t.S = S;
    return t;
  };

  const X = (o, p) => ({ x: o.ox + p.x * S, y: o.oy + p.y * S });
  const poly = (o, arr, fill, extra = '') => `<polygon points="${arr.map(q => { const v = X(o, P(...q)); return `${v.x.toFixed(1)},${v.y.toFixed(1)}`; }).join(' ')}" fill="${fill}" ${extra}/>`;
  const line = (o, p, q, extra = '') => { const a = X(o, P(...p)), b = X(o, P(...q)); return `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" ${extra}/>`; };

  /** Ba mặt thấy được của hình lập phương nhỏ (i, j, k), cạnh d. */
  function cubeSvg(o, i, j, k, col, d = 1) {
    const [f, tp, sd] = CUBE_COLORS[col] || CUBE_COLORS.blue;
    const sw = `stroke="${INK}" stroke-width="${Math.max(1.2, Math.min(3, S * 0.045))}" stroke-linejoin="round"`;
    return poly(o, [[i, j, k], [i + d, j, k], [i + d, j + d, k], [i, j + d, k]], f, sw)
      + poly(o, [[i, j + d, k], [i + d, j + d, k], [i + d, j + d, k + d], [i, j + d, k + d]], tp, sw)
      + poly(o, [[i + d, j, k], [i + d, j, k + d], [i + d, j + d, k + d], [i + d, j + d, k]], sd, sw);
  }

  function draw(o, n) {
    let g = '';
    const [a, b, c] = o.ext;
    if (o.hidden && !o.box) { // khung mờ nét đứt chỗ sẽ xếp (bấm vào được)
      const gh = `fill="#F1F5F9" fill-opacity="0.8" stroke="#94A3B8" stroke-width="2.5" stroke-dasharray="10 8" stroke-linejoin="round"`;
      g += `<g class="g5c-ghost">${poly(o, [[0, 0, 0], [a, 0, 0], [a, c, 0], [0, c, 0]], '#F1F5F9', gh)}${poly(o, [[0, c, 0], [a, c, 0], [a, c, b], [0, c, b]], '#F8FAFC', gh)}${poly(o, [[a, 0, 0], [a, 0, b], [a, c, b], [a, c, 0]], '#E2E8F0', gh)}</g>`;
    }
    if (o.box) { // mặt sau, đáy hộp kính (vẽ trước, nhạt) + cạnh khuất nét đứt
      g += `<g class="g5c-glass">${poly(o, [[0, 0, b], [a, 0, b], [a, c, b], [0, c, b]], '#E0F2FE', 'fill-opacity="0.55"')}${poly(o, [[0, 0, 0], [a, 0, 0], [a, 0, b], [0, 0, b]], '#BAE6FD', 'fill-opacity="0.55"')}
        ${line(o, [0, 0, b], [a, 0, b], `stroke="${INK}" stroke-width="2.5" stroke-dasharray="10 8"`)}${line(o, [0, 0, b], [0, c, b], `stroke="${INK}" stroke-width="2.5" stroke-dasharray="10 8"`)}${line(o, [0, 0, 0], [0, 0, b], `stroke="${INK}" stroke-width="2.5" stroke-dasharray="10 8"`)}</g>`;
    }
    if (o.stone) { // tảng đá chìm dưới đáy hộp (vẽ trước nước)
      const p = X(o, P(a / 2, 0, b / 2)), r = o.stone * S;
      g += `<path d="M${p.x - r} ${p.y} Q${p.x - r * 0.9} ${p.y - r * 0.95} ${p.x - r * 0.1} ${p.y - r} Q${p.x + r * 0.8} ${p.y - r * 1.05} ${p.x + r} ${p.y - r * 0.2} Q${p.x + r * 1.05} ${p.y + r * 0.1} ${p.x} ${p.y + r * 0.12} Z" fill="#A8A29E" stroke="${INK}" stroke-width="3"/>`;
    }
    if (o.water) { // nước trong hộp, cao o.water
      const w = o.water, wf = 'stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.5"';
      g += `<g class="g5c-water">${poly(o, [[0, 0, 0], [a, 0, 0], [a, w, 0], [0, w, 0]], '#60A5FA', `fill-opacity="0.35" ${wf}`)}${poly(o, [[0, w, 0], [a, w, 0], [a, w, b], [0, w, b]], '#93C5FD', `fill-opacity="0.6" ${wf}`)}${poly(o, [[a, 0, 0], [a, 0, b], [a, w, b], [a, w, 0]], '#3B82F6', `fill-opacity="0.3" ${wf}`)}</g>`;
    }
    if (o.solid) {
      const { n: gN = 10, mini } = o.solid;
      const col = CUBE_COLORS[o.color || 'yellow'];
      g += poly(o, [[0, 0, 0], [a, 0, 0], [a, c, 0], [0, c, 0]], col[0], `stroke="${INK}" stroke-width="3.5"`)
        + poly(o, [[0, c, 0], [a, c, 0], [a, c, b], [0, c, b]], col[1], `stroke="${INK}" stroke-width="3.5"`)
        + poly(o, [[a, 0, 0], [a, 0, b], [a, c, b], [a, c, 0]], col[2], `stroke="${INK}" stroke-width="3.5"`);
      const st = `stroke="${INK}" stroke-opacity="0.45" stroke-width="1.3"`;
      for (let q = 1; q < gN; q++) {
        const x = (a * q) / gN, y = (c * q) / gN, z = (b * q) / gN;
        g += line(o, [x, 0, 0], [x, c, 0], st) + line(o, [0, y, 0], [a, y, 0], st) // mặt trước
          + line(o, [x, c, 0], [x, c, b], st) + line(o, [0, c, z], [a, c, z], st) // mặt trên
          + line(o, [a, 0, z], [a, c, z], st) + line(o, [a, y, 0], [a, y, b], st); // mặt bên
      }
      if (mini) g += `<g class="g5c-mini">${cubeSvg(o, 0, c - a / gN, 0, 'red', a / gN)}</g>`;
    }
    // các hình lập phương nhỏ: sau ra trước, dưới lên trên, trái sang phải
    const cells = [...o.cells].sort((p, q) => (q[2] - p[2]) || (p[1] - q[1]) || (p[0] - q[0]));
    for (const [i, j, k] of cells) {
      const col = typeof o.color === 'function' ? o.color(i, j, k) : (o.color || 'blue');
      g += `<g class="g5c-cu${o.hidden ? ' g5c-hid' : ''}" data-k="${i},${j},${k}">${cubeSvg(o, i, j, k, col)}</g>`;
    }
    if (o.box) { // cạnh trước của hộp kính (vẽ sau các hình lập phương)
      const e = `stroke="${INK}" stroke-width="3.5" stroke-linecap="round"`;
      g += `<g class="g5c-glassf">${line(o, [0, 0, 0], [a, 0, 0], e)}${line(o, [a, 0, 0], [a, c, 0], e)}${line(o, [0, 0, 0], [0, c, 0], e)}${line(o, [0, c, 0], [a, c, 0], e)}
        ${line(o, [0, c, 0], [0, c, b], e)}${line(o, [a, c, 0], [a, c, b], e)}${line(o, [0, c, b], [a, c, b], e)}${line(o, [a, 0, 0], [a, 0, b], e)}${line(o, [a, 0, b], [a, c, b], e)}</g>`;
    }
    const fs = Math.max(30, Math.min(52, S * 0.55));
    if (o.labels) {
      const L = o.labels;
      if (L.a) { const p = X(o, P(a / 2, 0, 0)); g += txt(p.x, p.y + fs * 1.05, L.a, { size: fs, color: '#1D4ED8' }); }
      if (L.c) { const p = X(o, P(0, c / 2, 0)); g += txt(p.x - fs * 0.3, p.y + fs * 0.35, L.c, { size: fs, color: '#B91C1C', anchor: 'end' }); }
      if (L.b) { const p = X(o, P(a, 0, b / 2)); g += txt(p.x + fs * 0.35, p.y + fs * 0.75, L.b, { size: fs, color: '#15803D', anchor: 'start' }); }
    }
    if (o.label) {
      const p = X(o, P(a / 2 + (b * DX) / 2, 0, 0));
      g += txt(p.x, p.y + fs * (o.labels?.a ? 2.35 : 1.15), o.label, { size: fs * 1.05, color: INK });
    }
    o.el.innerHTML = g;
    o.el.onclick = () => { sfx.tap(); t.emit('tap', n); };
  }

  const cubeEls = (n) => [...objs[n].el.querySelectorAll('.g5c-cu')];
  const keyOf = (e) => e.dataset.k.split(',').map(Number);
  t.count = (n) => objs[n].cells.length;
  t.obj = (n) => objs[n];
  t.cubeEls = cubeEls;

  /** Hiện các hình lập phương: rơi xuống từng hình / từng hàng / từng lớp (theo thứ tự xếp: lớp dưới trước). */
  t.reveal = async (n, { by = 'cube', count = null, ms = null } = {}) => {
    const els = cubeEls(n).filter(e => e.classList.contains('g5c-hid'));
    const grp = (e) => { const [i, j, k] = keyOf(e); return by === 'layer' ? j : by === 'row' ? j * 100 + (99 - k) : j * 10000 + (99 - k) * 100 + i; };
    const keys = [...new Set(els.map(grp))].sort((p, q) => p - q);
    const step = ms ?? Math.max(by === 'cube' ? 70 : 260, Math.min(by === 'cube' ? 240 : 700, 3200 / keys.length));
    let done = 0;
    for (const key of keys) {
      const batch = els.filter(e => grp(e) === key);
      batch.forEach((e) => {
        e.classList.remove('g5c-hid');
        e.animate([{ transform: `translateY(${-S * 2.2}px)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: anim(380), easing: 'cubic-bezier(.3,1.25,.5,1)' });
      });
      setTimeout(() => { done += batch.length; sfx.pop(done % 8); count?.(done); }, anim(300));
      await sleep(anim(step));
    }
    await sleep(anim(360));
  };
  /** Hiện ngay (không bay). */
  t.showAll = (n) => cubeEls(n).forEach(e => e.classList.remove('g5c-hid'));

  /** Dời phần tử tới transform mới có chuyển động (giữ lại sau khi xong). */
  function move(e, to, ms) {
    const from = e.style.transform || 'translate(0px, 0px)';
    e.style.transform = to;
    return e.animate([{ transform: from }, { transform: to }], { duration: anim(ms), easing: 'ease-in-out' }).finished.catch(() => {});
  }
  /** Tách các lớp (lớp j lên cao thêm j × gap đơn vị). */
  t.lift = async (n, gap = 0.6) => {
    sfx.swish();
    await Promise.all(cubeEls(n).map((e) => { const [, j] = keyOf(e); return move(e, `translate(0px, ${(-j * gap * S).toFixed(1)}px)`, 700); }));
  };
  /** Dời các hình lập phương chọn bởi pick(i, j, k) đi dx, dy (đơn vị ô màn hình, y lên). */
  t.shift = async (n, pick, dx, dy = 0) => {
    sfx.swish();
    await Promise.all(cubeEls(n).filter(e => pick(...keyOf(e))).map(e => move(e, `translate(${(dx * S).toFixed(1)}px, ${(-dy * S).toFixed(1)}px)`, 800)));
  };
  /** Tô màu các hình lập phương chọn bởi pick (chỉ đổi màu mặt). */
  t.mark = (n, pick, col = 'yellow') => {
    const C = CUBE_COLORS[col];
    cubeEls(n).filter(e => pick(...keyOf(e))).forEach((e, q) => {
      [...e.querySelectorAll('polygon')].forEach((p, f) => p.setAttribute('fill', C[f]));
      e.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: anim(300), delay: anim(q * 30), fill: 'backwards' });
    });
  };
  /** Ẩn các hình lập phương chọn bởi pick (bay lên rồi biến mất). */
  t.remove = async (n, pick) => {
    const els = cubeEls(n).filter(e => pick(...keyOf(e)));
    sfx.swish();
    await Promise.all(els.map((e, q) => e.animate([{ transform: e.style.transform || 'none', opacity: 1 }, { transform: `translate(${S * 1.5}px, ${-S * 2}px)`, opacity: 0 }], { duration: anim(600), delay: anim(q * 50), fill: 'forwards' }).finished.catch(() => {})));
    els.forEach(e => e.classList.add('g5c-gone'));
  };
  /** Chờ em bấm vào hình n (hình nhấp nháy). */
  t.tap = (n) => new Promise((res) => {
    const el = objs[n].el;
    el.classList.add('g5c-tapme');
    const off = t.on((ev, o) => { if (ev === 'tap' && o === n) { off(); el.classList.remove('g5c-tapme'); res(); } });
  });
  /** Điểm màn hình (đơn vị SVG) của điểm (x, y, z) trên hình n (để vẽ thêm: mũi tên, nhãn). */
  t.at = (n, x, y, z) => X(objs[n], P(x, y, z));
  t.size = () => S;
  return t;
}

let styled = false;
function injectCubeStyles() {
  if (styled) return;
  styled = true;
  css('g5-cubes', `
    .g5c-cu.g5c-hid, .g5c-cu.g5c-gone { opacity: 0; }
    .g5c-obj { cursor: default; }
    .g5c-tapme { cursor: pointer; animation: g5cTap 1.2s ease-in-out infinite; }
    @keyframes g5cTap { 50% { filter: drop-shadow(0 0 10px #FACC15) drop-shadow(0 0 4px #FDE047); } }
  `);
}
