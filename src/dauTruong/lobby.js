/**
 * Sảnh ngoài của Đấu Trường Nhí (thẻ 🏆): ảnh sân khấu, cách chơi, giờ lượt tới theo lịch (rules.js), đếm ngược, số bạn đang
 * trong phòng (GET /status của máy chủ phòng). Phòng mở 15 phút trước giờ: nút "Vào trường quay" sáng lên, bấm thì xin toàn màn hình
 * + xoay ngang (như Ai tài năng nhất) rồi dựng sân khấu và các bước trong flow.js.
 * Không theo lịch (vào lúc nào cũng được): máy dev, phòng thử của người thử, bản build chưa có máy chủ phòng (chơi thử một mình).
 * Kiểu thẻ dùng chung với sảnh Ai tài năng nhất (thanDong.css .td-*).
 */
import '../thanDong/thanDong.css';
import { landscapeOn, landscapeOff } from '../thanDong/engine/landscape.js';
import { ONLINE, statusUrl } from '../thanDong/church/net.js';
import { testRoom } from '../thanDong/engine/admin.js';
import { getProfileGrade } from '../engine/profile.js';
import { OPEN_BEFORE, clockText, nextStart, stepAt, whenText } from './rules.js';

const FONTS = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Nunito:wght@500;600;700;800;900&display=swap';
export const SHOW_TITLE = 'Đấu Trường Nhí';
/** Vào lúc nào cũng được (không chờ lịch). */
export const freeTime = () => import.meta.env.DEV || testRoom() || !ONLINE;

/** deps.stage(opts, back) dựng sân khấu (src/games/dauTruong.js stage), trả { dispose, api, root }. */
export function lobbyRender(app, onBack, deps) {
  const grade = getProfileGrade();
  let gone = false, tick = 0, poll = 0, inStage = null, entered = false;
  const cleanup = () => {
    gone = true;
    clearInterval(tick); clearInterval(poll);
    try { inStage?.(); } catch (e) { console.warn('[dautruong] dispose', e); }
    inStage = null;
    if (entered) landscapeOff();
    entered = false;
  };
  if (!document.querySelector(`link[href="${FONTS}"]`)) document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="${FONTS}">`);
  if (!document.getElementById('dt-lobby-css')) {
    document.head.insertAdjacentHTML('beforeend', `<style id="dt-lobby-css">
      .td-lobby .dt-demo { align-self: flex-start; padding: 6px 2px; border: 0; background: none; font: inherit; font-size: 13px; color: var(--muted); text-decoration: underline; cursor: pointer; }
      /* ảnh bìa (sân khấu 3D chụp góc Trực diện, scripts/.tmp/dt-cover.mjs): màn LED và hai MC ở giữa, cắt thành cột cao vẫn giữ */
      .td-lobby .dt-cover { object-position: 50% 45%; }
      .td-lobby .dt-when { font-style: normal !important; font-variant-numeric: tabular-nums; }
    </style>`);
  }

  function paintLobby() {
    clearInterval(tick); clearInterval(poll);
    const okGrade = grade >= 1 && grade <= 5;
    app.innerHTML = `<div class="td-lobby">
      <div class="td-top"><button type="button" class="td-back" aria-label="Quay lại">←</button><span class="td-kick">🏆 ${okGrade ? `Lớp ${grade}` : 'Lớp 1–5'}</span></div>
      <article class="td-card" aria-labelledby="dt-title">
        <button type="button" class="td-pic-btn" tabindex="-1" aria-hidden="true"><img class="td-pic dt-cover" src="/dautruong/cover.jpg" alt="" width="1600" height="930"></button>
        <div class="td-text">
          <h2 id="dt-title">${SHOW_TITLE}</h2>
          <p>Sân chơi Toán và Tiếng Việt cùng các bạn cùng lớp. Bốn bạn giỏi nhất Vòng Chọn lên bục thi, cả khán phòng cùng trả lời từng câu.</p>
          <ul class="td-steps">
            <li><span>🧒</span>Chọn nhân vật và tên MC gọi</li>
            <li><span>🪑</span>Chọn ghế trong khán phòng</li>
            <li><span>⏰</span>Phòng mở trước giờ 15 phút</li>
            <li><span>🏆</span>Vòng Chọn, Khởi động, Tăng tốc, Về đích</li>
          </ul>
          <p class="td-note dt-when" aria-live="polite"></p>
          <button type="button" class="td-go" disabled>Vào trường quay</button>
          <button type="button" class="dt-demo">Xem sân khấu thử (bản mẫu)</button>
        </div>
      </article>
    </div>`;
    app.querySelector('.td-back').onclick = () => { cleanup(); onBack(); };
    const go = app.querySelector('.td-go'), when = app.querySelector('.dt-when');
    app.querySelector('.dt-demo').onclick = () => enter(false);
    if (!okGrade) { when.textContent = 'Chọn lớp 1 đến lớp 5 trong hồ sơ để vào phòng của lớp mình.'; return; }
    go.onclick = () => enter(true);
    app.querySelector('.td-pic-btn').onclick = () => { if (!go.disabled) enter(true); };
    let people = -1;
    const paint = () => {
      if (gone) return;
      const now = Date.now();
      if (freeTime()) {
        go.disabled = false;
        when.textContent = !ONLINE ? 'Chưa có máy chủ phòng: chơi thử một mình với các bạn máy.'
          : `${testRoom() ? 'Phòng thử' : 'Máy dev'}: vào lúc nào cũng được, chương trình bắt đầu 90 giây sau khi phòng có người.`;
        return;
      }
      const start = nextStart(grade, now), step = stepAt(start, now);
      go.disabled = step === 'closed';
      const crowd = people > 0 ? ` ${people} bạn đang trong phòng.` : '';
      if (!start) when.textContent = 'Chưa có lượt nào trong lịch.';
      else if (step === 'live') { go.textContent = 'Vào xem và trả lời cùng'; when.textContent = `Chương trình đang diễn.${crowd}`; }
      else if (step === 'lobby') { go.textContent = 'Vào trường quay'; when.textContent = `Bắt đầu lúc ${whenText(start, now)}, còn ${clockText(start - now)}.${crowd}`; }
      else {
        go.textContent = 'Vào trường quay';
        const open = start - OPEN_BEFORE;
        when.textContent = `Lượt tiếp theo: ${whenText(start, now)}. Phòng mở sau ${clockText(open - now)}.`;
      }
    };
    paint();
    tick = setInterval(paint, 1000);
    // số bạn trong phòng (không có tên ai), 20 giây hỏi một lần
    const url = statusUrl(`arena-g${grade}${testRoom() ? '-test' : ''}`);
    const ask = () => url && fetch(url, { cache: 'no-store' }).then(r => r.json()).then(s => { people = s.here || 0; paint(); }, () => {});
    ask();
    poll = setInterval(ask, 20000);
  }

  async function enter(flow) {
    clearInterval(tick); clearInterval(poll);
    entered = true;
    landscapeOn();   // ngay trong lúc chạm: trình duyệt mới cho toàn màn hình
    app.innerHTML = '';
    const back = () => {
      try { inStage?.(); } catch { /* đã dọn */ }
      inStage = null;
      if (entered) landscapeOff();
      entered = false;
      if (!gone) paintLobby();
    };
    const st = deps.stage({ flow }, back);
    let stopFlow = null;
    if (flow) {
      const { startFlow } = await import('./flow.js');
      if (gone) { st.dispose(); return; }
      stopFlow = startFlow({ root: st.root, api: st.api, grade, leave: () => { st.dispose(); back(); } });
    }
    inStage = () => { stopFlow?.(); st.dispose(); };
  }

  paintLobby();
  return cleanup;
}
