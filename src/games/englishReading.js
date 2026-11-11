/**
 * 📖 Đọc tiếng Anh (thẻ english-reading, tab 🌍 Tiếng Anh ở trang chủ, lớp 1–5).
 * 100 bài, 5 cấp (src/data/englishReading, thiết kế docs/tieng-anh/thiet-ke-bai-doc.md).
 *
 * Danh sách: tab Cấp 1–5 (mở sẵn cấp hợp với lớp trong hồ sơ hoặc cấp lần trước), mỗi bài một thẻ có 8 chấm tiến độ.
 * Một bài: 8 phần (tab trên đầu, nút "Phần tiếp" góc dưới phải):
 *   🎧 Nghe   máy đọc cả bài (tô câu đang đọc, chữ mờ tới khi bấm Hiện chữ), 2 câu hỏi nghe
 *   📖 Đọc    chạm từ → IPA, nghĩa theo ngữ cảnh, đọc to (engine/readingGloss.js)
 *   📚 Từ vựng thẻ từ + chọn nghĩa đúng      📐 Ngữ pháp  giải thích, công thức, câu mẫu
 *   ❓ Trả lời 5 câu    🙋 Đặt câu hỏi    🎤 Nói  bé tự nói về bài và về mình (speak/level<n>.js, engine/listenEn.js)
 *   ✍️ Viết  chép chính tả, sắp xếp từ, viết lại câu
 * Làm xong một phần (mọi câu đúng) thì được sao một lần: khoá enread<lớp>:<bài>:<phần> (BOOK_GRADE trong engine/stars.js).
 * Tiến độ: localStorage scopedKey('enread-v1') = { level, lessons: { [id]: { [phần]: 1 } } } (đồng bộ cloudSync.js).
 */
import '../styles/english.css';
import { LEVELS, LESSONS, loadGloss, loadSpeak } from '../data/englishReading/index.js';
import { renderGlossText } from '../engine/readingGloss.js';
// Ảnh bìa thẻ bài: một khung của truyện hoạt hình (scripts/story-thumbs.mjs → src/assets/english-thumbs/en-NNN.jpg)
const THUMBS = Object.fromEntries(Object.entries(import.meta.glob('../assets/english-thumbs/*.jpg', { eager: true, query: '?url', import: 'default' }))
  .map(([p, url]) => [p.match(/(en-\d{3})\.jpg$/)[1], url]));
import { sayEn, sayEnSeq, stopEn, unlockSpeech, prefetchEn, setEnVoice, enVoiceOfLesson } from '../engine/speakEn.js';
import { scopedKey } from '../engine/auth.js';
import { awardFixedStars } from '../engine/stars.js';
import { getProfileGrade } from '../engine/profile.js';
import { STORIES, loadPlayer } from './englishStory/index.js';
import { requestEnglishCheck } from '../engine/writing.js';
import { canRecognize, canRecord, listenEn, recordEn } from '../engine/listenEn.js';
import { norm, speakCheck } from './englishCheck.js';

const STORE = 'enread-v1';
const PARTS = [
  { id: 'listen', icon: '🎧', name: 'Nghe', stars: 1 },
  { id: 'read', icon: '📖', name: 'Đọc', stars: 0 },
  { id: 'vocab', icon: '📚', name: 'Từ vựng', stars: 1 },
  { id: 'grammar', icon: '📐', name: 'Ngữ pháp', stars: 0 },
  { id: 'answer', icon: '❓', name: 'Trả lời', stars: 2 },
  { id: 'ask', icon: '🙋', name: 'Đặt câu hỏi', stars: 2 },
  { id: 'speak', icon: '🎤', name: 'Nói', stars: 2 },
  { id: 'write', icon: '✍️', name: 'Viết', stars: 3 },
];
const LEVEL_FOR = { 1: 'hợp với lớp 1–3', 2: 'hợp với lớp 3–4', 3: 'hợp với lớp 4–5', 4: 'hợp với lớp 5–6', 5: 'hợp với lớp 6 trở lên' };
const LEVEL_OF_GRADE = { 1: 1, 2: 1, 3: 2, 4: 3, 5: 4 };

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

function loadStore() {
  try { return { lessons: {}, ...JSON.parse(localStorage.getItem(scopedKey(STORE))) }; } catch { return { lessons: {} }; }
}
function saveStore(s) {
  try { localStorage.setItem(scopedKey(STORE), JSON.stringify(s)); } catch { /* đầy bộ nhớ */ }
  window.dispatchEvent(new CustomEvent('tth:data-changed'));
}

/** Chữ nào của got khớp với want theo dãy con chung dài nhất (lệch một chữ không làm cả câu bị tô). */
function lcsHits(got, want) {
  const n = got.length, m = want.length;
  const L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = got[i] === want[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const hit = new Array(n).fill(false);
  for (let i = 0, j = 0; i < n && j < m;) {
    if (got[i] === want[j]) { hit[i] = true; i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++;
  }
  return hit;
}
/** Hỏi cô DeepSeek; không được (chưa đăng nhập, hết lượt, mất mạng) thì null để code chấm như cũ. */
async function askTeacherEn(kind, task, model, text) {
  try {
    const grade = [1, 2, 3, 4, 5].includes(getProfileGrade()) ? getProfileGrade() : 3;
    return await requestEnglishCheck({ kind, task, model, text: text.trim(), grade });
  } catch {
    return null;
  }
}
const matches = (input, answers) => answers.filter(Boolean).some((a) => norm(a) === norm(input));

// ── 🎤 Nói ──
const PRAISE = ['Giỏi quá!', 'Hay lắm!', 'Em nói rất tốt!', 'Đúng rồi!'];
const MIC_ERR = {
  'not-allowed': 'Máy chưa cho dùng micro. Nhờ bố mẹ bật quyền micro cho trang này.',
  'service-not-allowed': 'Máy chưa cho dùng micro. Nhờ bố mẹ bật quyền micro cho trang này.',
  'audio-capture': 'Không tìm thấy micro. Nhờ bố mẹ kiểm tra micro.',
  'no-speech': 'Cô chưa nghe thấy gì. Em nói to và rõ hơn.',
  network: 'Mạng yếu nên máy chưa nghe được. Em thử lại.',
};
export function render(app, onBack, ctx = {}) {
  app.setAttribute('data-no-i18n', ''); // trang học tiếng Anh: không dịch giao diện
  let store = loadStore();
  let level = store.level || LEVEL_OF_GRADE[getProfileGrade()] || 1;
  let disposers = [];
  let lessonView = null; // bài đang mở: { L, show(phần) } để chuyển tab mà không vẽ lại
  let paneHide = null;   // lúc đang vẽ một phần: danh sách việc cần làm khi phần ấy bị ẩn (dừng đọc)
  const grade = [1, 2, 3, 4, 5].includes(getProfileGrade()) ? getProfileGrade() : null;

  const cleanup = () => { stopEn(); disposers.forEach((d) => d?.()); disposers = []; };
  const doneOf = (id) => store.lessons[id] || {};
  const markDone = (L, part, revealed = false) => {
    store = loadStore();
    const rec = store.lessons[L.id] || (store.lessons[L.id] = {});
    if (rec[part]) return;
    rec[part] = 1;
    saveStore(store);
    const p = PARTS.find((x) => x.id === part);
    const stars = revealed ? Math.min(1, p.stars) : p.stars;
    if (stars > 0 && grade) awardFixedStars(`enread${grade}:${L.id}:${part}`, stars);
  };

  // ctx.open = { lesson: 'en-021', part: 'answer' }: mở thẳng một bài (scripts/english-reading-dev.html?app=1)
  const start = ctx.open?.lesson && LESSONS.find((L) => L.id === ctx.open.lesson);
  if (start) { level = start.level; showLesson(start, ctx.open.part); } else showList();
  return () => { cleanup(); setEnVoice(); }; // rời trang: giọng mặc định cho chỗ khác

  function frame({ back, backLabel, title, right = '', sub = '' }, body) {
    cleanup();
    lessonView = null;
    app.innerHTML = `
      <div class="enr">
        <div class="enr-stick">
          <header class="enr-top">
            <button type="button" class="btn btn-ghost enr-back">${backLabel}</button>
            <h1 class="enr-title">${title}</h1>
            <div class="enr-top-right">${right}</div>
          </header>
          ${sub}
        </div>
        <main class="enr-body">${body}</main>
      </div>`;
    app.querySelector('.enr-back').onclick = back;
    app.scrollTop = 0;
    return app.querySelector('.enr-body');
  }

  // ── Danh sách bài theo cấp ───────────────────────────────────────────────
  function showList() {
    store = loadStore();
    const lv = LEVELS.find((x) => x.level === level) || LEVELS[0];
    const tabs = `<nav class="enr-levels" role="tablist">${LEVELS.map((x) => `<button type="button" role="tab" class="enr-level${x.level === level ? ' is-on' : ''}" data-lv="${x.level}" aria-selected="${x.level === level}"><b>Cấp ${x.level}</b><small>${esc(x.name)}</small></button>`).join('')}</nav>`;
    const cards = lv.lessons.map((L) => {
      const d = doneOf(L.id), n = PARTS.filter((p) => d[p.id]).length;
      const th = THUMBS[L.id];
      return `<button type="button" class="enr-card${n === PARTS.length ? ' is-done' : ''}${th ? ' has-thumb' : ''}" data-id="${L.id}">
        ${th ? `<img class="enr-card-thumb" src="${th}" alt="" loading="lazy" width="480" height="270">` : ''}
        <span class="enr-card-no">${L.no}</span>
        <span class="enr-card-text"><strong lang="en">${esc(L.title)}</strong><small>${esc(L.grammar.point)}</small></span>
        <span class="enr-dots" aria-label="${n}/${PARTS.length} phần">${PARTS.map((p) => `<i class="${d[p.id] ? 'on' : ''}"></i>`).join('')}</span>
      </button>`;
    }).join('');
    const body = frame({ back: () => { cleanup(); onBack(); }, backLabel: '← Trang chủ', title: '📖 Đọc tiếng Anh', sub: tabs },
      `<p class="enr-lvinfo">Cấp ${lv.level} · ${esc(lv.cefr)} · ${LEVEL_FOR[lv.level]}. Mỗi bài có 8 phần: nghe, đọc, từ vựng, ngữ pháp, trả lời, đặt câu hỏi, nói, viết.</p>
       <div class="enr-grid">${cards}</div>`);
    app.querySelectorAll('.enr-level').forEach((b) => b.addEventListener('click', () => {
      level = Number(b.dataset.lv);
      store = loadStore(); store.level = level; saveStore(store);
      showList();
    }));
    body.querySelectorAll('.enr-card').forEach((c) => c.addEventListener('click', () => showLesson(LESSONS.find((L) => L.id === c.dataset.id))));
  }

  // ── Một bài ──────────────────────────────────────────────────────────────
  /* Mỗi phần vẽ một lần vào một khung riêng (.enr-pane) và được giữ lại: bé chuyển qua lại giữa các tab trong cùng bài thì
     câu đã chọn, chữ đã gõ, từ đã xếp vẫn còn nguyên. Rời bài (về danh sách, sang bài khác) mới bỏ. */
  async function showLesson(L, partId) {
    if (lessonView?.L === L) { lessonView.show(partId); return; }
    setEnVoice(enVoiceOfLesson(L.no)); // bài lẻ giọng nữ, bài chẵn giọng nam (mọi lời đọc trong bài, cả truyện và bấm từ)
    const gloss = await loadGloss(L).catch(() => ({ words: {}, phrases: {} }));
    // Giọng Azure: tải trước mọi câu sẽ đọc trong bài (hàng đợi 4 file, câu trước): bài đọc (nghe, truyện), câu hỏi, từ vựng +
    // câu ví dụ, ví dụ ngữ pháp, câu trả lời cho sẵn, chép chính tả, đáp án sắp xếp từ; rồi tới từ lẻ (từ vựng, từ trong bài).
    prefetchEn([
      ...L.text.split(/\n{2,}/).flatMap((p) => p.match(/[^.!?]+(?:[.!?]+["”']?|$)\s*/g) || [p]).map((s) => s.replace(/\s+/g, ' ').trim()),
      ...(L.questions || []).map((q) => q.q), ...(L.vocab || []).map((v) => v.example), ...(L.grammar?.examples || []),
      ...(L.makeQuestion || []).map((m) => m.answer), ...(L.dictation || []), ...(L.reorder || []).map((r) => r.answer),
    ]);
    prefetchEn((L.vocab || []).map((v) => v.word), { low: true });
    store = loadStore();
    const d = doneOf(L.id);
    const part = PARTS.find((p) => p.id === partId) || PARTS.find((p) => !d[p.id]) || PARTS[0];
    const tabs = `<nav class="enr-parts" role="tablist">${PARTS.map((p) => `<button type="button" role="tab" class="enr-part${p.id === part.id ? ' is-on' : ''}${d[p.id] ? ' is-done' : ''}" data-p="${p.id}" aria-selected="${p.id === part.id}"><span aria-hidden="true">${p.icon}</span>${p.name}${d[p.id] ? ' ✓' : ''}</button>`).join('')}</nav>`;
    const n = PARTS.filter((p) => d[p.id]).length;
    const body = frame({
      back: showList, backLabel: '← Danh sách',
      title: `<span class="enr-no">${L.no}.</span> <span lang="en">${esc(L.title)}</span>`,
      right: `<span class="enr-count">${n}/${PARTS.length}</span>`, sub: tabs,
    }, '');
    body.addEventListener('pointerdown', () => unlockSpeech(), { once: true });
    const nextLesson = LESSONS[LESSONS.indexOf(L) + 1];
    const panes = new Map(); // id phần → { el, hide: [], top }
    let cur = null;

    function build(p) {
      const el = document.createElement('div');
      el.className = 'enr-pane';
      el.dataset.p = p.id;
      body.appendChild(el);
      const pane = { el, hide: [], top: 0 };
      const nextPart = PARTS[PARTS.indexOf(p) + 1];
      const nav = document.createElement('div');
      nav.className = 'enr-nav';
      nav.innerHTML = nextPart
        ? `<button type="button" class="enr-next">${nextPart.icon} ${nextPart.name} ▶</button>`
        : nextLesson ? `<button type="button" class="enr-next">Bài ${nextLesson.no} ▶</button>` : '';
      nav.querySelector('.enr-next')?.addEventListener('click', () => (nextPart ? show(nextPart.id) : showLesson(nextLesson)));
      const done = (revealed) => {
        if (doneOf(L.id)[p.id]) return;
        markDone(L, p.id, revealed);
        const tab = app.querySelector(`.enr-part[data-p="${p.id}"]`);
        if (tab) { tab.classList.add('is-done'); tab.lastChild.textContent += ' ✓'; }
        const c = app.querySelector('.enr-count');
        if (c) c.textContent = `${PARTS.filter((x) => doneOf(L.id)[x.id]).length}/${PARTS.length}`;
        nav.classList.add('is-ready');
      };
      paneHide = pane.hide;
      ({ listen, read, vocab, grammar, answer, ask, speak, write })[p.id](el, L, gloss, done);
      paneHide = null;
      el.appendChild(nav);
      return pane;
    }
    function show(id) {
      const p = PARTS.find((x) => x.id === id) || part;
      if (cur === p.id) return;
      const old = panes.get(cur);
      if (old) {
        old.top = app.scrollTop;
        old.hide.forEach((f) => f());   // dừng đọc / dừng truyện của phần vừa rời
        stopEn();
        old.el.hidden = true;
      }
      cur = p.id;
      let pane = panes.get(p.id);
      if (pane) pane.el.hidden = false;
      else panes.set(p.id, (pane = build(p)));
      body.classList.toggle('is-wide', pane.el.dataset.wide === '1');
      app.querySelectorAll('.enr-part').forEach((b) => {
        const on = b.dataset.p === p.id;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-selected', String(on));
      });
      app.querySelector('.enr-part.is-on')?.scrollIntoView({ inline: 'center', block: 'nearest' });
      app.scrollTop = pane.top;
    }
    app.querySelectorAll('.enr-part').forEach((b) => b.addEventListener('click', () => show(b.dataset.p)));
    lessonView = { L, show };
    show(part.id);
  }

  // ── Đọc cả bài: nút ▶ / ⏸ + 🐢 chậm, tô câu đang đọc ─────────────────────
  function textBlock(host, L, gloss, { hidden = false } = {}) {
    const wrap = document.createElement('section');
    wrap.className = 'enr-card-box enr-reading';
    wrap.innerHTML = `
      <div class="enr-tools">
        <button type="button" class="enr-play">▶ Nghe cả bài</button>
        <label class="enr-toggle"><input type="checkbox" class="enr-slow"> 🐢 Đọc chậm</label>
        ${hidden ? '<label class="enr-toggle"><input type="checkbox" class="enr-show"> 👁 Hiện chữ</label>' : ''}
      </div>
      <div class="enr-text${hidden ? ' is-hidden' : ''}"></div>`;
    host.appendChild(wrap);
    const off = renderGlossText(wrap.querySelector('.enr-text'), L, gloss);
    disposers.push(off);
    let stop = null;
    const btn = wrap.querySelector('.enr-play');
    const reset = () => { stop = null; off.mark(-1); btn.textContent = '▶ Nghe cả bài'; };
    btn.addEventListener('click', () => {
      unlockSpeech();
      if (stop) { stop(); reset(); return; }
      btn.textContent = '⏸ Dừng';
      stop = sayEnSeq(off.sentences, { rate: wrap.querySelector('.enr-slow').checked ? 0.6 : 0.85, onEach: off.mark, onEnd: reset });
    });
    disposers.push(() => stop?.());
    paneHide?.push(() => { if (stop) { stop(); reset(); } });
    wrap.querySelector('.enr-show')?.addEventListener('change', (e) => wrap.querySelector('.enr-text').classList.toggle('is-hidden', !e.target.checked));
    return wrap;
  }

  function sayBtn(text, label = 'Nghe') { return `<button type="button" class="enr-say" data-say="${esc(text)}" aria-label="${label}">🔊</button>`; }
  function bindSay(root) {
    root.addEventListener('click', (e) => {
      const b = e.target.closest('.enr-say');
      if (b) { unlockSpeech(); sayEn(b.dataset.say); }
    });
  }
  function head(host, html) { host.insertAdjacentHTML('beforeend', `<h2 class="enr-h">${html}</h2>`); }

  /** Một nhóm câu: xong khi mọi câu đúng (hoặc đã xem đáp án). */
  function group(host, n, onAll) {
    let left = n, revealed = false;
    return (rev) => { revealed ||= rev; if (--left === 0) onAll(revealed); };
  }

  // Câu chọn đáp án / True / False / trả lời ngắn (phần Nghe, Trả lời)
  function question(host, q, i, ok) {
    const el = document.createElement('div');
    el.className = 'enr-q';
    const opts = q.type === 'mc' ? q.options.map((o, k) => ({ label: o, right: k === q.answer, en: true }))
      : q.type === 'tf' ? [{ label: 'True', right: q.answer === true, en: true }, { label: 'False', right: q.answer === false, en: true }] : null;
    el.innerHTML = `
      <p class="enr-q-text"><b>${i + 1}.</b> <span lang="en">${esc(q.q)}</span> ${sayBtn(q.q)}</p>
      ${opts ? `<div class="enr-opts">${opts.map((o, k) => `<button type="button" class="enr-opt" data-k="${k}"${o.en ? ' lang="en"' : ''}>${esc(o.label)}</button>`).join('')}</div>`
        : `<div class="enr-input-row"><textarea class="enr-input" rows="1" lang="en" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="Viết câu trả lời bằng tiếng Anh"></textarea><button type="button" class="enr-check">Kiểm tra</button></div>`}
      <p class="enr-fb" aria-live="polite"></p>`;
    host.appendChild(el);
    if (opts) {
      el.querySelectorAll('.enr-opt').forEach((b) => b.addEventListener('click', () => {
        if (el.classList.contains('is-ok')) return;
        const o = opts[Number(b.dataset.k)];
        if (o.right) { b.classList.add('is-right'); el.classList.add('is-ok'); el.querySelector('.enr-fb').textContent = 'Đúng rồi!'; ok(false); }
        else { b.classList.add('is-wrong'); b.disabled = true; shake(b); el.querySelector('.enr-fb').textContent = 'Chưa đúng, em đọc lại bài rồi chọn lại.'; }
      }));
    } else {
      textAnswer(el, (v) => matches(v, [q.answer, ...(q.accept || [])]), q.answer, ok);
    }
  }

  /** Ô viết + Kiểm tra (Enter cũng được); sai 2 lần thì có nút Xem đáp án. */
  /**
   * aiCheck(v) → Promise<{ ok, fix, explain } | null>: câu mở (đặt câu hỏi, viết lại câu) có nhiều cách đúng.
   * Code so đáp án trước; chỉ khi sai mới hỏi cô DeepSeek. null / lỗi mạng → chấm như code.
   */
  function textAnswer(el, check, answerText, ok, { onWrong, aiCheck } = {}) {
    const input = el.querySelector('.enr-input'), fb = el.querySelector('.enr-fb'), btn = el.querySelector('.enr-check');
    let wrong = 0, busy = false;
    // Ô viết nhiều dòng: câu dài tự xuống dòng, ô cao lên theo chữ (không cuộn ngang); Enter = Kiểm tra, không xuống dòng
    const fit = () => { if (!input.offsetParent) return; input.style.height = 'auto'; input.style.height = `${input.scrollHeight + 2}px`; };
    input.addEventListener('input', () => {
      if (/[\r\n]/.test(input.value)) input.value = input.value.replace(/\s*[\r\n]+\s*/g, ' '); // dán cả đoạn có xuống dòng
      fit();
    });
    requestAnimationFrame(fit);
    const asked = new Map(); // câu đã hỏi cô → kết quả, gõ lại y hệt thì không hỏi lại
    const run = async () => {
      if (busy || el.classList.contains('is-ok') || !input.value.trim()) return;
      const v = input.value;
      if (check(v)) {
        el.classList.add('is-ok'); input.readOnly = true; fb.textContent = 'Đúng rồi!'; ok(false);
        return;
      }
      let ai = null;
      if (aiCheck) {
        const k = norm(v);
        if (asked.has(k)) ai = asked.get(k);
        else {
          busy = true; btn.disabled = true; input.readOnly = true;
          fb.textContent = 'Cô đang xem câu của em…';
          try { ai = await aiCheck(v); } catch { ai = null; }
          busy = false; btn.disabled = false; input.readOnly = false;
          if (ai) asked.set(k, ai);
        }
        if (ai?.ok) {
          el.classList.add('is-ok'); input.readOnly = true;
          fb.innerHTML = `Đúng rồi! ${ai.explain ? esc(ai.explain) : ''}<br><span class="enr-alt">Sách viết: <b lang="en">${esc(answerText)}</b></span>`;
          ok(false);
          return;
        }
      }
      wrong++;
      shake(input);
      fb.innerHTML = (ai?.explain && esc(ai.explain)) || onWrong?.(v) || 'Chưa đúng, em sửa lại.';
      if (wrong >= 2 && !el.querySelector('.enr-reveal')) {
        fb.insertAdjacentHTML('afterend', '<button type="button" class="enr-reveal">Xem đáp án</button>');
        el.querySelector('.enr-reveal').addEventListener('click', (e) => {
          e.target.remove();
          input.value = answerText; input.readOnly = true; fit();
          el.classList.add('is-ok', 'is-revealed');
          fb.innerHTML = `Đáp án: <b lang="en">${esc(answerText)}</b>. Em đọc lại một lần cho nhớ.`;
          ok(true);
        });
      }
    };
    el.querySelector('.enr-check').addEventListener('click', run);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); run(); } });
    // 🧹 Xoá: xoá cả câu đang viết để viết lại nhanh (đã đúng hoặc đang chờ cô chấm thì thôi)
    btn.insertAdjacentHTML('beforebegin', '<button type="button" class="enr-clear" aria-label="Xoá câu đã viết">🧹<span class="enr-clear-t"> Xoá</span></button>');
    el.querySelector('.enr-clear').addEventListener('click', () => {
      if (busy || el.classList.contains('is-ok')) return;
      input.value = ''; fb.textContent = ''; fit();
      input.focus();
    });
  }

  // ── 🎧 Nghe ──
  function listen(body, L, gloss, done) {
    head(body, '🎧 Nghe bài đọc');
    if (STORIES[L.id]) {
      // Bài có truyện hoạt hình (englishStory): xem + nghe từng câu, dải truyện, xếp lại thứ tự
      body.dataset.wide = '1';   // khung phần Nghe rộng hơn (show() đặt is-wide cho .enr-body)
      body.insertAdjacentHTML('beforeend', '<p class="enr-help">Bấm ▶ để xem và nghe truyện. Chạm một ô để xem lại câu đó. Luyện nghe thật: bỏ chọn 👁 Hiện chữ.</p>');
      const box = document.createElement('section');
      box.className = 'enr-story';
      body.appendChild(box);
      let player = null;
      paneHide?.push(() => player?.pause?.());
      loadPlayer().then((m) => m.mountStory(box, L, STORIES[L.id])).then((dispose) => {
        if (box.isConnected) { player = dispose; disposers.push(dispose); } else dispose();
      });
    } else {
      body.insertAdjacentHTML('beforeend', '<p class="enr-help">Bấm ▶ để nghe. Nghe xong trả lời 2 câu hỏi bên dưới. Muốn nhìn chữ thì bấm 👁 Hiện chữ.</p>');
      textBlock(body, L, gloss, { hidden: true });
    }
    head(body, 'Nghe và trả lời');
    const box = document.createElement('section');
    box.className = 'enr-card-box';
    body.appendChild(box);
    bindSay(box);
    const qs = L.questions.filter((q) => q.listen);
    const ok = group(box, qs.length, done);
    qs.forEach((q, i) => question(box, q, i, ok));
  }

  // ── 📖 Đọc ──
  function read(body, L, gloss, done) {
    head(body, '📖 Đọc bài');
    body.insertAdjacentHTML('beforeend', '<p class="enr-help">Đọc to theo bài. Chạm vào một từ để xem phiên âm, nghĩa và nghe đọc từ đó.</p>');
    textBlock(body, L, gloss);
    const b = document.createElement('div');
    b.className = 'enr-center';
    b.innerHTML = '<button type="button" class="enr-big">✅ Em đã đọc xong</button>';
    body.appendChild(b);
    const btn = b.firstChild;
    if (doneOf(L.id).read) btn.disabled = true;
    btn.addEventListener('click', () => { btn.disabled = true; done(false); });
  }

  // ── 📚 Từ vựng ──
  function vocab(body, L, gloss, done) {
    head(body, '📚 Từ mới');
    const ipaOf = (w) => gloss.words?.[w.toLowerCase()]?.ipa || gloss.phrases?.[w.toLowerCase()]?.ipa || '';
    const grid = document.createElement('section');
    grid.className = 'enr-vocab';
    grid.innerHTML = L.vocab.map((v) => `
      <div class="enr-word">
        <span class="enr-emoji" aria-hidden="true">${v.emoji}</span>
        <div class="enr-word-main"><b lang="en">${esc(v.word)}</b> ${sayBtn(v.word)}${ipaOf(v.word) ? `<span class="enr-ipa">/${esc(ipaOf(v.word))}/</span>` : ''}</div>
        <div class="enr-word-vi">${esc(v.vi)}</div>
        <div class="enr-word-ex"><span lang="en">${esc(v.example)}</span> ${sayBtn(v.example)}</div>
      </div>`).join('');
    body.appendChild(grid);
    bindSay(grid);
    head(body, 'Chọn nghĩa đúng');
    const box = document.createElement('section');
    box.className = 'enr-card-box';
    body.appendChild(box);
    bindSay(box);
    const ok = group(box, L.vocab.length, done);
    L.vocab.forEach((v, i) => {
      const others = shuffle(L.vocab.filter((x) => x !== v)).slice(0, 2).map((x) => x.vi);
      const opts = shuffle([v.vi, ...others]);
      question(box, { type: 'mc', q: v.word, options: opts, answer: opts.indexOf(v.vi) }, i, ok);
    });
    box.querySelectorAll('.enr-opt').forEach((b) => b.removeAttribute('lang')); // nghĩa là tiếng Việt
  }

  // ── 📐 Ngữ pháp ──
  function grammar(body, L, gloss, done) {
    const g = L.grammar;
    head(body, '📐 Ngữ pháp');
    const box = document.createElement('section');
    box.className = 'enr-card-box enr-grammar';
    box.innerHTML = `
      <h3>${esc(g.point)}</h3>
      <p>${esc(g.explainVi)}</p>
      <div class="enr-pattern" lang="en">${esc(g.pattern)}</div>
      <h4>Câu mẫu</h4>
      <ul>${g.examples.map((x) => `<li><span lang="en">${esc(x)}</span> ${sayBtn(x)}</li>`).join('')}</ul>`;
    body.appendChild(box);
    bindSay(box);
    const b = document.createElement('div');
    b.className = 'enr-center';
    b.innerHTML = '<button type="button" class="enr-big">👍 Em hiểu rồi</button>';
    body.appendChild(b);
    const btn = b.firstChild;
    if (doneOf(L.id).grammar) btn.disabled = true;
    btn.addEventListener('click', () => { btn.disabled = true; done(false); });
  }

  // ── ❓ Trả lời câu hỏi ──
  function answer(body, L, gloss, done) {
    head(body, '❓ Trả lời câu hỏi');
    body.insertAdjacentHTML('beforeend', '<p class="enr-help">Đọc lại bài nếu cần (bấm tab 📖 Đọc), rồi trả lời từng câu.</p>');
    const box = document.createElement('section');
    box.className = 'enr-card-box';
    body.appendChild(box);
    bindSay(box);
    const ok = group(box, L.questions.length, done);
    L.questions.forEach((q, i) => question(box, q, i, ok));
  }

  // ── 🙋 Đặt câu hỏi ──
  function ask(body, L, gloss, done) {
    head(body, '🙋 Đặt câu hỏi');
    body.insertAdjacentHTML('beforeend', '<p class="enr-help">Đây là câu trả lời. Em viết câu hỏi bằng tiếng Anh để có câu trả lời đó.</p>');
    const box = document.createElement('section');
    box.className = 'enr-card-box';
    body.appendChild(box);
    bindSay(box);
    const ok = group(box, L.makeQuestion.length, done);
    L.makeQuestion.forEach((m, i) => {
      const el = document.createElement('div');
      el.className = 'enr-q';
      el.innerHTML = `
        <p class="enr-q-text"><b>${i + 1}.</b> Trả lời: <span lang="en" class="enr-given">${esc(m.answer)}</span> ${sayBtn(m.answer)}</p>
        <div class="enr-input-row"><textarea class="enr-input" rows="1" lang="en" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="Câu hỏi của em…"></textarea><button type="button" class="enr-check">Kiểm tra</button></div>
        <button type="button" class="enr-hint">💡 Gợi ý</button>
        <p class="enr-fb" aria-live="polite"></p>`;
      box.appendChild(el);
      el.querySelector('.enr-hint').addEventListener('click', (e) => { e.target.outerHTML = `<p class="enr-hint-text">Bắt đầu bằng: <b lang="en">${esc(m.hint)}</b></p>`; });
      textAnswer(el, (v) => matches(v, [m.question, ...(m.accept || [])]), m.question, ok, {
        onWrong: (v) => (/\?\s*$/.test(v) ? 'Chưa đúng. Xem lại từ để hỏi và thứ tự từ.' : 'Câu hỏi phải kết thúc bằng dấu chấm hỏi (?).'),
        // Thiếu dấu ? thì nhắc ngay, không cần hỏi cô.
        aiCheck: (v) => (/\?\s*$/.test(v) ? askTeacherEn('ask', m.answer, m.question, v) : Promise.resolve(null)),
      });
    });
  }

  // ── 🎤 Nói: bé bấm mic, nói câu trả lời; máy nghe ra chữ, chấm theo nhóm từ khoá (speakCheck) ──
  function speak(body, L, gloss, done) {
    head(body, '🎤 Nói');
    const host = document.createElement('div');
    body.appendChild(host);
    let stopNow = null, active = null; // chỉ một mic chạy một lúc
    const halt = () => { const s = stopNow; stopNow = null; active = null; s?.(); };
    paneHide?.push(halt);
    disposers.push(halt);
    const hidePane = paneHide;
    loadSpeak(L).then((items) => {
      if (!host.isConnected) return;
      if (!items.length) { host.innerHTML = '<p class="enr-help">Bài này chưa có phần nói.</p>'; return; }
      prefetchEn([...items.map((p) => p.q), ...items.map((p) => p.model)]);
      const mode = canRecognize() ? 'sr' : canRecord() ? 'rec' : 'none';
      host.innerHTML = `<p class="enr-help">${mode === 'sr' ? 'Bấm 🎤 rồi nói câu trả lời bằng tiếng Anh. Câu ngắn nói xong máy tự dừng, kể lại thì bấm ⏹ khi kể xong.'
        : mode === 'rec' ? 'Máy này chưa nghe ra chữ được. Bấm 🎤 để ghi âm, nghe lại giọng em rồi so với câu mẫu.'
          : 'Em nói to câu trả lời, rồi bấm 🔊 nghe câu mẫu để so.'}</p>`;
      paneHide = hidePane; // textBlock dừng đọc khi rời phần
      textBlock(host, L, gloss, { hidden: true });
      paneHide = null;
      const box = document.createElement('section');
      box.className = 'enr-card-box enr-speak';
      host.appendChild(box);
      bindSay(box);
      box.addEventListener('click', (e) => { if (e.target.closest('.enr-say')) halt(); }); // máy đọc thì mic thôi nghe
      const ok = group(box, items.length, done);
      items.forEach((p, i) => speakItem(box, p, i, ok, mode));
    });

    function speakItem(box, p, i, ok, mode) {
      const KIND = { text: '📖 Về bài đọc', me: '🙂 Về em', retell: '🗣️ Kể lại' };
      const tip = p.kind === 'retell' && p.hints?.length ? `Từ gợi ý: ${p.hints.map((h) => `<b lang="en">${esc(h)}</b>`).join(', ')}`
        : p.frame ? `Bắt đầu bằng: <b lang="en">${esc(p.frame)}</b>` : '';
      const el = document.createElement('div');
      el.className = 'enr-q enr-sp';
      el.innerHTML = `
        <p class="enr-sp-kind">${KIND[p.kind] || ''}</p>
        <p class="enr-q-text"><b>${i + 1}.</b> <span lang="en">${esc(p.q)}</span> ${sayBtn(p.q)}</p>
        <p class="enr-sp-vi">${esc(p.vi)}</p>
        ${p.kind === 'retell' ? `<p class="enr-hint-text">${tip}</p>` : tip ? '<button type="button" class="enr-hint">💡 Gợi ý</button>' : ''}
        <div class="enr-sp-row"><button type="button" class="enr-mic">🎤 Bấm để nói</button></div>
        <p class="enr-sp-heard" aria-live="polite"></p>
        <p class="enr-fb" aria-live="polite"></p>
        <p class="enr-sp-model" hidden>Câu mẫu: <span lang="en">${esc(p.model)}</span> ${sayBtn(p.model)}</p>`;
      box.appendChild(el);
      el.querySelector('.enr-hint')?.addEventListener('click', (e) => { e.target.outerHTML = `<p class="enr-hint-text">${tip}</p>`; });
      const mic = el.querySelector('.enr-mic'), heard = el.querySelector('.enr-sp-heard'), fb = el.querySelector('.enr-fb');
      const model = el.querySelector('.enr-sp-model');
      let tries = 0, counted = false;
      const pass = (revealed) => {
        el.classList.add('is-ok');
        model.hidden = false;
        if (!counted) { counted = true; ok(revealed); }
      };
      const setOn = (on) => {
        el.classList.toggle('is-listening', on);
        mic.textContent = on ? (mode === 'sr' ? '⏹ Đang nghe… bấm để dừng' : '⏹ Đang ghi… bấm để dừng') : el.classList.contains('is-ok') ? '🎤 Nói lại' : '🎤 Bấm để nói';
      };
      if (mode === 'none') {
        mic.textContent = '👍 Em đã nói xong';
        mic.addEventListener('click', () => { pass(false); fb.textContent = 'Em nghe câu mẫu để so với câu của mình.'; mic.disabled = true; });
        return;
      }
      mic.addEventListener('click', async () => {
        if (active === el) { halt(); return; }
        halt();
        stopEn();
        active = el;
        setOn(true);
        fb.textContent = '';
        if (mode === 'rec') {
          heard.textContent = '';
          const stop = await recordEn({
            onEnd: ({ url, error }) => {
              if (active === el) { stopNow = null; active = null; }
              setOn(false);
              if (error || !url) { fb.textContent = MIC_ERR[error] || 'Chưa ghi được, em thử lại.'; return; }
              heard.innerHTML = `Giọng em: <audio controls src="${url}"></audio>`;
              pass(false);
              setOn(false);
              fb.textContent = 'Em nghe lại giọng mình rồi so với câu mẫu.';
            },
          });
          if (active === el) stopNow = stop; else stop();
          return;
        }
        heard.textContent = '🎧 …';
        const stop = listenEn({
          long: p.kind === 'retell',
          onText: (t) => { heard.innerHTML = `🎧 <span lang="en">${esc(t)}</span>`; },
          onEnd: (r) => {
            if (active === el) { stopNow = null; active = null; }
            setOn(false);
            judge(r);
          },
        });
        stopNow = stop;
      });

      function judge({ text, alts, error }) {
        if (!text) { heard.textContent = ''; fb.textContent = MIC_ERR[error] || 'Cô chưa nghe rõ, em bấm 🎤 nói lại.'; return; }
        const res = speakCheck(p, text, alts);
        heard.innerHTML = `Cô nghe được: <q lang="en">${res.marked}</q>`;
        if (res.ok) {
          const again = counted;
          pass(tries >= 2);
          setOn(false);
          fb.textContent = again ? 'Hay lắm!' : PRAISE[Math.floor(Math.random() * PRAISE.length)];
          return;
        }
        if (counted) { fb.textContent = 'Em so với câu mẫu bên dưới rồi nói lại.'; return; }
        tries++;
        shake(mic);
        const missing = res.missing.map((g) => `<b lang="en">${esc(g.split('|')[0])}</b>`).join(', ');
        fb.innerHTML = res.words < res.minWords
          ? (p.kind === 'retell' ? `Em kể dài hơn một chút (ít nhất ${res.minWords} từ).` : 'Em nói cả câu cho đủ ý.')
          : p.kind === 'text' ? 'Chưa đúng ý trong bài. Em bấm 👁 Hiện chữ xem lại bài rồi nói lại.'
            : p.kind === 'me' ? `Em nói theo khung: <b lang="en">${esc(p.frame || p.model)}</b>`
              : `Em dùng thêm từ gợi ý: ${missing}`;
        if (tries >= 2) {
          model.hidden = false;
          fb.insertAdjacentHTML('beforeend', '<br>Nghe câu mẫu rồi nói theo.');
          if (!el.querySelector('.enr-reveal')) {
            el.querySelector('.enr-sp-row').insertAdjacentHTML('beforeend', '<button type="button" class="enr-reveal">Bỏ qua câu này</button>');
            el.querySelector('.enr-reveal').addEventListener('click', (e) => {
              halt();
              e.target.remove();
              el.classList.add('is-revealed');
              pass(true);
              setOn(false);
              fb.textContent = 'Em đọc to câu mẫu một lần cho nhớ.';
            });
          }
        }
      }
    }
  }

  // ── ✍️ Viết: chép chính tả, sắp xếp từ, viết lại câu ──
  function write(body, L, gloss, done) {
    const total = L.dictation.length + L.reorder.length + L.rewrite.length;
    let ok = null;
    const sec = (title, help) => {
      head(body, title);
      if (help) body.insertAdjacentHTML('beforeend', `<p class="enr-help">${help}</p>`);
      const box = document.createElement('section');
      box.className = 'enr-card-box';
      body.appendChild(box);
      bindSay(box);
      return box;
    };
    const dict = sec('✍️ Nghe và chép chính tả', 'Bấm 🔊 nghe câu (🐢 nghe chậm), rồi chép lại đúng từng chữ.');
    ok = group(dict, total, done);
    L.dictation.forEach((s, i) => {
      const el = document.createElement('div');
      el.className = 'enr-q';
      el.innerHTML = `
        <p class="enr-q-text"><b>${i + 1}.</b> <button type="button" class="enr-listen">🔊 Nghe</button> <button type="button" class="enr-listen slow">🐢 Chậm</button></p>
        <div class="enr-input-row"><textarea class="enr-input" rows="1" lang="en" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="Chép câu em nghe được"></textarea><button type="button" class="enr-check">Kiểm tra</button></div>
        <p class="enr-fb" aria-live="polite"></p>`;
      dict.appendChild(el);
      el.querySelectorAll('.enr-listen').forEach((b) => b.addEventListener('click', () => {
        unlockSpeech();
        sayEnSeq([s], { rate: b.classList.contains('slow') ? 0.55 : 0.85 });
      }));
      // Dạng rút gọn tính như dạng đầy đủ: "I'm" = "I am", "8" = "eight".
      textAnswer(el, (v) => norm(v) === norm(s), s, ok, {
        onWrong: (v) => {
          const want = norm(s).split(' '), got = norm(v).split(' ').filter(Boolean);
          const hit = lcsHits(got, want);
          const marked = got.map((w, k) => (hit[k] ? esc(w) : `<mark>${esc(w)}</mark>`)).join(' ');
          const missing = want.length - hit.filter(Boolean).length > got.length - hit.filter(Boolean).length;
          return `Chữ tô vàng chưa đúng: <span lang="en">${marked}</span>${missing ? ' (còn thiếu chữ)' : ''}`;
        },
      });
    });

    const ro = sec('🧩 Sắp xếp từ thành câu', 'Chạm các từ theo đúng thứ tự. Chạm từ ở dòng trên để bỏ ra.');
    L.reorder.forEach((r, i) => {
      const el = document.createElement('div');
      el.className = 'enr-q';
      el.innerHTML = `
        <p class="enr-q-text"><b>${i + 1}.</b></p>
        <div class="enr-line" lang="en"></div>
        <div class="enr-tiles" lang="en">${r.words.map((w, k) => `<button type="button" class="enr-tile" data-k="${k}">${esc(w)}</button>`).join('')}</div>
        <div class="enr-row-end"><button type="button" class="enr-clear" aria-label="Bỏ hết các từ đã xếp">🧹<span class="enr-clear-t"> Xoá</span></button><button type="button" class="enr-check">Kiểm tra</button></div>
        <p class="enr-fb" aria-live="polite"></p>`;
      ro.appendChild(el);
      const line = el.querySelector('.enr-line'), fb = el.querySelector('.enr-fb');
      let wrong = 0;
      el.querySelector('.enr-tiles').addEventListener('click', (e) => {
        const t = e.target.closest('.enr-tile');
        if (!t || el.classList.contains('is-ok')) return;
        line.appendChild(t);
      });
      line.addEventListener('click', (e) => {
        const t = e.target.closest('.enr-tile');
        if (!t || el.classList.contains('is-ok')) return;
        el.querySelector('.enr-tiles').appendChild(t);
      });
      el.querySelector('.enr-clear').addEventListener('click', () => {
        if (el.classList.contains('is-ok')) return;
        const tiles = el.querySelector('.enr-tiles');
        [...line.children, ...tiles.children].sort((a, b) => a.dataset.k - b.dataset.k).forEach((t) => tiles.appendChild(t));
        fb.textContent = '';
      });
      el.querySelector('.enr-check').addEventListener('click', () => {
        if (el.classList.contains('is-ok')) return;
        const got = [...line.children].map((t) => t.textContent).join(' ');
        if (line.children.length < r.words.length) { fb.textContent = 'Em xếp hết các từ đã.'; return; }
        if (norm(got) === norm(r.answer)) {
          el.classList.add('is-ok'); fb.innerHTML = `Đúng rồi! <b lang="en">${esc(r.answer)}</b>`; sayEn(r.answer); ok(false);
          return;
        }
        wrong++; shake(line);
        fb.textContent = 'Chưa đúng thứ tự. Chạm từ ở dòng trên để bỏ ra và xếp lại.';
        if (wrong >= 2 && !el.querySelector('.enr-reveal')) {
          fb.insertAdjacentHTML('afterend', '<button type="button" class="enr-reveal">Xem đáp án</button>');
          el.querySelector('.enr-reveal').addEventListener('click', (e) => {
            e.target.remove();
            el.classList.add('is-ok', 'is-revealed');
            fb.innerHTML = `Đáp án: <b lang="en">${esc(r.answer)}</b>`;
            ok(true);
          });
        }
      });
    });

    const rw = sec('🔁 Viết lại câu', '');
    L.rewrite.forEach((r, i) => {
      const el = document.createElement('div');
      el.className = 'enr-q';
      el.innerHTML = `
        <p class="enr-q-text"><b>${i + 1}.</b> ${esc(r.instructionVi)}</p>
        <p class="enr-prompt" lang="en">${esc(r.prompt)}</p>
        <div class="enr-input-row"><textarea class="enr-input" rows="1" lang="en" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="Viết lại câu"></textarea><button type="button" class="enr-check">Kiểm tra</button></div>
        <p class="enr-fb" aria-live="polite"></p>`;
      rw.appendChild(el);
      textAnswer(el, (v) => matches(v, [r.answer, ...(r.accept || [])]), r.answer, ok, {
        aiCheck: (v) => askTeacherEn('rewrite', `${r.instructionVi} Sentence: ${r.prompt}`, r.answer, v),
      });
    });
  }
}

function shake(el) {
  el.classList.remove('enr-shake');
  void el.offsetWidth;
  el.classList.add('enr-shake');
}
