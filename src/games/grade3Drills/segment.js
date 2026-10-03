/**
 * 📏 Sơ đồ đoạn thẳng: bài toán gấp lên, giảm đi, gấp mấy lần, một phần mấy, và bẫy "nhiều hơn / ít hơn".
 * Đề ngắn + sơ đồ vẽ đúng tỉ lệ như trong sách. Em chọn phép tính (nút to), gõ kết quả, rồi xem sơ đồ kiểm chứng:
 *   gấp: đoạn của bạn thứ nhất bay sang lấp từng phần của đoạn thứ hai; gấp mấy lần: đoạn ngắn bay đặt lên đoạn dài
 *   từng lần, đếm 1, 2, 3…; giảm / một phần mấy: phần cần tìm sáng lên; hơn / kém: phần thêm, phần bớt sáng lên.
 */

import { mountDrill, shake, setActive, fresh, flyOne, sfx, sleep, how, TEACHER, INK } from './kit.js';

const NAMES = ['Mai', 'Lan', 'Nam', 'Hùng', 'Hoa', 'An', 'Minh', 'Bình'];
const THINGS = [
  { u: 'quyển vở', s: 'quyển' }, { u: 'bông hoa', s: 'bông' }, { u: 'viên bi', s: 'viên' },
  { u: 'cái kẹo', s: 'cái' }, { u: 'con tem', s: 'con' }, { u: 'quả cam', s: 'quả' },
];
const FRAC = (t) => `<span class="g3s-frac"><i>1</i><i>${t}</i></span>`;
const COL = { a: '#60A5FA', b: '#F472B6', x: '#FACC15' };

function makeProblem(rng, kind) {
  const [A, B] = rng.shuffle(NAMES).slice(0, 2);
  const th = rng.pick(THINGS);
  const base = { kind, A, B, ...th };
  if (kind === 'gap') { const n = rng.int(2, 9), t = rng.int(2, 5); return { ...base, n, t, ans: n * t }; }
  if (kind === 'giam') { const v = rng.int(2, 9), t = rng.int(2, 5); return { ...base, N: v * t, t, ans: v }; }
  if (kind === 'lan') { const n = rng.int(2, 9), t = rng.int(2, 6); return { ...base, N: n * t, n, ans: t }; }
  if (kind === 'phan') { const v = rng.int(2, 9), t = rng.int(2, 6); return { ...base, N: v * t, t, ans: v }; }
  if (kind === 'hon') { const n = rng.int(3, 15), t = rng.int(2, 9); return { ...base, n, t, ans: n + t }; }
  const N = rng.int(12, 30), t = rng.int(2, 9);
  return { ...base, kind: 'kem', N, t, ans: N - t };
}

/** Đề, các lựa chọn phép tính, lời nhắc khi chọn sai, dòng bài giải. */
function textOf(p) {
  const { A, B, u, s } = p;
  switch (p.kind) {
    case 'gap': return {
      story: `${A} có <b>${p.n}</b> ${u}. Số ${u} của ${B} <b>gấp ${p.t} lần</b> số ${u} của ${A}. Hỏi ${B} có bao nhiêu ${u}?`,
      opts: [[`${p.n} × ${p.t}`, true], [`${p.n} + ${p.t}`, false]],
      rule: `Gấp ${p.n} lên ${p.t} lần là lấy ${p.n} nhân với ${p.t}. Thêm ${p.t} mới là cộng.`,
      label: `Số ${u} của ${B} là`, unit: s,
    };
    case 'giam': return {
      story: `${A} có <b>${p.N}</b> ${u}. Số ${u} của ${B} bằng số ${u} của ${A} <b>giảm đi ${p.t} lần</b>. Hỏi ${B} có bao nhiêu ${u}?`,
      opts: [[`${p.N} : ${p.t}`, true], [`${p.N} − ${p.t}`, false]],
      rule: `Giảm ${p.N} đi ${p.t} lần là lấy ${p.N} chia cho ${p.t}. Bớt ${p.t} mới là trừ.`,
      label: `Số ${u} của ${B} là`, unit: s,
    };
    case 'lan': return {
      story: `${A} có <b>${p.N}</b> ${u}, ${B} có <b>${p.n}</b> ${u}. Hỏi số ${u} của ${A} <b>gấp mấy lần</b> số ${u} của ${B}?`,
      opts: [[`${p.N} : ${p.n}`, true], [`${p.N} − ${p.n}`, false]],
      rule: `Muốn biết ${p.N} gấp mấy lần ${p.n}, ta lấy ${p.N} chia cho ${p.n}.`,
      label: `Số ${u} của ${A} gấp số ${u} của ${B} số lần là`, unit: 'lần',
    };
    case 'phan': return {
      story: `${A} có <b>${p.N}</b> ${u}. ${A} cho ${B} <b>${FRAC(p.t)}</b> số ${u} đó. Hỏi ${A} cho ${B} bao nhiêu ${u}?`,
      opts: [[`${p.N} : ${p.t}`, true], [`${p.N} − ${p.t}`, false]],
      rule: `Muốn tìm một phần ${p.t} của ${p.N}, ta lấy ${p.N} chia cho ${p.t}.`,
      label: `${A} cho ${B} số ${u} là`, unit: s,
    };
    case 'hon': return {
      story: `${A} có <b>${p.n}</b> ${u}. ${B} có <b>nhiều hơn</b> ${A} <b>${p.t}</b> ${u}. Hỏi ${B} có bao nhiêu ${u}?`,
      opts: [[`${p.n} + ${p.t}`, true], [`${p.n} × ${p.t}`, false]],
      rule: `Nhiều hơn ${p.t} là cộng thêm ${p.t}. Gấp lên mấy lần mới là nhân.`,
      label: `Số ${u} của ${B} là`, unit: s,
    };
    default: return {
      story: `${A} có <b>${p.N}</b> ${u}. ${B} có <b>ít hơn</b> ${A} <b>${p.t}</b> ${u}. Hỏi ${B} có bao nhiêu ${u}?`,
      opts: [[`${p.N} − ${p.t}`, true], [`${p.N} : ${p.t}`, false]],
      rule: `Ít hơn ${p.t} là trừ đi ${p.t}. Giảm đi mấy lần mới là chia.`,
      label: `Số ${u} của ${B} là`, unit: s,
    };
  }
}

// ── Sơ đồ (viewBox 1000 × 300) ───────────────────────────────────────────────────────────────────────
const X0 = 190, WMAX = 760;
const ROWY = [92, 222];
function diagram(p) {
  // rows: [{ name, parts: [{ v, color, ghost, id }], top: [{ from, to, text }], brace: { from, to, id } }]
  const rows = [];
  if (p.kind === 'gap') rows.push(
    { name: p.A, parts: [{ v: p.n, c: COL.a, id: 'src' }], top: [[0, 1, p.n]] },
    { name: p.B, parts: Array.from({ length: p.t }, (_, i) => ({ v: p.n, c: COL.b, id: `p${i}`, dim: true })), brace: [0, p.t] });
  else if (p.kind === 'giam') rows.push(
    { name: p.A, parts: Array.from({ length: p.t }, () => ({ v: p.ans, c: COL.a })), top: [[0, p.t, p.N]] },
    { name: p.B, parts: [{ v: p.ans, c: COL.b, id: 'ans' }], brace: [0, 1] });
  else if (p.kind === 'lan') rows.push(
    { name: p.A, parts: [{ v: p.N, c: COL.a, id: 'big' }], top: [[0, 1, p.N]] },
    { name: p.B, parts: [{ v: p.n, c: COL.b, id: 'src' }], top: [[0, 1, p.n]] });
  else if (p.kind === 'phan') rows.push(
    { name: p.A, parts: Array.from({ length: p.t }, (_, i) => ({ v: p.ans, c: i ? COL.a : COL.b, id: i ? '' : 'ans' })), top: [[0, p.t, p.N]], brace: [0, 1] });
  else if (p.kind === 'hon') rows.push(
    { name: p.A, parts: [{ v: p.n, c: COL.a }], top: [[0, 1, p.n]] },
    { name: p.B, parts: [{ v: p.n, c: COL.b }, { v: p.t, c: COL.x, id: 'extra' }], top: [[1, 2, p.t]], brace: [0, 2] });
  else rows.push(
    { name: p.A, parts: [{ v: p.N, c: COL.a }], top: [[0, 1, p.N]] },
    { name: p.B, parts: [{ v: p.ans, c: COL.b, id: 'ans' }, { v: p.t, c: '#fff', ghost: true, id: 'extra' }], top: [[1, 2, p.t]], brace: [0, 1] });
  const total = Math.max(...rows.map(r => r.parts.reduce((s, x) => s + x.v, 0)));
  const k = WMAX / total;
  const ys = rows.length === 1 ? [150] : ROWY;
  let svg = '';
  rows.forEach((r, ri) => {
    const y = ys[ri];
    const xs = [X0];
    r.parts.forEach(pt => xs.push(xs[xs.length - 1] + pt.v * k));
    svg += `<text x="${X0 - 24}" y="${y + 12}" text-anchor="end" class="g3s-name">${r.name}</text>`;
    r.parts.forEach((pt, i) => {
      svg += `<rect x="${xs[i]}" y="${y - 14}" width="${xs[i + 1] - xs[i]}" height="28" fill="${pt.c}" ${pt.ghost ? 'stroke-dasharray="8 6" ' : ''}stroke="${INK}" stroke-width="4" ${pt.dim ? 'fill-opacity="0.25" ' : ''}${pt.id ? `data-part="${pt.id}"` : ''}/>`;
    });
    for (const [a, b, text] of r.top || []) {
      const mx = (xs[a] + xs[b]) / 2;
      svg += `<path d="M${xs[a]} ${y - 30} V${y - 24} H${xs[b]} V${y - 30}" stroke="${INK}" stroke-width="2.5" fill="none" opacity=".5"/><text x="${mx}" y="${y - 36}" text-anchor="middle" class="g3s-val">${text}</text>`;
    }
    if (r.brace) {
      const [a, b] = r.brace;
      const x0 = xs[a], x1 = xs[b], mx = (x0 + x1) / 2, yb = y + 22;
      svg += `<path d="M${x0} ${yb} q0 14 14 14 H${mx - 12} q12 0 12 12 q0 -12 12 -12 H${x1 - 14} q14 0 14 -14" stroke="#EA580C" stroke-width="4" fill="none"/>
        <text x="${mx}" y="${yb + 62}" text-anchor="middle" class="g3s-q" data-q>?</text>`;
    }
  });
  return `<svg class="g3s-svg" viewBox="0 0 1000 ${rows.length === 1 ? 300 : 320}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${svg}</svg>`;
}

const LEVEL = (id, n, title, desc, knowledge, lessons, kinds, ask) => ({
  id, n, title, desc, knowledge, lessons: { workbook: lessons }, missions: 4, ask: () => ask,
  gen: (rng, k) => makeProblem(rng, kinds[k % kinds.length]),
});

export const SEGMENT_LEVELS = [
  LEVEL('drill-seg-1', 1, 'Gấp một số lên một số lần', 'Mai có 6 quyển vở, số vở của Lan gấp 4 lần.', 'phép nhân, gấp lên một số lần', ['bai-24'], ['gap'], 'Nhìn sơ đồ: gấp mấy lần thì có mấy đoạn bằng nhau!'),
  LEVEL('drill-seg-2', 2, 'Giảm một số đi một số lần', 'Mai có 24 bông hoa, số hoa của Lan bằng số hoa của Mai giảm đi 4 lần.', 'phép chia, giảm đi một số lần', ['bai-27'], ['giam'], 'Giảm đi mấy lần thì chia đoạn thành mấy phần bằng nhau!'),
  LEVEL('drill-seg-3', 3, 'Số lớn gấp mấy lần số bé', 'Mai có 24 viên bi, Lan có 6 viên. Số bi của Mai gấp mấy lần?', 'phép chia, so sánh số lớn gấp mấy lần số bé', ['bai-39'], ['lan'], 'Đoạn ngắn đặt vừa mấy lần vào đoạn dài?'),
  LEVEL('drill-seg-4', 4, 'Một phần mấy', 'Mai có 20 cái kẹo, cho Lan 1/4 số kẹo đó.', 'một phần mấy, phép chia', ['bai-14'], ['phan'], 'Chia đoạn thành các phần bằng nhau, lấy một phần!'),
  LEVEL('drill-seg-5', 5, 'Gấp hay nhiều hơn?', 'Trộn: gấp, giảm, nhiều hơn, ít hơn, gấp mấy lần.', 'gấp lên, giảm đi, nhiều hơn, ít hơn', ['bai-24', 'bai-27', 'bai-28', 'bai-39'], ['gap', 'hon', 'giam', 'kem', 'lan'], 'Đọc kĩ: "gấp" hay "nhiều hơn", "giảm đi" hay "ít hơn"?'),
].map(l => (l.id === 'drill-seg-5' ? { ...l, missions: 5 } : l));

export const SEGMENT_GAME = {
  id: 'drill-seg', icon: '📏', title: 'Sơ đồ đoạn thẳng',
  purpose: 'Giúp em giải bài toán gấp lên, giảm đi, gấp mấy lần, một phần mấy bằng sơ đồ đoạn thẳng như trong sách, và không nhầm "gấp" với "nhiều hơn".',
  unitWord: 'bài', starPrefix: 'drill', npcs: [TEACHER], levels: SEGMENT_LEVELS,
  stallIcon: () => '📏',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> bài.`,
  againText: 'Làm lượt mới',
  howTo: how(['📖', 'Đọc đề'], ['📏', 'Nhìn sơ đồ'], ['➗', 'Chọn phép tính'], ['⌨️', 'Tính']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), (m) => `${m.kind}${m.n ?? m.N}-${m.t ?? m.n}`);
  },

  mountMission(stage, p, level, api) {
    const tx = textOf(p);
    const opts = [...tx.opts].sort((x, y) => (x[0] < y[0] ? -1 : 1)); // thứ tự cố định theo chữ, không lộ đáp án
    const board = `
      <div class="g3s">
        <div class="g3s-story">${tx.story}</div>
        <div class="g3s-dia">${diagram(p)}</div>
        <div class="g3s-choices">${opts.map(([e], i) => `<button type="button" class="g3g-btn g3d-choice g3s-btn" data-o="${i}">${e}</button>`).join('')}</div>
        <div class="g3s-ans"><span class="g3s-label">${tx.label}:</span> <span class="g3s-expr" data-expr>…</span> = <span class="g3d-box" style="--boxw:2.4em" data-ans></span> <span class="g3s-unit">(${tx.unit})</span></div>
      </div>`;
    const { paper, say, hint, pad, done } = mountDrill(stage, { api, board, cls: 'g3s-scene' });
    injectSegStyles();
    const exprEl = paper.querySelector('[data-expr]');
    const ansEl = paper.querySelector('[data-ans]');
    const svg = paper.querySelector('.g3s-svg');
    const part = (id) => svg.querySelector(`[data-part="${id}"]`);
    let mistakes = 0;
    let tip = '';
    let stepNow = 'op';

    say(tx.story.replace(/<span class="g3s-frac"><i>1<\/i><i>(\d+)<\/i><\/span>/, 'một phần $1').replace(/<[^>]*>/g, ''), 'Nhìn sơ đồ rồi <b>chọn phép tính</b>.');
    setActive(paper, exprEl);
    paper.querySelectorAll('[data-o]').forEach(btn => {
      btn.onclick = () => {
        if (stepNow !== 'op') return;
        sfx.tap();
        const [e, ok] = opts[Number(btn.dataset.o)];
        if (!ok) { mistakes++; tip ||= tx.rule; shake(btn); hint(tx.rule); return; }
        btn.classList.add('g3d-choice-ok');
        paper.querySelectorAll('[data-o]').forEach(x => { x.disabled = true; });
        exprEl.textContent = e;
        stepNow = 'calc';
        setActive(paper, ansEl);
        say(`Tính ${e.replace('×', 'nhân').replace(':', 'chia').replace('−', 'trừ').replace('+', 'cộng')}.`, `Tính <b>${e}</b>.`);
        const want = {
          max: String(p.ans).length + 1,
          onType: (t) => { ansEl.textContent = t; },
          onSubmit: (t) => {
            if (Number(t) !== p.ans) { mistakes++; tip ||= `${e} = ${p.ans}.`; ansEl.textContent = ''; shake(ansEl); hint(`${e} = ${p.ans}.`); pad.want(want); return; }
            pad.off();
            setActive(paper, null);
            ansEl.classList.add('g3d-box-ok');
            stepNow = 'check';
            check();
          },
        };
        pad.want(want);
      };
    });

    const bar = (c) => `<div style="width:100%;height:100%;background:${c};border:3px solid ${INK};border-radius:3px;box-sizing:border-box"></div>`;
    async function check() {
      say('Xem sơ đồ kiểm tra lại!', 'Kiểm tra trên sơ đồ!');
      if (p.kind === 'gap') {
        const src = part('src');
        for (let i = 0; i < p.t; i++) {
          const to = part(`p${i}`);
          await sleep(flyOne(bar(COL.a), src.getBoundingClientRect(), to.getBoundingClientRect(), { minMs: 380, maxMs: 600, onLand: () => { to.setAttribute('fill-opacity', '1'); sfx.pop(i); } }) + 80);
        }
      } else if (p.kind === 'lan') {
        // Đoạn ngắn đặt lên đoạn dài từng lần, đánh số 1, 2, 3…
        const src = part('src'), big = part('big');
        const x = Number(big.getAttribute('x')), w = Number(src.getAttribute('width')), y = Number(big.getAttribute('y'));
        for (let i = 0; i < p.ans; i++) {
          const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          Object.entries({ x: x + i * w, y, width: w, height: 28, fill: COL.b, stroke: INK, 'stroke-width': 4, opacity: 0 }).forEach(([k2, v]) => r.setAttribute(k2, v));
          svg.appendChild(r);
          await sleep(flyOne(bar(COL.b), src.getBoundingClientRect(), r.getBoundingClientRect(), { minMs: 380, maxMs: 600, onLand: () => {
            r.setAttribute('opacity', '1');
            const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            Object.entries({ x: x + i * w + w / 2, y: y + 62, 'text-anchor': 'middle', class: 'g3s-count' }).forEach(([k2, v]) => t.setAttribute(k2, v));
            t.textContent = i + 1;
            svg.appendChild(t);
            sfx.pop(i);
          } }) + 80);
        }
      } else {
        const hot = part(p.kind === 'hon' || p.kind === 'kem' ? 'extra' : 'ans');
        hot?.classList.add('g3s-hot');
        sfx.ding();
        await sleep(900);
      }
      const q = svg.querySelector('[data-q]');
      if (q) { q.textContent = `${p.ans} ${p.kind === 'lan' ? 'lần' : tx.unit}`; q.classList.add('g3s-q-done'); }
      await sleep(600);
      done(mistakes, { ok: `${tx.label}: ${exprEl.textContent} = ${p.ans} (${tx.unit}).`, tip });
    }

    if (import.meta.env.DEV) {
      window.__g3drill = { m: p, step: () => {
        if (stepNow === 'op') paper.querySelector(`[data-o="${opts.findIndex(o => o[1])}"]`)?.click();
        else pad.type(String(p.ans));
      }, wrong: () => paper.querySelector(`[data-o="${opts.findIndex(o => !o[1])}"]`)?.click() };
    }
  },
};

let segStyles = false;
function injectSegStyles() {
  if (segStyles) return;
  segStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g3s { flex: 1; min-height: 0; display: grid; grid-template-rows: auto minmax(0, 1.7fr) minmax(0, 0.8fr) minmax(0, 0.6fr); gap: 1.6cqh; padding: 1.6cqh 3cqi 2cqh calc(clamp(1.4rem, 4cqi, 3rem) + 2cqi); font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .g3s > * { min-height: 0; }
    .g3s-story { font-size: min(5.6cqh, 3.3cqi, 2.4rem); line-height: 1.35; font-weight: 600; }
    .g3s-story b { color: #C2410C; }
    .g3s-frac { display: inline-flex; flex-direction: column; vertical-align: middle; font-size: 0.75em; line-height: 1; text-align: center; }
    .g3s-frac i { font-style: normal; padding: 0 0.15em; }
    .g3s-frac i:first-child { border-bottom: 2px solid currentColor; }
    .g3s-dia { display: flex; }
    .g3s-svg { flex: 1; width: 100%; height: 100%; }
    .g3s-name { font: 800 34px 'Baloo 2', sans-serif; fill: #334155; }
    .g3s-val { font: 800 32px 'Baloo 2', sans-serif; fill: #1E293B; }
    .g3s-q { font: 800 40px 'Baloo 2', sans-serif; fill: #EA580C; }
    .g3s-q-done { fill: #15803D; }
    .g3s-count { font: 800 26px 'Baloo 2', sans-serif; fill: #BE185D; }
    .g3s-hot { animation: g3sHot 1s ease-in-out 2; }
    @keyframes g3sHot { 50% { fill: #FDE047; } }
    .g3s-choices { display: flex; gap: 3cqi; justify-content: center; align-items: stretch; }
    .g3s-btn { font-size: min(9cqh, 5.4cqi); max-width: 34cqi; }
    /* Tờ vở đứng (màn dọc): sơ đồ cao vừa hình, phần còn lại cho nút chọn to */
    @container (aspect-ratio < 1.1) {
      .g3s { grid-template-rows: auto auto minmax(0, 1fr) auto; }
      .g3s-svg { height: auto; aspect-ratio: 1000 / 320; }
      .g3s-btn { font-size: min(8cqh, 8cqi); max-width: 42cqi; }
      .g3s-ans { font-size: min(6cqh, 5.2cqi); }
    }
    .g3s-ans { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0.3em; font-size: min(5.6cqh, 3.4cqi); line-height: 1.2; }
    .g3s-label { color: #475569; font-weight: 600; }
    .g3s-expr { display: inline-grid; place-items: center; min-width: 4.2em; height: 1.3em; border: 3px dashed #93C5FD; border-radius: 0.2em; color: #1D4ED8; }
    .g3s-unit { color: #475569; }
  `;
  document.head.appendChild(st);
}
