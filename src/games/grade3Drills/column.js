/**
 * ✍️ Đặt tính rồi tính: cộng, trừ, nhân (số có một chữ số) theo cột dọc, như trong vở.
 * Đặt tính như viết vở: số thứ nhất, dấu phép tính, số thứ hai bay từ đề xuống đúng cột (thẳng hàng đơn vị), rồi em tự
 * kẻ vạch bằng thước (kit.js traceRule). Em tính từ phải sang trái: mỗi hàng gõ chữ số viết
 * ở dưới; hàng nào có nhớ thì gõ thêm số nhớ (cộng, nhân: số nhỏ trên đầu hàng bên trái; trừ: số nhỏ cạnh số trừ
 * của hàng bên trái, "thêm 1"). Hàng cuối cùng viết cả số (vd. 14).
 * Gõ sai: ô rung, thầy nhắc đúng câu của lớp học ("6 cộng 7 bằng 13, viết 3, nhớ 1.") và em gõ lại.
 * Lượt đúng khi không phải sửa bước nào.
 */

import { mountDrill, shake, setActive, setUse, arrowLayer, traceRule, flyDigit, fmt, PLACE, MINUS, fresh, sfx, sleep, how, TEACHER } from './kit.js';

const OPS = { '+': '+', '-': MINUS, '*': '×' };

/** Các bước tính theo cột. op: '+', '-', '*'. */
export function columnSteps(op, a, b) {
  const A = String(a), B = String(b);
  const dg = (s, i) => (i < s.length ? Number(s[s.length - 1 - i]) : null);
  const L = op === '*' ? A.length : Math.max(A.length, B.length);
  const steps = [];
  let carry = 0;
  for (let i = 0; i < L; i++) {
    const ai = dg(A, i), bi = op === '*' ? b : dg(B, i);
    const last = i === L - 1;
    let write, nc = 0, say;
    if (op === '+') {
      const s = ai + (bi ?? 0) + carry;
      write = last ? String(s) : String(s % 10);
      nc = last ? 0 : (s >= 10 ? 1 : 0);
      say = bi == null
        ? (carry ? `${ai} thêm 1 bằng ${s}` : `Hạ ${ai}`)
        : `${ai} cộng ${bi} bằng ${ai + bi}${carry ? `, thêm 1 bằng ${s}` : ''}`;
      say += bi == null && !carry ? `, viết ${write}.` : `, viết ${write}${nc ? ', nhớ 1' : ''}.`;
    } else if (op === '-') {
      const sub = (bi ?? 0) + carry;
      const d = ai < sub ? ai + 10 - sub : ai - sub;
      nc = ai < sub ? 1 : 0;
      write = String(d);
      if (bi == null && !carry) say = `Hạ ${ai}, viết ${ai}.`;
      else {
        const pre = carry && bi != null ? `${bi} thêm 1 bằng ${sub}. ` : '';
        say = pre + (nc
          ? `${ai} không trừ được ${sub}, lấy 1${ai} trừ ${sub} bằng ${d}, viết ${d}, nhớ 1.`
          : `${ai} trừ ${sub} bằng ${d}, viết ${d}.`);
      }
    } else {
      const s = ai * b + carry;
      write = last ? String(s) : String(s % 10);
      nc = last ? 0 : Math.floor(s / 10);
      say = `${b} nhân ${ai} bằng ${ai * b}${carry ? `, thêm ${carry} bằng ${s}` : ''}, viết ${write}${nc ? `, nhớ ${nc}` : ''}.`;
    }
    steps.push({ kind: 'digit', i, write, say });
    if (nc) steps.push({ kind: 'carry', i: i + 1, write: String(nc), say });
    carry = nc;
  }
  return steps;
}

/** Chữ số của đề, mỗi chữ số một thẻ (data-d="a0" = hàng đơn vị của số thứ nhất) để bay xuống cột. */
function digitSpans(n, name) {
  const s = fmt(n);
  let i = String(n).length;
  return [...s].map(ch => (ch === ' ' ? ' ' : `<span data-d="${name}${--i}">${ch}</span>`)).join('');
}

const result = (op, a, b) => (op === '+' ? a + b : op === '-' ? a - b : a * b);
const carries = (op, a, b) => columnSteps(op, a, b).filter(s => s.kind === 'carry').length;

// ── Sinh đề theo cấp ──────────────────────────────────────────────────────────────────────────────────
function makeAdd(rng, lo, hi, max) {
  for (;;) {
    const a = rng.int(lo, hi), b = rng.int(Math.max(10, Math.floor(lo / 3)), max - a);
    if (b >= 10 && a + b <= max && carries('+', a, b) >= 1) return { op: '+', a, b };
  }
}
function makeSub(rng, lo, hi) {
  for (;;) {
    const a = rng.int(lo, hi), b = rng.int(Math.max(10, Math.floor(a / 6)), a - Math.floor(a / 5));
    if (String(a - b).length === String(a).length && carries('-', a, b) >= 1) return { op: '-', a, b };
  }
}
function makeMul(rng, lo, hi, max) {
  for (;;) {
    const b = rng.int(2, 9), a = rng.int(lo, Math.min(hi, Math.floor(max / b)));
    if (a >= lo && a * b <= max && carries('*', a, b) >= 1) return { op: '*', a, b };
  }
}

export const COLUMN_LEVELS = [
  {
    id: 'drill-col-1', n: 1, title: 'Cộng có nhớ', missions: 5,
    desc: 'Đặt tính rồi tính trong phạm vi 1 000, vd. 457 + 368.',
    knowledge: 'cộng có nhớ trong phạm vi 1 000', lessons: { workbook: ['bai-2'] },
    ask: () => 'Đặt tính thẳng cột rồi cộng từ hàng đơn vị. Đừng quên số nhớ!',
    gen: (rng) => makeAdd(rng, 100, 899, 999),
  },
  {
    id: 'drill-col-2', n: 2, title: 'Trừ có nhớ', missions: 5,
    desc: 'Đặt tính rồi tính trong phạm vi 1 000, vd. 532 − 278.',
    knowledge: 'trừ có nhớ trong phạm vi 1 000', lessons: { workbook: ['bai-2'] },
    ask: () => 'Trừ từ hàng đơn vị. Không trừ được thì lấy thêm 1 chục, nhớ 1 sang hàng bên trái!',
    gen: (rng) => makeSub(rng, 200, 999),
  },
  {
    id: 'drill-col-3', n: 3, title: 'Nhân số có hai chữ số', missions: 5,
    desc: 'Nhân số có hai chữ số với số có một chữ số, vd. 26 × 3.',
    knowledge: 'bảng nhân 2 đến 9', lessons: { workbook: ['bai-23'] },
    ask: () => 'Nhân từ hàng đơn vị, nhớ sang hàng chục!',
    gen: (rng) => makeMul(rng, 12, 99, 500),
  },
  {
    id: 'drill-col-4', n: 4, title: 'Nhân số có ba chữ số', missions: 5,
    desc: 'Nhân số có ba chữ số với số có một chữ số, vd. 214 × 4.',
    knowledge: 'bảng nhân 2 đến 9, nhân số có hai chữ số', lessons: { workbook: ['bai-36'] },
    ask: () => 'Nhân lần lượt từng hàng, nhớ cộng thêm số nhớ!',
    gen: (rng) => makeMul(rng, 102, 499, 999),
  },
  {
    id: 'drill-col-5', n: 5, title: 'Cộng, trừ số lớn', missions: 6,
    desc: 'Cộng, trừ các số có bốn, năm chữ số, vd. 4 528 + 3 765, 62 413 − 27 586.',
    knowledge: 'cộng, trừ có nhớ trong phạm vi 1 000', lessons: { workbook: ['bai-54', 'bai-55', 'bai-63', 'bai-64'] },
    ask: () => 'Số lớn cũng làm như số nhỏ: thẳng cột, từ hàng đơn vị sang trái!',
    gen: (rng, k) => {
      const big = k % 3 === 2;
      return k % 2 === 0 ? makeAdd(rng, big ? 10000 : 1000, big ? 69999 : 7999, big ? 99999 : 9999) : makeSub(rng, big ? 20000 : 2000, big ? 99999 : 9999);
    },
  },
  {
    id: 'drill-col-6', n: 6, title: 'Nhân số lớn', missions: 5,
    desc: 'Nhân số có bốn, năm chữ số với số có một chữ số, vd. 1 427 × 6.',
    knowledge: 'nhân số có ba chữ số với số có một chữ số', lessons: { workbook: ['bai-56', 'bai-70'] },
    ask: () => 'Nhân từng hàng từ phải sang trái, đừng quên số nhớ!',
    gen: (rng, k) => (k % 2 ? makeMul(rng, 10123, 49999, 99999) : makeMul(rng, 1012, 9999, 99999)),
  },
];

export const COLUMN_GAME = {
  id: 'drill-col', icon: '✍️', title: 'Đặt tính: cộng, trừ, nhân',
  purpose: 'Giúp em luyện đặt tính rồi tính như trong vở: viết các chữ số thẳng cột, tính từ hàng đơn vị, nhớ đúng số nhớ.',
  unitWord: 'phép tính', starPrefix: 'drill', npcs: [TEACHER], levels: COLUMN_LEVELS,
  stallIcon: () => '✍️',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> phép tính.`,
  againText: 'Làm lượt mới',
  howTo: how(['📝', 'Đặt tính'], ['➡️', 'Từ phải sang trái'], ['🔴', 'Viết số nhớ'], ['✅', 'Đúng hết']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), (m) => `${m.a}${m.op}${m.b}`);
  },

  mountMission(stage, m, level, api) {
    const { op, a, b } = m;
    const R = result(op, a, b);
    const A = String(a), B = String(b), RS = String(R);
    const L = Math.max(A.length, B.length, RS.length);
    const W = L + 1; // + cột dấu phép tính
    const steps = columnSteps(op, a, b);
    const sign = OPS[op];
    // Hàng: 0 = số nhớ (cộng, nhân), 1 = số thứ nhất, 2 = dấu + số thứ hai, 3 = kết quả.
    const col = (i) => W - i; // cột lưới (1-based) của hàng thứ i tính từ phải
    const cells = [];
    const cell = (row, c, cls = '', text = '') => {
      cells.push(`<div class="g3d-c ${cls}" style="grid-row:${row + 1};grid-column:${c}" data-r="${row}" data-c="${c}">${text}</div>`);
    };
    for (let i = 0; i < L; i++) {
      if (op !== '-') cell(0, col(i), 'g3c-carry');
      cell(1, col(i), 'g3c-a');
      cell(2, col(i), 'g3c-b');
      cell(3, col(i), 'g3c-res g3d-in');
    }
    cell(2, 1, 'g3c-sign'); // dấu và vạch kẻ: viết trong start()
    // Cỡ ô theo khung tờ vở: vừa W cột (thêm lề) và 3,6 hàng + dòng đề.
    const board = `
      <div class="g3c-head"><span>Đặt tính rồi tính:</span> <b class="g3c-expr">${digitSpans(a, 'a')} <span data-d="op">${sign}</span> ${digitSpans(b, 'b')}</b> <b class="g3c-eq">= <span class="g3c-ans">?</span></b></div>
      <div class="g3d-grid g3c-grid" style="--cell:min(calc((100cqi - min(7rem, 14cqi)) / ${W + 0.8}), calc((100cqh - 6.5rem) / 3.9), 220px);grid-template-columns:repeat(${W}, var(--cell));grid-template-rows:calc(var(--cell) * 0.55) repeat(3, var(--cell))">
        ${cells.join('')}
      </div>`;
    const { paper, say, show, hint, pad, done } = mountDrill(stage, { api, board, cls: 'g3c-scene' });
    injectColumnStyles();
    const at = (row, i) => paper.querySelector(`[data-r="${row}"][data-c="${col(i)}"]`);
    // Trừ: số nhớ viết nhỏ cạnh chữ số của số trừ (hàng bên trái), kể cả khi số trừ ngắn hơn.
    const borrowEl = (i) => {
      const host = at(2, i);
      let s = host.querySelector('.g3c-borrow');
      if (!s) { s = document.createElement('span'); s.className = 'g3c-borrow'; host.appendChild(s); }
      return s;
    };
    const carryEl = (i) => (op === '-' ? borrowEl(i) : at(0, i));
    const arrows = arrowLayer(paper.querySelector('.g3c-grid'));
    let tracing = null;
    let mistakes = 0;
    let firstWrong = null;
    let k = -1;

    async function start() {
      say(`Em đặt tính rồi tính ${fmt(a)} ${op === '+' ? 'cộng' : op === '-' ? 'trừ' : 'nhân'} ${fmt(b)}. Bắt đầu từ hàng đơn vị.`,
        'Viết các số <b>thẳng cột</b>…');
      // Đặt tính: số thứ nhất, dấu, số thứ hai bay từ đề xuống đúng cột (hàng đơn vị thẳng hàng đơn vị), rồi kẻ vạch.
      const put = (s, name, row) => Math.max(...[...s].map((ch, j) => {
        const i = s.length - 1 - j;
        const target = at(row, i);
        return flyDigit(ch, paper.querySelector(`[data-d="${name}${i}"]`), target, {
          delay: j * 110, onLand: () => { target.prepend(ch); sfx.pop(j); },
        });
      }));
      await sleep(put(A, 'a', 1) + 150);
      const signEl = paper.querySelector('[data-r="2"][data-c="1"]');
      await sleep(flyDigit(sign, paper.querySelector('[data-d="op"]'), signEl, { onLand: () => { signEl.textContent = sign; sfx.pop(3); } }) + 150);
      await sleep(put(B, 'b', 2) + 200);
      tracing = traceRule(paper.querySelector('.g3c-grid'), 2, { say, show, hint });
      await tracing.done;
      tracing = null;
      next();
    }

    function next() {
      k++;
      if (k >= steps.length) return finish();
      const s = steps[k];
      if (s.kind === 'digit') {
        const n = s.write.length;
        const els = Array.from({ length: n }, (_, j) => at(3, s.i + n - 1 - j)); // trái → phải
        setActive(paper, els);
        // Chữ số đang tính sáng lên (cả số nhớ cộng thêm); phép nhân: mũi tên từ thừa số thứ hai tới chữ số đang nhân.
        const cWrite = steps[k - 1]?.kind === 'carry' ? steps[k - 1].write : ''; // chữ số nhớ có thể còn đang bay lên ô
        const carry = cWrite ? carryEl(s.i) : null;
        if (op === '*') {
          setUse(paper, [at(2, 0), at(1, s.i), carry]);
          arrows.draw([{ from: at(2, 0), to: at(1, s.i) }]);
          show(`<b>${b} × ${A[A.length - 1 - s.i]}</b>${carry ? `, thêm nhớ <b>${cWrite}</b>` : ''}: viết ${n > 1 ? 'số' : 'chữ số'} nào?`);
        } else {
          setUse(paper, [s.i < A.length && at(1, s.i), s.i < B.length && at(2, s.i), carry]);
          show(`<b>${PLACE[s.i]}</b>: viết ${n > 1 ? 'số' : 'chữ số'} nào?`);
        }
        pad.want({
          max: n, auto: true,
          onType: (t) => els.forEach((el, j) => { el.textContent = t[j] || ''; }),
          onSubmit: (t) => check(t, els),
        });
      } else {
        const el = carryEl(s.i);
        arrows.clear();
        setActive(paper, el);
        show(`Nhớ mấy? Viết số nhớ nhỏ ở <b>${PLACE[s.i].toLowerCase()}</b>.`);
        pad.want({ max: 1, auto: true, onType: () => {}, onSubmit: (t) => check(t, [el], true) });
      }
    }

    function check(t, els, isCarry = false) {
      const s = steps[k];
      if (t === s.write) {
        if (isCarry) {
          // Số nhớ bay từ chữ số vừa viết lên chỗ nhớ.
          const src = at(3, s.i - 1);
          els[0].textContent = '';
          flyDigit(t, src, els[0], { onLand: () => { els[0].textContent = t; } });
        } else {
          els.forEach((el, j) => { el.textContent = t[j]; });
        }
        sfx.pop(k % 6);
        setActive(paper, null);
        next();
        return;
      }
      mistakes++;
      firstWrong ??= s.say;
      els.forEach(el => { el.textContent = ''; });
      shake(els);
      hint(s.say);
      pad.want(padOpts());
    }
    // Gõ lại cùng bước (giữ nguyên cách nộp của bước đó).
    const padOpts = () => {
      const s = steps[k];
      if (s.kind === 'carry') { const el = carryEl(s.i); return { auto: true, max: 1, onType: () => {}, onSubmit: (t) => check(t, [el], true) }; }
      const n = s.write.length;
      const els = Array.from({ length: n }, (_, j) => at(3, s.i + n - 1 - j));
      return { auto: true, max: n, onType: (t) => els.forEach((el, j) => { el.textContent = t[j] || ''; }), onSubmit: (t) => check(t, els) };
    };

    async function finish() {
      setActive(paper, null);
      setUse(paper, null);
      arrows.clear();
      paper.querySelector('.g3c-ans').textContent = fmt(R);
      paper.querySelector('.g3c-eq').classList.add('g3c-eq-done');
      paper.querySelectorAll('.g3c-res').forEach((el, j) => setTimeout(() => el.classList.add('g3d-ok-flash'), j * 70));
      await sleep(500);
      done(mistakes, { ok: `${fmt(a)} ${sign} ${fmt(b)} = ${fmt(R)}.`, tip: firstWrong ? `Nhớ: ${firstWrong}` : '' });
    }

    if (import.meta.env.DEV) window.__g3drill = { m, steps, step: () => (tracing ? tracing.finish() : pad.type(steps[k]?.write ?? '')),
      wrong: () => pad.type([...(steps[k]?.write ?? '')].map(c => (Number(c) + 1) % 10).join('')) };
    start();
  },
};

let colStyles = false;
export function injectColumnStyles() {
  if (colStyles) return;
  colStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g3c-grid { margin: auto; }
    .g3c-line { border-bottom: 5px solid #1E293B; }
    .g3c-sign { font-size: calc(var(--cell) * 0.7); color: #1E293B; }
    .g3c-carry { font-size: calc(var(--cell) * 0.42); color: #DC2626; align-self: end; height: calc(var(--cell) * 0.55); }
    .g3c-carry.g3d-on { border-radius: 0.3em; }
    .g3c-borrow { position: absolute; left: 2%; bottom: 16%; width: 0.44em; height: 0.5em; font-size: calc(var(--cell) * 0.4); color: #DC2626; display: grid; place-items: center; line-height: 1; border-radius: 0.2em; }
    .g3c-res { color: #1D4ED8; }
  `;
  document.head.appendChild(st);
}
