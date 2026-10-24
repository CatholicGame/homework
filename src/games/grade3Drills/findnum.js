/**
 * 🔍 Tìm một số, biết số đó … thì bằng tổng / hiệu / tích / thương của hai số (vd. "biết số đó nhân với 6 thì bằng
 * tích của 9 và 4"). Các dòng bài giải có sẵn trên tờ vở, chỉ chưa có phép tính; mỗi dòng có lời bám vào đề,
 * hai cụm của đề tô hai màu (vế trái cam, vế phải xanh) trùng màu với dòng phép tính của nó:
 *   Gọi số cần tìm là x.
 *   số đó nhân với 6:  x × 6          1. chọn dấu (số bay từ đề xuống)
 *   tích của 9 và 4:   9 × 4          2. chọn dấu
 *   Ta có:             x × 6 = 9 × 4  3. hai vế bay xuống ghép lại ("thì bằng"),
 *   Tính vế phải:      x × 6 = 36        rồi em tính vế phải
 *   x là thừa số:      x = 36 : 6     4. chọn phép tính (sai thì thầy đọc quy tắc của findx.js)
 *                      x = 6          5. tính
 *   Vậy số cần tìm là 6.
 */

import { mountDrill, shake, setActive, flyDigit, fmt, fresh, sfx, sleep, how, TEACHER } from './kit.js';
import { solveRule, textEm } from './findx.js';

const SIGNS = ['+', '−', '×', ':'];
const OPNAME = { '+': 'cộng', '−': 'trừ', '×': 'nhân', ':': 'chia' };
const calc = (x, op, y) => (op === '+' ? x + y : op === '−' ? x - y : op === '×' ? x * y : x / y);

// Vế trái: "số đó …" (x đứng trước) hoặc "lấy … số đó" (x đứng sau).
const LEFT = {
  add: { op: '+', xFirst: true, text: (a) => `số đó cộng với ${a}`, verb: 'cộng với' },
  sub: { op: '−', xFirst: true, text: (a) => `số đó trừ đi ${a}`, verb: 'trừ đi' },
  rsub: { op: '−', xFirst: false, text: (a) => `lấy ${a} trừ đi số đó`, verb: 'trừ đi' },
  mul: { op: '×', xFirst: true, text: (a) => `số đó nhân với ${a}`, verb: 'nhân với' },
  div: { op: ':', xFirst: true, text: (a) => `số đó chia cho ${a}`, verb: 'chia cho' },
  rdiv: { op: ':', xFirst: false, text: (a) => `lấy ${a} chia cho số đó`, verb: 'chia cho' },
};
// Vế phải: tổng / hiệu / tích / thương của m và n.
const RIGHT = {
  tong: { op: '+', name: 'tổng' },
  hieu: { op: '−', name: 'hiệu' },
  tich: { op: '×', name: 'tích' },
  thuong: { op: ':', name: 'thương' },
};

/** Vế phải (m, n) có giá trị v. big: số đến hàng trăm, hàng nghìn. */
function makeRight(rng, kind, big) {
  if (kind === 'tich') { const m = big ? rng.int(12, 240) : rng.int(2, 9), n = rng.int(2, 9); return { m, n, v: m * n }; }
  if (kind === 'thuong') { const n = rng.int(2, 9), v = big ? rng.int(12, 200) : rng.int(2, 9); return { m: v * n, n, v }; }
  if (kind === 'tong') { const m = big ? rng.int(120, 680) : rng.int(11, 60), n = big ? rng.int(100, 300) : rng.int(11, 39); return { m, n, v: m + n }; }
  const m = big ? rng.int(300, 999) : rng.int(35, 99), n = big ? rng.int(100, m - 80) : rng.int(11, m - 15);
  return { m, n, v: m - n };
}

/** Vế trái cho giá trị v: số đã cho a và số cần tìm x (null nếu không ra số đẹp). */
function makeLeft(rng, kind, v, big, avoid) {
  const top = big ? 500 : 60;
  if (kind === 'add') { if (v < 12) return null; const a = rng.int(Math.min(5, v - 2), v - 3); return { a, x: v - a }; }
  if (kind === 'sub') { const a = rng.int(5, top); return { a, x: v + a }; }
  if (kind === 'rsub') { const x = rng.int(5, top); return { a: v + x, x }; }
  if (kind === 'mul') {
    const ds = [2, 3, 4, 5, 6, 7, 8, 9].filter(d => v % d === 0 && v / d >= 2 && !avoid.includes(d));
    if (!ds.length) return null;
    const a = rng.pick(ds);
    return { a, x: v / a };
  }
  if (kind === 'div') { const a = rng.int(2, 9); return v * a > 9999 ? null : { a, x: v * a }; }
  const x = rng.int(2, 9);                              // rdiv: a : x = v
  return v * x > 9999 ? null : { a: v * x, x };
}

function makeProblem(rng, lefts, rights, big, k) {
  for (let t = 0; t < 40; t++) {
    const lk = lefts[(k + t) % lefts.length], rk = rng.pick(rights);
    const r = makeRight(rng, rk, big);
    const l = makeLeft(rng, lk, r.v, big, [r.m, r.n]);
    if (l && l.x !== r.v) return { lk, rk, ...r, ...l };
  }
  return { lk: 'mul', rk: 'tich', m: 9, n: 4, v: 36, a: 6, x: 6 };
}

export const FINDNUM_LEVELS = [
  {
    id: 'drill-fn-1', n: 1, title: 'Nhân, chia với tích, thương', missions: 4, lefts: ['mul', 'div'], rights: ['tich', 'thuong'],
    desc: 'Vd. số đó nhân với 6 thì bằng tích của 9 và 4.', knowledge: 'bảng nhân, bảng chia, tìm thừa số, số bị chia', lessons: { workbook: ['bai-13'] },
    ask: () => 'Viết đề thành phép tính, tính vế phải trước rồi mới tìm số!',
  },
  {
    id: 'drill-fn-2', n: 2, title: 'Cộng, trừ với tổng, hiệu', missions: 4, lefts: ['add', 'sub', 'rsub'], rights: ['tong', 'hieu'],
    desc: 'Vd. số đó cộng với 15 thì bằng hiệu của 70 và 22.', knowledge: 'tìm số hạng, số bị trừ, số trừ', lessons: { workbook: ['bai-3'] },
    ask: () => 'Tổng là phép cộng, hiệu là phép trừ. Viết phép tính rồi tìm số!',
  },
  {
    id: 'drill-fn-3', n: 3, title: 'Trộn tổng, hiệu, tích, thương', missions: 5, lefts: ['mul', 'add', 'div', 'sub', 'rsub', 'rdiv'], rights: ['tong', 'hieu', 'tich', 'thuong'],
    desc: 'Vd. lấy 72 chia cho số đó thì bằng tổng của 5 và 3.', knowledge: 'tên các thành phần của bốn phép tính', lessons: { workbook: ['bai-13', 'bai-38'] },
    ask: () => 'Đọc kĩ từng chữ: tổng, hiệu, tích hay thương?',
  },
  {
    id: 'drill-fn-4', n: 4, title: 'Số lớn', missions: 4, big: true, lefts: ['mul', 'sub', 'div', 'add', 'rsub'], rights: ['tong', 'hieu', 'tich', 'thuong'],
    desc: 'Vd. số đó chia cho 4 thì bằng tích của 125 và 3.', knowledge: 'cộng, trừ, nhân, chia số có ba, bốn chữ số', lessons: { workbook: ['bai-56', 'bai-57'] },
    ask: () => 'Số lớn vẫn vậy: viết phép tính, tính vế phải, rồi tìm số!',
  },
];

export const FINDNUM_GAME = {
  id: 'drill-fn', icon: '🔍', title: 'Tìm số: tổng, hiệu, tích, thương',
  purpose: 'Giúp em quen dạng "Tìm một số, biết số đó nhân với 6 thì bằng tích của 9 và 4": viết đề thành phép tính, tính vế phải trước, rồi tìm thành phần chưa biết.',
  unitWord: 'bài', starPrefix: 'drill', npcs: [TEACHER], levels: FINDNUM_LEVELS,
  stallIcon: () => '🔍',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> bài.`,
  againText: 'Làm lượt mới',
  howTo: how(['📖', 'Đọc đề'], ['✍️', 'Viết phép tính'], ['🧮', 'Tính vế phải'], ['❓', 'Tìm số']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => makeProblem(rng, level.lefts, level.rights, !!level.big, k), (p) => `${p.lk}${p.a}|${p.rk}${p.m},${p.n}`);
  },

  mountMission(stage, p, level, api) {
    const L = LEFT[p.lk], R = RIGHT[p.rk];
    // Vế trái a op b = v, x ở chỗ pos (0 hoặc 2) → cách tìm x như ❓ Tìm thành phần chưa biết.
    const [A, B] = L.xFirst ? [p.x, p.a] : [p.a, p.x];
    const sol = solveRule(L.op, L.xFirst ? 0 : 2, A, B, p.v);
    const xName = L.op === '+' ? 'số hạng' : L.op === '×' ? 'thừa số' : L.op === '−' ? (L.xFirst ? 'số bị trừ' : 'số trừ') : (L.xFirst ? 'số bị chia' : 'số chia');

    // Ô số rộng sẵn theo số sẽ điền: điền vào không xô dòng nào.
    const slot = (v, attr) => `<span class="g3d-box fn-n" style="--boxw:${(textEm(fmt(v)) + 0.4).toFixed(2)}em" ${attr}></span>`;
    const sign = (attr) => `<span class="fn-s" ${attr}>…</span>`;
    const X = '<b class="fn-x">x</b>';
    const exprHtml = (parts) => parts.map(t => (t === 'x' ? X : `<span>${t}</span>`)).join('');
    const leftParts = L.xFirst ? ['x', L.op, fmt(p.a)] : [fmt(p.a), L.op, 'x'];
    const rightParts = [fmt(p.m), R.op, fmt(p.n)];
    const emOf = (parts) => parts.reduce((w, t) => w + (t === 'x' ? 0.7 : textEm(t)) + 0.3, 0);
    // Ô chứa cả một vế (dòng "Ta có", "Tính vế phải") rộng sẵn bằng vế đó.
    const exBox = (parts, attr, cls) => `<span class="fn-ex ${cls}" style="min-width:${emOf(parts).toFixed(2)}em" ${attr}></span>`;
    const src = (v, k) => `<b class="fn-src" data-src="${k}">${fmt(v)}</b>`;
    const leftText = L.text('@').replace('@', src(p.a, 'a'));
    const rightText = `${R.name} của ${src(p.m, 'm')} và ${src(p.n, 'n')}`;
    const plain = (h) => h.replace(/<[^>]*>/g, '');
    const row = (label, math, attr = '') => `<div class="fn-lab" ${attr}>${label}</div><div class="fn-math" ${attr}>${math}</div>`;
    const rows = [
      `<div class="fn-full">Gọi số cần tìm là ${X}.</div>`,
      row(`<span class="fn-ph fn-a">${plain(leftText)}</span>`, `<span class="fn-ul fn-ula">${L.xFirst ? `${X}${sign('data-ls')}${slot(p.a, 'data-la')}` : `${slot(p.a, 'data-la')}${sign('data-ls')}${X}`}</span>`),
      row(`<span class="fn-ph fn-b">${plain(rightText)}</span>`, `<span class="fn-ul fn-ulb">${slot(p.m, 'data-rm')}${sign('data-rs')}${slot(p.n, 'data-rn')}</span>`),
      row('Ta có:', `${exBox(leftParts, 'data-e3l', 'fn-ul fn-ula')}<i>=</i>${exBox(rightParts, 'data-e3r', 'fn-ul fn-ulb')}`),
      row('Tính vế phải:', `${exBox(leftParts, 'data-e4l', '')}<i>=</i>${slot(p.v, 'data-v4')}`),
      row(`${X} là ${xName}:`, `${X}<i>=</i>${slot(sol.x, 'data-sx')}${sign('data-ss')}${slot(sol.y, 'data-sy')}`, 'data-r5'),
      row('', `${X}<i>=</i>${slot(p.x, 'data-x6')}`),
      `<div class="fn-full fn-end">Vậy số cần tìm là ${slot(p.x, 'data-end')}.</div>`,
    ];
    // Bề ngang (em) của bảng bài giải: cột lời (chữ nhỏ 0.62) + cột phép tính.
    const labEm = Math.max(textEm(plain(leftText)), textEm(plain(rightText)), textEm(`x là ${xName}:`)) * 0.62 + 0.8;
    const mathEm = Math.max(emOf(leftParts) + emOf(rightParts) + 1, emOf(leftParts) + textEm(fmt(p.v)) + 1.4, textEm(`${fmt(sol.x)}${fmt(sol.y)}`) + 3.2);
    const lw = labEm + mathEm + 0.6;
    const board = `
      <div class="fn" style="--lw:${lw.toFixed(2)}">
        <div class="fn-prob">Tìm một số, biết <span class="fn-ph fn-a" data-pl>${leftText}</span> <span class="fn-eq" data-peq>thì bằng</span> <span class="fn-ph fn-b" data-pr>${rightText}</span>.</div>
        <div class="fn-sol">
          <div class="fn-head">Bài giải</div>
          <div class="fn-grid">${rows.join('')}</div>
        </div>
        <div class="fn-choices" data-ch></div>
      </div>`;
    const { paper, say, hint, pad, done } = mountDrill(stage, { api, board, cls: 'fn-scene' });
    injectFindnumStyles();
    const $ = (s) => paper.querySelector(s);
    const ch = $('[data-ch]');
    let mistakes = 0;
    let tip = '';
    let busy = false;

    const wrong = (el, text, shown) => { mistakes++; tip ||= text; shake(el); hint(text, shown); };
    const buttons = (onPick) => {
      ch.innerHTML = SIGNS.map(t => `<button type="button" class="g3g-btn g3d-choice fn-sign-btn" data-v="${t}">${t}</button>`).join('');
      ch.querySelectorAll('[data-v]').forEach(btn => { btn.onclick = () => { if (busy) return; sfx.tap(); onPick(btn.dataset.v, btn); }; });
    };
    const noButtons = () => ch.querySelectorAll('button').forEach(x => { x.disabled = true; });
    const fly = (html, from, to) => sleep(flyDigit(html, from, to, { onLand: () => { to.innerHTML = html; to.classList.add('g3d-box-ok'); sfx.pop(2); } }));
    const setSign = (el, s) => { el.textContent = s; el.classList.add('fn-s-ok'); };
    const lit = (el) => { paper.querySelectorAll('.fn-lit').forEach(e => e.classList.remove('fn-lit')); el?.classList.add('fn-lit'); };
    /** Ô gõ số: đúng → onOk; sai → thầy nhắc, gõ lại. */
    const typeInto = (el, want, wrongText, onOk) => {
      setActive(paper, el);
      const opts = {
        max: String(want).length + 1,
        onType: (t) => { el.textContent = t ? fmt(t) : ''; },
        onSubmit: (t) => {
          if (Number(t) !== want) { el.textContent = ''; wrong(el, wrongText); pad.want(opts); return; }
          pad.off();
          setActive(paper, null);
          el.classList.add('g3d-box-ok');
          onOk();
        },
      };
      pad.want(opts);
    };
    const Rname = R.name[0].toUpperCase() + R.name.slice(1);
    let stepNow = 'left';

    // 1. Vế trái: "số đó nhân với 6" viết thành x × 6.
    lit($('[data-pl]'));
    setActive(paper, $('[data-ls]'));
    say(`Gọi số cần tìm là x. ${plain(leftText)}: viết dấu gì?`, `"<b>${L.verb}</b>" viết dấu gì?`);
    buttons(async (v, btn) => {
      if (v !== L.op) { wrong(btn, `"${L.verb[0].toUpperCase()}${L.verb.slice(1)}" là phép ${OPNAME[L.op]}, viết dấu ${L.op}.`); return; }
      busy = true;
      btn.classList.add('g3d-choice-ok');
      setSign($('[data-ls]'), v);
      setActive(paper, null);
      await fly(fmt(p.a), $('[data-src="a"]'), $('[data-la]'));
      stepRight();
    });

    // 2. Vế phải: "tích của 9 và 4" viết thành 9 × 4.
    function stepRight() {
      stepNow = 'right';
      busy = false;
      lit($('[data-pr]'));
      ch.querySelectorAll('button').forEach(b => b.classList.remove('g3d-choice-ok'));
      setActive(paper, $('[data-rs]'));
      say(`${Rname} của ${p.m} và ${p.n}: viết dấu gì?`, `<b>${Rname}</b> viết dấu gì?`);
      buttons(async (v, btn) => {
        if (v !== R.op) { wrong(btn, `${Rname} là kết quả của phép ${OPNAME[R.op]}: ${fmt(p.m)} ${R.op} ${fmt(p.n)}.`); return; }
        busy = true;
        btn.classList.add('g3d-choice-ok');
        setSign($('[data-rs]'), v);
        setActive(paper, null);
        await fly(fmt(p.m), $('[data-src="m"]'), $('[data-rm]'));
        await fly(fmt(p.n), $('[data-src="n"]'), $('[data-rn]'));
        stepEq();
      });
    }

    // 3. Ghép hai vế theo chữ "thì bằng" của đề, rồi tính vế phải.
    async function stepEq() {
      stepNow = 'eq';
      noButtons();
      lit($('[data-peq]'));
      say(`${plain(leftText)} thì bằng ${plain(rightText)}. Ta có phép tính:`, `Đề nói "<b>thì bằng</b>", nên ta có:`);
      await fly(exprHtml(leftParts), $('[data-la]').parentElement, $('[data-e3l]'));
      await fly(exprHtml(rightParts), $('[data-rm]').parentElement, $('[data-e3r]'));
      await sleep(500);
      lit(null);
      await fly(exprHtml(leftParts), $('[data-e3l]'), $('[data-e4l]'));
      stepNow = 'value';
      say(`Tính ${R.name} trước: ${p.m} ${OPNAME[R.op]} ${p.n}.`, `Tính <b>${fmt(p.m)} ${R.op} ${fmt(p.n)}</b> trước.`);
      typeInto($('[data-v4]'), p.v, `${fmt(p.m)} ${R.op} ${fmt(p.n)} = ${fmt(p.v)}.`, stepSolve);
    }

    // 4. Tìm x: x là thành phần gì, chọn phép tính, hai số bay xuống.
    function stepSolve() {
      stepNow = 'solve';
      busy = false;
      paper.querySelectorAll('[data-r5]').forEach(e => e.classList.add('fn-show'));
      setActive(paper, $('[data-ss]'));
      say(`x là ${xName}. Muốn tìm ${xName}, ta làm phép tính gì?`, `x là <b>${xName}</b>. Làm phép tính gì?`);
      buttons(async (v, btn) => {
        if (v !== sol.op) { wrong(btn, sol.rule); return; }
        busy = true;
        btn.classList.add('g3d-choice-ok');
        setSign($('[data-ss]'), v);
        setActive(paper, null);
        const fromOf = (n) => (n === p.v ? $('[data-v4]') : $('[data-e4l]'));
        await fly(fmt(sol.x), fromOf(sol.x), $('[data-sx]'));
        await fly(fmt(sol.y), sol.y === sol.x ? $('[data-e4l]') : fromOf(sol.y), $('[data-sy]'));
        stepCalc();
      });
    }

    // 5. Tính x, rồi viết câu trả lời.
    function stepCalc() {
      stepNow = 'calc';
      noButtons();
      say(`Tính ${sol.x} ${OPNAME[sol.op]} ${sol.y}.`, `Tính <b>${fmt(sol.x)} ${sol.op} ${fmt(sol.y)}</b>.`);
      typeInto($('[data-x6]'), p.x, `${fmt(sol.x)} ${sol.op} ${fmt(sol.y)} = ${fmt(p.x)}.`, async () => {
        stepNow = 'end';
        await fly(fmt(p.x), $('[data-x6]'), $('[data-end]'));
        await sleep(400);
        const check = `${L.xFirst ? fmt(p.x) : fmt(p.a)} ${L.op} ${L.xFirst ? fmt(p.a) : fmt(p.x)} = ${fmt(calc(A, L.op, B))}`;
        done(mistakes, { ok: `Số cần tìm là ${fmt(p.x)}. Thử lại: ${check}.`, tip: tip ? `Nhớ: tính ${R.name} trước, rồi ${sol.rule.charAt(0).toLowerCase()}${sol.rule.slice(1)}` : '' });
      });
    }

    if (import.meta.env.DEV) {
      window.__g3drill = { p, step: () => {
        if (stepNow === 'left') ch.querySelector(`[data-v="${L.op}"]`)?.click();
        else if (stepNow === 'right') ch.querySelector(`[data-v="${R.op}"]`)?.click();
        else if (stepNow === 'solve') ch.querySelector(`[data-v="${sol.op}"]`)?.click();
        else if (stepNow === 'value') pad.type(String(p.v));
        else if (stepNow === 'calc') pad.type(String(p.x));
      } };
    }
  },
};

let fnStyles = false;
function injectFindnumStyles() {
  if (fnStyles) return;
  fnStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .fn { flex: 1; min-height: 0; display: grid; grid-template-rows: auto minmax(0, 1fr) 14cqh; gap: 1.6cqh; padding: 2.5cqh 3cqi 2.5cqh calc(clamp(1.4rem, 4cqi, 3rem) + 2cqi); font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .fn-prob { font-size: min(5.4cqh, 5cqi); line-height: 1.45; text-wrap: balance; }
    /* Hai cụm của đề: vế trái cam, vế phải xanh, cùng màu với dòng phép tính của nó. Không ngắt giữa cụm. */
    .fn-ph { white-space: nowrap; border-radius: 0.3em; padding: 0 0.12em; }
    .fn-a { background: #FFEDD5; }
    .fn-b { background: #E0F2FE; }
    .fn-prob .fn-a.fn-lit { box-shadow: 0 0 0 0.1em #F97316; }
    .fn-prob .fn-b.fn-lit { box-shadow: 0 0 0 0.1em #0EA5E9; }
    .fn-eq { border-radius: 0.3em; }
    .fn-eq.fn-lit { background: #FEF08A; }
    .fn-src { color: #1D4ED8; }
    .fn-sol { min-height: 0; display: grid; grid-template-rows: auto minmax(0, 1fr); font-size: min(6.4cqh, calc(84cqi / var(--lw))); line-height: 1; }
    .fn-head { font-size: 0.62em; color: #B45309; text-decoration: underline; text-underline-offset: 0.2em; text-align: center; padding-bottom: 0.25em; }
    .fn-grid { min-height: 0; display: grid; grid-template-columns: auto auto; grid-template-rows: repeat(8, minmax(0, 1fr)); gap: 0.12em 0.5em; justify-content: center; align-items: center; }
    .fn-full { grid-column: 1 / -1; font-size: 0.78em; }
    .fn-lab { justify-self: end; font-size: 0.62em; color: #475569; white-space: nowrap; }
    .fn-math { display: flex; align-items: center; gap: 0.3em; white-space: nowrap; }
    .fn-math i { font-style: normal; }
    [data-r5] { visibility: hidden; }
    [data-r5].fn-show { visibility: visible; }
    .fn-ul, .fn-ex { display: inline-flex; align-items: center; gap: 0.3em; height: 1.2em; box-sizing: border-box; }
    .fn-ul { padding: 0 0.2em; border-radius: 0.25em; }
    .fn-ula { background: #FFEDD5; }
    .fn-ulb { background: #E0F2FE; }
    .fn-x { color: #EA580C; min-width: 0.7em; text-align: center; }
    /* Ô trống: chấm chấm như chỗ để viết trong vở; ô đã điền chỉ còn số. */
    .fn .g3d-box { border: 0; border-bottom: 0.07em dotted #94A3B8; border-radius: 0.15em; }
    .fn .g3d-box.g3d-on { border-bottom: 0; }
    .fn .g3d-box-ok { border-color: transparent; }
    .fn .g3d-box-ok:not(.fn-ul) { background: none; }
    .fn-end .g3d-box-ok { min-width: 0; }
    .fn-s { display: inline-grid; place-items: center; min-width: 0.9em; height: 1.1em; border-bottom: 0.07em dotted #94A3B8; color: #94A3B8; font-size: 0.9em; box-sizing: border-box; }
    .fn-s-ok { border-bottom-color: transparent; color: #1D4ED8; }
    .fn-choices { display: flex; gap: 2cqi; justify-content: center; align-items: stretch; }
    .fn-sign-btn { font-size: min(10cqh, 11cqi); max-width: 18cqi; display: grid; place-items: center; line-height: 1; padding: 0; }
  `;
  document.head.appendChild(st);
}
