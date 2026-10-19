/**
 * CSS của 🏘️ Phố Kỹ Năng (tiền tố ls-). Bố cục theo skill game-screen-layout: cảnh vẽ phủ kín, nhân vật to đứng trong
 * cảnh, bảng thoại + vùng 3 nút lựa chọn giữ chỗ cố định từ đầu truyện (không đổi bố cục giữa truyện), thẻ kết cục
 * phủ lên vùng trời của cảnh.
 */

let injected = false;

export function injectStyles() {
  if (injected) return;
  injected = true;
  const st = document.createElement('style');
  st.textContent = `
  .ls-root { position: fixed; inset: 0; z-index: 40; container-type: size; overflow: hidden; background: #EFE5D5;
    font-family: 'Baloo 2', 'Quicksand', 'Segoe UI', sans-serif; color: #3F3A40; -webkit-tap-highlight-color: transparent; user-select: none; }
  .ls-root button { font-family: inherit; color: inherit; cursor: pointer; }

  /* ── Thanh trên ── */
  .ls-top { position: absolute; top: 12px; left: 12px; right: 12px; display: flex; gap: 10px; align-items: center; z-index: 5; pointer-events: none; }
  .ls-top > * { pointer-events: auto; }
  .ls-pill { background: rgba(255,255,255,.95); border: 0; border-radius: 999px; padding: 6px 16px; font-weight: 800; min-height: 46px;
    font-size: clamp(14px, 2.6cqmin, 22px); box-shadow: 0 3px 0 rgba(0,0,0,.1); display: flex; gap: 8px; align-items: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ls-icon { width: 46px; padding: 0; justify-content: center; font-size: 22px; flex: none; }
  .ls-spacer { flex: 1; }
  .ls-dots { display: flex; gap: 5px; font-size: clamp(14px, 2.4cqmin, 20px); }
  .ls-dot { opacity: .3; filter: grayscale(1); } .ls-dot.on { opacity: 1; filter: none; }

  /* ── Cảnh + nhân vật ── */
  .ls-scene { position: absolute; inset: 0 0 var(--scene-cut) 0; }
  .ls-scene svg { width: 100%; height: 100%; display: block; }
  .ls-cast { position: absolute; left: 0; right: 0; bottom: var(--cast-bottom); height: var(--cast-h); pointer-events: none; }
  .ls-slot { position: absolute; bottom: 0; height: 100%; aspect-ratio: 21 / 40; display: flex; align-items: flex-end; justify-content: center; }
  .ls-slot-a { left: var(--slot-a); } .ls-slot-b { left: var(--slot-b); } .ls-slot-c { right: var(--slot-c); }
  .ls-slot img { height: 100%; width: 100%; object-fit: contain; object-position: bottom; filter: drop-shadow(0 6px 0 rgba(0,0,0,.12)); }
  .ls-slot-c img { transform: scaleX(-1); }
  .ls-slot.ls-in { animation: ls-in .45s ease-out both; }
  .ls-slot.ls-out { animation: ls-out .3s ease-in both; }
  .ls-slot.ls-talking img { animation: ls-bob .9s ease-in-out infinite; }
  .ls-slot.ls-happy img { animation: ls-hop .6s ease-out 2; }
  .ls-slot.ls-sad img { animation: ls-shake .5s ease-in-out 1; }
  .ls-slot.ls-phone::before { content: ''; position: absolute; inset: 6% -6% 0; border-radius: 40px 40px 0 0; background: #fff; border: 4px solid #F43F5E; z-index: -1; }
  .ls-slot.ls-phone::after { content: '📞'; position: absolute; top: 2%; left: -8%; font-size: clamp(26px, 6cqmin, 48px); animation: ls-bob 1s ease-in-out infinite; }
  .ls-slot.ls-phone img { transform: none; }
  @keyframes ls-in { from { opacity: 0; transform: translateY(8%); } }
  @keyframes ls-out { to { opacity: 0; transform: translateY(6%); } }
  @keyframes ls-bob { 50% { transform: translateY(-3%); } }
  @keyframes ls-hop { 40% { transform: translateY(-7%); } }
  @keyframes ls-shake { 25% { transform: translateX(-3%); } 75% { transform: translateX(3%); } }

  /* Trạng thái cảnh (data-* trên .ls-scene) */
  /* Mặc định (cả hình xem trước ở danh sách truyện): đèn đỏ, không báo động, không mũi tên, cửa yên, loa tắt */
  .ls-root .ls-green, .ls-root .ls-red-off, .ls-root .ls-alert, .ls-root .ls-look, .ls-root .ls-knock, .ls-root .ls-ring, .ls-root .ls-loa { display: none; }
  .ls-scene[data-light="green"] .ls-green, .ls-scene[data-light="green"] .ls-red-off { display: inline; }
  .ls-scene[data-light="green"] .ls-red, .ls-scene[data-light="green"] .ls-green-off { display: none; }
  /* come: xe chạy qua vạch liên tục (đèn đỏ cho người đi bộ); stop: xe dừng trước vạch dừng */
  .ls-scene[data-bike="come"] .ls-bike { animation: ls-bike-pass 3.6s linear infinite; }
  .ls-scene[data-bike="stop"] .ls-bike { animation: ls-bike-brake .8s ease-out both; }
  .ls-scene[data-bike="none"] .ls-bike { display: none; }
  .ls-scene[data-alert] .ls-alert { display: inline; animation: ls-blink .5s steps(2) infinite; }
  .ls-scene[data-look="left"] .ls-look-left, .ls-scene[data-look="right"] .ls-look-right { display: inline; animation: ls-blink .4s steps(2) 3; }
  .ls-scene[data-door="knock"] .ls-knock { display: inline; }
  .ls-scene[data-door="knock"] .ls-door { animation: ls-knock .7s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
  .ls-scene[data-phone="ring"] .ls-ring { display: inline; animation: ls-blink .35s steps(2) infinite; }
  .ls-scene[data-phone="ring"] .ls-phone { animation: ls-knock .3s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
  .ls-scene[data-loa="on"] .ls-loa { display: inline; animation: ls-blink .5s steps(2) infinite; }
  @keyframes ls-bike-pass { from { transform: translateX(700px); } to { transform: translateX(-1500px); } }
  @keyframes ls-bike-brake { from { transform: translateX(160px); } }
  @keyframes ls-blink { 50% { opacity: .25; } }
  @keyframes ls-knock { 20% { transform: rotate(-1deg); } 40% { transform: rotate(1deg); } 60% { transform: none; } }

  /* ── Bảng thoại + nút ── */
  .ls-ui { position: absolute; left: 12px; right: 12px; bottom: 12px; height: var(--ui-h); display: grid; gap: 12px; grid-template: var(--ui-grid); }
  .ls-talk { grid-area: talk; position: relative; background: #FFF8EC; border: 3px solid #E9CFA0; border-radius: 24px; min-height: 0;
    box-shadow: 0 6px 0 rgba(120,80,20,.18); padding: clamp(18px, 3.4cqmin, 30px) clamp(16px, 2.6cqmin, 26px) 10px; display: flex; gap: 14px; text-align: left; }
  .ls-who { position: absolute; top: -17px; left: 20px; background: var(--who, #F472B6); color: #fff; font-weight: 800; border-radius: 14px; padding: 2px 16px;
    font-size: clamp(15px, 2.6cqmin, 22px); border: 3px solid #fff; box-shadow: 0 3px 0 rgba(0,0,0,.1); }
  .ls-who:empty { visibility: hidden; }
  .ls-face { flex: none; align-self: flex-start; width: clamp(54px, 10cqmin, 92px); aspect-ratio: 1; border-radius: 50%; background: #FFE4EC; border: 3px solid #F9A8C4;
    overflow: hidden; display: grid; place-items: center; font-size: clamp(28px, 6cqmin, 54px); }
  .ls-face img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 0; transform: scale(1.9); transform-origin: 50% 0; }
  .ls-line { flex: 1; min-width: 0; white-space: pre-line; font-size: clamp(17px, 4.2cqmin, 32px); font-weight: 700; line-height: 1.3; overflow: auto; }
  .ls-line.ls-fade { animation: ls-line .35s ease-out; }
  .ls-learn .ls-line { color: #9A3412; }
  @keyframes ls-line { from { opacity: 0; transform: translateY(6px); } }
  .ls-say { position: absolute; right: 10px; bottom: 6px; border: 0; background: none; font-size: clamp(18px, 3cqmin, 26px); opacity: .7; padding: 4px; }

  .ls-pick { grid-area: pick; display: grid; gap: 10px; grid-template-rows: repeat(3, 1fr); min-height: 0; }
  .ls-ch { border: 0; border-radius: 18px; display: flex; align-items: center; gap: 12px; padding: 0 14px; color: #fff !important; font-weight: 800; min-height: 0;
    font-size: clamp(15px, 3.3cqmin, 26px); line-height: 1.15; text-align: left; box-shadow: 0 5px 0 rgba(0,0,0,.22), inset 0 -4px 0 rgba(0,0,0,.08);
    transition: transform .1s; }
  .ls-ch:active { transform: translateY(3px); box-shadow: 0 2px 0 rgba(0,0,0,.22); }
  .ls-ch .ls-ic { width: clamp(36px, 7cqmin, 58px); aspect-ratio: 1; border-radius: 12px; background: rgba(255,255,255,.95); display: grid; place-items: center;
    font-size: clamp(20px, 4.2cqmin, 36px); flex: none; }
  .ls-ch-empty { visibility: hidden; }
  .ls-ch.c0 { background: linear-gradient(#34C47C, #20A866); } .ls-ch.c1 { background: linear-gradient(#FB9A4B, #EF7A2A); } .ls-ch.c2 { background: linear-gradient(#5B9EF0, #3B7FDB); }
  .ls-ch.ls-next { background: linear-gradient(#94A3B8, #64748B); }
  .ls-ch.ls-fresh { animation: ls-pop .35s ease-out both; }
  .ls-ch.ls-done { opacity: .55; }
  .ls-ch.ls-no { animation: ls-shake .4s; }
  @keyframes ls-pop { from { transform: scale(.9); opacity: .4; } }

  /* ── Thẻ kết cục (phủ lên trời của cảnh) ── */
  .ls-end { position: absolute; left: 50%; top: 70px; transform: translateX(-50%); width: min(560px, 86cqw); background: #fff; border-radius: 26px;
    border: 4px solid var(--end, #FACC15); box-shadow: 0 8px 0 rgba(0,0,0,.15); padding: 12px 20px 14px; text-align: center; visibility: hidden; z-index: 4; }
  .ls-end.on { visibility: visible; animation: ls-pop .45s ease-out; }
  .ls-end-ic { font-size: clamp(34px, 8cqmin, 64px); line-height: 1; }
  .ls-end-kind { font-weight: 800; font-size: clamp(14px, 2.4cqmin, 20px); color: var(--end); }
  .ls-end-title { font-weight: 800; font-size: clamp(20px, 4.4cqmin, 34px); }
  .ls-end-book { margin-top: 4px; font-size: clamp(14px, 2.4cqmin, 19px); font-weight: 700; color: #64748B; }

  /* Ngang / dọc */
  /* .ls-root là container: biến đặt ở các con trực tiếp (container query không áp lên chính container) */
  @container (min-aspect-ratio: 1/1) {
    .ls-root > * { --ui-h: 31cqh; --scene-cut: 22cqh; --cast-bottom: 29cqh; --cast-h: 52cqh; --slot-a: 7cqw; --slot-b: 20cqw; --slot-c: 4cqw;
      --ui-grid: "talk pick" 1fr / 1.45fr 1fr; }
  }
  @container (max-aspect-ratio: 1/1) {
    .ls-root > * { --ui-h: 44cqh; --scene-cut: 38cqh; --cast-bottom: 43cqh; --cast-h: 31cqh; --slot-a: 3cqw; --slot-b: 34cqw; --slot-c: 3cqw;
      --ui-grid: "talk" .95fr "pick" 1.35fr / 1fr; }
    .ls-end { top: 66px; }
  }

  /* ── Bản đồ phố, danh sách truyện, chọn nhân vật ── */
  .ls-bg { position: absolute; inset: 0; }
  .ls-bg svg { width: 100%; height: 100%; display: block; }
  .ls-menu { position: absolute; inset: 70px 12px 12px; display: grid; gap: 12px; }
  .ls-places { grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(2, 1fr); }
  @container (max-aspect-ratio: 1/1) { .ls-places { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(4, 1fr); } }
  .ls-card { position: relative; border: 0; background: #fff; border-radius: 22px; box-shadow: 0 6px 0 var(--c, #F97316); border-top: 8px solid var(--c, #F97316);
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 8px; min-height: 0; transition: transform .1s; }
  .ls-card:active { transform: translateY(4px); box-shadow: 0 2px 0 var(--c); }
  .ls-card-ic { font-size: clamp(34px, 10cqmin, 84px); line-height: 1.1; }
  .ls-card-t { font-weight: 800; font-size: clamp(15px, 3.2cqmin, 26px); line-height: 1.15; text-align: center; }
  .ls-card-s { font-weight: 700; font-size: clamp(13px, 2.4cqmin, 19px); color: #64748B; }
  .ls-card.ls-soon { background: #F1F5F9; color: #94A3B8; box-shadow: 0 6px 0 #CBD5E1; border-top-color: #CBD5E1; }
  .ls-card.ls-soon .ls-card-ic { filter: grayscale(.8); opacity: .6; }
  .ls-stories { grid-auto-rows: minmax(0, 1fr); grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); align-content: stretch; }
  .ls-story { padding: 0; gap: 0; overflow: hidden; justify-content: stretch; align-items: stretch; text-align: left; }
  .ls-prev { flex: 1 1 0; min-height: 0; display: block; }
  .ls-prev svg { width: 100%; height: 100%; display: block; }
  .ls-story-b { flex: none; display: flex; align-items: center; gap: 14px; padding: 10px 16px; border-top: 3px solid var(--c); }
  .ls-story .ls-card-ic { font-size: clamp(30px, 7cqmin, 56px); }
  .ls-story-t { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .ls-story .ls-card-t { text-align: left; }
  .ls-play { flex: none; width: clamp(48px, 9cqmin, 72px); aspect-ratio: 1; border-radius: 50%; background: var(--c); color: #fff; display: grid; place-items: center;
    font-size: clamp(22px, 4.4cqmin, 34px); box-shadow: 0 4px 0 rgba(0,0,0,.2); }
  .ls-heroes { grid-template-columns: 1fr 1fr; }
  .ls-hero img { height: 70%; max-height: 70cqh; object-fit: contain; }
  .ls-ask { position: absolute; top: 12px; left: 70px; right: 12px; }

  @media (prefers-reduced-motion: reduce) {
    .ls-slot.ls-talking img, .ls-slot.ls-phone::after { animation-duration: 2.4s; }
    .ls-scene[data-bike="come"] .ls-bike { animation-duration: 6s; }
    .ls-scene[data-door="knock"] .ls-door, .ls-scene[data-phone="ring"] .ls-phone { animation-duration: 1.6s; }
    .ls-scene[data-alert] .ls-alert, .ls-scene[data-loa="on"] .ls-loa, .ls-scene[data-phone="ring"] .ls-ring { animation: ls-blink 1.6s ease-in-out infinite; }
  }
  `;
  document.head.appendChild(st);
}
