/**
 * Chủ đề 6: Bài 27 (hai đường thẳng vuông góc), 28 (vẽ vuông góc), 29 (song song), 30 (vẽ song song).
 * Công cụ 📐 Ê ke trên giấy kẻ ô (square.js).
 */

import { createSquare, dirOf, foot } from '../square.js';
import { sleep } from '../../grade3Drills/kit.js';
import { sfx } from '../frame.js';

const PARK = { c: { x: 13.2, y: 10.8 }, rot: 0 };
const YESNO = [{ html: '✔ Có', value: true }, { html: '✘ Không', value: false }];

/** Hình chữ nhật ABCD (A trên trái). */
function rect(t, x0, y0, x1, y1) {
  t.point('A', x0, y0); t.point('B', x1, y0, { dx: 0.45 }); t.point('C', x1, y1, { dx: 0.45, dy: 0.45 }); t.point('D', x0, y1, { dy: 0.45 });
  t.line('AB', 'A', 'B'); t.line('BC', 'B', 'C'); t.line('CD', 'C', 'D'); t.line('DA', 'D', 'A');
}

/** Chờ em đặt ê ke vẽ đường vuông góc với `base` qua `through`, rồi bấm Vẽ. Trả về toạ độ chân đường vuông góc. */
async function drawPerpByChild(c, t, base, through, id) {
  t.eke({ base, through, on: null });
  t.lock(false);
  await c.until(t, () => t.S.aligned, {
    nudge: () => {
      const L = t.LINES[base];
      const dirOk = [0, 90, 180, 270].some(k => Math.abs(((t.S.rot + k - L.d) % 360 + 540) % 360 - 180) < 0.3);
      return dirOk ? `Trượt ê ke dọc đường thẳng tới khi cạnh kia gặp điểm ${through}.` : 'Kéo núm vàng để xoay ê ke cho một cạnh góc vuông nằm dọc theo đường thẳng.';
    },
    el: () => t.svg.querySelector('.g4s-knob'),
  });
  t.lock(true);
  await c.choose([{ html: '✏️ Vẽ theo cạnh ê ke', value: 1 }], 1);
  const L = t.LINES[base];
  const f = foot(t.P[through], L.a, L.d);
  await t.drawAlong(id, f, L.d + 90);
  t.rightMark(f, L.d, L.d + 90);
  return f;
}

// ── Bài 27 ────────────────────────────────────────────────────────────────────────────────────────────
const B27 = {
  explore: {
    setup: (board) => { const t = createSquare(board); t.eke(PARK); t.lock(true); return t; },
    steps: [
      async (c) => {
        const t = c.t;
        rect(t, 4, 3, 12, 8);
        t.rightMark('A', 0, 90);
        t.caption('Hình chữ nhật ABCD');
        await c.say('ABCD là hình chữ nhật. Góc đỉnh A là góc vuông.');
        await t.extend('AB', { color: '#2563EB' });
        await t.extend('DA', { color: '#DC2626' });
        t.caption('AB và AD: hai đường thẳng <b>vuông góc</b>');
        await c.say('Kéo dài hai cạnh AB và AD, ta được hai đường thẳng vuông góc với nhau.');
        t.rightMark('A', 180, 90); t.rightMark('A', 180, 270); t.rightMark('A', 0, 270);
        await c.say('Hai đường thẳng vuông góc tạo thành bốn góc vuông có chung đỉnh A.', 'Bốn góc vuông chung đỉnh A');
      },
      async (c) => {
        const t = c.use((b) => createSquare(b));
        t.eke(PARK); t.lock(true);
        t.point('O', 5, 7); t.line('a', { x: 1, y: 7 }, { x: 9.5, y: 7 }); t.line('b', { x: 5, y: 1 }, { x: 5, y: 10 });
        t.point('I', 13, 7); t.line('c', { x: 9.8, y: 7 }, { x: 19, y: 7 }); t.line('d', { x: 11.9, y: 10.2 }, { x: 14.6, y: 1.5 });
        t.caption('Dùng <b>ê ke</b> để kiểm tra');
        await c.say('Muốn biết hai đường thẳng có vuông góc không, ta dùng ê ke. Đặt góc vuông của ê ke vào chỗ hai đường cắt nhau.');
        await t.moveEke({ x: 5, y: 7 }, 0);
        t.rightMark('O', 0, 270);
        t.caption('Khít cả hai cạnh: <b>vuông góc</b> ✔');
        await c.say('Một cạnh ê ke nằm trên đường này, cạnh kia khít với đường kia. Hai đường thẳng vuông góc.');
        await t.moveEke({ x: 13, y: 7 }, 0);
        t.top(`<path d="M${t.X(13)} ${t.X(4.4)} L${t.X(13.6)} ${t.X(5)}" stroke="#DC2626" stroke-width="6" stroke-linecap="round"/>`);
        t.caption('Có khe hở: <b>không vuông góc</b> ✘');
        await c.say('Ở đây cạnh ê ke không khít, còn khe hở. Hai đường thẳng này không vuông góc.');
      },
      async (c) => {
        const t = c.use((b) => createSquare(b));
        t.eke(PARK);
        t.point('H', 9, 6);
        t.line('m', { x: 3, y: 8 }, { x: 15, y: 4 });
        t.line('n', { x: 7.67, y: 2 }, { x: 10.33, y: 10 });
        t.caption('Hai đường thẳng này có vuông góc không?');
        t.eke({ on: 'H' });
        t.lock(false);
        await c.say('Đến lượt em. Kéo ê ke cho góc vuông trùng điểm H, xoay cho một cạnh nằm trên một đường thẳng.', 'Đặt góc vuông ê ke vào <b>H</b>, xoay cho khớp một đường.');
        const legOn = () => t.legs().some(g => [t.LINES.m.d, t.LINES.n.d].some(d => Math.abs(((g - d) % 180 + 180) % 180) < 0.3 || Math.abs(((g - d) % 180 + 180) % 180 - 180) < 0.3));
        await c.until(t, () => t.S.aligned && legOn(), { nudge: 'Kéo thân ê ke vào điểm H, rồi kéo núm vàng để xoay.', el: () => t.svg.querySelector('.g4s-knob') });
        t.lock(true);
        await c.say('Cạnh kia của ê ke có khít với đường còn lại không?');
        await c.choose(YESNO, true, { hint: 'Nhìn kĩ: cạnh ê ke nằm sát đường thẳng, không có khe hở.' });
        t.rightMark('H', t.LINES.m.d, t.LINES.n.d);
        t.caption('Hai đường thẳng <b>vuông góc</b> ✔');
        await c.say('Đúng rồi! Hai đường thẳng này vuông góc với nhau.');
      },
    ],
  },
  tasks: () => [taskPerpCheck(), taskPerpCheck(), taskPairs('perp')],
};

// ── Bài 28 ────────────────────────────────────────────────────────────────────────────────────────────
const B28 = {
  explore: {
    setup: (board) => { const t = createSquare(board); t.eke(PARK); t.lock(true); return t; },
    steps: [
      async (c) => {
        const t = c.t;
        t.point('A', 2, 6, { dy: 0.5 }); t.point('B', 18, 6, { dy: 0.5 }); t.line('AB', 'A', 'B', { full: true });
        t.point('H', 8, 6, { dy: 0.5, dx: 0.45 });
        t.caption('Vẽ đường thẳng CD đi qua H, vuông góc với AB');
        await c.say('Vẽ đường thẳng đi qua điểm H và vuông góc với đường thẳng AB.');
        t.caption('Bước 1: một cạnh ê ke <b>trùng AB</b>, trượt tới khi cạnh kia gặp <b>H</b>');
        await c.say('Bước một: đặt một cạnh góc vuông của ê ke trùng với đường thẳng AB, trượt ê ke tới khi cạnh kia gặp điểm H.');
        await t.moveEke({ x: 12, y: 6 }, 0, 900);
        await t.moveEke({ x: 8, y: 6 }, 0, 900);
        t.caption('Bước 2: vạch đường thẳng theo cạnh ê ke');
        await c.say('Bước hai: vạch một đường thẳng theo cạnh kia của ê ke. Ta được đường thẳng CD vuông góc với AB.');
        await t.drawAlong('CD', { x: 8, y: 6 }, 90);
        t.rightMark({ x: 8, y: 6 }, 0, 270);
        t.point('C', 8, 1, { dx: 0.45 }); t.point('D', 8, 10.5, { dx: 0.45 });
      },
      async (c) => {
        const t = c.use((b) => createSquare(b));
        t.eke(PARK);
        t.point('A', 2, 8, { dy: 0.5 }); t.point('B', 18, 8, { dy: 0.5 }); t.line('AB', 'A', 'B', { full: true });
        t.point('H', 10, 3, { dx: 0.5 });
        t.caption('Vẽ đường thẳng qua <b>H</b> vuông góc với AB (H ở ngoài AB)');
        await c.say('Đến lượt em. Điểm H nằm ngoài đường thẳng AB. Kéo ê ke cho một cạnh nằm trên AB, rồi trượt tới khi cạnh kia gặp H.', 'Cạnh ê ke trên <b>AB</b>, trượt tới khi cạnh kia gặp <b>H</b>.');
        await drawPerpByChild(c, t, 'AB', 'H', 'CD');
        t.caption('Đường thẳng qua H <b>vuông góc</b> với AB');
        await c.say('Giỏi lắm! Em đã vẽ được đường thẳng đi qua H và vuông góc với AB.');
      },
      async (c) => {
        const t = c.use((b) => createSquare(b));
        t.eke(PARK);
        t.point('M', 3, 9, { dy: 0.5 }); t.point('N', 17, 2, { dy: 0.5 }); t.line('MN', 'M', 'N', { full: true });
        t.point('K', 6, 3, { dx: -0.5 });
        t.caption('Đường thẳng nằm nghiêng: vẽ đường qua <b>K</b> vuông góc với MN');
        await c.say('Đường thẳng nằm nghiêng cũng làm như vậy. Xoay ê ke cho một cạnh nằm trên MN, trượt tới khi cạnh kia gặp K.');
        await drawPerpByChild(c, t, 'MN', 'K', 'KL');
        await c.say('Tuyệt vời! Dù đường thẳng nằm nghiêng, ê ke vẫn giúp em vẽ đúng.');
      },
    ],
  },
  tasks: () => [taskDrawPerp(), taskDrawPerp({ slant: true }), taskPerpCheck()],
};

// ── Bài 29 ────────────────────────────────────────────────────────────────────────────────────────────
const B29 = {
  explore: {
    setup: (board) => { const t = createSquare(board, { eke: false }); return t; },
    steps: [
      async (c) => {
        const t = c.t;
        rect(t, 6, 3, 14, 7);
        t.caption('Hình chữ nhật ABCD');
        await c.say('Kéo dài hai cạnh AB và DC của hình chữ nhật ABCD về hai phía.');
        await t.extend('AB', { color: '#2563EB' });
        await t.extend('CD', { color: '#2563EB' });
        t.caption('AB và DC: hai đường thẳng <b>song song</b>');
        await c.say('Ta được hai đường thẳng song song với nhau. Hai đường thẳng song song không bao giờ cắt nhau.');
      },
      async (c) => {
        const t = c.t;
        for (const x of [2, 10, 18]) {
          t.top(`<line x1="${t.X(x)}" y1="${t.X(3)}" x2="${t.X(x)}" y2="${t.X(7)}" stroke="#F97316" stroke-width="5" stroke-dasharray="10 7"/>
            <text x="${t.X(x + 0.3)}" y="${t.X(5.2)}" class="g4s-name" fill="#C2410C" style="text-anchor:start">4 ô</text>`);
          sfx.pop(x);
          await sleep(500);
        }
        t.caption('Ở đâu cũng cách nhau <b>4 ô</b>');
        await c.say('Đo ở chỗ nào, khoảng cách giữa hai đường cũng bằng nhau, đều là 4 ô. Vì vậy chúng không bao giờ gặp nhau.');
      },
      async (c) => {
        const t = c.use((b) => createSquare(b, { eke: false }));
        t.line('a', { x: 1, y: 2 }, { x: 19, y: 2 }, { color: '#2563EB' });
        t.line('b', { x: 1, y: 9 }, { x: 19, y: 5.5 }, { color: '#16A34A' });
        t.line('c', { x: 1, y: 6 }, { x: 19, y: 6 }, { color: '#DC2626' });
        t.top(`<text x="${t.X(0.5)}" y="${t.X(1.5)}" class="g4s-name" fill="#2563EB">a</text><text x="${t.X(0.5)}" y="${t.X(9.6)}" class="g4s-name" fill="#16A34A">b</text><text x="${t.X(0.5)}" y="${t.X(5.4)}" class="g4s-name" fill="#DC2626">c</text>`);
        t.caption('Hai đường thẳng nào song song?');
        await c.say('Hai đường thẳng nào song song với nhau?');
        await c.choose([{ html: 'a và b', value: 'ab' }, { html: 'a và c', value: 'ac' }, { html: 'b và c', value: 'bc' }], 'ac', { hint: 'Đường b đi xuống dần, sẽ cắt các đường kia ở xa.' });
        t.caption('a và c <b>song song</b>, luôn cách nhau 4 ô');
        await c.say('Đúng rồi! Đường a và đường c luôn cách nhau 4 ô. Đường b nghiêng, kéo dài ra sẽ cắt đường c.');
      },
    ],
  },
  tasks: () => [taskParallelCheck(), taskPairs('par'), taskParallelCheck()],
};

// ── Bài 30 ────────────────────────────────────────────────────────────────────────────────────────────
const B30 = {
  explore: {
    setup: (board) => { const t = createSquare(board); t.eke(PARK); t.lock(true); return t; },
    steps: [
      async (c) => {
        const t = c.t;
        t.point('A', 2, 8, { dy: 0.5 }); t.point('B', 18, 8, { dy: 0.5 }); t.line('AB', 'A', 'B', { full: true });
        t.point('H', 9, 3, { dx: 0.5, dy: -0.5 });
        t.caption('Vẽ đường thẳng qua <b>H</b> song song với AB');
        await c.say('Vẽ đường thẳng đi qua H và song song với AB. Ta dùng ê ke hai lần.');
        t.caption('Bước 1: vẽ đường thẳng MN qua H, <b>vuông góc</b> với AB');
        await c.say('Bước một: em vẽ đường thẳng MN đi qua H và vuông góc với AB.', 'Bước 1: vẽ MN qua H, vuông góc với AB');
        await drawPerpByChild(c, t, 'AB', 'H', 'MN');
        t.point('M', 9, 1, { dx: 0.5 }); t.point('N', 9, 10.4, { dx: 0.5 });
      },
      async (c) => {
        const t = c.t;
        t.eke(PARK);
        t.caption('Bước 2: vẽ đường thẳng CD qua H, <b>vuông góc</b> với MN');
        await c.say('Bước hai: vẽ đường thẳng CD đi qua H và vuông góc với MN. Lần này cạnh ê ke nằm trên MN.', 'Bước 2: vẽ CD qua H, vuông góc với <b>MN</b>');
        await drawPerpByChild(c, t, 'MN', 'H', 'CD');
        t.caption('CD <b>song song</b> với AB');
        await c.say('Đường thẳng CD đi qua H và song song với AB. Hai đường cùng vuông góc với MN thì song song với nhau.');
      },
    ],
  },
  tasks: () => [taskDrawParallel(), taskParallelCheck(), taskDrawPerp()],
};

// ── Thực hành ─────────────────────────────────────────────────────────────────────────────────────────

/** Hai đường thẳng cắt nhau tại H: có vuông góc không? (dùng ê ke kiểm tra được) */
function taskPerpCheck() {
  return {
    id: 'perpcheck',
    make: (rng) => ({ a: rng.pick([0, 0, 20, 30, 340, 90]), gap: rng.pick([90, 90, 75, 80, 100, 105]) }),
    async mount(f, { a, gap }) {
      f.q.innerHTML = 'Hai đường thẳng có <b>vuông góc</b> với nhau không?';
      const t = createSquare(f.tool);
      const H = { x: 9, y: 5.5 };
      t.point('H', H.x, H.y, { dx: 0.5, dy: 0.5 });
      const ln = (id, d, color) => t.line(id, { x: H.x - 5 * Math.cos(d * Math.PI / 180), y: H.y - 5 * Math.sin(d * Math.PI / 180) }, { x: H.x + 5 * Math.cos(d * Math.PI / 180), y: H.y + 5 * Math.sin(d * Math.PI / 180) }, { full: true, color });
      ln('m', a, '#2563EB'); ln('n', a + gap, '#16A34A');
      t.eke({ ...PARK, on: 'H' });
      f.say('Dùng ê ke kiểm tra rồi chọn Có hoặc Không.', 'Dùng <b>ê ke</b> kiểm tra rồi chọn.');
      await f.choose({ options: YESNO, answer: gap === 90, hint: 'Đặt góc vuông của ê ke vào H, xoay cho một cạnh nằm trên một đường, xem cạnh kia có khít không.' });
      t.lock(true);
      await t.moveEke(H, a);
      if (gap === 90) t.rightMark(H, a, a + 90);
      f.finish({ ok: gap === 90 ? 'Hai đường thẳng vuông góc.' : 'Hai đường thẳng không vuông góc: ê ke còn khe hở.' });
    },
  };
}

/** Hai đường thẳng (cắt mép giấy) có song song không? Sau đó kéo dài ra xem. */
function taskParallelCheck() {
  return {
    id: 'parcheck',
    make: (rng) => ({ y1: rng.int(2, 4), d: rng.int(3, 5), tilt: rng.pick([0, 0, 0.6, -0.6, 0.9]), base: rng.pick([0, 0.3, -0.3]) }),
    async mount(f, { y1, d, tilt, base }) {
      f.q.innerHTML = 'Hai đường thẳng có <b>song song</b> với nhau không?';
      const t = createSquare(f.tool, { eke: false });
      t.line('a', { x: 5, y: y1 }, { x: 15, y: y1 + base * 10 / 10 * 3 }, { color: '#2563EB' });
      t.line('b', { x: 5, y: y1 + d }, { x: 15, y: y1 + d + base * 3 + tilt }, { color: '#16A34A' });
      const par = tilt === 0;
      await f.choose({ options: YESNO, answer: par, say: 'Hai đường thẳng này có song song không?', hint: 'Đếm số ô giữa hai đường ở đầu bên trái và đầu bên phải.' });
      await t.extend('a'); await t.extend('b');
      f.finish({ ok: par ? 'Song song: kéo dài mãi cũng không cắt nhau.' : 'Không song song: kéo dài ra thì hai đường gần nhau dần rồi cắt nhau.' });
    },
  };
}

/** Trong hình, cặp cạnh nào vuông góc / song song? */
function taskPairs(kind) {
  return {
    id: `pairs-${kind}`,
    make: (rng) => ({ s: rng.int(0, 2) }),
    async mount(f, { s }) {
      const t = createSquare(f.tool, { eke: false });
      // Hình thang vuông ABCD: A góc vuông, AB // DC
      const shapes = [
        { A: [4, 2], B: [11, 2], C: [15, 8], D: [4, 8] },
        { A: [5, 2], B: [13, 2], C: [13, 9], D: [8, 9] },
        { A: [3, 3], B: [16, 3], C: [12, 8], D: [3, 8] },
      ];
      const sh = shapes[s];
      for (const [k, [x, y]] of Object.entries(sh)) t.point(k, x, y, { dx: x < 9 ? -0.5 : 0.5, dy: y < 5 ? -0.4 : 0.5 });
      t.line('AB', 'A', 'B'); t.line('BC', 'B', 'C'); t.line('CD', 'C', 'D'); t.line('DA', 'D', 'A');
      const right = s === 1 ? [['AB', 'BC'], ['BC', 'CD']] : [['DA', 'AB'], ['DA', 'CD']];
      if (kind === 'perp') {
        f.q.innerHTML = 'Cặp cạnh nào <b>vuông góc</b> với nhau?';
        const good = right[0].join(' và ');
        const opts = s === 1 ? ['AB và BC', 'AB và DA', 'CD và DA'] : ['DA và AB', 'AB và BC', 'BC và CD'];
        await f.choose({ options: opts, answer: good, say: 'Cặp cạnh nào vuông góc với nhau?', hint: 'Dùng ê ke hoặc đếm ô: hai cạnh vuông góc tạo thành góc vuông.' });
        const [p, q] = right[0];
        const at = t.LINES[p].a === t.LINES[q].a || t.LINES[p].a === t.LINES[q].b ? t.LINES[p].a : t.LINES[p].b;
        t.rightMark(at, dirOf(at, t.LINES[p].a === at ? t.LINES[p].b : t.LINES[p].a), dirOf(at, t.LINES[q].a === at ? t.LINES[q].b : t.LINES[q].a));
        f.finish({ ok: `${good}: vuông góc.` });
      } else {
        f.q.innerHTML = 'Cặp cạnh nào <b>song song</b> với nhau?';
        const good = s === 1 ? 'DA và BC' : 'AB và CD';
        const opts = s === 1 ? ['DA và BC', 'AB và CD', 'AB và DA'] : ['AB và CD', 'BC và DA', 'AB và BC'];
        await f.choose({ options: opts, answer: good, say: 'Cặp cạnh nào song song với nhau?', hint: 'Hai cạnh song song không bao giờ cắt nhau, cách đều nhau.' });
        const [p, q] = good.split(' và ').map(x => (t.LINES[x] ? x : x.split('').reverse().join('')));
        await t.extend(p, { color: '#2563EB' }); await t.extend(q, { color: '#2563EB' });
        f.finish({ ok: `${good}: song song.` });
      }
    },
  };
}

/** Vẽ đường thẳng qua H vuông góc với AB bằng ê ke. */
function taskDrawPerp({ slant = false } = {}) {
  return {
    id: `drawperp${slant ? 's' : ''}`,
    make: (rng) => ({ hx: rng.int(6, 12), hy: rng.int(2, 4), k: rng.pick([1, 2, 3]) }),
    async mount(f, { hx, hy, k }) {
      const t = createSquare(f.tool);
      t.eke(PARK);
      const A = slant ? { x: 2, y: 10 } : { x: 2, y: 8 }, B = slant ? { x: 18, y: 10 - 2 * k } : { x: 18, y: 8 };
      t.point('A', A.x, A.y, { dy: 0.5 }); t.point('B', B.x, B.y, { dy: 0.5 }); t.line('AB', 'A', 'B', { full: true });
      t.point('H', hx, hy, { dx: 0.5 });
      f.q.innerHTML = 'Vẽ đường thẳng qua <b>H</b> vuông góc với <b>AB</b>';
      f.say('Đặt một cạnh ê ke trên AB, trượt tới khi cạnh kia gặp H, rồi bấm Vẽ.', 'Cạnh ê ke trên <b>AB</b>, trượt tới <b>H</b>, rồi bấm <b>Vẽ</b>.');
      t.eke({ base: 'AB', through: 'H' });
      f.choicesBox.innerHTML = '<button type="button" class="g4-choice g4-choice-go">✏️ Vẽ theo cạnh ê ke</button>';
      f.choicesBox.classList.add('g4-choices-on');
      const btn = f.choicesBox.firstElementChild;
      if (import.meta.env.DEV) window.__g4solve = () => { const L = t.LINES.AB; t.eke({ c: foot(t.P.H, L.a, L.d), rot: L.d }); btn.click(); };
      await new Promise((res) => {
        let wrong = 0;
        btn.onclick = () => {
          sfx.tap();
          if (t.S.aligned) { btn.disabled = true; btn.classList.add('g4-choice-ok'); res(); return; }
          if (!wrong++) f.mistakes++;
          f.hint('Ê ke chưa đặt đúng: một cạnh góc vuông phải nằm trên AB, cạnh kia đi qua H.');
        };
      });
      t.lock(true);
      const L = t.LINES.AB;
      const ft = foot(t.P.H, L.a, L.d);
      await t.drawAlong('CD', ft, L.d + 90);
      t.rightMark(ft, L.d, L.d + 90);
      f.finish({ ok: 'Em vẽ đúng đường thẳng vuông góc.' });
    },
  };
}

/** Vẽ đường thẳng qua H song song với AB (hai lần vuông góc). */
function taskDrawParallel() {
  return {
    id: 'drawpar',
    make: (rng) => ({ hx: rng.int(7, 12), hy: rng.int(2, 4) }),
    async mount(f, { hx, hy }) {
      const t = createSquare(f.tool);
      t.eke(PARK);
      t.point('A', 2, 9, { dy: 0.5 }); t.point('B', 18, 9, { dy: 0.5 }); t.line('AB', 'A', 'B', { full: true });
      t.point('H', hx, hy, { dx: 0.5, dy: -0.5 });
      f.q.innerHTML = 'Vẽ đường thẳng qua <b>H</b> song song với <b>AB</b>';
      f.choicesBox.innerHTML = '<button type="button" class="g4-choice g4-choice-go">✏️ Vẽ theo cạnh ê ke</button>';
      f.choicesBox.classList.add('g4-choices-on');
      const btn = f.choicesBox.firstElementChild;
      const step = (base, id, text, shown) => new Promise((res) => {
        f.say(text, shown);
        t.eke({ ...PARK, base, through: 'H' });
        t.lock(false);
        btn.disabled = false; btn.classList.remove('g4-choice-ok');
        let wrong = 0;
        if (import.meta.env.DEV) window.__g4solve = () => { const L = t.LINES[base]; t.eke({ c: foot(t.P.H, L.a, L.d), rot: L.d }); btn.click(); };
        btn.onclick = async () => {
          sfx.tap();
          if (!t.S.aligned) { if (!wrong++) f.mistakes++; f.hint(`Một cạnh góc vuông của ê ke phải nằm trên ${base}, cạnh kia đi qua H.`); return; }
          btn.disabled = true; btn.classList.add('g4-choice-ok');
          t.lock(true);
          const L = t.LINES[base];
          const ft = foot(t.P.H, L.a, L.d);
          await t.drawAlong(id, ft, L.d + 90, { color: id === 'MN' ? '#94A3B8' : '#2563EB' });
          t.rightMark(ft, L.d, L.d + 90);
          res();
        };
      });
      await step('AB', 'MN', 'Bước một: vẽ đường thẳng qua H vuông góc với AB.', 'Bước 1: vẽ đường qua H <b>vuông góc với AB</b>.');
      await step('MN', 'CD', 'Bước hai: vẽ đường thẳng qua H vuông góc với đường vừa vẽ.', 'Bước 2: vẽ đường qua H <b>vuông góc với đường vừa vẽ</b>.');
      f.finish({ ok: 'Đường thẳng qua H song song với AB.' });
    },
  };
}

export const LINE_LESSONS = { 27: B27, 28: B28, 29: B29, 30: B30 };
