/**
 * Home Page — bảng theo dõi + các sách/trò chơi của lớp bé đã chọn trong hồ sơ.
 */

import { getTotalStars } from '../engine/stars.js';
import { getDashboard, getLastGame, DAILY_GOAL_STARS } from '../engine/activity.js';
import { getProfile, getProfileGrade, avatarUrl, displayName } from '../engine/profile.js';
import { getGrade } from '../data/grades.js';
import { getSpinStatus, countOwned, getSets } from '../engine/stickers.js';
import { isAdminUser } from '../engine/admin.js';

/** Thẻ `admin: true` (bản mẫu chờ duyệt) chỉ hiện với tài khoản admin; `hidden: true` ẩn với mọi người. */
const visible = (g) => !g.hidden && (!g.admin || isAdminUser());
import { getBoardGradeStars } from '../engine/leaderboard.js';
import { getCloudStatus, syncNow } from '../engine/cloudSync.js';
import { getLang, setLang, hasEnglish, LANGS } from '../engine/i18n.js';
import { shouldPromptReview, snoozeReviewPrompt, setPendingRating } from '../engine/reviews.js';
import { canOfferInstall, promptInstall, shouldNudgeInstall, snoozeInstallNudge } from '../engine/installApp.js';
import { liveCountHtml, startLiveCount, liveNow, waitFill } from '../engine/liveCount.js';
import { heroArt } from './homeHero.js';
import { thumbArt } from './homeThumbs.js';
import { statusUrl } from '../thanDong/church/net.js';
import { ALWAYS_OPEN } from '../dauTruong/rules.js';
import { testRoom } from '../thanDong/engine/admin.js';
// Giao diện Tươi sáng (theo app Kinh Thánh). Nạp sau stickers.css (engine/stickers.js ở trên) để đè đúng thứ tự.
import '../styles/sunny.css';

// Sách học tiếng Việt: luôn 100% tiếng Việt, kể cả khi chọn English (engine/i18n.js).
const VI_BOOKS = new Set(['pre3-abc', 'tv3-weekly', 'tv3-spell', 'tv3-tools', 'tv2-tools', 'writing']);

const WEEKDAYS = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
const WEEKDAYS_SHORT = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const ddmm = (d) => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;

/** Sao trên header: sao của lớp đang học, khớp với bảng xếp hạng "Mọi lúc". */
function headerStars() {
  const g = getProfileGrade();
  return g ? getBoardGradeStars(g) : getTotalStars();
}

/** Nút ☁️: trạng thái lưu tiến trình vào tài khoản (cloudSync.js, Firestore). */
function cloudButton() {
  const { state, lastSync } = getCloudStatus();
  const time = lastSync ? new Date(lastSync).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : '';
  const view = {
    ok: ['☁️', '', `Đã lưu lúc ${time}`],
    syncing: ['☁️', '…', 'Đang lưu bài làm…'],
    'needs-auth': ['☁️', 'Lưu', 'Bài làm mới chưa lưu, bấm để lưu'],
    offline: ['☁️', 'Lưu', 'Mất mạng: bài làm vẫn lưu trên máy, có mạng sẽ tự lưu'],
    error: ['☁️', 'Lưu', 'Chưa lưu được bài làm, bấm để thử lại'],
    idle: ['☁️', '', 'Tiến trình học được lưu vào tài khoản của bạn'],
  }[state] || ['☁️', '', ''];
  const warn = !['ok', 'syncing', 'idle'].includes(state);
  return { html: `${view[0]}${view[1] ? `<span>${view[1]}</span>` : state === 'ok' ? '<b class="user-cloud-ok">✓</b>' : ''}`, title: view[2], warn, state };
}
function paintCloudButton(btn) {
  const v = cloudButton();
  btn.innerHTML = v.html;
  btn.title = v.title;
  btn.setAttribute('aria-label', v.title);
  btn.classList.toggle('is-warn', v.warn);
  btn.classList.toggle('is-busy', v.state === 'syncing');
  // Lưu chạy ngầm: chỉ hiện nút khi cần bấm (chưa có phiên đăng nhập, lỗi). Mất mạng thì có mạng tự lưu lại.
  btn.hidden = !v.warn || v.state === 'offline';
}
/** Dải nhắc dưới lời chào: nút ☁️ nhỏ bé không để ý, nên khi chưa lưu được thì nói rõ, nhờ bố mẹ bấm. */
function paintCloudBanner(el) {
  const text = {
    'needs-auth': ['Bài làm mới chưa lưu vào tài khoản', 'Nhờ bố mẹ bấm một lần, từ đó bài làm tự lưu.', 'Lưu ngay'],
    error: ['Chưa lưu được bài làm', 'Bấm để thử lưu lại.', 'Thử lại'],
  }[getCloudStatus().state];
  el.hidden = !text;
  if (text) el.innerHTML = `
    <span class="stk-banner-icon">☁️</span>
    <span class="stk-banner-text"><strong>${text[0]}</strong><span class="stk-banner-sub">${text[1]}</span></span>
    <span class="stk-banner-go">${text[2]} ➜</span>`;
}
window.addEventListener('tth:cloud-status', () => {
  document.querySelectorAll('#user-cloud-btn').forEach(paintCloudButton);
  document.querySelectorAll('#cloud-banner').forEach(paintCloudBanner);
});

// Máy khác đã có thêm sao (biết được sau khi đồng bộ bảng xếp hạng) → cập nhật số trên header.
window.addEventListener('tth:board-stars-changed', () => {
  document.querySelectorAll('.user-stars-count').forEach(el => { el.textContent = headerStars(); });
});

/** Trò chơi trong lớp đang học (không gợi ý "Tiếp tục" sang sách của lớp khác). */
function findGame(grade, gameId) {
  return grade?.games.find(x => x.id === gameId) || null;
}

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export const CHALLENGE_ID = 'challenge';
export const TIENGVIET_ID = 'tiengviet';

// Thẻ gom nhóm ở trang chủ: các thẻ có `group` = id của nhóm → trang danh sách riêng.
const HUBS = {
  [TIENGVIET_ID]: { icon: '📚', color: '#DB2777', title: 'Tiếng Việt' },
  [CHALLENGE_ID]: { icon: '🎮', color: '#E11D48', title: 'Challenge games' },
};
export const HUB_IDS = Object.keys(HUBS);

// English: thẻ sách chưa có bản tiếng Anh (hoặc sách học tiếng Việt) ghi rõ là học bằng tiếng Việt.
function langTag(gameId) {
  if (HUBS[gameId] || getLang() !== 'en' || hasEnglish(gameId)) return '';
  return `<span class="card-lang">${VI_BOOKS.has(gameId) ? 'Học tiếng Việt' : 'Chưa có tiếng Anh'}</span>`;
}

// Thẻ trắng bo tròn: trên là tranh bìa vẽ riêng cho loại thẻ (homeThumbs.js; chưa có tranh thì biểu tượng to), dưới là tên + mô tả.
// Thẻ LIVE Đấu Trường Nhí: phòng mở mọi lúc (ALWAYS_OPEN) nên thẻ luôn sáng, nhãn LIVE nhấp nháy, dòng trạng thái lấy từ phòng
// (startLiveClock). Tắt ALWAYS_OPEN thì quay về khung giờ 19:00–22:30 (thẻ dịu ngoài giờ, lớp .is-live-on chọn bản hiện).
const LIVE_FROM = 19 * 60, LIVE_TO = 22 * 60 + 30;
export function isLiveNow(d = new Date()) {
  if (import.meta.env.DEV && typeof window.__tthLive === 'boolean') return window.__tthLive; // scripts/home-dev.html ?live=1|0
  if (ALWAYS_OPEN) return true;   // Đấu Trường Nhí mở mọi lúc (dauTruong/rules.js), không còn khung giờ
  const m = d.getHours() * 60 + d.getMinutes();
  return m >= LIVE_FROM && m < LIVE_TO;
}
/**
 * Bật / tắt lớp is-live-on theo giờ, kiểm tra mỗi 30 giây tới khi trang chủ bị thay.
 * Có thẻ LIVE thì hỏi thêm phòng Đấu Trường của lớp mình (GET /status, 20 giây một lần): có bạn thật đang chơi một lượt
 * (playing + people > 0) thì thẻ hiện "Đang diễn ra, N bạn đang chơi" (lớp is-live-real), kể cả ngoài khung giờ.
 */
function startLiveClock(root) {
  if (!root) return;
  const grade = getProfileGrade();
  const url = root.querySelector('.hm-live') && grade >= 1 && grade <= 5 ? statusUrl(`arena-g${grade}${testRoom() ? '-test' : ''}`) : '';
  const realEl = root.querySelector('.hm-live .hm-when-real');
  let real = 0, waiting = 0;
  const paint = () => {
    // phòng cuốn chiếu (ALWAYS_OPEN): thẻ luôn sáng; chưa ai chơi thì mời "Đang chờ thêm bạn 2/4, 3/4" (rules.js waitFill)
    const open = real > 0 || (ALWAYS_OPEN && !!realEl);
    root.classList.toggle('is-live-real', open);
    root.classList.toggle('is-live-on', open || isLiveNow());
    if (realEl && open) {
      // số trong phòng: một phần nhỏ của "N người đang học" (liveCount.js roomNpc), luôn nhỏ hơn số ấy
      const lv = liveNow(), room = Math.min(lv.room + waiting, lv.learning - 1);
      realEl.textContent = real > 0 ? `🔴 Đang diễn ra, ${real} bạn đang chơi`
        : lv.night ? (waiting > 0 ? `🟢 ${waiting} bạn đang chờ trong phòng. Vào thi ngay!` : '🟢 Vào thi ngay lúc nào cũng được!')   // 23h30–8h: chỉ số thật
        : `🟢 ${room} bạn trong phòng, đang chờ thêm bạn ${waitFill(Date.now(), waiting)}/4. Vào tham gia ngay!`;
    }
  };
  const ask = () => url && fetch(url, { cache: 'no-store' }).then(r => r.json())
    .then(s => { real = s.playing && s.people > 0 ? s.people : 0; waiting = s.playing ? 0 : s.people || 0; if (root.isConnected) paint(); }, () => {});
  const tick = () => {
    if (!root.isConnected) { clearInterval(timer); clearInterval(poll); return; }
    paint();
  };
  const timer = setInterval(tick, 10000);
  const poll = url ? setInterval(ask, 20000) : 0;
  tick();
  ask();
}

// Thẻ `live: true` (Đấu Trường Nhí): tấm sân khấu to chiếm cả hàng đầu, chấm LIVE nhấp nháy, nút Vào thi.
function liveCard(grade, g) {
  return `
    <button type="button" class="hm-card hm-live" data-game="${g.id}" style="--card-color: ${g.color || grade.color}">
      <span class="hm-live-art" aria-hidden="true">${g.cover
        ? `<img src="${g.cover}" alt="" width="960" height="558" decoding="async">` // ảnh chụp trường quay 3D thật (scripts/.tmp/dt-cover.mjs)
        : thumbArt(g) || `<span class="hm-card-icon">${g.icon}</span>`}</span>
      <span class="hm-live-body">
        <span class="hm-live-badge hm-when-on"><i></i>LIVE</span>
        <span class="hm-live-badge is-soon hm-when-off">🌙 Mở lúc 19:00</span>
        <h3>${g.icon} ${g.title}</h3>
        <p>${g.desc}</p>
        <span class="hm-live-time"><span class="hm-when-on">🔴 Đang diễn ra tới 22:30</span><span class="hm-when-off">⏰ Mỗi tối từ 19:00 đến 22:30</span><span class="hm-when-real"></span></span>
        <span class="hm-live-go"><span class="hm-when-on">Vào thi ▶</span><span class="hm-when-off">Vào xem ▶</span></span>
      </span>
    </button>`;
}

function gameCards(grade, list) {
  return list.map((g, gIdx) => `
    <button type="button" class="hm-card" data-game="${g.id}" style="animation-delay: ${0.05 + gIdx * 0.04}s; --card-color: ${g.color || grade.color}">
      <span class="hm-card-art${thumbArt(g) ? ' has-art' : ''}" aria-hidden="true">${thumbArt(g) || `<span class="hm-card-icon">${g.icon}</span>`}</span>
      <span class="hm-card-body">
        <h3>${g.title}</h3>
        <p>${g.desc}</p>
        ${langTag(g.id)}
      </span>
    </button>
  `).join('');
}

/** Lưới thẻ chia đều hàng: số cột = ít nhất để vẫn vừa thẻ ≥ 260px, rồi chia đều số thẻ cho các hàng
 *  (3 thẻ trên máy rộng = 3 cột phủ kín hàng; 7 thẻ = 4 + 3, hàng ít thẻ giãn ra, không chừa ô trống bên phải). */
const CARD_MIN = 260;
function balanceGrid(grid) {
  if (!grid) return;
  const n = grid.children.length;
  const fit = () => {
    const w = grid.clientWidth;
    if (!w || !n) return;
    const gap = parseFloat(getComputedStyle(grid).columnGap) || 0;
    const maxCols = Math.max(1, Math.floor((w + gap) / (CARD_MIN + gap)));
    // Chia đều số thẻ cho các hàng (7 thẻ, tối đa 3 cột = 3 + 2 + 2, không 3 + 3 + 1); thẻ hàng ít hơn giãn ra
    // phủ kín hàng (--k = số thẻ trong hàng của thẻ đó). Tranh bìa giữ cùng chiều cao (--art-h) để các hàng đều nhau.
    const rows = Math.ceil(n / maxCols);
    const cols = Math.ceil(n / rows), extra = n % rows || rows;
    [...grid.children].forEach((c, i) => c.style.setProperty('--k', i < extra * cols ? cols : cols - 1));
    grid.style.setProperty('--art-h', `${((w - (cols - 1) * gap) / cols) * 9 / 16}px`);
    grid.classList.toggle('is-multi', cols > 1);
  };
  grid.classList.add('is-balanced');
  new ResizeObserver(fit).observe(grid);
  fit();
}

/** Trang của một nhóm thẻ (Challenge games, Tiếng Việt): các thẻ cùng nhóm của lớp đang học. */
export function renderHub(app, navigate, hubId) {
  const grade = getGrade(getProfileGrade());
  const h = HUBS[hubId];
  const games = (grade?.games || []).filter(g => g.group === hubId && visible(g));
  app.innerHTML = `
    <div class="home challenge-hub">
      <div class="lb-top">
        <button type="button" class="btn btn-ghost" id="challenge-back">← Trang chủ</button>
      </div>
      <div class="category animate-fadeIn">
        <h2 class="section-title">${h.icon} ${h.title}${grade ? `: ${grade.title}` : ''}</h2>
        <div class="hm-grid">${gameCards(grade, games)}</div>
      </div>
    </div>
  `;
  balanceGrid(app.querySelector('.hm-grid'));
  app.querySelector('#challenge-back').addEventListener('click', () => navigate('home'));
  app.querySelectorAll('.hm-card').forEach(card => {
    card.addEventListener('click', () => navigate(card.dataset.game));
  });
}

// Tab của trang chủ (thanh chip dưới tranh đầu trang). `go`: chip mở trang khác thay vì đổi nội dung.
const TAB_KEY = 'tth_home_tab';
function savedTab() { try { return localStorage.getItem(TAB_KEY) || 'learn'; } catch { return 'learn'; } }
function saveTab(id) { try { localStorage.setItem(TAB_KEY, id); } catch { /* storage unavailable */ } }
/** main.js: quay lại từ một trò trong nhóm → trang chủ mở sẵn tab của nhóm đó. */
export function openHomeTab(id) { saveTab(id); }

/** Thanh mục tràn: mép phía còn mục khuất mờ dần (như Kinh Thánh, lớp can-prev / can-next). */
function watchTabsEdge(wrap) {
  const bar = wrap?.querySelector('.hm-tabs');
  if (!bar) return;
  const paint = () => {
    wrap.classList.toggle('can-prev', bar.scrollLeft > 2);
    wrap.classList.toggle('can-next', bar.scrollLeft + bar.clientWidth < bar.scrollWidth - 2);
  };
  bar.addEventListener('scroll', paint, { passive: true });
  new ResizeObserver(paint).observe(bar);
  paint();
}

/** Dải nút dính đầu trang: trong suốt trên tranh, cuộn xuống thì thành tấm kính (một bộ nghe cho #app). */
function watchDock(app) {
  if (app._hmDock) return;
  app._hmDock = true;
  app.addEventListener('scroll', () => {
    const dock = app.querySelector('.hm > .user-bar-dock');
    if (dock) dock.classList.toggle('is-stuck', app.scrollTop > 24);
  }, { passive: true });
}

export function renderHome(app, navigate, { user, onSignOut, onSignIn } = {}) {
  const grade = getGrade(getProfileGrade());
  renderPage();

  function tabs(all) {
    const learn = all.filter(g => !g.group);
    const tv = all.filter(g => g.group === TIENGVIET_ID);
    const games = all.filter(g => g.group === CHALLENGE_ID);
    const spins = getSpinStatus().spins;
    return [
      { id: 'learn', icon: '🧮', label: 'Toán', cards: learn },
      tv.length && { id: TIENGVIET_ID, icon: '📚', label: 'Tiếng Việt', cards: tv },
      games.length && { id: CHALLENGE_ID, icon: '🎮', label: 'Trò chơi', cards: games, live: games.some(g => g.live) },
      { id: 'stats', icon: '📊', label: 'Kết quả' },
      { id: 'rank', icon: '🏆', label: 'Xếp hạng' },
      { id: 'sticker', icon: '🎁', label: 'Sticker', badge: spins || 0 },
    ].filter(Boolean);
  }

  function renderPage() {
    const all = (grade?.games || []).filter(visible);
    const list = tabs(all);
    let active = savedTab();
    if (!list.some(t => t.id === active && !t.go)) active = 'learn';
    const now = new Date();
    app.innerHTML = `
      <div class="home hm">
        ${userBar()}
        <header class="hm-hero">
          <div class="hm-hero-art" aria-hidden="true">${heroArt()}</div>
          <div class="hm-hero-text">
            <img class="hm-logo" src="/icons/icon-192.png" alt="" width="96" height="96">
            <div class="hm-hero-words">
              <h1>${grade ? grade.title : 'Toán Tiểu Học'}</h1>
              <p>Chào ${escapeHtml(displayName())}! 👋 <span class="hm-date">${WEEKDAYS[now.getDay()]}, ${ddmm(now)}</span></p>
            </div>
          </div>
          ${liveCountHtml()}
        </header>

        <main class="hm-main">
          <div class="hm-tabs-wrap">
          <nav class="hm-tabs" aria-label="Mục">
            ${list.map(t => `
              <button type="button" class="hm-tab${t.live ? ' has-live' : ''}" data-tab="${t.id}" ${t.go ? `data-go="${t.go}"` : `role="tab" aria-selected="${t.id === active}"`}>
                <span class="hm-tab-icon" aria-hidden="true">${t.icon}</span><span class="hm-tab-label">${t.label}</span>
                ${t.badge ? `<b class="hm-tab-badge">${t.badge}</b>` : ''}
                ${t.live ? '<b class="hm-tab-live hm-when-on"><i></i>LIVE</b>' : ''}
              </button>`).join('')}
          </nav>
          </div>

          <div class="hm-live-slot" id="hm-live-slot"></div>
          ${quickRow()}
          ${installPrompt() || reviewPrompt()}

          <section class="hm-panel" id="hm-panel" role="tabpanel"></section>
        </main>
      </div>
    `;

    bindUserBar();
    bindDailyPanel();
    bindReviewPrompt();
    bindInstallPrompt();
    watchDock(app);
    startLiveClock(app.querySelector('.hm'));
    watchTabsEdge(app.querySelector('.hm-tabs-wrap'));
    startLiveCount(app.querySelector('#home-live'));
    app.querySelector('#home-grade-change').addEventListener('click', () => navigate('profile'));
    app.querySelectorAll('.hm-tab').forEach(btn => btn.addEventListener('click', () => {
      if (btn.dataset.go) { navigate(btn.dataset.go); return; }
      saveTab(btn.dataset.tab);
      showTab(btn.dataset.tab);
    }));
    showTab(active);

    function showTab(id) {
      app.querySelectorAll('.hm-tab[role="tab"]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === id)));
      const panel = app.querySelector('#hm-panel');
      panel.dataset.tab = id;
      app.querySelector('#hm-live-slot').innerHTML = '';
      // Thanh mục vuốt ngang: kéo mục vừa chọn vào tầm nhìn
      const tabBtn = app.querySelector(`.hm-tab[data-tab="${id}"]`), bar = tabBtn?.parentElement;
      if (bar) requestAnimationFrame(() => {
        const b = bar.getBoundingClientRect(), t = tabBtn.getBoundingClientRect();
        if (t.left < b.left) bar.scrollLeft -= b.left - t.left + 8;
        else if (t.right > b.right) bar.scrollLeft += t.right - b.right + 8;
      });
      // Dải sticker ở hàng nhanh trùng với mục Sticker: ẩn khi đang mở mục này
      const stkBanner = app.querySelector('#stk-banner');
      if (stkBanner) stkBanner.hidden = id === 'sticker';
      if (id === 'sticker') {
        // Vòng quay + bộ sưu tập ngay dưới thanh mục (không mở trang riêng)
        panel.innerHTML = '<div class="lb-loading" role="status"><div class="page-loading-spinner"></div></div>';
        import('./stickers.js').then(mod => {
          if (panel.dataset.tab !== 'sticker' || !panel.isConnected) return;
          // Hết lượt quay: nút "Làm bài để có lượt quay" mở mục Toán
          mod.render(panel, () => { saveTab('learn'); showTab('learn'); }, { embedded: true });
        });
        return;
      }
      if (id === 'rank') {
        // Bảng xếp hạng ngay dưới thanh mục như các mục khác (không mở trang riêng)
        panel.innerHTML = '<div class="lb-loading" role="status"><div class="page-loading-spinner"></div></div>';
        import('./leaderboard.js').then(mod => {
          if (panel.dataset.tab !== 'rank' || !panel.isConnected) return;
          mod.render(panel, null, {
            embedded: true,
            onEditProfile: () => navigate('profile'),
            onOpenGame: (id) => navigate(id),
            onSignIn: user?.guest ? onSignIn : null,
          });
        });
        return;
      }
      if (id === 'stats') {
        panel.innerHTML = statsPanel();
        bindChart();
        return;
      }
      // Thẻ LIVE của tab Trò chơi: lên đầu, ngay dưới thanh mục (trên hàng Học tiếp / sticker)
      const all = list.find(t => t.id === id).cards;
      const lives = all.filter(g => g.live);
      const slot = app.querySelector('#hm-live-slot');
      slot.innerHTML = lives.map(g => liveCard(grade, g)).join('');
      slot.querySelectorAll('.hm-live').forEach(card => card.addEventListener('click', () => navigate(card.dataset.game)));
      const cards = all.filter(g => !g.live);
      panel.innerHTML = cards.length
        ? `<div class="hm-grid">${gameCards(grade, cards)}</div>`
        : '<p class="daily-message">Bài tập của lớp này sắp ra mắt. Hẹn gặp lại bé nhé! 🚀</p>';
      balanceGrid(panel.querySelector('.hm-grid'));
      panel.querySelectorAll('.hm-card').forEach(card => {
        card.addEventListener('click', () => navigate(card.dataset.game));
      });
    }
  }

  // ── Hàng nhanh dưới thanh mục: "Học tiếp" bài đang làm + sticker (+ dải nhắc lưu khi chưa lưu được) ──
  // Đặt trên danh sách sách để trên điện thoại/iPad bé vào bài ngay, không phải cuộn.
  function quickRow() {
    const last = findGame(grade, getLastGame());
    return `
      <div class="hm-quick">
        ${user && !user.guest ? '<button type="button" class="stk-banner cloud-banner" id="cloud-banner" hidden></button>' : ''}
        ${last ? `<button type="button" class="hm-continue" id="daily-continue" data-game="${last.id}" style="--card-color: ${last.color || grade.color}">
          <span class="hm-continue-icon" aria-hidden="true">${last.icon}</span>
          <span class="hm-continue-text"><small>Học tiếp</small><strong>${escapeHtml(last.title)}</strong></span>
        </button>` : ''}
        ${stickerPanel()}
      </div>`;
  }

  // ── Dải nhắc cài app (đã bấm "Bỏ qua, học trên web" ở màn cài) ─────
  function installPrompt() {
    if (!shouldNudgeInstall()) return '';
    return `
      <section class="rv-prompt install-prompt" id="install-prompt" aria-label="Cài ứng dụng lên máy">
        <img class="install-prompt-icon" src="/icons/icon-192.png" alt="" width="44" height="44">
        <p class="rv-prompt-text"><strong>Cài app lên màn hình chính</strong> để bé mở bằng một chạm, toàn màn hình.</p>
        <button type="button" class="install-prompt-btn" id="install-prompt-btn">📲 Cài app</button>
        <button type="button" class="rv-prompt-later" id="install-prompt-later">Để sau</button>
      </section>`;
  }

  function bindInstallPrompt() {
    const box = app.querySelector('#install-prompt');
    if (!box) return;
    box.querySelector('#install-prompt-btn').addEventListener('click', () => promptInstall());
    box.querySelector('#install-prompt-later').addEventListener('click', () => { snoozeInstallNudge(); box.remove(); });
  }

  // ── Dải mời phụ huynh đánh giá (mục trong menu tài khoản ít ai thấy) ─────
  function reviewPrompt() {
    if (!user || user.guest || !shouldPromptReview()) return '';
    return `
      <section class="rv-prompt" id="rv-prompt" aria-label="Mời đánh giá ứng dụng">
        <span class="rv-prompt-icon" aria-hidden="true">👨‍👩‍👧</span>
        <p class="rv-prompt-text"><strong>Ba mẹ ơi,</strong> ứng dụng có giúp bé học tốt hơn không?</p>
        <div class="rv-prompt-stars" role="group" aria-label="Chọn số sao để đánh giá">
          ${[1, 2, 3, 4, 5].map(s => `<button type="button" class="rv-prompt-star" data-s="${s}" aria-label="${s} sao">★</button>`).join('')}
        </div>
        <button type="button" class="rv-prompt-later" id="rv-prompt-later">Để sau</button>
      </section>`;
  }

  function bindReviewPrompt() {
    const box = app.querySelector('#rv-prompt');
    if (!box) return;
    const stars = [...box.querySelectorAll('.rv-prompt-star')];
    const paint = (n) => stars.forEach((b, i) => b.classList.toggle('is-on', i < n));
    stars.forEach((b) => {
      const s = Number(b.dataset.s);
      b.addEventListener('pointerenter', () => paint(s));
      b.addEventListener('pointerleave', () => paint(0));
      b.addEventListener('click', () => { setPendingRating(s); navigate('reviews'); });
    });
    box.querySelector('#rv-prompt-later').addEventListener('click', () => { snoozeReviewPrompt(); box.remove(); });
  }

  // ── Bảng theo dõi học hằng ngày ─────────────────────────────────────────
  function statsPanel() {
    const { today, streak, last7 } = getDashboard();
    const goalPct = Math.min(100, Math.round((today.stars / DAILY_GOAL_STARS) * 100));
    const goalDone = today.stars >= DAILY_GOAL_STARS;
    const accuracy = today.attempts ? Math.round((today.correct / today.attempts) * 100) : null;

    const message = goalDone
      ? '🎉 Em đã hoàn thành mục tiêu hôm nay. Giỏi quá!'
      : today.solved === 0
        ? 'Hôm nay em chưa làm bài nào. Bắt đầu thôi nào! 💪'
        : `Còn ${DAILY_GOAL_STARS - today.stars} ⭐ nữa là đạt mục tiêu hôm nay!`;

    // Cột: chung một thang, tối thiểu bằng mục tiêu để đường mục tiêu luôn nằm trong khung.
    const scaleMax = Math.max(DAILY_GOAL_STARS, ...last7.map(d => d.stars));
    const goalBottom = (DAILY_GOAL_STARS / scaleMax) * 100;
    const bars = last7.map((d, i) => {
      const isToday = i === last7.length - 1;
      const h = d.stars ? Math.max(4, (d.stars / scaleMax) * 100) : 0;
      const tip = `${WEEKDAYS[d.date.getDay()]} ${ddmm(d.date)}: ${d.stars} ⭐ · ${d.solved} bài đúng`;
      return `
        <div class="dchart-col${isToday ? ' dchart-today' : ''}" data-tip="${escapeHtml(tip)}" tabindex="0" aria-label="${escapeHtml(tip)}">
          <div class="dchart-track">
            ${isToday && d.stars ? `<span class="dchart-value" style="bottom:${h}%">${d.stars}</span>` : ''}
            <div class="dchart-bar" style="height:${h}%"></div>
          </div>
          <span class="dchart-day">${isToday ? 'Hôm nay' : WEEKDAYS_SHORT[d.date.getDay()]}</span>
        </div>`;
    }).join('');

    return `
      <section class="daily hm-stats" aria-label="Kết quả học tập">

        <div class="dashboard-stats">
          <div class="stat-card stat-streak">
            <div class="stat-icon-wrap">🔥</div>
            <div class="stat-info">
              <div class="stat-number">${streak} ngày</div>
              <div class="stat-label">Học liên tiếp</div>
            </div>
          </div>
          <div class="stat-card stat-stars">
            <div class="stat-icon-wrap">⭐</div>
            <div class="stat-info">
              <div class="stat-number">${today.stars}<span class="stat-of">/${DAILY_GOAL_STARS}</span></div>
              <div class="stat-label">Sao hôm nay</div>
              <div class="goal-track" role="progressbar" aria-valuemin="0" aria-valuemax="${DAILY_GOAL_STARS}" aria-valuenow="${today.stars}" aria-label="Mục tiêu sao hôm nay">
                <div class="goal-fill${goalDone ? ' goal-done' : ''}" style="width:${goalPct}%"></div>
              </div>
            </div>
          </div>
          <div class="stat-card stat-plays">
            <div class="stat-icon-wrap">✅</div>
            <div class="stat-info">
              <div class="stat-number">${today.solved}</div>
              <div class="stat-label">Bài giải đúng hôm nay</div>
            </div>
          </div>
          <div class="stat-card stat-accuracy">
            <div class="stat-icon-wrap">🎯</div>
            <div class="stat-info">
              <div class="stat-number">${accuracy === null ? '—' : `${accuracy}%`}</div>
              <div class="stat-label">Trả lời đúng hôm nay</div>
            </div>
          </div>
        </div>

        <p class="daily-message">${message}</p>

        <div class="dchart">
          <div class="dchart-head">
            <h3>Sao nhận được 7 ngày qua</h3>
            <span class="dchart-total">Tổng cộng: ⭐ ${getTotalStars()}</span>
          </div>
          <div class="dchart-plot">
            <div class="dchart-goal" style="bottom:calc(24px + (100% - 42px) * ${(goalBottom / 100).toFixed(3)})"><span>Mục tiêu ${DAILY_GOAL_STARS} ⭐</span></div>
            ${bars}
          </div>
          <div class="dchart-tip" id="dchart-tip" hidden></div>
        </div>
      </section>
    `;
  }

  // ── Sticker phần thưởng: N bài → 1 lượt quay ───────────────────────────
  function stickerPanel() {
    const { spins, progress, need } = getSpinStatus();
    const total = getSets().reduce((n, s) => n + s.stickers.length, 0);
    const dots = Array.from({ length: need }, (_, i) => `<span class="stk-dot${i < progress ? ' is-on' : ''}"></span>`).join('');
    return `
      <button type="button" class="stk-banner${spins ? ' has-spins' : ''}" id="stk-banner">
        <span class="stk-banner-icon">${spins ? '🎡' : '🎁'}</span>
        <span class="stk-banner-text">
          <strong>${spins ? `Em có ${spins} lượt quay sticker!` : `Còn ${need - progress} bài nữa là được 1 lượt quay sticker`}</strong>
          <span class="stk-banner-sub">${spins ? 'Bấm để quay và nhận sticker nhé' : `<span class="stk-dots">${dots}</span> ${progress}/${need} bài`} · Bộ sưu tập ${countOwned()}/${total}</span>
        </span>
        <span class="stk-banner-go">${spins ? 'Quay ngay ➜' : 'Xem sticker ➜'}</span>
      </button>`;
  }

  function bindDailyPanel() {
    // Dải sticker → mở mục Sticker ngay trên trang chủ
    app.querySelector('#stk-banner')?.addEventListener('click', () => app.querySelector('.hm-tab[data-tab="sticker"]')?.click());
    const cloudBanner = app.querySelector('#cloud-banner');
    if (cloudBanner) {
      paintCloudBanner(cloudBanner);
      // Gọi ngay trong click (như nút ☁️): mở trang Google xin quyền.
      cloudBanner.addEventListener('click', () => { syncNow({ interactive: true }); });
    }
    app.querySelector('#daily-continue')?.addEventListener('click', (e) => navigate(e.currentTarget.dataset.game));
  }

  function bindChart() {
    // Tooltip cho từng cột (chuột: rê vào; iPad: chạm).
    const chart = app.querySelector('.dchart');
    const tip = app.querySelector('#dchart-tip');
    if (!chart || !tip) return;
    const show = (col) => {
      tip.textContent = col.dataset.tip;
      tip.hidden = false;
      const cr = chart.getBoundingClientRect(), r = col.getBoundingClientRect();
      const x = Math.min(Math.max(r.left + r.width / 2 - cr.left, 80), cr.width - 80);
      tip.style.left = `${x}px`;
      chart.querySelectorAll('.dchart-col').forEach(c => c.classList.toggle('dchart-active', c === col));
    };
    const hide = () => {
      tip.hidden = true;
      chart.querySelectorAll('.dchart-active').forEach(c => c.classList.remove('dchart-active'));
    };
    chart.querySelectorAll('.dchart-col').forEach(col => {
      col.addEventListener('pointerenter', () => show(col));
      col.addEventListener('pointerdown', () => show(col));
      col.addEventListener('focus', () => show(col));
      col.addEventListener('blur', hide);
    });
    chart.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') hide(); });
  }

  function userBar() {
    if (!user) return '';
    const name = displayName();
    const initial = `<span class="user-avatar user-avatar-fallback">${escapeHtml(name.charAt(0).toUpperCase())}</span>`;
    // Ưu tiên avatar bé đã chọn; chưa chọn thì dùng ảnh Google, ảnh lỗi thì chữ cái đầu.
    const chosen = avatarUrl(getProfile().avatar);
    const avatar = chosen
      ? `<img class="user-avatar user-avatar-kid" src="${chosen}" alt="">`
      : user.picture
        ? `<img class="user-avatar" src="${escapeHtml(user.picture)}" alt="" referrerpolicy="no-referrer" onerror="this.outerHTML=this.dataset.fallback" data-fallback="${escapeHtml(initial)}">`
        : initial;
    const guest = !!user.guest;
    // Thanh nút điều hướng: dải dính ở mép trên khi cuộn (home.css .user-bar-dock).
    return `
      <div class="user-bar-dock">
      <div class="user-bar animate-fadeIn">
        <button type="button" class="hm-grade-change" id="home-grade-change">🔄 Đổi lớp</button>
        ${guest
          ? '<button type="button" class="user-cloud-btn is-warn" id="user-login-btn" title="Đăng nhập Google để lưu bài làm vào tài khoản">🔐<span>Đăng nhập</span></button>'
          : '<button type="button" class="user-cloud-btn" id="user-cloud-btn"></button>'}
        ${langButton()}
        <span class="user-stars" title="Số sao đã nhận ở lớp đang học"><span class="user-stars-icon">⭐</span><span class="user-stars-count">${headerStars()}</span></span>
        <div class="user-menu-wrap">
          <button type="button" class="user-menu-btn" id="user-menu-btn" aria-haspopup="menu" aria-expanded="false">
            ${avatar}
            <span class="user-name">${escapeHtml(name)}</span>
            <span class="user-caret">▾</span>
          </button>
          <div class="user-menu" id="user-menu" role="menu" hidden>
            <div class="user-menu-head">
              <strong>${escapeHtml(name)}</strong>
              <span>${guest ? 'Đang dùng thử, bài làm chỉ lưu trên máy này' : escapeHtml(user.email)}</span>
            </div>
            <button type="button" class="user-menu-item user-menu-edit" id="user-edit-profile" role="menuitem">✏️ Đổi lớp, avatar và biệt danh</button>
            <button type="button" class="user-menu-item" id="user-kmap" role="menuitem">🗺️ Bản đồ kiến thức của bé</button>
            ${canOfferInstall() ? '<button type="button" class="user-menu-item" id="user-install" role="menuitem">📲 Cài ứng dụng lên máy</button>' : ''}
            ${guest ? `
            <button type="button" class="user-menu-item" id="user-signin" role="menuitem">🔐 Đăng nhập Google để lưu bài làm</button>` : `
            <button type="button" class="user-menu-item" id="user-reviews" role="menuitem">⭐ Đánh giá ứng dụng</button>
            ${isAdminUser() ? '<button type="button" class="user-menu-item" id="user-admin" role="menuitem">📊 Trang quản lý</button>' : ''}
            <button type="button" class="user-menu-item" id="user-signout" role="menuitem">🚪 Đăng xuất</button>`}
          </div>
        </div>
      </div>
      </div>
    `;
  }

  // Nút đổi ngôn ngữ: ghi ngôn ngữ sẽ chuyển sang (cờ emoji trên Windows hiện thành chữ "VN" nên dùng 🌐).
  function langButton() {
    const next = LANGS.find(l => l.id !== getLang());
    return `<button type="button" class="user-rank-btn user-lang-btn" id="user-lang-btn" data-no-i18n data-lang="${next.id}" title="${next.id === 'en' ? 'Học Toán bằng tiếng Anh' : 'Học bằng tiếng Việt'}" aria-label="${next.label}">🌐 <span>${next.short}</span></button>`;
  }

  function bindUserBar() {
    app.querySelector('#user-lang-btn')?.addEventListener('click', (e) => setLang(e.currentTarget.dataset.lang));
    const btn = app.querySelector('#user-menu-btn');
    const menu = app.querySelector('#user-menu');
    if (!btn || !menu) return;
    const setOpen = (open) => {
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      if (open) document.addEventListener('click', onOutside, true);
      else document.removeEventListener('click', onOutside, true);
    };
    const onOutside = (e) => { if (!e.target.closest('.user-menu-wrap')) setOpen(false); };
    btn.addEventListener('click', () => setOpen(menu.hidden));
    app.querySelector('#user-edit-profile').addEventListener('click', () => { setOpen(false); navigate('profile'); });
    app.querySelector('#user-kmap').addEventListener('click', () => { setOpen(false); navigate('knowledge-map'); });
    app.querySelector('#user-install')?.addEventListener('click', () => { setOpen(false); promptInstall(); });
    app.querySelector('#user-reviews')?.addEventListener('click', () => { setOpen(false); navigate('reviews'); });
    app.querySelector('#user-admin')?.addEventListener('click', () => { setOpen(false); location.hash = 'admin'; });
    app.querySelector('#user-signout')?.addEventListener('click', () => { setOpen(false); openSignOutDialog(); });
    app.querySelector('#user-signin')?.addEventListener('click', () => { setOpen(false); onSignIn?.(); });
    app.querySelector('#user-login-btn')?.addEventListener('click', () => onSignIn?.());
    const cloudBtn = app.querySelector('#user-cloud-btn');
    if (cloudBtn) {
      paintCloudButton(cloudBtn);
      // Gọi ngay trong click: token hết hạn thì mở popup Google xin lại (Safari iPad chặn nếu trễ).
      cloudBtn.addEventListener('click', () => { syncNow({ interactive: true }); });
    }
  }

  function openSignOutDialog() {
    const overlay = document.createElement('div');
    overlay.className = 'app-dialog-overlay';
    overlay.innerHTML = `
      <div class="app-dialog" role="dialog" aria-modal="true" aria-labelledby="signout-title">
        <div class="app-dialog-icon">👋</div>
        <h2 id="signout-title">Đăng xuất?</h2>
        <p>Bạn có chắc muốn đăng xuất khỏi <strong>${escapeHtml(user.email)}</strong>?</p>
        <div class="app-dialog-actions">
          <button type="button" class="btn btn-ghost" data-act="cancel">Ở lại</button>
          <button type="button" class="btn btn-primary" data-act="ok">Đăng xuất</button>
        </div>
      </div>
    `;
    const close = () => {
      document.removeEventListener('keydown', onKey);
      overlay.remove();
    };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('[data-act="cancel"]')) close();
      else if (e.target.closest('[data-act="ok"]')) { close(); onSignOut?.(); }
    });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(overlay);
    overlay.querySelector('[data-act="cancel"]').focus();
  }
}
