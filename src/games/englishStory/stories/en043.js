/**
 * Bài 43 "The Picnic": trước nhà Minh (lịch SUNDAY, bàn ngoài sân, xe của bố) → đường phố → công viên Hồ Tây: cây cao, tấm thảm
 * picnic dưới gốc, bãi cỏ rộng thả diều, bờ hồ có vịt. Chiều: cả nhà lên xe về, Minh ngủ trong xe.
 * Thì quá khứ: lịch "On Sunday" (đã qua, khoanh tròn), cuối truyện trời ngả chiều. "very high": diều bay lên sát mép trời,
 * dây diều dài ra, chim bay bên dưới.
 * Toạ độ cảnh: rộng 2760, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, flowerAt, sun, label, road, fence, palm, windowBox } from '../kit.js';

const FLOOR = 282;
const F = 'font-family="Nunito, sans-serif" font-weight="900"';

// ── Đồ ăn, đồ cầm ───────────────────────────────────────────────────────────
const SANDWICH = `<path d="M-10 4 L0 -8 L10 4Z" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/><path d="M-8 2 H8" stroke="#22C55E" stroke-width="2"/><path d="M-9 4 H9" stroke="#F87171" stroke-width="1.4"/>`;
const FRUIT = `<circle cx="-4" cy="0" r="6" fill="#F97316" stroke="${L}" stroke-width="0.8"/><circle cx="5" cy="1" r="5" fill="#EF4444" stroke="${L}" stroke-width="0.8"/><path d="M5 -4 v-3" stroke="#78350F" stroke-width="1.2"/>`;
const BREAD = `<ellipse rx="4" ry="3" fill="#FCD34D" stroke="${L}" stroke-width="0.6"/>`;
const PROPS = {
  e043_banhmi: `<g transform="rotate(180) translate(0 -2)"><path d="M-3 -2 Q-6 10 -2 22 Q2 24 4 20 Q6 8 3 -2 Q0 -5 -3 -2Z" fill="#F59E0B" stroke="${L}" stroke-width="0.8"/>
    <path d="M-1 2 L1 4 M-1 8 L1 10 M-1 14 L1 16" stroke="#B45309" stroke-width="1"/><path d="M3 4 Q5 12 3 18" stroke="#22C55E" stroke-width="1.6" fill="none"/></g>`,
  e043_juice: `<g transform="translate(0 -4)"><rect x="-6" y="-10" width="12" height="17" rx="2" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1"/>
    <g class="pp-milk" style="transform-origin:0 6px"><rect x="-5" y="-6" width="10" height="12" rx="1.5" fill="#FB923C"/></g><path d="M2 -10 L5 -16" stroke="#EF4444" stroke-width="1.4"/></g>`,
  e043_bread: `<g transform="translate(0 -4)">${BREAD}</g>`,
  e043_ball: `<g transform="translate(0 -6)"><circle r="6" fill="#3B82F6" stroke="${L}" stroke-width="0.8"/><path d="M-6 0 H6" stroke="#fff" stroke-width="1.4"/></g>`,
};
/** Tờ báo của bố (trước ngực). */
const NEWS = `<g transform="translate(0 -6)"><rect x="-22" y="-16" width="44" height="30" rx="1" fill="#F8FAFC" stroke="${L}" stroke-width="1"/><path d="M0 -16 V14" stroke="#CBD5E1" stroke-width="0.8"/>
  <text x="-11" y="-6" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="6" fill="#1F2937" class="es-unflip">NEWS</text>
  <path d="M-19 -1 H-3 M-19 3 H-3 M-19 7 H-6 M3 -10 H19 M3 -6 H19 M3 -2 H19 M3 2 H16 M3 6 H19" stroke="#94A3B8" stroke-width="0.9"/></g>`;
/** Giỏ đồ ăn to (gốc = đáy giỏ). Lớp e043-in hiện dần khi bỏ đồ vào. */
const BASKET = `<g class="e043-bounce">
  <path d="M-34 -50 Q0 -92 34 -50" stroke="#92400E" stroke-width="5" fill="none"/>
  <g class="e043-in e043-in1"><g transform="translate(-16 -50)">${SANDWICH}</g><g transform="translate(-4 -54)">${SANDWICH}</g></g>
  <g class="e043-in e043-in2"><g transform="translate(14 -52)">${FRUIT}</g></g>
  <path d="M-38 -50 H38 L30 0 H-30Z" fill="#D97706" stroke="${L}" stroke-width="1.2"/>
  ${[-38, -26, -14].map((y) => `<path d="M${-36 + (y + 38) * 0.16} ${y} H${36 - (y + 38) * 0.16}" stroke="#92400E" stroke-width="1.4"/>`).join('')}
  ${[-20, 0, 20].map((x) => `<path d="M${x} -50 L${x * 0.8} 0" stroke="#92400E" stroke-width="1.2"/>`).join('')}
  <path d="M-38 -50 H38" stroke="#B91C1C" stroke-width="4"/>
</g>`;
/** Diều: gốc = tay người thả. Dây và diều xoay / dài ra theo mood (m-up, m-high) của actor. */
const KITE = `<g class="e043-kr"><g class="e043-str"><path d="M0 0 V-100" stroke="#475569" stroke-width="1"/></g>
  <g class="e043-kt"><g class="e043-kw"><g transform="rotate(-35)"><path d="M0 -22 L16 0 L0 26 L-16 0Z" fill="#EF4444" stroke="${L}" stroke-width="1.2"/><path d="M0 -22 V26 M-16 0 H16" stroke="#FCA5A5" stroke-width="1"/>
    <path class="e043-tail" d="M0 26 q-6 8 0 14 q6 8 0 14 q-6 8 0 14" stroke="#F59E0B" stroke-width="1.8" fill="none"/>
    <path d="M-3 36 l6 2 M-3 50 l6 2" stroke="#3B82F6" stroke-width="2.6"/></g></g></g></g>`;
/** Vịt bơi (gốc = mặt nước). */
const DUCK = (c = '#fff') => `<g class="e043-bobw"><path d="M-16 -6 Q-18 -18 -6 -16 Q2 -14 8 -10 Q14 -12 14 -4 Q12 4 -2 4 Q-14 4 -16 -6Z" fill="${c}" stroke="${L}" stroke-width="1"/>
  <circle cx="10" cy="-18" r="7" fill="${c}" stroke="${L}" stroke-width="1"/><path d="M16 -18 l7 1.6 l-7 2Z" fill="#F59E0B" stroke="${L}" stroke-width="0.7"/><circle cx="12" cy="-20" r="1.2" fill="#1F2937"/>
  <path d="M-8 -8 q6 -4 12 0" stroke="${L}" stroke-width="0.8" fill="none"/></g>
  <g class="e043-peck"><path d="M-18 4 q16 4 34 0" stroke="#E0F2FE" stroke-width="1.6" fill="none"/></g>`;
/** Bóng lăn (gốc = đất). */
const BALL_T = `<g class="e043-roll" style="transform-origin:0px -7px"><g transform="translate(0 -7)"><circle r="7" fill="#3B82F6" stroke="${L}" stroke-width="0.9"/><path d="M-7 0 H7" stroke="#fff" stroke-width="1.6"/></g></g>`;

const POSES = {
  e043_sit: { R: [24, -60], L: [24, -60], dy: 30 },
  e043_eat: { R: [118, 248], L: [40, 110], dy: 30 },
  e043_drink: { R: [120, 255], L: [40, 110], dy: 30, head: -6 },
  e043_read: { R: [30, 196], L: [30, 196], dy: 30, head: 6 },
  e043_sitWave: { R: [128, 175], L: [40, 110], dy: 30 },
  e043_sitClap: { R: [40, -90], L: [40, -90], dy: 30 },
  e043_kite: { R: [130, 150], L: [20, 10], head: -10 },
  e043_up: { R: [150, 160], L: [10, 4], head: -12 },
  e043_throw: { R: [110, 70], L: [10, 4] },
  e043_make: { R: [60, -20], L: [60, -20], head: 8 },
  e043_hold: { R: [26, -70], L: [26, -70] },
};

const LBS = ['sun', 'lake', 'tom', 'basket', 'sand', 'fruit', 'tree', 'eat', 'kite', 'high', 'ducks', 'bread', 'pm', 'sleep'];
const lb = (name, inner) => `<g class="e043-lb e043-${name}">${inner}</g>`;
/** Chỗ ngồi trên thảm. */
const SEAT = { mum: 1546, dad: 1612, lan: 1690, minh: 1754, tom: 1818, lucky: 1966 };

function bg() {
  return `
  ${sky(0, 2760, 315, 'e043sky')}
  <defs><linearGradient id="e043pm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F97316"/><stop offset="1" stop-color="#FDE68A"/></linearGradient></defs>
  <rect class="e043-pmsky" x="0" y="0" width="2760" height="${FLOOR}" fill="url(#e043pm)"/>
  ${cloud(140, 54, 0.8, 0)}${cloud(700, 70, 0.9, 2)}${cloud(1300, 48, 0.8, 1)}${cloud(2280, 60, 0.9, 3)}
  <g class="e043-sunpos">${sun(22)}</g>
  <!-- Nhà Minh (mặt tiền) -->
  <path d="M0 236 Q200 214 420 230 T700 226 V282 H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(200 0)">
    <path d="M-170 110 L0 46 L170 110Z" fill="#F97316" stroke="${L}" stroke-width="1.4"/>
    <rect x="-150" y="110" width="300" height="${FLOOR - 110}" fill="#FEF3C7" stroke="${L}" stroke-width="1.4"/>
    <rect x="-24" y="${FLOOR - 92}" width="48" height="92" rx="4" fill="#B45309" stroke="${L}"/><circle cx="14" cy="${FLOOR - 46}" r="3" fill="#FDE68A"/>
    ${windowBox(-128, 140, 70, 60)}${windowBox(58, 140, 70, 60)}
  </g>
  <!-- lịch Chủ nhật trên tường -->
  <g transform="translate(200 128)"><rect x="-34" y="-12" width="68" height="62" rx="5" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-34" y="-12" width="68" height="16" rx="5" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    <text x="0" y="22" text-anchor="middle" ${F} font-size="12" fill="#DC2626">SUNDAY</text><text x="0" y="42" text-anchor="middle" ${F} font-size="16" fill="#1F2937">8</text>
    <g class="e043-circ"><ellipse cx="0" cy="30" rx="31" ry="20" fill="none" stroke="#F97316" stroke-width="2.6"/></g></g>
  ${lb('sun', label(200, 98, 'On Sunday', '#B45309', 15))}
  ${fence(380, 260, FLOOR)}
  <!-- biển chỉ đường -->
  <g transform="translate(640 0)"><path d="M0 ${FLOOR} V160" stroke="#475569" stroke-width="4"/><rect x="-54" y="132" width="108" height="32" rx="5" fill="#0EA5E9" stroke="${L}" stroke-width="1.2"/>
    <text x="-6" y="154" text-anchor="middle" ${F} font-size="13" fill="#fff">WEST LAKE</text><path d="M42 141 l7 7 l-7 7" stroke="#fff" stroke-width="2.4" fill="none"/></g>
  ${lb('lake', label(560, 104, 'a picnic', '#15803D', 15))}
  ${lb('tom', label(80, 140, 'Tom', '#16A34A', 16))}
  ${lb('basket', label(410, 136, 'a big basket', '#B45309', 15))}
  ${lb('sand', label(340, 96, 'sandwiches', '#C2410C', 14))}
  ${lb('fruit', label(250, 126, 'fruit', '#DC2626', 14))}
  <!-- phố -->
  ${[[720, 120, '#FCA5A5'], [820, 90, '#A5B4FC'], [910, 140, '#FDE68A'], [1010, 100, '#86EFAC'], [1110, 130, '#FDBA74']].map(([x, h, c]) => `<rect x="${x}" y="${FLOOR - 10 - h}" width="86" height="${h}" fill="${c}" stroke="${L}" stroke-width="1.2"/>
    ${Array.from({ length: Math.floor(h / 36) }, (_, r) => `<rect x="${x + 12}" y="${FLOOR - h + r * 36}" width="20" height="18" fill="#E0F2FE" stroke="${L}" stroke-width="0.7"/><rect x="${x + 50}" y="${FLOOR - h + r * 36}" width="20" height="18" fill="#E0F2FE" stroke="${L}" stroke-width="0.7"/>`).join('')}`).join('')}
  ${road(0, 1500, FLOOR)}
  <!-- Công viên Hồ Tây -->
  <path d="M1220 232 Q1500 204 1800 226 T2300 220 T2760 224 V282 H1220Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${palm(1260, 250, 0.8)}
  <g transform="translate(1380 0)"><rect x="-6" y="150" width="12" height="${FLOOR - 150}" fill="#A16207" stroke="${L}"/><rect x="-56" y="120" width="112" height="34" rx="6" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <text x="0" y="143" text-anchor="middle" ${F} font-size="15" fill="#0369A1">WEST LAKE</text></g>
  <rect x="1440" y="${FLOOR - 4}" width="1320" height="40" fill="#4ADE80" stroke="${L}"/>
  ${Array.from({ length: 28 }, (_, i) => `<path d="M${1460 + i * 46} ${FLOOR + 12} l3 -7 l3 7" stroke="#16A34A" stroke-width="1.4" fill="none"/>`).join('')}
  <!-- cây cao + thảm -->
  ${tree(1660, FLOOR - 2, 1.75, '')}
  ${lb('tree', label(1760, 64, 'a tall tree', '#15803D', 15))}
  <ellipse cx="1715" cy="${FLOOR - 2}" rx="200" ry="10" fill="#FCA5A5" stroke="${L}" stroke-width="1"/>
  ${lb('eat', label(1730, 120, 'banh mi + orange juice', '#C2410C', 13))}
  ${tree(2060, FLOOR - 4, 0.8, '#F59E0B')}
  <!-- hồ -->
  <path d="M2230 262 Q2260 246 2300 246 H2760 V315 H2230Z" fill="#38BDF8" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: 11 }, (_, i) => `<path d="M${2310 + i * 40} ${262 + (i % 3) * 14} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  ${lb('ducks', label(2400, 200, 'ducks', '#0369A1', 16))}
  ${lb('bread', label(2340, 160, 'bread', '#B45309', 15))}
  ${lb('kite', label(1940, 112, 'a red kite', '#DC2626', 14))}
  ${lb('high', label(2180, 150, 'very high!', '#7C3AED', 17))}
  <g class="e043-birds">${[[2040, 120], [2070, 132], [2100, 114]].map(([x, y]) => `<path d="M${x - 8} ${y} q4 -5 8 0 q4 -5 8 0" stroke="${L}" stroke-width="1.6" fill="none"/>`).join('')}</g>
  ${lb('pm', label(1500, 96, 'In the afternoon', '#C2410C', 14))}
  ${lb('sleep', label(600, 204, 'Minh slept', '#6366F1', 15))}`;
}

function fg() {
  return `
  <!-- bàn ngoài sân (cất đi khi cả nhà về) -->
  <g class="e043-ytable"><g transform="translate(410 0)"><rect x="-44" y="232" width="88" height="8" rx="3" fill="#B45309" stroke="${L}"/><path d="M-34 240 V${FLOOR} M34 240 V${FLOOR}" stroke="#92400E" stroke-width="4"/>
    <g class="e043-plate"><ellipse cx="-14" cy="231" rx="14" ry="3" fill="#fff" stroke="${L}" stroke-width="0.8"/><g transform="translate(-14 224)">${SANDWICH}</g><g transform="translate(-20 226) scale(0.9)">${SANDWICH}</g></g></g></g>
  <!-- mép trước tấm thảm (che chân người ngồi) + giỏ -->
  <path d="M1508 ${FLOOR - 26} H1920 L1944 ${FLOOR + 10} H1484Z" fill="#F87171" stroke="${L}" stroke-width="1.1"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${1530 + i * 46} ${FLOOR - 26} L${1514 + i * 50} ${FLOOR + 10}" stroke="#fff" stroke-width="3" opacity="0.7"/>`).join('')}
  <path d="M1496 ${FLOOR - 8} H1932" stroke="#fff" stroke-width="3" opacity="0.7"/>
  <g class="e043-parkB"><g transform="translate(1650 ${FLOOR - 6}) scale(0.6)">${BASKET}</g></g>
  ${bush(1450, FLOOR + 12, 0.9, '#22C55E')}${flowerAt(1960, FLOOR + 6)}${flowerAt(1972, FLOOR + 8, '#FACC15')}
  <!-- bánh mì vụn trên mặt nước -->
  <g class="e043-crumbs">${[[2330, 270], [2350, 278], [2372, 268]].map(([x, y]) => `<g transform="translate(${x} ${y})">${BREAD}</g>`).join('')}</g>`;
}

const CSS = `
.e043-lb { opacity: 0; transition: opacity .35s; }
${LBS.map((n) => `.st-${n} .e043-${n}`).join(', ')} { opacity: 1; }
.e043-pax { opacity: 0; transition: opacity .3s; } .es-ac.m-full .e043-pax { opacity: 1; }
.e043-circ { opacity: 0; transition: opacity .3s; } .st-sun .e043-circ { opacity: 1; }
.e043-sunpos { transform: translate(1900px, 70px); transition: transform 2s ease-in-out; } .st-pmsun .e043-sunpos { transform: translate(1300px, 150px); }
.e043-pmsky { opacity: 0; transition: opacity 1.6s; } .st-pmsun .e043-pmsky { opacity: .5; }
.e043-plate { transition: opacity .3s; } .st-sand .e043-plate, .st-packed .e043-plate { opacity: 0; }
.e043-in { opacity: 0; transition: opacity .3s .5s; } .st-in1 .e043-in1, .st-in2 .e043-in2 { opacity: 1; }
.e043-bounce { animation: e043Bounce 1.6s ease-in-out infinite alternate; } @keyframes e043Bounce { to { transform: translateY(-2px); } }
.e043-ytable { transition: opacity .3s; } .st-home2 .e043-ytable { opacity: 0; }
.e043-parkB { opacity: 0; transition: opacity .3s; } .st-park .e043-parkB { opacity: 1; } .st-home2 .e043-ytable { transition: opacity .3s; } .st-home2 .e043-ytable { opacity: 0; }
.e043-parkB { opacity: 0; }
/* diều: gốc ở tay, dây dài ra (scaleY), diều ở đầu dây */
.e043-kr { transform: rotate(10deg); transition: transform 2s cubic-bezier(.4,0,.3,1); }
.e043-str { transform: scaleY(.2); transition: transform 2s cubic-bezier(.4,0,.3,1); }
.e043-kt { transform: translateY(-20px); transition: transform 2s cubic-bezier(.4,0,.3,1); }
.es-ac.m-up .e043-kr { transform: rotate(45deg); } .es-ac.m-up .e043-str { transform: scaleY(.8); } .es-ac.m-up .e043-kt { transform: translateY(-80px); }
.es-ac.m-high .e043-kr { transform: rotate(34deg); } .es-ac.m-high .e043-str { transform: scaleY(1.5); } .es-ac.m-high .e043-kt { transform: translateY(-150px); }
.e043-kw { animation: e043Kw 1.1s ease-in-out infinite alternate; } @keyframes e043Kw { from { transform: rotate(-30deg); } to { transform: rotate(-42deg); } }
.e043-tail { animation: e043Kw 0.6s ease-in-out infinite alternate; }
.e043-birds { opacity: 0; transition: opacity .4s; } .st-high .e043-birds { opacity: 1; animation: e043Fly 2s ease-in-out infinite alternate; }
@keyframes e043Fly { to { transform: translate(14px, -6px); } }
.e043-bobw { animation: e043Bob 1.3s ease-in-out infinite alternate; } @keyframes e043Bob { to { transform: translateY(1.6px) rotate(-2deg); } }
.e043-peck { opacity: 0; }
.es-thing.act-e043-peck .e043-bobw { animation: e043Peck .3s ease-in-out infinite alternate; transform-origin: 10px -10px; }
@keyframes e043Peck { to { transform: rotate(24deg); } }
.e043-crumbs { opacity: 0; transition: opacity .3s; } .st-crumbs .e043-crumbs { opacity: 1; } .st-eaten .e043-crumbs { opacity: 0; transition-delay: .8s; }
.es-thing.is-walk .e043-roll { animation: e043Spin .3s linear infinite; } @keyframes e043Spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .e043-kw, .e043-tail, .e043-bobw { animation-duration: 3s; } .st-high .e043-birds { animation-duration: 5s; } }
`;

const FAM = ['mum', 'dad', 'lan', 'minh', 'tom'];

const BEATS = [
  { key: ['On Sunday', 'went on a picnic to West Lake'], icon: '🧺', label: 'a picnic', async play(st) {
    st.look(330);
    st.set('st-sun'); st.sfx('page-turn');
    await st.wait(900);
    st.set('st-lake'); st.sfx('pop', { vol: 0.7 }); st.pose('minh', 'point'); st.act('minh', 'point'); st.mood('minh', 'joy');
    st.pose('lan', 'cheer'); st.act('lan', 'hop'); st.mood('lan', 'joy');
    await st.wait(1500);
    st.act('minh', null); st.act('lan', null); st.pose('minh', 'stand'); st.pose('lan', 'stand');
  } },
  { key: ['Tom came with them'], icon: '👋', label: 'Tom came', async play(st) {
    st.set('st-sun', false); st.set('st-lake', false);
    st.show('tom', true);
    st.look(240);
    await st.walk('tom', 80, { speed: 150, follow: false });
    st.set('st-tom');
    st.pose('tom', 'wave'); st.act('tom', 'wave'); st.mood('tom', 'joy');
    st.pose('minh', 'wave'); st.act('minh', 'wave'); st.face('minh', -1);
    st.act('lucky', 'wag'); st.mood('lucky', 'joy'); st.sfx('dog-bark', { vol: 0.5 });
    await st.wait(1400);
    st.act('tom', null); st.act('minh', null); st.pose('tom', 'stand'); st.pose('minh', 'stand'); st.act('lucky', null);
  } },
  { key: ['a big basket of food'], icon: '🧺', label: 'a big basket', async play(st) {
    st.set('st-tom', false); st.face('minh', 1);
    st.look(330);
    st.show('basket', true); st.fx('poof', 410, 200);
    await st.wait(300);
    st.set('st-basket');
    st.pose('dad', 'point'); st.face('dad', -1); st.mood('dad', 'joy');
    st.mood('minh', 'wow'); st.mood('tom', 'wow');
    await st.wait(1600);
    st.pose('dad', 'stand'); st.mood('minh', 'joy'); st.mood('tom', 'joy');
  } },
  { key: ['Mum made sandwiches', 'Lan brought some fruit'], icon: '🥪', label: 'sandwiches + fruit', async play(st) {
    st.set('st-basket', false);
    st.pose('mum', 'e043_make'); st.mood('mum', 'joy');
    st.set('st-sand');
    st.sfx('whoosh', { vol: 0.5 });
    await st.fly(`<g transform="scale(1.4)">${SANDWICH}</g>`, [396, 226], [404, 196], { size: 30, dur: 600 });
    st.set('st-in1'); st.sfx('bowl-down', { vol: 0.5 });
    await st.wait(300);
    st.chest('lan', `<g transform="translate(0 -4) scale(1.3)">${FRUIT}</g>`); st.pose('lan', 'e043_hold');
    st.set('st-fruit');
    await st.wait(600);
    st.chest('lan', null); st.pose('lan', 'give');
    st.sfx('whoosh', { vol: 0.5 });
    await st.fly(`<g transform="scale(1.4)">${FRUIT}</g>`, [282, 196], [418, 196], { size: 30, dur: 700 });
    st.set('st-in2'); st.sfx('pop', { vol: 0.6 }); st.mood('lan', 'joy');
    await st.wait(600);
    st.pose('lan', 'stand'); st.pose('mum', 'stand');
  } },
  { key: ['sat on the grass under a tall tree'], icon: '🌳', label: 'under a tall tree', async play(st) {
    st.set('st-sand', false); st.set('st-fruit', false); st.set('st-packed');
    st.show('basket', false);
    for (const id of FAM) st.show(id, false);
    st.show('lucky', false);
    st.mood('car', 'full');
    await st.wait(300);
    await st.loop('car-go', () => st.walk('car', 1440, { speed: 460, lead: 120 }), { vol: 0.6 });
    st.set('st-park'); st.sfx('door-open', { vol: 0.5 });
    const order = [['mum', 1490], ['dad', 1470], ['lan', 1510], ['minh', 1530], ['tom', 1500]];
    for (const [id, x] of order) { st.place(id, x, null, 1); st.show(id, true); }
    st.place('lucky', 1520, null, 1); st.show('lucky', true);
    await Promise.all([...FAM.map((id) => st.walk(id, SEAT[id], { speed: 220, follow: false })), st.walk('lucky', SEAT.lucky, { speed: 300, follow: false }), st.look(1700, { dur: 1400 })]);
    for (const id of FAM) { st.pose(id, 'e043_sit'); st.mood(id, 'joy'); }
    st.face('mum', 1); st.face('dad', 1); st.face('tom', -1);
    st.dog('lucky', 'sit'); st.face('lucky', -1);
    st.set('st-tree'); st.sfx('birds', { vol: 0.6 });
    await st.wait(700);
  } },
  { key: ['ate banh mi', 'drank orange juice'], icon: '🥖', label: 'banh mi + juice', async play(st) {
    st.set('st-tree', false);
    st.look(1720);
    st.set('st-eat');
    for (const id of ['lan', 'minh', 'tom']) { st.hold(id, 'e043_banhmi'); st.pose(id, 'e043_eat'); st.act(id, 'eat'); }
    await st.wait(200); st.sfx('crunch', { vol: 0.6 });
    await st.wait(700); st.sfx('crunch', { vol: 0.5, rate: 1.1 });
    await st.wait(600);
    for (const id of ['lan', 'minh', 'tom']) { st.act(id, null); st.hold(id, 'e043_juice'); st.pose(id, 'e043_drink'); st.act(id, 'drink'); }
    st.sfx('gulp', { vol: 0.6 });
    await st.wait(1600);
  } },
  { key: ['Minh and Tom flew a red kite'], icon: '🪁', label: 'a red kite', async play(st) {
    st.set('st-eat', false);
    for (const id of ['lan', 'minh', 'tom']) { st.act(id, null); st.hold(id, null); }
    st.pose('lan', 'e043_sit');
    await Promise.all([st.walk('minh', 2010, { speed: 180, follow: false }), st.walk('tom', 2092, { speed: 180, follow: false }), st.look(1980, { dur: 1300 })]);
    st.face('tom', -1);
    st.pose('minh', 'e043_kite'); st.place('kite', 2045, 181); st.show('kite', true);
    st.set('st-kite'); st.sfx('wind', { vol: 0.5 });
    await st.wait(100);
    st.mood('kite', 'up'); st.sfx('whoosh', { vol: 0.6 });
    st.pose('tom', 'e043_up'); st.mood('tom', 'joy'); st.mood('minh', 'joy');
    await st.wait(2000);
  } },
  { key: ['very high in the sky'], icon: '☁️', label: 'very high', async play(st) {
    st.set('st-kite', false);
    st.look(2060);
    st.mood('kite', 'high'); st.sfx('wind', { vol: 0.6 });
    st.pose('tom', 'cheer'); st.act('tom', 'jump'); st.sfx('cheer', { vol: 0.6 });
    await st.wait(1300);
    st.set('st-high');
    await st.wait(1200);
    st.act('tom', null);
  } },
  { key: ['Lucky ran after a ball', 'Dad read a newspaper'], icon: '🐕', label: 'ball + newspaper', async play(st) {
    st.set('st-high', false);
    st.look(1760);
    st.hold('lan', 'e043_ball'); st.pose('lan', 'e043_throw');
    await st.wait(300);
    st.hold('lan', null);
    st.look(1900); st.sfx('whoosh', { vol: 0.6 });
    await st.fly(`<circle r="7" fill="#3B82F6" stroke="${L}"/><path d="M-7 0 H7" stroke="#fff" stroke-width="1.6"/>`, [1700, 196], [2110, 272], { size: 16, dur: 800 });
    st.place('ball', 2110); st.show('ball', true);
    st.dog('lucky', 'stand'); st.mood('lucky', 'joy'); st.sfx('dog-bark', { vol: 0.6 });
    st.pose('lan', 'e043_sitClap'); st.act('lan', 'clap');
    await Promise.all([st.walk('ball', 2180, { speed: 90, follow: false }), st.walk('lucky', 2160, { speed: 260, follow: false })]);
    st.act('lucky', 'jump');
    st.look(1720, { dur: 700 });
    st.chest('dad', NEWS); st.pose('dad', 'e043_read'); st.sfx('page-turn');
    await st.wait(1300);
    st.act('lucky', null); st.act('lan', null); st.pose('lan', 'e043_sit');
  } },
  { key: ['saw some ducks on the lake'], icon: '🦆', label: 'ducks', async play(st) {
    st.mood('kite', 'up'); st.show('ball', false);
    st.walk('lucky', SEAT.lucky, { speed: 220, follow: false }).then(() => { st.face('lucky', -1); st.dog('lucky', 'sit'); });
    await st.wait(200);
    st.show('kite', false);
    await Promise.all([st.walk('minh', 2140, { speed: 180, lead: 160 }), st.walk('tom', 2200, { speed: 180, follow: false })]);
    st.face('tom', 1);
    st.show('d1', true); st.show('d2', true); st.show('d3', true); st.sfx('splash', { vol: 0.4 });
    await Promise.all([st.walk('d1', 2420, { speed: 90, follow: false }), st.walk('d2', 2480, { speed: 90, follow: false }), st.walk('d3', 2540, { speed: 90, follow: false })]);
    st.set('st-ducks'); st.sfx('quack', { vol: 0.8 }); st.pose('minh', 'point'); st.act('minh', 'point'); st.mood('minh', 'wow');
    await st.wait(1200);
    st.act('minh', null); st.pose('minh', 'stand'); st.mood('minh', 'joy');
  } },
  { key: ['Tom gave them some bread'], icon: '🍞', label: 'bread', async play(st) {
    st.set('st-ducks', false);
    st.look(2330);
    st.hold('tom', 'e043_bread'); st.pose('tom', 'e043_throw'); st.set('st-bread');
    await st.wait(300);
    st.sfx('whoosh', { vol: 0.5 });
    st.fly(`<g transform="scale(1.6)">${BREAD}</g>`, [2236, 196], [2340, 268], { size: 14, dur: 550 });
    await st.wait(200);
    st.fly(`<g transform="scale(1.6)">${BREAD}</g>`, [2236, 196], [2366, 270], { size: 14, dur: 550 });
    await st.wait(450);
    st.set('st-crumbs'); st.sfx('quack', { vol: 0.7 }); st.hold('tom', null); st.mood('tom', 'joy');
    await Promise.all([st.walk('d1', 2356, { speed: 90, follow: false }), st.walk('d2', 2400, { speed: 90, follow: false }), st.walk('d3', 2448, { speed: 90, follow: false })]);
    for (const d of ['d1', 'd2', 'd3']) { st.face(d, -1); st.act(d, 'e043-peck'); }
    st.set('st-eaten'); st.sfx('crunch', { vol: 0.4, rate: 1.3 });
    await st.wait(500); st.sfx('quack', { vol: 0.6, rate: 1.1 });
    await st.wait(1200);
    st.pose('tom', 'stand');
  } },
  { key: ['In the afternoon', 'went home'], icon: '🚗', label: 'went home', async play(st) {
    st.set('st-bread', false);
    st.set('st-pmsun'); st.set('st-pm');
    await st.look(1640, { dur: 1100 });
    for (const id of FAM) st.pose(id, 'stand');
    st.chest('dad', null); st.dog('lucky', 'stand');
    await Promise.all([...FAM.map((id, i) => st.walk(id, 1450 + i * 12, { speed: 260, follow: false })), st.walk('lucky', 1470, { speed: 300, follow: false })]);
    for (const id of FAM) st.show(id, false);
    st.sfx('door-open', { vol: 0.5 });
    st.show('lucky', false); st.set('st-home2'); st.mood('car', 'full');
    await st.wait(200);
    await st.loop('car-go', () => st.walk('car', 610, { speed: 460, lead: -60 }), { vol: 0.6 });
  } },
  { key: ['Everyone was happy', 'Minh slept in the car'], icon: '😴', label: 'slept in the car', async play(st) {
    st.set('st-pm', false);
    st.look(520);
    st.show('car', false); st.place('carZ', 610, null, -1); st.show('carZ', true);
    const out = [['tom', 380], ['mum', 440], ['lan', 500]];
    for (const [id, x] of out) { st.place(id, x, null, 1); st.show(id, true); st.mood(id, 'joy'); }
    st.place('lucky', 334, null, 1); st.show('lucky', true);
    await st.wait(300);
    st.pose('mum', 'clap'); st.act('mum', 'clap'); st.sfx('clap', { vol: 0.6 }); st.pose('lan', 'cheer'); st.pose('tom', 'cheer'); st.act('tom', 'hop');
    st.fx('hearts', 450, 120);
    await st.wait(800);
    st.act('mum', null); st.pose('mum', 'e043_shh'); st.set('st-sleep');
    st.fx('zzz', 590, 196);
    await st.wait(1500);
    st.act('tom', null);
  } },
];
POSES.e043_shh = { R: [150, 262], L: [10, 4], head: 6 };

export default {
  id: 'en043', worldW: 2760, floor: FLOOR, viewTop: 40, camStart: 80, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'car', kind: 'car', x: 610, y: 300, svg: `<g class="e043-pax">${headOnly('en_dad_home', { s: 0.8 })}<g transform="translate(-30 6)">${headOnly('en_minh_home', { s: 0.68, mood: 'joy' })}</g></g>` },
    { id: 'carZ', kind: 'car', x: 610, y: 300, face: -1, svg: `${headOnly('en_dad_home', { s: 0.8 })}<g transform="translate(-30 8)">${headOnly('en_minh_home', { s: 0.68, mood: 'shut', rot: 18 })}</g>` },
    { id: 'basket', kind: 'thing', x: 414, y: 232, s: 0.8, svg: BASKET, box: [-42, -96, 84, 98] },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 330, s: 0.95 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 494, s: 0.95, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 262, s: 1.08 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 200 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: -40 },
    { id: 'lucky', kind: 'dog', x: 140, s: 0.85 },
    { id: 'ball', kind: 'thing', x: 1820, svg: BALL_T, box: [-8, -15, 16, 16] },
    { id: 'kite', kind: 'thing', x: 2045, y: 181, svg: KITE, box: [-30, -220, 160, 222] },
    { id: 'd1', kind: 'thing', x: 2800, y: 276, svg: DUCK(), box: [-20, -28, 46, 34], face: -1 },
    { id: 'd2', kind: 'thing', x: 2850, y: 282, svg: DUCK('#FDE68A'), box: [-20, -28, 46, 34], face: -1 },
    { id: 'd3', kind: 'thing', x: 2900, y: 274, svg: DUCK(), box: [-20, -28, 46, 34], face: -1 },
  ],
  init(st) {
    st.show('tom', false); st.show('basket', false); st.show('ball', false); st.show('kite', false); st.show('carZ', false);
    st.show('d1', false); st.show('d2', false); st.show('d3', false);
  },
};
