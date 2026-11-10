/**
 * Bài 1 "Hello, I Am Minh": một con phố ở Hà Nội đi từ trái sang phải: hồ Gươm (Minh, Lan) · trường của mẹ ·
 * bệnh viện của bố · sân bóng (Tom) · nhà Minh (Lucky, Kitty, cả nhà). Minh và Lan đi dọc phố theo đúng thứ tự câu.
 * Câu tả (tuổi, cao, màu…) hiện thành thẻ / nhãn / số nổi lên (lớp trước, class st-t-*), câu sau thì thẻ cũ tắt.
 * Toạ độ cảnh: rộng 2240, cao 315, mặt đất y = 282.
 */
import { KIT_CSS, L, cloud, tree, bush, flowerAt, sun, label } from '../kit.js';
import { CAST, headOnly, person } from '../../tiengViet3/cast.js';

const FLOOR = 282;
const W = 2240;

Object.assign(CAST, {
  e001_pat1: { adult: true, old: true, hair: 'short', hairC: '#E7E5E4', top: 'shirt', shirt: '#FCA5A5', bottom: 'pants', bottomC: '#57534E', shoe: '#44403C' },
  e001_pat2: { hair: 'bob', top: 'tee', shirt: '#FDE68A', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F472B6' },
  e001_pat3: { adult: true, hair: 'bun', top: 'blouse', shirt: '#C4B5FD', bottom: 'pants', bottomC: '#334155', shoe: '#57534E' },
});

// ── Thẻ nổi (st-t-<tên>): nhóm vẽ quanh gốc (0,0), bật lên khi có class ──────────────────
const POPS = ['name', 'eight', 'boy', 'vn', 'hanoi', 'sister', 'eleven', 'tall', 'kind', 'teacher', 'school', 'doctor',
  'hospital', 'busy', 'friend', 'eight2', 'aus', 'class', 'dog', 'brown', 'small', 'cat', 'white', 'family'];
const pop = (name, x, y, inner) => `<g transform="translate(${x} ${y})"><g class="e001-pop e001-p-${name}">${inner}</g></g>`;
const card = (w, h, inner, fill = '#fff') => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${L}" stroke-width="1.6"/>${inner}`;
const txt = (x, y, t, size = 18, c = '#1D4ED8') => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="${size}" fill="${c}">${t}</text>`;
/** Bóng bay có số (tuổi). */
const balloon = (n, c = '#EF4444') => `<path d="M0 30 Q-6 46 2 60" stroke="${L}" stroke-width="1.2" fill="none"/>
  <ellipse rx="26" ry="30" fill="${c}" stroke="${L}" stroke-width="1.4"/><path d="M-4 29 h8 l-4 6Z" fill="${c}" stroke="${L}" stroke-width="0.8"/>
  <path d="M-14 -16 q6 -8 14 -8" stroke="#fff" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round"/>${txt(0, 12, n, 34, '#fff')}`;
/** Ô màu + tên màu. */
const swatch = (c, name, tc = '#1F2937') => `<rect x="-70" y="-24" width="140" height="48" rx="24" fill="#fff" stroke="${L}" stroke-width="1.6"/>
  <circle cx="-44" cy="0" r="15" fill="${c}" stroke="${L}" stroke-width="1.4"/>${txt(16, 8, name, 22, tc)}`;
const ring = (r) => `<circle class="e001-ring" r="${r}" fill="none" stroke="#F97316" stroke-width="3" stroke-dasharray="7 5"/>`;

const VN_FLAG = `<rect x="-30" y="-20" width="60" height="40" fill="#DA251D" stroke="${L}" stroke-width="1.2"/>
  <path d="M0 -12 l3.5 8.2 h8.8 l-7 5.2 l2.7 8.4 l-8 -5 l-8 5 l2.7 -8.4 l-7 -5.2 h8.8Z" fill="#FFFF00"/>`;
const VN_MAP = `<path d="M-6 -44 Q6 -48 14 -40 Q8 -32 2 -26 Q-2 -18 4 -10 Q14 -2 16 10 Q18 22 10 32 Q2 40 -8 44 Q-12 40 -6 34 Q2 24 2 14 Q0 4 -8 -4 Q-16 -14 -14 -26 Q-14 -38 -6 -44Z" fill="#4ADE80" stroke="${L}" stroke-width="1.2"/>`;
const AUS_MAP = `<path d="M-40 -2 L-34 -12 L-22 -16 L-16 -24 L-6 -26 L-2 -32 L8 -30 L10 -22 L16 -16 L20 -26 L22 -36 L28 -26 L32 -14 L40 -4 L42 8 L36 20 L26 28 L16 30 L10 24 L2 18 L-8 16 L-20 20 L-30 20 L-38 14 Z" fill="#FB923C" stroke="${L}" stroke-width="1.2" stroke-linejoin="round"/>
  <path d="M20 34 l7 1 l-2 6 l-5 -1Z" fill="#FB923C" stroke="${L}" stroke-width="1" stroke-linejoin="round"/>`;
const KANGAROO = `<g fill="#B45309" stroke="${L}" stroke-width="1"><path d="M-10 14 Q-14 -2 -4 -10 Q2 -14 4 -22 Q6 -30 12 -30 L16 -36 L16 -28 Q20 -26 18 -22 Q12 -20 10 -14 Q14 -4 10 8 L18 14 H-2 Q-16 22 -30 18 Q-18 16 -10 14Z"/></g>
  <circle cx="13" cy="-26" r="1.2" fill="#2B1D16"/>`;
const STETH = `<g transform="translate(0 -18)"><path d="M-8 -6 Q-10 18 0 20 Q10 18 8 -6" stroke="#334155" stroke-width="2.2" fill="none"/>
  <path d="M0 20 V26" stroke="#334155" stroke-width="2.2"/><circle cx="0" cy="30" r="4.4" fill="#CBD5E1" stroke="#334155" stroke-width="1.4"/></g>`;

const turtleTower = (x, y) => `<g transform="translate(${x} ${y})">
  <ellipse cx="0" cy="4" rx="56" ry="10" fill="#4ADE80" stroke="${L}"/>${tree(-38, 4, 0.42)}
  <rect x="-16" y="-34" width="32" height="34" fill="#FDE68A" stroke="${L}"/><path d="M-6 0 V-14 Q0 -22 6 -14 V0Z" fill="#92400E" stroke="${L}" stroke-width="0.8"/>
  <path d="M-24 -34 H24 L16 -42 H-16Z" fill="#B45309" stroke="${L}"/>
  <rect x="-11" y="-60" width="22" height="18" fill="#FDE68A" stroke="${L}"/><circle cx="0" cy="-51" r="4.4" fill="#92400E"/>
  <path d="M-18 -60 H18 L12 -67 H-12Z" fill="#B45309" stroke="${L}"/>
  <rect x="-7" y="-78" width="14" height="11" fill="#FDE68A" stroke="${L}"/><path d="M-12 -78 H12 L0 -90Z" fill="#B45309" stroke="${L}"/></g>`;

function school() {
  const heads = [['nam', -84], ['linh', -40], ['na', 40], ['bon', 84]];
  return `<g transform="translate(900 0)">
    <path d="M-130 112 L0 64 L130 112Z" fill="#EF4444" stroke="${L}" stroke-width="1.4"/>
    <rect x="-120" y="112" width="240" height="${FLOOR - 118}" fill="#FDE68A" stroke="${L}" stroke-width="1.4"/>
    ${heads.map(([who, dx]) => `<rect x="${dx - 18}" y="128" width="36" height="40" fill="#BAE6FD" stroke="${L}"/>
      <g transform="translate(${dx} 160)">${headOnly(who, { s: 0.62 })}</g>
      <rect x="${dx - 20}" y="166" width="40" height="6" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/>`).join('')}
    <rect x="-26" y="${FLOOR - 82}" width="52" height="76" rx="4" fill="#B45309" stroke="${L}"/><path d="M0 ${FLOOR - 82} V${FLOOR - 6}" stroke="${L}"/>
    <rect x="-56" y="86" width="112" height="24" rx="5" fill="#fff" stroke="${L}"/>${txt(0, 104, 'SCHOOL', 17)}
    <path d="M108 112 V36" stroke="#78716C" stroke-width="3"/><g class="ek-flag" style="transform-origin:108px 47px">${`<rect x="108" y="36" width="34" height="22" fill="#DA251D"/>`}<path d="M125 40 l2.4 6.6 h7 l-5.6 4.2 l2.2 6.8 l-6 -4.2 l-6 4.2 l2.2 -6.8 l-5.6 -4.2 h7Z" fill="#FFFF00" transform="translate(37.5 13.2) scale(0.7)"/></g>
  </g>
  <g transform="translate(745 0)"><path d="M-40 ${FLOOR - 4} L-30 150 M40 ${FLOOR - 4} L30 150" stroke="#92400E" stroke-width="5" stroke-linecap="round"/>
    <rect x="-52" y="140" width="104" height="72" rx="3" fill="#A16207" stroke="${L}"/><rect x="-46" y="146" width="92" height="60" fill="#166534"/>
    ${txt(0, 186, 'A B C', 24, '#F8FAFC')}</g>`;
}

function hospital() {
  return `<g transform="translate(1290 0)">
    <rect x="-120" y="96" width="240" height="${FLOOR - 102}" fill="#F8FAFC" stroke="${L}" stroke-width="1.4"/>
    <rect x="-128" y="88" width="256" height="12" rx="3" fill="#93C5FD" stroke="${L}"/>
    ${[-86, -46, 46, 86].map((dx) => `<rect x="${dx - 15}" y="152" width="30" height="30" fill="#BAE6FD" stroke="${L}"/><path d="M${dx} 152 V182" stroke="${L}" stroke-width="0.8"/>`).join('')}
    <g class="e001-cross"><rect x="-10" y="112" width="20" height="56" rx="3" fill="#EF4444" stroke="${L}"/><rect x="-28" y="130" width="56" height="20" rx="3" fill="#EF4444" stroke="${L}"/></g>
    <rect x="-30" y="${FLOOR - 82}" width="60" height="76" fill="#BAE6FD" stroke="${L}"/><path d="M0 ${FLOOR - 82} V${FLOOR - 6}" stroke="${L}"/>
    <rect x="-66" y="58" width="132" height="26" rx="5" fill="#fff" stroke="${L}"/>${txt(0, 77, 'HOSPITAL', 17, '#DC2626')}
  </g>
  <g transform="translate(1196 0)"><rect x="-44" y="244" width="88" height="8" rx="2" fill="#A16207" stroke="${L}"/>
    <path d="M-38 252 V${FLOOR - 4} M38 252 V${FLOOR - 4}" stroke="#78350F" stroke-width="4"/>
    ${person(-20, 246, 'e001_pat1', 'sit', { s: 0.8 })}${person(22, 246, 'e001_pat2', 'sit', { s: 0.9 })}</g>
  ${person(1372, FLOOR - 2, 'e001_pat3', 'stand', { s: 0.9 })}`;
}

function field() {
  return `<g transform="translate(1660 0)"><rect x="-70" y="196" width="140" height="80" fill="none" stroke="#fff" stroke-width="5"/>
    ${Array.from({ length: 7 }, (_, i) => `<path d="M${-70 + i * 23} 198 V274" stroke="#fff" stroke-width="1" opacity="0.6"/>`).join('')}
    ${Array.from({ length: 4 }, (_, i) => `<path d="M-70 ${214 + i * 18} H70" stroke="#fff" stroke-width="1" opacity="0.6"/>`).join('')}</g>`;
}

function house() {
  return `<g transform="translate(2070 0)">
    <path d="M-150 120 L0 52 L150 120Z" fill="#F97316" stroke="${L}" stroke-width="1.4"/>
    <rect x="-136" y="120" width="272" height="${FLOOR - 126}" fill="#FEF3C7" stroke="${L}" stroke-width="1.4"/>
    <rect x="-110" y="146" width="62" height="56" rx="3" fill="#BAE6FD" stroke="${L}"/><path d="M-79 146 V202 M-110 174 H-48" stroke="#fff" stroke-width="3"/>
    <path d="M-116 146 L-110 202 M-42 146 L-48 202" stroke="#F472B6" stroke-width="6" opacity="0.7"/>
    <rect x="50" y="146" width="62" height="56" rx="3" fill="#BAE6FD" stroke="${L}"/><path d="M81 146 V202 M50 174 H112" stroke="#fff" stroke-width="3"/>
    <rect x="-26" y="${FLOOR - 92}" width="52" height="86" rx="4" fill="#B45309" stroke="${L}"/><circle cx="16" cy="${FLOOR - 48}" r="3.4" fill="#FDE68A" stroke="${L}"/>
    <rect x="-34" y="${FLOOR - 8}" width="68" height="6" fill="#D6D3D1" stroke="${L}" stroke-width="0.8"/>
    <rect x="70" y="70" width="20" height="40" fill="#B91C1C" stroke="${L}"/>
  </g>`;
}

function bg() {
  return `
  <defs><linearGradient id="e001sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#60C5F5"/><stop offset="1" stop-color="#DFF3FD"/></linearGradient></defs>
  <rect x="0" y="0" width="${W}" height="315" fill="url(#e001sky)"/>
  <g transform="translate(560 70)">${sun(24)}</g>
  ${cloud(120, 60, 1, 0)}${cloud(1000, 46, 0.9, 3)}${cloud(1500, 70, 1.1, 5)}${cloud(1960, 40, 0.8, 2)}
  <path d="M0 236 Q160 196 340 230 T700 226 T1100 222 T1500 230 T1900 220 T${W} 228 V${FLOOR} H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <!-- Hồ Gươm -->
  <path d="M-10 212 Q150 196 330 212 Q352 230 320 250 Q160 262 -10 252Z" fill="#38BDF8" stroke="${L}"/>
  <g class="ek-wave">${[[30, 236], [96, 244], [230, 236], [280, 246]].map(([x, y]) => `<path d="M${x} ${y} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <g class="e001-tower">${turtleTower(180, 222)}</g>
  ${tree(30, 262, 0.9)}${tree(560, 262, 1.05, '#F472B6')}
  <!-- ghế đá -->
  <g transform="translate(492 0)"><rect x="-46" y="226" width="92" height="12" rx="4" fill="#A16207" stroke="${L}"/><rect x="-50" y="248" width="100" height="9" rx="3" fill="#B45309" stroke="${L}"/>
    <path d="M-40 257 V${FLOOR - 4} M40 257 V${FLOOR - 4}" stroke="#57534E" stroke-width="5"/></g>
  ${school()}
  ${hospital()}
  ${tree(1500, 262, 0.95)}
  ${field()}
  ${bush(1795, 274, 1)}${flowerAt(1810, 276)}${flowerAt(1830, 278, '#FDE047')}
  ${house()}
  ${bush(2220, 276, 0.9, '#16A34A')}
  <!-- mặt đất: cỏ + lối đi -->
  <rect x="0" y="${FLOOR - 26}" width="${W}" height="26" fill="#86EFAC"/>
  <rect x="0" y="${FLOOR - 6}" width="${W}" height="${321 - FLOOR}" fill="#EBD3A8" stroke="${L}"/>
  ${Array.from({ length: 40 }, (_, i) => `<ellipse cx="${30 + i * 57}" cy="${FLOOR + 8 + (i % 3) * 7}" rx="5" ry="2.2" fill="#D6B98A"/>`).join('')}`;
}

/** Lớp trước nhân vật: chỉ có thẻ / nhãn / vòng chỉ (không che đường đi). */
function fg() {
  const minhHead = headOnly('en_minh_home', { s: 1.25 });
  return `
  ${pop('name', 250, 128, label(0, 0, 'Minh', '#1D4ED8', 22))}
  ${pop('eight', 330, 92, balloon('8', '#3B82F6'))}
  ${pop('boy', 120, 104, card(110, 92, `<g transform="translate(-24 14)">${minhHead}</g>${txt(28, 8, 'boy', 26, '#2563EB')}`))}
  ${pop('vn', 250, 100, `<g transform="scale(0.86)">` + card(150, 108, `<g transform="translate(-34 -10) scale(0.9)">${VN_FLAG}</g><g transform="translate(40 -4) scale(0.9)">${VN_MAP}</g>${txt(-34, 38, 'Viet Nam', 16, '#DC2626')}`) + '</g>')}
  ${pop('hanoi', 250, 100, `<g transform="translate(31 -38)"><circle class="e001-ring" r="9" fill="none" stroke="#DC2626" stroke-width="3"/><circle r="4.4" fill="#DC2626" stroke="#fff" stroke-width="1.4"/></g>`)}
  ${pop('hanoi', 120, 122, label(0, 0, 'Ha Noi', '#DC2626', 20))}
  ${pop('sister', 455, 120, label(0, 0, 'sister', '#DB2777', 20))}
  ${pop('eleven', 460, 84, balloon('11', '#EC4899'))}
  ${pop('tall', 0, 0, `<path d="M346 154 H414 M416 140 H492" stroke="#F97316" stroke-width="2.6" stroke-dasharray="6 4"/>
    <path d="M502 154 V140" stroke="#F97316" stroke-width="3"/><path d="M496 146 l6 -8 l6 8" stroke="#F97316" stroke-width="3" fill="none"/><path d="M496 154 H508" stroke="#F97316" stroke-width="3"/>`)}
  ${pop('tall', 470, 104, label(0, 0, 'tall', '#EA580C', 22))}
  ${pop('kind', 420, 92, label(0, 0, 'kind', '#DB2777', 22))}
  ${pop('teacher', 660, 112, label(0, 0, 'teacher', '#1D4ED8', 20))}
  ${pop('school', 900, 98, `<rect x="-66" y="-20" width="132" height="40" rx="10" fill="none" stroke="#F97316" stroke-width="3.4" stroke-dasharray="8 5" class="e001-ring"/>`)}
  ${pop('doctor', 1120, 110, label(0, 0, 'doctor', '#0E7490', 20))}
  ${pop('hospital', 1290, 128, `<circle class="e001-ring" r="44" fill="none" stroke="#F97316" stroke-width="3.4" stroke-dasharray="8 5"/>`)}
  ${pop('busy', 1206, 112, label(0, 0, 'busy!', '#DC2626', 22))}
  ${pop('friend', 1566, 112, label(0, 0, 'friend', '#16A34A', 20))}
  ${pop('eight2', 1530, 112, balloon('8', '#3B82F6'))}
  ${pop('eight2', 1610, 104, balloon('8', '#22C55E'))}
  ${pop('aus', 1660, 100, `<g transform="scale(0.86)">` + card(158, 112, `<g transform="translate(-28 -10)">${AUS_MAP}</g><g transform="translate(48 2)">${KANGAROO}</g>${txt(0, 46, 'Australia', 16, '#EA580C')}`) + '</g>')}
  ${pop('class', 1660, 100, `<g transform="scale(0.86)">` + card(150, 112, `<rect x="-66" y="-46" width="132" height="22" rx="6" fill="#DBEAFE"/>${txt(0, -29, 'CLASS 3A', 15)}
    <rect x="-66" y="-20" width="132" height="58" rx="4" fill="#FEF3C7"/><g transform="translate(-30 22)">${headOnly('en_minh', { s: 1.1 })}</g><g transform="translate(30 22)">${headOnly('en_tom', { s: 1.1 })}</g>`) + '</g>')}
  ${pop('dog', 1972, 176, label(0, 0, 'dog', '#B45309', 22))}
  ${pop('brown', 1972, 168, swatch('#B7794A', 'brown', '#92400E'))}
  ${pop('small', 1972, 160, `${label(0, 0, 'small', '#2563EB', 20)}<path d="M0 10 V34 M-6 26 L0 34 L6 26" stroke="#2563EB" stroke-width="3" fill="none"/>`)}
  ${pop('small', 2076, 112, label(0, 0, 'happy', '#16A34A', 20))}
  ${pop('cat', 2044, 180, label(0, 0, 'cat', '#7C3AED', 22))}
  ${pop('white', 2050, 170, swatch('#FFFFFF', 'white', '#475569'))}
  ${pop('family', 1880, 92, label(0, 0, 'happy family', '#DB2777', 22))}`;
}

const CSS = `
.e001-pop { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .5s cubic-bezier(.3,1.6,.5,1); }
${POPS.map((n) => `.st-t-${n} .e001-p-${n}`).join(', ')} { opacity: 1; transform: none; }
.e001-ring { transform-box: fill-box; transform-origin: center; animation: e001Pulse .7s ease-in-out infinite alternate; }
@keyframes e001Pulse { from { transform: scale(.94); } to { transform: scale(1.08); } }
.e001-tower, .e001-cross { transform-box: fill-box; transform-origin: 50% 100%; transition: transform .5s cubic-bezier(.3,1.6,.5,1); }
.st-t-hanoi .e001-tower { transform: scale(1.12); }
.st-t-hospital .e001-cross, .st-t-doctor .e001-cross { transform: scale(1.12); }
@media (prefers-reduced-motion: reduce) { .e001-ring { animation-duration: 1.6s; } }
`;

/** Tắt thẻ của câu trước, bật thẻ của câu này. */
function tag(st, ...names) {
  for (const k of [...st.state]) if (k.startsWith('st-t-')) st.set(k, false);
  names.forEach((n) => st.set(`st-t-${n}`));
}
const rest = (st, ...ids) => ids.forEach((id) => { st.act(id, null); st.pose(id, 'stand'); });

const BEATS = [
  { key: ['Hello!'], icon: '👋', label: 'Hello', async play(st) {
    tag(st);
    st.pose('minh', 'wave'); st.act('minh', 'wave'); st.mood('minh', 'joy');
    await st.say('minh', 'Hello!', 1500);
    rest(st, 'minh'); st.mood('minh', 'happy');
  } },
  { key: ['I am Minh'], icon: '👦', label: 'Minh', async play(st) {
    tag(st, 'name');
    st.pose('minh', 'me'); st.act('minh', 'point');
    st.fx('sparkle', 250, 128);
    await st.wait(1600);
    rest(st, 'minh');
  } },
  { key: ['eight years old'], icon: '🎈', label: 'eight', async play(st) {
    tag(st, 'eight');
    st.pose('minh', 'pointUp'); st.mood('minh', 'joy');
    st.fx('sparkle', 330, 92);
    await st.wait(1900);
    rest(st, 'minh'); st.mood('minh', 'happy');
  } },
  { key: ['boy'], icon: '👦', label: 'boy', async play(st) {
    tag(st, 'boy');
    st.pose('minh', 'me'); st.act('minh', 'nod');
    await st.wait(1600);
    rest(st, 'minh');
  } },
  { key: ['from Viet Nam'], icon: '🇻🇳', label: 'Viet Nam', async play(st) {
    tag(st, 'vn');
    st.pose('minh', 'pointUp'); st.mood('minh', 'joy');
    st.fx('sparkle', 250, 100);
    await st.wait(2000);
    rest(st, 'minh'); st.mood('minh', 'happy');
  } },
  { key: ['in Ha Noi'], icon: '🏯', label: 'Ha Noi', async play(st) {
    tag(st, 'vn', 'hanoi');
    st.fx('sparkle', 180, 160);
    st.pose('minh', 'point');
    await st.wait(1900);
    rest(st, 'minh');
  } },
  { key: ['Lan is my sister'], icon: '👧', label: 'sister', async play(st) {
    tag(st);
    await st.walk('minh', 380, { speed: 130, lead: 20 });
    st.act('lan', null); st.chest('lan', null); st.pose('lan', 'wave'); st.act('lan', 'wave'); st.mood('lan', 'joy');
    tag(st, 'sister');
    st.fx('hearts', 450, 140);
    await st.wait(1200);
    rest(st, 'lan'); st.mood('lan', 'happy');
  } },
  { key: ['eleven years old'], icon: '🎈', label: 'eleven', async play(st) {
    tag(st, 'eleven');
    st.pose('lan', 'pointUp'); st.mood('lan', 'joy');
    st.fx('sparkle', 460, 84);
    await st.wait(2000);
    rest(st, 'lan'); st.mood('lan', 'happy');
  } },
  { key: ['tall and kind'], icon: '🍎', label: 'tall, kind', async play(st) {
    tag(st, 'tall');
    st.pose('minh', 'pointUp');
    await st.wait(1300);
    st.pose('minh', 'stand');
    tag(st, 'kind');
    st.hold('lan', 'apple'); st.pose('lan', 'give');
    await st.wait(350);
    await st.fly(`<g transform="scale(1.6)"><circle r="6" fill="#EF4444" stroke="${L}" stroke-width="0.8"/><ellipse cx="2.6" cy="-7" rx="2.4" ry="1.2" fill="#22C55E"/></g>`, [430, 196], [396, 200], { size: 26, dur: 450 });
    st.hold('lan', null); st.pose('lan', 'stand');
    st.hold('minh', 'apple'); st.pose('minh', 'give'); st.mood('minh', 'joy');
    st.fx('hearts', 415, 150);
    await st.wait(900);
    st.hold('minh', null); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['Mum is a teacher'], icon: '👩‍🏫', label: 'teacher', async play(st) {
    tag(st, 'teacher');
    await st.look(740, { dur: 800 });
    st.pose('mum', 'point'); st.act('mum', 'point');
    st.fx('sparkle', 745, 176);
    await st.wait(1500);
    rest(st, 'mum');
  } },
  { key: ['at school now'], icon: '🏫', label: 'school', async play(st) {
    tag(st);
    st.look(820, { dur: 400 });
    await Promise.all([
      st.walk('minh', 912, { speed: 215, follow: false }),
      st.walk('lan', 846, { speed: 215, follow: false }),
    ]);
    st.look(800);
    tag(st, 'school');
    st.pose('mum', 'wave'); st.act('mum', 'wave');
    st.fx('sparkle', 900, 98);
    await st.wait(800);
    rest(st, 'mum');
  } },
  { key: ['Dad is a doctor'], icon: '👨‍⚕️', label: 'doctor', async play(st) {
    tag(st, 'doctor');
    await st.look(1220, { dur: 800 });
    st.chest('dad', STETH); st.fx('sparkle', 1120, 180);
    st.pose('dad', 'reach'); st.mood('dad', 'joy');
    await st.wait(1300);
    rest(st, 'dad'); st.mood('dad', 'happy');
  } },
  { key: ['at the hospital'], icon: '🏥', label: 'hospital', async play(st) {
    tag(st);
    await Promise.all([
      st.walk('minh', 1060, { speed: 160, lead: 160 }),
      st.walk('lan', 1000, { speed: 160, follow: false }),
    ]);
    tag(st, 'hospital');
    st.pose('minh', 'pointUp');
    st.fx('sparkle', 1290, 128);
    await st.wait(1100);
    rest(st, 'minh');
  } },
  { key: ['very busy'], icon: '⏱️', label: 'busy', async play(st) {
    tag(st, 'busy');
    st.mood('minh', 'wow');
    await st.walk('dad', 1186, { speed: 240, follow: false });
    st.pose('dad', 'reach'); st.fx('drops', 1186, 140);
    await st.wait(450);
    await st.walk('dad', 1316, { speed: 240, follow: false });
    st.pose('dad', 'give');
    await st.wait(450);
    await st.walk('dad', 1120, { speed: 260, follow: false });
    st.fx('drops', 1120, 120);
    rest(st, 'dad'); st.mood('minh', 'happy');
  } },
  { key: ['Tom is my friend'], icon: '🤝', label: 'friend', async play(st) {
    tag(st);
    await Promise.all([
      st.walk('minh', 1530, { speed: 190, lead: 50 }),
      st.walk('lan', 1462, { speed: 190, follow: false }),
    ]);
    tag(st, 'friend');
    st.act('tom', null); st.pose('tom', 'wave'); st.act('tom', 'wave'); st.mood('tom', 'joy');
    st.pose('minh', 'wave'); st.act('minh', 'wave'); st.mood('minh', 'joy');
    st.fx('hearts', 1566, 150);
    await st.wait(1000);
    rest(st, 'minh', 'tom'); st.mood('minh', 'happy'); st.mood('tom', 'happy');
  } },
  { key: ['eight, too'], icon: '🎈', label: 'eight, too', async play(st) {
    tag(st, 'eight2');
    st.fx('sparkle', 1610, 104);
    st.pose('tom', 'pointUp'); st.pose('minh', 'pointUp');
    await st.wait(1800);
    rest(st, 'minh', 'tom');
  } },
  { key: ['from Australia'], icon: '🦘', label: 'Australia', async play(st) {
    tag(st, 'aus');
    st.pose('tom', 'pointUp'); st.mood('tom', 'joy');
    st.fx('sparkle', 1660, 100);
    await st.wait(1700);
    rest(st, 'tom'); st.mood('tom', 'happy');
  } },
  { key: ['in my class'], icon: '🏫', label: 'my class', async play(st) {
    tag(st, 'class');
    st.pose('minh', 'cheer'); st.act('minh', 'hop'); st.pose('tom', 'cheer'); st.act('tom', 'hop');
    st.fx('sparkle', 1660, 100);
    await st.wait(1900);
    rest(st, 'minh', 'tom');
  } },
  { key: ['Lucky is my dog'], icon: '🐶', label: 'dog', async play(st) {
    tag(st);
    st.pose('tom', 'wave'); st.act('tom', 'wave');
    await Promise.all([
      (async () => { await st.wait(700); await st.walk('tom', 1470, { speed: 150, follow: false }); })(),
      st.walk('minh', 1900, { speed: 190, lead: 40 }),
      st.walk('lan', 1830, { speed: 190, follow: false }),
    ]);
    st.dog('lucky', 'stand');
    st.sfx('dog-bark');
    await st.walk('lucky', 1964, { speed: 200, follow: false });
    tag(st, 'dog');
    st.act('lucky', 'jump'); st.mood('lucky', 'joy');
    await st.wait(900);
    st.act('lucky', null);
  } },
  { key: ['brown'], icon: '🟫', label: 'brown', async play(st) {
    tag(st, 'brown');
    st.act('lucky', 'wag');
    st.fx('sparkle', 1966, 230);
    await st.wait(1600);
    st.act('lucky', null);
  } },
  { key: ['small and happy'], icon: '🐕', label: 'small, happy', async play(st) {
    tag(st, 'small');
    st.act('lucky', 'jump'); st.mood('lucky', 'joy');
    st.sfx('dog-bark', { vol: 0.7, rate: 1.1 });
    st.fx('hearts', 1970, 200);
    await st.wait(2000);
    st.act('lucky', 'wag');
  } },
  { key: ['Kitty is my cat'], icon: '🐱', label: 'cat', async play(st) {
    tag(st);
    st.act('lucky', null);
    await st.look(2010, { dur: 500 });
    st.dog('kitty', 'stand');
    await st.walk('kitty', 2040, { speed: 110, follow: false });
    st.dog('kitty', 'sit');
    tag(st, 'cat');
    st.act('kitty', 'wag'); st.mood('kitty', 'joy');
    await st.wait(700);
    st.act('kitty', null); st.mood('kitty', 'happy');
  } },
  { key: ['She is white'], icon: '⬜', label: 'white', async play(st) {
    tag(st, 'white');
    st.fx('sparkle', 2044, 240);
    st.act('kitty', 'wag');
    await st.wait(1600);
    st.act('kitty', null);
  } },
  { key: ['a happy family'], icon: '❤️', label: 'family', async play(st) {
    tag(st);
    st.look(1886, { dur: 600 });
    st.show('mum2', true); st.show('dad2', true);
    await Promise.all([
      st.walk('dad2', 1738, { speed: 150, follow: false }),
      st.walk('mum2', 1792, { speed: 150, follow: false }),
      st.walk('lan', 1846, { speed: 100, follow: false }),
    ]);
    tag(st, 'family');
    ['minh', 'lan', 'mum2', 'dad2'].forEach((id) => { st.pose(id, 'cheer'); st.act(id, 'hop'); st.mood(id, 'joy'); });
    st.dog('lucky', 'stand'); st.act('lucky', 'jump'); st.act('kitty', 'wag');
    st.fx('hearts', 1860, 120);
    await st.wait(700);
    st.fx('hearts', 1940, 120);
    await st.wait(1300);
    ['minh', 'lan', 'mum2', 'dad2'].forEach((id) => rest(st, id));
    st.act('lucky', null); st.act('kitty', null);
  } },
];

export default {
  id: 'en001', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  cast: [
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 250 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 452, s: 1.08 },
    { id: 'mum', kind: 'adult', who: 'en_mum', x: 650, s: 0.95 },
    { id: 'dad', kind: 'adult', who: 'en_dad', x: 1120, s: 0.95 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: 1608 },
    { id: 'lucky', kind: 'dog', x: 2030, s: 0.95 },
    { id: 'kitty', kind: 'cat', x: 2160, s: 1 },
    { id: 'mum2', kind: 'adult', who: 'en_mum', x: 1640, s: 0.95 },
    { id: 'dad2', kind: 'adult', who: 'en_dad', x: 1590, s: 0.95 },
  ],
  poses: { e001_read: { R: [30, 196], L: [30, 196], head: 7 } },
  props: {
    e001_pointer: `<path d="M0 -2 V34" stroke="${L}" stroke-width="3.4" stroke-linecap="round"/><path d="M0 -2 V34" stroke="#D97706" stroke-width="2" stroke-linecap="round"/>`,
  },
  init(st) {
    st.pose('lan', 'e001_read'); st.chest('lan', 'book'); st.act('lan', 'read');
    st.hold('mum', 'e001_pointer');
    st.dog('lucky', 'sit'); st.dog('kitty', 'sit');
    st.show('mum2', false); st.show('dad2', false);
  },
};
