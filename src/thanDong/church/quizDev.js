/**
 * Thử một ván Đố vui trên màn hình trường quay (CHỈ bản dev, chưa có MC bot và chưa nối máy chủ phòng: người thử bấm thay người chơi).
 * Bắt đầu → MC chào (tên người chơi lấy từ tài khoản đang đăng nhập) → rút 15 câu thật (src/quiz pickGame) → câu hỏi, rồi từng
 * phương án bật ra theo giọng MC (studio.board / showOption) → bấm A / B / C / D: ô chốt sáng cam, chờ LOCK giây cho hồi hộp
 * → lật đáp án: đúng thì pháo giấy, đèn xanh (câu 15: vàng chiến thắng), sai thì đèn đỏ rồi cả phòng chìm xuống buồn.
 * Bốn quyền trợ giúp, mỗi quyền một lần mỗi ván (nút trên dải câu hỏi hoặc ở bảng này):
 *   50:50 bỏ hai phương án sai; bỏ qua câu hỏi (lật đáp án đúng cho biết, rồi sang câu sau; không dùng ở câu 15); hỏi khán giả (ở đây GIẢ LẬP phiếu: khán giả thật sẽ gửi phiếu qua máy
 *   chủ phòng, xem docs/Quiz.md); hỏi người thân: gọi điện (đếm lùi PHONE giây, người chơi tự gọi) hoặc người thân ngồi dưới khán
 *   phòng (ở đây giả lập câu trả lời của người ấy). Ô "Câu" nhảy thẳng tới câu bất kỳ (không chào, giữ quyền trợ giúp đã dùng).
 * Nhiều người chơi (ô "Người chơi", "Có tôi": mình chơi trước): MC chào khán giả, mời người thứ nhất, người ấy đứng dậy khỏi ghế
 * khán giả đi lên ghế nóng (world.js studioShow); cùng lúc người kế tiếp đi tới ghế chờ cạnh sân khấu. Ngồi xuống rồi MC mới chào,
 * đọc luật (chỉ người đầu) và hỏi câu 1. Hết lượt (sai / thắng): "Người chơi tiếp theo" đưa người vừa chơi về ghế của họ, người ở
 * ghế chờ lên ghế nóng, người sau nữa vào ghế chờ. Người giả lấy tên trong NAMES.
 * Lời MC theo trạng thái: việc MC dẫn xảy ra SAU lời dẫn (mời xong mới đứng dậy, xin vỗ tay xong mới vỗ, nói "bỏ hai phương án"
 * xong mới bỏ, "thời gian bắt đầu" xong mới đếm); câu dẫn một việc đã xảy ra rồi thì MC bỏ (mcVoice `when`). `cue` giữ hẹn giờ
 * dự phòng phòng khi lời bị cắt hay tải chậm.
 * Đồng hồ trả lời (LIMIT giây theo độ khó) chạy từ lúc đủ bốn phương án, dừng khi đang dùng trợ giúp; im lặng NUDGE giây thì MC
 * nhắc (lần đầu nhắc cả quyền trợ giúp còn lại), còn 10 giây MC báo, hết giờ thì lật đáp án đúng như trả lời sai.
 */
import { pickGame } from '../quiz/index.js';
import { t } from '../engine/lang.js';
import { whenQuiet, isSpeaking } from '../engine/voice.js';
import { getCurrentUser } from '../engine/auth.js';
import { mc as MC } from './mcVoice.js';
import { quizSfx as SFX } from './quizSfx.js';
import { icon } from './icons.js';
import { hotKeep, hotSeat } from '../engine/seeds.js';

const LOCK = 2.5;      // giây hồi hộp sau khi chốt
const Q_IN = 2;       // giây: hiệu ứng "Câu n" và khung câu hỏi (church.css qov-num) xong mới tới phương án
// phương án bật ra lúc MC đọc tới chữ cái của nó; MC im (tắt tiếng) thì bật theo giờ: sau câu hỏi, mỗi ô cách OPT_GAP giây.
// Có giọng mà chậm (đang tải) thì hẹn giờ dự phòng rộng tay hơn, ô nào MC đọc tới trước thì bật trước.
const OPT_GAP = 0.7;
const PHONE = 30;      // giây gọi điện cho người thân
const VOTE = 8;        // giây khán giả bình chọn (bản dev giả lập; trực tuyến khán giả thật bấm)
const FRIEND_WAIT = 25; // giây chờ người thân trong phòng trả lời
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const NAMES = ['Minh Anh', 'Gia Bảo', 'Ngọc Hân', 'Phúc An', 'Khánh Linh', 'Đức Minh', 'Thiên Ân', 'Bảo Ngọc'];
const WAITS = 2;       // số ghế chờ (studio.js WAIT)
// giây để trả lời mỗi câu: câu dễ ngắn, câu khó dài hơn (thiếu nhi đọc chậm: rộng tay); trợ giúp đang chạy thì đồng hồ dừng
const LIMIT = (k) => (k <= 5 ? 30 : k <= 10 ? 45 : 60);
const NUDGE = 10;      // giây im lặng (MC cũng im) thì MC nhắc
/** f chạy một lần: khi được gọi (MC đọc xong lời dẫn) hoặc sau max giây (lời bị cắt / tải chậm), cái nào tới trước. */
function cue(f, max) {
  let did = false;
  const go = () => { if (did) return; did = true; clearTimeout(t); f(); };
  const t = setTimeout(go, max * 1000);
  return go;
}
const HELP_LABEL = { fifty: '50:50', audience: t('Khán giả'), skip: t('Bỏ qua'), friend: t('Người thân') };

/** Phiếu giả lập của khán giả: câu càng khó, càng ít người chọn đúng; phương án đã bị loại 0%. Tổng 100. */
function fakePoll(q, n, hide) {
  const live = [0, 1, 2, 3].filter(i => !hide.includes(i));
  const p = Math.max(0.3, 0.88 - (n - 1) * 0.04) + (Math.random() - 0.5) * 0.15;
  const w = [0, 1, 2, 3].map(i => (!live.includes(i) ? 0 : i === q.a ? p * 100 : (0.5 + Math.random()) * (1 - p) * 100 / Math.max(1, live.length - 1)));
  const sum = w.reduce((a, b) => a + b, 0) || 1;
  const pct = w.map(v => Math.round(v / sum * 100));
  pct[q.a] += 100 - pct.reduce((a, b) => a + b, 0);
  return pct;
}

/** Phiếu khán giả thật (máy chủ phòng gom, counts = số phiếu bốn phương án, ít nhất một phiếu) ra phần trăm, tổng 100. */
function realPoll(counts, hide) {
  const total = counts.reduce((a, b) => a + b, 0);
  const pct = [0, 1, 2, 3].map(i => (hide.includes(i) ? 0 : Math.round(counts[i] / total * 100)));
  const top = pct.indexOf(Math.max(...pct));
  pct[top] += 100 - pct.reduce((a, b) => a + b, 0);
  return pct;
}

/**
 * online (đố vui nhiều người, quizOnline.js): máy này là người đang ngồi ghế nóng và dẫn chương trình cho cả phòng; studio /
 * stage / mc / sfx được bọc để mỗi bước cũng gửi đi. online = { me(): nhân vật của mình, name, first (lượt đầu của buổi),
 * people(): người khác trong phòng [{ id, name, seat }], vote(giây, cb(counts)), ask(id, cb(i)) (i = -1: người ấy đã rời),
 * unask(), end() }. Bảng chỉ còn lời nhắc, chọn người thân và nút sang câu / dừng chơi; câu sau, hết lượt tự đi khi MC nói xong.
 */
export function makeQuizDev({ root, studio, show: stage, onResult, mc = MC, sfx: quizSfx = SFX, online = null, nick = () => '', solo = false }) {
  const el = document.createElement('div');
  // solo (Ai tài năng nhất, chưa có máy chủ phòng): một người chơi là mình, ẩn ô số người chơi và ô nhảy câu của bản thử
  el.className = `ch-quizdev${online ? ' is-online' : ''}${solo ? ' is-solo' : ''}`;
  el.innerHTML = `<div class="ch-qd-head"><b>${t(solo ? 'Chơi một mình' : 'Thử Đố vui')}</b><span class="ch-qd-n"></span>
      <label class="ch-qd-jump" title="${t('Nhảy tới câu')}"><select aria-label="${t('Nhảy tới câu')}">${Array.from({ length: 15 }, (_, i) => `<option value="${i + 1}">${t('Câu')} ${i + 1}</option>`).join('')}</select></label></div>
    <div class="ch-qd-opts">${'ABCD'.split('').map((L, i) => `<button type="button" data-i="${i}" disabled>${L}</button>`).join('')}</div>
    <div class="ch-qd-helps">${Object.entries(HELP_LABEL).map(([k, s]) => `<button type="button" data-h="${k}" disabled>${s}</button>`).join('')}</div>
    <div class="ch-qd-friend" hidden><input type="text" maxlength="24" value="${t('Mẹ')}" aria-label="${t('Tên người thân')}">
      <button type="button" data-f="phone">${t('Gọi điện')}</button><button type="button" data-f="seat">${t('Dưới khán phòng')}</button><div class="ch-qd-people"></div></div>
    <div class="ch-qd-setup"><label>${t('Người chơi')} <select class="ch-qd-np">${[1, 2, 3, 4, 5].map(k => `<option${k === (solo ? 1 : 3) ? ' selected' : ''}>${k}</option>`).join('')}</select></label>
      <label><input type="checkbox" class="ch-qd-me" checked> ${t('Có tôi')}</label></div>
    <p class="ch-qd-msg" aria-live="polite"></p>
    <div class="ch-qd-foot"><button type="button" data-go="next"></button><button type="button" data-go="off" title="${t(online ? 'Thôi chơi, xuống sân khấu' : 'Tắt bảng câu hỏi')}" aria-label="${t(online ? 'Dừng chơi' : 'Tắt')}">${icon('stop')}<span>${t(online ? 'Dừng chơi' : 'Tắt')}</span></button></div>`;
  // trực tuyến: các nút thành cột icon bên trái, dưới nút thoát (.ch-lcol của world.js), chừa chỗ cho câu hỏi
  ((online && root.querySelector('.ch-lcol')) || root).appendChild(el);
  const nEl = el.querySelector('.ch-qd-n'), msg = el.querySelector('.ch-qd-msg'), jump = el.querySelector('select');
  const opts = [...el.querySelectorAll('[data-i]')], next = el.querySelector('[data-go="next"]');
  // nút chính: icon theo việc nó làm (trực tuyến chỉ hiện icon, chữ thành nhãn / gợi ý)
  const NEXT_ICON = { 'Bắt đầu': 'play', 'Câu tiếp theo': 'next', 'Xuống sân khấu': 'exit' };
  const setNext = (label) => {
    next.innerHTML = `${icon(NEXT_ICON[label] || 'right')}<span>${t(label)}</span>`;
    next.title = t(label);
    next.setAttribute('aria-label', t(label));
  };
  setNext('Bắt đầu');
  const helpBtns = [...el.querySelectorAll('[data-h]')], friendBox = el.querySelector('.ch-qd-friend');
  let game = null, n = 0, state = 'idle', timer = 0, optTimers = [], helpTimers = [], quiet = null;
  // người chơi của buổi này theo thứ tự ({ a: nhân vật 3D, name }), lượt đang chơi
  let players = [], turn = 0;
  // đã huỷ (hết lượt, mất kết nối): các hẹn giờ / lời hẹn còn sót (cue, whenQuiet, pickGame đang chờ) không được làm gì nữa,
  // kẻo bảng cũ vẫn hỏi câu, gửi bảng câu hỏi cho cả phòng sau khi đã nối lại
  let dead = false;
  const setup = el.querySelector('.ch-qd-setup');
  // trạng thái của câu đang hỏi (vẽ lên dải câu hỏi): phương án bị loại, quyền trợ giúp đã dùng, bình chọn, người thân
  let hide = [], used = [], poll = null, friend = null, busy = false, active = '';   // active: quyền trợ giúp đang chạy (nút sáng lên)
  // hạt giống của lượt (docs/HatGiong.md mục 4): passed câu đã vượt, quit tự dừng, gameId mã lượt, paid đã cộng hạt chưa
  let passed = 0, quit = false, gameId = '', paid = false, played = false;
  const seeds = () => ({ passed, keep: hotKeep(passed, quit) });
  const later = (s, f) => { clearTimeout(timer); timer = setTimeout(f, s * 1000); };
  const clearOpts = () => { optTimers.forEach(clearTimeout); optTimers = []; };
  const clearHelps = () => { helpTimers.forEach(clearTimeout); helpTimers = []; quiet?.(); quiet = null; busy = false; friendBox.hidden = true; };
  const put = (extra = {}) => studio.board({ ...game[n - 1], n, phase: 'ask', hide, helps: { used, on: busy ? active : '' }, poll, friend, seeds: seeds(), who: players[turn]?.name || '', ...extra });
  // bấm được cả ở bàn bấm này lẫn trên dải câu hỏi (studio.answer / studio.help); lúc đang dùng trợ giúp thì khoá
  const enable = (on) => {
    opts.forEach((b, i) => { b.disabled = !on || hide.includes(i); b.classList.remove('is-pick'); });
    helpBtns.forEach(b => { b.disabled = !on || used.includes(b.dataset.h) || (b.dataset.h === 'skip' && n === 15); b.classList.toggle('is-active', busy && b.dataset.h === active); });
    studio.answer(on ? pick : null);
    studio.help(on ? useHelp : null);
  };
  const say = (s) => { msg.textContent = s; };
  // nút "Bỏ qua luật chơi" giữa màn hình, trên dải câu hỏi (chỉ lúc MC đang giới thiệu luật cho người chơi chính)
  const skipBtn = document.createElement('button');
  skipBtn.type = 'button';
  skipBtn.className = 'ch-skiprules';
  skipBtn.hidden = true;
  skipBtn.innerHTML = `<span>${t('Bỏ qua luật chơi')}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l9 7-9 7ZM17 5v14"/></svg>`;
  root.appendChild(skipBtn);
  const skipRules = (f) => { skipBtn.hidden = !f; skipBtn.onclick = f ? () => { skipBtn.hidden = true; f(); } : null; };
  // người chơi trên ghế nóng mừng / buồn theo kết quả (world.js studioShow.react)
  const react = (kind) => { const a = players[turn]?.a; if (a) setTimeout(() => stage?.react?.(a, kind), 250); };

  function show(k) {
    if (dead) return;
    n = k;
    passed = Math.max(passed, k - 1);   // nhảy câu (bản thử): coi như đã vượt các câu trước
    const q = game[n - 1];
    state = 'ask';
    hide = []; poll = null; friend = null;
    clearHelps();
    nEl.textContent = `${n}/15`;
    jump.value = n;
    put();
    enable(false);
    next.hidden = true;
    say(t('MC đọc câu hỏi…'));
    clearOpts();
    clockStop(true);
    const left = new Set([0, 1, 2, 3]), my = n;
    const open = (i) => {
      if (state !== 'ask' || n !== my || !left.delete(i)) return;
      studio.showOption(i);
      if (!left.size) {
        clearOpts();
        later(0.6, () => {
          enable(true);
          say(t('Chọn một đáp án hoặc dùng quyền trợ giúp.'));
          // đồng hồ chạy khi MC đã đọc xong phương án cuối và lời mời chọn (chọn sớm hơn vẫn được)
          clockW?.();
          clockW = whenQuiet(() => { clockW = null; if (state === 'ask' && n === my && !busy && !clk) clockStart(); }, { min: 300, max: 25000 });
        });
      }
    };
    // giọng MC tới trước khung câu hỏi mở xong thì chờ hiệu ứng ấy
    const t0 = performance.now();
    mc.ask(q, n, (i) => { const wait = Q_IN * 1000 - (performance.now() - t0); wait > 0 ? optTimers.push(setTimeout(() => open(i), wait)) : open(i); },
      () => state === 'ask' && n === my);
    const live = mc.live, base = live ? Q_IN + 2 + q.q.length * 0.075 : Q_IN, gap = live ? 3.5 : OPT_GAP;
    for (let i = 0; i < 4; i++) optTimers.push(setTimeout(() => open(i), (base + i * gap) * 1000));
  }
  // ---- đồng hồ trả lời và lời nhắc
  let clk = null, clkT = 0, clockW = null;
  function clockStop(hideIt = false) {
    clearInterval(clkT);
    clkT = 0;
    clockW?.();
    clockW = null;
    if (hideIt) { clk = null; studio.clock?.(null); }
  }
  function clockStart() {
    clockStop();
    const total = LIMIT(n), my = n;
    clk = { left: total * 1000, total, idle: 0, nudges: 0, warned: false, last: performance.now() };
    const waiting = () => state === 'ask' && n === my && !busy;
    const paint = (paused) => studio.clock?.({ left: Math.max(0, clk.left) / 1000, total, paused });
    paint(false);
    clkT = setInterval(() => {
      const now = performance.now(), dt = now - clk.last;
      clk.last = now;
      if (state !== 'ask' || n !== my) { clockStop(); return; }
      if (busy) { clk.idle = 0; paint(true); return; }   // đang dùng trợ giúp: dừng giờ
      clk.left -= dt;
      if (!isSpeaking()) clk.idle += dt;                 // chỉ tính im lặng khi MC cũng im
      paint(false);
      if (clk.left <= 0) { timeUp(); return; }
      if (!clk.warned && clk.left <= 10000) { clk.warned = true; clk.idle = 0; mc.tenLeft(waiting); }
      else if (clk.idle >= NUDGE * 1000 && clk.left > 16000) { clk.idle = 0; mc.nudge(4 - used.length, !clk.nudges++, waiting); }
    }, 200);
  }
  // hết giờ mà chưa chọn: lật đáp án đúng, tính như trả lời sai (hết lượt)
  function timeUp() {
    if (dead) return;
    clockStop();
    const q = game[n - 1];
    state = 'over';
    clearOpts();
    clearHelps();
    enable(false);
    studio.clock?.({ left: 0, total: clk?.total || 0 });
    quizSfx.timeUp(n);
    put({ phase: 'reveal', pick: null, timeout: true });
    mc.timeUp(q, passed, hotKeep(passed));
    react('sad');
    say(`${t('Hết giờ! Đáp án đúng là')} ${'ABCD'[q.a]}.`);
    setNext(online ? 'Xuống sân khấu' : players[turn + 1] ? 'Người chơi tiếp theo' : players.length ? 'Kết thúc' : 'Chơi ván mới');
    next.hidden = false;
    autoNext();
  }
  // trực tuyến: MC nói xong (lời giải thích, chào) thì tự sang câu sau / xuống sân khấu; nút "next" để khỏi chờ
  function autoNext() {
    if (!online) return;
    const my = n, st = state;
    quiet = whenQuiet(() => { quiet = null; timer = setTimeout(() => { if (n === my && state === st) goNext(); }, 1200); }, { min: 6000, max: 30000 });   // ít nhất 6 s: khán phòng kịp xem thống kê
  }
  // rút 15 câu và hỏi từ câu k (người chơi đã ngồi ghế nóng)
  async function play(k = 1) {
    skipRules(null);
    say(t('Đang rút câu hỏi…'));
    clearTimeout(timer);
    clearHelps();
    used = [];
    passed = k - 1; quit = false; paid = false; played = true;
    gameId = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    try { game = await pickGame(); } catch (e) {
      // không tải được bộ câu hỏi (tab mở từ trước một lần cập nhật ứng dụng: tệp cũ không còn, mạng rớt): đừng để MC chào xong
      // rồi cả phòng đứng chờ; bản trực tuyến trả lượt (không tính hạt) và báo người chơi tải lại trang
      console.warn('[quiz] không tải được bộ câu hỏi', e);
      if (dead) return;
      played = false;
      say(t('Không tải được câu hỏi. Bạn tải lại trang rồi chơi lại.'));
      if (online) { online.failed = true; endTurn(); }
      return;
    }
    if (dead) return;
    show(k);
  }
  const userName = () => nick() || getCurrentUser()?.name || '';   // biệt danh, rồi tên tài khoản; chưa đăng nhập: MC dùng các câu không gọi tên
  // bắt đầu buổi: chọn người chơi, MC chào khán giả, mời người thứ nhất
  function startShow() {
    if (online) {
      players = [{ a: online.me(), name: online.name || userName() }];
      setup.hidden = true;
      if (online.first) { quizSfx.intro(); mc.welcome(); }
      startTurn(0);
      return;
    }
    const list = stage?.contestants(+el.querySelector('.ch-qd-np').value, el.querySelector('.ch-qd-me').checked) || [];
    players = list.map((a, i) => ({ a, name: stage.isMe(a) ? userName() : NAMES[i % NAMES.length] }));
    if (!players.length) { quizSfx.welcome(); mc.player(userName()); play(1); return; }   // không có nhân vật (đang tải): hỏi luôn
    setup.hidden = true;
    quizSfx.intro();
    mc.welcome();
    startTurn(0);
  }
  // lượt của người thứ p: lên ghế nóng (từ ghế chờ hoặc ghế khán giả), hai người sau vào ghế chờ; ngồi xong MC chào rồi hỏi
  function startTurn(p) {
    if (dead) return;
    turn = p;
    const cur = players[p], first = online ? online.first : p === 0;
    state = 'walk';
    next.hidden = true;
    jump.disabled = true;
    nEl.textContent = '';
    mc.player(cur.name);
    say(`${t('Mời')} ${cur.name || t('bạn')} ${t('lên ghế nóng…')}`);
    let seated = false, quietDone = false;
    const here = () => !dead && state === 'walk' && turn === p && players[p] === cur;
    const go = () => {
      if (!seated || !quietDone || !here()) return;
      mc.greet(first);
      if (first) studio.ladder?.('intro');   // thang hạt sáng theo lời đọc luật (ladder.js)
      // MC đọc luật (người đầu): người chơi chính (người đang ngồi ghế nóng là mình) bấm được "Bỏ qua luật chơi" để vào câu 1 ngay
      if (first && (!stage.isMe || stage.isMe(cur.a))) skipRules(() => { if (!here()) return; quiet?.(); quiet = null; mc.stop(); jump.disabled = false; play(1); });
      quiet = whenQuiet(() => { quiet = null; if (here()) { jump.disabled = false; play(1); } }, { min: 800, max: 20000 });
    };
    // MC mời xong người chơi mới đứng dậy đi lên; xin vỗ tay xong khán giả mới vỗ
    const walk = cue(() => {
      if (!here()) return;
      if (!first) quizSfx.walkup();   // người đầu: nhạc hiệu mở màn còn đang chạy
      stage.hot(cur.a, () => { seated = true; quizSfx.hotSeat(); go(); });
    }, 16);
    const clap = cue(() => { if (here()) studio.applaud(4, 0.15); }, 18);
    mc.invite({ go: walk, clap, when: () => here() && !seated });
    // người kế tiếp vào ghế chờ (người đang ở ghế chờ thì giữ nguyên chỗ): MC mời xong mới đi tới
    const toWait = [];
    for (let k = p + 1; k < Math.min(players.length, p + 1 + WAITS); k++) if (!players[k].waiting) toWait.push(players[k]);
    if (toWait.length) {
      const goWait = cue(() => {
        if (dead) return;
        const list = toWait.filter(pl => players.includes(pl) && !pl.waiting);
        list.forEach(pl => { pl.waiting = true; stage.wait(pl.a, players.indexOf(pl) % WAITS); });
        if (list.length) quizSfx.waitSeat();
      }, 22);
      mc.nextReady({ go: goWait, when: () => toWait.some(pl => players.includes(pl) && !pl.waiting) });
    }
    // MC nói xong hết lời mời (và người chơi đã ngồi) mới chào người chơi
    quiet = whenQuiet(() => { quiet = null; quietDone = true; go(); }, { min: 1500, max: 30000 });
  }
  // hết lượt: người vừa chơi về ghế khán giả; còn người thì sang lượt sau, hết người thì xong buổi
  // cộng hạt của lượt cho người chơi trên máy này (một lần mỗi lượt): bản trực tuyến là chính người chơi, bản thử khi có mình
  function payOut() {
    const cur = players[turn];
    if (paid || !played || !cur || !stage?.isMe?.(cur.a)) return;
    paid = true;
    const keep = hotSeat(gameId, passed, { stop: quit, nick: cur.name });
    onResult?.({ passed, keep, stop: quit, id: gameId });
  }
  function endTurn() {
    payOut();
    // thẻ "mang về" cho cả phòng (máy người chơi: hạt bay về bộ đếm)
    const who = players[turn];
    if (played && who) studio.result?.({ passed, keep: hotKeep(passed, quit), stop: quit, win: passed >= 15, name: who.name, me: !!stage?.isMe?.(who.a) });
    played = false;
    studio.ladder?.('hide');
    clearTimeout(timer);
    clockStop(true);
    clearHelps();
    mc.stop();
    studio.board(null);
    enable(false);
    const cur = players[turn];
    if (cur) stage.home(cur.a);
    if (online) { players = []; state = 'idle'; online.end(); return; }
    if (players[turn + 1]) { startTurn(turn + 1); return; }
    players = [];
    state = 'idle';
    quizSfx.outro();
    setup.hidden = false;
    setNext('Bắt đầu');
    next.hidden = false;
    say(t('Hết buổi. Bấm Bắt đầu để mời người chơi mới.'));
  }
  function pick(i) {
    if (state !== 'ask' || busy || hide.includes(i)) return;
    state = 'lock';
    clearOpts();
    clockStop(true);
    clearHelps();
    const q = game[n - 1];
    enable(false);
    opts[i].classList.add('is-pick');
    put({ phase: 'lock', pick: i, lockSec: mc.live ? LOCK + 1.5 : LOCK });
    mc.pick(i);
    say(`${t('Chốt đáp án')} ${'ABCD'[i]}…`);
    // lật khi đã qua LOCK giây VÀ MC nói xong "cùng xem đáp án" (không cắt ngang lời hồi hộp)
    quiet = whenQuiet(() => {
      quiet = null;
      if (state !== 'lock') return;
      const ok = i === q.a, win = ok && n === 15;
      if (ok) passed = n;
      state = ok && !win ? 'right' : 'over';
      put({ phase: 'reveal', pick: i, win });
      mc.reveal(q, i, win, n, passed, ok ? null : hotKeep(passed));
      react(win ? 'win' : !ok ? 'sad' : n === 5 || n === 10 ? 'cheer' : 'yes');
      say(win ? t('Xuất sắc! Vượt qua cả 15 câu.') : ok ? t('Chính xác!') : `${t('Rất tiếc! Đáp án đúng là')} ${'ABCD'[q.a]}.`);
      setNext(ok && !win ? 'Câu tiếp theo' : online ? 'Xuống sân khấu' : players[turn + 1] ? 'Người chơi tiếp theo' : players.length ? 'Kết thúc' : 'Chơi ván mới');
      next.hidden = false;
      autoNext();
    }, { min: LOCK * 1000, max: 9000 });
  }

  // ---- trợ giúp
  const wrongs = () => [0, 1, 2, 3].filter(i => i !== game[n - 1].a && !hide.includes(i));
  const takeRandom = (list, k) => list.sort(() => Math.random() - 0.5).slice(0, k);
  const after = (s, f) => helpTimers.push(setTimeout(f, s * 1000));
  // xong một quyền: mở lại cho chọn, MC nhắc số quyền còn lại
  // (dùng trợ giúp trước khi đồng hồ kịp chạy: chạy từ đây)
  const done = () => { busy = false; active = ''; friendBox.hidden = true; if (state === 'ask') put(); if (clk) clk.idle = 0; else if (state === 'ask') clockStart(); enable(true); mc.helpsLeft(4 - used.length); say(t('Chọn một đáp án.')); };
  function useHelp(k) {
    if (state !== 'ask' || busy || used.includes(k) || (k === 'skip' && n === 15)) return;
    used = [...used, k];
    busy = true;
    active = k;
    enable(false);
    if (k === 'fifty' || k === 'audience') put();   // nút quyền vừa chọn sáng lên ngay (skip / người thân tự vẽ lại bảng)
    const q = game[n - 1], my = n;
    const still = () => state === 'ask' && n === my && busy;   // quyền này vẫn đang chạy (chưa chọn, chưa tắt)
    if (k === 'fifty') {
      // còn lại đúng hai phương án (đã loại một phương án trước đó thì chỉ bỏ thêm một); MC nói "bỏ hai phương án sai" xong mới bỏ
      // MC nói xong câu dẫn: một vệt quét chạy qua bốn ô (studio.scan), dừng ở hai ô sai (đỏ), hai ô ấy tắt, rồi MC đọc hai ô còn lại
      const cut = takeRandom(wrongs(), Math.max(0, 2 - hide.length));
      mc.fifty(cue(() => {
        if (!still()) return;
        studio.scan(cut, () => {
          if (!still()) return;
          hide = [...hide, ...cut];
          put();
          mc.fiftyLeft([0, 1, 2, 3].filter(i => !hide.includes(i)));
          after(1.5, done);
        });
      }, 9));
      say(t('50:50: bỏ hai phương án sai.'));
    } else if (k === 'skip') {
      // lật đáp án đúng (không tính đúng / sai), MC nói đáp án, rồi sang câu sau
      state = 'skip';
      put({ phase: 'reveal', pick: null, skipped: true });
      mc.skip(q.a);
      say(`${t('Bỏ qua câu này. Đáp án đúng là')} ${'ABCD'[q.a]}.`);
      passed = n;   // câu bỏ qua tính là đã vượt
      quiet = whenQuiet(() => { quiet = null; busy = false; if (state === 'skip') show(n + 1); }, { min: 3500, max: 15000 });
    } else if (k === 'audience') {
      // MC mời bình chọn xong mới mở bình chọn
      say(t('Khán giả đang bình chọn…'));
      mc.audience(cue(() => {
        if (!still()) return;
        poll = 'open';
        put();
        // trực tuyến: khán giả thật bình chọn VOTE giây (máy chủ gom phiếu), trộn với khán phòng ảo khi ít người bầu
        const result = (pct) => {
          if (!still()) return;
          poll = pct;
          put();
          mc.audienceResult(poll);
          say(t('Đã có kết quả bình chọn.'));
          after(2, done);
        };
        // trực tuyến: chỉ phiếu thật (khán phòng không còn người giả); không ai bầu thì cột 0%, MC không đọc kết quả
        if (online) online.vote(VOTE, (counts) => {
          if (counts.some(Boolean)) { result(realPoll(counts, hide)); return; }
          if (!still()) return;
          poll = [0, 0, 0, 0];
          put();
          say(t('Chưa có khán giả nào bình chọn.'));
          after(1.5, done);
        });
        else after(VOTE, () => result(fakePoll(q, n, hide)));
      }, 10));
    } else if (k === 'friend') {
      mc.relative();
      if (online) paintPeople();
      friendBox.hidden = false;
      say(t('Chọn cách hỏi người thân.'));
      put();
    }
  }
  // trực tuyến: người thân là một người thật đang ở trong phòng (máy người ấy hiện bốn phương án, quizOnline.js)
  function paintPeople() {
    const box = friendBox.querySelector('.ch-qd-people'), list = online.people();
    friendBox.querySelector('[data-f="seat"]').hidden = true;
    box.innerHTML = list.length
      ? `<p>${t('Hoặc hỏi một người trong khán phòng:')}</p>${list.slice(0, 16).map(p => `<button type="button" data-p="${p.id}">${esc(p.name || t('Khán giả'))}${p.seat ? ` <small>${esc(p.seat)}</small>` : ''}</button>`).join('')}`
      : `<p>${t('Chưa có ai khác trong khán phòng để hỏi.')}</p>`;
    box.querySelectorAll('[data-p]').forEach(b => { b.onclick = () => askFriend('seat', list.find(p => p.id === +b.dataset.p)); });
  }
  function askFriend(mode, person = null) {
    const q = game[n - 1], name = (person ? person.name : friendBox.querySelector('input').value.trim()) || t('Người thân'), my = n;
    const still = () => state === 'ask' && n === my && busy;
    friendBox.hidden = true;
    if (mode === 'phone') {
      // đếm lùi từ lúc MC hô "thời gian bắt đầu" xong
      friend = { mode, name, end: 0, pick: null };
      put();
      say(`${t('Đang gọi')} ${name}…`);
      mc.phoneStart(cue(() => {
        if (!still()) return;
        friend = { ...friend, end: Date.now() + PHONE * 1000 };
        put();
        after(PHONE, () => { mc.phoneEnd(); friend = { ...friend, end: 0 }; put(); after(1, done); });
      }, 10));
    } else if (online && person) {
      friend = { mode, name, seat: person.seat || '', pick: null };
      put();
      say(`${name} ${t('đang trả lời…')}`);
      let wait = 0;
      const answered = (i) => {
        clearTimeout(wait);
        if (!still() || friend?.pick != null) return;
        if (i < 0) { online.unask(); friend = null; put(); say(`${name} ${t('chưa trả lời.')}`); after(1.5, done); return; }
        friend = { ...friend, pick: i };
        put();
        mc.relativeAnswer(name, i);
        after(2.5, done);
      };
      mc.relativeSeat(name, cue(() => {
        if (!still()) return;
        online.ask(person.id, answered);
        wait = setTimeout(() => answered(-1), FRIEND_WAIT * 1000);
        helpTimers.push(wait);
      }, 10));
    } else {
      // người thân dưới khán phòng (giả lập: ngồi một ghế bất kỳ, trả lời sau ít giây, thường đúng)
      // TODO máy chủ phòng: người chơi chọn ghế của người thân trên sơ đồ ghế, gửi ['friend', seat]; máy người ấy hiện bốn phương án
      friend = { mode, name, seat: `${'ABCDEFGHIJ'[Math.floor(Math.random() * 10)]}${1 + Math.floor(Math.random() * 24)}`, pick: null };
      put();
      say(`${name} ${t('đang trả lời…')}`);
      // người thân trả lời sau khi MC mời xong (giả lập: vài giây)
      const answerSeat = () => {
        const right = Math.random() < Math.max(0.4, 0.9 - (n - 1) * 0.03);
        const pickI = right ? q.a : takeRandom(wrongs(), 1)[0] ?? q.a;
        friend = { ...friend, pick: pickI };
        put();
        mc.relativeAnswer(name, pickI);
        after(2.5, done);
      };
      mc.relativeSeat(name, cue(() => { if (still()) after(4, answerSeat); }, 10));
    }
  }

  opts.forEach((b, i) => { b.onclick = () => pick(i); });
  helpBtns.forEach(b => { b.onclick = () => useHelp(b.dataset.h); });
  friendBox.querySelectorAll('[data-f]').forEach(b => { b.onclick = () => askFriend(b.dataset.f); });
  function goNext() {
    if (dead) return;
    clearTimeout(timer);
    quiet?.(); quiet = null;
    if (state === 'right') show(n + 1);
    else if (players.length && state !== 'idle') endTurn();
    else if (!online) startShow();
  }
  next.onclick = goNext;
  jump.onchange = () => { if (game) show(+jump.value); else { mc.player(userName()); play(+jump.value); } };
  // người chơi tự dừng (trực tuyến): giữ hạt của câu vừa vượt; đang hỏi thì MC tạm biệt rồi cho xem đáp án đúng
  function stopPlay() {
    if (!game || !['ask', 'right', 'skip'].includes(state)) return false;
    const asking = state === 'ask';
    clearTimeout(timer);
    clockStop(true);
    clearOpts();
    clearHelps();
    enable(false);
    quit = true;
    state = 'over';
    const { keep } = seeds();
    if (asking) put({ phase: 'reveal', pick: null, quit: true });   // giữa hai câu: bảng của câu vừa đúng vẫn nằm đó
    mc.quit(passed, keep, asking ? game[n - 1].a : null);
    if (keep) setTimeout(() => studio.applaud(3.5, 0.2), 2500);
    say(`${t('Dừng chơi')}: ${keep} ${t('ngôi sao')}.`);
    setNext('Xuống sân khấu');
    next.hidden = false;
    autoNext();
    return true;
  }
  el.querySelector('[data-go="off"]').onclick = () => {
    if (online) { skipRules(null); if (state === 'lock') return; if (!stopPlay() && state !== 'idle') endTurn(); return; }
    skipRules(null);
    clearTimeout(timer);
    clockStop(true);
    clearOpts();
    clearHelps();
    mc.stop();
    studio.board(null);
    state = 'idle';
    enable(false);
    // mọi người chơi về ghế khán giả của mình
    for (const pl of players) { pl.waiting = false; stage?.home(pl.a); }
    players = [];
    setup.hidden = false;
    jump.disabled = false;
    setNext('Bắt đầu');
    next.hidden = false;
    nEl.textContent = '';
    say('');
  };
  // không để chạm / kéo / gõ phím trên bảng xoay camera hay đi lại phía dưới
  for (const ev of ['pointerdown', 'wheel', 'keydown']) el.addEventListener(ev, (e) => e.stopPropagation());
  return {
    /** Trực tuyến: bắt đầu lượt của mình (máy chủ vừa đưa mình lên ghế nóng). */
    start() { next.hidden = true; startShow(); },
    // luôn gỡ bảng, kể cả khi một bước dọn lỗi (trước đây lỗi giữa chừng để lại nút "Dừng chơi" chồng lên nhau mỗi lần nối lại)
    dispose() {
      if (dead) return;
      dead = true;
      state = 'dead';
      for (const f of [payOut, () => clearTimeout(timer), () => clockStop(true), clearOpts, clearHelps, () => skipRules(null), () => mc.stop()]) {
        try { f(); } catch (e) { console.warn('[quiz] dọn bảng', e); }
      }
      el.remove();
      skipBtn.remove();
    },
  };
}
