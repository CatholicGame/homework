/**
 * Bài 25 "A Day on the Farm": đường làng có biển "NAM DINH" → cổng trại · sân (xe đạp cũ của ông) → chuồng gà → nhà ông bà
 * → ao (vịt ngủ bên bờ) → bãi cỏ (con bò to) → vườn rau của bà. Mọi người đi theo thứ tự câu chuyện từ trái sang phải.
 * Câu phủ định (doesn't / don't) hiện thành biển có dấu ✗ đỏ (ô tô, cửa hàng, vịt trong nhà, bát cơm, TV), câu khẳng định là hành động thật.
 * Cỡ thật: bò cao hơn trẻ em (vai ≈ 140 so với trẻ ≈ 122), gà ≈ 36, vịt ≈ 30, xe đạp người lớn bánh ≈ 56.
 * Toạ độ cảnh: rộng 2660, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, palm, bush, grass, fence, water, label } from '../kit.js';

const FLOOR = 282;

// ── Con vật, đồ vật (gốc = điểm chạm đất) ─────────────────────────────────
const HEN = (c = '#fff', comb = '#EF4444') => `<g class="e025-peck"><path d="M-16 -12 Q-20 -30 -4 -30 Q6 -30 10 -22 Q16 -18 14 -10 Q10 -2 -4 -2 Q-14 -2 -16 -12Z" fill="${c}" stroke="${L}" stroke-width="1"/>
  <path d="M-16 -18 Q-26 -30 -18 -34 Q-14 -26 -12 -22" fill="${c}" stroke="${L}" stroke-width="0.9"/>
  <g class="e025-henhead" style="transform-origin:8px -24px"><circle cx="10" cy="-30" r="7" fill="${c}" stroke="${L}" stroke-width="1"/><path d="M6 -37 q2 -5 4 0 q2 -5 4 0" fill="${comb}" stroke="${L}" stroke-width="0.6"/>
  <path d="M16 -31 l6 2 l-6 2Z" fill="#F59E0B" stroke="${L}" stroke-width="0.6"/><circle cx="12" cy="-31" r="1.1" fill="#1F2937"/><path d="M14 -26 q2 4 -1 5" fill="${comb}"/></g>
  <path d="M-6 -16 q6 -4 12 2" stroke="#E2E8F0" stroke-width="2" fill="none"/><path d="M-4 -2 V0 M2 -2 V0" stroke="#F59E0B" stroke-width="2"/></g>`;
const DUCK = `<g class="e025-waddle"><path d="M-16 -10 Q-18 -24 -6 -22 Q2 -20 8 -16 Q14 -18 14 -10 Q12 -2 -2 -2 Q-14 -2 -16 -10Z" fill="#fff" stroke="${L}" stroke-width="1"/>
  <circle cx="9" cy="-24" r="6.4" fill="#fff" stroke="${L}" stroke-width="1"/><path d="M14 -24 l7 2 l-7 2Z" fill="#F97316" stroke="${L}" stroke-width="0.6"/>
  <g class="e025-eyeo"><circle cx="10.6" cy="-25.4" r="1.1" fill="#1F2937"/></g><path class="e025-eyec" d="M9 -25.4 h3" stroke="#1F2937" stroke-width="1"/>
  <path d="M-8 -14 q6 -4 10 2" stroke="#E2E8F0" stroke-width="2" fill="none"/><path d="M-4 -2 v2 h-3 M3 -2 v2 h3" stroke="#F97316" stroke-width="1.6" fill="none"/></g>`;
const COW = `<g class="e025-cow">
  <path d="M-98 -118 Q-118 -100 -112 -66" stroke="${L}" stroke-width="3.4" fill="none"/><path d="M-98 -118 Q-118 -100 -112 -66" stroke="#fff" stroke-width="2" fill="none"/><path d="M-116 -70 q4 10 8 0Z" fill="#1F2937"/>
  ${[[-74, 1], [72, 1]].map(([x]) => `<rect x="${x - 7}" y="-76" width="14" height="76" rx="6" fill="#E5E7EB" stroke="${L}"/><rect x="${x - 7}" y="-8" width="14" height="8" rx="2" fill="#475569"/>`).join('')}
  <path d="M-100 -96 Q-104 -140 -60 -142 H70 Q104 -140 102 -100 Q100 -66 70 -64 H-70 Q-100 -64 -100 -96Z" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <path d="M-60 -140 Q-40 -126 -54 -104 Q-74 -98 -80 -116 Q-80 -136 -60 -140Z M10 -142 Q30 -120 14 -100 Q-4 -104 -6 -122 Q-4 -140 10 -142Z M60 -86 Q76 -96 86 -80 Q80 -68 64 -70Z" fill="#1F2937"/>
  <ellipse cx="-10" cy="-62" rx="18" ry="8" fill="#F9A8D4" stroke="${L}"/><path d="M-18 -56 v5 M-10 -55 v6 M-2 -56 v5" stroke="${L}" stroke-width="2.4" stroke-linecap="round"/>
  ${[[-56, 0], [56, 0]].map(([x]) => `<rect x="${x - 7}" y="-76" width="14" height="76" rx="6" fill="#fff" stroke="${L}"/><rect x="${x - 7}" y="-8" width="14" height="8" rx="2" fill="#475569"/>`).join('')}
  <g class="e025-cowhead" style="transform-origin:96px -118px">
    <path d="M90 -128 Q110 -150 130 -146 Q150 -142 156 -116 Q160 -96 146 -90 Q130 -86 116 -96 Q100 -104 90 -128Z" fill="#fff" stroke="${L}" stroke-width="1.4"/>
    <path d="M112 -146 q-6 -12 -14 -12 M136 -146 q4 -12 12 -14" stroke="#FDE68A" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="M104 -140 q-16 -2 -20 6 q10 6 22 0Z" fill="#fff" stroke="${L}" stroke-width="1"/>
    <path d="M118 -142 Q132 -132 124 -118 Q112 -120 112 -132Z" fill="#1F2937"/>
    <ellipse cx="148" cy="-100" rx="14" ry="11" fill="#FBCFE8" stroke="${L}"/><circle cx="144" cy="-102" r="2" fill="${L}"/><circle cx="153" cy="-100" r="2" fill="${L}"/>
    <circle cx="134" cy="-124" r="3" fill="#1F2937"/><circle cx="135" cy="-125" r="1" fill="#fff"/>
    <g class="e025-chew"><path d="M138 -90 q8 4 16 -2" stroke="${L}" stroke-width="1.4" fill="none"/></g>
    <g class="e025-tuft"><path d="M150 -88 l-4 10 M154 -88 l2 10 M158 -90 l6 8" stroke="#16A34A" stroke-width="2.4" stroke-linecap="round"/></g></g></g>`;
/** Xe đạp cũ (bánh r = 28) có / không có ông ngồi. */
const BIKE = (rider) => {
  const wheel = (x) => `<g transform="translate(${x} -28)"><g class="e025-wheel"><circle r="28" fill="none" stroke="#1F2937" stroke-width="4"/><circle r="28" fill="none" stroke="#57534E" stroke-width="1.6"/>
    ${[0, 45, 90, 135].map((r) => `<path d="M-26 0 H26" stroke="#A8A29E" stroke-width="0.9" transform="rotate(${r})"/>`).join('')}<circle r="3.4" fill="#57534E"/></g></g>`;
  return `${wheel(-44)}${wheel(46)}
  <path d="M-44 -28 L-6 -28 L-16 -76 M-6 -28 L34 -74 L-16 -74 M46 -28 L34 -74 L30 -92" stroke="#7C4A2A" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M-44 -28 L-16 -76" stroke="#7C4A2A" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M-58 -50 Q-44 -64 -30 -56" stroke="#57534E" stroke-width="3" fill="none"/>
  <path d="M22 -96 H40" stroke="#1F2937" stroke-width="4" stroke-linecap="round"/><rect x="-28" y="-84" width="24" height="7" rx="3.4" fill="#1F2937"/>
  <path d="M40 -84 h22 l-4 18 h-16Z" fill="#D97706" stroke="${L}" stroke-width="1"/><path d="M44 -78 h16 M45 -72 h14" stroke="#92400E" stroke-width="0.9"/>
  <g class="e025-crank" style="transform-origin:-6px -28px"><path d="M-6 -28 L2 -18 M-6 -28 L-14 -38" stroke="#1F2937" stroke-width="2.4"/></g>
  ${rider ? `<path d="M-16 -82 L4 -54 L-4 -30" stroke="${L}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M-16 -82 L4 -54 L-4 -30" stroke="#57534E" stroke-width="7.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-24 -82 L-12 -132 L6 -132 L4 -80Z" fill="#FDE68A" stroke="${L}" stroke-width="1"/>
    <path d="M-2 -126 L28 -98" stroke="${L}" stroke-width="7.4" stroke-linecap="round"/><path d="M-2 -126 L28 -98" stroke="#FDE68A" stroke-width="5.6" stroke-linecap="round"/><circle cx="29" cy="-97" r="3.6" fill="#F5C9A0" stroke="${L}" stroke-width="0.8"/>
    <g transform="translate(-4 -150)">${headOnly('en_grandpa', { s: 0.95 })}</g>` : ''}`;
};
const RICE = `<g transform="translate(0 -4)"><path d="M-10 -2 H10 Q9 8 0 9 Q-9 8 -10 -2Z" fill="#fff" stroke="#3B82F6" stroke-width="1.2"/><path d="M-9 -2 Q0 -10 9 -2Z" fill="#fff" stroke="${L}" stroke-width="0.6"/></g>`;
const BASKET = `<g transform="translate(0 8)"><path d="M-12 0 H12 L9 14 H-9Z" fill="#D97706" stroke="${L}" stroke-width="1"/><path d="M-10 5 H10 M-9 10 H9" stroke="#92400E" stroke-width="0.8"/>
  <path d="M-10 0 Q0 -14 10 0" stroke="${L}" stroke-width="1.4" fill="none"/><g class="e025-eggs"><ellipse cx="-4" cy="-1" rx="3.4" ry="4.2" fill="#FEF3C7" stroke="${L}" stroke-width="0.6"/><ellipse cx="3" cy="-2" rx="3.4" ry="4.2" fill="#FEF3C7" stroke="${L}" stroke-width="0.6"/></g></g>`;
const EGG = `<ellipse rx="5" ry="6.4" fill="#FEF3C7" stroke="${L}" stroke-width="0.9"/>`;
const XMARK = (s = 1) => `<path d="M${-14 * s} ${-14 * s} L${14 * s} ${14 * s} M${14 * s} ${-14 * s} L${-14 * s} ${14 * s}" stroke="#EF4444" stroke-width="${5 * s}" stroke-linecap="round"/>`;
/** Biển phủ định: hình (svg) trong khung tròn trắng có ✗ đỏ. */
const noSign = (x, y, inner, cls) => `<g class="e025-no ${cls}"><g transform="translate(${x} ${y})"><circle r="26" fill="#fff" stroke="#EF4444" stroke-width="3"/>${inner}${XMARK(0.9)}</g></g>`;
const MINI_CAR = `<path d="M-18 4 V-2 Q-18 -6 -12 -6 L-6 -13 H6 L12 -6 Q18 -6 18 -2 V4Z" fill="#3B82F6" stroke="${L}" stroke-width="0.9"/><circle cx="-10" cy="5" r="4" fill="#1F2937"/><circle cx="10" cy="5" r="4" fill="#1F2937"/>`;
const MINI_SHOP = `<rect x="-16" y="-6" width="32" height="18" fill="#FEF3C7" stroke="${L}" stroke-width="0.9"/><path d="M-18 -6 L-14 -16 H14 L18 -6Z" fill="#EF4444" stroke="${L}" stroke-width="0.9"/><path d="M-10 -16 L-12 -6 M0 -16 V-6 M10 -16 L12 -6" stroke="#fff" stroke-width="2"/><text y="8" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="8" fill="#B45309">SHOP</text>`;
const MINI_DUCK = `<g transform="translate(-2 12) scale(1.1)">${DUCK.replace('class="e025-waddle"', '')}</g>`;
const MINI_TV = `<rect x="-16" y="-12" width="32" height="22" rx="3" fill="#334155" stroke="${L}" stroke-width="0.9"/><rect x="-13" y="-9" width="26" height="16" rx="1" fill="#93C5FD"/><path d="M-6 10 L-8 15 M6 10 L8 15" stroke="${L}" stroke-width="1.6"/>`;

const LB = [['sun', 330, 112, 'SUNDAY', '#DC2626', 17], ['ducks', 1250, 160, 'ducks', '#0369A1', 16], ['chickens', 860, 160, 'chickens', '#B45309', 16], ['cow', 2010, 112, 'a cow', '#7C3AED', 16],
  ['bike', 1000, 110, 'an old bike', '#7C4A2A', 16], ['eggs', 850, 150, 'eggs', '#B45309', 16], ['pond', 1560, 190, 'near the pond', '#0369A1', 15],
  ['grass', 2160, 112, 'grass', '#16A34A', 17], ['big', 2010, 106, 'very big!', '#DC2626', 20]];

function bg() {
  return `
  ${sky(0, 2800, 315, 'e025sky')}
  ${cloud(160, 56, 0.9, 0)}${cloud(700, 64, 1, 2)}${cloud(1240, 46, 0.8, 4)}${cloud(1800, 60, 1, 1)}${cloud(2380, 52, 0.9, 3)}
  <g transform="translate(1600 70)"><circle r="22" fill="#FDE047" stroke="#F59E0B" stroke-width="2"/></g>
  ${grass(0, 2800, FLOOR)}
  <!-- Ruộng lúa đường làng -->
  <rect x="0" y="214" width="320" height="60" fill="#4ADE80" stroke="${L}" stroke-width="0.8"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${10 + i * 26} 220 V266" stroke="#16A34A" stroke-width="3" stroke-dasharray="6 7"/>`).join('')}
  ${palm(40, FLOOR - 4, 0.9)}
  <rect x="146" y="150" width="6" height="${FLOOR - 150}" fill="#78716C"/><rect x="100" y="118" width="98" height="34" rx="4" fill="#16A34A" stroke="${L}" stroke-width="1.2"/>
  <text x="149" y="141" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#fff">NAM DINH</text>
  <!-- Cổng trại -->
  ${[300, 366].map((x) => `<rect x="${x - 6}" y="150" width="12" height="${FLOOR - 150}" fill="#A16207" stroke="${L}"/>`).join('')}
  <rect x="290" y="140" width="86" height="22" rx="4" fill="#FDE68A" stroke="${L}"/><text x="333" y="157" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="14" fill="#B45309">FARM</text>
  ${fence(372, 330, FLOOR)}
  ${tree(760, FLOOR - 8, 1.1)}
  <!-- Mây nghĩ: Hà Nội khác trang trại -->
  <g class="e025-think"><g transform="translate(470 100)"><ellipse rx="110" ry="48" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <circle cx="-40" cy="56" r="7" fill="#fff" stroke="${L}"/><circle cx="-30" cy="70" r="4" fill="#fff" stroke="${L}"/>
    <g transform="translate(-54 16)">${[[-30, 46, '#93C5FD'], [-12, 62, '#FCA5A5'], [6, 40, '#FDE68A'], [22, 54, '#C4B5FD']].map(([x, h, c]) => `<rect x="${x - 8}" y="${-h}" width="16" height="${h}" fill="${c}" stroke="${L}" stroke-width="0.8"/>${[12, 24, 36].filter((y) => y < h - 4).map((y) => `<rect x="${x - 4}" y="${-h + y - 8}" width="8" height="5" fill="#fff"/>`).join('')}`).join('')}
      <g transform="translate(-4 6) scale(.8)">${MINI_CAR}</g></g>
    <text x="-54" y="-30" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="13" fill="#1D4ED8">Hanoi</text>
    <text x="0" y="12" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="30" fill="#DC2626">≠</text>
    <g transform="translate(56 18)"><path d="M-26 -14 L0 -34 L26 -14Z" fill="#EF4444" stroke="${L}" stroke-width="0.9"/><rect x="-22" y="-14" width="44" height="22" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/><rect x="-6" y="-6" width="12" height="14" fill="#B45309"/>
      <path d="M-40 8 Q-34 -6 -28 8" fill="#22C55E" stroke="${L}" stroke-width="0.8"/></g>
    <text x="56" y="-30" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="13" fill="#16A34A">farm</text></g></g>
  ${noSign(560, 96, MINI_CAR, 'e025-nocar')}
  <!-- Chuồng gà -->
  <g transform="translate(800 0)"><path d="M-40 182 L20 150 L80 182Z" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="-34" y="182" width="108" height="${FLOOR - 182}" fill="#D97706" stroke="${L}"/>
    ${[0, 1, 2, 3].map((i) => `<path d="M${-28 + i * 28} 186 V${FLOOR}" stroke="#B45309" stroke-width="2"/>`).join('')}<path d="M6 ${FLOOR} V232 Q6 222 16 222 H24 Q34 222 34 232 V${FLOOR}" fill="#78350F" stroke="${L}"/>
    <ellipse cx="54" cy="${FLOOR - 10}" rx="14" ry="4" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/></g>
  ${noSign(800, 100, MINI_SHOP, 'e025-noshop')}
  <!-- Nhà ông bà -->
  <path d="M1050 140 L1210 80 L1370 140Z" fill="#DC2626" stroke="${L}" stroke-width="1.4"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${1080 + i * 50} ${128 - (i % 2)} l20 -6" stroke="#991B1B" stroke-width="1.4"/>`).join('')}
  <rect x="1066" y="140" width="288" height="${FLOOR - 140}" fill="#FFEDD5" stroke="${L}" stroke-width="1.2"/>
  <rect x="1090" y="168" width="58" height="50" fill="#BAE6FD" stroke="${L}" stroke-width="1.2"/><path d="M1119 168 V218 M1090 193 H1148" stroke="#fff" stroke-width="2.4"/>
  <rect x="1276" y="168" width="58" height="50" fill="#BAE6FD" stroke="${L}" stroke-width="1.2"/><path d="M1305 168 V218 M1276 193 H1334" stroke="#fff" stroke-width="2.4"/>
  <rect x="1180" y="190" width="60" height="${FLOOR - 190}" fill="#78350F" stroke="${L}"/><rect x="1180" y="190" width="14" height="${FLOOR - 190}" fill="#B45309" stroke="${L}"/>
  ${noSign(1210, 158, MINI_DUCK, 'e025-noduck')}
  <!-- Ao -->
  <path d="M1400 ${FLOOR - 4} Q1410 248 1460 246 H1720 Q1770 248 1776 ${FLOOR - 4}Z" fill="#38BDF8" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: 6 }, (_, i) => `<path d="M${1470 + i * 44} ${256 + (i % 2) * 10} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  ${[1420, 1750].map((x) => `<path d="M${x} ${FLOOR - 2} q-6 -26 -2 -40 M${x + 6} ${FLOOR - 2} q2 -28 8 -36 M${x + 12} ${FLOOR - 2} q8 -22 14 -28" stroke="#15803D" stroke-width="2.4" fill="none"/>`).join('')}
  <!-- Bãi cỏ, đống rơm -->
  ${tree(1830, FLOOR - 8, 1.2, null)}
  <path d="M2710 ${FLOOR} Q2710 200 2750 196 Q2790 200 2790 ${FLOOR}Z" fill="#FACC15" stroke="${L}"/><path d="M2720 240 h60 M2716 260 h68" stroke="#CA8A04" stroke-width="1.4"/>
  ${noSign(2220, 100, RICE.replace('translate(0 -4)', 'translate(0 2) scale(1.6)'), 'e025-norice')}
  <g class="e025-clump">${[-14, -7, 0, 7, 14].map((d, i) => `<path d="M${2142 + d} ${FLOOR} Q${2142 + d * 1.6} ${FLOOR - 40} ${2142 + d * 2.2 + (i % 2 ? 4 : -4)} ${FLOOR - 66 + Math.abs(d)}" stroke="${i % 2 ? '#16A34A' : '#22C55E'}" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <g class="e025-measure"><path d="M1878 ${FLOOR} V138 M1870 138 h16" stroke="#DC2626" stroke-width="2" stroke-dasharray="5 4"/></g>
  <!-- Vườn rau -->
  ${[0, 1, 2].map((r) => `<rect x="${2400 + r * 104}" y="${FLOOR - 10}" width="88" height="14" rx="5" fill="#92400E" stroke="${L}"/>`).join('')}
  ${[0, 1, 2].map((r) => [0, 1, 2].map((i) => `<g transform="translate(${2416 + r * 104 + i * 28} ${FLOOR - 10})"><g class="e025-grow" style="transition-delay:${(r * 3 + i) * 0.1}s">
    <circle cx="0" cy="-8" r="9" fill="${r === 1 ? '#F97316' : '#4ADE80'}" stroke="${L}" stroke-width="0.9"/><path d="M-4 -12 q4 -10 8 0" stroke="#16A34A" stroke-width="2" fill="none"/></g></g>`).join('')).join('')}
  ${bush(2380, FLOOR - 2, 0.8)}
  <g class="e025-think2"><g transform="translate(2400 104)"><ellipse rx="44" ry="32" fill="#fff" stroke="${L}" stroke-width="1.2"/><circle cx="20" cy="40" r="6" fill="#fff" stroke="${L}"/>
    <g transform="scale(1.3)">${MINI_TV}${XMARK(0.9)}</g></g></g>
  ${LB.map(([k, x, y, t, c, s]) => `<g class="e025-lb e025-lb-${k}">${label(x, y, t, c, s)}</g>`).join('')}`;
}

const CSS = `
.e025-lb, .e025-no, .e025-think, .e025-think2, .e025-measure { opacity: 0; transition: opacity .35s; }
${LB.map(([k]) => `.st-lb-${k} .e025-lb-${k}`).join(', ')} { opacity: 1; }
.st-nocar .e025-nocar, .st-noshop .e025-noshop, .st-noduck .e025-noduck, .st-norice .e025-norice, .st-think .e025-think, .st-tv .e025-think2, .st-measure .e025-measure { opacity: 1; }
.e025-no > g { transform-box: fill-box; transform-origin: center; }
.st-nocar .e025-nocar > g, .st-noshop .e025-noshop > g, .st-noduck .e025-noduck > g, .st-norice .e025-norice > g { animation: e025Pop .45s cubic-bezier(.3,1.6,.6,1); }
@keyframes e025Pop { from { transform: scale(.3); } }
.e025-grow { transform: scale(.55); transform-origin: 0 0; transition: transform .6s cubic-bezier(.3,1.6,.6,1); }
.st-grow .e025-grow { transform: scale(1.15); }
.e025-peck .e025-henhead { animation: e025Peck 1.1s ease-in-out infinite; }
@keyframes e025Peck { 0%, 60%, 100% { transform: none; } 75% { transform: rotate(38deg); } }
.e025-eyec { display: none; }
.es-thing.act-e025-sleep .e025-eyec { display: inline; } .es-thing.act-e025-sleep .e025-eyeo { display: none; }
.es-thing.is-walk .e025-waddle { animation: e025Waddle .26s ease-in-out infinite alternate; }
@keyframes e025Waddle { from { transform: rotate(-7deg); } to { transform: rotate(7deg); } }
.es-thing.is-walk .e025-wheel { animation: e025Spin .7s linear infinite; }
.es-thing.is-walk .e025-crank { animation: e025Spin 1.1s linear infinite; }
@keyframes e025Spin { to { transform: rotate(360deg); } }
.e025-cowhead { transition: transform .5s cubic-bezier(.4,0,.2,1); }
.e025-tuft, .e025-chew { opacity: 0; }
.es-thing.act-e025-no .e025-cowhead { animation: e025No .25s ease-in-out infinite alternate; }
@keyframes e025No { from { transform: rotate(-9deg); } to { transform: rotate(9deg); } }
.es-thing.act-e025-eat .e025-cowhead { transform: translate(6px, 24px) rotate(40deg); }
.e025-clump { transform-origin: 2142px 282px; transition: transform 1.8s ease-in; } .st-ate .e025-clump { transform: scaleY(.45); }
.es-thing.act-e025-eat .e025-tuft { opacity: 1; animation: e025Tuft 1.6s linear forwards; }
.es-thing.act-e025-eat .e025-chew { opacity: 1; animation: e025Chew .3s ease-in-out infinite alternate; }
@keyframes e025Tuft { to { transform: translate(-4px, -2px) scale(.2); opacity: 0; } }
@keyframes e025Chew { to { transform: translateY(2px); } }
.es-thing.act-e025-moo .e025-cow { animation: e025Moo .5s ease-in-out 2 alternate; transform-origin: 0 0; }
@keyframes e025Moo { to { transform: scale(1.06); } }
@media (prefers-reduced-motion: reduce) { .e025-peck .e025-henhead { animation-duration: 3s; } .es-thing.act-e025-no .e025-cowhead { animation-duration: .6s; } }
`;

function lb(st, k) { LB.forEach(([n]) => st.set(`st-lb-${n}`, n === k)); }
const NO = ['nocar', 'noshop', 'noduck', 'norice'];
function no(st, k) { NO.forEach((n) => st.set(`st-${n}`, n === k)); }

const BEATS = [
  { key: ['visit Grandma and Grandpa in Nam Dinh'], icon: '🏡', label: 'visit', async play(st) {
    st.look(260);
    await Promise.all([
      st.walk('minh', 400, { speed: 150, follow: false }),
      st.walk('lan', 450, { speed: 150, lead: 30 }),
    ]);
    lb(st, 'sun');
    st.pose('grandpa', 'wave'); st.act('grandpa', 'wave'); st.pose('grandma', 'open'); st.mood('grandma', 'joy');
    st.mood('minh', 'joy'); st.mood('lan', 'joy');
    st.fx('hearts', 500, 130);
    await st.wait(1300);
    st.act('grandpa', null); st.pose('grandpa', 'stand'); st.pose('grandma', 'stand');
    st.mood('minh', 'happy'); st.mood('lan', 'happy'); st.mood('grandma', 'happy');
  } },
  { key: ['ducks, chickens and a cow'], icon: '🐄', label: 'big farm', async play(st) {
    lb(st, null);
    st.pose('grandpa', 'point');
    await st.look(1240, { dur: 900 });
    lb(st, 'ducks');
    await st.wait(400);
    await st.look(880, { dur: 700 });
    lb(st, 'chickens');
    await st.wait(500);
    await st.look(2010, { dur: 1100 });
    lb(st, 'cow'); st.say('cow', 'Moo!', 1000);
    await st.wait(900);
    lb(st, null);
    await st.look(470, { dur: 1100 });
    st.pose('grandpa', 'stand');
  } },
  { key: ['different from life in Hanoi'], icon: '🏙️', label: 'different', async play(st) {
    st.look(470);
    st.set('st-think'); st.pose('lan', 'think'); st.mood('minh', 'wow');
    await st.wait(2400);
    st.pose('lan', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ["doesn't drive a car"], icon: '🚗', label: 'no car', async play(st) {
    st.look(540);
    st.set('st-think', false);
    no(st, 'nocar'); st.act('grandpa', 'no');
    await st.wait(1800);
    st.act('grandpa', null);
  } },
  { key: ['rides an old bike'], icon: '🚲', label: 'old bike', async play(st) {
    st.look(640);
    no(st, null);
    st.show('grandpa', false); st.show('bikeP', false); st.show('bike', true);
    lb(st, 'bike');
    await st.walk('bike', 1380, { speed: 200, lead: -60 });
    lb(st, null);
  } },
  { key: ["doesn't buy eggs at the shop"], icon: '🏪', label: 'no shop', async play(st) {
    await Promise.all([
      st.walk('grandma', 800, { speed: 150, lead: 20 }),
      (async () => { await st.wait(300); await st.walk('lan', 746, { speed: 150, follow: false }); })(),
      (async () => { await st.wait(500); await st.walk('minh', 696, { speed: 150, follow: false }); })(),
    ]);
    no(st, 'noshop'); st.act('grandma', 'no');
    await st.wait(1400);
    st.act('grandma', null);
  } },
  { key: ['come from her chickens'], icon: '🥚', label: 'eggs', async play(st) {
    st.look(820);
    no(st, null); lb(st, 'eggs');
    st.hold('grandma', 'e025_basket'); st.pose('grandma', 'give');
    await st.fly(EGG, [862, 264], [826, 196], { size: 14, dur: 600 });
    await st.fly(EGG, [902, 264], [826, 196], { size: 14, dur: 600 });
    st.mood('grandma', 'joy'); st.mood('lan', 'joy');
    await st.wait(500);
    st.pose('grandma', 'stand'); st.mood('grandma', 'happy'); st.mood('lan', 'happy');
  } },
  { key: ["ducks don't sleep in the house"], icon: '🏠', label: 'not in the house', async play(st) {
    lb(st, null); st.hold('grandma', null);
    st.look(1220);
    no(st, 'noduck');
    st.walk('minh', 1120, { speed: 170, follow: false });
    st.walk('lan', 1080, { speed: 170, follow: false });
    st.walk('grandma', 1040, { speed: 150, follow: false });
    await Promise.all([
      st.walk('duck1', 1290, { speed: 60, follow: false }),
      (async () => { await st.wait(300); await st.walk('duck2', 1256, { speed: 60, follow: false }); })(),
      (async () => { await st.wait(600); await st.walk('duck3', 1226, { speed: 60, follow: false }); })(),
    ]);
    await st.wait(300);
  } },
  { key: ['sleep near the pond'], icon: '🦆', label: 'near the pond', async play(st) {
    no(st, null);
    await Promise.all([
      st.walk('duck1', 1600, { speed: 110, lead: -40 }),
      st.walk('duck2', 1568, { speed: 110, follow: false }),
      st.walk('duck3', 1536, { speed: 110, follow: false }),
    ]);
    lb(st, 'pond');
    for (const d of ['duck1', 'duck2', 'duck3']) st.act(d, 'e025-sleep');
    st.fx('zzz', 1570, 230);
    await st.wait(1600);
  } },
  { key: ["cow doesn't eat rice"], icon: '🍚', label: 'no rice', async play(st) {
    lb(st, null);
    await Promise.all([
      st.walk('lan', 2226, { speed: 260, lead: -60 }),
      (async () => { await st.wait(200); await st.walk('minh', 2300, { speed: 260, follow: false }); })(),
      (async () => { await st.wait(400); await st.walk('grandma', 2360, { speed: 260, follow: false }); })(),
    ]);
    await st.walk('lan', 2220, { speed: 40, follow: false });
    st.hold('lan', 'e025_rice'); st.pose('lan', 'give');
    await st.wait(400);
    no(st, 'norice'); st.act('cow', 'e025-no');
    await st.wait(1500);
    st.act('cow', null); st.hold('lan', null); st.pose('lan', 'stand');
  } },
  { key: ['eats grass'], icon: '🌿', label: 'grass', async play(st) {
    st.look(2010);
    no(st, null); lb(st, 'grass');
    st.act('cow', 'e025-eat'); st.set('st-ate');
    await st.wait(2000);
    st.act('cow', null);
  } },
  { key: ["doesn't go near the big cow"], icon: '🙅', label: 'not near', async play(st) {
    st.look(2140); lb(st, null);
    await st.walk('minh', 2250, { speed: 90, follow: false });
    st.mood('minh', 'wow'); st.act('minh', 'shiver');
    await st.wait(500);
    st.act('minh', null);
    await st.walk('minh', 2310, { speed: 150, follow: false });
    st.walk('minh', 2304, { speed: 40, follow: false });
    await st.wait(400);
    st.act('minh', 'no');
    await st.wait(700);
    st.act('minh', null);
  } },
  { key: ['very big'], icon: '🐮', label: 'very big', async play(st) {
    st.look(2080);
    lb(st, 'big'); st.set('st-measure');
    st.act('cow', 'e025-moo');
    await st.say('cow', 'Moo!', 1200);
    st.pose('lan', 'pointUp'); st.mood('lan', 'wow');
    await st.wait(900);
    st.act('cow', null); st.pose('lan', 'stand'); st.mood('lan', 'happy'); st.mood('minh', 'happy');
  } },
  { key: ["doesn't watch TV on the farm"], icon: '📺', label: 'no TV', async play(st) {
    lb(st, null); st.set('st-measure', false);
    await Promise.all([
      st.walk('lan', 2424, { speed: 200, lead: 20 }),
      st.walk('grandma', 2520, { speed: 200, follow: false }),
    ]);
    st.set('st-tv'); st.act('lan', 'no');
    await st.wait(1500);
    st.act('lan', null);
  } },
  { key: ['helps Grandma in the garden'], icon: '🥬', label: 'helps Grandma', async play(st) {
    st.look(2460);
    st.set('st-tv', false);
    st.hold('lan', 'watering'); st.pose('lan', 'give');
    st.pose('grandma', 'dig'); st.act('grandma', 'dig');
    st.fx('drops', 2450, 262);
    await st.wait(700);
    st.set('st-grow'); st.fx('drops', 2450, 262);
    await st.wait(1300);
    st.act('grandma', null); st.pose('grandma', 'stand'); st.hold('lan', null); st.pose('lan', 'stand');
  } },
  { key: ['love the farm'], icon: '❤️', label: 'love the farm', async play(st) {
    await st.walk('minh', 2370, { speed: 200, lead: 90 });
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    st.pose('lan', 'cheer'); st.act('lan', 'jump'); st.mood('lan', 'joy');
    st.mood('grandma', 'joy');
    st.fx('hearts', 2390, 140);
    await st.wait(700);
    st.fx('hearts', 2500, 130);
    await st.wait(1200);
    st.act('minh', null); st.act('lan', null);
  } },
];

export default {
  id: 'en025', worldW: 2800, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg: () => '', beats: BEATS,
  props: { e025_basket: BASKET, e025_rice: RICE },
  cast: [
    { id: 'bikeP', kind: 'thing', x: 700, svg: BIKE(false), box: [-76, -100, 150, 102] },
    { id: 'bike', kind: 'thing', x: 700, svg: BIKE(true), box: [-76, -176, 150, 178] },
    { id: 'cow', kind: 'thing', x: 2010, svg: COW, box: [-124, -168, 290, 170] },
    { id: 'hen1', kind: 'thing', x: 862, svg: HEN('#fff'), box: [-28, -42, 52, 44] },
    { id: 'hen2', kind: 'thing', x: 902, svg: HEN('#C2410C'), box: [-28, -42, 52, 44], face: -1 },
    { id: 'hen3', kind: 'thing', x: 940, svg: HEN('#FDE68A'), box: [-28, -42, 52, 44] },
    { id: 'duck1', kind: 'thing', x: 1222, svg: DUCK, box: [-20, -32, 44, 34] },
    { id: 'duck2', kind: 'thing', x: 1204, svg: DUCK, box: [-20, -32, 44, 34] },
    { id: 'duck3', kind: 'thing', x: 1188, svg: DUCK, box: [-20, -32, 44, 34] },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: 530, s: 0.92, face: -1 },
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: 590, s: 0.9, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 30 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 80, s: 1.04 },
  ],
  init(st) {
    st.show('bike', false);
  },
};
