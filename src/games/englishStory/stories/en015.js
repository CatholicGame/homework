/**
 * Bài 15 "My Week": Minh đi qua một tuần, mỗi ngày một nơi, nối nhau từ trái sang phải:
 * cổng trường (thứ Hai → thứ Sáu) · lớp tiếng Anh (Mon) · sân bóng với Tom (Tue) · thư viện với Lan (Wed) ·
 * phòng nhạc (Thu) · sân chơi với cô Hoa (Fri) · nhà ông bà có ao lớn (Sat) · nhà Minh: phòng ngủ + bếp (Sun).
 * Mỗi nơi có dải lịch 7 ngày, ngày của nơi đó sáng lên khi tới. Toạ độ cảnh: rộng 3040, cao 315, sàn y = 282.
 */
import { CAST, lying } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, grass, fence, room, board, books, label, schoolFront, BOWL, bush, flowerAt } from '../kit.js';

const FLOOR = 282;

Object.assign(CAST, {
  e015_eng: { adult: true, hair: 'bob', top: 'blouse', shirt: '#FDBA74', bottom: 'pants', bottomC: '#334155', shoe: '#44403C', glasses: true },
  e015_mus: { adult: true, hair: 'short', top: 'shirt', shirt: '#C4B5FD', bottom: 'pants', bottomC: '#1F2937', shoe: '#1C1917' },
  e015_k1: { hair: 'pigtails', top: 'tee', shirt: '#FDE047', bottom: 'skirt', bottomC: '#2563EB', shoe: '#F472B6' },
  e015_k2: { hair: 'bowl', top: 'tee', shirt: '#F87171', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#2563EB' },
});

// ── Dải lịch 7 ngày ────────────────────────────────────────────────────────
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const LIT = []; // các khoá đèn: mỗi khoá = một ô sáng khi có class st-<khoá>
/** Dải lịch ở (x giữa, y trên). lit: { chỉ số ngày: khoá trạng thái }. */
const week = (x, y, lit) => `<g transform="translate(${x - 115} ${y})"><rect x="-6" y="-4" width="242" height="32" rx="9" fill="#fff" stroke="${L}" stroke-width="1.2"/>
  ${DAYS.map((d, i) => { if (lit[i]) LIT.push(lit[i]); return `<g transform="translate(${i * 33} 0)"><rect width="31" height="24" rx="5" fill="${i > 4 ? '#FCE7F3' : '#E2E8F0'}" stroke="${L}" stroke-width="0.7"/>
    ${lit[i] ? `<rect class="e015-on e015-on-${lit[i]}" width="31" height="24" rx="5" fill="#FACC15" stroke="#EA580C" stroke-width="1.6"/>` : ''}
    <text x="15.5" y="16.5" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="10" fill="#334155">${d}</text></g>`; }).join('')}</g>`;
const tag = (n, x, y, text, c, size = 18) => `<g class="e015-tag e015-t-${n}">${label(x, y, text, c, size)}</g>`;
const TAGS = ['mf', 'eng', 'foot', 'lib', 'music', 'sing', 'games', 'visit', 'pond', 'fish', 'noschool', 'late', 'pho', 'love'];

// ── Đồ vật ────────────────────────────────────────────────────────────────
const SOCCER = `<circle r="9" fill="#fff" stroke="${L}" stroke-width="1"/><path d="M0 -3.6 l3.4 2.5 -1.3 4 h-4.2 l-1.3 -4Z" fill="#1F2937"/><path d="M0 -3.6 V-9 M3.4 -1.1 L8.6 -2.8 M2.1 2.9 L5.3 7.2 M-2.1 2.9 L-5.3 7.2 M-3.4 -1.1 L-8.6 -2.8" stroke="#1F2937" stroke-width="0.9"/>`;
const FISH = `<g><path d="M-12 0 Q-2 -9 10 0 Q-2 9 -12 0Z" fill="#F97316" stroke="${L}" stroke-width="0.9"/><path d="M8 0 L16 -6 V6Z" fill="#FB923C" stroke="${L}" stroke-width="0.9"/><circle cx="-6" cy="-1.6" r="1.4" fill="#1F2937"/></g>`;
const note = (x, y, d, c = '#7C3AED') => `<g class="e015-note" style="animation-delay:${d}s"><g transform="translate(${x} ${y})"><path d="M0 0 V-16 L10 -19 V-4" stroke="${c}" stroke-width="2" fill="none"/><ellipse cx="-2.6" cy="0.6" rx="4" ry="3" fill="${c}"/><ellipse cx="7.4" cy="-3.4" rx="4" ry="3" fill="${c}"/></g></g>`;
const pillar = (x) => `<rect x="${x - 8}" y="0" width="16" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>`;

function bg() {
  LIT.length = 0;
  return `
  <!-- Cổng trường -->
  ${sky(0, 420, 315, 'e015sk')}
  ${cloud(80, 110, 0.9, 0)}
  ${grass(0, 420, FLOOR)}
  ${schoolFront(300, FLOOR)}
  <rect x="276" y="${FLOOR - 76}" width="48" height="76" rx="4" fill="#FEF3C7" stroke="${L}"/><g class="e015-sdoor"><rect x="276" y="${FLOOR - 76}" width="48" height="76" rx="4" fill="#B45309" stroke="${L}"/><circle cx="314" cy="${FLOOR - 36}" r="3" fill="#FDE68A"/></g>
  ${week(150, 46, { 0: 'g0', 1: 'g1', 2: 'g2', 3: 'g3', 4: 'g4' })}
  <!-- Thứ Hai: lớp tiếng Anh -->
  ${room(410, 330, FLOOR, '#E0F2FE', '#C7D2FE')}
  ${board(430, 96, 170, 82, '')}
  <text x="515" y="128" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="22" fill="#FDE047">ENGLISH</text>
  <text x="515" y="160" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="18" fill="#F8FAFC">A B C  Hello!</text>
  <rect x="676" y="204" width="34" height="40" rx="5" fill="#60A5FA" stroke="${L}"/>
  ${week(575, 46, { 0: 'mon' })}
  <!-- Thứ Ba: sân bóng -->
  ${sky(740, 380, 315, 'e015sk2')}${cloud(860, 100, 1, 2)}
  ${grass(740, 380, FLOOR, '#4ADE80')}
  <path d="M760 ${FLOOR + 6} H1110" stroke="#fff" stroke-width="3"/>
  <g transform="translate(1086 0)"><path d="M-30 ${FLOOR} V180 H30 V${FLOOR}" stroke="#F8FAFC" stroke-width="6" fill="none"/><path d="M-30 ${FLOOR} V180 H30 V${FLOOR}" stroke="${L}" stroke-width="1" fill="none"/>
    <g class="e015-net">${Array.from({ length: 6 }, (_, i) => `<path d="M${-24 + i * 10} 184 V${FLOOR}" stroke="#CBD5E1" stroke-width="1"/>`).join('')}${Array.from({ length: 10 }, (_, i) => `<path d="M-27 ${190 + i * 10} H27" stroke="#CBD5E1" stroke-width="1"/>`).join('')}</g>
    <g class="e015-goalball" transform="translate(0 ${FLOOR - 12})">${SOCCER}</g></g>
  <g transform="translate(790 ${FLOOR})"><rect x="-34" y="-30" width="68" height="8" rx="3" fill="#A16207" stroke="${L}"/><rect x="-30" y="-22" width="6" height="22" fill="#78350F"/><rect x="24" y="-22" width="6" height="22" fill="#78350F"/></g>
  <rect x="822" y="40" width="226" height="40" rx="6" fill="#1F2937" stroke="${L}"/>${week(935, 46, { 1: 'tue' })}
  <path d="M840 80 V160 M1030 80 V160" stroke="#64748B" stroke-width="4"/>
  ${pillar(740)}
  <!-- Thứ Tư: thư viện -->
  ${room(1120, 340, FLOOR, '#FEF3C7')}
  ${[1140, 1360].map((x) => `<rect x="${x}" y="96" width="84" height="186" rx="3" fill="#B45309" stroke="${L}"/><rect x="${x + 5}" y="101" width="74" height="176" fill="#78350F"/>
    ${[148, 196, 244].map((y) => `<rect x="${x + 5}" y="${y}" width="74" height="5" fill="#A16207"/>`).join('')}${[148, 196, 244, 277].map((y) => books(x + 7, y, 8)).join('')}`).join('')}
  <rect x="1236" y="96" width="112" height="28" rx="6" fill="#fff" stroke="${L}"/><text x="1292" y="116" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="14" fill="#B45309">LIBRARY</text>
  ${week(1290, 46, { 2: 'wed' })}
  ${pillar(1120)}
  <!-- Thứ Năm: phòng nhạc -->
  ${room(1460, 330, FLOOR, '#F3E8FF', '#D9A066')}
  ${[0, 1, 2, 3, 4].map((i) => `<path d="M1600 ${110 + i * 8} H1770" stroke="#C4B5FD" stroke-width="1.4"/>`).join('')}
  ${note(1630, 140, 0, '#A78BFA')}${note(1720, 132, 0, '#A78BFA')}
  <g class="e015-sing">${note(1700, 170, 0)}${note(1730, 160, -0.6, '#EC4899')}${note(1670, 160, -1.2, '#2563EB')}</g>
  <g class="e015-play">${note(1530, 160, -0.3, '#F59E0B')}${note(1560, 150, -0.9, '#16A34A')}</g>
  ${week(1625, 46, { 3: 'thu' })}
  ${pillar(1460)}
  <!-- Thứ Sáu: sân chơi -->
  ${sky(1790, 360, 315, 'e015sk3')}${cloud(1900, 104, 0.9, 4)}
  ${grass(1790, 360, FLOOR)}
  ${tree(2120, FLOOR - 6, 1)}
  ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${1800 + i * 40} 96 l20 0 l-10 16Z" fill="${['#F87171', '#FBBF24', '#34D399', '#60A5FA'][i % 4]}" stroke="${L}" stroke-width="0.6"/>`).join('')}<path d="M1800 96 H2130" stroke="${L}" stroke-width="1"/>
  ${week(1970, 46, { 4: 'fri' })}
  ${pillar(1790)}
  <!-- Thứ Bảy: nhà ông bà, ao lớn -->
  ${sky(2150, 500, 315, 'e015sk4')}${cloud(2400, 96, 1.1, 1)}
  ${grass(2150, 500, FLOOR, '#86EFAC')}
  <g transform="translate(2255 0)"><path d="M-104 128 L-70 76 H70 L104 128Z" fill="#B91C1C" stroke="${L}" stroke-width="1.2"/>
    <rect x="-90" y="124" width="180" height="${FLOOR - 124}" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/>
    <rect x="-74" y="146" width="40" height="40" fill="#BAE6FD" stroke="${L}"/><rect x="34" y="146" width="40" height="40" fill="#BAE6FD" stroke="${L}"/>
    <rect x="-22" y="180" width="44" height="${FLOOR - 180}" rx="3" fill="#92400E" stroke="${L}"/></g>
  <rect x="2470" y="248" width="180" height="67" fill="#38BDF8" stroke="${L}"/>
  <path d="M2462 ${FLOOR} Q2468 250 2482 248 M2650 248 V315" stroke="${L}" fill="none"/>
  <g class="ek-wave">${[0, 1, 2, 3].map((i) => `<path d="M${2490 + i * 40} ${262 + (i % 2) * 18} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  ${[2520, 2600].map((x) => `<ellipse cx="${x}" cy="252" rx="14" ry="4" fill="#22C55E" stroke="${L}" stroke-width="0.8"/>`).join('')}<g transform="translate(2600 248)">${flowerAt(0, 0, '#F9A8D4')}</g>
  <g class="e015-jump">${[2540, 2610].map((x, i) => `<g class="e015-fj e015-fj${i}" transform="translate(${x} 262)">${FISH}</g>`).join('')}</g>
  <g transform="translate(2350 ${FLOOR})"><path d="M-12 0 L-14 -20 H14 L12 0Z" fill="#94A3B8" stroke="${L}"/><path d="M-14 -20 Q0 -34 14 -20" stroke="${L}" fill="none"/>
    <g class="e015-bucket" transform="translate(0 -24)">${FISH}</g></g>
  ${week(2400, 46, { 5: 'sat' })}
  <!-- Chủ nhật: nhà Minh (phòng ngủ + bếp) -->
  ${room(2650, 390, FLOOR, '#FFEDD5')}
  <rect x="2770" y="66" width="70" height="70" rx="3" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="2775" y="71" width="60" height="60" fill="#BAE6FD"/>
  <g class="e015-wsun"><circle cx="2805" cy="128" r="12" fill="#FDE047" stroke="#F59E0B" stroke-width="1.6"/></g>
  <path d="M2775 120 Q2800 112 2835 120 V131 H2775Z" fill="#86EFAC"/><path d="M2805 71 V131 M2775 101 H2835" stroke="#fff" stroke-width="2"/>
  <g transform="translate(2678 98)"><circle r="20" fill="#fff" stroke="#EF4444" stroke-width="3"/>
    <g class="e015-hr"><path d="M0 0 V-10" stroke="${L}" stroke-width="3" stroke-linecap="round"/></g><g class="e015-mn"><path d="M0 0 V-15" stroke="${L}" stroke-width="2" stroke-linecap="round"/></g><circle r="2" fill="${L}"/></g>
  <rect x="2666" y="216" width="14" height="66" rx="3" fill="#A16207" stroke="${L}"/>
  <rect x="2666" y="236" width="140" height="26" rx="4" fill="#fff" stroke="${L}"/><rect x="2666" y="258" width="140" height="10" fill="#C2410C" stroke="${L}"/>
  <rect x="2796" y="226" width="12" height="56" rx="3" fill="#A16207" stroke="${L}"/>
  <g class="e015-sleeper">${lying(2742, 250, 'en_minh_pj', { s: 1, len: 100, blanket: '#93C5FD' })}</g>
  <g class="e015-made"><rect x="2682" y="222" width="40" height="16" rx="7" fill="#fff" stroke="${L}"/><path d="M2740 238 Q2770 228 2800 236 V244 H2740Z" fill="#93C5FD" stroke="${L}"/></g>
  <rect x="2890" y="70" width="120" height="34" rx="5" fill="#E5E7EB" stroke="${L}"/><path d="M2920 104 V136 M2980 104 V130" stroke="#94A3B8" stroke-width="2"/>
  ${[2903, 2987].map((x) => `<path d="M${x - 14} 236 V198 Q${x - 14} 190 ${x - 6} 190 H${x + 6} Q${x + 14} 190 ${x + 14} 198 V236" fill="#FBBF24" stroke="${L}" stroke-width="1.2"/>`).join('')}
  ${week(2845, 46, { 6: 'sun', 0: 'a0', 1: 'a1', 2: 'a2', 3: 'a3', 4: 'a4', 5: 'a5' })}
  ${pillar(2650)}
  <!-- nhãn chữ -->
  ${tag('mf', 150, 100, 'Monday to Friday', '#1D4ED8', 16)}
  ${tag('eng', 515, 206, 'English', '#2563EB', 18)}
  ${tag('foot', 935, 120, 'football', '#16A34A', 18)}
  ${tag('lib', 1292, 150, 'library', '#B45309', 18)}
  ${tag('music', 1625, 100, 'music', '#7C3AED', 18)}
  ${tag('sing', 1650, 210, 'sing songs', '#DB2777', 16)}
  ${tag('games', 1970, 132, 'games', '#EA580C', 18)}
  ${tag('visit', 2300, 104, 'visit', '#B91C1C', 18)}
  ${tag('pond', 2560, 210, 'a big pond', '#0369A1', 18)}
  ${tag('fish', 2500, 120, 'catch fish', '#EA580C', 18)}
  <g class="e015-tag e015-t-noschool"><g transform="translate(2735 160) scale(0.42)">${schoolFront(0, 160).replace('translate(0 0)', 'translate(0 -100)')}</g><path d="M2700 120 L2770 186 M2770 120 L2700 186" stroke="#EF4444" stroke-width="7" stroke-linecap="round"/>${label(2735, 206, 'no school', '#DC2626', 14)}</g>
  ${tag("late", 2690, 150, '10:00', '#DC2626', 16)}
  ${tag('pho', 2945, 150, 'pho', '#EA580C', 20)}
  ${tag('love', 2845, 100, 'I love my week!', '#DB2777', 18)}`;
}

function fg() {
  return `
  <!-- bàn học thứ Hai -->
  <g transform="translate(693 0)"><rect x="-38" y="242" width="76" height="26" rx="2" fill="#FDE68A" stroke="${L}"/><rect x="-42" y="236" width="84" height="8" rx="2" fill="#F59E0B" stroke="${L}"/>
    <rect x="-34" y="268" width="6" height="14" fill="#78716C"/><rect x="28" y="268" width="6" height="14" fill="#78716C"/></g>
  <!-- bàn thư viện -->
  <g transform="translate(1290 0)"><rect x="-70" y="240" width="140" height="8" rx="3" fill="#D97706" stroke="${L}"/><rect x="-62" y="248" width="8" height="34" fill="#92400E"/><rect x="54" y="248" width="8" height="34" fill="#92400E"/>
    <rect x="-56" y="248" width="112" height="22" fill="#B45309" stroke="${L}" stroke-width="0.8"/></g>
  <!-- đàn piano -->
  <g transform="translate(1530 0)"><rect x="-56" y="196" width="112" height="86" rx="4" fill="#1F2937" stroke="${L}"/><rect x="-50" y="204" width="100" height="14" fill="#fff" stroke="${L}" stroke-width="0.7"/>
    ${Array.from({ length: 9 }, (_, i) => `<rect x="${-44 + i * 11}" y="204" width="5" height="8" fill="#1F2937"/>`).join('')}<rect x="-48" y="276" width="8" height="6" fill="#111827"/><rect x="40" y="276" width="8" height="6" fill="#111827"/></g>
  <!-- bàn ăn Chủ nhật -->
  <g transform="translate(2945 0)"><rect x="-70" y="232" width="140" height="8" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="-62" y="240" width="10" height="42" fill="#92400E" stroke="${L}"/><rect x="52" y="240" width="10" height="42" fill="#92400E" stroke="${L}"/>
    <g class="e015-bowls">${[-42, 42].map((x) => `<g transform="translate(${x} 226)">${BOWL}</g>`).join('')}</g></g>
  ${bush(2160, FLOOR + 30, 1, '#22C55E')}${fence(1800, 120, FLOOR + 20)}`;
}

const CSS = `
.e015-on { opacity: 0; transition: opacity .3s; transform-box: fill-box; transform-origin: center; }
${LITKEYS().map((k) => `.st-${k} .e015-on-${k}`).join(', ')} { opacity: 1; animation: e015Pop .4s ease-out; }
@keyframes e015Pop { from { transform: scale(1.5); } to { transform: none; } }
.e015-tag { opacity: 0; transform: scale(.6); transition: opacity .35s, transform .35s cubic-bezier(.3,1.6,.6,1); transform-box: fill-box; transform-origin: center; }
${TAGS.map((n) => `.st-t-${n} .e015-t-${n}`).join(', ')} { opacity: 1; transform: none; }
.e015-sdoor { transform-origin: 276px 240px; transition: transform .6s; } .st-sdoor .e015-sdoor { transform: scaleX(.12); }
.e015-goalball { opacity: 0; } .st-goal .e015-goalball { opacity: 1; }
.st-goal .e015-net { animation: e015Net .25s ease-in-out 3 alternate; }
@keyframes e015Net { to { transform: translateX(4px); } }
.e015-sing, .e015-play { opacity: 0; transition: opacity .3s; }
.st-sing .e015-sing, .st-play .e015-play { opacity: 1; }
.e015-note { animation: e015Note 1.8s ease-out infinite; }
@keyframes e015Note { from { transform: translateY(10px); opacity: 0; } 30% { opacity: 1; } to { transform: translate(8px, -40px); opacity: 0; } }
.e015-fj { opacity: 0; } .st-jump .e015-fj { animation: e015Jump 1.2s ease-in-out infinite; }
.st-jump .e015-fj1 { animation-delay: -.6s; }
@keyframes e015Jump { 0% { opacity: 0; transform: translateY(0) rotate(0); } 20% { opacity: 1; } 50% { transform: translateY(-34px) rotate(-30deg); opacity: 1; } 80% { opacity: 1; } 100% { opacity: 0; transform: translateY(0) rotate(30deg); } }
.e015-bucket { opacity: 0; } .st-caught .e015-bucket { opacity: 1; }
.e015-sleeper, .e015-made { transition: opacity .4s; } .e015-sleeper { opacity: 0; } .st-sleep .e015-sleeper { opacity: 1; } .st-sleep .e015-made { opacity: 0; }
.e015-hr, .e015-mn { transform: rotate(210deg); transition: transform 2s cubic-bezier(.4,0,.2,1); }
.e015-mn { transform: rotate(0); }
.st-late .e015-hr { transform: rotate(300deg); } .st-late .e015-mn { transform: rotate(1080deg); }
.e015-wsun { transition: transform 2s cubic-bezier(.4,0,.2,1); } .st-late .e015-wsun { transform: translateY(-44px); }
.e015-bowls { opacity: 0; transition: opacity .3s; } .st-pho .e015-bowls { opacity: 1; }
@media (prefers-reduced-motion: reduce) { .e015-note { animation-duration: 3s; } }
`;
function LITKEYS() { bg(); return [...LIT]; }

const dayOn = (st, k, t) => { st.set(`st-${k}`); st.sfx('sparkle', { vol: 0.6 }); if (t) st.set(`st-t-${t}`); };

const BEATS = [
  { key: ['from Monday to Friday'], icon: '📅', label: 'Monday to Friday', async play(st) {
    st.look(170);
    st.set('st-t-mf');
    const w = st.walk('minh', 300, { speed: 105, follow: false });
    for (let i = 0; i < 5; i++) { await st.wait(380); st.set(`st-g${i}`); }
    await w;
    st.set('st-sdoor'); st.sfx('door-open');
    await st.wait(500);
    st.set('st-t-mf', false);
  } },
  { key: ['On Monday', 'English'], icon: '🔤', label: 'English', async play(st) {
    await st.walk('minh', 693, { speed: 190, lead: -100 });
    dayOn(st, 'mon', 'eng');
    st.pose('minh', 'sit');
    st.pose('eng', 'point'); st.act('eng', 'point');
    await st.wait(500);
    st.pose('minh', 'sitWave'); st.mood('minh', 'joy');
    await st.say('minh', 'Hello!', 1000);
    st.act('eng', null); st.pose('eng', 'stand'); st.pose('minh', 'sit'); st.mood('minh', 'happy');
    st.set('st-t-eng', false);
  } },
  { key: ['On Tuesday', 'play football with Tom'], icon: '⚽', label: 'football', async play(st) {
    st.pose('minh', 'stand');
    await st.walk('minh', 900, { speed: 150, lead: 40 });
    dayOn(st, 'tue', 'foot');
    st.pose('tom', 'give');
    await st.fly(SOCCER, [985, 270], [915, 272], { size: 20, dur: 500 });
    st.pose('tom', 'stand'); st.pose('minh', 'e015_kick');
    await st.fly(SOCCER, [915, 272], [1086, 262], { size: 20, dur: 650 });
    st.set('st-goal'); st.sfx('bowl-down', { vol: 0.5 });
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    st.pose('tom', 'cheer'); st.act('tom', 'jump'); st.mood('tom', 'joy'); st.pose('lan', 'clap'); st.act('lan', 'clap'); st.mood('lan', 'joy');
    await st.wait(1200);
    st.act('minh', null); st.act('tom', null); st.act('lan', null); st.pose('minh', 'stand'); st.pose('tom', 'stand'); st.pose('lan', 'stand'); st.mood('lan', 'happy');
    st.mood('minh', 'happy'); st.mood('tom', 'happy');
    st.set('st-t-foot', false);
  } },
  { key: ['On Wednesday', 'go to the library'], icon: '📚', label: 'library', async play(st) {
    await Promise.all([
      st.walk('minh', 1250, { speed: 150, lead: 40 }),
      st.walk('lan', 1330, { speed: 220, follow: false }),
    ]);
    dayOn(st, 'wed', 'lib');
    st.chest('minh', 'book'); st.chest('lan', 'book');
    st.pose('minh', 'read'); st.pose('lan', 'read'); st.act('lan', 'read'); st.act('minh', 'read');
    st.sfx('page-turn');
    await st.wait(1500);
    st.act('lan', null); st.act('minh', null);
    st.set('st-t-lib', false);
  } },
  { key: ['On Thursday', 'music'], icon: '🎹', label: 'music', async play(st) {
    st.chest('minh', null); st.pose('minh', 'stand');
    await st.walk('minh', 1680, { speed: 200, lead: -60 });
    dayOn(st, 'thu', 'music');
    st.set('st-play');
    st.pose('mus', 'e015_piano'); st.act('mus', 'clap'); st.mood('mus', 'joy');
    await st.wait(1400);
    st.set('st-t-music', false);
  } },
  { key: ['I sing songs'], icon: '🎵', label: 'sing songs', async play(st) {
    st.set('st-sing'); st.set('st-t-sing');
    st.pose('minh', 'open'); st.mood('minh', 'joy'); st.talk('minh', true); st.act('minh', 'dance');
    await st.wait(1900);
    st.talk('minh', false); st.act('minh', null); st.pose('minh', 'stand');
    st.set('st-sing', false); st.set('st-play', false); st.set('st-t-sing', false);
    st.act('mus', null); st.pose('mus', 'stand'); st.mood('mus', 'happy'); st.mood('minh', 'happy');
  } },
  { key: ['On Friday', 'play games with Ms Hoa'], icon: '🎲', label: 'games', async play(st) {
    await st.walk('minh', 1990, { speed: 160 });
    dayOn(st, 'fri', 'games');
    st.pose('hoa', 'throw');
    await st.fly(SOCCER, [1880, 160], [1990, 180], { size: 20, dur: 600 });
    st.hold('minh', 'ball'); st.pose('minh', 'raise'); st.mood('minh', 'joy');
    st.pose('hoa', 'clap'); st.act('hoa', 'clap'); st.mood('hoa', 'joy');
    st.pose('k1', 'cheer'); st.act('k1', 'jump'); st.pose('k2', 'cheer'); st.act('k2', 'jump');
    await st.wait(1500);
    st.act('hoa', null); st.act('k1', null); st.act('k2', null);
    st.pose('hoa', 'stand'); st.pose('k1', 'stand'); st.pose('k2', 'stand'); st.hold('minh', null); st.pose('minh', 'stand');
    st.set('st-t-games', false);
  } },
  { key: ['On Saturday', 'visit Grandma and Grandpa'], icon: '👵', label: 'visit', async play(st) {
    st.bag('minh', false);
    await st.dress('minh', 'en_minh_home');
    await Promise.all([
      st.walk('minh', 2190, { speed: 150, lead: 70 }),
      (async () => { await st.wait(200); await st.walk('dad', 2130, { speed: 150, follow: false }); })(),
    ]);
    dayOn(st, 'sat', 'visit');
    st.pose('grandma', 'wave'); st.act('grandma', 'wave'); st.pose('grandpa', 'wave'); st.act('grandpa', 'wave');
    st.pose('minh', 'wave'); st.act('minh', 'wave');
    st.fx('hearts', 2250, 150);
    await st.wait(1600);
    for (const id of ['grandma', 'grandpa', 'minh']) { st.act(id, null); st.pose(id, 'stand'); }
    st.set('st-t-visit', false);
  } },
  { key: ['a big pond'], icon: '🐟', label: 'big pond', async play(st) {
    await st.look(2520, { dur: 1000 });
    st.set('st-jump'); st.set('st-t-pond');
    st.pose('grandpa', 'point'); st.mood('grandpa', 'joy');
    await st.wait(1600);
    st.set('st-t-pond', false); st.pose('grandpa', 'stand'); st.mood('grandpa', 'happy');
  } },
  { key: ['We catch fish with Grandpa'], icon: '🎣', label: 'catch fish', async play(st) {
    st.hold('grandpa', 'e015_rod'); st.hold('minh', 'e015_rod');
    await Promise.all([
      st.walk('grandpa', 2405, { speed: 120, follow: false }),
      st.walk('minh', 2458, { speed: 190, follow: false }),
      st.walk('dad', 2250, { speed: 150, follow: false }),
    ]);
    st.pose('grandpa', 'e015_fish'); st.pose('minh', 'e015_fish');
    await st.wait(600);
    st.set('st-jump', false);
    st.pose('minh', 'raise'); st.mood('minh', 'joy');
    await st.fly(FISH, [2520, 262], [2350, 256], { size: 32, dur: 700 });
    st.set('st-caught'); st.set('st-t-fish'); st.sfx('sparkle');
    st.pose('grandpa', 'cheer'); st.mood('grandpa', 'joy'); st.pose('dad', 'clap'); st.act('dad', 'clap');
    await st.wait(900);
    st.hold('grandpa', null); st.hold('minh', null);
    for (const id of ['grandpa', 'minh', 'dad']) { st.act(id, null); st.pose(id, 'stand'); st.mood(id, 'happy'); }
    st.set('st-t-fish', false);
  } },
  { key: ['On Sunday', "don't go to school"], icon: '🛏️', label: 'no school', async play(st) {
    const d = st.walk('dad', 2987, { speed: 270, follow: false });
    await st.walk('minh', 2742, { speed: 120 });
    st.show('minh', false); st.set('st-sleep');
    dayOn(st, 'sun', 'noschool');
    await d;
    st.pose('dad', 'sit');
    await st.wait(1200);
    st.set('st-t-noschool', false);
  } },
  { key: ['I sleep late'], icon: '😴', label: 'sleep late', async play(st) {
    st.look(2760);
    st.fx("zzz", 2700, 210);
    st.set('st-late');
    await st.wait(1300);
    st.set('st-t-late');
    st.fx("zzz", 2700, 210, { quiet: true });
    await st.wait(900);
    st.set('st-t-late', false);
  } },
  { key: ['eat pho for breakfast'], icon: '🍜', label: 'pho', async play(st) {
    st.set('st-sleep', false);
    await st.dress('minh', 'en_minh_pj');
    st.show('minh', true); st.pose('minh', 'stretch'); st.mood('minh', 'shut');
    await st.wait(700);
    st.mood('minh', 'happy');
    await st.walk('minh', 2903, { speed: 140, follow: false });
    st.look(2860, { dur: 600 });
    st.pose('minh', 'sit');
    st.set('st-pho'); st.set('st-t-pho'); st.sfx('bowl-down');
    st.pose('mum', 'give'); st.mood('mum', 'joy');
    await st.wait(400);
    st.hold('minh', 'chopsticks'); st.pose('minh', 'eat'); st.act('minh', 'eat');
    st.hold('dad', 'chopsticks'); st.pose('dad', 'eat'); st.act('dad', 'eat');
    st.sfx('slurp');
    await st.wait(1600);
    for (const id of ['minh', 'dad']) { st.act(id, null); st.hold(id, null); st.pose(id, 'sit'); }
    st.pose('mum', 'stand'); st.mood('mum', 'happy');
    st.set('st-t-pho', false);
  } },
  { key: ['I love my week'], icon: '❤️', label: 'love my week', async play(st) {
    st.pose('minh', 'stand');
    for (let i = 0; i < 6; i++) { st.set(`st-a${i}`); await st.wait(170); }
    st.set('st-t-love');
    st.pose('minh', 'cheer'); st.act('minh', 'cheer'); st.mood('minh', 'joy');
    st.pose('mum', 'clap'); st.act('mum', 'clap'); st.mood('mum', 'joy');
    st.pose('dad', 'sitClap'); st.act('dad', 'clap'); st.mood('dad', 'joy');
    st.fx('hearts', 2903, 150);
    await st.wait(1700);
    for (const id of ['minh', 'mum', 'dad']) st.act(id, null);
  } },
];

export default {
  id: 'en015', worldW: 3040, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: {
    e015_kick: { R: [40, 60], L: [60, 40], head: 6 },
    e015_piano: { R: [30, -20], L: [30, -20], head: 6 },
    e015_fish: { R: [70, 92], L: [40, 70], head: 4 },
  },
  props: {
    // cần câu: gốc ở bàn tay, theo cẳng tay hướng ra ngoài, dây câu buông xuống nước
    e015_rod: `<path d="M0 2 L22 64" stroke="${L}" stroke-width="3.6" stroke-linecap="round"/><path d="M0 2 L22 64" stroke="#A16207" stroke-width="2.2" stroke-linecap="round"/><path d="M22 64 L-26 66" stroke="#64748B" stroke-width="0.8"/><circle cx="-26" cy="66" r="2.4" fill="#EF4444"/>`,
  },
  cast: [
    { id: 'eng', kind: 'adult', who: 'e015_eng', x: 630, s: 0.92 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 800, s: 1.08 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 985 },
    { id: 'mus', kind: 'adult', who: 'e015_mus', x: 1530, s: 0.92 },
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 1870, s: 0.92 },
    { id: 'k1', kind: 'kid', who: 'e015_k1', x: 2060 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 2110, s: 0.95 },
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: 2310, s: 0.9 },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: 2360, s: 0.92 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 2842, s: 0.92 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 50 },
    { id: 'k2', kind: 'kid', who: 'e015_k2', x: 1940 },
  ],
  init(st) {
    st.bag('minh', true);
  },
};
