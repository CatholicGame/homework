/**
 * Main Entry Point — Toán Tiểu Học
 */

import { renderHome } from './games/home.js';
import { renderLogin } from './games/login.js';
import { getCurrentUser, signOut, isGuest, leaveGuest, completeServerLogin } from './engine/auth.js';
import { initCloudSync, pullIfStale, flushCloud } from './engine/cloudSync.js';
import { creditLegacyProgress } from './engine/stars.js';
import { setLastGame } from './engine/activity.js';
import { isSetupDone, saveProfile, adoptGuestProfile } from './engine/profile.js';
import { renderProfileSetup } from './games/profileSetup.js';
import { syncMyScore, syncMyProfile, registerUser, registerGuest, fetchRemoteProfile, signOutLeaderboard, connectLeaderboard, NEEDS_CONNECT } from './engine/leaderboard.js';
import { initVirtualKeyboard } from './engine/virtualKeyboard.js';
import { initLightbox } from './engine/lightbox.js';
import { initKeyboardInset } from './engine/keyboardInset.js';
import { initI18n, setI18nPage } from './engine/i18n.js';
import { initWordHint } from './engine/wordHint.js';
import { initAppUpdate, showUpdateCard } from './engine/appUpdate.js';

// Tiến trình học ↔ Google Drive của người đăng nhập
initCloudSync();

// Quay lại trình duyệt trên điện thoại: có bản mới thì tải lại / hiện nút Cập nhật
initAppUpdate();

// Tiếng Anh cho Toán: dịch chữ trên màn hình khi bé chọn English (engine/i18n.js)
initI18n();
initWordHint(); // giữ tay lên từ tiếng Anh → nghĩa tiếng Việt
window.addEventListener('tth:lang-changed', () => navigate(currentPage));

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

  // Trình duyệt từ chối (vd. Chrome Android sau khi hỏi quyền camera): hiện lý do thay vì im lặng.
  const fail = (err) => {
    document.querySelector('.fs-fail-toast')?.remove();
    const t = document.createElement('div');
    t.className = 'fs-fail-toast';
    t.textContent = `Không vào được toàn màn hình${err?.message ? `: ${err.message}` : '.'}`;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 6000);
  };

  btn.onclick = () => {
    if (!document.fullscreenElement) {
      const el = document.documentElement;
      try {
        const req = el.requestFullscreen ? el.requestFullscreen() : el.webkitRequestFullscreen?.();
        if (!el.requestFullscreen && !el.webkitRequestFullscreen) fail({ message: 'trình duyệt này không hỗ trợ.' });
        req?.catch?.(fail);
      } catch (err) { fail(err); }
    } else {
      document.exitFullscreen?.();
    }
  };

  document.addEventListener('fullscreenchange', sync);
  document.body.appendChild(btn);
}

initFullscreenButton();

// Sau khi cập nhật bản build mới, tab đang mở vẫn giữ tên file JS cũ (đã bị xoá trên máy chủ) nên
// import() hỏng — và trình duyệt nhớ lỗi đó, bấm "Thử lại" trong trang vẫn hỏng; chỉ tải lại cả
// trang (như F5) mới lấy được bản mới. Ở các trang không có bài đang làm thì tự tải lại (mỗi 10 giây
// tối đa một lần); đang làm bài (đồng bộ sao chạy nền cũng có thể gặp lỗi này) thì chỉ hiện nút
// tải lại, để bé không mất phần đang làm. Mất mạng thật thì để trang tự báo lỗi.
const RELOAD_KEY = 'tth-reload-for-update';
const AUTO_RELOAD_PAGES = ['home', 'leaderboard', 'reviews', 'stickers', 'profile', 'admin'];
window.addEventListener('vite:preloadError', () => {
  if (navigator.onLine === false) return;
  if (currentPage && !AUTO_RELOAD_PAGES.includes(currentPage)) { showUpdateCard(); return; }
  try {
    if (Date.now() - Number(sessionStorage.getItem(RELOAD_KEY) || 0) < 10_000) return;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch { /* storage unavailable */ }
  location.reload();
});



// Màn hình chờ khi đang tải một sách/trò chơi (file lớn, mạng chậm)
function renderLoading(app) {
  app.innerHTML = `
    <div class="page-loading" role="status" aria-live="polite">
      <div class="page-loading-spinner"></div>
      <p>Đang tải bài tập…</p>
    </div>
  `;
}

function renderLoadError(app, onBack) {
  app.innerHTML = `
    <div class="page-loading">
      <div class="page-loading-icon">📡</div>
      <p>Không tải được bài tập. Kiểm tra kết nối mạng rồi thử lại nhé.</p>
      <div class="page-loading-actions">
        <button type="button" class="btn btn-ghost" id="load-back">← Quay lại</button>
        <button type="button" class="btn btn-primary" id="load-retry">🔄 Tải lại</button>
      </div>
    </div>
  `;
  // Tải lại cả trang như F5: import() đã hỏng bị trình duyệt nhớ, gọi lại trong trang vẫn lỗi.
  app.querySelector('#load-retry').onclick = () => location.reload();
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
    if (!p) return adoptGuestProfile() ? 'restored' : 'none';
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

// Biệt danh / avatar / lớp sửa ở máy khác: lấy về khi mở trang chủ và khi bé quay lại app,
// rồi vẽ lại trang đang mở nếu hồ sơ đổi.
let lastProfileSync = 0;
function syncProfileFromOtherDevices() {
  lastProfileSync = Date.now();
  syncMyProfile().then((changed) => {
    if (changed && ['home', 'leaderboard'].includes(currentPage)) navigate(currentPage);
  });
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && getCurrentUser() && isSetupDone()
      && Date.now() - lastProfileSync > 30_000) syncProfileFromOtherDevices();
});

// Khách bấm "Đăng nhập": hiện màn đăng nhập (vẫn có nút dùng thử tiếp), xong quay về trang đang mở.
function goSignIn() {
  const back = currentPage;
  leaveGuest();
  navigate(back);
}

// Máy này đã có khách dùng thử khác (leaderboard.js openGuestSession): về màn đăng nhập, báo dùng email.
window.addEventListener('tth:guest-blocked', () => {
  guestChosenNow = false;
  navigate(currentPage);
});

// Bài làm ở máy khác vừa được tải về từ Drive → vẽ lại các trang hiện số sao / sticker.
window.addEventListener('tth:cloud-pulled', () => {
  syncMyScore();
  if (['home', 'stickers'].includes(currentPage)) navigate(currentPage);
});

// Router
let navToken = 0;
let guestChosenNow = false; // lần mở này bé vừa bấm "Dùng thử"
let loginError = ''; // lỗi đăng nhập qua máy chủ, hiện một lần trên màn đăng nhập
let profileReturn = 'home'; // màn quay về sau khi sửa hồ sơ
let currentPage = null;
function navigate(gameId) {
  currentPage = gameId || 'home';
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.removeAttribute('data-no-i18n');
  const token = ++navToken;
  setI18nPage(currentPage);

  // Đăng nhập Google, hoặc bấm "Dùng thử" (khách: dữ liệu chỉ lưu trên máy này)
  const user = getCurrentUser() || (isGuest() ? { id: 'guest', guest: true, name: 'Khách' } : null);
  // Khách đã bấm "Dùng thử" ở lần mở trước nhưng chưa chọn xong avatar (vd. mở link từ TikTok,
  // Zalo… lần hai): coi như chưa chọn, hiện lại màn đăng nhập / dùng thử thay vì nhảy thẳng vào avatar.
  if (!user || (user.guest && !guestChosenNow && !isSetupDone())) {
    setI18nPage('login');
    renderLogin(app, (u) => { if (!u) guestChosenNow = true; navigate(gameId || 'home'); }, { error: loginError });
    loginError = '';
    return;
  }

  // Trang admin (#admin) không cần hồ sơ bé; trang tự kiểm tra quyền.
  if (gameId === 'admin') {
    import('./games/admin.js').then(mod => {
      if (token !== navToken) return;
      mod.render(app, () => { history.replaceState(null, '', location.pathname + location.search); navigate('home'); });
    }).catch(() => {
      if (token === navToken) renderLoadError(app, () => navigate('home'));
    });
    return;
  }

  // Lần đầu đăng nhập: cho bé chọn trai/gái, avatar và tên (có thể bỏ qua).
  if (!isSetupDone()) {
    if (!user.guest && !remoteChecked.has(user.id)) {
      const loadingTimer = setTimeout(() => { if (token === navToken) renderLoading(app); }, 120);
      restoreRemoteProfile(user.id).then((result) => {
        clearTimeout(loadingTimer);
        if (token !== navToken) return;
        if (result === 'connect') renderReconnect(app, user.id, () => navigate(gameId || 'home'));
        else navigate(gameId);
      });
      return;
    }
    if (user.guest) registerGuest(); // khách dừng ở màn chọn avatar vẫn được đếm ở trang admin
    setI18nPage('profile');
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
        onSignIn: user.guest ? goSignIn : null,
      });
    }).catch(() => {
      if (token === navToken) renderLoadError(app, () => navigate('home'));
    });
    return;
  }

  if (gameId === 'reviews') {
    import('./games/reviews.js').then(mod => {
      if (token !== navToken) return;
      mod.render(app, () => navigate('home'));
    }).catch(() => {
      if (token === navToken) renderLoadError(app, () => navigate('home'));
    });
    return;
  }

  if (gameId === 'stickers') {
    import('./games/stickers.js').then(mod => {
      if (token !== navToken) return;
      mod.render(app, () => navigate('home'));
    }).catch(() => {
      if (token === navToken) renderLoadError(app, () => navigate('home'));
    });
    return;
  }

  if (!gameId || gameId === 'home') {
    creditLegacyProgress();
    if (!user.guest) {
      syncMyScore();
      syncProfileFromOtherDevices();
      registerUser();
      pullIfStale();
    } else {
      syncMyScore(); // khách cũng có tên trên bảng xếp hạng (phiên Firebase ẩn danh)
      registerGuest(); // thống kê khách ở trang admin
    }
    renderHome(app, navigate, {
      user,
      onSignIn: goSignIn,
      // Đẩy nốt bài chưa lưu lên Drive trước khi thu hồi token.
      onSignOut: () => flushCloud().then(() => { signOutLeaderboard(); signOut(); navigate('home'); }),
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
    'grade3-worksheet': () => import('./games/grade3Worksheet.js'),
    'grade3-drills': () => import('./games/grade3Drills.js'),
    'grade2-drills': () => import('./games/grade2Drills.js'),
    'grade4-drills': () => import('./games/grade4Drills.js'),
    'grade3-workbook': () => import('./games/grade3Workbook.js'),
    'grade3-workbook-2': () => import('./games/grade3Workbook2.js'),
    'grade3-practice': () => import('./games/grade3Practice.js'),
    'grade2-workbook': () => import('./games/grade2Workbook.js'),
    'grade2-workbook-2': () => import('./games/grade2Workbook2.js'),
    'pre1-math': () => import('./games/preschoolMath.js'),
    'pre2-math': () => import('./games/preschoolMath2.js'),
    'pre3-abc': () => import('./games/preschoolAbc.js'),
    'pre4-math': () => import('./games/preschoolMath4.js'),
    'pre5-photo': () => import('./games/preschoolPhoto.js'),
    'grade1-workbook': () => import('./games/grade1Workbook.js'),
    'grade1-photo': () => import('./games/grade1Photo.js'),
    'grade4-tools': () => import('./games/grade4Tools.js'),
    'grade4-textbook': () => import('./games/grade4Textbook.js'),
    'grade5-tools': () => import('./games/grade5Tools.js'),
    'grade5-drills': () => import('./games/grade5Drills.js'),
    'memory-island': () => import('./games/memoryIsland.js'),
    'writing': () => import('./games/writing.js'),
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
      mod.render(app, () => navigate('home'), { onSignIn: user.guest ? goSignIn : null });
    }).catch(() => {
      clearTimeout(loadingTimer);
      if (token !== navToken) return;
      renderLoadError(app, () => navigate('home'));
    });
  }
}

// Bản dev: phím tắt thử nghiệm sticker (Ctrl+Alt+H xem danh sách). Không có trong bản build.
if (import.meta.env.DEV) {
  window.__navigate = navigate; // scripts/i18n-crawl.mjs mở thẳng một sách
  import('./engine/devShortcuts.js').then(({ initDevShortcuts }) => initDevShortcuts({
    navigate,
    refresh: () => { if (currentPage === 'home' || currentPage === 'stickers') navigate(currentPage); },
  }));
}

// Start
const hashPage = () => (location.hash === '#admin' ? 'admin' : 'home');
window.addEventListener('hashchange', () => navigate(hashPage()));

// Vừa đăng nhập Google qua máy chủ (api/auth/callback → /?login=ok | ?login_error=…).
const params = new URLSearchParams(location.search);
if (params.has('login') || params.has('login_error')) {
  history.replaceState(null, '', location.pathname + location.hash);
  if (params.get('login') === 'ok') {
    renderLoading(document.getElementById('app'));
    completeServerLogin().then((u) => {
      if (!u) loginError = 'Đăng nhập chưa xong, bạn thử lại nhé.';
      navigate(hashPage());
    });
  } else {
    const why = params.get('login_error');
    loginError = why === 'access_denied' ? 'Bạn đã huỷ đăng nhập.' : 'Đăng nhập thất bại, bạn thử lại nhé.';
    navigate(hashPage());
  }
} else {
  navigate(hashPage());
}
