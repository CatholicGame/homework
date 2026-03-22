/**
 * Exam — Kiểm Tra Tổng Hợp
 * 20 câu trắc nghiệm, 15 phút, chứng nhận kết quả
 */
import { genExam, getGrade, COMMENTS, EXAM_DURATION } from '../generators/examGenerator.js';
import { saveExamResult } from '../engine/progressTracker.js';

export function render(app, onBack) {
  let questions = [];
  let answers = [];       // index of chosen option string per question
  let currentIdx = 0;
  let timerSeconds = EXAM_DURATION;
  let timerInterval = null;
  let examStartTime = null;
  let phase = 'intro';    // 'intro' | 'quiz' | 'result'

  // ── INTRO SCREEN ────────────────────────────────────────────────────────────
  function showIntro() {
    phase = 'intro';
    app.innerHTML = `
      <div class="exam-container">
        <div class="exam-intro animate-fadeIn">
          <div class="exam-intro-icon">📝</div>
          <h1>Kiểm Tra Tổng Hợp</h1>
          <p class="exam-intro-sub">Toán Lớp 2 — Bài Kiểm Tra Cuối Kỳ</p>
          <div class="exam-intro-rules">
            <div class="rule-item">🕐 <span><strong>15 phút</strong> làm bài</span></div>
            <div class="rule-item">📋 <span><strong>20 câu</strong> trắc nghiệm 4 đáp án</span></div>
            <div class="rule-item">📚 <span>Phủ đủ <strong>6 chủ đề</strong>: Nhân÷Chia, So Sánh, Dãy Số, Hình Khối, Toán Đố, Tư Duy</span></div>
            <div class="rule-item">🏆 <span>Xếp hạng <strong>A+ / A / B / C / D</strong></span></div>
            <div class="rule-item">💡 <span>Bấm chọn đáp án → tự động sang câu tiếp</span></div>
          </div>
          <div class="exam-intro-actions">
            <button class="btn btn-primary exam-start-btn" id="exam-start">🚀 Bắt Đầu Kiểm Tra!</button>
            <button class="btn btn-ghost" id="exam-back">← Quay lại</button>
          </div>
        </div>
      </div>
    `;
    app.querySelector('#exam-start').addEventListener('click', startExam);
    app.querySelector('#exam-back').addEventListener('click', onBack);
  }

  // ── QUIZ ─────────────────────────────────────────────────────────────────────
  function startExam() {
    questions = genExam();
    answers = new Array(questions.length).fill(null);
    currentIdx = 0;
    timerSeconds = EXAM_DURATION;
    examStartTime = Date.now();
    phase = 'quiz';
    renderQuiz();
    // Start timer
    timerInterval = setInterval(() => {
      timerSeconds--;
      updateTimer();
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        finishExam(true); // time-up
      }
    }, 1000);
  }

  function renderQuiz() {
    const q = questions[currentIdx];
    const progressPct = (currentIdx / questions.length) * 100;

    app.innerHTML = `
      <div class="exam-container quiz-phase">
        <!-- Top bar -->
        <div class="exam-topbar">
          <div class="exam-timer" id="exam-timer">
            <span class="timer-icon">⏱</span>
            <span id="timer-display">${formatTime(timerSeconds)}</span>
          </div>
          <div class="exam-progress-info">Câu <strong>${currentIdx + 1}</strong> / ${questions.length}</div>
          <div class="exam-topic-badge">${q.topic}</div>
        </div>
        <!-- Progress bar -->
        <div class="exam-progress-track">
          <div class="exam-progress-fill" style="width: ${progressPct}%"></div>
        </div>

        <!-- Question -->
        <div class="exam-question-wrap animate-fadeIn">
          <div class="exam-question-card">
            <div class="exam-q-number">Câu ${currentIdx + 1}</div>
            <div class="exam-q-text">${q.text.replace(/\n/g, '<br>')}</div>
          </div>
          <div class="exam-options-grid">
            ${q.options.map((opt, i) => `
              <button class="exam-option" data-opt="${opt}" data-idx="${i}">
                <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
                <span class="opt-text">${opt}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Bottom nav -->
        <div class="exam-bottom-bar">
          <div class="exam-dots">
            ${questions.map((_, i) => `
              <div class="exam-dot ${i < currentIdx ? (answers[i] !== null ? 'answered' : 'skipped') : i === currentIdx ? 'current' : ''}"></div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Attach option click handlers
    app.querySelectorAll('.exam-option').forEach(btn => {
      btn.addEventListener('click', () => chooseAnswer(btn.dataset.opt));
    });
  }

  function updateTimer() {
    const display = document.getElementById('timer-display');
    const timerEl = document.getElementById('exam-timer');
    if (!display) return;
    display.textContent = formatTime(timerSeconds);
    if (timerSeconds <= 120) {
      timerEl?.classList.add('timer-warning');
    }
    if (timerSeconds <= 30) {
      timerEl?.classList.add('timer-critical');
    }
  }

  function chooseAnswer(opt) {
    answers[currentIdx] = opt;

    // Flash the selected option briefly
    const btn = app.querySelector(`[data-opt="${opt}"]`);
    if (btn) {
      btn.classList.add('selected');
    }

    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        currentIdx++;
        renderQuiz();
      } else {
        clearInterval(timerInterval);
        finishExam(false);
      }
    }, 280);
  }

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  // ── RESULTS / CERTIFICATE ────────────────────────────────────────────────────
  function finishExam(timeUp = false) {
    phase = 'result';
    const timeUsed = Math.floor((Date.now() - examStartTime) / 1000);
    const score = questions.reduce((sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0), 0);
    const grade = getGrade(score);
    const commentList = COMMENTS[grade.rank];
    const comment = commentList[Math.floor(Math.random() * commentList.length)];
    const pct = Math.round((score / questions.length) * 100);

    // Save to history (include full question+answer data for replay)
    const result = {
      score,
      total: questions.length,
      pct,
      rank: grade.rank,
      rankLabel: grade.label,
      rankColor: grade.color,
      rankBg: grade.bg,
      rankEmoji: grade.emoji,
      timeUsed,
      comment,
      timeUp,
      questions: questions.map(q => ({
        text: q.text,
        topic: q.topic,
        options: q.options,
        answer: q.answer,
      })),
      answers: [...answers],
    };
    saveExamResult(result);

    renderCertificate(result);
  }

  function renderCertificate(result, readOnly = false) {
    const { score, total, pct, rank, rankLabel, rankColor, rankBg, rankEmoji, timeUsed, comment, timeUp, questions: qs, answers: ans } = result;
    const dateStr = result.date || new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = formatTime(timeUsed);
    const wrongCount = total - score;

    // Build per-question review
    const reviewHtml = qs.map((q, i) => {
      const chosen = ans[i];
      const correct = chosen === q.answer;
      return `
        <div class="review-item ${correct ? 'correct' : 'wrong'}">
          <div class="review-num">${correct ? '✅' : '❌'} Câu ${i + 1}</div>
          <div class="review-q">${q.text.replace(/\n/g, ' ')}</div>
          ${!correct ? `<div class="review-ans">Đáp án đúng: <strong>${q.answer}</strong>${chosen ? ` · Em chọn: <span class="wrong-ans">${chosen}</span>` : ' · (chưa trả lời)'}</div>` : ''}
          <div class="review-topic">📌 ${q.topic}</div>
        </div>
      `;
    }).join('');

    app.innerHTML = `
      <div class="exam-container result-phase">
        ${!readOnly ? `
        <div class="result-topbar">
          <button class="btn btn-ghost btn-sm" id="cert-home">🏠 Trang chủ</button>
          <button class="btn btn-blue btn-sm" id="cert-new">✨ Kiểm Tra Mới</button>
          <button class="btn btn-ghost btn-sm" id="cert-retry">📋 Xem lại bài</button>
        </div>` : `
        <div class="result-topbar">
          <button class="btn btn-ghost btn-sm" id="cert-back-history">← Quay lại</button>
        </div>`}

        <!-- CERTIFICATE -->
        <div class="certificate animate-fadeIn" style="--rank-color: ${rankColor}; --rank-bg: ${rankBg}">
          <div class="cert-border">
            <div class="cert-header">
              <div class="cert-logo">🎓</div>
              <div class="cert-title">CHỨNG NHẬN KẾT QUẢ KIỂM TRA</div>
              <div class="cert-subtitle">Toán Lớp 2 — Kiểm Tra Tổng Hợp</div>
            </div>

            <div class="cert-main">
              <!-- Rank badge -->
              <div class="cert-rank-badge">
                <div class="rank-ring">
                  <div class="rank-inner">
                    <div class="rank-emoji">${rankEmoji}</div>
                    <div class="rank-letter">${rank}</div>
                    <div class="rank-label">${rankLabel}</div>
                  </div>
                </div>
              </div>

              <!-- Score display -->
              <div class="cert-score-section">
                <div class="cert-score-big">
                  <span class="score-num">${score}</span>
                  <span class="score-sep">/</span>
                  <span class="score-total">${total}</span>
                </div>
                <div class="cert-score-pct">${pct}% Chính Xác</div>
                <div class="cert-score-bar">
                  <div class="cert-score-fill" style="width: ${pct}%; background: ${rankColor}"></div>
                </div>
              </div>
            </div>

            <!-- Stats row -->
            <div class="cert-stats">
              <div class="cert-stat">
                <div class="cert-stat-val" style="color:${rankColor}">${score}</div>
                <div class="cert-stat-lbl">✅ Đúng</div>
              </div>
              <div class="cert-stat">
                <div class="cert-stat-val" style="color:#EF4444">${wrongCount}</div>
                <div class="cert-stat-lbl">❌ Sai</div>
              </div>
              <div class="cert-stat">
                <div class="cert-stat-val">${timeStr}</div>
                <div class="cert-stat-lbl">⏱ Thời gian</div>
              </div>
              <div class="cert-stat">
                <div class="cert-stat-val">${dateStr}</div>
                <div class="cert-stat-lbl">📅 Ngày thi</div>
              </div>
            </div>

            ${timeUp ? '<div class="cert-timeup">⏰ Hết giờ — bài tự nộp</div>' : ''}

            <!-- Comment -->
            <div class="cert-comment" style="border-left-color: ${rankColor}">
              <div class="cert-comment-label">💬 Nhận xét của giáo viên</div>
              <div class="cert-comment-text">"${comment}"</div>
            </div>

            <!-- Stamp decoration -->
            <div class="cert-stamp" style="border-color: ${rankColor}; color: ${rankColor}">${rank}</div>
          </div>
        </div>

        <!-- Review section -->
        <div class="review-section">
          <h3 class="review-title">📋 Chi Tiết Từng Câu</h3>
          <div class="review-list">${reviewHtml}</div>
        </div>

        ${!readOnly ? `
        <div class="result-bottom-actions">
          <button class="btn btn-ghost" id="cert-home2">🏠 Trang chủ</button>
          <button class="btn btn-blue btn-lg" id="cert-new2">✨ Kiểm Tra Mới</button>
          <button class="btn btn-ghost" id="cert-retry2">📋 Xem lại bài</button>
        </div>` : ''}
      </div>
    `;

    if (!readOnly) {
      app.querySelector('#cert-home')?.addEventListener('click', onBack);
      app.querySelector('#cert-home2')?.addEventListener('click', onBack);
      // "Kiểm Tra Mới" — skip intro, immediately start fresh exam with new questions
      app.querySelector('#cert-new')?.addEventListener('click', startExam);
      app.querySelector('#cert-new2')?.addEventListener('click', startExam);
      // "Xem lại bài" — go back to intro screen
      app.querySelector('#cert-retry')?.addEventListener('click', showIntro);
      app.querySelector('#cert-retry2')?.addEventListener('click', showIntro);
    } else {
      app.querySelector('#cert-back-history')?.addEventListener('click', onBack);
    }

    // Animate score fill after a delay
    setTimeout(() => {
      const fill = app.querySelector('.cert-score-fill');
      if (fill) fill.style.transition = 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }, 100);
  }

  // Start with intro
  showIntro();
}

/**
 * Render a read-only certificate from a saved exam result
 * Used when clicking history item from home page
 */
export function renderHistoryCertificate(app, result, onBack) {
  // We need a minimal wrapper to call renderCertificate logic
  // Just create a standalone view
  const { score, total, pct, rank, rankLabel, rankColor, rankBg, rankEmoji, timeUsed, comment, timeUp, questions: qs, answers: ans, date } = result;
  const dateStr = date || '—';
  const timeStr = formatTimeSecs(timeUsed);
  const wrongCount = total - score;

  function formatTimeSecs(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  const reviewHtml = (qs || []).map((q, i) => {
    const chosen = ans?.[i];
    const correct = chosen === q.answer;
    return `
      <div class="review-item ${correct ? 'correct' : 'wrong'}">
        <div class="review-num">${correct ? '✅' : '❌'} Câu ${i + 1}</div>
        <div class="review-q">${q.text.replace(/\n/g, ' ')}</div>
        ${!correct ? `<div class="review-ans">Đáp án đúng: <strong>${q.answer}</strong>${chosen ? ` · Em chọn: <span class="wrong-ans">${chosen}</span>` : ' · (chưa trả lời)'}</div>` : ''}
        <div class="review-topic">📌 ${q.topic}</div>
      </div>
    `;
  }).join('');

  app.innerHTML = `
    <div class="exam-container result-phase">
      <div class="result-topbar">
        <button class="btn btn-ghost btn-sm" id="cert-back">← Quay lại</button>
      </div>

      <div class="certificate animate-fadeIn" style="--rank-color: ${rankColor}; --rank-bg: ${rankBg}">
        <div class="cert-border">
          <div class="cert-header">
            <div class="cert-logo">🎓</div>
            <div class="cert-title">CHỨNG NHẬN KẾT QUẢ KIỂM TRA</div>
            <div class="cert-subtitle">Toán Lớp 2 — Kiểm Tra Tổng Hợp</div>
          </div>
          <div class="cert-main">
            <div class="cert-rank-badge">
              <div class="rank-ring">
                <div class="rank-inner">
                  <div class="rank-emoji">${rankEmoji}</div>
                  <div class="rank-letter">${rank}</div>
                  <div class="rank-label">${rankLabel}</div>
                </div>
              </div>
            </div>
            <div class="cert-score-section">
              <div class="cert-score-big">
                <span class="score-num">${score}</span>
                <span class="score-sep">/</span>
                <span class="score-total">${total}</span>
              </div>
              <div class="cert-score-pct">${pct}% Chính Xác</div>
              <div class="cert-score-bar">
                <div class="cert-score-fill" style="width: ${pct}%; background: ${rankColor}; transition: width 1.2s cubic-bezier(0.34,1.56,0.64,1)"></div>
              </div>
            </div>
          </div>
          <div class="cert-stats">
            <div class="cert-stat"><div class="cert-stat-val" style="color:${rankColor}">${score}</div><div class="cert-stat-lbl">✅ Đúng</div></div>
            <div class="cert-stat"><div class="cert-stat-val" style="color:#EF4444">${wrongCount}</div><div class="cert-stat-lbl">❌ Sai</div></div>
            <div class="cert-stat"><div class="cert-stat-val">${timeStr}</div><div class="cert-stat-lbl">⏱ Thời gian</div></div>
            <div class="cert-stat"><div class="cert-stat-val">${dateStr}</div><div class="cert-stat-lbl">📅 Ngày thi</div></div>
          </div>
          <div class="cert-comment" style="border-left-color: ${rankColor}">
            <div class="cert-comment-label">💬 Nhận xét của giáo viên</div>
            <div class="cert-comment-text">"${comment}"</div>
          </div>
          <div class="cert-stamp" style="border-color: ${rankColor}; color: ${rankColor}">${rank}</div>
        </div>
      </div>

      ${reviewHtml ? `<div class="review-section">
        <h3 class="review-title">📋 Chi Tiết Từng Câu</h3>
        <div class="review-list">${reviewHtml}</div>
      </div>` : ''}
    </div>
  `;
  app.querySelector('#cert-back')?.addEventListener('click', onBack);
}
