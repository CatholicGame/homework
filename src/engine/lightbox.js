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

  function open(src, alt) {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <button type="button" class="lightbox-close" aria-label="Đóng">✕</button>
      <img class="lightbox-img" src="${src}" alt="${alt || ''}">
    `;
    overlay.addEventListener('click', e => {
      if (e.target === overlay || e.target.classList.contains('lightbox-close')) close();
    });
    document.addEventListener('keydown', onKeydown);
    document.body.appendChild(overlay);
  }

  document.addEventListener('click', e => {
    const img = e.target.closest('.e3-q-img');
    if (img) open(img.src, img.alt);
  });
}
