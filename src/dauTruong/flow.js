/**
 * Đấu Trường Nhí: các bước từ lúc bước vào trường quay tới khi chương trình bắt đầu, vẽ trên sân khấu 3D (src/games/dauTruong.js stage).
 *
 *   1. Nhân vật: chọn một trong 7 bạn học sinh (ảnh public/dautruong/pupils) và tên MC gọi (nick.js checkNick, dùng chung tên với
 *      Ai tài năng nhất: túi đồ thandong-bag-v1 `nick`; nhân vật ở `pupil`, đồng bộ Firestore qua cloudSync). Đã có cả hai thì bỏ qua.
 *   2. Chọn ghế: sơ đồ 5 hàng × 10 ghế như đặt vé (kiểu .ch-seatmap của trường quay), ghế có người hiện mặt bạn ấy; gợi ý sẵn ghế
 *      lần trước hoặc ghế đẹp còn trống. Ghế bị bạn khác lấy trước (máy chủ báo 'no') thì quay lại bước này.
 *   3. Chờ giờ: thẻ giữa trên đếm ngược tới giờ bắt đầu (giờ của máy chủ), số bạn trong phòng, công tắc "Em muốn lên bục" (bật sẵn),
 *      đổi nhân vật / đổi ghế; phòng thử tự bắt đầu khi đủ 4 bạn trên bục (không có nút Bắt đầu).
 *   4. Bắt đầu: tạm chạy bản mẫu vòng thi trên sân khấu (máy chủ cầm chương trình là bước sau: realtime/arena.js).
 *
 * Bạn ảo (npc.js, cùng tên cùng lớp với bảng xếp hạng): vào khán phòng dần từ lúc phòng mở; bục thi: mình (bật "Em muốn lên bục")
 * đứng bục 1 ngay, thiếu người thì MC lần lượt mời bạn ảo đang ngồi dưới khán phòng lên (ghế bạn ấy để trống), tới giờ mời nốt.
 * Thẻ chờ có dải 4 bục (giữ chỗ sẵn, không nhảy bố cục). Máy chủ phòng chưa có bạn ảo: mỗi máy tự tính, cùng hạt giống nên giống nhau.
 *
 * Kết nối (src/thanDong/church/net.js tới phòng `arena-g<lớp>`, giao thức ở realtime/room.js): đang nối / mất kết nối và đang nối lại
 * (giữ ghế: nối lại mang ghế theo) / nối không được (Thử lại, Về sảnh) / phòng ngoài giờ (máy chủ báo giờ lượt tới rồi đóng) /
 * phòng kín (net.js tự sang `~2`) / trang cũ (net.js báo tải lại). Không có máy chủ phòng: chơi thử một mình, các bạn máy ngồi sẵn.
 * Trả hàm dọn.
 */
import { makeNet, ONLINE } from '../thanDong/church/net.js';
import { checkNick, NICK_WHY, NICK_MAX } from '../thanDong/church/nick.js';
import { shortName } from '../thanDong/church/nameTag.js';
import { icon } from '../thanDong/church/icons.js';
import { loadBag, saveBag } from '../thanDong/engine/progress.js';
import { getCurrentUser } from '../engine/auth.js';
import { arenaSfx as SFX } from './arenaSfx.js';
import {
  ARENA_PROTO, AISLE_AFTER, COLS, LIVE_MS, OPEN_BEFORE, PUPILS, PUPIL_NAMES, ROWS, SEAT_IDS, TEST_LEAD,
  clockText, lookOfPupil, nextStart, pupilOfLook, stepAt, whenText,
} from './rules.js';
import { testRoom } from '../thanDong/engine/admin.js';
import { audienceAt, podiumAt } from './npc.js';

const SEAT_KEY = 'dt-seat';
const thumb = (k) => `/dautruong/pupils/${PUPILS[k]}.webp`;
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const CSS = `
.dt-stage.is-flow .dt-mode { display: none; }
.dt-stage.is-flow.is-test .dt-mode { display: flex; }
.dt-stage .dt-seatmap { --s: clamp(26px, min((min(100vw - 48px, 900px) - 110px) / 12.4, (100dvh - 270px) / 6.6), 60px); }
.dt-stage .dt-seatmap .ch-sm-grid { grid-template-columns: 18px repeat(${AISLE_AFTER}, var(--s)) calc(var(--s) * 0.8) repeat(${COLS - AISLE_AFTER}, var(--s)) 18px; }
/* ảnh mặt bạn đang ngồi: cỡ và vị trí đặt thẳng trên nút (kiểu nền của giao diện sáng mạnh hơn, xoá mất) */
.dt-stage .dt-seatmap .ch-sm-seat.is-taken { opacity: 0.9; background-color: #4a2430; }
.dt-stage .dt-seatmap .ch-sm-seat.is-mine { background-color: #7fd49a; }
@media (max-height: 520px) { .dt-stage .dt-seatmap { --s: clamp(22px, min((100vw - 362px) / 12.4, (100dvh - 96px) / 6.4), 54px); } }
.dt-stage .dt-me, .dt-stage .dt-seatmap { z-index: 8; }   /* trên nút toàn màn hình ở góc */
.dt-me .ch-sm-box { width: min(900px, 100%); }
.dt-me-grid { display: grid; grid-template-columns: repeat(${PUPILS.length}, minmax(0, 1fr)); gap: clamp(4px, 1vw, 10px); }
.dt-me-pick { display: grid; justify-items: center; gap: 2px; padding: 4px 2px 6px; border-radius: 14px; cursor: pointer; font: inherit;
  border: 2px solid var(--ch-line); background: rgba(255, 255, 255, 0.06); color: var(--ch-text); transition: transform 0.15s, border-color 0.15s; }
.dt-me-pick img { width: 100%; max-width: 120px; aspect-ratio: 1; object-fit: cover; border-radius: 10px; background: linear-gradient(180deg, #3d5bd9, #1b2b80); }
.dt-me-pick span { font-size: clamp(10px, 1vw, 13px); line-height: 1.2; text-align: center; color: var(--ch-muted); }
.dt-me-pick[aria-pressed="true"] { border-color: var(--ch-gold); background: var(--ch-gold-bg); transform: translateY(-3px); box-shadow: 0 0 14px rgba(226, 189, 107, 0.55); }
.dt-me-pick[aria-pressed="true"] span { color: var(--ch-gold); font-weight: 700; }
.dt-me-nick { display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 6px 10px; }
.dt-me-nick label { font-size: 14px; font-weight: 600; }
.dt-me-nick input { min-width: 0; font: inherit; font-size: 18px; font-weight: 700; padding: 8px 12px; border-radius: 10px; color: var(--ch-text);
  background: #fff; border: 2px solid var(--ch-line2); user-select: text; touch-action: auto; }
.dt-me-nick input:focus { outline: none; border-color: var(--ch-gold); }
.dt-me-msg { grid-column: 1 / -1; margin: 0; font-size: 13px; color: var(--ch-gold); }
.dt-me-msg.is-ok { color: #7fd49a; }
/* màn thấp: church.css chia sơ đồ ghế thành hai cột (grid-template-areas); bảng nhân vật giữ một cột từ trên xuống */
@media (max-height: 520px) {
  .dt-me .ch-sm-box { grid-template-columns: none; grid-template-areas: none; gap: 6px; padding: 8px 12px; }
  .dt-me .ch-sm-box > * { grid-area: auto; }
  .dt-me .ch-sm-sub { display: none; }
  .dt-me .ch-sm-foot { flex-direction: row; align-items: center; padding-top: 6px; }
  .dt-me .ch-sm-ok { width: auto; min-width: 140px; }
  .dt-me-pick img { max-width: 96px; }
  .dt-me-nick input { font-size: 16px; padding: 6px 10px; }
  .dt-wait { padding: 8px 14px; gap: 4px; }
  .dt-wait .ch-qw-hint { display: none; }
  .dt-wait .dt-big { font-size: 28px; }
}
/* màn dọc: 7 ảnh một hàng thì hẹp quá, xếp 4 cột */
@media (max-aspect-ratio: 1/1) { .dt-me-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } .dt-me-pick img { max-width: 110px; } }
/* thẻ chờ luôn ở giữa (church.css màn hẹp đẩy .ch-qwait sang phải 64 px chừa cột nút trái của Ai tài năng nhất; ở đây không có cột đó) */
.dt-stage .dt-wait { left: 12px; right: 12px; width: auto; max-width: 400px; margin: 0 auto; transform: none; }
.dt-wait .dt-sw { display: inline-flex; align-items: center; gap: 10px; min-height: 40px; padding: 0 14px; border-radius: 999px; cursor: pointer;
  font: inherit; font-size: 14px; font-weight: 700; color: var(--ch-text); border: 1px solid var(--ch-line2); background: #fff; }
.dt-wait .dt-sw i { position: relative; width: 38px; height: 22px; border-radius: 11px; background: #555d7a; transition: background 0.2s; }
.dt-wait .dt-sw i::after { content: ''; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: transform 0.2s; }
.dt-wait .dt-sw[aria-checked="true"] i { background: #21b26b; }
.dt-wait .dt-sw[aria-checked="true"] i::after { transform: translateX(16px); }
.dt-wait .dt-big { font-size: clamp(26px, 4vw, 40px); font-weight: 800; color: var(--ch-text); font-variant-numeric: tabular-nums; line-height: 1.1; }
.dt-wait .dt-pods { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; width: 100%; margin: 2px 0; }
.dt-wait .dt-pod { display: grid; justify-items: center; gap: 2px; min-width: 0; padding: 4px 2px; border-radius: 12px; border: 2px solid var(--c); background: #fff; }
.dt-wait .dt-pod img, .dt-wait .dt-pod i { width: clamp(30px, 4.4vw, 46px); aspect-ratio: 1; border-radius: 50%; object-fit: cover; background: linear-gradient(180deg, #3d5bd9, #1b2b80); }
.dt-wait .dt-pod i { display: grid; place-items: center; font-style: normal; font-weight: 800; color: #9aa3c7; background: #eef1fb; border: 2px dashed #b9c1e3; box-sizing: border-box; }
.dt-wait .dt-pod span { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; font-weight: 700; color: #2b2f4a; }
.dt-wait .dt-pod.is-empty span { color: #8a90ad; font-weight: 600; }
.dt-wait .dt-pod.is-me { box-shadow: 0 0 0 2px #ffd36b; }
.dt-wait .dt-pod.is-new { animation: dt-podin 0.6s ease-out; }
@keyframes dt-podin { from { transform: scale(0.6); opacity: 0.2; } to { transform: none; opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .dt-wait .dt-pod.is-new { animation-duration: 1.2s; } }
.dt-wait .dt-call { min-height: 1.35em; margin: 0; font-size: 13px; font-weight: 700; color: #b45309; }
@media (max-height: 520px) { .dt-wait .dt-pod img, .dt-wait .dt-pod i { width: 28px; } .dt-wait .dt-pod span { font-size: 11px; } }
.dt-conn { position: absolute; left: 50%; transform: translateX(-50%); top: calc(max(8px, env(safe-area-inset-top)) + 2px); z-index: 9;
  /* trên lớp nền tối của bảng nhân vật / sơ đồ ghế (z 8); nằm trên cùng để không che nút Vào ngồi, Xong ở đáy các bảng */
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap; justify-content: center; width: max-content; max-width: min(760px, calc(100% - 140px)); box-sizing: border-box;
  padding: 8px 12px 8px 16px; border-radius: 14px; font-size: 15px; font-weight: 700; line-height: 1.35; pointer-events: auto;
  /* thẻ sáng, chữ đậm màu (giao diện Tươi sáng đổi --ch-text sang màu tối: nền tối sẽ nuốt chữ) */
  color: #7a1c24; background: #fff4f4; border: 2px solid #f0a3a8; box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35); }
.dt-conn.is-ok { color: #1d6b40; background: #effbf3; border-color: #8fd8ab; }
.dt-conn.is-info { color: #3a2e48; background: #fffdf8; border-color: rgba(196, 128, 60, 0.4); }
.dt-conn[hidden] { display: none; }
.dt-conn small { display: block; font-size: 12px; font-weight: 600; opacity: 0.8; }
.dt-conn button { min-height: 36px; padding: 0 16px; border-radius: 10px; cursor: pointer; font: inherit; font-size: 14px; font-weight: 800;
  border: 1px solid #d97706; background: #f59e0b; color: #fff; }
.dt-conn button[data-c="leave"] { background: #fff; color: #9a4a06; }
.dt-conn .dt-spin { width: 16px; height: 16px; flex: none; border-radius: 50%; border: 2px solid rgba(58, 46, 72, 0.2); border-top-color: currentColor; animation: dt-spin 0.9s linear infinite; }
@keyframes dt-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .dt-conn .dt-spin { animation-duration: 2.5s; } .dt-me-pick { transition: none; } .dt-me-pick[aria-pressed="true"] { transform: none; } }
`;

export function startFlow({ root, api, grade, leave }) {
  // luôn ghi lại nội dung (sửa CSS lúc dev thì vào lại trường quay là thấy, không phải tải lại trang)
  let css = document.getElementById('dt-flow-css');
  if (!css) { css = document.createElement('style'); css.id = 'dt-flow-css'; document.head.appendChild(css); }
  css.textContent = CSS;
  // ---- hồ sơ của mình
  const bag0 = loadBag();
  let nick = checkNick(bag0.nick || '').ok ? bag0.nick : '';
  let pupil = Number.isInteger(bag0.pupil) && bag0.pupil >= 0 && bag0.pupil < PUPILS.length ? bag0.pupil : -1;
  let want = bag0.dtWant !== 0;
  const suggest = () => checkNick(shortName(getCurrentUser()?.name || '')).value;
  function saveMe() {
    const b = loadBag();
    if (b.nick !== nick) { b.nick = nick; b.nickAt = Date.now(); }
    b.pupil = pupil;
    b.dtWant = want ? 1 : 0;
    saveBag(b);
  }

  // ---- trạng thái phòng
  let mySeat = '', myId = 0, conn = 'connecting', A = null, skew = 0, gone = false, step = 'me', live = false;
  /** Chương trình đã chiếu xong trên máy này ({ onPod, score, rank } từ api.onShowEnd): hiện thẻ kết thúc tới khi rời phòng. */
  let ended = null;
  const peers = new Map();   // id → { seat, kind, n }
  const seatOwner = () => {
    const m = new Map();
    for (const [id, p] of peers) if (p.seat) m.set(p.seat, id);
    return m;
  };
  const serverNow = () => Date.now() + skew;

  root.insertAdjacentHTML('beforeend', `
    <div class="ch-seatmap is-entry dt-me" role="dialog" aria-modal="true" aria-label="Nhân vật của bạn" hidden>
      <div class="ch-sm-box">
        <div class="ch-sm-head"><b class="ch-sm-title">Nhân vật của bạn</b><button type="button" class="ch-ic ch-sm-x" data-me="x" aria-label="Đóng">${icon('x')}</button></div>
        <p class="ch-sm-sub">Chọn một bạn để ngồi trong khán phòng và lên bục thi.</p>
        <div class="dt-me-grid">${PUPILS.map((k, i) => `<button type="button" class="dt-me-pick" data-i="${i}" aria-pressed="false"><img src="${thumb(i)}" alt="" width="144" height="144"><span>${PUPIL_NAMES[i]}</span></button>`).join('')}</div>
        <form class="dt-me-nick" autocomplete="off">
          <label for="dt-nick">Tên MC gọi bạn</label>
          <input id="dt-nick" type="text" maxlength="${NICK_MAX + 4}" placeholder="Ví dụ: Bảo Anh" spellcheck="false" enterkeyhint="done">
          <p class="dt-me-msg" role="status"></p>
        </form>
        <div class="ch-sm-foot"><span class="ch-sm-pick"></span><button type="button" class="ch-sm-ok" data-me="ok" disabled>Xong</button></div>
      </div>
    </div>
    <div class="ch-seatmap is-entry dt-seatmap" role="dialog" aria-modal="true" aria-label="Chọn chỗ ngồi" hidden>
      <div class="ch-sm-box">
        <div class="ch-sm-head"><b class="ch-sm-title">Chọn chỗ ngồi</b><span class="ch-sm-count"></span><button type="button" class="ch-ic ch-sm-x" data-sm="x" aria-label="Đóng">${icon('x')}</button></div>
        <p class="ch-sm-sub"></p>
        <div class="ch-sm-stage"><span>Sân khấu</span></div>
        <div class="ch-sm-wrap"><div class="ch-sm-grid"></div></div>
        <div class="ch-sm-legend"><span><i class="is-free"></i>Trống</span><span><i class="is-taken"></i>Đã có bạn ngồi</span><span><i class="is-mine"></i>Ghế của bạn</span><span><i class="is-pick"></i>Đang chọn</span></div>
        <div class="ch-sm-foot"><span class="ch-sm-pick"></span><button type="button" class="ch-sm-auto" data-sm="auto">Chọn giúp tôi</button><button type="button" class="ch-sm-ok" data-sm="ok" disabled>Vào ngồi</button></div>
      </div>
    </div>
    <div class="ch-qwait dt-wait" role="status" hidden></div>
    <div class="dt-conn" role="alert" hidden></div>`);
  const meEl = root.querySelector('.dt-me'), smEl = root.querySelector('.dt-seatmap');
  const waitEl = root.querySelector('.dt-wait'), connEl = root.querySelector('.dt-conn');
  const nickIn = meEl.querySelector('input'), nickMsg = meEl.querySelector('.dt-me-msg'), meOk = meEl.querySelector('[data-me="ok"]');
  const grid = smEl.querySelector('.ch-sm-grid'), smOk = smEl.querySelector('[data-sm="ok"]'), smSub = smEl.querySelector('.ch-sm-sub');
  const chipSeat = root.querySelector('.ch-chip .ch-seat');
  const stopKeys = (el) => ['pointerdown', 'wheel', 'keydown', 'keyup'].forEach(ev => el.addEventListener(ev, (e) => e.stopPropagation()));
  [meEl, smEl, waitEl, connEl].forEach(stopKeys);   // gõ tên không làm camera chạy (W A S D), cuộn không phóng cảnh

  // ---- 1. nhân vật và tên
  let meDraft = -1, meEntry = false;
  function openMe(entry) {
    meEntry = entry;
    meDraft = pupil;
    nickIn.value = nick || suggest() || '';
    meEl.querySelector('[data-me="x"]').ariaLabel = entry ? 'Về sảnh' : 'Đóng';
    meEl.hidden = false;
    paintMe();
    (meEl.querySelector('[aria-pressed="true"]') || meEl.querySelector('.dt-me-pick')).focus({ preventScroll: true });
  }
  function paintMe() {
    meEl.querySelectorAll('.dt-me-pick').forEach(b => b.setAttribute('aria-pressed', +b.dataset.i === meDraft));
    const c = checkNick(nickIn.value);
    nickMsg.textContent = c.ok ? `MC sẽ gọi bạn là “${c.value}”.` : NICK_WHY[c.why];
    nickMsg.classList.toggle('is-ok', c.ok);
    meEl.querySelector('.ch-sm-pick').textContent = meDraft < 0 ? 'Chạm một bạn để chọn.' : '';
    meOk.disabled = !(c.ok && meDraft >= 0);
  }
  meEl.querySelector('.dt-me-grid').addEventListener('click', (e) => {
    const b = e.target.closest('.dt-me-pick');
    if (!b) return;
    meDraft = +b.dataset.i;
    SFX.click();
    paintMe();
  });
  nickIn.addEventListener('input', paintMe);
  meEl.querySelector('form').addEventListener('submit', (e) => { e.preventDefault(); if (!meOk.disabled) meOk.click(); });
  meOk.onclick = () => {
    const c = checkNick(nickIn.value);
    if (!c.ok || meDraft < 0) return;
    const renamed = c.value !== nick, rekind = meDraft !== pupil;
    nick = c.value; pupil = meDraft;
    saveMe();
    SFX.click();
    meEl.hidden = true;
    if (mySeat && !meOnPod) api.seatPupil(mySeat, pupil, true, nick);
    syncNpc(true);   // đứng bục: bục 1 đổi theo nhân vật / tên mới
    // máy chủ chỉ nhận tên lúc chào: đổi tên thì chào lại (cùng mã phiên, ghế mang theo); đổi nhân vật gửi bộ đồ
    if (renamed && net?.ready) { rejoin = true; net.join(roomKey(), hiState, { v: ARENA_PROTO }); }
    else if (rekind) net?.look(0, 0, lookOfPupil(pupil));
    if (meEntry) toSeat();
    else paintWait();
  };
  meEl.querySelector('[data-me="x"]').onclick = () => (meEntry ? leave() : (meEl.hidden = true));

  // ---- 2. chọn ghế
  let picked = '', smEntry = false;
  function bestSeat() {
    const own = seatOwner();
    let best = Infinity, seat = '';
    for (const id of SEAT_IDS) {
      if (own.has(id) && own.get(id) !== myId) continue;
      const r = id.charCodeAt(0) - 65, n = +id.slice(1);
      const score = Math.abs(r - 1.5) + Math.abs(n - (AISLE_AFTER + 0.5)) * 0.35 + Math.random() * 1.2;
      if (score < best) { best = score; seat = id; }
    }
    return seat;
  }
  function toSeat(note = '') {
    step = 'seat';
    let last = '';
    try { last = localStorage.getItem(SEAT_KEY) || ''; } catch { /* bộ nhớ bị chặn */ }
    const own = seatOwner();
    openSeats(true, { pick: last && SEAT_IDS.includes(last) && !own.has(last) ? last : bestSeat(), note });
  }
  function openSeats(entry, { pick = '', note = '' } = {}) {
    smEntry = entry;
    picked = pick;
    smEl.querySelector('.ch-sm-title').textContent = entry ? 'Chọn chỗ ngồi' : 'Đổi ghế';
    smEl.querySelector('[data-sm="x"]').ariaLabel = entry ? 'Về sảnh' : 'Đóng';
    smOk.textContent = entry ? 'Vào ngồi' : 'Ngồi ghế này';
    smSub.textContent = note || 'Chạm một ghế trống, hoặc để chúng tôi chọn giúp, rồi bấm Vào ngồi.';
    smSub.classList.toggle('is-warn', !!note);
    smEl.hidden = false;
    paintSeats();
    (grid.querySelector('.is-pick') || grid.querySelector('.is-mine') || grid.querySelector('.is-free'))?.focus({ preventScroll: true });
  }
  function paintSeats() {
    if (!grid.childElementCount) {
      let html = '';
      for (let r = 0; r < ROWS; r++) {
        const L = 'ABCDE'[r];
        html += `<span class="ch-sm-row">${L}</span>`;
        for (let n = 1; n <= COLS; n++) {
          if (n === AISLE_AFTER + 1) html += '<span class="ch-sm-aisle"></span>';
          html += `<button type="button" class="ch-sm-seat" data-seat="${L}${n}" title="${L}${n}" style="background-size: 125%; background-position: center 12%; background-repeat: no-repeat"></button>`;
        }
        html += `<span class="ch-sm-row">${L}</span>`;
      }
      grid.innerHTML = html;
    }
    const own = seatOwner();
    if (picked && own.has(picked) && own.get(picked) !== myId) { picked = ''; warnTaken(); }
    for (const b of grid.querySelectorAll('[data-seat]')) {
      const id = b.dataset.seat, who = own.get(id), mine = id === mySeat, busy = who != null && who !== myId && !mine;
      const cls = `ch-sm-seat ${mine ? 'is-mine' : busy ? 'is-taken' : id === picked ? 'is-pick' : 'is-free'}`;
      const kind = mine ? pupil : busy ? peers.get(who)?.kind ?? -1 : -1;
      const bg = kind >= 0 ? `url("${thumb(kind)}")` : '';
      if (b.className !== cls) b.className = cls;
      if (b.style.backgroundImage !== bg) b.style.backgroundImage = bg;
      b.disabled = busy;
      b.setAttribute('aria-pressed', id === picked);
      b.setAttribute('aria-label', `Ghế ${id}${mine ? ', ghế của bạn' : busy ? `, ${peers.get(who)?.n || 'có bạn'} đang ngồi` : ''}`);
    }
    const sat = own.size + (mySeat && !own.has(mySeat) ? 1 : 0);
    smEl.querySelector('.ch-sm-count').textContent = `${sat} bạn đã ngồi · còn ${SEAT_IDS.length - sat} ghế trống`;
    smOk.disabled = !picked;
    smEl.querySelector('.ch-sm-pick').innerHTML = picked ? `${smEntry ? 'Ghế của bạn' : 'Ghế'} <b>${picked}</b>` : mySeat ? `Bạn đang ngồi <b>${mySeat}</b>` : 'Chọn một ghế trống';
  }
  function warnTaken() {
    SFX.lost();
    smSub.textContent = 'Ghế này vừa có bạn ngồi trước, bạn chọn ghế khác.';
    smSub.classList.add('is-warn');
  }
  grid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-seat]');
    if (!b || b.disabled) return;
    picked = b.dataset.seat === mySeat ? '' : b.dataset.seat;
    SFX.click();
    paintSeats();
  });
  smEl.querySelector('[data-sm="auto"]').onclick = () => { SFX.click(); picked = bestSeat(); paintSeats(); };
  smEl.querySelector('[data-sm="x"]').onclick = () => (smEntry ? leave() : (smEl.hidden = true));
  smOk.onclick = () => {
    if (!picked) return;
    const own = seatOwner();
    if (own.has(picked) && own.get(picked) !== myId) { picked = ''; warnTaken(); paintSeats(); return; }
    SFX.click();
    sitAt(picked);
    smEl.hidden = true;
    if (smEntry) { step = 'wait'; if (A?.step === 'live') goLive(); paintWait(); }
  };
  function sitAt(id) {
    if (mySeat && mySeat !== id) api.seatPupil(mySeat, -1);
    mySeat = id;
    try { localStorage.setItem(SEAT_KEY, id); } catch { /* bộ nhớ bị chặn */ }
    if (!meOnPod) { api.seatPupil(id, pupil, true, nick); if (!live) api.seatCam(id); }
    if (chipSeat) chipSeat.textContent = `Ghế ${id}`;
    net?.sit(id);
    solo.tick();
  }

  // ---- bạn ảo: khán phòng và bục thi (npc.js)
  const COLORS = ['#ff5d73', '#ffb020', '#27d17f', '#3fa9ff'];   // màu bục (games/dauTruong.js COLORS)
  let seed = '', seedAt = 0, podKey = '', pods = [], frozen = false, call = '', callTimer = 0, lastNpc = -1e9, newPod = -1, meOnPod = false, autoGo = false;
  const npcHere = () => [...peers.values()].filter(p => p.npc).length;
  /** Tính lại bạn ảo theo giờ của phòng; chỉ đặt / bỏ những ghế đổi. force: tính ngay (vừa dựng lại danh sách người, đổi công tắc). */
  function syncNpc(force = false) {
    if (!A || A.step === 'closed') return;
    const now = serverNow();
    if (!force && now - lastNpc < 900) return;
    lastNpc = now;
    if (!seed || Math.abs(A.startAt - seedAt) > 20 * 60e3) { seed = `${roomKey()}:${A.test ? `t${Math.floor(now / 86400e3)}` : A.startAt}`; seedAt = A.startAt; }
    const lead = A.test ? TEST_LEAD : OPEN_BEFORE;
    // nhịp vào phòng theo giờ bắt đầu ban đầu (seedAt): phòng thử đủ bục bắt đầu sớm thì các bạn vẫn vào dần, không ào ra một lúc
    const frac = 1 - (seedAt - now) / lead;
    const taken = [];
    for (const p of peers.values()) if (!p.npc && p.seat) taken.push(p.seat);
    if (mySeat) taken.push(mySeat);
    const audience = audienceAt({ grade, seed, frac, taken, real: taken.length });
    if (!frozen) {
      const meWant = want && mySeat && step === 'wait' && pupil >= 0;
      const reals = meWant ? [{ name: nick, kind: pupil, me: true }] : [];
      const got = podiumAt({ seed, frac, reals, audience, full: A.step === 'live' });
      const key = got.pods.map(x => x.npc || (x.me ? `me:${x.kind}:${x.name}` : x.name)).join(',');
      if (key !== podKey) {
        const before = new Set(pods.map(x => x.npc).filter(Boolean));
        const fresh = got.pods.findIndex(x => x.npc && !before.has(x.npc));
        podKey = key; pods = got.pods;
        api.setPods?.(pods);
        setMeOnPod(pods.some(x => x.me));
        if (fresh >= 0) {
          const x = pods[fresh];
          newPod = fresh;
          call = `MC mời ${x.name} (ghế ${x.seat}) lên bục ${fresh + 1}!`;
          clearTimeout(callTimer); callTimer = setTimeout(() => { call = ''; newPod = -1; paintWait(); }, 6000);
          SFX.podium();
        }
      }
      // phòng thử / máy dev: đủ 4 bục thì tự bắt đầu (không có nút Bắt đầu ngay); lượt theo lịch thì bắt đầu đúng giờ
      if (A.test && A.step === 'lobby' && pods.length === 4 && !autoGo) {
        autoGo = true;
        later(() => {
          if (A?.step !== 'lobby') return;
          call = 'Đủ 4 bạn trên bục! Chương trình sắp bắt đầu.';
          clearTimeout(callTimer); newPod = -1;
          if (srvA) net?.start(); else solo.start();
          paintWait();
        }, 2500);   // để mọi người kịp thấy bạn cuối cùng lên bục
      }
    }
    // ghế khán giả: bạn ảo đang đứng bục thì ghế của bạn ấy để trống
    const onPod = new Set(pods.map(x => x.npc).filter(Boolean));
    const next = new Map(audience.filter(a => !onPod.has(a.npc.id)).map(a => [`npc:${a.npc.id}`, a]));
    for (const [id, p] of [...peers]) {
      if (!p.npc) continue;
      const w = next.get(id);
      if (w && w.seat === p.seat) { next.delete(id); continue; }
      if (p.seat !== mySeat) api.seatPupil(p.seat, -1);
      peers.delete(id);
    }
    for (const [id, a] of next) {
      peers.set(id, { seat: a.seat, kind: a.npc.kind, n: a.npc.name, npc: a.npc.skill });
      placePeer(id);
    }
    if (!smEl.hidden) paintSeats();
  }
  /** Mình lên bục / về ghế: đứng bục thì ghế của mình để trống (người cầm máy là bục 1), camera nhìn các bục. */
  function setMeOnPod(on) {
    if (on === meOnPod) return;
    meOnPod = on;
    if (!mySeat) return;
    if (on) { api.seatPupil(mySeat, -1); api.cam('players'); }
    else { api.seatPupil(mySeat, pupil, true, nick); if (!live) api.seatCam(mySeat); }
  }
  function podsHtml() {
    return `<div class="dt-pods" aria-label="Bục thi">${[0, 1, 2, 3].map(i => {
      const x = pods[i];
      const cls = `dt-pod${x ? '' : ' is-empty'}${x?.me ? ' is-me' : ''}${i === newPod ? ' is-new' : ''}`;
      return `<div class="${cls}" style="--c:${COLORS[i]}">${x ? `<img src="${thumb(x.kind)}" alt="" width="46" height="46">` : '<i>?</i>'}<span>${x ? esc(x.name) : `Bục ${i + 1}`}</span></div>`;
    }).join('')}</div>`;
  }

  // ---- 3. chờ giờ bắt đầu, 4. bắt đầu
  let tick = 0;
  function paintWait() {
    if (gone) return;
    const show = step === 'wait' && A && conn !== 'failed';
    // đang diễn thì không che sân khấu, kể cả khi đồng hồ của phòng đã qua giờ hết lượt: lượt đã bắt đầu là chơi tới hết
    waitEl.hidden = !show || live;
    root.classList.toggle('is-test', !!A?.test);
    syncNpc();
    if (!show || live) return;
    const now = serverNow();
    if (ended) {
      waitEl.classList.remove('is-go');
      const next = A.test ? 0 : nextStart(grade, Math.max(now, A.startAt + LIVE_MS));
      const html = `<b>Chương trình đã kết thúc!</b>
        <p>${ended.onPod && ended.rank ? `Bạn xếp hạng ${ended.rank} với <span class="dt-big">${ended.score}</span> điểm.` : `Bạn được <span class="dt-big">${ended.score}</span> điểm cùng khán phòng.`}</p>
        <p class="ch-qw-hint">Cảm ơn bạn đã tham gia.${next ? ` Hẹn gặp lại bạn lúc ${whenText(next, now)}.` : ''}</p>
        <div class="ch-qw-btns"><button type="button" data-w="leave">Về sảnh</button></div>`;
      if (waitEl.dataset.html !== html) { waitEl.innerHTML = html; waitEl.dataset.html = html; }
      return;
    }
    if (A.step === 'closed') {
      waitEl.classList.remove('is-go');
      waitEl.innerHTML = `<b>Lượt hôm nay đã kết thúc</b><p>${A.startAt > now ? `Lượt tiếp theo: ${whenText(A.startAt, now)}.` : 'Hẹn gặp lại bạn ở lượt sau!'}</p>
        <div class="ch-qw-btns"><button type="button" data-w="leave">Về sảnh</button></div>`;
      return;
    }
    const left = A.startAt - now, soon = left <= 60000;
    waitEl.classList.toggle('is-go', soon);
    const html = `<b>${A.test ? 'Phòng thử · ' : ''}Chương trình bắt đầu lúc ${whenText(A.startAt, now)}</b>
      <p>Còn <span class="dt-big">${clockText(left)}</span></p>
      <p class="ch-qw-ev">${A.people + npcHere()} bạn đã vào chỗ${A.test && pods.length < 4 ? ' · đủ 4 bục là bắt đầu' : ''}</p>
      ${podsHtml()}
      <p class="dt-call" aria-live="polite">${call ? esc(call) : '&nbsp;'}</p>
      <button type="button" class="dt-sw" role="switch" aria-checked="${want}" data-w="want"><i></i>Em muốn lên bục</button>
      <p class="ch-qw-hint">${want ? 'Bạn đứng bục 1. Bục còn trống thì MC mời các bạn dưới khán phòng lên.' : 'Bạn vẫn trả lời mọi câu cùng khán phòng và có điểm riêng.'}</p>
      <div class="ch-qw-btns"><button type="button" data-w="me">${icon('user')}Nhân vật</button><button type="button" data-w="seat">${icon('seats')}Đổi ghế</button></div>`;
    // chỉ vẽ lại khi chữ đổi (vẽ lại cả thẻ mỗi 0,25 giây sẽ nuốt mất cú chạm đang dở)
    if (waitEl.dataset.html !== html) { waitEl.innerHTML = html; waitEl.dataset.html = html; }
  }
  waitEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-w]');
    if (!b) return;
    const w = b.dataset.w;
    if (w === 'want') { want = !want; SFX.click(); saveMe(); net?.want(want); solo.tick(); syncNpc(true); paintWait(); }
    else if (w === 'me') openMe(false);
    else if (w === 'seat') openSeats(false);
    else if (w === 'leave') leave();
  });
  function onArena(a) {
    skew = a.now - Date.now();
    const was = A?.step;
    A = a;
    if (a.step === 'live' && was !== 'live') goLive();
    // Hết giờ lượt (45 phút) KHÔNG cắt chương trình đang diễn: chương trình tự kết thúc (api.onShowEnd). Chỉ khi máy còn mở tới
    // sảnh chờ của lượt sau thì dọn sân khấu cho lượt mới.
    if (a.step === 'lobby' && (ended || live)) { ended = null; live = false; frozen = false; autoGo = false; delete waitEl.dataset.html; api.setMode('idle'); }
    paintWait();
  }
  api.onShowEnd = (res) => {
    if (gone || !live) return;
    // để lời chào cuối và pháo giấy kịp xong rồi mới hiện thẻ
    later(() => { if (!live) return; live = false; ended = res || { onPod: false, score: 0, rank: 0 }; paintWait(); }, 2500);
  };
  function goLive() {
    if (step !== 'wait' || ended) return;   // còn chọn nhân vật / ghế: vào xong thì bắt đầu xem; xem xong rồi thì không chiếu lại
    live = true;
    waitEl.hidden = true;
    syncNpc(true);   // tới giờ: mời nốt bạn ảo cho đủ 4 bục, rồi giữ nguyên tới hết lượt
    frozen = true;
    // TODO bước sau: máy chủ cầm chương trình (realtime/arena.js); giờ chạy bản mẫu vòng thi
    api.setMode('open');
    // Mở màn: hai MC chào xong thì tự vào Khởi động (intro trong games/dauTruong.js)
  }
  const timers = [];
  const later = (fn, ms) => timers.push(setTimeout(() => { if (!gone) fn(); }, ms));

  // ---- kết nối
  function paintConn(kind, text, btns = '', note = '') {
    if (!kind) { connEl.hidden = true; return; }
    connEl.className = `dt-conn${kind === 'ok' ? ' is-ok' : kind === 'info' ? ' is-info' : ''}`;
    connEl.innerHTML = `${kind === 'busy' || kind === 'info' ? '<i class="dt-spin" aria-hidden="true"></i>' : ''}<span>${esc(text)}${note ? `<small>${esc(note)}</small>` : ''}</span>${btns}`;
    connEl.hidden = false;
  }
  connEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-c]');
    if (!b) return;
    if (b.dataset.c === 'retry') { conn = 'connecting'; paintConn('info', 'Đang kết nối lại…'); net?.retry(); }
    else leave();
  });
  let okTimer = 0, rejoin = false;   // rejoin: tự chào lại (đổi tên), không phải rớt mạng
  const roomKey = () => `arena-g${grade}`;
  const hiState = () => ({ x: 0, y: 0, z: 0, h: 0, a: 'idle', k: 0, c: 0, w: 0, seat: mySeat, n: nick, o: pupil >= 0 ? lookOfPupil(pupil) : '', want });
  function placePeer(id) {
    const p = peers.get(id);
    // ghế của mình không bao giờ bị người khác (hay bạn máy) đè: đè thì mất vai khán giả và điểm của mình
    if (p?.seat && p.seat !== mySeat) api.seatPupil(p.seat, p.kind >= 0 ? p.kind : 0, false, p.n || '', p.npc || 'kha');
  }
  const net = ONLINE ? makeNet({
    welcome(id, list) {
      myId = id;
      for (const p of peers.values()) if (p.seat && p.seat !== mySeat) api.seatPupil(p.seat, -1);
      peers.clear();
      for (const p of list) { peers.set(p.id, { seat: p.seat || '', kind: pupilOfLook(p.o), n: p.n }); placePeer(p.id); }
      // ghế chọn đúng lúc đang nối (tin 'sit' chưa gửi được): xin lại; máy chủ đã giữ rồi thì không sao
      if (mySeat) net.sit(mySeat);
      syncNpc(true);
      if (!smEl.hidden) paintSeats();
    },
    join(p) { peers.set(p.id, { seat: p.seat || '', kind: pupilOfLook(p.o), n: p.n }); syncNpc(true); placePeer(p.id); if (!smEl.hidden) paintSeats(); },
    leave(id) {
      const p = peers.get(id);
      if (p?.seat && p.seat !== mySeat) api.seatPupil(p.seat, -1);
      peers.delete(id);
      if (!smEl.hidden) paintSeats();
    },
    sit(id, seat) {
      const p = peers.get(id) || { kind: -1, n: '' };
      if (p.seat && p.seat !== seat && p.seat !== mySeat) api.seatPupil(p.seat, -1);
      p.seat = seat; peers.set(id, p); syncNpc(true); placePeer(id);
      if (!smEl.hidden) paintSeats();
    },
    up(id) { const p = peers.get(id); if (p?.seat && p.seat !== mySeat) api.seatPupil(p.seat, -1); if (p) p.seat = ''; if (!smEl.hidden) paintSeats(); },
    look(id, c, w, o) { const p = peers.get(id); if (!p) return; p.kind = pupilOfLook(o); if (p.seat) { api.seatPupil(p.seat, -1); placePeer(id); } },
    refused(seat) {
      // ghế mình xin (lúc vào, lúc nối lại) đã có bạn khác: quay lại bước chọn ghế
      if (seat !== mySeat) return;
      api.seatPupil(seat, -1);
      mySeat = '';
      placePeer(seatOwner().get(seat));
      step = 'seat'; waitEl.hidden = true;
      toSeat('Ghế của bạn vừa có bạn khác ngồi, bạn chọn ghế khác.');
    },
    states() {},
    status(on) {
      clearTimeout(okTimer);
      if (rejoin) { if (on) rejoin = false; return; }
      if (on) {
        const back = conn === 'lost' || conn === 'failed';
        conn = 'ok';
        if (back) { paintConn('ok', 'Đã kết nối lại. Ghế của bạn vẫn được giữ.'); okTimer = setTimeout(() => paintConn(''), 2500); } else paintConn('');
      } else if (!gone) { conn = 'lost'; paintConn('busy', 'Mất kết nối, đang nối lại…'); }
      paintWait();
    },
    retrying(n) { if (conn !== 'ok') paintConn('busy', n > 1 ? `Mất kết nối, đang nối lại (lần ${n})…` : 'Đang kết nối…'); },
    failed() {
      conn = 'failed';
      paintConn('err', 'Không kết nối được tới trường quay. Kiểm tra mạng rồi thử lại.', '<button type="button" data-c="retry">Thử lại</button><button type="button" data-c="leave">Về sảnh</button>',
        import.meta.env.DEV ? 'Máy dev: máy chủ phòng chưa chạy? Mở terminal: cd realtime, npm run dev' : '');
      paintWait();
    },
    closed() {
      // máy chủ: phòng ngoài giờ (đã báo giờ lượt tới qua onArena trước khi đóng)
      conn = 'closed';
      // rớt mạng giữa chương trình rồi nối lại sau giờ hết lượt: chương trình trên máy vẫn chiếu tới hết, không báo lỗi
      if (live || ended) { paintConn(''); paintWait(); return; }
      const when = A?.startAt ? ` Lượt tiếp theo: ${whenText(A.startAt, serverNow())}.` : '';
      paintConn('err', `Phòng chưa mở hoặc lượt đã xong.${when}`, '<button type="button" data-c="leave">Về sảnh</button>');
      meEl.hidden = true; smEl.hidden = true; waitEl.hidden = true;
    },
    arena(a) { srvA = true; clearInterval(solo.iv); onArena(a); },   // máy chủ cầm giờ: thôi đồng hồ trên máy
    keep: () => live,   // đang diễn: ra nền ngắn thì giữ kết nối
  }) : null;

  /* ---- đồng hồ của phòng trên máy: chạy ngay từ lúc bước vào, để khán phòng đã có các bạn ngồi sẵn trước khi chọn ghế (không phải
     chờ máy chủ trả lời rồi mới ào ra một lúc). Máy chủ gửi giờ của phòng ('A') thì thôi, theo máy chủ. Không có máy chủ phòng, hay
     máy chủ cũ không gửi 'A' (máy dev đang chạy bản cũ): chạy luôn bằng đồng hồ này. Lịch giống hệt máy chủ (rules.js). */
  let srvA = false;
  const free = import.meta.env.DEV || testRoom() || !ONLINE;
  const solo = {
    t0: Date.now(), forceAt: 0, iv: 0,
    begin() {
      if (!ONLINE) myId = 1;
      this.iv = setInterval(() => this.tick(), 1000);
      this.tick();
    },
    start() { this.forceAt = Date.now() + 5000; this.tick(); },
    tick() {
      if (srvA || gone) return;
      const now = Date.now(), startAt = free ? this.forceAt || this.t0 + TEST_LEAD : nextStart(grade, now);
      const step = free ? (now < startAt ? 'lobby' : now < startAt + LIVE_MS ? 'live' : 'closed') : stepAt(startAt, now);
      // người thật (bạn ảo đếm riêng: npcHere)
      const people = [...peers.values()].filter(p => !p.npc && p.seat).length + (mySeat ? 1 : 0);
      onArena({ step, startAt, now, people, want: want && mySeat ? 1 : 0, test: free ? 1 : 0 });
    },
  };

  // thử tự động (scripts, máy dev): trạng thái phòng, bạn ảo, bục
  if (import.meta.env.DEV) window.__dtFlow = { get A() { return A; }, peers, get pods() { return pods; }, get seed() { return seed; }, sync: () => syncNpc(true) };

  // ---- vào
  api.onBack = () => { leave(); return true; };
  solo.begin();
  if (net) {
    paintConn('info', 'Đang kết nối tới trường quay…');
    net.join(roomKey(), hiState, { v: ARENA_PROTO });
  } else {
    paintConn('info', 'Chưa có máy chủ phòng: bạn chơi thử một mình cùng các bạn máy.');
    later(() => paintConn(''), 5000);
  }
  api.cam('wide', true);
  if (nick && pupil >= 0) toSeat(); else openMe(true);
  tick = setInterval(paintWait, 250);
  // máy có mạng trở lại sau khi đã thôi nối: thử lại luôn, không bắt bấm
  const onOnline = () => { if (conn === 'failed') { conn = 'connecting'; paintConn('info', 'Đang kết nối lại…'); net?.retry(); } };
  addEventListener('online', onOnline);

  return () => {
    gone = true;
    clearInterval(tick); clearTimeout(okTimer); clearInterval(solo.iv); clearTimeout(callTimer);
    removeEventListener('online', onOnline);
    timers.forEach(clearTimeout);
    net?.close();
    meEl.remove(); smEl.remove(); waitEl.remove(); connEl.remove();
  };
}
