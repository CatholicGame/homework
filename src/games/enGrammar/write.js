/**
 * ✍️ Tự viết: bước 3 của một bài Ngữ pháp tiếng Anh (src/games/enGrammar.js). Dữ liệu src/data/enGrammar/write.js.
 * Mỗi màn một câu: 3 câu tiếng Việt bé dịch sang tiếng Anh, 1 câu bé tự đặt theo cấu trúc đang học.
 * Bé gõ vào ô (hoặc chạm chữ gợi ý để chèn), bấm Kiểm tra:
 *   - câu dịch khớp câu mẫu (norm của englishCheck.js) thì đúng ngay, không cần mạng;
 *   - lệch, hoặc câu tự đặt: cô DeepSeek chấm (requestEnglishCheck kind 'translate' | 'free', kèm cấu trúc đang học),
 *     sai thì hiện câu sửa + lời giải thích một dòng, câu đó được hỏi lại một lần ở cuối;
 *   - cô không chấm được (chưa đăng nhập, mất mạng, hết lượt): hiện câu mẫu, câu đó không tính điểm.
 * Bố cục giống màn Luyện, vùng cố định từ đầu: tiến độ / cảnh + bảng câu / vùng gõ / thanh nhắc.
 * Dòng gợi ý trên bảng giữ chỗ sẵn (visibility), bật lên không đẩy gì.
 */
import { norm } from '../englishCheck.js';
import { requestEnglishCheck } from '../../engine/writing.js';

const PRAISE = ['Đúng rồi!', 'Giỏi quá!', 'Chính xác!', 'Hay lắm!'];
const AI_ERR = {
  auth: 'Em cần đăng nhập để cô chấm câu.',
  limit: 'Hôm nay cô chấm nhiều quá rồi.',
  net: 'Mạng đang yếu nên cô chưa chấm được.',
};

/**
 * @param view  vùng .eg-view
 * @param u     bài (u.en, u.rule)
 * @param items writeItems(u.id)
 * @param h     { esc, rich, shuffle, pick, reduced, sayEn, stopEn, playSfx, scene, grade, onEnd({ right, total }) }
 */
export function mountWrite(view, u, items, h) {
  const { esc, rich, shuffle, pick, reduced, sayEn, stopEn, playSfx } = h;
  const queue = items.map((q, i) => ({ q, i }));
  const wrongOnce = new Set();
  let right = 0, total = items.length, pos = 0, alive = true, busy = false, timers = [];
  const later = (fn, ms) => timers.push(setTimeout(() => { if (alive) fn(); }, ms));
  const focus = `${u.en}. ${String(u.rule || '').replace(/\*/g, '')}`.slice(0, 400);

  view.innerHTML = `
    <div class="eg-play eg-write">
      <div class="eg-prog" aria-hidden="true">${items.map(() => '<i></i>').join('')}</div>
      <div class="eg-scene">${h.scene}
        <div class="eg-board eg-wboard">
          <div class="eg-pic" aria-hidden="true"></div>
          <div class="eg-q"></div>
          <div class="eg-hints" lang="en"></div>
          <div class="eg-fix">&nbsp;</div>
        </div>
      </div>
      <div class="eg-choices is-write">
        <div class="eg-wrow">
          <input class="eg-in" type="text" lang="en" inputmode="text" autocomplete="off" autocorrect="off" autocapitalize="sentences" spellcheck="false" maxlength="160" placeholder="Viết câu tiếng Anh ở đây" aria-label="Câu tiếng Anh của em">
          <button type="button" class="eg-wbtn eg-hint-btn" title="Gợi ý từ">💡</button>
        </div>
        <button type="button" class="eg-wbtn eg-check">✓ Kiểm tra</button>
      </div>
      <div class="eg-fb"><p class="eg-fb-t">&nbsp;</p><button type="button" class="eg-fb-next" hidden>Tiếp ▶</button></div>
    </div>`;
  const $ = (s) => view.querySelector(s);
  const board = $('.eg-board'), picEl = $('.eg-pic'), qEl = $('.eg-q'), hintsEl = $('.eg-hints'), fixEl = $('.eg-fix');
  const zone = $('.eg-choices'), input = $('.eg-in'), checkBtn = $('.eg-check'), hintBtn = $('.eg-hint-btn');
  const fb = $('.eg-fb'), fbT = $('.eg-fb-t'), nextBtn = $('.eg-fb-next');
  const dots = [...view.querySelectorAll('.eg-prog i')];
  const anim = (el, kf, ms) => el.animate?.(kf, { duration: reduced() ? Math.min(ms, 200) : ms, easing: 'ease-out' });
  const shake = (el) => anim(el, reduced() ? [{ opacity: 1 }, { opacity: 0.5 }, { opacity: 1 }] : [{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(0)' }], 340);
  let cur = null;

  const say = (t) => { fb.className = 'eg-fb'; fbT.innerHTML = t; nextBtn.hidden = true; };
  const syncBtn = () => checkBtn.classList.toggle('is-ready', !!input.value.trim() && !busy);

  function step() {
    timers.forEach(clearTimeout); timers = [];
    if (!alive) return;
    if (pos >= queue.length) { h.onEnd({ right, total }); return; }
    cur = queue[pos];
    const q = cur.q, retry = wrongOnce.has(cur.i);
    dots.forEach((d, i) => d.classList.toggle('is-cur', i === cur.i));
    picEl.textContent = q.pic;
    picEl.style.setProperty('--n', Math.max(1, [...(Intl.Segmenter ? new Intl.Segmenter().segment(q.pic) : q.pic)].length));
    qEl.innerHTML = q.kind === 'free'
      ? `<p class="eg-ask">✍️ Tự đặt câu</p><p class="eg-vi">${rich(q.vi)}</p>`
      : `<p class="eg-ask">✍️ Viết câu này bằng tiếng Anh</p><p class="eg-vi">${esc(q.vi)}</p><p class="eg-use">Dùng: <b lang="en">${esc(u.en)}</b></p>`;
    const modelWords = (q.answers[0] || '').replace(/[.?!]$/, '').split(/\s+/);
    const words = q.kind === 'free' && q.keys.length ? q.keys : modelWords; // câu tự đặt: chỉ gợi từ cần dùng
    hintsEl.innerHTML = shuffle(words).map((w) => `<button type="button" class="eg-hint">${esc(w)}</button>`).join('');
    hintsEl.classList.remove('is-on');
    fixEl.innerHTML = '&nbsp;'; fixEl.classList.remove('is-on');
    board.classList.toggle('is-retry', retry);
    input.value = ''; input.disabled = false; input.classList.remove('is-ok', 'is-bad');
    zone.classList.remove('is-locked');
    busy = false; syncBtn();
    say(retry ? '🔁 Viết lại câu này' : q.kind === 'free' ? '👆 Viết câu của em rồi bấm Kiểm tra' : '👆 Gõ câu tiếng Anh rồi bấm Kiểm tra');
    anim(board, [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], 260);
    if (!matchMedia?.('(pointer: coarse)').matches) input.focus({ preventScroll: true });
  }

  function verdict(ok, line, fix) {
    const first = !wrongOnce.has(cur.i);
    if (ok && first) { right++; dots[cur.i].className = 'ok'; }
    if (ok && !first) dots[cur.i].className = 'fixed';
    if (!ok) { if (first) { dots[cur.i].className = 'bad'; queue.push(cur); } wrongOnce.add(cur.i); }
    input.classList.add(ok ? 'is-ok' : 'is-bad');
    if (!ok) shake(input);
    if (fix) { fixEl.innerHTML = `<span lang="en">✓ ${esc(fix)}</span>`; fixEl.classList.add('is-on'); later(() => sayEn(fix), ok ? 0 : 500); }
    fb.className = `eg-fb ${ok ? 'is-ok' : 'is-bad'}`;
    fbT.innerHTML = ok ? `🎉 ${pick(PRAISE)}${line ? ` <span>${esc(line)}</span>` : ''}` : `💡 ${esc(line || 'Xem câu đúng ở trên.')}`;
    finishTurn();
    playSfx(ok ? 'correct' : 'wrong', { vol: 0.6 });
  }
  /** Cô không chấm được: hiện câu mẫu, câu này không tính. */
  function ungraded(code) {
    total--;
    dots[cur.i].className = 'skip';
    const model = cur.q.answers[0];
    fixEl.innerHTML = `<span lang="en">${cur.q.kind === 'free' ? 'Ví dụ: ' : '✓ '}${esc(model)}</span>`; fixEl.classList.add('is-on');
    fb.className = 'eg-fb is-bad';
    fbT.innerHTML = `💡 ${esc(AI_ERR[code] || 'Cô chưa chấm được câu này.')} <span>Xem câu mẫu ở trên.</span>`;
    finishTurn();
    later(() => sayEn(model), 300);
  }
  function finishTurn() {
    busy = false;
    input.disabled = true;
    zone.classList.add('is-locked');
    checkBtn.classList.remove('is-ready');
    nextBtn.hidden = false;
    nextBtn.focus({ preventScroll: true });
  }

  async function check() {
    const text = input.value.trim().replace(/\s+/g, ' ');
    if (busy || zone.classList.contains('is-locked')) return;
    if (!text) { say('✏️ Em gõ câu vào ô trước đã'); shake(input); input.focus(); return; }
    const q = cur.q;
    // Câu dịch khớp câu mẫu: đúng ngay
    if (q.kind === 'translate' && q.answers.some((a) => norm(a) === norm(text))) {
      const shown = q.answers.find((a) => norm(a) === norm(text));
      verdict(true, '', shown);
      return;
    }
    busy = true; syncBtn();
    input.disabled = true;
    zone.classList.add('is-locked');
    fb.className = 'eg-fb is-wait';
    fbT.innerHTML = '⏳ Cô đang đọc câu của em…';
    const asked = cur;
    let v = null, code = '';
    try {
      v = await requestEnglishCheck({ kind: q.kind, task: q.vi.replace(/\*/g, ''), model: q.answers[0], text, grade: h.grade || 3, focus });
    } catch (e) { code = e?.code || 'ai'; }
    if (!alive || asked !== cur) return;
    if (!v) { ungraded(code); return; }
    verdict(v.ok, v.explain, v.ok ? (v.fix || text) : (v.fix || q.answers[0]));
  }

  checkBtn.onclick = check;
  input.addEventListener('input', syncBtn);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); check(); } });
  hintBtn.onclick = () => {
    if (zone.classList.contains('is-locked')) return;
    hintsEl.classList.add('is-on');
    playSfx('tap', { vol: 0.4 });
  };
  // chạm chữ gợi ý: chèn vào chỗ con trỏ
  hintsEl.addEventListener('click', (e) => {
    const b = e.target.closest('.eg-hint');
    if (!b || input.disabled) return;
    const w = b.textContent, v = input.value;
    const at = input.selectionStart ?? v.length;
    const left = v.slice(0, at).replace(/\s*$/, ''), right = v.slice(at).replace(/^\s*/, '');
    input.value = `${left}${left ? ' ' : ''}${w}${right ? ' ' : ' '}${right}`.replace(/\s+$/, ' ');
    const caret = (left ? left.length + 1 : 0) + w.length + 1;
    input.setSelectionRange?.(caret, caret);
    b.classList.add('is-used');
    sayEn(w);
    syncBtn();
  });
  nextBtn.onclick = () => { stopEn(); pos++; step(); };

  step();
  return () => { alive = false; timers.forEach(clearTimeout); };
}
