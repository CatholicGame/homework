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

/** CSS của trò ⏰ Đồng hồ hẹn giờ & Tờ lịch (lớp g2c-*). */
export function injectClockStyles() {
  if (document.getElementById('g2c-styles')) return;
  const st = document.createElement('style');
  st.id = 'g2c-styles';
  st.textContent = `
    .g3f-theme-clock .g3f-awning { background: repeating-linear-gradient(90deg, #2DD4BF 0 36px, #FFF 36px 72px); border-bottom-color: #0F766E; }
    .g3f-theme-clock .g3f-counter { background: linear-gradient(#F0FDFA, #CCFBF1); border-bottom-color: #0D9488; }
    .g3f-theme-clock .g3f-sign { background: #0D9488; border-color: #134E4A; color: #fff; text-shadow: 0 1px 0 rgba(19,78,74,0.5); }
    .g3f-theme-clock .g3f-sign strong { color: #FEF08A; }
    .g3f-theme-clock .g3f-main::after { background: rgba(15,23,42,0.06); }
    /* Lượt không gõ số: bỏ máy tính tiền, người nhà đứng to cả cột. */
    .g2c-nopad .g3f-ask { display: none; }
    .g2c-nopad .g3f-npc { flex: 1 1 auto; }
    .g2c-nopad .g3f-npc img { max-height: 420px; }

    .g2c-bench { flex: 1 1 0; min-height: 0; width: 100%; display: flex; flex-direction: column; gap: 0.45rem; padding-top: clamp(2.6rem, 8vh, 4rem); box-sizing: border-box; }
    .g2c-board { flex: none; display: flex; justify-content: center; font: 800 clamp(1rem, min(2.2vh + 0.6rem, 5.6vw), 1.7rem) 'Baloo 2', Quicksand, sans-serif; color: #134E4A; line-height: 1.2; }
    .g2c-board[hidden] { display: none; }
    .g2c-say { background: #fff; border-radius: 0.8rem; padding: 0.05em 0.7em; box-shadow: 0 3px 0 #99F6E4; animation: g2cPop .3s cubic-bezier(.2,1.5,.4,1); }
    .g2c-say .g3f-q { font-size: 0.8em; }
    .g2c-ans { color: #16A34A; }
    @keyframes g2cPop { from { opacity: 0; transform: scale(.7); } to { opacity: 1; transform: none; } }

    .g2c-stage { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); gap: 0.6rem; align-items: center; }
    .g2c-stage-cal { display: block; container-type: size; }
    .g2c-clock { min-width: 0; min-height: 0; height: 100%; display: flex; justify-content: center; align-items: center; }
    .g2c-clock-svg { width: 100%; height: 100%; display: block; overflow: visible; user-select: none; -webkit-user-select: none; }
    .g2c-grabbable { touch-action: none; cursor: grab; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; -webkit-tap-highlight-color: transparent; }
    .g2c-dragging .g2c-grabbable { cursor: grabbing; }
    .g2c-hand-on line:nth-child(2) { filter: drop-shadow(0 0 4px #FACC15); }
    .g2c-hand-hint line:nth-child(2) { animation: g2cGlow 1.1s ease-in-out 4; }
    @keyframes g2cGlow { 50% { stroke: #FACC15; } }
    .g2c-ghost { opacity: 0; transition: opacity .4s; pointer-events: none; }
    .g2c-ghost-on { opacity: 1; }
    .g2c-ringer { transform-box: fill-box; transform-origin: 50% 60%; }
    .g2c-ringing .g2c-ringer { animation: g2cRing .11s linear 12; }
    @keyframes g2cRing { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
    .g2c-side { min-width: 0; min-height: 0; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.6rem; }
    .g2c-win { flex: 0 1 auto; min-height: 0; width: 100%; max-height: 62%; display: flex; justify-content: center; }
    .g2c-window { width: 100%; height: 100%; display: block; }
    .g2c-sky { opacity: 0; transition: opacity .9s ease; }
    .g2c-window[data-period="sang"] .g2c-sky-sang, .g2c-window[data-period="trua"] .g2c-sky-trua,
    .g2c-window[data-period="chieu"] .g2c-sky-chieu, .g2c-window[data-period="toi"] .g2c-sky-toi { opacity: 1; }
    .g2c-sky-none { transition: opacity .6s ease; }
    .g2c-window:not([data-period=""]) .g2c-sky-none, .g2c-window[data-period=""] .g2c-mullion { opacity: 0; }
    .g2c-dig { flex: none; }
    .g2c-digital { display: inline-flex; padding: 0.3em; border: 3px solid #3F3A40; border-radius: 0.8rem; background: #2DD4BF; box-shadow: 0 4px 0 #0F766E; }
    .g2c-digital-screen { display: inline-flex; align-items: center; gap: 0.1em; padding: 0.05em 0.5em; border: 2px solid #3F3A40; border-radius: 0.45rem; background: #E6FBF4; color: #134E4A; font: 800 clamp(1.4rem, min(4.5vh, 5vw) + 0.4rem, 3rem) 'Baloo 2', Quicksand, sans-serif; letter-spacing: 0.04em; line-height: 1.15; white-space: nowrap; }
    .g2c-digital-screen .g3f-q { font-size: 0.75em; }
    .g2c-digital-ok .g2c-digital-screen { background: #DCFCE7; color: #15803D; }
    .g2c-digital-bad .g2c-digital-screen { background: #FEE2E2; color: #B91C1C; }
    .g2c-digital-mini { padding: 1px; border-width: 2px; box-shadow: none; }
    .g2c-digital-mini .g2c-digital-screen { font-size: 0.8rem; padding: 0 0.3em; border-width: 1.5px; }
    .g2c-how-digital { font: 800 1rem 'Baloo 2', Quicksand, sans-serif; color: #134E4A; background: #E6FBF4; border: 2px solid #3F3A40; border-radius: 0.4rem; padding: 0 0.3em; white-space: nowrap; }

    .g2c-acts { flex: none; min-height: clamp(2.8rem, 5vh + 1.4rem, 4.2rem); display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.5rem; }
    .g2c-acts:empty { display: none; } /* lượt gõ số: không có nút, nhường chỗ cho đồng hồ, tờ lịch */
    .g2c-act { flex: none; border: 4px solid #fff; border-radius: 999px; padding: 0.35em 1.3em; background: linear-gradient(180deg, #4ADE80, #16A34A); color: #fff; font: 800 clamp(1.1rem, 2.2vh + 0.6rem, 1.7rem) 'Baloo 2', Quicksand, sans-serif; line-height: 1.15; text-shadow: 0 2px 0 rgba(21,128,61,.5); box-shadow: 0 5px 0 #15803D, 0 8px 18px rgba(21,128,61,.3); cursor: pointer; touch-action: manipulation; }
    .g2c-act:disabled { opacity: .35; cursor: default; }
    .g2c-act:not(:disabled):active { transform: translateY(3px); box-shadow: 0 2px 0 #15803D; }
    .g2c-hint { animation: g2cNudge .6s ease; }
    @keyframes g2cNudge { 0%, 100% { transform: none; } 20% { transform: translateX(-7px); } 40% { transform: translateX(7px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
    .g2c-cards { display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center; animation: g2cPop .35s cubic-bezier(.2,1.4,.4,1); }
    .g2c-card { display: inline-flex; align-items: center; gap: 0.3em; border: 4px solid #5EEAD4; border-radius: 1rem; background: #fff; color: #1E293B; padding: 0.15em 0.7em; font: 800 clamp(1.1rem, 2.4vh + 0.5rem, 1.8rem) 'Baloo 2', Quicksand, sans-serif; box-shadow: 0 5px 0 #5EEAD4; cursor: pointer; touch-action: manipulation; white-space: nowrap; }
    .g2c-card:active { transform: translateY(3px); box-shadow: 0 2px 0 #5EEAD4; }
    .g2c-locked .g2c-card { pointer-events: none; }
    .g2c-locked .g2c-card:not(.g2c-right):not(.g2c-wrong) { opacity: .5; }
    .g2c-card.g2c-right { border-color: #16A34A; background: #DCFCE7; box-shadow: 0 5px 0 #16A34A; }
    .g2c-card.g2c-wrong { border-color: #DC2626; background: #FEE2E2; box-shadow: 0 5px 0 #DC2626; }

    /* Tờ lịch treo tường: to vừa khung (container query theo khung chơi). */
    .g2c-cal { position: relative; margin: 0.7em auto 0; width: min(100cqw, (100cqh - 0.7em) * 1.3); height: min(100cqh - 0.7em, 100cqw / 1.05); display: flex; flex-direction: column; background: #fff; border: 3px solid #3F3A40; border-radius: 1rem; box-shadow: 0 5px 0 rgba(15,23,42,.15); box-sizing: border-box; container-type: size; transform-origin: 50% 0; }
    .g2c-flip-up { animation: g2cFlip .5s ease-out; }
    .g2c-flip-down { animation: g2cFlip .5s ease-out reverse; }
    @keyframes g2cFlip { from { transform: perspective(900px) rotateX(-80deg); opacity: .3; } to { transform: none; opacity: 1; } }
    .g2c-cal-rings { position: absolute; top: -0.7em; left: 0; right: 0; display: flex; justify-content: space-around; pointer-events: none; z-index: 1; }
    .g2c-cal-rings i { width: 0.7em; height: 1.4em; border-radius: 0.35em; background: #94A3B8; border: 2px solid #3F3A40; }
    .g2c-cal-top { flex: 0 0 14%; display: flex; align-items: center; justify-content: center; gap: 0.6em; background: #E5484D; color: #fff; border-radius: 0.8rem 0.8rem 0 0; border-bottom: 3px solid #3F3A40; }
    .g2c-cal-title { font: 800 min(7cqh, 6cqw) 'Baloo 2', Quicksand, sans-serif; letter-spacing: 0.04em; display: flex; align-items: baseline; gap: 0.4em; }
    .g2c-cal-title small { font-size: 0.55em; opacity: .85; }
    .g2c-nav { border: 3px solid #fff; border-radius: 50%; width: 1.6em; height: 1.6em; display: grid; place-items: center; background: #FACC15; color: #78350F; font: 800 min(6cqh, 5cqw) 'Baloo 2', sans-serif; line-height: 1; box-shadow: 0 3px 0 #A16207; cursor: pointer; touch-action: manipulation; }
    .g2c-nav:disabled { opacity: .3; }
    .g2c-cal-grid { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); grid-template-rows: 1.1fr repeat(var(--rows), 1fr); gap: 2px; padding: 4px; }
    .g2c-wd { border: 0; border-radius: 0.4rem; background: #F1F5F9; color: #334155; font: 800 min(3.1cqh, 2.7cqw) Quicksand, sans-serif; line-height: 1.05; padding: 0; cursor: pointer; touch-action: manipulation; }
    .g2c-wd.g2c-sun, .g2c-day.g2c-sun .g2c-num { color: #DC2626; }
    .g2c-wd-on { background: #FEF08A; box-shadow: inset 0 0 0 3px #CA8A04; }
    .g2c-day { position: relative; border: 0; border-radius: 0.4rem; background: #fff; color: #1E293B; font: 800 min(6cqh, 5cqw) 'Baloo 2', Quicksand, sans-serif; display: grid; place-items: center; padding: 0; cursor: pointer; touch-action: manipulation; box-shadow: inset 0 0 0 1px #E2E8F0; }
    .g2c-day.g2c-blank { background: none; box-shadow: none; cursor: default; }
    .g2c-today { background: #DBEAFE; box-shadow: inset 0 0 0 2px #3B82F6; }
    .g2c-tag { position: absolute; left: 50%; bottom: 1px; transform: translateX(-50%); font: 800 min(2.2cqh, 1.9cqw) Quicksand, sans-serif; font-style: normal; color: #1D4ED8; white-space: nowrap; }
    .g2c-cake { position: absolute; right: 1px; top: 0; font-size: 0.5em; font-style: normal; }
    .g2c-circle::after { content: ''; position: absolute; inset: 6% 12%; border: 3px solid #E5484D; border-radius: 50%; animation: g2cPop .25s ease-out; pointer-events: none; }
    .g2c-step { background: #FEF9C3; }
    .g2c-ok { background: #DCFCE7 !important; box-shadow: inset 0 0 0 3px #16A34A !important; }
    .g2c-want { background: #DCFCE7; box-shadow: inset 0 0 0 3px #16A34A; outline: 3px dashed #16A34A; outline-offset: -7px; }
    .g2c-no { background: #FEE2E2; box-shadow: inset 0 0 0 3px #DC2626; }
    .g2c-count { position: absolute; left: 2px; top: 0; font: 800 0.45em 'Baloo 2', sans-serif; color: #fff; background: #F59E0B; border-radius: 999px; min-width: 1.3em; line-height: 1.3em; text-align: center; animation: g2cPop .25s ease-out; }
    .g3g-has-result .g2c-acts { visibility: hidden; }

    @media (prefers-reduced-motion: reduce) {
      .g2c-hand-hint line:nth-child(2) { animation-duration: 2.2s; }
      .g2c-ringing .g2c-ringer { animation-duration: .22s; animation-iteration-count: 6; }
    }
    @media (max-height: 500px) {
      .g2c-bench { padding-top: 0.2rem; gap: 0.3rem; }
      .g3f-theme-clock .g3f-sign { display: none; }
      .g2c-act { font-size: 1rem; padding: 0.2em 1em; border-width: 3px; }
      .g2c-card { font-size: 1rem; }
    }
    /* Màn dọc: cửa sổ + đồng hồ điện tử thành một hàng trên, đồng hồ kim to bên dưới. */
    @media (orientation: portrait) {
      .g2c-bench { padding-top: 0.2rem; }
      .g3f-theme-clock .g3f-sign { display: none; }
      .g2c-stage:not(.g2c-stage-cal) { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 0.42fr) minmax(0, 1fr); }
      .g2c-side { grid-row: 1; flex-direction: row; }
      .g2c-clock { grid-row: 2; }
      .g2c-win { max-height: 100%; height: 100%; width: auto; flex: 1 1 0; }
    }
  `;
  document.head.appendChild(st);
}

/** CSS của trò 🐜 Chú kiến tìm đường (lớp g2a-*). */
export function injectAntStyles() {
  if (document.getElementById('g2a-styles')) return;
  const st = document.createElement('style');
  st.id = 'g2a-styles';
  st.textContent = `
    .g3f-theme-ant .g3f-awning { background: repeating-linear-gradient(90deg, #F2A93B 0 36px, #FFF7E6 36px 72px); border-bottom-color: #B45309; }
    .g3f-theme-ant .g3f-counter { background: linear-gradient(#FFFBEB, #FDECC8); border-bottom-color: #B7793F; }
    .g3f-theme-ant .g3f-sign { background: #B7793F; border-color: #78350F; color: #fff; text-shadow: 0 1px 0 rgba(120,53,15,0.5); }
    .g3f-theme-ant .g3f-sign strong { color: #FEF08A; }
    .g3f-theme-ant .g3f-main::after { background: rgba(15,23,42,0.06); }
    .g2a-nopad .g3f-ask { display: none; }
    .g2a-nopad .g3f-npc { flex: 1 1 auto; }
    .g2a-nopad .g3f-npc img { max-height: 420px; }

    .g2a-bench { flex: 1 1 0; min-height: 0; width: 100%; display: flex; flex-direction: column; gap: 0.4rem; padding-top: clamp(2.6rem, 8vh, 4rem); box-sizing: border-box; }
    .g2a-board { flex: none; display: flex; justify-content: center; font: 800 clamp(1rem, min(2.2vh + 0.5rem, 5vw), 1.6rem) 'Baloo 2', Quicksand, sans-serif; color: #78350F; line-height: 1.2; text-align: center; }
    .g2a-board[hidden] { display: none; }
    .g2a-say { background: #fff; border-radius: 0.8rem; padding: 0.05em 0.7em; box-shadow: 0 3px 0 #F5D08A; animation: g2aPopIn .3s cubic-bezier(.2,1.5,.4,1); }
    .g2a-ans { color: #16A34A; }
    .g2a-race { display: inline-block; white-space: nowrap; margin: 0 0.5em; }
    .g2a-stage { flex: 1 1 0; min-height: 0; display: flex; }
    .g2a-svg { width: 100%; height: 100%; display: block; overflow: visible; user-select: none; -webkit-user-select: none; touch-action: manipulation; }
    .g2a-svg.g2a-drawable { touch-action: none; cursor: crosshair; }
    [data-g], [data-p], [data-r], [data-s], .g2a-ruler, [data-twig] { cursor: pointer; }

    .g2a-ant-in, .g2a-pencil-in, .g2a-ruler-in { transform-box: fill-box; transform-origin: 50% 50%; }
    .g2a-leg-a, .g2a-leg-b { transform-box: fill-box; transform-origin: 50% 0%; }
    .g2a-walking .g2a-leg-a { animation: g2aLeg .2s ease-in-out infinite alternate; }
    .g2a-walking .g2a-leg-b { animation: g2aLeg .2s ease-in-out infinite alternate-reverse; }
    @keyframes g2aLeg { from { transform: rotate(-16deg); } to { transform: rotate(16deg); } }
    .g2a-pop-in .g2a-ant-in { animation: g2aPopIn .35s cubic-bezier(.2,1.5,.4,1); }
    .g2a-into-nest .g2a-ant-in { animation: g2aNest .6s ease-in forwards; }
    @keyframes g2aNest { to { transform: scale(.35); opacity: 0; } }
    .g2a-pop { transform-box: fill-box; transform-origin: 50% 50%; animation: g2aPopIn .3s cubic-bezier(.2,1.5,.4,1) both; }
    @keyframes g2aPopIn { from { opacity: 0; transform: scale(.5); } to { opacity: 1; transform: none; } }
    .g2a-hint { animation: g2aNudge .6s ease; }
    @keyframes g2aNudge { 0%, 100% { transform: none; } 20% { transform: translateX(-7px); } 40% { transform: translateX(7px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
    .g2a-ruler-in.g2a-hint, .g2a-pencil-in.g2a-hint { animation: g2aGlow 1s ease-in-out 3; }
    @keyframes g2aGlow { 50% { filter: drop-shadow(0 0 6px #FACC15) drop-shadow(0 0 3px #F59E0B); transform: scale(1.04); } }

    /* Hạt đường, đường, sỏi: chọn = viền vàng; kết quả xanh / đỏ / nét đứt xanh (chỗ đúng). */
    .g2a-grain-ring { fill: #FDE68A; stroke: #F59E0B; stroke-width: 4; opacity: 0; transition: opacity .15s; }
    .g2a-picked .g2a-grain-ring { opacity: 1; }
    .g2a-grain.g2a-ok .g2a-grain-ring { opacity: 1; fill: #BBF7D0; stroke: #16A34A; }
    .g2a-grain.g2a-want .g2a-grain-ring { opacity: 1; fill: none; stroke: #16A34A; stroke-dasharray: 6 5; }
    .g2a-thread { stroke-dasharray: 1; stroke-dashoffset: 1; animation: g2aDraw .7s ease-out forwards; }
    @keyframes g2aDraw { to { stroke-dashoffset: 0; } }
    .g2a-path.g2a-picked .g2a-path-line { stroke: #F59E0B; stroke-width: 8; }
    .g2a-path.g2a-ok .g2a-path-line { stroke: #16A34A; stroke-width: 8; }
    .g2a-path.g2a-no .g2a-path-line { stroke: #DC2626; stroke-width: 8; }
    .g2a-path.g2a-want .g2a-path-line { stroke: #16A34A; stroke-width: 8; stroke-dasharray: 14 9; }
    .g2a-route-glow { opacity: 0; transition: opacity .15s; }
    .g2a-route.g2a-picked .g2a-route-glow { opacity: .9; }
    .g2a-route.g2a-ok .g2a-route-glow { opacity: .9; stroke: #86EFAC; }
    .g2a-route.g2a-no .g2a-route-glow { opacity: .9; stroke: #FCA5A5; }
    .g2a-check { opacity: 0; fill: #B45309; font-weight: 800; pointer-events: none; }
    .g2a-stone.g2a-picked polygon, .g2a-stone.g2a-picked ellipse { stroke: #F59E0B; stroke-width: 7; }
    .g2a-stone.g2a-picked .g2a-check { opacity: 1; }
    .g2a-stone.g2a-ok polygon { fill: #BBF7D0; stroke: #16A34A; stroke-width: 7; }
    .g2a-stone.g2a-want polygon { stroke: #16A34A; stroke-width: 6; stroke-dasharray: 10 7; }
    .g2a-stone.g2a-no polygon, .g2a-stone.g2a-no ellipse { fill: #FECACA; stroke: #DC2626; stroke-width: 6; }
    .g2a-stone.g2a-ok .g2a-check { opacity: 1; fill: #15803D; }
    .g2a-stone.g2a-no .g2a-check { opacity: 0; }
    .g2a-ripple { animation: g2aRipple 3.2s ease-in-out infinite alternate; }
    @keyframes g2aRipple { from { opacity: .3; } to { opacity: 1; } }

    .g2a-acts { flex: none; min-height: clamp(2.8rem, 5vh + 1.4rem, 4.2rem); display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.5rem; }
    .g2a-acts:empty { display: none; }
    .g2a-act { flex: none; border: 4px solid #fff; border-radius: 999px; padding: 0.35em 1.3em; background: linear-gradient(180deg, #4ADE80, #16A34A); color: #fff; font: 800 clamp(1.1rem, 2.2vh + 0.6rem, 1.7rem) 'Baloo 2', Quicksand, sans-serif; line-height: 1.15; text-shadow: 0 2px 0 rgba(21,128,61,.5); box-shadow: 0 5px 0 #15803D, 0 8px 18px rgba(21,128,61,.3); cursor: pointer; touch-action: manipulation; }
    .g2a-act:disabled { opacity: .35; cursor: default; }
    .g2a-act:not(:disabled):active { transform: translateY(3px); box-shadow: 0 2px 0 #15803D; }
    .g3g-has-result .g2a-acts { visibility: hidden; }

    @media (prefers-reduced-motion: reduce) {
      .g2a-walking .g2a-leg-a, .g2a-walking .g2a-leg-b { animation-duration: .4s; }
      .g2a-ripple { animation: none; }
    }
    @media (max-height: 500px) {
      .g2a-bench { padding-top: 0.2rem; gap: 0.3rem; }
      .g3f-theme-ant .g3f-sign { display: none; }
      .g2a-act { font-size: 1rem; padding: 0.2em 1em; border-width: 3px; }
    }
    @media (orientation: portrait) {
      .g2a-bench { padding-top: 0.2rem; }
      .g3f-theme-ant .g3f-sign { display: none; }
    }
  `;
  document.head.appendChild(st);
}

/** CSS của trò 🏭 Xưởng đóng gói trăm – chục (lớp g2x-*). Cỡ ô vuông --c do factory.js tính: khối 1 ô, thanh 1 × 10, tấm 10 × 10. */
export function injectFactoryStyles() {
  if (document.getElementById('g2x-styles')) return;
  const st = document.createElement('style');
  st.id = 'g2x-styles';
  st.textContent = `
    .g3f-theme-factory .g3f-awning { background: repeating-linear-gradient(90deg, #FB923C 0 36px, #FFF 36px 72px); border-bottom-color: #C2410C; }
    .g3f-theme-factory .g3f-counter { background: linear-gradient(#FFFBF5, #FFEDD5); border-bottom-color: #C2410C; }
    .g3f-theme-factory .g3f-sign { background: #EA580C; border-color: #7C2D12; color: #fff; text-shadow: 0 1px 0 rgba(124,45,18,0.5); }
    .g3f-theme-factory .g3f-sign strong { color: #FEF08A; }
    .g3f-theme-factory .g3f-main::after { background: rgba(15,23,42,0.06); }

    .g2x-bench { --c: 10px; flex: 1 1 0; min-height: 0; width: 100%; display: flex; flex-direction: column; gap: 0.5rem; padding-top: clamp(2.6rem, 8vh, 4rem); box-sizing: border-box; }
    .g2x-order { flex: none; align-self: flex-start; background: #fff; border: 3px solid #FDBA74; border-radius: 0.8rem; padding: 0.1em 0.7em; font: 800 clamp(1rem, 2vh + 0.55rem, 1.7rem) 'Baloo 2', Quicksand, sans-serif; color: #7C2D12; box-shadow: 0 3px 0 #FED7AA; }
    .g2x-order:empty { display: none; }
    .g2x-order b { color: #1E293B; }
    .g2x-order .g3f-q { font-size: 0.85em; }
    .g2x-order-ic { font-size: 1.1em; }
    .g2x-ans { color: #16A34A; } .g2x-order .g2x-typed { color: #DC2626; }
    .g2x-area { flex: 1 1 0; min-height: 0; min-width: 0; display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 14px; }
    .g2x-area.g2x-dir-col { flex-direction: column; }
    .g2x-acts { flex: none; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.5rem 0.8rem; min-height: 3rem; }
    .g2x-acts[hidden] { display: none; }
    .g2x-btn { font-size: clamp(1rem, 1.6vh + 0.55rem, 1.35rem); padding: 0.45rem 0.9rem; border-radius: 0.9rem; line-height: 1.15; }
    .g2x-go { background: #F97316; color: #fff; box-shadow: 0 4px 0 #C2410C; }
    .g2x-done { background: #16A34A; color: #fff; box-shadow: 0 4px 0 #166534; }
    .g2x-wait { background: #CBD5E1; box-shadow: 0 4px 0 #94A3B8; text-shadow: none; }
    .g2x-ready { animation: g3mReady 1.1s ease-in-out infinite; }
    .g2x-btn:disabled { opacity: 0.5; }
    .g2x-hint { animation: g2xHint .6s ease-in-out 2; }
    @keyframes g2xHint { 0%, 100% { transform: none; } 25% { transform: translateY(-6px) scale(1.03); } 75% { transform: translateY(2px); } }

    /* Miếng hàng: khối 1 ô, thanh 1 × 10 ô, tấm 10 × 10 ô */
    .g2x-p { display: block; flex: none; }
    .g2x-u { width: var(--c); height: var(--c); }
    .g2x-t { width: var(--c); height: calc(var(--c) * 10); }
    .g2x-h { width: calc(var(--c) * 10); height: calc(var(--c) * 10); }
    .g2x-hide { visibility: hidden; }
    .g2x-pop { animation: g3eDrop .3s cubic-bezier(.3,1.5,.5,1) both; }
    .g2x-counted { filter: drop-shadow(0 0 3px #F59E0B) brightness(1.08); }
    .g2x-ghost { opacity: 0.28; filter: grayscale(1); }
    .g2x-how { display: inline-flex; }
    .g2x-how .g2x-h { width: 44px; height: 44px; } .g2x-how .g2x-t { width: 6px; height: 44px; } .g2x-how .g2x-u { width: 16px; height: 16px; }

    .g2x-trayhost { flex: none; min-width: 0; }
    .g2x-tray { display: flex; flex-direction: column; align-items: stretch; gap: 4px; background: #fff; border: 3px solid #EA580C; border-radius: 0.9rem; padding: 6px; box-shadow: 0 4px 0 rgba(124,45,18,0.18); }
    .g2x-tray-name { align-self: center; text-align: center; font: 800 clamp(0.95rem, 1.6vh + 0.5rem, 1.35rem) 'Baloo 2', Quicksand, sans-serif; color: #7C2D12; white-space: nowrap; }
    .g2x-tray-name b { color: #EA580C; }
    .g2x-cols { display: flex; gap: calc(var(--c) * 1.2); align-items: stretch; }
    .g2x-col { position: relative; display: flex; flex-direction: column; align-items: center; gap: 4px; background: #FFF7ED; border-radius: 0.6rem; padding: 3px calc(var(--c) * 0.5) calc(var(--c) * 0.5); min-width: calc(var(--c) * 3.2); transition: background .25s, box-shadow .25s; }
    .g2x-head { font: 800 clamp(0.75rem, 1.2vh + 0.45rem, 1.05rem) 'Baloo 2', Quicksand, sans-serif; color: #9A3412; white-space: nowrap; }
    .g2x-pile { display: flex; flex-wrap: wrap; justify-content: center; align-content: flex-start; }
    .g2x-col-h .g2x-pile { gap: calc(var(--c) * 0.6); width: calc(var(--c) * (10.6 * var(--p, 1) - 0.6) + 1px); justify-content: flex-start; }
    .g2x-col-t .g2x-pile { gap: calc(var(--c) * 0.6) calc(var(--c) * 0.45); width: calc(var(--c) * (1.45 * var(--tc, 1) - 0.45) + 1px); justify-content: flex-start; }
    .g2x-col-u .g2x-pile { gap: calc(var(--c) * 0.3); width: calc(var(--c) * 6.2); justify-content: flex-start; }
    .g2x-glow { background: #FEF3C7; box-shadow: 0 0 0 3px #F59E0B; }
    .g2x-same { background: #F1F5F9; box-shadow: 0 0 0 2px #CBD5E1; }
    .g2x-win { background: #DCFCE7; box-shadow: 0 0 0 3px #22C55E; }
    .g2x-wrong { background: #FEE2E2; box-shadow: 0 0 0 3px #EF4444; }
    .g2x-carry { position: absolute; bottom: -0.7em; right: -0.4em; z-index: 1; white-space: nowrap; background: #EA580C; color: #fff; border-radius: 999px; padding: 0 0.5em; font: 800 clamp(0.8rem, 1.2vh + 0.45rem, 1.1rem) 'Baloo 2', Quicksand, sans-serif; box-shadow: 0 2px 0 #9A3412; animation: g3eDrop .3s cubic-bezier(.3,1.5,.5,1) both; }

    .g2x-bin { flex: none; display: flex; flex-direction: column; align-items: center; gap: 4px; background: #D6B48A; border: 3px solid #8B5E34; border-radius: 0.6rem 0.6rem 1rem 1rem; padding: 6px; box-shadow: inset 0 4px 8px rgba(0,0,0,0.15); }
    .g2x-cap { font: 800 clamp(0.9rem, 1.4vh + 0.5rem, 1.25rem) 'Baloo 2', Quicksand, sans-serif; color: #5B3A1A; }
    .g2x-bin-grid { display: grid; grid-template-columns: repeat(var(--bc), auto); }
    .g2x-bin-u .g2x-slot { width: calc(var(--c) * 1.5); height: calc(var(--c) * 1.5); display: flex; align-items: center; justify-content: center; }
    .g2x-bin-t .g2x-slot { width: calc(var(--c) * 1.6); height: calc(var(--c) * 11); display: flex; align-items: center; justify-content: center; }
    .g2x-bin-u .g2x-slot:nth-child(3n) .g2x-p { transform: rotate(12deg); } .g2x-bin-u .g2x-slot:nth-child(4n+1) .g2x-p { transform: rotate(-9deg); }
    .g2x-bin-t .g2x-slot:nth-child(2n) .g2x-p { transform: rotate(5deg); } .g2x-bin-t .g2x-slot:nth-child(3n) .g2x-p { transform: rotate(-4deg); }
    .g2x-mach { flex: none; width: calc(var(--c) * 11); }
    .g2x-mach-svg { display: block; width: 100%; height: auto; overflow: visible; }
    .g2x-on .g2x-mach-svg { animation: g3mShake .25s ease-in-out infinite; }
    .g2x-on [data-press] { animation: g2xPress .3s ease-in-out infinite alternate; }
    .g2x-on .g2x-light { animation: g3mBlink .4s steps(2) infinite; }
    @keyframes g2xPress { to { transform: translateY(12px); } }

    .g2x-kho { display: flex; align-items: center; gap: 0.4rem; background: #FFEDD5; border: 3px solid #FDBA74; border-radius: 0.9rem; padding: 0.25rem 0.5rem; }
    .g2x-kho-lab { font: 800 clamp(0.9rem, 1.4vh + 0.5rem, 1.25rem) 'Baloo 2', Quicksand, sans-serif; color: #9A3412; }
    .g2x-stock { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 2px; min-width: 4.8rem; height: clamp(4rem, 9vh, 5.6rem); background: #fff; border: 3px solid #FB923C; border-radius: 0.8rem; box-shadow: 0 4px 0 #FDBA74; padding: 0.2rem 0.35rem; cursor: pointer; }
    .g2x-stock b { font: 800 clamp(0.75rem, 1.1vh + 0.45rem, 1rem) 'Baloo 2', Quicksand, sans-serif; color: #7C2D12; white-space: nowrap; }
    .g2x-stock .g2x-h { width: clamp(1.8rem, 4.5vh, 2.8rem); height: clamp(1.8rem, 4.5vh, 2.8rem); }
    .g2x-stock .g2x-t { width: clamp(0.25rem, 0.5vh, 0.32rem); height: clamp(1.8rem, 4.5vh, 2.8rem); width: calc(clamp(1.8rem, 4.5vh, 2.8rem) / 10); }
    .g2x-stock .g2x-u { width: 14px; height: 14px; }
    .g2x-stock:active { transform: translateY(3px); box-shadow: 0 1px 0 #FDBA74; }
    .g2x-locked { pointer-events: none; opacity: 0.6; }

    .g2x-mid { flex: none; display: flex; align-items: center; justify-content: center; }
    .g2x-sign { display: inline-flex; align-items: center; justify-content: center; min-width: 1.4em; height: 1.4em; font: 800 clamp(1.8rem, 5vh, 3.2rem) 'Baloo 2', Quicksand, sans-serif; color: #1E293B; background: #fff; border: 3px solid #FB923C; border-radius: 0.4em; box-shadow: 0 4px 0 #FDBA74; }
    .g2x-sign .g3f-q { font-size: 0.7em; }
    .g2x-sign-op { border-color: transparent; background: none; box-shadow: none; color: #EA580C; }
    .g2x-sign-bad { border-color: #EF4444; color: #B91C1C; }
    .g2x-pick { display: flex; gap: 0.6rem; }
    .g2x-sg { min-width: 3.2rem; font-size: clamp(1.4rem, 3vh + 0.6rem, 2.2rem); padding: 0.1rem 0.8rem; background: #fff; color: #1E293B; border: 3px solid #FB923C; box-shadow: 0 4px 0 #FDBA74; text-shadow: none; }
    .g2x-sg.g2x-sg-on { background: #F97316; color: #fff; border-color: #C2410C; box-shadow: 0 4px 0 #9A3412; }
    .g2x-sg:disabled { opacity: 0.5; } .g2x-sg.g2x-sg-on:disabled { opacity: 1; }
    .g2x-flysign { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background: #F97316; color: #fff; border-radius: 0.4em; font: 800 2rem 'Baloo 2', Quicksand, sans-serif; }

    .g2x-area { overflow: hidden; } /* khung quá chật: khay không được đè lên hàng nút */
    @media (orientation: portrait) and (max-width: 600px) { .g3f-theme-factory .g3f-sign { display: none; } .g3f-theme-factory .g3f-npc { height: clamp(60px, 11vh, 28vw); height: clamp(60px, 11dvh, 28vw); } .g2x-bench { padding-top: 0; gap: 0.35rem; } .g2x-stock { min-width: 4rem; } .g2x-btn { padding: 0.35rem 0.7rem; } }
    @media (orientation: landscape) and (max-height: 500px) { .g2x-bench { padding-top: 2.2rem; gap: 0.3rem; } .g2x-acts { min-height: 2.4rem; } .g2x-btn { padding: 0.3rem 0.7rem; font-size: 0.95rem; } .g2x-stock { height: 3.4rem; min-width: 4rem; } }
    @media (prefers-reduced-motion: reduce) { .g2x-on .g2x-mach-svg { animation: none; } .g2x-ready { animation: none; box-shadow: 0 4px 0 #C2410C, 0 0 0 4px #FDBA74; } }
  `;
  document.head.appendChild(st);
}
