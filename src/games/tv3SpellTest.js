/**
 * 📝 Đề luyện luật chính tả (Tiếng Việt 3): một tờ phiếu 30 từ của một luật (tiengViet3/spellTests.js).
 * Mỗi chỗ trống là một nhóm nút to (c | k, vẻ | vẽ…), chạm để chọn, đổi được tới lúc nộp.
 * Chọn đủ 30 từ mới bấm Kiểm tra (chưa đủ thì nút nháy và cuộn tới từ còn thiếu), chấm một lần:
 * điểm đỏ viết tay thang 10, từ sai gạch đỏ, khoanh xanh chữ đúng và ghi lí do (explainBlank).
 * Bài làm dở và kết quả lưu theo người dùng (tv3spell-tests-v1, đồng bộ Drive); sao: spell3:de-<luật>-<số>, nhận khi đạt từ 8 điểm.
 * Mở từ màn giới thiệu một cấp của 🔤 Luật chính tả (tv3Spell.js → hub grade3Games.js, game.tests / game.openTest).
 */

import { SPELL_TESTS } from './tiengViet3/spellTests.js';
import { RULES, explainBlank, parseBlanks } from './tiengViet3/rules.js';
import { scopedKey } from '../engine/auth.js';
import { awardStars, recordWrong } from '../engine/stars.js';
import { injectGameStyles, menuBackdrop } from './grade3Games/styles.js';

const STORE = 'tv3spell-tests-v1';
const PASS = 8;
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtScore = (s) => String(s).replace('.', ',');

export const testId = (key, i) => `de-${key}-${i + 1}`;
export const testsOf = (key) => SPELL_TESTS[key] || [];

function loadStore() {
  try { return JSON.parse(localStorage.getItem(scopedKey(STORE))) || {}; } catch { return {}; }
}
function saveStore(store) {
  try { localStorage.setItem(scopedKey(STORE), JSON.stringify(store)); } catch { /* storage unavailable */ }
  window.dispatchEvent(new CustomEvent('tth:data-changed'));
}

/** Tình trạng các đề của một luật cho màn giới thiệu cấp: [{ best, draft }]. */
export function testStatus(key) {
  const store = loadStore();
  return testsOf(key).map((_, i) => {
    const rec = store[testId(key, i)];
    return { best: rec?.best ?? null, draft: !!(rec && !rec.graded && rec.answers && Object.keys(rec.answers).length) };
  });
}

function teacherComment(score) {
  if (score >= 10) return 'Con viết đúng hết, giỏi lắm!';
  if (score >= PASS) return 'Con làm tốt. Xem lại các từ gạch đỏ.';
  if (score >= 5) return 'Con đọc lại luật rồi làm lại.';
  return 'Con ôn luật trong khung vàng rồi làm lại.';
}

/**
 * Mở đề thứ `idx` của luật `key` ('ck', 'front'…). `title`: tên luật trên thanh trên; `onBack`: về màn cấp.
 */
export function renderSpellTest(app, { key, idx, title, onBack }) {
  injectGameStyles();
  injectStyles();
  const id = testId(key, idx);
  const list = testsOf(key);
  const items = list[idx].map((raw) => {
    const [rule, text] = raw.includes('|') ? raw.split('|') : [key, raw];
    const { segs, word } = parseBlanks(text, rule);
    return { rule, segs, word: word.trim(), blanks: segs.filter(s => s.ans !== undefined) };
  });
  const rules = [...new Set(items.map(it => it.rule))];
  const tips = rules.flatMap(r => RULES[r].tips.slice(0, rules.length > 1 ? 1 : 2));
  const store = loadStore();
  let rec = store[id] || { answers: {} };
  rec.answers ||= {};
  const total = items.length;
  const nBlanks = items.reduce((n, it) => n + it.blanks.length, 0);

  const blankHtml = (it, i, s) => {
    const b = it.blanks.indexOf(s);
    return `<span class="spt-blank" role="group" aria-label="Chỗ trống">${s.opts.map(o =>
      `<button type="button" class="spt-opt" data-i="${i}" data-b="${b}" data-v="${esc(o)}">${esc(o)}</button>`).join('')}</span>`;
  };
  const itemHtml = (it, i) => `
    <li class="spt-item" data-item="${i}">
      <span class="spt-no">${i + 1}.</span>
      <span class="spt-word">${it.segs.map(s => (s.ans === undefined ? `<span class="spt-t">${esc(s.t)}</span>` : blankHtml(it, i, s))).join('')}</span>
      <span class="spt-mark" aria-hidden="true"></span>
      <span class="spt-why">&nbsp;</span>
    </li>`;

  app.innerHTML = `
    <div class="g3g-wrap spt-wrap">${menuBackdrop()}
      <div class="spt-screen animate-fadeIn">
        <div class="g3g-top">
          <button type="button" class="g3g-round-btn" data-act="back" aria-label="Quay lại">←</button>
          <div class="g3g-title"><span class="g3g-kicker">📝 ${esc(title)}</span><h1>Đề ${idx + 1}</h1></div>
          <span class="spt-count" aria-live="polite"></span>
        </div>
        <article class="spt-paper">
          <header class="spt-head">
            <div class="spt-rule"><b>📏 ${rules.every(r => RULES[r].sure) ? 'Nhớ luật' : RULES[rules[0]].memo ? 'Không có luật, nhớ mặt chữ' : 'Mẹo nhớ'}</b>${tips.map(t => `<span>${t}</span>`).join('')}</div>
            <div class="spt-scorebox"><span class="spt-score-label">Điểm</span><span class="spt-score"></span><span class="spt-comment">&nbsp;</span></div>
          </header>
          <p class="spt-ask">Chạm chọn chữ đúng cho mỗi chỗ trống (${total} từ).</p>
          <ol class="spt-list">${items.map(itemHtml).join('')}</ol>
          <footer class="spt-foot"></footer>
        </article>
      </div>
    </div>`;
  app.scrollTop = 0;
  const paper = app.querySelector('.spt-paper');
  fitColumns(paper);
  document.fonts?.ready.then(() => { if (paper.isConnected) fitColumns(paper); });
  const count = app.querySelector('.spt-count');
  const foot = app.querySelector('.spt-foot');
  app.querySelector('[data-act="back"]').onclick = onBack;

  const chosen = (i, b) => rec.answers[i]?.[b];
  const filled = () => Object.values(rec.answers).reduce((n, a) => n + Object.keys(a).length, 0);

  function paintChoices() {
    paper.querySelectorAll('.spt-opt').forEach(btn => {
      btn.classList.toggle('is-on', chosen(btn.dataset.i, btn.dataset.b) === btn.dataset.v);
    });
    paper.querySelectorAll('.spt-blank').forEach(g => {
      const any = g.querySelector('.spt-opt.is-on');
      g.classList.toggle('is-set', !!any);
    });
  }

  function showFoot() {
    if (rec.graded) {
      count.innerHTML = `Điểm cao nhất: <b class="spt-red">${fmtScore(rec.best)}</b>`;
      foot.innerHTML = `
        <button type="button" class="spt-btn spt-btn-ghost" data-act="redo">↺ Làm lại</button>
        ${idx + 1 < list.length ? `<button type="button" class="spt-btn" data-act="next">Đề ${idx + 2} ➜</button>` : '<button type="button" class="spt-btn" data-act="back2">Xong ➜</button>'}`;
      foot.querySelector('[data-act="redo"]').onclick = () => {
        store[id] = { answers: {}, best: rec.best };
        saveStore(store);
        renderSpellTest(app, { key, idx, title, onBack });
      };
      foot.querySelector('[data-act="next"]')?.addEventListener('click', () => renderSpellTest(app, { key, idx: idx + 1, title, onBack }));
      foot.querySelector('[data-act="back2"]')?.addEventListener('click', onBack);
      return;
    }
    foot.innerHTML = '<button type="button" class="spt-btn spt-btn-check" data-act="check">✔ Kiểm tra</button><span class="spt-left">&nbsp;</span>';
    foot.querySelector('[data-act="check"]').onclick = check;
    updateCount();
  }

  function updateCount() {
    if (rec.graded) return;
    const done = items.filter((it, i) => it.blanks.every((_, b) => chosen(i, b) != null)).length;
    count.textContent = `Đã làm ${done}/${total} từ`;
    foot.querySelector('[data-act="check"]')?.classList.toggle('is-ready', done >= total);
  }

  paper.querySelector('.spt-list').addEventListener('click', (e) => {
    const btn = e.target.closest('.spt-opt');
    if (!btn || rec.graded) return;
    const { i, b, v } = btn.dataset;
    (rec.answers[i] ||= {})[b] = v;
    store[id] = rec;
    saveStore(store);
    paintChoices();
    btn.classList.remove('is-pop');
    void btn.offsetWidth;
    btn.classList.add('is-pop');
    paper.querySelector(`[data-item="${i}"]`).classList.remove('is-missing');
    updateCount();
  });

  /** Chưa chọn đủ: nháy các từ còn thiếu, cuộn tới từ đầu tiên. */
  function nudgeMissing() {
    const missing = items.map((it, i) => (it.blanks.every((_, b) => chosen(i, b) != null) ? null : i)).filter(i => i != null);
    missing.forEach(i => paper.querySelector(`[data-item="${i}"]`).classList.add('is-missing'));
    const first = paper.querySelector(`[data-item="${missing[0]}"]`);
    first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const left = foot.querySelector('.spt-left');
    if (left) left.textContent = `Còn ${missing.length} từ chưa chọn.`;
  }

  /** Vẽ bài đã chấm: dấu ✓ ✗, chữ sai gạch đỏ, chữ đúng khoanh xanh, lí do. Trả về số từ đúng. */
  function paintGrade() {
    let ok = 0;
    items.forEach((it, i) => {
      const li = paper.querySelector(`[data-item="${i}"]`);
      const wrong = it.blanks.map((s, b) => (chosen(i, b) === s.ans ? null : b)).filter(b => b != null);
      if (!wrong.length) ok++;
      li.classList.add(wrong.length ? 'is-bad' : 'is-ok');
      li.querySelector('.spt-mark').textContent = wrong.length ? '✗' : '✓';
      it.blanks.forEach((s, b) => {
        li.querySelectorAll(`.spt-opt[data-b="${b}"]`).forEach(o => {
          o.classList.toggle('is-right', o.dataset.v === s.ans && wrong.includes(b));
          o.classList.toggle('is-wrong', o.classList.contains('is-on') && o.dataset.v !== s.ans);
        });
      });
      if (wrong.length) {
        const s = it.blanks[wrong[0]];
        const reason = explainBlank(it.rule, { ans: s.ans, after: s.after, word: it.word });
        const why = li.querySelector('.spt-why');
        // Câu dài (song/xong): chỉ ghi lí do, không nhắc lại cả câu.
        const lead = reason.includes(`<b>${it.word}</b>`) || it.word.split(/\s+/).length > 3;
        why.innerHTML = lead ? reason.charAt(0).toUpperCase() + reason.slice(1) : `<b>${esc(it.word)}</b>: ${reason}`;
        why.classList.add('is-on');
      }
    });
    paper.classList.add('is-graded');
    const box = paper.querySelector('.spt-scorebox');
    box.querySelector('.spt-score').textContent = fmtScore(rec.score ?? Math.round((ok / total) * 20) / 2);
    box.querySelector('.spt-comment').textContent = teacherComment(rec.score ?? 0);
    box.classList.add('is-on');
    return ok;
  }

  function check() {
    if (filled() < nBlanks) { nudgeMissing(); return; }
    rec.score = null;
    const ok = paintGrade();
    const score = Math.round((ok / total) * 20) / 2;
    rec = { ...rec, graded: true, ok, score, best: Math.max(rec.best ?? 0, score), at: Date.now() };
    store[id] = rec;
    saveStore(store);
    paper.querySelector('.spt-score').textContent = fmtScore(score);
    paper.querySelector('.spt-comment').textContent = teacherComment(score);
    // Sao lần đầu đạt từ 8 điểm; dưới 8 thì trừ dần như các bài khác (đã nhận sao rồi thì không tính).
    const starKey = `spell3:${id}`;
    if (score >= PASS) awardStars(starKey, null);
    else recordWrong(starKey, null);
    showFoot();
    paper.querySelector('.spt-scorebox').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  paintChoices();
  showFoot();
  if (rec.graded) paintGrade(); // mở lại đề đã chấm: hiện bài làm và điểm, không chấm lại

  if (import.meta.env.DEV) {
    window.__spellTest = {
      items,
      fillAll: (wrong = 0) => items.forEach((it, i) => it.blanks.forEach((s, b) => {
        const v = i < wrong ? s.opts.find(o => o !== s.ans) : s.ans;
        paper.querySelector(`.spt-opt[data-i="${i}"][data-b="${b}"][data-v="${CSS.escape(v)}"]`).click();
      })),
    };
  }
}

/**
 * Cột rộng vừa phần lớn các từ: đo bề rộng thật của từng từ (chữ + nút chọn) lúc mở phiếu, lấy mức của 9/10 số từ
 * (từ dài hơn thì xuống dòng trong ô). Câu dài (song/xong) tự ra ít cột hơn. Đo lúc mở và khi phông chữ tải xong.
 */
function fitColumns(paper) {
  const list = paper.querySelector('.spt-list');
  const words = [...list.querySelectorAll('.spt-word')];
  list.classList.add('is-measuring');
  const widths = words.map(w => w.getBoundingClientRect().width).sort((x, y) => x - y);
  list.classList.remove('is-measuring');
  const item = list.querySelector('.spt-item');
  const cs = getComputedStyle(item);
  // số thứ tự + dấu ✓ + khoảng cách + lề trong + viền của ô
  const extra = 2 * 16 + 1.6 * 16 + 12 + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) + 4;
  const p90 = widths[Math.floor(widths.length * 0.9)] || 200;
  list.style.setProperty('--col', `${Math.ceil(p90 + extra)}px`);
}

function injectStyles() {
  if (document.getElementById('spt-styles')) return;
  if (!document.getElementById('ws-hand-font')) {
    const link = document.createElement('link');
    link.id = 'ws-hand-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap';
    document.head.appendChild(link);
  }
  const st = document.createElement('style');
  st.id = 'spt-styles';
  st.textContent = `
    .spt-wrap { min-height: 100%; }
    .spt-screen { position: relative; z-index: 1; box-sizing: border-box; width: 100%; max-width: 1600px; margin: 0 auto; padding: 12px clamp(10px, 2vw, 24px) 28px; }
    .spt-count { font: 800 1rem/1.2 'Baloo 2', system-ui, sans-serif; color: #0f3d5e; background: #fff; border-radius: 999px; padding: 6px 14px;
      box-shadow: 0 3px 0 #bfdbfe; white-space: nowrap; }
    .spt-red { color: #dc2626; font-family: 'Dancing Script', cursive; font-size: 1.5rem; }
    .spt-paper { background: #fff; border-radius: 22px; padding: clamp(14px, 2vw, 28px); box-shadow: 0 8px 0 #bfdbfe, 0 16px 40px rgba(15, 61, 94, 0.18);
      font-family: 'Baloo 2', system-ui, sans-serif; color: #1e293b;
      background-image: repeating-linear-gradient(transparent 0 2.45rem, #e0f2fe 2.45rem 2.5rem); }
    .spt-head { display: grid; grid-template-columns: 1fr minmax(9rem, 14rem); gap: 14px; align-items: start; }
    .spt-rule { display: flex; flex-direction: column; gap: 4px; padding: 10px 14px; border-radius: 16px; background: #fef9c3; border: 2px solid #fde047;
      font-size: clamp(1.05rem, 1.6vw, 1.4rem); line-height: 1.4; }
    .spt-rule > b { color: #a16207; }
    .spt-scorebox { display: grid; grid-template-rows: auto 1fr auto; justify-items: center; border: 2px solid #1f2937; border-radius: 12px; background: #fff; padding: 4px 8px 8px; }
    .spt-score-label { font-weight: 800; font-size: .95rem; letter-spacing: .08em; text-transform: uppercase; color: #475569; }
    .spt-score { font-family: 'Dancing Script', cursive; font-weight: 700; font-size: clamp(3rem, 6vw, 4.6rem); line-height: 1.1; color: #dc2626; transform: rotate(-8deg); min-height: 1.1em; }
    .spt-comment { font-family: 'Dancing Script', cursive; font-weight: 700; font-size: 1.25rem; line-height: 1.15; color: #dc2626; text-align: center; visibility: hidden; }
    .spt-scorebox.is-on .spt-comment { visibility: visible; }
    .spt-scorebox.is-on .spt-score { animation: spt-write .6s ease-out; }
    @keyframes spt-write { from { opacity: 0; transform: rotate(-8deg) scale(1.6); } }
    .spt-ask { margin: 14px 0 8px; font-weight: 800; font-size: clamp(1.05rem, 1.5vw, 1.3rem); color: #0f3d5e; }
    .spt-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--col, 20rem)), 1fr)); gap: 10px 14px; }
    .spt-item { position: relative; display: grid; grid-template-columns: 2rem 1fr 1.6rem; grid-template-rows: auto auto; align-items: center; column-gap: 6px;
      padding: 8px 10px 4px; border-radius: 16px; background: #f8fafc; border: 2px solid #e2e8f0; transition: border-color .2s, background .2s; }
    .spt-item.is-missing { border-color: #f59e0b; background: #fffbeb; animation: spt-blink 1s ease-in-out 3; }
    @keyframes spt-blink { 50% { box-shadow: 0 0 0 5px rgba(245, 158, 11, 0.35); } }
    .spt-no { font-weight: 800; color: #64748b; font-size: 1.1rem; }
    .spt-list.is-measuring .spt-word { width: max-content; flex-wrap: nowrap; }
    .spt-word { display: flex; flex-wrap: wrap; min-width: 0; align-items: center; gap: 2px 0; font-size: clamp(1.35rem, 2vw, 1.7rem); font-weight: 700; line-height: 1.25; }
    .spt-t { white-space: pre-wrap; }
    .spt-blank { display: inline-flex; gap: 4px; margin: 0 3px; padding: 3px; border-radius: 14px; background: #e0f2fe; border: 2px dashed #7dd3fc; }
    .spt-blank.is-set { border-style: solid; border-color: #38bdf8; }
    .spt-opt { min-width: 2.6rem; min-height: 2.6rem; padding: 0 .5rem; border: 0; border-radius: 11px; cursor: pointer;
      font: inherit; font-weight: 800; color: #0369a1; background: #fff; box-shadow: 0 4px 0 #93c5fd; transition: background .15s, color .15s; }
    .spt-opt:active { transform: translateY(3px); box-shadow: 0 1px 0 #93c5fd; }
    .spt-opt:focus-visible { outline: 3px solid #1e293b; outline-offset: 2px; }
    .spt-blank.is-set .spt-opt:not(.is-on):not(.is-right) { color: #94a3b8; background: #f1f5f9; box-shadow: 0 4px 0 #cbd5e1; }
    .spt-opt.is-on { color: #fff; background: linear-gradient(135deg, #0ea5e9, #2563eb); box-shadow: 0 4px 0 #1e40af; }
    .spt-opt.is-pop { animation: spt-pop .3s ease-out; }
    @keyframes spt-pop { 40% { transform: scale(1.18); } }
    .spt-mark { font-family: 'Dancing Script', cursive; font-weight: 700; font-size: 2rem; line-height: 1; color: #dc2626; text-align: center; }
    .spt-item.is-ok .spt-mark { color: #16a34a; }
    .spt-why { grid-column: 2 / -1; min-height: 1.3em; font-size: .95rem; line-height: 1.35; color: #b91c1c; visibility: hidden; }
    .spt-why.is-on { visibility: visible; }
    .is-graded .spt-opt { pointer-events: none; }
    .is-graded .spt-item.is-ok { border-color: #86efac; background: #f0fdf4; }
    .is-graded .spt-item.is-bad { border-color: #fca5a5; background: #fef2f2; }
    .spt-blank .spt-opt.is-wrong { color: #fff; background: #ef4444; box-shadow: 0 4px 0 #991b1b; text-decoration: line-through; text-decoration-thickness: 3px; }
    .spt-blank .spt-opt.is-right { color: #15803d; background: #fff; box-shadow: 0 0 0 3px #22c55e, 0 4px 0 #15803d; }
    .spt-foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px 16px; margin-top: 18px; min-height: 4rem; }
    .spt-btn { min-width: 12rem; padding: 12px 26px; border: 0; border-radius: 999px; cursor: pointer; font: 800 1.35rem/1.2 'Baloo 2', system-ui, sans-serif;
      color: #fff; background: linear-gradient(135deg, #22c55e, #16a34a); box-shadow: 0 6px 0 #15803d; }
    .spt-btn:active { transform: translateY(4px); box-shadow: 0 2px 0 #15803d; }
    .spt-btn-check { background: linear-gradient(135deg, #94a3b8, #64748b); box-shadow: 0 6px 0 #475569; }
    .spt-btn-check.is-ready { background: linear-gradient(135deg, #22c55e, #16a34a); box-shadow: 0 6px 0 #15803d; }
    .spt-btn-ghost { color: #0f3d5e; background: #fff; box-shadow: 0 6px 0 #bfdbfe; }
    .spt-left { font-weight: 800; color: #b45309; min-width: 12rem; }
    @media (max-width: 640px) {
      .spt-head { grid-template-columns: 1fr 7.5rem; }
      .spt-score { font-size: 2.8rem; }
      .spt-comment { font-size: 1rem; }
    }
    @media (prefers-reduced-motion: reduce) {
      .spt-opt.is-pop { animation-duration: .6s; }
      .spt-scorebox.is-on .spt-score { animation-duration: 1.2s; }
    }`;
  document.head.appendChild(st);
}
