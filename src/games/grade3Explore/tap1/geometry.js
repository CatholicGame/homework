/**
 * Hình học Lớp 3 Tập Một: Bài 7 (đường gấp khúc, ba điểm thẳng hàng), Bài 16 (điểm ở giữa, trung điểm),
 * Bài 17 (compa vẽ hình tròn, tâm, bán kính, đường kính), Bài 18 (ê ke kiểm tra góc vuông),
 * Bài 19 (tam giác, tứ giác, hình chữ nhật, hình vuông trên giấy ô vuông), Bài 21 (khối lập phương, khối hộp chữ nhật).
 */

import { stage, waitTap, tapTimes, flyFrom, pop, bump, T, R, C, L, BTN, sfx, sleep, INK, anim, calmMotion } from './kit.js';

const RED = '#DC2626', GREEN = '#16A34A', BLUE = '#2563EB';
const base = (board) => { const t = stage(board); t.fit(); return t; };
const btn = (t, id, label, w = 540) => BTN(id, 500 - w / 2, t.G.band + 6, w, Math.min(t.G.bh - 24, 92), label);
const dot = (x, y, name, { dx = 0, dy = -42, fill = INK, fs = 46, r = 9 } = {}) => `${C(x, y, r, { fill, stroke: fill, sw: 1 })}${name ? T(x + dx, y + dy, name, { fs }) : ''}`;

/** Thước kẻ cm: x0 = vạch 0, u = độ dài 1 cm, n cm; mm: vẽ vạch mi-li-mét. */
export function ruler(x0, y, u, n, { mm = false, h = 90, fs = 34 } = {}) {
  let s = R(x0 - u * 0.35, y, u * (n + 0.7), h, { fill: '#FDE68A', stroke: '#B45309', sw: 3, rx: 10 });
  for (let i = 0; i <= n * (mm ? 10 : 1); i++) {
    const cm = mm ? i % 10 === 0 : true, half = mm && i % 5 === 0 && !cm;
    const x = x0 + (mm ? (i * u) / 10 : i * u), len = cm ? h * 0.42 : half ? h * 0.3 : h * 0.2;
    s += L(x, y, x, y + len, { stroke: INK, sw: cm ? 3 : 2, cap: 'butt' });
    if (cm) s += T(x, y + h * 0.7, mm ? i / 10 : i, { fs, w: 700 });
  }
  return `<g class="x3g-ruler">${s}</g>`;
}

/** Con kiến nhỏ (đầu bên phải), tâm ở (x, y). */
const antArt = (x, y) => `<g stroke="${INK}" stroke-width="3" stroke-linecap="round" fill="none">
    ${[-14, 0, 14].map(d => `<path d="M${x + d} ${y} l${-8} 18 M${x + d} ${y} l8 -16"/>`).join('')}
    <path d="M${x + 30} ${y - 10} q8 -16 18 -14 M${x + 30} ${y - 10} q14 -8 22 0"/></g>
  <ellipse cx="${x - 26}" cy="${y}" rx="22" ry="16" fill="#7C2D12" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="${x}" cy="${y}" rx="14" ry="11" fill="#9A3412" stroke="${INK}" stroke-width="3"/>
  ${C(x + 24, y - 4, 13, { fill: '#7C2D12', sw: 3 })}${C(x + 28, y - 8, 3, { fill: '#fff', stroke: 'none' })}`;

// ── Bài 7 ─────────────────────────────────────────────────────────────────────────────────────────────
export const B7 = {
  title: 'Bài 7: Đường gấp khúc, ba điểm thẳng hàng',
  setup: (board) => base(board),
  steps: [
    async (c) => {
      const t = c.t, G = t.G;
      const sc = Math.min(G.tall ? 1.6 : 1.25, (G.bot - G.top - 150) / 330);
      const y0 = G.top + 50 + Math.max(0, (G.bot - G.top - 150 - 330 * sc) / 2), P = { A: [120, y0 + 300 * sc], B: [330, y0 + 60 * sc], C: [620, y0 + 330 * sc], D: [880, y0 + 90 * sc] };
      const len = { AB: 3, BC: 4, CD: 2 };
      t.caption('Con kiến bò theo đường gấp khúc <b>ABCD</b>');
      t.draw(`${['AB', 'BC', 'CD'].map(k => { const [a, b] = [P[k[0]], P[k[1]]]; return `${L(a[0], a[1], b[0], b[1], { sw: 7, cls: `x3g-s-${k}` })}${T((a[0] + b[0]) / 2 + 30, (a[1] + b[1]) / 2 + 20, `${len[k]} cm`, { fs: G.tall ? 54 : 42, fill: BLUE })}`; }).join('')}
        ${Object.entries(P).map(([n, [x, y]]) => dot(x, y, n, { dy: n === 'B' || n === 'D' ? -42 : 46, dx: n === 'D' ? 44 : 0 })).join('')}
        <g class="x3g-ant">${antArt(P.A[0], P.A[1] - 26)}</g>
        ${T(500, G.bot - 30, '&#160;', { fs: 52, cls: 'x3g-eq' })}
        ${btn(t, 'go', '🐜 Cho kiến bò')}`);
      t.enable('go', false);
      await c.say('Đường gấp khúc ABCD gồm ba đoạn thẳng AB, BC, CD. Bấm nút để con kiến bò.', 'Bấm <b>Cho kiến bò</b>');
      t.enable('go');
      await waitTap(c, t, 'go', { nudge: 'Bấm nút ở dưới.' });
      t.enable('go', false);
      const ant = t.q('.x3g-ant'), sum = [];
      for (const k of ['AB', 'BC', 'CD']) {
        const [a, b] = [P[k[0]], P[k[1]]];
        const from = [a[0] - P.A[0], a[1] - P.A[1]], to = [b[0] - P.A[0], b[1] - P.A[1]];
        await ant.animate([{ transform: `translate(${from[0]}px, ${from[1]}px)` }, { transform: `translate(${to[0]}px, ${to[1]}px)` }], { duration: anim(900), fill: 'forwards' }).finished;
        t.q(`.x3g-s-${k}`).setAttribute('stroke', '#F97316');
        sum.push(len[k]); sfx.pop(sum.length);
        t.q('.x3g-eq').textContent = `${sum.join(' + ')}${sum.length === 3 ? ' = ?' : ''}`;
      }
      await c.say('Con kiến đã bò hết ba đoạn thẳng AB, BC, CD.', 'Kiến bò qua <b>AB, BC, CD</b>');
    },
    async (c) => {
      const t = c.t;
      await c.say('Độ dài đường gấp khúc là tổng độ dài các đoạn thẳng. Con kiến bò bao nhiêu xăng-ti-mét?', '3 + 4 + 2 = ? (cm)');
      await c.choose([{ html: '7 cm', value: 7 }, { html: '9 cm', value: 9 }, { html: '24 cm', value: 24 }], 9, { hint: 'Cộng độ dài ba đoạn: 3 + 4 + 2.' });
      t.q('.x3g-eq').textContent = '3 + 4 + 2 = 9 (cm)';
      await c.say('Con kiến bò 9 xăng-ti-mét.', 'Độ dài đường gấp khúc ABCD: <b>9 cm</b>');
    },
    async (c) => {
      const t = c.t, G = t.G;
      const y = (G.top + G.bot) / 2 + 30, P = { A: [150, y], M: [440, y], B: [820, y], C: [520, y - Math.min(200, (G.bot - G.top) * 0.35)] };
      t.caption('Ba điểm <b>thẳng hàng</b>');
      t.draw(`${Object.entries(P).map(([n, [x, yy]]) => dot(x, yy, n, { dy: 46 })).join('')}
        <g class="x3g-rul">${R(60, y - 70, 880, 60, { fill: '#FDE68A', stroke: '#B45309', rx: 8 })}</g>
        <g class="x3g-ln"></g>
        ${btn(t, 'go', '📏 Đặt thước qua A và B')}`);
      t.enable('go', false);
      await c.say('Ba điểm cùng nằm trên một đường thẳng gọi là ba điểm thẳng hàng. Bấm nút để đặt thước qua A và B.', 'Đặt thước qua <b>A</b> và <b>B</b>');
      t.enable('go');
      await waitTap(c, t, 'go', { nudge: 'Bấm nút ở dưới.' });
      t.enable('go', false);
      const rul = t.q('.x3g-rul');
      await rul.animate([{ transform: 'translate(0px, -120px)', opacity: 0 }, { transform: 'translate(0px, 30px)', opacity: 1 }], { duration: anim(700), fill: 'forwards' }).finished;
      t.q('.x3g-ln').innerHTML = L(90, y, 910, y, { stroke: BLUE, sw: 4, dash: '14 10' });
      pop(t.q('.x3g-ln'));
      await c.say('Mép thước đi qua A, M và B. Điểm C nằm ngoài thước.', 'Thước đi qua A, M, B');
    },
    async (c) => {
      await c.say('Ba điểm nào thẳng hàng?', 'Ba điểm nào thẳng hàng?');
      await c.choose([{ html: 'A, M, B', value: 1 }, { html: 'A, C, B', value: 2 }, { html: 'M, C, B', value: 3 }], 1, { hint: 'Ba điểm thẳng hàng cùng nằm trên mép thước.' });
      await c.say('Đúng! A, M, B là ba điểm thẳng hàng.', '<b>A, M, B</b> thẳng hàng');
    },
  ],
};

// ── Bài 16 ────────────────────────────────────────────────────────────────────────────────────────────
export const B16 = {
  title: 'Bài 16: Điểm ở giữa, trung điểm của đoạn thẳng',
  setup: (board) => base(board),
  steps: [
    async (c) => {
      const t = c.t, G = t.G;
      const y = G.top + (G.bot - G.top) * 0.45;
      t.caption('Điểm <b>ở giữa</b> hai điểm');
      t.draw(`${L(150, y, 850, y, { sw: 6 })}${dot(150, y, 'A', { dy: 50 })}${dot(850, y, 'B', { dy: 50 })}${dot(400, y, 'M', { dy: 50, fill: RED })}
        ${dot(560, y - Math.min(170, (G.bot - G.top) * 0.3), 'N', { fill: BLUE })}`);
      await c.say('A, M, B là ba điểm thẳng hàng, điểm M nằm giữa A và B. Ta nói M là điểm ở giữa hai điểm A và B.', 'M là điểm <b>ở giữa</b> A và B');
      await c.say('Điểm N có phải là điểm ở giữa A và B không?', 'N có ở giữa A và B không?');
      await c.choose([{ html: 'Có', value: 1 }, { html: 'Không', value: 2 }], 2, { hint: 'N không nằm trên đoạn thẳng AB.' });
      await c.say('Đúng! N không nằm trên đường thẳng đi qua A và B, nên N không ở giữa A và B.', 'Điểm ở giữa phải <b>thẳng hàng</b> với A, B');
    },
    async (c) => {
      const t = c.t, G = t.G;
      const u = 120, x0 = 140, y = G.top + (G.bot - G.top) * 0.45;
      t.caption('Đoạn thẳng AB dài <b>6 cm</b>. Tìm <b>trung điểm</b>.');
      t.draw(`${L(x0, y, x0 + 6 * u, y, { sw: 6 })}${dot(x0, y, 'A')}${dot(x0 + 6 * u, y, 'B')}
        ${ruler(x0, y + 18, u, 6, { fs: 36 })}
        ${[1, 2, 3, 4, 5].map(k => `<g data-hot="m${k}">${C(x0 + k * u, y, 26, { fill: 'rgba(255,255,255,0.01)', stroke: '#94A3B8', sw: 3, extra: 'stroke-dasharray="6 5"' })}</g>`).join('')}
        <g class="x3g-mid"></g>`);
      await c.say('Trung điểm của đoạn thẳng là điểm ở giữa, chia đoạn thẳng thành hai phần dài bằng nhau. Đoạn thẳng AB dài 6 xăng-ti-mét.', '<b>Trung điểm</b>: chia đoạn thẳng thành hai phần bằng nhau');
    },
    async (c) => {
      const t = c.t, G = t.G;
      const u = 120, x0 = 140, y = G.top + (G.bot - G.top) * 0.45;
      await c.say('Bấm vào chỗ trung điểm trên đoạn thẳng AB.', 'Bấm vào <b>trung điểm</b> của AB');
      await waitTap(c, t, 'm3', { glow: false, wrong: (id) => `Chỗ đó cách A ${id.slice(1)} cm, cách B ${6 - id.slice(1)} cm. Hai phần chưa bằng nhau.`, nudge: 'Trung điểm cách A 3 cm, cách B 3 cm.' });
      t.qa('[data-hot^="m"]').forEach(e => e.remove());
      const g = t.q('.x3g-mid');
      g.innerHTML = `${dot(x0 + 3 * u, y, 'M', { fill: RED })}
        <path d="M${x0} ${y - 70} q0 -20 20 -20 H${x0 + 1.5 * u - 18} q18 0 18 -18 q0 18 18 18 H${x0 + 3 * u - 20} q20 0 20 20" fill="none" stroke="${GREEN}" stroke-width="3"/>${T(x0 + 1.5 * u, y - 140, '3 cm', { fs: 40, fill: GREEN })}
        <path d="M${x0 + 3 * u} ${y - 70} q0 -20 20 -20 H${x0 + 4.5 * u - 18} q18 0 18 -18 q0 18 18 18 H${x0 + 6 * u - 20} q20 0 20 20" fill="none" stroke="${GREEN}" stroke-width="3"/>${T(x0 + 4.5 * u, y - 140, '3 cm', { fs: 40, fill: GREEN })}`;
      pop(g); sfx.ding();
      await c.say('M là trung điểm của đoạn thẳng AB: AM bằng MB bằng 3 xăng-ti-mét.', '<b>AM = MB = 3 cm</b>');
    },
    async (c) => {
      const t = c.t;
      await c.say('Thử với: đoạn thẳng CD dài 8 xăng-ti-mét. Trung điểm cách C mấy xăng-ti-mét?', 'CD = 8 cm. Trung điểm cách C ? cm');
      await c.choose([{ html: '2 cm', value: 2 }, { html: '4 cm', value: 4 }, { html: '8 cm', value: 8 }], 4, { hint: 'Chia đôi 8 cm: 8 : 2.' });
      await c.say('Đúng! 8 chia 2 bằng 4. Trung điểm chia đoạn thẳng thành hai nửa bằng nhau.', '8 : 2 = <b>4</b> (cm)');
      void t;
    },
  ],
};

// ── Bài 17 ────────────────────────────────────────────────────────────────────────────────────────────
export const B17 = {
  title: 'Bài 17: Hình tròn. Tâm, bán kính, đường kính',
  setup: (board) => base(board),
  steps: [
    async (c) => {
      const t = c.t, G = t.G;
      const cy = (G.top + G.bot) / 2, r = Math.min(G.tall ? 390 : 250, (G.bot - G.top) / 2 - 50), cx = 500;
      t.r = r; t.cy = cy;
      const per = 2 * Math.PI * r;
      t.caption('Dùng <b>compa</b> vẽ hình tròn');
      t.draw(`<circle class="x3g-circ" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${BLUE}" stroke-width="6" stroke-dasharray="${per}" stroke-dashoffset="${per}" transform="rotate(-90 ${cx} ${cy})"/>
        ${dot(cx, cy, 'O', { dx: -30, dy: 30 })}
        <g class="x3g-comp">${L(cx, cy, cx + r / 2, cy - r * 1.1, { stroke: '#64748B', sw: 10 })}${L(cx + r / 2, cy - r * 1.1, cx + r, cy, { stroke: '#64748B', sw: 10 })}
          ${C(cx + r / 2, cy - r * 1.1, 16, { fill: '#F59E0B' })}${L(cx + r * 0.94, cy - 14, cx + r, cy, { stroke: '#F97316', sw: 12 })}</g>
        <g class="x3g-r"></g>
        ${btn(t, 'go', '✏️ Quay compa')}`);
      t.enable('go', false);
      await c.say('Đây là cái compa. Đặt đầu nhọn của compa ở điểm O, đầu bút chì cách O 3 xăng-ti-mét.', 'Đầu nhọn ở <b>O</b>, đầu bút chì cách O <b>3 cm</b>');
    },
    async (c) => {
      const t = c.t, cx = 500, cy = t.cy, r = t.r, per = 2 * Math.PI * r;
      await c.say('Giữ đầu nhọn ở O, bấm nút để quay compa một vòng.', 'Bấm <b>Quay compa</b>');
      t.enable('go');
      await waitTap(c, t, 'go', { nudge: 'Bấm nút ở dưới.' });
      t.enable('go', false);
      const comp = t.q('.x3g-comp');
      comp.style.transformOrigin = `${cx}px ${cy}px`;
      await Promise.all([
        t.q('.x3g-circ').animate([{ strokeDashoffset: per }, { strokeDashoffset: 0 }], { duration: anim(2200), fill: 'forwards' }).finished,
        comp.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], { duration: anim(2200), fill: 'forwards' }).finished,
      ]);
      sfx.ding();
      await c.say('Compa vẽ được một hình tròn. O là tâm của hình tròn.', 'O là <b>tâm</b> hình tròn');
    },
    async (c) => {
      const t = c.t, cx = 500, cy = t.cy, r = t.r;
      const pts = [['A', -40], ['B', 200], ['C', 110]];
      t.caption('Bấm các điểm trên đường tròn');
      t.q('.x3g-comp').remove();
      t.hot('go')?.remove();
      t.add(pts.map(([n, deg]) => { const a = (deg * Math.PI) / 180; const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a); return `<g data-hot="${n}">${C(x, y, 24, { fill: '#FDE68A', stroke: INK, sw: 3 })}${T(x + 44 * Math.cos(a), y + 44 * Math.sin(a), n, { fs: 44 })}</g>`; }).join(''));
      await c.say('Bấm lần lượt các điểm A, B, C trên đường tròn. Nối tâm O với mỗi điểm.', 'Bấm <b>A</b>, <b>B</b>, <b>C</b>');
      for (const [n, deg] of pts) {
        await waitTap(c, t, n, { nudge: `Bấm điểm ${n}.` });
        const a = (deg * Math.PI) / 180, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
        const ln = t.add(`<g>${L(cx, cy, x, y, { stroke: RED, sw: 5 })}${T((cx + x) / 2 + r * 0.14 * Math.sin(a), (cy + y) / 2 - r * 0.14 * Math.cos(a), '3 cm', { fs: Math.max(34, r * 0.16), fill: RED })}</g>`);
        await ln.animate([{ opacity: 0 }, { opacity: 1 }], { duration: anim(350) }).finished;
        sfx.pop(2);
      }
      await c.say('OA, OB, OC là các bán kính. Các bán kính của một hình tròn dài bằng nhau.', 'OA = OB = OC = 3 cm: <b>bán kính</b>');
    },
    async (c) => {
      const t = c.t, cx = 500, cy = t.cy, r = t.r;
      t.caption('<b>Đường kính</b> đi qua tâm O');
      t.add(btn(t, 'go2', 'Vẽ đường kính MN'));
      await c.say('Đoạn thẳng nối hai điểm trên đường tròn và đi qua tâm O là đường kính. Bấm nút để vẽ đường kính MN.', 'Bấm <b>Vẽ đường kính MN</b>');
      await waitTap(c, t, 'go2', { nudge: 'Bấm nút ở dưới.' });
      t.enable('go2', false);
      const d = t.add(`<g>${L(cx - r, cy, cx + r, cy, { stroke: GREEN, sw: 7 })}${dot(cx - r, cy, 'M', { dx: -36, dy: 0 })}${dot(cx + r, cy, 'N', { dx: 36, dy: 0 })}</g>`);
      await d.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: anim(800) }).finished;
      await c.say('Bán kính dài 3 xăng-ti-mét. Đường kính MN dài bao nhiêu?', 'MN = ? cm');
      await c.choose([{ html: '3 cm', value: 3 }, { html: '6 cm', value: 6 }, { html: '9 cm', value: 9 }], 6, { hint: 'MN gồm hai bán kính OM và ON.' });
      await c.say('Đường kính dài gấp 2 lần bán kính: 3 nhân 2 bằng 6 xăng-ti-mét. O là trung điểm của đường kính.', '<b>Đường kính = 2 × bán kính</b>');
    },
  ],
};

// ── Bài 18 ────────────────────────────────────────────────────────────────────────────────────────────
export const B18 = {
  title: 'Bài 18: Góc vuông, góc không vuông',
  setup: (board) => base(board),
  steps: [
    async (c) => {
      const t = c.t, G = t.G;
      const ox = 300, oy = G.top + (G.bot - G.top) * 0.78, len = Math.min(460, (G.bot - G.top) * 0.7);
      const a = (-50 * Math.PI) / 180;
      t.caption('Góc đỉnh <b>O</b>, cạnh <b>OA</b>, <b>OB</b>');
      t.draw(`${L(ox, oy, ox + len, oy, { sw: 6 })}${L(ox, oy, ox + len * Math.cos(a), oy + len * Math.sin(a), { sw: 6 })}
        <path d="M${ox + 70} ${oy} A70 70 0 0 0 ${ox + 70 * Math.cos(a)} ${oy + 70 * Math.sin(a)}" fill="none" stroke="${RED}" stroke-width="5"/>
        ${dot(ox, oy, 'O', { dx: -36, dy: 10 })}${dot(ox + len, oy, 'B', { dy: 44 })}${dot(ox + len * Math.cos(a), oy + len * Math.sin(a), 'A', { dx: -30 })}`);
      await c.say('Đây là góc đỉnh O, cạnh OA và OB. Hai cạnh của góc chung một đỉnh.', 'Góc đỉnh O; cạnh OA, OB');
    },
    async (c) => {
      const t = c.t, G = t.G;
      const kinds = [{ id: 'g1', deg: 90, ok: true }, { id: 'g2', deg: 55 }, { id: 'g3', deg: 125 }];
      const tall = G.tall, cw = tall ? 900 : 320, ch = tall ? (G.bot - G.top) / 3 : G.bot - G.top - 20;
      const box = (i) => (tall ? { x: 50, y: G.top + i * ch, w: cw, h: ch - 14 } : { x: 18 + i * (cw + 10), y: G.top + 10, w: cw, h: ch });
      const s = tall ? Math.min(ch * 0.6, 220) : Math.min(cw * 0.5, ch * 0.5);
      let svg = '';
      kinds.forEach((k, i) => {
        const b = box(i), ox = b.x + (tall ? b.w * 0.3 : b.w * 0.36), oy = b.y + b.h * (tall ? 0.84 : 0.7), a = (-k.deg * Math.PI) / 180;
        k.o = [ox, oy]; k.lab = tall ? [b.x + b.w * 0.82, b.y + b.h / 2] : [b.x + b.w / 2, b.y + 50];
        svg += `<g data-hot="${k.id}">${R(b.x, b.y, b.w, b.h, { fill: '#F8FAFC', stroke: '#CBD5E1', sw: 2.5, rx: 20 })}
          ${L(ox, oy, ox + s, oy, { sw: 6 })}${L(ox, oy, ox + s * Math.cos(a), oy + s * Math.sin(a), { sw: 6 })}${dot(ox, oy, '', {})}
          <g class="x3g-mark"></g></g>`;
      });
      // ê ke: tam giác vuông, góc vuông ở (0,0), hai cạnh góc vuông dọc theo +x và −y
      const ek = s * 0.8;
      svg += `<g class="x3g-eke" style="pointer-events:none">
        <path d="M0 0 H${ek} L0 ${-ek} Z" fill="rgba(56,189,248,0.45)" stroke="#0369A1" stroke-width="4" stroke-linejoin="round"/>
        <path d="M${ek * 0.3} ${-ek * 0.18} H${ek * 0.18} V${-ek * 0.3}" fill="none" stroke="#0369A1" stroke-width="3"/></g>`;
      t.caption('Dùng <b>ê ke</b> kiểm tra góc vuông');
      t.draw(svg);
      const eke = t.q('.x3g-eke');
      const home = [500, G.band + G.bh * 0.8];
      eke.setAttribute('transform', `translate(${home[0]} ${home[1]})`);
      await c.say('Đây là cái ê ke. Ê ke có một góc vuông. Góc vuông của ê ke trùng khít với góc nào thì góc đó là góc vuông.', 'Ê ke có <b>một góc vuông</b>');
      Object.assign(t, { kinds, eke, home, s, tall });
    },
    async (c) => {
      const t = c.t, { kinds, eke, home, s, tall } = t;
      await c.say('Bấm vào từng góc để đặt ê ke lên kiểm tra.', 'Bấm vào <b>từng góc</b> để đặt ê ke');
      const done = new Set();
      let cur = home;
      while (done.size < 3) {
        const id = await waitTap(c, t, (h) => /^g\d$/.test(h) && !done.has(h), { el: () => t.hot(kinds.find(k => !done.has(k.id)).id), glow: false, nudge: 'Bấm vào một góc chưa kiểm tra.' });
        const k = kinds.find(x => x.id === id);
        done.add(id);
        const [x, y] = k.o;
        await eke.animate([{ transform: `translate(${cur[0]}px, ${cur[1]}px)` }, { transform: `translate(${(cur[0] + x) / 2}px, ${Math.min(cur[1], y) - 80}px)` }, { transform: `translate(${x}px, ${y}px)` }],
          { duration: anim(700), easing: 'ease-in-out', fill: 'forwards' }).finished;
        eke.style.transform = `translate(${x}px, ${y}px)`;
        cur = [x, y];
        const mark = t.hot(id).querySelector('.x3g-mark');
        const lfs = tall ? 46 : 38;
        mark.innerHTML = k.ok
          ? `<path d="M${x + 34} ${y} V${y - 34} H${x}" fill="none" stroke="${GREEN}" stroke-width="5"/>${T(k.lab[0], k.lab[1], '✓ vuông', { fs: lfs, fill: GREEN })}`
          : T(k.lab[0], k.lab[1], tall ? '✗ không vuông' : '✗ không<tspan x="' + k.lab[0] + '" dy="1.1em">vuông</tspan>', { fs: lfs, fill: RED });
        pop(mark);
        if (k.ok) sfx.ding(); else sfx.boing();
        await c.say(k.ok ? 'Góc vuông của ê ke trùng khít với góc này. Đây là góc vuông.' : 'Cạnh của góc không trùng với cạnh ê ke. Đây là góc không vuông.');
      }
    },
    async (c) => {
      await c.say('Trong ba góc vừa kiểm tra, có mấy góc vuông?', 'Có mấy góc vuông?');
      await c.choose([{ html: '1', value: 1 }, { html: '2', value: 2 }, { html: '3', value: 3 }], 1, { hint: 'Đếm các góc có dấu ✓ vuông.' });
      await c.say('Đúng! Chỉ có một góc vuông, hai góc còn lại là góc không vuông. Kí hiệu góc vuông là một ô vuông nhỏ ở đỉnh.', '1 góc vuông · 2 góc không vuông');
    },
  ],
};

// ── Bài 19 ────────────────────────────────────────────────────────────────────────────────────────────
/** Giấy ô vuông + hình có đỉnh bấm được. pts: [[tên, ô x, ô y]], cell: cỡ ô. */
function gridShape(t, pts, { cols = 12, rows = 7, fill = '#FEF3C7' } = {}) {
  const G = t.G, cell = Math.min(940 / cols, (G.bot - G.top - 20) / rows), gx = 500 - (cols * cell) / 2, gy = G.top + (G.bot - G.top - rows * cell) / 2;
  const P = (x, y) => [gx + x * cell, gy + y * cell];
  let s = '';
  for (let i = 0; i <= cols; i++) s += L(gx + i * cell, gy, gx + i * cell, gy + rows * cell, { stroke: '#BFDBFE', sw: 2, cap: 'butt' });
  for (let j = 0; j <= rows; j++) s += L(gx, gy + j * cell, gx + cols * cell, gy + j * cell, { stroke: '#BFDBFE', sw: 2, cap: 'butt' });
  const poly = pts.map(([, x, y]) => P(x, y).join(',')).join(' ');
  s += `<polygon points="${poly}" fill="${fill}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><g class="x3g-sides"></g><g class="x3g-marks"></g>`;
  s += pts.map(([n, x, y]) => { const [px, py] = P(x, y); const cx = pts.reduce((a, p) => a + p[1], 0) / pts.length, cy = pts.reduce((a, p) => a + p[2], 0) / pts.length; const dx = Math.sign(x - cx) * 40, dy = Math.sign(y - cy) * 40; return `<g data-hot="${n}">${C(px, py, Math.max(16, cell * 0.2), { fill: '#fff', stroke: INK, sw: 4 })}${T(px + dx, py + dy, n, { fs: Math.min(48, cell * 0.6) })}</g>`; }).join('');
  t.draw(s);
  return { P, cell };
}

async function tapVertices(c, t, names) {
  const seen = new Set();
  while (seen.size < names.length) {
    const id = await waitTap(c, t, (h) => names.includes(h) && !seen.has(h), { el: () => t.hot(names.find(n => !seen.has(n))), nudge: 'Bấm vào một đỉnh chưa đếm.' });
    seen.add(id);
    const g = t.hot(id);
    g.querySelector('circle').setAttribute('fill', '#F97316');
    bump(g); sfx.pop(seen.size);
    c.show(`Đã đếm <b>${seen.size}</b> đỉnh`);
  }
}

export const B19 = {
  title: 'Bài 19: Hình tam giác, hình tứ giác. Hình chữ nhật, hình vuông',
  setup: (board) => base(board),
  steps: [
    async (c) => {
      const t = c.t;
      gridShape(t, [['A', 2, 6], ['B', 6, 1], ['C', 10, 6]]);
      t.caption('Hình tam giác <b>ABC</b>');
      await c.say('Đây là hình tam giác ABC. Bấm vào từng đỉnh để đếm.', 'Bấm vào <b>từng đỉnh</b>');
      await tapVertices(c, t, ['A', 'B', 'C']);
      await c.say('Hình tam giác có 3 đỉnh, 3 cạnh: AB, BC, CA.', 'Tam giác: <b>3 đỉnh, 3 cạnh</b>');
    },
    async (c) => {
      const t = c.t;
      gridShape(t, [['M', 1, 5], ['N', 4, 1], ['P', 10, 2], ['Q', 8, 6]], { fill: '#DCFCE7' });
      t.caption('Hình tứ giác <b>MNPQ</b>');
      await c.say('Đây là hình tứ giác MNPQ. Bấm vào từng đỉnh để đếm.', 'Bấm vào <b>từng đỉnh</b>');
      await tapVertices(c, t, ['M', 'N', 'P', 'Q']);
      await c.say('Hình tứ giác có 4 đỉnh, 4 cạnh: MN, NP, PQ, QM.', 'Tứ giác: <b>4 đỉnh, 4 cạnh</b>');
    },
    async (c) => {
      const t = c.t;
      const { P, cell } = gridShape(t, [['A', 2, 1], ['B', 9, 1], ['C', 9, 5], ['D', 2, 5]], { fill: '#DBEAFE' });
      t.caption('Hình chữ nhật <b>ABCD</b>');
      await c.say('Hình chữ nhật ABCD. Bấm vào từng góc để kiểm tra bằng ê ke.', 'Bấm <b>4 góc</b> để kiểm tra góc vuông');
      const corner = { A: [1, 1], B: [-1, 1], C: [-1, -1], D: [1, -1] }, at = { A: [2, 1], B: [9, 1], C: [9, 5], D: [2, 5] };
      const seen = new Set();
      while (seen.size < 4) {
        const id = await waitTap(c, t, (h) => 'ABCD'.includes(h) && !seen.has(h), { el: () => t.hot([...'ABCD'].find(n => !seen.has(n))), nudge: 'Bấm vào một góc chưa kiểm tra.' });
        seen.add(id);
        const [x, y] = P(...at[id]), [sx, sy] = corner[id], m = cell * 0.45;
        const g = t.q('.x3g-marks');
        g.insertAdjacentHTML('beforeend', `<path d="M${x + sx * m} ${y} V${y + sy * m} H${x}" fill="none" stroke="${GREEN}" stroke-width="5"/>`);
        pop(g.lastElementChild); sfx.ding();
      }
      const sides = t.q('.x3g-sides');
      sides.innerHTML = `${T(...P(5.5, 0.45), '7 ô', { fs: Math.min(44, cell * 0.55), fill: RED })}${T(...P(5.5, 5.55), '7 ô', { fs: Math.min(44, cell * 0.55), fill: RED })}
        ${T(...P(1.3, 3), '4 ô', { fs: Math.min(44, cell * 0.55), fill: BLUE })}${T(...P(9.7, 3), '4 ô', { fs: Math.min(44, cell * 0.55), fill: BLUE })}`;
      pop(sides);
      await c.say('Hình chữ nhật có 4 góc vuông, 2 cạnh dài bằng nhau và 2 cạnh ngắn bằng nhau.', '4 góc vuông · AB = DC · AD = BC');
    },
    async (c) => {
      const t = c.t;
      const { P, cell } = gridShape(t, [['M', 3, 1], ['N', 8, 1], ['P', 8, 6], ['Q', 3, 6]], { fill: '#FCE7F3', rows: 7 });
      t.caption('Hình vuông <b>MNPQ</b>');
      const sides = t.q('.x3g-sides'), fs = Math.min(44, cell * 0.55);
      sides.innerHTML = `${T(...P(5.5, 0.45), '5 ô', { fs, fill: RED })}${T(...P(5.5, 6.55), '5 ô', { fs, fill: RED })}${T(...P(2.3, 3.5), '5 ô', { fs, fill: RED })}${T(...P(8.7, 3.5), '5 ô', { fs, fill: RED })}`;
      t.q('.x3g-marks').innerHTML = [[3, 1, 1, 1], [8, 1, -1, 1], [8, 6, -1, -1], [3, 6, 1, -1]].map(([x0, y0, sx, sy]) => { const [x, y] = P(x0, y0), m = cell * 0.45; return `<path d="M${x + sx * m} ${y} V${y + sy * m} H${x}" fill="none" stroke="${GREEN}" stroke-width="5"/>`; }).join('');
      pop(sides);
      await c.say('Hình vuông MNPQ có 4 góc vuông. Đếm ô: các cạnh dài mấy ô?', 'Mỗi cạnh dài mấy ô?');
      await c.choose([{ html: 'Đều 5 ô', value: 1 }, { html: '2 cạnh 5 ô, 2 cạnh 3 ô', value: 2 }], 1, { hint: 'Đếm số ô trên mỗi cạnh.' });
      await c.say('Hình vuông có 4 góc vuông và 4 cạnh dài bằng nhau.', 'Hình vuông: <b>4 góc vuông, 4 cạnh bằng nhau</b>');
    },
  ],
};

// ── Bài 21 ────────────────────────────────────────────────────────────────────────────────────────────
/** Khối hộp vẽ xiên: rộng w, cao h, sâu d (theo đơn vị vẽ). Trả về 8 đỉnh (0–3 mặt trước, 4–7 mặt sau), 12 cạnh. */
function boxGeo(cx, cy, w, h, d) {
  const dx = d * 0.6, dy = -d * 0.5;
  const x0 = cx - (w + dx) / 2, y0 = cy + (h - dy) / 2;
  const V = [[x0, y0], [x0 + w, y0], [x0 + w, y0 - h], [x0, y0 - h]];
  const B = V.map(([x, y]) => [x + dx, y + dy]);
  const P = [...V, ...B]; // 0..3 trước, 4..7 sau
  const E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
  return { P, E }; // đỉnh 4 (sau, dưới, trái) bị khuất: các cạnh chạm đỉnh 4 vẽ nét đứt
}

function drawBox(t, { w, h, d, fill }) {
  const G = t.G, cy = G.top + (G.bot - G.top) * 0.5, s = Math.min(G.tall ? 1.7 : 1.15, (G.bot - G.top) / 500, 900 / (w + d * 0.6));
  const g = boxGeo(500, cy, w * s, h * s, d * s);
  const hid = (e) => e.includes(4);
  const vis = [[0, 1, 2, 3], [3, 2, 6, 7], [1, 2, 6, 5]];
  t.draw(`${vis.map(f => `<polygon points="${f.map(i => g.P[i].join(',')).join(' ')}" fill="${fill}" stroke="none"/>`).join('')}
    <g class="x3g-faces"></g>
    ${g.E.map((e, i) => `<line class="x3g-e" data-e="${i}" x1="${g.P[e[0]][0]}" y1="${g.P[e[0]][1]}" x2="${g.P[e[1]][0]}" y2="${g.P[e[1]][1]}" stroke="${INK}" stroke-width="5" stroke-linecap="round" ${hid(e) ? 'stroke-dasharray="12 10" stroke-opacity="0.6"' : ''}/>`).join('')}
    <g class="x3g-elab"></g>
    ${g.P.map(([x, y], i) => `<g data-hot="v${i}">${C(x, y, 18, { fill: '#fff', stroke: INK, sw: 4 })}</g>`).join('')}
    ${btn(t, 'go', 'Đếm', 360)}`);
  t.enable('go', false);
  return g;
}

export const B21 = {
  title: 'Bài 21: Khối lập phương, khối hộp chữ nhật',
  setup: (board) => base(board),
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('Khối <b>lập phương</b>: đếm đỉnh');
      drawBox(t, { w: 300, h: 300, d: 300, fill: '#FDE68A' });
      await c.say('Đây là khối lập phương. Nét đứt là phần bị che khuất. Bấm vào từng đỉnh để đếm.', 'Bấm vào <b>từng đỉnh</b>');
      const seen = new Set();
      while (seen.size < 8) {
        const id = await waitTap(c, t, (h) => /^v\d$/.test(h) && !seen.has(h), { el: () => t.hot([...Array(8)].map((_, i) => `v${i}`).find(n => !seen.has(n))), nudge: 'Bấm vào đỉnh còn màu trắng, kể cả đỉnh bị khuất.' });
        seen.add(id);
        const g = t.hot(id);
        g.querySelector('circle').setAttribute('fill', '#F97316');
        g.insertAdjacentHTML('beforeend', T(+g.querySelector('circle').getAttribute('cx') + 30, +g.querySelector('circle').getAttribute('cy') - 26, seen.size, { fs: 34, fill: '#C2410C' }));
        bump(g); sfx.pop(seen.size);
      }
      await c.say('Khối lập phương có 8 đỉnh.', '<b>8 đỉnh</b>');
    },
    async (c) => {
      const t = c.t;
      t.caption('Khối lập phương: đếm <b>cạnh</b>');
      t.qa('[data-hot^="v"] text').forEach(e => e.remove());
      await c.say('Bấm nút Đếm để tô từng cạnh.', 'Bấm <b>Đếm</b> để tô từng cạnh');
      t.enable('go');
      await waitTap(c, t, 'go', { nudge: 'Bấm nút Đếm.' });
      t.enable('go', false);
      const es = t.qa('.x3g-e');
      for (let i = 0; i < es.length; i++) {
        es[i].setAttribute('stroke', '#DC2626');
        es[i].setAttribute('stroke-width', '8');
        const x = (+es[i].getAttribute('x1') + +es[i].getAttribute('x2')) / 2, y = (+es[i].getAttribute('y1') + +es[i].getAttribute('y2')) / 2;
        t.q('.x3g-elab').insertAdjacentHTML('beforeend', `<g>${C(x, y, 20, { fill: '#fff', stroke: RED, sw: 3 })}${T(x, y + 1, i + 1, { fs: 26, fill: RED })}</g>`);
        sfx.pop(i % 10);
        await sleep(calmMotion() ? 260 : 220);
      }
      await c.say('Khối lập phương có mấy cạnh?', 'Mấy cạnh?');
      await c.choose([{ html: '8', value: 8 }, { html: '12', value: 12 }, { html: '6', value: 6 }], 12, { hint: 'Đếm các số trên cạnh.' });
      await c.say('Khối lập phương có 12 cạnh.', '<b>12 cạnh</b>');
    },
    async (c) => {
      const t = c.t;
      t.caption('Khối lập phương: đếm <b>mặt</b>');
      t.q('.x3g-elab').innerHTML = '';
      t.qa('.x3g-e').forEach(e => { e.setAttribute('stroke', INK); e.setAttribute('stroke-width', '5'); });
      await c.say('Ta nhìn thấy 3 mặt: mặt trước, mặt trên, mặt bên phải. Còn 3 mặt bị che khuất: mặt sau, mặt dưới, mặt bên trái.', 'Thấy <b>3</b> mặt · khuất <b>3</b> mặt');
      await c.choose([{ html: '3 mặt', value: 3 }, { html: '6 mặt', value: 6 }, { html: '4 mặt', value: 4 }], 6, { hint: '3 mặt nhìn thấy và 3 mặt bị che khuất.' });
      await c.say('Khối lập phương có 6 mặt. Mỗi mặt là một hình vuông.', '<b>6 mặt</b>, mỗi mặt là hình vuông');
    },
    async (c) => {
      const t = c.t;
      t.caption('Khối <b>hộp chữ nhật</b>');
      drawBox(t, { w: 440, h: 220, d: 220, fill: '#BBF7D0' });
      t.qa('[data-hot]').forEach(e => e.classList.add('x3a-off'));
      await c.say('Đây là khối hộp chữ nhật, như hộp sữa, viên gạch. Khối hộp chữ nhật cũng có 8 đỉnh, 12 cạnh và 6 mặt.', '8 đỉnh · 12 cạnh · 6 mặt');
      await c.say('Các mặt của khối hộp chữ nhật là hình gì?', 'Các mặt là hình gì?');
      await c.choose([{ html: 'Hình chữ nhật', value: 1 }, { html: 'Hình tròn', value: 2 }, { html: 'Hình tam giác', value: 3 }], 1, { hint: 'Nhìn mặt trước: có 4 góc vuông, 2 cạnh dài, 2 cạnh ngắn.' });
      await c.say('Đúng! Các mặt của khối hộp chữ nhật là hình chữ nhật.', 'Các mặt là <b>hình chữ nhật</b>');
    },
  ],
};
