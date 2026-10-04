/**
 * Bài 2 (Ôn tập phép tính trong phạm vi 100 000), Bài 22 (Phép cộng), Bài 23 (Phép trừ các số có nhiều chữ số).
 * Khám phá: ✍️ đặt tính từng bước (thầy làm mẫu vài cột, em chọn chữ số các cột sau).
 * Thực hành: dùng lại đặt tính của Luyện Tính lớp 3 (grade3Drills/column.js) với số nhiều chữ số.
 */

import { createColumn } from '../colview.js';
import { COLUMN_GAME, columnSteps } from '../../grade3Drills/column.js';
import { BOX } from '../practice.js';
import { sleep } from '../../grade3Drills/kit.js';
import { fmt, PLACE } from '../num.js';

const NAME = { '+': 'cộng', '-': 'trừ', '*': 'nhân' };

/** Chạy các bước đặt tính: thầy làm `demo` bước chữ số đầu, sau đó em chọn chữ số (3 nút). */
async function runColumn(c, t, { demo = 99 } = {}) {
  let digitNo = 0;
  for (const s of t.steps) {
    if (s.kind === 'carry') { await t.carry(s); continue; }
    t.glow(s.i);
    if (digitNo < demo) {
      await c.say(s.say);
      t.write(s);
    } else {
      // Em chọn: đáp án đúng, số quên nhớ / nhầm, và chữ số khác.
      const right = s.write;
      const opts = new Set([right]);
      const n = +right;
      for (const w of [n + 1, n - 1, n + 10, (n + 5) % 10, n + 2]) if (opts.size < 3 && w >= 0 && String(w) !== right) opts.add(String(w));
      c.show(`<b>Hàng ${PLACE[s.i]}</b>: viết ${right.length > 1 ? 'số' : 'chữ số'} nào?`);
      await c.choose([...opts].sort().map(x => ({ html: x, value: x })), right, { hint: 'Nhớ cộng thêm số nhớ (nếu có) ở cột này.' });
      t.write(s);
      await c.say(s.say);
    }
    digitNo++;
  }
  t.glow(null);
}

const explore = (op, a, b, intro) => ({
  setup: (board) => createColumn(board, op, a, b),
  steps: [
    async (c) => {
      await c.say(intro, `Đặt tính: <b>${fmt(a)} ${op === '-' ? '−' : op === '*' ? '×' : '+'} ${fmt(b)}</b>`);
      await c.say('Viết các chữ số cùng hàng thẳng cột với nhau: đơn vị dưới đơn vị, chục dưới chục. Tính từ phải sang trái, bắt đầu từ hàng đơn vị.', 'Thẳng cột · tính từ <b>hàng đơn vị</b>, phải sang trái');
    },
    async (c) => { await runColumn(c, c.t, { demo: 3 }); },
    async (c) => {
      await c.say(`Vậy ${fmt(a)} ${NAME[op]} ${fmt(b)} bằng ${fmt(c.t.result)}.`, `${fmt(a)} ${op === '-' ? '−' : op === '*' ? '×' : '+'} ${fmt(b)} = <b>${fmt(c.t.result)}</b>`);
      if (op === '+') await c.say('Thử lại: lấy tổng trừ đi một số hạng, được số hạng kia.');
      if (op === '-') await c.say('Thử lại: lấy hiệu cộng với số trừ, được số bị trừ.');
    },
  ],
});

/** Đặt tính ở Thực hành: giao cả màn cho đặt tính của Luyện Tính lớp 3. */
function taskColumn(id, gen) {
  return {
    id,
    make: (rng) => gen(rng),
    stage(stage, m, api) { COLUMN_GAME.mountMission(stage, m, null, api); },
  };
}
const carries = (op, a, b) => columnSteps(op, a, b).filter(s => s.kind === 'carry').length;
const addGen = (lo, hi, max) => (rng) => { for (;;) { const a = rng.int(lo, hi), b = rng.int(Math.floor(lo / 2), max - a); if (b > 9 && carries('+', a, b) >= 2) return { op: '+', a, b }; } };
const subGen = (lo, hi) => (rng) => { for (;;) { const a = rng.int(lo, hi), b = rng.int(Math.floor(a / 4), a - Math.floor(a / 6)); if (carries('-', a, b) >= 2 && String(a - b).length >= String(a).length - 1) return { op: '-', a, b }; } };
const mulGen = (rng) => { for (;;) { const b = rng.int(2, 9), a = rng.int(10123, Math.floor(99999 / b)); if (carries('*', a, b) >= 2) return { op: '*', a, b }; } };

/** Tính nhẩm số tròn nghìn, chục nghìn. */
function taskMental() {
  return {
    id: 'mental',
    make: (rng) => {
      const u = rng.pick([1000, 10000, 100000]);
      const op = rng.pick(['+', '-']);
      const x = rng.int(2, 60), y = rng.int(2, 40);
      return op === '+' ? { u, op, a: x * u, b: y * u } : { u, op, a: (x + y) * u, b: y * u };
    },
    async mount(f, { u, op, a, b }) {
      const r = op === '+' ? a + b : a - b;
      const name = u === 1000 ? 'nghìn' : u === 10000 ? 'chục nghìn' : 'trăm nghìn';
      f.q.innerHTML = `Tính nhẩm: <b>${fmt(a)} ${op === '-' ? '−' : '+'} ${fmt(b)} = ${BOX}</b>`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: r, max: 8, say: 'Tính nhẩm.',
        hint: `Nhẩm theo ${name}: ${a / u} ${name} ${op === '-' ? 'trừ' : 'cộng'} ${b / u} ${name} bằng ${r / u} ${name}.` });
      f.finish({ ok: `${a / u} ${name} ${op === '-' ? '−' : '+'} ${b / u} ${name} = ${r / u} ${name}` });
    },
  };
}

const B2 = {
  explore: explore('+', 36058, 47295, `Đặt tính rồi tính ${fmt(36058)} cộng ${fmt(47295)}.`),
  tasks: () => [taskColumn('c2add', addGen(10000, 69999, 99999)), taskColumn('c2sub', subGen(20000, 99999)), taskColumn('c2mul', mulGen), taskMental()],
};
const B22 = {
  explore: explore('+', 427358, 285916, 'Cộng hai số có sáu chữ số, làm giống như cộng các số đã học.'),
  tasks: () => [taskColumn('c22a', addGen(100000, 699999, 999999)), taskColumn('c22b', addGen(1000000, 5999999, 9999999)), taskMental(), taskColumn('c22c', addGen(10000, 89999, 999999))],
};
const B23 = {
  explore: explore('-', 725314, 368152, 'Trừ hai số có sáu chữ số. Cột nào không trừ được thì lấy thêm 1 chục, rồi nhớ 1 sang cột bên trái.'),
  tasks: () => [taskColumn('c23a', subGen(200000, 999999)), taskColumn('c23b', subGen(2000000, 9999999)), taskMental(), taskColumn('c23c', subGen(100000, 999999))],
};

export const CALC_LESSONS = { 2: B2, 22: B22, 23: B23 };
export { sleep };
