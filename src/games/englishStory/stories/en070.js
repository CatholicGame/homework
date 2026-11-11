/**
 * Bài 70 "Healthy Habits" (danh động từ làm chủ ngữ, a lot of / a little / a few): đi từ trái sang phải:
 * lớp học (bảng "Healthy Habits", cô Hoa, bàn cô bày rau quả và chút đường, ba tranh mẹo trên tường: ngủ 9 tiếng, chơi ngoài trời,
 * xem TV nhiều) → cửa lớp → nhà Minh (bàn ăn: bố bỏ bánh ngọt, ăn chuối; bếp: Lan rán với chút dầu) → cửa nhà → phố buổi tối
 * (cả nhà đi dạo sau bữa tối).
 * Toạ độ cảnh: rộng 2500, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, room, board, desk, table, windowBox, night, thought, APPLE, BANANA, steam } from '../kit.js';

const FLOOR = 282;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { board: 60, hoa: 380, ttab: 480, p1: 560, p2: 680, p3: 800, minh: 650, tom: 770, mai: 880, door: 975, home: 990, dtab: 1250, stove: 1490, fdoor: 1700, out: 1720 };
const PY = 54; // mép trên tranh mẹo

Object.assign(CAST, {
  e070_mai: { hair: 'bob', top: 'uniform', shirt: '#FFFFFF', bottom: 'skirt', bottomC: '#1E3A6E', shoe: '#F472B6' },
});

// ── Đồ ăn, đồ cầm ───────────────────────────────────────────────────────────
const CARROT = `<path d="M-3 -10 L3 -10 L0 10Z" fill="#F97316" stroke="${L}" stroke-width="0.8"/><path d="M-1 -10 l-3 -6 M1 -10 l3 -6 M0 -10 v-7" stroke="#16A34A" stroke-width="1.6"/>`;
const BROC = `<rect x="-2.4" y="-2" width="4.8" height="10" fill="#86EFAC" stroke="${L}" stroke-width="0.7"/><circle cx="-5" cy="-5" r="5" fill="#16A34A" stroke="${L}" stroke-width="0.7"/><circle cx="5" cy="-5" r="5" fill="#16A34A" stroke="${L}" stroke-width="0.7"/><circle cx="0" cy="-9" r="5.4" fill="#22C55E" stroke="${L}" stroke-width="0.7"/>`;
const TOMATO = `<circle r="7" fill="#EF4444" stroke="${L}" stroke-width="0.8"/><path d="M-3 -6 l3 2 l3 -2" stroke="#16A34A" stroke-width="1.6" fill="none"/>`;
const ORANGE = `<circle r="7.4" fill="#FB923C" stroke="${L}" stroke-width="0.8"/><circle cx="2" cy="-2" r="1" fill="#FDBA74"/>`;
/** Đống rau quả trên bàn cô (gốc giữa mặt bàn). */
const PILE = [[-30, -8, CARROT, -20], [-16, -10, BROC, 0], [0, -8, TOMATO, 0], [14, -9, APPLE, 0], [28, -8, ORANGE, 0], [-22, -22, ORANGE, 0], [-6, -24, BANANA, -10], [10, -22, CARROT, 30], [22, -22, TOMATO, 0], [2, -36, APPLE, 0]]
  .map(([x, y, s, r], i) => `<g class="e070-veg" style="transition-delay:${i * 0.09}s"><g transform="translate(${x} ${y}) rotate(${r})">${s}</g></g>`).join('');
const SUGAR = `<path d="M-9 -8 H9 Q8 2 0 2 Q-8 2 -9 -8Z" fill="#fff" stroke="#3B82F6" stroke-width="1"/><path d="M-4 -9 Q0 -12 4 -9Z" fill="#fff" stroke="${L}" stroke-width="0.5"/><path d="M6 -8 L16 -16" stroke="#94A3B8" stroke-width="1.6"/>`;
const CHICKEN = `<g transform="rotate(-30)"><path d="M-14 -10 Q-22 0 -14 10 Q0 16 6 4 Q8 -10 -4 -14 Q-10 -15 -14 -10Z" fill="#D97706" stroke="${L}"/><path d="M-10 -6 q4 -2 6 2 M-12 4 q4 2 8 0" stroke="#B45309" stroke-width="1.2" fill="none"/>
  <rect x="5" y="-3" width="12" height="5" rx="2" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/><circle cx="18" cy="-3" r="3" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/><circle cx="18" cy="2" r="3" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/></g>`;
const HEART = `<path d="M0 6 C-12 -2 -8 -12 0 -6 C8 -12 12 -2 0 6Z" fill="#F43F5E" stroke="${L}" stroke-width="0.8"/>`;
/** Chai nước (gốc = bàn tay). */
const BOTTLE = `<g transform="rotate(180) translate(0 -6)"><rect x="-5" y="0" width="10" height="24" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="0.9"/><rect x="-3" y="-4" width="6" height="5" fill="#2563EB" stroke="${L}" stroke-width="0.7"/><rect x="-5" y="9" width="10" height="7" fill="#fff" opacity="0.8"/></g>`;
const CAN = `<rect x="-7" y="-20" width="14" height="20" rx="2" fill="#DC2626" stroke="${L}"/><path d="M-7 -14 q7 4 14 0" stroke="#fff" stroke-width="2" fill="none"/><rect x="-6" y="-22" width="12" height="3" rx="1" fill="#CBD5E1" stroke="${L}" stroke-width="0.6"/>`;
const CROSS = `<path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="#EF4444" stroke-width="5" stroke-linecap="round"/>`;
const CHALK = `<g transform="rotate(180)"><rect x="-1.6" y="-2" width="3.2" height="9" rx="1" fill="#fff" stroke="${L}" stroke-width="0.6"/></g>`;
const PLATE = `<g transform="translate(0 -4)"><ellipse cx="0" cy="0" rx="16" ry="5" fill="#fff" stroke="${L}" stroke-width="0.9"/><g transform="translate(-6 -5) scale(0.6)">${BROC}</g><g transform="translate(6 -5) scale(0.6)">${TOMATO}</g><g transform="translate(0 -7) scale(0.6)">${CARROT.replace('-10 L3 -10', '-10 L3 -10')}</g></g>`;
const BANANA_H = `<g transform="translate(0 -4) rotate(150) scale(0.8)">${BANANA}</g>`;
const OIL = `<g transform="rotate(200) translate(0 -2)"><rect x="-5" y="0" width="10" height="20" rx="2" fill="#FDE047" stroke="${L}" stroke-width="0.8" opacity="0.95"/><rect x="-2.4" y="20" width="4.8" height="5" fill="#16A34A" stroke="${L}" stroke-width="0.6"/></g>`;
const CAKE = `<path d="M-14 0 V-12 L14 -18 V0Z" fill="#FBCFE8" stroke="${L}"/><path d="M-14 -12 L14 -18 L12 -22 L-14 -15Z" fill="#fff" stroke="${L}" stroke-width="0.8"/><circle cx="2" cy="-22" r="3" fill="#DC2626" stroke="${L}" stroke-width="0.6"/>`;

const POSES = {
  e070_write: { R: [120, 140], L: [10, 4], head: -6 },     // viết phấn lên bảng (quay lưng nửa người)
  e070_show: { R: [130, 160], L: [10, 4], head: -4 },      // giơ đĩa rau lên
  e070_strong: { R: [90, 180], L: [90, 180] },            // gồng tay khoẻ
  e070_rub: { R: [150, 252], L: [150, 252], dy: 20, head: 6 },     // dụi mắt
  e070_drink: { R: [140, 220], L: [10, 4], head: -10 },    // uống nước từ chai
  e070_pour: { R: [70, 120], L: [30, 60] },                // rót dầu vào chảo
  e070_tell: { R: [70, 40], L: [70, 40] },                 // dang tay kể
  e070_worry: { R: [30, -150], L: [30, -150], dy: 20, head: 8 },   // ngồi ôm má lo lắng
  e070_sitThink: { R: [30, -150], L: [22, -40], dy: 20, head: 6 },
};
const PROPS = { e070_chalk: CHALK, e070_plate: PLATE, e070_bottle: BOTTLE, e070_banana: BANANA_H, e070_oil: OIL };

/** Tranh mẹo trên tường (x = mép trái). */
const poster = (k, x, inner) => `<g class="e070-tip e070-tip${k}" style="transform-origin:${x + 50}px ${PY + 42}px">
  <rect x="${x - 4}" y="${PY - 4}" width="108" height="92" rx="5" fill="#fff" stroke="${L}" stroke-width="1.3"/><rect x="${x}" y="${PY}" width="100" height="84" rx="3" fill="${['#E0E7FF', '#DCFCE7', '#FEF3C7'][k - 1]}"/>
  <g class="e070-hot e070-hot${k}"><rect x="${x - 6}" y="${PY - 6}" width="112" height="96" rx="7" fill="none" stroke="#F59E0B" stroke-width="3"/></g>${inner}</g>`;

function bg() {
  const minhSleep = headOnly('en_minh', { s: 0.62, mood: 'shut', rot: -80 });
  return `
  ${room(0, X.home, FLOOR, '#FEF9C3')}
  ${board(X.board, 70, 270, 92)}
  <g class="e070-title"><text x="${X.board + 135}" y="122" text-anchor="middle" ${NUN} font-size="26" fill="#F8FAFC">Healthy Habits</text></g>
  <rect class="e070-wipe" x="${X.board + 4}" y="96" width="262" height="36" fill="#166534"/>
  <rect x="${X.board + 20}" y="166" width="40" height="5" rx="2" fill="#E5E7EB" stroke="${L}" stroke-width="0.5"/>
  ${poster(1, X.p1, `<rect x="${X.p1 + 10}" y="${PY + 50}" width="62" height="22" rx="4" fill="#93C5FD" stroke="${L}"/><rect x="${X.p1 + 8}" y="${PY + 40}" width="8" height="34" fill="#A16207" stroke="${L}" stroke-width="0.8"/>
    <g transform="translate(${X.p1 + 24} ${PY + 48})">${minhSleep}</g><path d="M${X.p1 + 30} ${PY + 50} h40 v12 h-40Z" fill="#60A5FA" stroke="${L}" stroke-width="0.8"/>
    <g transform="translate(${X.p1 + 80} ${PY + 20})"><circle r="13" fill="#fff" stroke="${L}"/><g class="e070-hand"><path d="M0 0 V-10" stroke="${L}" stroke-width="2" stroke-linecap="round"/></g><path d="M0 0 L6 3" stroke="${L}" stroke-width="2" stroke-linecap="round"/></g>
    <g transform="translate(${X.p1 + 22} ${PY + 18})"><circle r="9" fill="#FDE68A"/><circle cx="5" cy="-3" r="8" fill="#E0E7FF"/></g>
    <g class="e070-z">${[0, 1, 2].map((i) => `<text x="${X.p1 + 44 + i * 8}" y="${PY + 40 - i * 8}" ${NUN} font-size="${9 + i * 2}" fill="#6366F1">z</text>`).join('')}</g>`)}
  ${poster(2, X.p2, `<rect x="${X.p2}" y="${PY + 60}" width="100" height="24" fill="#86EFAC"/><g transform="translate(${X.p2 + 82} ${PY + 18})"><circle r="10" fill="#FDE047" stroke="#F59E0B" stroke-width="1.4"/></g>
    <g transform="translate(${X.p2 + 34} ${PY + 72})">${headOnly('en_tom', { s: 0.5 })}</g><path d="M${X.p2 + 34} ${PY + 80} V${PY + 84}" stroke="${L}"/>
    <g class="e070-bounce"><g transform="translate(${X.p2 + 62} ${PY + 74})"><circle r="7" fill="#fff" stroke="${L}"/><path d="M0 -2.6 l2.6 1.8 -1 3 h-3.2 l-1 -3Z" fill="#1F2937"/></g></g>`)}
  ${poster(3, X.p3, `<rect x="${X.p3 + 14}" y="${PY + 14}" width="72" height="50" rx="5" fill="#334155" stroke="${L}"/><rect class="e070-screen" x="${X.p3 + 20}" y="${PY + 20}" width="60" height="38" rx="2" fill="#1E293B"/>
    <path d="M${X.p3 + 40} ${PY + 64} l-8 12 M${X.p3 + 60} ${PY + 64} l8 12" stroke="${L}" stroke-width="2"/>
    <g transform="translate(${X.p3 + 50} ${PY + 39})"><ellipse rx="16" ry="9" fill="#fff" stroke="${L}"/><circle r="5.4" fill="#2563EB"/><circle r="2.4" fill="#1F2937"/><g class="e070-x" transform="scale(1.3)">${CROSS}</g></g>`)}
  <!-- cửa lớp -->
  <rect x="${X.door - 30}" y="110" width="44" height="${FLOOR - 110}" fill="#B45309" stroke="${L}" stroke-width="1.2"/><circle cx="${X.door + 6}" cy="200" r="3" fill="#FDE68A"/>
  <!-- nhà Minh -->
  ${room(X.home, X.out - X.home, FLOOR, '#FCE7F3', '#D9A066')}
  <rect x="${X.home - 6}" y="0" width="16" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  ${windowBox(1080, 70, 100, 80)}<g class="e070-dark"><rect x="1080" y="70" width="100" height="80" fill="#1E1B4B"/><circle cx="1158" cy="92" r="8" fill="#FEF9C3"/></g>
  <g transform="translate(${X.dtab} 26)"><path d="M0 0 V22" stroke="${L}"/><path d="M-16 38 Q0 18 16 38Z" fill="#FDE047" stroke="${L}"/></g>
  <!-- bếp -->
  <rect x="${X.stove - 50}" y="${FLOOR - 74}" width="130" height="74" fill="#F1F5F9" stroke="${L}" stroke-width="1.2"/>
  <rect x="${X.stove - 50}" y="${FLOOR - 80}" width="130" height="8" rx="2" fill="#94A3B8" stroke="${L}"/>
  ${[-30, 10, 50].map((dx) => `<rect x="${X.stove + dx - 14}" y="${FLOOR - 60}" width="28" height="44" rx="2" fill="#E2E8F0" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="${X.stove - 60}" y="40" width="150" height="40" rx="4" fill="#FDE68A" stroke="${L}"/>
  <!-- cửa nhà -->
  <rect x="${X.fdoor - 26}" y="112" width="48" height="${FLOOR - 112}" fill="#92400E" stroke="${L}" stroke-width="1.2"/><circle cx="${X.fdoor + 12}" cy="200" r="3" fill="#FDE68A"/>
  <!-- phố buổi tối -->
  ${sky(X.out, 2500 - X.out, 315, 'e070sky')}${cloud(1900, 60, 0.8, 1)}${cloud(2300, 46, 0.9, 3)}
  <path d="M${X.out} 216 Q1950 196 2150 214 T2500 208 V${FLOOR} H${X.out}Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(1880, FLOOR - 4, 1.2, '')}${tree(2260, FLOOR - 4, 1.3, '')}
  <g transform="translate(2080 ${FLOOR})"><path d="M0 0 V-150" stroke="#475569" stroke-width="5"/><path d="M0 -150 q14 0 18 10" stroke="#475569" stroke-width="4" fill="none"/><ellipse cx="18" cy="-138" rx="9" ry="5" fill="#FEF08A" stroke="${L}"/>
    <path class="e070-glow" d="M18 -134 L-20 0 H56Z" fill="#FEF08A" opacity="0"/></g>
  <rect x="${X.out}" y="${FLOOR - 4}" width="${2500 - X.out}" height="40" fill="#CBD5E1" stroke="${L}"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M${X.out + 30 + i * 64} ${FLOOR - 4} V${FLOOR + 36}" stroke="#94A3B8"/>`).join('')}
  <!-- nhãn -->
  <g class="e070-lb e070-lb-lot">${label(X.ttab - 34, 150, 'a lot', '#15803D', 15)}</g>
  <g class="e070-lb e070-lb-little">${label(X.ttab + 62, 150, 'a little', '#B45309', 15)}</g>
  <g class="e070-lb e070-lb-better">${label(X.tom + 4, 96, 'better', '#2563EB', 16)}</g>
  <g class="e070-lb e070-lb-9h">${label(X.p1 + 50, PY + 112, '9 hours', '#4F46E5', 15)}</g>
  <g class="e070-lb e070-lb-1h">${label(X.p2 + 50, PY + 112, '1 hour', '#15803D', 15)}</g>
  <g class="e070-lb e070-lb-eyes">${label(X.p3 + 50, PY + 112, 'bad for eyes', '#DC2626', 13)}</g>
  <g class="e070-lb e070-lb-oil">${label(X.stove + 10, 100, 'a little oil', '#B45309', 15)}</g>
  <g class="e070-lb e070-lb-ban">${label(X.dtab, 130, 'a few bananas', '#CA8A04', 15)}</g>
  <g class="e070-lb e070-lb-walk">${label(2050, 70, 'new habit', '#7C3AED', 17)}</g>`;
}

function fg() {
  return `
  <!-- bàn cô: rau quả nhiều, đường ít -->
  ${table(X.ttab, 214, 120, FLOOR, '#B45309')}
  <g transform="translate(${X.ttab - 22} 214)">${PILE}</g>
  <g class="e070-sugar" transform="translate(${X.ttab + 40} 214)">${SUGAR}</g>
  <!-- bàn học sinh (che chân người ngồi) -->
  ${[X.minh, X.tom, X.mai].map((x) => desk(x - 12, FLOOR)).join('')}
  <g class="e070-can" transform="translate(${X.tom - 50} ${FLOOR - 56})">${CAN}<g class="e070-x2" transform="translate(0 -10)">${CROSS}</g></g>
  <!-- bàn ăn nhà Minh -->
  ${table(X.dtab + 20, 222, 150, FLOOR, '#A16207')}
  <g class="e070-cake" transform="translate(${X.dtab + 50} 222)"><ellipse cx="0" cy="0" rx="18" ry="4" fill="#fff" stroke="${L}" stroke-width="0.8"/>${CAKE}</g>
  <g class="e070-bananas" transform="translate(${X.dtab - 6} 222)"><ellipse cx="0" cy="0" rx="18" ry="4" fill="#fff" stroke="${L}" stroke-width="0.8"/><g transform="translate(-6 -6)">${BANANA}</g><g transform="translate(6 -10) rotate(20)">${BANANA}</g></g>
  <!-- chảo trên bếp -->
  <g transform="translate(${X.stove + 10} ${FLOOR - 80})"><ellipse cx="0" cy="-4" rx="24" ry="6" fill="#334155" stroke="${L}"/><path d="M24 -4 H52" stroke="#1F2937" stroke-width="4" stroke-linecap="round"/>
    <g class="e070-food">${[-12, 0, 12].map((x) => `<ellipse cx="${x}" cy="-8" rx="6" ry="3" fill="#FCD34D" stroke="${L}" stroke-width="0.6"/>`).join('')}</g>
    <g class="e070-oil"><ellipse cx="0" cy="-6" rx="6" ry="2" fill="#FDE047" opacity="0.9"/></g>${steam(0, -14, 'e070-steam')}</g>
  ${bush(1960, FLOOR + 8, 0.9)}${bush(2400, FLOOR + 6, 1)}
  ${night(X.home, 2500 - X.home, 315, 2300)}
  ${thought(X.minh + 70, 70, 96, 70, `<g transform="scale(1.5)">${CHICKEN}</g><g class="e070-heart" transform="translate(30 -16)">${HEART}</g>`, [X.minh + 14, 150], 'e070-think')}`;
}

const CSS = `
.e070-lb { opacity: 0; transition: opacity .35s; }
${['lot', 'little', 'better', '9h', '1h', 'eyes', 'oil', 'ban', 'walk'].map((k) => `.st-lb-${k} .e070-lb-${k}`).join(', ')} { opacity: 1; }
.e070-wipe { transform-box: fill-box; transform-origin: right; transition: transform 2s linear; }
.st-title .e070-wipe { transform: scaleX(0); }
.e070-veg { opacity: 0; transform: translateY(-14px); transition: opacity .25s, transform .3s cubic-bezier(.3,1.5,.6,1); }
.st-veg .e070-veg { opacity: 1; transform: translateY(0); }
.e070-sugar { opacity: 0; transition: opacity .3s; } .st-sugar .e070-sugar { opacity: 1; }
.e070-think { opacity: 0; transition: opacity .35s; } .st-think .e070-think { opacity: 1; }
.st-think .e070-heart { animation: e070Beat .5s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
@keyframes e070Beat { to { transform: scale(1.3); } }
.e070-can { opacity: 0; transition: opacity .3s; } .st-can .e070-can { opacity: 1; }
.e070-x2 { opacity: 0; transform-box: fill-box; transform-origin: center; transform: scale(2); transition: opacity .2s, transform .3s; }
.st-canx .e070-x2 { opacity: 1; transform: scale(1); }
.e070-tip { transform: scale(0); transition: transform .45s cubic-bezier(.3,1.4,.6,1); }
.st-tip1 .e070-tip1, .st-tip2 .e070-tip2, .st-tip3 .e070-tip3 { transform: scale(1); }
.e070-hot { opacity: 0; transition: opacity .3s; }
.st-hot1 .e070-hot1, .st-hot2 .e070-hot2, .st-hot3 .e070-hot3 { opacity: 1; animation: e070Hot .5s ease-in-out infinite alternate; }
@keyframes e070Hot { from { opacity: .4; } to { opacity: 1; } }
.e070-z { opacity: 0; } .st-hot1 .e070-z { animation: e070Z 1.4s ease-out infinite; }
@keyframes e070Z { from { opacity: 0; transform: translateY(4px); } 30% { opacity: 1; } to { opacity: 0; transform: translateY(-8px); } }
.st-hot1 .e070-hand { animation: e070Spin .5s linear 3; }
@keyframes e070Spin { to { transform: rotate(360deg); } }
.st-hot2 .e070-bounce { animation: e070Bounce .45s cubic-bezier(.3,0,.6,1) infinite alternate; }
@keyframes e070Bounce { to { transform: translateY(-20px); } }
.e070-screen { transition: fill .2s; } .st-hot3 .e070-screen { fill: #67E8F9; animation: e070Flick .25s steps(2) infinite; }
@keyframes e070Flick { 50% { fill: #F0ABFC; } }
.e070-x { opacity: 0; transition: opacity .3s .8s; } .st-hot3 .e070-x { opacity: 1; }
.e070-oil { opacity: 0; transition: opacity .4s; } .st-oil .e070-oil { opacity: 1; }
.e070-food { opacity: 0; transition: opacity .4s; } .st-fry .e070-food { opacity: 1; }
.e070-steam { opacity: 0; transition: opacity .4s; } .st-fry .e070-steam { opacity: 1; }
.e070-cake { transition: transform .8s ease-in-out, opacity .8s; } .st-nocake .e070-cake { transform: translateX(60px); opacity: 0; }
.e070-bananas { opacity: 0; transition: opacity .4s; } .st-bananas .e070-bananas { opacity: 1; }
.e070-dark { opacity: 0; transition: opacity .8s; } .st-night .e070-dark { opacity: 1; }
.st-night .ek-night { opacity: 1; }
.st-night .e070-glow { opacity: .35; transition: opacity .8s; }
@media (prefers-reduced-motion: reduce) {
  .st-think .e070-heart, .st-hot1 .e070-hot1, .st-hot2 .e070-hot2, .st-hot3 .e070-hot3 { animation-duration: 1.4s; }
  .st-hot2 .e070-bounce { animation-duration: 1.1s; }
  .st-hot3 .e070-screen { animation-duration: 1s; }
  .st-hot1 .e070-hand { animation-duration: 1.5s; animation-iteration-count: 1; }
}
`;

const KIDS = ['minh', 'tom', 'mai'];
const sitAll = (st) => KIDS.forEach((id) => st.pose(id, 'sitDesk'));

const BEATS = [
  { key: ['learning about healthy habits'], icon: '🏫', label: 'healthy habits', async play(st) {
    st.look(330);
    st.sfx('school-bell', { vol: 0.4 });
    st.hold('hoa', 'e070_chalk'); st.face('hoa', -1); st.pose('hoa', 'e070_write'); st.act('hoa', 'write');
    st.set('st-title');
    await st.loop('pencil', () => st.wait(2100), { vol: 0.8 });
    st.act('hoa', null); st.hold('hoa', null); st.face('hoa', 1); st.pose('hoa', 'point'); st.act('hoa', 'point');
    await st.wait(700);
  } },
  { key: ['Eating well is very important'], icon: '🥗', label: 'eating well', async play(st) {
    st.act('hoa', null);
    st.look(560);
    st.hold('hoa', 'e070_plate'); st.pose('hoa', 'e070_show'); st.sfx('bowl-down', { vol: 0.6 });
    st.mood('hoa', 'joy');
    await st.wait(700);
    for (const id of KIDS) { st.act(id, 'nod'); }
    st.sfx('ding', { vol: 0.5 });
    await st.say('hoa', 'Very important!', 1500);
    for (const id of KIDS) st.act(id, null);
  } },
  { key: ['a lot of vegetables and fruit', 'only a little sugar'], icon: '🥕', label: 'a lot of vegetables', async play(st) {
    st.hold('hoa', null); st.pose('hoa', 'point'); st.mood('hoa', 'happy');
    st.look(560);
    st.set('st-veg');
    for (let i = 0; i < 4; i++) { st.sfx('crunch', { vol: 0.35 }); await st.wait(230); }
    st.set('st-lb-lot');
    await st.wait(700);
    st.set('st-sugar'); st.sfx('tick', { vol: 0.7 }); st.set('st-lb-little');
    await st.wait(1400);
  } },
  { key: ['loves fried chicken', 'feels a bit worried'], icon: '🍗', label: 'fried chicken', async play(st) {
    st.set('st-lb-lot', false); st.set('st-lb-little', false); st.pose('hoa', 'stand');
    st.look(620);
    st.pose('minh', 'e070_sitThink'); st.mood('minh', 'joy');
    st.set('st-think'); st.sfx('sizzle', { vol: 0.7 });
    await st.wait(1500);
    st.set('st-think', false);
    st.pose('minh', 'e070_worry'); st.mood('minh', 'sad'); st.act('minh', 'shiver'); st.sfx('gulp', { vol: 0.8 });
    await st.wait(1300);
    st.act('minh', null);
  } },
  { key: ['Drinking water is better than drinking soft drinks'], icon: '💧', label: 'drinking water', async play(st) {
    st.pose('minh', 'sitDesk'); st.mood('minh', 'happy');
    st.look(680);
    st.pose('tom', 'stand'); st.hold('tom', 'e070_bottle'); st.pose('tom', 'e070_drink');
    await st.wait(400);
    st.sfx('gulp', { vol: 0.8 });
    await st.wait(900);
    st.pose('tom', 'raise'); st.set('st-lb-better'); st.sfx('ding', { vol: 0.5 });
    await st.wait(500);
    st.set('st-can'); st.sfx('bowl-down', { vol: 0.4 });
    await st.wait(500);
    st.set('st-canx'); st.sfx('buzz-no', { vol: 0.6 });
    await st.wait(1100);
  } },
  { key: ['a few more tips'], icon: '📋', label: 'a few tips', async play(st) {
    st.set('st-lb-better', false); st.hold('tom', null); st.pose('tom', 'sitDesk');
    st.look(640);
    await st.walk('hoa', 470, { speed: 120, follow: false });
    st.pose('hoa', 'pointUp');
    for (let k = 1; k <= 3; k++) { st.set(`st-tip${k}`); st.sfx('page-turn', { vol: 0.8 }); await st.wait(550); }
    for (const id of KIDS) st.mood(id, 'wow');
    await st.wait(700);
  } },
  { key: ['Sleeping for nine hours helps your brain'], icon: '😴', label: 'sleeping', async play(st) {
    for (const id of KIDS) st.mood(id, 'happy');
    st.look(620);
    st.pose('hoa', 'point');
    st.set('st-hot1'); st.sfx('tick', { vol: 0.7 });
    await st.wait(700);
    st.set('st-lb-9h'); st.sfx('snore', { vol: 0.6 });
    await st.wait(1500);
    st.fx('sparkle', X.p1 + 50, PY + 10, { quiet: true }); st.sfx('ding', { vol: 0.5 });
    await st.wait(600);
  } },
  { key: ['Playing outside for an hour a day', 'keeps your body strong'], icon: '⚽', label: 'playing outside', async play(st) {
    st.set('st-hot1', false); st.set('st-lb-9h', false);
    st.look(680);
    st.set('st-hot2'); st.set('st-lb-1h');
    for (let i = 0; i < 3; i++) { st.sfx('kick', { vol: 0.5 }); await st.wait(450); }
    st.pose('minh', 'e070_strong'); st.pose('tom', 'e070_strong'); st.mood('minh', 'joy'); st.mood('tom', 'joy');
    st.act('minh', 'hop'); st.sfx('cheer', { vol: 0.4 });
    await st.wait(1200);
    st.act('minh', null);
  } },
  { key: ['Watching a lot of TV is bad for your eyes'], icon: '📺', label: 'watching TV', async play(st) {
    st.set('st-hot2', false); st.set('st-lb-1h', false);
    st.pose('minh', 'sitDesk'); st.pose('tom', 'sitDesk'); st.mood('minh', 'happy'); st.mood('tom', 'happy');
    st.look(740);
    st.set('st-hot3'); st.sfx('click', { vol: 0.8 });
    await st.wait(900);
    st.set('st-lb-eyes'); st.sfx('buzz-no', { vol: 0.5 });
    st.pose('mai', 'e070_rub'); st.act('mai', 'wash'); st.mood('mai', 'shut');
    await st.wait(1400);
    st.act('mai', null);
  } },
  { key: ['At home, Minh tells his family'], icon: '🏠', label: 'tells his family', async play(st) {
    st.set('st-hot3', false); st.set('st-lb-eyes', false); st.pose('mai', 'sitDesk'); st.mood('mai', 'happy');
    st.pose('minh', 'stand');
    await st.walk('minh', X.door - 10, { speed: 136, lead: 120 });
    st.sfx('door-open', { vol: 0.7 });
    await st.walk('minh', 1120, { speed: 136, lead: 80 });
    st.face('minh', 1); st.pose('minh', 'e070_tell'); st.mood('minh', 'joy');
    st.sfx('pop', { vol: 0.5 });
    await st.say('minh', 'Healthy habits!', 1400);
    st.act('mum', 'nod'); st.act('lan', 'nod'); st.act('dad', 'nod');
    await st.wait(700);
  } },
  { key: ['only a little oil', 'a few bananas instead of cakes'], icon: '🍌', label: 'a few bananas', async play(st) {
    st.pose('minh', 'stand'); st.mood('minh', 'happy');
    st.look(1400);
    st.hold('lan', 'e070_oil'); st.pose('lan', 'e070_pour');
    await st.wait(500);
    st.set('st-oil'); st.sfx('drip', { vol: 0.8 }); st.set('st-lb-oil');
    await st.wait(600);
    st.hold('lan', null); st.pose('lan', 'stir'); st.act('lan', 'stir'); st.set('st-fry'); st.sfx('sizzle', { vol: 0.7 });
    await st.wait(1000);
    st.look(1300);
    st.set('st-nocake'); st.pose('dad', 'sitHold'); st.sfx('whoosh', { vol: 0.5 });
    await st.wait(700);
    st.set('st-bananas'); st.set('st-lb-ban'); st.sfx('pop', { vol: 0.5 });
    st.hold('dad', 'e070_banana'); st.pose('dad', 'eat'); st.act('dad', 'eat');
    await st.wait(500);
    st.sfx('gulp', { vol: 0.6 });
    await st.wait(1000);
  } },
  { key: ['Walking after dinner', "the family's new habit"], icon: '🚶', label: 'walking after dinner', async play(st) {
    st.set('st-lb-oil', false); st.set('st-lb-ban', false);
    st.act('lan', null); st.act('dad', null); st.hold('dad', null);
    for (const id of ['lan', 'dad', 'mum']) st.pose(id, 'stand');
    st.set('st-night'); st.sfx('crickets', { vol: 0.6 });
    await st.wait(600);
    st.sfx('door-open', { vol: 0.6 });
    st.look(1900, { dur: 3600 });
    await Promise.all([
      st.walk('dad', 2080, { speed: 130, follow: false }),
      st.walk('mum', 2010, { speed: 130, follow: false }),
      st.walk('lan', 1950, { speed: 130, follow: false }),
      st.walk('minh', 1890, { speed: 136, follow: false }),
    ]);
    for (const id of ['dad', 'mum', 'lan', 'minh']) st.mood(id, 'joy');
    st.set('st-lb-walk'); st.sfx('birds', { vol: 0.2 });
    await st.wait(900);
  } },
];

export default {
  id: 'en070', worldW: 2500, floor: FLOOR, viewTop: 40, camStart: 100, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS, order: [0, 2, 3, 4, 6, 8, 10, 11],
  cast: [
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: X.hoa, s: 0.95 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: X.minh, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: X.tom, face: -1 },
    { id: 'mai', kind: 'kid', who: 'e070_mai', x: X.mai, face: -1 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 1180, s: 0.95, face: -1 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: X.dtab + 30, s: 0.95, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.stove + 10, s: 1.08 },
  ],
  init(st) {
    sitAll(st);
    st.pose('dad', 'sitDesk');
  },
};
