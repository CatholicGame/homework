/**
 * Bài 4: Biểu thức chứa chữ — ⚙️ Máy biểu thức.
 * Bài 24: Tính chất giao hoán và kết hợp của phép cộng — hai máy cạnh nhau, 🧩 thanh ghép số, tính thuận tiện.
 */

import { createExpr, createExprSteps, evalTokens, exprText, LETTER_COLOR } from '../exprm.js';
import { createCanvas } from '../canvas.js';
import { BOX } from '../practice.js';
import { sleep } from '../../grade3Drills/kit.js';
import { sfx, INK } from '../frame.js';
import { fmt, fmtSp } from '../num.js';

const tok = (s) => s.split(' ');

const B4 = {
  explore: {
    setup: (board) => createExpr(board, { machines: [{ tokens: tok('2 + a') }] }),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('2 cộng a là một biểu thức chứa chữ. Chữ a có thể là số nào cũng được.', '<b>2 + a</b>: biểu thức chứa chữ');
        for (const k of [0, 1, 2]) {
          await c.say(k ? 'Chọn số khác cho a.' : 'Em chọn một số cho a, máy sẽ tính.', 'Chọn số cho <b>a</b>:');
          const v = await c.choose([[4, 12, 25], [7, 30, 99], [0, 50, 100]][k].map(x => ({ html: `a = ${x}`, value: x })));
          t.reset();
          await t.feed({ a: v });
          await c.say(`Với a bằng ${v} thì 2 cộng a bằng ${2 + v}.`);
        }
        await c.say('Mỗi lần thay chữ a bằng một số, ta tính được một giá trị của biểu thức 2 cộng a.', 'Thay chữ bằng số → một <b>giá trị</b> của biểu thức');
      },
      async (c) => {
        const t = c.use((b) => createExpr(b, { machines: [{ tokens: tok('( b + 4 ) * 3') }] }));
        await c.say('Biểu thức có dấu ngoặc: b cộng 4, rồi nhân 3. Thay b bằng số rồi tính trong ngoặc trước.', '<b>(b + 4) × 3</b>');
        for (const set of [[27, 5], [10, 6]]) {
          const v = await c.choose(set.map(x => ({ html: `b = ${x}`, value: x })));
          t.reset();
          await t.feed({ b: v });
          await c.say(`Với b bằng ${v}: ${v} cộng 4 bằng ${v + 4}, nhân 3 bằng ${(v + 4) * 3}.`);
        }
      },
      async (c) => {
        const t = c.use((b) => createExpr(b, { machines: [{ tokens: tok('a * 4') }], shape: 'square', title: 'Chu vi hình vuông: P = a × 4' }));
        await c.say('Chu vi hình vuông cạnh a là a nhân 4. Đây cũng là biểu thức chứa chữ.', 'Hình vuông cạnh a: <b>P = a × 4</b>');
        for (const set of [[3, 5], [9, 12], [7, 20]]) {
          const v = await c.choose(set.map(x => ({ html: `a = ${x} cm`, value: x })));
          t.reset();
          await t.feed({ a: v });
        }
        await c.say('Cạnh càng dài thì chu vi càng lớn. Công thức giúp tính nhanh chu vi của mọi hình vuông.');
      },
      async (c) => {
        const t = c.use((b) => createExpr(b, { machines: [{ tokens: tok('( a + b ) * 2') }], shape: 'rect', title: 'Chu vi hình chữ nhật: P = (a + b) × 2' }));
        await c.say('Hình chữ nhật có chiều dài a, chiều rộng b. Chu vi là a cộng b, rồi nhân 2.', 'Hình chữ nhật: <b>P = (a + b) × 2</b>');
        for (const set of [[[10, 7], [25, 16]], [[34, 28], [12, 5]]]) {
          const v = await c.choose(set.map(([a, b]) => ({ html: `a = ${a}, b = ${b}`, value: `${a},${b}` })));
          const [a, b] = v.split(',').map(Number);
          t.reset();
          await t.feed({ a, b });
        }
      },
    ],
  },
  tasks: () => [taskEval('2 + a'), taskEval('( a + b ) * 2'), taskEval('a * 4'), taskEval('m - ( n - p )'), taskEval('125 : m')],
};

// ── Bài 24 ────────────────────────────────────────────────────────────────────────────────────────────
const BAR = { a: '#60A5FA', b: '#F472B6', c: '#86EFAC' };
function barsSvg(parts, y, scale) {
  let x = 60, g = '';
  for (const [name, v] of parts) {
    const w = v * scale;
    g += `<rect x="${x}" y="${y}" width="${w}" height="70" rx="8" fill="${BAR[name] || '#FDE68A'}" stroke="${INK}" stroke-width="4"/>
      <text x="${x + w / 2}" y="${y + 47}" class="g4v-t" font-size="34">${name.length === 1 ? name : ''}${name.length === 1 ? ` = ${v}` : v}</text>`;
    x += w;
  }
  return { g, end: x };
}

const B24 = {
  explore: {
    setup: (board) => createExpr(board, { machines: [{ tokens: tok('a + b') }, { tokens: tok('b + a') }] }),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Hai máy: máy trái tính a cộng b, máy phải tính b cộng a. Chọn số cho a và b xem hai máy ra số nào.', 'So sánh <b>a + b</b> và <b>b + a</b>');
        for (const set of [[[4, 3], [6, 9]], [[8, 5], [20, 15]], [[125, 75], [300, 47]]]) {
          const v = await c.choose(set.map(([a, b]) => ({ html: `a = ${a}, b = ${b}`, value: `${a},${b}` })));
          const [a, b] = v.split(',').map(Number);
          t.reset();
          await t.feed({ a, b });
        }
        await c.say('Hai máy luôn ra cùng một số. a cộng b bằng b cộng a. Khi đổi chỗ các số hạng trong một tổng thì tổng không thay đổi.', '<b>a + b = b + a</b>: đổi chỗ các số hạng, tổng không đổi');
      },
      async (c) => {
        const t = c.use((b) => createCanvas(b));
        const a = 5, bb = 3, s = 90;
        const top = barsSvg([['a', a], ['b', bb]], 140, s), bot = barsSvg([['b', bb], ['a', a]], 320, s);
        t.draw(`${top.g}${bot.g}<line x1="${top.end}" y1="110" x2="${top.end}" y2="420" stroke="#DC2626" stroke-width="5" stroke-dasharray="12 8"/>`);
        t.caption('Ghép thanh a rồi b, hay b rồi a: dài <b>bằng nhau</b>');
        await t.anim('rect', [{ opacity: 0, transform: 'translateX(-40px)' }, { opacity: 1, transform: 'none' }], 400, { stagger: 150 });
        await c.say('Ghép thanh a với thanh b, hay thanh b với thanh a, cả hai đều dài như nhau.');
      },
      async (c) => {
        const t = c.use((b) => createExpr(b, { machines: [{ tokens: tok('( a + b ) + c') }, { tokens: tok('a + ( b + c )') }] }));
        await c.say('Ba số hạng. Máy trái cộng a với b trước. Máy phải cộng b với c trước. Chọn số xem sao.', '<b>(a + b) + c</b> và <b>a + (b + c)</b>');
        for (const set of [[[6, 4, 8], [39, 18, 82]], [[45, 75, 25], [100, 7, 93]]]) {
          const v = await c.choose(set.map(([a, b, cc]) => ({ html: `${a}, ${b}, ${cc}`, value: `${a},${b},${cc}` })));
          const [a, b, cc] = v.split(',').map(Number);
          t.reset();
          await t.feed({ a, b, c: cc });
        }
        await c.say('Khi cộng một tổng hai số với số thứ ba, ta có thể cộng số thứ nhất với tổng của số thứ hai và số thứ ba.', '<b>(a + b) + c = a + (b + c)</b>');
      },
      async (c) => {
        const t = c.use((b) => createCanvas(b));
        t.draw(`<text x="500" y="200" class="g4v-t" font-size="90">75 + 219 + 25</text>`);
        t.caption('Tính <b>thuận tiện</b>: tìm hai số cộng được số tròn trăm');
        await c.say('Tính bảy mươi lăm cộng hai trăm mười chín cộng hai mươi lăm. Cặp số nào cộng lại được số tròn trăm?');
        await c.choose([{ html: '75 + 219', value: 1 }, { html: '75 + 25', value: 2 }, { html: '219 + 25', value: 3 }], 2, { hint: 'Hàng đơn vị 5 cộng 5 bằng 10, hàng chục 7 cộng 2 thêm 1 bằng 10.' });
        t.draw(`<text x="500" y="170" class="g4v-t" font-size="72">75 + 25 + 219</text><text x="500" y="290" class="g4v-t" font-size="72">= 100 + 219</text><text x="500" y="410" class="g4v-t" font-size="72" fill="#16A34A">= 319</text>`);
        await t.anim('text', [{ opacity: 0 }, { opacity: 1 }], 400, { stagger: 500 });
        await c.say('Đổi chỗ để cộng 75 với 25 trước, được 100. 100 cộng 219 bằng 319. Tính như vậy nhanh hơn.', '75 + 25 = 100 · 100 + 219 = <b>319</b>');
      },
    ],
  },
  tasks: () => [taskBlank(), taskConvenient(), taskBlank({ assoc: true }), taskConvenient({ four: true })],
};

// ── Thực hành ─────────────────────────────────────────────────────────────────────────────────────────

/** Tính giá trị biểu thức với giá trị chữ cho trước. */
function taskEval(src) {
  const tokens = tok(src);
  return {
    id: `ev:${src}`,
    make: (rng) => {
      for (;;) {
        const vals = { a: rng.int(5, 300), b: rng.int(3, 150), m: rng.pick([1, 5, 25, 125]), n: rng.int(20, 90), p: rng.int(2, 19) };
        if (src === 'm - ( n - p )') vals.m = rng.int(100, 500);
        const r = evalTokens(tokens, vals);
        if (Number.isInteger(r) && r >= 0) return { vals };
      }
    },
    async mount(f, { vals }) {
      const used = [...new Set(tokens.filter(x => /^[a-z]$/.test(x)))];
      const ans = evalTokens(tokens, vals);
      f.q.innerHTML = `Tính giá trị của <b>${exprText(tokens)}</b> với ${used.map(l => `${l} = <b class="g4x-given" data-l="${l}" style="color:${LETTER_COLOR[l]}">${fmt(vals[l])}</b>`).join(', ')}`;
      // Như sách: a × 4 = 194 × 4 = 776. Bước 0 thay chữ bằng số (số bay từ đề vào), mỗi bước sau em gõ kết quả một phép.
      const t = createExprSteps(f.tool, { tokens, vals });
      f.say(`Thay ${used.join(', ')} bằng số.`);
      await t.substitute((l) => f.q.querySelector(`.g4x-given[data-l="${l}"]`));
      for (let k = 1; k < t.steps.length; k++) {
        const st = t.steps[k];
        const last = k === t.steps.length - 1;
        const box = t.show(k);
        await f.ask({ box, answer: st.toks[st.at], max: String(st.toks[st.at]).length + 1,
          say: st.inParen ? `Tính trong ngoặc trước: ${st.opSay}.` : last ? `Tính ${st.opSay}.` : `Tính ${st.opSay} trước.`,
          shown: st.inParen ? `Tính trong ngoặc trước: <b>${st.op}</b>` : `Tính <b>${st.op}</b>`,
          hint: (_, wrong) => (wrong > 1 ? `${st.opSay} bằng ${fmtSp(st.toks[st.at])}.` : `Tính lại ${st.opSay}.`) });
      }
      f.finish({ ok: `${exprText(tokens, vals)} = ${fmt(ans)}` });
    },
  };
}

/** Điền số vào chỗ trống theo tính chất giao hoán / kết hợp. */
function taskBlank({ assoc = false } = {}) {
  return {
    id: `blank${assoc ? 'a' : ''}`,
    make: (rng) => ({ a: rng.int(100, 999), b: rng.int(100, 999), c: rng.int(10, 99) }),
    async mount(f, { a, b, c }) {
      const q = assoc ? `(${a} + ${b}) + ${c} = ${a} + (${BOX} + ${c})` : `${a} + ${BOX} = ${b} + ${a}`;
      f.q.innerHTML = `<span style="font-size:1.25em">${q}</span>`;
      const t = createExpr(f.tool, { machines: assoc ? [{ tokens: tok('( a + b ) + c') }, { tokens: tok('a + ( b + c )') }] : [{ tokens: tok('a + b') }, { tokens: tok('b + a') }], rows: 1 });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: b, max: 3, say: 'Điền số thích hợp.', hint: assoc ? 'Cộng a với tổng của b và c.' : 'Đổi chỗ các số hạng, tổng không đổi.' });
      await t.feed({ a, b, c });
      f.finish({ ok: assoc ? '(a + b) + c = a + (b + c)' : 'a + b = b + a' });
    },
  };
}

/** Tính thuận tiện: chọn cặp số tròn trăm, rồi gõ kết quả. */
function taskConvenient({ four = false } = {}) {
  return {
    id: `conv${four ? '4' : ''}`,
    make: (rng) => {
      const x = rng.int(11, 89), y = 100 - x;
      const z = rng.int(101, 899);
      if (!four) return { ns: rng.shuffle([x, y, z]), pair: [x, y] };
      const u = rng.int(102, 498), v = (Math.ceil(u / 100) + rng.int(1, 3)) * 100 - u;
      return { ns: [x, u, y, v].sort(() => rng() - 0.5), pair: [x, y], pair2: [u, v] };
    },
    async mount(f, { ns, pair, pair2 }) {
      const total = ns.reduce((s, n) => s + n, 0);
      f.q.innerHTML = `Tính bằng cách thuận tiện: <b>${ns.join(' + ')}</b>`;
      const pairs = [];
      for (let i = 0; i < ns.length; i++) for (let j = i + 1; j < ns.length; j++) pairs.push([ns[i], ns[j]]);
      const good = pairs.find(p => (p[0] + p[1]) % 100 === 0);
      const opts = [good, ...pairs.filter(p => (p[0] + p[1]) % 100 !== 0).slice(0, 2)].sort(() => 0.5 - Math.random());
      await f.choose({ options: opts.map(p => ({ html: `${p[0]} + ${p[1]}`, value: `${p[0]}+${p[1]}` })), answer: `${good[0]}+${good[1]}`, say: 'Cộng cặp số nào trước thì được số tròn trăm?', hint: 'Tìm hai số có hàng đơn vị cộng lại bằng 10, hàng chục cộng thêm 1 bằng 10.' });
      f.q.innerHTML = `${ns.join(' + ')} = ${BOX}`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: total, max: 5, say: 'Tính tổng.', hint: `${good[0]} + ${good[1]} = ${good[0] + good[1]}. Cộng tiếp các số còn lại.` });
      f.finish({ ok: `${ns.join(' + ')} = ${fmt(total)}`, tip: pair2 ? `Ghép ${pair[0]} + ${pair[1]} và ${pair2[0]} + ${pair2[1]}.` : '' });
    },
  };
}

export const EXPR_LESSONS = { 4: B4, 24: B24 };
export { sleep, sfx };
