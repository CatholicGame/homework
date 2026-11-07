/**
 * Thang hạt của ghế nóng (docs/HatGiong.md mục 8.2) và thẻ kết quả cuối lượt, lớp DOM trong trường quay (studio.js gọi):
 *   intro()            lúc MC đọc luật: thang trượt vào, sáng lần lượt mốc 5 ("Mốc an toàn"), mốc 10 (tấm séc), câu 15 (100 hạt);
 *                      nằm đó tới câu 1
 *   climb(n, passed)   trước mỗi câu: hiện 2,5 giây, vệt sáng leo lên bậc n, rồi ẩn
 *   pass(n)            lật đúng câu n: bậc nháy xanh, "+hạt" bật lên; câu 5 / 10 khoá vàng
 *   toggle()           khán giả / người chơi chạm viên "Đang giữ": mở / đóng cả thang
 *   cheque(n, nick)    vượt câu n ≥ 10: tấm séc chứng nhận hiện giữa màn hình, MC Thầy Minh ký (chữ ký chạy nét), rồi thu lại
 *   result(r)          hết lượt: thẻ "Bạn mang về" đếm số hạt lên, tấm séc nhỏ nếu đã vượt câu 10; r.me (máy người chơi) thì hạt bay về bộ đếm
 * Giảm chuyển động: không trượt / leo, chỉ hiện / ẩn và đổi màu.
 */
import { HOT, MILESTONES, hotKeep } from '../engine/seeds.js';
import { GRAIN, collect } from '../pages/seedsUi.js';
import { chequeSvg, loadChequeFonts } from '../pages/cheque.js';

const fmt = (n) => n.toLocaleString('vi-VN');

export function makeLadder(root, { calm = false } = {}) {
  const el = document.createElement('div');
  el.className = 'ch-ladder';
  el.hidden = true;
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<p class="ch-ld-h">${GRAIN}<span>Thang sao</span></p><ol>${Array.from({ length: 15 }, (_, k) => {
    const n = 15 - k, ms = MILESTONES.includes(n);
    return `<li data-n="${n}" class="${ms ? 'is-ms' : ''}${n >= 10 ? ' is-cheque' : ''}${n === 15 ? ' is-top' : ''}"><b>${n}</b><span>${fmt(HOT[n])}<i>${GRAIN}</i></span>${n >= 10 ? '<em class="ch-ld-chq" title="Giấy khen"></em>' : ''}<small></small></li>`;
  }).join('')}</ol>`;
  root.appendChild(el);
  const row = (n) => el.querySelector(`li[data-n="${n}"]`);
  let cur = 0, passed = 0, hideT = 0, introT = [], pinned = false;

  function paint() {
    for (const li of el.querySelectorAll('li')) {
      const n = +li.dataset.n;
      li.classList.toggle('is-cur', n === cur);
      li.classList.toggle('is-done', n <= passed);
      li.classList.toggle('is-safe', MILESTONES.includes(n) && n <= passed);
    }
  }
  function show(ms = 0) {
    clearTimeout(hideT);
    el.hidden = false;
    requestAnimationFrame(() => el.classList.add('is-on'));
    if (ms) hideT = setTimeout(hide, ms);
  }
  function hide() {
    clearTimeout(hideT);
    if (pinned) return;
    el.classList.remove('is-on');
    hideT = setTimeout(() => { el.hidden = true; }, calm ? 0 : 400);
  }
  const tag = (n, text, cls = '') => { const s = row(n)?.querySelector('small'); if (!s) return; s.textContent = text; s.className = cls; };
  const clearIntro = () => { introT.forEach(clearTimeout); introT = []; el.querySelectorAll('li.is-glow').forEach(li => li.classList.remove('is-glow')); el.querySelectorAll('small').forEach(s => { s.textContent = ''; s.className = ''; }); };

  return {
    intro() {
      clearIntro();
      cur = 1; passed = 0;
      paint();
      show();
      const step = (n, text, at) => introT.push(setTimeout(() => { row(n)?.classList.add('is-glow'); tag(n, text, 'is-on'); }, calm ? 0 : at));
      step(5, 'Mốc an toàn', 1500);
      step(10, 'Mốc an toàn · giấy khen đầu tiên', 5000);
      step(15, '30 ngôi sao!', 8500);
    },
    climb(n, p = n - 1) {
      clearIntro();
      cur = n; passed = Math.max(0, p);
      paint();
      const li = row(n);
      if (li && !calm) { li.classList.remove('is-climb'); void li.offsetWidth; li.classList.add('is-climb'); }
      show(2500);
    },
    pass(n) {
      passed = n; cur = n;
      paint();
      const li = row(n);
      if (!li) return;
      li.classList.remove('is-flash'); void li.offsetWidth; li.classList.add('is-flash');
      tag(n, `+${HOT[n]}`, 'is-plus');
      show(MILESTONES.includes(n) ? 3200 : 2200);
    },
    toggle() {
      pinned = !pinned;
      if (pinned) { paint(); show(); } else hide();
    },
    set(n, p) { cur = n; passed = p; paint(); },
    hideNow() { pinned = false; clearIntro(); hide(); },
    cheque(n, nick = '') {
      root.querySelector('.ch-cheque')?.remove();
      const box = document.createElement('div');
      box.className = `ch-cheque${n >= 15 ? ' is-win' : ''}`;
      box.setAttribute('role', 'img');
      root.appendChild(box);
      loadChequeFonts().then(() => {
        if (!box.isConnected) return;
        box.innerHTML = chequeSvg({ passed: n, nick, sign: calm ? 'done' : 'anim' });
        requestAnimationFrame(() => box.classList.add('is-on'));
        // nằm đó đủ lâu để MC ký xong và mọi người đọc được, rồi thu về phía thang hạt
        setTimeout(() => { box.classList.remove('is-on'); box.classList.add('is-out'); setTimeout(() => box.remove(), 700); }, calm ? 5000 : 6800);
      });
    },
    /** Thẻ kết quả: { passed, keep, stop, win, name, me }. */
    result(r) {
      const old = root.querySelector('.ch-result');
      old?.remove();
      const keep = r.keep ?? hotKeep(r.passed || 0, r.stop), passedN = r.passed || 0;
      const card = document.createElement('div');
      card.className = `ch-result${passedN >= 10 ? ' has-cheque' : ''}${r.win ? ' is-win' : ''}`;
      card.setAttribute('role', 'status');
      const who = r.me ? 'Bạn mang về' : `${r.name || 'Người chơi'} mang về`;
      card.innerHTML = `<p class="ch-rs-who">${who}</p>
        <p class="ch-rs-n"><i>${GRAIN}</i><b>0</b></p><p class="ch-rs-u">ngôi sao</p>
        ${passedN >= 10 ? `<p class="ch-rs-chq"><em></em>Giấy khen câu ${passedN}</p>` : ''}
        <p class="ch-rs-sub">${r.win ? 'Vượt qua cả 15 câu hỏi!' : r.stop ? `Dừng lại sau câu ${passedN}` : passedN ? `Đã vượt ${passedN} câu` : 'Hẹn bạn lần sau!'}</p>`;
      root.appendChild(card);
      requestAnimationFrame(() => card.classList.add('is-on'));
      const b = card.querySelector('.ch-rs-n b');
      if (calm || !keep) b.textContent = fmt(keep);
      else {
        const t0 = performance.now(), ms = Math.min(2200, 600 + keep * 25);
        const step = (now) => { const k = Math.min(1, (now - t0) / ms); b.textContent = fmt(Math.round(keep * (1 - (1 - k) ** 3))); if (k < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      }
      // máy người chơi: hạt bay từ thẻ về bộ đếm (seedsUi collect, bộ đếm nhỏ góc trên phải)
      if (r.me && keep) setTimeout(() => { if (!card.isConnected) return; const q = card.getBoundingClientRect(); collect(keep, { x: q.left + q.width / 2, y: q.top + q.height / 2 }, { force: true }); }, calm ? 300 : 2500);
      setTimeout(() => { card.classList.remove('is-on'); setTimeout(() => card.remove(), 500); }, 7500);
    },
    dispose() { clearTimeout(hideT); clearIntro(); el.remove(); root.querySelector('.ch-result')?.remove(); root.querySelector('.ch-cheque')?.remove(); },
  };
}
