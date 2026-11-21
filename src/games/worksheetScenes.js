/**
 * Luyện Đề: câu nối có cảnh (q.scene). Thay hai cột chữ bằng vật đích (cửa, nhà chó, hoa…) và khay vật cầm
 * (chìa khoá, chú chó, bướm…). Chạm vật cầm rồi chạm vật đích: vật bay vào chỗ của nó (ổ khoá, cửa nhà…).
 * Nộp bài mới chấm: cặp đúng thì cảnh "mở" (cửa mở ra, virus tan, cá vào miệng mèo…), cặp sai thì rung, hiện vật đúng.
 * Dữ liệu vẫn là match: left, right, ans (ans[i] = chỉ số bên phải của ô trái i). token: bên nào là vật cầm.
 * Hình tự vẽ (nét INK dày, màu tươi), không dùng ảnh có bản quyền.
 */

const INK = '#3F3A40';
const S = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;

// ── vật cầm ──
// Chìa khoá: đầu tròn to, mặt trắng để in số (số là chữ HTML đè lên, xem labelOn).
const KEY = `<svg viewBox="0 0 100 50" aria-hidden="true"><path d="M44 21 H96 V29 H89 V39 H81 V29 H73 V36 H65 V29 H44 Z" fill="#facc15" ${S}/><circle cx="25" cy="25" r="22" fill="#facc15" ${S}/><circle cx="25" cy="25" r="15.5" fill="#fff" ${S}/></svg>`;
const SPRAY = `<svg viewBox="0 0 60 80" aria-hidden="true"><rect x="12" y="28" width="34" height="48" rx="7" fill="#60a5fa" ${S}/><rect x="18" y="16" width="22" height="13" rx="3" fill="#e2e8f0" ${S}/><path d="M24 16 V8 H44 L48 12" fill="none" ${S}/><path d="M50 6 l6 -3 M51 12 h7 M50 18 l6 3" stroke="#93c5fd" stroke-width="2.5" stroke-linecap="round"/><path d="M12 44 H46" stroke="#fff" stroke-width="5"/><path d="M22 52 h14 M29 45 v14" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/></svg>`;
const BUTTERFLY = `<svg viewBox="0 0 80 60" aria-hidden="true"><g class="sc-wing sc-wing-l"><path d="M38 30 C26 4, 4 6, 8 24 C10 34, 24 36, 38 32 Z" fill="#f472b6" ${S}/><path d="M38 33 C24 36, 12 48, 22 54 C30 58, 36 46, 38 36 Z" fill="#fb923c" ${S}/></g><g class="sc-wing sc-wing-r"><path d="M42 30 C54 4, 76 6, 72 24 C70 34, 56 36, 42 32 Z" fill="#f472b6" ${S}/><path d="M42 33 C56 36, 68 48, 58 54 C50 58, 44 46, 42 36 Z" fill="#fb923c" ${S}/></g><rect x="36" y="18" width="8" height="34" rx="4" fill="${INK}"/><path d="M38 19 C34 10, 30 8, 28 6 M42 19 C46 10, 50 8, 52 6" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/></svg>`;
const CAR = (c) => `<svg viewBox="0 0 96 52" aria-hidden="true"><path d="M6 36 L9 25 Q11 21 18 21 L28 9 Q31 6 44 6 L60 6 Q66 6 70 11 L78 21 Q90 22 91 30 L91 37 Z" fill="${c}" ${S}/><path d="M32 11 H46 V21 H24 Z M51 11 H62 L70 21 H51 Z" fill="#e0f2fe" ${S}/><circle cx="25" cy="38" r="8" fill="#475569" ${S}/><circle cx="72" cy="38" r="8" fill="#475569" ${S}/><circle cx="25" cy="38" r="3" fill="#e2e8f0"/><circle cx="72" cy="38" r="3" fill="#e2e8f0"/><rect class="sc-light" x="84" y="25" width="7" height="5" rx="2" fill="#fef9c3" stroke="${INK}" stroke-width="2"/></svg>`;
const FISH = `<svg viewBox="0 0 80 44" aria-hidden="true"><path d="M8 22 C20 4, 50 2, 62 22 C50 42, 20 40, 8 22 Z" fill="#fb923c" ${S}/><path d="M60 22 L76 8 L74 22 L76 36 Z" fill="#fdba74" ${S}/><circle cx="22" cy="18" r="3.5" fill="${INK}"/><path d="M34 14 Q40 22 34 30 M44 14 Q50 22 44 30" fill="none" stroke="#c2410c" stroke-width="2.5" stroke-linecap="round"/></svg>`;
const DOG = `<svg viewBox="0 0 80 66" aria-hidden="true"><path class="sc-tail" d="M62 40 Q76 30 72 18" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><rect x="22" y="34" width="44" height="22" rx="10" fill="#d97706" ${S}/><path d="M28 54 v8 M40 55 v8 M52 55 v8 M62 54 v8" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><circle cx="24" cy="28" r="17" fill="#f59e0b" ${S}/><path d="M9 18 Q4 34 12 38 Q16 30 14 20 Z M39 18 Q44 34 36 38 Q32 30 34 20 Z" fill="#92400e" ${S}/><circle cx="18" cy="26" r="2.6" fill="${INK}"/><circle cx="30" cy="26" r="2.6" fill="${INK}"/><ellipse cx="24" cy="33" rx="4" ry="3" fill="${INK}"/><path d="M20 38 Q24 41 28 38" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/></svg>`;

// ── vật đích ──
const DOOR_IN = `<svg viewBox="0 0 80 110" preserveAspectRatio="none" aria-hidden="true"><rect x="2" y="2" width="76" height="106" rx="6" fill="#d6b98c" ${S}/><path d="M12 108 V24 Q12 10 26 10 H54 Q68 10 68 24 V108" fill="#fff4c2" ${S}/><circle cx="40" cy="56" r="16" fill="#fde047" opacity="0.7"/><path d="M40 42 l4 9 10 1 -8 6 3 10 -9 -6 -9 6 3 -10 -8 -6 10 -1 Z" fill="#facc15" ${S}/><path d="M22 92 h36 v12 h-36 Z" fill="#a16207" ${S}/></svg>`;
const DOOR_LEAF = `<svg viewBox="0 0 56 98" preserveAspectRatio="none" aria-hidden="true"><path d="M2 96 V16 Q2 2 16 2 H40 Q54 2 54 16 V96 Z" fill="#b45309" ${S}/><rect x="10" y="16" width="36" height="30" rx="4" fill="#d97706" ${S}/><rect x="10" y="54" width="36" height="34" rx="4" fill="#d97706" ${S}/><circle cx="44" cy="52" r="4" fill="#facc15" ${S}/><path d="M42 60 h4 l-1 8 h-2 Z" fill="${INK}"/></svg>`;
const VIRUS = `<svg viewBox="0 0 90 90" aria-hidden="true"><g ${S}>${Array.from({ length: 10 }, (_, k) => { const a = (k * Math.PI) / 5, x1 = 45 + 26 * Math.cos(a), y1 = 45 + 26 * Math.sin(a), x2 = 45 + 39 * Math.cos(a), y2 = 45 + 39 * Math.sin(a); return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none"/><circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="5" fill="#f87171"/>`; }).join('')}</g><circle cx="45" cy="45" r="27" fill="#4ade80" ${S}/><circle cx="34" cy="38" r="4" fill="${INK}"/><circle cx="56" cy="38" r="4" fill="${INK}"/><path d="M29 30 l9 4 M61 30 l-9 4" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><path d="M34 58 Q45 50 56 58" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><circle cx="52" cy="60" r="3" fill="#16a34a"/><circle cx="36" cy="50" r="2.5" fill="#16a34a"/></svg>`;
const FLOWER = `<svg viewBox="0 0 80 100" aria-hidden="true"><path d="M40 52 V96" stroke="#16a34a" stroke-width="5" stroke-linecap="round"/><path d="M40 80 Q24 70 18 78 Q26 88 40 84 Z M40 74 Q56 62 62 70 Q54 80 40 78 Z" fill="#4ade80" ${S}/><g class="sc-petals">${[0, 60, 120, 180, 240, 300].map(r => `<ellipse cx="40" cy="22" rx="11" ry="15" fill="#fde047" ${S} transform="rotate(${r} 40 38)"/>`).join('')}</g><circle cx="40" cy="38" r="11" fill="#f97316" ${S}/></svg>`;
const PARKING = `<svg viewBox="0 0 110 80" preserveAspectRatio="none" aria-hidden="true"><rect x="2" y="2" width="106" height="76" rx="8" fill="#64748b" ${S}/><path d="M14 10 V72 M96 10 V72" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M14 72 H96" stroke="#facc15" stroke-width="4" stroke-dasharray="8 6"/><rect x="40" y="8" width="30" height="24" rx="5" fill="#2563eb" stroke="#fff" stroke-width="3"/><text x="55" y="27" text-anchor="middle" font-size="19" font-weight="900" fill="#fff" font-family="sans-serif">P</text></svg>`;
const CAT = `<svg viewBox="0 0 90 96" aria-hidden="true"><path class="sc-tail" d="M70 80 Q90 70 82 48" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M70 80 Q90 70 82 48" fill="none" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/><ellipse cx="46" cy="74" rx="26" ry="20" fill="#fbbf24" ${S}/><path d="M18 34 L20 8 L34 20 H56 L70 8 L72 34 Z" fill="#fbbf24" ${S}/><ellipse cx="45" cy="38" rx="27" ry="23" fill="#fbbf24" ${S}/><path d="M23 14 l2 10 6 -5 Z M67 14 l-2 10 -6 -5 Z" fill="#fda4af"/><circle cx="35" cy="34" r="3.5" fill="${INK}"/><circle cx="55" cy="34" r="3.5" fill="${INK}"/><path d="M42 42 h6 l-3 3 Z" fill="#f472b6"/><path class="sc-mouth" d="M38 49 Q45 53 52 49" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/><path d="M10 40 L27 42 M10 47 L27 46 M80 40 L63 42 M80 47 L63 46" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/></svg>`;
const HOUSE = `<svg viewBox="0 0 100 92" aria-hidden="true"><path d="M14 44 V88 H86 V44" fill="#ef4444" ${S}/><path d="M6 48 L50 8 L94 48 Z" fill="#7c2d12" ${S}/><path d="M36 88 V62 Q36 50 50 50 Q64 50 64 62 V88 Z" fill="#3f2a1d" ${S}/><path d="M20 58 h10 M70 58 h10 M20 70 h10 M70 70 h10" stroke="#fecaca" stroke-width="3" stroke-linecap="round"/></svg>`;

/**
 * Mỗi cảnh: token ('l' | 'r': cột dữ liệu là vật cầm), tên hai loại (lời nhắc), nền dải vật đích,
 * tỉ lệ hình vật đích (ratio), chỗ đậu của vật cầm trên hình vật đích (dock: left, top, width theo %, tỉ lệ khung),
 * hình vật đích (target), hình vật cầm (tokenPic(i)); labelOn: [x, y] in chữ của vật cầm ngay trên hình (số trên đầu chìa).
 */
export const SCENES = {
  doors: {
    token: 'r', tokenWord: 'chìa khoá', targetWord: 'cửa', ratio: '4 / 5',
    labelOn: [25, 50], // số in giữa đầu chìa (toạ độ % của hình chìa)
    bg: 'linear-gradient(#cbd5e1 0 78%, #94a3b8 78%)',
    dock: [50, 54, 48, '2 / 1'],
    target: () => `<span class="sc-door"><span class="sc-door-in">${DOOR_IN}</span><span class="sc-door-leaf">${DOOR_LEAF}</span></span>`,
    tokenPic: () => KEY,
  },
  virus: {
    token: 'l', tokenWord: 'bình xịt', targetWord: 'virus', ratio: '1 / 1',
    bg: 'linear-gradient(#e0f2fe, #f0fdf4)',
    dock: [2, 42, 36, '3 / 4'],
    target: () => `<span class="sc-pop">${VIRUS}</span><span class="sc-yay" aria-hidden="true">✨</span>`,
    tokenPic: () => SPRAY,
  },
  flowers: {
    token: 'l', tokenWord: 'bướm', targetWord: 'bông hoa', ratio: '4 / 5',
    bg: 'linear-gradient(#bae6fd 0 70%, #86efac 70%)',
    dock: [22, -4, 56, '4 / 3'],
    target: () => `<span class="sc-bloom">${FLOWER}</span>`,
    tokenPic: () => BUTTERFLY,
  },
  cars: {
    token: 'r', tokenWord: 'ô tô', targetWord: 'chỗ đỗ', ratio: '11 / 8',
    bg: 'linear-gradient(#e2e8f0, #cbd5e1)',
    dock: [16, 40, 68, '96 / 52'],
    target: () => PARKING,
    tokenPic: (i) => CAR(['#34d399', '#f87171', '#fb923c', '#facc15', '#a78bfa', '#38bdf8'][i % 6]),
  },
  cats: {
    token: 'r', tokenWord: 'con cá', targetWord: 'chú mèo', ratio: '1 / 1',
    bg: 'linear-gradient(#fef3c7 0 72%, #fcd34d 72%)',
    dock: [50, 54, 48, '80 / 44'],
    target: () => `<span class="sc-bounce">${CAT}</span><span class="sc-yay" aria-hidden="true">💛</span>`,
    tokenPic: () => FISH,
  },
  dogs: {
    token: 'l', tokenWord: 'chú chó', targetWord: 'ngôi nhà', ratio: '1 / 1',
    bg: 'linear-gradient(#bae6fd 0 70%, #86efac 70%)',
    dock: [24, 46, 52, '80 / 66'],
    target: () => `<span class="sc-bounce">${HOUSE}</span><span class="sc-yay" aria-hidden="true">💛</span>`,
    tokenPic: () => DOG,
  },
};

export const SCENE_CSS = `
    /* Nối có cảnh (worksheetScenes.js). */
    .ws-sc { display: flex; flex-direction: column; gap: 0.7rem; margin: 0.3rem 0 0.2rem; max-width: 52rem; }
    .ws-sc-targets { display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); gap: 0.7rem; padding: 0.8rem 0.7rem 0.6rem; border-radius: 0.9rem; border: 1px solid #cbd5e1; }
    @container (max-width: 560px) { .ws-sc-targets { grid-template-columns: repeat(min(var(--n), 3), minmax(0, 1fr)); } }
    .ws-sc-t { position: relative; display: flex; flex-direction: column; align-items: stretch; gap: 0.35rem; padding: 0.45rem; border: 2px solid #94a3b8; border-radius: 0.8rem; background: #fff; font: inherit; color: inherit; cursor: pointer; touch-action: manipulation; box-shadow: 0 4px 0 #cbd5e1; }
    .ws-sc-t:active { transform: translateY(2px); box-shadow: 0 2px 0 #cbd5e1; }
    .ws-sc-pic { position: relative; display: block; width: 100%; aspect-ratio: var(--ratio); }
    .ws-sc-pic > svg, .ws-sc-pic > span:not(.ws-sc-dock):not(.sc-yay) { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
    .ws-sc-pic span > svg { width: 100%; height: 100%; display: block; }
    .ws-sc-dock { position: absolute; left: var(--dl); top: var(--dt); width: var(--dw); aspect-ratio: var(--dr); display: flex; align-items: center; justify-content: center; border: 2px dashed rgba(255, 255, 255, 0.9); border-radius: 0.6rem; background: rgba(255, 255, 255, 0.18); z-index: 2; }
    .ws-sc-dock.ws-sc-full { border-color: transparent; background: none; }
    /* Vật đậu: hình chiếm trọn khung chỗ đậu, nhãn là huy hiệu nhỏ đè ở chân hình. */
    .ws-sc-dock .ws-sc-tok { position: relative; display: block; width: 100%; height: 100%; }
    .ws-sc-dock .ws-sc-tok svg { width: 100%; height: 100%; max-height: none; }
    .ws-sc-dock .ws-sc-tlab { position: absolute; left: 50%; bottom: -0.35em; transform: translateX(-50%); max-width: none; white-space: nowrap; font-size: 0.72em; line-height: 1.15; padding: 0.05em 0.4em; box-shadow: 0 1px 0 #eab308; }
    .ws-sc-lab { display: block; padding: 0.25rem 0.3rem; border-radius: 0.45rem; background: #f8fafc; border: 1px solid #e2e8f0; font-weight: 700; text-align: center; line-height: 1.3; min-height: 2.6em; display: flex; align-items: center; justify-content: center; }
    .ws-sc-tray { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; padding: 0.5rem; border-radius: 0.9rem; background: #f1f5f9; border: 1px dashed #cbd5e1; }
    .ws-sc-k { min-width: 6.5rem; max-width: 10.5rem; padding: 0.35rem 0.4rem 0.45rem; border: 2px solid #94a3b8; border-radius: 0.8rem; background: #fff; font: inherit; color: inherit; cursor: pointer; touch-action: manipulation; box-shadow: 0 4px 0 #cbd5e1; }
    .ws-sc-k:active { transform: translateY(2px); box-shadow: 0 2px 0 #cbd5e1; }
    .ws-sc-k.ws-sc-used { opacity: 0.28; box-shadow: none; border-style: dashed; }
    .ws-sc-tok { display: flex; flex-direction: column; align-items: center; gap: 0.15rem; }
    .ws-sc-tok svg { width: 100%; height: auto; max-height: 4.2rem; display: block; }
    /* Chữ in ngay trên hình vật cầm (labelOn): cỡ chữ theo bề rộng vật, đậu trong ổ khoá vẫn đọc được. */
    .ws-sc-on { position: relative; container-type: inline-size; }
    .ws-sc-k .ws-sc-on { width: 6.4rem; } /* container-type: bề rộng không lấy theo nội dung, phải đặt sẵn */
    .ws-sc-on .ws-sc-tlab, .ws-sc-dock .ws-sc-on .ws-sc-tlab { position: absolute; left: var(--lx); top: var(--ly); bottom: auto; transform: translate(-50%, -50%); padding: 0; border: none; background: none; box-shadow: none; font-size: 17cqw; font-weight: 900; line-height: 1; color: ${INK}; }
    .ws-sc-tlab { display: inline-block; max-width: 100%; padding: 0.05rem 0.5rem; border-radius: 0.7rem; background: #fef9c3; border: 1px solid #eab308; font-weight: 800; text-align: center; line-height: 1.25; box-sizing: border-box; }
    .ws-sc .ws-mi-sel { border-color: var(--ink); box-shadow: 0 0 0 4px #c7d2fe, 0 4px 0 #cbd5e1; background: #eef2ff; }
    .ws-sc-t.ws-mi-sel .ws-sc-dock:not(.ws-sc-full) { border-color: var(--ink); animation: scBlink 0.9s ease-in-out infinite; }
    .ws-sc-mark { display: flex; justify-content: center; gap: 0.3rem; min-height: 1.4em; }
    .ws-graded .ws-sc-t, .ws-graded .ws-sc-k { cursor: default; pointer-events: none; }
    .ws-sc-bad { border-color: var(--red); }
    .ws-sc-bad .ws-sc-pic { animation: scShake 0.5s 0.3s ease-in-out 2; }
    .ws-sc-ok { border-color: #16a34a; }
    @keyframes scBlink { 50% { background: #e0e7ff; } }
    @keyframes scShake { 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
    /* cửa mở */
    .sc-door { perspective: 40em; }
    .sc-door-leaf { position: absolute; left: 15%; top: 9.1%; width: 70%; height: 90.9%; transform-origin: left center; }
    .ws-sc-ok .sc-door-leaf { animation: scOpen 1.1s 0.5s ease-in-out forwards; }
    .ws-sc-ok.sc-k-doors .ws-sc-dock { animation: scTurn 0.5s ease-in-out forwards, scFade 0.4s 0.55s forwards; }
    @keyframes scOpen { to { transform: rotateY(-78deg); filter: brightness(0.85); } }
    @keyframes scTurn { to { transform: rotate(90deg); } }
    @keyframes scFade { to { opacity: 0; } }
    /* virus tan */
    .ws-sc-ok .sc-pop { animation: scPop 0.7s 0.5s ease-in forwards; }
    @keyframes scPop { 40% { transform: scale(1.12); } to { transform: scale(0); opacity: 0; } }
    .sc-yay { position: absolute; left: 50%; top: 40%; font-size: 2.2em; transform: translate(-50%, -50%) scale(0); opacity: 0; pointer-events: none; z-index: 3; }
    .ws-sc-ok .sc-yay { animation: scYay 0.9s 0.8s ease-out forwards; }
    @keyframes scYay { 60% { transform: translate(-50%, -80%) scale(1.3); opacity: 1; } to { transform: translate(-50%, -70%) scale(1); opacity: 1; } }
    /* hoa nở, bướm vỗ cánh */
    .ws-sc-ok .sc-petals { transform-origin: 40px 38px; animation: scSpin 1.2s 0.4s ease-in-out; }
    @keyframes scSpin { 50% { transform: rotate(30deg) scale(1.1); } }
    .sc-wing { transform-box: fill-box; }
    .sc-wing-l { transform-origin: right center; } .sc-wing-r { transform-origin: left center; }
    .ws-sc-ok .sc-wing { animation: scFlap 0.35s 0.4s ease-in-out 6 alternate; }
    @keyframes scFlap { to { transform: scaleX(0.45); } }
    /* ô tô bật đèn, mèo, nhà chó */
    .ws-sc-ok .sc-light { animation: scGlow 0.4s 0.5s ease-in-out 4 alternate; }
    @keyframes scGlow { to { fill: #fde047; } }
    .ws-sc-ok.sc-k-cars .ws-sc-dock { animation: scBump 0.5s 0.4s ease-in-out 2; }
    .ws-sc-ok.sc-k-cats .ws-sc-dock { animation: scEat 0.8s 0.5s ease-in forwards; }
    @keyframes scEat { to { transform: translate(-40%, -30%) scale(0.2); opacity: 0; } }
    .ws-sc-ok .sc-bounce { animation: scBump 0.5s 0.9s ease-in-out 2; }
    @keyframes scBump { 50% { transform: translateY(-6%); } }
    @media (prefers-reduced-motion: reduce) {
      .ws-sc-ok .sc-door-leaf { animation-duration: 2s; }
      .ws-sc-bad .ws-sc-pic { animation: none; }
      .ws-sc-ok .sc-wing, .ws-sc-ok .sc-light, .ws-sc-ok .sc-bounce, .ws-sc-ok.sc-k-cars .ws-sc-dock, .ws-sc-ok .sc-petals { animation: none; }
      .ws-sc-ok .sc-pop, .ws-sc-ok.sc-k-cats .ws-sc-dock { animation-duration: 1.6s; }
      .ws-sc-t.ws-mi-sel .ws-sc-dock:not(.ws-sc-full) { animation: none; background: #e0e7ff; }
    }
`;
