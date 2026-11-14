/**
 * Bài 87 "It Must Be a Fox!" (đoán chắc chắn / có thể: must / might / could / can't be): trang trại của ông, đi từ trái sang phải:
 * cổng trại → bếp (bếp củi, đồng hồ treo tường, cửa bếp mở ra sân) → sân có vũng bùn (dấu chân nhỏ) → chuồng gà trên cột
 * (ổ trứng: còn 2 quả, 3 chỗ trống) → ruộng, đồi. Mỗi lời đoán hiện trong bong bóng nghĩ: cáo (must be ✔ rồi bị gạch: can't be),
 * chuột / rắn (might be / could be ?). Đêm: hai bạn nấp sau cửa bếp với đèn pin, "cái gì trắng trắng" mờ mờ đi tới chuồng gà;
 * bật đèn thì thấy Kitty, Kitty ngậm quả trứng đi ra.
 * Toạ độ cảnh: rộng 1720, cao 315, sàn y = 282.
 */
import { KIT_CSS, L, sky, cloud, tree, bush, label, thought, sun, room, fence, night, windowBox } from '../kit.js';

const FLOOR = 282;
const W = 1720;
const X = { gate: 130, k0: 260, stove: 330, clock: 470, door: 640, mud0: 790, mud1: 960, coop: 1060, field: 1200 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

// ── Đồ vật ────────────────────────────────────────────────────────────────
const EGG = `<ellipse rx="4.6" ry="6" fill="#FEF3C7" stroke="${L}" stroke-width="0.9"/><ellipse cx="-1.4" cy="-2" rx="1.2" ry="1.8" fill="#fff"/>`;
const HEN = `<g class="e087-hen"><path d="M-14 -16 Q-22 -26 -18 -32 Q-12 -24 -8 -22Z" fill="#B45309" stroke="${L}" stroke-width="0.8"/>
  <ellipse cx="0" cy="-16" rx="15" ry="11" fill="#F8FAFC" stroke="${L}" stroke-width="1"/>
  <g class="e087-wing"><path d="M-8 -18 Q2 -26 8 -16 Q0 -10 -8 -14Z" fill="#E2E8F0" stroke="${L}" stroke-width="0.8"/></g>
  <circle cx="12" cy="-26" r="6.4" fill="#F8FAFC" stroke="${L}" stroke-width="1"/><path d="M10 -33 q2 -4 4 0 q2 -4 4 1 l-2 2Z" fill="#EF4444"/>
  <path d="M18 -26 l5 1.6 l-5 1.6Z" fill="#F59E0B" stroke="${L}" stroke-width="0.5"/><circle cx="13.6" cy="-27" r="1" fill="#1F2937"/><path d="M17 -22 q1 4 -1 5" stroke="#EF4444" stroke-width="2" fill="none"/>
  <path d="M-3 -6 V0 M4 -6 V0" stroke="#F59E0B" stroke-width="1.8"/></g>`;
const FOX = `<path d="M-30 6 Q-48 0 -44 -14 Q-34 -6 -22 -2Z" fill="#EA580C" stroke="${L}" stroke-width="0.9"/><path d="M-44 -14 q-2 -6 4 -6 q-1 4 -4 6Z" fill="#fff"/>
  <ellipse cx="-6" cy="0" rx="22" ry="11" fill="#F97316" stroke="${L}" stroke-width="1"/><path d="M-20 8 V18 M-10 9 V18 M4 9 V18 M12 8 V18" stroke="${L}" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M10 -6 L16 -26 L22 -12 L28 -26 L32 -6 Q36 4 22 10 Q8 4 10 -6Z" fill="#F97316" stroke="${L}" stroke-width="1"/>
  <path d="M14 2 Q22 12 30 2 Q22 8 14 2Z" fill="#fff"/><circle cx="17" cy="-4" r="1.6" fill="#1F2937"/><circle cx="27" cy="-4" r="1.6" fill="#1F2937"/><circle cx="22" cy="6" r="1.8" fill="#1F2937"/>`;
const RAT = `<path d="M-12 2 Q-28 6 -32 -6" stroke="#F9A8D4" stroke-width="2" fill="none"/><ellipse cx="0" cy="-2" rx="14" ry="8" fill="#9CA3AF" stroke="${L}" stroke-width="0.9"/>
  <circle cx="13" cy="-6" r="6" fill="#9CA3AF" stroke="${L}" stroke-width="0.9"/><circle cx="10" cy="-12" r="4" fill="#D1D5DB" stroke="${L}" stroke-width="0.8"/><circle cx="16" cy="-7" r="1.1" fill="#1F2937"/><circle cx="19" cy="-5" r="1.3" fill="#F472B6"/>`;
const SNAKE = `<path d="M-30 6 Q-20 -8 -8 4 Q4 16 14 2 Q20 -8 26 -6" stroke="${L}" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M-30 6 Q-20 -8 -8 4 Q4 16 14 2 Q20 -8 26 -6" stroke="#65A30D" stroke-width="7" fill="none" stroke-linecap="round"/>
  <ellipse cx="28" cy="-7" rx="6" ry="4.6" fill="#65A30D" stroke="${L}" stroke-width="0.9"/><circle cx="30" cy="-9" r="1" fill="#1F2937"/><path d="M33 -6 l5 0 l2 -2 M38 -6 l2 2" stroke="#DC2626" stroke-width="0.9" fill="none"/>`;
/** Dấu chân nhỏ (gốc giữa đệm chân). */
const PRINT = (s = 1, c = '#5B3A1E') => `<g transform="scale(${s})"><ellipse cx="0" cy="1" rx="3" ry="2.4" fill="${c}"/>${[-3.4, -1.1, 1.1, 3.4].map((x, i) => `<circle cx="${x}" cy="${-2.6 - (i === 1 || i === 2 ? 1 : 0)}" r="1.1" fill="${c}"/>`).join('')}</g>`;
const TORCH = `<g transform="rotate(-90) translate(0 2)"><rect x="-2.6" y="-2" width="5.2" height="13" rx="1.6" fill="#2563EB" stroke="${L}" stroke-width="0.7"/><path d="M-3.6 11 H3.6 L4.4 15 H-4.4Z" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/></g>`;
const GLASS = `<g transform="rotate(200)"><path d="M0 -2 V12" stroke="#78350F" stroke-width="2.4" stroke-linecap="round"/><circle cx="0" cy="18" r="7" fill="#E0F2FE" fill-opacity="0.7" stroke="#334155" stroke-width="1.8"/></g>`;
const PROPS = { e087_torch: TORCH, e087_glass: GLASS };
const POSES = {
  e087_bend: { R: [60, 80], L: [20, 10], dy: 16, head: 16 },     // cúi nhìn xuống bùn
  e087_glass: { R: [50, 70], L: [24, -60], dy: 18, head: 18 },   // cầm kính lúp soi dấu chân
  e087_shout: { R: [150, 140], L: [150, 140], head: -8 },
  e087_finger: { R: [100, 150], L: [10, 4], head: 4 },           // giơ ngón tay: không phải đâu
  e087_shh: { R: [40, -150], L: [10, 4], head: 6 },              // ngón tay lên miệng: suỵt
  e087_torch: { R: [80, 86], L: [24, -80], head: 2 },             // chĩa đèn pin
  e087_hide: { R: [30, -110], L: [30, -110], dy: 8, head: 6 },     // nép người
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const NEST = (eggs = 2) => `<ellipse cx="0" cy="0" rx="26" ry="7" fill="#CA8A04" stroke="${L}" stroke-width="0.9"/>
  ${[-14, -5, 4, 13, 22].map((x, i) => (i < eggs ? `<g transform="translate(${x - 4} -6)">${EGG}</g>` : `<g class="e087-gone" style="transition-delay:${(i - eggs) * 0.4}s"><ellipse cx="${x - 4}" cy="-6" rx="4.6" ry="6" fill="none" stroke="#DC2626" stroke-width="1.2" stroke-dasharray="2 1.6"/></g>`)).join('')}`;
function bg() {
  const prints = [[0, 0], [22, -4], [44, 2], [66, -3], [88, 2], [110, -2]].map(([dx, dy], i) => `<g class="e087-pr" style="transition-delay:${i * 0.22}s"><g transform="translate(${X.mud0 + 22 + dx} ${FLOOR + 8 + dy}) rotate(90)">${PRINT(1.2)}</g></g>`).join('');
  return `
  ${sky(0, W, 315, 'e087sky')}
  <g class="e087-sun"><g transform="translate(860 70)">${sun(22)}</g></g>
  ${cloud(120, 64, 0.8, 0)}${cloud(980, 52, 0.9, 2)}${cloud(1500, 70, 0.8, 4)}
  <path d="M0 230 Q300 200 600 226 T1200 220 T${W} 214 V270 H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(40, 236, 0.7)}${tree(1280, 226, 0.8)}${tree(1600, 230, 0.7, '#F59E0B')}
  <!-- cổng trại -->
  <rect x="0" y="268" width="${W}" height="47" fill="#86EFAC" stroke="${L}"/>
  <path d="M0 280 H${X.k0}" stroke="#D6B98A" stroke-width="14"/>
  <g transform="translate(${X.gate} 0)"><rect x="-60" y="${FLOOR - 120}" width="10" height="120" fill="#A16207" stroke="${L}"/><rect x="50" y="${FLOOR - 120}" width="10" height="120" fill="#A16207" stroke="${L}"/>
    <rect x="-70" y="${FLOOR - 136}" width="140" height="24" rx="4" fill="#FEF3C7" stroke="${L}" stroke-width="1.2"/><text x="0" y="${FLOOR - 119}" text-anchor="middle" ${NUN} font-size="13" fill="#9A3412">GRANDPA'S FARM</text></g>
  <!-- bếp (cắt ngang tường) -->
  ${room(X.k0, X.door - X.k0, FLOOR, '#FDE68A', '#C08B5C')}
  <path d="M${X.k0 - 14} 10 L${(X.k0 + X.door) / 2} -30 L${X.door + 14} 10Z" fill="#B91C1C" stroke="${L}"/>
  <rect x="${X.k0 - 6}" y="0" width="12" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  ${windowBox(X.k0 + 40, 70, 90, 76)}
  <!-- bếp củi + nồi -->
  <g transform="translate(${X.stove} ${FLOOR})"><rect x="-40" y="-44" width="80" height="44" rx="4" fill="#A8A29E" stroke="${L}" stroke-width="1.2"/><path d="M-18 -10 Q0 -30 18 -10Z" fill="#F97316" stroke="${L}" stroke-width="0.8"/>
    <path d="M-24 -44 H24 L20 -66 H-20Z" fill="#475569" stroke="${L}"/><path d="M-26 -66 H26" stroke="${L}" stroke-width="2.4" stroke-linecap="round"/></g>
  <rect x="${X.clock + 46}" y="134" width="70" height="8" rx="2" fill="#A16207" stroke="${L}"/>
  ${[0, 1, 2].map((i) => `<path d="M${X.clock + 54 + i * 22} 134 h14 l-2 -14 h-10Z" fill="${['#60A5FA', '#F472B6', '#FDE047'][i]}" stroke="${L}" stroke-width="0.7"/>`).join('')}
  <g transform="translate(${X.clock} 104)"><circle r="20" fill="#fff" stroke="${L}" stroke-width="2"/>${Array.from({ length: 12 }, (_, i) => `<path d="M0 -16 V-13" stroke="${L}" stroke-width="1.3" transform="rotate(${i * 30})"/>`).join('')}
    <g class="e087-hh"><path d="M0 0 V-9" stroke="${L}" stroke-width="2.4" stroke-linecap="round"/></g><g class="e087-mh"><path d="M0 0 V-14" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round"/></g><circle r="2" fill="${L}"/></g>
  <!-- khung cửa bếp -->
  <rect x="${X.door - 8}" y="${FLOOR - 128}" width="16" height="128" fill="#E9D5B5" stroke="${L}"/>
  <rect x="${X.door + 8}" y="${FLOOR - 128}" width="10" height="128" fill="#78350F" stroke="${L}"/>
  <!-- sân: hàng rào, vũng bùn, dấu chân -->
  ${fence(X.door + 30, 120, 262)}${fence(X.coop + 90, 320, 262)}
  <ellipse cx="${(X.mud0 + X.mud1) / 2}" cy="${FLOOR + 8}" rx="${(X.mud1 - X.mud0) / 2}" ry="14" fill="#92400E" stroke="${L}" stroke-width="0.9"/>
  <ellipse cx="${(X.mud0 + X.mud1) / 2 - 20}" cy="${FLOOR + 6}" rx="${(X.mud1 - X.mud0) / 2 - 30}" ry="7" fill="#A16207" opacity="0.6"/>
  ${prints}
  <g class="e087-big"><g transform="translate(${X.mud0 + 100} ${FLOOR + 10}) rotate(90)">${PRINT(2.6, '#3F2410')}</g></g>
  <!-- chuồng gà trên cột, cầu thang dốc -->
  <g transform="translate(${X.coop} 0)">
    <path d="M-40 ${FLOOR} V${FLOOR - 44} M40 ${FLOOR} V${FLOOR - 44}" stroke="#78350F" stroke-width="6"/>
    <path d="M-48 ${FLOOR - 44} L-92 ${FLOOR}" stroke="#A16207" stroke-width="7" stroke-linecap="round"/>${[0, 1, 2, 3].map((i) => `<path d="M${-56 - i * 10} ${FLOOR - 36 + i * 9} l6 4" stroke="#78350F" stroke-width="1.6"/>`).join('')}
    <rect x="-54" y="${FLOOR - 120}" width="108" height="78" fill="#DC2626" stroke="${L}" stroke-width="1.3"/>
    ${[0, 1, 2, 3].map((i) => `<path d="M-54 ${FLOOR - 104 + i * 18} H54" stroke="#B91C1C" stroke-width="1"/>`).join('')}
    <path d="M-66 ${FLOOR - 118} L0 ${FLOOR - 156} L66 ${FLOOR - 118}Z" fill="#78350F" stroke="${L}" stroke-width="1.3"/>
    <rect x="-36" y="${FLOOR - 104}" width="56" height="48" fill="#451A03" stroke="${L}"/>
    <g transform="translate(-6 ${FLOOR - 62})">${NEST(2)}</g>
    <g class="e087-hatch"><rect x="-36" y="${FLOOR - 104}" width="56" height="48" fill="#F59E0B" stroke="${L}"/><path d="M-36 ${FLOOR - 80} H20 M-8 ${FLOOR - 104} V${FLOOR - 56}" stroke="#B45309" stroke-width="1.6"/></g>
    <rect x="28" y="${FLOOR - 82}" width="16" height="22" rx="8" fill="#451A03" stroke="${L}"/></g>
  ${bush(X.coop + 160, FLOOR + 28, 0.7)}`;
}

function fg() {
  const foxIn = `<g transform="scale(1.3) translate(0 2)">${FOX}</g><g class="e087-x"><path d="M-40 -28 L40 28 M40 -28 L-40 28" stroke="#DC2626" stroke-width="6" stroke-linecap="round"/></g>`;
  const ratSnake = `<g transform="translate(-44 0)">${RAT}</g><text x="-44" y="-18" text-anchor="middle" ${NUN} font-size="18" fill="#7C3AED">?</text>
    <text x="-44" y="26" text-anchor="middle" ${NUN} font-size="12" fill="#7C3AED">might be</text>
    <g transform="translate(34 -2)">${SNAKE}</g><text x="36" y="-20" text-anchor="middle" ${NUN} font-size="18" fill="#7C3AED">?</text>
    <text x="38" y="26" text-anchor="middle" ${NUN} font-size="12" fill="#7C3AED">could be</text>
    <path d="M-2 -26 V26" stroke="#CBD5E1" stroke-width="1.4" stroke-dasharray="3 3"/>`;
  const zoom = `<circle r="34" fill="#A16207" stroke="#334155" stroke-width="4"/><g transform="rotate(90)">${PRINT(4.4, '#3F2410')}</g>
    <path d="M24 24 L40 40" stroke="#78350F" stroke-width="7" stroke-linecap="round"/>`;
  const compare = `<rect x="-58" y="-40" width="116" height="80" rx="8" fill="#FEF3C7" stroke="${L}" stroke-width="1.4"/>
    <g transform="translate(-30 -6) rotate(90)">${PRINT(2.2, '#3F2410')}</g><g transform="translate(26 -8) rotate(90)">${PRINT(5.2, '#7C2D12')}</g>
    <text x="-30" y="30" text-anchor="middle" ${NUN} font-size="11" fill="#DC2626">very small</text><text x="26" y="30" text-anchor="middle" ${NUN} font-size="11" fill="#92400E">Lucky</text>`;
  return `
  ${night(X.door, W - X.door, 315, 1300)}
  <rect class="e087-dark" x="${X.k0 - 10}" y="0" width="${X.door - X.k0 + 10}" height="315" fill="#1E1B4B"/>
  <!-- ánh đèn pin từ cửa bếp tới chuồng gà -->
  <path class="e087-beam" d="M${X.door + 6} ${FLOOR - 64} L${X.coop - 70} ${FLOOR - 110} L${X.coop - 50} ${FLOOR + 10}Z" fill="#FEF08A"/>
  <!-- cánh cửa bếp hé mở (hai bạn nấp sau) -->
  <g class="e087-leaf"><path d="M${X.door - 8} ${FLOOR - 126} L${X.door - 44} ${FLOOR - 118} V${FLOOR + 4} L${X.door - 8} ${FLOOR}Z" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
    <path d="M${X.door - 36} ${FLOOR - 100} V${FLOOR - 20}" stroke="#92400E" stroke-width="1.4"/><circle cx="${X.door - 38}" cy="${FLOOR - 60}" r="2.4" fill="#FDE68A"/></g>
  <!-- bong bóng nghĩ -->
  ${thought(820, 110, 150, 100, foxIn, [790, 160], 'e087-th e087-th-fox')}
  ${thought(690, 104, 190, 100, ratSnake, [792, 150], 'e087-th e087-th-rat')}
  <g class="e087-zoom"><path d="M${X.door + 80} 150 L${X.mud0 + 30} ${FLOOR + 6}" stroke="#334155" stroke-width="1.4" stroke-dasharray="4 3"/><g transform="translate(${X.door + 56} 120)">${zoom}</g></g>
  <g class="e087-cmp"><g transform="translate(${X.door + 66} 116)">${compare}</g></g>
  <!-- tiếng hét, tiếng động -->
  <g class="e087-shout">${[[-1, -1], [1, -1], [-1.3, 0.2], [1.3, 0.2]].map(([sx, sy]) => `<path d="M${770 + sx * 34} ${150 + sy * 22} l${sx * 12} ${sy * 8 - 4}" stroke="#DC2626" stroke-width="3.4" stroke-linecap="round"/>`).join('')}</g>
  <g class="e087-noise"><text x="${X.coop - 10}" y="${FLOOR - 170}" text-anchor="middle" ${NUN} font-size="30" fill="#FDE047" stroke="${L}" stroke-width="1">!</text>
    <text x="${X.coop + 20}" y="${FLOOR - 182}" text-anchor="middle" ${NUN} font-size="22" fill="#FDE047" stroke="${L}" stroke-width="1">?</text></g>
  <!-- nhãn -->
  <g class="e087-lb e087-lb-farm">${label(X.gate + 60, 96, "Grandpa's farm", '#16A34A', 15)}</g>
  <g class="e087-lb e087-lb-morning">${label(X.coop - 250, 110, 'one morning', '#CA8A04', 14)}</g>
  <g class="e087-lb e087-lb-missing">${label(X.coop - 6, 92, '3 eggs missing', '#DC2626', 14)}</g>
  <g class="e087-lb e087-lb-prints">${label((X.mud0 + X.mud1) / 2, 238, 'small footprints', '#92400E', 13)}</g>
  <g class="e087-lb e087-lb-must">${label(694, 84, 'must be = sure', '#EA580C', 14)}</g>
  <g class="e087-lb e087-lb-cant">${label(694, 84, "can't be = no", '#DC2626', 14)}</g>
  <g class="e087-lb e087-lb-around">${label(1180, 92, 'no foxes around here', '#15803D', 14)}<path d="M1060 130 Q1180 104 1300 130" stroke="#15803D" stroke-width="3" fill="none" stroke-dasharray="6 5"/></g>
  <g class="e087-lb e087-lb-care">${label(X.mud0 + 120, 120, 'carefully', '#0369A1', 14)}</g>
  <g class="e087-lb e087-lb-night">${label(X.door - 20, 60, 'that night', '#4338CA', 14)}</g>
  <g class="e087-lb e087-lb-mid">${label(X.clock, 60, 'midnight', '#4338CA', 14)}</g>
  <g class="e087-lb e087-lb-white">${label(880, 160, 'something white?', '#475569', 13)}</g>
  <g class="e087-lb e087-lb-kitty">${label(X.coop - 90, 150, 'Kitty!', '#DB2777', 15)}</g>
  <g class="e087-lb e087-lb-psst">${label(X.door - 120, 120, 'psst...', '#64748B', 13)}</g>
  <g class="e087-lb e087-lb-egg">${label(X.door + 120, 196, 'an egg', '#CA8A04', 13)}</g>`;
}

const CSS = `
.e087-lb { opacity: 0; transition: opacity .35s; }
${['farm', 'morning', 'missing', 'prints', 'must', 'cant', 'around', 'care', 'night', 'mid', 'white', 'kitty', 'psst', 'egg'].map((k) => `.st-lb-${k} .e087-lb-${k}`).join(', ')} { opacity: 1; }
.e087-th, .e087-zoom { opacity: 0; transition: opacity .35s; }
.e087-cmp { opacity: 0; transition: opacity .35s; }
.st-th-fox .e087-th-fox, .st-th-rat .e087-th-rat, .st-zoom .e087-zoom, .st-cmp .e087-cmp { opacity: 1; }
.e087-x { opacity: 0; transform: scale(.3); transition: opacity .2s, transform .35s cubic-bezier(.3,1.5,.6,1); } .st-cant .e087-x { opacity: 1; transform: none; }
.e087-sun { transform: translateY(70px); transition: transform 1.6s ease-out, opacity .6s; } .st-morning .e087-sun { transform: none; }
.st-night .e087-sun { opacity: 0; }
.e087-hatch { transform-box: fill-box; transform-origin: 0 0; transition: transform .45s; } .st-hatch .e087-hatch { transform: scaleY(.08); }
.e087-gone { opacity: 0; transition: opacity .3s; } .st-missing .e087-gone { opacity: 1; }
.e087-pr { opacity: 0; transition: opacity .2s; } .st-prints .e087-pr { opacity: 1; }
.e087-big { opacity: 0; transition: opacity .3s; } .st-big .e087-big { opacity: 1; }
.e087-shout { opacity: 0; } .st-shout .e087-shout { animation: e087Shout .3s ease-in-out infinite alternate; }
@keyframes e087Shout { from { opacity: .3; transform: scale(.94); } to { opacity: 1; transform: scale(1.05); } }
.e087-shout { transform-box: view-box; transform-origin: 770px 150px; }
.e087-noise { opacity: 0; transition: opacity .2s; } .st-noise .e087-noise { opacity: 1; animation: e087Shake .1s linear 8 alternate; }
@keyframes e087Shake { from { transform: translateX(-2px); } to { transform: translateX(2px); } }
.st-night .ek-night { opacity: 1; }
.e087-dark { opacity: 0; transition: opacity .8s; } .st-night .e087-dark { opacity: .42; }
.e087-beam { opacity: 0; transition: opacity .25s; } .st-torch .e087-beam { opacity: .4; }
.e087-leaf { opacity: 0; transition: opacity .4s; } .st-leaf .e087-leaf { opacity: 1; }
.e087-mh, .e087-hh { transform-origin: 0 0; transition: transform 1.4s ease-in-out; } .e087-hh { transform: rotate(270deg); } .e087-mh { transform: rotate(0deg); }
.st-midnight .e087-hh { transform: rotate(360deg); } .st-midnight .e087-mh { transform: rotate(720deg); }
.e087-wing { transform-box: fill-box; transform-origin: 0% 100%; } .act-e087-flap .e087-wing { animation: e087Flap .14s linear infinite alternate; }
@keyframes e087Flap { from { transform: rotate(0); } to { transform: rotate(-40deg); } }
.act-e087-flap .e087-hen { animation: e087Hop .2s ease-in-out infinite alternate; } @keyframes e087Hop { to { transform: translateY(-4px); } }
.es-cat.act-e087-ghost svg { filter: blur(2.2px) brightness(1.6); opacity: .75; }
@media (prefers-reduced-motion: reduce) {
  .act-e087-flap .e087-wing, .act-e087-flap .e087-hen { animation-duration: .5s; } .st-shout .e087-shout { animation-duration: .8s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const MOUTH = 37; // miệng mèo cách tâm (đơn vị, s = 1)

const BEATS = [
  { key: ["stayed at Grandpa's farm", 'with Lucky and Kitty'], icon: '🏡', label: "Grandpa's farm", async play(st) {
    st.look(240);
    st.sfx('birds', { vol: 0.5 });
    st.pose('grandpa', 'wave'); st.act('grandpa', 'wave'); st.mood('grandpa', 'joy');
    await Promise.all([
      st.walk('minh', 250, { speed: 125, follow: false }), st.walk('lan', 200, { speed: 125, follow: false }),
      st.walk('lucky', 150, { speed: 125, follow: false }), st.walk('kitty', 106, { speed: 125, follow: false }),
    ]);
    st.act('grandpa', null); st.pose('grandpa', 'open');
    st.set('st-lb-farm'); st.sfx('dog-bark', { vol: 0.6 });
    st.dog('lucky', 'sit'); st.act('lucky', 'wag'); st.mood('lucky', 'joy');
    await st.wait(500);
    st.sfx('meow', { vol: 0.5 }); st.dog('kitty', 'sit');
    st.mood('minh', 'joy'); st.mood('lan', 'joy'); st.pose('minh', 'wave');
    await st.wait(900);
    st.pose('minh', 'stand'); st.pose('grandpa', 'stand');
  } },
  { key: ['One morning', 'three eggs were missing from the chicken house'], icon: '🥚', label: '3 eggs missing', async play(st) {
    // sáng hôm sau: ông ra chuồng gà
    st.set('st-lb-farm', false);
    for (const id of ['minh', 'lan', 'lucky', 'kitty']) st.show(id, false);
    st.place('grandpa', X.door + 30, FLOOR, 1);
    st.look(X.coop - 160, { instant: true });
    st.set('st-morning'); st.set('st-lb-morning'); st.sfx('birds', { vol: 0.5 });
    await st.walk('grandpa', X.coop - 70, { speed: 120, follow: false });
    st.pose('grandpa', 'reach'); st.set('st-hatch'); st.sfx('door-open', { vol: 0.6 });
    st.act('hen', 'e087-flap'); st.sfx('whoosh', { vol: 0.3, rate: 1.6 });
    await st.wait(500);
    st.set('st-missing'); st.set('st-lb-missing');
    for (let i = 0; i < 3; i++) { st.sfx('pop', { vol: 0.5, rate: 1 + i * 0.15 }); await st.wait(400); }
    st.act('hen', null);
    st.pose('grandpa', 'stand'); st.mood('grandpa', 'wow'); st.sfx('buzz-no', { vol: 0.3 });
    await st.wait(700);
  } },
  { key: ['small footprints in the mud'], icon: '🐾', label: 'footprints', async play(st) {
    off(st, 'st-lb-morning', 'st-lb-missing');
    st.look((X.mud0 + X.coop) / 2);
    await st.walk('grandpa', X.mud1 + 10, { speed: 90, follow: false });
    st.face('grandpa', -1); st.pose('grandpa', 'e087_bend');
    st.set('st-prints');
    for (let i = 0; i < 6; i++) { st.sfx('drip', { vol: 0.35, rate: 0.8 + i * 0.05 }); await st.wait(220); }
    st.set('st-lb-prints');
    await st.wait(800);
  } },
  { key: ['It must be a fox'], icon: '🦊', label: 'must be a fox', async play(st) {
    st.set('st-lb-prints', false);
    st.pose('grandpa', 'stand');
    for (const id of ['minh', 'lan', 'lucky']) st.show(id, true);
    st.place('minh', X.door + 10, FLOOR, 1); st.place('lan', X.door - 40, FLOOR, 1); st.place('lucky', X.door - 80, FLOOR, 1);
    st.dog('lucky', 'stand'); st.mood('minh', 'wow'); st.mood('lan', 'happy');
    st.look(790);
    st.sfx('door-open', { vol: 0.5 });
    await Promise.all([
      st.walk('minh', 770, { speed: 170, follow: false }), st.walk('lan', 720, { speed: 140, follow: false }),
      st.walk('lucky', 680, { speed: 140, follow: false }),
    ]);
    st.pose('minh', 'point'); st.mood('minh', 'wow');
    st.set('st-th-fox'); st.set('st-lb-must'); st.sfx('pop', { vol: 0.6 });
    await st.say('minh', 'It must be a fox!', 1500);
  } },
  { key: ['Minh shouted'], icon: '📢', label: 'Minh shouted', async play(st) {
    st.look(790);
    st.pose('minh', 'e087_shout'); st.act('minh', 'jump'); st.mood('minh', 'wow');
    st.set('st-shout'); st.sfx('whistle', { vol: 0.35 });
    await st.wait(500);
    st.act('lucky', 'jump'); st.mood('lucky', 'joy'); st.sfx('dog-bark', { vol: 0.7 });
    st.act('hen', 'e087-flap');
    await st.wait(900);
    st.set('st-shout', false); st.act('minh', null); st.act('lucky', null); st.act('hen', null);
    st.pose('minh', 'stand');
  } },
  { key: ['Grandpa shook his head'], icon: '🙅', label: 'shook his head', async play(st) {
    st.look(840);
    st.pose('grandpa', 'stand'); st.face('grandpa', -1); st.mood('grandpa', 'happy');
    st.act('grandpa', 'no'); st.sfx('buzz-no', { vol: 0.35 });
    await st.wait(1500);
    st.act('grandpa', null);
  } },
  { key: ["It can't be a fox"], icon: '❌', label: "can't be a fox", async play(st) {
    st.set('st-lb-must', false);
    st.look(840);
    st.pose('grandpa', 'e087_finger'); st.talk('grandpa', true);
    await st.wait(300);
    st.set('st-cant'); st.set('st-lb-cant'); st.sfx('buzz-no', { vol: 0.5 });
    st.mood('minh', 'sad');
    await st.wait(1300);
    st.talk('grandpa', false);
  } },
  { key: ['no foxes around here'], icon: '🌄', label: 'around here', async play(st) {
    st.look(1000);
    st.pose('grandpa', 'open'); st.talk('grandpa', true); st.mood('grandpa', 'joy');
    st.set('st-lb-around'); st.sfx('wind', { vol: 0.5 });
    await st.look(1180, { dur: 1600 });
    st.sfx('birds', { vol: 0.4 });
    await st.look(860, { dur: 1400 });
    st.talk('grandpa', false); st.pose('grandpa', 'stand');
  } },
  { key: ['Lan looked at the footprints carefully'], icon: '🔍', label: 'carefully', async play(st) {
    off(st, 'st-lb-around', 'st-th-fox', 'st-cant', 'st-lb-cant');
    st.mood('minh', 'happy');
    st.look(820);
    st.hold('lan', 'e087_glass');
    st.walk('minh', 730, { speed: 100, follow: false });
    await st.walk('lan', X.mud0 + 10, { speed: 100, follow: false });
    st.face('minh', 1);
    st.pose('lan', 'e087_glass'); st.mood('lan', 'wow');
    st.set('st-lb-care'); st.sfx('click', { vol: 0.5 });
    await st.wait(400);
    st.set('st-zoom'); st.sfx('whoosh', { vol: 0.35 });
    await st.wait(1500);
  } },
  { key: ['They are very small'], icon: '🤏', label: 'very small', async play(st) {
    off(st, 'st-lb-care', 'st-zoom');
    st.look(822);
    st.pose('lan', 'point'); st.mood('lan', 'happy');
    await st.walk('lucky', X.mud0 + 40, { speed: 110, follow: false });
    st.set('st-big'); st.sfx('drip', { vol: 0.6, rate: 0.6 });
    await st.walk('lucky', X.mud0 + 120, { speed: 110, follow: false });
    st.set('st-cmp'); st.sfx('pop', { vol: 0.5 });
    st.dog('lucky', 'sit');
    await st.say('lan', 'Very small!', 1300);
  } },
  { key: ['It might be a rat', 'it could be a snake'], icon: '🐀', label: 'rat or snake?', async play(st) {
    st.set('st-cmp', false);
    st.look(780);
    st.pose('lan', 'think'); st.hold('lan', null); st.face('lan', 1);
    st.set('st-th-rat'); st.sfx('pop', { vol: 0.5, rate: 1.8 });
    await st.wait(1400);
    st.sfx('hiss', { vol: 0.6 });
    await st.wait(1300);
    st.mood('minh', 'wow');
    st.pose('lan', 'stand');
  } },
  { key: ['That night', 'hid behind the kitchen door with a torch'], icon: '🔦', label: 'torch', async play(st) {
    off(st, 'st-th-rat', 'st-morning');
    st.set('st-night'); st.set('st-leaf'); st.set('st-lb-night');
    st.show('grandpa', false); st.show('lucky', false); st.show('hen', false);
    st.place('minh', X.door - 160, FLOOR, 1); st.place('lan', X.door - 210, FLOOR, 1);
    st.hold('minh', 'e087_torch'); st.mood('minh', 'happy'); st.mood('lan', 'happy');
    st.look(X.door - 20, { instant: true });
    await st.loop('crickets', async () => {
      await Promise.all([st.walk('minh', X.door - 46, { speed: 90, follow: false }), st.walk('lan', X.door - 92, { speed: 90, follow: false })]);
      st.pose('minh', 'e087_hide'); st.pose('lan', 'e087_hide');
      st.sfx('door-open', { vol: 0.3, rate: 0.7 });
      await st.wait(800);
    }, { vol: 0.5 });
  } },
  { key: ['At midnight', 'they heard a noise'], icon: '🕛', label: 'a noise', async play(st) {
    st.set('st-lb-night', false);
    st.look(X.door - 40);
    st.set('st-lb-mid'); st.set('st-midnight'); st.sfx('tick', { vol: 0.7 });
    await st.wait(1500);
    st.look(X.door + 160, { dur: 700 });
    st.set('st-noise'); st.sfx('bump', { vol: 0.8 }); st.sfx('crunch', { vol: 0.5 });
    st.mood('minh', 'wow'); st.mood('lan', 'wow'); st.act('minh', 'shiver'); st.act('lan', 'shiver');
    await st.wait(1200);
  } },
  { key: ['Something white was walking towards the chicken house'], icon: '👻', label: 'something white', async play(st) {
    off(st, 'st-lb-mid', 'st-noise');
    st.mood('minh', 'wow'); st.mood('lan', 'wow');
    st.show('kitty', true); st.place('kitty', X.door + 120, FLOOR, 1); st.dog('kitty', 'stand');
    st.act('kitty', 'e087-ghost');
    st.look(860);
    st.set('st-lb-white'); st.sfx('whoosh', { vol: 0.25, rate: 0.7 });
    await st.loop('steps', () => st.walk('kitty', X.coop - 110, { speed: 80, follow: false }), { vol: 0.2 });
    st.sfx('whoosh', { vol: 0.25, rate: 0.6 });
    await st.wait(400);
  } },
  { key: ['That must be Kitty'], icon: '🐱', label: 'must be Kitty', async play(st) {
    st.set('st-lb-white', false);
    st.look(860);
    st.pose('minh', 'e087_torch'); st.sfx('click', { vol: 0.8 });
    st.set('st-torch');
    await st.wait(400);
    st.set('st-lb-kitty'); st.mood('kitty', 'wow');
    await st.wait(500);
    await st.look(X.door - 10, { dur: 700 });
    st.pose('lan', 'point'); st.mood('lan', 'joy');
    await st.say('lan', 'That must be Kitty!', 1700);
  } },
  { key: ['Lan whispered'], icon: '🤫', label: 'whispered', async play(st) {
    st.look(X.door - 20);
    st.pose('lan', 'e087_shh'); st.mood('lan', 'happy');
    st.set('st-lb-psst'); st.sfx('wind', { vol: 0.2, rate: 1.4 });
    await st.wait(600);
    st.mood('minh', 'joy'); st.act('minh', 'nod');
    await st.wait(900);
    st.act('minh', null);
  } },
  { key: ['It was'], icon: '✅', label: 'It was!', async play(st) {
    st.set('st-lb-psst', false);
    st.look(880);
    // Kitty lên cầu thang vào chuồng, ra với quả trứng
    await st.walk('kitty', X.coop - 50, { speed: 80, follow: false, y: FLOOR - 44 });
    st.show('kitty', false); st.sfx('crunch', { vol: 0.4 });
    await st.wait(500);
    st.place('kitty', X.coop - 50, FLOOR - 44, -1); st.place('egg', X.coop - 50 - MOUTH * 0.9, FLOOR - 44 - 26, -1);
    st.show('kitty', true); st.show('egg', true);
    st.mood('kitty', 'happy'); st.sfx('meow', { vol: 0.6 });
    st.mood('minh', 'wow'); st.mood('lan', 'joy');
    await st.wait(700);
  } },
  { key: ['Kitty was carrying an egg in her mouth'], icon: '🥚', label: 'an egg!', async play(st) {
    st.set('st-lb-kitty', false);
    st.look(780);
    st.set('st-lb-egg');
    const tx = X.door + 150;
    await Promise.all([
      st.walk('kitty', tx, { speed: 80, follow: false, y: FLOOR }),
      st.walk('egg', tx - MOUTH * 0.9, { speed: 80, follow: false, y: FLOOR - 26 }),
    ]);
    st.pose('minh', 'clap'); st.pose('lan', 'clap'); st.act('lan', 'hop'); st.mood('minh', 'joy');
    st.sfx('giggle', { vol: 0.7 });
    await st.wait(1300);
    st.act('lan', null);
  } },
];

export default {
  id: 'en087', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [1, 3, 6, 10, 11, 17],
  cast: [
    { id: 'hen', kind: 'thing', x: X.coop + 90, svg: HEN, box: [-24, -40, 50, 42], face: -1 },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: 300, s: 0.95, face: -1 },
    { id: 'lucky', kind: 'dog', x: -110, s: 0.8 },
    { id: 'kitty', kind: 'cat', x: -160, s: 0.9 },
    { id: 'egg', kind: 'thing', x: X.coop, svg: `<g transform="translate(0 -6) scale(1.3) rotate(-70)">${EGG}</g>`, box: [-8, -14, 16, 16] },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: -60, s: 1.08 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: -10 },
  ],
  init(st) { st.show('egg', false); },
};
