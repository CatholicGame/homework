/**
 * 🃏 Tấm thẻ chấm tròn (như SGK): bảng nhân / chia 2…9 (Bài 4, 5, 6, 9–12), tìm thành phần trong phép nhân, chia
 * (Bài 13), phép chia hết, chia có dư (Bài 25).
 * Mười chỗ để thẻ (2 cột × 5) vẽ sẵn bằng nét đứt; bên cạnh (dọc: bên dưới) là bảng nhân lớn dần hoặc khay chấm rời.
 * Bấm nút: một tấm thẻ bay vào chỗ tiếp theo, dòng phép nhân hiện ra / n chấm từ khay bay vào thẻ mới.
 */

import { stage, waitTap, tapTimes, flyFrom, pop, bump, T, R, C, BTN, sfx, sleep, INK } from './kit.js';

export const DOT = { 2: '#F97316', 3: '#2563EB', 4: '#16A34A', 5: '#DB2777', 6: '#7C3AED', 7: '#0891B2', 8: '#EA580C', 9: '#DC2626' };

/** Toạ độ chấm trong thẻ (n ≤ 5 một hàng, nhiều hơn hai hàng). */
function dotSpots(n, x, y, w, h) {
  const rows = n > 5 ? 2 : 1, cols = Math.ceil(n / rows);
  const r = Math.min(h / (rows * 2.7), w / (cols * 2.6));
  const out = [];
  for (let i = 0; i < n; i++) {
    const row = rows === 2 ? (i < cols ? 0 : 1) : 0, k = row ? i - cols : i, inRow = row ? n - cols : cols;
    out.push({ x: x + w / 2 + (k - (inRow - 1) / 2) * r * 2.6, y: y + h / 2 + (rows === 2 ? (row - 0.5) * r * 2.5 : 0), r });
  }
  return out;
}

/**
 * Tạo công cụ thẻ. panel: 'lines' (bảng nhân 10 dòng) | 'tray' (khay chấm rời + 2 dòng phép tính).
 * btn: chữ trên nút. tray: số chấm trong khay lúc đầu.
 */
export function createCards(board, { n, panel = 'lines', btn = '+ 1 tấm thẻ', tray = 0, color = DOT[n] || '#F97316', eqOnly = false }) {
  const t = stage(board);
  const G = t.fit();
  const { top, bot, tall } = G;
  const Q = tall ? { x: 24, y: top, w: 952, h: (bot - top) * 0.55 } : { x: 18, y: top, w: 580, h: bot - top };
  const P = tall ? { x: 24, y: top + Q.h + 18, w: 952, h: bot - top - Q.h - 18 } : { x: 616, y: top, w: 368, h: bot - top };
  const gx = 16, gy = 12, cw = (Q.w - gx) / 2, ch = Math.min((Q.h - gy * 4) / 5, cw * 0.42);
  const qy = Q.y + (Q.h - (ch * 5 + gy * 4)) / 2;
  const slot = (k) => ({ x: Q.x + Math.floor(k / 5) * (cw + gx), y: qy + (k % 5) * (ch + gy), w: cw, h: ch });
  const btnW = tall ? 560 : 520, btnH = Math.min(G.bh - 26, 92);
  const B = { x: 500 - btnW / 2, y: G.band + (G.bh - btnH) / 2 - 4, w: btnW, h: btnH };

  // khay: ô chữ nhật phía trên của bảng phải; dưới khay hai dòng phép tính
  const TR = { x: P.x, y: P.y, w: P.w, h: P.h * 0.56 };
  const EQ = (i) => (eqOnly ? { x: P.x, y: P.y + P.h * 0.12 + i * P.h * 0.4, w: P.w, h: P.h * 0.34 } : { x: P.x, y: P.y + P.h * 0.6 + i * P.h * 0.2, w: P.w, h: P.h * 0.18 });
  const lineBox = (k) => (tall
    ? { x: P.x + Math.floor(k / 5) * (P.w / 2), y: P.y + (k % 5) * (P.h / 5), w: P.w / 2, h: P.h / 5 }
    : { x: P.x, y: P.y + k * (P.h / 10), w: P.w, h: P.h / 10 });
  const lfs = Math.min(lineBox(0).h * 0.72, tall ? 64 : 46);
  const eqfs = Math.min(EQ(0).h * 0.8, tall ? 72 : 52, (P.w / 11) * 1.5);

  t.draw(`
    <g class="x3c-slots">${[...Array(10)].map((_, k) => { const s = slot(k); return R(s.x, s.y, s.w, s.h, { fill: '#F8FAFC', stroke: '#CBD5E1', sw: 2.5, rx: 14, extra: 'stroke-dasharray="10 8"' }); }).join('')}</g>
    ${panel === 'lines' ? R(P.x, P.y, P.w, P.h, { fill: '#FFFBEB', stroke: '#FDE68A', sw: 2.5, rx: 18 }) : `
      ${eqOnly ? '' : R(TR.x, TR.y, TR.w, TR.h, { fill: '#FEF3C7', stroke: '#D6A85A', sw: 3, rx: 22 })}
      ${[0, 1].map(i => { const e = EQ(i); return R(e.x, e.y, e.w, e.h, { fill: '#FFFBEB', stroke: '#FDE68A', sw: 2, rx: 14 }); }).join('')}`}
    <g class="x3c-cards"></g><g class="x3c-tray"></g><g class="x3c-lines"></g><g class="x3c-eq"></g>
    ${BTN('add', B.x, B.y, B.w, B.h, btn)}`);
  const gCards = t.q('.x3c-cards'), gTray = t.q('.x3c-tray'), gLines = t.q('.x3c-lines'), gEq = t.q('.x3c-eq');
  t.enable('add', false);
  t.cards = 0;
  t.n = n;

  const cardSvg = (k, cls = '') => {
    const s = slot(k);
    return `<g class="x3c-card ${cls}" data-k="${k}">${R(s.x, s.y, s.w, s.h, { fill: '#fff', stroke: INK, sw: 3, rx: 14 })}
      ${dotSpots(n, s.x, s.y, s.w, s.h).map(d => C(d.x, d.y, d.r, { fill: color, stroke: INK, sw: 2 })).join('')}</g>`;
  };
  /** Thêm một tấm thẻ bay từ nút (from: 'btn') hoặc hiện ngay. */
  t.addCard = async ({ fly = true } = {}) => {
    const k = t.cards++;
    gCards.insertAdjacentHTML('beforeend', cardSvg(k));
    const el = gCards.lastElementChild, s = slot(k);
    sfx.pop(k % 10);
    if (fly) await flyFrom(el, B.x + B.w / 2 - (s.x + s.w / 2), B.y - (s.y + s.h / 2), 560); else await pop(el);
    bump(el);
  };
  /** Dòng thứ k của bảng (0..9). */
  t.line = (k, html, { hl = false } = {}) => {
    const b = lineBox(k);
    gLines.querySelector(`[data-l="${k}"]`)?.remove();
    gLines.insertAdjacentHTML('beforeend', `<g data-l="${k}">${hl ? R(b.x + 8, b.y + 3, b.w - 16, b.h - 6, { fill: '#FEF08A', stroke: 'none', rx: 10 }) : ''}${T(b.x + b.w / 2, b.y + b.h / 2, html, { fs: lfs })}</g>`);
    pop(gLines.lastElementChild, 300);
  };
  t.hlLine = (k) => { const g = gLines.querySelector(`[data-l="${k}"]`); if (g) { const html = g.querySelector('text').innerHTML; t.line(k, html, { hl: true }); } };
  /** Dòng phép tính dưới khay (i = 0, 1). */
  t.eq = (i, html) => {
    const e = EQ(i);
    gEq.querySelector(`[data-e="${i}"]`)?.remove();
    gEq.insertAdjacentHTML('beforeend', `<g data-e="${i}">${T(e.x + e.w / 2, e.y + e.h / 2, html, { fs: eqfs })}</g>`);
    pop(gEq.lastElementChild);
  };
  // khay chấm rời: lưới đều
  let traySpots = [];
  t.tray = 0;
  t.setTray = (m) => {
    t.tray = m;
    gTray.innerHTML = '';
    if (!m) return;
    const cols = Math.ceil(Math.sqrt((m * TR.w) / TR.h)), rows = Math.ceil(m / cols);
    const r = Math.min(TR.w / (cols * 2.8), TR.h / (rows * 2.8), 30);
    traySpots = [...Array(m)].map((_, i) => ({ x: TR.x + TR.w / 2 + ((i % cols) - (cols - 1) / 2) * r * 2.7, y: TR.y + TR.h / 2 + (Math.floor(i / cols) - (rows - 1) / 2) * r * 2.7, r }));
    gTray.innerHTML = traySpots.map((d, i) => `<g data-d="${i}">${C(d.x, d.y, d.r, { fill: color, stroke: INK, sw: 2 })}</g>`).join('');
  };
  if (tray) t.setTray(tray);
  /** n chấm từ khay bay vào thẻ mới (khay còn ít hơn n thì không làm gì, trả về false). */
  t.share = async () => {
    const left = [...gTray.querySelectorAll('[data-d]')];
    if (left.length < n) return false;
    const k = t.cards++;
    const s = slot(k);
    gCards.insertAdjacentHTML('beforeend', `<g class="x3c-card" data-k="${k}">${R(s.x, s.y, s.w, s.h, { fill: '#fff', stroke: INK, sw: 3, rx: 14 })}</g>`);
    const card = gCards.lastElementChild;
    await pop(card, 220);
    const spots = dotSpots(n, s.x, s.y, s.w, s.h);
    const take = left.slice(-n);
    await Promise.all(take.map((g, j) => {
      const d = traySpots[+g.dataset.d];
      g.remove();
      card.insertAdjacentHTML('beforeend', C(spots[j].x, spots[j].y, spots[j].r, { fill: color, stroke: INK, sw: 2 }));
      const el = card.lastElementChild;
      return sleep(j * 70).then(() => flyFrom(el, d.x - spots[j].x, d.y - spots[j].y, 520));
    }));
    sfx.pop(k % 10);
    bump(card);
    t.tray -= n;
    return true;
  };
  t.trayDots = () => [...gTray.querySelectorAll('[data-d]')];
  t.clearCards = () => { gCards.innerHTML = ''; t.cards = 0; };
  t.clearLines = () => { gLines.innerHTML = ''; gEq.innerHTML = ''; };
  t.setBtn = (label) => { const tx = t.hot('add').querySelector('text'); tx.textContent = label; };
  return t;
}

// ── Kịch bản ──────────────────────────────────────────────────────────────────────────────────────────
const opts3 = (right, wrongs) => [...new Set([right, ...wrongs])].filter(v => v > 0).slice(0, 3).sort((a, b) => a - b);

/** Khám phá bảng nhân n, bảng chia n. m: số thẻ ở phần chia; askMul, askDiv: câu hỏi. */
export function tableExplore(n, { m = 4, askMul = 6, askDiv = 7, title } = {}) {
  const col = DOT[n];
  return {
    title,
    setup: (board) => createCards(board, { n }),
    steps: [
      async (c) => {
        const t = c.t;
        t.caption(`Mỗi tấm thẻ có <b>${n}</b> chấm tròn`);
        await c.say(`Mỗi tấm thẻ có ${n} chấm tròn. Bấm nút để lấy một tấm thẻ.`, `Mỗi thẻ có <b>${n}</b> chấm. Bấm <b>+ 1 tấm thẻ</b>.`);
        await tapTimes(c, t, 'add', 1, () => t.addCard(), { nudge: 'Bấm nút màu xanh ở dưới.' });
        t.line(0, `${n} × 1 = ${n}`);
        await c.say(`${n} được lấy 1 lần. Ta viết ${n} nhân 1 bằng ${n}.`, `${n} được lấy 1 lần: <b>${n} × 1 = ${n}</b>`);
      },
      async (c) => {
        const t = c.t;
        await c.say('Lấy thêm thẻ cho đủ 5 tấm. Mỗi lần thêm một tấm là thêm ' + n + ' chấm tròn.', `Lấy thêm thẻ cho đủ <b>5 tấm</b>.`);
        await tapTimes(c, t, 'add', 4, async (k) => {
          await t.addCard();
          t.line(k, `${n} × ${k + 1} = ${n * (k + 1)}`);
          c.show(`${n} × ${k + 1} = ${n * k} + ${n} = <b>${n * (k + 1)}</b>`);
        }, { nudge: 'Bấm nút để lấy thêm thẻ.' });
        await c.say(`Mỗi dòng sau hơn dòng trước ${n}. ${n} nhân 5 bằng ${n * 4} cộng thêm ${n}, bằng ${n * 5}.`, `Thêm 1 thẻ là thêm <b>${n}</b> chấm: ${n * 4} + ${n} = ${n * 5}`);
      },
      async (c) => {
        const t = c.t;
        const k = askMul;
        while (t.cards < k - 1) { await t.addCard({ fly: false }); t.line(t.cards - 1, `${n} × ${t.cards} = ${n * t.cards}`); }
        await c.say(`${n} nhân ${k} bằng bao nhiêu? Lấy ${n} nhân ${k - 1} rồi thêm ${n}.`, `<b>${n} × ${k} = ?</b> (${n} × ${k - 1} = ${n * (k - 1)})`);
        await c.choose(opts3(n * k, [n * k - n, n * k + n, n * k + 1]).map(v => ({ html: String(v), value: v })), n * k, { hint: `Thêm ${n} vào ${n * (k - 1)}.` });
        await t.addCard();
        t.line(k - 1, `${n} × ${k} = ${n * k}`, { hl: true });
        await c.say('Đúng rồi! Lấy tiếp cho đủ 10 tấm thẻ.', `${n} × ${k} = <b>${n * k}</b>. Lấy tiếp cho đủ <b>10 thẻ</b>.`);
        await tapTimes(c, t, 'add', 10 - t.cards, async () => {
          await t.addCard();
          t.line(t.cards - 1, `${n} × ${t.cards} = ${n * t.cards}`);
        }, { nudge: 'Bấm nút để lấy thêm thẻ.' });
        await c.say(`Đây là bảng nhân ${n}. Đếm thêm ${n}: ${[...Array(10)].map((_, i) => n * (i + 1)).join(', ')}.`, `Bảng nhân ${n}: đếm thêm <b>${n}</b>`);
      },
      async (c) => {
        const t = c.use((b) => createCards(b, { n, panel: 'tray', tray: n * m, btn: `Xếp ${n} chấm vào 1 thẻ` }));
        t.caption(`Có <b>${n * m}</b> chấm tròn, mỗi thẻ <b>${n}</b> chấm`);
        await c.say(`Có ${n * m} chấm tròn. Xếp vào các tấm thẻ, mỗi thẻ ${n} chấm. Được mấy tấm thẻ? Bấm nút để xếp.`, `${n * m} chấm, mỗi thẻ ${n} chấm. Được mấy thẻ?`);
        await tapTimes(c, t, 'add', m, async (k) => { await t.share(); c.show(`Đã xếp <b>${k}</b> thẻ, khay còn ${t.tray} chấm`); }, { nudge: 'Bấm nút để xếp tiếp.' });
        t.eq(0, `${n} × ${m} = ${n * m}`);
        await sleep(300);
        t.eq(1, `${n * m} : ${n} = ${m}`);
        await c.say(`Được ${m} tấm thẻ. ${n} nhân ${m} bằng ${n * m}, nên ${n * m} chia ${n} bằng ${m}.`, `${n} × ${m} = ${n * m} → <b>${n * m} : ${n} = ${m}</b>`);
      },
      async (c) => {
        const q = askDiv;
        await c.say(`${n * q} chia ${n} bằng mấy? Nhớ bảng nhân ${n}: ${n} nhân mấy bằng ${n * q}?`, `<b>${n * q} : ${n} = ?</b>`);
        await c.choose(opts3(q, [q - 1, q + 1, q + 2]).map(v => ({ html: String(v), value: v })), q, { hint: `${n} × ${q} = ${n * q}.` });
        c.t.eq(0, `${n} × ${q} = ${n * q}`);
        c.t.eq(1, `${n * q} : ${n} = ${q}`);
        sfx.ding();
        await c.say(`Đúng! ${n} nhân ${q} bằng ${n * q}, nên ${n * q} chia ${n} bằng ${q}. Bảng chia ${n} có từ bảng nhân ${n}.`, `Bảng chia ${n} có từ bảng nhân ${n} <span style="color:${col}">●</span>`);
      },
    ],
  };
}

/** Bài 13: Tìm thừa số, số bị chia, số chia. */
export const FIND_MUL = {
  title: 'Bài 13: Tìm thành phần trong phép nhân, phép chia',
  setup: (board) => createCards(board, { n: 3, panel: 'tray', btn: '+ 1 tấm thẻ', eqOnly: true }),
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('<b>3 × ? = 12</b>');
      await c.say('3 nhân mấy bằng 12? Mỗi thẻ có 3 chấm. Lấy thẻ cho tới khi đủ 12 chấm.', 'Lấy thẻ tới khi đủ <b>12 chấm</b>.');
      await tapTimes(c, t, 'add', 4, async (k) => { await t.addCard(); t.eq(0, `${k} thẻ: ${3 * k} chấm`); }, { nudge: 'Bấm nút để lấy thẻ.' });
      t.eq(1, '3 × <tspan fill="#DC2626">4</tspan> = 12');
      await c.say('4 tấm thẻ thì đủ 12 chấm. Vậy 3 nhân 4 bằng 12.', '3 × <b>4</b> = 12');
    },
    async (c) => {
      const t = c.t;
      await c.say('3 và 4 là thừa số, 12 là tích. Muốn tìm thừa số 4, ta làm phép tính nào?', 'Tìm thừa số: chọn phép tính');
      await c.choose([{ html: '12 − 3', value: 1 }, { html: '12 : 3', value: 2 }, { html: '12 × 3', value: 3 }], 2, { hint: '12 chấm chia thành các thẻ, mỗi thẻ 3 chấm: phép chia.' });
      t.eq(0, '? = 12 : 3 = 4');
      await c.say('Muốn tìm thừa số, ta lấy tích chia cho thừa số kia.', '<b>Thừa số = Tích : Thừa số kia</b>');
    },
    async (c) => {
      const t = c.t;
      t.caption('<b>? × 5 = 20</b>');
      t.clearLines();
      await c.say('Thử với: mấy nhân 5 bằng 20?', '<b>? × 5 = 20</b>');
      await c.choose([{ html: '4', value: 4 }, { html: '15', value: 15 }, { html: '25', value: 25 }], 4, { hint: 'Lấy tích 20 chia cho thừa số 5.' });
      t.eq(0, '? = 20 : 5 = 4');
      await c.say('20 chia 5 bằng 4. Thử lại: 4 nhân 5 bằng 20, đúng.', '20 : 5 = <b>4</b> · thử lại 4 × 5 = 20');
    },
    async (c) => {
      const t = c.use((b) => createCards(b, { n: 3, panel: 'tray', btn: '+ 1 tấm thẻ', eqOnly: true }));
      t.caption('<b>? : 3 = 5</b>');
      for (let k = 0; k < 5; k++) await t.addCard({ fly: false });
      await c.say('Số nào chia 3 được 5? Số đó chia thành 5 thẻ, mỗi thẻ 3 chấm. Có tất cả bao nhiêu chấm?', 'Có <b>5</b> thẻ, mỗi thẻ <b>3</b> chấm');
      await c.choose([{ html: '5 × 3', value: 1 }, { html: '5 + 3', value: 2 }, { html: '5 : 3', value: 3 }], 1, { hint: '5 thẻ, mỗi thẻ 3 chấm: 3 được lấy 5 lần.' });
      t.eq(0, '? = 5 × 3 = 15');
      t.eq(1, '15 : 3 = 5');
      await c.say('Muốn tìm số bị chia, ta lấy thương nhân với số chia.', '<b>Số bị chia = Thương × Số chia</b>');
    },
    async (c) => {
      const t = c.t;
      t.caption('<b>15 : ? = 5</b>');
      t.clearLines();
      await c.say('15 chia mấy được 5? Muốn tìm số chia, ta lấy số bị chia chia cho thương.', '<b>Số chia = Số bị chia : Thương</b>');
      await c.choose([{ html: '15 : 5', value: 1 }, { html: '15 × 5', value: 2 }, { html: '15 − 5', value: 3 }], 1, { hint: 'Lấy số bị chia 15 chia cho thương 5.' });
      t.eq(0, '? = 15 : 5 = 3');
      t.eq(1, '15 : 3 = 5');
      await c.say('15 chia 5 bằng 3. Thử lại: 15 chia 3 bằng 5, đúng.', '15 : 5 = <b>3</b>');
    },
  ],
};

/** Bài 25: Phép chia hết, phép chia có dư. */
export const REMAINDER = {
  title: 'Bài 25: Phép chia hết, phép chia có dư',
  setup: (board) => createCards(board, { n: 2, panel: 'tray', tray: 8, btn: 'Xếp 2 chấm vào 1 thẻ' }),
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('<b>8</b> chấm, mỗi thẻ <b>2</b> chấm');
      await c.say('Có 8 chấm tròn, xếp mỗi thẻ 2 chấm. Bấm nút để xếp hết.', 'Xếp <b>8</b> chấm, mỗi thẻ <b>2</b> chấm.');
      await tapTimes(c, t, 'add', 4, async () => { await t.share(); }, { nudge: 'Bấm nút để xếp tiếp.' });
      t.eq(0, '8 : 2 = 4');
      await c.say('Được 4 thẻ, không thừa chấm nào. 8 chia 2 bằng 4. Đây là phép chia hết.', '8 : 2 = 4 · <b>chia hết</b> (không thừa)');
    },
    async (c) => {
      const t = c.use((b) => createCards(b, { n: 2, panel: 'tray', tray: 9, btn: 'Xếp 2 chấm vào 1 thẻ' }));
      t.caption('<b>9</b> chấm, mỗi thẻ <b>2</b> chấm');
      await c.say('Bây giờ có 9 chấm tròn. Xếp mỗi thẻ 2 chấm.', 'Xếp <b>9</b> chấm, mỗi thẻ <b>2</b> chấm.');
      await tapTimes(c, t, 'add', 4, async () => { await t.share(); }, { nudge: 'Bấm nút để xếp tiếp.' });
      t.enable('add', false);
      t.trayDots().forEach(d => d.classList.add('x3a-glow'));
      await c.say('Được 4 thẻ, còn thừa 1 chấm. Còn 1 chấm thì không đủ xếp một thẻ nữa.', 'Còn thừa <b>1</b> chấm: không đủ 1 thẻ');
    },
    async (c) => {
      const t = c.t;
      await c.say('9 chia 2 được mấy, dư mấy?', '<b>9 : 2 = ?</b>');
      await c.choose([{ html: '4 dư 1', value: 1 }, { html: '3 dư 3', value: 2 }, { html: '5', value: 3 }], 1, { hint: 'Đếm số thẻ đã xếp và số chấm còn thừa.' });
      t.eq(0, '9 : 2 = 4 (dư 1)');
      await c.say('9 chia 2 bằng 4, dư 1. Đây là phép chia có dư.', '<b>9 : 2 = 4 (dư 1)</b> · chia có dư');
    },
    async (c) => {
      const t = c.t;
      t.eq(1, 'Số dư 1 < số chia 2');
      await c.say('Số dư luôn bé hơn số chia. Nếu còn thừa từ 2 chấm trở lên thì xếp được thêm một thẻ nữa.', '<b>Số dư bé hơn số chia</b>');
      await c.say('Thử với: 13 chia 4. Số dư có thể là số nào?', '<b>13 : 4 = 3 (dư ?)</b>');
      await c.choose([{ html: '1', value: 1 }, { html: '5', value: 5 }, { html: '4', value: 4 }], 1, { hint: 'Số dư phải bé hơn số chia 4.' });
      t.eq(1, '13 : 4 = 3 (dư 1)');
      await c.say('Đúng! 4 nhân 3 bằng 12, 13 trừ 12 còn 1. 13 chia 4 bằng 3, dư 1.', '4 × 3 = 12 · 13 − 12 = 1 → <b>dư 1</b>');
    },
  ],
};
