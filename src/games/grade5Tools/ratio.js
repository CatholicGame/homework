/**
 * 🟦 Sơ đồ phần bằng nhau (Toán 5 Tập Hai, Bài 36, 38, 39): mỗi số là một dãy đoạn bằng nhau, như sơ đồ đoạn thẳng của sách.
 *   mode 'sum'  (Bài 38): ngoặc nhọn bên phải ôm cả hai dòng, ghi tổng.
 *   mode 'diff' (Bài 39): số lớn ở dòng trên; ngoặc đứt nét dưới các phần hơn (giữa hai dòng), ghi hiệu.
 *   mode 'plain'(Bài 36): chỉ hai dãy phần, đọc tỉ số.
 * edit: mỗi dòng có nút − / + để em tự dựng số phần (sự kiện 'change'). Bề rộng một phần cố định theo cap từ đầu,
 * nên thêm bớt phần không làm hình nhảy.
 * Thầy dùng: countParts('all' | 'extra') đánh số từng phần; fillOne(v, which) ghi giá trị một phần vào từng phần;
 * over(i, text) ghi số tìm được trên dòng i; set({...}) đổi dữ liệu.
 */

import { createCanvas, anim } from '../grade4Tools/canvas.js';
import { INK, sfx } from '../grade4Tools/frame.js';
import { sleep } from '../grade3Drills/kit.js';

export const RC = ['#60A5FA', '#F472B6'];
const HI = '#FDE047';

/** Bố cục theo tỉ lệ chỗ trống (ngang: tên bên trái; dọc: tên phía trên thanh). */
function geo(t) {
  const r = t.svg.getBoundingClientRect();
  const H = r.width > 10 && r.height > 10 ? Math.round(Math.min(1700, Math.max(360, (1000 * r.height) / r.width))) : 520;
  t.frame(0, 0, 1000, H);
  // tờ giấy hẹp (điện thoại dọc) hoặc rất cao: tên dòng nằm trên thanh để thanh dài gần hết bề ngang
  const tall = (r.width > 10 && r.width < 560) || H > 1100;
  const top = 10, slot = (H - top - 10) / 2;
  const h = Math.min(tall ? 170 : 120, slot * (tall ? 0.36 : 0.4));
  const fs = Math.round(Math.min(tall ? 62 : 46, h * 0.5));
  const lead = tall ? fs * 1.2 : 0; // dòng tên phía trên thanh (dọc)
  const over = fs * 1.25; // chỗ dòng số phía trên thanh
  const ys = [0, 1].map((i) => top + slot * i + (slot - h - lead - over) / 2 + lead + over);
  return { tall, H, x0: tall ? 24 : 210, span: tall ? 700 : 520, h, fs, ys };
}

/** Ngoặc nhọn đứng (mũi sang phải). */
const vbrace = (x, y1, y2) => {
  const m = (y1 + y2) / 2, d = Math.min(22, (y2 - y1) / 5);
  return `M${x} ${y1} Q${x + d} ${y1} ${x + d} ${y1 + d} V${m - d} Q${x + d} ${m} ${x + 2 * d} ${m} Q${x + d} ${m} ${x + d} ${m + d} V${y2 - d} Q${x + d} ${y2} ${x} ${y2}`;
};
/** Ngoặc nhọn nằm (mũi xuống dưới). */
const hbrace = (x1, x2, y) => {
  const m = (x1 + x2) / 2, d = Math.min(18, (x2 - x1) / 5);
  return `M${x1} ${y} Q${x1} ${y + d} ${x1 + d} ${y + d} H${m - d} Q${m} ${y + d} ${m} ${y + 2 * d} Q${m} ${y + d} ${m + d} ${y + d} H${x2 - d} Q${x2} ${y + d} ${x2} ${y}`;
};

/**
 * host: phần tử chứa. rows: [{ name, parts }] (2 dòng). mode: 'sum' | 'diff' | 'plain'. label: chữ ở ngoặc ('60 quyển', '?').
 * cap: số phần nhiều nhất (định bề rộng một phần). edit: nút − / + cho từng dòng. ask: '?' trên mỗi dòng.
 */
export function createRatio(host, { rows = [{ name: 'Số thứ nhất', parts: 3 }, { name: 'Số thứ hai', parts: 5 }], mode = 'sum', label = '?', cap = 0, edit = false, ask = false, caption = '' } = {}) {
  const t = createCanvas(host);
  const S = {
    rows: rows.map((r, i) => ({ name: r.name, parts: r.parts, color: r.color || RC[i], over: ask ? '?' : '' })),
    mode, label, edit, cap,
    one: null, // giá trị một phần ghi trong các phần
    oneWhich: 'all',
    nums: null, // đánh số phần: 'all' | 'extra' (số đếm tới đâu)
    numTo: 0,
    hiExtra: false,
  };
  t.S = S;
  if (caption) t.caption(caption);
  const capOf = () => S.cap || Math.max(...S.rows.map((r) => r.parts), 1);

  /** Danh sách phần [{ i (dòng), j (thứ tự), x, y, w }] và nhóm 'extra' (phần hơn của dòng trên ở mode diff). */
  function segs(G) {
    const u = G.span / capOf();
    const out = [];
    S.rows.forEach((r, i) => { for (let j = 0; j < r.parts; j++) out.push({ i, j, x: G.x0 + j * u, y: G.ys[i], w: u, extra: S.mode === 'diff' && i === 0 && j >= S.rows[1].parts }); });
    return { u, out };
  }
  const isIn = (s, which) => (which === 'all' ? true : which === 'extra' ? s.extra : s.i === which);

  t.redraw = () => {
    const G = geo(t);
    t.G = G;
    const { u, out } = segs(G);
    const fsIn = Math.min(G.h * 0.55, u * 0.5, G.fs);
    let g = '';
    // tên dòng
    S.rows.forEach((r, i) => {
      const y = G.ys[i];
      g += G.tall
        ? `<text x="${G.x0}" y="${y - G.fs * 1.45}" class="g4v-t" font-size="${G.fs}" style="text-anchor:start">${r.name}:</text>`
        : `<text x="${G.x0 - 20}" y="${y + G.h / 2 + G.fs * 0.34}" class="g4v-t" font-size="${Math.min(G.fs, (G.x0 - 34) / ((r.name.length + 1) * 0.5))}" style="text-anchor:end">${r.name}:</text>`;
    });
    // các phần
    out.forEach((s) => {
      const r = S.rows[s.i];
      const fill = s.extra && S.hiExtra ? HI : r.color;
      g += `<g class="rt-s rt-r${s.i} rt-k${s.j}${s.extra ? ' rt-x' : ''}"><rect x="${s.x}" y="${s.y}" width="${s.w}" height="${G.h}" fill="${fill}" stroke="${INK}" stroke-width="3"/>`;
      let lab = '';
      if (S.one != null && isIn(s, S.oneWhich)) lab = S.one;
      else if (S.nums && isIn(s, S.nums)) {
        const order = out.filter((q) => isIn(q, S.nums));
        const k = order.indexOf(s) + 1;
        if (k <= S.numTo) lab = String(k);
      }
      if (lab) {
        const f = Math.min(fsIn, (s.w * 1.6) / Math.max(1, String(lab).length));
        g += `<text x="${s.x + s.w / 2}" y="${s.y + G.h / 2 + f * 0.36}" class="g4v-t" font-size="${f}" fill="#fff" style="paint-order:stroke;stroke:${INK};stroke-width:${Math.max(3, f * 0.14)}px">${lab}</text>`;
      }
      g += '</g>';
    });
    // dòng số phía trên mỗi dòng (? hoặc số đã tìm)
    S.rows.forEach((r, i) => {
      if (!r.over) return;
      const w = r.parts * u;
      const y = G.ys[i] - G.fs * 0.3;
      const ok = r.over !== '?';
      const xm = G.tall && i === 0 ? G.x0 + w / 2 : G.x0 + w / 2;
      g += `<text class="rt-over rt-o${i}" x="${xm}" y="${y}" font-size="${G.fs * 0.95}" text-anchor="middle" font-weight="800" fill="${ok ? '#16A34A' : '#64748B'}" style="paint-order:stroke;stroke:#fff;stroke-width:8px">${r.over}</text>`;
    });
    // ngoặc
    const lw = Math.max(...S.rows.map((r) => r.parts)) * u;
    if (S.mode === 'sum' && !S.edit) {
      const x = G.x0 + lw + 18;
      g += `<g class="rt-br"><path d="${vbrace(x, G.ys[0], G.ys[1] + G.h)}" fill="none" stroke="${INK}" stroke-width="3.5"/>
        <text x="${x + 52}" y="${(G.ys[0] + G.ys[1] + G.h) / 2 + G.fs * 0.34}" class="g4v-t" font-size="${Math.min(G.fs, (1000 - x - 62) / (String(S.label).length * 0.52))}" fill="#B45309" style="text-anchor:start">${S.label}</text></g>`;
    }
    if (S.mode === 'diff' && !S.edit && S.rows[0].parts > S.rows[1].parts) {
      const x1 = G.x0 + S.rows[1].parts * u, x2 = G.x0 + S.rows[0].parts * u;
      const y = G.ys[0] + G.h + 6;
      const gap = G.ys[1] - G.fs * 1.25 - (G.tall ? G.fs * 1.2 : 0) - y; // chỗ giữa hai dòng
      const by = Math.min(gap * 0.4, 40);
      g += `<line x1="${x1}" y1="${G.ys[0]}" x2="${x1}" y2="${G.ys[1] + G.h}" stroke="${INK}" stroke-width="2.5" stroke-dasharray="10 8"/>
        <g class="rt-br"><path d="${hbrace(x1, x2, y)}" fill="none" stroke="${INK}" stroke-width="3.5" stroke-dasharray="10 7"/>
        <text x="${(x1 + x2) / 2}" y="${y + by + G.fs * 0.95}" class="g4v-t" font-size="${G.fs * 0.92}" fill="#B45309" style="paint-order:stroke;stroke:#fff;stroke-width:8px">${S.label}</text></g>`;
    }
    if (S.mode === 'sum' && !S.edit && S.rows[0].parts !== S.rows[1].parts) {
      const x = G.x0 + Math.min(S.rows[0].parts, S.rows[1].parts) * u;
      g += `<line x1="${x}" y1="${G.ys[0] - 6}" x2="${x}" y2="${G.ys[1] + G.h + 6}" stroke="${INK}" stroke-width="2" stroke-dasharray="8 8" opacity="0.5"/>`;
    }
    // nút − / + (dựng sơ đồ)
    if (S.edit) {
      const bx = G.x0 + capOf() * u + 20, r = Math.min(G.h * 0.45, G.tall ? 60 : 38);
      S.rows.forEach((row, i) => {
        const cy = G.ys[i] + G.h / 2;
        [['−', -1, bx + r], ['+', 1, bx + 3 * r + 12]].forEach(([s, d, cx]) => {
          g += `<g class="rt-btn" data-i="${i}" data-d="${d}" style="cursor:pointer"><circle cx="${cx}" cy="${cy}" r="${r}" fill="${d > 0 ? row.color : '#fff'}" stroke="${INK}" stroke-width="3"/>
            <text x="${cx}" y="${cy + r * 0.38}" class="g4v-t" font-size="${r * 1.2}" ${d > 0 ? 'fill="#fff"' : ''} pointer-events="none">${s}</text></g>`;
        });
      });
    }
    t.draw(g);
  };

  // bấm − / +
  t.svg.addEventListener('click', (e) => {
    const b = e.target.closest('.rt-btn');
    if (!b || !S.edit) return;
    const i = +b.dataset.i, d = +b.dataset.d;
    const r = S.rows[i];
    const v = r.parts + d;
    if (v < 1 || v > capOf()) { sfx.boing?.(); return; }
    r.parts = v;
    sfx.pop(Math.min(9, v));
    t.redraw();
    const seg = t.q(`.rt-r${i}.rt-k${v - 1}`);
    if (d > 0 && seg) seg.animate([{ transform: 'scaleX(0.2)', opacity: 0.3 }, { transform: 'none', opacity: 1 }], { duration: anim(220), easing: 'ease-out' });
    t.emit('change', i);
  });

  t.parts = (i) => S.rows[i].parts;
  t.set = (patch = {}) => {
    if (patch.rows) patch.rows.forEach((r, i) => Object.assign(S.rows[i], r));
    for (const k of ['mode', 'label', 'edit', 'cap', 'one', 'oneWhich', 'nums', 'numTo', 'hiExtra']) if (k in patch) S[k] = patch[k];
    t.redraw();
    if (patch.rows?.some((r) => 'parts' in r)) t.emit('change', -1);
  };
  /** Đánh số các phần lần lượt (đếm tổng số phần hoặc hiệu số phần). */
  t.countParts = async (which = 'all', { gap = 380 } = {}) => {
    const G = t.G || geo(t);
    const n = segs(G).out.filter((s) => isIn(s, which)).length;
    S.nums = which; S.one = null;
    for (let k = 1; k <= n; k++) {
      S.numTo = k;
      t.redraw();
      const el = t.qa('.rt-s').filter((g) => g.querySelector('text')).pop();
      if (el) el.animate([{ transform: 'translateY(-10px)' }, { transform: 'none' }], { duration: anim(220) });
      sfx.pop(Math.min(9, k));
      await sleep(anim(gap));
    }
    return n;
  };
  /** Ghi giá trị một phần vào các phần (đổ đều tổng / hiệu vào các phần). */
  t.fillOne = async (v, which = 'all', { gap = 120 } = {}) => {
    S.nums = null; S.one = v; S.oneWhich = which;
    t.redraw();
    const els = t.qa('.rt-s').filter((g) => g.querySelector('text'));
    els.forEach((e) => { e.style.transformBox = 'fill-box'; e.style.transformOrigin = 'center'; });
    sfx.swish?.();
    await Promise.all(els.map((e, k) => e.animate([{ transform: 'scale(0.6)', opacity: 0.2 }, { transform: 'scale(1.08)', offset: 0.7 }, { transform: 'none', opacity: 1 }],
      { duration: anim(380), delay: k * anim(gap), easing: 'ease-out', fill: 'backwards' }).finished));
  };
  /** Ghi số tìm được trên dòng i (bay xuống, màu xanh lá). */
  t.over = async (i, text) => {
    S.rows[i].over = text;
    t.redraw();
    const el = t.q(`.rt-o${i}`);
    sfx.ding?.();
    if (el) await el.animate([{ transform: 'translateY(-24px) scale(1.3)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: anim(450), easing: 'ease-out' }).finished;
  };
  /** Tô vàng các phần hơn (mode diff). */
  t.hiExtra = (on = true) => { S.hiExtra = on; t.redraw(); };

  t.redraw();
  // vẽ lại khi tờ giấy đổi cỡ (xoay máy): bố cục tính theo chỗ trống
  const ro = new ResizeObserver(() => { if (!t.svg.isConnected) { ro.disconnect(); return; } t.redraw(); });
  ro.observe(t.svg);
  return t;
}
