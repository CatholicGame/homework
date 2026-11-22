/**
 * 🍕 Đồ dùng phép tính phân số lớp 4 (Bài 60, 61, 63, 64, 65), dựng trên bảng phân số grade5Tools/frac.js:
 *   - enableCut(t, id, toId): bấm phần tô của băng để cắt bớt, phần cắt bay xuống băng "đã cắt" (phép trừ);
 *   - moveParts(t, from, to, offset): các phần tô của băng này bay sang băng kia (phép cộng, gộp lại);
 *   - createArea(t, box, { cols, rows }): hình vuông 1 m² chia cột / hàng, bấm cột, bấm hàng để tô (phép nhân, thử lại phép chia);
 *   - createShare(t, { N, b, kind }): rổ N đồ vật, chia đều vào b đĩa (bay), bấm đĩa để lấy (phân số của một số);
 *   - fracCard(t, …): thẻ phân số, đảo ngược (tử, mẫu đổi chỗ có chuyển động).
 * Mọi thao tác phát sự kiện qua t.emit, để Khám phá chờ bằng c.until(t, …).
 */

import { svgFrac, svgText, tween } from '../grade5Tools/frac.js';
import { css, INK, sfx } from './frame.js';
import { anim } from './canvas.js';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/** Toạ độ phần thứ i của băng (fig kind 'bar'). */
const partX = (f, i) => f.x + (f.w / f.n) * i;

/**
 * Các phần tô [from.k0, from.k0 + count) của băng `from` bay sang băng `to` (cùng số phần), vào chỗ bắt đầu từ `at`.
 * Xong thì băng `to` tô thêm (slot 'k' hoặc 'k2').
 */
export async function moveParts(t, from, to, { start = 0, count, at = 0, slot = 'k', ms = 700 } = {}) {
  const a = t.get(from), b = t.get(to);
  const n = count ?? a.k;
  const els = [...a.g.querySelectorAll('[data-part]')].filter(e => +e.dataset.part >= start && +e.dataset.part < start + n);
  const pwB = b.w / b.n;
  await Promise.all(els.map(async (e, j) => {
    await sleep(j * 70);
    const i = +e.dataset.part;
    const dx = partX(b, at + (i - start)) - partX(a, i), dy = b.y - a.y;
    const sx = pwB / (a.w / a.n), sy = b.h / a.h;
    const c = e.cloneNode(true);
    t.add('<g></g>').append(c);
    c.style.transformBox = 'fill-box';
    c.style.transformOrigin = '0 0';
    await c.animate([{ transform: 'none' }, { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 40}px) scale(${(1 + sx) / 2}, ${(1 + sy) / 2})`, offset: 0.5 }, { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` }],
      { duration: anim(ms), easing: 'ease-in-out', fill: 'both' }).finished;
    c.parentNode.remove();
  }));
  t.set(to, { [slot]: b[slot] + n });
  sfx.pop(3);
}

/**
 * Bấm vào phần tô của băng `id` để cắt: phần tô cuối cùng bay xuống băng `toId` (tô thêm một phần ở đó).
 * Phát 'cut' sau mỗi lần cắt; t.get(id).cut = số phần đã cắt. Trả về hàm tắt.
 */
export function enableCut(t, id, toId, { max = 99 } = {}) {
  const f = t.get(id);
  f.cut = f.cut || 0;
  t.set(id, { tap: true });
  let busy = false;
  const onClick = async (e) => {
    const p = e.target.closest(`[data-fig="${id}"] [data-part]`);
    if (!p || busy || f.k <= 0 || f.cut >= max) return;
    busy = true;
    const i = f.k - 1;
    const to = t.get(toId);
    t.set(id, { k: f.k - 1 });
    f.cut++;
    sfx.pop(f.cut);
    // phần vừa cắt (bản sao) bay xuống băng "đã cắt"
    const src = f.g.querySelector(`[data-part="${i}"]`);
    const c = src.cloneNode(true);
    c.setAttribute('fill', f.color);
    t.add('<g></g>').append(c);
    const dx = partX(to, to.k) - partX(f, i), dy = to.y - f.y;
    const sx = (to.w / to.n) / (f.w / f.n), sy = to.h / f.h;
    c.style.transformBox = 'fill-box';
    c.style.transformOrigin = '0 0';
    await c.animate([{ transform: 'none' }, { transform: `translate(${dx * 0.4}px, ${dy * 0.3 - 50}px) rotate(-8deg)`, offset: 0.45 }, { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` }],
      { duration: anim(650), easing: 'ease-in-out', fill: 'both' }).finished;
    c.parentNode.remove();
    t.set(toId, { k: to.k + 1 });
    busy = false;
    t.emit('cut', f);
  };
  t.svg.addEventListener('click', onClick);
  return () => { t.svg.removeEventListener('click', onClick); if (t.get(id)) t.set(id, { tap: false }); };
}

/**
 * Hình vuông 1 m² (hoặc hình chữ nhật) chia cols cột × rows hàng. st: { a (cột tô vàng), c (hàng tô xanh), cells (đánh số
 * ô chung), mode ('cols' | 'rows' | null: bấm để tô), unit (chữ cạnh, vd. '1 m') }. Phát 'area' khi em bấm.
 */
export function createArea(t, { x, y, w, h, cols, rows, ls = 46, unit = '1 m', rowLines = true }) {
  const st = { a: 0, c: 0, cells: false, mode: null, unit, rowLines, labA: true, labC: true };
  const g = t.add('<g class="g4fo-area"></g>');
  const cw = w / cols, rh = h / rows;
  function draw() {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/>`;
    if (st.a) s += `<rect x="${x}" y="${y}" width="${st.a * cw}" height="${h}" fill="#FDE68A"/>`;
    if (st.c) s += `<rect x="${x}" y="${y}" width="${w}" height="${st.c * rh}" fill="#93C5FD" opacity="0.6"/>`;
    if (st.cells) {
      let n = 0;
      for (let j = 0; j < st.c; j++) for (let i = 0; i < st.a; i++) {
        n++;
        s += `<rect class="g4fo-cell" x="${x + i * cw + 4}" y="${y + j * rh + 4}" width="${cw - 8}" height="${rh - 8}" rx="6" fill="#4ADE80"/>
          <text x="${x + (i + 0.5) * cw}" y="${y + (j + 0.5) * rh + Math.min(cw, rh) * 0.16}" class="g4v-t" font-size="${Math.min(cw, rh) * 0.44}" style="fill:#14532D">${n}</text>`;
      }
    }
    for (let i = 1; i < cols; i++) s += `<line x1="${x + i * cw}" y1="${y}" x2="${x + i * cw}" y2="${y + h}" stroke="${INK}" stroke-width="2.5"/>`;
    if (st.rowLines) for (let j = 1; j < rows; j++) s += `<line x1="${x}" y1="${y + j * rh}" x2="${x + w}" y2="${y + j * rh}" stroke="${INK}" stroke-width="2.5"/>`;
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="3.5"/>`;
    // nhãn: phân số chiều dài (trên), chiều rộng (trái); cạnh hình vuông 1 m (dưới, phải)
    if (st.a && st.labA) {
      s += `<line x1="${x}" y1="${y - 14}" x2="${x + st.a * cw}" y2="${y - 14}" stroke="#D97706" stroke-width="6" stroke-linecap="round"/>`;
      s += svgFrac(x + (st.a * cw) / 2, y - 14 - ls * 1.05, st.a, cols, ls, '#B45309');
    }
    if (st.c && st.labC) {
      s += `<line x1="${x - 14}" y1="${y}" x2="${x - 14}" y2="${y + st.c * rh}" stroke="#2563EB" stroke-width="6" stroke-linecap="round"/>`;
      s += svgFrac(x - 14 - ls * 0.9, y + (st.c * rh) / 2, st.c, rows, ls, '#1D4ED8');
    }
    if (st.unit) {
      s += svgText(x + w + ls * 0.25, y + h / 2 + ls * 0.28, ls * 0.8, st.unit, { fill: '#64748B', anchor: 'start' });
    }
    // vùng bấm
    if (st.mode === 'cols') for (let i = 0; i < cols; i++) s += `<rect data-hit="${i}" x="${x + i * cw}" y="${y}" width="${cw}" height="${h}" fill="transparent" style="cursor:pointer"/>`;
    if (st.mode === 'rows') for (let j = 0; j < rows; j++) s += `<rect data-hit="${j}" x="${x}" y="${y + j * rh}" width="${w}" height="${rh}" fill="transparent" style="cursor:pointer"/>`;
    g.innerHTML = s;
  }
  g.addEventListener('click', (e) => {
    const hit = e.target.closest('[data-hit]');
    if (!hit || !st.mode) return;
    const i = +hit.dataset.hit;
    if (st.mode === 'cols') st.a = st.a === i + 1 ? i : i + 1;
    else st.c = st.c === i + 1 ? i : i + 1;
    draw();
    sfx.pop((st.mode === 'cols' ? st.a : st.c) % 10);
    t.emit('area', st);
  });
  draw();
  return {
    st, g,
    set(p) { Object.assign(st, p); draw(); },
    /** Hiện các ô chung (đánh số lần lượt). */
    async showCells() {
      st.cells = true;
      draw();
      const cells = [...g.querySelectorAll('.g4fo-cell')];
      await t.anim(cells, [{ opacity: 0, transform: 'scale(0.5)' }, { opacity: 1, transform: 'none' }], 300, { stagger: Math.max(30, 500 / cells.length) });
    },
  };
}

// ── Đồ vật để chia đều ─────────────────────────────────────────────────────────────────────────────────
/** Một đồ vật (tâm 0,0, bán kính r). */
export function itemSvg(kind, r) {
  const sw = Math.max(2, r * 0.12);
  if (kind === 'tao') return `<circle r="${r}" fill="#EF4444" stroke="${INK}" stroke-width="${sw}"/><path d="M0 ${-r} q ${r * 0.1} ${-r * 0.35} ${r * 0.3} ${-r * 0.5}" stroke="${INK}" stroke-width="${sw}" fill="none" stroke-linecap="round"/>
    <ellipse cx="${r * 0.45}" cy="${-r * 1.1}" rx="${r * 0.32}" ry="${r * 0.16}" fill="#22C55E" stroke="${INK}" stroke-width="${sw * 0.6}"/><circle cx="${-r * 0.38}" cy="${-r * 0.35}" r="${r * 0.2}" fill="#fff" opacity="0.5"/>`;
  if (kind === 'keo') return `<path d="M${-r * 0.6} 0 L${-r * 1.15} ${-r * 0.55} L${-r * 1.15} ${r * 0.55} Z M${r * 0.6} 0 L${r * 1.15} ${-r * 0.55} L${r * 1.15} ${r * 0.55} Z" fill="#F9A8D4" stroke="${INK}" stroke-width="${sw * 0.8}" stroke-linejoin="round"/>
    <ellipse rx="${r * 0.72}" ry="${r * 0.55}" fill="#EC4899" stroke="${INK}" stroke-width="${sw}"/><path d="M${-r * 0.3} ${-r * 0.45} q ${r * 0.3} ${r * 0.45} 0 ${r * 0.9} M${r * 0.15} ${-r * 0.5} q ${r * 0.3} ${r * 0.45} 0 ${r * 0.95}" stroke="#fff" stroke-width="${sw * 0.7}" fill="none" opacity="0.7"/>`;
  if (kind === 'bi') return `<circle r="${r}" fill="#38BDF8" stroke="${INK}" stroke-width="${sw}"/><path d="M${-r * 0.7} ${r * 0.1} q ${r * 0.7} ${-r * 0.6} ${r * 1.4} 0" stroke="#1D4ED8" stroke-width="${sw}" fill="none"/><circle cx="${-r * 0.35}" cy="${-r * 0.4}" r="${r * 0.22}" fill="#fff" opacity="0.8"/>`;
  if (kind === 'but') return `<g transform="rotate(-35)"><rect x="${-r * 0.28}" y="${-r * 1.1}" width="${r * 0.56}" height="${r * 1.7}" fill="#FACC15" stroke="${INK}" stroke-width="${sw * 0.8}"/>
    <path d="M${-r * 0.28} ${r * 0.6} L0 ${r * 1.15} L${r * 0.28} ${r * 0.6} Z" fill="#FDE68A" stroke="${INK}" stroke-width="${sw * 0.8}" stroke-linejoin="round"/><path d="M${-r * 0.1} ${r * 0.95} L0 ${r * 1.15} L${r * 0.1} ${r * 0.95} Z" fill="${INK}"/>
    <rect x="${-r * 0.28}" y="${-r * 1.1}" width="${r * 0.56}" height="${r * 0.3}" fill="#F472B6" stroke="${INK}" stroke-width="${sw * 0.8}"/></g>`;
  // cam
  return `<circle r="${r}" fill="#FB923C" stroke="${INK}" stroke-width="${sw}"/><circle cx="${-r * 0.35}" cy="${-r * 0.35}" r="${r * 0.2}" fill="#fff" opacity="0.45"/>
    <path d="M0 ${-r} q ${r * 0.4} ${-r * 0.5} ${r * 0.8} ${-r * 0.3}" stroke="#16A34A" stroke-width="${r * 0.28}" fill="none" stroke-linecap="round"/>`;
}

/** Vị trí k ô trong lưới gọn quanh (cx, cy), mỗi ô cỡ s; cols cột. */
function grid(n, cx, cy, s, cols) {
  const rows = Math.ceil(n / cols);
  return [...Array(n)].map((_, i) => {
    const r = Math.floor(i / cols), inRow = Math.min(cols, n - r * cols), c = i % cols;
    return { x: cx + (c - (inRow - 1) / 2) * s, y: cy + (r - (rows - 1) / 2) * s };
  });
}

/**
 * Rổ N đồ vật ở trên, b đĩa ở dưới (màn dọc: hai hàng đĩa nếu b > 3). share() chia đều (vật bay lần lượt vào từng đĩa);
 * pickable(true): bấm đĩa để lấy (đĩa nhấc lên, viền xanh). Phát 'share', 'pick'. st.picked = số đĩa đã lấy.
 * shared: vẽ sẵn ở trạng thái đã chia (Thực hành).
 */
export function createShare(t, { N, b, kind = 'cam', top = 10, bottom = t.bot - 10, shared = false, basket = true }) {
  injectStyles();
  const per = N / b;
  const W = 1000, H = bottom - top;
  const prow = t.tall && b > 3 ? 2 : 1; // hàng đĩa
  const pcols = Math.ceil(b / prow);
  const basketH = basket ? H * (t.tall ? 0.3 : 0.36) : 0;
  const plateZone = H - basketH;
  const slotW = W / pcols, slotH = plateZone / prow;
  const pcCols = per <= 3 ? per : per <= 6 ? Math.ceil(per / 2) : Math.ceil(per / 3);
  const pcRows = Math.ceil(per / pcCols);
  // cỡ một vật: vừa đĩa (đĩa rộng ~86% ô, cao ~62% ô) và vừa rổ
  const bCols = Math.min(N, Math.ceil(Math.sqrt(N * 3.2)));
  const bRows = Math.ceil(N / bCols);
  let s = Math.min((slotW * 0.74) / (pcCols + 0.2), (slotH * 0.5) / (pcRows + 0.1), 120);
  if (basket) s = Math.min(s, (W * 0.62) / bCols, (basketH * 0.8) / bRows);
  const r = s * 0.4;
  const plates = [...Array(b)].map((_, i) => {
    const row = Math.floor(i / pcols), inRow = row < prow - 1 ? pcols : b - pcols * (prow - 1), col = i - row * pcols;
    const cx = W / 2 + (col - (inRow - 1) / 2) * slotW;
    const cy = top + basketH + slotH * (row + 0.5) - slotH * 0.06;
    return { cx, cy, rx: Math.min(slotW * 0.45, (pcCols + 0.7) * s * 0.62), ry: Math.min(slotH * 0.36, (pcRows + 0.6) * s * 0.6) };
  });
  const st = { picked: 0, shared, mode: false, on: new Set() };
  const g = t.add('<g class="g4fo-share"></g>');
  let s0 = '';
  if (basket) {
    const bw = Math.min(W * 0.74, bCols * s + s * 1.2), bh = basketH * 0.9, bx = W / 2 - bw / 2, by = top + basketH * 0.05;
    s0 += `<g class="g4fo-basket"><path d="M${bx} ${by + bh * 0.25} h ${bw} l ${-bw * 0.06} ${bh * 0.75} h ${-bw * 0.88} Z" fill="#D6A26B" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
      ${[0.45, 0.65, 0.85].map(k => `<line x1="${bx + bw * 0.03 * k * 2}" y1="${by + bh * k}" x2="${bx + bw - bw * 0.03 * k * 2}" y2="${by + bh * k}" stroke="#A16207" stroke-width="3"/>`).join('')}</g>`;
  }
  s0 += plates.map((p, i) => `<g class="g4fo-plate" data-plate="${i}"><ellipse cx="${p.cx}" cy="${p.cy + p.ry * 0.12}" rx="${p.rx}" ry="${p.ry}" fill="#fff" stroke="${INK}" stroke-width="3"/>
    <ellipse class="g4fo-rim" cx="${p.cx}" cy="${p.cy + p.ry * 0.12}" rx="${p.rx * 0.84}" ry="${p.ry * 0.8}" fill="none" stroke="#CBD5E1" stroke-width="3"/></g>`).join('');
  g.innerHTML = s0 + '<g class="g4fo-items"></g><g class="g4fo-tags"></g>';
  const itemsL = g.querySelector('.g4fo-items'), tagsL = g.querySelector('.g4fo-tags');
  // chỗ của từng vật trong rổ và trên đĩa (vật i → đĩa i % b, ô thứ floor(i / b))
  const inBasket = basket ? grid(N, W / 2, top + basketH * 0.48, s, bCols) : [];
  const onPlate = plates.map(p => grid(per, p.cx, p.cy, s, pcCols));
  const dest = (i) => onPlate[i % b][Math.floor(i / b)];
  itemsL.innerHTML = [...Array(N)].map((_, i) => {
    const p = shared || !basket ? dest(i) : inBasket[i];
    return `<g class="g4fo-it" data-it="${i}" transform="translate(${p.x} ${p.y})">${itemSvg(kind, r)}</g>`;
  }).join('');
  const items = [...itemsL.children];
  const tag = () => {
    tagsL.innerHTML = plates.map(p => svgText(p.cx, p.cy + p.ry * 1.12 + s * 0.5, Math.max(34, s * 0.5), per, { fill: '#B45309' })).join('');
  };
  if (shared) tag();
  const api = {
    st, plates, s,
    /** Chia đều: vật bay lần lượt vào các đĩa (vòng tròn: mỗi đĩa một vật, rồi vòng sau). */
    async share() {
      sfx.swish();
      const step = Math.max(35, Math.min(110, 1800 / N));
      await Promise.all(items.map(async (el, i) => {
        await sleep(i * step);
        const a = inBasket[i], d = dest(i);
        await tween(480, (e) => {
          const x = a.x + (d.x - a.x) * e, y = a.y + (d.y - a.y) * e - Math.sin(Math.PI * e) * 80;
          el.setAttribute('transform', `translate(${x} ${y})`);
        });
        if (i % b === b - 1) sfx.pop(Math.floor(i / b) % 10);
      }));
      st.shared = true;
      tag();
      t.emit('share', st);
    },
    pickable(on = true) {
      st.mode = on;
      g.classList.toggle('g4fo-pickon', on);
    },
    /** Đánh dấu k đĩa đầu là đã lấy (Thực hành, sau khi trả lời). */
    take(k) { for (let i = 0; i < k; i++) mark(i, true); },
  };
  function mark(i, on) {
    const pg = g.querySelector(`[data-plate="${i}"]`);
    if (on) st.on.add(i); else st.on.delete(i);
    pg.classList.toggle('g4fo-took', on);
    // đĩa và các vật trên đĩa nhấc lên
    const lift = on ? -s * 0.25 : 0;
    pg.setAttribute('transform', `translate(0 ${lift})`);
    items.forEach((el, k) => { if (k % b === i) { const d = dest(k); el.setAttribute('transform', `translate(${d.x} ${d.y + lift})`); } });
    st.picked = st.on.size;
  }
  g.addEventListener('click', (e) => {
    if (!st.mode) return;
    let i = e.target.closest('[data-plate]')?.dataset.plate;
    if (i === undefined) { const it = e.target.closest('[data-it]'); if (it) i = +it.dataset.it % b; }
    if (i === undefined) return;
    i = +i;
    mark(i, !st.on.has(i));
    sfx.pop(st.picked);
    t.emit('pick', st);
  });
  return api;
}

/**
 * Thẻ phân số (tâm cx, cy, cỡ chữ fs). flip(): tử và mẫu đổi chỗ có chuyển động → phân số đảo ngược.
 * tap(on): bấm thẻ để đảo (phát 'flip').
 */
export function fracCard(t, cx, cy, a, b, fs = 90, { color = '#1E293B', fill = '#FFF7ED', edge = '#FDBA74' } = {}) {
  injectStyles();
  const st = { a, b, flipped: false };
  const g = t.add('<g class="g4fo-card"></g>');
  const w = Math.max(String(a).length, String(b).length) * fs * 0.6 + fs * 1.1, h = fs * 2.5;
  const draw = () => {
    g.innerHTML = `<rect class="g4fo-cardbg" x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="${fs * 0.3}" fill="${fill}" stroke="${edge}" stroke-width="4"/>
      <text class="g4v-t g4fo-n" x="${cx}" y="${cy - fs * 0.16}" font-size="${fs}" style="fill:${color}">${st.a}</text>
      <line x1="${cx - w * 0.32}" y1="${cy}" x2="${cx + w * 0.32}" y2="${cy}" stroke="${color}" stroke-width="${fs * 0.08}" stroke-linecap="round"/>
      <text class="g4v-t g4fo-d" x="${cx}" y="${cy + fs * 0.84}" font-size="${fs}" style="fill:${color}">${st.b}</text>`;
  };
  draw();
  let on = false;
  const api = {
    g, st, w, h,
    async flip() {
      const n = g.querySelector('.g4fo-n'), d = g.querySelector('.g4fo-d');
      const dy = fs;
      sfx.swish();
      await Promise.all([
        n.animate([{ transform: 'none' }, { transform: `translate(${fs * 0.55}px, ${dy * 0.5}px)`, offset: 0.5 }, { transform: `translate(0, ${dy}px)` }], { duration: anim(750), easing: 'ease-in-out', fill: 'both' }).finished,
        d.animate([{ transform: 'none' }, { transform: `translate(${-fs * 0.55}px, ${-dy * 0.5}px)`, offset: 0.5 }, { transform: `translate(0, ${-dy}px)` }], { duration: anim(750), easing: 'ease-in-out', fill: 'both' }).finished,
      ]);
      [st.a, st.b] = [st.b, st.a];
      st.flipped = !st.flipped;
      draw();
      if (on) g.classList.add('g4fo-cardon');
    },
    tap(v = true) {
      on = v;
      g.classList.toggle('g4fo-cardon', v);
    },
  };
  g.addEventListener('click', async () => {
    if (!on) return;
    on = false;
    g.classList.remove('g4fo-cardon');
    await api.flip();
    t.emit('flip', st);
  });
  return api;
}

let styled = false;
function injectStyles() {
  if (styled) return;
  styled = true;
  css('g4-fracops', `
    .g4fo-pickon .g4fo-plate, .g4fo-pickon .g4fo-it { cursor: pointer; }
    .g4fo-plate ellipse:first-child { transition: fill 0.2s, stroke 0.2s; }
    .g4fo-took ellipse:first-child { fill: #DCFCE7; stroke: #16A34A; stroke-width: 5; }
    .g4fo-it { pointer-events: auto; }
    .g4fo-cardon { cursor: pointer; animation: g4foCard 1.1s ease-in-out infinite; }
    .g4fo-cardon .g4fo-cardbg { stroke: #F59E0B; stroke-width: 7; }
    @keyframes g4foCard { 50% { opacity: 0.82; } }
    @media (prefers-reduced-motion: reduce) { .g4fo-cardon { animation: g4foCard 2.2s ease-in-out infinite; } }
  `);
}
