/** Bài 31: Hình bình hành, hình thoi — 📌 Bảng ghim tứ giác. */

import { createQuad, classify } from '../quad.js';
import { BOX } from '../practice.js';
import { sleep } from '../../grade3Drills/kit.js';
import { sfx } from '../frame.js';

const PARA = [{ x: 7, y: 2 }, { x: 15, y: 2 }, { x: 12, y: 8 }, { x: 4, y: 8 }];
const RHOMB = [{ x: 10, y: 1 }, { x: 14, y: 4 }, { x: 10, y: 7 }, { x: 6, y: 4 }];

const B31 = {
  explore: {
    setup: (board) => { const t = createQuad(board, PARA, { movable: [], marks: false }); t.lock(true); return t; },
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('ABCD là hình bình hành. Xem các cạnh của nó.', 'Hình bình hành ABCD');
        t.marks(true);
        await c.say('Mũi tên đỏ: cạnh AB song song với cạnh DC, cạnh AD song song với cạnh BC.', 'AB // DC · AD // BC (mũi tên đỏ)');
        await c.say('Vạch xanh: AB bằng DC, AD bằng BC.', 'AB = DC · AD = BC (vạch xanh)');
        t.caption('Hình bình hành: hai cặp cạnh đối diện <b>song song</b> và <b>bằng nhau</b>');
        await c.say('Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.');
      },
      async (c) => {
        const t = c.t;
        t.set([{ x: 5, y: 2 }, { x: 13, y: 2 }, { x: 15, y: 8 }, { x: 3, y: 9 }]);
        t.movable([3]);
        t.lock(false);
        await c.say('Đỉnh D bị lệch. Kéo đỉnh D sang đinh khác để ABCD thành hình bình hành.', 'Kéo đỉnh <b>D</b> để được hình bình hành.');
        await c.until(t, () => ['hình bình hành', 'hình chữ nhật'].includes(t.kind()), {
          nudge: 'Cạnh DC phải song song và bằng cạnh AB: dài 8 ô, nằm ngang.',
          el: () => t.svg.querySelector('.g4q-move'),
        });
        t.lock(true);
        sfx.ding();
        await c.say('Đúng rồi! Cạnh DC giờ song song và bằng cạnh AB.');
      },
      async (c) => {
        const t = c.t;
        t.movable([]);
        t.set(RHOMB);
        t.caption('Hình thoi: hai cặp cạnh đối diện <b>song song</b>, bốn cạnh <b>bằng nhau</b>');
        await c.say('Đây là hình thoi. Hình thoi có hai cặp cạnh đối diện song song, và bốn cạnh đều bằng nhau.');
        await c.say('Mặt kim nam châm của la bàn, ô cửa xếp, có dạng hình thoi.');
      },
      async (c) => {
        const t = c.t;
        t.set([{ x: 4, y: 3 }, { x: 9, y: 3 }, { x: 12, y: 8 }, { x: 1, y: 7 }]);
        t.movable([2]);
        t.lock(false);
        await c.say('Cạnh AB dài 5 ô, cạnh AD cũng dài 5 ô. Kéo đỉnh C để ABCD thành hình thoi.', 'Kéo đỉnh <b>C</b> để được hình thoi.');
        await c.until(t, () => ['hình thoi', 'hình vuông'].includes(t.kind()), {
          nudge: 'Từ B, đi giống như từ A tới D: sang trái 3 ô, xuống 4 ô.',
          el: () => t.svg.querySelector('.g4q-move'),
        });
        t.lock(true);
        sfx.ding();
        await c.say('Tuyệt vời! Bốn cạnh bằng nhau, hai cặp cạnh đối diện song song: đó là hình thoi.');
      },
    ],
  },
  tasks: () => [taskName(), taskComplete('hình bình hành'), taskSide(), taskComplete('hình thoi'), taskName()],
};

// ── Thực hành ─────────────────────────────────────────────────────────────────────────────────────────
const SHAPES = {
  'hình bình hành': (r) => { const w = r.int(5, 8), h = r.int(3, 5), s = r.pick([2, 3, -2]); const x = 6, y = 2; return [{ x, y }, { x: x + w, y }, { x: x + w - s, y: y + h }, { x: x - s, y: y + h }]; },
  'hình thoi': (r) => { const [a, b] = r.pick([[4, 3], [3, 4], [3, 3], [4, 2]]); const x = 10, y = 1; return [{ x, y }, { x: x + a, y: y + b }, { x, y: y + 2 * b }, { x: x - a, y: y + b }]; },
  'tứ giác': (r) => { const x = 5, y = 2; return [{ x, y }, { x: x + r.int(6, 9), y: y + r.pick([0, 1]) }, { x: x + r.int(7, 10), y: y + 6 }, { x: x - r.int(0, 2), y: y + r.int(4, 6) }]; },
};

function taskName() {
  return {
    id: 'qname',
    make: (rng) => {
      const k = rng.pick(Object.keys(SHAPES));
      let P = SHAPES[k](rng);
      if (k === 'tứ giác') for (let i = 0; i < 10 && classify(P).kind !== 'tứ giác'; i++) P = SHAPES[k](rng);
      return { P };
    },
    async mount(f, { P }) {
      f.q.innerHTML = 'Hình ABCD là hình gì?';
      const t = createQuad(f.tool, P, { movable: [], marks: false, label: false });
      const k = classify(P).kind;
      await f.choose({ options: ['hình bình hành', 'hình thoi', 'tứ giác'].map(v => ({ html: v === 'tứ giác' ? 'Tứ giác khác' : v[0].toUpperCase() + v.slice(1), value: v })), answer: k,
        say: 'Hình ABCD là hình gì?', hint: 'Đếm ô: hai cặp cạnh đối diện có song song không? Bốn cạnh có bằng nhau không?' });
      t.marks(true); t.label(true);
      f.finish({ ok: k === 'tứ giác' ? 'Không có hai cặp cạnh song song: tứ giác.' : `ABCD là ${k}.` });
    },
  };
}

function taskComplete(kind) {
  return {
    id: `qdo-${kind}`,
    make: (rng) => {
      const P = SHAPES[kind](rng);
      const i = rng.int(0, 3);
      return { P, i, off: { x: rng.pick([-2, 2, 3]), y: rng.pick([-1, 1, 2]) } };
    },
    async mount(f, { P, i, off }) {
      const start = P.map((p, k) => (k === i ? { x: p.x + off.x, y: p.y + off.y } : p));
      const n = 'ABCD'[i];
      f.q.innerHTML = `Kéo đỉnh <b>${n}</b> để ABCD thành <b>${kind}</b>`;
      const t = createQuad(f.tool, start, { movable: [i], marks: true, label: false });
      f.say(`Kéo đỉnh ${n} để được ${kind}, rồi bấm Xong.`, `Kéo đỉnh <b>${n}</b> rồi bấm <b>Xong</b>.`);
      f.choicesBox.innerHTML = '<button type="button" class="g4-choice g4-choice-go">✓ Xong</button>';
      f.choicesBox.classList.add('g4-choices-on');
      const btn = f.choicesBox.firstElementChild;
      const good = kind === 'hình thoi' ? ['hình thoi', 'hình vuông'] : ['hình bình hành', 'hình chữ nhật', 'hình thoi', 'hình vuông'];
      if (import.meta.env.DEV) window.__g4solve = () => { t.set(P); btn.click(); };
      await new Promise((res) => {
        let wrong = 0;
        btn.onclick = () => {
          sfx.tap();
          if (good.includes(t.kind())) { btn.disabled = true; btn.classList.add('g4-choice-ok'); res(); return; }
          if (!wrong++) f.mistakes++;
          f.hint(kind === 'hình thoi' ? 'Hình thoi: bốn cạnh bằng nhau, cạnh đối diện song song. Đếm ô theo chiều ngang và chiều dọc.' : 'Cạnh đối diện phải song song và dài bằng nhau.');
        };
      });
      t.lock(true); t.label(true);
      f.finish({ ok: `Em đã tạo được ${t.kind()}.` });
    },
  };
}

/** Độ dài cạnh của hình bình hành / hình thoi. */
function taskSide() {
  return {
    id: 'qside',
    make: (rng) => ({ rh: rng() < 0.5, a: rng.int(3, 9), b: rng.int(2, 7), ask: rng.int(0, 1) }),
    async mount(f, { rh, a, b, ask }) {
      const t = createQuad(f.tool, rh ? RHOMB : PARA, { movable: [], marks: true, label: false });
      t.lock(true);
      if (rh) {
        const q = ['BC', 'CD', 'DA'][ask];
        f.q.innerHTML = `Hình thoi ABCD có AB = ${a} cm. ${q} = ${BOX} cm`;
        await f.ask({ box: f.q.querySelector('.g4-box'), answer: a, max: 2, say: `Hình thoi có cạnh AB bằng ${a} xăng-ti-mét. Cạnh ${q} dài bao nhiêu?`, hint: 'Hình thoi có bốn cạnh bằng nhau.' });
      } else {
        const [q, ans] = ask ? ['DC', a] : ['BC', b];
        f.q.innerHTML = `Hình bình hành ABCD có AB = ${a} cm, AD = ${b} cm. ${q} = ${BOX} cm`;
        await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: 2, say: `Cạnh ${q} dài bao nhiêu xăng-ti-mét?`, hint: `Cạnh ${q} nằm đối diện với cạnh ${q === 'DC' ? 'AB' : 'AD'}, hai cạnh này bằng nhau.` });
      }
      t.label(true);
      f.finish({ ok: rh ? 'Bốn cạnh hình thoi bằng nhau.' : 'Cạnh đối diện của hình bình hành bằng nhau.' });
    },
  };
}

export const SHAPE_LESSONS = { 31: B31 };
export { sleep };
