/**
 * Đồ dùng chung cho Khám phá Toán 3 Tập Hai (tap2/*.js): đọc số bằng chữ, lập số trên bảng hàng, bi lăn làm tròn,
 * đặt tính từng bước (thầy làm mẫu, em chọn chữ số), câu chọn nhanh.
 */

import { sleep } from '../../grade3Drills/kit.js';
import { sfx } from '../../grade4Tools/frame.js';
import { readVN, fmt, PLACE, digitsOf } from '../../grade4Tools/num.js';

export { sleep, sfx, fmt, PLACE };

/** Số đọc bằng chữ cho giọng nói (từ 1 000 trở lên máy đọc chữ số dễ sai). */
export const R = (n) => (n >= 1000 ? readVN(n) : String(n));

/** Em lập số target trên bảng hàng (createPlace); cột thừa thẻ thì nhắc ngay. */
export async function buildOnBoard(c, t, target, { say, shown } = {}) {
  t.lock(false); t.only(null);
  const ds = digitsOf(target, t.cols);
  const wrongCol = () => {
    for (let p = t.cols - 1; p >= 0; p--) if (t.counts[p] !== (ds[p] || 0)) return p;
    return -1;
  };
  if (say) await c.say(say, shown);
  let warned = -1;
  const off = t.on(() => {
    const over = [...Array(t.cols).keys()].reverse().find(p => t.counts[p] > (ds[p] || 0));
    if (over != null && over !== warned) {
      warned = over;
      c.hint(`Hàng ${PLACE[over]} chỉ cần ${ds[over] || 0} thẻ. Bấm vào thẻ trong cột để bớt ra.`);
    }
    t.glow(over != null ? over : null);
  });
  await c.until(t, () => t.value === target, {
    nudge: () => { const p = wrongCol(); return p < 0 ? '' : `Hàng ${PLACE[p]} cần ${ds[p] || 0} thẻ.`; },
    el: () => { const p = wrongCol(); return p < 0 ? null : t.src(p); },
  });
  off();
  t.glow(null);
  t.lock(true);
  sfx.ding();
}

/** Bi lăn trên tia số (createLine) về mốc gần hơn giữa lo và hi. Trả về mốc. */
export async function rollBall(t, n, lo, hi) {
  t.ball(n);
  await sleep(300);
  const dir = n - lo < hi - n ? -1 : 1;
  await t.tilt(dir);
  await t.roll(dir < 0 ? lo : hi);
  return dir < 0 ? lo : hi;
}

/** Em bấm vào một lá cờ (mốc want hoặc other) trên tia số; bấm nhầm thì nhắc hint. */
export async function tapFlag(c, t, want, other, { hint, nudge = 'Bấm vào một trong hai lá cờ.' }) {
  const tol = Math.abs(want - other) * 0.18;
  let ok = false;
  const off = t.on((ev, v) => {
    if (ev !== 'tap') return;
    if (Math.abs(v - want) <= tol) ok = true;
    else if (Math.abs(v - other) <= tol) c.hint(hint);
  });
  await c.until(t, () => ok, { nudge });
  off();
}

const SIGN = { '+': '+', '-': '−', '*': '×' };
export const signOf = (op) => SIGN[op];

/** Đặt tính (createColumn): thầy làm `demo` chữ số đầu, các chữ số sau em chọn (3 nút). */
export async function runColumn(c, t, { demo = 2 } = {}) {
  let digitNo = 0;
  for (const s of t.steps) {
    if (s.kind === 'carry') { await t.carry(s); continue; }
    t.glow(s.i);
    if (digitNo < demo) {
      await c.say(s.say);
      t.write(s);
    } else {
      const right = s.write;
      const opts = new Set([right]);
      const n = +right;
      for (const w of [n + 1, n - 1, n + 10, (n + 5) % 10, n + 2]) if (opts.size < 3 && w >= 0 && String(w) !== right) opts.add(String(w));
      c.show(`<b>Hàng ${PLACE[s.i]}</b>: viết ${right.length > 1 ? 'số' : 'chữ số'} nào?`);
      await c.choose([...opts].sort((a, b) => a - b).map(x => ({ html: x, value: x })), right, { hint: 'Nhớ cộng thêm số nhớ (nếu có) ở cột này.' });
      t.write(s);
      await c.say(s.say);
    }
    digitNo++;
  }
  t.glow(null);
}

/** Câu chọn có giọng: hỏi, chờ chọn đúng, khen. */
export async function ask(c, { say, shown, options, answer, hint, ok, okShown }) {
  await c.say(say, shown);
  const first = await c.choose(options.map(o => (typeof o === 'object' ? o : { html: String(o), value: o })), answer, { hint });
  if (ok) await c.say(`${first ? 'Đúng rồi! ' : ''}${ok}`, okShown);
  return first;
}

/** Ba lựa chọn số (đúng + hai số gần) đã xếp tăng dần, hiện có dấu cách hàng nghìn. */
export function numOptions(right, wrongs, unit = '') {
  return [right, ...wrongs].sort((a, b) => a - b).map(v => ({ html: `${fmt(v)}${unit ? ` ${unit}` : ''}`, value: v }));
}
