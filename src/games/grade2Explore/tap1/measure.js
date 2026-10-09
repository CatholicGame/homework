/** Bài 15 (Ki-lô-gam) trên ⚖️ cân đĩa, Bài 16 (Lít) với 🫗 rót nước. */

import { createBalance, weight } from './balance.js';
import { createPour, pourByTaps } from './pour.js';
import { ART, WEIGHT_ART } from './art.js';
import { sleep } from './stage.js';

const it = (id, art, g, name, o = {}) => ({ id, art, g, name, side: -1, w: 110, h: 90, ...o });
const kgs = (arr) => arr.map((v) => ({ html: `${v} kg`, value: v }));
const ls = (arr) => arr.map((v) => ({ html: `${v} <i>l</i>`, value: v }));

async function putAll(c, t, ids, nudge) {
  t.back(false); t.lock(false);
  await c.until(t, () => ids.every((id) => t.where(id) !== 'tray'), { nudge, el: () => t.el(ids.find((id) => t.where(id) === 'tray')) });
  t.lock(true);
  await sleep(300);
}

// ── Bài 15: Ki-lô-gam ─────────────────────────────────────────────────────────────────────────────────
const b15 = {
  title: 'Bài 15: Ki-lô-gam',
  setup: (board) => {
    const t = createBalance(board, { items: [it('melon', WEIGHT_ART.melon, 3000, 'quả dưa', { w: 120, h: 86 }), it('apple', ART.apple, 200, 'quả táo', { side: 1, s: 0.8, w: 80, h: 76 })] });
    t.lock(true);
    return t;
  },
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('Quả dưa và quả táo, quả nào nặng hơn?');
      await c.say('Đây là cái cân đĩa. Em đặt quả dưa lên đĩa trái, quả táo lên đĩa phải: chạm vào từng quả.', 'Chạm để đặt hai quả lên <b>cân đĩa</b>');
      await putAll(c, t, ['melon', 'apple'], 'Chạm vào quả còn ở khay.');
      c.show('Quả nào <b>nặng hơn</b>?');
      await c.choose([{ html: 'Quả dưa nặng hơn', value: 1 }, { html: 'Quả táo nặng hơn', value: 2 }], 1, { hint: 'Đĩa cân bên nào thấp xuống thì bên đó nặng hơn.' });
      t.caption('Quả dưa <b>nặng hơn</b> quả táo');
      await c.say('Đĩa bên trái thấp xuống: quả dưa nặng hơn quả táo. Quả táo nhẹ hơn quả dưa.', 'Đĩa <b>thấp xuống</b>: nặng hơn');
    },
    async (c) => {
      const t = c.t;
      t.reset([it('sugar', WEIGHT_ART.sugar, 1000, 'gói đường', { w: 90, h: 76 }), weight('k1', 1)]);
      t.lock(true);
      t.caption('Quả cân <b>1 kg</b>');
      await c.say('Đây là quả cân 1 ki-lô-gam. Ki-lô-gam viết tắt là k g. Đặt gói đường và quả cân lên hai đĩa.', 'Ki-lô-gam viết tắt: <b>kg</b>');
      await putAll(c, t, ['sugar', 'k1'], 'Chạm vào đồ còn ở khay.');
      t.caption('Gói đường cân nặng <b>1 kg</b>');
      await c.say('Cân thăng bằng. Gói đường cân nặng 1 ki-lô-gam.', 'Cân <b>thăng bằng</b>: gói đường nặng 1 kg');
    },
    async (c) => {
      const t = c.t;
      t.reset([it('pump', WEIGHT_ART.pumpkin, 3000, 'quả bí', { fixed: true, w: 120, h: 80 }), weight('a', 1), weight('b', 1), weight('c', 1), weight('d', 1), weight('e', 1)], ['pump']);
      t.caption('Quả bí cân nặng mấy ki-lô-gam?');
      await c.say('Quả bí ở đĩa trái. Đặt các quả cân 1 ki-lô-gam lên đĩa phải cho tới khi cân thăng bằng. Đặt thừa thì chạm quả cân trên đĩa để lấy xuống.', 'Đặt quả cân <b>1 kg</b> cho tới khi <b>thăng bằng</b>');
      t.lock(false); t.back(true);
      let warned = false;
      const off = t.on((ev) => { if (ev === 'change' && t.state < 0 && !warned) { warned = true; c.hint('Đĩa phải thấp xuống rồi: thừa quả cân. Chạm vào một quả cân trên đĩa để lấy xuống.'); } });
      await c.until(t, () => t.state === 0, {
        nudge: () => (t.state > 0 ? 'Đĩa trái còn thấp: đặt thêm quả cân.' : 'Chạm quả cân trên đĩa phải để lấy bớt.'),
        el: () => (t.state > 0 ? t.el(['a', 'b', 'c', 'd', 'e'].find((id) => t.where(id) === 'tray')) : t.el(['a', 'b', 'c', 'd', 'e'].find((id) => t.where(id) === 1))),
      });
      off();
      t.lock(true);
      c.show('Quả bí cân nặng mấy kg?');
      await c.choose(kgs([1, 3, 4]), 3, { hint: 'Đếm số quả cân 1 kg trên đĩa phải.' });
      t.caption('Quả bí cân nặng <b>3 kg</b>');
      await c.say('Cân thăng bằng với 3 quả cân 1 ki-lô-gam. Quả bí cân nặng 3 ki-lô-gam.');
    },
    async (c) => {
      const t = c.t;
      t.reset([it('rice', WEIGHT_ART.rice, 7000, 'bao gạo', { fixed: true, w: 110, h: 92 }), weight('f', 5), weight('g', 2)], ['rice'], ['f', 'g']);
      t.lock(true);
      t.caption('Bao gạo nặng mấy ki-lô-gam?');
      await c.say('Bao gạo cân thăng bằng với quả cân 5 ki-lô-gam và quả cân 2 ki-lô-gam. Bao gạo nặng mấy ki-lô-gam?', 'Bao gạo = 5 kg + 2 kg = ?');
      await c.choose(kgs([3, 7, 52]), 7, { hint: 'Cộng số ki-lô-gam của hai quả cân, nhớ viết kg.' });
      t.caption('5 kg + 2 kg = <b>7 kg</b>');
      await c.say('5 ki-lô-gam cộng 2 ki-lô-gam bằng 7 ki-lô-gam. Tính với số đo thì viết tên đơn vị sau kết quả.', '5 kg + 2 kg = <b>7 kg</b>');
    },
  ],
};

// ── Bài 16: Lít ───────────────────────────────────────────────────────────────────────────────────────
const b16 = {
  title: 'Bài 16: Lít',
  setup: (board) => {
    const T = matchMedia('(orientation: portrait)').matches;
    const t = createPour(board, { vessels: [
      { id: 'bot', kind: 'bottle', cap: 1, v: 1, x: T ? 330 : 360, y: T ? 820 : 600, label: 'Chai' },
      { id: 'ca', kind: 'cup', cap: 1, v: 0, x: T ? 640 : 620, y: T ? 820 : 600, label: 'Ca 1 l', full: true },
    ], zoom: T ? 1.8 : 1.9, at: [500, T ? 820 : 600] });
    t.lock(true);
    return t;
  },
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('Ca <b>1 lít</b>');
      await c.say('Đây là ca 1 lít. Lít là đơn vị đo nước, dầu, sữa. Lít viết tắt là l.', 'Lít viết tắt: <b>l</b>');
      await c.say('Chạm vào chai nước để rót hết sang ca.', 'Chạm vào <b>chai</b> để rót sang ca');
      t.lock(false);
      await pourByTaps(c, t, 'bot', ['ca'], () => t.get('bot').v <= 0.001, { nudge: 'Chạm vào chai nước.' });
      t.caption('Chai đựng <b>1 l</b> nước');
      await c.say('Nước vừa đầy ca 1 lít. Vậy chai này đựng 1 lít nước.', 'Đầy ca 1 l: chai đựng <b>1 l</b>');
    },
    async (c) => {
      const T = c.t.tall;
      const t = c.use((b) => createPour(b, { vessels: [
        { id: 'A', kind: 'can', cap: 4, v: 4, x: T ? 500 : 150, y: T ? 620 : 640, label: T ? '' : 'Bình A', shelf: T },
        ...[0, 1, 2, 3].map((i) => ({ id: `c${i}`, kind: 'cup', cap: 1, v: 0, x: T ? 160 + i * 215 : 340 + i * 160, y: T ? 1000 : 640, label: '1 l', full: true })),
      ] }));
      t.caption('Bình A đựng mấy lít?');
      await c.say('Rót hết nước ở bình A vào các ca 1 lít. Chạm vào bình A, mỗi lần rót đầy một ca.', 'Chạm <b>bình A</b> để rót vào các ca');
      const cups = [0, 1, 2, 3].map((i) => `c${i}`);
      await pourByTaps(c, t, 'A', cups, () => t.get('A').v <= 0.001, { nudge: 'Chạm vào bình A.' });
      c.show('Bình A đựng mấy lít nước?');
      await c.choose(ls([3, 4, 5]), 4, { hint: 'Đếm số ca đầy nước.' });
      t.caption('Bình A đựng <b>4 l</b> nước');
      await c.say('Rót được đầy 4 ca 1 lít. Bình A đựng 4 lít nước.');
    },
    async (c) => {
      const T = c.t.tall;
      const t = c.use((b) => createPour(b, { vessels: [
        { id: 'can', kind: 'can', cap: 5, v: 5, marks: true, w: 210, x: T ? 300 : 260, y: T ? 900 : 660, label: 'Can 5 l' },
        { id: 'k0', kind: 'cup', cap: 1, v: 0, x: T ? 620 : 600, y: T ? 900 : 660, label: '1 l', full: true },
        { id: 'k1', kind: 'cup', cap: 1, v: 0, x: T ? 820 : 800, y: T ? 900 : 660, label: '1 l', full: true },
      ] }));
      t.caption(`Can 5 <i>l</i>, rót ra 2 <i>l</i>. Còn mấy lít?`);
      await c.say('Can có 5 lít nước. Rót ra 2 ca 1 lít. Chạm vào can để rót.', 'Rót ra <b>2 ca</b> 1 l');
      await pourByTaps(c, t, 'can', ['k0', 'k1'], () => t.get('k1').v >= 0.999, { nudge: 'Chạm vào can nước.' });
      c.show('Can còn mấy lít nước? Nhìn vạch trên can.');
      await c.choose(ls([2, 3, 7]), 3, { hint: 'Mực nước ở vạch nào trên can?' });
      t.caption(`5 <i>l</i> − 2 <i>l</i> = <b>3 <i>l</i></b>`);
      await c.say('Mực nước ở vạch 3 lít. 5 lít trừ 2 lít bằng 3 lít.', '5 l − 2 l = <b>3 l</b>');
    },
    async (c) => {
      c.show('3 <i>l</i> + 2 <i>l</i> = ?');
      await c.say('Bình thứ nhất có 3 lít, bình thứ hai có 2 lít. Cả hai bình có mấy lít?', 'Cả hai bình: 3 l + 2 l = ?');
      await c.choose(ls([1, 5, 32]), 5, { hint: 'Cộng hai số đo, nhớ viết l.' });
      await c.say('3 lít cộng 2 lít bằng 5 lít.', '3 l + 2 l = <b>5 l</b>');
    },
  ],
};

export const MEASURE_EXPLORES = { b15, b16 };
