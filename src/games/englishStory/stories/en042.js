/**
 * Bài 42 "A Visit to Grandpa": trạm xe buýt ở Hà Nội (lịch SATURDAY + nhãn "last Saturday", bong bóng nghĩ ông bà) → xe buýt chở
 * bố, Minh, Lan chạy qua đồng lúa, biển NAM DINH → cổng nhà ông bà (ông đứng chờ) → vườn rau, giàn cà chua → nhà cắt ngang: bếp
 * (Lan nấu với bà) · phòng khách (cửa sổ thấy mưa, mâm chơi bài, sô-pha, đèn). Tối: ông cho Minh xem album ảnh cũ, ảnh bố hồi bé.
 * Thì quá khứ: lịch "last Saturday", ảnh cũ màu nâu vàng; nhớ Lucky = bong bóng nghĩ (Lucky ở nhà với mẹ).
 * Toạ độ cảnh: rộng 2760, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly, person } from '../../tiengViet3/cast.js';
import { dogSvg } from '../rig.js';
import { KIT_CSS, L, sky, cloud, tree, bush, flowerAt, sun, label, room, doorway, windowBox, shelf, rug, road, palm, steam, thought, night } from '../kit.js';

const FLOOR = 282;
const F = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  // bố hồi bé (ảnh cũ)
  e042_boydad: { hair: 'bowl', top: 'tee', shirt: '#FDE68A', bottom: 'shorts', bottomC: '#78716C', shoe: '#78716C' },
});

// ── Xe buýt (gốc = giữa hai bánh, chạm đất), chạy sang phải; khách trong cửa sổ hiện khi mood 'full' ─────
const BUS = `<g class="e042-busb">
  <rect x="-122" y="-112" width="244" height="92" rx="14" fill="#FACC15" stroke="${L}" stroke-width="1.4"/>
  <rect x="-122" y="-50" width="244" height="10" fill="#16A34A"/>
  ${[-106, -62, -18, 26].map((x) => `<rect x="${x}" y="-100" width="38" height="36" rx="4" fill="#BAE6FD" stroke="${L}" stroke-width="1"/>`).join('')}
  <g class="e042-pax">
    <g transform="translate(-43 -76)">${headOnly('en_dad_home', { s: 0.72 })}</g>
    <g transform="translate(1 -78)">${headOnly('en_lan_home', { s: 0.62, mood: 'joy' })}</g>
    <g transform="translate(45 -78)">${headOnly('en_minh_home', { s: 0.6, mood: 'joy' })}</g>
  </g>
  ${[-106, -62, -18, 26].map((x) => `<path d="M${x + 4} -96 L${x + 14} -96 L${x + 4} -84Z" fill="#fff" opacity="0.6"/>`).join('')}
  <rect x="76" y="-100" width="30" height="74" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="1"/><path d="M91 -100 V-26" stroke="${L}" stroke-width="0.9"/>
  <rect x="110" y="-60" width="12" height="10" rx="3" fill="#FEF9C3" stroke="${L}" stroke-width="0.8"/>
  <rect x="-122" y="-60" width="8" height="10" rx="2" fill="#F87171" stroke="${L}" stroke-width="0.8"/>
  <g class="es-unflip"><rect x="-58" y="-128" width="116" height="18" rx="5" fill="#fff" stroke="${L}"/><text x="0" y="-114" text-anchor="middle" ${F} font-size="12" fill="#15803D">NAM DINH</text></g>
</g>
${[-72, 72].map((x) => `<g transform="translate(${x} -18)"><g class="e042-wheel"><circle r="17" fill="#1F2937" stroke="${L}"/><circle r="7" fill="#CBD5E1"/><path d="M-7 0 H7 M0 -7 V7" stroke="#64748B" stroke-width="1.8"/></g></g>`).join('')}`;

// ── Đồ cầm / đồ vật ─────────────────────────────────────────────────────────
const TOMATO = `<circle r="6" fill="#EF4444" stroke="${L}" stroke-width="0.8"/><path d="M-3 -5 l3 2 l3 -2" stroke="#16A34A" stroke-width="1.6" fill="none"/>`;
const CARD = (c = '#fff') => `<rect x="-6" y="-8" width="12" height="16" rx="2" fill="${c}" stroke="${L}" stroke-width="0.8"/><path d="M0 -4 l3 4 l-3 4 l-3 -4Z" fill="#EF4444"/>`;
const PROPS = {
  // cuốc của ông (cầm hai tay, lưỡi chúi xuống đất)
  e042_hoe: `<g transform="rotate(-10)"><path d="M0 -24 V62" stroke="#92400E" stroke-width="3" stroke-linecap="round"/><path d="M-2 58 L16 62 L14 72 L-2 66Z" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/></g>`,
  e042_cards: `<g transform="rotate(180) translate(0 6)">${[-24, -8, 8, 24].map((r) => `<g transform="rotate(${r}) translate(0 -6)">${CARD(r > 0 ? '#FEF9C3' : '#fff')}</g>`).join('')}</g>`,
  e042_basket: `<g transform="translate(0 10)"><path d="M-12 -4 H12 L9 10 H-9Z" fill="#D97706" stroke="${L}" stroke-width="0.9"/><path d="M-12 -4 Q0 -18 12 -4" stroke="#92400E" stroke-width="1.6" fill="none"/>
    <g class="e042-inbasket"><circle cx="-5" cy="-5" r="4.4" fill="#EF4444" stroke="${L}" stroke-width="0.6"/><circle cx="4" cy="-6" r="4.4" fill="#EF4444" stroke="${L}" stroke-width="0.6"/></g></g>`,
  // bình tưới cầm ngang (tư thế e042_water: cẳng tay chỉ ra trước)
  e042_can: `<g transform="rotate(90)"><path d="M-4 2 Q0 -6 6 2" stroke="${L}" stroke-width="1.4" fill="none"/><rect x="-8" y="2" width="18" height="16" rx="3" fill="#22C55E" stroke="${L}" stroke-width="0.9"/>
    <path d="M9 12 L22 22" stroke="${L}" stroke-width="4" stroke-linecap="round"/><path d="M9 12 L22 22" stroke="#22C55E" stroke-width="2.6" stroke-linecap="round"/></g>`,
  e042_bag: `<g transform="translate(0 12)"><rect x="-10" y="-6" width="20" height="18" rx="4" fill="#2563EB" stroke="${L}" stroke-width="0.9"/><path d="M-5 -6 Q0 -14 5 -6" stroke="${L}" stroke-width="1.4" fill="none"/></g>`,
};
/** Album ảnh mở (trước ngực ông). */
const ALBUM = `<g transform="translate(0 6)"><rect x="-30" y="-16" width="60" height="34" rx="2" fill="#7C2D12" stroke="${L}" stroke-width="1"/>
  <rect x="-28" y="-14" width="27" height="30" fill="#FEF3C7" stroke="${L}" stroke-width="0.6"/><rect x="1" y="-14" width="27" height="30" fill="#FEF3C7" stroke="${L}" stroke-width="0.6"/>
  ${[[-25, -11], [-25, 2], [4, -11], [4, 2]].map(([x, y]) => `<rect x="${x}" y="${y}" width="21" height="11" fill="#D6C3A0" stroke="#A16207" stroke-width="0.6"/>`).join('')}</g>`;
const POSES = {
  e042_hoe: { R: [40, -30], L: [30, -50], head: 8 },
  e042_water: { R: [70, 92], L: [10, 4], head: 6 },
  e042_cards: { R: [40, -60], L: [40, -70], dy: 30, head: 6 },
  e042_floor: { R: [30, -40], L: [30, -40], dy: 30 },
  e042_shy: { R: [140, 266], L: [140, 266], dy: 20, head: 10 },
  e042_hug: { R: [50, 30], L: [10, 4] },
  e042_album: { R: [30, -80], L: [30, -80], head: 6 },
  e042_sitPoint: { R: [84, 92], L: [40, 110], dy: 20 },
  e042_look: { R: [10, 4], L: [10, 4], head: 10 },
  e042_sitRead: { R: [30, 196], L: [30, 196], dy: 20, head: 4 },
};

/** Mưa: các vạch xiên rơi trong khung (x0..x1, y0..y1). */
const rain = (x0, x1, y0, y1, n) => Array.from({ length: n }, (_, i) => {
  const x = x0 + ((i * 37) % (x1 - x0)), y = y0 + ((i * 53) % (y1 - y0));
  return `<path d="M${x} ${y} l-3 10" style="animation-delay:${(-(i % 7) * 0.11).toFixed(2)}s"/>`;
}).join('');

const LBS = ['last', 'home', 'bus', 'gate', 'morning', 'veg', 'tom', 'lunch', 'rain', 'cards', 'miss', 'photos', 'dad', 'longer'];
const lb = (name, inner) => `<g class="e042-lb e042-${name}">${inner}</g>`;

function bg() {
  const GP = headOnly('en_grandpa', { s: 0.9, mood: 'joy' }), GM = headOnly('en_grandma', { s: 0.9, mood: 'joy' });
  const homeMini = `<path d="M-20 18 V-2 L0 -16 L20 -2 V18Z" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/><path d="M-24 0 L0 -20 L24 0" stroke="#DC2626" stroke-width="3" fill="none" stroke-linejoin="round"/>`;
  return `
  ${sky(0, 2900, 315, 'e042sky')}
  <rect class="e042-grey" x="0" y="0" width="2900" height="${FLOOR}" fill="#64748B"/>
  ${cloud(160, 50, 0.8, 0)}${cloud(700, 64, 1, 2)}${cloud(1180, 48, 0.8, 1)}${cloud(1700, 58, 0.9, 3)}
  <!-- Mặt trời buổi sáng ở quê (mọc lên sau đồi) -->
  <g transform="translate(1800 72)"><g class="e042-sunup">${sun(22)}</g></g>
  <!-- Phố Hà Nội -->
  ${[[20, 90, '#FCA5A5'], [116, 130, '#FDE68A'], [250, 110, '#A5B4FC'], [364, 150, '#86EFAC'], [520, 100, '#FDBA74']].map(([x, h, c], i) => `<rect x="${x}" y="${FLOOR - 10 - h - 40}" width="${i % 2 ? 90 : 80}" height="${h + 40}" fill="${c}" stroke="${L}" stroke-width="1.2"/>
    ${Array.from({ length: Math.floor((h + 20) / 34) }, (_, r) => `<rect x="${x + 12}" y="${FLOOR - h - 40 + r * 34}" width="20" height="18" fill="#E0F2FE" stroke="${L}" stroke-width="0.7"/><rect x="${x + 46}" y="${FLOOR - h - 40 + r * 34}" width="20" height="18" fill="#E0F2FE" stroke="${L}" stroke-width="0.7"/>`).join('')}`).join('')}
  <!-- Lịch thứ Bảy -->
  <g transform="translate(110 92)"><rect x="-44" y="-10" width="88" height="80" rx="6" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="-44" y="-10" width="88" height="20" rx="6" fill="#EF4444" stroke="${L}" stroke-width="1.4"/>
    <circle cx="-24" cy="-10" r="3.2" fill="#1F2937"/><circle cx="24" cy="-10" r="3.2" fill="#1F2937"/>
    <text x="0" y="36" text-anchor="middle" ${F} font-size="14" fill="#DC2626">SATURDAY</text><text x="0" y="62" text-anchor="middle" ${F} font-size="20" fill="#1F2937">10</text>
    <g class="e042-circ"><ellipse cx="0" cy="44" rx="40" ry="26" fill="none" stroke="#F97316" stroke-width="3"/></g></g>
  ${lb('last', `${label(110, 64, 'last Saturday', '#B45309', 15)}`)}
  <!-- trạm xe buýt -->
  <g transform="translate(470 0)"><path d="M0 ${FLOOR - 8} V150" stroke="#475569" stroke-width="4"/><rect x="-22" y="128" width="44" height="28" rx="5" fill="#2563EB" stroke="${L}" stroke-width="1.2"/>
    <text x="0" y="148" text-anchor="middle" ${F} font-size="14" fill="#fff">BUS</text></g>
  ${thought(330, 96, 150, 72, `<g transform="translate(-42 4)">${GP}</g><g transform="translate(42 4)">${GM}</g><g transform="translate(0 8) scale(0.9)">${homeMini}</g>`, [320, 158], 'e042-bub e042-bub0')}
  ${lb('home', label(330, 52, 'Nam Dinh', '#15803D', 15))}
  <!-- Đồng quê: đồng lúa, tre, biển Nam Định -->
  <path d="M620 238 Q800 214 1000 232 T1460 226 V282 H620Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${Array.from({ length: 16 }, (_, i) => `<path d="M${640 + i * 52} 262 l6 -14 l6 14" stroke="#16A34A" stroke-width="1.6" fill="none"/>`).join('')}
  <rect x="620" y="250" width="840" height="24" fill="#86EFAC" opacity="0.7"/>
  ${palm(760, 252, 0.8)}${tree(950, 248, 0.75, '')}${palm(1110, 250, 0.7)}
  <g transform="translate(1210 0)"><path d="M0 ${FLOOR - 8} V170" stroke="#475569" stroke-width="4"/><rect x="-50" y="140" width="100" height="34" rx="5" fill="#16A34A" stroke="${L}" stroke-width="1.2"/>
    <text x="-6" y="163" text-anchor="middle" ${F} font-size="14" fill="#fff">NAM DINH</text><path d="M36 150 l8 7 l-8 7" stroke="#fff" stroke-width="2.4" fill="none"/></g>
  ${road(0, 1470, FLOOR)}
  ${lb('bus', label(900, 110, 'by bus', '#1D4ED8', 16))}
  <!-- Cổng nhà ông bà -->
  <path d="M1460 226 Q1700 200 1960 222 V282 H1460Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <rect x="1460" y="${FLOOR - 6}" width="500" height="40" fill="#A3E635" stroke="${L}"/>
  ${Array.from({ length: 10 }, (_, i) => `<path d="M${1480 + i * 48} ${FLOOR + 12} l3 -7 l3 7" stroke="#16A34A" stroke-width="1.4" fill="none"/>`).join('')}
  ${[1470, 1546].map((x) => `<rect x="${x - 9}" y="140" width="18" height="${FLOOR - 140}" fill="#F87171" stroke="${L}" stroke-width="1.2"/><rect x="${x - 12}" y="132" width="24" height="10" rx="2" fill="#B91C1C" stroke="${L}"/>
    ${[160, 190, 220, 250].map((y) => `<path d="M${x - 9} ${y} H${x + 9}" stroke="#B91C1C" stroke-width="0.8"/>`).join('')}`).join('')}
  <path d="M1458 132 Q1508 104 1558 132" stroke="#B91C1C" stroke-width="5" fill="none"/>
  ${lb('gate', label(1508, 92, 'at the gate', '#B45309', 14))}
  <!-- Vườn: luống rau, giàn cà chua -->
  ${lb('morning', label(1800, 130, 'morning', '#B45309', 14))}
  <rect x="1590" y="${FLOOR - 12}" width="150" height="14" rx="6" fill="#92400E" stroke="${L}"/>
  ${[1604, 1636, 1668, 1700, 1726].map((x, i) => `<g transform="translate(${x} ${FLOOR - 10})"><g class="e042-veg">${i % 2
    ? `<circle cx="0" cy="-10" r="10" fill="#86EFAC" stroke="${L}" stroke-width="0.9"/><path d="M-6 -10 Q0 -4 6 -10 M0 -18 V-4" stroke="#16A34A" stroke-width="1" fill="none"/>`
    : `<path d="M0 0 l-6 -18 M0 0 l0 -22 M0 0 l6 -18" stroke="#16A34A" stroke-width="3.4" stroke-linecap="round"/>`}</g></g>`).join('')}
  ${lb('veg', label(1666, 196, 'vegetables', '#15803D', 13))}
  ${[1830, 1880].map((x, k) => `<g transform="translate(${x} 0)"><path d="M0 ${FLOOR} V176 M-14 ${FLOOR} L0 176 L14 ${FLOOR}" stroke="#A16207" stroke-width="2.4" fill="none"/>
    <path d="M0 270 q-14 -10 -6 -24 q12 -8 6 -24 q-10 -12 0 -26 q10 -8 4 -20" stroke="#16A34A" stroke-width="3" fill="none"/>
    ${[[-10, 230], [9, 212], [-8, 196]].map(([dx, y], i) => `<g class="e042-tm e042-tm${k * 3 + i}"><g transform="translate(${dx} ${y})">${TOMATO}</g></g>`).join('')}</g>`).join('')}
  ${lb('tom', label(1830, 140, 'tomatoes', '#DC2626', 14))}
  <!-- Bếp -->
  ${room(1960, 290, FLOOR, '#FFEDD5', '#C08B5C')}
  ${doorway(1960, FLOOR)}
  ${windowBox(1990, 70, 70, 60)}
  <rect x="2060" y="200" width="150" height="${FLOOR - 200}" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/><rect x="2054" y="194" width="162" height="8" rx="2" fill="#E5E7EB" stroke="${L}"/>
  ${[2076, 2140].map((x) => `<rect x="${x}" y="212" width="54" height="60" rx="3" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/><circle cx="${x + 27}" cy="224" r="2" fill="${L}"/>`).join('')}
  <g transform="translate(2100 194)"><rect x="-24" y="-6" width="48" height="6" rx="2" fill="#475569" stroke="${L}" stroke-width="0.8"/>
    <path d="M-17 -6 V-26 H17 V-6Z" fill="#94A3B8" stroke="${L}" stroke-width="1"/><path d="M-17 -26 H17" stroke="${L}" stroke-width="2"/><path d="M-22 -22 H-17 M17 -22 H22" stroke="${L}" stroke-width="2.4"/></g>
  <g class="e042-steam">${steam(2100, 162)}</g>
  ${shelf(2150, 120, 80, `<g transform="translate(2170 112)">${[0, 1, 2].map((i) => `<rect x="${i * 16 - 6}" y="-14" width="12" height="14" rx="2" fill="${['#F87171', '#FBBF24', '#60A5FA'][i]}" stroke="${L}" stroke-width="0.7"/>`).join('')}</g>`)}
  ${lb('lunch', label(2110, 92, 'lunch', '#C2410C', 15))}
  ${doorway(2250, FLOOR)}
  <!-- Phòng khách -->
  ${room(2262, 638, FLOOR, '#FEF3C7')}
  <g transform="translate(2290 64)"><rect x="-6" y="-6" width="102" height="92" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/>
    <rect x="0" y="0" width="90" height="80" fill="#BAE6FD"/><rect class="e042-wgrey" x="0" y="0" width="90" height="80" fill="#64748B"/>
    <path d="M0 62 Q40 50 90 58 V80 H0Z" fill="#86EFAC"/>
    <g class="e042-rain e042-wrain" stroke="#E0F2FE" stroke-width="1.4" stroke-linecap="round">${rain(4, 88, 0, 60, 14)}</g>
    <path d="M45 0 V80 M0 40 H90" stroke="#fff" stroke-width="3" opacity="0.85"/></g>
  ${lb('rain', label(2335, 176, 'it rained', '#475569', 14))}
  <!-- ảnh gia đình + đèn -->
  <g transform="translate(2480 70)"><rect x="-22" y="-16" width="44" height="34" fill="#fff" stroke="${L}" stroke-width="1.2"/>${person(-8, 16, 'en_grandpa', 'stand', { s: 0.17 })}${person(8, 16, 'en_grandma', 'stand', { s: 0.17 })}</g>
  <g transform="translate(2620 0)"><path d="M0 12 V58" stroke="#78716C" stroke-width="2"/><path d="M-22 80 L-10 58 H10 L22 80Z" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/>
    <circle cx="0" cy="82" r="4" fill="#FEF9C3" stroke="${L}" stroke-width="0.8"/></g>
  ${rug(2400, FLOOR, 170, '#FCA5A5')}
  <!-- sô-pha -->
  <g transform="translate(2760 0)"><rect x="-74" y="200" width="148" height="44" rx="12" fill="#A78BFA" stroke="${L}" stroke-width="1.2"/>
    <rect x="-66" y="234" width="132" height="16" rx="6" fill="#C4B5FD" stroke="${L}"/></g>
  ${lb('cards', label(2400, 150, 'played cards', '#7C3AED', 14))}
  ${thought(2410, 100, 160, 76, `<g transform="translate(-50 16) scale(0.85)">${homeMini}</g>${person(-6, 32, 'en_mum_home', 'stand', { s: 0.34 })}<g transform="translate(36 32) scale(0.5)">${dogSvg()}</g>`, [2356, 186], 'e042-bub e042-bubMiss')}
  ${lb('miss', label(2410, 52, 'Minh missed Lucky', '#DB2777', 13))}`;
}

function fg() {
  return `
  <!-- mưa ngoài vườn -->
  <g class="e042-rain e042-orain" stroke="#E0F2FE" stroke-width="1.6" stroke-linecap="round">${rain(1460, 1955, 40, 276, 60)}</g>
  ${bush(1570, FLOOR + 10, 0.9, '#4ADE80')}${flowerAt(1760, FLOOR + 4)}${flowerAt(1772, FLOOR + 6, '#FACC15')}
  <!-- rổ cà chua dưới giàn -->
  <g transform="translate(1856 ${FLOOR})"><path d="M-20 -22 H20 L15 0 H-15Z" fill="#D97706" stroke="${L}" stroke-width="1.1"/><path d="M-20 -22 H20" stroke="#92400E" stroke-width="2.4"/>
    <g class="e042-basketT">${[[-9, -24], [0, -27], [9, -24], [-4, -30], [5, -31], [0, -35]].map(([x, y], i) => `<g class="e042-bt e042-bt${i}"><g transform="translate(${x} ${y})">${TOMATO}</g></g>`).join('')}</g></g>
  <!-- mâm thấp chơi bài -->
  <g transform="translate(2400 0)"><rect x="-56" y="250" width="112" height="9" rx="4" fill="#B45309" stroke="${L}" stroke-width="1.2"/><path d="M-40 259 V${FLOOR} M40 259 V${FLOOR}" stroke="#92400E" stroke-width="5"/>
    <g class="e042-tcards">${[-18, -4, 10].map((x, i) => `<g transform="translate(${x} 246) rotate(${i * 20 - 20}) scale(0.9)">${CARD(i % 2 ? '#FEF9C3' : '#fff')}</g>`).join('')}</g></g>
  <!-- mặt trước sô-pha -->
  <g transform="translate(2760 0)"><rect x="-80" y="240" width="160" height="34" rx="10" fill="#8B5CF6" stroke="${L}" stroke-width="1.2"/>
    <rect x="-86" y="214" width="18" height="60" rx="8" fill="#A78BFA" stroke="${L}"/><rect x="68" y="214" width="18" height="60" rx="8" fill="#A78BFA" stroke="${L}"/></g>
  ${night(1460, 1440, 315, 1820)}
  <g class="e042-glow"><circle cx="2620" cy="96" r="76" fill="#FEF08A" opacity="0.16"/><circle cx="2620" cy="90" r="36" fill="#FEF9C3" opacity="0.22"/></g>
  <!-- (trên lớp đêm cho rõ) ảnh cũ: bố hồi bé, đội nồi trên đầu -->
  <g class="e042-photo"><g transform="translate(2370 46)">
    <rect x="-62" y="0" width="124" height="104" rx="4" fill="#FEF3C7" stroke="${L}" stroke-width="1.6"/>
    <rect x="-54" y="8" width="108" height="78" fill="#E7D3AE" stroke="#A16207" stroke-width="1"/>
    <path d="M-54 70 Q0 60 54 68 V86 H-54Z" fill="#C8B48A"/>
    ${person(0, 84, 'e042_boydad', 'cheer', { s: 0.5, mood: 'joy' })}
    <g transform="translate(0 30)"><path d="M-17 4 Q-16 -10 0 -11 Q16 -10 17 4Z" fill="#94A3B8" stroke="${L}" stroke-width="1"/><path d="M-21 4 H21" stroke="${L}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M-17 -4 h-6 M17 -4 h6" stroke="${L}" stroke-width="2.4" stroke-linecap="round"/></g>
    <text x="0" y="99" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="9" fill="#92400E">Dad, 1985</text></g></g>
  ${lb('photos', label(2370, 64, 'old photos', '#92400E', 14))}
  ${lb('dad', label(2730, 112, 'Dad!', '#DC2626', 16))}
  ${lb('longer', label(2470, 64, 'stay longer!', '#DB2777', 16))}`;
}

const CSS = `
.e042-lb { opacity: 0; transition: opacity .35s; }
${LBS.map((n) => `.st-${n} .e042-${n}`).join(', ')} { opacity: 1; }
.e042-bub { opacity: 0; transition: opacity .4s; } .st-th0 .e042-bub0, .st-miss .e042-bubMiss { opacity: 1; }
.e042-circ { opacity: 0; transition: opacity .3s; } .st-last .e042-circ { opacity: 1; }
.e042-pax { opacity: 0; transition: opacity .3s; } .es-ac.m-full .e042-pax { opacity: 1; }
.es-thing.is-walk .e042-wheel { animation: e042Spin .4s linear infinite; }
.es-thing.is-walk .e042-busb { animation: e042Bump .2s ease-in-out infinite alternate; }
@keyframes e042Spin { to { transform: rotate(360deg); } }
@keyframes e042Bump { to { transform: translateY(-1.6px); } }
.e042-sunup { transform: translateY(70px); transition: transform 1.6s cubic-bezier(.3,0,.3,1); } .st-sun .e042-sunup { transform: translateY(0); }
.e042-veg { transform: scale(.6); transition: transform 1.2s cubic-bezier(.3,1.4,.6,1); } .st-grow .e042-veg { transform: scale(1.1); }
.e042-tm { transition: opacity .25s; }
${[0, 1, 2, 3, 4, 5].map((i) => `.st-pick .e042-tm${i} { opacity: 0; transition-delay: ${(i * 0.22).toFixed(2)}s; }`).join('\n')}
.e042-bt { opacity: 0; transition: opacity .25s; }
${[0, 1, 2, 3, 4, 5].map((i) => `.st-pick .e042-bt${i} { opacity: 1; transition-delay: ${(0.3 + i * 0.22).toFixed(2)}s; }`).join('\n')}
.e042-steam { opacity: 0; transition: opacity .4s; } .st-cook .e042-steam { opacity: 1; }
.e042-grey, .e042-wgrey { opacity: 0; transition: opacity .8s; } .st-rain .e042-grey { opacity: .35; } .st-rain .e042-wgrey { opacity: .6; }
.e042-rain { opacity: 0; transition: opacity .6s; } .st-rain .e042-rain { opacity: 1; }
.e042-rain path { animation: e042Rain .5s linear infinite; }
@keyframes e042Rain { from { transform: translate(0, -20px); opacity: 0; } 20% { opacity: 1; } to { transform: translate(-6px, 30px); opacity: .8; } }
.e042-tcards { opacity: 0; transition: opacity .3s .6s; } .st-cards .e042-tcards { opacity: 1; }
.st-night .ek-night { opacity: 1; }
.e042-glow { opacity: 0; transition: opacity .8s; } .st-night .e042-glow { opacity: 1; }
.e042-photo { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: center; transition: opacity .3s, transform .6s cubic-bezier(.3,1.5,.6,1); }
.st-photo .e042-photo { opacity: 1; transform: scale(1); }
@media (prefers-reduced-motion: reduce) { .e042-rain path { animation-duration: 1.4s; } }
`;

const BEATS = [
  { key: ['Last Saturday', 'visited Grandpa and Grandma'], icon: '📅', label: 'Last Saturday', async play(st) {
    st.look(240);
    st.set('st-last'); st.sfx('page-turn');
    await st.wait(1000);
    st.set('st-th0'); st.set('st-home'); st.sfx('sparkle', { vol: 0.5 });
    st.mood('minh', 'joy'); st.mood('lan', 'joy');
    st.pose('minh', 'cheer'); st.act('minh', 'hop');
    await st.wait(1600);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['by bus with Dad'], icon: '🚌', label: 'by bus', async play(st) {
    st.set('st-last', false); st.set('st-th0', false); st.set('st-home', false);
    st.mood('minh', 'happy'); st.mood('lan', 'happy');
    st.show('bus', true);
    await st.walk('bus', 380, { speed: 280, follow: false });
    st.sfx('door-open', { vol: 0.5 });
    st.show('dad', false); st.show('lan', false); st.show('minh', false);
    st.mood('bus', 'full');
    await st.wait(300);
    st.set('st-bus');
    await st.loop('car-go', () => st.walk('bus', 1350, { speed: 300, lead: 40 }), { vol: 0.6 });
    st.set('st-bus', false);
    st.place('dad', 1300, null, 1); st.place('lan', 1350, null, 1); st.place('minh', 1400, null, 1);
    await st.wait(200);
  } },
  { key: ['waited for them at the gate', 'smiled'], icon: '👴', label: 'at the gate', async play(st) {
    st.look(1440);
    // xuống xe: xe chạy đi, ba bố con hiện ra ở vỉa hè
    st.mood('bus', 'happy');
    st.show('dad', true); st.show('lan', true); st.show('minh', true);
    st.sfx('car-go', { vol: 0.5 }); st.walk('bus', 1000, { speed: 320, follow: false }).then(() => st.show('bus', false));
    st.set('st-gate');
    st.pose('grandpa', 'e042_look');
    await st.wait(700);
    st.mood('grandpa', 'joy'); st.pose('grandpa', 'wave'); st.act('grandpa', 'wave');
    await Promise.all([st.walk('minh', 1452, { speed: 200, follow: false }), st.walk('lan', 1420, { speed: 180, follow: false })]);
    st.mood('minh', 'joy'); st.mood('lan', 'joy');
    st.pose('minh', 'e042_hug'); st.pose('lan', 'wave'); st.act('lan', 'wave');
    st.fx('hearts', 1480, 120);
    await st.wait(1300);
    st.act('grandpa', null); st.act('lan', null); st.pose('grandpa', 'stand'); st.pose('lan', 'stand'); st.pose('minh', 'stand');
  } },
  { key: ['In the morning', 'helped Grandpa in the garden'], icon: '🌱', label: 'in the garden', async play(st) {
    st.set('st-gate', false);
    // Lan và bố vào nhà (bếp, phòng khách)
    st.walk('lan', 2140, { speed: 190, follow: false });
    st.walk('dad', 2730, { speed: 240, follow: false }).then(() => { st.pose('dad', 'e042_sitRead'); st.chest('dad', 'book'); });
    st.set('st-sun'); st.set('st-morning'); st.sfx('birds', { vol: 0.6 });
    await Promise.all([st.walk('grandpa', 1610, { speed: 120, follow: false }), st.walk('minh', 1690, { speed: 130, follow: false }), st.look(1680, { dur: 1600 })]);
    st.face('grandpa', 1);
    st.hold('grandpa', 'e042_hoe'); st.pose('grandpa', 'e042_hoe'); st.act('grandpa', 'dig');
    st.pose('minh', 'plant'); st.act('minh', 'dig'); st.mood('minh', 'joy');
    st.sfx('dig', { vol: 0.5 });
    await st.wait(800); st.sfx('dig', { vol: 0.5, rate: 0.9 });
    await st.wait(800);
    st.act('grandpa', null); st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['watered the vegetables', 'picked some tomatoes'], icon: '🍅', label: 'tomatoes', async play(st) {
    st.set('st-morning', false);
    st.face('minh', -1);
    st.hold('minh', 'e042_can'); st.pose('minh', 'e042_water');
    st.set('st-veg');
    await st.wait(300);
    st.fx('drops', 1650, 238); st.sfx('tap-water', { vol: 0.5 });
    st.set('st-grow');
    await st.wait(700);
    st.fx('drops', 1630, 238);
    await st.wait(500);
    st.set('st-veg', false);
    st.hold('minh', null); st.hold('grandpa', null); st.pose('grandpa', 'stand');
    await Promise.all([st.walk('minh', 1800, { speed: 160, follow: false }), st.walk('grandpa', 1916, { speed: 150, follow: false }), st.look(1820, { dur: 900 })]);
    st.face('grandpa', -1);
    st.pose('minh', 'reach'); st.pose('grandpa', 'reach');
    st.set('st-pick'); st.set('st-tom'); 
    st.sfx('pop', { vol: 0.7 }); st.fly(TOMATO, [1822, 230], [1850, 252], { size: 14, dur: 500 });
    await st.wait(600);
    st.sfx('pop', { vol: 0.7, rate: 1.15 }); st.fly(TOMATO, [1888, 212], [1860, 252], { size: 14, dur: 500 });
    await st.wait(700);
    st.mood('minh', 'joy'); st.mood('grandpa', 'joy');
    st.pose('minh', 'stand'); st.pose('grandpa', 'stand');
  } },
  { key: ['Lan cooked lunch with Grandma'], icon: '🍳', label: 'cooked lunch', async play(st) {
    st.set('st-tom', false);
    await st.look(2110, { dur: 1000 });
    st.set('st-cook'); st.set('st-lunch'); st.sfx('pot-stir');
    st.face('lan', -1); st.hold('lan', 'spoon'); st.pose('lan', 'stir'); st.act('lan', 'stir'); st.mood('lan', 'joy');
    st.pose('grandma', 'point'); st.mood('grandma', 'joy');
    await st.wait(900);
    st.sfx('sizzle', { vol: 0.5 });
    await st.wait(1100);
    st.act('lan', null);
  } },
  { key: ['it rained', 'played cards inside'], icon: '🃏', label: 'played cards', async play(st) {
    st.set('st-lunch', false); st.set('st-cook', false);
    st.hold('lan', null); st.pose('lan', 'stand'); st.pose('grandma', 'stand');
    st.set('st-rain'); st.sfx('rain', { vol: 0.6 });
    await st.look(1880, { dur: 600 });
    st.mood('minh', 'wow');
    await Promise.all([
      st.walk('minh', 2360, { speed: 260, lead: 40 }),
      st.walk('grandpa', 2540, { speed: 220, follow: false }),
      st.walk('lan', 2440, { speed: 200, follow: false }),
    ]);
    st.face('lan', -1); st.face('grandpa', -1);
    st.walk('grandma', 2800, { speed: 220, follow: false }).then(() => { st.face('grandma', -1); st.pose('grandma', 'sit'); });
    st.set('st-cards');
    st.mood('minh', 'joy'); st.mood('lan', 'joy');
    st.hold('minh', 'e042_cards'); st.pose('minh', 'e042_cards');
    st.hold('lan', 'e042_cards'); st.pose('lan', 'e042_cards');
    st.pose('grandpa', 'clap'); st.act('grandpa', 'clap'); st.sfx('clap', { vol: 0.6 });
    await st.wait(1300);
    st.act('grandpa', null); st.pose('grandpa', 'stand');
  } },
  { key: ['Lucky stayed at home with Mum', 'Minh missed him'], icon: '🐶', label: 'missed Lucky', async play(st) {
    st.set('st-cards', false);
    st.look(2440);
    st.mood('minh', 'sad'); st.pose('minh', 'e042_floor'); st.hold('minh', null);
    await st.wait(300);
    st.set('st-miss'); st.sfx('dog-bark', { vol: 0.4 });
    await st.wait(2000);
  } },
  { key: ['In the evening', 'his old photos'], icon: '📷', label: 'old photos', async play(st) {
    st.set('st-miss', false);
    st.set('st-night'); st.set('st-rain', false);
    await st.wait(600);
    st.mood('minh', 'happy');
    st.hold('lan', null); st.pose('lan', 'e042_floor');
    st.chest('grandpa', ALBUM); st.pose('grandpa', 'e042_album');
    await st.walk('minh', 2475, { speed: 120, follow: false });
    st.pose('minh', 'e042_look');
    st.set('st-photos'); st.sfx('page-turn');
    await st.wait(1600);
  } },
  { key: ['laughed at a funny photo of Dad'], icon: '😂', label: 'funny photo', async play(st) {
    st.set('st-photos', false);
    st.look(2470);
    st.set('st-photo'); st.sfx('camera', { vol: 0.6 });
    await st.wait(600);
    st.set('st-dad');
    st.mood('minh', 'joy'); st.pose('minh', 'cheer'); st.act('minh', 'hop'); st.sfx('giggle', { vol: 0.8 });
    st.mood('lan', 'joy');
    st.chest('dad', null); st.pose('dad', 'e042_shy'); st.mood('dad', 'shut');
    await st.wait(1800);
    st.act('minh', null);
  } },
  { key: ['loved the visit', 'wanted to stay longer'], icon: '❤️', label: 'stay longer', async play(st) {
    st.set('st-photo', false); st.set('st-dad', false);
    st.chest('grandpa', null); st.pose('grandpa', 'stand');
    st.pose('dad', 'stand'); st.mood('dad', 'happy');
    st.pose('lan', 'stand');
    st.look(2600);
    await Promise.all([st.walk('minh', 2476, { speed: 120, follow: false }), st.walk('lan', 2606, { speed: 140, follow: false })]);
    st.face('lan', -1); st.face('minh', 1);
    st.pose('grandma', 'sitWave'); st.act('grandma', 'wave');
    st.pose('minh', 'e042_hug'); st.pose('lan', 'e042_hug'); st.mood('minh', 'joy'); st.mood('lan', 'joy');
    st.mood('grandpa', 'joy'); st.mood('grandma', 'joy'); st.pose('grandpa', 'open');
    st.fx('hearts', 2540, 120);
    await st.wait(900);
    st.act('grandma', null); st.hold('dad', 'e042_bag'); st.pose('dad', 'e042_sitPoint'); st.face('dad', -1); st.sfx('bag-on', { vol: 0.6 });
    st.set('st-longer'); st.sfx('pop', { vol: 0.6 });
    st.act('minh', 'no'); st.act('lan', 'no');
    await st.wait(1500);
    st.act('minh', null); st.act('lan', null);
  } },
];

export default {
  id: 'en042', worldW: 2900, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: 2050, s: 0.9 },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: 1508, s: 0.95, face: -1 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 250, s: 0.95 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 320, s: 1.08 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 380 },
    { id: 'bus', kind: 'thing', x: -180, y: 300, svg: BUS, box: [-126, -132, 252, 134] },
  ],
  init(st) {
    st.show('bus', false);
    st.bag('minh', true); st.bag('lan', true);
  },
};
