/**
 * Bài 48 "The Tallest Tree" (so sánh nhất): phòng Minh (cuốn sách mới) → cổng sách mở ra thế giới kỷ lục, trái sang phải:
 * cây cao nhất ở Mỹ (cạnh nhà và cây thường cùng tỉ lệ) → biển: cá voi xanh dưới cầu, ba xe buýt xếp trên cầu → đồng cỏ: báo
 * đua với ngựa vằn và sư tử → bảng bản đồ châu Phi (sông Nin) → vịnh Hạ Long → cổng sách thứ hai về phòng khách (Lan, Lucky
 * nằm ngủ trên thảm). Trang chim nhỏ nhất hiện thành khung tranh có thước 0–5 cm.
 * Mỗi kỷ lục có vật so sánh cùng tỉ lệ: cây 2,1 đơn vị = 1 m (cây 110 m, nhà 7 m, cây thường 10 m); cá voi 10 đơn vị = 1 m
 * (cá voi 32 m, xe buýt 10 m); chim 20 đơn vị = 1 cm.
 * Toạ độ cảnh: rộng 3300, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, sky, cloud, room, windowBox, shelf, books, rug, label } from '../kit.js';
import { BOOK } from '../rig.js';

const FLOOR = 282;
const HBOOK = `<g transform="translate(0 16)">${BOOK}</g>`; // sách cầm thấp hơn để không che mặt
const HILL = 262; // mặt đất ở xa (gốc cây, đường đua)
const T = (x, y, s, c, t, w = 900) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="${w}" font-size="${s}" fill="${c}">${t}</text>`;
const limb = (x, y1, y2, w, c, cls = '') => `<g class="${cls}" style="transform-origin:${x}px ${y1}px"><path d="M${x} ${y1} V${y2}" stroke="${L}" stroke-width="${w + 1.8}" stroke-linecap="round"/><path d="M${x} ${y1} V${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/></g>`;

// ── Hình riêng ───────────────────────────────────────────────────────────
const karst = (x, y, s = 1, c = '#4D9A6A') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-16 0 Q-20 -22 -12 -36 Q-6 -48 2 -42 Q12 -34 9 -18 Q14 -8 17 0Z" fill="${c}" stroke="${L}" stroke-width="0.9"/>
  <path d="M-8 -30 Q-4 -20 -6 -8 M4 -32 Q6 -22 4 -12" stroke="#2F6B48" stroke-width="1" fill="none"/></g>`;
/** Cây thường nhỏ xíu (10 m ở tỉ lệ 2,1 đơn vị / m). */
const miniTree = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-1.2" y="-8" width="2.4" height="8" fill="#A16207"/><circle cy="-14" r="7" fill="#22C55E" stroke="${L}" stroke-width="0.5"/></g>`;
const miniHouse = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-10 -9 L0 -16 L10 -9Z" fill="#EF4444" stroke="${L}" stroke-width="0.5"/><rect x="-8" y="-9" width="16" height="9" fill="#FEF3C7" stroke="${L}" stroke-width="0.5"/></g>`;
const REDWOOD = (x, y) => `<g transform="translate(${x} ${y})">
  <path d="M-11 0 L-6 -150 L6 -150 L11 0Z" fill="#9A3412" stroke="${L}" stroke-width="1.1"/><path d="M-3 -10 V-140 M3 -20 V-130" stroke="#7C2D12" stroke-width="1"/>
  <g class="e048-sway">${[[-214, 14], [-195, 22], [-174, 28], [-152, 32], [-130, 34], [-108, 30]].map(([yy, w], i) => `<path d="M0 ${yy - 16} L${w} ${yy + 14} Q0 ${yy + 8} ${-w} ${yy + 14}Z" fill="${i % 2 ? '#15803D' : '#166534'}" stroke="${L}" stroke-width="0.9"/>`).join('')}</g></g>`;
const flag = (x, y) => `<g transform="translate(${x} ${y})"><path d="M0 0 V-34" stroke="${L}" stroke-width="1.6"/><rect x="0" y="-34" width="26" height="16" fill="#fff" stroke="${L}" stroke-width="0.8"/>
  ${[0, 1, 2, 3].map((i) => `<rect x="0" y="${-34 + i * 4}" width="26" height="2" fill="#DC2626"/>`).join('')}<rect x="0" y="-34" width="11" height="8" fill="#1D4ED8"/></g>`;
const WHALE = `<g class="e048-whale"><path d="M-160 -10 Q-150 -46 -40 -50 Q90 -54 150 -24 Q168 -14 160 0 Q120 20 -40 18 Q-140 16 -160 -10Z" fill="#3B82F6" stroke="${L}" stroke-width="1.4"/>
  <path d="M-150 4 Q-60 26 120 14 Q150 8 160 0 Q120 20 -40 18 Q-140 16 -150 4Z" fill="#BFDBFE" stroke="${L}" stroke-width="0.8"/>
  ${[-80, -60, -40, -20, 0].map((x) => `<path d="M${x} 12 q20 2 40 0" stroke="#93C5FD" stroke-width="1"/>`).join('')}
  <path d="M-158 -8 L-196 -34 L-186 -6 L-198 18Z" fill="#3B82F6" stroke="${L}" stroke-width="1.2"/>
  <path d="M10 -2 Q20 18 40 22 Q28 4 26 -4Z" fill="#2563EB" stroke="${L}" stroke-width="0.9"/>
  <circle cx="122" cy="-18" r="3.4" fill="#1E3A8A"/><path d="M140 -4 Q150 0 158 -2" stroke="${L}" stroke-width="1" fill="none"/>
  <g class="e048-spout"><path d="M96 -50 Q90 -76 74 -84 M96 -50 Q100 -78 116 -86 M96 -50 V-88" stroke="#E0F2FE" stroke-width="4" fill="none" stroke-linecap="round"/></g></g>`;
const BUS = `<rect x="-48" y="-34" width="96" height="28" rx="5" fill="#FACC15" stroke="${L}" stroke-width="1.1"/>${[-36, -18, 0, 18].map((x) => `<rect x="${x - 7}" y="-30" width="14" height="10" rx="2" fill="#BAE6FD" stroke="${L}" stroke-width="0.6"/>`).join('')}
  <rect x="30" y="-30" width="14" height="20" rx="2" fill="#BAE6FD" stroke="${L}" stroke-width="0.6"/><path d="M-48 -14 H48" stroke="#EA580C" stroke-width="1.6"/>
  ${[-30, 30].map((x) => `<circle cx="${x}" cy="-5" r="6" fill="#1F2937" stroke="${L}"/><circle cx="${x}" cy="-5" r="2.2" fill="#CBD5E1"/>`).join('')}`;
const CHEETAH = `<g class="e048-cbody"><path d="M-26 -30 Q-46 -28 -52 -12" stroke="${L}" stroke-width="4.6" fill="none" stroke-linecap="round"/><path d="M-26 -30 Q-46 -28 -52 -12" stroke="#FBBF24" stroke-width="3" fill="none" stroke-linecap="round"/>
  ${limb(-18, -24, -1, 3.4, '#F59E0B', 'e048-l1')}${limb(16, -24, -1, 3.4, '#F59E0B', 'e048-l2')}
  <ellipse cx="0" cy="-28" rx="27" ry="9" fill="#FBBF24" stroke="${L}" stroke-width="1"/>
  ${[[-16, -30], [-8, -25], [-2, -32], [6, -26], [12, -31], [18, -26], [-12, -22]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#1F2937"/>`).join('')}
  ${limb(-10, -24, -1, 3.6, '#FBBF24', 'e048-l2')}${limb(22, -24, -1, 3.6, '#FBBF24', 'e048-l1')}
  <circle cx="30" cy="-34" r="8.4" fill="#FBBF24" stroke="${L}" stroke-width="1"/><path d="M25 -41 l-1 -5 l5 3Z" fill="#FBBF24" stroke="${L}" stroke-width="0.7"/>
  <circle cx="33" cy="-36" r="1.5" fill="#1F2937"/><path d="M33 -34 q-1 5 2 8" stroke="#1F2937" stroke-width="1" fill="none"/><circle cx="38" cy="-32" r="1.3" fill="#1F2937"/></g>`;
const ZEBRA = `<g class="e048-cbody">${limb(-20, -34, -2, 4.4, '#E5E7EB', 'e048-l1')}${limb(14, -34, -2, 4.4, '#E5E7EB', 'e048-l2')}
  <ellipse cx="-2" cy="-40" rx="29" ry="13" fill="#fff" stroke="${L}" stroke-width="1.1"/>${[-22, -14, -6, 2, 10, 18].map((x) => `<path d="M${x} -52 q2 10 0 22" stroke="#1F2937" stroke-width="2.6" fill="none"/>`).join('')}
  ${limb(-12, -34, -2, 4.6, '#fff', 'e048-l2')}${limb(22, -34, -2, 4.6, '#fff', 'e048-l1')}
  <path d="M18 -48 L32 -64 L42 -60 L30 -36Z" fill="#fff" stroke="${L}" stroke-width="1"/><path d="M22 -50 l10 -10 M26 -44 l10 -10" stroke="#1F2937" stroke-width="2.2"/><path d="M30 -66 L20 -50" stroke="#1F2937" stroke-width="3.4"/>
  <g transform="translate(42 -62) rotate(20)"><ellipse rx="10" ry="6" fill="#fff" stroke="${L}" stroke-width="1"/><ellipse cx="7" cy="1" rx="4" ry="4" fill="#374151"/><circle cx="-1" cy="-2" r="1.4" fill="#1F2937"/></g></g>`;
const LION = `<g class="e048-cbody"><path d="M-28 -36 Q-44 -34 -46 -20" stroke="#D97706" stroke-width="3" fill="none"/><circle cx="-46" cy="-19" r="3" fill="#92400E"/>
  ${limb(-20, -28, -2, 5, '#D97706', 'e048-l1')}${limb(14, -28, -2, 5, '#D97706', 'e048-l2')}
  <ellipse cx="-2" cy="-34" rx="30" ry="12" fill="#F59E0B" stroke="${L}" stroke-width="1.1"/>
  ${limb(-12, -28, -2, 5.4, '#F59E0B', 'e048-l2')}${limb(22, -28, -2, 5.4, '#F59E0B', 'e048-l1')}
  <circle cx="30" cy="-44" r="15" fill="#B45309" stroke="${L}" stroke-width="1"/><circle cx="33" cy="-42" r="9" fill="#F59E0B" stroke="${L}" stroke-width="0.9"/><circle cx="36" cy="-44" r="1.4" fill="#1F2937"/><ellipse cx="41" cy="-39" rx="2" ry="1.4" fill="#78350F"/></g>`;
const TROPHY = `<path d="M-8 -10 H8 V-2 Q8 6 0 6 Q-8 6 -8 -2Z" fill="#FACC15" stroke="${L}" stroke-width="0.8"/><path d="M-8 -7 q-6 0 -5 5 q1 3 5 3 M8 -7 q6 0 5 5 q-1 3 -5 3" stroke="${L}" stroke-width="1" fill="none"/><rect x="-2" y="6" width="4" height="4" fill="#EAB308"/><rect x="-6" y="10" width="12" height="3" rx="1" fill="#A16207"/>`;
const MEDAL = (t = '1') => `<path d="M-6 -16 L0 -4 L6 -16" stroke="#2563EB" stroke-width="4" fill="none"/><circle r="8" fill="#FACC15" stroke="${L}" stroke-width="0.9"/>${T(0, 3.6, 10, '#92400E', t)}`;
const BIRD = `<g class="e048-bird"><path d="M10 -2 L52 -6" stroke="#1F2937" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M-40 4 L-58 -2 L-56 10Z" fill="#1D4ED8" stroke="${L}" stroke-width="0.8"/>
  <ellipse cx="-14" cy="2" rx="28" ry="13" fill="#22C55E" stroke="${L}" stroke-width="1.1"/><path d="M-4 10 Q-14 16 -26 12" fill="none" stroke="#86EFAC" stroke-width="3"/>
  <circle cx="6" cy="-4" r="11" fill="#22C55E" stroke="${L}" stroke-width="1.1"/><path d="M2 4 Q8 10 14 4 Q10 0 4 2Z" fill="#EF4444" stroke="${L}" stroke-width="0.6"/>
  <circle cx="9" cy="-7" r="2.6" fill="#1F2937"/><circle cx="9.8" cy="-7.8" r="0.9" fill="#fff"/>
  <g class="e048-wing" style="transform-origin:-14px -6px"><path d="M-14 -6 Q-30 -40 -4 -48 Q2 -26 -6 -6Z" fill="#60A5FA" stroke="${L}" stroke-width="0.9" opacity="0.9"/></g></g>`;
/** Lucky nằm ngủ trên thảm (gốc = bụng chạm sàn, quay phải). */
const LAZY = `<g class="e048-lazy"><path d="M-30 -10 Q-48 -10 -50 -2" stroke="${L}" stroke-width="7.4" fill="none" stroke-linecap="round"/><path d="M-30 -10 Q-48 -10 -50 -2" stroke="#B7794A" stroke-width="5.6" fill="none" stroke-linecap="round"/>
  <ellipse cx="-4" cy="-13" rx="34" ry="13" fill="#B7794A" stroke="${L}" stroke-width="1"/><ellipse cx="-14" cy="-18" rx="9" ry="5" fill="#9C6438"/>
  <ellipse cx="30" cy="-3" rx="16" ry="4.4" fill="#F5E6D3" stroke="${L}" stroke-width="0.8"/>
  <g class="e048-dhead" style="transform-origin:28px -10px"><circle cx="30" cy="-15" r="12" fill="#B7794A" stroke="${L}" stroke-width="1"/><path d="M24 -24 Q14 -22 16 -8 Q22 -8 26 -20Z" fill="#7A4B2A" stroke="${L}" stroke-width="0.8"/>
    <ellipse cx="40" cy="-11" rx="8" ry="6" fill="#F5E6D3" stroke="${L}" stroke-width="0.8"/><ellipse cx="47" cy="-14" rx="3" ry="2.4" fill="#2B1D16"/>
    <path d="M30 -18 q3 2.4 6 0" stroke="#2B1D16" stroke-width="1.3" fill="none" stroke-linecap="round"/><rect x="18" y="-10" width="5" height="10" rx="2" fill="#EF4444" stroke="${L}" stroke-width="0.6"/></g>
  <g class="e048-medal" transform="translate(4 -28)">${MEDAL('1')}</g></g>`;

const lb = (k, x, y, t, c, s = 16) => `<g class="e048-lb e048-lb-${k}">${label(x, y, t, c, s)}</g>`;
/** Cổng sách mở (hai trang đứng), tâm x. */
const bookGate = (x, k) => `<g transform="translate(${x} 0)"><g class="e048-gate e048-gate${k}">
  <path d="M0 ${FLOOR} L0 90 Q-30 70 -64 80 L-64 ${FLOOR - 8} Q-30 ${FLOOR - 18} 0 ${FLOOR}Z" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <path d="M0 ${FLOOR} L0 90 Q30 70 64 80 L64 ${FLOOR - 8} Q30 ${FLOOR - 18} 0 ${FLOOR}Z" fill="#FFFBEB" stroke="${L}" stroke-width="1.4"/>
  ${[110, 130, 150, 170, 190, 210, 230].map((y) => `<path d="M-52 ${y} Q-28 ${y - 8} -10 ${y + 2} M10 ${y + 2} Q30 ${y - 8} 52 ${y}" stroke="#CBD5E1" stroke-width="2" fill="none"/>`).join('')}
  <path d="M-70 ${FLOOR - 6} Q-34 ${FLOOR - 16} 0 ${FLOOR} Q34 ${FLOOR - 16} 70 ${FLOOR - 6} V${FLOOR} H-70Z" fill="#2563EB" stroke="${L}" stroke-width="1.2"/></g></g>`;

function bg() {
  return `
  <!-- PHÒNG MINH -->
  ${room(0, 540, FLOOR, '#DBEAFE')}
  ${windowBox(60, 70, 100, 90)}
  <g transform="translate(110 0)"><rect x="-56" y="${FLOOR - 36}" width="112" height="24" rx="5" fill="#93C5FD" stroke="${L}"/><rect x="-62" y="${FLOOR - 60}" width="12" height="60" rx="4" fill="#1D4ED8" stroke="${L}"/><rect x="-48" y="${FLOOR - 48}" width="28" height="13" rx="6" fill="#fff" stroke="${L}" stroke-width="0.8"/></g>
  ${shelf(330, 110, 150, books(340, 110, 8))}
  ${rug(260, FLOOR, 180, '#A7F3D0')}
  <rect x="540" y="0" width="16" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>

  <!-- THẾ GIỚI KỶ LỤC -->
  ${sky(556, 2184, 315, 'e048sky')}
  ${cloud(760, 64, 0.8, 0)}${cloud(1380, 52, 1, 2)}${cloud(1960, 70, 0.9, 4)}${cloud(2560, 54, 0.8, 1)}
  <path d="M556 236 Q740 206 900 230 T1240 228 V${FLOOR} H556Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <!-- cây cao nhất (Mỹ) -->
  ${REDWOOD(960, HILL + 2)}
  ${miniHouse(1012, HILL)}${miniTree(1034, HILL)}${miniTree(904, HILL)}${miniTree(1060, HILL)}
  ${flag(880, HILL)}<g transform="translate(880 ${HILL - 40})">${T(13, 0, 9, '#1D4ED8', 'USA')}</g>
  <g transform="translate(990 ${HILL})"><g class="e048-measure"><path d="M0 0 V-218" stroke="#DC2626" stroke-width="2.4"/><path d="M-5 -211 L0 -218 L5 -211" stroke="#DC2626" stroke-width="2.4" fill="none"/></g></g>
  <!-- biển + cầu (cá voi, xe buýt) -->
  <rect x="1240" y="210" width="580" height="${FLOOR - 210}" fill="#38BDF8" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: 13 }, (_, i) => `<path d="M${1256 + i * 42} ${226 + (i % 3) * 14} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <rect x="1240" y="180" width="580" height="8" fill="#94A3B8" stroke="${L}"/>${[1290, 1420, 1550, 1680, 1790].map((x) => `<rect x="${x - 4}" y="188" width="8" height="24" fill="#64748B" stroke="${L}" stroke-width="0.6"/>`).join('')}
  <ellipse class="e048-shadow" cx="1520" cy="262" rx="150" ry="12" fill="#0369A1" opacity="0.35"/>
  <g class="e048-ends"><path d="M1356 140 V284 M1686 140 V284" stroke="#DC2626" stroke-width="1.8" stroke-dasharray="5 4"/></g>
  <!-- đồng cỏ -->
  <path d="M1820 240 Q1980 214 2140 236 T2440 232 V${FLOOR} H1820Z" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>
  <rect x="1820" y="${HILL - 6}" width="600" height="${FLOOR - HILL + 6}" fill="#EAB308" opacity="0.35"/>
  <g transform="translate(2010 ${HILL - 4})"><path d="M-3 0 Q-2 -30 0 -50 M0 -40 Q-14 -50 -22 -56 M0 -44 Q12 -52 20 -58" stroke="#78350F" stroke-width="4" fill="none"/><ellipse cx="0" cy="-60" rx="44" ry="10" fill="#65A30D" stroke="${L}"/></g>
  <g class="e048-finish"><path d="M2140 ${HILL} V${HILL - 50}" stroke="${L}" stroke-width="1.6"/>${[0, 1, 2, 3].map((i) => [0, 1].map((j) => `<rect x="${2140 + j * 7}" y="${HILL - 50 + i * 6}" width="7" height="6" fill="${(i + j) % 2 ? '#fff' : '#1F2937'}"/>`).join('')).join('')}</g>
  <!-- bảng bản đồ châu Phi -->
  <g transform="translate(2330 0)">
    <path d="M-50 ${FLOOR} V200 M50 ${FLOOR} V200" stroke="#92400E" stroke-width="6"/>
    <rect x="-74" y="56" width="148" height="148" rx="6" fill="#FEF3C7" stroke="${L}" stroke-width="1.4"/><rect x="-66" y="64" width="132" height="132" rx="3" fill="#7DD3FC"/>
    <path d="M-26 76 Q0 70 26 76 Q34 88 44 98 Q58 100 62 102 Q56 118 44 128 Q40 146 32 160 Q24 180 12 188 Q4 190 2 180 Q0 160 -4 146 Q-10 136 -22 134 Q-40 132 -52 120 Q-62 108 -56 94 Q-46 80 -26 76Z" fill="#A3E635" stroke="${L}" stroke-width="1.1"/>
    <path class="e048-nile" d="M26 142 Q20 126 28 114 Q34 102 28 92 Q24 84 28 76" stroke="#1D4ED8" stroke-width="3" fill="none" stroke-linecap="round" pathLength="100"/>
    <ellipse cx="26" cy="146" rx="6" ry="5" fill="#1D4ED8"/>
  </g>
  <!-- vịnh Hạ Long -->
  <rect x="2420" y="220" width="300" height="${FLOOR - 220}" fill="#22D3EE" stroke="${L}"/>
  ${karst(2470, 238, 1.5)}${karst(2540, 232, 1.1, '#3F8A5C')}${karst(2620, 240, 1.7)}${karst(2690, 232, 1, '#3F8A5C')}
  <g class="e048-boat"><g transform="translate(2580 248)"><path d="M-14 0 H14 L10 7 H-10Z" fill="#B45309" stroke="${L}" stroke-width="0.8"/><path d="M-2 0 V-20 L12 -2Z" fill="#F97316" stroke="${L}" stroke-width="0.7"/></g></g>
  <!-- lối đi phía trước: cỏ, ván gỗ trên biển, cát -->
  <rect x="556" y="${FLOOR - 4}" width="684" height="40" fill="#86EFAC" stroke="${L}"/>
  <rect x="1240" y="${FLOOR - 4}" width="580" height="40" fill="#D6A26B" stroke="${L}"/>${Array.from({ length: 15 }, (_, i) => `<path d="M${1240 + i * 40} ${FLOOR - 4} V315" stroke="#A16207"/>`).join('')}
  <rect x="1820" y="${FLOOR - 4}" width="600" height="40" fill="#E7C66B" stroke="${L}"/>
  <rect x="2420" y="${FLOOR - 4}" width="300" height="40" fill="#FDE68A" stroke="${L}"/>
  ${bookGate(600, 1)}

  <!-- PHÒNG KHÁCH -->
  <rect x="2740" y="0" width="16" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  ${room(2756, 544, FLOOR, '#FEF3C7')}
  ${windowBox(2800, 70, 100, 86)}
  <g transform="translate(3050 0)"><rect x="-70" y="${FLOOR - 60}" width="140" height="32" rx="10" fill="#F9A8D4" stroke="${L}" stroke-width="1.2"/>
    <rect x="-78" y="${FLOOR - 38}" width="156" height="24" rx="8" fill="#F472B6" stroke="${L}" stroke-width="1.2"/><path d="M-66 ${FLOOR - 14} V${FLOOR} M66 ${FLOOR - 14} V${FLOOR}" stroke="#78350F" stroke-width="4"/></g>
  ${shelf(3160, 104, 120, books(3170, 104, 7))}
  ${rug(3190, FLOOR, 170, '#FDBA74')}
  ${bookGate(2720, 2)}`;
}

function fg() {
  return `
  ${lb('tallest', 1060, 72, 'tallest', '#DC2626', 18)}
  ${lb('100', 1036, 132, '100 m', '#DC2626', 15)}
  ${lb('biggest', 1520, 64, 'biggest', '#1D4ED8', 18)}
  ${[0, 1, 2].map((i) => `<g class="e048-lb e048-lb-bus${i}">${T(1406 + i * 100, 138, 16, '#B45309', String(i + 1))}</g>`).join('')}
  ${lb('3bus', 1520, 104, '3 buses', '#B45309', 14)}
  ${lb('fastest', 2110, 150, 'fastest', '#EA580C', 18)}
  <g class="e048-lb e048-lb-fastest"><g transform="translate(2200 168)">${MEDAL('1')}</g></g>
  ${lb('africa', 2300, 158, 'Africa', '#15803D', 12)}
  ${lb('nile', 2390, 108, 'Nile', '#1D4ED8', 13)}
  ${lb('longest', 2330, 50, 'longest river', '#1D4ED8', 14)}
  ${lb('beautiful', 2580, 120, 'most beautiful', '#DB2777', 15)}
  <g class="e048-lb e048-lb-q">${label(3046, 104, '?', '#F97316', 22)}</g>
  <!-- khung trang sách: chim nhỏ nhất -->
  <g transform="translate(2910 104)"><g class="e048-page">
    <rect x="-86" y="-58" width="172" height="112" rx="6" fill="#fff" stroke="${L}" stroke-width="1.6"/><rect x="-86" y="-58" width="172" height="20" rx="6" fill="#16A34A" stroke="${L}" stroke-width="1.6"/>
    ${T(0, -43, 12, '#fff', 'the smallest bird')}
    <g transform="translate(40 26)"><path d="M0 10 Q-4 -6 4 -16" stroke="#16A34A" stroke-width="2" fill="none"/>${[0, 72, 144, 216, 288].map((r) => `<ellipse cy="-7" rx="4" ry="7" fill="#F472B6" stroke="${L}" stroke-width="0.5" transform="translate(4 -18) rotate(${r})"/>`).join('')}</g>
    <g class="e048-hover"><g transform="translate(-7 4) scale(0.91)">${BIRD}</g></g>
    <g class="e048-ruler"><rect x="-62" y="26" width="104" height="16" rx="2" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${-60 + i * 20} 26 v7" stroke="${L}" stroke-width="1"/>${T(-60 + i * 20, 41, 7, '#78350F', String(i), 800)}`).join('')}
      <path d="M-60 20 H40" stroke="#DC2626" stroke-width="1.6"/><path d="M-60 16 v8 M40 16 v8" stroke="#DC2626" stroke-width="1.6"/></g>
  </g></g>
  ${lb('5cm', 2900, 178, '5 cm', '#DC2626', 15)}
  <g class="e048-lb e048-lb-haha">${T(3110, 140, 15, '#DB2777', 'HA HA')}</g>
  ${lb('laziest', 3222, 190, 'the laziest dog', '#7C3AED', 14)}`;
}

const CSS = `
.e048-lb { opacity: 0; transition: opacity .35s; }
${['tallest', '100', 'biggest', 'bus0', 'bus1', 'bus2', '3bus', 'fastest', 'africa', 'nile', 'longest', 'beautiful', 'q', '5cm', 'haha', 'laziest'].map((k) => `.st-lb-${k} .e048-lb-${k}`).join(', ')} { opacity: 1; }
.e048-sway { transform-origin: 0 -120px; animation: e048Sway 4s ease-in-out infinite alternate; } @keyframes e048Sway { from { transform: rotate(-1deg); } to { transform: rotate(1deg); } }
.e048-measure { transform: scaleY(0); transform-origin: 0 0; transition: transform 1.6s ease-out; } .st-measure .e048-measure { transform: scaleY(1); }
.e048-gate { transition: filter .4s; } .st-gate1 .e048-gate1, .st-gate2 .e048-gate2 { filter: drop-shadow(0 0 8px #FDE047) drop-shadow(0 0 3px #FACC15); }
.e048-whale { opacity: 0; transform: translateY(24px); transition: opacity .6s, transform 1.4s cubic-bezier(.3,1.3,.6,1); } .e048-up .e048-whale { opacity: 1; transform: translateY(0); }
.e048-spout { opacity: 0; } .e048-up .e048-spout { animation: e048Spout 1.4s ease-out infinite; }
@keyframes e048Spout { 0% { opacity: 0; transform: translateY(10px) scaleY(.4); } 30% { opacity: 1; } 100% { opacity: 0; transform: translateY(-6px) scaleY(1.1); } }
.e048-ends { opacity: 0; transition: opacity .4s; } .st-ends .e048-ends { opacity: 1; }
.es-thing.is-walk .e048-l1 { animation: e048Run .16s ease-in-out infinite alternate; } .es-thing.is-walk .e048-l2 { animation: e048Run .16s ease-in-out infinite alternate-reverse; }
@keyframes e048Run { from { transform: rotate(-36deg); } to { transform: rotate(36deg); } }
.es-thing.is-walk .e048-cbody { animation: e048Bob .16s ease-in-out infinite alternate; } @keyframes e048Bob { to { transform: translateY(-2px); } }
.e048-nile { stroke-dasharray: 100; stroke-dashoffset: 100; transition: stroke-dashoffset 1.8s ease-out; } .st-nile .e048-nile { stroke-dashoffset: 0; }
.e048-boat { animation: e048Boat 3s ease-in-out infinite alternate; } @keyframes e048Boat { to { transform: translateX(30px); } }
.e048-page { opacity: 0; transform: scale(.3); transform-origin: 0 50px; transition: opacity .3s, transform .5s cubic-bezier(.3,1.5,.6,1); } .st-page .e048-page { opacity: 1; transform: scale(1); }
.e048-wing { animation: e048Wing .08s linear infinite alternate; } @keyframes e048Wing { to { transform: scaleY(-.6); } }
.e048-hover { animation: e048Hover 1s ease-in-out infinite alternate; } @keyframes e048Hover { to { transform: translateY(-4px); } }
.e048-ruler { opacity: 0; transition: opacity .4s; } .st-ruler .e048-ruler { opacity: 1; }
.e048-medal { opacity: 0; transform: translateY(-40px); transition: opacity .3s, transform .6s cubic-bezier(.3,1.5,.6,1); } .e048-gold .e048-medal { opacity: 1; transform: translate(4px, -28px); }
.e048-lazy .e048-dhead { animation: e048Breath 2.4s ease-in-out infinite alternate; } @keyframes e048Breath { to { transform: rotate(3deg); } }
@media (prefers-reduced-motion: reduce) {
  .e048-sway, .e048-boat, .e048-hover { animation: none; }
  .e048-wing { animation-duration: .3s; }
  .e048-up .e048-spout { animation-duration: 2.4s; }
}
`;

const mark = (st, id, cls, on = true) => st.a(id).el.classList.toggle(cls, on);
/** Đi qua cổng sách: tới cổng, biến mất trong khói lấp lánh, hiện ra ở phía bên kia. */
async function throughGate(st, gx, to, gate) {
  st.set(gate);
  await st.walk('minh', gx - 10, { speed: 220, lead: 60 });
  st.fx('sparkle', gx, 180, { quiet: true }); st.fx('poof', gx, 220);
  st.show('minh', false);
  await st.wait(300);
  st.place('minh', to, FLOOR, 1);
  st.look(to + 80);
  st.show('minh', true); st.fx('sparkle', to, 180, { quiet: true });
  st.set(gate, false);
}

const BEATS = [
  { key: ['loves his new book about nature'], icon: '📗', label: 'new book', async play(st) {
    st.look(240);
    st.chest('minh', HBOOK); st.pose('minh', 'e048_read'); st.act('minh', 'read'); st.sfx('page-turn', { vol: 0.7 });
    await st.wait(800);
    st.mood('minh', 'joy'); st.fx('hearts', 250, 120);
    await st.wait(1600);
    st.act('minh', null);
  } },
  { key: ['full of amazing records'], icon: '🏆', label: 'amazing records', async play(st) {
    st.pose('minh', 'open'); st.mood('minh', 'wow');
    for (let i = 0; i < 3; i++) { st.fly(TROPHY, [256, 196], [560 + i * 14, 120 + i * 30], { size: 26, dur: 700 }); st.sfx('whoosh', { vol: 0.35, rate: 1 + i * 0.1 }); await st.wait(260); }
    st.sfx('sparkle', { vol: 0.6 });
    await st.wait(400);
    st.mood('minh', 'joy');
    await throughGate(st, 600, 690, 'st-gate1');
    st.pose('minh', 'stand');
  } },
  { key: ['The tallest tree in the world', 'in the USA'], icon: '🌲', label: 'the tallest tree', async play(st) {
    await st.walk('minh', 830, { speed: 200, lead: 140 });
    st.look(960);
    st.face('minh', 1); st.pose('minh', 'pointUp'); st.mood('minh', 'wow');
    st.set('st-lb-tallest'); st.sfx('pop', { vol: 0.6 });
    await st.wait(300);
    st.sfx('wind', { vol: 0.4 });
    await st.wait(1900);
  } },
  { key: ['more than one hundred metres tall'], icon: '📏', label: '100 metres', async play(st) {
    st.set('st-measure');
    await st.loop('tick', () => st.wait(1400), { vol: 0.5 });
    st.set('st-lb-100'); st.sfx('ding', { vol: 0.6 }); st.pose('minh', 'open'); st.mood('minh', 'joy');
    await st.wait(1200);
    st.pose('minh', 'stand');
  } },
  { key: ['The biggest animal is the blue whale'], icon: '🐋', label: 'the biggest animal', async play(st) {
    st.set('st-lb-tallest', false); st.set('st-lb-100', false);
    await st.walk('minh', 1290, { speed: 260, lead: 230 });
    st.look(1500);
    mark(st, 'whale', 'e048-up'); st.sfx('splash', { vol: 0.6 });
    st.fx('drops', 1610, 200, { quiet: true });
    await st.wait(900);
    st.set('st-lb-biggest'); st.sfx('pop', { vol: 0.6 }); st.pose('minh', 'point'); st.mood('minh', 'wow');
    await st.wait(1300);
  } },
  { key: ['bigger than three buses'], icon: '🚌', label: 'three buses', async play(st) {
    st.set('st-lb-biggest', false); st.pose('minh', 'stand');
    for (let i = 0; i < 3; i++) {
      const id = `bus${i}`;
      st.show(id, true); st.fx('poof', 1406 + i * 100, 164, { quiet: i > 0 }); if (i > 0) st.sfx('pop', { vol: 0.6, rate: 1 + i * 0.1 });
      st.set(`st-lb-bus${i}`);
      await st.wait(600);
    }
    st.set('st-ends'); st.set('st-lb-3bus'); st.mood('minh', 'joy'); st.sfx('bus', { vol: 0.5 });
    await st.wait(1300);
  } },
  { key: ['fastest land animal is the cheetah'], icon: '🐆', label: 'the fastest', async play(st) {
    for (let i = 0; i < 3; i++) st.set(`st-lb-bus${i}`, false);
    st.set('st-lb-3bus', false); st.set('st-ends', false);
    await st.walk('minh', 1850, { speed: 300, lead: 200 });
    st.look(2040);
    await Promise.all([
      (st.sfx('whoosh', { vol: 0.6 }), st.walk('cheetah', 2200, { speed: 330, follow: false })),
      st.walk('zebra', 2040, { speed: 150, follow: false }),
      st.walk('lion', 1980, { speed: 120, follow: false }),
    ]);
    st.set('st-lb-fastest'); st.sfx('pop', { vol: 0.6 });
    st.pose('minh', 'cheer'); st.mood('minh', 'joy'); st.act('minh', 'jump'); st.sfx('cheer', { vol: 0.4 });
    await st.wait(1000);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['longest river in the world is the Nile', 'in Africa'], icon: '🏞️', label: 'the longest river', async play(st) {
    st.set('st-lb-fastest', false);
    await st.walk('minh', 2240, { speed: 240, lead: 70 });
    st.face('minh', 1); st.chest('minh', HBOOK); st.pose('minh', 'e048_read');
    st.set('st-lb-africa'); st.sfx('page-turn');
    await st.wait(500);
    st.set('st-nile');
    await st.loop('river', () => st.wait(1400), { vol: 0.4 });
    st.set('st-lb-nile'); st.set('st-lb-longest'); st.sfx('pop', { vol: 0.6 }); st.mood('minh', 'wow');
    await st.wait(1200);
  } },
  { key: ['most beautiful place', 'Ha Long Bay'], icon: '🏝️', label: 'the most beautiful', async play(st) {
    st.set('st-lb-africa', false); st.set('st-lb-nile', false); st.set('st-lb-longest', false);
    st.chest('minh', ''); st.pose('minh', 'stand');
    await st.walk('minh', 2470, { speed: 240, lead: 110 });
    st.set('st-lb-beautiful'); st.pose('minh', 'me'); st.mood('minh', 'joy');
    st.fx('hearts', 2500, 150); st.fx('sparkle', 2620, 160, { quiet: true });
    await st.wait(600);
    st.sfx('birds', { vol: 0.5 });
    await st.wait(1600);
  } },
  { key: ['the most interesting page'], icon: '📖', label: 'most interesting?', async play(st) {
    st.set('st-lb-beautiful', false); st.pose('minh', 'stand');
    await throughGate(st, 2720, 2840, 'st-gate2');
    st.chest('minh', HBOOK); st.sfx('page-turn', { vol: 0.6 });
    st.look(3010);
    st.face('lan', -1); st.pose('lan', 'point');
    await st.say('lan', 'What is the most interesting page?', 2400);
  } },
  { key: ['Lan asks'], icon: '❓', label: 'Lan asks', async play(st) {
    st.set('st-lb-q'); st.sfx('pop', { vol: 0.6 }); st.pose('lan', 'shrug'); st.mood('lan', 'wow');
    await st.wait(1500);
    st.pose('lan', 'stand'); st.mood('lan', 'happy');
  } },
  { key: ['the smallest bird'], icon: '🐦', label: 'the smallest bird', async play(st) {
    st.set('st-lb-q', false);
    st.pose('minh', 'give'); st.mood('minh', 'joy');
    st.set('st-page'); st.sfx('page-turn');
    await st.wait(700);
    st.sfx('birds', { vol: 0.5 });
    await st.wait(1500);
  } },
  { key: ['only five centimetres long'], icon: '📏', label: 'five centimetres', async play(st) {
    st.set('st-ruler'); st.sfx('pencil', { vol: 0.5 });
    await st.wait(700);
    st.set('st-lb-5cm'); st.sfx('pop', { vol: 0.6 }); st.pose('lan', 'clap'); st.mood('lan', 'wow');
    await st.wait(1500);
    st.pose('lan', 'stand');
  } },
  { key: ['Lan laughs'], icon: '😆', label: 'Lan laughs', async play(st) {
    st.set('st-page', false); st.set('st-ruler', false); st.set('st-lb-5cm', false); st.pose('minh', 'stand');
    st.mood('lan', 'joy'); st.act('lan', 'jump'); st.set('st-lb-haha'); st.sfx('giggle', { vol: 0.7 });
    await st.wait(1600);
    st.act('lan', null);
  } },
  { key: ['the laziest dog in the world'], icon: '🐶', label: 'the laziest dog', async play(st) {
    st.set('st-lb-haha', false);
    st.look(3110);
    st.face('lan', 1); st.pose('lan', 'point');
    st.fx('zzz', 3220, 236);
    await st.wait(600);
    mark(st, 'lucky', 'e048-gold'); st.set('st-lb-laziest'); st.sfx('pop', { vol: 0.6 });
    st.mood('minh', 'joy'); st.pose('minh', 'clap'); st.act('minh', 'clap');
    await st.wait(300);
    st.sfx('clap', { vol: 0.5 });
    await st.wait(1800);
    st.act('minh', null);
  } },
];

export default {
  id: 'en048', worldW: 3300, floor: FLOOR, viewTop: 30, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  order: [0, 2, 4, 6, 7, 11],
  poses: {
    e048_read: { R: [26, 176], L: [26, 176], head: 7 },
  },
  cast: [
    { id: 'whale', kind: 'thing', x: 1520, y: 252, svg: WHALE, box: [-200, -92, 364, 114] },
    { id: 'bus0', kind: 'thing', x: 1406, y: 180, svg: BUS, box: [-50, -36, 100, 38] },
    { id: 'bus1', kind: 'thing', x: 1506, y: 180, svg: BUS, box: [-50, -36, 100, 38] },
    { id: 'bus2', kind: 'thing', x: 1606, y: 180, svg: BUS, box: [-50, -36, 100, 38] },
    { id: 'lion', kind: 'thing', x: 1900, y: HILL - 14, svg: LION, box: [-50, -62, 100, 64] },
    { id: 'zebra', kind: 'thing', x: 1906, y: HILL - 7, svg: ZEBRA, box: [-40, -74, 96, 78] },
    { id: 'cheetah', kind: 'thing', x: 1910, y: HILL, svg: CHEETAH, box: [-56, -48, 100, 52] },
    { id: 'lucky', kind: 'thing', x: 3200, y: FLOOR, svg: LAZY, box: [-56, -60, 112, 64] },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 3060, s: 1.08, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 256 },
  ],
  init(st) {
    for (let i = 0; i < 3; i++) st.show(`bus${i}`, false);
  },
};
