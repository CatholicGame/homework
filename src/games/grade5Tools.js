/**
 * 🧰 Toán 5: Học bằng công cụ (Tập Một, SGK Kết nối tri thức). Thiết kế + tổng hợp kiến thức: docs/lop_5/thiet-ke-cong-cu-tap1.md.
 * Danh sách 6 chủ đề, Bài 1–35 → mỗi bài: ① Khám phá (thầy hướng dẫn từng bước trên công cụ, không chấm)
 * và ② Thực hành (5 câu, sao 'tool5:bai-N'). Bài Luyện tập chung / Ôn tập chỉ có Thực hành (trộn các bài).
 * Dùng lại khung của Toán 4 (grade4Tools/frame.js, practice.js) với sách riêng: bàn phím có dấu phẩy.
 */

import { TOPICS, TOOLS, lessonByN, pagesText } from './grade5Tools/catalog.js';
import { exploreOf, tasksOf } from './grade5Tools/lessons/index.js';
import { mountToolSearch } from './grade4Tools/search.js';
import { runExplore, loadSeen } from './grade4Tools/frame.js';
import { practiceGame } from './grade4Tools/practice.js';
import { playRound } from './grade3Games/loop.js';
import { injectGameStyles, menuBackdrop, fitMenu } from './grade3Games/styles.js';
import { preloadNpcs } from './grade3Games/npc.js';
import { getTotalStars, hasEarned } from '../engine/stars.js';
import { css } from './grade4Tools/frame.js';

/** Sách cho phần Thực hành chung (practice.js): sao 'tool5', bàn phím có dấu phẩy. */
export const BOOK5 = { label: 'Toán 5', lessonByN, pagesText, starPrefix: 'tool5', idPrefix: 'g5', comma: true };
/** Khoá "đã khám phá" (chung kho với Toán 4, tiền tố riêng). */
const seenId = (l) => `g5-${l.id}`;

const toolIcons = (l) => (l.tools.length ? l.tools.map(k => TOOLS[k].icon).join('') : '📝');

export function render(app, onBack, { open } = {}) {
  injectGameStyles();
  injectHubStyles();
  preloadNpcs();
  let lastN = null;
  const search = { q: '' }; // 🔎 chữ đang tìm, giữ khi vào bài rồi quay lại

  function shell(inner) {
    app.innerHTML = `<div class="g3g-wrap g3g-menu g4h g5h" data-zmax="1.4">${menuBackdrop()}<div class="g3g-screen animate-fadeIn">${inner}</div></div>`;
    fitMenu(app);
  }
  const topbar = (title, kicker) => `
    <div class="g3g-top">
      <button type="button" class="g3g-round-btn" data-act="back" aria-label="Quay lại">←</button>
      <div class="g3g-title"><span class="g3g-kicker">${kicker}</span><h1>${title}</h1></div>
      <span class="g3g-stars">⭐ ${getTotalStars()}</span>
    </div>`;

  function showList() {
    const seen = loadSeen();
    shell(`
      ${topbar('Học bằng công cụ', '🧰 Toán 5 · Tập Một')}
      <p class="g3g-lead">Mỗi bài có công cụ để em tự tay thử: băng phân số, lưới 100 ô, bảng đơn vị, đặt tính số thập phân, cắt ghép hình… Khám phá trước, rồi thực hành.</p>
      ${TOPICS.map(t => `
        <section class="g4h-topic">
          <h2 class="g4h-th"><span class="g4h-tn">Chủ đề ${t.num}</span>${t.title}</h2>
          <div class="g4h-list">
            ${t.lessons.map(l => {
              const ready = !!exploreOf(l.n) || tasksOf(l.n).length > 0;
              const star = hasEarned(`tool5:${l.id}`);
              return `<button type="button" class="g4h-tile ${ready ? '' : 'g4h-soon'}" data-n="${l.n}" ${ready ? '' : 'disabled'}>
                <span class="g4h-num">Bài ${l.n}<small>tr. ${lessonByN(l.n).pages[0]}</small></span>
                <span class="g4h-info"><strong>${l.title}</strong>
                  <span class="g4h-tools">${l.tools.length ? l.tools.map(k => `<i>${TOOLS[k].icon} ${TOOLS[k].name}</i>`).join('') : '<i>📝 Trộn các bài đã học</i>'}</span></span>
                <span class="g4h-badges">${ready ? `${seen[seenId(l)] ? '<b title="Đã khám phá">🔎✓</b>' : ''}${star ? '<b title="Đã thực hành">⭐</b>' : ''}` : '<em>Sắp có</em>'}</span>
              </button>`;
            }).join('')}
          </div>
        </section>`).join('')}`);
    app.querySelector('[data-act="back"]').onclick = onBack;
    app.querySelectorAll('.g4h-tile[data-n]').forEach(b => { b.onclick = () => showLesson(lessonByN(+b.dataset.n)); });
    mountToolSearch(app, { TOPICS, TOOLS, lessonByN, exploreOf, tasksOf }, search);
    if (lastN) app.querySelector(`.g4h-tile[data-n="${lastN}"]`)?.scrollIntoView({ block: 'center' });
  }

  function showLesson(l) {
    lastN = l.n;
    const ex = exploreOf(l.n);
    const tasks = tasksOf(l.n);
    const seen = loadSeen()[seenId(l)];
    shell(`
      ${topbar(`Bài ${l.n}`, `🧰 Toán 5 · Chủ đề ${l.topic}`)}
      <div class="g3g-card g4h-lesson">
        <div class="g4h-icon">${toolIcons(l)}</div>
        <h2 class="g4h-title">${l.title}</h2>
        <div class="g4h-tools g4h-tools-c">${l.tools.length ? l.tools.map(k => `<i>${TOOLS[k].icon} ${TOOLS[k].name}</i>`).join('') : '<i>📝 Luyện tập: trộn các bài đã học</i>'}</div>
        <div class="g4h-sgk">📖 SGK Toán 5 Tập Một, ${pagesText(l)}</div>
        ${l.mix ? `<div class="g4h-mix"><span>Kiến thức ở các bài:</span>${l.mix.map(k => { const m = lessonByN(k); return `<i><b>Bài ${m.n}</b> ${m.title} · tr. ${m.pages[0]}</i>`; }).join('')}</div>` : ''}
        <div class="g4h-go">
          ${ex ? `<button type="button" class="g4h-big g4h-ex" data-act="explore"><span class="g4h-big-i">🔎</span><span><strong>Khám phá</strong><small>Thầy hướng dẫn từng bước, em tự tay làm trên công cụ${seen ? ' · ✓ đã xem' : ''}</small></span></button>` : ''}
          ${tasks.length ? `<button type="button" class="g4h-big g4h-pr" data-act="practice"><span class="g4h-big-i">✏️</span><span><strong>Thực hành</strong><small>5 câu, mỗi lần số mới${hasEarned(`tool5:${l.id}`) ? ' · ⭐ đã nhận sao' : ''}</small></span></button>` : ''}
        </div>
      </div>`);
    app.querySelector('[data-act="back"]').onclick = showList;
    app.querySelector('[data-act="explore"]')?.addEventListener('click', () => startExplore(l));
    app.querySelector('[data-act="practice"]')?.addEventListener('click', () => startPractice(l));
  }

  function startExplore(l) {
    const ex = exploreOf(l.n);
    runExplore(app, {
      id: seenId(l), title: `Bài ${l.n}: ${l.title} <small class="g4h-ref">📖 SGK ${pagesText(l)}</small>`, setup: ex.setup, steps: ex.steps,
      onExit: () => showLesson(l),
      onPractice: tasksOf(l.n).length ? () => startPractice(l) : null,
    });
  }

  function startPractice(l) {
    const game = practiceGame(l, tasksOf(l.n), BOOK5);
    playRound(app, { game, level: game.levels[0], onExit: () => showLesson(l), onNextLevel: null });
  }

  const start = open && lessonByN(+String(open).replace(/\D/g, ''));
  if (start) showLesson(start); else showList();
}

/** Bài n có phần Khám phá không (nút "🔎 Khám phá" trên bài tập của sách khác). */
export const hasExplore = (n) => !!exploreOf(n);
export const exploreTitle = (n) => lessonByN(n)?.title || '';

/**
 * Chạy Khám phá của Bài n trong một khung bất kì (lớp phủ trên bài tập của sách khác, vd. SGK Toán 4 cũ).
 * onExit(): bé bấm ✕ → đóng lớp phủ, quay lại đúng câu đang làm. Không có nút sang Thực hành.
 */
export function exploreIn(host, n, onExit) {
  const l = lessonByN(n);
  const ex = exploreOf(n);
  if (!l || !ex) return false;
  injectGameStyles();
  injectHubStyles();
  preloadNpcs();
  runExplore(host, {
    id: seenId(l), title: `Bài ${l.n}: ${l.title} <small class="g4h-ref">📖 SGK ${pagesText(l)}</small>`, setup: ex.setup, steps: ex.steps,
    onExit, onPractice: null,
  });
  return true;
}

function injectHubStyles() {
  css('g4-hub', `
    .g4h-topic { margin: 1.1rem 0 0.4rem; }
    .g4h-th { display: flex; align-items: center; gap: 0.6rem; font-size: 1.25rem; font-weight: 800; color: #1E3A5F; margin: 0 0 0.6rem; }
    .g4h-tn { background: #F97316; color: #fff; border-radius: 999px; padding: 0.1rem 0.75rem; font-size: 0.95rem; box-shadow: 0 3px 0 #C2410C; white-space: nowrap; }
    .g4h-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr)); gap: 0.7rem 0.9rem; }
    .g4h-tile { display: flex; align-items: center; gap: 0.7rem; text-align: left; background: #fff; border: 3px solid #fff; border-radius: 1.2rem; padding: 0.65rem 0.8rem; cursor: pointer; font-family: inherit;
      box-shadow: 0 6px 0 #BAE6FD, 0 10px 18px rgba(2,132,199,0.12); transition: transform .12s, box-shadow .12s, border-color .15s; }
    .g4h-tile:hover { border-color: #7DD3FC; transform: translateY(-2px); }
    .g4h-tile:active { transform: translateY(4px); box-shadow: 0 2px 0 #BAE6FD; }
    .g4h-num { flex: none; background: #0EA5E9; color: #fff; font-weight: 800; border-radius: 0.8rem; padding: 0.3rem 0.5rem; font-size: 0.95rem; box-shadow: 0 3px 0 #0369A1; min-width: 3.6rem; text-align: center; }
    .g4h-num small { display: block; font-size: 0.72rem; font-weight: 700; opacity: 0.9; line-height: 1.1; }
    .g4h-sgk { font-weight: 800; color: #7C2D12; background: #FFEDD5; border-radius: 999px; padding: 0.15rem 0.9rem; font-size: 1rem; }
    .g4h-mix { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.35rem; max-width: 46rem; }
    .g4h-mix span { flex: 1 1 100%; font-weight: 700; color: #475569; font-size: 0.95rem; }
    .g4h-mix i { font-style: normal; font-weight: 600; font-size: 0.88rem; color: #334155; background: #F1F5F9; border-radius: 0.6rem; padding: 0.1rem 0.55rem; }
    .g4h-mix b { color: #C2410C; }
    .g4h-ref { font-size: 0.7em; font-weight: 700; color: #9A3412; background: #FFEDD5; border-radius: 999px; padding: 0.05em 0.6em; margin-left: 0.3em; white-space: nowrap; }
    .g4h-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.2rem; }
    .g4h-info strong { color: #1E293B; font-size: 1.08rem; line-height: 1.25; }
    .g4h-tools { display: flex; flex-wrap: wrap; gap: 0.3rem; }
    .g4h-tools i { font-style: normal; font-weight: 700; font-size: 0.85rem; color: #0F766E; background: #CCFBF1; border-radius: 999px; padding: 0.05rem 0.55rem; }
    .g4h-badges { flex: none; display: flex; gap: 0.2rem; font-size: 1.05rem; }
    .g4h-badges b { font-weight: 800; color: #15803D; }
    .g4h-badges em { font-style: normal; font-size: 0.8rem; color: #94A3B8; font-weight: 700; }
    .g4h-soon { opacity: 0.55; cursor: default; box-shadow: 0 6px 0 #E2E8F0; }
    .g4h-soon:hover { transform: none; border-color: #fff; }
    .g4h-lesson { margin: 1rem auto 0; text-align: center; display: flex; flex-direction: column; gap: 0.8rem; align-items: center; }
    .g4h-icon { font-size: 2.6rem; line-height: 1; }
    .g4h-title { font-size: 1.6rem; font-weight: 800; color: #1E3A5F; line-height: 1.25; margin: 0; }
    .g4h-tools-c { justify-content: center; }
    .g4h-go { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 0.9rem; width: 100%; margin-top: 0.4rem; }
    .g4h-big { display: flex; align-items: center; gap: 0.9rem; text-align: left; border: 4px solid #fff; border-radius: 1.3rem; padding: 0.8rem 1rem; cursor: pointer; font-family: inherit; color: #fff; }
    .g4h-big:active { transform: translateY(4px); }
    .g4h-big strong { display: block; font-size: 1.6rem; line-height: 1.1; text-shadow: 0 2px 0 rgba(0,0,0,0.2); }
    .g4h-big small { display: block; font-size: 1rem; font-weight: 700; opacity: 0.95; line-height: 1.3; }
    .g4h-big-i { font-size: 2.6rem; line-height: 1; }
    .g4h-ex { background: linear-gradient(180deg, #38BDF8, #0EA5E9); box-shadow: 0 6px 0 #0369A1, 0 10px 18px rgba(3,105,161,0.25); }
    .g4h-pr { background: linear-gradient(180deg, #4ADE80, #22C55E); box-shadow: 0 6px 0 #15803D, 0 10px 18px rgba(21,128,61,0.25); }
  `);
}
