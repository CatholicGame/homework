/**
 * Game 2: Fill Table — Điền Bảng Thừa Số / Tích
 */
import { GameEngine, renderGameHeader, renderInstruction, updateScoreDisplay, updateProgressBar, randPick } from '../engine/gameEngine.js';
import { genMultiplicationTable, genDivisionTable } from '../generators/questionGenerators.js';

export function render(app, onHome) {
  let engine, questions, answeredCount;

  function start() {
    const mode = randPick(['mul', 'div']);
    questions = mode === 'mul' ? genMultiplicationTable(8) : genDivisionTable(8);
    answeredCount = 0;
    engine = new GameEngine({ totalQuestions: questions.length, gameId: 'fill-table' });

    const headers = mode === 'mul'
      ? ['Thừa số', 'Thừa số', 'Tích']
      : ['Số bị chia', 'Số chia', 'Thương'];
    const title = mode === 'mul' ? 'Bảng Thừa Số & Tích' : 'Bảng Chia';

    app.innerHTML = `
      <div class="game-container">
        ${renderGameHeader({ title: `📊 ${title}` })}
        <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
        ${renderInstruction('💡', 'Tìm <strong>ô trống</strong> trong bảng, <strong>nhập số</strong> còn thiếu rồi nhấn <strong>Enter</strong>. Xem các ô đã có để suy ra đáp án.')}
        <div class="game-body">
          <div class="table-area animate-fadeIn">
            <table class="math-table">
              <thead>
                <tr>
                  <th>${headers[0]}</th>
                  <th>${headers[1]}</th>
                  <th>${headers[2]}</th>
                </tr>
              </thead>
              <tbody>
                ${questions.map((q, i) => `
                  <tr class="table-row" data-index="${i}">
                    <td>${q.missing === 'a' ? `<input type="number" class="game-input table-input" data-row="${i}" data-col="a" inputmode="numeric" autocomplete="off">` : `<span class="filled-val">${q.a}</span>`}</td>
                    <td>${q.missing === 'b' ? `<input type="number" class="game-input table-input" data-row="${i}" data-col="b" inputmode="numeric" autocomplete="off">` : `<span class="filled-val">${q.b}</span>`}</td>
                    <td>${q.missing === (mode === 'mul' ? 'product' : 'quotient') ? `<input type="number" class="game-input table-input" data-row="${i}" data-col="${mode === 'mul' ? 'product' : 'quotient'}" inputmode="numeric" autocomplete="off">` : `<span class="filled-val">${mode === 'mul' ? q.product : q.quotient}</span>`}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style>
        .table-area {
          max-width: 500px;
          width: 100%;
        }
        .math-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          background: white;
        }
        .math-table th {
          background: var(--grad-primary);
          color: white;
          padding: 14px 20px;
          font-size: 1rem;
          font-weight: 700;
        }
        .math-table td {
          padding: 10px 16px;
          text-align: center;
          border-bottom: 1px solid var(--border);
          font-size: 1.1rem;
        }
        .table-row {
          transition: background 0.3s;
        }
        .table-row.completed {
          background: var(--green-light);
        }
        .filled-val {
          font-weight: 700;
          color: var(--text);
        }
        .table-input {
          width: 72px;
          height: 42px;
        }
        .table-input.correct {
          pointer-events: none;
        }
      </style>
    `;

    document.getElementById('back-btn').addEventListener('click', onHome);

    app.querySelectorAll('.table-input').forEach(input => {
      input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') checkInput(input);
      });
      input.addEventListener('blur', () => checkInput(input));
    });

    // Focus first input
    const first = app.querySelector('.table-input');
    if (first) first.focus();
  }

  function checkInput(input) {
    const row = parseInt(input.dataset.row);
    const q = questions[row];
    const val = parseInt(input.value);
    if (isNaN(val)) return;

    if (val === q.answer) {
      input.classList.add('correct');
      input.closest('.table-row').classList.add('completed');
      answeredCount++;
      engine.recordCorrect();
      updateScoreDisplay(engine.score);
      updateProgressBar(engine.getProgress());

      const next = app.querySelector('.table-input:not(.correct)');
      if (next) next.focus();

      if (answeredCount === questions.length) {
        setTimeout(() => engine.showScorePopup(start, onHome), 600);
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
