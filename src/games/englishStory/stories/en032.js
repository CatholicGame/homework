/**
 * Bài 32 "Tet Holiday": chợ hoa → nhà Minh (lịch tháng, dọn nhà, bữa tối giao thừa) → sân trước nhà (băng rôn, đèn lồng,
 * pháo hoa lúc nửa đêm) → nhà ông bà (gói bánh chưng, đồng hồ 10 giờ, lì xì) → nhà Tom (khay mứt kẹo, tối mệt mà vui).
 * Đêm = lớp màu tối phủ lên cảnh (ở fg); pháo hoa, trăng, nhãn chữ vẽ sau lớp tối nên vẫn sáng.
 * Toạ độ cảnh: rộng 2900, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, room, doorway, windowBox, rug, label, fence } from '../kit.js';

const FLOOR = 282;
const W = 2900;
const F = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e032_minh: { hair: 'spiky', top: 'shirt', shirt: '#DC2626', bottom: 'pants', bottomC: '#1F2937', shoe: '#1C1917' },
  e032_lan: { hair: 'ponytail', top: 'dress', shirt: '#EF4444', bottom: 'skirt', bottomC: '#EF4444', shoe: '#FACC15' },
  e032_seller: { adult: true, hair: 'bun', top: 'blouse', shirt: '#FDE68A', bottom: 'pants', bottomC: '#57534E', shoe: '#78716C' },
});

// ── Đồ vật ────────────────────────────────────────────────────────────────
const blossom = (x, y, r = 3.2, c = '#F9A8D4') => `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map((a) => `<circle cx="0" cy="${-r * 0.8}" r="${r * 0.7}" fill="${c}" transform="rotate(${a})"/>`).join('')}<circle r="${r * 0.4}" fill="#DB2777"/></g>`;
/** Cành đào (gốc ở chân cành). */
const PEACH = (s = 1) => `<g transform="scale(${s})"><path d="M0 0 Q-4 -30 2 -60 M1 -34 Q14 -46 18 -62 M-2 -22 Q-16 -34 -20 -50" stroke="#78350F" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  ${[[2, -60], [18, -62], [-20, -50], [-8, -44], [10, -48], [-14, -36], [6, -30], [14, -54], [-2, -52], [-18, -58]].map(([x, y]) => blossom(x, y)).join('')}</g>`;
const ENVELOPE = `<rect x="-7" y="-10" width="14" height="20" rx="1.5" fill="#DC2626" stroke="${L}" stroke-width="0.9"/><path d="M-7 -10 L0 -3 L7 -10" stroke="#FACC15" stroke-width="1.2" fill="none"/><circle cx="0" cy="3" r="3" fill="#FACC15"/>`;
const CANDY = `<ellipse rx="5" ry="3.6" fill="#F472B6" stroke="${L}" stroke-width="0.7"/><path d="M-5 0 l-4 -3 v6Z M5 0 l4 -3 v6Z" fill="#F472B6" stroke="${L}" stroke-width="0.6"/>`;
/** Bánh chưng: khối vuông xanh, lạt buộc. */
const CAKE = (s = 1) => `<g transform="scale(${s})"><rect x="-14" y="-14" width="28" height="28" rx="2" fill="#16A34A" stroke="${L}" stroke-width="1"/><path d="M-14 -14 L14 14 M14 -14 L-14 14" stroke="#15803D" stroke-width="0.8" opacity="0.6"/>
  <path d="M-5 -14 V14 M5 -14 V14 M-14 -5 H14 M-14 5 H14" stroke="#FDE68A" stroke-width="1.4"/></g>`;
const lantern = (x, y, d = 0) => `<g transform="translate(${x} ${y})"><path d="M0 0 V10" stroke="${L}" stroke-width="1"/><g class="e032-lan" style="animation-delay:${d}s">
  <ellipse cx="0" cy="24" rx="14" ry="16" fill="#DC2626" stroke="${L}"/><path d="M0 8 Q-8 24 0 40 M0 8 Q8 24 0 40" stroke="#FACC15" stroke-width="1" fill="none"/>
  <rect x="-6" y="6" width="12" height="4" fill="#FACC15" stroke="${L}" stroke-width="0.6"/><rect x="-6" y="38" width="12" height="4" fill="#FACC15" stroke="${L}" stroke-width="0.6"/><path d="M-3 42 V52 M0 42 V54 M3 42 V52" stroke="#FACC15" stroke-width="1.2"/></g></g>`;
const chairBack = (x) => `<path d="M${x - 16} 238 V176 Q${x - 16} 168 ${x - 8} 168 H${x + 8} Q${x + 16} 168 ${x + 16} 176 V238" fill="#B45309" stroke="${L}" stroke-width="1.1"/>`;
const clockFace = (x, y, h, txt) => `<g transform="translate(${x} ${y})"><circle r="22" fill="#fff" stroke="#B45309" stroke-width="3"/>${[0, 90, 180, 270].map((r) => `<path d="M0 -18 V-14" stroke="${L}" stroke-width="1.6" transform="rotate(${r})"/>`).join('')}
  <path d="M0 0 V-15" stroke="${L}" stroke-width="1.8" stroke-linecap="round"/><path d="M0 0 V-10" stroke="${L}" stroke-width="2.8" stroke-linecap="round" transform="rotate(${h * 30})"/><circle r="2" fill="${L}"/>
  <text x="0" y="38" text-anchor="middle" ${F} font-size="10" fill="#475569">${txt}</text></g>`;
/** Pháo hoa: vòng tia toả ra (gốc giữa). */
const burst = (x, y, c, d, r = 30) => `<g transform="translate(${x} ${y})"><g class="e032-burst" style="animation-delay:${d}s">${Array.from({ length: 12 }, (_, i) => `<path d="M0 ${-r * 0.35} V${-r}" stroke="${c}" stroke-width="3" stroke-linecap="round" transform="rotate(${i * 30})"/>`).join('')}
  ${Array.from({ length: 12 }, (_, i) => `<circle cy="${-r - 5}" r="2.2" fill="#FEF08A" transform="rotate(${i * 30 + 15})"/>`).join('')}</g></g>`;

function bg() {
  return `
  ${sky(0, W, 315, 'e032sky')}
  ${cloud(160, 50, 0.9, 0)}${cloud(620, 60, 0.8, 3)}${cloud(1560, 44, 0.8, 2)}${cloud(2330, 56, 0.7, 4)}
  <rect x="0" y="${FLOOR - 4}" width="${W}" height="${319 - FLOOR}" fill="#D6D3D1" stroke="${L}"/>
  <!-- Chợ hoa -->
  <path d="M0 236 Q150 214 300 232 T600 228 T720 232 V282 H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <rect x="160" y="18" width="200" height="30" rx="8" fill="#DC2626" stroke="${L}"/><text x="260" y="40" text-anchor="middle" ${F} font-size="18" fill="#FACC15">FLOWER MARKET</text>
  ${[120, 330].map((x, i) => `<g transform="translate(${x} 0)"><path d="M-80 120 L-70 92 H70 L80 120Z" fill="${i ? '#F472B6' : '#22C55E'}" stroke="${L}"/>${[-60, -30, 0, 30, 60].map((dx) => `<path d="M${dx - 10} 120 q10 12 20 0" fill="#fff" stroke="${L}" stroke-width="0.8"/>`).join('')}
    <path d="M-72 120 V282 M72 120 V282" stroke="#A16207" stroke-width="4"/></g>`).join('')}
  ${[66, 92, 118, 144, 170].map((x, i) => `<g transform="translate(${x} 218)"><path d="M-8 0 L-6 14 H6 L8 0Z" fill="#B45309" stroke="${L}" stroke-width="0.8"/>${blossom(-2, -6, 4, i % 2 ? '#FACC15' : '#F87171')}${blossom(4, -12, 4, '#FB923C')}</g>`).join('')}
  ${[270, 300, 330, 360, 390].map((x, i) => `<g transform="translate(${x} 214)"><path d="M-9 0 L-7 18 H7 L9 0Z" fill="#3B82F6" stroke="${L}" stroke-width="0.8"/><g transform="translate(0 2)">${PEACH(0.55 + (i % 2) * 0.1)}</g></g>`).join('')}
  <g transform="translate(610 282)"><path d="M0 0 V-60" stroke="#78350F" stroke-width="5"/><g transform="translate(0 -40)">${PEACH(1.3)}</g></g>
  <!-- Nhà Minh -->
  ${room(720, 700, FLOOR, '#FEF9C3', '#D9A066')}
  ${doorway(722, FLOOR)}
  <g class="e032-dirt">${[[780, 40], [1010, 160], [1380, 60], [880, 190], [1130, 140]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="6" fill="#A8A29E" opacity="0.6"/>`).join('')}
    <path d="M1420 12 L1380 12 Q1400 30 1420 52 M1420 12 L1392 40 M1404 12 Q1410 24 1420 30" stroke="#78716C" stroke-width="1" fill="none"/>
    <path d="M722 12 L760 12 Q742 30 722 50 M722 12 L750 40" stroke="#78716C" stroke-width="1" fill="none"/></g>
  <!-- Lịch -->
  <g transform="translate(830 46)"><rect x="-46" y="0" width="92" height="96" rx="5" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="-46" y="0" width="92" height="20" rx="5" fill="#DC2626" stroke="${L}" stroke-width="1.4"/>
    <circle cx="-22" cy="0" r="3" fill="#1F2937"/><circle cx="22" cy="0" r="3" fill="#1F2937"/>
    <g class="e032-pg e032-jan"><text x="0" y="46" text-anchor="middle" ${F} font-size="13" fill="#1D4ED8">JANUARY</text><path d="M-36 58 H36 M-36 70 H36 M-36 82 H36" stroke="#CBD5E1" stroke-width="2"/></g>
    <g class="e032-pg e032-feb"><text x="0" y="46" text-anchor="middle" ${F} font-size="12" fill="#DB2777">FEBRUARY</text><path d="M-36 58 H36 M-36 70 H36 M-36 82 H36" stroke="#CBD5E1" stroke-width="2"/></g>
    <g class="e032-pg e032-lunar"><rect x="-44" y="20" width="88" height="74" fill="#FEE2E2"/><text x="-4" y="78" text-anchor="middle" ${F} font-size="46" fill="#DC2626">1</text>
      <path d="M28 34 a10 10 0 1 0 6 18 a8 8 0 1 1 -6 -18Z" fill="#FACC15" stroke="${L}" stroke-width="0.8"/></g></g>
  <g class="e032-pop e032-lb-lunar">${label(830, 172, 'lunar year', '#DC2626', 14)}</g>
  <g class="e032-pop e032-lb-month">${label(830, 172, 'Jan / Feb', '#1D4ED8', 14)}</g>
  ${windowBox(930, 60, 100, 80)}
  <!-- Tủ + bình hoa -->
  <rect x="1040" y="226" width="70" height="56" rx="3" fill="#92400E" stroke="${L}"/><rect x="1046" y="236" width="58" height="36" rx="2" fill="#78350F"/>
  <path d="M1066 226 L1062 204 H1088 L1084 226Z" fill="#60A5FA" stroke="${L}"/>
  <g class="e032-vase"><g transform="translate(1075 206)">${PEACH(1)}</g></g>
  <!-- Bàn ăn: ghế phía sau -->
  ${[1196, 1256, 1316].map(chairBack).join('')}
  <!-- Sân trước nhà: băng rôn, đèn lồng, cờ -->
  <rect x="1420" y="0" width="22" height="104" fill="#E9D5B5" stroke="${L}"/><rect x="1420" y="104" width="6" height="178" fill="#C08B5C" stroke="${L}" stroke-width="0.8"/>
  ${fence(1450, 220, FLOOR)}
  <path d="M1450 60 V282" stroke="#78716C" stroke-width="3"/><g class="ek-flag" style="transform-origin:1450px 72px"><rect x="1450" y="60" width="40" height="26" fill="#DA251D" stroke="${L}" stroke-width="0.6"/><path d="M1470 65 l2.6 7.2 h7.6 l-6.1 4.5 l2.4 7.3 l-6.5 -4.6 l-6.5 4.6 l2.4 -7.3 l-6.1 -4.5 h7.6Z" fill="#FFFF00" transform="translate(1470 73) scale(0.7) translate(-1470 -73)"/></g>
  <g class="e032-pop e032-lb-vn">${label(1478, 108, 'VIETNAM', '#DA251D', 12)}</g>
  <path d="M1520 82 V282 M1660 82 V282" stroke="#B45309" stroke-width="6"/>
  <rect x="1508" y="66" width="164" height="26" rx="5" fill="#DC2626" stroke="${L}"/><text x="1590" y="85" text-anchor="middle" ${F} font-size="14" fill="#FACC15">HAPPY NEW YEAR</text>
  ${lantern(1530, 92, 0)}${lantern(1650, 92, 0.6)}
  <!-- Nhà ông bà -->
  ${room(1690, 600, FLOOR, '#FFEDD5', '#C08B5C')}
  ${doorway(1692, FLOOR)}
  ${clockFace(1770, 70, 10, "10 o'clock")}
  <g class="e032-clockglow"><circle cx="1770" cy="70" r="30" fill="none" stroke="#FACC15" stroke-width="4"/></g>
  ${windowBox(1870, 54, 90, 70)}
  <!-- Bếp: nồi bánh chưng -->
  <g transform="translate(2210 0)"><path d="M-30 282 V256 H30 V282" fill="#57534E" stroke="${L}"/><g class="e032-fire">${[-14, 0, 14].map((x) => `<path d="M${x - 6} 258 q6 -16 6 -22 q6 10 6 22Z" fill="#F97316" stroke="#DC2626" stroke-width="0.8"/>`).join('')}</g>
    <path d="M-34 210 H34 V250 Q34 256 28 256 H-28 Q-34 256 -34 250Z" fill="#64748B" stroke="${L}"/><ellipse cx="0" cy="210" rx="34" ry="6" fill="#94A3B8" stroke="${L}"/>
    ${[-14, 0, 14].map((x, i) => `<path class="ek-steam" style="animation-delay:${i * 0.5}s" d="M${x} 200 q-5 -8 0 -16 q5 -8 0 -16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <!-- Giữa hai nhà -->
  ${fence(2296, 90, FLOOR)}
  <!-- Nhà Tom -->
  ${room(2400, 500, FLOOR, '#E0F2FE', '#D9A066')}
  ${doorway(2402, FLOOR)}
  ${windowBox(2470, 60, 100, 80)}
  <g class="e032-afsun"><circle cx="2548" cy="120" r="12" fill="#FB923C" stroke="#F59E0B" stroke-width="2"/></g>
  ${lantern(2700, 12, 0.3)}${lantern(2820, 12, 0.9)}
  <rect x="2480" y="208" width="130" height="40" rx="10" fill="#A78BFA" stroke="${L}" stroke-width="1.2"/><rect x="2480" y="180" width="130" height="34" rx="10" fill="#8B5CF6" stroke="${L}" stroke-width="1.2"/>
  <path d="M2490 248 V262 M2600 248 V262" stroke="${L}" stroke-width="4"/>
  ${rug(2680, FLOOR, 160, '#FECACA')}`;
}

/** Lớp trước: quầy chợ, bàn ăn, bàn gói bánh, bàn mứt; lớp tối ban đêm; pháo hoa, trăng, nhãn. */
function fg() {
  const food = `<g class="e032-food">
    <g transform="translate(1210 230)"><ellipse rx="20" ry="5" fill="#fff" stroke="${L}"/><ellipse cy="-6" rx="13" ry="8" fill="#F59E0B" stroke="${L}"/></g>
    <g transform="translate(1286 221)">${CAKE(0.6)}</g>
    <g transform="translate(1312 230)"><ellipse rx="18" ry="5" fill="#fff" stroke="${L}"/><path d="M-12 -2 Q0 -18 12 -2Z" fill="#DC2626" stroke="${L}"/></g>
    <g transform="translate(1356 228)"><path d="M-9 -10 H9 L6 4 H-6Z" fill="#fff" stroke="${L}"/><path d="M-6 -10 q3 -6 6 0 q3 -6 6 0" stroke="#fff" stroke-width="2" class="ek-steam"/></g></g>`;
  return `
  <!-- Quầy chợ hoa -->
  <rect x="250" y="230" width="160" height="52" rx="3" fill="#F9A8D4" stroke="${L}" stroke-width="1.2"/><rect x="244" y="224" width="172" height="9" rx="3" fill="#DB2777" stroke="${L}"/>
  <rect x="50" y="230" width="140" height="52" rx="3" fill="#86EFAC" stroke="${L}" stroke-width="1.2"/><rect x="44" y="224" width="152" height="9" rx="3" fill="#16A34A" stroke="${L}"/>
  <!-- Bàn ăn -->
  <rect x="1168" y="240" width="10" height="42" fill="#92400E" stroke="${L}"/><rect x="1370" y="240" width="10" height="42" fill="#92400E" stroke="${L}"/>
  <rect x="1160" y="232" width="228" height="10" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="1166" y="242" width="216" height="14" fill="#DC2626" stroke="${L}" stroke-width="0.8"/>
  ${food}
  <!-- Bàn gói bánh chưng -->
  <rect x="1990" y="236" width="10" height="46" fill="#92400E" stroke="${L}"/><rect x="2120" y="236" width="10" height="46" fill="#92400E" stroke="${L}"/>
  <rect x="1980" y="228" width="160" height="10" rx="3" fill="#A16207" stroke="${L}" stroke-width="1.2"/>
  <g transform="translate(2010 226)"><path d="M-18 0 Q0 -10 18 0 Q0 4 -18 0Z" fill="#22C55E" stroke="${L}" stroke-width="0.8"/></g>
  <g class="e032-newcake"><g transform="translate(2066 212)">${CAKE(1)}</g></g>
  <g transform="translate(2112 216)">${CAKE(0.8)}</g>
  <!-- Bàn mứt nhà Tom -->
  <rect x="2620" y="246" width="8" height="36" fill="#92400E" stroke="${L}"/><rect x="2732" y="246" width="8" height="36" fill="#92400E" stroke="${L}"/>
  <rect x="2610" y="238" width="140" height="9" rx="3" fill="#DC2626" stroke="${L}" stroke-width="1.2"/>
  <g transform="translate(2680 236)"><path d="M-30 0 L-26 -10 H26 L30 0Z" fill="#B91C1C" stroke="${L}" stroke-width="0.9"/>
    <g class="e032-sweets">${[[-18, -13, '#F472B6'], [-8, -14, '#FACC15'], [2, -13, '#22C55E'], [12, -14, '#FB923C'], [20, -12, '#A855F7']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="4" fill="${c}" stroke="${L}" stroke-width="0.6"/>`).join('')}</g></g>
  <!-- Đêm -->
  <rect class="e032-dark" x="0" y="0" width="${W}" height="315" fill="#1E1B4B"/>
  <g class="e032-stars">${Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 173) % W}" cy="${50 + ((i * 37) % 70)}" r="1.4" fill="#FEF9C3"/>`).join('')}
    <path d="M1700 54 a16 16 0 1 0 10 28 a12 12 0 1 1 -10 -28Z" fill="#FEF08A" stroke="#FACC15"/></g>
  <g class="e032-fw">${burst(1500, 80, '#F472B6', 0)}${burst(1600, 60, '#FACC15', 0.5, 36)}${burst(1690, 96, '#38BDF8', 1, 28)}${burst(1560, 120, '#4ADE80', 1.4, 24)}
    <g class="e032-pop e032-lb-mid">${label(1440, 64, '12:00', '#7C3AED', 16)}</g></g>
  <g class="e032-pop e032-lb-tired">${label(2660, 120, 'tired but happy', '#7C3AED', 13)}</g>
  <g class="e032-pop e032-love"><g transform="translate(2600 110)"><path d="M0 22 C-34 0 -24 -26 0 -12 C24 -26 34 0 0 22Z" fill="#EF4444" stroke="${L}" stroke-width="1.4"/><text x="0" y="6" text-anchor="middle" ${F} font-size="14" fill="#fff">TET</text></g></g>
  <g class="e032-pop e032-lb-eve">${label(1270, 104, "New Year's Eve", '#DC2626', 14)}</g>`;
}

const CSS = `
.e032-pop { opacity: 0; transform: scale(.6); transform-box: fill-box; transform-origin: center; transition: opacity .35s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-lb-vn .e032-lb-vn, .st-lb-month .e032-lb-month, .st-lb-lunar .e032-lb-lunar, .st-lb-mid .e032-lb-mid, .st-lb-tired .e032-lb-tired,
.st-love .e032-love, .st-lb-eve .e032-lb-eve { opacity: 1; transform: none; }
.e032-lan { transform-origin: 0 0; animation: e032Lan 2s ease-in-out infinite alternate; }
@keyframes e032Lan { from { transform: rotate(-5deg); } to { transform: rotate(5deg); } }
.st-tet .e032-lan ellipse { filter: drop-shadow(0 0 6px #FDE047); }
.e032-pg { opacity: 0; } .e032-jan { opacity: 1; }
.st-feb .e032-jan { opacity: 0; } .st-feb .e032-feb { opacity: 1; }
.st-lunar .e032-jan, .st-lunar .e032-feb { opacity: 0; } .st-lunar .e032-lunar { opacity: 1; }
.e032-pg { transition: opacity .3s; }
.e032-dirt { transition: opacity 1.4s; } .st-clean .e032-dirt { opacity: 0; }
.e032-vase { opacity: 0; transition: opacity .3s; } .st-vase .e032-vase { opacity: 1; }
.e032-newcake { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: center; transition: opacity .3s, transform .6s cubic-bezier(.3,1.6,.6,1); }
.st-cake .e032-newcake { opacity: 1; transform: none; }
.e032-food { opacity: 0; transition: opacity .4s; } .st-dinner .e032-food { opacity: 1; }
.e032-dark { opacity: 0; transition: opacity 1.2s; pointer-events: none; }
.st-eve .e032-dark { opacity: .22; } .st-night .e032-dark { opacity: .6; } .st-night2 .e032-dark { opacity: .5; }
.e032-stars { opacity: 0; transition: opacity 1.2s; } .st-night .e032-stars, .st-night2 .e032-stars { opacity: 1; }
.e032-fw { opacity: 0; transition: opacity .3s; } .st-fw .e032-fw { opacity: 1; }
.e032-burst { transform: scale(0); opacity: 0; } .st-fw .e032-burst { animation: e032Burst 1.8s ease-out infinite; }
@keyframes e032Burst { 0% { transform: scale(.1); opacity: 1; } 60% { opacity: 1; } 100% { transform: scale(1.15); opacity: 0; } }
.e032-clockglow { opacity: 0; transition: opacity .4s; } .st-ten .e032-clockglow { opacity: 1; animation: e032Pulse .5s ease-in-out infinite alternate; }
@keyframes e032Pulse { from { opacity: .35; } to { opacity: 1; } }
.e032-sweets { transition: opacity .6s; } .st-ate .e032-sweets circle:nth-child(odd) { opacity: 0; }
.e032-afsun { opacity: 0; transition: opacity .6s; } .st-after .e032-afsun { opacity: 1; }
.e032-fire { animation: e032Fire .25s ease-in-out infinite alternate; transform-origin: 0 258px; }
@keyframes e032Fire { to { transform: scaleY(1.15); } }
@media (prefers-reduced-motion: reduce) { .e032-lan { animation-duration: 4s; } .st-fw .e032-burst { animation-duration: 3s; } }
`;

const POSES = {
  e032_sweep: { R: [26, 0], L: [34, -30], head: 8 },
  e032_eat: { R: [118, 248], L: [40, 110] },
  e032_yawn: { R: [150, 250], L: [168, 182], head: -6 },
};
const PROPS = {
  e032_broom: `<g transform="rotate(-10)"><path d="M0 -10 V62" stroke="${L}" stroke-width="3.6" stroke-linecap="round"/><path d="M0 -10 V62" stroke="#D6A35C" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M-10 78 L-4 60 H4 L10 78Z" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/><path d="M-6 76 L-2 62 M0 77 V62 M6 76 L2 62" stroke="#CA8A04" stroke-width="0.7"/></g>`,
  e032_cloth: `<g transform="translate(0 -4)"><path d="M-7 -6 H7 L8 7 H-8Z" fill="#38BDF8" stroke="${L}" stroke-width="0.8"/></g>`,
  e032_peach: `<g transform="rotate(180)">${PEACH(0.8)}</g>`,
  e032_env: `<g transform="translate(0 -6)">${ENVELOPE}</g>`,
  e032_candy: `<g transform="translate(0 -6)">${CANDY}</g>`,
};

const face = (st, id, dir) => { const A = st.a(id); A.face = dir; A.el.classList.toggle('is-left', dir < 0); };
const FAM = ['dad', 'mum', 'minh', 'lan'];

const BEATS = [
  { key: ['big holiday', 'in Vietnam'], icon: '🧧', label: 'big holiday', async play(st) {
    st.look(1440);
    st.set('st-tet'); st.set('st-lb-vn');
    st.fx('sparkle', 1590, 80);
    st.pose('minh', 'cheer'); st.mood('minh', 'joy'); st.pose('lan', 'cheer'); st.mood('lan', 'joy');
    await st.wait(1200);
    st.fx('sparkle', 1530, 120); st.fx('sparkle', 1650, 120);
    await st.wait(1100);
    st.pose('minh', 'stand'); st.pose('lan', 'stand'); st.mood('minh', 'happy'); st.mood('lan', 'happy');
    st.set('st-lb-vn', false);
  } },
  { key: ['January or February'], icon: '📅', label: 'January or February', async play(st) {
    st.look(960, { dur: 1200 });
    await Promise.all([
      st.walk('lan', 890, { speed: 170, follow: false }),
      st.walk('minh', 980, { speed: 170, follow: false }),
      st.walk('mum', 1150, { speed: 150, follow: false }),
    ]);
    face(st, 'lan', -1); face(st, 'mum', -1);
    st.pose('lan', 'pointUp'); st.act('lan', 'point');
    st.set('st-lb-month');
    await st.wait(1200);
    st.set('st-feb'); st.sfx('page-turn');
    await st.wait(1300);
    st.act('lan', null);
  } },
  { key: ['first day of the lunar year'], icon: '🌙', label: 'lunar year', async play(st) {
    st.look(960);
    st.set('st-lb-month', false);
    st.set('st-lunar'); st.sfx('page-turn');
    st.fx('sparkle', 830, 90);
    st.set('st-lb-lunar');
    await st.wait(2200);
    st.pose('lan', 'stand');
  } },
  { key: ['cleans the house'], icon: '🧹', label: 'cleans the house', async play(st) {
    st.set('st-lb-lunar', false);
    st.look(1010);
    await st.walk('lan', 790, { speed: 120, follow: false });
    face(st, 'lan', -1);
    st.hold('mum', 'e032_broom'); st.pose('mum', 'e032_sweep'); st.act('mum', 'stir');
    st.hold('minh', 'e032_cloth'); st.pose('minh', 'reach'); st.act('minh', 'wave');
    st.hold('lan', 'e032_cloth'); st.pose('lan', 'raise'); st.act('lan', 'wave');
    st.sfx('swish');
    st.fx('poof', 1130, 270); st.fx('poof', 1010, 150);
    st.set('st-clean');
    await st.wait(1300);
    st.fx('poof', 790, 60, { quiet: true });
    await st.wait(1100);
    ['mum', 'minh', 'lan'].forEach((k) => { st.act(k, null); st.hold(k, null); st.pose(k, 'stand'); st.mood(k, 'joy'); });
    st.fx('sparkle', 1000, 120);
    await st.wait(300);
    ['mum', 'minh', 'lan'].forEach((k) => st.mood(k, 'happy'));
  } },
  { key: ['buys flowers', 'at the market'], icon: '🌸', label: 'buys flowers', async play(st) {
    await st.walk('mum', 446, { speed: 160, lead: -40 });
    st.pose('seller', 'give'); st.mood('seller', 'joy');
    await st.wait(500);
    st.pose('mum', 'give');
    await st.fly(`<g transform="translate(0 20)">${PEACH(0.7)}</g>`, [350, 196], [430, 196], { size: 50, dur: 500 });
    st.hold('mum', 'e032_peach'); st.pose('mum', 'stand'); st.mood('mum', 'joy');
    st.pose('seller', 'stand');
    st.fx('sparkle', 440, 140);
    await st.wait(700);
    st.mood('mum', 'happy'); st.mood('seller', 'happy');
  } },
  { key: ['banh chung', 'square rice cake'], icon: '🟩', label: 'banh chung', async play(st) {
    await st.look(2050, { dur: 1500 });
    st.pose('grandma', 'stir'); st.act('grandma', 'dig'); st.mood('grandma', 'joy');
    await st.wait(1100);
    st.act('grandma', null); st.pose('grandma', 'give');
    st.set('st-cake'); st.sfx('pop');
    st.fx('sparkle', 2066, 200);
    await st.wait(900);
    st.pose('grandma', 'stand'); st.mood('grandma', 'happy');
  } },
  { key: ["New Year's Eve", 'big dinner'], icon: '🍗', label: 'big dinner', async play(st) {
    st.look(1180, { dur: 1400 });
    st.set('st-eve'); st.set('st-lb-eve');
    await Promise.all([
      (async () => {
        await st.walk('mum', 1075, { speed: 260, follow: false });
        st.hold('mum', null); st.set('st-vase'); st.fx('sparkle', 1075, 170, { quiet: true });
        await st.walk('mum', 1196, { speed: 150, follow: false });
      })(),
      st.walk('dad', 1316, { speed: 150, follow: false }),
      st.walk('minh', 1256, { speed: 150, follow: false }),
      st.walk('lan', 1356, { speed: 150, follow: false }),
    ]);
    st.look(1260);
    FAM.forEach((k) => st.pose(k, 'sit'));
    st.set('st-dinner'); st.sfx('bowl-down');
    await st.wait(500);
    st.hold('minh', 'chopsticks'); st.pose('minh', 'eat'); st.act('minh', 'eat');
    FAM.forEach((k) => st.mood(k, 'joy'));
    await st.wait(1500);
    st.act('minh', null); st.hold('minh', null); st.pose('minh', 'sit');
    FAM.forEach((k) => st.mood(k, 'happy'));
    st.set('st-lb-eve', false);
  } },
  { key: ['At midnight', 'watches the fireworks'], icon: '🎆', label: 'fireworks', async play(st) {
    st.set('st-eve', false); st.set('st-night');
    FAM.forEach((k) => st.pose(k, 'stand'));
    await Promise.all([
      st.walk('dad', 1600, { speed: 150, follow: false }),
      st.walk('mum', 1470, { speed: 150, follow: false }),
      st.walk('minh', 1530, { speed: 150, lead: 30 }),
      st.walk('lan', 1660, { speed: 150, follow: false }),
    ]);
    st.set('st-fw'); st.set('st-lb-mid'); st.sfx('zap');
    FAM.forEach((k) => { st.pose(k, 'pointUp'); st.mood(k, 'wow'); });
    await st.wait(900);
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy'); st.mood('lan', 'joy');
    await st.wait(1500);
    st.act('minh', null);
  } },
  { key: ['wear new clothes'], icon: '👕', label: 'new clothes', async play(st) {
    st.set('st-fw', false); st.set('st-lb-mid', false); st.set('st-night', false);
    st.look(1560);
    FAM.forEach((k) => { st.pose(k, 'stand'); st.mood(k, 'happy'); });
    await st.wait(700);
    await st.dress('minh', 'e032_minh');
    await st.dress('lan', 'e032_lan');
    st.pose('minh', 'cheer'); st.pose('lan', 'cheer'); st.act('lan', 'dance'); st.mood('minh', 'joy'); st.mood('lan', 'joy');
    st.fx('sparkle', 1530, 160); st.fx('sparkle', 1660, 160, { quiet: true });
    await st.wait(1400);
    st.act('lan', null); st.pose('minh', 'stand'); st.pose('lan', 'stand');
  } },
  { key: ['visit Grandma and Grandpa', "at ten o'clock"], icon: '🕙', label: "ten o'clock", async play(st) {
    st.mood('minh', 'happy'); st.mood('lan', 'happy');
    await Promise.all([
      st.walk('lan', 1820, { speed: 140, follow: false }),
      st.walk('minh', 1876, { speed: 140, lead: 40 }),
    ]);
    st.set('st-ten'); st.sfx('tick');
    st.pose('grandpa', 'wave'); st.act('grandpa', 'wave'); st.mood('grandpa', 'joy');
    st.pose('grandma', 'wave'); st.act('grandma', 'wave'); st.mood('grandma', 'joy');
    st.pose('minh', 'wave'); st.act('minh', 'wave');
    await st.wait(1600);
    ['grandpa', 'grandma', 'minh'].forEach((k) => { st.act(k, null); st.pose(k, 'stand'); });
  } },
  { key: ['lucky money', 'red envelopes'], icon: '🧧', label: 'lucky money', async play(st) {
    st.look(1930);
    st.set('st-ten', false);
    st.pose('grandpa', 'give'); st.pose('grandma', 'give');
    await st.wait(400);
    await Promise.all([
      st.fly(`<g transform="scale(1.3)">${ENVELOPE}</g>`, [1940, 200], [1886, 196], { size: 30, dur: 650 }),
      st.fly(`<g transform="scale(1.3)">${ENVELOPE}</g>`, [2026, 196], [1830, 196], { size: 30, dur: 900 }),
    ]);
    st.hold('minh', 'e032_env'); st.hold('lan', 'e032_env');
    st.pose('minh', 'raise'); st.pose('lan', 'raise'); st.mood('minh', 'joy'); st.mood('lan', 'joy');
    st.pose('grandpa', 'stand'); st.pose('grandma', 'stand');
    st.fx('sparkle', 1860, 140); st.sfx('sparkle');
    await st.wait(1300);
  } },
  { key: ['visit friends', 'eat sweets'], icon: '🍬', label: 'eat sweets', async play(st) {
    st.hold('minh', null); st.hold('lan', null); st.pose('minh', 'stand'); st.pose('lan', 'stand');
    st.set('st-after');
    await Promise.all([
      st.walk('lan', 2600, { speed: 170, follow: false }),
      st.walk('minh', 2650, { speed: 170, lead: 40 }),
    ]);
    st.pose('tom', 'wave'); st.act('tom', 'wave'); st.mood('tom', 'joy');
    await st.wait(600);
    st.act('tom', null); st.pose('tom', 'give');
    st.hold('minh', 'e032_candy'); st.hold('lan', 'e032_candy');
    st.pose('minh', 'e032_eat'); st.pose('lan', 'e032_eat'); st.act('minh', 'eat'); st.act('lan', 'eat');
    st.set('st-ate'); st.sfx('pop');
    await st.wait(1600);
    ['minh', 'lan'].forEach((k) => { st.act(k, null); st.hold(k, null); st.pose(k, 'stand'); st.mood(k, 'joy'); });
    st.pose('tom', 'stand');
  } },
  { key: ['very tired', 'very happy'], icon: '😴', label: 'tired but happy', async play(st) {
    st.look(2660);
    st.set('st-after', false); st.set('st-night2');
    st.pose('minh', 'e032_yawn'); st.mood('minh', 'shut');
    st.fx('zzz', 2660, 140);
    await st.wait(1500);
    st.pose('minh', 'stand'); st.mood('minh', 'joy');
    st.set('st-lb-tired');
    st.fx('sparkle', 2650, 150, { quiet: true });
    await st.wait(1100);
  } },
  { key: ['loves Tet'], icon: '❤️', label: 'loves Tet', async play(st) {
    st.look(2660);
    st.set('st-lb-tired', false); st.set('st-love'); st.sfx('hearts');
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    st.pose('lan', 'clap'); st.act('lan', 'clap'); st.pose('tom', 'clap'); st.act('tom', 'clap');
    st.fx('hearts', 2650, 140);
    await st.wait(2000);
    ['minh', 'lan', 'tom'].forEach((k) => st.act(k, null));
  } },
];

export default {
  id: 'en032', worldW: W, floor: FLOOR, viewTop: 40, camStart: 1200, css: KIT_CSS + CSS, bg, fg, beats: BEATS, poses: POSES, props: PROPS,
  order: [3, 4, 5, 7, 10, 11],
  cast: [
    { id: 'seller', kind: 'adult', who: 'e032_seller', x: 340, s: 0.92 },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: 1950, s: 0.93, face: -1 },
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: 2040, s: 0.9, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: 2770, face: -1 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 1480, s: 0.95 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 1360, s: 0.95 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 1610, s: 1.04 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 1560 },
  ],
  init(st) {
    for (const id of ['seller', 'grandpa', 'grandma', 'tom']) st.a(id).place();
  },
};
