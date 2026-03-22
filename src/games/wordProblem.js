/**
 * Game 8: Word Problem — Toán Đố (2 Bước: Tự lập phép tính + Hoạt động kéo thả)
 */
import { GameEngine, renderGameHeader, renderInstruction, updateScoreDisplay, updateProgressBar } from '../engine/gameEngine.js';
import { genWordProblem } from '../generators/questionGenerators.js';

export function render(app, onHome) {
  let engine, questions, currentIdx;

  function start() {
    questions = genWordProblem(6);
    currentIdx = 0;
    engine = new GameEngine({ totalQuestions: questions.length, gameId: 'word-problem' });
    showStep1();
  }

  // ========== STEP 1: Child builds the equation ==========
  function showStep1() {
    const q = questions[currentIdx];

    app.innerHTML = `
      <div class="game-container">
        ${renderGameHeader({ title: '📝 Toán Đố' })}
        <div class="progress-bar"><div class="progress-fill" style="width:${engine.getProgress()}%"></div></div>
        ${renderInstruction('💡', '<strong>Bước 1:</strong> Đọc đề bài, <strong>tự lập phép tính</strong> bằng cách điền số và dấu, rồi nhấn <strong>Kiểm tra</strong>.')}
        <div class="game-body">
          <div class="word-area animate-fadeIn">
            <div class="word-steps">
              <span class="step-badge active">① Lập phép tính</span>
              <span class="step-badge">② Hoạt động</span>
            </div>
            <div class="word-card">
              <div class="word-emoji">${q.emoji}</div>
              <div class="word-text">${q.text}</div>

              <div class="equation-builder">
                <span class="eq-label">Phép tính:</span>
                <div class="eq-slots">
                  <input type="number" class="game-input eq-input" id="eq-a" inputmode="numeric" autocomplete="off" placeholder="?" title="Số thứ nhất">
                  <select class="eq-operator" id="eq-op" title="Dấu phép tính">
                    <option value="" selected disabled>?</option>
                    <option value="×">×</option>
                    <option value="÷">÷</option>
                  </select>
                  <input type="number" class="game-input eq-input" id="eq-b" inputmode="numeric" autocomplete="off" placeholder="?" title="Số thứ hai">
                  <span class="eq-equals">=</span>
                  <input type="number" class="game-input eq-input eq-result" id="eq-result" inputmode="numeric" autocomplete="off" placeholder="?" title="Kết quả">
                </div>
              </div>

              <div class="word-answer-row">
                <span class="unit-label">Đáp số:</span>
                <span id="answer-preview" class="answer-preview">?</span>
                <span class="unit-text">${q.unit}</span>
              </div>

              <button class="btn btn-primary check-btn" id="check-btn">Kiểm tra ✓</button>
              <div class="eq-feedback" id="eq-feedback"></div>
            </div>
          </div>
        </div>
      </div>
      ${getWordProblemStyles()}
    `;

    document.getElementById('back-btn').addEventListener('click', onHome);

    // Live update answer preview
    const resultInput = document.getElementById('eq-result');
    const preview = document.getElementById('answer-preview');
    resultInput.addEventListener('input', () => {
      preview.textContent = resultInput.value || '?';
    });

    // Check button
    document.getElementById('check-btn').addEventListener('click', checkStep1);

    // Also allow Enter key on the last input
    resultInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') checkStep1();
    });

    // Focus first input
    document.getElementById('eq-a').focus();
  }

  function checkStep1() {
    const q = questions[currentIdx];
    const valA = parseInt(document.getElementById('eq-a').value);
    const op = document.getElementById('eq-op').value;
    const valB = parseInt(document.getElementById('eq-b').value);
    const result = parseInt(document.getElementById('eq-result').value);
    const feedback = document.getElementById('eq-feedback');

    // Validate all fields are filled
    if (isNaN(valA) || !op || isNaN(valB) || isNaN(result)) {
      feedback.innerHTML = '⚠️ Hãy điền đầy đủ tất cả các ô!';
      feedback.className = 'eq-feedback warning';
      return;
    }

    // Check if the equation is correct
    // Accept any valid equation that gives the correct answer
    let computedResult;
    if (op === '×') {
      computedResult = valA * valB;
    } else if (op === '÷') {
      computedResult = valB !== 0 ? valA / valB : NaN;
    }

    const isEquationCorrect = (
      valA === q.operandA &&
      op === q.operator &&
      valB === q.operandB &&
      result === q.answer
    );

    // Also accept reversed operands for multiplication (commutative)
    const isReversedMul = (
      q.operator === '×' &&
      op === '×' &&
      valA === q.operandB &&
      valB === q.operandA &&
      result === q.answer
    );

    if (isEquationCorrect || isReversedMul) {
      // Perfect! All correct
      feedback.innerHTML = '🎉 Tuyệt vời! Phép tính đúng rồi!';
      feedback.className = 'eq-feedback correct';

      // Highlight all inputs green
      document.querySelectorAll('.eq-input, .eq-operator').forEach(el => {
        el.classList.add('correct');
        el.disabled = true;
      });

      engine.playSound('correct');
      setTimeout(() => showStep2(), 1200);

    } else if (computedResult === result && result === q.answer) {
      // Result is correct but equation is different — still accept but hint
      feedback.innerHTML = '✅ Đáp số đúng! Nhưng hãy kiểm tra lại phép tính.';
      feedback.className = 'eq-feedback partial';

      document.getElementById('eq-result').classList.add('correct');
      engine.playSound('correct');
      setTimeout(() => showStep2(), 1500);

    } else {
      // Wrong
      feedback.innerHTML = '❌ Chưa đúng. Đọc lại đề bài và thử lại nhé!';
      feedback.className = 'eq-feedback wrong';

      // Highlight wrong fields
      if (valA !== q.operandA && valA !== q.operandB) {
        document.getElementById('eq-a').classList.add('wrong');
      }
      if (op !== q.operator) {
        document.getElementById('eq-op').classList.add('wrong');
      }
      if (valB !== q.operandB && valB !== q.operandA) {
        document.getElementById('eq-b').classList.add('wrong');
      }
      if (result !== q.answer) {
        document.getElementById('eq-result').classList.add('wrong');
      }

      engine.playSound('wrong');
      setTimeout(() => {
        document.querySelectorAll('.wrong').forEach(el => el.classList.remove('wrong'));
      }, 800);
    }
  }

  // ========== STEP 2: Drag-and-drop activity ==========
  function showStep2() {
    const q = questions[currentIdx];
    const act = q.activity;

    const itemsHTML = [];
    for (let i = 0; i < act.totalItems; i++) {
      itemsHTML.push(`
        <div class="drag-item" data-item-id="${i}" draggable="true">
          <span>${act.itemEmoji}</span>
        </div>
      `);
    }

    const groupsHTML = [];
    for (let g = 0; g < act.groups; g++) {
      groupsHTML.push(`
        <div class="drop-group" data-group="${g}">
          <div class="group-header">
            <span class="group-emoji">${act.groupEmoji}</span>
            <span class="group-label">${act.groupLabel} ${g + 1}</span>
          </div>
          <div class="group-slots" data-group="${g}">
            ${Array(act.perGroup).fill('').map((_, s) => `
              <div class="group-slot" data-group="${g}" data-slot="${s}"></div>
            `).join('')}
          </div>
          <div class="group-count"><span class="count-num" id="count-${g}">0</span>/${act.perGroup}</div>
        </div>
      `);
    }

    app.innerHTML = `
      <div class="game-container">
        ${renderGameHeader({ title: '📝 Toán Đố' })}
        <div class="progress-bar"><div class="progress-fill" style="width:${engine.getProgress()}%"></div></div>
        ${renderInstruction('🖐️', `<strong>Bước 2:</strong> ${act.instruction}. <strong>Bấm</strong> chọn đồ, rồi <strong>bấm</strong> vào ô trống để đặt!`)}
        <div class="game-body">
          <div class="activity-area animate-fadeIn">
            <div class="word-steps">
              <span class="step-badge done">✓ Lập phép tính</span>
              <span class="step-badge active">② Hoạt động</span>
            </div>
            <div class="activity-hint">${q.text}</div>
            <div class="activity-layout">
              <div class="item-pool" id="item-pool">
                <div class="pool-label">Kho đồ (${act.totalItems} ${act.itemName})</div>
                <div class="pool-items" id="pool-items">
                  ${itemsHTML.join('')}
                </div>
              </div>
              <div class="arrow-indicator">➜</div>
              <div class="groups-area" id="groups-area">
                ${groupsHTML.join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
      ${getActivityStyles()}
    `;

    document.getElementById('back-btn').addEventListener('click', onHome);
    setupDragAndDrop(act);
  }

  function setupDragAndDrop(act) {
    let selectedItem = null;
    const pool = document.getElementById('pool-items');
    const groupCounts = new Array(act.groups).fill(0);

    // Click-to-place
    pool.addEventListener('click', (e) => {
      const item = e.target.closest('.drag-item');
      if (!item || item.classList.contains('placed')) return;

      if (selectedItem) selectedItem.classList.remove('selected');
      selectedItem = item;
      item.classList.add('selected');
    });

    document.getElementById('groups-area').addEventListener('click', (e) => {
      const slot = e.target.closest('.group-slot');
      if (!slot || !selectedItem) return;

      const groupIdx = parseInt(slot.dataset.group);
      if (slot.children.length > 0) return;
      if (groupCounts[groupIdx] >= act.perGroup) return;

      placeItem(selectedItem, slot, groupIdx, act, groupCounts);
      selectedItem = null;
    });

    // Drag-and-drop
    pool.addEventListener('dragstart', (e) => {
      const item = e.target.closest('.drag-item');
      if (!item || item.classList.contains('placed')) { e.preventDefault(); return; }
      e.dataTransfer.setData('text/plain', item.dataset.itemId);
      item.classList.add('dragging');
    });

    pool.addEventListener('dragend', (e) => {
      const item = e.target.closest('.drag-item');
      if (item) item.classList.remove('dragging');
    });

    document.querySelectorAll('.group-slot').forEach(slot => {
      slot.addEventListener('dragover', (e) => {
        e.preventDefault();
        slot.classList.add('drag-over');
      });
      slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
      slot.addEventListener('drop', (e) => {
        e.preventDefault();
        slot.classList.remove('drag-over');
        const itemId = e.dataTransfer.getData('text/plain');
        const item = pool.querySelector(`[data-item-id="${itemId}"]`);
        if (!item || slot.children.length > 0) return;
        const groupIdx = parseInt(slot.dataset.group);
        if (groupCounts[groupIdx] >= act.perGroup) return;
        placeItem(item, slot, groupIdx, act, groupCounts);
      });
    });
  }

  function placeItem(item, slot, groupIdx, act, groupCounts) {
    const clone = document.createElement('span');
    clone.className = 'placed-emoji animate-bounceIn';
    clone.textContent = act.itemEmoji;
    slot.appendChild(clone);

    item.classList.add('placed');
    item.classList.remove('selected', 'dragging');
    item.draggable = false;

    groupCounts[groupIdx]++;
    const countEl = document.getElementById(`count-${groupIdx}`);
    countEl.textContent = groupCounts[groupIdx];

    if (groupCounts[groupIdx] === act.perGroup) {
      document.querySelector(`.drop-group[data-group="${groupIdx}"]`).classList.add('group-complete');
    }

    const totalPlaced = groupCounts.reduce((s, c) => s + c, 0);
    if (totalPlaced === act.totalItems) {
      engine.recordCorrect();
      updateScoreDisplay(engine.score);
      currentIdx++;
      updateProgressBar(engine.getProgress());

      setTimeout(() => {
        if (currentIdx >= questions.length) {
          engine.showScorePopup(start, onHome);
        } else {
          showStep1();
        }
      }, 1000);
    }
  }

  // ========== STYLES ==========
  function getWordProblemStyles() {
    return `<style>
      .word-area {
        display: flex; flex-direction: column; align-items: center;
        gap: 14px; max-width: 620px; width: 100%;
      }
      .word-steps { display: flex; gap: 12px; }
      .step-badge {
        padding: 6px 16px; border-radius: var(--radius-full);
        font-size: 0.85rem; font-weight: 700;
        background: var(--border); color: var(--text-light);
        transition: all 0.3s;
      }
      .step-badge.active {
        background: var(--purple); color: white;
        box-shadow: 0 2px 8px rgba(192,132,252,0.4);
      }
      .step-badge.done { background: var(--green); color: white; }
      .word-card {
        background: white; border-radius: var(--radius-xl);
        padding: 28px 36px; box-shadow: var(--shadow-lg);
        text-align: center; width: 100%;
      }
      .word-emoji { font-size: 3rem; margin-bottom: 12px; }
      .word-text {
        font-size: 1.1rem; font-weight: 600; color: var(--text);
        line-height: 1.6; margin-bottom: 20px;
      }

      /* Equation Builder */
      .equation-builder {
        display: flex; flex-direction: column; align-items: center;
        gap: 10px; margin-bottom: 16px;
      }
      .eq-label {
        font-size: 0.9rem; font-weight: 700; color: var(--text-light);
      }
      .eq-slots {
        display: flex; align-items: center; gap: 8px;
        flex-wrap: nowrap;
      }
      .eq-input {
        width: 64px; height: 52px; font-size: 1.4rem;
        border: 2px solid var(--purple-light);
        background: #FAFAFE;
      }
      .eq-input:focus {
        border-color: var(--purple);
        box-shadow: 0 0 0 3px var(--purple-light);
      }
      .eq-input.correct {
        border-color: var(--green) !important;
        background: var(--green-light) !important;
        color: #166534 !important;
      }
      .eq-input.wrong {
        border-color: var(--red) !important;
        background: var(--red-light) !important;
        animation: shake 0.4s;
      }
      .eq-result {
        border-color: var(--blue-light);
        background: #F0F7FF;
      }
      .eq-operator {
        width: 56px; height: 52px;
        border: 2px solid var(--orange-light, var(--purple-light));
        border-radius: var(--radius-sm);
        background: #FFF7ED;
        font-family: var(--font);
        font-size: 1.4rem; font-weight: 700;
        text-align: center;
        cursor: pointer;
        color: var(--text);
        outline: none;
        appearance: none;
        -webkit-appearance: none;
        padding: 0 4px;
      }
      .eq-operator:focus {
        border-color: var(--purple);
        box-shadow: 0 0 0 3px var(--purple-light);
      }
      .eq-operator.correct {
        border-color: var(--green) !important;
        background: var(--green-light) !important;
        color: #166534 !important;
      }
      .eq-operator.wrong {
        border-color: var(--red) !important;
        background: var(--red-light) !important;
        animation: shake 0.4s;
      }
      .eq-equals {
        font-size: 1.5rem; font-weight: 700; color: var(--text);
      }

      .word-answer-row {
        display: flex; align-items: center; justify-content: center;
        gap: 8px; font-size: 1rem; font-weight: 700; color: var(--text);
        padding: 10px 20px; background: var(--bg);
        border-radius: var(--radius-md); margin-bottom: 16px;
      }
      .unit-label { color: var(--text-light); font-size: 0.85rem; font-weight: 600; }
      .answer-preview { font-size: 1.2rem; color: var(--purple); min-width: 24px; }

      .check-btn {
        font-size: 1rem; padding: 12px 36px;
      }
      .eq-feedback {
        margin-top: 12px; font-weight: 700; font-size: 0.95rem;
        min-height: 24px; transition: all 0.3s;
      }
      .eq-feedback.correct { color: var(--green); }
      .eq-feedback.partial { color: #d97706; }
      .eq-feedback.wrong { color: var(--red); }
      .eq-feedback.warning { color: #d97706; }
      .word-card.correct-card {
        border: 3px solid var(--green); background: var(--green-light);
      }
      @media (max-height: 600px) {
        .word-card { padding: 18px 24px; }
        .word-emoji { font-size: 2rem; margin-bottom: 8px; }
        .word-text { font-size: 0.95rem; margin-bottom: 12px; }
        .eq-input, .eq-operator { width: 52px; height: 44px; font-size: 1.2rem; }
      }
    </style>`;
  }

  function getActivityStyles() {
    return `<style>
      .activity-area {
        display: flex; flex-direction: column; align-items: center;
        gap: 14px; width: 100%; max-width: 900px;
      }
      .word-steps { display: flex; gap: 12px; }
      .step-badge {
        padding: 6px 16px; border-radius: var(--radius-full);
        font-size: 0.85rem; font-weight: 700;
        background: var(--border); color: var(--text-light);
      }
      .step-badge.active {
        background: var(--purple); color: white;
        box-shadow: 0 2px 8px rgba(192,132,252,0.4);
      }
      .step-badge.done { background: var(--green); color: white; }
      .activity-hint {
        font-size: 0.9rem; font-weight: 600; color: var(--text-light);
        text-align: center; max-width: 500px;
      }
      .activity-layout {
        display: flex; align-items: flex-start; gap: 24px; width: 100%;
      }
      .item-pool {
        background: white; border-radius: var(--radius-lg);
        padding: 16px; box-shadow: var(--shadow-md);
        min-width: 160px; flex-shrink: 0;
      }
      .pool-label {
        font-size: 0.8rem; font-weight: 700; color: var(--text-light);
        text-align: center; margin-bottom: 10px; padding-bottom: 8px;
        border-bottom: 2px dashed var(--border);
      }
      .pool-items {
        display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
      }
      .drag-item {
        width: 44px; height: 44px; background: var(--bg);
        border: 2px solid var(--border); border-radius: var(--radius-md);
        display: flex; align-items: center; justify-content: center;
        font-size: 1.4rem; cursor: grab; user-select: none;
        transition: all 0.2s;
      }
      .drag-item:hover:not(.placed) {
        border-color: var(--purple); transform: scale(1.1);
      }
      .drag-item.selected {
        border-color: var(--purple); background: var(--purple-light);
        transform: scale(1.1); box-shadow: 0 0 0 3px rgba(192,132,252,0.3);
      }
      .drag-item.dragging { opacity: 0.5; transform: scale(0.9); }
      .drag-item.placed {
        opacity: 0.3; cursor: default; border-color: transparent;
        transform: scale(0.85);
      }
      .arrow-indicator {
        font-size: 2rem; color: var(--purple); align-self: center;
        flex-shrink: 0; animation: float 2s ease-in-out infinite;
      }
      .groups-area {
        display: flex; gap: 16px; flex-wrap: wrap; flex: 1;
        justify-content: center;
      }
      .drop-group {
        background: white; border-radius: var(--radius-lg);
        padding: 14px; box-shadow: var(--shadow-sm);
        border: 2px dashed var(--border); text-align: center;
        min-width: 120px; transition: all 0.3s;
      }
      .drop-group.group-complete {
        border-color: var(--green); border-style: solid;
        background: var(--green-light);
      }
      .group-header {
        display: flex; align-items: center; justify-content: center;
        gap: 6px; margin-bottom: 10px;
      }
      .group-emoji { font-size: 1.5rem; }
      .group-label {
        font-size: 0.8rem; font-weight: 700; color: var(--text);
        text-transform: capitalize;
      }
      .group-slots {
        display: flex; flex-wrap: wrap; gap: 6px;
        justify-content: center; min-height: 50px;
      }
      .group-slot {
        width: 42px; height: 42px;
        border: 2px dashed var(--purple-light);
        border-radius: var(--radius-sm);
        display: flex; align-items: center; justify-content: center;
        transition: all 0.2s; background: var(--bg);
      }
      .group-slot.drag-over {
        border-color: var(--purple); background: var(--purple-light);
        transform: scale(1.08);
      }
      .group-slot:has(.placed-emoji) {
        border-style: solid; border-color: var(--green); background: white;
      }
      .placed-emoji { font-size: 1.3rem; }
      .group-count {
        margin-top: 8px; font-size: 0.8rem; font-weight: 700;
        color: var(--text-light);
      }
      .count-num { color: var(--purple); }
      .drop-group.group-complete .count-num { color: var(--green); }
      @media (max-height: 600px) {
        .activity-layout { gap: 16px; }
        .drag-item { width: 36px; height: 36px; font-size: 1.1rem; }
        .group-slot { width: 36px; height: 36px; }
        .drop-group { padding: 10px; min-width: 100px; }
      }
    </style>`;
  }

  start();
}
