/**
 * Phép tính Toán 3 Tập Hai: Bài 54 (cộng trong phạm vi 10 000), 55 (trừ), 56 (nhân số có bốn chữ số), 57 (chia số có
 * bốn chữ số), 64 (trừ trong phạm vi 100 000), 70 (nhân số có năm chữ số), 71 (chia số có năm chữ số).
 *  - Cộng, trừ, nhân: ✍️ đặt tính của Toán 4 (grade4Tools/colview.js), thầy làm mẫu hai chữ số đầu, em chọn các chữ số sau.
 *  - Chia: công cụ ➗ Chia đặt tính (createDivision bên dưới) viết đầy đủ như lớp 3: lấy, chia, nhân, trừ, hạ.
 */

import { createColumn } from '../../grade4Tools/colview.js';
import { css, emitter, INK } from '../../grade4Tools/frame.js';
import { flyOne } from '../../grade3Games/fly.js';
import { divSteps } from '../../grade3Drills/division.js';
import { R, fmt, sleep, sfx, runColumn, ask, numOptions, signOf } from './kit.js';

const NAME = { '+': 'cộng', '-': 'trừ', '*': 'nhân' };
const INTRO = {
  '+': 'Viết các chữ số cùng hàng thẳng cột với nhau. Cộng từ phải sang trái, bắt đầu từ hàng đơn vị.',
  '-': 'Viết các chữ số cùng hàng thẳng cột với nhau. Trừ từ phải sang trái. Cột nào không trừ được thì lấy thêm 1 chục, rồi nhớ 1 sang cột bên trái.',
  '*': 'Viết thừa số có một chữ số thẳng cột với hàng đơn vị. Nhân từ phải sang trái, nhớ sang hàng bên trái.',
};

/** Khám phá đặt tính: giới thiệu, tính từng cột, thử lại, tính nhẩm số tròn nghìn. */
function columnExplore(title, op, a, b, { check, mental }) {
  const res = op === '+' ? a + b : op === '-' ? a - b : a * b;
  const S = signOf(op);
  return {
    title,
    setup: (board) => createColumn(board, op, a, b),
    steps: [
      async (c) => {
        await c.say(`Đặt tính rồi tính ${R(a)} ${NAME[op]} ${R(b)}.`, `Đặt tính: <b>${fmt(a)} ${S} ${fmt(b)}</b>`);
        await c.say(INTRO[op], op === '*' ? 'Nhân từ <b>hàng đơn vị</b>, phải sang trái' : 'Thẳng cột · tính từ <b>hàng đơn vị</b>, phải sang trái');
      },
      async (c) => { await runColumn(c, c.t, { demo: 2 }); },
      async (c) => {
        await c.say(`Vậy ${R(a)} ${NAME[op]} ${R(b)} bằng ${R(res)}.`, `${fmt(a)} ${S} ${fmt(b)} = <b>${fmt(res)}</b>`);
        await ask(c, check);
      },
      async (c) => { await ask(c, mental); },
    ],
  };
}

const mentalQ = (a, op, b, unit, name) => {
  const r = op === '+' ? a + b : op === '-' ? a - b : op === '*' ? a * b : a / b;
  const s = { '+': '+', '-': '−', '*': '×', ':': ':' }[op], w = { '+': 'cộng', '-': 'trừ', '*': 'nhân', ':': 'chia' }[op];
  const A = op === '*' || op === ':' ? a / unit : a / unit, B = op === '*' || op === ':' ? b : b / unit;
  return {
    say: `Tính nhẩm: ${R(a)} ${w} ${R(b)}.`, shown: `Tính nhẩm: <b>${fmt(a)} ${s} ${fmt(b)} = ?</b>`,
    options: numOptions(r, [r + unit, r - unit > 0 ? r - unit : r + 2 * unit]), answer: r,
    hint: `Nhẩm theo ${name}: ${A} ${name} ${w} ${B}${op === '*' || op === ':' ? '' : ` ${name}`}.`,
    ok: `${A} ${name} ${w} ${B}${op === '*' || op === ':' ? '' : ` ${name}`} bằng ${r / unit} ${name}. Vậy bằng ${R(r)}.`,
    okShown: `${A} ${name} ${s} ${B}${op === '*' || op === ':' ? '' : ` ${name}`} = ${r / unit} ${name}`,
  };
};

const B54 = columnExplore('Bài 54: Phép cộng trong phạm vi 10 000', '+', 2475, 3658, {
  check: { say: 'Thử lại: lấy tổng trừ đi một số hạng thì được số hạng kia. Sáu nghìn một trăm ba mươi ba trừ ba nghìn sáu trăm năm mươi tám bằng bao nhiêu?',
    shown: 'Thử lại: 6 133 − 3 658 = ?', options: numOptions(2475, [2575, 3475]), answer: 2475, hint: 'Phải được số hạng thứ nhất.', ok: 'Được đúng số hạng thứ nhất, vậy phép cộng đúng.' },
  mental: mentalQ(5000, '+', 3000, 1000, 'nghìn'),
});
const B55 = columnExplore('Bài 55: Phép trừ trong phạm vi 10 000', '-', 6385, 2927, {
  check: { say: 'Thử lại: lấy hiệu cộng với số trừ thì được số bị trừ. Ba nghìn bốn trăm năm mươi tám cộng hai nghìn chín trăm hai mươi bảy bằng bao nhiêu?',
    shown: 'Thử lại: 3 458 + 2 927 = ?', options: numOptions(6385, [6375, 5385]), answer: 6385, hint: 'Phải được số bị trừ.', ok: 'Được đúng số bị trừ, vậy phép trừ đúng.' },
  mental: mentalQ(8000, '-', 5000, 1000, 'nghìn'),
});
const B56 = columnExplore('Bài 56: Nhân số có bốn chữ số với số có một chữ số', '*', 1427, 3, {
  check: { say: 'Ước lượng: một nghìn bốn trăm hai mươi bảy gần một nghìn năm trăm. Kết quả phải gần số nào?', shown: '1 427 × 3 gần với?',
    options: numOptions(4500, [450, 45000]), answer: 4500, hint: 'Một nghìn năm trăm nhân 3.', ok: 'Kết quả bốn nghìn hai trăm tám mươi mốt gần bốn nghìn năm trăm. Hợp lí!' },
  mental: mentalQ(2000, '*', 3, 1000, 'nghìn'),
});
const B64 = columnExplore('Bài 64: Phép trừ trong phạm vi 100 000', '-', 85362, 27518, {
  check: { say: 'Thử lại: lấy hiệu cộng với số trừ. Năm mươi bảy nghìn tám trăm bốn mươi bốn cộng hai mươi bảy nghìn năm trăm mười tám bằng bao nhiêu?',
    shown: 'Thử lại: 57 844 + 27 518 = ?', options: numOptions(85362, [85352, 84362]), answer: 85362, hint: 'Phải được số bị trừ.', ok: 'Được đúng số bị trừ, vậy phép trừ đúng.' },
  mental: mentalQ(60000, '-', 20000, 10000, 'chục nghìn'),
});
const B70 = columnExplore('Bài 70: Nhân số có năm chữ số với số có một chữ số', '*', 12415, 4, {
  check: { say: 'Thử lại bằng phép chia: bốn mươi chín nghìn sáu trăm sáu mươi chia 4 phải được số nào?', shown: 'Thử lại: 49 660 : 4 = ?',
    options: numOptions(12415, [12515, 12405]), answer: 12415, hint: 'Lấy tích chia cho một thừa số thì được thừa số kia.', ok: 'Được đúng thừa số thứ nhất.' },
  mental: mentalQ(20000, '*', 4, 10000, 'chục nghìn'),
});

// ── ➗ Chia đặt tính ────────────────────────────────────────────────────────────────────────────────
/**
 * Bảng chia viết đầy đủ: số bị chia ở hàng trên, mỗi lượt hai hàng (tích có dấu trừ, hiệu và chữ số hạ xuống);
 * bên phải vạch dọc: số chia, vạch ngang, thương. Mọi ô giữ chỗ từ đầu (lưới cố định theo số hàng của phép chia).
 */
export function createDivision(host, D, d) {
  injectDivCss();
  const t = emitter({});
  const plan = divSteps(D, d);
  const S = String(D), n = S.length, Q = String(plan.q), rows = plan.rows;
  const cols = n + 1; // cột 1: dấu trừ phía trái
  const cell = (r, i) => `<div class="x3d-c" data-r="${r}" data-i="${i}" style="grid-row:${r + 1};grid-column:${i + 2}"></div>`;
  let g = '';
  for (let r = 0; r < rows; r++) {
    g += `<div class="x3d-c x3d-sign" data-r="${r}" data-s style="grid-row:${r + 1};grid-column:1"></div>`;
    for (let i = 0; i < n; i++) g += cell(r, i);
  }
  host.innerHTML = `
    <div class="x3d" style="--rows:${Math.max(rows, 4)};--cols:${cols + Math.max(Q.length, 2) + 1}">
      <div class="x3d-wrap">
        <div class="x3d-left" style="grid-template-columns: repeat(${cols}, var(--cw)); grid-template-rows: repeat(${rows}, var(--ch))">${g}</div>
        <div class="x3d-right">
          <div class="x3d-dv">${d}</div>
          <div class="x3d-q">${Array.from({ length: Q.length }, (_, k) => `<span data-q="${k}"></span>`).join('')}</div>
        </div>
      </div>
    </div>`;
  const root = host.querySelector('.x3d');
  const at = (r, i) => root.querySelector(`.x3d-c[data-r="${r}"][data-i="${i}"]`);
  S.split('').forEach((ch, i) => { at(0, i).textContent = ch; });
  t.root = root; t.plan = plan; t.at = at; t.D = D; t.d = d;
  t.qEl = (k) => root.querySelector(`[data-q="${k}"]`);
  t.mark = (cells, on = true) => { root.querySelectorAll('.x3d-on').forEach(e => e.classList.remove('x3d-on')); if (on) cells.forEach(e => e?.classList.add('x3d-on')); };
  /** Viết số v sao cho chữ số cuối ở cột end, hàng r. */
  t.writeAt = (r, end, v, { sign = false, line = false } = {}) => {
    const s = String(v);
    for (let k = 0; k < s.length; k++) {
      const e = at(r, end - s.length + 1 + k);
      e.textContent = s[k]; e.classList.add('x3d-new');
      if (line) e.classList.add('x3d-line');
    }
    if (sign) {
      const col = end - s.length + 1;
      const e = col > 0 ? at(r, col - 1) : root.querySelector(`.x3d-sign[data-r="${r}"]`);
      e.textContent = '−'; e.classList.add('x3d-minus');
    }
    sfx.pop(r);
  };
  t.writeQ = (k, q) => { const e = t.qEl(k); e.textContent = q; e.classList.add('x3d-new'); sfx.pop(k); };
  /** Chữ số thứ i của số bị chia bay xuống hàng r. */
  t.bringDown = (r, i) => new Promise((res) => {
    const from = at(0, i), to = at(r, i);
    const fs = parseFloat(getComputedStyle(from).fontSize);
    flyOne(`<div class="x3d-fly" style="font-size:${fs}px">${S[i]}</div>`, from.getBoundingClientRect(), to.getBoundingClientRect(), {
      minMs: 420, maxMs: 650, onLand: () => { to.textContent = S[i]; to.classList.add('x3d-new'); sfx.tap(); res(); },
    });
  });
  return t;
}

/** Đi hết các bước chia; từ lượt thứ hai em chọn chữ số của thương và bấm chữ số để hạ. */
async function runDivision(c, t, { demoRounds = 1 } = {}) {
  const { steps } = t.plan;
  const { d } = t;
  let round = 0;
  for (const s of steps) {
    if (s.kind === 'take') {
      const cells = Array.from({ length: s.end + 1 }, (_, i) => t.at(0, i));
      t.mark(cells);
      await c.say(s.end === 0 ? `Lấy ${s.partial} chia ${d}.` : `${String(t.D)[0]} không chia được cho ${d}, lấy ${s.partial} chia ${d}.`,
        s.end === 0 ? `Lấy <b>${s.partial}</b> chia ${d}` : `${String(t.D)[0]} &lt; ${d} → lấy <b>${s.partial}</b> chia ${d}`);
    } else if (s.kind === 'q') {
      t.mark([t.qEl(s.qi)]);
      if (round < demoRounds) {
        await c.say(`${s.partial} chia ${d} được ${s.q}, viết ${s.q}.`);
        t.writeQ(s.qi, s.q);
      } else {
        c.show(`<b>${s.partial} : ${d}</b> được mấy?`);
        const opts = new Set([s.q]);
        for (const w of [s.q + 1, s.q - 1, s.q + 2]) if (opts.size < 3 && w >= 0 && w <= 9) opts.add(w);
        await c.choose([...opts].sort((x, y) => x - y).map(v => ({ html: String(v), value: v })), s.q, { hint: `Nhẩm: số nào nhân ${d} gần ${s.partial} nhất mà không quá ${s.partial}?` });
        t.writeQ(s.qi, s.q);
        await c.say(s.q ? `${s.partial} chia ${d} được ${s.q}, viết ${s.q}.` : `${s.partial} bé hơn ${d}, được 0, viết 0.`);
      }
      round++;
    } else if (s.kind === 'mul') {
      t.writeAt(s.row, s.end, s.p, { sign: true, line: true });
      await c.say(`${s.q} nhân ${d} bằng ${s.p}, viết ${s.p} dưới ${s.partial}.`);
    } else if (s.kind === 'sub') {
      t.writeAt(s.row, s.end, s.r);
      await c.say(`${s.partial} trừ ${s.p} bằng ${s.r}.`);
    } else if (s.kind === 'down') {
      const src = t.at(0, s.col);
      t.mark([src]);
      if (round > demoRounds) {
        c.show(`Bấm chữ số <b>${String(t.D)[s.col]}</b> để hạ xuống.`);
        await c.tap(src);
      }
      await t.bringDown(s.row, s.col);
      const partial = t.plan.steps[t.plan.steps.indexOf(s) + 1]?.partial;
      await c.say(`Hạ ${s.dig}, được ${partial}.`);
    }
  }
  t.mark([], false);
}

const divExplore = (title, D, d, more) => ({
  title,
  setup: (board) => createDivision(board, D, d),
  steps: [
    async (c) => {
      await c.say(`Đặt tính rồi tính ${R(D)} chia ${d}.`, `Đặt tính: <b>${fmt(D)} : ${d}</b>`);
      await c.say('Chia từ trái sang phải. Mỗi lượt làm bốn việc: chia, nhân, trừ, rồi hạ chữ số tiếp theo.', 'Chia từ <b>trái sang phải</b>: chia → nhân → trừ → hạ');
    },
    async (c) => { await runDivision(c, c.t, { demoRounds: 1 }); },
    async (c) => {
      const { q, rem } = c.t.plan;
      await c.say(rem ? `Vậy ${R(D)} chia ${d} được ${R(q)}, dư ${rem}.` : `Vậy ${R(D)} chia ${d} bằng ${R(q)}.`,
        rem ? `${fmt(D)} : ${d} = <b>${fmt(q)}</b> (dư ${rem})` : `${fmt(D)} : ${d} = <b>${fmt(q)}</b>`);
      if (rem) await c.say('Số dư luôn bé hơn số chia.', `Số dư ${rem} &lt; số chia ${d}`);
    },
    ...more,
  ],
});

const B57 = divExplore('Bài 57: Chia số có bốn chữ số cho số có một chữ số', 6384, 4, [
  async (c) => {
    await ask(c, {
      say: 'Thử lại: lấy thương nhân với số chia thì được số bị chia. Một nghìn năm trăm chín mươi sáu nhân 4 bằng bao nhiêu?',
      shown: 'Thử lại: 1 596 × 4 = ?', options: numOptions(6384, [6284, 6484]), answer: 6384,
      hint: 'Phải được số bị chia.', ok: 'Được đúng số bị chia, vậy phép chia đúng.',
    });
  },
  async (c) => { await ask(c, mentalQ(8000, ':', 4, 1000, 'nghìn')); },
]);

const B71 = divExplore('Bài 71: Chia số có năm chữ số cho số có một chữ số', 14273, 3, [
  async (c) => {
    await ask(c, {
      say: 'Thử lại phép chia có dư: lấy thương nhân với số chia, rồi cộng số dư. Bốn nghìn bảy trăm năm mươi bảy nhân 3, cộng 2, bằng bao nhiêu?',
      shown: 'Thử lại: 4 757 × 3 + 2 = ?', options: numOptions(14273, [14271, 14275]), answer: 14273,
      hint: 'Nhớ cộng thêm số dư.', ok: 'Được đúng số bị chia.',
    });
  },
  async (c) => { await ask(c, mentalQ(24000, ':', 3, 1000, 'nghìn')); },
]);

export const CALC = { b54: B54, b55: B55, b56: B56, b57: B57, b64: B64, b70: B70, b71: B71 };

let styled = false;
function injectDivCss() {
  if (styled) return;
  styled = true;
  css('x3d-css', `
    .x3d { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; padding: 2cqh 2cqi 18cqh; font-family: 'Baloo 2', sans-serif; box-sizing: border-box;
      --cw: min(calc(80cqh / var(--rows) * 0.78), calc(88cqi / var(--cols))); --ch: calc(var(--cw) * 1.28); }
    .x3d-wrap { display: flex; align-items: flex-start; }
    .x3d-left { display: grid; border-right: 4px solid ${INK}; padding-right: 0.3em; }
    .x3d-c { display: grid; place-items: center; font-weight: 800; color: #1E293B; font-size: calc(var(--cw) * 1.05); line-height: 1; border-radius: 0.15em; transition: background .2s; }
    .x3d-c[data-r="0"] { color: #1E3A8A; }
    .x3d-sign, .x3d-minus { color: #DC2626 !important; font-size: calc(var(--cw) * 0.8); }
    .x3d-line { box-shadow: inset 0 -3px 0 ${INK}; }
    .x3d-on { background: #FEF08A; }
    .x3d-new { animation: x3dNew .4s ease; }
    @keyframes x3dNew { from { transform: scale(1.5); color: #16A34A; } }
    .x3d-right { display: flex; flex-direction: column; padding-left: 0.3em; min-width: calc(var(--cw) * 2.6); }
    .x3d-dv { height: var(--ch); display: flex; align-items: center; font-weight: 800; color: #1E3A8A; font-size: calc(var(--cw) * 1.05); border-bottom: 4px solid ${INK}; padding: 0 0.2em; }
    .x3d-q { height: var(--ch); display: flex; align-items: center; padding: 0 0.15em; }
    .x3d-q span { width: calc(var(--cw) * 0.95); height: 100%; display: grid; place-items: center; font-weight: 800; color: #15803D; font-size: calc(var(--cw) * 1.05); border-radius: 0.15em; }
    .x3d-q span:empty { box-shadow: inset 0 -2px 0 #CBD5E1; }
    .x3d-fly { width: 100%; height: 100%; display: grid; place-items: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #2563EB; }
    @media (orientation: portrait) { .x3d { padding-bottom: 14cqh; } }
    @media (prefers-reduced-motion: reduce) { .x3d-new { animation: x3dCalm .4s ease; } @keyframes x3dCalm { from { opacity: 0.3; } } }
  `);
}
