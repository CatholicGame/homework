/**
 * Bài 80 "Camping Under the Stars" (ôn các thì): Vườn quốc gia Ba Vì (núi ba đỉnh phía xa), đi từ trái sang phải:
 * cổng vườn (ô tô của bố dừng) → bãi cắm trại (bố và Tom dựng lều, Lan nấu mì trên bếp ga dã ngoại) → đống lửa trại
 * (cả nhà ngồi trên khúc gỗ, giỏ chuối, bụi cây có khỉ, cây cao) → dốc lên đồi ngắm bình minh.
 * Trời: chiều → tối (lửa trại) → nửa đêm (sao băng) → sáng hôm sau (mặt trời mọc trên đồi).
 * Cỡ theo thật: trẻ em ≈ 1,3 m = 122 đơn vị; lều 2 người cao ≈ 1 m, rộng 1,8 m; khỉ ≈ 50 cm; nải chuối ≈ 20 cm.
 * Toạ độ cảnh: rộng 2000, cao 315, sàn y = 282 (đỉnh đồi y = 242). Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, cloud, tree, bush, flowerAt, label, thought, night, BANANA, STAR } from '../kit.js';

const FLOOR = 282;
const HILL = 242;
const W = 2000;
const X = { gate: 470, car: 250, tent: 700, stove: 900, fire: 1090, basket: 1214, bush: 1280, tree: 1350, slope: 1450, top: 1650 };

Object.assign(CAST, {
  e080_tomDad: { adult: true, hair: 'short', hairC: '#E0A33A', top: 'shirt', shirt: '#22C55E', bottom: 'pants', bottomC: '#334155', shoe: '#44403C' },
  e080_tomMum: { adult: true, hair: 'bob', hairC: '#FCD34D', top: 'blouse', shirt: '#F9A8D4', bottom: 'pants', bottomC: '#475569', shoe: '#F5F5F4' },
});

// ── Đồ vật ─────────────────────────────────────────────────────────────────
/** Lều nhỏ (gốc = giữa đáy), cao 100, rộng 170. */
const TENT = (c = '#F97316', d = '#C2410C') => `<path d="M-85 0 L0 -100 L85 0Z" fill="${c}" stroke="${L}" stroke-width="1.4" stroke-linejoin="round"/>
  <path d="M0 -100 L-26 0 H26Z" fill="${d}" stroke="${L}" stroke-width="1"/><path d="M0 -100 L-10 0 M0 -100 L10 0" stroke="#7C2D12" stroke-width="1"/>
  <path d="M0 -100 V-110" stroke="${L}" stroke-width="2"/><path d="M-85 0 L-100 4 M85 0 L100 4" stroke="${L}" stroke-width="1"/>`;
const MINI_TENT = (ok) => `<g transform="translate(-6 18) scale(0.36)">${TENT()}</g>
  ${ok ? `<g transform="translate(26 -4)"><circle r="10" fill="#22C55E" stroke="${L}"/><path d="M-5 0 L-1 4 L6 -4" stroke="#fff" stroke-width="2.8" fill="none" stroke-linecap="round"/></g>`
    : `<g transform="translate(26 -4)"><circle r="10" fill="#EF4444" stroke="${L}"/><path d="M-4 -4 L4 4 M4 -4 L-4 4" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/></g>`}`;
/** Bếp ga dã ngoại + nồi mì (gốc = mặt bàn). */
const STOVE = `<rect x="-14" y="-8" width="28" height="8" rx="2" fill="#64748B" stroke="${L}" stroke-width="0.9"/><g class="e080-gas"><path d="M-8 -9 Q-6 -14 -4 -9 M-2 -9 Q0 -15 2 -9 M4 -9 Q6 -14 8 -9" stroke="#3B82F6" stroke-width="2" fill="none"/></g>
  <path d="M-15 -12 H15 L13 -30 H-13Z" fill="#94A3B8" stroke="${L}" stroke-width="1"/><path d="M-15 -26 H-20 M15 -26 H20" stroke="${L}" stroke-width="2"/><path d="M-13 -30 Q0 -34 13 -30" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/>`;
const BASKET = `<path d="M-16 -12 H16 L12 0 H-12Z" fill="#D97706" stroke="${L}" stroke-width="1"/><path d="M-14 -8 H14 M-13 -4 H13" stroke="#92400E" stroke-width="0.8"/>`;
const BUNCH = `<g transform="translate(-4 -16) rotate(-20) scale(0.8)">${BANANA}</g><g transform="translate(4 -18) rotate(10) scale(0.8)">${BANANA}</g><g transform="translate(0 -12) scale(0.8)">${BANANA}</g>`;
/** Khỉ nhìn nghiêng (mặt sang phải), gốc = chân, cao ≈ 48. */
const MONKEY = (banana = false) => `<g class="e080-mk"><path d="M-12 -14 Q-28 -12 -26 -30 Q-24 -40 -16 -38" stroke="${L}" stroke-width="4.4" fill="none" stroke-linecap="round"/><path d="M-12 -14 Q-28 -12 -26 -30 Q-24 -40 -16 -38" stroke="#A16207" stroke-width="2.8" fill="none" stroke-linecap="round"/>
  <path d="M-8 -6 L-10 0 M6 -6 L8 0" stroke="${L}" stroke-width="5" stroke-linecap="round"/><path d="M-8 -6 L-10 0 M6 -6 L8 0" stroke="#A16207" stroke-width="3.4" stroke-linecap="round"/>
  <ellipse cx="-1" cy="-16" rx="13" ry="11" fill="#A16207" stroke="${L}" stroke-width="1"/>
  <circle cx="8" cy="-34" r="10" fill="#A16207" stroke="${L}" stroke-width="1"/><ellipse cx="11" cy="-32" rx="6.4" ry="5.6" fill="#FDE6C8" stroke="${L}" stroke-width="0.6"/>
  <circle cx="-1" cy="-36" r="3.4" fill="#FDE6C8" stroke="${L}" stroke-width="0.7"/><circle cx="12" cy="-34" r="1.2" fill="#1F2937"/><path d="M12 -29 q2 1 4 0" stroke="${L}" stroke-width="0.8" fill="none"/>
  <path d="M6 -20 L16 -24" stroke="${L}" stroke-width="5" stroke-linecap="round"/><path d="M6 -20 L16 -24" stroke="#A16207" stroke-width="3.4" stroke-linecap="round"/>
  ${banana ? `<g transform="translate(20 -26) rotate(-30) scale(0.7)">${BANANA}</g>` : ''}</g>`;
/** Lửa trại (gốc = giữa đống củi). */
const FIRE = `<path d="M-26 -2 L22 -10 M-22 -10 L26 -2" stroke="#78350F" stroke-width="7" stroke-linecap="round"/><path d="M-26 -2 L22 -10 M-22 -10 L26 -2" stroke="${L}" stroke-width="1" stroke-linecap="round" fill="none"/>
  ${[[-18, 2], [-6, -2], [6, 2], [18, -2]].map(([x, y]) => `<circle cx="${x}" cy="${y + 2}" r="4.6" fill="#78716C" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <g class="e080-flames"><circle cy="-24" r="46" fill="#FDBA74" opacity="0.25"/><path class="e080-fl1" d="M-16 -8 Q-20 -30 -6 -46 Q-2 -30 4 -36 Q10 -52 6 -66 Q24 -44 18 -8Z" fill="#F97316" stroke="${L}" stroke-width="0.9"/>
    <path class="e080-fl2" d="M-8 -8 Q-10 -24 0 -34 Q4 -24 8 -28 Q12 -18 8 -8Z" fill="#FDE047"/></g>`;
/** Ghế khúc gỗ: hai khúc chồng nhau, cao 32 (≈ 35 cm). */
const LOG = (w = 90) => [0, -16].map((y) => `<rect x="${-w / 2}" y="${y - 16}" width="${w}" height="16" rx="8" fill="#92400E" stroke="${L}" stroke-width="1.1"/><ellipse cx="${w / 2 - 4}" cy="${y - 8}" rx="5" ry="7" fill="#D97706" stroke="${L}" stroke-width="0.8"/><path d="M${-w / 2 + 10} ${y - 10} H${w / 2 - 16}" stroke="#78350F" stroke-width="1"/>`).join('');
/** Ảnh cũ màu nâu: bố hồi sinh viên bên lều. */
const OLDPHOTO = `<rect x="-56" y="-36" width="112" height="76" rx="3" fill="#FEF3C7" stroke="${L}" stroke-width="1.2"/><rect x="-50" y="-30" width="100" height="58" fill="#E7C79A"/>
  <path d="M-50 10 Q-20 -6 0 6 T50 0 V28 H-50Z" fill="#C9A06A"/><g transform="translate(18 26) scale(0.34)">${TENT('#A16207', '#78350F')}</g>
  <g transform="translate(-22 4)">${headOnly('en_dad', { s: 0.85 })}</g><path d="M-30 18 Q-22 12 -14 18 L-12 28 H-32Z" fill="#B45309" stroke="${L}" stroke-width="0.6"/>`;
const PARENTS = `<g transform="translate(-30 0)">${headOnly('e080_tomDad', { s: 0.82 })}</g><g transform="translate(4 2)">${headOnly('e080_tomMum', { s: 0.78 })}</g><g transform="translate(40 18) scale(0.3)">${TENT()}</g>`;

const PROPS = {
  e080_hammer: `<g transform="translate(0 -2)"><path d="M0 -4 V16" stroke="#92400E" stroke-width="2.6" stroke-linecap="round"/><rect x="-6" y="14" width="12" height="6" rx="1.5" fill="#64748B" stroke="${L}" stroke-width="0.7"/></g>`,
  e080_spoon: `<g transform="rotate(180)"><path d="M0 -2 L0 18" stroke="#A16207" stroke-width="2" stroke-linecap="round"/><ellipse cx="0" cy="21" rx="3.4" ry="4.4" fill="#D97706" stroke="${L}" stroke-width="0.6"/></g>`,
};
const POSES = {
  e080_hammer: { R: [60, -10], L: [20, 10], dy: 24, head: 14 },
  e080_lookUp: { R: [40, 110], L: [40, 110], dy: 20, head: -14 },
  e080_sitA: { R: [40, 110], L: [40, 110], dy: 36 },
  e080_lookUpA: { R: [40, 110], L: [40, 110], dy: 36, head: -14 },
  e080_sitWish: { R: [24, -120], L: [24, -120], dy: 20, head: -6 },
  e080_wish: { R: [24, -120], L: [24, -120], head: -6 },
  e080_photo: { R: [100, 168], L: [10, 4], head: -4 },
  e080_laugh: { R: [24, -96], L: [24, -96], dy: 20, head: -8 },
};

function bg() {
  const stars = Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 71) % W}" cy="${14 + ((i * 37) % 90)}" r="${i % 3 ? 1.1 : 1.7}" fill="#FEF9C3"/>`).join('');
  return `
  <defs><linearGradient id="e080sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7DD3FC"/><stop offset="1" stop-color="#FDE68A"/></linearGradient></defs>
  <rect x="0" y="0" width="${W}" height="315" fill="url(#e080sky)"/>
  <g class="e080-stars">${stars}</g>
  <!-- mặt trời mọc sau đồi (sáng hôm sau) -->
  <g class="e080-sun"><circle cx="1860" cy="104" r="36" fill="#FDBA74" opacity="0.5"/><circle cx="1860" cy="104" r="24" fill="#FB923C" stroke="#F97316" stroke-width="2"/></g>
  ${cloud(300, 60, 0.9, 0)}${cloud(1000, 46, 0.8, 3)}${cloud(1600, 70, 0.7, 5)}
  <!-- núi Ba Vì ba đỉnh, rừng xa -->
  <path d="M-20 220 L180 120 L300 170 L420 96 L560 160 L700 110 L900 200 L1100 140 L1300 190 L1500 120 L1700 180 L1900 130 L2020 170 V282 H-20Z" fill="#6EE7B7" stroke="${L}" stroke-width="1"/>
  <path d="M-20 240 Q200 200 420 236 T860 232 T1300 238 T1800 230 T2020 236 V282 H-20Z" fill="#34D399" stroke="${L}" stroke-width="0.9"/>
  ${[60, 600, 820, 1180, 1420].map((x, i) => tree(x, 246, 0.6 + (i % 2) * 0.1, '')).join('')}
  <!-- đồi ngắm cảnh -->
  <path d="M-2 ${FLOOR - 4} H${X.slope} L${X.top} ${HILL - 4} H${W + 2} V316 H-2Z" fill="#4ADE80" stroke="${L}" stroke-width="1.1"/>
  <path d="M${X.slope} ${FLOOR + 6} L${X.top} ${HILL + 6} L${W} ${HILL + 6}" stroke="#16A34A" stroke-width="1" fill="none" stroke-dasharray="6 8"/>
  ${tree(1975, HILL - 2, 0.95)}${bush(1590, 264, 0.8, '#22C55E')}
  ${[1680, 1696, 1712, 1830, 1846, 1930].map((x, i) => flowerAt(x, HILL + 2, ['#F472B6', '#FACC15', '#F87171'][i % 3])).join('')}
  ${Array.from({ length: 30 }, (_, i) => `<path d="M${20 + i * 48} ${FLOOR + 14} l3 -7 l3 7" stroke="#16A34A" stroke-width="1.4" fill="none"/>`).join('')}
  <!-- đường xe + cổng vườn quốc gia -->
  <rect x="0" y="${FLOOR - 2}" width="${X.gate + 40}" height="22" fill="#D6D3D1" stroke="${L}"/>
  <g transform="translate(${X.gate} 0)"><rect x="-74" y="128" width="12" height="${FLOOR - 128}" fill="#92400E" stroke="${L}"/><rect x="62" y="128" width="12" height="${FLOOR - 128}" fill="#92400E" stroke="${L}"/>
    <rect x="-90" y="112" width="180" height="34" rx="5" fill="#166534" stroke="${L}" stroke-width="1.3"/>
    <text y="127" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="12" fill="#FEF9C3">BA VI</text>
    <text y="141" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="10" fill="#FEF9C3">NATIONAL PARK</text></g>
  <!-- lều: dựng dần lên -->
  <g transform="translate(${X.tent} ${FLOOR})"><path d="M-85 0 H85" stroke="#C2410C" stroke-width="4" stroke-linecap="round"/><g class="e080-tent">${TENT()}</g>
    <g class="e080-peg"><path d="M-100 4 V-4 M100 4 V-4" stroke="#475569" stroke-width="2.4"/></g></g>
  <!-- giỏ chuối, cây cao -->
  <g transform="translate(${X.basket} ${FLOOR})">${BASKET}<g class="e080-bunch">${BUNCH}</g></g>
  <g transform="translate(${X.tree} ${FLOOR})"><path d="M-12 0 Q-8 -80 -10 -150 L10 -150 Q8 -80 14 0Z" fill="#92400E" stroke="${L}" stroke-width="1.2"/>
    <path d="M0 -140 Q30 -150 50 -148" stroke="#92400E" stroke-width="6" fill="none" stroke-linecap="round"/>
    <g class="ek-sway" style="transform-origin:0px -150px"><circle cy="-186" r="44" fill="#16A34A" stroke="${L}"/><circle cx="-40" cy="-160" r="28" fill="#15803D" stroke="${L}"/><circle cx="44" cy="-166" r="30" fill="#22C55E" stroke="${L}"/></g></g>`;
}

function fg() {
  const lab = (k, x, y, t, c, s) => `<g class="e080-lb e080-lb-${k}">${label(x, y, t, c, s)}</g>`;
  return `
  <!-- bàn gấp + bếp ga -->
  <g transform="translate(${X.stove} 0)"><rect x="-30" y="226" width="60" height="6" rx="2" fill="#E5E7EB" stroke="${L}"/><path d="M-24 232 L18 ${FLOOR} M24 232 L-18 ${FLOOR}" stroke="#64748B" stroke-width="3"/>
    <g transform="translate(0 226)">${STOVE}<g class="e080-steam">${[-6, 0, 6].map((dx, i) => `<path class="ek-steam" style="animation-delay:${i * 0.5}s" d="M${dx} -34 q-4 -6 0 -12 q4 -6 0 -12" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g></g></g>
  <!-- khúc gỗ quanh lửa (che chân người ngồi), lửa -->
  <g transform="translate(${X.fire - 84} ${FLOOR})">${LOG(120)}</g>
  <g transform="translate(${X.fire + 76} ${FLOOR})">${LOG(96)}</g>
  <g transform="translate(${X.fire} ${FLOOR})"><g class="e080-fire">${FIRE}</g></g>
  <g class="e080-rustle">${bush(X.bush, FLOOR + 4, 1.3, '#16A34A')}</g>
  <!-- đêm -->
  ${night(0, W, 315, 1500)}
  <rect class="e080-mid" x="0" y="0" width="${W}" height="315" fill="#0F172A"/>
  <!-- ánh lửa sáng trên lớp đêm -->
  <radialGradient id="e080glow"><stop offset="0" stop-color="#FDBA74" stop-opacity="0.55"/><stop offset="1" stop-color="#FDBA74" stop-opacity="0"/></radialGradient>
  <g class="e080-glowN"><circle cx="${X.fire}" cy="${FLOOR - 40}" r="110" fill="url(#e080glow)"/></g>
  <!-- sao băng -->
  <g class="e080-shoot e080-shoot1"><path d="M0 0 L-70 -26" stroke="#FEF9C3" stroke-width="3" stroke-linecap="round" opacity="0.8"/><g transform="translate(0 0) scale(0.7)">${STAR('#FEF08A')}</g></g>
  <g class="e080-shoot e080-shoot2"><path d="M0 0 L-70 -26" stroke="#FEF9C3" stroke-width="3" stroke-linecap="round" opacity="0.8"/><g transform="translate(0 0) scale(0.7)">${STAR('#FEF08A')}</g></g>
  <!-- bong bóng nghĩ -->
  ${thought(370, 104, 110, 70, MINI_TENT(true), [364, 150], 'e080-th e080-th-minh')}
  ${thought(470, 92, 110, 70, MINI_TENT(false), [440, 150], 'e080-th e080-th-tom')}
  ${thought(X.tent + 90, 92, 150, 104, `<g transform="scale(0.9)">${OLDPHOTO}</g>`, [X.tent + 90, 136], 'e080-th e080-th-dad')}
  ${thought(1880, 100, 140, 86, PARENTS, [1790, 150], 'e080-th e080-th-par')}
  <!-- nhãn -->
  ${lab('park', X.gate, 92, 'camping', '#15803D', 16)}
  ${lab('before', 370, 54, 'before', '#15803D', 13)}
  ${lab('never', 480, 44, 'never', '#DC2626', 13)}
  ${lab('tent', X.tent - 60, 150, 'putting up the tent', '#C2410C', 13)}
  ${lab('noodles', X.stove + 10, 170, 'noodles', '#B45309', 14)}
  ${lab('student', X.tent + 90, 30 + 22, 'a student', '#7C3AED', 13)}
  ${lab('noise', X.bush - 30, 180, 'a strange noise', '#7C3AED', 14)}
  ${lab('monkey', X.bush, 170, 'a hungry monkey', '#B45309', 14)}
  ${lab('midnight', X.fire - 100, 84, 'midnight', '#4338CA', 16)}
  ${lab('star', X.fire - 100, 84, 'shooting star', '#CA8A04', 15)}
  ${lab('wish', X.fire + 96, 140, 'a wish', '#DB2777', 16)}
  ${lab('best', 1880, 100, 'the best trip', '#EA580C', 16)}
  ${lab('next', 1880, 160, 'next year', '#2563EB', 14)}`;
}

const LBS = ['park', 'before', 'never', 'tent', 'noodles', 'student', 'noise', 'monkey', 'midnight', 'star', 'wish', 'best', 'next'];
const CSS = `
.e080-lb { opacity: 0; transition: opacity .35s; }
${LBS.map((k) => `.st-lb-${k} .e080-lb-${k}`).join(', ')} { opacity: 1; }
.st-night .ek-night { opacity: 1; }
.e080-stars { opacity: 0; transition: opacity 1s; } .st-night .e080-stars { opacity: 1; }
.e080-mid { opacity: 0; transition: opacity 1s; pointer-events: none; } .st-mid .e080-mid { opacity: .28; }
.e080-sun { opacity: 0; transform: translateY(60px); transition: opacity 1.4s, transform 2s ease-out; }
.st-dawn .e080-sun { opacity: 1; transform: none; }
.e080-tent { transform: scaleY(.06); transform-box: fill-box; transform-origin: 50% 100%; transition: transform 3s cubic-bezier(.3,0,.4,1); }
.st-tent .e080-tent { transform: none; }
.e080-peg { opacity: 0; transition: opacity .3s; } .st-tent .e080-peg { opacity: 1; }
.e080-gas, .e080-steam { opacity: 0; transition: opacity .4s; } .st-cook .e080-gas, .st-cook .e080-steam { opacity: 1; }
.e080-fire .e080-flames { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: 50% 100%; transition: opacity .5s, transform .8s ease-out; }
.st-fire .e080-fire .e080-flames { opacity: 1; transform: none; }
.e080-fl1 { transform-box: fill-box; transform-origin: 50% 100%; animation: e080Fl .35s ease-in-out infinite alternate; }
.e080-fl2 { transform-box: fill-box; transform-origin: 50% 100%; animation: e080Fl .25s ease-in-out infinite alternate-reverse; }
@keyframes e080Fl { from { transform: scale(1, 1); } to { transform: scale(.9, 1.12); } }
.e080-glowN { opacity: 0; transition: opacity .6s; } .st-fire.st-night .e080-glowN { opacity: 1; }
.e080-bunch { transition: opacity .2s; } .st-banGone .e080-bunch { opacity: 0; }
.e080-shoot { opacity: 0; }
.e080-shoot1 { transform: translate(${X.fire + 40}px, 70px); } .e080-shoot2 { transform: translate(${X.fire + 140}px, 76px); }
.st-shoot1 .e080-shoot1 { animation: e080Shoot1 1.3s ease-in forwards; }
.st-shoot2 .e080-shoot2 { animation: e080Shoot2 1.3s ease-in forwards; }
@keyframes e080Shoot1 { 0% { opacity: 0; transform: translate(${X.fire + 40}px, 70px); } 15% { opacity: 1; } 100% { opacity: 0; transform: translate(${X.fire + 200}px, 130px); } }
@keyframes e080Shoot2 { 0% { opacity: 0; transform: translate(${X.fire + 140}px, 76px); } 15% { opacity: 1; } 100% { opacity: 0; transform: translate(${X.fire + 290}px, 136px); } }
.e080-th { opacity: 0; transition: opacity .35s; }
.st-th-minh .e080-th-minh, .st-th-tom .e080-th-tom, .st-th-dad .e080-th-dad, .st-th-par .e080-th-par { opacity: 1; }
.e080-rustle { transform-box: fill-box; }
.st-rustle .e080-rustle { animation: e080Rus .12s linear infinite alternate; }
@keyframes e080Rus { from { transform: translateX(-2px); } to { transform: translateX(2px); } }
.es-thing.is-walk .e080-mk { animation: e080Hop .22s ease-in-out infinite alternate; }
@keyframes e080Hop { to { transform: translateY(-4px); } }
@media (prefers-reduced-motion: reduce) {
  .e080-fl1, .e080-fl2 { animation-duration: 1s; }
  .st-shoot1 .e080-shoot1, .st-shoot2 .e080-shoot2 { animation-duration: 2.2s; }
  .es-thing.is-walk .e080-mk { animation-duration: .5s; }
}
`;

const lb = (st, k, on = true) => st.set(`st-lb-${k}`, on);
const ALL = ['minh', 'tom', 'lan', 'mum', 'dad'];

const BEATS = [
  { key: ['went camping', 'Ba Vi National Park'], icon: '🏕️', label: 'camping', async play(st) {
    st.look(300);
    await st.loop('car-go', () => st.walk('car', X.car, { speed: 150, follow: false }), { vol: 0.7 });
    st.sfx('door-open', { vol: 0.6 });
    { const C = st.a('car'); C.custom = ''; C.build(); }
    for (const id of ALL) st.show(id, true);
    st.fx('poof', X.car + 70, 240, { quiet: true });
    lb(st, 'park');
    st.pose('minh', 'cheer'); st.pose('tom', 'cheer'); st.mood('minh', 'joy'); st.mood('tom', 'joy');
    st.sfx('birds', { vol: 0.6 });
    await st.wait(1400);
    st.pose('minh', 'stand'); st.pose('tom', 'stand');
  } },
  { key: ['has camped there before', 'never slept in a tent', 'Minh invited him'], icon: '⛺', label: 'never slept in a tent', async play(st) {
    lb(st, 'park', false);
    st.look(360);
    st.pose('minh', 'me'); st.set('st-th-minh'); lb(st, 'before'); st.sfx('ding', { vol: 0.5 });
    await st.wait(1300);
    st.pose('minh', 'stand');
    st.set('st-th-tom'); lb(st, 'never'); st.act('tom', 'no'); st.mood('tom', 'sad'); st.sfx('buzz-no', { vol: 0.4 });
    await st.wait(1300);
    st.act('tom', null); st.set('st-th-minh', false); st.set('st-th-tom', false); lb(st, 'before', false); lb(st, 'never', false);
    st.face('minh', -1); st.pose('minh', 'wave'); st.act('minh', 'wave'); st.mood('minh', 'joy'); st.sfx('pop', { vol: 0.4 });
    await st.say('minh', 'Come with us, Tom!', 1400);
    st.act('minh', null); st.pose('minh', 'stand'); st.mood('tom', 'joy');
    await Promise.all([
      st.walk('minh', 560, { speed: 140, lead: 160 }),
      st.walk('tom', 610, { speed: 140, follow: false }),
      st.walk('dad', X.tent + 104, { speed: 150, follow: false }),
      st.walk('lan', X.stove - 46, { speed: 150, follow: false }),
      st.walk('mum', X.fire - 82, { speed: 140, follow: false }),
    ]);
  } },
  { key: ['putting up the tent', 'cooked noodles on a stove'], icon: '🍜', label: 'tent and noodles', async play(st) {
    st.look(X.tent + 120);
    st.face('tom', 1); st.face('dad', -1); st.face('lan', 1);
    st.hold('dad', 'e080_hammer'); st.hold('tom', 'e080_hammer');
    st.pose('dad', 'e080_hammer'); st.pose('tom', 'e080_hammer'); st.act('dad', 'dig'); st.act('tom', 'dig');
    st.set('st-tent'); lb(st, 'tent');
    st.hold('lan', 'e080_spoon'); st.pose('lan', 'stir'); st.act('lan', 'stir'); st.set('st-cook'); lb(st, 'noodles');
    st.sfx('click', { vol: 0.5 });
    for (let i = 0; i < 6; i++) { st.sfx('knock', { vol: 0.5, rate: 1.2 }); if (i === 1) st.sfx('pot-stir', { vol: 0.5 }); await st.wait(500); }
    st.sfx('sizzle', { vol: 0.4 });
    await st.wait(500);
    st.act('dad', null); st.act('tom', null); st.hold('dad', null); st.hold('tom', null);
    st.pose('dad', 'stand'); st.pose('tom', 'cheer'); st.mood('tom', 'joy');
  } },
  { key: ['used to camp there', 'when he was a student'], icon: '📷', label: 'used to camp', async play(st) {
    lb(st, 'tent', false); lb(st, 'noodles', false); st.act('lan', null);
    st.look(X.tent + 120);
    st.pose('tom', 'stand'); st.face('dad', 1);
    st.pose('dad', 'think'); st.mood('dad', 'joy'); st.sfx('pop', { vol: 0.5 });
    st.set('st-th-dad');
    await st.wait(500);
    st.sfx('camera', { vol: 0.6 }); lb(st, 'student');
    await st.wait(1800);
  } },
  { key: ['sitting around the fire', 'strange noise'], icon: '🔥', label: 'strange noise', async play(st) {
    st.set('st-th-dad', false); lb(st, 'student', false);
    st.hold('lan', null); st.set('st-cook', false); st.pose('dad', 'stand');
    st.set('st-night'); st.set('st-fire'); st.sfx('sizzle', { vol: 0.5 });
    st.look(X.fire + 40, { dur: 1400 });
    await Promise.all([
      st.walk('lan', X.fire - 42, { speed: 140, follow: false }),
      st.walk('minh', X.fire + 50, { speed: 140, follow: false }),
      st.walk('tom', X.fire + 96, { speed: 140, follow: false }),
      st.walk('dad', X.fire - 124, { speed: 130, follow: false }),
    ]);
    st.face('mum', 1); st.face('lan', 1); st.face('dad', 1); st.face('minh', -1); st.face('tom', -1);
    for (const id of ALL) st.pose(id, id === 'mum' || id === 'dad' ? 'e080_sitA' : 'sit');
    await st.wait(600);
    st.set('st-rustle'); lb(st, 'noise'); st.sfx('sweep', { vol: 0.8 });
    for (const id of ALL) st.mood(id, 'wow');
    st.face('minh', 1); st.face('tom', 1);
    await st.wait(1400);
  } },
  { key: ['hungry monkey', 'wanted their bananas'], icon: '🐒', label: 'hungry monkey', async play(st) {
    lb(st, 'noise', false); st.set('st-rustle', false);
    st.look(X.fire + 80);
    st.show('mk', true); st.sfx('monkey', { vol: 0.7 }); lb(st, 'monkey');
    await st.walk('mk', X.basket + 14, { speed: 90, follow: false });
    st.set('st-banGone'); st.show('mk', false); st.place('mk2', X.basket + 14); st.show('mk2', true); st.face('mk2', 1); st.sfx('pop', { vol: 0.4 });
    await st.wait(300);
    await st.walk('mk2', X.tree - 4, { speed: 140, follow: false });
    st.sfx('ladder', { vol: 0.5, rate: 1.4 });
    await st.walk('mk2', X.tree, { y: FLOOR - 140, speed: 150, follow: false });
    await st.walk('mk2', X.tree + 32, { y: 131, speed: 80, follow: false });
    st.sfx('monkey', { vol: 0.5 });
    for (const id of ALL) st.mood(id, 'joy');
    st.pose('lan', 'e080_laugh'); st.sfx('giggle', { vol: 0.7 });
    await st.wait(1000);
    st.pose('lan', 'sit');
  } },
  { key: ['At midnight', 'pointed at the sky'], icon: '🌌', label: 'midnight', async play(st) {
    lb(st, 'monkey', false);
    st.set('st-mid'); lb(st, 'midnight'); st.sfx('crickets', { vol: 0.7 });
    st.look(X.fire + 40);
    await st.wait(900);
    st.face('lan', 1); st.pose('lan', 'pointUp'); st.act('lan', 'point'); st.mood('lan', 'wow'); st.sfx('pop', { vol: 0.4 });
    await st.wait(1500);
    st.act('lan', null);
  } },
  { key: ['look carefully', 'shooting star'], icon: '🌠', label: 'shooting star', async play(st) {
    lb(st, 'midnight', false);
    st.look(X.fire + 40);
    st.say('lan', 'Look carefully!', 1500);
    for (const id of ['minh', 'tom', 'mum', 'dad']) { st.pose(id, id === 'mum' || id === 'dad' ? 'e080_lookUpA' : 'e080_lookUp'); st.mood(id, 'happy'); }
    await st.wait(1300);
    st.set('st-shoot1'); st.sfx('whoosh', { vol: 0.6 });
    await st.wait(500);
    lb(st, 'star'); st.sfx('ding', { vol: 0.5 });
    for (const id of ALL) st.mood(id, 'wow');
    await st.wait(1000);
  } },
  { key: ['Tom saw one', 'made a wish'], icon: '✨', label: 'a wish', async play(st) {
    lb(st, 'star', false);
    st.look(X.fire + 40);
    st.set('st-shoot2'); st.sfx('whoosh', { vol: 0.6 });
    st.pose('tom', 'pointUp'); st.mood('tom', 'wow');
    await st.wait(1000);
    st.pose('tom', 'e080_sitWish'); st.mood('tom', 'shut'); lb(st, 'wish'); st.sfx('sparkle', { vol: 0.6 });
    st.fx('sparkle', X.fire + 98, 160, { quiet: true });
    await st.wait(1500);
  } },
  { key: ['best trip I have ever had'], icon: '🌅', label: 'best trip', async play(st) {
    lb(st, 'wish', false); st.set('st-shoot1', false); st.set('st-shoot2', false);
    st.set('st-mid', false); st.set('st-night', false); st.set('st-fire', false); st.set('st-dawn');
    st.sfx('birds', { vol: 0.7 });
    for (const id of ALL) { st.pose(id, 'stand'); st.mood(id, 'happy'); }
    st.look(X.slope + 60, { dur: 1600 });
    await Promise.all([
      (async () => { await st.walk('tom', X.slope, { speed: 140, follow: false }); await st.walk('tom', X.top, { y: HILL, speed: 120, follow: false }); await st.walk('tom', 1764, { speed: 130, lead: 60 }); })(),
      (async () => { await st.walk('minh', X.slope - 30, { speed: 140, follow: false }); await st.walk('minh', X.top - 20, { y: HILL + 4, speed: 120, follow: false }); await st.walk('minh', 1700, { speed: 130, follow: false }); })(),
    ]);
    st.face('tom', 1); st.face('minh', 1);
    st.pose('tom', 'cheer'); st.act('tom', 'jump'); st.mood('tom', 'joy'); st.sfx('cheer', { vol: 0.6 }); lb(st, 'best');
    await st.say('tom', 'The best trip ever!', 1600);
    st.act('tom', null);
  } },
  { key: ['Next year', 'bring my parents'], icon: '👨‍👩‍👦', label: 'bring my parents', async play(st) {
    lb(st, 'best', false);
    st.look(1800);
    st.hold('tom', 'phone'); st.pose('tom', 'e080_photo'); st.mood('tom', 'joy');
    await st.wait(500);
    st.sfx('camera', { vol: 0.6 }); st.fx('sparkle', 1800, 150, { quiet: true });
    await st.wait(500);
    st.set('st-th-par'); lb(st, 'next'); st.sfx('pop', { vol: 0.5 });
    st.hold('tom', null); st.pose('tom', 'me');
    st.pose('minh', 'clap'); st.act('minh', 'clap'); st.sfx('clap', { vol: 0.5 });
    await st.wait(1500);
    st.act('minh', null);
  } },
];

export default {
  id: 'en080', worldW: W, floor: FLOOR, viewTop: 40, camStart: 60, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 2, 4, 5, 8, 10],
  cast: [
    { id: 'car', kind: 'car', x: -120, y: FLOOR + 4, svg: headOnly('en_dad_home', { s: 0.8 }) },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: X.car + 120, s: 0.95, face: -1 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: X.car + 70, s: 0.95 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.car + 30, s: 1.06 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.car + 170 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: X.car + 220, face: -1 },
    { id: 'mk', kind: 'thing', x: X.bush, svg: MONKEY(false), box: [-30, -50, 60, 52], face: -1 },
    { id: 'mk2', kind: 'thing', x: X.basket, svg: MONKEY(true), box: [-30, -50, 60, 52] },
  ],
  init(st) {
    for (const id of ALL) st.show(id, false);
    st.show('mk', false); st.show('mk2', false);
  },
};
