/**
 * ▶️ Xem thơ / truyện bằng tranh: bài đọc thành phim, mỗi khổ (hoặc mỗi nhóm đoạn văn) một cảnh vẽ
 * (tiengViet3/scenes/tuanNN.js). Máy đọc từng dòng / từng đoạn; chỗ đang đọc sáng lên và hình của
 * nó hiện ra trong cảnh (data-l="k"), để bé đọc theo và nhớ bài nhờ hình. Cả trang chữ hiện sẵn (mờ)
 * nên không xô chữ khi đọc; cỡ chữ tự co cho vừa bảng (fitText).
 *
 * File cảnh:
 *   thơ:  export default [cảnh khổ 1, cảnh khổ 2, …]            (mỗi cảnh là hàm trả về <svg>)
 *   truyện: export default { groups: [[0, 1], [2, 3, 4], …], scenes: [cảnh…] }  (chỉ số đoạn trong read.paras)
 *   truyện đoạn dài: thêm sentences: true → groups đánh số theo CÂU (mọi đoạn tách câu, đếm nối tiếp từ 0,
 *     xem splitSentences / node scripts/tv3-sentences.mjs <tuần>); câu cùng đoạn vẫn hiện liền một đoạn.
 * Trong cảnh: data-l="n" hiện từ dòng/đoạn thứ n của trang (đếm từ 1), data-off="m" ẩn từ dòng m,
 *   data-talk="2,4": nhân vật đang nói ở đoạn 2 và 4 thì nhún nhảy (is-talking).
 */
import { say, stopSpeaking, whenQuiet, isMuted, setMuted } from '../preschool/fx.js';
import { proseUnits } from './sentences.js';

export { splitSentences } from './sentences.js';

const SCENES = Object.fromEntries(Object.entries(import.meta.glob('./scenes/*.js', { eager: true, import: 'default' }))
  .map(([p, v]) => [p.match(/(\w+)\.js$/)[1], v]));

/** Icon nút điều khiển: SVG cùng một nét (emoji ⏮⏸🔊 mỗi máy vẽ một kiểu). */
const svgIcon = (body) => `<svg viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`;
const ICON = {
  prev: svgIcon('<rect x="5" y="5" width="2.6" height="14" rx="1.2"/><path d="M19 6.2v11.6a1 1 0 0 1-1.5.86L9.3 12.86a1 1 0 0 1 0-1.72l8.2-5.8A1 1 0 0 1 19 6.2z"/>'),
  next: svgIcon('<rect x="16.4" y="5" width="2.6" height="14" rx="1.2"/><path d="M5 6.2v11.6a1 1 0 0 0 1.5.86l8.2-5.8a1 1 0 0 0 0-1.72L6.5 5.34A1 1 0 0 0 5 6.2z"/>'),
  play: svgIcon('<path d="M8 5.3v13.4a1.1 1.1 0 0 0 1.7.92l10.2-6.7a1.1 1.1 0 0 0 0-1.84L9.7 4.38A1.1 1.1 0 0 0 8 5.3z"/>'),
  pause: svgIcon('<rect x="6" y="5" width="4.2" height="14" rx="1.4"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.4"/>'),
  again: svgIcon('<path d="M12 5a7 7 0 1 1-6.6 4.7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M3.6 4.6l1.6 5.4 5.3-1.8z"/>'),
  sound: svgIcon('<path d="M4 9.5h3.2L12 5.6v12.8l-4.8-3.9H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18.2 6.4a8 8 0 0 1 0 11.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>'),
  muted: svgIcon('<path d="M4 9.5h3.2L12 5.6v12.8l-4.8-3.9H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z"/><path d="M15.5 9.5l5 5M20.5 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>'),
};

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Phim của tuần { scenes, pages: [[{t, para}…]…], prose } hoặc null khi tuần chưa có phim. */
export function scenesFor(week) {
  const s = SCENES[`tuan${String(week.week).padStart(2, '0')}`];
  const read = week.read;
  if (!s || !read) return null;
  if (Array.isArray(s)) return read.poem?.length === s.length ? { scenes: s, pages: read.poem.map(st => st.map(t => ({ t }))), prose: false } : null;
  if (!read.paras) return null;
  const units = proseUnits(read, s.sentences);
  const used = s.groups.flat();
  const ok = s.groups.length === s.scenes.length && used.length === units.length && used.every((v, i) => v === i);
  if (!ok) { console.warn('[tv3] phim tuần', week.week, 'không khớp số đoạn/câu', units.length); return null; }
  return { scenes: s.scenes, pages: s.groups.map(g => g.map(i => units[i])), prose: true };
}

/** Một trang: thơ mỗi dòng một <p>; truyện gộp các câu cùng đoạn vào một <p>, mỗi câu một <span>. */
function pageHtml(st, prose) {
  if (!prose) return st.map((u, j) => `<p data-j="${j}">${esc(u.t)}</p>`).join('');
  const paras = [];
  st.forEach((u, j) => {
    const last = paras[paras.length - 1];
    const span = `<span data-j="${j}">${esc(u.t)}</span>`;
    if (last && last.para === u.para) last.html.push(span); else paras.push({ para: u.para, html: [span] });
  });
  return paras.map(p => `<p>${p.html.join(' ')}</p>`).join('');
}

/** Câu đưa cho giọng đọc: bỏ gạch đầu dòng lời thoại. */
const speakable = (t) => t.replace(/^\s*[-–]\s*/, '').replace(/\s+[-–]\s+/g, ', ');

export function openPoemPlayer(week) {
  const film = scenesFor(week);
  if (!film) return;
  const { scenes, pages: poem, prose } = film;
  const unit = prose ? 'Cảnh' : 'Khổ';
  const { title, author } = week.read;
  const root = document.createElement('div');
  root.className = `tvmv${prose ? ' is-prose' : ''}`;
  root.setAttribute('data-no-i18n', '');
  root.innerHTML = `
    <div class="tvmv-stage">${scenes.map((f, i) => `<div class="tvmv-scene" data-k="${i}">${f()}</div>`).join('')}</div>
    <div class="tvmv-board">
      <div class="tvmv-head">
        <div class="tvmv-title">${esc(title)}</div>
        <div class="tvmv-dots">${poem.map((_, i) => `<button type="button" class="tvmv-dot" data-k="${i}" aria-label="${unit} ${i + 1}">${i + 1}</button>`).join('')}</div>
      </div>
      <div class="tvmv-lines">${poem.map((st, i) => `<div class="tvmv-st" data-k="${i}">${pageHtml(st, prose)}</div>`).join('')}</div>
      <div class="tvmv-author">${esc(author || '')}</div>
      <div class="tvmv-ctrl">
        <button type="button" class="tvmv-b tvmv-prev" aria-label="${unit} trước">${ICON.prev}</button>
        <button type="button" class="tvmv-b tvmv-play is-main" aria-label="Phát / dừng">${ICON.pause}</button>
        <button type="button" class="tvmv-b tvmv-next" aria-label="${unit} sau">${ICON.next}</button>
        <button type="button" class="tvmv-b tvmv-mute${isMuted() ? ' is-off' : ''}" aria-label="Tiếng">${isMuted() ? ICON.muted : ICON.sound}</button>
      </div>
    </div>
    <button type="button" class="tvmv-close" aria-label="Đóng">✕</button>`;
  document.body.appendChild(root);
  document.body.classList.add('tvmv-open');

  let k = 0;         // khổ đang xem
  let j = -1;        // dòng đang đọc (-1: chưa đọc dòng nào)
  let playing = true;
  let run = 0;       // đổi mỗi lần nhảy khổ / dừng, để lượt đọc cũ không chạy tiếp
  let cancelWait = null;
  let timer = null;

  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);

  function paint() {
    $$('.tvmv-scene').forEach(el => el.classList.toggle('is-on', +el.dataset.k === k));
    $$('.tvmv-st').forEach(el => el.classList.toggle('is-on', +el.dataset.k === k));
    $$('.tvmv-dot').forEach(el => {
      el.classList.toggle('is-on', +el.dataset.k === k);
      el.classList.toggle('is-done', +el.dataset.k < k);
    });
    const st = root.querySelector(`.tvmv-st[data-k="${k}"]`);
    st.querySelectorAll('[data-j]').forEach(p => {
      const n = +p.dataset.j;
      p.classList.toggle('is-now', n === j);
      p.classList.toggle('is-read', n < j || (j === -2));
    });
    // Hình của dòng thứ n (data-l="n", đếm từ 1) hiện khi đã đọc tới dòng đó
    const sc = root.querySelector(`.tvmv-scene[data-k="${k}"]`);
    // data-off="m": hình nhường chỗ cho hình khác từ dòng m (vd. bạn nhỏ đứng → ngẩng nhìn trời)
    const cur = j === -2 ? 99 : j + 1;
    sc.querySelectorAll('[data-l]').forEach(g => {
      const n = +g.dataset.l, off = +g.dataset.off || 0;
      g.classList.toggle('is-shown', n <= cur && !(off && cur >= off));
    });
    sc.querySelectorAll('[data-talk]').forEach(g => g.classList.toggle('is-talking', j >= 0 && g.dataset.talk.split(',').includes(String(j + 1))));
    $('.tvmv-play').innerHTML = playing ? ICON.pause : ICON.play;
    $('.tvmv-prev').disabled = k === 0;
    $('.tvmv-next').disabled = k === poem.length - 1;
  }

  function stopTurn() {
    run++;
    cancelWait?.(); cancelWait = null;
    clearTimeout(timer);
    stopSpeaking();
  }

  /** Đọc dòng `n` của khổ hiện tại rồi dòng sau; hết khổ thì nghỉ một chút sang khổ sau. */
  function readLine(n) {
    const my = run;
    const st = poem[k].map(u => u.t);
    if (n >= st.length) {
      j = -2; paint(); // cả khổ sáng: bé nhìn lại một lượt
      timer = setTimeout(() => {
        if (my !== run) return;
        if (k < poem.length - 1) goTo(k + 1, true);
        else { playing = false; paint(); $('.tvmv-play').innerHTML = ICON.again; }
      }, 1800);
      return;
    }
    j = n; paint();
    say(speakable(st[n]), { rate: prose ? 0.88 : 0.8 });
    cancelWait = whenQuiet(() => {
      if (my !== run) return;
      timer = setTimeout(() => my === run && readLine(n + 1), 350);
    }, { min: 1300 + st[n].length * (prose ? 55 : 70), max: 4000 + st[n].length * 110 });
  }

  function goTo(n, play = playing) {
    stopTurn();
    k = Math.max(0, Math.min(poem.length - 1, n));
    j = -1;
    playing = play;
    paint();
    if (playing) timer = setTimeout(() => readLine(0), 900); // chờ cảnh mới hiện
  }

  function togglePlay() {
    if (!playing && j === -2 && k === poem.length - 1) { goTo(0, true); return; } // hết bài: xem lại từ đầu
    if (playing) { stopTurn(); playing = false; paint(); return; }
    playing = true;
    const from = j < 0 ? 0 : j; // đọc lại dòng đang dừng
    stopTurn(); paint();
    readLine(from);
  }

  /** Cỡ chữ lớn nhất mà trang dài nhất vẫn vừa bảng (mọi trang cùng một cỡ, không nhảy cỡ khi sang cảnh). */
  function fitText() {
    const box = $('.tvmv-lines');
    const sts = [...$$('.tvmv-st')];
    let lo = 13, hi = prose ? 34 : 52;
    const fits = (px) => { box.style.setProperty('--fz', `${px}px`); return sts.every(st => st.scrollHeight <= box.clientHeight + 1 && st.scrollWidth <= box.clientWidth + 1); };
    while (hi - lo > 0.5) { const mid = (lo + hi) / 2; if (fits(mid)) lo = mid; else hi = mid; }
    box.style.setProperty('--fz', `${Math.floor(lo)}px`);
  }
  const ro = new ResizeObserver(() => fitText());
  ro.observe($('.tvmv-lines'));

  function close() {
    ro.disconnect();
    stopTurn();
    removeEventListener('keydown', onKey);
    document.body.classList.remove('tvmv-open');
    root.remove();
  }
  function onKey(e) {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') goTo(k + 1);
    else if (e.key === 'ArrowLeft') goTo(k - 1);
    else if (e.key === ' ') { e.preventDefault(); togglePlay(); }
  }

  $('.tvmv-close').onclick = close;
  $('.tvmv-prev').onclick = () => goTo(k - 1);
  $('.tvmv-next').onclick = () => goTo(k + 1);
  $('.tvmv-play').onclick = togglePlay;
  $('.tvmv-mute').onclick = (e) => {
    setMuted(!isMuted());
    e.currentTarget.innerHTML = isMuted() ? ICON.muted : ICON.sound;
    e.currentTarget.classList.toggle('is-off', isMuted());
  };
  $$('.tvmv-dot').forEach(b => b.onclick = () => goTo(+b.dataset.k));
  // Chạm vào một dòng: đọc lại dòng đó
  $$('.tvmv-st [data-j]').forEach(p => p.onclick = () => {
    if (+p.closest('.tvmv-st').dataset.k !== k) return;
    stopTurn(); playing = true; readLine(+p.dataset.j);
  });
  addEventListener('keydown', onKey);

  goTo(0, true);
  return { close };
}
