/**
 * Bài 79 "Hoi An Lantern Night" (trật tự tính từ; very / quite / really): đêm rằm ở phố cổ Hội An, đi từ trái sang phải:
 * đầu phố (đèn đường điện tắt dần, trăng tròn) → cửa hàng đèn lồng (đèn đỏ tròn to, đèn lụa vàng nhỏ, đèn giấy xanh,
 * cô bán hàng) → con phố hẹp nhà gỗ cổ tường vàng → quán cao lầu (bàn thấp, ghế đẩu) → bờ sông (thả đèn hoa đăng, ghế đá).
 * Cỡ đèn theo thật: đèn đỏ to (đường kính ≈ 40 cm), đèn lụa nhỏ, đèn xanh vừa, đèn xanh lá của Lan nhỏ nhất.
 * Toạ độ cảnh: rộng 2000, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, label } from '../kit.js';

const FLOOR = 282;
const W = 2000;
const X = { lamp1: 120, lamp2: 330, shop: 700, counter: 800, houses: 960, stall: 1360, bench: 1500, bank: 1700 };

Object.assign(CAST, {
  e079_seller: { adult: true, hair: 'bun', top: 'blouse', shirt: '#FDE68A', bottom: 'pants', bottomC: '#1C1917', shoe: '#57534E', hat: 'conical' },
});

// ── Đèn lồng (gốc = móc treo) ───────────────────────────────────────────────
const glow = (r, c = '#FDE68A') => `<circle class="e079-glow" cy="${r + 6}" r="${r * 1.6}" fill="${c}" opacity="0.3"/>`;
/** Đèn đỏ tròn to. */
const RED = (r = 16) => `${glow(r, '#FCA5A5')}<path d="M0 0 V5" stroke="${L}" stroke-width="1"/><rect x="-6" y="4" width="12" height="4" rx="1" fill="#FACC15" stroke="${L}" stroke-width="0.7"/>
  <ellipse cy="${r + 7}" rx="${r}" ry="${r * 0.92}" fill="#EF4444" stroke="${L}" stroke-width="1"/><path d="M${-r * 0.5} ${r * 0.4 + 7} Q0 ${r + 7} ${-r * 0.5} ${r * 1.6 + 7} M${r * 0.5} ${r * 0.4 + 7} Q0 ${r + 7} ${r * 0.5} ${r * 1.6 + 7}" stroke="#B91C1C" stroke-width="0.9" fill="none"/>
  <rect x="-6" y="${r * 1.9 + 6}" width="12" height="4" rx="1" fill="#FACC15" stroke="${L}" stroke-width="0.7"/><path d="M0 ${r * 1.9 + 10} V${r * 1.9 + 20}" stroke="#FACC15" stroke-width="2"/>`;
/** Đèn lụa vàng nhỏ (dáng thoi). */
const YEL = (r = 8) => `${glow(r)}<path d="M0 0 V4" stroke="${L}" stroke-width="0.9"/><path d="M-4 4 H4 Q${r + 3} ${r + 6} 4 ${2 * r + 8} H-4 Q${-r - 3} ${r + 6} -4 4Z" fill="#FACC15" stroke="${L}" stroke-width="0.9"/>
  <path d="M0 5 V${2 * r + 7}" stroke="#EAB308" stroke-width="0.8"/><path d="M0 ${2 * r + 8} V${2 * r + 15}" stroke="#EF4444" stroke-width="1.6"/>`;
/** Đèn giấy xanh (trụ tròn). */
const BLUE = (r = 11) => `${glow(r, '#BFDBFE')}<path d="M0 0 V4" stroke="${L}" stroke-width="0.9"/><rect x="${-r}" y="4" width="${2 * r}" height="${r * 2.2}" rx="${r * 0.7}" fill="#3B82F6" stroke="${L}" stroke-width="1"/>
  <path d="M${-r} ${4 + r * 0.7} H${r} M${-r} ${4 + r * 1.5} H${r}" stroke="#1D4ED8" stroke-width="0.8"/><path d="M0 ${4 + r * 2.2} V${12 + r * 2.2}" stroke="#FACC15" stroke-width="1.6"/>`;
/** Đèn xanh lá nhỏ của Lan. */
const GREEN = (r = 8) => `<path d="M0 0 V4" stroke="${L}" stroke-width="0.9"/><path d="M-3 4 H3 Q${r + 3} ${r + 5} 3 ${2 * r + 6} H-3 Q${-r - 3} ${r + 5} -3 4Z" fill="#22C55E" stroke="${L}" stroke-width="0.9"/>
  <path d="M-4 ${r + 5} H4" stroke="#FDE68A" stroke-width="1.2"/><path d="M0 ${2 * r + 6} V${2 * r + 12}" stroke="#FACC15" stroke-width="1.6"/>`;
/** Đèn hoa đăng thả sông (gốc = mặt nước). */
const FLOAT = (c = '#F472B6') => `<ellipse cy="-1" rx="13" ry="3" fill="#FDE68A" opacity="0.5"/><path d="M-11 -2 L-8 -12 L0 -8 L8 -12 L11 -2Z" fill="${c}" stroke="${L}" stroke-width="0.9" stroke-linejoin="round"/>
  <path d="M-3 -9 Q0 -20 3 -9Z" fill="#FDE047" stroke="#F59E0B" stroke-width="0.6"/><g class="e079-flame"><path d="M0 -12 Q-2 -16 0 -19 Q2 -16 0 -12Z" fill="#FB923C"/></g>`;
const BOWL = `<path d="M-15 -8 H15 Q14 4 0 6 Q-14 4 -15 -8Z" fill="#fff" stroke="#2563EB" stroke-width="1.2"/><path d="M-12 -8 Q0 -13 12 -8Z" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/>
  <path d="M-8 -10 l4 -2 M-2 -11 l5 -1" stroke="#16A34A" stroke-width="2.2" stroke-linecap="round"/><rect x="2" y="-12" width="6" height="3" rx="1" fill="#B45309"/><path d="M-6 -10 q4 -3 8 0" stroke="#F59E0B" stroke-width="1.2" fill="none"/>`;
const MONEY = `<rect x="-14" y="-7" width="28" height="14" rx="2" fill="#93C5FD" stroke="${L}" stroke-width="0.9"/><circle r="4" fill="#fff" stroke="#2563EB" stroke-width="0.8"/>`;
const TAG = `<path d="M0 0 V8" stroke="${L}" stroke-width="1"/><rect x="-32" y="8" width="64" height="20" rx="5" fill="#FDE047" stroke="${L}" stroke-width="1.1"/>
  <text x="0" y="23" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="12.5" fill="#B91C1C">20.000đ</text>`;

const PROPS = {
  e079_green: `<g transform="translate(0 2)">${GREEN()}</g>`,
  e079_chop: `<g transform="translate(0 -6)"><path d="M-1.5 -2 L-3 15 M2 -2 L1.5 15" stroke="${L}" stroke-width="3.4" stroke-linecap="round"/><path d="M-1.5 -2 L-3 15 M2 -2 L1.5 15" stroke="#D97706" stroke-width="2" stroke-linecap="round"/>
    <path class="pp-noodle" d="M-3 14 q3 4 -1 8 M1.5 14 q-3 4 1 8" stroke="#FDE68A" stroke-width="3" fill="none" stroke-linecap="round"/></g>`,
  e079_float: `<g transform="translate(0 6) rotate(180)">${FLOAT('#F472B6')}</g>`,
  e079_float2: `<g transform="translate(0 6) rotate(180)">${FLOAT('#A78BFA')}</g>`,
};
const POSES = {
  e079_give: { R: [70, 84], L: [10, 4] },
  e079_crouch: { R: [20, 10], L: [20, 10], dy: 30, head: 14 },
  e079_wish: { R: [24, -120], L: [24, -120], dy: 30, head: 6 },
  e079_hold: { R: [8, 4], L: [10, 4] },
  e079_eat: { R: [118, 248], L: [40, 110], dy: 22 },
  e079_tired: { R: [150, 262], L: [30, 40], dy: 20, head: 8 },
  e079_sitTired: { R: [30, 40], L: [30, 40], dy: 20, head: 10 },
};

// ── Cảnh ─────────────────────────────────────────────────────────────────
/** Nhà phố cổ: tường vàng, mái ngói nâu, cửa gỗ (x = mép trái, w rộng, h cao). */
const house = (x, w, h, { wood = false, wall = '#FCD34D' } = {}) => {
  const top = FLOOR - h;
  const roof = `<path d="M${x - 12} ${top + 4} L${x + 10} ${top - 20} H${x + w - 10} L${x + w + 12} ${top + 4}Z" fill="#9A3412" stroke="${L}" stroke-width="1.2"/>
    ${Array.from({ length: Math.floor(w / 10) }, (_, i) => `<path d="M${x + 4 + i * 10} ${top - 14} V${top + 2}" stroke="#7C2D12" stroke-width="1.2"/>`).join('')}`;
  const body = wood
    ? `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="#A16207" stroke="${L}" stroke-width="1.2"/>${Array.from({ length: Math.floor(w / 14) }, (_, i) => `<path d="M${x + 7 + i * 14} ${top + 4} V${FLOOR}" stroke="#78350F" stroke-width="1"/>`).join('')}
       <rect x="${x + w * 0.2}" y="${top + 26}" width="${w * 0.6}" height="${h - 26}" fill="#78350F" stroke="${L}"/>${[0.35, 0.65].map((t) => `<path d="M${x + w * t} ${top + 26} V${FLOOR}" stroke="#451A03" stroke-width="1.2"/>`).join('')}`
    : `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}" stroke="${L}" stroke-width="1.2"/><path d="M${x} ${top + h * 0.55} H${x + w}" stroke="#EAB308" stroke-width="2"/>
       <rect x="${x + w * 0.3}" y="${top + h * 0.45}" width="${w * 0.4}" height="${h * 0.55}" fill="#92400E" stroke="${L}"/>
       ${[0.12, 0.72].map((t) => `<rect x="${x + w * t}" y="${top + 16}" width="${w * 0.16}" height="${h * 0.24}" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/><path d="M${x + w * (t + 0.08)} ${top + 16} V${top + 16 + h * 0.24}" stroke="#92400E" stroke-width="1.4"/>`).join('')}`;
  return `<g>${body}${roof}</g>`;
};
const hang = (x, y, svg, d = 0) => `<g transform="translate(${x} ${y})"><g class="e079-sw" style="animation-delay:${d}s">${svg}</g></g>`;
const streetLamp = (x, n) => `<g transform="translate(${x} 0)"><path d="M0 ${FLOOR} V96 Q0 84 14 84 H22" stroke="#475569" stroke-width="4" fill="none"/>
  <rect x="-8" y="${FLOOR - 6}" width="16" height="6" rx="2" fill="#475569"/><path d="M14 84 L30 84 L26 92 H18Z" fill="#334155" stroke="${L}" stroke-width="0.8"/>
  <g class="e079-bulb e079-bulb${n}"><path d="M22 92 L-14 ${FLOOR} H58Z" fill="#FEF9C3" opacity="0.28"/><circle cx="22" cy="93" r="5" fill="#FEF08A"/></g><circle cx="22" cy="93" r="3.4" fill="#94A3B8" class="e079-bulbOff e079-bulbOff${n}"/></g>`;

function bg() {
  const stars = Array.from({ length: 28 }, (_, i) => `<circle cx="${(i * 73) % W}" cy="${16 + ((i * 41) % 70)}" r="${i % 3 ? 1.2 : 1.8}" fill="#FEF9C3" opacity="0.8"/>`).join('');
  return `
  <defs><linearGradient id="e079sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E1B4B"/><stop offset="1" stop-color="#4338CA"/></linearGradient></defs>
  <rect x="0" y="0" width="${W}" height="315" fill="url(#e079sky)"/>${stars}
  <g transform="translate(250 66)"><circle r="40" fill="#FEF9C3" opacity="0.18"/><circle r="24" fill="#FEF9C3" stroke="#FDE68A" stroke-width="1.4"/><circle cx="-7" cy="-5" r="4" fill="#FDE68A"/><circle cx="6" cy="6" r="3" fill="#FDE68A"/></g>
  <!-- đầu phố -->
  ${house(-10, 150, 150)}${house(150, 120, 136, { wall: '#FBBF24' })}${house(280, 160, 146)}
  ${streetLamp(X.lamp1, 1)}${streetLamp(X.lamp2, 2)}${streetLamp(470, 3)}
  ${[30, 200, 400].map((x, i) => hang(x, FLOOR - 120, RED(12), i * 0.4)).join('')}
  <!-- cửa hàng đèn lồng -->
  ${house(520, 380, 212, { wall: '#FDE047' })}
  ${[76, 132, 166].map((y) => `<rect x="536" y="${y - 3}" width="348" height="6" rx="2" fill="#7C2D12" stroke="${L}" stroke-width="0.8"/><rect x="532" y="${y - 6}" width="8" height="12" fill="#451A03"/><rect x="880" y="${y - 6}" width="8" height="12" fill="#451A03"/>`).join('')}
  ${[566, 632, 700, 768, 836].map((x, i) => `<g class="e079-red">${hang(x, 78, RED(15), i * 0.3)}</g>`).join('')}
  ${[580, 640, 700, 760, 820, 866].map((x, i) => `<g class="e079-yel">${hang(x, 134, YEL(6), i * 0.25 + 0.1)}</g>`).join('')}
  ${[578, 650, 720, 790].map((x, i) => `<g class="e079-blue">${hang(x, 168, BLUE(9), i * 0.35)}</g>`).join('')}
  <g transform="translate(${X.counter + 54} 168)"><g class="e079-greenHook">${hang(0, 0, GREEN(7), 0.2)}</g></g>
  <!-- phố hẹp, nhà gỗ cổ -->
  ${house(X.houses - 40, 130, 150, { wood: true })}${house(X.houses + 100, 110, 140)}${house(X.houses + 220, 140, 156, { wood: true })}${house(X.houses + 370, 120, 144, { wall: '#FBBF24' })}
  ${[X.houses + 30, X.houses + 160, X.houses + 290].map((x, i) => hang(x, FLOOR - 130, i % 2 ? YEL(8) : RED(12), i * 0.5)).join('')}
  <!-- quán cao lầu -->
  ${house(X.stall - 70, 200, 150, { wall: '#FDE68A' })}
  <rect x="${X.stall - 76}" y="${FLOOR - 160}" width="212" height="22" rx="4" fill="#fff" stroke="${L}"/><text x="${X.stall + 30}" y="${FLOOR - 144}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="14" fill="#B91C1C">CAO LAU</text>
  ${hang(X.stall - 40, FLOOR - 134, RED(10), 0.2)}${hang(X.stall + 100, FLOOR - 134, RED(10), 0.6)}
  <!-- bờ sông: cây, ghế đá, sông -->
  <path d="M1640 ${FLOOR - 140} Q1630 ${FLOOR - 60} 1636 ${FLOOR}" stroke="#78350F" stroke-width="9" fill="none"/>
  <g class="ek-sway" style="transform-origin:1640px ${FLOOR - 140}px"><circle cx="1640" cy="${FLOOR - 160}" r="38" fill="#166534" stroke="${L}"/><circle cx="1606" cy="${FLOOR - 140}" r="24" fill="#15803D" stroke="${L}"/><circle cx="1672" cy="${FLOOR - 140}" r="26" fill="#14532D" stroke="${L}"/></g>
  <rect x="0" y="${FLOOR}" width="${X.bank}" height="${315 - FLOOR}" fill="#A8A29E" stroke="${L}"/>
  ${Array.from({ length: Math.floor(X.bank / 40) }, (_, i) => `<path d="M${i * 40} ${FLOOR} V315" stroke="#78716C" stroke-width="1"/>`).join('')}
  <!-- sông: bờ bên kia có nhà xa, ánh đèn soi mặt nước -->
  ${[1760, 1860, 1950].map((x, i) => `<rect x="${x - 34}" y="${180 + (i % 2) * 8}" width="68" height="${70 - (i % 2) * 8}" fill="#B45309" opacity="0.75"/><path d="M${x - 42} ${182 + (i % 2) * 8} L${x} ${160 + (i % 2) * 8} L${x + 42} ${182 + (i % 2) * 8}Z" fill="#7C2D12" opacity="0.8"/><circle cx="${x}" cy="${206 + (i % 2) * 8}" r="6" fill="#EF4444"/>`).join('')}
  <rect x="${X.bank}" y="248" width="${W - X.bank}" height="${315 - 248}" fill="#1E3A8A" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: 9 }, (_, i) => `<path d="M${X.bank + 14 + i * 34} ${262 + (i % 3) * 14} q6 -4 12 0 q6 4 12 0" stroke="#60A5FA" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  ${[1760, 1860, 1950].map((x) => `<path d="M${x - 3} 252 V300 M${x + 3} 256 V296" stroke="#F87171" stroke-width="3" opacity="0.4"/>`).join('')}
  <rect x="${X.bank - 6}" y="${FLOOR - 4}" width="12" height="${315 - FLOOR + 4}" fill="#78716C" stroke="${L}"/>
  <!-- trăng soi mặt sông -->
`;
}

function fg() {
  const lab = (k, x, y, t, c, s) => `<g class="e079-lb e079-lb-${k}">${label(x, y, t, c, s)}</g>`;
  return `
  <!-- quầy cửa hàng đèn (che chân cô bán hàng) -->
  <rect x="${X.counter - 2}" y="214" width="110" height="${FLOOR - 214}" fill="#92400E" stroke="${L}" stroke-width="1.2"/><rect x="${X.counter - 8}" y="208" width="122" height="9" rx="3" fill="#B45309" stroke="${L}"/>
  ${[0, 1, 2].map((i) => `<g transform="translate(${X.counter + 20 + i * 34} 208)"><g transform="translate(0 -22)">${i === 1 ? YEL(6) : RED(8)}</g></g>`).join('')}
  <g transform="translate(${X.counter + 54} 170)"><g class="e079-tag">${TAG}</g></g>
  <!-- bàn thấp quán cao lầu + ghế đẩu -->
  <rect x="${X.stall - 40}" y="230" width="80" height="8" rx="2" fill="#B45309" stroke="${L}"/><rect x="${X.stall - 36}" y="238" width="72" height="16" fill="#92400E" stroke="${L}" stroke-width="0.8"/><path d="M${X.stall - 32} 254 V${FLOOR} M${X.stall + 32} 254 V${FLOOR}" stroke="#78350F" stroke-width="4"/>
  <g transform="translate(${X.stall + 14} 230)"><g class="e079-bowl">${BOWL}</g>${'' /* hơi nóng */}<g class="e079-steam">${[-6, 0, 6].map((dx, i) => `<path class="ek-steam" style="animation-delay:${i * 0.5}s" d="M${dx} -14 q-4 -6 0 -12 q4 -6 0 -12" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g></g>
  <!-- ghế đá bờ sông -->
  <rect x="${X.bench - 44}" y="228" width="88" height="11" rx="3" fill="#D6D3D1" stroke="${L}"/><rect x="${X.bench - 40}" y="239" width="80" height="16" fill="#A8A29E" stroke="${L}"/><rect x="${X.bench - 38}" y="255" width="14" height="${FLOOR - 255}" fill="#A8A29E" stroke="${L}"/><rect x="${X.bench + 24}" y="255" width="14" height="${FLOOR - 255}" fill="#A8A29E" stroke="${L}"/>
  <!-- nhãn -->
  ${lab('lunar', 250, 124, '14th lunar night', '#4338CA', 14)}
  ${lab('off', 300, 196, 'lights off', '#475569', 14)}
  ${lab('magical', 250, 112, 'magical', '#DB2777', 18)}
  ${lab('red', 700, 62, 'big round red', '#DC2626', 13)}
  ${lab('yel', 700, 62, 'small yellow silk', '#CA8A04', 13)}
  ${lab('blue', 700, 62, 'blue paper', '#1D4ED8', 13)}
  ${lab('green', X.counter - 20, 62, 'beautiful little green', '#15803D', 13)}
  ${lab('cheap', X.counter + 54, 226, 'quite cheap', '#15803D', 13)}
  ${lab('wood', X.houses + 160, 104, 'old wooden houses', '#92400E', 14)}
  ${lab('narrow', X.houses + 160, 104, 'narrow old streets', '#92400E', 14)}
  ${lab('caolau', X.stall - 90, 196, 'cao lau', '#B91C1C', 15)}
  ${lab('tasty', X.stall - 90, 196, 'very tasty', '#B91C1C', 15)}
  ${lab('wish', 1790, 200, 'wishes', '#DB2777', 15)}
  ${lab('wonder', 1580, 108, 'wonderful', '#7C3AED', 16)}
  ${lab('tired', X.bench + 16, 112, 'quite tired', '#64748B', 14)}
  ${lab('happy', X.bench + 16, 112, 'very happy', '#DB2777', 15)}`;
}

const LBS = ['lunar', 'off', 'magical', 'red', 'yel', 'blue', 'green', 'cheap', 'wood', 'narrow', 'caolau', 'tasty', 'wish', 'wonder', 'tired', 'happy'];
const CSS = `
.e079-lb { opacity: 0; transition: opacity .35s; }
${LBS.map((k) => `.st-lb-${k} .e079-lb-${k}`).join(', ')} { opacity: 1; }
.e079-sw { transform-origin: 0 0; animation: e079Sw 2.4s ease-in-out infinite alternate; }
@keyframes e079Sw { from { transform: rotate(-4deg); } to { transform: rotate(4deg); } }
.e079-glow { animation: e079Glow 1.8s ease-in-out infinite alternate; }
@keyframes e079Glow { from { opacity: .22; } to { opacity: .42; } }
.e079-bulbOff { opacity: 0; transition: opacity .1s; }
.e079-bulb { transition: opacity .15s; }
.st-off1 .e079-bulb1, .st-off2 .e079-bulb2, .st-off3 .e079-bulb3 { opacity: 0; }
.st-off1 .e079-bulbOff1, .st-off2 .e079-bulbOff2, .st-off3 .e079-bulbOff3 { opacity: 1; }
.st-magic .e079-glow { animation-duration: .9s; }
.e079-red, .e079-yel, .e079-blue { transition: opacity .3s; }
.st-pick .e079-red, .st-pick .e079-yel, .st-pick .e079-blue { opacity: .35; }
.st-pick.st-hiR .e079-red, .st-pick.st-hiY .e079-yel, .st-pick.st-hiB .e079-blue { opacity: 1; }
.st-hiR .e079-red .e079-sw, .st-hiY .e079-yel .e079-sw, .st-hiB .e079-blue .e079-sw { animation-duration: .5s; }
.e079-greenHook { transition: opacity .2s; } .st-gGone .e079-greenHook { opacity: 0; }
.e079-tag { opacity: 0; transform: scaleY(0); transform-origin: 0 0; transition: transform .45s cubic-bezier(.3,1.5,.6,1), opacity .2s; }
.st-tag .e079-tag { opacity: 1; transform: none; }
.e079-bowl, .e079-steam { opacity: 0; transition: opacity .3s; } .st-bowl .e079-bowl, .st-bowl .e079-steam { opacity: 1; }
.e079-flame { transform-box: fill-box; transform-origin: 50% 100%; animation: e079Flame .3s ease-in-out infinite alternate; }
@keyframes e079Flame { to { transform: scale(.8, 1.15); } }
.es-thing.is-walk .e079-bob { animation: e079Bob .8s ease-in-out infinite alternate; }
.e079-bob { transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes e079Bob { from { transform: rotate(-4deg) translateY(0); } to { transform: rotate(4deg) translateY(-2px); } }
@media (prefers-reduced-motion: reduce) {
  .e079-sw { animation-duration: 6s; }
  .e079-glow, .st-magic .e079-glow { animation-duration: 3s; }
  .st-hiR .e079-red .e079-sw, .st-hiY .e079-yel .e079-sw, .st-hiB .e079-blue .e079-sw { animation-duration: 1.4s; }
  .e079-flame { animation-duration: 1s; }
  .es-thing.is-walk .e079-bob { animation-duration: 1.8s; }
}
`;

const lb = (st, k, on = true) => st.set(`st-lb-${k}`, on);
const FAMILY = ['minh', 'lan', 'mum', 'dad', 'gma'];

const BEATS = [
  { key: ['fourteenth night of every lunar month', 'turns off its electric lights'], icon: '🌕', label: 'lights off', async play(st) {
    st.look(260);
    lb(st, 'lunar'); st.sfx('crickets', { vol: 0.5 });
    await st.wait(1500);
    lb(st, 'lunar', false); lb(st, 'off');
    for (const n of [1, 2, 3]) { await st.wait(550); st.set(`st-off${n}`); st.sfx('click', { vol: 0.8 }); }
    await st.wait(900);
  } },
  { key: ["Minh's family were there", 'really magical'], icon: '✨', label: 'magical', async play(st) {
    lb(st, 'off', false);
    st.look(260);
    await Promise.all([
      st.walk('dad', 120, { speed: 110, follow: false }),
      st.walk('mum', 190, { speed: 110, follow: false }),
      st.walk('gma', 60, { speed: 90, follow: false }),
      st.walk('lan', 300, { speed: 140, follow: false }),
      st.walk('minh', 370, { speed: 140, follow: false }),
    ]);
    for (const id of FAMILY) st.mood(id, 'wow');
    st.pose('minh', 'pointUp'); st.pose('lan', 'cheer');
    st.set('st-magic'); lb(st, 'magical'); st.sfx('sparkle', { vol: 0.6 });
    st.fx('sparkle', 250, 110, { quiet: true });
    await st.wait(1500);
    for (const id of FAMILY) st.mood(id, 'joy');
  } },
  { key: ['big round red lanterns', 'small yellow silk lanterns', 'blue paper ones'], icon: '🏮', label: 'lanterns', async play(st) {
    lb(st, 'magical', false); st.set('st-magic', false);
    st.pose('minh', 'stand'); st.pose('lan', 'stand');
    st.look(X.shop);
    await Promise.all([
      st.walk('minh', 600, { speed: 140, follow: false }),
      st.walk('lan', 680, { speed: 140, follow: false }),
      st.walk('mum', 500, { speed: 120, follow: false }),
      st.walk('dad', 440, { speed: 120, follow: false }),
      st.walk('gma', 380, { speed: 110, follow: false }),
    ]);
    st.set('st-pick');
    for (const [k, c, rate] of [['R', 'red', 0.9], ['Y', 'yel', 1.1], ['B', 'blue', 1.25]]) {
      st.set(`st-hi${k}`); lb(st, c); st.sfx('pop', { vol: 0.6, rate });
      st.pose('minh', 'pointUp'); st.mood('minh', 'wow');
      await st.wait(1200);
      st.set(`st-hi${k}`, false); lb(st, c, false);
    }
    st.set('st-pick', false); st.pose('minh', 'stand'); st.mood('minh', 'joy');
  } },
  { key: ['beautiful little green lantern'], icon: '💚', label: 'green lantern', async play(st) {
    st.look(X.counter - 40);
    await st.walk('lan', X.counter - 34, { speed: 120, follow: false });
    st.face('lan', 1); st.pose('lan', 'point'); st.mood('lan', 'joy'); lb(st, 'green'); st.sfx('pop', { vol: 0.5 });
    await st.wait(700);
    st.pose('seller', 'e079_give'); st.set('st-gGone'); st.sfx('whoosh', { vol: 0.5 });
    await st.fly(`<g transform="translate(0 -10)">${GREEN()}</g>`, [X.counter + 54, 170], [X.counter - 30, 236], { size: 30, dur: 650 });
    st.hold('lan', 'e079_green'); st.pose('lan', 'e079_hold'); st.pose('seller', 'stand'); st.sfx('ding', { vol: 0.5 });
    st.mood('lan', 'joy'); st.act('lan', 'hop');
    await st.wait(1100);
    st.act('lan', null);
  } },
  { key: ['quite cheap'], icon: '🏷️', label: 'quite cheap', async play(st) {
    lb(st, 'green', false);
    st.look(X.counter - 40);
    st.set('st-tag'); st.sfx('pop', { vol: 0.6 });
    await st.wait(700);
    st.pose('mum', 'stand');
    await st.walk('mum', X.counter - 84, { speed: 130, follow: false });
    st.face('mum', 1); st.pose('mum', 'give'); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(MONEY, [X.counter - 58, 196], [X.counter + 56, 196], { size: 28, dur: 550 });
    st.sfx('cash', { vol: 0.6 }); lb(st, 'cheap'); st.pose('seller', 'wave'); st.act('seller', 'wave'); st.mood('seller', 'joy');
    st.pose('mum', 'stand'); st.mood('mum', 'joy');
    await st.wait(1300);
    st.act('seller', null); st.pose('seller', 'stand');
  } },
  { key: ['narrow old streets', 'old wooden houses'], icon: '🏘️', label: 'wooden houses', async play(st) {
    lb(st, 'cheap', false); st.set('st-tag', false);
    lb(st, 'narrow');
    await Promise.all([
      st.walk('minh', 1180, { speed: 135, lead: -20 }),
      st.walk('lan', 1130, { speed: 135, follow: false }),
      st.walk('mum', 1070, { speed: 125, follow: false }),
      st.walk('dad', 1010, { speed: 125, follow: false }),
      st.walk('gma', 950, { speed: 120, follow: false }),
    ]);
    lb(st, 'narrow', false); lb(st, 'wood'); st.sfx('knock', { vol: 0.5 });
    st.face('minh', -1); st.pose('minh', 'point'); st.mood('minh', 'wow');
    st.pose('gma', 'point'); st.mood('gma', 'joy');
    await st.wait(1200);
    st.pose('minh', 'stand'); st.pose('gma', 'stand');
  } },
  { key: ['very tasty Vietnamese noodle dish', 'cao lau'], icon: '🍜', label: 'cao lau', async play(st) {
    lb(st, 'wood', false);
    st.pose('minh', 'stand');
    await st.walk('minh', X.stall, { speed: 135, lead: 30 });
    st.face('minh', 1); st.pose('minh', 'sitDesk');
    st.set('st-bowl'); st.sfx('bowl-down', { vol: 0.6 }); lb(st, 'caolau');
    await st.wait(600);
    st.hold('minh', 'e079_chop'); st.pose('minh', 'e079_eat'); st.act('minh', 'eat');
    await st.loop('slurp', () => st.wait(1500), { vol: 0.8 });
    st.act('minh', null); lb(st, 'caolau', false); lb(st, 'tasty'); st.mood('minh', 'joy');
    st.fx('hearts', X.stall, 190);
    await st.wait(1000);
  } },
  { key: ['small paper lanterns on the river', 'made wishes'], icon: '🕯️', label: 'made wishes', async play(st) {
    lb(st, 'tasty', false); st.set('st-bowl', false);
    st.hold('minh', null); st.pose('minh', 'stand'); st.hold('lan', null);
    st.look(1590, { dur: 1400 });
    await Promise.all([
      st.walk('minh', X.bank - 22, { speed: 140, follow: false }),
      st.walk('lan', X.bank - 68, { speed: 140, follow: false }),
      st.walk('gma', 1574, { speed: 120, follow: false }),
      st.walk('mum', 1418, { speed: 110, follow: false }),
      st.walk('dad', 1394, { speed: 110, follow: false }),
    ]);
    st.face('minh', 1); st.face('lan', 1);
    st.hold('minh', 'e079_float'); st.hold('lan', 'e079_float2');
    st.pose('minh', 'e079_crouch'); st.pose('lan', 'e079_crouch');
    await st.wait(500);
    st.hold('minh', null); st.hold('lan', null);
    st.show('f1', true); st.show('f2', true); st.sfx('splash', { vol: 0.5 });
    st.sfx('river', { vol: 0.5 });
    st.walk('f1', 1830, { speed: 40, follow: false });
    st.walk('f2', 1770, { speed: 34, follow: false });
    await st.wait(600);
    st.pose('minh', 'e079_wish'); st.pose('lan', 'e079_wish'); st.mood('minh', 'shut'); st.mood('lan', 'shut');
    lb(st, 'wish'); st.sfx('sparkle', { vol: 0.5 });
    st.fx('sparkle', 1790, 250, { quiet: true });
    await st.wait(1400);
  } },
  { key: ['really wonderful place'], icon: '👵', label: 'wonderful', async play(st) {
    lb(st, 'wish', false);
    st.look(1590);
    st.mood('minh', 'joy'); st.mood('lan', 'joy'); st.pose('minh', 'stand'); st.pose('lan', 'stand');
    st.face('gma', 1); st.pose('gma', 'open'); st.mood('gma', 'joy'); lb(st, 'wonder');
    st.sfx('river', { vol: 0.4 });
    await st.say('gma', 'Wonderful!', 1500);
    st.pose('gma', 'clap'); st.act('gma', 'clap'); st.sfx('clap', { vol: 0.6 });
    await st.wait(1000);
    st.act('gma', null); st.pose('gma', 'stand');
  } },
  { key: ['quite tired', 'very happy'], icon: '😊', label: 'tired but happy', async play(st) {
    lb(st, 'wonder', false);
    st.look(1590);
    await st.walk('dad', X.bench, { speed: 90, follow: false });
    st.face('dad', 1); st.pose('dad', 'e079_sitTired'); st.mood('dad', 'shut'); lb(st, 'tired'); st.sfx('bump', { vol: 0.4, rate: 0.8 });
    await st.wait(500);
    st.pose('dad', 'e079_tired'); st.sfx('wipe', { vol: 0.5 });
    await st.wait(900);
    lb(st, 'tired', false); lb(st, 'happy');
    st.pose('dad', 'sitWave'); st.act('dad', 'wave'); st.mood('dad', 'joy');
    st.fx('hearts', X.bench, 170);
    await st.wait(1300);
    st.act('dad', null);
  } },
];

export default {
  id: 'en079', worldW: W, floor: FLOOR, viewTop: 40, camStart: 20, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 2, 3, 5, 6, 7],
  cast: [
    { id: 'seller', kind: 'adult', who: 'e079_seller', x: X.counter + 70, s: 0.92, face: -1 },
    { id: 'f1', kind: 'thing', x: X.bank + 20, y: 262, svg: `<g class="e079-bob">${FLOAT('#F472B6')}</g>`, box: [-14, -22, 28, 24] },
    { id: 'f2', kind: 'thing', x: X.bank + 14, y: 274, svg: `<g class="e079-bob">${FLOAT('#A78BFA')}</g>`, box: [-14, -22, 28, 24] },
    { id: 'gma', kind: 'adult', who: 'en_grandma', x: -150, s: 0.92 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: -90, s: 0.95 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: -40, s: 0.95 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: -120, s: 1.06 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: -60 },
  ],
  init(st) {
    st.show('f1', false); st.show('f2', false);
  },
};
