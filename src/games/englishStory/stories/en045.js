/**
 * Bài 45 "Plans for Ha Long Bay" (be going to): ngôi nhà cắt ngang, trái sang phải: phòng khách (lịch nghỉ hè) → nhà để xe (xe
 * của bố, mẹ chất đồ ăn vặt) → phòng Lan (máy tính xem khách sạn, bản đồ vịnh, máy ảnh) → phòng Minh (kính bơi) → sân trước
 * (bà và Lucky). Kế hoạch (going to) hiện bằng bong bóng nghĩ có cảnh nhỏ chuyển động bên trong; việc làm được ngay (soạn đồ,
 * lên xe, cầm máy ảnh, đeo kính bơi) thì nhân vật làm thật.
 * Toạ độ cảnh: rộng 2400, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, fence, room, doorway, windowBox, shelf, books, rug, label, thought, sun } from '../kit.js';

const FLOOR = 282;
const T = (x, y, s, c, t, w = 900) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="${w}" font-size="${s}" fill="${c}">${t}</text>`;

// ── Hình nhỏ dùng trong bong bóng (gốc ở giữa) ──────────────────────────
/** Núi đá vôi trên mặt nước (gốc = chân núi). */
const karst = (x, y, s = 1, c = '#4D9A6A') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-16 0 Q-20 -22 -12 -36 Q-6 -48 2 -42 Q12 -34 9 -18 Q14 -8 17 0Z" fill="${c}" stroke="${L}" stroke-width="0.9"/>
  <path d="M-8 -30 Q-4 -20 -6 -8 M4 -32 Q6 -22 4 -12" stroke="#2F6B48" stroke-width="1" fill="none"/></g>`;
const BOAT = `<path d="M-12 0 H12 L8 6 H-8Z" fill="#B45309" stroke="${L}" stroke-width="0.8"/><path d="M-1 0 V-16 L9 -2Z" fill="#F97316" stroke="${L}" stroke-width="0.7"/>`;
const MCAR = `<path d="M-15 -3 Q-15 -9 -10 -9 L-6 -9 Q-3 -15 3 -15 L7 -15 Q11 -14 12 -9 Q16 -8 16 -3Z" fill="#0EA5E9" stroke="${L}" stroke-width="0.8"/>
  <circle cx="-8" cy="-2" r="3.2" fill="#1F2937"/><circle cx="9" cy="-2" r="3.2" fill="#1F2937"/>`;
const MOON = `<path d="M3 -9 A9 9 0 1 0 9 4 A7 7 0 1 1 3 -9Z" fill="#FDE047" stroke="${L}" stroke-width="0.8"/>`;
const HOTEL = `<rect x="-22" y="-44" width="44" height="44" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/><rect x="-26" y="-50" width="52" height="8" rx="2" fill="#EF4444" stroke="${L}" stroke-width="0.8"/>
  ${[-12, 0, 12].map((x) => [-34, -22].map((y) => `<rect x="${x - 4}" y="${y}" width="8" height="7" fill="#BAE6FD" stroke="${L}" stroke-width="0.5"/>`).join('')).join('')}
  <rect x="-5" y="-12" width="10" height="12" fill="#B45309" stroke="${L}" stroke-width="0.6"/>${T(0, -45, 6.5, '#fff', 'HOTEL')}`;
const GIFT = `<rect x="-14" y="-10" width="28" height="22" rx="2" fill="#F472B6" stroke="${L}"/><rect x="-16" y="-16" width="32" height="8" rx="2" fill="#EC4899" stroke="${L}"/>
  <path d="M-2 -16 V12 M2 -16 V12" stroke="#FDE047" stroke-width="2.4"/><path d="M0 -16 Q-12 -28 -12 -18 Q-10 -14 0 -16 Q10 -14 12 -18 Q12 -28 0 -16Z" fill="#FDE047" stroke="${L}" stroke-width="0.8"/>`;
const SNACKS = [
  `<rect x="-7" y="-9" width="14" height="18" rx="2" fill="#F97316" stroke="${L}" stroke-width="0.8"/><path d="M-7 -5 H7" stroke="#FDE047" stroke-width="2"/>`,
  `<path d="M-8 -8 L8 -8 L6 9 H-6Z" fill="#FACC15" stroke="${L}" stroke-width="0.8"/><circle r="3" fill="#EF4444"/>`,
  `<rect x="-9" y="-6" width="18" height="12" rx="2" fill="#22C55E" stroke="${L}" stroke-width="0.8"/><path d="M-5 -2 H5 M-5 2 H3" stroke="#fff" stroke-width="1.4"/>`,
  `<circle r="8" fill="#A855F7" stroke="${L}" stroke-width="0.8"/><path d="M-4 -2 h8" stroke="#fff" stroke-width="1.6"/>`,
];
const BASKET = `<g transform="translate(0 4)"><path d="M-18 -8 H18 L14 10 H-14Z" fill="#D97706" stroke="${L}" stroke-width="1"/><path d="M-16 -2 H16 M-15 4 H15" stroke="#92400E" stroke-width="0.8"/>
  <g transform="translate(-9 -12) scale(0.6)">${SNACKS[0]}</g><g transform="translate(1 -13) scale(0.6)">${SNACKS[1]}</g><g transform="translate(10 -11) scale(0.6)">${SNACKS[3]}</g>
  <path d="M-14 -8 Q0 -26 14 -8" stroke="${L}" stroke-width="1.6" fill="none"/></g>`;
const GOGGLES = `<g transform="translate(0 -45)"><path d="M-17 0 H17" stroke="#0EA5E9" stroke-width="2.6"/><rect x="-12" y="-4.6" width="10" height="9" rx="4" fill="#BAE6FD" stroke="#0369A1" stroke-width="1.6" opacity="0.92"/>
  <rect x="2" y="-4.6" width="10" height="9" rx="4" fill="#BAE6FD" stroke="#0369A1" stroke-width="1.6" opacity="0.92"/></g>`;
const CAMERA = `<g transform="translate(0 -6)"><rect x="-10" y="-7" width="20" height="13" rx="2.4" fill="#1F2937" stroke="${L}" stroke-width="0.8"/><rect x="-6" y="-10" width="7" height="4" rx="1" fill="#1F2937"/>
  <circle cx="1" cy="0" r="4.6" fill="#64748B" stroke="#E2E8F0" stroke-width="1"/><circle cx="1" cy="0" r="2" fill="#0F172A"/><circle cx="7" cy="-4" r="1.2" fill="#FDE047"/></g>`;

/** Xe gia đình (đồ vật riêng, nhìn nghiêng quay phải, gốc = giữa chỗ bánh chạm đất). */
const CAR = `<g class="e045-carbody">
  <path d="M-112 -26 Q-114 -58 -92 -60 L-62 -62 Q-46 -96 -8 -96 L38 -96 Q60 -94 74 -62 L98 -58 Q116 -52 114 -26Z" fill="#0EA5E9" stroke="${L}" stroke-width="1.3"/>
  <path d="M-52 -62 Q-38 -88 -10 -88 L12 -88 L12 -62Z" fill="#E0F2FE" stroke="${L}" stroke-width="0.9"/><path d="M20 -88 L36 -88 Q52 -86 62 -62 L20 -62Z" fill="#E0F2FE" stroke="${L}" stroke-width="0.9"/>
  <g class="e045-snk">${SNACKS.map((s, i) => `<g transform="translate(${-40 + i * 12} ${-68 - (i % 2) * 5}) scale(0.7)">${s}</g>`).join('')}</g>
  <g class="e045-hd"><g transform="translate(36 -64)">${headOnly('en_dad_home', { s: 0.62 })}</g></g>
  <path d="M-52 -62 Q-38 -88 -10 -88 L12 -88 L12 -62Z M20 -88 L36 -88 Q52 -86 62 -62 L20 -62Z" fill="#fff" opacity="0.18"/>
  <path d="M-108 -40 H112" stroke="#0369A1" stroke-width="1.6"/><path d="M14 -58 V-30" stroke="#0369A1" stroke-width="1"/><rect x="22" y="-50" width="10" height="3" rx="1.5" fill="#0369A1"/>
  <rect x="102" y="-52" width="12" height="8" rx="3" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/><rect x="-114" y="-50" width="8" height="8" rx="2" fill="#F87171" stroke="${L}" stroke-width="0.8"/>
  <rect x="-30" y="-104" width="70" height="8" rx="3" fill="#475569" stroke="${L}" stroke-width="0.8"/></g>
  ${[-66, 70].map((x) => `<g transform="translate(${x} -18)"><g class="e045-wheel"><circle r="18" fill="#1F2937" stroke="${L}"/><circle r="8" fill="#CBD5E1"/><path d="M-8 0 H8 M0 -8 V8" stroke="#64748B" stroke-width="2"/></g></g>`).join('')}`;

/** Bong bóng nghĩ (ở lớp trước) có class riêng để bật bằng st-*; (tx, ty) = đầu người nghĩ. */
const bub = (k, x, y, w, h, inner, tx, ty) => `<g class="e045-bub e045-b${k}" style="transform-origin:${tx}px ${ty}px">${thought(x, y, w, h,
  `<defs><clipPath id="e045c${k}"><ellipse rx="${w * 0.47}" ry="${h * 0.44}"/></clipPath></defs><g clip-path="url(#e045c${k})">${inner}</g>`, [tx, ty])}</g>`;

function bg() {
  return `
  <!-- PHÒNG KHÁCH -->
  ${room(0, 560, FLOOR, '#FEF3C7')}
  <g transform="translate(110 0)">
    <rect x="-46" y="70" width="92" height="96" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="-46" y="70" width="92" height="20" rx="4" fill="#EF4444" stroke="${L}" stroke-width="1.4"/>
    <circle cx="-26" cy="70" r="3" fill="${L}"/><circle cx="26" cy="70" r="3" fill="${L}"/>
    <g class="e045-calA">${T(0, 85, 13, '#fff', 'MAY')}${Array.from({ length: 12 }, (_, i) => `<rect x="${-38 + (i % 4) * 20}" y="${98 + Math.floor(i / 4) * 20}" width="14" height="14" rx="2" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="0.6"/>`).join('')}</g>
    <g class="e045-calB">${T(0, 85, 13, '#fff', 'JUNE')}<g transform="translate(0 118) scale(0.62)">${sun(22)}</g>${T(0, 150, 10, '#EA580C', 'SUMMER')}${T(0, 161, 9, '#EA580C', 'HOLIDAY')}</g>
  </g>
  ${windowBox(220, 74, 110, 92)}
  <!-- ghế sofa -->
  <g transform="translate(470 0)"><rect x="-72" y="${FLOOR - 62}" width="144" height="34" rx="10" fill="#60A5FA" stroke="${L}" stroke-width="1.2"/>
    <rect x="-80" y="${FLOOR - 40}" width="160" height="26" rx="8" fill="#3B82F6" stroke="${L}" stroke-width="1.2"/><rect x="-84" y="${FLOOR - 50}" width="16" height="40" rx="7" fill="#2563EB" stroke="${L}"/><rect x="68" y="${FLOOR - 50}" width="16" height="40" rx="7" fill="#2563EB" stroke="${L}"/>
    <path d="M-70 ${FLOOR - 14} V${FLOOR} M70 ${FLOOR - 14} V${FLOOR}" stroke="#78350F" stroke-width="4"/></g>
  ${shelf(400, 120, 120, books(410, 120, 6))}
  ${rug(260, FLOOR, 200, '#FDBA74')}
  ${doorway(560, FLOOR)}

  <!-- NHÀ ĐỂ XE -->
  ${room(572, 488, FLOOR, '#E2E8F0', '#94A3B8')}
  <rect x="640" y="60" width="120" height="8" rx="2" fill="#A16207" stroke="${L}"/>
  <g transform="translate(660 68)"><path d="M0 0 V30" stroke="#64748B" stroke-width="3"/><path d="M-6 30 h12 v6 h-12Z" fill="#EF4444" stroke="${L}" stroke-width="0.8"/></g>
  <g transform="translate(700 68)"><path d="M0 0 V26" stroke="#64748B" stroke-width="3"/><circle cy="30" r="5" fill="none" stroke="#64748B" stroke-width="3"/></g>
  <g transform="translate(740 68)"><rect x="-6" y="0" width="12" height="30" rx="2" fill="#F59E0B" stroke="${L}" stroke-width="0.8"/></g>
  <g transform="translate(980 0)"><rect x="-56" y="60" width="112" height="96" rx="4" fill="#CBD5E1" stroke="${L}" stroke-width="1.2"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M-56 ${76 + i * 18} H56" stroke="#94A3B8" stroke-width="1.2"/>`).join('')}</g>
  <rect x="600" y="${FLOOR - 3}" width="440" height="4" fill="#64748B" opacity="0.4"/>
  ${doorway(1060, FLOOR)}

  <!-- PHÒNG LAN -->
  ${room(1072, 448, FLOOR, '#FCE7F3')}
  <!-- bàn + máy tính -->
  <g transform="translate(1196 0)"><rect x="-50" y="${FLOOR - 60}" width="100" height="8" rx="2" fill="#B45309" stroke="${L}"/><rect x="-44" y="${FLOOR - 52}" width="8" height="52" fill="#92400E" stroke="${L}" stroke-width="0.8"/><rect x="36" y="${FLOOR - 52}" width="8" height="52" fill="#92400E" stroke="${L}" stroke-width="0.8"/></g>
  <g transform="translate(1196 0)">
    <rect x="-20" y="${FLOOR - 92}" width="40" height="28" rx="3" fill="#1F2937" stroke="${L}"/>
    <rect x="-17" y="${FLOOR - 89}" width="34" height="22" fill="#BAE6FD"/>
    <g class="e045-screen"><rect x="-17" y="${FLOOR - 89}" width="34" height="22" fill="#38BDF8"/><rect x="-17" y="${FLOOR - 74}" width="34" height="7" fill="#FDE68A"/><g transform="translate(-4 ${FLOOR - 71}) scale(0.3)">${HOTEL}</g></g>
    <path d="M-24 ${FLOOR - 64} H24 L28 ${FLOOR - 60} H-28Z" fill="#475569" stroke="${L}" stroke-width="0.8"/>
  </g>
  <!-- bản đồ vịnh Hạ Long trên tường -->
  <g transform="translate(1400 120)">
    <rect x="-80" y="-58" width="160" height="104" rx="5" fill="#FEF3C7" stroke="${L}" stroke-width="1.6"/>
    <rect x="-72" y="-38" width="144" height="76" rx="3" fill="#7DD3FC" stroke="${L}" stroke-width="0.8"/>
    ${T(0, -43, 12, '#0369A1', 'HA LONG BAY')}
    ${karst(-44, 18, 0.6)}${karst(-14, 8, 0.48, '#3F8A5C')}${karst(22, 22, 0.66)}${karst(50, 6, 0.42, '#3F8A5C')}${karst(-36, -10, 0.36, '#3F8A5C')}
    <path class="e045-route" d="M-56 30 Q-60 -26 0 -24 Q60 -26 60 20 Q40 36 -56 30" stroke="#F97316" stroke-width="2" stroke-dasharray="5 4" fill="none"/>
    <g class="e045-mboat"><g class="e045-mb"><g transform="scale(0.8)">${BOAT}</g></g></g>
    <g class="e045-day">${label(52, -18, 'Day 1', '#EA580C', 11)}</g>
  </g>
  ${shelf(1250, 136, 70, '<g class="e045-camshelf" transform="translate(1285 136)">' + CAMERA.replace('translate(0 -6)', 'translate(0 -7)') + '</g>')}
  <!-- giường Lan -->
  <g transform="translate(1470 0)"><rect x="-44" y="${FLOOR - 34}" width="88" height="22" rx="4" fill="#F9A8D4" stroke="${L}"/><rect x="-48" y="${FLOOR - 56}" width="10" height="56" rx="3" fill="#BE185D" stroke="${L}"/><rect x="-40" y="${FLOOR - 44}" width="24" height="12" rx="5" fill="#fff" stroke="${L}" stroke-width="0.8"/></g>
  ${doorway(1520, FLOOR)}

  <!-- PHÒNG MINH -->
  ${room(1532, 368, FLOOR, '#DBEAFE')}
  ${windowBox(1560, 84, 90, 80)}
  <!-- móc treo kính bơi + phao -->
  <g transform="translate(1760 96)"><circle r="3" fill="${L}"/><path d="M0 0 V10" stroke="${L}"/>
    <g transform="translate(0 30)"><circle r="20" fill="none" stroke="#EF4444" stroke-width="9"/><circle r="20" fill="none" stroke="#fff" stroke-width="9" stroke-dasharray="10 10"/><circle r="24.5" fill="none" stroke="${L}" stroke-width="0.8"/><circle r="15.5" fill="none" stroke="${L}" stroke-width="0.8"/></g></g>
  <g class="e045-gog" transform="translate(1712 126)"><g transform="translate(0 45)">${GOGGLES}</g></g>
  <g transform="translate(1712 112)"><circle r="2.4" fill="${L}"/></g>
  <g transform="translate(1850 0)"><rect x="-44" y="${FLOOR - 34}" width="88" height="22" rx="4" fill="#93C5FD" stroke="${L}"/><rect x="38" y="${FLOOR - 56}" width="10" height="56" rx="3" fill="#1D4ED8" stroke="${L}"/><rect x="14" y="${FLOOR - 44}" width="24" height="12" rx="5" fill="#fff" stroke="${L}" stroke-width="0.8"/></g>
  <!-- tường ngoài + cửa chính -->
  <rect x="1900" y="0" width="14" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>

  <!-- SÂN TRƯỚC -->
  ${sky(1914, 486, 315, 'e045sky')}
  ${cloud(2010, 70, 0.9, 0)}${cloud(2260, 56, 1, 3)}
  <path d="M1914 238 Q2050 206 2180 232 T2400 226 V${FLOOR} H1914Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(2330, FLOOR - 4, 1)}${bush(1990, FLOOR - 2, 0.9)}
  ${fence(2040, 140, FLOOR)}
  <rect x="1914" y="${FLOOR - 4}" width="486" height="40" fill="#86EFAC" stroke="${L}"/>
  ${Array.from({ length: 10 }, (_, i) => `<path d="M${1930 + i * 46} ${FLOOR + 12} l3 -7 l3 7" stroke="#16A34A" stroke-width="1.4" fill="none"/>`).join('')}
  <!-- túi đồ của bà -->
  <g transform="translate(2300 ${FLOOR})"><path d="M-12 0 V-20 H12 V0Z" fill="#A78BFA" stroke="${L}"/><path d="M-6 -20 Q0 -30 6 -20" stroke="${L}" stroke-width="1.4" fill="none"/></g>`;
}

function fg() {
  return `
  <!-- bong bóng nghĩ: kế hoạch -->
  ${bub(0, 300, 86, 176, 68, `<rect x="-90" y="18" width="180" height="20" fill="#7DD3FC"/>${karst(-40, 19, 0.5)}${karst(-14, 19, 0.62, '#3F8A5C')}${karst(14, 19, 0.46)}
    <g class="e045-bob"><g transform="translate(46 18) scale(0.8)">${BOAT}</g></g><g transform="translate(-58 -8) scale(0.36)">${sun(22)}</g>${T(14, -9, 12, '#0369A1', 'Ha Long Bay')}`, 300, 168)}
  ${bub(1, 930, 86, 190, 64, `<path d="M-80 14 H80" stroke="#64748B" stroke-width="8"/><path d="M-76 14 H76" stroke="#F8FAFC" stroke-width="1.2" stroke-dasharray="8 8"/>
    <g class="e045-mcar"><g transform="translate(-60 10)">${MCAR}</g></g>${karst(62, 10, 0.56)}${karst(78, 10, 0.4, '#3F8A5C')}${T(-10, -10, 12, '#0369A1', 'by car')}`, 800, 138)}
  ${bub(3, 1250, 90, 200, 72, `<rect x="-100" y="8" width="200" height="30" fill="#FDE68A"/><path d="M-6 8 Q30 2 100 6 V38 H6Z" fill="#7DD3FC"/>
    <g transform="translate(-52 14) scale(0.6)">${HOTEL}</g>${[0, 1, 2].map((i) => `<g transform="translate(${10 + i * 26} -10)"><g class="e045-moon e045-moon${i}">${MOON}</g></g>`).join('')}
    ${T(40, 23, 12, '#1D4ED8', '3 nights')}`, 1150, 160)}
  ${bub(5, 1290, 86, 150, 66, `<g transform="rotate(-6)"><rect x="-34" y="-26" width="68" height="56" rx="2" fill="#fff" stroke="${L}"/><rect x="-28" y="-20" width="56" height="38" fill="#7DD3FC"/>
    ${karst(-12, 18, 0.6)}${karst(12, 18, 0.48, '#3F8A5C')}</g><g class="e045-flashb"><path d="M44 -20 l4 8 l8 2 l-8 3 l-4 8 l-4 -8 l-8 -3 l8 -2Z" fill="#FDE047" stroke="${L}" stroke-width="0.6"/></g>`, 1270, 158)}
  ${bub(6, 1650, 86, 180, 68, `<g class="e045-rise"><g transform="translate(46 -4) scale(0.42)">${sun(22)}</g></g>
    <rect x="-90" y="-2" width="180" height="40" fill="#38BDF8"/><path d="M-90 -2 H90" stroke="#0EA5E9" stroke-width="1.6"/>
    <g class="e045-swim"><g transform="translate(-20 4)">${headOnly('en_minh_home', { s: 0.42 })}</g><path d="M-36 6 q6 -10 12 -2 M-4 6 q6 -10 12 -2" stroke="#F5C9A8" stroke-width="3" fill="none" stroke-linecap="round"/></g>
    ${T(-22, -12, 12, '#0369A1', 'every morning')}`, 1712, 160)}
  ${bub(7, 2200, 86, 176, 68, `<path d="M-60 -2 L-36 -20 L-12 -2Z" fill="#B91C1C" stroke="${L}" stroke-width="0.8"/><rect x="-56" y="-2" width="40" height="26" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/><rect x="-40" y="8" width="9" height="16" fill="#B45309"/>
    <g transform="translate(14 8)">${headOnly('en_grandma', { s: 0.8 })}</g>
    <g transform="translate(44 24)"><ellipse cx="0" cy="-8" rx="13" ry="7" fill="#B7794A" stroke="${L}" stroke-width="0.8"/><circle cx="12" cy="-16" r="7" fill="#B7794A" stroke="${L}" stroke-width="0.8"/><path d="M8 -20 q-5 2 -3 9" fill="#7A4B2A" stroke="${L}" stroke-width="0.6"/><circle cx="18" cy="-17" r="1.6" fill="#2B1D16"/><path d="M-6 -2 v3 M6 -2 v3" stroke="#7A4B2A" stroke-width="3" stroke-linecap="round"/></g>
    <path d="M30 -18 C24 -24 22 -30 27 -31 C29 -31 30 -29 30 -28 C30 -29 31 -31 33 -31 C38 -30 36 -24 30 -18Z" fill="#F43F5E"/>`, 2190, 158)}
  ${bub(8, 2110, 84, 120, 62, `<g class="e045-bob">${GIFT}</g>${T(30, 0, 22, '#F97316', '?')}`, 2190, 142)}
  <g class="e045-q">${label(2246, 112, '?', '#F97316', 22)}</g>
  ${bub(11, 2110, 84, 120, 62, `<g class="e045-bob">${GIFT}</g><path d="M22 -4 l6 7 l12 -14" stroke="#16A34A" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, 2150, 150)}
  <!-- ánh đèn máy ảnh -->
  <circle class="e045-flash" cx="1330" cy="150" r="60" fill="#fff"/>`;
}

const CSS = `
.e045-calB { opacity: 0; transition: opacity .3s .25s; } .e045-calA { transition: opacity .3s; }
.st-summer .e045-calA { opacity: 0; } .st-summer .e045-calB { opacity: 1; }
.e045-bub { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .5s cubic-bezier(.3,1.5,.6,1); }
${[0, 1, 3, 5, 6, 7, 8, 11].map((k) => `.st-b${k} .e045-b${k}`).join(', ')} { opacity: 1; transform: scale(1); }
.e045-mcar { animation: e045Drive 2.6s ease-in-out infinite; } @keyframes e045Drive { from { transform: translateX(0); } to { transform: translateX(104px); } }
.e045-bob { animation: e045Bob .9s ease-in-out infinite alternate; } @keyframes e045Bob { to { transform: translateY(-3px); } }
.e045-moon { opacity: 0; transform: scale(0); transform-box: fill-box; transform-origin: center; transition: opacity .3s, transform .45s cubic-bezier(.3,1.6,.6,1); }
.st-moon1 .e045-moon0, .st-moon2 .e045-moon1, .st-moon3 .e045-moon2 { opacity: 1; transform: scale(1); }
.e045-screen { opacity: 0; transition: opacity .4s; } .st-laptop .e045-screen { opacity: 1; }
.e045-mboat { opacity: 0; transition: opacity .3s; } .st-boat .e045-mboat { opacity: 1; }
.st-boat .e045-mb { animation: e045Route 4s linear infinite; }
@keyframes e045Route { 0% { transform: translate(-56px, 28px); } 25% { transform: translate(-40px, -22px); } 50% { transform: translate(40px, -22px); } 70% { transform: translate(58px, 18px); } 100% { transform: translate(-56px, 28px); } }
.e045-route { opacity: 0; transition: opacity .3s; } .st-boat .e045-route { opacity: 1; }
.e045-day { opacity: 0; transition: opacity .3s; } .st-boat .e045-day { opacity: 1; }
.st-camtaken .e045-camshelf { opacity: 0; }
.e045-flash { opacity: 0; pointer-events: none; } .st-flash .e045-flash { animation: e045Flash .5s ease-out; }
@keyframes e045Flash { 0% { opacity: .9; } 100% { opacity: 0; } }
.st-b5 .e045-flashb { animation: e045Bob .3s ease-in-out infinite alternate; }
.st-goggles .e045-gog { opacity: 0; }
.e045-rise { transform: translateY(18px); transition: transform 1.6s ease-out; } .st-b6 .e045-rise { transform: translateY(0); }
.e045-swim { animation: e045Swim 2s ease-in-out infinite alternate; } @keyframes e045Swim { from { transform: translateX(-8px); } to { transform: translateX(16px); } }
.e045-q { opacity: 0; transform: scale(.3); transform-origin: 2246px 104px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.6,.6,1); } .st-q .e045-q { opacity: 1; transform: scale(1); }
.e045-snk, .e045-hd { opacity: 0; transition: opacity .3s; }
.e045-snacks .e045-snk, .e045-dadin .e045-hd { opacity: 1; }
.es-thing.is-walk .e045-wheel, .e045-rev .e045-wheel { animation: e045Spin .45s linear infinite; } @keyframes e045Spin { to { transform: rotate(360deg); } }
.e045-rev .e045-carbody { animation: e045Rev .12s ease-in-out infinite alternate; } @keyframes e045Rev { to { transform: translateY(-1.5px); } }
@media (prefers-reduced-motion: reduce) {
  .e045-mcar, .e045-swim, .st-boat .e045-mb { animation-duration: 6s; }
  .e045-bob { animation: none; }
  .e045-rev .e045-carbody { animation: none; }
}
`;

/** Bật / tắt class trên phần tử của một nhân vật (xe: bố ngồi trong, đồ ăn vặt sau xe). */
const mark = (st, id, cls, on = true) => st.a(id).el.classList.toggle(cls, on);

const BEATS = [
  { key: ['summer holiday is coming', 'going to visit Ha Long Bay'], icon: '🏝️', label: 'visit Ha Long Bay', async play(st) {
    st.look(300);
    st.pose('minh', 'point'); st.set('st-summer'); st.sfx('page-turn');
    await st.wait(900);
    st.set('st-b0'); st.sfx('sparkle', { vol: 0.6 });
    for (const id of ['minh', 'lan']) { st.pose(id, 'cheer'); st.act(id, 'jump'); st.mood(id, 'joy'); }
    st.pose('mum', 'clap'); st.act('mum', 'clap'); st.sfx('clap', { vol: 0.6 }); st.mood('mum', 'joy'); st.mood('dad', 'joy');
    await st.wait(1900);
    for (const id of ['minh', 'lan', 'mum']) { st.act(id, null); st.pose(id, 'stand'); st.mood(id, 'happy'); }
  } },
  { key: ['travel by car'], icon: '🚗', label: 'by car', async play(st) {
    st.set('st-b0', false);
    await Promise.all([
      st.walk('dad', 790, { speed: 200, lead: 140 }),
      st.walk('minh', 730, { speed: 190, follow: false }),
    ]);
    st.face('minh', 1);
    st.set('st-b1'); st.sfx('pop', { vol: 0.7 }); st.pose('dad', 'point'); st.pose('minh', 'cheer'); st.mood('minh', 'joy');
    await st.wait(400); st.sfx('car-go', { vol: 0.4 });
    await st.wait(1200);
    st.pose('dad', 'stand'); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['Dad is going to drive', 'lots of snacks'], icon: '🍪', label: 'drive, snacks', async play(st) {
    st.set('st-b1', false);
    st.look(880);
    await st.walk('dad', 900, { speed: 150, follow: false });
    st.sfx('door-open', { vol: 0.6 });
    st.show('dad', false); mark(st, 'car', 'e045-dadin');
    st.walk('minh', 780, { speed: 120, follow: false });
    mark(st, 'car', 'e045-rev'); st.sfx('car-go', { vol: 0.5 });
    await st.walk('mum', 700, { speed: 220, follow: false });
    mark(st, 'car', 'e045-rev', false);
    st.face('minh', -1);
    st.pose('mum', 'give');
    for (let i = 0; i < SNACKS.length; i++) {
      st.sfx('whoosh', { vol: 0.35, rate: 1 + i * 0.08 });
      st.fly(SNACKS[i], [722, 196], [880 - i * 12, 214], { size: 22, dur: 560 });
      await st.wait(260);
    }
    await st.wait(300);
    mark(st, 'car', 'e045-snacks'); st.chest('mum', '');
    st.pose('mum', 'stand'); st.mood('mum', 'joy'); st.pose('minh', 'clap'); st.act('minh', 'clap'); st.sfx('clap', { vol: 0.6 });
    await st.wait(700);
    st.act('minh', null); st.pose('minh', 'stand'); st.mood('mum', 'happy');
  } },
  { key: ['small hotel near the beach', 'three nights'], icon: '🏨', label: 'hotel, 3 nights', async play(st) {
    await st.walk('lan', 1126, { speed: 300, lead: 110 });
    st.face('lan', 1); st.pose('lan', 'point');
    st.set('st-laptop'); st.sfx('typing', { vol: 0.5 });
    await st.wait(400);
    st.set('st-b3'); st.sfx('pop', { vol: 0.6 });
    for (let i = 1; i <= 3; i++) { await st.wait(450); st.set(`st-moon${i}`); st.sfx('ding', { vol: 0.45, rate: 0.9 + i * 0.1 }); }
    await st.wait(900);
    st.pose('lan', 'stand');
  } },
  { key: ['first day', 'boat trip around the islands'], icon: '⛵', label: 'boat trip', async play(st) {
    st.set('st-b3', false); for (let i = 1; i <= 3; i++) st.set(`st-moon${i}`, false);
    await st.walk('minh', 1330, { speed: 280, lead: 30 });
    st.set('st-boat'); st.sfx('pop', { vol: 0.6 }); st.pose('minh', 'point'); st.act('minh', 'point'); st.face('lan', 1);
    await st.wait(400); st.sfx('splash', { vol: 0.5 });
    await st.wait(1000); st.sfx('boat-horn', { vol: 0.5 });
    await st.wait(1000);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['take photos of the beautiful rocks'], icon: '📷', label: 'take photos', async play(st) {
    await st.walk('lan', 1270, { speed: 120, follow: false });
    st.set('st-camtaken'); st.hold('lan', 'e045_cam'); st.pose('lan', 'e045_photo');
    await st.wait(500);
    st.set('st-b5');
    st.set('st-flash'); st.sfx('camera');
    await st.wait(600);
    st.set('st-flash', false); st.mood('lan', 'joy');
    await st.wait(500);
    st.set('st-flash'); st.sfx('camera', { vol: 0.8 });
    await st.wait(800);
    st.set('st-flash', false);
  } },
  { key: ['swim in the sea every morning'], icon: '🏊', label: 'swim', async play(st) {
    st.set('st-b5', false); st.set('st-boat', false); st.pose('lan', 'stand'); st.mood('lan', 'happy');
    await st.walk('minh', 1712, { speed: 260, lead: -40 });
    st.face('minh', 1);
    st.set('st-goggles'); st.chest('minh', GOGGLES); st.sfx('poof', { vol: 0.3 });
    await st.wait(300);
    st.set('st-b6'); st.pose('minh', 'swim'); st.act('minh', 'swim'); st.mood('minh', 'joy');
    st.sfx('splash', { vol: 0.6 });
    await st.wait(1100); st.sfx('splash', { vol: 0.5, rate: 1.1 });
    await st.wait(1100);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ["Grandma isn't going to come", 'Lucky is going to stay with her'], icon: '🐶', label: 'stay with Grandma', async play(st) {
    st.set('st-b6', false); st.chest('minh', ''); st.set('st-goggles', false); st.mood('minh', 'happy');
    st.hold('lan', null); st.pose('lan', 'stand');
    st.place('lan', 1640, FLOOR, 1);
    await Promise.all([
      st.walk('minh', 2060, { speed: 300, lead: 140 }),
      st.walk('lan', 2000, { speed: 300, follow: false }),
    ]);
    st.mood('grandma', 'sad'); st.act('grandma', 'no'); st.sfx('buzz-no', { vol: 0.5 });
    st.set('st-b7'); st.sfx('pop', { vol: 0.6 });
    await st.wait(1000);
    st.act('grandma', null); st.mood('grandma', 'happy');
    st.dog('lucky', 'stand'); st.sfx('dog-bark', { vol: 0.5 });
    await st.walk('lucky', 2240, { speed: 120, follow: false });
    st.face('lucky', -1); st.dog('lucky', 'sit'); st.act('lucky', 'wag');
    st.pose('grandma', 'e045_pat'); st.fx('hearts', 2235, 200);
    await st.wait(900);
    st.pose('grandma', 'stand');
  } },
  { key: ['bring me a present'], icon: '🎁', label: 'a present?', async play(st) {
    st.set('st-b7', false); st.act('lucky', null);
    st.look(2150);
    st.set('st-b8'); st.sfx('pop', { vol: 0.6 }); st.pose('grandma', 'open');
    await st.say('grandma', 'Are you going to bring me a present?', 2600);
  } },
  { key: ['Grandma asks'], icon: '❓', label: 'Grandma asks', async play(st) {
    st.set('st-q'); st.sfx('pop', { vol: 0.7 });
    st.pose('grandma', 'shrug'); st.mood('grandma', 'wow');
    await st.wait(1500);
    st.pose('grandma', 'stand'); st.mood('grandma', 'happy');
  } },
  { key: ['Yes, we are'], icon: '🙋', label: 'Yes, we are!', async play(st) {
    st.set('st-q', false); st.set('st-b8', false);
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    st.pose('lan', 'raise'); st.act('lan', 'nod'); st.mood('lan', 'joy'); st.sfx('cheer', { vol: 0.6 });
    await st.say('minh', 'Yes, we are!', 1700);
    st.act('minh', null); st.act('lan', null); st.pose('lan', 'stand');
  } },
  { key: ['Minh says'], icon: '🤗', label: 'Minh says', async play(st) {
    st.pose('minh', 'stand');
    await st.walk('minh', 2140, { speed: 140, follow: false });
    st.set('st-b11');
    st.pose('minh', 'carry'); st.pose('grandma', 'carry'); st.mood('grandma', 'joy'); st.sfx('giggle', { vol: 0.6 });
    st.fx('hearts', 2170, 130);
    await st.wait(1500);
  } },
];

export default {
  id: 'en045', worldW: 2400, floor: FLOOR, viewTop: 40, camStart: 55, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  order: [0, 2, 3, 4, 6, 7],
  poses: {
    e045_photo: { R: [146, 250], L: [146, 250] },
    e045_pat: { R: [40, 20], L: [10, 4], head: 8 },
  },
  props: { e045_cam: CAMERA },
  cast: [
    { id: 'car', kind: 'thing', x: 940, svg: CAR, box: [-120, -110, 240, 114] },
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: 2190, s: 0.92, face: -1 },
    { id: 'lucky', kind: 'dog', x: 2130, s: 0.8, face: -1 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 170, s: 0.95 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 230, s: 0.95 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 300, s: 1.08 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 360, face: -1 },
  ],
  init(st) {
    st.chest('mum', BASKET);
    st.dog('lucky', 'sit');
  },
};
