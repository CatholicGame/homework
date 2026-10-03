/**
 * 🔟 Làm tròn 10: cộng, trừ qua 10 trong phạm vi 20 theo cách tách số của Toán 2 (Bài 7, Bài 11).
 *   9 + 5:  9 thêm 1 được 10 → tách 5 thành 1 và 4 → 10 + 4 = 14.
 *   13 − 5: 13 bớt 3 được 10 → tách 5 thành 3 và 2 → 10 − 2 = 8.
 * Hai khung 10 ô chấm tròn vẽ trên tờ vở: chấm bay sang lấp đầy khung 10 (cộng), chấm bị gạch đi (trừ), từng bước
 * đúng lúc em gõ. Dưới phép tính là hình tách số như trong sách, cạnh đó hai dòng tính "9 + 1 = 10", "10 + 4 = 14".
 * Gõ sai: ô rung, thầy nhắc đúng câu của bước đó, em gõ lại. Lượt đúng khi không phải sửa bước nào.
 */

import { mountDrill, shake, setActive, flyDigit, flyOne, fresh, sfx, sleep, how, TEACHER, INK, MINUS } from '../grade3Drills/kit.js';

// ── Khung 10 ô: mỗi khung một SVG 520 × 220 (ô 100), đứng cạnh nhau (tờ vở ngang) hoặc chồng lên nhau (tờ vở đứng) ──
const CELL = 100;
const cellXY = (i) => [10 + (i % 5) * CELL + CELL / 2, 10 + Math.floor(i / 5) * CELL + CELL / 2];
const DOT = { a: '#EF4444', b: '#3B82F6' };

function framesSvg() {
  return [0, 1].map(f => {
    let s = `<rect class="g2t-frame" data-frame="${f}" x="10" y="10" width="${5 * CELL}" height="${2 * CELL}" rx="10" fill="#fff" stroke="${INK}" stroke-width="6"/>`;
    for (let c = 1; c < 5; c++) s += `<path d="M${10 + c * CELL} 10 V${10 + 2 * CELL}" stroke="${INK}" stroke-width="3"/>`;
    s += `<path d="M10 ${10 + CELL} H${10 + 5 * CELL}" stroke="${INK}" stroke-width="3"/>`;
    for (let i = 0; i < 10; i++) {
      const [x, y] = cellXY(i);
      s += `<g class="g2t-dot g2t-off" data-dot="${f}-${i}"><circle cx="${x}" cy="${y}" r="36" stroke="${INK}" stroke-width="4"/>
        <path class="g2t-x" d="M${x - 30} ${y - 30} L${x + 30} ${y + 30} M${x + 30} ${y - 30} L${x - 30} ${y + 30}" stroke="${INK}" stroke-width="8" stroke-linecap="round"/></g>`;
    }
    return `<svg class="g2t-svg" viewBox="0 0 520 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${s}</svg>`;
  }).join('');
}

/** Các bước của một phép. */
function stepsOf({ op, a, b }) {
  if (op === '+') {
    const s1 = 10 - a, r = b - s1;
    return [
      { box: 'p1', ans: s1, show: `<b>${a}</b> thêm mấy thì được <b>10</b>?`, say: `${a} thêm ${s1} thì được 10.` },
      { box: 'p2', ans: r, show: `Tách <b>${b}</b> thành <b>${s1}</b> và mấy?`, say: `${b} gồm ${s1} và ${r}.` },
      { box: 'r', ans: 10 + r, show: `<b>10 + ${r}</b> bằng mấy?`, say: `10 cộng ${r} bằng ${10 + r}.` },
    ];
  }
  const u = a - 10, r = b - u;
  return [
    { box: 'p1', ans: u, show: `<b>${a}</b> bớt mấy thì được <b>10</b>?`, say: `${a} bớt ${u} thì được 10.` },
    { box: 'p2', ans: r, show: `Tách <b>${b}</b> thành <b>${u}</b> và mấy?`, say: `${b} gồm ${u} và ${r}.` },
    { box: 'r', ans: 10 - r, show: `<b>10 ${MINUS} ${r}</b> bằng mấy?`, say: `10 trừ ${r} bằng ${10 - r}.` },
  ];
}

// ── Sinh đề ───────────────────────────────────────────────────────────────────────────────────────────
function makeAdd(rng) {
  for (;;) {
    const a = rng.int(2, 9), b = rng.int(2, 9);
    // Thường tách số hạng thứ hai, số thứ nhất là số lớn hơn (9 + 5); thỉnh thoảng số bé đứng trước (4 + 8).
    if (a + b > 10 && (a >= b || rng() < 0.3)) return { op: '+', a, b };
  }
}
function makeSub(rng) {
  for (;;) {
    const a = rng.int(11, 18), b = rng.int(2, 9);
    if (b > a - 10) return { op: '-', a, b };
  }
}

export const TEN_LEVELS = [
  {
    id: 'd2-ten-1', n: 1, title: 'Cộng qua 10', missions: 5,
    desc: '9 + 5: 9 thêm 1 được 10, tách 5 thành 1 và 4, 10 + 4 = 14.',
    knowledge: 'cộng trong phạm vi 10, tách số', lessons: { g2: ['bai-7'] },
    ask: () => 'Làm tròn 10 trước, rồi cộng phần còn lại!',
    gen: makeAdd,
  },
  {
    id: 'd2-ten-2', n: 2, title: 'Trừ qua 10', missions: 5,
    desc: '13 − 5: 13 bớt 3 được 10, tách 5 thành 3 và 2, 10 − 2 = 8.',
    knowledge: 'trừ trong phạm vi 10, tách số', lessons: { g2: ['bai-11'] },
    ask: () => 'Bớt về 10 trước, rồi trừ phần còn lại!',
    gen: makeSub,
  },
  {
    id: 'd2-ten-3', n: 3, title: 'Cộng, trừ qua 10', missions: 6,
    desc: 'Trộn phép cộng và phép trừ qua 10 trong phạm vi 20.',
    knowledge: 'cộng qua 10, trừ qua 10', lessons: { g2: ['bai-10', 'bai-14'] },
    ask: () => 'Phép cộng hay phép trừ, đều làm tròn 10 trước!',
    gen: (rng, k) => (k % 2 ? makeSub(rng) : makeAdd(rng)),
  },
];

export const TEN_GAME = {
  id: 'd2-ten', icon: '🔟', title: 'Làm tròn 10',
  purpose: 'Giúp em cộng, trừ qua 10 theo cách học ở lớp: làm tròn 10 trước, tách số thứ hai, rồi tính tiếp với 10. Khung 10 chấm cho em thấy từng bước.',
  unitWord: 'phép tính', starPrefix: 'drill2', npcs: [TEACHER], levels: TEN_LEVELS,
  stallIcon: () => '🔟',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> phép tính.`,
  againText: 'Làm lượt mới',
  howTo: how(['🔟', 'Làm tròn 10'], ['✂️', 'Tách số'], ['➕', 'Tính tiếp'], ['✅', 'Đúng hết']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), (m) => `${m.a}${m.op}${m.b}`);
  },

  mountMission(stage, m, level, api) {
    const { op, a, b } = m;
    const add = op === '+';
    const sign = add ? '+' : MINUS;
    const R = add ? a + b : a - b;
    const steps = stepsOf(m);
    const board = `
      <div class="g2t">
        <div class="g2t-head">
          <span>${a}</span><span>${sign}</span><span class="g2t-b">${b}</span><span>=</span><span class="g3d-box g2t-ans" data-box="ans"></span>
          <svg class="g2t-fork" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path d="M50 2 L14 38 M50 2 L86 38" stroke="${INK}" stroke-width="4" fill="none" vector-effect="non-scaling-stroke"/></svg>
          <span class="g2t-parts"><span class="g3d-box" data-box="p1"></span><span class="g3d-box" data-box="p2"></span></span>
        </div>
        <div class="g2t-frames">${framesSvg()}</div>
        <div class="g2t-lines">
          <div class="g2t-line">${a} ${sign} <span class="g2t-copy" data-copy="p1">?</span> = 10</div>
          <div class="g2t-line">10 ${sign} <span class="g2t-copy" data-copy="p2">?</span> = <span class="g3d-box" data-box="r"></span></div>
        </div>
      </div>`;
    const { paper, say, show, hint, pad, done } = mountDrill(stage, { api, board, cls: 'g2t-scene' });
    injectTenStyles();
    const box = (id) => paper.querySelector(`[data-box="${id}"]`);
    const dot = (f, i) => paper.querySelector(`[data-dot="${f}-${i}"]`);
    const frame = (f) => paper.querySelector(`[data-frame="${f}"]`);
    const setDot = (f, i, color) => { const d = dot(f, i); d.classList.remove('g2t-off'); d.querySelector('circle').setAttribute('fill', color); };
    // Chấm ban đầu: cộng = a chấm đỏ | b chấm xanh; trừ = 10 chấm đỏ | (a − 10) chấm đỏ.
    if (add) { for (let i = 0; i < a; i++) setDot(0, i, DOT.a); for (let i = 0; i < b; i++) setDot(1, i, DOT.b); }
    else { for (let i = 0; i < 10; i++) setDot(0, i, DOT.a); for (let i = 0; i < a - 10; i++) setDot(1, i, DOT.a); }
    const hot = (els) => { paper.querySelectorAll('.g2t-hot').forEach(e => e.classList.remove('g2t-hot')); els.forEach(e => e?.classList.add('g2t-hot')); };

    let mistakes = 0;
    let firstWrong = null;
    let k = -1;

    // Bước 1 đúng: cộng = chấm xanh bay sang lấp đầy khung 10; trừ = gạch các chấm của khung lẻ.
    async function afterStep(i) {
      const s = steps[i];
      if (i === 0 && add) {
        let end = 0;
        for (let j = 0; j < s.ans; j++) {
          const from = dot(1, b - 1 - j), to = dot(0, a + j);
          const html = `<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" fill="${DOT.b}" stroke="${INK}" stroke-width="4"/></svg>`;
          end = Math.max(end, flyOne(html, from.getBoundingClientRect(), to.getBoundingClientRect(), {
            delay: j * 160, minMs: 420, maxMs: 650,
            onLand: () => { setDot(0, a + j, DOT.b); to.classList.remove('g2t-hot'); sfx.pop(j); },
          }));
          setTimeout(() => from.classList.add('g2t-off'), j * 160);
        }
        await sleep(end + 100);
        for (let j = 0; j < s.ans; j++) { setDot(0, a + j, DOT.b); dot(0, a + j).classList.remove('g2t-hot'); } // đã đáp (phòng onLand chậm)
        frame(0).classList.add('g2t-ten');
        sfx.ding();
      } else if (i === 0) {
        for (let j = 0; j < s.ans; j++) { dot(1, a - 11 - j).classList.add('g2t-gone'); sfx.pop(j); await sleep(220); }
        frame(0).classList.add('g2t-ten');
      } else if (i === 2 && !add) {
        hot([]);
        for (let j = 0; j < s.ans; j++) { dot(0, 9 - j).classList.add('g2t-gone'); sfx.pop(j); await sleep(220); }
      }
    }

    function next() {
      k++;
      if (k >= steps.length) return finish();
      const s = steps[k];
      const el = box(s.box);
      setActive(paper, el);
      show(s.show);
      pad.want(padOpts());
      // Chấm cần nhìn sáng lên: bước 1 = ô trống của khung 10 (cộng), chấm lẻ (trừ); bước 2 = chấm còn lại ở khung
      // phải (cộng); bước 3 = các chấm sắp bớt ở khung 10 (trừ).
      const range = (n, f) => Array.from({ length: n }, (_, j) => dot(...f(j)));
      if (k === 0) hot(add ? range(10 - a, j => [0, a + j]) : range(a - 10, j => [1, j]));
      else if (k === 1) hot(add ? range(s.ans, j => [1, j]) : []);
      else hot(add ? [] : range(steps[1].ans, j => [0, 9 - j]));
    }
    const padOpts = () => {
      const s = steps[k], el = box(s.box), n = String(s.ans).length;
      return { max: n, auto: true, onType: (t) => { el.textContent = t; }, onSubmit: (t) => check(t, el) };
    };

    async function check(t, el) {
      const s = steps[k];
      if (Number(t) !== s.ans) {
        mistakes++;
        firstWrong ??= s.say;
        el.textContent = '';
        shake(el);
        hint(s.say);
        pad.want(padOpts());
        return;
      }
      el.textContent = t;
      el.classList.add('g3d-box-ok');
      setActive(paper, null);
      pad.off();
      sfx.pop(k);
      if (k < 2) {
        // Số vừa tách được chép xuống dòng tính.
        const copy = paper.querySelector(`[data-copy="${s.box}"]`);
        copy.textContent = '';
        const land = () => { copy.textContent = t; copy.classList.add('g2t-copy-on'); };
        setTimeout(land, flyDigit(t, el, copy, { onLand: land }) + 50);
      }
      if (k > 0 || !add) hot([]); // bước 1 phép cộng: ô trống sáng tới khi chấm bay tới
      await afterStep(k);
      next();
    }

    async function finish() {
      const ans = box('ans');
      await sleep(flyDigit(String(R), box('r'), ans, { onLand: () => { ans.textContent = R; } }) + 150);
      ans.textContent = R;
      ans.classList.add('g3d-box-ok');
      say(`${a} ${add ? 'cộng' : 'trừ'} ${b} bằng ${R}.`, `<b>${a} ${sign} ${b} = ${R}</b>`);
      await sleep(700);
      done(mistakes, { ok: `${a} ${sign} ${b} = ${R}.`, tip: firstWrong ? `Nhớ: ${firstWrong}` : '' });
    }

    if (import.meta.env.DEV) window.__g3drill = { m, steps, step: () => pad.type(String(steps[k]?.ans ?? '')),
      wrong: () => { const x = steps[k]?.ans ?? 0; pad.type(String(x === 9 ? 8 : x + 1)); } };
    say(`Tính ${a} ${add ? 'cộng' : 'trừ'} ${b}. Làm tròn 10 trước!`, add ? `<b>${a}</b> thêm mấy thì được <b>10</b>?` : `<b>${a}</b> bớt mấy thì được <b>10</b>?`);
    next();
  },
};

let tenStyles = false;
function injectTenStyles() {
  if (tenStyles) return;
  tenStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    /* Tờ vở ngang: cột trái = phép tính + hai dòng tính, cột phải = hai khung 10 chấm chồng lên nhau (to hết cỡ) */
    .g2t { flex: 1; min-height: 0; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr); grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
      grid-template-areas: "head frames" "lines frames"; gap: 3cqh 3cqi; padding: 3cqh 3cqi 3cqh calc(clamp(1.4rem, 4cqi, 3rem) + 2cqi);
      font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; line-height: 1; }
    .g2t > * { min-height: 0; min-width: 0; }
    .g2t-head { grid-area: head; place-self: center; display: grid; grid-template-columns: auto auto minmax(2.7em, auto) auto auto; grid-template-rows: 1.15em 0.55em auto; column-gap: 0.3em; align-items: center; justify-items: center;
      font-size: min(11cqh, 5.2cqi); }
    .g2t-b { color: #1D4ED8; }
    .g2t-ans { --boxw: 1.9em; }
    .g2t-fork { grid-row: 2; grid-column: 3; width: 2.6em; height: 100%; }
    .g2t-parts { grid-row: 3; grid-column: 3; display: flex; gap: 0.4em; font-size: 0.72em; }
    .g2t-parts .g3d-box { --boxw: 1.5em; }
    .g2t-frames { grid-area: frames; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4cqh; }
    .g2t-svg { flex: 1 1 0; min-height: 0; width: 100%; }
    .g2t-dot { transition: opacity .25s; }
    .g2t-off { opacity: 0; }
    .g2t-x { opacity: 0; transition: opacity .2s; }
    .g2t-gone circle { fill-opacity: 0.25; }
    .g2t-gone .g2t-x { opacity: 1; }
    .g2t-frame { transition: stroke .3s, fill .3s; }
    .g2t-ten { stroke: #16A34A; fill: #F0FDF4; }
    .g2t-hot circle { stroke: #F59E0B; stroke-width: 10; }
    .g2t-off.g2t-hot { opacity: 1; }
    .g2t-off.g2t-hot circle { fill: #FEF9C3; stroke-dasharray: 10 8; stroke-width: 5; }
    .g2t-lines { grid-area: lines; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 4cqh; font-size: min(10cqh, 5cqi); }
    .g2t-line { white-space: nowrap; display: flex; align-items: center; gap: 0.25em; }
    .g2t-line .g3d-box { --boxw: 1.9em; }
    .g2t-copy { display: inline-grid; place-items: center; min-width: 1em; color: #CBD5E1; }
    .g2t-copy-on { color: #1D4ED8; }
    /* Tờ vở đứng (màn dọc): phép tính / hai khung chấm / hai dòng tính xếp dọc */
    @container (aspect-ratio < 1.2) {
      .g2t { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr) auto; grid-template-areas: "head" "frames" "lines"; gap: 2cqh; padding-top: 2cqh; padding-bottom: 2.5cqh; }
      .g2t-head { font-size: min(10cqh, 11cqi); }
      .g2t-frames { gap: 2.5cqh; }
      .g2t-lines { gap: 1.6cqh; font-size: min(7.5cqh, 9cqi); }
    }
  `;
  document.head.appendChild(st);
}
