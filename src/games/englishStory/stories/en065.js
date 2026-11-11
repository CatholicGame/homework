/**
 * Bài 65 "While We Were Sleeping" (quá khứ tiếp diễn + while / when): một đêm bão ở Hà Nội, đi từ trái sang phải:
 * phố ngoài trời (dãy nhà ống, hai cây to, đèn đường) → nhà Minh cắt ngang: phòng Lan (cửa sổ hai cánh) → phòng Minh
 * (Lucky dưới gầm giường, Kitty trong thùng các-tông) → phòng bố mẹ + hành lang (tủ ngăn kéo, đồng hồ, cửa chính)
 * → phố trước nhà (sáng ra: cây đổ, hàng xóm sang giúp).
 * Việc dài (đang ngủ, đang mơ, đang đóng cửa sổ…) diễn trước và kéo dài; việc ngắn (cửa sổ đập, mất điện) chen vào giữa.
 * Toạ độ cảnh: rộng 2500, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, lying, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, label, room, doorway, road, bush, night, sun, thought } from '../kit.js';

const FLOOR = 282;
const X = { lamp1: 150, tree1: 300, tree2: 440, wallL: 520, win: 620, bedLan: 790, door1: 900, bedMinh: 1070, lampM: 1180, box: 1238,
  door2: 1280, bedP: 1400, drawer: 1530, clock: 1600, door: 1704, wallR: 1720, fallen: 2000, nbHouse: 2380, lamp2: 2200 };

Object.assign(CAST, {
  e065_lan_pj: { ...CAST.en_lan_home, shirt: '#DDD6FE', bottom: 'pants', bottomC: '#A78BFA' },
  e065_dad_pj: { ...CAST.en_dad_home, shirt: '#93C5FD', bottomC: '#2563EB' },
  e065_mum_pj: { ...CAST.en_mum_home, shirt: '#FBCFE8', bottomC: '#DB2777' },
});

// ── Đồ vật ─────────────────────────────────────────────────────────────────
/** Đèn pin có luồng sáng dọc theo cẳng tay (+y trong toạ độ đồ cầm). */
const TORCH = `<g class="e065-beam"><path d="M0 8 L-30 130 Q0 140 30 130Z" fill="#FEF08A" opacity="0.5"/></g><rect x="-3.4" y="-6" width="6.8" height="14" rx="2" fill="#334155" stroke="${L}" stroke-width="0.8"/><rect x="-4.6" y="6" width="9.2" height="4" rx="1" fill="#FDE047" stroke="${L}" stroke-width="0.6"/>`;
/** Chổi (cán dọc theo cẳng tay, đầu chổi chạm đất). */
const BROOM = (len) => `<path d="M0 -6 V${len - 14}" stroke="#A16207" stroke-width="3" stroke-linecap="round"/><path d="M-3 ${len - 16} H3 L9 ${len} H-9Z" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/><path d="M-4 ${len - 6} V${len} M0 ${len - 6} V${len} M4 ${len - 6} V${len}" stroke="#CA8A04" stroke-width="0.8"/>`;
/** Cây đổ nằm ngang trên vỉa hè (gốc = giữa thân, chạm đất). */
const FALLEN = `<path d="M-110 -10 Q-60 -20 40 -18 L44 0 Q-60 0 -112 4Z" fill="#92400E" stroke="${L}" stroke-width="1.2"/>
  <path d="M-110 -6 l-8 -6 M-112 4 l-10 2 M-108 0 l-12 -2" stroke="#78350F" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M-40 -12 q-6 -16 6 -26" stroke="#92400E" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="-34" cy="-40" r="14" fill="#16A34A" stroke="${L}"/>
  <circle cx="60" cy="-26" r="30" fill="#22C55E" stroke="${L}"/><circle cx="92" cy="-14" r="20" fill="#16A34A" stroke="${L}"/><circle cx="40" cy="-38" r="20" fill="#4ADE80" stroke="${L}"/><circle cx="78" cy="-46" r="16" fill="#22C55E" stroke="${L}"/>`;

const POSES = {
  e065_close: { R: [150, 168], L: [140, 160], head: -6 },
  e065_look: { R: [40, 110], L: [10, 4], head: -6 },
  e065_torch: { R: [70, 70], L: [10, 4] },
  e065_dig: { R: [60, 120], L: [60, 120], head: 8 },
  e065_check: { R: [80, 84], L: [10, 4], head: 4 },
  e065_sweep: { R: [26, 14], L: [30, -30], head: 8 },
  e065_lift: { R: [40, -60], L: [40, -60], dy: 10 },
  e065_yawn: { R: [150, 250], L: [10, 4], head: -8 },
};
const PROPS = { e065_torch: TORCH, e065_broomK: BROOM(52), e065_broomA: BROOM(88) };

// ── Cảnh ───────────────────────────────────────────────────────────────────
/** Cây to ngoài phố: thân + tán có hai cành như hai cánh tay (gốc ở mặt đất). Gió thì nghiêng, "nhảy múa" thì lắc cả tán. */
const dancer = (x, s = 1) => `<g transform="translate(${x} ${FLOOR - 8}) scale(${s})"><g class="e065-dance" style="transform-origin:0px 0px">
  <path d="M-8 0 Q-6 -50 -4 -80 L6 -80 Q8 -50 10 0Z" fill="#A16207" stroke="${L}"/>
  <g class="e065-armL" style="transform-origin:-2px -70px"><path d="M-2 -70 Q-30 -76 -48 -100" stroke="#A16207" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="-50" cy="-104" r="18" fill="#16A34A" stroke="${L}"/></g>
  <g class="e065-armR" style="transform-origin:4px -74px"><path d="M4 -74 Q32 -80 50 -104" stroke="#A16207" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="52" cy="-108" r="18" fill="#16A34A" stroke="${L}"/></g>
  <circle cx="0" cy="-118" r="32" fill="#22C55E" stroke="${L}"/><circle cx="-16" cy="-134" r="16" fill="#4ADE80" stroke="${L}"/><circle cx="18" cy="-130" r="17" fill="#16A34A" stroke="${L}"/></g></g>`;
/** Dãy nhà ống Hà Nội. */
const tubeHouses = (x0, n) => Array.from({ length: n }, (_, i) => {
  const w = [64, 58, 70, 60, 66][i % 5], h = [130, 156, 118, 146, 136][i % 5], x = x0 + i * 72, top = FLOOR - 10 - h;
  const c = ['#FDE68A', '#FCA5A5', '#A7F3D0', '#BFDBFE', '#FBCFE8'][i % 5];
  return `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${c}" stroke="${L}"/><rect x="${x - 3}" y="${top - 6}" width="${w + 6}" height="8" fill="#B45309" stroke="${L}" stroke-width="0.8"/>
    ${[0, 1, 2].filter((r) => top + 16 + r * 38 < FLOOR - 60).map((r) => `<rect class="e065-lit" x="${x + 10}" y="${top + 16 + r * 38}" width="${w - 20}" height="20" fill="#FEF08A" stroke="${L}" stroke-width="0.8"/><path d="M${x + 6} ${top + 38 + r * 38} H${x + w - 6}" stroke="${L}" stroke-width="1.6"/>`).join('')}
    <rect x="${x + w / 2 - 10}" y="${FLOOR - 46}" width="20" height="36" fill="#78350F" stroke="${L}" stroke-width="0.8"/>`;
}).join('');
const streetLamp = (x) => `<g transform="translate(${x} ${FLOOR - 10})"><rect x="-2.5" y="-130" width="5" height="130" fill="#475569" stroke="${L}" stroke-width="0.7"/>
  <path d="M0 -130 Q0 -142 16 -142" stroke="#475569" stroke-width="4" fill="none"/><path d="M8 -146 H26 L22 -138 H12Z" fill="#334155" stroke="${L}" stroke-width="0.7"/>
  <g class="e065-glow"><circle cx="17" cy="-134" r="22" fill="#FEF08A" opacity="0.45"/><circle cx="17" cy="-137" r="4" fill="#FEF9C3"/></g></g>`;
const rain = (x, w, cls = '') => `<g class="e065-rain ${cls}">${Array.from({ length: Math.floor(w / 15) }, (_, i) => `<path class="e065-drop" style="animation-delay:${(((i * 37) % 10) / 10) * -0.6}s" d="M${x + i * 15 + (i % 3) * 4} ${30 + ((i * 53) % 200)} l-5 14" stroke="#93C5FD" stroke-width="2.2" stroke-linecap="round"/>`).join('')}</g>`;
const stormCloud = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="50" ry="18" fill="#475569" stroke="${L}" stroke-width="0.8"/><ellipse cx="-24" cy="-12" rx="24" ry="16" fill="#64748B" stroke="${L}" stroke-width="0.8"/><ellipse cx="16" cy="-16" rx="28" ry="19" fill="#64748B" stroke="${L}" stroke-width="0.8"/></g>`;
const gusts = (x, w) => `<g class="e065-gusts">${[0, 1, 2, 3].map((i) => `<path class="e065-gust" style="animation-delay:${i * 0.3}s" d="M${x + (i % 2) * 60} ${70 + i * 34} h${w * 0.5} q${w * 0.14} 0 ${w * 0.14} -10 q0 -8 -8 -8" stroke="#E2E8F0" stroke-width="3.6" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
/** Giường (đầu giường bên trái), tâm x, dài len. */
const bed = (x, len, c = '#B45309') => `<g><rect x="${x - len / 2 - 42}" y="${FLOOR - 92}" width="10" height="92" rx="3" fill="${c}" stroke="${L}"/>
  <rect x="${x + len / 2 + 4}" y="${FLOOR - 66}" width="10" height="66" rx="3" fill="${c}" stroke="${L}"/>
  <rect x="${x - len / 2 - 34}" y="${FLOOR - 52}" width="${len + 40}" height="12" rx="3" fill="#F8FAFC" stroke="${L}"/>
  <rect x="${x - len / 2 - 34}" y="${FLOOR - 42}" width="${len + 40}" height="6" fill="${c}" stroke="${L}" stroke-width="0.8"/></g>`;
/** Đồng hồ treo tường (tâm x, y): kim giờ / phút xoay bằng CSS. */
const clock = (x, y) => `<g transform="translate(${x} ${y})"><circle r="20" fill="#fff" stroke="${L}" stroke-width="2"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M0 -16 V-13" stroke="${L}" stroke-width="${i % 3 ? 1 : 2}" transform="rotate(${i * 30})"/>`).join('')}
  <g class="e065-hr"><path d="M0 0 V-10" stroke="${L}" stroke-width="3" stroke-linecap="round"/></g><g class="e065-mn"><path d="M0 0 V-15" stroke="#DC2626" stroke-width="2" stroke-linecap="round"/></g><circle r="2" fill="${L}"/></g>`;

function bg() {
  const nightSky = (x, w) => `<rect x="${x}" y="0" width="${w}" height="${FLOOR}" fill="#7DD3FC"/><rect class="e065-skyN" x="${x}" y="0" width="${w}" height="${FLOOR}" fill="#1E293B"/>`;
  return `
  <!-- Phố ngoài trời bên trái -->
  ${nightSky(0, X.wallL)}
  ${tubeHouses(-10, 5)}
  <g transform="translate(0 0)">${label(150, 108, 'Ha Noi', '#B91C1C', 18)}</g>
  ${road(0, X.wallL, FLOOR)}
  ${streetLamp(X.lamp1)}
  ${dancer(X.tree1, 1)}${dancer(X.tree2, 0.9)}
  <!-- Nhà Minh (cắt ngang) -->
  ${room(X.wallL, X.door1 - X.wallL, FLOOR, '#FCE7F3')}
  ${room(X.door1, X.door2 - X.door1, FLOOR, '#DBEAFE')}
  ${room(X.door2, X.wallR - X.door2, FLOOR, '#FEF3C7')}
  ${doorway(X.door1, FLOOR)}${doorway(X.door2, FLOOR)}
  <rect x="${X.wallL}" y="0" width="14" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  <!-- cửa sổ phòng Lan: nhìn ra phố mưa, hai cánh bản lề hai bên -->
  <rect x="${X.win - 66}" y="74" width="132" height="112" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <rect x="${X.win - 60}" y="80" width="120" height="100" fill="#334155"/>
  <g transform="translate(${X.win - 30} 186) scale(0.55)"><g class="e065-dance" style="transform-origin:0px 0px"><path d="M-6 0 V-90" stroke="#A16207" stroke-width="10"/><circle cy="-112" r="34" fill="#16A34A" stroke="${L}"/></g></g>
  <g transform="translate(${X.win + 34} 186) scale(0.5)"><g class="e065-dance" style="transform-origin:0px 0px"><path d="M-6 0 V-90" stroke="#A16207" stroke-width="10"/><circle cy="-112" r="34" fill="#22C55E" stroke="${L}"/></g></g>
  <g class="e065-rain">${Array.from({ length: 8 }, (_, i) => `<path class="e065-drop" style="animation-delay:${-i * 0.07}s" d="M${X.win - 52 + i * 15} ${90 + (i * 23) % 50} l-4 12" stroke="#93C5FD" stroke-width="2" stroke-linecap="round"/>`).join('')}</g>
  <g class="e065-paneL" style="transform-origin:${X.win - 60}px 130px"><rect x="${X.win - 60}" y="80" width="60" height="100" fill="#BAE6FD" fill-opacity="0.35" stroke="#fff" stroke-width="4"/></g>
  <g class="e065-paneR" style="transform-origin:${X.win + 60}px 130px"><rect x="${X.win}" y="80" width="60" height="100" fill="#BAE6FD" fill-opacity="0.35" stroke="#fff" stroke-width="4"/></g>
  <g class="e065-curtain" style="transform-origin:${X.win + 70}px 74px"><path d="M${X.win + 66} 72 H${X.win + 84} Q${X.win + 80} 130 ${X.win + 88} 190 H${X.win + 70} Q${X.win + 64} 130 ${X.win + 66} 72Z" fill="#F472B6" stroke="${L}"/></g>
  ${bed(X.bedLan, 96, '#DB2777')}
  <g class="e065-sl e065-sl-lan">${lying(X.bedLan, FLOOR - 50, 'e065_lan_pj', { len: 96, blanket: '#F9A8D4' })}</g>
  <!-- phòng Minh: poster bóng đá, giường, đèn ngủ -->
  <rect x="960" y="70" width="64" height="48" rx="3" fill="#fff" stroke="${L}"/><rect x="964" y="74" width="56" height="40" fill="#86EFAC"/><circle cx="992" cy="96" r="9" fill="#fff" stroke="${L}"/><path d="M992 92 l3 2 -1 3.4 h-4 l-1 -3.4Z" fill="#1F2937"/>
  ${bed(X.bedMinh, 96, '#2563EB')}
  <g class="e065-sl e065-sl-minh">${lying(X.bedMinh, FLOOR - 50, 'en_minh_pj', { len: 96, blanket: '#93C5FD' })}</g>
  <g class="e065-sl e065-sl-minhW">${lying(X.bedMinh, FLOOR - 50, 'en_minh_pj', { len: 96, blanket: '#93C5FD', mood: 'wow' })}</g>
  <g transform="translate(${X.lampM} ${FLOOR})"><rect x="-18" y="-44" width="36" height="44" rx="3" fill="#A16207" stroke="${L}"/><path d="M-12 -24 H12" stroke="${L}" stroke-width="0.8"/>
    <path d="M0 -44 V-62" stroke="#475569" stroke-width="2.4"/><path d="M-12 -60 H12 L8 -76 H-8Z" fill="#FDE68A" stroke="${L}"/>
    <g class="e065-glow"><circle cx="0" cy="-66" r="30" fill="#FEF08A" opacity="0.4"/></g></g>
  <!-- phòng bố mẹ + hành lang: giường đôi, tủ ngăn kéo, đồng hồ, cửa chính -->
  ${bed(X.bedP, 120, '#92400E')}
  <g class="e065-sl e065-sl-mum">${lying(X.bedP + 16, FLOOR - 62, 'e065_mum_pj', { len: 110, blanket: '#FBCFE8', s: 0.92 })}</g>
  <g class="e065-sl e065-sl-dad">${lying(X.bedP, FLOOR - 46, 'e065_dad_pj', { len: 120, blanket: '#93C5FD', s: 0.95 })}</g>
  <g transform="translate(${X.drawer} ${FLOOR})"><rect x="-34" y="-64" width="68" height="64" rx="3" fill="#B45309" stroke="${L}"/>
    <rect x="-28" y="-38" width="56" height="16" rx="2" fill="#D97706" stroke="${L}" stroke-width="0.8"/><circle cy="-30" r="2" fill="#FDE68A"/>
    <rect x="-28" y="-18" width="56" height="14" rx="2" fill="#D97706" stroke="${L}" stroke-width="0.8"/><circle cy="-11" r="2" fill="#FDE68A"/>
    <rect x="-28" y="-58" width="56" height="16" rx="2" fill="#451A03" stroke="${L}" stroke-width="0.8"/>
    <g class="e065-drw"><rect x="-30" y="-58" width="60" height="16" rx="2" fill="#D97706" stroke="${L}" stroke-width="0.8"/><circle cy="-50" r="2" fill="#FDE68A"/></g></g>
  ${clock(X.clock, 78)}
  <g class="e065-lb e065-lb-four">${label(X.clock, 128, 'nearly 4:00', '#1D4ED8', 15)}</g>
  <rect x="${X.wallR - 16}" y="0" width="16" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  <rect x="${X.door - 30}" y="${FLOOR - 120}" width="46" height="120" fill="#1E293B" stroke="${L}"/>
  <g class="e065-fdoor" style="transform-origin:${X.door - 30}px 0px"><rect x="${X.door - 30}" y="${FLOOR - 120}" width="46" height="120" fill="#92400E" stroke="${L}" stroke-width="1.2"/><circle cx="${X.door + 6}" cy="${FLOOR - 58}" r="3" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/></g>
  <!-- Phố trước nhà -->
  ${nightSky(X.wallR, 2500 - X.wallR)}
  <g class="e065-sun" transform="translate(2300 64)">${sun(24)}</g>
  <g transform="translate(${X.nbHouse} 0)"><path d="M-120 120 L0 70 L120 120Z" fill="#60A5FA" stroke="${L}" stroke-width="1.2"/><rect x="-110" y="120" width="220" height="${FLOOR - 130}" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/>
    <rect class="e065-lit" x="-84" y="146" width="40" height="34" fill="#FEF08A" stroke="${L}"/><rect class="e065-lit" x="44" y="146" width="40" height="34" fill="#FEF08A" stroke="${L}"/><rect x="-18" y="${FLOOR - 82}" width="36" height="72" fill="#92400E" stroke="${L}"/></g>
  ${road(X.wallR, 2500 - X.wallR, FLOOR)}
  ${streetLamp(X.lamp2)}
  <g class="e065-tstand">${dancer(X.fallen + 40, 0.95)}</g>
  <g class="e065-leaves">${Array.from({ length: 14 }, (_, i) => `<ellipse cx="${1780 + i * 26 + (i % 3) * 7}" cy="${FLOOR - 4 + (i % 2) * 3}" rx="5" ry="2.4" fill="${['#22C55E', '#16A34A', '#A3E635'][i % 3]}" stroke="${L}" stroke-width="0.4" transform="rotate(${(i * 47) % 60 - 30} ${1780 + i * 26} ${FLOOR - 4})"/>`).join('')}</g>
  <g class="e065-lb e065-lb-tree">${label(X.fallen, 150, 'a fallen tree', '#15803D', 16)}</g>
  <g class="e065-lb e065-lb-help">${label(2160, 120, 'help!', '#DB2777', 16)}</g>
`;
}

function fg() {
  const dream = `<g transform="translate(-6 6)"><rect x="-58" y="10" width="116" height="14" rx="4" fill="#86EFAC"/>
    <g transform="translate(40 8)"><path d="M-14 0 V-26 H14 V0" stroke="#475569" stroke-width="4.4" fill="none"/><path d="M-14 0 V-26 H14 V0" stroke="#fff" stroke-width="2.6" fill="none"/><path d="M-12 -24 L12 -2 M12 -24 L-12 -2" stroke="#CBD5E1" stroke-width="0.6"/></g>
    <g transform="translate(-36 -2)">${headOnly('en_minh_home', { s: 0.7, mood: 'joy' })}</g>
    <g class="e065-dball"><circle r="6" fill="#fff" stroke="${L}"/><path d="M0 -2 l2 1.4 -0.8 2.2 h-2.4 l-0.8 -2.2Z" fill="#1F2937"/></g></g>`;
  const dark = `<rect class="e065-dark" x="${X.wallL}" y="0" width="${X.wallR - X.wallL}" height="315" fill="#0F172A"/>`;
  const thunder = (x) => `<g class="e065-bolt"><rect x="${x - 260}" y="0" width="520" height="315" fill="#F8FAFC" opacity="0.5"/><path d="M${x} 20 L${x - 18} 70 H${x - 4} L${x - 22} 120 L${x + 16} 60 H${x + 2} L${x + 14} 20Z" fill="#FDE047" stroke="#F59E0B" stroke-width="1.2"/></g>`;
  return `
  <!-- thùng các-tông (che thân Kitty) -->
  <g transform="translate(${X.box} ${FLOOR})"><g class="e065-boxf"><path d="M-24 -30 L-34 -40 L-22 -40Z M24 -30 L34 -40 L22 -40Z" fill="#D4A373" stroke="${L}" stroke-width="0.8"/><rect x="-24" y="-30" width="48" height="30" fill="#E0B07A" stroke="${L}"/><path d="M-10 -18 H10" stroke="${L}" stroke-width="0.8"/></g></g>
  <!-- thành giường Minh (Lucky nằm khuất dưới) -->
  <rect x="${X.bedMinh - 82}" y="${FLOOR - 42}" width="136" height="6" fill="#2563EB" stroke="${L}" stroke-width="0.8"/>
  ${rain(0, X.wallL)}${rain(X.wallR, 2500 - X.wallR)}
  <g class="e065-storm">${stormCloud(120, 40, 1.1)}${stormCloud(330, 30, 1.3)}${stormCloud(480, 54, 0.9)}</g>
  <g class="e065-storm">${stormCloud(1860, 36, 1.2)}${stormCloud(2100, 28, 1.3)}${stormCloud(2340, 46, 1)}</g>
  ${gusts(40, 420)}
  ${thunder(300)}
  ${night(0, X.wallL, 315, 470)}${night(X.wallR, 2500 - X.wallR, 315, 2420)}
  ${dark}
  <!-- giấc mơ của Minh -->
  ${thought(X.bedMinh + 50, 118, 150, 90, dream, [X.bedMinh - 40, 196], 'e065-dream')}`;
}

const CSS = `
.e065-lb { opacity: 0; transition: opacity .35s; }
.st-lb-four .e065-lb-four, .st-lb-tree .e065-lb-tree, .st-lb-help .e065-lb-help { opacity: 1; }
.st-night .ek-night { opacity: 1; }
.e065-skyN { opacity: 0; transition: opacity .8s; } .st-night .e065-skyN { opacity: 1; }
.e065-sun { opacity: 0; transition: opacity .8s; } .st-morning .e065-sun { opacity: 1; }
.e065-dark { opacity: 0; transition: opacity .6s; } .st-night .e065-dark { opacity: .22; } .st-night.st-out .e065-dark { opacity: .38; }
.e065-lit { transition: fill .4s; } .st-out .e065-lit { fill: #475569; } .st-morning .e065-lit { fill: #BAE6FD; }
.e065-glow { transition: opacity .2s; } .st-out .e065-glow, .st-morning .e065-glow { opacity: 0; }
/* bão: mây đen kéo tới, chớp, mưa, gió */
.e065-storm { opacity: 0; transform: translateX(-160px); transition: opacity .9s, transform 1.6s ease-out; }
.st-storm .e065-storm { opacity: 1; transform: none; }
.e065-bolt { opacity: 0; }
.st-flash .e065-bolt { animation: e065Flash .7s ease-out; }
@keyframes e065Flash { 0%, 30% { opacity: 1; } 15%, 100% { opacity: 0; } 45% { opacity: .8; } }
.e065-rain { opacity: 0; transition: opacity .6s; } .st-rain .e065-rain { opacity: 1; }
.e065-drop { animation: e065Drop .5s linear infinite; }
@keyframes e065Drop { from { transform: translate(4px, -26px); opacity: 0; } 20% { opacity: 1; } to { transform: translate(-10px, 34px); opacity: 0; } }
.e065-gusts { opacity: 0; transition: opacity .4s; } .st-wind .e065-gusts { opacity: 1; }
.e065-gust { animation: e065Gust 1s ease-in-out infinite; }
@keyframes e065Gust { from { transform: translateX(-40px); opacity: 0; } 40% { opacity: .9; } to { transform: translateX(60px); opacity: 0; } }
.e065-dance { transition: transform .6s; }
.st-wind .e065-dance { animation: e065Wind .8s ease-in-out infinite alternate; }
@keyframes e065Wind { from { transform: rotate(4deg); } to { transform: rotate(13deg); } }
.st-dance .e065-dance { animation: e065Dance 1.1s ease-in-out infinite alternate; }
@keyframes e065Dance { from { transform: rotate(-12deg) scaleY(1.04); } to { transform: rotate(12deg) scaleY(.96); } }
.st-dance .e065-armL { animation: e065ArmL .55s ease-in-out infinite alternate; }
.st-dance .e065-armR { animation: e065ArmL .55s ease-in-out infinite alternate-reverse; }
@keyframes e065ArmL { from { transform: rotate(-22deg); } to { transform: rotate(16deg); } }
/* cửa sổ: rung khi gió, đập sầm, mở toang, đóng lại */
.e065-paneL, .e065-paneR { transition: transform .5s cubic-bezier(.4,0,.2,1); }
.st-wind .e065-paneL { animation: e065Rattle .18s linear infinite alternate; }
@keyframes e065Rattle { from { transform: scaleX(1); } to { transform: scaleX(.93); } }
.st-bang .e065-paneL, .st-bang .e065-paneR { animation: e065Bang .32s ease-in 4 alternate; }
@keyframes e065Bang { from { transform: scaleX(1); } to { transform: scaleX(.18); } }
.st-winOpen .e065-paneL, .st-winOpen .e065-paneR { transform: scaleX(.18); }
.st-winOpen.st-wind .e065-paneL { animation: none; }
.e065-curtain { transition: transform .5s; }
.st-winOpen .e065-curtain { animation: e065Flap .4s ease-in-out infinite alternate; }
@keyframes e065Flap { from { transform: rotate(-3deg); } to { transform: rotate(-12deg); } }
/* người nằm ngủ ↔ thức dậy */
.e065-sl { transition: opacity .3s; }
.e065-sl-minhW { opacity: 0; } .st-out .e065-sl-minhW { opacity: 1; } .st-out .e065-sl-minh { opacity: 0; }
.st-lanUp .e065-sl-lan, .st-dadUp .e065-sl-dad, .st-mumUp .e065-sl-mum, .st-minhUp .e065-sl-minh, .st-minhUp .e065-sl-minhW { opacity: 0; }
/* giấc mơ: Minh sút bóng vào gôn */
.e065-dream { opacity: 0; transform: scale(.4); transform-origin: ${X.bedMinh - 30}px 190px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-dream .e065-dream { opacity: 1; transform: scale(1); }
.st-dream .e065-dball { animation: e065Kick 1.3s ease-in infinite; }
@keyframes e065Kick { 0%, 20% { transform: translate(-24px, 14px); } 70%, 100% { transform: translate(40px, -4px); } }
/* đồng hồ */
.e065-hr { transform: rotate(62deg); transition: transform 2s ease-in-out; } .e065-mn { transform: rotate(10deg); transition: transform 2s ease-in-out; }
.st-four .e065-hr { transform: rotate(117deg); } .st-four .e065-mn { transform: rotate(330deg); }
/* tủ ngăn kéo, cửa chính, cây đổ, lá rụng */
.e065-drw { transition: transform .35s; } .st-drawer .e065-drw { transform: translate(0, 10px); }
.e065-fdoor { transition: transform .5s; } .st-fdoor .e065-fdoor { transform: scaleX(.15); }
.st-fallen .e065-tstand { display: none; }
.e065-leaves { opacity: 0; transition: opacity 2.6s; } .st-fallen .e065-leaves { opacity: 1; } .st-fallen.st-swept .e065-leaves { opacity: 0; }
.es-ac.act-e065-on .pp-upwR { animation: e065Sweep 1.4s ease-in-out infinite alternate; }
.es-ac.act-e065-sweep .pp-upwR { animation: e065Sweep .7s ease-in-out infinite alternate; }
@keyframes e065Sweep { from { transform: rotate(-20deg); } to { transform: rotate(16deg); } }
.es-ac.act-e065-dig .pp-fowR { animation: e065Dig .25s ease-in-out infinite alternate; }
.es-ac.act-e065-dig .pp-fowL { animation: e065Dig .25s ease-in-out infinite alternate-reverse; }
@keyframes e065Dig { from { transform: rotate(-16deg); } to { transform: rotate(16deg); } }
.es-cat.act-e065-scared .dg-bob { animation: e065Scared .09s linear infinite alternate; }
@keyframes e065Scared { from { transform: translateX(-1px); } to { transform: translateX(1px); } }
.st-boxShake .e065-boxf { animation: e065Box .1s linear 8 alternate; transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes e065Box { from { transform: rotate(-3deg); } to { transform: rotate(3deg); } }
.es-dog.act-e065-bark .dg-head { animation: e065Bark .2s ease-in-out infinite alternate; }
@keyframes e065Bark { from { transform: rotate(-4deg); } to { transform: rotate(8deg); } }
.e065-tree .e065-tsw { transform-origin: 0 0; }
@media (prefers-reduced-motion: reduce) {
  .e065-drop { animation-duration: 1.1s; }
  .e065-gust { animation-duration: 2s; }
  .st-wind .e065-dance { animation-duration: 1.8s; }
  .st-dance .e065-dance { animation-duration: 2.2s; }
  .st-dance .e065-armL, .st-dance .e065-armR { animation-duration: 1.2s; }
  .st-wind .e065-paneL { animation-duration: .5s; }
  .st-bang .e065-paneL, .st-bang .e065-paneR { animation-duration: .6s; }
  .st-winOpen .e065-curtain { animation-duration: 1s; }
  .st-dream .e065-dball { animation-duration: 2.4s; }
  .es-ac.act-e065-sweep .pp-upwR, .es-ac.act-e065-on .pp-upwR { animation-duration: 1.6s; }
  .es-ac.act-e065-dig .pp-fowR, .es-ac.act-e065-dig .pp-fowL { animation-duration: .6s; }
  .es-cat.act-e065-scared .dg-bob { animation-duration: .3s; }
  .st-boxShake .e065-boxf { animation-duration: .3s; }
  .es-dog.act-e065-bark .dg-head { animation-duration: .45s; }
}
`;

const BEATS = [
  { key: ['a big storm came to Ha Noi'], icon: '⛈️', label: 'a big storm', async play(st) {
    st.look(290, { dur: 600 });
    st.sfx('wind', { vol: 0.6 });
    st.set('st-storm');
    await st.wait(1300);
    st.set('st-flash'); st.sfx('bump', { vol: 1, rate: 0.5 });
    await st.wait(700);
    st.set('st-flash', false);
    st.set('st-rain'); st.sfx('rain', { vol: 0.9 });
    await st.wait(1200);
    st.set('st-flash'); st.sfx('bump', { vol: 0.8, rate: 0.45 });
    await st.wait(700);
    st.set('st-flash', false);
  } },
  { key: ['While we were sleeping', 'the wind started to blow'], icon: '💨', label: 'the wind', async play(st) {
    await st.look(640, { dur: 1100 });
    st.fx('zzz', X.bedLan - 60, 200);
    await st.wait(900);
    st.set('st-wind'); st.sfx('wind', { vol: 1 });
    await st.wait(1300);
    st.fx('zzz', X.bedLan - 60, 200, { quiet: true });
    st.sfx('rain', { vol: 0.5 });
    await st.wait(900);
  } },
  { key: ['Lan woke up', 'a window banged'], icon: '🪟', label: 'a window banged', async play(st) {
    st.look(700, { dur: 500 });
    st.set('st-bang');
    for (let i = 0; i < 2; i++) { st.sfx('bump', { vol: 0.9, rate: 1.2 }); await st.wait(640); }
    st.set('st-bang', false); st.set('st-winOpen'); st.sfx('window-open', { vol: 0.7 });
    await st.wait(300);
    st.set('st-lanUp'); st.show('lan', true); st.mood('lan', 'wow'); st.pose('lan', 'open');
    st.fx('poof', X.bedLan + 30, 220, { quiet: true }); st.sfx('pop', { vol: 0.5 });
    await st.wait(1100);
  } },
  { key: ['While she was closing it', 'she saw the trees in the street'], icon: '🌳', label: 'closing the window', async play(st) {
    st.mood('lan', 'happy');
    await st.walk('lan', X.win + 18, { speed: 130, lead: -60 });
    st.face('lan', 1); st.pose('lan', 'e065_close');
    st.set('st-winOpen', false); st.sfx('window-open', { vol: 0.6, rate: 0.8 });
    await st.wait(600);
    st.sfx('click', { vol: 0.7 });
    st.look(X.wallL - 10, { dur: 900 });
    st.face('lan', -1); st.pose('lan', 'point'); st.mood('lan', 'wow');
    await st.wait(1200);
  } },
  { key: ['moving like dancers in the rain'], icon: '💃', label: 'like dancers', async play(st) {
    st.set('st-wind', false); st.set('st-dance');
    st.sfx('wind', { vol: 0.8 }); st.sfx('rain', { vol: 0.7 });
    st.pose('lan', 'clap'); st.mood('lan', 'joy');
    await st.wait(1600);
    st.sfx('whoosh', { vol: 0.5 });
    await st.wait(1300);
  } },
  { key: ['dreaming about football', 'the lights went out'], icon: '⚽', label: 'the lights went out', async play(st) {
    st.set('st-dance', false); st.set('st-wind');
    st.pose('lan', 'stand'); st.mood('lan', 'happy');
    await st.look(X.bedMinh + 20, { dur: 1100 });
    st.set('st-dream'); st.sfx('pop', { vol: 0.4 }); st.fx('zzz', X.bedMinh - 70, 200, { quiet: true });
    await st.wait(500);
    st.sfx('kick', { vol: 0.6 }); await st.wait(1300);
    st.sfx('kick', { vol: 0.6 }); st.sfx('cheer', { vol: 0.25 }); await st.wait(900);
    st.set('st-out'); st.sfx('click', { vol: 0.9 });
    st.set('st-dream', false); st.fx('poof', X.bedMinh + 50, 118, { quiet: true });
    await st.wait(1000);
  } },
  { key: ['Lucky was barking under the bed', 'Kitty was hiding in a box'], icon: '🐶', label: 'barking, hiding', async play(st) {
    st.look(X.bedMinh + 80, { dur: 600 });
    st.mood('lucky', 'joy'); st.act('lucky', 'e065-bark'); st.sfx('dog-bark');
    await st.say('lucky', 'Woof! Woof!', 1100);
    st.sfx('dog-bark', { vol: 0.8 });
    await st.wait(600);
    st.act('lucky', null); st.mood('lucky', 'happy');
    st.set('st-boxShake'); st.sfx('box-shake', { vol: 0.8 });
    st.act('kitty', 'e065-scared');
    await st.wait(700);
    st.set('st-boxShake', false); st.sfx('meow', { vol: 0.5 });
    await st.wait(1100);
  } },
  { key: ['Dad got up and checked the doors', 'Mum was looking for a torch'], icon: '🔦', label: 'checked, looking', async play(st) {
    st.act('kitty', null);
    st.look(X.drawer + 20, { dur: 900 });
    st.set('st-dadUp'); st.set('st-mumUp'); st.sfx('pop', { vol: 0.4 });
    st.show('dad', true); st.show('mum', true); st.pose('dad', 'e065_yawn'); st.mood('dad', 'shut'); st.mood('mum', 'happy');
    await st.wait(600);
    st.pose('dad', 'stand'); st.mood('dad', 'happy');
    const dad = (async () => {
      await st.walk('dad', X.door - 40, { speed: 130, follow: false });
      st.face('dad', 1); st.pose('dad', 'e065_check');
      st.sfx('click', { vol: 0.8 }); await st.wait(500);
      st.sfx('knock', { vol: 0.4 }); await st.wait(600);
      st.act('dad', 'nod');
    })();
    await st.walk('mum', X.drawer - 22, { speed: 120, follow: false });
    st.face('mum', 1); st.set('st-drawer'); st.sfx('wardrobe-open', { vol: 0.7 });
    st.pose('mum', 'e065_dig'); st.act('mum', 'e065-dig');
    await st.wait(1300);
    st.act('mum', null); st.set('st-drawer', false);
    st.hold('mum', 'e065_torch'); st.pose('mum', 'e065_torch'); st.act('mum', 'e065-on'); st.mood('mum', 'joy'); st.sfx('click', { vol: 0.8 });
    await dad;
    await st.wait(700);
    st.act('dad', null);
  } },
  { key: ['When the storm stopped', "nearly four o'clock"], icon: '🕓', label: 'nearly four', async play(st) {
    st.look(X.clock + 30, { dur: 700 });
    st.set('st-wind', false); st.set('st-rain', false); st.set('st-storm', false);
    st.sfx('drip', { vol: 0.6 });
    st.pose('dad', 'stand'); st.face('dad', -1);
    await st.wait(900);
    st.set('st-four'); st.sfx('tick', { vol: 0.8 });
    st.pose('mum', 'e065_torch');
    await st.wait(1400);
    st.set('st-lb-four'); st.sfx('ding', { vol: 0.4 });
    st.pose('dad', 'e065_yawn'); st.mood('dad', 'shut'); st.mood('mum', 'shut');
    await st.wait(1300);
  } },
  { key: ['In the morning', 'a fallen tree in front of our house'], icon: '🌅', label: 'a fallen tree', async play(st) {
    st.set('st-lb-four', false);
    st.act('mum', null); st.hold('mum', null); st.pose('mum', 'stand'); st.pose('dad', 'stand'); st.mood('dad', 'happy'); st.mood('mum', 'happy');
    st.set('st-night', false); st.set('st-out', false); st.set('st-morning'); st.set('st-fallen'); st.show('tree', true);
    st.sfx('birds', { vol: 0.7 });
    st.place('lan', X.door - 150, FLOOR, 1); st.place('minh', X.door - 110, FLOOR, 1); st.show('minh', true); st.set('st-minhUp');
    await st.wait(500);
    st.face('dad', 1); st.set('st-fdoor'); st.sfx('door-open', { vol: 0.8 });
    await st.wait(300);
    st.look(X.fallen - 80, { dur: 1600 });
    await Promise.all([
      st.walk('dad', X.fallen - 170, { speed: 130, follow: false }),
      st.walk('mum', X.fallen - 230, { speed: 130, follow: false }),
      st.walk('minh', X.fallen - 120, { speed: 130, follow: false }),
      st.walk('lan', X.fallen - 290, { speed: 130, follow: false }),
    ]);
    st.pose('minh', 'point'); st.mood('minh', 'wow'); st.mood('lan', 'wow'); st.mood('mum', 'wow');
    st.set('st-lb-tree'); st.sfx('pop', { vol: 0.5 });
    await st.wait(1200);
  } },
  { key: ['cleaning the street', 'our neighbours came out to help us'], icon: '🧹', label: 'neighbours help', async play(st) {
    st.set('st-lb-tree', false); st.pose('minh', 'stand');
    for (const id of ['minh', 'lan', 'mum']) st.mood(id, 'happy');
    st.hold('mum', 'e065_broomA'); st.pose('mum', 'e065_sweep'); st.act('mum', 'e065-sweep');
    st.hold('lan', 'e065_broomK'); st.pose('lan', 'e065_sweep'); st.act('lan', 'e065-sweep');
    st.set('st-swept');
    st.look(X.fallen + 40, { dur: 1200 });
    const sweep = st.loop('sweep', () => st.wait(5600), { vol: 0.6 });
    st.sfx('door-open', { vol: 0.5 });
    await Promise.all([
      st.walk('nb1', X.fallen + 122, { speed: 130, follow: false }),
      st.walk('nb2', X.fallen + 300, { speed: 120, follow: false }),
      st.walk('dad', X.fallen - 106, { speed: 120, follow: false }),
      st.walk('minh', X.fallen - 40, { speed: 120, follow: false }),
    ]);
    st.face('dad', 1); st.face('minh', 1);
    st.set('st-lb-help'); st.mood('nb1', 'joy'); st.pose('nb2', 'wave'); st.sfx('giggle', { vol: 0.5 });
    await st.wait(600);
    st.set('st-lb-help', false);
    st.hold('nb2', 'e065_broomA'); st.pose('nb2', 'e065_sweep'); st.act('nb2', 'e065-sweep');
    st.pose('dad', 'e065_lift'); st.pose('nb1', 'e065_lift'); st.pose('minh', 'e065_lift');
    await st.wait(400);
    st.sfx('roll', { vol: 0.6 });
    await Promise.all([
      st.walk('tree', X.fallen + 130, { speed: 70, follow: false, y: FLOOR - 6 }),
      st.walk('dad', X.fallen + 24, { speed: 70, follow: false, after: 'e065_lift' }),
      st.walk('minh', X.fallen + 90, { speed: 70, follow: false, after: 'e065_lift' }),
      st.walk('nb1', X.fallen + 252, { speed: 70, follow: false, after: 'e065_lift' }),
    ]);
    st.face('nb1', -1);
    st.walk('tree', X.fallen + 130, { y: FLOOR, speed: 40, follow: false });
    st.sfx('bump', { vol: 0.5, rate: 0.8 });
    for (const id of ['dad', 'minh', 'nb1']) { st.pose(id, 'cheer'); st.mood(id, 'joy'); }
    st.act('minh', 'jump'); st.sfx('cheer', { vol: 0.6 });
    await sweep;
    st.act('mum', null); st.act('lan', null); st.act('nb2', null);
  } },
];

export default {
  id: 'en065', worldW: 2500, floor: FLOOR, viewTop: 30, camStart: 40, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'kitty', kind: 'cat', x: X.box + 2, y: FLOOR - 8, s: 0.62, face: -1 },
    { id: 'lucky', kind: 'dog', x: X.bedMinh + 6, s: 0.44, face: 1 },
    { id: 'tree', kind: 'thing', x: X.fallen, svg: FALLEN, box: [-124, -70, 248, 76] },
    { id: 'nb1', kind: 'adult', who: 'chu', x: X.nbHouse + 20, s: 0.95, face: -1 },
    { id: 'nb2', kind: 'adult', who: 'hangXom', x: X.nbHouse + 80, s: 0.92, face: -1 },
    { id: 'mum', kind: 'adult', who: 'e065_mum_pj', x: X.bedP - 90, s: 0.95 },
    { id: 'dad', kind: 'adult', who: 'e065_dad_pj', x: X.bedP + 96, s: 0.95 },
    { id: 'minh', kind: 'kid', who: 'en_minh_pj', x: X.bedMinh + 70 },
    { id: 'lan', kind: 'kid', who: 'e065_lan_pj', x: X.bedLan + 80, s: 1.08, face: -1 },
  ],
  init(st) {
    st.set('st-night');
    st.dog('kitty', 'sit'); st.dog('lucky', 'stand');
    for (const id of ['lan', 'minh', 'dad', 'mum', 'tree']) st.show(id, false);
  },
};
