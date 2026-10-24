/**
 * 🔍 Tìm một số, biết số đó … thì bằng tổng / hiệu / tích / thương của hai số (vd. "biết số đó nhân với 6 thì bằng
 * tích của 9 và 4"). Lời bài giải có sẵn từng dòng; phép tính thì em tự viết hết (x, dấu, số, dấu =) bằng bàn phím số
 * và hàng nút x + − × : = trên tờ vở, chấm từng dòng khi bấm OK:
 *   Gọi số cần tìm là x.
 *   Ta có:          x × 6 = 9 × 4   hai cụm của đề tô cam / xanh, vế em viết cũng tô cam / xanh theo
 *   Tính vế phải:   x × 6 = 36
 *   x là thừa số:   x = 36 : 6      (sai thì thầy đọc quy tắc của findx.js)
 *                   x = 6
 *   Vậy số cần tìm là 6.
 * Đổi chỗ hai số của phép cộng, phép nhân vẫn tính là đúng.
 */

import { mountDrill, shake, setActive, fmt, fresh, sfx, sleep, how, TEACHER } from './kit.js';
import { solveRule, textEm } from './findx.js';

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
  howTo: how(['📖', 'Đọc đề'], ['✍️', 'Tự viết phép tính'], ['🧮', 'Tính vế phải'], ['❓', 'Tìm x']),

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

    const leftS = L.xFirst ? `x${L.op}${p.a}` : `${p.a}${L.op}x`;
    const rightS = `${p.m}${R.op}${p.n}`;
    const plain = (h) => h.replace(/<[^>]*>/g, '');
    const src = (v) => `<b class="fn-src">${fmt(v)}</b>`;
    const leftText = L.text('@').replace('@', src(p.a));
    const rightText = `${R.name} của ${src(p.m)} và ${src(p.n)}`;
    // Mỗi dòng: lời có sẵn + chỗ để em tự viết cả phép tính (x, dấu, số, dấu =).
    // want: các cách viết đúng (đổi chỗ hai số của phép cộng, phép nhân cũng đúng).
    const swap = (s) => s.replace(/^(\w+)([+×])(\w+)$/, '$3$2$1');
    const lines = [
      { label: 'Ta có:', want: [`${leftS}=${rightS}`], split: true },
      { label: 'Tính vế phải:', want: [`${leftS}=${p.v}`, `${swap(leftS)}=${p.v}`] },
      { label: `<b class="fn-x">x</b> là ${xName}:`, want: [`x=${sol.x}${sol.op}${sol.y}`], late: true },
      { label: '', want: [`x=${p.x}`] },
    ];
    lines[2].want.push(`x=${swap(`${sol.x}${sol.op}${sol.y}`)}`);
    lines[0].want.push(`${swap(leftS)}=${rightS}`, `${leftS}=${swap(rightS)}`, `${swap(leftS)}=${swap(rightS)}`);
    // Bề ngang (em) để sẵn cho chỗ viết của từng dòng: đủ cho câu trả lời đúng dài nhất, không xô khi gõ.
    const textOf = (s) => s.replace(/\d+/g, (d) => fmt(d)).replace(/([+−×:=])/g, ' $1 ');
    const wEm = Math.max(...lines.map(l => textEm(textOf(l.want[0])))) + 1.2;
    const labEm = Math.max(textEm(`x là ${xName}:`), textEm('Tính vế phải:')) * 0.62 + 0.6;
    const endEm = textEm('Vậy số cần tìm là') + textEm(fmt(p.x)) + 1.6;
    const lw = Math.max(labEm + wEm + 0.5, endEm * 0.8);
    const board = `
      <div class="fn" style="--lw:${lw.toFixed(2)};--ww:${wEm.toFixed(2)}em">
        <div class="fn-prob">Tìm một số, biết <span class="fn-ph fn-a" data-pl>${leftText}</span> <span class="fn-eq" data-peq>thì bằng</span> <span class="fn-ph fn-b" data-pr>${rightText}</span>.</div>
        <div class="fn-sol">
          <div class="fn-head">Bài giải</div>
          <div class="fn-grid">
            <div class="fn-full">Gọi số cần tìm là <b class="fn-x">x</b>.</div>
            ${lines.map((l, i) => `<div class="fn-lab${l.late ? ' fn-late' : ''}" data-lab="${i}">${l.label}</div><div class="fn-w" data-w="${i}"></div>`).join('')}
            <div class="fn-full fn-end">Vậy số cần tìm là <span class="fn-w fn-wend" data-w="end" style="--ww:${(textEm(fmt(p.x)) + 0.8).toFixed(2)}em"></span>.</div>
          </div>
        </div>
        <div class="fn-ops" data-ops>${['x', '+', '−', '×', ':', '='].map(k => `<button type="button" class="g3g-btn g3d-choice fn-op${k === 'x' ? ' fn-opx' : ''}" data-op="${k}">${k}</button>`).join('')}</div>
      </div>`;
    const { scene, paper, say, hint, done } = mountDrill(stage, { api, board, cls: 'fn-scene' });
    injectFindnumStyles();
    const $ = (s) => paper.querySelector(s);
    const keys = scene.querySelector('.g3d-keys');
    const okKey = keys.querySelector('[data-k="ok"]');
    const opBtns = [...paper.querySelectorAll('[data-op]')];
    let mistakes = 0;
    let tip = '';
    let row = 0;          // dòng đang viết (0–3), 4 = câu trả lời
    let typed = '';
    let el = null;

    /** Chuỗi em gõ → HTML: số tách lớp nghìn, x màu cam; dòng "Ta có" tô vế trái cam, vế phải xanh như hai cụm của đề. */
    const toHtml = (s, split) => {
      const tok = (t) => (t === 'x' ? '<b class="fn-x">x</b>' : /\d/.test(t) ? `<span>${fmt(t)}</span>` : `<span class="fn-o">${t}</span>`);
      const part = (str) => (str.match(/\d+|[x+−×:=]/g) || []).map(tok).join('');
      if (!split) return part(s);
      const k = s.indexOf('=');
      if (k < 0) return `<span class="fn-side fn-a">${part(s)}</span>`;
      return `<span class="fn-side fn-a">${part(s.slice(0, k))}</span>${tok('=')}<span class="fn-side fn-b">${part(s.slice(k + 1))}</span>`;
    };
    const paint = () => {
      // Dòng "Tính vế phải" còn trống: hiện mờ khuôn "x : 4 = …" để em không viết riêng phép tính 21 : 7 = 3.
      el.innerHTML = !typed && row === 1 ? `<span class="fn-ghost">${toHtml(`${leftS}=`)}<span>…</span></span>` : toHtml(typed, row === 0);
      okKey.disabled = !typed;
      if (row === 0) lit(typed.includes('=') ? $('[data-pr]') : $('[data-pl]'));
    };
    const lit = (e) => { paper.querySelectorAll('.fn-lit').forEach(x => x.classList.remove('fn-lit')); e?.classList.add('fn-lit'); };
    const maxLen = () => (row < 4 ? lines[row].want[0].length + 3 : String(p.x).length + 1);
    const press = (k) => {
      if (!el) return;
      if (k === 'del') typed = typed.slice(0, -1);
      else if (k === 'ok') { if (typed) { sfx.tap(); submit(); } return; }
      else if (row === 4 && !/\d/.test(k)) return;
      else if (typed.length >= maxLen()) return;
      else if (/[+−×:=]/.test(k) && (!typed || /[+−×:=]$/.test(typed))) return;   // không hai dấu liền nhau
      else if (k === 'x' && /[x\d]$/.test(typed)) return;
      else if (/\d/.test(k) && /x$/.test(typed)) return;
      else typed += k;
      sfx.tap();
      paint();
    };

    /** Vì sao dòng chưa đúng: nhắc đúng chỗ sai, không đọc cả đáp án ngay. */
    function why(s) {
      const [l, r] = s.split('=');
      if (row === 0) {
        if (r === undefined) return ['Đề nói "thì bằng": viết dấu = giữa hai vế.', 'Viết đủ hai vế: … <b>=</b> …'];
        if (l !== leftS && l !== swap(leftS)) return [`${plain(leftText)}: viết ${textOf(leftS)}.`, `"${plain(leftText)}" viết là <b>${textOf(leftS)}</b>.`];
        return [`${R.name[0].toUpperCase()}${R.name.slice(1)} là kết quả của phép ${OPNAME[R.op]}: ${textOf(rightS)}.`, `"${plain(rightText)}" viết là <b>${textOf(rightS)}</b>.`];
      }
      if (row === 1) {
        if (l !== leftS && l !== swap(leftS)) return ['Vế trái chép lại như dòng trên.', `Vế trái chép lại: <b>${textOf(leftS)}</b> = …`];
        return [`${textOf(rightS)} = ${fmt(p.v)}.`, `<b>${textOf(rightS)} = ${fmt(p.v)}</b>`];
      }
      if (row === 2) return [sol.rule, `${sol.rule} <b>x = ${textOf(`${sol.x}${sol.op}${sol.y}`)}</b>`];
      if (row === 3) return [`${textOf(`${sol.x}${sol.op}${sol.y}`)} = ${fmt(p.x)}.`, `<b>${textOf(`${sol.x}${sol.op}${sol.y}`)} = ${fmt(p.x)}</b>`];
      return [`Số cần tìm là x, x = ${fmt(p.x)}.`];
    }

    function submit() {
      const ok = row < 4 ? lines[row].want.includes(typed) : Number(typed) === p.x;
      if (!ok && row === 1 && [rightS, swap(rightS)].some(r => typed === `${r}=${p.v}`)) {
        // Em viết phép tính nháp "21 : 7 = 3": tính đúng rồi, chỉ chưa viết lại cả dòng. Không trừ lượt.
        typed = '';
        paint();
        shake(el);
        hint(`Đúng, ${textOf(rightS)} = ${fmt(p.v)}. Nhưng dòng này viết lại cả phép tính: vế trái giữ nguyên ${textOf(leftS)}, vế phải thay bằng ${fmt(p.v)}.`,
          `Đúng, ${textOf(rightS)} = ${fmt(p.v)}. Viết lại cả dòng: <b>${textOf(leftS)} = ${fmt(p.v)}</b>`);
        return;
      }
      if (!ok) {
        mistakes++;
        const [text, shown] = why(typed);
        tip ||= text;
        shake(el);
        hint(text, shown);
        return;
      }
      sfx.pop(2);
      el.classList.add('fn-done');
      setActive(paper, null);
      row++;
      startRow();
    }

    function startRow() {
      typed = '';
      if (row > 4) { finish(); return; }
      el = $(`[data-w="${row < 4 ? row : 'end'}"]`);
      setActive(paper, el);
      paint();
      opBtns.forEach(b => { b.disabled = row === 4; });
      lit(null);
      if (row === 0) {
        lit($('[data-pl]'));
        say(`Gọi số cần tìm là x. Viết đề thành phép tính: ${plain(leftText)} thì bằng ${plain(rightText)}.`, 'Viết đề thành phép tính: <b>… = …</b>');
      } else if (row === 1) say(`Tính ${R.name} trước. Vế trái giữ nguyên ${textOf(leftS)}, vế phải thay bằng kết quả của ${textOf(rightS)}.`, `Vế trái giữ nguyên, vế phải thay bằng kết quả của <b>${textOf(rightS)}</b>.`);
      else if (row === 2) {
        $('[data-lab="2"]').classList.add('fn-show');
        say(`x là ${xName}. Muốn tìm ${xName}, ta làm thế nào? Viết x bằng phép tính.`, `x là <b>${xName}</b>. Viết <b>x = …</b>`);
      } else if (row === 3) say('Tính ra x.', 'Tính ra <b>x</b>.');
      else say('Vậy số cần tìm là mấy?', 'Số cần tìm là mấy?');
    }

    async function finish() {
      el = null;
      keys.classList.add('g3d-keys-off');
      opBtns.forEach(b => { b.disabled = true; });
      await sleep(300);
      const check = `${L.xFirst ? fmt(p.x) : fmt(p.a)} ${L.op} ${L.xFirst ? fmt(p.a) : fmt(p.x)} = ${fmt(calc(A, L.op, B))}`;
      done(mistakes, { ok: `Số cần tìm là ${fmt(p.x)}. Thử lại: ${check}.`, tip: tip ? `Nhớ: viết đề thành phép tính, tính ${R.name} trước, rồi ${sol.rule.charAt(0).toLowerCase()}${sol.rule.slice(1)}` : '' });
    }

    // Bàn phím số của khung chung (không dùng pad.want: em gõ cả số lẫn dấu vào cùng một dòng) + hàng nút dấu trên tờ vở.
    keys.classList.remove('g3d-keys-off');
    keys.querySelector('[data-k="ok"]').hidden = false;
    keys.addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (b && !b.disabled) press(b.dataset.k); });
    opBtns.forEach(b => { b.onclick = () => press(b.dataset.op); });
    const KEYMAP = { '*': '×', '/': ':', '-': '−', '+': '+', ':': ':', '=': '=', x: 'x', X: 'x' };
    const onKey = (e) => {
      if (!scene.isConnected) { document.removeEventListener('keydown', onKey); return; }
      if (scene.closest('.g3g-has-result') || !el) return;
      if (/^[0-9]$/.test(e.key)) press(e.key);
      else if (KEYMAP[e.key]) press(KEYMAP[e.key]);
      else if (e.key === 'Backspace') press('del');
      else if (e.key === 'Enter') press('ok');
      else return;
      e.preventDefault();
    };
    document.addEventListener('keydown', onKey);
    startRow();

    if (import.meta.env.DEV) {
      window.__g3drill = { p, step: () => { for (const ch of row < 4 ? lines[row].want[0] : String(p.x)) press(ch); press('ok'); } };
    }
  },
};

let fnStyles = false;
function injectFindnumStyles() {
  if (fnStyles) return;
  fnStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .fn { flex: 1; min-height: 0; display: grid; grid-template-rows: auto minmax(0, 1fr) 13cqh; gap: 1.6cqh; padding: 2.5cqh 3cqi 2.5cqh calc(clamp(1.4rem, 4cqi, 3rem) + 2cqi); font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .fn-prob { font-size: min(5.6cqh, 5cqi); line-height: 1.45; text-wrap: balance; }
    /* Hai cụm của đề: vế trái cam, vế phải xanh; dòng "Ta có" tô hai vế cùng màu. Không ngắt giữa cụm. */
    .fn-ph { white-space: nowrap; border-radius: 0.3em; padding: 0 0.12em; }
    .fn-a { background: #FFEDD5; }
    .fn-b { background: #E0F2FE; }
    .fn-prob .fn-a.fn-lit { box-shadow: 0 0 0 0.1em #F97316; }
    .fn-prob .fn-b.fn-lit { box-shadow: 0 0 0 0.1em #0EA5E9; }
    .fn-eq { border-radius: 0.3em; }
    .fn-src { color: #1D4ED8; }
    .fn-sol { min-height: 0; display: grid; grid-template-rows: auto minmax(0, 1fr); font-size: min(7.2cqh, calc(84cqi / var(--lw))); line-height: 1; }
    .fn-head { font-size: 0.6em; color: #B45309; text-decoration: underline; text-underline-offset: 0.2em; text-align: center; padding-bottom: 0.2em; }
    .fn-grid { min-height: 0; display: grid; grid-template-columns: auto auto; grid-template-rows: repeat(6, minmax(0, 1fr)); gap: 0.1em 0.45em; justify-content: center; align-items: center; }
    .fn-full { grid-column: 1 / -1; font-size: 0.8em; white-space: nowrap; }
    .fn-full .fn-w { vertical-align: middle; }
    .fn-wend.fn-done { min-width: 0; }
    .fn-lab { justify-self: end; font-size: 0.6em; color: #475569; white-space: nowrap; }
    .fn-late { visibility: hidden; }
    .fn-late.fn-show { visibility: visible; }
    .fn-x { color: #EA580C; }
    /* Chỗ để em viết: dòng chấm chấm như trong vở, rộng sẵn đủ cho cả phép tính. */
    .fn-w { display: inline-flex; align-items: center; gap: 0.22em; min-width: var(--ww); height: 1.25em; padding: 0 0.2em; box-sizing: border-box; border-bottom: 0.06em dotted #94A3B8; border-radius: 0.2em; color: #1D4ED8; white-space: nowrap; }
    .fn-w.g3d-on { border-bottom-color: transparent; }
    .fn-w.g3d-on::after { content: ''; width: 0.07em; height: 0.9em; background: #F59E0B; animation: fnCaret 1s steps(1) infinite; }
    @keyframes fnCaret { 50% { opacity: 0; } }
    @media (prefers-reduced-motion: reduce) { .fn-w.g3d-on::after { animation: none; } }
    .fn-done { border-bottom-color: transparent; }
    .fn-o { color: #1E293B; }
    .fn-ghost { display: inline-flex; align-items: center; gap: 0.22em; opacity: 0.28; filter: grayscale(1); }
    .fn-side { display: inline-flex; align-items: center; gap: 0.22em; border-radius: 0.2em; padding: 0 0.12em; }
    .fn-ops { display: flex; gap: 1.6cqi; justify-content: center; align-items: stretch; }
    .fn-op { font-size: min(9cqh, 8cqi); max-width: 15cqi; display: grid; place-items: center; line-height: 1; padding: 0; }
    .fn-opx { color: #EA580C; }
  `;
  document.head.appendChild(st);
}
