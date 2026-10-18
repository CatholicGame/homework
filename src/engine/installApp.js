// Cài ứng dụng lên máy (PWA): biểu tượng trên màn hình chính / desktop, mở trong cửa sổ riêng.
//   BẮT BUỘC: mở bằng trình duyệt thì mọi trang (trừ admin) bị che bởi màn cài app, không có nút bỏ qua.
//   Chrome, Edge, Android: giữ sự kiện beforeinstallprompt, bấm "Cài đặt" thì hiện hộp cài của trình duyệt.
//   iPhone, iPad: Safari không có hộp cài, hiện hướng dẫn Chia sẻ → Thêm vào MH chính.
//   Trình duyệt trong Zalo, Facebook…: dặn mở bằng Safari/Chrome; Firefox máy tính: dặn mở bằng Chrome/Edge.
//   Cài xong (appinstalled) hoặc máy đã cài (INSTALLED_KEY) mà vẫn vào bằng trình duyệt: màn che đổi thành
//   "ra màn hình desktop" (máy tính) / "về màn hình chính" (điện thoại) để mở app; có nút cài lại nếu đã gỡ.
//   Mở từ biểu tượng (display-mode: standalone), vite dev, trình duyệt tự động (navigator.webdriver), trang #admin: không che.
//   iPhone, iPad không có sự kiện appinstalled; app cài ở đó có bộ nhớ riêng, tách khỏi Safari.

import installResultUrl from '../assets/install-result.webp';

const INSTALLED_KEY = 'tth_app_installed';

const UA = navigator.userAgent || '';
const IS_IOS = /iPhone|iPad|iPod/.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const IS_MOBILE = IS_IOS || /Android|Mobi/i.test(UA);
const IN_APP = /Zalo|FBAN|FBAV|FB_IAB|FBIOS|Messenger|Instagram|Line\/|musical_ly|BytedanceWebview|TikTok|MicroMessenger|KAKAOTALK|Snapchat|Twitter|; wv\)/i.test(UA)
  || (/iPhone|iPad|iPod/.test(UA) && !/Safari\//.test(UA));
// Máy tính không cài được app web: Firefox; Safari trên Mac dùng Tệp → Thêm vào Dock.
const DESKTOP_FIREFOX = !IS_MOBILE && /Firefox\//.test(UA);
const MAC_SAFARI = !IS_MOBILE && /Macintosh/.test(UA) && /Safari\//.test(UA) && !/Chrome|Chromium|Edg\//.test(UA);

let deferred = null;
let onInstalledCb = null;
let gateWanted = false;

export function isStandalone() {
  return matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: window-controls-overlay)').matches
    || navigator.standalone === true;
}

/** Máy này đã cài app qua trình duyệt (Chrome, Edge, Android). */
export function isInstalledHere() {
  try { return localStorage.getItem(INSTALLED_KEY) === '1'; } catch { return false; }
}
function setInstalledHere(on) {
  try { if (on) localStorage.setItem(INSTALLED_KEY, '1'); else localStorage.removeItem(INSTALLED_KEY); } catch { /* chế độ riêng tư */ }
}

/** Có nên hiện mục "Cài ứng dụng" trong menu không. */
export function canOfferInstall() {
  return !isStandalone() && !isInstalledHere();
}

/**
 * Gọi một lần lúc khởi động: đăng ký service worker, giữ sự kiện cài của trình duyệt.
 * `onInstalled`: vừa cài xong qua trình duyệt (ghi thống kê cho trang admin).
 */
export function initInstallApp({ onInstalled } = {}) {
  onInstalledCb = onInstalled || null;
  addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e;
    // Trình duyệt lại mời cài: app đã bị gỡ, quên dấu đã cài.
    setInstalledHere(false);
    renderGate();
  });
  addEventListener('appinstalled', () => {
    deferred = null;
    setInstalledHere(true);
    renderGate();
    try { onInstalledCb?.(); } catch { /* thống kê không được làm hỏng app */ }
  });
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    addEventListener('load', () => { navigator.serviceWorker.register('/sw.js').catch(() => {}); });
  }
}

/** Mở hộp cài (Chrome/Edge/Android) hoặc hướng dẫn cài theo trình duyệt. */
export async function promptInstall() {
  if (deferred) {
    const ev = deferred;
    deferred = null;
    ev.prompt();
    await ev.userChoice.catch(() => ({ outcome: 'dismissed' }));
    return;
  }
  showGuide();
}

// ── Màn bắt buộc cài app ──

const BENEFITS = [
  ['🚀', 'Mở bằng một chạm từ màn hình chính, như Zalo hay các ứng dụng khác.'],
  ['🖥️', 'Toàn màn hình, không có thanh địa chỉ, bé không lỡ tay bấm sang trang khác.'],
  ['⚡', 'Mở nhanh hơn, mạng yếu vẫn vào được.'],
  ['🔄', 'Tự có bài mới, không phải tìm lại đường link.'],
];

const OPEN_STEPS = IS_MOBILE
  ? [['🏠', 'Về màn hình chính, nơi có Zalo và các ứng dụng khác.'], ['👆', 'Chạm biểu tượng Toán Tiểu Học để học.']]
  : [['🖥️', 'Ra màn hình desktop hoặc menu Start, tìm biểu tượng Toán Tiểu Học.'], ['👆', 'Bấm đúp biểu tượng để mở app và học.']];

const AFTER_INSTALL = IS_MOBILE
  ? 'Cài xong, về màn hình chính (cạnh Zalo), chạm biểu tượng này để học.'
  : 'Cài xong, ra màn hình desktop, bấm đúp biểu tượng này để học.';

const gateExempt = () => isStandalone() || import.meta.env.DEV || navigator.webdriver === true;
// Thêm ?installgate vào địa chỉ: vẫn che khi chạy vite dev (để xem thử màn cài).
const GATE_PREVIEW = new URLSearchParams(location.search).has('installgate');

/**
 * main.js gọi ở mỗi trang khi bé đã vào app (sau đăng nhập và chọn hồ sơ).
 * Mở bằng trình duyệt thì che cả trang bằng màn cài app; `exempt` (đăng nhập, chọn hồ sơ, trang #admin) thì gỡ màn che.
 * Tài khoản admin cũng bị che như học sinh, chỉ trang #admin mở được bằng trình duyệt.
 */
export function requireInstall({ exempt = false } = {}) {
  gateWanted = !exempt && (GATE_PREVIEW ? !isStandalone() : !gateExempt());
  renderGate();
}

const listHtml = (items) => items.map(([icon, text]) => `<li><span class="install-guide-step-icon">${icon}</span><span>${text}</span></li>`).join('');

function renderGate() {
  let veil = document.querySelector('.install-gate');
  if (!gateWanted || isStandalone()) {
    if (veil) { veil.remove(); setInert(false); }
    return;
  }
  ensureStyle();
  // Máy đã cài mà vẫn mở bằng trình duyệt (trình duyệt lại mời cài thì app đã bị gỡ: quay về màn cài).
  const installed = isInstalledHere() && !deferred;
  const mode = installed ? 'open' : 'install';
  if (veil?.dataset.mode === mode) return;
  if (!veil) {
    veil = document.createElement('div');
    veil.className = 'install-guide-veil install-gate';
    document.body.appendChild(veil);
  }
  veil.dataset.mode = mode;
  veil.innerHTML = installed ? `
    <div class="install-guide" role="dialog" aria-modal="true" aria-labelledby="install-gate-title">
      <b id="install-gate-title">Máy này đã có app Toán Tiểu Học</b>
      <figure class="install-gate-shot">
        <img src="${installResultUrl}" alt="" width="316" height="172">
        <figcaption>Bé học trong app, không học trên trình duyệt.</figcaption>
      </figure>
      <ol class="install-guide-steps">${listHtml(OPEN_STEPS)}</ol>
      <button type="button" class="install-gate-again">Không thấy biểu tượng? Cài lại</button>
    </div>` : `
    <div class="install-guide" role="dialog" aria-modal="true" aria-labelledby="install-gate-title">
      <b id="install-gate-title">Cài Toán Tiểu Học lên máy để học</b>
      <figure class="install-gate-shot">
        <img src="${installResultUrl}" alt="" width="316" height="172">
        <figcaption>${AFTER_INSTALL}</figcaption>
      </figure>
      <p class="install-guide-lead">Tiện hơn mở bằng trình duyệt:</p>
      <ul class="install-guide-steps">${listHtml(BENEFITS)}</ul>
      <button type="button" class="install-guide-ok">Cài đặt</button>
    </div>`;
  const btn = veil.querySelector('.install-guide-ok, .install-gate-again');
  btn.onclick = () => promptInstall();
  setInert(true);
  btn.focus();
}

// Trang phía sau màn che không bấm, không Tab tới được.
function setInert(on) {
  for (const el of document.body.children) {
    if (el.classList.contains('install-guide-veil') || el.tagName === 'SCRIPT' || el.tagName === 'STYLE') continue;
    el.inert = on;
  }
}

// ── Hướng dẫn cài khi trình duyệt không có hộp cài ──

const SHARE_ICON = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 3v12M7.5 7.5 12 3l4.5 4.5M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>';
const ADD_ICON = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="none" stroke="#1E293B" stroke-width="2"/><path d="M12 8v8M8 12h8" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/></svg>';

function guideSteps() {
  if (IN_APP) {
    return [
      ['🧭', 'Mở trang này bằng Safari hoặc Chrome.'],
      ['📲', 'Rồi bấm Cài đặt ở đó.'],
    ];
  }
  if (IS_IOS) {
    return [
      [SHARE_ICON, 'Bấm nút Chia sẻ trên thanh của Safari.'],
      [ADD_ICON, 'Kéo xuống, chọn Thêm vào MH chính.'],
      ['✅', 'Bấm Thêm. Biểu tượng hiện trên màn hình chính.'],
      // App trên iPhone/iPad có bộ nhớ riêng, không thấy bài đã làm trong Safari.
      ['🔐', 'Mở app lần đầu, bé đăng nhập Google để giữ bài đã làm.', 'is-note'],
    ];
  }
  if (DESKTOP_FIREFOX) {
    return [
      ['🧭', 'Firefox không cài được app. Mở trang này bằng Chrome hoặc Edge.'],
      ['📲', 'Rồi bấm Cài đặt ở đó.'],
    ];
  }
  if (MAC_SAFARI) {
    return [
      ['📁', 'Mở menu Tệp (File) trên thanh trên cùng.'],
      [ADD_ICON, 'Chọn Thêm vào Dock, rồi bấm Thêm.'],
    ];
  }
  return [
    ['⋮', 'Mở menu của trình duyệt (nút ⋮ hoặc ⋯).'],
    [ADD_ICON, 'Chọn Cài đặt ứng dụng hoặc Thêm vào màn hình chính.'],
  ];
}

function showGuide() {
  if (document.querySelector('.install-guide-veil.is-guide')) return;
  ensureStyle();
  const veil = document.createElement('div');
  veil.className = 'install-guide-veil is-guide';
  veil.innerHTML = `
    <div class="install-guide" role="dialog" aria-modal="true" aria-labelledby="install-guide-title">
      <img class="install-guide-icon" src="/icons/icon-192.png" alt="" width="84" height="84">
      <b id="install-guide-title">Cài Toán Tiểu Học lên máy</b>
      <ol class="install-guide-steps">
        ${guideSteps().map(([icon, text, cls]) => `<li${cls ? ` class="${cls}"` : ''}><span class="install-guide-step-icon">${icon}</span><span>${text}</span></li>`).join('')}
      </ol>
      <button type="button" class="install-guide-ok">Đã hiểu</button>
    </div>`;
  const close = () => { veil.remove(); document.querySelector('.install-gate button')?.focus(); };
  veil.querySelector('.install-guide-ok').onclick = close;
  veil.addEventListener('click', (e) => { if (e.target === veil) close(); });
  document.body.appendChild(veil);
  veil.querySelector('.install-guide-ok').focus();
}

const STYLE = `
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
  .install-guide-steps li.is-note { background: #FEF3C7; border: 2px dashed #F59E0B; }
  .install-guide-lead { margin: 0; text-align: center; font-size: 17px; color: #334155; }
  .install-guide-step-icon { flex: none; display: grid; place-items: center; width: 38px; height: 38px; border-radius: 12px;
    background: #fff; font-size: 20px; font-weight: 800; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.12); }
  .install-guide-ok { width: 100%; margin-top: 4px; padding: 14px 20px; border: 0; border-radius: 999px; cursor: pointer;
    font: inherit; font-size: 18px; font-weight: 800; color: #fff; background: linear-gradient(135deg, #FF6B9D, #C084FC); box-shadow: 0 5px 0 #BE185D; }
  .install-guide-ok:active { transform: translateY(4px); box-shadow: 0 1px 0 #BE185D; }
  .install-guide-ok:focus-visible, .install-gate-again:focus-visible { outline: 3px solid #1E293B; outline-offset: 3px; }
  .install-guide-veil.is-guide { z-index: 100001; }
  .install-gate { background: rgba(15, 23, 42, 0.72); }
  .install-gate .install-guide { width: min(28rem, 100%); max-height: calc(100dvh - 32px); overflow-y: auto; }
  .install-gate .install-guide-lead { font-size: 15px; color: #64748B; }
  .install-gate .install-guide-steps li { text-align: left; }
  .install-gate-shot { margin: 0; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .install-gate-shot img { display: block; width: min(100%, 316px); height: auto; border-radius: 18px;
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.25); }
  .install-gate-shot figcaption { font-size: 14px; font-weight: 700; color: #475569; text-align: center; }
  .install-gate-again { border: 0; background: none; padding: 8px 12px; border-radius: 999px; cursor: pointer;
    font: inherit; font-size: 15px; font-weight: 700; color: #64748B; text-decoration: underline; }
  @media (max-height: 560px) {
    .install-gate .install-guide { gap: 8px; padding: 14px 16px 12px; }
    .install-gate .install-guide-steps li { padding: 6px 10px; }
    .install-gate-shot img { width: auto; max-height: 30dvh; }
    .install-gate .install-guide-lead { display: none; }
  }
  @media (max-height: 560px) and (min-width: 600px) {
    .install-gate .install-guide { width: min(46rem, 100%); display: grid; grid-template-columns: 0.85fr 1fr; align-items: center;
      column-gap: 16px; }
    .install-gate .install-guide > b, .install-gate .install-guide > button { grid-column: 1 / -1; }
    .install-gate .install-guide > button.install-gate-again { justify-self: center; }
    .install-gate-shot img { width: 100%; max-height: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .install-guide, .install-guide-veil { animation-duration: 0.6s; animation-timing-function: ease-out; }
  }`;

function ensureStyle() {
  if (document.getElementById('install-app-style')) return;
  const style = document.createElement('style');
  style.id = 'install-app-style';
  style.textContent = STYLE;
  document.head.appendChild(style);
}
