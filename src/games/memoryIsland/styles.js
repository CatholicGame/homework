/**
 * CSS của 🏝️ Đảo Trí Nhớ (tiền tố mi-). Dùng chung khung g3g- (thanh trên, nút) của trò chơi tăng cường.
 * Bố cục theo skill game-screen-layout: vùng nào cũng giữ chỗ từ đầu ván, cỡ chữ / thẻ tính theo khung (cq units).
 */

import { injectGameStyles } from '../grade3Games/styles.js';

const INK = '#3F3A40';

export function injectMemoryStyles() {
  injectGameStyles();
  if (document.getElementById('mi-styles')) return;
  const st = document.createElement('style');
  st.id = 'mi-styles';
  st.textContent = `
  /* ── cảnh nền: phủ kín màn chơi, cả dưới thanh trên ── */
  .mi-play { background: #7DD3FC; isolation: isolate; }
  .mi-scene, .mi-menu-scene { position: absolute; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; }
  .mi-backdrop { width: 100%; height: 100%; display: block; }
  .mi-cloud { animation: miDrift 26s ease-in-out infinite alternate; }
  .mi-boat { animation: miBob 3.2s ease-in-out infinite; }
  @keyframes miDrift { to { transform: translateX(40px); } }
  @keyframes miBob { 50% { translate: 0 6px; } }
  .mi-topbar { position: relative; z-index: 2; }
  .mi-topbar .g3g-top-title { color: #0C4A6E; text-shadow: 0 2px 0 #fff, 0 -2px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff; }

  .mi-stage { flex: 1; min-height: 0; position: relative; container: mistage / size; }
  .mi-layout { position: absolute; inset: 0; display: grid; gap: 1.4cqh 1.2cqw;
    grid-template-areas: "line line" "board side"; grid-template-columns: minmax(0, 1fr) 22cqw; grid-template-rows: 21cqh minmax(0, 1fr); }
  @container mistage (orientation: portrait) {
    .mi-layout { gap: 1cqh; grid-template-areas: "line" "side" "board"; grid-template-columns: minmax(0, 1fr); grid-template-rows: 23cqh 14cqh minmax(0, 1fr); }
  }

  /* ── dây phơi: N ô; mỗi ô một đoạn dây võng (nối liền nhau), hai cọc gỗ hai đầu ── */
  .mi-line { grid-area: line; position: relative; display: grid; --cols: var(--n); grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); grid-auto-rows: minmax(0, 1fr); padding: 0 3.4cqmin; }
  @container mistage (orientation: portrait) { .mi-line { --cols: var(--half); } }
  .mi-line::before, .mi-line::after { content: ''; position: absolute; top: 0; bottom: -2%; width: 2.2cqmin; min-width: 10px; border-radius: 6px 6px 2px 2px; background: linear-gradient(90deg, #92400E, #B45309 45%, #92400E); border: 3px solid ${INK}; box-sizing: border-box; }
  .mi-line::before { left: 0.6cqmin; } .mi-line::after { right: 0.6cqmin; }
  .mi-slot { position: relative; container: mislot / size; min-width: 0; }
  .mi-slot::before { content: ''; position: absolute; left: -1px; right: -1px; top: 4%; height: 14%; border-bottom: 3px solid #7C4A1E; border-radius: 0 0 50% 50%; }
  .mi-slot-box { position: absolute; left: 6%; right: 6%; top: 22%; bottom: 6%; border: 3px dashed rgba(255,255,255,0.85); border-radius: 12px; background: rgba(255,255,255,0.5); }
  .mi-strip { position: absolute; left: 4%; right: 4%; top: 19%; bottom: 3%; display: flex; align-items: center; gap: 2cqw; padding: 6cqh 4cqw 4cqh; box-sizing: border-box;
    background: #fff; border: 3px solid ${INK}; border-radius: 12px; box-shadow: inset 0 0 0 4px var(--tc), 0 4px 0 rgba(0,0,0,0.12); transform-origin: 50% 0; }
  .mi-slot:nth-child(odd) .mi-strip { rotate: -2deg; } .mi-slot:nth-child(even) .mi-strip { rotate: 1.5deg; }
  .mi-strip-wait { visibility: hidden; }
  .mi-strip-in { animation: miSwing 0.9s ease-out; }
  @keyframes miSwing { 0% { transform: rotate(-9deg) scale(1.06); } 35% { transform: rotate(6deg); } 65% { transform: rotate(-3deg); } 100% { transform: none; } }
  .mi-pin { position: absolute; top: -16cqh; left: 50%; translate: -50% 0; height: 34cqh; width: auto; z-index: 1; }
  .mi-strip-part { flex: 1 1 0; height: 100%; min-width: 0; position: relative; display: flex; }
  .mi-strip-eq { font-weight: 800; color: ${INK}; font-size: min(40cqh, 9cqw); line-height: 1; }
  .mi-strip-cover { position: absolute; inset: 0; display: none; place-items: center; background: #FFEDD5; border: 3px dashed #F97316; border-radius: 10px; color: #EA580C; font-weight: 800; font-size: min(52cqh, 12cqw); }
  .mi-strip-hide .mi-strip-cover { display: grid; }
  /* ô hẹp (điện thoại dọc): dải xếp hai tầng, mặt hỏi trên, mặt đáp dưới, chữ to hơn */
  @container mislot (max-width: 190px) {
    .mi-strip:not(.mi-strip-pic) { flex-direction: column; gap: 0; padding: 8cqh 4cqw 3cqh; }
    .mi-strip:not(.mi-strip-pic) .mi-strip-eq { display: none; }
    .mi-strip:not(.mi-strip-pic) .mi-strip-part { width: 100%; }
    .mi-strip:not(.mi-strip-pic) .mi-strip-ans { border-top: 2px dashed #CBD5E1; }
    .mi-strip-pic { padding: 8cqh 3cqw 3cqh; gap: 1cqw; }
  }
  .mi-strip-now { box-shadow: inset 0 0 0 4px var(--tc), 0 0 0 5px #FDE047, 0 4px 0 rgba(0,0,0,0.12); }

  /* ── mặt thẻ: khung là container, chữ / hình co theo khung ── */
  .mi-fbox { flex: 1; width: 100%; height: 100%; container-type: size; display: grid; place-items: center; min-width: 0; }
  .mi-fx { color: ${INK}; font-weight: 800; line-height: 1; white-space: nowrap; }
  .mi-fx-text { font-size: min(52cqh, calc(165cqw / max(5, var(--L)))); letter-spacing: -0.01em; }
  /* dải trên dây: hai nửa cùng cỡ chữ (theo nửa dài hơn) */
  .mi-strip .mi-fx-text { font-size: min(56cqh, calc(170cqw / var(--SL))); }
  .mi-strip .mi-fx-roman { font-size: min(52cqh, calc(130cqw / var(--SL))); }
  .mi-fx-roman { font-family: Georgia, 'Times New Roman', serif; letter-spacing: 0.04em; color: #7C2D12; font-size: min(50cqh, calc(130cqw / max(4, var(--L)))); }
  .mi-fx-frac { display: inline-flex; flex-direction: column; align-items: center; font-size: min(34cqh, 40cqw); }
  .mi-fx-frac i { display: block; width: 1.25em; height: 0.11em; min-height: 3px; background: currentColor; border-radius: 2px; margin: 0.08em 0; }
  .mi-fx-part { height: 86cqh; width: 86cqw; display: block; }

  /* ── bàn cát: bảng chắn sáng, lưới thẻ ── */
  .mi-board { grid-area: board; position: relative; min-height: 0; background: #FFFBEB; border: 4px solid ${INK}; border-radius: 22px; box-shadow: 0 7px 0 rgba(146,64,14,0.35); padding: 1.6cqmin; box-sizing: border-box; container: miboard / size; }
  .mi-grid { position: absolute; inset: 1.6cqmin; display: grid; gap: 1.6cqmin; }
  .mi-cell { position: relative; border: 0; padding: 0; background: none; cursor: pointer; perspective: 900px; min-width: 0; min-height: 0; border-radius: 14px; touch-action: manipulation; }
  .mi-cell:focus-visible { outline: 4px solid #2563EB; outline-offset: 2px; }
  .mi-card { position: absolute; inset: 0; display: block; }
  .mi-inner { position: absolute; inset: 0; transform-style: preserve-3d; transition: transform 0.32s ease; }
  .mi-up .mi-inner { transform: rotateY(180deg); }
  .mi-instant .mi-inner { transition: none; }
  .mi-back, .mi-front { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 14px; box-sizing: border-box; border: 3px solid ${INK}; display: flex; }
  .mi-back { box-shadow: 0 5px 0 rgba(0,0,0,0.18); align-items: center; justify-content: center; }
  .mi-back::before { content: ''; position: absolute; inset: 6%; border: 3px dashed rgba(255,255,255,0.7); border-radius: 10px; }
  .mi-role-ask .mi-back { background: linear-gradient(160deg, #60A5FA, #2563EB); }
  .mi-role-ans .mi-back { background: linear-gradient(160deg, #FDBA74, #F97316); }
  .mi-back-art { width: 52%; height: 52%; }
  .mi-front { transform: rotateY(180deg); background: #fff; padding: 7%; container-type: size; }
  .mi-role-ask .mi-front { box-shadow: inset 0 0 0 0.45rem #3B82F6, 0 5px 0 rgba(0,0,0,0.15); }
  .mi-role-ans .mi-front { box-shadow: inset 0 0 0 0.45rem #F97316, 0 5px 0 rgba(0,0,0,0.15); }
  .mi-topic-ic { position: absolute; top: 5%; left: 6%; font-size: min(17cqh, 12cqw); line-height: 1; }
  .mi-cell:not(.mi-up):not(.mi-gone):hover .mi-back { filter: brightness(1.08); }
  .mi-cell:not(.mi-up):not(.mi-gone):active .mi-card { translate: 0 3px; }
  .mi-up .mi-front { outline: 4px solid #FDE047; outline-offset: -1px; }
  .mi-wrong .mi-front { outline-color: #EF4444; }
  .mi-gone { cursor: default; }
  .mi-gone .mi-card { visibility: hidden; }
  .mi-gone::after { content: ''; position: absolute; inset: 0; border: 3px dashed #E5C07B; border-radius: 14px; background: #FEF3C7; }
  .mi-trap .mi-front::after { content: '🪤'; position: absolute; top: 4%; right: 6%; font-size: min(20cqh, 14cqw); }
  .mi-nudge .mi-card { animation: miNudge 0.6s ease-in-out 3; }
  @keyframes miNudge { 50% { translate: 0 -10%; } }
  .mi-glow .mi-back { box-shadow: 0 0 0 6px #FDE047, 0 0 24px 8px #FDE047; }
  .mi-play .pk-shake { animation: miShake 0.5s ease; }
  @keyframes miShake { 20% { translate: -7px 0; } 40% { translate: 6px 0; } 60% { translate: -4px 0; } 80% { translate: 3px 0; } }

  /* thẻ bay lên dây */
  .mi-flyface { position: absolute; inset: 0; }
  .mi-flyface .mi-front { transform: none; backface-visibility: visible; }

  /* ── cột vẹt: bong bóng, vẹt, ô đếm ── */
  .mi-side { grid-area: side; display: flex; flex-direction: column; gap: 1.2cqh; min-height: 0; min-width: 0; }
  .mi-talk { position: relative; flex: 0 0 24cqh; background: #fff; border: 3px solid ${INK}; border-radius: 18px; display: grid; place-items: center; padding: 0.4rem 0.6rem; box-sizing: border-box; box-shadow: 0 4px 0 rgba(0,0,0,0.12); }
  .mi-talk::after { content: ''; position: absolute; bottom: -14px; left: 50%; width: 22px; height: 22px; background: #fff; border-right: 3px solid ${INK}; border-bottom: 3px solid ${INK}; transform: translateX(-50%) rotate(45deg); }
  .mi-talk-text { margin: 0; text-align: center; font-weight: 800; color: #0C4A6E; font-size: clamp(1rem, 3.3cqmin, 2.2rem); line-height: 1.2; overflow: hidden; }
  .mi-talk-pop { animation: miPop 0.3s ease-out; }
  @keyframes miPop { 0% { scale: 0.92; } 100% { scale: 1; } }
  .mi-parrot { flex: 1 1 0; min-height: 0; display: flex; justify-content: center; align-items: flex-end; filter: drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff); }
  .mi-parrot-svg { height: 100%; max-width: 100%; display: block; overflow: visible; }
  .mi-p-body { transform-origin: 100px 176px; animation: miBreathe 2.6s ease-in-out infinite; }
  @keyframes miBreathe { 50% { transform: scale(1.02, 0.985); } }
  .mi-p-head { transform-origin: 104px 92px; transition: transform 0.3s; }
  .mi-p-wing-up, .mi-p-eye-happy, .mi-p-eye-think { display: none; }
  .mi-parrot[data-mood="happy"] .mi-p-wing-up, .mi-parrot[data-mood="happy"] .mi-p-eye-happy { display: inline; }
  .mi-parrot[data-mood="happy"] .mi-p-wing, .mi-parrot[data-mood="happy"] .mi-p-eye-open { display: none; }
  .mi-parrot[data-mood="happy"] .mi-p-body { animation: miHop 0.5s ease-in-out 2; }
  @keyframes miHop { 50% { transform: translateY(-12px); } }
  .mi-parrot[data-mood="think"] .mi-p-head { transform: rotate(-12deg); }
  .mi-parrot[data-mood="think"] .mi-p-eye-open { display: none; }
  .mi-parrot[data-mood="think"] .mi-p-eye-think { display: inline; }
  .mi-stats { flex: 0 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 1cqw; }
  .mi-stat { background: #fff; border: 3px solid ${INK}; border-radius: 14px; text-align: center; padding: 0.3rem 0.2rem; box-shadow: 0 4px 0 rgba(0,0,0,0.12); display: flex; flex-direction: column; justify-content: center; }
  .mi-stat-label { font-size: clamp(0.75rem, 1.8cqmin, 1.05rem); font-weight: 700; color: #64748B; }
  .mi-stat b { font-size: clamp(1.2rem, 5cqmin, 2.6rem); line-height: 1.05; color: ${INK}; font-variant-numeric: tabular-nums; }
  @container mistage (orientation: portrait) {
    .mi-side { flex-direction: row; gap: 2cqw; }
    .mi-parrot { order: -1; flex: 0 0 auto; height: 100%; aspect-ratio: 200 / 230; }
    .mi-talk { flex: 1 1 0; }
    .mi-talk::after { bottom: auto; top: 50%; left: -13px; transform: translateY(-50%) rotate(135deg); }
    .mi-stats { grid-template-columns: 1fr; width: 21cqw; gap: 0.8cqh; }
    .mi-stat { flex-direction: row; justify-content: space-between; align-items: center; padding: 0 0.6rem; }
    .mi-stat b { font-size: clamp(1.1rem, 4cqh, 2rem); }
  }

  /* ── lớp phủ trên bàn: Ôn nhanh, tổng kết (bàn đã trống hết) ── */
  .mi-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; visibility: hidden; padding: 2cqh 2cqw; box-sizing: border-box; overflow: auto; }
  .mi-ov-on .mi-overlay { visibility: visible; animation: miFade 0.35s ease-out; }
  .mi-ov-on .mi-grid { visibility: hidden; }
  @keyframes miFade { from { opacity: 0; } }
  .mi-quiz { width: 100%; height: 100%; display: grid; grid-template-rows: auto minmax(0, 1fr) minmax(0, 1fr); gap: 3cqh; }
  .mi-quiz-head { display: flex; align-items: center; justify-content: center; gap: 1rem; font-weight: 800; color: #0C4A6E; font-size: clamp(1rem, 6cqh, 2.2rem); }
  .mi-quiz-dots { display: flex; gap: 0.5rem; }
  .mi-quiz-dots i { width: 0.8em; height: 0.8em; border-radius: 50%; background: #E2E8F0; border: 3px solid #CBD5E1; }
  .mi-quiz-dots i.mi-q-now { background: #FDE047; border-color: #EAB308; }
  .mi-quiz-dots i.mi-q-ok { background: #4ADE80; border-color: #16A34A; }
  .mi-quiz-dots i.mi-q-bad { background: #FB7185; border-color: #E11D48; }
  .mi-quiz-q { display: flex; align-items: stretch; justify-content: center; gap: 3cqw; min-height: 0; }
  .mi-qcard { position: relative; width: min(30cqw, 52cqh); background: #fff; border: 3px solid ${INK}; border-radius: 16px; display: flex; padding: 3cqh 2cqw; box-sizing: border-box; }
  .mi-qcard.mi-role-ask { box-shadow: inset 0 0 0 0.45rem #3B82F6; }
  .mi-qcard-blank { background: #FFEDD5; border-style: dashed; border-color: #F97316; place-items: center; justify-content: center; align-items: center; color: #EA580C; font-weight: 800; font-size: min(18cqh, 12cqw); }
  .mi-qcard-done { background: #fff; border-style: solid; border-color: ${INK}; box-shadow: inset 0 0 0 0.45rem #F97316; }
  .mi-quiz-eq { align-self: center; font-weight: 800; font-size: min(14cqh, 8cqw); color: ${INK}; }
  .mi-quiz-choices { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 3cqw; min-height: 0; }
  .mi-choice { display: flex; background: #fff; border: 3px solid ${INK}; border-radius: 18px; padding: 2.4cqh 2cqw; cursor: pointer; box-shadow: inset 0 0 0 0.45rem #FDBA74, 0 7px 0 #C2410C; transition: transform .1s, box-shadow .1s; min-height: 0; touch-action: manipulation; }
  .mi-choice:active:not(:disabled) { transform: translateY(5px); box-shadow: inset 0 0 0 0.45rem #FDBA74, 0 2px 0 #C2410C; }
  .mi-choice:disabled { cursor: default; }
  .mi-choice-ok { background: #DCFCE7; box-shadow: inset 0 0 0 0.45rem #22C55E, 0 7px 0 #15803D; }
  .mi-choice-bad { background: #FFE4E6; box-shadow: inset 0 0 0 0.45rem #FB7185, 0 7px 0 #BE123C; }

  .mi-sum { text-align: center; color: #0C4A6E; display: flex; flex-direction: column; align-items: center; gap: 1.2cqh; max-width: 100%; }
  .mi-sum-stars { display: flex; gap: 2cqw; font-size: clamp(2.4rem, 16cqh, 6rem); line-height: 1; }
  .mi-sum-stars span { color: #E2E8F0; -webkit-text-stroke: 3px ${INK}; }
  .mi-sum-stars span.on { color: #FACC15; animation: miStar 0.5s var(--d) both cubic-bezier(.3,1.6,.6,1); }
  @keyframes miStar { from { scale: 0; rotate: -40deg; } }
  .mi-sum-h { margin: 0; font-size: clamp(1.4rem, 8cqh, 3rem); font-weight: 800; }
  .mi-sum-line { margin: 0; font-size: clamp(1rem, 5cqh, 1.9rem); font-weight: 700; color: ${INK}; }
  .mi-sum-sub { margin: 0; font-size: clamp(0.9rem, 4cqh, 1.4rem); font-weight: 700; color: #475569; }
  .mi-sum-sub:empty { display: none; }
  .mi-sum-weak { margin: 0; font-size: clamp(0.9rem, 4cqh, 1.4rem); font-weight: 700; color: #9F1239; }
  .mi-sum-chip { display: inline-block; background: #FFE4E6; border: 2px solid #FB7185; border-radius: 999px; padding: 0 0.6em; margin: 0.1em; white-space: nowrap; }
  .mi-sum-got { margin: 0; font-size: clamp(1.1rem, 6cqh, 2rem); font-weight: 800; color: #B45309; }
  .mi-sum-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.8rem; margin-top: 1cqh; }
  .mi-sum-actions .g3g-btn { font-size: clamp(1rem, 4.4cqh, 1.5rem); }

  /* ── màn Túi thẻ, thẻ giới thiệu ── */
  .mi-menu { position: relative; isolation: isolate; min-height: 100%; padding-bottom: calc(5.2rem * min(var(--z, 1), 1.35)); box-sizing: border-box; font-family: 'Baloo 2', 'Quicksand', sans-serif; color: #0C4A6E; display: flex; flex-direction: column; -webkit-tap-highlight-color: transparent; }
  .mi-menu button { font-family: inherit; }
  .mi-menu-scene { position: fixed; }
  .mi-menu-top { display: flex; align-items: center; gap: 0.7rem; padding: 0.7rem 1rem 0.2rem; }
  .mi-menu-top .g3g-icon-btn { background: #fff; box-shadow: 0 3px 0 #93C5FD; border-radius: 50%; min-width: 2.6rem; height: 2.6rem; }
  .mi-menu-title { flex: 1; min-width: 0; }
  .mi-menu-title h1 { margin: 0; font-size: clamp(1.4rem, 3.4vw, 2.1rem); line-height: 1.1; text-shadow: 0 2px 0 #fff, 0 -2px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff; }
  .mi-menu-title p { margin: 0; font-weight: 700; font-size: clamp(0.95rem, 2vw, 1.15rem); text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff; }
  .mi-menu-body { zoom: var(--z, 1); width: min(1100px, calc((100vw - 1rem) / var(--z, 1))); margin: 0 auto; padding: 0.4rem 1rem 0.6rem; box-sizing: border-box; }
  .mi-menu-mid { flex: 1; display: flex; flex-direction: column; justify-content: center; }
  .mi-panel { background: #fff; border: 3px solid ${INK}; border-radius: 20px; padding: 0.9rem; box-shadow: 0 6px 0 rgba(12,74,110,0.18); margin-bottom: 0.9rem; }
  .mi-panel h2 { margin: 0 0 0.6rem; font-size: 1.15rem; color: #0C4A6E; }
  .mi-quick { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.7rem; }
  .mi-quick-btn { text-align: left; border: 3px solid ${INK}; border-radius: 16px; padding: 0.7rem 0.8rem; cursor: pointer; display: flex; gap: 0.6rem; align-items: center; color: #fff; box-shadow: 0 6px 0 var(--sh); background: var(--bg); transition: transform .1s, box-shadow .1s; min-height: 4.6rem; }
  .mi-quick-btn:active:not(:disabled) { transform: translateY(4px); box-shadow: 0 2px 0 var(--sh); }
  .mi-quick-btn:disabled { filter: grayscale(0.75); opacity: 0.7; cursor: default; }
  .mi-quick-ic { font-size: 2rem; line-height: 1; }
  .mi-quick-btn b { display: block; font-size: 1.15rem; line-height: 1.15; text-shadow: 0 2px 0 rgba(0,0,0,0.2); }
  .mi-quick-btn small { display: block; font-size: 0.92rem; font-weight: 700; opacity: 0.95; line-height: 1.2; }
  .mi-topics { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(10.5rem, calc(50% - 0.4rem)), 1fr)); gap: 0.7rem; }
  .mi-topic { position: relative; text-align: left; border: 3px solid ${INK}; border-radius: 16px; padding: 0.55rem 0.7rem 0.6rem; cursor: pointer; background: #fff; box-shadow: inset 0 -0.45rem 0 var(--tc), 0 5px 0 rgba(0,0,0,0.15); transition: transform .1s, box-shadow .1s; display: flex; flex-direction: column; gap: 0.1rem; color: ${INK}; }
  .mi-topic:active { transform: translateY(3px); }
  .mi-tp-ic { font-size: 1.9rem; line-height: 1.1; }
  .mi-topic b { font-size: 1.25rem; line-height: 1.15; }
  .mi-topic small { font-size: 0.85rem; color: #64748B; font-weight: 700; line-height: 1.2; }
  .mi-topic-done { color: #15803D !important; }
  .mi-topic[aria-pressed="true"] { background: #FEF9C3; box-shadow: inset 0 -0.45rem 0 var(--tc), 0 0 0 4px #FACC15, 0 5px 0 rgba(0,0,0,0.15); }
  .mi-topic-check { position: absolute; top: 0.4rem; right: 0.45rem; width: 1.7rem; height: 1.7rem; border-radius: 50%; border: 3px solid #CBD5E1; display: grid; place-items: center; font-size: 1rem; font-weight: 800; color: #fff; box-sizing: border-box; }
  .mi-topic[aria-pressed="true"] .mi-topic-check { background: #22C55E; border-color: #15803D; }
  .mi-bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 5; background: #fff; border-top: 3px solid ${INK}; padding: 0.6rem 1rem calc(0.6rem + env(safe-area-inset-bottom)); display: flex; align-items: center; gap: 0.8rem; justify-content: center; }
  .mi-bar-text { flex: 0 1 auto; min-width: 0; max-width: 640px; font-weight: 700; color: #334155; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mi-bar .g3g-btn { font-size: 1.25rem; padding: 0.7rem 2rem; flex-shrink: 0; }
  .mi-bar > *, .mi-menu-top { zoom: min(var(--z, 1), 1.35); }

  .mi-intro { width: min(900px, calc((100vw - 1rem) / var(--z, 1))); }
  .mi-intro-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
  .mi-chip { background: #fff; border: 3px solid var(--tc); border-radius: 999px; padding: 0.15rem 0.8rem; font-weight: 800; color: ${INK}; }
  .mi-intro-fit { text-align: center; margin: 0.6rem 0 0; font-weight: 700; color: #475569; }
  .mi-intro-done { text-align: center; margin: 0.1rem 0 0; font-weight: 800; color: #15803D; }
  .mi-how-panel { container: mihow / inline-size; }
  .mi-how { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr); align-items: center; gap: 0.4rem; margin: 0.2rem 0 0; }
  .mi-how-step { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; text-align: center; font-weight: 800; font-size: 0.98rem; color: #0C4A6E; }
  .mi-how-pic { height: 4.2rem; display: flex; align-items: center; justify-content: center; gap: 0.25rem; }
  .mi-how-arrow { font-size: 1.6rem; color: #94A3B8; font-weight: 800; }
  .mi-mini { width: 2.6rem; height: 3.3rem; border-radius: 8px; border: 3px solid ${INK}; display: grid; place-items: center; font-weight: 800; font-size: 0.95rem; color: ${INK}; background: #fff; box-sizing: border-box; }
  .mi-mini-ask { box-shadow: inset 0 0 0 4px #3B82F6; } .mi-mini-ans { box-shadow: inset 0 0 0 4px #F97316; }
  .mi-mini-back { background: linear-gradient(160deg, #60A5FA, #2563EB); }
  .mi-mini-strip { background: #fff; border: 3px solid ${INK}; border-radius: 8px; padding: 0.2rem 0.5rem; font-weight: 800; color: ${INK}; white-space: nowrap; box-shadow: inset 0 0 0 3px #22C55E; }
  /* khung hẹp (điện thoại dọc, hoặc màn đã phóng to): ba bước xếp dọc, hình bên trái, chữ bên phải */
  @container mihow (max-width: 470px) {
    .mi-how { grid-template-columns: 1fr; gap: 0.15rem; }
    .mi-how-arrow { justify-self: start; margin-left: 3.2rem; rotate: 90deg; line-height: 1; font-size: 1.3rem; }
    .mi-how-step { flex-direction: row; gap: 0.7rem; text-align: left; }
    .mi-how-pic { flex: 0 0 7.6rem; height: 3.6rem; }
  }
  .mi-levels { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.7rem; }
  .mi-level { text-align: center; border: 3px solid ${INK}; border-radius: 16px; background: #fff; padding: 0.6rem 0.5rem; cursor: pointer; box-shadow: 0 5px 0 rgba(0,0,0,0.15); display: flex; flex-direction: column; align-items: center; gap: 0.1rem; color: ${INK}; transition: transform .1s; }
  .mi-level:active { transform: translateY(3px); }
  .mi-level[aria-pressed="true"] { background: #FEF9C3; box-shadow: 0 0 0 4px #FACC15, 0 5px 0 rgba(0,0,0,0.15); }
  .mi-level-ic { font-size: 1.9rem; line-height: 1.1; }
  .mi-level b { font-size: 1.12rem; }
  .mi-level small { font-size: 0.85rem; color: #64748B; font-weight: 700; line-height: 1.2; }
  .mi-level em { font-style: normal; font-size: 0.85rem; color: #B45309; font-weight: 800; }
  @media (max-width: 640px) {
    .mi-menu-body { padding-left: 0.6rem; padding-right: 0.6rem; }
    .mi-panel { padding: 0.7rem; }
    .mi-bar .g3g-btn { padding: 0.7rem 1.2rem; }
    .mi-quick { grid-template-columns: 1fr; }
    .mi-quick-btn { min-height: 0; }
    .mi-levels { gap: 0.4rem; }
    .mi-level small { display: none; }
    .mi-how-step { font-size: 0.85rem; }
  }

  /* máy tắt hiệu ứng: lật thẻ thành mờ dần đổi mặt, vẫn có chuyển động bay (bản êm) */
  @media (prefers-reduced-motion: reduce) {
    .mi-inner { transition: none; transform: none !important; }
    .mi-front { transform: none; opacity: 0; transition: opacity 0.3s; }
    .mi-back { transition: opacity 0.3s; }
    .mi-up .mi-front { opacity: 1; }
    .mi-up .mi-back { opacity: 0; }
    .mi-cloud, .mi-boat, .mi-p-body { animation: none !important; }
    .mi-strip-in { animation: none; }
    .mi-nudge .mi-card { animation: none; }
    .mi-nudge .mi-back { box-shadow: 0 0 0 6px #FDE047; }
    .mi-sum-stars span.on { animation: none; }
    .mi-play .pk-shake { animation: none; }
    .mi-wrong .mi-front { outline-width: 6px; }
  }
  `;
  document.head.appendChild(st);
}
