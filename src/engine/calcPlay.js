/**
 * ✍️ Tính: nút cạnh mỗi phép tính trong bài (cộng, trừ, nhân, chia số lớn). Bấm mở tờ vở đặt tính của Luyện Tính
 * với đúng hai số của bài: em đặt tính, kẻ vạch, tính từng hàng (grade3Drills/column.js, grade4Drills/mul.js,
 * grade3Drills/division.js). Xong thì đóng lại, em tự ghi kết quả vào ô của bài.
 *
 * Chỉ là đồ dùng: không ghi vào ô trả lời, không chấm điểm, không cộng sao.
 *
 *   blank.calc = '4682 + 2305'   nút "✍️ Tính" cuối dòng điền đó (phép tính đọc từ chuỗi)
 *   blank.calc = true            đọc phép tính ngay trong nhãn của ô (phần trước dấu "=" hoặc "...")
 *   q.calc = true                như blank.calc = true cho mọi ô điền của câu
 *   q.calcs = ['201634 × 2', …]  câu bảng / nối / chọn: một dải nút dưới đề, mỗi nút một phép tính
 *   q.calcFree = true            nút "✍️ Đặt tính" dưới đề: bé tự gõ hai số và chọn phép tính (biểu thức nhiều bước,
 *                                tìm x, bài toán có lời văn — nút có sẵn số sẽ lộ bước tính)
 *
 * Phép tính: a + b, a − b (a ≥ b), a × b, a : b (b > 0). Số có thể viết cách nhóm "325 164".
 */

import { say, stopSpeaking } from '../games/preschool/fx.js';

const OPS = { '+': '+', '-': '-', '−': '-', '–': '-', '×': '*', 'x': '*', 'X': '*', '*': '*', ':': ':', '÷': ':' };
const SIGN = { '+': '+', '-': '−', '*': '×', ':': ':' };
const NUM = String.raw`\d{1,3}(?:[  ]\d{3})+|\d+`;
const RE = new RegExp(String.raw`(${NUM})\s*([+\-−–×xX*:÷])\s*(${NUM})`);
const fmt = (n) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(n));
const strip = (s) => String(s).replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ');

/** '4682 + 2305' → { op: '+', a: 4682, b: 2305 }; null nếu không đọc được hoặc không đặt tính được. */
export function parseCalc(text) {
  const m = RE.exec(strip(text));
  if (!m) return null;
  const a = Number(m[1].replace(/\D/g, '')), b = Number(m[3].replace(/\D/g, ''));
  const op = OPS[m[2]];
  if (op === '-' && a < b) return null;
  if (op === ':' && !b) return null;
  return { op, a, b };
}

const calcText = ({ op, a, b }) => `${fmt(a)} ${SIGN[op]} ${fmt(b)}`;

// Chuỗi cần đọc của một ô: blank.calc (chuỗi) hoặc nhãn trước chỗ điền.
function calcOfBlank(q, b) {
  const spec = b?.calc ?? (q.calc ? true : null);
  if (!spec) return null;
  if (typeof spec === 'string') return parseCalc(spec);
  return parseCalc(String(b.label || '').split(/=|\.\.\./)[0]);
}

export function hasCalc(q) {
  return !!(q.calcFree || q.calcs?.length || q.blanks?.some(b => calcOfBlank(q, b)));
}

export function attachCalcPlay(root, q) {
  if (!hasCalc(q)) return;
  injectStyles();
  const rows = root.querySelectorAll('#e3-blanks > .e3-blank-row');
  (q.blanks || []).forEach((b, i) => {
    const c = calcOfBlank(q, b);
    const row = rows[i];
    if (!c || !row) return;
    const label = row.querySelector('.e3-blank-label') || row;
    const input = label.querySelector('input');
    const btn = chip(c);
    btn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); open(c, input); };
    label.appendChild(btn);
  });
  if (q.calcs?.length || q.calcFree) {
    const strip = document.createElement('div');
    strip.className = 'calc-strip';
    (q.calcs || []).map(parseCalc).filter(Boolean).forEach((c) => {
      const btn = chip(c, true);
      btn.onclick = () => open(c, null);
      strip.appendChild(btn);
    });
    if (q.calcFree) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'calc-chip';
      btn.innerHTML = '✍️ Đặt tính';
      btn.title = 'Tự viết hai số rồi đặt tính';
      btn.onclick = () => open(null, null);
      strip.appendChild(btn);
    }
    // Câu có lời giải (wordProblem): dải nút đặt cạnh khung lời giải; câu khác: dưới đề.
    const host = root.querySelector('#e3-solution-wrap') || root.querySelector('.e3-question-card');
    if (host?.id === 'e3-solution-wrap') host.before(strip); else host?.appendChild(strip);
  }
}

function chip(c, withText = false) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'calc-chip';
  btn.title = `Đặt tính rồi tính ${calcText(c)}`;
  btn.innerHTML = withText ? `✍️ ${calcText(c)}` : '✍️ Tính';
  return btn;
}

// Công cụ đặt tính theo phép tính (tải động: chỉ khi bé bấm).
async function toolFor(c) {
  if (c.op === ':') {
    const { DIVISION_GAME } = await import('../games/grade3Drills/division.js');
    return { game: DIVISION_GAME, mission: { D: c.a, d: c.b } };
  }
  if (c.op === '*') {
    // Thừa số có một chữ số viết dưới (7 × 853 → đặt tính 853 × 7).
    const [a, b] = c.a < 10 && c.b >= 10 ? [c.b, c.a] : [c.a, c.b];
    if (b < 10) {
      const { COLUMN_GAME } = await import('../games/grade3Drills/column.js');
      return { game: COLUMN_GAME, mission: { op: '*', a, b } };
    }
    const { MUL_GAME } = await import('../games/grade4Drills/mul.js');
    return { game: MUL_GAME, mission: { a, b } };
  }
  const { COLUMN_GAME } = await import('../games/grade3Drills/column.js');
  return { game: COLUMN_GAME, mission: { op: c.op, a: c.a, b: c.b } };
}

async function open(c, input) {
  input?.blur();
  document.activeElement?.blur?.();
  const free = !c;
  // Nút, khung kết quả của trò chơi (g3g-btn, g3g-result): nạp trước, ô nhập phép tính tự chọn dùng ngay.
  import('../games/grade3Games/styles.js').then(m => m.injectGameStyles()).catch(() => {});
  const ov = document.createElement('div');
  ov.className = 'calc-overlay';
  ov.innerHTML = `
    <div class="calc-panel" role="dialog" aria-label="Đặt tính rồi tính">
      <div class="calc-head">
        <span class="calc-title">✍️ Đặt tính rồi tính${c ? `: <b>${calcText(c)}</b>` : ''}</span>
        ${free ? '<button type="button" class="calc-btn calc-new" hidden>✏️ Phép tính khác</button>' : ''}
        <button type="button" class="calc-btn calc-redo">↺ Tính lại</button>
        <button type="button" class="calc-btn calc-close" aria-label="Đóng">✕</button>
      </div>
      <div class="calc-stage"></div>
    </div>`;
  document.body.appendChild(ov);
  const stage = ov.querySelector('.calc-stage');
  const close = (focus = false) => {
    stopSpeaking();
    ov.remove();
    document.removeEventListener('keydown', onKey, true);
    if (focus && input) { input.focus(); input.scrollIntoView?.({ block: 'center', behavior: 'smooth' }); }
  };
  const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
  document.addEventListener('keydown', onKey, true);
  ov.querySelector('.calc-close').onclick = () => close();

  let tool;
  const mount = () => {
    stopSpeaking();
    stage.classList.remove('g3g-has-result');
    stage.innerHTML = '';
    const finish = (ok, text, tip) => {
      const host = stage.querySelector('[data-result-host]') || stage;
      stage.classList.add('g3g-has-result');
      const box = document.createElement('div');
      box.className = `g3g-result ${ok ? 'g3g-result-ok' : 'g3g-result-fail'}`;
      box.innerHTML = `
        <div class="g3g-result-text">${ok ? '✅' : '✔️'} ${text}</div>
        ${tip ? `<div class="g3g-tip">💡 ${tip}</div>` : ''}
        <div class="calc-result-acts">
          <button type="button" class="g3g-btn g3g-btn-primary" data-act="write">✏️ Ghi kết quả vào bài</button>
          <button type="button" class="g3g-btn g3g-btn-ghost" data-act="again">↺ Tính lại</button>
        </div>`;
      host.appendChild(box);
      box.querySelector('[data-act="write"]').onclick = () => close(true);
      box.querySelector('[data-act="again"]').onclick = mount;
    };
    tool.game.mountMission(stage, tool.mission, {}, {
      succeed: (text) => finish(true, text),
      fail: (text, tip) => finish(false, text, tip),
      say,
    });
  };
  const redo = ov.querySelector('.calc-redo');
  redo.onclick = () => (tool ? mount() : null);
  const start = async (cc) => {
    c = cc;
    ov.querySelector('.calc-title').innerHTML = `✍️ Đặt tính rồi tính: <b>${calcText(c)}</b>`;
    try { tool = await toolFor(c); } catch { close(); return; }
    redo.hidden = false;
    const nb = ov.querySelector('.calc-new');
    if (nb) nb.hidden = false;
    mount();
  };
  if (free) {
    redo.hidden = true;
    ov.querySelector('.calc-new').onclick = () => { tool = null; ov.querySelector('.calc-new').hidden = true; redo.hidden = true; ask(); };
    const ask = () => {
      stopSpeaking();
      ov.querySelector('.calc-title').innerHTML = '✍️ Đặt tính rồi tính';
      stage.classList.remove('g3g-has-result');
      stage.innerHTML = `
        <div class="calc-form">
          <p class="calc-form-lead">Em viết phép tính muốn đặt tính:</p>
          <div class="calc-form-row">
            <input class="game-input calc-in" inputmode="numeric" autocomplete="off" aria-label="Số thứ nhất" maxlength="9">
            <div class="calc-ops">${['+', '−', '×', ':'].map((o, i) => `<button type="button" class="calc-op${i ? '' : ' on'}" data-op="${o}">${o}</button>`).join('')}</div>
            <input class="game-input calc-in" inputmode="numeric" autocomplete="off" aria-label="Số thứ hai" maxlength="9">
          </div>
          <div class="calc-form-msg" aria-live="polite"></div>
          <button type="button" class="g3g-btn g3g-btn-primary calc-go">✍️ Đặt tính</button>
        </div>`;
      let op = '+';
      stage.querySelectorAll('.calc-op').forEach((b) => { b.onclick = () => { op = b.dataset.op; stage.querySelectorAll('.calc-op').forEach(x => x.classList.toggle('on', x === b)); }; });
      const [ia, ib] = stage.querySelectorAll('.calc-in');
      const msg = stage.querySelector('.calc-form-msg');
      stage.querySelector('.calc-go').onclick = () => {
        const a = ia.value.replace(/D/g, ''), b = ib.value.replace(/D/g, '');
        if (!a || !b) { msg.textContent = 'Em viết đủ hai số.'; return; }
        const cc = parseCalc(`${a} ${op} ${b}`);
        if (!cc) { msg.textContent = op === '−' ? 'Số bị trừ phải lớn hơn hoặc bằng số trừ.' : 'Số chia phải khác 0.'; return; }
        start(cc);
      };
    };
    ask();
  } else {
    start(c);
  }
}

let styled = false;
function injectStyles() {
  if (styled) return;
  styled = true;
  const st = document.createElement('style');
  st.textContent = `
    .calc-chip {
      flex: none; display: inline-flex; align-items: center; gap: 0.25em; margin-left: 0.5rem;
      height: 2.2rem; padding: 0 0.85rem; border-radius: 999px; border: 2px solid #0D9488;
      background: #F0FDFA; color: #115E59; font: 700 0.95rem Quicksand, sans-serif; cursor: pointer;
      box-shadow: 0 2px 0 #99F6E4; white-space: nowrap; vertical-align: middle;
    }
    .calc-chip:hover { background: #CCFBF1; }
    .calc-chip:active { transform: translateY(1px); box-shadow: none; }
    .calc-strip { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 0.6rem; }
    .calc-strip .calc-chip { margin-left: 0; }
    .calc-overlay {
      position: fixed; inset: 0; z-index: 5000; background: rgba(15, 23, 42, 0.8);
      display: flex; align-items: stretch; justify-content: center; padding: 10px;
    }
    .calc-panel {
      width: min(1400px, 100%); min-width: 0; background: #fff; border-radius: 1.2rem; overflow: hidden;
      display: flex; flex-direction: column; box-shadow: 0 10px 40px rgba(0,0,0,.35);
    }
    .calc-head { flex: none; display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.7rem; }
    .calc-title { flex: 1; min-width: 0; font: 700 1.05rem Quicksand, sans-serif; color: #1e293b; }
    .calc-title b { color: #0F766E; white-space: nowrap; }
    .calc-btn {
      flex: none; height: 2.3rem; min-width: 2.3rem; padding: 0 0.8rem; border-radius: 1.15rem;
      border: 1.5px solid #CBD5E1; background: #fff; color: #1e293b; font: 700 0.9rem Quicksand, sans-serif; cursor: pointer;
    }
    .calc-close { padding: 0; }
    .calc-stage { flex: 1; min-height: 0; display: flex; padding: 0 0.5rem 0.5rem; }
    .calc-stage > * { flex: 1; min-width: 0; min-height: 0; }
    .calc-form { margin: auto; display: flex; flex-direction: column; align-items: center; gap: 0.9rem; padding: 1rem; font-family: Quicksand, sans-serif; }
    .calc-form-lead { margin: 0; font-weight: 700; font-size: 1.15rem; color: #334155; }
    .calc-form-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.6rem; }
    .calc-in { width: 9.5ch; height: 3.2rem; font-size: 1.6rem; text-align: center; font-weight: 700; }
    .calc-ops { display: flex; gap: 0.35rem; }
    .calc-op { width: 3rem; height: 3rem; border-radius: 0.8rem; border: 2px solid #CBD5E1; background: #fff; font: 800 1.5rem Quicksand, sans-serif; color: #334155; cursor: pointer; }
    .calc-op.on { border-color: #0D9488; background: #CCFBF1; color: #115E59; }
    .calc-form-msg { min-height: 1.3em; color: #B91C1C; font-weight: 700; }
    .calc-result-acts { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
    @media (max-width: 560px) { .calc-redo { display: none; } .calc-overlay { padding: 4px; } }
  `;
  document.head.appendChild(st);
}
