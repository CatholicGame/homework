// Cài ứng dụng lên máy (PWA): biểu tượng trên màn hình chính / thanh tác vụ, mở trong cửa sổ riêng.
//   Chrome, Edge, Android: giữ sự kiện beforeinstallprompt, bấm "Cài ngay" thì hiện hộp cài của trình duyệt.
//   iPhone, iPad: Safari không có hộp cài, hiện hướng dẫn Chia sẻ → Thêm vào MH chính.
//   Đã mở từ biểu tượng (display-mode: standalone) thì không mời cài nữa.
//   Thẻ mời ở trang chủ; bấm "Để sau" thì 7 ngày sau mới mời lại. Menu người dùng luôn có mục cài.

const SNOOZE_KEY = 'tth_install_snooze';
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;
const SHOW_DELAY_MS = 1500;

const UA = navigator.userAgent || '';
const IS_IOS = /iPhone|iPad|iPod/.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const IN_APP = /Zalo|FBAN|FBAV|FB_IAB|FBIOS|Messenger|Instagram|Line\/|musical_ly|BytedanceWebview|TikTok|MicroMessenger|KAKAOTALK|Snapchat|Twitter|; wv\)/i.test(UA)
  || (/iPhone|iPad|iPod/.test(UA) && !/Safari\//.test(UA));

let deferred = null;
let bannerHost = null;
let bannerTimer = 0;

export function isStandalone() {
  return matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: window-controls-overlay)').matches
    || navigator.standalone === true;
}

/** Có nên hiện mục "Cài ứng dụng" trong menu không. */
export function canOfferInstall() {
  return !isStandalone();
}

function snoozed() {
  try { return Date.now() < Number(localStorage.getItem(SNOOZE_KEY) || 0); } catch { return false; }
}
function snooze() {
  try { localStorage.setItem(SNOOZE_KEY, String(Date.now() + SNOOZE_MS)); } catch { /* chế độ riêng tư */ }
}

/** Gọi một lần lúc khởi động: đăng ký service worker, giữ sự kiện cài của trình duyệt. */
export function initInstallApp() {
  addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e;
    if (bannerHost?.isConnected) scheduleBanner();
  });
  addEventListener('appinstalled', () => {
    deferred = null;
    removeBanner();
  });
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    addEventListener('load', () => { navigator.serviceWorker.register('/sw.js').catch(() => {}); });
  }
}

/** Mở hộp cài (Chrome/Edge/Android) hoặc hướng dẫn cài theo trình duyệt. */
export async function promptInstall() {
  removeBanner();
  if (deferred) {
    const ev = deferred;
    deferred = null;
    ev.prompt();
    const { outcome } = await ev.userChoice.catch(() => ({ outcome: 'dismissed' }));
    if (outcome !== 'accepted') snooze();
    return;
  }
  showGuide();
}

// ── Thẻ mời cài ở trang chủ ──

/** Trang chủ gọi sau khi vẽ xong: đủ điều kiện thì hiện thẻ mời ở mép dưới (nằm trong `host`, rời trang là mất). */
export function showInstallBanner(host) {
  bannerHost = host;
  scheduleBanner();
}

function scheduleBanner() {
  clearTimeout(bannerTimer);
  if (isStandalone() || IN_APP || snoozed() || !(deferred || IS_IOS)) return;
  bannerTimer = setTimeout(() => {
    if (!bannerHost?.isConnected || bannerHost.querySelector('.install-banner')) return;
    ensureStyle();
    const el = document.createElement('div');
    el.className = 'install-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-labelledby', 'install-banner-title');
    el.innerHTML = `
      <img class="install-banner-icon" src="/icons/icon-192.png" alt="" width="56" height="56">
      <span class="install-banner-text">
        <b id="install-banner-title">Cài Toán Tiểu Học lên máy</b>
        <small>Mở nhanh từ màn hình chính, như một ứng dụng.</small>
      </span>
      <button type="button" class="install-banner-go">Cài ngay</button>
      <button type="button" class="install-banner-x" aria-label="Để sau" title="Để sau">✕</button>`;
    el.querySelector('.install-banner-go').onclick = () => promptInstall();
    el.querySelector('.install-banner-x').onclick = () => { snooze(); removeBanner(); };
    bannerHost.appendChild(el);
  }, SHOW_DELAY_MS);
}

function removeBanner() {
  clearTimeout(bannerTimer);
  document.querySelectorAll('.install-banner').forEach((el) => el.remove());
}

// ── Hướng dẫn cài khi trình duyệt không có hộp cài ──

const SHARE_ICON = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 3v12M7.5 7.5 12 3l4.5 4.5M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>';
const ADD_ICON = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="none" stroke="#1E293B" stroke-width="2"/><path d="M12 8v8M8 12h8" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/></svg>';

function guideSteps() {
  if (IN_APP) {
    return [
      ['🧭', 'Mở trang này bằng Safari hoặc Chrome.'],
      ['📲', 'Rồi bấm lại mục Cài ứng dụng lên máy.'],
    ];
  }
  if (IS_IOS) {
    return [
      [SHARE_ICON, 'Bấm nút Chia sẻ trên thanh của Safari.'],
      [ADD_ICON, 'Kéo xuống, chọn Thêm vào MH chính.'],
      ['✅', 'Bấm Thêm. Biểu tượng hiện trên màn hình chính.'],
    ];
  }
  return [
    ['⋮', 'Mở menu của trình duyệt (nút ⋮ hoặc ⋯).'],
    [ADD_ICON, 'Chọn Cài đặt ứng dụng hoặc Thêm vào màn hình chính.'],
  ];
}

function showGuide() {
  if (document.querySelector('.install-guide-veil')) return;
  ensureStyle();
  const veil = document.createElement('div');
  veil.className = 'install-guide-veil';
  veil.innerHTML = `
    <div class="install-guide" role="dialog" aria-modal="true" aria-labelledby="install-guide-title">
      <img class="install-guide-icon" src="/icons/icon-192.png" alt="" width="84" height="84">
      <b id="install-guide-title">Cài Toán Tiểu Học lên máy</b>
      <ol class="install-guide-steps">
        ${guideSteps().map(([icon, text]) => `<li><span class="install-guide-step-icon">${icon}</span><span>${text}</span></li>`).join('')}
      </ol>
      <button type="button" class="install-guide-ok">Đã hiểu</button>
    </div>`;
  const close = () => veil.remove();
  veil.querySelector('.install-guide-ok').onclick = close;
  veil.addEventListener('click', (e) => { if (e.target === veil) close(); });
  document.body.appendChild(veil);
  veil.querySelector('.install-guide-ok').focus();
}

const STYLE = `
  .install-banner { position: fixed; z-index: 9000; left: 50%; bottom: calc(16px + env(safe-area-inset-bottom, 0px));
    transform: translateX(-50%); width: min(30rem, calc(100% - 32px)); box-sizing: border-box;
    display: flex; align-items: center; gap: 12px; padding: 12px 10px 12px 14px; border-radius: 22px;
    background: #fff; color: #1E293B; border: 2px solid #FBCFE8; box-shadow: 0 14px 40px rgba(15, 23, 42, 0.22);
    font: 600 14px/1.3 Quicksand, system-ui, sans-serif; animation: install-rise 0.45s cubic-bezier(0.2, 1.3, 0.4, 1); }
  @keyframes install-rise { from { opacity: 0; transform: translate(-50%, 24px); } }
  .install-banner-icon { flex: none; width: 56px; height: 56px; }
  .install-banner-text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .install-banner-text b { font-size: 16px; font-weight: 800; }
  .install-banner-text small { font-size: 13px; color: #64748B; }
  .install-banner button { border: 0; cursor: pointer; font: inherit; }
  .install-banner-go { flex: none; padding: 12px 18px; border-radius: 999px; color: #fff; font-size: 16px; font-weight: 800 !important;
    background: linear-gradient(135deg, #FF6B9D, #C084FC); box-shadow: 0 4px 0 #BE185D; }
  .install-banner-go:active { transform: translateY(3px); box-shadow: 0 1px 0 #BE185D; }
  .install-banner-x { flex: none; width: 34px; height: 34px; border-radius: 50%; background: none; color: #94A3B8; font-size: 16px; }
  .install-banner-x:hover { background: #F1F5F9; color: #475569; }
  .install-banner button:focus-visible, .install-guide-ok:focus-visible { outline: 3px solid #1E293B; outline-offset: 3px; }
  @media (max-width: 420px) {
    .install-banner { gap: 10px; padding: 10px 8px 10px 10px; }
    .install-banner-icon { width: 44px; height: 44px; }
    .install-banner-text small { display: none; }
    .install-banner-go { padding: 10px 14px; font-size: 15px; }
  }

  .install-guide-veil { position: fixed; inset: 0; z-index: 100000; display: grid; place-items: center; padding: 16px;
    background: rgba(15, 23, 42, 0.5); -webkit-backdrop-filter: blur(3px); backdrop-filter: blur(3px); animation: install-fade 0.3s ease-out; }
  @keyframes install-fade { from { opacity: 0; } }
  .install-guide { width: min(24rem, 100%); box-sizing: border-box; display: flex; flex-direction: column; align-items: center; gap: 12px;
    padding: 24px 20px 18px; border-radius: 28px; background: #fff; color: #1E293B; border: 3px solid #FBCFE8;
    font: 600 15px/1.4 Quicksand, system-ui, sans-serif; box-shadow: 0 24px 60px rgba(15, 23, 42, 0.4);
    animation: install-pop 0.45s cubic-bezier(0.2, 1.4, 0.4, 1); }
  @keyframes install-pop { from { opacity: 0; transform: scale(0.85); } }
  .install-guide > b { font-size: 21px; font-weight: 800; text-align: center; }
  .install-guide-steps { list-style: none; margin: 0; padding: 0; width: 100%; display: flex; flex-direction: column; gap: 8px; }
  .install-guide-steps li { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 16px; background: #FDF2F8; }
  .install-guide-step-icon { flex: none; display: grid; place-items: center; width: 38px; height: 38px; border-radius: 12px;
    background: #fff; font-size: 20px; font-weight: 800; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.12); }
  .install-guide-ok { width: 100%; margin-top: 4px; padding: 14px 20px; border: 0; border-radius: 999px; cursor: pointer;
    font: inherit; font-size: 18px; font-weight: 800; color: #fff; background: linear-gradient(135deg, #FF6B9D, #C084FC); box-shadow: 0 5px 0 #BE185D; }
  .install-guide-ok:active { transform: translateY(4px); box-shadow: 0 1px 0 #BE185D; }
  @media (prefers-reduced-motion: reduce) {
    .install-banner, .install-guide, .install-guide-veil { animation-duration: 0.6s; animation-timing-function: ease-out; }
  }`;

function ensureStyle() {
  if (document.getElementById('install-app-style')) return;
  const style = document.createElement('style');
  style.id = 'install-app-style';
  style.textContent = STYLE;
  document.head.appendChild(style);
}
