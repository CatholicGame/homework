/** CSS của trò 🐸 Ếch nhảy tia số (lớp g2f-*). Nền, thanh trên, thẻ kết quả dùng chung với trò lớp 3 (grade3Games/styles.js). */

export function injectFrogStyles() {
  if (document.getElementById('g2f-styles')) return;
  const st = document.createElement('style');
  st.id = 'g2f-styles';
  st.textContent = `
    .g2f-scene { position: relative; display: flex; flex-direction: column; min-height: 0; border-radius: 1.2rem; overflow: hidden; box-shadow: 0 4px 0 rgba(15,23,42,0.12); background: #5BB8E0; }
    .g2f-pond { position: relative; flex: 1; min-height: 0; }
    .g2f-svg { position: absolute; inset: 0; display: block; touch-action: manipulation; user-select: none; -webkit-user-select: none; }
    .g2f-svg.g2f-pan { touch-action: pan-y; } /* vuốt ngang thuộc về trò chơi, không để trình duyệt giành */
    .g2f-padwrap { cursor: pointer; }

    /* Mặt nước động: sóng gợn trôi, vệt sáng lướt, vòng sóng quanh lá, lau đung đưa. Máy tắt hiệu ứng: vẫn chạy, chậm và nhẹ hơn. */
    .g2-wave { animation: g2fWave 5s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
    @keyframes g2fWave { from { transform: translateX(-14px) scaleX(.85); opacity: .25; } to { transform: translateX(14px) scaleX(1.1); opacity: .75; } }
    .g2-shine { opacity: .22; animation: g2fShine 16s linear infinite; }
    @keyframes g2fShine { from { transform: translateX(0); } to { transform: translateX(var(--sw)); } }
    .g2-reed { transform-box: fill-box; transform-origin: 50% 100%; animation: g2fReed 3.6s ease-in-out infinite alternate; }
    @keyframes g2fReed { from { transform: rotate(-3deg); } to { transform: rotate(3deg); } }
    .g2f-ring { fill: none; stroke: #E0F5FF; stroke-width: 2.5; transform-box: fill-box; transform-origin: center; animation: g2fRing 3s ease-out infinite; pointer-events: none; }
    @keyframes g2fRing { from { transform: scale(.92); opacity: .7; } to { transform: scale(1.28); opacity: 0; } }
    @media (prefers-reduced-motion: reduce) {
      .g2-wave { animation-duration: 9s !important; }
      .g2-shine { animation-duration: 40s !important; }
      .g2-reed { animation-duration: 7s; }
      .g2f-ring { animation-duration: 5s; }
    }

    .g2f-pan-btn { position: absolute; z-index: 3; top: var(--pan-y, 75%); width: 3.2rem; height: 3.2rem; border-radius: 50%; border: 3px solid #fff; background: #0EA5E9cc; color: #fff; font-size: 2rem; font-weight: 800; line-height: 1; display: grid; place-items: center; box-shadow: 0 4px 0 #0369A1; cursor: pointer; }
    .g2f-pan-l { left: 0.4rem; } .g2f-pan-r { right: 0.4rem; }
    .g2f-pan-btn:disabled { opacity: .3; box-shadow: none; }
    .g2f-pan-btn:not(:disabled):active { transform: translateY(3px); box-shadow: 0 1px 0 #0369A1; }
    .g2f-pan-btn[hidden] { display: none; }
    /* "✓ Tới nơi" nổi trên đầu ếch: to, xanh, đuôi nhọn chỉ xuống ếch, nhún nhẹ để bé thấy. */
    .g2f-go { position: absolute; z-index: 4; transform: translate(-50%, -100%); border: 4px solid #fff; border-radius: 999px; padding: 0.35em 1em; background: linear-gradient(180deg, #4ADE80, #16A34A); color: #fff; font: 800 var(--go-fs, 1.3rem) 'Baloo 2', Quicksand, sans-serif; line-height: 1.1; white-space: nowrap; text-shadow: 0 2px 0 rgba(21,128,61,.5); box-shadow: 0 5px 0 #15803D, 0 10px 22px rgba(21,128,61,.35); cursor: pointer; animation: g2fGoIn .3s cubic-bezier(.2,1.5,.4,1), g2fGoBob 1.3s ease-in-out .3s infinite; }
    .g2f-go::after { content: ''; position: absolute; left: 50%; bottom: -0.62em; margin-left: -0.45em; border: 0.45em solid transparent; border-top-color: #fff; border-bottom: 0; }
    .g2f-go[hidden] { display: none; }
    .g2f-go:active { animation: none; transform: translate(-50%, calc(-100% + 3px)); box-shadow: 0 2px 0 #15803D; }
    @keyframes g2fGoIn { from { opacity: 0; transform: translate(-50%, -60%) scale(.5); } to { opacity: 1; transform: translate(-50%, -100%) scale(1); } }
    @keyframes g2fGoBob { 0%, 100% { transform: translate(-50%, -100%) scale(1); } 50% { transform: translate(-50%, calc(-100% - 6px)) scale(1.06); } }
    @media (prefers-reduced-motion: reduce) { .g2f-go { animation-duration: .3s, 2.6s; } }
    .g2f-num, .g2f-frog, .g2f-trail, .g2f-ghost, .g2f-flag, .g2f-fx { pointer-events: none; } /* chạm vào số / ếch vẫn là chạm vào lá */
    .g2f-bob { transform-box: fill-box; transform-origin: 50% 60%; }
    .g2f-bobbing { animation: g2fBob .45s ease; }
    @keyframes g2fBob { 0% { transform: scale(1); } 35% { transform: scale(1.07, .86); } 70% { transform: scale(.98, 1.04); } 100% { transform: scale(1); } }
    .g2f-hint-pads .g2f-bob { animation: g2fBob .6s ease 2; }
    .g2f-arc path { fill: none; stroke: #fff; stroke-width: 3; stroke-dasharray: 2 8; stroke-linecap: round; }
    .g2f-arc rect { fill: #F59E0B; stroke: #92400E; stroke-width: 1.6; }
    .g2f-arc text { fill: #fff; font: 800 16px 'Baloo 2', Quicksand, sans-serif; }
    .g2f-arc-right path { stroke: #FB923C; stroke-width: 4; stroke-dasharray: 9 6; }
    .g2f-arc-right rect { fill: #FB923C; stroke: #9A3412; }
    .g2f-splash ellipse { fill: none; stroke: #fff; stroke-width: 3; transform-box: fill-box; transform-origin: center; animation: g2fRipple 1.1s ease-out 2 both; }
    .g2f-splash ellipse + ellipse { animation-delay: .25s; }
    @keyframes g2fRipple { from { transform: scale(.3); opacity: 1; } to { transform: scale(1.5); opacity: 0; } }

    .g2f-npc { position: absolute; left: 0.5rem; top: 0.4rem; display: flex; align-items: flex-start; gap: 0.5rem; max-width: min(62%, 560px); pointer-events: none; }
    .g2f-npc-pic { height: var(--npc-h, 150px); flex: none; }
    .g2f-npc-pic img { height: 100%; width: auto; display: block; }
    .g2f-npc-pic .g3-npc-img { aspect-ratio: auto; } /* mẹ ếch ngồi trên lá: hình gần vuông, không phải dáng người đứng 21:40 */
    .g2f-bubble { background: #fff; border: 3px solid #FDBA74; border-radius: 1.2rem; padding: 0.45rem 0.8rem; font-weight: 700; color: #7C2D12; line-height: 1.3; font-size: clamp(1rem, 1.6vh + 0.6rem, 1.5rem); box-shadow: 0 4px 0 #FED7AA; }
    .g2f-npc-name { display: block; font-size: 0.7em; color: #9A3412; opacity: .8; }
    .g2f-bubble .g3f-want { font-size: 1.35em; }
    .g2f-log { position: absolute; right: 0.6rem; top: 0.5rem; background: #ffffffe6; border-radius: 0.9rem; padding: 0.3rem 0.8rem; font-weight: 800; color: #1F3A24; font-size: clamp(1rem, 1.8vh + 0.5rem, 1.4rem); line-height: 1.35; box-shadow: 0 3px 0 rgba(15,23,42,.12); }

    .g2f-tray { display: flex; align-items: center; gap: 0.6rem; padding: 0.55rem 0.6rem; background: #FFF7E6; border-top: 3px solid #F5D08A; }
    .g2f-cards { display: flex; flex-wrap: wrap; gap: 0.45rem; flex: 1; min-width: 0; }
    .g2f-card { min-width: 3.1rem; height: 3.1rem; padding: 0 0.4rem; border: 0; border-radius: 0.9rem; background: #F59E0B; color: #fff; font-size: 1.35rem; font-weight: 800; box-shadow: 0 4px 0 #B45309; cursor: pointer; }
    .g2f-card:active { transform: translateY(3px); box-shadow: 0 1px 0 #B45309; }
    .g2f-card-ten { background: #60A5FA; box-shadow: 0 4px 0 #1D4ED8; }
    .g2f-card:disabled { opacity: .45; cursor: default; }
    .g2f-card-on:disabled { opacity: 1; outline: 4px solid #FDE68A; outline-offset: 2px; }
    .g2f-busy .g2f-card { pointer-events: none; }
    .g2f-nudge { animation: g2fNudge .6s ease; }
    @keyframes g2fNudge { 0%, 100% { transform: none; } 20% { transform: translateX(-7px); } 40% { transform: translateX(7px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
    .g2f-tray-hint { font-weight: 700; color: #92400E; font-size: clamp(1rem, 1.4vh + 0.6rem, 1.3rem); }
    .g2f-tray-end { display: flex; align-items: center; gap: 0.5rem; flex: none; }
    .g2f-say-btn { width: 3rem; height: 3rem; border-radius: 50%; border: 2px solid #CBD5E1; background: #fff; font-size: 1.3rem; cursor: pointer; }
    .g2f-how-card { display: inline-grid; place-items: center; min-width: 2.2em; height: 2.2em; padding: 0 .3em; border-radius: .6em; background: #F59E0B; color: #fff; font-weight: 800; box-shadow: 0 3px 0 #B45309; }

    .g2f-scene > .g3g-result { position: absolute; z-index: 6; top: 0.6rem; right: 0.6rem; width: min(48%, 440px); max-height: calc(100% - 1.2rem); overflow-y: auto; border-width: 3px; border-radius: 1.3rem; text-align: center; align-items: stretch; box-shadow: 0 6px 0 rgba(0,0,0,0.1), 0 16px 36px rgba(0,0,0,0.25); animation: g3fPop .35s cubic-bezier(.2,1.4,.4,1); }
    .g3g-has-result .g2f-tray { visibility: hidden; }
    .g3g-has-result .g2f-log { display: none; }

    /* Màn ngang: bạn nhỏ đứng ngay trên đầu hàng lá, thẻ kết quả / nhật ký nhảy ở phía trên đầu kia của hàng —
       cùng độ cao, chữ to theo cỡ khung (--npc-top, --row-side, --say-fs do frog.js tính). */
    .g2f-scene:not(.g2f-tall) .g2f-npc { left: var(--row-side, 0.5rem); top: var(--npc-top, 0.4rem); max-width: min(58%, 780px); gap: 0.7rem; }
    .g2f-scene:not(.g2f-tall) .g2f-bubble { font-size: var(--say-fs, 1.3rem); border-width: 4px; padding: 0.5em 0.9em; margin-top: calc(var(--npc-h) * 0.08); }
    .g2f-scene:not(.g2f-tall) .g2f-log { top: var(--npc-top, 0.5rem); right: var(--row-side, 0.6rem); font-size: calc(var(--say-fs, 1.3rem) * 0.85); padding: 0.35em 0.9em; }
    .g2f-scene:not(.g2f-tall) > .g3g-result { top: var(--npc-top, 0.6rem); right: var(--row-side, 0.6rem); width: min(44%, 640px); max-height: calc(100% - var(--npc-top, 0.6rem) - 0.8rem); padding: 1rem 1.2rem; gap: 0.7rem; animation-name: g2fCardPop; }
    @keyframes g2fCardPop { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: none; } } /* g3fPop kèm translateX(-50%) → thẻ đặt bên phải bị giật khi hết hiệu ứng */
    .g2f-scene:not(.g2f-tall) > .g3g-result .g3g-result-text { font-size: calc(var(--say-fs, 1.3rem) * 0.82); }
    .g2f-scene:not(.g2f-tall) > .g3g-result .g3g-tip { font-size: calc(var(--say-fs, 1.3rem) * 0.7); }
    .g2f-scene:not(.g2f-tall) > .g3g-result .g3g-btn { font-size: calc(var(--say-fs, 1.3rem) * 0.75); padding: 0.55em 1em; }

    .g2f-tall .g2f-npc { max-width: calc(100% - 1rem); }
    .g2f-tall .g2f-bubble { font-size: clamp(0.95rem, 1.2vh + 0.6rem, 1.3rem); }
    .g2f-tall .g2f-log { top: auto; bottom: 0.5rem; right: auto; left: 50%; transform: translateX(-50%); white-space: nowrap; }
    .g2f-tall .g2f-tray { flex-direction: column; align-items: stretch; }
    .g2f-tall .g2f-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(3.1rem, 1fr)); }
    .g2f-tall .g2f-tray-hint { grid-column: 1 / -1; text-align: center; }
    .g2f-tall > .g3g-result { top: auto; bottom: 0.6rem; right: auto; left: 50%; transform: translateX(-50%); width: min(94%, 460px); max-height: 60%; }
    @media (max-height: 500px) {
      .g2f-card { min-width: 2.6rem; height: 2.6rem; font-size: 1.1rem; }
      .g2f-say-btn { width: 2.6rem; height: 2.6rem; }
      .g2f-tray { padding: 0.35rem 0.5rem; }
      .g2f-bubble { font-size: 0.95rem; padding: 0.3rem 0.6rem; }
      .g2f-npc-name { display: none; }
    }
  `;
  document.head.appendChild(st);
}

/** CSS của trò 🚌 Xe buýt lên xuống (lớp g2b-*). Khung quầy, máy tính, thẻ kết quả dùng chung với Chợ phiên lớp 3 (theme 'bus'). */
export function injectBusStyles() {
  if (document.getElementById('g2b-styles')) return;
  const st = document.createElement('style');
  st.id = 'g2b-styles';
  st.textContent = `
    .g3f-theme-bus .g3f-awning { background: repeating-linear-gradient(90deg, #FACC15 0 16px, #FDE68A 16px 22px); border-bottom-color: #CA8A04; }
    .g3f-theme-bus .g3f-awning::after { display: none; }
    .g3f-theme-bus .g3f-counter { background: linear-gradient(#E0F2FE, #F0F9FF 60%, #E2E8F0); border-bottom-color: #64748B; }
    .g3f-theme-bus .g3f-sign { background: #2563EB; border-color: #1E3A8A; color: #fff; text-shadow: 0 1px 0 rgba(30,58,138,0.5); }
    .g3f-theme-bus .g3f-sign strong { color: #FEF08A; }
    .g3f-theme-bus .g3f-main::after { background: rgba(15,23,42,0.06); }
    .g3f-q.g2b-bill-ans { animation: none; background: #16A34A; font-size: 0.9em; padding: 0 0.4em; }
    .g2b-sign-pic { font-size: 1.7em; line-height: 1; }
    .g2b-bench { flex: 1; min-height: 0; width: 100%; display: flex; flex-direction: column; align-items: stretch; gap: 0.5rem; padding-top: clamp(2.8rem, 8vh, 4rem); box-sizing: border-box; }
    .g2b-view { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; }
    .g2b-svg { display: block; overflow: visible; user-select: none; -webkit-user-select: none; }
    .g2b-act { align-self: center; flex: none; border: 4px solid #fff; border-radius: 999px; padding: 0.35em 1.3em; background: linear-gradient(180deg, #4ADE80, #16A34A); color: #fff; font: 800 clamp(1.1rem, 2.2vh + 0.6rem, 1.7rem) 'Baloo 2', Quicksand, sans-serif; line-height: 1.15; text-shadow: 0 2px 0 rgba(21,128,61,.5); box-shadow: 0 5px 0 #15803D, 0 8px 18px rgba(21,128,61,.3); cursor: pointer; opacity: .55; touch-action: manipulation; }
    .g2b-act.g2b-act-ready { opacity: 1; animation: g2bBob 1.2s ease-in-out infinite; }
    .g2b-act:disabled { opacity: .35; animation: none; cursor: default; }
    .g2b-act:not(:disabled):active { transform: translateY(3px); box-shadow: 0 2px 0 #15803D; }
    @keyframes g2bBob { 0%, 100% { transform: none; } 50% { transform: translateY(-5px) scale(1.05); } }
    @media (prefers-reduced-motion: reduce) { .g2b-act.g2b-act-ready { animation-duration: 2.4s; } }
    .g3g-has-result .g2b-act { visibility: hidden; }

    .g2b-count { fill: #86EFAC; font-family: 'Courier New', monospace; font-weight: 800; }
    .g2b-tick { animation: g2bTick .3s ease; transform-box: fill-box; transform-origin: center; }
    @keyframes g2bTick { 50% { transform: scale(1.25); fill: #FEF08A; } }
    .g2b-label { font: 800 8.5px 'Baloo 2', Quicksand, sans-serif; fill: #fff; paint-order: stroke; stroke: rgba(15,23,42,.45); stroke-width: 2px; }
    .g2b-glass { fill: #fff; opacity: .12; pointer-events: none; }
    .g2b-door { cursor: pointer; }
    .g2b-leaf { transition: transform .35s ease; transform-box: fill-box; transform-origin: 0 50%; }
    .g2b-leaf-r { transform-origin: 100% 50%; }
    .g2b-door-open .g2b-leaf { transform: scaleX(0.2); }
    .g2b-curtain { transition: transform .3s ease, opacity .3s ease; transform-box: fill-box; transform-origin: 50% 0; }
    .g2b-curtain-up { transform: scaleY(0.12); opacity: .6; }
    .g2b-seat > rect:first-child { transition: stroke .2s; }
    .g2b-paired .g2b-who { opacity: .45; }
    .g2b-paired > rect:first-child { fill: #DCFCE7; stroke: #16A34A; stroke-width: 2; }
    .g2b-extra > rect:first-child { fill: #FEF9C3; stroke: #F59E0B; stroke-width: 2.6; }
    .g2b-over > rect:first-child { fill: #FEE2E2; stroke: #DC2626; stroke-width: 2.6; }
    .g2b-miss > rect:first-child { fill: #FFF1F2; stroke: #DC2626; stroke-width: 2.2; stroke-dasharray: 3 2; }
    .g2b-num circle { fill: #F97316; stroke: #fff; stroke-width: 1.6; }
    .g2b-num text { fill: #fff; font: 800 9.5px 'Baloo 2', Quicksand, sans-serif; }
    .g2b-num { animation: g2bNum .3s cubic-bezier(.2,1.5,.4,1); transform-box: fill-box; }
    @keyframes g2bNum { from { opacity: 0; } to { opacity: 1; } }
    @media (max-height: 500px) {
      .g2b-bench { padding-top: 2.4rem; gap: 0.3rem; }
      .g2b-act { font-size: 1rem; padding: 0.2em 1em; border-width: 3px; }
    }
    @media (orientation: portrait) { .g2b-bench { padding-top: 0.2rem; } .g3f-theme-bus .g3f-sign { display: none; } } /* màn dọc: nhường chỗ cho xe, tên trạm đã có trong lời bác tài */
  `;
  document.head.appendChild(st);
}

/** CSS của 🥕 Quầy rau củ (lớp g2v-*). Khung quầy, cân, thẻ kết quả dùng chung với Chợ phiên lớp 3 (theme 'veg'). */
export function injectVegStyles() {
  if (document.getElementById('g2v-styles')) return;
  const st = document.createElement('style');
  st.id = 'g2v-styles';
  st.textContent = `
    .g3f-theme-veg .g3f-awning { background: repeating-linear-gradient(90deg, #4ADE80 0 36px, #FFF 36px 72px); border-bottom-color: #15803D; }
    .g3f-theme-veg .g3f-counter { background: linear-gradient(#ECFCCB, #D9F99D); border-bottom-color: #65A30D; }
    .g3f-theme-veg .g3f-sign { background: #16A34A; border-color: #14532D; color: #fff; text-shadow: 0 1px 0 rgba(20,83,45,0.5); }
    .g3f-theme-veg .g3f-main::after { background: rgba(15,23,42,0.06); } /* thẻ kết quả: cân phía trên vẫn sáng rõ */
    /* Cấp chọn câu (g2v-nopad): không gõ số, bỏ máy tính tiền, khách đứng to cả cột. */
    .g2v-nopad .g3f-ask { display: none; }
    .g3f-theme-veg .g3f-scale-host { padding-top: clamp(1.8rem, 6vh, 3rem); box-sizing: border-box; }

    .g2v-nopad .g3f-npc { flex: 1 1 auto; }
    .g2v-nopad .g3f-npc img { max-height: 420px; }
    .g2v-dock { flex: none; width: 100%; display: flex; gap: 0.6rem; container-type: inline-size; }
    /* --u: số px cho một đơn vị hình — chung cho cả hai khay, vừa chiều cao khay và nửa bề ngang quầy. */
    .g2v-tray { --u: min(clamp(44px, 11vh, 96px) / var(--hmax), (50cqw - 1.8rem) / var(--wmax)); }
    .g2v-tray { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 0.15rem; background: #FFFBEB; border: 3px solid #D97706; border-radius: 0.9rem; padding: 0.3rem 0.4rem; cursor: pointer; font: inherit; touch-action: manipulation; }
    .g2v-tray svg { width: calc(var(--u) * var(--w)); height: calc(var(--u) * var(--h)); display: block; overflow: visible; }
    .g2v-tray-name { font-weight: 800; color: #78350F; font-size: clamp(0.85rem, 1.2vh + 0.5rem, 1.1rem); line-height: 1.15; text-align: center; }
    .g2v-tray-empty { border-style: dashed; background: transparent; cursor: default; }
    .g2v-tray-empty svg { visibility: hidden; }
    .g2v-tray-empty .g2v-tray-name { opacity: .45; }
    .g2v-dock-hint .g2v-tray:not(.g2v-tray-empty) svg { animation: g3fHop 2.2s ease-in-out infinite; }
    .g2v-dock-hint .g2v-tray:not(.g2v-tray-empty) { box-shadow: 0 0 0 3px #FDE68A; }

    /* Cấp cân kg: túi hàng + khay quả cân, cùng một tỉ lệ theo chiều cao (--hmax). */
    /* Cỡ theo chiều cao khay, nhưng cả hàng (túi + quả cân, --wsum) phải vừa bề ngang quầy trên một hàng (--gaps: số khay). */
    .g2v-dock-kg .g2v-tray { --u: min(calc(clamp(44px, 10.5vh, 92px) / var(--hmax)), calc((100cqw - var(--gaps) * 2.4rem - 3rem) / var(--wsum))); }
    .g2v-dock-kg .g2v-tray-bag { min-width: 0; }
    .g2v-dock-kg .g2v-tray-bag { flex: 0 1 auto; }
    .g2v-dock-kg .g2v-wtray { flex: 1 1 auto; cursor: default; }
    div.g2v-tray, div.g2v-tray-bag { cursor: default; }
    .g2v-wrow { display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-end; gap: 0.25rem 0.4rem; }
    .g2v-w { border: 0; background: none; padding: 0; cursor: pointer; touch-action: manipulation; display: block; }
    span.g2v-w { cursor: default; }
    .g2v-w svg { width: calc(var(--u) * var(--w)); height: calc(var(--u) * var(--h)); display: block; overflow: visible; }
    .g2v-w-away svg { visibility: hidden; }
    .g2v-tray-bag.g2v-tray-empty svg { visibility: hidden; }
    .g2v-hint-bag .g2v-tray-bag svg, .g2v-hint-w .g2v-w:not(.g2v-w-away) svg { animation: g3fHop 2.2s ease-in-out infinite; }
    .g2v-hint-w .g2v-w:nth-child(2) svg { animation-delay: .15s; } .g2v-hint-w .g2v-w:nth-child(3) svg { animation-delay: .3s; }
    .g2v-hint-w .g2v-w:nth-child(4) svg { animation-delay: .45s; } .g2v-hint-w .g2v-w:nth-child(5) svg { animation-delay: .6s; }
    .g2v-hint-bag .g2v-tray-bag, .g2v-hint-w .g2v-wtray { box-shadow: 0 0 0 3px #FDE68A; }
    .g3f-q.g2v-bill-ans { animation: none; background: #16A34A; font-size: 0.9em; padding: 0 0.4em; }
    .g2v-choices { flex: none; width: 100%; display: flex; flex-direction: column; gap: 0.4rem; animation: g2vIn .35s cubic-bezier(.2,1.4,.4,1); }
    @keyframes g2vIn { from { opacity: 0; transform: scale(.8); } to { opacity: 1; transform: none; } }
    .g2v-choices[hidden], .g2v-dock[hidden] { display: none; }
    .g2v-choice { display: flex; align-items: center; gap: 0.6rem; text-align: left; background: #fff; border: 3px solid #E2E8F0; border-radius: 0.9rem; padding: 0.4rem 0.7rem; font: 700 clamp(0.95rem, 1.4vh + 0.55rem, 1.3rem) Quicksand, sans-serif; color: #1E293B; cursor: pointer; box-shadow: 0 3px 0 #CBD5E1; touch-action: manipulation; }
    .g2v-choice b { flex: none; width: 1.8em; height: 1.8em; border-radius: 50%; background: #1E293B; color: #fff; display: grid; place-items: center; font-size: 0.85em; }
    .g2v-choice:not(:disabled):active { transform: translateY(2px); box-shadow: 0 1px 0 #CBD5E1; }
    .g2v-locked .g2v-choice { pointer-events: none; }
    .g2v-locked .g2v-choice:not(.g2v-right):not(.g2v-wrong) { opacity: .5; }
    .g2v-right { border-color: #16A34A; background: #DCFCE7; }
    .g2v-right b { background: #16A34A; }
    .g2v-wrong { border-color: #DC2626; background: #FEE2E2; }
    .g2v-wrong b { background: #DC2626; }
    @media (max-height: 500px) {
      .g2v-choice { padding: 0.2rem 0.5rem; }
      /* Cấp cân kg: túi hàng + khay quả cân, cùng một tỉ lệ theo chiều cao (--hmax). */
    /* Cỡ theo chiều cao khay, nhưng cả hàng (túi + quả cân, --wsum) phải vừa bề ngang quầy trên một hàng (--gaps: số khay). */
    .g2v-dock-kg .g2v-tray { --u: min(calc(clamp(44px, 10.5vh, 92px) / var(--hmax)), calc((100cqw - var(--gaps) * 2.4rem - 3rem) / var(--wsum))); }
    .g2v-dock-kg .g2v-tray-bag { min-width: 0; }
    .g2v-dock-kg .g2v-tray-bag { flex: 0 1 auto; }
    .g2v-dock-kg .g2v-wtray { flex: 1 1 auto; cursor: default; }
    div.g2v-tray, div.g2v-tray-bag { cursor: default; }
    .g2v-wrow { display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-end; gap: 0.25rem 0.4rem; }
    .g2v-w { border: 0; background: none; padding: 0; cursor: pointer; touch-action: manipulation; display: block; }
    span.g2v-w { cursor: default; }
    .g2v-w svg { width: calc(var(--u) * var(--w)); height: calc(var(--u) * var(--h)); display: block; overflow: visible; }
    .g2v-w-away svg { visibility: hidden; }
    .g2v-tray-bag.g2v-tray-empty svg { visibility: hidden; }
    .g2v-hint-bag .g2v-tray-bag svg, .g2v-hint-w .g2v-w:not(.g2v-w-away) svg { animation: g3fHop 2.2s ease-in-out infinite; }
    .g2v-hint-w .g2v-w:nth-child(2) svg { animation-delay: .15s; } .g2v-hint-w .g2v-w:nth-child(3) svg { animation-delay: .3s; }
    .g2v-hint-w .g2v-w:nth-child(4) svg { animation-delay: .45s; } .g2v-hint-w .g2v-w:nth-child(5) svg { animation-delay: .6s; }
    .g2v-hint-bag .g2v-tray-bag, .g2v-hint-w .g2v-wtray { box-shadow: 0 0 0 3px #FDE68A; }
    .g2v-choices { gap: 0.25rem; }
      .g3f-theme-veg .g3f-scale-host { padding-top: 0; }
      .g3f-theme-veg .g3f-sign { display: none; }
    }
    /* Màn ngang thấp (điện thoại): ba câu đứng bên phải cân để cân được cao hết quầy. */
    @media (max-height: 500px) and (orientation: landscape) {
      .g2v-asking { flex-direction: row; align-items: stretch; }
      .g2v-asking .g2v-choices { width: 48%; justify-content: center; }
    }
    /* Màn dọc (và màn thấp ở trên): bỏ bảng hiệu nhường chỗ cho cân, khách đã nói việc cần làm. */
    @media (orientation: portrait) { .g3f-theme-veg .g3f-sign { display: none; } .g3f-theme-veg .g3f-scale-host { padding-top: 0; } }
  `;
  document.head.appendChild(st);
}

export function injectWaterStyles() {
  if (document.getElementById('g2w-styles')) return;
  const st = document.createElement('style');
  st.id = 'g2w-styles';
  st.textContent = `
    .g3f-theme-water .g3f-awning { background: repeating-linear-gradient(90deg, #60A5FA 0 36px, #FFF 36px 72px); border-bottom-color: #1D4ED8; }
    .g3f-theme-water .g3f-counter { background: linear-gradient(#F0F9FF, #DBEAFE); border-bottom-color: #2563EB; }
    .g3f-theme-water .g3f-sign { background: #2563EB; border-color: #1E3A8A; color: #fff; text-shadow: 0 1px 0 rgba(30,58,138,0.5); }
    .g3f-theme-water .g3f-sign strong { color: #FEF08A; }
    .g3f-theme-water .g3f-main::after { background: rgba(15,23,42,0.06); }
    .g2w-scene { flex: 1 1 0; min-height: 0; width: 100%; display: flex; padding-top: clamp(1.6rem, 5vh, 2.8rem); box-sizing: border-box; }
    .g2w-svg { width: 100%; height: 100%; display: block; overflow: visible; touch-action: none; user-select: none; -webkit-user-select: none; }
    .g2w-l { font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-weight: 400; }
    .g2w-acts { flex: none; width: 100%; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.45rem; }
    .g2w-acts[hidden] { display: none; }
    .g2w-acts .g2v-choices { flex: 1 1 100%; }
    .g2w-btn { padding: 0.5rem 0.95rem; border-radius: 0.9rem; background: #fff; color: #1E293B; border: 3px solid #93C5FD; box-shadow: 0 4px 0 #BFDBFE; font-size: clamp(1rem, 1.5vh + 0.6rem, 1.3rem); line-height: 1.15; touch-action: none; }
    .g2w-btn[hidden] { display: none; }
    .g2w-hold { background: #DBEAFE; border-color: #2563EB; }
    .g2w-full { background: #16A34A; color: #fff; border-color: #15803D; box-shadow: 0 4px 0 #166534; }
    .g2w-next { animation: g2wNext 1.3s ease-in-out infinite; }
    @keyframes g2wNext { 0%, 100% { box-shadow: 0 4px 0 #BFDBFE, 0 0 0 0 rgba(250,204,21,0.8); } 50% { box-shadow: 0 4px 0 #BFDBFE, 0 0 0 9px rgba(250,204,21,0); } }
    .g2w-hint { animation: g3eNudge 0.45s ease-in-out 3; }
    .g2w-wait { opacity: 0.55; }
    .g2w-ready { animation: g2wNext 1.1s ease-in-out infinite; background: #2563EB; color: #fff; border-color: #1E3A8A; }
    .g2w-tally { flex: 1 1 100%; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.25rem; min-height: 2rem; font-weight: 800; color: #1E3A8A; font-size: clamp(0.95rem, 1.3vh + 0.5rem, 1.2rem); }
    .g2w-cup { position: relative; display: inline-flex; align-items: flex-end; }
    .g2w-cup b { position: absolute; right: -3px; bottom: -4px; background: #2563EB; color: #fff; border-radius: 999px; font-size: 0.7rem; min-width: 1.1rem; text-align: center; line-height: 1.1rem; }
    .g2w-ca, .g2w-obj { cursor: pointer; }
    .g2w-tap { cursor: pointer; }
    .g2w-ca-ready .g2w-ca { animation: g2wBob 1.4s ease-in-out infinite; }
    @keyframes g2wBob { 50% { filter: drop-shadow(0 0 6px #FACC15); } }
    @media (prefers-reduced-motion: reduce) { .g2w-next, .g2w-ready { animation: none; box-shadow: 0 4px 0 #BFDBFE, 0 0 0 4px #FACC15; } }
    @media (orientation: portrait) { .g3f-theme-water .g3f-sign { display: none; } .g2w-scene { padding-top: 0; } }
    @media (orientation: landscape) and (max-height: 500px) { .g2w-btn { padding: 0.3rem 0.6rem; font-size: 0.95rem; } .g2w-scene { padding-top: 1.4rem; } }
  `;
  document.head.appendChild(st);
}

/** CSS của trò 🎂 Tiệc sinh nhật chia kẹo (lớp g2p-*). Khung quầy, máy tính, thẻ kết quả dùng chung với Chợ phiên lớp 3 (theme 'party'). */
export function injectPartyStyles() {
  if (document.getElementById('g2p-styles')) return;
  const st = document.createElement('style');
  st.id = 'g2p-styles';
  st.textContent = `
    .g3f-theme-party .g3f-awning { background: repeating-linear-gradient(90deg, #F472B6 0 36px, #FFF 36px 72px); border-bottom-color: #BE185D; }
    .g3f-theme-party .g3f-counter { background: linear-gradient(#FFF5FA, #FCE7F3); border-bottom-color: #DB2777; }
    .g3f-theme-party .g3f-sign { background: #DB2777; border-color: #831843; color: #fff; text-shadow: 0 1px 0 rgba(131,24,67,0.5); }
    .g3f-theme-party .g3f-sign strong { color: #FEF08A; }
    .g3f-theme-party .g3f-main::after { background: rgba(15,23,42,0.06); }
    /* Cấp gắn tên (không gõ số): bỏ máy tính tiền, bạn nhỏ đứng to cả cột. */
    .g2p-nopad .g3f-ask { display: none; }
    .g2p-nopad .g3f-npc { flex: 1 1 auto; }
    .g2p-nopad .g3f-npc img { max-height: 420px; }

    .g2p-bench { flex: 1 1 0; min-height: 0; width: 100%; display: flex; flex-direction: column; gap: 0.45rem; padding-top: clamp(2.6rem, 8vh, 4rem); box-sizing: border-box; }
    .g2p-board { flex: none; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.2rem 0.5rem; font: 800 clamp(1rem, min(2.2vh + 0.6rem, 5.6vw), 1.8rem) 'Baloo 2', Quicksand, sans-serif; color: #831843; line-height: 1.2; min-height: 1.5em; } /* giữ chỗ sẵn: phép tính hiện ra không đẩy đĩa, túi */
    .g2p-board[hidden], .g2p-stage[hidden], .g2p-src[hidden] { display: none; }
    .g2p-sum { background: #fff; border-radius: 0.8rem; padding: 0.05em 0.6em; box-shadow: 0 3px 0 #FBCFE8; animation: g2pPop .3s cubic-bezier(.2,1.5,.4,1); }
    .g2p-eq { color: #1E293B; background: #FEF9C3; border-radius: 0.8rem; padding: 0.05em 0.6em; box-shadow: 0 3px 0 #FDE68A; animation: g2pPop .3s cubic-bezier(.2,1.5,.4,1); }
    .g2p-eq .g3f-q { font-size: 0.8em; height: 1.4em; min-width: 1.6em; }
    .g2p-note { font-size: 0.72em; color: #9D174D; }
    .g2p-ans { color: #16A34A; }
    .g2p-typed { color: #EA580C; }
    @keyframes g2pPop { from { opacity: 0; transform: scale(.7); } to { opacity: 1; transform: none; } }

    .g2p-stage { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.7fr); grid-template-rows: minmax(0, 1fr); gap: 10px; } /* = G trong fit() của party.js */
    .g2p-stage.g2p-nosrc { grid-template-columns: minmax(0, 1fr); }
    .g2p-src { min-width: 0; min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.25rem; }
    .g2p-bowl { line-height: 0; }
    .g2p-bowl svg, .g2p-h svg { display: block; }
    .g2p-src-cap { font-weight: 800; color: #9D174D; font-size: clamp(0.9rem, 1.3vh + 0.5rem, 1.2rem); line-height: 1.2; }
    .g2p-dst { min-width: 0; min-height: 0; overflow: hidden; display: flex; flex-wrap: wrap; align-content: center; justify-content: center; gap: 8px; }
    .g2p-h { position: relative; display: flex; flex-direction: column; align-items: center; padding: 0; border: 0; background: none; border-radius: 0.7rem; font: inherit; color: inherit; touch-action: manipulation; }
    button.g2p-h { cursor: pointer; }
    button.g2p-h:disabled { cursor: default; }
    button.g2p-h:not(:disabled):active { transform: scale(0.95); }
    .g2p-next { animation: g2pBob 1.3s ease-in-out infinite; }
    .g2p-next svg { filter: drop-shadow(0 0 5px #FACC15); }
    @keyframes g2pBob { 0%, 100% { transform: none; } 50% { transform: translateY(-5px); } }
    .g2p-h-tag { min-height: 24px; margin-top: 2px; visibility: hidden; }
    .g2p-h-tag:not(:empty) { visibility: visible; background: #DB2777; color: #fff; border-radius: 999px; padding: 0 0.55em; font-weight: 800; font-size: clamp(0.85rem, 1.2vh + 0.5rem, 1.15rem); line-height: 24px; box-shadow: 0 2px 0 #9D174D; animation: g2pPop .3s cubic-bezier(.2,1.5,.4,1); }
    .g2p-ghost svg { opacity: .45; }
    .g2p-ghost-q { position: absolute; left: 50%; top: 42%; transform: translate(-50%, -50%); display: grid; place-items: center; width: 2em; height: 2em; border-radius: 50%; background: #FB923C; color: #fff; font-weight: 800; font-size: clamp(1rem, 2vh + 0.5rem, 1.6rem); box-shadow: 0 3px 0 #C2410C; }
    .g2p-kid { transform-box: fill-box; transform-origin: 50% 100%; }
    .g2p-kid-happy { animation: g2pHop .5s ease 2; }
    .g2p-kid-sad { animation: g2pShake .5s ease 2; }
    @keyframes g2pHop { 50% { transform: translateY(-6px); } }
    @keyframes g2pShake { 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }

    .g2p-acts { flex: none; min-height: clamp(2.8rem, 5vh + 1.4rem, 4.2rem); display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.5rem; }
    .g2p-act { flex: none; border: 4px solid #fff; border-radius: 999px; padding: 0.35em 1.3em; background: linear-gradient(180deg, #4ADE80, #16A34A); color: #fff; font: 800 clamp(1.1rem, 2.2vh + 0.6rem, 1.7rem) 'Baloo 2', Quicksand, sans-serif; line-height: 1.15; text-shadow: 0 2px 0 rgba(21,128,61,.5); box-shadow: 0 5px 0 #15803D, 0 8px 18px rgba(21,128,61,.3); cursor: pointer; touch-action: manipulation; }
    .g2p-act.g2p-wait { opacity: .55; }
    .g2p-act.g2p-ready { opacity: 1; animation: g2pBob 1.2s ease-in-out infinite; }
    .g2p-act:disabled { opacity: .35; animation: none; cursor: default; }
    .g2p-act:not(:disabled):active { transform: translateY(3px); box-shadow: 0 2px 0 #15803D; }
    .g2p-hint { animation: g2pNudge .6s ease; }
    @keyframes g2pNudge { 0%, 100% { transform: none; } 20% { transform: translateX(-7px); } 40% { transform: translateX(7px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }

    .g2p-cards { display: flex; gap: 0.8rem; justify-content: center; animation: g2pPop .35s cubic-bezier(.2,1.4,.4,1); }
    .g2p-card { min-width: 5.5em; border: 4px solid #F9A8D4; border-radius: 1rem; background: #fff; color: #1E293B; padding: 0.2em 0.7em; font: 800 clamp(1.4rem, 3vh + 0.6rem, 2.2rem) 'Baloo 2', Quicksand, sans-serif; box-shadow: 0 5px 0 #F9A8D4; cursor: pointer; touch-action: manipulation; }
    .g2p-card:active { transform: translateY(3px); box-shadow: 0 2px 0 #F9A8D4; }
    .g2p-locked .g2p-card { pointer-events: none; }
    .g2p-locked .g2p-card:not(.g2p-right):not(.g2p-wrong) { opacity: .5; }
    .g2p-card.g2p-right { border-color: #16A34A; background: #DCFCE7; box-shadow: 0 5px 0 #16A34A; }
    .g2p-card.g2p-wrong { border-color: #DC2626; background: #FEE2E2; box-shadow: 0 5px 0 #DC2626; }

    /* Bảng tiệc: số to, ô tên bên dưới mỗi số. */
    .g2p-board-big { flex: 1 1 0; min-height: 0; font-size: clamp(1.4rem, min(7vh, 8vw) + 0.4rem, 4.6rem); gap: 0.3rem 0.6rem; }
    .g2p-tok { display: inline-flex; flex-direction: column; align-items: center; gap: 0.3rem; }
    .g2p-num { min-width: 1.8em; padding: 0.05em 0.35em; background: #fff; border: 3px solid #F9A8D4; border-radius: 0.7rem; text-align: center; color: #1E293B; box-shadow: 0 3px 0 #FBCFE8; }
    .g2p-num .g3f-q { font-size: 0.8em; }
    .g2p-op { color: #9D174D; }
    .g2p-lab { min-width: 6em; min-height: 2.1em; padding: 0.1em 0.4em; border: 3px dashed #F472B6; border-radius: 0.7rem; background: #FFFFFFAA; color: #1E293B; font: 800 0.42em Quicksand, sans-serif; display: grid; place-items: center; cursor: pointer; touch-action: manipulation; }
    .g2p-board:not(.g2p-board-big) .g2p-lab { font-size: 0.55em; min-width: 5.4em; }
    .g2p-lab-on { border-style: solid; border-color: #DB2777; box-shadow: 0 0 0 4px #FBCFE8; animation: g2pBob 1.3s ease-in-out infinite; }
    .g2p-lab-full { border-style: solid; border-color: #D97706; background: #FEF3C7; }
    .g2p-lab-fixed { border-style: solid; border-color: #FBCFE8; background: #FDF2F8; cursor: default; }
    .g2p-lab-right { border-color: #16A34A; background: #DCFCE7; }
    .g2p-lab-wrong { border-color: #DC2626; background: #FEE2E2; }
    .g2p-lab s { color: #DC2626; }
    .g2p-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; }
    .g2p-chip { border: 3px solid #D97706; border-radius: 0.8rem; background: #FDE68A; color: #78350F; padding: 0.3em 0.8em; font: 800 clamp(1rem, 1.8vh + 0.5rem, 1.45rem) Quicksand, sans-serif; box-shadow: 0 4px 0 #D97706; cursor: pointer; touch-action: manipulation; white-space: nowrap; }
    .g2p-chip:active { transform: translateY(3px); box-shadow: 0 1px 0 #D97706; }
    .g2p-chip-used { visibility: hidden; }
    .g2p-chip-fly { display: grid; place-items: center; width: 100%; height: 100%; box-sizing: border-box; padding: 0; }
    .g2p-how-count { font: 800 1.1rem 'Baloo 2', Quicksand, sans-serif; color: #DB2777; white-space: nowrap; }
    .g3g-has-result .g2p-acts { visibility: hidden; }

    @media (prefers-reduced-motion: reduce) {
      .g2p-next, .g2p-act.g2p-ready, .g2p-lab-on { animation-duration: 2.6s; }
    }
    @media (max-height: 500px) {
      .g2p-bench { padding-top: 0.2rem; gap: 0.3rem; }
      .g3f-theme-party .g3f-sign { display: none; } /* màn thấp: nhường chỗ cho các bạn, lời bạn nhỏ đã nói việc cần làm */
      .g2p-act { font-size: 1rem; padding: 0.2em 1em; border-width: 3px; }
      .g2p-card { font-size: 1.2rem; }
      .g2p-chip { font-size: 0.95rem; padding: 0.2em 0.6em; }
    }
    /* Màn dọc: đĩa to trên, các bạn / đĩa / túi dưới; bỏ bảng hiệu nhường chỗ. */
    @media (orientation: portrait) {
      .g2p-bench { padding-top: 0.2rem; }
      .g2p-stage { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 0.75fr) minmax(0, 1.5fr); }
      .g2p-stage.g2p-nosrc { grid-template-rows: minmax(0, 1fr); }
      .g3f-theme-party .g3f-sign { display: none; }
    }
  `;
  document.head.appendChild(st);
}
