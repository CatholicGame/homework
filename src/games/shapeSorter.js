/**
 * Game 6: Shape Sorter — Phân Loại Hình Khối 3D (with Three.js 3D shapes)
 */
import { GameEngine, renderGameHeader, renderInstruction, updateScoreDisplay, updateProgressBar } from '../engine/gameEngine.js';
import { genShapeSorter } from '../generators/questionGenerators.js';
import { create3DShape, create3DPreview, SHAPE_TYPE_MAP } from '../engine/shape3D.js';

export function render(app, onHome) {
  let engine, questions, currentIdx;
  let activeDisposers = []; // Track 3D renderers to clean up

  function cleanUp3D() {
    activeDisposers.forEach(d => d());
    activeDisposers = [];
  }

  function start() {
    cleanUp3D();
    questions = genShapeSorter();
    currentIdx = 0;
    engine = new GameEngine({ totalQuestions: questions.length, gameId: 'shape-sorter' });
    showQuestion();
  }

  function showQuestion() {
    cleanUp3D();
    const q = questions[currentIdx];
    if (q.type === 'sort') {
      showSortRound(q);
    } else {
      showPropertyQuestion(q);
    }
  }

  // ========== SORT ROUND (drag & drop with 3D bins) ==========
  function showSortRound(q) {
    const itemsHTML = q.items.map((it, i) => `
      <div class="sort-item" data-idx="${i}" data-shape-id="${it.correctShapeId}" draggable="true">
        <span class="sort-item-emoji">${it.emoji}</span>
        <span class="sort-item-name">${it.item}</span>
      </div>
    `).join('');

    const binsHTML = q.bins.map(bin => `
      <div class="sort-bin" data-bin-id="${bin.id}">
        <div class="bin-3d-container" id="bin3d-${bin.id}"></div>
        <div class="bin-title">${bin.name}</div>
        <div class="bin-drop-area" data-bin-id="${bin.id}">
          <span class="bin-placeholder">Thả vào đây</span>
        </div>
        <div class="bin-counter"><span id="bin-count-${bin.id}">0</span> vật</div>
      </div>
    `).join('');

    app.innerHTML = `
      <div class="game-container">
        ${renderGameHeader({ title: '🔷 Phân Loại Hình Khối' })}
        <div class="progress-bar"><div class="progress-fill" style="width:${engine.getProgress()}%"></div></div>
        ${renderInstruction('🖐️', `<strong>${q.instruction}</strong>. Xoay hình 3D để quan sát, rồi bấm chọn vật → bấm vào khay.`)}
        <div class="game-body">
          <div class="sort-area animate-fadeIn">
            <div class="sort-counter">Câu ${currentIdx + 1}/${questions.length}</div>
            <div class="sort-layout">
              <div class="sort-pool" id="sort-pool">
                <div class="pool-title">Các đồ vật</div>
                ${itemsHTML}
              </div>
              <div class="sort-arrow">➜</div>
              <div class="sort-bins-area" id="sort-bins">
                ${binsHTML}
              </div>
            </div>
          </div>
        </div>
      </div>
      ${getSortStyles()}
    `;

    document.getElementById('back-btn').addEventListener('click', () => { cleanUp3D(); onHome(); });

    // Init 3D previews for bins
    setTimeout(() => {
      q.bins.forEach(bin => {
        const shapeType = SHAPE_TYPE_MAP[bin.id];
        if (shapeType) {
          const result = create3DPreview(`bin3d-${bin.id}`, shapeType, 90);
          if (result) activeDisposers.push(result.dispose);
        }
      });
    }, 50);

    setupSortInteraction(q);
  }

  function setupSortInteraction(q) {
    let selectedItem = null;
    const pool = document.getElementById('sort-pool');
    const binCounts = {};
    q.bins.forEach(b => binCounts[b.id] = 0);
    let totalPlaced = 0;

    pool.addEventListener('click', (e) => {
      const item = e.target.closest('.sort-item');
      if (!item || item.classList.contains('placed')) return;
      if (selectedItem) selectedItem.classList.remove('selected');
      selectedItem = item;
      item.classList.add('selected');
    });

    document.getElementById('sort-bins').addEventListener('click', (e) => {
      const dropArea = e.target.closest('.bin-drop-area');
      if (!dropArea || !selectedItem) return;

      const binId = dropArea.dataset.binId;
      const itemShapeId = selectedItem.dataset.shapeId;

      if (itemShapeId === binId) {
        placeInBin(selectedItem, dropArea, binId, q, binCounts);
        totalPlaced++;
        selectedItem = null;
        if (totalPlaced === q.items.length) onSortComplete();
      } else {
        engine.playSound('wrong');
        selectedItem.classList.add('wrong-item');
        dropArea.closest('.sort-bin').classList.add('wrong-bin');
        setTimeout(() => {
          selectedItem?.classList.remove('wrong-item');
          dropArea.closest('.sort-bin').classList.remove('wrong-bin');
        }, 500);
      }
    });

    // Drag and drop
    pool.addEventListener('dragstart', (e) => {
      const item = e.target.closest('.sort-item');
      if (!item || item.classList.contains('placed')) { e.preventDefault(); return; }
      e.dataTransfer.setData('text/plain', item.dataset.idx);
      item.classList.add('dragging');
    });
    pool.addEventListener('dragend', (e) => {
      const item = e.target.closest('.sort-item');
      if (item) item.classList.remove('dragging');
    });

    document.querySelectorAll('.bin-drop-area').forEach(area => {
      area.addEventListener('dragover', (e) => { e.preventDefault(); area.classList.add('drag-over'); });
      area.addEventListener('dragleave', () => area.classList.remove('drag-over'));
      area.addEventListener('drop', (e) => {
        e.preventDefault();
        area.classList.remove('drag-over');
        const idx = e.dataTransfer.getData('text/plain');
        const item = pool.querySelector(`[data-idx="${idx}"]`);
        if (!item) return;
        const binId = area.dataset.binId;
        if (item.dataset.shapeId === binId) {
          placeInBin(item, area, binId, q, binCounts);
          totalPlaced++;
          if (totalPlaced === q.items.length) onSortComplete();
        } else {
          engine.playSound('wrong');
          item.classList.add('wrong-item');
          area.closest('.sort-bin').classList.add('wrong-bin');
          setTimeout(() => {
            item.classList.remove('wrong-item');
            area.closest('.sort-bin').classList.remove('wrong-bin');
          }, 500);
        }
      });
    });

    function onSortComplete() {
      engine.recordCorrect();
      updateScoreDisplay(engine.score);
      currentIdx++;
      updateProgressBar(engine.getProgress());
      setTimeout(() => {
        if (currentIdx >= questions.length) {
          cleanUp3D();
          engine.showScorePopup(start, () => { cleanUp3D(); onHome(); });
        } else {
          showQuestion();
        }
      }, 800);
    }
  }

  function placeInBin(item, dropArea, binId, q, binCounts) {
    const tag = document.createElement('div');
    tag.className = 'bin-tag animate-bounceIn';
    tag.innerHTML = `<span>${item.querySelector('.sort-item-emoji').textContent}</span> ${item.querySelector('.sort-item-name').textContent}`;
    dropArea.appendChild(tag);

    const placeholder = dropArea.querySelector('.bin-placeholder');
    if (placeholder) placeholder.style.display = 'none';

    item.classList.add('placed');
    item.classList.remove('selected', 'dragging');
    item.draggable = false;

    binCounts[binId]++;
    document.getElementById(`bin-count-${binId}`).textContent = binCounts[binId];
    engine.playSound('correct');
  }

  // ========== PROPERTY QUESTION (with big 3D shape) ==========
  function showPropertyQuestion(q) {
    // Determine which shape to show in 3D (if the question is about a specific shape)
    let shape3dId = null;
    const shapeNames = { 'Khối cầu': 'sphere', 'Khối trụ': 'cylinder', 'Khối lập phương': 'cube', 'Khối hộp chữ nhật': 'rectangular' };
    for (const [name, id] of Object.entries(shapeNames)) {
      if (q.text.includes(name) && !q.text.includes(' và ') && !q.text.includes('nào')) {
        shape3dId = id;
        break;
      }
    }

    const optionsHTML = q.options.map((opt, i) => `
      <button class="prop-option" data-value="${opt}" id="opt-${i}">
        ${opt}
      </button>
    `).join('');

    app.innerHTML = `
      <div class="game-container">
        ${renderGameHeader({ title: '🔷 Phân Loại Hình Khối' })}
        <div class="progress-bar"><div class="progress-fill" style="width:${engine.getProgress()}%"></div></div>
        ${renderInstruction('💡', 'Đọc câu hỏi, <strong>xoay hình 3D</strong> để quan sát rồi <strong>chọn đáp án</strong>.')}
        <div class="game-body">
          <div class="prop-area animate-fadeIn">
            <div class="sort-counter">Câu ${currentIdx + 1}/${questions.length}</div>
            <div class="prop-layout">
              <div class="prop-3d-panel">
                <div class="shape-3d-viewer" id="shape3d-main"></div>
                <div class="shape-3d-hint">🖱️ Kéo để xoay</div>
                ${!shape3dId ? `
                  <div class="shape-3d-shelf">
                    <div class="shelf-item" id="shelf-sphere"><div class="shelf-3d" id="shelf3d-sphere"></div><span>Khối cầu</span></div>
                    <div class="shelf-item" id="shelf-cylinder"><div class="shelf-3d" id="shelf3d-cylinder"></div><span>Khối trụ</span></div>
                    <div class="shelf-item" id="shelf-cube"><div class="shelf-3d" id="shelf3d-cube"></div><span>K. lập phương</span></div>
                    <div class="shelf-item" id="shelf-rectangular"><div class="shelf-3d" id="shelf3d-rectangular"></div><span>K. hộp CN</span></div>
                  </div>
                ` : ''}
              </div>
              <div class="prop-card">
                <div class="prop-icon">🤔</div>
                <div class="prop-text">${q.text}</div>
                <div class="prop-options ${q.options.length === 2 ? 'two-cols' : 'four-cols'}">
                  ${optionsHTML}
                </div>
                <div class="prop-feedback" id="prop-feedback"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ${getPropertyStyles()}
    `;

    document.getElementById('back-btn').addEventListener('click', () => { cleanUp3D(); onHome(); });

    // Init 3D shape(s)
    setTimeout(() => {
      if (shape3dId) {
        // Show one big shape
        const result = create3DShape('shape3d-main', shape3dId, { width: 220, height: 220, autoRotate: true, interactive: true });
        if (result) activeDisposers.push(result.dispose);
      } else {
        // Show all 4 shapes on a shelf for comparison
        ['sphere', 'cylinder', 'cube', 'rectangular'].forEach(type => {
          const result = create3DPreview(`shelf3d-${type}`, type, 70);
          if (result) activeDisposers.push(result.dispose);
        });
      }
    }, 50);

    app.querySelectorAll('.prop-option').forEach(btn => {
      btn.addEventListener('click', () => handlePropertyAnswer(btn, q));
    });

    // Clicking a shelf item shows it big
    if (!shape3dId) {
      app.querySelectorAll('.shelf-item').forEach(item => {
        item.addEventListener('click', () => {
          const type = item.id.replace('shelf-', '');
          // Remove old main 3D
          const mainContainer = document.getElementById('shape3d-main');
          mainContainer.innerHTML = '';
          // Dispose old main
          if (activeDisposers.length > 4) {
            activeDisposers[4]();
            activeDisposers.splice(4, 1);
          }
          const result = create3DShape('shape3d-main', type, { width: 220, height: 220, autoRotate: true, interactive: true });
          if (result) activeDisposers.push(result.dispose);
          // Highlight active shelf item
          app.querySelectorAll('.shelf-item').forEach(s => s.classList.remove('active'));
          item.classList.add('active');
        });
      });
    }
  }

  function handlePropertyAnswer(btn, q) {
    const chosen = btn.dataset.value;
    const feedback = document.getElementById('prop-feedback');

    if (q.correctAnswers.includes(chosen)) {
      btn.classList.add('correct');
      feedback.innerHTML = '🎉 Chính xác!';
      feedback.className = 'prop-feedback correct';
      engine.recordCorrect();
      updateScoreDisplay(engine.score);
      currentIdx++;
      updateProgressBar(engine.getProgress());
      app.querySelectorAll('.prop-option').forEach(b => b.disabled = true);

      setTimeout(() => {
        if (currentIdx >= questions.length) {
          cleanUp3D();
          engine.showScorePopup(start, () => { cleanUp3D(); onHome(); });
        } else {
          showQuestion();
        }
      }, 800);
    } else {
      btn.classList.add('wrong');
      feedback.innerHTML = '❌ Chưa đúng, thử lại!';
      feedback.className = 'prop-feedback wrong';
      engine.recordWrong();
      setTimeout(() => {
        btn.classList.remove('wrong');
        feedback.innerHTML = '';
      }, 600);
    }
  }

  // ========== STYLES ==========
  function getSortStyles() {
    return `<style>
      .sort-area {
        display: flex; flex-direction: column; align-items: center;
        gap: 14px; width: 100%; max-width: 1000px;
      }
      .sort-counter { font-weight: 600; color: var(--text-light); font-size: 0.9rem; }
      .sort-layout {
        display: flex; align-items: flex-start; gap: 24px; width: 100%;
      }
      .sort-pool {
        background: white; border-radius: var(--radius-lg);
        padding: 16px; box-shadow: var(--shadow-md);
        min-width: 180px; flex-shrink: 0;
      }
      .pool-title {
        font-size: 0.85rem; font-weight: 700; color: var(--text-light);
        text-align: center; margin-bottom: 10px; padding-bottom: 8px;
        border-bottom: 2px dashed var(--border);
      }
      .sort-item {
        display: flex; align-items: center; gap: 8px;
        padding: 10px 14px; margin-bottom: 6px;
        background: var(--bg); border: 2px solid var(--border);
        border-radius: var(--radius-md);
        cursor: grab; user-select: none; transition: all 0.2s;
      }
      .sort-item:hover:not(.placed) { border-color: var(--purple); transform: translateX(4px); }
      .sort-item.selected {
        border-color: var(--purple); background: var(--purple-light);
        box-shadow: 0 0 0 3px rgba(192,132,252,0.3);
      }
      .sort-item.placed { opacity: 0.3; cursor: default; border-color: transparent; }
      .sort-item.wrong-item { border-color: var(--red); background: var(--red-light); animation: shake 0.4s; }
      .sort-item.dragging { opacity: 0.4; }
      .sort-item-emoji { font-size: 1.3rem; }
      .sort-item-name { font-size: 0.9rem; font-weight: 600; color: var(--text); }
      .sort-arrow {
        font-size: 2rem; color: var(--purple); align-self: center;
        flex-shrink: 0; animation: float 2s ease-in-out infinite;
      }
      .sort-bins-area {
        display: flex; gap: 14px; flex-wrap: wrap; flex: 1; justify-content: center;
      }
      .sort-bin {
        background: white; border-radius: var(--radius-lg);
        padding: 12px 14px; box-shadow: var(--shadow-sm);
        border: 2px dashed var(--border); text-align: center;
        min-width: 150px; flex: 1; max-width: 220px; transition: all 0.3s;
      }
      .sort-bin.wrong-bin { border-color: var(--red); background: var(--red-light); animation: shake 0.3s; }
      .bin-3d-container {
        width: 90px; height: 90px; margin: 0 auto 6px;
        border-radius: var(--radius-md);
      }
      .bin-3d-container canvas { border-radius: var(--radius-md); }
      .bin-title {
        font-weight: 700; font-size: 0.85rem; color: var(--purple);
        margin-bottom: 8px; padding-bottom: 6px;
        border-bottom: 2px solid var(--purple-light);
      }
      .bin-drop-area {
        min-height: 50px; padding: 6px; border-radius: var(--radius-sm);
        display: flex; flex-direction: column; gap: 4px; transition: all 0.2s;
      }
      .bin-drop-area.drag-over { background: var(--purple-light); }
      .bin-placeholder {
        color: var(--text-light); font-size: 0.75rem; font-style: italic;
        text-align: center; padding: 10px 0;
      }
      .bin-tag {
        background: var(--green-light); border: 1px solid var(--green);
        border-radius: var(--radius-sm); padding: 5px 8px;
        font-size: 0.75rem; font-weight: 600; color: #166534;
        display: flex; align-items: center; gap: 4px;
      }
      .bin-counter { margin-top: 6px; font-size: 0.7rem; font-weight: 700; color: var(--text-light); }
      @media (max-height: 600px) {
        .sort-layout { gap: 16px; }
        .sort-item { padding: 8px 10px; }
        .sort-bin { padding: 8px; min-width: 120px; }
        .bin-3d-container { width: 70px; height: 70px; }
      }
    </style>`;
  }

  function getPropertyStyles() {
    return `<style>
      .prop-area {
        display: flex; flex-direction: column; align-items: center;
        gap: 12px; width: 100%; max-width: 900px;
      }
      .prop-layout {
        display: flex; gap: 24px; width: 100%; align-items: flex-start;
      }
      .prop-3d-panel {
        background: white; border-radius: var(--radius-xl);
        padding: 16px; box-shadow: var(--shadow-lg);
        display: flex; flex-direction: column; align-items: center;
        gap: 8px; flex-shrink: 0;
      }
      .shape-3d-viewer {
        width: 220px; height: 220px;
        border-radius: var(--radius-lg);
        overflow: hidden;
      }
      .shape-3d-viewer canvas { border-radius: var(--radius-lg); }
      .shape-3d-hint {
        font-size: 0.7rem; color: var(--text-light); font-weight: 600;
      }
      .shape-3d-shelf {
        display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
        width: 100%;
      }
      .shelf-item {
        display: flex; flex-direction: column; align-items: center;
        gap: 2px; padding: 6px;
        border: 2px solid var(--border); border-radius: var(--radius-sm);
        cursor: pointer; transition: all 0.2s;
      }
      .shelf-item:hover { border-color: var(--purple); background: var(--purple-light); }
      .shelf-item.active {
        border-color: var(--purple); background: var(--purple-light);
        box-shadow: 0 0 0 2px rgba(192,132,252,0.3);
      }
      .shelf-item span { font-size: 0.65rem; font-weight: 700; color: var(--text); }
      .shelf-3d {
        width: 70px; height: 70px; overflow: hidden;
        border-radius: var(--radius-sm);
      }
      .shelf-3d canvas { border-radius: var(--radius-sm); }
      .prop-card {
        background: white; border-radius: var(--radius-xl);
        padding: 28px 32px; box-shadow: var(--shadow-lg);
        text-align: center; flex: 1;
      }
      .prop-icon { font-size: 2.2rem; margin-bottom: 10px; }
      .prop-text {
        font-size: 1.1rem; font-weight: 700; color: var(--text);
        line-height: 1.6; margin-bottom: 20px;
      }
      .prop-options { display: grid; gap: 10px; }
      .prop-options.two-cols { grid-template-columns: 1fr 1fr; }
      .prop-options.four-cols { grid-template-columns: 1fr 1fr; }
      .prop-option {
        padding: 12px 14px; border: 2px solid var(--border);
        border-radius: var(--radius-md); background: var(--bg);
        font-family: var(--font); font-size: 0.9rem; font-weight: 600;
        color: var(--text); cursor: pointer; transition: all 0.2s;
        text-align: left;
      }
      .prop-option:hover { border-color: var(--purple); background: var(--purple-light); transform: translateY(-2px); }
      .prop-option.correct { border-color: var(--green); background: var(--green); color: white; }
      .prop-option.wrong { border-color: var(--red); background: var(--red); color: white; animation: shake 0.4s; }
      .prop-feedback { margin-top: 12px; font-weight: 700; font-size: 0.95rem; min-height: 24px; }
      .prop-feedback.correct { color: var(--green); }
      .prop-feedback.wrong { color: var(--red); }
      @media (max-height: 600px) {
        .prop-layout { gap: 16px; }
        .shape-3d-viewer { width: 160px; height: 160px; }
        .prop-card { padding: 16px 20px; }
        .prop-option { padding: 8px 10px; font-size: 0.8rem; }
      }
    </style>`;
  }

  start();
}
