/**
 * 🃏 Thẻ từ (Đọc tiếng Anh): ôn từ vựng theo lặp lại ngắt quãng, KHÔNG tính tiến độ bài, không sao, mở lúc nào cũng được.
 * Dùng ở 2 chỗ trong games/englishReading.js: tab 🃏 Thẻ từ của một bài (từ của bài + từ khác trong bài + Học thêm)
 * và nút 🃏 Ôn từ ở danh sách (mọi từ của các bài em đã mở).
 *
 * Cơ sở khoa học (vì sao làm thế này):
 * - Gợi nhớ chủ động (testing effect, Roediger & Karpicke 2006): thẻ nào cũng kết thúc bằng một câu hỏi máy chấm,
 *   không cho bé tự bấm "em nhớ" (trẻ hay đoán quá mức mình nhớ, nên dữ liệu tự chấm không dùng được).
 * - Lặp lại ngắt quãng, khoảng cách giãn dần (Cepeda và cs. 2006, hộp Leitner): đúng thì lên hộp, lâu sau mới gặp lại;
 *   sai thì về hộp 1, gặp lại ngay trong lượt và ngày mai.
 * - Học lại liên tiếp (successive relearning, Rawson & Dunlosky 2011): từ mới hoặc từ sai phải được nhớ lại đúng
 *   một lần sau vài thẻ khác (không hỏi ngay sau khi vừa xem) rồi lượt mới coi là xong từ đó.
 * - Khó dần có chủ đích (desirable difficulties, Bjork): hộp thấp nhận ra (thấy từ chọn nghĩa), rồi nghe chọn nghĩa,
 *   rồi thấy nghĩa chọn từ, hộp cao tự viết ra (đánh vần). Tự tạo ra từ nhớ lâu hơn nhận ra.
 * - Mã kép (Paivio): hình + chữ + tiếng đọc + câu ví dụ trên mặt sau thẻ, hiện lại sau mỗi câu trả lời.
 * - Trộn lẫn (interleaving): đáp án nhiễu lấy từ cùng nhóm chủ đề để bé phải phân biệt; thứ tự thẻ trộn.
 * - Giới hạn tải nhận thức: lượt ngắn 15 thẻ, tối đa 5 từ mới; ưu tiên từ đến hạn trước.
 * - Độ trôi chảy: đúng nhưng quá chậm thì giữ hộp (chưa tự động), không lên.
 *
 * Kho: localStorage scopedKey('envocab-v1') = { w: { [từ viết thường]: { b: hộp 0–5, d: ngày đến hạn, l: mã bài,
 *   r: số lần đúng, x: số lần sai, s: ngày ôn gần nhất } } } (cloudSync.js SCOPED). Tính theo TỪ, không theo bài.
 */
import '../styles/english-cards.css';
import { scopedKey } from '../engine/auth.js';
import { sayEn, stopEn, unlockSpeech, prefetchEn } from '../engine/speakEn.js';
import { playSfx } from '../engine/sfx.js';
import { loadGloss, loadWords } from '../data/englishReading/index.js';

const STORE = 'envocab-v1';
const IV = [0, 1, 3, 7, 16, 35];   // ngày đến lần gặp sau, theo hộp
const KNOWN = 4;                   // hộp ≥ 4: đã thuộc
const SESSION = 15, NEW_MAX = 5, NEW_MIN = 2, AHEAD = 10;
const SLOW = { pick: 9000, spell: 25000 };
const LAG = 2;                     // số thẻ chen giữa lúc xem và lúc hỏi lại
const MAX_TRY = 3;

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
export const keyOf = (w) => String(w.word || w).trim().toLowerCase();
export const today = () => { const d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 6e4) / 864e5); };

export function loadCards() {
  try { return { w: {}, ...JSON.parse(localStorage.getItem(scopedKey(STORE))) }; } catch { return { w: {} }; }
}
function saveCards(s) {
  try { localStorage.setItem(scopedKey(STORE), JSON.stringify(s)); } catch { /* đầy bộ nhớ */ }
  window.dispatchEvent(new CustomEvent('tth:data-changed'));
}

/** 'new' chưa học · 'learning' đang nhớ · 'known' đã thuộc */
export const statusOf = (rec) => (!rec || !rec.b ? 'new' : rec.b >= KNOWN ? 'known' : 'learning');
export const isDue = (rec, t = today()) => !!rec && rec.b > 0 && rec.d <= t;

/** Số từ đến hạn ôn hôm nay trong toàn kho. */
export function dueCount() {
  const c = loadCards(), t = today();
  return Object.values(c.w).filter((r) => isDue(r, t)).length;
}

/** Bộ thẻ của một bài: nhóm 📚 từ của bài, 📖 từ khác trong bài, 🌟 Học thêm. Mỗi từ { word, vi, emoji, ex, ipa, l, g }. */
export async function lessonDeck(L) {
  const [gloss, more] = await Promise.all([loadGloss(L).catch(() => ({ words: {}, phrases: {} })), loadWords(L)]);
  const ipaOf = (w) => gloss.words?.[w.toLowerCase()]?.ipa || gloss.phrases?.[w.toLowerCase()]?.ipa || '';
  const raw = [
    { name: '📚 Từ mới của bài', words: (L.vocab || []).map((v) => ({ word: v.word, vi: v.vi, emoji: v.emoji, ex: v.example, ipa: ipaOf(v.word) })) },
    more.more?.length && { name: '📖 Từ khác trong bài', words: more.more },
    ...(more.topics || []).map((t) => ({ name: `🌟 Học thêm: ${t.name}`, words: t.words })),
  ].filter(Boolean);
  const seen = new Set();
  const groups = raw.map((g, gi) => ({
    name: g.name,
    words: g.words.filter((w) => { const k = keyOf(w); if (seen.has(k)) return false; seen.add(k); return true; })
      .map((w) => ({ word: w.word, vi: w.vi, emoji: w.emoji || '', ex: w.ex || '', ipa: w.ipa || '', l: L.id, g: `${L.id}:${gi}` })),
  })).filter((g) => g.words.length);
  return { groups, words: groups.flatMap((g) => g.words) };
}

/** Bộ thẻ chung từ nhiều bài (nút 🃏 Ôn từ): từ đầu tiên gặp giữ dữ liệu của bài sớm nhất. */
export async function mergedDeck(lessons) {
  const decks = await Promise.all(lessons.map((L) => lessonDeck(L)));
  const seen = new Set(), words = [];
  decks.forEach((d) => d.words.forEach((w) => { const k = keyOf(w); if (!seen.has(k)) { seen.add(k); words.push(w); } }));
  return { groups: [], words };
}

/** Chọn thẻ cho một lượt: từ đến hạn (quá hạn lâu, hộp thấp trước) + vài từ mới; không còn gì thì "ôn trước". */
export function planSession(words, cards = loadCards(), t = today()) {
  const rec = (w) => cards.w[keyOf(w)];
  const due = words.filter((w) => isDue(rec(w), t)).sort((a, b) => rec(a).d - rec(b).d || rec(a).b - rec(b).b);
  const fresh = words.filter((w) => statusOf(rec(w)) === 'new');
  const nNew = Math.min(fresh.length, NEW_MAX, Math.max(NEW_MIN, SESSION - due.length));
  const nDue = Math.min(due.length, SESSION - nNew);
  if (nNew + nDue) return { due: due.slice(0, nDue), fresh: fresh.slice(0, nNew), ahead: false };
  const early = words.filter((w) => rec(w)?.b).sort((a, b) => rec(a).b - rec(b).b || rec(a).d - rec(b).d).slice(0, AHEAD);
  return { due: shuffle(early), fresh: [], ahead: true };
}

/** Dạng câu hỏi theo hộp: nhận ra → nghe → nhớ ra → tự viết. */
const modeOf = (b) => (b <= 1 ? 'meaning' : b === 2 ? 'listen' : b === 3 ? 'recall' : 'spell');

/**
 * Vẽ màn 🃏 vào host.
 *   getDeck: () => Promise<{ groups, words }>     bộ thẻ (gọi lại sau mỗi lượt để vẽ lại tình trạng)
 *   wall: true                                   có bảng từ theo nhóm (tab trong bài)
 *   pool: () => Promise<words[]>                  kho lấy đáp án nhiễu khi bộ thẻ ít từ
 *   empty: html                                  khi bộ thẻ rỗng
 * Trả về hàm dọn (dừng đọc, gỡ phím).
 */
export function mountCards(host, { getDeck, wall = false, empty = '' }) {
  let off = [];
  const dispose = () => { off.forEach((f) => f()); off = []; };
  home();
  return () => { dispose(); stopEn(); };

  async function home() {
    dispose();
    host.innerHTML = '<p class="enc-loading">…</p>';
    const deck = await getDeck();
    if (!host.isConnected) return;
    if (!deck.words.length) { host.innerHTML = empty; return; }
    const cards = loadCards(), t = today();
    const st = { new: 0, learning: 0, known: 0 };
    deck.words.forEach((w) => { st[statusOf(cards.w[keyOf(w)])]++; });
    const plan = planSession(deck.words, cards, t);
    const n = plan.due.length + plan.fresh.length;
    const pct = (k) => (100 * st[k]) / deck.words.length;
    const planLine = plan.ahead
      ? 'Hôm nay em đã ôn hết các từ đến hạn. Ôn trước vài từ cũng được.'
      : [plan.due.length && `${plan.due.length} từ cần ôn`, plan.fresh.length && `${plan.fresh.length} từ mới`].filter(Boolean).join(' · ');
    host.innerHTML = `
      <section class="enc-home">
        <div class="enc-sum">
          <div class="enc-stats">
            <span class="enc-stat is-known"><b>${st.known}</b>đã thuộc</span>
            <span class="enc-stat is-learning"><b>${st.learning}</b>đang nhớ</span>
            <span class="enc-stat is-new"><b>${st.new}</b>chưa học</span>
          </div>
          <div class="enc-bar" aria-hidden="true"><i class="is-known" style="width:${pct('known')}%"></i><i class="is-learning" style="width:${pct('learning')}%"></i></div>
          <button type="button" class="enc-go">${plan.ahead ? '🔁 Ôn trước' : '▶ Ôn ngay'} <small>${n} thẻ</small></button>
          <p class="enc-plan">${esc(planLine)}</p>
          <p class="enc-how">Trả lời đúng thì từ đó lâu sau mới quay lại. Trả lời sai thì em sẽ gặp lại từ đó sớm hơn.</p>
        </div>
        ${wall ? deck.groups.map((g) => `
          <h2 class="enr-h">${esc(g.name)} <small class="enr-h-n">${g.words.length} từ</small></h2>
          <section class="enr-wgrid">${g.words.map((w) => {
            const s = statusOf(cards.w[keyOf(w)]);
            return `<button type="button" class="enr-wcard enc-wcard is-${s}" data-say="${esc(w.word)}">
              <span class="enc-dot" title="${s === 'known' ? 'Đã thuộc' : s === 'learning' ? 'Đang nhớ' : 'Chưa học'}"></span>
              <span class="enr-wcard-pic" aria-hidden="true">${w.emoji}</span>
              <span class="enr-wcard-w"><b lang="en">${esc(w.word)}</b></span>
              ${w.ipa ? `<span class="enr-ipa">/${esc(w.ipa)}/</span>` : ''}
              <span class="enr-word-vi">${esc(w.vi)}</span>
            </button>`;
          }).join('')}</section>`).join('') : ''}
      </section>`;
    host.querySelectorAll('.enc-wcard').forEach((b) => b.addEventListener('click', () => { unlockSpeech(); sayEn(b.dataset.say); }));
    host.querySelector('.enc-go').addEventListener('click', () => { unlockSpeech(); run(deck, plan); });
  }

  /* ── Một lượt ôn ── */
  function run(deck, plan) {
    dispose();
    const cards = loadCards(), t = today();
    const pool = deck.words;
    prefetchEn([...plan.fresh, ...plan.due].flatMap((w) => [w.word, w.ex].filter(Boolean)));
    // Hàng đợi: từ mới (xem thẻ) chen giữa các từ ôn; câu hỏi của từ mới được chèn sau LAG thẻ khi xem xong.
    const reviews = shuffle(plan.due).map((w) => ({ w, kind: 'quiz' }));
    const queue = [];
    plan.fresh.forEach((w) => { queue.push({ w, kind: 'study' }); queue.push(...reviews.splice(0, 2)); });
    queue.push(...reviews);
    const total = plan.fresh.length + plan.due.length;
    const state = new Map(); // từ → { first: true|false|null (đúng ngay lần hỏi đầu), tries, done, from }
    let finished = 0, cur = null, t0 = 0, locked = false, advanceTimer = 0;

    host.innerHTML = `
      <section class="enc-run">
        <div class="enc-top">
          <button type="button" class="enc-quit" aria-label="Dừng lượt ôn">✕</button>
          <div class="enc-prog" aria-hidden="true"><i></i></div>
          <span class="enc-n"></span>
        </div>
        <div class="enc-stage"><div class="enc-grid">
          <div class="enc-cardzone"><div class="enc-card"><div class="enc-face enc-front"></div><div class="enc-face enc-back"></div></div></div>
          <div class="enc-actzone"><div class="enc-act"></div></div>
        </div></div>
      </section>`;
    const $ = (s) => host.querySelector(s);
    const runEl = $('.enc-run'), card = $('.enc-card'), act = $('.enc-act');
    // Vùng ôn cao vừa khít phần còn lại của màn hình (dưới thanh dính)
    const fit = () => {
      const top = runEl.getBoundingClientRect().top;
      const stick = document.querySelector('.enr-stick')?.getBoundingClientRect().bottom || 0;
      runEl.style.height = `${Math.max(440, window.innerHeight - Math.max(stick, Math.min(top, stick + 16)) - 12)}px`;
    };
    fit();
    runEl.scrollIntoView({ block: 'end' });
    window.addEventListener('resize', fit);
    off.push(() => window.removeEventListener('resize', fit));
    $('.enc-quit').addEventListener('click', () => { clearTimeout(advanceTimer); stopEn(); summary(true); });

    const onKey = (e) => {
      if (!runEl.isConnected || runEl.closest('.enr-pane')?.hidden || e.ctrlKey || e.metaKey || e.altKey) return;
      if (/^(INPUT|TEXTAREA)$/.test(document.activeElement?.tagName)) return;
      if (e.key === 'Enter' || e.key === ' ') { const nx = act.querySelector('.enc-next:not([disabled])'); if (nx && getComputedStyle(nx).visibility !== 'hidden') { e.preventDefault(); nx.click(); } return; }
      if (/^[1-4]$/.test(e.key)) { act.querySelectorAll('.enc-opt')[Number(e.key) - 1]?.click(); return; }
      act.__key?.(e);
    };
    document.addEventListener('keydown', onKey);
    off.push(() => document.removeEventListener('keydown', onKey));
    off.push(() => clearTimeout(advanceTimer));

    next();

    function progress() {
      $('.enc-prog i').style.width = `${(100 * finished) / Math.max(1, total)}%`;
      $('.enc-n').textContent = `${Math.min(finished + 1, total)}/${total}`;
    }

    function backFace(w) {
      return `
        <span class="enc-pic" aria-hidden="true">${w.emoji}</span>
        <span class="enc-word"><b lang="en">${esc(w.word)}</b><button type="button" class="enc-say" data-say="${esc(w.word)}" aria-label="Nghe">🔊</button></span>
        ${w.ipa ? `<span class="enc-ipa">/${esc(w.ipa)}/</span>` : ''}
        <span class="enc-vi">${esc(w.vi)}</span>
        ${w.ex ? `<span class="enc-ex"><span lang="en">${esc(w.ex)}</span><button type="button" class="enc-say is-sm" data-say="${esc(w.ex)}" aria-label="Nghe câu">🔊</button></span>` : ''}`;
    }
    card.addEventListener('click', (e) => { const b = e.target.closest('.enc-say'); if (b) { e.stopPropagation(); unlockSpeech(); sayEn(b.dataset.say); } });

    function setCard(frontHtml, backHtml, flipped) {
      card.classList.add('no-anim');
      card.classList.toggle('is-flipped', flipped);
      $('.enc-front').innerHTML = frontHtml;
      $('.enc-back').innerHTML = backHtml;
      void card.offsetWidth;
      card.classList.remove('no-anim');
      $('.enc-cardzone').classList.remove('is-in'); void card.offsetWidth; $('.enc-cardzone').classList.add('is-in');
    }

    function next() {
      clearTimeout(advanceTimer);
      cur = queue.shift();
      if (!cur) { summary(false); return; }
      locked = false;
      progress();
      const { w } = cur;
      if (cur.kind === 'study') {
        setCard('', backFace(w), true);
        act.className = 'enc-act is-study';
        act.innerHTML = `<p class="enc-tag">✨ Từ mới</p><button type="button" class="enc-next is-big">Tiếp ▶</button>`;
        act.__key = null;
        act.querySelector('.enc-next').addEventListener('click', () => {
          queue.splice(Math.min(LAG, queue.length), 0, { w, kind: 'quiz' });
          next();
        });
        sayEn(w.word);
        return;
      }
      const rec = cards.w[keyOf(w)];
      const s = state.get(keyOf(w));
      const mode = s?.tries ? modeOf(1) : modeOf(rec?.b || 0); // hỏi lại sau khi sai: dạng dễ nhất
      cur.mode = mode;
      t0 = Date.now();
      if (mode === 'spell') return spell(w);
      choice(w, mode);
    }

    /** Đáp án nhiễu: cùng nhóm trước, rồi cả bộ; nghĩa và từ không trùng. */
    function distractors(w, n) {
      const ok = (x) => x !== w && keyOf(x) !== keyOf(w) && x.vi !== w.vi;
      const same = shuffle(pool.filter((x) => ok(x) && x.g === w.g));
      const rest = shuffle(pool.filter((x) => ok(x) && x.g !== w.g));
      const out = [];
      for (const x of [...same, ...rest]) {
        if (out.length >= n) break;
        if (!out.some((y) => y.vi === x.vi || keyOf(y) === keyOf(x))) out.push(x);
      }
      return out;
    }

    function choice(w, mode) {
      const opts = shuffle([w, ...distractors(w, 3)]);
      const front = mode === 'meaning'
        ? `<span class="enc-q">Từ này nghĩa là gì?</span><span class="enc-word is-big"><b lang="en">${esc(w.word)}</b><button type="button" class="enc-say" data-say="${esc(w.word)}" aria-label="Nghe">🔊</button></span>`
        : mode === 'listen'
          ? `<span class="enc-q">Nghe rồi chọn nghĩa</span><button type="button" class="enc-say is-huge" data-say="${esc(w.word)}" aria-label="Nghe lại">🔊</button>`
          : `<span class="enc-q">Tiếng Anh là gì?</span><span class="enc-pic" aria-hidden="true">${w.emoji}</span><span class="enc-vi is-big">${esc(w.vi)}</span>`;
      setCard(front, backFace(w), false);
      const label = (x) => (mode === 'recall' ? `<b lang="en">${esc(x.word)}</b>`
        : mode === 'meaning' ? `<span class="enc-opt-pic" aria-hidden="true">${x.emoji}</span><span>${esc(x.vi)}</span>` : `<span>${esc(x.vi)}</span>`);
      act.className = `enc-act is-choice is-${mode}`;
      act.innerHTML = `<div class="enc-opts">${opts.map((x, i) => `<button type="button" class="enc-opt" data-i="${i}"><i class="enc-k" aria-hidden="true">${i + 1}</i>${label(x)}</button>`).join('')}</div>
        <div class="enc-foot"><p class="enc-fb" aria-live="polite">&nbsp;</p><button type="button" class="enc-next">Tiếp ▶</button></div>`;
      act.__key = null;
      act.querySelectorAll('.enc-opt').forEach((b) => b.addEventListener('click', () => {
        if (locked) return;
        const x = opts[Number(b.dataset.i)];
        const ok = x === w;
        b.classList.add(ok ? 'is-right' : 'is-wrong');
        if (!ok) act.querySelector(`.enc-opt[data-i="${opts.indexOf(w)}"]`).classList.add('is-right');
        answered(ok, Date.now() - t0 > SLOW.pick);
      }));
      if (mode !== 'recall') sayEn(w.word);
    }

    function spell(w) {
      const isL = (c) => /[a-z]/i.test(c);
      const chars = [...w.word];
      const slots = chars.map((c) => (isL(c) ? { c, tile: null } : { c, fixed: true }));
      const letters = chars.filter(isL);
      const extra = shuffle('abcdefghijklmnopqrstuvwxyz'.split('').filter((c) => !letters.map((x) => x.toLowerCase()).includes(c))).slice(0, letters.length > 7 ? 1 : 2);
      const tiles = shuffle([...letters.map((c) => c.toLowerCase()), ...extra]).map((c) => ({ c, used: false }));
      let hinted = false;
      setCard(`<span class="enc-q">Viết từ tiếng Anh</span><span class="enc-pic" aria-hidden="true">${w.emoji}</span><span class="enc-vi is-big">${esc(w.vi)}</span><button type="button" class="enc-say" data-say="${esc(w.word)}" aria-label="Nghe">🔊</button>`, backFace(w), false);
      act.className = 'enc-act is-spell';
      act.innerHTML = `<div class="enc-spellbox"><div class="enc-slots" lang="en"></div><div class="enc-tiles" lang="en"></div>
        <div class="enc-tools"><button type="button" class="enc-del" aria-label="Xoá chữ cuối">⌫</button><button type="button" class="enc-hint">💡 Gợi ý</button></div></div>
        <div class="enc-foot"><p class="enc-fb" aria-live="polite">&nbsp;</p><button type="button" class="enc-next">Tiếp ▶</button></div>`;
      const draw = () => {
        act.querySelector('.enc-slots').innerHTML = slots.map((s, i) => (s.fixed
          ? `<span class="enc-gap${s.c === ' ' ? ' is-space' : ''}">${s.c === ' ' ? '' : esc(s.c)}</span>`
          : `<button type="button" class="enc-slot${s.tile != null ? ' is-full' : ''}${s.bad ? ' is-bad' : ''}${s.hint ? ' is-hint' : ''}" data-i="${i}">${s.tile != null ? esc(tiles[s.tile].c) : ''}</button>`)).join('');
        act.querySelector('.enc-tiles').innerHTML = tiles.map((x, i) => `<button type="button" class="enc-tile" data-i="${i}"${x.used ? ' disabled' : ''}>${esc(x.c)}</button>`).join('');
      };
      const put = (ti) => {
        if (locked || tiles[ti].used) return;
        const s = slots.find((x) => !x.fixed && x.tile == null);
        if (!s) return;
        s.tile = ti; tiles[ti].used = true; slots.forEach((x) => { x.bad = false; });
        draw();
        if (slots.every((x) => x.fixed || x.tile != null)) check();
      };
      const take = (si) => {
        const s = slots[si];
        if (locked || !s || s.fixed || s.tile == null || s.hint) return;
        tiles[s.tile].used = false; s.tile = null;
        draw();
      };
      let wrongOnce = false;
      const check = () => {
        const bad = slots.filter((s) => !s.fixed && tiles[s.tile].c !== s.c.toLowerCase());
        if (!bad.length) { answered(!hinted && !wrongOnce, Date.now() - t0 > SLOW.spell); return; }
        // sai lần 1: tô đỏ, trả chữ về, cho sửa (đã tính là chưa nhớ chắc); sai lần 2: hiện đáp án
        if (wrongOnce) {
          slots.forEach((s) => { if (!s.fixed) s.bad = tiles[s.tile].c !== s.c.toLowerCase(); });
          draw();
          answered(false, false);
          return;
        }
        wrongOnce = true;
        bad.forEach((s) => { s.bad = true; });
        draw();
        playSfx('wrong', { vol: 0.5 });
        act.querySelector('.enc-fb').textContent = 'Chữ tô đỏ chưa đúng, em thử lại một lần.';
        locked = true;
        setTimeout(() => {
          if (!act.isConnected) return;
          bad.forEach((s) => { tiles[s.tile].used = false; s.tile = null; s.bad = false; });
          locked = false; draw();
        }, 900);
      };
      const hint = () => {
        if (locked) return;
        const s = slots.find((x) => !x.fixed && (x.tile == null || tiles[x.tile].c !== x.c.toLowerCase()));
        if (!s) return;
        if (s.tile != null) { tiles[s.tile].used = false; s.tile = null; }
        let ti = tiles.findIndex((x) => !x.used && x.c === s.c.toLowerCase());
        if (ti < 0) {
          const o = slots.find((x) => !x.fixed && x !== s && x.tile != null && !x.hint && tiles[x.tile].c === s.c.toLowerCase());
          if (!o) return;
          ti = o.tile; o.tile = null; tiles[ti].used = false;
        }
        hinted = true; s.tile = ti; s.hint = true; tiles[ti].used = true;
        draw();
        if (slots.every((x) => x.fixed || x.tile != null)) check();
      };
      act.addEventListener('click', (e) => {
        const tl = e.target.closest('.enc-tile'); if (tl) return put(Number(tl.dataset.i));
        const sl = e.target.closest('.enc-slot'); if (sl) return take(Number(sl.dataset.i));
        if (e.target.closest('.enc-del')) { const last = [...slots].reverse().find((x) => !x.fixed && x.tile != null && !x.hint); if (last) take(slots.indexOf(last)); }
        else if (e.target.closest('.enc-hint')) hint();
      });
      act.__key = (e) => {
        if (e.key === 'Backspace') { e.preventDefault(); act.querySelector('.enc-del')?.click(); return; }
        if (e.key.length !== 1 || !isL(e.key)) return;
        const ti = tiles.findIndex((x) => !x.used && x.c === e.key.toLowerCase());
        if (ti >= 0) put(ti);
      };
      draw();
      sayEn(w.word);
    }

    /** Ghi kết quả (chỉ lần hỏi đầu của từ trong lượt mới đổi hộp), lật thẻ cho xem đủ, rồi sang thẻ sau. */
    function answered(ok, slow) {
      locked = true;
      const { w } = cur;
      const k = keyOf(w);
      const s = state.get(k) || { first: null, tries: 0 };
      const r = cards.w[k] || { b: 0, d: t, l: w.l, r: 0, x: 0 };
      s.from ??= r.b;
      if (s.first === null) {
        s.first = ok;
        if (plan.ahead) { if (!ok) { r.b = 1; r.d = t; } }
        else if (ok) { r.b = slow && r.b > 0 ? r.b : Math.min(5, r.b + 1); r.d = t + IV[r.b]; }
        else { r.b = 1; r.d = t; }
      } else if (ok) {
        r.d = Math.max(r.d, t + 1); // nhớ lại được sau khi sai: mai gặp lại
      }
      if (ok) r.r++; else r.x++;
      r.s = t; r.l ||= w.l;
      cards.w[k] = r;
      saveCards(cards);
      if (!ok) s.tries++;
      const again = !ok && s.tries < MAX_TRY;
      if (!again) { s.done = true; finished++; }
      state.set(k, s);
      if (again) queue.splice(Math.min(LAG + 1, queue.length), 0, { w, kind: 'quiz' });
      progress();
      card.classList.add('is-flipped');
      const fb = act.querySelector('.enc-fb');
      const nx = act.querySelector('.enc-next');
      nx.classList.add('is-on');
      nx.addEventListener('click', () => next(), { once: true });
      act.querySelectorAll('.enc-opt, .enc-tile, .enc-slot, .enc-del, .enc-hint').forEach((b) => { b.disabled = true; });
      if (ok) {
        playSfx('correct', { vol: 0.5 });
        fb.textContent = slow ? 'Đúng rồi! Lần sau em nhớ nhanh hơn.' : ['Giỏi quá!', 'Đúng rồi!', 'Hay lắm!'][Math.floor(Math.random() * 3)];
        fb.className = 'enc-fb is-ok';
        sayEn(w.word);
        advanceTimer = setTimeout(() => { if (act.isConnected && cur?.w === w) next(); }, 2200);
      } else {
        playSfx('wrong', { vol: 0.5 });
        fb.textContent = again ? 'Em xem lại thẻ, lát nữa gặp lại từ này.' : 'Em xem lại thẻ, ngày mai gặp lại từ này.';
        fb.className = 'enc-fb is-bad';
        sayEn(w.word);
      }
    }

    function summary(quit) {
      dispose();
      const firstOk = [...state.values()].filter((s) => s.first === true).length;
      const asked = [...state.values()].filter((s) => s.first !== null).length;
      const up = [...state.entries()].filter(([k]) => (cards.w[k]?.b || 0) >= KNOWN && (state.get(k).from ?? 0) < KNOWN).length;
      const learnedNew = plan.fresh.filter((w) => state.get(keyOf(w))?.done).length;
      const missed = [...state.entries()].filter(([, s]) => s.first === false).map(([k]) => pool.find((w) => keyOf(w) === k)).filter(Boolean);
      host.innerHTML = `
        <section class="enc-end">
          <p class="enc-end-big">${quit && !asked ? '👋' : firstOk === asked && asked ? '🌟' : '🎉'}</p>
          <h2 class="enc-end-title">${asked ? `Đúng ngay ${firstOk}/${asked} từ` : 'Em dừng lượt ôn'}</h2>
          <div class="enc-end-chips">
            ${learnedNew ? `<span class="enc-chip is-learning">✨ ${learnedNew} từ mới</span>` : ''}
            ${up ? `<span class="enc-chip is-known">🏆 ${up} từ đã thuộc</span>` : ''}
          </div>
          ${missed.length ? `<p class="enc-end-sub">Từ cần nhớ thêm (sẽ gặp lại sớm):</p>
            <div class="enc-miss">${missed.map((w) => `<button type="button" class="enc-chip is-new" data-say="${esc(w.word)}"><span aria-hidden="true">${w.emoji}</span> <b lang="en">${esc(w.word)}</b> ${esc(w.vi)}</button>`).join('')}</div>` : ''}
          <button type="button" class="enc-go enc-done">Xong ▶</button>
        </section>`;
      host.querySelectorAll('.enc-miss .enc-chip').forEach((b) => b.addEventListener('click', () => sayEn(b.dataset.say)));
      host.querySelector('.enc-done').addEventListener('click', () => home());
      host.scrollIntoView({ block: 'start' });
    }
  }
}
