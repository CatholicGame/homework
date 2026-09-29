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
