/**
 * Bài 41 "Yesterday at School": cổng trường có tấm lịch (TUESDAY lật ngược về MONDAY = hôm qua) → lớp học (bảng, hai cửa sổ,
 * nhiệt kế, bàn học) → nhà ăn (cơm, cá) → phòng mỹ thuật (hai giá vẽ: cây xanh của Minh, xe buýt đỏ của Tom) → phố → thư viện
 * (Lan đọc sách) → hai khung "bố mẹ đi làm" → nhà (bà ngồi sô-pha với Lucky). Minh đi qua từng chỗ theo thứ tự câu chuyện.
 * Thì quá khứ: tấm lịch lật ngược về hôm qua, mặt trời đi một vòng trên trường ("all day"), nhãn "yesterday".
 * So sánh "easy / difficult": hai bong bóng nghĩ đặt cạnh nhau trên đầu Minh và Tom.
 * Toạ độ cảnh: rộng 3500, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, person } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, flowerAt, sun, label, schoolFront, room, doorway, windowBox, shelf, books, rug, board, desk, steam, thought } from '../kit.js';

const FLOOR = 282;
const F = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e041_na: { hair: 'pigtails', top: 'uniform', shirt: '#FFFFFF', bottom: 'skirt', bottomC: '#1E3A6E', shoe: '#FB7185', bag: '#FB7185' },
  e041_nam: { hair: 'bowl', top: 'uniform', shirt: '#FFFFFF', bottom: 'shorts', bottomC: '#1E3A6E', shoe: '#3B6FD8', bag: '#4F7FD9' },
});

// ── Đồ vật ──────────────────────────────────────────────────────────────────
/** Quạt giấy cầm tay (gốc = bàn tay). */
const FAN = `<g transform="rotate(180)"><path d="M0 0 V10" stroke="#92400E" stroke-width="2"/><path d="M0 10 L-11 26 Q0 31 11 26Z" fill="#FDE047" stroke="${L}" stroke-width="0.8"/>
  <path d="M0 10 L-5 28 M0 10 L0 29 M0 10 L5 28" stroke="#F59E0B" stroke-width="0.8"/></g>`;
/** Đĩa cá (gốc ở giữa). */
const FISH_PLATE = `<ellipse cx="0" cy="2" rx="17" ry="4.4" fill="#fff" stroke="#3B82F6" stroke-width="1.2"/>
  <path d="M-11 -1 Q-4 -8 6 -2 L12 -6 V3 L6 0 Q-4 5 -11 -1Z" fill="#F59E0B" stroke="${L}" stroke-width="0.8"/><circle cx="-7" cy="-2" r="0.9" fill="#1F2937"/>`;
/** Bát cơm trắng (gốc ở giữa). */
const RICE = `<path d="M-11 -3 H11 Q10 8 0 9 Q-10 8 -11 -3Z" fill="#fff" stroke="#3B82F6" stroke-width="1.2"/><path d="M-10 -3 Q-8 -12 0 -12 Q8 -12 10 -3Z" fill="#F8FAFC" stroke="${L}" stroke-width="0.7"/>
  <path d="M-4 -8 h2 M2 -9 h2 M-1 -5 h2" stroke="#CBD5E1" stroke-width="1"/>`;
/** Bàn ăn dài ở nhà ăn (fg): bát cơm + đĩa cá trước mỗi chỗ ngồi. */
const SEATS = [1490, 1560, 1630, 1700];
const PAINT = `<path d="M-6 -4 Q-10 -12 -2 -12 Q4 -16 8 -10 Q14 -8 10 -2 Q8 4 0 2 Q-8 4 -6 -4Z" fill="#fff" stroke="${L}" stroke-width="0.8"/>
  <circle cx="-3" cy="-7" r="2.2" fill="#EF4444"/><circle cx="3" cy="-9" r="2.2" fill="#22C55E"/><circle cx="6" cy="-4" r="2.2" fill="#3B82F6"/><circle cx="0" cy="-3" r="2" fill="#FACC15"/>`;

/** Giá vẽ, tâm tấm giấy ở x (giấy 80 × 66, trên y 154). inner = hình trên giấy (toạ độ: gốc ở góc trên trái giấy). */
const easel = (x, inner) => `<g transform="translate(${x} 0)">
  <path d="M-30 ${FLOOR} L-6 136 M30 ${FLOOR} L6 136 M0 150 L8 ${FLOOR}" stroke="#92400E" stroke-width="4" stroke-linecap="round"/>
  <rect x="-40" y="154" width="80" height="66" rx="2" fill="#fff" stroke="${L}" stroke-width="1.2"/>
  <rect x="-44" y="218" width="88" height="6" rx="2" fill="#B45309" stroke="${L}"/>
  <g transform="translate(-40 154)">${inner}</g></g>`;
/** Cây xanh to Minh vẽ (nét hiện dần). */
const TREE_PIC = `<path class="e041-ink e041-ink-t" pathLength="1" d="M35 64 V42 H45 V64Z" stroke="#92400E" stroke-width="1.6" fill="#A16207"/>
  <path class="e041-ink e041-ink-t" pathLength="1" style="transition-delay:.35s" d="M40 6 Q60 4 64 20 Q76 26 70 40 Q66 50 50 46 Q40 54 28 46 Q12 48 10 34 Q4 20 20 16 Q24 4 40 6Z" stroke="#15803D" stroke-width="2.4" fill="#22C55E"/>
  <path class="e041-ink e041-ink-t" pathLength="1" style="transition-delay:.7s" d="M2 64 H78" stroke="#4ADE80" stroke-width="3" fill="none"/>`;
/** Xe buýt đỏ Tom vẽ (nét hiện dần). */
const BUS_PIC = `<path class="e041-ink e041-ink-b" pathLength="1" d="M8 22 H66 Q74 22 74 30 V50 H6 V24 Q6 22 8 22Z" stroke="#991B1B" stroke-width="2" fill="#EF4444"/>
  <path class="e041-ink e041-ink-b" pathLength="1" style="transition-delay:.35s" d="M12 27 H24 V38 H12Z M28 27 H40 V38 H28Z M44 27 H56 V38 H44Z M60 27 H70 V38 H60Z" stroke="${L}" stroke-width="1" fill="#BAE6FD"/>
  <path class="e041-ink e041-ink-b" pathLength="1" style="transition-delay:.7s" d="M14 50 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0 M60 50 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0" stroke="${L}" stroke-width="1.6" fill="#1F2937"/>`;

/** Khung "đang đi làm" (bố / mẹ), góc trên trái (x, y), 136 × 80. */
const workPanel = (x, y, cls, inner, title) => `<g class="e041-pop ${cls}"><g transform="translate(${x} ${y})">
  <rect x="0" y="0" width="136" height="80" rx="8" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <rect x="4" y="4" width="128" height="72" rx="5" fill="#E0F2FE"/>${inner}
  <rect x="34" y="-10" width="68" height="18" rx="9" fill="#FDE68A" stroke="${L}"/><text x="68" y="4" text-anchor="middle" ${F} font-size="11" fill="#92400E">${title}</text></g></g>`;

const POSES = {
  e041_fan: { R: [112, 214], L: [22, -40], dy: 20 },
  e041_yawn: { R: [150, 250], L: [168, 182], head: -6 },
  e041_sitRaise: { R: [160, 178], L: [22, -40], dy: 20 },
  e041_sitThink: { R: [30, -150], L: [22, -40], dy: 20, head: 8 },
};
const PROPS = { e041_fan: FAN };

/** Nhãn hiện / ẩn theo trạng thái st-NAME (class e041-NAME). */
const LBS = ['yest', 'allday', 'friends', 'hot', 'quiet', 'maths', 'easy', 'diff', 'lunch', 'yum', 'art', 'fun', 'tree', 'bus', 'lib', 'work', 'home', 'tired', 'happy'];
const lb = (name, inner) => `<g class="e041-lb e041-${name}">${inner}</g>`;

function bg() {
  return `
  ${sky(0, 3500, 315, 'e041sky')}
  ${cloud(80, 56, 0.9, 0)}${cloud(470, 70, 0.8, 2)}${cloud(2500, 60, 0.8, 1)}${cloud(2980, 50, 0.7, 3)}
  <!-- Mặt trời đi một vòng trên trường (all day), sau mái trường -->
  <g class="e041-sun">${sun(20)}</g>
  <!-- Cổng trường + sân -->
  <path d="M0 232 Q160 206 330 226 T560 222 V282 H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(30, 240, 0.8)}${tree(500, 236, 0.75, '#F59E0B')}
  ${schoolFront(230, FLOOR)}
  <rect x="0" y="${FLOOR - 4}" width="560" height="40" fill="#E7E5E4" stroke="${L}"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${30 + i * 62} ${FLOOR - 4} V315" stroke="#D6D3D1"/>`).join('')}
  <!-- Lịch: TUESDAY lật ngược về MONDAY -->
  <g transform="translate(410 0)">
    <path d="M-4 ${FLOOR} V176" stroke="#78716C" stroke-width="4"/>
    <rect x="-46" y="84" width="92" height="92" rx="6" fill="#fff" stroke="${L}" stroke-width="1.4"/>
    <rect x="-46" y="84" width="92" height="20" rx="6" fill="#EF4444" stroke="${L}" stroke-width="1.4"/>
    <circle cx="-26" cy="84" r="3.4" fill="#1F2937"/><circle cx="26" cy="84" r="3.4" fill="#1F2937"/>
    <text x="0" y="99" text-anchor="middle" ${F} font-size="11" fill="#fff">MAY</text>
    <text x="0" y="136" text-anchor="middle" ${F} font-size="15" fill="#2563EB">MONDAY</text>
    <text x="0" y="164" text-anchor="middle" ${F} font-size="24" fill="#1F2937">12</text>
    <g transform="translate(0 104)"><g class="e041-pageT">
      <rect x="-44" y="0" width="88" height="70" fill="#FEFCE8" stroke="${L}" stroke-width="1"/>
      <text x="0" y="30" text-anchor="middle" ${F} font-size="14" fill="#64748B">TUESDAY</text>
      <text x="0" y="58" text-anchor="middle" ${F} font-size="24" fill="#94A3B8">13</text></g></g>
  </g>
  ${lb('yest', `<g transform="translate(410 60)">${label(0, 0, 'yesterday', '#B45309', 16)}</g>
    <path d="M466 128 q22 -6 22 -30 q0 -16 -14 -24" stroke="#F97316" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M468 70 l8 3 l-5 7" stroke="#F97316" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`)}
  ${lb('allday', `<path d="M90 120 Q230 0 370 120" stroke="#FBBF24" stroke-width="2" stroke-dasharray="5 6" fill="none"/>${label(64, 150, 'all day', '#B45309', 15)}`)}
  ${lb('friends', label(250, 160, 'friends', '#7C3AED', 16))}
  <!-- Lớp học -->
  ${room(560, 760, FLOOR, '#FEF9C3')}
  ${doorway(560, FLOOR)}
  ${board(680, 70, 180, 90, '')}
  <g class="e041-boardM"><text x="770" y="104" text-anchor="middle" ${F} font-size="22" fill="#FDE047">MATHS</text>
    <text x="770" y="140" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="18" fill="#F8FAFC">2 + 3 = ?</text></g>
  ${lb('maths', label(770, 190, '1st lesson', '#1D4ED8', 14))}
  <!-- hai cửa sổ có cánh (mở khi nóng) -->
  ${[950, 1100].map((x) => `<g transform="translate(${x} 52)"><rect x="-4" y="-4" width="88" height="78" rx="3" fill="#fff" stroke="${L}" stroke-width="1.3"/>
    <rect x="0" y="0" width="80" height="70" fill="#BAE6FD"/><path d="M0 52 Q30 42 80 50 V70 H0Z" fill="#86EFAC"/>
    <g class="e041-shL"><rect x="0" y="0" width="40" height="70" fill="#E0F2FE" stroke="${L}" stroke-width="1"/><path d="M6 6 H34 V64 H6Z" fill="none" stroke="#fff" stroke-width="2"/></g>
    <g transform="translate(80 0)"><g class="e041-shR"><rect x="-40" y="0" width="40" height="70" fill="#E0F2FE" stroke="${L}" stroke-width="1"/><path d="M-34 6 H-6 V64 H-34Z" fill="none" stroke="#fff" stroke-width="2"/></g></g>
    <g class="e041-curtain"><path d="M-6 -6 Q4 30 -2 76 L-12 76 Q-8 30 -14 -6Z" fill="#F9A8D4" stroke="${L}" stroke-width="0.8"/></g></g>`).join('')}
  <!-- nhiệt kế -->
  <g transform="translate(1066 56)"><rect x="-7" y="0" width="14" height="64" rx="7" fill="#fff" stroke="${L}" stroke-width="1.2"/><circle cx="0" cy="66" r="9" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    <g transform="translate(0 62)"><g class="e041-merc"><rect x="-3" y="-40" width="6" height="40" rx="3" fill="#EF4444"/></g></g>
    ${[12, 24, 36, 48].map((y) => `<path d="M3 ${y} h4" stroke="${L}" stroke-width="0.8"/>`).join('')}</g>
  ${lb('hot', `${label(1066, 160, 'very hot', '#DC2626', 15)}<g class="e041-heat">${[1000, 1060, 1120].map((x) => `<path d="M${x} 196 q-6 -8 0 -16 q6 -8 0 -16" stroke="#FB923C" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join('')}</g>`)}
  ${lb('quiet', `${label(1010, 150, 'quiet', '#0F766E', 15)}${label(1150, 150, 'good', '#15803D', 15)}`)}
  ${thought(990, 110, 108, 58, `<text x="0" y="-2" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="16" fill="#1F2937">2 + 3 = 5</text><path d="M40 -12 l5 6 l9 -12" stroke="#16A34A" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, [1030, 166], 'e041-bub e041-bubM')}
  ${thought(1162, 106, 92, 58, `<text x="0" y="12" text-anchor="middle" ${F} font-size="34" fill="#DC2626">?</text><text x="-24" y="-6" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="13" fill="#94A3B8">2+3</text>`, [1112, 166], 'e041-bub e041-bubT')}
  ${lb('easy', label(990, 62, 'easy', '#16A34A', 17))}
  ${lb('diff', label(1162, 62, 'difficult', '#DC2626', 17))}
  ${doorway(1320, FLOOR)}
  <!-- Nhà ăn -->
  ${room(1332, 488, FLOOR, '#FFEDD5', '#C08B5C')}
  <rect x="1500" y="40" width="170" height="30" rx="6" fill="#fff" stroke="${L}" stroke-width="1.2"/><text x="1585" y="61" text-anchor="middle" ${F} font-size="17" fill="#C2410C">CANTEEN</text>
  ${windowBox(1370, 86, 80, 70)}${windowBox(1730, 86, 70, 70)}
  ${lb('lunch', label(1585, 110, 'lunch', '#B45309', 15))}
  ${lb('yum', label(1585, 140, 'delicious!', '#DB2777', 17))}
  ${doorway(1820, FLOOR)}
  <!-- Phòng mỹ thuật -->
  ${room(1832, 600, FLOOR, '#EDE9FE')}
  ${[[1880, '#FDE68A'], [2120, '#BBF7D0'], [2360, '#FBCFE8']].map(([x, c], i) => `<g transform="translate(${x} 50)"><rect x="-24" y="0" width="48" height="36" fill="${c}" stroke="${L}" stroke-width="1.2"/>
    ${i === 0 ? `<circle cx="-6" cy="16" r="7" fill="#F59E0B"/><path d="M-20 32 L-4 20 L8 28 L20 18 V32Z" fill="#22C55E"/>` : i === 1 ? `<path d="M-14 28 Q0 4 14 28Z" fill="#60A5FA"/><circle cx="12" cy="10" r="5" fill="#FACC15"/>` : `<circle cx="0" cy="18" r="9" fill="#F472B6"/><circle cx="-12" cy="22" r="5" fill="#A855F7"/><circle cx="12" cy="22" r="5" fill="#FB923C"/>`}</g>`).join('')}
  ${shelf(2230, 140, 90, `<g transform="translate(2250 132)">${PAINT}</g><g transform="translate(2290 132)">${PAINT}</g>`)}
  ${lb('art', `<rect x="2060" y="104" width="104" height="26" rx="6" fill="#fff" stroke="${L}" stroke-width="1.2"/><text x="2112" y="123" text-anchor="middle" ${F} font-size="15" fill="#7C3AED">ART</text>`)}
  ${lb('fun', label(2112, 152, 'fun!', '#DB2777', 18))}
  ${easel(2030, TREE_PIC)}${easel(2240, BUS_PIC)}
  ${lb('tree', label(2030, 132, 'a big green tree', '#15803D', 13))}
  ${lb('bus', label(2240, 132, 'a red bus', '#DC2626', 14))}
  ${doorway(2432, FLOOR)}
  <!-- Phố (giữa trường và thư viện) -->
  <rect x="2432" y="${FLOOR - 4}" width="1068" height="40" fill="#E5E7EB" stroke="${L}"/>${Array.from({ length: 17 }, (_, i) => `<path d="M${2460 + i * 62} ${FLOOR - 4} V315" stroke="#D1D5DB"/>`).join('')}
  ${tree(2500, FLOOR - 4, 0.85)}
  <!-- Thư viện -->
  ${room(2570, 320, FLOOR, '#E0F2FE', '#C08B5C')}
  ${doorway(2570, FLOOR)}
  <rect x="2650" y="48" width="160" height="30" rx="6" fill="#1D4ED8" stroke="${L}" stroke-width="1.2"/><text x="2730" y="69" text-anchor="middle" ${F} font-size="16" fill="#fff">LIBRARY</text>
  ${shelf(2600, 132, 110, books(2604, 132, 11))}${shelf(2600, 172, 110, books(2608, 172, 10))}${shelf(2600, 212, 110, books(2604, 212, 11))}
  ${shelf(2770, 132, 100, books(2774, 132, 10))}${shelf(2770, 172, 100, books(2778, 172, 9))}
  ${lb('lib', label(2730, 100, 'after school', '#1D4ED8', 13))}
  ${doorway(2890, FLOOR)}
  <!-- khoảng trời giữa thư viện và nhà: hai khung bố mẹ đi làm -->
  ${bush(2930, FLOOR - 2, 0.8)}${flowerAt(3010, FLOOR - 4)}${flowerAt(3024, FLOOR - 2, '#FACC15')}
  ${workPanel(2912, 54, 'e041-pM', `<rect x="66" y="12" width="58" height="34" fill="#166534" stroke="${L}" stroke-width="0.8"/><text x="95" y="34" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="11" fill="#fff">A B C</text>${person(40, 76, 'en_mum', 'point', { s: 0.36 })}`, 'Mum: at work')}
  ${workPanel(2912, 150, 'e041-pD', `<rect x="78" y="14" width="40" height="34" rx="3" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M94 20 h8 v8 h8 v8 h-8 v8 h-8 v-8 h-8 v-8 h8Z" fill="#EF4444"/>${person(40, 76, 'en_dad', 'stand', { s: 0.36 })}<circle cx="40" cy="44" r="3" fill="none" stroke="#475569" stroke-width="1.2"/>`, 'Dad: at work')}
  <!-- Nhà Minh -->
  ${room(3080, 420, FLOOR, '#FEF3C7')}
  ${doorway(3080, FLOOR)}
  ${lb('work', `<path d="M3054 140 q30 -10 40 14" stroke="#F97316" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M3088 148 l6 8 l4 -10" stroke="#F97316" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${label(3080, 120, 'so', '#C2410C', 14)}`)}
  ${windowBox(3330, 64, 100, 80)}
  <g transform="translate(3150 84)"><rect x="-24" y="-30" width="48" height="36" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    ${person(-10, 4, 'en_minh_home', 'stand', { s: 0.24 })}${person(8, 4, 'en_lan_home', 'stand', { s: 0.26 })}</g>
  ${rug(3310, FLOOR, 200, '#FDE68A')}
  <g transform="translate(3280 0)"><rect x="-70" y="200" width="140" height="44" rx="12" fill="#60A5FA" stroke="${L}" stroke-width="1.2"/>
    <rect x="-62" y="234" width="124" height="16" rx="6" fill="#93C5FD" stroke="${L}"/></g>
  ${lb('home', label(3290, 76, 'at home', '#B45309', 15))}
  ${lb('tired', label(3100, 128, 'tired', '#64748B', 16))}
  ${lb('happy', label(3196, 128, 'happy', '#DB2777', 16))}
`;
}

function fg() {
  return `
  ${desk(960, FLOOR)}${desk(1035, FLOOR, '#FB923C')}${desk(1110, FLOOR)}${desk(1185, FLOOR, '#FB923C')}
  <!-- bàn giáo viên -->
  <g transform="translate(870 0)"><rect x="-34" y="226" width="68" height="56" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="-38" y="220" width="76" height="8" rx="2" fill="#92400E" stroke="${L}"/>
    <g transform="translate(-16 214)"><rect x="-10" y="-6" width="20" height="8" fill="#3B82F6" stroke="${L}" stroke-width="0.7"/><rect x="-9" y="-11" width="18" height="6" fill="#F59E0B" stroke="${L}" stroke-width="0.7"/></g></g>
  <!-- bàn ăn -->
  <g transform="translate(1595 0)"><rect x="-150" y="242" width="12" height="40" fill="#92400E" stroke="${L}"/><rect x="138" y="242" width="12" height="40" fill="#92400E" stroke="${L}"/>
    <rect x="-160" y="232" width="320" height="12" rx="3" fill="#F59E0B" stroke="${L}" stroke-width="1.2"/></g>
  ${SEATS.map((x) => `<g class="e041-food"><g transform="translate(${x - 14} 224)">${RICE}</g><g transform="translate(${x + 17} 228)">${FISH_PLATE}</g></g>`).join('')}
  <g class="e041-steam">${SEATS.map((x) => steam(x - 18, 208)).join('')}</g>
  <!-- bàn thư viện -->
  <g transform="translate(2790 0)"><rect x="-56" y="230" width="10" height="52" fill="#92400E" stroke="${L}"/><rect x="46" y="230" width="10" height="52" fill="#92400E" stroke="${L}"/>
    <rect x="-64" y="222" width="128" height="9" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
    <g transform="translate(36 214)"><rect x="-10" y="-6" width="20" height="8" fill="#22C55E" stroke="${L}" stroke-width="0.7"/><rect x="-9" y="-12" width="18" height="6" fill="#EF4444" stroke="${L}" stroke-width="0.7"/></g></g>
  <!-- mặt trước sô-pha -->
  <g transform="translate(3280 0)"><rect x="-76" y="240" width="152" height="34" rx="10" fill="#3B82F6" stroke="${L}" stroke-width="1.2"/>
    <rect x="-82" y="214" width="18" height="60" rx="8" fill="#60A5FA" stroke="${L}"/><rect x="64" y="214" width="18" height="60" rx="8" fill="#60A5FA" stroke="${L}"/></g>`;
}

const CSS = `
.e041-lb { opacity: 0; transition: opacity .35s; }
${LBS.map((n) => `.st-${n} .e041-${n}`).join(', ')} { opacity: 1; }
.e041-pageT { transform-origin: 0 0; transition: transform .7s cubic-bezier(.5,0,.3,1), opacity .7s; }
.st-mon .e041-pageT { transform: translateY(-34px) scaleY(0); opacity: 0; }
.e041-boardM { opacity: 0; transition: opacity .4s; } .st-maths .e041-boardM, .st-boardM .e041-boardM { opacity: 1; }
.e041-shL, .e041-shR { transition: transform .8s cubic-bezier(.3,1.3,.6,1); }
.st-open .e041-shL { transform: scaleX(-.35); } .st-open .e041-shR { transform: scaleX(-.35); }
.e041-curtain { transform-origin: -10px -6px; } .st-open .e041-curtain { animation: e041Flap 1s ease-in-out infinite alternate; }
@keyframes e041Flap { from { transform: rotate(0); } to { transform: rotate(-12deg); } }
.e041-merc { transform: scaleY(.35); transition: transform 1.4s ease-out; } .st-hotT .e041-merc { transform: scaleY(1); }
.e041-heat { animation: e041Heat .8s ease-in-out infinite alternate; } @keyframes e041Heat { to { transform: translateY(-5px); } }
.e041-bub { opacity: 0; transition: opacity .35s; } .st-easy .e041-bubM, .st-diff .e041-bubT { opacity: 1; }
.e041-food { opacity: 0; transition: opacity .4s; } .st-food .e041-food { opacity: 1; }
.e041-steam { opacity: 0; transition: opacity .4s; } .st-food .e041-steam { opacity: 1; }
.st-ate .e041-steam { opacity: 0; }
.e041-ink { opacity: 0; stroke-dasharray: 1; stroke-dashoffset: 1; fill-opacity: 0; transition: opacity .1s, stroke-dashoffset 1s ease-out, fill-opacity .5s .7s; }
.st-tree .e041-ink-t, .st-bus .e041-ink-b, .st-treeK .e041-ink-t, .st-busK .e041-ink-b { opacity: 1; stroke-dashoffset: 0; fill-opacity: 1; }
.e041-pop { opacity: 0; transform: scale(.4); transform-box: fill-box; transform-origin: center; transition: opacity .3s, transform .5s cubic-bezier(.3,1.5,.6,1); }
.st-work .e041-pM, .st-work .e041-pD { opacity: 1; transform: scale(1); }
.e041-pD { transition-delay: .5s; }
.e041-sun { transform: translate(90px, 120px); transition: transform 2.4s cubic-bezier(.4,0,.6,1); }
.st-sun1 .e041-sun { transform: translate(230px, 50px); } .st-sun2 .e041-sun { transform: translate(370px, 120px); }
@media (prefers-reduced-motion: reduce) { .e041-curtain, .e041-heat { animation-duration: 3s; } }
`;

/** Đi cùng lúc nhiều bạn (mảng [id, x]), không để camera theo từng người. */
const walkAll = (st, list, speed = 150) => Promise.all(list.map(([id, x]) => st.walk(id, x, { speed, follow: false })));
const KIDS = ['na', 'minh', 'tom', 'nam']; // thứ tự từ trái sang phải (bàn học, ghế ăn)

const BEATS = [
  { key: ['Yesterday was Monday'], icon: '📅', label: 'Yesterday was Monday', async play(st) {
    st.look(330);
    st.pose('minh', 'point'); st.act('minh', 'point');
    await st.wait(400);
    st.set('st-mon'); st.sfx('page-turn');
    await st.wait(600);
    st.set('st-yest'); st.sfx('pop', { vol: 0.7 }); st.mood('minh', 'joy');
    await st.wait(1200);
    st.act('minh', null); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['at school all day'], icon: '🏫', label: 'at school all day', async play(st) {
    st.set('st-yest', false);
    await st.walk('minh', 230, { speed: 130, follow: false });
    st.set('st-allday'); st.sfx('pop', { vol: 0.7 });
    st.set('st-sun1'); st.sfx('birds', { vol: 0.5 });
    await st.wait(1300);
    st.set('st-sun2');
    await st.wait(1300);
  } },
  { key: ['His friends were there too'], icon: '👫', label: 'friends', async play(st) {
    st.set('st-allday', false);
    st.show('tom', true); st.show('na', true); st.show('nam', true);
    await walkAll(st, [['tom', 290], ['na', 130], ['nam', 350]], 200);
    st.set('st-friends'); st.sfx('pop', { vol: 0.7 });
    for (const id of KIDS) { st.pose(id, 'wave'); st.act(id, 'wave'); st.mood(id, 'joy'); }
    st.sfx('giggle', { vol: 0.7 });
    await st.wait(1400);
    for (const id of KIDS) { st.act(id, null); st.pose(id, 'stand'); st.mood(id, 'happy'); }
  } },
  { key: ['very hot', 'windows were open'], icon: '🥵', label: 'very hot', async play(st) {
    st.set('st-friends', false);
    await Promise.all([walkAll(st, [['na', 960], ['minh', 1035], ['tom', 1110], ['nam', 1185]], 260), st.look(1060, { dur: 2600 })]);
    for (const id of KIDS) { st.pose(id, 'e041_fan'); st.hold(id, 'e041_fan'); st.act(id, 'e041-fan'); st.mood(id, 'sad'); }
    st.bag('minh', false); st.sfx('bag-on', { vol: 0.5 }); st.set('st-hotT'); st.set('st-hot'); st.sfx('pop', { vol: 0.6 });
    await st.wait(1100);
    st.set('st-open'); st.sfx('window-open'); st.sfx('wind', { vol: 0.5 });
    await st.wait(1000);
    for (const id of KIDS) st.mood(id, 'happy');
  } },
  { key: ['Ms Hoa was happy', 'quiet and good'], icon: '😊', label: 'quiet and good', async play(st) {
    st.set('st-hot', false);
    for (const id of KIDS) { st.act(id, null); st.hold(id, null); st.pose(id, 'sitDesk'); st.mood(id, 'happy'); }
    st.look(990);
    st.mood('hoa', 'joy'); st.pose('hoa', 'clap'); st.act('hoa', 'clap'); st.sfx('clap', { vol: 0.7 });
    await st.wait(500);
    st.set('st-quiet');
    KIDS.forEach((id, i) => st.fx('sparkle', 960 + i * 75, 168));
    st.fx('hearts', 890, 110);
    await st.wait(1600);
    st.act('hoa', null); st.pose('hoa', 'stand');
  } },
  { key: ['The first lesson was maths'], icon: '➗', label: 'maths', async play(st) {
    st.set('st-quiet', false);
    st.look(880); st.sfx('school-bell', { vol: 0.5 });
    st.pose('hoa', 'point'); st.act('hoa', 'point'); st.mood('hoa', 'happy');
    await st.wait(500);
    st.set('st-maths'); st.sfx('pencil', { vol: 0.6 });
    await st.wait(1500);
    st.act('hoa', null);
  } },
  { key: ['easy for Minh', 'difficult for Tom'], icon: '🤔', label: 'easy / difficult', async play(st) {
    st.set('st-maths', false); st.set('st-boardM');
    st.pose('hoa', 'stand');
    st.look(1020);
    st.set('st-easy'); st.sfx('pop', { vol: 0.7 }); st.mood('minh', 'joy'); st.pose('minh', 'e041_sitRaise');
    await st.wait(350); st.sfx('ding', { vol: 0.7 });
    await st.wait(950);
    st.set('st-diff'); st.sfx('pop', { vol: 0.7 }); st.mood('tom', 'sad'); st.pose('tom', 'e041_sitThink');
    await st.wait(400); st.sfx('buzz-no', { vol: 0.5 });
    await st.wait(1500);
  } },
  { key: ['rice and fish were delicious'], icon: '🍚', label: 'rice and fish', async play(st) {
    st.set('st-easy', false); st.set('st-diff', false);
    st.mood('tom', 'happy'); st.mood('minh', 'happy');
    await Promise.all([walkAll(st, KIDS.map((id, i) => [id, SEATS[i]]), 230), st.look(1590, { dur: 2400 })]);
    st.set('st-lunch'); st.set('st-food'); st.sfx('bowl-down');
    for (const id of KIDS) { st.pose(id, 'eat'); st.hold(id, 'chopsticks'); }
    await st.wait(300);
    for (const id of KIDS) { st.act(id, 'eat'); st.mood(id, 'joy'); }
    st.sfx('crunch', { vol: 0.5 });
    st.set('st-yum');
    st.fx('hearts', 1595, 130);
    await st.wait(1600);
    for (const id of KIDS) st.act(id, null);
  } },
  { key: ['the art lesson was fun'], icon: '🎨', label: 'art lesson', async play(st) {
    st.set('st-lunch', false); st.set('st-yum', false); st.set('st-ate'); st.set('st-food', false);
    for (const id of KIDS) { st.hold(id, null); st.mood(id, 'happy'); }
    await Promise.all([walkAll(st, [['minh', 1966], ['tom', 2176], ['na', 1900], ['nam', 2330]], 230), st.look(2110, { dur: 2400 })]);
    st.set('st-art');
    st.hold('minh', 'paintbrush'); st.pose('minh', 'paint'); st.act('minh', 'paint');
    st.hold('tom', 'paintbrush'); st.pose('tom', 'paint'); st.act('tom', 'paint');
    st.pose('na', 'cheer'); st.act('na', 'hop'); st.pose('nam', 'clap'); st.act('nam', 'clap'); st.sfx('clap', { vol: 0.6 });
    for (const id of KIDS) st.mood(id, 'joy');
    await st.wait(500);
    st.set('st-fun'); st.fx('sparkle', 2112, 170);
    await st.wait(1500);
    st.act('na', null); st.act('nam', null); st.pose('na', 'stand'); st.pose('nam', 'stand');
  } },
  { key: ['big green tree'], icon: '🌳', label: 'a big green tree', async play(st) {
    st.set('st-art', false); st.set('st-fun', false);
    st.look(2040);
    st.act('tom', null);
    st.act('minh', 'paint'); st.set('st-tree'); st.sfx('pencil', { vol: 0.6 });
    await st.wait(1600);
    st.act('minh', null); st.mood('minh', 'joy');
    st.fx('sparkle', 2030, 186);
    await st.wait(700);
  } },
  { key: ['a red bus'], icon: '🚌', label: 'a red bus', async play(st) {
    st.set('st-tree', false); st.set('st-treeK');
    st.look(2200);
    st.act('tom', 'paint'); st.set('st-bus'); st.sfx('pencil', { vol: 0.6 });
    await st.wait(1600);
    st.act('tom', null); st.mood('tom', 'joy');
    st.fx('sparkle', 2240, 186);
    st.pose('nam', 'point'); st.act('nam', 'point');
    await st.wait(700);
    st.act('nam', null); st.pose('nam', 'stand');
  } },
  { key: ['Lan was at the library'], icon: '📚', label: 'at the library', async play(st) {
    st.set('st-bus', false); st.set('st-busK');
    st.hold('minh', null); st.pose('minh', 'stand'); st.hold('tom', null); st.pose('tom', 'stand');
    st.pose('tom', 'wave'); st.act('tom', 'wave');
    st.bag('minh', true); st.sfx('bag-on');
    await st.walk('minh', 2650, { speed: 190, lead: 60 });
    st.act('tom', null);
    st.set('st-lib');
    st.act('lan', null); st.chest('lan', null); st.pose('lan', 'sitWave'); st.act('lan', 'wave'); st.mood('lan', 'joy');
    st.pose('minh', 'wave'); st.act('minh', 'wave'); st.mood('minh', 'joy');
    await st.wait(1500);
    st.act('lan', null); st.act('minh', null); st.pose('minh', 'stand');
    st.pose('lan', 'read'); st.chest('lan', 'book'); st.act('lan', 'read'); st.sfx('page-turn', { vol: 0.7 });
  } },
  { key: ['Mum and Dad were at work', 'Grandma was at home with Lucky'], icon: '🏠', label: 'at work / at home', async play(st) {
    st.set('st-lib', false);
    await st.look(3060, { dur: 1100 });
    st.set('st-work'); st.sfx('pop', { vol: 0.7 });
    await st.wait(500); st.sfx('pop', { vol: 0.7, rate: 1.15 });
    await st.wait(800);
    st.set('st-home');
    await st.look(3250, { dur: 700 });
    st.pose('grandma', 'sitWave'); st.act('grandma', 'wave'); st.mood('grandma', 'joy');
    st.act('lucky', 'wag'); st.mood('lucky', 'joy'); st.sfx('giggle', { vol: 0.5 });
    await st.wait(1200);
    st.act('grandma', null); st.pose('grandma', 'sit');
  } },
  { key: ['tired but happy'], icon: '😴', label: 'tired but happy', async play(st) {
    st.set('st-work', false); st.set('st-home', false);
    st.act('lan', null);
    await st.walk('minh', 3150, { speed: 170, lead: 40 });
    st.pose('minh', 'e041_yawn'); st.mood('minh', 'shut');
    st.set('st-tired'); st.fx('zzz', 3164, 150);
    await st.wait(1300);
    st.pose('minh', 'cheer'); st.mood('minh', 'joy'); st.act('minh', 'hop');
    st.set('st-happy'); st.fx('hearts', 3170, 140);
    st.dog('lucky', 'stand'); st.act('lucky', 'jump'); st.sfx('dog-bark', { vol: 0.6 });
    await st.wait(1300);
    st.act('minh', null); st.act('lucky', null);
  } },
];

export default {
  id: 'en041', worldW: 3500, floor: FLOOR, viewTop: 40, camStart: 90, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: 3266, s: 0.9 },
    { id: 'lucky', kind: 'dog', x: 3410, s: 0.85, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 2780, s: 1.08 },
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 900, s: 0.95, face: -1 },
    { id: 'na', kind: 'kid', who: 'e041_na', x: -60, s: 0.98 },
    { id: 'nam', kind: 'kid', who: 'e041_nam', x: -110, s: 0.96 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: -20 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 300 },
  ],
  init(st) {
    st.show('tom', false); st.show('na', false); st.show('nam', false);
    st.bag('minh', true);
    st.pose('lan', 'read'); st.chest('lan', 'book');
    st.pose('grandma', 'sit'); st.dog('lucky', 'sit');
  },
};
