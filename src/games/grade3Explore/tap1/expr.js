/**
 * ⚙️ Bài 38: Biểu thức số. Em bấm vào dấu phép tính được làm trước; phép tính đó gộp lại thành kết quả và một dòng
 * mới "= …" hiện ra bên dưới, như cách viết trong sách (mỗi dòng tính một phép).
 * Thứ tự: trong ngoặc trước; nhân, chia trước cộng, trừ; cùng loại thì từ trái sang phải.
 */

import { stage, waitTap, pop, T, R, sfx, INK } from './kit.js';

const SHOW = { '*': '×', ':': ':', '+': '+', '-': '−' };
const isOp = (x) => x in SHOW;

/** Vị trí dấu phép tính phải làm trước. */
export function nextOp(toks) {
  let lo = 0, hi = toks.length;
  const open = toks.lastIndexOf('(');
  if (open >= 0) { lo = open + 1; hi = toks.indexOf(')', open); }
  for (let i = lo; i < hi; i++) if (toks[i] === '*' || toks[i] === ':') return i;
  for (let i = lo; i < hi; i++) if (toks[i] === '+' || toks[i] === '-') return i;
  return -1;
}
function apply(toks, i) {
  const a = toks[i - 1], b = toks[i + 1], op = toks[i];
  const v = op === '+' ? a + b : op === '-' ? a - b : op === '*' ? a * b : a / b;
  const out = [...toks.slice(0, i - 1), v, ...toks.slice(i + 2)];
  // bỏ ngoặc quanh một số
  for (let k = 0; k < out.length - 2; k++) if (out[k] === '(' && out[k + 2] === ')') { out.splice(k + 2, 1); out.splice(k, 1); return { toks: out, v, at: k }; }
  return { toks: out, v, at: i - 1 };
}
const wordOp = { '*': 'nhân', ':': 'chia', '+': 'cộng', '-': 'trừ' };

/** Một biểu thức: tối đa 4 dòng; dòng hiện tại có dấu phép tính bấm được. */
function createExprBoard(board, toks0) {
  const t = stage(board);
  const G = t.G = t.fit();
  t.toks = toks0;
  t.rows = 0;
  t.draw('<g class="x3e-lines"></g>');
  const width = (x) => String(SHOW[x] || x).length;
  const lineH = Math.min(G.tall ? 260 : 170, (G.bot - G.top) / 3.4);
  const paren = (x) => x === '(' || x === ')';
  /** Bề ngang dòng theo cỡ chữ 1 (ngoặc sát số). */
  const span = (items) => items.reduce((s, x, k) => s + width(x) * 0.62 + (k ? (paren(x) || paren(items[k - 1]) ? 0.08 : 0.32) : 0), 0);
  let fs = Math.min(lineH * 0.62, 120);
  /** Cỡ chữ chung cho cả biểu thức: dòng đầu (thêm dấu =) vừa bề ngang. */
  t.size = (toks) => { fs = Math.min(lineH * 0.62, 120, 930 / span(['=', ...toks.map(String)])); };
  t.line = (toks, { lead = '', hot = true, cls = '' } = {}) => {
    const items = (lead ? [lead] : []).concat(toks.map(String));
    const cw = fs * 0.62;
    const gapAt = (k) => (k ? (paren(items[k]) || paren(items[k - 1]) ? fs * 0.08 : fs * 0.32) : 0);
    const total = span(items) * fs;
    let x = 500 - total / 2;
    const y = G.top + lineH * (t.rows + 0.6);
    const g = t.q('.x3e-lines');
    let s = `<g class="x3e-row ${cls}" data-row="${t.rows}">`;
    items.forEach((it, k) => {
      x += gapAt(k);
      const i = lead ? k - 1 : k, w = width(it) * cw;
      const isO = i >= 0 && isOp(toks[i]);
      if (isO && hot) s += `<g data-hot="o${i}">${R(x - fs * 0.22, y - fs * 0.62, w + fs * 0.44, fs * 1.24, { fill: '#FEF3C7', stroke: '#F59E0B', sw: 3, rx: fs * 0.3 })}${T(x + w / 2, y, SHOW[it], { fs, fill: '#B45309' })}</g>`;
      else s += T(x + w / 2, y, isOp(it) ? SHOW[it] : it, { fs, fill: it === lead ? '#64748B' : INK });
      x += w;
    });
    g.insertAdjacentHTML('beforeend', `${s}</g>`);
    t.rows++;
    pop(g.lastElementChild);
  };
  t.clear = () => { t.q('.x3e-lines').innerHTML = ''; t.rows = 0; };
  return t;
}

/** Em bấm lần lượt các phép tính cho tới khi ra giá trị. rule: câu thầy nhắc khi bấm sai. */
async function solve(c, t, toks, { rule }) {
  t.clear();
  t.size(toks);
  t.line(toks);
  let cur = toks, first = true;
  while (cur.length > 1) {
    const i = nextOp(cur);
    await waitTap(c, t, `o${i}`, { glow: !first, wrong: () => rule, nudge: rule });
    const { toks: nx } = apply(cur, i);
    const a = cur[i - 1], b = cur[i + 1];
    t.qa('[data-hot]').forEach(e => { e.removeAttribute('data-hot'); });
    sfx.pop(t.rows);
    t.line(nx, { lead: '=', hot: nx.length > 1 });
    c.show(`${a} ${SHOW[cur[i]]} ${b} = <b>${nx.length > 1 ? apply(cur, i).v : nx[0]}</b>`);
    await c.say(`${a} ${wordOp[cur[i]]} ${b} bằng ${apply(cur, i).v}.`);
    cur = nx;
    first = false;
  }
  sfx.ding();
  return cur[0];
}

export const B38 = {
  title: 'Bài 38: Biểu thức số. Tính giá trị của biểu thức số',
  setup: (board) => createExprBoard(board, []),
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('Biểu thức chỉ có <b>cộng, trừ</b>');
      t.size([60, '+', 25, '-', 10]);
      t.line([60, '+', 25, '-', 10], { hot: false });
      await c.say('60 cộng 25 trừ 10 là một biểu thức số. Biểu thức chỉ có cộng và trừ thì tính từ trái sang phải. Bấm vào dấu phép tính làm trước.', 'Chỉ có <b>+, −</b>: từ trái sang phải');
      const v = await solve(c, t, [60, '+', 25, '-', 10], { rule: 'Chỉ có cộng, trừ: tính từ trái sang phải, phép cộng đứng trước.' });
      await c.say(`Giá trị của biểu thức là ${v}.`, `Giá trị của biểu thức: <b>${v}</b>`);
    },
    async (c) => {
      const t = c.t;
      t.caption('Có <b>nhân</b> và <b>cộng</b>');
      t.clear();
      await c.say('20 cộng 3 nhân 4. Biểu thức có cộng và nhân thì làm phép nhân trước. Bấm vào dấu làm trước.', 'Nhân, chia <b>trước</b>; cộng, trừ <b>sau</b>');
      const v = await solve(c, t, [20, '+', 3, '*', 4], { rule: 'Nhân, chia làm trước; cộng, trừ làm sau.' });
      await c.say(`20 cộng 3 nhân 4 bằng ${v}.`, `Giá trị: <b>${v}</b>`);
    },
    async (c) => {
      const t = c.t;
      t.caption('Có <b>dấu ngoặc</b>');
      t.clear();
      await c.say('Bây giờ có dấu ngoặc: 20 cộng 3, trong ngoặc, nhân 4. Biểu thức có ngoặc thì tính trong ngoặc trước.', 'Trong <b>ngoặc</b> làm trước');
      const v = await solve(c, t, ['(', 20, '+', 3, ')', '*', 4], { rule: 'Tính trong ngoặc trước.' });
      await c.say(`Có ngoặc thì kết quả khác: ${v}.`, `(20 + 3) × 4 = <b>${v}</b> · 20 + 3 × 4 = 32`);
    },
    async (c) => {
      const t = c.t;
      t.caption('Thử với');
      t.clear();
      t.size([50, '-', 5, '*', 2, '=', 40]);
      t.line([50, '-', 5, '*', 2], { hot: false });
      await c.say('Giá trị của biểu thức 50 trừ 5 nhân 2 là bao nhiêu?', '<b>50 − 5 × 2 = ?</b>');
      await c.choose([{ html: '90', value: 90 }, { html: '40', value: 40 }, { html: '35', value: 35 }], 40, { hint: 'Nhân trước: 5 × 2 = 10, rồi 50 − 10.' });
      t.line([40], { lead: '= 50 − 10 =', hot: false });
      await c.say('Nhân trước: 5 nhân 2 bằng 10. Rồi 50 trừ 10 bằng 40.', '50 − 5 × 2 = 50 − 10 = <b>40</b>');
    },
  ],
};
