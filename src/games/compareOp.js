/**
 * Game 5: Compare Operator — So Sánh >, <, =
 */
import { GameEngine, renderGameHeader, renderInstruction, updateScoreDisplay, updateProgressBar } from '../engine/gameEngine.js';
import { genComparison } from '../generators/questionGenerators.js';

export function render(app, onHome) {
  let engine, questions, currentIdx;

  function start() {
    questions = genComparison(10);
    currentIdx = 0;
    engine = new GameEngine({ totalQuestions: questions.length, gameId: 'compare-op' });
    showQuestion();
  }

  function showQuestion() {
    const q = questions[currentIdx];

    app.innerHTML = `
      <div class="game-container">
        ${renderGameHeader({ title: '⚖️ So Sánh' })}
        <div class="progress-bar"><div class="progress-fill" style="width:${engine.getProgress()}%"></div></div>
        ${renderInstruction('💡', 'So sánh hai vế rồi <strong>bấm dấu</strong> phù hợp: <strong>&gt;</strong> (lớn hơn), <strong>&lt;</strong> (bé hơn), hoặc <strong>=</strong> (bằng nhau).')}
        <div class="game-body">
          <div class="compare-area animate-fadeIn">
            <div class="compare-counter">Câu ${currentIdx + 1}/${questions.length}</div>
            <div class="compare-equation">
              <div class="compare-side left-side">
                <span class="compare-value">${q.left}</span>
              </div>
              <div class="compare-op-slot" id="op-slot">
                <span class="op-placeholder">?</span>
              </div>
              <div class="compare-side right-side">
                <span class="compare-value">${q.right}</span>
              </div>
            </div>
            <div class="compare-buttons">
              <button class="compare-btn" data-op="<">&lt;</button>
              <button class="compare-btn" data-op="=">=</button>
              <button class="compare-btn" data-op=">">&gt;</button>
            </div>
          </div>
        </div>
      </div>
      <style>
        .compare-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
        }
        .compare-counter {
          font-weight: 600;
          color: var(--text-light);
        }
        .compare-equation {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .compare-side {
          background: white;
          padding: 24px 36px;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          min-width: 140px;
          text-align: center;
        }
        .compare-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text);
        }
        .compare-op-slot {
          width: 80px;
          height: 80px;
          border: 3px dashed var(--purple-light);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          transition: all 0.3s;
        }
        .op-placeholder {
          font-size: 2rem;
          color: var(--text-light);
          font-weight: 700;
        }
        .compare-op-slot.correct {
          border-color: var(--green);
          background: var(--green-light);
        }
        .compare-op-slot.wrong {
          border-color: var(--red);
          background: var(--red-light);
          animation: shake 0.4s;
        }
        .compare-buttons {
          display: flex;
          gap: 16px;
        }
        .compare-btn {
          width: 72px;
          height: 72px;
          border: 3px solid var(--border);
          border-radius: var(--radius-md);
          background: white;
          font-size: 2rem;
          font-weight: 700;
          color: var(--text);
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--font);
        }
        .compare-btn:hover {
          border-color: var(--purple);
          background: var(--purple-light);
          transform: scale(1.08);
        }
        .compare-btn:active {
          transform: scale(0.95);
        }
        .compare-btn.selected {
          background: var(--purple);
          color: white;
          border-color: var(--purple);
        }
        @media (max-height: 600px) {
          .compare-side { padding: 16px 28px; }
          .compare-value { font-size: 1.6rem; }
          .compare-btn { width: 60px; height: 60px; font-size: 1.6rem; }
        }
      </style>
    `;

    document.getElementById('back-btn').addEventListener('click', onHome);

    app.querySelectorAll('.compare-btn').forEach(btn => {
      btn.addEventListener('click', () => handleChoice(btn.dataset.op));
    });
  }

  function handleChoice(chosen) {
    const q = questions[currentIdx];
    const slot = document.getElementById('op-slot');
    slot.querySelector('.op-placeholder').textContent = chosen;

    if (chosen === q.answer) {
      slot.classList.add('correct');
      engine.recordCorrect();
      updateScoreDisplay(engine.score);
      currentIdx++;
      updateProgressBar(engine.getProgress());

      setTimeout(() => {
        if (currentIdx >= questions.length) {
          engine.showScorePopup(start, onHome);
        } else {
          showQuestion();
        }
      }, 600);
    } else {
      slot.classList.add('wrong');
      engine.recordWrong();
      setTimeout(() => {
        slot.classList.remove('wrong');
        slot.querySelector('.op-placeholder').textContent = '?';
      }, 500);
    }
  }

  start();
}
