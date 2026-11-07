/**
 * Đố vui "Ai là môn đệ thông thái" nhiều người (trường quay, khi đã nối máy chủ phòng realtime/room.js).
 *
 * MÁY CHỦ CẦM CHƯƠNG TRÌNH (realtime/show.js, từ 2026-11-06): hàng chờ, lượt, câu hỏi, đáp án, đồng hồ, quyền trợ giúp, phiếu
 * bầu, hạt mang về đều ở máy chủ; mỗi lần đổi bước máy chủ gửi cả phòng trạng thái mới (['G', st]). Máy này (người chơi hay khán
 * giả, như nhau) chỉ VẼ theo trạng thái ấy (render): dải câu hỏi, đồng hồ, giọng MC, nhạc, người chơi đi lên / xuống, thẻ kết quả;
 * và gửi lựa chọn của mình (người chơi: chọn, trợ giúp, người thân, dừng; khán giả: cùng trả lời, bình chọn, trả lời khi được hỏi).
 * Máy người chơi còn báo "MC đã nói xong" (net.go) để chương trình sang bước sớm; không báo (máy treo, tab ẩn, rớt mạng) thì máy
 * chủ tự sang khi hết hạn của bước. Không còn chỗ nào một máy hỏng giữ cả phòng.
 *
 * Bước mới tới đúng lúc (trạng thái còn mới, tab đang hiện) thì diễn đủ (MC đọc, phương án bật ra, người đi); tới muộn (vào phòng
 * giữa chừng, tab vừa hiện lại) thì đặt thẳng vào trạng thái, không diễn lại. Hai người kế tiếp trong hàng ngồi hai ghế chờ (theo
 * hàng chờ 'Q'); người đứng sai chỗ quá lâu thì được đặt thẳng vào chỗ (reconcile).
 */
import { t } from '../engine/lang.js';
import { whenQuiet } from '../engine/voice.js';
import { mc } from './mcVoice.js';
import { quizSfx } from './quizSfx.js';
import { icon } from './icons.js';
import { share } from '../engine/share.js';
import { testRoom } from '../engine/admin.js';
import { hotSeat } from '../engine/seeds.js';
import { hotKeep, PHONE } from '../quiz/rules.js';
import { eventsCached, nextOf, whenVn, hhmmVn, leftText } from '../engine/events.js';

const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const FRESH = 2500;   // ms: trạng thái cũ hơn thế (vào phòng giữa chừng, tab vừa hiện) thì không diễn lại bước, chỉ đặt vào trạng thái
const Q_IN = 2;       // giây: hiệu ứng "Câu n" và khung câu hỏi (church.css qov-num) xong mới tới phương án
const OPT_GAP = 0.7;  // giây giữa hai phương án khi MC im (tắt tiếng)
// bước đang hỏi (dải câu hỏi phase 'ask'), bước đã lật đáp án (phase 'reveal'); khớp realtime/show.js
const ASKING = new Set(['ask', 'answer', 'fifty', 'fiftyScan', 'audience', 'vote', 'voteResult', 'friend', 'phone', 'friendAsk', 'friendSaid']);
const OPEN = new Set(['reveal', 'timeup', 'skip', 'quit']);
// bước theo lời MC: máy người chơi báo MC đã nói xong (invite báo khi đã ngồi ghế nóng, fiftyScan / end theo giờ máy chủ)
const PACED = new Set(['greet', 'ask', 'lock', 'reveal', 'timeup', 'skip', 'quit', 'fifty', 'audience', 'voteResult', 'friendSaid']);

/**
 * ctx = { root, studio, stage (world.js studioShow), net, me() nhân vật của mình, myName, actorOf(id) nhân vật của người id
 * (mình hay người khác), ids() id những người khác trong phòng, people() [{ id, name, seat }] người khác đang ngồi, onRight,
 * cheer(actor) ghế sáng lên, tag(id) thẻ tên }
 */
export function makeQuizOnline(ctx) {
  const { root, studio, stage, net } = ctx;
  let hot = 0, queue = [];
  let cur = null, curAt = 0;   // trạng thái chương trình mới nhất của máy chủ, lúc nhận (performance.now)
  let myScore = null;          // [đúng, đã trả lời] của mình khi cùng trả lời với khán phòng
  const waits = new Map();     // id → số ghế chờ (0, 1) của người đang ngồi / đi tới ghế chờ
  const myId = () => net.id;
  const isMe = () => !!cur && cur.hot === myId();
  const inQueue = () => queue.includes(myId());

  // ---- nút đăng ký chơi (cột nút bên trái dưới nút thoát) và lời trạng thái bên cạnh
  const bar = document.createElement('div');
  bar.className = 'ch-qjoin';
  bar.innerHTML = `<button type="button" class="ch-qj-btn"></button><p class="ch-qj-msg"></p>`;
  (root.querySelector('.ch-lcol') || root).appendChild(bar);
  const barBtn = bar.firstElementChild, barMsg = bar.lastElementChild;
  const label = (ic, text, badge = '') => {
    barBtn.innerHTML = `${icon(ic)}<span>${text}</span>${badge ? `<b class="ch-badge">${badge}</b>` : ''}`;
    barBtn.title = text;
    barBtn.setAttribute('aria-label', text);
  };
  const askBox = document.createElement('div');
  askBox.className = 'ch-qask';
  askBox.hidden = true;
  askBox.setAttribute('role', 'status');
  root.appendChild(askBox);
  for (const el of [bar, askBox]) for (const ev of ['pointerdown', 'wheel', 'keydown']) el.addEventListener(ev, (e) => e.stopPropagation());

  // lượt của mình bị dừng vì mất kết nối: quay lại thì nói rõ một lúc
  let lostUntil = 0, lostT = 0, lostMsg = '';
  const lost = (msg) => {
    lostMsg = msg;
    lostUntil = Date.now() + 15000;
    clearTimeout(lostT);
    lostT = setTimeout(() => { lostUntil = 0; paintBar(); }, 15500);
  };
  function paintBar() {
    const me = myId(), k = queue.indexOf(me);
    bar.hidden = !net.ready || hot === me;
    if (bar.hidden) return;
    const n = queue.length;
    if (k < 0 && Date.now() < lostUntil) {
      barMsg.textContent = lostMsg;
      label('armchair', t('Đăng ký chơi'));
      barBtn.classList.add('is-go');
      return;
    }
    if (k >= 0) {
      barMsg.textContent = k === 0 && !hot ? (people < need ? t('Bạn đứng đầu hàng, chờ đủ người…') : t('Sắp tới lượt bạn…')) : `${t('Bạn thứ')} ${k + 1} ${t('trong hàng chờ')}`;
      label('x', t('Rời hàng chờ'), k + 1);
      barBtn.classList.remove('is-go');
    } else {
      barMsg.textContent = (hot ? (n ? `${t('Đang có người chơi')} · ${n} ${t('người chờ')}` : t('Đang có người chơi')) : t('Ghế nóng đang trống'))
        + (myScore ? ` · ${t('Bạn đúng')} ${myScore[0]}/${myScore[1]}` : '');
      label('armchair', t('Đăng ký chơi'));
      barBtn.classList.add('is-go');
    }
  }
  barBtn.onclick = () => {
    if (!net.ready) return;
    const seat = ctx.me()?.seat;
    if (!inQueue() && (!seat || seat.role)) return;   // phải đang ngồi một ghế khán giả (từ đó đi lên)
    net.queue(!inQueue());
  };

  let askT = 0;
  function askShow(html, sec = 0) {
    clearInterval(askT);
    askBox.hidden = !html;
    askBox.innerHTML = html || '';
    if (!html || !sec) return;
    const end = Date.now() + sec * 1000, el = askBox.querySelector('b.ch-qa-t');
    const tick = () => { const s = Math.max(0, Math.ceil((end - Date.now()) / 1000)); if (el) el.textContent = s; if (!s) clearInterval(askT); };
    tick();
    askT = setInterval(tick, 250);
  }
  // ---- khán giả chạm một phương án trên dải câu hỏi: cùng trả lời câu đang hỏi (một lần mỗi câu, tới lúc người chơi chốt),
  // bình chọn khi người chơi hỏi khán giả, trả lời khi được hỏi làm người thân. Một lần chạm làm mọi việc đang mở.
  let qKey = '', myPick = -1, asked = '', votedSeq = -1;
  const HINT = 'kt-qask-hint';
  let hintDone = false;
  try { hintDone = localStorage.getItem(HINT) === '1'; } catch { /* không nhớ được: nhắc trong buổi này */ }
  const learnt = () => { if (hintDone) return; hintDone = true; try { localStorage.setItem(HINT, '1'); } catch { /* bỏ qua */ } };
  askBox.addEventListener('click', (e) => { if (e.target.closest('.ch-qa-ok')) { learnt(); paintAsk(); } });
  const answering = () => !!cur && !isMe() && (cur.k === 'ask' || cur.k === 'answer') && myPick < 0;
  const voting = () => !!cur && !isMe() && cur.k === 'vote' && votedSeq !== cur.s;
  function tap(i) {
    const poll = voting() || !!asked;   // bình chọn / người thân: báo "Bạn chọn X"; cùng trả lời thì phương án sáng lên là đủ
    if (voting()) { net.vote(i); votedSeq = cur.s; }
    if (asked) { net.friendPick(i); asked = ''; setTimeout(() => paintAsk(), 4000); }
    if (answering()) { net.answer(i); myPick = i; studio.mark(i); learnt(); }
    paintAsk(poll ? i : -1);
  }
  function paintAsk(just = -1) {
    if (isMe()) { askShow(''); return; }
    const can = voting() || !!asked || answering();
    studio.answer(can ? tap : null);
    if (asked) askShow(`<b>${esc(asked)} ${t('hỏi ý kiến bạn')}</b><span>${t('Chạm phương án bạn nghĩ là đúng trên dải câu hỏi')}</span>`);
    else if (voting()) askShow(`<b>${t('Khán giả bình chọn')}</b><span>${t('Chạm phương án bạn chọn trên dải câu hỏi')}</span><b class="ch-qa-t"></b>`, Math.max(0, leftMs() / 1000));
    else if (answering()) askShow(hintDone ? '' : `<b>${t('Bạn chọn đáp án nào?')}</b><span>${t('Chạm một phương án để cùng trả lời')}</span><button type="button" class="ch-qa-ok">${t('Đã hiểu')}</button>`);
    else if (just >= 0) askShow(`<b>${t('Bạn chọn')} ${'ABCD'[just]}</b><span>${t('Chờ công bố đáp án…')}</span>`);
    else askShow('');
  }

  // ---- chờ đủ người thật (máy chủ: MIN_PLAYERS, docs/HatGiong.md 4.4): thẻ giữa trên, mời bạn bè, đếm ngược, MC nhắc
  let people = 0, need = 0, startAt = 0, waitTick = 0, mcWaitAt = 0, hintTill = 0, shared = false;
  const wait = document.createElement('div');
  wait.className = 'ch-qwait';
  wait.hidden = true;
  wait.setAttribute('role', 'status');
  root.appendChild(wait);
  for (const ev of ['pointerdown', 'wheel', 'keydown']) wait.addEventListener(ev, (e) => e.stopPropagation());
  // ván theo lịch (admin, engine/events.js): thẻ chờ ghi giờ ván tới để ai vào sớm biết quay lại lúc nào
  let events = [];
  eventsCached().then((l) => { events = l; if (!wait.hidden) paintWait(); });
  const schedLine = () => {
    const ev = nextOf(events, 'studio'), now = Date.now();
    if (!ev) return '';
    return `<p class="ch-qw-ev">${ev.startAt <= now ? t('Ván theo lịch đang mở đến {0}').replace('{0}', `<em>${hhmmVn(ev.endAt)}</em>`)
      : `${t('Ván tiếp theo: {0}').replace('{0}', `<em>${whenVn(ev.startAt, t, now)}</em>`)} · ${t('còn {0}').replace('{0}', leftText(ev.startAt - now, t))}`}</p>`;
  };
  const studioUrl = () => `${location.origin}/#/nha-tho/truong-quay`;
  async function invite(copy = false) {
    const k = Math.max(1, need - people);
    const text = t('Vào chơi Ai tài năng nhất? cùng mình! Phòng còn thiếu {0} người là bắt đầu.').replace('{0}', k);
    if (copy) { try { await navigator.clipboard.writeText(`${text} ${studioUrl()}`); wait.querySelector('.ch-qw-copy').textContent = t('Đã sao chép ✓'); } catch { /* không chép được */ } return; }
    try { await share({ title: t('Ai tài năng nhất?'), text, url: studioUrl() }); shared = true; paintWait(); } catch { /* đóng bảng chia sẻ */ }
  }
  function paintWait() {
    clearInterval(waitTick);
    const enough = people >= need;
    wait.hidden = !net.ready || !!hot || !need;
    if (wait.hidden) return;
    if (!enough) {
      const k = need - people;
      hintTill ||= Date.now() + 20000;
      wait.className = 'ch-qwait';
      wait.innerHTML = `<b>${t('Chờ đủ người để bắt đầu')}</b>
        <p class="ch-qw-dots" aria-hidden="true">${Array.from({ length: need }, (_, i) => `<i${i < people ? ' class="is-on"' : ''}></i>`).join('')}<span>${people} / ${need} ${t('người')}</span></p>
        <p>${t('Còn thiếu {0} người. Mời bạn bè vào cùng chơi!').replace('{0}', k)}</p>
        ${schedLine()}
        ${Date.now() > hintTill ? '' : `<p class="ch-qw-hint">${t('Ván chơi cần {0} người. Bạn mời bạn bè, người nhà, các bạn cùng lớp cùng vào.').replace('{0}', need)}</p>`}
        <div class="ch-qw-btns"><button type="button" class="ch-qw-share">${icon('users')}<span>${shared ? t('Đã mời ✓') : t('Mời bạn bè')}</span></button><button type="button" class="ch-qw-copy">${t('Sao chép đường dẫn')}</button></div>`;
      wait.querySelector('.ch-qw-share').onclick = () => invite();
      wait.querySelector('.ch-qw-copy').onclick = () => invite(true);
      if (nextOf(events, 'studio')) waitTick = setInterval(() => { const p = wait.querySelector('.ch-qw-ev'); if (p && !wait.hidden) p.outerHTML = schedLine(); }, 1000);
      if (Date.now() - mcWaitAt > 75000) { mcWaitAt = Date.now(); setTimeout(() => { if (!hot && people < need) mc.waitMore(need - people); }, 4000); }
      return;
    }
    if (startAt > Date.now()) {
      wait.className = 'ch-qwait is-go';
      const tick = () => {
        const sec = Math.max(0, Math.ceil((startAt - Date.now()) / 1000));
        wait.innerHTML = `<b>${t('Đủ người rồi!')}</b><p>${t('Chương trình bắt đầu sau {0} giây').replace('{0}', `<em>${sec}</em>`)}</p>`;
        if (!sec) clearInterval(waitTick);
      };
      tick();
      waitTick = setInterval(tick, 250);
      return;
    }
    wait.className = 'ch-qwait is-go';
    wait.innerHTML = queue.length ? `<b>${t('Đủ người rồi!')}</b><p>${t('Chương trình sắp bắt đầu…')}</p>`
      : `<b>${t('Đủ người rồi!')}</b><p>${t('Bấm Đăng ký chơi để lên ghế nóng.')}</p>`;
  }

  // ---- lật đáp án: khán phòng đã chọn thế nào, ghế người đúng sáng lên, % đúng cạnh tên
  const stat = document.createElement('div');
  stat.className = 'ch-qstat';
  stat.hidden = true;
  (root.querySelector('.ch-lcol') || root).appendChild(stat);
  const pct = (qa) => `${Math.round(qa[0] / qa[1] * 100)}%`;
  function answers(counts, a, list) {
    const total = counts.reduce((x, y) => x + y, 0), me = myId();
    for (const [id, i, right, n] of list) {
      if (id === me) myScore = [right, n];
      else ctx.tag?.(id)?.badge(pct([right, n]));
      if (i === a) ctx.cheer?.(ctx.actorOf(id));
    }
    if (!total) { stat.hidden = true; return; }
    const mine = list.find(r => r[0] === me)?.[1] ?? -1;
    if (mine >= 0 && mine === a && !isMe() && !testRoom()) ctx.onRight?.();   // khán giả trả lời đúng: một hạt (seeds.js quizRight, tối đa 15 / ngày)
    stat.innerHTML = `<p>${t('Khán phòng')} · ${total} ${t('người')}</p><div class="ch-qstat-bars">${counts.map((c, i) => `<div class="ch-qstat-bar${i === a ? ' is-right' : ''}${i === mine ? ' is-mine' : ''}" style="--v:${c / total}"><span>${Math.round(c / total * 100)}%</span><i></i><b>${'ABCD'[i]}</b></div>`).join('')}</div>${myScore ? `<p class="ch-qstat-me">${mine === a ? t('Bạn đúng!') : mine >= 0 ? t('Bạn chưa đúng.') : ''} ${myScore[0]}/${myScore[1]} (${pct(myScore)})</p>` : ''}`;
    stat.hidden = false;
    paintBar();
  }

  // ---- bảng của người chơi (cột nút bên trái): Dừng chơi, sang tiếp (khỏi chờ MC), chọn người thân; nút "Bỏ qua luật chơi"
  const panel = document.createElement('div');
  panel.className = 'ch-quizdev is-online';
  panel.hidden = true;
  panel.innerHTML = `<div class="ch-qd-friend" hidden><input type="text" maxlength="24" value="${t('Mẹ')}" aria-label="${t('Tên người thân')}">
      <button type="button" data-f="phone">${t('Gọi điện')}</button><div class="ch-qd-people"></div></div>
    <p class="ch-qd-msg" aria-live="polite"></p>
    <div class="ch-qd-foot"><button type="button" data-go="next" title="${t('Tiếp tục')}" aria-label="${t('Tiếp tục')}">${icon('next')}<span>${t('Tiếp tục')}</span></button><button type="button" data-go="off" title="${t('Thôi chơi, xuống sân khấu')}" aria-label="${t('Dừng chơi')}">${icon('stop')}<span>${t('Dừng chơi')}</span></button></div>`;
  (root.querySelector('.ch-lcol') || root).appendChild(panel);
  for (const ev of ['pointerdown', 'wheel', 'keydown']) panel.addEventListener(ev, (e) => e.stopPropagation());
  const pMsg = panel.querySelector('.ch-qd-msg'), pNext = panel.querySelector('[data-go="next"]'), pOff = panel.querySelector('[data-go="off"]');
  const friendBox = panel.querySelector('.ch-qd-friend');
  pNext.onclick = () => { if (cur && isMe()) { pNext.hidden = true; net.go(cur.s); } };
  pOff.onclick = () => { if (cur && isMe()) net.stop(); };
  friendBox.querySelector('[data-f="phone"]').onclick = () => {
    if (cur?.k === 'friend' && isMe()) net.friend({ phone: friendBox.querySelector('input').value.trim() || t('Người thân') });
  };
  const skipBtn = document.createElement('button');
  skipBtn.type = 'button';
  skipBtn.className = 'ch-skiprules';
  skipBtn.hidden = true;
  skipBtn.innerHTML = `<span>${t('Bỏ qua luật chơi')}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l9 7-9 7ZM17 5v14"/></svg>`;
  root.appendChild(skipBtn);
  skipBtn.onclick = () => { skipBtn.hidden = true; if (cur?.k === 'greet' && isMe()) { mc.stop(); net.rules(); } };
  function paintPanel() {
    const me = isMe(), k = cur?.k;
    panel.hidden = !me || !k || k === 'end';
    skipBtn.hidden = !me || k !== 'greet' || !cur.first;
    if (panel.hidden) { friendBox.hidden = true; return; }
    const right = k === 'reveal' && cur.pick === cur.q?.a && !cur.win;
    pOff.hidden = !(ASKING.has(k) || right || k === 'invite' || k === 'greet');
    pNext.hidden = !(right || k === 'skip' || k === 'voteResult' || k === 'friendSaid');
    friendBox.hidden = k !== 'friend';
    if (k === 'friend') {
      const box = friendBox.querySelector('.ch-qd-people'), list = ctx.people();
      box.innerHTML = list.length
        ? `<p>${t('Hoặc hỏi một người trong khán phòng:')}</p>${list.slice(0, 16).map(p => `<button type="button" data-p="${p.id}">${esc(p.name || t('Khán giả'))}${p.seat ? ` <small>${esc(p.seat)}</small>` : ''}</button>`).join('')}`
        : `<p>${t('Chưa có ai khác trong khán phòng để hỏi.')}</p>`;
      box.querySelectorAll('[data-p]').forEach(b => { b.onclick = () => { if (cur?.k === 'friend') net.friend({ id: +b.dataset.p }); }; });
    }
    pMsg.textContent = k === 'answer' ? t('Chọn một đáp án hoặc dùng quyền trợ giúp.')
      : k === 'friend' ? t('Chọn cách hỏi người thân.')
        : k === 'invite' ? `${t('Mời')} ${cur.name || t('bạn')} ${t('lên ghế nóng…')}` : '';
  }

  // ---- vẽ theo trạng thái máy chủ
  const leftMs = () => (cur ? Math.max(0, cur.left - (performance.now() - curAt)) : 0);
  const phaseOf = (k) => (ASKING.has(k) ? 'ask' : k === 'lock' ? 'lock' : OPEN.has(k) ? 'reveal' : null);
  function boardOf(st) {
    const ph = phaseOf(st.k);
    if (!ph || !st.q) return null;
    const fr = st.fr && (st.fr.mode === 'phone'
      ? { mode: 'phone', name: st.fr.name, pick: null, end: st.k === 'phone' ? Date.now() + Math.min(PHONE * 1000, leftMs()) : 0 }
      : { mode: 'seat', name: st.fr.name, seat: st.fr.seat, pick: st.fr.pick >= 0 ? st.fr.pick : null });
    return {
      n: st.n, q: st.q.q, o: st.q.o, cat: st.q.cat, a: st.q.a ?? -1, ex: st.q.ex || '', phase: ph,
      hide: st.hide, helps: { used: st.used, on: st.on }, poll: st.poll, friend: fr,
      seeds: { passed: st.passed, keep: hotKeep(st.passed, st.quit) }, who: st.name,
      pick: st.pick, win: st.win, timeout: st.timeout, skipped: st.skipped, quit: st.quit, lockSec: 3,
    };
  }
  // đồng hồ trả lời: chạy ở bước answer (theo hạn máy chủ), dừng lúc dùng trợ giúp, ẩn khi MC còn đọc câu hỏi
  let clockT = 0;
  function paintClock() {
    clearInterval(clockT);
    const c = cur?.clock;
    if (!c || cur.k === 'ask') { studio.clock?.(null); return; }
    const running = cur.k === 'answer', base = c.left, at = curAt;
    const put = () => studio.clock?.({ left: Math.max(0, base - (running ? performance.now() - at : 0)) / 1000, total: c.total, paused: !running });
    put();
    if (running) clockT = setInterval(put, 200);
  }
  // nhắc trong lúc chờ chọn (mọi máy cùng nhắc theo đồng hồ máy chủ): còn 10 giây, im lâu
  let nudgeT = [];
  function nudges(st) {
    nudgeT.forEach(clearTimeout);
    nudgeT = [];
    if (st.k !== 'answer' || !st.clock) return;
    const my = st.s, still = () => cur?.s === my;
    const left = st.clock.left, ten = left - 10000;
    if (ten > 1500) nudgeT.push(setTimeout(() => { if (still()) mc.tenLeft(still); }, ten));
    const quietAt = Math.min(12000, left - 16000);
    if (quietAt > 4000) nudgeT.push(setTimeout(() => { if (still()) mc.nudge(4 - st.used.length, true, still); }, quietAt));
  }

  // người chơi lên ghế nóng / về chỗ: diễn khi bước tới đúng lúc, còn không thì reconcile đặt thẳng
  const actorOfHot = (st) => ctx.actorOf(st.hot);
  function walkUp(st) {
    const a = actorOfHot(st), my = st.s;
    if (!a) { if (isMe()) net.go(my); return; }
    if (!st.first) quizSfx.walkup();
    stage.hot(a, () => {
      quizSfx.hotSeat();
      if (cur?.s === my && isMe()) net.go(my);   // đã ngồi ghế nóng: sang bước chào
    });
  }
  // máy người chơi báo MC đã nói xong bước này (min / max do máy chủ giữ, ở đây chỉ chờ MC im)
  let paceStop = null;
  function pace(st, live) {
    paceStop?.();
    paceStop = null;
    if (!isMe() || !PACED.has(st.k)) return;
    if (!live) { net.go(st.s); return; }
    const my = st.s;
    paceStop = whenQuiet(() => { paceStop = null; if (cur?.s === my) net.go(my); }, { min: 800, max: 90000 });
  }

  // bước mới tới đúng lúc: MC, nhạc, hiệu ứng (mọi máy như nhau)
  let optT = [];
  function perform(prev, st) {
    const k = st.k, q = st.q, a = actorOfHot(st);
    const still = () => cur?.s === st.s;
    mc.seed(st.s);
    mc.player(st.name);
    if (k === 'invite') {
      if (st.first) { quizSfx.intro(); mc.welcome(); }
      const go = cue(() => { if (still()) walkUp(st); }, 16);
      const clap = cue(() => { if (still()) studio.applaud(4, 0.15); }, 18);
      mc.invite({ go, clap, when: still });
    } else if (k === 'greet') {
      mc.greet(!!st.first);
      if (st.first) studio.ladder?.('intro');
    } else if (k === 'ask') {
      optT.forEach(clearTimeout);
      optT = [];
      const t0 = performance.now(), opened = new Set();
      const open = (i) => { if (!still() || opened.has(i)) return; opened.add(i); studio.showOption(i); };
      mc.ask({ q: q.q, o: q.o, hide: st.hide }, st.n, (i) => { const w = Q_IN * 1000 - (performance.now() - t0); w > 0 ? optT.push(setTimeout(() => open(i), w)) : open(i); }, still);
      const base = mc.live ? Q_IN + 2 + q.q.length * 0.075 : Q_IN, gap = mc.live ? 3.5 : OPT_GAP;
      for (let i = 0; i < 4; i++) optT.push(setTimeout(() => open(i), (base + i * gap) * 1000));
    } else if (k === 'answer') {
      const kept = [0, 1, 2, 3].filter(i => !st.hide.includes(i));
      if (prev?.k === 'fiftyScan') mc.fiftyLeft(kept);
      if (prev?.k === 'phone') mc.phoneEnd();
      if (prev && ASKING.has(prev.k) && prev.k !== 'ask') mc.helpsLeft(4 - st.used.length);
    } else if (k === 'lock') mc.pick(st.pick);
    else if (k === 'reveal') {
      const ok = st.pick === q.a;
      mc.reveal({ ...q, a: q.a }, st.pick, st.win, st.n, st.passed, ok ? null : hotKeep(st.passed));
      if (a) setTimeout(() => stage.react?.(a, st.win ? 'win' : !ok ? 'sad' : st.n === 5 || st.n === 10 ? 'cheer' : 'yes'), 250);
    } else if (k === 'timeup') {
      quizSfx.timeUp(st.n);
      mc.timeUp(q, st.passed, hotKeep(st.passed));
      if (a) setTimeout(() => stage.react?.(a, 'sad'), 250);
    } else if (k === 'skip') mc.skip(q.a);
    else if (k === 'quit') {
      const keep = hotKeep(st.passed, true);
      mc.quit(st.passed, keep, prev && ASKING.has(prev.k) ? q.a : null);
      if (keep) setTimeout(() => { if (still()) studio.applaud(3.5, 0.2); }, 2500);
    } else if (k === 'fifty') mc.fifty();
    else if (k === 'fiftyScan') studio.scan(st.cut, () => {});
    else if (k === 'audience') mc.audience();
    else if (k === 'voteResult') { if (st.poll?.some?.(Boolean)) mc.audienceResult(st.poll); }
    else if (k === 'friend') mc.relative();
    else if (k === 'phone') mc.phoneStart();
    else if (k === 'friendAsk') mc.relativeSeat(st.fr.name);
    else if (k === 'friendSaid') { if (st.fr.pick >= 0) mc.relativeAnswer(st.fr.name, st.fr.pick); }
    else if (k === 'end') endTurn(st, true);
  }
  // hết lượt: thẻ kết quả cho cả phòng, hạt cho người chơi (một lần mỗi lượt), người chơi về chỗ
  const paid = new Set();
  function endTurn(st, live) {
    const r = st.result || {};
    studio.ladder?.('hide');
    studio.board(null);
    studio.clock?.(null);
    if (live) studio.result?.({ passed: r.passed || 0, keep: r.keep || 0, stop: !!r.stop, win: !!r.win, name: r.name || '', me: isMe() });
    if (isMe() && r.id && !paid.has(r.id) && !testRoom()) {   // phòng thử nội bộ: không cộng hạt, không séc
      paid.add(r.id);
      try { hotSeat(r.id, r.passed || 0, { stop: !!r.stop, nick: r.name || '' }); } catch (e) { console.warn('[quiz] cộng hạt', e); }
    }
    const a = actorOfHot(st);
    if (a && (a.seat?.role || a.inShow)) { if (live) stage.home(a); }
  }

  function render(st) {
    const prev = cur;
    cur = st;
    curAt = performance.now();
    if (!st) { clearShow(); return; }
    const fresh = !prev || prev.s !== st.s;
    const live = fresh && st.age < FRESH && !document.hidden;
    if (!prev || prev.gid !== st.gid) {
      // lượt mới: bỏ bảng, thống kê của lượt trước
      qKey = ''; myPick = -1; asked = ''; stat.hidden = true;
      lastPos.clear();
    }
    const key = `${st.gid}|${st.n}`;
    if (key !== qKey) { qKey = key; myPick = -1; stat.hidden = true; }
    const bd = boardOf(st);
    bar.classList.toggle('is-compact', !!bd);
    studio.board(bd);
    // dải câu hỏi: phương án hiện dần khi MC đọc (bước ask tới đúng lúc); còn không thì hiện hết
    if (bd && !(st.k === 'ask' && live)) for (let i = 0; i < 4; i++) studio.showOption(i);
    // người chơi chọn / dùng trợ giúp trên dải câu hỏi
    if (isMe()) {
      const can = st.k === 'answer';
      studio.answer(can ? (i) => { if (cur?.k === 'answer') { studio.answer(null); net.pick(i); } } : null);
      studio.help(can ? (h) => { if (cur?.k === 'answer') { studio.help(null); net.help(h); } } : null);
    } else studio.help(null);
    paintClock();
    if (fresh) nudges(st);
    if (fresh && live) perform(prev, st);
    else if (fresh && st.k === 'end' && prev?.k !== 'end') endTurn(st, false);
    if (fresh) pace(st, live);
    // người chơi tới đúng lúc bước mời mà máy này không diễn (tab ẩn): báo luôn để chương trình khỏi chờ
    if (fresh && st.k === 'invite' && !live && isMe()) net.go(st.s);
    paintAsk();
    paintPanel();
    paintBar();
    placeWaiters();
  }
  function clearShow() {
    optT.forEach(clearTimeout); optT = [];
    nudgeT.forEach(clearTimeout); nudgeT = [];
    clearInterval(clockT);
    paceStop?.(); paceStop = null;
    asked = '';
    askShow('');
    studio.answer(null);
    studio.help?.(null);
    stat.hidden = true;
    studio.board(null);
    studio.clock?.(null);
    studio.ladder?.('hide');
    bar.classList.remove('is-compact');
    paintPanel();
  }
  /** f chạy một lần: khi được gọi (MC đọc xong lời dẫn) hoặc sau max giây (lời bị cắt / tải chậm), cái nào tới trước. */
  function cue(f, max) {
    let did = false;
    const go = () => { if (did) return; did = true; clearTimeout(tm); f(); };
    const tm = setTimeout(go, max * 1000);
    return go;
  }

  // ---- ghế chờ và đối chiếu chỗ ngồi
  function placeWaiters() {
    const want2 = queue.slice(0, 2);
    for (const [id] of [...waits]) {
      if (id === hot) { waits.delete(id); continue; }
      if (want2.includes(id)) continue;
      waits.delete(id);
      const a = ctx.actorOf(id);
      if (a?.seat?.role === 'wait' || (a?.inShow && !stage.onHot(a))) stage.home(a);
    }
    for (const id of want2) {
      if (waits.has(id) || id === hot) continue;
      const used = new Set(waits.values());
      const i = [0, 1].find(k => !used.has(k) && !stage.waitTaken(k));
      const a = ctx.actorOf(id);
      if (i == null || !a || !a.seat || a.seat.role) continue;
      waits.set(id, i);
      stage.wait(a, i);
    }
  }
  // Mỗi người có một chỗ phải ở theo trạng thái máy chủ: người chơi ở ghế nóng (trừ lúc đang được mời đi lên và lúc hết lượt),
  // hai người đầu hàng ở ghế chờ, còn lại ghế khán giả. Ai chưa ở đó mà đứng yên giữa đường STUCK ms, hay lệnh cuối đã quá
  // SETTLE ms, thì đặt thẳng vào chỗ (stage.snap).
  const STUCK = 6000, SETTLE = 20000;
  const lastPos = new Map();
  function want(id) {
    if (cur && id === cur.hot) return cur.k === 'end' ? 'home' : cur.k === 'invite' ? (cur.age + (performance.now() - curAt) > 30000 ? 'hot' : null) : 'hot';
    return waits.has(id) ? `wait${waits.get(id)}` : 'home';
  }
  function stuck(id, a) {
    if (!stage.walking(a)) { lastPos.delete(id); return false; }
    const p = lastPos.get(id), now = Date.now();
    if (!p || Math.hypot(a.pos.x - p.x, a.pos.z - p.z) > 0.05) { lastPos.set(id, { x: a.pos.x, z: a.pos.z, at: now }); return false; }
    return now - p.at > STUCK;
  }
  function reconcile(all = false) {
    if (!net.ready) return;
    const me = myId();
    for (const id of new Set([me, hot, cur?.hot, ...waits.keys(), ...(ctx.ids?.() || [])])) {
      if (!id) continue;
      const a = ctx.actorOf(id), w = a && want(id);
      if (!w) continue;
      const there = w === 'hot' ? stage.onHot(a) : w !== 'home' ? a.seat?.id === `wait_${+w.slice(4) + 1}` : !stage.inShow(a);
      if (there || stage.busy(a)) { lastPos.delete(id); continue; }
      if (all || stuck(id, a) || stage.idle(a, SETTLE)) { lastPos.delete(id); stage.snap(a, w); }
    }
  }
  // tab vừa hiện lại: trong lúc ẩn trình duyệt dừng khung hình (người đi đứng nguyên chỗ) và dồn lời MC; đặt mọi người vào chỗ
  let hiddenAt = 0;
  const onVis = () => {
    if (document.hidden) { hiddenAt = Date.now(); return; }
    if (!hiddenAt || Date.now() - hiddenAt < 1500) return;
    hiddenAt = 0;
    mc.stop();
    placeWaiters();
    reconcile(true);
  };
  document.addEventListener('visibilitychange', onVis);
  const waitT = setInterval(() => { if (queue.length) placeWaiters(); reconcile(); }, 2000);

  let gone = false;
  return {
    /** Máy chủ báo ghế nóng / hàng chờ (đầu tiên ngay khi vào phòng). */
    roster(h, q, first, age, nPeople = 0, nNeed = 0, startIn = 0) {
      hot = h;
      queue = q;
      people = nPeople; need = nNeed; startAt = startIn ? Date.now() + startIn : 0;
      paintWait();
      placeWaiters();
      paintBar();
    },
    /** Trạng thái chương trình (máy chủ, realtime/show.js pub()); null = hết lượt. */
    state(st) { if (!gone) render(st); },
    friendAsk(name) {
      if (isMe()) return;
      asked = name || t('Người chơi');
      paintAsk();
    },
    friendCancel() { asked = ''; paintAsk(); },
    /** Lật đáp án: thống kê khán phòng, ghế người đúng sáng, % đúng cạnh tên (mọi máy). */
    answers(counts, a, list) { if (Array.isArray(counts) && Array.isArray(list)) answers(counts, a, list); },
    /** Mất / có kết nối. */
    status(on) {
      if (!on) {
        wait.hidden = true;
        if (isMe()) lost(t('Lượt chơi đã dừng vì mất kết nối. Bấm Đăng ký chơi để chơi lại.'));
        cur = null;
        hot = 0; queue = [];
        mc.stop();
        clearShow();
      }
      paintBar();
    },
    /** Người id vừa rời phòng: bỏ khỏi ghế chờ. */
    left(id) { waits.delete(id); },
    get playing() { return isMe() || waits.has(myId()); },
    get queued() { return inQueue(); },
    dispose() {
      gone = true;
      clearInterval(waitT);
      document.removeEventListener('visibilitychange', onVis);
      clearInterval(askT);
      clearTimeout(lostT);
      clearShow();
      clearInterval(waitTick);
      wait.remove();
      bar.remove();
      askBox.remove();
      stat.remove();
      panel.remove();
      skipBtn.remove();
    },
  };
}
