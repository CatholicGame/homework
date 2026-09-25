/**
 * Main Entry Point — Toán Tiểu Học
 */

import { renderHome } from './games/home.js';
import { renderLogin } from './games/login.js';
import { getCurrentUser, signOut } from './engine/auth.js';
import { creditLegacyProgress } from './engine/stars.js';
import { setLastGame } from './engine/activity.js';
import { isSetupDone, saveProfile } from './engine/profile.js';
import { renderProfileSetup } from './games/profileSetup.js';
import { syncMyScore, syncMyProfile, registerUser, fetchRemoteProfile, signOutLeaderboard, connectLeaderboard, NEEDS_CONNECT } from './engine/leaderboard.js';
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


// Màn hình chờ khi đang tải một sách/trò chơi (file lớn, mạng chậm)
function renderLoading(app) {
  app.innerHTML = `
    <div class="page-loading" role="status" aria-live="polite">
      <div class="page-loading-spinner"></div>
      <p>Đang tải bài tập…</p>
    </div>
  `;
}

function renderLoadError(app, onRetry, onBack) {
  app.innerHTML = `
    <div class="page-loading">
      <div class="page-loading-icon">📡</div>
      <p>Không tải được bài tập. Kiểm tra kết nối mạng rồi thử lại nhé.</p>
      <div class="page-loading-actions">
        <button type="button" class="btn btn-ghost" id="load-back">← Quay lại</button>
        <button type="button" class="btn btn-primary" id="load-retry">🔄 Thử lại</button>
      </div>
    </div>
  `;
  app.querySelector('#load-retry').onclick = onRetry;
  app.querySelector('#load-back').onclick = onBack;
}

// Hồ sơ đã thiết lập trên máy khác (điện thoại…) — hỏi Firebase một lần cho mỗi tài khoản.
const remoteChecked = new Set();
function restoreRemoteProfile(userId) {
  remoteChecked.add(userId);
  // Máy mới phải tải Firebase + đăng nhập + đọc 1–2 tài liệu: mạng chậm có thể quá 6 giây,
  // hết giờ là bé bị hỏi lại hồ sơ đã có — nên chờ lâu hơn.
  const timeout = new Promise(resolve => setTimeout(() => {
    console.warn('[profile] Hết 15 giây chờ Firebase — hiện màn thiết lập hồ sơ.');
    resolve(null);
  }, 15000));
  const remote = fetchRemoteProfile().catch((e) => {
    console.warn('[profile] Lỗi khi đọc hồ sơ từ Firebase:', e?.code || e);
    return null;
  });
  return Promise.race([remote, timeout]).then((p) => {
    if (getCurrentUser()?.id !== userId) return 'none';
    if (p === NEEDS_CONNECT) return 'connect';
    if (!p) return 'none';
    saveProfile(p, { fromRemote: true });
    return 'restored';
  });
}

// Token Google đã hết hạn (đăng nhập từ hơn 1 giờ trước) và máy này chưa có phiên Firebase:
// chỉ xin lại token được khi bé bấm nút, nên hỏi bé kết nối trước khi bắt thiết lập hồ sơ lại.
function renderReconnect(app, userId, onDone) {
  app.innerHTML = `
    <div class="page-loading">
      <div class="page-loading-icon">🔗</div>
      <p>Bé đã có hồ sơ rồi? Bấm <b>Kết nối</b> để lấy lại avatar và lớp đã chọn nhé.</p>
      <div class="page-loading-actions">
        <button type="button" class="btn btn-ghost" id="rc-new">Tạo hồ sơ mới</button>
        <button type="button" class="btn btn-primary" id="rc-connect">🔗 Kết nối</button>
      </div>
      <p class="lb-error" id="rc-err" hidden></p>
    </div>
  `;
  const btn = app.querySelector('#rc-connect');
  btn.onclick = () => {
    btn.disabled = true;
    // Gọi ngay trong click để Safari (iPad) cho mở popup Google.
    connectLeaderboard().then(() => {
      remoteChecked.delete(userId);
      onDone();
    }).catch((e) => {
      btn.disabled = false;
      const err = app.querySelector('#rc-err');
      err.textContent = e?.message || 'Kết nối thất bại, thử lại nhé.';
      err.hidden = false;
    });
  };
  app.querySelector('#rc-new').onclick = () => renderProfileSetup(app, { mode: 'onboard', onDone });
}

// Router
let navToken = 0;
let profileReturn = 'home'; // màn quay về sau khi sửa hồ sơ
let currentPage = null;
function navigate(gameId) {
  currentPage = gameId || 'home';
  const app = document.getElementById('app');
  app.innerHTML = '';
  const token = ++navToken;

  // Chỉ cho truy cập ứng dụng sau khi đăng nhập
  const user = getCurrentUser();
  if (!user) {
    renderLogin(app, () => navigate(gameId || 'home'));
    return;
  }

  // Trang admin (#admin) không cần hồ sơ bé; trang tự kiểm tra quyền.
  if (gameId === 'admin') {
    import('./games/admin.js').then(mod => {
      if (token !== navToken) return;
      mod.render(app, () => { history.replaceState(null, '', location.pathname + location.search); navigate('home'); });
    }).catch(() => {
      if (token === navToken) renderLoadError(app, () => navigate(gameId), () => navigate('home'));
    });
    return;
  }

  // Lần đầu đăng nhập: cho bé chọn trai/gái, avatar và tên (có thể bỏ qua).
  if (!isSetupDone()) {
    if (!remoteChecked.has(user.id)) {
      const loadingTimer = setTimeout(() => { if (token === navToken) renderLoading(app); }, 120);
      restoreRemoteProfile(user.id).then((result) => {
        clearTimeout(loadingTimer);
        if (token !== navToken) return;
        if (result === 'connect') renderReconnect(app, user.id, () => navigate(gameId || 'home'));
        else navigate(gameId);
      });
      return;
    }
    renderProfileSetup(app, { mode: 'onboard', onDone: () => navigate(gameId || 'home') });
    return;
  }

  if (gameId === 'profile') {
    const back = profileReturn;
    profileReturn = 'home';
    renderProfileSetup(app, { mode: 'edit', onDone: () => { syncMyScore({ delay: 0 }); navigate(back); } });
    return;
  }

  if (gameId === 'leaderboard') {
    import('./games/leaderboard.js').then(mod => {
      if (token !== navToken) return;
      mod.render(app, () => navigate('home'), {
        onEditProfile: () => { profileReturn = 'leaderboard'; navigate('profile'); },
      });
    }).catch(() => {
      if (token === navToken) renderLoadError(app, () => navigate(gameId), () => navigate('home'));
    });
    return;
  }

  if (gameId === 'stickers') {
    import('./games/stickers.js').then(mod => {
      if (token !== navToken) return;
      mod.render(app, () => navigate('home'));
    }).catch(() => {
      if (token === navToken) renderLoadError(app, () => navigate(gameId), () => navigate('home'));
    });
    return;
  }

  if (!gameId || gameId === 'home') {
    creditLegacyProgress();
    syncMyScore();
    syncMyProfile();
    registerUser();
    renderHome(app, navigate, {
      user,
      onSignOut: () => { signOutLeaderboard(); signOut(); navigate('home'); },
    });
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
    'grade3-practice': () => import('./games/grade3Practice.js'),
    'grade2-workbook': () => import('./games/grade2Workbook.js'),
    'grade2-workbook-2': () => import('./games/grade2Workbook2.js'),
    'pre1-math': () => import('./games/preschoolMath.js'),
    'pre2-math': () => import('./games/preschoolMath2.js'),
  };

  const loader = gameModules[gameId];
  if (loader) {
    setLastGame(gameId);
    // Chỉ hiện màn chờ nếu tải lâu hơn một chút, tránh nháy khi đã có sẵn trong bộ nhớ đệm.
    const loadingTimer = setTimeout(() => { if (token === navToken) renderLoading(app); }, 120);
    loader().then(mod => {
      clearTimeout(loadingTimer);
      if (token !== navToken) return;
      app.innerHTML = '';
      mod.render(app, () => navigate('home'));
    }).catch(() => {
      clearTimeout(loadingTimer);
      if (token !== navToken) return;
      renderLoadError(app, () => navigate(gameId), () => navigate('home'));
    });
  }
}

// Bản dev: phím tắt thử nghiệm sticker (Ctrl+Alt+H xem danh sách). Không có trong bản build.
if (import.meta.env.DEV) {
  import('./engine/devShortcuts.js').then(({ initDevShortcuts }) => initDevShortcuts({
    navigate,
    refresh: () => { if (currentPage === 'home' || currentPage === 'stickers') navigate(currentPage); },
  }));
}

// Start
const hashPage = () => (location.hash === '#admin' ? 'admin' : 'home');
window.addEventListener('hashchange', () => navigate(hashPage()));
navigate(hashPage());
