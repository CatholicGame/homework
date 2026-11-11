/**
 * Bài 67 "The Girl Who Loved Stars" (mệnh đề quan hệ who / which / that): một đêm trời quang, đi từ trái sang phải:
 * phòng Lan (sao dán trần, bàn có hộp quà kính thiên văn + thiệp của ông) → cầu thang lên tầng thượng → sân thượng
 * (kính thiên văn trên chân ba càng, bầu trời đêm: chòm sao, ngôi sao sáng, vệt sáng vệ tinh, thành phố lên đèn bên dưới).
 * Mệnh đề quan hệ = phần giải thích hiện ngay cạnh người / vật: ông → kính, cô Hoa → sách, thuỷ thủ → ngôi sao, Trái Đất → vệ tinh.
 * Toạ độ cảnh: rộng 1500, cao 315; sàn phòng y = 282, sân thượng y = 230. Trạng thái cảnh là class st-* trên <svg>.
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, label, room, doorway, thought, shelf, books } from '../kit.js';

const FLOOR = 282, ROOF = 230;
const X = { lanStart: 250, desk: 420, stairs: 600, top: 740, rdoor: 772, lan: 904, minh: 838, scope: 948, star: 1210 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e067_sci: { hair: 'ponytail', top: 'jacket', shirt: '#F8FAFC', inner: '#F9A8D4', bottom: 'skirt', bottomC: '#7C3AED', shoe: '#F28AB2', glasses: true },
});

// ── Đồ vật ─────────────────────────────────────────────────────────────────
const SPARK = (x, y, r = 4, c = '#FDE68A', cls = '') => `<path class="${cls}" d="M${x} ${y - r * 1.8} L${x + r * 0.5} ${y - r * 0.5} L${x + r * 1.8} ${y} L${x + r * 0.5} ${y + r * 0.5} L${x} ${y + r * 1.8} L${x - r * 0.5} ${y + r * 0.5} L${x - r * 1.8} ${y} L${x - r * 0.5} ${y - r * 0.5}Z" fill="${c}"/>`;
/** Kính thiên văn nhỏ cầm tay (dọc theo cẳng tay). */
const SCOPE_HELD = `<g transform="rotate(200)"><rect x="-3.6" y="-4" width="7.2" height="26" rx="2" fill="#2563EB" stroke="${L}" stroke-width="0.8"/><rect x="-4.6" y="18" width="9.2" height="7" rx="1.6" fill="#FACC15" stroke="${L}" stroke-width="0.7"/></g>`;
/** Kính thiên văn trên chân ba càng (gốc = mặt đất), ống chếch lên phải. */
const SCOPE = `<path d="M0 -86 L-18 0 M0 -86 L18 0 M0 -86 L2 0" stroke="#475569" stroke-width="2.6" stroke-linecap="round"/>
  <g transform="translate(0 -92) rotate(-34)"><rect x="-30" y="-6" width="64" height="12" rx="3" fill="#2563EB" stroke="${L}" stroke-width="1"/><rect x="30" y="-8" width="10" height="16" rx="2" fill="#FACC15" stroke="${L}" stroke-width="0.9"/><rect x="-36" y="-3.4" width="8" height="6.8" rx="1.4" fill="#1F2937" stroke="${L}" stroke-width="0.7"/></g>
  <circle cy="-90" r="4" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/>`;
/** Sách truyện về các vì sao trước ngực (gốc giữa ngực), trang có chòm sao. */
const STARBOOK = `<g transform="translate(0 -10)"><rect x="-19" y="-13" width="38" height="26" rx="2" fill="#1E3A8A" stroke="${L}" stroke-width="1"/>
  <rect x="-17" y="-11" width="34" height="22" fill="#FEF3C7" stroke="${L}" stroke-width="0.6"/><path d="M0 -11 V11" stroke="${L}" stroke-width="0.8"/>
  <path d="M-13 4 L-9 -5 L-4 2 M4 -5 L9 3 L14 -3" stroke="#1D4ED8" stroke-width="0.9" fill="none"/>${[[-13, 4], [-9, -5], [-4, 2], [4, -5], [9, 3], [14, -3]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" fill="#F59E0B"/>`).join('')}</g>`;
const PLANE = `<g transform="scale(1.1)"><path d="M-20 0 Q-20 -4 -12 -4 H14 Q22 -3 22 0 Q22 3 14 4 H-12 Q-20 4 -20 0Z" fill="#F8FAFC" stroke="${L}" stroke-width="0.9"/><path d="M-2 -3 L-10 -16 H-5 L8 -3Z M-2 3 L-10 16 H-5 L8 3Z M-16 -3 L-20 -11 H-16 L-10 -3Z" fill="#93C5FD" stroke="${L}" stroke-width="0.8"/></g>`;
const SATELLITE = `<rect x="-5" y="-4" width="10" height="8" rx="1.5" fill="#FACC15" stroke="${L}" stroke-width="0.7"/><rect x="-17" y="-3" width="10" height="6" fill="#3B82F6" stroke="${L}" stroke-width="0.6"/><rect x="7" y="-3" width="10" height="6" fill="#3B82F6" stroke="${L}" stroke-width="0.6"/><path d="M0 -4 V-8" stroke="${L}" stroke-width="0.8"/><circle cy="-9" r="1.4" fill="#EF4444"/>`;

const POSES = {
  e067_hug: { R: [24, -100], L: [24, -100], head: -8 },
  e067_up: { R: [30, -20], L: [30, -20], head: -10 },
  e067_eye: { R: [60, 40], L: [30, -30], head: -6 },
  e067_read: { R: [24, -100], L: [24, -100], head: 10 },
  e067_ask: { R: [50, 130], L: [10, 4], head: -6 },
};
const PROPS = { e067_scope: SCOPE_HELD };

function bg() {
  const city = Array.from({ length: 12 }, (_, i) => {
    const x = X.rdoor + 40 + i * 62, h = [58, 82, 46, 70, 92, 54, 76, 64, 88, 50, 72, 60][i], w = 52;
    return `<rect x="${x}" y="${ROOF - 18 - h}" width="${w}" height="${h}" fill="${['#312E81', '#3730A3', '#1E3A8A', '#4338CA'][i % 4]}" stroke="#1E1B4B"/>
      ${Array.from({ length: Math.floor(h / 20) }, (_, r) => [0, 1, 2].map((c) => ((r + c + i) % 3 ? `<rect x="${x + 8 + c * 14}" y="${ROOF - 10 - h + r * 20}" width="8" height="9" fill="#FDE68A" opacity="0.85"/>` : '')).join('')).join('')}`;
  }).join('');
  const starsSky = Array.from({ length: 26 }, (_, i) => SPARK(X.rdoor + 20 + ((i * 97) % 700), 26 + ((i * 53) % 110), 1.6 + (i % 3) * 0.6, '#FDE68A', 'e067-tw')).join('');
  const cons = [[1010, 74], [1046, 50], [1084, 66], [1118, 44], [1150, 70], [1120, 98], [1082, 96]];
  const consLines = `<path class="e067-cons" d="M${cons.map(([x, y]) => `${x} ${y}`).join(' L')}Z" stroke="#BAE6FD" stroke-width="1.6" fill="none" stroke-dasharray="320" stroke-dashoffset="320"/>`;
  const ship = `<g transform="translate(${X.star - 120} 150)"><g class="e067-ship"><path d="M-30 0 H30 L22 12 H-22Z" fill="#FDE68A" fill-opacity="0.75" stroke="#FEF3C7"/>
    <path d="M0 0 V-42" stroke="#FEF3C7" stroke-width="2"/><path d="M2 -40 Q24 -26 2 -6Z M-2 -36 Q-20 -24 -2 -8Z" fill="#FEF3C7" fill-opacity="0.8" stroke="#FEF3C7"/><path d="M0 -42 l8 3 -8 3" fill="#FCA5A5"/>
    <path d="M-34 14 q8 -5 16 0 q8 5 16 0 q8 -5 16 0 q8 5 16 0" stroke="#BAE6FD" stroke-width="1.6" fill="none"/></g>
    <path class="e067-guide" d="M20 -40 L118 -102" stroke="#FEF3C7" stroke-width="1.6" stroke-dasharray="4 5"/></g>`;
  return `
  <!-- Phòng Lan: tường tím nhạt, sao dán trần phát sáng, cửa sổ đêm, bàn có hộp quà -->
  ${room(0, X.stairs - 40, FLOOR, '#EDE9FE')}
  <g class="e067-glowstars">${[[70, 30], [140, 52], [210, 28], [290, 46], [360, 26], [440, 50], [500, 30]].map(([x, y], i) => SPARK(x, y, 4.4, '#FEF08A', 'e067-tw') + (i % 2 ? '' : `<circle cx="${x}" cy="${y}" r="10" fill="#FEF08A" opacity="0.25"/>`)).join('')}</g>
  <rect x="70" y="78" width="110" height="96" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="76" y="84" width="98" height="84" fill="#1E1B4B"/>
  ${SPARK(100, 106, 2.4)}${SPARK(150, 98, 2)}${SPARK(130, 140, 2.6)}<circle cx="154" cy="136" r="9" fill="#FEF9C3"/><circle cx="159" cy="132" r="8" fill="#1E1B4B"/>
  <path d="M125 84 V168 M76 126 H174" stroke="#fff" stroke-width="3" opacity="0.8"/>
  ${shelf(220, 120, 90, books(228, 120, 6))}
  <g transform="translate(${X.desk} ${FLOOR})"><rect x="-60" y="-62" width="120" height="8" rx="2" fill="#A16207" stroke="${L}"/><rect x="-54" y="-54" width="8" height="54" fill="#92400E" stroke="${L}" stroke-width="0.8"/><rect x="46" y="-54" width="8" height="54" fill="#92400E" stroke="${L}" stroke-width="0.8"/>
    <g class="e067-gift"><rect x="-44" y="-86" width="40" height="24" rx="2" fill="#F472B6" stroke="${L}"/><path d="M-24 -86 V-62" stroke="#FDE047" stroke-width="4"/>
      <g class="e067-lid"><rect x="-47" y="-92" width="46" height="8" rx="2" fill="#EC4899" stroke="${L}"/><path d="M-24 -92 q-8 -10 -12 -2 q4 4 12 2 q8 -10 12 -2 q-4 4 -12 2" fill="#FDE047" stroke="${L}" stroke-width="0.7"/></g>
      <g class="e067-inbox"><g transform="translate(-24 -84) rotate(-90)">${SCOPE_HELD}</g></g></g>
    <g class="e067-card"><path d="M8 -62 L14 -84 H40 L34 -62Z" fill="#FEF3C7" stroke="${L}" stroke-width="0.9"/><g transform="translate(24 -73)">${headOnly('en_grandpa', { s: 0.32, mood: 'joy' })}</g></g></g>
  <g class="e067-lb e067-lb-gp">${label(X.desk, 130, 'from Grandpa', '#B45309', 15)}</g>
  ${doorway(X.stairs - 40, FLOOR)}
  <!-- Cầu thang lên sân thượng -->
  <rect x="${X.stairs - 28}" y="0" width="${X.rdoor - X.stairs + 28}" height="${FLOOR}" fill="#E2E8F0"/>
  <rect x="${X.stairs - 28}" y="${FLOOR}" width="${X.rdoor - X.stairs + 28}" height="${315 - FLOOR}" fill="#CBD5E1" stroke="${L}"/>
  <path d="M${X.stairs} ${FLOOR} ${Array.from({ length: 6 }, (_, i) => `V${FLOOR - (i + 1) * ((FLOOR - ROOF) / 6)} H${X.stairs + (i + 1) * ((X.top - X.stairs) / 6)}`).join(' ')} V${FLOOR} Z" fill="#94A3B8" stroke="${L}"/>
  <path d="M${X.stairs} ${FLOOR - 36} L${X.top} ${ROOF - 36}" stroke="#A16207" stroke-width="3"/><path d="M${X.stairs} ${FLOOR - 36} V${FLOOR} M${X.top} ${ROOF - 36} V${ROOF}" stroke="#A16207" stroke-width="2"/>
  <rect x="${X.top}" y="${ROOF}" width="${X.rdoor - X.top}" height="${FLOOR - ROOF}" fill="#94A3B8" stroke="${L}"/>
  <!-- Sân thượng: trời đêm, thành phố, lan can -->
  <defs><linearGradient id="e067sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1033"/><stop offset="1" stop-color="#3B3F8F"/></linearGradient></defs>
  <rect x="${X.rdoor}" y="0" width="${1500 - X.rdoor}" height="${ROOF}" fill="url(#e067sky)"/>
  ${starsSky}
  <g transform="translate(1420 50)"><circle r="18" fill="#FEF9C3"/><circle cx="8" cy="-5" r="16" fill="#151A45"/></g>
  ${city}
  ${consLines}${cons.map(([x, y]) => SPARK(x, y, 3, '#FEF9C3')).join('')}
  <g class="e067-lb e067-lb-old">${label(1080, 128, 'old stories', '#7C3AED', 14)}</g>
  <g class="e067-north"><circle class="e067-halo" cx="${X.star}" cy="46" r="22" fill="#FEF9C3" opacity="0.35"/>${SPARK(X.star, 46, 7, '#FFFFFF')}</g>
  ${ship}
  <g class="e067-lb e067-lb-sail">${label(X.star - 120, 196, 'sailors, long ago', '#B45309', 13)}</g>
  <g class="e067-earth"><g transform="translate(1150 128)"><circle r="26" fill="#3B82F6" stroke="#BFDBFE" stroke-width="1.4"/><path d="M-14 -14 q10 -4 14 6 q-6 8 -2 16 q-12 2 -16 -8Z M8 -20 q12 6 10 18 q-8 -2 -12 -10Z M4 10 q10 0 12 8 q-8 6 -14 0Z" fill="#22C55E"/>
    <ellipse rx="48" ry="16" fill="none" stroke="#FDE68A" stroke-width="1.2" stroke-dasharray="4 4"/>
    <g class="e067-orbit">${SATELLITE}</g></g>
    ${label(1150, 186, 'a satellite', '#1D4ED8', 14)}</g>
  <g class="e067-sat"><circle cx="990" cy="122" r="7" fill="#FEF9C3" opacity="0.4"/><circle cx="990" cy="122" r="3" fill="#FFFFFF"/></g>
  <g class="e067-lb e067-lb-week">${label(X.lan - 40, 30, 'last week', '#DB2777', 13)}</g>
  <rect x="${X.rdoor}" y="${ROOF - 30}" width="${1500 - X.rdoor}" height="8" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/>
  ${Array.from({ length: Math.floor((1500 - X.rdoor) / 26) }, (_, i) => `<rect x="${X.rdoor + 10 + i * 26}" y="${ROOF - 22}" width="5" height="22" fill="#CBD5E1" stroke="${L}" stroke-width="0.6"/>`).join('')}
  <!-- nhà cầu thang trên sân thượng, cửa ra -->
  <rect x="${X.top - 10}" y="${ROOF - 140}" width="${X.rdoor - X.top + 30}" height="140" fill="#E2E8F0" stroke="${L}"/><rect x="${X.top - 16}" y="${ROOF - 148}" width="${X.rdoor - X.top + 42}" height="10" fill="#94A3B8" stroke="${L}"/>
  <rect x="${X.rdoor - 2}" y="${ROOF - 108}" width="20" height="108" fill="#1E293B" stroke="${L}"/>
  <g class="e067-rdoor" style="transform-origin:${X.rdoor + 18}px 0px"><rect x="${X.rdoor - 2}" y="${ROOF - 108}" width="20" height="108" fill="#64748B" stroke="${L}"/><circle cx="${X.rdoor + 2}" cy="${ROOF - 52}" r="2" fill="#FDE68A"/></g>
  <rect x="${X.rdoor + 20}" y="${ROOF}" width="${1500 - X.rdoor - 20}" height="${315 - ROOF}" fill="#475569" stroke="${L}"/>
  ${Array.from({ length: 11 }, (_, i) => `<rect x="${X.rdoor + 50 + i * 62}" y="${ROOF + 22}" width="26" height="24" fill="${i % 3 ? '#FDE68A' : '#1E293B'}" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="${X.rdoor + 20}" y="${ROOF - 2}" width="${1500 - X.rdoor - 20}" height="6" fill="#64748B" stroke="${L}" stroke-width="0.8"/>
  <!-- chậu cây trên sân thượng -->
  ${[1300, 1380].map((x) => `<g transform="translate(${x} ${ROOF})"><path d="M-12 0 L-14 -20 H14 L12 0Z" fill="#C2410C" stroke="${L}"/><circle cy="-30" r="14" fill="#16A34A" stroke="${L}"/></g>`).join('')}`;
}

function fg() {
  const loveStar = `<path d="M0 18 C-30 0 -26 -22 -10 -22 C-4 -22 0 -16 0 -12 C0 -16 4 -22 10 -22 C26 -22 30 0 0 18Z" fill="#FB7185" stroke="${L}" stroke-width="1"/>${SPARK(0, -2, 5, '#FEF08A')}${SPARK(-36, -10, 3.4, '#FACC15')}${SPARK(36, -6, 3.4, '#FACC15')}${SPARK(-30, 14, 2.6, '#FACC15')}${SPARK(32, 16, 2.6, '#FACC15')}`;
  const lent = `<g transform="translate(-40 6)">${headOnly('en_hoa', { s: 0.62, mood: 'joy' })}</g><g transform="translate(40 8)">${headOnly('en_lan_home', { s: 0.72, mood: 'joy' })}</g>
    <g class="e067-lend"><g transform="scale(0.8)">${STARBOOK.replace('translate(0 -10)', 'translate(0 0)')}</g></g>`;
  const sci = `<g transform="translate(0 6)">${headOnly('e067_sci', { s: 0.72, mood: 'joy' })}</g>
    <ellipse cx="0" cy="4" rx="44" ry="14" fill="none" stroke="#C4B5FD" stroke-width="1" stroke-dasharray="3 3"/>
    <g class="e067-orbitA"><g><circle r="7" fill="#F59E0B" stroke="${L}" stroke-width="0.7"/><ellipse rx="12" ry="3.4" fill="none" stroke="#B45309" stroke-width="1.2" transform="rotate(-18)"/></g></g>
    <g class="e067-orbitB"><g><circle r="5.4" fill="#EF4444" stroke="${L}" stroke-width="0.7"/></g></g>`;
  const planeQ = `<g transform="translate(-10 0)">${PLANE}</g><text x="34" y="10" text-anchor="middle" ${NUN} font-size="28" fill="#2563EB">?</text>`;
  const clever = `<g transform="translate(0 8)">${headOnly('en_lan_home', { s: 0.72, mood: 'joy' })}</g><path d="M-14 -18 L-14 -28 L-7 -22 L0 -32 L7 -22 L14 -28 L14 -18Z" fill="#FACC15" stroke="${L}" stroke-width="0.9"/>`;
  return `
  ${thought(X.lanStart + 4, 92, 120, 80, loveStar, [X.lanStart, 150], 'e067-th e067-th-love')}
  ${thought(X.lan - 30, 62, 150, 66, lent, [X.lan, 98], 'e067-th e067-th-lent')}
  ${thought(X.lan - 30, 62, 150, 66, sci, [X.lan, 98], 'e067-th e067-th-sci')}
  <g class="e067-lb e067-lb-sci">${label(X.lan + 84, 74, 'scientist', '#7C3AED', 13)}</g>
  ${thought(X.minh - 30, 64, 120, 62, planeQ, [X.minh, 104], 'e067-th e067-th-plane')}
  ${thought(X.minh - 30, 64, 120, 62, clever, [X.minh, 104], 'e067-th e067-th-clever')}
  <g class="e067-lb e067-lb-ask">${label(X.minh - 40, 120, '?', '#2563EB', 20)}</g>
  <g class="e067-lb e067-lb-clever">${label(X.minh - 104, 70, 'cleverest', '#EA580C', 13)}</g>`;
}

const CSS = `
.e067-lb { opacity: 0; transition: opacity .35s; }
.st-lb-gp .e067-lb-gp, .st-lb-old .e067-lb-old, .st-lb-sail .e067-lb-sail, .st-lb-week .e067-lb-week, .st-lb-sci .e067-lb-sci, .st-lb-ask .e067-lb-ask, .st-lb-clever .e067-lb-clever { opacity: 1; }
.e067-tw { animation: ekTwinkle 1.6s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
.e067-tw:nth-child(3n) { animation-delay: -.6s; } .e067-tw:nth-child(3n+1) { animation-delay: -1.1s; }
.e067-glowstars { opacity: .55; transition: opacity .5s; } .st-glow .e067-glowstars { opacity: 1; }
/* bong bóng nghĩ */
.e067-th { opacity: 0; transform: scale(.4); transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.e067-th-love { transform-origin: ${X.lanStart}px 150px; }
.e067-th-lent, .e067-th-sci { transform-origin: ${X.lan}px 98px; }
.e067-th-plane, .e067-th-clever { transform-origin: ${X.minh}px 104px; }
.st-thLove .e067-th-love, .st-thLent .e067-th-lent, .st-thSci .e067-th-sci, .st-thPlane .e067-th-plane, .st-thClever .e067-th-clever { opacity: 1; transform: scale(1); }
.e067-lend { transform: translateX(-26px); transition: transform 1.2s ease-in-out .3s; } .st-thLent .e067-lend { transform: translateX(20px); }
.e067-orbitA { animation: e067EllA 3s linear infinite; } .e067-orbitB { animation: e067EllA 4.4s linear infinite; animation-delay: -2.2s; }
@keyframes e067EllA { 0% { transform: translate(44.0px, 4.0px); } 12.5% { transform: translate(31.1px, 13.9px); } 25% { transform: translate(0.0px, 18.0px); } 37.5% { transform: translate(-31.1px, 13.9px); } 50% { transform: translate(-44.0px, 4.0px); } 62.5% { transform: translate(-31.1px, -5.9px); } 75% { transform: translate(-0.0px, -10.0px); } 87.5% { transform: translate(31.1px, -5.9px); } 100% { transform: translate(44.0px, 4.0px); } }
@keyframes e067EllE { 0% { transform: translate(48.0px, 0.0px); } 12.5% { transform: translate(33.9px, 11.3px); } 25% { transform: translate(0.0px, 16.0px); } 37.5% { transform: translate(-33.9px, 11.3px); } 50% { transform: translate(-48.0px, 0.0px); } 62.5% { transform: translate(-33.9px, -11.3px); } 75% { transform: translate(-0.0px, -16.0px); } 87.5% { transform: translate(33.9px, -11.3px); } 100% { transform: translate(48.0px, -0.0px); } }
/* quà: mở nắp, kính trong hộp, thiệp của ông */
.e067-lid { transition: transform .4s cubic-bezier(.3,1.4,.6,1), opacity .4s .2s; } .st-open .e067-lid { transform: translateY(-16px); opacity: 0; }
.e067-inbox { opacity: 1; transition: opacity .2s; } .st-taken .e067-inbox { opacity: 0; }
.e067-card { transform-box: fill-box; transform-origin: 50% 100%; transition: transform .4s; } .st-card .e067-card { transform: scale(1.6) translateY(-4px); }
.e067-rdoor { transition: transform .4s; } .st-rdoor .e067-rdoor { transform: scaleX(.15); }
/* bầu trời */
.e067-cons { transition: stroke-dashoffset 2s ease-in-out; } .st-cons .e067-cons { stroke-dashoffset: 0; }
.e067-halo { opacity: 0; transition: opacity .5s; } .st-north .e067-halo { opacity: .35; }
.e067-north { opacity: .7; transform-box: fill-box; transform-origin: center; transition: opacity .5s, transform .5s; } .st-north .e067-north { opacity: 1; transform: scale(1.5); }
.e067-ship { opacity: 0; transform: translateX(-60px); transition: opacity .6s, transform 3s ease-in-out; } .st-ship .e067-ship { opacity: 1; transform: none; }
.e067-guide { opacity: 0; transition: opacity .5s 1.6s; } .st-ship .e067-guide { opacity: 1; }
.st-ship .e067-ship > path:first-child { animation: e067Rock 1.2s ease-in-out infinite alternate; }
@keyframes e067Rock { to { transform: rotate(3deg); } }
.e067-sat { opacity: 0; transition: opacity .4s; } .st-sat .e067-sat { opacity: 1; }
.st-satGo .e067-sat { transform: translate(300px, -18px); transition: opacity .4s, transform 5.5s linear; }
.e067-earth { opacity: 0; transform: scale(.4); transform-origin: 1150px 128px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); } .st-earth .e067-earth { opacity: 1; transform: scale(1); }
.e067-orbit { animation: e067EllE 3.2s linear infinite; }
.es-ac.act-e067-look .pp-headw { animation: e067Look 1.6s ease-in-out infinite alternate; }
@keyframes e067Look { from { transform: rotate(-4deg); } to { transform: rotate(4deg); } }
@media (prefers-reduced-motion: reduce) {
  .e067-tw { animation-duration: 3s; }
  .e067-orbitA, .e067-orbitB, .e067-orbit { animation-duration: 7s; }
  .st-ship .e067-ship > path:first-child { animation-duration: 2.4s; }
  .es-ac.act-e067-look .pp-headw { animation-duration: 3s; }
}
`;

const off = (st, ...names) => names.forEach((n) => st.set(n, false));

const BEATS = [
  { key: ['a girl who loves stars'], icon: '⭐', label: 'loves stars', async play(st) {
    st.look(X.lanStart + 20, { dur: 500 });
    st.pose('lan', 'e067_up'); st.mood('lan', 'wow');
    st.set('st-glow'); st.sfx('sparkle', { vol: 0.6 });
    await st.wait(900);
    st.pose('lan', 'e067_hug'); st.mood('lan', 'joy');
    st.set('st-thLove'); st.sfx('pop', { vol: 0.5 });
    await st.wait(500);
    st.fx('hearts', X.lanStart, 150);
    await st.wait(1300);
  } },
  { key: ['a small telescope which Grandpa gave her', 'for her birthday'], icon: '🔭', label: 'telescope', async play(st) {
    off(st, 'st-thLove'); st.pose('lan', 'stand'); st.mood('lan', 'happy');
    await st.walk('lan', X.desk - 70, { speed: 120, lead: 20 });
    st.face('lan', 1); st.pose('lan', 'reach');
    st.set('st-open'); st.sfx('pop', { vol: 0.6 });
    await st.wait(600);
    st.set('st-taken'); st.hold('lan', 'e067_scope'); st.pose('lan', 'raise'); st.mood('lan', 'joy'); st.sfx('whoosh', { vol: 0.4 });
    await st.wait(600);
    st.set('st-card'); st.set('st-lb-gp'); st.sfx('page-turn', { vol: 0.7 });
    await st.wait(1500);
  } },
  { key: ['climbs up to the roof of their building', 'looks at the sky'], icon: '🏢', label: 'up to the roof', async play(st) {
    off(st, 'st-lb-gp', 'st-card'); st.pose('lan', 'stand');
    await st.walk('lan', X.stairs, { speed: 130, lead: 60 });
    await st.walk('lan', X.top, { y: ROOF, speed: 100, lead: 80 });
    st.set('st-rdoor'); st.sfx('door-open', { vol: 0.7 });
    await st.walk('lan', X.lan, { speed: 130, lead: 80 });
    st.set('st-rdoor', false);
    st.hold('lan', null); st.show('scope', true); st.sfx('click', { vol: 0.7 });
    st.pose('lan', 'e067_eye'); st.mood('lan', 'wow'); st.act('lan', 'e067-look');
    st.sfx('crickets', { vol: 0.4 });
    await st.wait(1300);
  } },
  { key: ['one that tells old stories about the stars'], icon: '📖', label: 'old stories', async play(st) {
    st.act('lan', null); st.face('lan', 1);
    st.chest('lan', STARBOOK); st.pose('lan', 'e067_read'); st.mood('lan', 'happy'); st.act('lan', 'read');
    st.sfx('page-turn', { vol: 0.7 });
    await st.wait(700);
    st.look(X.lan + 160, { dur: 900 });
    st.set('st-cons'); st.sfx('ding', { vol: 0.35 });
    await st.wait(1500);
    st.set('st-lb-old'); st.sfx('page-turn', { vol: 0.5 });
    await st.wait(1000);
  } },
  { key: ['Ms Hoa lent it to her'], icon: '👩‍🏫', label: 'Ms Hoa lent it', async play(st) {
    st.set('st-lb-old', false); st.act('lan', null);
    st.look(X.lan + 40, { dur: 600 });
    st.set('st-thLent'); st.sfx('pop', { vol: 0.5 });
    await st.wait(400);
    st.sfx('whoosh', { vol: 0.5 });
    await st.wait(1200);
    st.mood('lan', 'joy'); st.sfx('giggle', { vol: 0.4 });
    await st.wait(700);
  } },
  { key: ['Look, Minh!'], icon: '👋', label: 'Look, Minh!', async play(st) {
    off(st, 'st-thLent');
    st.chest('lan', null); st.pose('lan', 'stand');
    st.set('st-rdoor'); st.sfx('door-open', { vol: 0.7 });
    st.show('minh', true);
    await st.walk('minh', X.minh, { speed: 120, follow: false });
    st.set('st-rdoor', false);
    st.face('lan', -1); st.pose('lan', 'wave'); st.act('lan', 'wave'); st.mood('lan', 'joy');
    st.sfx('pop', { vol: 0.4 });
    await st.wait(900);
    st.act('lan', null);
  } },
  { key: ['the bright star which sailors followed long ago'], icon: '⛵', label: 'sailors', async play(st) {
    st.face('lan', 1); st.pose('lan', 'pointUp'); st.mood('minh', 'wow'); st.face('minh', 1);
    st.look(X.star - 150, { dur: 900 });
    st.set('st-north'); st.sfx('ding', { vol: 0.6 });
    await st.wait(800);
    st.set('st-ship'); st.sfx('river', { vol: 0.5 });
    await st.wait(1400);
    st.set('st-lb-sail'); st.sfx('wind', { vol: 0.35 });
    await st.wait(1300);
  } },
  { key: ['a scientist who studies the planets'], icon: '🪐', label: 'scientist', async play(st) {
    off(st, 'st-lb-sail', 'st-ship', 'st-north');
    st.look(X.lan, { dur: 800 });
    st.face('lan', 1); st.pose('lan', 'hips'); st.mood('lan', 'joy'); st.mood('minh', 'happy');
    st.set('st-thSci'); st.sfx('pop', { vol: 0.5 });
    await st.wait(700);
    st.set('st-lb-sci'); st.sfx('whoosh', { vol: 0.4 });
    await st.wait(1800);
  } },
  { key: ['Last week', 'a light that moved slowly across the sky'], icon: '✨', label: 'a moving light', async play(st) {
    off(st, 'st-thSci', 'st-lb-sci');
    st.set('st-lb-week'); st.sfx('page-turn', { vol: 0.5 });
    st.look(X.lan + 160, { dur: 900 });
    st.pose('lan', 'e067_eye'); st.act('lan', 'e067-look'); st.mood('lan', 'wow');
    await st.wait(500);
    st.set('st-sat'); st.sfx('ding', { vol: 0.4 });
    await st.wait(300);
    st.set('st-satGo'); st.sfx('whoosh', { vol: 0.3, rate: 0.5 });
    await st.wait(2600);
    st.act('lan', null); st.pose('lan', 'pointUp');
    await st.wait(1000);
  } },
  { key: ['Is it a plane?'], icon: '✈️', label: 'a plane?', async play(st) {
    st.set('st-lb-week', false);
    st.look(X.lan + 40, { dur: 700 });
    st.pose('minh', 'pointUp'); st.mood('minh', 'wow'); st.talk('minh', true);
    st.set('st-thPlane'); st.sfx('plane', { vol: 0.4 });
    await st.wait(1500);
    st.talk('minh', false);
  } },
  { key: ['Minh asked'], icon: '❓', label: 'Minh asked', async play(st) {
    off(st, 'st-thPlane');
    st.face('minh', 1); st.pose('minh', 'e067_ask'); st.talk('minh', true);
    st.face('lan', -1); st.pose('lan', 'stand'); st.mood('lan', 'happy');
    st.set('st-lb-ask'); st.sfx('pop', { vol: 0.5 });
    await st.wait(1200);
    st.talk('minh', false);
  } },
  { key: ['No, it is a satellite which goes around the Earth'], icon: '🛰️', label: 'a satellite', async play(st) {
    off(st, 'st-lb-ask');
    st.pose('minh', 'stand');
    st.act('lan', 'no'); st.talk('lan', true); st.sfx('buzz-no', { vol: 0.35 });
    await st.wait(800);
    st.act('lan', null); st.face('lan', 1); st.pose('lan', 'point');
    st.look(X.lan + 120, { dur: 800 });
    st.set('st-earth'); st.sfx('robot-beep', { vol: 0.5 });
    await st.wait(1500);
    st.mood('minh', 'wow'); st.sfx('beep', { vol: 0.4 });
    await st.wait(900);
    st.talk('lan', false);
  } },
  { key: ['the cleverest person that he knows'], icon: '🏆', label: 'the cleverest', async play(st) {
    st.look(X.lan - 10, { dur: 700 });
    st.pose('lan', 'stand'); st.face('lan', -1); st.mood('lan', 'joy');
    st.set('st-thClever'); st.sfx('pop', { vol: 0.5 });
    await st.wait(500);
    st.set('st-lb-clever');
    st.pose('minh', 'clap'); st.act('minh', 'clap'); st.mood('minh', 'joy'); st.sfx('clap', { vol: 0.7 });
    await st.wait(900);
    st.fx('hearts', X.minh + 30, 140);
    await st.wait(1200);
    st.act('minh', null);
  } },
];

export default {
  id: 'en067', worldW: 1500, floor: FLOOR, viewTop: 18, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'scope', kind: 'thing', x: X.scope, y: ROOF, svg: SCOPE, box: [-30, -140, 80, 144] },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.rdoor + 6, y: ROOF },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.lanStart, s: 1.08 },
  ],
  init(st) {
    st.show('scope', false); st.show('minh', false);
  },
};
