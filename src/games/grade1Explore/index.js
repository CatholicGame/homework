/**
 * 🔎 Khám phá Toán 1 (Vở BT Toán 1 Tập Một, Bài 2–34): EXPLORES[key] = { title, setup, steps } cho runExplore
 * (grade4Tools/frame.js). Mọi bài dùng bảng đồ vật groups.js: em bấm đồ vật cho bay vào khung 10 ô, nối từng
 * cặp, nhặt hình, gộp hai nhóm (phép cộng), cho đồ vật bay đi (phép trừ). Thầy nói, chữ trên màn rất ít.
 */

import { createGroups, ex } from './groups.js';
import { SHAPE_NAME } from './art.js';
import { N, sleep, pic, askNum, askSign, tapMove, tapAway, pairUp, tapZone, tapPick } from './steps.js';

const W = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười'];
const words = (from, to) => { const a = []; for (let k = from; to >= from ? k <= to : k >= to; k += to >= from ? 1 : -1) a.push(W[k]); return a.join(', '); };

/** Đếm to từng đồ vật của khu (số nhỏ hiện trên đồ vật) cùng lúc thầy đếm. */
async function countAloud(c, t, zone, name) {
  const n = t.count(zone);
  t.unmark(zone);
  await Promise.all([
    t.countUp(zone, { ms: 560 }),
    c.say(`Đếm nào: ${words(1, n)}. Có ${n} ${name}.`, `Có <b>${n}</b> ${name}.`),
  ]);
}

// ── Bố cục ───────────────────────────────────────────────────────────────────────────────────────────
/** Khung ô (đếm vào) phía trên, rổ đồ vật phía dưới (khung ngang: rổ bên trái). */
const countLayout = (fc, fr, pc, pr, pile = 'basket') => ({
  zones: [{ id: 'frame', type: 'frame', cols: fc, rows: fr, cap: true }, { id: 'pile', type: pile, cols: pc, rows: pr }],
  tall: { areas: "'frame' 'pile'", rows: '1.1fr 1fr' },
  wide: { areas: "'pile frame'", cols: '1fr 1.25fr' },
});
/** Hai kệ để nối từng cặp; extra: thêm rổ bên dưới / bên phải. */
const pairLayout = (cols, extra = 0) => ({
  zones: [{ id: 'top', type: 'shelf', cols, rows: 1, cap: true }, { id: 'bot', type: 'shelf', cols, rows: 1, cap: true },
    ...(extra ? [{ id: 'pile', type: 'basket', cols: extra, rows: 1 }] : [])],
  tall: extra ? { areas: "'top' 'bot' 'pile'", rows: '1fr 1fr 0.7fr' } : { areas: "'top' 'bot'", rows: '1fr 1fr' },
  wide: extra ? { areas: "'top pile' 'bot pile'", cols: '1fr 0.42fr' } : null,
});
/** Hai đĩa (hai nhóm) ở trên, khung gộp lại ở dưới. */
const joinLayout = (pc, pr, sc, sr) => ({
  zones: [{ id: 'l', type: 'plate', cols: pc, rows: pr, cap: true }, { id: 'r', type: 'plate', cols: pc, rows: pr, cap: true },
    { id: 'sum', type: 'frame', cols: sc, rows: sr, cap: true }],
  tall: { areas: "'l r' 'sum sum'", rows: '1fr 1fr', cols: '1fr 1fr' },
  wide: { areas: "'l r sum'", cols: '1fr 1fr 1.5fr' },
});
/** Một dãy thẻ số. */
const cardsLayout = (n) => ({ zones: [{ id: 'cards', type: 'track', cols: n > 5 ? 5 : n, rows: n > 5 ? 2 : 1 }], tall: { areas: "'cards'", rows: '1fr' } });

const fill = (t, zone, kind, n, opts = {}) => { for (let i = 0; i < n; i++) t.add(zone, kind, opts); };
const cards = (t, list, hide = []) => list.forEach((n, i) => t.add('cards', 'num', { n: hide.includes(i) ? '?' : n, val: n }));

/** Bước: dãy số có ô "?", em chọn số còn thiếu lần lượt. */
async function fillTrack(c, t, list, hide, say) {
  await c.say(say[0], say[1]);
  for (const i of hide) {
    const it = t.items('cards')[i];
    t.glow(it);
    const v = list[i];
    const opts = [...new Set([v, v + 1 <= 10 ? v + 1 : v - 2, v - 1 >= 0 ? v - 1 : v + 2])].sort((a, b) => a - b);
    await askNum(c, v, opts, i > 0 ? `Số đứng sau ${list[i - 1]} là số nào? Đếm tiếp từ ${list[i - 1]}.` : `Đếm lùi từ ${list[i + 1]}.`);
    t.glow(it, false);
    t.update(it, { n: v });
  }
}

// ── Bài 2: Nhiều hơn, ít hơn ─────────────────────────────────────────────────────────────────────────
const B2 = {
  title: 'Bài 2: Nhiều hơn, ít hơn',
  setup: (b) => { const t = createGroups(b, pairLayout(5)); fill(t, 'top', 'cup', 5); fill(t, 'bot', 'spoon', 4); return t; },
  steps: [
    async (c) => {
      await c.say('Hàng trên là các cái cốc. Hàng dưới là các cái thìa. Mỗi cái cốc ta đặt một cái thìa.', `${pic('cup')} và ${pic('spoon')}`);
      await c.say('Em bấm vào từng cái cốc để nối với một cái thìa.', 'Bấm vào từng cái <b>cốc</b> để nối.');
      await pairUp(c, c.t, 'top', 'bot', { extra: 'Cái cốc này không có thìa. Nó bị thừa ra.' });
    },
    async (c) => {
      await c.say('Còn một cái cốc không có thìa. Vậy số cốc nhiều hơn hay số thìa nhiều hơn?', 'Cái gì <b>nhiều hơn</b>?');
      await c.choose([{ html: `${pic('cup')} Số cốc`, value: 'cup' }, { html: `${pic('spoon')} Số thìa`, value: 'spoon' }], 'cup',
        { hint: 'Bên nào còn thừa ra thì bên đó nhiều hơn.' });
      await c.say('Đúng rồi! Số cốc nhiều hơn số thìa. Số thìa ít hơn số cốc.', 'Số cốc <b>nhiều hơn</b> số thìa.<br>Số thìa <b>ít hơn</b> số cốc.');
    },
    async (c) => {
      const t = c.t;
      t.unpair(); t.unglow(); t.clear();
      fill(t, 'top', 'bunny', 3); fill(t, 'bot', 'carrot', 5);
      await c.say('Bây giờ là thỏ và cà rốt. Mỗi bạn thỏ một củ cà rốt. Em nối đi!', `Nối mỗi ${pic('bunny')} với một ${pic('carrot')}.`);
      await pairUp(c, t, 'top', 'bot', { extra: 'Bạn thỏ nào cũng đã có cà rốt rồi.' });
    },
    async (c) => {
      await c.say('Số thỏ ít hơn hay số cà rốt ít hơn?', 'Cái gì <b>ít hơn</b>?');
      await c.choose([{ html: `${pic('bunny')} Số thỏ`, value: 'bunny' }, { html: `${pic('carrot')} Số cà rốt`, value: 'carrot' }], 'bunny',
        { hint: 'Cà rốt còn thừa ra, vậy cà rốt nhiều hơn. Bên kia ít hơn.' });
      await c.say('Đúng rồi! Số thỏ ít hơn số cà rốt. Muốn biết bên nào nhiều hơn, ít hơn, em nối từng cặp. Bên nào thừa ra thì nhiều hơn.',
        'Nối từng cặp. Bên nào <b>thừa ra</b> thì <b>nhiều hơn</b>.');
    },
  ],
};

// ── Bài 3, 4: Hình vuông, hình tròn, hình tam giác ───────────────────────────────────────────────────
const shapeLayout = (kinds, pc) => ({
  zones: [{ id: 'pile', type: 'board', cols: pc, rows: 2 }, ...kinds.map((k) => ({ id: k, type: 'basket', cols: 2, rows: 2, cap: true }))],
  tall: { areas: `'${kinds.map(() => 'pile').join(' ')}' '${kinds.join(' ')}'`, rows: '1fr 1fr', cols: kinds.map(() => '1fr').join(' ') },
  wide: { areas: `'pile ${kinds.join(' ')}'`, cols: `1.5fr ${kinds.map(() => '1fr').join(' ')}` },
});
const shapeCap = (k) => `${SHAPE_NAME[k].replace('hình ', '')}`;
async function collect(c, t, k, say, shown) {
  t.glow(k);
  await c.say(say, shown);
  t.glow(k, false);
  await tapMove(c, t, {
    from: 'pile', to: k, n: t.items('pile').filter((it) => it.tag === k).length, ok: (it) => it.tag === k, mark: false,
    bad: (it) => `Đây là ${SHAPE_NAME[it.tag]}. Tìm ${SHAPE_NAME[k]}.`, nudge: `Tìm ${SHAPE_NAME[k]} trên bảng.`,
  });
}
const B3_PILE = [['sq', '#60A5FA', 0, 1], ['ci', '#F87171', 0, 0.9], ['sq', '#FACC15', 45, 0.75], ['ci', '#4ADE80', 0, 0.7],
  ['sq', '#F472B6', 20, 0.95], ['ci', '#A78BFA', 0, 1], ['sq', '#4ADE80', 0, 0.65], ['ci', '#FB923C', 0, 0.8]];
const B3 = {
  title: 'Bài 3: Hình vuông, hình tròn',
  setup: (b) => {
    const t = createGroups(b, { ...shapeLayout(['sq', 'ci'], 4), items: B3_PILE.map(([k, color, rot, size]) => ({ zone: 'pile', kind: k, color, rot, size, tag: k })) });
    t.cap('sq', shapeCap('sq')); t.cap('ci', shapeCap('ci'));
    return t;
  },
  steps: [
    async (c) => {
      const t = c.t;
      const sq = t.items('pile')[0];
      t.glow(sq);
      await c.say('Đây là hình vuông. Hình vuông có bốn cạnh dài bằng nhau.', `${pic('sq', { color: '#60A5FA' })} <b>hình vuông</b>`);
      t.glow(sq, false);
      const ci = t.items('pile')[1];
      t.glow(ci);
      await c.say('Đây là hình tròn. Hình tròn tròn xoe, không có cạnh.', `${pic('ci', { color: '#F87171' })} <b>hình tròn</b>`);
      t.glow(ci, false);
    },
    async (c) => collect(c, c.t, 'sq', 'Em bấm vào tất cả các hình vuông để cho vào giỏ hình vuông. Có hình đặt nghiêng đấy!', 'Bấm vào các <b>hình vuông</b>.'),
    async (c) => {
      await collect(c, c.t, 'ci', 'Bây giờ bấm vào các hình tròn để cho vào giỏ hình tròn.', 'Bấm vào các <b>hình tròn</b>.');
    },
    async (c) => {
      await c.say('Giỏ hình vuông có mấy hình?', 'Có mấy <b>hình vuông</b>?');
      await Promise.all([c.t.countUp('sq', { cap: false }), sleep(100)]);
      await askNum(c, 4, [3, 4, 5], 'Đếm các hình trong giỏ hình vuông.');
      await c.say('Có 4 hình vuông. Hình vuông to hay nhỏ, đặt thẳng hay nghiêng, vẫn là hình vuông.', 'To hay nhỏ, thẳng hay nghiêng: vẫn là <b>hình vuông</b>.');
    },
    async (c) => {
      await c.say('Hình nào là hình tròn?', 'Hình nào là <b>hình tròn</b>?');
      await c.choose([{ html: pic('sq', { color: '#FACC15', rot: 30 }), value: 'sq' }, { html: pic('ci', { color: '#FACC15' }), value: 'ci' }, { html: pic('sq', { color: '#4ADE80' }), value: 'sq2' }],
        'ci', { hint: 'Hình tròn không có cạnh, không có góc.' });
      await c.say('Giỏi lắm! Em đã biết hình vuông và hình tròn.');
    },
  ],
};

const B4_PILE = [['tri', '#FACC15', 0, 1], ['sq', '#60A5FA', 0, 0.8], ['tri', '#F472B6', 180, 0.8], ['ci', '#4ADE80', 0, 0.8],
  ['tri', '#4ADE80', 25, 0.7], ['ci', '#F87171', 0, 1], ['sq', '#FB923C', 30, 0.9], ['tri', '#A78BFA', -90, 0.95]];
const B4 = {
  title: 'Bài 4: Hình tam giác',
  setup: (b) => {
    const t = createGroups(b, { ...shapeLayout(['tri', 'sq', 'ci'], 4), items: B4_PILE.map(([k, color, rot, size]) => ({ zone: 'pile', kind: k, color, rot, size, tag: k })) });
    ['tri', 'sq', 'ci'].forEach((k) => t.cap(k, shapeCap(k)));
    return t;
  },
  steps: [
    async (c) => {
      const t = c.t;
      const tri = t.items('pile')[0];
      t.glow(tri);
      await c.say('Đây là hình tam giác. Hình tam giác có ba cạnh và ba góc nhọn.', `${pic('tri', { color: '#FACC15' })} <b>hình tam giác</b>: 3 cạnh`);
      t.glow(tri, false);
    },
    async (c) => collect(c, c.t, 'tri', 'Em bấm vào tất cả các hình tam giác. Hình quay ngược, quay ngang vẫn là hình tam giác.', 'Bấm vào các <b>hình tam giác</b>.'),
    async (c) => {
      const t = c.t;
      await c.say('Còn lại hình vuông và hình tròn. Bấm vào từng hình để xếp vào đúng giỏ.', 'Xếp mỗi hình vào đúng giỏ.');
      t.live((it) => it.zone === 'pile');
      t.onTap = (it) => { if (it.zone === 'pile') { it.el.classList.remove('x1g-live'); t.move(it, it.tag); } };
      await c.until(t, () => t.count('pile') === 0, { nudge: 'Bấm vào một hình còn lại.', el: () => t.items('pile')[0]?.el });
      t.onTap = null;
      for (const it of t.items('pile')) await t.move(it, it.tag);
      t.live(null);
    },
    async (c) => {
      await c.say('Giỏ hình tam giác có mấy hình?', 'Có mấy <b>hình tam giác</b>?');
      await c.t.countUp('tri', { cap: false });
      await askNum(c, 4, [3, 4, 5], 'Đếm các hình trong giỏ hình tam giác.');
    },
    async (c) => {
      await c.say('Cái mái nhà này là hình gì?', `${pic('tri', { color: '#EF4444', rot: 0 })} là hình gì?`);
      await c.choose([{ html: 'vuông', value: 'sq' }, { html: 'tròn', value: 'ci' }, { html: 'tam giác', value: 'tri' }], 'tri',
        { hint: 'Đếm số cạnh: có ba cạnh.' });
      await c.say('Đúng rồi, hình tam giác! Em đã biết hình vuông, hình tròn và hình tam giác.');
    },
  ],
};

// ── Bài 6: Các số 1, 2, 3; Bài 8: Các số 1, 2, 3, 4, 5 ──────────────────────────────────────────────
function pickPlates(kind, counts) {
  return {
    zones: counts.map((_, i) => ({ id: `p${i}`, type: 'plate', cols: 5, rows: 1 })),
    tall: { areas: counts.map((_, i) => `'p${i}'`).join(' ') },
  };
}
const fillPlates = (t, kind, counts) => counts.forEach((n, i) => fill(t, `p${i}`, kind, n));

const B6 = {
  title: 'Bài 6: Các số 1, 2, 3',
  setup: (b) => { const t = createGroups(b, countLayout(3, 1, 3, 1)); fill(t, 'pile', 'chick', 3); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      await c.say('Trong rổ có các bạn gà con. Em bấm vào một bạn gà con để đưa vào ô.', `Bấm vào một ${pic('chick')}.`);
      await tapMove(c, t, { from: 'pile', to: 'frame', n: 1 });
      t.expr(ex('1'));
      await c.say('Có 1 gà con. Số 1.', 'Có <b>1</b> gà con. Số <b>1</b>.');
    },
    async (c) => {
      const t = c.t;
      await c.say('Bấm thêm 1 bạn gà con nữa.', `Thêm 1 ${pic('chick')}.`);
      await tapMove(c, t, { from: 'pile', to: 'frame', n: 1 });
      t.expr(ex('2'));
      await c.say('1 thêm 1 là 2. Có 2 gà con. Số 2.', '1 thêm 1 là <b>2</b>.');
    },
    async (c) => {
      const t = c.t;
      await c.say('Bấm thêm 1 bạn gà con nữa.', `Thêm 1 ${pic('chick')}.`);
      await tapMove(c, t, { from: 'pile', to: 'frame', n: 1 });
      await countAloud(c, t, 'frame', 'gà con');
      t.expr(ex('3'));
      await c.say('2 thêm 1 là 3. Số 3.', '2 thêm 1 là <b>3</b>.');
    },
    async (c) => {
      const t = c.use((b) => createGroups(b, pickPlates('apple', [2, 1, 3])));
      fillPlates(t, 'apple', [2, 1, 3]);
      t.expr(ex('2'));
      await c.say('Đĩa nào có 2 quả táo? Em bấm vào đĩa đó.', 'Bấm vào đĩa có <b>2</b> quả táo.');
      await tapZone(c, t, 'p0', { zones: ['p0', 'p1', 'p2'], bad: 'Chỉ tay đếm số quả táo trên mỗi đĩa.' });
      t.expr(ex('3'));
      await c.say('Còn đĩa có 3 quả táo?', 'Bấm vào đĩa có <b>3</b> quả táo.');
      await tapZone(c, t, 'p2', { zones: ['p0', 'p1', 'p2'], bad: 'Đếm: một, hai, ba.' });
    },
    async (c) => {
      const t = c.use((b) => createGroups(b, cardsLayout(3)));
      cards(t, [1, 2, 3], [1, 2]);
      await fillTrack(c, t, [1, 2, 3], [1, 2], ['Đếm thêm 1: số nào đứng sau số 1?', 'Số nào còn thiếu?']);
      await c.say('1, 2, 3. Em đếm được tới 3 rồi!', '<b>1, 2, 3</b>');
    },
  ],
};

const B8 = {
  title: 'Bài 8: Các số 1, 2, 3, 4, 5',
  setup: (b) => { const t = createGroups(b, countLayout(5, 1, 4, 2)); fill(t, 'pile', 'ball', 7); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      await c.say('Em bấm vào các quả bóng để xếp vào hàng ô. Mỗi lần một quả, vừa bấm vừa đếm.', 'Xếp <b>5</b> quả bóng vào các ô.');
      await tapMove(c, t, { from: 'pile', to: 'frame', n: 5 });
      t.expr(ex('1', '2', '3', '4', '5'));
      await c.say('Một, hai, ba, bốn, năm. Có 5 quả bóng. Số 5.', 'Có <b>5</b> quả bóng.');
    },
    async (c) => {
      const t = c.use((b) => createGroups(b, pickPlates('apple', [4, 5, 3])));
      fillPlates(t, 'duck', [4, 5, 3]);
      t.glow('p0');
      await c.say('Đĩa thứ nhất có mấy con vịt?', 'Có mấy con vịt?');
      await t.countUp('p0', { cap: false });
      await askNum(c, 4, [3, 4, 5], 'Chỉ tay vào từng con vịt và đếm.');
      t.unglow();
      t.expr(ex('5'));
      await c.say('Đĩa nào có 5 con vịt? Bấm vào đĩa đó.', 'Bấm vào đĩa có <b>5</b> con vịt.');
      await tapZone(c, t, 'p1', { zones: ['p0', 'p1', 'p2'], bad: 'Đếm số vịt trên mỗi đĩa.' });
    },
    async (c) => {
      const t = c.use((b) => createGroups(b, cardsLayout(5)));
      cards(t, [1, 2, 3, 4, 5], [2, 4]);
      await fillTrack(c, t, [1, 2, 3, 4, 5], [2, 4], ['Đếm thêm 1 từ 1 tới 5. Số nào còn thiếu?', 'Số nào còn thiếu?']);
    },
    async (c) => {
      const t = c.use((b) => createGroups(b, cardsLayout(5)));
      cards(t, [5, 4, 3, 2, 1], [1, 3]);
      await fillTrack(c, t, [5, 4, 3, 2, 1], [1, 3], ['Đếm lùi từ 5: năm, bốn, ba… Số nào còn thiếu?', 'Đếm lùi: số nào còn thiếu?']);
      await c.say('Đếm thêm: 1, 2, 3, 4, 5. Đếm lùi: 5, 4, 3, 2, 1.', '1, 2, 3, 4, 5<br>5, 4, 3, 2, 1');
    },
  ],
};

// ── Bài 10, 11, 13: So sánh hai nhóm, dấu <, >, = ────────────────────────────────────────────────────
async function compareRows(c, t, a, b, ka, kb, nameA, nameB) {
  t.unpair(); t.unglow(); t.clear(); t.cap('top', ''); t.cap('bot', ''); t.expr('');
  fill(t, 'top', ka, a); fill(t, 'bot', kb, b);
  await c.say(`Nối mỗi ${nameA} với một ${nameB}.`, `Nối ${pic(ka)} với ${pic(kb)}.`);
  await pairUp(c, t, 'top', 'bot');
  t.cap('top', String(a)); t.cap('bot', String(b));
  t.expr(ex(String(a), '□', String(b)));
}
const signSay = (a, b) => (a < b ? `${a} bé hơn ${b}, viết ${a} < ${b}.` : a > b ? `${a} lớn hơn ${b}, viết ${a} > ${b}.` : `${a} bằng ${b}, viết ${a} = ${b}.`);
async function signStep(c, t, a, b, ask) {
  await c.say(ask, 'Chọn dấu: <b>&lt;</b>, <b>&gt;</b> hay <b>=</b>?');
  const s = await askSign(c, a, b);
  t.fillQ(s);
  await c.say(signSay(a, b), `<b>${a} ${s === '<' ? '&lt;' : s === '>' ? '&gt;' : '='} ${b}</b>`);
}

const B10 = {
  title: 'Bài 10: Bé hơn. Dấu <',
  setup: (b) => createGroups(b, pairLayout(5)),
  steps: [
    async (c) => {
      await compareRows(c, c.t, 2, 3, 'car', 'car', 'ô tô hàng trên', 'ô tô hàng dưới');
      await c.say('Hàng trên có 2 ô tô, hàng dưới có 3 ô tô. Hàng dưới thừa ra 1 ô tô. 2 ô tô ít hơn 3 ô tô.', '2 ô tô <b>ít hơn</b> 3 ô tô.');
    },
    async (c) => signStep(c, c.t, 2, 3, '2 ô tô ít hơn 3 ô tô. Ta nói 2 bé hơn 3. Em chọn dấu bé hơn.'),
    async (c) => {
      await compareRows(c, c.t, 4, 5, 'duck', 'fish', 'con vịt', 'con cá');
      await signStep(c, c.t, 4, 5, 'Vịt ít hơn cá. Vậy 4 thế nào với 5?');
    },
    async (c) => {
      const t = c.use((b) => createGroups(b, cardsLayout(5)));
      cards(t, [1, 2, 3, 4, 5]);
      t.expr(ex('?', '<', '3'));
      await c.say('Số nào bé hơn 3? Em bấm vào một số.', 'Số nào <b>bé hơn 3</b>?');
      const it = await tapPick(c, t, 'cards', (x) => x.opts.val < 3, { bad: (x) => `${x.opts.val} không bé hơn 3. Số bé hơn 3 đứng trước số 3.` });
      t.fillQ(String(it.opts.val));
      await c.say(`Đúng rồi, ${it.opts.val} bé hơn 3. Số đứng trước thì bé hơn. Dấu bé hơn có đầu nhọn chỉ vào số bé.`, `<b>${it.opts.val} &lt; 3</b>`);
    },
  ],
};

const B11 = {
  title: 'Bài 11: Lớn hơn. Dấu >',
  setup: (b) => createGroups(b, pairLayout(5)),
  steps: [
    async (c) => {
      await compareRows(c, c.t, 3, 2, 'bird', 'bird', 'con chim hàng trên', 'con chim hàng dưới');
      await c.say('Hàng trên có 3 con chim, thừa ra 1 con. 3 con chim nhiều hơn 2 con chim.', '3 con chim <b>nhiều hơn</b> 2 con chim.');
    },
    async (c) => signStep(c, c.t, 3, 2, '3 con chim nhiều hơn 2 con chim. Ta nói 3 lớn hơn 2. Em chọn dấu lớn hơn.'),
    async (c) => {
      await compareRows(c, c.t, 5, 4, 'flower', 'ball', 'bông hoa', 'quả bóng');
      await signStep(c, c.t, 5, 4, 'Hoa nhiều hơn bóng. Vậy 5 thế nào với 4?');
    },
    async (c) => {
      const t = c.use((b) => createGroups(b, cardsLayout(5)));
      cards(t, [1, 2, 3, 4, 5]);
      t.expr(ex('?', '>', '3'));
      await c.say('Số nào lớn hơn 3? Em bấm vào một số.', 'Số nào <b>lớn hơn 3</b>?');
      const it = await tapPick(c, t, 'cards', (x) => x.opts.val > 3, { bad: (x) => `${x.opts.val} không lớn hơn 3. Số lớn hơn 3 đứng sau số 3.` });
      t.fillQ(String(it.opts.val));
      await c.say(`Đúng rồi, ${it.opts.val} lớn hơn 3. Dấu lớn hơn cũng có đầu nhọn chỉ vào số bé: 3 bé hơn ${it.opts.val}.`, `<b>${it.opts.val} &gt; 3</b> · <b>3 &lt; ${it.opts.val}</b>`);
    },
  ],
};

const B13 = {
  title: 'Bài 13: Bằng nhau. Dấu =',
  setup: (b) => createGroups(b, pairLayout(5, 3)),
  steps: [
    async (c) => {
      await compareRows(c, c.t, 3, 3, 'bunny', 'carrot', 'bạn thỏ', 'củ cà rốt');
      await c.say('Mỗi bạn thỏ có một củ cà rốt, không thừa bạn nào, không thừa củ nào. Số thỏ bằng số cà rốt.', 'Không bên nào thừa: <b>bằng nhau</b>.');
    },
    async (c) => signStep(c, c.t, 3, 3, '3 bằng 3. Em chọn dấu bằng.'),
    async (c) => {
      const t = c.t;
      t.unpair(); t.unglow(); t.clear(); t.cap('top', ''); t.cap('bot', ''); t.expr('');
      fill(t, 'top', 'bunny', 4); fill(t, 'bot', 'carrot', 2); fill(t, 'pile', 'carrot', 3);
      await c.say('Có 4 bạn thỏ mà chỉ có 2 củ cà rốt. Em lấy thêm cà rốt trong rổ cho bằng số thỏ.', 'Thêm cà rốt cho <b>bằng</b> số thỏ.');
      await tapMove(c, t, { from: 'pile', to: 'bot', n: 2, mark: false, nudge: 'Bấm vào củ cà rốt trong rổ.' });
      await c.say('Bây giờ nối lại xem.', 'Nối từng cặp.');
      await pairUp(c, t, 'top', 'bot');
      t.cap('top', '4'); t.cap('bot', '4');
      t.expr(ex('4', '□', '4'));
      await signStep(c, t, 4, 4, 'Số thỏ và số cà rốt thế nào?');
    },
    async (c) => {
      await c.say('Muốn làm cho bằng nhau, em có thể thêm vào bên ít hơn, hoặc bớt đi ở bên nhiều hơn.', 'Thêm vào bên ít, hoặc bớt đi bên nhiều.');
    },
  ],
};

// ── Bài 16 đến 19: Số 6, 7, 8, 9 ────────────────────────────────────────────────────────────────────
const joinDots = (sc, sr) => joinLayout(4, 2, sc, sr);
function numberExplore(N, kind, name, splits, wide10 = true) {
  const [a1, b1] = splits[0], [a2, b2] = splits[1];
  return {
    title: `Bài ${{ 6: 16, 7: 17, 8: 18, 9: 19 }[N]}: Số ${N}`,
    setup: (b) => { const t = createGroups(b, countLayout(5, 2, 5, 2)); fill(t, 'frame', kind, N - 1); fill(t, 'pile', kind, 3); t.cap('frame', String(N - 1)); return t; },
    steps: [
      async (c) => {
        const t = c.t;
        t.expr(ex(String(N - 1), 'thêm', '1', 'là', '?'));
        await c.say(`Trong khung có ${N - 1} ${name}. Em bấm vào rổ để thêm 1 ${name} nữa.`, `Thêm <b>1</b> ${pic(kind)}.`);
        await tapMove(c, t, { from: 'pile', to: 'frame', n: 1, mark: false });
        await countAloud(c, t, 'frame', name);
        t.fillQ(String(N));
        await c.say(`${N - 1} thêm 1 là ${N}. Số ${N}.`, `${N - 1} thêm 1 là <b>${N}</b>.`);
      },
      async (c) => {
        const t = c.t;
        t.clear(); t.cap('frame', ''); t.expr(ex(String(N)));
        fill(t, 'pile', kind, Math.min(10, N + 1));
        await c.say(`Bây giờ em lấy đúng ${N} ${name} bỏ vào khung. Vừa bấm vừa đếm.`, `Lấy đúng <b>${N}</b> ${pic(kind)}.`);
        await tapMove(c, t, { from: 'pile', to: 'frame', n: N });
        await c.say(`Có ${N} ${name}. Còn lại 1 trong rổ.`, `Có <b>${N}</b> ${name}.`);
      },
      async (c) => {
        const t = c.use((b) => createGroups(b, joinDots(5, 2)));
        fill(t, 'l', 'dot', a1, { color: '#EF4444' }); fill(t, 'r', 'dot', b1, { color: '#3B82F6' });
        t.cap('l', String(a1)); t.cap('r', String(b1));
        t.expr(ex(String(N), 'gồm', String(a1), 'và', String(b1)));
        await c.say(`Thẻ trái có ${a1} chấm đỏ, thẻ phải có ${b1} chấm xanh. Em bấm vào các chấm để gộp vào khung.`, 'Bấm vào các chấm để <b>gộp</b> vào khung.');
        const n = a1 + b1;
        await tapMove(c, t, { from: 'l', to: 'sum', n: a1, nudge: 'Bấm vào các chấm đỏ.' });
        await tapMove(c, t, { from: 'r', to: 'sum', n: b1, nudge: 'Bấm vào các chấm xanh.' });
        t.cap('sum', String(n));
        await c.say(`Cả hai thẻ có ${N} chấm. ${N} gồm ${a1} và ${b1}.`, `<b>${N}</b> gồm <b>${a1}</b> và <b>${b1}</b>.`);
      },
      async (c) => {
        const t = c.t;
        t.clear(); ['l', 'r', 'sum'].forEach((z) => t.cap(z, ''));
        fill(t, 'l', 'dot', a2, { color: '#EF4444' }); fill(t, 'r', 'dot', b2, { color: '#3B82F6' });
        t.cap('l', String(a2)); t.cap('r', String(b2));
        t.expr(ex('?', 'gồm', String(a2), 'và', String(b2)));
        await c.say(`${a2} chấm đỏ và ${b2} chấm xanh. Gộp lại được mấy chấm?`, `<b>${a2}</b> và <b>${b2}</b>: gộp lại được mấy?`);
        await askNum(c, N, [N - 1, N, N + 1], `Đếm tất cả các chấm trên hai thẻ.`);
        const moves = [...t.items('l'), ...t.items('r')].map((it, i) => t.move(it, 'sum', { delay: i * 140 }));
        await Promise.all(moves);
        t.cap('sum', String(N));
        t.fillQ(String(N));
        const more = splits.slice(2).map(([x, y]) => `${x} và ${y}`).join(', ');
        await c.say(`Đúng rồi! ${N} gồm ${a2} và ${b2}.${more ? ` ${N} cũng gồm ${more}.` : ''}`, `<b>${N}</b> gồm ${splits.map(([x, y]) => `${x} và ${y}`).join('; ')}`);
      },
      async (c) => {
        const t = c.use((b) => createGroups(b, pairLayout(10)));
        await compareRows(c, t, N, N - 1, kind, kind, name, name);
        await signStep(c, t, N, N - 1, `Hàng trên có ${N}, hàng dưới có ${N - 1}. ${N} thế nào với ${N - 1}?`);
      },
      async (c) => {
        const list = Array.from({ length: N }, (_, i) => i + 1);
        const t = c.use((b) => createGroups(b, cardsLayout(N)));
        const hide = [N - 4, N - 2, N - 1];
        cards(t, list, hide);
        await fillTrack(c, t, list, hide, [`Đếm từ 1 tới ${N}. Số nào còn thiếu?`, 'Số nào còn thiếu?']);
        await c.say(`${words(1, N)}. Số ${N} đứng ngay sau số ${N - 1}, nên ${N} lớn hơn ${N - 1}.`, `${list.join(', ')}`);
      },
    ],
  };
}

const B16 = numberExplore(6, 'apple', 'quả táo', [[5, 1], [4, 2], [3, 3]]);
const B17 = numberExplore(7, 'chick', 'gà con', [[6, 1], [5, 2], [4, 3]]);
const B18 = numberExplore(8, 'ball', 'quả bóng', [[7, 1], [6, 2], [5, 3], [4, 4]]);
const B19 = numberExplore(9, 'flower', 'bông hoa', [[8, 1], [7, 2], [6, 3], [5, 4]]);

// ── Bài 20: Số 0 ─────────────────────────────────────────────────────────────────────────────────────
const B20 = {
  title: 'Bài 20: Số 0',
  setup: (b) => {
    const t = createGroups(b, {
      zones: [{ id: 'pond', type: 'pond', cols: 3, rows: 1, cap: true }, { id: 'bucket', type: 'basket', cols: 3, rows: 1 }],
      tall: { areas: "'pond' 'bucket'", rows: '1.2fr 1fr' }, wide: { areas: "'pond bucket'", cols: '1.2fr 1fr' },
    });
    fill(t, 'pond', 'fish', 3);
    t.cap('pond', '3');
    return t;
  },
  steps: [
    async (c) => {
      await c.say('Trong bể có 3 con cá. Em bấm vào từng con cá để vớt sang giỏ. Xem trong bể còn mấy con.', 'Bấm vào từng con cá.');
      const t = c.t;
      t.live((it) => it.zone === 'pond');
      t.onTap = (it) => { if (it.zone === 'pond') { it.el.classList.remove('x1g-live'); t.move(it, 'bucket').then(() => t.cap('pond', String(t.count('pond')))); } };
      await c.until(t, () => t.count('pond') === 0, { nudge: 'Bấm vào con cá trong bể.', el: () => t.items('pond')[0]?.el });
      t.onTap = null;
      for (const it of t.items('pond')) await t.move(it, 'bucket');
      t.cap('pond', '0');
      t.live(null);
    },
    async (c) => {
      const t = c.t;
      t.glow('pond');
      await c.say('Trong bể không còn con cá nào. Số cá trong bể là mấy?', 'Trong bể còn mấy con cá?');
      await askNum(c, 0, [0, 1, 3], 'Không còn con nào thì viết số 0.');
      t.unglow();
      t.expr(ex('0'));
      await c.say('Không có con cá nào: viết số 0, đọc là không.', 'Không có con nào: số <b>0</b>.');
    },
    async (c) => {
      const t = c.use((b) => createGroups(b, cardsLayout(6)));
      cards(t, [0, 1, 2, 3, 4, 5], [0, 3]);
      await fillTrack(c, t, [0, 1, 2, 3, 4, 5], [0, 3], ['Số 0 đứng ở đâu trong dãy số? Số nào còn thiếu?', 'Số nào còn thiếu?']);
      await c.say('Số 0 đứng trước số 1. 0 bé hơn 1.', '<b>0 &lt; 1</b>');
    },
    async (c) => {
      const t = c.use((b) => createGroups(b, cardsLayout(4)));
      [3, 0, 5, 2].forEach((n) => t.add('cards', 'num', { n, val: n }));
      await c.say('Em bấm vào số bé nhất.', 'Bấm vào số <b>bé nhất</b>.');
      await tapPick(c, t, 'cards', (x) => x.opts.val === 0, { bad: 'Số bé nhất là số đứng đầu khi đếm. Có số 0 đấy!' });
      await c.say('Đúng rồi! 0 là số bé nhất trong các số đã học.', '<b>0</b> là số bé nhất.');
    },
  ],
};

// ── Bài 21: Số 10 ────────────────────────────────────────────────────────────────────────────────────
const B21 = {
  title: 'Bài 21: Số 10',
  setup: (b) => { const t = createGroups(b, countLayout(5, 2, 5, 2)); fill(t, 'frame', 'star', 9); fill(t, 'pile', 'star', 3); t.cap('frame', '9'); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      t.expr(ex('9', 'thêm', '1', 'là', '?'));
      await c.say('Khung có 9 ngôi sao, còn trống 1 ô. Em bấm thêm 1 ngôi sao.', 'Thêm <b>1</b> ngôi sao.');
      await tapMove(c, t, { from: 'pile', to: 'frame', n: 1, mark: false });
      await countAloud(c, t, 'frame', 'ngôi sao');
      t.fillQ('10');
      await c.say('9 thêm 1 là 10. Khung đầy rồi. Số 10 viết bằng hai chữ số: chữ số 1 và chữ số 0.', '9 thêm 1 là <b>10</b>.');
    },
    async (c) => {
      const t = c.t;
      t.clear(); t.unmark(); t.cap('frame', '6');
      fill(t, 'frame', 'star', 6); fill(t, 'pile', 'star', 6);
      t.expr(ex('6', 'thêm', '?', 'là', '10'));
      await c.say('Khung có 6 ngôi sao. Em thêm sao cho đủ 10.', 'Thêm cho <b>đủ 10</b>.');
      await tapMove(c, t, { from: 'pile', to: 'frame', n: 4, mark: false, onLand: () => {} });
      t.cap('frame', '10');
      await c.say('Em đã thêm mấy ngôi sao?', '6 thêm mấy là 10?');
      await askNum(c, 4, [3, 4, 5], 'Đếm các ngôi sao em vừa thêm vào các ô trống.');
      t.fillQ('4');
      await c.say('6 thêm 4 là 10. 10 gồm 6 và 4.', '<b>10</b> gồm <b>6</b> và <b>4</b>.');
    },
    async (c) => {
      const t = c.use((b) => createGroups(b, joinDots(5, 2)));
      fill(t, 'l', 'dot', 7, { color: '#EF4444' }); fill(t, 'r', 'dot', 3, { color: '#3B82F6' });
      t.cap('l', '7'); t.cap('r', '3');
      t.expr(ex('?', 'gồm', '7', 'và', '3'));
      await c.say('7 chấm đỏ và 3 chấm xanh. Gộp lại được mấy chấm?', '<b>7</b> và <b>3</b>: gộp lại được mấy?');
      await askNum(c, 10, [8, 9, 10], 'Đếm tất cả các chấm.');
      await Promise.all([...t.items('l'), ...t.items('r')].map((it, i) => t.move(it, 'sum', { delay: i * 120 })));
      t.cap('sum', '10'); t.fillQ('10');
      await c.say('10 gồm 7 và 3. 10 cũng gồm 9 và 1, 8 và 2, 6 và 4, 5 và 5.', '10 gồm 9 và 1; 8 và 2; 7 và 3; 6 và 4; 5 và 5');
    },
    async (c) => {
      const t = c.use((b) => createGroups(b, cardsLayout(4)));
      [8, 10, 6, 9].forEach((n) => t.add('cards', 'num', { n, val: n }));
      await c.say('Em bấm vào số lớn nhất.', 'Bấm vào số <b>lớn nhất</b>.');
      await tapPick(c, t, 'cards', (x) => x.opts.val === 10, { bad: 'Đếm từ 0 tới 10: số đếm sau cùng là số lớn nhất.' });
      await c.say('Đúng rồi! Từ 0 đến 10, số 10 lớn nhất, số 0 bé nhất.', '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, <b>10</b>');
    },
  ],
};

// ── Bài 25, 27, 29, 31: Phép cộng ────────────────────────────────────────────────────────────────────
async function joinStep(c, t, a, b, kind, name, { ask = true } = {}) {
  t.clear(); ['l', 'r', 'sum'].forEach((z) => t.cap(z, ''));
  fill(t, 'l', kind, a); fill(t, 'r', kind, b);
  t.cap('l', String(a)); t.cap('r', String(b));
  t.expr(ex(String(a), '+', String(b), '=', '?'));
  const has = (n) => (n ? `${n} ${name}` : `không có ${name} nào`);
  await c.say(`Đĩa trái có ${has(a)}, đĩa phải có ${has(b)}. Em bấm vào ${name} để gộp lại.`, `Gộp lại: bấm vào ${pic(kind)}.`);
  if (a) await tapMove(c, t, { from: 'l', to: 'sum', n: a, nudge: `Bấm vào ${name} ở đĩa trái.` });
  if (b) await tapMove(c, t, { from: 'r', to: 'sum', n: b, nudge: `Bấm vào ${name} ở đĩa phải.` });
  t.cap('sum', String(a + b));
  if (ask) {
    await c.say(`Có tất cả mấy ${name}?`, `<b>${a} + ${b}</b> = ?`);
    await askNum(c, a + b, [...new Set([Math.max(0, a + b - 1), a + b, a + b + 1])], 'Đếm các đồ vật trong khung.');
  }
  t.fillQ(String(a + b));
  await c.say(`${a} cộng ${b} bằng ${a + b}.`, `<b>${a} + ${b} = ${a + b}</b>`);
}
async function quickAdd(c, t, a, b, kind, name) {
  t.clear(); ['l', 'r', 'sum'].forEach((z) => t.cap(z, ''));
  fill(t, 'l', kind, a); fill(t, 'r', kind, b);
  t.cap('l', String(a)); t.cap('r', String(b));
  t.expr(ex(String(a), '+', String(b), '=', '?'));
  await c.say(`${a} cộng ${b} bằng mấy?`, `<b>${a} + ${b}</b> = ?`);
  const opts = [...new Set([Math.max(0, a + b - 1), a + b, a + b + 1])];
  await askNum(c, a + b, opts, `Gộp ${a} ${name} và ${b} ${name}, rồi đếm.`);
  await Promise.all([...t.items('l'), ...t.items('r')].map((it, i) => t.move(it, 'sum', { delay: i * 140 })));
  t.cap('sum', String(a + b)); t.fillQ(String(a + b));
  await c.say(`${a} cộng ${b} bằng ${a + b}.`, `<b>${a} + ${b} = ${a + b}</b>`);
}
/** Bước "Viết phép tính thích hợp": nhìn hai nhóm, chọn phép tính. */
async function pickExpr(c, t, a, b, kind, name, wrong) {
  t.clear(); ['l', 'r', 'sum'].forEach((z) => t.cap(z, '')); t.expr('');
  fill(t, 'l', kind, a); fill(t, 'r', kind, b);
  await c.say(`Có ${a} ${name}, thêm ${b} ${name}. Phép tính nào đúng với tranh?`, 'Chọn <b>phép tính</b> đúng với tranh.');
  const opts = [{ html: `${a} + ${b} = ${a + b}`, value: 'ok' }, ...wrong.map(([x, y], i) => ({ html: `${x} + ${y} = ${x + y}`, value: `w${i}` }))];
  const order = [opts[1], opts[0], ...opts.slice(2)];
  await c.choose(order, 'ok', { hint: `Đếm ${name} ở đĩa trái, rồi ở đĩa phải.` });
  t.expr(ex(String(a), '+', String(b), '=', String(a + b)));
  await Promise.all([...t.items('l'), ...t.items('r')].map((it, i) => t.move(it, 'sum', { delay: i * 140 })));
  t.cap('sum', String(a + b));
  await c.say(`${a} cộng ${b} bằng ${a + b}.`, `<b>${a} + ${b} = ${a + b}</b>`);
}
/** Bước tìm số còn thiếu: a + ? = s (thêm đồ vật từ đĩa phải cho đủ s). */
async function missingAdd(c, t, a, s, kind, name) {
  t.clear(); ['l', 'r', 'sum'].forEach((z) => t.cap(z, ''));
  fill(t, 'sum', kind, a); fill(t, 'r', kind, s - a + 1);
  t.cap('sum', String(a));
  t.expr(ex(String(a), '+', '?', '=', String(s)));
  await c.say(`Khung có ${a} ${name}. Em thêm ${name} từ đĩa phải cho đủ ${s}.`, `Thêm cho đủ <b>${s}</b>.`);
  await tapMove(c, t, { from: 'r', to: 'sum', n: s - a, mark: false, nudge: `Bấm vào ${name} ở đĩa phải.` });
  t.cap('sum', String(s));
  await c.say(`Em đã thêm mấy ${name}?`, `<b>${a} + ? = ${s}</b>`);
  await askNum(c, s - a, [...new Set([Math.max(0, s - a - 1), s - a, s - a + 1])], `${a} thêm mấy thì được ${s}? Đếm số ${name} em vừa thêm.`);
  t.fillQ(String(s - a));
  await c.say(`${a} cộng ${s - a} bằng ${s}.`, `<b>${a} + ${s - a} = ${s}</b>`);
}

const B25 = {
  title: 'Bài 25: Phép cộng trong phạm vi 3',
  setup: (b) => createGroups(b, joinLayout(2, 1, 3, 1)),
  steps: [
    async (c) => joinStep(c, c.t, 1, 1, 'duck', 'con vịt'),
    async (c) => joinStep(c, c.t, 2, 1, 'duck', 'con vịt'),
    async (c) => {
      await quickAdd(c, c.t, 1, 2, 'duck', 'con vịt');
      await c.say('2 cộng 1 bằng 3, 1 cộng 2 cũng bằng 3.', '2 + 1 = 3 · 1 + 2 = 3');
    },
    async (c) => missingAdd(c, c.t, 1, 3, 'duck', 'con vịt'),
    async (c) => pickExpr(c, c.t, 1, 2, 'bird', 'con chim', [[1, 1], [2, 2]]),
  ],
};

const B27 = {
  title: 'Bài 27: Phép cộng trong phạm vi 4',
  setup: (b) => createGroups(b, joinLayout(2, 2, 4, 1)),
  steps: [
    async (c) => joinStep(c, c.t, 3, 1, 'apple', 'quả táo'),
    async (c) => joinStep(c, c.t, 2, 2, 'apple', 'quả táo'),
    async (c) => {
      await quickAdd(c, c.t, 1, 3, 'apple', 'quả táo');
      await c.say('3 cộng 1 bằng 4, 1 cộng 3 cũng bằng 4.', '3 + 1 = 4 · 1 + 3 = 4');
    },
    async (c) => missingAdd(c, c.t, 2, 4, 'apple', 'quả táo'),
    async (c) => pickExpr(c, c.t, 3, 1, 'fish', 'con cá', [[2, 1], [2, 2]]),
  ],
};

const B29 = {
  title: 'Bài 29: Phép cộng trong phạm vi 5',
  setup: (b) => createGroups(b, joinLayout(2, 2, 5, 1)),
  steps: [
    async (c) => joinStep(c, c.t, 4, 1, 'ball', 'quả bóng'),
    async (c) => joinStep(c, c.t, 3, 2, 'ball', 'quả bóng'),
    async (c) => {
      await quickAdd(c, c.t, 2, 3, 'ball', 'quả bóng');
      await c.say('3 cộng 2 bằng 5, 2 cộng 3 cũng bằng 5. 5 bằng 4 cộng 1, bằng 3 cộng 2.', '4 + 1 = 5 · 3 + 2 = 5 · 2 + 3 = 5 · 1 + 4 = 5');
    },
    async (c) => missingAdd(c, c.t, 3, 5, 'ball', 'quả bóng'),
    async (c) => pickExpr(c, c.t, 2, 3, 'chick', 'gà con', [[2, 2], [3, 3]]),
  ],
};

const B31 = {
  title: 'Bài 31: Số 0 trong phép cộng',
  setup: (b) => createGroups(b, joinLayout(2, 2, 5, 1)),
  steps: [
    async (c) => joinStep(c, c.t, 3, 0, 'apple', 'quả táo'),
    async (c) => {
      await joinStep(c, c.t, 0, 2, 'apple', 'quả táo');
      await c.say('Thêm 0 tức là không thêm gì cả. Số táo vẫn giữ nguyên.', 'Thêm <b>0</b>: không thêm gì cả.');
    },
    async (c) => quickAdd(c, c.t, 4, 0, 'apple', 'quả táo'),
    async (c) => {
      const t = c.t;
      t.clear(); ['l', 'r', 'sum'].forEach((z) => t.cap(z, ''));
      t.expr(ex('0', '+', '0', '=', '?'));
      await c.say('Hai đĩa đều không có quả nào. 0 cộng 0 bằng mấy?', '<b>0 + 0</b> = ?');
      await askNum(c, 0, [0, 1, 2], 'Không có quả nào cả.');
      t.cap('sum', '0'); t.fillQ('0');
      await c.say('Một số cộng với 0 bằng chính số đó. 0 cộng một số cũng bằng chính số đó.', 'Một số cộng với <b>0</b> bằng chính số đó.');
    },
  ],
};

// ── Bài 34: Phép trừ trong phạm vi 3 ─────────────────────────────────────────────────────────────────
const takeLayout = () => ({ zones: [{ id: 'br', type: 'ground', cols: 3, rows: 1, cap: true }], tall: { areas: "'br'", rows: '1fr' } });
async function takeStep(c, t, a, b, kind, name, verb, { cross = false } = {}) {
  t.clear(); t.cap('br', String(a));
  fill(t, 'br', kind, a);
  t.expr(ex(String(a), '−', String(b), '=', '?'));
  await c.say(`Có ${a} ${name}, ${b} ${name} ${verb}. Em bấm vào ${b === 1 ? `một ${name}` : `${b} ${name}`}.`, `Bấm vào <b>${b}</b> ${pic(kind)}.`);
  await tapAway(c, t, { zone: 'br', n: b, cross });
  await c.say(`Còn lại mấy ${name}?`, `<b>${a} − ${b}</b> = ?`);
  await askNum(c, a - b, [...new Set([Math.max(0, a - b - 1), a - b, a - b + 1])], `Đếm các ${name} còn lại.`);
  t.fillQ(String(a - b));
  await c.say(`${a} trừ ${b} bằng ${a - b}.`, `<b>${a} − ${b} = ${a - b}</b>`);
}
const B34 = {
  title: 'Bài 34: Phép trừ trong phạm vi 3',
  setup: (b) => createGroups(b, takeLayout()),
  steps: [
    async (c) => takeStep(c, c.t, 3, 1, 'bird', 'con chim', 'bay đi'),
    async (c) => takeStep(c, c.t, 2, 1, 'bird', 'con chim', 'bay đi'),
    async (c) => takeStep(c, c.t, 3, 2, 'apple', 'quả táo', 'bị gạch đi', { cross: true }),
    async (c) => {
      const t = c.t;
      t.clear(); t.cap('br', '');
      fill(t, 'br', 'duck', 3);
      t.expr(ex('2', '+', '1', '=', '3'));
      await c.say('2 con vịt thêm 1 con vịt là 3 con vịt: 2 cộng 1 bằng 3.', '<b>2 + 1 = 3</b>');
      t.expr(ex('3', '−', '1', '=', '?'));
      await c.say('Có 3 con vịt, 1 con bơi đi. 3 trừ 1 bằng mấy?', '<b>3 − 1</b> = ?');
      await askNum(c, 2, [1, 2, 3], 'Bớt 1 con thì còn 2 con. Nhìn phép cộng 2 + 1 = 3.');
      await t.away(t.items('br')[2], { dir: 'side' });
      t.fillQ('2');
      await c.say('3 trừ 1 bằng 2. Từ một phép cộng, ta có phép trừ.', '<b>2 + 1 = 3</b> · <b>3 − 1 = 2</b>');
    },
  ],
};

export const EXPLORES = {
  b2: B2, b3: B3, b4: B4, b6: B6, b8: B8, b10: B10, b11: B11, b13: B13,
  b16: B16, b17: B17, b18: B18, b19: B19, b20: B20, b21: B21,
  b25: B25, b27: B27, b29: B29, b31: B31, b34: B34,
};
