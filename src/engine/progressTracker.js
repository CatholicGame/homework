/**
 * Progress Tracker — Lưu tiến trình chơi vào localStorage
 */

const STORAGE_KEY = 'math_game_progress';

function loadAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Save progress for a game after completing a round
 * @param {string} gameId - e.g. 'flower-wheel'
 * @param {number} score - points scored this round
 * @param {number} correct - correct answers
 * @param {number} total - total questions
 */
export function saveProgress(gameId, score, correct, total) {
  const all = loadAll();
  const prev = all[gameId] || { bestScore: 0, totalPlays: 0, totalCorrect: 0, totalQuestions: 0 };

  all[gameId] = {
    bestScore: Math.max(prev.bestScore, score),
    totalPlays: prev.totalPlays + 1,
    totalCorrect: prev.totalCorrect + correct,
    totalQuestions: prev.totalQuestions + total,
    lastPlayed: Date.now(),
    lastScore: score,
    lastCorrect: correct,
    lastTotal: total,
  };

  saveAll(all);
}

/**
 * Get progress for a single game
 */
export function getProgress(gameId) {
  const all = loadAll();
  return all[gameId] || null;
}

/**
 * Get progress for all games
 */
export function getAllProgress() {
  return loadAll();
}

/**
 * Get summary stats across all games
 */
export function getDashboardStats() {
  const all = loadAll();
  const gameIds = Object.keys(all).filter(k => k !== '__exams__');

  let totalStars = 0;
  let totalPlays = 0;
  let totalCorrect = 0;
  let totalQuestions = 0;

  gameIds.forEach(id => {
    const g = all[id];
    totalStars += g.bestScore;
    totalPlays += g.totalPlays;
    totalCorrect += g.totalCorrect;
    totalQuestions += g.totalQuestions;
  });

  return {
    gamesPlayed: gameIds.length,
    totalStars,
    totalPlays,
    totalCorrect,
    totalQuestions,
    accuracy: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
  };
}

// ── EXAM HISTORY ──────────────────────────────────────────────────────────────

const EXAM_KEY = 'math_exam_history';

function loadExams() {
  try {
    return JSON.parse(localStorage.getItem(EXAM_KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Save an exam result
 * @param {object} result - { score, total, rank, timeUsed, questions, answers }
 */
export function saveExamResult(result) {
  const exams = loadExams();
  exams.unshift({
    ...result,
    id: Date.now(),
    date: new Date().toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    }),
  });
  // Keep max 20 results
  localStorage.setItem(EXAM_KEY, JSON.stringify(exams.slice(0, 20)));
}

/**
 * Get all exam history (sorted newest first)
 */
export function getExamHistory() {
  return loadExams();
}

/**
 * Get best exam result
 */
export function getBestExam() {
  const exams = loadExams();
  if (!exams.length) return null;
  return exams.reduce((best, e) => e.score > best.score ? e : best, exams[0]);
}

