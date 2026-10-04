/**
 * Bài về số (Bài 1, 10, 11, 12, 13, 14, 15): Khám phá trên 🧱 Bảng hàng và 📏 Tia số, cùng các dạng câu Thực hành.
 * Giọng đọc luôn đọc số bằng chữ (readVN) — đọc chữ số "36 515" thì máy đọc sai; bong bóng hiện chữ số.
 */

import { createPlace, createCompare, numHtml } from '../place.js';
import { createLine } from '../line.js';
import { BOX } from '../practice.js';
import { sleep } from '../../grade3Drills/kit.js';
import { sfx } from '../frame.js';
import { fmt, readVN, capFirst, PLACE, CLASS, classOf, digitsOf, expand, roundTo, CLASS_INK } from '../num.js';

const R = readVN;

// ── Sinh số ───────────────────────────────────────────────────────────────────────────────────────────
/** Số có đúng `len` chữ số; zeros: xác suất mỗi chữ số (trừ chữ số đầu) là 0. */
export function randNum(rng, len, { zeros = 0.2 } = {}) {
  let s = String(rng.int(1, 9));
  for (let i = 1; i < len; i++) s += rng() < zeros ? '0' : String(rng.int(0, 9));
  return +s;
}
const lenOf = (n) => String(n).length;

/** Số có chữ số gạch chân ở hàng p (chữ số đó khác 0). */
function underlined(n, p) {
  const s = String(n), i = s.length - 1 - p;
  const html = numHtml(+s, { cls: false });
  // numHtml tách lớp bằng span; gạch chân đúng chữ số thứ i (đếm bỏ qua khoảng cách)
  let k = -1;
  return html.replace(/\d/g, (d) => (++k === i ? `<span class="g4-u">${d}</span>` : d));
}

/** Hai cách đọc sai gần đúng (đổi chỗ hai chữ số / đổi một chữ số). */
function readingOptions(rng, n) {
  const s = String(n);
  const wrong = new Set();
  for (let k = 0; k < 30 && wrong.size < 2; k++) {
    const a = s.split('');
    if (rng() < 0.5 && a.length > 2) {
      const i = rng.int(1, a.length - 2);
      [a[i], a[i + 1]] = [a[i + 1], a[i]];
    } else {
      const i = rng.int(1, a.length - 1);
      a[i] = String((+a[i] + rng.pick([1, 9, 2])) % 10);
    }
    const m = +a.join('');
    if (m !== n && lenOf(m) === lenOf(n)) wrong.add(m);
  }
  return rng.shuffle([n, ...wrong]);
}

// ── Khám phá: lập một số trên bảng hàng (em bấm), cột thừa thẻ thì nhắc ngay ─────────────────────────
async function buildOnBoard(c, t, target, { say, shown } = {}) {
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

// ── Bài 1: Ôn tập các số đến 100 000 ──────────────────────────────────────────────────────────────────
const B1 = {
  explore: {
    setup: (board) => { const t = createPlace(board, { cols: 5 }); t.lock(true); return t; },
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Đây là bảng hàng. Mỗi cột là một hàng, từ phải sang trái.');
        for (const p of [0, 1, 2, 3, 4]) { t.glow(p); await c.say(`Hàng ${PLACE[p]}.`); }
        t.glow(null);
        t.lock(false); t.only(0);
        await c.say('Bấm thẻ cộng 1 ở hàng đơn vị.', 'Bấm thẻ <b>+1</b> ở hàng đơn vị.');
        await c.until(t, () => t.value >= 1, { nudge: 'Thẻ +1 màu xanh lá ở góc dưới bên phải.', el: () => t.src(0) });
      },
      async (c) => {
        const t = c.t;
        await c.say('Bấm tiếp cho đủ 10 thẻ ở hàng đơn vị. Xem chuyện gì xảy ra!', 'Bấm tiếp cho đủ <b>10 thẻ</b> ở hàng đơn vị!');
        await c.until(t, () => t.counts[1] >= 1, { nudge: 'Bấm thêm thẻ +1 cho đủ 10.', el: () => t.src(0) });
        t.lock(true);
        await c.say('10 đơn vị đổi thành 1 chục!', '<b>10 đơn vị = 1 chục</b>');
        await c.say('Ở mọi hàng đều vậy: đủ 10 thì đổi thành 1 ở hàng bên trái. 10 chục là 1 trăm, 10 trăm là 1 nghìn, 10 nghìn là 1 chục nghìn.',
          '10 chục = 1 trăm · 10 trăm = 1 nghìn<br>10 nghìn = 1 chục nghìn');
      },
      async (c) => {
        const t = c.t;
        t.set(0);
        await buildOnBoard(c, t, 36515, { say: `Em lập số ${R(36515)}.`, shown: 'Lập số <b>36 515</b> trên bảng hàng.' });
        await c.say('Số 36 515 gồm 3 chục nghìn, 6 nghìn, 5 trăm, 1 chục và 5 đơn vị.', '36 515 gồm <b>3</b> chục nghìn, <b>6</b> nghìn, <b>5</b> trăm, <b>1</b> chục, <b>5</b> đơn vị.');
      },
      async (c) => {
        const t = c.t;
        await c.say('Mỗi cột cho một số hạng. Xem số được viết thành tổng.', 'Viết thành tổng:');
        await t.showSum(true, { fly: true });
        await c.say('Ba mươi sáu nghìn năm trăm mười lăm bằng ba mươi nghìn cộng sáu nghìn cộng năm trăm cộng mười cộng năm.', '36 515 = 30 000 + 6 000 + 500 + 10 + 5');
      },
      async (c) => {
        const t = c.use((b) => createLine(b, { lo: 17595, hi: 17602, step: 1, caption: true }));
        t.caption('Số liền sau hơn số liền trước <b>1 đơn vị</b>');
        for (const v of [17598, 17600, 17601]) t.blank(v);
        t.hopper(17595);
        await c.say('Trên tia số, mỗi bước sang phải là thêm 1. Bấm vào ô trống để chú châu chấu nhảy tới.', 'Bấm vào các ô <b>?</b> theo thứ tự.');
        let next = 17596;
        const done = new Set();
        let tapped = null;
        const off = t.on((ev, v) => {
          if (ev !== 'tap') return;
          const want = [17598, 17600, 17601].find(x => !done.has(x));
          if (v === want) tapped = v; else c.hint('Chú châu chấu nhảy lần lượt từng ô, từ trái sang phải.');
        });
        while (done.size < 3) {
          const want = [17598, 17600, 17601].find(x => !done.has(x));
          await c.until(t, () => tapped === want, { nudge: 'Bấm vào ô trống có dấu hỏi.', el: () => t.blankEl(want) });
          done.add(want);
          while (next <= want) { await t.hop(next, { label: next !== want }); next++; }
          t.fillBlank(want);
          sfx.ding();
        }
        off();
        await c.say('Mười bảy nghìn sáu trăm là số liền sau của mười bảy nghìn năm trăm chín mươi chín.', '17 600 là số liền sau của 17 599.');
      },
    ],
  },
  tasks: () => [taskBuild(5), taskRead(5), taskExpand(5), taskNext(5), taskCompare(5)],
};

// ── Bài 10: Số có sáu chữ số. Số 1 000 000 ────────────────────────────────────────────────────────────
const B10 = {
  explore: {
    setup: (board) => { const t = createPlace(board, { cols: 6, value: 90000 }); t.lock(true); return t; },
    steps: [
      async (c) => {
        const t = c.t;
        t.glow(5);
        await c.say('Bảng hàng có thêm một cột mới: hàng trăm nghìn.', 'Cột mới: <b>hàng trăm nghìn</b>');
        t.glow(null);
        t.lock(false); t.only(4);
        await c.say('Đang có 9 chục nghìn. Bấm thêm 1 thẻ chục nghìn.', 'Đang có 9 chục nghìn. Bấm thêm <b>+10 000</b>.');
        await c.until(t, () => t.counts[5] >= 1, { nudge: 'Bấm thẻ +10 000.', el: () => t.src(4) });
        t.lock(true);
        await c.say('10 chục nghìn bằng 1 trăm nghìn. Một trăm nghìn viết là 100 000.', '<b>10 chục nghìn = 1 trăm nghìn</b><br>viết là 100 000');
      },
      async (c) => {
        const t = c.t;
        t.set(0);
        await buildOnBoard(c, t, 432516, { say: `Lập số ${R(432516)}.`, shown: 'Lập số <b>432 516</b>.' });
        await c.say('Số có sáu chữ số: 4 trăm nghìn, 3 chục nghìn, 2 nghìn, 5 trăm, 1 chục, 6 đơn vị.', '432 516: số có <b>sáu chữ số</b>');
        await t.showSum(true, { fly: true });
      },
      async (c) => {
        const t = c.use((b) => createPlace(b, { cols: 7, value: 999999 }));
        t.lock(false); t.only(0);
        await c.say(`Đây là số ${R(999999)}, số lớn nhất có sáu chữ số. Bấm thêm 1 đơn vị!`, 'Số <b>999 999</b>. Bấm <b>+1</b> xem sao!');
        await c.until(t, () => t.value === 1000000, { nudge: 'Bấm thẻ +1 ở hàng đơn vị.', el: () => t.src(0) });
        await sleep(400);
        t.lock(true);
        t.glow(6);
        await c.say('Các hàng lần lượt đổi lên. Được một triệu, viết là 1 000 000: chữ số 1 và sáu chữ số 0.', 'Số liền sau 999 999 là <b>1 000 000</b> (một triệu)');
        t.glow(null);
      },
      async (c) => {
        const t = c.use((b) => createLine(b, { lo: 0, hi: 1000000, step: 100000, caption: true }));
        t.caption('Đếm thêm <b>100 000</b>');
        t.hopper(0);
        await c.say('Đếm thêm một trăm nghìn mỗi lần, tới một triệu.');
        for (let v = 100000; v <= 1000000; v += 100000) { await t.hop(v, { label: false }); await sleep(120); }
        await c.say('Mười lần một trăm nghìn là một triệu.', '10 × 100 000 = <b>1 000 000</b>');
      },
    ],
  },
  tasks: () => [taskBuild(6), taskRead(6), taskValue(6), taskNext(6, { edge: true }), taskExpand(6)],
};

// ── Bài 11: Hàng và lớp ───────────────────────────────────────────────────────────────────────────────
const B11 = {
  explore: {
    setup: (board) => { const t = createPlace(board, { cols: 6, classes: true, value: 852734 }); t.lock(true); return t; },
    steps: [
      async (c) => {
        const t = c.t;
        t.glow([0, 1, 2]);
        await c.say('Hàng đơn vị, hàng chục, hàng trăm hợp thành lớp đơn vị.', 'Đơn vị, chục, trăm → <b>lớp đơn vị</b>');
        t.glow([3, 4, 5]);
        await c.say('Hàng nghìn, hàng chục nghìn, hàng trăm nghìn hợp thành lớp nghìn.', 'Nghìn, chục nghìn, trăm nghìn → <b>lớp nghìn</b>');
        t.glow(null);
        await c.say('Khi viết số, mỗi lớp là một nhóm ba chữ số, có khoảng cách. Mỗi lớp một màu.', '<span style="color:#1E40AF">852</span> <span style="color:#166534">734</span>: mỗi lớp 3 chữ số');
      },
      async (c) => {
        const t = c.t;
        t.pickMode(true);
        for (const [digit, p] of [[2, 3], [7, 2]]) {
          await c.say(`Chữ số ${digit} thuộc hàng nào? Bấm vào cột đó.`, `Chữ số <b>${digit}</b> thuộc hàng nào? Bấm vào cột.`);
          let picked = -1;
          const off = t.on((ev, q) => { if (ev === 'pick') { picked = q; if (q !== p) c.hint(`Tìm cột có chữ số ${digit} ở hàng dưới cùng.`); } });
          await c.until(t, () => picked === p, { nudge: `Nhìn dãy chữ số dưới các cột, tìm chữ số ${digit}.`, el: () => t.dig(p) });
          off();
          t.glow(p);
          await c.say(`Đúng rồi! Chữ số ${digit} ở hàng ${PLACE[p]}, thuộc ${CLASS[classOf(p)]}.`, `Chữ số ${digit}: hàng ${PLACE[p]}, <b>${CLASS[classOf(p)]}</b>`);
          t.glow(null);
        }
        t.pickMode(false);
      },
      async (c) => {
        const t = c.t;
        t.glow(5);
        await c.say('Chữ số 8 ở hàng trăm nghìn, nên có giá trị là tám trăm nghìn.', 'Chữ số 8 ở hàng trăm nghìn: giá trị <b>800 000</b>');
        t.glow(1);
        await c.say('Chữ số 3 ở hàng chục, nên có giá trị là ba mươi.', 'Chữ số 3 ở hàng chục: giá trị <b>30</b>');
        t.glow(null);
        await t.showSum(true, { fly: true });
        await c.say('Cùng là một chữ số, đứng ở hàng càng cao thì giá trị càng lớn.');
      },
      async (c) => {
        const t = c.use((b) => createPlace(b, { cols: 9, classes: true, beads: true, value: 531000000 }));
        t.lock(true);
        t.glow([6, 7, 8]);
        await c.say('Số lớn hơn nữa thì có thêm lớp triệu: hàng triệu, hàng chục triệu, hàng trăm triệu.', 'Triệu, chục triệu, trăm triệu → <b>lớp triệu</b>');
        t.glow(null);
        await c.say(`Số này đọc là ${R(531000000)}.`, '531 000 000: năm trăm ba mươi mốt triệu');
      },
    ],
  },
  tasks: () => [taskPlaceOf(6), taskValue(6), taskBuild(6, { classes: true }), taskRead(6)],
};

// ── Bài 12: Các số trong phạm vi lớp triệu ────────────────────────────────────────────────────────────
const B12 = {
  explore: {
    setup: (board) => { const t = createPlace(board, { cols: 9, classes: true, beads: true, value: 128405637 }); t.lock(true); return t; },
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Bảng hàng có đủ ba lớp: lớp triệu, lớp nghìn, lớp đơn vị. Các hạt trên mỗi cọc cho biết chữ số của hàng đó.', 'Ba lớp: <b>triệu · nghìn · đơn vị</b>');
        await c.say('Đọc số lớn: tách thành từng lớp, đọc từ trái sang phải, đọc xong mỗi lớp thì đọc tên lớp.', 'Đọc từng lớp, từ trái sang phải');
        t.glow([6, 7, 8]); await c.say('Một trăm hai mươi tám triệu,', '<b style="color:#6B21A8">128</b> triệu');
        t.glow([3, 4, 5]); await c.say('bốn trăm linh năm nghìn,', '<b style="color:#1E40AF">405</b> nghìn');
        t.glow([0, 1, 2]); await c.say('sáu trăm ba mươi bảy.', '<b style="color:#166534">637</b>');
        t.glow(null);
        await c.say(`Cả số đọc là ${R(128405637)}.`, '128 405 637');
      },
      async (c) => {
        const t = c.t;
        t.set(0);
        await buildOnBoard(c, t, 20503018, { say: `Lập số ${R(20503018)}. Hàng nào là chữ số 0 thì để trống.`, shown: 'Lập số <b>20 503 018</b>. Chữ số 0: để trống cọc.' });
        await c.say('Hàng trống vẫn là một hàng. Khi viết số phải ghi chữ số 0 vào đó.', 'Cọc trống → viết chữ số <b>0</b>');
      },
      async (c) => {
        const t = c.t;
        await t.showSum(true, { fly: true });
        await c.say('Số 20 503 018 viết thành tổng có bốn số hạng. Hàng có chữ số 0 thì không cần viết.', '20 503 018 = 20 000 000 + 500 000 + 3 000 + 10 + 8');
      },
    ],
  },
  tasks: () => [taskRead(9), taskPlaceOf(9, { beads: true }), taskValue(9), taskExpand(8), taskBuild(7, { classes: true, beads: true })],
};

// ── Bài 13: Làm tròn số đến hàng trăm nghìn ───────────────────────────────────────────────────────────
async function roundDemo(c, t, n) {
  const lo = Math.floor(n / 100000) * 100000, hi = lo + 100000;
  t.clearMarks();
  t.flag(lo, { color: '#60A5FA' });
  t.flag(hi, { color: '#60A5FA' });
  t.pin(n);
  t.ball(n);
  await sleep(300);
  const dir = n - lo < hi - n ? -1 : 1;
  await t.tilt(dir);
  await t.roll(dir < 0 ? lo : hi);
  return dir < 0 ? lo : hi;
}
const B13 = {
  explore: {
    setup: (board) => createLine(board, { lo: 4200000, hi: 4300000, step: 100000, minor: 10000, caption: true }),
    steps: [
      async (c) => {
        const t = c.t;
        t.caption('Làm tròn <b>4 236 108</b> đến hàng trăm nghìn');
        t.flag(4200000, { color: '#60A5FA' }); t.flag(4300000, { color: '#60A5FA' });
        t.pin(4236108);
        await c.say(`Số ${R(4236108)} nằm giữa hai số tròn trăm nghìn: bốn triệu hai trăm nghìn và bốn triệu ba trăm nghìn.`, '4 236 108 nằm giữa 4 200 000 và 4 300 000');
        await c.say('Làm tròn là tìm xem số đó gần mốc nào hơn. Thả viên bi xem nó lăn về đâu!');
        const to = await roundDemo(c, t, 4236108);
        t.caption(`4 236 108 làm tròn thành <b>${fmt(to)}</b>`);
        await c.say('Bi lăn về mốc gần hơn: bốn triệu hai trăm nghìn. Đó là số làm tròn.', '4 236 108 ≈ <b>4 200 000</b>');
        await t.tilt(0);
      },
      async (c) => {
        const t = c.t;
        t.caption('Làm tròn <b>4 281 950</b>');
        await c.say(`Còn số ${R(4281950)} thì sao?`, '4 281 950 thì sao?');
        await roundDemo(c, t, 4281950);
        t.caption('4 281 950 làm tròn thành <b>4 300 000</b>');
        await c.say('Số này gần bốn triệu ba trăm nghìn hơn, nên làm tròn lên.', '4 281 950 ≈ <b>4 300 000</b>');
        await t.tilt(0);
      },
      async (c) => {
        const t = c.t;
        t.caption('Đúng giữa: <b>4 250 000</b>');
        t.clearMarks();
        t.flag(4200000, { color: '#60A5FA' }); t.flag(4300000, { color: '#60A5FA' });
        t.pin(4250000);
        t.bracket(4200000, 4250000, { text: '50 000', color: '#F97316' });
        t.bracket(4250000, 4300000, { text: '50 000', color: '#F97316' });
        await c.say('Số bốn triệu hai trăm năm mươi nghìn nằm đúng chính giữa, cách hai mốc bằng nhau.');
        t.ball(4250000);
        await t.tilt(1);
        await t.roll(4300000);
        await c.say('Quy ước: đúng giữa thì làm tròn lên.', 'Đúng giữa → <b>làm tròn lên</b>: 4 300 000');
        await t.tilt(0);
      },
      async (c) => {
        const t = c.t;
        t.clearMarks();
        t.caption('Nhìn chữ số <b>hàng chục nghìn</b>:<br>bé hơn 5 → làm tròn xuống · từ 5 trở lên → làm tròn lên');
        await c.say('Cách nhanh: nhìn chữ số hàng chục nghìn. Bé hơn 5 thì làm tròn xuống. Bằng hoặc lớn hơn 5 thì làm tròn lên.');
        const n = 4263900;
        t.flag(4200000, { color: '#60A5FA' }); t.flag(4300000, { color: '#60A5FA' });
        t.pin(n, { text: '4 2<tspan fill="#DC2626" text-decoration="underline">6</tspan>3 900' });
        await c.say(`Số ${R(n)} có chữ số hàng chục nghìn là 6. Theo em làm tròn thành số nào? Bấm vào lá cờ.`, '4 2<b>6</b>3 900 làm tròn thành số nào? <b>Bấm vào lá cờ.</b>');
        let ok = false;
        const off = t.on((ev, v) => {
          if (ev !== 'tap') return;
          if (Math.abs(v - 4300000) < 15000) ok = true;
          else if (Math.abs(v - 4200000) < 15000) c.hint('Chữ số 6 lớn hơn 5, nên làm tròn lên.');
        });
        await c.until(t, () => ok, { nudge: 'Bấm vào một trong hai lá cờ.' });
        off();
        t.ball(n);
        await t.tilt(1);
        await t.roll(4300000);
        await c.say('Đúng rồi! Bốn triệu hai trăm sáu mươi ba nghìn chín trăm làm tròn thành bốn triệu ba trăm nghìn.', '4 263 900 ≈ <b>4 300 000</b>');
      },
    ],
  },
  tasks: () => [taskRound(7), taskRound(7, { keypad: true }), taskRound(6), taskRound(7, { mid: true })],
};

// ── Bài 14: So sánh các số có nhiều chữ số ────────────────────────────────────────────────────────────
const B14 = {
  explore: {
    setup: (board) => createCompare(board, 99999, 100000),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('So sánh chín mươi chín nghìn chín trăm chín mươi chín và một trăm nghìn.', 'So sánh <b>99 999</b> và <b>100 000</b>');
        const r = await t.scan();
        t.setSign(r.sign);
        await c.say('Số nào có nhiều chữ số hơn thì lớn hơn. Một trăm nghìn có sáu chữ số, nên lớn hơn.', 'Nhiều chữ số hơn → <b>lớn hơn</b>: 99 999 &lt; 100 000');
      },
      async (c) => {
        const t = c.use((b) => createCompare(b, 693251, 693521));
        await c.say('Hai số có cùng số chữ số thì so từng cặp chữ số, từ trái sang phải, tới khi gặp cặp khác nhau.', 'Cùng số chữ số → so <b>từ trái sang phải</b>');
        const r = await t.scan();
        t.setSign(r.sign);
        await c.say('Hàng trăm nghìn, chục nghìn, nghìn đều bằng nhau. Tới hàng trăm: 2 bé hơn 5. Vậy số thứ nhất bé hơn.', 'Hàng trăm: 2 &lt; 5 → 693 251 <b>&lt;</b> 693 521');
      },
      async (c) => {
        const t = c.use((b) => createCompare(b, 47038216, 47029998));
        await c.say('Đến lượt em. Chọn dấu đúng, máy soi sẽ kiểm tra.', 'Chọn dấu: 47 038 216 ? 47 029 998');
        const right = await c.choose(['>', '<', '='].map(x => ({ html: x, value: x })), '>', { hint: 'So từng cặp chữ số từ trái sang phải, tới cặp khác nhau.' });
        const pick = right ? '>' : '';
        const r = await t.scan();
        t.setSign(r.sign);
        await c.say(pick === r.sign ? 'Đúng rồi! Tới hàng chục nghìn: 3 lớn hơn 2.' : 'Máy soi thấy: tới hàng chục nghìn, 3 lớn hơn 2. Vậy số thứ nhất lớn hơn.', 'Hàng chục nghìn: 3 &gt; 2 → <b>&gt;</b>');
      },
    ],
  },
  tasks: () => [taskCompare(6), taskCompare(8), taskCompare(7, { diffLen: true }), taskLargest(6)],
};

// ── Bài 15: Làm quen với dãy số tự nhiên ──────────────────────────────────────────────────────────────
const B15 = {
  explore: {
    setup: (board) => createLine(board, { lo: 0, hi: 10, step: 1, caption: true }),
    steps: [
      async (c) => {
        const t = c.t;
        t.caption('0, 1, 2, 3, … là các <b>số tự nhiên</b>');
        t.hopper(0);
        await c.say('Các số 0, 1, 2, 3 và cứ thế mãi là các số tự nhiên. Xếp từ bé đến lớn được dãy số tự nhiên.');
        for (let v = 1; v <= 10; v++) await t.hop(v, { label: false });
        await c.say('Số 0 là số tự nhiên bé nhất. Hai số liên tiếp hơn kém nhau 1 đơn vị.', 'Số bé nhất: <b>0</b> · hai số liền nhau hơn kém <b>1</b>');
      },
      async (c) => {
        const t = c.t;
        await c.say('Có số tự nhiên lớn nhất không? Thu nhỏ tia số để nhìn xa hơn.');
        await t.zoom({ lo: 0, hi: 100, step: 10 });
        t.hopper(10);
        for (let v = 20; v <= 100; v += 10) await t.hop(v, { label: false });
        await t.zoom({ lo: 0, hi: 1000000, step: 100000 });
        t.caption('Không có số tự nhiên <b>lớn nhất</b>');
        await c.say('Số nào cũng có số liền sau, lớn hơn nó 1. Vì vậy không có số tự nhiên lớn nhất. Dãy số tự nhiên kéo dài mãi.');
      },
      async (c) => {
        const t = c.use((b) => createLine(b, { lo: 0, hi: 20, step: 2, minor: 1, caption: true }));
        t.caption('Dãy số chẵn: 0, 2, 4, 6, …');
        t.hopper(0);
        await c.say('Châu chấu nhảy mỗi lần 2 bước: 0, 2, 4, 6. Em đoán lần tới nó đáp ở đâu? Bấm vào số đó.', '0, 2, 4, 6, <b>?</b> Bấm vào chỗ châu chấu sẽ đáp.');
        for (const v of [2, 4, 6]) await t.hop(v);
        let ok = false;
        const off = t.on((ev, v) => { if (ev === 'tap') { if (v === 8) ok = true; else c.hint('Mỗi lần nhảy 2: sáu cộng hai bằng mấy?'); } });
        await c.until(t, () => ok, { nudge: 'Bấm lên tia số, chỗ số 8.' });
        off();
        for (const v of [8, 10, 12]) await t.hop(v);
        await c.say('Đúng rồi! Dãy này cách đều 2: 0, 2, 4, 6, 8, 10, 12.', 'Cách đều <b>2</b>: 0, 2, 4, 6, 8, 10, 12, …');
      },
    ],
  },
  tasks: () => [taskSeq(), taskNext(4), taskSeq({ big: true }), taskNext(6, { edge: true })],
};

// ── Các dạng câu Thực hành ────────────────────────────────────────────────────────────────────────────

/** Lập số theo cách đọc trên bảng hàng, bấm Xong. */
function taskBuild(len, { classes = false, beads = false } = {}) {
  return {
    id: `build${len}`,
    make: (rng) => ({ n: randNum(rng, len, { zeros: 0.25 }) }),
    mount(f, { n }) {
      f.q.innerHTML = `Lập số: <span style="color:#1D4ED8">${capFirst(R(n))}</span>`;
      const t = createPlace(f.tool, { cols: Math.max(len, 5), classes, beads, read: false, sum: false });
      // Che số trên bảng (em tự lập theo lời đọc), chỉ hiện khi bấm Xong.
      t.root.querySelector('.g4p-num').style.visibility = 'hidden';
      f.say(`Lập số ${R(n)} trên bảng hàng rồi bấm Xong.`, 'Lập số rồi bấm <b>Xong</b>.');
      f.choicesBox.innerHTML = '<button type="button" class="g4-choice g4-choice-go">✓ Xong</button>';
      f.choicesBox.classList.add('g4-choices-on');
      const btn = f.choicesBox.firstElementChild;
      if (import.meta.env.DEV) window.__g4solve = () => { t.set(n); btn.click(); };
      btn.onclick = () => {
        sfx.tap();
        const v = t.value;
        t.root.querySelector('.g4p-num').style.visibility = '';
        if (v === n) { btn.disabled = true; btn.classList.add('g4-choice-ok'); t.lock(true); f.finish({ ok: `Em lập đúng số ${fmt(n)}.` }); return; }
        f.mistakes++;
        const ds = digitsOf(n, t.cols);
        const p = [...Array(t.cols).keys()].reverse().find(q => t.counts[q] !== (ds[q] || 0));
        t.glow(p);
        f.hint(`Bảng đang là số ${R(v)}. Hàng ${PLACE[p]} cần ${ds[p] || 0} thẻ.`, `Bảng đang là <b>${fmt(v)}</b>. Hàng ${PLACE[p]} cần <b>${ds[p] || 0}</b> thẻ.`);
        setTimeout(() => { t.root.querySelector('.g4p-num').style.visibility = 'hidden'; t.glow(null); }, 2500);
      };
    },
  };
}

/** Chọn cách đọc đúng. */
function taskRead(len) {
  return {
    id: `read${len}`,
    make: (rng) => { const n = randNum(rng, len, { zeros: 0.3 }); return { n, opts: readingOptions(rng, n) }; },
    async mount(f, { n, opts }) {
      f.q.innerHTML = `<span style="font-size:1.5em">${numHtml(n)}</span><small>Số này đọc là:</small>`;
      f.choicesBox.classList.add('g4-choices-col');
      await f.choose({ options: opts.map(v => ({ html: capFirst(R(v)), value: v })), answer: n, say: 'Chọn cách đọc đúng.', hint: 'Đọc từng lớp từ trái sang phải, rồi đọc tên lớp.' });
      f.finish({ ok: `${capFirst(R(n))}.`, tip: 'Tách số thành từng lớp 3 chữ số, đọc từ trái sang phải.' });
    },
  };
}

/** Giá trị của chữ số gạch chân. */
function taskValue(len) {
  return {
    id: `value${len}`,
    make: (rng) => {
      const n = randNum(rng, len, { zeros: 0.15 });
      const ps = digitsOf(n).map((d, p) => (d && p > 0 ? p : -1)).filter(p => p >= 0);
      return { n, p: rng.pick(ps) };
    },
    async mount(f, { n, p }) {
      const d = digitsOf(n)[p];
      f.q.innerHTML = `<span style="font-size:1.4em">${underlined(n, p)}</span><small>Giá trị của chữ số gạch chân là:</small> ${BOX}`;
      const t = createPlace(f.tool, { cols: len, classes: len > 6, beads: len > 6, value: n, tray: false, read: false, sum: false });
      t.lock(true);
      t.root.querySelector('.g4p-num').style.display = 'none';
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: d * 10 ** p, max: len,
        say: `Chữ số ${d} gạch chân có giá trị là bao nhiêu?`,
        hint: () => { t.glow(p); return `Chữ số ${d} ở hàng ${PLACE[p]}, nên giá trị là ${d} ${PLACE[p]}.`; } });
      t.glow(p);
      f.finish({ ok: `Chữ số ${d} ở hàng ${PLACE[p]}: giá trị ${fmt(d * 10 ** p)}.` });
    },
  };
}

/** Viết thành tổng, một số hạng trống. */
function taskExpand(len) {
  return {
    id: `expand${len}`,
    make: (rng) => {
      const n = randNum(rng, len, { zeros: 0.2 });
      const terms = expand(n);
      return { n, k: rng.int(0, terms.length - 1) };
    },
    async mount(f, { n, k }) {
      const terms = expand(n);
      f.q.innerHTML = `<span style="font-size:1.1em">${fmt(n)} = ${terms.map((x, i) => (i === k ? BOX : fmt(x))).join(' + ')}</span>`;
      const t = createPlace(f.tool, { cols: len, classes: len > 6, beads: len > 6, value: n, tray: false, read: false, sum: false });
      t.lock(true);
      const p = String(terms[k]).length - 1;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: terms[k], max: len, say: 'Điền số hạng còn thiếu.',
        hint: () => { t.glow(p); return `Số hạng còn thiếu ứng với hàng ${PLACE[p]}.`; } });
      await t.showSum(true, { fly: true });
      f.finish({ ok: `${fmt(n)} = ${terms.map(fmt).join(' + ')}` });
    },
  };
}

/** Số liền trước / liền sau (edge: số tròn để phải đổi hàng: 99 999 + 1). */
function taskNext(len, { edge = false } = {}) {
  return {
    id: `next${len}${edge ? 'e' : ''}`,
    make: (rng) => {
      let n = randNum(rng, len);
      if (edge && rng() < 0.6) n = Math.floor(n / 1000) * 1000 + (rng() < 0.5 ? 999 : 0);
      return { n, after: rng() < 0.5 };
    },
    async mount(f, { n, after }) {
      const ans = after ? n + 1 : n - 1;
      f.q.innerHTML = `Số liền ${after ? 'sau' : 'trước'} của <b>${fmt(n)}</b> là ${BOX}`;
      const t = createLine(f.tool, { lo: n - 3, hi: n + 3, step: 1 });
      t.blank(ans);
      t.hopper(n);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: String(ans).length,
        say: `Số liền ${after ? 'sau' : 'trước'} của ${R(n)} là số nào?`,
        hint: after ? 'Số liền sau thì thêm 1 đơn vị.' : 'Số liền trước thì bớt 1 đơn vị.' });
      await t.hop(ans, { label: false });
      t.fillBlank(ans);
      f.finish({ ok: `Số liền ${after ? 'sau' : 'trước'} của ${fmt(n)} là ${fmt(ans)}.` });
    },
  };
}

/** So sánh hai số bằng máy soi. */
function taskCompare(len, { diffLen = false } = {}) {
  return {
    id: `cmp${len}${diffLen ? 'd' : ''}`,
    make: (rng) => {
      const a = randNum(rng, len);
      let b;
      if (diffLen) b = randNum(rng, len - 1);
      else {
        // giống nhau vài chữ số đầu rồi khác ở một hàng
        const s = String(a).split('');
        const i = rng.int(1, len - 1);
        s[i] = String((+s[i] + rng.int(1, 8)) % 10);
        for (let j = i + 1; j < len; j++) s[j] = String(rng.int(0, 9));
        b = rng() < 0.1 ? a : +s.join('');
      }
      return rng() < 0.5 ? { a, b } : { a: b, b: a };
    },
    async mount(f, { a, b }) {
      f.q.innerHTML = 'So sánh hai số:';
      const t = createCompare(f.tool, a, b);
      const sign = a > b ? '>' : a < b ? '<' : '=';
      await f.choose({ options: ['>', '<', '='].map(s => ({ html: s, value: s })), answer: sign, cls: 'g4-choice-big', say: 'Chọn dấu thích hợp.',
        hint: lenOf(a) !== lenOf(b) ? 'Đếm xem số nào có nhiều chữ số hơn.' : 'So từng cặp chữ số từ trái sang phải.' });
      const r = await t.scan({ gap: 380 });
      t.setSign(r.sign);
      f.finish({ ok: `${fmt(a)} ${sign} ${fmt(b)}` });
    },
  };
}

/** Chọn số lớn nhất trong bốn số. */
function taskLargest(len) {
  return {
    id: `max${len}`,
    make: (rng) => {
      const a = randNum(rng, len);
      const s = new Set([a]);
      while (s.size < 4) { const x = String(a).split(''); const i = rng.int(1, len - 1); x[i] = String(rng.int(0, 9)); s.add(+x.join('')); }
      return { ns: rng.shuffle([...s]), big: rng() < 0.5 };
    },
    async mount(f, { ns, big }) {
      const ans = big ? Math.max(...ns) : Math.min(...ns);
      f.q.innerHTML = `Số nào <b>${big ? 'lớn' : 'bé'} nhất</b>?`;
      f.choicesBox.classList.add('g4-choices-col');
      await f.choose({ options: ns.map(n => ({ html: numHtml(n), value: n })), answer: ans, say: `Chọn số ${big ? 'lớn' : 'bé'} nhất.`, hint: 'Các số cùng số chữ số: so từng hàng từ trái sang phải.' });
      f.finish({ ok: `Số ${big ? 'lớn' : 'bé'} nhất là ${fmt(ans)}.` });
    },
  };
}

/** Làm tròn đến hàng trăm nghìn: chọn mốc (hoặc gõ số), bi lăn kiểm chứng. */
function taskRound(len, { keypad = false, mid = false } = {}) {
  return {
    id: `round${len}${keypad ? 'k' : ''}${mid ? 'm' : ''}`,
    make: (rng) => {
      let n = randNum(rng, len, { zeros: 0.1 });
      if (mid) n = Math.floor(n / 100000) * 100000 + rng.pick([50000, 49999, 50001, 45000, 55000]);
      return { n };
    },
    async mount(f, { n }) {
      const lo = Math.floor(n / 100000) * 100000, hi = lo + 100000, ans = roundTo(n, 5);
      const t = createLine(f.tool, { lo, hi, step: 100000, minor: 10000 });
      t.flag(lo, { color: '#60A5FA' }); t.flag(hi, { color: '#60A5FA' });
      t.pin(n);
      const hint = () => `Chữ số hàng chục nghìn là ${digitsOf(n)[4]}: ${digitsOf(n)[4] < 5 ? 'bé hơn 5 nên làm tròn xuống' : 'từ 5 trở lên nên làm tròn lên'}.`;
      if (keypad) {
        f.q.innerHTML = `Làm tròn <b>${fmt(n)}</b> đến hàng trăm nghìn: ${BOX}`;
        await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: len + 1, say: `Làm tròn ${R(n)} đến hàng trăm nghìn.`, hint });
      } else {
        f.q.innerHTML = `Làm tròn <b>${fmt(n)}</b> đến hàng trăm nghìn được số nào?`;
        await f.choose({ options: [{ html: fmt(lo), value: lo }, { html: fmt(hi), value: hi }], answer: ans, say: `Làm tròn ${R(n)} đến hàng trăm nghìn được số nào?`, hint });
      }
      t.ball(n);
      await t.tilt(ans === lo ? -1 : 1);
      await t.roll(ans);
      f.finish({ ok: `${fmt(n)} làm tròn thành ${fmt(ans)}.`, tip: 'Nhìn chữ số hàng chục nghìn: bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.' });
    },
  };
}

/** Điền số còn thiếu trong dãy cách đều; châu chấu nhảy kiểm chứng. */
function taskSeq({ big = false } = {}) {
  return {
    id: `seq${big ? 'b' : ''}`,
    make: (rng) => {
      const d = big ? rng.pick([10, 100, 1000, 5, 50]) : rng.pick([1, 2, 5, 3]);
      const a = big ? rng.int(1, 90) * d * (d < 100 ? 10 : 1) : rng.int(0, 40);
      return { a, d, k: rng.int(2, 4) };
    },
    async mount(f, { a, d, k }) {
      const seq = Array.from({ length: 6 }, (_, i) => a + i * d);
      f.q.innerHTML = seq.map((v, i) => (i === k ? BOX : fmt(v))).join(', ') + ', …';
      const t = createLine(f.tool, { lo: a, hi: a + 5 * d, step: d });
      t.blank(seq[k]);
      t.hopper(a);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: seq[k], max: String(seq[k]).length, say: 'Điền số còn thiếu trong dãy.',
        hint: `Mỗi số hơn số đứng trước nó ${d}.` });
      for (let i = 1; i <= 5; i++) await t.hop(seq[i], { label: false });
      t.fillBlank(seq[k]);
      f.finish({ ok: `Dãy cách đều ${d}.` });
    },
  };
}

/** Chữ số thuộc hàng nào (bấm cột), lớp nào (chọn). */
function taskPlaceOf(len, { beads = false } = {}) {
  return {
    id: `placeof${len}`,
    make: (rng) => {
      const n = randNum(rng, len, { zeros: 0.1 });
      // chữ số chỉ xuất hiện một lần trong số
      const ds = digitsOf(n);
      const ps = ds.map((d, p) => (ds.filter(x => x === d).length === 1 ? p : -1)).filter(p => p >= 0);
      return ps.length ? { n, p: rng.pick(ps) } : { n: 123456789 % 10 ** len, p: 2 };
    },
    async mount(f, { n, p }) {
      const d = digitsOf(n)[p];
      f.q.innerHTML = `Chữ số <b class="g4-u">${d}</b> trong số <b>${fmt(n)}</b> thuộc hàng nào?`;
      const t = createPlace(f.tool, { cols: len, classes: true, beads: beads || len > 6, value: n, tray: false, read: false, sum: false });
      t.root.querySelector('.g4p-num').style.display = 'none';
      t.pickMode(true);
      f.say(`Chữ số ${d} thuộc hàng nào? Bấm vào cột.`, `Bấm vào <b>cột</b> có chữ số ${d}.`);
      if (import.meta.env.DEV) window.__g4solve = () => t.emit('pick', p);
      await new Promise((res) => {
        let wrong = 0;
        t.on((ev, q) => {
          if (ev !== 'pick') return;
          if (q === p) { t.glow(p); sfx.ding(); res(); return; }
          if (!wrong++) f.mistakes++;
          f.hint(`Cột đó có chữ số ${digitsOf(n)[q] ?? 0}. Tìm cột có chữ số ${d}.`);
        });
      });
      t.pickMode(false);
      await f.choose({ options: [0, 1, 2].filter(c => c * 3 < len).map(c => ({ html: capFirst(CLASS[c]), value: c })), answer: classOf(p),
        say: `Hàng ${PLACE[p]} thuộc lớp nào?`, shown: `Hàng ${PLACE[p]} thuộc <b>lớp nào</b>?`, hint: 'Nhìn màu và tên lớp phía trên các cột.' });
      f.finish({ ok: `Chữ số ${d}: hàng ${PLACE[p]}, ${CLASS[classOf(p)]}.` });
    },
  };
}

export const NUMBER_LESSONS = { 1: B1, 10: B10, 11: B11, 12: B12, 13: B13, 14: B14, 15: B15 };
