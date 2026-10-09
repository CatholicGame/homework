/**
 * Khám phá Bài 46 (Khối trụ, khối cầu), Bài 64 (Thu thập, phân loại, kiểm đếm số liệu), Bài 65 (Biểu đồ tranh),
 * Bài 66 (Chắc chắn, có thể, không thể). Công cụ ở data.js.
 */

import { createSorter, createPicto, createChance, colorName } from './data.js';
import { itemSvg, solidSvg, SOLID_KIND, SOLID_NAME, MODEL } from './art.js';
import { devDo } from './dev.js';
import { sleep } from '../../grade3Drills/kit.js';

const W = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười'];
const opts = (v, lo = 0) => [...new Set([v - 1, v, v + 1].filter(x => x >= lo))].map(String);

/** Em xếp hết đồ vật trên băng chuyền vào đúng nút; sai thì nhắc why(id). */
async function sortAll(c, t, kindOf, why) {
  const off = t.on((ev, k) => {
    if (ev !== 'kind' || t.busy || t.current == null) return;
    if (kindOf(t.current) === k) t.sort();
    else c.hint(why(t.current));
  });
  devDo(() => { if (!t.busy && t.current != null) t.emit('kind', kindOf(t.current)); });
  await c.until(t, () => t.current == null && !t.busy, { nudge: 'Bấm vào nút của loại đúng ở dưới.', el: () => t.root.querySelector('.x2zd-now') });
  off(); devDo(null);
}

// ── Bài 46: Khối trụ, khối cầu ────────────────────────────────────────────────────────────────────────
const SOLID_KINDS = [
  { id: 'tru', name: 'Khối trụ', icon: MODEL.tru },
  { id: 'cau', name: 'Khối cầu', icon: MODEL.cau },
  { id: 'khac', name: 'Khối khác', icon: MODEL.khac },
];
const SOLID_SEQ = ['can', 'ball', 'gift', 'drum', 'orange', 'log', 'dice', 'marble', 'glass', 'globe'];
const KIND_WORD = { tru: 'khối trụ', cau: 'khối cầu', khac: 'không phải khối trụ, cũng không phải khối cầu' };
const B46 = {
  title: 'Bài 46: Khối trụ, khối cầu',
  setup: (board) => createSorter(board, { kinds: SOLID_KINDS, seq: SOLID_SEQ, art: solidSvg, result: 'thumbs', kindOf: (id) => SOLID_KIND[id] }),
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('<span><b>Khối trụ</b> và <b>khối cầu</b></span>');
      t.glow('tru');
      await c.say('Đây là khối trụ: có hai mặt tròn ở hai đầu, thân tròn đều. Bấm vào khối trụ.', '<b>Khối trụ</b>: hai đầu là hai mặt tròn. Bấm vào nút Khối trụ.');
      await c.tap(t.btn('tru'));
      t.glow('cau');
      await c.say('Đây là khối cầu: tròn đều về mọi phía, như quả bóng. Bấm vào khối cầu.', '<b>Khối cầu</b>: tròn đều mọi phía. Bấm vào nút Khối cầu.');
      await c.tap(t.btn('cau'));
      t.glow(null);
    },
    async (c) => {
      const t = c.t;
      t.caption('Đồ vật này có dạng khối gì?');
      await c.say('Các đồ vật lần lượt tới. Bấm vào nút đúng dạng khối của đồ vật.', 'Bấm vào nút <b>đúng dạng khối</b> của đồ vật.');
      await sortAll(c, t, (id) => SOLID_KIND[id], (id) => `Nhìn kĩ ${SOLID_NAME[id]}: ${SOLID_KIND[id] === 'tru' ? 'có hai mặt tròn ở hai đầu' : SOLID_KIND[id] === 'cau' ? 'tròn đều mọi phía' : 'có các mặt phẳng và góc nhọn'}.`);
      t.reveal();
      await c.say('Giỏi lắm! Em đã xếp xong.');
    },
    async (c) => {
      const t = c.t;
      t.caption('Có mấy đồ vật dạng <b>khối trụ</b>?');
      t.glow('tru');
      await c.say('Có mấy đồ vật dạng khối trụ?');
      await c.choose(opts(t.counts.tru, 1), String(t.counts.tru), { hint: 'Đếm các hình trong nút Khối trụ.' });
      t.glow(null);
      await c.say(`Có ${W[t.counts.tru]} đồ vật dạng khối trụ: lon sữa, cái trống, khúc gỗ, cốc nước.`);
    },
    async (c) => {
      const t = c.t;
      t.caption('Đồ vật nào <b>lăn được về mọi phía</b>?');
      await c.say('Đồ vật nào lăn được về mọi phía?');
      await c.choose(['Quả bóng', 'Lon sữa', 'Hộp quà'], 'Quả bóng', { hint: 'Khối cầu tròn đều mọi phía nên lăn được về mọi phía.' });
      await c.say('Quả bóng có dạng khối cầu, lăn được về mọi phía. Lon sữa là khối trụ, nằm ngang thì chỉ lăn thẳng.', `Quả bóng: <b>${KIND_WORD.cau}</b>`);
    },
  ],
};

// ── Bài 64: Thu thập, phân loại, kiểm đếm số liệu ────────────────────────────────────────────────────
const FRUITS = [
  { id: 'apple', name: 'Táo', icon: itemSvg('apple') },
  { id: 'orange', name: 'Cam', icon: itemSvg('orange') },
  { id: 'carrot', name: 'Cà rốt', icon: itemSvg('carrot') },
];
const FNAME = { apple: 'quả táo', orange: 'quả cam', carrot: 'củ cà rốt' };
const TALLY_SEQ = ['apple', 'orange', 'apple', 'carrot', 'apple', 'orange', 'apple', 'apple', 'carrot', 'apple', 'orange'];
const fruitArt = (id) => itemSvg(id).replace('<svg', '<svg width="100%" height="100%"');
const B64 = {
  title: 'Bài 64: Thu thập, phân loại, kiểm đếm số liệu',
  setup: (board) => createSorter(board, { kinds: FRUITS, seq: TALLY_SEQ, art: fruitArt, result: 'tally' }),
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('Kiểm đếm số quả Mai hái được');
      await c.say('Mai hái quả và củ. Mỗi thứ tới, em bấm đúng loại để gạch một vạch.', 'Bấm đúng loại: mỗi thứ <b>gạch một vạch</b>.');
      await sortAll(c, t, (id) => id, (id) => `Đây là ${FNAME[id]}.`);
    },
    async (c) => {
      const t = c.t;
      t.glow('apple');
      t.caption('Mỗi nhóm <b>5 vạch</b> có một vạch gạch chéo');
      await c.say('Gạch đủ bốn vạch thì vạch thứ năm gạch chéo, thành một nhóm năm. Đếm năm, rồi đếm tiếp. Có mấy quả táo?', 'Đếm: nhóm 5 vạch, rồi đếm tiếp. Có mấy quả táo?');
      await c.choose(opts(t.counts.apple), String(t.counts.apple), { hint: 'Một nhóm là 5, đếm thêm các vạch còn lại.' });
      t.reveal();
      t.glow(null);
      t.caption(`Táo: <b>${t.counts.apple}</b> · Cam: <b>${t.counts.orange}</b> · Cà rốt: <b>${t.counts.carrot}</b>`);
      await c.say(`Có ${W[t.counts.apple]} quả táo, ${W[t.counts.orange]} quả cam, ${W[t.counts.carrot]} củ cà rốt.`);
    },
    async (c) => {
      await c.say('Loại nào nhiều nhất?', 'Loại nào <b>nhiều nhất</b>?');
      await c.choose(['Táo', 'Cam', 'Cà rốt'], 'Táo', { hint: 'So sánh các số đếm được.' });
      await c.say('Loại nào ít nhất?', 'Loại nào <b>ít nhất</b>?');
      await c.choose(['Táo', 'Cam', 'Cà rốt'], 'Cà rốt', { hint: 'Tìm số bé nhất.' });
      await c.say('Táo nhiều nhất, cà rốt ít nhất.');
    },
    async (c) => {
      const t = c.t;
      const all = TALLY_SEQ.length;
      await c.say('Mai hái được tất cả bao nhiêu quả và củ?', `${t.counts.apple} + ${t.counts.orange} + ${t.counts.carrot} = <b>?</b>`);
      await c.choose(opts(all), String(all), { hint: 'Cộng ba số đếm được.' });
      t.caption(`${t.counts.apple} + ${t.counts.orange} + ${t.counts.carrot} = <b>${all}</b>`);
      await c.say('Sáu cộng ba cộng hai bằng mười một. Mai hái được tất cả mười một quả và củ.');
    },
  ],
};

// ── Bài 65: Biểu đồ tranh ────────────────────────────────────────────────────────────────────────────
const PICTO = { apple: 5, orange: 3, carrot: 4 };
const B65 = {
  title: 'Bài 65: Biểu đồ tranh',
  setup: (board) => createPicto(board, { kinds: FRUITS, data: PICTO, max: 6, title: 'Số lượng' }),
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('Vẽ biểu đồ tranh theo bảng');
      await c.say('Bảng cho biết số quả mỗi loại. Mỗi hình vẽ biểu thị một quả. Bấm vào mỗi hàng để vẽ thêm hình cho đúng bảng.', 'Mỗi hình là <b>1 quả</b>. Bấm vào hàng để vẽ thêm.');
      const off = t.on((ev, id) => {
        if (ev !== 'row') return;
        if (t.counts[id] >= PICTO[id]) { c.hint(`Hàng này đủ ${PICTO[id]} rồi. Nhìn lại bảng số liệu.`); return; }
        t.add(id);
      });
      const next = () => FRUITS.find(f => t.counts[f.id] < PICTO[f.id]);
      devDo(() => { const f = next(); if (f && !t.busy) t.add(f.id); });
      await c.until(t, () => !next() && !t.busy, { nudge: 'Bấm vào hàng còn thiếu hình.', el: () => t.row(next()?.id || 'apple') });
      off(); devDo(null);
      await c.say('Đó là biểu đồ tranh.');
    },
    async (c) => {
      const t = c.t;
      t.caption('Loại nào <b>nhiều nhất</b>?');
      await c.say('Nhìn biểu đồ: loại nào nhiều nhất?');
      await c.choose(['Táo', 'Cam', 'Cà rốt'], 'Táo', { hint: 'Hàng nào dài nhất?' });
      t.glow('apple');
      await c.say('Hàng táo dài nhất: táo nhiều nhất.');
      t.glow(null);
    },
    async (c) => {
      const t = c.t;
      t.caption('Táo nhiều hơn cam mấy quả?');
      t.pair('apple', 'orange');
      await c.say('Ghép từng quả táo với từng quả cam. Táo nhiều hơn cam mấy quả?', 'Táo nhiều hơn cam <b>?</b> quả');
      await c.choose(['1', '2', '3'], '2', { hint: 'Đếm các ô sáng màu vàng ở hàng táo.' });
      t.caption('5 − 3 = <b>2</b>');
      await c.say('Năm trừ ba bằng hai. Táo nhiều hơn cam hai quả.');
    },
    async (c) => {
      const t = c.t;
      t.pair('apple', 'apple');
      t.caption('Có tất cả bao nhiêu quả và củ?');
      await c.say('Có tất cả bao nhiêu quả và củ?', '5 + 3 + 4 = <b>?</b>');
      await c.choose(['11', '12', '13'], '12', { hint: 'Năm cộng ba bằng tám, thêm bốn.' });
      t.caption('5 + 3 + 4 = <b>12</b>');
      await c.say('Năm cộng ba cộng bốn bằng mười hai.');
    },
  ],
};

// ── Bài 66: Chắc chắn, có thể, không thể ─────────────────────────────────────────────────────────────
const CH = ['Chắc chắn', 'Có thể', 'Không thể'];
async function drawTimes(c, t, k, n, plan) {
  const off = t.on((ev, j) => { if (ev === 'jar' && j === k && !t.busy && t.draws < n) t.draw(k, plan[t.draws % plan.length]); });
  devDo(() => t.emit('jar', k));
  await c.until(t, () => t.draws >= n && !t.busy, { nudge: 'Bấm vào hộp để lấy một quả bóng.', el: () => t.jar(k) });
  off(); devDo(null);
}
const B66 = {
  title: 'Bài 66: Chắc chắn, có thể, không thể',
  setup: (board) => createChance(board, { jars: [['red', 'red', 'red', 'red'], ['red', 'blue', 'red', 'blue'], ['blue', 'blue', 'blue', 'blue']] }),
  steps: [
    async (c) => {
      const t = c.t;
      t.focus(0);
      t.caption('Hộp A: lấy được bóng <b>đỏ</b>?');
      await c.say('Hộp A có bốn quả bóng đỏ. Lấy một quả, lấy được bóng đỏ là chắc chắn, có thể hay không thể?', 'Hộp A toàn bóng đỏ. Lấy được bóng <b>đỏ</b> là…');
      await c.choose(CH, 'Chắc chắn', { hint: 'Trong hộp chỉ có bóng đỏ.' });
      await c.say('Bấm vào hộp A, lấy thử ba lần.', 'Bấm hộp A, lấy thử <b>3 lần</b>.');
      await drawTimes(c, t, 0, 3, [0, 2, 1]);
      await c.say('Lần nào cũng là bóng đỏ. Chắc chắn lấy được bóng đỏ.', '<b>Chắc chắn</b> lấy được bóng đỏ');
    },
    async (c) => {
      const t = c.t;
      t.clearHand(); t.focus(1);
      t.caption('Hộp B: lấy được bóng <b>xanh</b>?');
      await c.say('Hộp B có bóng đỏ và bóng xanh. Lấy được bóng xanh là chắc chắn, có thể hay không thể?', 'Hộp B có đỏ và xanh. Lấy được bóng <b>xanh</b> là…');
      await c.choose(CH, 'Có thể', { hint: 'Có lúc lấy được bóng đỏ, có lúc lấy được bóng xanh.' });
      await c.say('Bấm vào hộp B, lấy thử bốn lần.', 'Bấm hộp B, lấy thử <b>4 lần</b>.');
      await drawTimes(c, t, 1, 4, [1, 0, 3, 3]);
      await c.say('Có lần được bóng xanh, có lần được bóng đỏ. Có thể lấy được bóng xanh.', '<b>Có thể</b> lấy được bóng xanh');
    },
    async (c) => {
      const t = c.t;
      t.clearHand(); t.focus(2);
      t.caption('Hộp C: lấy được bóng <b>vàng</b>?');
      await c.say('Hộp C toàn bóng xanh. Lấy được bóng vàng là chắc chắn, có thể hay không thể?', 'Hộp C toàn bóng xanh. Lấy được bóng <b>vàng</b> là…');
      await c.choose(CH, 'Không thể', { hint: 'Trong hộp có quả bóng vàng nào không?' });
      await c.say('Bấm vào hộp C, lấy thử ba lần.', 'Bấm hộp C, lấy thử <b>3 lần</b>.');
      await drawTimes(c, t, 2, 3, [0, 3, 1]);
      await c.say('Không lần nào được bóng vàng. Không thể lấy được bóng vàng.', '<b>Không thể</b> lấy được bóng vàng');
    },
    async (c) => {
      const t = c.t;
      t.clearHand(); t.focus(1);
      t.caption(`Hộp B: lấy được bóng <b>${colorName('red')}</b> hoặc <b>${colorName('blue')}</b>?`);
      await c.say('Lấy một quả ở hộp B. Quả bóng lấy ra là bóng đỏ hoặc bóng xanh. Điều đó là chắc chắn, có thể hay không thể?', 'Hộp B: lấy được bóng đỏ <b>hoặc</b> xanh là…');
      await c.choose(CH, 'Chắc chắn', { hint: 'Trong hộp B chỉ có bóng đỏ và bóng xanh.' });
      t.focus(null);
      await c.say('Chắc chắn, vì trong hộp B chỉ có bóng đỏ và bóng xanh.');
      await sleep(100);
    },
  ],
};

export const STATS_EXPLORES = { b46: B46, b64: B64, b65: B65, b66: B66 };
