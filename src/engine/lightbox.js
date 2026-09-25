/**
 * Global image lightbox — tap any question illustration (`.e3-q-img`, used by
 * both grade3Exam.js and grade3Workbook.js) to see it enlarged. Wired once at
 * app startup via event delegation, so it works for every game without each
 * one adding its own click handler or overlay markup.
 *
 * Native pinch-zoom already works on the enlarged image because index.html's
 * viewport meta doesn't set user-scalable=no/maximum-scale — the overlay just
 * gives the image enough room (and nothing else in the way) for that to be
 * useful on a phone/tablet.
 */
// Hình vẽ lại (SVG) → ảnh scan gốc của sách (thư mục orig/, chỉ tải khi bé bấm "Ảnh gốc").
const SVG_URLS = import.meta.glob('../assets/grade[23]-*/*.svg', { eager: true, query: '?url', import: 'default' });
const ORIGINALS = import.meta.glob('../assets/grade[23]-*/orig/*.png', { query: '?url', import: 'default' });
const SVG_BY_URL = new Map(Object.entries(SVG_URLS).map(([path, url]) => [url, path]));

function originalLoader(src) {
  const path = SVG_BY_URL.get(src);
  return path ? ORIGINALS[path.replace(/\/([^/]+)\.svg$/, '/orig/$1.png')] : null;
}

export function initLightbox() {
  if (document.getElementById('lightbox-styles')) return;

  const style = document.createElement('style');
  style.id = 'lightbox-styles';
  style.textContent = `
    .e3-q-img { cursor: zoom-in; }
    .lightbox-overlay {
      position: fixed; inset: 0; z-index: 5000;
      background: rgba(15, 23, 42, 0.85);
      display: flex; align-items: center; justify-content: center;
      padding: 2.5rem 1.2rem 1.2rem;
      animation: lightbox-fade-in 0.15s ease-out;
    }
    @keyframes lightbox-fade-in { from { opacity: 0; } to { opacity: 1; } }
    .lightbox-img {
      max-width: 95vw; max-height: 92vh;
      background: #fff; /* hình SVG trong suốt — không để lẫn vào lớp phủ tối */
      padding: 0.6rem;
      border-radius: 0.75rem;
      box-shadow: 0 10px 40px rgba(0,0,0,0.4);
    }
    .lightbox-close {
      position: fixed; top: 14px; right: 14px; z-index: 5001;
      width: 2.4rem; height: 2.4rem; border-radius: 50%;
      border: none; background: rgba(255,255,255,0.95); color: #1e293b;
      font-size: 1.3rem; font-weight: 700; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.25);
    }
    .lightbox-orig {
      position: fixed; top: 14px; right: 64px; z-index: 5001;
      height: 2.4rem; padding: 0 1rem; border-radius: 1.2rem;
      border: none; background: rgba(255,255,255,0.95); color: #1e293b;
      font: 700 0.95rem Quicksand, sans-serif; cursor: pointer;
      box-shadow: 0 2px 10px rgba(0,0,0,0.25);
    }
    .lightbox-orig.is-on { background: #0EA5E9; color: #fff; }
    .e3-orig-toggle {
      display: block; margin: 6px auto 0; padding: 4px 12px;
      border: 1.5px solid #CBD5E1; border-radius: 999px; background: #fff; color: #334155;
      font: 700 0.8rem Quicksand, sans-serif; cursor: pointer;
    }
    .e3-orig-toggle:hover { border-color: #0EA5E9; color: #0369A1; }
    .e3-orig-toggle.is-on { background: #0EA5E9; border-color: #0EA5E9; color: #fff; }
  `;
  document.head.appendChild(style);

  let overlay = null;

  function close() {
    overlay?.remove();
    overlay = null;
    document.removeEventListener('keydown', onKeydown);
  }

  function onKeydown(e) {
    if (e.key === 'Escape') close();
  }

  function open(src, alt, startWithOriginal = false) {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <button type="button" class="lightbox-close" aria-label="Đóng">✕</button>
      <img class="lightbox-img" src="${src}" alt="${alt || ''}">
    `;
    const loadOriginal = originalLoader(src);
    if (loadOriginal) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lightbox-orig';
      btn.textContent = '📷 Ảnh gốc';
      const img = overlay.querySelector('.lightbox-img');
      btn.onclick = async () => {
        const showOrig = !btn.classList.contains('is-on');
        img.src = showOrig ? await loadOriginal() : src;
        btn.classList.toggle('is-on', showOrig);
        btn.textContent = showOrig ? '✏️ Hình vẽ lại' : '📷 Ảnh gốc';
      };
      overlay.prepend(btn);
      if (startWithOriginal) btn.click();
    }
    overlay.addEventListener('click', e => {
      if (e.target === overlay || e.target.classList.contains('lightbox-close')) close();
    });
    document.addEventListener('keydown', onKeydown);
    document.body.appendChild(overlay);
  }

  document.addEventListener('click', e => {
    const toggle = e.target.closest('.e3-orig-toggle');
    if (toggle) { toggleInline(toggle); return; }
    const img = e.target.closest('.e3-q-img');
    if (img) open(img.dataset.svgSrc || img.getAttribute('src'), img.alt, img.dataset.showingOrig === '1');
  });

  // Nút "📷 Ảnh gốc" ngay dưới mỗi hình vẽ lại trong câu hỏi (trừ hình nhỏ trong ô bảng).
  const addToggles = () => {
    document.querySelectorAll('.e3-q-img:not([data-orig-checked])').forEach(img => {
      img.dataset.origChecked = '1';
      if (img.closest('table') || !originalLoader(img.getAttribute('src'))) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'e3-orig-toggle';
      btn.textContent = '📷 Ảnh gốc';
      img.after(btn);
    });
  };
  new MutationObserver(addToggles).observe(document.body, { childList: true, subtree: true });
  addToggles();
}

async function toggleInline(btn) {
  const img = btn.previousElementSibling;
  if (!img?.classList.contains('e3-q-img')) return;
  const svgSrc = img.dataset.svgSrc || img.getAttribute('src');
  const showOrig = img.dataset.showingOrig !== '1';
  img.dataset.svgSrc = svgSrc;
  img.src = showOrig ? await originalLoader(svgSrc)() : svgSrc;
  img.dataset.showingOrig = showOrig ? '1' : '';
  btn.classList.toggle('is-on', showOrig);
  btn.textContent = showOrig ? '✏️ Hình vẽ lại' : '📷 Ảnh gốc';
}
