/**
 * Sảnh ngoài của Đấu Trường Nhí (thẻ 🏆): ảnh sân khấu, cách chơi, trạng thái phòng (GET /status của máy chủ phòng): có bạn thật
 * đang chơi thì "Đang diễn ra", không thì "N bạn trong phòng, đang chờ thêm bạn 3/4". Bấm vào thì xin toàn màn hình + xoay ngang
 * (như Ai tài năng nhất) rồi dựng sân khấu và các bước trong flow.js.
 * Không theo lịch (vào lúc nào cũng được): phòng mở mọi lúc (rules.js ALWAYS_OPEN), máy dev, phòng thử, bản build chưa có máy chủ phòng.
 * Kiểu thẻ dùng chung với sảnh Ai tài năng nhất (thanDong.css .td-*).
 */
import '../thanDong/thanDong.css';
import { landscapeOn, landscapeOff } from '../thanDong/engine/landscape.js';
import { ONLINE, statusUrl } from '../thanDong/church/net.js';
import { testRoom } from '../thanDong/engine/admin.js';
import { getProfileGrade } from '../engine/profile.js';
import { ALWAYS_OPEN, OPEN_BEFORE, clockText, nextStart, stepAt, whenText } from './rules.js';
import { liveNow, waitFill } from '../engine/liveCount.js';
import { loadAwards } from './awards.js';
import { arenaLobby } from '../engine/arenaStats.js';

const FONTS = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Nunito:wght@500;600;700;800;900&display=swap';
export const SHOW_TITLE = 'Đấu Trường Nhí';
/** Vào lúc nào cũng được (không chờ lịch): phòng cuốn chiếu (rules.js ALWAYS_OPEN), máy dev, phòng thử, chưa có máy chủ phòng. */
export const freeTime = () => ALWAYS_OPEN || import.meta.env.DEV || testRoom() || !ONLINE;

/** deps.stage(opts, back) dựng sân khấu (src/games/dauTruong.js stage), trả { dispose, api, root }. */
export function lobbyRender(app, onBack, deps) {
  const grade = getProfileGrade();
  arenaLobby();   // thống kê admin (engine/arenaStats.js); còn dấu chương trình bỏ dở lần trước thì ghi luôn
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
      /* ảnh bìa (sân khấu 3D chụp góc Trực diện, scripts/.tmp/dt-cover.mjs): màn LED và hai MC ở giữa, cắt thành cột cao vẫn giữ */
      .td-lobby .dt-cover { object-position: 50% 45%; }
      .td-lobby .dt-when { font-style: normal !important; font-variant-numeric: tabular-nums; }
      .td-lobby .dt-awards { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 14px; border-radius: 14px; border: 1px solid rgba(201, 144, 10, 0.45);
        background: linear-gradient(90deg, rgba(255, 213, 92, 0.22), rgba(255, 213, 92, 0.06)); color: inherit; font: inherit; font-weight: 700; text-align: left; cursor: pointer; }
      .td-lobby .dt-awards b { font-size: 24px; }
      .td-lobby .dt-awards span { flex: 1; }
      .td-lobby .dt-awards small { font-weight: 600; opacity: 0.75; }
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
            <li><span>⏰</span>${ALWAYS_OPEN ? 'Vào lúc nào cũng được, đủ 4 bục là bắt đầu' : 'Phòng mở trước giờ 15 phút'}</li>
            <li><span>🏆</span>Vòng Chọn, Khởi động, Tăng tốc, Về đích</li>
          </ul>
          <p class="td-note dt-when" aria-live="polite"></p>
          <button type="button" class="td-go" disabled>Vào trường quay</button>
          <button type="button" class="dt-awards"><b>🏅</b><span>Thành tích của em<br><small class="dt-aw-n"></small></span>›</button>
        </div>
      </article>
    </div>`;
    app.querySelector('.td-back').onclick = () => { cleanup(); onBack(); };
    const go = app.querySelector('.td-go'), when = app.querySelector('.dt-when');
    const aws = loadAwards();
    app.querySelector('.dt-aw-n').textContent = aws.length ? `${aws.length} giấy chứng nhận, chạm để xem` : 'Chưa có giấy chứng nhận nào';
    app.querySelector('.dt-awards').onclick = async () => {
      clearInterval(tick); clearInterval(poll);
      const { renderAwards } = await import('./awardsView.js');
      if (gone) return;
      inStage = renderAwards(app, () => { inStage?.(); inStage = null; paintLobby(); });
    };
    if (!okGrade) { when.textContent = 'Chọn lớp 1 đến lớp 5 trong hồ sơ để vào phòng của lớp mình.'; return; }
    go.onclick = () => enter(true);
    app.querySelector('.td-pic-btn').onclick = () => { if (!go.disabled) enter(true); };
    let people = -1, real = 0, waiting = 0;   // real: số bạn thật đang chơi một lượt (máy chủ báo playing); waiting: bạn thật đang chờ
    const paint = () => {
      if (gone) return;
      const now = Date.now();
      // có bạn thật đang chơi thì luôn báo "đang diễn ra" và cho vào xem, kể cả phòng thử / máy dev / ngoài lịch
      if (real > 0) {
        go.disabled = false;
        go.textContent = 'Vào xem và trả lời cùng';
        when.textContent = `🔴 Đang diễn ra: ${real} bạn đang chơi.`;
        return;
      }
      if (freeTime()) {
        // phòng mở mọi lúc: chưa ai chơi thì lời mời "N bạn trong phòng, đang chờ thêm bạn 2/4, 3/4". Số trong phòng là một phần
        // nhỏ của số "đang học" ở trang chủ (liveCount.js roomNpc), luôn nhỏ hơn số ấy; vào là chơi ngay, thiếu người thì bạn ảo.
        go.disabled = false;
        go.textContent = 'Vào thi ngay';
        const lv = liveNow(), room = Math.min(lv.room + waiting, lv.learning - 1);
        // ban đêm (23h30–8h) chỉ nói số thật: có bạn đang chờ thì báo, không thì mời vào thi luôn
        when.textContent = `${testRoom() ? 'Phòng thử. ' : ''}${lv.night
          ? (waiting > 0 ? `🟢 ${waiting} bạn đang chờ trong phòng. Vào thi cùng bạn ấy!` : '🟢 Vào thi ngay, MC mời các bạn lên bục cùng em!')
          : `🟢 ${room} bạn trong phòng, đang chờ thêm bạn: ${waitFill(now, waiting)}/4. Vào tham gia ngay!`}`;
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
    const ask = () => url && fetch(url, { cache: 'no-store' }).then(r => r.json()).then(s => { people = s.here || 0; real = s.playing && s.people > 0 ? s.people : 0; waiting = s.playing ? 0 : s.people || 0; paint(); }, () => {});
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
      stopFlow = startFlow({ root: st.root, api: st.api, grade, leave: () => { st.dispose(); back(); },
        // thẻ kết thúc: 🏠 Trang chủ (cleanup dừng flow, dọn sân khấu, rồi về trang chủ)
        home: () => { cleanup(); onBack(); } });
    }
    inStage = () => { stopFlow?.(); st.dispose(); };
  }

  paintLobby();
  return cleanup;
}
