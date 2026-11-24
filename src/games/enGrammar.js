/**
 * 📐 Ngữ pháp tiếng Anh cho bé (thẻ english-grammar, tab 🌍 Tiếng Anh, lớp 1–5). Dữ liệu: src/data/enGrammar/units.js.
 *
 * Danh sách: nút to "Học tiếp" + 3 cấp Cambridge (Starters, Movers, Flyers), mỗi cấp vài chặng, mỗi bài một thẻ (số, hình, tên Việt, mẫu câu tiếng Anh, sao).
 * Một bài có 3 bước, thanh bước ở trên chạm qua lại được:
 *   1 👀 Học   luật một câu, bảng ghép màu (I → am), câu mẫu có hình, chạm để nghe, mẹo nhớ
 *              🎬 Câu biến hình (src/games/enGrammar/movie.js, kịch bản src/data/enGrammar/anims.js): thẻ chữ chuyển động qua từng bước
 *              🎮 Thử xem (cả 64 bài: demos.js g01–g28, demosMore.js, demosMovers.js, demosFlyers.js): hình vẽ đổi theo nút bé chạm, câu đổi theo và được đọc
 *   2 ✋ Luyện 8 câu, mỗi màn một câu, chọn bằng nút to, chấm ngay: chọn từ / chọn câu / xếp chữ / đúng hay sai.
 *              Sai thì hiện đáp án + lý do một dòng, câu sai được hỏi lại một lần ở cuối.
 *              🎬 Câu Đúng/Sai có câu sai: câu tự biến thành câu đúng (movie.js diffTiles + flipTo); xếp chữ sai: thẻ tự bay về đúng thứ tự.
 *   3 ⭐ Xong  sao theo số câu đúng ngay lần đầu, Làm lại / Bài tiếp
 * Màn Luyện chia vùng cố định từ đầu (tiến độ, bảng câu trên cảnh vẽ, vùng nút, thanh nhắc) nên không nhảy bố cục trong lượt.
 * Sao: lần đầu xong bài được 2 sao, khoá engram<lớp>:<bài> (BOOK_GRADE trong engine/stars.js).
 * Tiến độ: localStorage scopedKey('engram-v1') = { last, units: { [id]: { best: 1..3 } } } (đồng bộ cloudSync.js).
 * Xem thử: scripts/en-grammar-dev.html?unit=g01&step=practice
 */
import '../styles/en-grammar.css';
import { LEVELS, STAGES, UNITS } from '../data/enGrammar/units.js';
import { sayEn, sayEnSeq, stopEn, unlockSpeech, prefetchEn } from '../engine/speakEn.js';
import { scopedKey } from '../engine/auth.js';
import { awardFixedStars } from '../engine/stars.js';
import { getProfileGrade } from '../engine/profile.js';
import { playSfx } from '../engine/sfx.js';
import { DEMOS as DEMOS_BASE } from './enGrammar/demos.js';
import { STARTERS_DEMOS } from './enGrammar/demosMore.js';
import { MOVERS_DEMOS } from './enGrammar/demosMovers.js';
import { FLYERS_DEMOS } from './enGrammar/demosFlyers.js';

import { mountMovie, flipTo, tilesHtml, diffTiles } from './enGrammar/movie.js';
import { ANIMS } from '../data/enGrammar/anims.js';

const DEMOS = { ...DEMOS_BASE, ...STARTERS_DEMOS, ...MOVERS_DEMOS, ...FLYERS_DEMOS };

const STORE = 'engram-v1';
const STEPS = [
  { id: 'learn', icon: '👀', name: 'Học' },
  { id: 'practice', icon: '✋', name: 'Luyện' },
  { id: 'done', icon: '⭐', name: 'Xong' },
];
const PRAISE = ['Đúng rồi!', 'Giỏi quá!', 'Chính xác!', 'Hay lắm!'];

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
/** Chữ tiếng Anh (không dấu tiếng Việt, có chữ cái) thì chạm để nghe. */
const isEnText = (t) => /[A-Za-z]/.test(t) && !/[À-ỹĐđ]/.test(t);
/** Đọc gọn cho máy: "He · She · It" → "He, She, It", bỏ "..." và mũi tên. */
const spoken = (t) => t.replace(/\s*[·/]\s*/g, ', ').replace(/\.{3}|…/g, '').replace(/\s*→\s*/g, ', ').trim();
const sayAttr = (t) => (isEnText(t) ? ` data-say="${esc(spoken(t))}"` : '');
/** *từ* → chữ tô màu */
const rich = (s) => esc(s).replace(/\*(.+?)\*/g, '<b class="eg-k" lang="en">$1</b>');

function loadStore() {
  try { return { units: {}, ...JSON.parse(localStorage.getItem(scopedKey(STORE))) }; } catch { return { units: {} }; }
}
function saveStore(s) {
  try { localStorage.setItem(scopedKey(STORE), JSON.stringify(s)); } catch { /* đầy bộ nhớ */ }
  window.dispatchEvent(new CustomEvent('tth:data-changed'));
}

/** Câu luyện viết gọn trong units.js → { kind, pic, ... } */
export function parseQ(src) {
  let s = src.trim(), kind = 'pick';
  if (/^o:/.test(s)) { kind = 'order'; s = s.slice(2).trim(); } else if (/^tf:/.test(s)) { kind = 'tf'; s = s.slice(3).trim(); }
  const m = s.match(/^(\S+)\s+(.*)$/);
  let pic = '', body = s;
  if (m && !/[A-Za-z{]/.test(m[1])) { pic = m[1]; body = m[2]; }
  const [main, why = ''] = body.split(/\s*\/\/\s*/);
  if (kind === 'order') {
    const end = (main.match(/[.?!]$/) || [''])[0];
    return { kind, pic, answer: main, end, words: main.replace(/[.?!]$/, '').split(/\s+/) };
  }
  if (kind === 'tf') {
    const [shown, fix] = main.split(/\s*=>\s*/);
    return { kind, pic, shown, fix: fix || '', ok: !fix };
  }
  const b = main.match(/\{([^}]+)\}/);
  const opts = b[1].split('|').map((x) => x.trim());
  const before = main.slice(0, b.index).trim(), after = main.slice(b.index + b[0].length).trim();
  const whole = !before && !after; // chọn cả câu
  return { kind: whole ? 'sentence' : 'pick', pic, before, after, opts, answer: opts[0], why, full: whole ? opts[0] : `${before} ${opts[0]} ${after}`.replace(/\s+([.?!,])/g, '$1').trim() };
}
/** Số hình emoji (👨‍👩‍👧 là một hình). */
const emojiCount = (t) => (typeof Intl !== 'undefined' && Intl.Segmenter ? [...new Intl.Segmenter().segment(t)].length : [...t].length);
const starsOf = (right, total) => (right >= total * 0.9 ? 3 : right >= total * 0.6 ? 2 : 1);

export function render(app, onBack, ctx = {}) {
  app.setAttribute('data-no-i18n', '');
  let store = loadStore();
  let stopView = null;
  const grade = [1, 2, 3, 4, 5].includes(getProfileGrade()) ? getProfileGrade() : null;
  const cleanup = () => { stopEn(); stopView?.(); stopView = null; };

  const start = ctx.open?.unit && UNITS.find((u) => u.id === ctx.open.unit);
  if (start) showUnit(start, ctx.open.step); else showList();
  return cleanup;

  // ── Lộ trình ─────────────────────────────────────────────────────────────
  function showList() {
    cleanup();
    store = loadStore();
    const best = (u) => store.units[u.id]?.best || 0;
    const doneN = UNITS.filter(best).length;
    const next = UNITS.find((u) => !best(u)) || UNITS[0];
    const starRow = (n) => `<span class="eg-stars" aria-label="${n} sao">${[1, 2, 3].map((k) => `<i class="${k <= n ? 'on' : ''}">★</i>`).join('')}</span>`;
    const card = (u) => {
      const b = best(u), isNext = u === next;
      return `<button type="button" class="eg-card${b ? ' is-done' : ''}${isNext ? ' is-next' : ''}" data-id="${u.id}" style="--c:${u.stage.color}">
        <span class="eg-card-no">${b ? '✓' : u.no}</span>
        <span class="eg-card-ic" aria-hidden="true">${u.icon}</span>
        <span class="eg-card-t"><strong>${esc(u.vi)}</strong><small lang="en">${esc(u.en)}</small></span>
        ${b ? starRow(b) : isNext ? '<span class="eg-card-go">Học ▶</span>' : ''}
      </button>`;
    };
    app.innerHTML = `
      <div class="eg eg-list">
        <header class="eg-top">
          <button type="button" class="btn btn-ghost eg-back">← Trang chủ</button>
          <h1 class="eg-title">📐 Ngữ pháp tiếng Anh</h1>
          <span class="eg-count">${doneN}/${UNITS.length}</span>
        </header>
        <main class="eg-listbody">
          <button type="button" class="eg-hero" data-id="${next.id}" style="--c:${next.stage.color}">
            <span class="eg-hero-ic" aria-hidden="true">${next.icon}</span>
            <span class="eg-hero-t"><small>${doneN ? 'Học tiếp' : 'Bắt đầu'} · <span lang="en">${next.level.name}</span> · Bài ${next.no}</small><strong>${esc(next.vi)}</strong><em lang="en">${esc(next.en)}</em></span>
            <span class="eg-hero-go">▶</span>
          </button>
          <ol class="eg-how" aria-label="Cách học">
            <li><b>👀</b>Xem cách dùng</li><li><b>✋</b>Luyện 8 câu</li><li><b>⭐</b>Nhận sao</li>
          </ol>
          ${LEVELS.map((l) => {
            const ls = STAGES.filter((s) => s.level === l.id);
            const lu = ls.flatMap((s) => s.units);
            return `<div class="eg-level eg-level-${l.id}">
              <header class="eg-level-h"><span class="eg-level-ic" aria-hidden="true">${l.icon}</span><div><h2 lang="en">${esc(l.name)} <small>${esc(l.cefr)}</small></h2><p>${esc(l.note)}</p></div><span class="eg-stage-n">${lu.filter(best).length}/${lu.length}</span></header>
              ${ls.map((s) => {
                const n = s.units.filter(best).length;
                return `<section class="eg-stage" style="--c:${s.color}">
                  <header><span class="eg-stage-ic" aria-hidden="true">${s.icon}</span><div><h3>Chặng ${STAGES.indexOf(s) + 1}: ${esc(s.name)}</h3><p>${esc(s.note)}</p></div><span class="eg-stage-n">${n}/${s.units.length}</span></header>
                  <div class="eg-cards">${s.units.map((u) => card(UNITS.find((x) => x.id === u.id))).join('')}</div>
                </section>`;
              }).join('')}
            </div>`;
          }).join('')}
        </main>
      </div>`;
    app.scrollTop = 0;
    app.querySelector('.eg-back').onclick = () => { cleanup(); onBack(); };
    app.querySelectorAll('[data-id]').forEach((b) => b.addEventListener('click', () => showUnit(UNITS.find((u) => u.id === b.dataset.id))));
  }

  // ── Một bài ──────────────────────────────────────────────────────────────
  function showUnit(u, stepId) {
    cleanup();
    store = loadStore(); store.last = u.id; saveStore(store);
    const ex = u.ex.map((e) => { const [l, vi = ''] = e.split('|'); const m = l.match(/^(\S+)\s+(.*)$/); return { pic: m[1], en: m[2], vi }; });
    prefetchEn(ex.map((e) => e.en.replace(/\*/g, '')));
    app.innerHTML = `
      <div class="eg eg-unit" style="--c:${u.stage.color}">
        <header class="eg-top">
          <button type="button" class="btn btn-ghost eg-back">← Bài học</button>
          <h1 class="eg-title"><span class="eg-num">${u.no}.</span> ${esc(u.vi)}</h1>
        </header>
        <nav class="eg-steps">${STEPS.map((s, i) => `<button type="button" class="eg-step" data-s="${s.id}"><b>${i + 1}</b><span aria-hidden="true">${s.icon}</span>${s.name}</button>`).join('<i class="eg-step-line" aria-hidden="true"></i>')}</nav>
        <div class="eg-view"></div>
      </div>`;
    app.scrollTop = 0;
    const root = app.querySelector('.eg-unit'), view = root.querySelector('.eg-view');
    root.addEventListener('pointerdown', () => unlockSpeech(), { once: true });
    app.querySelector('.eg-back').onclick = showList;
    let result = null; // { right, total } sau khi luyện xong
    const go = (id) => {
      stopEn(); stopView?.(); stopView = null;
      if (id === 'done' && !result) id = 'practice';
      root.querySelectorAll('.eg-step').forEach((b) => {
        const i = STEPS.findIndex((s) => s.id === b.dataset.s), cur = STEPS.findIndex((s) => s.id === id);
        b.classList.toggle('is-on', i === cur);
        b.classList.toggle('is-past', i < cur);
      });
      view.innerHTML = '';
      view.scrollTop = 0;
      if (id === 'learn') stopView = learn(view, u, ex, () => go('practice'));
      else if (id === 'practice') stopView = practice(view, u, (r) => { result = r; finish(u, r); go('done'); });
      else done(view, u, result, () => { result = null; go('practice'); }, () => go('learn'));
    };
    root.querySelectorAll('.eg-step').forEach((b) => b.addEventListener('click', () => go(b.dataset.s)));
    go(STEPS.some((s) => s.id === stepId) ? stepId : 'learn');
  }

  function finish(u, { right, total }) {
    store = loadStore();
    const rec = store.units[u.id] || (store.units[u.id] = {});
    const first = !rec.best;
    rec.best = Math.max(rec.best || 0, starsOf(right, total));
    saveStore(store);
    if (first && grade) awardFixedStars(`engram${grade}:${u.id}`, 2);
  }

  // ── 👀 Học ──
  function learn(view, u, ex, next) {
    const cols = Math.max(...(u.table || [[]]).map((r) => r.length));
    view.innerHTML = `
      <div class="eg-learn">
        <div class="eg-learn-in">
          <section class="eg-pattern">
            <p class="eg-pattern-en" lang="en">${u.en.split(/\s*·\s*/).map((p) => `<span class="eg-say"${sayAttr(p)}>${esc(p)}</span>`).join('<i aria-hidden="true"> · </i>')}</p>
            <div class="eg-rule"><span class="eg-owl" aria-hidden="true">🦉</span><p>${rich(u.rule)}</p></div>
          </section>
          ${ANIMS[u.id] ? '<section class="eg-demo eg-mv"></section>' : ''}
          ${DEMOS[u.id] ? '<section class="eg-demo eg-try"></section>' : ''}
          ${u.table ? `<section class="eg-table" style="--cols:${cols}">${u.table.map((r) => `<div class="eg-trow">${r.map((c, i) => `${i ? '<span class="eg-arrow" aria-hidden="true">→</span>' : ''}<span class="eg-chip${i ? ' is-key' : ''}"${sayAttr(c)}${isEnText(c) ? ' lang="en" role="button" tabindex="0"' : ''}>${esc(c)}</span>`).join('')}</div>`).join('')}</section>` : ''}
          <h2 class="eg-h">🔊 Chạm để nghe</h2>
          <section class="eg-exs">${ex.map((e, i) => `
            <button type="button" class="eg-ex" data-i="${i}">
              <span class="eg-ex-pic" aria-hidden="true">${e.pic}</span>
              <span class="eg-ex-t"><span class="eg-ex-en" lang="en">${rich(e.en)}</span><small>${esc(e.vi)}</small></span>
              <span class="eg-ex-say" aria-hidden="true">🔊</span>
            </button>`).join('')}</section>
          ${u.tip ? `<p class="eg-tip"><b>💡 Mẹo nhớ</b> ${rich(u.tip)}</p>` : ''}
        </div>
      </div>
      <div class="eg-bottom"><button type="button" class="eg-big eg-gopractice">✋ Luyện tập ▶</button></div>`;
    view.querySelectorAll('.eg-ex').forEach((b) => b.addEventListener('click', () => {
      view.querySelectorAll('.eg-ex').forEach((x) => x.classList.toggle('is-saying', x === b));
      sayEn(ex[b.dataset.i].en.replace(/\*/g, ''));
    }));
    // chữ tô màu trong lời giảng, mẹo nhớ: cũng chạm để nghe
    view.querySelectorAll('.eg-rule .eg-k, .eg-tip .eg-k').forEach((b) => { if (isEnText(b.textContent)) { b.dataset.say = spoken(b.textContent); b.setAttribute('role', 'button'); b.tabIndex = 0; } });
    prefetchEn([...view.querySelectorAll('[data-say]')].map((b) => b.dataset.say), { low: true });
    const sayIt = (el) => {
      view.querySelectorAll('.is-saying[data-say]').forEach((x) => x.classList.remove('is-saying'));
      el.classList.add('is-saying');
      setTimeout(() => el.classList.remove('is-saying'), 900);
      sayEn(el.dataset.say);
    };
    view.querySelector('.eg-learn').addEventListener('click', (e) => { const el = e.target.closest('[data-say]'); if (el) sayIt(el); });
    view.querySelector('.eg-learn').addEventListener('keydown', (e) => { const el = e.target.closest('[data-say]'); if (el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); sayIt(el); } });
    view.querySelector('.eg-gopractice').onclick = next;
    if (DEMOS[u.id]) demo(view.querySelector('.eg-try'), DEMOS[u.id]);
    const stopMovie = ANIMS[u.id] ? mountMovie(view.querySelector('.eg-mv'), ANIMS[u.id], { rich, esc, sayEnSeq, stopEn, prefetchEn, playSfx, reduced }) : null;
    return () => stopMovie?.();
  }

  /* 🎮 Thử xem: hình + hàng nút + câu đổi theo (src/games/enGrammar/demos.js). Hình vẽ lại mỗi lần chạm; phần tử data-k
     trùng tên trượt từ chỗ cũ sang chỗ mới, phần tử mới nảy ra. */
  function demo(host, D) {
    const st = { ...D.init };
    const all = [];
    const walk = (i, cur) => { if (i === D.groups.length) { all.push(D.say(cur).en.replace(/\*/g, '')); return; } D.groups[i].opts.forEach((o) => walk(i + 1, { ...cur, [D.groups[i].key]: o.v })); };
    walk(0, {});
    prefetchEn(all);
    host.innerHTML = `
      <h2 class="eg-demo-h">🎮 Thử xem: chạm nút để đổi hình</h2>
      <div class="eg-demo-in">
        <div class="eg-demo-pic"><svg viewBox="0 0 480 300" role="img" aria-label="Hình minh hoạ"></svg></div>
        <div class="eg-demo-side">
          ${D.groups.map((g, gi) => `<div class="eg-demo-btns" data-g="${gi}">${g.opts.map((o, oi) => `<button type="button" class="eg-demo-btn" data-o="${oi}"><b lang="en">${esc(o.label)}</b>${o.sub ? `<small>${esc(o.sub)}</small>` : ''}</button>`).join('')}</div>`).join('')}
          <div class="eg-demo-say"><p lang="en"></p><small></small></div>
        </div>
      </div>`;
    const svg = host.querySelector('svg'), sayP = host.querySelector('.eg-demo-say p'), sayVi = host.querySelector('.eg-demo-say small');
    const paint = (animate) => {
      const old = new Map();
      if (animate) svg.querySelectorAll('[data-k]').forEach((e) => old.set(e.dataset.k, e.getBoundingClientRect()));
      svg.innerHTML = D.draw(st);
      const line = D.say(st);
      sayP.innerHTML = rich(line.en);
      sayVi.textContent = line.vi;
      host.querySelectorAll('.eg-demo-btns').forEach((row) => {
        const g = D.groups[row.dataset.g];
        row.querySelectorAll('.eg-demo-btn').forEach((b) => b.classList.toggle('is-on', g.opts[b.dataset.o].v === st[g.key]));
      });
      if (!animate) return;
      const unit = 480 / (svg.getBoundingClientRect().width || 480); // px màn → đơn vị SVG
      const ms = reduced() ? 180 : 520;
      svg.querySelectorAll('[data-k]').forEach((e) => {
        const o = old.get(e.dataset.k), n = e.getBoundingClientRect();
        if (o && (Math.abs(o.left - n.left) > 1 || Math.abs(o.top - n.top) > 1)) {
          e.animate?.([{ transform: `translate(${(o.left - n.left) * unit}px, ${(o.top - n.top) * unit}px)` }, { transform: 'none' }], { duration: ms, easing: 'cubic-bezier(.3,1.3,.5,1)' });
        } else if (!o) {
          e.style.transformBox = 'fill-box'; e.style.transformOrigin = '50% 100%';
          e.animate?.(reduced() ? [{ opacity: 0 }, { opacity: 1 }] : [{ transform: 'scale(0)' }, { transform: 'scale(1.12)' }, { transform: 'none' }], { duration: ms * 0.8, easing: 'ease-out' });
        }
      });
      sayP.animate?.([{ opacity: 0.2 }, { opacity: 1 }], { duration: 260 });
    };
    host.querySelectorAll('.eg-demo-btns').forEach((row) => row.addEventListener('click', (e) => {
      const b = e.target.closest('.eg-demo-btn');
      if (!b) return;
      const g = D.groups[row.dataset.g];
      st[g.key] = g.opts[b.dataset.o].v;
      playSfx('tap', { vol: 0.4 });
      paint(true);
      sayEn(D.say(st).en.replace(/\*/g, ''));
    }));
    host.querySelector('.eg-demo-say').addEventListener('click', () => sayEn(D.say(st).en.replace(/\*/g, '')));
    paint(false);
  }

  // ── ✋ Luyện ──
  function practice(view, u, onEnd) {
    const items = u.q.map(parseQ);
    prefetchEn(items.map((q) => q.full || q.answer || q.fix || q.shown).filter(Boolean));
    const queue = shuffle(items.map((q, i) => ({ q, i })));
    const firstQ = Number(ctx.open?.q); // xem thử: &q=6 đưa câu số 6 (đếm từ 0) lên đầu
    if (firstQ >= 0 && firstQ < queue.length) queue.unshift(...queue.splice(queue.findIndex((x) => x.i === firstQ), 1));
    const total = items.length;
    const wrongOnce = new Set();
    let right = 0, pos = 0, timer = 0, alive = true;
    let laters = [];
    const later = (fn, ms) => { laters.push(setTimeout(() => { if (alive) fn(); }, ms)); };
    const clearLater = () => { laters.forEach(clearTimeout); laters = []; };
    view.innerHTML = `
      <div class="eg-play">
        <div class="eg-prog" aria-hidden="true">${items.map(() => '<i></i>').join('')}</div>
        <div class="eg-scene">${SCENE}
          <div class="eg-board"><div class="eg-pic" aria-hidden="true"></div><div class="eg-q"></div><div class="eg-fix">&nbsp;</div></div>
        </div>
        <div class="eg-choices"></div>
        <div class="eg-fb"><p class="eg-fb-t">&nbsp;</p><button type="button" class="eg-fb-next" hidden>Tiếp ▶</button></div>
      </div>`;
    const $ = (s) => view.querySelector(s);
    const board = $('.eg-board'), qEl = $('.eg-q'), picEl = $('.eg-pic'), fixEl = $('.eg-fix'), choices = $('.eg-choices'), fb = $('.eg-fb'), fbT = $('.eg-fb-t'), nextBtn = $('.eg-fb-next');
    const dots = [...view.querySelectorAll('.eg-prog i')];
    const anim = (el, kf, ms) => el.animate?.(kf, { duration: reduced() ? Math.min(ms, 200) : ms, easing: 'ease-out' });
    const shake = (el) => anim(el, reduced() ? [{ opacity: 1 }, { opacity: 0.5 }, { opacity: 1 }] : [{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(0)' }], 360);
    const popIn = (el) => anim(el, [{ transform: 'scale(.6)', opacity: 0.3 }, { transform: 'scale(1.12)', opacity: 1 }, { transform: 'scale(1)' }], 380);

    function hint(text) {
      fb.className = 'eg-fb';
      fbT.innerHTML = text;
      nextBtn.hidden = true;
    }
    function verdict(ok, cur, line) {
      const first = !wrongOnce.has(cur.i);
      if (ok && first) { right++; dots[cur.i].className = 'ok'; }
      if (!ok) { if (first) { dots[cur.i].className = 'bad'; queue.push(cur); } wrongOnce.add(cur.i); }
      if (ok && !first) dots[cur.i].className = 'fixed';
      fb.className = `eg-fb ${ok ? 'is-ok' : 'is-bad'}`;
      fbT.innerHTML = ok ? `🎉 ${pick(PRAISE)}${line ? ` <span>${line}</span>` : ''}` : `💡 ${line || 'Xem câu đúng ở trên.'}`;
      nextBtn.hidden = false;
      nextBtn.focus({ preventScroll: true });
      playSfx(ok ? 'correct' : 'wrong', { vol: 0.6 });
      choices.classList.add('is-locked');
    }
    nextBtn.onclick = () => { stopEn(); pos++; step(); };

    function step() {
      clearTimeout(timer); clearLater();
      if (!alive) return;
      if (pos >= queue.length) { onEnd({ right, total }); return; }
      const cur = queue[pos], q = cur.q;
      dots.forEach((d, i) => d.classList.toggle('is-cur', i === cur.i));
      choices.className = `eg-choices is-${q.kind}`;
      fixEl.innerHTML = '&nbsp;'; fixEl.classList.remove('is-on');
      picEl.textContent = q.pic;
      picEl.style.setProperty('--n', Math.max(1, emojiCount(q.pic))); // 3 hình thì mỗi hình nhỏ lại cho vừa bảng
      board.classList.toggle('is-retry', wrongOnce.has(cur.i));
      ({ pick: askPick, sentence: askSentence, order: askOrder, tf: askTf })[q.kind](cur, q);
      anim(board, [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], 260);
    }

    // chọn từ điền chỗ trống
    function askPick(cur, q) {
      const w = Math.max(...q.opts.map((o) => o.length));
      qEl.innerHTML = `<p class="eg-sent" lang="en">${esc(q.before)} <span class="eg-slot" style="min-width:${w + 1.5}ch">&nbsp;</span>${/^[.?!,]/.test(q.after) ? '' : ' '}${esc(q.after)}</p>`;
      choices.innerHTML = shuffle(q.opts).map((o) => `<button type="button" class="eg-opt" lang="en">${esc(o)}</button>`).join('');
      hint(wrongOnce.has(cur.i) ? '🔁 Làm lại câu này' : '👆 Chọn từ đúng điền vào chỗ trống');
      const slot = qEl.querySelector('.eg-slot');
      choices.querySelectorAll('.eg-opt').forEach((b) => b.addEventListener('click', () => {
        if (choices.classList.contains('is-locked')) return;
        const ok = b.textContent === q.answer;
        choices.querySelectorAll('.eg-opt').forEach((x) => { if (x.textContent === q.answer) x.classList.add('is-ok'); });
        if (!ok) { b.classList.add('is-bad'); shake(b); }
        slot.textContent = q.answer;
        slot.classList.add(ok ? 'is-ok' : 'is-fixed');
        popIn(slot);
        verdict(ok, cur, ok ? '' : esc(q.why));
        sayEn(q.full);
      }));
    }
    // chọn câu đúng
    function askSentence(cur, q) {
      qEl.innerHTML = '<p class="eg-ask">Câu nào đúng?</p>';
      choices.innerHTML = shuffle(q.opts).map((o) => `<button type="button" class="eg-opt eg-opt-long" lang="en">${esc(o)}</button>`).join('');
      hint(wrongOnce.has(cur.i) ? '🔁 Làm lại câu này' : '👆 Chạm vào câu đúng');
      choices.querySelectorAll('.eg-opt').forEach((b) => b.addEventListener('click', () => {
        if (choices.classList.contains('is-locked')) return;
        const ok = b.textContent === q.answer;
        choices.querySelectorAll('.eg-opt').forEach((x) => { if (x.textContent === q.answer) x.classList.add('is-ok'); else if (x !== b) x.classList.add('is-dim'); });
        if (!ok) { b.classList.add('is-bad'); shake(b); }
        verdict(ok, cur, ok ? '' : esc(q.why || `Câu đúng: ${q.answer}`));
        sayEn(q.answer);
      }));
    }
    // xếp chữ thành câu
    function askOrder(cur, q) {
      qEl.innerHTML = `<div class="eg-line" lang="en"></div><span class="eg-end">${esc(q.end)}</span>`;
      const line = qEl.querySelector('.eg-line');
      let tiles = shuffle(q.words.map((w, k) => ({ w, k })));
      if (tiles.every((t, i) => t.k === i) && tiles.length > 1) tiles = [...tiles.slice(1), tiles[0]];
      choices.innerHTML = tiles.map((t) => `<button type="button" class="eg-tile" lang="en">${esc(t.w)}</button>`).join('');
      hint(wrongOnce.has(cur.i) ? '🔁 Làm lại câu này' : '👆 Chạm các chữ theo đúng thứ tự');
      const placed = []; // [{ src, el }]
      const fly = (from, to) => {
        const a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
        anim(to, [{ transform: `translate(${a.left - b.left}px, ${a.top - b.top}px)` }, { transform: 'none' }], 280);
      };
      choices.querySelectorAll('.eg-tile').forEach((src) => src.addEventListener('click', () => {
        if (choices.classList.contains('is-locked') || src.classList.contains('is-used')) return;
        playSfx('tap', { vol: 0.4 });
        sayEn(src.textContent);
        const el = document.createElement('button');
        el.type = 'button';
        el.className = 'eg-tile is-placed';
        el.textContent = src.textContent;
        line.appendChild(el);
        src.classList.add('is-used');
        fly(src, el);
        const rec = { src, el };
        placed.push(rec);
        el.addEventListener('click', () => {
          if (choices.classList.contains('is-locked')) return;
          placed.splice(placed.indexOf(rec), 1);
          el.remove();
          src.classList.remove('is-used');
          fly(el, src);
        });
        if (placed.length === q.words.length) {
          const got = placed.map((p) => p.el.textContent).join(' ');
          const ok = got === q.words.join(' ');
          line.classList.add(ok ? 'is-ok' : 'is-bad');
          if (!ok) {
            shake(line);
            fixEl.innerHTML = `<span lang="en">✓ ${esc(q.answer)}</span>`; fixEl.classList.add('is-on');
            // 🎬 các thẻ tự bay về đúng thứ tự
            later(() => {
              const els = placed.map((p) => p.el), pool = [...els];
              const order = q.words.map((w) => { const e = pool.find((x) => x.textContent === w); pool.splice(pool.indexOf(e), 1); return e; });
              const rects = new Map(els.map((e) => [e, e.getBoundingClientRect()]));
              order.forEach((e) => line.appendChild(e));
              line.classList.remove('is-bad'); line.classList.add('is-fixed');
              const calm = reduced();
              order.forEach((e) => {
                const a = rects.get(e), b = e.getBoundingClientRect(), dx = a.left - b.left, dy = a.top - b.top;
                if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
                e.animate(calm || Math.abs(dx) < 60
                  ? [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }]
                  : [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: `translate(${dx / 2}px, ${dy / 2 - 40}px)`, offset: 0.5 }, { transform: 'none' }], { duration: calm ? 760 : 680, easing: 'cubic-bezier(.45,.05,.35,1)' });
              });
              later(() => sayEn(q.answer), 760);
            }, 700);
          } else sayEn(q.answer);
          verdict(ok, cur, ok ? '' : 'Xem các chữ bay về đúng chỗ.');
        }
      }));
    }
    // đúng hay sai
    function askTf(cur, q) {
      qEl.innerHTML = `<p class="eg-ask">Câu này đúng hay sai?</p><p class="eg-sent eg-tfsent" lang="en">${esc(q.shown)}</p>`;
      choices.innerHTML = '<button type="button" class="eg-opt eg-yes" data-v="1">✓ Đúng</button><button type="button" class="eg-opt eg-no" data-v="0">✗ Sai</button>';
      hint(wrongOnce.has(cur.i) ? '🔁 Làm lại câu này' : '👆 Đọc kỹ rồi chọn');
      const sent = qEl.querySelector('.eg-tfsent');
      choices.querySelectorAll('.eg-opt').forEach((b) => b.addEventListener('click', () => {
        if (choices.classList.contains('is-locked')) return;
        const ok = (b.dataset.v === '1') === q.ok;
        choices.querySelector(q.ok ? '.eg-yes' : '.eg-no').classList.add('is-ok');
        if (!ok) { b.classList.add('is-bad'); shake(b); }
        if (q.ok) { sent.classList.add('is-ok'); sayEn(q.shown); } else {
          // 🎬 câu sai tự biến thành câu đúng: chữ sai loé rồi đổi, chữ thừa bay đi, chữ thiếu rơi vào
          const { from, to } = diffTiles(q.shown, q.fix);
          sent.classList.add('is-wrong', 'eg-mv-line', 'is-fixline');
          sent.innerHTML = tilesHtml(from, esc);
          fixEl.innerHTML = `<span lang="en" class="eg-was">✗ <s>${esc(q.shown)}</s></span>`; fixEl.classList.add('is-on');
          later(() => {
            sent.classList.remove('is-wrong'); sent.classList.add('is-ok');
            const ms = flipTo(sent, tilesHtml(to, esc), { calm: reduced(), later });
            later(() => sayEn(q.fix), ms + 80);
          }, 650);
        }
        verdict(ok, cur, q.ok ? (ok ? 'Câu này đúng.' : 'Câu này đúng mà.') : (ok ? 'Câu sửa đúng ở trên.' : 'Câu này sai. Câu đúng ở trên.'));
      }));
    }

    step();
    return () => { alive = false; clearTimeout(timer); clearLater(); };
  }

  // ── ⭐ Xong ──
  function done(view, u, r, again, relearn) {
    const n = starsOf(r.right, r.total);
    const next = UNITS[UNITS.indexOf(u) + 1];
    view.innerHTML = `
      <div class="eg-done">${SCENE}
        <div class="eg-done-card">
          <div class="eg-done-stars">${[1, 2, 3].map((k) => `<i class="${k <= n ? 'on' : ''}">★</i>`).join('')}</div>
          <h2>${n === 3 ? 'Tuyệt vời!' : n === 2 ? 'Làm tốt lắm!' : 'Cố lên, em làm được!'}</h2>
          <p>Đúng ngay lần đầu <b>${r.right}/${r.total}</b> câu</p>
          <div class="eg-done-btns">
            ${n < 3 ? '<button type="button" class="eg-big eg-ghost eg-relearn">👀 Xem lại cách dùng</button>' : ''}
            <button type="button" class="eg-big eg-ghost eg-again">🔁 Luyện lại</button>
            ${next ? `<button type="button" class="eg-big eg-next">Bài ${next.no}: ${esc(next.vi)} ▶</button>` : '<button type="button" class="eg-big eg-tolist">🏁 Về danh sách</button>'}
          </div>
        </div>
      </div>`;
    playSfx('complete', { vol: 0.6 });
    view.querySelectorAll('.eg-done-stars i.on').forEach((s, i) => s.animate?.([{ transform: 'scale(0)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: reduced() ? 200 : 420, delay: i * 180, fill: 'backwards' }));
    view.querySelector('.eg-again').onclick = again;
    view.querySelector('.eg-relearn')?.addEventListener('click', relearn);
    view.querySelector('.eg-next')?.addEventListener('click', () => showUnit(next));
    view.querySelector('.eg-tolist')?.addEventListener('click', showList);
  }
}

// Cảnh nền màn Luyện: trời, mây, mặt trời, đồi cỏ, cây, hàng rào (vẽ phẳng, viền mực)
const INK = '#3F3A40';
const tree = (x, s) => `<g transform="translate(${x} 300) scale(${s})" stroke="${INK}" stroke-width="3"><rect x="-7" y="-46" width="14" height="48" rx="3" fill="#A16207"/><circle cx="0" cy="-70" r="34" fill="#22C55E"/><circle cx="-22" cy="-52" r="22" fill="#16A34A"/><circle cx="22" cy="-54" r="22" fill="#16A34A"/></g>`;
const cloud = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" stroke="${INK}" stroke-width="2.5"><path d="M-40 10 Q-44 -12 -22 -12 Q-16 -32 6 -26 Q22 -36 32 -16 Q50 -14 44 10 Z"/></g>`;
const SCENE = `<svg class="eg-bg" viewBox="0 0 1200 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <circle cx="1080" cy="70" r="38" fill="#FDE047" stroke="${INK}" stroke-width="3"/>
  ${cloud(170, 70, 1.2)}${cloud(620, 46, 0.9)}${cloud(900, 110, 1)}
  <path d="M0 250 Q200 190 420 236 T840 226 T1200 220 V320 H0Z" fill="#86EFAC" stroke="${INK}" stroke-width="3"/>
  <path d="M0 282 Q300 250 600 276 T1200 268 V320 H0Z" fill="#4ADE80" stroke="${INK}" stroke-width="3"/>
  ${tree(80, 1)}${tree(1130, 1.15)}${tree(1010, 0.75)}
  <g stroke="${INK}" stroke-width="2.5" fill="#FEF3C7">${Array.from({ length: 7 }, (_, i) => `<rect x="${180 + i * 34}" y="262" width="14" height="40" rx="3"/>`).join('')}<rect x="172" y="272" width="236" height="8" rx="3"/></g>
</svg>`;
