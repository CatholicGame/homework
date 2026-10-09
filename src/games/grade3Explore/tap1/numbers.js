/**
 * Số và đặt tính: Bài 1 (🧱 bảng hàng ba cột, so sánh, tia số), Bài 2 (✍️ cộng, trừ có nhớ), Bài 23, 36 (✍️ nhân).
 * Dùng công cụ của Toán 4 công cụ (bảng hàng, so sánh, tia số, đặt tính dọc) với số đến 1 000.
 */

import { createPlace, createCompare } from '../../grade4Tools/place.js';
import { createLine } from '../../grade4Tools/line.js';
import { createColumn } from '../../grade4Tools/colview.js';
import { readVN, digitsOf } from '../../grade4Tools/num.js';
import { sfx, sleep } from './kit.js';

const PL = ['đơn vị', 'chục', 'trăm'];
const SIGN = { '+': '+', '-': '−', '*': '×' };
const NAME = { '+': 'cộng', '-': 'trừ', '*': 'nhân' };

/** Em lập số target trên bảng hàng; cột thừa thẻ thì thầy nhắc ngay. */
async function buildOnBoard(c, t, target) {
  t.lock(false); t.only(null);
  const ds = digitsOf(target, t.cols);
  const wrongCol = () => { for (let p = t.cols - 1; p >= 0; p--) if (t.counts[p] !== (ds[p] || 0)) return p; return -1; };
  let warned = -1;
  const off = t.on(() => {
    const over = [...Array(t.cols).keys()].reverse().find(p => t.counts[p] > (ds[p] || 0));
    if (over != null && over !== warned) { warned = over; c.hint(`Hàng ${PL[over]} chỉ cần ${ds[over] || 0} thẻ. Bấm vào thẻ trong cột để bớt ra.`); }
    t.glow(over != null ? over : null);
  });
  if (import.meta.env.DEV) window.__x3aNext = () => { const p = wrongCol(); return p < 0 ? null : t.counts[p] < ds[p] ? t.src(p) : t.col(p).querySelector('.g4p-chip'); };
  await c.until(t, () => t.value === target, {
    nudge: () => { const p = wrongCol(); return p < 0 ? '' : `Hàng ${PL[p]} cần ${ds[p] || 0} thẻ.`; },
    el: () => { const p = wrongCol(); return p < 0 ? null : t.src(p); },
  });
  if (import.meta.env.DEV) window.__x3aNext = null;
  off();
  t.glow(null);
  t.lock(true);
  sfx.ding();
}

// ── Bài 1 ─────────────────────────────────────────────────────────────────────────────────────────────
export const B1 = {
  title: 'Bài 1: Ôn tập các số đến 1 000',
  setup: (board) => { const t = createPlace(board, { cols: 3 }); t.lock(true); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      await c.say('Đây là bảng hàng: hàng trăm, hàng chục, hàng đơn vị.', 'Hàng <b>trăm</b> · hàng <b>chục</b> · hàng <b>đơn vị</b>');
      for (const p of [2, 1, 0]) { t.glow(p); await c.say(`Mỗi thẻ ở hàng ${PL[p]} là ${10 ** p}.`); }
      t.glow(null);
      await c.say(`Em lập số ${readVN(245)}: 2 trăm, 4 chục và 5 đơn vị. Bấm các thẻ ở dưới.`, 'Lập số <b>245</b>');
      await buildOnBoard(c, t, 245);
    },
    async (c) => {
      const t = c.t;
      await c.say('Viết số thành tổng các trăm, chục, đơn vị.', 'Viết thành tổng:');
      await t.showSum(true, { fly: true });
      await c.say('245 bằng 200 cộng 40 cộng 5.', '245 = 200 + 40 + 5');
    },
    async (c) => {
      const t = c.use((b) => createPlace(b, { cols: 4, value: 999, sum: false }));
      t.lock(false); t.only(0);
      await c.say(`Đây là số ${readVN(999)}, số lớn nhất có ba chữ số. Bấm thêm 1 đơn vị xem sao!`, 'Số <b>999</b>. Bấm <b>+1</b>!');
      if (import.meta.env.DEV) window.__x3aNext = () => t.src(0);
      await c.until(t, () => t.counts[0] >= 10 || t.value >= 1000, { nudge: 'Bấm thẻ +1 ở hàng đơn vị.', el: () => t.src(0) });
      if (import.meta.env.DEV) window.__x3aNext = null;
      t.lock(true);
      await sleep(2600);
      await c.say('10 đơn vị đổi thành 1 chục, 10 chục đổi thành 1 trăm, 10 trăm là 1 nghìn. Số liền sau của 999 là một nghìn.', '999 + 1 = <b>1 000</b> (một nghìn)');
    },
    async (c) => {
      const t = c.use((b) => createCompare(b, 452, 425));
      await c.say('So sánh 452 và 425. Soi từng hàng, từ hàng trăm.', 'So sánh <b>452</b> và <b>425</b>');
      const r = await t.scan();
      await c.say('Hàng trăm bằng nhau, cùng là 4. Hàng chục: 5 chục lớn hơn 2 chục. Chọn dấu.', 'Hàng chục: <b>5 > 2</b>');
      await c.choose([{ html: '&gt;', value: '>' }, { html: '&lt;', value: '<' }, { html: '=', value: '=' }], r.sign, { hint: '5 chục nhiều hơn 2 chục.' });
      t.setSign('>');
      await c.say('452 lớn hơn 425.', '452 > 425');
    },
    async (c) => {
      const t = c.use((b) => createLine(b, { lo: 994, hi: 1000, step: 1, caption: true }));
      t.caption('Số liền sau hơn số liền trước <b>1</b>');
      const blanks = [996, 998, 1000];
      blanks.forEach(v => t.blank(v));
      t.hopper(994);
      await c.say('Trên tia số, mỗi bước sang phải là thêm 1. Bấm vào ô trống để chú châu chấu nhảy tới.', 'Bấm các ô <b>?</b> theo thứ tự.');
      let next = 995, tapped = null;
      const off = t.on((ev, v) => {
        if (ev !== 'tap') return;
        const want = blanks.find(x => !t.blankEl(x)?.dataset.done);
        if (v === want) tapped = v; else c.hint('Chú châu chấu nhảy lần lượt từng ô, từ trái sang phải.');
      });
      for (const want of blanks) {
        if (import.meta.env.DEV) window.__x3aNext = () => t.blankEl(want);
        await c.until(t, () => tapped === want, { nudge: 'Bấm vào ô trống có dấu hỏi.', el: () => t.blankEl(want) });
        while (next <= want) { await t.hop(next, { label: next !== want }); next++; }
        t.fillBlank(want);
        const b = t.blankEl(want); if (b) b.dataset.done = '1';
        sfx.ding();
      }
      if (import.meta.env.DEV) window.__x3aNext = null;
      off();
      await c.say('Số liền sau của 999 là một nghìn.', '999 → <b>1 000</b>');
    },
  ],
};

// ── Đặt tính ──────────────────────────────────────────────────────────────────────────────────────────
/** Các bước đặt tính: thầy làm `demo` chữ số đầu, sau đó em chọn chữ số. */
async function runColumn(c, t, { demo = 1 } = {}) {
  let digitNo = 0;
  for (const s of t.steps) {
    if (s.kind === 'carry') { await t.carry(s); continue; }
    t.glow(s.i);
    if (digitNo < demo) {
      await c.say(s.say);
      t.write(s);
    } else {
      const right = s.write, n = +right;
      const opts = new Set([right]);
      for (const w of [n + 1, n - 1, n + 10, (n + 5) % 10, n + 2]) if (opts.size < 3 && w >= 0 && String(w) !== right) opts.add(String(w));
      c.show(`<b>Hàng ${PL[s.i]}</b>: viết ${right.length > 1 ? 'số' : 'chữ số'} nào?`);
      await c.choose([...opts].sort((x, y) => x - y).map(x => ({ html: x, value: x })), right, { hint: 'Nhớ thêm số nhớ (nếu có) ở hàng này.' });
      t.write(s);
      await c.say(s.say);
    }
    digitNo++;
  }
  t.glow(null);
}

/** Ba bước của một phép tính dọc. */
function columnSteps3(op, a, b, intro, { demo = 1, check = '' } = {}) {
  const head = `${a} ${SIGN[op]} ${b}`;
  return [
    async (c) => {
      if (c.t.op !== op || c.t.a !== a) { const t = c.use((bd) => createColumn(bd, op, a, b)); t.op = op; t.a = a; }
      await c.say(intro, `Đặt tính: <b>${head}</b>`);
      await c.say(op === '*'
        ? 'Viết thừa số có một chữ số thẳng cột với hàng đơn vị. Nhân từ phải sang trái, bắt đầu từ hàng đơn vị.'
        : 'Viết các chữ số cùng hàng thẳng cột: đơn vị dưới đơn vị, chục dưới chục, trăm dưới trăm. Tính từ phải sang trái.',
      op === '*' ? 'Nhân từ <b>hàng đơn vị</b>, phải sang trái' : 'Thẳng cột · tính từ <b>hàng đơn vị</b>');
    },
    async (c) => { await runColumn(c, c.t, { demo }); },
    async (c) => {
      const r = c.t.result;
      await c.say(`Vậy ${a} ${NAME[op]} ${b} bằng ${r}.`, `${head} = <b>${r}</b>`);
      if (check) await c.say(check);
    },
  ];
}

const col = (op, a, b) => (board) => { const t = createColumn(board, op, a, b); t.op = op; t.a = a; return t; };

export const B2 = {
  title: 'Bài 2: Cộng, trừ trong phạm vi 1 000',
  setup: col('+', 456, 278),
  steps: [
    ...columnSteps3('+', 456, 278, 'Đặt tính rồi tính 456 cộng 278.', { check: 'Hàng nào cộng được từ 10 trở lên thì nhớ 1 sang hàng bên trái.' }),
    ...columnSteps3('-', 652, 218, 'Bây giờ trừ: 652 trừ 218.', { check: 'Thử lại: lấy hiệu cộng với số trừ, được số bị trừ: 434 cộng 218 bằng 652.' }),
  ],
};

export const B23 = {
  title: 'Bài 23: Nhân số có hai chữ số với số có một chữ số',
  setup: col('*', 13, 3),
  steps: [
    ...columnSteps3('*', 13, 3, 'Đặt tính rồi tính 13 nhân 3.', { demo: 2 }),
    ...columnSteps3('*', 26, 3, 'Bây giờ có nhớ: 26 nhân 3.', { demo: 1, check: 'Tích ở hàng nào từ 10 trở lên thì nhớ sang hàng bên trái, rồi cộng thêm vào tích của hàng đó.' }),
  ],
};

export const B36 = {
  title: 'Bài 36: Nhân số có ba chữ số với số có một chữ số',
  setup: col('*', 142, 3),
  steps: [
    ...columnSteps3('*', 142, 3, 'Đặt tính rồi tính 142 nhân 3.', { demo: 1, check: 'Nhân lần lượt hàng đơn vị, hàng chục, hàng trăm. Nhớ cộng thêm số nhớ.' }),
    async (c) => {
      await c.say('Thử với: 213 nhân 3 bằng bao nhiêu? Nhân từng hàng: 3 nhân 3, 3 nhân 1, 3 nhân 2.', '<b>213 × 3 = ?</b>');
      await c.choose([{ html: '639', value: 639 }, { html: '636', value: 636 }, { html: '369', value: 369 }], 639, { hint: 'Hàng đơn vị: 3 × 3 = 9. Hàng chục: 3 × 1 = 3. Hàng trăm: 3 × 2 = 6.' });
      await c.say('Đúng! 213 nhân 3 bằng 639.', '213 × 3 = <b>639</b>');
    },
  ],
};
