/**
 * Khung chung của Toán 4 "Học bằng công cụ": dùng lại cảnh lớp học của Luyện Tính (grade3Drills/kit.js:
 * thầy giáo + bong bóng lời, vùng bàn phím, tờ giấy lớn ở giữa). Tờ giấy chứa công cụ (bảng hàng, tia số…).
 *
 * - Khám phá (runExplore): vùng bàn phím thành bảng điều khiển "🔊 Nghe lại / Tiếp ▶". Kịch bản là một dãy bước;
 *   mỗi bước có thể chờ em thao tác trên công cụ (c.until). Không chấm.
 * - Thực hành (practice.js): vòng chơi chung grade3Games/loop.js, bàn phím số như Luyện Tính.
 */

import { mountDrill, sleep as rawSleep, INK } from '../grade3Drills/kit.js';
import { injectGameStyles } from '../grade3Games/styles.js';
import { say as fxSay, stopSpeaking, whenQuiet, isMuted, setMuted, sfx, rain } from '../preschool/fx.js';
import { exitGameMode } from '../grade3Games/loop.js';
import { scopedKey } from '../../engine/auth.js';

export { INK, sfx };

/** Một lần chèn CSS theo id. */
export function css(id, text) {
  if (document.getElementById(id)) return;
  const s = document.createElement('style');
  s.id = id;
  s.textContent = text;
  document.head.appendChild(s);
}

/** Bộ phát sự kiện nhỏ cho công cụ: t.on('change', fn) / emit. */
export function emitter(obj = {}) {
  const fns = new Set();
  obj.on = (fn) => { fns.add(fn); return () => fns.delete(fn); };
  obj.emit = (...a) => { for (const f of [...fns]) f(...a); };
  return obj;
}

// ── Tiến độ: bài đã khám phá (đồng bộ Drive qua tth:data-changed) ─────────────────────────────────────
const SEEN_KEY = 'g4tools-v1';
export function loadSeen() {
  try { return JSON.parse(localStorage.getItem(scopedKey(SEEN_KEY))) || {}; } catch { return {}; }
}
export function markSeen(id) {
  const d = loadSeen();
  if (d[id]) return;
  d[id] = 1;
  try { localStorage.setItem(scopedKey(SEEN_KEY), JSON.stringify(d)); } catch { /* storage unavailable */ }
  window.dispatchEvent(new CustomEvent('tth:data-changed'));
}

const ABORT = Symbol('abort');

/**
 * Chạy phần Khám phá của một bài.
 *   title: tiêu đề thanh trên; setup(board) → công cụ (gắn vào tờ giấy); steps: [async (c) => …].
 *   c = { t (công cụ), board, say(text, shown?) → chờ đọc xong, show(html), hint(text), sleep(ms),
 *         until(tool, pred, { nudge, el }) → chờ em thao tác đúng, tap(el) → chờ em bấm el }.
 *   onExit(): về màn bài; onPractice(): sang Thực hành.
 */
export function runExplore(app, { id, title, icon = '🔎', setup, steps, onExit, onPractice }) {
  injectGameStyles();
  injectFrameStyles();
  document.body.classList.add('g3g-playing');
  let alive = true;
  let run = 0; // lần chạy (Xem lại từ đầu → lần mới; bước cũ đang chờ thì bỏ)
  app.innerHTML = `
    <div class="g3g-wrap g3g-play g4-play">
      <div class="g3g-topbar">
        <button type="button" class="g3g-icon-btn" data-act="quit" aria-label="Thoát">✕</button>
        <div class="g3g-top-title">${icon} ${title}</div>
        <div class="g3g-dots g4-steps">${steps.map((_, i) => `<span class="g3g-dot" data-dot="${i}"></span>`).join('')}</div>
        <button type="button" class="g3g-icon-btn" data-act="mute" aria-label="Bật/tắt tiếng">${isMuted() ? '🔇' : '🔊'}</button>
      </div>
      <div class="g3g-stage"></div>
    </div>`;
  const stage = app.querySelector('.g3g-stage');
  const quit = () => { alive = false; stopSpeaking(); exitGameMode(); onExit(); };
  app.querySelector('[data-act="quit"]').onclick = quit;
  const muteBtn = app.querySelector('[data-act="mute"]');
  muteBtn.onclick = () => { setMuted(!isMuted()); muteBtn.textContent = isMuted() ? '🔇' : '🔊'; };

  let drill, t, nav, nextBtn, lastSaid = '';
  function mount() {
    drill = mountDrill(stage, { api: { say: fxSay }, board: '<div class="g4-board"></div>', cls: 'g4-scene' });
    const zone = drill.scene.querySelector('.g3d-padzone');
    zone.innerHTML = `<div class="g4-nav">
        <button type="button" class="g4-nav-btn g4-replay" aria-label="Nghe lại">🔊 <span>Nghe lại</span></button>
        <button type="button" class="g4-nav-btn g4-next" disabled>Tiếp ▶</button>
      </div>`;
    nav = zone.querySelector('.g4-nav');
    nextBtn = nav.querySelector('.g4-next');
    nav.querySelector('.g4-replay').onclick = () => { if (lastSaid) fxSay(lastSaid); };
    t = setup(drill.scene.querySelector('.g4-board'));
  }

  const check = (r) => { if (!alive || r !== run) throw ABORT; };
  const ctx = (r) => {
    const c = {
      get t() { return t; },
      get board() { return drill.scene.querySelector('.g4-board'); },
      get scene() { return drill.scene; },
      async sleep(ms) { await rawSleep(ms); check(r); },
      /** Thầy nói (có giọng) rồi chờ đọc xong. */
      async say(text, shown) {
        check(r);
        lastSaid = text.replace(/<[^>]*>/g, '');
        drill.say(text, shown);
        await new Promise(res => whenQuiet(res, { min: Math.min(2600, 500 + lastSaid.length * 35), max: 14000 }));
        check(r);
      },
      /** Chỉ đổi chữ trong bong bóng (không đọc). */
      show(html) { drill.show(html); },
      hint(text, shown) { lastSaid = text; drill.hint(text, shown); },
      /** Đổi công cụ trên tờ giấy (vd. từ bảng hàng sang tia số). */
      use(make) { check(r); t = make(drill.scene.querySelector('.g4-board')); return t; },
      /**
       * Chờ em thao tác trên công cụ tới khi pred() đúng. nudge: câu nhắc sau 14 giây chưa xong; el: phần tử
       * nhấp nháy khi nhắc (hàm hoặc phần tử).
       */
      until(tool, pred, { nudge = '', el = null } = {}) {
        check(r);
        if (pred()) return Promise.resolve();
        return new Promise((res, rej) => {
          let timer;
          const arm = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
              if (!alive || r !== run) return;
              if (nudge) c.hint(typeof nudge === 'function' ? nudge() : nudge);
              const e = typeof el === 'function' ? el() : el;
              if (e) { e.classList.remove('g4-nudge'); void e.getBoundingClientRect(); e.classList.add('g4-nudge'); }
              arm();
            }, 14000);
          };
          arm();
          if (import.meta.env.DEV) window.__g4until = { skip: () => { off(); clearTimeout(timer); res(); } };
          const off = tool.on(() => {
            if (!alive || r !== run) { off(); clearTimeout(timer); rej(ABORT); return; }
            arm();
            if (pred()) { off(); clearTimeout(timer); res(); }
          });
        }).then(() => check(r));
      },
      /**
       * Nút chọn to đè lên đáy tờ giấy. options: [{ html, value }] | chuỗi. Chờ em chọn đúng (sai thì nhắc `hint`).
       * Trả về Promise(lần chọn đầu có đúng không).
       */
      choose(options, answer, { hint = '' } = {}) {
        check(r);
        const opts = options.map(o => (typeof o === 'object' ? o : { html: String(o), value: o }));
        const box = document.createElement('div');
        box.className = 'g4-ov-choices';
        box.innerHTML = opts.map((o, i) => `<button type="button" class="g4-choice" data-i="${i}">${o.html}</button>`).join('');
        c.board.append(box);
        if (import.meta.env.DEV) window.__g4ex = { box, index: answer === undefined ? 0 : opts.findIndex(o => o.value === answer) };
        let first = true;
        return new Promise((res) => {
          box.onclick = (e) => {
            const b = e.target.closest('.g4-choice');
            if (!b || b.disabled) return;
            const o = opts[+b.dataset.i];
            if (answer === undefined || o.value === answer) { // không có đáp án: chọn gì cũng được (trả về giá trị chọn)
              b.classList.add('g4-choice-ok');
              box.querySelectorAll('.g4-choice').forEach(x => { x.disabled = true; });
              sfx.ding();
              setTimeout(() => box.remove(), answer === undefined ? 500 : 1400);
              res(answer === undefined ? o.value : first);
              return;
            }
            first = false;
            b.classList.add('g4-choice-bad');
            b.disabled = true;
            sfx.boing();
            if (hint) c.hint(typeof hint === 'function' ? hint(o.value) : hint);
          };
        }).then((v) => { check(r); return v; });
      },
      /** Chờ em bấm một phần tử (nút trên công cụ). */
      tap(el) {
        check(r);
        return new Promise((res) => {
          el.classList.add('g4-tapme');
          el.addEventListener('click', () => { el.classList.remove('g4-tapme'); sfx.tap(); res(); }, { once: true });
        }).then(() => check(r));
      },
    };
    return c;
  };

  const waitNext = (label) => new Promise((res) => {
    nextBtn.textContent = label;
    nextBtn.disabled = false;
    nextBtn.classList.add('g4-ready');
    nextBtn.onclick = () => { sfx.tap(); stopSpeaking(); nextBtn.disabled = true; nextBtn.classList.remove('g4-ready'); res(); };
  });

  function markDot(i, done) {
    app.querySelectorAll('.g4-steps .g3g-dot').forEach((d, k) => {
      d.classList.toggle('g3g-dot-now', k === i && !done);
      d.classList.toggle('g3g-dot-ok', k < i || (k === i && done));
      d.textContent = k < i || (k === i && done) ? '✓' : '';
    });
  }

  async function play() {
    const r = ++run;
    mount();
    try {
      for (let i = 0; i < steps.length; i++) {
        markDot(i, false);
        await steps[i](ctx(r));
        check(r);
        markDot(i, true);
        if (i < steps.length - 1) { await waitNext('Tiếp ▶'); check(r); }
      }
      finish();
    } catch (e) {
      if (e !== ABORT) throw e;
    }
  }

  function finish() {
    markSeen(id);
    sfx.fanfare();
    rain(1800);
    nav.innerHTML = `
      <div class="g4-end">
        <div class="g4-end-title">🎉 Em đã khám phá xong!</div>
        ${onPractice ? '<button type="button" class="g4-nav-btn g4-next g4-ready" data-act="practice">✏️ Thực hành</button>' : ''}
        <button type="button" class="g4-nav-btn g4-again" data-act="again">🔁 Xem lại</button>
        <button type="button" class="g4-nav-btn g4-again" data-act="back">← Về bài học</button>
      </div>`;
    nav.querySelector('[data-act="again"]').onclick = () => { stopSpeaking(); play(); };
    nav.querySelector('[data-act="back"]').onclick = quit;
    nav.querySelector('[data-act="practice"]')?.addEventListener('click', () => { alive = false; stopSpeaking(); onPractice(); });
  }

  play();
}

let framed = false;
export function injectFrameStyles() {
  if (framed) return;
  framed = true;
  css('g4-frame', `
    .g4-scene .g3d-paper::before { display: none; }
    .g4n-sp { display: inline-block; width: 0.22em; }
    .g4-choices { flex: none; display: flex; gap: 1.2cqi; min-height: 0; }
    .g4-choices:not(.g4-choices-on) { display: none; }
    .g4-choice { flex: 1 1 0; min-width: 0; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: min(6.4cqh, 3.6cqi); line-height: 1.2; padding: 0.35em 0.4em; background: #fff; color: #1E3A8A;
      border: 3px solid #93C5FD; box-shadow: 0 6px 0 #60A5FA; border-radius: 0.7em; cursor: pointer; touch-action: manipulation; }
    .g4-choice:active { transform: translateY(4px); box-shadow: 0 2px 0 #60A5FA; }
    .g4-choice-ok, .g4-choice-ok:disabled { background: #DCFCE7; border-color: #22C55E; box-shadow: 0 6px 0 #16A34A; color: #166534; }
    .g4-choice-bad, .g4-choice-bad:disabled { background: #FEE2E2; border-color: #FCA5A5; box-shadow: 0 6px 0 #F87171; color: #B91C1C; opacity: 0.8; }
    .g4-choice:disabled { cursor: default; }
    .g4-choices-col { flex-direction: column; }
    .g4-choice-big { font-size: min(9cqh, 6cqi); }
    .g4-choice-go { background: linear-gradient(180deg, #4ADE80, #22C55E); color: #fff; border-color: #15803D; box-shadow: 0 6px 0 #15803D; text-shadow: 0 2px 0 rgba(21,128,61,0.45); }
    /* Nút chọn đè lên đáy công cụ trong Khám phá (không đẩy công cụ) */
    .g4-ov-choices { position: absolute; z-index: 4; left: 2cqi; right: 2cqi; bottom: 2cqh; display: flex; gap: 1.2cqi; }

    .g4-board { flex: 1; min-width: 0; min-height: 0; display: flex; flex-direction: column; position: relative; container-type: size; }
    .g4-nav { height: 100%; display: flex; flex-direction: column; gap: 0.6rem; justify-content: flex-end; container-type: size; }
    .g4-nav-btn { border: 3px solid ${INK}; border-radius: 1rem; font-family: 'Baloo 2', sans-serif; font-weight: 800; cursor: pointer; touch-action: manipulation;
      font-size: clamp(1.1rem, 2.2vh + 0.6rem, 2rem); padding: 0.35em 0.6em; background: #fff; color: #1E293B; box-shadow: 0 5px 0 rgba(63,58,64,0.35); }
    .g4-nav-btn:active { transform: translateY(4px); box-shadow: 0 1px 0 rgba(63,58,64,0.35); }
    .g4-replay { font-size: clamp(0.95rem, 1.5vh + 0.5rem, 1.4rem); align-self: flex-start; }
    .g4-next { flex: 1 1 0; max-height: 9rem; background: #CBD5E1; color: #64748B; }
    .g4-next:disabled { cursor: default; }
    .g4-next.g4-ready { background: linear-gradient(180deg, #4ADE80, #22C55E); color: #fff; text-shadow: 0 2px 0 rgba(21,128,61,0.45); animation: g4Pulse 1.6s ease-in-out infinite; }
    @keyframes g4Pulse { 50% { transform: scale(1.04); } }
    .g4-end { display: flex; flex-direction: column; gap: 0.5rem; height: 100%; justify-content: flex-end; }
    .g4-end-title { font-weight: 800; color: #15803D; background: #fff; border: 3px solid ${INK}; border-radius: 1rem; padding: 0.3em 0.6em; text-align: center; font-size: clamp(1rem, 1.8vh + 0.5rem, 1.6rem); }
    .g4-end .g4-next { max-height: 6rem; }
    .g4-again { font-size: clamp(0.95rem, 1.6vh + 0.5rem, 1.4rem); }
    .g4-steps .g3g-dot { font-size: 1rem; color: #15803D; font-weight: 800; }
    .g4-tapme { animation: g4Tap 1.1s ease-in-out infinite; }
    @keyframes g4Tap { 50% { box-shadow: 0 0 0 6px #FDE047, 0 0 18px 6px #FACC15; } }
    .g4-nudge { animation: g4Nudge 0.6s ease-in-out 4; }
    @keyframes g4Nudge { 50% { transform: scale(1.08); filter: drop-shadow(0 0 10px #FACC15); } }
    @media (prefers-reduced-motion: reduce) {
      .g4-next.g4-ready { animation: none; }
      .g4-tapme { animation: g4TapCalm 2s ease-in-out infinite; }
      @keyframes g4TapCalm { 50% { box-shadow: 0 0 0 5px #FDE047; } }
      .g4-nudge { animation: g4TapCalm 1s ease-in-out 3; }
    }
    @media (orientation: portrait) {
      .g4-ov-choices .g4-choice { font-size: min(5.2cqh, 7.4cqi); padding: 0.45em 0.3em; }
      .g3d-scene.g4-scene { grid-template-rows: auto minmax(0, 1fr) clamp(84px, 10%, 140px); }
      .g4-nav { flex-direction: row; align-items: stretch; }
      .g4-replay { align-self: stretch; }
      .g4-next { max-height: none; }
      /* vùng nút dọc thấp: dòng chúc mừng đè lên đáy tờ giấy (chỗ trống của nút chọn), ba nút một hàng vừa kín vùng */
      .g3d-scene.g4-scene > .g3d-padzone { z-index: 3; }
      .g4-nav { position: relative; }
      .g4-end { flex-direction: row; align-items: stretch; }
      .g4-end-title { position: absolute; left: 8%; right: 8%; bottom: calc(100% + 0.9rem); z-index: 5; padding: 0.15em 0.4em; box-shadow: 0 4px 0 rgba(63,58,64,0.25); }
      .g4-end .g4-nav-btn { flex: 1 1 0; min-width: 0; max-height: none; font-size: min(5.4cqi, 30cqh); line-height: 1.1; padding: 0.2em 0.25em; }
    }
    @media (orientation: landscape) and (max-height: 500px) {
      .g4-nav { gap: 0.3rem; }
      .g4-nav-btn { font-size: 1rem; }
    }
  `);
}
