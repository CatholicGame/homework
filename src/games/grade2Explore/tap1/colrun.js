/** ✍️ Đặt tính rồi tính từng bước trên colview của Toán 4 (grade4Tools/colview.js), lời đọc như SGK Toán 2. */

import { createColumn } from '../../grade4Tools/colview.js';
import { sleep } from './stage.js';

export const SIGN = { '+': '+', '-': '−' };
const NAME = { '+': 'cộng', '-': 'trừ' };
const PLACE = ['đơn vị', 'chục', 'trăm'];

export const useColumn = (c, op, a, b) => c.use((board) => createColumn(board, op, a, b));

/**
 * Chạy các bước của phép tính trên tờ giấy: `demo` bước chữ số đầu thầy làm, các bước sau em chọn chữ số đúng
 * (3 nút: đúng, quên nhớ / nhầm, chữ số khác).
 */
export async function runColumn(c, t, { demo = 0 } = {}) {
  let k = 0;
  for (const s of t.steps) {
    if (s.kind === 'carry') { await t.carry(s); continue; }
    t.glow(s.i);
    if (k < demo) {
      await c.say(s.say);
      t.write(s);
    } else {
      const right = s.write, n = +right;
      const opts = new Set([right]);
      for (const w of [n + 1, n - 1, n + 2, (n + 5) % 10]) if (opts.size < 3 && w >= 0 && String(w) !== right) opts.add(String(w));
      c.show(`Hàng <b>${PLACE[s.i]}</b>: viết ${right.length > 1 ? 'số' : 'chữ số'} nào?`);
      await c.choose([...opts].sort((x, y) => x - y).map((x) => ({ html: x, value: x })), right,
        { hint: s.i > 0 ? 'Nhớ cộng thêm số nhớ (nếu có) ở hàng này.' : 'Tính hàng đơn vị trước: hai chữ số ở cột bên phải.' });
      t.write(s);
      await c.say(s.say);
    }
    k++;
  }
  t.glow(null);
  await sleep(200);
}

/** Một bước Khám phá: đặt tính a op b, thầy giới thiệu, em làm, chốt kết quả. */
export async function columnStep(c, op, a, b, { demo = 0, intro = true } = {}) {
  const t = useColumn(c, op, a, b);
  if (intro) {
    await c.say(`Đặt tính ${a} ${NAME[op]} ${b}: viết ${a} ở trên, ${b} ở dưới sao cho đơn vị thẳng cột với đơn vị, chục thẳng cột với chục. Viết dấu ${op === '+' ? 'cộng' : 'trừ'}, kẻ vạch ngang.`,
      `Đặt tính <b>${a} ${SIGN[op]} ${b}</b>: đơn vị thẳng đơn vị, chục thẳng chục`);
    await c.say('Tính từ phải sang trái, bắt đầu từ hàng đơn vị.', 'Tính từ <b>phải sang trái</b>');
  }
  await runColumn(c, t, { demo });
  await c.say(`Vậy ${a} ${NAME[op]} ${b} bằng ${t.result}.`, `${a} ${SIGN[op]} ${b} = <b>${t.result}</b>`);
  return t;
}
