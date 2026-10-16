// Service worker tối giản cho bản cài lên máy (PWA).
//   Trang (index.html): luôn hỏi mạng trước để có bản mới nhất (appUpdate.js vẫn so mã băm như cũ);
//   mất mạng thì mở bản trang đã lưu lần trước.
//   /assets/* (Vite gắn mã băm, không bao giờ đổi nội dung): lấy từ bộ nhớ đệm nếu đã có, chưa có thì tải rồi lưu.
//   Mọi thứ khác (/api, Firebase, Google, phông chữ…) đi thẳng ra mạng, không đụng tới.

const PAGES = 'tth-pages-v1';
const ASSETS = 'tth-assets-v1';

const MAX_ASSETS = 600;

// Mỗi lần phát hành có file mã băm mới: bỏ bớt file cũ nhất (keys() theo thứ tự lưu) cho khỏi đầy máy.
async function trim(cache) {
  const keys = await cache.keys();
  for (const key of keys.slice(0, Math.max(0, keys.length - MAX_ASSETS))) await cache.delete(key);
}

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keep = [PAGES, ASSETS];
    for (const key of await caches.keys()) if (!keep.includes(key)) await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin || url.pathname.startsWith('/api/')) return;

  // Chỉ trang chính của ứng dụng; các trang khác (trang dev, chuyển hướng đăng nhập…) để trình duyệt tự lo.
  if (req.mode === 'navigate' && (url.pathname === '/' || url.pathname === '/index.html')) {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res.ok && (res.headers.get('content-type') || '').includes('text/html')) {
          (await caches.open(PAGES)).put('/', res.clone());
        }
        return res;
      } catch (err) {
        const cached = await caches.match('/', { cacheName: PAGES });
        if (cached) return cached;
        throw err;
      }
    })());
    return;
  }

  if (url.pathname.startsWith('/assets/')) {
    event.respondWith((async () => {
      const cache = await caches.open(ASSETS);
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok) cache.put(req, res.clone()).then(() => trim(cache));
      return res;
    })());
  }
});
