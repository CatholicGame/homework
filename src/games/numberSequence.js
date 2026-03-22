/**
 * Game 7: Number Sequence — Dãy Số (Tàu Hỏa)
 */
import { GameEngine, renderGameHeader, renderInstruction, updateScoreDisplay, updateProgressBar } from '../engine/gameEngine.js';
import { genNumberSequence } from '../generators/questionGenerators.js';

export function render(app, onHome) {
  let engine, questions, currentIdx;

  function start() {
    questions = genNumberSequence(8);
    currentIdx = 0;
    engine = new GameEngine({ totalQuestions: questions.length, gameId: 'number-sequence' });
    showQuestion();
  }

  function showQuestion() {
    const q = questions[currentIdx];

    app.innerHTML = `
      <div class="game-container">
        ${renderGameHeader({ title: '🔢 Dãy Số' })}
        <div class="progress-bar"><div class="progress-fill" style="width:${engine.getProgress()}%"></div></div>
        ${renderInstruction('💡', 'Tìm <strong>quy luật</strong> của dãy số (cộng hoặc trừ bao nhiêu), rồi <strong>nhập số còn thiếu</strong> vào toa tàu trống. Nhấn <strong>Enter</strong> để kiểm tra.')}
        <div class="game-body">
          <div class="seq-area animate-fadeIn">
            <div class="seq-counter">Câu ${currentIdx + 1}/${questions.length}</div>
            <div class="seq-hint">${q.description}</div>
            <div class="train">
              <div class="train-engine">🚂</div>
              ${q.sequence.map((num, i) => {
                const isHidden = q.hidePositions.includes(i);
                return `
                  <div class="train-car ${isHidden ? 'empty-car' : 'filled-car'}">
                    ${isHidden
                      ? `<input type="number" class="game-input train-input" data-pos="${i}" data-answer="${num}" inputmode="numeric" autocomplete="off" placeholder="?">`
                      : `<span class="car-number">${num}</span>`
                    }
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
      <style>
        .seq-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .seq-counter {
          font-weight: 600;
          color: var(--text-light);
        }
        .seq-hint {
          font-size: 1rem;
          font-weight: 600;
          color: var(--purple);
          background: var(--purple-light);
          padding: 8px 20px;
          border-radius: var(--radius-full);
        }
        .train {
          display: flex;
          align-items: center;
          gap: 4px;
          overflow-x: auto;
          padding: 20px 10px;
        }
        .train-engine {
          font-size: 3rem;
          margin-right: 8px;
          animation: float 2s ease-in-out infinite;
        }
        .train-car {
          background: white;
          border: 3px solid var(--border);
          border-radius: var(--radius-md);
          width: 80px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s;
        }
        .train-car::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 15px;
          width: 12px; height: 12px;
          background: var(--text-light);
          border-radius: 50%;
        }
        .train-car::before {
          content: '';
          position: absolute;
          bottom: -10px;
          right: 15px;
          width: 12px; height: 12px;
          background: var(--text-light);
          border-radius: 50%;
        }
        .filled-car {
          border-color: var(--blue-light);
          background: var(--blue-light);
        }
        .car-number {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text);
        }
        .empty-car {
          border-color: var(--orange);
          border-style: dashed;
        }
        .empty-car.completed {
          border-style: solid;
          border-color: var(--green);
          background: var(--green-light);
        }
        .train-input {
          width: 60px;
          height: 44px;
          font-size: 1.1rem;
          border: none;
          background: transparent;
          text-align: center;
        }
        .train-input:focus {
          outline: none;
        }
        .train-input.correct {
          color: #166534;
          font-weight: 700;
          background: transparent;
          border: none;
        }
        @media (max-height: 600px) {
          .train-car { width: 66px; height: 56px; }
          .car-number { font-size: 1.1rem; }
        }
      </style>
    `;

    document.getElementById('back-btn').addEventListener('click', onHome);

    let answeredInQ = 0;
    const totalHidden = q.hidePositions.length;

    app.querySelectorAll('.train-input').forEach(input => {
      input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') checkTrainInput(input);
      });
      input.addEventListener('blur', () => checkTrainInput(input));
    });

    function checkTrainInput(input) {
      const answer = parseInt(input.dataset.answer);
      const val = parseInt(input.value);
      if (isNaN(val)) return;

      if (val === answer) {
        input.classList.add('correct');
        input.closest('.train-car').classList.add('completed');
        input.disabled = true;
        answeredInQ++;

        if (answeredInQ === totalHidden) {
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
          }, 700);
        } else {
          const next = app.querySelector('.train-input:not(.correct)');
          if (next) next.focus();
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

    // Focus first input
    const first = app.querySelector('.train-input');
    if (first) first.focus();
  }

  start();
}
