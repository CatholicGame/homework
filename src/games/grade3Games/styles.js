/** CSS của trò chơi tăng cường Toán 3 (g3g-* chung, g3f-* khung quầy + quầy trái cây, g3e-* quầy trứng). */

/** Nền các màn menu: mái che chợ + mây trôi (đặt đầu .g3g-menu). */
export function menuBackdrop() {
  return '<div class="g3g-sky" aria-hidden="true"><span class="g3g-cloud c1"></span><span class="g3g-cloud c2"></span><span class="g3g-cloud c3"></span></div><div class="g3g-awning" aria-hidden="true"></div>';
}

/**
 * Màn menu to theo màn hình: đặt --z (zoom) trên .g3g-menu — theo chiều rộng, nhưng không để
 * màn thấp phải cuộn quá nhiều. Điện thoại giữ cỡ gốc (1), màn máy tính / iPad ngang to tới 1,8.
 */
function menuZoom(max = 1.8) {
  const z = Math.min(window.innerWidth / 1000, window.innerHeight / 380, max);
  return Math.max(1, Math.round(z * 100) / 100);
}
let fitListening = false;
export function fitMenu(root) {
  // data-zmax trên .g3g-menu: trần zoom riêng (vd. Toán 4 nhiều chữ, 1,8 thì quá khổ).
  const apply = (el) => el.style.setProperty('--z', menuZoom(+el.dataset.zmax || undefined));
  root.querySelectorAll('.g3g-menu').forEach(apply);
  if (!fitListening) {
    fitListening = true;
    window.addEventListener('resize', () => document.querySelectorAll('.g3g-menu').forEach(apply));
  }
}

export function injectGameStyles() {
  if (document.getElementById('g3g-styles')) return;
  // Cùng font "Baloo 2" với game Tiền tiểu học (preschool.css).
  if (!document.getElementById('g3g-font')) {
    const font = document.createElement('link');
    font.id = 'g3g-font';
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&display=swap';
    document.head.appendChild(font);
  }
  const style = document.createElement('style');
  style.id = 'g3g-styles';
  style.textContent = `
    .g3g-wrap { min-height: 100vh; background: linear-gradient(160deg, #FFF7ED 0%, #ECFDF5 55%, #EFF6FF 100%); padding: 1rem; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; }
    .g3g-card { background: #fff; border-radius: 1.5rem; padding: 1.4rem 1.3rem; max-width: 640px; width: 100%; box-shadow: 0 8px 30px rgba(0,0,0,0.1); box-sizing: border-box; }
    .g3g-h2 { font-size: 1.5rem; font-weight: 800; color: #1E293B; margin: 0.3rem 0; }
    .g3g-icon-btn { background: rgba(0,0,0,0.07); border: none; color: #1E293B; font-size: 1.05rem; min-width: 2.4rem; height: 2.4rem; border-radius: 0.7rem; cursor: pointer; font-weight: 800; font-family: inherit; flex-shrink: 0; }
    .g3g-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.15rem; }
    .g3g-tags i { font-style: normal; font-size: 0.8rem; font-weight: 700; background: #E0F2FE; color: #075985; border-radius: 999px; padding: 0.08rem 0.6rem; }
    .g3g-tags i.g3g-tag-done { background: #DCFCE7; color: #166534; }
    .g3g-tags i.g3g-tag-best { background: #FEF3C7; color: #92400E; }

    /* Nút kiểu game: khối nổi có "đế" bóng bên dưới, bấm thì lún xuống (giống game Tiền tiểu học) */
    .g3g-btn { border: none; border-radius: 1rem; padding: 0.85rem 1.3rem; font-size: 1.05rem; font-weight: 800; cursor: pointer; font-family: inherit; transition: transform .1s, box-shadow .1s; touch-action: manipulation; }
    .g3g-btn:active { transform: translateY(4px); }
    .g3g-btn-primary { background: linear-gradient(180deg, #4ADE80, #22C55E); color: #fff; box-shadow: 0 5px 0 #15803D, 0 8px 16px rgba(21,128,61,0.25); text-shadow: 0 2px 0 rgba(21,128,61,0.45); }
    .g3g-btn-primary:active { box-shadow: 0 1px 0 #15803D; }
    .g3g-btn-secondary { background: linear-gradient(180deg, #FDBA74, #FB923C); color: #fff; box-shadow: 0 5px 0 #C2410C, 0 8px 16px rgba(194,65,12,0.2); text-shadow: 0 2px 0 rgba(194,65,12,0.4); }
    .g3g-btn-secondary:active { box-shadow: 0 1px 0 #C2410C; }
    .g3g-btn-ghost { background: #fff; color: #0369A1; box-shadow: 0 5px 0 #7DD3FC, 0 8px 14px rgba(2,132,199,0.15); }
    .g3g-btn-ghost:active { box-shadow: 0 1px 0 #7DD3FC; }

    /* ── Các màn menu (chọn trò / quầy / cấp / giới thiệu cấp / tổng kết) — cùng ngôn ngữ với game Tiền tiểu học ── */
    .g3g-menu { --g3g-font: 'Baloo 2', 'Quicksand', sans-serif; --g3g-ink: #1E3A5F; position: relative; overflow: hidden; overflow: clip; font-family: var(--g3g-font); color: var(--g3g-ink); padding: 1.9rem 1rem 2rem; background: linear-gradient(180deg, #7DD3FC 0%, #E0F7FF 45%, #FFF7ED 80%, #FED7AA 100%); -webkit-tap-highlight-color: transparent; }
    .g3g-menu button { font-family: var(--g3g-font); }
    /* Nội dung menu được zoom theo --z (fitMenu). Bề rộng tối đa tính trước khi zoom, nên chia cho --z
       để khối sau khi phóng to vẫn vừa màn hình. Màn ngang rộng: cho khối rộng ra, các danh sách tự chia cột. */
    .g3g-screen { position: relative; z-index: 1; width: 100%; --g3g-max: 640px; }
    .g3g-screen, .g3g-menu .g3g-card { zoom: var(--z, 1); max-width: min(var(--g3g-max, 640px), calc((100vw - 3rem) / var(--z, 1))); }
    @media (orientation: landscape) and (min-width: 820px) {
      .g3g-screen { --g3g-max: 1180px; }
      .g3g-menu .g3g-card { --g3g-max: 760px; }
    }

    /* Mái che sọc đỏ trắng của chợ + mây trôi phía sau */
    .g3g-awning { position: absolute; left: 0; right: 0; top: 0; height: 1.1rem; z-index: 2; background: repeating-linear-gradient(90deg, #F87171 0 40px, #FFF 40px 80px); border-bottom: 3px solid #DC2626; }
    .g3g-awning::after { content: ''; position: absolute; left: 0; right: 0; bottom: -11px; height: 11px; background: radial-gradient(circle at 20px 0, #F87171 19px, transparent 20px) 0 0 / 80px 11px repeat-x, radial-gradient(circle at 20px 0, #fff 19px, transparent 20px) 40px 0 / 80px 11px repeat-x; }
    .g3g-sky { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
    .g3g-cloud { position: absolute; width: 140px; height: 46px; border-radius: 46px; background: rgba(255,255,255,0.85); left: -160px; animation: g3gCloud 40s linear infinite; }
    .g3g-cloud::before, .g3g-cloud::after { content: ''; position: absolute; background: inherit; border-radius: 50%; }
    .g3g-cloud::before { width: 64px; height: 64px; left: 20px; top: -30px; }
    .g3g-cloud::after { width: 48px; height: 48px; left: 70px; top: -20px; }
    .g3g-cloud.c1 { top: 110px; }
    .g3g-cloud.c2 { top: 300px; animation-duration: 55s; animation-delay: -22s; transform: scale(0.7); }
    .g3g-cloud.c3 { top: 560px; animation-duration: 47s; animation-delay: -36s; transform: scale(0.85); }
    @keyframes g3gCloud { from { translate: 0 0; } to { translate: calc(100vw + 320px) 0; } }
    @media (prefers-reduced-motion: reduce) { .g3g-cloud, .g3g-npc-pic { animation: none; } }

    /* Thanh trên: nút tròn vàng + tiêu đề chữ trắng nổi khối + đồng hồ sao */
    .g3g-top { display: flex; align-items: center; gap: 0.6rem; margin: 0.4rem 0 0.5rem; }
    .g3g-round-btn { flex: none; display: grid; place-items: center; width: 52px; height: 52px; border-radius: 50%; border: 4px solid #fff; background: #FCD34D; color: #78350F; font-size: 1.6rem; font-weight: 800; line-height: 1; cursor: pointer; box-shadow: 0 5px 0 #D97706, 0 8px 16px rgba(0,0,0,0.18); transition: transform .12s, box-shadow .12s; }
    .g3g-round-btn:active { transform: translateY(4px); box-shadow: 0 1px 0 #D97706; }
    .g3g-title { flex: 1; min-width: 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.15rem; }
    .g3g-title h1 { margin: 0; font-size: clamp(1.6rem, 6vw, 2.3rem); line-height: 1.15; font-weight: 800; color: #fff; text-shadow: 0 3px 0 #0284C7, 0 6px 12px rgba(2,132,199,0.35); }
    .g3g-kicker { display: inline-block; padding: 0.05rem 0.9rem; border-radius: 999px; background: #FB923C; color: #fff; font-weight: 800; font-size: clamp(0.95rem, 3vw, 1.1rem); border: 3px solid #fff; box-shadow: 0 3px 0 #C2410C; }
    .g3g-stars { flex: none; padding: 0.3rem 0.8rem; border-radius: 999px; background: #fff; font-weight: 800; font-size: 1.1rem; color: #92400E; box-shadow: 0 3px 0 #FBBF24; }
    .g3g-top-spacer { flex: none; width: 52px; }
    .g3g-purpose { box-sizing: border-box; max-width: 960px; margin: 0 auto 0.7rem; background: rgba(255,255,255,0.9); border: 2px solid #BAE6FD; border-radius: 1rem; padding: 0.45rem 0.9rem; text-align: center; color: #1E3A5F; line-height: 1.4; font-size: clamp(0.95rem, 1.1vh + 0.6rem, 1.12rem); }
    .g3g-purpose b { color: #0369A1; }
    .g3g-lead { text-align: center; margin: 0 0 1rem; font-weight: 700; font-size: clamp(1rem, 3.2vw, 1.2rem); color: #075985; }

    /* Thẻ lựa chọn (trò / cấp) — trắng, bo tròn, có đế màu */
    /* Ghi chú cho bố mẹ và em dưới danh sách cấp (game.note) */
    .g3g-note { margin-top: 1.2rem; background: rgba(255,255,255,0.92); border: 3px solid #BAE6FD; border-radius: 1.2rem; padding: 0.9rem 1.1rem; color: #1E3A5F; line-height: 1.45; font-size: clamp(0.95rem, 1.2vh + 0.6rem, 1.15rem); box-shadow: 0 4px 0 rgba(14,116,144,0.12); }
    .g3g-note h3 { margin: 0 0 0.6rem; font-size: 1.2em; color: #0C4A6E; }
    .g3g-note-cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 0.7rem; }
    .g3g-note-cols > div { border-radius: 0.9rem; padding: 0.6rem 0.8rem; }
    .g3g-note-yes { background: #F0FDF4; border: 2px solid #86EFAC; }
    .g3g-note-later { background: #FFF7ED; border: 2px solid #FDBA74; }
    .g3g-note ul { margin: 0.35rem 0 0; padding-left: 1.2rem; }
    .g3g-note li { margin: 0.15rem 0; }
    .g3g-note i { color: #64748B; font-style: normal; font-size: 0.9em; }
    .g3g-note p { margin: 0.7rem 0 0; color: #334155; }
    .g3g-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr)); gap: 0.9rem 1rem; }
    .g3g-tile { display: flex; align-items: center; gap: 0.8rem; text-align: left; background: #fff; border: 3px solid #fff; border-radius: 1.3rem; padding: 0.8rem 0.9rem; cursor: pointer; color: var(--g3g-ink); box-shadow: 0 6px 0 #BAE6FD, 0 10px 18px rgba(2,132,199,0.12); transition: transform .12s, box-shadow .12s, border-color .15s; }
    .g3g-tile:hover { border-color: #7DD3FC; transform: translateY(-2px); }
    .g3g-tile:active { transform: translateY(4px); box-shadow: 0 2px 0 #BAE6FD; }
    .g3g-tile-icon { font-size: 2.6rem; line-height: 1; }
    .g3g-tile-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.15rem; color: #475569; font-size: 0.98rem; line-height: 1.35; }
    .g3g-tile-info strong { color: var(--g3g-ink); font-size: 1.25rem; line-height: 1.2; }
    .g3g-go { flex: none; display: grid; place-items: center; width: 2.4rem; height: 2.4rem; border-radius: 50%; background: #22C55E; color: #fff; font-size: 0.95rem; box-shadow: 0 3px 0 #15803D; }
    .g3g-level-num { flex: none; width: 3rem; height: 3rem; border-radius: 50%; border: 3px solid #fff; background: linear-gradient(135deg, #FB923C, #F472B6); color: #fff; font-weight: 800; display: grid; place-items: center; font-size: 1.5rem; box-shadow: 0 4px 0 #BE185D; text-shadow: 0 2px 0 rgba(190,24,93,0.4); }
    .g3g-dev-note { margin: 1.2rem 0 0; font-size: 0.85rem; color: #9A3412; text-align: center; font-weight: 600; }

    /* Quầy hàng */
    .g3g-stalls { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 0.6rem; }
    .g3g-stall { position: relative; display: flex; flex-direction: column; align-items: center; gap: 0.2rem; padding: 1.3rem 0.6rem 0.9rem; border-radius: 1.3rem; border: 3px solid #fff; background: #FFF7ED; cursor: pointer; color: #9A3412; font-size: 0.9rem; text-align: center; box-shadow: 0 6px 0 #FDBA74, 0 10px 18px rgba(194,65,12,0.15); transition: transform .12s, box-shadow .12s; }
    .g3g-stall:active { transform: translateY(4px); box-shadow: 0 2px 0 #FDBA74; }
    .g3g-stall strong { color: var(--g3g-ink); font-size: 1.15rem; }
    .g3g-stall-icon { font-size: 2.8rem; line-height: 1; height: 56px; display: flex; align-items: center; }
    .g3g-stall em { position: absolute; top: -0.7rem; font-style: normal; font-weight: 800; font-size: 0.8rem; border-radius: 999px; padding: 0.05rem 0.6rem; border: 2px solid #fff; }
    .g3g-stall-open { background: #22C55E; color: #fff; box-shadow: 0 2px 0 #15803D; }
    .g3g-stall-lesson { margin-top: 0.2rem; background: #E0F2FE; color: #075985; font-weight: 700; font-size: 0.85rem; border-radius: 999px; padding: 0.05rem 0.6rem; }
    .g3g-stall-soon { cursor: default; background: rgba(255,255,255,0.6); color: #64748B; box-shadow: 0 6px 0 rgba(148,163,184,0.45); }
    .g3g-stall-soon .g3g-stall-icon { filter: grayscale(0.6); opacity: 0.7; }
    .g3g-stall-soon em { background: #CBD5E1; color: #334155; }

    /* Giới thiệu cấp: khách giao nhiệm vụ qua bong bóng thoại */
    /* Giới thiệu cấp: khách nói một câu ngắn · cách chơi bằng hình · nút Chơi to — ít chữ để bé bắt đầu ngay */
    .g3g-hero { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.8rem; align-items: center; max-width: 980px; margin: 0.2rem auto 0; }
    @media (orientation: landscape) and (min-width: 820px) { .g3g-hero { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); gap: 2.2rem; } }
    .g3g-hero-npc { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; }
    .g3g-npc-pic { flex: none; height: clamp(170px, 34vh, 280px); animation: g3gBob 2.6s ease-in-out infinite; }
    .g3g-npc-pic img { height: 100%; width: auto; display: block; filter: drop-shadow(0 5px 0 rgba(2,132,199,0.25)); }
    @keyframes g3gBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
    .g3g-say { position: relative; box-sizing: border-box; width: 100%; margin: 0 0 0.7rem; padding: 0.7rem 1.1rem; border-radius: 22px; background: #fff; font-size: clamp(1.15rem, 3.6vw, 1.4rem); font-weight: 700; line-height: 1.4; color: var(--g3g-ink); text-align: center; box-shadow: 0 5px 0 rgba(14,165,233,0.25); }
    .g3g-say::before { content: ''; position: absolute; left: 50%; bottom: -12px; margin-left: -12px; border: 12px solid transparent; border-top-color: #fff; border-bottom: 0; }
    .g3g-say-name { display: block; font-size: 0.72em; color: #EA580C; letter-spacing: 0.02em; }
    .g3g-hero-main { display: flex; flex-direction: column; gap: 0.9rem; }
    /* Màn thấp (điện thoại / laptop ngang): nút Chơi luôn trong màn hình (dính đáy) */
    @media (max-height: 760px) { .g3g-hero-main .g3g-btn-big { position: sticky; bottom: 0.6rem; z-index: 3; } }
    /* Điện thoại xoay ngang: khách đứng cạnh bong bóng cho gọn chiều cao */
    @media (orientation: landscape) and (max-height: 500px) {
      .g3g-hero-npc { flex-direction: row-reverse; align-items: flex-end; gap: 0.8rem; }
      .g3g-hero-npc .g3g-npc-pic { height: 150px; }
      .g3g-hero-npc .g3g-say { margin: 0 0 1rem; text-align: left; }
      .g3g-hero-npc .g3g-say::before { left: -12px; bottom: 18px; margin: 0; border: 12px solid transparent; border-right-color: #fff; border-left: 0; }
    }

    /* Cách chơi: các bước là hình tròn to có nhãn 1–2 chữ, nối bằng mũi tên */
    .g3g-how { display: flex; align-items: flex-start; justify-content: center; gap: 0.4rem; background: #fff; border-radius: 1.4rem; padding: 0.9rem 0.8rem 0.7rem; box-shadow: 0 6px 0 #FCD34D, 0 10px 18px rgba(217,119,6,0.12); }
    .g3g-how-step { flex: 0 1 7.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.3rem; text-align: center; }
    .g3g-how-step b { font-size: clamp(0.9rem, 2.6vw, 1.05rem); line-height: 1.15; color: var(--g3g-ink); }
    .g3g-how-pic { width: 3.9rem; height: 3.9rem; border-radius: 50%; background: #FFFBEB; border: 3px solid #FDE68A; display: grid; place-items: center; font-size: 2rem; line-height: 1; }
    .g3g-how-pic svg { width: auto; height: 2.6rem; }
    .g3g-how-arrow { flex: none; align-self: flex-start; margin-top: 1.25rem; color: #F59E0B; font-size: 1.3rem; font-weight: 800; }
    .g3g-goal-row { display: flex; justify-content: center; align-items: center; gap: 0.7rem; }
    .g3g-goal-faces { display: flex; gap: 0.35rem; }
    .g3g-goal-faces i { font-style: normal; display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: rgba(255,255,255,0.8); border: 2px dashed #FCD34D; font-size: 1.5rem; line-height: 1; }
    .g3g-goal-best { font-weight: 800; color: #92400E; font-size: 1rem; background: #FEF3C7; border-radius: 999px; padding: 0.05rem 0.7rem; }

    /* Cần biết / bài học (dành cho bố mẹ) — một dòng nhỏ, không tranh chỗ với nút Chơi */
    .g3g-need-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.3rem 0.4rem; font-size: 0.9rem; font-weight: 600; color: #475569; }
    .g3g-need-row i { font-style: normal; font-weight: 700; background: rgba(255,255,255,0.75); color: #3730A3; border-radius: 999px; padding: 0 0.6rem; }
    .g3g-need-book { font-weight: 700; color: var(--g3g-ink); }
    .g3g-stamp { display: inline-block; transform: rotate(-4deg); padding: 0 0.5rem; border-radius: 0.5rem; background: #DCFCE7; color: #15803D; border: 2px solid #22C55E; font-weight: 800; font-size: 0.85rem; }
    .g3g-link-btn { border: none; background: none; padding: 0.1rem 0.3rem; color: #0369A1; font-weight: 800; font-size: inherit; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }

    .g3g-actions { display: flex; flex-direction: column; gap: 0.8rem; margin-top: 1rem; }
    .g3g-btn-big { font-size: clamp(1.4rem, 5vw, 1.7rem); padding: 0.75rem 1.3rem; border: 4px solid #fff; border-radius: 1.3rem; animation: g3gPulse 1.8s ease-in-out infinite; }
    .g3g-btn-big:active { animation: none; }
    @keyframes g3gPulse { 0%, 100% { scale: 1; } 50% { scale: 1.03; } }
    @media (prefers-reduced-motion: reduce) { .g3g-btn-big { animation: none; } }

    /* Tổng kết lượt chơi dùng chung nền menu */
    .g3g-menu .g3g-card { position: relative; z-index: 1; border-radius: 1.5rem; box-shadow: 0 7px 0 #BAE6FD, 0 12px 24px rgba(2,132,199,0.15); }
    .g3g-menu .g3g-h2 { color: var(--g3g-ink); font-size: 1.8rem; }

    /* Màn chơi: phủ kín #app (fixed inset 0), không cuộn; các phần co giãn theo chiều cao màn hình */
    body.g3g-playing #global-fullscreen-btn { display: none; }
    .g3g-play { position: relative; height: 100%; min-height: 0; padding: 0.5rem; gap: 0.4rem; align-items: stretch; overflow: hidden; font-family: 'Baloo 2', 'Quicksand', sans-serif; background: linear-gradient(180deg, #BAE6FD 0%, #E0F7FF 40%, #FFF7ED 100%); -webkit-tap-highlight-color: transparent; }
    .g3g-play button { font-family: inherit; }
    .g3g-topbar { display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0; }
    .g3g-orient-btn { display: inline-grid; place-items: center; color: #2563EB; }
    .g3g-orient-btn[hidden] { display: none; }
    .g3g-play .g3g-icon-btn { background: #fff; box-shadow: 0 3px 0 #93C5FD; border-radius: 50%; min-width: 2.5rem; height: 2.5rem; }
    .g3g-top-title { flex: 1; font-weight: 800; color: #1E3A5F; font-size: clamp(0.95rem, 2.2vh + 0.35rem, 1.3rem); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    /* Tiến độ: 5 ô khách — xong khách nào hiện mặt 😊 / 😕 (cùng hình với màn giới thiệu) */
    .g3g-dots { display: flex; gap: 0.3rem; background: #fff; border-radius: 999px; padding: 0.2rem 0.35rem; box-shadow: 0 3px 0 #93C5FD; }
    .g3g-dot { width: 1.9rem; height: 1.9rem; border-radius: 50%; display: grid; place-items: center; font-size: 1.25rem; line-height: 1; background: #F1F5F9; border: 2px dashed #CBD5E1; box-sizing: border-box; transition: background .2s, transform .2s; }
    .g3g-dot-now { border: 2px solid #3B82F6; background: #DBEAFE; transform: scale(1.12); }
    .g3g-dot-ok { background: #DCFCE7; border: 2px solid #22C55E; }
    .g3g-dot-fail { background: #FFE4E6; border: 2px solid #FB7185; }
    .g3g-stage { flex: 1; min-height: 0; display: flex; }
    .g3g-stage > * { flex: 1; min-width: 0; min-height: 0; }
    .g3g-result { box-sizing: border-box; border-radius: 1rem; padding: 0.8rem 0.9rem; display: flex; flex-direction: column; gap: 0.55rem; animation: g3gUp .25s ease; }
    .g3g-result-ok { background: #DCFCE7; border: 2px solid #86EFAC; }
    .g3g-result-fail { background: #FFF1F2; border: 2px solid #FECDD3; }
    .g3g-result-text { font-weight: 700; color: #1E293B; font-size: clamp(0.95rem, 1.6vh + 0.55rem, 1.3rem); line-height: 1.45; }
    .g3g-tip { background: #FFFBEB; border: 1.5px dashed #FCD34D; border-radius: 0.8rem; padding: 0.6rem 0.8rem; color: #78350F; line-height: 1.45; font-size: clamp(0.85rem, 1.2vh + 0.5rem, 1.1rem); margin: 0; }
    @keyframes g3gUp { from { transform: translateY(10px); opacity: 0; } to { transform: none; opacity: 1; } }

    /* Nhắc xoay ngang (điện thoại cầm dọc) */
    .g3g-rotate { position: absolute; inset: 0; z-index: 50; background: linear-gradient(160deg, #FFF7ED, #ECFDF5); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; padding: 1.5rem; text-align: center; }
    .g3g-rotate[hidden] { display: none; }
    .g3g-rotate p { font-size: 1.25rem; font-weight: 800; color: #1E293B; margin: 0; }
    .g3g-rotate-phone { width: 64px; height: auto; animation: g3gRotate 1.8s ease-in-out infinite; }
    @keyframes g3gRotate { 0%, 20% { transform: rotate(0); } 55%, 80% { transform: rotate(-90deg); } 100% { transform: rotate(0); } }

    /* Tổng kết */
    .g3g-summary { text-align: center; }
    .g3g-summary-icon { font-size: 3rem; }
    .g3g-summary-line { font-size: 1.1rem; color: #334155; }
    .g3g-summary-dots { display: flex; justify-content: center; gap: 0.4rem; font-size: 2rem; margin: 0.4rem 0; }
    .g3g-summary-stars { font-size: 1.4rem; font-weight: 800; color: #D97706; margin: 0.3rem 0; }
    .g3g-summary-best { color: #64748B; font-weight: 700; }

    /* Bàn phím số */
    .g3g-keypad { background: #334155; border-radius: 1rem; padding: 0.55rem; width: 100%; max-width: 360px; box-sizing: border-box; margin: 0 auto; }
    .g3g-lcd { background: #D9F99D; border-radius: 0.6rem; padding: 0.3rem 0.7rem; display: flex; align-items: baseline; justify-content: flex-end; gap: 0.4rem; font-family: 'Courier New', monospace; margin-bottom: 0.45rem; box-shadow: inset 0 2px 5px rgba(0,0,0,0.25); }
    .g3g-lcd-val { font-size: clamp(1.4rem, 5vh, 2.6rem); font-weight: 800; color: #1A2E05; min-width: 2ch; text-align: right; line-height: 1.2; }
    .g3g-lcd-unit { font-size: clamp(0.8rem, 1.6vh, 1.05rem); font-weight: 700; color: #3F6212; font-family: Quicksand, sans-serif; }
    .g3g-keys { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4rem; }
    .g3g-key { height: clamp(2.2rem, 8.5vh, 4rem); border: none; border-radius: 0.6rem; background: #F8FAFC; font-size: clamp(1.1rem, 3.2vh, 1.9rem); font-weight: 800; color: #1E293B; cursor: pointer; font-family: inherit; box-shadow: 0 3px 0 #94A3B8; touch-action: manipulation; }
    .g3g-key:active { transform: translateY(2px); box-shadow: 0 1px 0 #94A3B8; }
    .g3g-key-del { background: #FEE2E2; color: #991B1B; }
    .g3g-key-ok { background: #22C55E; color: #fff; box-shadow: 0 3px 0 #15803D; }
    .g3g-key:disabled { opacity: 0.45; cursor: default; }
    .g3g-keypad-ok .g3g-lcd { background: #86EFAC; }
    .g3g-keypad-bad .g3g-lcd { background: #FECACA; }

    /* Quầy trái cây: khách | quầy. Cân ở giữa, khay quả cân + nút Đổ nằm ngay dưới cân — mắt bé chỉ nhìn một chỗ.
       Máy tính tiền nằm trong cột khách, cạnh khách (giữ chỗ sẵn); kết quả hiện đè lên đáy quầy. */
    .g3f-scene { position: relative; box-sizing: border-box; display: grid; grid-template-columns: clamp(270px, 34%, 470px) minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); grid-template-areas: "cust main"; gap: 0.8rem; background: #fff; border-radius: 1.4rem; padding: clamp(1.7rem, 5vh, 2.6rem) 0.8rem 0.8rem; box-shadow: 0 6px 0 #93C5FD, 0 10px 24px rgba(2,132,199,0.12); overflow: hidden; }
    .g3f-awning { position: absolute; left: 0; right: 0; top: 0; height: clamp(1.1rem, 3.2vh, 1.7rem); background: repeating-linear-gradient(90deg, #F87171 0 36px, #FFF 36px 72px); border-bottom: 3px solid #DC2626; }
    .g3f-awning::after { content: ''; position: absolute; left: 0; right: 0; bottom: -10px; height: 10px; background: radial-gradient(circle at 18px 0, #F87171 17px, transparent 18px) 0 0 / 72px 10px repeat-x, radial-gradient(circle at 18px 0, #fff 17px, transparent 18px) 36px 0 / 72px 10px repeat-x; }
    .g3f-scene > * { min-width: 0; }

    /* Khách: bong bóng một câu ngắn, số cần mua in to */
    /* Cột khách: bong bóng ở trên; dưới là khách (trái) + máy tính tiền (phải) — mọi thông tin ở một phía */
    /* Cả nhóm (bong bóng + khách + máy tính tiền) đứng liền nhau giữa cột — màn ngang mà cao (gần vuông) không
       được giãn hàng khách ra hết chiều cao, kẻo bong bóng dính trên đỉnh còn khách tụt xuống đáy */
    .g3f-customer { grid-area: cust; display: flex; flex-direction: column; align-items: stretch; justify-content: center; gap: 0.7rem; min-height: 0; min-width: 0; }
    .g3f-cust-row { flex: 0 1 auto; min-height: 0; display: flex; gap: 0.5rem; align-items: stretch; }
    .g3f-npc { flex: 0 0 36%; min-width: 0; min-height: 0; display: flex; align-items: flex-end; justify-content: center; }
    .g3f-npc img { height: 100%; max-height: 300px; max-width: 100%; object-fit: contain; object-position: bottom; display: block; margin: 0 auto; }
    /* Tâm trạng khách (npc.js): vui thì nhún nhảy, chưa đúng thì lắc đầu — hình chỉ có một nét mặt */
    /* aspect-ratio: giữ chỗ đúng khổ hình (~21:40) ngay cả khi hình chưa tải xong */
    .g3-npc-img { user-select: none; -webkit-user-drag: none; transform-origin: 50% 100%; aspect-ratio: 21 / 40; object-fit: contain; object-position: bottom; }
    .g3-npc-happy { animation: g3NpcHop 0.9s ease-out; }
    .g3-npc-sad { animation: g3NpcNo 0.7s ease-in-out; }
    @keyframes g3NpcHop { 0%, 100% { transform: translateY(0) scale(1, 1); } 15% { transform: translateY(0) scale(1.06, 0.92); } 40% { transform: translateY(-14%) scale(0.97, 1.04); } 65% { transform: translateY(0) scale(1.04, 0.95); } 80% { transform: translateY(-4%); } }
    @keyframes g3NpcNo { 0%, 100% { transform: rotate(0); } 20% { transform: rotate(-5deg); } 45% { transform: rotate(4deg); } 70% { transform: rotate(-3deg); } }
    @media (prefers-reduced-motion: reduce) { .g3-npc-happy, .g3-npc-sad { animation: none; } }
    .g3f-bubble { position: relative; box-sizing: border-box; width: 100%; background: #fff; border: 3px solid #FDBA74; border-radius: 1.2rem; padding: 0.45rem 0.6rem; font-weight: 700; color: #7C2D12; line-height: 1.3; text-align: center; font-size: clamp(1rem, 1.5vh + 0.6rem, 1.45rem); box-shadow: 0 4px 0 #FED7AA; }
    .g3f-bubble::after { content: ''; position: absolute; bottom: -12px; left: 50%; margin-left: -10px; border: 10px solid transparent; border-top-color: #FDBA74; border-bottom: 0; }
    .g3f-npc-name { display: block; font-size: 0.68em; color: #C2410C; letter-spacing: 0.03em; }
    .g3f-want { display: inline-block; font-size: 1.45em; line-height: 1.1; color: #EA580C; }
    .g3f-note { display: inline-block; background: linear-gradient(135deg, #A7F3D0, #6EE7B7); border: 2px solid #059669; border-radius: 0.35rem; padding: 0 0.4rem; color: #064E3B; font-weight: 800; }

    /* Quầy */
    .g3f-main { grid-area: main; position: relative; min-height: 0; display: flex; gap: 0.8rem; }
    .g3f-counter { flex: 1; min-width: 0; position: relative; min-height: 0; display: flex; flex-direction: column; align-items: center; gap: 0.4rem; background: linear-gradient(#FEF3C7, #FDE68A); border-radius: 1rem; padding: 0.5rem; border-bottom: 10px solid #B45309; }
    .g3f-sign { position: absolute; top: 0.5rem; right: 0.5rem; z-index: 1; display: flex; align-items: center; gap: 0.4rem; background: #1E293B; color: #F8FAFC; border-radius: 0.6rem; padding: 0.3rem 0.6rem 0.3rem 0.35rem; font-size: clamp(0.8rem, 1.3vh + 0.45rem, 1.15rem); line-height: 1.25; border: 3px solid #78350F; }
    .g3f-sign svg { width: 2.2em; height: 2.2em; }
    .g3f-sign strong { color: #FDE68A; }
    .g3f-scale-host { flex: 1; min-height: 0; width: 100%; display: flex; justify-content: center; transition: filter .3s; }
    .g3-scale { width: 100%; height: 100%; display: block; overflow: visible; }
    .g3-scale .g3-w-on-pan { cursor: pointer; }
    .g3-scale-level [data-beam] rect { stroke: #16A34A; stroke-width: 2.5; }
    .g3f-scale-ok { filter: drop-shadow(0 0 10px rgba(34,197,94,0.6)); }

    /* Dưới cân: 👉 [khay quả cân] — gợi ý bằng chuyển động thay cho chữ */
    .g3f-dock { flex-shrink: 0; max-width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.6rem; }
    .g3f-tray { display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-end; gap: 0.35rem; background: #FFFBEB; border: 3px solid #D97706; border-radius: 0.9rem; padding: 0.3rem 0.5rem; min-height: clamp(44px, 10vh, 88px); }
    .g3f-weight { background: none; border: 2px solid transparent; border-radius: 0.6rem; padding: 0.15rem; cursor: pointer; line-height: 0; transition: transform .1s, border-color .15s; touch-action: manipulation; }
    .g3f-weight svg { height: clamp(34px, 9vh, 80px); width: auto; }
    .g3f-weight:hover { border-color: #F59E0B; transform: translateY(-3px); }
    .g3f-weight:active { transform: translateY(2px); }
    .g3f-tray-slot { width: clamp(24px, 5vh, 44px); }
    .g3f-tray-locked { opacity: 0.55; pointer-events: none; }
    /* Dưới cân: [sạp quả] (dưới đĩa trái) · 👉 [khay quả cân] (dưới đĩa phải). Quả to nhỏ theo cân nặng (--k) */
    .g3f-dock { justify-content: space-between; width: 100%; gap: 0.8rem; }
    .g3f-weights { flex: none; display: flex; align-items: center; gap: 0.5rem; }
    .g3f-wtray { flex-wrap: nowrap; }
    .g3f-stock { flex: 1 1 auto; background: #ECFCCB; border-color: #65A30D; gap: 0.1rem 0.2rem; }
    .g3f-piece { background: none; border: 2px solid transparent; border-radius: 0.8rem; padding: 0; cursor: pointer; line-height: 0; display: flex; flex-direction: column; align-items: center; transition: transform .1s, border-color .15s; touch-action: manipulation; }
    .g3f-piece svg, .g3f-piece-slot { display: block; height: calc(clamp(30px, 7vh, 80px) * var(--k, 1)); width: auto; aspect-ratio: 2.6 / 2.9; }
    .g3f-piece:hover { border-color: #65A30D; transform: translateY(-3px); }
    .g3f-piece:active { transform: translateY(2px); }
    .g3-scale .g3-piece-on-pan { cursor: pointer; }
    .g3f-dock-fill .g3f-piece { animation: g3fHop 2.2s ease-in-out infinite; }
    .g3f-dock-fill .g3f-piece:nth-child(2n) { animation-delay: .2s; }
    .g3f-dock-fill .g3f-piece:nth-child(3n) { animation-delay: .4s; }
    /* "Cân xong" chỉ hiện khi cân thăng bằng — nằm trên trụ cân, sát đế (foreignObject trong SVG cân,
       cỡ chữ theo đơn vị hình nên to nhỏ cùng cái cân) */
    .g3-scale-center { overflow: visible; }
    .g3-scale-center-box { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
    .g3f-done { display: flex; flex-direction: column; align-items: center; gap: 1px; white-space: nowrap; font-size: 20px; line-height: 1.1; padding: 4px 18px 5px; border: 3px solid #fff; border-radius: 16px; box-shadow: 0 4px 0 #15803D, 0 6px 14px rgba(21,128,61,0.35); }
    .g3f-done small { font-size: 11px; font-weight: 700; opacity: 0.92; }
    /* Chưa có gì trên một bên đĩa: nút mờ (vẫn thấy, để bé biết bước cuối là tự xác nhận) */
    .g3-scale-center .g3f-done:disabled { opacity: 1; background: #B6C4D2; box-shadow: 0 4px 0 #94A3B8; cursor: default; }
    .g3f-hand { flex: none; visibility: hidden; font-size: clamp(1.5rem, 4vh, 2.4rem); line-height: 1; }
    .g3f-dock-pick .g3f-hand { visibility: visible; animation: g3fPoint 1s ease-in-out infinite; }
    .g3f-dock-pick .g3f-weight { animation: g3fHop 2.2s ease-in-out infinite; }
    .g3f-dock-pick .g3f-weight:nth-child(2) { animation-delay: .15s; }
    .g3f-dock-pick .g3f-weight:nth-child(3) { animation-delay: .3s; }
    .g3f-dock-pick .g3f-weight:nth-child(4) { animation-delay: .45s; }
    .g3f-dock-pick .g3f-weight:nth-child(5) { animation-delay: .6s; }
    @keyframes g3fPoint { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(8px); } }
    @keyframes g3fHop { 0%, 60%, 100% { transform: translateY(0); } 70% { transform: translateY(-7px); } 80% { transform: translateY(0); } }
    @media (prefers-reduced-motion: reduce) { .g3f-dock-pick .g3f-hand, .g3f-dock-pick .g3f-weight, .g3f-dock-fill .g3f-piece { animation: none; } }
    .g3g-btn:disabled { opacity: 0.5; cursor: default; transform: none; animation: none; }

    /* Máy tính tiền: hoá đơn ngắn (hình + số, ô "?" là chỗ cần tìm) + bàn phím */
    .g3f-ask { flex: 1 1 0; min-width: 0; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem; transition: opacity .3s, filter .3s; }
    /* Chưa cần gõ số: máy tính mờ, không bấm được (vẫn giữ chỗ) */
    .g3f-ask-idle { opacity: 0.4; filter: grayscale(0.6); pointer-events: none; }
    .g3f-bill-idle { display: grid; place-items: center; min-height: 3.4rem; font-size: 1.6rem; }
    @keyframes g3fSlide { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: none; } }
    .g3f-bill { background: #FFFBEB; border: 2px dashed #FCD34D; border-radius: 1rem; padding: 0.45rem 0.7rem; display: flex; flex-direction: column; gap: 0.25rem; }
    .g3f-bill-row { display: flex; align-items: center; gap: 0.5rem; font-size: clamp(0.95rem, 1.5vh + 0.55rem, 1.3rem); font-weight: 700; color: #1E3A5F; line-height: 1.3; }
    .g3f-bill-pic { flex: none; width: 2rem; display: grid; place-items: center; font-size: 1.35rem; }
    .g3f-bill-pic svg { width: 1.9rem; height: 1.9rem; }
    .g3f-bill-label { flex: 1; }
    .g3f-bill-q { border-top: 2px solid #FDE68A; padding-top: 0.3rem; }
    .g3f-q { display: inline-grid; place-items: center; min-width: 2.3rem; height: 2rem; border-radius: 0.6rem; background: #FB923C; color: #fff; box-shadow: 0 3px 0 #C2410C; }
    .g3f-ask .g3g-keypad { max-width: none; }
    /* Chờ bé gõ số: dòng "?" sáng lên, ô "?" nhấp nháy (tới khi bấm OK); màn số nhấp nháy viền (tới khi gõ số đầu).
       Nhấp nháy bằng màu / quầng sáng, không phải chuyển động — máy bật "giảm chuyển động" vẫn thấy. */
    .g3f-await .g3f-bill-q { background: #FFEDD5; border-radius: 0.6rem; margin: 0 -0.35rem; padding-left: 0.35rem; padding-right: 0.35rem; }
    .g3f-await .g3f-bill-q .g3f-q { animation: g3fQBlink 1s ease-in-out infinite; }
    @keyframes g3fQBlink { 0%, 100% { background: #FB923C; box-shadow: 0 3px 0 #C2410C, 0 0 0 0 rgba(251,146,60,0.75); } 50% { background: #EA580C; box-shadow: 0 3px 0 #9A3412, 0 0 0 8px rgba(251,146,60,0); } }
    .g3f-await:not(.g3f-typing) .g3g-lcd { animation: g3fLcd 1s steps(1) infinite; }
    @keyframes g3fLcd { 0% { box-shadow: inset 0 2px 5px rgba(0,0,0,0.25), 0 0 0 4px #FB923C; } 50% { box-shadow: inset 0 2px 5px rgba(0,0,0,0.25), 0 0 0 4px transparent; } }
    .g3f-await:not(.g3f-typing) .g3g-lcd-val::after { content: '▌'; color: #3F6212; animation: g3fCaret 1s steps(1) infinite; }
    @keyframes g3fCaret { 50% { opacity: 0; } }
    /* Nhắc nhìn sang máy tính tiền: rung nhẹ + sáng viền (giảm chuyển động: chỉ sáng viền) */
    .g3f-nudge .g3f-bill, .g3f-nudge .g3g-keypad { animation: g3fNudge .45s ease-in-out 2, g3fGlow 1.2s ease-out; }
    @keyframes g3fNudge { 0%, 100% { transform: none; } 25% { transform: translateX(-7px); } 75% { transform: translateX(7px); } }
    @keyframes g3fGlow { 0% { box-shadow: 0 0 0 6px rgba(251,146,60,0.9); } 100% { box-shadow: 0 0 0 16px rgba(251,146,60,0); } }
    @media (prefers-reduced-motion: reduce) { .g3f-nudge .g3f-bill, .g3f-nudge .g3g-keypad { animation: g3fGlow 1.2s ease-out 2; } }
    /* Tới bước tính tiền: khay quả cân (đã khoá) và bảng giá (đã có trong hoá đơn) ẩn đi để cân to hơn */

    /* Kết quả: thẻ bật lên ở đáy quầy (cân vẫn thấy phía trên), phần còn lại mờ đi để bé chỉ nhìn thẻ */
    .g3f-main::after { content: ''; position: absolute; inset: 0; z-index: 4; border-radius: 1rem; background: rgba(15,23,42,0.22); opacity: 0; pointer-events: none; transition: opacity .25s; }
    .g3g-has-result .g3f-main::after { opacity: 1; pointer-events: auto; }
    .g3f-main > .g3g-result { position: absolute; z-index: 5; left: 50%; bottom: 0.7rem; width: min(94%, 460px); max-height: calc(100% - 1.4rem); overflow-y: auto; transform: translateX(-50%); border-width: 3px; border-radius: 1.3rem; text-align: center; align-items: stretch; box-shadow: 0 6px 0 rgba(0,0,0,0.1), 0 16px 36px rgba(0,0,0,0.25); animation: g3fPop .35s cubic-bezier(.2,1.4,.4,1); }
    .g3f-main > .g3g-result .g3g-btn { font-size: clamp(1rem, 1.6vh + 0.6rem, 1.3rem); }
    .g3f-main > .g3g-result .g3g-result-text { font-size: clamp(1rem, 1.8vh + 0.55rem, 1.45rem); }
    .g3f-main > .g3g-result .g3g-tip { font-size: clamp(0.95rem, 1.5vh + 0.5rem, 1.3rem); }
    @keyframes g3fPop { from { opacity: 0; transform: translateX(-50%) scale(0.7); } to { opacity: 1; transform: translateX(-50%) scale(1); } }
    .g3g-result .g3g-btn { white-space: nowrap; }
    /* Khách nhảy xuống đứng trên thẻ kết quả (màn dọc, stall.js cameo): hình mặt buồn + lời nhắc đọc cách làm */
    .g3f-cameo { position: absolute; z-index: 6; left: 50%; width: min(94%, 460px); transform: translateX(-50%); display: flex; align-items: flex-end; gap: 0.5rem; padding-left: 0.4rem; box-sizing: border-box; pointer-events: none; }
    .g3f-cameo-pic { flex: none; height: 130px; visibility: hidden; }
    .g3f-cameo-pic img { height: 100%; width: auto; display: block; }
    .g3f-cameo-say { position: relative; margin-bottom: 1.6rem; background: #fff; border: 3px solid #FDBA74; border-radius: 1rem; padding: 0.4rem 0.8rem; font-weight: 700; color: #7C2D12; line-height: 1.3; font-size: clamp(1rem, 1.5vh + 0.6rem, 1.45rem); box-shadow: 0 4px 0 #FED7AA; opacity: 0; }
    .g3f-cameo-say::after { content: ''; position: absolute; top: 50%; left: -12px; margin-top: -10px; border: 10px solid transparent; border-right-color: #FDBA74; border-left: 0; }
    .g3f-npc-away .g3f-bubble::after { display: none; }
    .g3f-cameo-on .g3f-cameo-pic { visibility: visible; }
    .g3f-cameo-on .g3f-cameo-say { opacity: 1; animation: g3lCard .3s cubic-bezier(.2,1.4,.4,1); transform-origin: 0 50%; }

    /* Màn ngang thấp (điện thoại xoay ngang): cột khách hẹp lại, thẻ kết quả gọn */
    @media (orientation: landscape) and (max-height: 500px) {
      .g3f-scene { grid-template-columns: clamp(260px, 38%, 360px) minmax(0, 1fr); gap: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem; }
      /* Thấp: khách nhỏ cạnh bong bóng ở trên; máy tính tiền bên dưới (hoá đơn | bàn phím) */
      .g3f-customer { display: grid; grid-template-columns: 52px minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr); grid-template-areas: "npc say" "ask ask"; gap: 0.3rem; }
      .g3f-cust-row { display: contents; }
      .g3f-npc { grid-area: npc; height: 60px; }
      .g3f-bubble { grid-area: say; align-self: center; font-size: 0.85rem; line-height: 1.2; padding: 0.2rem 0.4rem; border-width: 2px; }
      .g3f-bubble .g3f-npc-name { display: none; }
      .g3f-bubble::after { top: 50%; left: -12px; bottom: auto; margin: -10px 0 0; border: 10px solid transparent; border-right-color: #FDBA74; border-left: 0; }
      .g3f-ask { grid-area: ask; flex-direction: row; gap: 0.35rem; }
      .g3f-ask > * { flex: 1; min-width: 0; margin: 0 !important; }
      .g3f-bill { justify-content: center; }
      .g3f-bill { padding: 0.25rem 0.5rem; gap: 0.1rem; }
      .g3f-bill-row { font-size: 0.9rem; }
      .g3f-bill-pic, .g3f-bill-pic svg { width: 1.4rem; height: 1.4rem; font-size: 1rem; }
      .g3f-q { height: 1.5rem; min-width: 1.8rem; }
      .g3f-ask .g3g-keypad { padding: 0.3rem; border-radius: 0.7rem; }
      .g3f-ask .g3g-lcd { margin-bottom: 0.25rem; padding: 0 0.5rem; }
      .g3f-ask .g3g-lcd-val { font-size: 1.15rem; line-height: 1.25; }
      .g3f-ask .g3g-keys { gap: 0.22rem; }
      .g3f-ask .g3g-key { height: clamp(1.3rem, 6.2vh, 2rem); font-size: 0.95rem; border-radius: 0.45rem; }
      .g3g-result { padding: 0.5rem 0.7rem; gap: 0.35rem; }
      .g3g-result .g3g-btn { padding: 0.5rem 0.8rem; font-size: 0.95rem; }
      /* Chưa tới bước gõ số (g3f-pad-idle, stall.js): khách đứng to ở nửa trái, máy tính tiền nghỉ nửa phải — không
         chừa ô hoá đơn trống. Tới bước tính thì về bố cục trên (khách nhỏ cạnh bong bóng, hoá đơn | bàn phím). */
      .g3f-pad-idle .g3f-customer { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr); grid-template-areas: "say say" "npc ask"; }
      .g3f-pad-idle .g3f-npc { height: auto; min-height: 0; align-self: stretch; }
      .g3f-pad-idle .g3f-npc img { height: 100%; max-height: none; }
      .g3f-pad-idle .g3f-bill-idle { display: none; }
      .g3f-pad-idle .g3f-bubble::after { top: auto; bottom: -12px; left: 25%; margin: 0 0 0 -10px; border: 10px solid transparent; border-top-color: #FDBA74; border-bottom: 0; }
    }

    /* Màn dọc (iPad dọc / điện thoại chọn chơi dọc): phần khách ở trên — khách (trái) | bong bóng + máy tính tiền (phải);
       quầy bên dưới. Máy tính tiền giữ chỗ sẵn nên quầy không đổi cỡ. */
    @media (orientation: portrait) {
      .g3f-scene { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr); grid-template-areas: "cust" "main"; }
      .g3f-customer { display: grid; grid-template-columns: auto minmax(0, 1fr); grid-template-rows: auto auto; grid-template-areas: "npc say" "npc ask"; gap: 0.5rem 0.8rem; }
      .g3f-cust-row { display: contents; }
      .g3f-npc { grid-area: npc; height: min(26vh, 230px); }
      .g3f-npc img { max-height: none; }
      .g3f-bubble { grid-area: say; width: auto; }
      .g3f-bubble::after { top: 50%; left: -12px; bottom: auto; margin: -10px 0 0; border: 10px solid transparent; border-right-color: #FDBA74; border-left: 0; }
      .g3f-main { flex-direction: column; }
      /* Màn dọc: sạp quả một hàng ngang, khay quả cân hàng dưới — không để sạp bị ép thành cột cao đè mất chỗ của cân */
      .g3f-dock { flex-direction: column; align-items: stretch; gap: 0.5rem; min-width: 0; }
      .g3f-stock { flex: none; min-width: 0; }
      /* Khay quả cân xuống dòng khi chật (không được đẩy cả hàng tràn ra ngoài màn hình) */
      .g3f-weights { justify-content: center; min-width: 0; }
      .g3f-wtray { flex-wrap: wrap; min-width: 0; }
      /* Cỡ quả / quả cân theo bề ngang màn dọc, không theo chiều cao (màn dọc cao nên vh quá lớn) */
      .g3f-piece svg, .g3f-piece-slot { height: calc(clamp(26px, min(7vh, 10vw), 72px) * var(--k, 1)); }
      .g3f-weight svg { height: clamp(30px, min(8vh, 11vw), 72px); }
      .g3f-ask { grid-area: ask; flex: none; flex-direction: row; align-items: stretch; }
      .g3f-ask > * { flex: 1; min-width: 0; margin: 0 !important; }
      .g3f-bill { justify-content: center; }
      .g3f-ask .g3g-key { height: clamp(1.8rem, 4.2vh, 2.8rem); }
    }
    /* Điện thoại cầm dọc (bé chọn chơi dọc): xếp một cột, cho cuộn */
    @media (orientation: portrait) and (max-width: 600px) {
      /* Điện thoại dọc: cả màn chơi nằm gọn trong một khung đầy màn hình, KHÔNG cuộn (cuộn làm bé mất tập trung).
         Khách · quầy · máy tính tiền chia nhau chiều cao; phần nào dư thì hình trong quầy tự to ra. */
      .g3g-play { overflow: hidden; }
      .g3g-result .g3g-btn { white-space: normal; }
      /* Cân lấp hết chỗ còn lại của quầy (SVG tự co giãn giữ tỉ lệ) */
      .g3f-scale-host { flex: 1 1 0; min-height: 0; height: auto; }
      /* Điện thoại dọc: bỏ bàn tay chỉ (quả cân vẫn nhún nhảy gợi ý) để khay quả cân vừa một hàng */
      .g3f-dock-pick .g3f-hand, .g3f-hand { display: none; }
      .g3f-tray { padding: 0.25rem 0.3rem; gap: 0.2rem; }
      .g3f-sign { position: static; align-self: center; }
      .g3f-dock { flex-wrap: wrap; }
      /* Khách + bong bóng ở trên, quầy giữa, máy tính tiền dưới cùng — máy tính chỉ hiện khi tới bước tính */
      .g3f-scene { grid-template-columns: auto minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr) auto; grid-template-areas: "npc say" "main main" "ask ask"; row-gap: 0.5rem; padding-left: 0.45rem; padding-right: 0.45rem; padding-bottom: 0.45rem; }
      .g3f-customer { display: contents; }
      .g3f-main, .g3f-counter { min-height: 0; }
      .g3f-counter { padding: 0.35rem; }
      /* Khách to theo chiều cao màn; tới bước tính thì thu nhỏ nhường chỗ cho máy tính tiền */
      /* Quầy cần ~140vw chiều cao (cân / sạp / khay theo bề ngang) — khách lấy phần còn lại; ước dư thì quầy tự co */
      .g3f-npc { height: clamp(80px, 100vh - 56px - 140vw, 46vw); height: clamp(80px, 100dvh - 56px - 140vw, 46vw); transition: height .3s; }
      .g3f-scene:not(.g3f-pad-idle) .g3f-npc { height: clamp(60px, 11vh, 28vw); height: clamp(60px, 11dvh, 28vw); }
      .g3f-bubble { align-self: center; }
      .g3f-ask-idle { display: none; }
      /* Có kết quả: máy tính tiền (đã khoá) nhường chỗ để thẻ kết quả trong quầy đủ cao, không phải cuộn */
      .g3g-has-result .g3f-ask { display: none; }
      /* Hoá đơn | bàn phím cạnh nhau (xếp chồng thì ăn gần nửa màn, quầy bị ép nhỏ); số trong hoá đơn không bẻ dòng */
      .g3f-ask { flex-direction: row; align-items: stretch; gap: 0.35rem; overflow: visible; }
      .g3f-ask > * { flex: 1 1 0; min-width: 0; }
      .g3f-bill { justify-content: center; padding: 0.3rem 0.45rem; gap: 0.15rem; }
      .g3f-bill-row { font-size: clamp(0.85rem, 1.2vh + 0.5rem, 1.15rem); gap: 0.3rem; }
      .g3f-bill-pic, .g3f-bill-pic svg { width: 1.5rem; height: 1.5rem; font-size: 1.1rem; }
      .g3f-bill-row > :last-child { white-space: nowrap; }
      .g3f-ask .g3g-keypad { padding: 0.4rem; }
      .g3f-ask .g3g-lcd { margin-bottom: 0.3rem; padding: 0.1rem 0.6rem; }
      .g3f-ask .g3g-lcd-val { font-size: clamp(1.3rem, 3.6vh, 2rem); }
      .g3f-ask .g3g-keys { gap: 0.3rem; }
      .g3f-ask .g3g-key { height: clamp(1.9rem, 5vh, 2.9rem); }
      .g3g-dot { width: 1.5rem; height: 1.5rem; font-size: 1rem; }
    }

    /* Quầy trứng: khay trứng rời (trái) | bàn đóng hộp (phải) — hộp tự co giãn cho vừa (--box-w do eggs.js tính) */
    .g3e-bench { flex: 1; min-height: 0; width: 100%; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr); grid-template-rows: minmax(0, 1fr); gap: 0.8rem; padding-top: clamp(2.6rem, 8vh, 4rem); box-sizing: border-box; }
    .g3e-tray { min-height: 0; min-width: 0; display: flex; align-items: center; justify-content: center; }
    .g3e-vi { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; background: #FFFBEB; border: 3px solid #D97706; border-radius: 1rem; padding: 0.5rem; box-shadow: 0 4px 0 rgba(146,64,14,0.2); }
    .g3e-tray-eggs { line-height: 0; }
    .g3e-tray-eggs svg { display: block; }
    .g3e-cap { flex: none; background: #fff; border: 2px solid #92400E; border-radius: 0.6rem; padding: 0 0.6rem; font-weight: 700; color: #1E293B; font-size: clamp(0.85rem, 1.4vh + 0.5rem, 1.25rem); }
    .g3e-cap b { color: #EA580C; }
    .g3e-boxes { min-height: 0; min-width: 0; overflow: hidden; display: flex; flex-wrap: wrap; align-content: center; justify-content: center; gap: 8px; }
    .g3e-box { width: var(--box-w, 120px); padding: 0; border: none; background: none; line-height: 0; border-radius: 0.6rem; touch-action: manipulation; }
    .g3e-box svg { width: 100%; height: auto; display: block; }
    button.g3e-box { cursor: pointer; transition: transform .1s; }
    button.g3e-box:active { transform: scale(0.95); }
    button.g3e-box-full { cursor: default; }
    .g3e-box-short svg rect { stroke: #EF4444; stroke-width: 3; }
    /* Hộp kế tiếp cần đóng: nảy nhẹ + bàn tay chỉ vào */
    .g3e-next { position: relative; animation: g3eNudge 1.3s ease-in-out infinite; }
    .g3e-next::after { content: '👆'; position: absolute; left: 50%; bottom: -0.2rem; translate: -50% 60%; font-size: clamp(1.4rem, 4vh, 2.2rem); line-height: 1; animation: g3eHand 1s ease-in-out infinite; pointer-events: none; }
    @keyframes g3eNudge { 0%, 100% { transform: none; } 50% { transform: translateY(-4px); } }
    @keyframes g3eHand { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
    .g3e-egg-pop { animation: g3eDrop .35s cubic-bezier(.3,1.5,.5,1) both; transform-box: fill-box; transform-origin: center bottom; }
    @keyframes g3eDrop { from { opacity: 0; transform: translateY(-14px) scale(0.6); } to { opacity: 1; transform: none; } }
    @media (prefers-reduced-motion: reduce) { .g3e-next, .g3e-next::after, .g3e-egg-pop { animation: none; } }
    /* Đồ đang bay (fly.js flyOne: trứng khay → hộp, quả / quả cân ↔ đĩa cân) — nổi trên cùng, không bắt chạm */
    .g3-fly { position: fixed; z-index: 60; pointer-events: none; transform-origin: 50% 50%; will-change: transform; filter: drop-shadow(0 5px 4px rgba(15,23,42,0.22)); }
    .g3-fly svg { width: 100%; height: 100%; display: block; }
    .g3e-fly { filter: drop-shadow(0 4px 3px rgba(146,64,14,0.3)); }
    .g3e-ghost { position: relative; width: var(--box-w, 120px); line-height: 0; opacity: 0.75; }
    .g3e-ghost svg { width: 100%; height: auto; }
    .g3e-ghost b { position: absolute; inset: 0; display: grid; place-items: center; font-size: calc(var(--box-w, 120px) * 0.35); line-height: 1; color: #EA580C; text-shadow: 0 2px 0 #fff; }
    /* Tới bước gõ số: bảng hiệu ẩn (đã có trong hoá đơn), bàn đóng hộp lên sát trên */
    /* Màn dọc: trứng của quầy ở trên (xếp hàng chục, rộng hết quầy), bàn đóng hộp ở dưới — trứng đi từ trên xuống hộp */
    @media (orientation: portrait) { .g3e-bench { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) minmax(0, 1.2fr); } }
    /* Điện thoại dọc: bàn lấp hết chỗ còn lại của quầy (không cuộn), bảng giá đứng riêng ở trên nên bỏ khoảng chừa */
    @media (orientation: portrait) and (max-width: 600px) { .g3e-bench { flex: 1 1 0; min-height: 0; padding-top: 0; } }

    /* Quầy nước chanh (g3l-*, market/lemonade.js): mái sọc vàng trắng, bảng tên xanh, dây cờ trên mép quầy,
       mặt trước quầy sọc vàng trắng — như ảnh mẫu scripts/g3games/lemonade-ref/stand.png */
    .g3f-theme-lemon .g3f-awning { background: repeating-linear-gradient(90deg, #FACC15 0 36px, #FFF 36px 72px); border-bottom-color: #CA8A04; }
    .g3f-theme-lemon .g3f-awning::after { background: radial-gradient(circle at 18px 0, #FACC15 17px, transparent 18px) 0 0 / 72px 10px repeat-x, radial-gradient(circle at 18px 0, #fff 17px, transparent 18px) 36px 0 / 72px 10px repeat-x; }
    .g3f-theme-lemon .g3f-counter { background: linear-gradient(#FFFDF2, #FEF3C7); border-bottom: none; padding-bottom: 20px; }
    .g3f-theme-lemon .g3f-counter::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 14px; border-radius: 0 0 1rem 1rem; background: repeating-linear-gradient(90deg, #FACC15 0 22px, #FFF 22px 44px); border-top: 2px solid #CA8A04; }
    .g3f-theme-lemon .g3f-sign { background: #38BDF8; border-color: #0369A1; color: #fff; text-shadow: 0 1px 0 rgba(3,105,161,0.5); }
    .g3f-theme-lemon .g3f-sign strong { color: #FEF08A; }
    .g3l-bunting { position: absolute; left: 0.6rem; right: 0.6rem; top: 0; width: calc(100% - 1.2rem); height: clamp(12px, 2.6vh, 20px); pointer-events: none; }
    .g3l-host { flex: 1; min-height: 0; width: 100%; display: flex; justify-content: center; }
    .g3l-scene { width: 100%; height: 100%; display: block; overflow: hidden; user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; }
    .g3l-tap { cursor: pointer; touch-action: none; outline: none; }
    .g3l-tap:focus-visible rect { stroke: #0EA5E9; stroke-width: 3; stroke-dasharray: 6 4; }
    .g3l-hand { visibility: hidden; }
    .g3l-tap-hint .g3l-hand { visibility: visible; animation: g3lPoint 1s ease-in-out infinite; }
    @keyframes g3lPoint { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-8px); } }
    .g3l-ctrls { width: 100%; height: 100%; display: flex; flex-direction: column; gap: 9px; align-items: stretch; justify-content: flex-end; padding-bottom: 6px; box-sizing: border-box; }
    .g3l-ctrls .g3g-btn { display: flex; flex-direction: column; align-items: center; gap: 1px; padding: 4px 8px 5px; font-size: 15px; line-height: 1.1; border: 3px solid #fff; border-radius: 13px; white-space: nowrap; touch-action: none; -webkit-touch-callout: none; user-select: none; }
    .g3l-ctrls .g3g-btn small { font-size: 8.5px; font-weight: 700; opacity: 0.9; }
    /* Điện thoại dọc (lemonade.js isTall): hai nút nằm ngang dưới kệ ly, chữ to (đơn vị cảnh ≈ px màn hình) */
    .g3l-ctrls.g3l-ctrls-row { flex: none; height: auto; flex-direction: row; align-items: stretch; padding: 2px 0 4px; gap: 10px; }
    .g3l-ctrls-row .g3g-btn { flex: 1 1 0; min-width: 0; justify-content: center; font-size: clamp(17px, 5vw, 22px); padding: 8px 6px; }
    .g3l-ctrls-row .g3g-btn small { font-size: clamp(10px, 2.8vw, 13px); white-space: normal; }
    .g3l-ctrls .g3g-btn:disabled { opacity: 1; background: #CBD5E1; color: #fff; box-shadow: 0 4px 0 #94A3B8; text-shadow: none; cursor: default; }
    .g3l-dump:not(:disabled):active { transform: translateY(3px); }
    .g3l-pop { animation: g3lPop .4s cubic-bezier(.3,1.5,.5,1); transform-box: fill-box; transform-origin: 50% 100%; }
    @keyframes g3lPop { from { transform: scale(0.85); } to { transform: none; } }
    /* Thẻ kết quả nằm bên phải (chỗ các ly) — ca đong và vạch đích được tô vẫn thấy rõ */
    .g3f-theme-lemon .g3f-main > .g3g-result { left: auto; right: 0.7rem; width: min(48%, 420px); transform: none; animation-name: g3lCard; }
    .g3f-theme-lemon .g3f-main::after { background: rgba(15,23,42,0.1); }
    @keyframes g3lCard { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: none; } }
    @media (orientation: portrait) { .g3f-theme-lemon .g3f-main > .g3g-result { left: 50%; right: auto; width: min(94%, 460px); transform: translateX(-50%); animation-name: g3fPop; } }
    .g3l-l { font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-weight: 400; }
    @media (prefers-reduced-motion: reduce) { .g3l-tap-hint .g3l-hand { animation: none; } }
    /* Điện thoại xoay ngang: cảnh thấp — bớt viền quầy, số trên ca to hơn để còn đọc được */
    @media (orientation: landscape) and (max-height: 500px) {
      .g3f-theme-lemon .g3f-counter { padding: 2px 4px 10px; }
      .g3f-theme-lemon .g3f-counter::after { height: 8px; }
      .g3l-bunting { height: 8px; }
      .g3l-scene .g3l-lbl { font-size: 16.5px; }
    }

    /* Tiệm bánh (g3k-*, market/bakery.js): mái sọc hồng trắng, bảng tên hồng, quầy kem */
    .g3f-theme-cake .g3f-awning { background: repeating-linear-gradient(90deg, #F9A8D4 0 36px, #FFF 36px 72px); border-bottom-color: #DB2777; }
    .g3f-theme-cake .g3f-awning::after { background: radial-gradient(circle at 18px 0, #F9A8D4 17px, transparent 18px) 0 0 / 72px 10px repeat-x, radial-gradient(circle at 18px 0, #fff 17px, transparent 18px) 36px 0 / 72px 10px repeat-x; }
    .g3f-theme-cake .g3f-counter { background: linear-gradient(#FFFBF5, #FDE8EF); }
    .g3f-theme-cake .g3f-sign { background: #EC4899; border-color: #9D174D; color: #fff; text-shadow: 0 1px 0 rgba(157,23,77,0.5); }
    .g3f-theme-cake .g3f-sign strong { color: #FEF3C7; }
    .g3k-host { flex: 1; min-height: 0; width: 100%; display: flex; justify-content: center; }
    .g3k-scene { width: 100%; height: 100%; display: block; overflow: visible; user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; }
    .g3k-drag { touch-action: none; cursor: crosshair; }
    .g3k-pickable [data-piece], .g3k-pickable [data-cookie], .g3k-pickable [data-line] { cursor: pointer; }
    .g3k-pickable [data-piece]:hover, .g3k-pickable [data-cookie]:hover { filter: brightness(1.06) drop-shadow(0 0 4px #F472B6); }
    .g3k-pickable [data-line]:hover line:first-child { stroke-width: 5; }
    .g3k-right { filter: drop-shadow(0 0 6px #22C55E) drop-shadow(0 0 3px #22C55E); }
    .g3k-ctrls { width: 100%; height: 100%; display: flex; flex-direction: column; gap: 10px; align-items: stretch; justify-content: center; box-sizing: border-box; padding: 4px; }
    .g3k-ctrls .g3g-btn { display: flex; align-items: center; justify-content: center; padding: 6px 8px; font-size: 19px; line-height: 1.1; border: 3px solid #fff; border-radius: 14px; white-space: nowrap; touch-action: manipulation; }
    .g3k-ctrls .g3g-btn:disabled { opacity: 1; background: #CBD5E1; color: #fff; box-shadow: 0 4px 0 #94A3B8; text-shadow: none; cursor: default; }
    .g3k-row { display: flex; gap: 8px; height: 100%; align-items: center; }
    .g3k-row .g3g-btn { flex: 1; font-size: 16px; padding: 6px 4px; }
    .g3k-step { display: flex; align-items: center; justify-content: space-between; gap: 6px; background: #fff; border: 3px solid #F9A8D4; border-radius: 16px; padding: 6px; box-shadow: 0 4px 0 #FBCFE8; }
    .g3k-step-btn { width: 44px; height: 44px; border-radius: 12px; border: none; background: #EC4899; color: #fff; font-size: 28px; font-weight: 800; line-height: 1; box-shadow: 0 3px 0 #9D174D; cursor: pointer; touch-action: manipulation; }
    .g3k-step-btn:disabled { background: #E5E7EB; color: #9CA3AF; box-shadow: none; cursor: default; }
    .g3k-step-btn:not(:disabled):active { transform: translateY(2px); box-shadow: 0 1px 0 #9D174D; }
    .g3k-step-val { display: flex; flex-direction: column; align-items: center; line-height: 1; color: #1E293B; }
    .g3k-step-val b { font-size: 36px; }
    .g3k-step-val small { font-size: 14px; font-weight: 700; color: #9D174D; }
    /* Đã chọn số phần: nút Cắt sáng lên mời bấm */
    .g3k-cut-ready [data-act="cut"] { animation: g3fGlow 1.4s ease-out infinite; }
    .g3k-nudge { animation: g3fNudge .45s ease-in-out 2, g3fGlow 1.2s ease-out; }
    @media (prefers-reduced-motion: reduce) { .g3k-nudge { animation: g3fGlow 1.2s ease-out 2; } }
    .g3k-hand { animation: g3kHand 1.1s ease-in-out infinite; }
    @keyframes g3kHand { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-10px, -8px); } }
    .g3k-knife-rest { cursor: grab; }
    .g3k-knife-rest text { pointer-events: none; }
    .g3k-frac { display: inline-flex; flex-direction: column; align-items: center; vertical-align: middle; line-height: 1; margin: 0 0.1em; font-weight: 800; }
    .g3k-frac b:first-child { border-bottom: 2px solid currentColor; padding: 0 0.15em 0.05em; }
    .g3k-frac b:last-child { padding-top: 0.05em; }
    .g3f-theme-cake .g3f-main > .g3g-result { left: auto; right: 0.7rem; width: min(48%, 420px); transform: none; animation-name: g3lCard; }
    .g3f-theme-cake .g3f-main::after { background: rgba(15,23,42,0.1); }
    @media (orientation: portrait) { .g3f-theme-cake .g3f-main > .g3g-result { left: 50%; right: auto; width: min(94%, 460px); transform: translateX(-50%); animation-name: g3fPop; } }
    /* Điện thoại dọc (bakery.js isTall): nút ra một dải ngang dưới cảnh, cỡ theo màn hình chứ không theo cảnh */
    @media (orientation: portrait) and (max-width: 600px) {
      .g3k-ctrls-strip { flex: none; height: auto; flex-direction: row; flex-wrap: wrap; align-items: stretch; justify-content: center; gap: 8px; padding: 2px 0 4px; }
      .g3k-ctrls-strip > .g3g-btn { flex: 1 1 0; min-width: 0; font-size: clamp(17px, 5vw, 22px); padding: 10px 6px; }
      .g3k-ctrls-strip .g3k-step { flex: 1.3 1 0; min-width: 0; padding: 4px; }
      .g3k-ctrls-strip .g3k-step-btn { width: clamp(38px, 11vw, 50px); height: clamp(38px, 11vw, 50px); }
      .g3k-ctrls-strip .g3k-row { flex: 1; height: auto; }
      .g3k-ctrls-strip .g3k-row .g3g-btn { font-size: clamp(17px, 5vw, 22px); padding: 10px 6px; }
    }
    /* Điện thoại xoay ngang: cảnh thu nhỏ nhiều — nút trong cảnh to hơn (theo đơn vị cảnh) để vẫn dễ chạm */
    @media (orientation: landscape) and (max-height: 500px) {
      .g3k-ctrls { gap: 12px; }
      .g3k-ctrls .g3g-btn { font-size: 27px; padding: 10px 8px; }
      .g3k-step-btn { width: 58px; height: 58px; font-size: 36px; }
      .g3k-step-val b { font-size: 44px; }
      .g3k-step-val small { font-size: 18px; }
      .g3k-row .g3g-btn { font-size: 17px; padding: 9px 2px; }
    }
    /* Quầy ruy băng (g3r-*, market/ribbon.js): mái sọc tím trắng, bảng tên tím */
    .g3f-theme-ribbon .g3f-awning { background: repeating-linear-gradient(90deg, #C4B5FD 0 36px, #FFF 36px 72px); border-bottom-color: #7C3AED; }
    .g3f-theme-ribbon .g3f-awning::after { background: radial-gradient(circle at 18px 0, #C4B5FD 17px, transparent 18px) 0 0 / 72px 10px repeat-x, radial-gradient(circle at 18px 0, #fff 17px, transparent 18px) 36px 0 / 72px 10px repeat-x; }
    .g3f-theme-ribbon .g3f-counter { background: linear-gradient(#FDFBFF, #F3E8FF); }
    .g3f-theme-ribbon .g3f-sign { background: #8B5CF6; border-color: #5B21B6; color: #fff; text-shadow: 0 1px 0 rgba(91,33,182,0.5); }
    .g3f-theme-ribbon .g3f-sign strong { color: #FEF3C7; }
    .g3r-host { flex: 1; min-height: 0; width: 100%; display: flex; justify-content: center; }
    .g3r-scene { width: 100%; height: 100%; display: block; overflow: hidden; outline: none; user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; }
    .g3r-drag { touch-action: none; cursor: ew-resize; }
    .g3r-scene text { pointer-events: none; }
    .g3r-ctrls { width: 100%; height: 100%; display: flex; gap: 10px; align-items: stretch; justify-content: flex-end; box-sizing: border-box; padding: 3px 0 5px; }
    .g3r-ctrls .g3g-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px; padding: 4px 10px; font-size: 20px; line-height: 1.1; border: 3px solid #fff; border-radius: 13px; white-space: nowrap; touch-action: manipulation; }
    .g3r-ctrls .g3r-nudge { width: 64px; font-size: 22px; }
    .g3r-ctrls .g3r-cut { min-width: 190px; }
    .g3r-ctrls .g3g-btn small { font-size: 10px; font-weight: 700; opacity: 0.9; }
    .g3r-ctrls .g3g-btn:disabled { opacity: 1; background: #CBD5E1; color: #fff; box-shadow: 0 4px 0 #94A3B8; text-shadow: none; cursor: default; }
    /* Thẻ kết quả nằm phía trên (chỗ giá treo, kính lúp) — thước và vạch đích được tô vẫn thấy hết */
    .g3f-theme-ribbon .g3f-main > .g3g-result { top: 0.6rem; bottom: auto; width: min(82%, 600px); max-height: 54%; padding: 0.6rem 1rem; gap: 0.45rem; }
    .g3f-theme-ribbon .g3f-main::after { background: rgba(15,23,42,0.1); }
    @media (orientation: portrait) { .g3f-theme-ribbon .g3f-main > .g3g-result { top: auto; bottom: 0.7rem; width: min(94%, 460px); max-height: calc(100% - 1.4rem); } }
    /* Màn dọc (điện thoại): quầy ruy băng lấp hết bề cao màn hình — cảnh tự cao theo khung (market/ribbon.js) */
    @media (orientation: portrait) and (max-width: 600px) {
      .g3r-stage .g3f-scene { grid-template-rows: auto minmax(0, 1fr) auto; }
      .g3r-stage .g3f-main, .g3r-stage .g3f-counter { min-height: 0; }
      .g3r-host { flex: 1; min-height: 0; }
    }
    @media (orientation: landscape) and (max-height: 500px) {
      .g3r-ctrls .g3g-btn { font-size: 26px; }
      .g3r-ctrls .g3r-nudge { width: 80px; font-size: 28px; }
      .g3r-ctrls .g3g-btn small { font-size: 12px; }
    }

    /* Xe chở hàng (g3t-*, trucks.js): mái tôn xanh của nhà kho, sàn xi măng; kho (trái / trên) | bãi xe (phải / dưới).
       Cỡ kho và cỡ xe (--u-w) do trucks.js tính cho thùng to nhất — thùng ở kho và trên xe cùng một cỡ. */
    .g3f-theme-depot .g3f-awning { background: repeating-linear-gradient(90deg, #60A5FA 0 14px, #93C5FD 14px 18px); border-bottom-color: #1D4ED8; }
    .g3f-theme-depot .g3f-awning::after { display: none; }
    .g3f-theme-depot .g3f-counter { background: linear-gradient(#F8FAFC, #E2E8F0); border-bottom-color: #64748B; }
    .g3f-theme-depot .g3f-sign { background: #2563EB; border-color: #1E3A8A; color: #fff; text-shadow: 0 1px 0 rgba(30,58,138,0.5); }
    .g3f-theme-depot .g3f-sign strong { color: #FEF08A; }
    .g3f-theme-depot .g3f-main > .g3g-result { left: auto; right: 0.7rem; width: min(52%, 440px); transform: none; animation-name: g3lCard; }
    .g3f-theme-depot .g3f-main::after { background: rgba(15,23,42,0.1); }
    @media (orientation: portrait) { .g3f-theme-depot .g3f-main > .g3g-result { left: 50%; right: auto; width: min(94%, 460px); transform: translateX(-50%); animation-name: g3fPop; } }
    /* Chỗ sai nằm ở bãi xe (xe chạy không, thùng chưa đầy): thẻ kết quả nằm sang phía kho */
    .g3f-theme-depot .g3f-main.g3t-card-store > .g3g-result { right: auto; left: 0.7rem; }
    @media (orientation: portrait) { .g3f-theme-depot .g3f-main.g3t-card-store > .g3g-result { left: 50%; top: 0.7rem; bottom: auto; } }
    .g3t-bench { flex: 1; min-height: 0; width: 100%; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr); grid-template-rows: minmax(0, 1fr); gap: 10px; padding-top: clamp(2.6rem, 8vh, 4rem); box-sizing: border-box; }
    .g3t-store { min-height: 0; min-width: 0; display: flex; align-items: center; justify-content: center; }
    .g3t-shed { position: relative; display: flex; flex-direction: column; align-items: center; gap: 0.35rem; background: #FFFBEB; border: 3px solid #475569; border-top-width: 8px; border-radius: 0.5rem 0.5rem 0.8rem 0.8rem; padding: 0.45rem 0.5rem 0.5rem; box-shadow: 0 4px 0 rgba(51,65,85,0.2); }
    .g3t-items { line-height: 0; }
    .g3t-items svg { display: block; }
    .g3t-cap { flex: none; background: #fff; border: 2px solid #475569; border-radius: 0.6rem; padding: 0 0.6rem; font-weight: 700; color: #1E293B; font-size: clamp(0.85rem, 1.4vh + 0.5rem, 1.25rem); white-space: nowrap; }
    .g3t-cap b { color: #EA580C; }
    .g3t-cap .g3f-q { font-size: 1em; }
    .g3t-lot { min-height: 0; min-width: 0; overflow: hidden; display: flex; flex-wrap: wrap; align-content: center; justify-content: center; gap: 8px; border-radius: 0.8rem; background: repeating-linear-gradient(90deg, transparent 0 46px, rgba(148,163,184,0.18) 46px 50px), #E5E7EB; }
    .g3t-unit, .g3t-ghost { position: relative; width: var(--u-w, 140px); padding: 0; border: none; background: none; line-height: 0; border-radius: 0.6rem; touch-action: manipulation; cursor: pointer; }
    .g3t-unit svg, .g3t-ghost svg { width: 100%; height: auto; display: block; }
    .g3t-unit:active { transform: scale(0.96); }
    .g3t-loaded { cursor: default; }
    .g3t-ghost { opacity: 0.7; }
    .g3t-ghost b { position: absolute; inset: 0; display: grid; place-items: center; font-size: calc(var(--u-w, 140px) * 0.32); line-height: 1; color: #EA580C; text-shadow: 0 2px 0 #fff; }
    .g3t-empty { outline: 3px dashed #EF4444; outline-offset: 2px; }
    .g3t-empty::before { content: '✖'; position: absolute; right: 4%; top: 2%; z-index: 1; font-size: calc(var(--u-w, 140px) * 0.16); line-height: 1; color: #EF4444; }
    .g3t-full svg > rect:first-child { stroke: #16A34A; }
    .g3t-short svg > rect:first-child { stroke: #EF4444; stroke-width: 3; }
    .g3t-next { animation: g3eNudge 1.3s ease-in-out infinite; }
    .g3t-next::after { content: '👆'; position: absolute; left: 50%; bottom: -0.1rem; translate: -50% 55%; font-size: clamp(1.4rem, 4vh, 2.2rem); line-height: 1; animation: g3eHand 1s ease-in-out infinite; pointer-events: none; }
    .g3t-pop { animation: g3eDrop .35s cubic-bezier(.3,1.5,.5,1) both; transform-box: fill-box; transform-origin: center bottom; }
    .g3t-fly { filter: drop-shadow(0 4px 3px rgba(51,65,85,0.3)); }
    .g3t-busy .g3t-ghost { pointer-events: none; }
    @media (prefers-reduced-motion: reduce) { .g3t-next, .g3t-next::after, .g3t-pop { animation: none; } }
    @media (orientation: portrait) { .g3t-bench { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) minmax(0, 1.2fr); } }
    @media (orientation: portrait) and (max-width: 600px) { .g3t-bench { flex: 1 1 0; min-height: 0; padding-top: 0; } }

    /* Máy phóng to – thu nhỏ (g3m-*, machine.js): khay vào | cỗ máy | khay ra. Cỡ quả --it do machine.js tính. */
    .g3f-theme-lab .g3f-awning { background: repeating-linear-gradient(90deg, #A78BFA 0 36px, #FFF 36px 72px); border-bottom-color: #6D28D9; }
    .g3f-theme-lab .g3f-awning::after { background: radial-gradient(circle at 18px 0, #A78BFA 17px, transparent 18px) 0 0 / 72px 10px repeat-x, radial-gradient(circle at 18px 0, #fff 17px, transparent 18px) 36px 0 / 72px 10px repeat-x; }
    .g3f-theme-lab .g3f-counter { background: linear-gradient(#FAFAFF, #EDE9FE); border-bottom-color: #7C3AED; }
    .g3f-theme-lab .g3f-sign { background: #7C3AED; border-color: #4C1D95; color: #fff; text-shadow: 0 1px 0 rgba(76,29,149,0.5); }
    .g3f-theme-lab .g3f-sign strong { color: #FEF08A; }
    .g3m-sign-ic { font-size: 1.6em; line-height: 1; }
    /* Thẻ kết quả ở đáy: màn một hàng thì nằm bên trái (dưới khay vào), màn hai tầng thì giữa đáy — khay ra được kéo
       lên sát dưới máy (g3m-out align start) nên phần đáy trống cho thẻ, không che các hàng quả */
    .g3f-theme-lab .g3f-main > .g3g-result { left: 0.7rem; right: auto; width: min(46%, 420px); transform: none; animation-name: g3lCard; }
    .g3f-theme-lab .g3f-main::after { background: rgba(15,23,42,0.1); }
    .g3f-theme-lab .g3f-main.g3m-two > .g3g-result { left: 50%; top: auto; bottom: 0.7rem; width: min(70%, 520px); transform: translateX(-50%); animation-name: g3fPop; }
    .g3f-theme-lab .g3f-main.g3m-card-low > .g3g-result { left: 50%; top: auto; bottom: 0.7rem; width: min(70%, 520px); transform: translateX(-50%); animation-name: g3fPop; }
    @media (orientation: portrait) { .g3f-theme-lab .g3f-main.g3m-card-low > .g3g-result { top: auto; bottom: 0.7rem; width: min(94%, 460px); } .g3f-theme-lab .g3f-main.g3m-two > .g3g-result { width: min(94%, 460px); } }
    /* Đoán máy, màn dọc: khách xuống đứng phía máy (bên phải), không che bảng thử máy */
    .g3f-main.g3m-card-low .g3f-cameo { flex-direction: row-reverse; padding-right: 0.4rem; }
    .g3f-main.g3m-card-low .g3f-cameo-say { display: none; }
    @media (orientation: portrait) { .g3f-theme-lab .g3f-main > .g3g-result { left: 50%; top: auto; bottom: 0.7rem; width: min(94%, 460px); transform: translateX(-50%); animation-name: g3fPop; } }
    .g3m-bench { --it: 30px; flex: 1; min-height: 0; width: 100%; display: grid; grid-template-columns: minmax(0, 1fr) minmax(120px, 0.62fr) minmax(0, 1.25fr); grid-template-rows: minmax(0, 1fr); grid-template-areas: "in mach out"; gap: 16px; padding-top: clamp(2.6rem, 8vh, 4rem); box-sizing: border-box; }
    .g3m-in { grid-area: in; } .g3m-mach { grid-area: mach; } .g3m-out { grid-area: out; }
    .g3m-in, .g3m-out { min-width: 0; min-height: 0; display: flex; align-items: center; justify-content: center; }
    .g3m-box { max-width: 100%; max-height: 100%; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; gap: 0.35rem; background: #fff; border: 3px solid #7C3AED; border-radius: 1rem; padding: 0.5rem 0.6rem; box-shadow: 0 4px 0 rgba(76,29,149,0.18); }
    .g3m-box-out { justify-content: space-between; background: linear-gradient(#FAF5FF, #F3E8FF); box-shadow: inset 0 3px 8px rgba(76,29,149,0.12), 0 4px 0 rgba(76,29,149,0.18); }
    .g3m-box-out .g3m-tray { flex: 1; justify-content: center; align-self: stretch; align-items: center; }
    .g3m-wait { font-size: calc(var(--it) * 1.6); line-height: 1; opacity: 0.85; }
    .g3m-wait .g3f-q { font-size: 1em; height: 1.35em; min-width: 1.3em; border-radius: 0.28em; box-shadow: 0 0.12em 0 #C2410C; }
    /* Một hàng: mũi tên khay vào ➜ máy ➜ khay ra */
    .g3m-row3 .g3m-mach { position: relative; }
    .g3m-row3 .g3m-mach::before, .g3m-row3 .g3m-mach::after { content: '➜'; position: absolute; top: 42%; font-size: clamp(1.4rem, 3.4vh, 2.6rem); color: #A78BFA; line-height: 1; translate: 0 -50%; pointer-events: none; }
    .g3m-row3 .g3m-mach::before { left: -14px; translate: -50% -50%; }
    .g3m-row3 .g3m-mach::after { right: -14px; translate: 50% -50%; }
    .g3m-bench:not(.g3m-row3) .g3m-out { align-items: flex-start; }
    .g3m-bench:not(.g3m-row3).g3m-done .g3m-run { display: none; }
    .g3m-bench:not(.g3m-row3).g3m-done:is(.g3m-k-mul, .g3m-k-div) .g3m-in { visibility: hidden; }
    .g3m-row3 .g3m-in { justify-content: flex-end; } .g3m-row3 .g3m-out { justify-content: flex-start; }
    .g3m-row3 .g3m-in, .g3m-row3 .g3m-out { padding: 0 6px; }
    .g3m-tray { display: flex; flex-direction: column; align-items: flex-start; gap: calc(var(--it) * 0.14); }
    .g3m-row { display: flex; align-items: center; gap: calc(var(--it) * 0.2); border-radius: 0.6rem; transition: opacity .3s, background .3s; }
    .g3m-items { display: flex; gap: calc(var(--it) * 0.1); }
    .g3m-items > :nth-child(5):not(:last-child) { margin-right: calc(var(--it) * 0.3); }
    .g3m-it { width: var(--it); height: var(--it); display: block; flex: none; }
    .g3m-tag { flex: none; min-width: calc(var(--it) * 2); font-weight: 800; color: #6D28D9; font-size: clamp(0.8rem, calc(var(--it) * 0.42), 1.2rem); text-align: right; }
    .g3m-cap { flex: none; background: #fff; border: 2px solid #6D28D9; border-radius: 0.6rem; padding: 0 0.6rem; font-weight: 700; color: #1E293B; font-size: clamp(0.85rem, 1.4vh + 0.5rem, 1.2rem); text-align: center; white-space: nowrap; }
    .g3m-cap:empty { display: none; }
    .g3m-box-out { min-width: min(100%, max-content); }
    .g3m-cap b { color: #EA580C; }
    .g3m-cap .g3f-q { font-size: 1em; }
    .g3m-group { display: flex; flex-direction: column; align-items: flex-start; gap: 3px; padding: 3px 5px; border-radius: 0.6rem; transition: background .3s; }
    .g3m-group + .g3m-group { margin-top: 6px; border-top: 2px dashed #DDD6FE; padding-top: 6px; }
    .g3m-glabel { font-weight: 700; color: #334155; font-size: clamp(0.8rem, 1.2vh + 0.45rem, 1.1rem); }
    .g3m-glabel b { color: #EA580C; }
    .g3m-dim { opacity: 0.28; }
    .g3m-pick, .g3m-match { background: #DCFCE7; box-shadow: 0 0 0 3px #4ADE80; }
    .g3m-pop { animation: g3eDrop .35s cubic-bezier(.3,1.5,.5,1) both; }
    .g3m-fly { filter: drop-shadow(0 4px 3px rgba(76,29,149,0.3)); }
    .g3m-mach { min-width: 0; min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; }
    .g3m-mbox { flex: 0 1 auto; min-height: 0; width: 100%; display: flex; justify-content: center; }
    .g3m-svg { width: 100%; max-height: 100%; height: auto; aspect-ratio: 1; cursor: pointer; overflow: visible; }
    .g3m-run { flex: none; max-width: 100%; box-sizing: border-box; font-size: clamp(0.9rem, 1.6vh + 0.5rem, 1.3rem); padding: 0.45rem 0.8rem; border-radius: 0.9rem; line-height: 1.15; }
    .g3m-run-wait { background: #CBD5E1; color: #fff; box-shadow: 0 4px 0 #94A3B8; text-shadow: none; }
    .g3m-run-ready { background: #F97316; color: #fff; box-shadow: 0 4px 0 #C2410C; animation: g3mReady 1.1s ease-in-out infinite; }
    @keyframes g3mReady { 0%, 100% { box-shadow: 0 4px 0 #C2410C, 0 0 0 0 rgba(249,115,22,0.55); } 50% { box-shadow: 0 4px 0 #C2410C, 0 0 0 10px rgba(249,115,22,0); } }
    .g3m-on .g3m-gear { animation: g3mSpin 1.2s linear infinite; }
    .g3m-on .g3m-light { animation: g3mBlink .5s steps(2) infinite; }
    .g3m-on .g3m-light:nth-of-type(2) { animation-delay: .17s; }
    .g3m-on .g3m-svg { animation: g3mShake .25s ease-in-out infinite; }
    @keyframes g3mSpin { to { transform: rotate(360deg); } }
    @keyframes g3mBlink { 50% { opacity: 0.35; } }
    @keyframes g3mShake { 0%, 100% { transform: none; } 25% { transform: translateX(-1.5px) rotate(-0.6deg); } 75% { transform: translateX(1.5px) rotate(0.6deg); } }
    @media (prefers-reduced-motion: reduce) { .g3m-on .g3m-svg, .g3m-pop { animation: none; } .g3m-on .g3m-gear { animation-duration: 3s; } }
    /* Đoán máy: bảng thử máy + 4 nút chọn phép */
    .g3m-table { border-collapse: separate; border-spacing: 6px 5px; font-weight: 800; color: #1E293B; font-size: var(--tf, 1.4rem); }
    .g3m-table th { font-size: 0.55em; color: #6D28D9; font-weight: 800; }
    .g3m-num { background: #FFFBEB; border: 2px solid #3F3A40; border-radius: 0.5rem; min-width: 2.2em; text-align: center; padding: 0.05em 0.3em; }
    .g3m-arrow { color: #7C3AED; }
    .g3m-mine { min-width: 3em; text-align: center; border: 2px dashed #C4B5FD; border-radius: 0.5rem; padding: 0.05em 0.3em; }
    .g3m-mine-ok { background: #DCFCE7; border: 2px solid #16A34A; color: #15803D; }
    .g3m-mine-bad { background: #FEE2E2; border: 2px solid #EF4444; color: #B91C1C; }
    .g3m-pick-rule { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
    .g3m-rule { display: flex; flex-direction: column; align-items: center; padding: 0.4rem 0.8rem; border-radius: 0.9rem; background: #fff; color: #4C1D95; border: 3px solid #A78BFA; box-shadow: 0 4px 0 #C4B5FD; font-size: var(--rf, 1.3rem); line-height: 1.1; min-width: 4.5em; }
    .g3m-rule span { font-size: 0.7em; font-weight: 700; color: #7C3AED; }
    .g3m-rule:disabled { opacity: 0.45; cursor: default; }
    .g3m-rule.g3m-rule-on { opacity: 1; background: #7C3AED; color: #fff; border-color: #4C1D95; }
    .g3m-rule.g3m-rule-on span { color: #EDE9FE; }
    .g3m-pick-rule.g3m-hint .g3m-rule { animation: g3eNudge 0.5s ease-in-out 3; }
    @media (orientation: portrait) {
      .g3m-bench { grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) minmax(0, 1.2fr); grid-template-areas: "in mach" "out out"; }
    }
    @media (orientation: portrait) and (max-width: 600px) { .g3m-bench { flex: 1 1 0; min-height: 0; padding-top: 0; } }

    /* Thám tử góc vuông (g3d-*, detective.js): mái sọc xanh đen, bàn giấy điều tra; bảng SVG + hàng nút bên dưới.
       Có kết quả: bảng co lại (padding do detective.js đo theo thẻ) — thẻ nằm bên phải (màn ngang) / dưới (màn dọc). */
    .g3f-theme-detective .g3f-awning { background: repeating-linear-gradient(90deg, #334155 0 30px, #FDE68A 30px 60px); border-bottom-color: #1E293B; }
    .g3f-theme-detective .g3f-awning::after { background: radial-gradient(circle at 15px 0, #334155 14px, transparent 15px) 0 0 / 60px 10px repeat-x, radial-gradient(circle at 15px 0, #FDE68A 14px, transparent 15px) 30px 0 / 60px 10px repeat-x; }
    .g3f-theme-detective .g3f-counter { background: linear-gradient(#FFFDF7, #F5EBD7); border-bottom-color: #78350F; }
    .g3f-theme-detective .g3f-sign { background: #1E293B; border-color: #0F172A; color: #fff; }
    .g3f-theme-detective .g3f-sign strong { color: #FDE68A; }
    .g3d-sign-ic { font-size: 1.6em; line-height: 1; }
    .g3f-theme-detective .g3f-main > .g3g-result { left: auto; right: 0.7rem; width: min(42%, 420px); transform: none; animation-name: g3lCard; }
    .g3f-theme-detective .g3f-main::after { background: rgba(15,23,42,0.08); }
    @media (orientation: portrait) { .g3f-theme-detective .g3f-main > .g3g-result { left: 50%; right: auto; width: min(94%, 460px); transform: translateX(-50%); animation-name: g3fPop; } }
    .g3d-bench { flex: 1; min-height: 0; width: 100%; display: flex; flex-direction: column; gap: 0.5rem; padding-top: 0.2rem; box-sizing: border-box; }
    /* Hàng "Đang đo góc BAC" + nút xoay ê-ke ⟲ ⟳ — nằm trên dải của bảng hiệu (chừa chỗ bên phải cho bảng hiệu),
       chỉ hiện khi ê-ke đang đặt ở một góc; luôn giữ chỗ nên bảng không nhảy. Cấp đếm hình không dùng ê-ke. */
    .g3d-meter { flex: none; display: flex; align-items: center; gap: 0.4rem; min-height: clamp(2.6rem, 6.5vh, 3.3rem); margin-right: clamp(9.5rem, 24%, 13rem); visibility: hidden; }
    .g3d-meter-on { visibility: visible; }
    .g3d-no-eke { padding-top: clamp(2.2rem, 6vh, 3.4rem); }
    .g3d-no-eke .g3d-meter { display: none; }
    .g3d-meter-lab { display: flex; align-items: baseline; flex-wrap: wrap; column-gap: 0.1rem; background: #fff; border: 3px solid #94A3B8; border-radius: 0.8rem; padding: 0.1rem 0.6rem; font-weight: 700; color: #1E293B; line-height: 1.2; font-size: clamp(0.9rem, 1.3vh + 0.5rem, 1.2rem); }
    .g3d-meter-lab b { font-size: 1.3em; color: #1D4ED8; }
    .g3d-meter-lab b:first-of-type { margin-left: 0.35rem; }
    .g3d-meter-lab b.g3d-v { color: #EA580C; }
    .g3d-meter-lab small { margin-left: 0.5rem; font-size: 0.8em; color: #64748B; }
    .g3d-meter-ok .g3d-meter-lab { border-color: #22C55E; background: #F0FDF4; }
    .g3d-rot { flex: none; width: 2.8rem; height: 2.8rem; border-radius: 50%; border: 3px solid #1E293B; background: #FDE68A; color: #1E293B; font-size: 1.55rem; font-weight: 800; line-height: 1; box-shadow: 0 3px 0 #92400E; cursor: pointer; touch-action: manipulation; }
    .g3d-rot:active { transform: translateY(2px); box-shadow: 0 1px 0 #92400E; }
    .g3d-rot:disabled { opacity: 0.4; cursor: default; }
    .g3d-hint-rot .g3d-rot { animation: g3eNudge 0.5s ease-in-out 3, g3dRotGlow 1.2s ease-out 2; }
    @keyframes g3dRotGlow { 0% { box-shadow: 0 3px 0 #92400E, 0 0 0 5px rgba(249,115,22,0.9); } 100% { box-shadow: 0 3px 0 #92400E, 0 0 0 14px rgba(249,115,22,0); } }
    @media (prefers-reduced-motion: reduce) { .g3d-hint-rot .g3d-rot { animation: g3dRotGlow 1.2s ease-out 2; } }
    @media (orientation: portrait) and (max-width: 600px) { .g3d-meter { margin-right: 0; justify-content: center; } .g3d-meter-lab small { display: none; } }
    .g3d-board { flex: 1 1 0; min-height: 0; display: flex; justify-content: center; }
    .g3d-svg { width: 100%; height: 100%; display: block; touch-action: none; user-select: none; -webkit-user-select: none; }
    .g3d-eke { cursor: grab; filter: drop-shadow(0 3px 2px rgba(15,23,42,0.25)); }
    .g3d-knobs { display: none; cursor: grab; }
    .g3d-at .g3d-knobs { display: inline; }
    .g3d-at:not(.g3d-fit):not(.g3d-turning) .g3d-knob { animation: g3dKnob 1.1s ease-in-out infinite; }
    @keyframes g3dKnob { 50% { fill: #FDE68A; r: 11; } }
    .g3d-turning .g3d-knobs { cursor: grabbing; }
    .g3d-dot { color: #F97316; }
    @media (prefers-reduced-motion: reduce) { .g3d-at:not(.g3d-fit):not(.g3d-turning) .g3d-knob { animation: g3dKnobCalm 1.1s steps(1) infinite; } @keyframes g3dKnobCalm { 50% { fill: #FDE68A; } } }
    .g3d-grab .g3d-eke { cursor: grabbing; filter: drop-shadow(0 8px 6px rgba(15,23,42,0.3)); }
    .g3d-hint .g3d-dock { animation: g3dDock 0.5s ease-in-out 4; }
    @keyframes g3dDock { 50% { fill: #FDE68A; stroke: #F97316; stroke-width: 5; } }
    .g3d-picked .g3d-panel { stroke: #F97316; stroke-width: 5; fill: #FFF7ED; }
    .g3d-acts { flex: none; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.45rem; min-height: 3rem; }
    .g3d-done .g3d-acts { display: none; }
    .g3d-acts-lab { font-weight: 800; color: #78350F; font-size: clamp(0.95rem, 1.4vh + 0.55rem, 1.25rem); }
    .g3d-btn { padding: 0.5rem 1rem; border-radius: 0.9rem; background: #fff; color: #1E293B; border: 3px solid #94A3B8; box-shadow: 0 4px 0 #CBD5E1; font-size: clamp(1rem, 1.5vh + 0.6rem, 1.35rem); line-height: 1.15; }
    .g3d-btn.g3d-on { background: #F97316; color: #fff; border-color: #C2410C; box-shadow: 0 4px 0 #9A3412; }
    .g3d-btn:disabled.g3d-on { opacity: 1; }
    .g3d-letter { min-width: 2.8em; padding-left: 0.6rem; padding-right: 0.6rem; font-weight: 800; }
    .g3d-name { letter-spacing: 0.04em; }
    .g3d-done-btn { background: #16A34A; color: #fff; border-color: #15803D; box-shadow: 0 4px 0 #166534; }
    .g3d-soi { background: #1E293B; color: #FDE68A; border-color: #0F172A; box-shadow: 0 4px 0 #475569; }
    .g3d-soi-wait { opacity: 0.55; }
    .g3d-soi-ready { animation: g3dSoi 1.1s ease-in-out infinite; }
    @keyframes g3dSoi { 0%, 100% { box-shadow: 0 4px 0 #475569, 0 0 0 0 rgba(250,204,21,0.8); } 50% { box-shadow: 0 4px 0 #475569, 0 0 0 10px rgba(250,204,21,0); } }
    .g3d-chips { display: flex; flex-wrap: wrap; gap: 0.3rem; justify-content: center; }
    .g3d-chip { background: #fff; border: 3px solid var(--c); border-radius: 0.6rem; padding: 0 0.45rem; font-weight: 800; color: #1E293B; font-size: clamp(0.85rem, 1.2vh + 0.5rem, 1.1rem); }
    .g3d-done .g3d-acts:has(.g3d-chip) { display: flex; }
    .g3d-done .g3d-acts:has(.g3d-chip) .g3d-soi { display: none; }
    @media (orientation: portrait) and (max-width: 600px) { .g3d-bench { flex: 1 1 0; padding-top: 0; } .g3d-no-eke { padding-top: 0; } .g3d-btn { padding: 0.4rem 0.7rem; } }
    @media (orientation: landscape) and (max-height: 500px) { .g3d-bench { gap: 0.3rem; } .g3d-no-eke { padding-top: 1.8rem; } .g3d-meter { min-height: 2.2rem; } .g3d-rot { width: 2.3rem; height: 2.3rem; font-size: 1.25rem; } .g3d-meter-lab small { display: none; } .g3d-btn { padding: 0.3rem 0.7rem; font-size: 0.95rem; } .g3d-acts { min-height: 2.2rem; } }
    @media (prefers-reduced-motion: reduce) { .g3d-soi-ready { animation: none; box-shadow: 0 4px 0 #475569, 0 0 0 4px #FACC15; } }
    /* Rô-bốt biểu thức (g3o-*, robot.js): mái sọc xanh ngọc; mã năng lượng · băng chuyền biểu thức · dòng ghi các bước ·
       khay đồ lắp (cấp 4) | rô-bốt. Cỡ chữ băng chuyền --fs và bề ngang cột rô-bốt --bot do robot.js tính. */
    .g3f-theme-robot .g3f-awning { background: repeating-linear-gradient(90deg, #2DD4BF 0 36px, #FFF 36px 72px); border-bottom-color: #0F766E; }
    .g3f-theme-robot .g3f-awning::after { background: radial-gradient(circle at 18px 0, #2DD4BF 17px, transparent 18px) 0 0 / 72px 10px repeat-x, radial-gradient(circle at 18px 0, #fff 17px, transparent 18px) 36px 0 / 72px 10px repeat-x; }
    .g3f-theme-robot .g3f-counter { background: linear-gradient(#F8FFFE, #CCFBF1); border-bottom-color: #0F766E; }
    .g3f-theme-robot .g3f-sign { background: #0F766E; border-color: #134E4A; color: #fff; text-shadow: 0 1px 0 rgba(19,78,74,0.5); }
    .g3f-theme-robot .g3f-sign strong { color: #FEF08A; }
    .g3f-theme-robot .g3f-main::after { background: rgba(15,23,42,0.1); }
    .g3o-sign-ic { font-size: 1.6em; line-height: 1; }
    .g3o-bench { --fs: 40px; --bot: 200px; flex: 1; min-height: 0; width: 100%; box-sizing: border-box; display: grid; gap: 10px 16px;
      grid-template-columns: minmax(0, 1fr) var(--bot); grid-template-rows: auto auto minmax(0, 1fr) auto;
      grid-template-areas: "tgt tgt" "belt belt" "log bot" "tools tools"; }
    .g3o-bench.g3o-wide { grid-template-areas: "tgt bot" "belt bot" "log bot" "tools bot"; padding-top: clamp(2.6rem, 8vh, 4rem); }
    .g3o-target { grid-area: tgt; justify-self: start; align-self: end; background: #1E293B; color: #F8FAFC; border-radius: 0.8rem; padding: 0.15rem 0.8rem; font-weight: 800; font-size: clamp(1rem, calc(var(--fs) * 0.5), 1.6rem); white-space: nowrap; box-shadow: 0 4px 0 rgba(15,23,42,0.2); }
    .g3o-target b { color: #86EFAC; }
    .g3o-target .g3f-q { font-size: 1em; }
    .g3o-batt { font-size: 1.1em; }
    .g3o-belt { grid-area: belt; min-width: 0; font-size: var(--fs); background: linear-gradient(#F1F5F9, #E2E8F0) padding-box; border: 3px solid #64748B; border-radius: 0.35em; padding: 0.35em 0.4em 0.55em; position: relative; box-shadow: 0 5px 0 rgba(51,65,85,0.18); }
    .g3o-belt::after { content: ''; position: absolute; left: 0.3em; right: 0.3em; bottom: 0.12em; height: 0.16em; border-radius: 0.1em; background: repeating-linear-gradient(90deg, #64748B 0 0.3em, #CBD5E1 0.3em 0.6em); }
    .g3o-expr { display: flex; align-items: center; justify-content: center; gap: 0.28em; min-height: 1.4em; }
    .g3o-tk { font-family: 'Baloo 2', Quicksand, sans-serif; font-weight: 800; font-size: 1em; line-height: 1; box-sizing: border-box; flex: none; transition: box-shadow .25s, background .25s, transform .2s; }
    .g3o-n { background: #fff; color: #1E293B; border: 3px solid #3F3A40; border-radius: 0.24em; padding: 0.14em 0.3em 0.04em; min-width: 1.1em; text-align: center; box-shadow: 0 0.07em 0 rgba(0,0,0,0.18); }
    .g3o-op { width: 1.3em; height: 1.3em; border-radius: 50%; background: var(--c); color: #fff; border: 3px solid #3F3A40; display: inline-flex; align-items: center; justify-content: center; padding: 0 0 0.06em; cursor: pointer; text-shadow: 0 1px 0 rgba(0,0,0,0.2); }
    .g3o-p { color: #0F766E; font-size: 1.25em; font-weight: 700; padding: 0 0.02em 0.08em; border-radius: 0.2em; }
    .g3o-box { width: 1.3em; height: 1.3em; border-radius: 50%; border: 3px dashed #0F766E; background: #F0FDFA; padding: 0; cursor: pointer; animation: g3oAsk 1.2s ease-in-out infinite; }
    .g3o-empty .g3f-q { font-size: 1em; }
    .g3o-hl { box-shadow: 0 0 0 0.09em #FACC15, 0 0 0.3em 0.1em rgba(250,204,21,0.7); }
    .g3o-p.g3o-hl { background: #FEF9C3; }
    .g3o-bad { box-shadow: 0 0 0 0.09em #EF4444; }
    .g3o-p.g3o-bad { background: #FEE2E2; }
    .g3o-new { background: #DCFCE7; border-color: #16A34A; }
    .g3o-hide { visibility: hidden; }
    .g3o-tight .g3o-belt { padding: 0.25em 0.2em 0.5em; }
    .g3o-tight .g3o-expr { gap: 0.16em; }
    .g3o-tight .g3o-n { padding: 0.12em 0.14em 0.03em; border-width: 2px; min-width: 0.9em; }
    .g3o-tight .g3o-op, .g3o-tight .g3o-box { width: 1.12em; height: 1.12em; border-width: 2px; }
    .g3o-ask { animation: g3oAsk 1s ease-in-out infinite; }
    @keyframes g3oAsk { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(250,204,21,0.9); } 50% { transform: scale(1.12); box-shadow: 0 0 0 0.14em rgba(250,204,21,0); } }
    .g3o-pop { animation: g3eDrop .35s cubic-bezier(.3,1.5,.5,1) both; }
    .g3o-log { grid-area: log; align-self: start; justify-self: start; max-width: 100%; min-width: 0; min-height: 0; overflow: hidden; display: flex; flex-direction: column; gap: 0.08em; font-family: 'Baloo 2', Quicksand, sans-serif; font-weight: 800; color: #334155; font-size: clamp(0.95rem, calc(var(--fs) * 0.56), 2.2rem); line-height: 1.25; background: #fff; border: 2px dashed #5EEAD4; border-radius: 0.6em; padding: 0.25em 0.7em; }
    .g3o-log:empty { display: none; }
    .g3o-line { white-space: nowrap; }
    .g3o-line + .g3o-line { padding-left: 1.2em; }
    .g3o-eq { color: #0F766E; }
    .g3o-line-new { animation: g3gUp .3s ease; }
    .g3o-tools { grid-area: tools; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.5rem 0.8rem; min-width: 0; }
    .g3o-tools:empty { display: none; }
    .g3o-done .g3o-tools { display: none; }
    .g3o-pal { display: flex; gap: 0.35em; font-size: clamp(1.6rem, calc(var(--fs) * 0.95), 3.4rem); padding: 0.15em 0.3em; background: #fff; border: 3px solid #99F6E4; border-radius: 0.5em; }
    .g3o-tile { box-shadow: 0 0.07em 0 rgba(0,0,0,0.2); }
    .g3o-picks { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
    .g3o-pick { background: #fff; color: #1E293B; border: 3px solid #5EEAD4; box-shadow: 0 4px 0 #99F6E4; font-family: 'Baloo 2', Quicksand, sans-serif; font-weight: 800; font-size: clamp(1rem, calc(var(--fs) * 0.6), 1.9rem); padding: 0.2em 0.7em; border-radius: 0.7em; text-shadow: none; white-space: nowrap; }
    .g3o-pick.g3o-pick-on { background: #14B8A6; color: #fff; border-color: #0F766E; box-shadow: 0 4px 0 #115E59; }
    .g3o-pick.g3o-pick-right { box-shadow: 0 0 0 4px #4ADE80, 0 4px 0 #99F6E4; }
    .g3o-note { font-weight: 800; color: #0F766E; font-size: clamp(0.95rem, calc(var(--fs) * 0.45), 1.4rem); }
    .g3o-locked { pointer-events: none; }
    .g3o-locked .g3o-pal, .g3o-locked .g3o-note { opacity: 0.5; }
    .g3o-run { font-size: clamp(1rem, 1.6vh + 0.5rem, 1.35rem); padding: 0.45rem 0.9rem; border-radius: 0.9rem; line-height: 1.15; }
    .g3o-run-wait { background: #CBD5E1; color: #fff; box-shadow: 0 4px 0 #94A3B8; text-shadow: none; }
    .g3o-run-ready { background: #F97316; color: #fff; box-shadow: 0 4px 0 #C2410C; animation: g3mReady 1.1s ease-in-out infinite; }
    .g3o-hint { animation: g3oHint .6s ease-in-out 2; }
    @keyframes g3oHint { 0%, 100% { transform: none; } 25% { transform: translateY(-6px) scale(1.04); } 75% { transform: translateY(2px); } }
    .g3o-flycard { width: 100%; height: 100%; box-sizing: border-box; display: flex; align-items: center; justify-content: center; background: #fff; border: 3px solid #0F766E; border-radius: 0.7rem; font-family: 'Baloo 2', Quicksand, sans-serif; font-weight: 800; color: #1E293B; white-space: nowrap; font-size: clamp(1rem, 2.4vh, 1.7rem); }
    .g3o-bot { grid-area: bot; min-width: 0; min-height: 0; display: flex; align-items: flex-end; justify-content: center; }
    .g3o-robot { display: block; width: 100%; height: 100%; max-height: 100%; overflow: visible; }
    .g3o-eyes { display: none; }
    .g3o-robot[data-mood="idle"] .g3o-eyes-idle, .g3o-robot[data-mood="work"] .g3o-eyes-work, .g3o-robot[data-mood="happy"] .g3o-eyes-happy,
    .g3o-robot[data-mood="sad"] .g3o-eyes-sad, .g3o-robot[data-mood="code"] .g3o-eyes-code { display: inline; }
    .g3o-arm { transition: transform .4s; }
    .g3o-robot[data-mood="sad"] .g3o-arm-l { transform: rotate(14deg); }
    .g3o-robot[data-mood="sad"] .g3o-arm-r { transform: rotate(-14deg); }
    .g3o-robot[data-mood="sad"] .g3o-ant { fill: #94A3B8; }
    .g3o-on .g3o-robot { animation: g3mShake .25s ease-in-out infinite; }
    .g3o-on .g3o-ant { animation: g3mBlink .4s steps(2) infinite; }
    .g3o-dot { animation: g3oDot .9s ease-in-out infinite; }
    .g3o-dot:nth-child(2) { animation-delay: .15s; } .g3o-dot:nth-child(3) { animation-delay: .3s; }
    @keyframes g3oDot { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
    .g3o-dance .g3o-robot { animation: g3oHop .5s ease-in-out 4; }
    .g3o-dance .g3o-arm-l { animation: g3oWaveL .5s ease-in-out 4 alternate; }
    .g3o-dance .g3o-arm-r { animation: g3oWaveR .5s ease-in-out 4 alternate; }
    @keyframes g3oHop { 0%, 100% { transform: none; } 50% { transform: translateY(-6%); } }
    @keyframes g3oWaveL { from { transform: rotate(0deg); } to { transform: rotate(70deg); } }
    @keyframes g3oWaveR { from { transform: rotate(0deg); } to { transform: rotate(-70deg); } }
    @media (orientation: portrait) and (max-width: 600px) { .g3o-bench { gap: 6px 10px; } .g3o-run { padding: 0.35rem 0.7rem; } }
    @media (orientation: landscape) and (max-height: 500px) { .g3o-bench { gap: 6px 12px; } .g3o-bench.g3o-wide { padding-top: 2.2rem; } .g3o-run { padding: 0.3rem 0.7rem; font-size: 0.95rem; } }
    @media (prefers-reduced-motion: reduce) {
      .g3o-on .g3o-robot { animation: none; }
      .g3o-ask, .g3o-box { animation: none; box-shadow: 0 0 0 0.1em #FACC15; }
      .g3o-dance .g3o-robot { animation: none; }
      .g3o-dance .g3o-arm-l, .g3o-dance .g3o-arm-r { animation-duration: 1.2s; animation-iteration-count: 2; }
      .g3o-run-ready { animation: none; box-shadow: 0 4px 0 #C2410C, 0 0 0 4px #FDBA74; }
    }

    /* Kiến trúc sư bảng ghim (g3p-*, pinboard.js): mái sọc cam, bàn gỗ; phiếu đơn hàng · bảng ghim SVG · hộp đồ nghề.
       Có kết quả: bảng co lại (padding do pinboard.js đo theo thẻ) — thẻ nằm bên phải (màn ngang) / dưới (màn dọc). */
    .g3f-theme-pin .g3f-awning { background: repeating-linear-gradient(90deg, #F97316 0 32px, #FFF7ED 32px 64px); border-bottom-color: #9A3412; }
    .g3f-theme-pin .g3f-awning::after { background: radial-gradient(circle at 16px 0, #F97316 15px, transparent 16px) 0 0 / 64px 10px repeat-x, radial-gradient(circle at 16px 0, #FFF7ED 15px, transparent 16px) 32px 0 / 64px 10px repeat-x; }
    .g3f-theme-pin .g3f-counter { background: linear-gradient(#FFFBF3, #F3E2C3); border-bottom-color: #8A5A2B; }
    .g3f-theme-pin .g3f-sign { background: #9A3412; border-color: #7C2D12; color: #fff; }
    .g3f-theme-pin .g3f-sign strong { color: #FED7AA; }
    .g3p-sign-ic { font-size: 1.6em; line-height: 1; }
    .g3f-theme-pin .g3f-main > .g3g-result { left: auto; right: 0.7rem; width: min(42%, 420px); transform: none; animation-name: g3lCard; }
    .g3f-theme-pin .g3f-main.g3p-low > .g3g-result { left: 50%; right: auto; width: min(94%, 600px); transform: translateX(-50%); animation-name: g3fPop; }
    .g3f-theme-pin .g3f-main::after { background: rgba(120,53,15,0.08); }
    @media (orientation: portrait) { .g3f-theme-pin .g3f-main > .g3g-result { left: 50%; right: auto; width: min(94%, 460px); transform: translateX(-50%); animation-name: g3fPop; } }
    /* Đơn không cần gõ số (g3p-nopad): không có máy tính tiền, cột khách hẹp lại cho bảng ghim to ra. */
    .g3p-nopad .g3f-ask { display: none; }
    .g3f-scene.g3p-nopad { grid-template-columns: clamp(210px, 25%, 340px) minmax(0, 1fr); }
    @media (orientation: landscape) and (max-height: 500px) {
      .g3f-scene.g3p-nopad { grid-template-columns: clamp(150px, 23%, 230px) minmax(0, 1fr); }
      .g3p-nopad.g3f-pad-idle .g3f-customer { grid-template-columns: minmax(0, 1fr); grid-template-areas: "say" "npc"; }
      .g3f-theme-pin .g3f-main > .g3g-result { width: min(56%, 440px); }
      .g3f-theme-pin .g3g-result .g3g-result-text { font-size: 0.95rem; }
      .g3f-theme-pin .g3g-result .g3g-tip { font-size: 0.8rem; padding: 0.3rem 0.5rem; }
      .g3p-fin .g3p-order { display: none; }
    }
    @media (orientation: portrait) { .g3f-scene.g3p-nopad { grid-template-columns: minmax(0, 1fr); } }
    @media (orientation: portrait) and (max-width: 600px) { .g3f-scene.g3p-nopad { grid-template-columns: auto minmax(0, 1fr); } }
    .g3p-bench { flex: 1; min-height: 0; width: 100%; display: flex; flex-direction: column; gap: 0.45rem; padding-top: 0.2rem; box-sizing: border-box; user-select: none; -webkit-user-select: none; }
    /* Phiếu đơn hàng — trên dải của bảng hiệu (chừa chỗ bên phải cho bảng hiệu). */
    .g3p-order { flex: none; align-self: flex-start; display: flex; align-items: center; gap: 0.45rem; min-height: clamp(2.6rem, 6.5vh, 3.3rem); margin-right: clamp(9.5rem, 24%, 13rem); box-sizing: border-box; background: #fff; border: 3px dashed #F97316; border-radius: 0.8rem; padding: 0.15rem 0.7rem; font-weight: 700; color: #1E293B; line-height: 1.2; font-size: clamp(0.95rem, 1.4vh + 0.5rem, 1.25rem); }
    .g3p-order-ic { font-size: 1.3em; }
    .g3p-order b { color: #1D4ED8; font-weight: 800; }
    .g3p-hl { color: #C2410C; font-weight: 800; }
    .g3p-unit { margin-left: 0.4rem; white-space: nowrap; color: #64748B; font-size: 0.8em; background: #F1F5F9; border-radius: 0.4rem; padding: 0 0.35rem; }
    .g3p-board { flex: 1 1 0; min-height: 0; display: flex; justify-content: center; }
    .g3p-svg { width: 100%; height: 100%; display: block; touch-action: none; user-select: none; -webkit-user-select: none; cursor: pointer; }
    .g3p-acts { flex: none; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.5rem; min-height: 3rem; }
    .g3p-done .g3p-acts { display: none; }
    .g3p-btn { padding: 0.5rem 1rem; border-radius: 0.9rem; background: #fff; color: #1E293B; border: 3px solid #94A3B8; box-shadow: 0 4px 0 #CBD5E1; font-size: clamp(1rem, 1.5vh + 0.6rem, 1.35rem); line-height: 1.15; }
    .g3p-btn.g3p-on { background: #F97316; color: #fff; border-color: #C2410C; box-shadow: 0 4px 0 #9A3412; }
    .g3p-btn:disabled.g3p-on { opacity: 1; }
    .g3p-ok-btn { background: #16A34A; color: #fff; border-color: #15803D; box-shadow: 0 4px 0 #166534; }
    .g3p-redo { background: #F1F5F9; }
    /* Hộp ghim / hộp compa: ghim còn lại xếp chồng; nhấp nháy mời bé lấy ghim tới khi cắm cái đầu tiên. */
    .g3p-box { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.3rem 0.8rem 0.3rem 0.5rem; border-radius: 0.9rem; background: #FFF7ED; border: 3px dashed #C2410C; color: #7C2D12; font-family: inherit; font-weight: 800; font-size: clamp(0.95rem, 1.4vh + 0.55rem, 1.25rem); cursor: pointer; touch-action: manipulation; }
    .g3p-box-pins { display: inline-flex; align-items: center; min-width: 1.6em; }
    .g3p-box-pin { width: 1.6em; height: 1.6em; display: inline-block; }
    .g3p-box-pin + .g3p-box-pin { margin-left: -0.55em; }
    .g3p-box-none { color: #C2A58A; font-size: 1.4em; line-height: 1; }
    .g3p-box-empty { opacity: 0.6; border-style: dotted; }
    .g3p-cbox-ic { width: 2.6em; height: 2.2em; display: inline-flex; align-items: center; justify-content: center; }
    .g3p-cbox.g3p-box-empty .g3p-cbox-ic { visibility: hidden; }
    .g3p-wait { animation: g3pWait 1.1s ease-in-out infinite; }
    @keyframes g3pWait { 0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.7); } 50% { box-shadow: 0 0 0 9px rgba(249,115,22,0); } }
    .g3p-nudge { animation: g3eNudge 0.5s ease-in-out 3, g3pWait 1.1s ease-out 2; }
    .g3p-swatch { width: clamp(2.4rem, 6vh, 3rem); height: clamp(2.4rem, 6vh, 3rem); border-radius: 50%; border: 4px solid #fff; background: var(--c); box-shadow: 0 0 0 3px #94A3B8, 0 3px 0 3px #CBD5E1; cursor: pointer; touch-action: manipulation; transition: transform .12s; }
    .g3p-swatch.g3p-on { box-shadow: 0 0 0 4px #1E293B, 0 3px 0 4px #475569; transform: scale(1.12); }
    .g3p-hop { transform-box: fill-box; transform-origin: center; animation: g3pHop .28s ease-out; }
    @keyframes g3pHop { from { transform: scale(0.2); opacity: 0; } to { transform: none; opacity: 1; } }
    .g3p-ring { transform-box: fill-box; transform-origin: center; animation: g3pHop .3s ease-out; }
    .g3p-snap { animation: g3pSnap .45s ease-out; }
    @keyframes g3pSnap { 0% { opacity: 0.2; } 40% { opacity: 1; } 60% { opacity: 0.7; } 100% { opacity: 1; } }
    .g3p-cellpop { transform-box: fill-box; transform-origin: center; animation: g3pHop .2s ease-out; }
    /* Compa: đầu bút chì nhấp nháy mời kéo (xanh dương: mở compa; mở rồi thì xanh lá: kéo vòng quanh để vẽ). */
    .g3p-compass { filter: drop-shadow(0 3px 2px rgba(15,23,42,0.25)); cursor: grab; }
    .g3p-openme .g3p-tipdot { animation: g3pTip 1.1s ease-in-out infinite; }
    @keyframes g3pTip { 50% { stroke-width: 6; r: 12; } }
    .g3p-turnme .g3p-tipdot { stroke: #16A34A; animation: g3pTip 1.1s ease-in-out infinite; }
    .g3p-dot { color: #F97316; }
    @media (orientation: portrait) and (max-width: 600px) {
      .g3p-order { margin-right: 0; align-self: stretch; } .g3p-bench { padding-top: 0; } .g3p-btn { padding: 0.4rem 0.7rem; }
      .g3p-fin .g3f-sign, .g3p-fin .g3p-order { display: none; } /* có kết quả: nhường chỗ cho bảng (thẻ kết quả đã ghi rõ) */
    }
    @media (orientation: landscape) and (max-height: 500px) { .g3p-bench { gap: 0.3rem; } .g3p-order { min-height: 2.2rem; font-size: 0.95rem; } .g3p-btn { padding: 0.3rem 0.7rem; font-size: 0.95rem; } .g3p-acts { min-height: 2.2rem; } .g3p-box { font-size: 0.95rem; padding: 0.15rem 0.6rem; } .g3p-swatch { width: 2.1rem; height: 2.1rem; } }
    @media (prefers-reduced-motion: reduce) {
      .g3p-wait { animation: none; box-shadow: 0 0 0 4px #FDBA74; }
      .g3p-nudge { animation: g3pWait 1.2s ease-out 2; }
      .g3p-openme .g3p-tipdot { animation: g3pTipCalm 1.1s steps(1) infinite; }
      @keyframes g3pTipCalm { 50% { stroke-width: 6; } }
      .g3p-turnme .g3p-tipdot { animation: g3pTipCalm 1.1s steps(1) infinite; }
    }
  `;
  document.head.appendChild(style);
}
