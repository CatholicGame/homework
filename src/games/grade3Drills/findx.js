/**
 * ❓ Tìm thành phần chưa biết, đi đúng các bước như ở lớp:
 *   1. "?" là gì trong phép tính? (số hạng, số bị trừ, số trừ, thừa số, số bị chia, số chia) — nút to;
 *      chọn xong, dưới mỗi số hiện tên của nó.
 *   2. Muốn tìm nó thì làm phép gì? Dòng "? = 60 … 25" có sẵn hai số, em chọn dấu (+ − × :).
 *   3. Tính rồi gõ kết quả.
 *   4. Thử lại: số vừa tìm bay vào chỗ "?" của đề, dòng thử lại hiện ra với dấu ✓.
 * Sai bước nào: thầy đọc quy tắc của bước đó ("Muốn tìm số hạng, ta lấy tổng trừ đi số hạng kia."), em làm lại.
 */

import { mountDrill, shake, setActive, flyDigit, fmt, fresh, sfx, sleep, how, TEACHER } from './kit.js';

const NAMES = {
  '+': ['Số hạng', 'Số hạng', 'Tổng'],
  '−': ['Số bị trừ', 'Số trừ', 'Hiệu'],
  '×': ['Thừa số', 'Thừa số', 'Tích'],
  ':': ['Số bị chia', 'Số chia', 'Thương'],
};
const SIGNS = ['+', '−', '×', ':'];
const calc = (x, op, y) => (op === '+' ? x + y : op === '−' ? x - y : op === '×' ? x * y : x / y);

/** Cách tìm "?" ở vị trí pos (0 hoặc 2) của phép a op b = c: { x, op, y, rule }. */
export function solveRule(op, pos, a, b, c) {
  if (op === '+') return { x: c, op: '−', y: pos === 0 ? b : a, rule: 'Muốn tìm số hạng, ta lấy tổng trừ đi số hạng kia.' };
  if (op === '×') return { x: c, op: ':', y: pos === 0 ? b : a, rule: 'Muốn tìm thừa số, ta lấy tích chia cho thừa số kia.' };
  if (op === '−') return pos === 0
    ? { x: c, op: '+', y: b, rule: 'Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ.' }
    : { x: a, op: '−', y: c, rule: 'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu.' };
  return pos === 0
    ? { x: c, op: '×', y: b, rule: 'Muốn tìm số bị chia, ta lấy thương nhân với số chia.' }
    : { x: a, op: ':', y: c, rule: 'Muốn tìm số chia, ta lấy số bị chia chia cho thương.' };
}

/** Đề dạng k (0–3 lần lượt: ? ở đầu / ở giữa, phép thứ nhất / thứ hai của cặp). */
function makeEq(rng, kind, k, big) {
  const pos = k % 2 ? 2 : 0;
  if (kind === 'addsub') {
    const op = k % 4 < 2 ? '+' : '−';
    const lo = big ? 1000 : 10, hi = big ? 49999 : 499;
    const a = rng.int(lo, hi), b = rng.int(lo, hi);
    if (op === '+') return { a, op, b, c: a + b, pos };
    const [x, y] = a > b ? [a, b] : [b, a];
    return { a: x, op, b: y, c: x - y, pos };
  }
  const op = k % 4 < 2 ? '×' : ':';
  if (big) {
    const d = rng.int(2, 9), q = rng.int(102, Math.floor(9999 / d));
    return op === '×' ? { a: pos === 0 ? q : d, op, b: pos === 0 ? d : q, c: q * d, pos } : { a: q * d, op, b: d, c: q, pos };
  }
  const t = rng.int(2, 9), u = rng.int(2, 9);
  return op === '×' ? { a: t, op, b: u, c: t * u, pos } : { a: t * u, op, b: t, c: u, pos };
}

export const FINDX_LEVELS = [
  {
    id: 'drill-x-1', n: 1, title: 'Trong phép cộng, phép trừ', missions: 4,
    desc: 'Vd. ? + 25 = 60, 70 − ? = 32.', knowledge: 'tên các thành phần của phép cộng, phép trừ', lessons: { workbook: ['bai-3'] },
    ask: () => 'Gọi đúng tên số cần tìm trước, rồi mới chọn phép tính!',
    gen: (rng, k) => makeEq(rng, 'addsub', k, false),
  },
  {
    id: 'drill-x-2', n: 2, title: 'Trong phép nhân, phép chia', missions: 4,
    desc: 'Vd. ? × 4 = 28, 56 : ? = 8.', knowledge: 'bảng nhân, bảng chia, tên các thành phần', lessons: { workbook: ['bai-13'] },
    ask: () => 'Thừa số, số bị chia hay số chia? Gọi tên rồi tìm!',
    gen: (rng, k) => makeEq(rng, 'muldiv', k, false),
  },
  {
    id: 'drill-x-3', n: 3, title: 'Trộn, số lớn', missions: 4,
    desc: 'Vd. ? − 2 518 = 4 736, ? : 4 = 1 205.', knowledge: 'cộng, trừ, nhân, chia số lớn', lessons: { workbook: ['bai-54', 'bai-55', 'bai-56', 'bai-57'] },
    ask: () => 'Số lớn vẫn làm đủ bốn bước: gọi tên, chọn phép tính, tính, thử lại!',
    gen: (rng, k) => makeEq(rng, k % 2 ? 'muldiv' : 'addsub', rng.int(0, 3), true),
  },
];

export const FINDX_GAME = {
  id: 'drill-x', icon: '❓', title: 'Tìm thành phần chưa biết',
  purpose: 'Giúp em tìm số chưa biết theo cách ở lớp: gọi tên số cần tìm, nhớ quy tắc để chọn phép tính, tính rồi thử lại.',
  unitWord: 'bài', starPrefix: 'drill', npcs: [TEACHER], levels: FINDX_LEVELS,
  stallIcon: () => '❓',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> bài.`,
  againText: 'Làm lượt mới',
  howTo: how(['🏷️', 'Gọi tên'], ['➕', 'Chọn phép tính'], ['⌨️', 'Tính'], ['✅', 'Thử lại']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), (m) => `${m.a}${m.op}${m.b}=${m.c}@${m.pos}`);
  },

  mountMission(stage, m, level, api) {
    const { a, op, b, c, pos } = m;
    const vals = [a, b, c];
    const ans = vals[pos === 0 ? 0 : 1];
    const sol = solveRule(op, pos, a, b, c);
    const names = NAMES[op];
    const want = names[pos === 0 ? 0 : 1];
    const choices = [...new Set(names)].concat(op === '+' ? ['Hiệu'] : op === '×' ? ['Thương'] : []);
    const term = (v, i) => `<span class="g3x-term"><span class="g3x-num" data-t="${i}">${(i === 0 && pos === 0) || (i === 1 && pos === 2) ? '<b class="g3x-q">?</b>' : fmt(v)}</span><span class="g3x-name" data-n="${i}">${names[i]}</span></span>`;
    const ansW = `${String(fmt(ans)).length * 0.6 + 0.8}em`;
    const board = `
      <div class="g3x">
        <div class="g3x-eq">${term(a, 0)}<span class="g3x-op">${op}</span>${term(b, 1)}<span class="g3x-op">=</span>${term(c, 2)}</div>
        <div class="g3x-choices" data-ch></div>
        <div class="g3x-line g3x-solve"><b class="g3x-q">?</b> = ${fmt(sol.x)} <span class="g3x-sign" data-sign>…</span> ${fmt(sol.y)} = <span class="g3d-box" style="--boxw:${ansW}" data-ans></span></div>
        <div class="g3x-line g3x-check" data-check>Thử lại: <span data-ck></span></div>
      </div>`;
    const { paper, say, hint, pad, done } = mountDrill(stage, { api, board, cls: 'g3x-scene' });
    injectFindxStyles();
    const ch = paper.querySelector('[data-ch]');
    const signEl = paper.querySelector('[data-sign]');
    const ansEl = paper.querySelector('[data-ans]');
    const qEl = paper.querySelector('.g3x-eq .g3x-q');
    let mistakes = 0;
    let tip = '';
    let stepNow = 'name';

    const wrong = (el, text, shown) => { mistakes++; tip ||= shown || text; shake(el); hint(text, shown); };
    const buttons = (list, cls, onPick) => {
      ch.innerHTML = list.map(t => `<button type="button" class="g3g-btn g3d-choice ${cls}" data-v="${t}">${t}</button>`).join('');
      ch.querySelectorAll('[data-v]').forEach(btn => { btn.onclick = () => { sfx.tap(); onPick(btn.dataset.v, btn); }; });
    };

    // 1. Gọi tên
    say('Số cần tìm là gì trong phép tính?', 'Dấu <b>?</b> là gì trong phép tính?');
    setActive(paper, qEl);
    buttons(choices, 'g3x-name-btn', (v, btn) => {
      if (stepNow !== 'name') return;
      if (v !== want) { wrong(btn, `Dấu hỏi chưa phải ${v.toLowerCase()}. Nhìn lại vị trí của nó trong phép ${op === '+' ? 'cộng' : op === '−' ? 'trừ' : op === '×' ? 'nhân' : 'chia'}.`); return; }
      btn.classList.add('g3d-choice-ok');
      paper.querySelector('.g3x-eq').classList.add('g3x-named');
      stepNow = 'sign';
      setTimeout(stepSign, 600);
    });

    // 2. Chọn phép tính
    function stepSign() {
      setActive(paper, signEl);
      paper.querySelector('.g3x-solve').classList.add('g3x-show');
      say(`Muốn tìm ${want.toLowerCase()}, ta làm phép tính gì?`, `Muốn tìm <b>${want.toLowerCase()}</b>, làm phép tính gì?`);
      buttons(SIGNS, 'g3x-sign-btn', (v, btn) => {
        if (stepNow !== 'sign') return;
        if (v !== sol.op) { wrong(btn, sol.rule); return; }
        signEl.textContent = v;
        btn.classList.add('g3d-choice-ok');
        stepNow = 'calc';
        setTimeout(stepCalc, 400);
      });
    }

    // 3. Tính
    function stepCalc() {
      ch.querySelectorAll('button').forEach(x => { x.disabled = true; });
      setActive(paper, ansEl);
      say(`Tính ${sol.x} ${sol.op === '−' ? 'trừ' : sol.op === '+' ? 'cộng' : sol.op === '×' ? 'nhân' : 'chia'} ${sol.y}.`, `Tính <b>${fmt(sol.x)} ${sol.op} ${fmt(sol.y)}</b>.`);
      const opts = {
        max: String(ans).length + 1,
        onType: (t) => { ansEl.textContent = t ? fmt(t) : ''; },
        onSubmit: (t) => {
          if (Number(t) !== ans) { ansEl.textContent = ''; wrong(ansEl, `${fmt(sol.x)} ${sol.op} ${fmt(sol.y)} = ${fmt(ans)}.`); pad.want(opts); return; }
          pad.off();
          setActive(paper, null);
          ansEl.classList.add('g3d-box-ok');
          stepCheck();
        },
      };
      pad.want(opts);
    }

    // 4. Thử lại
    async function stepCheck() {
      say('Thử lại xem đúng chưa!', 'Thử lại!');
      const numEl = qEl.parentElement;
      await sleep(flyDigit(fmt(ans), ansEl, numEl, { onLand: () => { numEl.textContent = fmt(ans); numEl.classList.add('g3x-found'); sfx.pop(3); } }) + 200);
      const ck = paper.querySelector('[data-ck]');
      ck.innerHTML = `${fmt(pos === 0 ? ans : a)} ${op} ${fmt(pos === 2 ? ans : b)} = ${fmt(calc(pos === 0 ? ans : a, op, pos === 2 ? ans : b))} ✅`;
      paper.querySelector('.g3x-check').classList.add('g3x-show');
      await sleep(700);
      done(mistakes, { ok: `${want} cần tìm là ${fmt(ans)}.`, tip: tip ? `Nhớ: ${sol.rule}` : '' });
    }

    if (import.meta.env.DEV) {
      window.__g3drill = { m, step: () => {
        if (stepNow === 'name') ch.querySelector(`[data-v="${want}"]`)?.click();
        else if (stepNow === 'sign') ch.querySelector(`[data-v="${sol.op}"]`)?.click();
        else pad.type(String(ans));
      }, wrong: () => ch.querySelector(`[data-v]:not([data-v="${stepNow === 'name' ? want : sol.op}"])`)?.click() };
    }
  },
};

let fxStyles = false;
function injectFindxStyles() {
  if (fxStyles) return;
  fxStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g3x { flex: 1; min-height: 0; display: grid; grid-template-rows: 1.5fr 1fr 0.8fr 0.7fr; gap: 2cqh; padding: 2cqh 3cqi 2cqh calc(clamp(1.4rem, 4cqi, 3rem) + 2cqi); font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .g3x > * { min-height: 0; }
    .g3x-eq { display: flex; align-items: center; justify-content: center; gap: 0.3em; font-size: min(15cqh, 7cqi); line-height: 1; }
    .g3x-term { display: inline-flex; flex-direction: column; align-items: center; gap: 0.12em; }
    .g3x-num { height: 1.2em; display: inline-grid; place-items: center; }
    .g3x-op { padding-bottom: 0.5em; }
    .g3x-name { font-size: 0.3em; color: #7C3AED; background: #F3E8FF; border-radius: 999px; padding: 0.1em 0.6em; visibility: hidden; white-space: nowrap; }
    .g3x-named .g3x-name { visibility: visible; }
    .g3x-q { display: inline-grid; place-items: center; min-width: 1.4em; height: 1.15em; border: 0.07em solid #F97316; border-radius: 0.2em; color: #EA580C; background: #FFF7ED; }
    .g3x-found { color: #15803D; }
    .g3x-choices { display: flex; gap: 2cqi; justify-content: center; align-items: stretch; }
    .g3x-name-btn { max-width: 28cqi; font-size: min(7cqh, 4.6cqi); }
    .g3x-sign-btn { font-size: min(12cqh, 7cqi); max-width: 18cqi; }
    .g3x-line { display: flex; align-items: center; justify-content: center; gap: 0.3em; font-size: min(10cqh, 5.4cqi); line-height: 1; visibility: hidden; white-space: nowrap; }
    .g3x-show { visibility: visible; }
    .g3x-sign { display: inline-grid; place-items: center; min-width: 1.1em; height: 1.15em; border: 3px dashed #93C5FD; border-radius: 0.2em; color: #1D4ED8; }
    .g3x-check { color: #15803D; font-size: min(8cqh, 4.6cqi); }
  `;
  document.head.appendChild(st);
}
