/**
 * Khám phá Bài 48–53 (Đơn vị chục trăm nghìn, Số tròn trăm tròn chục, So sánh, Số có ba chữ số, Viết thành tổng,
 * So sánh số có ba chữ số). Công cụ của Toán 4: 🧱 bảng hàng (3 hoặc 4 cột), máy soi so sánh, 📏 tia số.
 * Giọng đọc số bằng chữ (readVN); bong bóng hiện chữ số.
 */

import { createPlace, createCompare } from '../../grade4Tools/place.js';
import { createLine } from '../../grade4Tools/line.js';
import { sfx } from '../../grade4Tools/frame.js';
import { readVN as R, capFirst, digitsOf, PLACE } from '../../grade4Tools/num.js';
import { sleep } from '../../grade3Drills/kit.js';
import { devDo } from './dev.js';

/** Em lập số target trên bảng hàng; cột thừa thẻ thì nhắc ngay. */
export async function build(c, t, target, say, shown) {
  t.lock(false); t.only(null);
  const ds = digitsOf(target, t.cols);
  const wrongCol = () => { for (let p = t.cols - 1; p >= 0; p--) if (t.counts[p] !== (ds[p] || 0)) return p; return -1; };
  if (say) await c.say(say, shown);
  let warned = -1;
  const off = t.on(() => {
    const over = [...Array(t.cols).keys()].reverse().find(p => t.counts[p] > (ds[p] || 0));
    if (over != null && over !== warned) { warned = over; c.hint(`Hàng ${PLACE[over]} chỉ cần ${ds[over] || 0} thẻ. Bấm vào thẻ trong cột để bớt ra.`); }
    t.glow(over != null ? over : null);
  });
  devDo(() => { const p = wrongCol(); if (p >= 0) { if (t.counts[p] < (ds[p] || 0)) t.add(p).then(() => t.emit()); else { t.remove(p); t.emit(); } } });
  await c.until(t, () => t.value === target, {
    nudge: () => { const p = wrongCol(); return p < 0 ? '' : `Hàng ${PLACE[p]} cần ${ds[p] || 0} thẻ.`; },
    el: () => { const p = wrongCol(); return p < 0 ? null : t.src(p); },
  });
  off(); devDo(null);
  t.glow(null); t.lock(true);
  sfx.ding();
}

/** Em bấm thẻ ở hàng p cho tới khi pred() đúng. */
async function tapUntil(c, t, p, target, nudge) {
  t.lock(false); t.only(p);
  devDo(() => { if (t.value < target) t.add(p).then(() => t.emit()); });
  // đủ số thì khoá ngay (không bấm thừa), chờ 10 thẻ đổi sang hàng bên trái xong
  const off = t.on(() => { if (t.value >= target) t.lock(true); });
  await c.until(t, () => t.value === target && t.counts[p] === 0, { nudge, el: () => t.src(p) });
  off(); devDo(null);
  await sleep(300);
  t.lock(true); t.only(null);
}

/** Châu chấu nhảy đều bước; em bấm lần lượt các ô trống. */
async function hopBlanks(c, t, start, step, blanks) {
  t.hopper(start);
  let next = start + step;
  const done = new Set();
  let tapped = null;
  const want = () => blanks.find(x => !done.has(x));
  const off = t.on((ev, v) => {
    if (ev !== 'tap') return;
    if (v === want()) tapped = v; else c.hint('Chú châu chấu nhảy lần lượt từng ô, từ trái sang phải.');
  });
  while (done.size < blanks.length) {
    const w = want();
    devDo(() => { tapped = w; t.emit('x'); });
    await c.until(t, () => tapped === w, { nudge: 'Bấm vào ô trống có dấu hỏi.', el: () => t.blankEl(w) });
    devDo(null);
    done.add(w);
    while (next <= w) { await t.hop(next, { label: next !== w }); next += step; }
    t.fillBlank(w);
    sfx.ding();
  }
  off();
}

/** Máy soi so sánh hai số, rồi em chọn dấu. */
async function compare(c, a, b, why) {
  const t = c.use((bd) => createCompare(bd, a, b));
  await c.say(`So sánh ${R(a)} và ${R(b)}. Máy soi từ hàng trăm sang phải.`, `So sánh <b>${a}</b> và <b>${b}</b>`);
  const r = await t.scan();
  const sign = a > b ? '>' : a < b ? '<' : '=';
  await c.say(why, why.replace(/(\d+)/g, '<b>$1</b>'));
  await c.say('Em chọn dấu nào?', `${a} <b>?</b> ${b}`);
  await c.choose(['>', '<', '='], sign, { hint: 'Dấu lớn hơn mở miệng về phía số lớn hơn.' });
  t.setSign(sign);
  return r;
}

// ── Bài 48: Đơn vị, chục, trăm, nghìn ─────────────────────────────────────────────────────────────────
const B48 = {
  title: 'Bài 48: Đơn vị, chục, trăm, nghìn',
  setup: (board) => { const t = createPlace(board, { cols: 4, sum: false }); t.lock(true); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      await c.say('Đây là bảng hàng. Từ phải sang trái:');
      for (const p of [0, 1, 2, 3]) { t.glow(p); await c.say(`Hàng ${PLACE[p]}.`); }
      t.glow(null);
      await c.say('Bấm thẻ cộng 1 cho đủ 10 đơn vị. Xem chuyện gì xảy ra!', 'Bấm <b>+1</b> cho đủ <b>10 đơn vị</b>.');
      await tapUntil(c, t, 0, 10, 'Bấm thẻ +1 ở hàng đơn vị.');
      await c.say('10 đơn vị đổi thành 1 chục.', '<b>10 đơn vị = 1 chục</b>');
    },
    async (c) => {
      const t = c.t;
      t.set(90);
      await c.say('Bây giờ có 9 chục. Bấm thêm 1 chục.', 'Có 9 chục. Bấm <b>+10</b>.');
      await tapUntil(c, t, 1, 100, 'Bấm thẻ +10 ở hàng chục.');
      await c.say('10 chục đổi thành 1 trăm. Một trăm viết là 100.', '<b>10 chục = 1 trăm</b> (100)');
    },
    async (c) => {
      const t = c.t;
      t.set(900);
      await c.say('Có 9 trăm. Bấm thêm 1 trăm.', 'Có 9 trăm. Bấm <b>+100</b>.');
      await tapUntil(c, t, 2, 1000, 'Bấm thẻ +100 ở hàng trăm.');
      await c.say('10 trăm đổi thành 1 nghìn. Một nghìn viết là số 1 và ba chữ số 0.', '<b>10 trăm = 1 nghìn</b> (1 000)');
    },
    async (c) => {
      const t = c.t;
      t.set(0);
      await c.say('Một trăm bằng mấy chục?', '1 trăm = <b>?</b> chục');
      await c.choose(['1', '10', '100'], '10', { hint: 'Mười chục đổi được một trăm.' });
      await c.say('Lập số có 3 trăm.', 'Lập số có <b>3 trăm</b>.');
      await build(c, t, 300);
      await c.say('Ba trăm viết là 300.', '3 trăm viết là <b>300</b>');
    },
  ],
};

// ── Bài 49: Các số tròn trăm, tròn chục ──────────────────────────────────────────────────────────────
const B49 = {
  title: 'Bài 49: Các số tròn trăm, tròn chục',
  setup: (board) => createLine(board, { lo: 0, hi: 1000, step: 100, caption: true }),
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('Đếm thêm <b>100</b>');
      for (const v of [300, 600, 800]) t.blank(v);
      await c.say('Chú châu chấu nhảy mỗi bước 100. Bấm vào các ô trống theo thứ tự.', 'Đếm thêm <b>100</b>. Bấm các ô <b>?</b> theo thứ tự.');
      await hopBlanks(c, t, 0, 100, [300, 600, 800]);
      await c.say('Một trăm, hai trăm, ba trăm, cho tới một nghìn là các số tròn trăm.', '100, 200, 300… 1 000 là các <b>số tròn trăm</b>');
    },
    async (c) => {
      await c.say('Số tròn trăm có hai chữ số 0 ở tận cùng. Số nào là số tròn trăm?', 'Số nào là <b>số tròn trăm</b>?');
      await c.choose(['450', '700', '307'], '700', { hint: 'Số tròn trăm có chữ số 0 ở hàng chục và hàng đơn vị.' });
      await c.say('Đúng rồi. Bảy trăm là số tròn trăm.');
    },
    async (c) => {
      const t = c.use((bd) => createLine(bd, { lo: 100, hi: 200, step: 10, caption: true }));
      t.caption('Đếm thêm <b>10</b>');
      for (const v of [130, 160, 190]) t.blank(v);
      await c.say('Từ 100 tới 200, mỗi bước 10. Bấm vào các ô trống.', 'Đếm thêm <b>10</b>. Bấm các ô <b>?</b>.');
      await hopBlanks(c, t, 100, 10, [130, 160, 190]);
      await c.say('110, 120, 130 là các số tròn chục: chữ số hàng đơn vị là 0.', '110, 120, 130… là <b>số tròn chục</b>');
    },
    async (c) => {
      const t = c.use((bd) => createPlace(bd, { cols: 3, sum: false }));
      await build(c, t, 250, `Lập số tròn chục: hai trăm năm mươi.`, 'Lập số <b>250</b>: 2 trăm, 5 chục.');
      await c.say('Hàng đơn vị không có thẻ nào, nên chữ số hàng đơn vị là 0. Số nào cũng là số tròn chục?', 'Số nào là <b>số tròn chục</b>?');
      await c.choose(['235', '240', '204'], '240', { hint: 'Số tròn chục có chữ số 0 ở hàng đơn vị.' });
      await c.say('Đúng rồi. Hai trăm bốn mươi là số tròn chục.');
    },
  ],
};

// ── Bài 50: So sánh các số tròn trăm, tròn chục ─────────────────────────────────────────────────────
const B50 = {
  title: 'Bài 50: So sánh các số tròn trăm, tròn chục',
  setup: (board) => createCompare(board, 300, 500),
  steps: [
    async (c) => { await compare(c, 300, 500, '3 trăm bé hơn 5 trăm. Vậy 300 bé hơn 500.'); },
    async (c) => { await compare(c, 340, 370, 'Hàng trăm đều là 3. Ở hàng chục: 4 chục bé hơn 7 chục. Vậy 340 bé hơn 370.'); },
    async (c) => {
      const t = c.use((bd) => createLine(bd, { lo: 0, hi: 1000, step: 100, caption: true }));
      t.caption('Trên tia số, số bên phải <b>lớn hơn</b>');
      t.flag(400, { color: '#2563EB' }); t.flag(800);
      await c.say('Trên tia số, số ở bên phải lớn hơn. Số nào lớn hơn?', 'Số nào lớn hơn: <b>400</b> hay <b>800</b>?');
      await c.choose(['400', '800'], '800', { hint: 'Nhìn lá cờ ở bên phải.' });
      await c.say('Tám trăm lớn hơn bốn trăm.', '800 > 400');
    },
    async (c) => {
      await c.say('Số nào lớn nhất?', 'Số lớn nhất: <b>430, 340, 410</b>?');
      await c.choose(['430', '340', '410'], '430', { hint: 'So sánh hàng trăm trước, rồi tới hàng chục.' });
      await c.say('Bốn trăm ba mươi lớn nhất: 4 trăm 3 chục.');
    },
  ],
};

// ── Bài 51: Số có ba chữ số ──────────────────────────────────────────────────────────────────────────
const B51 = {
  title: 'Bài 51: Số có ba chữ số',
  setup: (board) => { const t = createPlace(board, { cols: 3, sum: false }); t.lock(true); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      await build(c, t, 243, `Lập số gồm 2 trăm, 4 chục và 3 đơn vị.`, 'Lập số gồm <b>2 trăm, 4 chục, 3 đơn vị</b>.');
      await c.say('Viết là 243. Đọc là hai trăm bốn mươi ba.', 'Viết: <b>243</b>. Đọc: <b>hai trăm bốn mươi ba</b>');
    },
    async (c) => {
      const t = c.t;
      t.set(305);
      t.glow(1);
      await c.say('Số này có 3 trăm, 0 chục, 5 đơn vị. Đọc thế nào?', '3 trăm, <b>0 chục</b>, 5 đơn vị: đọc là?');
      await c.choose(['Ba trăm năm mươi', 'Ba trăm linh năm', 'Ba mươi lăm'], 'Ba trăm linh năm', { hint: 'Hàng chục là 0 thì đọc là "linh".' });
      t.glow(null);
      await c.say('Hàng chục là 0, ta đọc là linh: ba trăm linh năm.', '305: <b>ba trăm linh năm</b>');
    },
    async (c) => {
      const t = c.t;
      t.set(0);
      await build(c, t, 415, `Lập số bốn trăm mười lăm.`, 'Lập số <b>415</b>.');
      await c.say('Bốn trăm mười lăm: 4 trăm, 1 chục, 5 đơn vị.', '415: 4 trăm, 1 chục, 5 đơn vị');
    },
    async (c) => {
      const t = c.t;
      t.set(0);
      await c.say('Số gồm 7 trăm, 2 chục, 1 đơn vị là số nào?', '7 trăm, 2 chục, 1 đơn vị là số nào?');
      await c.choose(['712', '721', '127'], '721', { hint: 'Viết lần lượt chữ số hàng trăm, hàng chục, hàng đơn vị.' });
      await t.fill(721, { gap: 90 });
      await c.say(`${capFirst(R(721))}.`, '<b>721</b>');
    },
  ],
};

// ── Bài 52: Viết số thành tổng các trăm, chục, đơn vị ────────────────────────────────────────────────
const B52 = {
  title: 'Bài 52: Viết số thành tổng các trăm, chục, đơn vị',
  setup: (board) => { const t = createPlace(board, { cols: 3 }); t.lock(true); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      await build(c, t, 357, `Lập số ba trăm năm mươi bảy.`, 'Lập số <b>357</b>.');
      await c.say('Mỗi cột cho một số hạng. Xem số được viết thành tổng.', 'Viết thành tổng:');
      await t.showSum(true, { fly: true });
      await c.say('Ba trăm năm mươi bảy bằng ba trăm cộng năm mươi cộng bảy.', '357 = 300 + 50 + 7');
    },
    async (c) => {
      const t = c.t;
      t.set(0);
      await build(c, t, 408, `Lập số bốn trăm linh tám.`, 'Lập số <b>408</b>.');
      await t.showSum(true, { fly: true });
      await c.say('Hàng chục là 0 nên không viết số hạng đó: bốn trăm linh tám bằng bốn trăm cộng tám.', '408 = 400 + 8 (hàng chục là 0)');
    },
    async (c) => {
      const t = c.t;
      t.set(0);
      await c.say('Sáu trăm cộng hai mươi cộng chín bằng bao nhiêu?', '600 + 20 + 9 = <b>?</b>');
      await c.choose(['692', '629', '6209'], '629', { hint: '6 trăm, 2 chục, 9 đơn vị.' });
      await t.fill(629, { gap: 80 });
      await t.showSum(true);
      await c.say('Sáu trăm hai mươi chín.', '<b>629</b> = 600 + 20 + 9');
    },
    async (c) => {
      await c.say('Hai trăm bảy mươi lăm bằng hai trăm cộng mấy cộng năm?', '275 = 200 + <b>?</b> + 5');
      await c.choose(['7', '70', '700'], '70', { hint: 'Chữ số 7 ở hàng chục: 7 chục là 70.' });
      const t = c.t;
      t.set(275);
      await t.showSum(true, { fly: true });
      await c.say('Bảy chục là bảy mươi.', '275 = 200 + <b>70</b> + 5');
    },
  ],
};

// ── Bài 53: So sánh các số có ba chữ số ──────────────────────────────────────────────────────────────
const B53 = {
  title: 'Bài 53: So sánh các số có ba chữ số',
  setup: (board) => createCompare(board, 457, 475),
  steps: [
    async (c) => { await compare(c, 457, 475, 'Hàng trăm đều là 4. Hàng chục: 5 chục bé hơn 7 chục. Vậy 457 bé hơn 475.'); },
    async (c) => { await compare(c, 683, 681, 'Hàng trăm đều là 6, hàng chục đều là 8. Hàng đơn vị: 3 lớn hơn 1. Vậy 683 lớn hơn 681.'); },
    async (c) => { await compare(c, 98, 102, 'Số 98 có hai chữ số, số 102 có ba chữ số. Số có ba chữ số lớn hơn.'); },
    async (c) => {
      await c.say('Số nào lớn nhất?', 'Số lớn nhất: <b>589, 598, 559</b>?');
      await c.choose(['589', '598', '559'], '598', { hint: 'Hàng trăm đều là 5. So sánh hàng chục.' });
      await c.say('Năm trăm chín mươi tám lớn nhất: hàng chục là 9.');
    },
  ],
};

export const NUM_EXPLORES = { b48: B48, b49: B49, b50: B50, b51: B51, b52: B52, b53: B53 };
