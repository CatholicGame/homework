/**
 * Khám phá Bài 59–62: Phép cộng, phép trừ (không nhớ / có nhớ) trong phạm vi 1 000.
 * Bảng hàng (thêm / bớt thẻ) cho thấy ý nghĩa, rồi ✍️ đặt tính dọc (grade4Tools/colview.js): từng cột sáng lên,
 * em chọn kết quả của cột, thầy nói đúng câu của lớp học ("5 cộng 7 bằng 12, viết 2, nhớ 1"), chữ số hiện ra,
 * số nhớ bay sang cột bên trái.
 */

import { createPlace } from '../../grade4Tools/place.js';
import { createColumn } from '../../grade4Tools/colview.js';
import { readVN as R } from '../../grade4Tools/num.js';
import { sleep } from '../../grade3Drills/kit.js';
import { sfx } from '../../grade4Tools/frame.js';
import { build } from './numbers.js';
import { devDo } from './dev.js';

const MINUS = '−';
const dg = (n, i) => { const s = String(n); return i < s.length ? +s[s.length - 1 - i] : null; };
const opts3 = (v) => [...new Set([v - 1, v, v + 1].filter(x => x >= 0))].map(String);

/** Đặt tính rồi tính a op b: em chọn kết quả từng cột. */
async function columnPlay(c, op, a, b, { intro } = {}) {
  const t = c.use((bd) => createColumn(bd, op, a, b));
  const sign = op === '+' ? '+' : MINUS;
  await c.say(intro || `Đặt tính rồi tính: ${R(a)} ${op === '+' ? 'cộng' : 'trừ'} ${R(b)}. Viết các chữ số thẳng cột.`,
    `Đặt tính: <b>${a} ${sign} ${b}</b>. Thẳng hàng đơn vị, hàng chục, hàng trăm.`);
  let cin = 0;
  for (const s of t.steps) {
    if (s.kind === 'carry') { await t.carry(s); continue; }
    const i = s.i, ai = dg(a, i), bi = dg(b, i);
    t.glow(i);
    let ask = null, val = null;
    if (op === '+') {
      if (bi != null || cin) { val = ai + (bi ?? 0) + cin; ask = `${ai}${bi != null ? ` + ${bi}` : ''}${cin ? ' + 1 (nhớ)' : ''}`; }
    } else {
      const sub = (bi ?? 0) + cin;
      if (bi != null || cin) { const big = ai < sub ? ai + 10 : ai; val = big - sub; ask = `${big} ${MINUS} ${sub}`; }
    }
    if (ask) {
      await c.say(`Hàng ${['đơn vị', 'chục', 'trăm'][i]}: ${ask.replace('−', 'trừ').replace(/\+/g, 'cộng').replace('(nhớ)', ', nhớ')} bằng mấy?`, `${['Hàng đơn vị', 'Hàng chục', 'Hàng trăm'][i]}: <b>${ask} = ?</b>`);
      await c.choose(opts3(val), String(val), { hint: op === '+' ? 'Đếm thêm từ số lớn hơn.' : 'Nhớ lại bảng trừ: số trừ cộng với mấy thì được số bị trừ?' });
    }
    await c.say(s.say, `<b>${s.say}</b>`);
    t.write(s);
    cin = t.steps.some(x => x.kind === 'carry' && x.i === i + 1) ? 1 : 0;
    await sleep(250);
  }
  t.glow(null);
  sfx.ding();
  const r = op === '+' ? a + b : a - b;
  await c.say(`Vậy ${R(a)} ${op === '+' ? 'cộng' : 'trừ'} ${R(b)} bằng ${R(r)}.`, `${a} ${sign} ${b} = <b>${r}</b>`);
}

/** Em bấm thẻ hàng p (thêm) cho tới khi bảng có giá trị target (đổi 10 thẻ xong). */
async function addUntil(c, t, p, target, nudge) {
  // Bảng khoá; em bấm thẻ ở khay → thêm đúng số thẻ cần (bấm thừa lúc đang đổi 10 thẻ không làm vượt số).
  t.lock(true); t.only(p);
  let left = Math.round((target - t.value) / 10 ** p);
  const src = t.src(p);
  src.classList.add('x2zc-live');
  const tap = () => { if (left <= 0) return; left--; t.add(p).then(() => t.emit()); };
  src.addEventListener('click', tap);
  devDo(tap);
  await c.until(t, () => t.value === target && left === 0 && t.counts[p] < 10, { nudge, el: () => src });
  src.removeEventListener('click', tap);
  src.classList.remove('x2zc-live');
  devDo(null);
  await sleep(300);
  t.only(null);
}

const placeTop = (bd, v) => { const t = createPlace(bd, { cols: 3, value: v, sum: false }); t.lock(true); return t; };

// ── Bài 59: Phép cộng (không nhớ) trong phạm vi 1 000 ────────────────────────────────────────────────
const B59 = {
  title: 'Bài 59: Phép cộng (không nhớ) trong phạm vi 1 000',
  setup: (bd) => placeTop(bd, 234),
  steps: [
    async (c) => {
      await build(c, c.t, 386, `Trên bảng có ${R(234)}. Em thêm 1 trăm, 5 chục và 2 đơn vị, tức là thêm ${R(152)}.`, '234 + 152: thêm <b>1 trăm, 5 chục, 2 đơn vị</b>.');
      await c.say('Trăm thêm trăm, chục thêm chục, đơn vị thêm đơn vị. Được ba trăm tám mươi sáu.', '234 + 152 = <b>386</b>');
    },
    async (c) => { await columnPlay(c, '+', 234, 152); },
    async (c) => { await columnPlay(c, '+', 523, 46, { intro: `Tính ${R(523)} cộng ${R(46)}. Số 46 chỉ có chục và đơn vị, viết thẳng cột bên phải.` }); },
    async (c) => {
      await c.say('Tính nhẩm: ba trăm cộng hai trăm bằng bao nhiêu?', '300 + 200 = <b>?</b>');
      await c.choose(['50', '500', '5 000'], '500', { hint: '3 trăm cộng 2 trăm bằng 5 trăm.' });
      await c.say('Ba trăm cộng hai trăm bằng năm trăm.', '3 trăm + 2 trăm = 5 trăm: <b>300 + 200 = 500</b>');
    },
  ],
};

// ── Bài 60: Phép cộng (có nhớ) trong phạm vi 1 000 ───────────────────────────────────────────────────
const B60 = {
  title: 'Bài 60: Phép cộng (có nhớ) trong phạm vi 1 000',
  setup: (bd) => placeTop(bd, 245),
  steps: [
    async (c) => {
      const t = c.t;
      await c.say(`Bảng có ${R(245)}. Tính ${R(245)} cộng ${R(37)}. Trước hết, thêm 7 đơn vị.`, '245 + 37: thêm <b>7 đơn vị</b> (bấm <b>+1</b>).');
      await addUntil(c, t, 0, 252, 'Bấm thẻ +1 ở hàng đơn vị.');
      await c.say('5 đơn vị thêm 7 đơn vị là 12 đơn vị. Đủ 10 đơn vị đổi thành 1 chục: đó là nhớ 1 sang hàng chục.', '5 + 7 = 12: đủ 10 đơn vị đổi thành <b>1 chục</b> (nhớ 1)');
      await c.say('Bây giờ thêm 3 chục.', 'Thêm <b>3 chục</b> (bấm <b>+10</b>).');
      await addUntil(c, t, 1, 282, 'Bấm thẻ +10 ở hàng chục.');
      await c.say('Được hai trăm tám mươi hai.', '245 + 37 = <b>282</b>');
    },
    async (c) => { await columnPlay(c, '+', 245, 37); },
    async (c) => { await columnPlay(c, '+', 456, 172, { intro: `Tính ${R(456)} cộng ${R(172)}. Lần này nhớ ở hàng chục.` }); },
    async (c) => {
      await c.say('Ba trăm hai mươi bảy cộng một trăm bốn mươi lăm bằng bao nhiêu?', '327 + 145 = <b>?</b>');
      await c.choose(['462', '472', '482'], '472', { hint: '7 + 5 = 12, viết 2 nhớ 1. 2 + 4 = 6, thêm 1 bằng 7.' });
      await c.say('Bảy cộng năm bằng mười hai, viết hai nhớ một. Hai cộng bốn bằng sáu, thêm một bằng bảy. Ba cộng một bằng bốn. Được bốn trăm bảy mươi hai.', '327 + 145 = <b>472</b>');
    },
  ],
};

// ── Bài 61: Phép trừ (không nhớ) trong phạm vi 1 000 ─────────────────────────────────────────────────
const B61 = {
  title: 'Bài 61: Phép trừ (không nhớ) trong phạm vi 1 000',
  setup: (bd) => placeTop(bd, 486),
  steps: [
    async (c) => {
      await build(c, c.t, 233, `Trên bảng có ${R(486)}. Em bớt 2 trăm, 5 chục và 3 đơn vị. Bấm vào thẻ trong cột để bớt ra.`, '486 − 253: bớt <b>2 trăm, 5 chục, 3 đơn vị</b>. Bấm thẻ trong cột để bớt.');
      await c.say('Trăm bớt trăm, chục bớt chục, đơn vị bớt đơn vị. Còn hai trăm ba mươi ba.', '486 − 253 = <b>233</b>');
    },
    async (c) => { await columnPlay(c, '-', 486, 253); },
    async (c) => { await columnPlay(c, '-', 758, 42, { intro: `Tính ${R(758)} trừ ${R(42)}. Viết 42 thẳng cột bên phải.` }); },
    async (c) => {
      await c.say('Tính nhẩm: chín trăm trừ ba trăm bằng bao nhiêu?', '900 − 300 = <b>?</b>');
      await c.choose(['60', '600', '1 200'], '600', { hint: '9 trăm trừ 3 trăm bằng 6 trăm.' });
      await c.say('Chín trăm trừ ba trăm bằng sáu trăm.', '9 trăm − 3 trăm = 6 trăm: <b>900 − 300 = 600</b>');
    },
  ],
};

// ── Bài 62: Phép trừ (có nhớ) trong phạm vi 1 000 ────────────────────────────────────────────────────
const B62 = {
  title: 'Bài 62: Phép trừ (có nhớ) trong phạm vi 1 000',
  setup: (bd) => createColumn(bd, '-', 52, 28),
  steps: [
    async (c) => { await columnPlay(c, '-', 52, 28, { intro: 'Nhớ lại phép trừ có nhớ đã học: năm mươi hai trừ hai mươi tám.' }); },
    async (c) => { await columnPlay(c, '-', 352, 128, { intro: `Bây giờ tính ${R(352)} trừ ${R(128)}. Làm như cũ, từ phải sang trái.` }); },
    async (c) => { await columnPlay(c, '-', 535, 172, { intro: `Tính ${R(535)} trừ ${R(172)}. Lần này nhớ ở hàng chục.` }); },
    async (c) => {
      await c.say('Sáu trăm bốn mươi mốt trừ ba trăm mười lăm bằng bao nhiêu?', '641 − 315 = <b>?</b>');
      await c.choose(['326', '334', '336'], '326', { hint: '1 không trừ được 5, lấy 11 trừ 5 bằng 6, viết 6 nhớ 1.' });
      await c.say('Một không trừ được năm, lấy mười một trừ năm bằng sáu, viết sáu nhớ một. Một thêm một bằng hai, bốn trừ hai bằng hai. Sáu trừ ba bằng ba. Được ba trăm hai mươi sáu.', '641 − 315 = <b>326</b>');
    },
  ],
};

export const CALC_EXPLORES = { b59: B59, b60: B60, b61: B61, b62: B62 };
