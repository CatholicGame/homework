/**
 * Home Page — bảng theo dõi + các sách/trò chơi của lớp bé đã chọn trong hồ sơ.
 */

import { getTotalStars } from '../engine/stars.js';
import { getDashboard, getLastGame, DAILY_GOAL_STARS } from '../engine/activity.js';
import { getProfile, getProfileGrade, avatarUrl, displayName } from '../engine/profile.js';
import { getGrade } from '../data/grades.js';
import { getSpinStatus, countOwned, getSets } from '../engine/stickers.js';
import { isAdminUser } from '../engine/admin.js';

const WEEKDAYS = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
const WEEKDAYS_SHORT = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const ddmm = (d) => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;

/** Trò chơi trong lớp đang học (không gợi ý "Tiếp tục" sang sách của lớp khác). */
function findGame(grade, gameId) {
  return grade?.games.find(x => x.id === gameId) || null;
}

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export function renderHome(app, navigate, { user, onSignOut } = {}) {
  const grade = getGrade(getProfileGrade());
  renderPage();

  function renderPage() {
    const games = grade?.games || [];
    app.innerHTML = `
      <div class="home">
        ${userBar()}
        <div class="dashboard dashboard-top animate-fadeIn">
          <div class="dashboard-header">
            <h1>🎓 Toán Tiểu Học</h1>
          </div>
          ${greetingPanel()}
        </div>

        <div class="category animate-fadeIn" style="animation-delay: 0.1s">
          <div class="home-grade-head">
            <h2 class="section-title">📚 ${grade ? `${grade.title} — chọn bài để học` : 'Chọn bài để học'}</h2>
            <button type="button" class="home-grade-change" id="home-grade-change">🔄 Đổi lớp</button>
          </div>
          ${games.length ? `
          <div class="game-grid">
            ${games.map((g, gIdx) => `
              <button type="button" class="game-card" data-game="${g.id}" style="animation-delay: ${0.15 + gIdx * 0.05}s; --card-color: ${g.color || grade.color}">
                <span class="card-icon">${g.icon}</span>
                <span class="card-text">
                  <h3>${g.title}</h3>
                  <p>${g.desc}</p>
                </span>
                <span class="card-go">Vào học ➜</span>
              </button>
            `).join('')}
          </div>` : '<p class="daily-message">Bài tập của lớp này sắp ra mắt. Hẹn gặp lại bé nhé! 🚀</p>'}
        </div>

        <div class="dashboard animate-fadeIn" style="animation-delay: 0.2s">
          ${statsPanel()}
        </div>
      </div>
    `;

    bindUserBar();
    bindDailyPanel();
    app.querySelector('#home-grade-change').addEventListener('click', () => navigate('profile'));
    app.querySelectorAll('.game-card').forEach(card => {
      card.addEventListener('click', () => navigate(card.dataset.game));
    });
  }

  // ── Đầu trang: lời chào, nút "Tiếp tục", tiến độ sticker ─────────────────
  // Đặt trước danh sách sách để trên điện thoại/iPad bé vào bài ngay, không phải cuộn.
  function greetingPanel() {
    const now = new Date();
    const firstName = escapeHtml(displayName());
    const last = findGame(grade, getLastGame());
    return `
      <section class="daily daily-greet" aria-label="Lời chào">
        <div class="daily-head">
          <div>
            <h2 class="daily-hello">Chào ${firstName}! 👋</h2>
            <p class="daily-date">${WEEKDAYS[now.getDay()]}, ${ddmm(now)}/${now.getFullYear()}</p>
          </div>
          ${last ? `<button type="button" class="daily-continue" id="daily-continue" data-game="${last.id}">▶ Tiếp tục: <strong>${escapeHtml(last.title)}</strong></button>` : ''}
        </div>
        ${stickerPanel()}
      </section>
    `;
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
        ? 'Hôm nay em chưa làm bài nào — bắt đầu thôi nào! 💪'
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
      <section class="daily" aria-label="Theo dõi học hằng ngày">
        <h2 class="section-title daily-stats-title">📊 Kết quả học tập</h2>

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

  // ── Sticker phần thưởng: 5 bài → 1 lượt quay ───────────────────────────
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
    app.querySelector('#stk-banner')?.addEventListener('click', () => navigate('stickers'));
    app.querySelector('#daily-continue')?.addEventListener('click', (e) => navigate(e.currentTarget.dataset.game));

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
    return `
      <div class="user-bar animate-fadeIn">
        <button type="button" class="user-rank-btn" id="user-sticker-btn" title="Vòng quay sticker">🎁 <span>Sticker</span>${getSpinStatus().spins ? `<b class="user-badge">${getSpinStatus().spins}</b>` : ''}</button>
        <button type="button" class="user-rank-btn" id="user-rank-btn" title="Bảng xếp hạng">🏆 <span>Xếp hạng</span></button>
        <span class="user-stars" title="Tổng số sao đã nhận"><span class="user-stars-icon">⭐</span>${getTotalStars()}</span>
        <div class="user-menu-wrap">
          <button type="button" class="user-menu-btn" id="user-menu-btn" aria-haspopup="menu" aria-expanded="false">
            ${avatar}
            <span class="user-name">${escapeHtml(name)}</span>
            <span class="user-caret">▾</span>
          </button>
          <div class="user-menu" id="user-menu" role="menu" hidden>
            <div class="user-menu-head">
              <strong>${escapeHtml(name)}</strong>
              <span>${escapeHtml(user.email)}</span>
            </div>
            <button type="button" class="user-menu-item user-menu-edit" id="user-edit-profile" role="menuitem">✏️ Đổi lớp, avatar và biệt danh</button>
            ${isAdminUser() ? '<button type="button" class="user-menu-item" id="user-admin" role="menuitem">📊 Quản lý học sinh</button>' : ''}
            <button type="button" class="user-menu-item" id="user-signout" role="menuitem">🚪 Đăng xuất</button>
          </div>
        </div>
      </div>
    `;
  }

  function bindUserBar() {
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
    app.querySelector('#user-rank-btn').addEventListener('click', () => navigate('leaderboard'));
    app.querySelector('#user-sticker-btn').addEventListener('click', () => navigate('stickers'));
    btn.addEventListener('click', () => setOpen(menu.hidden));
    app.querySelector('#user-edit-profile').addEventListener('click', () => { setOpen(false); navigate('profile'); });
    app.querySelector('#user-admin')?.addEventListener('click', () => { setOpen(false); location.hash = 'admin'; });
    app.querySelector('#user-signout').addEventListener('click', () => { setOpen(false); openSignOutDialog(); });
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
