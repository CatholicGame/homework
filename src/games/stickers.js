/**
 * Vòng quay sticker + bộ sưu tập sticker của bé.
 * Cứ giải đúng 5 bài được 1 lượt quay; mỗi lượt nhận 1 sticker của bộ mà kim chỉ vào.
 */

import {
  getGender, getSets, getOwned, getSpinStatus, spin, countOwned, getReceivedDates,
  WHEEL_IMG, CONFETTI_IMG, CONFETTI_SFX,
} from '../engine/stickers.js';

const SPIN_MS = 4800;
const TURNS = 6;

export function render(app, onBack) {
  const gender = getGender();
  let rotation = 0;
  let spinning = false;

  app.innerHTML = `
    <div class="stk-page animate-fadeIn">
      <div class="lb-top">
        <button type="button" class="btn btn-ghost" id="stk-back">← Trang chủ</button>
      </div>
      <div class="stk-card stk-card-${gender}">
        <h1 class="stk-title">🎁 Vòng quay sticker</h1>
        <p class="stk-subtitle">Cứ làm đúng <strong>5 bài</strong> là em được <strong>1 lượt quay</strong> và nhận 1 sticker!</p>
        <div class="stk-status" id="stk-status"></div>
        <div class="stk-wheel-wrap">
          <div class="stk-pointer" aria-hidden="true"></div>
          <img class="stk-wheel" id="stk-wheel" src="${WHEEL_IMG[gender]}" alt="Vòng quay sticker">
          <button type="button" class="stk-hub" id="stk-hub" aria-label="Quay">QUAY</button>
        </div>
        <button type="button" class="btn btn-primary stk-spin-btn" id="stk-spin">🎡 Quay ngay</button>
      </div>

      <div class="stk-card">
        <h2 class="stk-album-title">📒 Bộ sưu tập của em <span id="stk-count"></span></h2>
        <div id="stk-album"></div>
      </div>
    </div>
  `;

  const wheel = app.querySelector('#stk-wheel');
  const spinBtn = app.querySelector('#stk-spin');
  app.querySelector('#stk-back').onclick = () => { if (!spinning) onBack(); };
  app.querySelector('#stk-hub').onclick = doSpin;

  drawStatus();
  drawAlbum();

  function drawStatus() {
    const { spins, progress, need } = getSpinStatus();
    const dots = Array.from({ length: need }, (_, i) => `<span class="stk-dot${i < progress ? ' is-on' : ''}"></span>`).join('');
    app.querySelector('#stk-status').innerHTML = spins
      ? `<span class="stk-spins">Em có <strong>${spins}</strong> lượt quay 🎉</span>`
      : `<span class="stk-spins stk-spins-none">Còn <strong>${need - progress}</strong> bài nữa là được lượt quay</span>
         <span class="stk-dots" aria-label="Đã làm ${progress}/${need} bài">${dots}</span>`;
    // Hết lượt: nút đưa bé về trang chủ để làm tiếp bài.
    spinBtn.disabled = spinning;
    spinBtn.textContent = spins || spinning ? '🎡 Quay ngay' : '📚 Làm bài để có lượt quay';
    spinBtn.onclick = spins ? doSpin : onBack;
    app.querySelector('#stk-hub').disabled = spinning || !spins;
  }

  function drawAlbum() {
    const owned = getOwned();
    const sets = getSets(gender);
    const total = sets.reduce((n, s) => n + s.stickers.length, 0);
    app.querySelector('#stk-count').textContent = `${countOwned(gender)}/${total}`;
    app.querySelector('#stk-album').innerHTML = sets.map(s => {
      const have = s.stickers.filter(st => owned[st.id]).length;
      return `
        <section class="stk-set">
          <h3 class="stk-set-head"><span>${s.icon} ${s.name}</span><span class="stk-set-count">${have}/${s.stickers.length}</span></h3>
          <div class="stk-grid">
            ${s.stickers.map(st => owned[st.id]
              ? `<button type="button" class="stk-item" data-id="${st.id}" aria-label="Xem sticker lớn"><img src="${st.url}" alt="" loading="lazy">${owned[st.id] > 1 ? `<span class="stk-dup">×${owned[st.id]}</span>` : ''}</button>`
              : `<div class="stk-item is-locked" aria-label="Chưa có"><img src="${st.url}" alt="" loading="lazy"><span class="stk-lock">?</span></div>`
            ).join('')}
          </div>
        </section>`;
    }).join('');
    app.querySelectorAll('.stk-item[data-id]').forEach(el => {
      el.onclick = () => openViewer(el.dataset.id);
    });
  }

  // ── Xem sticker cỡ lớn; ◀ ▶ (hoặc phím mũi tên, vuốt) để xem các sticker đã có ──
  function openViewer(startId) {
    const owned = getOwned();
    const dates = getReceivedDates();
    const list = getSets(gender).flatMap(s => s.stickers.filter(st => owned[st.id]).map(st => ({ ...st, set: s })));
    let i = Math.max(0, list.findIndex(st => st.id === startId));

    const overlay = document.createElement('div');
    overlay.className = 'stk-viewer';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <button type="button" class="stk-viewer-close" data-act="close" aria-label="Đóng">✕</button>
      <button type="button" class="stk-viewer-nav stk-viewer-prev" data-act="prev" aria-label="Sticker trước">‹</button>
      <figure class="stk-viewer-body">
        <img class="stk-viewer-img" alt="">
        <figcaption class="stk-viewer-cap"></figcaption>
      </figure>
      <button type="button" class="stk-viewer-nav stk-viewer-next" data-act="next" aria-label="Sticker sau">›</button>
    `;
    const img = overlay.querySelector('.stk-viewer-img');
    const cap = overlay.querySelector('.stk-viewer-cap');
    const show = () => {
      const st = list[i];
      img.src = st.url;
      img.classList.remove('is-in');
      void img.offsetWidth; // chạy lại hiệu ứng khi đổi sticker
      img.classList.add('is-in');
      const d = dates[st.id]?.split('-');
      cap.innerHTML = `
        <strong>${st.set.icon} ${st.set.name}</strong>
        <span>${i + 1}/${list.length}${owned[st.id] > 1 ? ` · Có ${owned[st.id]} cái` : ''}${d ? ` · Nhận ngày ${d[2]}/${d[1]}/${d[0]}` : ''}</span>`;
      overlay.querySelectorAll('.stk-viewer-nav').forEach(b => { b.hidden = list.length < 2; });
    };
    const go = (step) => { i = (i + step + list.length) % list.length; show(); };
    const close = () => { document.removeEventListener('keydown', onKey); overlay.remove(); };
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    };
    let swiped = false;
    overlay.addEventListener('click', (e) => {
      if (swiped) { swiped = false; return; } // vừa vuốt thì không tính là bấm
      const act = e.target.closest('[data-act]')?.dataset.act;
      if (act === 'prev') go(-1);
      else if (act === 'next') go(1);
      else if (act === 'close' || e.target === overlay) close();
    });
    // Vuốt ngang trên iPad
    let x0 = null;
    overlay.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
    overlay.addEventListener('pointerup', (e) => {
      if (x0 !== null && Math.abs(e.clientX - x0) > 50 && list.length > 1) {
        swiped = true;
        go(e.clientX < x0 ? 1 : -1);
      }
      x0 = null;
    });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(overlay);
    show();
    overlay.querySelector('.stk-viewer-close').focus();
  }

  function doSpin() {
    if (spinning) return;
    const result = spin(gender);
    if (!result) { drawStatus(); return; }
    spinning = true;
    drawStatus();

    // Đưa tâm ô trúng (lệch ngẫu nhiên một chút) về dưới kim ở vạch 12 giờ.
    const seg = 360 / result.segments;
    const center = (result.setIndex + 0.5) * seg + (Math.random() - 0.5) * seg * 0.6;
    const target = (360 - center) % 360;
    rotation += TURNS * 360 + ((target - (rotation % 360)) + 360) % 360;
    wheel.style.transition = `transform ${SPIN_MS}ms cubic-bezier(0.15, 0.7, 0.1, 1)`;
    wheel.style.transform = `rotate(${rotation}deg)`;

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      spinning = false;
      reveal(result);
      drawStatus();
      drawAlbum();
    };
    wheel.addEventListener('transitionend', finish, { once: true });
    setTimeout(finish, SPIN_MS + 300);
  }

  function reveal({ set, sticker, isNew }) {
    try {
      const sfx = new Audio(CONFETTI_SFX);
      sfx.play().catch(() => {});
    } catch { /* no audio */ }
    const overlay = document.createElement('div');
    overlay.className = 'app-dialog-overlay stk-reveal-overlay';
    overlay.innerHTML = `
      <img class="stk-confetti" src="${CONFETTI_IMG}" alt="">
      <div class="app-dialog stk-reveal" role="dialog" aria-modal="true" aria-labelledby="stk-reveal-title">
        <h2 id="stk-reveal-title">${isNew ? '🎉 Sticker mới!' : '😊 Em đã có sticker này rồi'}</h2>
        <p class="stk-reveal-set">${set.icon} Bộ ${set.name}</p>
        <img class="stk-reveal-img" src="${sticker.url}" alt="">
        <div class="app-dialog-actions">
          <button type="button" class="btn btn-primary" data-act="ok">Tuyệt vời!</button>
        </div>
      </div>
    `;
    const close = () => { document.removeEventListener('keydown', onKey); overlay.remove(); };
    const onKey = (e) => { if (e.key === 'Escape' || e.key === 'Enter') close(); };
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('[data-act="ok"]')) close();
    });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(overlay);
    overlay.querySelector('[data-act="ok"]').focus();
    app.querySelector(`.stk-item[data-id="${CSS.escape(sticker.id)}"]`)?.classList.add('is-fresh');
  }
}
