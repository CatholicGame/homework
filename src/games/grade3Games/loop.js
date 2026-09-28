/**
 * Vòng lặp chung của trò chơi tăng cường: một ván = chuỗi nhiệm vụ.
 * Mỗi nhiệm vụ gồm vài thao tác; thao tác nào thất bại thì nhiệm vụ đó thất bại và sang
 * nhiệm vụ tiếp theo (không chấm điểm). Cuối ván tổng kết; chơi lại thì sinh dữ liệu mới.
 *
 * game = {
 *   id, title, icon, unitWord ('khách'),
 *   makeMission(rng, level, history) → mission,
 *   mountMission(stage, mission, level, api)  // api: { succeed(text), fail(text, tip) }
 * }
 */

import { awardStars, recordWrong, hasEarned } from '../../engine/stars.js';
import { say, stopSpeaking, sfx, rain, isMuted, setMuted } from '../preschool/fx.js';
import { menuBackdrop, fitMenu } from './styles.js';

const BEST_KEY = 'g3games-best-v1';

/** RNG có seed (mulberry32) — ghi seed ra console để tái hiện khi cần. */
export function makeRng(seed) {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  next.int = (lo, hi) => lo + Math.floor(next() * (hi - lo + 1));
  next.pick = (arr) => arr[Math.floor(next() * arr.length)];
  next.shuffle = (arr) => {
    const a2 = [...arr];
    for (let i = a2.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [a2[i], a2[j]] = [a2[j], a2[i]]; }
    return a2;
  };
  return next;
}

function loadBest() {
  try { return JSON.parse(localStorage.getItem(BEST_KEY)) || {}; } catch { return {}; }
}
export function bestFor(levelId) {
  return loadBest()[levelId];
}
function saveBest(levelId, ok, total) {
  const all = loadBest();
  const prev = all[levelId];
  if (!prev || ok > prev.ok) {
    all[levelId] = { ok, total };
    try { localStorage.setItem(BEST_KEY, JSON.stringify(all)); } catch { /* storage unavailable */ }
    return !!prev;
  }
  return false;
}

// ── Chế độ chơi: toàn màn hình, xoay ngang trên điện thoại ─────────────────────
// Vào khi bấm "Chơi" (cần thao tác của bé nên gọi ngay trong click). Chỉ thoát toàn màn hình
// nếu chính trò chơi đã bật nó. Android (Chrome) khoá được màn hình ngang khi đang toàn màn hình;
// iPhone không cho khoá → hiện lời nhắc xoay ngang khi cầm dọc.
let enteredFullscreen = false;
const isPhone = () => window.matchMedia?.('(pointer: coarse)').matches && Math.min(screen.width, screen.height) < 600;

function enterGameMode() {
  document.body.classList.add('g3g-playing');
  const el = document.documentElement;
  if (!document.fullscreenElement && el.requestFullscreen) {
    el.requestFullscreen({ navigationUI: 'hide' }).then(() => {
      enteredFullscreen = true;
      if (isPhone()) screen.orientation?.lock?.('landscape').catch(() => {});
    }).catch(() => {});
  } else if (document.fullscreenElement && isPhone()) {
    screen.orientation?.lock?.('landscape').catch(() => {});
  }
}

export function exitGameMode() {
  document.body.classList.remove('g3g-playing');
  try { screen.orientation?.unlock?.(); } catch { /* not supported */ }
  if (enteredFullscreen && document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  enteredFullscreen = false;
}

let rotateDismissed = false;
/** Lớp phủ "Xoay ngang điện thoại" khi điện thoại đang cầm dọc (bé có thể bỏ qua). */
function watchOrientation(root) {
  if (!isPhone()) return;
  const ov = document.createElement('div');
  ov.className = 'g3g-rotate';
  ov.innerHTML = `
    <svg class="g3g-rotate-phone" viewBox="0 0 60 100" aria-hidden="true">
      <rect x="4" y="4" width="52" height="92" rx="9" fill="#334155"/>
      <rect x="9" y="14" width="42" height="68" rx="3" fill="#BAE6FD"/>
      <circle cx="30" cy="89" r="3.5" fill="#94A3B8"/>
      <path d="M22 48 l8 -8 l8 8 M30 40 v20" stroke="#0EA5E9" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="rotate(90 30 50)"/>
    </svg>
    <p>Xoay ngang điện thoại để chơi cho rõ nhé!</p>
    <button type="button" class="g3g-btn g3g-btn-ghost">Chơi màn hình dọc</button>`;
  root.appendChild(ov);
  const sync = () => {
    if (!root.isConnected) { window.removeEventListener('resize', sync); return; } // đã rời màn chơi
    ov.hidden = rotateDismissed || window.innerWidth >= window.innerHeight;
  };
  ov.querySelector('button').onclick = () => { rotateDismissed = true; sync(); };
  window.addEventListener('resize', sync);
  sync();
}

/** Sao của ván: không thất bại → đủ sao của cấp; mỗi nhiệm vụ thất bại bớt 1 (còn ít nhất 1). */
const starKey = (level) => `g3games:${level.id}`;

export function playRound(app, { game, level, onExit, onNextLevel }) {
  const seed = (Date.now() ^ Math.floor(Math.random() * 1e9)) >>> 0;
  if (import.meta.env.DEV) console.info(`[g3games] ${level.id} seed=${seed}`);
  const rng = makeRng(seed);
  const total = level.missions || 5;
  const results = [];
  const history = [];

  enterGameMode();
  app.innerHTML = `
    <div class="g3g-wrap g3g-play">
      <div class="g3g-topbar">
        <button type="button" class="g3g-icon-btn" data-act="quit" aria-label="Thoát">✕</button>
        <div class="g3g-top-title">${game.icon} ${level.title}</div>
        <div class="g3g-dots">${Array.from({ length: total }, (_, i) => `<span class="g3g-dot" data-dot="${i}"></span>`).join('')}</div>
        <button type="button" class="g3g-icon-btn" data-act="mute" aria-label="Bật/tắt tiếng">${isMuted() ? '🔇' : '🔊'}</button>
        ${document.fullscreenEnabled ? `<button type="button" class="g3g-icon-btn" data-act="full" aria-label="Toàn màn hình">⤢</button>` : ''}
      </div>
      <div class="g3g-stage"></div>
    </div>`;
  const play = app.querySelector('.g3g-play');
  const stage = app.querySelector('.g3g-stage');
  watchOrientation(play);
  app.querySelector('[data-act="quit"]').onclick = () => { stopSpeaking(); exitGameMode(); onExit(); };
  const muteBtn = app.querySelector('[data-act="mute"]');
  muteBtn.onclick = () => { setMuted(!isMuted()); muteBtn.textContent = isMuted() ? '🔇' : '🔊'; };
  const fullBtn = app.querySelector('[data-act="full"]');
  if (fullBtn) {
    const syncFull = () => { fullBtn.textContent = document.fullscreenElement ? '⤡' : '⤢'; };
    fullBtn.onclick = () => {
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
      else document.documentElement.requestFullscreen?.().then(() => { enteredFullscreen = true; }).catch(() => {});
    };
    document.addEventListener('fullscreenchange', syncFull);
    syncFull();
  }

  function mark(i, cls) {
    app.querySelectorAll('.g3g-dot').forEach((d, k) => d.classList.toggle('g3g-dot-now', k === i && !cls));
    const dot = cls && app.querySelector(`[data-dot="${i}"]`);
    if (dot) { dot.classList.add(cls); dot.textContent = cls === 'g3g-dot-ok' ? '😊' : '😕'; }
  }

  function next() {
    const i = results.length;
    if (i >= total) return showSummary();
    mark(i);
    stage.classList.remove('g3g-has-result');
    const mission = game.makeMission(rng, level, history);
    history.push(mission);
    let done = false;
    const finish = (ok, text, tip) => {
      if (done) return;
      done = true;
      results.push(ok);
      mark(i, ok ? 'g3g-dot-ok' : 'g3g-dot-fail');
      if (ok) sfx.ding(); else sfx.boing();
      // Kết quả hiện ngay trong cột thao tác của trò (data-result-host), thay chỗ bàn phím —
      // màn ngang điện thoại không đủ cao để đặt bên dưới.
      const host = stage.querySelector('[data-result-host]') || stage;
      stage.classList.add('g3g-has-result');
      const resultBox = document.createElement('div');
      resultBox.className = `g3g-result ${ok ? 'g3g-result-ok' : 'g3g-result-fail'}`;
      host.appendChild(resultBox);
      resultBox.innerHTML = `
        <div class="g3g-result-text">${ok ? '✅' : '❌'} ${text}</div>
        ${tip ? `<div class="g3g-tip">💡 ${tip}</div>` : ''}
        <button type="button" class="g3g-btn g3g-btn-primary" data-act="next">${results.length >= total ? 'Xem kết quả ›' : `${cap(game.unitWord)} tiếp theo ›`}</button>`;
      resultBox.querySelector('[data-act="next"]').onclick = () => { stopSpeaking(); next(); };
      resultBox.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
    };
    game.mountMission(stage, mission, level, {
      succeed: (text) => finish(true, text),
      fail: (text, tip) => finish(false, text, tip),
      say,
    });
  }

  function showSummary() {
    stopSpeaking();
    const ok = results.filter(Boolean).length;
    const fails = total - ok;
    const key = starKey(level);
    let gotStars = 0;
    if (!hasEarned(key)) {
      for (let k = 0; k < fails; k++) recordWrong(key, null);
      gotStars = awardStars(key, null);
    }
    const newBest = saveBest(level.id, ok, total);
    const best = bestFor(level.id);
    if (fails === 0) { sfx.fanfare(); rain(); } else sfx.ding();
    const headline = fails === 0 ? 'Tuyệt vời! 🎉' : ok >= total / 2 ? 'Giỏi lắm! 👏' : 'Cố lên nhé! 💪';
    app.innerHTML = `
      <div class="g3g-wrap g3g-menu">${menuBackdrop()}
        <div class="g3g-card g3g-summary animate-fadeIn">
          <div class="g3g-summary-icon">${game.icon}</div>
          <h2 class="g3g-h2">${headline}</h2>
          <p class="g3g-summary-line">${game.summaryText(ok, total)}</p>
          <div class="g3g-summary-dots">${results.map(r => `<span class="${r ? 'g3g-sum-ok' : 'g3g-sum-fail'}">${r ? '😊' : '😕'}</span>`).join('')}</div>
          ${gotStars ? `<p class="g3g-summary-stars">+${gotStars} ⭐</p>` : ''}
          <p class="g3g-summary-best">${newBest ? '🏆 Kỷ lục mới! ' : ''}Kỷ lục của em: ${best.ok}/${best.total}</p>
          ${fails > total / 2 ? `<p class="g3g-tip">💡 Em có thể thử cấp dễ hơn hoặc xem lại bài học rồi chơi tiếp nhé.</p>` : ''}
          <div class="g3g-actions">
            <button type="button" class="g3g-btn g3g-btn-primary" data-act="again">🔁 Chơi lại (khách mới)</button>
            ${onNextLevel ? `<button type="button" class="g3g-btn g3g-btn-secondary" data-act="up">⬆️ Cấp tiếp theo</button>` : ''}
            <button type="button" class="g3g-btn g3g-btn-ghost" data-act="list">← Chọn cấp khác</button>
          </div>
        </div>
      </div>`;
    fitMenu(app);
    app.querySelector('[data-act="again"]').onclick = () => playRound(app, { game, level, onExit, onNextLevel });
    app.querySelector('[data-act="up"]')?.addEventListener('click', () => { exitGameMode(); onNextLevel(); });
    app.querySelector('[data-act="list"]').onclick = () => { exitGameMode(); onExit(); };
  }

  next();
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Bàn phím số trên màn hình (máy tính tiền). onSubmit(value) khi bấm OK.
 * Trả về { el, lock() }.
 */
export function keypad({ unit = '', max = 4, onSubmit }) {
  const el = document.createElement('div');
  el.className = 'g3g-keypad';
  el.innerHTML = `
    <div class="g3g-lcd"><span class="g3g-lcd-val">&nbsp;</span><span class="g3g-lcd-unit">${unit}</span></div>
    <div class="g3g-keys">
      ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => `<button type="button" class="g3g-key" data-k="${d}">${d}</button>`).join('')}
      <button type="button" class="g3g-key g3g-key-del" data-k="del" aria-label="Xoá">⌫</button>
      <button type="button" class="g3g-key" data-k="0">0</button>
      <button type="button" class="g3g-key g3g-key-ok" data-k="ok" disabled>OK</button>
    </div>`;
  const val = el.querySelector('.g3g-lcd-val');
  const okBtn = el.querySelector('[data-k="ok"]');
  let s = '';
  let locked = false;
  const show = () => { val.innerHTML = s || '&nbsp;'; okBtn.disabled = !s; };
  el.addEventListener('click', (e) => {
    const b = e.target.closest('[data-k]');
    if (!b || locked) return;
    const k = b.dataset.k;
    sfx.tap();
    if (k === 'del') s = s.slice(0, -1);
    else if (k === 'ok') { if (s) onSubmit(Number(s)); return; }
    else if (s.length < max) s = s === '0' ? k : s + k;
    show();
  });
  return {
    el,
    lock(cls) { locked = true; el.classList.add('g3g-keypad-locked'); if (cls) el.classList.add(cls); el.querySelectorAll('button').forEach(b => { b.disabled = true; }); },
  };
}
