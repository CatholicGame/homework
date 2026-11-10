/**
 * Bài 10 "My Favourite Food": phòng khách → bếp (bàn của Minh và Lan) → phòng ăn (bố mẹ, ông bà) → hiên → ngoài phố
 * (quán phở, Minh ăn với Tom) → góc sân của Lucky và Kitty. Món "like" thì ăn, tim bay; món "don't like" thì lắc đầu,
 * đẩy đi (bay ra quầy hoặc biến mất). Mỗi món hiện kèm nhãn chữ tiếng Anh (xanh = thích, đỏ có dấu ✗ = không thích).
 * Toạ độ cảnh: rộng 2520, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { L, sky, cloud, tree, bush, flowerAt, sun, grass, fence, room, doorway, windowBox, shelf, books, rug, label, steam, BOWL, KIT_CSS } from '../kit.js';

const FLOOR = 282;
const TOP = 232; // mặt bàn

// ── Món ăn (gốc = giữa đáy món, đặt lên mặt bàn) ───────────────────────────────
const plate = (rx = 19) => `<ellipse cx="0" cy="-2" rx="${rx}" ry="4.5" fill="#fff" stroke="${L}" stroke-width="0.9"/><ellipse cx="0" cy="-3" rx="${rx - 5}" ry="2.6" fill="#F1F5F9"/>`;
const PHO = `<g transform="translate(0 -11) scale(1.35)">${BOWL}</g>`;
const PHO_EMPTY = `<g transform="translate(0 -11) scale(1.35)"><path d="M-14 -4 H14 Q13 9 0 10 Q-13 9 -14 -4Z" fill="#fff" stroke="#3B82F6" stroke-width="1.4"/><ellipse cx="0" cy="-4" rx="13" ry="2.4" fill="#E0F2FE"/></g>`;
const RICE = `<path d="M-13 -12 H13 Q12 0 0 1 Q-12 0 -13 -12Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M-12 -7 H12" stroke="#3B82F6" stroke-width="1.6"/>
  <path d="M-12 -12 Q0 -27 12 -12Z" fill="#FFFFFF" stroke="${L}" stroke-width="0.9"/>${[[-6, -15], [-1, -19], [4, -16], [7, -13], [-3, -14], [1, -22]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.6" ry="0.9" fill="#E2E8F0"/>`).join('')}`;
const leg = (x, r) => `<g transform="translate(${x} -8) rotate(${r})"><ellipse cx="0" cy="0" rx="8" ry="6" fill="#D97706" stroke="${L}" stroke-width="0.9"/><path d="M6 -1 L13 -3" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round"/><circle cx="14" cy="-4" r="2" fill="#FFF7ED" stroke="${L}" stroke-width="0.6"/><circle cx="14" cy="-1.6" r="2" fill="#FFF7ED" stroke="${L}" stroke-width="0.6"/></g>`;
const CHICKEN = `${plate(20)}${leg(-7, -14)}${leg(4, -30)}<path d="M8 -6 q4 -6 9 -3" stroke="#22C55E" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
const fishShape = (c = '#94A3B8') => `<path d="M-14 0 Q-2 -10 12 0 Q-2 10 -14 0Z" fill="${c}" stroke="${L}" stroke-width="0.9"/><path d="M12 0 L20 -7 L20 7Z" fill="${c}" stroke="${L}" stroke-width="0.9"/>
  <circle cx="-8" cy="-1.6" r="1.6" fill="#1F2937"/><path d="M-2 -5 q3 5 0 10 M3 -5 q3 5 0 10" stroke="${L}" stroke-width="0.7" fill="none" opacity="0.6"/>`;
const FISH = `${plate(22)}<g transform="translate(-2 -9)">${fishShape('#FB923C')}</g>`;
const carrot = (x, r) => `<g transform="translate(${x} -7) rotate(${r})"><path d="M-12 -3 Q4 -5 12 0 Q4 5 -12 3Z" fill="#F97316" stroke="${L}" stroke-width="0.8"/><path d="M-12 -1 l-6 -5 M-12 0 l-7 0 M-12 1 l-6 5" stroke="#16A34A" stroke-width="2" stroke-linecap="round"/><path d="M-4 -2 v4 M3 -1.6 v3" stroke="#C2410C" stroke-width="0.8"/></g>`;
const CARROTS = `${plate(21)}${carrot(-2, -6)}${carrot(3, 8)}${carrot(0, -20)}`;
const roll = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-11" y="-3.6" width="22" height="7.2" rx="3.6" fill="#F59E0B" stroke="${L}" stroke-width="0.8"/><path d="M-5 -3 v6 M1 -3 v6 M6 -3 v6" stroke="#B45309" stroke-width="0.7"/></g>`;
const ROLLS = `${plate(22)}<path d="M-16 -5 q4 -8 10 -4 q4 -6 10 -1 q5 -5 10 2Z" fill="#4ADE80" stroke="${L}" stroke-width="0.7"/>${roll(-6, -7, -6)}${roll(6, -8, 8)}${roll(0, -13, -2)}`;
const scoop = (x, y, c, r = 6) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="${L}" stroke-width="0.8"/>`;
const ICE_CUP = `<path d="M-8 -12 H8 L5 0 H-5Z" fill="#60A5FA" stroke="${L}" stroke-width="0.8"/><path d="M-7 -8 H7" stroke="#fff" stroke-width="1.4"/>${scoop(0, -16, '#F9A8D4', 7)}<circle cx="2" cy="-23" r="2.4" fill="#EF4444"/>`;
const ICE_EMPTY = `<path d="M-8 -12 H8 L5 0 H-5Z" fill="#60A5FA" stroke="${L}" stroke-width="0.8"/><path d="M-7 -8 H7" stroke="#fff" stroke-width="1.4"/>`;
const NOODLES = `<g transform="translate(0 -11) scale(1.3)"><path d="M-14 -4 H14 Q13 9 0 10 Q-13 9 -14 -4Z" fill="#FDE68A" stroke="#D97706" stroke-width="1.4"/><path d="M-12 -4 Q0 -10 12 -4Z" fill="#FEF3C7" stroke="${L}" stroke-width="0.6"/>
  <path d="M-9 -6 q3 -3 6 0 q3 -3 6 0 q3 -3 6 0" stroke="#EAB308" stroke-width="1.2" fill="none"/><circle cx="6" cy="-7" r="2" fill="#16A34A"/></g>`;
const NOODLES_EMPTY = `<g transform="translate(0 -11) scale(1.3)"><path d="M-14 -4 H14 Q13 9 0 10 Q-13 9 -14 -4Z" fill="#FDE68A" stroke="#D97706" stroke-width="1.4"/><ellipse cx="0" cy="-4" rx="13" ry="2.4" fill="#FEF9C3"/></g>`;
const SWEETS = `<rect x="-13" y="-30" width="26" height="30" rx="6" fill="#E0F2FE" stroke="${L}" stroke-width="0.9" opacity="0.95"/><rect x="-10" y="-35" width="20" height="6" rx="2" fill="#F472B6" stroke="${L}" stroke-width="0.8"/>
  ${[[-6, -6, '#EF4444'], [1, -7, '#FACC15'], [7, -5, '#22C55E'], [-4, -13, '#A855F7'], [4, -14, '#F97316'], [-7, -20, '#3B82F6'], [2, -21, '#EC4899']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="${c}" stroke="${L}" stroke-width="0.5"/>`).join('')}
  <path d="M16 0 V-24" stroke="#fff" stroke-width="2" /><circle cx="16" cy="-29" r="7" fill="#F472B6" stroke="${L}" stroke-width="0.8"/><path d="M16 -29 m-4 0 a4 4 0 1 1 4 4" stroke="#fff" stroke-width="1.4" fill="none"/>`;
const FRUIT = `<path d="M-24 -14 H24 L18 0 H-18Z" fill="#B45309" stroke="${L}" stroke-width="0.9"/><path d="M-20 -8 H20 M-16 -3 H16" stroke="#92400E" stroke-width="1"/>
  <circle cx="-13" cy="-19" r="7" fill="#EF4444" stroke="${L}" stroke-width="0.8"/><circle cx="1" cy="-21" r="7.4" fill="#FB923C" stroke="${L}" stroke-width="0.8"/>
  ${[[11, -18], [15, -22], [19, -18], [13, -26], [17, -14]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="#A855F7" stroke="${L}" stroke-width="0.6"/>`).join('')}
  <path d="M-20 -24 Q-6 -10 10 -30 Q-4 -18 -18 -28Z" fill="#FDE047" stroke="${L}" stroke-width="0.8"/>`;
const ICE_TUB = `<path d="M-13 -16 H13 L9 0 H-9Z" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/><path d="M-12 -11 H12" stroke="#F472B6" stroke-width="2"/>${scoop(-7, -20, '#F9A8D4')}${scoop(7, -20, '#FEF3C7')}${scoop(0, -28, '#A16207')}<circle cx="2" cy="-35" r="2.6" fill="#EF4444"/>`;
const onion = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -10 Q9 -4 7 2 Q4 7 0 7 Q-4 7 -7 2 Q-9 -4 0 -10Z" fill="#C084FC" stroke="${L}" stroke-width="0.8"/><path d="M0 -10 v-5" stroke="#16A34A" stroke-width="1.8" stroke-linecap="round"/><path d="M-3 -5 Q-4 1 -2 6 M3 -5 Q4 1 2 6" stroke="#7E22CE" stroke-width="0.7" fill="none"/></g>`;
const ONIONS = `${plate(20)}${onion(-7, -9)}${onion(7, -9)}${onion(0, -15, 0.9)}`;
const PET_BOWL = (inner = '') => `<path d="M-20 -12 H20 L16 0 H-16Z" fill="#EF4444" stroke="${L}" stroke-width="0.9"/><path d="M-18 -7 H18" stroke="#FCA5A5" stroke-width="1.6"/>${inner}`;
const banana = (x, r) => `<g transform="translate(${x} -16) rotate(${r})"><path d="M-14 -2 Q0 14 16 -4 Q2 6 -12 -6Z" fill="#FDE047" stroke="${L}" stroke-width="0.8"/><path d="M-13 -4 l-3 -2" stroke="#78350F" stroke-width="2" stroke-linecap="round"/></g>`;
const BANANAS = `${banana(-4, -10)}${banana(2, 4)}${banana(0, 20)}`;

/** Món ăn đặt lên bàn: nhóm ngoài giữ vị trí, nhóm trong (class) hiện / ẩn bằng CSS. */
const item = (x, y, cls, svg) => `<g transform="translate(${x} ${y})"><g class="e010-it ${cls}">${svg}</g></g>`;
/** Nhãn chữ: thích = xanh lá; không thích = đỏ, có vòng ✗ bên trái. */
const lb = (name, x, y, text, no = false, plain = false) => {
  const w = text.length * 18 * 0.64 + 16;
  const cross = plain ? '' : no ? `<g transform="translate(${x - w / 2 - 14} ${y - 6})"><circle r="11" fill="#FEE2E2" stroke="#DC2626" stroke-width="2"/><path d="M-5 -5 L5 5 M5 -5 L-5 5" stroke="#DC2626" stroke-width="3" stroke-linecap="round"/></g>`
    : `<g transform="translate(${x - w / 2 - 14} ${y - 6})"><circle r="11" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/><path d="M0 5 C-10 -2 -6 -9 0 -4 C6 -9 10 -2 0 5Z" fill="#EF4444"/></g>`;
  return `<g class="e010-lb e010-lb-${name}">${label(x, y, text, plain ? '#C2410C' : no ? '#DC2626' : '#15803D', 18)}${cross}</g>`;
};
const LBS = ['hungry', 'pho', 'rice', 'chicken', 'fish', 'carrots', 'rolls', 'ice', 'noodles', 'sweets', 'fruit', 'ice2', 'friend', 'pho2', 'onions', 'fish2', 'bananas', 'you', 'pho3'];
/** Chỉ hiện các nhãn của câu đang diễn (tắt nhãn câu trước). */
const lbl = (st, ...names) => LBS.forEach((n) => st.set(`st-lb-${n}`, names.includes(n)));

const chair = (x, c = '#F59E0B') => `<path d="M${x - 20} 236 V160 Q${x - 20} 150 ${x - 10} 150 H${x + 10} Q${x + 20} 150 ${x + 20} 160 V236" fill="${c}" stroke="${L}" stroke-width="1.2"/><path d="M${x - 12} 166 H${x + 12}" stroke="${L}" stroke-width="0.8" opacity="0.5"/>`;
const frame = (x, y, inner) => `<rect x="${x - 26}" y="${y - 20}" width="52" height="40" rx="3" fill="#fff" stroke="#A16207" stroke-width="3"/><g transform="translate(${x} ${y})">${inner}</g>`;
const lamp = (x) => `<path d="M${x} 12 V52" stroke="${L}" stroke-width="1.4"/><path d="M${x - 22} 72 Q${x} 44 ${x + 22} 72Z" fill="#FDE047" stroke="${L}"/><ellipse cx="${x}" cy="74" rx="8" ry="3" fill="#FEF9C3"/>`;

function bg() {
  return `
  <!-- Ngoài trời (vẽ trước, nhà đè lên) -->
  ${sky(1740, 780, 315, 'e010sky')}
  <g transform="translate(2300 70)">${sun(24)}</g>
  ${cloud(1860, 56, 1, 0)}${cloud(2140, 40, 0.8, 3)}${cloud(2440, 80, 0.7, 5)}
  ${grass(1740, 780, FLOOR)}
  ${tree(1790, FLOOR - 4, 1)}${tree(2250, FLOOR - 6, 0.9, '#F59E0B')}
  ${fence(2160, 360, FLOOR)}
  ${bush(1880, FLOOR - 2, 0.8)}${flowerAt(1850, FLOOR - 4)}${flowerAt(2140, FLOOR - 4, '#FACC15')}${flowerAt(2500, FLOOR - 4, '#A855F7')}
  <!-- Quán phở bên đường -->
  <g>
    <path d="M1968 132 V${FLOOR}" stroke="#A16207" stroke-width="5"/><path d="M2132 132 V${FLOOR}" stroke="#A16207" stroke-width="5"/>
    <path d="M1956 132 H2144 L2134 108 H1966Z" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    ${Array.from({ length: 6 }, (_, i) => `<path d="M${1972 + i * 30} 108 h15 l-2 24 h-15Z" fill="#fff" opacity="0.9"/>`).join('')}
    ${Array.from({ length: 7 }, (_, i) => `<path d="M${1956 + i * 31.3} 132 q15.6 14 31.3 0" fill="#EF4444" stroke="${L}" stroke-width="0.9"/>`).join('')}
    <rect x="2010" y="82" width="80" height="26" rx="5" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/>
    <text x="2050" y="101" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="17" fill="#B91C1C">PHO</text>
    <rect x="2140" y="196" width="66" height="86" rx="4" fill="#38BDF8" stroke="${L}" stroke-width="1.2"/><rect x="2146" y="214" width="54" height="40" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>
    <circle cx="2154" cy="${FLOOR - 2}" r="6" fill="#334155"/><circle cx="2192" cy="${FLOOR - 2}" r="6" fill="#334155"/>
    <path d="M2152 196 V170 Q2152 162 2162 162 H2186 Q2194 162 2194 170 V196Z" fill="#94A3B8" stroke="${L}"/><ellipse cx="2173" cy="164" rx="20" ry="4" fill="#CBD5E1" stroke="${L}" stroke-width="0.8"/>
    ${steam(2173, 158)}
    ${[2010, 2095].map((x) => `<rect x="${x - 12}" y="244" width="24" height="6" rx="2" fill="#2563EB" stroke="${L}"/><path d="M${x - 9} 250 V${FLOOR} M${x + 9} 250 V${FLOOR}" stroke="#1D4ED8" stroke-width="3"/>`).join('')}
  </g>
  <!-- Nhà chó -->
  <g transform="translate(2470 ${FLOOR})"><path d="M-36 0 V-52 H36 V0Z" fill="#FDBA74" stroke="${L}" stroke-width="1.2"/><path d="M-44 -50 L0 -84 L44 -50Z" fill="#DC2626" stroke="${L}" stroke-width="1.2"/>
    <path d="M-16 0 V-26 Q0 -42 16 -26 V0Z" fill="#7C2D12" stroke="${L}"/><rect x="-20" y="-64" width="40" height="12" rx="3" fill="#fff" stroke="${L}" stroke-width="0.8"/>
    <text x="0" y="-54.5" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="9" fill="#B45309">LUCKY</text></g>

  <!-- Phòng khách (0–420) -->
  ${room(0, 420, FLOOR, '#FEF3C7')}
  ${windowBox(40, 60, 110, 96)}
  <path d="M30 54 Q60 120 34 170 M160 54 Q130 120 156 170" stroke="#F472B6" stroke-width="8" fill="none" stroke-linecap="round"/>
  ${frame(270, 90, `<path d="M-20 14 L-6 -4 L4 8 L10 0 L20 14Z" fill="#22C55E"/><circle cx="12" cy="-8" r="5" fill="#FACC15"/>`)}
  ${shelf(220, 150, 100, books(230, 150, 6))}
  <path d="M40 230 Q40 196 70 196 H220 Q250 196 250 230 V262 H40Z" fill="#7C3AED" stroke="${L}" stroke-width="1.2"/>
  <rect x="30" y="226" width="230" height="38" rx="12" fill="#8B5CF6" stroke="${L}" stroke-width="1.2"/>
  <rect x="64" y="208" width="34" height="26" rx="8" fill="#FDE68A" stroke="${L}"/><rect x="190" y="208" width="34" height="26" rx="8" fill="#F9A8D4" stroke="${L}"/>
  <path d="M44 264 V${FLOOR} M246 264 V${FLOOR}" stroke="${L}" stroke-width="4"/>
  ${rug(330, FLOOR, 150, '#FDA4AF')}
  <g transform="translate(372 ${FLOOR})"><path d="M0 0 V-120" stroke="${L}" stroke-width="3"/><path d="M-18 -120 L-12 -150 H12 L18 -120Z" fill="#FDE68A" stroke="${L}"/><ellipse cx="0" cy="0" rx="14" ry="3" fill="${L}"/></g>
  <!-- Bếp (420–1000) -->
  ${room(420, 580, FLOOR, '#DCFCE7')}
  <rect x="430" y="140" width="160" height="80" fill="#fff" stroke="#BBF7D0"/>${Array.from({ length: 5 }, (_, i) => `<path d="M${430 + i * 32} 140 V220" stroke="#BBF7D0"/>`).join('')}<path d="M430 180 H590" stroke="#BBF7D0"/>
  <rect x="440" y="46" width="140" height="50" rx="4" fill="#FDE68A" stroke="${L}"/><path d="M510 46 V96" stroke="${L}" stroke-width="0.8"/><circle cx="500" cy="72" r="2.4" fill="${L}"/><circle cx="520" cy="72" r="2.4" fill="${L}"/>
  <rect x="436" y="226" width="160" height="56" fill="#16A34A" stroke="${L}" stroke-width="1.2"/>
  ${[476, 556].map((x) => `<rect x="${x - 30}" y="236" width="60" height="38" rx="3" fill="#15803D" stroke="${L}" stroke-width="0.8"/><circle cx="${x + 20}" cy="255" r="2.4" fill="#FDE68A"/>`).join('')}
  <rect x="430" y="220" width="172" height="10" rx="3" fill="#F5F5F4" stroke="${L}"/>
  <g transform="translate(570 206)"><path d="M-14 -6 H14 V10 Q14 14 10 14 H-10 Q-14 14 -14 10Z" fill="#94A3B8" stroke="${L}"/><ellipse cx="0" cy="-6" rx="14" ry="3" fill="#CBD5E1" stroke="${L}" stroke-width="0.8"/></g>
  ${windowBox(700, 52, 120, 84)}
  ${lamp(760)}
  ${chair(690)}${chair(830, '#F472B6')}
  <rect x="902" y="80" width="80" height="202" rx="8" fill="#E2E8F0" stroke="${L}" stroke-width="1.2"/><path d="M902 150 H982" stroke="${L}"/><path d="M970 100 V130 M970 166 V200" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>
  <rect x="916" y="90" width="18" height="18" rx="3" fill="#FDE047" stroke="${L}" stroke-width="0.6" transform="rotate(-8 925 99)"/>
  <!-- Phòng ăn (1000–1660) -->
  ${room(1000, 660, FLOOR, '#FCE7F3')}
  ${Array.from({ length: 22 }, (_, i) => `<circle cx="${1020 + (i * 89) % 620}" cy="${30 + (i * 47) % 100}" r="3" fill="#F9A8D4"/>`).join('')}
  ${frame(1190, 92, `<circle cx="-6" cy="-2" r="7" fill="#FDE68A"/><circle cx="8" cy="0" r="6" fill="#93C5FD"/><path d="M-20 16 Q0 4 20 16Z" fill="#86EFAC"/>`)}
  ${frame(1480, 92, `<path d="M-18 14 L-4 -10 L10 14Z" fill="#60A5FA"/><path d="M0 14 L10 -2 L20 14Z" fill="#3B82F6"/>`)}
  ${lamp(1335)}
  <g transform="translate(1620 ${FLOOR})"><path d="M-14 0 L-10 -30 H10 L14 0Z" fill="#F97316" stroke="${L}"/><path d="M0 -30 Q-20 -60 -6 -84 M0 -30 Q4 -70 20 -80 M0 -30 Q-2 -60 6 -96" stroke="#16A34A" stroke-width="3" fill="none"/>
    <ellipse cx="-8" cy="-80" rx="8" ry="4" fill="#22C55E" transform="rotate(-40 -8 -80)"/><ellipse cx="20" cy="-78" rx="8" ry="4" fill="#22C55E" transform="rotate(30 20 -78)"/><ellipse cx="6" cy="-96" rx="7" ry="4" fill="#4ADE80"/></g>
  ${[1140, 1240, 1430, 1530].map((x, i) => chair(x, ['#F59E0B', '#60A5FA', '#A78BFA', '#34D399'][i])).join('')}
  <!-- Hiên + cửa chính (1660–1740) -->
  <rect x="1660" y="0" width="80" height="${FLOOR}" fill="#FFEDD5"/><rect x="1660" y="0" width="80" height="12" fill="#E9D5B5" stroke="${L}"/>
  <rect x="1660" y="${FLOOR}" width="80" height="${315 - FLOOR}" fill="#D9A066" stroke="${L}"/>
  <rect x="1674" y="120" width="56" height="162" rx="4" fill="#FEF9C3" stroke="${L}" stroke-width="1.2"/>
  <rect x="1678" y="124" width="48" height="158" fill="#BAE6FD"/><path d="M1678 250 Q1700 240 1726 248 V282 H1678Z" fill="#86EFAC"/>
  <g class="e010-door"><rect x="1678" y="124" width="48" height="158" fill="#B45309" stroke="${L}"/><rect x="1685" y="134" width="34" height="50" rx="4" fill="#92400E"/><rect x="1685" y="194" width="34" height="76" rx="4" fill="#92400E"/><circle cx="1718" cy="200" r="3.2" fill="#FDE68A" stroke="${L}"/></g>
  <rect x="1736" y="0" width="12" height="${FLOOR}" fill="#C08B5C" stroke="${L}" stroke-width="0.8"/>
  ${doorway(420, FLOOR)}${doorway(1000, FLOOR)}${doorway(1660, FLOOR)}
  <!-- Nhãn "hungry" + tiếng bụng sôi -->
  <g class="e010-growl">${[0, 1, 2].map((i) => `<path d="M${352 + i * 8} ${222 - i * 10} q5 -4 10 0 q5 4 10 0" stroke="#F97316" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join('')}</g>
  ${lb('hungry', 330, 122, 'hungry', false, true)}`;
}

/** Lớp trước nhân vật: các bàn (che chân người ngồi), món ăn, nhãn chữ. */
function fg() {
  const tbl = (x1, x2, cloth) => `<rect x="${x1 + 14}" y="${TOP + 6}" width="10" height="${FLOOR - TOP - 6}" fill="#92400E" stroke="${L}"/><rect x="${x2 - 24}" y="${TOP + 6}" width="10" height="${FLOOR - TOP - 6}" fill="#92400E" stroke="${L}"/>
    ${cloth ? `<path d="M${x1 + 6} ${TOP + 4} H${x2 - 6} V${TOP + 30} H${x1 + 6}Z" fill="${cloth}" stroke="${L}" stroke-width="1"/>${Array.from({ length: Math.floor((x2 - x1 - 12) / 20) }, (_, i) => `<path d="M${x1 + 16 + i * 20} ${TOP + 6} V${TOP + 30}" stroke="#fff" stroke-width="3" opacity="0.55"/>`).join('')}` : ''}
    <rect x="${x1}" y="${TOP}" width="${x2 - x1}" height="9" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>`;
  return `
  ${tbl(610, 900, '#FBCFE8')}
  ${tbl(1080, 1590, '#BFDBFE')}
  ${tbl(1970, 2130, '#FDE68A')}
  <!-- Bàn của Minh và Lan -->
  ${item(690, TOP, 'e010-pho', PHO)}${item(690, TOP, 'e010-phoE', PHO_EMPTY)}
  <g class="e010-phosteam">${steam(690, 212)}</g>
  ${item(645, TOP, 'e010-rice', RICE)}${item(738, TOP, 'e010-chicken', CHICKEN)}
  ${item(790, TOP, 'e010-fish', FISH)}${item(790, TOP, 'e010-carrots', CARROTS)}
  ${item(500, 220, 'e010-cfish', FISH)}${item(550, 220, 'e010-ccarrots', CARROTS)}
  ${item(782, TOP, 'e010-rolls', ROLLS)}
  ${item(668, TOP, 'e010-ice', ICE_CUP)}${item(860, TOP, 'e010-ice', ICE_CUP)}
  ${item(668, TOP, 'e010-iceE', ICE_EMPTY)}${item(860, TOP, 'e010-iceE', ICE_EMPTY)}
  <!-- Bàn phòng ăn -->
  ${item(1150, TOP, 'e010-noodles', NOODLES)}${item(1250, TOP, 'e010-noodles', NOODLES)}
  ${item(1150, TOP, 'e010-noodlesE', NOODLES_EMPTY)}${item(1250, TOP, 'e010-noodlesE', NOODLES_EMPTY)}
  ${item(1195, TOP, 'e010-sweets', SWEETS)}
  ${item(1470, TOP, 'e010-fruit', FRUIT)}${item(1395, TOP, 'e010-tub', ICE_TUB)}
  <!-- Quán phở -->
  ${item(2018, TOP, 'e010-pho2', PHO)}${item(2087, TOP, 'e010-pho2', PHO)}
  ${item(2018, TOP, 'e010-pho2E', PHO_EMPTY)}${item(2087, TOP, 'e010-pho2E', PHO_EMPTY)}
  <g class="e010-pho2steam">${steam(2018, 212)}${steam(2087, 212)}</g>
  ${item(2052, TOP, 'e010-onions', ONIONS)}
  <!-- Bát của Lucky và Kitty -->
  ${item(2380, FLOOR + 2, 'e010-petbowl', PET_BOWL())}
  ${item(2380, FLOOR + 2, 'e010-petfish', `<g transform="translate(0 -14)">${fishShape('#94A3B8')}</g>`)}
  ${item(2380, FLOOR - 6, 'e010-bananas', BANANAS)}
  <!-- Nhãn chữ -->
  ${lb('pho', 690, 132, 'pho')}${lb('pho3', 2200, 104, 'pho?')}
  ${lb('rice', 615, 132, 'rice')}${lb('chicken', 760, 132, 'chicken')}
  ${lb('fish', 790, 132, 'fish', true)}${lb('carrots', 790, 132, 'carrots', true)}
  ${lb('rolls', 760, 128, 'spring rolls')}${lb('ice', 760, 128, 'ice cream')}
  ${lb('noodles', 1200, 122, 'noodles')}${lb('sweets', 1200, 122, 'sweets', true)}
  ${lb('fruit', 1485, 122, 'fruit')}${lb('ice2', 1485, 122, 'ice cream', true)}
  ${lb('friend', 1872, 104, 'friend')}${lb('pho2', 2058, 158, 'pho')}${lb('onions', 2058, 158, 'onions', true)}
  ${lb('fish2', 2385, 150, 'fish')}${lb('bananas', 2385, 150, 'bananas', true)}
  ${lb('you', 2200, 104, 'you?')}`;
}

const CSS = `
.e010-it { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: 50% 100%; transition: opacity .3s, transform .45s cubic-bezier(.3,1.6,.6,1); }
.st-pho .e010-pho, .st-phoE .e010-phoE, .st-rice .e010-rice, .st-chicken .e010-chicken, .st-fish .e010-fish, .st-carrots .e010-carrots,
.st-fishCounter .e010-cfish, .st-carrotsCounter .e010-ccarrots, .st-rolls .e010-rolls, .st-ice .e010-ice, .st-iceE .e010-iceE,
.st-noodles .e010-noodles, .st-noodlesE .e010-noodlesE, .st-sweets .e010-sweets, .st-fruit .e010-fruit, .st-tub .e010-tub,
.st-pho2 .e010-pho2, .st-pho2E .e010-pho2E, .st-onions .e010-onions, .st-petbowl .e010-petbowl, .st-petfish .e010-petfish, .st-bananas .e010-bananas { opacity: 1; transform: none; }
.st-phoE .e010-pho, .st-fishGone .e010-fish, .st-carrotsGone .e010-carrots, .st-iceE .e010-ice, .st-noodlesE .e010-noodles,
.st-sweetsGone .e010-sweets, .st-tubGone .e010-tub, .st-pho2E .e010-pho2, .st-onionsGone .e010-onions, .st-petfishGone .e010-petfish { opacity: 0; transform: scale(.3); }
.e010-phosteam, .e010-pho2steam { opacity: 0; transition: opacity .4s; }
.st-pho .e010-phosteam, .st-pho2 .e010-pho2steam { opacity: 1; }
.st-phoE .e010-phosteam, .st-pho2E .e010-pho2steam { opacity: 0; }
.e010-lb { opacity: 0; transform: translateY(8px); transition: opacity .3s, transform .35s cubic-bezier(.3,1.6,.6,1); }
${LBS.map((n) => `.st-lb-${n} .e010-lb-${n}`).join(', ')} { opacity: 1; transform: none; }
.e010-growl { opacity: 0; transition: opacity .3s; }
.st-lb-hungry .e010-growl { opacity: 1; animation: e010Growl .25s ease-in-out infinite alternate; }
@keyframes e010Growl { from { transform: translateX(-2px); } to { transform: translateX(2px); } }
.e010-door { transform-origin: 1678px 200px; transition: transform .6s cubic-bezier(.4,0,.2,1); }
.st-door .e010-door { transform: scaleX(.12); }
/* Xoa bụng (tư thế e010_tummy) */
.act-e010rub .pp-fowR { animation: e010Rub .25s ease-in-out infinite alternate; }
.act-e010rub .pp-fowL { animation: e010Rub .25s ease-in-out infinite alternate-reverse; }
@keyframes e010Rub { from { transform: rotate(-12deg); } to { transform: rotate(12deg); } }
/* Chó mèo cúi ăn / lắc đầu */
.es-dog.act-e010eat .dg-head { animation: e010Peck .32s ease-in-out infinite alternate; }
@keyframes e010Peck { from { transform: translate(0, 0); } to { transform: translate(4px, 15px) rotate(16deg); } }
.es-dog.act-e010no .dg-head { animation: e010No .2s ease-in-out infinite alternate; }
@keyframes e010No { from { transform: rotate(-14deg); } to { transform: rotate(14deg); } }
@media (prefers-reduced-motion: reduce) { .st-lb-hungry .e010-growl { animation-duration: .8s; } .es-dog.act-e010eat .dg-head { animation-duration: .7s; } }
`;

// Đồ cầm tay riêng của truyện: kem ốc quế (gốc = bàn tay, cánh tay hướng +y).
const PROPS = {
  e010_ice: `<g transform="translate(0 -2)"><path d="M-4.6 2 L4.6 2 L0 -12Z" fill="#F59E0B" stroke="${L}" stroke-width="0.7"/><path d="M-2.6 -2 L2.6 -6 M-3.4 0 L3 -4" stroke="#B45309" stroke-width="0.6"/>
    <circle cx="0" cy="5" r="5.6" fill="#F9A8D4" stroke="${L}" stroke-width="0.7"/></g>`,
};
const POSES = {
  e010_tummy: { R: [14, -66], L: [14, -66], head: 6 },
  e010_you: { R: [50, 130], L: [50, 130], head: -6 },
  e010_push: { R: [60, 84], L: [60, 84], dy: 20, head: -8 },
  e010_pushStand: { R: [64, 86], L: [10, 4], head: -8 },
};

// Ở chế độ nhảy câu (instant), các lệnh của sân khấu làm xong ngay, nên mỗi nhịp vừa là phim vừa là "trạng thái cuối".
const BEATS = [
  { key: ['I am hungry'], icon: '😋', label: 'hungry', async play(st) {
    st.look(300);
    st.pose('minh', 'e010_tummy'); st.act('minh', 'e010rub'); st.mood('minh', 'wow');
    lbl(st, 'hungry');
    await st.wait(1900);
    st.act('minh', null); st.mood('minh', 'happy');
  } },
  { key: ['favourite food is pho'], icon: '🍜', label: 'pho', async play(st) {
    lbl(st);
    st.pose('minh', 'stand');
    await st.walk('minh', 690, { speed: 155 });
    st.pose('minh', 'sit');
    await st.wait(300);
    st.set('st-pho'); st.sfx('bowl-down'); lbl(st, 'pho');
    st.mood('minh', 'joy');
    st.fx('hearts', 690, 170);
    await st.wait(900);
    st.mood('minh', 'happy');
  } },
  { key: ['like pho very much'], icon: '😍', label: 'like pho', async play(st) {
    st.hold('minh', 'chopsticks'); st.pose('minh', 'eat');
    await st.wait(300);
    st.act('minh', 'eat'); st.sfx('slurp');
    st.fx('hearts', 690, 160);
    await st.wait(1800);
    st.act('minh', null); st.hold('minh', null); st.pose('minh', 'sit');
    st.set('st-phoE'); st.mood('minh', 'joy');
    await st.wait(300);
    st.mood('minh', 'happy');
  } },
  { key: ['rice and chicken'], icon: '🍗', label: 'rice and chicken', async play(st) {
    st.set('st-rice'); st.sfx('bowl-down'); lbl(st, 'rice');
    await st.wait(600);
    st.set('st-chicken'); st.sfx('bowl-down'); lbl(st, 'rice', 'chicken');
    st.act('minh', 'nod'); st.mood('minh', 'joy');
    await st.wait(1500);
    st.act('minh', null); st.mood('minh', 'happy');
  } },
  { key: ["don't like fish"], icon: '🐟', label: 'no fish', async play(st) {
    st.set('st-fish'); st.sfx('bowl-down'); lbl(st, 'fish');
    await st.wait(500);
    st.act('minh', 'no'); st.mood('minh', 'shut');
    await st.wait(700);
    st.act('minh', null); st.pose('minh', 'e010_push');
    st.set('st-fishGone');
    await st.fly(FISH, [790, 222], [500, 212], { size: 46, dur: 700 });
    st.set('st-fishCounter');
    st.pose('minh', 'sit'); st.mood('minh', 'happy');
  } },
  { key: ["don't like carrots"], icon: '🥕', label: 'no carrots', async play(st) {
    st.set('st-carrots'); st.sfx('bowl-down'); lbl(st, 'carrots');
    await st.wait(500);
    st.act('minh', 'no'); st.mood('minh', 'shut');
    await st.wait(700);
    st.act('minh', null); st.pose('minh', 'e010_push');
    st.set('st-carrotsGone');
    await st.fly(CARROTS, [790, 222], [550, 212], { size: 46, dur: 700 });
    st.set('st-carrotsCounter');
    st.pose('minh', 'sit'); st.mood('minh', 'happy');
  } },
  { key: ['Lan and I like spring rolls'], icon: '🥢', label: 'spring rolls', async play(st) {
    lbl(st);
    await st.look(770, { dur: 500 });
    await st.walk('lan', 830, { speed: 130, follow: false });
    st.pose('lan', 'sit');
    st.set('st-rolls'); st.sfx('bowl-down'); lbl(st, 'rolls');
    await st.wait(350);
    st.hold('minh', 'chopsticks'); st.pose('minh', 'eat'); st.act('minh', 'eat');
    st.hold('lan', 'chopsticks'); st.pose('lan', 'eat'); st.act('lan', 'eat');
    st.fx('hearts', 760, 160);
    await st.wait(1500);
    st.act('minh', null); st.act('lan', null); st.hold('minh', null); st.hold('lan', null);
    st.pose('minh', 'sit'); st.pose('lan', 'sit');
  } },
  { key: ['like ice cream'], icon: '🍦', label: 'ice cream', async play(st) {
    st.set('st-ice'); st.sfx('bowl-down'); lbl(st, 'ice');
    await st.wait(500);
    st.set('st-iceE');
    st.hold('minh', 'e010_ice'); st.hold('lan', 'e010_ice');
    st.pose('minh', 'eat'); st.pose('lan', 'eat');
    st.mood('minh', 'joy'); st.mood('lan', 'joy');
    await st.wait(300);
    st.act('minh', 'eat'); st.act('lan', 'eat');
    st.fx('hearts', 760, 160);
    await st.wait(1700);
    st.act('minh', null); st.act('lan', null); st.hold('minh', null); st.hold('lan', null);
    st.pose('minh', 'sit'); st.pose('lan', 'sit'); st.mood('minh', 'happy'); st.mood('lan', 'happy');
  } },
  { key: ['Mum and Dad like noodles'], icon: '🍝', label: 'noodles', async play(st) {
    lbl(st);
    await st.look(1195);
    st.set('st-noodles'); st.sfx('bowl-down'); lbl(st, 'noodles');
    await st.wait(300);
    st.hold('mum', 'chopsticks'); st.hold('dad', 'chopsticks');
    st.pose('mum', 'eat'); st.pose('dad', 'eat');
    await st.wait(300);
    st.act('mum', 'eat'); st.act('dad', 'eat'); st.sfx('slurp');
    st.fx('hearts', 1195, 120);
    await st.wait(1500);
    st.act('mum', null); st.act('dad', null); st.hold('mum', null); st.hold('dad', null);
    st.pose('mum', 'sit'); st.pose('dad', 'sit'); st.set('st-noodlesE');
  } },
  { key: ["don't like sweets"], icon: '🍬', label: 'no sweets', async play(st) {
    st.set('st-sweets'); st.sfx('bowl-down'); lbl(st, 'sweets');
    await st.wait(500);
    st.act('mum', 'no'); st.act('dad', 'no');
    st.pose('mum', 'e010_push'); st.pose('dad', 'e010_push');
    await st.wait(1200);
    st.set('st-sweetsGone'); st.fx('poof', 1195, 214);
    st.act('mum', null); st.act('dad', null); st.pose('mum', 'sit'); st.pose('dad', 'sit');
    await st.wait(400);
  } },
  { key: ['Grandma and Grandpa like fruit'], icon: '🍎', label: 'fruit', async play(st) {
    lbl(st);
    await st.look(1470);
    st.set('st-fruit'); st.sfx('bowl-down'); lbl(st, 'fruit');
    await st.wait(400);
    st.hold('grandma', 'apple'); st.hold('grandpa', 'apple');
    st.pose('grandma', 'eat'); st.pose('grandpa', 'eat');
    st.mood('grandma', 'joy'); st.mood('grandpa', 'joy');
    await st.wait(300);
    st.act('grandma', 'eat'); st.act('grandpa', 'eat');
    st.fx('hearts', 1480, 120);
    await st.wait(1500);
    st.act('grandma', null); st.act('grandpa', null); st.hold('grandma', null); st.hold('grandpa', null);
    st.pose('grandma', 'sit'); st.pose('grandpa', 'sit'); st.mood('grandma', 'happy'); st.mood('grandpa', 'happy');
  } },
  { key: ["don't like ice cream"], icon: '🙅', label: 'no ice cream', async play(st) {
    st.set('st-tub'); st.sfx('bowl-down'); lbl(st, 'ice2');
    await st.wait(500);
    st.act('grandma', 'no'); st.act('grandpa', 'no');
    st.pose('grandma', 'e010_push'); st.pose('grandpa', 'e010_push');
    await st.wait(1200);
    st.set('st-tubGone'); st.fx('poof', 1395, 210);
    st.act('grandma', null); st.act('grandpa', null); st.pose('grandma', 'sit'); st.pose('grandpa', 'sit');
    await st.wait(400);
  } },
  { key: ['Tom is my friend'], icon: '🤝', label: 'my friend', async play(st) {
    lbl(st);
    // Minh rời bàn bếp (ngoài khung hình), ra tới cửa chính
    st.show('minh', false);
    await st.look(1830);
    await st.walk('minh', 1702, { speed: 4000, follow: false });
    st.set('st-door'); st.sfx('door-open');
    st.show('minh', true);
    st.pose('tom', 'wave'); st.act('tom', 'wave');
    await st.walk('minh', 1835, { speed: 140, follow: false });
    st.act('tom', null);
    st.pose('minh', 'cheer'); st.pose('tom', 'cheer'); st.act('minh', 'hop'); st.act('tom', 'hop');
    st.mood('minh', 'joy'); st.mood('tom', 'joy'); lbl(st, 'friend');
    st.fx('hearts', 1872, 140);
    await st.wait(1200);
    st.act('minh', null); st.act('tom', null);
    st.pose('minh', 'stand'); st.pose('tom', 'stand'); st.mood('minh', 'happy'); st.mood('tom', 'happy');
  } },
  { key: ['Tom and I like pho'], icon: '🍜', label: 'Tom and I', async play(st) {
    lbl(st);
    await Promise.all([
      st.walk('minh', 2010, { speed: 140, lead: 40 }),
      st.walk('tom', 2095, { speed: 135, follow: false }),
    ]);
    st.pose('minh', 'sit'); st.pose('tom', 'sit');
    st.set('st-pho2'); st.sfx('bowl-down'); lbl(st, 'pho2');
    await st.wait(300);
    st.hold('minh', 'chopsticks'); st.hold('tom', 'chopsticks'); st.pose('minh', 'eat'); st.pose('tom', 'eat');
    st.act('minh', 'eat'); st.act('tom', 'eat'); st.sfx('slurp');
    st.fx('hearts', 2052, 150);
    await st.wait(1500);
    st.act('minh', null); st.act('tom', null); st.hold('minh', null); st.hold('tom', null);
    st.pose('minh', 'sit'); st.pose('tom', 'sit'); st.set('st-pho2E');
  } },
  { key: ["don't like onions"], icon: '🧅', label: 'no onions', async play(st) {
    st.set('st-onions'); st.sfx('bowl-down'); lbl(st, 'onions');
    await st.wait(500);
    st.act('minh', 'no'); st.act('tom', 'no'); st.mood('minh', 'shut'); st.mood('tom', 'shut');
    st.pose('minh', 'e010_push'); st.pose('tom', 'e010_push');
    await st.wait(1200);
    st.set('st-onionsGone'); st.fx('poof', 2052, 214);
    st.act('minh', null); st.act('tom', null); st.pose('minh', 'sit'); st.pose('tom', 'sit');
    st.mood('minh', 'happy'); st.mood('tom', 'happy');
    await st.wait(400);
  } },
  { key: ['Lucky and Kitty like fish'], icon: '🐾', label: 'pets like fish', async play(st) {
    lbl(st);
    await st.look(2360);
    st.set('st-petbowl'); st.set('st-petfish'); st.sfx('bowl-down'); lbl(st, 'fish2');
    st.dog('lucky', 'stand'); st.dog('kitty', 'stand');
    st.mood('lucky', 'joy'); st.mood('kitty', 'joy');
    st.sfx('dog-bark', { vol: 0.6 });
    await st.wait(400);
    st.act('lucky', 'e010eat'); st.act('kitty', 'e010eat');
    await st.wait(1500);
    st.act('lucky', 'wag'); st.act('kitty', 'wag');
    st.set('st-petfishGone'); st.fx('hearts', 2380, 210);
    await st.wait(400);
    st.act('lucky', null); st.act('kitty', null);
  } },
  { key: ["don't like bananas"], icon: '🍌', label: 'no bananas', async play(st) {
    st.set('st-bananas'); st.sfx('bowl-down'); lbl(st, 'bananas');
    st.mood('lucky', 'happy'); st.mood('kitty', 'happy');
    await st.wait(600);
    await Promise.all([st.walk('lucky', 2300, { speed: 160, follow: false }), st.walk('kitty', 2455, { speed: 160, follow: false })]);
    st.act('lucky', 'e010no'); st.act('kitty', 'e010no');
    await st.wait(1200);
    st.act('lucky', null); st.act('kitty', null);
    st.dog('lucky', 'sit'); st.dog('kitty', 'sit');
  } },
  { key: ['What about you'], icon: '👉', label: 'you?', async play(st) {
    lbl(st);
    st.pose('minh', 'stand');
    await st.walk('minh', 2200, { speed: 140 });
    st.pose('minh', 'e010_you'); st.act('minh', 'hop'); st.mood('minh', 'wow');
    lbl(st, 'you');
    await st.wait(1300);
    st.act('minh', null); st.mood('minh', 'happy');
  } },
  { key: ['Do you like pho'], icon: '❓', label: 'like pho?', async play(st) {
    st.chest('minh', `<g transform="translate(0 -6) scale(1.4)">${BOWL}</g>`); st.pose('minh', 'carry');
    lbl(st, 'pho3');
    st.fx('sparkle', 2200, 180);
    await st.say('minh', 'Do you like pho?', 1900);
    st.mood('minh', 'joy');
    st.fx('hearts', 2200, 150);
    await st.wait(500);
  } },
];

export default {
  id: 'en010', worldW: 2520, floor: FLOOR, viewTop: 40, camStart: 60, css: KIT_CSS + CSS, bg, fg, beats: BEATS, poses: POSES, props: PROPS,
  cast: [
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 330 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 1060, s: 1.08 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 1140, s: 0.95 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 1240, s: 0.95 },
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: 1430, s: 0.95 },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: 1530, s: 0.95 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: 1915 },
    { id: 'lucky', kind: 'dog', x: 2318, s: 0.95 },
    { id: 'kitty', kind: 'cat', x: 2442, face: -1 },
  ],
  init(st) {
    ['mum', 'dad', 'grandma', 'grandpa'].forEach((id) => st.pose(id, 'sit'));
    st.dog('lucky', 'sit'); st.dog('kitty', 'sit');
  },
};
