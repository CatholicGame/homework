/**
 * Bài 109 "If I Lived on Lumo" (câu điều kiện loại 2: If I lived…, I would…; wish + quá khứ). Một thế giới đi từ phải
 * sang trái rồi quay lại: vườn đêm (phi thuyền đã sửa bằng đồ tái chế, Bíp lau cho bóng, "almost ready") → phòng ngủ của
 * Minh (giường, đèn ngủ, cửa sổ nhìn ra phi thuyền).
 * Minh nằm tưởng tượng: bong bóng nghĩ lớn hiện từng cảnh "nếu…" (hai mặt trời hai cái bóng, bơi biển tím, bay đi học,
 * Minh cao nhất phố Lumo, ba mắt vừa đọc vừa vẽ). Bíp ước ở lại lâu hơn (bong bóng của Bíp: nhà Minh, bát phở buổi sáng).
 * Toạ độ cảnh: rộng 1700, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { lying, headOnly, person } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, room, doorway, thought, label, speaker, grass, fence, bush, BOWL, steam } from '../kit.js';
import { BIP_SVG, BIP_BOX, BIP_CSS, SHIP_BOX, bipSet } from '../bip.js';
import { SHIP_FIXED, SHIP_PARTS_CSS } from './en108.js';

const FLOOR = 282;
const W = 1700;
const X = { bed: 230, bip: 440, win: 590, wall: 780, ship: 1230, tree: 1330 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const BUB = { x: 268, y: 116, w: 296, h: 120 };

// ── Cảnh ──────────────────────────────────────────────────────────────────
const mango = (x) => `<g transform="translate(${x} ${FLOOR})">
  <path d="M-16 0 Q-10 -60 -18 -110 L-4 -112 Q2 -70 14 -112 L26 -108 Q12 -60 18 0Z" fill="#92400E" stroke="${L}" stroke-width="1.2"/>
  <g class="ek-sway" style="transform-origin:0 -110px">
    <ellipse cx="-50" cy="-150" rx="66" ry="44" fill="#15803D" stroke="${L}" stroke-width="1.2"/>
    <ellipse cx="54" cy="-148" rx="70" ry="46" fill="#16A34A" stroke="${L}" stroke-width="1.2"/>
    <ellipse cx="0" cy="-196" rx="78" ry="48" fill="#22C55E" stroke="${L}" stroke-width="1.2"/>
  </g></g>`;
const bed = (x) => `<g transform="translate(${x} ${FLOOR})"><rect x="-106" y="-96" width="14" height="96" rx="4" fill="#B45309" stroke="${L}" stroke-width="1.1"/>
  <rect x="-100" y="-38" width="196" height="26" rx="4" fill="#D97706" stroke="${L}" stroke-width="1.1"/><rect x="88" y="-62" width="12" height="62" rx="4" fill="#B45309" stroke="${L}" stroke-width="1.1"/>
  <rect x="-96" y="-12" width="8" height="12" fill="#92400E"/><rect x="80" y="-12" width="8" height="12" fill="#92400E"/></g>`;

function bg() {
  return `
  <defs><linearGradient id="e109sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E1B4B"/><stop offset="1" stop-color="#4338CA"/></linearGradient></defs>
  <!-- vườn đêm -->
  <rect x="${X.wall}" y="0" width="${W - X.wall}" height="315" fill="url(#e109sky)"/>
  <g transform="translate(1560 64)"><circle r="20" fill="#FEF9C3"/><circle cx="8" cy="-5" r="17" fill="#2E2A6E"/></g>
  ${Array.from({ length: 14 }, (_, i) => `<path class="ek-twinkle" style="animation-delay:${(i % 5) * 0.4}s" d="M${X.wall + 40 + i * 64} ${26 + (i * 37) % 90} l1.6 4 l4 1.6 l-4 1.6 l-1.6 4 l-1.6 -4 l-4 -1.6 l4 -1.6Z" fill="#FDE68A"/>`).join('')}
  ${grass(X.wall, W - X.wall, FLOOR, '#4D7C5A')}
  ${fence(X.wall + 60, 220, FLOOR)}${fence(1440, 240, FLOOR)}
  ${mango(X.tree)}
  <rect x="${X.wall}" y="0" width="${W - X.wall}" height="315" fill="#1E1B4B" opacity="0.28"/>
  <!-- phòng ngủ -->
  ${room(0, X.wall, FLOOR, '#C7D2FE', '#B9824F')}
  <rect x="${X.wall - 8}" y="0" width="16" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  ${doorway(700, FLOOR)}
  <!-- cửa sổ: vườn đêm, phi thuyền dưới gốc xoài, đèn chạy -->
  <g transform="translate(${X.win} 0)"><rect x="-62" y="56" width="124" height="104" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/>
    <rect x="-56" y="62" width="112" height="92" fill="#312E81"/>
    <circle cx="34" cy="80" r="7" fill="#FEF9C3"/><path d="M-56 132 Q0 120 56 130 V154 H-56Z" fill="#3F6B4C"/>
    <g transform="translate(-6 142) scale(0.36)" class="e109-mini ship-fixed e108-done">${SHIP_FIXED}</g>
    <path d="M0 62 V154 M-56 108 H56" stroke="#fff" stroke-width="3" opacity="0.5"/>
    <path d="M-66 54 Q-40 110 -62 168 L-70 168 V50Z M66 54 Q40 110 62 168 L70 168 V50Z" fill="#A78BFA" stroke="${L}" stroke-width="1"/></g>
  <!-- đèn ngủ, tủ đầu giường -->
  <g transform="translate(70 ${FLOOR})"><rect x="-22" y="-52" width="44" height="52" rx="3" fill="#F59E0B" stroke="${L}" stroke-width="1"/><circle cy="-30" r="2.4" fill="${L}"/>
    <path d="M0 -52 V-72" stroke="#57534E" stroke-width="2.4"/><circle class="e109-glow" cy="-84" r="34" fill="#FEF08A" opacity="0.35"/><path d="M-14 -70 L-9 -92 H9 L14 -70Z" fill="#FDE68A" stroke="${L}" stroke-width="1"/></g>
  <g transform="translate(400 70)"><circle r="18" fill="#fff" stroke="${L}" stroke-width="1.2"/><path d="M0 -12 V0 L8 6" stroke="${L}" stroke-width="2" fill="none" stroke-linecap="round"/></g>
  ${bed(X.bed)}
  <g class="e109-ly e109-ly-happy">${lying(X.bed + 6, FLOOR - 30, 'en_minh_pj', { mood: 'happy', len: 150, blanket: '#93C5FD' })}</g>
  <g class="e109-ly e109-ly-joy">${lying(X.bed + 6, FLOOR - 30, 'en_minh_pj', { mood: 'joy', len: 150, blanket: '#93C5FD' })}</g>
  <g class="e109-ly e109-ly-sad">${lying(X.bed + 6, FLOOR - 30, 'en_minh_pj', { mood: 'sad', len: 150, blanket: '#93C5FD' })}</g>
`;
}

// ── Cảnh tưởng tượng trong bong bóng (gốc ở tâm bong bóng, vùng ~ 250 × 104) ──────────────
const mini = (x, y, pose = 'stand', s = 0.36, mood = 'joy') => person(x, y, 'en_minh_home', pose, { s, mood });
const sunAt = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r + 5}" fill="${c}" opacity="0.35"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="${L}" stroke-width="0.8"/>`;
const frame = (inner, sky = '#FBCFE8') => `<rect x="-124" y="-50" width="248" height="100" rx="14" fill="${sky}"/>${inner}`;
const S2 = `<g class="e109-in e109-in-s2">${frame(`${sunAt(-90, -28, 12, '#FB923C')}${sunAt(90, -30, 10, '#FACC15')}
  <path d="M-124 26 Q0 16 124 26 V50 H-124Z" fill="#C084FC"/>
  <g class="e109-shadow e109-sh1"><ellipse cx="22" cy="30" rx="26" ry="5" fill="#581C87" opacity="0.5" transform="rotate(8 0 30)"/></g>
  <g class="e109-shadow e109-sh2"><ellipse cx="-22" cy="30" rx="26" ry="5" fill="#581C87" opacity="0.5" transform="rotate(-8 0 30)"/></g>
  ${mini(0, 30)}
  <g class="e109-tag"><g transform="translate(0 -38)"><rect x="-44" y="-10" width="88" height="17" rx="8" fill="#fff" stroke="#7C3AED" stroke-width="1.2"/><text y="3" text-anchor="middle" ${NUN} font-size="11" fill="#7C3AED">two shadows</text></g></g>`)}</g>`;
const BUS = `<g><rect x="-26" y="-18" width="52" height="26" rx="5" fill="#FACC15" stroke="${L}" stroke-width="1"/>${[-16, -2, 12].map((x) => `<rect x="${x - 5}" y="-13" width="10" height="9" rx="1.5" fill="#BAE6FD" stroke="${L}" stroke-width="0.6"/>`).join('')}
  <circle cx="-14" cy="9" r="5" fill="#1F2937"/><circle cx="14" cy="9" r="5" fill="#1F2937"/></g>`;
const SCHOOL = `<g><path d="M-22 -14 L0 -28 L22 -14Z" fill="#EF4444" stroke="${L}" stroke-width="0.8"/><rect x="-20" y="-14" width="40" height="30" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/><rect x="-6" y="2" width="12" height="14" fill="#B45309"/></g>`;
const S3 = `<g class="e109-in e109-in-s3">${frame(`${sunAt(-100, -36, 8, '#FB923C')}${sunAt(-80, -40, 6, '#FACC15')}
  <path d="M-124 6 Q-60 0 -4 6 V50 H-124Z" fill="#7C3AED"/>
  <g class="e109-wave"><path d="M-116 18 q6 -4 12 0 q6 4 12 0 M-60 30 q6 -4 12 0 q6 4 12 0 M-96 40 q6 -4 12 0 q6 4 12 0" stroke="#DDD6FE" stroke-width="1.6" fill="none"/></g>
  <g class="e109-swim"><g transform="translate(-62 14)">${headOnly('en_minh_home', { s: 0.36, mood: 'joy' })}<path d="M-14 6 q-6 -10 -2 -14 M14 6 q6 -10 2 -14" stroke="#F5C9A6" stroke-width="3.4" fill="none" stroke-linecap="round"/></g></g>
  <g transform="translate(52 22)">${BUS}<g class="e109-nobus"><circle r="22" fill="none" stroke="#DC2626" stroke-width="3"/><path d="M-15 -15 L15 15" stroke="#DC2626" stroke-width="3"/></g></g>
  <g transform="translate(104 4) scale(0.9)">${SCHOOL}</g>
  <g class="e109-fly"><g transform="translate(0 -14) rotate(-14)">${mini(0, 18, 'cheer', 0.3)}</g></g>`, '#FDE7F3')}</g>`;
const tinyBip = (x, s) => `<g class="m-joy" transform="translate(${x} 36) scale(${s})">${BIP_SVG}</g>`;
const S5 = `<g class="e109-in e109-in-s5">${frame(`${sunAt(-100, -32, 9, '#FB923C')}${sunAt(-76, -38, 6, '#FACC15')}
  <path d="M-124 36 H124 V50 H-124Z" fill="#C084FC"/>
  ${[[78, 14, 20], [100, 10, 26]].map(([x, w, h]) => `<path d="M${x - w} 36 Q${x - w} ${36 - h} ${x} ${36 - h} Q${x + w} ${36 - h} ${x + w} 36Z" fill="#A5F3FC" stroke="${L}" stroke-width="0.8"/>`).join('')}
  ${tinyBip(-70, 0.32)}${tinyBip(-40, 0.3)}${tinyBip(40, 0.32)}
  ${mini(0, 38, 'cheer', 0.56)}
  <g class="e109-tag"><g transform="translate(-4 -38)"><rect x="-48" y="-10" width="96" height="17" rx="8" fill="#fff" stroke="#2563EB" stroke-width="1.2"/><text y="3" text-anchor="middle" ${NUN} font-size="11" fill="#2563EB">the tallest boy</text></g></g>`, '#FCE7F3')}</g>`;
/** Đầu Minh có thêm con mắt thứ ba giữa trán (gốc tâm đầu). */
const eye3 = `<g class="e109-eye3"><ellipse cx="0" cy="-12" rx="5.6" ry="6.2" fill="#fff" stroke="${L}" stroke-width="1"/><circle cx="0.6" cy="-11" r="3" fill="#1F2937"/><circle cx="1.6" cy="-12.4" r="1" fill="#fff"/></g>`;
const S6 = `<g class="e109-in e109-in-s6">${frame(`<g transform="translate(-40 6)">${headOnly('en_minh_home', { s: 1.25, mood: 'happy' })}<g transform="scale(1.25)">${eye3}</g></g>
  <g class="m-happy" transform="translate(66 44) scale(0.78)">${BIP_SVG}</g>
  <g class="e109-tag"><g transform="translate(14 -38)"><rect x="-38" y="-10" width="76" height="17" rx="8" fill="#fff" stroke="#16A34A" stroke-width="1.2"/><text y="3" text-anchor="middle" ${NUN} font-size="11" fill="#16A34A">three eyes</text></g></g>`, '#ECFCCB')}</g>`;
const S7 = `<g class="e109-in e109-in-s7">${frame(`<g transform="translate(0 4)">${headOnly('en_minh_home', { s: 0.95, mood: 'happy' })}<g transform="scale(0.95)">${eye3}</g></g>
  <g transform="translate(-72 18) rotate(-8)"><rect x="-28" y="-20" width="56" height="38" rx="2" fill="#fff" stroke="${L}" stroke-width="1"/><path d="M0 -20 V18" stroke="${L}" stroke-width="0.8"/>
    ${[-12, -4, 4, 12].map((y) => `<path d="M-22 ${y} H-5 M5 ${y} H22" stroke="#94A3B8" stroke-width="1.2"/>`).join('')}<rect x="-28" y="-20" width="56" height="38" fill="none" stroke="#2563EB" stroke-width="2.4" rx="2"/></g>
  <g transform="translate(74 18) rotate(6)"><rect x="-28" y="-20" width="56" height="38" rx="2" fill="#fff" stroke="${L}" stroke-width="1"/>
    <path class="e109-draw" d="M-18 10 L-6 -6 L4 6 L12 -2 L20 10 M-14 -12 a5 5 0 1 0 0.1 0" stroke="#EA580C" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <g class="e109-pen"><g transform="translate(18 2) rotate(30)"><rect x="-1.8" y="-18" width="3.6" height="18" fill="#FACC15" stroke="${L}" stroke-width="0.6"/><path d="M-1.8 0 L0 5 L1.8 0Z" fill="#FDE68A" stroke="${L}" stroke-width="0.5"/></g></g></g>
  <g class="e109-tag"><g transform="translate(0 -40)"><rect x="-54" y="-10" width="108" height="17" rx="8" fill="#fff" stroke="#EA580C" stroke-width="1.2"/><text y="3" text-anchor="middle" ${NUN} font-size="11" fill="#EA580C">at the same time</text></g></g>`, '#FEF3C7')}</g>`;
// Bong bóng của Bíp
const HOUSE = `<g><rect x="-30" y="-20" width="60" height="40" fill="#FEF3C7" stroke="${L}" stroke-width="1"/><path d="M-36 -18 L0 -42 L36 -18Z" fill="#DC2626" stroke="${L}" stroke-width="1"/><rect x="-8" y="2" width="16" height="18" fill="#B45309"/></g>`;
const S9 = `<g class="e109-in e109-in-s9">${frame(`<path d="M-124 30 H124 V50 H-124Z" fill="#86EFAC"/><g transform="translate(-50 10)">${HOUSE}</g>
  ${mini(30, 34, 'stand', 0.34, 'joy')}${tinyBip(58, 0.34).replace('translate(58 36)', 'translate(60 34)')}
  <g class="e109-heart"><path d="M44 -26 c-6 -10 -20 -4 -14 6 l14 12 l14 -12 c6 -10 -8 -16 -14 -6Z" fill="#F472B6" stroke="${L}" stroke-width="0.9"/></g>
  <g class="e109-tag"><g transform="translate(-50 -40)"><rect x="-42" y="-10" width="84" height="17" rx="8" fill="#fff" stroke="#DB2777" stroke-width="1.2"/><text y="3" text-anchor="middle" ${NUN} font-size="11" fill="#DB2777">stay longer</text></g></g>`, '#E0F2FE')}</g>`;
const S10 = `<g class="e109-in e109-in-s10">${frame(`<g class="e109-rise"><circle cx="-80" cy="-6" r="16" fill="#FDE047" stroke="#F59E0B" stroke-width="1.4"/></g>
  <path d="M-124 10 H124 V50 H-124Z" fill="#FDE68A"/><text x="-80" y="34" text-anchor="middle" ${NUN} font-size="11" fill="#B45309">every morning</text>
  <g transform="translate(30 12) scale(2.2)">${BOWL}</g>${steam(30, -12)}
  <g transform="translate(86 20)">${tinyBip(0, 0.34).replace('translate(0 36)', 'translate(0 22)')}</g>
  <g class="e109-tag"><g transform="translate(30 -40)"><rect x="-24" y="-10" width="48" height="17" rx="8" fill="#fff" stroke="#EA580C" stroke-width="1.2"/><text y="3" text-anchor="middle" ${NUN} font-size="11" fill="#EA580C">pho</text></g></g>`, '#FFF7ED')}</g>`;
const PLANET = `<g class="e109-in e109-in-s1"><g transform="translate(0 -4)"><circle r="30" fill="#A78BFA" stroke="${L}" stroke-width="1.2"/><path d="M-26 8 Q0 18 26 4" stroke="#7C3AED" stroke-width="5" fill="none"/>
  <ellipse rx="48" ry="10" fill="none" stroke="#FACC15" stroke-width="3" transform="rotate(-14)"/><circle cx="-16" cy="-10" r="5" fill="#C4B5FD"/></g>
  <text y="44" text-anchor="middle" ${NUN} font-size="14" fill="#7C3AED">Lumo</text></g>`;

function fg() {
  const tailMinh = [X.bed - 70, FLOOR - 70], tailBip = [X.bip - 10, FLOOR - 104];
  return `
  ${bush(X.wall + 140, FLOOR + 34, 0.6, '#166534')}${bush(1500, FLOOR + 34, 0.7, '#166534')}
  <!-- thanh "almost ready" trên phi thuyền -->
  <g class="e109-lb e109-lb-ready"><g transform="translate(${X.ship} 120)"><rect x="-62" y="-8" width="124" height="16" rx="8" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <rect class="e109-bar" x="-58" y="-4.5" width="116" height="9" rx="4.5" fill="#22C55E"/>
    <text y="-14" text-anchor="middle" ${NUN} font-size="14" fill="#FDE68A">almost ready</text></g></g>
  ${thought(BUB.x, BUB.y, BUB.w, BUB.h, `${PLANET}${S2}${S3}${S6}${S7}`, tailMinh, 'e109-th e109-th-minh')}
  ${thought(BUB.x, BUB.y, BUB.w, BUB.h, `${S5}${S9}${S10}`, tailBip, 'e109-th e109-th-bip')}
  <g class="e109-lb e109-lb-minh">${speaker(X.bed - 60, FLOOR - 70, 'Minh', '#EA580C')}</g>
  <g class="e109-lb e109-lb-soon">${label(X.win, 188, 'soon', '#7C3AED', 16)}</g>`;
}

const LB = ['ready', 'minh', 'soon'];
const CSS = `
${SHIP_PARTS_CSS}
.e109-lb, .e109-th, .e109-in { opacity: 0; transition: opacity .3s; }
${LB.map((k) => `.st-lb-${k} .e109-lb-${k}`).join(', ')} { opacity: 1; }
.st-th-minh .e109-th-minh, .st-th-bip .e109-th-bip { opacity: 1; }
${['s1', 's2', 's3', 's5', 's6', 's7', 's9', 's10'].map((k) => `.st-${k} .e109-in-${k}`).join(', ')} { opacity: 1; }
.e109-th { transform-box: fill-box; transform-origin: 30% 100%; }
.st-th-minh .e109-th-minh, .st-th-bip .e109-th-bip { animation: e109Pop .4s cubic-bezier(.3,1.5,.6,1); }
@keyframes e109Pop { from { transform: scale(.5); } }
.e109-bar { transform-box: fill-box; transform-origin: 0 50%; transform: scaleX(.3); transition: transform 1.8s ease-out; }
.st-ready .e109-bar { transform: scaleX(.9); }
/* Minh nằm: một nét mặt */
.e109-ly { opacity: 0; } .e109-ly-happy { opacity: 1; }
.st-ly-joy .e109-ly-joy, .st-ly-sad .e109-ly-sad { opacity: 1; } .st-ly-joy .e109-ly-happy, .st-ly-sad .e109-ly-happy { opacity: 0; }
/* Cảnh 2: hai mặt trời, hai cái bóng mọc ra */
.e109-shadow { opacity: 0; transform-box: fill-box; transform-origin: 50% 50%; transform: scaleX(.1); transition: opacity .3s, transform .6s ease-out; }
.st-sh .e109-shadow { opacity: 1; transform: none; } .st-sh .e109-sh2 { transition-delay: .5s; }
.e109-tag { opacity: 0; transition: opacity .3s; }
.st-tag .e109-tag { opacity: 1; }
/* Cảnh 3: bơi, xe buýt gạch chéo, bay tới trường */
.e109-swim { animation: e109Swim 1s ease-in-out infinite alternate; }
@keyframes e109Swim { from { transform: translate(-6px, 2px); } to { transform: translate(8px, -2px); } }
.e109-wave { animation: e109Wave 1.4s ease-in-out infinite alternate; } @keyframes e109Wave { to { transform: translateX(8px); } }
.e109-nobus { opacity: 0; transition: opacity .3s; } .st-nobus .e109-nobus { opacity: 1; }
.e109-fly { opacity: 0; transform: translate(-30px, 0); } .st-fly .e109-fly { opacity: 1; transform: translate(96px, -18px); transition: transform 1.6s ease-in-out, opacity .2s; }
/* Cảnh 6, 7: con mắt thứ ba mở ra; bút vẽ */
.e109-eye3 { transform-box: fill-box; transform-origin: 50% 50%; transform: scaleY(.05); transition: transform .35s cubic-bezier(.3,1.6,.6,1); }
.st-eye .e109-eye3 { transform: none; }
.e109-draw { stroke-dasharray: 90; stroke-dashoffset: 90; } .st-draw .e109-draw { stroke-dashoffset: 0; transition: stroke-dashoffset 1.6s linear; }
.st-draw .e109-pen { animation: e109Pen .25s ease-in-out infinite alternate; } @keyframes e109Pen { to { transform: translate(-4px, -3px); } }
/* Cảnh 9, 10 */
.e109-heart { transform-box: fill-box; transform-origin: center; animation: e109Beat .6s ease-in-out infinite alternate; } @keyframes e109Beat { to { transform: scale(1.2); } }
.e109-rise { transform: translateY(14px); transition: transform 1.4s ease-out; } .st-rise .e109-rise { transform: none; }
/* Bíp lau phi thuyền: tay phải vẫy nhanh */
.act-e109wipe .bip-armR { animation: e109Wipe .25s ease-in-out infinite alternate; }
@keyframes e109Wipe { from { rotate: -100deg; } to { rotate: -60deg; } }
.e109-glow { animation: e109Lamp 2s ease-in-out infinite alternate; } @keyframes e109Lamp { to { opacity: .5; } }
/* Râu sáng dịu: chậm, nhạt */
.e109-soft .bip-halo { opacity: .35; animation-duration: 1.6s; }
@media (prefers-reduced-motion: reduce) {
  .e109-swim, .e109-wave, .e109-heart { animation-duration: 3s; }
  .act-e109wipe .bip-armR { animation-duration: .6s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const minhSays = async (st, ms) => { st.set('st-lb-minh'); st.set('st-ly-joy'); await st.wait(ms); };

const BEATS = [
  { key: ['The spaceship was almost ready'], icon: '🛸', label: 'almost ready', async play(st) {
    st.look(X.ship - 40);
    st.act('bip', 'e109wipe'); st.mood('bip', 'happy');
    await st.loop('wipe', () => st.wait(900), { vol: 0.8 });
    st.fx('sparkle', X.ship, FLOOR - 70, { quiet: true });
    st.set('st-lb-ready'); st.sfx('ding', { vol: 0.5 });
    await st.wait(200);
    st.set('st-ready'); st.sfx('robot-beep', { vol: 0.4 });
    await st.wait(1200);
    st.act('bip', null);
  } },
  { key: ['One night', 'Minh lay in bed', 'imagined life on Lumo'], icon: '🛏️', label: 'imagined', async play(st) {
    st.set('st-lb-ready', false);
    st.look(300, { dur: 2000 });
    await st.walk('bip', X.bip, { speed: 420, follow: false });
    st.face('bip', -1);
    st.set('st-th-minh'); st.set('st-s1'); st.sfx('pop', { vol: 0.6 });
    await st.wait(1400);
  } },
  { key: ['If I lived on Lumo', 'I would have two shadows', 'there are two suns'], icon: '☀️', label: 'two shadows', async play(st) {
    st.set('st-s1', false); st.set('st-s2'); st.sfx('pop', { vol: 0.4 });
    const talk = minhSays(st, 4200);
    await st.wait(1300);
    st.set('st-sh'); st.sfx('whoosh', { vol: 0.4 });
    await st.wait(900);
    st.set('st-tag'); st.sfx('ding', { vol: 0.5 });
    st.mood('bip', 'wow');
    await talk;
  } },
  { key: ['swim in the purple sea', "wouldn't need a bus", 'fly to school'], icon: '🏊', label: 'swim · fly', async play(st) {
    off(st, 'st-s2', 'st-sh', 'st-tag');
    st.set('st-s3'); st.sfx('splash', { vol: 0.6 });
    const talk = minhSays(st, 5200);
    await st.wait(1700);
    st.set('st-nobus'); st.sfx('buzz-no', { vol: 0.35 });
    await st.wait(1300);
    st.set('st-fly'); st.sfx('whoosh', { vol: 0.7 });
    await talk;
    st.set('st-lb-minh', false); st.set('st-ly-joy', false);
  } },
  { key: ['Bip smiled'], icon: '😊', label: 'smiled', async play(st) {
    off(st, 'st-s3', 'st-nobus', 'st-fly', 'st-th-minh', 'st-lb-minh', 'st-ly-joy');
    st.look(300);
    st.mood('bip', 'joy'); st.sfx('giggle', { vol: 0.4 });
    st.act('bip', 'hover');
    await st.wait(1500);
    st.act('bip', null); st.mood('bip', 'happy');
  } },
  { key: ['If you came to Lumo', 'the tallest boy in my town'], icon: '📏', label: 'the tallest boy', async play(st) {
    st.set('st-th-bip'); st.set('st-s5'); st.sfx('pop', { vol: 0.5 });
    st.talk('bip', true);
    await st.wait(1600);
    st.set('st-tag'); st.sfx('ding', { vol: 0.5 });
    st.set('st-ly-joy');
    await st.wait(1600);
    st.talk('bip', false);
  } },
  { key: ['I wish I had three eyes like you', 'said Minh'], icon: '👀', label: 'three eyes', async play(st) {
    off(st, 'st-s5', 'st-tag', 'st-th-bip');
    st.set('st-th-minh'); st.set('st-s6'); st.sfx('pop', { vol: 0.5 });
    const talk = minhSays(st, 3200);
    await st.wait(1200);
    st.set('st-eye'); st.sfx('pop', { vol: 0.7, rate: 1.4 });
    await st.wait(300);
    st.set('st-tag'); st.mood('bip', 'joy');
    await talk;
  } },
  { key: ['read and draw at the same time'], icon: '✏️', label: 'read and draw', async play(st) {
    off(st, 'st-s6', 'st-tag');
    st.set('st-s7'); st.sfx('page-turn', { vol: 0.6 });
    const talk = minhSays(st, 3000);
    await st.wait(500);
    st.set('st-draw');
    await st.loop('pencil', () => st.wait(1600), { vol: 0.8 });
    st.set('st-tag');
    await talk;
    st.set('st-lb-minh', false);
  } },
  { key: ["Bip's antennae glowed softly"], icon: '✨', label: 'glowed softly', async play(st) {
    off(st, 'st-s7', 'st-draw', 'st-tag', 'st-eye', 'st-th-minh', 'st-lb-minh', 'st-ly-joy');
    st.look(300);
    st.mood('bip', 'happy');
    bipSet(st, 'bip', 'bip-glow'); bipSet(st, 'bip', 'e109-soft');
    st.sfx('ding', { vol: 0.3, rate: 0.6 });
    await st.wait(1800);
  } },
  { key: ['I wish I could stay here longer'], icon: '🏡', label: 'stay longer', async play(st) {
    st.set('st-th-bip'); st.set('st-s9'); st.sfx('pop', { vol: 0.5 });
    st.talk('bip', true);
    await st.wait(700);
    st.set('st-tag'); st.sfx('hearts', { vol: 0.5 });
    await st.wait(1500);
    st.talk('bip', false);
  } },
  { key: ['If I stayed', 'eat pho every morning'], icon: '🍜', label: 'pho every morning', async play(st) {
    off(st, 'st-s9', 'st-tag');
    st.set('st-s10'); st.sfx('pop', { vol: 0.5 });
    st.talk('bip', true);
    await st.wait(500);
    st.set('st-rise'); st.sfx('birds', { vol: 0.4 });
    await st.wait(1000);
    st.set('st-tag'); st.sfx('slurp', { vol: 0.7 });
    await st.wait(1300);
    st.talk('bip', false);
  } },
  { key: ['Minh laughed', 'he felt a little sad'], icon: '😔', label: 'a little sad', async play(st) {
    off(st, 'st-s10', 'st-rise', 'st-tag', 'st-th-bip');
    st.look(300);
    st.set('st-ly-joy'); st.sfx('giggle', { vol: 0.6 });
    st.mood('bip', 'joy');
    await st.wait(1300);
    st.set('st-ly-joy', false); st.set('st-ly-sad'); st.sfx('drip', { vol: 0.35 });
    st.mood('bip', 'happy');
    await st.wait(1300);
  } },
  { key: ['His friend would leave soon'], icon: '🌙', label: 'leave soon', async play(st) {
    st.look(X.win - 10, { dur: 1300 });
    st.sfx('crickets', { vol: 0.5 });
    await st.wait(800);
    st.set('st-lb-soon'); st.sfx('robot-beep', { vol: 0.3, rate: 0.8 });
    st.face('bip', 1); st.mood('bip', 'sad');
    await st.wait(1500);
  } },
];

export default {
  id: 'en109', worldW: W, floor: FLOOR, viewTop: 40, camStart: 1000, css: KIT_CSS + BIP_CSS + CSS, bg, fg, beats: BEATS,
  order: [0, 2, 3, 6, 10, 12],
  cast: [
    { id: 'ship', kind: 'thing', svg: SHIP_FIXED, box: SHIP_BOX, x: X.ship, s: 1 },
    { id: 'bip', kind: 'thing', svg: BIP_SVG, box: BIP_BOX, x: X.ship - 100, face: 1 },
  ],
  init(st) {
    bipSet(st, 'ship', 'ship-fixed'); bipSet(st, 'ship', 'e108-done');
  },
};
