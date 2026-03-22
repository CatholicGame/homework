/**
 * Game 1: Flower Wheel — Bảng Nhân / Chia trên Hoa Cánh
 */
import { GameEngine, renderGameHeader, renderInstruction, updateScoreDisplay, updateProgressBar, shuffle, randPick } from '../engine/gameEngine.js';
import { genMultiplicationFlower, genDivisionFlower } from '../generators/questionGenerators.js';

export function render(app, onHome) {
  let engine;
  let petals;
  let factor;
  let mode; // 'mul' or 'div'
  let answeredCount;

  function start() {
    mode = randPick(['mul', 'div']);
    factor = randPick([2, 5]);
    petals = mode === 'mul' ? genMultiplicationFlower(factor) : genDivisionFlower(factor);
    answeredCount = 0;
    engine = new GameEngine({ totalQuestions: petals.length, onComplete: null, gameId: 'flower-wheel' });

    const opSymbol = mode === 'mul' ? '×' : '÷';
    const title = mode === 'mul' ? `Bảng Nhân ${factor}` : `Bảng Chia ${factor}`;

    app.innerHTML = `
      <div class="game-container">
        ${renderGameHeader({ title: `🌸 ${title}`, onBack: onHome })}
        <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
        ${renderInstruction('💡', 'Nhìn <strong>số ở giữa</strong> (×2 hoặc ÷5...), rồi <strong>nhập kết quả</strong> vào mỗi cánh hoa. Nhấn <strong>Enter</strong> để kiểm tra.')}
        <div class="game-body">
          <div class="flower-area">
            <div class="flower">
              <div class="flower-center">
                <span class="flower-op">${opSymbol} ${factor}</span>
              </div>
              <div class="flower-petals">
                ${petals.map((p, i) => `
                  <div class="petal" data-index="${i}" style="--angle: ${i * (360 / petals.length)}deg">
                    <div class="petal-shape">
                      <span class="petal-input-num">${p.input}</span>
                      <input type="number" class="petal-answer game-input" data-index="${i}" placeholder="?" autocomplete="off" inputmode="numeric">
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            <p class="flower-hint">Nhập kết quả vào mỗi cánh hoa 🌟</p>
          </div>
        </div>
      </div>
      <style>
        .flower-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .flower {
          position: relative;
          width: 420px;
          height: 420px;
        }
        .flower-center {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 90px; height: 90px;
          border-radius: 50%;
          background: var(--grad-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-lg);
          z-index: 10;
        }
        .flower-op {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
        }
        .flower-petals {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
        }
        .petal {
          position: absolute;
          top: 50%; left: 50%;
          transform-origin: center;
          transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-150px);
          animation: scaleIn 0.4s ease-out backwards;
        }
        .petal:nth-child(1) { animation-delay: 0.05s; }
        .petal:nth-child(2) { animation-delay: 0.1s; }
        .petal:nth-child(3) { animation-delay: 0.15s; }
        .petal:nth-child(4) { animation-delay: 0.2s; }
        .petal:nth-child(5) { animation-delay: 0.25s; }
        .petal:nth-child(6) { animation-delay: 0.3s; }
        .petal:nth-child(7) { animation-delay: 0.35s; }
        .petal:nth-child(8) { animation-delay: 0.4s; }
        .petal-shape {
          background: white;
          border: 3px solid var(--purple-light);
          border-radius: 50%;
          width: 100px; height: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          box-shadow: var(--shadow-md);
          transform: rotate(calc(-1 * var(--angle)));
          transition: all 0.3s;
        }
        .petal-shape.correct {
          border-color: var(--green);
          background: var(--green-light);
        }
        .petal-input-num {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--purple);
        }
        .petal-answer {
          width: 52px;
          height: 34px;
          font-size: 1rem;
          border-radius: 6px;
        }
        .petal-answer.correct {
          background: var(--green-light);
          border-color: var(--green);
          pointer-events: none;
        }
        .flower-hint {
          font-weight: 600;
          color: var(--text-light);
          font-size: 0.95rem;
        }
        .flower-complete {
          text-align: center;
          margin-top: 12px;
        }
        @media (max-height: 600px) {
          .flower { width: 340px; height: 340px; }
          .petal { transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-120px); }
          .petal-shape { width: 80px; height: 80px; }
          .flower-center { width: 70px; height: 70px; }
          .flower-op { font-size: 1.2rem; }
        }
      </style>
    `;

    // Event listeners
    document.getElementById('back-btn').addEventListener('click', onHome);

    app.querySelectorAll('.petal-answer').forEach(input => {
      input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleAnswer(input);
      });
      input.addEventListener('blur', () => handleAnswer(input));
    });
  }

  function handleAnswer(input) {
    const idx = parseInt(input.dataset.index);
    const petal = petals[idx];
    const val = parseInt(input.value);
    if (isNaN(val)) return;

    if (val === petal.answer) {
      input.classList.add('correct');
      input.closest('.petal-shape').classList.add('correct');
      answeredCount++;
      engine.recordCorrect();
      updateScoreDisplay(engine.score);
      updateProgressBar(engine.getProgress());

      // Focus next empty input
      const nextInput = app.querySelector('.petal-answer:not(.correct)');
      if (nextInput) nextInput.focus();

      if (answeredCount === petals.length) {
        setTimeout(() => {
          engine.showScorePopup(start, onHome);
        }, 600);
      }
    } else {
      input.classList.add('wrong');
      engine.recordWrong();
      setTimeout(() => {
        input.classList.remove('wrong');
        input.value = '';
        input.focus();
      }, 500);
    }
  }

  start();
}
