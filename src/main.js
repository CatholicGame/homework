/**
 * Main Entry Point — Toán Lớp 2 Interactive Games
 */

import { renderHome } from './games/home.js';
import { initVirtualKeyboard } from './engine/virtualKeyboard.js';

// Init virtual keyboard globally — auto-attaches to all number inputs
initVirtualKeyboard();


// Router
function navigate(gameId) {
  const app = document.getElementById('app');
  app.innerHTML = '';

  if (!gameId || gameId === 'home') {
    renderHome(app, navigate);
    return;
  }

  // Dynamic import for each game
  const gameModules = {
    'flower-wheel': () => import('./games/flowerWheel.js'),
    'fill-table': () => import('./games/fillTable.js'),
    'drag-match': () => import('./games/dragMatch.js'),
    'quick-calc': () => import('./games/quickCalc.js'),
    'compare-op': () => import('./games/compareOp.js'),
    'shape-sorter': () => import('./games/shapeSorter.js'),
    'number-sequence': () => import('./games/numberSequence.js'),
    'word-problem': () => import('./games/wordProblem.js'),
    'path-maze': () => import('./games/pathMaze.js'),
    'number-thinker': () => import('./games/numberThinker.js'),
    'exam': () => import('./games/exam.js'),
  };

  const loader = gameModules[gameId];
  if (loader) {
    loader().then(mod => {
      mod.render(app, () => navigate('home'));
    });
  }
}

// Start
navigate('home');
