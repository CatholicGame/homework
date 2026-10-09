/**
 * 📊 Thanh ô vuông và sơ đồ đoạn thẳng: Bài 3 (tìm số hạng, số bị trừ, số trừ), Bài 14 (một phần mấy),
 * Bài 24 (gấp lên), Bài 27 (giảm đi), Bài 28 (bài toán hai bước), Bài 39 (số lớn gấp mấy lần số bé).
 * Mỗi ô là 1 đơn vị nên em đếm được; ô bay đi / bay về / thanh được cắt khi em bấm nút ở dải dưới.
 */

import { stage, waitTap, tapTimes, flyFrom, pop, bump, T, R, C, L, BTN, sfx, sleep, INK, anim } from './kit.js';

const BLUE = '#60A5FA', ORANGE = '#FB923C', PINK = '#F472B6', GREEN = '#4ADE80', YEL = '#FDE047';

/** Hàng ô: n ô từ (x, y), mỗi ô rộng s, cao h. */
const cells = (cls, x, y, s, h, n, fill, { dash = false, k0 = 0 } = {}) => [...Array(n)].map((_, i) =>
  `<rect class="${cls}" data-i="${k0 + i}" x="${x + i * s}" y="${y}" width="${s}" height="${h}" rx="${Math.min(8, s * 0.12)}" fill="${dash ? '#fff' : fill}" stroke="${INK}" stroke-opacity="${dash ? 0.45 : 0.7}" stroke-width="${dash ? 2.5 : 3}" ${dash ? 'stroke-dasharray="8 6"' : ''}/>`).join('');
/** Ngoặc trên (up) hoặc dưới một đoạn, có nhãn. */
const brace = (x1, x2, y, label, { up = true, fs = 40, color = INK } = {}) => {
  const d = up ? -1 : 1, m = (x1 + x2) / 2, k = 18 * d;
  return `<g class="x3b-br"><path d="M${x1} ${y} q0 ${k} 14 ${k} H${m - 14} q14 0 14 ${k} q0 ${-k} 14 ${-k} H${x2 - 14} q14 0 14 ${-k}" fill="none" stroke="${color}" stroke-width="3"/>
    ${T(m, y + d * (36 + fs * 0.5), label, { fs, fill: color })}</g>`;
};

/** Khung chung: thanh to giữa tờ giấy, dòng phép tính ở trên. */
function base(board) {
  const t = stage(board);
  t.fit();
  return t;
}

// ── Bài 3 ─────────────────────────────────────────────────────────────────────────────────────────────
/** Vẽ phép tính mẫu và thanh: total ô, phần a (xanh) + phần b (cam). mode: 'add' | 'sub'. */
function drawPart(t, { total, a, b, eq, qa = false, qb = false, qt = false, gone = false, btn = '' }) {
  const G = t.G, s = Math.min(84, 900 / total), x0 = 500 - (total * s) / 2;
  const h = Math.min(s * 1.1, (G.bot - G.top) * 0.22), y = G.top + (G.bot - G.top) * 0.5;
  const fs = Math.min(64, G.H * 0.09);
  t.draw(`
    ${T(500, G.top + (G.bot - G.top) * 0.14, eq, { fs: fs * 1.1, cls: 'x3b-eq' })}
    <g class="x3b-a">${cells('x3b-ca', x0, y, s, h, a, BLUE)}</g>
    <g class="x3b-b">${cells('x3b-cb', x0 + a * s, y, s, h, b, ORANGE, { dash: gone })}</g>
    ${brace(x0, x0 + a * s, y - 10, qa ? '?' : String(a), { fs, color: qa ? '#DC2626' : INK })}
    ${brace(x0 + a * s, x0 + total * s, y - 10, qb ? '?' : String(b), { fs, color: qb ? '#DC2626' : INK })}
    ${brace(x0, x0 + total * s, y + h + 10, qt ? '?' : String(total), { up: false, fs, color: qt ? '#DC2626' : INK })}
    ${btn ? BTN('go', 250, G.band + 6, 500, Math.min(G.bh - 24, 92), btn) : ''}`);
  t.enable('go', false);
  return { x0, s, y, h };
}

export const B3 = {
  title: 'Bài 3: Tìm thành phần trong phép cộng, phép trừ',
  setup: (board) => base(board),
  steps: [
    async (c) => {
      const t = c.t;
      drawPart(t, { total: 10, a: 6, b: 4, eq: '? + 4 = 10', qa: true });
      t.caption('Tìm <b>số hạng</b> chưa biết');
      await c.say('Mấy cộng 4 bằng 10? Thanh có 10 ô: phần xanh là số hạng chưa biết, phần cam là 4 ô.', '<b>? + 4 = 10</b>');
      await c.say('Muốn tìm phần xanh, ta làm phép tính nào?', 'Chọn phép tính');
      await c.choose([{ html: '10 − 4', value: 1 }, { html: '10 + 4', value: 2 }, { html: '4 − 10', value: 3 }], 1, { hint: 'Bớt 4 ô cam khỏi 10 ô thì còn phần xanh.' });
    },
    async (c) => {
      const t = c.t;
      const g = drawPart(t, { total: 10, a: 6, b: 4, eq: '? + 4 = 10', qa: true, btn: 'Bớt 4 ô cam' });
      await c.say('Bấm nút để bớt 4 ô cam.', 'Bấm <b>Bớt 4 ô cam</b>');
      t.enable('go');
      await waitTap(c, t, 'go', { nudge: 'Bấm nút màu xanh ở dưới.' });
      t.enable('go', false);
      await Promise.all(t.qa('.x3b-cb').map((e, i) => e.animate([{ transform: 'none', opacity: 1 }, { transform: `translate(${120 + i * 20}px, ${-g.h * 1.4}px)`, opacity: 0 }], { duration: anim(600), delay: i * 90, fill: 'forwards' }).finished));
      sfx.swish();
      t.q('.x3b-eq').textContent = '? = 10 − 4 = 6';
      pop(t.q('.x3b-eq'));
      await c.say('Còn 6 ô xanh. Vậy số hạng là 6: 6 cộng 4 bằng 10.', '10 − 4 = <b>6</b>');
      await c.say('Muốn tìm số hạng, ta lấy tổng trừ đi số hạng kia.', '<b>Số hạng = Tổng − Số hạng kia</b>');
    },
    async (c) => {
      const t = c.t;
      const g = drawPart(t, { total: 8, a: 3, b: 5, eq: '? − 5 = 3', qt: true, gone: true, btn: 'Trả lại 5 ô' });
      t.caption('Tìm <b>số bị trừ</b>');
      await c.say('Số nào trừ 5 thì còn 3? Đã bớt 5 ô, còn lại 3 ô xanh. Bấm nút để trả lại 5 ô.', '<b>? − 5 = 3</b>');
      t.enable('go');
      await waitTap(c, t, 'go', { nudge: 'Bấm nút ở dưới để trả lại 5 ô.' });
      t.enable('go', false);
      const back = t.qa('.x3b-cb');
      back.forEach((e) => { e.setAttribute('fill', ORANGE); e.setAttribute('stroke-dasharray', ''); e.setAttribute('stroke-opacity', '0.7'); });
      await Promise.all(back.map((e, i) => sleep(i * 90).then(() => flyFrom(e, 160, -g.h * 1.5, 520))));
      sfx.pop(3);
      await c.say('Ghép 3 ô còn lại với 5 ô đã bớt. Chọn phép tính.', 'Số bị trừ = ?');
      await c.choose([{ html: '3 + 5', value: 1 }, { html: '5 − 3', value: 2 }, { html: '3 × 5', value: 3 }], 1, { hint: 'Ghép lại: lấy phần còn lại cộng phần đã bớt.' });
      t.q('.x3b-eq').textContent = '? = 3 + 5 = 8';
      pop(t.q('.x3b-eq'));
      await c.say('Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ.', '<b>Số bị trừ = Hiệu + Số trừ</b>');
    },
    async (c) => {
      const t = c.t;
      drawPart(t, { total: 9, a: 6, b: 3, eq: '9 − ? = 6', qb: true, gone: true });
      t.caption('Tìm <b>số trừ</b>');
      await c.say('9 trừ mấy thì còn 6? Thanh có 9 ô, còn lại 6 ô. Đã bớt đi mấy ô?', '<b>9 − ? = 6</b>');
      await c.choose([{ html: '9 − 6', value: 1 }, { html: '9 + 6', value: 2 }, { html: '6 − 9', value: 3 }], 1, { hint: 'Lấy cả thanh 9 ô bớt đi phần còn lại 6 ô.' });
      t.q('.x3b-eq').textContent = '? = 9 − 6 = 3';
      pop(t.q('.x3b-eq'));
      await c.say('Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu.', '<b>Số trừ = Số bị trừ − Hiệu</b>');
    },
    async (c) => {
      const t = c.t;
      t.caption('Thử với số lớn hơn');
      t.draw(T(500, (t.G.top + t.G.bot) / 2, '? + 250 = 600', { fs: Math.min(90, t.G.H * 0.13), cls: 'x3b-eq' }));
      await c.say('Mấy cộng 250 bằng 600?', '<b>? + 250 = 600</b>');
      await c.choose([{ html: '350', value: 350 }, { html: '850', value: 850 }, { html: '450', value: 450 }], 350, { hint: 'Số hạng = tổng − số hạng kia: 600 − 250.' });
      t.q('.x3b-eq').textContent = '? = 600 − 250 = 350';
      pop(t.q('.x3b-eq'));
      await c.say('Đúng! 600 trừ 250 bằng 350.', '600 − 250 = <b>350</b>');
    },
  ],
};

// ── Bài 24, 27, 39: đoạn thẳng chia ô ─────────────────────────────────────────────────────────────────
/** Toạ độ thanh: k đoạn mỗi đoạn n ô, dài tối đa total ô. */
function seg(t, total, rows = 2) {
  const G = t.G, s = Math.min(80, 760 / total), x0 = 560 - (total * s) / 2;
  const h = Math.min(s * (G.tall ? 1.4 : 1.05), 100), gap = (G.bot - G.top) / (rows + 1);
  const fs = Math.min(56, G.H * 0.08);
  return { G, s, x0, h, fs, y: (r) => G.top + gap * (r + 0.55) };
}

export const B24 = {
  title: 'Bài 24: Gấp một số lên một số lần',
  setup: (board) => base(board),
  steps: [
    async (c) => {
      const t = c.t;
      const g = seg(t, 12);
      t.caption('Đoạn AB dài <b>4</b> ô. Gấp lên <b>3</b> lần.');
      t.draw(`${T(g.x0 - 16, g.y(0) + g.h / 2, 'AB', { fs: g.fs, anchor: 'end' })}${cells('x3b-ab', g.x0, g.y(0), g.s, g.h, 4, BLUE)}
        ${T(g.x0 - 16, g.y(1) + g.h / 2, 'CD', { fs: g.fs, anchor: 'end' })}${cells('x3b-slot', g.x0, g.y(1), g.s, g.h, 12, '#fff', { dash: true })}
        <g class="x3b-cd"></g>${brace(g.x0, g.x0 + 12 * g.s, g.y(1) + g.h + 10, '?', { up: false, fs: g.fs, color: '#DC2626' })}
        ${T(500, g.G.bot - g.fs * 0.6, '&#160;', { fs: g.fs * 1.1, cls: 'x3b-eq' })}
        ${BTN('go', 230, g.G.band + 6, 540, Math.min(g.G.bh - 24, 92), '+ 1 đoạn như AB')}`);
      t.enable('go', false);
      await c.say('Đoạn AB dài 4 ô. Đoạn CD dài gấp 3 lần đoạn AB, tức là bằng 3 đoạn AB nối liền nhau.', 'CD dài gấp <b>3</b> lần AB');
    },
    async (c) => {
      const t = c.t, g = seg(t, 12);
      await c.say('Bấm nút 3 lần để nối 3 đoạn như AB.', 'Bấm nút <b>3</b> lần');
      await tapTimes(c, t, 'go', 3, async (k) => {
        const gg = t.q('.x3b-cd');
        gg.insertAdjacentHTML('beforeend', `<g>${cells('x3b-c', g.x0 + (k - 1) * 4 * g.s, g.y(1), g.s, g.h, 4, BLUE)}</g>`);
        await flyFrom(gg.lastElementChild, (1 - k) * 4 * g.s, g.y(0) - g.y(1), 560);
        sfx.pop(k);
        t.q('.x3b-eq').textContent = `${[...Array(k)].map(() => 4).join(' + ')} = ${4 * k}`;
      }, { nudge: 'Bấm nút để thêm một đoạn như AB.' });
      await c.say('3 đoạn, mỗi đoạn 4 ô: 4 cộng 4 cộng 4 bằng 12, cũng là 4 nhân 3.', '4 + 4 + 4 = <b>4 × 3 = 12</b>');
    },
    async (c) => {
      const t = c.t;
      t.q('.x3b-eq').textContent = '4 gấp lên 3 lần: 4 × 3 = 12';
      pop(t.q('.x3b-eq'));
      await c.say('Muốn gấp một số lên nhiều lần, ta lấy số đó nhân với số lần.', '<b>Gấp lên: lấy số đó × số lần</b>');
    },
    async (c) => {
      const t = c.t;
      await c.say('Thử với: 5 gấp lên 4 lần được bao nhiêu?', '<b>5 gấp lên 4 lần = ?</b>');
      await c.choose([{ html: '9', value: 9 }, { html: '20', value: 20 }, { html: '1', value: 1 }], 20, { hint: 'Gấp lên 4 lần là nhân với 4, không phải cộng thêm 4.' });
      t.q('.x3b-eq').textContent = '5 × 4 = 20';
      pop(t.q('.x3b-eq'));
      await c.say('5 nhân 4 bằng 20. Chú ý: gấp lên 4 lần khác với thêm 4 đơn vị.', '5 × 4 = <b>20</b> · khác với 5 + 4');
    },
  ],
};

export const B27 = {
  title: 'Bài 27: Giảm một số đi một số lần',
  setup: (board) => base(board),
  steps: [
    async (c) => {
      const t = c.t;
      const g = seg(t, 12);
      t.caption('Có <b>12</b> ô. Giảm đi <b>3</b> lần.');
      t.draw(`${cells('x3b-all', g.x0, g.y(0), g.s, g.h, 12, ORANGE)}<g class="x3b-cuts"></g>
        ${brace(g.x0, g.x0 + 12 * g.s, g.y(0) - 10, '12', { fs: g.fs })}
        <g class="x3b-one"></g>
        ${T(500, g.G.bot - g.fs * 0.6, '&#160;', { fs: g.fs * 1.1, cls: 'x3b-eq' })}
        ${BTN('go', 230, g.G.band + 6, 540, Math.min(g.G.bh - 24, 92), 'Chia 3 phần bằng nhau')}`);
      t.enable('go', false);
      await c.say('12 giảm đi 3 lần nghĩa là chia 12 thành 3 phần bằng nhau, lấy một phần.', 'Chia <b>12</b> ô thành <b>3</b> phần bằng nhau');
    },
    async (c) => {
      const t = c.t, g = seg(t, 12);
      await c.say('Bấm nút để cắt thanh thành 3 phần bằng nhau.', 'Bấm <b>Chia 3 phần bằng nhau</b>');
      t.enable('go');
      await waitTap(c, t, 'go', { nudge: 'Bấm nút để cắt thanh.' });
      t.enable('go', false);
      const cuts = t.q('.x3b-cuts');
      for (const k of [1, 2]) {
        cuts.insertAdjacentHTML('beforeend', L(g.x0 + k * 4 * g.s, g.y(0) - 24, g.x0 + k * 4 * g.s, g.y(0) + g.h + 24, { stroke: '#DC2626', sw: 7 }));
        pop(cuts.lastElementChild); sfx.zap(); await sleep(350);
      }
      const one = t.q('.x3b-one');
      one.innerHTML = cells('x3b-c', g.x0, g.y(1), g.s, g.h, 4, ORANGE) + brace(g.x0, g.x0 + 4 * g.s, g.y(1) + g.h + 10, '?', { up: false, fs: g.fs, color: '#DC2626' });
      await flyFrom(one, 0, g.y(0) - g.y(1), 600);
      await c.say('Mỗi phần có mấy ô?', '12 : 3 = ?');
      await c.choose([{ html: '4', value: 4 }, { html: '9', value: 9 }, { html: '36', value: 36 }], 4, { hint: 'Đếm số ô trong một phần.' });
      t.q('.x3b-eq').textContent = '12 giảm đi 3 lần: 12 : 3 = 4';
      pop(t.q('.x3b-eq'));
    },
    async (c) => {
      await c.say('Muốn giảm một số đi nhiều lần, ta chia số đó cho số lần.', '<b>Giảm đi: lấy số đó : số lần</b>');
    },
    async (c) => {
      const t = c.t;
      await c.say('So sánh: 12 giảm đi 3 lần thì được 4. Còn 12 giảm đi 3 đơn vị thì được 9.', '12 : 3 = 4 · 12 − 3 = 9');
      await c.say('Thử với: 20 giảm đi 4 lần được bao nhiêu?', '<b>20 giảm đi 4 lần = ?</b>');
      await c.choose([{ html: '16', value: 16 }, { html: '5', value: 5 }, { html: '80', value: 80 }], 5, { hint: 'Giảm đi 4 lần là chia cho 4.' });
      t.q('.x3b-eq').textContent = '20 : 4 = 5';
      pop(t.q('.x3b-eq'));
      await c.say('20 chia 4 bằng 5.', '20 : 4 = <b>5</b>');
    },
  ],
};

export const B39 = {
  title: 'Bài 39: So sánh số lớn gấp mấy lần số bé',
  setup: (board) => base(board),
  steps: [
    async (c) => {
      const t = c.t;
      const g = seg(t, 6);
      t.caption('Đoạn AB dài <b>6</b> ô, đoạn CD dài <b>2</b> ô');
      t.draw(`${T(g.x0 - 16, g.y(0) + g.h / 2, 'AB', { fs: g.fs, anchor: 'end' })}${cells('x3b-ab', g.x0, g.y(0), g.s, g.h, 6, GREEN)}
        <g class="x3b-cover"></g>
        ${T(g.x0 - 16, g.y(1) + g.h / 2, 'CD', { fs: g.fs, anchor: 'end' })}${cells('x3b-cd', g.x0, g.y(1), g.s, g.h, 2, PINK)}
        ${T(500, g.G.bot - g.fs * 0.6, '&#160;', { fs: g.fs * 1.1, cls: 'x3b-eq' })}
        ${BTN('go', 230, g.G.band + 6, 540, Math.min(g.G.bh - 24, 92), 'Đặt đoạn CD lên AB')}`);
      t.enable('go', false);
      await c.say('Đoạn AB dài 6 ô, đoạn CD dài 2 ô. Đoạn AB dài gấp mấy lần đoạn CD?', 'AB dài gấp mấy lần CD?');
    },
    async (c) => {
      const t = c.t, g = seg(t, 6);
      await c.say('Đặt đoạn CD lên đoạn AB, đặt liền nhau cho tới khi kín. Bấm nút.', 'Bấm nút để đặt CD lên AB');
      await tapTimes(c, t, 'go', 3, async (k) => {
        const gg = t.q('.x3b-cover');
        gg.insertAdjacentHTML('beforeend', `<g>${cells('x3b-c', g.x0 + (k - 1) * 2 * g.s, g.y(0), g.s, g.h, 2, PINK)}${T(g.x0 + (k - 0.5) * 2 * g.s, g.y(0) + g.h / 2, k, { fs: g.h * 0.6, fill: '#fff' })}</g>`);
        await flyFrom(gg.lastElementChild, -(k - 1) * 2 * g.s, g.y(1) - g.y(0), 560);
        sfx.pop(k);
        t.q('.x3b-eq').textContent = `Đặt được ${k} lần`;
      }, { nudge: 'Bấm nút để đặt tiếp đoạn CD.' });
      await c.say('Đặt được 3 lần thì kín đoạn AB. 6 chia 2 bằng 3. Đoạn AB dài gấp 3 lần đoạn CD.', '6 : 2 = <b>3</b> (lần)');
    },
    async (c) => {
      const t = c.t;
      t.q('.x3b-eq').textContent = 'Số lớn : số bé = số lần';
      pop(t.q('.x3b-eq'));
      await c.say('Muốn biết số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé.', '<b>Số lớn : Số bé</b>');
    },
    async (c) => {
      const t = c.t;
      await c.say('Thử với: 12 gấp mấy lần 4?', '<b>12 gấp mấy lần 4?</b>');
      await c.choose([{ html: '8 lần', value: 8 }, { html: '3 lần', value: 3 }, { html: '48 lần', value: 48 }], 3, { hint: 'Lấy số lớn 12 chia cho số bé 4.' });
      t.q('.x3b-eq').textContent = '12 : 4 = 3 (lần)';
      pop(t.q('.x3b-eq'));
      await c.say('12 chia 4 bằng 3. 12 gấp 3 lần 4.', '12 : 4 = <b>3</b>');
    },
  ],
};

// ── Bài 28: bài toán hai bước ─────────────────────────────────────────────────────────────────────────
function twoRows(t, { A, more, showB = false, total = false }) {
  const G = t.G, B = A + more, k = 640 / B, x0 = G.tall ? 60 : 230, fs = Math.min(52, G.H * 0.075);
  const h = Math.min(90, (G.bot - G.top) * 0.16), y1 = G.top + (G.bot - G.top) * (G.tall ? 0.22 : 0.18), y2 = y1 + h + (G.bot - G.top) * (G.tall ? 0.22 : 0.26);
  const nm = (y, s) => (G.tall ? T(x0, y - fs * 0.7, s, { fs, anchor: 'start' }) : T(x0 - 20, y + h / 2, s, { fs, anchor: 'end' }));
  t.draw(`${nm(y1, 'Thùng 1')}${R(x0, y1, A * k, h, { fill: BLUE, rx: 8 })}${T(x0 + (A * k) / 2, y1 + h / 2, `${A} l`, { fs })}
    ${nm(y2, 'Thùng 2')}${R(x0, y2, A * k, h, { fill: BLUE, rx: 8 })}${R(x0 + A * k, y2, more * k, h, { fill: YEL, rx: 8 })}${T(x0 + A * k + (more * k) / 2, y2 + h / 2, `${more} l`, { fs })}
    ${showB ? T(x0 + (A * k) / 2, y2 + h / 2, `${B} l`, { fs, fill: '#166534', cls: 'x3b-pop' }) : ''}
    <path d="M${x0 + B * k + 20} ${y1} q22 0 22 22 V${(y1 + y2 + h) / 2 - 16} q0 16 18 16 q-18 0 -18 16 V${y2 + h - 22} q0 22 -22 22" fill="none" stroke="${INK}" stroke-width="3"/>
    ${T(x0 + B * k + 70, (y1 + y2 + h) / 2, total ? `${A + B} l` : '? l', { fs, anchor: 'start', fill: total ? '#166534' : '#DC2626', cls: total ? 'x3b-pop' : '' })}`);
  t.qa('.x3b-pop').forEach(e => pop(e));
}

export const B28 = {
  title: 'Bài 28: Bài toán giải bằng hai bước tính',
  setup: (board) => base(board),
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('Thùng 1 có <b>18 l</b>, thùng 2 nhiều hơn <b>6 l</b>. Cả hai thùng?');
      twoRows(t, { A: 18, more: 6 });
      await c.say('Thùng thứ nhất có 18 lít nước. Thùng thứ hai có nhiều hơn thùng thứ nhất 6 lít. Hỏi cả hai thùng có bao nhiêu lít nước?');
      await c.say('Trên sơ đồ, thùng thứ hai bằng thùng thứ nhất thêm phần vàng 6 lít. Chưa biết thùng thứ hai có bao nhiêu, nên phải tính hai bước.', 'Bước 1: thùng 2 · Bước 2: cả hai thùng');
    },
    async (c) => {
      const t = c.t;
      await c.say('Bước một: thùng thứ hai có bao nhiêu lít? Chọn phép tính.', 'Bước 1: thùng 2 = ?');
      await c.choose([{ html: '18 + 6', value: 1 }, { html: '18 − 6', value: 2 }, { html: '18 × 6', value: 3 }], 1, { hint: 'Thùng hai nhiều hơn nên cộng thêm 6.' });
      twoRows(t, { A: 18, more: 6, showB: true });
      await c.say('18 cộng 6 bằng 24. Thùng thứ hai có 24 lít.', 'Thùng 2: 18 + 6 = <b>24</b> (l)');
    },
    async (c) => {
      const t = c.t;
      await c.say('Bước hai: cả hai thùng có bao nhiêu lít? Chọn phép tính.', 'Bước 2: cả hai thùng = ?');
      await c.choose([{ html: '18 + 6', value: 1 }, { html: '18 + 24', value: 2 }, { html: '24 − 18', value: 3 }], 2, { hint: 'Cộng số lít của thùng 1 (18 l) và thùng 2 (24 l).' });
      twoRows(t, { A: 18, more: 6, showB: true, total: true });
      t.caption('18 + 6 = 24 · 18 + 24 = <b>42</b> (l)');
      await c.say('18 cộng 24 bằng 42. Cả hai thùng có 42 lít nước. Bài toán giải bằng hai bước tính.', 'Đáp số: <b>42 l</b>');
    },
    async (c) => {
      await c.say('Thử với: thùng 1 có 18 lít, thùng 2 ít hơn 6 lít. Bước một làm phép tính nào?', 'Thùng 2 <b>ít hơn</b> 6 l: bước 1?');
      await c.choose([{ html: '18 + 6', value: 1 }, { html: '18 − 6', value: 2 }, { html: '18 : 6', value: 3 }], 2, { hint: 'Ít hơn thì trừ đi.' });
      await c.say('Đúng! 18 trừ 6 bằng 12, rồi 18 cộng 12 bằng 30 lít.', '18 − 6 = 12 · 18 + 12 = <b>30</b> (l)');
    },
  ],
};

// ── Bài 14: Một phần mấy ──────────────────────────────────────────────────────────────────────────────
/** Hình chia n phần bằng nhau, phần nào bấm được (data-hot="p0".."pn"). kind: 'bar' | 'pie' | 'sq'. */
function shapeParts(kind, cx, cy, size, n, { fill = '#fff', hot = true } = {}) {
  const hs = (i) => (hot ? `data-hot="p${i}"` : '');
  if (kind === 'pie') {
    const r = size / 2;
    return [...Array(n)].map((_, i) => {
      const a0 = (i / n) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
      const p = `M${cx} ${cy} L${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)} A${r} ${r} 0 0 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} Z`;
      return `<path class="x3b-part" ${hs(i)} d="${p}" fill="${fill}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`;
    }).join('');
  }
  const w = size * 1.5, h = size * 0.6, x = cx - w / 2, y = cy - h / 2;
  return [...Array(n)].map((_, i) => R(x + (i * w) / n, y, w / n, h, { fill, sw: 3.5, rx: 2, cls: 'x3b-part', extra: hs(i) })).join('');
}

export const B14 = {
  title: 'Bài 14: Một phần mấy',
  setup: (board) => base(board),
  steps: [
    async (c) => {
      const t = c.t, G = t.G;
      const cy = (G.top + G.bot) / 2, size = Math.min(G.bot - G.top - 60, 560);
      t.caption('Chia hình tròn thành <b>4</b> phần bằng nhau');
      t.draw(`${shapeParts('pie', 500, cy, size, 4)}<g class="x3b-lab"></g>`);
      await c.say('Cái bánh hình tròn được chia thành 4 phần bằng nhau. Bấm vào một phần để tô màu.', 'Bấm <b>một phần</b> để tô màu');
      const id = await waitTap(c, t, (h) => /^p\d$/.test(h), { el: () => t.hot('p1'), nudge: 'Bấm vào một miếng bánh.' });
      const part = t.hot(id);
      part.setAttribute('fill', ORANGE);
      bump(part); sfx.pop(2);
      t.q('.x3b-lab').innerHTML = fracSvg(G.tall ? 870 : 880, G.tall ? G.top + 80 : cy, 1, 4, Math.min(80, G.H * 0.1));
      pop(t.q('.x3b-lab'));
      await c.say('Đã tô màu một phần tư cái bánh. Một phần tư viết là 1 trên 4.', 'Tô màu <b>1/4</b> (một phần tư)');
    },
    async (c) => {
      const t = c.t, G = t.G;
      const cy = (G.top + G.bot) / 2, size = Math.min(500, G.tall ? 600 : 420);
      t.caption('Chia băng giấy thành <b>3</b> phần bằng nhau');
      t.draw(`${shapeParts('bar', 500, cy, size, 3)}<g class="x3b-lab"></g>`);
      await c.say('Băng giấy chia thành 3 phần bằng nhau. Bấm một phần để tô màu.', 'Bấm <b>một phần</b> để tô màu');
      const id = await waitTap(c, t, (h) => /^p\d$/.test(h), { el: () => t.hot('p0'), nudge: 'Bấm vào một ô của băng giấy.' });
      t.hot(id).setAttribute('fill', BLUE);
      bump(t.hot(id)); sfx.pop(3);
      t.q('.x3b-lab').innerHTML = fracSvg(500, cy + size * 0.3 + Math.min(80, G.H * 0.1) * 1.4, 1, 3, Math.min(80, G.H * 0.1));
      pop(t.q('.x3b-lab'));
      await c.say('Đã tô màu một phần ba băng giấy.', 'Tô màu <b>1/3</b> (một phần ba)');
    },
    async (c) => {
      const t = c.t, G = t.G;
      t.caption('Hình nào đã tô màu <b>1/3</b> hình?');
      const sz = Math.min(G.tall ? 360 : 280, (G.bot - G.top) * (G.tall ? 0.42 : 0.6)), cy = (G.top + G.bot) / 2 - 20;
      // hình B chia 3 phần không bằng nhau
      const unequal = `<rect x="${500 - sz * 0.75}" y="${cy - sz * 0.3}" width="${sz * 0.25}" height="${sz * 0.6}" fill="${PINK}" stroke="${INK}" stroke-width="3.5"/>
        <rect x="${500 - sz * 0.5}" y="${cy - sz * 0.3}" width="${sz * 0.75}" height="${sz * 0.6}" fill="#fff" stroke="${INK}" stroke-width="3.5"/>
        <rect x="${500 + sz * 0.25}" y="${cy - sz * 0.3}" width="${sz * 0.5}" height="${sz * 0.6}" fill="#fff" stroke="${INK}" stroke-width="3.5"/>`;
      const x = G.tall ? [500, 500] : [270, 730], y = G.tall ? [G.top + (G.bot - G.top) * 0.27, G.top + (G.bot - G.top) * 0.72] : [cy, cy];
      t.draw(`<g transform="translate(${x[0] - 500} ${y[0] - cy})">${shapeParts('bar', 500, cy, sz, 3, { hot: false })}</g>
        <g transform="translate(${x[1] - 500} ${y[1] - cy})">${unequal}</g>
        ${T(x[0], y[0] - sz * 0.3 - 40, 'A', { fs: 56 })}${T(x[1], y[1] - sz * 0.3 - 40, 'B', { fs: 56 })}`);
      t.qa('.x3b-part')[0].setAttribute('fill', PINK);
      await c.say('Hình A và hình B đều chia thành 3 phần và tô màu 1 phần. Hình nào đã tô màu một phần ba?', 'Hình nào tô màu <b>1/3</b>?');
      await c.choose([{ html: 'Hình A', value: 'A' }, { html: 'Hình B', value: 'B' }], 'A', { hint: 'Một phần ba: phải chia thành 3 phần bằng nhau.' });
      await c.say('Đúng! Hình B chia 3 phần không bằng nhau nên không phải một phần ba.', 'Phải chia thành các phần <b>bằng nhau</b>');
    },
    async (c) => {
      const t = c.t, G = t.G;
      t.caption('<b>1/3</b> của 12 quả cam');
      const n = 12, groups = 3;
      const gw = G.tall ? 900 : 300, gy = G.tall ? (i) => G.top + 230 + i * (G.bot - G.top - 230) / 3 : () => G.top + (G.bot - G.top) * 0.36;
      const gx = (i) => (G.tall ? 50 : 30 + i * (gw + 20));
      const ghH = G.tall ? (G.bot - G.top - 230) / 3 - 16 : Math.min(300, (G.bot - G.top) * 0.6);
      const r = Math.min(40, ghH * 0.17, gw * 0.12);
      let svg = [...Array(groups)].map((_, i) => R(gx(i), gy(i), gw, ghH, { fill: '#FFF7ED', stroke: '#FDBA74', sw: 3, rx: 24, extra: 'stroke-dasharray="12 8"' })).join('');
      svg += `<g class="x3b-or">${[...Array(n)].map((_, i) => `<g data-o="${i}">${C(500 + ((i % 6) - 2.5) * r * 2.6, G.top + r * 1.6 + Math.floor(i / 6) * r * 2.6, r, { fill: ORANGE, sw: 2.5 })}</g>`).join('')}</g>`;
      svg += BTN('go', 230, G.band + 6, 540, Math.min(G.bh - 24, 92), 'Chia đều vào 3 đĩa');
      t.draw(svg);
      t.enable('go', false);
      await c.say('Có 12 quả cam. Chia đều 12 quả cam vào 3 đĩa. Mỗi đĩa là một phần ba số cam. Bấm nút để chia.', 'Chia <b>12</b> quả vào <b>3</b> đĩa');
      t.enable('go');
      await waitTap(c, t, 'go', { nudge: 'Bấm nút để chia cam.' });
      t.enable('go', false);
      const os = t.qa('[data-o]');
      for (let i = 0; i < n; i++) {
        const g = os[i], d = i % 3, k = Math.floor(i / 3);
        const cx = gx(d) + gw / 2 + ((k % 2) - 0.5) * r * 2.8, cy = gy(d) + ghH / 2 + (Math.floor(k / 2) - 0.5) * r * 2.8;
        const c0 = g.querySelector('circle'), ox = +c0.getAttribute('cx'), oy = +c0.getAttribute('cy');
        c0.setAttribute('cx', cx); c0.setAttribute('cy', cy);
        flyFrom(g, ox - cx, oy - cy, 480);
        sfx.pop(i % 10);
        await sleep(160);
      }
      await sleep(500);
      await c.say('Mỗi đĩa có mấy quả cam?', '1/3 của 12 quả = ?');
      await c.choose([{ html: '3 quả', value: 3 }, { html: '4 quả', value: 4 }, { html: '9 quả', value: 9 }], 4, { hint: 'Đếm số cam trong một đĩa: 12 : 3.' });
      t.caption('1/3 của 12 quả cam: 12 : 3 = <b>4</b> (quả)');
      await c.say('Mỗi đĩa có 4 quả. Một phần ba của 12 quả cam là 4 quả: 12 chia 3 bằng 4.');
    },
  ],
};

/** Phân số viết dọc trong SVG (1 trên n). */
function fracSvg(x, y, a, b, fs) {
  return `<g>${T(x, y - fs * 0.62, a, { fs, fill: '#DC2626' })}${L(x - fs * 0.45, y, x + fs * 0.45, y, { stroke: '#DC2626', sw: 5 })}${T(x, y + fs * 0.62, b, { fs, fill: '#DC2626' })}</g>`;
}
