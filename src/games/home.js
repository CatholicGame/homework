/**
 * Home Page — Grade Picker (Lớp 1–5)
 */

import { getTotalStars } from '../engine/stars.js';

const GRADES = [
  { id: 'grade-1', title: 'Lớp 1', icon: '1️⃣', color: '#FF6B9D', games: [] },
  { id: 'grade-2', title: 'Lớp 2', icon: '2️⃣', color: '#60A5FA', games: [] },
  {
    id: 'grade-3', title: 'Lớp 3', icon: '3️⃣', color: '#34D399',
    games: [
      { id: 'grade3-exam', icon: '📝', title: 'Ôn Luyện Đề', desc: 'Đề 1 — Bộ đề ôn luyện VioEdu khối 3' },
      { id: 'grade3-workbook', icon: '📗', title: 'Vở Bài Tập Toán 3', desc: 'Tập Một — Kết nối tri thức với cuộc sống' },
      { id: 'grade3-practice', icon: '📘', title: 'Luyện Tập Toán 3', desc: 'Tập Một — Luyện tập theo tuần (Kết nối tri thức)' },
    ],
  },
  { id: 'grade-4', title: 'Lớp 4', icon: '4️⃣', color: '#C084FC', games: [] },
  { id: 'grade-5', title: 'Lớp 5', icon: '5️⃣', color: '#FBBF24', games: [] },
];

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export function renderHome(app, navigate, { user, onSignOut } = {}) {
  renderGradeGrid();

  function renderGradeGrid() {
    app.innerHTML = `
      <div class="home">
        ${userBar()}
        <div class="dashboard animate-fadeIn">
          <div class="dashboard-header">
            <h1>🎓 Toán Tiểu Học</h1>
            <p>Chọn lớp học để bắt đầu 🚀</p>
          </div>
        </div>

        <div class="category animate-fadeIn" style="animation-delay: 0.1s">
          <div class="game-grid">
            ${GRADES.map((grade, idx) => {
              const hasGames = grade.games.length > 0;
              return `
                <div class="game-card ${hasGames ? '' : 'grade-card-empty'}" data-grade="${grade.id}" style="animation-delay: ${0.15 + idx * 0.05}s; --card-color: ${grade.color}">
                  <div class="card-top-bar" style="background: ${grade.color}"></div>
                  <span class="card-icon">${grade.icon}</span>
                  <h3>${grade.title}</h3>
                  <div class="card-progress">
                    <div class="card-new-badge">${hasGames ? `${grade.games.length} trò chơi` : '🚧 Sắp ra mắt'}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    bindUserBar();
    app.querySelectorAll('.game-card:not(.grade-card-empty)').forEach(card => {
      card.addEventListener('click', () => {
        const grade = GRADES.find(g => g.id === card.dataset.grade);
        if (grade) renderGradeGames(grade);
      });
    });
  }

  function userBar() {
    if (!user) return '';
    const initial = `<span class="user-avatar user-avatar-fallback">${escapeHtml((user.name || '?').charAt(0).toUpperCase())}</span>`;
    // Ảnh Google lỗi/không tải được → thay bằng chữ cái đầu của tên.
    const avatar = user.picture
      ? `<img class="user-avatar" src="${escapeHtml(user.picture)}" alt="" referrerpolicy="no-referrer" onerror="this.outerHTML=this.dataset.fallback" data-fallback="${escapeHtml(initial)}">`
      : initial;
    return `
      <div class="user-bar animate-fadeIn">
        <span class="user-stars" title="Tổng số sao đã nhận">⭐ ${getTotalStars()}</span>
        <div class="user-menu-wrap">
          <button type="button" class="user-menu-btn" id="user-menu-btn" aria-haspopup="menu" aria-expanded="false">
            ${avatar}
            <span class="user-name">${escapeHtml(user.name)}</span>
            <span class="user-caret">▾</span>
          </button>
          <div class="user-menu" id="user-menu" role="menu" hidden>
            <div class="user-menu-head">
              <strong>${escapeHtml(user.name)}</strong>
              <span>${escapeHtml(user.email)}</span>
            </div>
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
    btn.addEventListener('click', () => setOpen(menu.hidden));
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

  function renderGradeGames(grade) {
    app.innerHTML = `
      <div class="home">
        ${userBar()}
        <div class="dashboard animate-fadeIn">
          <div class="dashboard-header">
            <h1>${grade.icon} ${grade.title}</h1>
            <p>Chọn một trò chơi để bắt đầu luyện tập nào! 🚀</p>
          </div>
        </div>

        <div class="category animate-fadeIn" style="animation-delay: 0.1s">
          <div class="game-grid">
            ${grade.games.map((g, gIdx) => `
              <div class="game-card" data-game="${g.id}" style="animation-delay: ${0.15 + gIdx * 0.05}s; --card-color: ${grade.color}">
                <div class="card-top-bar" style="background: ${grade.color}"></div>
                <span class="card-icon">${g.icon}</span>
                <h3>${g.title}</h3>
                <p>${g.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="max-width:1100px;margin:0 auto;">
          <button class="btn btn-ghost" id="back-to-grades">← Chọn lớp khác</button>
        </div>
      </div>
    `;

    bindUserBar();
    app.querySelectorAll('.game-card').forEach(card => {
      card.addEventListener('click', () => navigate(card.dataset.game));
    });
    app.querySelector('#back-to-grades').addEventListener('click', renderGradeGrid);
  }
}
