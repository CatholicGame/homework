/**
 * Bài 26 "A Busy Saturday": ngôi nhà cắt ngang, đi từ trái sang phải: gara (bố rửa xe) → bếp (mẹ nấu trưa, Lucky ngồi ở cửa)
 * → phòng khách (Lan đọc truyện trên ghế bành, Minh vẽ ở bàn, Kitty trên sô-pha).
 * Việc "thường làm" (usually / always / never) hiện trong bong bóng nghĩ kèm nhãn chữ; việc "đang làm" (now) diễn thật.
 * Toạ độ cảnh: rộng 1820, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, room, doorway, shelf, books, rug, label, steam, BALL } from '../kit.js';

const FLOOR = 282;
const TT = 240; // mặt bàn của Minh


// ── Đồ vật ────────────────────────────────────────────────────────────────
const SPONGE = `<g transform="translate(0 -2)"><rect x="-7" y="-5" width="14" height="10" rx="3" fill="#FDE047" stroke="${L}" stroke-width="0.8"/><circle cx="-2" cy="-1" r="1.2" fill="#F59E0B"/><circle cx="3" cy="2" r="1" fill="#F59E0B"/></g>`;
const BOOKP = `<g transform="rotate(-8)"><rect x="-9" y="-12" width="18" height="24" rx="2" fill="#EC4899" stroke="${L}" stroke-width="1"/><path d="M-6 -6 H6 M-6 -2 H4" stroke="#fff" stroke-width="1.4"/><path d="M-4 4 l4 -4 l4 4" fill="#FACC15" stroke="${L}" stroke-width="0.6"/></g>`;

/** Xe của bố (vẽ trong cảnh, cỡ thật so với người): tâm cx, bánh chạm sàn. */
const CAR = (cx) => `<g transform="translate(${cx} ${FLOOR})">
  <path d="M-150 -26 Q-152 -62 -124 -66 L-82 -70 Q-58 -112 -12 -112 L40 -112 Q72 -110 94 -72 L132 -66 Q154 -60 152 -26Z" fill="#3B82F6" stroke="${L}" stroke-width="1.4"/>
  <path d="M-70 -72 Q-52 -102 -14 -102 L6 -102 V-72Z" fill="#BAE6FD" stroke="${L}"/><path d="M16 -102 L38 -102 Q64 -100 82 -72 L16 -72Z" fill="#BAE6FD" stroke="${L}"/>
  <path d="M11 -72 V-30 M-84 -66 V-30" stroke="#1D4ED8" stroke-width="1.4"/><rect x="-6" y="-60" width="12" height="4" rx="2" fill="#1E3A8A"/><rect x="-100" y="-60" width="12" height="4" rx="2" fill="#1E3A8A"/>
  <path d="M-148 -40 H150" stroke="#1D4ED8" stroke-width="1.6"/>
  <rect x="138" y="-60" width="14" height="10" rx="3" fill="#FDE68A" stroke="${L}"/><rect x="-152" y="-58" width="10" height="10" rx="3" fill="#F87171" stroke="${L}"/>
  <g class="e026-mud1">${[[-40, -50, 9], [-22, -36, 6], [-56, -32, 7], [-30, -86, 5]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.7}" fill="#92400E" opacity="0.75"/>`).join('')}</g>
  <g class="e026-mud2">${[[60, -50, 9], [84, -36, 7], [44, -34, 6], [56, -84, 5]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.7}" fill="#92400E" opacity="0.75"/>`).join('')}</g>
  <g class="e026-shine">${[[-40, -88], [30, -90], [100, -50], [-110, -48]].map(([x, y]) => `<path d="M${x} ${y - 8} l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2Z" fill="#fff"/>`).join('')}</g>
  ${[-94, 96].map((x) => `<g transform="translate(${x} -22)"><circle r="22" fill="#1F2937" stroke="${L}"/><circle r="10" fill="#CBD5E1"/><path d="M-10 0 H10 M0 -10 V10" stroke="#64748B" stroke-width="2"/></g>`).join('')}
</g>`;

/** Cửa sổ: trời xanh mây; trời mưa (st-rain) thì mây xám, mưa rơi. */
const win = (x, y, w, h, id) => `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath></defs>
  <rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <g clip-path="url(#${id})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#BAE6FD"/>
    <path d="M${x} ${y + h - 16} Q${x + w * 0.4} ${y + h - 30} ${x + w} ${y + h - 18} V${y + h} H${x}Z" fill="#86EFAC"/>
    <g class="e026-wet"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#94A3B8" opacity="0.85"/>
      <ellipse cx="${x + w * 0.3}" cy="${y + 10}" rx="${w * 0.36}" ry="14" fill="#64748B"/><ellipse cx="${x + w * 0.75}" cy="${y + 6}" rx="${w * 0.34}" ry="13" fill="#64748B"/>
      <g class="e026-drops">${Array.from({ length: Math.round(w / 9) }, (_, i) => `<path d="M${x + 4 + i * 9} ${y + 16 + (i % 4) * 22} l-3 9" stroke="#E0F2FE" stroke-width="2" stroke-linecap="round"/><path d="M${x + 8 + i * 9} ${y + 60 + (i % 3) * 20} l-3 9" stroke="#E0F2FE" stroke-width="2" stroke-linecap="round"/>`).join('')}</g></g></g>
  <path d="M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}" stroke="#fff" stroke-width="3" opacity="0.85"/>`;

/** Bong bóng nghĩ (trong lớp trước): (x, y) = giữa đáy bóng, hướng chấm nhỏ xuống đầu nhân vật ở (hx, hy). */
const thought = (cls, x, y, w, h, inner, word, hx, hy) => `<g class="e026-th ${cls}" style="transform-origin:${hx}px ${hy}px">
  <circle cx="${hx}" cy="${hy - 4}" r="3" fill="#fff" stroke="${L}"/><circle cx="${(hx * 2 + x) / 3}" cy="${(hy + y * 2) / 3 + 2}" r="5" fill="#fff" stroke="${L}"/>
  <rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" rx="${h * 0.32}" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <g transform="translate(${x} ${y - h / 2 - 6})">${inner}</g>
  <g class="e026-no"><path d="M${x - 24} ${y - h + 10} L${x + 24} ${y - 22} M${x + 24} ${y - h + 10} L${x - 24} ${y - 22}" stroke="#EF4444" stroke-width="5" stroke-linecap="round"/></g>
  ${label(x, y + 4, word, '#7C3AED', 12)}</g>`;

// Hình nhỏ trong bong bóng (gốc ở giữa)
const MINI_HOSP = `<rect x="-26" y="-18" width="52" height="36" fill="#F8FAFC" stroke="${L}"/><path d="M-30 -18 H30 L24 -26 H-24Z" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/>
  <rect x="-6" y="-14" width="12" height="12" rx="2" fill="#fff"/><path d="M0 -12 V-4 M-4 -8 H4" stroke="#EF4444" stroke-width="3"/><rect x="-6" y="4" width="12" height="14" fill="#7DD3FC" stroke="${L}" stroke-width="0.7"/>
  ${[-18, 18].map((dx) => `<rect x="${dx - 5}" y="-2" width="10" height="9" fill="#BAE6FD" stroke="${L}" stroke-width="0.6"/>`).join('')}`;
const MINI_MARKET = `<path d="M-30 -18 H30 L26 -8 H-26Z" fill="#EF4444" stroke="${L}" stroke-width="0.8"/>${[-18, -6, 6, 18].map((dx) => `<path d="M${dx - 4} -18 L${dx - 2} -8 H${dx + 4} L${dx + 6} -18Z" fill="#fff"/>`).join('')}
  <rect x="-26" y="2" width="52" height="16" fill="#D97706" stroke="${L}" stroke-width="0.8"/><path d="M-24 -8 V18 M24 -8 V18" stroke="${L}" stroke-width="1.4"/>
  ${[-16, -6, 4, 14].map((dx, i) => `<circle cx="${dx}" cy="-1" r="4.5" fill="${['#F97316', '#22C55E', '#EF4444', '#FDE047'][i]}" stroke="${L}" stroke-width="0.6"/>`).join('')}`;
const MINI_FOOT = `<rect x="-32" y="10" width="64" height="10" rx="3" fill="#4ADE80"/>
  <g transform="translate(-16 14) scale(0.32)"><circle cy="-100" r="16" fill="#FADCC4" stroke="${L}" stroke-width="2"/><path d="M-16 -104 Q0 -126 16 -104 L12 -112 L4 -108 L-2 -116 L-8 -108Z" fill="#1F1716"/><rect x="-11" y="-84" width="22" height="34" rx="5" fill="#FB923C" stroke="${L}" stroke-width="2"/><path d="M-6 -50 V-6 M6 -50 L16 -10" stroke="${L}" stroke-width="7" stroke-linecap="round"/></g>
  <g transform="translate(18 14) scale(0.32)"><circle cy="-100" r="16" fill="#FADCC4" stroke="${L}" stroke-width="2"/><path d="M-16 -100 Q0 -124 16 -100Z" fill="#E0A33A"/><rect x="-11" y="-84" width="22" height="34" rx="5" fill="#22C55E" stroke="${L}" stroke-width="2"/><path d="M-6 -50 L-14 -10 M6 -50 V-6" stroke="${L}" stroke-width="7" stroke-linecap="round"/></g>
  <g transform="translate(2 9) scale(0.5)">${BALL('#fff')}</g>`;
const MINI_MORNING = `<g transform="translate(-14 -2)"><circle r="11" fill="#FDE047" stroke="#F59E0B" stroke-width="1.4"/>${Array.from({ length: 8 }, (_, i) => `<path d="M0 -14 V-19" stroke="#FBBF24" stroke-width="2.4" stroke-linecap="round" transform="rotate(${i * 45})"/>`).join('')}</g>
  <g transform="translate(16 2)">${BOOKP}</g>`;
const MINI_PRINCESS = `<path d="M-30 18 V-4 H-22 V-12 H-16 V-4 H-8 V-14 H-2 V18Z" fill="#E9D5FF" stroke="${L}" stroke-width="0.8"/><path d="M-22 -12 L-19 -20 L-16 -12Z M-8 -14 L-5 -22 L-2 -14Z" fill="#A855F7"/>
  <g transform="translate(14 0)"><path d="M-12 20 L-6 -2 H6 L12 20Z" fill="#F472B6" stroke="${L}" stroke-width="0.8"/><circle cy="-9" r="7" fill="#FADCC4" stroke="${L}" stroke-width="0.8"/>
  <path d="M-7 -11 Q0 -20 7 -11 Q8 -2 6 2 M-7 -11 Q-8 -2 -6 2" fill="none" stroke="#FACC15" stroke-width="2.6"/><path d="M-5 -15 L-4 -20 L-1 -17 L0 -21 L1 -17 L4 -20 L5 -15Z" fill="#FACC15" stroke="${L}" stroke-width="0.6"/></g>`;
const MINI_DOGBED = `<rect x="-30" y="-10" width="60" height="6" rx="2" fill="#B45309" stroke="${L}" stroke-width="0.8"/><path d="M-24 -4 V20 M24 -4 V20" stroke="#92400E" stroke-width="4"/>
  <ellipse cx="0" cy="16" rx="18" ry="4" fill="#60A5FA" stroke="${L}" stroke-width="0.7"/><ellipse cx="-2" cy="11" rx="12" ry="6" fill="#B7794A" stroke="${L}" stroke-width="0.8"/><circle cx="9" cy="9" r="5.4" fill="#B7794A" stroke="${L}" stroke-width="0.8"/>
  <path d="M7 9 q2 1.4 4 0" stroke="${L}" stroke-width="0.8" fill="none"/><text x="18" y="0" font-family="Nunito, sans-serif" font-weight="900" font-size="9" fill="#6366F1">z z</text>`;
const MINI_BROOM = `<path d="M-14 -16 L8 10" stroke="#A16207" stroke-width="3.4" stroke-linecap="round"/><path d="M4 6 L16 0 L24 18 L10 24Z" fill="#FDE047" stroke="${L}" stroke-width="0.8"/>
  <path d="M10 8 L16 20 M14 6 L20 18" stroke="#D97706" stroke-width="1"/>`;

/** Kitty ngủ cuộn tròn (gốc giữa đáy). */
const SLEEPY_CAT = `<g class="e026-breathe" style="transform-origin:0px 0px"><path d="M-26 0 Q-28 -24 -2 -26 Q24 -26 26 0Z" fill="#fff" stroke="${L}" stroke-width="1"/>
  <path d="M22 -2 Q34 -4 30 -16 Q26 -8 14 -6" fill="#fff" stroke="${L}" stroke-width="1"/>
  <g transform="translate(-16 -12)"><path d="M-10 -6 L-9 -18 L-2 -10Z M2 -10 L9 -18 L10 -6Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M-7.6 -9 L-7.4 -15 L-3.6 -10.6Z M4 -10.6 L8 -15 L8.4 -8Z" fill="#F9A8D4"/>
  <circle r="11" fill="#fff" stroke="${L}" stroke-width="1"/><path d="M-6 0 q2.4 2 4.8 0 M2 0 q2.4 2 4.8 0" stroke="${L}" stroke-width="1.1" fill="none"/><path d="M0 3.4 l-1.4 -1.2 h2.8Z" fill="#F9A8D4"/></g>
  <rect x="-10" y="-4" width="5" height="9" rx="2" fill="#F472B6" stroke="${L}" stroke-width="0.6" transform="rotate(30 -8 0)"/></g>`;

/** Tranh Lucky Minh đang vẽ (nét hiện dần khi st-draw). */
const SKETCH = (x, y) => `<g transform="translate(${x} ${y})">
  <path d="M-6 0 L-14 34 M6 0 L14 34" stroke="#92400E" stroke-width="2.4"/>
  <rect x="-26" y="-36" width="52" height="40" rx="2" fill="#fff" stroke="${L}" stroke-width="1.2"/>
  <g class="e026-sk" fill="none" stroke="#B45309" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path pathLength="1" d="M-16 -8 Q-16 -20 0 -20 Q10 -20 12 -14 M12 -14 Q18 -24 22 -18 Q22 -10 14 -10 Q10 -4 0 -6 Q-12 -4 -16 -8 M-12 -8 V-2 M-4 -6 V-2 M6 -6 V-2 M-16 -14 Q-22 -20 -20 -26"/></g>
  <g class="e026-skc"><ellipse cx="0" cy="-13" rx="12" ry="6" fill="#B7794A" opacity="0.5"/><circle cx="16" cy="-17" r="1.4" fill="#1F2937"/><path d="M11 -22 l-3 6" stroke="#7A4B2A" stroke-width="3" stroke-linecap="round"/></g>
  <text x="0" y="0" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="7" fill="#1D4ED8" class="e026-skc">LUCKY</text></g>`;

function bg() {
  return `
  <!-- Gara -->
  <rect x="0" y="0" width="520" height="${FLOOR}" fill="#E7E5E4"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M0 ${30 + i * 28} H520" stroke="#D6D3D1" stroke-width="1"/>`).join('')}
  <rect x="0" y="${FLOOR}" width="520" height="${315 - FLOOR}" fill="#A8A29E" stroke="${L}"/>
  <rect x="0" y="0" width="1820" height="12" fill="#E9D5B5" stroke="${L}"/>
  ${win(240, 64, 90, 70, 'e026w1')}
  <g transform="translate(110 70)"><rect x="-44" y="-4" width="88" height="62" rx="5" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-44" y="-4" width="88" height="14" rx="5" fill="#3B82F6" stroke="${L}" stroke-width="1.2"/>
    <circle cx="-22" cy="-4" r="3" fill="#1F2937"/><circle cx="22" cy="-4" r="3" fill="#1F2937"/>
    <text x="0" y="40" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="14" fill="#1D4ED8">SATURDAY</text>
    <g transform="translate(0 10)"><g class="e026-fri"><rect x="-42" y="0" width="84" height="46" fill="#F8FAFC" stroke="${L}" stroke-width="0.8"/>
      <text x="0" y="30" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#475569">FRIDAY</text></g></g></g>
  <path d="M400 150 H500" stroke="#78716C" stroke-width="4" stroke-linecap="round"/>${[418, 446, 474].map((x) => `<path d="M${x} 150 v8" stroke="${L}" stroke-width="2"/>`).join('')}
  <path d="M412 158 l6 30 l6 -30" fill="#F87171" stroke="${L}" stroke-width="0.8"/><circle cx="446" cy="170" r="10" fill="none" stroke="#22C55E" stroke-width="3"/><path d="M470 158 h8 v26 h-8Z" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/>
  ${CAR(200)}
  <!-- Bếp -->
  ${room(520, 480, FLOOR, '#DCFCE7')}
  ${win(566, 70, 96, 84, 'e026w2')}
  <rect x="690" y="78" width="140" height="44" rx="4" fill="#fff" stroke="${L}"/><path d="M736 78 V122 M784 78 V122" stroke="${L}" stroke-width="0.8"/>${[712, 760, 806].map((x) => `<circle cx="${x + 6}" cy="100" r="2.4" fill="#FDE68A" stroke="${L}" stroke-width="0.5"/>`).join('')}
  <rect x="890" y="124" width="78" height="${FLOOR - 124}" rx="6" fill="#F1F5F9" stroke="${L}" stroke-width="1.2"/><path d="M890 184 H968" stroke="${L}"/><rect x="954" y="140" width="5" height="30" rx="2" fill="#94A3B8"/><rect x="954" y="196" width="5" height="40" rx="2" fill="#94A3B8"/>
  <circle cx="912" cy="150" r="5" fill="#F472B6" stroke="${L}" stroke-width="0.6"/><rect x="922" y="160" width="12" height="9" fill="#FDE047" stroke="${L}" stroke-width="0.6"/>
  <!-- Phòng khách -->
  ${room(1000, 820, FLOOR, '#FEF3C7')}
  ${Array.from({ length: 16 }, (_, i) => `<circle cx="${1020 + (i * 97) % 780}" cy="${30 + (i * 53) % 120}" r="2.4" fill="#FCD34D"/>`).join('')}
  ${win(1060, 66, 120, 110, 'e026w3')}
  <rect x="1196" y="96" width="74" height="${FLOOR - 96}" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
  ${[132, 174, 216, 258].map((y) => shelf(1200, y, 66, books(1204, y, 6))).join('')}
  <g class="e026-shelfbook"><rect x="1258" y="152" width="8" height="22" rx="1" fill="#EC4899" stroke="${L}" stroke-width="0.7"/></g>
  <path d="M1310 ${FLOOR - 70} q-26 -6 -32 -60 q-2 -16 14 -18 h36 q16 2 14 18 q-6 54 -32 60Z" fill="#A855F7" stroke="${L}" stroke-width="1.2"/>
  <rect x="1404" y="70" width="70" height="52" rx="3" fill="#fff" stroke="#B45309" stroke-width="4"/><path d="M1410 116 L1428 92 L1440 106 L1452 96 L1468 116Z" fill="#4ADE80"/><circle cx="1456" cy="84" r="6" fill="#FDE047"/>
  <rect x="1580" y="62" width="48" height="58" rx="3" fill="#fff" stroke="#B45309" stroke-width="4"/><circle cx="1604" cy="84" r="9" fill="#FADCC4" stroke="${L}" stroke-width="0.6"/><path d="M1590 116 Q1604 96 1618 116Z" fill="#60A5FA"/>
  <path d="M1640 ${FLOOR - 50} V196 Q1640 182 1656 182 H1784 Q1800 182 1800 196 V${FLOOR - 50}" fill="#22C55E" stroke="${L}" stroke-width="1.2"/>
  ${doorway(520, FLOOR)}${doorway(1000, FLOOR)}
  <rect x="1808" y="0" width="12" height="315" fill="#E9D5B5" stroke="${L}"/>`;
}

function fg() {
  // sàn nhà vẽ lại ở lớp trước: che bàn chân người đang ngồi (dáng ngồi hạ cả người xuống), người đứng chạm sàn ở đúng y = FLOOR
  return `
  <rect x="0" y="${FLOOR}" width="520" height="${315 - FLOOR}" fill="#A8A29E" stroke="${L}"/>
  <rect x="520" y="${FLOOR}" width="1300" height="${315 - FLOOR}" fill="#D9A066" stroke="${L}"/>
  ${Array.from({ length: 22 }, (_, i) => `<path d="M${520 + i * 60} ${FLOOR} V315" stroke="#B9824F" stroke-width="1.2"/>`).join('')}
  ${rug(1500, FLOOR, 260, '#FDA4AF')}
  <!-- Xô nước rửa xe -->
  <g transform="translate(360 ${FLOOR})"><path d="M-16 -30 H16 L13 0 H-13Z" fill="#38BDF8" stroke="${L}" stroke-width="1.2"/><path d="M-16 -30 Q0 -48 16 -30" stroke="${L}" stroke-width="1.4" fill="none"/>
    <ellipse cx="0" cy="-30" rx="16" ry="3.4" fill="#E0F2FE" stroke="${L}" stroke-width="0.8"/>${[-8, 0, 8].map((x) => `<circle cx="${x}" cy="-33" r="3" fill="#fff" stroke="#93C5FD" stroke-width="0.6"/>`).join('')}</g>
  <!-- Quầy bếp + bếp nấu -->
  <rect x="720" y="226" width="160" height="56" fill="#16A34A" stroke="${L}" stroke-width="1.2"/>
  <rect x="714" y="220" width="172" height="10" rx="3" fill="#F5F5F4" stroke="${L}"/>${[760, 836].map((x) => `<rect x="${x - 26}" y="236" width="52" height="38" rx="3" fill="#15803D" stroke="${L}" stroke-width="0.8"/><circle cx="${x + 18}" cy="255" r="2.4" fill="#FDE68A"/>`).join('')}
  <g transform="translate(800 208)"><path d="M-22 -6 H22 V10 Q22 14 18 14 H-18 Q-22 14 -22 10Z" fill="#94A3B8" stroke="${L}"/><path d="M-28 -2 H-22 M22 -2 H28" stroke="${L}" stroke-width="3" stroke-linecap="round"/><ellipse cx="0" cy="-6" rx="22" ry="4" fill="#FDBA74" stroke="${L}" stroke-width="0.8"/></g>
  ${steam(800, 196, 'e026-potsteam')}
  <g transform="translate(860 214)"><rect x="-8" y="-6" width="16" height="12" rx="2" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M-10 -6 H10" stroke="#3B82F6" stroke-width="2"/></g>
  <!-- Ghế bành của Lan (tay ghế, đệm trước) -->
  <rect x="1262" y="${FLOOR - 74}" width="22" height="66" rx="8" fill="#9333EA" stroke="${L}" stroke-width="1.2"/><rect x="1336" y="${FLOOR - 74}" width="22" height="66" rx="8" fill="#9333EA" stroke="${L}" stroke-width="1.2"/>
  <rect x="1276" y="${FLOOR - 44}" width="68" height="36" rx="6" fill="#A855F7" stroke="${L}" stroke-width="1.2"/>
  <path d="M1270 ${FLOOR - 8} v8 M1350 ${FLOOR - 8} v8" stroke="${L}" stroke-width="4" stroke-linecap="round"/>
  <!-- Bàn của Minh (khăn bàn che chân người ngồi) + tranh đang vẽ -->
  ${SKETCH(1524, TT - 4)}
  <path d="M1410 ${TT} H1550 V${FLOOR - 4} ${Array.from({ length: 7 }, (_, i) => `Q${1540 - i * 20} ${FLOOR + 4} ${1530 - i * 20} ${FLOOR - 4}`).join(' ')} Z" fill="#FFF7ED" stroke="${L}" stroke-width="1.1"/>
  ${Array.from({ length: 6 }, (_, i) => `<path d="M${1430 + i * 20} ${TT + 2} V${FLOOR - 4}" stroke="#93C5FD" stroke-width="3" opacity="0.7"/>`).join('')}
  <rect x="1404" y="${TT - 6}" width="152" height="8" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
  <g transform="translate(1440 ${TT - 6})">${[0, 6, 12].map((dx, i) => `<rect x="${dx}" y="-14" width="4" height="14" rx="1" fill="${['#EF4444', '#3B82F6', '#22C55E'][i]}" stroke="${L}" stroke-width="0.5"/>`).join('')}</g>
  <!-- Sô-pha (đệm, tay ghế) + Kitty ngủ -->
  <rect x="1650" y="${FLOOR - 54}" width="140" height="22" rx="8" fill="#4ADE80" stroke="${L}" stroke-width="1.2"/>
  <rect x="1650" y="${FLOOR - 34}" width="140" height="26" rx="4" fill="#16A34A" stroke="${L}" stroke-width="1.2"/>
  <rect x="1630" y="${FLOOR - 76}" width="24" height="70" rx="10" fill="#22C55E" stroke="${L}" stroke-width="1.2"/><rect x="1786" y="${FLOOR - 76}" width="24" height="70" rx="10" fill="#22C55E" stroke="${L}" stroke-width="1.2"/>
  <path d="M1660 ${FLOOR - 6} v6 M1780 ${FLOOR - 6} v6" stroke="${L}" stroke-width="4" stroke-linecap="round"/>
  <g class="e026-sleepcat" transform="translate(1726 ${FLOOR - 54})">${SLEEPY_CAT}</g>
  <!-- Bong bóng nghĩ -->
  ${thought('e026-th-hosp', 400, 112, 96, 66, MINI_HOSP, 'usually', 404, 124)}
  ${thought('e026-th-market', 800, 112, 96, 66, MINI_MARKET, 'usually', 806, 124)}
  ${thought('e026-th-morning', 1290, 140, 84, 56, MINI_MORNING, 'always', 1306, 168)}
  ${thought('e026-th-princess', 1236, 132, 92, 66, MINI_PRINCESS, 'princess', 1300, 174)}
  ${thought('e026-th-foot', 1480, 132, 96, 66, MINI_FOOT, 'usually', 1480, 182)}
  ${thought('e026-th-dog', 1600, 126, 92, 62, MINI_DOGBED, 'usually', 1612, 196)}
  ${thought('e026-th-broom', 1720, 154, 80, 58, MINI_BROOM, 'never', 1724, 200)}
  <g class="e026-lb e026-lb-home">${label(460, 196, 'at home', '#15803D', 14)}</g>
  <g class="e026-lb e026-lb-now">${label(330, 140, 'now', '#DC2626', 16)}</g>
  <g class="e026-lb e026-lb-cook">${label(690, 176, 'now', '#DC2626', 16)}</g>
  <g class="e026-lb e026-lb-rain">${label(1120, 200, 'raining', '#475569', 15)}</g>
  <g class="e026-lb e026-lb-look">${label(1470, 120, 'Look!', '#DC2626', 20)}</g>
  <g class="e026-lb e026-lb-busy">${label(1560, 112, 'busy Saturday!', '#7C3AED', 18)}</g>`;
}

const CSS = `
.e026-fri { transform-origin: 0 0; transition: transform .6s cubic-bezier(.4,0,.2,1), opacity .6s; }
.st-sat .e026-fri { transform: scaleY(0); opacity: 0; }
.e026-th { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-th-hosp .e026-th-hosp, .st-th-market .e026-th-market, .st-th-morning .e026-th-morning, .st-th-princess .e026-th-princess,
.st-th-foot .e026-th-foot, .st-th-dog .e026-th-dog, .st-th-broom .e026-th-broom { opacity: 1; transform: scale(1); }
.e026-no { opacity: 0; transition: opacity .3s; }
.st-no .e026-no { opacity: 1; }
.e026-lb { opacity: 0; transition: opacity .3s; }
.st-lb-home .e026-lb-home, .st-lb-now .e026-lb-now, .st-lb-cook .e026-lb-cook, .st-lb-rain .e026-lb-rain, .st-lb-look .e026-lb-look, .st-lb-busy .e026-lb-busy { opacity: 1; }
.e026-mud1, .e026-mud2 { transition: opacity .8s; }
.st-clean1 .e026-mud1, .st-clean2 .e026-mud2 { opacity: 0; }
.e026-shine { opacity: 0; transition: opacity .4s; }
.st-shine .e026-shine { opacity: 1; animation: e026Tw .5s ease-in-out infinite alternate; }
@keyframes e026Tw { to { opacity: .3; } }
.e026-potsteam { opacity: 0; transition: opacity .4s; }
.st-cook .e026-potsteam { opacity: 1; }
.e026-wet { opacity: 0; transition: opacity 1s; }
.st-rain .e026-wet { opacity: 1; }
.st-rain .e026-drops { animation: e026Rain .45s linear infinite; }
@keyframes e026Rain { from { transform: translate(0, -20px); } to { transform: translate(-6px, 20px); } }
.e026-shelfbook { transition: opacity .2s; }
.st-bookTaken .e026-shelfbook { opacity: 0; }
.e026-sk path { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 2.6s linear; }
.st-draw .e026-sk path { stroke-dashoffset: 0; }
.e026-skc { opacity: 0; transition: opacity .5s 2.2s; }
.st-draw .e026-skc { opacity: 1; }
.e026-sleepcat { opacity: 0; transition: opacity .4s; }
.st-catSleep .e026-sleepcat { opacity: 1; }
.e026-breathe { animation: e026Breathe 2.2s ease-in-out infinite alternate; }
@keyframes e026Breathe { to { transform: scale(1.04, 1.08); } }
.es-ac.act-e026-scrub .pp-upwR { animation: e026Scrub .22s ease-in-out infinite alternate; }
@keyframes e026Scrub { from { transform: rotate(-12deg); } to { transform: rotate(10deg); } }
@media (prefers-reduced-motion: reduce) { .e026-breathe { animation-duration: 4s; } .st-rain .e026-drops { animation-duration: 1.2s; } }
`;

const POSES = {
  e026_scrub: { R: [72, 84], L: [10, 4] },
  e026_draw: { R: [80, 140], L: [40, 110], dy: 20, head: 6 },
};

/** Bong bóng nghĩ hiện một lúc rồi (tuỳ) gạch chéo. */
async function think(st, name, ms = 1800) {
  st.set(`st-th-${name}`);
  await st.wait(ms);
}

const BEATS = [
  { key: ['Every Saturday', 'different things'], icon: '📅', label: 'every Saturday', async play(st) {
    st.look(250);
    await st.wait(500);
    st.set('st-sat'); st.sfx('page-turn');
    st.fx('sparkle', 110, 100);
    await st.wait(900);
    await st.camTo(1330, { dur: 2600 });
    st.fx('sparkle', 1420, 150);
    await st.wait(300);
  } },
  { key: ['usually works at the hospital', 'staying at home'], icon: '🏥', label: 'staying at home', async play(st) {
    await st.look(330, { dur: 900 });
    await think(st, 'hosp', 1500);
    st.set('st-no'); st.mood('dad', 'joy');
    await st.wait(900);
    st.set('st-th-hosp', false); st.set('st-no', false);
    st.set('st-lb-home'); st.pose('dad', 'open'); st.fx('sparkle', 460, 196);
    await st.wait(1300);
    st.set('st-lb-home', false); st.pose('dad', 'stand'); st.mood('dad', 'happy');
  } },
  { key: ['cleaning the car'], icon: '🚗', label: 'cleaning the car', async play(st) {
    await st.walk('dad', 140, { speed: 120, lead: 60 });
    st.set('st-lb-now');
    st.hold('dad', 'e026_sponge'); st.pose('dad', 'e026_scrub');
    await st.wait(300);
    st.act('dad', 'e026-scrub'); st.sfx('tap-water', { vol: 0.5 });
    st.fx('bubbles', 190, 186);
    await st.wait(700);
    st.set('st-clean1'); st.fx('bubbles', 186, 196);
    await st.wait(700);
    st.act('dad', null); st.pose('dad', 'stand');
    await st.walk('dad', 236, { speed: 110, follow: false });
    st.pose('dad', 'e026_scrub');
    await st.wait(250);
    st.act('dad', 'e026-scrub');
    st.fx('bubbles', 286, 196);
    await st.wait(700);
    st.set('st-clean2'); st.set('st-shine'); st.sfx('sparkle');
    st.act('dad', null); st.pose('dad', 'stand'); st.mood('dad', 'joy');
    await st.wait(600);
    st.set('st-shine', false); st.set('st-lb-now', false); st.mood('dad', 'happy');
  } },
  { key: ['usually goes to the market'], icon: '🛒', label: 'market', async play(st) {
    st.hold('dad', null);
    await st.look(800, { dur: 1000 });
    await think(st, 'market', 2200);
  } },
  { key: ['cooking lunch in the kitchen'], icon: '🍳', label: 'cooking lunch', async play(st) {
    st.set('st-th-market', false);
    st.set('st-lb-cook'); st.set('st-cook'); st.sfx('pot-stir');
    st.hold('mum', 'spoon'); st.pose('mum', 'stir'); st.act('mum', 'stir');
    st.act('lucky', 'wag');
    await st.wait(2200);
    st.act('mum', null); st.mood('mum', 'joy');
    await st.wait(300);
    st.set('st-lb-cook', false); st.mood('mum', 'happy');
  } },
  { key: ['always reads on Saturday morning'], icon: '☀️', label: 'always reads', async play(st) {
    st.hold('mum', null); st.pose('mum', 'stand');
    await st.look(1300, { dur: 1000 });
    await st.walk('lan', 1236, { speed: 120, follow: false });
    st.pose('lan', 'reach');
    await st.wait(300);
    st.set('st-bookTaken');
    st.pose('lan', 'stand'); st.chest('lan', 'book');
    await st.walk('lan', 1310, { speed: 110, follow: false });
    st.pose('lan', 'read');
    await think(st, 'morning', 1400);
  } },
  { key: ['reading a story about a princess'], icon: '👸', label: 'princess story', async play(st) {
    st.set('st-th-morning', false);
    st.act('lan', 'read'); st.sfx('page-turn'); st.mood('lan', 'joy');
    await st.wait(500);
    await think(st, 'princess', 1800);
    st.mood('lan', 'happy');
  } },
  { key: ['usually plays football with Tom'], icon: '⚽', label: 'football', async play(st) {
    st.set('st-th-princess', false);
    await st.look(1470, { dur: 900 });
    await think(st, 'foot', 2200);
  } },
  { key: ['it is raining'], icon: '🌧️', label: 'raining', async play(st) {
    st.set('st-th-foot', false);
    st.pose('minh', 'stand');
    await st.wait(300);
    await st.walk('minh', 1120, { speed: 130, lead: 80 });
    st.set('st-rain'); st.sfx('rain'); st.set('st-lb-rain');
    st.pose('minh', 'sad'); st.mood('minh', 'wow');
    await st.wait(1600);
    st.set('st-lb-rain', false); st.mood('minh', 'happy');
  } },
  { key: ['drawing a picture of Lucky'], icon: '🖍️', label: 'drawing Lucky', async play(st) {
    st.pose('minh', 'stand');
    await st.walk('minh', 1480, { speed: 140, lead: 20 });
    st.pose('minh', 'sit');
    await st.wait(350);
    st.hold('minh', 'pencil'); st.pose('minh', 'e026_draw');
    await st.wait(300);
    st.act('minh', 'write'); st.set('st-draw');
    await st.wait(2600);
    st.act('minh', null); st.mood('minh', 'joy');
    await st.wait(300);
    st.mood('minh', 'happy');
  } },
  { key: ['usually sleeps under the table'], icon: '🛏️', label: 'under the table', async play(st) {
    st.look(1520);
    await think(st, 'dog', 2200);
  } },
  { key: ['But look'], icon: '👀', label: 'look!', async play(st) {
    st.set('st-th-dog', false);
    st.set('st-lb-look');
    st.mood('minh', 'wow'); st.mood('lan', 'wow');
    st.dog('lucky', 'stand'); st.mood('lucky', 'joy');
    await st.walk('lucky', 1596, { speed: 240, follow: false });
    st.mood('lan', 'happy');
  } },
  { key: ['sitting next to Minh'], icon: '🐶', label: 'next to Minh', async play(st) {
    st.set('st-lb-look', false);
    await st.walk('lucky', 1590, { speed: 40, follow: false });
    st.dog('lucky', 'sit'); st.act('lucky', 'wag'); st.sfx('dog-bark', { vol: 0.6 });
    st.mood('minh', 'joy');
    st.fx('hearts', 1560, 170);
    await st.wait(1300);
    st.mood('minh', 'happy');
  } },
  { key: ['Kitty never helps'], icon: '🐱', label: 'never helps', async play(st) {
    await st.look(1680, { dur: 700 });
    await think(st, 'broom', 600);
    st.set('st-no');
    await st.wait(1400);
  } },
  { key: ['sleeping on the sofa'], icon: '😴', label: 'on the sofa', async play(st) {
    st.set('st-th-broom', false); st.set('st-no', false);
    st.show('kitty', false); st.set('st-catSleep');
    await st.wait(400);
    st.fx('zzz', 1716, 214);
    await st.wait(1800);
  } },
  { key: ['What a busy Saturday'], icon: '🎉', label: 'busy Saturday', async play(st) {
    st.hold('dad', 'e026_sponge'); st.pose('dad', 'e026_scrub'); st.act('dad', 'e026-scrub');
    st.hold('mum', 'spoon'); st.pose('mum', 'stir'); st.act('mum', 'stir');
    st.act('lan', 'read'); st.act('minh', 'write'); st.act('lucky', 'wag');
    await st.look(260, { dur: 900 });
    st.fx('sparkle', 236, 160);
    await st.camTo(1330, { dur: 3000 });
    st.set('st-lb-busy');
    st.fx('hearts', 1400, 150);
    await st.wait(900);
    for (const id of ['dad', 'mum', 'lan', 'minh', 'lucky']) st.act(id, null);
    st.pose('dad', 'stand'); st.pose('mum', 'stand');
  } },
];

export default {
  id: 'en026', worldW: 1820, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  props: { e026_sponge: SPONGE },
  cast: [
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 404, s: 0.95 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 806, s: 0.95 },
    { id: 'lucky', kind: 'dog', x: 1000, s: 0.9 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 1376, s: 1.08, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 1480 },
    { id: 'kitty', kind: 'cat', x: 1724, y: FLOOR - 52, s: 0.95, face: -1 },
  ],
  init(st) {
    st.dog('lucky', 'sit'); st.dog('kitty', 'sit');
    st.pose('minh', 'sit');
  },
};
