/**
 * Bài 75 "The Treasure Map" (giới từ chuyển động across / through / along / past / into / out of): một buổi sáng hè ở quê,
 * đi từ trái sang phải đúng như con đường trên bản đồ: nhà ông (hòm gỗ cũ) → sân + cổng (out of) → bờ sông dài (along: sông
 * chảy ngay sau lưng suốt quãng đường) → ngôi đền cổ đứng bên đường (past: đi ngang không dừng) → cây cầu gỗ bắc qua con
 * suối chảy từ xa lại (across: từ bờ này sang bờ kia, nước ở dưới) → ruộng lúa (through: lúa vây quanh, che tới gối, rì rào
 * khi đi qua) → rừng tre (into: bước vào bóng râm, thân tre ở trước và sau) → cây đa lớn (hộp thiếc chôn dưới gốc).
 * Mỗi giới từ hiện nhãn + mũi tên đúng lúc nhân vật đi tới chỗ đó. Câu cuối: quay lại đi ngang đền (mũi tên ngược), ông đợi ở cổng.
 * Toạ độ cảnh: rộng 2340, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, room, doorway, shelf, books, sun } from '../kit.js';

const FLOOR = 282;
const X = { box: 62, door: 330, gate: 470, river0: 500, river1: 960, temple: 1010, bridge: 1220, rice0: 1370, rice1: 1690, forest: 1740, tree: 2180 };
const SPEED = 130;

// ── Đồ vật ────────────────────────────────────────────────────────────────
/** Bản đồ kho báu (gốc ở giữa, 64 × 46): nhà → sông → đền → cầu → ruộng → rừng tre → cây có dấu X. */
const MAP = (route = '') => `<path d="M-32 -22 Q-20 -25 -6 -22 T30 -24 L32 22 Q14 25 -4 22 T-30 23Z" fill="#FDE68A" stroke="${L}" stroke-width="1"/>
  <path d="M-30 -18 l3 2 M28 18 l-3 -2" stroke="#D6B26A" stroke-width="1"/>
  <path d="M-28 12 l5 -5 l5 5Z" fill="#EF4444" stroke="${L}" stroke-width="0.5"/><rect x="-27" y="12" width="8" height="6" fill="#FEF3C7" stroke="${L}" stroke-width="0.5"/>
  <path d="M-21 0 Q-14 -4 -6 0 T6 -1" stroke="#38BDF8" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M-6 -14 l5 -4 l5 4Z" fill="#B91C1C" stroke="${L}" stroke-width="0.5"/><rect x="-5" y="-14" width="8" height="5" fill="#FDE68A" stroke="${L}" stroke-width="0.5"/>
  <path d="M7 -20 Q5 0 8 20" stroke="#38BDF8" stroke-width="2.4" fill="none"/><rect x="3" y="3" width="10" height="3" fill="#A16207" stroke="${L}" stroke-width="0.4"/>
  ${[0, 1, 2].map((i) => `<path d="M${13 + i * 3} 12 v-5" stroke="#16A34A" stroke-width="1.4"/>`).join('')}
  ${[0, 1, 2].map((i) => `<path d="M${21 + i * 2.4} 10 v-14" stroke="#15803D" stroke-width="1.2"/>`).join('')}
  <circle cx="26" cy="-15" r="5" fill="#16A34A" stroke="${L}" stroke-width="0.5"/>
  <path d="M-22 15 Q-22 5 -14 5 H4 Q10 5 14 9 Q20 8 26 3" stroke="#DC2626" stroke-width="1.3" fill="none" stroke-dasharray="2.4 1.6" class="${route}"/>
  <path d="M23 0 l6 6 M29 0 l-6 6" stroke="#DC2626" stroke-width="2" stroke-linecap="round"/>`;
const MAP_CHEST = `<g transform="translate(0 -14) scale(0.62)">${MAP()}</g>`;
/** Hộp thiếc nhỏ (gốc = đáy giữa), nắp đóng / mở. */
const TIN = (open = false) => `<rect x="-13" y="-14" width="26" height="14" rx="2" fill="#94A3B8" stroke="${L}" stroke-width="0.9"/><path d="M-13 -9 H13" stroke="#64748B" stroke-width="0.8"/>
  ${open ? `<path d="M-13 -14 L-17 -27 H9 L13 -14Z" fill="#CBD5E1" stroke="${L}" stroke-width="0.9"/><rect x="-8" y="-20" width="14" height="9" fill="#FEF9C3" stroke="${L}" stroke-width="0.6" transform="rotate(-8)"/>`
    : `<rect x="-14" y="-17" width="28" height="5" rx="1.5" fill="#CBD5E1" stroke="${L}" stroke-width="0.9"/>`}`;
const NOTE = `<rect x="-9" y="-7" width="18" height="14" rx="1.5" fill="#FEF9C3" stroke="${L}" stroke-width="0.8"/><path d="M-6 -3 H6 M-6 0 H6 M-6 3 H3" stroke="#94A3B8" stroke-width="0.8"/>`;
/** Kem ốc quế (gốc ở giữa). */
const ICE = (c = '#F9A8D4') => `<path d="M-6 -2 L0 14 L6 -2Z" fill="#F59E0B" stroke="${L}" stroke-width="0.8"/><path d="M-4 2 L3 0 M-2 7 L2 5" stroke="#B45309" stroke-width="0.6"/>
  <circle cy="-6" r="7" fill="${c}" stroke="${L}" stroke-width="0.8"/><circle cx="2" cy="-12" r="2" fill="#EF4444"/>`;
const ICE2 = `<g transform="translate(-9 -30)">${ICE('#F9A8D4')}</g><g transform="translate(9 -30)">${ICE('#FDE68A')}</g>`;
const ICE1 = (c) => `<g transform="translate(12 -12)">${ICE(c)}</g>`;
/** Ba lô của Tom (đặt trên sàn). */
const PACK = `<rect x="-11" y="-26" width="22" height="26" rx="5" fill="#22C55E" stroke="${L}" stroke-width="1"/><rect x="-8" y="-13" width="16" height="9" rx="2" fill="none" stroke="${L}" stroke-width="0.8"/>`;

const POSES = {
  e075_bend: { R: [50, 70], L: [40, 60], dy: 14, head: 14 },
  e075_go: { R: [96, 96], L: [10, 4], head: -4 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
/** Ngôi đền cổ (gốc = giữa nền), mái cong, cột đỏ, rêu xanh. */
const TEMPLE = (x, y) => `<g transform="translate(${x} ${y})">
  <rect x="-88" y="-8" width="176" height="10" fill="#A8A29E" stroke="${L}"/>
  <rect x="-74" y="-92" width="148" height="84" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/>
  ${[-60, -22, 22, 60].map((dx) => `<rect x="${dx - 5}" y="-92" width="10" height="84" fill="#B91C1C" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="-16" y="-60" width="32" height="52" fill="#78350F" stroke="${L}"/><path d="M0 -60 V-8" stroke="${L}" stroke-width="0.8"/>
  <path d="M-100 -88 Q-96 -98 -84 -100 L-60 -128 H60 L84 -100 Q96 -98 100 -88 Q80 -94 0 -94 Q-80 -94 -100 -88Z" fill="#9A3412" stroke="${L}" stroke-width="1.2"/>
  <path d="M-62 -128 Q-58 -136 -48 -136 H48 Q58 -136 62 -128Z" fill="#7C2D12" stroke="${L}"/><path d="M-12 -136 q12 -12 24 0" fill="#FACC15" stroke="${L}" stroke-width="0.8"/>
  <rect x="-24" y="-84" width="48" height="16" rx="2" fill="#7C2D12" stroke="${L}" stroke-width="0.7"/><path d="M-16 -76 h8 M-4 -76 h8 M8 -76 h8" stroke="#FACC15" stroke-width="1.6"/>
  <path d="M-70 -20 q8 -6 14 0 M40 -40 q6 -5 12 0 M-40 -60 q5 -4 10 0" stroke="#4D7C0F" stroke-width="2.4" fill="none" opacity="0.7" stroke-linecap="round"/>
  <path d="M-30 -92 l6 10 M44 -30 l-4 8" stroke="#A8A29E" stroke-width="1"/></g>`;
const BAMBOO = (x, y0, h, w = 7, c = '#65A30D') => `<g><rect x="${x - w / 2}" y="${y0 - h}" width="${w}" height="${h}" fill="${c}" stroke="${L}" stroke-width="0.8"/>
  ${Array.from({ length: Math.floor(h / 34) }, (_, i) => `<path d="M${x - w / 2} ${y0 - 30 - i * 34} h${w}" stroke="#3F6212" stroke-width="1.4"/>`).join('')}
  <g class="ek-sway" style="transform-origin:${x}px ${y0 - h}px">${[0, 1, 2].map((i) => `<path d="M${x} ${y0 - h + 20 + i * 26} q${i % 2 ? -16 : 16} -6 ${i % 2 ? -26 : 26} 4 q${i % 2 ? 12 : -12} -2 ${i % 2 ? 26 : -26} -4Z" fill="#84CC16" stroke="${L}" stroke-width="0.6"/>`).join('')}</g></g>`;
/** Khóm lúa (gốc = mặt đất). */
const RICE = (x, y, s = 1, cls = '') => `<g transform="translate(${x} ${y}) scale(${s})"><g class="e075-rice ${cls}" style="animation-delay:${((x * 7) % 10) / 20}s">
  ${[-8, -4, 0, 4, 8].map((dx, i) => `<path d="M${dx * 0.4} 0 Q${dx * 0.8} -18 ${dx * 1.6} -${34 - Math.abs(dx)}" stroke="${i % 2 ? '#65A30D' : '#84CC16'}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`).join('')}
  <path d="M2 -26 q6 -4 9 -12" stroke="#EAB308" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="2 1.4"/></g></g>`;

function bg() {
  const riceBack = Array.from({ length: 12 }, (_, i) => RICE(X.rice0 + 10 + i * 28, 252, 0.8)).join('');
  const bambooBack = Array.from({ length: 22 }, (_, i) => BAMBOO(X.forest + 6 + i * 27 + (i % 3) * 6, 262, 190 + (i % 4) * 20, 7, i % 2 ? '#65A30D' : '#4D7C0F')).join('');
  return `
  ${sky(X.door, 2340 - X.door, 315, 'e075sky')}
  <g transform="translate(560 70)">${sun(22)}</g>
  ${cloud(760, 60, 0.8, 0)}${cloud(1180, 50, 0.9, 2)}${cloud(1560, 66, 0.7, 4)}
  <!-- Nhà ông: phòng có hòm gỗ cũ -->
  ${room(0, X.door, FLOOR, '#FEF3C7')}
  <defs><clipPath id="e075win"><rect x="196" y="76" width="96" height="80"/></clipPath></defs>
  <g><rect x="196" y="76" width="96" height="80" fill="#BAE6FD"/><g clip-path="url(#e075win)"><g class="e075-msun"><circle cx="262" cy="150" r="13" fill="#FDE047" stroke="#F59E0B" stroke-width="1.4"/></g></g>
    <path d="M196 140 Q240 126 292 138 V156 H196Z" fill="#86EFAC"/>
    <rect x="190" y="70" width="108" height="92" rx="3" fill="none" stroke="#fff" stroke-width="6"/><rect x="186" y="66" width="116" height="100" rx="4" fill="none" stroke="${L}" stroke-width="1.2"/>
    <path d="M244 70 V162" stroke="#fff" stroke-width="4"/></g>
  ${shelf(40, 128, 110, books(52, 128, 5) + `<g transform="translate(126 128)"><path d="M-7 0 L-5 -14 H5 L7 0Z" fill="#60A5FA" stroke="${L}" stroke-width="0.7"/></g>`)}
  <!-- hòm gỗ cũ: nắp mở được -->
  <g transform="translate(${X.box} ${FLOOR})"><rect x="-30" y="-34" width="60" height="34" rx="3" fill="#92400E" stroke="${L}" stroke-width="1.2"/>
    <path d="M-30 -20 H30 M-18 -34 V0 M18 -34 V0" stroke="#78350F" stroke-width="2"/><rect x="-4" y="-30" width="8" height="8" rx="1" fill="#FACC15" stroke="${L}" stroke-width="0.6"/>
    <g class="e075-lid"><path d="M-32 -34 Q-32 -46 0 -48 Q32 -46 32 -34Z" fill="#A16207" stroke="${L}" stroke-width="1.2"/><path d="M-18 -34 V-46 M18 -34 V-46" stroke="#78350F" stroke-width="2"/></g>
    <g class="e075-inmap"><g transform="translate(0 -38) rotate(-8) scale(0.4)">${MAP()}</g></g></g>
  ${doorway(X.door, FLOOR)}
  <!-- sân, hàng rào, cổng -->
  <path d="M${X.door + 12} 230 Q420 214 ${X.river0} 228 V${FLOOR} H${X.door + 12}Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(400, 236, 0.75)}
  <rect x="${X.door + 12}" y="${FLOOR - 4}" width="${X.river0 - X.door - 12}" height="40" fill="#86EFAC" stroke="${L}"/>
  ${Array.from({ length: 4 }, (_, i) => `<rect x="${X.door + 22 + i * 26}" y="${FLOOR - 40}" width="8" height="36" rx="3" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="${X.door + 16}" y="${FLOOR - 30}" width="${X.gate - X.door - 24}" height="6" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>
  <rect x="${X.gate - 14}" y="${FLOOR - 64}" width="12" height="64" fill="#E7E5E4" stroke="${L}"/><rect x="${X.gate + 62}" y="${FLOOR - 64}" width="12" height="64" fill="#E7E5E4" stroke="${L}"/>
  <path d="M${X.gate - 16} ${FLOOR - 64} h16 M${X.gate + 60} ${FLOOR - 64} h16" stroke="${L}" stroke-width="3" stroke-linecap="round"/>
  <!-- cánh cổng (mở gập về phía cột trái) -->
  <g class="e075-gate"><rect x="${X.gate - 2}" y="${FLOOR - 50}" width="64" height="44" fill="none" stroke="#475569" stroke-width="3"/>
    ${[10, 22, 34, 46].map((dx) => `<path d="M${X.gate - 2 + dx} ${FLOOR - 50} V${FLOOR - 6}" stroke="#475569" stroke-width="2.4"/>`).join('')}<path d="M${X.gate - 2} ${FLOOR - 28} H${X.gate + 62}" stroke="#475569" stroke-width="2"/></g>
  <!-- bờ sông dài -->
  <path d="M${X.river0} 216 Q700 196 900 214 T1100 208 V230 H${X.river0}Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(640, 216, 0.5, '')}${tree(830, 214, 0.45, '')}
  <rect x="${X.river0}" y="222" width="${X.temple - 60 - X.river0}" height="46" fill="#38BDF8" stroke="${L}"/>
  <g class="e075-flow">${Array.from({ length: 12 }, (_, i) => `<path d="M${X.river0 + 14 + i * 38} ${232 + (i % 3) * 11} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <g class="e075-boat"><path d="M600 236 H640 L632 246 H608Z" fill="#B45309" stroke="${L}" stroke-width="0.8"/><path d="M620 236 V214 L636 232Z" fill="#fff" stroke="${L}" stroke-width="0.7"/></g>
  <!-- đền cổ đứng sau đường -->
  <path d="M${X.temple - 60} 230 Q${X.temple} 222 ${X.temple + 140} 232 V268 H${X.temple - 60}Z" fill="#BBF7D0"/>
  ${TEMPLE(X.temple, 262)}
  ${tree(X.temple + 120, 262, 0.7)}
  <!-- suối chảy từ xa lại, cầu gỗ bắc ngang -->
  <path d="M${X.temple + 140} 232 Q1300 216 ${X.rice0} 226 V268 H${X.temple + 140}Z" fill="#BBF7D0"/>
  <path d="M${X.bridge - 14} 226 Q${X.bridge - 30} 262 ${X.bridge - 60} 315 H${X.bridge + 60} Q${X.bridge + 30} 262 ${X.bridge + 14} 226Z" fill="#38BDF8" stroke="${L}"/>
  <g class="e075-stream">${[0, 1, 2, 3].map((i) => `<path d="M${X.bridge - 6 - i * 4} ${240 + i * 18} q4 3 8 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <!-- ruộng lúa phía sau -->
  <rect x="${X.rice0 - 10}" y="226" width="${X.rice1 - X.rice0 + 40}" height="42" fill="#A3E635" stroke="${L}" stroke-width="0.8"/>
  ${riceBack}
  <!-- rừng tre -->
  <rect x="${X.forest - 10}" y="0" width="${2340 - X.forest + 10}" height="268" fill="#BEF264" opacity="0.5"/>
  ${bambooBack}
  <!-- cây đa lớn giữa rừng -->
  <g transform="translate(${X.tree} ${FLOOR})">
    <g class="ek-sway" style="transform-origin:0px -120px"><circle cx="0" cy="-210" r="70" fill="#15803D" stroke="${L}"/><circle cx="-70" cy="-180" r="46" fill="#166534" stroke="${L}"/><circle cx="72" cy="-186" r="50" fill="#16A34A" stroke="${L}"/></g>
    <path d="M-34 -2 Q-24 -80 -26 -150 L26 -150 Q24 -80 36 -2Z" fill="#92400E" stroke="${L}" stroke-width="1.3"/>
    <path d="M-34 -2 Q-50 -4 -60 2 M36 -2 Q52 -6 62 2 M-14 -60 q8 -8 4 -20 M12 -100 q-6 -8 2 -14" stroke="#78350F" stroke-width="2" fill="none"/>
    <path d="M-60 0 Q-40 -16 -28 -10 M60 0 Q40 -16 28 -10" stroke="#92400E" stroke-width="6" fill="none" stroke-linecap="round"/></g>
  <!-- đất ở chân cây: ụ đất → hố -->
  <g class="e075-mound"><path d="M${X.tree - 26} ${FLOOR + 2} Q${X.tree} ${FLOOR - 14} ${X.tree + 26} ${FLOOR + 2}Z" fill="#A16207" stroke="${L}" stroke-width="0.8"/></g>
  <g class="e075-hole"><ellipse cx="${X.tree}" cy="${FLOOR + 4}" rx="22" ry="5" fill="#713F12" stroke="${L}" stroke-width="0.8"/><path d="M${X.tree + 28} ${FLOOR + 2} q10 -12 22 0Z" fill="#A16207" stroke="${L}" stroke-width="0.7"/></g>
  <!-- mặt đất + đường đi -->
  <rect x="${X.river0}" y="268" width="${X.bridge - 60 - X.river0}" height="47" fill="#86EFAC" stroke="${L}"/>
  <rect x="${X.bridge + 60}" y="268" width="${2340 - X.bridge - 60}" height="47" fill="#86EFAC" stroke="${L}"/>
  <path d="M${X.river0} 278 H${X.bridge - 64} M${X.bridge + 64} 278 H2340" stroke="#D6B98A" stroke-width="12"/>
  <rect x="${X.forest}" y="268" width="${2340 - X.forest}" height="47" fill="#65A30D" opacity="0.35"/>
  <!-- cầu gỗ (lan can sau) -->
  <path d="M${X.bridge - 74} ${FLOOR - 26} Q${X.bridge} ${FLOOR - 40} ${X.bridge + 74} ${FLOOR - 26}" stroke="#92400E" stroke-width="4" fill="none" stroke-linecap="round"/>
  ${[-60, -30, 0, 30, 60].map((dx) => `<path d="M${X.bridge + dx} ${FLOOR} V${FLOOR - 30 - (dx === 0 ? 8 : Math.abs(dx) < 40 ? 5 : 0)}" stroke="#92400E" stroke-width="3"/>`).join('')}
  <rect x="${X.bridge - 76}" y="${FLOOR - 2}" width="152" height="8" rx="2" fill="#B45309" stroke="${L}"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${X.bridge - 70 + i * 17} ${FLOOR - 2} v8" stroke="#78350F" stroke-width="0.8"/>`).join('')}
  ${bush(560, FLOOR + 30, 0.6)}${bush(900, FLOOR + 32, 0.7, '#4ADE80')}
  <!-- nhãn -->
  <g class="e075-lb e075-lb-summer">${label(130, 62, 'summer holiday', '#EA580C', 16)}</g>
  <g class="e075-lb e075-lb-morning">${label(244, 58, 'one morning', '#CA8A04', 15)}</g>
  <g class="e075-lb e075-lb-map">${label(X.box + 50, 142, 'an old map', '#92400E', 14)}</g>`;
}

function fg() {
  const lanSmall = headOnly('en_lan_home', { s: 0.55, mood: 'joy' });
  const gpa = headOnly('en_grandpa', { s: 0.68, mood: 'joy' });
  const inner = `<g transform="scale(1.15)">${MAP('e075-route')}</g>
    <g transform="translate(-74 2)">${gpa}</g><g transform="translate(74 10)">${lanSmall}</g>
    <g class="e075-pen"><g transform="translate(30 4) rotate(30)"><rect x="-1.6" y="-16" width="3.2" height="16" fill="#FACC15" stroke="${L}" stroke-width="0.6"/><path d="M-1.6 0 L0 4 L1.6 0Z" fill="#1F2937"/></g></g>`;
  const arrow = (x1, x2, y, c, back = false) => `<path d="M${x1} ${y} H${x2}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><path d="${back ? `M${x2 + 10} ${y - 8} L${x2} ${y} L${x2 + 10} ${y + 8}` : `M${x2 - 10} ${y - 8} L${x2} ${y} L${x2 - 10} ${y + 8}`}" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const riceFront = Array.from({ length: 13 }, (_, i) => RICE(X.rice0 - 6 + i * 26, 304 + (i % 2) * 6, 1.25, 'e075-near')).join('');
  return `
  <!-- lan can trước của cầu (người đi giữa hai lan can) -->
  <path d="M${X.bridge - 74} ${FLOOR - 16} Q${X.bridge} ${FLOOR - 28} ${X.bridge + 74} ${FLOOR - 16}" stroke="#B45309" stroke-width="4.4" fill="none" stroke-linecap="round"/>
  ${[-70, -35, 0, 35, 70].map((dx) => `<path d="M${X.bridge + dx} ${FLOOR + 8} V${FLOOR - 18 - (dx === 0 ? 10 : Math.abs(dx) < 40 ? 6 : 0)}" stroke="#B45309" stroke-width="3.4"/>`).join('')}
  <!-- lúa phía trước (che tới gối) -->
  ${riceFront}
  <!-- thân tre phía trước + bóng râm của rừng -->
  <rect x="${X.forest + 20}" y="0" width="${2340 - X.forest - 20}" height="315" fill="#14532D" opacity="0.14"/>
  ${BAMBOO(X.forest + 2, 320, 300, 10, '#4D7C0F')}${BAMBOO(X.tree - 120, 320, 300, 9, '#4D7C0F')}${BAMBOO(2310, 320, 300, 10, '#65A30D')}
  <!-- bong bóng nghĩ: ông vẽ bản đồ cho Lan lúc còn nhỏ -->
  ${thoughtBubble(150, 100, 228, 100, inner)}
  <!-- tên người nói -->
  <g class="e075-lb e075-lb-tom">${speakerTag(446, 152, 'Tom')}</g>
  <!-- giới từ: nhãn + mũi tên -->
  <g class="e075-lb e075-lb-out">${label(X.gate + 30, 168, 'out of the gate', '#7C3AED', 14)}${arrow(X.gate - 30, X.gate + 90, 186, '#7C3AED')}</g>
  <g class="e075-lb e075-lb-along">${label(810, 180, 'along the river', '#0369A1', 16)}${arrow(620, 940, 204, '#0369A1')}</g>
  <g class="e075-lb e075-lb-past">${label(X.temple, 70, 'past the temple', '#B45309', 15)}${arrow(X.temple - 120, X.temple + 120, 300, '#B45309')}</g>
  <g class="e075-lb e075-lb-across">${label(X.bridge + 50, 190, 'across the bridge', '#0F766E', 14)}<path d="M${X.bridge - 80} 212 Q${X.bridge} 186 ${X.bridge + 80} 212" stroke="#0F766E" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M${X.bridge + 68} 202 L${X.bridge + 80} 212 L${X.bridge + 66} 216" stroke="#0F766E" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  <g class="e075-lb e075-lb-through">${label((X.rice0 + X.rice1) / 2, 150, 'through the rice fields', '#4D7C0F', 14)}${arrow(X.rice0, X.rice1, 248, '#4D7C0F')}</g>
  <g class="e075-lb e075-lb-into">${label(X.forest + 50, 104, 'into the forest', '#166534', 14)}<path d="M${X.forest - 40} 140 Q${X.forest + 10} 120 ${X.forest + 70} 136" stroke="#166534" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M${X.forest + 58} 128 L${X.forest + 70} 136 L${X.forest + 56} 142" stroke="#166534" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  <g class="e075-lb e075-lb-under">${label(X.tree + 4, 150, 'under a big tree', '#92400E', 14)}</g>
  <g class="e075-lb e075-lb-back">${label(X.temple, 70, 'back past the temple', '#B45309', 14)}${arrow(X.temple + 120, X.temple - 120, 300, '#B45309', true)}</g>
  <g class="e075-lb e075-lb-smile">${label(X.gate - 6, 92, 'a big smile', '#DB2777', 14)}</g>
  <!-- mẩu giấy trong hộp -->
  <g class="e075-note"><g transform="translate(2160 104)"><rect x="-96" y="-44" width="192" height="88" rx="6" fill="#FEF9C3" stroke="${L}" stroke-width="1.4" transform="rotate(-2)"/>
    <text x="0" y="-12" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="24" fill="#DC2626">Well done!</text>
    <g class="e075-n2"><text x="-10" y="18" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="12.5" fill="#1E3A8A">Walk back past the temple</text>
    <text x="-10" y="34" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="12.5" fill="#1E3A8A">for some ice cream!</text>
    <g transform="translate(78 22) scale(1.1)">${ICE()}</g></g></g></g>`;
}
/** Bong bóng nghĩ của truyện (bản riêng có class để hiện / ẩn). */
function thoughtBubble(x, y, w, h, inner) {
  const bumps = Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return `<circle cx="${(Math.cos(a) * w * 0.42).toFixed(1)}" cy="${(Math.sin(a) * h * 0.38).toFixed(1)}" r="${(h * 0.2).toFixed(1)}" fill="#fff" stroke="${L}" stroke-width="1"/>`; }).join('');
  const dots = [[x + 100, y + 44, 5], [x + 108, y + 56, 3.6]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${L}" stroke-width="0.9"/>`).join('');
  return `<g class="e075-think">${dots}<g transform="translate(${x} ${y})">${bumps}<ellipse rx="${w * 0.46}" ry="${h * 0.42}" fill="#fff"/>${inner}</g></g>`;
}
const speakerTag = (x, y, name) => `<g transform="translate(${x} ${y})"><rect x="-26" y="-24" width="52" height="22" rx="11" fill="#fff" stroke="#EA580C" stroke-width="1.8"/>
  <path d="M-5 -3 L0 4 L5 -3Z" fill="#fff" stroke="#EA580C" stroke-width="1.4" stroke-linejoin="round"/><rect x="-5" y="-5" width="10" height="3" fill="#fff"/>
  <text x="0" y="-8" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#EA580C">${name}</text></g>`;

const CSS = `
.e075-lb { opacity: 0; transition: opacity .35s; }
${['summer', 'morning', 'map', 'tom', 'out', 'along', 'past', 'across', 'through', 'into', 'under', 'back', 'smile'].map((k) => `.st-lb-${k} .e075-lb-${k}`).join(', ')} { opacity: 1; }
.e075-msun { transform: translateY(26px); transition: transform 1.6s ease-out; }
.st-morning .e075-msun { transform: translateY(-46px); }
.e075-gate { transform-origin: ${X.gate - 2}px 0px; transition: transform .6s ease-out; }
.st-gate .e075-gate { transform: scaleX(.14); }
.e075-lid { transform-origin: -30px -34px; transition: transform .5s cubic-bezier(.3,1.4,.6,1); }
.st-boxopen .e075-lid { transform: rotate(-70deg); }
.e075-inmap { opacity: 0; transition: opacity .2s; }
.st-boxopen .e075-inmap { opacity: 1; } .st-mapout .e075-inmap { opacity: 0; }
.e075-think { opacity: 0; transform: scale(.4); transform-origin: 260px 150px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-think .e075-think { opacity: 1; transform: scale(1); }
.e075-route { clip-path: inset(0 100% 0 0); }
.st-think .e075-route { clip-path: inset(0 0 0 0); transition: clip-path 2.6s linear .3s; }
.st-think .e075-pen { animation: e075Pen 2.6s linear .3s both; }
@keyframes e075Pen { 0% { transform: translate(-86px, 8px); } 30% { transform: translate(-44px, -6px); } 60% { transform: translate(-4px, -2px); } 100% { transform: translate(0, 0); } }
.e075-flow { animation: e075Flow 2.2s linear infinite; }
@keyframes e075Flow { from { transform: translateX(-10px); } to { transform: translateX(14px); } }
.e075-boat { animation: e075Boat 14s ease-in-out infinite alternate; }
@keyframes e075Boat { to { transform: translateX(220px); } }
.e075-stream { animation: e075Down 1.4s linear infinite; }
@keyframes e075Down { from { transform: translateY(-6px); opacity: .4; } 50% { opacity: 1; } to { transform: translateY(8px); opacity: .4; } }
.e075-rice { transform-box: fill-box; transform-origin: 50% 100%; }
.st-rustle .e075-near { animation: e075Rice .45s ease-in-out infinite alternate; }
@keyframes e075Rice { from { transform: rotate(-7deg); } to { transform: rotate(7deg); } }
.e075-hole { opacity: 0; transition: opacity .3s; }
.st-dug .e075-hole { opacity: 1; } .st-dug .e075-mound { opacity: 0; }
.e075-mound { transition: opacity .3s; }
.e075-note { opacity: 0; transform: scale(.3); transform-origin: 2160px 160px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-note .e075-note { opacity: 1; transform: none; }
.e075-n2 { opacity: 0; transition: opacity .4s; } .st-note2 .e075-n2 { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .e075-flow { animation-duration: 5s; } .e075-boat { animation-duration: 30s; } .e075-stream { animation-duration: 3s; }
  .st-rustle .e075-near { animation-duration: 1.2s; }
  .st-think .e075-route { transition-duration: 3.4s; } .st-think .e075-pen { animation-duration: 3.4s; }
}
`;

/** Ba bạn đi cùng nhau: Tom dẫn đầu, Minh (cầm bản đồ) sau 50, Lucky sau 100; camera theo Tom. */
const trio = (st, x, { speed = SPEED, lead = 30 } = {}) => {
  // Camera tự lia chậm hơn bước đi một chút (đường cong camera khác đường cong bước) để nhân vật luôn ở giữa khung
  st.look(x + lead, { dur: tt(st.a('tom').x, x, speed) * 1.2 });
  return trioWalk(st, x, speed);
};
const trioWalk = (st, x, speed) => Promise.all([
  st.walk('tom', x, { speed, follow: false }),
  st.walk('minh', x - 50, { speed, follow: false }),
  st.walk('lucky', x - 100, { speed, follow: false }),
]);
/** Thời gian (ms) để đi từ a tới b. */
const tt = (a, b, speed = SPEED) => (Math.abs(b - a) / speed) * 1000;

const BEATS = [
  { key: ['summer holiday', "stayed with Minh at Grandpa's house"], icon: '🏡', label: "Grandpa's house", async play(st) {
    st.look(240);
    st.set('st-lb-summer'); st.sfx('birds', { vol: 0.5 });
    st.pose('minh', 'wave'); st.act('minh', 'wave'); st.mood('minh', 'joy');
    await st.walk('tom', 196, { speed: SPEED, follow: false });
    st.act('minh', null); st.pose('minh', 'stand');
    st.bag('tom', false); st.show('pack', true); st.sfx('bag-on', { vol: 0.7 });
    st.mood('tom', 'joy'); st.mood('grandpa', 'joy'); st.pose('grandpa', 'open');
    await st.wait(900);
    st.pose('grandpa', 'stand');
  } },
  { key: ['One morning', 'found an old map in a box'], icon: '📦', label: 'old map', async play(st) {
    st.set('st-lb-summer', false); st.look(200);
    st.set('st-morning'); st.set('st-lb-morning'); st.sfx('window-open', { vol: 0.4 });
    await Promise.all([
      st.walk('minh', X.box + 50, { speed: SPEED, follow: false }),
      st.walk('tom', X.box + 104, { speed: SPEED, follow: false }),
    ]);
    st.face('minh', -1); st.face('tom', -1);
    st.pose('minh', 'e075_bend'); st.pose('tom', 'e075_bend');
    await st.wait(300);
    st.set('st-boxopen'); st.sfx('wardrobe-open', { vol: 0.7 }); st.mood('minh', 'wow'); st.mood('tom', 'wow');
    await st.wait(600);
    st.set('st-mapout'); st.sfx('whoosh', { vol: 0.5 });
    await st.fly(`<g transform="scale(0.5)">${MAP()}</g>`, [X.box, FLOOR - 40], [X.box + 50, FLOOR - 70], { size: 34, dur: 600 });
    st.pose('minh', 'carry'); st.chest('minh', MAP_CHEST); st.pose('tom', 'stand'); st.sfx('page-turn', { vol: 0.8 });
    st.set('st-lb-map');
    await st.wait(900);
  } },
  { key: ['treasure map', 'Grandpa drew for Lan', 'when she was small'], icon: '🗺️', label: 'treasure map', async play(st) {
    off(st, 'st-lb-morning', 'st-lb-map');
    st.look(200);
    st.pose('grandpa', 'point'); st.mood('grandpa', 'joy');
    st.set('st-think'); st.sfx('pop', { vol: 0.5 });
    await st.wait(300);
    await st.loop('pencil', () => st.wait(2600), { vol: 0.8 });
    st.sfx('ding', { vol: 0.4 });
    st.pose('grandpa', 'stand'); st.mood('minh', 'joy'); st.mood('tom', 'joy');
    await st.wait(700);
  } },
  { key: ["Let's follow it"], icon: '👉', label: "Let's follow it!", async play(st) {
    st.set('st-think', false);
    st.look(260);
    st.face('tom', 1); st.pose('tom', 'clap'); st.act('tom', 'clap'); st.sfx('clap', { vol: 0.7 });
    await st.wait(500);
    st.act('tom', null); st.pose('tom', 'e075_go'); st.mood('tom', 'joy');
    await st.say('tom', "Let's follow it!", 1300);
    await Promise.all([
      st.walk('tom', 446, { speed: SPEED, lead: -60 }),
      st.walk('minh', 396, { speed: SPEED, follow: false }),
    ]);
  } },
  { key: ['said Tom'], icon: '🗣️', label: 'said Tom', async play(st) {
    st.look(400);
    st.set('st-lb-tom'); st.sfx('pop', { vol: 0.6 });
    st.pose('tom', 'e075_go'); st.act('tom', 'nod'); st.mood('tom', 'joy');
    await st.wait(500);
    st.dog('lucky', 'stand'); st.mood('lucky', 'joy'); st.act('lucky', 'jump'); st.sfx('dog-bark', { vol: 0.8 });
    await st.wait(1000);
    st.act('lucky', null); st.act('tom', null); st.pose('tom', 'stand');
  } },
  { key: ['walked out of the gate', 'along the river'], icon: '🏞️', label: 'along the river', async play(st) {
    st.set('st-lb-tom', false); st.mood('lucky', 'happy'); st.face('lucky', 1);
    st.look(470);
    st.pose('tom', 'give');
    await st.wait(250);
    st.set('st-gate'); st.set('st-lb-out'); st.sfx('door-open', { vol: 0.6 });
    await st.wait(450);
    const go = trio(st, 900);
    await st.wait(tt(446, 600));
    st.set('st-lb-out', false); st.set('st-lb-along');
    await st.loop('river', () => go, { vol: 0.7 });
    st.mood('minh', 'joy');
    await st.wait(300);
  } },
  { key: ['walked past the old temple', 'across a small bridge'], icon: '🌉', label: 'past · across', async play(st) {
    st.set('st-lb-along', false);
    const go = trio(st, 1380, { lead: 20 });
    await st.wait(tt(900, X.temple - 60));
    st.set('st-lb-past'); st.sfx('ding', { vol: 0.3, rate: 0.8 });
    await st.wait(tt(X.temple - 60, X.bridge - 76));
    st.set('st-lb-past', false); st.set('st-lb-across');
    st.sfx('knock', { vol: 0.35 });
    await st.wait(450); st.sfx('river', { vol: 0.5 });
    await st.wait(450); st.sfx('knock', { vol: 0.35 });
    await go;
    await st.wait(300);
  } },
  { key: ['through the rice fields', 'into a bamboo forest'], icon: '🌾', label: 'through · into', async play(st) {
    st.set('st-lb-across', false);
    const go = trio(st, 1900);
    await st.wait(tt(1380, X.rice0 + 20));
    st.set('st-lb-through'); st.set('st-rustle');
    await st.loop('wind', () => st.wait(tt(X.rice0 + 20, X.rice1 + 60)), { vol: 0.6 });
    st.set('st-lb-through', false); st.set('st-lb-into');
    await st.wait(tt(X.rice1 + 60, X.forest + 20));
    st.set('st-rustle', false); st.sfx('birds', { vol: 0.6 });
    await go;
    st.mood('minh', 'wow'); st.mood('tom', 'wow');
    await st.wait(400);
  } },
  { key: ['Lucky ran ahead of them', 'barking happily'], icon: '🐶', label: 'Lucky ran ahead', async play(st) {
    st.set('st-lb-into', false);
    st.mood('lucky', 'joy'); st.sfx('dog-bark', { vol: 0.8 });
    const run = st.loop('steps', () => st.walk('lucky', X.tree + 34, { speed: 240, follow: false }), { vol: 0.4 });
    st.look(2050, { dur: 1600 });
    await Promise.all([run, st.walk('tom', 2000, { speed: SPEED, follow: false }), st.walk('minh', 1950, { speed: SPEED, follow: false })]);
    st.face('lucky', -1); st.act('lucky', 'jump'); st.sfx('dog-bark');
    await st.say('lucky', 'Woof! Woof!', 1100);
    st.sfx('dog-bark', { vol: 0.8 });
    await st.wait(300);
    st.act('lucky', null);
  } },
  { key: ['Under a big tree', 'found a tin box'], icon: '🌳', label: 'under a big tree', async play(st) {
    st.chest('minh', null); st.pose('minh', 'stand');
    st.look(X.tree);
    await Promise.all([
      st.walk('minh', X.tree - 50, { speed: SPEED, follow: false }),
      st.walk('tom', X.tree + 70, { speed: SPEED, follow: false }),
    ]);
    st.face('tom', -1); st.set('st-lb-under');
    st.pose('minh', 'dig'); st.pose('tom', 'dig'); st.act('minh', 'dig'); st.act('tom', 'dig'); st.act('lucky', 'wag');
    await st.loop('dig', () => st.wait(1300), { vol: 0.8 });
    st.fx('poof', X.tree, FLOOR - 4, { quiet: true });
    st.set('st-dug'); st.show('tin', true); st.sfx('click', { vol: 0.7 });
    st.act('minh', null); st.act('tom', null);
    st.pose('minh', 'e075_bend'); st.pose('tom', 'stand'); st.mood('minh', 'wow'); st.mood('tom', 'wow');
    await st.wait(900);
  } },
  { key: ['there was a note', 'Well done'], icon: '📝', label: 'a note', async play(st) {
    st.set('st-lb-under', false);
    st.look(X.tree);
    st.show('tin', false); st.chest('minh', `<g transform="translate(0 -4)">${TIN(false)}</g>`); st.pose('minh', 'carry');
    await st.wait(400);
    st.chest('minh', `<g transform="translate(0 -4)">${TIN(true)}</g>`); st.sfx('click', { vol: 0.8 });
    await st.wait(300);
    st.sfx('page-turn', { vol: 0.8 });
    await st.fly(NOTE, [X.tree - 50, 220], [X.tree - 20, 110], { size: 24, dur: 500 });
    st.set('st-note');
    st.pose('tom', 'cheer'); st.act('tom', 'jump'); st.mood('tom', 'joy'); st.mood('minh', 'joy'); st.sfx('cheer', { vol: 0.5 });
    await st.wait(1300);
    st.act('tom', null); st.pose('tom', 'stand');
  } },
  { key: ['walk back past the temple', 'some ice cream'], icon: '🍦', label: 'walk back past', async play(st) {
    st.look(X.tree);
    st.set('st-note2'); st.sfx('page-turn', { vol: 0.7 });
    st.pose('minh', 'carry'); st.mood('minh', 'joy');
    await st.wait(1500);
    // cắt cảnh: đã đi ngược lại tới bên kia đền
    off(st, 'st-note', 'st-note2');
    st.chest('minh', MAP_CHEST);
    st.place('tom', X.temple + 120, FLOOR, -1); st.place('minh', X.temple + 170, FLOOR, -1); st.place('lucky', X.temple + 220, FLOOR, -1);
    st.look(X.temple + 60, { instant: true });
    st.set('st-lb-back');
    await Promise.all([
      st.walk('tom', X.temple - 150, { speed: SPEED, lead: -20 }),
      st.walk('minh', X.temple - 100, { speed: SPEED, follow: false }),
      st.walk('lucky', X.temple - 50, { speed: SPEED, follow: false }),
    ]);
  } },
  { key: ['Grandpa was waiting at the gate', 'a big smile'], icon: '😊', label: 'a big smile', async play(st) {
    st.set('st-lb-back', false);
    st.place('grandpa', X.gate + 10, FLOOR, 1); st.chest('grandpa', ICE2); st.pose('grandpa', 'carry'); st.mood('grandpa', 'joy');
    st.place('tom', X.gate + 240, FLOOR, -1); st.place('minh', X.gate + 290, FLOOR, -1); st.place('lucky', X.gate + 340, FLOOR, -1);
    st.look(X.gate + 110, { instant: true });
    st.set('st-lb-smile'); st.sfx('giggle', { vol: 0.5 });
    await Promise.all([
      st.walk('tom', X.gate + 80, { speed: SPEED, follow: false }),
      st.walk('minh', X.gate + 130, { speed: SPEED, follow: false }),
      st.walk('lucky', X.gate + 190, { speed: SPEED, follow: false }),
    ]);
    st.pose('grandpa', 'give'); st.chest('grandpa', null); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(ICE(), [X.gate + 30, 200], [X.gate + 130, 196], { size: 20, dur: 450 });
    st.chest('minh', ICE1('#F9A8D4')); st.chest('tom', ICE1('#FDE68A')); st.pose('grandpa', 'open');
    st.pose('minh', 'carry'); st.pose('tom', 'carry');
    st.mood('minh', 'joy'); st.mood('tom', 'joy'); st.sfx('slurp', { vol: 0.7 });
    st.dog('lucky', 'sit'); st.act('lucky', 'wag');
    await st.wait(1300);
  } },
];
const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));

export default {
  id: 'en075', worldW: 2340, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  order: [1, 5, 6, 7, 9, 12],
  cast: [
    { id: 'pack', kind: 'thing', x: 236, svg: PACK, box: [-12, -28, 24, 30] },
    { id: 'tin', kind: 'thing', x: X.tree, y: FLOOR + 2, svg: TIN(false), box: [-15, -19, 30, 20] },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: 286, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 130, face: 1 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: X.gate + 10, face: -1 },
    { id: 'lucky', kind: 'dog', x: 356, s: 0.85, face: -1 },
  ],
  init(st) {
    st.bag('tom', true);
    st.show('pack', false); st.show('tin', false);
    st.dog('lucky', 'sit');
  },
};
