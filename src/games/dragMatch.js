/**
 * Game 3: Drag & Drop Match — Kéo Thả Nối Phép Tính ↔ Kết Quả
 */
import { GameEngine, renderGameHeader, renderInstruction, updateScoreDisplay, updateProgressBar, shuffle, randPick } from '../engine/gameEngine.js';
import { genMultiplicationMatch, genDivisionMatch } from '../generators/questionGenerators.js';

export function render(app, onHome) {
  let engine, pairs, matchedCount;

  function start() {
    const mode = randPick(['mul', 'div']);
    pairs = mode === 'mul' ? genMultiplicationMatch(6) : genDivisionMatch(6);
    matchedCount = 0;
    engine = new GameEngine({ totalQuestions: pairs.length, gameId: 'drag-match' });

    const shuffledResults = shuffle(pairs.map(p => ({ result: p.result, id: p.id })));

    app.innerHTML = `
      <div class="game-container">
        ${renderGameHeader({ title: '🔗 Kéo Thả Nối' })}
        <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
        ${renderInstruction('💡', '<strong>Bấm</strong> một phép tính bên trái, rồi <strong>bấm</strong> kết quả đúng bên phải để nối chúng lại.')}
        <div class="game-body">
          <div class="match-area">
            <div class="match-col expressions-col">
              <h3>Phép tính</h3>
              ${pairs.map(p => `
                <div class="match-item expression-item" data-id="${p.id}" draggable="true">
                  <span>${p.expression}</span>
                </div>
              `).join('')}
            </div>
            <div class="match-col lines-col" id="lines-container">
              <svg width="100%" height="100%" id="match-svg"></svg>
            </div>
            <div class="match-col results-col">
              <h3>Kết quả</h3>
              ${shuffledResults.map(r => `
                <div class="match-item result-item drop-zone" data-id="${r.id}">
                  <span>${r.result}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
      <style>
        .match-area {
          display: flex;
          gap: 20px;
          align-items: stretch;
          max-width: 700px;
          width: 100%;
          height: calc(100vh - 120px);
        }
        .match-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .match-col h3 {
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-light);
          font-weight: 600;
          margin-bottom: 4px;
        }
        .expressions-col, .results-col {
          flex: 1;
        }
        .lines-col {
          width: 80px;
          flex-shrink: 0;
          position: relative;
        }
        .match-item {
          padding: 14px 20px;
          border-radius: var(--radius-md);
          background: white;
          border: 2px solid var(--border);
          text-align: center;
          font-size: 1.1rem;
          font-weight: 700;
          box-shadow: var(--shadow-sm);
          cursor: grab;
          user-select: none;
          transition: all 0.2s;
          animation: fadeIn 0.4s ease-out backwards;
        }
        .expression-item {
          border-left: 4px solid var(--purple);
        }
        .result-item {
          border-right: 4px solid var(--blue);
        }
        .match-item:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .match-item.selected {
          border-color: var(--purple);
          background: var(--purple-light);
          transform: scale(1.04);
        }
        .match-item.matched {
          border-color: var(--green);
          background: var(--green-light);
          pointer-events: none;
          opacity: 0.7;
        }
        .match-item.wrong-match {
          animation: shake 0.4s ease-in-out;
          border-color: var(--red);
          background: var(--red-light);
        }
        #match-svg {
          position: absolute;
          top: 0; left: -100%;
          width: 300%;
          height: 100%;
          pointer-events: none;
        }
        .match-line {
          stroke: var(--green);
          stroke-width: 3;
          stroke-linecap: round;
          opacity: 0.7;
        }
      </style>
    `;

    document.getElementById('back-btn').addEventListener('click', onHome);

    // Click-to-match logic (simpler than drag on tablet)
    let selectedExpression = null;

    app.querySelectorAll('.expression-item').forEach(item => {
      item.addEventListener('click', () => {
        if (item.classList.contains('matched')) return;
        app.querySelectorAll('.expression-item').forEach(e => e.classList.remove('selected'));
        item.classList.add('selected');
        selectedExpression = item;
      });
    });

    app.querySelectorAll('.result-item').forEach(item => {
      item.addEventListener('click', () => {
        if (!selectedExpression || item.classList.contains('matched')) return;

        const exprId = parseInt(selectedExpression.dataset.id);
        const resultId = parseInt(item.dataset.id);

        if (exprId === resultId) {
          // Correct match
          selectedExpression.classList.remove('selected');
          selectedExpression.classList.add('matched');
          item.classList.add('matched');
          matchedCount++;
          engine.recordCorrect();
          updateScoreDisplay(engine.score);
          updateProgressBar(engine.getProgress());

          // Draw line
          drawLine(selectedExpression, item);

          selectedExpression = null;

          if (matchedCount === pairs.length) {
            setTimeout(() => engine.showScorePopup(start, onHome), 800);
          }
        } else {
          // Wrong match
          item.classList.add('wrong-match');
          engine.recordWrong();
          setTimeout(() => item.classList.remove('wrong-match'), 500);
        }
      });
    });
  }

  function drawLine(el1, el2) {
    const svg = document.getElementById('match-svg');
    const svgRect = svg.getBoundingClientRect();
    const r1 = el1.getBoundingClientRect();
    const r2 = el2.getBoundingClientRect();

    const x1 = r1.right - svgRect.left;
    const y1 = r1.top + r1.height / 2 - svgRect.top;
    const x2 = r2.left - svgRect.left;
    const y2 = r2.top + r2.height / 2 - svgRect.top;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('class', 'match-line');
    svg.appendChild(line);
  }

  start();
}
