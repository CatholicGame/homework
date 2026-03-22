/**
 * Game 4: Quick Calc — Tính Nhẩm Nhanh
 */
import { GameEngine, renderGameHeader, renderInstruction, updateScoreDisplay, updateProgressBar } from '../engine/gameEngine.js';
import { genQuickCalc } from '../generators/questionGenerators.js';

export function render(app, onHome) {
  let engine, questions, currentIdx, timerInterval, timeLeft;

  function start() {
    questions = genQuickCalc(12);
    currentIdx = 0;
    timeLeft = 90; // 90 seconds
    engine = new GameEngine({ totalQuestions: questions.length, gameId: 'quick-calc' });

    app.innerHTML = `
      <div class="game-container">
        ${renderGameHeader({ title: '⚡ Tính Nhẩm Nhanh', extraStats: '<div class="timer" id="timer"><span>⏱️</span><span id="time-display">1:30</span></div>' })}
        <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
        ${renderInstruction('💡', '<strong>Nhập kết quả</strong> phép tính rồi nhấn <strong>Enter</strong> hoặc nút <strong>✓</strong>. Trả lời nhanh trước khi hết giờ! ⏱️')}
        <div class="game-body">
          <div class="calc-area">
            <div class="calc-track" id="calc-track">
              ${questions.map((q, i) => `
                <div class="calc-node ${i === 0 ? 'active' : ''}" data-index="${i}">
                  <div class="calc-node-num">${i + 1}</div>
                </div>
              `).join('')}
            </div>
            <div class="calc-card animate-bounceIn" id="calc-card">
              <div class="calc-question" id="calc-question">${questions[0].expression} = ?</div>
              <div class="calc-input-row">
                <input type="number" class="game-input calc-input" id="calc-answer" inputmode="numeric" autocomplete="off" autofocus placeholder="?">
                <button class="btn btn-primary calc-submit" id="calc-submit">✓</button>
              </div>
              <div class="calc-counter">
                <span id="calc-counter">Câu 1/${questions.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        .calc-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          width: 100%;
          max-width: 700px;
        }
        .calc-track {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .calc-node {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.8rem;
          color: var(--text-light);
          transition: all 0.3s;
        }
        .calc-node.active {
          background: var(--purple);
          color: white;
          transform: scale(1.2);
          box-shadow: 0 0 12px rgba(192,132,252,0.5);
        }
        .calc-node.done {
          background: var(--green);
          color: white;
        }
        .calc-card {
          background: white;
          border-radius: var(--radius-xl);
          padding: 40px 50px;
          text-align: center;
          box-shadow: var(--shadow-lg);
          min-width: 350px;
        }
        .calc-question {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 24px;
          background: var(--grad-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .calc-input-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .calc-input {
          width: 100px;
          height: 56px;
          font-size: 1.8rem;
        }
        .calc-submit {
          width: 56px; height: 56px;
          padding: 0;
          font-size: 1.5rem;
          border-radius: 50%;
        }
        .calc-counter {
          margin-top: 16px;
          font-weight: 600;
          color: var(--text-light);
          font-size: 0.9rem;
        }
        @media (max-height: 600px) {
          .calc-card { padding: 24px 36px; }
          .calc-question { font-size: 2rem; margin-bottom: 16px; }
          .calc-input { height: 46px; font-size: 1.4rem; }
        }
      </style>
    `;

    document.getElementById('back-btn').addEventListener('click', () => {
      clearInterval(timerInterval);
      onHome();
    });

    const answerInput = document.getElementById('calc-answer');
    const submitBtn = document.getElementById('calc-submit');

    answerInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') checkAnswer();
    });
    submitBtn.addEventListener('click', checkAnswer);

    // Start timer
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById('time-display').textContent = engine.formatTime(timeLeft);
      if (timeLeft <= 15) {
        document.getElementById('timer').classList.add('warning');
      }
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        engine.showScorePopup(start, onHome);
      }
    }, 1000);

    answerInput.focus();
  }

  function checkAnswer() {
    const input = document.getElementById('calc-answer');
    const val = parseInt(input.value);
    if (isNaN(val)) return;

    const q = questions[currentIdx];
    const nodes = app.querySelectorAll('.calc-node');

    if (val === q.answer) {
      nodes[currentIdx].classList.remove('active');
      nodes[currentIdx].classList.add('done');
      engine.recordCorrect();
      updateScoreDisplay(engine.score);
      currentIdx++;
      updateProgressBar(engine.getProgress());

      if (currentIdx >= questions.length) {
        clearInterval(timerInterval);
        setTimeout(() => engine.showScorePopup(start, onHome), 500);
        return;
      }

      // Next question
      nodes[currentIdx].classList.add('active');
      document.getElementById('calc-question').textContent = questions[currentIdx].expression + ' = ?';
      document.getElementById('calc-counter').textContent = `Câu ${currentIdx + 1}/${questions.length}`;
      input.value = '';
      input.focus();

      // Animate card
      const card = document.getElementById('calc-card');
      card.style.animation = 'none';
      card.offsetHeight; // force reflow
      card.style.animation = 'scaleIn 0.25s ease-out';
    } else {
      engine.recordWrong();
      input.classList.add('wrong');
      setTimeout(() => {
        input.classList.remove('wrong');
        input.value = '';
        input.focus();
      }, 400);
    }
  }

  start();
}
