/**
 * 🧰 Tiếng Việt 3: Công cụ (Tập Một, SGK Kết nối tri thức). Thiết kế: docs/lop_3/sgk_tv3_tap1/thiet-ke-cong-cu.md.
 * Màn danh sách dùng chung cho mọi sách (toolsRender(book)); Tiếng Việt 2: tv2Tools.js.
 * Danh sách 4 chủ điểm, Bài 1–32 + 2 bài ôn tập → mỗi bài: 📘 Ghi nhớ (khung kiến thức của sách, thầy đọc)
 * và ✏️ Luyện tập (8 câu trộn các công cụ của bài, sao 'tvtool3:bai-N').
 * Dải 🧰 Công cụ: luyện riêng một kĩ năng (từ chỉ sự vật / hoạt động / đặc điểm, kiểu câu, dấu câu, so sánh…)
 * với từ ngữ của mọi bài, mỗi lượt đề mới (sao 'tvtool3:tool-…').
 */

import { TV3 } from './tv3Tools/catalog.js';
import { pagesText } from './tv3Tools/book.js';
import { SKILLS, skillsOf, notesOf, poolOf } from './tv3Tools/skills.js';
import { lessonGame, skillGame } from './tv3Tools/game.js';
import { playRound } from './grade3Games/loop.js';
import { injectGameStyles, menuBackdrop, fitMenu } from './grade3Games/styles.js';
import { preloadNpcs } from './grade3Games/npc.js';
import { getTotalStars, hasEarned } from '../engine/stars.js';
import { say, stopSpeaking } from './preschool/fx.js';

export const toolsRender = (book) => function render(app, onBack, { open } = {}) {
  const { TOPICS, lessonByN, prefix } = book;
  // dải 🧰 chỉ hiện công cụ sách có dữ liệu (lớp 2 không có so sánh, dấu hai chấm…)
  const all = poolOf(book.LESSONS, { bank: book.bank });
  const tools = Object.entries(SKILLS).filter(([, s]) => !s.hidden && s.has(all));
  app.setAttribute('data-no-i18n', '');
  injectGameStyles();
  injectHubStyles();
  preloadNpcs();
  let lastN = null;

  function shell(inner) {
    stopSpeaking();
    app.innerHTML = `<div class="g3g-wrap g3g-menu tth" data-zmax="1.4">${menuBackdrop()}<div class="g3g-screen animate-fadeIn">${inner}</div></div>`;
    fitMenu(app);
  }
  const topbar = (title, kicker) => `
    <div class="g3g-top">
      <button type="button" class="g3g-round-btn" data-act="back" aria-label="Quay lại">←</button>
      <div class="g3g-title"><span class="g3g-kicker">${kicker}</span><h1>${title}</h1></div>
      <span class="g3g-stars">⭐ ${getTotalStars()}</span>
    </div>`;
  const chips = (keys) => keys.map(k => `<i>${SKILLS[k].icon} ${SKILLS[k].name}</i>`).join('');

  function showList() {
    shell(`
      ${topbar('Công cụ Tiếng Việt', `${book.kicker} · Tập Một`)}
      <p class="g3g-lead">Mỗi bài trong sách có công cụ để em luyện: xếp từ vào giỏ, tìm từ trong câu, ghép câu, chọn dấu câu… Mỗi lượt là đề mới.</p>
      <section class="tth-tools">
        <h2 class="tth-th"><span class="tth-tn">🧰</span>Luyện theo công cụ</h2>
        <div class="tth-tgrid">
          ${tools.map(([k, s]) => `
            <button type="button" class="tth-tool" data-skill="${k}" style="--c:${s.color}">
              <span class="tth-ti">${s.icon}</span><span><strong>${s.name}</strong><small>${book.desc?.[k] || s.desc}</small></span>
              ${hasEarned(`${prefix}:tool-${k}`) ? '<b>⭐</b>' : ''}
            </button>`).join('')}
        </div>
      </section>
      ${TOPICS.map(t => `
        <section class="tth-topic">
          <h2 class="tth-th"><span class="tth-tn">${t.short}</span>${t.title}</h2>
          <div class="tth-list">
            ${t.lessons.map(l => {
              const sk = skillsOf(l);
              return `<button type="button" class="tth-tile" data-n="${l.n}" ${sk.length ? '' : 'disabled'}>
                <span class="tth-num">${l.mix ? 'Ôn tập' : `Bài ${l.n}`}<small>tr. ${l.pages[0]}</small></span>
                <span class="tth-info"><strong>${l.title}</strong><span class="tth-chips">${chips(sk)}</span></span>
                <span class="tth-badges">${hasEarned(`${prefix}:${l.id}`) ? '<b title="Đã luyện tập">⭐</b>' : ''}</span>
              </button>`;
            }).join('')}
          </div>
        </section>`).join('')}`);
    app.querySelector('[data-act="back"]').onclick = onBack;
    app.querySelectorAll('.tth-tile[data-n]').forEach(b => { b.onclick = () => showLesson(lessonByN(b.dataset.n)); });
    app.querySelectorAll('.tth-tool').forEach(b => { b.onclick = () => startSkill(b.dataset.skill, null, showList); });
    if (lastN) app.querySelector(`.tth-tile[data-n="${lastN}"]`)?.scrollIntoView({ block: 'center' });
  }

  function showLesson(l) {
    lastN = l.n;
    const sk = skillsOf(l);
    const notes = notesOf(l);
    const topic = TOPICS.find(t => t.lessons.includes(l));
    shell(`
      ${topbar(l.mix ? l.title : `Bài ${l.n}: ${l.title}`, `${book.kicker} · ${topic.title}`)}
      <div class="g3g-card tth-lesson">
        <div class="tth-sgk">📖 ${book.source}, ${pagesText(l)}${l.week ? ` · Tuần ${l.week}` : ''}</div>
        ${l.learn ? `<ul class="tth-learn">${l.learn.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}
        <div class="tth-go">
          ${notes.length ? `<button type="button" class="tth-big tth-kn" data-act="notes"><span class="tth-big-i">📘</span><span><strong>Ghi nhớ</strong><small>${notes.length} điều cần nhớ, thầy đọc cho em nghe</small></span></button>` : ''}
          <button type="button" class="tth-big tth-pr" data-act="practice"><span class="tth-big-i">✏️</span><span><strong>Luyện tập</strong><small>8 câu, mỗi lần đề mới${hasEarned(`${prefix}:${l.id}`) ? ' · ⭐ đã nhận sao' : ''}</small></span></button>
        </div>
        <div class="tth-one"><span>Luyện riêng từng công cụ:</span>
          ${sk.map(k => `<button type="button" class="tth-mini" data-skill="${k}" style="--c:${SKILLS[k].color}">${SKILLS[k].icon} ${SKILLS[k].name}</button>`).join('')}
        </div>
      </div>`);
    app.querySelector('[data-act="back"]').onclick = showList;
    app.querySelector('[data-act="notes"]')?.addEventListener('click', () => showNotes(l));
    app.querySelector('[data-act="practice"]').onclick = () => {
      const game = lessonGame(book, l);
      playRound(app, { game, level: game.levels[0], onExit: () => showLesson(l), onNextLevel: null });
    };
    app.querySelectorAll('.tth-mini').forEach(b => { b.onclick = () => startSkill(b.dataset.skill, l, () => showLesson(l)); });
  }

  function showNotes(l) {
    const notes = notesOf(l);
    shell(`
      ${topbar('Ghi nhớ', `📚 ${l.mix ? l.title : `Bài ${l.n}: ${l.title}`}`)}
      <div class="tth-notes">
        ${notes.map((x, i) => `
          <article class="g3g-card tth-note" style="--c:${x.color || '#0EA5E9'}">
            <header><span>${x.icon || '📘'}</span><h3>${x.title}</h3><button type="button" class="tth-say" data-i="${i}" aria-label="Nghe">🔊</button></header>
            <p>${x.text}</p>
            ${x.ex ? `<ul>${x.ex.map(e => `<li>${e}</li>`).join('')}</ul>` : ''}
          </article>`).join('')}
        <button type="button" class="tth-big tth-pr tth-notes-go" data-act="practice"><span class="tth-big-i">✏️</span><span><strong>Luyện tập ngay</strong><small>8 câu</small></span></button>
      </div>`);
    app.querySelector('[data-act="back"]').onclick = () => showLesson(l);
    app.querySelector('[data-act="practice"]').onclick = () => {
      const game = lessonGame(book, l);
      playRound(app, { game, level: game.levels[0], onExit: () => showLesson(l), onNextLevel: null });
    };
    const read = (x) => [x.title, x.text, ...(x.ex || [])].map(s => s.replace(/<[^>]*>/g, '')).join('. ');
    app.querySelectorAll('.tth-say').forEach(b => { b.onclick = () => { stopSpeaking(); say(read(notes[+b.dataset.i])); }; });
  }

  function startSkill(key, lesson, back) {
    const game = skillGame(book, key, lesson);
    playRound(app, { game, level: game.levels[0], onExit: back, onNextLevel: null });
  }

  const start = open && lessonByN(String(open).replace(/^bai-/, ''));
  if (start) showLesson(start); else showList();
};

export const render = toolsRender(TV3);

let hubStyled = false;
function injectHubStyles() {
  if (hubStyled) return;
  hubStyled = true;
  const st = document.createElement('style');
  st.textContent = `
    .tth-topic, .tth-tools { margin: 1.1rem 0 0.4rem; }
    .tth-th { display: flex; align-items: center; gap: 0.6rem; font-size: 1.25rem; font-weight: 800; color: #1E3A5F; margin: 0 0 0.6rem; }
    .tth-tn { background: #16A34A; color: #fff; border-radius: 999px; padding: 0.1rem 0.75rem; font-size: 0.95rem; box-shadow: 0 3px 0 #15803D; white-space: nowrap; }
    .tth-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr)); gap: 0.7rem 0.9rem; }
    .tth-tile { display: flex; align-items: center; gap: 0.7rem; text-align: left; background: #fff; border: 3px solid #fff; border-radius: 1.2rem; padding: 0.65rem 0.8rem; cursor: pointer; font-family: inherit;
      box-shadow: 0 6px 0 #BBF7D0, 0 10px 18px rgba(22,163,74,0.12); transition: transform .12s, border-color .15s; }
    .tth-tile:hover { border-color: #86EFAC; transform: translateY(-2px); }
    .tth-tile:active { transform: translateY(4px); box-shadow: 0 2px 0 #BBF7D0; }
    .tth-tile:disabled { opacity: 0.5; cursor: default; transform: none; }
    .tth-num { flex: none; background: #16A34A; color: #fff; font-weight: 800; border-radius: 0.8rem; padding: 0.3rem 0.5rem; font-size: 0.95rem; box-shadow: 0 3px 0 #166534; min-width: 3.8rem; text-align: center; }
    .tth-num small { display: block; font-size: 0.72rem; font-weight: 700; opacity: 0.9; line-height: 1.1; }
    .tth-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.2rem; }
    .tth-info strong { color: #1E293B; font-size: 1.08rem; line-height: 1.25; }
    .tth-chips { display: flex; flex-wrap: wrap; gap: 0.3rem; }
    .tth-chips i { font-style: normal; font-weight: 700; font-size: 0.82rem; color: #0F766E; background: #CCFBF1; border-radius: 999px; padding: 0.05rem 0.55rem; }
    .tth-badges { flex: none; font-size: 1.1rem; }
    .tth-tgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr)); gap: 0.7rem; }
    .tth-tool { position: relative; display: flex; align-items: center; gap: 0.6rem; text-align: left; border: 3px solid #fff; border-radius: 1.1rem; padding: 0.55rem 0.7rem; cursor: pointer; font-family: inherit;
      background: var(--c); color: #fff; box-shadow: 0 6px 0 color-mix(in srgb, var(--c) 65%, #000); }
    .tth-tool:active { transform: translateY(4px); box-shadow: 0 2px 0 color-mix(in srgb, var(--c) 65%, #000); }
    .tth-ti { font-size: 2rem; line-height: 1; }
    .tth-tool strong { display: block; font-size: 1.08rem; line-height: 1.2; text-shadow: 0 1px 0 rgba(0,0,0,0.25); }
    .tth-tool small { display: block; font-size: 0.82rem; font-weight: 700; opacity: 0.95; line-height: 1.25; }
    .tth-tool b { position: absolute; right: 0.5rem; top: 0.3rem; }
    .tth-lesson { margin: 1rem auto 0; text-align: center; display: flex; flex-direction: column; gap: 0.9rem; align-items: center; }
    .tth-sgk { font-weight: 800; color: #7C2D12; background: #FFEDD5; border-radius: 999px; padding: 0.15rem 0.9rem; font-size: 1rem; }
    .tth-learn { margin: 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; justify-content: center; gap: 0.4rem; }
    .tth-learn li { background: #F1F5F9; border-radius: 0.7rem; padding: 0.15rem 0.7rem; font-weight: 700; color: #334155; }
    .tth-go { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 0.9rem; width: 100%; }
    .tth-big { display: flex; align-items: center; gap: 0.9rem; text-align: left; border: 4px solid #fff; border-radius: 1.3rem; padding: 0.8rem 1rem; cursor: pointer; font-family: inherit; color: #fff; }
    .tth-big:active { transform: translateY(4px); }
    .tth-big strong { display: block; font-size: 1.6rem; line-height: 1.1; text-shadow: 0 2px 0 rgba(0,0,0,0.2); }
    .tth-big small { display: block; font-size: 1rem; font-weight: 700; opacity: 0.95; line-height: 1.3; }
    .tth-big-i { font-size: 2.6rem; line-height: 1; }
    .tth-kn { background: linear-gradient(180deg, #38BDF8, #0EA5E9); box-shadow: 0 6px 0 #0369A1, 0 10px 18px rgba(3,105,161,0.25); }
    .tth-pr { background: linear-gradient(180deg, #4ADE80, #22C55E); box-shadow: 0 6px 0 #15803D, 0 10px 18px rgba(21,128,61,0.25); }
    .tth-one { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.5rem; }
    .tth-one span { flex: 1 1 100%; font-weight: 700; color: #475569; }
    .tth-mini { border: 2px solid #fff; border-radius: 999px; padding: 0.3rem 0.9rem; font-family: inherit; font-weight: 800; font-size: 1rem; color: #fff; cursor: pointer;
      background: var(--c); box-shadow: 0 4px 0 color-mix(in srgb, var(--c) 65%, #000); }
    .tth-mini:active { transform: translateY(3px); box-shadow: 0 1px 0 color-mix(in srgb, var(--c) 65%, #000); }
    .tth-notes { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr)); gap: 0.9rem; margin-top: 1rem; }
    .tth-note { border-top: 0.45rem solid var(--c); text-align: left; padding: 0.9rem 1.1rem; }
    .tth-note header { display: flex; align-items: center; gap: 0.5rem; }
    .tth-note header span { font-size: 1.7rem; }
    .tth-note h3 { flex: 1; margin: 0; font-size: 1.3rem; color: #1E3A5F; line-height: 1.25; }
    .tth-say { border: none; background: #E0F2FE; border-radius: 999px; width: 2.6rem; height: 2.6rem; font-size: 1.3rem; cursor: pointer; }
    .tth-note p { margin: 0.5rem 0; font-size: 1.15rem; line-height: 1.45; color: #1E293B; font-weight: 600; }
    .tth-note b { color: #C2410C; }
    .tth-note ul { margin: 0; padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.25rem; }
    .tth-note li { font-size: 1.08rem; color: #334155; line-height: 1.4; }
    .tth-note u { text-decoration-color: #F97316; text-decoration-thickness: 2px; text-underline-offset: 3px; }
    .tth-notes-go { grid-column: 1 / -1; justify-self: center; }
  `;
  document.head.appendChild(st);
}
