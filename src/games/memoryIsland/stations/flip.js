/**
 * 🃏 Bãi Lật Thẻ (docs/thiet-ke-tro-choi-tri-nho.md §6): lật hai thẻ BẰNG NHAU (7 × 8 với 56).
 *
 * Màn chơi (giữ chỗ mọi vùng từ đầu, không vùng nào đổi cỡ trong ván — skill game-screen-layout):
 *   - dây phơi: N ô nét đứt (ngang: một hàng; dọc: hai hàng), cặp ghép đúng bay lên thành một dải "7 × 8 = 56";
 *   - vẹt + bong bóng lời + ô "Lần lật", "Cặp" (ngang: cột phải; dọc: dải giữa);
 *   - lưới thẻ: phần còn lại; ô đã ghép để lại khung nét đứt, lưới không dồn.
 *   - Ôn nhanh 3 câu (§6.3) và tổng kết phủ lên lưới (đã trống hết) — không đẩy gì.
 *
 * mountFlip(app, opts) — opts: { facts, traps, level, title, rng, onQuit, onDone(result) → info, onAgain, onBag, onHarder }
 *   onDone nhận { flips, stars, quiz: { uid: đúng? }, miss: { uid: số lần }, seen: [uid] }, trả về
 *   { best, newBest, gotStars } để hiện ở tổng kết.
 */

import { beachBackdrop, parrot, shell, pin } from '../art.js';
import { faceBox, faceLabel } from '../faces.js';
import { quizChoices } from '../pick.js';
import { flyOne, calmMotion } from '../../grade3Games/fly.js';
import { enterGameMode, exitGameMode, mountOrientation } from '../../grade3Games/loop.js';
import { say as rawSay, stopSpeaking, sfx, rain, isMuted, setMuted, shake } from '../../preschool/fx.js';
import { speakableVi } from '../../../engine/letterNames.js';
import { injectMemoryStyles } from '../styles.js';

/** Cấp của trạm (bậc B1, B2, B4 ở §5.3 cho lớp 2–3). */
export const FLIP_LEVELS = [
  { id: 0, icon: '👀', title: 'Nhìn trước', desc: 'Thẻ ngửa 3 giây rồi úp', pairs: 4, preview: 3000, traps: 0 },
  { id: 1, icon: '🃏', title: 'Úp từ đầu', desc: '6 cặp thẻ úp', pairs: 6, preview: 0, traps: 0 },
  { id: 2, icon: '🪤', title: 'Thẻ bẫy', desc: '5 cặp và 2 thẻ không có bạn', pairs: 5, preview: 0, traps: 2 },
];

// Giọng Việt: số La Mã, chữ in hoa đọc theo tên chữ cái (XIII → ích-xì i i i).
const say = (text, opts) => rawSay(speakableVi(text), opts);

const QUIZ_N = 3;
const IDLE_MS = 8000;

/** Sao của ván theo số lần lật (§13.4): ≤ 3N → 3 sao, ≤ 4,5N → 2 sao, xong ván → 1 sao. */
export const flipStars = (flips, pairs) => (flips <= 3 * pairs ? 3 : flips <= 4.5 * pairs ? 2 : 1);

/** Chọn số cột cho lưới: chia hết (không ô thừa), ô gần tỉ lệ thẻ 4 : 3. */
function bestCols(count, w, h) {
  let best = count, score = Infinity;
  for (let c = 2; c <= count; c++) {
    if (count % c) continue;
    const r = count / c;
    const s = Math.abs(Math.log((w / c) / (h / r) / 1.3));
    if (s < score) { score = s; best = c; }
  }
  return best;
}

export function mountFlip(app, opts) {
  const { facts, traps = [], level, rng } = opts;
  injectMemoryStyles();
  const N = facts.length;
  const topics = [...new Set(facts.map((f) => f.topic))];
  const mixed = topics.length > 1;

  // Thẻ trên bàn: mỗi thẻ kiến thức 2 thẻ (mặt hỏi, mặt đáp) + thẻ bẫy (chỉ mặt đáp, không có bạn).
  const cards = rng.shuffle([
    ...facts.flatMap((fact) => fact.faces.map((face) => ({ fact, face, role: face.role }))),
    ...traps.map((t) => ({ fact: null, face: t.face, role: 'ans', trap: t })),
  ]).map((c, i) => ({ ...c, i, up: false, gone: false, seen: false }));

  const timers = new Set();
  const later = (fn, ms) => {
    const t = setTimeout(() => { timers.delete(t); if (play.isConnected) fn(); }, ms);
    timers.add(t);
    return t;
  };
  const clearTimers = () => { timers.forEach(clearTimeout); timers.clear(); };

  enterGameMode();
  app.innerHTML = `
    <div class="g3g-wrap g3g-play mi-play">
      <div class="mi-scene">${beachBackdrop()}</div>
      <div class="g3g-topbar mi-topbar">
        <button type="button" class="g3g-icon-btn" data-act="quit" aria-label="Thoát">✕</button>
        <div class="g3g-top-title">🃏 ${opts.title}</div>
        <button type="button" class="g3g-icon-btn g3g-orient-btn" data-act="orient" aria-label="Chọn chơi ngang hoặc dọc"></button>
        <button type="button" class="g3g-icon-btn" data-act="mute" aria-label="Bật/tắt tiếng">${isMuted() ? '🔇' : '🔊'}</button>
        ${document.fullscreenEnabled ? '<button type="button" class="g3g-icon-btn" data-act="full" aria-label="Toàn màn hình">⤢</button>' : ''}
      </div>
      <div class="mi-stage">
        <div class="mi-layout">
          <div class="mi-line" style="--n:${N};--half:${Math.ceil(N / 2)}">
            ${facts.map((_, k) => `<div class="mi-slot" data-slot="${k}"><span class="mi-slot-box"></span></div>`).join('')}
          </div>
          <div class="mi-side">
            <div class="mi-talk"><p class="mi-talk-text">&nbsp;</p></div>
            <div class="mi-parrot" data-mood="idle">${parrot()}</div>
            <div class="mi-stats">
              <div class="mi-stat"><span class="mi-stat-label">Lần lật</span><b data-flips>0</b></div>
              <div class="mi-stat"><span class="mi-stat-label">Cặp</span><b data-pairs>0/${N}</b></div>
            </div>
          </div>
          <div class="mi-board">
            <div class="mi-grid">
              ${cards.map((c) => `
                <button type="button" class="mi-cell" data-i="${c.i}" aria-label="Thẻ úp">
                  <span class="mi-card mi-role-${c.role}">
                    <span class="mi-inner">
                      <span class="mi-back">${shell()}</span>
                      <span class="mi-front">${mixed && c.fact ? `<span class="mi-topic-ic">${c.fact.topic.icon}</span>` : ''}${faceBox(c.face)}</span>
                    </span>
                  </span>
                </button>`).join('')}
            </div>
            <div class="mi-overlay" aria-live="polite"></div>
          </div>
        </div>
      </div>
    </div>`;

  const play = app.querySelector('.mi-play');
  const board = app.querySelector('.mi-board');
  const grid = app.querySelector('.mi-grid');
  const overlay = app.querySelector('.mi-overlay');
  const talkText = app.querySelector('.mi-talk-text');
  const parrotEl = app.querySelector('.mi-parrot');
  const flipsEl = app.querySelector('[data-flips]');
  const pairsEl = app.querySelector('[data-pairs]');
  const cellEl = (i) => grid.querySelector(`[data-i="${i}"]`);

  // ── thanh trên ──
  mountOrientation(play, app.querySelector('[data-act="orient"]'));
  app.querySelector('[data-act="quit"]').onclick = () => { leave(); opts.onQuit(); };
  const muteBtn = app.querySelector('[data-act="mute"]');
  muteBtn.onclick = () => { setMuted(!isMuted()); muteBtn.textContent = isMuted() ? '🔇' : '🔊'; };
  const fullBtn = app.querySelector('[data-act="full"]');
  const syncFull = () => { if (fullBtn) fullBtn.textContent = document.fullscreenElement ? '⤡' : '⤢'; };
  if (fullBtn) {
    fullBtn.onclick = () => (document.fullscreenElement ? document.exitFullscreen?.() : document.documentElement.requestFullscreen?.())?.catch?.(() => {});
    document.addEventListener('fullscreenchange', syncFull);
    syncFull();
  }
  function leave() {
    clearTimers();
    stopSpeaking();
    exitGameMode();
    window.removeEventListener('resize', onResize);
    document.removeEventListener('fullscreenchange', syncFull);
  }

  // ── lưới: số cột chọn theo khung bàn (lúc đầu ván và khi xoay máy) ──
  function layoutGrid() {
    const r = grid.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const cols = bestCols(cards.length, r.width, r.height);
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${cards.length / cols}, 1fr)`;
    grid.dataset.rows = String(cards.length / cols);
  }
  let resizeT = 0;
  const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(() => { if (play.isConnected) layoutGrid(); }, 80); };
  window.addEventListener('resize', onResize);
  layoutGrid();
  requestAnimationFrame(layoutGrid);

  // ── vẹt ──
  let moodT = 0;
  function talk(text, { speak = text, mood = null, queue = false } = {}) {
    talkText.textContent = text;
    talkText.parentElement.classList.remove('mi-talk-pop');
    void talkText.offsetWidth;
    talkText.parentElement.classList.add('mi-talk-pop');
    if (speak) say(speak, { queue });
    if (mood) setMood(mood);
  }
  function setMood(mood, ms = 1600) {
    parrotEl.dataset.mood = mood;
    clearTimeout(moodT);
    if (mood !== 'idle') moodT = setTimeout(() => { parrotEl.dataset.mood = 'idle'; }, ms);
  }

  // ── trạng thái ván ──
  let flips = 0, matched = 0, lock = true;
  let up = [];
  const miss = {};          // uid → số lần lật nhầm khi đã thấy thẻ bạn của nó (ghi vào sổ)
  const missHint = {};      // uid → số lần nhầm liền (để vẹt chỉ chỗ)
  const hinted = new Set();
  let idleT = 0, nudges = 0;

  const setFlips = () => { flipsEl.textContent = String(flips); };
  function flipUp(c, { count = true } = {}) {
    c.up = true;
    c.seen = true;
    const el = cellEl(c.i);
    el.classList.add('mi-up');
    el.setAttribute('aria-label', c.face.kind === 'part' ? 'Hình tô màu' : c.face.text);
    if (count) { flips++; setFlips(); }
  }
  function flipDown(c) {
    c.up = false;
    const el = cellEl(c.i);
    el.classList.remove('mi-up', 'mi-wrong');
    el.setAttribute('aria-label', 'Thẻ úp');
  }

  function armIdle() {
    clearTimeout(idleT);
    if (nudges >= 3) return;
    idleT = later(() => {
      if (lock) return armIdle();
      nudges++;
      if (!up.length) {
        talk('Lật một thẻ xanh!', { mood: 'think' });
        const blues = cards.filter((c) => !c.gone && !c.up && c.role === 'ask');
        const c = blues.length ? rng.pick(blues) : null;
        if (c) bounce(cellEl(c.i));
      } else {
        talk(`Tìm thẻ bằng ${faceLabel(up[0].face).replace(/^thẻ /, '')}!`, { mood: 'think' });
      }
      armIdle();
    }, IDLE_MS);
  }
  function bounce(el) {
    el.classList.remove('mi-nudge');
    void el.offsetWidth;
    el.classList.add('mi-nudge');
    later(() => el.classList.remove('mi-nudge'), 1800);
  }

  grid.addEventListener('click', (e) => {
    const el = e.target.closest('.mi-cell');
    if (!el) return;
    tap(cards[+el.dataset.i]);
  });

  function tap(c) {
    if (lock || c.gone || c.up) return;
    nudges = 0;
    armIdle();
    // Cặp luôn là 1 xanh + 1 cam (§2.1): chạm thẻ cùng màu với thẻ đang ngửa → vẹt nhắc, không lật, không tính.
    if (up.length === 1 && up[0].role === c.role) {
      sfx.boing();
      shake(cellEl(c.i).querySelector('.mi-card'));
      talk(c.role === 'ask' ? 'Thẻ xanh đi với thẻ cam! Lật một thẻ cam.' : 'Thẻ cam đi với thẻ xanh! Lật một thẻ xanh.', { mood: 'think' });
      return;
    }
    sfx.swish();
    flipUp(c);
    up.push(c);
    if (c.face.say) say(c.face.say);
    if (up.length < 2) return;
    lock = true;
    const [a, b] = up;
    up = [];
    if (a.fact && a.fact === b.fact) later(() => onMatch(a, b), calmMotion() ? 350 : 420);
    else later(() => onMismatch(a, b), 520);
  }

  function onMatch(a, b) {
    const fact = a.fact;
    const [ask, ans] = a.role === 'ask' ? [a, b] : [b, a];
    const slot = app.querySelector(`[data-slot="${matched}"]`);
    matched++;
    pairsEl.textContent = `${matched}/${N}`;
    sfx.ding();
    talk(`${cap(fact.sentence)}!`, { mood: 'happy' });
    delete missHint[fact.uid];
    // Dải đặt sẵn (ẩn) để lấy chỗ đáp; hai thẻ bay vào hai nửa dải rồi dải hiện ra, kẹp nảy.
    slot.insertAdjacentHTML('beforeend', stripHtml(fact));
    const strip = slot.querySelector('.mi-strip');
    const parts = [strip.querySelector('.mi-strip-ask'), strip.querySelector('.mi-strip-ans')];
    // Hiện dải theo thời gian bay (không chờ sự kiện "đáp" của hình bay: máy chậm / tab ẩn có thể báo trễ).
    let flyMs = 0;
    [ask, ans].forEach((c, k) => {
      const el = cellEl(c.i);
      const from = el.querySelector('.mi-front').getBoundingClientRect();
      const to = parts[k].getBoundingClientRect();
      c.gone = true;
      flyMs = Math.max(flyMs, flyOne(flyHtml(c), from, to, { delay: k * 90, minMs: 520, maxMs: 900, spin: k ? 8 : -8 }));
      el.classList.add('mi-gone');
      el.disabled = true;
      el.setAttribute('aria-label', 'Đã ghép');
    });
    const n = matched;
    later(() => {
      strip.classList.remove('mi-strip-wait');
      strip.classList.add('mi-strip-in');
      sfx.pop(n);
    }, flyMs);
    later(() => {
      if (matched >= N) return endBoard();
      lock = false;
      armIdle();
    }, 950);
  }

  function onMismatch(a, b) {
    sfx.boing();
    setMood('think', 1300);
    [a, b].forEach((c) => {
      const el = cellEl(c.i);
      el.classList.add('mi-wrong');
      shake(el.querySelector('.mi-card'));
    });
    // Lật nhầm khi đã từng thấy thẻ bạn: ghi sổ; nhầm 3 lần cùng một thẻ → vẹt chỉ chỗ thẻ bạn (§13.1).
    let hintFor = null;
    for (const c of [a, b]) {
      if (!c.fact) continue;
      const partner = cards.find((x) => x.fact === c.fact && x !== c);
      if (!partner.seen || partner.up) continue;
      miss[c.fact.uid] = (miss[c.fact.uid] || 0) + 1;
      missHint[c.fact.uid] = (missHint[c.fact.uid] || 0) + 1;
      if (!hintFor && missHint[c.fact.uid] >= 3 && !hinted.has(c.fact.uid)) hintFor = partner;
    }
    later(() => {
      flipDown(a);
      flipDown(b);
      if (hintFor) {
        hinted.add(hintFor.fact.uid);
        talk(`${cap(faceLabel(hintFor.face))} ở ${rowName(hintFor.i)} đó.`, { mood: 'think' });
        const el = cellEl(hintFor.i);
        el.classList.add('mi-glow');
        later(() => el.classList.remove('mi-glow'), 900);
      }
      lock = false;
      armIdle();
    }, 1200);
  }

  function rowName(i) {
    const rows = +grid.dataset.rows || 1;
    const cols = cards.length / rows;
    const r = Math.floor(i / cols);
    if (rows === 2) return r ? 'hàng dưới' : 'hàng trên';
    if (rows === 3) return ['hàng trên', 'hàng giữa', 'hàng dưới'][r];
    return `hàng thứ ${['nhất', 'hai', 'ba', 'tư', 'năm', 'sáu', 'bảy', 'tám'][r]}`;
  }

  // ── hết cặp: lật thẻ bẫy, rồi Ôn nhanh ──
  function endBoard() {
    clearTimeout(idleT);
    const left = cards.filter((c) => c.trap);
    if (left.length) {
      left.forEach((c) => { if (!c.up) flipUp(c, { count: false }); cellEl(c.i).classList.add('mi-trap'); });
      talk(`Hết cặp rồi! ${left.length} thẻ còn lại không có bạn, là thẻ bẫy.`, { mood: 'happy' });
      later(startQuiz, 2600);
    } else {
      talk('Hết thẻ rồi! Giỏi quá!', { mood: 'happy' });
      later(startQuiz, 1500);
    }
  }

  // ── Ôn nhanh (§6.3): che mặt đáp của 3 dải, hỏi lại bằng 3 nút to ──
  const quiz = {};
  function startQuiz() {
    left().forEach((c) => cellEl(c.i).classList.add('mi-gone'));
    // Thẻ bé lật nhầm nhiều nhất trước, rồi ngẫu nhiên.
    const order = rng.shuffle(facts).sort((x, y) => (miss[y.uid] || 0) - (miss[x.uid] || 0)).slice(0, Math.min(QUIZ_N, N));
    overlay.innerHTML = `
      <div class="mi-quiz">
        <div class="mi-quiz-head"><span>Ôn nhanh</span><span class="mi-quiz-dots">${order.map((_, k) => `<i data-q="${k}"></i>`).join('')}</span></div>
        <div class="mi-quiz-q">
          <span class="mi-qcard mi-role-ask" data-qask></span>
          <span class="mi-quiz-eq">=</span>
          <span class="mi-qcard mi-qcard-blank" data-qblank>?</span>
        </div>
        <div class="mi-quiz-choices">${[0, 1, 2].map((k) => `<button type="button" class="mi-choice" data-k="${k}"></button>`).join('')}</div>
      </div>`;
    board.classList.add('mi-ov-on');
    // Che mặt đáp của các dải sắp hỏi.
    order.forEach((f) => stripOf(f).classList.add('mi-strip-hide'));
    talk('Nhớ lại nào! Chọn thẻ đúng.', { mood: 'think', speak: 'Nhớ lại nào!' });
    later(() => ask(order, 0), 900);
  }
  const left = () => cards.filter((c) => c.trap);
  const revealStrip = (strip) => strip.classList.remove('mi-strip-hide', 'mi-strip-now');
  const stripOf = (fact) => app.querySelector(`.mi-strip[data-uid="${fact.uid}"]`);

  function ask(order, k) {
    if (k >= order.length) return later(showSummary, 700);
    const fact = order[k];
    const strip = stripOf(fact);
    app.querySelectorAll('.mi-strip-now').forEach((s) => s.classList.remove('mi-strip-now'));
    strip.classList.add('mi-strip-now');
    overlay.querySelector(`[data-q="${k}"]`).classList.add('mi-q-now');
    overlay.querySelector('[data-qask]').innerHTML = faceBox(fact.faces[0]);
    const blank = overlay.querySelector('[data-qblank]');
    blank.innerHTML = '?';
    blank.classList.remove('mi-qcard-done');
    const choices = quizChoices(fact, rng);
    const btns = [...overlay.querySelectorAll('.mi-choice')];
    btns.forEach((b, i) => {
      const ch = choices[i];
      b.className = 'mi-choice';
      b.disabled = !ch;
      b.style.visibility = ch ? '' : 'hidden';
      b.innerHTML = ch ? faceBox(ch.face) : '';
      b.onclick = ch ? () => answer(ch, b) : null;
    });
    const askFace = fact.faces[0];
    talkText.textContent = askFace.kind === 'part' ? 'Hình này là phân số nào?' : askFace.kind === 'roman' ? 'Số La Mã này là số mấy?' : `${askFace.text} = ?`;
    say(askFace.say ? `${askFace.say} bằng bao nhiêu?` : talkText.textContent);

    function answer(ch, btn) {
      btns.forEach((b) => { b.disabled = true; b.onclick = null; });
      const ok = ch.ok;
      quiz[fact.uid] = ok;
      const rightBtn = btns.find((b, i) => choices[i]?.ok);
      const dot = overlay.querySelector(`[data-q="${k}"]`);
      dot.classList.remove('mi-q-now');
      dot.classList.add(ok ? 'mi-q-ok' : 'mi-q-bad');
      if (ok) {
        sfx.ding();
        btn.classList.add('mi-choice-ok');
        talk(`Đúng rồi! ${cap(fact.sentence)}.`, { mood: 'happy' });
      } else {
        sfx.boing();
        btn.classList.add('mi-choice-bad');
        shake(btn);
        rightBtn.classList.add('mi-choice-ok');
        talk(`${cap(fact.sentence)}.`, { mood: 'think' });
      }
      // Số đúng bay vào ô "?" rồi lên lại dải trên dây phơi (đổi chữ theo thời gian bay, không chờ sự kiện đáp).
      const ansFace = fact.faces[1];
      const from = rightBtn.querySelector('.mi-fbox').getBoundingClientRect();
      const t1 = flyOne(flyFaceHtml(ansFace, 'ans'), from, blank.getBoundingClientRect(), { delay: ok ? 150 : 650, minMs: 420, maxMs: 700 });
      later(() => {
        blank.innerHTML = faceBox(ansFace);
        blank.classList.add('mi-qcard-done');
        const target = strip.querySelector('.mi-strip-ans');
        const t2 = flyOne(flyFaceHtml(ansFace, 'ans'), blank.getBoundingClientRect(), target.getBoundingClientRect(), { delay: 200, minMs: 450, maxMs: 800 });
        later(() => { revealStrip(strip); sfx.pop(k + 2); }, t2);
      }, t1);
      later(() => { revealStrip(strip); ask(order, k + 1); }, ok ? 2300 : 3100);
    }
  }

  // ── tổng kết: phủ lên lưới (đã trống) ──
  function showSummary() {
    const stars = flipStars(flips, N);
    const info = opts.onDone({ flips, stars, quiz, miss, seen: facts.map((f) => f.uid) }) || {};
    const quizOk = Object.values(quiz).filter(Boolean).length;
    const weak = facts.filter((f) => quiz[f.uid] === false);
    if (stars === 3 && quizOk === Object.keys(quiz).length) { sfx.fanfare(); rain(); } else sfx.ding();
    const headline = stars === 3 ? 'Trí nhớ siêu quá! 🎉' : stars === 2 ? 'Giỏi lắm! 👏' : 'Xong rồi! 💪';
    overlay.innerHTML = `
      <div class="mi-sum">
        <div class="mi-sum-stars" aria-label="${stars} sao">${[1, 2, 3].map((s) => `<span class="${s <= stars ? 'on' : ''}" style="--d:${s * 0.18}s">★</span>`).join('')}</div>
        <h2 class="mi-sum-h">${headline}</h2>
        <p class="mi-sum-line">Em tìm được <b>${N} cặp</b> sau <b>${flips} lần lật</b>.</p>
        <p class="mi-sum-sub">${info.newBest ? '🏆 Kỷ lục mới!' : info.best != null ? `Kỷ lục của em: ${info.best} lần lật` : ''}${stars < 3 ? ` · 3 sao: lật ${3 * N} lần trở xuống` : ''}</p>
        <p class="mi-sum-sub">Ôn nhanh: ${Object.values(quiz).map((v) => (v ? '✅' : '❌')).join(' ')}</p>
        ${weak.length ? `<p class="mi-sum-weak">Ôn thêm: ${weak.map((f) => `<span class="mi-sum-chip">${f.faces[0].kind === 'part' ? '🍰' : f.faces[0].text} = ${f.faces[1].text}</span>`).join(' ')}</p>` : ''}
        ${info.gotStars ? `<p class="mi-sum-got">+${info.gotStars} ⭐</p>` : ''}
        <div class="mi-sum-actions">
          <button type="button" class="g3g-btn g3g-btn-primary" data-act="again">🔁 Chơi lại</button>
          ${opts.onHarder ? '<button type="button" class="g3g-btn g3g-btn-secondary" data-act="harder">⬆️ Khó hơn</button>' : ''}
          <button type="button" class="g3g-btn g3g-btn-ghost" data-act="bag">🎒 Đổi thẻ</button>
        </div>
      </div>`;
    overlay.classList.add('mi-ov-sum');
    talk(headline.replace(/\s\S+$/u, ''), { mood: 'happy' });
    overlay.querySelector('[data-act="again"]').onclick = () => { leave(); opts.onAgain(); };
    overlay.querySelector('[data-act="bag"]').onclick = () => { leave(); opts.onBag(); };
    overlay.querySelector('[data-act="harder"]')?.addEventListener('click', () => { leave(); opts.onHarder(); });
  }

  // ── bắt đầu ván ──
  function start() {
    if (level.preview) {
      cards.forEach((c) => { c.seen = true; c.up = true; cellEl(c.i).classList.add('mi-up', 'mi-instant'); });
      requestAnimationFrame(() => cards.forEach((c) => cellEl(c.i).classList.remove('mi-instant')));
      const secs = Math.round(level.preview / 1000);
      talk(`Nhìn kĩ chỗ các thẻ! ${secs}`, { speak: 'Nhìn kĩ chỗ các thẻ!' });
      for (let s = secs - 1; s >= 1; s--) later(() => { talkText.textContent = `Nhìn kĩ chỗ các thẻ! ${s}`; }, (secs - s) * 1000);
      later(() => {
        cards.forEach((c, k) => later(() => flipDown(c), k * 45));
        later(begin, cards.length * 45 + 350);
      }, level.preview);
    } else {
      later(begin, 300);
    }
  }
  function begin() {
    lock = false;
    talk('Lật hai thẻ bằng nhau!');
    armIdle();
  }
  start();

  // Bản dev: trang thử / chụp màn hình tự giải (window.__mi.solve(cặp)).
  if (import.meta.env.DEV) {
    window.__mi = {
      cards, facts,
      tap: (i) => tap(cards[i]),
      async solve(pairs = N, gap = 1300) {
        for (const f of facts.slice(0, pairs)) {
          const [x, y] = cards.filter((c) => c.fact === f);
          while (lock) await new Promise((r) => setTimeout(r, 50));
          tap(x); tap(y);
          await new Promise((r) => setTimeout(r, gap));
        }
      },
      miss() { const a = cards.find((c) => c.fact && !c.gone); const b = cards.find((c) => c.fact && c.fact !== a.fact && !c.gone); tap(a); tap(b); },
    };
  }
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function stripHtml(fact) {
  const [ask, ans] = fact.faces;
  return `
    <div class="mi-strip mi-strip-wait${fact.faces.some((f) => f.kind === 'part' || f.kind === 'frac') ? ' mi-strip-pic' : ''}" data-uid="${fact.uid}" style="--tc:${fact.topic.color || '#38BDF8'};--SL:${Math.max(3, ...fact.faces.map((f) => [...f.text].length))}">
      ${pin()}
      <span class="mi-strip-part mi-strip-ask">${faceBox(ask)}</span>
      <span class="mi-strip-eq">=</span>
      <span class="mi-strip-part mi-strip-ans">${faceBox(ans)}<span class="mi-strip-cover">?</span></span>
    </div>`;
}

/** Bản sao mặt thẻ để bay (giữ khung viền màu theo vai). */
const flyHtml = (c) => flyFaceHtml(c.face, c.role);
const flyFaceHtml = (face, role) => `<div class="mi-flyface mi-role-${role}"><span class="mi-front">${faceBox(face)}</span></div>`;
