/**
 * Khám phá về số (Toán 3 Tập Hai): Bài 45 (số có bốn chữ số, 10 000), 46 (so sánh trong phạm vi 10 000),
 * 48 (làm tròn đến chục, trăm), 60 (so sánh trong phạm vi 100 000), 61 (làm tròn đến nghìn, chục nghìn).
 * Công cụ của Toán 4: 🧱 bảng hàng (createPlace), máy soi so sánh (createCompare), 📏 tia số có bi lăn (createLine).
 */

import { createPlace, createCompare } from '../../grade4Tools/place.js';
import { createLine } from '../../grade4Tools/line.js';
import { R, fmt, sleep, sfx, buildOnBoard, rollBall, tapFlag, ask, numOptions } from './kit.js';

// ── Bài 45: Các số có bốn chữ số. Số 10 000 ───────────────────────────────────────────────────────────
const B45 = {
  title: 'Bài 45: Các số có bốn chữ số. Số 10 000',
  setup: (board) => { const t = createPlace(board, { cols: 5, value: 900 }); t.lock(true); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      await c.say('Đây là bảng hàng. Đang có 9 thẻ một trăm, tức là chín trăm.', 'Bảng hàng: đang có <b>900</b>');
      t.lock(false); t.only(2);
      await c.say('Bấm thêm 1 thẻ một trăm. Xem chuyện gì xảy ra!', 'Bấm thêm thẻ <b>+100</b>!');
      await c.until(t, () => t.counts[3] >= 1, { nudge: 'Bấm thẻ +100 màu xanh lá đậm.', el: () => t.src(2) });
      t.lock(true);
      t.glow(3);
      await c.say('Mười trăm đổi thành một nghìn. Một nghìn viết là số 1 và ba chữ số 0.', '<b>10 trăm = 1 nghìn</b><br>viết là 1 000');
      t.glow(null);
    },
    async (c) => {
      const t = c.t;
      t.set(0);
      await buildOnBoard(c, t, 2457, { say: `Em lập số ${R(2457)}.`, shown: 'Lập số <b>2 457</b> trên bảng hàng.' });
      await c.say(`Số ${R(2457)} có bốn chữ số: 2 nghìn, 4 trăm, 5 chục và 7 đơn vị.`, '2 457 gồm <b>2</b> nghìn, <b>4</b> trăm, <b>5</b> chục, <b>7</b> đơn vị');
    },
    async (c) => {
      const t = c.t;
      t.set(0);
      await buildOnBoard(c, t, 4036, { say: `Lập số ${R(4036)}. Hàng nào không có thẻ thì để trống.`, shown: 'Lập số <b>4 036</b>. Hàng trăm để trống.' });
      t.glow(2);
      await c.say('Hàng trăm không có thẻ nào, nên viết chữ số 0 ở hàng trăm.', 'Hàng trăm trống → viết chữ số <b>0</b>');
      t.glow(null);
      await t.showSum(true, { fly: true });
      await c.say('Viết thành tổng: bốn nghìn cộng ba mươi cộng sáu.', '4 036 = 4 000 + 30 + 6');
    },
    async (c) => {
      const t = c.t;
      t.set(9999);
      t.lock(false); t.only(0);
      await c.say(`Đây là số ${R(9999)}, số lớn nhất có bốn chữ số. Bấm thêm 1 đơn vị!`, 'Số <b>9 999</b>. Bấm <b>+1</b> xem sao!');
      await c.until(t, () => t.value === 10000, { nudge: 'Bấm thẻ +1 ở hàng đơn vị.', el: () => t.src(0) });
      await sleep(400);
      t.lock(true);
      t.glow(4);
      await c.say('Các hàng lần lượt đổi lên. Được mười nghìn, viết là số 1 và bốn chữ số 0. Số mười nghìn có năm chữ số.', 'Số liền sau 9 999 là <b>10 000</b> (mười nghìn)');
      t.glow(null);
    },
    async (c) => {
      await ask(c, {
        say: 'Số nào là số tròn nghìn? Số tròn nghìn có ba chữ số tận cùng là 0.',
        shown: 'Số nào là <b>số tròn nghìn</b>?',
        options: numOptions(5000, [3600, 4050]), answer: 5000,
        hint: 'Số tròn nghìn có hàng trăm, hàng chục, hàng đơn vị đều là 0.',
        ok: 'Năm nghìn là số tròn nghìn. Ba nghìn sáu trăm là số tròn trăm.', okShown: '<b>5 000</b> tròn nghìn · 3 600 tròn trăm',
      });
    },
  ],
};

// ── Bài 46 / 60: So sánh ──────────────────────────────────────────────────────────────────────────────
const compareExplore = (title, [a1, b1], [a2, b2], [a3, b3, sign3, why3], pick) => ({
  title,
  setup: (board) => createCompare(board, a1, b1),
  steps: [
    async (c) => {
      const t = c.t;
      await c.say(`So sánh ${R(a1)} và ${R(b1)}.`, `So sánh <b>${fmt(a1)}</b> và <b>${fmt(b1)}</b>`);
      const r = await t.scan();
      t.setSign(r.sign);
      await c.say('Số nào có nhiều chữ số hơn thì lớn hơn.', `Nhiều chữ số hơn → <b>lớn hơn</b>: ${fmt(a1)} ${r.sign === '<' ? '&lt;' : '&gt;'} ${fmt(b1)}`);
    },
    async (c) => {
      const t = c.use((b) => createCompare(b, a2, b2));
      await c.say('Hai số có cùng số chữ số thì so từng cặp chữ số, từ trái sang phải, tới khi gặp cặp khác nhau.', 'Cùng số chữ số → so <b>từ trái sang phải</b>');
      const r = await t.scan();
      t.setSign(r.sign);
      const s = String(a2), u = String(b2);
      const i = [...s].findIndex((d, k) => d !== u[k]);
      const place = ['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn'][s.length - 1 - i];
      await c.say(`Tới hàng ${place}: ${s[i]} ${r.sign === '<' ? 'bé hơn' : 'lớn hơn'} ${u[i]}. Vậy ${R(a2)} ${r.sign === '<' ? 'bé hơn' : 'lớn hơn'} ${R(b2)}.`,
        `Hàng ${place}: ${s[i]} ${r.sign === '<' ? '&lt;' : '&gt;'} ${u[i]} → ${fmt(a2)} <b>${r.sign === '<' ? '&lt;' : '&gt;'}</b> ${fmt(b2)}`);
    },
    async (c) => {
      const t = c.use((b) => createCompare(b, a3, b3));
      await c.say('Đến lượt em. Chọn dấu đúng, máy soi sẽ kiểm tra.', `Chọn dấu: ${fmt(a3)} ? ${fmt(b3)}`);
      const right = await c.choose([{ html: '&gt;', value: '>' }, { html: '&lt;', value: '<' }, { html: '=', value: '=' }], sign3, { hint: 'So từng cặp chữ số từ trái sang phải, tới cặp khác nhau.' });
      const r = await t.scan();
      t.setSign(r.sign);
      await c.say(`${right ? 'Đúng rồi! ' : ''}${why3}`);
    },
    async (c) => {
      const { nums, say, answer, hint, ok } = pick;
      c.use(card(nums.map(n => fmt(n)).join('</span><span>')));
      await ask(c, { say, shown: say, options: numOptions(answer, nums.filter(n => n !== answer)), answer, hint, ok });
    },
  ],
});

const B46 = compareExplore('Bài 46: So sánh các số trong phạm vi 10 000',
  [999, 1000], [4528, 4582], [6091, 6019, '>', 'Hàng nghìn, hàng trăm bằng nhau. Tới hàng chục: 9 lớn hơn 1, nên dấu lớn hơn.'],
  { nums: [3250, 3520, 3205], say: 'Trong ba số này, số nào lớn nhất?', answer: 3520, hint: 'Hàng nghìn bằng nhau, so tiếp hàng trăm.', ok: 'Ba nghìn năm trăm hai mươi có hàng trăm là 5, lớn nhất.' });

const B60 = compareExplore('Bài 60: So sánh các số trong phạm vi 100 000',
  [99999, 100000], [76315, 76351], [48207, 48072, '>', 'Hàng chục nghìn, hàng nghìn bằng nhau. Tới hàng trăm: 2 lớn hơn 0, nên dấu lớn hơn.'],
  { nums: [91430, 19430, 91340], say: 'Trong ba số này, số nào bé nhất?', answer: 19430, hint: 'So chữ số hàng chục nghìn trước.', ok: 'Mười chín nghìn bốn trăm ba mươi có hàng chục nghìn là 1, bé nhất.' });

// ── Bài 48 / 61: Làm tròn ─────────────────────────────────────────────────────────────────────────────
/** Một lượt làm tròn n giữa lo và hi trên tia số; em bấm lá cờ (tap) hoặc xem bi lăn. */
async function roundStep(c, t, n, lo, hi, { tap = false, rule, digitName, digit }) {
  t.clearMarks();
  t.flag(lo, { color: '#60A5FA' });
  t.flag(hi, { color: '#60A5FA' });
  t.pin(n);
  const to = n - lo < hi - n ? lo : hi;
  if (tap) {
    t.caption(`${fmt(n)} làm tròn đến ${rule} thành số nào?`);
    await c.say(`Số ${R(n)} có chữ số ${digitName} là ${digit}. Làm tròn đến ${rule} thì được số nào? Bấm vào lá cờ.`,
      `Chữ số ${digitName}: <b>${digit}</b>. Bấm vào lá cờ đúng.`);
    await tapFlag(c, t, to, to === lo ? hi : lo, { hint: digit < 5 ? `Chữ số ${digit} bé hơn 5, nên làm tròn xuống.` : `Chữ số ${digit} không bé hơn 5, nên làm tròn lên.` });
    sfx.ding();
  } else {
    t.caption(`Làm tròn <b>${fmt(n)}</b> đến ${rule}`);
    await c.say(`Số ${R(n)} nằm giữa ${R(lo)} và ${R(hi)}. Thả viên bi xem nó lăn về đâu!`, `${fmt(n)} nằm giữa ${fmt(lo)} và ${fmt(hi)}`);
  }
  await rollBall(t, n, lo, hi);
  t.caption(`${fmt(n)} làm tròn đến ${rule} được <b>${fmt(to)}</b>`);
  await t.tilt(0);
  return to;
}

/** Tia số làm tròn; dòng chữ trên tia số nổi lên trên bầu trời vẽ của tia số (bầu trời SVG tràn lên che mất chữ). */
const lineFor = (n, unit) => (b) => {
  injectCss();
  const lo = Math.floor(n / unit) * unit;
  const t = createLine(b, { lo, hi: lo + unit, step: unit, minor: unit / 10, caption: true });
  b.querySelector('.g4l')?.classList.add('x3n-line');
  return t;
};
/** Đề chữ to giữa tờ giấy (bước chọn nhanh). */
const card = (html) => (b) => { injectCss(); b.innerHTML = `<div class="x3n-list"><span>${html}</span></div>`; return { on: () => () => {} }; };

/** Ba bước bi lăn (xuống, lên, đúng giữa) rồi các bước riêng của bài (more). */
const roundExplore = (title, unit, unitName, [n1, n2, nMid], more) => ({
  title,
  setup: (b) => lineFor(n1, unit)(b),
  steps: [
    async (c) => {
      const lo = Math.floor(n1 / unit) * unit;
      const to = await roundStep(c, c.t, n1, lo, lo + unit, { rule: `hàng ${unitName}` });
      await c.say(`Bi lăn về mốc gần hơn. Vậy ${R(n1)} làm tròn đến hàng ${unitName} được ${R(to)}.`, `${fmt(n1)} ≈ <b>${fmt(to)}</b>`);
    },
    async (c) => {
      const lo = Math.floor(n2 / unit) * unit;
      const t = c.use(lineFor(n2, unit));
      const to = await roundStep(c, t, n2, lo, lo + unit, { rule: `hàng ${unitName}` });
      await c.say(`Số này gần ${R(to)} hơn, nên làm tròn lên.`, `${fmt(n2)} ≈ <b>${fmt(to)}</b>`);
    },
    async (c) => {
      const lo = Math.floor(nMid / unit) * unit;
      const t = c.use(lineFor(nMid, unit));
      t.flag(lo, { color: '#60A5FA' }); t.flag(lo + unit, { color: '#60A5FA' });
      t.pin(nMid);
      t.caption(`Đúng giữa: <b>${fmt(nMid)}</b>`);
      t.bracket(lo, nMid, { text: fmt(unit / 2), color: '#F97316' });
      t.bracket(nMid, lo + unit, { text: fmt(unit / 2), color: '#F97316' });
      await c.say(`Số ${R(nMid)} nằm đúng chính giữa, cách hai mốc bằng nhau.`);
      t.ball(nMid);
      await t.tilt(1);
      await t.roll(lo + unit);
      await c.say('Quy ước: đúng giữa thì làm tròn lên.', `Đúng giữa → <b>làm tròn lên</b>: ${fmt(lo + unit)}`);
      await t.tilt(0);
    },
    ...more,
  ],
});

/** Em làm tròn n (bấm lá cờ) sau khi thầy nói quy tắc nhìn chữ số. */
const tapRound = (n, unit, rule, digitName, digit, sayRule, shownRule) => async (c) => {
  const lo = Math.floor(n / unit) * unit;
  const t = c.use(lineFor(n, unit));
  await c.say(sayRule, shownRule);
  const to = await roundStep(c, t, n, lo, lo + unit, { tap: true, rule, digitName, digit });
  await c.say(`Đúng rồi! ${R(n)} làm tròn đến ${rule} được ${R(to)}.`, `${fmt(n)} ≈ <b>${fmt(to)}</b>`);
};

const B48 = roundExplore('Bài 48: Làm tròn số đến hàng chục, hàng trăm', 10, 'chục', [63, 87, 45], [
  tapRound(1284, 100, 'hàng trăm', 'hàng chục', 8,
    'Làm tròn đến hàng trăm thì nhìn chữ số hàng chục. Bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
    'Làm tròn đến <b>hàng trăm</b>: nhìn chữ số <b>hàng chục</b>'),
  async (c) => {
    c.use(card('⛰️ 3 012 m'));
    await ask(c, {
      say: `Đỉnh núi cao ${R(3012)} mét. Làm tròn đến hàng trăm thì được bao nhiêu mét?`, shown: 'Làm tròn <b>3 012 m</b> đến hàng trăm',
      options: numOptions(3000, [3010, 3100], 'm'), answer: 3000, hint: 'Chữ số hàng chục là 1, bé hơn 5, nên làm tròn xuống.',
      ok: `Chữ số hàng chục là 1, làm tròn xuống được ${R(3000)} mét.`,
    });
  },
]);

const B61 = roundExplore('Bài 61: Làm tròn số đến hàng nghìn, hàng chục nghìn', 1000, 'nghìn', [4362, 7815, 2500], [
  tapRound(97418, 1000, 'hàng nghìn', 'hàng trăm', 4,
    'Làm tròn đến hàng nghìn thì nhìn chữ số hàng trăm. Bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
    'Làm tròn đến <b>hàng nghìn</b>: nhìn chữ số <b>hàng trăm</b>'),
  tapRound(97418, 10000, 'hàng chục nghìn', 'hàng nghìn', 7,
    'Làm tròn đến hàng chục nghìn thì nhìn chữ số hàng nghìn.', 'Làm tròn đến <b>hàng chục nghìn</b>: nhìn chữ số <b>hàng nghìn</b>'),
]);

let styled = false;
function injectCss() {
  if (styled) return;
  styled = true;
  const s = document.createElement('style');
  s.id = 'x3n-css';
  s.textContent = `
    .x3n-list { flex: 1; min-height: 0; display: flex; flex-wrap: wrap; align-content: center; justify-content: center; gap: 4cqh 5cqi; padding: 4cqh 4cqi 30cqh; font-family: 'Baloo 2', sans-serif; }
    .x3n-line > .g4l-cap { position: relative; z-index: 1; font-size: min(7.5cqh, 4.6cqi); }
    .x3n-list span { font-weight: 800; color: #1E3A8A; background: #EFF6FF; border: 2px solid #BFDBFE; border-radius: 0.5em; padding: 0.1em 0.5em; font-size: min(16cqh, 9cqi); line-height: 1.2; }
  `;
  document.head.appendChild(s);
}

export const NUMBERS = { b45: B45, b46: B46, b48: B48, b60: B60, b61: B61 };
