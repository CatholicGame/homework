/**
 * Bài 1 (Ôn tập các số đến 100), Bài 2 (Tia số, số liền trước, liền sau), Bài 3 (Các thành phần của phép cộng, phép trừ),
 * Bài 4 (Hơn, kém nhau bao nhiêu), Bài 5 (Ôn tập phép cộng, phép trừ không nhớ trong phạm vi 100).
 */

import { createSticks, buildSticks } from './sticks.js';
import { createStage, skyGrass, waitTap, tokens, tag, sleep, sfx, INK, MINUS } from './stage.js';
import { ART } from './art.js';
import { columnStep } from './colrun.js';
import { createLine } from '../../grade4Tools/line.js';

const cmpOpts = [{ html: '&gt;', value: '>' }, { html: '&lt;', value: '<' }, { html: '=', value: '=' }];

// ── Bài 1: que tính, chục và đơn vị ───────────────────────────────────────────────────────────────────
const b1 = {
  title: 'Bài 1: Ôn tập các số đến 100',
  setup: (board) => { const t = createSticks(board, { value: 9 }); t.lock(true); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      await c.say('Đây là que tính. Bên phải là que rời, mỗi que là 1 đơn vị. Đang có 9 que.', 'Mỗi que rời là <b>1 đơn vị</b>');
      t.allow({ addOne: true });
      await c.say('Bấm thêm 1 que cho đủ 10 que.', 'Bấm <b>+ 1 que</b>');
      await c.until(t, () => t.ones >= 10 && !t.busy, { nudge: 'Bấm nút "cộng 1 que" màu xanh lá.', el: () => t.btn('addOne') });
      t.allow({ bundle: true });
      await c.say('Đủ 10 que rồi. Bấm Bó lại để buộc thành 1 bó.', 'Đủ 10 que: bấm <b>🎀 Bó lại</b>');
      await c.until(t, () => t.tens === 1 && !t.busy, { nudge: 'Bấm nút "Bó lại" màu hồng.', el: () => t.btn('bundle') });
      t.lock(true);
      await c.say('10 đơn vị bằng 1 chục. Mỗi bó là 1 chục.', '<b>10 đơn vị = 1 chục</b>');
    },
    async (c) => {
      const t = c.t;
      t.set(0);
      t.allow({ addTen: true, addOne: true, takeOne: true, takeTen: true });
      await c.say('Em lấy que tính để được số 35.', 'Lấy que tính được số <b>35</b>');
      await buildSticks(c, t, 35);
      t.lock(true);
      t.glow('tens'); await c.say('3 bó là 3 chục.', '<b>3</b> chục');
      t.glow('ones'); await c.say('5 que rời là 5 đơn vị.', '<b>5</b> đơn vị');
      t.glow(null);
      c.t.caption('35 = 30 + 5');
      await c.say('Số 35 gồm 3 chục và 5 đơn vị. Viết thành 35 bằng 30 cộng 5.', '35 gồm 3 chục và 5 đơn vị<br><b>35 = 30 + 5</b>');
    },
    async (c) => {
      c.show('Số <b>35</b> đọc là gì?');
      await c.say('Số 35 đọc là gì?');
      await c.choose([{ html: 'ba mươi lăm', value: 1 }, { html: 'ba mươi năm', value: 2 }, { html: 'năm mươi ba', value: 3 }], 1,
        { hint: 'Đọc số chục trước: ba mươi. Chữ số 5 ở cuối đọc là lăm.' });
      await c.say('Đúng rồi! Ba mươi lăm. Chữ số 5 đứng sau mươi thì đọc là lăm.', 'Đọc là: <b>ba mươi lăm</b>');
    },
    async (c) => {
      const t = c.t;
      t.caption('35 và 53');
      t.set(53);
      await c.say('Còn đây là số 53: 5 chục và 3 đơn vị.', '<b>53</b> gồm 5 chục và 3 đơn vị');
      t.glow('tens');
      c.show('35 <b>?</b> 53');
      await c.say('So sánh 35 và 53: so số chục trước. Chọn dấu đúng.', 'So sánh: 35 <b>?</b> 53');
      await c.choose(cmpOpts, '<', { hint: '35 có 3 chục, 53 có 5 chục. Số nào nhiều chục hơn thì lớn hơn.' });
      t.glow(null);
      t.caption('35 &lt; 53');
      await c.say('3 chục bé hơn 5 chục, nên 35 bé hơn 53.', '<b>35 &lt; 53</b>');
    },
  ],
};

// ── Bài 2: tia số, số liền trước, số liền sau ─────────────────────────────────────────────────────────
async function tapLine(c, t, v, { nudge, wrong } = {}) {
  let hit = false;
  const off = t.on((ev, x) => { if (ev !== 'tap') return; if (x === v) hit = true; else c.hint(wrong); });
  try { await c.until(t, () => hit, { nudge }); } finally { off(); }
}
const b2 = {
  title: 'Bài 2: Tia số. Số liền trước, số liền sau',
  setup: (board) => createLine(board, { lo: 0, hi: 10, step: 1, caption: true }),
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('Tia số: các số lớn dần từ trái sang phải');
      for (const v of [3, 6, 8]) t.blank(v);
      t.hopper(0);
      await c.say('Đây là tia số. Số 0 ở đầu, các vạch cách đều nhau, mỗi bước sang phải là thêm 1. Bấm vào các ô dấu hỏi theo thứ tự để châu chấu nhảy tới.', 'Bấm các ô <b>?</b> theo thứ tự');
      let next = 1;
      for (const want of [3, 6, 8]) {
        await tapLine(c, t, want, { nudge: 'Bấm vào ô có dấu hỏi gần châu chấu nhất.', wrong: 'Châu chấu nhảy lần lượt, bấm ô dấu hỏi gần nhất bên phải.' });
        while (next <= want) { await t.hop(next, { label: next !== want }); next++; }
        t.fillBlank(want);
        sfx.ding();
      }
      await c.say('Giỏi lắm! Số bên phải lớn hơn số bên trái.', 'Trên tia số: số bên phải <b>lớn hơn</b>');
    },
    async (c) => {
      const t = c.use((b) => createLine(b, { lo: 10, hi: 20, step: 1, caption: true }));
      t.flag(14, { color: '#2563EB' });
      t.caption('Số liền sau của <b>14</b>');
      await c.say('Số liền sau của 14 là số đứng ngay bên phải 14, lớn hơn 14 một đơn vị. Bấm vào số đó trên tia số.', 'Bấm vào <b>số liền sau</b> của 14');
      await tapLine(c, t, 15, { nudge: 'Số liền sau đứng ngay bên phải số 14.', wrong: 'Số liền sau đứng ngay bên phải số 14.' });
      t.pin(15, { color: '#16A34A' }); sfx.ding();
      t.caption('Số liền trước của <b>14</b>');
      await c.say('Đúng rồi, 15. Còn số liền trước của 14 thì đứng ngay bên trái. Bấm vào số đó.', 'Bấm vào <b>số liền trước</b> của 14');
      await tapLine(c, t, 13, { nudge: 'Số liền trước đứng ngay bên trái số 14.', wrong: 'Số liền trước đứng ngay bên trái số 14.' });
      t.pin(13, { color: '#EA580C' }); sfx.ding();
      t.caption('13 → <b>14</b> → 15');
      await c.say('13 là số liền trước của 14. 15 là số liền sau của 14.', '<b>13</b> liền trước · <b>15</b> liền sau');
    },
    async (c) => {
      const t = c.use((b) => createLine(b, { lo: 30, hi: 40, step: 1, caption: true }));
      t.flag(39, { color: '#2563EB' });
      t.caption('Số liền sau của <b>39</b> là?');
      await c.say('Số liền sau của 39 là số nào?');
      await c.choose([{ html: '38', value: 38 }, { html: '40', value: 40 }, { html: '30', value: 30 }], 40, { hint: 'Thêm 1 vào 39. 9 đơn vị thêm 1 được 1 chục.' });
      t.pin(40, { color: '#16A34A' });
      t.caption('39 + 1 = <b>40</b>');
      await c.say('39 thêm 1 là 40. Số liền sau của 39 là 40.');
      t.caption('Số liền trước của <b>30</b> là?');
      await c.say('Số liền trước của 30 là số nào?');
      await c.choose([{ html: '29', value: 29 }, { html: '31', value: 31 }, { html: '20', value: 20 }], 29, { hint: 'Bớt 1 từ 30.' });
      t.caption('30 − 1 = <b>29</b>');
      await c.say('30 bớt 1 là 29.');
    },
    async (c) => {
      const t = c.t;
      t.clearMarks();
      t.pin(36, { color: '#2563EB' }); t.pin(33, { color: '#EA580C' });
      t.caption('36 <b>?</b> 33');
      await c.say('Trên tia số, 36 ở bên phải 33. Chọn dấu đúng.', '36 <b>?</b> 33');
      await c.choose(cmpOpts, '>', { hint: 'Số ở bên phải thì lớn hơn.' });
      t.caption('<b>36 &gt; 33</b>');
      await c.say('36 lớn hơn 33. Số ở bên phải trên tia số thì lớn hơn.');
    },
  ],
};

// ── Bài 3: số hạng, tổng; số bị trừ, số trừ, hiệu ─────────────────────────────────────────────────────
function fruitRow(t, n, x0, y, gap, art = ART.apple, s = 0.9) {
  return Array.from({ length: n }, (_, i) => t.add(`<g class="x2a-fruit" data-tap="f:${i}" transform="translate(${x0 + i * gap} ${y}) scale(${s})">${art}</g>`));
}
const b3 = {
  title: 'Bài 3: Các thành phần của phép cộng, phép trừ',
  setup: (board) => createStage(board, { bg: skyGrass(0.36, { trees: false }) }),
  steps: [
    async (c) => {
      const t = c.t;
      const T = t.tall, fy = T ? 330 : 260, ey = T ? 720 : 470, ly = T ? 860 : 590;
      t.draw('');
      const red = fruitRow(t, 5, T ? 140 : 90, fy, T ? 180 : 110, ART.apple, T ? 1.5 : 1.3);
      const green = fruitRow(t, 3, T ? 320 : 670, T ? fy + 170 : fy, T ? 180 : 110, ART.greenApple, T ? 1.5 : 1.3);
      await t.anim([...red, ...green], [{ opacity: 0, transform: 'translateY(-60px)' }, { opacity: 1, transform: 'none' }], 380, { stagger: 70, fill: 'backwards' });
      await c.say('Có 5 quả táo đỏ và 3 quả táo xanh. Gộp lại được 8 quả.', '5 quả và 3 quả: gộp lại được 8 quả');
      const tk = tokens(t, ['5', '+', '3', '=', '8'], 500, ey, T ? 150 : 130);
      await t.anim(tk.map((k) => k.el), [{ opacity: 0, transform: 'scale(0.4)' }, { opacity: 1, transform: 'none' }], 300, { stagger: 120, fill: 'backwards' });
      t.tk = tk; t.ly = ly;
      await c.say('Trong phép cộng 5 cộng 3 bằng 8:', '<b>5 + 3 = 8</b>');
      for (const [i, name] of [[0, 'Số hạng'], [2, 'Số hạng'], [4, 'Tổng']]) {
        const g = tag(t, tk[i].x, ly, name, i === 4 ? { fill: '#DCFCE7', ink: '#166534' } : {});
        await t.anim(g, [{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'none' }], 320, { fill: 'backwards' });
      }
      await c.say('5 và 3 là số hạng. 8 là tổng. 5 cộng 3 cũng gọi là tổng.', '5 và 3 là <b>số hạng</b>, 8 là <b>tổng</b><br>5 + 3 cũng gọi là tổng');
    },
    async (c) => {
      const t = c.t;
      t.qa('.x2a-tag').forEach((g) => g.remove());
      await c.say('Chạm vào tổng của phép cộng này.', 'Chạm vào <b>tổng</b>');
      await waitTap(c, t, (k) => k === 'tok:4', { nudge: 'Tổng là kết quả, đứng sau dấu bằng.', bad: () => c.hint('Tổng là kết quả của phép cộng, đứng sau dấu bằng.') });
      t.tk[4].el.setAttribute('fill', '#16A34A');
      sfx.ding();
      tag(t, t.tk[4].x, t.ly, 'Tổng', { fill: '#DCFCE7', ink: '#166534' });
      await c.say('Đúng rồi! 8 là tổng.');
    },
    async (c) => {
      const t = c.t;
      const T = t.tall, fy = T ? 330 : 260, ey = T ? 720 : 470, ly = T ? 860 : 590;
      t.draw('');
      const all = T ? [...fruitRow(t, 4, 230, fy, 180, ART.apple, 1.5), ...fruitRow(t, 4, 230, fy + 170, 180, ART.apple, 1.5)] : fruitRow(t, 8, 115, fy, 110, ART.apple, 1.2);
      all.forEach((g, i) => { g.dataset.tap = `f:${i}`; });
      t.caption('Có 8 quả, lấy đi 3 quả');
      await c.say('Có 8 quả táo. Em chạm vào 3 quả để lấy đi.', 'Chạm để lấy đi <b>3 quả</b>');
      let taken = 0;
      const off = t.on(async (ev, k, g) => {
        if (ev !== 'tap' || !k.startsWith('f:') || g.classList.contains('x2a-off') || taken >= 3) return;
        g.classList.add('x2a-off'); taken++; sfx.pop?.(taken);
        await t.anim(g, [{ opacity: 1 }, { opacity: 0.18 }], 300, { fill: 'forwards' });
        t.emit('taken', taken);
      });
      await c.until(t, () => taken >= 3, { nudge: 'Chạm vào từng quả táo.', el: () => all.find((g) => !g.classList.contains('x2a-off')) });
      off();
      all.forEach((g) => g.classList.add('x2a-off'));
      const tk = tokens(t, ['8', MINUS, '3', '=', '5'], 500, ey, T ? 150 : 130, { tap: false });
      await t.anim(tk.map((k) => k.el), [{ opacity: 0, transform: 'scale(0.4)' }, { opacity: 1, transform: 'none' }], 300, { stagger: 120, fill: 'backwards' });
      t.caption('');
      await c.say('Còn lại 5 quả. Ta có phép trừ 8 trừ 3 bằng 5.', '<b>8 − 3 = 5</b>');
      const names = [['8', 'Số bị trừ', 0], ['3', 'Số trừ', 2], ['5', 'Hiệu', 4]];
      for (const [n, name, i] of names) {
        tk[i].el.setAttribute('fill', '#DC2626');
        c.show(`Số <b>${n}</b> gọi là gì?`);
        await c.choose(['Số bị trừ', 'Số trừ', 'Hiệu'].map((x) => ({ html: x, value: x })), name,
          { hint: 'Số bị trừ đứng đầu, số trừ đứng sau dấu trừ, hiệu là kết quả.' });
        tk[i].el.setAttribute('fill', INK);
        tag(t, tk[i].x, ly, name, i === 4 ? { fill: '#DCFCE7', ink: '#166534' } : { fill: '#FFE4E6', ink: '#9F1239' });
        await c.say(`${n} là ${name.toLowerCase()}.`);
      }
      await c.say('8 trừ 3 cũng gọi là hiệu.', '8 − 3 cũng gọi là <b>hiệu</b>');
    },
    async (c) => {
      const t = c.t;
      t.caption('Từ 8, 3 và 5 lập phép tính');
      await c.say('Từ ba số 8, 3 và 5, lập thêm một phép trừ đúng.', 'Phép trừ nào đúng?');
      await c.choose([{ html: `8 ${MINUS} 5 = 3`, value: 1 }, { html: `5 ${MINUS} 3 = 8`, value: 2 }, { html: `3 ${MINUS} 8 = 5`, value: 3 }], 1,
        { hint: 'Số bị trừ phải là số lớn nhất, chính là tổng 8.' });
      await c.say('Đúng. Lấy tổng trừ đi số hạng này thì được số hạng kia.', `8 − 5 = 3 · 8 − 3 = 5`);
      await c.say('Còn phép cộng nào?', 'Phép cộng nào đúng?');
      await c.choose([{ html: '3 + 5 = 8', value: 1 }, { html: '8 + 3 = 5', value: 2 }, { html: '5 + 8 = 3', value: 3 }], 1, { hint: 'Tổng là số lớn nhất, đứng sau dấu bằng.' });
      t.caption('5 + 3 = 8 · 3 + 5 = 8');
      await c.say('3 cộng 5 cũng bằng 8. Đổi chỗ các số hạng thì tổng không đổi.');
    },
  ],
};

// ── Bài 4: hơn, kém nhau bao nhiêu ────────────────────────────────────────────────────────────────────
const pondBg = (W, H, tall) => {
  const y = H * (tall ? 0.18 : 0.14), py = H * (tall ? 0.6 : 0.62);
  return `<rect x="-2000" y="-2000" width="${W + 4000}" height="${y + 2000}" fill="#BAE6FD"/>
    <rect x="-2000" y="${y}" width="${W + 4000}" height="${H + 2000}" fill="#BBF7D0"/>
    <path d="M-2000 ${y} Q ${W / 3} ${y - 30} ${W / 2} ${y} T ${W + 2000} ${y}" fill="#86EFAC"/>
    <ellipse cx="${W / 2}" cy="${py}" rx="${W * 0.55}" ry="${H * (tall ? 0.13 : 0.16)}" fill="#7DD3FC" stroke="#38BDF8" stroke-width="8"/>
    <path d="M${W * 0.1} ${py + 30} q30 -14 60 0 M${W * 0.75} ${py - 40} q30 -14 60 0" stroke="#E0F2FE" stroke-width="5" fill="none"/>`;
};
const b4 = {
  title: 'Bài 4: Hơn, kém nhau bao nhiêu',
  setup: (board) => createStage(board, { bg: pondBg }),
  steps: [
    async (c) => {
      const t = c.t;
      const T = t.tall, gap = T ? 128 : 120, x0 = T ? 116 : 140, top = T ? 400 : 290, bot = T ? 720 : 496, s = T ? 1.15 : 1;
      t.lay = { gap, x0, top, bot };
      t.draw('');
      t.add(`<text class="x2a-t x2a-halo" x="${x0 - 40}" y="${top - 100}" font-size="40" text-anchor="start" style="text-anchor:start" fill="#166534">Trên bờ</text>`);
      t.add(`<text class="x2a-t x2a-halo" x="${x0 - 40}" y="${bot + 90}" font-size="40" style="text-anchor:start" fill="#0369A1">Dưới ao</text>`);
      t.lines = t.add('<g></g>');
      t.ups = Array.from({ length: 7 }, (_, i) => t.add(`<g class="x2a-off" transform="translate(${x0 + i * gap} ${top}) scale(${s})">${ART.duck}</g>`));
      t.downs = Array.from({ length: 5 }, (_, i) => t.add(`<g data-tap="d:${i}" transform="translate(${x0 + i * gap} ${bot}) scale(${s})">${ART.duck}</g>`));
      await c.say('Trên bờ có 7 con vịt, dưới ao có 5 con vịt. Bên nào nhiều hơn, nhiều hơn mấy con?', 'Trên bờ <b>7</b> con · dưới ao <b>5</b> con');
      await c.say('Ta nối mỗi con dưới ao với một con trên bờ. Chạm vào từng con vịt dưới ao.', 'Chạm từng con vịt <b>dưới ao</b> để nối');
      const done = new Set();
      const off = t.on((ev, k, g) => {
        if (ev !== 'tap' || !k.startsWith('d:')) return;
        const i = +k.slice(2);
        if (done.has(i)) return;
        done.add(i); g.classList.add('x2a-off');
        const x = x0 + i * gap;
        const ln = t.add(`<path d="M${x} ${bot - 50} L${x} ${top + 50}" stroke="#F97316" stroke-width="7" stroke-linecap="round" stroke-dasharray="14 10"/>`, t.lines);
        t.anim(ln, [{ opacity: 0 }, { opacity: 1 }], 250);
        sfx.pop?.(done.size);
        t.emit('pair', done.size);
      });
      await c.until(t, () => done.size >= 5, { nudge: 'Chạm vào con vịt dưới ao chưa được nối.', el: () => t.downs.find((g, i) => !done.has(i)) });
      off();
      t.ups.slice(5).forEach((g) => g.classList.add('x2a-glow', 'x2a-blink'));
      await c.say('Còn 2 con vịt trên bờ không được nối.', 'Thừa ra <b>2 con</b> trên bờ');
    },
    async (c) => {
      const t = c.t;
      c.show('Trên bờ <b>hơn</b> dưới ao mấy con?');
      await c.say('Số vịt trên bờ hơn số vịt dưới ao mấy con?');
      await c.choose([{ html: '2 con', value: 2 }, { html: '5 con', value: 5 }, { html: '12 con', value: 12 }], 2, { hint: 'Đếm số vịt trên bờ không được nối.' });
      c.show('Phép tính nào?');
      await c.say('Muốn tìm hơn bao nhiêu, ta làm phép tính gì?');
      await c.choose([{ html: `7 ${MINUS} 5 = 2`, value: 1 }, { html: '7 + 5 = 12', value: 2 }], 1, { hint: 'Lấy số lớn trừ đi số bé.' });
      t.caption(`7 ${MINUS} 5 = 2`);
      await c.say('7 trừ 5 bằng 2. Trên bờ hơn dưới ao 2 con vịt.', 'Trên bờ <b>hơn</b> dưới ao: 7 − 5 = <b>2</b> (con)');
    },
    async (c) => {
      c.show('Dưới ao <b>kém</b> trên bờ mấy con?');
      await c.say('Vậy số vịt dưới ao kém số vịt trên bờ mấy con?');
      await c.choose([{ html: '2 con', value: 2 }, { html: '7 con', value: 7 }, { html: '5 con', value: 5 }], 2, { hint: 'Hơn 2 con thì bên kia kém 2 con.' });
      await c.say('Đúng rồi! Trên bờ hơn 2 con thì dưới ao kém 2 con. Hơn và kém cùng tính bằng phép trừ: số lớn trừ số bé.', 'Hơn hay kém: <b>số lớn − số bé</b>');
    },
    async (c) => {
      const t = c.t;
      t.draw('');
      const T = t.tall, y1 = T ? 420 : 300, y2 = T ? 640 : 470, u = T ? 50 : 46, x0 = T ? 120 : 160;
      t.add(`<text class="x2a-t x2a-halo" x="${x0 - 20}" y="${y1 - 70}" font-size="40" style="text-anchor:start">Rùa nâu: 16 tuổi</text>
        <rect x="${x0}" y="${y1 - 30}" width="${16 * u}" height="60" rx="12" fill="#A16207" stroke="${INK}" stroke-width="3"/>
        <text class="x2a-t x2a-halo" x="${x0 - 20}" y="${y2 - 70}" font-size="40" style="text-anchor:start">Rùa vàng: 12 tuổi</text>
        <rect x="${x0}" y="${y2 - 30}" width="${12 * u}" height="60" rx="12" fill="#FACC15" stroke="${INK}" stroke-width="3"/>
        <rect class="x2b-gap" x="${x0 + 12 * u}" y="${y2 - 30}" width="${4 * u}" height="60" rx="12" fill="none" stroke="#DC2626" stroke-width="5" stroke-dasharray="12 8" opacity="0"/>`);
      t.caption('Rùa nâu hơn rùa vàng mấy tuổi?');
      await c.say('Rùa nâu 16 tuổi, rùa vàng 12 tuổi. Rùa nâu hơn rùa vàng mấy tuổi? Chọn phép tính.');
      await c.choose([{ html: `16 ${MINUS} 12 = 4`, value: 1 }, { html: '16 + 12 = 28', value: 2 }, { html: `12 ${MINUS} 4 = 8`, value: 3 }], 1, { hint: 'Lấy số tuổi lớn trừ số tuổi bé.' });
      await t.anim('.x2b-gap', [{ opacity: 0 }, { opacity: 1 }], 400, { fill: 'forwards' });
      t.caption(`16 ${MINUS} 12 = <b>4</b> (tuổi)`);
      await c.say('16 trừ 12 bằng 4. Rùa nâu hơn rùa vàng 4 tuổi.');
    },
  ],
};

// ── Bài 5: cộng, trừ không nhớ ────────────────────────────────────────────────────────────────────────
const b5 = {
  title: 'Bài 5: Ôn tập phép cộng, phép trừ (không nhớ)',
  setup: (board) => { const t = createSticks(board, { value: 31 }); t.lock(true); return t; },
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('31 + 4 = ?');
      await c.say('Lớp 2A có 31 học sinh, có thêm 4 bạn chuyển đến. Trên bàn là 31 que tính. Em thêm 4 que.', '31 que, thêm <b>4 que</b>');
      t.allow({ addOne: true, takeOne: true });
      await buildSticks(c, t, 35, { nudge: 'Bấm "cộng 1 que" cho đủ 4 que nữa.' });
      t.lock(true);
      t.caption('31 + 4 = <b>35</b>');
      await c.say('1 đơn vị thêm 4 đơn vị được 5 đơn vị, vẫn 3 chục. 31 cộng 4 bằng 35.', '31 + 4 = <b>35</b>');
    },
    async (c) => { await columnStep(c, '+', 43, 25); },
    async (c) => {
      const t = c.use((b) => createSticks(b, { value: 37 }));
      t.caption(`37 ${MINUS} 13 = ?`);
      await c.say('Nam có 37 viên bi, 13 viên màu xanh. Lấy đi 13 que: 1 bó và 3 que rời. Chạm vào que tính để lấy đi.', `37 que, lấy đi <b>13</b>: 1 bó và 3 que`);
      t.allow({ takeOne: true, takeTen: true });
      let warned = false;
      const off = t.on((ev) => { if (ev === 'change' && (t.tens < 2 || t.ones < 4) && !warned) { warned = true; c.hint('Chỉ lấy đi 1 bó và 3 que rời thôi.'); } });
      await c.until(t, () => t.value === 24 && !t.busy, { nudge: () => (t.tens > 2 ? 'Chạm vào 1 bó để lấy đi.' : 'Chạm vào que rời để lấy đi.'), el: () => (t.tens > 2 ? t.tenEl() : t.oneEl()) });
      off();
      t.lock(true);
      t.caption(`37 ${MINUS} 13 = <b>24</b>`);
      await c.say('Còn 2 bó và 4 que: 24. 37 trừ 13 bằng 24.', `37 − 13 = <b>24</b>`);
    },
    async (c) => { await columnStep(c, '-', 37, 13); },
    async (c) => {
      c.show('Tính nhẩm: <b>40 + 30</b> = ?');
      await c.say('Tính nhẩm: 40 cộng 30. Nghĩ: 4 chục cộng 3 chục.', 'Tính nhẩm: <b>40 + 30</b><br>4 chục + 3 chục = ?');
      await c.choose([{ html: '70', value: 70 }, { html: '43', value: 43 }, { html: '7', value: 7 }], 70, { hint: '4 chục cộng 3 chục bằng 7 chục.' });
      await c.say('4 chục cộng 3 chục bằng 7 chục. 40 cộng 30 bằng 70.', '40 + 30 = <b>70</b>');
    },
  ],
};

export const NUMBER_EXPLORES = { b1, b2, b3, b4, b5 };
