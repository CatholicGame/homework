/**
 * 🎬 Câu biến hình: mỗi chữ là một thẻ, câu đổi qua từng bước và các thẻ CHUYỂN ĐỘNG để bé thấy ngữ pháp vận hành
 * ("is" nhảy lên đầu thành câu hỏi, "not" rơi vào rồi dính lại thành "n't", chữ "s" bay vào đuôi "cat"…).
 * Kịch bản: src/data/enGrammar/anims.js, mỗi bước 'câu|lời giải thích tiếng Việt'.
 *
 * Cú pháp câu (chữ cách nhau bằng dấu cách):
 *   cat+s        dính liền: thẻ "s" dính vào sau "cat" (không có khoảng trắng)
 *   isn't@is     thẻ này là thẻ "is" của bước trước đổi thành "isn't" (trượt tới chỗ mới rồi loé sáng)
 *   *can*        tô màu (chữ đáng chú ý)
 *   !s           thẻ sai: gạch đỏ (vd. milk+!s: không thêm s)
 *   dấu . ? ! , cuối chữ tự tách thành thẻ dấu dính vào chữ trước
 * Chữ không có @ thì tìm thẻ cùng chữ (không phân biệt hoa thường) ở bước trước; dấu câu thừa thì ghép với dấu câu cũ (". → ?").
 * Thẻ cũ không còn dùng thì bay lên mờ dần, thẻ mới rơi xuống. Chế độ giảm chuyển động: vẫn chạy, chậm và êm hơn, không nảy.
 */

const PUNCT = /^[.?!,]+$/;
const norm = (t) => t.toLowerCase();

/** 'Is+n't@not she happy?' → [{ text, src, key, glue, punct, no }] */
export function tokenize(line) {
  const out = [];
  for (let raw of line.trim().split(/\s+/)) {
    let punct = '';
    const m = raw.match(/^(.*[^@.?!,])([.?!,]+)$/);
    if (m) { raw = m[1]; punct = m[2]; }
    raw.split('+').forEach((part, i) => {
      let [text, src] = part.split('@');
      let key = false, no = false;
      if (text.startsWith('!')) { no = true; text = text.slice(1); }
      if (/^\*.+\*$/.test(text)) { key = true; text = text.slice(1, -1); }
      out.push({ text, src, key, no, glue: i > 0, punct: PUNCT.test(text) });
    });
    if (punct) out.push({ text: punct, glue: true, punct: true, key: false, no: false });
  }
  return out;
}

/** Gán mã thẻ cho bước mới dựa trên bước trước. Trả về { tiles, gone, missing } (missing: @nguồn không tìm thấy). */
export function link(prev, next, nextId) {
  const free = prev.map((t) => ({ ...t, used: false }));
  const missing = [];
  const take = (pred) => { const t = free.find((x) => !x.used && pred(x)); if (t) t.used = true; return t; };
  // 1) @ nguồn chỉ rõ
  for (const t of next) if (t.src) { const o = take((x) => norm(x.text) === norm(t.src)); if (o) t.id = o.id; else missing.push(t.src); }
  // 2) cùng chữ (dấu câu ghép từ cuối câu ngược lên: dấu cuối câu giữ chỗ cuối)
  for (const t of next) if (!t.id && !t.src && !t.punct) { const o = take((x) => norm(x.text) === norm(t.text)); if (o) t.id = o.id; }
  const takeLast = (pred) => { const t = [...free].reverse().find((x) => !x.used && pred(x)); if (t) t.used = true; return t; };
  for (const t of [...next].reverse()) if (!t.id && !t.src && t.punct) { const o = takeLast((x) => x.text === t.text); if (o) t.id = o.id; }
  // 3) dấu câu đổi dạng (. → ?)
  for (const t of [...next].reverse()) if (!t.id && t.punct) { const o = takeLast((x) => x.punct); if (o) t.id = o.id; }
  for (const t of next) if (!t.id) t.id = nextId();
  return { tiles: next, gone: free.filter((x) => !x.used), missing };
}

/** Câu để đọc: bỏ thẻ sai, emoji, mũi tên. */
export function spokenOf(tiles) {
  let s = '';
  for (const t of tiles) {
    if (t.no || (!t.punct && !/[A-Za-z]/.test(t.text))) continue;
    s += (s && !t.glue && !t.punct ? ' ' : '') + t.text;
  }
  return s.trim();
}

/**
 * Gắn khung 🎬 vào host. steps: ['câu|giải thích', ...]. io: { rich, esc, sayEnSeq, stopEn, prefetchEn, playSfx, reduced }.
 * Trả về hàm dừng.
 */
export function mountMovie(host, steps, io) {
  const { rich, esc, sayEnSeq, stopEn, prefetchEn, playSfx, reduced } = io;
  let n = 0;
  const parsed = [];
  for (const s of steps) {
    const [line, note = ''] = s.split('|');
    const prev = parsed[parsed.length - 1]?.tiles || [];
    const { tiles } = link(prev, tokenize(line), () => `m${(n += 1)}`);
    parsed.push({ tiles, note, say: spokenOf(tiles) });
  }
  prefetchEn(parsed.map((p) => p.say));

  host.innerHTML = `
    <h2 class="eg-demo-h">🎬 Câu biến hình: bấm ▶</h2>
    <div class="eg-mv-stage"><div class="eg-mv-line" lang="en" role="button" tabindex="0" aria-label="Nghe câu"></div></div>
    <p class="eg-mv-note"></p>
    <div class="eg-mv-ctl">
      <button type="button" class="eg-mv-prev" aria-label="Bước trước">◀</button>
      <span class="eg-mv-dots">${parsed.map((_, i) => `<i data-i="${i}"></i>`).join('')}</span>
      <button type="button" class="eg-mv-next is-hint">▶ Tiếp</button>
    </div>`;
  const stage = host.querySelector('.eg-mv-stage'), line = host.querySelector('.eg-mv-line'), note = host.querySelector('.eg-mv-note');
  const prevBtn = host.querySelector('.eg-mv-prev'), nextBtn = host.querySelector('.eg-mv-next');
  let cur = 0, stopSay = null, timers = [], auto = false, alive = true;

  const tileHtml = (t) => `<span class="eg-mv-t${t.key ? ' is-key' : ''}${t.glue ? ' is-glued' : ''}${t.punct ? ' is-p' : ''}${t.no ? ' is-no' : ''}" data-id="${t.id}">${esc(t.text)}</span>`;
  const later = (fn, ms) => { const id = setTimeout(() => { if (alive) fn(); }, ms); timers.push(id); };
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };

  // Giữ chỗ: khung cao bằng bước cao nhất, không nhảy bố cục khi đổi bước.
  const fitHeight = () => {
    const probe = line.cloneNode(false);
    probe.style.cssText = 'position:absolute;visibility:hidden;left:0;right:0;top:0';
    stage.appendChild(probe);
    let h = 0;
    for (const p of parsed) { probe.innerHTML = p.tiles.map(tileHtml).join(''); h = Math.max(h, probe.offsetHeight); }
    probe.remove();
    stage.style.minHeight = `${h + 8}px`;
    let nh = 0;
    const np = note.cloneNode(false);
    np.style.cssText = 'position:absolute;visibility:hidden;left:0;right:0';
    note.parentNode.appendChild(np);
    for (const p of parsed) { np.innerHTML = rich(p.note); nh = Math.max(nh, np.offsetHeight); }
    np.remove();
    note.style.minHeight = `${nh}px`;
  };

  const paintUi = () => {
    host.querySelectorAll('.eg-mv-dots i').forEach((d, i) => { d.classList.toggle('is-on', i === cur); d.classList.toggle('is-past', i < cur); });
    prevBtn.disabled = cur === 0;
    nextBtn.textContent = cur === parsed.length - 1 ? '🔁 Xem lại từ đầu' : '▶ Tiếp';
    note.innerHTML = rich(parsed[cur].note);
  };

  const say = (onEnd) => { stopSay?.(); stopSay = sayEnSeq([parsed[cur].say], { onEnd }); };

  /** Vẽ bước i; animate: các thẻ chuyển động từ bước đang hiện. Trả về thời gian chuyển động (ms). */
  const show = (i, animate) => {
    cur = i;
    const html = parsed[i].tiles.map(tileHtml).join('');
    if (!animate) { line.innerHTML = html; paintUi(); return 0; }
    const ms = flipTo(line, html, { calm: reduced(), later });
    paintUi();
    return ms;
  };

  const step = (i, { chain = false } = {}) => {
    clearTimers(); stopSay?.(); stopSay = null;
    playSfx('swish', { vol: 0.35 });
    const ms = show(i, true);
    later(() => say(chain ? () => later(() => { if (auto && cur < parsed.length - 1) step(cur + 1, { chain: true }); else auto = false; }, 700) : undefined), ms + 120);
  };

  nextBtn.addEventListener('click', () => {
    nextBtn.classList.remove('is-hint');
    auto = false;
    if (cur < parsed.length - 1) { step(cur + 1); return; }
    // xem lại cả chuỗi từ đầu, tự chạy
    clearTimers(); stopSay?.();
    show(0, false);
    auto = true;
    later(() => say(() => later(() => { if (auto) step(1, { chain: true }); }, 700)), 200);
  });
  prevBtn.addEventListener('click', () => { auto = false; if (cur > 0) step(cur - 1); });
  host.querySelectorAll('.eg-mv-dots i').forEach((d) => d.addEventListener('click', () => { auto = false; const i = +d.dataset.i; if (i !== cur) step(i); }));
  const hear = () => { auto = false; clearTimers(); say(); line.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.03)' }, { transform: 'scale(1)' }], { duration: 300 }); };
  line.addEventListener('click', hear);
  line.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); hear(); } });

  show(0, false);
  fitHeight();
  const onResize = () => fitHeight();
  window.addEventListener('resize', onResize);
  return () => { alive = false; auto = false; clearTimers(); stopSay?.(); stopEn(); window.removeEventListener('resize', onResize); };
}

/** Thẻ chữ dạng HTML (dùng chung cho màn Luyện). */
export const tilesHtml = (tiles, esc) => tiles.map((t) => `<span class="eg-mv-t${t.key ? ' is-key' : ''}${t.glue ? ' is-glued' : ''}${t.punct ? ' is-p' : ''}${t.no ? ' is-no' : ''}" data-id="${t.id}">${esc(t.text)}</span>`).join('');

/**
 * Đổi nội dung line sang html mới; thẻ cùng data-id trượt (xa thì nhảy vòng cung), đổi chữ thì loé, thẻ mới rơi xuống,
 * thẻ mất bay lên mờ dần. calm: chế độ giảm chuyển động (vẫn chạy, êm hơn). Trả về thời gian chuyển động (ms).
 */
export function flipTo(line, html, { calm = false, later = (fn, ms) => setTimeout(fn, ms) } = {}) {
  const before = new Map();
  line.querySelectorAll('.eg-mv-t:not(.is-ghost)').forEach((e) => before.set(e.dataset.id, { r: e.getBoundingClientRect(), text: e.textContent, el: e }));
  line.innerHTML = html;
  const box = line.getBoundingClientRect();
  if (!box.height) return 0;
  const ids = new Set([...line.querySelectorAll('.eg-mv-t')].map((e) => e.dataset.id));
  before.forEach(({ r, el }, id) => {
    if (ids.has(id)) return;
    const g = el.cloneNode(true);
    g.classList.add('is-ghost');
    g.style.left = `${r.left - box.left}px`; g.style.top = `${r.top - box.top}px`; g.style.width = `${r.width}px`;
    line.appendChild(g);
    const an = g.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateY(${calm ? -12 : -34}px)${calm ? '' : ' scale(.7)'}` }], { duration: calm ? 420 : 380, easing: 'ease-in', fill: 'forwards' });
    an.onfinish = () => g.remove();
  });
  const MOVE_AT = 160, MOVE_MS = calm ? 760 : 680, IN_AT = calm ? 760 : 640;
  let end = 0;
  line.querySelectorAll('.eg-mv-t:not(.is-ghost)').forEach((e) => {
    const o = before.get(e.dataset.id), r = e.getBoundingClientRect();
    if (o) {
      const dx = o.r.left - r.left, dy = o.r.top - r.top;
      const moved = Math.abs(dx) > 1 || Math.abs(dy) > 1;
      if (moved) {
        const far = !calm && (Math.abs(dx) > 60 || Math.abs(dy) > 10);
        const frames = far
          ? [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: `translate(${dx / 2}px, ${dy / 2 - 46}px) scale(1.08)`, offset: 0.5 }, { transform: 'none' }]
          : [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }];
        e.animate(frames, { duration: MOVE_MS, delay: MOVE_AT, easing: 'cubic-bezier(.45,.05,.35,1)', fill: 'backwards' });
        if (far) { e.classList.add('is-jump'); later(() => e.classList.remove('is-jump'), MOVE_AT + MOVE_MS); }
        end = Math.max(end, MOVE_AT + MOVE_MS);
      }
      if (o.text !== e.textContent) {
        const at = moved ? MOVE_AT + MOVE_MS - 120 : MOVE_AT;
        e.animate(calm
          ? [{ filter: 'brightness(1)' }, { filter: 'brightness(1.25)', offset: 0.4 }, { filter: 'brightness(1)' }]
          : [{ transform: 'scale(1)' }, { transform: 'scale(1.25) rotate(-4deg)', offset: 0.35 }, { transform: 'scale(1)' }], { duration: 520, delay: at, easing: 'ease-out' });
        e.classList.add('is-morph');
        later(() => e.classList.remove('is-morph'), at + 900);
        end = Math.max(end, at + 520);
      }
    } else {
      e.animate(calm
        ? [{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'none' }]
        : [{ opacity: 0, transform: 'translateY(-40px) scale(.5)' }, { opacity: 1, transform: 'translateY(4px) scale(1.12)', offset: 0.7 }, { opacity: 1, transform: 'none' }],
      { duration: calm ? 520 : 480, delay: IN_AT, easing: 'ease-out', fill: 'backwards' });
      end = Math.max(end, IN_AT + 480);
    }
  });
  return end;
}

/**
 * Câu sai → câu đúng (màn Luyện): ghép chữ giống nhau theo dãy con chung dài nhất, chữ khác ở cùng chỗ thì đổi chữ.
 * Trả về { from, to } (thẻ có id; thẻ đổi hoặc mới ở câu đúng được tô màu).
 */
export function diffTiles(wrong, right) {
  const A = tokenize(wrong.replace(/[*+@]/g, '')), B = tokenize(right.replace(/[*+@]/g, ''));
  A.forEach((t, i) => { t.id = `a${i}`; });
  const n = A.length, m = B.length, L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = norm(A[i].text) === norm(B[j].text) ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  let i = 0, j = 0, gapA = [], gapB = [], k = 0;
  const flush = () => { gapB.forEach((t, x) => { t.key = true; t.id = gapA[x] ? gapA[x].id : `b${k++}`; }); gapA = []; gapB = []; };
  while (i < n || j < m) {
    if (i < n && j < m && norm(A[i].text) === norm(B[j].text)) { flush(); B[j].id = A[i].id; i++; j++; }
    else if (j < m && (i >= n || L[i][j + 1] >= L[i + 1][j])) gapB.push(B[j++]);
    else gapA.push(A[i++]);
  }
  flush();
  // chữ chỉ đổi chỗ (vd. "gave a cake me" → "gave me a cake"): dùng lại thẻ cũ để nó nhảy sang chỗ mới
  const used = new Set(B.map((t) => t.id));
  for (const t of B) {
    if (!t.id.startsWith('b')) continue;
    const o = A.find((x) => !used.has(x.id) && norm(x.text) === norm(t.text));
    if (o) { used.add(o.id); t.id = o.id; }
  }
  return { from: A, to: B };
}
