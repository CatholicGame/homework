// Có bản mới: điện thoại quay lại trình duyệt thường chỉ khôi phục trang cũ trong bộ nhớ (trông như vừa tải
// lại nhưng vẫn là bản cũ). Mỗi lần quay lại trang (và định kỳ), hỏi máy chủ index.html mới nhất, so tên
// file JS chính (Vite gắn mã băm) với file đang chạy: khác là đã có bản mới.
//   Rời trang lâu (bé đã thôi học): tải lại luôn. Mới rời một lát: hiện nút "Cập nhật" để không mất bài đang làm.

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

// Thẻ "Đã có bản mới" ở cuối màn hình, dùng chung cho cả main.js (file JS cũ đã bị xoá sau khi cập nhật).
const STYLE = `
  .app-update { position: fixed; left: 50%; bottom: max(14px, env(safe-area-inset-bottom)); z-index: 100000;
    transform: translateX(-50%); width: min(27rem, calc(100vw - 24px)); box-sizing: border-box;
    display: flex; align-items: center; gap: 12px; padding: 12px 10px 12px 12px; border-radius: 20px;
    background: #fff; color: #1E293B; border: 2px solid #E0E7FF;
    font: 600 15px/1.3 Quicksand, system-ui, sans-serif; box-shadow: 0 12px 32px rgba(30, 41, 59, 0.28);
    animation: app-update-in 0.35s ease-out; }
  @keyframes app-update-in { from { opacity: 0; transform: translate(-50%, 16px); } }
  @media (prefers-reduced-motion: reduce) { .app-update { animation-duration: 0.7s; } }
  .app-update-icon { flex: none; display: grid; place-items: center; width: 44px; height: 44px; border-radius: 14px;
    background: linear-gradient(135deg, #EEF2FF, #FCE7F3); font-size: 24px; }
  .app-update-text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .app-update-text b { font-size: 16px; font-weight: 800; }
  .app-update-text small { font-size: 13px; font-weight: 600; color: #64748B; }
  .app-update button { border: 0; cursor: pointer; font: inherit; }
  .app-update-go { flex: none; padding: 10px 16px; border-radius: 999px; background: #FACC15; color: #1E293B;
    font-weight: 800 !important; box-shadow: 0 4px 0 #CA8A04; }
  .app-update-go:active { transform: translateY(3px); box-shadow: 0 1px 0 #CA8A04; }
  .app-update-x { flex: none; width: 32px; height: 32px; border-radius: 50%; background: #F1F5F9; color: #64748B; font-size: 14px; }`;

/** Hiện thẻ cập nhật (một thẻ duy nhất). `onClose`: bấm ✕ "Để sau". */
export function showUpdateCard({ onClose } = {}) {
  const old = document.querySelector('.app-update');
  if (old) return old;
  if (!document.getElementById('app-update-style')) {
    const style = document.createElement('style');
    style.id = 'app-update-style';
    style.textContent = STYLE;
    document.head.appendChild(style);
  }
  const card = document.createElement('div');
  card.className = 'app-update';
  card.setAttribute('role', 'status');
  card.innerHTML = `
    <span class="app-update-icon" aria-hidden="true">✨</span>
    <span class="app-update-text"><b>Đã có bản mới</b><small>Bấm Cập nhật để dùng bản mới nhất.</small></span>
    <button type="button" class="app-update-go">Cập nhật</button>
    <button type="button" class="app-update-x" aria-label="Để sau">✕</button>`;
  card.querySelector('.app-update-go').onclick = () => location.reload();
  card.querySelector('.app-update-x').onclick = () => { card.remove(); onClose?.(); };
  document.body.appendChild(card);
  return card;
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
