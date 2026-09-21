/**
 * Home Page — Grade Picker (Lớp 1–5)
 */

const GRADES = [
  { id: 'grade-1', title: 'Lớp 1', icon: '1️⃣', color: '#FF6B9D', games: [] },
  { id: 'grade-2', title: 'Lớp 2', icon: '2️⃣', color: '#60A5FA', games: [] },
  {
    id: 'grade-3', title: 'Lớp 3', icon: '3️⃣', color: '#34D399',
    games: [
      { id: 'grade3-exam', icon: '📝', title: 'Ôn Luyện Đề', desc: 'Đề 1 — Bộ đề ôn luyện VioEdu khối 3' },
      { id: 'grade3-workbook', icon: '📗', title: 'Vở Bài Tập Toán 3', desc: 'Tập Một — Kết nối tri thức với cuộc sống' },
    ],
  },
  { id: 'grade-4', title: 'Lớp 4', icon: '4️⃣', color: '#C084FC', games: [] },
  { id: 'grade-5', title: 'Lớp 5', icon: '5️⃣', color: '#FBBF24', games: [] },
];

export function renderHome(app, navigate) {
  renderGradeGrid();

  function renderGradeGrid() {
    app.innerHTML = `
      <div class="home">
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

    app.querySelectorAll('.game-card:not(.grade-card-empty)').forEach(card => {
      card.addEventListener('click', () => {
        const grade = GRADES.find(g => g.id === card.dataset.grade);
        if (grade) renderGradeGames(grade);
      });
    });
  }

  function renderGradeGames(grade) {
    app.innerHTML = `
      <div class="home">
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

    app.querySelectorAll('.game-card').forEach(card => {
      card.addEventListener('click', () => navigate(card.dataset.game));
    });
    app.querySelector('#back-to-grades').addEventListener('click', renderGradeGrid);
  }
}
