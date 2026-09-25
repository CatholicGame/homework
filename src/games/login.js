/**
 * Login Page — Toán Tiểu Học
 */

import { signIn, preloadAuth } from '../engine/auth.js';

/**
 * Trình duyệt nhúng trong app khác (Zalo, Facebook, Messenger, Instagram, TikTok…):
 * không mở được popup, và Google cũng chặn đăng nhập trong webview — phải mở bằng
 * Safari / Chrome.
 */
function isInAppBrowser() {
  const ua = navigator.userAgent || '';
  if (/Zalo|FBAN|FBAV|FB_IAB|FBIOS|Messenger|Instagram|Line\/|musical_ly|BytedanceWebview|TikTok|MicroMessenger|KAKAOTALK|Snapchat|Twitter|; wv\)/i.test(ua)) return true;
  // iOS: Safari và các trình duyệt thật (Chrome, Firefox, Edge) đều có "Safari" trong UA; webview thì không.
  return /iPhone|iPad|iPod/.test(ua) && !/Safari\//.test(ua);
}

const IS_IOS = /iPhone|iPad|iPod/.test(navigator.userAgent)
  || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

/** Link mở trang hiện tại bằng trình duyệt ngoài (iOS 17+: Safari; Android: Chrome). */
function externalBrowserUrl() {
  const url = location.href;
  if (IS_IOS) return `x-safari-${url}`;
  return `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=${location.protocol.slice(0, -1)};action=android.intent.action.VIEW;end`;
}

export function renderLogin(app, onSignedIn) {
  app.innerHTML = `
    <div class="login-page">
      <div class="login-card animate-fadeIn">
        <div class="login-logo">🎓</div>
        <h1 class="login-title">Toán Tiểu Học</h1>
        <p class="login-sub">Học toán vui mỗi ngày — từ lớp 1 đến lớp 5</p>

        <button type="button" class="login-google-btn" id="login-google" disabled>
          <svg class="login-google-icon" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <span>Đăng nhập bằng Google</span>
        </button>

        <p class="login-error" id="login-error" hidden></p>

        <div class="login-inapp" id="login-inapp" hidden>
          <p class="login-inapp-title">⚠️ Hãy mở trang này bằng ${IS_IOS ? 'Safari' : 'Chrome'}</p>
          <p class="login-inapp-text">
            Trình duyệt trong ứng dụng (Zalo, Facebook, Messenger…) không cho đăng nhập Google.
            ${IS_IOS
              ? 'Bấm nút <b>⋯</b> ở góc trên rồi chọn <b>Mở bằng trình duyệt</b> / <b>Mở trong Safari</b>, hoặc bấm nút dưới đây.'
              : 'Bấm nút <b>⋮</b> ở góc trên rồi chọn <b>Mở bằng trình duyệt</b>, hoặc bấm nút dưới đây.'}
          </p>
          <div class="login-inapp-actions">
            <a class="login-inapp-btn" id="login-open-ext" href="${externalBrowserUrl()}">🧭 Mở bằng ${IS_IOS ? 'Safari' : 'Chrome'}</a>
            <button type="button" class="login-inapp-btn is-ghost" id="login-copy">📋 Sao chép link</button>
          </div>
        </div>

        <p class="login-note">
          Tiến trình học sẽ được lưu vào Google Drive của bạn để dùng trên mọi thiết bị.
        </p>
      </div>
    </div>
  `;

  const btn = app.querySelector('#login-google');
  const errEl = app.querySelector('#login-error');
  const label = btn.querySelector('span');
  const inappEl = app.querySelector('#login-inapp');
  const showInApp = () => { inappEl.hidden = false; };
  if (isInAppBrowser()) showInApp();

  app.querySelector('#login-copy').addEventListener('click', async (e) => {
    const b = e.currentTarget;
    try {
      await navigator.clipboard.writeText(location.href);
    } catch {
      // Webview cũ không có Clipboard API: chọn chữ trong ô ẩn rồi copy.
      const ta = Object.assign(document.createElement('textarea'), { value: location.href });
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      try { document.execCommand('copy'); } catch { /* ignore */ }
      ta.remove();
    }
    b.textContent = '✅ Đã sao chép — dán vào Safari/Chrome';
  });

  preloadAuth().then(() => { btn.disabled = false; });

  btn.addEventListener('click', async () => {
    errEl.hidden = true;
    btn.disabled = true;
    label.textContent = 'Đang đăng nhập…';
    try {
      const user = await signIn();
      onSignedIn(user);
    } catch (e) {
      errEl.textContent = e.message || 'Đăng nhập thất bại, vui lòng thử lại.';
      errEl.hidden = false;
      if (e.code === 'popup_failed_to_open') showInApp();
      btn.disabled = false;
      label.textContent = 'Đăng nhập bằng Google';
    }
  });
}
