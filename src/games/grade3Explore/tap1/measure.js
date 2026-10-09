/**
 * Đo lường Lớp 3 Tập Một: Bài 30 (📏 thước có vạch mi-li-mét), Bài 31 (⚖️ cân đĩa với quả cân gam),
 * Bài 32 (🫗 ca 1 lít có vạch mi-li-lít, rót từng cốc), Bài 33 (🌡️ nhiệt kế độ C).
 */

import { stage, waitTap, tapTimes, flyFrom, pop, bump, T, R, C, L, BTN, sfx, sleep, INK, anim, fmt } from './kit.js';
import { ruler } from './geometry.js';

const RED = '#DC2626', GREEN = '#16A34A';
const base = (board) => { const t = stage(board); t.fit(); return t; };

// ── Bài 30 ────────────────────────────────────────────────────────────────────────────────────────────
export const B30 = {
  title: 'Bài 30: Mi-li-mét',
  setup: (board) => base(board),
  steps: [
    async (c) => {
      const t = c.t, G = t.G;
      const nCm = G.tall ? 4 : 5, u = 850 / nCm, x0 = 75, y = G.top + (G.bot - G.top) * 0.5;
      t.x0 = x0; t.u = u; t.y = y;
      t.caption('Thước có vạch <b>xăng-ti-mét</b> và vạch <b>mi-li-mét</b>');
      t.draw(`${ruler(x0, y, u, nCm, { mm: true, h: G.tall ? 170 : 120, fs: G.tall ? 56 : 44 })}<g class="x3m-n"></g><g class="x3m-obj"></g>
        ${BTN('go', 230, G.band + 6, 540, Math.min(G.bh - 24, 92), 'Đếm vạch nhỏ')}`);
      t.enable('go', false);
      await c.say('Từ vạch 0 đến vạch 1 là 1 xăng-ti-mét. Giữa hai vạch số có các vạch nhỏ. Bấm nút để đếm các khoảng nhỏ.', 'Bấm <b>Đếm vạch nhỏ</b>');
      t.enable('go');
      await waitTap(c, t, 'go', { nudge: 'Bấm nút ở dưới.' });
      t.enable('go', false);
      const g = t.q('.x3m-n');
      for (let i = 1; i <= 10; i++) {
        g.insertAdjacentHTML('beforeend', `<g>${R(x0 + ((i - 1) * u) / 10 + 1, y + 2, u / 10 - 2, 46, { fill: i % 2 ? '#F97316' : '#FDBA74', stroke: 'none', rx: 3 })}${T(x0 + ((i - 0.5) * u) / 10, y - 30, i, { fs: 30, fill: RED })}</g>`);
        pop(g.lastElementChild, 220); sfx.pop(i % 10);
        await sleep(260);
      }
      await c.say('1 xăng-ti-mét chia thành 10 phần bằng nhau. Mỗi phần dài 1 mi-li-mét. Mi-li-mét viết tắt là m m.', '<b>1 cm = 10 mm</b>');
    },
    async (c) => {
      const t = c.t, { x0, u, y } = t;
      t.q('.x3m-n').innerHTML = '';
      const len = 3.4, by = y - 110;
      t.caption('Cái bút chì dài bao nhiêu <b>mi-li-mét</b>?');
      const obj = t.q('.x3m-obj');
      obj.innerHTML = `<g>${R(x0, by, len * u - 60, 56, { fill: '#FACC15', stroke: INK, rx: 6 })}${R(x0, by, 40, 56, { fill: '#F9A8D4', stroke: INK, rx: 6 })}
        <path d="M${x0 + len * u - 60} ${by} L${x0 + len * u} ${by + 28} L${x0 + len * u - 60} ${by + 56} Z" fill="#FDE68A" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M${x0 + len * u - 18} ${by + 19} L${x0 + len * u} ${by + 28} L${x0 + len * u - 18} ${by + 37} Z" fill="${INK}"/></g>
        ${L(x0 + len * u, by + 28, x0 + len * u, y + 70, { stroke: RED, sw: 3, dash: '8 6' })}`;
      await flyFrom(obj.firstElementChild, 0, -160, 600);
      await c.say('Đầu bút chì đặt ở vạch 0. Đầu kia qua vạch 3 thêm 4 vạch nhỏ: 3 xăng-ti-mét và 4 mi-li-mét.', '3 cm và 4 mm');
      await c.choose([{ html: '34 mm', value: 34 }, { html: '7 mm', value: 7 }, { html: '43 mm', value: 43 }], 34, { hint: '3 cm = 30 mm, thêm 4 mm.' });
      await c.say('3 xăng-ti-mét là 30 mi-li-mét, thêm 4 mi-li-mét là 34 mi-li-mét.', '30 mm + 4 mm = <b>34 mm</b>');
    },
    async (c) => {
      await c.say('2 xăng-ti-mét bằng bao nhiêu mi-li-mét?', '<b>2 cm = ? mm</b>');
      await c.choose([{ html: '2 mm', value: 2 }, { html: '20 mm', value: 20 }, { html: '200 mm', value: 200 }], 20, { hint: '1 cm = 10 mm, nên 2 cm = 10 mm × 2.' });
      await c.say('2 xăng-ti-mét bằng 20 mi-li-mét. Còn 1 mét bằng một nghìn mi-li-mét.', '2 cm = 20 mm · 1 m = <b>1 000 mm</b>');
    },
    async (c) => {
      await c.say('So sánh: 5 xăng-ti-mét và 48 mi-li-mét. Đổi 5 xăng-ti-mét ra mi-li-mét trước.', '<b>5 cm ? 48 mm</b>');
      await c.choose([{ html: '&gt;', value: '>' }, { html: '&lt;', value: '<' }, { html: '=', value: '=' }], '>', { hint: '5 cm = 50 mm. So sánh 50 mm và 48 mm.' });
      await c.say('5 xăng-ti-mét bằng 50 mi-li-mét, lớn hơn 48 mi-li-mét.', '5 cm = 50 mm > 48 mm');
    },
  ],
};

// ── Bài 31: cân đĩa ───────────────────────────────────────────────────────────────────────────────────
const WEIGHTS = [100, 200, 500];
function createBalance(board, { left, leftArt }) {
  const t = base(board), G = t.G;
  const px = 500, py = G.top + (G.bot - G.top) * 0.28, arm = 300, drop = Math.min(200, (G.bot - G.top) * 0.36);
  const panW = 250;
  t.right = [];
  t.left = left;
  let ang = 0;
  const bw = 170, bh = Math.min(G.bh - 24, 92);
  t.draw(`
    ${R(px - 26, py, 52, G.bot - py - 10, { fill: '#94A3B8', rx: 10 })}${R(px - 130, G.bot - 34, 260, 34, { fill: '#64748B', rx: 12 })}
    <g class="x3w-beam">${R(px - arm - 10, py - 12, arm * 2 + 20, 24, { fill: '#475569', rx: 12 })}${C(px, py, 18, { fill: '#F59E0B' })}</g>
    <g class="x3w-pl"><g>${L(px - arm, py, px - arm - panW / 2 + 10, py + drop, { sw: 3 })}${L(px - arm, py, px - arm + panW / 2 - 10, py + drop, { sw: 3 })}
      <path d="M${px - arm - panW / 2} ${py + drop} H${px - arm + panW / 2} q-20 34 -60 34 H${px - arm - panW / 2 + 60} q-40 0 -60 -34 Z" fill="#CBD5E1" stroke="${INK}" stroke-width="3"/></g>
      <g class="x3w-lo">${leftArt(px - arm, py + drop)}</g></g>
    <g class="x3w-pr"><g>${L(px + arm, py, px + arm - panW / 2 + 10, py + drop, { sw: 3 })}${L(px + arm, py, px + arm + panW / 2 - 10, py + drop, { sw: 3 })}
      <path d="M${px + arm - panW / 2} ${py + drop} H${px + arm + panW / 2} q-20 34 -60 34 H${px + arm - panW / 2 + 60} q-40 0 -60 -34 Z" fill="#CBD5E1" stroke="${INK}" stroke-width="3"/></g>
      <g class="x3w-ro"></g></g>
    ${T(px + arm, G.top + 10, '&#160;', { fs: 44, cls: 'x3w-sum', fill: GREEN })}
    ${WEIGHTS.map((w, i) => BTN(`w${w}`, 500 - (bw * 3 + 40) / 2 + i * (bw + 20), G.band + 6, bw, bh, `+ ${w} g`, { fill: '#F59E0B', shade: '#B45309' })).join('')}`);
  const beam = t.q('.x3w-beam'), pl = t.q('.x3w-pl'), pr = t.q('.x3w-pr');
  [beam].forEach(e => { e.style.transformOrigin = `${px}px ${py}px`; });
  const weightArt = (w, x, y) => { const s = w === 500 ? 1.25 : w === 200 ? 1.05 : 0.85; return `${R(x - 38 * s, y - 64 * s, 76 * s, 64 * s, { fill: '#9CA3AF', rx: 12 * s })}${R(x - 14 * s, y - 80 * s, 28 * s, 18 * s, { fill: '#9CA3AF', rx: 6 })}${T(x, y - 30 * s, `${w}g`, { fs: 24 * s, fill: '#fff' })}`; };
  t.weightArt = weightArt;
  const layout = () => {
    const ro = t.q('.x3w-ro');
    ro.innerHTML = t.right.map((w, i) => `<g data-hot="r${i}">${weightArt(w, px + arm - 80 + (i % 3) * 80, py + drop - Math.floor(i / 3) * 90)}</g>`).join('');
    const sum = t.right.reduce((a, b) => a + b, 0);
    t.q('.x3w-sum').textContent = sum ? `${fmt(sum)} g` : ' ';
    return sum;
  };
  t.tilt = async () => {
    const sum = t.right.reduce((a, b) => a + b, 0);
    const next = sum === t.left ? 0 : sum > t.left ? 9 : -9; // độ, dương = bên phải hạ xuống
    const dy = (deg) => arm * Math.sin((deg * Math.PI) / 180);
    const ms = anim(600);
    await Promise.all([
      beam.animate([{ transform: `rotate(${ang}deg)` }, { transform: `rotate(${next}deg)` }], { duration: ms, easing: 'ease-in-out', fill: 'forwards' }).finished,
      pl.animate([{ transform: `translateY(${-dy(ang)}px)` }, { transform: `translateY(${-dy(next)}px)` }], { duration: ms, easing: 'ease-in-out', fill: 'forwards' }).finished,
      pr.animate([{ transform: `translateY(${dy(ang)}px)` }, { transform: `translateY(${dy(next)}px)` }], { duration: ms, easing: 'ease-in-out', fill: 'forwards' }).finished,
    ]);
    ang = next;
    if (!next) sfx.ding();
  };
  t.balanced = () => t.right.reduce((a, b) => a + b, 0) === t.left;
  // bấm quả cân ở khay: thêm; bấm quả cân trên đĩa: bỏ ra
  t.on(async (ev, id) => {
    if (ev !== 'tap' || t.locked) return;
    if (/^w\d+$/.test(id)) {
      if (t.right.length >= 6) return;
      t.right.push(+id.slice(1));
      layout();
      const el = t.q('.x3w-ro').lastElementChild, btnEl = t.hot(id).getBBox();
      sfx.pop(t.right.length);
      await flyFrom(el, btnEl.x + btnEl.width / 2 - (px + arm), btnEl.y - (py + drop), 520);
      await t.tilt();
      t.emit('change');
    } else if (/^r\d+$/.test(id)) {
      t.right.splice(+id.slice(1), 1);
      layout();
      sfx.tap();
      await t.tilt();
      t.emit('change');
    }
  });
  t.reset = () => { t.right = []; layout(); };
  layout();
  // lúc đầu đĩa phải trống: cân lệch về bên trái (đặt ngay, không chờ)
  ang = -9;
  beam.style.transform = `rotate(${ang}deg)`;
  pl.style.transform = `translateY(${arm * Math.sin((9 * Math.PI) / 180)}px)`;
  pr.style.transform = `translateY(${-arm * Math.sin((9 * Math.PI) / 180)}px)`;
  return t;
}

const apple = (x, y) => `${C(x, y - 62, 58, { fill: '#EF4444', sw: 3.5 })}<path d="M${x} ${y - 118} q6 -26 22 -34" stroke="#7C2D12" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M${x + 6} ${y - 116} q30 -30 50 -6 q-26 20 -50 6 Z" fill="#22C55E" stroke="${INK}" stroke-width="2.5"/>`;
const kgArt = (x, y) => `${R(x - 62, y - 100, 124, 100, { fill: '#6B7280', rx: 18 })}${R(x - 22, y - 124, 44, 28, { fill: '#6B7280', rx: 8 })}${T(x, y - 50, '1 kg', { fs: 40, fill: '#fff' })}`;

async function balanceUntil(c, t, target) {
  const off = t.on((ev) => {
    if (ev !== 'change') return;
    const sum = t.right.reduce((a, b) => a + b, 0);
    if (sum > target) c.hint('Đĩa bên phải nặng hơn rồi. Bấm vào một quả cân trên đĩa để bỏ ra.');
  });
  if (import.meta.env.DEV) {
    window.__x3aNext = () => {
      const sum = t.right.reduce((a, b) => a + b, 0);
      if (sum > target) return t.q('[data-hot^="r"]');
      const w = [...WEIGHTS].reverse().find(x => x <= target - sum);
      return w ? t.hot(`w${w}`) : null;
    };
  }
  await c.until(t, () => t.balanced(), { nudge: 'Thêm quả cân cho tới khi hai đĩa cân bằng.' });
  if (import.meta.env.DEV) window.__x3aNext = null;
  off();
  t.locked = true;
}

export const B31 = {
  title: 'Bài 31: Gam',
  setup: (board) => createBalance(board, { left: 300, leftArt: apple }),
  steps: [
    async (c) => {
      const t = c.t;
      t.locked = true;
      t.caption('Cân quả táo bằng <b>quả cân gam</b>');
      await c.say('Gam là một đơn vị đo khối lượng. Gam viết tắt là g. Quả táo đặt ở đĩa bên trái.', 'Gam viết tắt là <b>g</b>');
    },
    async (c) => {
      const t = c.t;
      t.locked = false;
      await c.say('Bấm các quả cân để đặt vào đĩa bên phải, cho tới khi cân thăng bằng.', 'Đặt quả cân cho tới khi <b>thăng bằng</b>');
      await balanceUntil(c, t, 300);
      await c.say('Cân thăng bằng. Quả táo cân nặng 300 gam.', 'Quả táo cân nặng <b>300 g</b>');
    },
    async (c) => {
      const t = c.use((b) => createBalance(b, { left: 1000, leftArt: kgArt }));
      t.caption('<b>1 kg</b> bằng bao nhiêu gam?');
      await c.say('Bây giờ đĩa bên trái có quả cân 1 ki-lô-gam. Đặt quả cân gam vào đĩa bên phải cho tới khi thăng bằng.', 'Cân <b>1 kg</b> bằng quả cân gam');
      await balanceUntil(c, t, 1000);
      await c.say('Đĩa bên phải có một nghìn gam.', 'Cân thăng bằng: <b>1 000 g</b>');
    },
    async (c) => {
      await c.say('Vậy 1 ki-lô-gam bằng bao nhiêu gam?', '<b>1 kg = ? g</b>');
      await c.choose([{ html: '100 g', value: 100 }, { html: '1 000 g', value: 1000 }, { html: '10 g', value: 10 }], 1000, { hint: 'Xem số gam trên đĩa bên phải khi cân thăng bằng.' });
      await c.say('1 ki-lô-gam bằng một nghìn gam.', '<b>1 kg = 1 000 g</b>');
    },
  ],
};

// ── Bài 32: ca 1 lít ──────────────────────────────────────────────────────────────────────────────────
function createJug(board, { level = 0 }) {
  const t = base(board), G = t.G;
  const jh = G.bot - G.top - 70, jw = Math.min(330, jh * 0.75), jx = 300 - jw / 2, jy = G.top + 50;
  const yOf = (ml) => jy + jh - (ml / 1000) * (jh - 20);
  t.ml = level;
  let marks = '';
  for (let m = 100; m <= 1000; m += 100) marks += `${L(jx + jw - 60, yOf(m), jx + jw, yOf(m), { sw: m % 500 ? 2.5 : 4, cap: 'butt' })}${T(jx + jw + 14, yOf(m), `${m}`, { fs: 30, anchor: 'start', w: 700 })}`;
  const cx = 770, cupH = Math.min(220, jh * 0.4), cupW = cupH * 0.7, cy = G.top + (G.bot - G.top) * 0.5;
  t.draw(`
    <clipPath id="x3j-clip"><rect x="${jx}" y="${jy}" width="${jw}" height="${jh}" rx="18"/></clipPath>
    <rect class="x3j-water" x="${jx}" y="${yOf(level)}" width="${jw}" height="${jy + jh - yOf(level)}" fill="#7DD3FC" clip-path="url(#x3j-clip)"/>
    ${R(jx, jy, jw, jh, { fill: 'none', stroke: INK, sw: 5, rx: 18 })}<path d="M${jx} ${jy + 40} q-80 10 -70 110 q6 60 70 70" fill="none" stroke="${INK}" stroke-width="6"/>
    ${marks}${T(jx + jw / 2, jy - 26, '1 l', { fs: 40 })}
    <g class="x3j-cup"><path d="M${cx - cupW / 2} ${cy - cupH} L${cx - cupW / 2 + 14} ${cy} H${cx + cupW / 2 - 14} L${cx + cupW / 2} ${cy - cupH} Z" fill="#E0F2FE" stroke="${INK}" stroke-width="4"/>
      <path d="M${cx - cupW / 2 + 5} ${cy - cupH * 0.85} L${cx - cupW / 2 + 15} ${cy - 3} H${cx + cupW / 2 - 15} L${cx + cupW / 2 - 5} ${cy - cupH * 0.85} Z" fill="#7DD3FC"/>
      ${T(cx, cy + 40, '200 ml', { fs: 40 })}</g>
    ${T(cx, cy + 110, '&#160;', { fs: 42, cls: 'x3j-lab', fill: '#0369A1' })}
    ${BTN('go', 230, G.band + 6, 540, Math.min(G.bh - 24, 92), 'Rót 1 cốc 200 ml')}`);
  t.enable('go', false);
  t.setLevel = async (ml) => {
    const w = t.q('.x3j-water'), y0 = yOf(t.ml), y1 = yOf(ml);
    await w.animate([{ y: `${y0}px`, height: `${jy + jh - y0}px` }, { y: `${y1}px`, height: `${jy + jh - y1}px` }], { duration: anim(700), easing: 'ease-in-out' }).finished.catch(() => {});
    w.setAttribute('y', y1); w.setAttribute('height', jy + jh - y1);
    t.ml = ml;
  };
  t.pour = async () => {
    const cup = t.q('.x3j-cup');
    cup.style.transformOrigin = `${cx}px ${cy}px`;
    await cup.animate([{ transform: 'none' }, { transform: `translate(${jx + jw + 40 - cx}px, ${jy - cy + cupH * 0.4}px) rotate(-70deg)` }], { duration: anim(500), fill: 'forwards' }).finished;
    sfx.swish();
    await t.setLevel(t.ml + 200);
    await cup.animate([{ transform: `translate(${jx + jw + 40 - cx}px, ${jy - cy + cupH * 0.4}px) rotate(-70deg)` }, { transform: 'none' }], { duration: anim(400), fill: 'forwards' }).finished;
    t.q('.x3j-lab').textContent = `Trong ca: ${fmt(t.ml)} ml`;
  };
  return t;
}

export const B32 = {
  title: 'Bài 32: Mi-li-lít',
  setup: (board) => createJug(board, { level: 0 }),
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('Ca <b>1 l</b> có vạch chia <b>mi-li-lít</b>');
      await c.say('Mi-li-lít là một đơn vị đo dung tích, viết tắt là m l. Ca này đựng được 1 lít, có các vạch 100, 200, đến một nghìn mi-li-lít.', 'Mi-li-lít viết tắt là <b>ml</b>');
    },
    async (c) => {
      const t = c.t;
      await c.say('Mỗi cốc đựng 200 mi-li-lít nước. Bấm nút để rót từng cốc vào ca cho tới khi đầy.', 'Rót cho tới khi đầy <b>1 l</b>');
      await tapTimes(c, t, 'go', 5, () => t.pour(), { nudge: 'Bấm nút để rót tiếp.' });
      await c.say('5 cốc, mỗi cốc 200 mi-li-lít, đầy ca 1 lít. Mực nước ở vạch một nghìn mi-li-lít.', '<b>1 l = 1 000 ml</b>');
    },
    async (c) => {
      const t = c.t;
      t.caption('Trong ca có bao nhiêu nước?');
      t.q('.x3j-lab').textContent = ' ';
      await t.setLevel(700);
      await c.say('Mực nước trong ca ở vạch nào?', 'Ca có ? ml nước');
      await c.choose([{ html: '600 ml', value: 600 }, { html: '700 ml', value: 700 }, { html: '800 ml', value: 800 }], 700, { hint: 'Nhìn số ở vạch ngang mặt nước.' });
      t.q('.x3j-lab').textContent = 'Trong ca: 700 ml';
      await c.say('Trong ca có 700 mi-li-lít nước.', '<b>700 ml</b>');
    },
    async (c) => {
      await c.say('Một cốc nước uống thường đựng khoảng bao nhiêu?', 'Một cốc nước khoảng:');
      await c.choose([{ html: '250 ml', value: 1 }, { html: '250 l', value: 2 }], 1, { hint: '250 lít là cả một thùng nước to.' });
      await c.say('Đúng! Cốc nước khoảng 250 mi-li-lít. Đo lượng nước ít thì dùng mi-li-lít.', 'Cốc nước ≈ <b>250 ml</b>');
    },
  ],
};

// ── Bài 33: nhiệt kế ──────────────────────────────────────────────────────────────────────────────────
function createThermo(board, { value = 10, lo = 0, hi = 50 }) {
  const t = base(board), G = t.G;
  const tx = G.tall ? 380 : 330, top = G.top + 30, bulb = G.bot - 70, th = bulb - 60 - top;
  const yOf = (v) => bulb - 60 - ((v - lo) / (hi - lo)) * th;
  t.value = value;
  let ticks = '';
  for (let v = lo; v <= hi; v++) {
    const big = v % 10 === 0, mid = v % 5 === 0;
    ticks += L(tx + 34, yOf(v), tx + 34 + (big ? 50 : mid ? 36 : 22), yOf(v), { sw: big ? 4 : 2, cap: 'butt' });
    if (big) ticks += T(tx + 100, yOf(v), v, { fs: 40, anchor: 'start' });
  }
  const bw = 170, bh = Math.min(G.bh - 24, 92);
  t.draw(`
    ${R(tx - 34, top - 20, 68, bulb - top + 10, { fill: '#F1F5F9', stroke: INK, sw: 4, rx: 34 })}${C(tx, bulb, 58, { fill: RED, sw: 4 })}
    <rect class="x3t-col" x="${tx - 14}" y="${yOf(value)}" width="28" height="${bulb - yOf(value)}" fill="${RED}"/>
    ${C(tx, bulb, 50, { fill: RED, stroke: 'none' })}
    ${ticks}${T(tx - 60, top + 10, '°C', { fs: 48, anchor: 'end', fill: '#0369A1' })}
    ${T(G.tall ? 790 : 780, (top + bulb) / 2 - 40, `${value} °C`, { fs: 84, cls: 'x3t-read', fill: RED })}
    <g class="x3t-pic"></g>
    ${[['dn', '− 1'], ['up', '+ 1'], ['up5', '+ 5']].map(([id, l], i) => BTN(id, 500 - (bw * 3 + 40) / 2 + i * (bw + 20), G.band + 6, bw, bh, l, { fill: i ? '#EF4444' : '#3B82F6', shade: i ? '#B91C1C' : '#1D4ED8' })).join('')}`);
  ['dn', 'up', 'up5'].forEach(id => t.enable(id, false));
  t.set = async (v, { show = true } = {}) => {
    const col = t.q('.x3t-col'), y0 = yOf(t.value), y1 = yOf(v);
    col.animate([{ y: `${y0}px`, height: `${bulb - y0}px` }, { y: `${y1}px`, height: `${bulb - y1}px` }], { duration: anim(380), easing: 'ease-out' });
    col.setAttribute('y', y1); col.setAttribute('height', bulb - y1);
    t.value = v;
    t.q('.x3t-read').textContent = show ? `${v} °C` : '? °C';
    t.emit('change');
  };
  t.on((ev, id) => {
    if (ev !== 'tap' || t.locked) return;
    const d = id === 'dn' ? -1 : id === 'up' ? 1 : id === 'up5' ? 5 : 0;
    if (!d) return;
    const v = Math.max(lo, Math.min(hi, t.value + d));
    sfx.tick?.(); t.set(v);
  });
  return t;
}

export const B33 = {
  title: 'Bài 33: Nhiệt độ. Đơn vị đo nhiệt độ',
  setup: (board) => createThermo(board, { value: 10 }),
  steps: [
    async (c) => {
      const t = c.t;
      t.locked = true;
      t.caption('Nhiệt kế đo <b>nhiệt độ</b>');
      await c.say('Đây là nhiệt kế. Độ C là đơn vị đo nhiệt độ, viết là °C. Mỗi vạch nhỏ là 1 độ C.', 'Đơn vị đo nhiệt độ: <b>°C</b> (độ C)');
      await c.say('Cột màu đỏ dâng lên tới vạch 10. Nhiệt kế chỉ 10 độ C.', 'Nhiệt kế chỉ <b>10 °C</b>');
    },
    async (c) => {
      const t = c.t;
      t.locked = false;
      ['dn', 'up', 'up5'].forEach(id => t.enable(id, true));
      t.caption('Trời nắng ấm: đưa nhiệt kế lên <b>25 °C</b>');
      await c.say('Trời ấm lên. Bấm các nút để cột đỏ dâng tới 25 độ C.', 'Đưa nhiệt kế tới <b>25 °C</b>');
      if (import.meta.env.DEV) window.__x3aNext = () => t.hot(t.value + 5 <= 25 ? 'up5' : t.value < 25 ? 'up' : 'dn');
      await c.until(t, () => t.value === 25, { nudge: () => (t.value < 25 ? 'Bấm nút cộng để tăng nhiệt độ.' : 'Bấm nút trừ để giảm nhiệt độ.') });
      if (import.meta.env.DEV) window.__x3aNext = null;
      t.locked = true;
      ['dn', 'up', 'up5'].forEach(id => t.enable(id, false));
      sfx.ding();
      await c.say('Đúng rồi! Cột đỏ ở giữa vạch 20 và vạch 30. Nhiệt kế chỉ 25 độ C.', '<b>25 °C</b>');
    },
    async (c) => {
      const t = c.t;
      t.caption('Nhiệt kế chỉ bao nhiêu độ C?');
      await t.set(32, { show: false });
      await c.say('Đọc nhiệt kế: cột đỏ ở vạch nào?', 'Đọc nhiệt kế');
      await c.choose([{ html: '23 °C', value: 23 }, { html: '32 °C', value: 32 }, { html: '35 °C', value: 35 }], 32, { hint: 'Qua vạch 30 thêm 2 vạch nhỏ.' });
      t.q('.x3t-read').textContent = '32 °C';
      await c.say('Nhiệt kế chỉ 32 độ C. Trời khá nóng.', '<b>32 °C</b>');
    },
    async (c) => {
      const t = c.t;
      t.caption('Nhiệt độ cơ thể người khoảng <b>37 °C</b>');
      await t.set(37);
      await c.say('Nhiệt độ cơ thể người khỏe mạnh khoảng 37 độ C. Bạn Nam đo được 39 độ C. Nam có bị sốt không?', 'Nam đo được <b>39 °C</b>. Nam bị sốt không?');
      await c.choose([{ html: 'Có, Nam bị sốt', value: 1 }, { html: 'Không', value: 2 }], 1, { hint: '39 °C cao hơn 37 °C.' });
      await t.set(39);
      await c.say('39 độ C cao hơn 37 độ C nhiều, Nam bị sốt, cần nghỉ ngơi và đi khám.', '39 °C > 37 °C: <b>bị sốt</b>');
    },
  ],
};
