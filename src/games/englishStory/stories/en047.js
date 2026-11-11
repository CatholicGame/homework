/**
 * Bài 47 "Bigger and Faster" (so sánh hơn): sở thú, trái sang phải: cổng + bảng sơ đồ có đồng hồ (cả ngày) → chuồng hà mã và
 * voi (đường chạy của báo phía sau) → hươu cao cổ và ngựa vằn → khỉ và gấu → nhà bò sát và chim (rắn trong bể kính, vẹt) →
 * về nhà Minh (Lucky, Kitty, đồ chơi xếp hình).
 * So sánh = hai con đặt cạnh nhau, cùng một tỉ lệ (con vật trong chuồng ở xa: 42 đơn vị = 1 m): voi cao 3 m, hà mã 1,5 m,
 * hươu cao cổ 5 m, ngựa vằn 1,5 m, báo 0,9 m. Trẻ em đứng phía trước (gần hơn) nên trông to hơn.
 * Toạ độ cảnh: rộng 3500, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, sky, cloud, tree, bush, room, windowBox, rug, label } from '../kit.js';

const FLOOR = 282;
const PEN = 262; // mặt đất trong chuồng (xa hơn lối đi)
const LANE = 240; // đường chạy của báo (sau chuồng voi)
const T = (x, y, s, c, t, w = 900) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="${w}" font-size="${s}" fill="${c}">${t}</text>`;
const limb = (x, y1, y2, w, c, cls = '') => `<g class="${cls}" style="transform-origin:${x}px ${y1}px"><path d="M${x} ${y1} V${y2}" stroke="${L}" stroke-width="${w + 1.8}" stroke-linecap="round"/><path d="M${x} ${y1} V${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/></g>`;

// ── Con vật (nhìn nghiêng, quay phải, gốc = giữa chỗ chân chạm đất) ─────
const GREY = '#A8A8B3', GREY_D = '#8A8A96';
const ELEPHANT = `<g class="e047-ebody">
  <path d="M-62 -78 q-12 8 -10 34" stroke="${L}" stroke-width="4.4" fill="none"/><path d="M-62 -78 q-12 8 -10 34" stroke="${GREY_D}" stroke-width="2.6" fill="none"/>
  ${limb(-42, -60, -6, 16, GREY_D, 'e047-lgA')}${limb(30, -60, -6, 16, GREY_D, 'e047-lgB')}
  <ellipse cx="-4" cy="-78" rx="64" ry="40" fill="${GREY}" stroke="${L}" stroke-width="1.2"/>
  ${limb(-26, -60, -6, 17, GREY, 'e047-lgB')}${limb(44, -60, -6, 17, GREY, 'e047-lgA')}
  <circle cx="58" cy="-94" r="28" fill="${GREY}" stroke="${L}" stroke-width="1.2"/>
  <g class="e047-ear" style="transform-origin:40px -104px"><path d="M40 -116 Q14 -118 16 -88 Q18 -62 40 -66 Q50 -80 40 -116Z" fill="${GREY_D}" stroke="${L}" stroke-width="1"/></g>
  <g class="e047-trunk" style="transform-origin:78px -86px"><path d="M76 -90 Q94 -72 90 -44 Q88 -26 98 -22" stroke="${L}" stroke-width="14" fill="none" stroke-linecap="round"/>
    <path d="M76 -90 Q94 -72 90 -44 Q88 -26 98 -22" stroke="${GREY}" stroke-width="11.6" fill="none" stroke-linecap="round"/></g>
  <path d="M70 -76 q12 8 18 0 q-8 -2 -14 -6Z" fill="#fff" stroke="${L}" stroke-width="0.8"/>
  <circle cx="66" cy="-102" r="2.6" fill="#1F2937"/><path d="M62 -108 q4 -3 8 0" stroke="${L}" stroke-width="0.8" fill="none"/></g>`;
const HIPPO = `<g>${limb(-44, -18, -3, 13, '#8E86A0')}${limb(18, -18, -3, 13, '#8E86A0')}
  <ellipse cx="-8" cy="-32" rx="56" ry="26" fill="#A79FB8" stroke="${L}" stroke-width="1.2"/>
  ${limb(-28, -18, -3, 14, '#A79FB8')}${limb(32, -18, -3, 14, '#A79FB8')}
  <path d="M-62 -36 q-8 2 -8 10" stroke="${L}" stroke-width="2" fill="none"/>
  <rect x="28" y="-58" width="40" height="36" rx="16" fill="#A79FB8" stroke="${L}" stroke-width="1.2"/>
  <rect x="48" y="-48" width="34" height="30" rx="13" fill="#B9B1C8" stroke="${L}" stroke-width="1.1"/>
  <ellipse cx="38" cy="-60" rx="5" ry="4" fill="#8E86A0" stroke="${L}" stroke-width="0.8"/><circle cx="48" cy="-50" r="2.6" fill="#1F2937"/>
  <ellipse cx="74" cy="-42" rx="2" ry="1.4" fill="${L}"/><path d="M60 -26 q10 3 20 -2" stroke="${L}" stroke-width="1" fill="none"/><ellipse cx="60" cy="-32" rx="4" ry="2.4" fill="#F9A8D4" opacity="0.6"/></g>`;
const CHEETAH = `<g class="e047-cbody"><path d="M-26 -30 Q-46 -28 -52 -12" stroke="${L}" stroke-width="4.6" fill="none" stroke-linecap="round"/><path d="M-26 -30 Q-46 -28 -52 -12" stroke="#FBBF24" stroke-width="3" fill="none" stroke-linecap="round"/>
  ${limb(-18, -24, -1, 3.4, '#F59E0B', 'e047-cl1')}${limb(16, -24, -1, 3.4, '#F59E0B', 'e047-cl2')}
  <ellipse cx="0" cy="-28" rx="27" ry="9" fill="#FBBF24" stroke="${L}" stroke-width="1"/>
  ${[[-16, -30], [-8, -25], [-2, -32], [6, -26], [12, -31], [18, -26], [-12, -22]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#1F2937"/>`).join('')}
  ${limb(-10, -24, -1, 3.6, '#FBBF24', 'e047-cl2')}${limb(22, -24, -1, 3.6, '#FBBF24', 'e047-cl1')}
  <circle cx="30" cy="-34" r="8.4" fill="#FBBF24" stroke="${L}" stroke-width="1"/><path d="M25 -41 l-1 -5 l5 3Z" fill="#FBBF24" stroke="${L}" stroke-width="0.7"/>
  <circle cx="33" cy="-36" r="1.5" fill="#1F2937"/><path d="M33 -34 q-1 5 2 8" stroke="#1F2937" stroke-width="1" fill="none"/><circle cx="38" cy="-32" r="1.3" fill="#1F2937"/></g>`;
const GIRAFFE = `<g><path d="M-40 -108 q-8 10 -6 26" stroke="${L}" stroke-width="2" fill="none"/>
  ${limb(-28, -100, -3, 5, '#D9912F')}${limb(20, -100, -3, 5, '#D9912F')}
  <ellipse cx="-2" cy="-108" rx="42" ry="19" fill="#FBBF24" stroke="${L}" stroke-width="1.2"/>
  ${limb(-18, -100, -3, 5.4, '#F59E0B')}${limb(30, -100, -3, 5.4, '#F59E0B')}
  <g class="e047-neck"><path d="M18 -118 L50 -198 L64 -194 L40 -102Z" fill="#FBBF24" stroke="${L}" stroke-width="1.2"/></g>
  <path d="M50 -198 L22 -116" stroke="#B45309" stroke-width="3" stroke-dasharray="4 3"/>
  ${[[-20, -112], [0, -104], [-6, -118], [16, -112], [-30, -104], [36, -136], [44, -160], [52, -182], [30, -122]].map(([x, y], i) => `<path d="M${x - 4} ${y - 3} l6 -2 l4 4 l-3 5 l-6 -1Z" fill="#B45309" opacity="${i < 5 ? 0.9 : 0.85}"/>`).join('')}
  <g transform="translate(62 -202) rotate(18)"><ellipse rx="15" ry="8.4" fill="#FBBF24" stroke="${L}" stroke-width="1.1"/><path d="M-6 -7 V-15 M0 -7 V-15" stroke="${L}" stroke-width="2"/><circle cx="-6" cy="-16" r="2" fill="#B45309"/><circle cx="0" cy="-16" r="2" fill="#B45309"/>
    <circle cx="2" cy="-2" r="1.8" fill="#1F2937"/><path d="M-10 -4 l-6 -4 l2 6Z" fill="#FBBF24" stroke="${L}" stroke-width="0.7"/></g></g>`;
const ZEBRA = `<g><path d="M-28 -44 q-8 6 -6 18" stroke="${L}" stroke-width="2" fill="none"/>
  ${limb(-20, -34, -2, 4.4, '#E5E7EB')}${limb(14, -34, -2, 4.4, '#E5E7EB')}
  <ellipse cx="-2" cy="-40" rx="29" ry="13" fill="#fff" stroke="${L}" stroke-width="1.1"/>
  ${[-22, -14, -6, 2, 10, 18].map((x) => `<path d="M${x} -52 q2 10 0 22" stroke="#1F2937" stroke-width="2.6" fill="none"/>`).join('')}
  ${limb(-12, -34, -2, 4.6, '#fff')}${limb(22, -34, -2, 4.6, '#fff')}
  <path d="M18 -48 L32 -64 L42 -60 L30 -36Z" fill="#fff" stroke="${L}" stroke-width="1"/><path d="M22 -50 l10 -10 M26 -44 l10 -10" stroke="#1F2937" stroke-width="2.2"/>
  <path d="M30 -66 L20 -50" stroke="#1F2937" stroke-width="3.4"/>
  <g transform="translate(42 -62) rotate(20)"><ellipse rx="10" ry="6" fill="#fff" stroke="${L}" stroke-width="1"/><ellipse cx="7" cy="1" rx="4" ry="4" fill="#374151"/><circle cx="-1" cy="-2" r="1.4" fill="#1F2937"/><path d="M-5 -5 l-2 -6 l4 3Z" fill="#fff" stroke="${L}" stroke-width="0.6"/></g></g>`;
/** Khỉ đu cành (gốc = bàn tay nắm cành). */
const monkey = (c = '#A16207') => `<g><path d="M0 0 L-2 14" stroke="${L}" stroke-width="4" stroke-linecap="round"/><path d="M0 0 L-2 14" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>
  <ellipse cx="-2" cy="22" rx="7" ry="9" fill="${c}" stroke="${L}" stroke-width="0.9"/><path d="M-6 30 q-10 8 -4 18" stroke="${c}" stroke-width="2.4" fill="none"/>
  <path d="M2 28 l4 8 M-6 28 l-3 8" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/><path d="M3 18 l6 6" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>
  <circle cx="-2" cy="8" r="6.4" fill="${c}" stroke="${L}" stroke-width="0.9"/><ellipse cx="-1" cy="10" rx="4.2" ry="3.4" fill="#FDE6C8"/><circle cx="-3" cy="8" r="0.9" fill="#1F2937"/><circle cx="1" cy="8" r="0.9" fill="#1F2937"/>
  <path d="M-3 11 q2 2 4 0" stroke="${L}" stroke-width="0.7" fill="none"/><circle cx="-8" cy="7" r="2" fill="#FDE6C8" stroke="${L}" stroke-width="0.5"/><circle cx="4" cy="7" r="2" fill="#FDE6C8" stroke="${L}" stroke-width="0.5"/></g>`;
const BEAR = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-16" rx="34" ry="16" fill="#92400E" stroke="${L}" stroke-width="1.1"/>
  <ellipse cx="-24" cy="-4" rx="9" ry="5" fill="#78350F" stroke="${L}" stroke-width="0.8"/><ellipse cx="18" cy="-4" rx="9" ry="5" fill="#78350F" stroke="${L}" stroke-width="0.8"/>
  <circle cx="34" cy="-14" r="12" fill="#92400E" stroke="${L}" stroke-width="1.1"/><circle cx="30" cy="-25" r="4" fill="#92400E" stroke="${L}" stroke-width="0.8"/>
  <ellipse cx="42" cy="-11" rx="5" ry="4" fill="#D6A26B"/><circle cx="45" cy="-12" r="1.4" fill="#1F2937"/><path d="M33 -17 q2 2 4 0" stroke="#1F2937" stroke-width="1" fill="none"/></g>`;
const SNAKE = `<g class="e047-snake"><path d="M-40 0 Q-40 -12 -20 -12 Q10 -12 10 -2 Q10 6 -14 6 Q-34 6 -30 -4 Q-26 -8 -6 -8" stroke="${L}" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M-40 0 Q-40 -12 -20 -12 Q10 -12 10 -2 Q10 6 -14 6 Q-34 6 -30 -4 Q-26 -8 -6 -8" stroke="#22C55E" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M-30 -11 l3 2 M-18 -12 l2 3 M-4 -11 l2 3 M6 -6 l3 1 M-12 5 l2 -3" stroke="#FDE047" stroke-width="1.4"/>
  <g class="e047-shead" style="transform-origin:-6px -8px"><path d="M-6 -8 Q8 -10 12 -26" stroke="${L}" stroke-width="7.4" fill="none" stroke-linecap="round"/><path d="M-6 -8 Q8 -10 12 -26" stroke="#22C55E" stroke-width="5.6" fill="none" stroke-linecap="round"/>
    <g transform="translate(14 -30)"><ellipse rx="8" ry="5.4" fill="#16A34A" stroke="${L}" stroke-width="0.9"/><circle cx="2" cy="-2" r="1.6" fill="#FDE047"/><circle cx="2.3" cy="-2" r="0.7" fill="#1F2937"/>
      <g class="e047-mouth"><path d="M4 2 L12 4 L4 6Z" fill="#B91C1C" stroke="${L}" stroke-width="0.5"/><path d="M6 2.4 v2 M9 3 v1.6" stroke="#fff" stroke-width="0.9"/></g>
      <path class="e047-tongue" d="M8 1 l6 0 l2 -2 M14 1 l2 2" stroke="#EF4444" stroke-width="1" fill="none"/></g></g></g>`;
const PARROT = `<g class="e047-parrot"><path d="M-2 10 L-10 44 L-2 42 L2 12Z" fill="#2563EB" stroke="${L}" stroke-width="0.8"/><path d="M2 10 L4 46 L10 42 L6 10Z" fill="#EF4444" stroke="${L}" stroke-width="0.8"/>
  <ellipse cx="0" cy="-2" rx="10" ry="15" fill="#EF4444" stroke="${L}" stroke-width="1"/>
  <g class="e047-wing" style="transform-origin:-4px -10px"><path d="M-4 -10 Q-22 -2 -20 20 Q-8 16 -2 6Z" fill="#FACC15" stroke="${L}" stroke-width="0.8"/><path d="M-20 20 Q-12 6 -4 0 Q-14 10 -16 22Z" fill="#2563EB" stroke="${L}" stroke-width="0.7"/></g>
  <circle cx="2" cy="-18" r="8" fill="#EF4444" stroke="${L}" stroke-width="1"/><ellipse cx="4" cy="-19" rx="3.4" ry="3" fill="#fff"/><circle cx="4.6" cy="-19" r="1.4" fill="#1F2937"/>
  <path d="M8 -20 Q16 -18 12 -10 Q10 -14 8 -14Z" fill="#334155" stroke="${L}" stroke-width="0.7"/><path d="M-4 12 l-2 4 M4 12 l2 4" stroke="#78716C" stroke-width="1.6"/></g>`;
const SORTER = `<rect x="-20" y="-22" width="40" height="22" rx="3" fill="#F472B6" stroke="${L}"/><rect x="-20" y="-26" width="40" height="6" rx="2" fill="#F9A8D4" stroke="${L}" stroke-width="0.8"/>
  <path d="M-12 -23 l2 -2 h4 l2 2Z" fill="#831843"/><circle cx="0" cy="-23" r="2.4" fill="#831843"/><path d="M10 -25 l1 2 h2 l-1.6 1.2 l0.6 2 l-2 -1.2 l-2 1.2 l0.6 -2 l-1.6 -1.2 h2Z" fill="#831843"/>`;
const STARBLOCK = `<path d="M0 -8 L2.4 -2.6 L8 -2.4 L3.6 1.2 L5 7 L0 3.8 L-5 7 L-3.6 1.2 L-8 -2.4 L-2.4 -2.6Z" fill="#FACC15" stroke="${L}" stroke-width="0.8"/>`;
const BULB = `<circle cy="-4" r="9" fill="#FEF08A" stroke="${L}"/><rect x="-4" y="4" width="8" height="6" rx="1" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/>
  ${[0, 60, 120, 180, 240, 300].map((r) => `<path d="M0 -17 V-21" stroke="#FACC15" stroke-width="2" stroke-linecap="round" transform="rotate(${r} 0 -4)"/>`).join('')}`;

/** Lớp chữ so sánh (bật bằng st-lb-k). */
const lb = (k, x, y, t, c, s = 16) => `<g class="e047-lb e047-lb-${k}">${label(x, y, t, c, s)}</g>`;
/** Mũi tên đo chiều cao (từ đất y0 lên y1) ở x. */
const hArrow = (k, x, y0, y1) => `<g class="e047-lb e047-lb-${k}"><path d="M${x} ${y0} V${y1}" stroke="#DC2626" stroke-width="2.4"/><path d="M${x - 5} ${y1 + 7} L${x} ${y1} L${x + 5} ${y1 + 7} M${x - 5} ${y0 - 7} L${x} ${y0} L${x + 5} ${y0 - 7}" stroke="#DC2626" stroke-width="2.4" fill="none" stroke-linejoin="round"/></g>`;

function pen(x, w, ground = '#A3E635') {
  return `<rect x="${x}" y="${PEN - 46}" width="${w}" height="${FLOOR - PEN + 46}" fill="${ground}" stroke="${L}" stroke-width="0.8"/>`;
}

function bg() {
  return `
  ${sky(0, 3060, 315, 'e047sky')}
  ${cloud(160, 60, 0.9, 0)}${cloud(720, 50, 1, 2)}${cloud(1300, 62, 0.8, 4)}${cloud(1900, 48, 0.9, 1)}${cloud(2500, 56, 1, 3)}
  <path d="M0 220 Q300 190 640 214 T1300 206 T2000 212 T3060 206 V${FLOOR} H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(90, 236, 0.8)}${tree(1480, 222, 0.9, '')}${tree(2440, 220, 0.85, '')}

  <!-- CỔNG -->
  <g transform="translate(240 0)"><rect x="-110" y="96" width="22" height="${FLOOR - 96}" fill="#16A34A" stroke="${L}" stroke-width="1.2"/><rect x="88" y="96" width="22" height="${FLOOR - 96}" fill="#16A34A" stroke="${L}" stroke-width="1.2"/>
    <path d="M-118 108 Q0 50 118 108 L118 124 Q0 66 -118 124Z" fill="#22C55E" stroke="${L}" stroke-width="1.2"/>
    <rect x="-46" y="62" width="92" height="30" rx="8" fill="#FEF3C7" stroke="${L}" stroke-width="1.4"/>${T(0, 85, 22, '#B45309', 'ZOO')}
    <g transform="translate(-80 80)"><circle r="10" fill="#FBBF24" stroke="${L}"/><circle cx="-7" cy="-8" r="4" fill="#FBBF24" stroke="${L}" stroke-width="0.7"/><circle cx="7" cy="-8" r="4" fill="#FBBF24" stroke="${L}" stroke-width="0.7"/><circle cx="-3" cy="-2" r="1.3" fill="${L}"/><circle cx="3" cy="-2" r="1.3" fill="${L}"/></g>
  </g>
  <!-- bảng sơ đồ + đồng hồ -->
  <g transform="translate(500 0)">
    <path d="M-60 ${FLOOR} V180 M60 ${FLOOR} V180" stroke="#92400E" stroke-width="6"/>
    <rect x="-80" y="96" width="160" height="92" rx="6" fill="#FEF3C7" stroke="${L}" stroke-width="1.4"/>
    ${[[ELEPHANT, HIPPO, 0.19, 0.19, -40, 120], [CHEETAH, ELEPHANT, 0.36, 0.19, 40, 120], [GIRAFFE, ZEBRA, 0.115, 0.115, -40, 162], [monkey(), BEAR(0, 0), 0.5, 0.36, 40, 162]].map(([a, b, sa, sb, x, y], i) => `<g transform="translate(${x} ${y})"><rect x="-34" y="-16" width="68" height="30" rx="5" fill="#fff" stroke="#CBD5E1"/>
      <g transform="translate(-20 ${i === 3 ? -12 : 12}) scale(${sa})">${a}</g><g transform="translate(16 12) scale(${sb})">${b}</g><g class="e047-cmp e047-cmp${i}">${T(-1, 7, 15, '#DC2626', '&gt;')}</g></g>`).join('')}
    <g transform="translate(0 70)"><circle r="22" fill="#fff" stroke="${L}" stroke-width="1.6"/>${Array.from({ length: 12 }, (_, i) => `<path d="M0 -18 V-15" stroke="${L}" stroke-width="1.4" transform="rotate(${i * 30})"/>`).join('')}
      <g class="e047-hh"><path d="M0 0 V-10" stroke="${L}" stroke-width="2.6" stroke-linecap="round"/></g><g class="e047-mh"><path d="M0 0 V-16" stroke="#DC2626" stroke-width="1.8" stroke-linecap="round"/></g><circle r="2" fill="${L}"/></g>
  </g>

  <!-- CHUỒNG VOI + HÀ MÃ, đường chạy của báo phía sau -->
  ${pen(640, 840, '#BEF264')}
  <rect x="640" y="${LANE - 22}" width="840" height="26" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>
  <path d="M640 ${LANE + 6} H1480" stroke="#A16207" stroke-width="2"/>${Array.from({ length: 21 }, (_, i) => `<path d="M${646 + i * 40} ${LANE + 6} V${LANE - 8}" stroke="#A16207" stroke-width="2"/>`).join('')}
  <path d="M760 ${LANE - 22} V${LANE + 4}" stroke="#fff" stroke-width="3" stroke-dasharray="4 3"/>
  <ellipse cx="830" cy="${PEN + 4}" rx="90" ry="12" fill="#38BDF8" stroke="${L}"/>
  ${bush(1440, PEN - 2, 0.9)}${bush(660, PEN - 4, 0.7)}

  <!-- HƯƠU CAO CỔ + NGỰA VẰN -->
  ${pen(1500, 520, '#D9F99D')}
  ${tree(1990, PEN - 6, 1.15, '')}
  <rect x="1960" y="${PEN - 110}" width="36" height="16" rx="4" fill="#65A30D" stroke="${L}" stroke-width="0.8"/>

  <!-- KHỈ + GẤU -->
  ${pen(2040, 440, '#BBF7D0')}
  <g transform="translate(2120 0)"><path d="M-50 ${PEN} V120 M50 ${PEN} V120" stroke="#92400E" stroke-width="6"/><path d="M-56 120 H56" stroke="#92400E" stroke-width="6"/><path d="M-20 120 Q-24 160 -18 200" stroke="#65A30D" stroke-width="2.4" fill="none"/></g>
  <path d="M2300 ${PEN} Q2310 ${PEN - 50} 2360 ${PEN - 54} Q2420 ${PEN - 56} 2440 ${PEN}Z" fill="#A8A29E" stroke="${L}"/>
  ${BEAR(2290, PEN + 2, 1)}${BEAR(2400, PEN - 50, 0.8)}

  <!-- lối đi + tường thấp trước chuồng -->
  <rect x="0" y="${FLOOR - 4}" width="3060" height="40" fill="#E7D3A8" stroke="${L}"/>
  ${[640, 1500, 2040].map((x, i) => { const w = [840, 520, 440][i]; return `<rect x="${x}" y="${FLOOR - 16}" width="${w}" height="12" fill="#D6D3D1" stroke="${L}" stroke-width="0.9"/>${Array.from({ length: Math.floor(w / 40) + 1 }, (_, j) => `<path d="M${x + j * 40} ${FLOOR - 16} V${FLOOR - 4}" stroke="#A8A29E"/>`).join('')}`; }).join('')}

  <!-- NHÀ BÒ SÁT VÀ CHIM -->
  ${room(2500, 520, FLOOR, '#ECFCCB', '#BEF264')}
  <rect x="2500" y="0" width="520" height="16" fill="#65A30D" stroke="${L}"/>${T(2760, 13, 12, '#fff', 'REPTILES AND BIRDS')}
  <!-- bể rắn -->
  <g transform="translate(2650 0)"><rect x="-56" y="186" width="112" height="${FLOOR - 186}" fill="#A16207" stroke="${L}"/>
    <rect x="-60" y="112" width="120" height="74" rx="3" fill="#D9F99D" stroke="${L}" stroke-width="1.4"/><path d="M-60 176 H60 V186 H-60Z" fill="#D6A26B"/>
    <path d="M-44 176 q4 -24 0 -40 M40 176 q6 -20 -2 -34" stroke="#65A30D" stroke-width="3" fill="none"/></g>
  <g class="e047-danger" transform="translate(2650 96)"><path d="M0 -14 L15 12 H-15Z" fill="#FACC15" stroke="${L}" stroke-width="1.2" stroke-linejoin="round"/>${T(0, 9, 15, '#1F2937', '!')}</g>
  <!-- lồng vẹt -->
  <g transform="translate(2850 0)"><path d="M0 30 V48" stroke="${L}" stroke-width="1.6"/><path d="M-48 160 V80 Q-48 48 0 48 Q48 48 48 80 V160Z" fill="#fff" fill-opacity="0.35" stroke="${L}" stroke-width="1.4"/>
    ${[-36, -24, -12, 0, 12, 24, 36].map((x) => `<path d="M${x} ${x === 0 ? 48 : 56 + Math.abs(x) * 0.3} V160" stroke="#94A3B8" stroke-width="1"/>`).join('')}
    <rect x="-52" y="158" width="104" height="8" rx="2" fill="#94A3B8" stroke="${L}"/><path d="M-30 130 H30" stroke="#92400E" stroke-width="4" stroke-linecap="round"/></g>
  ${windowBox(2930, 60, 60, 60)}
  <!-- cổng ra -->
  <rect x="3020" y="0" width="16" height="${FLOOR}" fill="#65A30D" stroke="${L}"/>

  <!-- PHỐ + NHÀ MINH -->
  <rect x="3036" y="${FLOOR - 4}" width="40" height="40" fill="#E5E7EB" stroke="${L}"/>
  ${room(3076, 424, FLOOR, '#FEF3C7')}
  <rect x="3060" y="0" width="16" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  ${windowBox(3330, 70, 110, 90)}
  <g transform="translate(3160 0)"><rect x="-30" y="${FLOOR - 90}" width="60" height="90" rx="3" fill="#B45309" stroke="${L}"/><rect x="-24" y="${FLOOR - 84}" width="48" height="36" rx="2" fill="#D97706" stroke="${L}" stroke-width="0.8"/><rect x="-24" y="${FLOOR - 44}" width="48" height="38" rx="2" fill="#D97706" stroke="${L}" stroke-width="0.8"/></g>
  ${rug(3330, FLOOR, 220, '#FDBA74')}
  <g transform="translate(3440 ${FLOOR})">${SORTER}</g>
  <g class="e047-star0" transform="translate(3414 ${FLOOR - 7})">${STARBLOCK}</g>`;
}

function fg() {
  return `
  ${lb('bigger', 1090, 128, 'bigger', '#DC2626', 18)}
  ${hArrow('bigger', 1188, PEN, PEN - 122)}${hArrow('bigger', 975, PEN, PEN - 60)}
  ${lb('faster', 1380, 176, 'faster', '#EA580C', 18)}
  <g class="e047-lb e047-lb-faster">${[0, 1, 2].map((i) => `<path class="e047-speed" style="animation-delay:${i * 0.15}s" d="M${1316 - i * 6} ${LANE - 34 + i * 8} h-30" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`).join('')}</g>
  ${hArrow('taller', 1742, PEN, PEN - 212)}${hArrow('taller', 1858, PEN, PEN - 64)}
  <g class="e047-lb e047-lb-taller"><path d="M1742 ${PEN - 64} H1858" stroke="#DC2626" stroke-width="1.4" stroke-dasharray="4 3"/></g>
  ${lb('taller', 1860, 110, 'taller', '#DC2626', 18)}${lb('neck', 1860, 140, 'longer neck', '#B45309', 14)}
  ${lb('funnier', 2170, 96, 'funnier', '#16A34A', 18)}
  <g class="e047-lb e047-lb-funnier">${T(2050, 146, 13, '#16A34A', 'HA HA')}</g>
  <g class="e047-lb e047-lb-sleep">${T(2330, 222, 14, '#6366F1', 'z z')}</g>
  ${lb('beautiful', 2740, 84, 'more beautiful', '#DB2777', 15)}
  ${lb('dangerous', 2650, 52, 'more dangerous', '#B91C1C', 15)}
  ${lb('noisy', 3250, 146, 'bigger, noisier', '#B45309', 14)}
  <g class="e047-lb e047-lb-woof">${T(3226, 186, 14, '#B45309', 'WOOF!')}</g>
  ${lb('clever', 3410, 120, 'cleverer', '#7C3AED', 16)}
  <g transform="translate(3376 172)"><g class="e047-bulb">${BULB}</g></g>
  <!-- cổng ra (trụ trước) -->
  <rect x="3020" y="0" width="16" height="${FLOOR}" fill="#65A30D" stroke="${L}"/><rect x="3060" y="0" width="16" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>`;
}

const CSS = `
.e047-lb { opacity: 0; transition: opacity .35s; }
${['bigger', 'faster', 'taller', 'neck', 'funnier', 'sleep', 'beautiful', 'dangerous', 'noisy', 'woof', 'clever'].map((k) => `.st-lb-${k} .e047-lb-${k}`).join(', ')} { opacity: 1; }
.e047-cmp { opacity: 0; transition: opacity .3s; }
${[0, 1, 2, 3].map((i) => `.st-cmp${i} .e047-cmp${i}`).join(', ')} { opacity: 1; }
.e047-hh, .e047-mh { transition: transform 2.6s ease-in-out; }
.st-allday .e047-hh { transform: rotate(210deg); } .st-allday .e047-mh { transform: rotate(2520deg); }
.e047-speed { animation: e047Speed .5s linear infinite; } @keyframes e047Speed { from { transform: translateX(10px); opacity: 1; } to { transform: translateX(-20px); opacity: 0; } }
.st-lb-faster .e047-lb-faster { opacity: 1; }
.es-thing.is-walk .e047-lgA { animation: e047Leg .5s ease-in-out infinite alternate; } .es-thing.is-walk .e047-lgB { animation: e047Leg .5s ease-in-out infinite alternate-reverse; }
@keyframes e047Leg { from { transform: rotate(-8deg); } to { transform: rotate(8deg); } }
.es-thing.is-walk .e047-cl1 { animation: e047Run .16s ease-in-out infinite alternate; } .es-thing.is-walk .e047-cl2 { animation: e047Run .16s ease-in-out infinite alternate-reverse; }
@keyframes e047Run { from { transform: rotate(-38deg); } to { transform: rotate(38deg); } }
.es-thing.is-walk .e047-cbody { animation: e047Bob .16s ease-in-out infinite alternate; } @keyframes e047Bob { to { transform: translateY(-2px); } }
.e047-ear { animation: e047Ear 1.6s ease-in-out infinite alternate; } @keyframes e047Ear { to { transform: rotate(-8deg); } }
.e047-trunk { transition: transform .5s; } .e047-toot .e047-trunk { transform: rotate(-70deg); }
.e047-neck { transition: filter .3s; } .e047-glow .e047-neck path { fill: #FDE047; stroke: #DC2626; stroke-width: 2.4; }
.e047-swing { animation: e047Swing 1.2s ease-in-out infinite alternate; } @keyframes e047Swing { from { transform: rotate(-22deg); } to { transform: rotate(22deg); } }
.e047-flip { animation: e047Flip 1.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; } @keyframes e047Flip { 0%, 40% { transform: translateY(0) rotate(0); } 70% { transform: translateY(-26px) rotate(180deg); } 100% { transform: translateY(0) rotate(360deg); } }
.st-funny .e047-swing { animation-duration: .6s; }
.e047-shead { animation: e047Sway 1.6s ease-in-out infinite alternate; } @keyframes e047Sway { to { transform: rotate(-8deg); } }
.e047-tongue { animation: e047Tongue .8s steps(2) infinite; } @keyframes e047Tongue { 50% { opacity: 0; } }
.e047-mouth { opacity: 0; } .e047-hiss .e047-mouth { opacity: 1; } .e047-hiss .e047-shead { animation: e047Hiss .25s ease-in-out infinite alternate; }
@keyframes e047Hiss { from { transform: rotate(-14deg) translate(-2px, -4px); } to { transform: rotate(-20deg) translate(2px, -6px); } }
.e047-danger { opacity: .35; } .st-danger .e047-danger { opacity: 1; animation: e047Blink .4s steps(2) infinite; } @keyframes e047Blink { 50% { opacity: .4; } }
.e047-pretty .e047-wing { animation: e047Flap .25s ease-in-out infinite alternate; } @keyframes e047Flap { to { transform: rotate(-50deg); } }
.e047-bulb { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: center; transition: opacity .3s, transform .45s cubic-bezier(.3,1.6,.6,1); }
.st-clever .e047-bulb { opacity: 1; transform: scale(1); }
.st-starin .e047-star0 { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .e047-ear, .e047-shead, .e047-speed { animation: none; }
  .e047-swing, .st-funny .e047-swing { animation-duration: 2.4s; }
  .e047-flip { animation-duration: 3.6s; }
  .e047-pretty .e047-wing { animation-duration: .6s; }
  .e047-hiss .e047-shead { animation: none; transform: rotate(-16deg) translate(0, -5px); }
}
`;

const mark = (st, id, cls, on = true) => st.a(id).el.classList.toggle(cls, on);
/** Camera: thấy cả trẻ (từ kid) lẫn hai con vật (a..b) nếu khung đủ rộng; khung hẹp (điện thoại dọc) thì ưu tiên hai con vật. */
const frame = (st, kid, a, b, opt) => st.look(st.VW >= b - kid + 70 ? (kid - 35 + b) / 2 : (a + b) / 2, opt);
const WALKERS = (st, xs, opt = {}) => Promise.all(Object.entries(xs).map(([id, x], i) => st.walk(id, x, { speed: 240, follow: i === 0, ...opt })));

const BEATS = [
  { key: ['took the class to the zoo'], icon: '🦁', label: 'the zoo', async play(st) {
    await Promise.all([
      st.walk('hoa', 420, { speed: 150, lead: -60 }),
      st.walk('minh', 350, { speed: 150, follow: false }),
      st.walk('tom', 290, { speed: 150, follow: false }),
      st.walk('k1', 220, { speed: 150, follow: false }),
      st.walk('k2', 160, { speed: 150, follow: false }),
    ]);
    st.pose('hoa', 'wave'); st.act('hoa', 'wave'); st.face('hoa', -1);
    for (const id of ['minh', 'tom', 'k1', 'k2']) st.mood(id, 'joy');
    st.act('k1', 'hop'); st.sfx('cheer', { vol: 0.5 });
    await st.wait(1200);
    st.act('hoa', null); st.act('k1', null); st.pose('hoa', 'stand');
  } },
  { key: ['compared the animals all day'], icon: '⚖️', label: 'compared', async play(st) {
    st.face('hoa', 1);
    await st.walk('hoa', 580, { speed: 160, lead: -100 });
    st.face('hoa', -1); st.pose('hoa', 'point');
    st.set('st-allday');
    for (let i = 0; i < 4; i++) { await st.wait(450); st.set(`st-cmp${i}`); st.sfx('pencil', { vol: 0.3 }); }
    st.pose('minh', 'point'); st.pose('tom', 'point'); st.mood('minh', 'wow'); st.mood('tom', 'wow');
    await st.wait(800);
    st.pose('hoa', 'stand'); st.pose('minh', 'stand'); st.pose('tom', 'stand'); st.mood('minh', 'happy'); st.mood('tom', 'happy');
  } },
  { key: ['elephant is bigger than the hippo'], icon: '🐘', label: 'bigger', async play(st) {
    await WALKERS(st, { minh: 760, tom: 700 }, { lead: 180 });
    frame(st, 700, 830, 1196);
    st.pose('minh', 'point');
    mark(st, 'ele', 'e047-toot'); st.set('st-lb-bigger'); st.sfx('elephant', { vol: 0.6 });
    await st.say('minh', 'The elephant is bigger!', 1700);
    mark(st, 'ele', 'e047-toot', false);
    await st.wait(300);
    st.pose('minh', 'stand');
  } },
  { key: ['cheetah is faster than the elephant'], icon: '🐆', label: 'faster', async play(st) {
    st.set('st-lb-bigger', false);
    await WALKERS(st, { tom: 960, minh: 900 }, { lead: 220, speed: 200 });
    frame(st, 900, 1000, 1420);
    st.face('tom', 1); st.pose('tom', 'point');
    st.say('tom', 'The cheetah is faster!', 1500);
    await st.wait(700);
    await Promise.all([
      (st.sfx('whoosh', { vol: 0.6 }), st.walk('cheetah', 1380, { speed: 360, follow: false })),
      st.walk('ele', 1240, { speed: 70, follow: false }),
      (async () => { await st.wait(500); st.set('st-lb-faster'); st.sfx('pop', { vol: 0.6 }); })(),
    ]);
    st.mood('tom', 'joy'); st.mood('minh', 'wow');
    await st.wait(500);
    st.pose('tom', 'stand');
  } },
  { key: ['giraffe was taller than the zebra', 'its neck was longer'], icon: '🦒', label: 'taller', async play(st) {
    st.set('st-lb-faster', false);
    await WALKERS(st, { tom: 1590, minh: 1540 }, { lead: 120, speed: 260 });
    frame(st, 1540, 1616, 1900);
    st.set('st-lb-taller'); st.sfx('pop', { vol: 0.6 }); st.pose('tom', 'pointUp'); st.mood('tom', 'wow');
    await st.wait(1500);
    mark(st, 'giraffe', 'e047-glow'); st.set('st-lb-neck'); st.sfx('sparkle', { vol: 0.5 });
    await st.wait(1300);
    st.pose('tom', 'stand'); st.mood('tom', 'happy');
  } },
  { key: ['monkeys were funnier than the bears'], icon: '🐒', label: 'funnier', async play(st) {
    st.set('st-lb-taller', false); st.set('st-lb-neck', false); mark(st, 'giraffe', 'e047-glow', false);
    await WALKERS(st, { minh: 2000, tom: 1950 }, { lead: 150, speed: 260 });
    frame(st, 1950, 2060, 2450);
    st.set('st-funny'); st.set('st-lb-funnier'); st.set('st-lb-sleep');
    st.sfx('monkey', { vol: 0.6 });
    st.mood('minh', 'joy'); st.pose('minh', 'clap'); st.act('minh', 'clap');
    st.fx('zzz', 2330, 230, { quiet: true });
    await st.wait(700);
    st.sfx('clap', { vol: 0.5 });
    await st.wait(700);
    st.sfx('snore', { vol: 0.4 });
    await st.wait(800);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['Tom liked the snakes', 'parrots were more beautiful'], icon: '🦜', label: 'more beautiful', async play(st) {
    st.set('st-funny', false); st.set('st-lb-funnier', false); st.set('st-lb-sleep', false);
    await WALKERS(st, { tom: 2580, minh: 2760 }, { lead: 120, speed: 300 });
    frame(st, 2550, 2600, 2900);
    st.face('tom', 1); st.pose('tom', 'clap'); st.mood('tom', 'joy');
    st.sfx('hiss', { vol: 0.35 }); st.fx('hearts', 2620, 150);
    await st.wait(1000);
    st.face('minh', 1); st.pose('minh', 'pointUp'); st.mood('minh', 'joy');
    mark(st, 'parrot', 'e047-pretty'); st.set('st-lb-beautiful'); st.sfx('parrot', { vol: 0.6 });
    st.fx('sparkle', 2850, 120, { quiet: true });
    await st.wait(1600);
    st.pose('tom', 'stand'); st.pose('minh', 'stand');
  } },
  { key: ['more dangerous than parrots'], icon: '⚠️', label: 'more dangerous', async play(st) {
    st.set('st-lb-beautiful', false); mark(st, 'parrot', 'e047-pretty', false);
    st.place('hoa', 2420, FLOOR, 1); st.pose('hoa', 'stand'); st.mood('hoa', 'happy');
    frame(st, 2480, 2590, 2720);
    await st.walk('hoa', 2520, { speed: 160, follow: false });
    mark(st, 'snake', 'e047-hiss'); st.set('st-danger'); st.set('st-lb-dangerous'); st.sfx('hiss', { vol: 0.7 });
    st.mood('tom', 'wow'); st.pose('tom', 'e047_back');
    st.pose('hoa', 'pointUp');
    await st.say('hoa', 'More dangerous!', 1600);
    st.pose('tom', 'stand');
  } },
  { key: ['At home', 'Lucky and Kitty'], icon: '🏠', label: 'at home', async play(st) {
    st.set('st-lb-dangerous', false); st.set('st-danger', false); mark(st, 'snake', 'e047-hiss', false); st.pose('hoa', 'stand');
    await st.walk('minh', 3170, { speed: 300, lead: 140 });
    frame(st, 3140, 3200, 3470);
    st.face('minh', 1); st.pose('minh', 'point');
    st.act('lucky', 'wag'); st.dog('kitty', 'sit');
    await st.wait(500);
    st.sfx('meow', { vol: 0.5 });
    await st.wait(1100);
    st.act('lucky', null); st.pose('minh', 'stand');
  } },
  { key: ['bigger and noisier', 'Kitty is cleverer'], icon: '🐱', label: 'cleverer', async play(st) {
    st.dog('lucky', 'stand'); st.act('lucky', 'jump'); st.mood('lucky', 'joy');
    st.set('st-lb-noisy'); st.set('st-lb-woof'); st.sfx('dog-bark');
    st.pose('minh', 'open');
    await st.wait(1600);
    st.act('lucky', null); st.set('st-lb-woof', false); st.mood('lucky', 'happy');
    st.dog('kitty', 'stand');
    await st.walk('kitty', 3405, { speed: 60, follow: false });
    st.set('st-starin'); st.fly(STARBLOCK, [3414, FLOOR - 14], [3450, FLOOR - 26], { size: 18, dur: 420 });
    await st.wait(420);
    st.set('st-clever'); st.set('st-lb-clever'); st.fx('sparkle', 3440, FLOOR - 30); st.sfx('purr', { vol: 0.5 });
    st.mood('kitty', 'joy'); st.dog('kitty', 'sit');
    st.mood('minh', 'joy'); st.pose('minh', 'cheer');
    await st.wait(1200);
  } },
];

export default {
  id: 'en047', worldW: 3500, floor: FLOOR, viewTop: 30, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  order: [0, 2, 3, 4, 5, 7],
  poses: {
    e047_back: { R: [40, 60], L: [40, 60], head: -8 },
  },
  cast: [
    { id: 'cheetah', kind: 'thing', x: 1110, y: LANE, svg: CHEETAH, box: [-56, -48, 100, 52] },
    { id: 'hippo', kind: 'thing', x: 900, y: PEN, svg: HIPPO, box: [-72, -66, 160, 70] },
    { id: 'ele', kind: 'thing', x: 1090, y: PEN, svg: ELEPHANT, box: [-80, -126, 186, 130] },
    { id: 'giraffe', kind: 'thing', x: 1660, y: PEN, svg: GIRAFFE, box: [-50, -222, 130, 226] },
    { id: 'zebra', kind: 'thing', x: 1790, y: PEN, svg: ZEBRA, box: [-40, -74, 96, 78] },
    { id: 'm1', kind: 'thing', x: 2100, y: 120, svg: `<g class="e047-swing">${monkey()}</g>`, box: [-14, -2, 28, 54] },
    { id: 'm2', kind: 'thing', x: 2140, y: 120, svg: `<g class="e047-swing" style="animation-delay:-.6s">${monkey('#B45309')}</g>`, box: [-14, -2, 28, 54] },
    { id: 'm3', kind: 'thing', x: 2190, y: PEN, svg: `<g class="e047-flip"><g transform="translate(0 -52)">${monkey('#92400E')}</g></g>`, box: [-14, -54, 28, 56] },
    { id: 'snake', kind: 'thing', x: 2650, y: 176, svg: SNAKE, box: [-46, -40, 66, 48] },
    { id: 'parrot', kind: 'thing', x: 2850, y: 130, svg: PARROT, box: [-24, -30, 40, 78] },
    { id: 'lucky', kind: 'dog', x: 3250, s: 0.95 },
    { id: 'kitty', kind: 'cat', x: 3362, s: 1 },
    { id: 'k2', kind: 'kid', who: 'nam', x: -260 },
    { id: 'k1', kind: 'kid', who: 'linh', x: -200 },
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: -30, s: 0.95 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: -140 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: -80 },
  ],
  init(st) {
    st.dog('lucky', 'sit');
  },
};
