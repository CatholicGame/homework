/**
 * 🍫 Băng phân số (Toán 5, Bài 3, 5, 6, 7): một tấm vẽ SVG (dựng trên grade4Tools/canvas.js) chứa các "hình":
 *   - 'bar'  băng ngang chia n phần bằng nhau, tô k phần (màu 1) và k2 phần tiếp theo (màu 2);
 *   - 'jug'  bình nước có n vạch, nước dâng tới k (+ k2) vạch (Bài 6: Việt, Mai đổ nước);
 *   - 'pie'  bánh tròn chia n miếng, còn k miếng (Bài 7: bánh trung thu);
 *   - 'area' hình chữ nhật mô hình diện tích cho phép nhân (cols cột tô a, rows hàng tô c, phần chung).
 * Thao tác có chuyển động: split (chia mỗi phần thành m phần, phần tô giữ nguyên: 1/5 → 2/10), merge (gộp g phần:
 * rút gọn), shade (tô dần), fill (nước dâng / rút), pour (rót bình này sang bình kia), fly (bay một phần).
 * Khung nhìn SVG cao theo đúng tỉ lệ chỗ trống (t.H), để hình to kín tờ giấy cả màn ngang lẫn dọc.
 */

import { createCanvas, anim } from '../grade4Tools/canvas.js';
import { css, INK, sfx } from '../grade4Tools/frame.js';

export const COL = {
  A: '#FB923C', A2: '#FDBA74', B: '#38BDF8', G: '#4ADE80', P: '#F472B6', Y: '#FDE047', V: '#A78BFA',
  WATER: '#60A5FA', WATER2: '#22D3EE', CAKE: '#F6B44B', CAKE2: '#E8963A',
};

const ease = (k) => (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2);
/** Chạy fn(e) với e từ 0 → 1 trong ms (bản êm khi máy tắt hiệu ứng: ngắn hơn một chút). */
export const tween = (ms, fn) => new Promise((res) => {
  const d = anim(ms), t0 = performance.now();
  const step = (now) => {
    const k = Math.min(1, (now - t0) / d);
    fn(ease(k));
    if (k < 1) requestAnimationFrame(step); else res();
  };
  requestAnimationFrame(step);
});

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** Phân số viết chồng trong SVG, tâm vạch ngang tại (x, y), cỡ chữ s. */
export function svgFrac(x, y, a, b, s = 60, fill = INK) {
  const len = Math.max(String(a).length, String(b).length);
  const hw = (len * s * 0.56 + s * 0.3) / 2;
  return `<g class="g5f-fr"><text x="${x}" y="${y - s * 0.14}" class="g4v-t" font-size="${s}" style="fill:${fill}">${esc(a)}</text>
    <line x1="${x - hw}" y1="${y}" x2="${x + hw}" y2="${y}" stroke="${fill}" stroke-width="${Math.max(3, s * 0.07)}" stroke-linecap="round"/>
    <text x="${x}" y="${y + s * 0.84}" class="g4v-t" font-size="${s}" style="fill:${fill}">${esc(b)}</text></g>`;
}
/** Hỗn số trong SVG: phần nguyên (màu wc) bên trái, phần phân số (màu fc) bên phải; tâm tại x. */
export function svgMixed(x, y, w, a, b, s = 60, wc = INK, fc = INK) {
  const ww = String(w).length * s * 0.8;
  const fw = Math.max(String(a).length, String(b).length) * s * 0.56 + s * 0.3;
  const x0 = x - (ww + fw) / 2;
  return `<g class="g5f-fr"><text x="${x0 + ww / 2}" y="${y + s * 0.42}" class="g4v-t" font-size="${s * 1.45}" style="fill:${wc}">${w}</text>${svgFrac(x0 + ww + fw / 2, y, a, b, s, fc)}</g>`;
}
/** Chữ thường trong SVG. */
export const svgText = (x, y, s, html, { fill = INK, anchor = 'middle', cls = '' } = {}) =>
  `<text x="${x}" y="${y}" class="g4v-t ${cls}" font-size="${s}" style="fill:${fill};text-anchor:${anchor}">${html}</text>`;

let uid = 0;

/**
 * Tạo bảng phân số trong host. opts.reserve: phần đáy (tỉ lệ chiều cao host) để trống cho nút chọn / nút công cụ
 * đè lên (Khám phá); opts.cap = false: bỏ dòng chữ trên (Thực hành đã có đề).
 * Trả về t (canvas) thêm: W, H, bot (đáy vùng vẽ), tall, fig/set/get/clear/split/merge/shade/fill/pour/fly/btns/tappable.
 */
export function createFrac(host, { reserve = 0, cap = true } = {}) {
  injectFracStyles();
  const t = createCanvas(host, { w: 1000, h: 560 });
  const wrap = host.querySelector('.g4v');
  wrap.classList.add('g5f');
  if (!cap) wrap.classList.add('g5f-nocap');
  const svg = t.svg;
  const r = svg.getBoundingClientRect();
  const H = r.width > 10 && r.height > 10 ? Math.round(Math.min(2000, Math.max(380, (1000 * r.height) / r.width))) : 560;
  t.W = 1000; t.H = H; t.h = H;
  t.frame(0, 0, 1000, H);
  t.tall = H > 780;
  const pxPerU = r.width > 10 ? r.width / 1000 : 1;
  // màn dọc: nút chọn thấp hơn (cỡ chữ theo bề ngang) nên chừa ít hơn
  const res = host.clientHeight > host.clientWidth ? reserve * 0.72 : reserve;
  t.bot = reserve ? Math.round(H - (host.clientHeight * res) / pxPerU) : H;
  // dòng chữ trên cao cố định (không đẩy hình): câu dài xuống 2 dòng (màn dọc) thì chữ thu nhỏ cho vừa, không bị cắt
  const cap0 = host.querySelector('.g4v-cap');
  t.caption = (html) => {
    cap0.innerHTML = `<span class="g5f-capin">${html || '&nbsp;'}</span>`;
    const inner = cap0.firstElementChild;
    for (let s = 1; s > 0.5 && inner.offsetHeight > cap0.clientHeight + 1; s -= 0.06) inner.style.fontSize = `${s - 0.06}em`;
  };
  svg.innerHTML = '<g class="g5f-bg"></g><g class="g5f-figs"></g><g class="g5f-top"></g>';
  const bgL = svg.querySelector('.g5f-bg'), figL = svg.querySelector('.g5f-figs'), topL = svg.querySelector('.g5f-top');
  t.draw = (html) => { bgL.innerHTML = html; };
  t.add = (html) => { topL.insertAdjacentHTML('beforeend', html); return topL.lastElementChild; };
  t.addBg = (html) => { bgL.insertAdjacentHTML('beforeend', html); return bgL.lastElementChild; };

  const figs = new Map();
  t.get = (id) => figs.get(id);
  /** Thêm / thay một hình. spec: { kind, x, y, w, h, n, k, k2, color, color2, lab, name, … }. */
  t.fig = (id, spec) => {
    const f = { id, kind: 'bar', n: 1, k: 0, k2: 0, color: COL.A, color2: COL.B, lab: false, name: '', ...spec, uid: ++uid };
    let g = figL.querySelector(`[data-fig="${id}"]`);
    if (!g) { figL.insertAdjacentHTML('beforeend', `<g data-fig="${id}"></g>`); g = figL.lastElementChild; }
    f.g = g;
    figs.set(id, f);
    render(f);
    return f;
  };
  t.set = (id, patch) => { const f = figs.get(id); Object.assign(f, patch); render(f); return f; };
  t.del = (id) => { figs.get(id)?.g.remove(); figs.delete(id); };
  t.clear = () => { figs.clear(); figL.innerHTML = ''; bgL.innerHTML = ''; topL.innerHTML = ''; t.btns([]); t.caption(''); };
  t.figEl = (id) => figs.get(id)?.g;

  /** Chia mỗi phần thành m phần (phần tô giữ nguyên). Vạch mới mọc ra. */
  t.split = async (id, m) => {
    const f = figs.get(id);
    if (!f || m <= 1) return;
    const old = f.n;
    Object.assign(f, { n: f.n * m, k: f.k * m, k2: f.k2 * m });
    render(f, { fresh: (i) => i % m !== 0 });
    sfx.swish();
    await t.anim([...f.g.querySelectorAll('.g5f-new')], [{ opacity: 0, transform: 'scale(1, 0)' }, { opacity: 1, transform: 'none' }], 650, { stagger: Math.max(4, 220 / (f.n - old)) });
  };
  /** Gộp mỗi g phần thành 1 (rút gọn). Vạch thừa mờ dần rồi biến mất. */
  t.merge = async (id, g) => {
    const f = figs.get(id);
    if (!f || g <= 1) return;
    const gone = [...f.g.querySelectorAll('[data-div]')].filter(e => +e.dataset.div % g !== 0);
    sfx.swish();
    await t.anim(gone, [{ opacity: 1 }, { opacity: 1, stroke: '#EF4444' }, { opacity: 0, transform: 'scale(1, 0.2)' }], 800);
    Object.assign(f, { n: f.n / g, k: f.k / g, k2: f.k2 / g });
    render(f);
  };
  /** Tô tới k phần (và k2 phần màu 2): các phần mới tô hiện dần. */
  t.shade = async (id, k, k2) => {
    const f = figs.get(id);
    const was = f.k + f.k2;
    f.k = k;
    if (k2 !== undefined) f.k2 = k2;
    render(f);
    const fresh = [...f.g.querySelectorAll('[data-part]')].filter(e => +e.dataset.part >= was && +e.dataset.part < f.k + f.k2);
    for (let i = 0; i < fresh.length; i++) {
      fresh[i].animate([{ opacity: 0.1 }, { opacity: 1 }], { duration: anim(260), fill: 'both' });
      sfx.pop(i % 10);
      await new Promise(res => setTimeout(res, anim(Math.max(40, 420 / fresh.length + 30))));
    }
  };
  /** Nước dâng / rút tới mức k (+k2) vạch (bình), có chuyển động. */
  t.fill = (id, k, k2 = 0, ms = 900) => {
    const f = figs.get(id);
    const a0 = f.lvA ?? f.k, b0 = f.lvB ?? f.k2;
    return tween(ms, (e) => { f.lvA = a0 + (k - a0) * e; f.lvB = b0 + (k2 - b0) * e; render(f); }).then(() => { f.k = k; f.k2 = k2; f.lvA = f.lvB = null; render(f); });
  };
  /**
   * Rót từ bình `from` sang bình `to`: dòng nước chảy, bình kia dâng thêm. color của nước rót sang (giữ màu bình cũ).
   * toK: mức mới của bình nhận (theo vạch của bình nhận), slot: 'k' | 'k2' (tầng màu nào).
   */
  t.pour = async (from, to, { toK, slot = 'k', ms = 1300 } = {}) => {
    const a = figs.get(from), b = figs.get(to);
    const sx = a.x + a.w * 0.08, sy = a.y + a.h * 0.02;
    const tx = b.x + b.w * 0.5, ty = b.y + b.h * 0.05;
    const col = a.color;
    const stream = t.add(`<path d="M${sx} ${sy} Q ${(sx + tx) / 2} ${Math.min(sy, ty) - 120} ${tx} ${ty} L ${tx} ${b.y + b.h}" fill="none" stroke="${col}" stroke-width="16" stroke-linecap="round" opacity="0.85" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/>`);
    sfx.swish();
    await tween(350, (e) => stream.setAttribute('stroke-dashoffset', String(100 - 100 * e)));
    const a0 = a.k, b0 = b[slot];
    await tween(ms, (e) => {
      a.lvA = a0 * (1 - e); render(a);
      if (slot === 'k') b.lvA = b0 + (toK - b0) * e; else { b.lvA = b.k; b.lvB = b0 + (toK - b0) * e; }
      render(b);
    });
    a.k = 0; a.lvA = null; render(a);
    b[slot] = toK; b.lvA = b.lvB = null; render(b);
    await tween(250, (e) => stream.setAttribute('opacity', String(0.85 * (1 - e))));
    stream.remove();
  };
  /** Bay một phần tử SVG (bản sao) từ chỗ cũ tới (dx, dy); trả về bản sao (giữ lại ở chỗ mới). */
  t.fly = async (el, dx, dy, ms = 700) => {
    const c = el.cloneNode(true);
    topL.append(c);
    sfx.swish();
    await c.animate([{ transform: 'translate(0,0)' }, { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 60}px)`, offset: 0.5 }, { transform: `translate(${dx}px, ${dy}px)` }],
      { duration: anim(ms), easing: 'ease-in-out', fill: 'both' }).finished;
    return c;
  };
  /** Nhấp nháy một hình (để chỉ). */
  t.pulse = (id) => {
    const g = typeof id === 'string' ? figs.get(id)?.g : id;
    if (g) { g.style.transformBox = 'fill-box'; g.style.transformOrigin = 'center'; }
    return g?.animate([{ transform: 'none' }, { transform: 'scale(1.04)' }, { transform: 'none' }], { duration: anim(700), easing: 'ease-in-out' }).finished;
  };

  // ── Bấm vào phần để tô (tô liền từ phần đầu tới phần vừa bấm) ──
  const taps = new Set();
  t.tappable = (id, on = true) => { if (on) taps.add(id); else taps.delete(id); const f = figs.get(id); if (f) { f.tap = on; render(f); } };
  svg.addEventListener('click', (e) => {
    const p = e.target.closest('[data-part]');
    const g = p?.closest('[data-fig]');
    if (!p || !g || !taps.has(g.dataset.fig)) return;
    const f = figs.get(g.dataset.fig);
    const i = +p.dataset.part;
    f.k = f.k === i + 1 ? i : i + 1;
    render(f);
    sfx.pop(f.k % 10);
    t.emit('shade', f);
  });

  // ── Nút công cụ (HTML) đè lên đáy tờ giấy ──
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  const bar = document.createElement('div');
  bar.className = 'g5f-btns';
  host.append(bar);
  /** Hiện các nút công cụ: list [{ html, cls }] → mảng nút. [] để xoá. */
  t.btns = (list) => {
    bar.innerHTML = list.map((b, i) => `<button type="button" class="g5f-btn ${b.cls || ''}" data-i="${i}">${b.html}</button>`).join('');
    return [...bar.children];
  };

  // ── Vẽ từng loại hình ──
  function render(f, { fresh } = {}) {
    const fn = { bar: drawBar, jug: drawJug, pie: drawPie, area: drawArea }[f.kind];
    f.g.innerHTML = fn(f, fresh || (() => false));
    f.g.style.cursor = f.tap ? 'pointer' : '';
  }
  return t;
}

const NS = 'vector-effect="non-scaling-stroke"';
const divW = (n) => (n > 24 ? 2 : n > 12 ? 3 : 4);

function fracLabel(f, x, y, s) {
  if (!f.lab) return '';
  if (f.lab === 'mixed' && f.whole != null) return svgMixed(x, y, f.whole, f.k, f.n, s);
  const top = f.labTop ?? f.k + f.k2;
  return svgFrac(x, y, top, f.n, s, f.labColor || INK);
}

function drawBar(f, fresh) {
  const { x, y, w, h, n, k, k2 } = f;
  const pw = w / n;
  let s = '';
  for (let i = 0; i < n; i++) {
    const fill = i < k ? f.color : i < k + k2 ? f.color2 : '#fff';
    s += `<rect data-part="${i}" x="${x + i * pw}" y="${y}" width="${pw}" height="${h}" fill="${fill}"/>`;
    if (f.count && i < k + k2 && pw > 26) s += `<text x="${x + (i + 0.5) * pw}" y="${y + h / 2 + Math.min(pw, h) * 0.16}" class="g4v-t" font-size="${Math.min(pw * 0.55, h * 0.45)}" style="fill:#fff" pointer-events="none">${i + 1}</text>`;
  }
  const sw = divW(n);
  for (let i = 1; i < n; i++) {
    s += `<line data-div="${i}" class="${fresh(i) ? 'g5f-new' : ''}" x1="${x + i * pw}" y1="${y}" x2="${x + i * pw}" y2="${y + h}" stroke="${INK}" stroke-width="${sw}" style="transform-box:fill-box;transform-origin:center" pointer-events="none"/>`;
  }
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="none" stroke="${INK}" stroke-width="5" pointer-events="none"/>`;
  if (f.name) s += svgText(x - 18, y + h / 2 + (f.nameSize || Math.min(48, h * 0.4)) * 0.35, f.nameSize || Math.min(48, h * 0.4), f.name, { anchor: 'end', fill: f.nameColor || INK });
  if (f.lab) {
    const ls = f.labSize || Math.min(64, h * 0.46);
    s += fracLabel(f, x + w + 30 + ls * 0.7, y + h / 2, ls);
  }
  return s;
}

function drawJug(f, fresh) {
  const { x, y, w, h, n } = f;
  const a = f.lvA ?? f.k, b = f.lvB ?? f.k2;
  const cid = `g5fj${f.uid}`;
  const unit = h / n;
  let s = `<defs><clipPath id="${cid}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22"/></clipPath></defs>`;
  // quai bình
  if (f.handle !== false) s += `<path d="M${x + w} ${y + h * 0.16} q ${w * 0.34} 0 ${w * 0.34} ${h * 0.2} v ${h * 0.22} q 0 ${h * 0.2} ${-w * 0.34} ${h * 0.2}" fill="none" stroke="${INK}" stroke-width="22" stroke-linecap="round"/>
    <path d="M${x + w} ${y + h * 0.16} q ${w * 0.34} 0 ${w * 0.34} ${h * 0.2} v ${h * 0.22} q 0 ${h * 0.2} ${-w * 0.34} ${h * 0.2}" fill="none" stroke="#E2E8F0" stroke-width="10" stroke-linecap="round"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="#F1F5F9"/>`;
  s += `<g clip-path="url(#${cid})">
    <rect x="${x}" y="${y + h - a * unit}" width="${w}" height="${a * unit + 2}" fill="${f.color}"/>
    <rect x="${x}" y="${y + h - (a + b) * unit}" width="${w}" height="${b * unit + 0.5}" fill="${f.color2}"/>
    ${a + b > 0.01 ? `<rect x="${x}" y="${y + h - (a + b) * unit}" width="${w}" height="${Math.min(10, (a + b) * unit)}" fill="#fff" opacity="0.35"/>` : ''}</g>`;
  const sw = divW(n);
  for (let i = 1; i < n; i++) {
    const yy = y + h - i * unit;
    s += `<g data-div="${i}" class="${fresh(i) ? 'g5f-new' : ''}" style="transform-box:fill-box;transform-origin:left center">
      <line x1="${x}" y1="${yy}" x2="${x + w}" y2="${yy}" stroke="${INK}" stroke-width="${Math.max(1.5, sw - 2)}" stroke-dasharray="10 8" opacity="0.45"/>
      <line x1="${x}" y1="${yy}" x2="${x + w * 0.3}" y2="${yy}" stroke="${INK}" stroke-width="${sw + 1}"/></g>`;
  }
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="none" stroke="${INK}" stroke-width="6"/>
    ${f.handle !== false ? `<path d="M${x - 4} ${y + 6} l -${w * 0.12} -${w * 0.1}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>` : ''}`;
  if (f.name) s += svgText(x + w / 2, y + h + (f.nameSize || 44) * 1.05, f.nameSize || 44, f.name, { fill: f.nameColor || INK });
  if (f.lab) {
    const ls = f.labSize || 54;
    s += `<rect x="${x + w / 2 - ls * 0.85}" y="${y - ls * 2.25}" width="${ls * 1.7}" height="${ls * 1.95}" rx="12" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
    s += fracLabel(f, x + w / 2, y - ls * 1.22, ls);
  }
  return s;
}

function sector(cx, cy, r, a0, a1) {
  const p = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const [x0, y0] = p(a0), [x1, y1] = p(a1);
  return `M${cx} ${cy} L${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1} ${y1} Z`;
}

function drawPie(f, fresh) {
  const { x, y, w, h, n, k } = f;
  const cx = x + w / 2, cy = y + h / 2, r = Math.min(w, h) / 2 - 4;
  const cake = f.cake !== false;
  let s = '';
  if (f.plate) s += `<ellipse cx="${cx}" cy="${cy + r * 0.12}" rx="${r * 1.28}" ry="${r * 1.18}" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="${cx}" cy="${cy + r * 0.12}" rx="${r * 1.08}" ry="${r * 0.98}" fill="none" stroke="#CBD5E1" stroke-width="3"/>`;
  const pa = (2 * Math.PI) / n;
  for (let i = 0; i < n; i++) {
    const on = i < k;
    if (!on && f.ghost === false) continue;
    const fill = on ? (cake ? COL.CAKE : f.color) : 'none';
    if (n === 1) s += `<circle data-part="0" cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${on ? INK : '#CBD5E1'}" stroke-width="${on ? 5 : 3}" ${on ? '' : 'stroke-dasharray="10 8"'}/>`;
    else s += `<path data-part="${i}" d="${sector(cx, cy, r, -Math.PI / 2 + i * pa, -Math.PI / 2 + (i + 1) * pa)}" fill="${fill}" stroke="${on ? INK : '#CBD5E1'}" stroke-width="${on ? 4 : 3}" stroke-linejoin="round" ${on ? '' : 'stroke-dasharray="10 8"'}/>`;
  }
  if (cake && k > 0) {
    // hoa văn bánh: vòng trong + bông hoa ở giữa (chỉ trên phần còn bánh)
    const cid = `g5fp${f.uid}`;
    let clip = '';
    for (let i = 0; i < Math.min(k, n); i++) clip += n === 1 ? `<circle cx="${cx}" cy="${cy}" r="${r}"/>` : `<path d="${sector(cx, cy, r, -Math.PI / 2 + i * pa, -Math.PI / 2 + (i + 1) * pa)}"/>`;
    s += `<defs><clipPath id="${cid}">${clip}</clipPath></defs><g clip-path="url(#${cid})" pointer-events="none">
      <circle cx="${cx}" cy="${cy}" r="${r * 0.74}" fill="${COL.CAKE2}" opacity="0.45"/>
      <circle cx="${cx}" cy="${cy}" r="${r * 0.74}" fill="none" stroke="#B45309" stroke-width="3" stroke-dasharray="6 7"/>
      ${[0, 1, 2, 3, 4, 5].map(j => `<ellipse cx="${cx + Math.cos(j * Math.PI / 3) * r * 0.3}" cy="${cy + Math.sin(j * Math.PI / 3) * r * 0.3}" rx="${r * 0.16}" ry="${r * 0.1}" transform="rotate(${j * 60} ${cx + Math.cos(j * Math.PI / 3) * r * 0.3} ${cy + Math.sin(j * Math.PI / 3) * r * 0.3})" fill="#D97706"/>`).join('')}
      <circle cx="${cx}" cy="${cy}" r="${r * 0.12}" fill="#B45309"/></g>`;
  }
  if (n > 1) {
    const sw = divW(n);
    for (let i = 0; i < n; i++) {
      if (f.ghost === false && i > k) continue;
      const a = -Math.PI / 2 + i * pa;
      s += `<line data-div="${i}" class="${fresh(i) ? 'g5f-new' : ''}" x1="${cx}" y1="${cy}" x2="${cx + r * Math.cos(a)}" y2="${cy + r * Math.sin(a)}" stroke="${INK}" stroke-width="${sw}" style="transform-box:fill-box;transform-origin:center" pointer-events="none"/>`;
    }
  }
  if (f.name) s += svgText(cx, y + h + (f.nameSize || 40) * 1.1 + (f.plate ? r * 0.3 : 0), f.nameSize || 40, f.name, { fill: f.nameColor || INK });
  if (f.lab) s += fracLabel(f, cx, y + h + (f.labSize || 50) * 0.9, f.labSize || 50);
  return s;
}

/** Mô hình diện tích: cols cột (tô a cột vàng), rows hàng (tô c hàng xanh, stage ≥ 2), phần chung xanh lá đánh số (stage 3). */
function drawArea(f) {
  const { x, y, w, h, cols, a, rows, c, stage = 1 } = f;
  const cw = w / cols, rh = h / rows;
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/>`;
  s += `<rect x="${x}" y="${y}" width="${a * cw}" height="${h}" fill="#FDE68A"/>`;
  if (stage >= 2) s += `<rect class="g5f-rows" x="${x}" y="${y}" width="${w}" height="${c * rh}" fill="#93C5FD" opacity="0.6"/>`;
  if (stage >= 3) {
    let n = 0;
    for (let j = 0; j < c; j++) for (let i = 0; i < a; i++) {
      n++;
      s += `<rect class="g5f-cell" x="${x + i * cw + 3}" y="${y + j * rh + 3}" width="${cw - 6}" height="${rh - 6}" rx="6" fill="#4ADE80"/>
        <text x="${x + (i + 0.5) * cw}" y="${y + (j + 0.5) * rh + Math.min(cw, rh) * 0.16}" class="g4v-t" font-size="${Math.min(cw, rh) * 0.45}" style="fill:#14532D">${n}</text>`;
    }
  }
  for (let i = 1; i < cols; i++) s += `<line x1="${x + i * cw}" y1="${y}" x2="${x + i * cw}" y2="${y + h}" stroke="${INK}" stroke-width="3"/>`;
  if (stage >= 2) for (let j = 1; j < rows; j++) s += `<line class="g5f-rowl" x1="${x}" y1="${y + j * rh}" x2="${x + w}" y2="${y + j * rh}" stroke="${INK}" stroke-width="3" stroke-dasharray="${stage >= 2 ? '0' : '8 6'}"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="6"/>`;
  const ls = f.labSize || 46;
  s += `<line x1="${x}" y1="${y - 14}" x2="${x + a * cw}" y2="${y - 14}" stroke="#D97706" stroke-width="6" stroke-linecap="round"/>`;
  s += svgFrac(x + (a * cw) / 2, y - 14 - ls * 1.05, a, cols, ls, '#B45309');
  if (stage >= 2) {
    s += `<line x1="${x - 14}" y1="${y}" x2="${x - 14}" y2="${y + c * rh}" stroke="#2563EB" stroke-width="6" stroke-linecap="round"/>`;
    s += svgFrac(x - 14 - ls * 0.9, y + (c * rh) / 2, c, rows, ls, '#1D4ED8');
  }
  return s;
}

let styled = false;
function injectFracStyles() {
  if (styled) return;
  styled = true;
  css('g5-frac', `
    .g5f .g4v-cap { height: 2.35em; min-height: 0; line-height: 1.1; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0 0.25em; overflow: hidden; }
    .g5f-nocap .g4v-cap { display: none; }
    .g5f .g4v-cap .g5-fr { font-size: 0.8em; }
    .g5f-capin { display: block; max-width: 100%; text-align: center; }
    .g5f-btns { position: absolute; z-index: 4; left: 2cqi; right: 2cqi; bottom: 2cqh; display: flex; gap: 1.4cqi; justify-content: center; pointer-events: none; }
    .g5f-btns:empty { display: none; }
    .g5f-btn { pointer-events: auto; flex: 0 1 auto; min-width: 30%; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: min(6.4cqh, 3.8cqi); line-height: 1.15; padding: 0.35em 0.9em;
      background: linear-gradient(180deg, #FDBA74, #FB923C); color: #fff; text-shadow: 0 2px 0 rgba(154,52,18,0.45); border: 3px solid ${INK}; border-radius: 0.8em;
      box-shadow: 0 6px 0 #C2410C; cursor: pointer; touch-action: manipulation; }
    .g5f-btn:active { transform: translateY(4px); box-shadow: 0 2px 0 #C2410C; }
    .g5f-btn:disabled { background: #CBD5E1; box-shadow: 0 6px 0 #94A3B8; text-shadow: none; cursor: default; }
    .g5f-btn .g5-fr { font-size: 0.75em; }
    @media (orientation: portrait) { .g5f .g4v-cap { height: 3.3em; } }
    @media (orientation: portrait) { .g5f-btn { font-size: min(5.4cqh, 6.6cqi); flex: 1 1 0; } }
  `);
}
