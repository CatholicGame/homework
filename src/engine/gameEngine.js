/**
 * Game Engine Core — Scoring, Feedback, Confetti, Sounds
 */
import { saveProgress } from './progressTracker.js';

export class GameEngine {
  constructor({ totalQuestions = 10, onComplete = null, gameId = '' }) {
    this.totalQuestions = totalQuestions;
    this.currentQuestion = 0;
    this.score = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.startTime = Date.now();
    this.onComplete = onComplete;
    this.gameId = gameId;
  }

  /** Record a correct answer */
  recordCorrect() {
    this.score += 10;
    this.correctCount++;
    this.currentQuestion++;
    this.showFeedback(true);
    this.playSound('correct');
  }

  /** Record a wrong answer */
  recordWrong() {
    this.wrongCount++;
    this.showFeedback(false);
    this.playSound('wrong');
  }

  /** Check if game is finished */
  isFinished() {
    return this.currentQuestion >= this.totalQuestions;
  }

  /** Get progress percentage */
  getProgress() {
    return (this.currentQuestion / this.totalQuestions) * 100;
  }

  /** Get elapsed time in seconds */
  getElapsedTime() {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  /** Format time as MM:SS */
  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  /** Show emoji feedback overlay */
  showFeedback(isCorrect) {
    const overlay = document.createElement('div');
    overlay.className = 'feedback-overlay';
    overlay.innerHTML = `<span class="emoji">${isCorrect ? '⭐' : '😅'}</span>`;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 800);
  }

  /** Play correct/wrong sound (Web Audio API) */
  playSound(type) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.value = 0.15;

      if (type === 'correct') {
        osc.frequency.setValueAtTime(523, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      } else {
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.setValueAtTime(200, ctx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      // Audio not available, skip
    }
  }

  /** Show confetti celebration */
  showConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    const colors = ['#FF6B9D', '#C084FC', '#60A5FA', '#4ADE80', '#FBBF24', '#FB923C', '#22D3EE'];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 1.5 + 's';
      piece.style.animationDuration = (2 + Math.random() * 2) + 's';
      piece.style.width = (6 + Math.random() * 8) + 'px';
      piece.style.height = (6 + Math.random() * 8) + 'px';
      if (Math.random() > 0.5) piece.style.borderRadius = '50%';
      container.appendChild(piece);
    }
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 4000);
  }

  /** Show score popup */
  showScorePopup(onReplay, onHome) {
    const elapsed = this.getElapsedTime();
    const stars = this.correctCount === this.totalQuestions ? '⭐⭐⭐'
      : this.correctCount >= this.totalQuestions * 0.7 ? '⭐⭐'
      : this.correctCount >= this.totalQuestions * 0.4 ? '⭐' : '';

    const popup = document.createElement('div');
    popup.className = 'score-popup';
    popup.innerHTML = `
      <div class="score-popup-card">
        <span class="trophy">${this.correctCount === this.totalQuestions ? '🏆' : this.correctCount >= this.totalQuestions * 0.7 ? '🎉' : '💪'}</span>
        <h2>${this.correctCount === this.totalQuestions ? 'Xuất sắc!' : this.correctCount >= this.totalQuestions * 0.7 ? 'Giỏi lắm!' : 'Cố gắng thêm!'}</h2>
        <p class="score-text">Đúng ${this.correctCount}/${this.totalQuestions} câu  •  ${this.formatTime(elapsed)}</p>
        <div class="score-value">${stars || '🌟'}</div>
        <div class="popup-actions">
          <button class="btn btn-primary" id="popup-replay">🔄 Chơi lại</button>
          <button class="btn btn-blue" id="popup-home">🏠 Trang chủ</button>
        </div>
      </div>
    `;

    document.body.appendChild(popup);
    this.showConfetti();

    // Save progress
    if (this.gameId) {
      saveProgress(this.gameId, this.score, this.correctCount, this.totalQuestions);
    }

    popup.querySelector('#popup-replay').addEventListener('click', () => {
      popup.remove();
      if (onReplay) onReplay();
    });
    popup.querySelector('#popup-home').addEventListener('click', () => {
      popup.remove();
      if (onHome) onHome();
    });
  }
}

/** Render game header */
export function renderGameHeader({ title, onBack, extraStats = '' }) {
  return `
    <div class="game-header">
      <button class="back-btn" id="back-btn">← Quay lại</button>
      <span class="game-title">${title}</span>
      <div class="game-stats">
        ${extraStats}
        <div class="game-stat">
          <span class="stat-icon">⭐</span>
          <span class="stat-value" id="score-display">0</span>
        </div>
      </div>
    </div>
  `;
}

/** Update score display */
export function updateScoreDisplay(score) {
  const el = document.getElementById('score-display');
  if (el) el.textContent = score;
}

/** Render progress bar */
export function renderProgressBar(progress) {
  return `<div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>`;
}

/** Update progress bar */
export function updateProgressBar(progress) {
  const fill = document.querySelector('.progress-fill');
  if (fill) fill.style.width = progress + '%';
}

/** Shuffle array in place */
export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Pick N random items from array */
export function pickRandom(arr, n) {
  return shuffle([...arr]).slice(0, n);
}

/** Random integer between min and max (inclusive) */
export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Pick random from array */
export function randPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Render instruction banner */
export function renderInstruction(icon, text) {
  return `
    <div class="game-instruction" id="game-instruction">
      <span class="instruction-icon">${icon}</span>
      <span class="instruction-text">${text}</span>
      <button class="instruction-dismiss" onclick="this.closest('.game-instruction').remove()" title="Đóng">✕</button>
    </div>
  `;
}
