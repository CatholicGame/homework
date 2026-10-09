/**
 * Cộng, trừ có nhớ trong phạm vi 100 (Bài 19, 20, 22, 23): làm bằng 🥢 que tính (bó lại / tháo bó), rồi ✍️ đặt tính từng bước.
 */

import { createSticks } from './sticks.js';
import { columnStep } from './colrun.js';
import { sleep, MINUS } from './stage.js';

const nums = (arr, unit = '') => arr.map((v) => ({ html: `${v}${unit}`, value: v }));

/** Em thêm a chục và b que rời, rồi bó 10 que rời thành 1 bó. */
async function addSticks(c, t, tens, ones) {
  const goalT = Math.floor(t.value / 10) + tens, goalO = (t.value % 10) + ones;
  t.allow({ addTen: tens > 0, addOne: true });
  await c.until(t, () => !t.busy && t.tens >= goalT && t.ones >= goalO, {
    nudge: () => (t.tens < goalT ? 'Bấm "cộng 1 bó chục".' : 'Bấm "cộng 1 que".'),
    el: () => (t.tens < goalT ? t.btn('addTen') : t.btn('addOne')),
  });
  t.lock(true);
  await c.say(`Có ${goalO} que rời, nhiều hơn 10. Bấm Bó lại để bó 10 que thành 1 chục.`, `<b>${goalO}</b> que rời: bấm <b>🎀 Bó lại</b>`);
  t.allow({ bundle: true });
  await c.until(t, () => !t.busy && t.ones < 10, { nudge: 'Bấm nút "Bó lại".', el: () => t.btn('bundle') });
  t.lock(true);
}

/** Em lấy đi a chục và b que; thiếu que rời thì tháo 1 bó trước. */
async function takeSticks(c, t, tens, ones) {
  const start = t.value, goal = start - tens * 10 - ones;
  if (t.ones < ones) {
    await c.say(`Chỉ có ${t.ones} que rời, không đủ để lấy ${ones} que. Chạm vào một bó để tháo ra thành 10 que rời.`, `Không đủ que rời: chạm vào <b>1 bó</b> để tháo`);
    t.allow({ untie: true });
    const n0 = t.ones;
    await c.until(t, () => !t.busy && t.ones >= n0 + 10, { nudge: 'Chạm vào một bó que tính.', el: () => t.tenEl() });
    await c.say(`Bây giờ có ${t.ones} que rời.`, `<b>${t.ones}</b> que rời`);
  }
  await c.say(`Chạm vào que tính để lấy đi ${ones} que rời${tens ? ` và ${tens} bó` : ''}.`, `Lấy đi <b>${ones} que</b>${tens ? ` và <b>${tens} bó</b>` : ''}`);
  t.allow({ takeOne: true, takeTen: tens > 0 });
  const tensLeft = Math.floor(goal / 10);
  let warned = false;
  const off = t.on((ev) => {
    if (ev !== 'change' || warned) return;
    if (t.tens < tensLeft || t.ones < goal % 10) { warned = true; c.hint(`Lấy đúng ${ones} que rời${tens ? ` và ${tens} bó` : ''} thôi.`); }
  });
  try {
    await c.until(t, () => !t.busy && t.value <= goal, {
      nudge: () => (t.ones > goal % 10 ? 'Chạm vào que rời để lấy đi.' : 'Chạm vào một bó để lấy đi.'),
      el: () => (t.ones > goal % 10 ? t.oneEl() : t.tenEl()),
    });
  } finally { off(); }
  t.lock(true);
}

const intro = (a, op, b) => async (c) => {
  const t = c.t;
  t.caption(`${a} ${op === '+' ? '+' : MINUS} ${b} = ?`);
  await c.say(`Tính ${a} ${op === '+' ? 'cộng' : 'trừ'} ${b} bằng que tính. Trên bàn có ${a} que: ${Math.floor(a / 10)} bó và ${a % 10} que rời.`,
    `Tính <b>${a} ${op === '+' ? '+' : '−'} ${b}</b> bằng que tính`);
};

const b19 = {
  title: 'Bài 19: Phép cộng (có nhớ) số có hai chữ số với số có một chữ số',
  setup: (board) => { const t = createSticks(board, { value: 27 }); t.lock(true); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      await intro(27, '+', 5)(c);
      await c.say('Thêm 5 que rời: bấm nút cộng 1 que năm lần.', 'Thêm <b>5 que</b>');
      await addSticks(c, t, 0, 5);
      t.caption('27 + 5 = <b>32</b>');
      await c.say('7 que thêm 5 que là 12 que: bó được 1 chục, còn 2 que. Có 3 bó và 2 que: 32.', '7 + 5 = 12: thêm <b>1 chục</b><br>27 + 5 = <b>32</b>');
    },
    async (c) => { await columnStep(c, '+', 27, 5); await c.say('Số nhớ 1 chính là bó que mới bó được.', 'Nhớ 1 = <b>1 bó</b> mới'); },
    async (c) => { await c.say('Em tự tính 36 cộng 8.', 'Em tự tính <b>36 + 8</b>'); await columnStep(c, '+', 36, 8, { intro: false }); },
    async (c) => {
      c.show('24 bút chì và 6 bút mực: tất cả bao nhiêu cái bút?');
      await c.say('Trong hộp có 24 cái bút chì và 6 cái bút mực. Trong hộp có tất cả bao nhiêu cái bút?');
      await c.choose([{ html: '24 + 6 = 30', value: 1 }, { html: '24 + 6 = 210', value: 2 }, { html: `24 ${MINUS} 6 = 18`, value: 3 }], 1,
        { hint: '4 cộng 6 bằng 10, viết 0 nhớ 1.' });
      await c.say('4 cộng 6 bằng 10, viết 0, nhớ 1. 2 thêm 1 bằng 3, viết 3. Có tất cả 30 cái bút.', '24 + 6 = <b>30</b> (cái bút)');
    },
  ],
};

const b20 = {
  title: 'Bài 20: Phép cộng (có nhớ) số có hai chữ số với số có hai chữ số',
  setup: (board) => { const t = createSticks(board, { value: 37 }); t.lock(true); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      await intro(37, '+', 25)(c);
      await c.say('Thêm 25 que: 2 bó và 5 que rời.', 'Thêm <b>2 bó</b> và <b>5 que</b>');
      await addSticks(c, t, 2, 5);
      t.caption('37 + 25 = <b>62</b>');
      await c.say('7 que thêm 5 que là 12 que, bó thành 1 chục còn 2 que. 3 bó thêm 2 bó, thêm 1 bó mới là 6 bó. Được 62.', '7 + 5 = 12 → 1 bó mới<br>3 + 2 + 1 = 6 bó<br>37 + 25 = <b>62</b>');
    },
    async (c) => { await columnStep(c, '+', 37, 25); },
    async (c) => { await c.say('Em tự tính 46 cộng 38.', 'Em tự tính <b>46 + 38</b>'); await columnStep(c, '+', 46, 38, { intro: false }); },
    async (c) => {
      c.show('Sáng 17 <i>l</i>, chiều 23 <i>l</i> mật ong. Cả ngày?');
      await c.say('Buổi sáng cô Hoa thu được 17 lít mật ong, buổi chiều 23 lít. Cả ngày cô thu được bao nhiêu lít?');
      await c.choose(nums([30, 40, 310], ' <i>l</i>'), 40, { hint: '7 cộng 3 bằng 10, viết 0 nhớ 1. 1 cộng 2 bằng 3, thêm 1 bằng 4.' });
      await c.say('7 cộng 3 bằng 10, viết 0 nhớ 1. 1 cộng 2 bằng 3, thêm 1 bằng 4. Được 40 lít.', '17 l + 23 l = <b>40 l</b>');
    },
  ],
};

const b22 = {
  title: 'Bài 22: Phép trừ (có nhớ) số có hai chữ số cho số có một chữ số',
  setup: (board) => { const t = createSticks(board, { value: 32 }); t.lock(true); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      await intro(32, '-', 5)(c);
      await takeSticks(c, t, 0, 5);
      t.caption(`32 ${MINUS} 5 = <b>27</b>`);
      await c.say('Còn 2 bó và 7 que rời: 27. 32 trừ 5 bằng 27.', `12 − 5 = 7 · còn 2 bó<br>32 − 5 = <b>27</b>`);
    },
    async (c) => { await columnStep(c, '-', 32, 5); await c.say('Mượn 1 chục ở hàng chục, giống tháo 1 bó que.', 'Nhớ 1 = <b>tháo 1 bó</b>'); },
    async (c) => { await c.say('Em tự tính 52 trừ 8.', 'Em tự tính <b>52 − 8</b>'); await columnStep(c, '-', 52, 8, { intro: false }); },
    async (c) => {
      c.show('Cây mít có 32 quả, bà lấy xuống 5 quả. Còn lại?');
      await c.say('Cây mít có 32 quả. Bà lấy xuống 5 quả. Trên cây còn lại bao nhiêu quả?');
      await c.choose(nums([27, 37, 23]), 27, { hint: '2 không trừ được 5, lấy 12 trừ 5.' });
      await c.say('32 trừ 5 bằng 27. Trên cây còn lại 27 quả mít.', `32 − 5 = <b>27</b> (quả)`);
    },
  ],
};

const b23 = {
  title: 'Bài 23: Phép trừ (có nhớ) số có hai chữ số cho số có hai chữ số',
  setup: (board) => { const t = createSticks(board, { value: 45 }); t.lock(true); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      await intro(45, '-', 18)(c);
      await c.say('Lấy đi 18: 1 bó và 8 que rời.', 'Lấy đi <b>1 bó</b> và <b>8 que</b>');
      await takeSticks(c, t, 1, 8);
      t.caption(`45 ${MINUS} 18 = <b>27</b>`);
      await c.say('Còn 2 bó và 7 que: 27. 45 trừ 18 bằng 27.', `15 − 8 = 7 · 4 − 1 − 1 = 2 bó<br>45 − 18 = <b>27</b>`);
    },
    async (c) => { await columnStep(c, '-', 45, 18); },
    async (c) => { await c.say('Em tự tính 30 trừ 14.', 'Em tự tính <b>30 − 14</b>'); await columnStep(c, '-', 30, 14, { intro: false }); },
    async (c) => {
      c.show('Xe máy chở 70 kg, xe đạp chở ít hơn 55 kg. Xe đạp?');
      await c.say('Xe máy chở 70 ki-lô-gam hàng. Xe đạp chở ít hơn xe máy 55 ki-lô-gam. Xe đạp chở bao nhiêu ki-lô-gam hàng?');
      await c.choose(nums([15, 25, 125], ' kg'), 15, { hint: 'Ít hơn thì làm phép trừ: 70 trừ 55.' });
      await c.say('70 trừ 55 bằng 15. Xe đạp chở 15 ki-lô-gam hàng.', `70 kg − 55 kg = <b>15 kg</b>`);
    },
  ],
};

export const CARRY_EXPLORES = { b19, b20, b22, b23 };
export { sleep };
