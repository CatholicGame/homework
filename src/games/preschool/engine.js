/**
 * Bé Học Vui Toán — engine dùng chung cho các tập Tiền tiểu học (Tập 1: data.js, Tập 2: data2.js).
 *
 * Thiết kế cho bé mầm non (chưa đọc được chữ): bản đồ phiêu lưu với các trạm,
 * bạn Thỏ đọc to lời dặn, bé chạm đếm từng đồ vật, kéo số, tô số bằng ngón tay;
 * đúng thì có pháo giấy, tiếng "ting" và sao. Không có nút "Kiểm tra" — mỗi lần
 * chạm là một lần trả lời, sai thì rung nhẹ và bớt sao (luật sao chung, stars.js).
 *
 * Mỗi tập là một cấu hình `book`: { key (tiền tố khoá sao), title, subtitle, note, stations, parts }.
 * Tô số / tô chữ: trace.js, letters.js · âm thanh: fx.js.
 */

import '../../styles/preschool.css';
import { NUMBER_COLORS, numberWord } from './numbers.js';
import { say, stopSpeaking, sfx, burst, rain, shake, centerOf, isMuted, setMuted } from './fx.js';
import { mountTracer } from './trace.js';
import { letterGlyph } from './letters.js';
import { awardStars, recordWrong, hasEarned, earnedFor, getQuestionStars, availableStars } from '../../engine/stars.js';
import { recordAttempt } from '../../engine/activity.js';

const TRACE_REPS = 3;
const LETTER_REPS = 2;
const PAINT_COUNT = 5;

const colorOf = (n) => NUMBER_COLORS[n] || '#F97316';
const shuffle = (a) => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(v => v[1]);

export function renderPreschool(app, onBack, book) {
  const { stations: STATIONS, parts: PARTS } = book;
  const LAST_KEY = `${book.key}-last-station`;
  const starKey = (station, idx) => `${book.key}:${station.id}:${idx}`;
  const isSolved = (station, idx) => hasEarned(starKey(station, idx));
  const solvedCount = (station) => station.rounds.filter((_, i) => isSolved(station, i)).length;
  const stationStars = (station) => station.rounds.reduce((s, _, i) => s + earnedFor(starKey(station, i)), 0);
  const stationMaxStars = (station) => station.rounds.reduce((s, r, i) => s + getQuestionStars(starKey(station, i), r), 0);
  const getLast = () => { try { return localStorage.getItem(LAST_KEY); } catch { return null; } };
  const setLast = (id) => { try { localStorage.setItem(LAST_KEY, id); } catch { /* storage unavailable */ } };

  let cleanup = [];
  const addCleanup = (fn) => cleanup.push(fn);
  const runCleanup = () => { cleanup.forEach(fn => fn()); cleanup = []; };

  // Rời trang (về trang chủ) thì dừng đọc.
  const leave = () => { runCleanup(); stopSpeaking(); onBack(); };

  showMap();

  // ════════════════════════════════════════════════════════════════════════
  // Bản đồ
  // ════════════════════════════════════════════════════════════════════════
  function showMap() {
    runCleanup();
    stopSpeaking();
    const current = STATIONS.find(s => solvedCount(s) < s.rounds.length) || null;
    const total = STATIONS.reduce((s, st) => s + stationStars(st), 0);

    app.innerHTML = `
      <div class="pk pk-map-page">
        <div class="pk-sky" aria-hidden="true"><span class="pk-cloud c1"></span><span class="pk-cloud c2"></span><span class="pk-cloud c3"></span></div>
        <header class="pk-topbar">
          <button type="button" class="pk-round-btn" id="pk-home" aria-label="Về trang chủ">🏠</button>
          <div class="pk-title">
            <h1>${book.title}</h1>
            <p>${book.subtitle}</p>
          </div>
          <span class="pk-star-count" title="Sao đã nhận trong sách này">⭐ ${total}</span>
          ${muteButton()}
        </header>
        <div class="pk-hello">
          <button type="button" class="pk-mascot" id="pk-mascot" aria-label="Nghe lại">🐰</button>
          <div class="pk-bubble" id="pk-bubble">Chào bé! Chạm vào một trạm để cùng chơi nhé!</div>
        </div>
        ${PARTS.map(part => mapPart(part, current)).join('')}
        <p class="pk-note">${book.note}</p>
      </div>`;

    bindMute();
    app.querySelector('#pk-home').onclick = leave;
    const hello = current ? 'Chào bé! Chạm vào trạm có bạn Thỏ để chơi tiếp nhé!' : 'Bé đã hoàn thành tất cả các trạm. Giỏi quá!';
    app.querySelector('#pk-bubble').textContent = hello;
    app.querySelector('#pk-mascot').onclick = () => { sfx.tap(); say(hello); };
    app.querySelectorAll('.pk-node').forEach(btn => {
      btn.onclick = () => {
        sfx.pop(3);
        const [x, y] = centerOf(btn);
        burst(x, y, { count: 10 });
        setTimeout(() => openStation(STATIONS.find(s => s.id === btn.dataset.id)), 180);
      };
    });

    // Cuộn tới trạm đang chơi dở.
    const focus = app.querySelector(`.pk-node[data-id="${getLast() || current?.id}"]`) || app.querySelector('.pk-node.is-current');
    if (focus) requestAnimationFrame(() => focus.scrollIntoView({ block: 'center' }));
  }

  function mapPart(part, current) {
    const list = STATIONS.filter(s => s.part === part.num);
    const ROW = 118;
    const xs = list.map((_, i) => 50 + 30 * Math.sin(i * 1.15));
    const ys = list.map((_, i) => ROW / 2 + i * ROW);
    const height = list.length * ROW;
    const path = xs.map((x, i) => `${i ? 'L' : 'M'}${x} ${ys[i]}`).join(' ');
    return `
      <section class="pk-part">
        <h2 class="pk-part-title">${part.title}</h2>
        <div class="pk-trail" style="height:${height}px">
          <svg class="pk-trail-path" viewBox="0 0 100 ${height}" preserveAspectRatio="none" aria-hidden="true">
            <path d="${path}" vector-effect="non-scaling-stroke"/>
          </svg>
          ${list.map((s, i) => mapNode(s, xs[i], ys[i], s === current)).join('')}
        </div>
      </section>`;
  }

  function mapNode(s, x, y, isCurrent) {
    const done = solvedCount(s);
    const total = s.rounds.length;
    const pct = Math.round((done / total) * 100);
    const complete = done === total;
    const color = s.n ? colorOf(s.n) : s.color;
    const face = s.n ? `<span class="pk-node-num">${s.n}</span>` : `<span class="pk-node-icon">${s.icon}</span>`;
    return `
      <button type="button" class="pk-node ${x < 50 ? 'label-right' : 'label-left'}${complete ? ' is-complete' : ''}${isCurrent ? ' is-current' : ''}" data-id="${s.id}"
        style="left:${x}%; top:${y}px; --node-color:${color}; --pct:${pct}%" aria-label="${s.name} — đã xong ${done}/${total}">
        <span class="pk-node-ring"><span class="pk-node-face">${face}</span></span>
        ${complete ? '<span class="pk-node-crown">👑</span>' : ''}
        ${isCurrent ? '<span class="pk-node-here" aria-hidden="true">🐰</span>' : ''}
        <span class="pk-node-label">${s.title}<small>⭐ ${stationStars(s)}</small></span>
      </button>`;
  }

  function muteButton() {
    return `<button type="button" class="pk-round-btn" id="pk-mute" aria-label="${isMuted() ? 'Bật âm thanh' : 'Tắt âm thanh'}">${isMuted() ? '🔇' : '🔊'}</button>`;
  }
  function bindMute() {
    const btn = app.querySelector('#pk-mute');
    btn.onclick = () => {
      setMuted(!isMuted());
      btn.textContent = isMuted() ? '🔇' : '🔊';
      btn.setAttribute('aria-label', isMuted() ? 'Bật âm thanh' : 'Tắt âm thanh');
      if (!isMuted()) sfx.ding();
    };
  }

  // ════════════════════════════════════════════════════════════════════════
  // Một trạm: lần lượt các lượt chơi
  // ════════════════════════════════════════════════════════════════════════
  function openStation(station, idx = null) {
    setLast(station.id);
    if (idx === null) {
      idx = station.rounds.findIndex((_, i) => !isSolved(station, i));
      if (idx < 0) idx = 0;
    }
    playRound(station, idx);
  }

  function playRound(station, idx) {
    runCleanup();
    stopSpeaking();
    const round = station.rounds[idx];
    const key = starKey(station, idx);
    const replay = hasEarned(key);
    let finished = false;

    app.innerHTML = `
      <div class="pk pk-play-page">
        <div class="pk-sky" aria-hidden="true"><span class="pk-cloud c1"></span><span class="pk-cloud c2"></span></div>
        <header class="pk-topbar">
          <button type="button" class="pk-round-btn" id="pk-back" aria-label="Về bản đồ">🗺️</button>
          <div class="pk-title">
            <h1>${station.n ? `Bài ${station.n}` : `${station.icon} ${station.title}`}</h1>
            <p>${station.name}</p>
          </div>
          ${muteButton()}
        </header>
        <nav class="pk-steps" aria-label="Các lượt chơi">
          ${station.rounds.map((r, i) => `<button type="button" class="pk-step${i === idx ? ' is-on' : ''}${isSolved(station, i) ? ' is-done' : ''}" data-i="${i}" aria-label="Lượt ${i + 1}">${isSolved(station, i) ? '★' : i + 1}</button>`).join('')}
        </nav>
        <div class="pk-guide">
          <button type="button" class="pk-mascot" id="pk-mascot" aria-label="Nghe lại lời dặn">🐰</button>
          <div class="pk-bubble" id="pk-bubble"></div>
          ${replay ? '' : `<span class="pk-reward" title="Sao nhận được khi làm xong">+${getQuestionStars(key, round)}⭐</span>`}
        </div>
        <main class="pk-stage" id="pk-stage"></main>
        <div class="pk-next" id="pk-next" hidden></div>
      </div>`;

    bindMute();
    app.querySelector('#pk-back').onclick = () => showMap();
    app.querySelectorAll('.pk-step').forEach(b => { b.onclick = () => { sfx.tap(); playRound(station, Number(b.dataset.i)); }; });

    const stage = app.querySelector('#pk-stage');
    const bubble = app.querySelector('#pk-bubble');
    const mascot = app.querySelector('#pk-mascot');
    let instruction = '';

    /** Thỏ nói: hiện chữ + đọc to. `keep`: không thay lời dặn chính (nút nghe lại). */
    const talk = (text, { keep = false, mood = '' } = {}) => {
      bubble.textContent = text;
      if (!keep) instruction = text;
      mascot.classList.remove('is-happy', 'is-sad');
      if (mood) { void mascot.offsetWidth; mascot.classList.add(mood); }
      say(text);
    };
    mascot.onclick = () => { sfx.tap(); talk(instruction); };

    const ctx = {
      station, round, key, stage, talk,
      wrong(el, text = 'Chưa đúng rồi, bé thử lại nhé!') {
        if (finished) return;
        sfx.boing();
        shake(el);
        recordAttempt(false);
        recordWrong(key, round);
        talk(text, { keep: true, mood: 'is-sad' });
        refreshReward();
      },
      right(el, text) {
        sfx.ding();
        if (el) { const [x, y] = centerOf(el); burst(x, y, { count: 12 }); }
        if (text) talk(text, { keep: true, mood: 'is-happy' });
      },
      solve(text = 'Giỏi quá! Bé làm đúng rồi!') {
        if (finished) return;
        finished = true;
        recordAttempt(true);
        awardStars(key, round);
        sfx.fanfare();
        rain(1800);
        talk(text, { keep: true, mood: 'is-happy' });
        app.querySelector(`.pk-step[data-i="${idx}"]`)?.classList.add('is-done');
        app.querySelector('.pk-reward')?.remove();
        showNext();
      },
    };

    function refreshReward() {
      const el = app.querySelector('.pk-reward');
      if (el) el.textContent = `+${availableStars(key, round)}⭐`;
    }

    function showNext() {
      const next = app.querySelector('#pk-next');
      const last = idx === station.rounds.length - 1;
      next.hidden = false;
      next.innerHTML = `<button type="button" class="pk-next-btn" id="pk-next-btn" aria-label="${last ? 'Hoàn thành' : 'Lượt tiếp theo'}">${last ? '🏆' : '➜'}</button>`;
      const go = () => {
        clearTimeout(timer);
        if (last) stationComplete(station);
        else playRound(station, idx + 1);
      };
      next.querySelector('button').onclick = () => { sfx.tap(); go(); };
      const timer = setTimeout(go, last ? 2600 : 3200);
      addCleanup(() => clearTimeout(timer));
    }

    const players = {
      intro: playIntro, match: playMatch, count: playCount, trace: playTrace, order: playOrder, fill: playFill, rows: playRows,
      compare: playCompare, crossout: playCrossout, pairs: playPairs, pick: playPick, lesson: playLesson,
      chart: playChart, letter: playLetter, find: playFind,
    };
    players[round.type](ctx);
  }

  function stationComplete(station) {
    runCleanup();
    const i = STATIONS.indexOf(station);
    const next = STATIONS[i + 1];
    const done = solvedCount(station) === station.rounds.length;
    app.innerHTML = `
      <div class="pk pk-win-page">
        <div class="pk-sky" aria-hidden="true"><span class="pk-cloud c1"></span><span class="pk-cloud c2"></span><span class="pk-cloud c3"></span></div>
        <div class="pk-win">
          <div class="pk-win-trophy">🏆</div>
          <h1>${done ? 'Hoàn thành!' : 'Bé chơi giỏi lắm!'}</h1>
          <p>${station.n ? `Bài ${station.n}: Số ${station.n}` : station.title}</p>
          <div class="pk-win-stars">⭐ ${stationStars(station)} / ${stationMaxStars(station)}</div>
          <div class="pk-win-actions">
            <button type="button" class="pk-btn pk-btn-ghost" id="pk-map">🗺️ Bản đồ</button>
            ${next ? `<button type="button" class="pk-btn pk-btn-go" id="pk-go">Chơi tiếp ➜</button>` : ''}
          </div>
        </div>
      </div>`;
    sfx.fanfare();
    rain(3000);
    say(done ? 'Hoan hô! Bé đã hoàn thành trạm này rồi!' : 'Bé chơi giỏi lắm!');
    app.querySelector('#pk-map').onclick = () => showMap();
    app.querySelector('#pk-go')?.addEventListener('click', () => openStation(next));
  }

  // ════════════════════════════════════════════════════════════════════════
  // Chạm để đếm: mỗi lần chạm một đồ vật hiện số thứ tự và đọc to số đếm.
  // `items` = khung từng đồ vật (% của hình); không có thì chạm chỗ nào đặt dấu chỗ đó.
  // ════════════════════════════════════════════════════════════════════════
  function countingPicture(src, items, { alt = '', onCount } = {}) {
    const wrap = document.createElement('div');
    wrap.className = 'pk-pic';
    wrap.innerHTML = `
      <img src="${src}" alt="${alt}" draggable="false">
      <div class="pk-pic-layer"></div>
      <button type="button" class="pk-recount" hidden aria-label="Đếm lại">↺</button>`;
    const layer = wrap.querySelector('.pk-pic-layer');
    const recount = wrap.querySelector('.pk-recount');
    let count = 0;

    const mark = (x, y, host) => {
      count++;
      const b = document.createElement('span');
      b.className = 'pk-mark';
      b.textContent = count;
      b.style.background = NUMBER_COLORS[(count % 10) || 10];
      if (host) host.appendChild(b);
      else { b.style.left = `${x}%`; b.style.top = `${y}%`; b.classList.add('is-free'); layer.appendChild(b); }
      sfx.pop(Math.min(count, 12));
      say(numberWord(Math.min(count, 20)));
      recount.hidden = false;
      onCount?.(count);
    };

    if (items?.length) {
      items.forEach(([x, y, w, h]) => {
        const hit = document.createElement('button');
        hit.type = 'button';
        hit.className = 'pk-item';
        hit.style.cssText = `left:${x}%;top:${y}%;width:${w}%;height:${h}%`;
        hit.onclick = (e) => {
          e.stopPropagation();
          if (hit.classList.contains('is-counted')) { shake(hit); return; }
          hit.classList.add('is-counted');
          mark(0, 0, hit);
        };
        layer.appendChild(hit);
      });
    } else {
      layer.addEventListener('click', (e) => {
        if (e.target.closest('.pk-mark')) { // chạm lại dấu vừa đặt: xoá dấu cuối
          const marks = layer.querySelectorAll('.pk-mark');
          if (e.target === marks[marks.length - 1]) { marks[marks.length - 1].remove(); count--; sfx.tap(); onCount?.(count); }
          return;
        }
        const r = layer.getBoundingClientRect();
        mark(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100);
      });
    }

    recount.onclick = (e) => {
      e.stopPropagation();
      count = 0;
      layer.querySelectorAll('.pk-mark').forEach(m => m.remove());
      layer.querySelectorAll('.pk-item').forEach(m => m.classList.remove('is-counted'));
      recount.hidden = true;
      sfx.tap();
      onCount?.(0);
    };
    return { el: wrap, get count() { return count; }, celebrate() { wrap.classList.add('is-won'); } };
  }

  /** Hàng số tròn để chọn đáp án. Trả về phần tử; `onPick(n, btn)`. */
  function numberChoices(options, onPick) {
    const row = document.createElement('div');
    row.className = `pk-choices${options.length > 10 ? ' is-wide' : ''}`;
    row.innerHTML = options.map(n => `<button type="button" class="pk-choice" data-n="${n}" style="--c:${colorOf(n % 10 || 10)}">${n}</button>`).join('');
    row.querySelectorAll('.pk-choice').forEach(b => { b.onclick = () => onPick(Number(b.dataset.n), b); });
    return row;
  }

  /** Vòng tròn "khoanh" vẽ tay quanh số đúng. */
  function circleIt(btn) {
    btn.classList.add('is-right');
    btn.insertAdjacentHTML('beforeend', '<svg class="pk-circle" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 6 C80 4 96 26 94 52 C92 80 70 96 46 94 C20 92 4 72 6 46 C8 22 28 8 56 8"/></svg>');
  }

  // ── Làm quen số ────────────────────────────────────────────────────────
  function playIntro({ round, stage, talk, solve }) {
    const { n } = round;
    const w = numberWord(n);
    const color = colorOf(n);
    stage.innerHTML = `
      <div class="pk-intro">
        <button type="button" class="pk-bigcard" style="--c:${color}" aria-label="Số ${w}">
          <span class="pk-bignum">${n}</span>
          <span class="pk-bigword">Số ${w}</span>
        </button>
        <div class="pk-intro-pic"></div>
      </div>
      <div class="pk-paint">
        <p class="pk-hint">🎨 Chạm để tô màu các số ${n}</p>
        <div class="pk-paint-row">${Array.from({ length: PAINT_COUNT }, () => `<button type="button" class="pk-outline" style="--c:${color}">${n}</button>`).join('')}</div>
      </div>`;
    const pic = countingPicture(round.img, round.items, { alt: round.caption });
    stage.querySelector('.pk-intro-pic').append(pic.el);
    pic.el.insertAdjacentHTML('beforeend', `<button type="button" class="pk-caption">${round.caption}</button>`);
    pic.el.querySelector('.pk-caption').onclick = (e) => { e.stopPropagation(); sfx.tap(); say(round.caption); };

    const card = stage.querySelector('.pk-bigcard');
    card.onclick = () => {
      sfx.pop(n);
      card.classList.remove('is-bounce'); void card.offsetWidth; card.classList.add('is-bounce');
      say(`Số ${w}`);
    };
    let painted = 0;
    stage.querySelectorAll('.pk-outline').forEach(b => {
      b.onclick = () => {
        if (b.classList.contains('is-painted')) return;
        b.classList.add('is-painted');
        painted++;
        sfx.pop(painted);
        const [x, y] = centerOf(b);
        burst(x, y, { count: 8 });
        say(w);
        if (painted === PAINT_COUNT) setTimeout(() => solve(`Giỏi quá! Đây là số ${w}!`), 350);
      };
    });
    talk(`Đây là số ${w}. ${round.caption}. Bé chạm vào hình để đếm, rồi tô màu các số ${w} nhé!`);
  }

  // ── Nối số với hình ────────────────────────────────────────────────────
  function playMatch({ round, stage, talk, wrong, right, solve }) {
    const { n, answers } = round;
    const w = numberWord(n);
    stage.innerHTML = `
      <div class="pk-match">
        <svg class="pk-match-lines" aria-hidden="true"></svg>
        ${round.choices.map((src, k) => `<button type="button" class="pk-card pk-match-card k${k}" data-k="${k}"><img src="${src}" alt="" draggable="false"></button>`).join('')}
        <div class="pk-match-num" style="--c:${colorOf(n)}">${n}</div>
      </div>`;
    const box = stage.querySelector('.pk-match');
    const lines = stage.querySelector('.pk-match-lines');
    const num = stage.querySelector('.pk-match-num');
    const found = new Set();

    const drawLine = (card) => {
      const b = box.getBoundingClientRect();
      const [x1, y1] = centerOf(num);
      const [x2, y2] = centerOf(card);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1 - b.left); line.setAttribute('y1', y1 - b.top);
      line.setAttribute('x2', x2 - b.left); line.setAttribute('y2', y2 - b.top);
      line.style.stroke = colorOf(n);
      lines.appendChild(line);
    };

    stage.querySelectorAll('.pk-match-card').forEach(card => {
      card.onclick = () => {
        const k = Number(card.dataset.k);
        if (found.has(k)) return;
        if (!answers.includes(k)) { wrong(card, `Hình này chưa đúng. Bé đếm lại xem có đủ ${w} không nhé!`); return; }
        found.add(k);
        card.classList.add('is-right');
        drawLine(card);
        if (found.size === answers.length) solve(`Đúng rồi! Hình này có ${w}!`);
        else right(card, 'Đúng rồi! Còn một hình nữa đấy!');
      };
    });
    talk(answers.length > 1
      ? `Bé hãy tìm các hình có ${w} đồ vật để nối với số ${w}. Có ${numberWord(answers.length)} hình đúng đấy!`
      : `Bé hãy tìm hình có ${w} đồ vật để nối với số ${w} nhé!`);
  }

  // ── Đếm rồi chọn số ────────────────────────────────────────────────────
  function playCount({ station, round, stage, talk, wrong, solve }) {
    const pic = countingPicture(round.img, round.items);
    stage.innerHTML = '<div class="pk-count"></div>';
    const box = stage.querySelector('.pk-count');
    box.append(pic.el);
    let done = false;
    box.append(numberChoices(round.options, (v, btn) => {
      if (done) return;
      if (v !== round.answer) { wrong(btn, pic.count ? 'Chưa đúng rồi. Bé đếm lại thật chậm nhé!' : 'Chưa đúng rồi. Bé chạm vào từng hình để đếm nhé!'); return; }
      done = true;
      circleIt(btn);
      pic.celebrate();
      solve(round.thing ? `Đúng rồi! Có ${numberWord(v)} ${round.thing}!` : `Đúng rồi! Có ${numberWord(v)}!`);
    }));
    const circle = station.id.startsWith('khoanh');
    talk(round.thing
      ? `Có mấy ${round.thing}? Bé chạm vào từng ${round.thing} để đếm, rồi chọn số đúng nhé!`
      : circle ? 'Bé đếm xem có bao nhiêu, rồi khoanh vào số đúng nhé!' : 'Bé hãy đếm đồ vật, rồi chọn số để điền vào ô trống nhé!');
  }

  // ── Tô số ──────────────────────────────────────────────────────────────
  function playTrace({ round, stage, talk, solve }) {
    const { n } = round;
    const w = numberWord(n);
    let rep = 0;
    stage.innerHTML = `
      <div class="pk-trace">
        <div class="pk-trace-reps">${Array.from({ length: TRACE_REPS }, (_, i) => `<span class="pk-trace-rep" data-i="${i}">${n}</span>`).join('')}</div>
        <div class="pk-trace-board" id="pk-board"></div>
      </div>`;
    const board = stage.querySelector('#pk-board');
    let tracer = null;
    const start = () => {
      tracer?.destroy();
      tracer = mountTracer(board, n, {
        color: colorOf(n),
        onTouch: (ok) => { if (!ok) talk('Bé đặt ngón tay vào chấm xanh nhé!', { keep: true }); },
        onStroke: () => sfx.swish(),
        onDone: () => {
          const repEl = stage.querySelector(`.pk-trace-rep[data-i="${rep}"]`);
          repEl.classList.add('is-done');
          const [x, y] = centerOf(board);
          burst(x, y, { count: 16, emoji: '⭐' });
          rep++;
          if (rep >= TRACE_REPS) { solve(`Giỏi quá! Bé đã viết được số ${w}!`); return; }
          sfx.ding();
          say(rep === TRACE_REPS - 1 ? 'Giỏi quá! Thêm một lần nữa nhé!' : 'Giỏi quá! Tô lại lần nữa nào!');
          setTimeout(start, 900);
        },
      });
    };
    start();
    addCleanup(() => tracer?.destroy());
    talk(`Bé đặt ngón tay vào chấm xanh, rồi tô theo nét số ${w} nhé!`);
  }

  // ── Chạm theo thứ tự ───────────────────────────────────────────────────
  function playOrder({ round, stage, talk, wrong, solve }) {
    stage.innerHTML = `<div class="pk-scene"><div class="pk-scene-in"><img src="${round.img}" alt="" draggable="false">${round.zones.map(([x, y, w], k) => `<button type="button" class="pk-zone pk-zone-tap" data-k="${k}" style="left:${x}%;top:${y}%;width:${w * 1.15}%" aria-label="Số ${k + 1}"></button>`).join('')}</div></div>`;
    let next = 0;
    stage.querySelectorAll('.pk-zone').forEach(z => {
      z.onclick = () => {
        const k = Number(z.dataset.k);
        if (k < next) return;
        if (k !== next) {
          wrong(z, `Chưa đúng rồi. Bé tìm quả số ${numberWord(next + 1)} nhé!`);
          stage.querySelector(`.pk-zone[data-k="${next}"]`).classList.add('is-hint');
          return;
        }
        z.classList.remove('is-hint');
        z.classList.add('is-right');
        next++;
        sfx.pop(next);
        const [x, y] = centerOf(z);
        burst(x, y, { count: 8 });
        say(numberWord(next));
        if (next === round.zones.length) setTimeout(() => solve('Giỏi quá! Bé đếm từ một đến mười rồi!'), 400);
      };
    });
    talk('Bé chạm vào các quả dâu theo thứ tự từ một đến mười nhé!');
  }

  // ── Kéo số vào ô trống ─────────────────────────────────────────────────
  function playFill({ station, round, stage, talk, wrong, right, solve }) {
    const values = shuffle(round.blanks.map(b => b.value));
    stage.innerHTML = `
      <div class="pk-scene pk-fill"><div class="pk-scene-in">
        <img src="${round.img}" alt="" draggable="false">
        ${round.blanks.map(({ zone: [x, y, w] }, k) => `<div class="pk-zone pk-slot" data-k="${k}" style="left:${x}%;top:${y}%;width:${w}%"></div>`).join('')}
      </div></div>
      <div class="pk-tiles">${values.map(v => `<button type="button" class="pk-tile" data-v="${v}" style="--c:${colorOf(v)}">${v}</button>`).join('')}</div>`;
    const slots = [...stage.querySelectorAll('.pk-slot')];
    let picked = null;
    let left = round.blanks.length;

    const place = (tile, slot) => {
      const k = Number(slot.dataset.k);
      const v = Number(tile.dataset.v);
      if (slot.classList.contains('is-filled')) return false;
      if (round.blanks[k].value !== v) {
        wrong(slot, 'Chưa đúng chỗ rồi. Bé đếm lại các số xem nhé!');
        tile.classList.remove('is-picked');
        return false;
      }
      slot.classList.add('is-filled');
      slot.innerHTML = `<span style="color:${colorOf(v)}">${v}</span>`;
      tile.classList.add('is-used');
      tile.disabled = true;
      left--;
      say(numberWord(v));
      if (left === 0) solve('Giỏi quá! Bé điền đủ các số rồi!');
      else right(slot);
      return true;
    };

    // Chạm số rồi chạm ô (dễ cho bé nhỏ), hoặc kéo thả.
    stage.querySelectorAll('.pk-tile').forEach(tile => {
      tile.addEventListener('pointerdown', (e) => startDrag(e, tile));
    });
    slots.forEach(slot => {
      slot.addEventListener('click', () => {
        if (picked) { place(picked, slot); picked.classList.remove('is-picked'); picked = null; }
        else { sfx.tap(); talk('Bé chọn một số ở dưới trước nhé!', { keep: true }); }
      });
    });

    function startDrag(e, tile) {
      if (tile.disabled) return;
      e.preventDefault();
      const sx = e.clientX, sy = e.clientY;
      let ghost = null;
      const moveH = (ev) => {
        if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) {
          ghost = tile.cloneNode(true);
          ghost.classList.add('pk-ghost');
          document.body.appendChild(ghost);
          tile.classList.add('is-dragging');
        }
        if (ghost) {
          ghost.style.left = `${ev.clientX}px`;
          ghost.style.top = `${ev.clientY}px`;
          slots.forEach(s => s.classList.toggle('is-over', hitTest(s, ev)));
        }
      };
      const upH = (ev) => {
        window.removeEventListener('pointermove', moveH);
        window.removeEventListener('pointerup', upH);
        window.removeEventListener('pointercancel', upH);
        tile.classList.remove('is-dragging');
        slots.forEach(s => s.classList.remove('is-over'));
        if (!ghost) { // chỉ chạm: chọn số
          stage.querySelectorAll('.pk-tile').forEach(t => t.classList.toggle('is-picked', t === tile && picked !== tile));
          picked = picked === tile ? null : tile;
          sfx.pop(Number(tile.dataset.v));
          say(numberWord(Number(tile.dataset.v)));
          return;
        }
        ghost.remove();
        const slot = slots.find(s => hitTest(s, ev));
        if (slot) place(tile, slot);
      };
      window.addEventListener('pointermove', moveH);
      window.addEventListener('pointerup', upH);
      window.addEventListener('pointercancel', upH);
    }

    const hitTest = (el, ev) => {
      const r = el.getBoundingClientRect();
      const pad = r.width * 0.35;
      return ev.clientX > r.left - pad && ev.clientX < r.right + pad && ev.clientY > r.top - pad && ev.clientY < r.bottom + pad;
    };

    const prompts = {
      'doan-tau': 'Toa tàu nào còn thiếu số? Bé kéo số vào đúng toa tàu nhé!',
      'bong-bay': 'Quả bóng nào còn thiếu số? Bé kéo số vào đúng quả bóng nhé!',
    };
    talk(prompts[station.id] || `Bé kéo số vào ${round.fruit || 'ô'} còn trống, theo thứ tự từ một đến mười nhé!`);
  }

  // ── Hàng trên + hàng dưới = tổng (11–20) ───────────────────────────────
  function playRows({ round, stage, talk, wrong, right, solve }) {
    const steps = [
      { label: 'Hàng trên', answer: round.top, band: 'top', say: 'Hàng trên có mấy đồ vật? Bé đếm rồi chọn số nhé!' },
      { label: 'Hàng dưới', answer: round.bottom, band: 'bottom', say: 'Hàng dưới có mấy đồ vật?' },
      { label: 'Tổng', answer: round.top + round.bottom, band: 'all', say: 'Cả hai hàng có tất cả bao nhiêu đồ vật? Bé đếm tiếp nhé!' },
    ];
    let step = 0;
    const pic = countingPicture(round.img, null);
    stage.innerHTML = `
      <div class="pk-rows">
        <div class="pk-rows-pic"><div class="pk-band-box"><div class="pk-band"></div></div></div>
        <div class="pk-rows-sum">
          ${steps.map((s, i) => `${i === 2 ? '<span class="pk-eq">=</span>' : i === 1 ? '<span class="pk-eq">+</span>' : ''}<div class="pk-sumbox" data-i="${i}"><small>${s.label}</small><b>?</b></div>`).join('')}
        </div>
      </div>`;
    stage.querySelector('.pk-rows-pic').prepend(pic.el);
    pic.el.append(stage.querySelector('.pk-band-box'));
    const band = stage.querySelector('.pk-band');
    const pad = numberChoices(Array.from({ length: 20 }, (_, i) => i + 1), (v, btn) => {
      const s = steps[step];
      if (!s) return;
      if (v !== s.answer) { wrong(btn, 'Chưa đúng rồi. Bé đếm lại nhé!'); return; }
      const box = stage.querySelector(`.pk-sumbox[data-i="${step}"]`);
      box.classList.add('is-done');
      box.querySelector('b').textContent = v;
      step++;
      if (step === steps.length) { solve(`Đúng rồi! ${numberWord(round.top)} với ${numberWord(round.bottom)} là ${numberWord(v)}!`); band.dataset.band = ''; return; }
      right(box, `Đúng rồi! ${numberWord(v)}!`);
      setTimeout(() => setStep(), 900);
    });
    pad.classList.add('is-pad');
    stage.querySelector('.pk-rows').append(pad);

    const setStep = () => {
      stage.querySelectorAll('.pk-sumbox').forEach((b, i) => b.classList.toggle('is-on', i === step));
      const [[t0, t1], [b0, b1]] = round.bands;
      const [y0, y1] = { top: [t0, t1], bottom: [b0, b1], all: [t0, b1] }[steps[step].band];
      band.style.top = `${y0}%`;
      band.style.height = `${y1 - y0}%`;
      band.dataset.band = steps[step].band;
      talk(steps[step].say);
    };
    setStep();
  }

  // ════════════════════════════════════════════════════════════════════════
  // Tập 2: So sánh
  // ════════════════════════════════════════════════════════════════════════
  const SIGN_WORD = { '<': 'bé hơn', '>': 'lớn hơn', '=': 'bằng' };
  const relation = (a, b) => (a > b ? '>' : a < b ? '<' : '=');
  const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
  const signPad = (onPick) => {
    const row = document.createElement('div');
    row.className = 'pk-signs';
    row.innerHTML = ['<', '=', '>'].map(sg => `<button type="button" class="pk-sign-btn" data-s="${sg}" aria-label="Dấu ${SIGN_WORD[sg]}">${sg}</button>`).join('');
    row.querySelectorAll('.pk-sign-btn').forEach(b => { b.onclick = () => onPick(b.dataset.s, b); });
    return row;
  };

  // ── So sánh hai nhóm ───────────────────────────────────────────────────
  function playCompare({ round, stage, talk, wrong, right, solve }) {
    const [a, b] = round.counts;
    const mode = round.steps || 'full';
    const rel = relation(a, b);
    const rows = round.layout === 'rows';
    const single = !!round.img;
    const sideName = single ? ['nhóm bên trái', 'nhóm bên phải'] : rows ? ['hàng trên', 'hàng dưới'] : ['bên trái', 'bên phải'];
    const sentence = round.say || cap(`${numberWord(a)} ${SIGN_WORD[rel]} ${numberWord(b)}.`);
    const numBox = (i) => (mode === 'sign' ? '' : `<div class="pk-numbox" data-i="${i}"><b>?</b></div>`);

    stage.innerHTML = single
      ? `<div class="pk-cmp is-single"><div class="pk-cmp-side" data-side="0"><div class="pk-cmp-pic"></div></div></div>
         <div class="pk-cmp-eq">${numBox(0)}<div class="pk-sign-slot">?</div>${numBox(1)}</div>
         <div class="pk-cmp-pad"></div>`
      : `<div class="pk-cmp${rows ? ' is-rows' : ''}">
           <div class="pk-cmp-side" data-side="0"><div class="pk-cmp-pic"></div>${numBox(0)}</div>
           <div class="pk-cmp-mid"><div class="pk-sign-slot">?</div></div>
           <div class="pk-cmp-side" data-side="1"><div class="pk-cmp-pic"></div>${numBox(1)}</div>
         </div>
         <div class="pk-cmp-pad"></div>`;

    const sides = [...stage.querySelectorAll('.pk-cmp-side')];
    const pics = single ? [countingPicture(round.img, null)] : round.imgs.map(src => countingPicture(src, null));
    pics.forEach((pic, i) => sides[i].querySelector('.pk-cmp-pic').append(pic.el));
    const slot = stage.querySelector('.pk-sign-slot');
    const pad = stage.querySelector('.pk-cmp-pad');
    const box = (i) => stage.querySelector(`.pk-numbox[data-i="${i}"]`);
    const max = Math.max(a, b) > 10 ? 20 : 10;

    const steps = [];
    if (mode !== 'sign') steps.push({ kind: 'num', i: 0 }, { kind: 'num', i: 1 });
    steps.push({ kind: mode === 'more' ? 'more' : 'sign' });
    let step = 0;
    let done = false;

    const highlight = (i) => {
      sides.forEach((el, k) => el.classList.toggle('is-on', !single && k === i));
      stage.querySelectorAll('.pk-numbox').forEach(el => el.classList.toggle('is-on', Number(el.dataset.i) === i));
      slot.classList.toggle('is-on', i === -1 && steps[step].kind === 'sign');
    };

    const finish = () => {
      done = true;
      slot.textContent = rel;
      slot.classList.remove('is-on');
      slot.classList.add('is-done');
      sides.forEach(el => el.classList.remove('is-on', 'is-pickable'));
      solve(`Đúng rồi! ${sentence}`);
    };

    const next = () => {
      const st = steps[step];
      pad.innerHTML = '';
      highlight(st.kind === 'num' ? st.i : -1);
      if (st.kind === 'num') {
        const choices = numberChoices(Array.from({ length: max }, (_, k) => k + 1), (v, btn) => {
          if (done) return;
          if (v !== round.counts[st.i]) { wrong(btn, `Chưa đúng rồi. Bé chạm vào từng cái ở ${sideName[st.i]} để đếm lại nhé!`); return; }
          const el = box(st.i);
          el.classList.add('is-done');
          el.querySelector('b').textContent = v;
          step++;
          right(el, `Đúng rồi! ${numberWord(v)}!`);
          setTimeout(next, 800);
        });
        choices.classList.add('is-pad');
        pad.append(choices);
        talk(`${cap(sideName[st.i])} có mấy cái? Bé chạm để đếm, rồi chọn số nhé!`);
      } else if (st.kind === 'sign') {
        pad.append(signPad((sg, btn) => {
          if (done) return;
          if (sg !== rel) {
            wrong(btn, sg === '=' ? 'Hai bên chưa bằng nhau đâu. Bé đếm lại nhé!'
              : rel === '=' ? 'Hai bên bằng nhau đấy. Bé chọn dấu bằng nhé!'
                : 'Chưa đúng rồi. Miệng dấu luôn mở về phía nhiều hơn đấy!');
            return;
          }
          btn.classList.add('is-right');
          finish();
        }));
        talk(mode === 'sign'
          ? 'Bé đếm hai bên, rồi chọn dấu bé hơn, bằng, hay lớn hơn nhé!'
          : cap(`${numberWord(a)} với ${numberWord(b)}. Bé chọn dấu nào?`));
      } else {
        sides.forEach((el, k) => {
          el.classList.add('is-pickable');
          el.onclick = (e) => {
            if (done) return;
            e.stopPropagation();
            if ((k === 0) !== (a > b)) { wrong(el, `Chưa đúng rồi. Bên có ${numberWord(Math.max(a, b))} mới là nhiều hơn!`); return; }
            el.classList.add('is-right');
            pics[k].celebrate();
            finish();
          };
        });
        talk(rows ? 'Hàng nào nhiều hơn? Bé chạm vào hàng đó nhé!' : 'Bên nào nhiều hơn? Bé chạm vào bên đó nhé!');
      }
    };
    next();
  }

  // ── Gạch bớt cho hai hàng bằng nhau ────────────────────────────────────
  function playCrossout({ round, stage, talk, wrong, solve }) {
    const n = [0, 1].map(r => round.items.filter(it => it[4] === r).length);
    const long = n[0] > n[1] ? 0 : 1;
    const target = n[1 - long];
    let left = n[long];
    stage.innerHTML = `
      <div class="pk-pic pk-cross"><img src="${round.img}" alt="" draggable="false"><div class="pk-pic-layer"></div></div>
      <div class="pk-cmp-eq">
        <div class="pk-numbox is-done" data-i="0"><small>Hàng trên</small><b>${n[0]}</b></div>
        <div class="pk-sign-slot">${relation(n[0], n[1])}</div>
        <div class="pk-numbox is-done" data-i="1"><small>Hàng dưới</small><b>${n[1]}</b></div>
      </div>`;
    const layer = stage.querySelector('.pk-pic-layer');
    const slot = stage.querySelector('.pk-sign-slot');
    const countEl = stage.querySelector(`.pk-numbox[data-i="${long}"] b`);
    let done = false;
    round.items.forEach(([x, y, w, h, r]) => {
      const hit = document.createElement('button');
      hit.type = 'button';
      hit.className = 'pk-item';
      hit.style.cssText = `left:${x}%;top:${y}%;width:${w}%;height:${h}%`;
      hit.onclick = () => {
        if (done) return;
        if (r !== long) { wrong(hit, 'Hàng này ít hơn rồi. Bé gạch ở hàng nhiều hơn nhé!'); return; }
        const on = hit.classList.toggle('is-crossed');
        left += on ? -1 : 1;
        countEl.textContent = left;
        slot.textContent = long === 0 ? relation(left, target) : relation(target, left);
        if (on) { sfx.swish(); say(numberWord(left)); } else sfx.tap();
        if (left === target) {
          done = true;
          slot.classList.add('is-done');
          solve(`Giỏi quá! Bây giờ hai hàng bằng nhau, đều có ${numberWord(target)}!`);
        }
      };
      layer.appendChild(hit);
    });
    talk('Hàng nào nhiều hơn? Bé chạm để gạch bớt đồ vật ở hàng đó, cho đến khi hai hàng bằng nhau nhé!');
  }

  // ── Nối các nhóm bằng nhau ─────────────────────────────────────────────
  const PAIR_COLORS = ['#EF4444', '#2563EB', '#16A34A', '#F59E0B'];
  function playPairs({ round, stage, talk, wrong, right, solve }) {
    const card = (src, side, i) => `<button type="button" class="pk-card pk-pair" data-side="${side}" data-i="${i}" style="grid-column:${side ? 3 : 1};grid-row:${i + 1}"><img src="${src}" alt="" draggable="false"></button>`;
    stage.innerHTML = `
      <div class="pk-pairs">
        <svg class="pk-match-lines" aria-hidden="true"></svg>
        ${round.left.map((src, i) => card(src, 0, i)).join('')}
        ${round.right.map((src, i) => card(src, 1, i)).join('')}
      </div>`;
    const box = stage.querySelector('.pk-pairs');
    const lines = stage.querySelector('.pk-match-lines');
    const counts = [round.leftCounts, round.rightCounts];
    let sel = null;
    let made = 0;
    const drawLine = (c1, c2, color) => {
      const bb = box.getBoundingClientRect();
      const [l, r] = [c1.getBoundingClientRect(), c2.getBoundingClientRect()].sort((p, q) => p.left - q.left);
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      el.setAttribute('x1', l.right - bb.left); el.setAttribute('y1', l.top + l.height / 2 - bb.top);
      el.setAttribute('x2', r.left - bb.left); el.setAttribute('y2', r.top + r.height / 2 - bb.top);
      el.style.stroke = color;
      lines.appendChild(el);
    };
    stage.querySelectorAll('.pk-pair').forEach(c => {
      c.onclick = () => {
        if (c.classList.contains('is-paired')) return;
        const side = Number(c.dataset.side), i = Number(c.dataset.i);
        if (!sel || Number(sel.dataset.side) === side) {
          sel?.classList.remove('is-picked');
          sel = c;
          c.classList.add('is-picked');
          sfx.pop(counts[side][i]);
          talk('Bây giờ bé tìm nhóm bên kia có số lượng bằng nhóm này nhé!', { keep: true });
          return;
        }
        const other = sel;
        sel = null;
        other.classList.remove('is-picked');
        if (counts[side][i] !== counts[Number(other.dataset.side)][Number(other.dataset.i)]) {
          wrong(c, 'Hai nhóm này chưa bằng nhau. Bé đếm lại nhé!');
          return;
        }
        const color = PAIR_COLORS[made % PAIR_COLORS.length];
        [c, other].forEach(x => { x.classList.add('is-paired'); x.style.setProperty('--pair', color); });
        drawLine(c, other, color);
        made++;
        if (made === round.left.length) solve('Giỏi quá! Bé đã nối đúng hết các nhóm bằng nhau!');
        else right(c, `Đúng rồi! Hai nhóm đều có ${numberWord(counts[side][i])}!`);
      };
    });
    talk('Bé chạm một nhóm, rồi chạm nhóm bên kia có số lượng bằng nhau để nối nhé!');
  }

  // ── Nhiều nhất / ít nhất ───────────────────────────────────────────────
  function playPick({ round, stage, talk, wrong, solve }) {
    const most = round.want === 'most';
    const best = round.counts.indexOf(most ? Math.max(...round.counts) : Math.min(...round.counts));
    stage.innerHTML = `<div class="pk-pick">${round.imgs.map((src, k) => `<button type="button" class="pk-card pk-pick-card" data-k="${k}"><img src="${src}" alt="" draggable="false"></button>`).join('')}</div>`;
    let done = false;
    stage.querySelectorAll('.pk-pick-card').forEach(c => {
      c.onclick = () => {
        if (done) return;
        const k = Number(c.dataset.k);
        if (k !== best) { wrong(c, `Chưa đúng rồi. Hình này có ${numberWord(round.counts[k])} thôi. Bé đếm các hình khác nhé!`); return; }
        done = true;
        c.classList.add('is-right');
        solve(`Đúng rồi! Hình này ${most ? 'nhiều' : 'ít'} nhất, có ${numberWord(round.counts[k])}!`);
      };
    });
    talk(most ? 'Hình nào có nhiều đồ vật nhất? Bé chạm vào hình đó nhé!' : 'Hình nào có ít đồ vật nhất? Bé chạm vào hình đó nhé!');
  }

  // ── Làm quen dấu bé, dấu lớn ───────────────────────────────────────────
  function playLesson({ round, stage, talk, solve }) {
    const INFO = [
      { sign: '<', title: 'Dấu bé', text: 'Dấu bé. Ít hơn thì bé hơn. Mũi nhọn chỉ sang bên trái. Hai bé hơn bốn.' },
      { sign: '>', title: 'Dấu lớn', text: 'Dấu lớn. Nhiều hơn thì lớn hơn. Mũi nhọn chỉ sang bên phải. Tám lớn hơn bốn.' },
    ];
    stage.innerHTML = `<div class="pk-lesson">${round.imgs.map((src, k) => `
      <button type="button" class="pk-card pk-lesson-card" data-k="${k}">
        <img src="${src}" alt="" draggable="false">
        <span class="pk-lesson-title${k ? ' is-gt' : ''}">${INFO[k].sign} ${INFO[k].title}</span>
      </button>`).join('')}</div>`;
    const seen = new Set();
    let timer = null;
    stage.querySelectorAll('.pk-lesson-card').forEach(c => {
      c.onclick = () => {
        const k = Number(c.dataset.k);
        sfx.pop(4 + k * 4);
        c.classList.add('is-right');
        talk(INFO[k].text, { keep: true });
        seen.add(k);
        if (seen.size === 2 && !timer) {
          timer = setTimeout(() => solve('Giỏi quá! Bé đã biết dấu bé và dấu lớn rồi!'), 4500);
          addCleanup(() => clearTimeout(timer));
        }
      };
    });
    talk('Bé chạm vào từng hình để nghe về dấu bé và dấu lớn nhé!');
  }

  // ════════════════════════════════════════════════════════════════════════
  // Làm quen chữ cái (data3.js)
  // ════════════════════════════════════════════════════════════════════════
  // Chữ màu vàng nhạt khó nhìn trên nền trắng khi tô: tô bằng vàng đậm hơn.
  const inkOf = (color) => (color === '#FACC15' ? '#EAB308' : color);
  const letterTile = (item, cls, attrs = '') =>
    `<button type="button" class="pk-abc ${cls}" style="--c:${item.color}" ${attrs}><span class="pk-abc-ch">${item.ch}</span></button>`;

  // ── Bảng chữ: chạm từng chữ để nghe đọc ────────────────────────────────
  function playChart({ round, stage, talk, solve }) {
    const { items, kind } = round;
    stage.innerHTML = `<div class="pk-abc-grid${items.length < 15 ? ' is-few' : ''}">${items.map((it, k) => letterTile(it, 'pk-abc-card', `data-k="${k}"`)).join('')}</div>`;
    const seen = new Set();
    stage.querySelectorAll('.pk-abc-card').forEach(b => {
      b.onclick = () => {
        const k = Number(b.dataset.k);
        sfx.pop(3 + (k % 8));
        say(items[k].name);
        b.classList.remove('is-seen'); void b.offsetWidth; b.classList.add('is-seen');
        seen.add(k);
        if (seen.size === items.length) solve(`Giỏi quá! Bé đã nghe hết các ${kind} rồi!`);
      };
    });
    talk(`Bé chạm vào từng ${kind} để nghe đọc nhé!`);
  }

  // ── Tô chữ bằng ngón tay ───────────────────────────────────────────────
  function playLetter({ round, stage, talk, solve }) {
    const { ch, name, read, color, kind } = round;
    const glyph = letterGlyph(ch);
    const intro = kind === 'dấu' ? `Đây là ${name}. ${read}.` : `Đây là ${kind} ${name}.`;
    let rep = 0;
    stage.innerHTML = `
      <div class="pk-trace pk-letter">
        <div class="pk-trace-reps">
          <button type="button" class="pk-abc pk-letter-card" style="--c:${color}" aria-label="Nghe đọc"><span class="pk-abc-ch">${ch}</span><span class="pk-letter-say">🔊</span></button>
          ${Array.from({ length: LETTER_REPS }, (_, i) => `<span class="pk-trace-rep" data-i="${i}">${ch}</span>`).join('')}
        </div>
        <div class="pk-trace-board is-letter" id="pk-board" style="--ar:${Math.max(1, (glyph.width + 12) / 142).toFixed(3)}"></div>
      </div>`;
    stage.querySelector('.pk-letter-card').onclick = () => { sfx.tap(); say(kind === 'dấu' ? `${name}. ${read}` : name); };
    const board = stage.querySelector('#pk-board');
    let tracer = null;
    const start = () => {
      tracer?.destroy();
      tracer = mountTracer(board, glyph, {
        color: inkOf(color),
        onTouch: (ok) => { if (!ok) talk('Bé đặt ngón tay vào chấm xanh nhé!', { keep: true }); },
        onStroke: () => sfx.swish(),
        onDone: () => {
          stage.querySelector(`.pk-trace-rep[data-i="${rep}"]`).classList.add('is-done');
          const [x, y] = centerOf(board);
          burst(x, y, { count: 16, emoji: '⭐' });
          rep++;
          if (rep >= LETTER_REPS) { solve(`Giỏi quá! Bé đã viết được ${kind === 'dấu' ? `chữ ${read.split(' ').pop()}` : `${kind} ${name}`}!`); return; }
          sfx.ding();
          say('Giỏi quá! Tô lại lần nữa nào!');
          setTimeout(start, 900);
        },
      });
    };
    start();
    addCleanup(() => tracer?.destroy());
    talk(`${intro} Bé đặt ngón tay vào chấm xanh, rồi tô theo nét nhé!`);
  }

  // ── Nghe đọc, chạm đúng chữ ────────────────────────────────────────────
  function playFind({ round, stage, talk, wrong, right, solve }) {
    const { items, kind } = round;
    const order = shuffle(items.map((_, k) => k));
    let step = 0;
    stage.innerHTML = `<div class="pk-abc-find">${shuffle(items.map((it, k) => letterTile(it, 'pk-abc-pick', `data-k="${k}"`))).join('')}</div>`;
    const ask = () => talk(`Bé chạm vào ${kind} ${items[order[step]].name} nhé!`);
    stage.querySelectorAll('.pk-abc-pick').forEach(b => {
      b.onclick = () => {
        if (step >= order.length || b.classList.contains('is-right')) return;
        const k = Number(b.dataset.k);
        const want = items[order[step]];
        if (k !== order[step]) { wrong(b, `Đây là ${kind} ${items[k].name}. Bé tìm ${kind} ${want.name} nhé!`); return; }
        b.classList.add('is-right');
        right(b);
        step++;
        if (step >= order.length) { solve(`Giỏi quá! Bé đã tìm đúng hết các ${kind} rồi!`); return; }
        setTimeout(ask, 700);
      };
    });
    ask();
  }
}
