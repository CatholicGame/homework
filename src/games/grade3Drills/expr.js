/**
 * 🧩 Tính giá trị biểu thức (nhân, chia kết hợp cộng, trừ; có dấu ngoặc), viết từng dòng như trong vở (Bài 38, 42):
 *   15 + 4 × 9 = 15 + 36
 *              = 51
 * Mỗi bước: em chạm vào dấu của phép tính phải làm trước (thứ tự thực hiện), ba thẻ của phép tính đó được khoanh,
 * phép tính bay xuống dòng "= …" mới (các số khác chép nguyên), em gõ kết quả vào ô. Còn một phép tính thì không
 * phải chọn nữa. Chạm sai dấu: thầy đọc quy tắc thứ tự (trong ngoặc trước; nhân, chia trước; từ trái sang phải).
 * Biểu thức sinh bằng bộ sinh của 🤖 Rô-bốt biểu thức (grade3Games/robot.js): mọi bước từ 2 đến 999, nhân có một
 * thừa số một chữ số, chia cho số có một chữ số và chia hết.
 */

import { mountDrill, shake, setActive, setUse, flyDigit, fmt, fresh, sfx, sleep, how, TEACHER } from './kit.js';
import { stepIndex, applyStep, evaluate, exprText, makeExpr } from '../grade3Games/robot.js';

const HIGH = (op) => op === '×' || op === ':';
const OPNAME = { '+': 'cộng', '−': 'trừ', '×': 'nhân', ':': 'chia' };

// Hình mẫu (a, b, c, d: số; + - * /: dấu; ngoặc).
const SHAPES = {
  mix2: ['a+b*c', 'a-b*c', 'a+b/c', 'a-b/c', 'a*b+c', 'a*b-c', 'a/b+c', 'a/b-c'],
  mix3: ['a+b*c-d', 'a-b*c+d', 'a+b/c-d', 'a-b/c+d', 'a*b+c-d', 'a/b+c-d', 'a-b+c*d', 'a+b-c/d', 'a*b+c*d', 'a*b-c/d'],
  paren: ['a*(b-c)', 'a*(b+c)', '(a+b)*c', '(a-b)*c', '(a+b)/c', '(a-b)/c', 'a-(b+c)', 'a-(b-c)', 'a+(b-c)*d', '(a+b)*c-d', 'a-(b+c)/d', '(a-b)/c+d'],
};

/** Vì sao phép tính ở vị trí k phải làm trước (khi em chạm nhầm dấu khác). */
function ruleFor(tokens, k) {
  if (tokens.some(t => t.p)) return 'Biểu thức có dấu ngoặc thì thực hiện các phép tính trong ngoặc trước.';
  const ops = tokens.filter(t => t.op);
  if (HIGH(tokens[k].op) && ops.some(t => !HIGH(t.op))) return 'Biểu thức có phép cộng, trừ và phép nhân, chia thì thực hiện phép nhân, chia trước; rồi thực hiện phép cộng, trừ sau.';
  return ops.every(t => HIGH(t.op)) ? 'Biểu thức chỉ có phép nhân, phép chia thì thực hiện các phép tính từ trái sang phải.'
    : 'Cùng là cộng, trừ thì thực hiện các phép tính từ trái sang phải.';
}

/** Cấp 1, như sách Bài 38 (64 − 25 : 5, 15 + 4 × 9): phép nhân, chia trong bảng; số cộng, trừ có hai chữ số. */
function makeSmall(rng, shape) {
  const t = rng.int(2, 9), u = rng.int(2, 9), p = t * u;
  const [x, op, y] = shape.includes('*') ? [t, '×', u] : [p, ':', t];
  const hv = op === '×' ? p : u;
  const high = [{ n: x }, { op }, { n: y }];
  const other = shape.includes('+') ? rng.int(12, 99) : null;
  let tokens;
  if (shape[1] === '+' || shape[1] === '-') {          // a ± (b op c)
    const a = shape[1] === '+' ? other : hv + rng.int(6, 70);
    tokens = [{ n: a }, { op: shape[1] === '+' ? '+' : '−' }, ...high];
  } else {                                              // (a op b) ± c
    if (shape[3] === '-' && hv < 5) return null;
    const c = shape[3] === '+' ? other : rng.int(2, hv - 2);
    tokens = [...high, { op: shape[3] === '+' ? '+' : '−' }, { n: c }];
  }
  return { tokens, value: evaluate(tokens).value };
}

export const EXPR_LEVELS = [
  {
    id: 'drill-expr-1', n: 1, title: 'Nhân, chia trước; cộng, trừ sau', missions: 5, families: ['mix2'], small: true,
    desc: 'Vd. 15 + 4 × 9 = 15 + 36 = 51.', knowledge: 'thứ tự thực hiện: nhân, chia trước; cộng, trừ sau', lessons: { workbook: ['bai-38'] },
    ask: () => 'Có cả nhân chia và cộng trừ. Chạm vào phép tính làm trước!',
  },
  {
    id: 'drill-expr-2', n: 2, title: 'Biểu thức có ba phép tính', missions: 4, families: ['mix3'],
    desc: 'Vd. 120 − 6 × 8 + 35.', knowledge: 'nhân, chia trước; cộng, trừ từ trái sang phải', lessons: { workbook: ['bai-38', 'bai-42'] },
    ask: () => 'Ba phép tính: nhân chia trước, rồi cộng trừ từ trái sang phải!',
  },
  {
    id: 'drill-expr-3', n: 3, title: 'Biểu thức có dấu ngoặc', missions: 5, families: ['paren'],
    desc: 'Vd. (45 + 27) : 8 = 72 : 8 = 9.', knowledge: 'biểu thức có dấu ngoặc: trong ngoặc trước', lessons: { workbook: ['bai-38', 'bai-42'] },
    ask: () => 'Có dấu ngoặc thì tính trong ngoặc trước!',
  },
  {
    id: 'drill-expr-4', n: 4, title: 'Trộn các dạng', missions: 6, families: ['mix2', 'mix3', 'paren'],
    desc: 'Có ngoặc, không ngoặc, hai hoặc ba phép tính.', knowledge: 'thứ tự thực hiện các phép tính trong biểu thức', lessons: { workbook: ['bai-42'] },
    ask: () => 'Nhìn kĩ: có ngoặc không, có nhân chia không, rồi mới chọn phép tính!',
  },
];

/** Thẻ biểu thức thành HTML; dấu phép tính là nút chạm được (data-k = vị trí thẻ), box = vị trí ô kết quả. */
function tokensHtml(tokens, box = -1, boxW = '2.2em') {
  return tokens.map((t, k) => {
    if (k === box) return `<span class="g3d-box g3e-box" style="--boxw:${boxW}" data-ans></span>`;
    if (t.p) return `<span class="g3e-par" data-k="${k}">${t.p}</span>`;
    if (t.op) return `<button type="button" class="g3e-op" data-k="${k}" tabindex="-1">${t.op}</button>`;
    return `<span class="g3e-n" data-k="${k}">${fmt(t.n)}</span>`;
  }).join('');
}

export const EXPR_GAME = {
  id: 'drill-expr', icon: '🧩', title: 'Tính giá trị biểu thức',
  purpose: 'Giúp em tính giá trị biểu thức có cả nhân, chia và cộng, trừ (có thể có dấu ngoặc) theo đúng thứ tự, viết từng dòng như trong vở.',
  unitWord: 'biểu thức', starPrefix: 'drill', npcs: [TEACHER], levels: EXPR_LEVELS,
  stallIcon: () => '🧩',
  summaryText: (ok, total) => `Em tính đúng ngay <strong>${ok}/${total}</strong> biểu thức.`,
  againText: 'Làm lượt mới',
  howTo: how(['👆', 'Chọn phép tính làm trước'], ['⌨️', 'Gõ kết quả'], ['📝', 'Viết dòng mới'], ['✅', 'Giá trị']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => {
      const fam = level.families[k % level.families.length];
      let ex = null;
      for (let j = 0; j < 20 && !ex; j++) ex = (level.small ? makeSmall : (r, sh) => makeExpr(sh, r))(rng, rng.pick(SHAPES[fam]));
      return ex;
    }, (m) => exprText(m.tokens));
  },

  mountMission(stage, m, level, api) {
    const steps = evaluate(m.tokens).steps; // [{ i, a, op, b, v, tokens }]
    // Mọi dòng dựng sẵn từ đầu lượt (ẩn), ô kết quả đủ rộng: hiện dòng nào cũng không xô gì.
    let prev = m.tokens;
    const lines = steps.map((st) => {
      const { at } = applyStep(prev, st.i, st.v);
      prev = st.tokens;
      return tokensHtml(st.tokens, at, `${String(fmt(st.v)).length * 0.6 + 0.8}em`);
    });
    const board = `
      <div class="g3e"><div class="g3e-grid">
        <div class="g3e-left"><span class="g3e-expr" data-line="0">${tokensHtml(m.tokens)}</span></div>
        ${lines.map((html, r) => `<div class="g3e-eq g3e-hide" data-eq="${r}">=</div><div class="g3e-right g3e-hide" data-line="${r + 1}">${html}</div>`).join('')}
      </div></div>`;
    const { paper, say, show, hint, pad, done } = mountDrill(stage, { api, board, cls: 'g3e-scene' });
    injectExprStyles();
    fitLines(paper.querySelector('.g3e'));

    let mistakes = 0;
    let tip = '';
    let s = 0;          // bước đang làm
    let tokens = m.tokens;
    let stage_ = 'pick';
    let ansEl = null;

    const lineEl = (r) => paper.querySelector(`[data-line="${r}"]`);
    const wrong = (el, text) => { mistakes++; tip ||= text; shake(el); hint(text); };

    function startStep() {
      const st = steps[s];
      const line = lineEl(s);
      const opsLeft = tokens.filter(t => t.op).length;
      setUse(paper, null);
      if (opsLeft === 1) { pickOp(st.i, true); return; }
      stage_ = 'pick';
      const btns = line.querySelectorAll('.g3e-op');
      btns.forEach(b => b.classList.add('g3e-op-on'));
      setActive(paper, null);
      if (s === 0) say('Phép tính nào làm trước? Chạm vào dấu của phép tính đó.', '👆 Chạm vào <b>dấu</b> của phép tính làm trước.');
      else say('Còn phép tính nào làm trước?', '👆 Phép tính nào làm trước?');
      btns.forEach(b => {
        b.onclick = () => {
          if (stage_ !== 'pick') return;
          sfx.tap();
          const k = Number(b.dataset.k);
          if (k !== st.i) { wrong(b, ruleFor(tokens, st.i)); return; }
          pickOp(k, false);
        };
      });
    }

    async function pickOp(k, only) {
      stage_ = 'fly';
      const st = steps[s];
      const line = lineEl(s);
      line.querySelectorAll('.g3e-op').forEach(b => { b.classList.remove('g3e-op-on'); b.onclick = null; });
      const used = [k - 1, k, k + 1].map(j => line.querySelector(`[data-k="${j}"]`));
      setUse(paper, used);
      // Dòng mới: chép nguyên các số khác, ô trống thay cho phép tính đang làm.
      const next = lineEl(s + 1);
      paper.querySelector(`[data-eq="${s}"]`).classList.remove('g3e-hide');
      next.classList.remove('g3e-hide');
      ansEl = next.querySelector('[data-ans]');
      if (only) show(`Còn một phép tính: <b>${fmt(st.a)} ${st.op} ${fmt(st.b)}</b>.`);
      else sfx.pop(2);
      await sleep(flyDigit(`${fmt(st.a)} ${st.op} ${fmt(st.b)}`, used[1], ansEl) + 100);
      stage_ = 'calc';
      setActive(paper, ansEl);
      say(`Tính ${st.a} ${OPNAME[st.op]} ${st.b}.`, `Tính <b>${fmt(st.a)} ${st.op} ${fmt(st.b)}</b>.`);
      const opts = {
        max: String(st.v).length + 1,
        onType: (t) => { ansEl.textContent = t ? fmt(t) : ''; },
        onSubmit: (t) => {
          if (Number(t) !== st.v) {
            ansEl.textContent = '';
            wrong(ansEl, `${fmt(st.a)} ${st.op} ${fmt(st.b)} = ${fmt(st.v)}.`);
            pad.want(opts);
            return;
          }
          pad.off();
          setActive(paper, null);
          setUse(paper, null);
          ansEl.classList.add('g3d-box-ok');
          sfx.pop(3);
          tokens = st.tokens;
          s++;
          if (s < steps.length) setTimeout(startStep, 450);
          else finish();
        },
      };
      pad.want(opts);
    }

    async function finish() {
      stage_ = 'done';
      ansEl.classList.add('g3e-final');
      await sleep(500);
      done(mistakes, { ok: `Giá trị của biểu thức là ${fmt(m.value)}.`, tip: tip ? `Nhớ: ${tip}` : '' });
    }

    startStep();

    if (import.meta.env.DEV) {
      window.__g3drill = { m, step: () => {
        if (stage_ === 'pick') lineEl(s).querySelector(`.g3e-op[data-k="${steps[s].i}"]`)?.click();
        else if (stage_ === 'calc') pad.type(String(steps[s].v));
      }, wrong: () => lineEl(s).querySelector(`.g3e-op:not([data-k="${steps[s].i}"])`)?.click() };
    }
  },
};

/**
 * Cỡ chữ to nhất vừa tờ vở, chọn một trong hai cách viết:
 *   'wide'  như sách: "biểu thức = dòng 1", các dòng "= …" thẳng dấu bằng bên dưới;
 *   'stack' màn hẹp: biểu thức một dòng riêng, các dòng "= …" xuống dưới.
 * Đo thật ở cỡ 100px, đo lại khi tờ vở đổi cỡ (xoay máy); trong lượt không đổi gì.
 */
function fitLines(box) {
  const grid = box.querySelector('.g3e-grid');
  const cells = [...grid.children];
  const place = (mode) => {
    grid.classList.toggle('g3e-stack', mode === 'stack');
    cells.forEach((el) => {
      const r = el.dataset.eq ?? (el.dataset.line ? Number(el.dataset.line) - 1 : null);
      el.style.gridRow = r === null ? '1' : String(Number(r) + (mode === 'stack' ? 2 : 1));
      el.style.gridColumn = r === null ? (mode === 'stack' ? '1 / -1' : '1') : el.dataset.eq !== undefined ? '2' : '3';
    });
  };
  const fit = () => {
    const cs = getComputedStyle(box);
    const w = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const h = box.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    if (w <= 0 || h <= 0) return;
    const size = {};
    for (const mode of ['wide', 'stack']) {
      place(mode);
      grid.style.fontSize = '100px';
      size[mode] = Math.min(100 * w / grid.scrollWidth, 100 * h / grid.scrollHeight, h / 5);
    }
    // Ưu tiên cách viết của sách; chỉ xếp chồng khi chữ to hơn hẳn.
    const best = size.stack > size.wide * 1.3 ? { mode: 'stack', fs: size.stack } : { mode: 'wide', fs: size.wide };
    place(best.mode);
    grid.style.fontSize = `${Math.floor(best.fs)}px`;
  };
  fit();
  new ResizeObserver(() => { if (box.isConnected) fit(); }).observe(box);
}

let exStyles = false;
function injectExprStyles() {
  if (exStyles) return;
  exStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g3e { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 3cqh 3cqi 3cqh calc(clamp(1.4rem, 4cqi, 3rem) + 2cqi); font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; line-height: 1; }
    .g3e-grid { display: grid; grid-template-columns: auto auto auto; grid-auto-rows: 1.9em; align-items: center; column-gap: 0.25em; width: max-content; }
    .g3e-grid > * { display: flex; align-items: center; gap: 0.15em; white-space: nowrap; }
    .g3e-left { justify-content: flex-end; }
    .g3e-stack { grid-template-columns: 0 auto 1fr; }
    .g3e-stack .g3e-left { justify-content: flex-start; }
    .g3e-expr { display: inline-flex; align-items: center; gap: 0.25em; }
    .g3e-hide { visibility: hidden; }
    .g3e-n, .g3e-par { display: inline-grid; place-items: center; height: 1.25em; padding: 0 0.05em; }
    .g3e-op { font: inherit; color: inherit; background: transparent; border: 0.06em solid transparent; border-radius: 999px; min-width: 1.1em; height: 1.1em; padding: 0; display: inline-grid; place-items: center; cursor: default; }
    .g3e-op-on { cursor: pointer; color: #1D4ED8; background: #EFF6FF; border: 0.06em dashed #60A5FA; box-shadow: 0 0.08em 0 #93C5FD; animation: g3eNudge 1.4s ease-in-out infinite; }
    .g3e-op-on:active { transform: translateY(0.06em); box-shadow: none; }
    .g3e-op.g3d-use { color: #C2410C; }
    .g3e-box { height: 1.25em; }
    .g3e-final { background: #DCFCE7; border-color: #22C55E; color: #15803D; }
    @keyframes g3eNudge { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); } }
    @media (prefers-reduced-motion: reduce) { .g3e-op-on { animation: g3eNudge 2.4s ease-in-out infinite; } }
  `;
  document.head.appendChild(st);
}
