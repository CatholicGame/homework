/**
 * Khung xem truyện hoạt hình của một bài (phần 🎧 Nghe): sân khấu + nút + phụ đề + dải truyện + trò xếp lại thứ tự.
 *
 * Nhớ lâu bằng nhiều đường cùng lúc:
 *  - mỗi câu là một hành động nhìn thấy (đánh răng thì bàn chải chạy, bọt bay), giọng đọc và hình diễn cùng lúc;
 *  - cụm từ khoá của câu tô cam trong phụ đề và hiện thành ô có hình trên dải truyện (từ ↔ hình);
 *  - nhân vật đi qua các phòng theo thứ tự câu chuyện (nhớ theo đường đi);
 *  - xem xong: xếp lại các ô theo đúng thứ tự (gợi nhớ chủ động), xếp đúng ô nào máy đọc lại cụm từ đó.
 * Ẩn phụ đề (bỏ chọn 👁) để luyện nghe thật; khung phụ đề vẫn giữ chỗ nên không có gì nhảy.
 */
import '../../styles/english-story.css';
import { Stage } from './stage.js';
import { sayEnSeq, sayEn, stopEn, unlockSpeech } from '../../engine/speakEn.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/** Câu của bài, tách giống engine/readingGloss.js. */
export const sentencesOf = (text) => text.split(/\n{2,}/).flatMap((p) => p.match(/[^.!?]+(?:[.!?]+["”']?|$)\s*/g) || [p]).map((s) => s.replace(/\s+/g, ' ').trim()).filter(Boolean);

/** Đọc một câu, xong thì resolve (có hạn chờ phòng khi máy không báo đọc xong). */
function speak(text, rate) {
  return new Promise((res) => {
    let done = false;
    const fin = () => { if (!done) { done = true; res(); } };
    sayEnSeq([text], { rate, onEnd: fin });
    setTimeout(fin, (text.split(' ').length * 520) / rate + 1800);
  });
}

export async function mountStory(host, lesson, load, { onDone } = {}) {
  const story = (await load()).default;
  const sentences = sentencesOf(lesson.text);
  const beats = story.beats;
  const n = Math.min(beats.length, sentences.length);
  host.innerHTML = `
    <div class="es-player">
      <div class="es-stagewrap"></div>
      <div class="es-bar">
        <button type="button" class="es-play">▶ Xem truyện</button>
        <label class="enr-toggle"><input type="checkbox" class="es-slow"> 🐢 Đọc chậm</label>
        <label class="enr-toggle"><input type="checkbox" class="es-capon" checked> 👁 Hiện chữ</label>
      </div>
      <div class="es-cap"><span class="es-cap-n">▶</span><span class="es-cap-t">Bấm ▶ để xem và nghe truyện. Chạm một ô bên dưới để xem lại câu đó.</span></div>
      <div class="es-line">${beats.slice(0, n).map((b, i) => `<button type="button" class="es-chip" data-k="${i}"><span>${b.icon}</span><em lang="en">${esc(b.label)}</em></button>`).join('')}</div>
      <div class="es-orderwrap"></div>
    </div>`;
  const st = new Stage(host.querySelector('.es-stagewrap'), story, sentences, { speak });
  const playBtn = host.querySelector('.es-play');
  const cap = host.querySelector('.es-cap');
  const chips = [...host.querySelectorAll('.es-line .es-chip')];
  const rate = () => (host.querySelector('.es-slow').checked ? 0.62 : 0.85);
  let busy = false, next = 0, token = 0, finished = false, clean = false;

  host.querySelector('.es-capon').addEventListener('change', (e) => cap.classList.toggle('is-hidden', !e.target.checked));
  const caption = (k) => {
    let t = esc(sentences[k]);
    for (const key of beats[k].key || []) t = t.replace(esc(key), `<b>${esc(key)}</b>`);
    cap.innerHTML = `<span class="es-cap-n">${k + 1}</span><span class="es-cap-t" lang="en">${t}</span>`;
    chips.forEach((c, i) => c.classList.toggle('is-now', i === k));
    chips[k].classList.add('is-seen');
    // chỉ cuộn ngang dải truyện, không cuộn cả trang
    const line = chips[k].parentElement, c = chips[k];
    if (c.offsetLeft < line.scrollLeft || c.offsetLeft + c.offsetWidth > line.scrollLeft + line.clientWidth) {
      line.scrollTo({ left: c.offsetLeft - line.clientWidth / 2 + c.offsetWidth / 2, behavior: 'smooth' });
    }
  };
  const setBtn = () => { playBtn.textContent = busy ? '⏸ Dừng' : next > 0 && next < n ? '▶ Xem tiếp' : '▶ Xem truyện'; };

  async function playFrom(k, only = false) {
    const my = ++token;
    busy = true; setBtn();
    // Dựng lại đúng trạng thái trước câu k, trừ khi cảnh đang dừng gọn ngay trước câu k (bấm Xem tiếp sau một câu đã xong)
    if (!(clean && k === next && k > 0)) await st.jump(k);
    clean = false;
    for (let i = k; i < n; i++) {
      if (my !== token) return;
      caption(i);
      const ok = await st.beat(i, rate());
      if (!ok || my !== token) return;
      next = i + 1;
      clean = true;
      if (only) break;
      await new Promise((r) => setTimeout(r, 350));
    }
    if (my !== token) return;
    busy = false;
    chips.forEach((c) => c.classList.remove('is-now'));
    if (next >= n) { next = 0; if (!finished) { finished = true; showOrder(); onDone?.(); } }
    setBtn();
  }
  function stop() { if (busy) clean = false; token++; st.stop(); stopEn(); busy = false; setBtn(); }

  playBtn.addEventListener('click', () => {
    unlockSpeech();
    if (busy) { stop(); return; }
    playFrom(next);
  });
  chips.forEach((c) => c.addEventListener('click', async () => {
    unlockSpeech();
    stop();
    await new Promise((r) => setTimeout(r, 60));
    playFrom(Number(c.dataset.k), true);
  }));

  // ── Xếp lại thứ tự (sau khi xem hết một lượt) ──
  function showOrder() {
    const wrap = host.querySelector('.es-orderwrap');
    const pick = story.order || [1, 2, 4, 6, 8, 12].filter((i) => i < n);
    wrap.innerHTML = `<section class="es-order">
      <h3>🧩 Xếp lại câu chuyện</h3>
      <p>Chạm các ô theo đúng thứ tự trong truyện.</p>
      <div class="es-slots"></div>
      <div class="es-pool">${shuffle(pick).map((i) => `<button type="button" class="es-chip" data-k="${i}"><span>${beats[i].icon}</span><em lang="en">${esc(beats[i].label)}</em></button>`).join('')}</div>
    </section>`;
    const slots = wrap.querySelector('.es-slots'), box = wrap.querySelector('.es-order');
    let at = 0;
    wrap.querySelector('.es-pool').addEventListener('click', (e) => {
      const c = e.target.closest('.es-chip');
      if (!c || box.classList.contains('is-ok')) return;
      if (Number(c.dataset.k) === pick[at]) {
        slots.appendChild(c);
        sayEn((beats[pick[at]].key || [])[0] || beats[pick[at]].label);
        if (++at === pick.length) { box.classList.add('is-ok'); box.querySelector('p').textContent = 'Đúng hết rồi! Em nhớ truyện rất giỏi.'; }
      } else {
        c.classList.remove('is-bad'); void c.offsetWidth; c.classList.add('is-bad');
      }
    });
  }

  if (import.meta.env.DEV) host.__story = { playFrom, jump: (k) => st.jump(k), stage: st }; // scripts/english-reading-dev.html &beat=
  const off = () => { stop(); st.destroy(); };
  off.pause = stop;   // bé chuyển sang tab khác của bài: dừng đọc, giữ nguyên truyện và phần xếp thứ tự
  return off;
}
