/**
 * ✖️ Nhân đặt tính với số có một, hai, ba chữ số (Toán 4), như trong vở:
 *   36 × 23: 3 nhân 36 được tích riêng thứ nhất 108; 2 nhân 36 được tích riêng thứ hai 72, viết lùi sang trái một cột;
 *   cộng hai tích riêng (Hạ 8; 0 cộng 2 bằng 2…) được 828.
 * Mỗi tích riêng đi từ hàng đơn vị sang trái, có số nhớ đỏ (xoá khi sang tích riêng mới). Chữ số đang nhân của hai thừa số
 * sáng lên, mũi tên đỏ chỉ từ chữ số đang nhân của thừa số thứ hai tới chữ số của thừa số thứ nhất; bước cộng: các chữ số
 * cùng cột của các tích riêng sáng lên. Số có một chữ số: chỉ một tích riêng, không có bước cộng (giống Đặt tính lớp 3).
 * Đặt tính từng bước như viết vở: thừa số thứ nhất, dấu ×, thừa số thứ hai bay xuống, rồi em tự kẻ vạch bằng thước.
 * Tích riêng thứ hai trở đi: ô bỏ trống bên phải được gạch chéo đỏ, mũi tên chỉ lùi sang trái; trước tích riêng cuối
 * thầy viết dấu + và em kẻ vạch thứ hai.
 * Khung (lớp học, tờ vở, bàn phím, thầy nhắc khi sai): grade3Drills/kit.js.
 */

import { mountDrill, shake, setActive, setUse, arrowLayer, traceRule, popIn, flyDigit, fmt, PLACE, fresh, sfx, sleep, how, TEACHER } from '../grade3Drills/kit.js';
import { columnSteps, injectColumnStyles } from '../grade3Drills/column.js';

const ORD = ['thứ nhất', 'thứ hai', 'thứ ba'];
const digitsOf = (n) => [...String(n)].reverse().map(Number); // [đơn vị, chục, …]

/** Các bước: từng tích riêng (theo columnSteps nhân một chữ số, lùi j cột), rồi cộng các tích riêng. */
export function mulSteps(a, b) {
  const bs = digitsOf(b);
  const steps = [];
  const parts = bs.map((bj, j) => {
    steps.push({ kind: 'part', j, bj });
    for (const s of columnSteps('*', a, bj)) steps.push({ ...s, j, bj, ai: digitsOf(a)[s.kind === 'carry' ? s.i - 1 : s.i] });
    return a * bj;
  });
  if (bs.length > 1) {
    steps.push({ kind: 'add' });
    const rows = parts.map(digitsOf);
    const last = Math.max(...rows.map((r, j) => r.length + j)) - 1;
    let carry = 0;
    for (let i = 0; i <= last; i++) {
      const ds = rows.map((r, j) => r[i - j]).filter(x => x != null);
      const sum = ds.reduce((x, y) => x + y, 0) + carry;
      const isLast = i === last;
      const write = isLast ? String(sum) : String(sum % 10);
      const nc = isLast ? 0 : Math.floor(sum / 10);
      let say;
      if (ds.length === 1 && !carry) say = `Hạ ${ds[0]}, viết ${write}.`;
      else if (ds.length === 1) say = `${ds[0]} thêm ${carry} bằng ${sum}, viết ${write}${nc ? `, nhớ ${nc}` : ''}.`;
      else {
        const plain = ds.reduce((x, y) => x + y, 0);
        say = `${ds.join(' cộng ')} bằng ${plain}${carry ? `, thêm ${carry} bằng ${sum}` : ''}, viết ${write}${nc ? `, nhớ ${nc}` : ''}.`;
      }
      steps.push({ kind: 'sum', i, write, say });
      if (nc) steps.push({ kind: 'scarry', i: i + 1, write: String(nc), say });
      carry = nc;
    }
  }
  return { steps, parts };
}

function digitSpans(n, name) {
  const s = fmt(n);
  let i = String(n).length;
  return [...s].map(ch => (ch === ' ' ? ' ' : `<span data-d="${name}${--i}">${ch}</span>`)).join('');
}

/** Thừa số thứ hai không có chữ số 0 hay 1 (mỗi tích riêng là một phép nhân thật). */
function makeMul(rng, [aLo, aHi], [bLo, bHi]) {
  for (;;) {
    const a = rng.int(aLo, aHi), b = rng.int(bLo, bHi);
    if (/[01]/.test(String(b)) || /0{2}/.test(String(a))) continue;
    return { a, b };
  }
}

export const MUL_LEVELS = [
  {
    id: 'd4-mul-1', n: 1, title: 'Nhân với số có một chữ số', missions: 5,
    desc: 'Số có năm, sáu chữ số, vd. 24 516 × 3, 132 418 × 4.',
    knowledge: 'bảng nhân 2 đến 9, nhân có nhớ', lessons: { sgk4: ['bai-38'] },
    ask: () => 'Nhân lần lượt từ hàng đơn vị sang trái, nhớ cộng thêm số nhớ!',
    gen: (rng, k) => makeMul(rng, k % 2 ? [102345, 249999] : [10234, 99999], [2, 9]),
  },
  {
    id: 'd4-mul-2', n: 2, title: 'Nhân với số có hai chữ số', missions: 5,
    desc: 'Vd. 36 × 23, 125 × 34. Tích riêng thứ hai viết lùi sang trái một cột.',
    knowledge: 'nhân với số có một chữ số, cộng có nhớ', lessons: { sgk4: ['bai-43'] },
    ask: () => 'Nhân hàng đơn vị trước, rồi hàng chục. Tích riêng thứ hai lùi sang trái một cột!',
    gen: (rng, k) => makeMul(rng, k % 2 ? [102, 499] : [12, 98], [22, 98]),
  },
  {
    id: 'd4-mul-3', n: 3, title: 'Số lớn nhân với số có hai chữ số', missions: 4,
    desc: 'Vd. 1 254 × 36, 21 347 × 25.',
    knowledge: 'nhân với số có hai chữ số', lessons: { sgk4: ['bai-43'] },
    ask: () => 'Số dài cũng vậy: hai tích riêng, lùi một cột, rồi cộng lại!',
    gen: (rng, k) => makeMul(rng, k % 2 ? [10234, 39999] : [1023, 9999], [22, 98]),
  },
  {
    id: 'd4-mul-4', n: 4, title: 'Nhân với số có ba chữ số', missions: 4,
    desc: 'Nâng cao: vd. 254 × 132, 1 427 × 245. Ba tích riêng, mỗi tích lùi thêm một cột.',
    knowledge: 'nhân với số có hai chữ số', lessons: { sgk4: ['bai-43'] },
    ask: () => 'Ba tích riêng: hàng đơn vị, hàng chục, hàng trăm. Mỗi tích lùi sang trái một cột!',
    gen: (rng, k) => makeMul(rng, k % 2 ? [1023, 4999] : [102, 999], [222, 989]),
  },
];

export const MUL_GAME = {
  id: 'd4-mul', icon: '✖️', title: 'Nhân nhiều chữ số',
  purpose: 'Giúp em đặt tính nhân như trong vở: nhân từ hàng đơn vị, viết các tích riêng lùi sang trái một cột rồi cộng lại.',
  unitWord: 'phép nhân', starPrefix: 'drill4', npcs: [TEACHER], levels: MUL_LEVELS,
  stallIcon: () => '✖️',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> phép nhân.`,
  againText: 'Làm lượt mới',
  howTo: how(['📝', 'Đặt tính'], ['✖️', 'Tích riêng'], ['⬅️', 'Lùi một cột'], ['➕', 'Cộng lại']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), (m) => `${m.a}*${m.b}`);
  },

  mountMission(stage, m, level, api) {
    const { a, b } = m;
    const R = a * b;
    const A = String(a), B = String(b), RS = String(R);
    const nb = B.length, multi = nb > 1;
    const { steps, parts } = mulSteps(a, b);
    const L = Math.max(A.length, B.length, RS.length, ...parts.map((p, j) => String(p).length + j));
    const W = L + 1;
    // Hàng: 0 = số nhớ, 1 = thừa số thứ nhất, 2 = × thừa số thứ hai, 3… = tích riêng, cuối = tích (khi có nhiều tích riêng).
    const partRow = (j) => 3 + j;
    const resRow = multi ? 3 + nb : 3;
    const rowsN = resRow + 1;
    const col = (i) => W - i;
    const cells = [];
    const cell = (row, c, cls = '', text = '') => {
      cells.push(`<div class="g3d-c ${cls}" style="grid-row:${row + 1};grid-column:${c}" data-r="${row}" data-c="${c}">${text}</div>`);
    };
    for (let i = 0; i < L; i++) {
      cell(0, col(i), 'g3c-carry');
      cell(1, col(i), 'g3c-a');
      cell(2, col(i), 'g3c-b');
      if (multi) parts.forEach((_, j) => cell(partRow(j), col(i), 'g4m-part g3d-in'));
      cell(resRow, col(i), 'g3c-res g3d-in');
    }
    // Dấu ×, dấu + và các vạch kẻ chưa có: viết dần trong lượt (start, bước tích riêng cuối).
    cell(2, 1, 'g3c-sign');
    if (multi) cell(partRow(nb - 1), 1, 'g3c-sign');
    const board = `
      <div class="g3c-head"><span>Đặt tính rồi tính:</span> <b class="g3c-expr">${digitSpans(a, 'a')} <span data-d="op">×</span> ${digitSpans(b, 'b')}</b> <b class="g3c-eq">= <span class="g3c-ans">?</span></b></div>
      <div class="g3d-grid g3c-grid" style="--cell:min(calc((100cqi - 7rem) / ${W + 0.8}), calc((100cqh - 6.5rem) / ${rowsN - 0.4}), 200px);grid-template-columns:repeat(${W}, var(--cell));grid-template-rows:calc(var(--cell) * 0.55) repeat(${rowsN - 1}, var(--cell))">
        ${cells.join('')}
      </div>`;
    const { paper, say, show, hint, pad, done } = mountDrill(stage, { api, board, cls: 'g3c-scene' });
    injectColumnStyles();
    injectStyles();
    const at = (row, i) => paper.querySelector(`[data-r="${row}"][data-c="${col(i)}"]`);
    const clearCarries = () => { phase++; paper.querySelectorAll('[data-r="0"]').forEach(el => { el.textContent = ''; }); };
    const arrows = arrowLayer(paper.querySelector('.g3c-grid'));
    /** Chữ số đang dùng sáng lên (+ số nhớ đang cộng thêm); arrow: mũi tên từ chữ số của thừa số thứ hai tới chữ số đang nhân. */
    const focus = (ai, j, { carry = null, arrow = false } = {}) => {
      setUse(paper, [j != null && at(2, j), ai != null && at(1, ai), carry]);
      if (arrow) arrows.draw([{ from: at(2, j), to: at(1, ai) }]);
      else arrows.clear();
    };
    const grid = paper.querySelector('.g3c-grid');
    const signAt = (row) => paper.querySelector(`[data-r="${row}"][data-c="1"]`);
    let tracing = null;
    /** Em kẻ vạch dưới hàng `row` bằng thước (bàn phím nghỉ trong lúc kẻ). */
    const rule = async (row) => {
      pad.off();
      setActive(paper, null);
      tracing = traceRule(grid, row, { say, show, hint });
      await tracing.done;
      tracing = null;
    };
    let mistakes = 0;
    let firstWrong = null;
    let k = -1;
    let phase = 0; // tăng khi xoá hàng nhớ: số nhớ còn đang bay của tích riêng trước không được đáp xuống nữa

    async function start() {
      say(`Em đặt tính rồi tính ${fmt(a)} nhân ${fmt(b)}.${multi ? ' Nhân với từng chữ số, bắt đầu từ hàng đơn vị.' : ' Bắt đầu từ hàng đơn vị.'}`,
        'Viết các số <b>thẳng cột</b>…');
      // Viết như trong vở: thừa số thứ nhất, dấu ×, thừa số thứ hai (thẳng cột đơn vị), rồi kẻ vạch.
      const put = (s, name, row) => Math.max(...[...s].map((ch, j) => {
        const i = s.length - 1 - j;
        const target = at(row, i);
        return flyDigit(ch, paper.querySelector(`[data-d="${name}${i}"]`), target, {
          delay: j * 110, onLand: () => { target.prepend(ch); sfx.pop(j); },
        });
      }));
      await sleep(put(A, 'a', 1) + 150);
      const sign = signAt(2);
      await sleep(flyDigit('×', paper.querySelector('[data-d="op"]'), sign, { onLand: () => { sign.textContent = '×'; sfx.pop(3); } }) + 150);
      await sleep(put(B, 'b', 2) + 200);
      await rule(2);
      next();
    }

    /** Bắt đầu một tích riêng. Từ tích riêng thứ hai: gạch chéo ô bỏ trống, mũi tên lùi sang trái; tích riêng cuối: dấu + và vạch kẻ. */
    async function startPart(s) {
      if (!s.j) {
        show(`Tích riêng ${ORD[0]}: nhân <b>${s.bj}</b> với ${fmt(a)}.`);
        setTimeout(next, 900);
        return;
      }
      pad.off();
      setActive(paper, null);
      const row = partRow(s.j);
      show(`Tích riêng ${ORD[s.j]}: nhân <b>${s.bj}</b> với ${fmt(a)}. Viết <b>lùi sang trái ${s.j} cột</b>, ${s.j > 1 ? `${s.j} ô` : 'ô'} bên phải bỏ trống.`);
      for (let t = 0; t < s.j; t++) {
        await sleep(t ? 250 : 350);
        at(row, t).classList.add('g4m-skip');
        sfx.pop(t);
      }
      arrows.draw([{ from: at(row, 0), to: at(row, s.j) }]);
      await sleep(1700);
      arrows.clear();
      if (s.j === nb - 1) {
        show(`${nb === 2 ? 'Hai' : 'Các'} tích riêng sẽ <b>cộng</b> lại: viết dấu <b>+</b>.`);
        popIn(signAt(row), '+');
        await sleep(900);
        await rule(row);
      }
      focus(null, s.j);
      next();
    }

    // Ô của một bước gõ (trái → phải) và câu nhắc trên bong bóng.
    function target(s) {
      if (s.kind === 'digit') {
        const n = s.write.length, row = multi ? partRow(s.j) : resRow;
        return { els: Array.from({ length: n }, (_, t) => at(row, s.i + s.j + n - 1 - t)), carry: false };
      }
      if (s.kind === 'carry') return { els: [at(0, s.i + s.j)], carry: true };
      if (s.kind === 'sum') {
        const n = s.write.length;
        return { els: Array.from({ length: n }, (_, t) => at(resRow, s.i + n - 1 - t)), carry: false };
      }
      return { els: [at(0, s.i)], carry: true }; // scarry
    }

    function next() {
      k++;
      const s = steps[k];
      if (!s) return finish();
      if (s.kind === 'part') {
        clearCarries();
        focus(null, s.j);
        if (multi) startPart(s);
        else next();
        return;
      }
      if (s.kind === 'add') {
        clearCarries();
        focus(null, null);
        paper.querySelectorAll('.g4m-part').forEach(el => el.classList.add('g4m-sumrow'));
        show('Cộng các tích riêng, từ hàng đơn vị.');
        setTimeout(next, 900);
        return;
      }
      const { els, carry } = target(s);
      // Số nhớ cộng thêm ở bước này = bước nhớ ngay trước (chữ số nhớ có thể còn đang bay lên ô).
      const prev = steps[k - 1];
      const cWrite = (s.kind === 'digit' && prev?.kind === 'carry') || (s.kind === 'sum' && prev?.kind === 'scarry') ? prev.write : '';
      const cIn = cWrite ? at(0, s.kind === 'digit' ? s.i + s.j : s.i) : null;
      if (s.kind === 'digit') focus(s.i, multi ? s.j : 0, { carry: cIn, arrow: true });
      else if (s.kind === 'carry') focus(s.i - 1, multi ? s.j : 0);
      else if (s.kind === 'sum') setUse(paper, [...parts.map((_, j) => at(partRow(j), s.i)).filter(el => el?.textContent), cIn]);
      setActive(paper, els);
      if (carry) show(`Nhớ mấy? Viết số nhớ nhỏ ở <b>${PLACE[s.kind === 'carry' ? s.i + s.j : s.i].toLowerCase()}</b>.`);
      else if (s.kind === 'digit') show(`<b>${s.bj} × ${s.ai}</b>${cIn ? `, thêm nhớ <b>${cWrite}</b>` : ''}${multi && s.i === 0 && s.j ? ` · viết thẳng cột ${PLACE[s.j].toLowerCase()}` : ''}: viết ${els.length > 1 ? 'số' : 'chữ số'} nào?`);
      else show(`Cộng <b>${PLACE[s.i].toLowerCase()}</b>: viết ${els.length > 1 ? 'số' : 'chữ số'} nào?`);
      want(els, carry);
    }

    function want(els, carry) {
      pad.want({
        max: els.length, auto: true,
        onType: carry ? () => {} : (t) => els.forEach((el, j) => { el.textContent = t[j] || ''; }),
        onSubmit: (t) => check(t, els, carry),
      });
    }

    function check(t, els, carry) {
      const s = steps[k];
      if (t === s.write) {
        if (carry) {
          const src = s.kind === 'carry' ? (multi ? at(partRow(s.j), s.i + s.j - 1) : at(resRow, s.i - 1)) : at(resRow, s.i - 1);
          const ph = phase;
          els[0].textContent = '';
          flyDigit(t, src, els[0], { onLand: () => { if (ph === phase) els[0].textContent = t; } });
        } else els.forEach((el, j) => { el.textContent = t[j]; });
        sfx.pop(k % 6);
        setActive(paper, null);
        next();
        return;
      }
      mistakes++;
      firstWrong ??= s.say;
      if (!carry) els.forEach(el => { el.textContent = ''; });
      shake(els);
      const shift = multi && s.kind === 'digit' && s.i === 0 && s.j ? ` Tích riêng ${ORD[s.j]} viết lùi sang trái ${s.j} cột, thẳng cột ${PLACE[s.j].toLowerCase()}.` : '';
      hint(s.say + shift);
      want(els, carry);
    }

    async function finish() {
      setActive(paper, null);
      focus(null, null);
      clearCarries();
      paper.querySelector('.g3c-ans').textContent = fmt(R);
      paper.querySelector('.g3c-eq').classList.add('g3c-eq-done');
      paper.querySelectorAll('.g3c-res').forEach((el, j) => setTimeout(() => el.classList.add('g3d-ok-flash'), j * 70));
      await sleep(500);
      done(mistakes, { ok: `${fmt(a)} × ${fmt(b)} = ${fmt(R)}.`, tip: firstWrong ? `Nhớ: ${firstWrong}` : '' });
    }

    if (import.meta.env.DEV) window.__g3drill = { m, steps, cur: () => steps[k], step: () => (tracing ? tracing.finish() : pad.type(steps[k]?.write ?? '')),
      wrong: () => pad.type([...(steps[k]?.write ?? '')].map(c => (Number(c) + 1) % 10).join('')) };
    start();
  },
};

let styles = false;
function injectStyles() {
  if (styles) return;
  styles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g4m-part { color: #7C3AED; }
    .g4m-sumrow { color: #6D28D9; }
    /* Ô bỏ trống của tích riêng viết lùi: gạch chéo đỏ như cô giáo đánh dấu */
    .g4m-skip::before, .g4m-skip::after { content: ''; position: absolute; left: 24%; right: 24%; top: 50%; height: max(3px, calc(var(--cell) * 0.07)); margin-top: max(-1.5px, calc(var(--cell) * -0.035));
      background: #DC2626; border-radius: 9px; opacity: 0.8; transform: rotate(38deg); animation: g4mSkip .3s ease-out both; }
    .g4m-skip::after { transform: rotate(-38deg); animation-delay: .12s; }
    @keyframes g4mSkip { from { opacity: 0; } }
  `;
  document.head.appendChild(st);
}
