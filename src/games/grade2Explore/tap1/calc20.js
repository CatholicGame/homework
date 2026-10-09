/**
 * Cộng trừ trong phạm vi 20 và bài toán có lời văn:
 * Bài 7 (cộng qua 10), 8 (bảng cộng), 9 (thêm, bớt), 11 (trừ qua 10), 12 (bảng trừ), 13 (nhiều hơn, ít hơn).
 */

import { createFrames } from './frames.js';
import { createStage, skyGrass, desk, waitTap, sleep, sfx, INK, MINUS, svgEl } from './stage.js';
import { ART } from './art.js';

const nums = (arr) => arr.map((v) => ({ html: String(v), value: v }));

// ── Bài 7: 8 + 5 trên hai khung 10 ô ──────────────────────────────────────────────────────────────────
async function fillUntil(c, t, pred, nudge) {
  t.lock(false);
  await c.until(t, pred, { nudge, el: () => t.trayEl() });
}
const b7 = {
  title: 'Bài 7: Phép cộng (qua 10) trong phạm vi 20',
  setup: (board) => { const t = createFrames(board, { a: 8, b: 5 }); t.lock(true); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      const xs = t.expr(['8', '+', '5', '=', '?']);
      t.xs = xs;
      await c.say('Tính 8 cộng 5. Khung có 8 chấm đỏ. Dưới khay có 5 chấm xanh.', 'Tính <b>8 + 5</b>');
      await c.say('Chạm vào chấm xanh để đưa vào khung, cho đầy khung thứ nhất.', 'Chạm chấm xanh cho <b>đầy khung</b> thứ nhất');
      await fillUntil(c, t, () => t.full(0), 'Chạm vào một chấm xanh ở khay dưới.');
      t.lock(true);
      t.split(xs[2], t.exprY + 52, 5, 2, 3);
      await c.say('8 thêm 2 được 10. Vậy ta tách 5 thành 2 và 3.', '8 + <b>2</b> = 10 · tách 5 = 2 + 3');
    },
    async (c) => {
      const t = c.t;
      c.show('Khay còn mấy chấm xanh?');
      await c.say('Khay còn mấy chấm xanh?');
      await c.choose(nums([2, 3, 5]), 3, { hint: 'Đếm các chấm xanh còn ở khay.' });
      await c.say('Đưa nốt 3 chấm vào khung thứ hai.', 'Đưa nốt <b>3 chấm</b>');
      await fillUntil(c, t, () => t.left === 0, 'Chạm vào chấm xanh còn lại ở khay.');
      t.lock(true);
      t.setPart(4, '13');
      await c.say('10 thêm 3 được 13. Vậy 8 cộng 5 bằng 13.', '8 + 2 = 10<br>10 + 3 = 13<br><b>8 + 5 = 13</b>');
    },
    async (c) => {
      const t = c.t;
      t.reset({ a: 9, b: 3 });
      t.lock(true);
      const xs = t.expr(['9', '+', '3', '=', '?']);
      c.show('<b>9</b> thêm mấy thì được 10?');
      await c.say('Tính 9 cộng 3. 9 thêm mấy thì được 10?');
      await c.choose(nums([1, 2, 3]), 1, { hint: 'Đếm số ô trống trong khung thứ nhất.' });
      await t.place();
      t.split(xs[2], t.exprY + 52, 3, 1, 2, { show: [true, false] });
      c.show('Tách <b>3</b> thành 1 và mấy?');
      await c.say('Tách 3 thành 1 và mấy?');
      await c.choose(nums([1, 2, 3]), 2, { hint: '1 với mấy thì được 3?' });
      t.reveal('x2f-sq');
      await t.place(); await t.place();
      c.show('<b>10 + 2</b> = ?');
      await c.say('10 cộng 2 bằng mấy?');
      await c.choose(nums([11, 12, 13]), 12, { hint: 'Một chục và 2 đơn vị.' });
      t.setPart(4, '12');
      await c.say('9 cộng 1 bằng 10, 10 cộng 2 bằng 12. Vậy 9 cộng 3 bằng 12.', '9 + 1 = 10 · 10 + 2 = 12<br><b>9 + 3 = 12</b>');
    },
    async (c) => {
      const t = c.t;
      t.reset({ a: 7, b: 6 });
      t.expr(['7', '+', '6', '=', '?']);
      await c.say('Em tự làm 7 cộng 6: đưa hết chấm xanh vào khung.', 'Tính <b>7 + 6</b>: đưa hết chấm xanh vào khung');
      await fillUntil(c, t, () => t.left === 0, 'Chạm vào chấm xanh ở khay.');
      t.lock(true);
      c.show('<b>7 + 6</b> = ?');
      await c.choose(nums([12, 13, 14]), 13, { hint: 'Khung thứ nhất đầy là 10, khung thứ hai có mấy chấm?' });
      t.setPart(4, '13');
      await c.say('7 thêm 3 được 10, 10 thêm 3 được 13. Muốn cộng qua 10, ta làm tròn 10 trước.', '7 + 3 = 10 · 10 + 3 = 13<br><b>Làm tròn 10</b> trước');
    },
  ],
};

// ── Bài 11: 11 − 4 trên hai khung 10 ô ────────────────────────────────────────────────────────────────
async function crossUntil(c, t, n, frame, nudge) {
  t.onlyFrame(frame); t.lock(false);
  const off = t.on((ev, key) => {
    if (ev === 'tap' && frame != null && key.startsWith('c:') && ((+key.slice(2) < 10 ? 0 : 1) !== frame)) c.hint(frame === 1 ? 'Bớt ở khung thứ hai trước.' : 'Giờ bớt ở khung thứ nhất.');
  });
  try { await c.until(t, () => t.crossed >= n, { nudge, el: () => t.dotEl(frame ?? 1) || t.dotEl(0) }); } finally { off(); }
  t.lock(true);
}
const b11 = {
  title: 'Bài 11: Phép trừ (qua 10) trong phạm vi 20',
  setup: (board) => { const t = createFrames(board, { a: 11, sub: true }); t.lock(true); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      const xs = t.expr(['11', MINUS, '4', '=', '?']);
      await c.say('Tính 11 trừ 4. Có 11 chấm: một khung đầy 10 chấm và 1 chấm. Ta phải bớt 4 chấm.', 'Tính <b>11 − 4</b>');
      await c.say('Bớt 1 chấm ở khung thứ hai trước, cho còn tròn 10. Chạm vào chấm đó.', 'Bớt chấm ở <b>khung thứ hai</b> trước');
      await crossUntil(c, t, 1, 1, 'Chạm vào chấm ở khung thứ hai.');
      t.split(xs[2], t.exprY + 52, 4, 1, 3);
      await c.say('11 trừ 1 bằng 10. Ta tách 4 thành 1 và 3.', '11 − <b>1</b> = 10 · tách 4 = 1 + 3');
    },
    async (c) => {
      const t = c.t;
      c.show('Còn phải bớt mấy chấm nữa?');
      await c.say('Còn phải bớt mấy chấm nữa?');
      await c.choose(nums([1, 3, 4]), 3, { hint: 'Bớt 4 chấm, đã bớt 1 chấm.' });
      await c.say('Bớt tiếp 3 chấm ở khung thứ nhất.', 'Bớt <b>3 chấm</b> ở khung thứ nhất');
      await crossUntil(c, t, 4, 0, 'Chạm vào chấm ở khung thứ nhất.');
      t.setPart(4, '7');
      await c.say('10 trừ 3 bằng 7. Vậy 11 trừ 4 bằng 7.', '11 − 1 = 10<br>10 − 3 = 7<br><b>11 − 4 = 7</b>');
    },
    async (c) => {
      const t = c.t;
      t.reset({ a: 13 });
      t.lock(true);
      const xs = t.expr(['13', MINUS, '5', '=', '?']);
      c.show('<b>13</b> bớt mấy thì được 10?');
      await c.say('Tính 13 trừ 5. 13 bớt mấy thì được 10?');
      await c.choose(nums([2, 3, 5]), 3, { hint: 'Đếm số chấm ở khung thứ hai.' });
      for (const k of [12, 11, 10]) { await t.cross(k); await sleep(120); }
      t.split(xs[2], t.exprY + 52, 5, 3, 2, { show: [true, false] });
      c.show('Tách <b>5</b> thành 3 và mấy?');
      await c.say('Tách 5 thành 3 và mấy?');
      await c.choose(nums([1, 2, 3]), 2, { hint: '3 với mấy thì được 5?' });
      t.reveal('x2f-sq');
      for (const k of [9, 8]) { await t.cross(k); await sleep(120); }
      c.show(`<b>10 ${MINUS} 2</b> = ?`);
      await c.say('10 trừ 2 bằng mấy?');
      await c.choose(nums([7, 8, 12]), 8, { hint: 'Đếm số chấm chưa bị gạch.' });
      t.setPart(4, '8');
      await c.say('13 trừ 3 bằng 10, 10 trừ 2 bằng 8. Vậy 13 trừ 5 bằng 8.', '13 − 3 = 10 · 10 − 2 = 8<br><b>13 − 5 = 8</b>');
    },
    async (c) => {
      const t = c.t;
      t.reset({ a: 15 });
      t.expr(['15', MINUS, '6', '=', '?']);
      await c.say('Em tự làm 15 trừ 6: bớt ở khung thứ hai trước, rồi bớt tiếp ở khung thứ nhất.', 'Tính <b>15 − 6</b>: gạch 6 chấm');
      await crossUntil(c, t, 5, 1, 'Chạm vào chấm ở khung thứ hai.');
      await crossUntil(c, t, 6, 0, 'Chạm vào một chấm ở khung thứ nhất.');
      c.show(`<b>15 ${MINUS} 6</b> = ?`);
      await c.choose(nums([8, 9, 11]), 9, { hint: 'Đếm số chấm còn lại.' });
      t.setPart(4, '9');
      await c.say('15 trừ 5 bằng 10, 10 trừ 1 bằng 9. Muốn trừ qua 10, ta bớt cho tròn 10 trước.', '15 − 5 = 10 · 10 − 1 = 9<br>Bớt cho <b>tròn 10</b> trước');
    },
  ],
};

// ── Bảng cộng / bảng trừ: các thẻ phép tính theo cột ──────────────────────────────────────────────────
function createTable(host, cols) {
  // cols: [{ head, facts: [{ text, res }] }]
  const t = createStage(host, { bg: desk(0.1) });
  const T = t.tall, n = cols.length;
  const cw = T ? 228 : 232, gap = T ? 14 : 16, ch = T ? 88 : 66, rg = T ? 12 : 8, y0 = T ? 150 : 140, fs = T ? 38 : 36;
  const x0 = 500 - (n * cw + (n - 1) * gap) / 2;
  let g = '';
  cols.forEach((col, i) => {
    col.facts.forEach((f, r) => {
      const x = x0 + i * (cw + gap), y = y0 + r * (ch + rg);
      f.key = `${i}:${r}`;
      g += `<g class="x2t-card" data-tap="${f.key}"><rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="16" fill="#fff" stroke="#CBD5E1" stroke-width="3"/>
        <rect x="${x}" y="${y + ch - 8}" width="${cw}" height="8" rx="4" fill="#E2E8F0"/>
        <text class="x2a-t" x="${x + cw / 2}" y="${y + ch / 2 - 2}" font-size="${fs}"><tspan>${f.text} = </tspan><tspan class="x2t-res" fill="#2563EB">?</tspan></text></g>`;
    });
  });
  t.draw(g);
  t.cols = cols;
  t.card = (key) => t.q(`[data-tap="${key}"]`);
  t.fact = (key) => { const [i, r] = key.split(':').map(Number); return cols[i].facts[r]; };
  t.open = (key, { color = '#16A34A' } = {}) => {
    const f = t.fact(key); f.open = true;
    const e = t.card(key);
    const res = e.querySelector('.x2t-res');
    res.textContent = f.res; res.setAttribute('fill', color);
    e.querySelector('rect').setAttribute('fill', '#F0FDF4');
    t.pop(e);
  };
  t.mark = (key, on, color = '#FDE047') => {
    const r = t.card(key).querySelector('rect');
    r.setAttribute('fill', on ? color : '#F0FDF4'); r.setAttribute('stroke', on ? '#F59E0B' : '#CBD5E1');
  };
  return t;
}
const addCols = () => [9, 8, 7, 6].map((a) => ({ head: a, facts: Array.from({ length: a - 1 }, (_, k) => ({ text: `${a} + ${11 - a + k}`, res: a + 11 - a + k })) }));
const subCols = () => [11, 12, 13, 14].map((a) => ({ head: a, facts: Array.from({ length: 19 - a }, (_, k) => ({ text: `${a} ${MINUS} ${a - 9 + k}`, res: 9 - k })) }));

async function flipColumn(c, t, i, nudge) {
  const keys = t.cols[i].facts.map((f) => f.key);
  const off = t.on((ev, key) => { if (ev === 'tap' && keys.includes(key) && !t.fact(key).open) { t.open(key); sfx.pop?.(keys.indexOf(key)); t.emit('flip'); } });
  try { await c.until(t, () => keys.every((k) => t.fact(k).open), { nudge, el: () => t.card(keys.find((k) => !t.fact(k).open)) }); } finally { off(); }
}
async function findAll(c, t, res, word) {
  const keys = t.cols.flatMap((col) => col.facts).filter((f) => f.res === res).map((f) => f.key);
  const got = new Set();
  const off = t.on((ev, key) => {
    if (ev !== 'tap' || got.has(key)) return;
    if (keys.includes(key)) { got.add(key); t.mark(key, true); sfx.ding?.(); t.emit('found'); }
    else { sfx.boing?.(); c.hint(`${t.fact(key).text.replace('+', 'cộng').replace(MINUS, 'trừ')} bằng ${t.fact(key).res}, không phải ${res}.`, `${t.fact(key).text} = ${t.fact(key).res}, không phải ${res}.`); }
  });
  try { await c.until(t, () => got.size === keys.length, { nudge: `Tìm thẻ có ${word} bằng ${res}. Mỗi cột có một thẻ.`, el: () => t.card(keys.find((k) => !got.has(k))) }); } finally { off(); }
  return keys;
}
const openCol = async (t, i) => { for (const f of t.cols[i].facts) { t.open(f.key); sfx.pop?.(1); await sleep(160); } };

const b8 = {
  title: 'Bài 8: Bảng cộng (qua 10)',
  setup: (board) => createTable(board, addCols()),
  steps: [
    async (c) => {
      const t = c.t;
      await c.say('Đây là bảng cộng qua 10. Cột thứ nhất là 9 cộng với một số.', 'Bảng cộng qua 10: cột <b>9 +</b>');
      await openCol(t, 0);
      await c.say('9 cộng 2 bằng 11, 9 cộng 3 bằng 12, cứ thế đến 9 cộng 9 bằng 18. Số hạng thứ hai thêm 1 thì tổng thêm 1.', 'Số hạng thêm 1 → tổng <b>thêm 1</b>');
    },
    async (c) => {
      const t = c.t;
      await c.say('Cột thứ hai là 8 cộng với một số. Chạm vào từng thẻ để xem kết quả. Nhẩm trước rồi chạm.', 'Chạm từng thẻ cột <b>8 +</b>');
      await flipColumn(c, t, 1, 'Chạm vào thẻ còn dấu hỏi ở cột 8 cộng.');
      await c.say('8 cộng 3 bằng 11, rồi tăng dần đến 8 cộng 9 bằng 17.', '8 + 3 = 11 … 8 + 9 = 17');
      await openCol(t, 2); await openCol(t, 3);
    },
    async (c) => {
      const t = c.t;
      await c.say('Tìm tất cả các thẻ có kết quả bằng 12. Chạm vào các thẻ đó.', 'Chạm các thẻ có kết quả <b>= 12</b>');
      await findAll(c, t, 12, 'kết quả');
      await c.say('9 cộng 3, 8 cộng 4, 7 cộng 5, 6 cộng 6: đều bằng 12.', '9 + 3 = 8 + 4 = 7 + 5 = 6 + 6 = <b>12</b>');
    },
    async (c) => {
      c.show('8 + 5 = 13. Vậy <b>5 + 8</b> = ?');
      await c.say('8 cộng 5 bằng 13. Vậy 5 cộng 8 bằng mấy?');
      await c.choose(nums([3, 12, 13]), 13, { hint: 'Đổi chỗ các số hạng thì tổng không đổi.' });
      await c.say('Đổi chỗ các số hạng thì tổng không đổi: 5 cộng 8 cũng bằng 13.', 'Đổi chỗ số hạng, <b>tổng không đổi</b>');
    },
  ],
};

const b12 = {
  title: 'Bài 12: Bảng trừ (qua 10)',
  setup: (board) => createTable(board, subCols()),
  steps: [
    async (c) => {
      const t = c.t;
      await c.say('Đây là bảng trừ qua 10. Cột thứ nhất là 11 trừ đi một số.', 'Bảng trừ qua 10: cột <b>11 −</b>');
      await openCol(t, 0);
      await c.say('11 trừ 2 bằng 9, 11 trừ 3 bằng 8, cứ thế đến 11 trừ 9 bằng 2. Số trừ thêm 1 thì hiệu bớt 1.', 'Số trừ thêm 1 → hiệu <b>bớt 1</b>');
    },
    async (c) => {
      const t = c.t;
      await c.say('Cột thứ hai là 12 trừ đi một số. Nhẩm rồi chạm vào từng thẻ để xem kết quả.', 'Chạm từng thẻ cột <b>12 −</b>');
      await flipColumn(c, t, 1, 'Chạm vào thẻ còn dấu hỏi ở cột 12 trừ.');
      await openCol(t, 2); await openCol(t, 3);
    },
    async (c) => {
      const t = c.t;
      await c.say('Tìm tất cả các phép trừ có hiệu bằng 7.', 'Chạm các thẻ có hiệu <b>= 7</b>');
      await findAll(c, t, 7, 'hiệu');
      await c.say('11 trừ 4, 12 trừ 5, 13 trừ 6, 14 trừ 7: đều bằng 7.', `11 − 4 = 12 − 5 = 13 − 6 = 14 − 7 = <b>7</b>`);
    },
    async (c) => {
      c.show(`9 + 4 = 13. Vậy <b>13 ${MINUS} 4</b> = ?`);
      await c.say('9 cộng 4 bằng 13. Vậy 13 trừ 4 bằng mấy?');
      await c.choose(nums([4, 9, 17]), 9, { hint: 'Lấy tổng trừ đi số hạng này thì được số hạng kia.' });
      await c.say('Lấy tổng trừ đi một số hạng thì được số hạng kia: 13 trừ 4 bằng 9. Dùng bảng cộng để nhớ bảng trừ.', `9 + 4 = 13 → <b>13 − 4 = 9</b>`);
    },
  ],
};

// ── Bài toán có lời văn: cảnh có con vật, bảng bài giải ───────────────────────────────────────────────
/** Tờ bài giải: các dòng hiện dần. */
async function solution(c, t, lines) {
  t.draw('');
  const T = t.tall, x = T ? 60 : 90, w = T ? 880 : 820, y = T ? 180 : 140, lh = T ? 110 : 96, fs = T ? 50 : 46;
  t.add(`<rect x="${x}" y="${y}" width="${w}" height="${lines.length * lh + 120}" rx="22" fill="#fff" stroke="#E2E8F0" stroke-width="4"/>
    <text class="x2a-t" x="500" y="${y + 52}" font-size="${fs}" fill="#B45309">Bài giải</text>`);
  for (let i = 0; i < lines.length; i++) {
    const [txt, say] = lines[i];
    const e = t.add(`<text class="x2a-t" x="500" y="${y + 130 + i * lh}" font-size="${fs}" fill="${i === lines.length - 1 ? '#166534' : INK}">${txt}</text>`);
    await t.anim(e, [{ opacity: 0, transform: 'translateX(-30px)' }, { opacity: 1, transform: 'none' }], 300, { fill: 'backwards' });
    if (say) await c.say(say, txt);
  }
}
const yard = skyGrass(0.34, { trees: false });

/** Đặt n con vật thành hàng (tối đa 2 hàng) quanh vùng [x0, x1] × y. */
function herd(t, n, { x0, x1, y, art, s = 1, cols = 8, rowH = 120, tap = '' }) {
  const per = Math.min(n, cols), gap = per > 1 ? (x1 - x0) / (per - 1) : 0;
  return Array.from({ length: n }, (_, i) => {
    const x = x0 + (i % cols) * gap, yy = y + Math.floor(i / cols) * rowH;
    return t.add(`<g ${tap ? `data-tap="${tap}:${i}"` : 'class="x2a-off"'} transform="translate(${x} ${yy}) scale(${s})">${art}</g>`);
  });
}

const b9 = {
  title: 'Bài 9: Bài toán về thêm, bớt một số đơn vị',
  setup: (board) => createStage(board, { bg: yard }),
  steps: [
    async (c) => {
      const t = c.t;
      const T = t.tall;
      const S = T ? 1.2 : 1.05;
      t.add(`<g>${T ? `<path d="M-200 ${700} H1200" stroke="#A16207" stroke-width="10"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => `<path d="M${i * 100} 670 V730" stroke="#A16207" stroke-width="10"/>`).join('')}`
        : `<path d="M650 230 V640" stroke="#A16207" stroke-width="10"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M630 ${250 + i * 95} H670" stroke="#A16207" stroke-width="10"/>`).join('')}`}</g>`);
      herd(t, 6, { x0: T ? 110 : 80, x1: T ? 890 : 580, y: T ? 400 : 330, art: ART.hen, s: S, cols: 6 });
      const comers = herd(t, 5, { x0: T ? 150 : 740, x1: T ? 850 : 900, y: T ? 860 : 300, art: ART.hen, s: S, cols: T ? 5 : 2, rowH: 140, tap: 'h' });
      t.caption('Trên sân có <b>6</b> con gà');
      await c.say('Trên sân có 6 con gà. Lúc sau có thêm 5 con gà chạy đến. Chạm vào từng con gà để gọi chúng vào sân.', 'Có thêm <b>5</b> con: chạm để gọi vào sân');
      let came = 0;
      const off = t.on(async (ev, key, g) => {
        if (ev !== 'tap' || !key.startsWith('h:') || g.classList.contains('x2a-off')) return;
        g.classList.add('x2a-off'); came++;
        const k = 6 + came - 1, col = k % 6, row = Math.floor(k / 6);
        const tx = (T ? 110 : 80) + col * ((T ? 780 : 500) / 5), ty = (T ? 400 : 330) + (row ? (T ? 160 : 150) : 0);
        const [x0, y0] = g.getAttribute('transform').match(/[-\d.]+/g).map(Number);
        g.setAttribute('transform', `translate(${tx} ${ty}) scale(${S})`);
        sfx.pop?.(came);
        await t.flyIn(g, x0 - tx, y0 - ty, 520, { lift: 40 });
        t.emit('came', came);
      });
      await c.until(t, () => came >= 5, { nudge: 'Chạm vào con gà đang đứng ngoài sân.', el: () => comers.find((g) => !g.classList.contains('x2a-off')) });
      off();
      t.caption('6 con, thêm 5 con');
      await c.say('Bây giờ trên sân có tất cả bao nhiêu con gà?');
    },
    async (c) => {
      const t = c.t;
      c.show('Chọn phép tính đúng');
      await c.choose([{ html: '6 + 5 = 11', value: 1 }, { html: `6 ${MINUS} 5 = 1`, value: 2 }], 1, { hint: 'Có thêm con gà thì số gà nhiều lên: phép cộng.' });
      t.caption('');
      await solution(c, t, [
        ['Số con gà có tất cả là:', 'Bài giải. Số con gà có tất cả là:'],
        ['6 + 5 = 11 (con)', '6 cộng 5 bằng 11 con.'],
        ['Đáp số: 11 con gà.', 'Đáp số: 11 con gà.'],
      ]);
      await c.say('Thêm thì làm phép cộng.', '<b>Thêm</b> → phép cộng');
    },
    async (c) => {
      const t = c.t;
      t.draw('');
      t.bg(skyGrass(0.8));
      const T = t.tall, wy = T ? 420 : 300;
      t.add(`<path d="M-200 ${wy + 40} Q 500 ${wy + 80} 1200 ${wy + 40}" stroke="#78350F" stroke-width="16" fill="none" stroke-linecap="round"/>`);
      const birds = herd(t, 16, { x0: T ? 90 : 70, x1: T ? 910 : 930, y: wy, art: ART.bird, s: T ? 0.95 : 0.8, cols: 8, rowH: T ? 220 : 200, tap: 'b' });
      if (true) t.add(`<path d="M-200 ${wy + 40 + (T ? 220 : 200)} Q 500 ${wy + 80 + (T ? 220 : 200)} 1200 ${wy + 40 + (T ? 220 : 200)}" stroke="#78350F" stroke-width="16" fill="none" stroke-linecap="round"/>`);
      birds.forEach((b) => t.layer.append(b));
      t.caption('Có <b>16</b> con chim');
      await c.say('Trên cành có 16 con chim đang đậu. Lúc sau có 5 con bay đi. Chạm vào 5 con chim để chúng bay đi.', 'Chạm <b>5</b> con chim cho bay đi');
      let gone = 0;
      const off = t.on(async (ev, key, g) => {
        if (ev !== 'tap' || !key.startsWith('b:') || g.classList.contains('x2a-off') || gone >= 5) return;
        g.classList.add('x2a-off'); gone++; sfx.swish?.();
        t.anim(g, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translate(260px, -420px)' }], 700, { fill: 'forwards', easing: 'ease-in' });
        t.emit('gone', gone);
      });
      await c.until(t, () => gone >= 5, { nudge: 'Chạm vào một con chim đang đậu.', el: () => birds.find((g) => !g.classList.contains('x2a-off')) });
      off();
      await sleep(500);
      t.caption('16 con, bay đi 5 con');
      await c.say('Trên cành còn lại bao nhiêu con chim?');
    },
    async (c) => {
      const t = c.t;
      c.show('Chọn phép tính đúng');
      await c.choose([{ html: '16 + 5 = 21', value: 2 }, { html: `16 ${MINUS} 5 = 11`, value: 1 }], 1, { hint: 'Chim bay đi thì số chim ít đi: phép trừ.' });
      t.caption('');
      t.bg(yard);
      await solution(c, t, [
        ['Số con chim còn lại là:', 'Bài giải. Trên cành còn lại số con chim là:'],
        [`16 ${MINUS} 5 = 11 (con)`, '16 trừ 5 bằng 11 con.'],
        ['Đáp số: 11 con chim.', 'Đáp số: 11 con chim.'],
      ]);
      await c.say('Bớt, bay đi, còn lại thì làm phép trừ.', '<b>Bớt</b> → phép trừ');
    },
    async (c) => {
      const t = c.t;
      t.draw('');
      t.add(`<rect x="${t.tall ? 60 : 90}" y="${t.tall ? 300 : 220}" width="${t.tall ? 880 : 820}" height="${t.tall ? 360 : 300}" rx="22" fill="#fff" stroke="#E2E8F0" stroke-width="4"/>
        <text class="x2a-t" x="500" y="${t.tall ? 380 : 290}" font-size="48" fill="#B45309">Tóm tắt</text>
        <text class="x2a-t" x="500" y="${t.tall ? 470 : 370}" font-size="48">Có: 45 con gà</text>
        <text class="x2a-t" x="500" y="${t.tall ? 550 : 440}" font-size="48">Bán: 14 con gà</text>
        <text class="x2a-t" x="500" y="${t.tall ? 630 : 510}" font-size="48" fill="#2563EB">Còn lại: … con gà?</text>`);
      await c.say('Có 45 con gà, bán 14 con gà. Còn lại bao nhiêu con gà? Chọn phép tính.', 'Còn lại: chọn phép tính');
      await c.choose([{ html: '45 + 14 = 59', value: 2 }, { html: `45 ${MINUS} 14 = 31`, value: 1 }], 1, { hint: 'Bán đi thì còn lại ít hơn.' });
      await c.say('Đúng rồi! Còn lại 31 con gà.', `45 − 14 = <b>31</b> (con)`);
    },
  ],
};

// ── Bài 13: nhiều hơn, ít hơn ─────────────────────────────────────────────────────────────────────────
const b13 = {
  title: 'Bài 13: Bài toán về nhiều hơn, ít hơn một số đơn vị',
  setup: (board) => createStage(board, { bg: skyGrass(0.2, { trees: false }) }),
  steps: [
    async (c) => {
      const t = c.t;
      const T = t.tall;
      const cols = T ? 7 : 13, gap = T ? 135 : 68, x0 = T ? 95 : 80, y1 = T ? 330 : 290, y2 = T ? 720 : 520, s = T ? 1.1 : 0.6, rowH = 135;
      const at = (i, y) => `translate(${x0 + (i % cols) * gap} ${y + Math.floor(i / cols) * rowH})`;
      t.lay = { gap, x0, y1, y2, s };
      t.add(`<text class="x2a-t x2a-halo" x="${x0 - 40}" y="${y1 - 80}" font-size="42" style="text-anchor:start">Việt: 9 bông</text>
        <text class="x2a-t x2a-halo" x="${x0 - 40}" y="${y2 - 80}" font-size="42" style="text-anchor:start" fill="#BE185D">Mai: nhiều hơn Việt 4 bông</text>`);
      herd(t, 9, { x0, x1: x0 + (Math.min(9, cols) - 1) * gap, y: y1, art: ART.flower, s, cols, rowH });
      const slots = Array.from({ length: 13 }, (_, i) => t.add(`<g transform="${at(i, y2)}"><circle r="${T ? 52 : 30}" fill="#fff" stroke="#F9A8D4" stroke-width="3" stroke-dasharray="8 6"/></g>`));
      t.slots = slots;
      await c.say('Việt cắt được 9 bông hoa. Mai cắt được nhiều hơn Việt 4 bông hoa. Hỏi Mai cắt được bao nhiêu bông?', 'Mai <b>nhiều hơn</b> Việt 4 bông');
      await c.say('Mai có bằng số hoa của Việt, rồi thêm 4 bông nữa.', 'Bằng của Việt …');
      for (let i = 0; i < 9; i++) {
        const g = t.add(`<g transform="${at(i, y2)} scale(${s})">${ART.flower}</g>`);
        t.flyIn(g, 0, y1 - y2, 420, { lift: 20 });
        await sleep(90);
      }
      await sleep(400);
      slots.slice(9).forEach((e, i) => { e.setAttribute('data-tap', `s:${9 + i}`); e.classList.add('x2a-blink'); });
      await c.say('Chạm vào các ô trống để thêm 4 bông nữa cho Mai.', '… và <b>thêm 4 bông</b>: chạm ô trống');
      let added = 0;
      const off = t.on((ev, key, g) => {
        if (ev !== 'tap' || !key.startsWith('s:') || g.classList.contains('x2a-off')) return;
        g.classList.add('x2a-off'); g.classList.remove('x2a-blink'); added++;
        const f = t.add(`<g transform="${g.getAttribute('transform')} scale(${s})">${ART.flower}</g>`);
        t.pop(f); sfx.pop?.(added);
        t.emit('add', added);
      });
      await c.until(t, () => added >= 4, { nudge: 'Chạm vào ô tròn còn trống ở hàng của Mai.', el: () => slots.find((g, i) => i >= 9 && !g.classList.contains('x2a-off')) });
      off();
      c.show('Mai có mấy bông? Chọn phép tính');
      await c.choose([{ html: '9 + 4 = 13', value: 1 }, { html: `9 ${MINUS} 4 = 5`, value: 2 }], 1, { hint: 'Nhiều hơn thì thêm vào: phép cộng.' });
      t.caption('Mai cắt được: 9 + 4 = <b>13</b> (bông)');
      await c.say('Mai cắt được 9 cộng 4 bằng 13 bông hoa. Nhiều hơn thì làm phép cộng.', '<b>Nhiều hơn</b> → phép cộng');
    },
    async (c) => {
      const t = c.use((b) => createStage(b, { bg: skyGrass(0.2, { trees: false }) }));
      const T = t.tall;
      const cols = T ? 6 : 12, gap = T ? 160 : 70, x0 = T ? 100 : 115, y1 = T ? 330 : 290, y2 = T ? 720 : 520, s = T ? 1.3 : 0.72, rowH = 130;
      t.add(`<text class="x2a-t x2a-halo" x="${x0 - 50}" y="${y1 - 85}" font-size="42" style="text-anchor:start">Sóc nâu: 12 hạt dẻ</text>
        <text class="x2a-t x2a-halo" x="${x0 - 50}" y="${y2 - 85}" font-size="42" style="text-anchor:start" fill="#475569">Sóc xám: ít hơn sóc nâu 3 hạt</text>`);
      herd(t, 12, { x0, x1: x0 + (cols - 1) * gap, y: y1, art: ART.nut, s, cols, rowH });
      const low = herd(t, 12, { x0, x1: x0 + (cols - 1) * gap, y: y2, art: ART.nut, s, cols, rowH, tap: 'n' });
      await c.say('Sóc nâu nhặt được 12 hạt dẻ. Sóc xám nhặt được ít hơn sóc nâu 3 hạt dẻ. Hàng dưới đang có bằng sóc nâu. Chạm để bớt đi 3 hạt.', 'Sóc xám <b>ít hơn</b> 3 hạt: chạm để bớt 3 hạt');
      let gone = 0;
      const off = t.on(async (ev, key, g) => {
        if (ev !== 'tap' || !key.startsWith('n:') || g.classList.contains('x2a-off') || gone >= 3) return;
        g.classList.add('x2a-off'); gone++; sfx.tap?.();
        await t.anim(g, [{ opacity: 1 }, { opacity: 0.15 }], 300, { fill: 'forwards' });
        t.emit('gone', gone);
      });
      await c.until(t, () => gone >= 3, { nudge: 'Chạm vào hạt dẻ ở hàng dưới.', el: () => low.slice().reverse().find((g) => !g.classList.contains('x2a-off')) });
      off();
      c.show('Sóc xám có mấy hạt? Chọn phép tính');
      await c.choose([{ html: '12 + 3 = 15', value: 2 }, { html: `12 ${MINUS} 3 = 9`, value: 1 }], 1, { hint: 'Ít hơn thì bớt đi: phép trừ.' });
      t.caption(`Sóc xám nhặt được: 12 ${MINUS} 3 = <b>9</b> (hạt)`);
      await c.say('Sóc xám nhặt được 12 trừ 3 bằng 9 hạt dẻ. Ít hơn thì làm phép trừ.', '<b>Ít hơn</b> → phép trừ');
    },
    async (c) => {
      const t = c.t;
      t.draw('');
      t.caption('');
      await solution(c, t, [
        ['Số hạt dẻ sóc xám nhặt được là:', 'Bài giải. Số hạt dẻ sóc xám nhặt được là:'],
        [`12 ${MINUS} 3 = 9 (hạt dẻ)`, '12 trừ 3 bằng 9 hạt dẻ.'],
        ['Đáp số: 9 hạt dẻ.', 'Đáp số: 9 hạt dẻ.'],
      ]);
    },
    async (c) => {
      const t = c.t;
      t.draw('');
      t.add(`<rect x="${t.tall ? 60 : 90}" y="${t.tall ? 300 : 220}" width="${t.tall ? 880 : 820}" height="${t.tall ? 300 : 260}" rx="22" fill="#fff" stroke="#E2E8F0" stroke-width="4"/>
        <text class="x2a-t" x="500" y="${t.tall ? 390 : 300}" font-size="46">Hàng trên: 11 ô tô</text>
        <text class="x2a-t" x="500" y="${t.tall ? 490 : 390}" font-size="46">Hàng dưới ít hơn hàng trên: 3 ô tô</text>`);
      await c.say('Hàng trên có 11 ô tô. Hàng dưới ít hơn hàng trên 3 ô tô. Hàng dưới có mấy ô tô? Chọn phép tính.', 'Hàng dưới: chọn phép tính');
      await c.choose([{ html: `11 ${MINUS} 3 = 8`, value: 1 }, { html: '11 + 3 = 14', value: 2 }], 1, { hint: 'Ít hơn thì làm phép trừ.' });
      await c.say('Đúng! Hàng dưới có 8 ô tô.', `11 − 3 = <b>8</b> (ô tô)`);
    },
  ],
};

export const CALC20_EXPLORES = { b7, b8, b9, b11, b12, b13 };
