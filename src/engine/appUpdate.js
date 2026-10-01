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
  banner = document.createElement('div');
  banner.className = 'app-update';
  banner.setAttribute('role', 'status');
  banner.innerHTML = '<span>✨ Đã có bản mới của ứng dụng.</span><button type="button" class="app-update-go">Cập nhật</button><button type="button" class="app-update-x" aria-label="Để sau">✕</button>';
  banner.querySelector('.app-update-go').onclick = () => location.reload();
  banner.querySelector('.app-update-x').onclick = () => { banner.remove(); banner = null; lastCheck = Date.now() + POLL_MS; };
  document.body.appendChild(banner);
}

let inited = false;
export function initAppUpdate() {
  if (inited || import.meta.env.DEV || !current) return;
  inited = true;
  const style = document.createElement('style');
  style.textContent = `
    .app-update { position: fixed; left: 50%; bottom: 16px; transform: translateX(-50%); z-index: 100000;
      display: flex; align-items: center; gap: 10px; max-width: calc(100vw - 32px); box-sizing: border-box;
      padding: 10px 12px 10px 16px; border-radius: 999px; background: #1E3A8A; color: #fff;
      font: 600 15px/1.3 Quicksand, system-ui, sans-serif; box-shadow: 0 6px 20px rgba(0,0,0,.25); }
    .app-update button { border: 0; cursor: pointer; font: inherit; border-radius: 999px; }
    .app-update-go { padding: 6px 14px; background: #FACC15; color: #1E293B; }
    .app-update-x { width: 30px; height: 30px; background: transparent; color: #fff; opacity: .8; }`;
  document.head.appendChild(style);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hiddenAt = Date.now();
    else check(hiddenAt ? Date.now() - hiddenAt : 0);
  });
  // Safari khôi phục trang từ bộ nhớ đệm (bfcache) khi quay lại: trang không chạy lại từ đầu.
  addEventListener('pageshow', (e) => { if (e.persisted) check(hiddenAt ? Date.now() - hiddenAt : RELOAD_AWAY_MS); });
  setInterval(() => { if (!document.hidden) check(); }, POLL_MS);
}
