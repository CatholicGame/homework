/**
 * Bài 9 "I Can Swim": một công viên liền mạch từ trái sang phải: bãi cỏ (chạy, sút bóng, giá vẽ) · hồ (Minh chưa biết bơi,
 * Lan bơi) · bờ hồ có bếp nướng (Lan nấu ăn, sút trượt) · sông (Tom bơi giỏi) · đường xe đạp (Tom đạp xe, Lucky chạy nhảy) ·
 * cây to (Lucky không trèo được, Kitty trèo) · bể bơi (Kitty sợ nước; Minh và bố, Minh bơi được).
 * Toạ độ cảnh: rộng 2700, sàn y = 282. Người đứng trong nước: lớp nước phía trước (fg) che nửa dưới người.
 * Trạng thái cảnh là class st-* trên <svg>; với đồ vật (kind 'thing') dùng st.dog(id, 'sit') làm cờ is-sit.
 */
import { KIT_CSS, L, sky, cloud, tree, bush, flowerAt, sun, grass, label, STAR } from '../kit.js';
import { sideSvg, catSvg } from '../rig.js';

const FLOOR = 282;
const W = 2720;
const LAKE = [840, 1200], RIVER = [1400, 1640], POOL = [2430, 2700];
const SURF = 216; // mặt nước phía trước (che người từ ngực trở xuống)

// ── Đồ vật ────────────────────────────────────────────────────────────────
const FOOTBALL = `<circle r="9" fill="#fff" stroke="${L}" stroke-width="1"/><path d="M0 -3.4 l3.2 2.3 -1.2 3.8 h-4 l-1.2 -3.8Z" fill="#1F2937"/>
  <path d="M0 -3.4 V-9 M3.2 -1.1 L8.4 -2.8 M2 2.7 L5.2 7.2 M-2 2.7 L-5.2 7.2 M-3.2 -1.1 L-8.4 -2.8" stroke="#1F2937" stroke-width="0.9"/>`;
const ball = `<g transform="translate(0 -9)"><g class="e009-roll">${FOOTBALL}</g></g>`;
const wheel = (x) => `<g transform="translate(${x} -15)"><g class="e009-wheel"><circle r="15" fill="none" stroke="#1F2937" stroke-width="3.4"/>
  <circle r="15" fill="none" stroke="${L}" stroke-width="0.6"/><circle r="2.4" fill="#94A3B8"/><path d="M-14 0 H14 M0 -14 V14 M-10 -10 L10 10 M-10 10 L10 -10" stroke="#94A3B8" stroke-width="0.9"/></g></g>`;
/** Xe đạp nhìn nghiêng (đầu xe bên phải), gốc ở mặt đất giữa hai bánh. */
const bikeFrame = `${wheel(-27)}${wheel(27)}
  <path d="M-27 -15 L-6 -15 L-12 -44 M-6 -15 L18 -42 L-12 -42 M27 -15 L18 -42 L16 -52" stroke="#EF4444" stroke-width="3.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M-27 -15 L-6 -15 L-12 -44 M-6 -15 L18 -42 L-12 -42 M27 -15 L18 -42 L16 -52" stroke="${L}" stroke-width="0.6" fill="none"/>
  <path d="M10 -54 H22" stroke="#1F2937" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M-20 -46 H-4" stroke="#1F2937" stroke-width="4.4" stroke-linecap="round"/>
  <g transform="translate(-6 -15)"><circle r="4.4" fill="#475569" stroke="${L}" stroke-width="0.7"/></g>`;
// Tom ngồi trên xe: dáng nghiêng thật (rig.js sideSvg); chân tự đạp khi xe chạy (.is-walk), tay giữ ghi-đông (CSS bên dưới)
const BIKE = `<g>${bikeFrame}</g>`;
const BIKE_TOM = `<g>${bikeFrame}<g class="e009-rider" transform="translate(-10 -4) scale(0.95)">${sideSvg('en_tom_home')}</g></g>`;
// Kitty trèo cây (mèo dựng đứng ôm thân cây) rồi ngồi trên cành
const KITTY_UP = `<g class="e009-kc"><g transform="translate(16 -8) rotate(-90)">${catSvg()}</g></g>
  <g class="e009-kp" transform="translate(30 -132)">${catSvg()}</g>`;

/** Nhãn chữ bật lên trong một câu (class st-xxx bật / tắt). */
const pop = (cls, x, y, text, c, size = 18) => `<g class="e009-pop ${cls}">${label(x, y, text, c, size)}</g>`;
const bigTree = (x) => `<g transform="translate(${x} ${FLOOR})">
  <path d="M-12 0 Q-8 -80 -10 -170 H10 Q8 -80 12 0Z" fill="#A16207" stroke="${L}" stroke-width="1.2"/>
  <path d="M6 -124 Q30 -132 58 -126" stroke="#A16207" stroke-width="9" stroke-linecap="round" fill="none"/>
  <path d="M6 -124 Q30 -132 58 -126" stroke="${L}" stroke-width="0.8" fill="none" opacity="0.6"/>
  <g class="ek-sway" style="transform-origin:0 -150px"><circle cx="0" cy="-196" r="48" fill="#22C55E" stroke="${L}"/><circle cx="-38" cy="-168" r="28" fill="#16A34A" stroke="${L}"/>
  <circle cx="44" cy="-172" r="30" fill="#4ADE80" stroke="${L}"/><circle cx="-10" cy="-214" r="5" fill="#EF4444"/><circle cx="22" cy="-190" r="5" fill="#EF4444"/></g></g>`;

function bg() {
  const [l0, l1] = LAKE, [r0, r1] = RIVER, [p0, p1] = POOL;
  const waves = (x0, x1, y) => Array.from({ length: Math.floor((x1 - x0) / 46) }, (_, i) => `<path d="M${x0 + 14 + i * 46} ${y + (i % 2) * 10} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('');
  return `
  ${sky(0, W, 315, 'e009sky')}
  <path d="M0 196 ${Array.from({ length: 14 }, (_, i) => `Q${i * 200 + 100} ${i % 2 ? 150 : 166} ${i * 200 + 200} 192`).join(' ')} V260 H0Z" fill="#A7E8C8" opacity="0.8"/>
  ${[[300, 110], [330, 124], [1150, 96], [1180, 108], [1900, 104], [2520, 112]].map(([x, y]) => `<path d="M${x} ${y} q5 -6 10 0 q5 -6 10 0" stroke="${L}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`).join('')}
  <g transform="translate(640 66)">${sun(24)}</g>
  ${cloud(160, 56, 1, 0)}${cloud(1020, 44, 0.9, 3)}${cloud(1560, 70, 0.8, 5)}${cloud(2100, 40, 1, 2)}${cloud(2560, 66, 0.8, 6)}
  ${grass(0, l0, FLOOR)}${grass(l1, r0 - l1, FLOOR)}${grass(r1, p0 - r1, FLOOR)}
  <!-- Bãi cỏ: cây, hoa, khung thành nhỏ, giá vẽ -->
  ${tree(36, FLOOR - 6, 1.05)}${tree(330, FLOOR - 6, 0.9, '#F59E0B')}${bush(220, FLOOR - 4, 0.8)}
  ${[70, 150, 260, 300, 420, 470].map((x, i) => flowerAt(x, FLOOR + 14, ['#F472B6', '#FDE047', '#A78BFA'][i % 3])).join('')}
  <g transform="translate(600 ${FLOOR})">
    <rect x="-46" y="-74" width="92" height="74" fill="#fff" opacity="0.35"/>
    <g class="e009-net">${Array.from({ length: 9 }, (_, i) => `<path d="M${-46 + i * 11.5} -74 V0" stroke="#CBD5E1" stroke-width="1"/>`).join('')}${Array.from({ length: 6 }, (_, i) => `<path d="M-46 ${-74 + i * 13} H46" stroke="#CBD5E1" stroke-width="1"/>`).join('')}</g>
    <path d="M-46 0 V-74 H46 V0" stroke="#fff" stroke-width="5" fill="none"/><path d="M-46 0 V-74 H46 V0" stroke="${L}" stroke-width="0.8" fill="none"/>
  </g>
  <g transform="translate(748 ${FLOOR})">
    <path d="M-24 0 L-6 -134 M24 0 L6 -134 M0 -120 L14 0" stroke="#B45309" stroke-width="4" stroke-linecap="round"/>
    <rect x="-34" y="-128" width="68" height="66" rx="3" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <rect x="-36" y="-62" width="72" height="6" rx="2" fill="#B45309" stroke="${L}" stroke-width="0.8"/>
    <g stroke="#1F2937" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path class="e009-d1" d="M-14 -102 L-12 -114 L-5 -106 M5 -106 L12 -114 L14 -102"/>
      <circle class="e009-d2" cx="0" cy="-98" r="14"/>
      <path class="e009-d3" d="M-5 -100 v1 M5 -100 v1 M-2 -93 q2 2 4 0 M-18 -96 h-9 M18 -96 h9 M-17 -92 l-8 2 M17 -92 l8 2"/>
      <path class="e009-d4" d="M-10 -86 Q-18 -68 -6 -66 H8 Q18 -68 10 -86"/>
      <path class="e009-d5" d="M10 -70 Q26 -70 22 -86"/>
    </g>
  </g>
  <!-- Hồ -->
  <path d="M${l0} 210 Q${(l0 + l1) / 2} 200 ${l1} 210 V315 H${l0}Z" fill="#38BDF8" stroke="${L}"/>${waves(l0, l1, 214)}
  ${[l0 + 8, l1 - 14].map((x) => `<path d="M${x} 214 q-3 -26 2 -40 M${x + 6} 214 q2 -22 -1 -32" stroke="#16A34A" stroke-width="2.4" fill="none"/><ellipse cx="${x + 1}" cy="176" rx="2.6" ry="7" fill="#92400E"/>`).join('')}
  <!-- Bờ hồ: bếp nướng -->
  ${tree(1360, FLOOR - 6, 0.8)}
  <g transform="translate(1278 ${FLOOR})">
    <path d="M-20 0 L-12 -60 M20 0 L12 -60 M0 -60 V0" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
    <path d="M-26 -72 H26 Q24 -56 0 -56 Q-24 -56 -26 -72Z" fill="#1F2937" stroke="${L}"/>
    <path d="M-24 -72 H24" stroke="#94A3B8" stroke-width="2"/>
    <g transform="translate(0 -73)"><path d="M-15 -16 H15 V-2 Q15 1 12 1 H-12 Q-15 1 -15 -2Z" fill="#F97316" stroke="${L}"/><path d="M-20 -13 H-15 M15 -13 H20" stroke="${L}" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="0" cy="-16" rx="15" ry="3.4" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/></g>
    <g class="e009-cook"><g transform="translate(0 -96)">${[-7, 0, 7].map((dx, i) => `<path class="ek-steam" style="animation-delay:${i * 0.5}s" d="M${dx} 0 q-5 -8 0 -16 q5 -8 0 -16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}</g>
      <g transform="translate(0 -62)">${[-14, -4, 6, 15].map((x) => `<path d="M${x} 0 q3 -6 0 -10 q-3 4 0 10Z" fill="#F59E0B" opacity="0.9"/>`).join('')}</g></g>
  </g>
  <!-- Sông -->
  <path d="M${r0} 212 H${r1} V315 H${r0}Z" fill="#0EA5E9" stroke="${L}"/>${waves(r0, r1, 218)}
  <!-- Đường xe đạp -->
  <rect x="${r1}" y="${FLOOR - 4}" width="${p0 - r1 - 120}" height="10" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>
  ${bush(1820, FLOOR - 6, 0.9, '#16A34A')}${tree(2020, FLOOR - 6, 0.85, '#F59E0B')}
  <g transform="translate(2100 ${FLOOR})"><rect x="-28" y="-16" width="56" height="16" rx="8" fill="#A16207" stroke="${L}"/><ellipse cx="28" cy="-8" rx="5" ry="8" fill="#FDE68A" stroke="${L}"/><path d="M-18 -10 h22" stroke="${L}" stroke-width="0.7"/></g>
  ${bigTree(2200)}
  <!-- Bể bơi -->
  <rect x="${p0 - 120}" y="${FLOOR - 6}" width="${p1 - p0 + 140}" height="${315 - FLOOR + 6}" fill="#E2E8F0" stroke="${L}"/>
  ${Array.from({ length: 13 }, (_, i) => `<path d="M${p0 - 120 + i * 34} ${FLOOR - 6} V315" stroke="#CBD5E1"/>`).join('')}
  <g>${Array.from({ length: 17 }, (_, i) => `<rect x="${p0 - 110 + i * 26}" y="${FLOOR - 112}" width="6" height="${86}" fill="#fff" stroke="${L}" stroke-width="0.7"/>`).join('')}
    <rect x="${p0 - 116}" y="${FLOOR - 104}" width="${430}" height="5" fill="#93C5FD" stroke="${L}" stroke-width="0.7"/></g>
  ${label(p0 - 104, FLOOR - 128, 'POOL', '#0284C7', 20)}
  <g transform="translate(${p1 - 30} ${FLOOR - 92})"><circle r="14" fill="none" stroke="#EF4444" stroke-width="7"/><circle r="14" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="11 11"/></g>
  <g transform="translate(${p0 - 150} ${FLOOR})"><path d="M0 0 V-120" stroke="#78716C" stroke-width="3"/><path d="M-44 -116 Q0 -150 44 -116Z" fill="#FB7185" stroke="${L}"/><path d="M-15 -116 Q0 -146 15 -116" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/></g>
  <path d="M${p0} 214 H${p1} V315 H${p0}Z" fill="#7DD3FC" stroke="${L}"/>${waves(p0, p1, 222)}
  <g transform="translate(${p0 + 12} 0)"><path d="M0 ${FLOOR - 20} V196 Q0 186 10 186 M12 ${FLOOR - 20} V196 Q12 186 22 186" stroke="#94A3B8" stroke-width="3" fill="none"/></g>
  <!-- Nhãn chữ theo câu -->
  ${pop('e009-lName', 120, 104, 'Minh', '#EA580C', 22)}
  ${pop('e009-lFast', 470, 120, 'fast!', '#16A34A', 20)}
  ${pop('e009-lGoal', 600, 168, 'GOAL!', '#DC2626', 18)}
  ${pop('e009-lCat', 748, 130, 'a cat', '#7C3AED', 16)}
  ${pop('e009-lNo', 818, 118, "can't swim", '#DC2626', 16)}
  ${pop('e009-lSwimL', 1020, 130, 'swim', '#0284C7', 18)}
  ${pop('e009-lCook', 1262, 118, 'cook', '#EA580C', 18)}
  ${pop('e009-lNoF', 1320, 118, "can't", '#DC2626', 18)}
  ${pop('e009-lWell', 1560, 132, 'very well', '#16A34A', 18)}
  ${pop('e009-lBike', 1840, 132, 'bike', '#DC2626', 18)}
  ${pop('e009-lJump', 2080, 150, 'run and jump', '#2563EB', 16)}
  ${pop('e009-lNoC', 2150, 128, "can't climb", '#DC2626', 15)}
  ${pop('e009-lClimb', 2290, 100, 'climb', '#16A34A', 16)}
  ${pop('e009-lNoS', 2400, 150, "can't swim", '#DC2626', 15)}
  ${pop('e009-lNext', 2372, 102, 'next to me', '#7C3AED', 16)}
  ${pop('e009-lIn', 2520, 104, 'in the water', '#0284C7', 16)}
  ${['One', 'two', 'three'].map((t, i) => pop(`e009-n${i + 1}`, 2460 + i * 76, 100, t, ['#DC2626', '#16A34A', '#2563EB'][i], 18)).join('')}
  ${pop('e009-lNow', 2600, 104, 'I can swim!', '#16A34A', 16)}
  <g class="e009-stars">${[2470, 2570, 2670].map((x, i) => `<g transform="translate(${x} ${96 + (i % 2) * 14}) scale(1.6)">${STAR()}</g>`).join('')}</g>`;
}

/** Lớp trước nhân vật: mặt nước phía trước (che nửa dưới người đang bơi / lội). */
function fg() {
  const front = ([x0, x1], c) => `<rect x="${x0}" y="${SURF}" width="${x1 - x0}" height="${315 - SURF}" fill="${c}"/>
    <path d="M${x0} ${SURF} H${x1}" stroke="#E0F2FE" stroke-width="3"/>
    <g class="ek-wave">${Array.from({ length: Math.floor((x1 - x0) / 50) }, (_, i) => `<path d="M${x0 + 18 + i * 50} ${SURF + 22 + (i % 3) * 18} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
  const bank = (x, dir) => `<path d="M${x} ${SURF - 2} Q${x + dir * 14} ${SURF + 30} ${x + dir * 6} 315 H${x - dir * 10} V${SURF - 2}Z" fill="#86EFAC" stroke="${L}"/>`;
  return `${front(LAKE, '#38BDF8')}${bank(LAKE[0], 1)}${bank(LAKE[1], -1)}
  ${front(RIVER, '#0EA5E9')}${bank(RIVER[0], 1)}${bank(RIVER[1], -1)}
  ${front(POOL, '#7DD3FC')}<rect x="${POOL[0] - 6}" y="${SURF - 4}" width="8" height="${315 - SURF + 4}" fill="#E2E8F0" stroke="${L}"/><rect x="${POOL[1] - 2}" y="${SURF - 4}" width="22" height="${315 - SURF + 4}" fill="#E2E8F0" stroke="${L}"/>`;
}

const CSS = `
.e009-pop { opacity: 0; transform: translateY(10px); transition: opacity .35s, transform .35s cubic-bezier(.3,1.6,.6,1); }
.st-name .e009-lName, .st-fast .e009-lFast, .st-goal .e009-lGoal, .st-cat .e009-lCat, .st-noSwim .e009-lNo, .st-swimL .e009-lSwimL,
.st-cook .e009-lCook, .st-noFoot .e009-lNoF, .st-well .e009-lWell, .st-bike .e009-lBike, .st-jump .e009-lJump, .st-noClimb .e009-lNoC,
.st-climb .e009-lClimb, .st-noSwimC .e009-lNoS, .st-next .e009-lNext, .st-in .e009-lIn, .st-n1 .e009-n1, .st-n2 .e009-n2, .st-n3 .e009-n3,
.st-now .e009-lNow { opacity: 1; transform: none; }
.st-goal .e009-net { animation: e009Net .12s linear 6 alternate; }
@keyframes e009Net { to { transform: translateX(3px); } }
[class^="e009-d"] { opacity: 0; transition: opacity .3s; }
.st-draw .e009-d1 { opacity: 1; transition-delay: .2s; } .st-draw .e009-d2 { opacity: 1; transition-delay: .55s; }
.st-draw .e009-d3 { opacity: 1; transition-delay: .9s; } .st-draw .e009-d4 { opacity: 1; transition-delay: 1.25s; } .st-draw .e009-d5 { opacity: 1; transition-delay: 1.6s; }
.e009-cook { opacity: 0; transition: opacity .4s; } .st-fire .e009-cook { opacity: 1; }
.e009-stars { opacity: 0; transition: opacity .4s; } .st-stars .e009-stars { opacity: 1; animation: e009Twinkle .5s ease-in-out infinite alternate; }
@keyframes e009Twinkle { to { transform: translateY(-5px); } }
/* Bóng lăn, bánh xe quay khi đồ vật đang đi */
.is-walk .e009-roll, .is-walk .e009-wheel { animation: e009Spin .4s linear infinite; }
@keyframes e009Spin { to { transform: rotate(360deg); } }
/* Tom trên xe: tay giữ ghi-đông (không vung), chân đạp theo nhịp bước */
.e009-rider .sv-bob > g:last-child > .sv-sw { animation: none; rotate: -64deg; }
.e009-rider .sv-bob > g:last-child > .sv-sw > g > .sv-sw { animation: none; rotate: 0deg; }
.e009-rider .sv-bob > g:first-child > .sv-sw { animation: none; rotate: -28deg; }
.e009-rider .sv-bob > g:first-child > .sv-sw > g > .sv-sw { animation: none; rotate: 24deg; }
.is-walk .e009-rider .sv-sw { --p: .26s; }
/* Sút bóng (dáng trước mặt): chân phải đá sang bên */
.act-e009kick .pp-legwR { animation: e009Kick .55s ease-out 1 both; }
@keyframes e009Kick { 45% { transform: rotate(-48deg); } to { transform: rotate(0); } }
.act-e009kick .pp-bob { animation: e009Lean .55s ease-out 1 both; }
@keyframes e009Lean { 45% { transform: rotate(5deg); } to { transform: rotate(0); } }
/* Chó / mèo lắc đầu (không) */
.es-dog.act-e009no .dg-head { animation: e009No .22s ease-in-out infinite alternate; }
@keyframes e009No { from { transform: rotate(-12deg); } to { transform: rotate(12deg); } }
/* Kitty trèo cây: is-sit = đã trèo lên cành (leo lên 1,5 s rồi ngồi) */
.e009-kc { transition: transform 1.5s ease-in-out, opacity .2s 1.5s; }
.is-sit .e009-kc { transform: translateY(-96px); opacity: 0; }
.is-sit .e009-kc .dg-legF1, .is-sit .e009-kc .dg-legB2 { animation: ppStepA .18s ease-in-out 8 alternate; }
.is-sit .e009-kc .dg-legF2, .is-sit .e009-kc .dg-legB1 { animation: ppStepB .18s ease-in-out 8 alternate; }
.e009-kp { opacity: 0; transition: opacity .2s 1.5s; } .is-sit .e009-kp { opacity: 1; }
.e009-kp .dg-sit { display: inline; } .e009-kp .dg-stand { display: none; }
@media (prefers-reduced-motion: reduce) { .st-stars .e009-stars { animation: none; } }
`;

/** Bọt nước bắn lên quanh (x, y). */
const splash = (st, x, y = SURF) => { st.fx('drops', x, y - 26); st.fx('bubbles', x, y); };

const BEATS = [
  { key: ['I am Minh'], icon: '👦', label: 'Minh', async play(st) {
    st.look(240);
    st.pose('minh', 'wave'); st.act('minh', 'wave'); st.mood('minh', 'joy');
    st.set('st-name'); st.sfx('birds', { vol: 0.6 });
    await st.say('minh', 'Hi!', 1500);
    st.act('minh', null); st.pose('minh', 'stand'); st.mood('minh', 'happy');
    await st.wait(200);
  } },
  { key: ['run fast'], icon: '🏃', label: 'run fast', async play(st) {
    st.set('st-name', false);
    st.fx('poof', 100, 270);
    await st.walk('minh', 470, { speed: 300, lead: 40 });
    st.fx('poof', 470, 272);
    st.set('st-fast'); st.pose('minh', 'cheer'); st.mood('minh', 'joy');
    await st.wait(900);
    st.set('st-fast', false); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['play football'], icon: '⚽', label: 'football', async play(st) {
    st.look(540);
    st.act('minh', 'e009kick');
    await st.wait(260);
    st.sfx('tap');
    await st.walk('ball', 606, { speed: 420, follow: false });
    st.set('st-goal');
    st.pose('minh', 'cheer'); st.act('minh', 'cheer'); st.mood('minh', 'joy');
    st.fx('sparkle', 606, 250);
    await st.wait(1300);
    st.act('minh', null); st.pose('minh', 'stand'); st.mood('minh', 'happy'); st.set('st-goal', false);
  } },
  { key: ['draw a cat'], icon: '🎨', label: 'draw a cat', async play(st) {
    await st.walk('minh', 700, { speed: 150, lead: 30 });
    st.hold('minh', 'pencil'); st.pose('minh', 'paint');
    await st.wait(250);
    st.act('minh', 'paint'); st.set('st-draw');
    await st.wait(2000);
    st.act('minh', null); st.hold('minh', null); st.pose('minh', 'point'); st.mood('minh', 'joy');
    st.set('st-cat'); st.fx('sparkle', 748, 170);
    await st.wait(900);
    st.set('st-cat', false); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ["I can't swim"], icon: '🚫', label: "can't swim", async play(st) {
    await st.walk('minh', 818, { speed: 130, lead: 60 });
    st.mood('minh', 'wow'); st.pose('minh', 'shrug');
    st.fx('drops', 850, 214, { quiet: true });
    st.act('minh', 'shiver');
    await st.wait(800);
    st.set('st-noSwim'); st.act('minh', 'no');
    await st.wait(1300);
    st.act('minh', null); st.pose('minh', 'stand'); st.set('st-noSwim', false); st.mood('minh', 'happy');
  } },
  { key: ['Lan can swim'], icon: '🏊', label: 'Lan swims', async play(st) {
    await st.look(1020);
    st.show('lan', true); splash(st, 960); st.sfx('tap-water', { vol: 0.6 });
    st.pose('lan', 'swim'); st.act('lan', 'swim'); st.mood('lan', 'joy');
    st.set('st-swimL');
    await st.wait(1000);
    await st.walk('lan', 1080, { speed: 110, follow: false, after: 'swim' });
    splash(st, 1080);
    st.act('lan', 'swim');
    await st.wait(700);
    st.act('lan', null); st.pose('lan', 'wave'); st.set('st-swimL', false); st.mood('lan', 'happy');
  } },
  { key: ['cook'], icon: '🍳', label: 'cook', async play(st) {
    await st.walk('lan', 1238, { speed: 140, lead: 20 });
    st.set('st-fire'); st.sfx('pot-stir');
    st.pose('lan', 'stir'); st.act('lan', 'stir');
    st.set('st-cook');
    await st.wait(1900);
    st.act('lan', null); st.pose('lan', 'stand'); st.mood('lan', 'joy'); st.set('st-cook', false);
    await st.wait(300);
    st.mood('lan', 'happy');
  } },
  { key: ["can't play football"], icon: '🙅', label: "can't play", async play(st) {
    await st.walk('lan', 1312, { speed: 120, lead: 10 });
    st.act('lan', 'e009kick');
    await st.wait(300);
    st.walk('ball2', 1346, { speed: 60, follow: false });
    await st.wait(400);
    st.mood('lan', 'wow'); st.act('lan', 'shiver');
    await st.wait(600);
    st.pose('lan', 'shrug'); st.act('lan', 'no'); st.set('st-noFoot');
    await st.wait(1200);
    st.act('lan', null); st.pose('lan', 'stand'); st.mood('lan', 'happy'); st.set('st-noFoot', false);
  } },
  { key: ['Tom can swim very well'], icon: '🏅', label: 'very well', async play(st) {
    await st.look(1520);
    st.show('tom', true); splash(st, 1430); st.sfx('tap-water', { vol: 0.6 });
    await st.walk('tom', 1600, { speed: 190, lead: -40 });
    splash(st, 1600);
    st.pose('tom', 'swim'); st.act('tom', 'swim'); st.mood('tom', 'joy');
    st.set('st-well'); st.fx('sparkle', 1600, 150);
    await st.wait(1300);
    st.act('tom', null); st.pose('tom', 'cheer'); st.set('st-well', false);
    await st.wait(300);
  } },
  { key: ['ride a bike'], icon: '🚲', label: 'ride a bike', async play(st) {
    st.pose('tom', 'stand'); st.mood('tom', 'happy');
    await st.walk('tom', 1690, { speed: 140, lead: 60 });
    st.show('tom', false); st.show('bike', false); st.show('bikeTom', true);
    await st.wait(300);
    st.set('st-bike');
    await st.walk('bikeTom', 1880, { speed: 150, lead: 40 });
    st.fx('sparkle', 1890, 200);
    await st.wait(600);
    st.set('st-bike', false);
  } },
  { key: ['run and jump'], icon: '🐕', label: 'run and jump', async play(st) {
    await st.look(2060);
    st.dog('lucky', 'stand'); st.mood('lucky', 'joy');
    st.sfx('dog-bark', { vol: 0.6 });
    await st.walk('lucky', 2040, { speed: 230, follow: false });
    st.act('lucky', 'jump'); st.set('st-jump');
    await st.walk('lucky', 2160, { speed: 200, follow: false });
    st.act('lucky', null); st.act('lucky', 'wag');
    await st.wait(700);
    st.act('lucky', null); st.set('st-jump', false);
  } },
  { key: ["can't climb trees"], icon: '🌳', label: "can't climb", async play(st) {
    await st.look(2190);
    st.act('lucky', 'jump'); st.sfx('dog-bark');
    await st.wait(1200);
    st.act('lucky', null); st.fx('poof', 2180, 270, { quiet: true });
    st.dog('lucky', 'sit'); st.mood('lucky', 'happy');
    st.act('lucky', 'e009no'); st.set('st-noClimb');
    await st.wait(1200);
    st.act('lucky', null); st.set('st-noClimb', false);
  } },
  { key: ['Kitty can climb trees'], icon: '🐈', label: 'Kitty climbs', async play(st) {
    st.dog('kitty', 'stand');
    await st.walk('kitty', 2226, { speed: 110, follow: false });
    st.show('kitty', false); st.show('kittyUp', true);
    st.dog('kittyUp', 'sit');
    st.set('st-climb');
    await st.wait(1700);
    st.fx('sparkle', 2232, 140);
    await st.wait(600);
    st.set('st-climb', false);
  } },
  { key: ["She can't swim"], icon: '💦', label: "can't swim", async play(st) {
    st.show('kittyUp', false);
    st.dog('kitty', 'stand'); st.show('kitty', true); st.fx('poof', 2226, 266);
    await st.walk('kitty', 2398, { speed: 160, lead: -40 });
    st.fx('drops', 2428, 206, { quiet: true }); st.sfx('tap-water', { vol: 0.5 });
    st.act('kitty', 'jump'); st.mood('kitty', 'joy'); st.set('st-noSwimC');
    await st.wait(700);
    st.act('kitty', null);
    await st.walk('kitty', 2310, { speed: 220, follow: false });
    st.dog('kitty', 'sit'); st.act('kitty', 'e009no');
    await st.wait(900);
    st.act('kitty', null); st.mood('kitty', 'happy'); st.set('st-noSwimC', false);
  } },
  { key: ['Dad and I are at the pool'], icon: '🏊', label: 'the pool', async play(st) {
    st.show('minh', false);
    st.show('minh2', true); st.show('dad', true);
    await st.look(2460);
    await Promise.all([
      st.walk('minh2', 2350, { speed: 130, follow: false }),
      (async () => { await st.wait(300); await st.walk('dad', 2414, { speed: 130, follow: false }); })(),
    ]);
    st.pose('minh2', 'wave'); st.act('minh2', 'wave'); st.mood('minh2', 'joy');
    await st.wait(800);
    st.act('minh2', null); st.pose('minh2', 'stand'); st.mood('minh2', 'happy');
  } },
  { key: ['Dad is next to me'], icon: '👨', label: 'next to me', async play(st) {
    await st.walk('dad', 2394, { speed: 70, follow: false });
    st.pose('dad', 'give');
    st.pose('minh2', 'point'); st.act('minh2', 'point'); st.set('st-next');
    await st.wait(1500);
    st.act('minh2', null); st.pose('minh2', 'stand'); st.pose('dad', 'stand'); st.set('st-next', false);
  } },
  { key: ['I am in the water'], icon: '💧', label: 'in the water', async play(st) {
    await Promise.all([
      st.look(2510, { dur: 1300 }),
      st.walk('minh2', 2496, { speed: 110, follow: false }),
      (async () => { await st.wait(200); await st.walk('dad', 2552, { speed: 110, follow: false }); })(),
    ]);
    splash(st, 2496); st.sfx('tap-water', { vol: 0.6 });
    st.mood('minh2', 'wow'); st.set('st-in');
    await st.wait(1000);
    st.mood('minh2', 'happy'); st.set('st-in', false);
  } },
  { key: ['One, two, three'], icon: '🔢', label: 'one, two, three', async play(st) {
    st.pose('dad', 'raise');
    st.set('st-n1'); st.say('dad', 'One!', 600);
    await st.wait(700);
    st.set('st-n2'); st.say('dad', 'Two!', 600);
    await st.wait(700);
    st.set('st-n3'); st.say('dad', 'Three!', 700);
    await st.wait(800);
    st.set('st-n1', false); st.set('st-n2', false); st.set('st-n3', false); st.pose('dad', 'stand');
  } },
  { key: ['Look'], icon: '👀', label: 'Look!', async play(st) {
    st.pose('minh2', 'pointUp'); st.mood('minh2', 'joy');
    st.say('minh2', 'Look!', 1200);
    st.mood('dad', 'wow');
    await st.wait(1400);
    st.pose('minh2', 'stand'); st.mood('minh2', 'happy');
  } },
  { key: ['I can swim now'], icon: '🏊', label: 'swim now', async play(st) {
    st.pose('minh2', 'swim'); st.act('minh2', 'swim'); splash(st, 2496); st.sfx('tap-water', { vol: 0.5 });
    await st.wait(700);
    st.look(2596, { dur: 1400 });
    await st.walk('minh2', 2636, { speed: 100, follow: false, after: 'swim' });
    splash(st, 2636);
    st.act('minh2', 'swim'); st.set('st-now');
    await st.wait(900);
    st.act('minh2', null); st.set('st-now', false); st.mood('dad', 'joy');
  } },
  { key: ['I am so happy'], icon: '😄', label: 'so happy', async play(st) {
    st.pose('minh2', 'cheer'); st.act('minh2', 'cheer'); st.mood('minh2', 'joy');
    st.pose('dad', 'clap'); st.act('dad', 'clap'); st.mood('dad', 'joy');
    st.set('st-stars'); st.fx('hearts', 2636, 150);
    await st.wait(800);
    st.fx('hearts', 2552, 120);
    await st.wait(1200);
    st.act('minh2', null); st.act('dad', null);
  } },
];

export default {
  id: 'en009', worldW: W, floor: FLOOR, viewTop: 70, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  cast: [
    { id: 'ball', kind: 'thing', svg: ball, box: [-12, -20, 24, 22], x: 498 },
    { id: 'ball2', kind: 'thing', svg: ball, box: [-12, -20, 24, 22], x: 1336 },
    { id: 'bike', kind: 'thing', svg: BIKE, box: [-46, -60, 92, 62], x: 1722 },
    { id: 'bikeTom', kind: 'thing', svg: BIKE_TOM, box: [-46, -150, 92, 152], x: 1722 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 120 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 960, s: 1.08 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: 1430 },
    { id: 'lucky', kind: 'dog', x: 1960, s: 0.95 },
    { id: 'kittyUp', kind: 'thing', svg: KITTY_UP, box: [-40, -200, 120, 204], x: 2200 },
    { id: 'kitty', kind: 'cat', x: 2262, s: 0.95 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 2160, s: 0.95 },
    { id: 'minh2', kind: 'kid', who: 'en_minh_home', x: 2120 },
  ],
  init(st) {
    ['lan', 'tom', 'bikeTom', 'kittyUp', 'dad', 'minh2'].forEach((id) => st.show(id, false));
    st.dog('lucky', 'sit'); st.dog('kitty', 'sit');
  },
};
