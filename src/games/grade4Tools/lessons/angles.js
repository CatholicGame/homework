/** Bài 7 (Đo góc, đơn vị đo góc), Bài 8 (Góc nhọn, góc tù, góc bẹt): 📐 Thước đo góc, quạt góc, đồng hồ. */

import { createAngle, createClockAngle, KIND, KIND_INK } from '../angle.js';
import { BOX } from '../practice.js';
import { sleep } from '../../grade3Drills/kit.js';
import { sfx } from '../frame.js';

const O = { x: 330, y: 450 };
const PARK = { x: 722, y: 560, rot: 350 }; // chỗ để thước lúc đầu: trọn trong khung 1000 (màn dọc khung không giãn ngang)
const KINDS = ['nhọn', 'vuông', 'tù', 'bẹt'];
const kindBtn = (k) => ({ html: `<span style="color:${KIND_INK[k]}">Góc ${k}</span>`, value: k });

/** Chờ em đặt thước khớp với góc (tâm ở O, vạch 0 trên một cạnh). */
async function alignByChild(c, t) {
  t.lock(false);
  await c.until(t, () => t.isAligned(), {
    nudge: () => (!t.state.onO ? 'Kéo thân thước để tâm thước (chấm đỏ) trùng đỉnh O.' : 'Kéo núm vàng để xoay thước, cho vạch 0 nằm trên một cạnh của góc.'),
    el: () => t.svg.querySelector(t.state.onO ? '.g4a-knob' : '.g4a-prot'),
  });
  sfx.ding();
  t.lock(true);
}

// ── Bài 7 ─────────────────────────────────────────────────────────────────────────────────────────────
const B7 = {
  explore: {
    setup: (board) => {
      const t = createAngle(board, { o: O, a: 0, b: 60 });
      t.set({ px: PARK.x, py: PARK.y, rot: PARK.rot });
      t.lock(true);
      return t;
    },
    steps: [
      async (c) => {
        const t = c.t;
        t.caption('Góc đỉnh O, cạnh OA, OB');
        await c.say('Đây là góc đỉnh O, cạnh OA, OB. Muốn biết góc rộng bao nhiêu, ta dùng thước đo góc.');
        t.caption('Đơn vị đo góc: <b>độ</b>, viết là <b>°</b>');
        await c.say('Đơn vị đo góc là độ, viết là một vòng tròn nhỏ. Thước chia nửa vòng tròn thành 180 phần bằng nhau, mỗi phần là 1 độ.');
      },
      async (c) => {
        const t = c.t;
        t.caption('Bước 1: đặt <b>tâm thước</b> trùng đỉnh O');
        await c.say('Bước một: đặt tâm thước, là chấm đỏ, trùng với đỉnh O.');
        await t.moveProt(O.x, O.y, PARK.rot, 1100);
        t.caption('Bước 2: xoay thước cho <b>vạch 0</b> nằm trên cạnh OA');
        await c.say('Bước hai: xoay thước cho vạch số 0 nằm trên cạnh OA.');
        await t.moveProt(O.x, O.y, 0, 900);
        t.caption('Bước 3: cạnh OB đi qua vạch <b>60</b>');
        await c.say('Bước ba: xem cạnh OB đi qua vạch số mấy. Đọc ở vòng số có số 0 nằm trên cạnh OA, là vòng màu xanh. Cạnh OB đi qua vạch 60.');
        t.caption('Góc đỉnh O, cạnh OA, OB bằng <b>60°</b>');
        await c.say('Vậy góc đỉnh O, cạnh OA, OB bằng 60 độ.');
      },
      async (c) => {
        const t = c.t;
        t.set({ a: 180, b: 50, names: ['M', 'O', 'N'], px: PARK.x, py: PARK.y, rot: 20 });
        t.showReadout(false);
        t.caption('Đo góc đỉnh O, cạnh OM, ON');
        await c.say('Đến lượt em. Kéo thước cho tâm thước trùng đỉnh O, rồi kéo núm vàng để xoay thước cho vạch 0 nằm trên cạnh OM.', 'Kéo thước vào đỉnh O. Kéo <b>núm vàng</b> để xoay.');
        await alignByChild(c, t);
        t.caption('Cạnh ON đi qua vạch số mấy?');
        await c.say('Lần này số 0 nằm ở bên trái. Đọc vòng số có số 0 nằm trên cạnh OM. Góc này bằng bao nhiêu độ?', 'Số 0 ở bên trái: đọc <b>vòng ngoài</b>. Góc bằng bao nhiêu?');
        await c.choose(['50°', '130°'], '130°', { hint: '50 là số ở vòng kia. Đọc vòng có số 0 nằm trên cạnh OM.' });
        t.showReadout(true);
        t.caption('Góc đỉnh O, cạnh OM, ON bằng <b>130°</b>');
        await c.say('Đúng rồi! Góc này bằng 130 độ. Nhớ đọc vòng số có số 0 nằm trên cạnh của góc.');
      },
      async (c) => {
        const t = c.t;
        t.set({ a: 30, b: 120, names: ['P', 'O', 'Q'], px: PARK.x, py: PARK.y, rot: 0 });
        t.showReadout(false);
        t.caption('Đo góc đỉnh O, cạnh OP, OQ');
        await c.say('Góc này nghiêng. Em phải xoay thước cho vạch 0 nằm đúng trên cạnh OP.', 'Đặt thước, <b>xoay</b> cho vạch 0 nằm trên cạnh OP.');
        await alignByChild(c, t);
        await c.say('Góc này bằng bao nhiêu độ?');
        await c.choose(['80°', '90°', '100°'], '90°', { hint: 'Nhìn kĩ vạch mà cạnh OQ đi qua.' });
        t.showReadout(true);
        t.caption('<b>90°</b>: góc vuông');
        await c.say('Góc này bằng 90 độ. Góc vuông có số đo là 90 độ.');
      },
    ],
  },
  tasks: () => [taskMeasure(), taskMeasure({ left: true }), taskDraw(), taskMeasure({ tilt: true }), taskClassify()],
};

// ── Bài 8 ─────────────────────────────────────────────────────────────────────────────────────────────
const fanCaption = (t) => { const m = Math.round(t.measure()); const k = KIND(m); t.caption(`<span style="color:${KIND_INK[k]}">Góc ${k}</span> · ${m}°`); };

const B8 = {
  explore: {
    setup: (board) => {
      const t = createAngle(board, { o: { x: 500, y: 450 }, a: 0, b: 40, fan: true, shade: true, protractor: false });
      t.lock(true);
      t.on(() => fanCaption(t));
      fanCaption(t);
      return t;
    },
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Góc này bé hơn góc vuông. Đó là góc nhọn.', 'Góc <b>nhọn</b>: bé hơn góc vuông');
        await t.openTo(90, 1200);
        await c.say('Mở rộng ra đúng 90 độ thì được góc vuông.', 'Góc <b>vuông</b>: 90°');
        await t.openTo(130, 1000);
        await c.say('Mở rộng hơn góc vuông thì được góc tù. Góc tù lớn hơn góc vuông, bé hơn góc bẹt.', 'Góc <b>tù</b>: lớn hơn góc vuông, bé hơn góc bẹt');
        await t.openTo(180, 1000);
        await c.say('Mở tới khi hai cạnh thẳng hàng thì được góc bẹt. Góc bẹt bằng hai góc vuông, là 180 độ.', 'Góc <b>bẹt</b>: hai cạnh thẳng hàng, 180°');
      },
      async (c) => {
        const t = c.t;
        await t.openTo(30, 700);
        t.lock(false);
        for (const k of ['tù', 'vuông', 'nhọn']) {
          await c.say(`Kéo chấm xanh để mở thành góc ${k}.`, `Kéo chấm xanh: mở thành <b>góc ${k}</b>`);
          await c.until(t, () => t.kind() === k, { nudge: k === 'vuông' ? 'Góc vuông: hai cạnh thẳng đứng và nằm ngang.' : 'Kéo chấm xanh xoay quanh đỉnh O.', el: () => t.svg.querySelector('.g4a-handle') });
          sfx.ding();
          await sleep(500);
        }
        t.lock(true);
        await c.say('Giỏi lắm! Em đã mở được cả ba loại góc.');
      },
      async (c) => {
        const t = c.use((b) => createClockAngle(b, 3));
        t.caption('3 giờ: <b style="color:#15803D">góc vuông</b>');
        await c.say('Hai kim đồng hồ cũng tạo thành góc. Lúc 3 giờ, kim giờ và kim phút tạo thành góc vuông.');
        for (const [h, k] of [[4, 'tù'], [2, 'nhọn'], [6, 'bẹt']]) {
          t.set(h, { shade: false });
          t.caption(`${h} giờ: góc gì?`);
          await c.say(`Lúc ${h} giờ, hai kim tạo thành góc gì?`);
          await c.choose(KINDS.map(kindBtn), k, { hint: 'So với góc vuông lúc 3 giờ: rộng hơn hay hẹp hơn?' });
          t.set(h);
          t.caption(`${h} giờ: <b style="color:${KIND_INK[k]}">góc ${k}</b>`);
          await sleep(900);
        }
        await c.say('Đúng rồi! Lúc 6 giờ, hai kim thẳng hàng, tạo thành góc bẹt.');
      },
    ],
  },
  tasks: () => [taskClassify(), taskClock(), taskFan(), taskClassify(), taskClock()],
};

// ── Thực hành ─────────────────────────────────────────────────────────────────────────────────────────

/** Đo góc: đặt thước rồi gõ số đo. left: cạnh thứ nhất hướng sang trái (đọc vòng ngoài); tilt: góc nghiêng. */
function taskMeasure({ left = false, tilt = false } = {}) {
  return {
    id: `measure${left ? 'L' : ''}${tilt ? 'T' : ''}`,
    make: (rng) => {
      const m = rng.int(2, 16) * 10 + (rng() < 0.3 ? 5 : 0);
      const a = left ? 180 : tilt ? rng.pick([15, 20, 30, 40]) : 0;
      const b = left ? 180 - m : a + m;
      return { m: Math.min(m, 170), a, b: left ? 180 - Math.min(m, 170) : a + Math.min(m, 170) };
    },
    async mount(f, { m, a, b }) {
      f.q.innerHTML = `Góc đỉnh O, cạnh OA, OB bằng ${BOX}°`;
      const t = createAngle(f.tool, { o: O, a, b });
      t.set({ px: PARK.x, py: PARK.y, rot: PARK.rot });
      t.showReadout(false);
      f.say('Đặt thước đo góc rồi gõ số đo của góc.', 'Đặt thước, đọc số đo rồi gõ vào.');
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: m, max: 3,
        hint: (v) => (!t.isAligned() ? 'Đặt tâm thước trùng đỉnh O, xoay cho vạch 0 nằm trên cạnh OA.'
          : v === 180 - m ? 'Em đọc nhầm vòng số. Đọc vòng có số 0 nằm trên cạnh OA.' : 'Nhìn kĩ vạch mà cạnh OB đi qua.') });
      if (!t.isAligned()) await t.moveProt(O.x, O.y, left ? 0 : a, 700);
      t.showReadout(true);
      f.finish({ ok: `Góc bằng ${m}°.`, tip: 'Đọc vòng số có số 0 nằm trên một cạnh của góc.' });
    },
  };
}

/** Vẽ góc theo số đo: thước đã đặt sẵn, kéo cạnh OB tới số đo cho trước. */
function taskDraw() {
  return {
    id: 'draw',
    make: (rng) => ({ m: rng.int(2, 16) * 10 }),
    async mount(f, { m }) {
      f.q.innerHTML = `Kéo cạnh OB để được góc <b>${m}°</b>`;
      const t = createAngle(f.tool, { o: O, a: 0, b: m > 90 ? 30 : 150, fan: true });
      t.set({ px: O.x, py: O.y, rot: 0 });
      t.showReadout(false);
      f.say(`Kéo chấm xanh để được góc ${m} độ, rồi bấm Xong.`, `Kéo chấm xanh tới vạch <b>${m}</b> rồi bấm <b>Xong</b>.`);
      f.choicesBox.innerHTML = '<button type="button" class="g4-choice g4-choice-go">✓ Xong</button>';
      f.choicesBox.classList.add('g4-choices-on');
      const btn = f.choicesBox.firstElementChild;
      if (import.meta.env.DEV) window.__g4solve = () => { t.set({ b: m }); btn.click(); };
      await new Promise((res) => {
        let wrong = 0;
        btn.onclick = () => {
          sfx.tap();
          const v = Math.round(t.measure());
          if (Math.abs(v - m) <= 1) { btn.disabled = true; btn.classList.add('g4-choice-ok'); res(); return; }
          if (!wrong++) f.mistakes++;
          f.hint(v === 180 - m ? 'Em đang đọc nhầm vòng số ngoài. Đọc vòng trong, có số 0 ở cạnh OA.' : `Góc đang là ${v} độ. Kéo tiếp tới vạch ${m}.`, `Góc đang là <b>${v}°</b>. Kéo tới vạch <b>${m}</b>.`);
        };
      });
      t.showReadout(true);
      t.lock(true);
      f.finish({ ok: `Em vẽ đúng góc ${m}°.` });
    },
  };
}

/** Nhận biết góc nhọn / vuông / tù / bẹt. */
function taskClassify() {
  return {
    id: 'classify',
    make: (rng) => {
      const k = rng.pick(KINDS);
      const m = k === 'nhọn' ? rng.int(2, 7) * 10 : k === 'vuông' ? 90 : k === 'tù' ? rng.int(11, 16) * 10 : 180;
      return { m, a: rng.pick([0, 10, 20, 340, 350, 30]) };
    },
    async mount(f, { m, a }) {
      f.q.innerHTML = 'Đây là góc gì?';
      const t = createAngle(f.tool, { o: { x: 500, y: 430 }, a, b: a + m, protractor: false });
      await f.choose({ options: KINDS.map(kindBtn), answer: KIND(m), say: 'Đây là góc gì?', hint: 'So với góc vuông: bé hơn là góc nhọn, lớn hơn là góc tù, hai cạnh thẳng hàng là góc bẹt.' });
      t.set({ shade: true });
      f.finish({ ok: `Góc ${KIND(m)}.` });
    },
  };
}

/** Góc tạo bởi hai kim đồng hồ lúc h giờ. */
function taskClock() {
  return {
    id: 'clock',
    make: (rng) => ({ h: rng.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) }),
    async mount(f, { h }) {
      f.q.innerHTML = `Lúc <b>${h} giờ</b>, hai kim tạo thành góc gì?`;
      const t = createClockAngle(f.tool, h);
      const k = t.set(h, { shade: false });
      f.choicesBox.classList.add('g4-choices-on');
      await f.choose({ options: KINDS.map(kindBtn), answer: k, say: `Lúc ${h} giờ, hai kim đồng hồ tạo thành góc gì?`, hint: 'Lúc 3 giờ và 9 giờ là góc vuông. So xem rộng hơn hay hẹp hơn.' });
      t.set(h);
      f.finish({ ok: `Lúc ${h} giờ: góc ${k}.` });
    },
  };
}

/** Mở quạt góc thành loại góc cho trước. */
function taskFan() {
  return {
    id: 'fan',
    make: (rng) => ({ k: rng.pick(['nhọn', 'tù', 'vuông', 'bẹt']) }),
    async mount(f, { k }) {
      f.q.innerHTML = `Kéo chấm xanh để được <b style="color:${KIND_INK[k]}">góc ${k}</b>`;
      const t = createAngle(f.tool, { o: { x: 500, y: 450 }, a: 0, b: k === 'nhọn' ? 120 : 30, fan: true, protractor: false });
      f.say(`Mở thành góc ${k} rồi bấm Xong.`, `Mở thành <b>góc ${k}</b> rồi bấm <b>Xong</b>.`);
      f.choicesBox.innerHTML = '<button type="button" class="g4-choice g4-choice-go">✓ Xong</button>';
      f.choicesBox.classList.add('g4-choices-on');
      const btn = f.choicesBox.firstElementChild;
      if (import.meta.env.DEV) window.__g4solve = () => { t.set({ b: { 'nhọn': 40, 'vuông': 90, 'tù': 130, 'bẹt': 180 }[k] }); btn.click(); };
      await new Promise((res) => {
        let wrong = 0;
        btn.onclick = () => {
          sfx.tap();
          if (t.kind() === k) { btn.disabled = true; btn.classList.add('g4-choice-ok'); res(); return; }
          if (!wrong++) f.mistakes++;
          f.hint(`Đây đang là góc ${t.kind()}. Kéo tiếp để được góc ${k}.`);
        };
      });
      t.set({ shade: true });
      t.lock(true);
      f.finish({ ok: `Góc ${k}.` });
    },
  };
}

export const ANGLE_LESSONS = { 7: B7, 8: B8 };
