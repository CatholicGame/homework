/**
 * Bài 44 "Did You Have Fun?": Minh và Tom nói chuyện ở sân trường sáng thứ Hai (giữa cảnh). Chuyện cuối tuần đã qua hiện thành
 * hai "khung kỷ niệm" viền dải phim (thì quá khứ): bên trái rạp chiếu phim (Minh, Lan; màn hình hoạt hình bị gạch, rồi phim
 * vũ trụ), bên phải nhà Tom (mưa ngoài cửa sổ, quả bóng bị gạch; bếp: Tom làm bánh với mẹ, lọ đường bị quên, bố Tom ăn hết).
 * Cuối: khung "next weekend" viền chấm hồng (tương lai) ở nhà Minh, Lan làm bánh với Tom, có đường.
 * Câu hỏi "Did…?" / trả lời "Yes, I did / No, I didn't" = bong bóng lời nói ở sân trường; "didn't" = dấu gạch đỏ trên hình.
 * Toạ độ cảnh: rộng 2580, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, flowerAt, sun, label, schoolFront, room, doorway, windowBox, shelf, rug } from '../kit.js';

const FLOOR = 282;
const F = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e044_tmum: { adult: true, hair: 'ponytail', hairC: '#E0A33A', top: 'blouse', shirt: '#FDA4AF', bottom: 'pants', bottomC: '#475569', shoe: '#F5F5F4' },
  e044_tdad: { adult: true, hair: 'short', hairC: '#B45309', top: 'shirt', shirt: '#86EFAC', bottom: 'pants', bottomC: '#334155', shoe: '#44403C', moustache: true },
});

// ── Đồ vật ──────────────────────────────────────────────────────────────────
const POPCORN = `<g transform="translate(0 -6)"><path d="M-8 -6 H8 L6 10 H-6Z" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M-4 -6 L-3 10 M4 -6 L3 10" stroke="#EF4444" stroke-width="2"/>
  ${[[-6, -8], [-1, -10], [4, -8], [1, -6], [-4, -5]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#FEF9C3" stroke="#F59E0B" stroke-width="0.6"/>`).join('')}</g>`;
const BALL = (r = 8) => `<circle r="${r}" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M0 ${-r * 0.4} l${r * 0.38} ${r * 0.28} ${-r * 0.15} ${r * 0.42} h${-r * 0.46} l${-r * 0.15} ${-r * 0.42}Z" fill="#1F2937"/>`;
const CAKE = (s = 1) => `<g transform="scale(${s})"><ellipse cx="0" cy="0" rx="24" ry="5" fill="#fff" stroke="#94A3B8" stroke-width="1"/>
  <path d="M-18 -2 V-20 Q0 -26 18 -20 V-2 Q0 4 -18 -2Z" fill="#FCD34D" stroke="${L}" stroke-width="1"/><path d="M-18 -20 Q0 -14 18 -20 Q0 -26 -18 -20Z" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>
  <path d="M-18 -12 Q0 -6 18 -12" stroke="#F472B6" stroke-width="2.4" fill="none"/></g>`;
const SUGAR = (ok = false) => `<rect x="-11" y="-26" width="22" height="26" rx="4" fill="#fff" stroke="${L}" stroke-width="1"/><rect x="-12" y="-30" width="24" height="6" rx="2" fill="#60A5FA" stroke="${L}" stroke-width="0.8"/>
  <text x="0" y="-9" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="6.4" fill="#1D4ED8">SUGAR</text>
  ${ok ? `<circle cx="12" cy="-28" r="7" fill="#22C55E" stroke="${L}" stroke-width="0.8"/><path d="M8.6 -28 l2.4 2.6 l4 -4.6" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>` : ''}`;
const BOWL = `<path d="M-16 -8 H16 Q15 8 0 9 Q-15 8 -16 -8Z" fill="#BAE6FD" stroke="${L}" stroke-width="1"/><path d="M-14 -8 Q0 -12 14 -8Z" fill="#FEF3C7" stroke="${L}" stroke-width="0.6"/>`;
/** Dấu gạch chéo đỏ (didn't), tâm (x, y). */
const NOX = (x, y, r = 30) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="none" stroke="#DC2626" stroke-width="5"/><path d="M${-r * 0.7} ${r * 0.7} L${r * 0.7} ${-r * 0.7}" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/></g>`;
/** Dấu hỏi to (thing, gốc ở đáy). */
const QMARK = `<g class="e044-qbob"><circle cx="0" cy="-16" r="15" fill="#fff" stroke="${L}" stroke-width="1.2"/><text x="0" y="-6" text-anchor="middle" ${F} font-size="26" fill="#F97316">?</text></g>`;

const PROPS = {
  e044_ball: `<g transform="translate(0 9)">${BALL(9)}</g>`,
  e044_fork: `<g transform="rotate(180)"><path d="M0 -2 V14" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/><path d="M-3 14 V20 M0 14 V21 M3 14 V20 M-3 14 H3" stroke="#94A3B8" stroke-width="1.2"/></g>`,
  e044_whisk: `<g transform="rotate(180)"><path d="M0 -2 V10" stroke="#92400E" stroke-width="2.4" stroke-linecap="round"/><path d="M0 10 Q-6 18 0 24 Q6 18 0 10 M0 10 Q-3 18 0 24 Q3 18 0 10" stroke="#94A3B8" stroke-width="1" fill="none"/></g>`,
  e044_sugar: `<g transform="translate(0 6) scale(0.8)">${SUGAR(true)}</g>`,
  e044_thumb: `<g transform="rotate(180) translate(0 -2)"><rect x="-4" y="-2" width="8" height="8" rx="3" fill="#FDDCB5" stroke="${L}" stroke-width="0.7"/><rect x="-1.6" y="5" width="3.4" height="7" rx="1.6" fill="#FDDCB5" stroke="${L}" stroke-width="0.7"/></g>`,
};
const POSES = {
  e044_ask: { R: [55, 40], L: [55, 40], head: -6 },
  e044_watch: { R: [24, -86], L: [24, -86], dy: 20, head: -6 },
  e044_wow: { R: [40, 110], L: [40, 110], dy: 20, head: -8 },
  e044_point: { R: [100, 112], L: [24, -86], dy: 20, head: -6 },
  e044_look: { R: [24, -86], L: [10, 4], head: 8 },
  e044_mix: { R: [40, -50], L: [30, -60], head: 8 },
  e044_oops: { R: [150, 250], L: [150, 250] },
  e044_eat: { R: [118, 248], L: [40, 110], dy: 20 },
  e044_thumb: { R: [90, 160], L: [40, 110], dy: 20 },
  e044_sitHappy: { R: [40, 110], L: [40, 110], dy: 20 },
};

const LBS = ['mon', 'cine', 'cart', 'space', 'out', 'foot', 'mcake', 'sugar', 'ateall', 'nothing', 'next', 'fcl'];
const lb = (name, inner) => `<g class="e044-lb e044-${name}">${inner}</g>`;

/** Viền khung kỷ niệm (dải phim, quá khứ) x0..x1. tag = nhãn góc trên. */
const filmFrame = (x0, x1, tag) => {
  const holes = (y) => Array.from({ length: Math.floor((x1 - x0 - 20) / 26) }, (_, i) => `<rect x="${x0 + 14 + i * 26}" y="${y}" width="12" height="7" rx="2" fill="#FEF3C7"/>`).join('');
  return `<rect x="${x0}" y="40" width="${x1 - x0}" height="18" fill="#3F2A1E"/>${holes(46)}
    <rect x="${x0}" y="298" width="${x1 - x0}" height="17" fill="#3F2A1E"/>${holes(303)}
    <rect x="${x0}" y="40" width="10" height="275" fill="#3F2A1E"/><rect x="${x1 - 10}" y="40" width="10" height="275" fill="#3F2A1E"/>
    <g transform="translate(${x0 + 18 + tag.length * 4.6} 72)"><rect x="${-tag.length * 4.6 - 8}" y="-13" width="${tag.length * 9.2 + 16}" height="20" rx="10" fill="#FDE68A" stroke="#92400E" stroke-width="1.2"/>
    <text x="0" y="2" text-anchor="middle" ${F} font-size="12" fill="#92400E">${tag}</text></g>`;
};

function bg() {
  return `
  ${sky(0, 2580, 315, 'e044sky')}
  <!-- ═══ Khung 1: rạp chiếu phim (cuối tuần của Minh) ═══ -->
  ${room(0, 600, FLOOR, '#4C1D95', '#7F1D1D')}
  <rect x="0" y="0" width="600" height="12" fill="#3B0764"/>
  <!-- cửa vào + biển CINEMA -->
  <rect x="20" y="130" width="54" height="${FLOOR - 130}" rx="3" fill="#1E1B4B" stroke="${L}"/>
  <rect x="14" y="98" width="120" height="26" rx="5" fill="#FDE047" stroke="${L}" stroke-width="1.2"/><text x="74" y="116" text-anchor="middle" ${F} font-size="15" fill="#B91C1C">CINEMA</text>
  ${lb('cine', label(110, 160, 'the cinema', '#7C3AED', 14))}
  <!-- màn hình -->
  <rect x="284" y="66" width="290" height="150" rx="4" fill="#111827" stroke="#FDE68A" stroke-width="3"/>
  <path d="M276 66 Q284 140 276 224 H292 V66Z M582 66 Q574 140 582 224 H566 V66Z" fill="#B91C1C" stroke="${L}" stroke-width="0.8"/>
  <g class="e044-scr e044-scrCart"><rect x="290" y="72" width="278" height="138" fill="#BBF7D0"/><circle cx="520" cy="100" r="14" fill="#FDE047"/>
    <path d="M290 186 Q400 168 568 182 V210 H290Z" fill="#4ADE80"/>
    <g transform="translate(420 168)"><ellipse cx="0" cy="0" rx="26" ry="22" fill="#fff" stroke="${L}" stroke-width="1.2"/><ellipse cx="-12" cy="-36" rx="7" ry="20" fill="#fff" stroke="${L}" stroke-width="1.2"/><ellipse cx="12" cy="-36" rx="7" ry="20" fill="#fff" stroke="${L}" stroke-width="1.2"/>
      <ellipse cx="-12" cy="-36" rx="3" ry="13" fill="#FBCFE8"/><ellipse cx="12" cy="-36" rx="3" ry="13" fill="#FBCFE8"/>
      <circle cx="-9" cy="-4" r="3" fill="#1F2937"/><circle cx="9" cy="-4" r="3" fill="#1F2937"/><ellipse cx="0" cy="4" rx="3" ry="2" fill="#F472B6"/><path d="M-6 9 q6 5 12 0" stroke="${L}" stroke-width="1.4" fill="none"/></g>
    <text x="350" y="96" text-anchor="middle" ${F} font-size="13" fill="#DB2777">CARTOON</text></g>
  <g class="e044-nox">${NOX(429, 141, 52)}</g>
  <g class="e044-scr e044-scrSpace"><rect x="290" y="72" width="278" height="138" fill="#1E1B4B"/>
    ${Array.from({ length: 22 }, (_, i) => `<circle cx="${296 + (i * 53) % 268}" cy="${78 + (i * 37) % 126}" r="${i % 3 ? 1.2 : 2}" fill="#FEF9C3"/>`).join('')}
    <g transform="translate(510 116)"><circle r="22" fill="#F59E0B" stroke="${L}" stroke-width="1"/><ellipse rx="36" ry="8" fill="none" stroke="#FDE68A" stroke-width="3" transform="rotate(-16)"/></g>
    <circle cx="330" cy="186" r="14" fill="#60A5FA" stroke="${L}" stroke-width="1"/><path d="M322 182 q6 -4 10 2 q4 6 10 2" stroke="#22C55E" stroke-width="3" fill="none"/>
    <g class="e044-rocket"><g transform="translate(330 150) rotate(50)"><path d="M0 -22 Q9 -10 8 10 H-8 Q-9 -10 0 -22Z" fill="#E5E7EB" stroke="${L}" stroke-width="1"/><circle cx="0" cy="-6" r="4" fill="#38BDF8" stroke="${L}" stroke-width="0.8"/>
      <path d="M-8 4 L-14 14 L-8 12Z M8 4 L14 14 L8 12Z" fill="#EF4444" stroke="${L}" stroke-width="0.8"/><path class="e044-flame" d="M-5 10 Q0 26 5 10Z" fill="#F97316"/></g></g>
    <text x="429" y="96" text-anchor="middle" ${F} font-size="13" fill="#FDE047">SPACE</text></g>
  ${lb('cart', label(392, 250, "didn't watch a cartoon", '#DC2626', 12))}
  ${lb('space', label(392, 250, 'a film about space', '#4338CA', 13))}
  <!-- ═══ Sân trường (thứ Hai) ═══ -->
  ${cloud(780, 70, 0.9, 0)}${cloud(1140, 56, 0.8, 2)}
  <g transform="translate(1170 78)">${sun(20)}</g>
  <path d="M600 232 Q760 206 930 226 T1290 222 V282 H600Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${schoolFront(740, FLOOR)}
  ${tree(1210, FLOOR - 4, 0.85)}
  <rect x="600" y="${FLOOR - 4}" width="690" height="40" fill="#E7E5E4" stroke="${L}"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${620 + i * 62} ${FLOOR - 4} V315" stroke="#D6D3D1"/>`).join('')}
  <g transform="translate(1110 0)"><path d="M0 ${FLOOR} V176" stroke="#78716C" stroke-width="4"/><rect x="-40" y="110" width="80" height="66" rx="5" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <rect x="-40" y="110" width="80" height="18" rx="5" fill="#EF4444" stroke="${L}" stroke-width="1.2"/><text x="0" y="158" text-anchor="middle" ${F} font-size="14" fill="#2563EB">MONDAY</text></g>
  ${lb('mon', label(1110, 92, 'Monday morning', '#B45309', 13))}
  <!-- ═══ Khung 2: nhà Tom (cuối tuần của Tom) ═══ -->
  ${room(1290, 300, FLOOR, '#E0F2FE')}
  <g transform="translate(1330 74)"><rect x="-6" y="-6" width="122" height="102" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/>
    <rect x="0" y="0" width="110" height="90" fill="#94A3B8"/><path d="M0 70 Q50 58 110 66 V90 H0Z" fill="#86EFAC"/>
    ${[[30, 18], [80, 12]].map(([x, y]) => `<g transform="translate(${x} ${y})"><ellipse rx="22" ry="10" fill="#64748B"/><ellipse cx="-10" cy="-6" rx="11" ry="8" fill="#64748B"/></g>`).join('')}
    <g class="e044-rain" stroke="#E0F2FE" stroke-width="1.4" stroke-linecap="round">${Array.from({ length: 16 }, (_, i) => `<path d="M${6 + (i * 37) % 100} ${20 + (i * 53) % 52} l-3 10" style="animation-delay:${(-(i % 7) * 0.11).toFixed(2)}s"/>`).join('')}</g>
    <path d="M55 0 V90 M0 45 H110" stroke="#fff" stroke-width="3" opacity="0.85"/></g>
  ${lb('foot', `${label(1490, 146, "didn't play football", '#DC2626', 12)}<g transform="translate(1520 100)"><g transform="scale(1.6)">${BALL(9)}</g></g>${NOX(1520, 100, 22)}`)}
  ${rug(1430, FLOOR, 150, '#BFDBFE')}
  ${doorway(1590, FLOOR)}
  ${room(1602, 408, FLOOR, '#FFEDD5', '#C08B5C')}
  ${windowBox(1880, 70, 70, 56)}
  <!-- tủ bếp + lò nướng -->
  <rect x="1630" y="204" width="170" height="${FLOOR - 204}" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/><rect x="1624" y="198" width="182" height="8" rx="2" fill="#E5E7EB" stroke="${L}"/>
  <g transform="translate(1756 0)"><rect x="-34" y="214" width="68" height="58" rx="4" fill="#475569" stroke="${L}" stroke-width="1.2"/><rect x="-26" y="228" width="52" height="34" rx="3" fill="#1F2937" stroke="${L}"/>
    <g class="e044-oven"><rect x="-26" y="228" width="52" height="34" rx="3" fill="#F97316" opacity="0.7"/></g><circle cx="-18" cy="221" r="2.4" fill="#E5E7EB"/><circle cx="-8" cy="221" r="2.4" fill="#E5E7EB"/></g>
  <rect x="1650" y="214" width="60" height="58" rx="3" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/>
  <g class="e044-bowl"><g transform="translate(1700 190)">${BOWL}</g></g>
  <!-- kệ có lọ đường -->
  ${shelf(1632, 140, 110, `<g transform="translate(1720 132)">${[0, 1].map((i) => `<rect x="${i * 14 - 6}" y="-16" width="10" height="16" rx="2" fill="${['#F87171', '#FBBF24'][i]}" stroke="${L}" stroke-width="0.7"/>`).join('')}</g>`)}
  <g transform="translate(1660 140)"><g class="e044-glow"><circle cx="0" cy="-14" r="24" fill="#FDE047" opacity="0.6"/></g>${SUGAR()}</g>
  ${lb('sugar', `${label(1660, 86, 'forgot the sugar', '#DC2626', 13)}${NOX(1660, 126, 20)}`)}
  ${lb('mcake', label(1720, 112, 'made a cake', '#C2410C', 14))}
  ${lb('ateall', label(1930, 100, 'ate it all', '#B45309', 15))}
  ${lb('nothing', label(1900, 130, "didn't say anything", '#475569', 12))}
  <!-- ═══ Khung 3: nhà Minh, cuối tuần sau ═══ -->
  ${room(2010, 570, FLOOR, '#FEF3C7')}
  <rect x="2040" y="110" width="56" height="${FLOOR - 110}" rx="4" fill="#B45309" stroke="${L}" stroke-width="1.2"/><circle cx="2084" cy="200" r="3" fill="#FDE68A"/>
  ${windowBox(2400, 70, 100, 76)}
  ${shelf(2200, 130, 110, `<g transform="translate(2230 122)">${[0, 1, 2].map((i) => `<rect x="${i * 16 - 6}" y="-16" width="12" height="16" rx="2" fill="${['#F87171', '#FBBF24', '#60A5FA'][i]}" stroke="${L}" stroke-width="0.7"/>`).join('')}</g>`)}
  ${lb('next', label(2300, 96, 'come to my house', '#DB2777', 14))}
  ${lb('fcl', label(2300, 124, 'make a cake with you', '#DB2777', 13))}`;
}

function fg() {
  return `
  <!-- ghế rạp (che chân người ngồi) -->
  ${[140, 210, 280].map((x) => `<g transform="translate(${x} 0)"><rect x="-30" y="240" width="60" height="32" rx="10" fill="#DC2626" stroke="${L}" stroke-width="1.2"/>
    <rect x="-34" y="256" width="68" height="18" rx="5" fill="#B91C1C" stroke="${L}"/><path d="M-26 274 V${FLOOR} M26 274 V${FLOOR}" stroke="#450A0A" stroke-width="4"/></g>`).join('')}
  ${filmFrame(0, 600, 'at the weekend')}
  ${bush(640, FLOOR + 8, 0.9)}${flowerAt(1260, FLOOR + 4)}
  <!-- bàn ăn nhà Tom -->
  <g transform="translate(1930 0)"><rect x="-58" y="230" width="116" height="9" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/><path d="M-48 239 V${FLOOR} M48 239 V${FLOOR}" stroke="#92400E" stroke-width="5"/>
    <g class="e044-cake"><g transform="translate(-10 228)">${CAKE(1)}</g></g>
    ${[0, 1, 2].map((i) => `<g class="e044-slice e044-sl${i}"><g transform="translate(${-26 + i * 16} 210)"><path d="M0 0 L8 18 H-8Z" fill="#FCD34D" stroke="${L}" stroke-width="0.6"/></g></g>`).join('')}
    <g class="e044-plate"><ellipse cx="-10" cy="228" rx="24" ry="5" fill="#fff" stroke="#94A3B8" stroke-width="1"/></g></g>
  ${filmFrame(1290, 2010, 'at the weekend')}
  <!-- bàn nhà Minh (tương lai) -->
  <g transform="translate(2310 0)"><rect x="-70" y="230" width="140" height="9" rx="3" fill="#F59E0B" stroke="${L}" stroke-width="1.2"/><path d="M-58 239 V${FLOOR} M58 239 V${FLOOR}" stroke="#92400E" stroke-width="5"/>
    <g transform="translate(-30 226)">${BOWL}</g><g class="e044-fsugar"><g transform="translate(10 230)">${SUGAR(true)}</g></g>
    <g class="e044-fcake"><g transform="translate(-30 226)">${CAKE(1.1)}</g></g></g>
  <!-- viền chấm hồng: tương lai -->
  <rect x="2016" y="44" width="558" height="266" rx="18" fill="none" stroke="#F472B6" stroke-width="5" stroke-dasharray="4 10" stroke-linecap="round"/>
  <g transform="translate(2100 72)"><rect x="-58" y="-13" width="116" height="20" rx="10" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.2"/><text x="0" y="2" text-anchor="middle" ${F} font-size="12" fill="#DB2777">next weekend</text></g>
  ${[[2540, 60], [2050, 270], [2560, 250]].map(([x, y]) => `<path class="ek-twinkle" d="M${x} ${y} l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2Z" fill="#F472B6"/>`).join('')}`;
}

const CSS = `
.e044-lb { opacity: 0; transition: opacity .35s; }
${LBS.map((n) => `.st-${n} .e044-${n}`).join(', ')} { opacity: 1; }
.e044-scr { opacity: 0; transition: opacity .5s; } .st-cart .e044-scrCart, .st-space .e044-scrSpace { opacity: 1; }
.e044-nox { opacity: 0; transform: scale(1.6); transform-box: fill-box; transform-origin: center; transition: opacity .3s, transform .4s cubic-bezier(.3,1.4,.6,1); }
.st-cart .e044-nox { opacity: 1; transform: scale(1); }
.e044-rocket { animation: e044Rocket 3s ease-in-out infinite alternate; } @keyframes e044Rocket { from { transform: translate(-10px, 30px); } to { transform: translate(110px, -40px); } }
.e044-flame { animation: e044Flame .2s linear infinite alternate; transform-origin: 0 10px; } @keyframes e044Flame { to { transform: scaleY(.6); } }
.e044-rain path { animation: e044Rain .5s linear infinite; }
@keyframes e044Rain { from { transform: translate(0, -20px); opacity: 0; } 20% { opacity: 1; } to { transform: translate(-6px, 30px); opacity: .8; } }
.e044-oven { opacity: 0; transition: opacity .5s; } .st-oven .e044-oven { opacity: 1; animation: e044Pulse .5s ease-in-out infinite alternate; }
@keyframes e044Pulse { to { opacity: .4; } }
.e044-bowl { transition: opacity .3s; } .st-cakeOn .e044-bowl { opacity: 0; }
.e044-cake { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: 50% 100%; transition: opacity .3s, transform .5s cubic-bezier(.3,1.5,.6,1); }
.st-cakeOn .e044-cake { opacity: 1; transform: scale(1); }
.st-eat1 .e044-cake { transform: scale(.75); } .st-eat2 .e044-cake { transform: scale(.45); } .st-eat3 .e044-cake { opacity: 0; transform: scale(.2); }
.e044-slice { opacity: 0; }
.e044-plate { opacity: 0; } .st-cakeOn .e044-plate { opacity: 1; }
.e044-glow { opacity: 0; transition: opacity .3s; } .st-sugar .e044-glow { opacity: 1; animation: e044Pulse .5s ease-in-out infinite alternate; }
.e044-fcake { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: 50% 100%; transition: opacity .3s .2s, transform .5s .2s cubic-bezier(.3,1.5,.6,1); }
.st-fcakeOn .e044-fcake { opacity: 1; transform: scale(1); }
.e044-qbob { animation: e044Q .6s ease-in-out infinite alternate; } @keyframes e044Q { to { transform: translateY(-4px); } }
@media (prefers-reduced-motion: reduce) { .e044-rocket { animation-duration: 6s; } .e044-rain path { animation-duration: 1.4s; } }
`;

/** Đặt dấu hỏi trên đầu một người. */
function ask(st, id, on = true) {
  const A = st.a(id);
  if (on) st.place('q', A.x + 30 * (A.face < 0 ? -1 : 1), A.y - 132 * A.s);
  st.show('q', on);
}
const SCHOOL = 980, CINE = 290, TOMH = 1530, KITCH = 1800, NEXT = 2300;

const BEATS = [
  { key: ['Did you have fun at the weekend'], icon: '❓', label: 'Did you have fun?', async play(st) {
    st.look(SCHOOL); st.sfx('school-bell', { vol: 0.4 });
    st.set('st-mon');
    st.show('tom', true);
    await st.walk('tom', 960, { speed: 150, follow: false });
    st.face('tom', 1); st.set('st-mon', false);
    st.pose('tom', 'e044_ask'); st.mood('tom', 'joy');
    st.sfx('pop', { vol: 0.6 });
    await st.say('tom', 'Did you have fun at the weekend?', 2400);
    st.pose('tom', 'stand');
  } },
  { key: ['Yes, I did'], icon: '👍', label: 'Yes, I did', async play(st) {
    st.act('minh', 'nod'); st.mood('minh', 'joy'); st.pose('minh', 'cheer'); st.sfx('ding', { vol: 0.7 });
    await st.say('minh', 'Yes, I did!', 1600);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['I went to the cinema with Lan'], icon: '🎬', label: 'the cinema', async play(st) {
    st.sfx('whoosh', { vol: 0.5 });
    await st.look(CINE, { dur: 1100 });
    st.set('st-cine'); st.sfx('pop', { vol: 0.6 });
    await Promise.all([st.walk('minhM', 210, { speed: 150, follow: false }), st.walk('lanM', 140, { speed: 140, follow: false })]);
    st.pose('minhM', 'e044_watch'); st.pose('lanM', 'e044_watch');
    st.chest('minhM', POPCORN); st.mood('minhM', 'joy'); st.mood('lanM', 'joy'); st.sfx('crunch', { vol: 0.6 });
    await st.wait(700);
  } },
  { key: ["didn't watch a cartoon"], icon: '🚫', label: "didn't watch a cartoon", async play(st) {
    st.set('st-cine', false);
    st.set('st-cart'); st.sfx('buzz-no', { vol: 0.6 });
    st.act('minhM', 'no'); st.act('lanM', 'no');
    await st.wait(2200);
    st.act('minhM', null); st.act('lanM', null);
  } },
  { key: ['a film about space'], icon: '🚀', label: 'a film about space', async play(st) {
    st.set('st-cart', false);
    st.set('st-space'); st.sfx('whoosh', { vol: 0.6 });
    st.pose('minhM', 'e044_point'); st.mood('minhM', 'wow'); st.chest('minhM', null);
    st.pose('lanM', 'e044_wow'); st.mood('lanM', 'wow');
    await st.wait(500); st.sfx('robot-beep', { vol: 0.4 });
    await st.wait(1700);
    st.mood('minhM', 'joy'); st.mood('lanM', 'joy');
  } },
  { key: ['Did you go out'], icon: '❓', label: 'Did you go out?', async play(st) {
    await st.look(SCHOOL, { dur: 1000 });
    st.pose('minh', 'e044_ask'); st.mood('minh', 'happy');
    st.sfx('pop', { vol: 0.6 });
    await st.say('minh', 'Did you go out?', 1800);
    st.pose('minh', 'stand');
  } },
  { key: ["No, I didn't"], icon: '🙅', label: "No, I didn't", async play(st) {
    st.act('tom', 'no'); st.pose('tom', 'open'); st.sfx('buzz-no', { vol: 0.6 });
    await st.say('tom', "No, I didn't.", 1700);
    st.act('tom', null); st.pose('tom', 'stand');
  } },
  { key: ['It rained', "didn't play football"], icon: '🌧️', label: "didn't play football", async play(st) {
    await st.look(TOMH, { dur: 1000 });
    st.pose('tomM', 'e044_look'); st.mood('tomM', 'sad');
    st.sfx('rain', { vol: 0.5 });
    await st.wait(900);
    st.set('st-foot'); st.sfx('buzz-no', { vol: 0.5 });
    st.hold('tomM', null); st.pose('tomM', 'stand');
    st.show('ballT', true);
    await st.wait(1300);
  } },
  { key: ['stayed at home', 'made a cake with my mum'], icon: '🎂', label: 'made a cake', async play(st) {
    st.set('st-foot', false);
    st.mood('tomM', 'happy');
    await st.walk('tomM', 1666, { speed: 160, lead: 40 });
    st.look(1740);
    st.hold('tomM', 'e044_whisk'); st.pose('tomM', 'e044_mix'); st.act('tomM', 'stir');
    st.pose('tmum', 'e044_mix'); st.mood('tmum', 'joy'); st.mood('tomM', 'joy');
    st.set('st-mcake'); st.sfx('pot-stir', { vol: 0.6 });
    await st.wait(1200);
    st.act('tomM', null); st.set('st-oven');
    await st.wait(700);
    st.set('st-oven', false); st.sfx('ding', { vol: 0.7 });
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(CAKE(1), [1756, 240], [1920, 222], { size: 50, dur: 600 });
    st.set('st-cakeOn'); st.fx('sparkle', 1920, 210);
    await st.wait(400);
  } },
  { key: ['Did it taste good'], icon: '😋', label: 'Did it taste good?', async play(st) {
    st.set('st-mcake', false);
    await st.look(SCHOOL, { dur: 1000 });
    st.pose('minh', 'e044_ask'); st.mood('minh', 'joy');
    st.sfx('pop', { vol: 0.6 });
    await st.say('minh', 'Did it taste good?', 1800);
  } },
  { key: ['asked Minh'], icon: '🗣️', label: 'asked Minh', async play(st) {
    ask(st, 'minh'); st.sfx('pop', { vol: 0.7 });
    st.pose('minh', 'think'); st.mood('minh', 'wow');
    await st.wait(1400);
    ask(st, 'minh', false); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['Tom laughed'], icon: '😂', label: 'Tom laughed', async play(st) {
    st.mood('tom', 'joy'); st.pose('tom', 'clap'); st.act('tom', 'hop'); st.sfx('giggle');
    await st.say('tom', 'Ha ha ha!', 1500);
    st.act('tom', null);
  } },
  { key: ["No, it didn't"], icon: '🙅', label: "No, it didn't", async play(st) {
    st.pose('tom', 'open'); st.act('tom', 'no'); st.sfx('buzz-no', { vol: 0.6 });
    await st.say('tom', "No, it didn't!", 1600);
    st.act('tom', null); st.pose('tom', 'stand');
  } },
  { key: ['We forgot the sugar'], icon: '🍬', label: 'forgot the sugar', async play(st) {
    await st.look(1740, { dur: 1000 });
    st.set('st-sugar'); st.sfx('ding', { vol: 0.6 });
    st.hold('tomM', null);
    st.pose('tomM', 'e044_oops'); st.mood('tomM', 'wow');
    st.pose('tmum', 'e044_oops'); st.mood('tmum', 'wow');
    await st.wait(400); st.sfx('giggle', { vol: 0.5 });
    await st.wait(1600);
  } },
  { key: ['Did you eat it'], icon: '🍰', label: 'Did you eat it?', async play(st) {
    st.set('st-sugar', false);
    st.pose('tomM', 'stand'); st.pose('tmum', 'stand'); st.mood('tomM', 'happy'); st.mood('tmum', 'happy');
    await st.look(SCHOOL, { dur: 1000 });
    st.pose('minh', 'e044_ask');
    st.sfx('pop', { vol: 0.6 });
    await st.say('minh', 'Did you eat it?', 1700);
    st.pose('minh', 'stand');
  } },
  { key: ['My dad ate it all'], icon: '👨', label: 'Dad ate it all', async play(st) {
    await st.look(KITCH, { dur: 1000 });
    st.show('tdad', true);
    await st.walk('tdad', 1946, { speed: 140, follow: false });
    st.face('tdad', -1);
    st.hold('tdad', 'e044_fork'); st.pose('tdad', 'e044_eat'); st.act('tdad', 'eat'); st.mood('tdad', 'joy');
    st.set('st-ateall');
    for (const k of [1, 2, 3]) { await st.wait(500); st.set(`st-eat${k}`); st.sfx('crunch', { vol: 0.5, rate: 0.9 + k * 0.08 }); }
    await st.wait(300); st.sfx('gulp', { vol: 0.6 });
    st.act('tdad', null);
  } },
  { key: ["didn't say anything about the sugar"], icon: '🤐', label: "didn't say anything", async play(st) {
    st.set('st-ateall', false);
    st.hold('tdad', 'e044_thumb'); st.pose('tdad', 'e044_thumb'); st.mood('tdad', 'happy');
    st.set('st-nothing');
    st.say('tdad', '...', 1600); st.sfx('pop', { vol: 0.6 });
    await st.wait(600);
    st.mood('tomM', 'joy'); st.mood('tmum', 'joy'); st.pose('tmum', 'clap'); st.act('tmum', 'clap'); st.sfx('clap', { vol: 0.6 });
    st.act('tomM', 'hop');
    await st.wait(1400);
    st.act('tmum', null); st.act('tomM', null);
  } },
  { key: ['Minh smiled'], icon: '😊', label: 'Minh smiled', async play(st) {
    st.set('st-nothing', false);
    await st.look(SCHOOL, { dur: 1000 });
    st.mood('minh', 'joy'); st.fx('sparkle', 1040, 150);
    st.mood('tom', 'joy');
    await st.wait(300); st.sfx('giggle', { vol: 0.5 });
    await st.wait(900);
  } },
  { key: ['Next weekend, come to my house'], icon: '🏠', label: 'come to my house', async play(st) {
    st.pose('minh', 'point'); st.act('minh', 'point');
    st.sfx('pop', { vol: 0.6 });
    st.say('minh', 'Next weekend, come to my house!', 2000);
    await st.wait(1600);
    st.act('minh', null);
    await st.look(NEXT, { dur: 1100 });
    st.set('st-next'); st.sfx('pop', { vol: 0.6 });
    st.show('tomF', true);
    await st.walk('tomF', 2208, { speed: 160, follow: false });
    st.sfx('knock', { vol: 0.7 });
    st.pose('minhF', 'wave'); st.act('minhF', 'wave'); st.pose('tomF', 'wave'); st.act('tomF', 'wave');
    st.mood('minhF', 'joy'); st.mood('tomF', 'joy');
    await st.wait(1000);
    st.act('minhF', null); st.act('tomF', null); st.pose('minhF', 'stand'); st.pose('tomF', 'stand');
  } },
  { key: ['Lan can make a cake with you'], icon: '🧁', label: 'make a cake', async play(st) {
    st.set('st-next', false);
    st.set('st-fcl');
    st.hold('lanF', 'e044_whisk'); st.pose('lanF', 'e044_mix'); st.act('lanF', 'stir'); st.mood('lanF', 'joy'); st.sfx('pot-stir', { vol: 0.5 });
    await st.walk('tomF', 2380, { speed: 170, follow: false });
    st.face('tomF', -1); st.pose('tomF', 'reach');
    await st.wait(300); st.sfx('pour', { vol: 0.5 });
    st.fly(`<circle r="2" fill="#fff" stroke="#94A3B8" stroke-width="0.5"/>`, [2320, 200], [2282, 214], { size: 8, dur: 500 });
    await st.wait(200);
    st.fly(`<circle r="2" fill="#fff" stroke="#94A3B8" stroke-width="0.5"/>`, [2320, 200], [2276, 216], { size: 8, dur: 500 });
    await st.wait(700);
    st.act('lanF', null); st.hold('lanF', null);
    st.set('st-fcakeOn'); st.sfx('cheer', { vol: 0.5 });
    st.pose('lanF', 'cheer'); st.pose('tomF', 'cheer'); st.mood('tomF', 'joy');
    st.fx('hearts', 2290, 140);
    await st.wait(1200);
  } },
];

export default {
  id: 'en044', worldW: 2580, floor: FLOOR, viewTop: 40, camStart: SCHOOL - 245, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    // khung 1: rạp phim
    { id: 'lanM', kind: 'kid', who: 'en_lan_home', x: -40, s: 1.08 },
    { id: 'minhM', kind: 'kid', who: 'en_minh_home', x: 10 },
    // sân trường
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 1040, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 740 },
    { id: 'q', kind: 'thing', x: 990, y: 150, svg: QMARK, box: [-18, -34, 36, 36] },
    // khung 2: nhà Tom
    { id: 'ballT', kind: 'thing', x: 1510, svg: `<g transform="translate(0 -9)">${BALL(9)}</g>`, box: [-10, -19, 20, 20] },
    { id: 'tdad', kind: 'adult', who: 'e044_tdad', x: 1996, s: 0.95, face: -1 },
    { id: 'tmum', kind: 'adult', who: 'e044_tmum', x: 1760, s: 0.95, face: -1 },
    { id: 'tomM', kind: 'kid', who: 'en_tom_home', x: 1460 },
    // khung 3: nhà Minh tuần sau
    { id: 'lanF', kind: 'kid', who: 'en_lan_home', x: 2264, s: 1.08 },
    { id: 'minhF', kind: 'kid', who: 'en_minh_home', x: 2152 },
    { id: 'tomF', kind: 'kid', who: 'en_tom_home', x: 2068 },
  ],
  init(st) {
    st.bag('minh', true); st.bag('tom', true);
    st.show('q', false); st.show('tom', false); st.show('tdad', false); st.show('tomF', false); st.show('ballT', false);
    st.hold('tomM', 'e044_ball'); st.face('tomM', 1);
  },
};
