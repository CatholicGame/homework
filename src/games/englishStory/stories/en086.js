/**
 * Bài 86 "The Village Where Mum Grew Up" (mệnh đề quan hệ where / whose): về làng quê của mẹ ở Thái Bình, đi từ trái sang phải:
 * cổng làng (biển THAI BINH) → bờ sông (mẹ bơi lúc nhỏ, trong bong bóng nghĩ) → ruộng lúa của bà Thu (xanh nhất làng, ruộng bên
 * cạnh nhạt hơn) → trường làng cũ (mẹ học đọc, học viết) → nhà cũ của mẹ + nhà cô Hạnh ngay sát bên (vườn khoai lang)
 * → sân nhà cũ (chõng tre), buổi tối. Chuyện ngày xưa của mẹ hiện trong bong bóng nghĩ (mẹ lúc nhỏ).
 * Người kể là Minh ("us", "my hand"). Toạ độ cảnh: rộng 2400, cao 315, sàn y = 282.
 */
import { CAST, headOnly, person } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, cloud, tree, bush, label, thought, sun, schoolFront, steam } from '../kit.js';

const FLOOR = 282;
const W = 2400;
const X = { gate: 170, river0: 330, river1: 760, field0: 800, thuField: 1010, field1: 1180, thu: 1090, school: 1380, mumHouse: 1680, hanhHouse: 1930, garden: 2110, yard: 1760 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e086_thu: { adult: true, hair: 'bun', hat: 'conical', top: 'blouse', shirt: '#A16207', bottom: 'pants', bottomC: '#1C1917', shoe: '#78716C' },
  e086_hanh: { adult: true, hair: 'bob', top: 'blouse', shirt: '#FDBA74', bottom: 'pants', bottomC: '#334155', shoe: '#78716C' },
  e086_mumkid: { hair: 'pigtails', top: 'tee', shirt: '#FDE68A', bottom: 'skirt', bottomC: '#EF4444', shoe: '#F28AB2' },
  e086_hanhkid: { hair: 'bob', top: 'tee', shirt: '#93C5FD', bottom: 'skirt', bottomC: '#16A34A', shoe: '#F28AB2' },
});

// ── Đồ vật ────────────────────────────────────────────────────────────────
const POTATO = (r = 0) => `<g transform="rotate(${r})"><ellipse rx="9" ry="5.4" fill="#BE185D" stroke="${L}" stroke-width="0.9"/><path d="M-4 -1 l1 1 M3 1 l1 1" stroke="#831843" stroke-width="1"/></g>`;
const BASKET = (full = true) => `<g transform="translate(0 -6)">${full ? `<g transform="translate(-7 -9)">${POTATO(-10)}</g><g transform="translate(6 -10)">${POTATO(14)}</g><g transform="translate(0 -14)">${POTATO(0)}</g>` : ''}
  <path d="M-16 -10 H16 L12 8 H-12Z" fill="#D97706" stroke="${L}" stroke-width="1"/><path d="M-14 -4 H14 M-13 2 H13" stroke="#92400E" stroke-width="1"/></g>`;
const POSES = {
  e086_hug: { R: [70, 120], L: [70, 120], head: 6 },
  e086_sitA: { R: [22, -40], L: [22, -40], dy: 40, head: 4 },             // người lớn ngồi sau mâm thấp
  e086_thinkA: { R: [30, -150], L: [16, -60], dy: 40, head: 8 },
  e086_handR: { R: [54, 60], L: [22, -40], dy: 40, head: 6 },    // ngồi, tay phải đưa sang nắm tay người bên phải
  e086_handL: { R: [22, -40], L: [60, 68], dy: 20, head: -6 },   // ngồi, tay trái đưa sang nắm tay người bên trái
  e086_bend: { R: [40, 60], L: [40, 60], dy: 16, head: 14 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const GATE = (x) => `<g transform="translate(${x} 0)">
  <rect x="-70" y="${FLOOR - 150}" width="24" height="150" fill="#E7E5E4" stroke="${L}" stroke-width="1.2"/><rect x="46" y="${FLOOR - 150}" width="24" height="150" fill="#E7E5E4" stroke="${L}" stroke-width="1.2"/>
  <path d="M-92 ${FLOOR - 150} Q-60 ${FLOOR - 170} 0 ${FLOOR - 172} Q60 ${FLOOR - 170} 92 ${FLOOR - 150} L80 ${FLOOR - 140} H-80Z" fill="#9A3412" stroke="${L}" stroke-width="1.2"/>
  <rect x="-46" y="${FLOOR - 140}" width="92" height="26" rx="3" fill="#FDE68A" stroke="${L}"/><text x="0" y="${FLOOR - 122}" text-anchor="middle" ${NUN} font-size="13" fill="#9A3412">THAI BINH</text>
  <path d="M-70 ${FLOOR - 40} q6 -6 12 0 M50 ${FLOOR - 70} q6 -5 12 0" stroke="#4D7C0F" stroke-width="2" fill="none" opacity="0.6"/></g>`;
const RICE = (x, y, s = 1, c1 = '#65A30D', c2 = '#84CC16') => `<g transform="translate(${x} ${y}) scale(${s})">${[-8, -4, 0, 4, 8].map((dx, i) => `<path d="M${dx * 0.4} 0 Q${dx * 0.8} -14 ${dx * 1.5} -${26 - Math.abs(dx)}" stroke="${i % 2 ? c1 : c2}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
/** Nhà mái ngói đỏ (tâm x, cửa giữa); cls = cánh cửa mở được. */
const HOUSE = (x, wall, cls = '') => `<g transform="translate(${x} 0)">
  <rect x="-90" y="${FLOOR - 104}" width="180" height="104" fill="${wall}" stroke="${L}" stroke-width="1.2"/>
  <path d="M-106 ${FLOOR - 100} L-70 ${FLOOR - 156} H70 L106 ${FLOOR - 100}Z" fill="#B91C1C" stroke="${L}" stroke-width="1.2"/>
  ${[0, 1, 2].map((i) => `<path d="M${-96 + i * 6} ${FLOOR - 112 - i * 15} H${96 - i * 6}" stroke="#7F1D1D" stroke-width="1"/>`).join('')}
  ${[-56, 56].map((dx) => `<rect x="${dx - 18}" y="${FLOOR - 82}" width="36" height="32" fill="#BAE6FD" stroke="${L}"/><path d="M${dx} ${FLOOR - 82} V${FLOOR - 50}" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="-20" y="${FLOOR - 74}" width="40" height="74" fill="#78350F" stroke="${L}"/>
  <g class="${cls}"><rect x="-20" y="${FLOOR - 74}" width="40" height="74" fill="#B45309" stroke="${L}"/><circle cx="12" cy="${FLOOR - 36}" r="2.4" fill="#FDE68A"/></g></g>`;

function bg() {
  const riceBack = Array.from({ length: 15 }, (_, i) => RICE(X.field0 + 14 + i * 26, 250 + (i % 2) * 6, 0.9, '#A3A34A', '#BEF264')).join('');
  const riceThu = Array.from({ length: 6 }, (_, i) => RICE(X.thuField + 4 + i * 28, 250 + (i % 2) * 6, 1, '#15803D', '#22C55E')).join('');
  const vines = Array.from({ length: 6 }, (_, i) => `<g transform="translate(${X.garden - 40 + i * 20} ${FLOOR - 4})">${[-1, 1].map((s) => `<path d="M0 0 Q${s * 8} -10 ${s * 4} -16" stroke="#15803D" stroke-width="1.6" fill="none"/><ellipse cx="${s * 6}" cy="-16" rx="5" ry="4" fill="#4ADE80" stroke="${L}" stroke-width="0.6"/>`).join('')}</g>`).join('');
  return `
  <defs><linearGradient id="e086sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#60C5F5"/><stop offset="1" stop-color="#DFF3FD"/></linearGradient>
    <linearGradient id="e086dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6D28D9"/><stop offset="0.6" stop-color="#F97316"/><stop offset="1" stop-color="#FDBA74"/></linearGradient></defs>
  <rect x="0" y="0" width="${W}" height="315" fill="url(#e086sky)"/>
  <rect class="e086-duskSky" x="${X.mumHouse - 400}" y="0" width="${W - X.mumHouse + 400}" height="315" fill="url(#e086dusk)"/>
  <g class="e086-sun"><g transform="translate(560 66)">${sun(22)}</g></g>
  ${cloud(240, 60, 0.8, 0)}${cloud(880, 52, 0.9, 2)}${cloud(1500, 64, 0.8, 4)}${cloud(2100, 54, 0.7, 1)}
  <!-- đồi xa -->
  <path d="M0 236 Q300 196 640 228 T1300 222 T2000 226 T${W} 220 V270 H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(60, 238, 0.7)}${tree(1260, 232, 0.6, '')}${tree(2300, 236, 0.75)}
  ${GATE(X.gate)}
  <!-- sông -->
  <rect x="${X.river0}" y="226" width="${X.river1 - X.river0}" height="42" fill="#38BDF8" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: 10 }, (_, i) => `<path d="M${X.river0 + 14 + i * 40} ${236 + (i % 3) * 10} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <g class="e086-boat"><path d="M420 238 H470 L460 248 H430Z" fill="#B45309" stroke="${L}" stroke-width="0.8"/></g>
  <!-- ruộng lúa: ruộng nhạt bên trái, ruộng bà Thu xanh đậm -->
  <rect x="${X.field0}" y="226" width="${X.thuField - X.field0}" height="42" fill="#D9F99D" stroke="${L}" stroke-width="0.8"/>
  <rect x="${X.thuField}" y="226" width="${X.field1 - X.thuField}" height="42" fill="#4ADE80" stroke="${L}" stroke-width="0.8"/>
  ${riceBack.slice(0)}${riceThu}
  <g class="e086-shine">${riceThu}</g>
  <!-- trường làng cũ -->
  <g class="e086-oldschool">${schoolFront(X.school, FLOOR)}</g>
  <path d="M${X.school - 90} 150 l14 22 M${X.school + 60} 200 l-8 18" stroke="#A8A29E" stroke-width="1.2"/>
  <!-- nhà cũ của mẹ + nhà cô Hạnh sát bên, vườn khoai -->
  ${HOUSE(X.mumHouse, '#FEF3C7')}
  ${HOUSE(X.hanhHouse, '#FFE4E6', 'e086-hdoor')}
  <rect x="${X.garden - 56}" y="${FLOOR - 8}" width="${120}" height="12" rx="4" fill="#92400E" stroke="${L}" stroke-width="0.8"/>
  ${vines}
  <g class="e086-pot">${[-30, 0, 30].map((dx, i) => `<g transform="translate(${X.garden - 10 + dx} ${FLOOR - 4})">${POTATO(i * 20 - 20)}</g>`).join('')}</g>
  <!-- chõng tre ở sân -->
  <g transform="translate(${X.yard + 20} 0)"><rect x="-120" y="${FLOOR - 32}" width="240" height="9" rx="2" fill="#CA8A04" stroke="${L}"/>
    ${Array.from({ length: 12 }, (_, i) => `<path d="M${-116 + i * 20} ${FLOOR - 31} v7" stroke="#A16207" stroke-width="1"/>`).join('')}
    <path d="M-110 ${FLOOR - 23} V${FLOOR} M110 ${FLOOR - 23} V${FLOOR} M-60 ${FLOOR - 23} V${FLOOR} M60 ${FLOOR - 23} V${FLOOR}" stroke="#A16207" stroke-width="4"/></g>
  <!-- đường làng -->
  <rect x="0" y="268" width="${W}" height="47" fill="#86EFAC" stroke="${L}"/>
  <path d="M0 280 H${W}" stroke="#D6B98A" stroke-width="14"/>
  <rect x="${X.mumHouse - 100}" y="272" width="${X.hanhHouse - X.mumHouse + 60}" height="16" fill="#E7C9A0" opacity="0.9"/>
  ${bush(260, FLOOR + 30, 0.6)}${bush(1230, FLOOR + 30, 0.7, '#4ADE80')}${bush(2250, FLOOR + 30, 0.6)}`;
}

function fg() {
  const mumKid = (s = 0.5, mood = 'joy') => headOnly('e086_mumkid', { s, mood });
  const grow = `<g transform="translate(-44 4)">${person(0, 30, 'e086_mumkid', 'stand', { s: 0.48 })}</g>
    <path d="M-14 0 H12" stroke="#EA580C" stroke-width="3" stroke-linecap="round"/><path d="M6 -6 L13 0 L6 6" stroke="#EA580C" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g transform="translate(44 4)">${person(0, 38, 'en_mum_home', 'stand', { s: 0.44 })}</g>`;
  const swim = `<rect x="-70" y="-2" width="140" height="34" fill="#38BDF8"/><g class="e086-kidswim"><g transform="translate(0 -4)">${mumKid(0.55)}</g>
    <path d="M-16 4 Q-28 -10 -34 0 M16 4 Q28 -10 34 0" stroke="#FADCC4" stroke-width="4.4" fill="none" stroke-linecap="round"/></g>
    <path d="M-60 8 q6 -4 12 0 q6 4 12 0 M20 14 q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none"/>
    <g class="e086-splash"><circle cx="-38" cy="-6" r="2.4" fill="#BAE6FD"/><circle cx="38" cy="-8" r="2.4" fill="#BAE6FD"/><circle cx="-44" cy="-14" r="1.8" fill="#BAE6FD"/><circle cx="44" cy="-16" r="1.8" fill="#BAE6FD"/></g>`;
  const school = `<rect x="-54" y="-30" width="74" height="46" rx="2" fill="#166534" stroke="#A16207" stroke-width="3"/>
    <g class="e086-abc"><text x="-17" y="-8" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="14" fill="#F8FAFC">a b c</text>
    <text x="-17" y="10" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="14" fill="#F8FAFC">1 2 3</text></g>
    <g transform="translate(50 0)">${person(0, 36, 'e086_mumkid', 'point', { s: 0.5, flip: true })}</g>`;
  const play = `<rect x="-74" y="20" width="148" height="12" fill="#86EFAC"/>
    <g transform="translate(-40 0)">${person(0, 30, 'e086_mumkid', 'cheer', { s: 0.46 })}</g>
    <g transform="translate(40 0)">${person(0, 30, 'e086_hanhkid', 'cheer', { s: 0.46, flip: true })}</g>
    <g class="e086-rope"><path d="M-34 -26 Q0 40 34 -26" stroke="#DC2626" stroke-width="2" fill="none"/></g>`;
  const thuFront = Array.from({ length: 5 }, (_, i) => RICE(X.thu - 50 + i * 24, 274 + (i % 2) * 4, 1.1, '#15803D', '#22C55E')).join('');
  return `
  <!-- lúa phía trước, che chân bà Thu đứng trong ruộng -->
  ${thuFront}
  <rect class="e086-dusk" x="${X.mumHouse - 400}" y="0" width="${W - X.mumHouse + 400}" height="315" fill="#4C1D95"/>
  <g class="e086-lamp"><circle cx="${X.mumHouse - 76}" cy="${FLOOR - 118}" r="20" fill="#FDE68A" opacity="0.45"/><circle cx="${X.mumHouse - 76}" cy="${FLOOR - 118}" r="5" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/></g>
  <!-- mâm thấp ở sân (che chân người ngồi), khoai luộc bốc hơi -->
  <g class="e086-tray"><rect x="${X.yard - 112}" y="${FLOOR - 46}" width="${290}" height="8" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
    <rect x="${X.yard - 106}" y="${FLOOR - 38}" width="${278}" height="38" fill="#CA8A04" stroke="${L}"/>
    ${Array.from({ length: 14 }, (_, i) => `<path d="M${X.yard - 100 + i * 20} ${FLOOR - 36} V${FLOOR - 2}" stroke="#A16207" stroke-width="1.2"/>`).join('')}
    <g transform="translate(${X.yard - 35} ${FLOOR - 46})"><path d="M-22 0 Q0 10 22 0Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><g transform="translate(-8 -3)">${POTATO(-10)}</g><g transform="translate(8 -3)">${POTATO(12)}</g><g transform="translate(0 -8)">${POTATO(0)}</g></g>
    ${steam(X.yard - 35, FLOOR - 58)}</g>
  ${thought(420, 112, 170, 104, grow, [292, 136], 'e086-th e086-th-grow')}
  ${thought(670, 112, 170, 92, swim, [545, 136], 'e086-th e086-th-swim')}
  ${thought(X.school + 20, 92, 170, 96, school, [X.school - 40, 150], 'e086-th e086-th-school')}
  ${thought(X.yard - 10, 96, 190, 104, play, [X.yard - 70, 160], 'e086-th e086-th-play')}
  <!-- nhãn -->
  <g class="e086-lb e086-lb-grew">${label(170, 64, 'the village where she grew up', '#EA580C', 14)}</g>
  <g class="e086-lb e086-lb-river">${label(470, 66, 'the river where she used to swim', '#0369A1', 13)}</g>
  <g class="e086-lb e086-lb-thu">${label(X.thu - 92, 70, 'whose rice fields are the greenest', '#15803D', 13)}</g>
  <g class="e086-lb e086-lb-school">${label(X.school - 190, 110, 'the old school', '#9A3412', 14)}</g>
  <g class="e086-lb e086-lb-hanh">${label(X.hanhHouse - 40, 94, 'Hanh', '#DB2777', 15)}${label((X.mumHouse + X.hanhHouse) / 2 - 50, 92, 'next door', '#7C3AED', 13)}
    <path d="M${X.mumHouse + 10} 112 H${X.hanhHouse - 10}" stroke="#7C3AED" stroke-width="3" stroke-linecap="round"/><path d="M${X.hanhHouse - 20} 106 L${X.hanhHouse - 10} 112 L${X.hanhHouse - 20} 118" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  <g class="e086-lb e086-lb-pot">${label(X.garden - 20, 106, 'sweet potatoes', '#BE185D', 14)}</g>
  <g class="e086-lb e086-lb-eve">${label(X.yard + 140, 70, 'in the evening', '#7C2D12', 14)}</g>
  <g class="e086-lb e086-lb-happy">${label(X.yard + 30, 70, 'the place where I was happiest', '#DB2777', 13)}</g>`;
}

const CSS = `
.e086-lb { opacity: 0; transition: opacity .35s; }
${['grew', 'river', 'thu', 'school', 'hanh', 'pot', 'eve', 'happy'].map((k) => `.st-lb-${k} .e086-lb-${k}`).join(', ')} { opacity: 1; }
.e086-th { opacity: 0; transition: opacity .35s; }
${['grow', 'swim', 'school', 'play'].map((k) => `.st-th-${k} .e086-th-${k}`).join(', ')} { opacity: 1; }
.st-th-swim .e086-kidswim { animation: e086Bob .6s ease-in-out infinite alternate; }
@keyframes e086Bob { from { transform: translateY(-2px); } to { transform: translateY(3px); } }
.st-th-swim .e086-splash { animation: e086Spl .6s ease-out infinite; }
@keyframes e086Spl { from { transform: translateY(4px); opacity: 1; } to { transform: translateY(-8px); opacity: 0; } }
.e086-abc { clip-path: inset(0 100% 0 0); } .st-th-school .e086-abc { clip-path: inset(0 0 0 0); transition: clip-path 1.8s steps(6) .3s; }
.e086-rope { transform-origin: 0 -26px; } .st-th-play .e086-rope { animation: e086Rope .6s linear infinite; }
@keyframes e086Rope { 0% { transform: scaleY(1); } 50% { transform: scaleY(-1); } 100% { transform: scaleY(1); } }
.e086-shine { opacity: 0; } .st-shine .e086-shine { animation: e086Shine 1.2s ease-in-out 3 alternate; }
@keyframes e086Shine { from { opacity: 0; } to { opacity: .9; filter: brightness(1.25); } }
.e086-boat { animation: e086Boat 12s ease-in-out infinite alternate; } @keyframes e086Boat { to { transform: translateX(220px); } }
.e086-hdoor { transform-origin: -20px 0; transform-box: fill-box; transition: transform .5s; } .st-hdoor .e086-hdoor { transform: scaleX(.12); }
.e086-pot { opacity: 0; transition: opacity .3s; } .st-pot .e086-pot { opacity: 1; } .st-potgone .e086-pot { opacity: 0; }
.e086-dusk, .e086-duskSky, .e086-lamp, .e086-tray { opacity: 0; transition: opacity 1.2s; } .st-dusk .e086-tray { opacity: 1; }
.st-dusk .e086-dusk { opacity: .28; } .st-dusk .e086-duskSky { opacity: 1; } .st-dusk .e086-lamp { opacity: 1; }
.e086-sun { transition: opacity .8s; }
@media (prefers-reduced-motion: reduce) {
  .st-th-swim .e086-kidswim, .st-th-swim .e086-splash { animation-duration: 1.4s; } .st-th-play .e086-rope { animation-duration: 1.4s; }
  .e086-boat { animation-duration: 30s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const FAM = ['mum', 'lan', 'minh'];
/** Cả nhà đi cùng nhau: mẹ dẫn đầu, Lan sau 46, Minh sau 92. */
const family = (st, x, { speed = 125, lead = 0 } = {}) => {
  st.look(x - 40 + lead, { dur: (Math.abs(x - st.a('mum').x) / speed) * 1000 * 1.1 });
  return Promise.all([
    st.walk('mum', x, { speed, follow: false }), st.walk('lan', x - 46, { speed, follow: false }), st.walk('minh', x - 92, { speed, follow: false }),
  ]);
};

const BEATS = [
  { key: ['Mum took us to the village', 'where she grew up'], icon: '🏡', label: 'Mum\'s village', async play(st) {
    st.look(200);
    st.sfx('birds', { vol: 0.5 });
    await family(st, 270);
    st.pose('mum', 'point'); st.mood('mum', 'joy'); st.face('lan', 1); st.face('minh', 1);
    st.set('st-lb-grew'); st.set('st-th-grow'); st.sfx('pop', { vol: 0.5 });
    await st.wait(1600);
    st.pose('mum', 'stand');
  } },
  { key: ['a small village in Thai Binh', 'the river where she used to swim'], icon: '🏊', label: 'the river', async play(st) {
    off(st, 'st-lb-grew', 'st-th-grow');
    await st.loop('river', () => family(st, 520), { vol: 0.5 });
    st.pose('mum', 'point'); st.face('mum', 1);
    st.set('st-lb-river'); st.set('st-th-swim'); st.sfx('splash', { vol: 0.6 });
    await st.wait(800); st.sfx('splash', { vol: 0.5, rate: 1.2 });
    await st.wait(900);
    st.mood('minh', 'wow'); st.mood('lan', 'joy');
    st.pose('mum', 'stand');
  } },
  { key: ['we visited Mrs Thu', 'whose rice fields are the greenest'], icon: '🌾', label: 'Mrs Thu', async play(st) {
    off(st, 'st-lb-river', 'st-th-swim');
    for (const id of FAM) st.mood(id, 'happy');
    await st.loop('wind', () => family(st, X.thu - 90), { vol: 0.4 });
    st.pose('thu', 'stand'); st.face('thu', -1); st.mood('thu', 'joy');
    await st.wait(300);
    st.pose('thu', 'wave'); st.act('thu', 'wave'); st.pose('mum', 'wave'); st.act('mum', 'wave');
    const hi = st.say('thu', 'Hello!', 1000);
    await st.wait(700);
    st.act('thu', null); st.act('mum', null); st.pose('mum', 'stand');
    st.pose('thu', 'open');
    st.set('st-shine'); st.set('st-lb-thu'); st.sfx('wind', { vol: 0.4 });
    st.mood('minh', 'wow'); st.mood('lan', 'wow');
    await hi;
    await st.wait(1300);
    st.pose('thu', 'stand');
  } },
  { key: ['the old school where Mum learned to read and write'], icon: '🏫', label: 'old school', async play(st) {
    off(st, 'st-lb-thu', 'st-shine');
    for (const id of FAM) st.mood(id, 'happy');
    await family(st, X.school - 70);
    st.pose('mum', 'pointUp'); st.mood('mum', 'joy');
    st.set('st-lb-school'); st.sfx('school-bell', { vol: 0.35 });
    await st.wait(500);
    st.set('st-th-school');
    await st.loop('pencil', () => st.wait(1800), { vol: 0.7 });
    st.pose('mum', 'stand');
  } },
  { key: ['Her best friend, whose name is Hanh', 'lives in the house next door'], icon: '👭', label: 'Hanh next door', async play(st) {
    off(st, 'st-lb-school', 'st-th-school');
    await family(st, X.hanhHouse - 90, { lead: -20 });
    st.set('st-hdoor'); st.sfx('door-open', { vol: 0.6 });
    st.show('hanh', true);
    await st.walk('hanh', X.hanhHouse - 40, { speed: 110, follow: false, y: FLOOR });
    st.set('st-lb-hanh');
    st.face('hanh', -1); st.mood('hanh', 'joy'); st.mood('mum', 'joy');
    st.pose('hanh', 'e086_hug'); st.pose('mum', 'e086_hug');
    st.fx('hearts', X.hanhHouse - 64, 150);
    st.sfx('giggle', { vol: 0.5 });
    await st.wait(1500);
    st.pose('hanh', 'stand'); st.pose('mum', 'stand');
    st.set('st-hdoor', false);
  } },
  { key: ['Hanh gave us sweet potatoes from her garden'], icon: '🍠', label: 'sweet potatoes', async play(st) {
    st.set('st-lb-hanh', false);
    st.look(X.garden - 90);
    st.walk('mum', X.hanhHouse - 120, { speed: 120, follow: false });
    st.walk('lan', X.hanhHouse - 70, { speed: 120, follow: false });
    await st.walk('hanh', X.garden + 40, { speed: 120, follow: false });
    st.face('hanh', -1); st.pose('hanh', 'dig'); st.act('hanh', 'dig');
    st.walk('minh', X.garden - 70, { speed: 120, follow: false });
    await st.loop('dig', () => st.wait(1200), { vol: 0.8 });
    st.act('hanh', null);
    st.set('st-pot'); st.set('st-lb-pot'); st.sfx('pop', { vol: 0.6 }); st.fx('poof', X.garden - 10, FLOOR - 6, { quiet: true });
    st.pose('hanh', 'e086_bend');
    await st.wait(500);
    st.set('st-potgone'); st.chest('hanh', BASKET()); st.pose('hanh', 'carry'); st.sfx('bag-on', { vol: 0.5 });
    await st.wait(400);
    st.face('minh', 1);
    st.pose('hanh', 'give'); st.chest('hanh', null); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(BASKET(), [X.garden + 10, 200], [X.garden - 70, 214], { size: 34, dur: 500 });
    st.chest('minh', BASKET()); st.pose('minh', 'carry'); st.mood('minh', 'joy'); st.pose('hanh', 'stand');
    await st.wait(800);
  } },
  { key: ['In the evening', 'sat in the yard where Mum and Hanh used to play'], icon: '🌆', label: 'in the yard', async play(st) {
    off(st, 'st-lb-pot');
    st.set('st-dusk'); st.set('st-lb-eve');
    st.chest('minh', null); st.pose('minh', 'stand');
    // cắt cảnh: cả nhà và cô Hạnh ngồi trên chõng tre ở sân
    const seat = { hanh: X.yard - 70, mum: X.yard, minh: X.yard + 80, lan: X.yard + 136 };
    st.place('hanh', seat.hanh, FLOOR, 1); st.place('mum', seat.mum, FLOOR, 1); st.place('minh', seat.minh, FLOOR, 1); st.place('lan', seat.lan, FLOOR, -1);
    for (const id of ['hanh', 'mum', 'minh', 'lan']) { st.pose(id, id === 'mum' || id === 'hanh' ? 'e086_sitA' : 'sitDesk'); st.mood(id, 'happy'); }
    st.look(X.yard + 20, { instant: true });
    await st.loop('crickets', async () => {
      await st.wait(700);
      st.set('st-th-play'); st.pose('mum', 'e086_thinkA'); st.pose('hanh', 'e086_thinkA'); st.mood('mum', 'joy'); st.mood('hanh', 'joy');
      st.sfx('giggle', { vol: 0.5 });
      await st.wait(1800);
    }, { vol: 0.5 });
    st.pose('mum', 'e086_sitA'); st.pose('hanh', 'e086_sitA');
  } },
  { key: ['This is the place where I was happiest', 'she held my hand'], icon: '🤝', label: 'held my hand', async play(st) {
    off(st, 'st-lb-eve', 'st-th-play');
    st.look(X.yard + 20);
    st.set('st-lb-happy');
    st.mood('mum', 'joy');
    await st.say('mum', 'I was happiest here.', 1900);
    st.pose('mum', 'e086_handR'); st.pose('minh', 'e086_handL'); st.mood('minh', 'joy');
    st.sfx('hearts', { vol: 0.5 });
    st.fx('hearts', X.yard + 40, 196, { quiet: true });
    st.sfx('crickets', { vol: 0.25 });
    await st.wait(1500);
  } },
];

export default {
  id: 'en086', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  order: [0, 1, 2, 3, 5, 7],
  cast: [
    { id: 'thu', kind: 'adult', who: 'e086_thu', x: X.thu, y: FLOOR - 4, s: 0.92, face: 1 },
    { id: 'hanh', kind: 'adult', who: 'e086_hanh', x: X.hanhHouse, s: 0.95 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: -40, s: 0.95 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: -86, s: 1.08 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: -132 },
  ],
  init(st) {
    st.show('hanh', false);
    st.pose('thu', 'plant');
  },
};
