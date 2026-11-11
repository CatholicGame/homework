/**
 * Bài 50 "Chores at Home": nhà Minh, trái sang phải: phòng của hai chị em (giá sách của Lan, giường Minh, đồ chơi, hộp đồ chơi,
 * bát ăn của Lucky) → phòng khách + bếp (bảng việc nhà, lịch, cửa sổ to bị bẩn, bồn rửa bát) → cửa → sân (chậu cây, thùng rác,
 * mèo Kitty nằm sưởi nắng, bóng của Minh, cây có ghế của Lan, biển chỉ đường về nhà bà).
 * have to = việc trong bảng việc nhà (mỗi người một hàng, hiện dấu ✓ khi làm xong); don't have to = bong bóng "no need",
 * Chủ nhật bảng có dấu "day off", bảng việc của Kitty "0". Đổi buổi / đổi ngày bằng màn tối ngắn.
 * Toạ độ cảnh: rộng 2000, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { headOnly } from '../../tiengViet3/cast.js';
import { BOOK } from '../rig.js';
import { KIT_CSS, L, room, doorway, cloud, tree, bush, fence, label, thought, BALL, books } from '../kit.js';

const FLOOR = 282;
const T = (x, y, s, c, size = 12, cls = '') => `<text${cls ? ` class="${cls}"` : ''} x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="${size}" fill="${c}">${s}</text>`;

// ── Hình nhỏ (gốc ở giữa) ──────────────────────────────────────────────────
const I_BED = `<rect x="-14" y="0" width="28" height="7" rx="2" fill="#fff" stroke="${L}" stroke-width="0.8"/><rect x="-16" y="-8" width="4" height="17" rx="1.5" fill="#A16207"/>
  <rect x="-12" y="-4" width="8" height="5" rx="2" fill="#fff" stroke="${L}" stroke-width="0.6"/><path d="M-4 0 Q-3 -7 3 -6 H14 V0Z" fill="#60A5FA" stroke="${L}" stroke-width="0.6"/>`;
const I_FOOD = `<path d="M-10 -2 H10 Q9 7 0 7 Q-9 7 -10 -2Z" fill="#EF4444" stroke="${L}" stroke-width="0.8"/><ellipse cy="-2" rx="10" ry="2.6" fill="#92400E" stroke="${L}" stroke-width="0.6"/>`;
const I_DISH = `<ellipse rx="12" ry="5" fill="#fff" stroke="#3B82F6" stroke-width="1.4"/><ellipse rx="6" ry="2.4" fill="none" stroke="#93C5FD"/>${[[-10, -8], [8, -10], [0, -14]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#E0F2FE" stroke="#7DD3FC" stroke-width="0.6"/>`).join('')}`;
const I_TRASH = `<path d="M-9 -4 Q-12 10 0 11 Q12 10 9 -4 Q4 -6 0 -4 Q-4 -6 -9 -4Z" fill="#1F2937" stroke="${L}" stroke-width="0.8"/><path d="M-3 -4 L0 -10 L3 -4" fill="#1F2937" stroke="${L}" stroke-width="0.8"/>`;
const I_CAN = `<path d="M-9 -6 H5 V8 H-9Z" fill="#22C55E" stroke="${L}" stroke-width="0.8"/><path d="M5 -2 L14 -8" stroke="#22C55E" stroke-width="2.6"/><path d="M-9 -6 Q-2 -14 5 -6" stroke="${L}" stroke-width="1" fill="none"/>`;
const I_WIN = `<rect x="-14" y="-12" width="28" height="24" rx="2" fill="#BAE6FD" stroke="${L}"/><path d="M0 -12 V12 M-14 0 H14" stroke="#fff" stroke-width="2"/><circle cx="-6" cy="-5" r="3" fill="#A8A29E" opacity="0.7"/><circle cx="7" cy="6" r="3.4" fill="#A8A29E" opacity="0.7"/>`;
const I_TICK = `<circle r="8" fill="#22C55E" stroke="${L}" stroke-width="0.8"/><path d="M-4 0 L-1 3.4 L4.4 -3.4" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const TOY_CAR = `<rect x="-11" y="-8" width="22" height="8" rx="3" fill="#3B82F6" stroke="${L}" stroke-width="0.8"/><path d="M-6 -8 L-3 -13 H4 L7 -8Z" fill="#BAE6FD" stroke="${L}" stroke-width="0.7"/><circle cx="-6" cy="0" r="3" fill="#1F2937"/><circle cx="6" cy="0" r="3" fill="#1F2937"/>`;
const TEDDY = `<circle cx="0" cy="-6" r="7" fill="#C08457" stroke="${L}" stroke-width="0.8"/><circle cx="-6" cy="-12" r="2.6" fill="#C08457" stroke="${L}" stroke-width="0.6"/><circle cx="6" cy="-12" r="2.6" fill="#C08457" stroke="${L}" stroke-width="0.6"/>
  <ellipse cx="0" cy="5" rx="7" ry="6" fill="#C08457" stroke="${L}" stroke-width="0.8"/><circle cx="-2.4" cy="-7" r="1" fill="${L}"/><circle cx="2.4" cy="-7" r="1" fill="${L}"/><ellipse cx="0" cy="-4" rx="2" ry="1.4" fill="#F5E6D3"/>`;
const BOOKI = (c) => `<rect x="-6" y="-9" width="12" height="18" rx="1" fill="${c}" stroke="${L}" stroke-width="0.7"/><path d="M-4 -6 H4" stroke="#fff" stroke-width="1"/>`;
const SPONGE = `<rect x="-7" y="-4" width="14" height="9" rx="2" fill="#FDE047" stroke="${L}" stroke-width="0.7"/><rect x="-7" y="2" width="14" height="3" fill="#22C55E"/>`;
const TRASHBAG = `<g transform="translate(0 -4) scale(1.5)">${I_TRASH}</g>`;

/** Bảng việc nhà: mỗi người một hàng (mặt + việc), ✓ hiện khi làm xong (st-done-*). */
const chart = (x, y) => {
  const rows = [['en_minh_home', [I_BED, I_FOOD], 'minh'], ['en_lan_home', [I_DISH], 'lan'], ['en_dad_home', [I_TRASH], 'dad'], ['en_mum_home', [I_CAN], 'mum']];
  return `<g transform="translate(${x} ${y})"><defs><clipPath id="e050hc"><circle r="11.5"/></clipPath></defs>
    <rect x="-80" y="-4" width="160" height="128" rx="6" fill="#FEF9C3" stroke="${L}" stroke-width="1.4"/>
    <rect x="-80" y="-4" width="160" height="22" rx="6" fill="#F97316" stroke="${L}" stroke-width="1.4"/>${T(0, 12, 'WE HAVE TO HELP', '#fff', 11)}
    ${rows.map(([who, icons, k], i) => `<g transform="translate(0 ${34 + i * 26})"><g class="e050-row e050-row${i}">
      <path d="M-74 12 H74" stroke="#E7E5E4"/>
      <g transform="translate(-56 0)"><circle r="11.5" fill="#fff"/><g clip-path="url(#e050hc)">${headOnly(who, { s: 0.6 })}</g></g>
      ${icons.map((ic, j) => `<g transform="translate(${-10 + j * 30} 0)">${ic}</g>`).join('')}
      <g class="e050-tick e050-tick-${k}" transform="translate(58 0)">${I_TICK}</g></g></g>`).join('')}
    <g class="e050-off"><rect x="-80" y="-4" width="160" height="128" rx="6" fill="#fff" opacity="0.75"/>
      <g transform="translate(0 64) rotate(-10)"><rect x="-62" y="-20" width="124" height="40" rx="8" fill="#FDE047" stroke="#DC2626" stroke-width="2.4"/>${T(0, -2, 'SUNDAY', '#DC2626', 13)}${T(0, 14, 'no chores!', '#DC2626', 12)}</g></g>
  </g>`;
};

/** Bong bóng lời nói (tâm x, y; đuôi tới tx, ty). */
const bubble = (cls, x, y, w, h, [tx, ty], inner) => {
  const bx = Math.max(x - w / 2 + 14, Math.min(x + w / 2 - 14, tx));
  return `<g class="e050-bub ${cls}" style="transform-origin:${tx}px ${ty}px">
  <path d="M${bx - 8} ${y + h / 2 - 2} L${tx} ${ty} L${bx + 8} ${y + h / 2 - 2}Z" fill="#fff" stroke="${L}" stroke-width="1.4" stroke-linejoin="round"/>
  <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="16" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <rect x="${bx - 7}" y="${y + h / 2 - 4}" width="14" height="5" fill="#fff"/><g transform="translate(${x} ${y})">${inner}</g></g>`;
};

function bg() {
  return `
  <!-- Phòng của Minh và Lan -->
  ${room(0, 600, FLOOR, '#E0F2FE', '#D9A066')}
  ${Array.from({ length: 14 }, (_, i) => `<path d="M${20 + (i * 89) % 560} ${30 + (i * 41) % 120} l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2Z" fill="#BAE6FD"/>`).join('')}
  <!-- giá sách + bàn của Lan -->
  <rect x="40" y="96" width="120" height="7" rx="2" fill="#A16207" stroke="${L}"/>${books(48, 96, 4)}
  <g class="e050-shelfbooks">${books(90, 96, 5)}</g>
  <rect x="34" y="214" width="136" height="9" rx="3" fill="#F59E0B" stroke="${L}"/><path d="M44 223 V${FLOOR} M160 223 V${FLOOR}" stroke="#B45309" stroke-width="5"/>
  <g class="e050-deskbooks">${[[60, '#EF4444'], [80, '#3B82F6'], [100, '#22C55E']].map(([x, c], i) => `<g transform="translate(${x} ${205 - i * 2}) rotate(${-30 + i * 25})">${BOOKI(c)}</g>`).join('')}</g>
  <!-- cửa sổ phòng -->
  <rect x="244" y="64" width="110" height="90" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <rect x="250" y="70" width="98" height="78" fill="#BAE6FD"/><g transform="translate(322 98)"><circle r="12" fill="#FDE047" stroke="#F59E0B" stroke-width="2"/></g>
  <path d="M250 132 Q290 120 348 130 V148 H250Z" fill="#86EFAC"/><path d="M299 70 V148 M250 109 H348" stroke="#fff" stroke-width="3" opacity="0.8"/>
  <!-- giường Minh: chăn rối / chăn gọn -->
  <rect x="186" y="238" width="190" height="18" rx="4" fill="#fff" stroke="${L}"/><rect x="186" y="254" width="190" height="10" fill="#2563EB" stroke="${L}"/>
  <rect x="180" y="190" width="14" height="${FLOOR - 190}" rx="4" fill="#A16207" stroke="${L}"/><rect x="366" y="226" width="10" height="${FLOOR - 226}" rx="3" fill="#A16207" stroke="${L}"/>
  <g class="e050-messy"><rect x="194" y="220" width="36" height="20" rx="9" fill="#fff" stroke="${L}" transform="rotate(-18 212 230)"/>
    <path d="M232 240 Q236 214 262 222 Q280 204 300 222 Q330 214 336 232 Q352 236 350 248 L300 252 Q270 256 240 250Z" fill="#FDBA74" stroke="${L}"/>
    <path d="M250 236 q12 -8 24 0 M290 230 q14 -6 26 4" stroke="#EA580C" stroke-width="1.2" fill="none"/></g>
  <g class="e050-made"><rect x="198" y="222" width="38" height="16" rx="7" fill="#fff" stroke="${L}"/>
    <path d="M240 240 Q240 226 254 226 H360 Q368 228 368 240Z" fill="#FDBA74" stroke="${L}"/><path d="M250 232 H360" stroke="#fff" stroke-width="1.6" opacity="0.7"/></g>
  <!-- hộp đồ chơi + bát của Lucky -->
  <g transform="translate(470 ${FLOOR})"><rect x="-26" y="-34" width="52" height="34" rx="3" fill="#F472B6" stroke="${L}"/><rect x="-28" y="-38" width="56" height="7" rx="2" fill="#EC4899" stroke="${L}"/>
    ${T(0, -12, 'TOYS', '#fff', 10)}</g>
  <g class="e050-boxtoys"><g transform="translate(458 ${FLOOR - 40})">${TEDDY}</g><g transform="translate(482 ${FLOOR - 40})"><circle r="7" fill="#EF4444" stroke="${L}" stroke-width="0.8"/></g></g>
  <g transform="translate(540 ${FLOOR - 7})"><path d="M-14 -4 H14 Q13 7 0 7 Q-13 7 -14 -4Z" fill="#EF4444" stroke="${L}"/><text x="0" y="5" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="6" fill="#fff">LUCKY</text>
    <g class="e050-food"><ellipse cy="-4" rx="13" ry="3.4" fill="#92400E" stroke="${L}" stroke-width="0.6"/>${[-7, -2, 3, 8].map((x) => `<circle cx="${x}" cy="-6" r="2" fill="#B45309"/>`).join('')}</g></g>
  ${doorway(600, FLOOR)}

  <!-- Phòng khách + bếp -->
  ${room(600, 700, FLOOR, '#FEF3C7', '#D9A066')}
  ${chart(760, 52)}
  <g transform="translate(872 96)"><rect x="-30" y="-24" width="60" height="54" rx="4" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-30" y="-24" width="60" height="13" rx="4" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    <g class="e050-day0">${T(0, 10, 'every', '#64748B', 10)}${T(0, 22, 'day', '#64748B', 10)}</g>
    <g class="e050-day1">${T(0, 14, 'SATURDAY', '#2563EB', 8.4)}</g><g class="e050-day2">${T(0, 14, 'SUNDAY', '#DC2626', 10)}</g></g>
  <!-- cửa sổ to (bẩn) -->
  <rect x="934" y="64" width="132" height="116" rx="4" fill="#fff" stroke="${L}" stroke-width="1.6"/>
  <rect x="940" y="70" width="120" height="104" fill="#BAE6FD"/>${cloud(980, 104, 0.6, 0)}
  <path d="M940 150 Q990 136 1030 148 T1060 144 V174 H940Z" fill="#86EFAC"/>
  <g class="e050-nightwin"><rect x="940" y="70" width="120" height="104" fill="#1E1B4B"/><g transform="translate(1030 100)"><circle r="12" fill="#FEF9C3"/><circle cx="6" cy="-4" r="10" fill="#1E1B4B"/></g>
    ${[[956, 90], [990, 120], [1046, 150], [970, 150]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#FDE68A"/>`).join('')}</g>
  <path d="M1000 70 V174 M940 122 H1060" stroke="#fff" stroke-width="3.4" opacity="0.85"/>
  <g class="e050-dirt">${[[960, 92, 9], [992, 140, 11], [1040, 96, 8], [1030, 156, 10], [970, 160, 7], [1046, 128, 6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#A8A29E" opacity="0.65"/>`).join('')}</g>
  <!-- bếp: bồn rửa, cửa sổ nhỏ, đồng hồ -->
  <rect x="1160" y="206" width="130" height="${FLOOR - 206}" fill="#16A34A" stroke="${L}" stroke-width="1.2"/><rect x="1154" y="200" width="142" height="10" rx="3" fill="#F5F5F4" stroke="${L}"/>
  <rect x="1176" y="218" width="44" height="54" rx="3" fill="#15803D" stroke="${L}" stroke-width="0.8"/><rect x="1230" y="218" width="44" height="54" rx="3" fill="#15803D" stroke="${L}" stroke-width="0.8"/>
  <path d="M1196 200 V188 H1210" stroke="#94A3B8" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path class="e050-tap" d="M1209 192 V204" stroke="#38BDF8" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="3 3"/>
  <g class="e050-dirty">${[0, 1, 2].map((i) => `<g transform="translate(${1254 + (i % 2) * 3} ${196 - i * 5})"><ellipse rx="13" ry="3.6" fill="#fff" stroke="#3B82F6" stroke-width="1.1"/><circle cx="${-4 + i * 3}" cy="-1" r="1.6" fill="#B45309"/></g>`).join('')}</g>
  <g class="e050-clean">${[0, 1, 2].map((i) => `<g transform="translate(1180 ${196 - i * 5})"><ellipse rx="13" ry="3.6" fill="#fff" stroke="#3B82F6" stroke-width="1.1"/></g>`).join('')}</g>
  <rect x="1186" y="86" width="84" height="74" rx="4" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="1191" y="91" width="74" height="64" fill="#BAE6FD"/>
  <g class="e050-nightwin"><rect x="1191" y="91" width="74" height="64" fill="#1E1B4B"/><g transform="translate(1240 112)"><circle r="9" fill="#FEF9C3"/></g><circle cx="1206" cy="104" r="1.4" fill="#FDE68A"/><circle cx="1220" cy="140" r="1.4" fill="#FDE68A"/></g>
  <path d="M1228 91 V155" stroke="#fff" stroke-width="3" opacity="0.8"/>
  <g class="e050-clock" transform="translate(1110 90)"><circle r="16" fill="#fff" stroke="${L}" stroke-width="1.4"/><path d="M0 0 V-10 M0 0 L7 4" stroke="${L}" stroke-width="2" stroke-linecap="round"/>${T(0, 32, 'after dinner', '#7C3AED', 9, 'e050-ad')}</g>
  <!-- cửa ra sân -->
  <rect x="1296" y="96" width="16" height="${FLOOR - 96}" fill="#C08B5C" stroke="${L}"/>

  <!-- Sân -->
  <rect x="1312" y="0" width="690" height="${FLOOR}" fill="#7DD3FC"/>
  ${cloud(1440, 60, 0.9, 1)}${cloud(1780, 48, 0.8, 3)}
  <g transform="translate(1660 60)"><circle r="18" fill="#FDE047" stroke="#F59E0B" stroke-width="2"/></g>
  <path d="M1312 232 Q1500 202 1700 228 T2000 222 V${FLOOR} H1312Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${fence(1600, 160, FLOOR)}
  ${tree(1840, FLOOR - 2, 1.15)}
  <!-- ghế đá dưới cây -->
  <rect x="1786" y="${FLOOR - 30}" width="80" height="8" rx="3" fill="#A8A29E" stroke="${L}"/><path d="M1794 ${FLOOR - 22} V${FLOOR} M1858 ${FLOOR - 22} V${FLOOR}" stroke="#78716C" stroke-width="5"/>
  <!-- biển chỉ đường về nhà bà -->
  <g transform="translate(1950 0)"><path d="M0 ${FLOOR} V150" stroke="#92400E" stroke-width="5"/><path d="M-36 132 H26 L38 146 L26 160 H-36Z" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/>${T(-4, 150, "Grandma's", '#B45309', 10)}</g>
  <!-- chậu cây -->
  ${[1392, 1430, 1468].map((x, i) => `<g transform="translate(${x} ${FLOOR})"><path d="M-12 -22 H12 L9 0 H-9Z" fill="#C2410C" stroke="${L}"/>
    <g class="e050-plant" style="transform-origin:0 -22px;transition-delay:${i * 0.15}s"><path d="M0 -22 Q-14 -40 -12 -54 Q0 -44 0 -22 Q4 -48 14 -52 Q14 -36 0 -22Z" fill="#22C55E" stroke="${L}" stroke-width="0.8"/>${i === 1 ? `<circle cx="0" cy="-50" r="5" fill="#F472B6" stroke="${L}" stroke-width="0.6"/>` : ''}</g></g>`).join('')}
  <!-- thùng rác -->
  <g transform="translate(1590 ${FLOOR})"><rect x="-20" y="-46" width="40" height="46" rx="4" fill="#16A34A" stroke="${L}"/><path d="M-12 -38 V-8 M0 -38 V-8 M12 -38 V-8" stroke="#15803D" stroke-width="2"/>
    <g class="e050-lid" style="transform-origin:-22px -48px"><rect x="-23" y="-54" width="46" height="8" rx="3" fill="#15803D" stroke="${L}"/></g>
    <g class="e050-inbag" transform="translate(0 -50)">${I_TRASH}</g></g>
  <!-- thảm của Kitty -->
  <ellipse cx="1520" cy="${FLOOR + 2}" rx="30" ry="6" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>
  <rect x="1312" y="${FLOOR - 6}" width="690" height="${315 - FLOOR + 6}" fill="#86EFAC" stroke="${L}"/>
  ${Array.from({ length: 14 }, (_, i) => `<path d="M${1330 + i * 46} ${FLOOR + 12} l3 -7 l3 7" stroke="#16A34A" stroke-width="1.4" fill="none"/>`).join('')}
  ${bush(1740, FLOOR + 2, 0.8)}`;
}

function fg() {
  return `
  <!-- đồ chơi bừa trên sàn -->
  <g class="e050-toy1" transform="translate(262 ${FLOOR - 1})">${TOY_CAR}</g>
  <g class="e050-toy2" transform="translate(316 ${FLOOR - 8})">${TEDDY}</g>
  <g class="e050-toy3" transform="translate(372 ${FLOOR - 7})"><circle r="7" fill="#EF4444" stroke="${L}" stroke-width="0.8"/></g>
  <g class="e050-lbl-tidy">${label(300, 190, 'tidy!', '#DB2777', 16)}</g>
  <g class="e050-lbl-sat">${label(300, 64, 'Saturday', '#2563EB', 15)}</g>
  <!-- bong bóng -->
  ${bubble('e050-b-ask', 880, 94, 92, 54, [902, 128], `<g transform="translate(-14 0) scale(1.2)">${I_WIN}</g>${T(24, 11, '?', '#F97316', 30)}`)}
  ${bubble('e050-b-no', 1040, 86, 140, 58, [1080, 116], `<g transform="translate(-44 0) scale(1.1)">${I_WIN}</g><g transform="translate(-14 0)">${headOnly('en_minh_home', { s: 0.5 })}</g>${T(30, 6, 'no need', '#16A34A', 14)}`)}
  ${bubble('e050-b-dad', 1040, 86, 120, 58, [1012, 118], `<g transform="translate(-30 0)">${headOnly('en_dad_home', { s: 0.6 })}</g><g transform="translate(6 0) scale(1.1)">${I_WIN}</g><g transform="translate(40 0)">${I_TICK}</g>`)}
  ${thought(1720, 112, 120, 74, `<g transform="translate(-26 4)">${headOnly('en_grandma', { mood: 'joy', s: 0.95 })}</g><g transform="translate(26 6)"><path d="M-18 0 L0 -16 L18 0Z" fill="#EF4444" stroke="${L}"/><rect x="-14" y="0" width="28" height="18" fill="#FEF3C7" stroke="${L}"/><rect x="-4" y="6" width="8" height="12" fill="#B45309"/></g>`, [1740, 170], 'e050-gma')}
  <g class="e050-kchores" transform="translate(1520 150)"><rect x="-54" y="-30" width="108" height="62" rx="6" fill="#FEF9C3" stroke="${L}" stroke-width="1.4"/>
    <rect x="-54" y="-30" width="108" height="18" rx="6" fill="#A855F7" stroke="${L}" stroke-width="1.4"/>${T(0, -17, "Kitty's chores", '#fff', 10)}${T(0, 22, '0', '#7C3AED', 30)}</g>
  <g class="e050-lbl-lucky">${label(1520, 196, 'lucky!', '#7C3AED', 14)}</g>
  <!-- sạch bóng -->
  <g class="e050-shine">${[[950, 84], [1050, 160], [1000, 120]].map(([x, y]) => `<path d="M${x} ${y - 8} l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2Z" fill="#fff"/>`).join('')}</g>
  <rect class="e050-fade" x="0" y="0" width="2000" height="315" fill="#1E293B"/>`;
}

const CSS = `
.e050-messy, .e050-made, .e050-food, .e050-boxtoys, .e050-shelfbooks, .e050-deskbooks, .e050-dirt, .e050-dirty, .e050-clean, .e050-inbag, .e050-nightwin,
.e050-day0, .e050-day1, .e050-day2, .e050-off, .e050-tick, .e050-ad, .e050-shine, .e050-kchores, .e050-gma, [class^="e050-lbl"], [class^="e050-toy"] { transition: opacity .35s; }
.e050-made, .st-made .e050-messy { opacity: 0; } .st-made .e050-made { opacity: 1; }
.e050-food { opacity: 0; } .st-fed .e050-food { opacity: 1; }
.e050-boxtoys, .e050-shelfbooks { opacity: 0; } .st-tidy .e050-boxtoys, .st-tidy .e050-shelfbooks { opacity: 1; }
.st-tidy .e050-deskbooks, .st-tidy [class^="e050-toy"] { opacity: 0; }
.st-clean .e050-dirt { opacity: 0; }
.e050-shine { opacity: 0; } .st-shine .e050-shine { opacity: 1; animation: e050Twinkle .5s ease-in-out infinite alternate; }
@keyframes e050Twinkle { from { opacity: .3; } to { opacity: 1; } }
.e050-clean { opacity: 0; } .st-washed .e050-clean { opacity: 1; } .st-washed .e050-dirty { opacity: 0; }
.e050-tap { opacity: 0; } .st-wash .e050-tap { opacity: 1; animation: e050Tap .3s linear infinite; }
@keyframes e050Tap { to { stroke-dashoffset: -6; } }
.e050-nightwin, .e050-ad { opacity: 0; } .st-night .e050-nightwin, .st-night .e050-ad { opacity: 1; }
.e050-inbag { opacity: 0; } .st-binned .e050-inbag { opacity: 1; }
.e050-lid { transition: transform .3s; } .st-lid .e050-lid { transform: rotate(-70deg); }
.e050-plant { transition: transform .6s cubic-bezier(.3,1.6,.6,1); transform: scale(.8) rotate(-6deg); } .st-watered .e050-plant { transform: scale(1.15); }
.e050-day1, .e050-day2 { opacity: 0; } .st-sat .e050-day1, .st-sun .e050-day2 { opacity: 1; } .st-sat .e050-day0, .st-sun .e050-day0 { opacity: 0; }
.e050-off { opacity: 0; } .st-sun .e050-off { opacity: 1; }
.e050-tick { opacity: 0; } ${['minh', 'lan', 'dad', 'mum'].map((k) => `.st-done-${k} .e050-tick-${k}`).join(', ')} { opacity: 1; }
.e050-row { transition: transform .4s cubic-bezier(.3,1.6,.6,1); transform-box: fill-box; transform-origin: center; }
.st-chart .e050-row { animation: e050Row 1.6s ease-in-out 1; }
.st-chart .e050-row1 { animation-delay: .25s; } .st-chart .e050-row2 { animation-delay: .5s; } .st-chart .e050-row3 { animation-delay: .75s; }
@keyframes e050Row { 0%, 100% { transform: scale(1); } 30% { transform: scale(1.12); } }
[class^="e050-lbl"], .e050-kchores, .e050-gma { opacity: 0; }
.st-lbl-tidy .e050-lbl-tidy, .st-lbl-sat .e050-lbl-sat, .st-lbl-lucky .e050-lbl-lucky, .st-kchores .e050-kchores, .st-gma .e050-gma { opacity: 1; }
.e050-bub { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-b-ask .e050-b-ask, .st-b-no .e050-b-no, .st-b-dad .e050-b-dad { opacity: 1; transform: scale(1); }
.e050-fade { opacity: 0; pointer-events: none; transition: opacity .4s; } .st-fade .e050-fade { opacity: 1; }
.e050-zz .dg-eye { transform: scaleY(.12) !important; animation: none !important; }
.e050-zz.act-e050stretch .dg-bob { animation: e050Stretch 1.4s ease-in-out infinite alternate; transform-origin: 0 0; }
@keyframes e050Stretch { from { transform: scale(1, 1); } to { transform: scale(1.12, .9); } }
@media (prefers-reduced-motion: reduce) { .st-shine .e050-shine { animation-duration: 1.2s; } .e050-zz.act-e050stretch .dg-bob { animation-duration: 2.4s; } }
`;

/** Đổi buổi / đổi ngày: tối dần, đặt lại người (fn), sáng dần. */
async function fade(st, fn) {
  st.set('st-fade');
  await st.wait(420);
  await fn();
  await st.wait(60);
  st.set('st-fade', false);
  await st.wait(380);
}

const BEATS = [
  { key: ['everyone has to help'], icon: '👨‍👩‍👧‍👦', label: 'help at home', async play(st) {
    st.set('st-chart'); st.sfx('pop', { vol: 0.6 });
    st.pose('dad', 'raise'); st.mood('dad', 'joy');
    await st.wait(700);
    for (const id of ['minh', 'lan', 'mum']) { st.mood(id, 'joy'); st.pose(id, 'raise'); st.act(id, 'nod'); }
    st.sfx('clap', { vol: 0.5 });
    await st.wait(1500);
    for (const id of ['minh', 'lan', 'mum', 'dad']) { st.act(id, null); st.pose(id, 'stand'); st.mood(id, 'happy'); }
  } },
  { key: ['make his bed', 'feed Lucky'], icon: '🛏️', label: 'make bed, feed Lucky', async play(st) {
    st.set('st-chart', false);
    await st.walk('minh', 400, { speed: 190, lead: -60 });
    st.face('minh', -1); st.pose('minh', 'reach'); st.act('minh', 'wash');
    await st.wait(500);
    st.set('st-made'); st.fx('sparkle', 290, 226, { quiet: true }); st.sfx('whoosh', { vol: 0.5, rate: 0.8 });
    await st.wait(500);
    st.act('minh', null);
    st.look(450);
    await st.walk('minh', 500, { speed: 150, follow: false });
    st.hold('minh', 'e050_bag'); st.pose('minh', 'give');
    st.fly(I_FOOD, [520, 196], [540, 272], { size: 26, dur: 500 }); st.sfx('pour', { vol: 0.4, rate: 1.3 });
    await st.wait(500);
    st.set('st-fed'); st.hold('minh', null); st.pose('minh', 'stand');
    st.dog('lucky', 'stand'); st.act('lucky', 'wag'); st.mood('lucky', 'joy'); st.sfx('dog-bark', { vol: 0.4 });
    await st.wait(400);
    st.sfx('crunch', { vol: 0.5 });
    await st.wait(700);
    st.set('st-done-minh');
  } },
  { key: ['wash the dishes', 'after dinner'], icon: '🍽️', label: 'wash the dishes', async play(st) {
    st.act('lucky', null);
    await fade(st, async () => {
      st.set('st-night');
      st.place('lan', 1214, FLOOR, 1); st.face('lan', 1);
      st.place('minh', 640, FLOOR, 1); st.dog('lucky', 'sit');
      await st.look(1150, { instant: true });
    });
    st.pose('lan', 'wash'); st.act('lan', 'wash'); st.set('st-wash'); st.sfx('tap-water', { vol: 0.5 });
    st.fx('bubbles', 1214, 196, { n: 2 });
    await st.wait(300);
    await st.loop('dishes', () => st.wait(1000), { vol: 0.5 });
    st.set('st-washed'); st.fx('sparkle', 1180, 186);
    await st.wait(700);
    st.act('lan', null); st.set('st-wash', false); st.pose('lan', 'stand'); st.mood('lan', 'joy');
    st.set('st-done-lan');
  } },
  { key: ['take out the rubbish', 'water the plants'], icon: '🗑️', label: 'rubbish and plants', async play(st) {
    await fade(st, async () => {
      st.set('st-night', false);
      st.place('lan', 130, FLOOR, 1); st.mood('lan', 'happy');
      await st.look(900, { instant: true });
    });
    st.chest('dad', TRASHBAG); st.pose('dad', 'carry');
    st.hold('mum', 'watering'); st.pose('mum', 'give');
    st.walk('mum', 1360, { speed: 150, follow: false });
    await st.walk('dad', 1548, { speed: 170, lead: -40 });
    st.set('st-lid'); st.chest('dad', ''); st.pose('dad', 'give');
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(TRASHBAG, [1566, 200], [1590, 224], { size: 30, dur: 450 });
    st.sfx('bag-on', { vol: 0.6 });
    st.set('st-binned'); st.set('st-lid', false); st.pose('dad', 'stand');
    st.set('st-done-dad');
    st.pose('mum', 'e050_pour'); st.fx('drops', 1410, 220, { n: 2 }); st.sfx('pour', { vol: 0.5 });
    await st.wait(700);
    st.set('st-watered'); st.fx('drops', 1440, 220);
    await st.wait(900);
    st.pose('mum', 'stand');
    st.set('st-done-mum');
  } },
  { key: ['tidy their rooms', 'On Saturdays'], icon: '🧸', label: 'tidy rooms', async play(st) {
    await fade(st, async () => {
      st.set('st-sat'); st.set('st-lbl-sat');
      st.place('minh', 420, FLOOR, -1); st.place('lan', 130, FLOOR, 1);
      st.hold('mum', null); st.place('dad', 1214, FLOOR - 6, -1); st.place('mum', 1090, FLOOR, -1);
      st.place('lucky', 575, FLOOR, -1);
      await st.look(300, { instant: true });
    });
    st.pose('minh', 'reach'); st.pose('lan', 'reach');
    for (const [svg, from] of [[TOY_CAR, [262, 280]], [TEDDY, [316, 274]], [`<circle r="7" fill="#EF4444" stroke="${L}" stroke-width="0.8"/>`, [372, 275]]]) {
      st.fly(svg, from, [470, 244], { size: 26, dur: 550 });
      st.fly(BOOKI('#3B82F6'), [80, 205], [120, 84], { size: 22, dur: 550 }); st.sfx('whoosh', { vol: 0.3, rate: 1.2 });
      await st.wait(380);
    }
    st.set('st-tidy'); st.sfx('ding', { vol: 0.6 }); st.set('st-lbl-tidy');
    st.pose('minh', 'cheer'); st.pose('lan', 'cheer'); st.mood('minh', 'joy'); st.mood('lan', 'joy');
    await st.wait(1000);
    st.pose('minh', 'stand'); st.pose('lan', 'stand');
  } },
  { key: ['clean the windows'], icon: '🪟', label: 'clean the windows?', async play(st) {
    st.set('st-lbl-tidy', false); st.set('st-lbl-sat', false); st.mood('minh', 'happy'); st.mood('lan', 'happy');
    await st.walk('minh', 902, { speed: 200, lead: 90 });
    st.pose('minh', 'pointUp'); st.act('minh', 'point');
    st.set('st-b-ask'); st.sfx('pop', { vol: 0.6 }); st.talk('minh', true);
    await st.wait(1400);
    st.talk('minh', false); st.act('minh', null);
  } },
  { key: ['Minh asks'], icon: '🙋', label: 'Minh asks', async play(st) {
    st.pose('minh', 'shrug'); st.talk('minh', true); st.sfx('pop', { vol: 0.45, rate: 1.3 });
    st.pose('mum', 'think');
    await st.wait(1100);
    st.talk('minh', false);
  } },
  { key: ["you don't have to clean them"], icon: '🙅', label: 'no need', async play(st) {
    st.set('st-b-ask', false); st.pose('minh', 'stand');
    st.set('st-b-no'); st.sfx('pop', { vol: 0.6 }); st.talk('mum', true); st.pose('mum', 'open'); st.act('mum', 'no');
    await st.wait(400);
    st.sfx('buzz-no', { vol: 0.6 });
    await st.wait(1000);
    st.talk('mum', false); st.act('mum', null); st.mood('minh', 'joy');
    await st.wait(500);
  } },
  { key: ['Dad will do it'], icon: '🧽', label: 'Dad will do it', async play(st) {
    st.set('st-b-no', false); st.set('st-b-dad'); st.sfx('pop', { vol: 0.6 }); st.talk('mum', true); st.pose('mum', 'point');
    await st.wait(700);
    st.talk('mum', false); st.pose('mum', 'stand');
    st.hold('dad', 'e050_sponge'); st.pose('dad', 'give');
    await st.walk('dad', 1004, { speed: 150, follow: false, y: FLOOR - 6 });
    st.face('dad', 1); st.pose('dad', 'e050_wipe'); st.act('dad', 'wash');
    st.set('st-b-dad', false);
    await st.loop('wipe', () => st.wait(1000), { vol: 0.4 });
    st.set('st-clean'); st.set('st-shine'); st.sfx('sparkle', { vol: 0.6 });
    await st.wait(700);
    st.act('dad', null); st.hold('dad', null); st.pose('dad', 'stand'); st.face('dad', -1); st.mood('dad', 'joy');
  } },
  { key: ["don't have to do any chores", 'On Sundays'], icon: '☀️', label: 'no chores', async play(st) {
    await fade(st, async () => {
      st.set('st-shine', false); st.set('st-sat', false); st.set('st-sun');
      st.place('minh', 700, FLOOR, 1); st.place('lan', 830, FLOOR, -1); st.mood('dad', 'happy');
      st.show('dad', false); st.show('mum', false);
      await st.look(770, { instant: true });
    });
    st.sfx('birds', { vol: 0.5 });
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy'); st.sfx('cheer', { vol: 0.45 });
    st.pose('lan', 'cheer'); st.act('lan', 'jump'); st.mood('lan', 'joy');
    await st.wait(1800);
    st.act('minh', null); st.act('lan', null); st.pose('minh', 'stand'); st.pose('lan', 'stand');
  } },
  { key: ['play', 'read', 'visit Grandma'], icon: '⚽', label: 'play, read, visit', async play(st) {
    await fade(st, async () => {
      st.place('minh', 1660, FLOOR, 1); st.place('lan', 1812, FLOOR, -1);
      st.show('kitty', true); st.place('kitty', 1520, FLOOR, 1); st.dog('kitty', 'sit'); st.a('kitty').el.classList.add('e050-zz');
      st.pose('lan', 'read'); st.chest('lan', BOOK.replace('translate(0 -25)', 'translate(0 -8)'));
      await st.look(1720, { instant: true });
    });
    st.hold('minh', 'ball'); st.pose('minh', 'throw');
    await st.wait(300);
    st.hold('minh', null); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(BALL('#EF4444'), [1676, 166], [1690, 150], { size: 22, dur: 600 });
    st.act('lan', 'read'); st.sfx('page-turn', { vol: 0.5 });
    st.pose('minh', 'cheer'); st.mood('minh', 'joy');
    await st.wait(600);
    st.set('st-gma'); st.sfx('pop', { vol: 0.6 }); st.pose('minh', 'think'); st.mood('lan', 'joy');
    await st.wait(1500);
  } },
  { key: ['Kitty is lucky'], icon: '🐱', label: 'Kitty is lucky', async play(st) {
    st.set('st-gma', false); st.pose('minh', 'stand'); st.act('lan', null);
    st.look(1610);
    st.face('minh', -1); st.pose('minh', 'point'); st.act('minh', 'point'); st.talk('minh', true);
    st.fx('zzz', 1530, 250);
    await st.wait(700);
    st.set('st-lbl-lucky'); st.sfx('pop', { vol: 0.6 });
    await st.wait(1000);
    st.talk('minh', false); st.act('minh', null);
  } },
  { key: ["doesn't have to do anything"], icon: '😴', label: 'nothing to do', async play(st) {
    st.set('st-lbl-lucky', false);
    st.set('st-kchores'); st.talk('minh', true); st.pose('minh', 'open');
    st.sfx('pop', { vol: 0.6 });
    st.act('kitty', 'e050stretch'); st.fx('zzz', 1530, 250, { quiet: true });
    await st.wait(400);
    st.sfx('meow', { vol: 0.5 });
    await st.wait(700);
    st.talk('minh', false);
    st.mood('minh', 'joy'); st.act('minh', 'hop'); st.mood('lan', 'joy'); st.act('lan', 'hop'); st.pose('lan', 'clap'); st.sfx('giggle', { vol: 0.6 });
    await st.wait(1300);
    st.act('minh', null); st.act('lan', null);
  } },
];

export default {
  id: 'en050', worldW: 2000, floor: FLOOR, viewTop: 40, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: {
    e050_pour: { R: [70, 40], L: [10, 4] },
    e050_wipe: { R: [140, 170], L: [10, 4], head: -6 },
  },
  props: {
    e050_bag: `<g transform="translate(0 6)"><path d="M-6 -6 H6 L7 8 H-7Z" fill="#F59E0B" stroke="${L}" stroke-width="0.8"/><path d="M-3 0 h6" stroke="#fff" stroke-width="1.2"/></g>`,
    e050_sponge: `<g transform="translate(0 4)">${SPONGE}</g>`,
  },
  cast: [
    { id: 'lucky', kind: 'dog', x: 575, s: 0.8, face: -1 },
    { id: 'kitty', kind: 'cat', x: 1520, s: 0.85, face: 1 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 966, s: 0.95, face: -1 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 892, s: 0.95, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 700, face: 1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 812, s: 1.08, face: 1 },
  ],
  init(st) {
    st.look(830, { instant: true });
    st.dog('lucky', 'sit'); st.show('kitty', false);
  },
};
