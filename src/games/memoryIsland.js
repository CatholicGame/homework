/**
 * 🏝️ Đảo Trí Nhớ: trò chơi trí nhớ ôn kiến thức Toán (docs/thiet-ke-tro-choi-tri-nho.md).
 * Giai đoạn 1: trạm 🃏 Bãi Lật Thẻ, kho thẻ lớp 3.
 *
 * Flow (§3, §4): Túi thẻ (chọn chủ đề / lối tắt) → thẻ giới thiệu (cấp, cách chơi) → ván → Ôn nhanh → tổng kết.
 * Sao: một khoá mỗi chủ đề 'memory3:flip-<chủ đề>' (nhận lần đầu chơi xong ván có chủ đề đó, mỗi ván tối đa một khoá).
 * Dữ liệu riêng của trò: memoryIsland/store.js.
 */

import { topicsFor, factGrade } from './memoryIsland/facts/index.js';
import { pickFacts, pickTraps } from './memoryIsland/pick.js';
import { load, recordFlipRound, saveLast, weakness } from './memoryIsland/store.js';
import { mountFlip, FLIP_LEVELS } from './memoryIsland/stations/flip.js';
import { beachBackdrop } from './memoryIsland/art.js';
import { injectMemoryStyles } from './memoryIsland/styles.js';
import { makeRng } from './grade3Games/loop.js';
import { awardStars, hasEarned } from '../engine/stars.js';
import { scopedKey } from '../engine/auth.js';
import { getProfileGrade } from '../engine/profile.js';
import { say, stopSpeaking, sfx } from './preschool/fx.js';

// Tiến độ sách (chỉ để hiện ✓ và sắp thứ tự, không khoá): mã sách → khoá lưu.
const BOOK_PROGRESS = { 'grade3-workbook': 'gw-progress-v1', 'grade3-workbook-2': 'gw2-progress-v1' };
const BOOK_PART = { 'grade3-workbook': 'Tập Một', 'grade3-workbook-2': 'Tập Hai' };

function doneLessons() {
  const done = new Set();
  for (const [book, key] of Object.entries(BOOK_PROGRESS)) {
    let data = {};
    try { data = JSON.parse(localStorage.getItem(scopedKey(key))) || {}; } catch { /* storage unavailable */ }
    for (const [unit, recs] of Object.entries(data)) {
      if (Object.values(recs || {}).some((r) => (r?.attempts || 0) > 0)) done.add(`${book}:${unit}`);
    }
  }
  return done;
}

const lessonList = (topic) => Object.entries(topic.lessons || {}).flatMap(([book, ids]) => ids.map((id) => ({ book, id, n: Number(id.match(/\d+$/)?.[0]) })));
const topicDone = (topic, done) => lessonList(topic).some((l) => done.has(`${l.book}:${l.id}`));

/** "Bài 10, 31 (Tập Một), Bài 47 (Tập Hai)" */
function lessonsText(topics, filter = null) {
  const byBook = {};
  for (const t of topics) for (const l of lessonList(t)) if (!filter || filter(l)) (byBook[l.book] ||= new Set()).add(l.n);
  const books = Object.keys(byBook);
  return books.map((b) => `Bài ${[...byBook[b]].sort((x, y) => x - y).join(', ')}${books.length > 1 ? ` (${BOOK_PART[b]})` : ''}`).join(', ');
}

const starKey = (grade, topic) => `memory${grade}:flip-${topic.id}`;

export function render(app, onBack, opts = {}) {
  injectMemoryStyles();
  const grade = factGrade(getProfileGrade() || 3);
  const topics = topicsFor(grade);
  const state = { picked: new Set(load().last?.topics?.filter((id) => topics.some((t) => t.id === id)) || []), pool: null, label: '', level: null };

  // ── 🎒 Túi thẻ (§4.1) ──
  function showBag() {
    stopSpeaking();
    const done = doneLessons();
    const stats = load().facts;
    const allFacts = topics.flatMap((t) => t.facts);
    const weakFacts = allFacts.filter((f) => weakness(stats[f.uid]) > 0);
    const doneTopics = topics.filter((t) => topicDone(t, done));
    const latest = doneTopics.slice().sort((a, b) => maxLesson(b) - maxLesson(a))[0] || null;
    app.innerHTML = `
      <div class="mi-menu">
        <div class="mi-menu-scene">${beachBackdrop()}</div>
        <div class="mi-menu-top">
          <button type="button" class="g3g-icon-btn" data-act="back" aria-label="Quay lại">‹</button>
          <div class="mi-menu-title"><h1>🏝️ Đảo Trí Nhớ</h1><p>🃏 Bãi Lật Thẻ · Lớp ${grade}: chọn thẻ để ôn</p></div>
        </div>
        <div class="mi-menu-mid"><div class="mi-menu-body">
          <section class="mi-panel">
            <h2>Chơi nhanh</h2>
            <div class="mi-quick">
              <button type="button" class="mi-quick-btn" data-quick="mix" style="--bg:linear-gradient(160deg,#38BDF8,#0284C7);--sh:#075985">
                <span class="mi-quick-ic">🔀</span><span><b>Trộn bài đã học</b><small>${doneTopics.length >= 2 ? `${doneTopics.length} chủ đề em đã làm` : 'Các chủ đề đầu sách'}</small></span>
              </button>
              <button type="button" class="mi-quick-btn" data-quick="weak" style="--bg:linear-gradient(160deg,#FB7185,#E11D48);--sh:#9F1239" ${weakFacts.length >= 3 ? '' : 'disabled'}>
                <span class="mi-quick-ic">🎯</span><span><b>Chỗ em hay quên</b><small>${weakFacts.length >= 3 ? `${weakFacts.length} thẻ cần ôn` : 'Chưa có thẻ nào cần ôn'}</small></span>
              </button>
              <button type="button" class="mi-quick-btn" data-quick="latest" style="--bg:linear-gradient(160deg,#4ADE80,#16A34A);--sh:#166534" ${latest ? '' : 'disabled'}>
                <span class="mi-quick-ic">📖</span><span><b>Bài vừa học</b><small>${latest ? `${lessonsText([latest])}: ${latest.title}` : 'Em chưa làm Bài nào'}</small></span>
              </button>
            </div>
          </section>
          <section class="mi-panel">
            <h2>Hoặc chọn chủ đề (chọn được nhiều để trộn)</h2>
            <div class="mi-topics">
              ${topics.map((t) => `
                <button type="button" class="mi-topic" data-topic="${t.id}" aria-pressed="${state.picked.has(t.id)}" style="--tc:${t.color}">
                  <span class="mi-topic-check">✓</span>
                  <span class="mi-tp-ic">${t.icon}</span>
                  <b>${t.title}</b>
                  <small>${t.sub}</small>
                  <small class="${topicDone(t, done) ? 'mi-topic-done' : ''}">${lessonsText([t])}${topicDone(t, done) ? ' ✓' : ''}</small>
                </button>`).join('')}
            </div>
          </section>
        </div></div>
        <div class="mi-bar">
          <span class="mi-bar-text" data-picked></span>
          <button type="button" class="g3g-btn g3g-btn-primary" data-act="go">▶ Chơi</button>
        </div>
      </div>`;
    const goBtn = app.querySelector('[data-act="go"]');
    const pickedText = app.querySelector('[data-picked]');
    const sync = () => {
      const list = topics.filter((t) => state.picked.has(t.id));
      pickedText.textContent = list.length ? `Đã chọn: ${list.map((t) => `${t.icon} ${t.title}`).join(' · ')}` : 'Chọn ít nhất một chủ đề';
      goBtn.disabled = !list.length;
    };
    sync();
    app.querySelector('[data-act="back"]').onclick = () => { stopSpeaking(); onBack(); };
    app.querySelectorAll('[data-topic]').forEach((b) => {
      b.onclick = () => {
        sfx.tap();
        const id = b.dataset.topic;
        if (state.picked.has(id)) state.picked.delete(id); else state.picked.add(id);
        b.setAttribute('aria-pressed', String(state.picked.has(id)));
        sync();
      };
    });
    goBtn.onclick = () => {
      const list = topics.filter((t) => state.picked.has(t.id));
      if (!list.length) return;
      choose(list.flatMap((t) => t.facts), list);
    };
    app.querySelectorAll('[data-quick]').forEach((b) => {
      b.onclick = () => {
        const q = b.dataset.quick;
        if (q === 'mix') {
          // Ít hơn 2 chủ đề đã làm: thêm các chủ đề đầu sách cho đủ 3.
          const list = doneTopics.length >= 2 ? doneTopics : [...doneTopics, ...topics.filter((t) => !doneTopics.includes(t))].slice(0, 3);
          choose(list.flatMap((t) => t.facts), list, '🔀 Trộn bài đã học');
        } else if (q === 'weak') {
          choose(weakFacts, [...new Set(weakFacts.map((f) => f.topic))], '🎯 Chỗ em hay quên');
        } else if (q === 'latest' && latest) {
          state.picked = new Set([latest.id]);
          choose(latest.facts, [latest]);
        }
      };
    });
    app.scrollTop = 0;
    fitZoom();
  }
  const maxLesson = (t) => Math.max(...lessonList(t).map((l) => l.n));

  function choose(pool, list, label = '') {
    sfx.tap();
    state.pool = pool;
    state.topics = list;
    state.label = label || list.map((t) => t.title).join(', ');
    if (!label) saveLast({ topics: list.map((t) => t.id), level: state.level });
    showIntro();
  }

  // ── thẻ giới thiệu (§3.3) ──
  function showIntro() {
    const done = doneLessons();
    const list = state.topics;
    const doneText = lessonsText(list, (l) => done.has(`${l.book}:${l.id}`));
    const best = load().best;
    if (state.level == null) state.level = load().last?.level ?? 0;
    app.innerHTML = `
      <div class="mi-menu">
        <div class="mi-menu-scene">${beachBackdrop()}</div>
        <div class="mi-menu-top">
          <button type="button" class="g3g-icon-btn" data-act="back" aria-label="Đổi thẻ">‹</button>
          <div class="mi-menu-title"><h1>🃏 Bãi Lật Thẻ</h1><p>${state.label}</p></div>
        </div>
        <div class="mi-menu-mid"><div class="mi-menu-body mi-intro">
          <section class="mi-panel">
            <div class="mi-intro-chips">${list.map((t) => `<span class="mi-chip" style="--tc:${t.color}">${t.icon} ${t.title}</span>`).join('')}</div>
            <p class="mi-intro-fit">Phù hợp nếu em đã học ${lessonsText(list)}</p>
            ${doneText ? `<p class="mi-intro-done">✓ Em đã làm ${doneText}</p>` : ''}
          </section>
          <section class="mi-panel mi-how-panel">
            <div class="mi-how" aria-label="Cách chơi">
              <div class="mi-how-step"><div class="mi-how-pic"><span class="mi-mini mi-mini-back"></span><span class="mi-mini mi-mini-ask">7×8</span></div>Lật 2 thẻ</div>
              <span class="mi-how-arrow">›</span>
              <div class="mi-how-step"><div class="mi-how-pic"><span class="mi-mini mi-mini-ask">7×8</span><b>=</b><span class="mi-mini mi-mini-ans">56</span></div>Bằng nhau thì bay lên dây</div>
              <span class="mi-how-arrow">›</span>
              <div class="mi-how-step"><div class="mi-how-pic"><span class="mi-mini-strip">7 × 8 = 56</span></div>Hết thẻ, ôn nhanh 3 câu</div>
            </div>
          </section>
          <section class="mi-panel">
            <div class="mi-levels">
              ${FLIP_LEVELS.map((lv) => {
                const b = best[bestKey(lv)];
                return `<button type="button" class="mi-level" data-lv="${lv.id}" aria-pressed="${state.level === lv.id}">
                  <span class="mi-level-ic">${lv.icon}</span><b>${lv.title}</b><small>${lv.desc}</small>${b != null ? `<em>🏆 ${b} lần lật</em>` : ''}
                </button>`;
              }).join('')}
            </div>
          </section>
        </div></div>
        <div class="mi-bar">
          <button type="button" class="g3g-btn g3g-btn-ghost" data-act="bag">🎒 Đổi thẻ</button>
          <button type="button" class="g3g-btn g3g-btn-primary g3g-btn-big" data-act="play">▶ Chơi</button>
        </div>
      </div>`;
    app.querySelector('[data-act="back"]').onclick = showBag;
    app.querySelector('[data-act="bag"]').onclick = showBag;
    app.querySelectorAll('[data-lv]').forEach((b) => {
      b.onclick = () => {
        sfx.tap();
        state.level = +b.dataset.lv;
        app.querySelectorAll('[data-lv]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      };
    });
    app.querySelector('[data-act="play"]').onclick = () => startRound();
    say('Bãi Lật Thẻ. Lật hai thẻ bằng nhau!');
    app.scrollTop = 0;
    fitZoom();
  }

  // Màn menu to theo màn hình: phóng (zoom) cho nội dung vừa chiều cao còn lại, tối đa 1,7 lần (máy chiếu, máy tính bảng).
  function fitZoom() {
    const menu = app.querySelector('.mi-menu');
    const body = menu?.querySelector('.mi-menu-body');
    if (!body) return;
    const apply = () => {
      if (!body.isConnected) { window.removeEventListener('resize', apply); return; }
      let z = 1;
      for (let k = 0; k < 3; k++) { // bề rộng đổi theo zoom (chữ xuống dòng khác) nên tính lại vài lần
        menu.style.setProperty('--z', String(z));
        const top = menu.querySelector('.mi-menu-top').getBoundingClientRect().height;
        const bar = menu.querySelector('.mi-bar').getBoundingClientRect().height;
        const avail = window.innerHeight - top - bar - 8;
        const h = body.getBoundingClientRect().height; // cỡ thật trên màn (đã nhân zoom)
        z = Math.max(1, Math.min(1.7, z * (avail / h)));
      }
      menu.style.setProperty('--z', z.toFixed(3));
    };
    apply();
    window.addEventListener('resize', apply);
  }

  const bestKey = (lv) => `flip:${state.label.startsWith('🎯') ? 'weak' : state.topics.map((t) => t.id).sort().join('+')}:${lv.id}`;

  // ── ván chơi ──
  function startRound() {
    stopSpeaking();
    const level = FLIP_LEVELS[state.level] || FLIP_LEVELS[0];
    if (!state.label.startsWith('🎯') && !state.label.startsWith('🔀')) saveLast({ topics: state.topics.map((t) => t.id), level: level.id });
    else { const last = load().last || {}; saveLast({ ...last, level: level.id }); }
    const seed = (Date.now() ^ Math.floor(Math.random() * 1e9)) >>> 0;
    if (import.meta.env.DEV) console.info(`[memory] flip lv${level.id} seed=${seed}`);
    const rng = makeRng(seed);
    const stats = load().facts;
    const facts = pickFacts(state.pool, level.pairs, rng, stats);
    const traps = level.traps ? pickTraps(facts, level.traps, rng) : [];
    const harder = FLIP_LEVELS[level.id + 1];
    mountFlip(app, {
      facts, traps, level, rng, title: state.label,
      onQuit: showIntro,
      onAgain: startRound,
      onBag: showBag,
      onHarder: harder ? () => { state.level = harder.id; startRound(); } : null,
      onDone({ flips, quiz, miss, seen }) {
        const rec = recordFlipRound({ seen, miss, quiz, flips, bestKey: bestKey(level) });
        // Mỗi ván tối đa một khoá sao: chủ đề đầu tiên (trong ván) chưa nhận sao.
        let gotStars = 0;
        const roundTopics = [...new Set(facts.map((f) => f.topic))];
        const key = roundTopics.map((t) => starKey(grade, t)).find((k) => !hasEarned(k));
        if (key) gotStars = awardStars(key, null);
        return { ...rec, gotStars };
      },
    });
  }

  // Trang thử (scripts/games-preview.html?book=memoryIsland.js&open=play:g3-t7,g3-g:1) mở thẳng một ván.
  const open = opts.open || '';
  if (open.startsWith('play:') || open.startsWith('intro:')) {
    const [, ids, lv] = open.split(':');
    const list = ids.split(',').map((id) => topics.find((t) => t.id === id)).filter(Boolean);
    state.pool = list.flatMap((t) => t.facts);
    state.topics = list;
    state.label = list.map((t) => t.title).join(', ');
    state.level = +(lv || 0);
    if (open.startsWith('play:')) startRound(); else showIntro();
  } else {
    showBag();
  }
}
