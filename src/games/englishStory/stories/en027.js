/**
 * Bài 27 "A Rainy Day Inside": phòng khách (cửa sổ mưa) → bếp (tủ bếp, tủ lạnh, bàn, lò nướng) → cửa ra vào → phố mưa → cửa hàng.
 * some = có món đó (món sáng lên, nhãn xanh); any trong câu phủ định = chỗ trống nét đứt + dấu ✗ đỏ.
 * Bố mua bánh mì ở cửa hàng rồi che ô đi bộ về, mang sữa và đường đặt lên bàn.
 * Toạ độ cảnh: rộng 2100, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, room, doorway, rug, label, road, BANANA, STAR } from '../kit.js';

const FLOOR = 282;
const TOP = 236; // mặt bàn bếp

Object.assign(CAST, {
  e027_shop: { adult: true, hair: 'bob', top: 'blouse', shirt: '#FDE68A', bottom: 'pants', bottomC: '#7C2D12', shoe: '#44403C' },
});

// ── Đồ vật (gốc = giữa đáy, đặt lên mặt bàn) ────────────────────────────────
const FLOUR = `<path d="M-9 0 V-20 Q-9 -24 -6 -26 H6 Q9 -24 9 -20 V0Z" fill="#F8FAFC" stroke="${L}" stroke-width="0.9"/><path d="M-6 -26 L-3 -30 H3 L6 -26" fill="#F8FAFC" stroke="${L}" stroke-width="0.8"/>
  <rect x="-7" y="-17" width="14" height="8" rx="1.5" fill="#FDE68A"/><text x="0" y="-11" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="4.6" fill="#92400E">FLOUR</text>`;
const EGGS = `<path d="M-13 0 H13 L11 -6 H-11Z" fill="#D6D3D1" stroke="${L}" stroke-width="0.8"/>${[-8, 0, 8].map((x) => `<ellipse cx="${x}" cy="-9" rx="3.6" ry="4.6" fill="#FFF7ED" stroke="${L}" stroke-width="0.7"/>`).join('')}`;
const MILK = `<path d="M-6 0 V-18 L-3 -24 H3 L6 -18 V0Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M-6 -18 H6" stroke="${L}" stroke-width="0.6"/><rect x="-6" y="-14" width="12" height="7" fill="#60A5FA"/>
  <text x="0" y="-9" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="4.2" fill="#fff">MILK</text>`;
const SUGAR_BAG = `<path d="M-8 0 V-16 Q-8 -20 -5 -20 H5 Q8 -20 8 -16 V0Z" fill="#F9A8D4" stroke="${L}" stroke-width="0.9"/><rect x="-6" y="-14" width="12" height="7" rx="1" fill="#fff"/>
  <text x="0" y="-9" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="3.8" fill="#BE185D">SUGAR</text>`;
const BANANAS = `<g transform="translate(0 -5)">${BANANA}</g><g transform="translate(3 -9) rotate(-14)">${BANANA}</g>`;
const BREAD = `<path d="M-14 0 Q-16 -12 -4 -13 H4 Q16 -12 14 0Z" fill="#F59E0B" stroke="${L}" stroke-width="0.9"/><path d="M-6 -11 l3 4 M0 -12 l3 4 M6 -11 l3 4" stroke="#B45309" stroke-width="1.2"/>`;
const CAKE = `<rect x="-14" y="-14" width="28" height="14" rx="3" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/><path d="M-14 -10 Q-7 -6 0 -10 Q7 -6 14 -10 V-14 H-14Z" fill="#F9A8D4" stroke="${L}" stroke-width="0.7"/><circle cx="0" cy="-16" r="2.6" fill="#EF4444" stroke="${L}" stroke-width="0.6"/>`;
const SLICE = `<path d="M-9 4 L9 4 L9 -6 L-9 -2Z" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/><path d="M-9 -2 L9 -6 L9 -9 L-9 -4Z" fill="#F9A8D4" stroke="${L}" stroke-width="0.7"/>`;
const FISH = `<path d="M-12 0 Q-2 -9 8 0 Q-2 9 -12 0Z" fill="#60A5FA" stroke="${L}" stroke-width="0.9"/><path d="M8 0 L15 -6 V6Z" fill="#3B82F6" stroke="${L}" stroke-width="0.8"/><circle cx="-6" cy="-1.4" r="1.3" fill="#1F2937"/>`;
const MIXBOWL = `<path d="M-20 -14 H20 Q19 2 0 3 Q-19 2 -20 -14Z" fill="#E0F2FE" stroke="#3B82F6" stroke-width="1.4"/><path d="M-18 -14 Q0 -20 18 -14Z" fill="#FEF3C7" stroke="${L}" stroke-width="0.7"/><path d="M6 -16 L16 -34" stroke="#A16207" stroke-width="2.4" stroke-linecap="round"/>`;
/** Ô + túi đồ bố mang về (đi cùng bố, gốc = chân bố). */
const CARRY = `<path d="M-2 -82 V-196" stroke="${L}" stroke-width="1.6"/><path d="M-46 -184 Q-2 -228 42 -184 Q31 -190 20 -184 Q9 -190 -2 -184 Q-13 -190 -24 -184 Q-35 -190 -46 -184Z" fill="#3B82F6" stroke="${L}" stroke-width="1"/>
  <path d="M-24 -184 Q-14 -214 -2 -208 Q10 -214 20 -184" fill="none" stroke="#1D4ED8" stroke-width="0.8"/>
  <g transform="translate(4 -46)"><path d="M-12 0 V-26 H12 V0Z" fill="#D6A770" stroke="${L}" stroke-width="0.9"/><path d="M-6 -26 Q0 -36 6 -26" stroke="${L}" stroke-width="1.2" fill="none"/>
  <g transform="translate(-5 -24) scale(0.7)">${MILK}</g><g transform="translate(5 -22) scale(0.6)">${SUGAR_BAG}</g></g>`;


function bg() {
  return `
  <defs><linearGradient id="e027grey" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#64748B"/><stop offset="1" stop-color="#CBD5E1"/></linearGradient></defs>
  <!-- Ngoài trời mưa -->
  <rect x="1240" y="0" width="860" height="315" fill="url(#e027grey)"/>
  ${[[1360, 50], [1600, 40], [1860, 56], [2040, 44]].map(([x, y]) => `<g transform="translate(${x} ${y})"><ellipse rx="56" ry="20" fill="#475569"/><ellipse cx="-26" cy="-12" rx="24" ry="16" fill="#475569"/><ellipse cx="22" cy="-14" rx="28" ry="18" fill="#475569"/></g>`).join('')}
  <path d="M1240 236 Q1400 206 1560 232 T1900 226 T2100 232 V282 H1240Z" fill="#4ADE80" stroke="${L}"/>
  ${road(1240, 860, FLOOR)}
  ${[1420, 1640].map((x) => `<ellipse cx="${x}" cy="${FLOOR + 1}" rx="26" ry="3" fill="#93C5FD" opacity="0.8"/>`).join('')}
  <!-- Cửa hàng -->
  <g transform="translate(1900 0)">
    <rect x="-150" y="110" width="300" height="${FLOOR - 110}" fill="#FFEDD5" stroke="${L}" stroke-width="1.4"/>
    <path d="M-160 110 H160 L150 136 H-150Z" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>${[-130, -90, -50, -10, 30, 70, 110].map((x) => `<path d="M${x} 110 L${x + 6} 136 H${x + 26} L${x + 20} 110Z" fill="#fff"/>`).join('')}
    <rect x="-46" y="76" width="92" height="28" rx="5" fill="#fff" stroke="${L}" stroke-width="1.2"/><text x="0" y="97" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="18" fill="#DC2626">SHOP</text>
    ${[160, 196].map((y) => `<rect x="-130" y="${y}" width="260" height="6" rx="2" fill="#A16207" stroke="${L}"/>`).join('')}
    ${[-110, -80, -50, -20, 10, 40, 70, 100].map((x, i) => `<g transform="translate(${x + 8} 160)">${i % 2 ? BREAD : `<g transform="scale(0.9)">${MILK}</g>`}</g>`).join('')}
    ${[-110, -78, -46, -14, 18, 50, 82, 112].map((x, i) => `<circle cx="${x + 6}" cy="189" r="6" fill="${['#EF4444', '#FDE047', '#F97316', '#22C55E'][i % 4]}" stroke="${L}" stroke-width="0.7"/>`).join('')}
  </g>
  <!-- Phòng khách -->
  ${room(0, 440, FLOOR, '#FEF3C7')}
  ${room(440, 820, FLOOR, '#E0F2FE')}
  <rect x="0" y="0" width="1240" height="12" fill="#E9D5B5" stroke="${L}"/>
  <defs><clipPath id="e027w"><rect x="70" y="60" width="140" height="120"/></clipPath></defs>
  <rect x="64" y="54" width="152" height="132" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <g clip-path="url(#e027w)"><rect x="70" y="60" width="140" height="120" fill="#94A3B8"/><ellipse cx="110" cy="66" rx="50" ry="16" fill="#64748B"/><ellipse cx="180" cy="62" rx="44" ry="15" fill="#64748B"/>
    <path d="M70 160 Q120 146 210 156 V180 H70Z" fill="#4ADE80" opacity="0.7"/>
    <g class="e027-drops">${Array.from({ length: 16 }, (_, i) => `<path d="M${74 + i * 9} ${80 + (i % 4) * 22} l-3 9 M${78 + i * 9} ${130 + (i % 3) * 16} l-3 9" stroke="#E0F2FE" stroke-width="2" stroke-linecap="round"/>`).join('')}</g></g>
  <path d="M140 60 V180 M70 120 H210" stroke="#fff" stroke-width="3" opacity="0.85"/>
  <path d="M240 ${FLOOR - 50} V200 Q240 186 256 186 H404 Q420 186 420 200 V${FLOOR - 50}" fill="#F472B6" stroke="${L}" stroke-width="1.2"/>
  <rect x="250" y="${FLOOR - 56}" width="160" height="24" rx="8" fill="#F9A8D4" stroke="${L}" stroke-width="1.2"/><rect x="250" y="${FLOOR - 34}" width="160" height="28" rx="4" fill="#EC4899" stroke="${L}" stroke-width="1.2"/>
  <rect x="232" y="${FLOOR - 76}" width="22" height="70" rx="10" fill="#F472B6" stroke="${L}" stroke-width="1.2"/><rect x="406" y="${FLOOR - 76}" width="22" height="70" rx="10" fill="#F472B6" stroke="${L}" stroke-width="1.2"/>
  ${rug(200, FLOOR, 240, '#A7F3D0')}
  <!-- Bếp: gạch ốp, cửa sổ mưa, đồng hồ -->
  ${Array.from({ length: 25 }, (_, i) => `<path d="M${450 + i * 30} 160 V214" stroke="#BAE6FD" stroke-width="1"/>`).join('')}<path d="M440 160 H1220 M440 187 H1220" stroke="#BAE6FD" stroke-width="1"/>
  <defs><clipPath id="e027w2"><rect x="820" y="62" width="120" height="84"/></clipPath></defs>
  <rect x="814" y="56" width="132" height="96" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <g clip-path="url(#e027w2)"><rect x="820" y="62" width="120" height="84" fill="#94A3B8"/><ellipse cx="850" cy="66" rx="44" ry="14" fill="#64748B"/><ellipse cx="920" cy="62" rx="40" ry="13" fill="#64748B"/>
    <g class="e027-drops">${Array.from({ length: 13 }, (_, i) => `<path d="M${824 + i * 9} ${80 + (i % 4) * 16} l-3 9 M${828 + i * 9} ${120 + (i % 3) * 10} l-3 9" stroke="#E0F2FE" stroke-width="2" stroke-linecap="round"/>`).join('')}</g></g>
  <path d="M880 62 V146 M820 104 H940" stroke="#fff" stroke-width="3" opacity="0.85"/>
  <g transform="translate(1012 92)"><circle r="18" fill="#fff" stroke="#F59E0B" stroke-width="3"/><path d="M0 0 V-11 M0 0 H8" stroke="${L}" stroke-width="2" stroke-linecap="round"/></g>
  <!-- Bếp: tủ bếp treo + quầy -->
  <rect x="476" y="220" width="170" height="62" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/><rect x="470" y="214" width="182" height="9" rx="3" fill="#F5F5F4" stroke="${L}"/>
  ${[520, 600].map((x) => `<rect x="${x - 30}" y="230" width="60" height="44" rx="3" fill="#FCD34D" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="490" y="62" width="140" height="82" rx="4" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="496" y="68" width="128" height="70" fill="#78350F"/>
  <path d="M496 104 H624" stroke="#A16207" stroke-width="3"/>
  ${[512, 600].map((x) => `<rect x="${x}" y="80" width="14" height="22" rx="2" fill="#F8FAFC" stroke="${L}" stroke-width="0.6"/>`).join('')}
  <path d="M540 136 l8 -24 h10 l8 24Z" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/>
  <g class="e027-cupflour" transform="translate(576 102)">${FLOUR}</g>
  <g class="e027-cdL"><rect x="496" y="68" width="64" height="70" fill="#D97706" stroke="${L}"/><circle cx="552" cy="104" r="3" fill="#FDE68A"/></g>
  <g class="e027-cdR"><rect x="560" y="68" width="64" height="70" fill="#D97706" stroke="${L}"/><circle cx="568" cy="104" r="3" fill="#FDE68A"/></g>
  <!-- Tủ lạnh -->
  <rect x="664" y="112" width="92" height="${FLOOR - 112}" rx="8" fill="#F1F5F9" stroke="${L}" stroke-width="1.2"/>
  <rect x="670" y="118" width="80" height="${FLOOR - 124}" rx="4" fill="#E0F2FE"/>
  ${[160, 206, 248].map((y) => `<rect x="670" y="${y}" width="80" height="4" fill="#93C5FD" stroke="${L}" stroke-width="0.5"/>`).join('')}
  <g transform="translate(690 160)"><g class="e027-ghostmilk"><path d="M-7 0 V-20 L-3 -27 H3 L7 -20 V0Z" fill="none" stroke="#94A3B8" stroke-width="1.6" stroke-dasharray="3 2"/></g></g>
  <g transform="translate(732 160)"><path d="M-8 0 Q-9 -16 0 -18 Q9 -16 8 0Z" fill="#22C55E" stroke="${L}" stroke-width="0.7"/></g>
  <g class="e027-fridgeeggs" transform="translate(710 206)">${EGGS}</g>
  <g transform="translate(696 248)"><circle cx="0" cy="-8" r="7" fill="#EF4444" stroke="${L}" stroke-width="0.7"/><circle cx="18" cy="-7" r="6" fill="#F97316" stroke="${L}" stroke-width="0.7"/></g>
  <g class="e027-fdoor"><rect x="664" y="112" width="92" height="${FLOOR - 112}" rx="8" fill="#F8FAFC" stroke="${L}" stroke-width="1.2"/><path d="M664 176 H756" stroke="${L}"/>
    <rect x="742" y="128" width="6" height="34" rx="3" fill="#94A3B8"/><rect x="742" y="190" width="6" height="50" rx="3" fill="#94A3B8"/><circle cx="688" cy="140" r="6" fill="#F472B6" stroke="${L}" stroke-width="0.6"/><g transform="translate(704 148)">${STAR('#FACC15')}</g></g>
  <!-- Bàn bếp -->
  <rect x="890" y="${TOP + 6}" width="9" height="${FLOOR - TOP - 6}" fill="#92400E" stroke="${L}"/><rect x="1020" y="${TOP + 6}" width="9" height="${FLOOR - TOP - 6}" fill="#92400E" stroke="${L}"/>
  <rect x="876" y="${TOP}" width="168" height="9" rx="3" fill="#D97706" stroke="${L}" stroke-width="1.2"/>
  <g transform="translate(893 ${TOP})" class="e027-ban">${BANANAS}</g>
  <g transform="translate(920 ${TOP})" class="e027-flour">${FLOUR}</g>
  <g transform="translate(948 ${TOP})" class="e027-eggs">${EGGS}</g>
  <g transform="translate(978 ${TOP})"><path d="M-9 0 V-18 H9 V0Z" fill="#E0F2FE" stroke="#94A3B8" stroke-width="1" opacity="0.9"/><g class="e027-sugarfill"><rect x="-8" y="-12" width="16" height="11" fill="#fff" stroke="#E2E8F0" stroke-width="0.5"/></g>
    <rect x="-7" y="-14" width="14" height="5" rx="1" fill="#fff" stroke="${L}" stroke-width="0.4"/><text x="0" y="-10.4" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="3.8" fill="#BE185D">SUGAR</text>
    <g class="e027-lid"><rect x="-11" y="-22" width="22" height="4" rx="2" fill="#F472B6" stroke="${L}" stroke-width="0.7"/><circle cy="-23" r="2" fill="#F472B6" stroke="${L}" stroke-width="0.6"/></g></g>
  <g transform="translate(1004 ${TOP})" class="e027-milk">${MILK}</g>
  <g transform="translate(1028 ${TOP})" class="e027-sugar">${SUGAR_BAG}</g>
  <!-- Quầy + lò nướng -->
  <rect x="1070" y="220" width="130" height="62" fill="#E5E7EB" stroke="${L}" stroke-width="1.2"/><rect x="1064" y="214" width="142" height="9" rx="3" fill="#F5F5F4" stroke="${L}"/>
  <rect x="1090" y="228" width="90" height="48" rx="4" fill="#475569" stroke="${L}"/>
  <rect x="1100" y="236" width="70" height="30" rx="3" fill="#1F2937"/><g class="e027-ovenglow"><rect x="1100" y="236" width="70" height="30" rx="3" fill="#FB923C"/></g>
  <g class="e027-ovencake" transform="translate(1135 262) scale(0.9)">${CAKE}</g>
  <path d="M1104 232 H1166" stroke="#94A3B8" stroke-width="2.4" stroke-linecap="round"/>
  <g class="e027-cbowl" transform="translate(1120 214)">${MIXBOWL}</g>
  <g class="e027-smell" fill="none" stroke="#FB923C" stroke-width="2.4" stroke-linecap="round" opacity="0.8">${[1110, 1135, 1160].map((x, i) => `<path class="e027-whiff" style="animation-delay:${i * 0.4}s" d="M${x} 210 q-8 -12 0 -24 q8 -12 0 -24 q-8 -12 0 -24"/>`).join('')}</g>
  <rect x="1080" y="70" width="110" height="34" rx="4" fill="#fff" stroke="${L}"/><path d="M1135 70 V104" stroke="${L}" stroke-width="0.8"/>
  <!-- Bát ăn của Kitty -->
  <g transform="translate(980 ${FLOOR})"><path d="M-12 -7 H12 L9 0 H-9Z" fill="#F472B6" stroke="${L}" stroke-width="0.9"/><g class="e027-bowlfish" transform="translate(0 -9) scale(0.7)">${FISH}</g></g>
  <!-- Cửa ra vào -->
  <rect x="1222" y="96" width="40" height="${FLOOR - 96}" fill="#94A3B8"/>
  <g class="e027-door"><rect x="1222" y="96" width="40" height="${FLOOR - 96}" fill="#B45309" stroke="${L}"/><rect x="1228" y="106" width="28" height="60" rx="3" fill="#92400E"/><circle cx="1254" cy="200" r="3" fill="#FDE68A" stroke="${L}"/></g>
  <rect x="1216" y="90" width="52" height="8" fill="#E9D5B5" stroke="${L}"/>
  ${doorway(440, FLOOR)}`;
}

function fg() {
  const rain = Array.from({ length: 70 }, (_, i) => `<path d="M${1250 + (i * 37) % 850} ${(i * 53) % 280} l-4 12" stroke="#E0F2FE" stroke-width="1.6" stroke-linecap="round" opacity="0.8"/>`).join('');
  return `
  <!-- Mưa ngoài trời -->
  <g class="e027-rain">${rain}</g>
  <!-- Quầy hàng (che chân cô bán hàng) -->
  <rect x="1880" y="226" width="120" height="56" fill="#16A34A" stroke="${L}" stroke-width="1.2"/><rect x="1874" y="220" width="132" height="9" rx="3" fill="#F5F5F4" stroke="${L}"/>
  <g transform="translate(1980 220)"><rect x="-12" y="-14" width="24" height="14" rx="2" fill="#475569" stroke="${L}" stroke-width="0.8"/><rect x="-9" y="-11" width="18" height="5" fill="#86EFAC"/></g>
  <g transform="translate(1904 220)">${BREAD}</g>
  <!-- Nhãn chữ -->
  <g class="e027-lb e027-lb-rain">${label(140, 214, 'raining', '#475569', 16)}</g>
  <g class="e027-lb e027-lb-flour">${label(560, 54, 'some flour', '#15803D', 14)}</g>
  <g class="e027-lb e027-lb-eggs">${label(710, 100, 'some eggs', '#15803D', 14)}</g>
  <g class="e027-lb e027-lb-milk">${label(706, 100, 'milk ✗', '#DC2626', 15)}</g>
  <g class="e027-lb e027-lb-ban">${label(900, 200, 'some bananas', '#15803D', 14)}</g>
  <g class="e027-lb e027-lb-sugar">${label(984, 190, 'sugar ✗', '#DC2626', 15)}</g>
  <g class="e027-lb e027-lb-q">${label(860, 140, '?', '#7C3AED', 22)}</g>
  <g class="e027-lb e027-lb-bread">${label(1880, 150, 'bread', '#B45309', 16)}</g>
  <g class="e027-lb e027-lb-all">${label(960, 176, 'everything!', '#15803D', 16)}</g>
  <g class="e027-lb e027-lb-lovely">${label(1150, 120, 'lovely!', '#EA580C', 16)}</g>
  <g class="e027-lb e027-lb-nocake">${label(950, 196, 'cake ✗', '#DC2626', 15)}</g>
  <g class="e027-lb e027-lb-fish">${label(1010, 166, 'some fish', '#0369A1', 15)}</g>
  <g class="e027-ticks">${[893, 920, 948, 1004, 1028].map((x) => `<g transform="translate(${x} ${TOP - 40})"><circle r="7" fill="#22C55E" stroke="${L}" stroke-width="0.8"/><path d="M-3.4 0 l2.4 2.6 l4.4 -5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></g>`).join('')}</g>
  <g class="e027-cakebub"><circle cx="356" cy="134" r="3" fill="#fff" stroke="${L}"/><circle cx="364" cy="120" r="5" fill="#fff" stroke="${L}"/>
    <rect x="320" y="62" width="88" height="52" rx="18" fill="#fff" stroke="${L}" stroke-width="1.4"/><g transform="translate(364 98) scale(1.6)">${CAKE}</g></g>
  <g class="e027-fishbub"><circle cx="920" cy="232" r="3" fill="#fff" stroke="${L}"/><circle cx="928" cy="220" r="5" fill="#fff" stroke="${L}"/>
    <rect x="900" y="170" width="64" height="42" rx="14" fill="#fff" stroke="${L}" stroke-width="1.4"/><g transform="translate(932 192) scale(1.4)">${FISH}</g></g>`;
}

const CSS = `
.e027-drops, .e027-rain { animation: e027Rain .5s linear infinite; }
@keyframes e027Rain { from { transform: translate(0, -24px); } to { transform: translate(-8px, 24px); } }
.e027-lb, .e027-ticks, .e027-cakebub, .e027-fishbub { opacity: 0; transition: opacity .3s; }
.st-lb-rain .e027-lb-rain, .st-lb-flour .e027-lb-flour, .st-lb-eggs .e027-lb-eggs, .st-lb-milk .e027-lb-milk, .st-lb-ban .e027-lb-ban,
.st-lb-sugar .e027-lb-sugar, .st-lb-q .e027-lb-q, .st-lb-bread .e027-lb-bread, .st-lb-all .e027-lb-all, .st-lb-lovely .e027-lb-lovely,
.st-lb-nocake .e027-lb-nocake, .st-lb-fish .e027-lb-fish, .st-all .e027-ticks, .st-cakebub .e027-cakebub, .st-fishbub .e027-fishbub { opacity: 1; }
.e027-cdL { transform-origin: 496px 104px; transition: transform .6s cubic-bezier(.4,0,.2,1); }
.e027-cdR { transform-origin: 624px 104px; transition: transform .6s cubic-bezier(.4,0,.2,1); }
.st-cup .e027-cdL, .st-cup .e027-cdR { transform: scaleX(.12); }
.e027-fdoor { transform-origin: 664px 200px; transition: transform .6s cubic-bezier(.4,0,.2,1); }
.st-fridge .e027-fdoor { transform: scaleX(.1); }
.e027-cupflour, .e027-fridgeeggs, .e027-cbowl { transition: opacity .2s; }
.st-flour .e027-cupflour, .st-eggs .e027-fridgeeggs, .st-oven .e027-cbowl { opacity: 0; }
.e027-flour, .e027-eggs, .e027-milk, .e027-sugar, .e027-bowlfish { opacity: 0; transition: opacity .2s; }
.st-flour .e027-flour, .st-eggs .e027-eggs, .st-milk .e027-milk, .st-sugar .e027-sugar, .st-fish .e027-bowlfish { opacity: 1; }
.e027-ghostmilk { opacity: 0; } .st-lb-milk .e027-ghostmilk { opacity: 1; animation: e027Blink .5s ease-in-out infinite alternate; }
@keyframes e027Blink { to { opacity: .3; } }
.st-ban .e027-ban { animation: e027Pop .35s ease-in-out 4 alternate; }
@keyframes e027Pop { to { transform: translate(893px, ${TOP - 6}px) scale(1.25); } }
.e027-lid { transition: transform .5s cubic-bezier(.4,0,.2,1); }
.st-lid .e027-lid { transform: translate(14px, -14px) rotate(30deg); }
.e027-sugarfill { transform-origin: 0 -1px; transform: scaleY(.05); transition: transform .8s; }
.st-sugar .e027-sugarfill { transform: scaleY(1); }
.e027-door { transform-origin: 1222px 200px; transition: transform .6s cubic-bezier(.4,0,.2,1); }
.st-door .e027-door { transform: scaleX(.12); }
.e027-ovenglow, .e027-ovencake { opacity: 0; transition: opacity .6s; }
.st-oven .e027-ovenglow { opacity: .85; animation: e027Blink .9s ease-in-out infinite alternate; }
.st-oven .e027-ovencake { opacity: 1; }
.e027-smell { opacity: 0; transition: opacity .5s; }
.st-smell .e027-smell { opacity: .8; }
.e027-whiff { animation: e027Whiff 1.6s ease-out infinite; }
@keyframes e027Whiff { from { transform: translateY(8px); opacity: 0; } 30% { opacity: 1; } to { transform: translateY(-16px); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .e027-drops, .e027-rain { animation-duration: 1.4s; } }
`;

const BEATS = [
  { key: ['It is raining today'], icon: '🌧️', label: 'raining', async play(st) {
    st.look(200);
    st.sfx('rain');
    st.set('st-lb-rain');
    st.mood('minh', 'wow');
    st.fx('drops', 120, 100); st.fx('drops', 170, 120);
    await st.wait(1500);
    st.set('st-lb-rain', false); st.mood('minh', 'happy');
  } },
  { key: ['at home', 'making a cake'], icon: '🎂', label: 'making a cake', async play(st) {
    st.look(240);
    st.pose('lan', 'cheer'); st.mood('lan', 'joy');
    st.set('st-cakebub'); st.fx('sparkle', 364, 90);
    await st.wait(1500);
    st.pose('lan', 'stand');
    st.pose('minh', 'clap'); st.act('minh', 'clap'); st.mood('minh', 'joy');
    await st.wait(1300);
    st.act('minh', null); st.pose('minh', 'stand'); st.mood('lan', 'happy'); st.mood('minh', 'happy');
  } },
  { key: ['looking in the kitchen'], icon: '🔍', label: 'looking', async play(st) {
    st.set('st-cakebub', false);
    await Promise.all([
      st.walk('lan', 562, { speed: 130, lead: 60 }),
      (async () => { await st.wait(400); await st.walk('minh', 846, { speed: 150, follow: false }); })(),
    ]);
    st.pose('lan', 'think'); st.act('lan', 'no');
    await st.wait(1300);
    st.act('lan', null); st.pose('lan', 'stand');
  } },
  { key: ['some flour in the cupboard'], icon: '🌾', label: 'some flour', async play(st) {
    st.pose('lan', 'reach');
    await st.wait(300);
    st.set('st-cup'); st.sfx('wardrobe-open');
    await st.wait(600);
    st.set('st-lb-flour'); st.fx('sparkle', 576, 90);
    await st.wait(700);
    st.set('st-flour');
    await st.fly(`<g transform="translate(0 12)">${FLOUR}</g>`, [576, 92], [920, TOP - 12], { dur: 800 });
    st.set('st-cup', false); st.set('st-lb-flour', false); st.pose('lan', 'stand');
  } },
  { key: ['some eggs in the fridge'], icon: '🥚', label: 'some eggs', async play(st) {
    await st.walk('lan', 790, { speed: 130, lead: 40 });
    await st.walk('lan', 786, { speed: 40, follow: false });
    st.pose('lan', 'reach');
    st.set('st-fridge'); st.sfx('door-open', { vol: 0.6 });
    await st.wait(600);
    st.set('st-lb-eggs'); st.fx('sparkle', 710, 196);
    await st.wait(700);
    st.set('st-eggs');
    await st.fly(`<g transform="translate(0 6)">${EGGS}</g>`, [710, 200], [948, TOP - 6], { dur: 800 });
    st.set('st-lb-eggs', false); st.pose('lan', 'stand');
  } },
  { key: ["there isn't any milk"], icon: '🥛', label: 'no milk', async play(st) {
    st.set('st-lb-milk'); st.pose('lan', 'point'); st.mood('lan', 'wow');
    await st.wait(1500);
    st.pose('lan', 'shrug'); st.act('lan', 'no');
    await st.wait(900);
    st.act('lan', null); st.set('st-lb-milk', false); st.set('st-fridge', false); st.pose('lan', 'stand'); st.mood('lan', 'happy');
  } },
  { key: ['Are there any bananas'], icon: '🍌', label: 'any bananas?', async play(st) {
    await st.say('minh', 'Are there any bananas?', 2200);
  } },
  { key: ['asks Minh'], icon: '🙋', label: 'asks Minh', async play(st) {
    st.set('st-lb-q'); st.pose('minh', 'think'); st.mood('minh', 'wow');
    await st.wait(1300);
    st.set('st-lb-q', false); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['some bananas on the table'], icon: '🍌', label: 'some bananas', async play(st) {
    st.pose('lan', 'point'); st.mood('lan', 'joy');
    st.say('lan', 'Yes!', 1200);
    await st.wait(500);
    st.set('st-ban'); st.set('st-lb-ban'); st.fx('sparkle', 893, TOP - 10);
    await st.wait(1800);
    st.set('st-ban', false); st.set('st-lb-ban', false); st.pose('lan', 'stand'); st.mood('lan', 'happy');
  } },
  { key: ['Is there any sugar'], icon: '🍬', label: 'any sugar?', async play(st) {
    st.pose('minh', 'point');
    await st.say('minh', 'Is there any sugar?', 2000);
    st.pose('minh', 'stand');
  } },
  { key: ["there isn't any sugar"], icon: '🚫', label: 'no sugar', async play(st) {
    await st.walk('lan', 1050, { speed: 150, lead: -40 });
    await st.walk('lan', 1046, { speed: 40, follow: false });
    st.pose('lan', 'reach');
    await st.wait(300);
    st.set('st-lid'); st.set('st-lb-sugar');
    await st.wait(600);
    st.pose('lan', 'shrug'); st.act('lan', 'no'); st.mood('lan', 'wow');
    await st.wait(1400);
    st.act('lan', null); st.set('st-lid', false); st.set('st-lb-sugar', false); st.pose('lan', 'stand'); st.mood('lan', 'happy');
  } },
  { key: ['Minh calls Dad'], icon: '📞', label: 'calls Dad', async play(st) {
    st.look(930);
    st.hold('minh', 'phone'); st.pose('minh', 'phone');
    st.sfx('phone-ring');
    st.fx('ring', 860, 150);
    await st.wait(500);
    await st.say('minh', 'Hello, Dad!', 1700);
  } },
  { key: ['buying some bread at the shop'], icon: '🍞', label: 'bread', async play(st) {
    st.hold('minh', null); st.pose('minh', 'stand');
    await st.look(1880, { dur: 1100 });
    st.set('st-lb-bread');
    st.pose('shop', 'give'); st.pose('dad', 'reach');
    await st.fly(BREAD, [1920, 196], [1850, 200], { dur: 700 });
    st.pose('shop', 'stand'); st.pose('dad', 'carry'); st.chest('dad', `<g transform="translate(0 -6)">${BREAD}</g>`); st.mood('dad', 'joy');
    await st.wait(900);
    st.set('st-lb-bread', false); st.mood('dad', 'happy');
    // bố quay sang trái, sẵn sàng đi về
    st.chest('dad', null); st.pose('dad', 'stand');
    await st.walk('dad', 1824, { speed: 40, follow: false });
    st.show('carry', true);
  } },
  { key: ['brings some milk and some sugar home'], icon: '☂️', label: 'brings milk', async play(st) {
    await Promise.all([
      st.walk('dad', 1290, { speed: 150, lead: -60 }),
      st.walk('carry', 1290, { speed: 150, follow: false }),
    ]);
    st.set('st-door'); st.sfx('door-open'); st.show('carry', false);
    await st.walk('dad', 1150, { speed: 130, lead: -100 });
    st.pose('dad', 'give');
    st.fly(`<g transform="translate(0 10)">${MILK}</g>`, [1130, 200], [1004, TOP - 10], { dur: 700 });
    await st.wait(250);
    await st.fly(`<g transform="translate(0 10)">${SUGAR_BAG}</g>`, [1130, 200], [1028, TOP - 10], { dur: 700 });
    st.set('st-milk'); st.set('st-sugar'); st.set('st-door', false);
    st.pose('dad', 'stand');
  } },
  { key: ['Lan has got everything'], icon: '✅', label: 'everything', async play(st) {
    st.look(990);
    st.set('st-all'); st.set('st-lb-all'); st.sfx('sparkle');
    st.pose('lan', 'cheer'); st.act('lan', 'jump'); st.mood('lan', 'joy');
    await st.wait(1300);
    st.act('lan', null); st.pose('lan', 'stand'); st.mood('lan', 'happy');
    await st.walk('dad', 1196, { speed: 110, follow: false });
    st.set('st-all', false); st.set('st-lb-all', false);
  } },
  { key: ['The cake is in the oven', 'smells lovely'], icon: '♨️', label: 'in the oven', async play(st) {
    await st.walk('lan', 1110, { speed: 110, follow: false });
    st.pose('lan', 'carry');
    st.set('st-oven');
    st.chest('lan', `<g transform="translate(0 -2) scale(0.8)">${MIXBOWL}</g>`);
    await st.wait(500);
    st.chest('lan', null); st.pose('lan', 'stand');
    await st.walk('lan', 1060, { speed: 100, follow: false });
    st.fx('sparkle', 1135, 250);
    await st.wait(900);
    st.set('st-smell'); st.set('st-lb-lovely');
    st.mood('lan', 'shut'); st.mood('minh', 'shut'); st.mood('dad', 'joy');
    st.fx('hearts', 1135, 190);
    await st.wait(1600);
    st.set('st-lb-lovely', false); st.mood('lan', 'joy'); st.mood('minh', 'joy');
  } },
  { key: ["Kitty doesn't want any cake"], icon: '🙅', label: 'no cake', async play(st) {
    st.mood('lan', 'happy'); st.mood('minh', 'happy'); st.mood('dad', 'happy');
    st.dog('kitty', 'stand');
    await st.walk('kitty', 940, { speed: 260, lead: 30 });
    st.dog('kitty', 'sit');
    st.pose('lan', 'give');
    await st.fly(SLICE, [1040, 200], [960, 274], { dur: 650 });
    st.show('slice', true); st.pose('lan', 'stand');
    await st.wait(300);
    st.dog('kitty', 'stand');
    await st.walk('kitty', 910, { speed: 120, follow: false });
    st.dog('kitty', 'sit'); st.set('st-lb-nocake');
    await st.wait(1200);
  } },
  { key: ['She wants some fish'], icon: '🐟', label: 'some fish', async play(st) {
    st.set('st-lb-nocake', false);
    st.set('st-fishbub'); st.mood('kitty', 'joy');
    await st.wait(900);
    st.set('st-fishbub', false); st.show('slice', false);
    st.pose('minh', 'give');
    await st.fly(FISH, [880, 196], [980, 270], { dur: 700 });
    st.set('st-fish'); st.set('st-lb-fish'); st.pose('minh', 'stand');
    st.dog('kitty', 'stand');
    await st.walk('kitty', 952, { speed: 120, follow: false });
    st.act('kitty', 'jump');
    st.fx('hearts', 960, 230);
    await st.wait(1300);
    st.act('kitty', null);
  } },
];

export default {
  id: 'en027', worldW: 2100, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  cast: [
    { id: 'shop', kind: 'adult', who: 'e027_shop', x: 1940, s: 0.92 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 1820, s: 0.95 },
    { id: 'carry', kind: 'thing', x: 1824, s: 0.95, face: -1, svg: CARRY, box: [-50, -232, 100, 236] },
    { id: 'slice', kind: 'thing', x: 960, svg: `<g transform="translate(0 -5)">${SLICE}</g>`, box: [-12, -16, 24, 18] },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 120 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 200, s: 1.08 },
    { id: 'kitty', kind: 'cat', x: 320, s: 0.95, face: -1 },
  ],
  init(st) {
    st.dog('kitty', 'sit');
    st.show('carry', false); st.show('slice', false);
  },
};
