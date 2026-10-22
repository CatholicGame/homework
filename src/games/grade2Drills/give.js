/**
 * 🎁 Cho nhau thì còn hơn bao nhiêu (Luyện Tính lớp 2, trong 📏 Bài toán có lời văn):
 *   "Hoàng có nhiều hơn Nam 15 viên bi. Sau đó Hoàng cho Nam 6 viên bi. Hoàng còn nhiều hơn Nam bao nhiêu viên bi?"
 * Bẫy hay gặp: 15 − 6 = 9 (quên rằng Nam cũng được thêm). Giải hai bước trên sơ đồ đoạn thẳng như trong lớp:
 *   bước 1: người cho mất đi (khúc thanh thành nét đứt), khoảng hơn bớt đi 6 → 15 − 6 = 9;
 *   bước 2: khúc đó bay sang thanh người nhận, khoảng hơn lại bớt 6 → 9 − 6 = 3.
 * Cuối lượt thử bằng số (Nam có 10 viên): số trên đầu mỗi thanh, trước và sau khi cho.
 * kind 'give': người nhiều cho người ít (d − 2t); 'take': người ít cho người nhiều (d + 2t).
 */

import { mountDrill, shake, setActive, flyOne, sfx, sleep, INK } from '../grade3Drills/kit.js';
import { injectSegStyles } from '../grade3Drills/segment.js';
import { whenQuiet } from '../preschool/fx.js';

const NAMES = ['Hoàng', 'Nam', 'Mai', 'Lan', 'Hùng', 'Hoa', 'An', 'Minh'];
const THINGS = [
  { u: 'viên bi', s: 'viên' }, { u: 'quyển vở', s: 'quyển' }, { u: 'cái kẹo', s: 'cái' },
  { u: 'con tem', s: 'con' }, { u: 'bông hoa', s: 'bông' }, { u: 'quả cam', s: 'quả' },
];
const COL = { a: '#60A5FA', b: '#F472B6', x: '#FACC15' };
const BASE = 10; // số của bạn có ít hơn khi thử bằng số

/** Bài mẫu (đề gốc): lượt đầu của cấp "Cho bạn thì còn hơn bao nhiêu?". */
export const GIVE_SAMPLE = { kind: 'give', A: 'Hoàng', B: 'Nam', u: 'viên bi', s: 'viên', n: 15, d: 15, t: 6, ans: 3 };

export function makeGive(rng, kind) {
  const [A, B] = rng.shuffle(NAMES).slice(0, 2);
  const th = rng.pick(THINGS);
  for (;;) {
    if (kind === 'take') {
      const d = rng.int(3, 15), t = rng.int(2, 9);
      return { kind, A, B, ...th, n: d, d, t, ans: d + 2 * t };
    }
    const d = rng.int(9, 20), t = rng.int(2, 9);
    if (d - 2 * t >= 1) return { kind: 'give', A, B, ...th, n: d, d, t, ans: d - 2 * t };
  }
}

/** Chờ thầy đọc xong câu đang đọc (ít nhất `min` ms) rồi mới sang trạng thái sau. */
const quiet = (min = 600) => new Promise(r => whenQuiet(r, { min, gap: 300 }));

const speak = (e) => e.replace(/−/g, 'trừ').replace(/\+/g, 'cộng');

function texts(p) {
  const { A, B, u, s, d, t } = p;
  const mid = p.kind === 'give' ? d - t : d + t;
  if (p.kind === 'give') return {
    story: `${A} có <b>nhiều hơn</b> ${B} <b>${d}</b> ${u}. Sau đó ${A} <b>cho ${B} ${t}</b> ${u}. Hỏi ${A} còn nhiều hơn ${B} bao nhiêu ${u}?`,
    steps: [
      { lead: `${A} đưa đi ${t} ${s}, thanh của ${A} ngắn đi.`, label: `${A} −${t}`,
        opts: [[`${d} − ${t}`, true], [`${d} + ${t}`, false]], ans: mid,
        rule: `${A} mất ${t} ${s} nên chỉ còn hơn ${B} ít đi ${t}: ${d} − ${t}.` },
      { lead: `${B} nhận ${t} ${s}, thanh của ${B} dài thêm.`, label: `${B} +${t}`,
        opts: [[`${mid} − ${t}`, true], [`${mid} + ${t}`, false]], ans: p.ans,
        rule: `${B} được thêm ${t} nên đuổi gần ${A} thêm ${t}: lại bớt ${t}, ${mid} − ${t}.` },
    ],
    ok: `${A} còn nhiều hơn ${B}: ${d} − ${t} − ${t} = ${p.ans} (${s}). Cho bạn ${t} thì khoảng hơn bớt hai lần ${t}!`,
  };
  return {
    story: `${A} có <b>nhiều hơn</b> ${B} <b>${d}</b> ${u}. Sau đó ${B} <b>cho ${A} ${t}</b> ${u}. Hỏi lúc này ${A} nhiều hơn ${B} bao nhiêu ${u}?`,
    steps: [
      { lead: `${B} đưa đi ${t} ${s}, thanh của ${B} ngắn đi.`, label: `${B} −${t}`,
        opts: [[`${d} + ${t}`, true], [`${d} − ${t}`, false]], ans: mid,
        rule: `${B} ít đi ${t} nên ${A} càng hơn ${B}: ${d} + ${t}.` },
      { lead: `${A} nhận ${t} ${s}, thanh của ${A} dài thêm.`, label: `${A} +${t}`,
        opts: [[`${mid} + ${t}`, true], [`${mid} − ${t}`, false]], ans: p.ans,
        rule: `${A} được thêm ${t} nên lại hơn thêm ${t}: ${mid} + ${t}.` },
    ],
    ok: `${A} nhiều hơn ${B}: ${d} + ${t} + ${t} = ${p.ans} (${s}). Được bạn cho ${t} thì khoảng hơn thêm hai lần ${t}!`,
  };
}

// ── Sơ đồ (viewBox 1000 × 320): hàng trên là bạn có nhiều hơn ───────────────────────────────────────────
const X0 = 190, W = 600, YA = 100, YB = 236;
function layout(p) {
  const { d, t } = p;
  const total = p.kind === 'give' ? BASE + d : BASE + d + t;
  const k = W / total, x = (v) => X0 + v * k;
  // give: A = [BASE][d − t][t: khúc cho đi] · B = [BASE][ô trống t]
  // take: A = [BASE][d][ô trống t] · B = [BASE − t][t: khúc cho đi]
  const rows = p.kind === 'give' ? [
    [{ a: 0, b: BASE, c: COL.a }, { a: BASE, b: BASE + d - t, c: COL.x }, { a: BASE + d - t, b: BASE + d, c: COL.x, id: 'piece' }],
    [{ a: 0, b: BASE, c: COL.b }, { a: BASE, b: BASE + t, c: COL.x, id: 'slot' }],
  ] : [
    [{ a: 0, b: BASE, c: COL.a }, { a: BASE, b: BASE + d, c: COL.x }, { a: BASE + d, b: BASE + d + t, c: COL.b, id: 'slot' }],
    [{ a: 0, b: BASE - t, c: COL.b }, { a: BASE - t, b: BASE, c: COL.b, id: 'piece' }],
  ];
  // Khoảng hơn (đầu thanh dưới → đầu thanh trên) sau mỗi bước
  const gaps = p.kind === 'give'
    ? [[BASE, BASE + d], [BASE, BASE + d - t], [BASE + t, BASE + d - t]]
    : [[BASE, BASE + d], [BASE - t, BASE + d], [BASE - t, BASE + d + t]];
  // Thử bằng số: số của mỗi bạn trước, sau bước 1, sau bước 2
  const ends = p.kind === 'give'
    ? [[BASE + d, BASE], [BASE + d - t, BASE], [BASE + d - t, BASE + t]]
    : [[BASE + d, BASE], [BASE + d, BASE - t], [BASE + d + t, BASE - t]];
  return { x, rows, gaps: gaps.map(([a, b]) => [x(a), x(b)]), ends };
}

function gapSvg(x0, x1, text) {
  const y = YA - 30;
  return `<line x1="${x0}" y1="${YB - 16}" x2="${x0}" y2="${y}" stroke="#EA580C" stroke-width="3" stroke-dasharray="7 6"/>
    <line x1="${x1}" y1="${YA - 16}" x2="${x1}" y2="${y}" stroke="#EA580C" stroke-width="3"/>
    <path d="M${x0} ${y} H${x1}" stroke="#EA580C" stroke-width="5"/>
    <text x="${(x0 + x1) / 2}" y="${y - 12}" text-anchor="middle" class="g2g-gap">${text}</text>`;
}

function diagram(p, L) {
  let svg = '';
  [p.A, p.B].forEach((name, ri) => {
    const y = ri ? YB : YA;
    svg += `<text x="${X0 - 24}" y="${y + 12}" text-anchor="end" class="g3s-name">${name}</text>`;
    for (const pt of L.rows[ri]) {
      const slot = pt.id === 'slot';
      svg += `<rect x="${L.x(pt.a)}" y="${y - 14}" width="${L.x(pt.b) - L.x(pt.a)}" height="28" fill="${slot ? '#fff' : pt.c}" ${slot ? 'opacity="0" ' : ''}stroke="${INK}" stroke-width="4"${pt.id ? ` data-part="${pt.id}"` : ''}/>`;
      // Nhãn −t dưới khúc cho đi, +t dưới ô nhận (hiện dần theo từng bước)
      if (pt.id) svg += `<text x="${(L.x(pt.a) + L.x(pt.b)) / 2}" y="${y + 58}" text-anchor="middle" class="g3s-val g2g-tag" opacity="0" data-tag="${pt.id}">${slot ? '+' : '−'}${p.t}</text>`;
    }
    svg += `<text x="${L.x(L.ends[0][ri]) + 14}" y="${y + 12}" class="g3s-val g2g-end" data-end="${ri}"></text>`;
  });
  svg += `<g data-gap>${gapSvg(...L.gaps[0], `hơn ${p.d}`)}</g>`;
  return `<svg class="g3s-svg" viewBox="0 0 1000 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${svg}</svg>`;
}

export function mountGive(stage, p, level, api) {
  const tx = texts(p);
  const L = layout(p);
  const line = (i) => `<div class="g2g-line"><span class="g3s-label">${tx.steps[i].label}:</span> <span class="g3s-expr" data-expr="${i}">…</span> = <span class="g3d-box" style="--boxw:2em" data-ans="${i}"></span></div>`;
  const board = `
    <div class="g3s g2g">
      <div class="g3s-story">${tx.story}</div>
      <div class="g3s-dia">${diagram(p, L)}</div>
      <div class="g3s-choices">${[0, 1].map(i => `<button type="button" class="g3g-btn g3d-choice g3s-btn" data-o="${i}">&nbsp;</button>`).join('')}</div>
      <div class="g3s-ans g2g-ans">${line(0)}${line(1)}</div>
    </div>`;
  const { paper, say, hint, pad, done } = mountDrill(stage, { api, board, cls: 'g3s-scene' });
  injectSegStyles();
  injectGiveStyles();
  const svg = paper.querySelector('.g3s-svg');
  const part = (id) => svg.querySelector(`[data-part="${id}"]`);
  const gapG = svg.querySelector('[data-gap]');
  const btns = [...paper.querySelectorAll('[data-o]')];
  let mistakes = 0, tip = '', step = -1, opts = [], stepNow = 'wait';

  const setGap = (i, text) => { gapG.innerHTML = gapSvg(...L.gaps[i], text); };

  async function beginStep(i) {
    if (!paper.isConnected) return; // đã thoát lượt trong lúc chờ thầy đọc
    step = i;
    const st = tx.steps[i];
    stepNow = 'wait';
    btns.forEach(b => { b.disabled = true; b.classList.remove('g3d-choice-ok'); });
    say(st.lead, st.lead);
    if (i === 0) {
      // Người cho mất khúc thanh: khúc đó thành nét đứt
      const pc = part('piece');
      pc.classList.add('g3s-hot');
      await sleep(900);
      pc.classList.remove('g3s-hot');
      pc.setAttribute('fill', '#fff');
      pc.setAttribute('stroke-dasharray', '8 6');
      svg.querySelector('[data-tag="piece"]').setAttribute('opacity', '1');
      sfx.pop(0);
    } else {
      // Khúc thanh bay sang người nhận
      const pc = part('piece'), sl = part('slot');
      const color = L.rows.flat().find(x => x.id === 'piece').c;
      const bar = `<div style="width:100%;height:100%;background:${color};border:3px solid ${INK};border-radius:3px;box-sizing:border-box"></div>`;
      await sleep(flyOne(bar, pc.getBoundingClientRect(), sl.getBoundingClientRect(), { minMs: 600, maxMs: 900, onLand: () => {
        sl.setAttribute('fill', color);
        sl.setAttribute('opacity', '1');
        svg.querySelector('[data-tag="slot"]').setAttribute('opacity', '1');
        sfx.pop(1);
      } }) + 100);
    }
    setGap(i + 1, '?');
    await quiet(400);
    opts = [...st.opts].sort((x, y) => (x[0] < y[0] ? -1 : 1));
    btns.forEach((b, j) => { b.textContent = opts[j][0]; b.disabled = false; });
    setActive(paper, paper.querySelector(`[data-expr="${i}"]`));
    say(`${p.A} hơn ${p.B} bao nhiêu? Chọn phép tính.`, `${st.lead} Bây giờ ${p.A} hơn ${p.B} bao nhiêu? <b>Chọn phép tính</b>.`);
    stepNow = 'op';
  }

  btns.forEach((btn, j) => {
    btn.onclick = () => {
      if (stepNow !== 'op') return;
      sfx.tap();
      const st = tx.steps[step];
      const [e, ok] = opts[j];
      if (!ok) { mistakes++; tip ||= st.rule; shake(btn); hint(st.rule); return; }
      btn.classList.add('g3d-choice-ok');
      btns.forEach(x => { x.disabled = true; });
      const exprEl = paper.querySelector(`[data-expr="${step}"]`), ansEl = paper.querySelector(`[data-ans="${step}"]`);
      exprEl.textContent = e;
      stepNow = 'calc';
      setActive(paper, ansEl);
      say(`Tính ${speak(e)}.`, `Tính <b>${e}</b>.`);
      const want = {
        max: String(st.ans).length + 1,
        onType: (t) => { ansEl.textContent = t; },
        onSubmit: (t) => {
          if (Number(t) !== st.ans) { mistakes++; tip ||= `${e} = ${st.ans}.`; ansEl.textContent = ''; shake(ansEl); hint(`${e} = ${st.ans}.`); pad.want(want); return; }
          pad.off();
          setActive(paper, null);
          ansEl.classList.add('g3d-box-ok');
          setGap(step + 1, `${st.ans}`);
          sfx.ding();
          if (step === 0) quiet(700).then(() => beginStep(1));
          else check();
        },
      };
      pad.want(want);
    };
  });

  // Thử bằng số: ghi số của mỗi bạn ở đầu thanh, trước rồi sau khi cho
  async function check() {
    stepNow = 'check';
    await quiet(500);
    const endEls = [0, 1].map(ri => svg.querySelector(`[data-end="${ri}"]`));
    const putEnds = (k) => endEls.forEach((el, ri) => {
      el.textContent = L.ends[k][ri];
      el.setAttribute('x', L.x(Math.max(...L.rows[ri].map(r => r.b))) + 14);
    });
    const [a0, b0] = L.ends[0], [a2, b2] = L.ends[2];
    say(`Thử bằng số: nếu ${p.B} có ${b0} ${p.s} thì ${p.A} có ${a0} ${p.s}.`, `Thử bằng số: ${p.B} có <b>${b0}</b> thì ${p.A} có <b>${a0}</b>.`);
    setGap(0, `hơn ${p.d}`);
    putEnds(0);
    endEls.forEach(el => el.classList.add('g3s-hot'));
    await quiet(2600);
    if (!paper.isConnected) return;
    setGap(2, `${p.ans}`);
    putEnds(2);
    say(`Sau khi cho: ${p.A} có ${a2}, ${p.B} có ${b2}. ${a2} trừ ${b2} bằng ${p.ans}. Đúng rồi!`,
      `Sau khi cho: ${p.A} <b>${a2}</b>, ${p.B} <b>${b2}</b>. ${a2} − ${b2} = <b>${p.ans}</b> ✔`);
    gapG.querySelector('text').classList.add('g3s-q-done');
    await quiet(2000);
    if (!paper.isConnected) return;
    done(mistakes, { ok: tx.ok, tip: tip ? `${tip} ${tx.ok}` : '' });
  }

  // Đọc đề trước, đọc xong mới bắt đầu bước 1
  say(tx.story.replace(/<[^>]*>/g, ''), 'Đọc kĩ đề, nhìn sơ đồ!');
  quiet(1500).then(() => beginStep(0));

  if (import.meta.env.DEV) {
    window.__g3drill = { m: p, step: () => {
      if (stepNow === 'op') btns[opts.findIndex(o => o[1])]?.click();
      else if (stepNow === 'calc') pad.type(String(tx.steps[step].ans));
    }, wrong: () => stepNow === 'op' && btns[opts.findIndex(o => !o[1])]?.click() };
  }
}

let giveStyles = false;
function injectGiveStyles() {
  if (giveStyles) return;
  giveStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g2g { grid-template-rows: auto minmax(0, 1.6fr) minmax(0, 0.7fr) minmax(0, 0.9fr); }
    .g2g-ans { flex-direction: column; gap: 0.25em; font-size: min(4.8cqh, 4.4cqi); }
    .g2g-line { display: flex; align-items: center; gap: 0.3em; }
    .g2g-line .g3s-label { min-width: 5.5em; text-align: right; }
    .g2g-gap { font: 800 34px 'Baloo 2', sans-serif; fill: #EA580C; }
    .g2g-end { fill: #334155; }
    .g2g-tag { fill: #C2410C; }
    @container (aspect-ratio < 1.1) {
      .g2g { grid-template-rows: auto auto minmax(0, 1fr) auto; }
      .g2g-ans { font-size: min(6.4cqh, 7.2cqi); }
      .g2g-gap { font-size: 54px; }
    }
  `;
  document.head.appendChild(st);
}
