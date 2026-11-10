/**
 * Bài 34 "Grandma's Garden": nhà bà ở Nam Định (chuồng gà cạnh nhà) → luống hoa đỏ vàng → luống xà lách, cà chua của ông
 * bên ao → hàng rào tre có cổng nhỏ và cây của Minh → cây xoài (ổ của Lucky) → bức tường (chỗ Kitty thích nhất).
 * Đàn gà ra vườn ăn xà lách, Lucky đuổi gà chạy về với bà, cả nhà cười.
 * Toạ độ cảnh: rộng 2340, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, sky, cloud, tree, bush, flowerAt, sun, label, water } from '../kit.js';

const FLOOR = 282;
const WALL_TOP = 214;

// ── Đồ vật ────────────────────────────────────────────────────────────────
/** Gà mái (nhìn nghiêng, quay sang phải, gốc = chân chạm đất). */
const HEN = (c = '#FFFFFF', w = '#F1F5F9') => `<g class="e034-hen">
  <g class="e034-legA" style="transform-origin:-2px -12px"><path d="M-2 -12 V-1 l4 1" stroke="#F59E0B" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>
  <g class="e034-legB" style="transform-origin:4px -12px"><path d="M4 -12 V-1 l4 1" stroke="#F59E0B" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>
  <path d="M-16 -24 Q-22 -34 -14 -36 Q-12 -28 -8 -26Z" fill="${w}" stroke="${L}" stroke-width="0.8"/>
  <ellipse cx="0" cy="-20" rx="15" ry="10" fill="${c}" stroke="${L}" stroke-width="1"/>
  <path d="M-8 -22 Q0 -14 8 -20" stroke="${w}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <g class="e034-head" style="transform-origin:10px -24px">
    <path d="M8 -26 Q8 -36 14 -37 Q20 -36 19 -28 Q16 -22 10 -22Z" fill="${c}" stroke="${L}" stroke-width="1"/>
    <path d="M11 -37 q1 -4 3 -1 q1 -4 3 0 q2 -3 2 1" fill="#EF4444" stroke="${L}" stroke-width="0.6"/>
    <path d="M19 -31 l5 1.6 l-5 1.6Z" fill="#F59E0B" stroke="${L}" stroke-width="0.6"/>
    <path d="M18 -28 q1 4 -1 5 q-2 -1 -1 -4Z" fill="#EF4444"/>
    <circle cx="15.6" cy="-32" r="1.3" fill="#1F2937"/></g></g>`;
/** Cây cà chua (gốc = mặt đất). */
const tomatoPlant = (x, i) => `<g transform="translate(${x} ${FLOOR - 4})"><g class="e034-grow"><path d="M-10 0 V-66 M10 0 V-66" stroke="#A16207" stroke-width="2.4"/>
  <path d="M0 0 Q-4 -24 2 -44 Q6 -56 0 -64" stroke="#16A34A" stroke-width="3" fill="none"/>
  ${[[-10, -20], [9, -30], [-8, -44], [8, -54]].map(([dx, dy]) => `<path d="M0 ${dy + 4} q${dx} -6 ${dx * 1.6} 2 q${-dx * 0.8} 3 ${-dx * 1.6} -2Z" fill="#22C55E" stroke="${L}" stroke-width="0.6"/>`).join('')}
  <g class="e034-tom e034-tom${i}">${[[-7, -26], [8, -38], [-5, -50]].map(([dx, dy]) => `<circle cx="${dx}" cy="${dy}" r="5.4" fill="#EF4444" stroke="${L}" stroke-width="0.8"/><path d="M${dx - 2} ${dy - 5} l2 1.6 l2 -1.6" stroke="#15803D" stroke-width="1.2" fill="none"/>`).join('')}</g></g></g>`;
const lettuce = (x) => `<g transform="translate(${x} ${FLOOR - 2})"><g class="e034-grow"><g class="e034-let"><ellipse cx="0" cy="-7" rx="11" ry="8" fill="#86EFAC" stroke="${L}" stroke-width="0.9"/>
  <path d="M-9 -8 Q-4 -16 0 -9 Q4 -16 9 -8" fill="#BBF7D0" stroke="${L}" stroke-width="0.7"/><path d="M0 -2 V-12" stroke="#4ADE80" stroke-width="1.2"/></g>
  <g class="e034-stub"><ellipse cx="0" cy="-3" rx="5" ry="3" fill="#BEF264" stroke="${L}" stroke-width="0.7"/></g></g></g>`;
const TOMATO = `<circle r="6" fill="#EF4444" stroke="${L}" stroke-width="0.9"/><path d="M-2.4 -6 l2.4 2 l2.4 -2" stroke="#15803D" stroke-width="1.4" fill="none"/>`;
const BASKET = (n) => `<path d="M-18 -16 H18 L14 0 H-14Z" fill="#D97706" stroke="${L}" stroke-width="1"/><path d="M-16 -10 H16 M-15 -5 H15" stroke="#92400E" stroke-width="0.8"/>
  <g class="e034-inbasket">${Array.from({ length: n }, (_, i) => `<circle cx="${-10 + i * 5}" cy="${-17 - (i % 2) * 3}" r="4.6" fill="#EF4444" stroke="${L}" stroke-width="0.7" class="e034-tb e034-tb${i}"/>`).join('')}</g>`;
/** Ổ của Lucky (đệm đỏ có tên). */
const DOGBED = `<ellipse cx="0" cy="-6" rx="46" ry="12" fill="#EF4444" stroke="${L}" stroke-width="1.2"/><ellipse cx="0" cy="-8" rx="36" ry="7" fill="#FCA5A5" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(0 6)"><rect x="-26" y="-6" width="52" height="13" rx="4" fill="#fff" stroke="${L}" stroke-width="0.8"/><text x="0" y="4.5" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="10" fill="#B91C1C">LUCKY</text></g>`;
/** Bình tưới (cầm ở tay phải, tay duỗi ra trước). */
const CAN = `<g transform="rotate(-90) translate(2 2)"><path d="M-8 -7 H8 V8 H-8Z" fill="#22C55E" stroke="${L}" stroke-width="0.9"/><path d="M8 -2 L20 -10" stroke="${L}" stroke-width="3.6" stroke-linecap="round"/><path d="M8 -2 L20 -10" stroke="#22C55E" stroke-width="2.2" stroke-linecap="round"/>
  <ellipse cx="21" cy="-10.5" rx="2.4" ry="3.4" fill="#4ADE80" stroke="${L}" stroke-width="0.7" transform="rotate(-30 21 -10.5)"/><path d="M-8 -7 Q0 -16 8 -7" stroke="${L}" stroke-width="1.2" fill="none"/></g>`;

function bg() {
  const brick = Array.from({ length: 4 }, (_, r) => Array.from({ length: 17 }, (_, i) => `<rect x="${1880 + i * 26 + (r % 2) * 13}" y="${WALL_TOP + 6 + r * 15}" width="24" height="13" rx="1" fill="${(i + r) % 3 ? '#F87171' : '#FB923C'}" stroke="${L}" stroke-width="0.5"/>`).join('')).join('');
  return `
  ${sky(0, 2340, 315, 'e034sky')}
  ${cloud(200, 70, 1, 0)}${cloud(900, 60, 0.9, 2)}${cloud(1420, 76, 1.1, 4)}${cloud(2100, 58, 0.9, 1)}
  <g transform="translate(610 110)"><g class="e034-sun">${sun(24)}</g></g>
  <path d="M0 236 Q240 196 520 226 T1100 216 T1700 224 T2340 214 V282 H0Z" fill="#86EFAC" stroke="${L}"/>
  <g class="e034-green"><path d="M0 236 Q240 196 520 226 T1100 216 T1700 224 T2340 214 V282 H0Z" fill="#4ADE80"/></g>
  ${tree(1000, 226, 0.7, '')}${tree(1370, 222, 0.8, '')}${tree(2240, 216, 0.75, '')}
  <rect x="0" y="${FLOOR - 4}" width="2340" height="${319 - FLOOR}" fill="#A3E635" stroke="${L}"/>
  ${Array.from({ length: 50 }, (_, i) => `<path d="M${18 + i * 46} ${FLOOR + 12} l3 -7 l3 7 M${38 + i * 46} ${FLOOR + 24} l3 -7 l3 7" stroke="#4D7C0F" stroke-width="1.3" fill="none"/>`).join('')}
  <!-- Nhà bà (Nam Định) -->
  <path d="M8 118 L150 56 L292 118Z" fill="#EF4444" stroke="${L}" stroke-width="1.4"/>
  ${[0, 1, 2, 3].map((i) => `<path d="M${40 + i * 70} ${110 - i * 0} L${150} 60" stroke="#B91C1C" stroke-width="0.8" opacity="0.5"/>`).join('')}
  <rect x="24" y="118" width="252" height="${FLOOR - 118}" fill="#FEF3C7" stroke="${L}" stroke-width="1.4"/>
  <rect x="44" y="144" width="56" height="50" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="1.2"/><path d="M72 144 V194 M44 169 H100" stroke="${L}" stroke-width="0.9"/>
  <rect x="200" y="186" width="54" height="${FLOOR - 186}" rx="4" fill="#B45309" stroke="${L}" stroke-width="1.2"/><circle cx="244" cy="236" r="3" fill="#FDE68A"/>
  <rect x="120" y="150" width="64" height="44" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="1.2"/><path d="M152 150 V194" stroke="${L}" stroke-width="0.9"/>
  ${label(150, 104, 'Nam Dinh', '#B91C1C', 13)}
  <!-- Chuồng gà -->
  <g transform="translate(340 0)"><path d="M-44 228 L0 200 L44 228Z" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
    <rect x="-38" y="228" width="76" height="${FLOOR - 228}" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/>${[-26, -10, 6, 22].map((x) => `<path d="M${x} 230 V${FLOOR}" stroke="#D97706" stroke-width="1"/>`).join('')}
    <rect x="4" y="246" width="26" height="${FLOOR - 246}" fill="#78350F" stroke="${L}"/>
    <g class="e034-coopdoor"><rect x="4" y="246" width="26" height="${FLOOR - 246}" fill="#D97706" stroke="${L}"/><path d="M8 250 L26 ${FLOOR - 4} M26 250 L8 ${FLOOR - 4}" stroke="#92400E" stroke-width="1.2"/></g>
    <ellipse cx="-20" cy="${FLOOR - 2}" rx="12" ry="3" fill="#FDE047" opacity="0.8"/></g>
  <!-- Luống hoa -->
  <rect x="630" y="${FLOOR - 10}" width="240" height="12" rx="5" fill="#92400E" stroke="${L}"/>
  ${Array.from({ length: 10 }, (_, i) => `<g class="e034-fl e034-red" style="transform-origin:${648 + i * 11}px ${FLOOR - 8}px;transition-delay:${i * 0.07}s"><g transform="translate(${648 + i * 11} ${FLOOR - 8}) scale(1.5) translate(${-648 - i * 11} ${-FLOOR + 8})">${flowerAt(648 + i * 11, FLOOR - 8 - (i % 2) * 3, '#EF4444')}</g></g>`).join('')}
  ${Array.from({ length: 10 }, (_, i) => `<g class="e034-fl e034-yel" style="transform-origin:${758 + i * 11}px ${FLOOR - 8}px;transition-delay:${i * 0.07}s"><g transform="translate(${758 + i * 11} ${FLOOR - 8}) scale(1.5) translate(${-758 - i * 11} ${-FLOOR + 8})">${flowerAt(758 + i * 11, FLOOR - 8 - (i % 2) * 3, '#FACC15')}</g></g>`).join('')}
  <g class="e034-wet">${Array.from({ length: 9 }, (_, i) => `<ellipse cx="${660 + i * 24}" cy="${FLOOR - 2}" rx="7" ry="2" fill="#38BDF8" opacity="0.6"/>`).join('')}</g>
  <g class="e034-lb e034-lb-red">${label(690, 196, 'red', '#DC2626', 15)}</g>
  <g class="e034-lb e034-lb-yel">${label(812, 196, 'yellow', '#CA8A04', 15)}</g>
  <!-- Vườn rau của ông: xà lách, cà chua, ao -->
  <rect x="900" y="${FLOOR - 6}" width="260" height="8" rx="3" fill="#92400E" stroke="${L}"/>
  <g class="e034-veg">${[912, 942, 972, 1002].map(lettuce).join('')}${[1046, 1082, 1118].map((x, i) => tomatoPlant(x, i)).join('')}</g>
  <g class="e034-lb e034-lb-veg">${label(1030, 176, 'vegetables', '#15803D', 14)}</g>
  <path d="M1196 ${FLOOR} Q1200 254 1240 250 H1400 Q1436 254 1440 ${FLOOR}Z" fill="#38BDF8" stroke="${L}"/>
  <g class="ek-wave">${[1230, 1290, 1350].map((x, i) => `<path d="M${x} ${262 + (i % 2) * 8} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  ${[1262, 1384].map((x) => `<ellipse cx="${x}" cy="258" rx="10" ry="3.4" fill="#22C55E" stroke="${L}" stroke-width="0.7"/>`).join('')}<g transform="translate(1384 256)">${flowerAt(0, 0, '#F9A8D4')}</g>
  ${[1196, 1430].map((x) => `<path d="M${x} ${FLOOR} q-4 -22 0 -34 M${x + 5} ${FLOOR} q2 -26 7 -32" stroke="#15803D" stroke-width="2.2" fill="none"/>`).join('')}
  <g class="e034-lb e034-lb-pond">${label(1318, 236, 'pond', '#0369A1', 13)}</g>
  <!-- Hàng rào tre, cổng nhỏ -->
  ${Array.from({ length: 6 }, (_, i) => `<rect x="${1454 + i * 12}" y="232" width="7" height="${FLOOR - 232}" rx="3" fill="#BEF264" stroke="${L}" stroke-width="0.7"/>`).join('')}
  <path d="M1450 246 H1526 M1450 262 H1526" stroke="#65A30D" stroke-width="3"/>
  <rect x="1524" y="222" width="7" height="${FLOOR - 222}" fill="#A16207" stroke="${L}"/><rect x="1566" y="222" width="7" height="${FLOOR - 222}" fill="#A16207" stroke="${L}"/>
  <g class="e034-gate"><rect x="1531" y="236" width="35" height="${FLOOR - 240}" fill="none" stroke="#A16207" stroke-width="3"/><path d="M1531 236 L1566 ${FLOOR - 4} M1548 236 V${FLOOR - 4}" stroke="#A16207" stroke-width="2.4"/></g>
  <!-- Cây của Minh -->
  <g transform="translate(1606 ${FLOOR - 2})"><g class="e034-mtree"><rect x="-3" y="-34" width="6" height="34" rx="2" fill="#A16207" stroke="${L}" stroke-width="0.9"/>
    <g class="ek-sway" style="transform-origin:0 -34px"><circle cx="0" cy="-46" r="16" fill="#4ADE80" stroke="${L}"/><circle cx="-10" cy="-38" r="9" fill="#22C55E" stroke="${L}"/><circle cx="11" cy="-40" r="10" fill="#86EFAC" stroke="${L}"/></g></g>
    <rect x="6" y="-20" width="30" height="12" rx="3" fill="#fff" stroke="${L}" stroke-width="0.8"/><text x="21" y="-11" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="8.5" fill="#1D4ED8">MINH</text></g>
  <g class="e034-lb e034-lb-small">${label(1606, 194, 'small tree', '#15803D', 13)}</g>
  <!-- Cây xoài -->
  <g transform="translate(1770 ${FLOOR - 4}) scale(1.7)"><rect x="-7" y="-62" width="14" height="62" rx="3" fill="#92400E" stroke="${L}"/>
    <g class="ek-sway"><circle cx="0" cy="-88" r="36" fill="#16A34A" stroke="${L}"/><circle cx="-26" cy="-72" r="22" fill="#15803D" stroke="${L}"/><circle cx="26" cy="-74" r="24" fill="#22C55E" stroke="${L}"/>
    ${[[-14, -70], [12, -66], [-2, -96], [24, -86]].map(([x, y]) => `<path d="M${x} ${y} v4" stroke="#15803D" stroke-width="1"/><ellipse cx="${x}" cy="${y + 9}" rx="4" ry="6" fill="#FACC15" stroke="${L}" stroke-width="0.6"/>`).join('')}</g></g>
  <g class="e034-lb e034-lb-mango">${label(1770, 120, 'mango tree', '#B45309', 13)}</g>
  <!-- Bức tường -->
  <rect x="1880" y="${WALL_TOP}" width="440" height="${FLOOR - WALL_TOP}" fill="#FDBA74" stroke="${L}" stroke-width="1.2"/>${brick}
  <rect x="1874" y="${WALL_TOP - 6}" width="452" height="10" rx="3" fill="#E7E5E4" stroke="${L}"/>
  <g class="e034-lb e034-lb-wall">${label(2120, 150, 'on the wall', '#7C3AED', 13)}</g>`;
}

function fg() {
  return `<g transform="translate(1150 ${FLOOR})"><g class="e034-basket">${BASKET(6)}</g></g>
  <g transform="translate(1745 ${FLOOR + 2})">${DOGBED}</g>
  ${bush(1462, FLOOR + 18, 0.9)}${bush(1858, FLOOR + 20, 1)}${bush(560, FLOOR + 22, 0.9, '#4ADE80')}
  <g class="e034-lb e034-lb-laugh">${label(560, 150, 'Ha ha ha!', '#DB2777', 16)}</g>`;
}

const CSS = `
.e034-lb { opacity: 0; transition: opacity .35s; }
${['red', 'yel', 'veg', 'pond', 'small', 'mango', 'wall', 'laugh'].map((k) => `.st-lb-${k} .e034-lb-${k}`).join(', ')} { opacity: 1; }
.e034-sun { transform: translateY(210px); transition: transform 1.6s cubic-bezier(.3,0,.3,1); }
.st-sunUp .e034-sun { transform: translateY(-30px); }
.e034-green { opacity: 0; transition: opacity 1s; }
.st-green .e034-green { opacity: .6; }
.e034-fl { transition: transform .5s cubic-bezier(.3,1.6,.6,1); }
.st-boomR .e034-red, .st-boomY .e034-yel { transform: scale(1.35); }
.e034-wet { opacity: 0; transition: opacity .6s; } .st-wet .e034-wet { opacity: 1; }
.e034-grow { transform-box: fill-box; transform-origin: 50% 100%; transition: transform 1.4s cubic-bezier(.3,1.4,.6,1); }
svg:not(.st-grown) .e034-grow { transform: scaleY(.35); }
.e034-tom { transition: opacity .25s; } .st-pick1 .e034-tom0, .st-pick2 .e034-tom1, .st-pick3 .e034-tom2 { opacity: 0; }
.e034-tb { opacity: 0; transition: opacity .2s; }
.st-pick1 .e034-tb0, .st-pick1 .e034-tb1, .st-pick2 .e034-tb2, .st-pick2 .e034-tb3, .st-pick3 .e034-tb4, .st-pick3 .e034-tb5 { opacity: 1; }
.e034-let { transform-box: fill-box; transform-origin: 50% 100%; transition: transform .8s, opacity .8s; }
.e034-stub { opacity: 0; transition: opacity .8s; }
.st-eaten .e034-let { transform: scale(.2); opacity: 0; } .st-eaten .e034-stub { opacity: 1; }
.e034-mtree { transform: scale(.75); transition: transform 2.2s cubic-bezier(.3,1.2,.5,1); }
.st-tall .e034-mtree { transform: scale(1.5); }
.e034-coopdoor { transform-origin: 4px 0; transition: transform .5s; }
.st-coop .e034-coopdoor { transform: scaleX(.1); }
.es-thing.is-walk .e034-legA { animation: e034Step .18s ease-in-out infinite alternate; }
.es-thing.is-walk .e034-legB { animation: e034Step .18s ease-in-out infinite alternate-reverse; }
.es-thing.is-walk .e034-hen { animation: e034Bob .18s ease-in-out infinite alternate; }
@keyframes e034Step { from { transform: rotate(-25deg); } to { transform: rotate(25deg); } }
@keyframes e034Bob { to { transform: translateY(-1.6px); } }
.es-thing.act-e034-peck .e034-head { animation: e034Peck .32s ease-in-out infinite alternate; }
@keyframes e034Peck { from { transform: rotate(0); } to { transform: rotate(52deg) translate(2px, 6px); } }
.es-thing.act-e034-flap .e034-hen { animation: e034Flap .14s ease-in-out infinite alternate; }
@keyframes e034Flap { to { transform: translateY(-6px) rotate(-6deg); } }
/* tưới hoa: tay đưa lên xuống nhẹ */
.es-ac.act-e034-water .pp-upwR { animation: e034Water .7s ease-in-out infinite alternate; }
@keyframes e034Water { from { transform: rotate(0); } to { transform: rotate(-14deg); } }
@media (prefers-reduced-motion: reduce) { .es-thing.act-e034-peck .e034-head { animation-duration: .6s; } }
`;

const POSES = {
  e034_water: { R: [62, 70], L: [10, 4] },
  e034_shout: { R: [40, -158], L: [40, -158], head: -6 },
};

const HENS = ['hen1', 'hen2', 'hen3'];

const BEATS = [
  { key: ["Grandma's garden", 'behind the house'], icon: '🏡', label: "Grandma's garden", async play(st) {
    st.look(300);
    st.pose('grandma', 'wave'); st.act('grandma', 'wave');
    st.fx('sparkle', 150, 104);
    await st.wait(1200);
    st.act('grandma', null); st.pose('grandma', 'point');
    await st.look(640, { dur: 1300 });
    st.fx('sparkle', 700, 230);
    st.sfx('birds', { vol: 0.6 });
    await st.wait(900);
    st.pose('grandma', 'stand');
  } },
  { key: ['big and green'], icon: '🌳', label: 'big and green', async play(st) {
    st.set('st-green');
    await st.look(1500, { dur: 1700 });
    st.fx('sparkle', 1370, 140, { quiet: true });
    await st.look(700, { dur: 1500 });
  } },
  { key: ["Grandma's flowers", 'red and yellow'], icon: '🌺', label: 'red and yellow', async play(st) {
    st.look(700);
    st.set('st-boomR'); st.set('st-lb-red'); st.sfx('sparkle');
    st.fx('sparkle', 700, 250, { quiet: true });
    await st.wait(1100);
    st.set('st-boomR', false);
    st.set('st-boomY'); st.set('st-lb-yel');
    st.fx('sparkle', 810, 250, { quiet: true });
    await st.wait(1100);
    st.set('st-boomY', false);
    await st.wait(300);
    st.set('st-lb-red', false); st.set('st-lb-yel', false);
  } },
  { key: ["Grandpa's vegetables", 'near the pond'], icon: '🥬', label: 'vegetables', async play(st) {
    await st.look(1130, { dur: 900 });
    st.set('st-grown'); st.set('st-lb-veg');
    st.pose('grandpa', 'point'); st.mood('grandpa', 'joy');
    await st.wait(1300);
    st.set('st-lb-pond');
    st.fx('sparkle', 1318, 256, { quiet: true });
    await st.wait(1100);
    st.pose('grandpa', 'stand'); st.mood('grandpa', 'happy');
    st.set('st-lb-veg', false); st.set('st-lb-pond', false);
  } },
  { key: ["waters Grandma's flowers", 'every morning'], icon: '🚿', label: 'waters the flowers', async play(st) {
    st.look(640, { dur: 800 });
    st.set('st-sunUp');
    await st.walk('lan', 700, { speed: 125, follow: false });
    st.hold('lan', 'e034_can'); st.pose('lan', 'e034_water');
    await st.wait(350);
    st.act('lan', 'e034-water'); st.set('st-wet');
    for (let i = 0; i < 3; i++) { st.fx('drops', 742, 222); await st.wait(600); }
    st.act('lan', null); st.hold('lan', null); st.pose('lan', 'stand'); st.mood('lan', 'joy');
    await st.wait(300);
    st.mood('lan', 'happy');
  } },
  { key: ["picks Grandpa's tomatoes"], icon: '🍅', label: 'picks tomatoes', async play(st) {
    await st.walk('minh', 1030, { speed: 150 });
    for (let i = 0; i < 3; i++) {
      const x = 1046 + i * 36;
      if (i) await st.walk('minh', x - 18, { speed: 110, follow: false });
      st.pose('minh', 'reach');
      await st.wait(300);
      st.set(`st-pick${i + 1}`);
      await st.fly(TOMATO, [x, 240], [1150, 262], { size: 14, dur: 520 });
      st.sfx('bowl-down', { vol: 0.5 });
    }
    st.pose('minh', 'stand'); st.mood('minh', 'joy'); st.mood('grandpa', 'joy');
    await st.wait(400);
    st.mood('minh', 'happy'); st.mood('grandpa', 'happy');
  } },
  { key: ['a small tree near the gate'], icon: '🌱', label: 'small tree', async play(st) {
    await st.look(1580, { dur: 1100 });
    st.set('st-lb-small');
    st.fx('sparkle', 1606, 236);
    await st.wait(1300);
  } },
  { key: ["Minh's tree", 'growing fast'], icon: '🌳', label: "Minh's tree", async play(st) {
    st.set('st-lb-small', false);
    await st.walk('minh', 1664, { speed: 190 });
    await st.walk('minh', 1662, { speed: 60, follow: false });
    st.pose('minh', 'me'); st.mood('minh', 'joy');
    await st.wait(700);
    st.set('st-tall'); st.sfx('sparkle');
    st.pose('minh', 'cheer'); st.act('minh', 'jump');
    st.fx('sparkle', 1606, 200, { quiet: true });
    await st.wait(1500);
    st.fx('sparkle', 1606, 170, { quiet: true });
    await st.wait(500);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ["Lucky's bed", 'under the mango tree'], icon: '🐶', label: "Lucky's bed", async play(st) {
    st.dog('lucky', 'stand'); st.mood('lucky', 'joy');
    await st.walk('lucky', 1736, { speed: 150, lead: 0 });
    st.dog('lucky', 'sit'); st.act('lucky', 'wag'); st.set('st-lb-mango');
    await st.wait(700);
    st.mood('lucky', 'happy');
    st.fx('zzz', 1770, 200);
    await st.wait(1200);
    st.set('st-lb-mango', false);
  } },
  { key: ["Kitty's favourite place", 'on the wall'], icon: '🐱', label: 'on the wall', async play(st) {
    await st.look(2120, { dur: 900 });
    st.set('st-lb-wall');
    await st.walk('kitty', 2110, { speed: 70, follow: false });
    st.dog('kitty', 'sit'); st.act('kitty', 'wag'); st.mood('kitty', 'joy');
    st.fx('hearts', 2120, 160);
    await st.wait(1400);
    st.set('st-lb-wall', false);
  } },
  { key: ["Grandma's chickens", 'walk in the garden'], icon: '🐔', label: 'chickens', async play(st) {
    await st.look(470, { dur: 1300 });
    st.set('st-coop'); st.sfx('door-open', { vol: 0.5 });
    HENS.forEach((h) => st.show(h, true));
    await st.wait(300);
    await Promise.all(HENS.map((h, i) => (async () => { await st.wait(i * 300); await st.walk(h, 560 + i * 40, { speed: 80, follow: false }); })()));
    st.act('hen1', 'e034-peck');
    await st.wait(500);
  } },
  { key: ["eating Grandpa's lettuce"], icon: '🥬', label: 'eating lettuce', async play(st) {
    st.look(960, { dur: 2000 });
    await Promise.all(HENS.map((h, i) => st.walk(h, 900 + i * 34, { speed: 160, follow: false })));
    HENS.forEach((h) => st.act(h, 'e034-peck'));
    st.set('st-eaten');
    st.walk('grandpa', 1100, { speed: 110, follow: false });
    await st.wait(900);
    st.mood('grandpa', 'wow'); st.pose('grandpa', 'shrug');
    await st.wait(1200);
  } },
  { key: ['Lucky, help me'], icon: '📣', label: 'help me!', async play(st) {
    st.look(1000);
    HENS.forEach((h) => st.act(h, 'e034-peck'));
    st.pose('grandpa', 'raise'); st.act('grandpa', 'wave'); st.mood('grandpa', 'wow');
    await st.say('grandpa', 'Lucky, help me!', 1900);
    st.act('grandpa', null);
  } },
  { key: ['shouts Grandpa'], icon: '🗣️', label: 'shouts', async play(st) {
    st.look(1000);
    st.pose('grandpa', 'e034_shout'); st.act('grandpa', 'hop');
    for (let i = 0; i < 2; i++) { st.fx('sparkle', 1124, 136, { quiet: true }); await st.wait(350); }
    await st.look(1700, { dur: 900 });
    st.dog('lucky', 'stand'); st.act('lucky', 'jump'); st.mood('lucky', 'joy');
    st.sfx('dog-bark');
    await st.wait(800);
    st.act('grandpa', null);
  } },
  { key: ['runs after the chickens'], icon: '🐕', label: 'runs after', async play(st) {
    st.act('lucky', null); st.pose('grandpa', 'point');
    st.sfx('dog-bark', { vol: 0.8 });
    await Promise.all([
      st.walk('lucky', 1000, { speed: 360, lead: -60 }),
      (async () => {
        await st.wait(1500);
        HENS.forEach((h) => st.act(h, 'e034-flap'));
        await Promise.all(HENS.map((h, i) => st.walk(h, 780 + i * 40, { speed: 200, follow: false })));
      })(),
      st.walk('minh', 1250, { speed: 260, follow: false }),
    ]);
  } },
  { key: ['run back to Grandma'], icon: '👵', label: 'back to Grandma', async play(st) {
    st.look(560, { dur: 1700 });
    HENS.forEach((h) => st.act(h, 'e034-flap'));
    st.pose('grandma', 'open'); st.mood('grandma', 'wow');
    await Promise.all([
      ...HENS.map((h, i) => st.walk(h, 482 + i * 34, { speed: 210, follow: false })),
      (async () => { await st.wait(400); await st.walk('lucky', 630, { speed: 220, follow: false }); })(),
      st.walk('grandpa', 790, { speed: 140, follow: false }),
      st.walk('minh', 860, { speed: 190, follow: false }),
    ]);
    HENS.forEach((h) => st.act(h, null));
    st.dog('lucky', 'sit'); st.act('lucky', 'wag');
    st.mood('grandma', 'joy');
    await st.wait(300);
  } },
  { key: ['Everyone laughs'], icon: '😂', label: 'laughs', async play(st) {
    st.look(650);
    st.set('st-lb-laugh');
    for (const id of ['grandma', 'grandpa', 'lan', 'minh']) { st.mood(id, 'joy'); st.act(id, 'hop'); }
    st.pose('grandma', 'clap'); st.act('grandma', 'clap'); st.pose('grandpa', 'hips'); st.pose('lan', 'clap'); st.act('lan', 'clap'); st.pose('minh', 'cheer');
    st.act('lucky', 'wag'); st.mood('lucky', 'joy');
    st.fx('hearts', 650, 150);
    await st.wait(1800);
    for (const id of ['grandma', 'grandpa', 'lan', 'minh']) st.act(id, null);
    st.set('st-lb-laugh', false);
  } },
];

export default {
  id: 'en034', worldW: 2340, floor: FLOOR, viewTop: 40, camStart: 60, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  props: { e034_can: CAN },
  order: [2, 4, 5, 8, 11, 14],
  cast: [
    { id: 'kitty', kind: 'cat', x: 2290, y: WALL_TOP, s: 0.9, face: -1 },
    { id: 'hen1', kind: 'thing', x: 344, svg: HEN('#FFFFFF', '#F1F5F9'), box: [-24, -40, 52, 42] },
    { id: 'hen2', kind: 'thing', x: 344, svg: HEN('#D97706', '#B45309'), box: [-24, -40, 52, 42], s: 0.95 },
    { id: 'hen3', kind: 'thing', x: 344, svg: HEN('#FDE68A', '#F59E0B'), box: [-24, -40, 52, 42], s: 0.9 },
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: 440, s: 0.92 },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: 1180, s: 0.94, face: -1 },
    { id: 'lucky', kind: 'dog', x: 1700, s: 0.85 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 505, s: 1.08 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 560 },
  ],
  init(st) {
    HENS.forEach((h) => st.show(h, false));
    st.dog('lucky', 'sit');
  },
};
