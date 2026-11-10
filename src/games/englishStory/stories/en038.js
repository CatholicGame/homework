/**
 * Bài 38 "My Hobbies": sân bóng cạnh trường (Minh, Tom) → nhà cắt ngang: phòng khách (giá vẽ, Lucky làm mẫu) · góc đọc sách (Lan)
 * · bếp (Lan nấu với mẹ, mẹ hát) → vườn sau nhà (ông tưới rau, bà ngồi ghế xem, Kitty ngủ nắng) → hồ (bố câu cá).
 * Toạ độ cảnh: rộng 2900, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, sky, cloud, tree, bush, flowerAt, sun, label, schoolFront, room, doorway, windowBox, shelf, books, rug, fence, steam } from '../kit.js';

const FLOOR = 282;
const SKIN = '#FDDCB5';

// ── Biểu tượng nhỏ (gốc ở giữa) ─────────────────────────────────────────────
const I_BALL = `<circle r="7" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M0 -2.6 l2.5 1.8 -1 3 h-3 l-1 -3Z" fill="#1F2937"/>`;
const I_PENCIL = `<g transform="rotate(40)"><rect x="-2.2" y="-9" width="4.4" height="14" fill="#FACC15" stroke="${L}" stroke-width="0.7"/><path d="M-2.2 5 L0 10 L2.2 5Z" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/><rect x="-2.2" y="-11" width="4.4" height="3" fill="#F472B6" stroke="${L}" stroke-width="0.6"/></g>`;
const I_BOOK = `<rect x="-9" y="-6" width="18" height="12" rx="1" fill="#2563EB" stroke="${L}" stroke-width="0.8"/><rect x="-8" y="-5" width="16" height="10" fill="#fff"/><path d="M0 -5 V5" stroke="${L}" stroke-width="0.7"/>`;
const I_NOTE = (c = '#7C3AED') => `<path d="M-2 5 V-8 L7 -10 V3" stroke="${c}" stroke-width="2" fill="none" stroke-linejoin="round"/><ellipse cx="-4.4" cy="5.4" rx="3.4" ry="2.6" fill="${c}"/><ellipse cx="4.6" cy="3.4" rx="3.4" ry="2.6" fill="${c}"/>`;
const I_CARROT = `<path d="M-3 -4 L3 -4 L0 10Z" fill="#F97316" stroke="${L}" stroke-width="0.7"/><path d="M0 -4 l-4 -6 M0 -4 l0 -7 M0 -4 l4 -6" stroke="#16A34A" stroke-width="1.8" stroke-linecap="round"/>`;
const I_FISH = `<path d="M-8 0 Q-2 -6 5 0 Q-2 6 -8 0Z M5 0 l5 -4 v8Z" fill="#38BDF8" stroke="${L}" stroke-width="0.8"/><circle cx="-4" cy="-1" r="0.9" fill="#1F2937"/>`;

/** Đám mây ý nghĩ "nhiều sở thích" (gốc = đáy đuôi mây, đặt trên đầu người). */
const HOBBY_CLOUD = `<g class="e038-float">
  <circle cx="-6" cy="-4" r="4" fill="#fff" stroke="${L}" stroke-width="0.9"/><circle cx="-14" cy="-14" r="6" fill="#fff" stroke="${L}" stroke-width="0.9"/>
  <path d="M-70 -46 Q-80 -70 -56 -74 Q-48 -94 -20 -88 Q0 -102 24 -88 Q50 -96 60 -74 Q82 -70 72 -48 Q78 -26 52 -26 Q30 -16 6 -26 Q-20 -16 -40 -26 Q-74 -24 -70 -46Z" fill="#fff" stroke="${L}" stroke-width="1.2"/>
  ${[[-46, -58, I_BALL], [-22, -70, I_PENCIL], [2, -56, I_BOOK], [26, -72, I_NOTE()], [48, -54, I_CARROT], [-6, -38, I_FISH]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(1.25)">${s}</g>`).join('')}
</g>`;
/** Đám mây hỏi bé ở cuối truyện (cùng hình, thêm dấu hỏi to). */
const ASK_CLOUD = `<g class="e038-float">
  <circle cx="-6" cy="-4" r="4" fill="#fff" stroke="${L}" stroke-width="0.9"/><circle cx="-14" cy="-14" r="6" fill="#fff" stroke="${L}" stroke-width="0.9"/>
  <path d="M-84 -46 Q-96 -72 -66 -78 Q-56 -100 -24 -92 Q0 -108 28 -92 Q58 -100 70 -76 Q96 -72 86 -48 Q92 -24 60 -24 Q34 -14 6 -24 Q-24 -14 -48 -24 Q-88 -22 -84 -46Z" fill="#fff" stroke="${L}" stroke-width="1.2"/>
  ${[[-62, -56, I_BALL], [-40, -72, I_PENCIL], [-38, -40, I_BOOK], [40, -72, I_NOTE('#DB2777')], [64, -54, I_CARROT], [40, -38, I_FISH]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(1.25)">${s}</g>`).join('')}
  <text x="0" y="-38" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="40" fill="#F97316" stroke="${L}" stroke-width="1">?</text>
</g>`;
/** Bóng (gốc = điểm chạm đất), lăn khi đi. */
const BALL_T = `<g class="e038-roll" style="transform-origin:0px -8px"><g transform="translate(0 -8)"><circle r="8" fill="#fff" stroke="${L}"/>
  <path d="M0 -3.2 l3 2.2 -1.2 3.6 h-3.6 l-1.2 -3.6Z" fill="#1F2937"/><path d="M0 -3.2 V-8 M3 -1 L7.6 -2.3 M1.8 2.6 L4.6 6.4 M-1.8 2.6 L-4.6 6.4 M-3 -1 L-7.6 -2.3" stroke="#1F2937" stroke-width="0.8"/></g></g>`;
/** Bóng tennis nhỏ của Lucky. */
const TBALL_T = `<g class="e038-roll" style="transform-origin:0px -5px"><g transform="translate(0 -5)"><circle r="5" fill="#D9F99D" stroke="${L}" stroke-width="0.9"/><path d="M-4 -3 Q0 0 -4 3 M4 -3 Q0 0 4 3" stroke="#fff" stroke-width="1" fill="none"/></g></g>`;
const TBALL = `<circle r="5" fill="#D9F99D" stroke="${L}" stroke-width="0.9"/><path d="M-4 -3 Q0 0 -4 3 M4 -3 Q0 0 4 3" stroke="#fff" stroke-width="1" fill="none"/>`;
/** Kitty ngủ cuộn tròn trên tấm thảm (gốc = mặt đất). */
const SLEEP_CAT = `<ellipse cx="0" cy="-3" rx="30" ry="5" fill="#FDA4AF" stroke="${L}" stroke-width="0.9"/>
  <g class="e038-breathe" style="transform-origin:0px -4px"><path d="M-20 -4 Q-22 -26 2 -27 Q22 -27 22 -4Z" fill="#fff" stroke="${L}" stroke-width="1"/>
  <path d="M20 -5 Q30 -6 27 -17 Q23 -10 13 -8" fill="#fff" stroke="${L}" stroke-width="1"/>
  <g transform="translate(-13 -13)"><path d="M-9 -5 L-8 -16 L-2 -9Z M2 -9 L8 -16 L9 -5Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M-7 -8 L-6.6 -13 L-3.6 -9.6Z M3.6 -9.6 L6.6 -13 L7 -8Z" fill="#F9A8D4"/>
  <circle r="10" fill="#fff" stroke="${L}" stroke-width="1"/><path d="M-6 0 q2.2 1.8 4.4 0 M1.6 0 q2.2 1.8 4.4 0" stroke="${L}" stroke-width="1.1" fill="none"/><path d="M0 3 l-1.3 -1.1 h2.6Z" fill="#F9A8D4"/>
  <rect x="5" y="5" width="3.6" height="6" rx="1.6" fill="#F472B6" stroke="${L}" stroke-width="0.5"/></g></g>`;
/** Cần câu dựa vào ghế (trước khi bố tới). */
const ROD_T = `<path d="M0 0 L26 -118" stroke="#92400E" stroke-width="2.4" stroke-linecap="round"/><circle cx="4" cy="-16" r="4" fill="#64748B" stroke="${L}" stroke-width="0.7"/>`;
const NOTE_FLY = (c) => `<g transform="scale(1.4)">${I_NOTE(c)}</g>`;

const POSES = {
  e038_kick: { R: [-20, -30], L: [40, 60] },
  e038_draw: { R: [70, 120], L: [16, -40], head: 4 },
  e038_sing: { R: [16, 168], L: [60, 140], head: -4 },
  e038_fish: { R: [60, 128], L: [16, 20], dy: 20 },
  e038_water: { R: [70, 92], L: [10, 4], head: 6 },
  e038_watch: { R: [40, 110], L: [40, 110], dy: 20, head: -8 },
  e038_ask: { R: [55, 40], L: [55, 40], head: -4 },
};
const PROPS = {
  // micro = cái muôi của mẹ (mẹ hát vào cái muôi)
  e038_mic: `<g><path d="M0 -2 V8" stroke="#94A3B8" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="0" cy="12" rx="4.4" ry="5" fill="#CBD5E1" stroke="#64748B" stroke-width="0.8"/></g>`,
  // bình tưới cầm ngang (tư thế e038_water: cẳng tay chỉ sang phải, nên vẽ theo hướng màn hình rồi xoay 90°)
  e038_can: `<g transform="rotate(90)"><path d="M-4 2 Q0 -6 6 2" stroke="${L}" stroke-width="1.4" fill="none"/><rect x="-8" y="2" width="18" height="16" rx="3" fill="#22C55E" stroke="${L}" stroke-width="0.9"/>
    <path d="M9 12 L22 22" stroke="${L}" stroke-width="4" stroke-linecap="round"/><path d="M9 12 L22 22" stroke="#22C55E" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="23" cy="23" rx="2" ry="3.4" fill="#16A34A" stroke="${L}" stroke-width="0.6" transform="rotate(50 23 23)"/></g>`,
};

function bg() {
  const field = Array.from({ length: 8 }, (_, i) => `<rect x="${260 + i * 60}" y="${FLOOR - 30}" width="30" height="38" fill="#22C55E" opacity="0.35"/>`).join('');
  return `
  ${sky(0, 2900, 315, 'e038sky')}
  ${cloud(120, 54, 0.9, 0)}${cloud(560, 70, 1, 2)}${cloud(1960, 56, 1, 1)}${cloud(2420, 66, 0.9, 3)}${cloud(2760, 48, 0.8, 5)}
  <!-- Sân bóng cạnh trường -->
  <path d="M0 230 Q200 206 420 226 T800 222 V282 H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(470, 232, 0.8)}${tree(720, 230, 0.7, '#F59E0B')}
  ${schoolFront(130, FLOOR)}
  <rect x="0" y="${FLOOR - 4}" width="800" height="40" fill="#4ADE80" stroke="${L}"/>
  <rect x="230" y="${FLOOR - 30}" width="540" height="32" fill="#4ADE80"/>${field}
  <path d="M240 ${FLOOR - 28} H770" stroke="#fff" stroke-width="2"/>
  <g class="e038-lb e038-lb-after">${label(520, 96, 'after school', '#1D4ED8', 15)}</g>
  <g class="e038-lb e038-lb-every">${label(520, 124, 'every day', '#B45309', 13)}</g>
  ${fence(770, 50, FLOOR)}
  <!-- Nhà cắt ngang -->
  ${room(820, 360, FLOOR, '#FEF3C7')}
  ${room(1180, 260, FLOOR, '#E0F2FE', '#C08B5C')}
  ${room(1440, 320, FLOOR, '#DCFCE7')}
  <rect x="814" y="0" width="8" height="${FLOOR}" fill="#C08B5C" stroke="${L}"/>
  ${doorway(1180, FLOOR)}${doorway(1440, FLOOR)}
  <!-- Phòng khách: cửa sổ, giá vẽ, đệm của Lucky -->
  ${windowBox(860, 60, 90, 78)}
  ${rug(1040, FLOOR, 150, '#FDE68A')}
  <g transform="translate(1000 0)">
    <path d="M-20 ${FLOOR} L-4 140 M20 ${FLOOR} L4 140 M0 150 L6 ${FLOOR}" stroke="#92400E" stroke-width="4" stroke-linecap="round"/>
    <rect x="-30" y="150" width="60" height="56" rx="2" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <rect x="-34" y="204" width="68" height="6" rx="2" fill="#B45309" stroke="${L}"/>
    <g class="e038-pageA">
      <path class="e038-ink" pathLength="1" d="M-14 170 m-7 0 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0" stroke="#F59E0B" stroke-width="2.4" fill="#FDE68A"/>
      <path class="e038-ink" pathLength="1" d="M2 198 V182 L12 172 L22 182 V198Z" stroke="#EF4444" stroke-width="2" fill="none" style="transition-delay:.3s"/>
      <path class="e038-ink" pathLength="1" d="M-26 198 H26" stroke="#22C55E" stroke-width="2.4" style="transition-delay:.6s"/>
    </g>
    <g class="e038-pageB">
      <path class="e038-ink2" pathLength="1" d="M-16 192 Q-18 178 -4 178 L10 178 Q16 178 16 186 L16 194" stroke="${L}" stroke-width="1.8" fill="#E9B98C"/>
      <path class="e038-ink2" pathLength="1" d="M10 178 m-8 -6 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0" stroke="${L}" stroke-width="1.8" fill="#E9B98C" style="transition-delay:.25s"/>
      <path class="e038-ink2" pathLength="1" d="M-12 192 V200 M-4 192 V200 M8 192 V200 M14 192 V200 M-16 182 Q-24 176 -22 168" stroke="${L}" stroke-width="1.8" fill="none" style="transition-delay:.5s"/>
      <g class="e038-dogface"><circle cx="14" cy="170" r="1.4" fill="#1F2937"/><circle cx="21" cy="173" r="1.6" fill="#1F2937"/><path d="M4 166 q-4 6 -1 10" stroke="${L}" stroke-width="1.6" fill="#7A4B2A"/>
        <path d="M-18 156 l2 4 4 0 -3 3 1 4 -4 -2 -4 2 1 -4 -3 -3 4 0Z" fill="#FACC15"/></g>
    </g>
  </g>
  <g transform="translate(1104 ${FLOOR})"><ellipse cx="0" cy="-5" rx="26" ry="7" fill="#F472B6" stroke="${L}"/><ellipse cx="0" cy="-8" rx="20" ry="4" fill="#F9A8D4"/></g>
  <g class="e038-lb e038-lb-model">${label(1104, 150, 'model', '#B45309', 15)}</g>
  <!-- Góc đọc sách: kệ sách, ghế sô-pha -->
  ${shelf(1210, 96, 90, books(1214, 96, 9))}${shelf(1210, 134, 90, books(1218, 134, 7))}
  ${windowBox(1340, 60, 70, 70)}
  <g transform="translate(1310 0)"><rect x="-52" y="218" width="104" height="38" rx="10" fill="#A78BFA" stroke="${L}" stroke-width="1.2"/>
    <rect x="-46" y="244" width="92" height="14" rx="5" fill="#C4B5FD" stroke="${L}"/></g>
  <g transform="translate(1310 104)"><g class="e038-dream">
    <circle cx="-8" cy="56" r="3.6" fill="#fff" stroke="${L}" stroke-width="0.8"/><circle cx="-14" cy="46" r="5" fill="#fff" stroke="${L}" stroke-width="0.8"/>
    <path d="M-80 0 Q-92 -26 -64 -32 Q-56 -56 -24 -50 Q0 -64 26 -50 Q56 -58 66 -34 Q92 -28 82 0 Q88 26 58 26 Q30 38 2 28 Q-26 38 -50 26 Q-86 28 -80 0Z" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <!-- lâu đài + công chúa -->
    <g transform="translate(-44 18)"><rect x="-18" y="-30" width="36" height="30" fill="#FBCFE8" stroke="${L}" stroke-width="0.8"/><rect x="-24" y="-40" width="12" height="40" fill="#F9A8D4" stroke="${L}" stroke-width="0.8"/><rect x="12" y="-40" width="12" height="40" fill="#F9A8D4" stroke="${L}" stroke-width="0.8"/>
      <path d="M-25 -40 L-18 -52 L-11 -40Z M11 -40 L18 -52 L25 -40Z" fill="#A855F7" stroke="${L}" stroke-width="0.8"/><path d="M-5 0 V-12 Q0 -18 5 -12 V0Z" fill="#7C3AED"/></g>
    <g transform="translate(-10 20)"><path d="M-9 0 L0 -22 L9 0Z" fill="#F472B6" stroke="${L}" stroke-width="0.8"/><circle cy="-26" r="6" fill="${SKIN}" stroke="${L}" stroke-width="0.8"/>
      <path d="M-6 -28 Q-7 -20 -8 -16 M6 -28 Q7 -20 8 -16" stroke="#FACC15" stroke-width="3" fill="none"/><path d="M-5 -31 L-4 -37 L-1.4 -33 L0 -38 L1.4 -33 L4 -37 L5 -31Z" fill="#FACC15" stroke="${L}" stroke-width="0.5"/>
      <circle cx="-2" cy="-26" r="0.8" fill="#1F2937"/><circle cx="2" cy="-26" r="0.8" fill="#1F2937"/></g>
    <!-- rồng -->
    <g transform="translate(40 10)"><g class="e038-dragon">
      <path d="M-24 8 Q-30 -4 -18 -4 Q-6 -6 4 -10 Q10 -22 18 -18 Q26 -16 22 -8 Q16 0 10 6 Q0 14 -24 8Z" fill="#4ADE80" stroke="${L}" stroke-width="0.9"/>
      <path d="M-10 -6 L-4 -26 L4 -10Z" fill="#86EFAC" stroke="${L}" stroke-width="0.8"/><path d="M-24 8 Q-36 6 -38 -4" stroke="#4ADE80" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="17" cy="-14" r="1.4" fill="#1F2937"/><path d="M-14 -4 l2 -5 2 5 M-6 -8 l2 -5 2 5" stroke="#16A34A" stroke-width="1" fill="none"/>
      <g class="e038-fire"><path d="M24 -10 Q34 -18 42 -10 Q36 -8 42 -4 Q32 -2 24 -8Z" fill="#F97316" stroke="#DC2626" stroke-width="0.6"/></g></g></g>
  </g></g>
  <!-- Bếp: tủ, bếp, nồi, kệ với đài cũ -->
  ${windowBox(1470, 56, 70, 64)}
  <rect x="1500" y="196" width="160" height="${FLOOR - 196}" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/>
  <rect x="1494" y="190" width="172" height="8" rx="2" fill="#E5E7EB" stroke="${L}"/>
  ${[1520, 1580].map((x) => `<rect x="${x}" y="210" width="50" height="60" rx="3" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/><circle cx="${x + 25}" cy="222" r="2" fill="${L}"/>`).join('')}
  <g transform="translate(1560 190)"><rect x="-24" y="-6" width="48" height="6" rx="2" fill="#475569" stroke="${L}" stroke-width="0.8"/>
    <path d="M-17 -6 V-26 H17 V-6Z" fill="#94A3B8" stroke="${L}" stroke-width="1"/><path d="M-17 -26 H17" stroke="${L}" stroke-width="2"/><path d="M-22 -22 H-17 M17 -22 H22" stroke="${L}" stroke-width="2.4"/></g>
  <g class="e038-steam">${steam(1560, 158)}</g>
  ${shelf(1600, 120, 120, '')}
  <g transform="translate(1690 120)"><g class="e038-radio"><rect x="-22" y="-26" width="44" height="26" rx="4" fill="#B45309" stroke="${L}" stroke-width="1"/>
    <circle cx="-9" cy="-13" r="8" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>${[-4, 0, 4].map((d) => `<path d="M-15 ${-13 + d} H-3" stroke="#B45309" stroke-width="0.8"/>`).join('')}
    <rect x="4" y="-22" width="14" height="6" rx="1" fill="#E0F2FE" stroke="${L}" stroke-width="0.6"/><circle cx="8" cy="-8" r="2.4" fill="#1F2937"/><circle cx="15" cy="-8" r="2.4" fill="#1F2937"/>
    <path d="M14 -26 L22 -40" stroke="${L}" stroke-width="1.4"/></g></g>
  <g transform="translate(1630 120)">${[0, 1, 2].map((i) => `<rect x="${-22 + i * 12}" y="-16" width="9" height="16" rx="2" fill="${['#F87171', '#FBBF24', '#60A5FA'][i]}" stroke="${L}" stroke-width="0.7"/>`).join('')}</g>
  <g class="e038-lb e038-lb-songs">${label(1640, 86, 'old songs', '#7C3AED', 15)}</g>
  <!-- Cửa sau ra vườn -->
  <rect x="1756" y="120" width="10" height="${FLOOR - 120}" fill="#C08B5C" stroke="${L}"/>
  <!-- Vườn -->
  <path d="M1766 224 Q1900 196 2060 220 T2340 214 T2620 222 T2900 214 V282 H1766Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <polygon class="e038-beam" points="2284,92 2316,96 2204,${FLOOR - 4} 2116,${FLOOR - 4}" fill="#FEF08A"/>
  ${tree(2330, 232, 0.9, '#F59E0B')}
  <rect x="1766" y="${FLOOR - 4}" width="1134" height="40" fill="#4ADE80" stroke="${L}"/>
  ${Array.from({ length: 24 }, (_, i) => `<path d="M${1790 + i * 46} ${FLOOR + 12} l3 -7 l3 7" stroke="#16A34A" stroke-width="1.4" fill="none"/>`).join('')}
  <!-- Luống rau -->
  <rect x="1860" y="${FLOOR - 12}" width="150" height="14" rx="6" fill="#92400E" stroke="${L}"/>
  ${[1878, 1910, 1942, 1974].map((x, i) => `<g transform="translate(${x} ${FLOOR - 10})"><g class="e038-veg" style="transition-delay:${i * 0.18}s">${i % 2
    ? `<circle cx="0" cy="-10" r="10" fill="#86EFAC" stroke="${L}" stroke-width="0.9"/><path d="M-6 -10 Q0 -4 6 -10 M0 -18 V-4" stroke="#16A34A" stroke-width="1" fill="none"/>`
    : `<path d="M0 0 l-5 -16 M0 0 l0 -20 M0 0 l5 -16" stroke="#16A34A" stroke-width="3" stroke-linecap="round"/><path d="M-3 0 h6 l-3 8Z" fill="#F97316" stroke="${L}" stroke-width="0.6"/>`}</g></g>`).join('')}
  <g transform="translate(1992 ${FLOOR - 8})"><path d="M0 0 V-40" stroke="#A16207" stroke-width="2"/><g class="e038-veg" style="transition-delay:.7s"><path d="M0 -8 q-8 -6 -2 -14 M0 -20 q8 -6 2 -14" stroke="#16A34A" stroke-width="2" fill="none"/>
    <circle cx="-5" cy="-14" r="4" fill="#EF4444" stroke="${L}" stroke-width="0.7"/><circle cx="5" cy="-27" r="4" fill="#EF4444" stroke="${L}" stroke-width="0.7"/></g></g>
  <g class="e038-lb e038-lb-veg">${label(1930, 150, 'vegetables', '#15803D', 14)}</g>
  <!-- Ghế bà ngồi -->
  <g transform="translate(2080 0)"><rect x="-34" y="184" width="68" height="8" rx="3" fill="#B45309" stroke="${L}"/><rect x="-34" y="198" width="68" height="8" rx="3" fill="#B45309" stroke="${L}"/>
    <rect x="-38" y="220" width="76" height="8" rx="3" fill="#D97706" stroke="${L}"/><path d="M-30 184 V282 M30 184 V282" stroke="#475569" stroke-width="4"/></g>
  <g class="e038-lb e038-lb-q">${label(2160, 140, 'Lucky?', '#B45309', 18)}</g>
  <!-- Hồ -->
  <path d="M2420 240 Q2450 230 2490 232 H2900 V286 H2420Z" fill="#38BDF8" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: 10 }, (_, i) => `<path d="M${2500 + i * 40} ${246 + (i % 3) * 10} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <path d="M2420 280 Q2600 270 2900 282 V290 H2420Z" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>
  <!-- Ghế đẩu của bố -->
  <g transform="translate(2470 0)"><rect x="-18" y="218" width="36" height="7" rx="3" fill="#2563EB" stroke="${L}"/><path d="M-14 225 L12 ${FLOOR} M14 225 L-12 ${FLOOR}" stroke="#475569" stroke-width="3"/></g>
  <g class="e038-rod"><path d="M2516 184 L2612 116" stroke="#92400E" stroke-width="2.4" stroke-linecap="round"/><circle cx="2524" cy="179" r="4" fill="#64748B" stroke="${L}" stroke-width="0.7"/>
    <path class="e038-line" d="M2612 116 V250" stroke="#475569" stroke-width="0.8"/>
    <g class="e038-bob"><circle cx="2612" cy="252" r="3.6" fill="#EF4444" stroke="${L}" stroke-width="0.7"/><path d="M2608.4 252 h7.2" stroke="#fff" stroke-width="1.6"/></g></g>
  <g class="e038-fishjump" transform="translate(2660 262)"><g class="e038-fishj"><g transform="scale(1.6) rotate(-30)">${I_FISH}</g></g></g>
  <g transform="translate(2404 96)" class="e038-lb e038-lb-sun">
    <rect x="-46" y="-30" width="92" height="56" rx="5" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-46" y="-30" width="92" height="14" rx="5" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    <circle cx="-24" cy="-30" r="3" fill="#1F2937"/><circle cx="24" cy="-30" r="3" fill="#1F2937"/>
    <text x="0" y="4" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#DC2626">SUNDAY</text>
    <text x="0" y="20" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="11" fill="#475569">morning</text></g>
  <g transform="translate(2300 74)"><g class="e038-msun"><g class="e038-sun">${sun(22)}</g></g></g>`;
}

function fg() {
  return `
  <!-- Khung thành -->
  <g transform="translate(722 0)"><path d="M0 ${FLOOR} V214 L30 222 V${FLOOR}" stroke="#fff" stroke-width="4" fill="none" stroke-linejoin="round"/><path d="M0 ${FLOOR} V214 L30 222 V${FLOOR}" stroke="${L}" stroke-width="0.8" fill="none"/>
    ${[0, 1, 2, 3, 4].map((i) => `<path d="M0 ${226 + i * 12} L30 ${232 + i * 10}" stroke="#E2E8F0" stroke-width="1"/>`).join('')}</g>
  <!-- Mặt trước sô-pha (che chân Lan khi ngồi) -->
  <g transform="translate(1310 0)"><rect x="-58" y="252" width="116" height="26" rx="8" fill="#8B5CF6" stroke="${L}" stroke-width="1.2"/>
    <rect x="-62" y="226" width="16" height="52" rx="7" fill="#A78BFA" stroke="${L}"/><rect x="46" y="226" width="16" height="52" rx="7" fill="#A78BFA" stroke="${L}"/></g>
  <!-- Mặt trước ghế bà + bụi hoa -->
  <g transform="translate(2080 0)"><rect x="-40" y="230" width="80" height="9" rx="3" fill="#D97706" stroke="${L}"/>${bush(-18, FLOOR + 6, 1, '#4ADE80')}${bush(22, FLOOR + 8, 0.9)}</g>
  ${Array.from({ length: 5 }, (_, i) => flowerAt(2030 + i * 9, FLOOR + 4, ['#F472B6', '#FACC15', '#F87171'][i % 3])).join('')}
  <!-- Lau sậy bờ hồ (che chân bố khi ngồi) -->
  <g transform="translate(2470 0)">${bush(-14, FLOOR + 8, 1.1, '#22C55E')}${bush(20, FLOOR + 10, 1, '#4ADE80')}
    ${[-30, -20, 30, 40].map((x) => `<path d="M${x} ${FLOOR + 4} q-4 -30 2 -50" stroke="#15803D" stroke-width="2.4" fill="none"/><ellipse cx="${x + 2}" cy="${FLOOR - 48}" rx="2.6" ry="7" fill="#92400E"/>`).join('')}</g>`;
}

const CSS = `
.e038-float { animation: e038Float 1.8s ease-in-out infinite alternate; }
@keyframes e038Float { to { transform: translateY(-3px); } }
.e038-lb { opacity: 0; transition: opacity .35s; }
.st-lb-after .e038-lb-after, .st-lb-every .e038-lb-every, .st-lb-model .e038-lb-model, .st-lb-songs .e038-lb-songs, .st-lb-veg .e038-lb-veg,
.st-lb-q .e038-lb-q, .st-lb-sun .e038-lb-sun { opacity: 1; }
.es-thing.is-walk .e038-roll { animation: e038Spin .35s linear infinite; }
@keyframes e038Spin { to { transform: rotate(360deg); } }
.es-ac.act-e038-kick .pp-legwR { animation: e038Kick .42s ease-in-out infinite alternate; }
@keyframes e038Kick { from { transform: rotate(0); } to { transform: rotate(-52deg); } }
/* vẽ: nét chì hiện dần */
.e038-ink, .e038-ink2 { stroke-dasharray: 1; stroke-dashoffset: 1; fill-opacity: 0; transition: stroke-dashoffset .9s ease-out, fill-opacity .5s .6s; }
.st-draw1 .e038-ink, .st-draw2 .e038-ink2 { stroke-dashoffset: 0; fill-opacity: 1; }
.e038-pageA, .e038-pageB { transition: opacity .3s; } .st-page2 .e038-pageA { opacity: 0; }
.e038-dogface { opacity: 0; transition: opacity .4s 1s; } .st-draw2 .e038-dogface { opacity: 1; }
/* truyện công chúa và rồng */
.e038-dream { opacity: 0; transform: scale(.3); transform-origin: -10px 60px; transition: opacity .4s, transform .6s cubic-bezier(.3,1.5,.6,1); }
.st-dream .e038-dream { opacity: 1; transform: scale(1); }
.e038-fire { opacity: 0; transform-origin: 24px -10px; }
.st-dream .e038-fire { animation: e038Fire .9s ease-in-out infinite alternate; }
@keyframes e038Fire { from { opacity: 0; transform: scale(.3); } to { opacity: 1; transform: scale(1.1); } }
.st-dream .e038-dragon { animation: e038Float 1.2s ease-in-out infinite alternate; }
/* bếp */
.e038-steam { opacity: 0; transition: opacity .4s; } .st-cook .e038-steam { opacity: 1; }
.e038-radio { transform-origin: 0 0; } .st-radio .e038-radio { animation: e038Shake .14s linear infinite alternate; }
@keyframes e038Shake { from { transform: rotate(-3deg); } to { transform: rotate(3deg); } }
/* vườn */
.e038-veg { transform: scale(.25); transform-origin: 0 0; transition: transform 1s cubic-bezier(.3,1.4,.6,1); }
.st-grow .e038-veg { transform: scale(1); }
.e038-beam { opacity: 0; transition: opacity .8s; } .st-beam .e038-beam { opacity: .5; }
.st-beam .e038-sun { animation: e038Pulse .8s ease-in-out infinite alternate; }
@keyframes e038Pulse { to { transform: scale(1.12); } }
.e038-breathe { animation: e038Breathe 2.2s ease-in-out infinite alternate; }
@keyframes e038Breathe { to { transform: scale(1.04, 1.08); } }
/* hồ */
.e038-rod { opacity: 0; transition: opacity .3s; } .st-rod .e038-rod { opacity: 1; }
.e038-bob { animation: e038Bob 1.2s ease-in-out infinite alternate; } @keyframes e038Bob { to { transform: translateY(2px); } }
.e038-fishj { opacity: 0; }
.st-fish .e038-fishj { animation: e038Jump 1.4s ease-in-out 1 both; }
@keyframes e038Jump { 0% { opacity: 0; transform: translate(0, 10px); } 20% { opacity: 1; } 50% { transform: translate(-16px, -34px) rotate(-20deg); } 80% { opacity: 1; } 100% { opacity: 0; transform: translate(-32px, 10px) rotate(-60deg); } }
.e038-msun { transform: translateY(40px); transition: transform 1.6s cubic-bezier(.3,0,.3,1); } .st-morning .e038-msun { transform: translateY(0); }
@media (prefers-reduced-motion: reduce) { .e038-float, .e038-dragon, .e038-breathe, .e038-bob { animation-duration: 4s; } }
`;

/** Một cú đá: chân vung, bóng lăn tới x. */
async function kick(st, who, to, speed) {
  st.pose(who, 'e038_kick'); st.act(who, 'e038-kick');
  await st.wait(260);
  st.act(who, null);
  await st.walk('ball', to, { speed, follow: false });
  st.pose(who, 'stand');
}
/** Đặt ngay một món (đám mây ý nghĩ…) tới chỗ mới. */
function put(st, id, x, y) { const A = st.a(id); A.x = x; if (y !== undefined) A.y = y; A.place(); }
/** Nốt nhạc bay lên từ (x, y). */
async function notes(st, x, y, n = 3) {
  const cols = ['#7C3AED', '#DB2777', '#2563EB'];
  for (let i = 0; i < n; i++) {
    st.fly(NOTE_FLY(cols[i % 3]), [x, y], [x + 30 + i * 14, y - 46 + (i % 2) * 10], { size: 26, dur: 900 });
    await st.wait(380);
  }
}

const BEATS = [
  { key: ['many hobbies'], icon: '🎯', label: 'many hobbies', async play(st) {
    st.look(300);
    st.pose('minh', 'me'); st.mood('minh', 'joy');
    await st.wait(300);
    st.show('hob', true); st.sfx('sparkle', { vol: 0.6 });
    await st.wait(1700);
    st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['love playing football'], icon: '⚽', label: 'football', async play(st) {
    st.show('hob', false);
    st.look(400);
    await kick(st, 'minh', 440, 260);
    st.fx('hearts', 300, 150);
    await st.walk('minh', 412, { speed: 160, follow: false });
    st.look(470);
    await kick(st, 'minh', 600, 300);
    st.mood('minh', 'joy');
    await st.wait(400);
  } },
  { key: ['with Tom', 'after school'], icon: '🏫', label: 'with Tom', async play(st) {
    st.mood('minh', 'happy');
    st.show('tom', true); st.sfx('door-open', { vol: 0.6 });
    await st.look(330, { dur: 600 });
    st.set('st-lb-after');
    await Promise.all([st.walk('tom', 630, { speed: 210, follow: false }), st.look(520, { dur: 2300 })]);
    st.set('st-lb-every');
    await kick(st, 'tom', 456, 280);
    await kick(st, 'minh', 590, 260);
    st.mood('tom', 'joy'); st.mood('minh', 'joy');
    await st.wait(500);
    st.set('st-lb-after', false); st.set('st-lb-every', false);
  } },
  { key: ['enjoy drawing'], icon: '✏️', label: 'drawing', async play(st) {
    st.pose('minh', 'wave'); st.act('minh', 'wave'); st.pose('tom', 'wave'); st.act('tom', 'wave');
    await st.wait(500);
    st.act('minh', null); st.act('tom', null); st.pose('tom', 'stand');
    await st.walk('minh', 950, { speed: 200, lead: 40 });
    st.hold('minh', 'pencil'); st.pose('minh', 'e038_draw');
    await st.wait(300);
    st.act('minh', 'write'); st.set('st-draw1'); st.sfx('page-turn', { vol: 0.5 });
    await st.wait(1500);
    st.act('minh', null);
  } },
  { key: ['drawing animals', 'favourite model'], icon: '🐶', label: 'favourite model', async play(st) {
    st.set('st-page2'); st.sfx('page-turn');
    st.dog('lucky', 'sit'); st.mood('lucky', 'joy');
    await st.wait(300);
    st.act('minh', 'write'); st.set('st-draw2');
    await st.wait(1300);
    st.act('minh', null); st.set('st-lb-model');
    st.act('lucky', 'wag'); st.mood('minh', 'joy');
    st.fx('sparkle', 1104, 196);
    await st.wait(900);
    st.set('st-lb-model', false); st.mood('minh', 'happy');
  } },
  { key: ['loves reading'], icon: '📖', label: 'loves reading', async play(st) {
    st.act('lucky', null); st.hold('minh', null); st.pose('minh', 'stand');
    await st.look(1310, { dur: 800 });
    st.act('lan', 'read'); st.mood('lan', 'joy'); st.sfx('page-turn');
    st.fx('hearts', 1310, 150);
    await st.wait(1600);
  } },
  { key: ['princesses and dragons'], icon: '🐉', label: 'princesses and dragons', async play(st) {
    st.set('st-dream'); st.sfx('sparkle', { vol: 0.6 });
    await st.wait(2600);
    st.mood('lan', 'happy');
  } },
  { key: ['cooking with Mum'], icon: '🍳', label: 'cooking', async play(st) {
    st.set('st-dream', false); st.act('lan', null);
    st.chest('lan', null); st.pose('lan', 'stand');
    await st.wait(300);
    await st.walk('lan', 1528, { speed: 150, lead: 30 });
    st.set('st-cook'); st.sfx('pot-stir');
    st.hold('lan', 'spoon'); st.pose('lan', 'stir'); st.act('lan', 'stir');
    st.pose('mum', 'stir'); st.act('mum', 'stir'); st.mood('mum', 'joy'); st.mood('lan', 'joy');
    await st.wait(1800);
    st.act('lan', null); st.act('mum', null);
  } },
  { key: ['likes fishing'], icon: '🎣', label: 'fishing', async play(st) {
    st.pose('dad', 'wave'); st.act('dad', 'wave');
    await st.wait(500);
    st.act('dad', null);
    await st.walk('dad', 2470, { speed: 230, lead: 60 });
    st.show('rodT', false); st.set('st-rod');
    st.pose('dad', 'e038_fish'); st.mood('dad', 'joy');
    await st.wait(400);
  } },
  { key: ['sitting by the lake', 'Sunday morning'], icon: '🌅', label: 'by the lake', async play(st) {
    st.look(2480);
    st.set('st-morning'); st.set('st-lb-sun'); st.sfx('birds', { vol: 0.6 });
    await st.wait(1000);
    st.set('st-fish');
    st.fx('drops', 2650, 250);
    await st.wait(1500);
    st.mood('dad', 'happy');
  } },
  { key: ['loves singing'], icon: '🎤', label: 'singing', async play(st) {
    st.set('st-fish', false); st.set('st-lb-sun', false);
    await st.look(1580, { dur: 1000 });
    st.set('st-cook', false);
    st.hold('mum', 'e038_mic'); st.pose('mum', 'e038_sing'); st.mood('mum', 'joy'); st.talk('mum', true);
    await notes(st, 1610, 120, 4);
    await st.wait(400);
  } },
  { key: ['old songs', 'in the kitchen'], icon: '🎵', label: 'old songs', async play(st) {
    st.set('st-radio'); st.set('st-lb-songs');
    st.hold('lan', null); st.pose('lan', 'clap'); st.act('lan', 'clap'); st.mood('lan', 'joy');
    st.act('mum', 'dance');
    await notes(st, 1700, 90, 3);
    await notes(st, 1610, 120, 2);
    st.act('lan', null); st.act('mum', null); st.talk('mum', false);
    st.set('st-radio', false); st.set('st-lb-songs', false);
  } },
  { key: ['growing vegetables'], icon: '🥕', label: 'vegetables', async play(st) {
    st.hold('mum', null); st.pose('mum', 'stand'); st.pose('lan', 'stand');
    await st.look(1940, { dur: 1000 });
    st.hold('grandpa', 'e038_can'); st.pose('grandpa', 'e038_water'); st.mood('grandpa', 'joy');
    await st.wait(400);
    st.fx('drops', 1904, 196); st.sfx('tap-water', { vol: 0.5 });
    st.set('st-grow'); st.set('st-lb-veg');
    await st.wait(700);
    st.fx('drops', 1910, 196);
    await st.wait(1100);
    st.set('st-lb-veg', false);
  } },
  { key: ['watching him', 'in the garden'], icon: '👵', label: 'watching him', async play(st) {
    st.look(1990);
    st.pose('grandma', 'sitClap'); st.act('grandma', 'clap'); st.mood('grandma', 'joy');
    st.fx('hearts', 2050, 140);
    await st.wait(1600);
    st.act('grandma', null); st.pose('grandma', 'e038_watch');
  } },
  { key: ['sleeping in the sun'], icon: '😺', label: 'sleeping in the sun', async play(st) {
    st.look(2160);
    st.set('st-beam');
    await st.wait(500);
    st.fx('zzz', 2156, 252);
    await st.wait(1800);
  } },
  { key: ['Lucky'], icon: '❓', label: 'And Lucky?', async play(st) {
    st.set('st-lb-q');
    st.dog('lucky', 'stand');
    await Promise.all([
      st.walk('lucky', 2280, { speed: 420, follow: false }),
      st.walk('minh', 2236, { speed: 420, follow: false }),
      st.look(2200, { dur: 600 }),
    ]);
    st.set('st-lb-q', false);
    st.act('lucky', 'wag'); st.mood('lucky', 'joy'); st.sfx('dog-bark', { vol: 0.7 });
    await st.wait(400);
  } },
  { key: ['running after balls'], icon: '🎾', label: 'running after balls', async play(st) {
    st.act('lucky', null);
    st.pose('minh', 'throw');
    await st.wait(250);
    await st.fly(TBALL, [2250, 170], [2390, 270], { size: 14, dur: 600 });
    put(st, 'tball', 2390); st.show('tball', true);
    st.pose('minh', 'stand');
    await Promise.all([
      st.walk('tball', 2410, { speed: 60, follow: false }),
      st.walk('lucky', 2386, { speed: 380, follow: false }),
    ]);
    st.sfx('dog-bark'); st.act('lucky', 'jump');
    st.mood('minh', 'joy'); st.pose('minh', 'cheer');
    await st.wait(900);
    st.act('lucky', null);
  } },
  { key: ['What do you like doing'], icon: '❓', label: 'What do you like?', async play(st) {
    st.look(2280);
    st.pose('minh', 'e038_ask'); st.mood('minh', 'joy');
    put(st, 'ask', 2236, 150); st.show('ask', true); st.sfx('sparkle', { vol: 0.6 });
    st.act('lucky', 'wag');
    await st.wait(2200);
  } },
];

export default {
  id: 'en038', worldW: 2900, floor: FLOOR, viewTop: 40, camStart: 60, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'rodT', kind: 'thing', x: 2490, svg: ROD_T, box: [-6, -122, 40, 124] },
    { id: 'kitty', kind: 'thing', x: 2160, svg: SLEEP_CAT, box: [-34, -40, 68, 42] },
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: 2080, s: 0.92, face: -1 },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: 1832, s: 0.95 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 1706, s: 0.95, face: -1 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 1600, s: 0.95, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 1310, s: 1.08 },
    { id: 'lucky', kind: 'dog', x: 1104, s: 0.9, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 130 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 300 },
    { id: 'ball', kind: 'thing', x: 340, svg: BALL_T, box: [-9, -17, 18, 18] },
    { id: 'tball', kind: 'thing', x: 2390, svg: TBALL_T, box: [-6, -11, 12, 12] },
    { id: 'hob', kind: 'thing', x: 330, y: 152, svg: HOBBY_CLOUD, box: [-80, -104, 160, 108] },
    { id: 'ask', kind: 'thing', x: 2236, y: 150, svg: ASK_CLOUD, box: [-96, -110, 192, 112] },
  ],
  init(st) {
    st.show('tom', false); st.show('hob', false); st.show('ask', false); st.show('tball', false);
    st.pose('lan', 'read'); st.chest('lan', 'book');
    st.dog('lucky', 'sit');
    st.pose('grandma', 'e038_watch');
  },
};
