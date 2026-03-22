/**
 * Game 10: Number Thinker — Tư Duy Phân Tích Số
 */
import { GameEngine, renderGameHeader, renderInstruction, updateScoreDisplay, updateProgressBar } from '../engine/gameEngine.js';
import { genNumberThinker } from '../generators/questionGenerators.js';

export function render(app, onHome) {
  let engine, questions, currentIdx;

  function start() {
    questions = genNumberThinker(10);
    currentIdx = 0;
    engine = new GameEngine({ totalQuestions: questions.length, gameId: 'number-thinker' });
    showQuestion();
  }

  function showQuestion() {
    const q = questions[currentIdx];

    app.innerHTML = `
      <div class="game-container">
        ${renderGameHeader({ title: '🧠 Tư Duy Số' })}
        <div class="progress-bar"><div class="progress-fill" style="width:${engine.getProgress()}%"></div></div>
        ${renderInstruction('💡', 'Đọc kỹ <strong>mô tả</strong> về số cần tìm, suy nghĩ rồi <strong>bấm vào đáp án đúng</strong> trong 4 lựa chọn.')}
        <div class="game-body">
          <div class="thinker-area animate-fadeIn">
            <div class="thinker-counter">Câu ${currentIdx + 1}/${questions.length}</div>
            <div class="thinker-card">
              <div class="thinker-icon">🤔</div>
              <div class="thinker-text">${q.text}</div>
              <div class="thinker-options">
                ${q.options.map((opt, i) => `
                  <button class="option-btn thinker-option" data-value="${opt}" style="animation-delay: ${i * 0.1}s">
                    ${opt}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        .thinker-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          max-width: 600px;
          width: 100%;
        }
        .thinker-counter {
          font-weight: 600;
          color: var(--text-light);
        }
        .thinker-card {
          background: white;
          border-radius: var(--radius-xl);
          padding: 32px 40px;
          box-shadow: var(--shadow-lg);
          text-align: center;
          width: 100%;
        }
        .thinker-icon {
          font-size: 3rem;
          margin-bottom: 12px;
        }
        .thinker-text {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text);
          line-height: 1.7;
          margin-bottom: 24px;
          text-align: left;
          padding: 16px 20px;
          background: var(--bg);
          border-radius: var(--radius-md);
          border-left: 4px solid var(--purple);
        }
        .thinker-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .thinker-option {
          padding: 16px 20px;
          font-size: 1.3rem;
          animation: fadeIn 0.4s ease-out backwards;
        }
        .thinker-option.correct {
          background: var(--green);
          border-color: var(--green);
          color: white;
          transform: scale(1.05);
        }
        .thinker-option.wrong {
          background: var(--red-light);
          border-color: var(--red);
          animation: shake 0.4s ease-in-out;
        }
        .thinker-option.disabled {
          pointer-events: none;
          opacity: 0.6;
        }
        @media (max-height: 600px) {
          .thinker-card { padding: 20px 28px; }
          .thinker-text { font-size: 1rem; margin-bottom: 16px; }
          .thinker-option { padding: 12px 16px; font-size: 1.1rem; }
        }
      </style>
    `;

    document.getElementById('back-btn').addEventListener('click', onHome);

    app.querySelectorAll('.thinker-option').forEach(btn => {
      btn.addEventListener('click', () => handleChoice(btn));
    });
  }

  function handleChoice(btn) {
    const q = questions[currentIdx];
    const chosen = parseInt(btn.dataset.value);

    // Disable all buttons
    app.querySelectorAll('.thinker-option').forEach(b => b.classList.add('disabled'));

    if (chosen === q.answer) {
      btn.classList.add('correct');
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
      }, 800);
    } else {
      btn.classList.add('wrong');
      engine.recordWrong();

      // Show correct answer
      app.querySelectorAll('.thinker-option').forEach(b => {
        if (parseInt(b.dataset.value) === q.answer) b.classList.add('correct');
      });

      setTimeout(() => {
        currentIdx++;
        if (currentIdx >= questions.length) {
          engine.showScorePopup(start, onHome);
        } else {
          showQuestion();
        }
      }, 1500);
    }
  }

  start();
}
