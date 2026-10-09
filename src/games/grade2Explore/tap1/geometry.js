/**
 * Hình học Toán 2 trên giấy kẻ ô: Bài 25 (điểm, đoạn thẳng, đường thẳng, đường cong, ba điểm thẳng hàng),
 * Bài 26 (đường gấp khúc, hình tứ giác), Bài 27 (ghép hình, vẽ đoạn thẳng).
 * Điểm là chấm tròn có tên; em chạm điểm để nối, thước kẻ hiện ra, bút chì vẽ nét.
 */

import { createStage, gridPaper, waitTap, sleep, sfx, INK, svgEl, anim } from './stage.js';

const PEN = '#1D4ED8';
const ST = `stroke="${INK}" stroke-width="3" stroke-linejoin="round"`;

/** Tờ giấy có điểm; pts = { A: [x, y], … }. */
function createGeo(host, pts = {}, { grid = 50 } = {}) {
  const t = createStage(host, { bg: gridPaper(grid) });
  t.draw('<g class="x2g-lines"></g><g class="x2g-pts"></g><g class="x2g-top"></g>');
  t.P = {};
  t.points = (map, { tap = true, labelAt = {} } = {}) => {
    const box = t.q('.x2g-pts');
    for (const [name, [x, y]] of Object.entries(map)) {
      t.P[name] = [x, y];
      const [lx, ly] = labelAt[name] || [0, -46];
      box.insertAdjacentHTML('beforeend', `<g class="x2g-pt" ${tap ? `data-tap="p:${name}"` : ''} data-name="${name}" transform="translate(${x} ${y})">
        <circle r="34" fill="transparent"/><circle class="x2g-dot" r="16" fill="${INK}"/>
        <text class="x2a-t x2a-halo" x="${lx}" y="${ly}" font-size="56" fill="#B91C1C">${name}</text></g>`);
    }
  };
  t.pt = (n) => t.q(`[data-name="${n}"]`);
  t.mark = (n, on) => { const d = t.pt(n)?.querySelector('.x2g-dot'); if (d) { d.setAttribute('fill', on ? '#F59E0B' : INK); d.setAttribute("r", on ? 20 : 16); } };
  /** Vẽ đoạn từ a tới b (toạ độ hoặc tên điểm), có thước + nét bút chạy. */
  t.seg = async (a, b, { color = PEN, ruler = true, w = 7, ms = 650, cls = '' } = {}) => {
    const [x1, y1] = typeof a === 'string' ? t.P[a] : a, [x2, y2] = typeof b === 'string' ? t.P[b] : b;
    const len = Math.hypot(x2 - x1, y2 - y1), ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
    let r = null;
    if (ruler) {
      r = t.add(`<g transform="translate(${x1} ${y1}) rotate(${ang})" opacity="0.92"><rect x="-40" y="16" width="${len + 80}" height="54" rx="6" fill="#FDE68A" ${ST}/>
        ${Array.from({ length: Math.floor((len + 80) / 20) }, (_, i) => `<path d="M${-40 + i * 20 + 10} 16 v${i % 5 ? 12 : 22}" stroke="${INK}" stroke-width="2"/>`).join('')}</g>`, t.q('.x2g-top'));
      await t.anim(r, [{ opacity: 0 }, { opacity: 0.92 }], 250, { fill: 'forwards' });
    }
    const line = svgEl('path', { d: `M${x1} ${y1} L${x2} ${y2}`, stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', class: cls, 'stroke-dasharray': len, 'stroke-dashoffset': len });
    t.q('.x2g-lines').append(line);
    sfx.swish?.();
    await line.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: anim(ms), easing: 'ease-in-out', fill: 'forwards' }).finished.catch(() => {});
    line.setAttribute('stroke-dashoffset', 0); line.removeAttribute('stroke-dasharray');
    if (r) { await t.anim(r, [{ opacity: 0.92 }, { opacity: 0 }], 250, { fill: 'forwards' }); r.remove(); }
    return line;
  };
  t.text = (x, y, s, { fs = 40, fill = INK } = {}) => t.add(`<text class="x2a-t x2a-halo" x="${x}" y="${y}" font-size="${fs}" fill="${fill}">${s}</text>`, t.q('.x2g-top'));
  t.clear = () => { t.q('.x2g-lines').innerHTML = ''; t.q('.x2g-pts').innerHTML = ''; t.q('.x2g-top').innerHTML = ''; t.P = {}; };
  t.points(pts);
  return t;
}

/** Em chạm lần lượt các điểm theo thứ tự order; mỗi lần đúng thì vẽ đoạn từ điểm trước. */
async function tapPath(c, t, order, { close = false, nudge } = {}) {
  const seq = close ? [...order, order[0]] : order;
  let k = 0;
  let busy = false;
  const off = t.on(async (ev, key) => {
    if (ev !== 'tap' || busy || !key.startsWith('p:') || k >= seq.length) return;
    const n = key.slice(2);
    if (n !== seq[k]) { c.hint(`Chạm vào điểm ${seq[k]}.`); return; }
    busy = true;
    t.mark(n, true); sfx.tap?.();
    if (k > 0) await t.seg(seq[k - 1], n, { ruler: true, ms: 500 });
    k++;
    busy = false;
    t.emit('step', k);
  });
  try { await c.until(t, () => k >= seq.length && !busy, { nudge: nudge || (() => `Chạm vào điểm ${seq[Math.min(k, seq.length - 1)]}.`), el: () => t.pt(seq[Math.min(k, seq.length - 1)]) }); } finally { off(); }
  order.forEach((n) => t.mark(n, false));
}

const mini = (inner, vb = '0 0 120 60') => `<svg viewBox="${vb}" style="height:1.5em;width:3em;vertical-align:middle;overflow:visible" aria-hidden="true">${inner}</svg>`;

// ── Bài 25 ────────────────────────────────────────────────────────────────────────────────────────────
const b25 = {
  title: 'Bài 25: Điểm, đoạn thẳng, đường thẳng, đường cong',
  setup: (board) => createGeo(board),
  steps: [
    async (c) => {
      const t = c.t;
      const y = t.tall ? 520 : 400;
      t.points({ A: [200, y], B: [800, y] });
      await t.anim('.x2g-pt', [{ opacity: 0, transform: 'scale(0.2)' }, { opacity: 1, transform: 'none' }], 350, { stagger: 200, fill: 'backwards' });
      await c.say('Đây là điểm A và điểm B. Mỗi điểm vẽ bằng một chấm nhỏ, có tên là chữ in hoa.', '<b>Điểm A</b>, <b>điểm B</b>');
      await c.say('Chạm vào điểm A rồi chạm vào điểm B để dùng thước nối hai điểm.', 'Chạm <b>A</b> rồi chạm <b>B</b>');
      await tapPath(c, t, ['A', 'B']);
      t.caption('Đoạn thẳng <b>AB</b>');
      await c.say('Ta được đoạn thẳng AB. Đoạn thẳng có hai đầu là điểm A và điểm B.', 'Đoạn thẳng <b>AB</b>');
    },
    async (c) => {
      const t = c.t;
      const [ax, y] = t.P.A, [bx] = t.P.B;
      await c.say('Kéo dài đoạn thẳng AB về hai phía, ta được đường thẳng AB.', 'Kéo dài về hai phía → <b>đường thẳng AB</b>');
      await Promise.all([t.seg([ax, y], [-300, y], { ruler: false, ms: 700 }), t.seg([bx, y], [1300, y], { ruler: false, ms: 700 })]);
      t.caption('Đường thẳng <b>AB</b>');
      await sleep(200);
      t.add(`<path d="M80 ${y + 200} C 260 ${y + 60}, 420 ${y + 340}, 600 ${y + 180} S 860 ${y + 120}, 940 ${y + 220}" fill="none" stroke="#DB2777" stroke-width="7" stroke-linecap="round"/>`, t.q('.x2g-lines'));
      t.caption('Đường thẳng và <b>đường cong</b>');
      await c.say('Còn đường màu hồng này cong, không thẳng. Đó là đường cong.', 'Đường màu hồng: <b>đường cong</b>');
      c.show('Hình nào là <b>đường cong</b>?');
      await c.choose([
        { html: mini(`<path d="M5 30 H115" stroke="${PEN}" stroke-width="6"/>`), value: 1 },
        { html: mini(`<path d="M5 45 C 35 0, 75 60, 115 15" fill="none" stroke="#DB2777" stroke-width="6"/>`), value: 2 },
        { html: mini(`<path d="M10 30 H110" stroke="${PEN}" stroke-width="6"/><circle cx="10" cy="30" r="6"/><circle cx="110" cy="30" r="6"/>`), value: 3 },
      ], 2, { hint: 'Đường cong không thẳng, uốn lượn.' });
      await c.say('Đúng rồi!');
    },
    async (c) => {
      const t = c.t;
      t.clear();
      const T = t.tall;
      const P = T ? { A: [150, 300], M: [450, 520], B: [750, 740], C: [760, 330] } : { A: [150, 220], M: [450, 420], B: [750, 620], C: [780, 250] };
      t.points(P);
      t.caption('Ba điểm nào <b>thẳng hàng</b>?');
      await c.say('Ba điểm cùng nằm trên một đường thẳng gọi là ba điểm thẳng hàng. Tìm ba điểm thẳng hàng: chạm vào ba điểm đó.', 'Chạm vào <b>ba điểm thẳng hàng</b>');
      const want = ['A', 'M', 'B'];
      const got = new Set();
      const off = t.on((ev, key) => {
        if (ev !== 'tap' || !key.startsWith('p:')) return;
        const n = key.slice(2);
        if (!want.includes(n)) { c.hint('Đặt thước thử: điểm C không nằm trên đường thẳng với các điểm kia.'); t.mark(n, false); return; }
        got.add(n); t.mark(n, true); sfx.tap?.(); t.emit('got');
      });
      await c.until(t, () => got.size === 3, { nudge: 'Tìm ba điểm nằm trên cùng một đường thẳng.', el: () => t.pt(want.find((n) => !got.has(n))) });
      off();
      await t.seg([P.A[0] - 120, P.A[1] - 80], [P.B[0] + 120, P.B[1] + 80], { ruler: true, color: '#16A34A', w: 5, ms: 800 });
      t.caption('A, M, B là ba điểm <b>thẳng hàng</b>');
      await c.say('Thước đi qua cả ba điểm A, M, B. A, M, B là ba điểm thẳng hàng. Điểm C không thẳng hàng với chúng.');
      want.forEach((n) => t.mark(n, false));
    },
    async (c) => {
      const t = c.t;
      t.clear();
      const T = t.tall, u = 100, x0 = 90, y = T ? 560 : 400;
      t.points({ C: [x0, y], D: [x0 + 6 * u, y] }, { tap: false });
      await t.seg('C', 'D', { ruler: false, ms: 500 });
      let g = `<g class="x2g-ruler" transform="translate(${x0} ${y + 30})"><rect x="-30" y="0" width="${8 * u + 60}" height="90" rx="8" fill="#FDE68A" ${ST}/>`;
      for (let i = 0; i <= 8; i++) g += `<path d="M${i * u} 0 v34" stroke="${INK}" stroke-width="3"/><text class="x2a-t" x="${i * u}" y="60" font-size="42">${i}</text>`;
      for (let i = 0; i < 8; i++) g += `<path d="M${i * u + u / 2} 0 v18" stroke="${INK}" stroke-width="2"/>`;
      g += `<text class="x2a-t" x="${8 * u + 6}" y="80" font-size="22">cm</text></g>`;
      const r = t.add(g, t.q('.x2g-top'));
      await t.flyIn(r, 0, 220, 600, { lift: 30 });
      t.caption('Đoạn thẳng <b>CD</b> dài mấy xăng-ti-mét?');
      await c.say('Đặt thước sao cho vạch 0 trùng với điểm C. Điểm D ở vạch số mấy?', 'Vạch <b>0</b> trùng điểm C');
      await c.choose([{ html: '5 cm', value: 5 }, { html: '6 cm', value: 6 }, { html: '7 cm', value: 7 }], 6, { hint: 'Nhìn số trên thước ở ngay dưới điểm D.' });
      t.caption('CD = <b>6 cm</b>');
      await c.say('Điểm D ở vạch 6. Đoạn thẳng CD dài 6 xăng-ti-mét.');
    },
  ],
};

// ── Bài 26 ────────────────────────────────────────────────────────────────────────────────────────────
const SNAIL = `<g><path d="M-30 20 H34 Q44 20 40 10 L30 6" fill="#FDE68A" ${ST}/><circle cx="-6" cy="-2" r="22" fill="#FB923C" ${ST}/>
  <path d="M-6 -2 m-10 0 a10 10 0 1 0 10 -10" fill="none" stroke="${INK}" stroke-width="3"/><path d="M32 8 L38 -12 M38 8 L48 -10" stroke="${INK}" stroke-width="3"/></g>`;
const b26 = {
  title: 'Bài 26: Đường gấp khúc. Hình tứ giác',
  setup: (board) => createGeo(board),
  steps: [
    async (c) => {
      const t = c.t;
      const T = t.tall;
      const P = T ? { A: [120, 700], B: [330, 330], C: [600, 700], D: [880, 330] } : { A: [120, 560], B: [330, 240], C: [600, 560], D: [880, 240] };
      t.points(P, { labelAt: { A: [-30, 46], C: [0, 52], B: [0, -46], D: [0, -46] } });
      await c.say('Chạm lần lượt vào các điểm A, B, C, D để nối thành một đường.', 'Chạm lần lượt <b>A → B → C → D</b>');
      await tapPath(c, t, ['A', 'B', 'C', 'D']);
      t.caption('Đường gấp khúc <b>ABCD</b>');
      await c.say('Ta được đường gấp khúc ABCD. Nó gồm 3 đoạn thẳng: AB, BC và CD.', 'Đường gấp khúc <b>ABCD</b>: 3 đoạn AB, BC, CD');
    },
    async (c) => {
      const t = c.t;
      const { A, B, C, D } = t.P;
      const lab = (p, q, s) => t.text((p[0] + q[0]) / 2 + (p[1] > q[1] ? -50 : 50), (p[1] + q[1]) / 2, s, { fs: 42, fill: '#B45309' });
      lab(A, B, '2 cm'); lab(B, C, '3 cm'); lab(C, D, '4 cm');
      t.caption('Độ dài đường gấp khúc ABCD');
      await c.say('Đoạn AB dài 2 xăng-ti-mét, BC dài 3 xăng-ti-mét, CD dài 4 xăng-ti-mét. Chú ốc sên bò hết đường gấp khúc.', 'AB = 2 cm · BC = 3 cm · CD = 4 cm');
      const s = t.add(`<g transform="translate(${A[0]} ${A[1]})">${SNAIL}</g>`, t.q('.x2g-top'));
      const path = [A, B, C, D];
      for (let i = 1; i < path.length; i++) {
        const [x0, y0] = path[i - 1], [x1, y1] = path[i];
        s.setAttribute('transform', `translate(${x1} ${y1})`);
        await t.anim(s, [{ transform: `translate(${x0 - x1}px, ${y0 - y1}px)` }, { transform: 'none' }], 900, { easing: 'linear' });
        t.caption(['', 'Đã bò: 2 cm', 'Đã bò: 2 + 3 = 5 (cm)', 'Đã bò: 2 + 3 + 4 = ? (cm)'][i]);
      }
      c.show('Độ dài đường gấp khúc ABCD là?');
      await c.choose([{ html: '7 cm', value: 7 }, { html: '9 cm', value: 9 }, { html: '24 cm', value: 24 }], 9, { hint: 'Cộng độ dài ba đoạn: 2 cộng 3 cộng 4.' });
      t.caption('2 + 3 + 4 = <b>9</b> (cm)');
      await c.say('Độ dài đường gấp khúc là tổng độ dài các đoạn thẳng. 2 cộng 3 cộng 4 bằng 9 xăng-ti-mét.', 'Độ dài = <b>tổng độ dài các đoạn</b>: 9 cm');
    },
    async (c) => {
      const t = c.t;
      t.clear();
      const T = t.tall;
      const P = T ? { M: [200, 330], N: [760, 290], P: [850, 760], Q: [150, 690] } : { M: [220, 220], N: [760, 180], P: [840, 600], Q: [150, 560] };
      t.points(P, { labelAt: { P: [40, 40], Q: [-40, 40], M: [-30, -46], N: [30, -46] } });
      await c.say('Chạm lần lượt M, N, P, Q rồi chạm lại M để khép kín.', 'Chạm <b>M → N → P → Q → M</b>');
      await tapPath(c, t, ['M', 'N', 'P', 'Q'], { close: true });
      const poly = Object.values(P).map((p) => p.join(',')).join(' ');
      const f = t.add(`<polygon points="${poly}" fill="#BFDBFE" opacity="0.6"/>`, t.q('.x2g-lines'));
      t.q('.x2g-lines').prepend(f);
      await t.anim(f, [{ opacity: 0 }, { opacity: 0.6 }], 400);
      t.caption('Hình tứ giác <b>MNPQ</b>');
      c.show('Hình tứ giác MNPQ có mấy cạnh?');
      await c.choose([{ html: '3 cạnh', value: 3 }, { html: '4 cạnh', value: 4 }, { html: '5 cạnh', value: 5 }], 4, { hint: 'Đếm các đoạn thẳng màu xanh.' });
      await c.say('Hình tứ giác MNPQ có 4 cạnh: MN, NP, PQ, QM, và 4 đỉnh: M, N, P, Q.', '4 cạnh · 4 đỉnh');
    },
    async (c) => {
      c.show('Hình nào là <b>hình tứ giác</b>?');
      await c.say('Hình nào là hình tứ giác?');
      await c.choose([
        { html: mini(`<polygon points="10,55 60,5 110,55" fill="#FDE68A" stroke="${INK}" stroke-width="4"/>`), value: 1 },
        { html: mini(`<polygon points="15,10 95,4 112,56 4,50" fill="#BFDBFE" stroke="${INK}" stroke-width="4"/>`), value: 2 },
        { html: mini(`<circle cx="60" cy="30" r="27" fill="#FBCFE8" stroke="${INK}" stroke-width="4"/>`), value: 3 },
      ], 2, { hint: 'Hình tứ giác có 4 cạnh, 4 đỉnh.' });
      await c.say('Đúng rồi! Hình có 4 cạnh là hình tứ giác. Hình vuông, hình chữ nhật cũng là hình tứ giác.', 'Hình vuông, hình chữ nhật cũng là <b>hình tứ giác</b>');
    },
  ],
};

// ── Bài 27 ────────────────────────────────────────────────────────────────────────────────────────────
const b27 = {
  title: 'Bài 27: Ghép hình. Vẽ đoạn thẳng',
  setup: (board) => createGeo(board),
  steps: [
    async (c) => {
      const t = c.t;
      const T = t.tall, s = 200;
      // ô đích (hình vuông nét đứt), hai hình tam giác vuông ở bên trái / phía trên
      const [ox, oy] = T ? [400, 640] : [600, 300];
      t.add(`<rect x="${ox}" y="${oy}" width="${s}" height="${s}" fill="none" stroke="#94A3B8" stroke-width="5" stroke-dasharray="14 10"/>`, t.q('.x2g-lines'));
      const tri1 = t.add(`<g data-tap="t:1" transform="translate(${T ? 150 : 120} ${T ? 260 : 220})"><polygon points="0,0 ${s},${s} 0,${s}" fill="#F472B6" ${ST}/></g>`, t.q('.x2g-pts'));
      const tri2 = t.add(`<g data-tap="t:2" transform="translate(${T ? 560 : 160} ${T ? 260 : 470})"><polygon points="0,0 ${s},0 ${s},${s}" fill="#60A5FA" ${ST}/></g>`, t.q('.x2g-pts'));
      t.caption('Ghép hai hình tam giác');
      await c.say('Có hai hình tam giác giống nhau. Chạm vào từng hình để ghép vào khung nét đứt.', 'Chạm từng hình tam giác để <b>ghép</b>');
      let n = 0;
      const off = t.on(async (ev, key, g) => {
        if (ev !== 'tap' || !key.startsWith('t:') || g.classList.contains('x2a-off')) return;
        g.classList.add('x2a-off');
        const [x0, y0] = g.getAttribute('transform').match(/[-\d.]+/g).map(Number);
        g.setAttribute('transform', `translate(${ox} ${oy})`);
        sfx.pop?.(2);
        await t.flyIn(g, x0 - ox, y0 - oy, 600, { lift: 60 });
        n++; t.emit('fit', n);
      });
      await c.until(t, () => n >= 2, { nudge: 'Chạm vào hình tam giác chưa ghép.', el: () => [tri1, tri2].find((g) => !g.classList.contains('x2a-off')) });
      off();
      sfx.ding?.();
      c.show('Hai hình tam giác ghép được hình gì?');
      await c.choose([{ html: 'Hình vuông', value: 1 }, { html: 'Hình tròn', value: 2 }, { html: 'Hình tam giác', value: 3 }], 1, { hint: 'Hình mới có 4 cạnh bằng nhau.' });
      t.caption('Ghép được <b>hình vuông</b>');
      await c.say('Hai hình tam giác ghép thành một hình vuông.');
    },
    async (c) => {
      const t = c.t;
      t.clear();
      const T = t.tall, s = T ? 170 : 150, x0 = T ? 160 : 200, y0 = T ? 420 : 300;
      const stickAt = (x1, y1, x2, y2, extra = '') => `<g ${extra}><path d="M${x1} ${y1} L${x2} ${y2}" stroke="${INK}" stroke-width="18" stroke-linecap="round"/>
        <path d="M${x1} ${y1} L${x2} ${y2}" stroke="#FBBF24" stroke-width="11" stroke-linecap="round"/></g>`;
      let g = stickAt(x0, y0, x0, y0 + s);
      for (let i = 0; i < 3; i++) {
        const x = x0 + i * s;
        g += stickAt(x, y0, x + s, y0) + stickAt(x, y0 + s, x + s, y0 + s) + stickAt(x + s, y0, x + s, y0 + s);
      }
      t.add(g, t.q('.x2g-lines'));
      const x = x0 + 3 * s;
      const slots = [[x, y0, x + s, y0], [x, y0 + s, x + s, y0 + s], [x + s, y0, x + s, y0 + s]].map(([a, b2, cc, d], i) => t.add(
        `<g data-tap="k:${i}"><path d="M${a} ${b2} L${cc} ${d}" stroke="#94A3B8" stroke-width="14" stroke-dasharray="14 12" stroke-linecap="round"/><path d="M${a} ${b2} L${cc} ${d}" stroke="transparent" stroke-width="60"/></g>`, t.q('.x2g-pts')));
      t.caption('Xếp que tính thành các hình vuông');
      await c.say('Bạn Mai xếp que tính thành 3 hình vuông liền nhau, hết 10 que. Em xếp thêm hình vuông thứ tư: chạm vào 3 chỗ nét đứt.', 'Chạm <b>3 chỗ nét đứt</b> để xếp thêm que');
      let n = 0;
      const off = t.on((ev, key, el) => {
        if (ev !== 'tap' || !key.startsWith('k:') || el.classList.contains('x2a-off')) return;
        el.classList.add('x2a-off');
        const p = el.querySelector('path');
        el.innerHTML = stickAt(...p.getAttribute('d').match(/[-\d.]+/g).map(Number));
        t.pop(el); sfx.pop?.(++n); t.emit('stick', n);
      });
      await c.until(t, () => n >= 3, { nudge: 'Chạm vào chỗ nét đứt.', el: () => slots.find((e) => !e.classList.contains('x2a-off')) });
      off();
      c.show('Bốn hình vuông cần tất cả mấy que tính?');
      await c.choose([{ html: '12 que', value: 12 }, { html: '13 que', value: 13 }, { html: '16 que', value: 16 }], 13, { hint: 'Đã có 10 que, em vừa xếp thêm 3 que.' });
      t.caption('10 + 3 = <b>13</b> (que)');
      await c.say('10 que thêm 3 que là 13 que. Mỗi hình vuông mới chỉ cần thêm 3 que vì dùng chung một cạnh.', 'Mỗi hình vuông mới: thêm <b>3 que</b>');
    },
    async (c) => {
      const t = c.t;
      t.clear();
      const T = t.tall, u = 100, x0 = 80, y = T ? 560 : 400;
      t.points({ O: [x0, y] }, { tap: false, labelAt: { O: [0, -46] } });
      let g = `<g transform="translate(${x0} ${y + 24})"><rect x="-30" y="0" width="${8 * u + 60}" height="110" rx="8" fill="#FDE68A" ${ST}/>`;
      for (let i = 0; i <= 8; i++) g += `<g data-tap="m:${i}"><rect x="${i * u - 40}" y="0" width="80" height="110" fill="transparent"/><path d="M${i * u} 0 v40" stroke="${INK}" stroke-width="3"/><text class="x2a-t" x="${i * u}" y="72" font-size="44">${i}</text></g>`;
      for (let i = 0; i < 8; i++) g += `<path d="M${i * u + u / 2} 0 v22" stroke="${INK}" stroke-width="2"/>`;
      g += '</g>';
      t.add(g, t.q('.x2g-top'));
      t.caption('Vẽ đoạn thẳng <b>OA dài 5 cm</b>');
      await c.say('Vẽ đoạn thẳng OA dài 5 xăng-ti-mét. Vạch 0 của thước đặt ở điểm O. Chạm vào vạch số 5 trên thước để chấm điểm A.', 'Chạm vạch <b>5</b> trên thước');
      const draw = async (len, name) => {
        await waitTap(c, t, (k) => k === `m:${len}`, { nudge: `Chạm vào vạch số ${len} trên thước.`, bad: () => c.hint(`Đoạn thẳng dài ${len} xăng-ti-mét: chạm vạch số ${len}.`) });
        t.points({ [name]: [x0 + len * u, y] }, { tap: false });
        await t.seg('O', name, { ruler: false });
      };
      await draw(5, 'A');
      await c.say('Chấm điểm A ở vạch 5, rồi nối O với A. Được đoạn thẳng OA dài 5 xăng-ti-mét.', 'OA = <b>5 cm</b>');
    },
    async (c) => {
      const t = c.t;
      const T = t.tall, u = 100, x0 = 80, y = T ? 560 : 400;
      t.caption('Kéo dài thành đoạn <b>OB dài 8 cm</b>');
      await c.say('Bây giờ vẽ đoạn thẳng OB dài 8 xăng-ti-mét. Chạm vào vạch số mấy?', 'Chạm vạch <b>8</b> trên thước');
      await waitTap(c, t, (k) => k === 'm:8', { nudge: 'Chạm vào vạch số 8.', bad: () => c.hint('OB dài 8 xăng-ti-mét: chạm vạch số 8.') });
      t.points({ B: [x0 + 8 * u, y] }, { tap: false });
      await t.seg('A', 'B', { ruler: false, color: '#DC2626' });
      c.show('Đoạn AB dài mấy xăng-ti-mét?');
      await c.say('Đoạn OB dài 8 xăng-ti-mét. Đoạn AB màu đỏ dài mấy xăng-ti-mét?');
      await c.choose([{ html: '3 cm', value: 3 }, { html: '5 cm', value: 5 }, { html: '13 cm', value: 13 }], 3, { hint: 'Từ vạch 5 đến vạch 8 là mấy xăng-ti-mét?' });
      t.caption('8 − 5 = <b>3</b> (cm)');
      await c.say('8 trừ 5 bằng 3. Đoạn AB dài 3 xăng-ti-mét.');
    },
  ],
};

export const GEO_EXPLORES = { b25, b26, b27 };
