// Có bản mới: điện thoại quay lại trình duyệt thường chỉ khôi phục trang cũ trong bộ nhớ (trông như vừa tải
// lại nhưng vẫn là bản cũ). Mỗi lần quay lại trang (và định kỳ), hỏi máy chủ index.html mới nhất, so tên
// file JS chính (Vite gắn mã băm) với file đang chạy: khác là đã có bản mới.
//   Rời trang lâu (bé đã thôi học): tải lại luôn. Mới rời một lát: hiện thẻ "Cập nhật" giữa màn hình (bé tự bấm, không mất bài đang làm).

const RELOAD_AWAY_MS = 10 * 60 * 1000;
const POLL_MS = 15 * 60 * 1000;
const MIN_GAP_MS = 30 * 1000;

const current = document.querySelector('script[type="module"][src*="/assets/"]')?.getAttribute('src');
let hiddenAt = 0, lastCheck = 0, checking = false, banner = null;

async function latestBuild() {
  const res = await fetch(`/?_=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const html = await res.text();
  return html.match(/<script[^>]*type="module"[^>]*src="([^"]*\/assets\/[^"]+)"/)?.[1] || null;
}

async function check(awayMs = 0) {
  const now = Date.now();
  if (checking || banner || now - lastCheck < MIN_GAP_MS || !navigator.onLine) return;
  checking = true;
  lastCheck = now;
  try {
    const latest = await latestBuild();
    if (!latest || latest === current) return;
    if (awayMs >= RELOAD_AWAY_MS) location.reload();
    else showBanner();
  } catch { /* mất mạng: lần sau hỏi lại */ } finally {
    checking = false;
  }
}

function showBanner() {
  banner = showUpdateCard({ onClose: () => { banner = null; lastCheck = Date.now() + POLL_MS; } });
}

// Thẻ "Đã có bản mới" nổi giữa màn hình trên nền mờ, dùng chung cho cả main.js (file JS cũ đã bị xoá sau khi cập nhật).
const STYLE = `
  .app-update-veil { position: fixed; inset: 0; z-index: 100000; display: grid; place-items: center; padding: 16px;
    background: rgba(15, 23, 42, 0.5); -webkit-backdrop-filter: blur(3px); backdrop-filter: blur(3px);
    animation: app-update-fade 0.3s ease-out; }
  @keyframes app-update-fade { from { opacity: 0; } }
  .app-update { width: min(23rem, 100%); box-sizing: border-box; display: flex; flex-direction: column; align-items: center;
    gap: 10px; padding: 28px 22px 16px; border-radius: 28px; text-align: center;
    background: #fff; color: #1E293B; border: 3px solid #FDE68A;
    font: 600 15px/1.35 Quicksand, system-ui, sans-serif; box-shadow: 0 24px 60px rgba(15, 23, 42, 0.4);
    animation: app-update-pop 0.45s cubic-bezier(0.2, 1.4, 0.4, 1); }
  @keyframes app-update-pop { from { opacity: 0; transform: scale(0.8); } }
  .app-update-icon { display: grid; place-items: center; width: 84px; height: 84px; border-radius: 50%;
    background: linear-gradient(135deg, #FEF3C7, #FCE7F3); font-size: 46px; animation: app-update-bob 1.6s ease-in-out infinite; }
  @keyframes app-update-bob { 50% { transform: translateY(-6px) rotate(-6deg); } }
  .app-update-text { display: flex; flex-direction: column; gap: 4px; }
  .app-update-text b { font-size: 23px; font-weight: 800; }
  .app-update-text small { font-size: 15px; font-weight: 600; color: #64748B; }
  .app-update button { border: 0; cursor: pointer; font: inherit; }
  .app-update .app-update-go { width: 100%; margin-top: 8px; padding: 16px 20px; border-radius: 999px; background: #FACC15; color: #1E293B;
    font-size: 20px; font-weight: 800 !important; box-shadow: 0 6px 0 #CA8A04;
    animation: app-update-glow 1.8s ease-in-out infinite; }
  @keyframes app-update-glow { 50% { box-shadow: 0 6px 0 #CA8A04, 0 0 0 10px rgba(250, 204, 21, 0.3); } }
  .app-update-go:focus-visible { outline: 3px solid #1E293B; outline-offset: 4px; }
  .app-update-go:active { transform: translateY(4px); box-shadow: 0 2px 0 #CA8A04; animation: none; }
  .app-update .app-update-x { padding: 8px 16px; border-radius: 999px; background: none; color: #64748B; font-size: 15px; }
  .app-update-x:hover { background: #F1F5F9; }
  @media (prefers-reduced-motion: reduce) {
    .app-update-veil, .app-update { animation-duration: 0.6s; animation-timing-function: ease-out; }
    .app-update-icon, .app-update-go { animation: none; }
  }`;

/** Hiện thẻ cập nhật giữa màn hình (một thẻ duy nhất). `onClose`: bấm "Để sau". */
export function showUpdateCard({ onClose } = {}) {
  const old = document.querySelector('.app-update-veil');
  if (old) return old;
  if (!document.getElementById('app-update-style')) {
    const style = document.createElement('style');
    style.id = 'app-update-style';
    style.textContent = STYLE;
    document.head.appendChild(style);
  }
  const veil = document.createElement('div');
  veil.className = 'app-update-veil';
  veil.innerHTML = `
    <div class="app-update" role="dialog" aria-modal="true" aria-labelledby="app-update-title">
      <span class="app-update-icon" aria-hidden="true">✨</span>
      <span class="app-update-text"><b id="app-update-title">Đã có bản mới</b><small>Bấm Cập nhật để dùng bản mới nhất.</small></span>
      <button type="button" class="app-update-go">Cập nhật</button>
      <button type="button" class="app-update-x">Để sau</button>
    </div>`;
  veil.querySelector('.app-update-go').onclick = () => location.reload();
  veil.querySelector('.app-update-x').onclick = () => { veil.remove(); onClose?.(); };
  document.body.appendChild(veil);
  veil.querySelector('.app-update-go').focus();
  return veil;
}

let inited = false;
export function initAppUpdate() {
  if (inited || import.meta.env.DEV || !current) return;
  inited = true;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hiddenAt = Date.now();
    else check(hiddenAt ? Date.now() - hiddenAt : 0);
  });
  // Safari khôi phục trang từ bộ nhớ đệm (bfcache) khi quay lại: trang không chạy lại từ đầu.
  addEventListener('pageshow', (e) => { if (e.persisted) check(hiddenAt ? Date.now() - hiddenAt : RELOAD_AWAY_MS); });
  setInterval(() => { if (!document.hidden) check(); }, POLL_MS);
}
