/**
 * Bài 71 "A Phone Call to Tom" (lời mời, đề nghị: Would you like…? Can I…? Could you…?): sáng thứ Bảy, hai nhà cạnh nhau trên
 * một dải cảnh, từ trái sang phải: bếp nhà Minh (Lan cuốn nem) → phòng khách nhà Minh (mẹ đưa điện thoại, lịch SAT, đồng hồ)
 * → khe trời giữa hai nhà (sóng điện thoại chạy theo người đang nói) → phòng Tom (kệ trò chơi, cặp, đĩa xoài, quả bóng, bảng ghim,
 * cửa sổ) → cửa nhà Tom (em họ Jack từ Sydney bước vào).
 * Câu nào nói về một việc thì việc đó hiện ra: bong bóng nghĩ (nhà, trái cây, công viên, địa chỉ), đồ bay vào cặp, kim đồng hồ quay.
 * Toạ độ cảnh: rộng 1420, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, label, room, windowBox, thought, BALL, APPLE, BANANA } from '../kit.js';

const FLOOR = 282;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { kit: 0, lan: 200, liv: 320, mum: 470, minh: 570, gap: 690, tomR: 732, tom: 850, cork: 790, shelf: 960, bag: 1010, fruit: 1090, ball: 1150, win: 1110, door: 1262, end: 1300 };

Object.assign(CAST, {
  e071_jack: { hair: 'curly', hairC: '#F59E0B', top: 'tee', shirt: '#EF4444', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F5F5F4' },
});

// ── Đồ vật ─────────────────────────────────────────────────────────────────
const MANGO = `<path d="M-7 -2 Q-6 -10 2 -9 Q9 -7 8 1 Q6 8 -1 7 Q-8 5 -7 -2Z" fill="#FACC15" stroke="${L}" stroke-width="0.8"/><path d="M2 -9 q1 -3 3 -3" stroke="#16A34A" stroke-width="1.4" fill="none"/><ellipse cx="-2" cy="-3" rx="2" ry="1.2" fill="#FEF08A"/>`;
const GAME = `<rect x="-16" y="-11" width="32" height="22" rx="2" fill="#7C3AED" stroke="${L}"/><rect x="-12" y="-7" width="24" height="14" rx="1" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/>
  <path d="M-12 0 H12 M0 -7 V7" stroke="#A855F7" stroke-width="1"/><circle cx="-6" cy="-3.5" r="2" fill="#EF4444"/><circle cx="6" cy="3.5" r="2" fill="#22C55E"/>`;
const ROLL = `<rect x="-9" y="-3.4" width="18" height="6.8" rx="3.4" fill="#F59E0B" stroke="${L}" stroke-width="0.8"/><path d="M-4 -3 v6 M2 -3 v6" stroke="#B45309" stroke-width="0.8"/>`;
const PHONE_T = `<rect x="-5" y="-9" width="10" height="17" rx="2" fill="#1F2937" stroke="${L}" stroke-width="0.8"/><rect x="-3.6" y="-7" width="7.2" height="12" rx="1" fill="#7DD3FC"/>`;
const PLATE = `<g transform="translate(0 -4)"><ellipse rx="15" ry="4.6" fill="#fff" stroke="${L}" stroke-width="0.9"/><ellipse rx="9" ry="2.4" fill="none" stroke="#93C5FD" stroke-width="0.8"/></g>`;
const SUITCASE = `<rect x="-20" y="-40" width="40" height="38" rx="5" fill="#0EA5E9" stroke="${L}" stroke-width="1.2"/><path d="M-8 -40 V-48 H8 V-40" stroke="${L}" stroke-width="2" fill="none"/>
  <path d="M-20 -26 H20" stroke="#0369A1" stroke-width="2"/><circle cx="-12" cy="0" r="3" fill="#334155"/><circle cx="12" cy="0" r="3" fill="#334155"/>
  <g transform="translate(10 -16) rotate(8)"><rect x="-4" y="-4" width="18" height="11" rx="2" fill="#fff" stroke="${L}" stroke-width="0.7"/></g>`;
const PLANE = `<g><path d="M-26 0 Q-26 -5 -18 -5 H18 Q28 -3 28 0 Q28 3 18 4 H-18 Q-26 4 -26 0Z" fill="#fff" stroke="${L}"/><path d="M-4 -4 L-14 -18 H-8 L6 -4Z M-4 4 L-12 16 H-6 L6 4Z M-22 -4 L-28 -14 H-22 L-16 -4Z" fill="#60A5FA" stroke="${L}" stroke-width="0.8"/>
  ${[-10, -4, 2, 8].map((x) => `<circle cx="${x}" cy="-1" r="1.4" fill="#93C5FD"/>`).join('')}</g>`;

const POSES = {
  e071_ph: { R: [150, 250], L: [10, 4], head: 6 },          // nghe điện thoại
  e071_phMe: { R: [150, 250], L: [24, -120], head: 6 },     // tay kia chỉ vào mình
  e071_phOpen: { R: [150, 250], L: [70, 40], head: 4 },     // tay kia mời
  e071_phUp: { R: [150, 250], L: [150, 172], head: 2 },     // tay kia giơ lên (vui, đồng ý)
  e071_phPoint: { R: [150, 250], L: [96, 104], head: 2 },   // tay kia chỉ (đồng hồ, kệ)
  e071_phHead: { R: [150, 250], L: [150, 262], head: 10 },  // gãi đầu (quên)
  e071_phHold: { R: [150, 250], L: [24, -86], head: 8 },    // ôm đồ trước ngực
  e071_phWave: { R: [150, 250], L: [128, 175], head: 2 },   // vẫy tay kia
  e071_give: { R: [70, 92], L: [10, 4], head: 6 },          // mẹ đưa điện thoại
  e071_plate: { R: [62, 80], L: [10, 4], head: -4 },        // mẹ cầm đĩa tráng miệng
  e071_roll: { R: [40, -40], L: [40, -40], head: 10 },      // Lan cuốn nem trên bàn
};
const PROPS = { e071_plate: PLATE };

function bg() {
  return `
  ${sky(0, 1420, 315, 'e071sky')}${cloud(710, 44, 0.6, 0)}${cloud(1360, 60, 0.6, 2)}
  <path d="M${X.gap - 10} 230 Q${X.gap + 20} 210 ${X.tomR + 10} 226 V${FLOOR} H${X.gap - 10}Z" fill="#BBF7D0"/>
  ${tree(X.gap + 21, FLOOR, 0.9, '')}
  <!-- bếp + phòng khách nhà Minh -->
  ${room(0, X.gap, FLOOR, '#FEF3C7')}
  <rect x="${X.liv - 6}" y="0" width="12" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  <rect x="60" y="${FLOOR - 84}" width="240" height="84" fill="#F1F5F9" stroke="${L}" stroke-width="1.2"/><rect x="56" y="${FLOOR - 90}" width="248" height="8" rx="2" fill="#94A3B8" stroke="${L}"/>
  ${[100, 180, 260].map((x) => `<rect x="${x - 26}" y="${FLOOR - 70}" width="52" height="56" rx="3" fill="#E2E8F0" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="70" y="40" width="200" height="40" rx="4" fill="#FDE68A" stroke="${L}"/>
  <g transform="translate(250 ${FLOOR - 90})"><ellipse rx="34" ry="6" fill="#fff" stroke="${L}"/>${[[-18, -5], [0, -5], [18, -5], [-9, -12], [9, -12]].map(([x, y], i) => `<g class="e071-roll" style="transition-delay:${i * 0.35}s" transform="translate(${x} ${y})">${ROLL}</g>`).join('')}</g>
  <g transform="translate(120 ${FLOOR - 90})"><ellipse rx="16" ry="5" fill="#fff" stroke="${L}"/><path d="M-10 -2 h20 v-4 h-20Z" fill="#FEF3C7" stroke="${L}" stroke-width="0.6"/></g>
  <!-- phòng khách -->
  <rect x="${X.liv + 20}" y="${FLOOR - 52}" width="90" height="40" rx="10" fill="#F472B6" stroke="${L}" stroke-width="1.2"/><rect x="${X.liv + 14}" y="${FLOOR - 76}" width="102" height="30" rx="10" fill="#EC4899" stroke="${L}" stroke-width="1.2"/>
  <g transform="translate(${X.liv + 110} 70)"><rect x="-26" y="0" width="52" height="56" rx="4" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-26" y="0" width="52" height="16" rx="4" fill="#EF4444" stroke="${L}"/>
    <text x="0" y="12" text-anchor="middle" ${NUN} font-size="11" fill="#fff">SAT</text><g class="e071-cal"><circle cx="0" cy="36" r="13" fill="none" stroke="#F59E0B" stroke-width="2.4"/></g><text x="0" y="41" text-anchor="middle" ${NUN} font-size="15" fill="#1F2937">9</text></g>
  <g transform="translate(${X.minh + 60} 86)"><circle r="22" fill="#fff" stroke="${L}" stroke-width="2"/>${Array.from({ length: 12 }, (_, i) => `<path d="M0 -19 V-16" stroke="${L}" stroke-width="1.4" transform="rotate(${i * 30})"/>`).join('')}
    <g class="e071-hr"><path d="M0 0 V-10" stroke="${L}" stroke-width="3" stroke-linecap="round"/></g><g class="e071-mn"><path d="M0 0 V-16" stroke="${L}" stroke-width="2" stroke-linecap="round"/></g><circle r="2" fill="${L}"/>
    <g class="e071-glow"><circle r="27" fill="none" stroke="#F59E0B" stroke-width="3"/></g></g>
  <rect x="${X.gap - 8}" y="0" width="10" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  <!-- phòng Tom -->
  ${room(X.tomR, X.end - X.tomR, FLOOR, '#DBEAFE', '#C8935E')}
  <rect x="${X.tomR - 2}" y="0" width="10" height="${FLOOR}" fill="#BFDBFE" stroke="${L}"/>
  <g transform="translate(${X.cork} 58)"><rect x="-44" y="0" width="88" height="56" rx="3" fill="#D97706" stroke="${L}" stroke-width="1.2"/><rect x="-40" y="4" width="80" height="48" fill="#FBBF24"/>
    <g class="e071-note"><rect x="-36" y="10" width="72" height="36" fill="#fff" stroke="${L}" stroke-width="0.8" transform="rotate(-3)"/><circle cx="0" cy="10" r="2.6" fill="#EF4444"/>
      <text x="0" y="25" text-anchor="middle" ${NUN} font-size="11" fill="#1D4ED8">25 Hang Bong</text><text x="0" y="39" text-anchor="middle" ${NUN} font-size="11" fill="#1D4ED8">Street, 2:00</text></g>
    <rect class="e071-notewipe" x="-37" y="14" width="74" height="30" fill="#fff"/></g>
  <!-- kệ: trò chơi -->
  <rect x="${X.shelf - 36}" y="122" width="72" height="7" rx="2" fill="#A16207" stroke="${L}"/>
  <g class="e071-gameshelf" transform="translate(${X.shelf} 111)">${GAME}</g>
  <g transform="translate(${X.shelf + 22} 102)"><rect x="-6" y="-8" width="12" height="28" fill="#22C55E" stroke="${L}" stroke-width="0.8"/></g>
  ${windowBox(X.win - 40, 50, 92, 72)}
  <defs><clipPath id="e071win"><rect x="${X.win - 40}" y="50" width="92" height="72"/></clipPath></defs>
  <g clip-path="url(#e071win)"><g class="e071-plane"><g transform="translate(${X.win + 6} 76) scale(-0.7 0.7)">${PLANE}</g></g></g>
  <!-- bàn nhỏ: đĩa xoài -->
  <rect x="${X.fruit - 40}" y="216" width="80" height="8" rx="2" fill="#B45309" stroke="${L}"/><rect x="${X.fruit - 4}" y="224" width="8" height="${FLOOR - 224}" fill="#92400E" stroke="${L}"/>
  <g transform="translate(${X.fruit} 216)"><path d="M-22 -2 H22 Q20 8 0 8 Q-20 8 -22 -2Z" fill="#fff" stroke="${L}"/>
    ${[[-10, -8], [4, -9], [-3, -16]].map(([x, y], i) => `<g class="e071-mango e071-mango${i}" transform="translate(${x} ${y})">${MANGO}</g>`).join('')}</g>
  <!-- bàn đặt điện thoại -->
  <rect x="${X.tom - 64}" y="226" width="40" height="7" rx="2" fill="#B45309" stroke="${L}"/><rect x="${X.tom - 48}" y="233" width="8" height="${FLOOR - 233}" fill="#92400E" stroke="${L}"/>
  <g class="e071-phonebase" transform="translate(${X.tom - 44} 218)">${PHONE_T}</g>
  <!-- cửa nhà Tom -->
  <rect x="${X.door - 26}" y="112" width="52" height="${FLOOR - 112}" fill="#1E3A8A" stroke="${L}"/>
  <g class="e071-door"><rect x="${X.door - 26}" y="112" width="52" height="${FLOOR - 112}" fill="#92400E" stroke="${L}" stroke-width="1.2"/><circle cx="${X.door + 16}" cy="204" r="3" fill="#FDE68A"/></g>
  <rect x="${X.end - 4}" y="0" width="10" height="${FLOOR}" fill="#BFDBFE" stroke="${L}"/>
  <path d="M${X.end + 6} 226 Q1360 214 1420 222 V${FLOOR} H${X.end + 6}Z" fill="#BBF7D0"/><rect x="${X.end + 6}" y="${FLOOR - 4}" width="120" height="40" fill="#86EFAC" stroke="${L}"/>
  <!-- nhãn -->
  ${[['sat', X.liv + 150, 150, 'Saturday', '#DC2626'], ['minh', X.minh - 2, 146, 'Minh', '#EA580C'], ['rolls', 230, 150, 'spring rolls', '#B45309'], ['dessert', X.mum, 74, 'dessert', '#CA8A04'],
    ['two', X.minh + 60, 140, "two o'clock", '#1D4ED8'], ['jack', X.door - 70, 74, 'Jack', '#DC2626'], ['sydney', X.door - 36, 150, 'Sydney', '#0369A1']]
    .map(([k, x, y, t, c]) => `<g class="e071-lb e071-lb-${k}">${label(x, y, t, c, 15)}</g>`).join('')}`;
}

function fg() {
  const bub = (k, x, y, inner, tail, w = 112, h = 80) => thought(x, y, w, h, inner, tail, `e071-think e071-th-${k}`);
  const HOUSE = (n = '') => `<path d="M-26 -2 L0 -24 L26 -2Z" fill="#EF4444" stroke="${L}"/><rect x="-20" y="-2" width="40" height="28" fill="#FDE68A" stroke="${L}"/>
    <rect x="-7" y="8" width="14" height="18" fill="#92400E" stroke="${L}"/>${n ? `<rect x="10" y="2" width="12" height="9" rx="1" fill="#fff" stroke="${L}" stroke-width="0.6"/><text x="16" y="9.6" text-anchor="middle" ${NUN} font-size="7.4" fill="#1F2937">${n}</text>` : ''}`;
  const tailM = [X.minh + 8, 150], tailT = [X.tom - 8, 150];
  return `
  <!-- sóng điện thoại giữa hai nhà -->
  <g class="e071-sig"><path d="M${X.minh + 14} 152 Q${X.minh + 40} 26 ${X.gap + 20} 30 Q${X.tom - 40} 26 ${X.tom - 14} 152" stroke="#F59E0B" stroke-width="3.4" fill="none" stroke-dasharray="2 9" stroke-linecap="round" class="e071-dots"/></g>
  <!-- túi của Tom (trước chân) -->
  <g transform="translate(${X.bag} ${FLOOR})"><g class="e071-bagin"><g class="e071-in-game" transform="translate(0 -46) rotate(-8) scale(0.8)">${GAME}</g>
      <g class="e071-in-mango" transform="translate(-8 -44)">${MANGO}</g><g class="e071-in-mango" transform="translate(6 -46)">${MANGO}</g><g class="e071-in-ball" transform="translate(12 -50)">${BALL('#fff')}</g></g>
    <path d="M-22 -40 H22 L20 0 H-20Z" fill="#22C55E" stroke="${L}" stroke-width="1.2"/><rect x="-12" y="-28" width="24" height="14" rx="3" fill="none" stroke="${L}"/><path d="M-12 -40 Q0 -54 12 -40" stroke="${L}" stroke-width="1.6" fill="none"/></g>
  <g class="e071-floorball" transform="translate(${X.ball} ${FLOOR - 9})">${BALL('#fff')}</g>
  ${bub('house', X.minh - 30, 80, `<g transform="scale(1.2)">${HOUSE()}<g class="e071-housedoor"><rect x="-7" y="8" width="14" height="18" fill="#B45309" stroke="${L}"/></g></g><g transform="translate(36 -24)"><circle r="9" fill="#FDE047" stroke="#F59E0B"/></g>`, tailM)}
  ${bub('fruit', X.minh - 30, 80, `<g transform="translate(-22 4) scale(1.4)">${MANGO}</g><g transform="translate(2 6) scale(1.3)">${BANANA}</g><g transform="translate(24 2) scale(1.2)">${APPLE}</g>`, tailM)}
  ${bub('mango', X.mum + 10, 74, `<g transform="translate(-14 2) scale(1.6)">${MANGO}</g><g transform="translate(14 2) scale(1.6)">${MANGO}</g>`, [X.mum + 4, 130], 96, 70)}
  ${bub('park', X.minh - 30, 80, `<rect x="-46" y="10" width="92" height="16" fill="#86EFAC"/><g transform="translate(-30 8)"><circle r="7" fill="#fff" stroke="${L}"/><path d="M-5 -1 h10" stroke="#F59E0B" stroke-width="2"/></g>
    <path d="M20 10 V-14 H44 V10" stroke="#fff" stroke-width="3" fill="none"/><path d="M20 10 V-14 H44 V10" stroke="${L}" stroke-width="0.8" fill="none"/>${tree(-6, 12, 0.3, '')}
    <g class="e071-pball"><g transform="translate(-12 6) scale(0.6)">${BALL('#fff')}</g></g>`, tailM)}
  ${bub('addr', X.minh - 30, 80, `<g transform="translate(-16 0) scale(1.1)">${HOUSE('25')}</g><g transform="translate(26 0)"><path d="M0 26 V-14" stroke="#475569" stroke-width="2"/><rect x="-18" y="-24" width="40" height="18" rx="2" fill="#16A34A" stroke="${L}" stroke-width="0.8"/>
    <text x="2" y="-16.6" text-anchor="middle" ${NUN} font-size="6.4" fill="#fff">Hang Bong</text><text x="2" y="-9.6" text-anchor="middle" ${NUN} font-size="6.4" fill="#fff">Street</text></g>`, tailM, 124, 84)}
  ${bub('forgot', X.tom + 26, 80, `<g class="e071-fhouse" transform="scale(1.1)">${HOUSE('?')}</g><text x="30" y="-8" text-anchor="middle" ${NUN} font-size="26" fill="#DC2626">?</text>`, tailT, 104, 76)}`;
}

const CSS = `
.e071-lb { opacity: 0; transition: opacity .35s; }
${['sat', 'minh', 'rolls', 'dessert', 'two', 'jack', 'sydney'].map((k) => `.st-lb-${k} .e071-lb-${k}`).join(', ')} { opacity: 1; }
.e071-think { opacity: 0; transition: opacity .35s; }
${['house', 'fruit', 'mango', 'park', 'addr', 'forgot'].map((k) => `.st-th-${k} .e071-th-${k}`).join(', ')} { opacity: 1; }
.e071-cal { opacity: 0; transition: opacity .3s; } .st-lb-sat .e071-cal { opacity: 1; }
.e071-sig { opacity: 0; transition: opacity .3s; }
.st-sigR .e071-sig, .st-sigL .e071-sig { opacity: 1; }
.st-sigR .e071-dots { animation: e071Dots .5s linear infinite; }
.st-sigL .e071-dots { animation: e071Dots .5s linear infinite reverse; }
@keyframes e071Dots { to { stroke-dashoffset: -22; } }
.e071-roll { opacity: 0; transform: translateY(-8px); transition: opacity .25s, transform .3s; }
.st-rolls .e071-roll { opacity: 1; transform: none; }
.e071-housedoor { transform-box: fill-box; transform-origin: left; transition: transform .6s .2s; }
.st-th-house .e071-housedoor { transform: scaleX(.15); }
.e071-gameshelf { transition: opacity .2s; } .st-gameout .e071-gameshelf { opacity: 0; }
.e071-in-game, .e071-in-mango, .e071-in-ball { opacity: 0; transition: opacity .2s; }
.st-bag-game .e071-in-game, .st-bag-mango .e071-in-mango, .st-bag-ball .e071-in-ball { opacity: 1; }
.e071-mango { transition: opacity .2s; } .st-bag-mango .e071-mango { opacity: 0; }
.e071-floorball { transition: opacity .2s; } .st-ballup .e071-floorball { opacity: 0; }
.st-th-park .e071-pball { animation: e071Goal 1.2s ease-in .3s both; }
@keyframes e071Goal { to { transform: translateX(42px); } }
.e071-note { opacity: 0; transition: opacity .3s; } .st-note .e071-note { opacity: 1; }
.e071-notewipe { transform-box: fill-box; transform-origin: right; transition: transform 1.6s linear; }
.st-note .e071-notewipe { transform: scaleX(0); }
.st-th-forgot .e071-fhouse { animation: e071Fade 1s ease-in .5s both; }
@keyframes e071Fade { to { opacity: 0; transform: scale(.4); } }
.e071-hr { transform: rotate(300deg); transition: transform 1.8s ease-in-out; }
.e071-mn { transform: rotate(60deg); transition: transform 1.8s ease-in-out; }
.st-two .e071-hr { transform: rotate(420deg); }
.st-two .e071-mn { transform: rotate(720deg); }
.e071-glow { opacity: 0; transition: opacity .3s; } .st-glow .e071-glow { opacity: 1; animation: e071Pulse .5s ease-in-out infinite alternate; }
@keyframes e071Pulse { from { opacity: .3; } to { opacity: 1; } }
.e071-door { transform-box: fill-box; transform-origin: right; transition: transform .5s; } .st-dooropen .e071-door { transform: scaleX(.15); }
.e071-plane { opacity: 0; } .st-plane .e071-plane { animation: e071Plane 2.6s linear both; }
@keyframes e071Plane { 0% { opacity: 1; transform: translateX(60px); } 100% { opacity: 1; transform: translateX(-80px); } }
.e071-phonebase { transition: opacity .2s; } .st-tomphone .e071-phonebase { opacity: 0; }
.st-ring .e071-phonebase { animation: e071Ring .08s linear infinite alternate; }
@keyframes e071Ring { from { transform: translate(${X.tom - 45}px, 218px) rotate(-8deg); } to { transform: translate(${X.tom - 43}px, 218px) rotate(8deg); } }
.act-e071kick .pp-legwR { animation: e071Kick .55s ease-out 1 both; }
@keyframes e071Kick { 45% { transform: rotate(-48deg); } to { transform: rotate(0); } }
.es-ac.act-e071-waveL .pp-fowL { animation: ppWave .3s ease-in-out infinite alternate; }
@media (prefers-reduced-motion: reduce) {
  .st-sigR .e071-dots, .st-sigL .e071-dots { animation-duration: 1.4s; }
  .st-ring .e071-phonebase { animation-duration: .3s; }
  .st-glow .e071-glow { animation-duration: 1.4s; }
  .act-e071kick .pp-legwR { animation: e071Kick .55s ease-out 1 both; }
@keyframes e071Kick { 45% { transform: rotate(-48deg); } to { transform: rotate(0); } }
.es-ac.act-e071-waveL .pp-fowL { animation-duration: .9s; }
  .st-plane .e071-plane { animation-duration: 4s; }
}
`;

const MID = X.gap + 10;
const THINKS = ['house', 'fruit', 'mango', 'park', 'addr', 'forgot'];
/** Ai đang nói: sóng chạy từ máy người đó sang máy bên kia, miệng nhép. */
function talkBy(st, who) {
  st.set('st-sigR', who === 'minh'); st.set('st-sigL', who === 'tom');
  st.talk('minh', who === 'minh'); st.talk('tom', who === 'tom');
}
const clear = (st) => { THINKS.forEach((k) => st.set(`st-th-${k}`, false)); ['minh', 'rolls', 'dessert', 'sat'].forEach((k) => st.set(`st-lb-${k}`, false)); };
const ph = (st, id, pose = 'e071_ph') => { st.pose(id, pose); };

const BEATS = [
  { key: ["called Tom on Mum's phone"], icon: '📞', label: "Mum's phone", async play(st) {
    st.look(X.mum + 20);
    st.set('st-lb-sat'); st.sfx('page-turn', { vol: 0.5 });
    st.pose('mum', 'e071_give');
    await st.wait(500);
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(`<g transform="scale(1.3)">${PHONE_T}</g>`, [X.mum + 40, 190], [X.minh + 10, 170], { size: 26, dur: 500 });
    st.pose('mum', 'stand'); st.hold('minh', 'phone'); ph(st, 'minh', 'e071_phPoint');
    for (let i = 0; i < 3; i++) { st.sfx('beep', { vol: 0.4 }); await st.wait(220); }
    ph(st, 'minh');
    st.look(MID - 40);
    st.set('st-sigR'); st.set('st-ring');
    await st.loop('phone-ring', () => st.wait(1400), { vol: 0.7 });
    st.set('st-ring', false); st.set('st-tomphone'); st.hold('tom', 'phone'); ph(st, 'tom'); st.sfx('click', { vol: 0.6 });
    st.set('st-sigR', false);
    await st.wait(300);
  } },
  { key: ['Hello, Tom'], icon: '👋', label: 'Hello', async play(st) {
    st.set('st-lb-sat', false);
    st.look(MID - 40);
    talkBy(st, 'minh'); ph(st, 'minh', 'e071_phWave'); st.act('minh', 'e071-waveL'); st.mood('minh', 'joy');
    await st.wait(1000);
    talkBy(st, null); st.mood('tom', 'joy'); st.sfx('giggle', { vol: 0.6 });
    await st.wait(600);
  } },
  { key: ["It's Minh"], icon: '🙋', label: "It's Minh", async play(st) {
    talkBy(st, 'minh'); ph(st, 'minh', 'e071_phMe');
    st.set('st-lb-minh'); st.sfx('ding', { vol: 0.5 });
    await st.wait(1300);
    talkBy(st, null);
  } },
  { key: ['come to my house this afternoon'], icon: '🏠', label: 'come to my house', async play(st) {
    st.set('st-lb-minh', false);
    talkBy(st, 'minh'); ph(st, 'minh', 'e071_phOpen');
    st.set('st-th-house');
    await st.wait(300);
    st.sfx('door-open', { vol: 0.6 });
    await st.wait(1900);
    talkBy(st, null);
  } },
  { key: ['Lan is going to make spring rolls'], icon: '🥢', label: 'spring rolls', async play(st) {
    st.set('st-th-house', false);
    talkBy(st, 'minh'); ph(st, 'minh', 'e071_phPoint'); st.face('minh', -1);
    st.look(280, { dur: 1000 });
    await st.wait(600);
    st.pose('lan', 'e071_roll'); st.act('lan', 'wash'); st.mood('lan', 'joy');
    st.set('st-rolls'); st.set('st-lb-rolls');
    await st.loop('roll', () => st.wait(1700), { vol: 0.5 });
    st.sfx('sizzle', { vol: 0.4 });
    await st.wait(500);
    talkBy(st, null);
  } },
  { key: ["I'd love to"], icon: '😍', label: "I'd love to", async play(st) {
    st.set('st-lb-rolls', false); st.face('minh', 1); ph(st, 'minh');
    st.look(X.tom);
    talkBy(st, 'tom'); ph(st, 'tom', 'e071_phUp'); st.act('tom', 'jump'); st.mood('tom', 'joy');
    st.fx('hearts', X.tom, 130);
    await st.wait(1500);
    talkBy(st, null);
  } },
  { key: ['bring my new board game'], icon: '🎲', label: 'board game', async play(st) {
    st.look(X.tom + 70);
    talkBy(st, 'tom'); st.mood('tom', 'happy');
    await st.walk('tom', X.shelf - 30, { speed: 120, follow: false });
    st.face('tom', 1); ph(st, 'tom', 'e071_phPoint');
    await st.wait(300);
    st.set('st-gameout'); st.sfx('box-shake', { vol: 0.8 });
    await st.fly(`<g transform="scale(1.4)">${GAME}</g>`, [X.shelf, 111], [X.bag, 234], { size: 50, dur: 650 });
    st.set('st-bag-game'); st.sfx('bump', { vol: 0.5 });
    st.face('tom', -1); ph(st, 'tom');
    await st.wait(500);
    talkBy(st, null);
  } },
  { key: ['Of course'], icon: '👍', label: 'Of course', async play(st) {
    st.look(MID - 40);
    talkBy(st, 'minh'); ph(st, 'minh', 'e071_phUp'); st.act('minh', 'nod'); st.mood('minh', 'joy');
    st.sfx('ding', { vol: 0.5 });
    await st.wait(1200);
    talkBy(st, null);
  } },
  { key: ['bring some fruit too'], icon: '🍎', label: 'some fruit', async play(st) {
    ph(st, 'minh', 'e071_phOpen'); st.mood('minh', 'happy');
    talkBy(st, 'minh');
    st.set('st-th-fruit'); st.sfx('pop', { vol: 0.5 });
    await st.wait(1800);
    talkBy(st, null);
  } },
  { key: ['some mangoes for dessert'], icon: '🥭', label: 'mangoes', async play(st) {
    st.set('st-th-fruit', false);
    st.look(X.mum + 60);
    talkBy(st, 'minh'); ph(st, 'minh', 'e071_phPoint'); st.face('minh', -1);
    st.hold('mum', 'e071_plate'); st.pose('mum', 'e071_plate'); st.mood('mum', 'joy'); st.sfx('bowl-down', { vol: 0.6 });
    await st.wait(400);
    st.set('st-th-mango'); st.set('st-lb-dessert');
    await st.wait(1800);
    talkBy(st, null);
  } },
  { key: ['Sure'], icon: '🥭', label: 'Sure', async play(st) {
    clear(st); st.face('minh', 1); ph(st, 'minh'); st.hold('mum', null); st.pose('mum', 'stand'); st.mood('mum', 'happy');
    st.look(X.fruit - 80);
    talkBy(st, 'tom');
    await st.walk('tom', X.fruit - 40, { speed: 130, follow: false });
    st.face('tom', 1); ph(st, 'tom', 'e071_phPoint');
    st.set('st-bag-mango'); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(`<g transform="scale(1.3)">${MANGO}</g>`, [X.fruit, 200], [X.bag, 236], { size: 24, dur: 500 });
    st.sfx('pop', { vol: 0.5 });
    await st.wait(400);
    talkBy(st, null);
  } },
  { key: ['bring my football as well'], icon: '⚽', label: 'football', async play(st) {
    talkBy(st, 'tom');
    await st.walk('tom', X.ball - 30, { speed: 120, follow: false });
    st.act('tom', 'e071kick'); st.sfx('kick', { vol: 0.7 });
    st.set('st-ballup');
    await st.fly(`<g transform="scale(1.4)">${BALL('#fff')}</g>`, [X.ball, FLOOR - 10], [X.ball - 30, 200], { size: 26, dur: 450 });
    st.chest('tom', `<g transform="translate(0 -18) scale(1.2)">${BALL('#fff')}</g>`); ph(st, 'tom', 'e071_phHold'); st.face('tom', -1);
    await st.wait(1000);
    talkBy(st, null);
  } },
  { key: ['Yes, please'], icon: '🙌', label: 'Yes, please', async play(st) {
    st.look(MID - 40);
    talkBy(st, 'minh'); ph(st, 'minh', 'e071_phUp'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    st.sfx('cheer', { vol: 0.4 });
    await st.wait(1300);
    talkBy(st, null);
  } },
  { key: ['play in the park after we eat'], icon: '🌳', label: 'play in the park', async play(st) {
    ph(st, 'minh', 'e071_phOpen'); st.mood('minh', 'happy');
    talkBy(st, 'minh');
    st.set('st-th-park'); st.sfx('whistle', { vol: 0.5 });
    await st.wait(1300);
    st.sfx('kick', { vol: 0.6 });
    await st.wait(1300);
    talkBy(st, null);
  } },
  { key: ['tell me your address again'], icon: '📝', label: 'your address', async play(st) {
    st.set('st-th-park', false); ph(st, 'minh');
    st.look(X.tom - 20);
    talkBy(st, 'tom');
    st.sfx('bump', { vol: 0.5 }); st.chest('tom', null); st.set('st-bag-ball');
    await st.walk('tom', X.cork + 50, { speed: 130, follow: false });
    st.face('tom', -1); ph(st, 'tom', 'e071_phPoint'); st.sfx('page-turn', { vol: 0.7 });
    await st.wait(900);
    talkBy(st, null);
  } },
  { key: ['I have forgotten it'], icon: '🤔', label: 'forgotten', async play(st) {
    talkBy(st, 'tom'); ph(st, 'tom', 'e071_phHead'); st.mood('tom', 'sad');
    st.set('st-th-forgot');
    await st.wait(1300);
    st.fx('poof', X.tom + 26, 80);
    await st.wait(600);
    talkBy(st, null);
  } },
  { key: ['25 Hang Bong Street'], icon: '📍', label: '25 Hang Bong Street', async play(st) {
    st.set('st-th-forgot', false); st.mood('tom', 'happy'); ph(st, 'tom');
    st.look(MID - 40);
    talkBy(st, 'minh'); ph(st, 'minh', 'e071_phMe');
    st.set('st-th-addr');
    await st.wait(600);
    st.set('st-note'); ph(st, 'tom', 'e071_phPoint');
    await st.loop('pencil', () => st.wait(1600), { vol: 0.8 });
    talkBy(st, null);
  } },
  { key: ["at two o'clock"], icon: '🕑', label: "two o'clock", async play(st) {
    st.set('st-th-addr', false); ph(st, 'tom');
    talkBy(st, 'minh'); ph(st, 'minh', 'e071_phPoint'); st.face('minh', 1);
    st.look(X.minh + 80);
    st.set('st-two');
    await st.loop('tick', () => st.wait(1800), { vol: 0.7 });
    st.set('st-lb-two'); st.sfx('ding', { vol: 0.5 });
    await st.wait(600);
    talkBy(st, null);
  } },
  { key: ['No problem'], icon: '👌', label: 'No problem', async play(st) {
    st.set('st-lb-two', false); ph(st, 'minh');
    st.look(MID - 40);
    talkBy(st, 'tom'); ph(st, 'tom', 'e071_phUp'); st.act('tom', 'nod'); st.mood('tom', 'joy');
    st.sfx('giggle', { vol: 0.5 });
    await st.wait(1300);
    talkBy(st, null);
  } },
  { key: ['my cousin Jack'], icon: '👦', label: 'cousin Jack', async play(st) {
    ph(st, 'tom'); st.mood('tom', 'happy');
    st.look(X.door - 120, { dur: 1000 });
    st.sfx('knock', { vol: 0.7 });
    await st.wait(500);
    talkBy(st, 'tom');
    st.set('st-dooropen'); st.sfx('door-open', { vol: 0.6 });
    st.show('jack', true);
    await st.walk('jack', X.door - 70, { speed: 120, follow: false });
    st.face('jack', -1); st.pose('jack', 'wave'); st.act('jack', 'wave'); st.mood('jack', 'joy');
    st.set('st-lb-jack');
    await st.wait(1000);
    talkBy(st, null);
  } },
  { key: ['visiting from Sydney'], icon: '✈️', label: 'from Sydney', async play(st) {
    st.pose('jack', 'stand'); st.set('st-lb-jack', false);
    talkBy(st, 'tom');
    st.show('case', true); st.sfx('bowl-down', { vol: 0.5, rate: 0.7 });
    await st.wait(300);
    st.set('st-plane'); st.sfx('plane', { vol: 0.7 });
    st.set('st-lb-sydney');
    await st.wait(2200);
    talkBy(st, null);
  } },
  { key: ['Of course!'], icon: '🎉', label: 'Of course!', async play(st) {
    st.set('st-plane', false); st.set('st-lb-sydney', false);
    st.look(MID - 40);
    talkBy(st, 'minh'); ph(st, 'minh', 'e071_phUp'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    st.sfx('cheer', { vol: 0.4 });
    await st.wait(1200);
    talkBy(st, null);
  } },
  { key: ['See you at two'], icon: '👋', label: 'See you at two', async play(st) {
    st.look(MID - 40);
    talkBy(st, 'minh');
    ph(st, 'minh', 'e071_phWave'); ph(st, 'tom', 'e071_phWave'); st.act('minh', 'e071-waveL'); st.act('tom', 'e071-waveL');
    st.mood('tom', 'joy'); st.set('st-glow'); st.sfx('ding', { vol: 0.4 });
    await st.wait(1500);
    talkBy(st, null); st.sfx('click', { vol: 0.7 });
    st.act('minh', null); st.act('tom', null);
    st.hold('minh', null); st.hold('tom', null); st.pose('minh', 'cheer'); st.pose('tom', 'cheer');
    await st.wait(600);
  } },
];

export default {
  id: 'en071', worldW: 1420, floor: FLOOR, viewTop: 40, camStart: 230, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS, order: [0, 3, 4, 6, 9, 13, 16, 17, 19],
  cast: [
    { id: 'case', kind: 'thing', x: X.door - 30, svg: SUITCASE, box: [-24, -50, 48, 54] },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.lan, s: 1.08 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: X.mum, s: 0.95 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.minh },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: X.tom, face: -1 },
    { id: 'jack', kind: 'kid', who: 'e071_jack', x: X.door + 60, face: -1 },
  ],
  init(st) {
    st.show('jack', false); st.show('case', false);
  },
};
