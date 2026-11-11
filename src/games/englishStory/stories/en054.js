/**
 * Bài 54 "When Grandpa Was Young" (could / couldn't): hiên nhà ông ở Nam Định (hiện tại, màu tươi: ti vi, ghế của ông, ghế đẩu của Minh)
 * → dải phim → khung hồi tưởng màu nâu đỏ "70 years ago" (ông lúc nhỏ): túp lều tranh · sạp đồ chơi + bụi tre (làm diều) · sông (bơi, bắt cá)
 * · lớp học làng (bảng đá). Camera lia qua lại giữa hiện tại và hồi tưởng theo lời ông kể.
 * could = dấu ✓ xanh, couldn't = dấu ✗ đỏ hiện cạnh hình.
 * Toạ độ cảnh: rộng 2300, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, label, windowBox, thought } from '../kit.js';

// Ông lúc nhỏ (áo vải nâu, quần đùi, dép cói): chỉ dùng trong truyện này
Object.assign(CAST, { e054_boy: { hair: 'bowl', hairC: '#3B2416', top: 'tee', shirt: '#D9B48A', bottom: 'shorts', bottomC: '#7C4A2D', shoe: '#A47551' } });

const FLOOR = 282;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { tv: 110, minh: 290, gpa: 400, film: 600, hut: 820, stall: 1080, bamboo: 1290, river: 1440, swim: 1580, school: 2060 };
// bảng màu hồi tưởng (nâu đỏ, như ảnh cũ)
const S = { sky1: '#F2D9B3', sky2: '#E6C08E', hill: '#D6B183', ground: '#C49A6C', dark: '#8C5A3C', wall: '#DDBB90', thatch: '#B07D46', water: '#A9B59A', leaf: '#9C9150' };

// ── Đồ vật ─────────────────────────────────────────────────────────────────
const TICK = `<circle r="13" fill="#fff" stroke="#15803D" stroke-width="2"/><path d="M-6 0 L-2 5 L7 -5" stroke="#15803D" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const CROSS = `<circle r="13" fill="#fff" stroke="#DC2626" stroke-width="2"/><path d="M-5 -5 L5 5 M5 -5 L-5 5" stroke="#DC2626" stroke-width="3.4" stroke-linecap="round"/>`;
const TV = `<rect x="-22" y="-30" width="44" height="32" rx="4" fill="#334155" stroke="${L}" stroke-width="1.2"/><rect x="-18" y="-26" width="36" height="24" rx="2" fill="#7DD3FC"/>
  <path d="M-18 -8 Q-6 -16 4 -10 T18 -12 V-2 H-18Z" fill="#86EFAC"/><path d="M-8 2 L-12 8 M8 2 L12 8" stroke="${L}" stroke-width="1.6"/>`;
const BULB = `<circle cy="-4" r="9" fill="#FEF9C3" stroke="${L}" stroke-width="1.1"/><rect x="-4" y="4" width="8" height="7" rx="1" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/>`;
const FISH = `<path d="M-12 0 Q-3 -8 7 0 Q-3 8 -12 0Z M7 0 l7 -6 v12Z" fill="#B9A27E" stroke="${L}" stroke-width="0.9"/><circle cx="-6" cy="-1" r="1.2" fill="#2B1D16"/>`;
/** Diều giấy (gốc = tâm diều), dây thả xuống phía tay bé. */
const KITE = `<path class="e054-string" d="M0 10 Q-30 70 -64 128" stroke="${L}" stroke-width="0.9" fill="none"/>
  <g class="e054-kfly" style="transform-origin:0px 0px"><path d="M0 -18 L14 0 L0 16 L-14 0Z" fill="#E8C27A" stroke="${L}" stroke-width="1.1"/><path d="M0 -18 V16 M-14 0 H14" stroke="#8C5A3C" stroke-width="1.2"/>
  <path d="M0 16 q-6 8 0 14 q6 8 0 14" stroke="#B4533A" stroke-width="1.4" fill="none"/><path d="M-3 24 h6 M-3 36 h6" stroke="#B4533A" stroke-width="2"/></g>`;
const KITE_PARTS = `<g transform="translate(0 -24)"><path d="M0 -16 V16 M-13 0 H13" stroke="#8C5A3C" stroke-width="2.4" stroke-linecap="round"/></g>`;
const KITE_HELD = `<g transform="translate(0 -24)"><path d="M0 -16 L13 0 L0 15 L-13 0Z" fill="#E8C27A" stroke="${L}" stroke-width="1"/><path d="M0 -16 V15 M-13 0 H13" stroke="#8C5A3C" stroke-width="1.2"/></g>`;
const SLATE = `<g transform="translate(0 -26) rotate(-4)"><rect x="-15" y="-11" width="30" height="22" rx="2" fill="#4A3B2A" stroke="#A47551" stroke-width="2"/><text x="0" y="4" text-anchor="middle" ${NUN} font-size="9" fill="#F5F5F4">ABC</text></g>`;
const PAPER = `<g transform="translate(0 -26)"><rect x="-22" y="-14" width="44" height="28" fill="#F8FAFC" stroke="${L}" stroke-width="1"/><path d="M0 -14 V14" stroke="${L}" stroke-width="0.7"/>
  <text x="-11" y="-5" text-anchor="middle" ${NUN} font-size="5.4" fill="#1F2937">NEWS</text><path d="M-19 0 H-3 M-19 4 H-3 M-19 8 H-5 M3 -8 H19 M3 -4 H19 M3 0 H19 M3 4 H16 M3 8 H19" stroke="#94A3B8" stroke-width="1"/>
  <rect x="-19" y="-12" width="5" height="5" fill="#93C5FD"/></g>`;
/** Đèn dầu (gốc = đáy), ngọn lửa lay. */
const LAMP = `<g class="e054-halo"><circle cy="-30" r="54" fill="#FDE68A" opacity="0.35"/></g><path d="M-10 0 Q-12 -10 -6 -14 H6 Q12 -10 10 0Z" fill="#B45309" stroke="${L}" stroke-width="1"/>
  <path d="M-6 -14 Q-9 -28 0 -36 Q9 -28 6 -14Z" fill="#FEF3C7" stroke="${L}" stroke-width="0.9" opacity="0.9"/>
  <g class="e054-flame" style="transform-origin:0px -18px"><path d="M0 -30 Q4 -22 0 -18 Q-4 -22 0 -30Z" fill="#F97316"/></g>`;

const POSES = {
  e054_tell: { R: [55, 40], L: [40, 110], dy: 20, head: -4 },
  e054_shrug: { R: [50, 130], L: [50, 130], head: -6 },
  e054_pocket: { R: [30, 60], L: [30, 60], head: 8 },
  e054_string: { R: [130, 150], L: [10, 4], head: -10 },
  e054_grab: { R: [160, 178], L: [150, 172], head: -6 },
  e054_readlamp: { R: [30, 196], L: [30, 196], dy: 20, head: 7 },
  e054_puzzle: { R: [30, -150], L: [40, 110], dy: 20, head: 10 },
  e054_paper: { R: [30, 196], L: [30, 196], dy: 20, head: 4 },
  e054_point: { R: [84, 92], L: [10, 4], head: -4 },
  e054_sitwow: { R: [150, 172], L: [150, 172], dy: 20 },
  e054_sitask: { R: [55, 40], L: [40, 110], dy: 20, head: -5 },
  e054_sitpoint: { R: [84, 92], L: [40, 110], dy: 20 },
};
const PROPS = { e054_fish: `<g transform="rotate(90) translate(0 -6) scale(1.5)">${FISH}</g>` };

function bg() {
  const thatchLines = Array.from({ length: 9 }, (_, i) => `<path d="M${X.hut - 90 + i * 22} ${218 - 4} L${X.hut - 40 + i * 10} 130" stroke="#8C5A3C" stroke-width="1" opacity="0.6"/>`).join('');
  return `
  <defs><linearGradient id="e054past" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${S.sky1}"/><stop offset="1" stop-color="${S.sky2}"/></linearGradient></defs>
  <!-- HIỆN TẠI: hiên nhà ông -->
  <rect x="0" y="0" width="${X.film}" height="${FLOOR}" fill="#FEF3C7"/>
  <rect x="0" y="0" width="${X.film}" height="14" fill="#E9D5B5" stroke="${L}"/>
  ${Array.from({ length: 10 }, (_, i) => `<rect x="${i * 60}" y="${FLOOR}" width="60" height="33" fill="${i % 2 ? '#FCA5A5' : '#FECACA'}" stroke="${L}" stroke-width="0.6"/>`).join('')}
  ${windowBox(186, 70, 96, 80)}
  <g transform="translate(${X.tv} 0)"><rect x="-38" y="206" width="76" height="${FLOOR - 206}" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="-32" y="218" width="30" height="30" rx="2" fill="#D97706" stroke="${L}" stroke-width="0.8"/><rect x="2" y="218" width="30" height="30" rx="2" fill="#D97706" stroke="${L}" stroke-width="0.8"/>
    <g transform="translate(0 198) scale(1.3)">${TV}</g></g>
  <g transform="translate(486 110)"><rect x="-34" y="-28" width="68" height="50" rx="5" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-34" y="-28" width="68" height="14" rx="5" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    <circle cx="-18" cy="-28" r="3" fill="#1F2937"/><circle cx="18" cy="-28" r="3" fill="#1F2937"/><text x="0" y="8" text-anchor="middle" ${NUN} font-size="12" fill="#DC2626">SUNDAY</text></g>
  <!-- ghế của ông, ghế đẩu của Minh (mặt ghế sau người) -->
  <g transform="translate(${X.gpa} 0)"><rect x="20" y="150" width="9" height="${FLOOR - 150}" rx="3" fill="#92400E" stroke="${L}"/><rect x="-30" y="216" width="62" height="9" rx="3" fill="#B45309" stroke="${L}"/></g>
  <g transform="translate(${X.minh} 0)"><rect x="-22" y="250" width="44" height="8" rx="3" fill="#2563EB" stroke="${L}"/></g>
  <g class="e054-lb e054-lb-week">${label(300, 70, 'last weekend', '#1D4ED8', 15)}</g>
  <!-- QUÁ KHỨ: trời, đồi, đất màu ảnh cũ -->
  <rect x="${X.film}" y="0" width="${2300 - X.film}" height="315" fill="url(#e054past)"/>
  <circle cx="990" cy="60" r="24" fill="#F6E3B4" stroke="${S.dark}" stroke-width="1.2" opacity="0.9"/>
  <path d="M${X.film} 226 Q900 180 1180 214 T1700 206 T2300 214 V${FLOOR} H${X.film}Z" fill="${S.hill}" stroke="${L}" stroke-width="0.8"/>
  <rect x="${X.film}" y="${FLOOR - 4}" width="${2300 - X.film}" height="41" fill="${S.ground}" stroke="${L}"/>
  ${Array.from({ length: 34 }, (_, i) => `<path d="M${X.film + 30 + i * 50} ${FLOOR + 12} l3 -7 l3 7" stroke="${S.dark}" stroke-width="1.2" fill="none" opacity="0.6"/>`).join('')}
  <g class="e054-lb e054-lb-ago">${label(760, 64, '70 years ago', '#8C2F1B', 15)}</g>
  <!-- túp lều tranh -->
  <rect x="${X.hut - 76}" y="176" width="152" height="${FLOOR - 176}" fill="${S.wall}" stroke="${L}" stroke-width="1.2"/>
  <rect x="${X.hut - 20}" y="214" width="40" height="${FLOOR - 214}" fill="#5A3A26" stroke="${L}"/>
  <path d="M${X.hut - 100} 186 L${X.hut} 112 L${X.hut + 100} 186Z" fill="${S.thatch}" stroke="${L}" stroke-width="1.3"/>${thatchLines}
  <path d="M${X.hut - 40} 160 l10 -4 l2 8Z M${X.hut + 34} 150 l12 2 l-4 8Z" fill="#7C4A2D"/>
  <rect x="${X.hut + 34}" y="196" width="22" height="18" fill="#5A3A26" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(${X.hut - 56} ${FLOOR})"><path d="M-10 0 Q-14 -18 0 -20 Q14 -18 10 0Z" fill="#A47551" stroke="${L}"/><ellipse cy="-19" rx="8" ry="2.4" fill="#5A3A26"/></g>
  <g class="e054-lb e054-lb-poor">${label(X.hut + 150, 140, 'poor', '#8C2F1B', 17)}</g>
  <g class="e054-icons"><g transform="translate(${X.hut - 34} 84)">${TV}<g transform="translate(18 -24)">${CROSS}</g></g><g transform="translate(${X.hut + 40} 84)">${BULB}<g transform="translate(14 -16)">${CROSS}</g></g></g>
  <!-- sạp đồ chơi -->
  <g transform="translate(${X.stall} 0)"><path d="M-46 140 H46 L56 160 H-56Z" fill="#B4533A" stroke="${L}"/><path d="M-44 160 V${FLOOR} M44 160 V${FLOOR}" stroke="${S.dark}" stroke-width="3"/>
    <rect x="-50" y="222" width="100" height="10" rx="2" fill="#A47551" stroke="${L}"/>
    <g transform="translate(-26 222)"><rect x="-10" y="-16" width="20" height="16" rx="3" fill="#C2410C" stroke="${L}"/><ellipse cy="-16" rx="10" ry="3" fill="#F2D9B3" stroke="${L}" stroke-width="0.8"/></g>
    <g transform="translate(4 222)"><path d="M-12 0 V-10 Q-12 -16 -4 -16 H6 L10 -24 L14 -18 L10 -12 V0" fill="#D6B183" stroke="${L}"/><circle cx="-8" cy="0" r="3" fill="#5A3A26"/><circle cx="6" cy="0" r="3" fill="#5A3A26"/></g>
    <g transform="translate(30 214)"><circle r="8" fill="#B4533A" stroke="${L}"/></g>
    <g class="e054-toyx"><g transform="translate(0 196)">${CROSS}</g></g></g>
  <g class="e054-lb e054-lb-toys">${label(X.stall, 110, "couldn't buy", '#DC2626', 14)}</g>
  <!-- bụi tre -->
  <g transform="translate(${X.bamboo + 40} ${FLOOR})">${[-30, -14, 2, 18, 32].map((x, i) => `<path d="M${x} 0 Q${x - 6 + i * 3} -90 ${x - 14 + i * 6} -170" stroke="#8C7A3E" stroke-width="5" fill="none"/>
    ${[40, 80, 120].map((y) => `<path d="M${x - 1} ${-y} h4" stroke="${L}" stroke-width="1"/>`).join('')}`).join('')}
    <g class="ek-sway" style="transform-origin:0px -150px">${[[-40, -160], [-10, -175], [26, -165], [-28, -120], [30, -126]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="22" ry="7" fill="${S.leaf}" stroke="${L}" stroke-width="0.8" transform="rotate(-20 ${x} ${y})"/>`).join('')}</g></g>
  <g class="e054-lb e054-lb-kite">${label(X.bamboo - 80, 104, 'paper and bamboo', '#8C2F1B', 13)}</g>
  <!-- sông -->
  <path d="M${X.river - 30} ${FLOOR} Q${X.river} 250 ${X.river + 40} 248 H1840 Q1870 250 1890 ${FLOOR}Z" fill="${S.water}" stroke="${L}"/>
  <g class="e054-lb e054-lb-swim">${label(1500, 120, 'could swim', '#15803D', 15)}</g>
  <g class="e054-lb e054-lb-fish">${label(1690, 140, 'with my hands', '#15803D', 14)}</g>
  <g class="e054-mk e054-mk-swim"><g transform="translate(1590 120)">${TICK}</g></g>
  <!-- lớp học làng -->
  <g transform="translate(${X.school} 0)"><path d="M-150 120 L0 74 L150 120Z" fill="${S.thatch}" stroke="${L}" stroke-width="1.3"/><path d="M-130 120 V${FLOOR} M130 120 V${FLOOR}" stroke="${S.dark}" stroke-width="5"/>
    <rect x="-40" y="136" width="120" height="66" rx="3" fill="#4A3B2A" stroke="#8C5A3C" stroke-width="4"/>
    <g class="e054-b6"><text x="20" y="178" text-anchor="middle" ${NUN} font-size="20" fill="#F5F5F4" letter-spacing="4">b d q p</text></g>
    <g class="e054-b9"><text x="20" y="166" text-anchor="middle" ${NUN} font-size="15" fill="#F5F5F4">I CAN</text><text x="20" y="188" text-anchor="middle" ${NUN} font-size="15" fill="#FDE68A">READ</text></g></g>
  <g class="e054-mk e054-mk-six"><g transform="translate(${X.school + 100} 128)">${CROSS}</g></g><g class="e054-mk e054-mk-nine"><g transform="translate(${X.school + 100} 128)">${TICK}</g></g>
  <g class="e054-lb e054-lb-six">${label(X.school - 100, 104, 'age 6', '#DC2626', 16)}</g>
  <g class="e054-lb e054-lb-nine">${label(X.school - 100, 104, 'age 9', '#15803D', 16)}</g>`;
}

function fg() {
  return `
  <!-- mặt trước ghế ông, ghế Minh -->
  <g transform="translate(${X.gpa} 0)"><rect x="-32" y="222" width="66" height="8" rx="3" fill="#D97706" stroke="${L}"/><path d="M-26 230 V${FLOOR} M26 230 V${FLOOR}" stroke="#92400E" stroke-width="4"/></g>
  <g transform="translate(${X.minh} 0)"><rect x="-24" y="254" width="48" height="7" rx="3" fill="#3B82F6" stroke="${L}"/><path d="M-18 261 V${FLOOR} M18 261 V${FLOOR}" stroke="#1E3A8A" stroke-width="3.4"/></g>
  <!-- dải phim: ranh giới hiện tại ↔ ngày xưa -->
  <rect x="${X.film - 22}" y="0" width="44" height="315" fill="#2B1D16"/>
  ${Array.from({ length: 16 }, (_, i) => `<rect x="${X.film - 18}" y="${6 + i * 20}" width="8" height="10" rx="2" fill="#F2D9B3"/><rect x="${X.film + 10}" y="${6 + i * 20}" width="8" height="10" rx="2" fill="#F2D9B3"/>`).join('')}
  <!-- mặt nước phía trước (che thân người đang bơi) -->
  <path d="M${X.river + 20} 258 Q1600 252 1860 258 L1880 ${FLOOR + 40} H${X.river}Z" fill="${S.water}"/>
  <path d="M${X.river + 20} 258 Q1600 252 1860 258" stroke="${L}" stroke-width="1" fill="none"/>
  <g class="ek-wave">${Array.from({ length: 9 }, (_, i) => `<path d="M${X.river + 40 + i * 44} ${268 + (i % 3) * 12} q6 -4 12 0 q6 4 12 0" stroke="#EDF2E4" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <!-- bàn học làng (che chân bé ngồi) -->
  <g transform="translate(${X.school - 20} 0)"><rect x="-40" y="238" width="80" height="8" rx="2" fill="#A47551" stroke="${L}"/><path d="M-34 246 V${FLOOR} M34 246 V${FLOOR}" stroke="${S.dark}" stroke-width="4"/></g>
  <!-- đêm ở làng (chỉ phần ngày xưa) -->
  <g class="e054-night"><rect x="${X.film + 22}" y="0" width="${2300 - X.film - 22}" height="315" fill="#2B1810" opacity="0.5"/>
    <g transform="translate(980 54)"><circle r="16" fill="#F6E3B4"/><circle cx="7" cy="-4" r="14" fill="#5A4030"/></g></g>
  <!-- đèn dầu sáng giữa đêm (vẽ trên lớp đêm) -->
  <defs><radialGradient id="e054glow"><stop offset="0" stop-color="#FDE68A" stop-opacity="0.75"/><stop offset="1" stop-color="#FDE68A" stop-opacity="0"/></radialGradient></defs>
  <g class="e054-lamp"><g transform="translate(${X.hut + 26} ${FLOOR})"><circle cy="-30" r="80" fill="url(#e054glow)"/>${LAMP}</g></g>
  <!-- lớp màu ảnh cũ phủ nhẹ phần ngày xưa -->
  <rect x="${X.film + 22}" y="0" width="${2300 - X.film - 22}" height="315" fill="#B4533A" opacity="0.08"/>`;
}

const CSS = `
.e054-lb, .e054-mk { opacity: 0; transition: opacity .35s; }
.st-lb-week .e054-lb-week, .st-lb-ago .e054-lb-ago, .st-lb-poor .e054-lb-poor, .st-lb-toys .e054-lb-toys, .st-lb-kite .e054-lb-kite,
.st-lb-swim .e054-lb-swim, .st-lb-fish .e054-lb-fish, .st-mk-swim .e054-mk-swim, .st-lb-six .e054-mk-six, .st-lb-nine .e054-mk-nine, .st-lb-six .e054-lb-six, .st-lb-nine .e054-lb-nine { opacity: 1; }
.e054-toyx, .e054-icons { opacity: 0; transform: scale(.4); transform-box: fill-box; transform-origin: center; transition: opacity .3s, transform .4s cubic-bezier(.3,1.6,.6,1); }
.st-toyx .e054-toyx, .st-icons .e054-icons { opacity: 1; transform: scale(1); }
.e054-lamp { opacity: 0; transition: opacity .6s; } .st-lamp .e054-lamp { opacity: 1; }
.e054-night { opacity: 0; transition: opacity 1s; pointer-events: none; }
.st-night .e054-night { opacity: 1; }
.e054-b9 { opacity: 0; transition: opacity .5s; } .st-read9 .e054-b9 { opacity: 1; } .st-read9 .e054-b6 { opacity: 0; }
.e054-b6 { transition: opacity .3s; }
.st-read6 .e054-b6 { animation: e054Jumble .5s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
@keyframes e054Jumble { from { transform: rotate(-4deg); } to { transform: rotate(4deg) translateX(3px); } }
.e054-flame { animation: e054Flame .3s ease-in-out infinite alternate; }
@keyframes e054Flame { from { transform: scale(.85, .9) rotate(-6deg); } to { transform: scale(1.1, 1.15) rotate(6deg); } }
.e054-halo { animation: e054Halo 1.2s ease-in-out infinite alternate; transform-origin: 0 -30px; }
@keyframes e054Halo { from { transform: scale(.92); } to { transform: scale(1.06); } }
.e054-string { opacity: 0; transition: opacity .3s; } .es-thing.is-up .e054-string { opacity: 1; }
.es-thing.is-up .e054-kfly { animation: e054Kite 1s ease-in-out infinite alternate; }
@keyframes e054Kite { from { transform: rotate(-8deg); } to { transform: rotate(8deg) translateY(-3px); } }
.e054-fishj { animation: e054Wiggle .18s ease-in-out infinite alternate; transform-origin: 0 0; }
@keyframes e054Wiggle { from { transform: rotate(-12deg); } to { transform: rotate(12deg); } }
@media (prefers-reduced-motion: reduce) {
  .e054-flame, .e054-fishj { animation-duration: .8s; }
  .e054-halo, .es-thing.is-up .e054-kfly { animation-duration: 3s; }
  .st-read6 .e054-b6 { animation-duration: 1.2s; }
}
`;

/** Đổi cỡ một nhân vật (bé lúc 6 tuổi nhỏ hơn lúc 9 tuổi). */
function resize(st, id, s) { const A = st.a(id); A.s = s; A.size(); }
const PAST = (st, x) => { st.sfx('whoosh', { vol: 0.5, rate: 0.8 }); return st.look(x, { dur: 1100 }); };

const BEATS = [
  { key: ['seventy years ago'], icon: '👴', label: '70 years ago', async play(st) {
    st.look(290);
    st.set('st-lb-week'); st.sfx('pop', { vol: 0.5 });
    await st.walk('minh', X.minh, { speed: 130, follow: false });
    st.face('minh', 1); st.pose('minh', 'sit');
    st.pose('gpa', 'e054_tell'); st.talk('gpa', true);
    await st.wait(900);
    st.set('st-lb-week', false); st.set('st-lb-ago'); st.sfx('pop', { vol: 0.5 });
    await PAST(st, X.hut + 20);
    st.sfx('birds', { vol: 0.6 });
    st.talk('gpa', false);
    await st.wait(600);
  } },
  { key: ['My family was poor'], icon: '🛖', label: 'poor', async play(st) {
    st.look(X.hut + 20);
    st.mood('boy', 'sad'); st.pose('boy', 'e054_pocket');
    st.sfx('wind', { vol: 0.4 });
    await st.wait(300);
    st.set('st-lb-poor'); st.sfx('pop', { vol: 0.5 });
    await st.wait(1400);
  } },
  { key: ["couldn't buy many toys", 'made kites'], icon: '🪁', label: 'made kites', async play(st) {
    st.set('st-lb-poor', false); st.set('st-lb-ago', false); st.mood('boy', 'happy'); st.pose('boy', 'stand');
    await st.walk('boy', X.stall - 4, { speed: 140, lead: 40 });
    st.face('boy', 1); st.pose('boy', 'e054_point'); st.mood('boy', 'wow');
    await st.wait(400);
    st.pose('boy', 'e054_shrug'); st.mood('boy', 'sad'); st.set('st-toyx'); st.set('st-lb-toys'); st.sfx('buzz-no', { vol: 0.6 });
    await st.wait(900);
    st.set('st-lb-toys', false); st.mood('boy', 'happy'); st.pose('boy', 'stand');
    await st.walk('boy', X.bamboo, { speed: 160, lead: 30 });
    st.set('st-lb-kite'); st.sfx('pop', { vol: 0.5 });
    st.chest('boy', KITE_PARTS); st.pose('boy', 'carry'); st.sfx('page-turn', { vol: 0.5 });
    await st.wait(600);
    st.fx('sparkle', X.bamboo, FLOOR - 80, { quiet: true }); st.sfx('ding', { vol: 0.5 });
    st.chest('boy', KITE_HELD); st.mood('boy', 'joy');
    await st.wait(500);
    st.chest('boy', null); st.place('kite', X.bamboo + 6, FLOOR - 70); st.show('kite', true);
    st.pose('boy', 'e054_string');
    st.a('kite').el.classList.add('is-up');
    await st.loop('wind', async () => {
      await st.walk('kite', X.bamboo + 70, { y: FLOOR - 196, speed: 120, follow: false });
      await st.wait(500);
    }, { vol: 0.6 });
  } },
  { key: ['could swim very well'], icon: '🏊', label: 'could swim', async play(st) {
    st.set('st-lb-kite', false);
    st.show('kite', false); st.a('kite').el.classList.remove('is-up'); st.place('kite', X.bamboo + 6, FLOOR - 70);
    st.pose('boy', 'stand');
    await st.walk('boy', X.river + 14, { speed: 170, lead: 80 });
    st.pose('boy', 'cheer');
    await st.wait(250);
    st.place('boy', X.swim, 330, 1);
    st.fx('drops', X.swim, 250); st.fx('drops', X.swim + 20, 250); st.sfx('splash', { vol: 0.9 });
    st.pose('boy', 'swim'); st.act('boy', 'swim'); st.mood('boy', 'joy');
    st.set('st-lb-swim'); st.set('st-mk-swim'); st.sfx('pop', { vol: 0.5 });
    await st.wait(800);
    st.sfx('splash', { vol: 0.5, rate: 1.2 });
    await st.wait(800);
  } },
  { key: ['catch fish', 'with my hands'], icon: '🐟', label: 'catch fish', async play(st) {
    st.set('st-lb-swim', false); st.set('st-mk-swim', false); st.act('boy', null);
    st.look(X.swim + 40);
    st.show('fish', true); st.sfx('drip', { vol: 0.5 });
    await st.walk('fish', X.swim + 40, { y: 236, speed: 120, follow: false });
    st.pose('boy', 'e054_grab'); st.fx('drops', X.swim + 20, 240); st.sfx('splash', { vol: 0.8, rate: 1.1 });
    st.show('fish', false); st.place('fish', X.swim + 90, 290);
    st.hold('boy', 'e054_fish'); st.mood('boy', 'joy'); st.set('st-lb-fish'); st.sfx('pop', { vol: 0.5 });
    st.wait(400).then(() => st.sfx('giggle', { vol: 0.5 }));
    await st.wait(1400);
  } },
  { key: ['Minh was surprised'], icon: '😮', label: 'surprised', async play(st) {
    st.set('st-lb-fish', false);
    st.sfx('whoosh', { vol: 0.5, rate: 1.2 });
    await st.look(300, { dur: 1100 });
    st.pose('minh', 'e054_sitwow'); st.mood('minh', 'wow');
    st.fx('sparkle', X.minh, 150);
    await st.wait(1100);
    st.pose('minh', 'sit');
  } },
  { key: ['Could you watch TV'], icon: '📺', label: 'watch TV?', async play(st) {
    st.look(290);
    st.mood('minh', 'happy'); st.pose('minh', 'e054_sitask'); st.sfx('pop', { vol: 0.5 });
    await st.say('minh', 'Could you watch TV?', 1800);
  } },
  { key: ['he asked'], icon: '❓', label: 'he asked', async play(st) {
    st.look(230, { dur: 600 });
    st.face('minh', -1); st.pose('minh', 'e054_sitpoint'); st.act('minh', 'point');
    st.fx('sparkle', X.tv, 160, { quiet: true }); st.sfx('ding', { vol: 0.5 });
    await st.wait(900);
    st.act('minh', null); st.face('minh', 1); st.pose('minh', 'e054_sitask');
    await st.wait(600);
  } },
  { key: ["No, I couldn't"], icon: '🙅', label: "No, I couldn't", async play(st) {
    st.pose('gpa', 'sit'); st.act('gpa', 'no'); st.sfx('buzz-no', { vol: 0.6 });
    st.show('notv', true); st.sfx('pop', { vol: 0.5 });
    await st.say('gpa', "No, I couldn't.", 1600);
    st.act('gpa', null);
  } },
  { key: ['TV or electricity'], icon: '💡', label: 'no electricity', async play(st) {
    st.show('notv', false); st.pose('minh', 'sit');
    st.place('boy', X.hut + 70, FLOOR, -1); st.hold('boy', null); st.pose('boy', 'shrug'); st.mood('boy', 'sad');
    await PAST(st, X.hut);
    st.set('st-icons'); st.sfx('pop', { vol: 0.5 });
    st.wait(400).then(() => st.sfx('buzz-no', { vol: 0.5 }));
    await st.wait(1400);
  } },
  { key: ['oil lamp'], icon: '🪔', label: 'oil lamp', async play(st) {
    st.set('st-icons', false);
    st.set('st-night'); st.sfx('crickets', { vol: 0.5 });
    await st.wait(600);
    st.set('st-lamp'); st.sfx('hiss', { vol: 0.4 });
    st.pose('boy', 'e054_readlamp'); st.chest('boy', 'book'); st.act('boy', 'read'); st.mood('boy', 'happy');
    await st.wait(700);
    st.sfx('page-turn', { vol: 0.6 });
    await st.wait(900);
  } },
  { key: ['Grandpa smiled'], icon: '😊', label: 'Grandpa smiled', async play(st) {
    st.act('boy', null);
    st.sfx('whoosh', { vol: 0.5, rate: 1.2 });
    await st.look(300, { dur: 1100 });
    st.mood('gpa', 'joy'); st.act('gpa', 'nod'); st.sfx('giggle', { vol: 0.4, rate: 0.8 });
    st.fx('hearts', X.gpa, 120);
    await st.wait(1300);
    st.act('gpa', null);
  } },
  { key: ["couldn't read very well", 'age of six'], icon: '6️⃣', label: 'age six', async play(st) {
    st.set('st-night', false); st.set('st-lamp', false);
    resize(st, 'boy', 0.82);
    st.place('boy', X.school - 20, FLOOR, 1); st.chest('boy', SLATE); st.pose('boy', 'e054_puzzle'); st.mood('boy', 'sad');
    await PAST(st, X.school - 20);
    st.set('st-lb-six'); st.set('st-read6'); st.sfx('pop', { vol: 0.5 });
    await st.wait(300);
    st.sfx('pencil', { vol: 0.6 });
    await st.wait(1300);
  } },
  { key: ['I learned at nine'], icon: '9️⃣', label: 'learned at nine', async play(st) {
    st.set('st-lb-six', false); st.set('st-read6', false);
    st.fx('poof', X.school - 20, FLOOR - 60);
    await st.wait(200);
    resize(st, 'boy', 1);
    st.set('st-lb-nine'); st.set('st-read9'); st.sfx('ding', { vol: 0.6 });
    st.pose('boy', 'sitClap'); st.chest('boy', null); st.act('boy', 'clap'); st.mood('boy', 'joy'); st.sfx('clap', { vol: 0.5 });
    await st.wait(1500);
    st.act('boy', null);
  } },
  { key: ['read the newspaper every day', 'Minh laughed'], icon: '📰', label: 'newspaper', async play(st) {
    st.set('st-lb-nine', false);
    st.sfx('whoosh', { vol: 0.5, rate: 1.2 });
    await st.look(300, { dur: 1100 });
    st.chest('gpa', PAPER); st.pose('gpa', 'e054_paper'); st.mood('gpa', 'happy');
    st.sfx('page-turn', { vol: 0.6 });
    await st.wait(400);
    st.pose('minh', 'sitClap'); st.act('minh', 'clap'); st.mood('minh', 'joy'); st.talk('minh', true); st.sfx('giggle', { vol: 0.7 });
    await st.wait(1600);
    st.act('minh', null); st.talk('minh', false);
  } },
];

export default {
  id: 'en054', worldW: 2300, floor: FLOOR, viewTop: 40, camStart: 40, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'notv', kind: 'thing', x: X.gpa - 24, y: 120, svg: thought(0, -36, 96, 66, `<g transform="translate(-6 6)">${TV}</g><g transform="translate(20 -8)">${CROSS}</g>`, [-30, 8]), box: [-60, -84, 120, 100] },
    { id: 'gpa', kind: 'adult', who: 'en_grandpa', x: X.gpa, s: 0.95, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 40 },
    { id: 'boy', kind: 'kid', who: 'e054_boy', x: X.hut + 110, face: -1 },
    { id: 'kite', kind: 'thing', x: X.bamboo + 6, y: FLOOR - 70, svg: KITE, box: [-70, -20, 90, 152] },
    { id: 'fish', kind: 'thing', x: X.swim + 90, y: 290, svg: `<g class="e054-fishj"><g transform="scale(1.3) rotate(-30)">${FISH}</g></g>`, box: [-20, -14, 40, 28] },
  ],
  init(st) {
    st.show('notv', false); st.show('kite', false); st.show('fish', false);
    st.pose('gpa', 'sit');
  },
};
