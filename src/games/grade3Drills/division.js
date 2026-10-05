/**
 * ➗ Chia đặt tính: chia số có 2–5 chữ số cho số có một chữ số, cách viết đầy đủ như lớp 3
 * (viết tích dưới số bị chia, trừ, hạ chữ số tiếp theo). Mỗi lượt đi đúng vòng "chia, nhân, trừ, hạ":
 *   lấy: chạm chữ số cuối của số đem chia lần đầu (2 không chia được 4 → lấy 23);
 *   chia: gõ chữ số của thương; nhân: gõ tích viết dưới; trừ: gõ hiệu; hạ: chạm chữ số tiếp theo, nó bay xuống.
 * Đặt tính như viết vở: số bị chia bay xuống, em kẻ vạch dọc bằng thước, số chia bay xuống, em kẻ vạch ngang dưới số chia;
 * mỗi vòng: viết tích, thầy viết dấu trừ, em kẻ vạch dưới tích rồi mới trừ (kit.js traceRule).
 * Thương có chữ số 0 (bé hơn số chia → viết 0, hạ tiếp) và phép chia có dư (số dư bé hơn số chia) có cấp riêng.
 * Số chia có hai, ba chữ số (Luyện Tính lớp 4, grade4Drills.js): cùng các bước; tích và hiệu có thể nhiều chữ số,
 * thầy gợi ý ước lượng thương ("Nhẩm 6 : 2") và nhắc giảm dần khi ước lượng quá lớn.
 */

import { mountDrill, shake, setActive, setUse, arrowLayer, traceRule, popIn, flyDigit, fmt, fresh, sfx, sleep, how, TEACHER } from './kit.js';

/** Các bước của phép chia D : d (cách viết đầy đủ). */
export function divSteps(D, d) {
  const S = String(D), n = S.length;
  let end = 0, partial = Number(S[0]);
  while (partial < d && end < n - 1) { end++; partial = partial * 10 + Number(S[end]); }
  const steps = [{ kind: 'take', end, partial }];
  let row = 0, start = 0, qi = 0;
  for (;;) {
    const q = Math.floor(partial / d);
    steps.push({ kind: 'q', qi, q, partial });
    if (q > 0) {
      const p = q * d, r = partial - p;
      steps.push({ kind: 'mul', row: row + 1, end, p, q, partial, start });
      steps.push({ kind: 'sub', row: row + 2, end, r, p, partial });
      row += 2;
      start = end;
      partial = r;
    }
    qi++;
    if (end + 1 >= n) break;
    end++;
    steps.push({ kind: 'down', row, col: end, dig: Number(S[end]) });
    partial = partial * 10 + Number(S[end]);
  }
  return { steps, rows: row + 1, rem: partial, q: Math.floor(D / d) };
}

const hasZero = (q) => String(q).includes('0');

/**
 * Ước lượng thương khi số chia có nhiều chữ số (SGK Toán 4): bỏ bớt các chữ số cuối của cả hai số rồi nhẩm,
 * vd. 67 : 21 → 6 : 2 = 3; 179 : 25 → 17 : 2 = 8, thử 8 × 25 = 200 > 179 nên giảm còn 7.
 */
export function estimate(partial, d) {
  const cut = 10 ** (String(d).length - 1);
  const a = Math.floor(partial / cut), b = Math.floor(d / cut);
  return { a, b, est: Math.min(9, Math.floor(a / b)) };
}

function quotientHint(partial, d, q) {
  if (!q) return `${partial} bé hơn ${d}, được 0, viết 0 vào thương.`;
  if (d < 10) return `${partial} chia ${d} được ${q}, viết ${q}.`;
  const { a, b, est } = estimate(partial, d);
  const head = `Nhẩm ${a} chia ${b} được ${est}.`;
  if (est === q) return `${head} Thử: ${q} nhân ${d} bằng ${q * d}, không quá ${partial}. Viết ${q}.`;
  if (est > q) return `${head} Thử: ${est} nhân ${d} bằng ${est * d}, lớn hơn ${partial}, giảm dần còn ${q}: ${q} nhân ${d} bằng ${q * d}. Viết ${q}.`;
  return `${head} Thử: ${est} nhân ${d} bằng ${est * d}, còn thừa nhiều, tăng lên ${q}: ${q} nhân ${d} bằng ${q * d}. Viết ${q}.`;
}

/** Đổi chữ số cuối (DEV: gõ sai có cùng số chữ số để bàn phím tự nộp). */
const bump = (v) => { const t = String(v); return t.slice(0, -1) + ((Number(t.at(-1)) + 1) % 10); };

function makeDiv(rng, { lo, hi, rem = null, zero = null }) {
  for (;;) {
    const d = rng.int(2, 9), D = rng.int(lo, hi);
    const q = Math.floor(D / d), r = D % d;
    if (q < 10) continue;
    if (rem === true && !r) continue;
    if (rem === false && r) continue;
    if (zero === true && !hasZero(q)) continue;
    if (zero === false && hasZero(q)) continue;
    return { D, d };
  }
}

export const DIVISION_LEVELS = [
  {
    id: 'drill-div-1', n: 1, title: 'Chia hết, số có hai chữ số', missions: 5,
    desc: 'Vd. 84 : 4, 72 : 3. Chia, nhân, trừ, hạ.',
    knowledge: 'bảng chia 2 đến 9', lessons: { workbook: ['bai-26'] },
    ask: () => 'Nhớ vòng chia, nhân, trừ, hạ. Chia từ trái sang phải!',
    gen: (rng) => makeDiv(rng, { lo: 10, hi: 99, rem: false, zero: false }),
  },
  {
    id: 'drill-div-2', n: 2, title: 'Phép chia có dư', missions: 5,
    desc: 'Vd. 87 : 4 = 21 (dư 3). Số dư phải bé hơn số chia.',
    knowledge: 'bảng chia, phép chia có dư', lessons: { workbook: ['bai-25', 'bai-26'] },
    ask: () => 'Chia xong còn thừa thì đó là số dư. Số dư luôn bé hơn số chia!',
    gen: (rng) => makeDiv(rng, { lo: 10, hi: 99, rem: true, zero: false }),
  },
  {
    id: 'drill-div-3', n: 3, title: 'Số có ba chữ số', missions: 5,
    desc: 'Vd. 236 : 4. Chữ số đầu bé hơn số chia thì lấy hai chữ số.',
    knowledge: 'chia số có hai chữ số cho số có một chữ số', lessons: { workbook: ['bai-37'] },
    ask: () => 'Chữ số đầu không chia được thì lấy hai chữ số đầu để chia!',
    gen: (rng, k) => makeDiv(rng, { lo: 100, hi: 999, rem: k % 2 === 1, zero: false }),
  },
  {
    id: 'drill-div-4', n: 4, title: 'Thương có chữ số 0', missions: 5,
    desc: 'Vd. 816 : 4 = 204. Hạ xuống mà bé hơn số chia thì viết 0 ở thương.',
    knowledge: 'chia số có ba chữ số cho số có một chữ số', lessons: { workbook: ['bai-37', 'bai-57'] },
    ask: () => 'Hạ xuống mà vẫn bé hơn số chia thì viết 0 vào thương rồi hạ tiếp. Đừng quên số 0!',
    gen: (rng, k) => makeDiv(rng, { lo: k % 2 ? 1000 : 200, hi: k % 2 ? 9999 : 999, zero: true }),
  },
  {
    id: 'drill-div-5', n: 5, title: 'Số có bốn, năm chữ số', missions: 4,
    desc: 'Vd. 4 728 : 6, 37 125 : 5.',
    knowledge: 'chia số có ba chữ số cho số có một chữ số', lessons: { workbook: ['bai-57', 'bai-71'] },
    ask: () => 'Số dài cũng làm đúng vòng chia, nhân, trừ, hạ cho tới chữ số cuối!',
    gen: (rng, k) => makeDiv(rng, { lo: k % 2 ? 10000 : 1000, hi: k % 2 ? 99999 : 9999 }),
  },
];

export const DIVISION_GAME = {
  id: 'drill-div', icon: '➗', title: 'Chia đặt tính',
  purpose: 'Giúp em luyện phép chia đặt tính như trong vở: chia từ trái sang phải theo vòng chia, nhân, trừ, hạ; thương có chữ số 0 và phép chia có dư.',
  unitWord: 'phép chia', starPrefix: 'drill', npcs: [TEACHER], levels: DIVISION_LEVELS,
  stallIcon: () => '➗',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> phép chia.`,
  againText: 'Làm lượt mới',
  howTo: how(['➗', 'Chia'], ['✖️', 'Nhân'], ['➖', 'Trừ'], ['⬇️', 'Hạ']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), (m) => `${m.D}:${m.d}`);
  },

  mountMission(stage, m, level, api) {
    const { D, d } = m;
    const S = String(D), n = S.length;
    const { steps, rows, rem, q } = divSteps(D, d);
    const QS = String(q), DS = String(d);
    const Qw = Math.max(2, QS.length, DS.length);
    // Cột lưới: 1 = lề cho dấu trừ, 2…n+1 = số bị chia, n+2… = số chia / thương.
    const lc = (c) => c + 2; // cột lưới của chữ số thứ c (từ trái, 0-based) của số bị chia
    const rc = (j) => n + 2 + j;
    const cols = n + 1 + Qw;
    const R = Math.max(2, rows);
    const cells = [];
    for (let r = 0; r < R; r++) for (let c = 0; c < n; c++) {
      cells.push(`<div class="g3d-c g3v-l${r === 0 ? ' g3v-dvd' : ''}" style="grid-row:${r + 1};grid-column:${lc(c)}" data-r="${r}" data-c="${c}"></div>`);
    }
    for (let j = 0; j < Qw; j++) {
      cells.push(`<div class="g3d-c g3v-div" style="grid-row:1;grid-column:${rc(j)}"></div>`);
      cells.push(`<div class="g3d-c g3v-q g3d-in" style="grid-row:2;grid-column:${rc(j)}" data-q="${j}"></div>`);
    }
    // Chữ số của đề, mỗi chữ số một thẻ để bay xuống (data-d="D0" = chữ số đầu tiên của số bị chia).
    const spans = (v, name) => { let c = 0; return [...fmt(v)].map(ch => (ch === ' ' ? ' ' : `<span data-d="${name}${c++}">${ch}</span>`)).join(''); };
    const board = `
      <div class="g3c-head g3v-head"><span>Đặt tính rồi tính:</span> <b>${spans(D, 'D')} : ${spans(d, 'd')}</b> <b class="g3c-eq">= <span class="g3c-ans">?</span></b></div>
      <div class="g3d-grid g3v-grid" style="--cell:min(calc((100cqi - 7rem) / ${cols + 0.6}), calc((100cqh - 6.5rem) / ${R + 0.5}), 200px);grid-template-columns:repeat(${cols}, var(--cell));grid-template-rows:repeat(${R}, var(--cell))">
        ${cells.join('')}
      </div>`;
    const { paper, say, show, hint, pad, done } = mountDrill(stage, { api, board, cls: 'g3v-scene' });
    injectDivStyles();
    const at = (r, c) => paper.querySelector(`[data-r="${r}"][data-c="${c}"]`);
    const qCell = (j) => paper.querySelector(`[data-q="${j}"]`);
    const dvd = [...paper.querySelectorAll('.g3v-dvd')];
    const divEls = [...paper.querySelectorAll('.g3v-div')].slice(0, DS.length);
    const grid = paper.querySelector('.g3v-grid');
    const arrows = arrowLayer(grid);
    let tracing = null;
    /** Em kẻ vạch bằng thước (bàn phím nghỉ trong lúc kẻ). */
    const rule = async (spec) => {
      pad.off();
      setActive(paper, null);
      tracing = traceRule(grid, spec, { say, show, hint });
      await tracing.done;
      tracing = null;
    };
    let mulLeft = 0; // cột trái nhất của vạch dưới tích (dấu trừ ở cột ngay bên trái)
    // Số đang đem chia nằm ở hàng curRow, tận cùng ở cột curEnd; chữ số thương và tích vừa viết (cho bước nhân, trừ).
    let curRow = 0, curEnd = 0, qEl = null, prodEls = [];
    const partialEls = (partial) => { const w = String(partial).length; return Array.from({ length: w }, (_, j) => at(curRow, curEnd - w + 1 + j)); };

    let mistakes = 0;
    let firstWrong = null;
    let k = -1;
    let tapHandler = null;
    dvd.forEach((el, c) => el.addEventListener('click', () => tapHandler?.(c, el)));

    const wrong = (els, text) => {
      mistakes++;
      firstWrong ??= text;
      shake(els);
      hint(text);
    };

    /**
     * Gõ một số vào các ô els (trái → phải). rtl: viết từ hàng đơn vị sang trái như tính cột (tích, hiệu), ô đang chờ
     * là ô của chữ số tiếp theo; onDigit(n) báo đã gõ n chữ số (đổi câu nhắc, mũi tên theo từng chữ số).
     */
    function typeStep(els, want, prompt, hintText, { rtl = false, onDigit } = {}) {
      const n = els.length;
      const cellOf = (j) => (rtl ? els[n - 1 - j] : els[j]); // ô của chữ số gõ thứ j
      const focusNext = (len) => { if (rtl) { setActive(paper, els[n - 1 - Math.min(len, n - 1)]); onDigit?.(Math.min(len, n - 1)); } };
      setActive(paper, els);
      show(prompt);
      focusNext(0);
      const opts = {
        max: want.length, auto: true,
        onType: (t) => { els.forEach(el => { el.textContent = ''; }); [...t].forEach((ch, j) => { cellOf(j).textContent = ch; }); focusNext(t.length); },
        onSubmit: (raw) => {
          const t = rtl ? [...raw].reverse().join('') : raw;
          if (t === want) { els.forEach((el, j) => { el.textContent = want[j]; }); sfx.pop(k % 6); setActive(paper, null); next(); return; }
          els.forEach(el => { el.textContent = ''; });
          wrong(els, hintText);
          focusNext(0);
          pad.want(opts);
        },
      };
      pad.want(opts);
    }

    function tapStep(prompt, onTap) {
      pad.off();
      setActive(paper, null);
      paper.classList.add('g3v-tapping');
      show(prompt);
      tapHandler = (c, el) => {
        sfx.tap();
        if (onTap(c, el)) { tapHandler = null; paper.classList.remove('g3v-tapping'); }
      };
    }

    function next() {
      k++;
      const s = steps[k];
      if (!s) return finish();
      if (s.kind === 'take') {
        tapStep(`Lấy mấy chữ số để chia cho ${d}? <b>Chạm chữ số cuối</b> của số em lấy.`, (c, el) => {
          if (c === s.end) {
            curEnd = c;
            dvd.slice(0, c + 1).forEach(x => x.classList.add('g3v-taken'));
            show(`Lấy <b>${s.partial}</b> chia ${d}.`);
            setTimeout(next, 700);
            return true;
          }
          const val = Number(S.slice(0, c + 1));
          wrong(el, c < s.end
            ? `${val} bé hơn ${d}, chưa chia được. Lấy ${s.partial} chia ${d}.`
            : `${s.partial} đã chia được cho ${d}, chỉ lấy ${s.partial}.`);
          return false;
        });
        return;
      }
      if (s.kind === 'q') {
        const est = d >= 10 && s.partial >= d ? estimate(s.partial, d) : null;
        // Chia: mũi tên từ số đang đem chia tới số chia.
        qEl = qCell(s.qi);
        setUse(paper, [...partialEls(s.partial), ...divEls]);
        arrows.draw([{ from: partialEls(s.partial), to: divEls, bend: -1 }]);
        typeStep([qCell(s.qi)], String(s.q), `<b>${s.partial}</b> chia ${d} được mấy?${est ? ` <small class="g3v-est">Nhẩm ${est.a} : ${est.b}</small>` : ''}`,
          quotientHint(s.partial, d, s.q));
        return;
      }
      if (s.kind === 'mul') {
        const P = String(s.p);
        const els = [...P].map((_, j) => at(s.row, s.end - P.length + 1 + j));
        prodEls = els;
        // Dấu trừ và vạch dưới tích: viết sau khi có tích (bước trừ).
        mulLeft = Math.min(s.start, s.end - String(s.partial).length + 1, s.end - P.length + 1);
        // Nhân từ hàng đơn vị như nhân cột: mỗi chữ số của tích ứng với một chữ số của số chia (nhớ sang chữ số sau).
        // plan[t] = chữ số thứ t của tích (từ phải): nhân với chữ số j của số chia (từ phải), số nhớ c.
        const plan = [];
        let c = 0;
        [...DS].reverse().map(Number).forEach((x, j, dd) => {
          const v = s.q * x + c, last = j === dd.length - 1;
          for (let t = 0; t < (last ? String(v).length : 1); t++) plan.push({ j, x, c });
          c = last ? 0 : Math.floor(v / 10);
        });
        const lead = `Viết tích dưới <b>${s.partial}</b>, từ hàng đơn vị.`;
        typeStep(els, P, lead, `${s.q} nhân ${d} bằng ${s.p}, viết ${s.p} thẳng dưới ${s.partial}.`, {
          rtl: true,
          onDigit: (t) => {
            const { j, x, c: cin } = plan[Math.min(t, plan.length - 1)];
            const dEl = divEls[DS.length - 1 - j];
            setUse(paper, [qEl, dEl]);
            arrows.draw([{ from: qEl, to: dEl }]);
            show(`${t ? '' : `${lead} `}<b>${s.q} × ${x}</b>${cin ? `, thêm nhớ <b>${cin}</b>` : ''}: viết chữ số nào?`);
          },
        });
        return;
      }
      if (s.kind === 'sub') { subStep(s); return; }
      // down: hạ chữ số tiếp theo
      arrows.clear();
      setUse(paper, null);
      curRow = s.row;
      curEnd = s.col;
      tapStep('<b>Hạ</b> chữ số tiếp theo xuống: chạm vào nó.', (c, el) => {
        if (c !== s.col) { wrong(el, `Hạ chữ số ngay sau chỗ vừa chia: hạ ${s.dig}.`); return false; }
        const to = at(s.row, s.col);
        el.classList.add('g3v-down');
        flyDigit(String(s.dig), el, to, { onLand: () => { to.prepend(String(s.dig)); to.classList.add('g3d-in'); sfx.pop(2); next(); } });
        return true;
      });
    }

    /** Trừ: thầy viết dấu trừ (giữa số đem chia và tích), em kẻ vạch dưới tích bằng thước, rồi gõ hiệu. */
    async function subStep(s) {
      const Rs = String(s.r);
      const els = [...Rs].map((_, j) => at(s.row, s.end - Rs.length + 1 + j));
      arrows.clear();
      setUse(paper, [...partialEls(s.partial), ...prodEls]);
      pad.off();
      // Ô riêng trong lưới (không bị xoá khi gõ), nằm giữa hàng số đem chia và hàng tích.
      grid.insertAdjacentHTML('beforeend', `<div class="g3v-minus" style="grid-row:${s.row};grid-column:${lc(mulLeft - 1)}"><span></span></div>`);
      show(`Viết dấu <b>trừ</b>, kẻ vạch dưới <b>${s.p}</b>.`);
      popIn(grid.lastElementChild.firstElementChild, '−');
      await sleep(600);
      await rule({ row: s.row, cols: `${lc(mulLeft)} / ${lc(s.end) + 1}`, cls: 'g3v-thin' });
      setUse(paper, [...partialEls(s.partial), ...prodEls]);
      curRow = s.row;
      curEnd = s.end;
      typeStep(els, Rs, `<b>${s.partial}</b> trừ ${s.p} bằng mấy?${Rs.length > 1 ? ' Viết từ hàng đơn vị.' : ''}`, `${s.partial} trừ ${s.p} bằng ${s.r}, viết ${s.r}.`, { rtl: Rs.length > 1 });
    }

    /** Đặt tính: số bị chia bay xuống, kẻ vạch dọc, số chia bay xuống, kẻ vạch ngang dưới số chia. */
    async function start() {
      say(`Em đặt tính rồi tính ${fmt(D)} chia ${d}.`, `Chia <b>${fmt(D)} : ${d}</b>. Viết số bị chia trước.`);
      const put = (str, name, els) => Math.max(...[...str].map((ch, c) => flyDigit(ch, paper.querySelector(`[data-d="${name}${c}"]`), els[c], {
        delay: c * 110, onLand: () => { els[c].textContent = ch; sfx.pop(c); },
      })));
      await sleep(put(S, 'D', dvd) + 200);
      await rule({ vertical: true, col: rc(0), rows: `1 / ${R + 1}` });
      await sleep(put(DS, 'd', divEls) + 200);
      await rule({ row: 1, cols: `${rc(0)} / ${rc(Qw - 1) + 1}` });
      show(`Chia <b>${fmt(D)} : ${d}</b>. Chia từ trái sang phải.`);
      setTimeout(next, 500);
    }

    async function finish() {
      pad.off();
      setActive(paper, null);
      setUse(paper, null);
      arrows.clear();
      paper.querySelector('.g3c-ans').textContent = rem ? `${fmt(q)} (dư ${rem})` : fmt(q);
      paper.querySelector('.g3c-eq').classList.add('g3c-eq-done');
      paper.querySelectorAll('.g3v-q').forEach((el, j) => setTimeout(() => el.classList.add('g3d-ok-flash'), j * 80));
      await sleep(600);
      const ok = rem ? `${fmt(D)} : ${d} = ${fmt(q)} (dư ${rem}). Số dư ${rem} bé hơn số chia ${d}.` : `${fmt(D)} : ${d} = ${fmt(q)}.`;
      done(mistakes, { ok, tip: firstWrong ? `Nhớ: ${firstWrong}` : '' });
    }

    if (import.meta.env.DEV) {
      // Tích, hiệu gõ từ hàng đơn vị: gõ ngược chuỗi.
      const typed = (v, rtl) => (rtl ? [...String(v)].reverse().join('') : String(v));
      window.__g3drill = { m, steps, step: () => {
        if (tracing) return tracing.finish();
        const s = steps[k];
        if (!s) return;
        if (s.kind === 'take') tapHandler?.(s.end, dvd[s.end]);
        else if (s.kind === 'down') tapHandler?.(s.col, dvd[s.col]);
        else pad.type(typed(s.kind === 'q' ? s.q : s.kind === 'mul' ? s.p : s.r, s.kind !== 'q'));
      }, wrong: () => {
        const s = steps[k];
        if (s?.kind === 'take' || s?.kind === 'down') { const c = s.kind === 'take' ? (s.end ? 0 : 1) : 0; tapHandler?.(c, dvd[c]); }
        else if (s) pad.type(typed(bump(s.kind === 'q' ? s.q : s.kind === 'mul' ? s.p : s.r), s.kind !== 'q'));
      } };
    }
    start();
  },
};

let divStyles = false;
function injectDivStyles() {
  if (divStyles) return;
  divStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g3v-q { color: #1D4ED8; }
    .g3d-rule.g3v-thin { height: 3px; bottom: -1.5px; }
    .g3v-minus { width: var(--cell); height: var(--cell); display: grid; place-items: center; transform: translate(25%, -50%); font-size: calc(var(--cell) * 0.7); color: #1E293B; line-height: 1; pointer-events: none; }
    .g3v-taken { text-decoration: underline; text-decoration-color: #F59E0B; text-decoration-thickness: 0.08em; text-underline-offset: 0.08em; }
    .g3v-tapping .g3v-dvd { cursor: pointer; }
    .g3v-tapping .g3v-dvd:not(.g3v-down) { background: #FEF9C3; box-shadow: inset 0 0 0 3px #FCD34D; border-radius: 0.2em; animation: g3dBlink 1.1s ease-in-out infinite; }
    .g3v-down { color: #94A3B8; }
    .g3v-est { display: inline-block; margin-left: 0.4em; padding: 0 0.5em; border-radius: 999px; background: #E0F2FE; color: #0369A1; font-weight: 800; font-size: 0.85em; }
    @media (prefers-reduced-motion: reduce) { .g3v-tapping .g3v-dvd { animation: none; } }
  `;
  document.head.appendChild(st);
}
