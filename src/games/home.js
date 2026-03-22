/**
 * Home Page — Dashboard + Category Grid with Progress
 */
import { getAllProgress, getDashboardStats, getExamHistory } from '../engine/progressTracker.js';

const CATEGORIES = [
  {
    id: 'basic-ops',
    title: 'Phép Tính Cơ Bản',
    icon: '🔢',
    color: '#FF6B9D',
    games: [
      { id: 'flower-wheel', icon: '🌸', title: 'Hoa Cánh Nhân Chia', desc: 'Bảng nhân & chia trên hoa cánh' },
      { id: 'fill-table', icon: '📊', title: 'Điền Bảng', desc: 'Thừa số, tích, số bị chia, thương' },
      { id: 'quick-calc', icon: '⚡', title: 'Tính Nhẩm Nhanh', desc: 'Đường đua tính nhẩm có bấm giờ' },
      { id: 'compare-op', icon: '⚖️', title: 'So Sánh', desc: 'Điền dấu >, <, = vào ô trống' },
    ],
  },
  {
    id: 'geometry',
    title: 'Hình Học & Dãy Số',
    icon: '📐',
    color: '#60A5FA',
    games: [
      { id: 'shape-sorter', icon: '🔷', title: 'Phân Loại Hình 3D', desc: 'Phân loại hình khối 3D kéo thả' },
      { id: 'number-sequence', icon: '🔢', title: 'Dãy Số', desc: 'Tìm số còn thiếu trong dãy số' },
      { id: 'path-maze', icon: '🗺️', title: 'Mê Cung Toán', desc: 'Giải phép tính để mở đường' },
    ],
  },
  {
    id: 'thinking',
    title: 'Tư Duy & Ứng Dụng',
    icon: '🧠',
    color: '#C084FC',
    games: [
      { id: 'drag-match', icon: '🔗', title: 'Kéo Thả Nối', desc: 'Nối phép tính với kết quả' },
      { id: 'word-problem', icon: '📝', title: 'Toán Đố', desc: 'Lập phép tính & kéo thả chia nhóm' },
      { id: 'number-thinker', icon: '🧠', title: 'Tư Duy Số', desc: 'Phân tích & tìm số theo mô tả' },
    ],
  },
];

function getAllGames() {
  return CATEGORIES.flatMap(c => c.games);
}

export function renderHome(app, navigate) {
  const progress = getAllProgress();
  const stats = getDashboardStats();
  const allGames = getAllGames();
  const totalGames = allGames.length;

  const examHistory = getExamHistory();
  const bestExam = examHistory.length > 0
    ? examHistory.reduce((best, e) => e.score > best.score ? e : best, examHistory[0])
    : null;

  // Find suggested game (unplayed or lowest score)
  let suggestedGame = allGames.find(g => !progress[g.id]);
  if (!suggestedGame) {
    suggestedGame = allGames.reduce((lowest, g) => {
      const p = progress[g.id];
      const lp = progress[lowest.id];
      if (!p) return g;
      if (!lp) return lowest;
      return p.bestScore < lp.bestScore ? g : lowest;
    }, allGames[0]);
  }

  app.innerHTML = `
    <div class="home">
      <!-- Dashboard -->
      <div class="dashboard animate-fadeIn">
        <div class="dashboard-header">
          <h1>🎓 Toán Lớp 2 — Trò Chơi Tương Tác</h1>
          <p>Chọn một trò chơi để bắt đầu luyện tập nào! 🚀</p>
        </div>
        <div class="dashboard-stats">
          <div class="stat-card stat-stars">
            <div class="stat-icon-wrap">⭐</div>
            <div class="stat-info">
              <div class="stat-number">${stats.totalStars}</div>
              <div class="stat-label">Tổng sao</div>
            </div>
          </div>
          <div class="stat-card stat-plays">
            <div class="stat-icon-wrap">🎮</div>
            <div class="stat-info">
              <div class="stat-number">${stats.totalPlays}</div>
              <div class="stat-label">Lượt chơi</div>
            </div>
          </div>
          <div class="stat-card stat-progress">
            <div class="stat-icon-wrap">📊</div>
            <div class="stat-info">
              <div class="stat-number">${stats.gamesPlayed}/${totalGames}</div>
              <div class="stat-label">Đã thực hiện</div>
            </div>
          </div>
          <div class="stat-card stat-accuracy">
            <div class="stat-icon-wrap">🎯</div>
            <div class="stat-info">
              <div class="stat-number">${stats.accuracy}%</div>
              <div class="stat-label">Độ chính xác</div>
            </div>
          </div>
        </div>
        ${suggestedGame ? `
          <div class="suggested-game" data-game="${suggestedGame.id}">
            <span class="suggested-label">💡 Gợi ý:</span>
            <span class="suggested-icon">${suggestedGame.icon}</span>
            <span class="suggested-title">${suggestedGame.title}</span>
            <span class="suggested-arrow">→</span>
          </div>
        ` : ''}
      </div>

      <!-- Exam CTA -->
      <div class="exam-entry-card animate-fadeIn" style="animation-delay:0.05s">
        <button class="exam-cta" id="exam-cta-btn">
          <span class="exam-cta-icon">📝</span>
          <div class="exam-cta-body">
            <div class="exam-cta-title">Kiểm Tra Tổng Hợp</div>
            <div class="exam-cta-sub">20 câu · 15 phút · Xếp hạng A+ đến D · Nhận chứng nhận kết quả</div>
          </div>
          ${bestExam ? `<div class="exam-cta-badge">🏆 Cao nhất: ${bestExam.rank} (${bestExam.score}/20)</div>` : '<div class="exam-cta-badge">✨ Chưa thi lần nào</div>'}
          <span class="exam-cta-arrow">→</span>
        </button>
        ${examHistory.length > 0 ? `
          <div class="exam-history-section">
            <div class="exam-history-title">📋 Lịch sử thi (${examHistory.length} lần)</div>
            <div class="exam-history-list">
              ${examHistory.slice(0, 8).map((e, i) => `
                <button class="exam-history-pill" data-exam-idx="${i}">
                  <span class="pill-rank" style="color:${e.rankColor}">${e.rankEmoji} ${e.rank}</span>
                  <span class="pill-score">${e.score}/20</span>
                  <span class="pill-date">${e.date}</span>
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Categories -->
      ${CATEGORIES.map((cat, catIdx) => {
        const catGamesPlayed = cat.games.filter(g => progress[g.id]).length;
        return `
          <div class="category animate-fadeIn" style="animation-delay: ${0.1 + catIdx * 0.1}s">
            <div class="category-header">
              <div class="category-title-row">
                <span class="category-icon" style="background: ${cat.color}15; color: ${cat.color}">${cat.icon}</span>
                <h2 class="category-title">${cat.title}</h2>
                <span class="category-count">${catGamesPlayed}/${cat.games.length}</span>
              </div>
              <div class="category-progress-bar">
                <div class="category-progress-fill" style="width: ${(catGamesPlayed / cat.games.length) * 100}%; background: ${cat.color}"></div>
              </div>
            </div>
            <div class="game-grid">
              ${cat.games.map((g, gIdx) => {
                const p = progress[g.id];
                const accuracy = p ? Math.round((p.totalCorrect / p.totalQuestions) * 100) : 0;
                const played = !!p;
                return `
                  <div class="game-card ${played ? 'played' : ''}" data-game="${g.id}" style="animation-delay: ${0.15 + catIdx * 0.1 + gIdx * 0.05}s; --card-color: ${cat.color}">
                    <div class="card-top-bar" style="background: ${cat.color}"></div>
                    <span class="card-icon">${g.icon}</span>
                    <h3>${g.title}</h3>
                    <p>${g.desc}</p>
                    <div class="card-progress">
                      ${played ? `
                        <div class="card-progress-bar">
                          <div class="card-progress-fill" style="width: ${accuracy}%; background: ${cat.color}"></div>
                        </div>
                        <div class="card-stats">
                          <span>⭐ ${p.bestScore}</span>
                          <span>🎮 ${p.totalPlays}</span>
                          <span>🎯 ${accuracy}%</span>
                        </div>
                      ` : `
                        <div class="card-new-badge">Chưa chơi</div>
                      `}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Event: game cards
  app.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', () => navigate(card.dataset.game));
  });

  // Event: suggested game
  const suggested = app.querySelector('.suggested-game');
  if (suggested) {
    suggested.addEventListener('click', () => navigate(suggested.dataset.game));
  }

  // Event: exam CTA
  app.querySelector('#exam-cta-btn')?.addEventListener('click', () => navigate('exam'));

  // Event: history pills — show certificate for that result
  app.querySelectorAll('.exam-history-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const idx = parseInt(pill.dataset.examIdx, 10);
      const result = examHistory[idx];
      if (result) {
        import('./exam.js').then(mod => {
          app.innerHTML = '';
          mod.renderHistoryCertificate(app, result, () => renderHome(app, navigate));
        });
      }
    });
  });
}

