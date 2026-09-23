/**
 * Main Entry Point — Toán Lớp 2 Interactive Games
 */

import { renderHome } from './games/home.js';
import { initVirtualKeyboard } from './engine/virtualKeyboard.js';
import { initLightbox } from './engine/lightbox.js';
import { initKeyboardInset } from './engine/keyboardInset.js';

// Init virtual keyboard globally — auto-attaches to all number inputs
initVirtualKeyboard();

// Init image lightbox globally — tap any question illustration to enlarge it
initLightbox();

// Keep #app above the native (iPad) keyboard / our number pad while one is open
initKeyboardInset();

// Fullscreen toggle — persists across every page (home + all games)
function initFullscreenButton() {
  const btn = document.createElement('button');
  btn.id = 'global-fullscreen-btn';
  btn.type = 'button';

  const sync = () => {
    const active = !!document.fullscreenElement;
    btn.textContent = active ? '⤡' : '⤢';
    btn.title = active ? 'Thoát toàn màn hình' : 'Toàn màn hình';
  };
  sync();

  btn.onclick = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.();
    }
  };

  document.addEventListener('fullscreenchange', sync);
  document.body.appendChild(btn);
}

initFullscreenButton();


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
    'giao-ly': () => import('./games/giaoly.js'),
    'grade3-exam': () => import('./games/grade3Exam.js'),
    'grade3-workbook': () => import('./games/grade3Workbook.js'),
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
