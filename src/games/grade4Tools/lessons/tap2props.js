/**
 * Toán 4 Tập Hai (SGK Kết nối tri thức):
 *   Bài 40 Tính chất giao hoán và kết hợp của phép nhân (tr. 9–13): ⚙️ Máy biểu thức, mặt cười, khối lập phương.
 *   Bài 42 Tính chất phân phối của phép nhân đối với phép cộng (tr. 17–19): ⚙️ Máy biểu thức, đội đồng diễn, hình chữ nhật ghép.
 *   Bài 46 Tìm số trung bình cộng (tr. 29–30): 🧃 San đều (avg.js).
 *   Bài 47 Bài toán liên quan đến rút về đơn vị (tr. 31–32): 📊 Sơ đồ đoạn thẳng (hộp bánh, can mật ong).
 */

import { createExpr, createExprSteps, evalTokens, exprText, LETTER_COLOR } from '../exprm.js';
import { createCanvas, anim } from '../canvas.js';
import { createAvg } from '../avg.js';
import { BOX } from '../practice.js';
import { sleep } from '../../grade3Drills/kit.js';
import { sfx, INK, css } from '../frame.js';
import { fmt, fmtSp } from '../num.js';

const tok = (s) => s.split(' ');
const X = '×';
/** Ô trống có id để hỏi lần lượt. */
const box = (k) => `<span class="g4-box" data-b="${k}"></span>`;
const boxOf = (root, k) => root.querySelector(`.g4-box[data-b="${k}"]`);

/** Tấm vẽ trong Khám phá: chừa sẵn đáy cho nút chọn đè lên (không che hình, không nhảy bố cục). */
function exCanvas(board) {
  injectPropsStyles();
  const t = createCanvas(board);
  board.querySelector('.g4v').classList.add('g4pp-ex');
  return t;
}

/** Khung vẽ theo tỉ lệ chỗ trống (như bars.js): trả về [W, H] của viewBox, W = 1000. */
function fit(t, minH = 380, maxH = 1700) {
  const r = t.svg.getBoundingClientRect();
  const H = r.width > 10 && r.height > 10 ? Math.round(Math.min(maxH, Math.max(minH, (1000 * r.height) / r.width))) : 560;
  t.frame(0, 0, 1000, H);
  return [1000, H];
}

/** Hai máy chạy lần lượt các bộ số (bé chọn một trong hai bộ mỗi lần). */
async function runMachines(c, t, sets, names) {
  for (const set of sets) {
    const v = await c.choose(set.map(vals => ({ html: names.map(l => `${l} = ${vals[l]}`).join(', '), value: JSON.stringify(vals) })));
    t.reset();
    await t.feed(JSON.parse(v));
  }
}

// ══ Bài 40 ═══════════════════════════════════════════════════════════════════════════════════════════

/** Bảng đen 3 hàng × 4 cột mặt cười. picked: các cột (cols) / hàng (rows) bé đã chạm. */
function smileBoard(t, { mode = null, picked = new Set() } = {}) {
  const [, H] = fit(t, 420, 1100);
  const bw = 760, bh = Math.min(H - 130, 560), bx = 120, by = 20;
  const cw = bw / 4, rh = bh / 3, r = Math.min(cw, rh) * 0.34;
  let g = `<rect x="${bx - 14}" y="${by - 14}" width="${bw + 28}" height="${bh + 28}" rx="18" fill="#A16207"/>
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="10" fill="#166534"/>`;
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) {
    const x = bx + cw * (i + 0.5), y = by + rh * (j + 0.5);
    g += `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#FDE047" stroke="${INK}" stroke-width="4"/>
      <circle cx="${x - r * 0.35}" cy="${y - r * 0.2}" r="${r * 0.11}" fill="${INK}"/><circle cx="${x + r * 0.35}" cy="${y - r * 0.2}" r="${r * 0.11}" fill="${INK}"/>
      <path d="M${x - r * 0.5} ${y + r * 0.18} Q${x} ${y + r * 0.75} ${x + r * 0.5} ${y + r * 0.18}" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/></g>`;
  }
  const fs = Math.min(64, (H - bh - by - 20) * 0.7);
  if (mode === 'cols') for (let i = 0; i < 4; i++) {
    const x = bx + cw * i + 8, on = picked.has(i);
    g += `<rect class="pp-hit" data-i="${i}" x="${x}" y="${by + 6}" width="${cw - 16}" height="${bh - 12}" rx="22" fill="${on ? '#FDE04733' : 'transparent'}" stroke="${on ? '#FDE047' : '#86EFAC'}" stroke-width="${on ? 7 : 3}" stroke-dasharray="${on ? '' : '14 10'}" style="cursor:pointer"/>
      ${on ? `<text x="${x + (cw - 16) / 2}" y="${by + bh + fs + 14}" class="g4v-t" font-size="${fs}" style="fill:#B45309">3</text>` : ''}`;
  }
  if (mode === 'rows') for (let j = 0; j < 3; j++) {
    const y = by + rh * j + 6, on = picked.has(j);
    g += `<rect class="pp-hit" data-i="${j}" x="${bx + 6}" y="${y}" width="${bw - 12}" height="${rh - 12}" rx="22" fill="${on ? '#F9A8D433' : 'transparent'}" stroke="${on ? '#F9A8D4' : '#86EFAC'}" stroke-width="${on ? 7 : 3}" stroke-dasharray="${on ? '' : '14 10'}" style="cursor:pointer"/>
      ${on ? `<text x="${bx + bw + 40}" y="${y + rh / 2 + 18}" class="g4v-t" font-size="${Math.min(64, rh * 0.5)}" style="fill:#BE185D">4</text>` : ''}`;
  }
  t.draw(g);
  t.qa('.pp-hit').forEach((el) => { el.onclick = () => { if (picked.has(+el.dataset.i)) return; picked.add(+el.dataset.i); sfx.pop(picked.size); smileBoard(t, { mode, picked }); t.emit('pick', picked.size); }; });
  return picked;
}

/**
 * Khối hộp chữ nhật nX × nD × nZ khối lập phương nhỏ (hình chiếu xiên). split: 'x' tách thành nX lát đứng,
 * 'z' tách thành nZ tầng (chỉ nhóm, chưa tách: gọi spread). Vẽ kín ô (x0, y0, w, h).
 */
function cubes(t, { nX, nD, nZ, split = null, box: [x0, y0, w, h], gap = 0.55, labels = false }) {
  const k = 0.45, q = 0.32; // bề sâu: lệch phải k·s, lên q·s mỗi lớp
  const s = Math.min(w / (nX + nD * k + (split === 'x' ? (nX - 1) * gap : 0) + 0.3), h / (nZ + nD * q + (split === 'z' ? (nZ - 1) * gap : 0) + (split === 'x' ? 0.9 : 0.3)));
  const tw = nX * s + nD * k * s + (split === 'x' ? (nX - 1) * gap * s : 0), th = nZ * s + nD * q * s + (split === 'z' ? (nZ - 1) * gap * s : 0);
  const ox = x0 + (w - tw) / 2, oy = y0 + (h + th) / 2 - (split === 'x' ? s * 0.35 : 0);
  const one = (x, d, z) => {
    const px = ox + x * s + d * k * s, py = oy - z * s - d * q * s;
    const dx = k * s, dy = q * s;
    return `<g><polygon points="${px},${py} ${px + s},${py} ${px + s},${py - s} ${px},${py - s}" fill="#60A5FA"/>
      <polygon points="${px},${py - s} ${px + s},${py - s} ${px + s + dx},${py - s - dy} ${px + dx},${py - s - dy}" fill="#BFDBFE"/>
      <polygon points="${px + s},${py} ${px + s + dx},${py - dy} ${px + s + dx},${py - s - dy} ${px + s},${py - s}" fill="#2563EB"/>
      <path d="M${px} ${py}H${px + s}V${py - s}H${px}Z M${px} ${py - s}L${px + dx} ${py - s - dy}H${px + s + dx}L${px + s} ${py - s} M${px + s + dx} ${py - s - dy}V${py - dy}L${px + s} ${py}" fill="none" stroke="#1E3A8A" stroke-width="${Math.max(1.5, s * 0.045)}" stroke-linejoin="round"/></g>`;
  };
  let g = '';
  const lab = [];
  if (split === 'x') {
    for (let x = 0; x < nX; x++) {
      let in1 = '';
      for (let d = nD - 1; d >= 0; d--) for (let z = 0; z < nZ; z++) in1 += one(x, d, z);
      g += `<g class="pp-grp" data-k="${x}" data-dx="${x * gap * s}" data-dy="0">${in1}</g>`;
      lab.push(`<text class="g4v-t pp-lab" x="${ox + (x + 0.5) * s + x * gap * s + nD * k * s * 0.5}" y="${oy + s * 0.62}" font-size="${Math.min(60, s * 0.5)}" style="fill:#1D4ED8">${nZ} ${X} ${nD}</text>`);
    }
  } else if (split === 'z') {
    for (let z = 0; z < nZ; z++) {
      let in1 = '';
      for (let d = nD - 1; d >= 0; d--) for (let x = 0; x < nX; x++) in1 += one(x, d, z);
      g += `<g class="pp-grp" data-k="${z}" data-dx="0" data-dy="${-z * gap * s}">${in1}</g>`;
      lab.push(`<text class="g4v-t pp-lab" x="${ox + tw + 18}" y="${oy - (z + 0.5) * s - z * gap * s - nD * q * s * 0.5 + 18}" font-size="${Math.min(60, s * 0.5)}" style="fill:#1D4ED8;text-anchor:start">${nD} ${X} ${nX}</text>`);
    }
  } else {
    for (let d = nD - 1; d >= 0; d--) for (let z = 0; z < nZ; z++) for (let x = 0; x < nX; x++) g += one(x, d, z);
  }
  return { g, lab: labels ? lab.join('') : '', s, ox, oy };
}
/** Tách các nhóm (lát / tầng) ra xa nhau có chuyển động, rồi hiện nhãn. */
async function spread(t) {
  sfx.swish();
  await Promise.all(t.qa('.pp-grp').map((el, i) => el.animate([{ transform: 'translate(0px, 0px)' }, { transform: `translate(${el.dataset.dx}px, ${el.dataset.dy}px)` }],
    { duration: anim(700), delay: i * 90, easing: 'ease-in-out', fill: 'forwards' }).finished));
  t.qa('.pp-lab').forEach(e => e.setAttribute('visibility', 'visible'));
  await t.anim('.pp-lab', [{ opacity: 0 }, { opacity: 1 }], 350, { stagger: 120 });
}
/** Vẽ khối (chưa tách) với nhãn ẩn sẵn, để spread() tách ra. */
function drawBlock(t, opts, extra = '') {
  const [, H] = fit(t, 420, 1200);
  const r = cubes(t, { ...opts, box: opts.box || [40, 20, opts.split === 'z' ? 760 : 920, H - 40], labels: true });
  t.draw(`${r.g}<g visibility="hidden" class="pp-labs">${r.lab}</g>${extra}`);
  t.qa('.pp-lab').forEach(e => e.setAttribute('visibility', 'hidden'));
  t.q('.pp-labs')?.setAttribute('visibility', 'visible');
  return r;
}

const B40 = {
  explore: {
    setup: (board) => exCanvas(board),
    steps: [
      async (c) => {
        const t = c.t;
        t.caption('Có bao nhiêu mặt cười?');
        const picked = smileBoard(t, { mode: 'cols' });
        await c.say('Trên bảng có bao nhiêu mặt cười? Bạn Nam đếm theo cột. Em chạm vào từng cột.', 'Chạm từng <b>cột</b>');
        await c.until(t, () => picked.size === 4, { nudge: 'Chạm vào từng cột mặt cười.' });
        t.caption('<b>4</b> cột, mỗi cột <b>3</b> mặt cười');
        await c.say('Có 4 cột, mỗi cột có 3 mặt cười. Viết phép nhân thế nào?');
        await c.choose([{ html: `3 ${X} 4`, value: 1 }, { html: '3 + 4', value: 2 }, { html: `4 ${X} 4`, value: 3 }], 1, { hint: '3 mặt cười được lấy 4 lần.' });
        t.caption(`Nam: 3 ${X} 4 = <b>12</b> mặt cười`);
        await c.say('3 nhân 4 bằng 12. Có 12 mặt cười.');
      },
      async (c) => {
        const t = c.t;
        const picked = smileBoard(t, { mode: 'rows' });
        t.caption('Mai đếm theo <b>hàng</b>');
        await c.say('Bạn Mai lại đếm theo hàng. Em chạm vào từng hàng.', 'Chạm từng <b>hàng</b>');
        await c.until(t, () => picked.size === 3, { nudge: 'Chạm vào từng hàng mặt cười.' });
        await c.say('Có 3 hàng, mỗi hàng có 4 mặt cười. Viết phép nhân thế nào?', '<b>3</b> hàng, mỗi hàng <b>4</b> mặt cười');
        await c.choose([{ html: `4 ${X} 3`, value: 1 }, { html: '4 + 3', value: 2 }, { html: `3 ${X} 3`, value: 3 }], 1, { hint: '4 mặt cười được lấy 3 lần.' });
        t.caption(`3 ${X} 4 = 4 ${X} 3 = <b>12</b>`);
        await c.say('4 nhân 3 cũng bằng 12. Cả hai bạn đều đúng: 3 nhân 4 bằng 4 nhân 3.');
      },
      async (c) => {
        const t = c.use((b) => createExpr(b, { machines: [{ tokens: tok('a * b') }, { tokens: tok('b * a') }], rows: 3 }));
        await c.say('Hai máy: máy trái tính a nhân b, máy phải tính b nhân a. Chọn số cho a và b.', `So sánh <b>a ${X} b</b> và <b>b ${X} a</b>`);
        await runMachines(c, t, [[{ a: 3, b: 5 }, { a: 7, b: 2 }], [{ a: 4, b: 6 }, { a: 9, b: 3 }], [{ a: 5, b: 8 }, { a: 25, b: 4 }]], ['a', 'b']);
        await c.say('Hai máy luôn ra cùng một số. a nhân b bằng b nhân a. Khi đổi chỗ các thừa số trong một tích thì tích không thay đổi.',
          `<b>a ${X} b = b ${X} a</b>: đổi chỗ các thừa số, tích không đổi`);
      },
      async (c) => {
        const t = c.use((b) => exCanvas(b));
        drawBlock(t, { nX: 4, nD: 2, nZ: 3, split: 'x' });
        t.caption('Khối hộp này gồm bao nhiêu khối lập phương nhỏ?');
        await c.say('Khối hộp chữ nhật này gồm bao nhiêu khối lập phương nhỏ? Thử tách khối thành từng lát đứng.', 'Bấm ✂️ tách thành lát đứng');
        await c.choose([{ html: '✂️ Tách lát đứng', value: 1 }], 1);
        await spread(t);
        await c.say('Mỗi lát có 3 nhân 2 khối. Có 4 lát như thế. Chọn phép tính.', `Mỗi lát: 3 ${X} 2 khối · có 4 lát`);
        await c.choose([{ html: `(3 ${X} 2) ${X} 4`, value: 1 }, { html: `3 ${X} 2 + 4`, value: 2 }, { html: `(3 + 2) ${X} 4`, value: 3 }], 1, { hint: 'Mỗi lát 3 nhân 2 khối, lấy 4 lát.' });
        t.caption(`(3 ${X} 2) ${X} 4 = 6 ${X} 4 = <b>24</b> khối`);
        await c.say('3 nhân 2 bằng 6, 6 nhân 4 bằng 24 khối.');
      },
      async (c) => {
        const t = c.t;
        drawBlock(t, { nX: 4, nD: 2, nZ: 3, split: 'z' });
        t.caption('Tách theo <b>tầng</b>');
        await c.say('Bạn Mai tách khối thành từng tầng nằm ngang.', 'Bấm ✂️ tách thành tầng');
        await c.choose([{ html: '✂️ Tách tầng', value: 1 }], 1);
        await spread(t);
        await c.say('Mỗi tầng có 2 nhân 4 khối. Có 3 tầng. Chọn phép tính.', `Mỗi tầng: 2 ${X} 4 khối · có 3 tầng`);
        await c.choose([{ html: `3 ${X} (2 ${X} 4)`, value: 1 }, { html: `3 + 2 ${X} 4`, value: 2 }, { html: `3 ${X} 2 + 4`, value: 3 }], 1, { hint: 'Mỗi tầng 2 nhân 4 khối, có 3 tầng.' });
        t.caption(`(3 ${X} 2) ${X} 4 = 3 ${X} (2 ${X} 4) = <b>24</b>`);
        await c.say('2 nhân 4 bằng 8, 3 nhân 8 bằng 24. Cả hai bạn đều đúng.');
      },
      async (c) => {
        const t = c.use((b) => createExpr(b, { machines: [{ tokens: tok('( a * b ) * c') }, { tokens: tok('a * ( b * c )') }], rows: 3 }));
        await c.say('Máy trái nhân a với b trước. Máy phải nhân b với c trước. Chọn số xem sao.', `<b>(a ${X} b) ${X} c</b> và <b>a ${X} (b ${X} c)</b>`);
        await runMachines(c, t, [[{ a: 5, b: 4, c: 2 }, { a: 2, b: 7, c: 5 }], [{ a: 6, b: 2, c: 3 }, { a: 4, b: 9, c: 25 }], [{ a: 3, b: 2, c: 5 }, { a: 8, b: 3, c: 10 }]], ['a', 'b', 'c']);
        await c.say('Hai máy luôn ra cùng một số. Khi nhân một tích hai số với số thứ ba, ta có thể nhân số thứ nhất với tích của số thứ hai và số thứ ba.',
          `<b>(a ${X} b) ${X} c = a ${X} (b ${X} c)</b>`);
      },
      async (c) => {
        const t = c.use((b) => exCanvas(b));
        const [, H] = fit(t, 420, 1000);
        const L = (y, s, cls = '', fill = INK) => `<text class="g4v-t ${cls}" x="500" y="${y}" font-size="${Math.min(84, H / 6)}" style="fill:${fill}">${s}</text>`;
        t.draw(L(H * 0.3, `4 ${X} 25 ${X} 3`));
        t.caption('Tính <b>thuận tiện</b>: nhân hai số được số tròn trăm trước');
        await c.say('Tính 4 nhân 25 nhân 3. Nhân hai số nào trước thì được số tròn trăm?');
        await c.choose([{ html: `4 ${X} 25`, value: 1 }, { html: `25 ${X} 3`, value: 2 }], 1, { hint: '4 nhân 25 bằng 100.' });
        t.draw(`${L(H * 0.3, `4 ${X} 25 ${X} 3`)}${L(H * 0.55, `= 100 ${X} 3`, 'pp-in')}${L(H * 0.8, '= 300', 'pp-in', '#16A34A')}`);
        await t.anim('.pp-in', [{ opacity: 0, transform: 'translateY(-20px)' }, { opacity: 1, transform: 'none' }], 450, { stagger: 500 });
        await c.say('4 nhân 25 bằng 100. 100 nhân 3 bằng 300. Nhớ: 2 nhân 5 bằng 10, 4 nhân 25 bằng 100, 5 nhân 20 bằng 100, 2 nhân 50 bằng 100.',
          `2 ${X} 5 = 10 · 4 ${X} 25 = 100 · 5 ${X} 20 = 100 · 2 ${X} 50 = 100`);
      },
    ],
  },
  tasks: () => [taskSwap(), taskBoats(), taskWays(), taskTable(), taskKnow(), taskRound(), taskCakes()],
};

/** Số? a × b = b × ? (đổi chỗ thừa số), hai máy chạy kiểm tra. */
function taskSwap() {
  return {
    id: 'swap',
    make: (rng) => {
      const big = rng() < 0.5;
      const a = big ? rng.pick([rng.int(1001, 9999), rng.int(10001, 49999)]) : rng.int(2, 9), b = big ? rng.int(2, 9) : rng.int(2, 10);
      return { a, b, form: rng.int(0, 3) };
    },
    async mount(f, { a, b, form }) {
      // dạng như sách: 4 × 9 = 9 × ?; 5 × 10 = ? × 5; 3 112 × 8 = ? × 3 112; 41 320 × 3 = 3 × ?
      const [q, ans] = [
        [`${fmt(a)} ${X} ${fmt(b)} = ${fmt(b)} ${X} ${BOX}`, a],
        [`${fmt(a)} ${X} ${fmt(b)} = ${BOX} ${X} ${fmt(a)}`, b],
        [`${fmt(b)} ${X} ${fmt(a)} = ${BOX} ${X} ${fmt(b)}`, a],
        [`${fmt(b)} ${X} ${fmt(a)} = ${fmt(a)} ${X} ${BOX}`, b],
      ][form];
      f.q.innerHTML = `<span style="font-size:1.2em">${q}</span>`;
      const t = createExpr(f.tool, { machines: [{ tokens: tok('a * b') }, { tokens: tok('b * a') }], rows: 1 });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, say: 'Điền số thích hợp.', hint: 'Đổi chỗ các thừa số trong một tích thì tích không thay đổi.' });
      await t.feed({ a, b });
      f.finish({ ok: `a ${X} b = b ${X} a` });
    },
  };
}

/** Tìm phép tính có cùng kết quả (đảo, tàu): chọn tàu ghé đảo. */
function taskBoats() {
  return {
    id: 'boat',
    make: (rng) => {
      const s = rng.int(2, 9), p = rng.pick([rng.int(11, 99), rng.int(11, 99) * 10, rng.int(11, 99) * 100]);
      return { s, p, order: rng.int(0, 1), mix: rng.shuffle([0, 1, 2]) };
    },
    async mount(f, { s, p, order, mix }) {
      injectPropsStyles();
      const isl = order ? `${fmt(p)} ${X} ${s}` : `${s} ${X} ${fmt(p)}`;
      const good = order ? `${s} ${X} ${fmt(p)}` : `${fmt(p)} ${X} ${s}`;
      // nhiễu: bớt / thêm một chữ số 0 (510 × 9 và 51 × 9), đổi thừa số nhỏ
      const tens = p % 10 === 0 ? p / 10 : p * 10;
      const other = [good, `${fmt(tens)} ${X} ${s}`, `${s + (s < 9 ? 1 : -1)} ${X} ${fmt(p)}`];
      const opts = mix.map(i => other[i]);
      const t = createCanvas(f.tool, { bg: 'transparent' });
      t.svg.parentElement.classList.add('g4pp-sea');
      const [, H] = fit(t, 380, 1300);
      const tall = H > 800;
      const ix = tall ? 500 : 260, iy = tall ? H * 0.2 : H * 0.5, iw = tall ? 640 : 440;
      const fs = tall ? 72 : 60;
      const boatAt = (k) => (tall ? [500, H * (0.47 + k * 0.18)] : [730, H * (0.2 + k * 0.3)]);
      const boat = (k, s2) => {
        const [x, y] = boatAt(k), w = tall ? 660 : 420, bh = tall ? Math.min(150, H * 0.13) : Math.min(120, H * 0.2);
        return `<g class="pp-boat" data-k="${k}">
        <rect x="${x - w * 0.3}" y="${y - bh * 0.72}" width="${w * 0.46}" height="${bh * 0.4}" rx="8" fill="#E0F2FE" stroke="${INK}" stroke-width="3"/>
        <line x1="${x + w * 0.3}" y1="${y - bh * 0.32}" x2="${x + w * 0.3}" y2="${y - bh * 1.0}" stroke="${INK}" stroke-width="3"/><path d="M${x + w * 0.3} ${y - bh * 1.0} h${bh * 0.42} l-${bh * 0.1} ${bh * 0.14} l${bh * 0.1} ${bh * 0.14} h-${bh * 0.42}Z" fill="#DC2626"/>
        <path d="M${x - w / 2} ${y - bh * 0.32} H${x + w / 2} L${x + w / 2 - bh * 0.6} ${y + bh * 0.62} H${x - w / 2 + bh * 0.35} Z" fill="#fff" stroke="${INK}" stroke-width="3"/>
        <path d="M${x - w / 2 + bh * 0.3} ${y + bh * 0.5} H${x + w / 2 - bh * 0.55}" stroke="#2563EB" stroke-width="6"/>
        <text class="g4v-t" x="${x}" y="${y + bh * 0.28}" font-size="${Math.min(fs, bh * 0.5)}">${s2}</text></g>`;
      };
      t.draw(`<ellipse cx="${ix}" cy="${iy + 30}" rx="${iw / 2 + 30}" ry="${tall ? Math.min(150, H * 0.13) : Math.min(130, H * 0.18)}" fill="#FDE68A" stroke="${INK}" stroke-width="3"/>
        <ellipse cx="${ix}" cy="${iy + 12}" rx="${iw / 2}" ry="${tall ? Math.min(125, H * 0.11) : Math.min(110, H * 0.15)}" fill="#86EFAC" stroke="${INK}" stroke-width="3"/>
        <g transform="translate(${ix + iw * 0.4} ${iy - 10})"><path d="M0 0 q -10 -70 10 -120" stroke="#92400E" stroke-width="9" fill="none"/>
        <path d="M10 -120 q 40 -10 60 20 M10 -120 q -40 -14 -64 14 M10 -120 q 10 -40 44 -46" stroke="#16A34A" stroke-width="12" fill="none" stroke-linecap="round"/></g>
        <text class="g4v-t" x="${ix - iw * 0.06}" y="${iy + 12 + fs * 0.35}" font-size="${fs}">${isl}</text>
        ${opts.map((o, k) => boat(k, o)).join('')}`);
      await f.choose({ options: opts.map(o => ({ html: o, value: o })), answer: good, say: `Tàu nào có phép tính cùng kết quả với ${isl.replace(X, 'nhân')}?`, shown: `Tàu nào cùng kết quả với <b>${isl}</b>?`,
        hint: 'Đổi chỗ các thừa số thì tích không đổi. Xem kĩ từng thừa số.' });
      const k = opts.indexOf(good), [bx, by] = boatAt(k);
      const el = t.q(`.pp-boat[data-k="${k}"]`);
      sfx.swish();
      await el.animate([{ transform: 'none' }, { transform: `translate(${ix - bx + (tall ? 0 : 120)}px, ${iy - by + (tall ? 190 : 40)}px) scale(0.85)` }], { duration: anim(900), easing: 'ease-in-out', fill: 'forwards' }).finished;
      t.caption(`${isl} = ${good} = <b>${fmt(s * p)}</b>`);
      f.finish({ ok: `${isl} = ${good}` });
    },
  };
}

/** Dòng vở + hình (dòng trên, hình dưới). Trả về { lines, t (tấm vẽ) }. */
function notebook(f, html) {
  injectPropsStyles();
  f.tool.innerHTML = `<div class="g4pp-nb">${html}</div><div class="g4pp-pic"></div>`;
  return { lines: f.tool.querySelector('.g4pp-nb'), t: createCanvas(f.tool.querySelector('.g4pp-pic')) };
}

/** Tính bằng hai cách a × b × c (theo mẫu), khối lập phương tách theo từng cách. */
function taskWays() {
  return {
    id: 'ways',
    make: (rng) => ({ a: rng.int(2, 7), b: rng.int(2, 3), c: rng.int(2, 5) }),
    async mount(f, { a, b, c }) {
      f.q.innerHTML = `Tính bằng hai cách: <b>${a} ${X} ${b} ${X} ${c}</b>`;
      const { lines, t } = notebook(f, `
        <div>Cách 1: (${a} ${X} ${b}) ${X} ${c} = ${box(1)} ${X} ${c} = ${box(2)}</div>
        <div>Cách 2: ${a} ${X} (${b} ${X} ${c}) = ${a} ${X} ${box(3)} = ${box(4)}</div>`);
      // khối: a khối theo chiều ngang, b khối chiều sâu, c tầng
      const r0 = t.svg.getBoundingClientRect();
      const H = Math.round(Math.min(1000, Math.max(300, (1000 * r0.height) / r0.width)));
      const draw = (split) => { t.frame(0, 0, 1000, H); const r = cubes(t, { nX: a, nD: b, nZ: c, split, box: [30, 10, split === 'z' ? 800 : 940, H - 20], labels: true, gap: 0.35 }); t.draw(`${r.g}<g class="pp-labs">${r.lab}</g>`); t.qa('.pp-lab').forEach(e => e.setAttribute('visibility', 'hidden')); };
      draw('z');
      // tầng: mỗi tầng a × b (cách 1)
      await f.ask({ box: boxOf(lines, 1), answer: a * b, say: `Cách một: tính ${a} nhân ${b} trước.`, hint: `${a} nhân ${b} bằng mấy?` });
      t.caption(`Mỗi tầng ${a} ${X} ${b} = ${a * b} khối, có ${c} tầng`);
      t.qa('.pp-lab').forEach(e => { e.textContent = `${a} ${X} ${b}`; });
      await spread(t);
      await f.ask({ box: boxOf(lines, 2), answer: a * b * c, say: `Tính ${a * b} nhân ${c}.`, hint: `${a * b} nhân ${c}.` });
      draw('x');
      t.caption('&nbsp;');
      await f.ask({ box: boxOf(lines, 3), answer: b * c, say: `Cách hai: tính ${b} nhân ${c} trước.`, hint: `${b} nhân ${c} bằng mấy?` });
      t.caption(`Mỗi lát ${c} ${X} ${b} = ${b * c} khối, có ${a} lát`);
      await spread(t);
      await f.ask({ box: boxOf(lines, 4), answer: a * b * c, say: `Tính ${a} nhân ${b * c}.`, hint: `${a} nhân ${b * c}.` });
      f.finish({ ok: `${a} ${X} ${b} ${X} ${c} = ${a * b * c}` });
    },
  };
}

/** Bảng a, b, c như Luyện tập 1: điền a × b, b × a, (a × b) × c, a × (b × c). */
function taskTable() {
  return {
    id: 'table',
    make: (rng) => ({ a: rng.int(2, 10), b: rng.int(2, 5), c: rng.int(2, 4) }),
    async mount(f, { a, b, c }) {
      injectPropsStyles();
      f.q.innerHTML = 'Số?';
      const L = (s) => s.replace(/[abc]/g, (l) => `<i style="color:${LETTER_COLOR[l]}">${l}</i>`);
      const heads = ['a', 'b', 'c', `a ${X} b`, `b ${X} a`, `(a ${X} b) ${X} c`, `a ${X} (b ${X} c)`];
      const vals = [`<i style="color:${LETTER_COLOR.a}">${a}</i>`, `<i style="color:${LETTER_COLOR.b}">${b}</i>`, `<i style="color:${LETTER_COLOR.c}">${c}</i>`, box(1), box(2), box(3), box(4)];
      // bảng như sách (ngang: hàng tiêu đề + hàng số; dọc: hai cột)
      f.tool.innerHTML = `<div class="g4pp-grid">${heads.map((h, i) => `<b>${L(h)}</b><span>${vals[i]}</span>`).join('')}</div>
        <div class="g4pp-tabnote">&nbsp;</div><div class="g4pp-pic"></div>`;
      // khối: a cột × b hàng ở mặt trước, sâu c lớp
      const t = createCanvas(f.tool.querySelector('.g4pp-pic'));
      const r0 = t.svg.getBoundingClientRect();
      const H = Math.round(Math.min(1000, Math.max(260, (1000 * r0.height) / Math.max(1, r0.width))));
      t.frame(0, 0, 1000, H);
      t.draw(cubes(t, { nX: a, nD: c, nZ: b, box: [40, 10, 920, H - 20] }).g);
      const note = f.tool.querySelector('.g4pp-tabnote');
      await f.ask({ box: boxOf(f.tool, 1), answer: a * b, say: `a nhân b: ${a} nhân ${b}.`, hint: `${a} nhân ${b}.` });
      await f.ask({ box: boxOf(f.tool, 2), answer: a * b, say: `b nhân a: ${b} nhân ${a}.`, hint: 'Đổi chỗ các thừa số, tích không đổi.' });
      note.innerHTML = `a ${X} b = b ${X} a`;
      await f.ask({ box: boxOf(f.tool, 3), answer: a * b * c, say: `a nhân b, rồi nhân c: ${a * b} nhân ${c}.`, hint: `${a * b} nhân ${c}.` });
      await f.ask({ box: boxOf(f.tool, 4), answer: a * b * c, say: `b nhân c bằng ${b * c}, rồi ${a} nhân ${b * c}.`, hint: `${a} nhân ${b * c}.` });
      note.innerHTML = `a ${X} b = b ${X} a · (a ${X} b) ${X} c = a ${X} (b ${X} c)`;
      f.finish({ ok: `(a ${X} b) ${X} c = a ${X} (b ${X} c)` });
    },
  };
}

/** Biết hai phép nhân, không tính mà cho biết giá trị biểu thức (Luyện tập 2). */
function taskKnow() {
  return {
    id: 'know',
    make: (rng) => ({ a: rng.int(3, 9), N: rng.int(10, 99) * 1000 + rng.int(1, 99) * 10, b: rng.int(2, 9), form: rng.int(0, 3) }),
    async mount(f, { a, N, b, form }) {
      const p1 = a * N, p2 = p1 * b;
      const [ex, ans] = [[`${fmt(N)} ${X} ${a}`, p1], [`${b} ${X} ${fmt(p1)}`, p2], [`${a} ${X} ${fmt(N)} ${X} ${b}`, p2], [`${b} ${X} ${a} ${X} ${fmt(N)}`, p2]][form];
      f.q.innerHTML = `<small>Biết ${a} ${X} ${fmt(N)} = ${fmt(p1)} và ${fmt(p1)} ${X} ${b} = ${fmt(p2)}.</small>Không tính, cho biết: <b>${ex}</b> = ?`;
      const opts = [...new Set([p1, p2, N * b])].map(v => ({ html: fmt(v), value: v }));
      await f.choose({ options: opts, answer: ans, say: 'Không cần tính. Dùng tính chất giao hoán và kết hợp để chọn kết quả.',
        hint: form ? `Đổi chỗ, nhóm lại: ${a} nhân ${fmtSp(N)} trước, rồi nhân ${b}.` : 'Đổi chỗ các thừa số, tích không đổi.' });
      f.finish({ ok: `${ex} = ${fmt(ans)}` });
    },
  };
}

/** Tính thuận tiện a × b × c: chọn hai số nhân được số tròn chục / tròn trăm (ô chữ LÊ QUÝ ĐÔN). */
function taskRound() {
  const PAIRS = [[2, 5], [5, 20], [4, 25], [2, 50], [5, 40], [4, 50], [5, 60], [8, 125]];
  return {
    id: 'round',
    make: (rng) => {
      const [p, q] = rng.pick(PAIRS);
      const z = rng.pick([3, 7, 9, 11, 13, 17, 19, 23]); // số lẻ, không chia hết cho 5: chỉ một cặp cho số tròn
      return { p, q, z, ord: rng.pick([[0, 1, 2], [0, 2, 1], [2, 0, 1], [1, 2, 0]]) };
    },
    async mount(f, { p, q, z, ord }) {
      injectPropsStyles();
      const ns = ord.map(i => [p, q, z][i]);
      const total = p * q * z;
      f.q.innerHTML = 'Tính bằng cách thuận tiện:';
      const { lines, t } = notebook(f, `<div class="g4pp-step g4pp-on">${ns.map(fmt).join(` ${X} `)}</div>
        <div class="g4pp-step" data-l="2">= (${fmt(p)} ${X} ${fmt(q)}) ${X} ${fmt(z)}</div>
        <div class="g4pp-step" data-l="3">= ${box(1)} ${X} ${fmt(z)} = ${box(2)}</div>`);
      t.svg.closest('.g4pp-pic').remove();
      const pairs = [[ns[0], ns[1]], [ns[0], ns[2]], [ns[1], ns[2]]];
      const good = pairs.find(pr => pr.includes(p) && pr.includes(q));
      await f.choose({ options: pairs.map(pr => ({ html: `${fmt(pr[0])} ${X} ${fmt(pr[1])}`, value: pr.join('x') })), answer: good.join('x'),
        say: 'Nhân hai số nào trước thì tính nhanh nhất?', hint: `${p} nhân ${q} bằng ${fmtSp(p * q)}, số tròn.` });
      lines.querySelector('[data-l="2"]').classList.add('g4pp-on');
      await sleep(400);
      lines.querySelector('[data-l="3"]').classList.add('g4pp-on');
      await f.ask({ box: boxOf(lines, 1), answer: p * q, say: `${p} nhân ${q} bằng mấy?`, hint: `${p} nhân ${q}.` });
      await f.ask({ box: boxOf(lines, 2), answer: total, say: `Tính ${fmtSp(p * q)} nhân ${z}.`, hint: `Nhân số tròn: ${fmtSp(p * q)} nhân ${z}.` });
      f.finish({ ok: `${ns.map(fmt).join(` ${X} `)} = ${fmt(total)}` });
    },
  };
}

/** Rô-bốt làm bánh kem: a bánh, mỗi bánh b phần, mỗi phần c quả dâu (Hoạt động 3). */
function taskCakes() {
  return {
    id: 'cake',
    make: (rng) => ({ a: rng.int(2, 4), b: rng.int(4, 8), c: rng.int(2, 3) }),
    async mount(f, { a, b, c }) {
      f.q.innerHTML = `<small>Rô-bốt làm ${a} chiếc bánh kem, mỗi chiếc cắt thành ${b} phần, mỗi phần có ${c} quả dâu tây.</small>Số phần bánh: ${box(1)} · Số quả dâu: ${box(2)}`;
      const t = createCanvas(f.tool);
      const [, H] = fit(t, 360, 1400);
      const tall = H > 900;
      const R = tall ? Math.min(170, (H - 40) / a / 2 - 14) : Math.min(170, (1000 / a) / 2 - 24, H / 2 - 30);
      const ctr = (i) => (tall ? [500, (H / a) * (i + 0.5)] : [(1000 / a) * (i + 0.5), H / 2]);
      let g = '';
      for (let i = 0; i < a; i++) {
        const [x, y] = ctr(i);
        g += `<ellipse cx="${x}" cy="${y + R * 0.12}" rx="${R * 1.08}" ry="${R * 1.0}" fill="#E2E8F0" stroke="${INK}" stroke-opacity="0.5" stroke-width="3"/>
          <circle cx="${x}" cy="${y}" r="${R}" fill="#FEF3C7" stroke="${INK}" stroke-width="3"/>`;
        for (let j = 0; j < b; j++) {
          const an = (j / b) * Math.PI * 2 - Math.PI / 2, a2 = ((j + 0.5) / b) * Math.PI * 2 - Math.PI / 2;
          g += `<line class="pp-cut" x1="${x}" y1="${y}" x2="${x + R * Math.cos(an)}" y2="${y + R * Math.sin(an)}" stroke="#B45309" stroke-width="3"/>`;
          for (let s = 0; s < c; s++) {
            const rr = R * (c === 2 ? [0.5, 0.78][s] : [0.42, 0.62, 0.82][s]);
            g += `<circle class="pp-berry" cx="${x + rr * Math.cos(a2)}" cy="${y + rr * Math.sin(a2)}" r="${Math.max(6, R * 0.075)}" fill="#DC2626" stroke="#7F1D1D" stroke-width="1.5"/>`;
          }
        }
      }
      t.draw(g);
      t.qa('.pp-berry').forEach(e => e.setAttribute('opacity', '0'));
      await f.ask({ box: boxOf(f.q, 1), answer: a * b, say: `${a} chiếc bánh, mỗi chiếc ${b} phần. Có bao nhiêu phần bánh?`, hint: `${a} nhân ${b}.` });
      t.qa('.pp-berry').forEach(e => e.setAttribute('opacity', '1'));
      await t.anim('.pp-berry', [{ opacity: 0, transform: 'translateY(-14px)' }, { opacity: 1, transform: 'none' }], 300, { stagger: 18 });
      await f.ask({ box: boxOf(f.q, 2), answer: a * b * c, say: `Mỗi phần có ${c} quả dâu. Rô-bốt dùng bao nhiêu quả dâu?`, hint: `(${a} nhân ${b}) nhân ${c}, hay ${a} nhân (${b} nhân ${c}).` });
      f.finish({ ok: `${a} ${X} ${b} ${X} ${c} = ${a * b * c} quả dâu tây.` });
    },
  };
}

// ══ Bài 42 ═══════════════════════════════════════════════════════════════════════════════════════════

/** Đội đồng diễn: r1 hàng áo đỏ, r2 hàng áo vàng, mỗi hàng n người. show: 'sum' (ngoặc 5 hàng) | 'split' (hai ngoặc). */
function troupe(t, { r1 = 3, r2 = 2, n = 15, show = null, picked = new Set() } = {}) {
  const [, H] = fit(t, 420, 1200);
  const rows = r1 + r2, x0 = 30, wArea = 700, rh = (H - 40) / rows, pw = wArea / n;
  const sz = Math.min(pw * 0.9, rh * 0.8), tallK = Math.max(1, Math.min(2, (rh * 0.8) / sz)); // màn dọc: người cao hơn
  let g = '';
  for (let j = 0; j < rows; j++) {
    const red = j < r1, y = 20 + rh * (j + 0.5);
    g += `<g class="pp-row" data-j="${j}">`;
    for (let i = 0; i < n; i++) {
      const x = x0 + pw * (i + 0.5);
      const hy = y - sz * 0.25 * tallK, by = y + sz * 0.42 * tallK, ty = y - sz * 0.04 * tallK;
      g += `<circle cx="${x}" cy="${hy}" r="${sz * 0.22}" fill="#FCD9B6" stroke="${INK}" stroke-width="2"/>
        <path d="M${x - sz * 0.3} ${by} Q${x - sz * 0.3} ${ty} ${x} ${ty} Q${x + sz * 0.3} ${ty} ${x + sz * 0.3} ${by} Z" fill="${red ? '#EF4444' : '#FACC15'}" stroke="${INK}" stroke-width="2"/>`;
    }
    g += '</g>';
  }
  const fs = Math.min(52, rh * 0.55);
  const br = (y1, y2, s, col, cls = '') => { const m = (y1 + y2) / 2, x = x0 + wArea + 14; return `<g class="${cls}"><path d="M${x} ${y1} Q${x + 22} ${y1} ${x + 22} ${y1 + 18} V${m - 12} Q${x + 22} ${m} ${x + 38} ${m} Q${x + 22} ${m} ${x + 22} ${m + 12} V${y2 - 18} Q${x + 22} ${y2} ${x} ${y2}" fill="none" stroke="${col}" stroke-width="4"/>
    <text class="g4v-t" x="${x + 46}" y="${m + fs * 0.35}" font-size="${fs}" style="fill:${col};text-anchor:start">${s}</text></g>`; };
  if (show === 'sum') g += br(22, H - 22, `${rows} hàng`, '#7C3AED', 'pp-br');
  if (show === 'split') {
    const yA = 20 + rh * r1;
    // vùng chạm của từng nhóm áo
    g += `<rect class="pp-hit" data-i="0" x="${x0 - 10}" y="16" width="${wArea + 20}" height="${rh * r1 - 4}" rx="16" fill="${picked.has(0) ? '#FEE2E233' : 'transparent'}" stroke="${picked.has(0) ? '#EF4444' : '#CBD5E1'}" stroke-width="${picked.has(0) ? 6 : 3}" stroke-dasharray="${picked.has(0) ? '' : '12 9'}" style="cursor:pointer"/>
      <rect class="pp-hit" data-i="1" x="${x0 - 10}" y="${yA + 4}" width="${wArea + 20}" height="${rh * r2 - 6}" rx="16" fill="${picked.has(1) ? '#FEF9C333' : 'transparent'}" stroke="${picked.has(1) ? '#CA8A04' : '#CBD5E1'}" stroke-width="${picked.has(1) ? 6 : 3}" stroke-dasharray="${picked.has(1) ? '' : '12 9'}" style="cursor:pointer"/>`;
    if (picked.has(0)) g += br(22, yA - 6, `${n} ${X} ${r1}`, '#DC2626');
    if (picked.has(1)) g += br(yA + 6, H - 22, `${n} ${X} ${r2}`, '#A16207');
  }
  t.draw(g);
  t.qa('.pp-hit').forEach((el) => { el.onclick = () => { if (picked.has(+el.dataset.i)) return; picked.add(+el.dataset.i); sfx.pop(picked.size + 2); troupe(t, { r1, r2, n, show, picked }); t.emit('pick', picked.size); }; });
  return picked;
}

/**
 * Mô hình hình chữ nhật: chiều cao = k (thừa số chung, ghi nhãn), chiều ngang hai phần a | b vẽ đúng tỉ lệ.
 * op '+': ghép hai phần; '-': phần b bị cắt bỏ (gạch). merged: một khối k × (a ± b).
 */
function areaModel(t, { k, a, b, op = '+', merged = false, kLeft = true, kRight = false }) {
  const mul = (x) => (kRight ? `${fmt(x)} ${X} ${fmt(k)}` : `${fmt(k)} ${X} ${fmt(x)}`);
  const [, H] = fit(t, 300, 1100);
  const total = op === '+' ? a + b : a, scale = 800 / total;
  const h = Math.min(H - 110, 360), y = (H - h) / 2 + 20, x0 = 150;
  const wa = (op === '+' ? a : a - b) * scale, wb = b * scale;
  const fs = Math.min(56, h * 0.28);
  const kLab = `<text class="g4v-t" x="${x0 - 22}" y="${y + h / 2 + fs * 0.35}" font-size="${fs}" style="fill:#7C3AED;text-anchor:end">${fmt(k)}</text>`;
  const lab = (x, w, s, col) => `<text class="g4v-t" x="${x + w / 2}" y="${y - 16}" font-size="${fs}" style="fill:${col}">${fmt(s)}</text>`;
  const inner = (x, w, s, col) => (w > fs * 2.6 ? `<text class="g4v-t" x="${x + w / 2}" y="${y + h / 2 + fs * 0.35}" font-size="${Math.min(fs, w / (String(s).length * 0.6))}" style="fill:${col}">${s}</text>` : '');
  let g = kLeft ? kLab : '';
  if (merged) {
    const w = wa + (op === '+' ? wb : 0);
    g += `<rect class="pp-m" x="${x0}" y="${y}" width="${w}" height="${h}" rx="10" fill="#DDD6FE" stroke="${INK}" stroke-width="3"/>
      ${lab(x0, w, op === '+' ? a + b : a - b, '#6D28D9')}${inner(x0, w, mul(op === '+' ? a + b : a - b), '#4C1D95')}`;
    if (op === '-') g += `<rect x="${x0 + wa}" y="${y}" width="${wb}" height="${h}" rx="10" fill="#fff" stroke="#94A3B8" stroke-width="3" stroke-dasharray="12 8"/>`;
  } else {
    g += `<rect class="pp-pa" x="${x0}" y="${y}" width="${wa}" height="${h}" rx="10" fill="#BFDBFE" stroke="${INK}" stroke-width="3"/>${lab(x0, wa, op === '+' ? a : a - b, '#1D4ED8')}${inner(x0, wa, mul(op === '+' ? a : a - b), '#1E3A8A')}
      <rect class="pp-pb" x="${x0 + wa + (op === '+' ? 14 : 0)}" y="${y}" width="${wb}" height="${h}" rx="10" fill="${op === '+' ? '#FBCFE8' : '#FEE2E2'}" stroke="${op === '+' ? INK : '#EF4444'}" stroke-width="3" ${op === '-' ? 'stroke-dasharray="12 8"' : ''}/>${lab(x0 + wa + (op === '+' ? 14 : 0), wb, b, op === '+' ? '#BE185D' : '#DC2626')}${inner(x0 + wa + (op === '+' ? 14 : 0), wb, mul(b), '#9D174D')}`;
    if (op === '-') g += `<line x1="${x0 + wa}" y1="${y + h}" x2="${x0 + wa + wb}" y2="${y}" stroke="#EF4444" stroke-width="4"/>`;
  }
  t.draw(g);
}

const B42 = {
  explore: {
    setup: (board) => exCanvas(board),
    steps: [
      async (c) => {
        const t = c.t;
        troupe(t);
        t.caption('3 hàng áo đỏ, 2 hàng áo vàng, mỗi hàng <b>15</b> người');
        await t.anim('.pp-row', [{ opacity: 0, transform: 'translateX(-30px)' }, { opacity: 1, transform: 'none' }], 400, { stagger: 220 });
        await c.say('Một đội đồng diễn có 3 hàng mặc áo đỏ và 2 hàng mặc áo vàng, mỗi hàng đều có 15 người. Hỏi đội có tất cả bao nhiêu người?');
        await c.say('Bạn Nam tính tổng số hàng trước. Có tất cả mấy hàng?', 'Cách của Nam: tổng số hàng trước');
        await c.choose([{ html: '3 + 2 = 5 hàng', value: 1 }, { html: '3 × 2 = 6 hàng', value: 2 }], 1, { hint: '3 hàng đỏ thêm 2 hàng vàng.' });
        troupe(t, { show: 'sum' });
        await c.say('Có 5 hàng, mỗi hàng 15 người. Chọn phép tính.', '5 hàng, mỗi hàng 15 người');
        await c.choose([{ html: `15 ${X} (3 + 2)`, value: 1 }, { html: `15 ${X} 3 + 2`, value: 2 }, { html: '15 + 3 + 2', value: 3 }], 1, { hint: 'Cần ngoặc: 3 cộng 2 trước, rồi mới nhân.' });
        t.caption(`Nam: 15 ${X} (3 + 2) = 15 ${X} 5 = <b>75</b> (người)`);
        await c.say('15 nhân, mở ngoặc 3 cộng 2, đóng ngoặc, bằng 15 nhân 5, bằng 75 người.');
      },
      async (c) => {
        const t = c.t;
        const picked = troupe(t, { show: 'split' });
        t.caption('Cách của Mai: tính riêng từng màu áo');
        await c.say('Bạn Mai tính riêng số người mặc áo đỏ, số người mặc áo vàng, rồi cộng lại. Em chạm vào nhóm áo đỏ, rồi nhóm áo vàng.', 'Chạm nhóm <b>áo đỏ</b>, rồi nhóm <b>áo vàng</b>');
        await c.until(t, () => picked.size === 2, { nudge: 'Chạm vào nhóm áo đỏ và nhóm áo vàng.' });
        await c.say('Áo đỏ: 15 nhân 3 bằng 45. Áo vàng: 15 nhân 2 bằng 30. Cộng lại được bao nhiêu?', `15 ${X} 3 = 45 · 15 ${X} 2 = 30`);
        await c.choose([{ html: '45 + 30 = 75', value: 1 }, { html: '45 + 30 = 65', value: 2 }], 1, { hint: '45 cộng 30.' });
        t.caption(`15 ${X} (3 + 2) = 15 ${X} 3 + 15 ${X} 2`);
        await c.say('Hai cách cùng ra 75 người. Vậy 15 nhân tổng 3 cộng 2 bằng 15 nhân 3 cộng 15 nhân 2.');
      },
      async (c) => {
        const t = c.use((b) => createExpr(b, { machines: [{ tokens: tok('a * ( b + c )') }, { tokens: tok('a * b + a * c') }], rows: 3 }));
        await c.say('Hai máy: máy trái nhân a với tổng b cộng c. Máy phải nhân a với từng số hạng rồi cộng lại. Chọn số xem sao.', `<b>a ${X} (b + c)</b> và <b>a ${X} b + a ${X} c</b>`);
        await runMachines(c, t, [[{ a: 15, b: 3, c: 2 }, { a: 4, b: 5, c: 3 }], [{ a: 26, b: 5, c: 4 }, { a: 7, b: 10, c: 2 }], [{ a: 43, b: 2, c: 6 }, { a: 12, b: 3, c: 7 }]], ['a', 'b', 'c']);
        await c.say('Khi nhân một số với một tổng, ta có thể nhân số đó với từng số hạng của tổng rồi cộng các kết quả với nhau.', `<b>a ${X} (b + c) = a ${X} b + a ${X} c</b>`);
      },
      async (c) => {
        const t = c.use((b) => exCanvas(b));
        t.caption(`(15 + 21) ${X} 7: nhân một tổng với một số`);
        await c.say('Nhân một tổng với một số cũng vậy. 15 cộng 21, rồi nhân 7. Bấm ghép hai phần.', 'Bấm 🧩 ghép hai phần');
        areaModel(t, { k: 7, a: 15, b: 21, op: '+', kRight: true });
        await c.choose([{ html: '🧩 Ghép', value: 1 }], 1);
        sfx.pop(3);
        areaModel(t, { k: 7, a: 15, b: 21, op: '+', merged: true, kRight: true });
        await t.anim('.pp-m', [{ opacity: 0.4 }, { opacity: 1 }], 500);
        t.caption(`(15 + 21) ${X} 7 = 15 ${X} 7 + 21 ${X} 7 = <b>252</b>`);
        await c.say('Phần 15 nhân 7 và phần 21 nhân 7 ghép lại thành 36 nhân 7, bằng 252. Khi nhân một tổng với một số, ta có thể nhân từng số hạng của tổng với số đó rồi cộng các kết quả.',
          `<b>(a + b) ${X} c = a ${X} c + b ${X} c</b>`);
      },
      async (c) => {
        const t = c.use((b) => createExpr(b, { machines: [{ tokens: tok('a * ( b - c )') }, { tokens: tok('a * b - a * c') }], rows: 3 }));
        await c.say('Với hiệu thì sao? Máy trái nhân a với hiệu b trừ c. Máy phải tính a nhân b, trừ a nhân c.', `<b>a ${X} (b − c)</b> và <b>a ${X} b − a ${X} c</b>`);
        await runMachines(c, t, [[{ a: 4, b: 6, c: 2 }, { a: 5, b: 9, c: 2 }], [{ a: 23, b: 7, c: 4 }, { a: 8, b: 7, c: 3 }], [{ a: 14, b: 10, c: 5 }, { a: 9, b: 8, c: 3 }]], ['a', 'b', 'c']);
        await c.say('Hai máy vẫn ra cùng một số. a nhân hiệu b trừ c bằng a nhân b trừ a nhân c.', `<b>a ${X} (b − c) = a ${X} b − a ${X} c</b>`);
      },
      async (c) => {
        const t = c.use((b) => exCanvas(b));
        areaModel(t, { k: 34, a: 8, b: 2, op: '+' });
        t.caption(`Tính bằng cách thuận tiện: <b>34 ${X} 8 + 34 ${X} 2</b>`);
        await c.say('Tính 34 nhân 8 cộng 34 nhân 2. Hai tích có chung thừa số 34. Viết gọn lại thế nào?');
        await c.choose([{ html: `34 ${X} (8 + 2)`, value: 1 }, { html: `34 ${X} 8 + 2`, value: 2 }, { html: `(34 + 8) ${X} 2`, value: 3 }], 1, { hint: 'Thừa số chung 34 nhân với tổng 8 cộng 2.' });
        areaModel(t, { k: 34, a: 8, b: 2, op: '+', merged: true });
        await t.anim('.pp-m', [{ opacity: 0.4 }, { opacity: 1 }], 500);
        t.caption(`34 ${X} (8 + 2) = 34 ${X} 10 = <b>340</b>`);
        await c.say('34 nhân, mở ngoặc 8 cộng 2, bằng 34 nhân 10, bằng 340. Tính như vậy thuận tiện hơn.');
      },
    ],
  },
  tasks: () => [taskTwoWays(), taskEval42(), taskMatch(), taskConv42(), taskThree42(), taskStory42()],
};

/** Tính bằng hai cách a × (b + c) hoặc (a + b) × c (theo mẫu). */
function taskTwoWays() {
  return {
    id: 'two',
    make: (rng) => ({ k: rng.int(12, 49), a: rng.int(2, 9), b: rng.int(2, 9), right: rng() < 0.5 }),
    async mount(f, { k, a, b, right }) {
      const ex = right ? `(${a} + ${b}) ${X} ${k}` : `${k} ${X} (${a} + ${b})`;
      const t1 = right ? `${a} ${X} ${k}` : `${k} ${X} ${a}`, t2 = right ? `${b} ${X} ${k}` : `${k} ${X} ${b}`;
      f.q.innerHTML = `Tính bằng hai cách: <b>${ex}</b>`;
      const { lines, t } = notebook(f, `
        <div>Cách 1: ${ex} = ${right ? `${box(1)} ${X} ${k}` : `${k} ${X} ${box(1)}`} = ${box(2)}</div>
        <div>Cách 2: ${t1} + ${t2} = ${box(3)} + ${box(4)} = ${box(5)}</div>`);
      areaModel(t, { k, a, b, kRight: right });
      const s = k * (a + b);
      await f.ask({ box: boxOf(lines, 1), answer: a + b, say: 'Cách một: tính trong ngoặc trước.', hint: `${a} cộng ${b}.` });
      areaModel(t, { k, a, b, merged: true, kRight: right });
      await f.ask({ box: boxOf(lines, 2), answer: s, say: `Tính ${k} nhân ${a + b}.`, hint: `${k} nhân ${a + b}.` });
      areaModel(t, { k, a, b, kRight: right });
      await f.ask({ box: boxOf(lines, 3), answer: k * a, say: `Cách hai: nhân từng số hạng. ${t1.replace(X, 'nhân')}.`, hint: `${k} nhân ${a}.` });
      await f.ask({ box: boxOf(lines, 4), answer: k * b, say: `${t2.replace(X, 'nhân')}.`, hint: `${k} nhân ${b}.` });
      await f.ask({ box: boxOf(lines, 5), answer: s, say: `Cộng ${k * a} với ${k * b}.`, hint: `${k * a} cộng ${k * b}.` });
      f.finish({ ok: `${ex} = ${t1} + ${t2} = ${fmt(s)}` });
    },
  };
}

/** Tính giá trị biểu thức với m, n, p (Hoạt động 2a) và dạng hiệu (Luyện tập 2a), từng bước như vở. */
function taskEval42() {
  const SRC = ['m * ( n + p )', '( m + n ) * p', 'm * n + m * p', 'm * p + n * p', 'a * ( b - c )', 'a * b - a * c'];
  return {
    id: 'eval',
    make: (rng) => {
      const src = rng.pick(SRC);
      return src.includes('a')
        ? { src, vals: { a: rng.int(3, 15), b: rng.int(6, 12), c: rng.int(2, 5) } }
        : { src, vals: { m: rng.int(2, 9), n: rng.int(2, 9), p: rng.int(2, 9) } };
    },
    async mount(f, { src, vals }) {
      const tokens = tok(src);
      const used = [...new Set(tokens.filter(x => /^[a-z]$/.test(x)))];
      f.q.innerHTML = `Tính giá trị của <b>${exprText(tokens)}</b> với ${used.map(l => `${l} = <b class="g4x-given" data-l="${l}" style="color:${LETTER_COLOR[l]}">${vals[l]}</b>`).join(', ')}`;
      const t = createExprSteps(f.tool, { tokens, vals });
      f.say(`Thay ${used.join(', ')} bằng số.`);
      await t.substitute((l) => f.q.querySelector(`.g4x-given[data-l="${l}"]`));
      for (let k = 1; k < t.steps.length; k++) {
        const st = t.steps[k], bx = t.show(k);
        await f.ask({ box: bx, answer: st.toks[st.at], say: st.inParen ? `Tính trong ngoặc trước: ${st.opSay}.` : `Tính ${st.opSay}.`,
          shown: st.inParen ? `Tính trong ngoặc trước: <b>${st.op}</b>` : `Tính <b>${st.op}</b>`, hint: (_, w) => (w > 1 ? `${st.opSay} bằng ${fmtSp(st.toks[st.at])}.` : `Tính lại ${st.opSay}.`) });
      }
      f.finish({ ok: `${exprText(tokens, vals)} = ${fmt(evalTokens(tokens, vals))}` });
    },
  };
}

/** Hai biểu thức nào bằng nhau (Hoạt động 2b, Luyện tập 2b: >, <, =): chọn rồi hai máy kiểm tra. */
function taskMatch() {
  const SETS = [
    ['a * ( b + c )', ['a * b + a * c', 'a * b + c', 'a + b * c']],
    ['( a + b ) * c', ['a * c + b * c', 'a + b * c', 'a * b + c']],
    ['a * ( b - c )', ['a * b - a * c', 'a * b - c', 'a * c - b']],
  ];
  return {
    id: 'match',
    make: (rng) => ({ s: rng.int(0, SETS.length - 1), vals: { a: rng.int(3, 12), b: rng.int(6, 15), c: rng.int(2, 5) }, mix: rng.shuffle([0, 1, 2]) }),
    async mount(f, { s, vals, mix }) {
      const [src, cands] = SETS[s];
      const good = cands[0];
      f.q.innerHTML = `Biểu thức nào có giá trị bằng <b>${exprText(tok(src))}</b>?`;
      const t = createExpr(f.tool, { machines: [{ tokens: tok(src) }, { tokens: tok(good) }], rows: 1 });
      injectPropsStyles();
      const hid = [t.root.querySelectorAll('.g4e-machine')[1], t.root.querySelector('.g4e-table')];
      hid.forEach(e => e.classList.add('g4pp-hide'));
      await f.choose({ options: mix.map(i => ({ html: exprText(tok(cands[i])), value: cands[i] })), answer: good,
        say: 'Chọn biểu thức có giá trị bằng nhau với mọi số.', hint: s === 2 ? 'Nhân a với từng số của hiệu rồi trừ.' : 'Nhân thừa số chung với từng số hạng rồi cộng.' });
      hid.forEach(e => e.classList.remove('g4pp-hide'));
      await t.feed(vals);
      f.finish({ ok: `${exprText(tok(src))} = ${exprText(tok(good))}` });
    },
  };
}

/** Tính thuận tiện k × a ± k × b (Luyện tập 2, 3 trang 18–19): chọn cách viết gọn, gõ tổng / hiệu, rồi kết quả. */
function taskConv42() {
  return {
    id: 'conv',
    make: (rng) => {
      const kind = rng.pick(['p10', 'p100', 'm']);
      const k = kind === 'p100' ? rng.int(2, 9) : rng.int(21, 199);
      let a, b;
      if (kind === 'p10') { a = rng.int(1, 9); b = 10 - a; }
      else if (kind === 'p100') { a = rng.int(11, 89); b = 100 - a; }
      else { b = rng.int(2, 8); a = b + rng.pick([1, 1, 5, 10]); }
      return { kind, k, a, b, kRight: kind === 'p100' };
    },
    async mount(f, { kind, k, a, b, kRight }) {
      injectPropsStyles();
      const op = kind === 'm' ? '−' : '+';
      const term = (x) => (kRight ? `${x} ${X} ${k}` : `${fmt(k)} ${X} ${x}`);
      const ex = `${term(a)} ${op} ${term(b)}`;
      const inner = kind === 'm' ? a - b : a + b, total = k * inner;
      const good = kRight ? `(${a} ${op} ${b}) ${X} ${k}` : `${fmt(k)} ${X} (${a} ${op} ${b})`;
      const bad1 = kRight ? `${a} ${op} ${b} ${X} ${k}` : `${fmt(k)} ${X} ${a} ${op} ${b}`;
      const bad2 = kRight ? `${a} ${X} (${k} ${op} ${b})` : `(${fmt(k)} ${op} ${a}) ${X} ${b}`;
      f.q.innerHTML = `Tính bằng cách thuận tiện: <b>${ex}</b>`;
      const { lines, t } = notebook(f, `<div class="g4pp-step g4pp-on">${ex}</div>
        <div class="g4pp-step" data-l="2">= ${kRight ? `(${a} ${op} ${b}) ${X} ${k}` : `${fmt(k)} ${X} (${a} ${op} ${b})`}</div>
        <div class="g4pp-step" data-l="3">= ${kRight ? `${box(1)} ${X} ${k}` : `${fmt(k)} ${X} ${box(1)}`} = ${box(2)}</div>`);
      areaModel(t, { k, a, b, op: kind === 'm' ? '-' : '+', kRight });
      await f.choose({ options: [good, bad1, bad2].sort(() => 0.5 - Math.random()).map(s => ({ html: s, value: s })), answer: good,
        say: `Hai tích có chung thừa số ${k}. Viết gọn thế nào?`, hint: `Thừa số chung ${k} nhân với ${kind === 'm' ? 'hiệu' : 'tổng'} ${a} ${kind === 'm' ? 'trừ' : 'cộng'} ${b}.` });
      lines.querySelector('[data-l="2"]').classList.add('g4pp-on');
      areaModel(t, { k, a, b, op: kind === 'm' ? '-' : '+', merged: true, kRight });
      await t.anim('.pp-m', [{ opacity: 0.4 }, { opacity: 1 }], 450);
      lines.querySelector('[data-l="3"]').classList.add('g4pp-on');
      await f.ask({ box: boxOf(lines, 1), answer: inner, say: 'Tính trong ngoặc trước.', hint: `${a} ${kind === 'm' ? 'trừ' : 'cộng'} ${b}.` });
      await f.ask({ box: boxOf(lines, 2), answer: total, say: `Tính ${k} nhân ${inner}.`, hint: `${fmtSp(k)} nhân ${inner}.` });
      f.finish({ ok: `${ex} = ${good} = ${fmt(total)}` });
    },
  };
}

/** k × a + k × b + k × c với a + b + c = 10 (Luyện tập 3, theo mẫu). */
function taskThree42() {
  return {
    id: 'three',
    make: (rng) => { const a = rng.int(1, 7), b = rng.int(1, 8 - a); return { k: rng.int(21, 499), a, b, c: 10 - a - b }; },
    async mount(f, { k, a, b, c }) {
      injectPropsStyles();
      const ex = `${fmt(k)} ${X} ${a} + ${fmt(k)} ${X} ${b} + ${fmt(k)} ${X} ${c}`;
      f.q.innerHTML = 'Tính (theo mẫu):';
      const { lines, t } = notebook(f, `<div>${ex}</div><div>= ${fmt(k)} ${X} (${a} + ${b} + ${c})</div><div>= ${fmt(k)} ${X} ${box(1)} = ${box(2)}</div>`);
      t.svg.closest('.g4pp-pic').remove();
      await f.ask({ box: boxOf(lines, 1), answer: 10, say: `Ba tích có chung thừa số ${fmtSp(k)}. Tính tổng ${a} cộng ${b} cộng ${c}.`, hint: `${a} cộng ${b} cộng ${c}.` });
      await f.ask({ box: boxOf(lines, 2), answer: k * 10, say: `Tính ${fmtSp(k)} nhân 10.`, hint: 'Nhân với 10: thêm một chữ số 0 vào bên phải.' });
      f.finish({ ok: `${ex} = ${fmt(k * 10)}` });
    },
  };
}

/** Bài toán lời văn (Hoạt động 3, Luyện tập 4, 4 trang 18–19): gõ bước gộp rồi đáp số; hình chữ nhật ghép. */
function taskStory42() {
  return {
    id: 'story',
    make: (rng) => {
      const kind = rng.pick(['ve', 'hang', 'vai']);
      if (kind === 've') return { kind, a: rng.int(2, 4), b: rng.int(2, 4), k: rng.int(10, 35) };
      if (kind === 'hang') { const a = rng.int(21, 79); return { kind, a, b: 100 - a, k: rng.int(2, 6) }; }
      const a = rng.int(6, 12); return { kind, a, b: rng.int(2, a - 2), k: rng.int(20, 50) };
    },
    async mount(f, { kind, a, b, k }) {
      const T = {
        ve: [`Khối lớp Bốn có ${a} lớp học vẽ, khối lớp Ba có ${b} lớp học vẽ, mỗi lớp có ${k} bạn. Cả hai khối có bao nhiêu bạn học vẽ?`, 'Số lớp:', a + b, k * (a + b), 'bạn', `${a} cộng ${b}`],
        hang: [`Đợt một chuyển ${k} chuyến, mỗi chuyến ${a} thùng hàng. Đợt hai chuyển ${k} chuyến, mỗi chuyến ${b} thùng hàng. Cả hai đợt chuyển được bao nhiêu thùng hàng?`, `${a} + ${b} =`, a + b, k * (a + b), 'thùng', `${a} cộng ${b}`],
        vai: [`Cửa hàng có ${a} tấm vải, mỗi tấm dài ${k} m. Đã bán ${b} tấm như vậy. Cửa hàng còn lại bao nhiêu mét vải?`, 'Số tấm còn:', a - b, k * (a - b), 'm', `${a} trừ ${b}`],
      }[kind];
      f.q.innerHTML = `<small>${T[0]}</small>${T[1]} ${box(1)} · Đáp số: ${box(2)} ${T[4]}`;
      const t = createCanvas(f.tool);
      areaModel(t, kind === 'hang' ? { k, a, b } : { k, a, b, op: kind === 'vai' ? '-' : '+' });
      await f.ask({ box: boxOf(f.q, 1), answer: T[2], say: kind === 'hang' ? `Hai đợt cùng ${k} chuyến. Tính ${a} cộng ${b} trước.` : kind === 've' ? 'Cả hai khối có mấy lớp học vẽ?' : 'Còn lại mấy tấm vải?', hint: `${T[5]}.` });
      areaModel(t, kind === 'hang' ? { k, a, b, merged: true } : { k, a, b, op: kind === 'vai' ? '-' : '+', merged: true });
      await f.ask({ box: boxOf(f.q, 2), answer: T[3], say: 'Tính đáp số.', hint: `${k} nhân ${T[2]}.` });
      f.finish({ ok: `Đáp số: ${fmt(T[3])} ${T[4]}.` });
    },
  };
}

// ══ Bài 46 ═══════════════════════════════════════════════════════════════════════════════════════════

const BAD = { low: 'Rót từ cốc nhiều hơn sang cốc ít hơn.', same: 'Hai cốc này đã bằng nhau rồi. Chọn cốc khác.', small: 'Hai cốc này chỉ chênh một chút. Chọn cốc nhiều nhất và cốc ít nhất.' };
/** San đều trong Khám phá: chừa đáy cho nút chọn; chạm sai thì thầy nhắc. */
function avgEx(board, c, opts) {
  injectPropsStyles();
  const t = createAvg(board, { ...opts, onBad: (why) => c.hint(BAD[why]) });
  board.querySelector('.g4sd').classList.add('g4pp-ex');
  return t;
}

const B46 = {
  explore: {
    setup: (board) => { injectPropsStyles(); const t = createAvg(board, { values: [10, 50], names: ['Hôm qua', 'Hôm nay'], step: 10, cap: 60, interactive: false }); board.querySelector('.g4sd').classList.add('g4pp-ex'); return t; },
    steps: [
      async (c) => {
        const t = c.use((b) => avgEx(b, c, { values: [10, 50], names: ['Hôm qua', 'Hôm nay'], step: 10, cap: 60 }));
        t.caption('Mai tập thể dục: hôm qua <b>10</b> phút, hôm nay <b>50</b> phút');
        t.lock(true);
        await c.say('Hôm qua Mai tập thể dục 10 phút. Hôm nay Mai tập 50 phút để bù cho hôm qua. Mỗi cốc là số phút một ngày.');
        t.lock(false);
        await c.say('Nếu chia đều cho hai ngày thì mỗi ngày bao nhiêu phút? Em chạm cốc nhiều hơn, rồi chạm cốc ít hơn để rót sang.', 'Chạm cốc <b>nhiều</b>, rồi cốc <b>ít</b>');
        await c.until(t, () => t.equal(), { nudge: 'Chạm cốc Hôm nay, rồi chạm cốc Hôm qua.', el: () => t.cup(1) });
        t.lock(true);
        t.showAvg(30);
        t.caption('(10 + 50) : 2 = <b>30</b>');
        await c.say('Hai cốc bằng nhau: mỗi ngày 30 phút. Ta thấy 10 cộng 50, chia 2, bằng 30. Ta gọi 30 là số trung bình cộng của hai số 10 và 50.',
          '<b>30</b> là số trung bình cộng của 10 và 50');
      },
      async (c) => {
        const t = c.use((b) => avgEx(b, c, { values: [13, 14, 18], names: ['Số thứ nhất', 'Số thứ hai', 'Số thứ ba'], cap: 20 }));
        t.caption('Tìm số trung bình cộng của <b>13, 14 và 18</b>');
        await c.say('Tìm số trung bình cộng của ba số 13, 14 và 18. Em san cho ba cốc bằng nhau.', 'San đều ba cốc');
        await c.until(t, () => t.equal(), { nudge: 'Chạm cốc nhiều nhất, rồi chạm cốc ít nhất.', el: () => t.cup(2) });
        t.lock(true);
        t.showAvg(15);
        await c.say('Mỗi cốc là 15. Không cần rót, ta tính được ngay bằng phép tính nào?', 'Mỗi cốc <b>15</b>. Phép tính nào?');
        await c.choose([{ html: '(13 + 14 + 18) : 3', value: 1 }, { html: '13 + 14 + 18', value: 2 }, { html: '(13 + 14 + 18) : 2', value: 3 }], 1, { hint: 'Gộp hết lại rồi chia đều cho 3 cốc.' });
        t.caption('(13 + 14 + 18) : 3 = 45 : 3 = <b>15</b>');
        await c.say('13 cộng 14 cộng 18 bằng 45. 45 chia 3 bằng 15. Ta gọi 15 là số trung bình cộng của ba số 13, 14 và 18.');
      },
      async (c) => {
        const t = c.use((b) => avgEx(b, c, { values: [35, 37, 43, 45], names: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4'], cap: 50, interactive: false }));
        t.caption('Số học sinh 4 lớp: <b>35, 37, 43, 45</b>');
        await c.say('Số học sinh của 4 lớp lần lượt là 35, 37, 43 và 45. Trung bình mỗi lớp có bao nhiêu học sinh? Chọn phép tính.', 'Trung bình mỗi lớp? Chọn phép tính');
        await c.choose([{ html: '(35 + 37 + 43 + 45) : 4', value: 1 }, { html: '(35 + 45) : 2', value: 2 }, { html: '35 + 37 + 43 + 45', value: 3 }], 1, { hint: 'Tính tổng cả 4 lớp, rồi chia cho 4.' });
        t.caption('(35 + 37 + 43 + 45) : 4 = 160 : 4 = <b>40</b>');
        await c.say('Tổng là 160, chia 4 bằng 40. Xem máy san đều để kiểm tra.');
        await t.level();
        t.showAvg(40);
        await c.say('Mỗi lớp đều thành 40. Muốn tìm số trung bình cộng của nhiều số, ta tính tổng của các số đó, rồi chia tổng đó cho số các số hạng.',
          'Số trung bình cộng = <b>tổng các số : số các số hạng</b>');
      },
    ],
  },
  tasks: () => [taskFindAvg(), taskPourAvg(), taskWordAvg(), taskFlower(), taskBags(), taskMoreAvg(), taskMissing()],
};

/** Dãy n số có trung bình cộng là số tự nhiên. */
function avgSet(rng, n, lo, hi) {
  for (;;) {
    const v = Array.from({ length: n }, () => rng.int(lo, hi));
    const s = v.reduce((a, b) => a + b, 0);
    if (s % n === 0 && new Set(v).size > 1) return v;
  }
}
const sumText = (v) => v.map(fmt).join(' + ');

/** Gõ tổng rồi số trung bình cộng; đúng thì cốc tự san đều, hiện vạch trung bình. */
async function askSumAvg(f, t, v, { sumSay = 'Tính tổng các số.', avgSay = null } = {}) {
  const s = v.reduce((a, b) => a + b, 0), n = v.length, m = s / n;
  await f.ask({ box: boxOf(f.q, 1), answer: s, say: sumSay, hint: `${sumText(v)}.` });
  t.caption(`${sumText(v)} = ${fmt(s)}`);
  await f.ask({ box: boxOf(f.q, 2), answer: m, say: avgSay || `Chia tổng cho ${n}, số các số hạng.`, hint: `${fmtSp(s)} chia ${n}.` });
  t.caption(`(${sumText(v)}) : ${n} = <b>${fmt(m)}</b>`);
  await t.level();
  t.showAvg(m);
  return m;
}

/** Tìm số trung bình cộng của 2–4 số (Hoạt động 1). */
function taskFindAvg() {
  return {
    id: 'find',
    make: (rng) => { const n = rng.int(2, 3); return { v: n === 2 ? avgSet(rng, 2, 10, 60).map(x => x) : avgSet(rng, 3, 5, 40) }; },
    async mount(f, { v }) {
      f.q.innerHTML = `Tìm số trung bình cộng của <b>${v.slice(0, -1).join(', ')} và ${v[v.length - 1]}</b><br>Tổng: ${box(1)} · Trung bình cộng: ${box(2)}`;
      const t = createAvg(f.tool, { values: v, interactive: false, cap: Math.max(...v) * 1.15 });
      const m = await askSumAvg(f, t, v);
      f.finish({ ok: `(${sumText(v)}) : ${v.length} = ${m}` });
    },
  };
}

/** Em tự san đều các cốc, rồi cho biết số trung bình cộng. */
function taskPourAvg() {
  return {
    id: 'pour',
    make: (rng) => ({ v: avgSet(rng, rng.int(2, 4), 2, 18) }),
    async mount(f, { v }) {
      const m = v.reduce((a, b) => a + b, 0) / v.length;
      f.q.innerHTML = `San đều các cốc. Số trung bình cộng của <b>${v.join(', ')}</b> là ${box(1)}`;
      const t = createAvg(f.tool, { values: v, cap: 20, onBad: (why) => f.hint(BAD[why]) });
      t.caption('Chạm cốc <b>nhiều</b>, rồi cốc <b>ít</b> để rót');
      f.say('Chạm cốc nhiều hơn, rồi chạm cốc ít hơn để rót sang. San tới khi các cốc bằng nhau.', 'Chạm cốc <b>nhiều</b>, rồi cốc <b>ít</b>');
      if (import.meta.env.DEV) window.__g4solve = () => t.level();
      await new Promise((res) => { if (t.equal()) res(); const off = t.on(() => { if (t.equal()) { off(); res(); } }); });
      t.lock(true);
      t.showAvg(m);
      t.caption(`Các cốc bằng nhau: mỗi cốc <b>${m}</b>`);
      await f.ask({ box: boxOf(f.q, 1), answer: m, say: 'Các cốc đã bằng nhau. Số trung bình cộng là bao nhiêu?', hint: `Tổng ${v.reduce((a, b) => a + b, 0)} chia ${v.length}.` });
      f.finish({ ok: `(${sumText(v)}) : ${v.length} = ${m}` });
    },
  };
}

/** Bài toán lời văn: cây của các đội, học sinh các lớp, chặng đua (Hoạt động 2, 3). */
function taskWordAvg() {
  return {
    id: 'word',
    make: (rng) => {
      const kind = rng.pick(['cay', 'hs', 'km']);
      if (kind === 'cay') return { kind, v: avgSet(rng, 3, 12, 30) };
      if (kind === 'hs') return { kind, v: avgSet(rng, 4, 30, 45) };
      return { kind, v: avgSet(rng, 4, 40, 190) };
    },
    async mount(f, { kind, v }) {
      const T = {
        cay: [`Số cây trồng được của ${v.length} đội lần lượt là ${sumText(v).replace(/ \+ /g, ', ')}. Trung bình mỗi đội trồng được bao nhiêu cây?`, v.map((_, i) => `Đội ${i + 1}`), 'cây'],
        hs: [`Số học sinh của ${v.length} lớp lần lượt là ${sumText(v).replace(/ \+ /g, ', ')}. Trung bình mỗi lớp có bao nhiêu học sinh?`, v.map((_, i) => `Lớp ${i + 1}`), 'học sinh'],
        km: [`Một giải đua xe đạp có ${v.length} chặng dài ${sumText(v).replace(/ \+ /g, ' km, ')} km. Trung bình mỗi chặng dài bao nhiêu ki-lô-mét?`, v.map((_, i) => `Chặng ${i + 1}`), 'km'],
      }[kind];
      f.q.innerHTML = `<small>${T[0]}</small>Tổng: ${box(1)} · Trung bình: ${box(2)} ${T[2]}`;
      const t = createAvg(f.tool, { values: v, names: T[1], interactive: false });
      const m = await askSumAvg(f, t, v, { sumSay: `Tính tổng số ${T[2]} trước.`, avgSay: `Trung bình mỗi ${T[1][0].split(' ')[0].toLowerCase()} bao nhiêu ${T[2]}?` });
      f.finish({ ok: `(${sumText(v)}) : ${v.length} = ${fmt(m)} (${T[2]})` });
    },
  };
}

/** Số ở nhụy hoa = trung bình cộng các số ở cánh hoa (Luyện tập 1). */
function taskFlower() {
  return {
    id: 'flower',
    make: (rng) => { const n = rng.pick([3, 5]); return { v: avgSet(rng, n, 11, 39) }; },
    async mount(f, { v }) {
      const n = v.length, m = v.reduce((a, b) => a + b, 0) / n;
      f.q.innerHTML = `Số ở nhụy hoa bằng trung bình cộng các số ở cánh hoa. Nhụy hoa: ${box(1)}`;
      const t = createCanvas(f.tool);
      const [, H] = fit(t, 360, 1300);
      const cx = 500, cy = H / 2, R = Math.min(H * 0.42, 380), pr = R * 0.5;
      let g = `<path d="M${cx} ${cy + R * 0.3} Q${cx + 30} ${cy + R * 0.9} ${cx - 10} ${H}" stroke="#16A34A" stroke-width="16" fill="none"/>`;
      v.forEach((x, i) => {
        const an = (i / n) * 360 - 90, rad = an * Math.PI / 180;
        const px = cx + Math.cos(rad) * pr, py = cy + Math.sin(rad) * pr;
        g += `<g class="pp-petal"><ellipse cx="${px}" cy="${py}" rx="${R * 0.52}" ry="${R * 0.3}" transform="rotate(${an} ${px} ${py})" fill="#F9A8D4" stroke="${INK}" stroke-width="3"/>
          <text class="g4v-t" x="${cx + Math.cos(rad) * R * 0.66}" y="${cy + Math.sin(rad) * R * 0.66 + R * 0.07}" font-size="${R * 0.2}">${x}</text></g>`;
      });
      g += `<circle cx="${cx}" cy="${cy}" r="${R * 0.24}" fill="#FDE047" stroke="${INK}" stroke-width="3"/><text class="g4v-t pp-ctr" x="${cx}" y="${cy + R * 0.08}" font-size="${R * 0.22}" style="fill:#B45309">?</text>`;
      t.draw(g);
      await f.ask({ box: boxOf(f.q, 1), answer: m, say: `Hoa có ${n} cánh. Tìm số trung bình cộng của các số ở cánh hoa.`, hint: (_, w) => (w > 1 ? `(${sumText(v)}) : ${n} = ${m}.` : `Cộng ${n} số ở cánh hoa, rồi chia ${n}.`) });
      t.q('.pp-ctr').textContent = m;
      await t.anim('.pp-ctr', [{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'none', opacity: 1 }], 400);
      f.finish({ ok: `(${sumText(v)}) : ${n} = ${m}` });
    },
  };
}

/** Bao thóc tẻ và thóc nếp: trung bình mỗi bao (Luyện tập 2). */
function taskBags() {
  return {
    id: 'bags',
    make: (rng) => {
      for (;;) {
        const n1 = rng.int(4, 9), n2 = rng.int(2, 5), w1 = rng.int(45, 55), w2 = rng.int(50, 60);
        const W = n1 * w1 + n2 * w2;
        if (W % (n1 + n2) === 0 && w1 !== w2) return { n1, n2, W1: n1 * w1, W2: n2 * w2 };
      }
    },
    async mount(f, { n1, n2, W1, W2 }) {
      const n = n1 + n2, W = W1 + W2, m = W / n;
      f.q.innerHTML = `<small>Nhà bác Vân có ${n1} bao thóc tẻ cân nặng ${W1} kg và ${n2} bao thóc nếp cân nặng ${W2} kg. Trung bình mỗi bao nặng bao nhiêu ki-lô-gam?</small>Số bao: ${box(1)} · Tổng: ${box(2)} kg · Mỗi bao: ${box(3)} kg`;
      const t = createCanvas(f.tool);
      const [, H] = fit(t, 340, 1300);
      const tall = H > 800, per = tall ? 4 : Math.max(n1, n2);
      const rowsOf = (k) => Math.ceil(k / per);
      const nr = rowsOf(n1) + rowsOf(n2);
      const lf = Math.min(tall ? 64 : 52, H * 0.07);
      const sw = Math.min((940 / per) * 0.8, (H - 2 * lf * 1.5 - 40) / (nr * 1.25 * 1.08 + 0.4)), sh = sw * 1.25;
      let g = '', y = 14;
      const group = (k, fill, label) => {
        g += `<text class="g4v-t" x="30" y="${y + lf}" font-size="${lf}" style="text-anchor:start">${label}</text>`;
        y += lf * 1.5;
        for (let i = 0; i < k; i++) {
          const r = Math.floor(i / per), col = i % per, x = 30 + col * (sw / 0.8), yy = y + r * sh * 1.08;
          g += `<g class="pp-sack"><path d="M${x + sw * 0.2} ${yy + sh * 0.12} Q${x} ${yy + sh * 0.5} ${x + sw * 0.08} ${yy + sh * 0.9} Q${x + sw / 2} ${yy + sh * 1.02} ${x + sw * 0.92} ${yy + sh * 0.9} Q${x + sw} ${yy + sh * 0.5} ${x + sw * 0.8} ${yy + sh * 0.12} Z" fill="${fill}" stroke="${INK}" stroke-width="3"/>
            <path d="M${x + sw * 0.28} ${yy + sh * 0.12} Q${x + sw / 2} ${yy - sh * 0.05} ${x + sw * 0.72} ${yy + sh * 0.12}" fill="none" stroke="${INK}" stroke-width="3"/>
            <text class="g4v-t pp-each" x="${x + sw / 2}" y="${yy + sh * 0.66}" font-size="${sw * 0.32}" visibility="hidden" style="fill:#166534">${m}</text></g>`;
        }
        y += rowsOf(k) * sh * 1.08 + sh * 0.15;
      };
      group(n1, '#FEF3C7', `${n1} bao thóc tẻ: ${W1} kg`);
      group(n2, '#F1F5F9', `${n2} bao thóc nếp: ${W2} kg`);
      t.draw(g);
      await f.ask({ box: boxOf(f.q, 1), answer: n, say: 'Nhà bác Vân có tất cả bao nhiêu bao thóc?', hint: `${n1} cộng ${n2}.` });
      await f.ask({ box: boxOf(f.q, 2), answer: W, say: 'Tất cả các bao nặng bao nhiêu ki-lô-gam?', hint: `${W1} cộng ${W2}.` });
      await f.ask({ box: boxOf(f.q, 3), answer: m, say: 'Trung bình mỗi bao nặng bao nhiêu ki-lô-gam?', hint: `${W} chia ${n}.` });
      t.qa('.pp-each').forEach(e => e.setAttribute('visibility', 'visible'));
      await t.anim('.pp-each', [{ opacity: 0 }, { opacity: 1 }], 300, { stagger: 60 });
      f.finish({ ok: `(${W1} + ${W2}) : (${n1} + ${n2}) = ${m} (kg)` });
    },
  };
}

/** Ngày thứ hai nhiều hơn ngày thứ nhất d cái: trung bình mỗi ngày (Luyện tập 3). */
function taskMoreAvg() {
  return {
    id: 'more',
    make: (rng) => ({ a: rng.int(12, 40), d: rng.int(1, 6) * 2, th: rng.int(0, 2) }),
    async mount(f, { a, d, th }) {
      const [who, thing] = [['Rô-bốt', 'cái bánh giầy'], ['Bác An', 'cái giỏ tre'], ['Cô Hoa', 'bông hoa giấy']][th];
      const b = a + d, m = (a + b) / 2;
      f.q.innerHTML = `<small>Ngày thứ nhất ${who} làm được ${a} ${thing}. Ngày thứ hai làm được nhiều hơn ngày thứ nhất ${d} cái. Trung bình mỗi ngày làm được bao nhiêu?</small>Ngày thứ hai: ${box(1)} · Trung bình: ${box(2)}`;
      const t = createAvg(f.tool, { values: [a, b], names: ['Ngày 1', 'Ngày 2'], interactive: false, hidden: [1], cap: b * 1.15 });
      await f.ask({ box: boxOf(f.q, 1), answer: b, say: 'Ngày thứ hai làm được bao nhiêu?', hint: `${a} cộng ${d}.` });
      t.reveal(1);
      await sleep(500);
      await f.ask({ box: boxOf(f.q, 2), answer: m, say: 'Trung bình mỗi ngày làm được bao nhiêu?', hint: `(${a} cộng ${b}) chia 2.` });
      t.caption(`(${a} + ${b}) : 2 = <b>${m}</b>`);
      await t.level();
      t.showAvg(m);
      f.finish({ ok: `(${a} + ${b}) : 2 = ${m}` });
    },
  };
}

/** Biết trung bình cộng hai số và một số, tìm số kia (Luyện tập 4: Rô-bốt viết số nào?). */
function taskMissing() {
  return {
    id: 'miss',
    make: (rng) => { const m = rng.int(10, 40), d = rng.int(1, 9); return { m, x: rng() < 0.5 ? m + d : m - d }; },
    async mount(f, { m, x }) {
      const y = 2 * m - x;
      f.q.innerHTML = `<small>Mai viết số ${x}. Trung bình cộng của số Mai viết và số Rô-bốt viết bằng ${m}.</small>Tổng hai số: ${box(1)} · Rô-bốt viết: ${box(2)}`;
      const t = createAvg(f.tool, { values: [x, y], names: ['Mai', 'Rô-bốt'], interactive: false, hidden: [1], cap: Math.max(x, y) * 1.2 });
      t.showAvg(m);
      t.caption(`Trung bình cộng: <b>${m}</b>`);
      await f.ask({ box: boxOf(f.q, 1), answer: 2 * m, say: `Trung bình cộng của hai số là ${m}. Tổng hai số là bao nhiêu?`, hint: `Tổng = trung bình cộng nhân 2: ${m} nhân 2.` });
      await f.ask({ box: boxOf(f.q, 2), answer: y, say: 'Rô-bốt đã viết số nào?', hint: `Lấy tổng trừ số của Mai: ${2 * m} trừ ${x}.` });
      t.reveal(1);
      await sleep(800);
      f.finish({ ok: `${m} × 2 − ${x} = ${y}` });
    },
  };
}

// ══ Bài 47 ═══════════════════════════════════════════════════════════════════════════════════════════

/** Một hộp bánh (nắp đỏ) ở (x, y), rộng w. */
const cakeBox = (x, y, w, h, on, label) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.08}" fill="${on ? '#FCA5A5' : '#FECACA'}" stroke="${on ? '#B91C1C' : INK}" stroke-width="${on ? 7 : 3}"/>
  <rect x="${x - 4}" y="${y}" width="${w + 8}" height="${h * 0.28}" rx="${w * 0.06}" fill="#DC2626" stroke="${INK}" stroke-width="3"/>
  <circle cx="${x + w / 2}" cy="${y + h * 0.62}" r="${Math.min(w, h) * 0.24}" fill="#FDE68A" stroke="#B45309" stroke-width="3"/>
  ${label ? `<text class="g4v-t" x="${x + w / 2}" y="${y + h * 0.62 + Math.min(w, h) * 0.12}" font-size="${Math.min(w, h) * 0.32}" style="fill:#92400E">${label}</text>` : ''}`;

/** Ngoặc ngang trên (up) hoặc dưới các vật, từ x1 đến x2, nhãn. */
const hBrace = (x1, x2, y, up, s, fs, col = INK) => {
  const m = (x1 + x2) / 2, d = up ? -1 : 1;
  return `<path d="M${x1} ${y} Q${x1} ${y + d * 20} ${x1 + 20} ${y + d * 20} H${m - 14} Q${m} ${y + d * 20} ${m} ${y + d * 36} Q${m} ${y + d * 20} ${m + 14} ${y + d * 20} H${x2 - 20} Q${x2} ${y + d * 20} ${x2} ${y}" fill="none" stroke="${col}" stroke-width="3.5"/>
    <text class="g4v-t" x="${m}" y="${up ? y - 46 : y + 36 + fs}" font-size="${fs}" style="fill:${col}">${s}</text>`;
};

/** 6 hộp bánh: nhãn trên tổng, mỗi hộp (per), hộp đã chọn, ngoặc dưới m hộp. */
function boxesRow(t, { n = 6, total = 36, per = null, picked = new Set(), m = 4, ans = null, tap = false }) {
  const [, H] = fit(t, 380, 1000);
  const tall = H > 800;
  const gap = 18, w = (940 - gap * (n - 1)) / n, h = tall ? Math.min(w * 1.7, H * 0.3) : Math.min(w * 0.75, H * 0.32), y = H * 0.5 - h / 2, x0 = 30;
  const fs = tall ? 64 : Math.min(52, H * 0.09);
  let g = hBrace(x0, x0 + n * w + (n - 1) * gap, y - 10, true, `${total} cái bánh`, fs);
  for (let i = 0; i < n; i++) g += `<g class="pp-cbox" data-i="${i}" style="${tap ? 'cursor:pointer' : ''}">${cakeBox(x0 + i * (w + gap), y, w, h, picked.has(i), per)}</g>`;
  g += hBrace(x0, x0 + m * w + (m - 1) * gap, y + h + 10, false, ans != null ? `${ans} cái bánh` : '? cái bánh', fs, ans != null ? '#16A34A' : INK);
  t.draw(g);
  if (tap) t.qa('.pp-cbox').forEach((el) => { el.onclick = () => { const i = +el.dataset.i; if (picked.has(i) || picked.size >= m) return; picked.add(i); sfx.pop(picked.size); boxesRow(t, { n, total, per, picked, m, ans, tap }); t.emit('pick', picked.size); }; });
  return picked;
}

/** Can mật ong: bình lớn (jar lít) bên trái, n can bên phải, mỗi can chứa per lít; filled: số can đã đổ. */
function honey(t, { jar, n = 6, per = null, filled = 0, tap = false, jarLabel = null }) {
  const [, H] = fit(t, 380, 1100);
  const tall = H > 800;
  const fs = Math.min(50, H * 0.08);
  const jw = tall ? 300 : 220, jh = tall ? H * 0.34 : H * 0.62, jx = tall ? 350 : 40, jy = tall ? 40 : (H - jh) / 2 + 10;
  const cols = 3, rows = Math.ceil(n / cols);
  const ax = tall ? 40 : 320, aw = tall ? 920 : 650, ay = tall ? jy + jh + 70 : 60, ah = tall ? H - ay - 30 : H - 100;
  const cw = Math.min(aw / cols * 0.7, (ah / rows) * 0.55), ch = cw * 1.3;
  const fullJar = jarLabel ?? jar;
  let g = `<rect x="${jx}" y="${jy}" width="${jw}" height="${jh}" rx="30" fill="#FFFBEB" stroke="${INK}" stroke-width="4"/>
    <rect class="pp-jarfill" x="${jx + 6}" y="${jy + 6 + (jh - 12) * (1 - jar / Math.max(1, fullJar))}" width="${jw - 12}" height="${Math.max(0, (jh - 12) * (jar / Math.max(1, fullJar)))}" rx="24" fill="#F59E0B"/>
    <rect x="${jx + jw * 0.25}" y="${jy - 26}" width="${jw * 0.5}" height="30" rx="8" fill="#92400E"/>
    <text class="g4v-t" x="${jx + jw / 2}" y="${jy + jh / 2 + fs * 0.35}" font-size="${fs * 1.2}" style="paint-order:stroke;stroke:#fff;stroke-width:8px">${jar} l</text>`;
  for (let i = 0; i < n; i++) {
    const col = i % cols, r = Math.floor(i / cols);
    const x = ax + (aw / cols) * (col + 0.5) - cw / 2, y = ay + (ah / rows) * (r + 0.5) - ch / 2 + 10;
    const full = i < filled;
    g += `<g class="pp-can" data-i="${i}" style="${tap && !full ? 'cursor:pointer' : ''}"><path d="M${x + cw * 0.3} ${y - ch * 0.08} Q${x + cw / 2} ${y - ch * 0.3} ${x + cw * 0.7} ${y - ch * 0.08}" fill="none" stroke="${INK}" stroke-width="4"/>
      <rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="${cw * 0.12}" fill="${full ? '#FBBF24' : '#F8FAFC'}" stroke="${tap && !full ? '#60A5FA' : INK}" stroke-width="${tap && !full ? 5 : 3}" ${tap && !full ? 'stroke-dasharray="12 8"' : ''}/>
      ${full && per ? `<text class="g4v-t" x="${x + cw / 2}" y="${y + ch * 0.6}" font-size="${cw * 0.3}" style="fill:#78350F">${per} l</text>` : ''}</g>`;
  }
  t.draw(g);
}

const B47 = {
  explore: {
    setup: (board) => exCanvas(board),
    steps: [
      async (c) => {
        const t = c.t;
        boxesRow(t, {});
        t.caption('Có <b>36</b> cái bánh xếp đều vào <b>6</b> hộp. 4 hộp như vậy có bao nhiêu cái bánh?');
        await c.say('Có 36 cái bánh xếp đều vào 6 hộp. 4 hộp bánh như vậy có bao nhiêu cái bánh?');
        await c.say('Trước tiên tìm số bánh trong 1 hộp. Chọn phép tính.', 'Bước 1: số bánh trong <b>1 hộp</b>');
        await c.choose([{ html: '36 : 6', value: 1 }, { html: `36 ${X} 6`, value: 2 }, { html: '36 − 6', value: 3 }], 1, { hint: '36 cái bánh chia đều vào 6 hộp.' });
        boxesRow(t, { per: 6 });
        await t.anim('.pp-cbox', [{ transform: 'translateY(-16px)' }, { transform: 'none' }], 300, { stagger: 90 });
        t.caption('Số bánh trong mỗi hộp: 36 : 6 = <b>6</b> (cái)');
        await c.say('36 chia 6 bằng 6. Mỗi hộp có 6 cái bánh.');
      },
      async (c) => {
        const t = c.t;
        const picked = boxesRow(t, { per: 6, tap: true });
        t.caption('Bước 2: số bánh trong <b>4 hộp</b>');
        await c.say('Bây giờ tìm số bánh trong 4 hộp. Em chạm chọn 4 hộp.', 'Chạm chọn <b>4 hộp</b>');
        await c.until(t, () => picked.size === 4, { nudge: 'Chạm vào 4 hộp bánh.' });
        await c.say('Mỗi hộp 6 cái, có 4 hộp. Chọn phép tính.');
        await c.choose([{ html: `6 ${X} 4`, value: 1 }, { html: '6 + 4', value: 2 }, { html: '36 : 4', value: 3 }], 1, { hint: '6 cái được lấy 4 lần.' });
        boxesRow(t, { per: 6, picked, ans: 24 });
        t.caption(`Số bánh trong 4 hộp: 6 ${X} 4 = <b>24</b> (cái)`);
        await c.say('6 nhân 4 bằng 24. 4 hộp có 24 cái bánh. Bài toán giải bằng hai bước: tìm số bánh một hộp, rồi tìm số bánh 4 hộp. Đó là rút về đơn vị.',
          'Bước 1 chia: <b>1 hộp</b> · Bước 2 nhân: <b>4 hộp</b>');
      },
      async (c) => {
        const t = c.use((b) => exCanvas(b));
        honey(t, { jar: 18, n: 6 });
        t.caption('Có <b>18 l</b> mật ong đựng đều vào <b>6</b> can');
        await c.say('Có 18 lít mật ong đựng đều vào 6 can. Nếu có 12 lít mật ong thì đựng đều vào được mấy can như vậy?');
        await c.say('Trước tiên tìm số lít mật ong trong 1 can. Chọn phép tính.', 'Bước 1: số lít trong <b>1 can</b>');
        await c.choose([{ html: '18 : 6', value: 1 }, { html: `18 ${X} 6`, value: 2 }, { html: '18 − 6', value: 3 }], 1, { hint: '18 lít chia đều vào 6 can.' });
        honey(t, { jar: 0, jarLabel: 18, n: 6, per: 3, filled: 6 });
        t.caption('Mỗi can: 18 : 6 = <b>3 l</b>');
        await c.say('18 chia 6 bằng 3. Mỗi can đựng 3 lít.');
      },
      async (c) => {
        const t = c.t;
        let jar = 12, filled = 0;
        const draw = () => {
          honey(t, { jar, jarLabel: 12, n: 6, per: 3, filled, tap: true });
          t.qa('.pp-can').forEach((el) => { el.onclick = () => { if (+el.dataset.i !== filled || jar <= 0) return; jar -= 3; filled++; sfx.pop(filled); draw(); t.emit('fill', filled); }; });
        };
        draw();
        t.caption('Có <b>12 l</b> mật ong. Rót vào các can, mỗi can 3 l');
        await c.say('Bây giờ có 12 lít mật ong. Em chạm vào từng can trống để rót, mỗi can 3 lít, tới khi hết mật ong.', 'Chạm từng can để rót <b>3 l</b>');
        await c.until(t, () => jar === 0, { nudge: 'Chạm vào can trống tiếp theo để rót.' });
        await c.say('Hết mật ong. Đựng được mấy can? Chọn phép tính.');
        await c.choose([{ html: '12 : 3', value: 1 }, { html: `12 ${X} 3`, value: 2 }, { html: '12 : 6', value: 3 }], 1, { hint: 'Mỗi can 3 lít. 12 lít đựng được mấy lần 3 lít?' });
        t.caption('12 l đựng vào: 12 : 3 = <b>4</b> (can)');
        await c.say('12 chia 3 bằng 4. 12 lít mật ong đựng đều vào được 4 can.', 'Bước 1 chia: <b>1 can</b> · Bước 2 chia: <b>số can</b>');
      },
    ],
  },
  tasks: () => [taskUnit1(), taskPrice(), taskUnit2(), taskSticks(), taskUnit1({ money: true })],
};

/** Sơ đồ: thanh trên n phần (tổng T), thanh dưới k phần (hoặc độ dài L chưa chia) theo cùng tỉ lệ. */
function unitBars(t, { n, T, k, L = null, per = null, showK = false, ans = null, u = '' }) {
  const [, H] = fit(t, 360, 1300);
  const tall = H > 800;
  const fs = Math.min(tall ? 60 : 48, H * 0.075);
  const x0 = tall ? 40 : 200, span = tall ? 920 : 760;
  const len2 = L != null ? L : k * (T / n);
  const scale = span / Math.max(T, len2), pw = (T / n) * scale, bh = Math.min(110, H * 0.15);
  const y1 = H * (tall ? 0.28 : 0.24), y2 = H * (tall ? 0.62 : 0.6);
  let g = '';
  const pf = per ? Math.min(fs, pw * 0.4, (pw * 0.9) / (String(per).length * 0.58)) : 0;
  const parts = (y, cnt, cls, fill) => { let s = ''; for (let i = 0; i < cnt; i++) s += `<rect class="${cls}" x="${x0 + i * pw}" y="${y}" width="${pw}" height="${bh}" fill="${fill}" stroke="${INK}" stroke-width="3"/>${per ? `<text class="g4v-t" x="${x0 + (i + 0.5) * pw}" y="${y + bh / 2 + pf * 0.35}" font-size="${pf}">${per}</text>` : ''}`; return s; };
  g += parts(y1, n, 'pp-p1', '#BFDBFE') + hBrace(x0, x0 + n * pw, y1 - 8, true, `${fmt(T)} ${u}`, fs);
  if (L == null || showK) g += parts(y2, L == null ? k : L / (T / n), 'pp-p2', '#FBCFE8');
  else g += `<rect x="${x0}" y="${y2}" width="${len2 * scale}" height="${bh}" fill="#FBCFE8" stroke="${INK}" stroke-width="3"/>`;
  const end2 = x0 + len2 * scale;
  g += L == null
    ? hBrace(x0, end2, y2 + bh + 8, false, ans != null ? `${fmt(ans)} ${u}` : `? ${u}`, fs, ans != null ? '#16A34A' : INK)
    : hBrace(x0, end2, y2 - 8, true, `${fmt(L)} ${u}`, fs) + `<text class="g4v-t" x="${(x0 + end2) / 2}" y="${y2 + bh + fs + 20}" font-size="${fs}" style="fill:${ans != null ? '#16A34A' : INK}">${ans != null ? ans : '?'} phần</text>`;
  if (!tall) g += `<text class="g4v-t" x="${x0 - 24}" y="${y1 + bh / 2 + fs * 0.35}" font-size="${fs}" style="text-anchor:end">${n} phần</text>`
    + (L == null ? `<text class="g4v-t" x="${x0 - 24}" y="${y2 + bh / 2 + fs * 0.35}" font-size="${fs}" style="text-anchor:end">${k} phần</text>` : '');
  t.draw(g);
}

/** Dạng 1: tìm giá trị một phần (chia) rồi nhiều phần (nhân). */
function taskUnit1({ money = false } = {}) {
  const CTX = money
    ? [['quyển vở', 'quyển', 'đồng', 'Mua', 'hết'], ['cái bút chì', 'cái', 'đồng', 'Mua', 'hết']]
    : [['túi đường', 'túi', 'kg', 'Có', 'chia đều'], ['khay trứng', 'khay', 'quả', 'Xếp đều', 'vào'], ['hộp bánh', 'hộp', 'cái bánh', 'Có', 'xếp đều vào']];
  return {
    id: money ? 'unit1m' : 'unit1',
    make: (rng) => {
      const c = rng.int(0, CTX.length - 1), n = rng.int(3, 9);
      let k = rng.int(2, 9); if (k === n) k = n + 1;
      const per = money ? rng.pick([3, 4, 5, 6, 7, 8, 9, 12, 15]) * 1000 + rng.pick([0, 0, 500]) : rng.int(2, 12);
      return { c, n, k, per };
    },
    async mount(f, { c, n, k, per }) {
      const [thing, one, u] = CTX[c];
      const T = n * per;
      const text = money ? `Mua ${n} ${thing} cùng loại hết ${fmt(T)} đồng. Hỏi mua ${k} ${thing} như vậy hết bao nhiêu tiền?`
        : c === 0 ? `Có ${T} kg đường chia đều vào ${n} túi. Hỏi ${k} túi như vậy có bao nhiêu ki-lô-gam đường?`
          : c === 1 ? `Xếp đều ${T} quả trứng vào ${n} khay. Hỏi ${k} khay như vậy có bao nhiêu quả trứng?`
            : `Có ${T} cái bánh xếp đều vào ${n} hộp. Hỏi ${k} hộp như vậy có bao nhiêu cái bánh?`;
      f.q.innerHTML = `<small>${text}</small>1 ${one}: ${box(1)} ${u} · ${k} ${one}: ${box(2)} ${u}`;
      const t = createCanvas(f.tool);
      unitBars(t, { n, T, k, u: money ? 'đ' : u === 'cái bánh' ? 'cái' : u });
      await f.ask({ box: boxOf(f.q, 1), answer: per, say: `Bước một: tìm giá trị của 1 ${one}.`, hint: `${fmtSp(T)} chia ${n}.` });
      unitBars(t, { n, T, k, per: fmt(per), u: money ? 'đ' : u === 'cái bánh' ? 'cái' : u });
      await f.ask({ box: boxOf(f.q, 2), answer: per * k, say: `Bước hai: tìm giá trị của ${k} ${one}.`, hint: `${fmtSp(per)} nhân ${k}.` });
      unitBars(t, { n, T, k, per: fmt(per), ans: per * k, u: money ? 'đ' : u === 'cái bánh' ? 'cái' : u });
      f.finish({ ok: `${fmt(T)} : ${n} = ${fmt(per)} · ${fmt(per)} ${X} ${k} = ${fmt(per * k)} (${u})` });
    },
  };
}

/** Dạng 2: tìm giá trị một phần (chia) rồi số phần (chia) — thước đo góc, sữa chua, đổi giấy lấy cây. */
function taskUnit2() {
  const CTX = [
    ['thước đo góc', 'chiếc', 'đồng', (n, T, L) => `Việt mua ${n} chiếc thước đo góc cùng loại phải trả ${fmt(T)} đồng. Mai có ${fmt(L)} đồng thì mua được mấy chiếc thước như vậy?`],
    ['hộp sữa chua', 'vỉ', 'hộp', (n, T, L) => `${T} hộp sữa chua đóng đều được vào ${n} vỉ. Hỏi ${L} hộp sữa chua cùng loại đóng được mấy vỉ như vậy?`],
    ['giấy', 'cây', 'kg', (n, T, L) => `Đổi ${T} kg giấy được ${n} cây xanh. Hỏi đổi ${L} kg giấy cùng loại thì được mấy cây như vậy?`],
    ['mật ong', 'can', 'l', (n, T, L) => `Có ${T} l mật ong đựng đều vào ${n} can. Hỏi ${L} l mật ong thì đựng đều vào được mấy can như vậy?`],
  ];
  return {
    id: 'unit2',
    make: (rng) => {
      const c = rng.int(0, CTX.length - 1), n = rng.int(3, 8);
      let k = rng.int(2, 9); if (k === n) k = n + 1;
      const per = c === 0 ? rng.pick([5, 6, 7, 8, 9, 12, 15]) * 1000 : rng.int(2, 9);
      return { c, n, k, per };
    },
    async mount(f, { c, n, k, per }) {
      const [, one, u, text] = CTX[c];
      const T = n * per, L = k * per;
      f.q.innerHTML = `<small>${text(n, T, L)}</small>1 ${one}: ${box(1)} ${u} · Số ${one}: ${box(2)}`;
      const t = createCanvas(f.tool);
      const uu = c === 0 ? 'đ' : u;
      unitBars(t, { n, T, L, u: uu });
      await f.ask({ box: boxOf(f.q, 1), answer: per, say: `Bước một: tìm giá trị của 1 ${one}.`, hint: `${fmtSp(T)} chia ${n}.` });
      unitBars(t, { n, T, L, per: fmt(per), u: uu });
      await f.ask({ box: boxOf(f.q, 2), answer: k, say: `Bước hai: ${fmtSp(L)} ${u === 'đồng' ? 'đồng' : u} thì được mấy ${one}?`, hint: `${fmtSp(L)} chia ${fmtSp(per)}.` });
      unitBars(t, { n, T, L, per: fmt(per), showK: true, ans: k, u: uu });
      f.finish({ ok: `${fmt(T)} : ${n} = ${fmt(per)} · ${fmt(L)} : ${fmt(per)} = ${k} (${one})` });
    },
  };
}

/** Bảng giá như Hoạt động 3 (muối): k kg giá P → 1 kg, m kg. */
function taskPrice() {
  const CTX = [['muối', 'Số ki-lô-gam muối', [5000, 5500, 6000, 6500]], ['gạo', 'Số ki-lô-gam gạo', [16000, 18000, 20000, 22000, 25000]], ['táo', 'Số ki-lô-gam táo', [35000, 40000, 45000, 50000]]];
  return {
    id: 'price',
    make: (rng) => { const c = rng.int(0, 2), k = rng.int(2, 5); let m = rng.int(2, 6); if (m === k) m++; return { c, k, m, per: rng.pick(CTX[c][2]) }; },
    async mount(f, { c, k, m, per }) {
      injectPropsStyles();
      const [name, head] = CTX[c];
      f.q.innerHTML = `Số? <small>${k} kg ${name} giá ${fmt(k * per)} đồng.</small>`;
      f.tool.innerHTML = `<table class="g4pp-tab g4pp-price"><tbody>
        <tr><th>${head}</th><td>${k}</td><td>1</td><td>${m}</td></tr>
        <tr><th>Số tiền tương ứng (đồng)</th><td>${fmt(k * per)}</td><td>${box(1)}</td><td>${box(2)}</td></tr></tbody></table><div class="g4pp-tabnote">&nbsp;</div>`;
      const note = f.tool.querySelector('.g4pp-tabnote');
      await f.ask({ box: boxOf(f.tool, 1), answer: per, say: `${k} ki-lô-gam giá ${fmtSp(k * per)} đồng. 1 ki-lô-gam giá bao nhiêu?`, hint: `${fmtSp(k * per)} chia ${k}.` });
      note.innerHTML = `1 kg: ${fmt(k * per)} : ${k} = ${fmt(per)} đồng`;
      await f.ask({ box: boxOf(f.tool, 2), answer: per * m, say: `${m} ki-lô-gam giá bao nhiêu?`, hint: `${fmtSp(per)} nhân ${m}.` });
      note.innerHTML = `${m} kg: ${fmt(per)} ${X} ${m} = ${fmt(per * m)} đồng`;
      f.finish({ ok: `1 kg: ${fmt(per)} đồng · ${m} kg: ${fmt(per * m)} đồng` });
    },
  };
}

/** Que tính: 4 que xếp hình vuông chu vi P; chu vi hình khác (Luyện tập 2 trang 32). */
function taskSticks() {
  const SHAPES = [['tam giác', 3], ['hình chữ nhật', 6], ['hình thang', 8]];
  return {
    id: 'stick',
    make: (rng) => ({ len: rng.int(6, 25), s: rng.int(0, 2) }),
    async mount(f, { len, s }) {
      const [nm, cnt] = SHAPES[s];
      f.q.innerHTML = `<small>4 que tính xếp được hình vuông có chu vi ${len * 4} cm. Dùng que tính như vậy xếp ${nm}.</small>1 que: ${box(1)} cm · Chu vi ${nm}: ${box(2)} cm`;
      const t = createCanvas(f.tool);
      const [, H] = fit(t, 360, 1200);
      const tall = H > 800;
      const L = tall ? Math.min(320, H * 0.27) : Math.min(260, H * 0.55);
      const stick = (x1, y1, x2, y2) => `<line class="pp-stick" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#0EA5E9" stroke-width="16" stroke-linecap="round"/>`;
      const sh = (x1, y1, x2, y2) => { const dx = (x2 - x1) * 0.04, dy = (y2 - y1) * 0.04; return stick(x1 + dx, y1 + dy, x2 - dx, y2 - dy); };
      const [sx, sy] = tall ? [500 - L / 2, 50] : [80, (H - L) / 2];
      let g = sh(sx, sy, sx + L, sy) + sh(sx + L, sy, sx + L, sy + L) + sh(sx + L, sy + L, sx, sy + L) + sh(sx, sy + L, sx, sy);
      g += `<text class="g4v-t" x="${sx + L / 2}" y="${sy + L / 2 + 16}" font-size="${L * 0.2}">${len * 4} cm</text>`;
      const [ox, oy] = tall ? [500, sy + L + 120] : [400, H / 2 - L * 0.45];
      if (cnt === 3) { const h = L * 0.866; g += sh(ox - L / 2, oy + h, ox + L / 2, oy + h) + sh(ox + L / 2, oy + h, ox, oy) + sh(ox, oy, ox - L / 2, oy + h); }
      if (cnt === 6) { const x = tall ? ox - L : ox; g += sh(x, oy, x + L, oy) + sh(x + L, oy, x + 2 * L, oy) + sh(x + 2 * L, oy, x + 2 * L, oy + L) + sh(x + 2 * L, oy + L, x + L, oy + L) + sh(x + L, oy + L, x, oy + L) + sh(x, oy + L, x, oy); }
      if (cnt === 8) {
        // hình thang: đáy dưới 4 que, đáy trên 2 que, hai cạnh bên mỗi bên 1 que
        const s8 = tall ? Math.min(L * 0.7, 225) : Math.min(L * 0.75, 135), hh = s8 * 0.87, xb = tall ? 500 - 2 * s8 : ox, yb = oy + hh, tx = xb + s8;
        for (let i = 0; i < 4; i++) g += sh(xb + i * s8, yb, xb + (i + 1) * s8, yb);
        for (let i = 0; i < 2; i++) g += sh(tx + i * s8, yb - hh, tx + (i + 1) * s8, yb - hh);
        g += sh(xb, yb, tx, yb - hh) + sh(xb + 4 * s8, yb, tx + 2 * s8, yb - hh);
      }
      t.draw(g);
      await f.ask({ box: boxOf(f.q, 1), answer: len, say: 'Bước một: mỗi que tính dài bao nhiêu xăng-ti-mét?', hint: `Hình vuông có 4 que: ${len * 4} chia 4.` });
      await f.ask({ box: boxOf(f.q, 2), answer: len * cnt, say: `${nm[0].toUpperCase()}${nm.slice(1)} gồm mấy que? Tính chu vi.`, hint: `Đếm số que của ${nm}, rồi nhân với ${len}.` });
      f.finish({ ok: `${nm[0].toUpperCase()}${nm.slice(1)}: ${cnt} que ${X} ${len} cm = ${len * cnt} cm` });
    },
  };
}

export const PROPS2_LESSONS = { 40: B40, 42: B42, 46: B46, 47: B47 };

let styled = false;
export function injectPropsStyles() {
  if (styled) return;
  styled = true;
  css('g4-props2', `
    .g4-board:not(.g4-pboard) > .g4v.g4pp-ex, .g4-board:not(.g4-pboard) > .g4sd.g4pp-ex { padding-bottom: calc(min(6.4cqh, 3.6cqi) * 2 + 2cqh + 12px); }
    @media (orientation: portrait) { .g4-board:not(.g4-pboard) > .g4v.g4pp-ex, .g4-board:not(.g4-pboard) > .g4sd.g4pp-ex { padding-bottom: calc(min(5.2cqh, 7.4cqi) * 2.1 + 2cqh + 12px); } }
    .g4pp-sea { background: linear-gradient(180deg, #BAE6FD, #38BDF8); }
    .g4pp-nb { flex: none; display: flex; flex-direction: column; gap: 0.35em; padding: 0.4em 0.8em; margin: 0 auto; max-width: 100%; box-sizing: border-box;
      font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(8cqh, 3.6cqi); line-height: 1.3;
      background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 0.5em; }
    .g4pp-nb > div { white-space: nowrap; border-bottom: 1.5px dashed #DBEAFE; padding-bottom: 0.1em; }
    .g4pp-nb > div:last-child { border-bottom: 0; }
    .g4pp-tool-only .g4pp-nb { margin: auto; font-size: min(14cqh, 5.4cqi); }
    .g4-tool:not(:has(.g4pp-pic)) > .g4pp-nb { margin: auto; font-size: min(14cqh, 5.4cqi); }
    .g4pp-pic { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; container-type: size; }
    .g4pp-step { visibility: hidden; }
    .g4pp-step.g4pp-on { visibility: visible; animation: g4ppIn .35s ease-out; }
    @keyframes g4ppIn { from { opacity: 0; transform: translateY(-0.3em); } }
    .g4pp-hide { visibility: hidden; }
    .g4pp-tab { margin: auto; border-collapse: collapse; font-family: 'Baloo 2', sans-serif; font-weight: 800; text-align: center; font-size: min(9cqh, 3.2cqi); }
    .g4pp-price { font-size: min(12cqh, 3.8cqi); }
    .g4pp-tab th { background: #FFEDD5; border: 2px solid #FDBA74; padding: 0.15em 0.45em; white-space: nowrap; }
    .g4pp-tab td { border: 2px solid #FDBA74; padding: 0.25em 0.35em; background: #fff; }
    .g4pp-tab i { font-style: normal; }
    .g4pp-tab .g4-box { min-width: 2.2em; }
    .g4pp-grid { flex: none; margin: 0 auto; display: grid; grid-template-rows: auto auto; grid-auto-flow: column; border: 2px solid #FDBA74; border-radius: 0.4em; overflow: hidden;
      font-family: 'Baloo 2', sans-serif; font-weight: 800; text-align: center; font-size: min(8cqh, 3.2cqi); background: #FDBA74; gap: 2px; }
    .g4pp-grid > b { background: #FFEDD5; padding: 0.1em 0.45em; white-space: nowrap; }
    .g4pp-grid > span { background: #fff; padding: 0.2em 0.35em; }
    .g4pp-grid i { font-style: normal; }
    .g4pp-grid .g4-box { min-width: 2.2em; }
    .g4pp-tabnote { text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #15803D; font-size: min(8cqh, 3.4cqi); margin-bottom: auto; }
    @media (orientation: portrait) {
      .g4pp-nb { font-size: min(7cqh, 6.2cqi); padding: 0.3em 0.4em; }
      .g4pp-nb > div { white-space: normal; }
      .g4-tool:not(:has(.g4pp-pic)) > .g4pp-nb { font-size: min(11cqh, 8.4cqi); }
      .g4pp-tab { font-size: min(6cqh, 4.4cqi); }
      .g4pp-price { font-size: min(7cqh, 4.8cqi); }
      .g4pp-grid { grid-template-rows: none; grid-template-columns: auto auto; grid-auto-flow: row; font-size: min(5cqh, 6.4cqi); }
      .g4pp-tabnote { font-size: min(5cqh, 5cqi); }
    }
    @media (prefers-reduced-motion: reduce) { .g4pp-step.g4pp-on { animation: g4ppCalm .3s ease; } @keyframes g4ppCalm { from { opacity: 0; } } }
  `);
}
