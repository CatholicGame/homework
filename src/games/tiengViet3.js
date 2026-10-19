/**
 * 📖 Bài tập cuối tuần Tiếng Việt lớp 3 (Kết nối tri thức, học kì I và II, 35 tuần).
 * Ba màn: danh sách tuần · làm bài (bài đọc + câu hỏi, nộp bài) · chữa bài từng câu (chỉ xem):
 * câu đọc hiểu tô sáng chỗ trong bài đọc chứa đáp án, câu chính tả nêu quy luật và mở trò
 * 🔤 Luật chính tả (tv3Spell.js), câu gạch chân / xếp nhóm nêu nghĩa của nhóm từ.
 *
 * Dữ liệu: src/data/tv3Weekly/tuanNN.js
 *   { id: 'tuan-1', week, topic, read: { title, author, intro?, poem: [[dòng…]…] | paras: ['…'] },
 *     parts: [{ title, questions: [câu…] }] }
 * Câu (q.type, xem tiengViet3/types.js):
 *   choice    { q, opts, ans: số | [số…], layout?: 'cells', quote?: ['câu trong bài đọc'], why }
 *   spell     { q, rule: 'ck'|'ggh'|…, items: ['[k]im [c]ương'] }   (rules.js)
 *   underline { q, marks: [{n:1, kind:'sv'}, {n:2, kind:'hd'}], lines, prose?, ans: {1:[…], 2:[…]}, ok? }
 *   sort      { q, words, groups: [{ label, kind?, words }] }
 *   match     { q, left, right, ans: [chỉ số bên phải cho từng ô bên trái] }
 *   fill      { q, items: [{ t: 'Đây là {cô giáo|cô}. Cô đang {*giảng bài}.', pic? }] }
 *   punct     { q, mark: ':', items: ['… nhiều thứ^ bút, vở.'] }
 *   write     { q, parts?: [{ label, sample }], sample?, tip?, pic? }   (không chấm điểm)
 * Mọi câu có thể có: why (lời giải thích khi chữa), stars (1–5), pic (tranh tự vẽ, tiengViet3/pics.js),
 *   text: ['đoạn văn in kèm câu hỏi, **từ in đậm**, __từ gạch chân__'] (textPoem: true = căn giữa như thơ).
 */

import { TYPES, isGraded } from './tiengViet3/types.js';
import { scopedKey } from '../engine/auth.js';
import { awardStars, recordWrong, earnedFor } from '../engine/stars.js';
import { picSvg } from './tiengViet3/pics.js';
import { scenesFor, openPoemPlayer } from './tiengViet3/poemPlayer.js';
import '../styles/tv3.css';

const WEEKS = Object.values(import.meta.glob('../data/tv3Weekly/tuan*.js', { eager: true, import: 'default' }))
  .sort((a, b) => a.week - b.week);

const STORE = 'tv3w-v1';
const STAR_PREFIX = 'tv3';
const DEFAULT_STARS = { choice: 1, spell: 2, underline: 3, sort: 3, match: 2, fill: 2, punct: 2 };

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function loadStore() {
  try { return JSON.parse(localStorage.getItem(scopedKey(STORE))) || {}; } catch { return {}; }
}
function saveStore(s) {
  try { localStorage.setItem(scopedKey(STORE), JSON.stringify(s)); } catch { /* đầy bộ nhớ */ }
  window.dispatchEvent(new CustomEvent('tth:data-changed'));
}

/** Tất cả câu của một tuần, đánh số liên tục như trong đề (Câu 1, 2, …). */
function questionsOf(week) {
  const out = [];
  week.parts.forEach((p, pi) => p.questions.forEach(q => out.push({ q, pi, n: out.length + 1, reading: pi === 0 })));
  return out;
}
const starKey = (week, n) => `${STAR_PREFIX}:${week.id}:q${n}`;
const starQ = (q) => ({ stars: q.stars || DEFAULT_STARS[q.type] || 2 });

/** Điểm 10, làm tròn 0,5 như cô chấm. */
const roundHalf = (x) => Math.round(x * 2) / 2;
const fmtScore = (score) => String(score).replace('.', ',');

// Học kì I: tuần 1–18, Học kì II: tuần 19–35. Tab đang chọn nhớ trên máy (như Luyện Đề).
const TERMS = [{ n: 1, name: 'Học kì I' }, { n: 2, name: 'Học kì II' }];
const termOfWeek = (w) => (w.week <= 18 ? 1 : 2);
const TERM_KEY = 'tv3w-term';
function savedTerm() {
  try { const v = Number(localStorage.getItem(TERM_KEY)); return v === 1 || v === 2 ? v : 0; } catch { return 0; }
}
function saveTerm(t) {
  try { localStorage.setItem(TERM_KEY, String(t)); } catch { /* chế độ riêng tư */ }
}
function teacherComment(score) {
  if (score >= 10) return 'Tuyệt vời! Em đọc kĩ và làm đúng hết.';
  if (score >= 9) return 'Giỏi lắm! Em xem lại câu còn sai cho thật nhớ.';
  if (score >= 7) return 'Khá tốt! Em chữa lại các câu sai cho thật nhớ.';
  if (score >= 5) return 'Em cần đọc kĩ bài hơn. Cùng chữa bài nào!';
  return 'Em đọc lại bài thật chậm rồi làm lại nào!';
}

/** Tô sáng các câu trích (quote) trong một đoạn chữ. */
function highlight(text, quotes) {
  const ranges = [];
  const low = text.toLowerCase();
  for (const qt of quotes || []) {
    const i = low.indexOf(qt.toLowerCase());
    if (i >= 0) ranges.push([i, i + qt.length]);
  }
  ranges.sort((a, b) => a[0] - b[0]);
  let out = '';
  let at = 0;
  for (const [a, b] of ranges) {
    if (a < at) continue;
    out += esc(text.slice(at, a)) + `<mark class="tv-hl">${esc(text.slice(a, b))}</mark>`;
    at = b;
  }
  return out + esc(text.slice(at));
}

function readHtml(read, quotes) {
  const body = read.poem
    ? `<div class="tv-poem">${read.poem.map(st => `<p>${st.map(l => highlight(l, quotes)).join('<br>')}</p>`).join('')}</div>`
    : `<div class="tv-prose">${read.paras.map(p => `<p>${highlight(p, quotes)}</p>`).join('')}</div>`;
  return `
    ${read.intro ? `<p class="tv-read-intro">${esc(read.intro)}</p>` : ''}
    <h3 class="tv-read-title">${esc(read.title)}</h3>
    ${read.pic ? `<div class="tv-pic">${picSvg(read.pic)}</div>` : ''}
    ${body}
    ${read.author ? `<p class="tv-read-author">${esc(read.author)}</p>` : ''}`;
}

/** Đoạn văn / thơ in kèm câu hỏi (q.text): '**đậm**', '__gạch chân__' như trong đề. */
function qTextHtml(q) {
  if (!q.text?.length) return '';
  const fmt = (line) => esc(line).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/__(.+?)__/g, '<u>$1</u>');
  return `<div class="tv-qtext${q.textPoem ? ' is-poem' : ''}">${q.text.map(l => `<p>${fmt(l)}</p>`).join('')}</div>`;
}

function loadHandFont() {
  if (document.getElementById('ws-font')) return;
  const link = document.createElement('link');
  link.id = 'ws-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap';
  document.head.appendChild(link);
}

/** Chấm cả tuần: { score (thang 10), per: { [số câu]: { score, full } | { graded: false } } }. */
export function gradeWeek(week, answers) {
  const per = {};
  let sum = 0;
  let cnt = 0;
  for (const x of questionsOf(week)) {
    const t = TYPES[x.q.type];
    if (!isGraded(x.q)) { per[x.n] = { graded: false }; continue; }
    const g = t.grade(x.q, answers[x.n] ?? t.empty(x.q));
    per[x.n] = { score: g.score, full: g.full };
    sum += g.score; cnt++;
  }
  return { score: cnt ? roundHalf((10 * sum) / cnt) : 10, per };
}

export function render(app, onBack, ctx = {}) {
  app.setAttribute('data-no-i18n', ''); // môn Tiếng Việt: không dịch
  loadHandFont();
  let mounted = []; // widget cần huỷ (ResizeObserver) khi đổi màn

  // tab học kì: lần trước con chọn, chưa chọn thì tháng 2–7 mở Học kì II
  const month = new Date().getMonth() + 1;
  let term = savedTerm() || (month >= 2 && month <= 7 && WEEKS.some(w => termOfWeek(w) === 2) ? 2 : 1);

  const open = ctx.open;
  if (open?.week) {
    const w = WEEKS.find(x => x.id === open.week);
    if (w && open.review !== undefined) showReview(w, open.review);
    else if (w) showSheet(w);
    else showList();
  } else showList();

  function cleanup() { mounted.forEach(m => m?.destroy?.()); mounted = []; }

  function frame({ back, backLabel, title, right = '', cls = '' }, bodyHtml) {
    cleanup();
    app.innerHTML = `
      <div class="tv-page ${cls}">
        <div class="tv-top">
          <button type="button" class="btn btn-ghost tv-back">${backLabel}</button>
          <h1 class="tv-title">${title}</h1>
          <div class="tv-top-right">${right}</div>
        </div>
        <div class="tv-body">${bodyHtml}</div>
      </div>`;
    app.querySelector('.tv-back').onclick = back;
    app.scrollTop = 0;
    return app.querySelector('.tv-body');
  }

  // ── 1. Danh sách tuần: hai tab Học kì I / Học kì II như Luyện Đề ──────
  function showList() {
    const store = loadStore();
    const list = WEEKS.filter(w => termOfWeek(w) === term);
    const doneN = list.filter(w => store[w.id]?.result || store[w.id]?.best != null).length;
    const tabs = `<div class="tv-terms" role="tablist">${TERMS.map(t => `<button type="button" role="tab" class="tv-term-tab${t.n === term ? ' is-on' : ''}" data-term="${t.n}" aria-selected="${t.n === term}">${t.name}</button>`).join('')}</div>`;
    const body = frame({ back: onBack, backLabel: '← Tiếng Việt', title: '📖 Bài tập cuối tuần', right: tabs, cls: 'tv-list-page' }, `
      <p class="tv-lead">Tiếng Việt 3, Kết nối tri thức. Mỗi tuần: đọc bài, trả lời câu hỏi, luyện chính tả và luyện từ và câu. Nộp bài xong em chữa từng câu với cô.</p>
      ${doneN ? `<p class="tv-term-sum">Đã nộp ${doneN}/${list.length} tuần</p>` : ''}
      <div class="tv-weeks">${list.map(w => {
        const rec = store[w.id];
        const done = rec?.result;
        // điểm cô chấm lần nộp gần nhất; đang làm lại thì hiện điểm cao nhất đã có
        const mark = done ? done.score : rec?.best;
        const best = rec?.best != null && done && rec.best > done.score ? rec.best : null;
        const started = rec?.draft && Object.keys(rec.draft).length;
        const st = done ? `Đã chấm${best != null ? ` · cao nhất ${fmtScore(best)}` : ''}`
          : mark != null ? (started ? 'Đang làm lại' : 'Làm lại') : started ? 'Đang làm' : 'Chưa làm';
        return `<button type="button" class="tv-week${done ? ' is-done' : rec?.draft ? ' is-started' : ''}" data-id="${w.id}">
          <span class="tv-week-head">
            <span class="tv-week-n">Tuần ${w.week}</span>
            ${mark != null ? `<span class="tv-week-mark${done ? '' : ' is-old'}" aria-label="Điểm ${fmtScore(mark)}">${fmtScore(mark)}<svg viewBox="0 0 120 100" preserveAspectRatio="none" aria-hidden="true"><path d="M95 22 C 70 4, 20 8, 12 42 C 6 72, 40 94, 72 88 C 104 82, 116 50, 100 28 C 94 20, 84 14, 74 12" /></svg></span>` : ''}
          </span>
          <span class="tv-week-topic">${esc(w.topic)}</span>
          <span class="tv-week-st">${st}</span>
        </button>`;
      }).join('')}</div>`);
    app.querySelectorAll('.tv-term-tab').forEach(btn => {
      btn.onclick = () => { term = +btn.dataset.term; saveTerm(term); showList(); };
    });
    body.querySelectorAll('.tv-week').forEach(b => b.onclick = () => showSheet(WEEKS.find(w => w.id === b.dataset.id)));
  }

  // ── 2. Làm bài / xem bài đã nộp ────────────────────────────────────────
  function showSheet(week, { scrollTo } = {}) {
    term = termOfWeek(week); // quay lại danh sách đúng tab của tuần này
    const store = loadStore();
    const rec = store[week.id] || {};
    const graded = !!rec.result;
    const answers = graded ? rec.result.answers : (rec.draft || {});
    const qs = questionsOf(week);
    const mode = graded ? 'show' : 'do';

    const progress = () => {
      const need = qs.filter(x => isGraded(x.q));
      const done = need.filter(x => TYPES[x.q.type].answered(x.q, answers[x.n])).length;
      return { done, total: need.length };
    };

    const body = frame({
      back: showList, backLabel: '← Các tuần', title: `Tuần ${week.week}: ${esc(week.topic)}`,
      right: graded ? '' : `<span class="tv-progress"></span>`, cls: graded ? 'is-graded' : '',
    }, `
      ${markRow(graded ? rec : null)}
      <section class="tv-card tv-read">
        <div class="tv-part-h">I. Luyện đọc diễn cảm</div>
        ${scenesFor(week) ? `<div class="tv-read-play"><button type="button" class="btn tv-poem-play">▶️ ${scenesFor(week).prose ? 'Xem truyện' : 'Xem thơ'} bằng tranh</button></div>` : ''}
        ${readHtml(week.read)}
      </section>
      ${week.parts.map((p, pi) => `
        <section class="tv-part">
          <div class="tv-part-h">${esc(p.title)}</div>
          ${qs.filter(x => x.pi === pi).map(x => questionCard(x, graded ? rec.result.per?.[x.n] : null)).join('')}
        </section>`).join('')}
      ${graded ? `<div class="tv-foot">
          <button type="button" class="btn btn-primary tv-review-go">🔎 Chữa bài từng câu</button>
          <button type="button" class="btn tv-redo">🔄 Làm lại</button>
        </div>` : `<div class="tv-foot">
          <p class="tv-foot-msg"></p>
          <button type="button" class="btn btn-primary tv-submit">📮 Nộp bài</button>
        </div>`}`);

    const playBtn = body.querySelector('.tv-poem-play');
    if (playBtn) playBtn.onclick = () => openPoemPlayer(week);
    qs.forEach(x => {
      const el = body.querySelector(`#tvq-${x.n} .tv-q-body`);
      const t = TYPES[x.q.type];
      mounted.push(t.mount(el, x.q, {
        a: answers[x.n] ?? t.empty(x.q),
        mode,
        set: (v) => { answers[x.n] = v; saveDraft(); },
        hint: (msg) => sayHint(el, msg),
      }));
    });

    function saveDraft() {
      const s = loadStore();
      s[week.id] = { ...(s[week.id] || {}), draft: answers };
      saveStore(s);
      paintProgress();
    }
    function paintProgress() {
      if (graded) return;
      const { done, total } = progress();
      const p = app.querySelector('.tv-progress');
      if (p) p.textContent = `Đã làm ${done}/${total}`;
      const btn = app.querySelector('.tv-submit');
      const msg = app.querySelector('.tv-foot-msg');
      const left = total - done;
      btn.classList.toggle('is-off', left > 0);
      msg.textContent = left > 0 ? `Còn ${left} câu chưa làm. Câu viết tự do không bắt buộc.` : 'Em làm xong rồi! Kiểm tra lại một lượt rồi nộp bài.';
      qs.forEach(x => {
        const card = app.querySelector(`#tvq-${x.n}`);
        card?.classList.toggle('is-answered', isGraded(x.q) && TYPES[x.q.type].answered(x.q, answers[x.n]));
      });
    }
    paintProgress();

    if (!graded) {
      body.querySelector('.tv-submit').onclick = () => {
        const first = qs.find(x => isGraded(x.q) && !TYPES[x.q.type].answered(x.q, answers[x.n]));
        if (first) {
          const card = app.querySelector(`#tvq-${first.n}`);
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.classList.remove('is-nudge'); void card.offsetWidth; card.classList.add('is-nudge');
          return;
        }
        submit(week, answers);
      };
    } else {
      body.querySelectorAll('.tv-review-go').forEach(b => { b.onclick = () => showReview(week, 0); });
      body.querySelector('.tv-redo').onclick = () => {
        const s = loadStore();
        s[week.id] = { ...s[week.id], result: null, draft: {} };
        saveStore(s);
        showSheet(week);
      };
    }
    if (scrollTo) app.querySelector(scrollTo)?.scrollIntoView({ block: 'center' });
  }

  function questionCard(x, res) {
    const st = res ? (res.graded === false ? '<span class="tv-q-st is-free">Tự viết</span>' : res.full ? '<span class="tv-q-st is-ok">✓ Đúng</span>' : `<span class="tv-q-st is-no">✗ ${res.score > 0 ? 'Đúng một phần' : 'Chưa đúng'}</span>`) : '';
    return `
      <div class="tv-card tv-q" id="tvq-${x.n}">
        <div class="tv-q-h"><b class="tv-q-n">Câu ${x.n}.</b> <span>${esc(x.q.q)}</span>${st}</div>
        ${qTextHtml(x.q)}
        <div class="tv-q-body"></div>
      </div>`;
  }

  function sayHint(el, msg) {
    let h = el.closest('.tv-q')?.querySelector('.tv-hint');
    if (!h) {
      h = document.createElement('div');
      h.className = 'tv-hint';
      el.closest('.tv-q')?.appendChild(h);
    }
    h.textContent = msg;
    h.classList.remove('is-pop'); void h.offsetWidth; h.classList.add('is-pop');
  }

  /** Khung chấm như bài kiểm tra trên giấy: ô ĐIỂM + Nhận xét của thầy cô, trống tới khi nộp bài. */
  function markRow(rec) {
    const r = rec?.result;
    const per = Object.values(r?.per || {}).filter(p => p.graded !== false);
    const right = per.filter(p => p.full).length;
    // "Tuyệt vời! Em đọc kĩ…" → hai dòng lời phê, tách sau câu đầu
    const lines = r ? (teacherComment(r.score).match(/[^.!?]+[.!?]+/g) || []).map(t => t.trim()) : [];
    const comment = lines.length > 2 ? [lines[0], lines.slice(1).join(' ')] : lines;
    return `
      <section class="tv-mark-row${r ? ' is-graded' : ''}">
        <div class="tv-scorebox">
          <div class="tv-box-label">ĐIỂM</div>
          <div class="tv-score-area">${r ? `
            <span class="tv-score tv-write" style="--d:0.2s">${String(r.score).replace('.', ',')}</span>
            <svg class="tv-ring" viewBox="0 0 120 100" aria-hidden="true"><path d="M95 22 C 70 4, 20 8, 12 42 C 6 72, 40 94, 72 88 C 104 82, 116 50, 100 28 C 94 20, 84 14, 74 12" /></svg>` : ''}
          </div>
        </div>
        <div class="tv-commentbox">
          <div class="tv-box-label">Nhận xét của thầy cô:</div>
          <div class="tv-comment-lines">
            ${[0, 1].map(i => `<div class="tv-cline">${comment[i] ? `<span class="tv-comment tv-write" style="--d:${1.1 + i * 0.9}s">${esc(comment[i])}</span>` : ''}</div>`).join('')}
          </div>
          ${r ? `<div class="tv-result-row">
            <span class="tv-result-sub">Đúng ${right}/${per.length} câu${rec.attempts > 1 ? ` · Lần làm thứ ${rec.attempts}` : ''}</span>
            <button type="button" class="btn btn-primary tv-review-go">🔎 Chữa bài từng câu</button>
          </div>` : ''}
        </div>
      </section>`;
  }

  function submit(week, answers) {
    const { score, per } = gradeWeek(week, answers);
    let delay = 300;
    for (const x of questionsOf(week)) {
      const p = per[x.n];
      if (p.graded === false) continue;
      const key = starKey(week, x.n);
      if (earnedFor(key)) continue;
      if (p.full) { setTimeout(() => awardStars(key, starQ(x.q)), delay); delay += 900; } else recordWrong(key, starQ(x.q));
    }
    const s = loadStore();
    const prev = s[week.id] || {};
    s[week.id] = {
      draft: null,
      result: { answers, score, per, at: Date.now() },
      best: Math.max(prev.best ?? 0, score),
      attempts: (prev.attempts || 0) + 1,
    };
    saveStore(s);
    showSheet(week);
  }

  // ── 3. Chữa bài từng câu ───────────────────────────────────────────────
  function showReview(week, idx) {
    const rec = loadStore()[week.id];
    if (!rec?.result) { showSheet(week); return; }
    const qs = questionsOf(week);
    const x = qs[Math.max(0, Math.min(idx, qs.length - 1))];
    const t = TYPES[x.q.type];
    const res = rec.result.per?.[x.n] || {};
    const a = rec.result.answers[x.n] ?? t.empty(x.q);
    const showPassage = x.reading || x.q.quote?.length;
    const needKey = ['underline', 'sort', 'match'].includes(x.q.type) && !res.full; // làm đúng hết thì không cần xem lại đáp án
    const graded = isGraded(x.q);
    const status = !graded ? '<span class="tv-q-st is-free">Câu tự viết</span>'
      : res.full ? '<span class="tv-q-st is-ok">✓ Em làm đúng</span>'
        : `<span class="tv-q-st is-no">✗ ${res.score > 0 ? 'Em đúng một phần' : 'Em làm chưa đúng'}</span>`;

    const body = frame({
      back: () => showSheet(week, { scrollTo: `#tvq-${x.n}` }), backLabel: '← Bài làm',
      title: `Chữa bài · Câu ${x.n}/${qs.length}`, cls: 'tv-review-page',
    }, `
      <div class="tv-dots">${qs.map((y, k) => {
        const p = rec.result.per?.[y.n] || {};
        const c = p.graded === false ? 'is-free' : p.full ? 'is-ok' : 'is-no';
        return `<button type="button" class="tv-dot ${c}${y === x ? ' is-cur' : ''}" data-k="${k}">${y.n}</button>`;
      }).join('')}</div>
      <div class="tv-review${showPassage ? ' has-passage' : ''}">
        ${showPassage ? `<section class="tv-card tv-read tv-review-read">
          <div class="tv-part-h">Bài đọc${x.q.quote?.length ? ' · <span class="tv-hl-key">chỗ tô vàng là căn cứ để trả lời</span>' : ''}</div>
          ${readHtml(week.read, x.q.quote)}
        </section>` : ''}
        <section class="tv-card tv-review-q">
          <div class="tv-q-h"><b class="tv-q-n">Câu ${x.n}.</b> <span>${esc(x.q.q)}</span></div>
          ${qTextHtml(x.q)}
          <div class="tv-review-row"><div class="tv-review-lab">Bài của em ${status}</div><div class="tv-review-mine"></div></div>
          ${needKey ? '<div class="tv-review-row"><div class="tv-review-lab is-key">Đáp án đúng</div><div class="tv-review-key"></div></div>' : ''}
          <div class="tv-explain">
            <div class="tv-explain-h">💡 Vì sao?</div>
            ${x.q.why ? `<p>${esc(x.q.why)}</p>` : ''}
            ${t.explain?.(x.q, a) || ''}
          </div>
        </section>
      </div>
      <div class="tv-review-nav">
        <button type="button" class="btn tv-prev" ${idx <= 0 ? 'disabled' : ''}>← Câu trước</button>
        ${idx >= qs.length - 1
          ? '<button type="button" class="btn btn-primary tv-finish">Xong ✓</button>'
          : '<button type="button" class="btn btn-primary tv-next">Câu sau →</button>'}
      </div>`);

    mounted.push(t.mount(body.querySelector('.tv-review-mine'), x.q, { a, mode: 'show', set: () => {} }));
    if (needKey) mounted.push(t.mount(body.querySelector('.tv-review-key'), x.q, { a, mode: 'key', set: () => {} }));
    body.querySelector('.tv-hl')?.scrollIntoView({ block: 'nearest' });

    body.querySelectorAll('.tv-dot').forEach(d => d.onclick = () => showReview(week, Number(d.dataset.k)));
    body.querySelector('.tv-prev').onclick = () => showReview(week, idx - 1);
    body.querySelector('.tv-next')?.addEventListener('click', () => showReview(week, idx + 1));
    body.querySelector('.tv-finish')?.addEventListener('click', () => showSheet(week));
    body.querySelectorAll('.tv-play').forEach(b => b.onclick = () => {
      ctx.navigate?.('tv3-spell', { open: { rule: b.dataset.rule }, back: 'tv3-weekly', backOpen: { week: week.id, review: idx } });
    });
  }
}
