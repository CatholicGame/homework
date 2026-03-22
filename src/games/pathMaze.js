/**
 * Game 9: Path Maze — Mê Cung Phép Tính
 */
import { GameEngine, renderGameHeader, renderInstruction, updateScoreDisplay, updateProgressBar } from '../engine/gameEngine.js';
import { genPathMaze } from '../generators/questionGenerators.js';

export function render(app, onHome) {
  let engine, nodes, currentNode;

  function start() {
    nodes = genPathMaze(8);
    currentNode = 0;
    engine = new GameEngine({ totalQuestions: nodes.length, gameId: 'path-maze' });
    renderMaze();
  }

  function renderMaze() {
    app.innerHTML = `
      <div class="game-container">
        ${renderGameHeader({ title: '🗺️ Mê Cung Toán Học' })}
        <div class="progress-bar"><div class="progress-fill" style="width:${engine.getProgress()}%"></div></div>
        ${renderInstruction('💡', 'Giải <strong>phép tính</strong> tại mỗi nút dừng để <strong>mở khóa đường đi</strong>. Nhập kết quả rồi nhấn <strong>Enter</strong> hoặc nút Đi!')}
        <div class="game-body">
          <div class="maze-area">
            <div class="maze-path">
              <div class="maze-start">🏠</div>
              ${nodes.map((node, i) => `
                <div class="maze-segment">
                  <div class="maze-road ${i < currentNode ? 'road-done' : i === currentNode ? 'road-active' : 'road-locked'}"></div>
                  <div class="maze-node ${i < currentNode ? 'node-done' : i === currentNode ? 'node-active' : 'node-locked'}" data-index="${i}">
                    ${i < currentNode
                      ? `<span class="node-check">✅</span>`
                      : i === currentNode
                      ? `<span class="node-expr">${node.expression} = ?</span>`
                      : `<span class="node-lock">🔒</span>`
                    }
                  </div>
                </div>
              `).join('')}
              <div class="maze-segment">
                <div class="maze-road ${currentNode >= nodes.length ? 'road-done' : 'road-locked'}"></div>
                <div class="maze-end">⭐</div>
              </div>
            </div>
            ${currentNode < nodes.length ? `
              <div class="maze-input-area animate-bounceIn">
                <div class="maze-question">${nodes[currentNode].expression} = ?</div>
                <div class="maze-input-row">
                  <input type="number" class="game-input maze-input" id="maze-answer" inputmode="numeric" autocomplete="off" placeholder="?" autofocus>
                  <button class="btn btn-primary maze-submit" id="maze-submit">Đi! →</button>
                </div>
                <div class="maze-character animate-float">🐿️</div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
      <style>
        .maze-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          width: 100%;
          max-width: 900px;
        }
        .maze-path {
          display: flex;
          align-items: center;
          gap: 0;
          overflow-x: auto;
          padding: 20px 10px;
          width: 100%;
        }
        .maze-start, .maze-end {
          font-size: 2.2rem;
          flex-shrink: 0;
        }
        .maze-segment {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .maze-road {
          width: 40px;
          height: 4px;
          border-radius: 2px;
          transition: background 0.3s;
        }
        .road-done { background: var(--green); }
        .road-active { background: var(--purple); animation: pulse 1.5s infinite; }
        .road-locked { background: var(--border); }
        .maze-node {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid var(--border);
          background: white;
          transition: all 0.3s;
          font-size: 0.75rem;
        }
        .node-done {
          border-color: var(--green);
          background: var(--green-light);
        }
        .node-active {
          border-color: var(--purple);
          background: var(--purple-light);
          transform: scale(1.15);
          box-shadow: 0 0 16px rgba(192,132,252,0.4);
        }
        .node-locked {
          opacity: 0.5;
        }
        .node-expr {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--purple);
          text-align: center;
          line-height: 1.1;
        }
        .node-check { font-size: 1.2rem; }
        .node-lock { font-size: 1rem; }
        .maze-input-area {
          background: white;
          border-radius: var(--radius-xl);
          padding: 28px 40px;
          box-shadow: var(--shadow-lg);
          text-align: center;
          position: relative;
        }
        .maze-question {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 20px;
          background: var(--grad-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .maze-input-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .maze-input {
          width: 90px;
          height: 52px;
          font-size: 1.5rem;
        }
        .maze-character {
          position: absolute;
          top: -30px;
          right: -20px;
          font-size: 2.5rem;
        }
        @media (max-height: 600px) {
          .maze-node { width: 44px; height: 44px; }
          .maze-input-area { padding: 18px 28px; }
          .maze-question { font-size: 1.5rem; margin-bottom: 12px; }
        }
      </style>
    `;

    document.getElementById('back-btn').addEventListener('click', onHome);

    if (currentNode < nodes.length) {
      const input = document.getElementById('maze-answer');
      const submitBtn = document.getElementById('maze-submit');

      input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') checkMaze();
      });
      submitBtn.addEventListener('click', checkMaze);
      input.focus();
    }
  }

  function checkMaze() {
    const input = document.getElementById('maze-answer');
    const val = parseInt(input.value);
    if (isNaN(val)) return;

    if (val === nodes[currentNode].answer) {
      engine.recordCorrect();
      updateScoreDisplay(engine.score);
      currentNode++;
      updateProgressBar(engine.getProgress());

      if (currentNode >= nodes.length) {
        setTimeout(() => engine.showScorePopup(start, onHome), 500);
      } else {
        renderMaze();
      }
    } else {
      input.classList.add('wrong');
      engine.recordWrong();
      setTimeout(() => {
        input.classList.remove('wrong');
        input.value = '';
        input.focus();
      }, 400);
    }
  }

  start();
}
