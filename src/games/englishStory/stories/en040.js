/**
 * Bài 40 "Whose Umbrella Is It?": lớp học lúc tan trường (bảng, cửa sổ thấy mưa, cặp ai rơi trên sàn) → cửa lớp có xô cắm bốn
 * cái ô (xanh dương, xanh lá, vàng, hồng) → hành lang có mái che, ngoài sân mưa rơi, Lan đứng chờ ở cửa.
 * Cô Hoa giơ từng cái ô lên hỏi "Whose…?"; Minh, Tom, Lan nhận ô; cuối cùng cô thấy cái cặp trên sàn: cặp của Minh.
 * Toạ độ cảnh: rộng 1400, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, tree, bush, label, board, desk, BAG } from '../kit.js';

const FLOOR = 282;
const UC = { blue: '#3B82F6', green: '#22C55E', yellow: '#FACC15', pink: '#F472B6' };

/** Ô cụp cắm trong xô: móc ở trên, đầu nhọn ở dưới (gốc = đầu nhọn). */
const standUmb = (c) => `<path d="M0 -58 V-4" stroke="${L}" stroke-width="1.6"/><path d="M0 -58 q-7 0 -7 6" stroke="${L}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path d="M-5 -42 Q-6 -20 0 0 Q6 -20 5 -42Z" fill="${c}" stroke="${L}" stroke-width="0.9"/><path d="M-2 -40 Q-2 -22 0 -6" stroke="#fff" stroke-width="1" opacity="0.6" fill="none"/>`;
/** Ô cụp cầm giơ lên (tay giơ: +y hướng lên trời): móc dưới tay, đầu nhọn trên cùng. */
const upUmb = (c) => `<g transform="translate(0 2)"><path d="M0 -8 V56" stroke="${L}" stroke-width="1.8"/><path d="M0 -8 q6 0 6 -6" stroke="${L}" stroke-width="2.8" fill="none" stroke-linecap="round"/>
  <path d="M-6 14 Q-7 36 0 60 Q7 36 6 14Z" fill="${c}" stroke="${L}" stroke-width="1"/><path d="M-2 16 Q-2 36 0 54" stroke="#fff" stroke-width="1" opacity="0.6" fill="none"/></g>`;
/** Ô cụp cầm như gậy (tay buông: +y hướng xuống đất). */
const caneUmb = (c) => `<path d="M0 -6 V40" stroke="${L}" stroke-width="1.6"/><path d="M0 -6 q-6 0 -6 5" stroke="${L}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path d="M-5 10 Q-6 26 0 42 Q6 26 5 10Z" fill="${c}" stroke="${L}" stroke-width="0.9"/>`;
/** Cặp của Minh (màu cam, có thẻ tên). */
const MINH_BAG = (s = 1) => `<g transform="scale(${s})">${BAG('#F59E0B')}<rect x="-6" y="-11" width="12" height="6" rx="1" fill="#fff" stroke="${L}" stroke-width="0.5"/><text x="0" y="-6.6" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="4.4" fill="#1D4ED8">MINH</text></g>`;
/** Dấu hỏi to (thing, gốc ở đáy). */
const QMARK = `<g class="e040-qbob"><circle cx="0" cy="-16" r="15" fill="#fff" stroke="${L}" stroke-width="1.2"/><text x="0" y="-6" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="26" fill="#F97316">?</text></g>`;

const PROPS = {
  e040_upBlue: upUmb(UC.blue), e040_upGreen: upUmb(UC.green), e040_upPink: upUmb(UC.pink),
  e040_caneBlue: caneUmb(UC.blue), e040_caneYellow: caneUmb(UC.yellow), e040_canePink: caneUmb(UC.pink),
};
const POSES = {
  e040_look: { R: [10, 4], L: [10, 4], head: 12 },
  e040_hold: { R: [26, -70], L: [26, -70] },
};

const rain = (x0, x1, y0, y1, n) => Array.from({ length: n }, (_, i) => {
  const x = x0 + ((i * 37) % (x1 - x0)), y = y0 + ((i * 53) % (y1 - y0));
  return `<path d="M${x} ${y} l-3 10" style="animation-delay:${(-(i % 7) * 0.11).toFixed(2)}s"/>`;
}).join('');

function bg() {
  return `
  <defs><linearGradient id="e040sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#94A3B8"/><stop offset="1" stop-color="#CBD5E1"/></linearGradient></defs>
  <!-- Ngoài trời (sau cửa lớp): trời mưa -->
  <rect x="760" y="0" width="640" height="315" fill="url(#e040sky)"/>
  ${[[900, 60], [1140, 44], [1330, 70]].map(([x, y], i) => `<g transform="translate(${x} ${y}) scale(1.3)"><g class="ek-cloud" style="animation-delay:${i}s"><ellipse rx="40" ry="14" fill="#64748B"/><ellipse cx="-16" cy="-8" rx="18" ry="12" fill="#64748B"/><ellipse cx="14" cy="-10" rx="20" ry="13" fill="#64748B"/></g></g>`).join('')}
  <path d="M760 236 Q960 210 1160 232 T1400 228 V282 H760Z" fill="#86EFAC" stroke="${L}" stroke-width="0.8"/>
  ${tree(1110, 240, 0.9, '')}${tree(1330, 236, 0.8, '')}
  <rect x="760" y="${FLOOR - 4}" width="640" height="40" fill="#4ADE80" stroke="${L}"/>
  ${[1080, 1230, 1350].map((x) => `<ellipse cx="${x}" cy="${FLOOR + 14}" rx="26" ry="4" fill="#93C5FD" stroke="${L}" stroke-width="0.6"/><ellipse class="e040-ripple" cx="${x}" cy="${FLOOR + 14}" rx="8" ry="1.6" fill="none" stroke="#fff" stroke-width="1"/>`).join('')}
  <!-- hành lang có mái che + nền gạch -->
  <rect x="760" y="${FLOOR - 4}" width="250" height="40" fill="#E7E5E4" stroke="${L}"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${790 + i * 40} ${FLOOR - 4} V315" stroke="#D6D3D1"/>`).join('')}
  <rect x="992" y="58" width="12" height="${FLOOR - 62}" fill="#FDE68A" stroke="${L}"/>
  <path d="M760 40 H1030 L1040 64 H760Z" fill="#B91C1C" stroke="${L}" stroke-width="1.2"/>
  <!-- Lớp học -->
  <rect x="0" y="0" width="768" height="${FLOOR}" fill="#FEF9C3"/>
  <rect x="0" y="0" width="768" height="12" fill="#E9D5B5" stroke="${L}"/>
  <rect x="0" y="${FLOOR}" width="768" height="${315 - FLOOR}" fill="#D9A066" stroke="${L}"/>${Array.from({ length: 13 }, (_, i) => `<path d="M${i * 60} ${FLOOR} V315" stroke="#B9824F" stroke-width="1.2"/>`).join('')}
  ${board(40, 70, 190, 90, 'Goodbye!')}
  <g transform="translate(270 70)"><circle r="15" fill="#fff" stroke="${L}" stroke-width="1.4"/><path d="M0 0 V-10 M0 0 L7 4" stroke="${L}" stroke-width="1.8" stroke-linecap="round"/></g>
  <!-- cửa sổ: mưa ngoài sân -->
  <g transform="translate(330 66)"><rect x="-6" y="-6" width="132" height="102" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/>
    <rect x="0" y="0" width="120" height="90" fill="#94A3B8"/><path d="M0 70 Q50 58 120 66 V90 H0Z" fill="#86EFAC"/>
    <g class="e040-rain e040-wrain" stroke="#E0F2FE" stroke-width="1.4" stroke-linecap="round">${rain(4, 118, 0, 70, 16)}</g>
    <path d="M60 0 V90 M0 45 H120" stroke="#fff" stroke-width="3" opacity="0.85"/></g>
  <g class="e040-lb e040-lb-after">${label(262, 204, 'after school', '#1D4ED8', 15)}</g>
  <!-- cửa lớp (mở) -->
  <rect x="756" y="96" width="16" height="${FLOOR - 96}" fill="#C08B5C" stroke="${L}"/>
  <path d="M772 96 L812 106 V${FLOOR + 6} L772 ${FLOOR}Z" fill="#B45309" stroke="${L}"/><circle cx="804" cy="200" r="2.6" fill="#FDE68A"/>
  <rect x="720" y="86" width="72" height="12" rx="2" fill="#C08B5C" stroke="${L}"/>
  <!-- xô cắm ô cạnh cửa -->
  <g transform="translate(704 ${FLOOR})">
    ${[['blue', -10, -8], ['green', -3, -3], ['yellow', 4, 3], ['pink', 11, 8]].map(([k, dx, r]) => `<g class="e040-u e040-u-${k}"><g transform="translate(${dx} -22) rotate(${r})">${standUmb(UC[k])}</g></g>`).join('')}
    <path d="M-17 -30 H17 L14 0 H-14Z" fill="#64748B" stroke="${L}" stroke-width="1.2"/><path d="M-17 -30 H17" stroke="#94A3B8" stroke-width="3"/>
    <g class="e040-glowY"><circle cx="6" cy="-66" r="18" fill="#FDE047" opacity="0.55"/></g>
    ${[-10, -3, 4, 11].map((dx, i) => `<g class="e040-n e040-n${i}"><g transform="translate(${dx * 2.6} -104)"><circle r="9" fill="#fff" stroke="${L}"/><text y="4.4" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="12" fill="#DC2626">${i + 1}</text></g></g>`).join('')}
  </g>
  <!-- cái cặp trên sàn -->
  <g class="e040-floorbag" transform="translate(292 ${FLOOR - 12}) rotate(-80)">${MINH_BAG(1.1)}</g>
  <g class="e040-lb e040-lb-his">${label(300, 112, 'his bag', '#C2410C', 16)}</g>`;
}

function fg() {
  return `
  <g class="e040-rain e040-orain" stroke="#E0F2FE" stroke-width="1.6" stroke-linecap="round">${rain(1010, 1400, 70, 270, 46)}</g>
  ${desk(110, FLOOR)}${desk(196, FLOOR, '#FB923C')}
  ${bush(1046, FLOOR + 14, 1, '#22C55E')}`;
}

const CSS = `
.e040-rain path { animation: e040Rain .6s linear infinite; }
@keyframes e040Rain { from { transform: translate(0, -20px); opacity: 0; } 20% { opacity: 1; } to { transform: translate(-6px, 30px); opacity: .8; } }
.e040-orain { opacity: .75; transition: opacity .6s; } .st-rain .e040-orain { opacity: 1; }
.st-rain .e040-rain path { animation-duration: .42s; }
.e040-ripple { transform-box: fill-box; transform-origin: center; animation: e040Ripple 1.2s ease-out infinite; }
@keyframes e040Ripple { from { transform: scale(.4); opacity: 1; } to { transform: scale(2.6); opacity: 0; } }
.e040-lb { opacity: 0; transition: opacity .35s; }
.st-lb-after .e040-lb-after, .st-lb-his .e040-lb-his { opacity: 1; }
.e040-u { transition: opacity .25s; }
.st-take-blue .e040-u-blue, .st-take-green .e040-u-green, .st-take-yellow .e040-u-yellow, .st-take-pink .e040-u-pink { opacity: 0; }
.e040-n { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: center; transition: opacity .25s, transform .4s cubic-bezier(.3,1.6,.6,1); }
.st-count .e040-n { opacity: 1; transform: scale(1); }
.e040-n1 { transition-delay: .35s; } .e040-n2 { transition-delay: .7s; } .e040-n3 { transition-delay: 1.05s; }
.e040-glowY { opacity: 0; transition: opacity .3s; } .st-glowY .e040-glowY { opacity: 1; animation: e040Pulse .5s ease-in-out infinite alternate; }
@keyframes e040Pulse { to { opacity: .4; } }
.e040-floorbag { transition: opacity .25s; } .st-bagUp .e040-floorbag { opacity: 0; }
.st-bagSeen .e040-floorbag { animation: e040Wiggle .18s linear infinite alternate; }
@keyframes e040Wiggle { from { transform: translate(292px, ${FLOOR - 12}px) rotate(-84deg); } to { transform: translate(292px, ${FLOOR - 12}px) rotate(-76deg); } }
.e040-qbob { animation: e040Q .6s ease-in-out infinite alternate; } @keyframes e040Q { to { transform: translateY(-4px); } }
@media (prefers-reduced-motion: reduce) { .e040-rain path { animation-duration: 1.4s; } .e040-ripple { animation-duration: 3s; } }
`;

/** Đặt ngay một món tới chỗ mới. */
function put(st, id, x, y) { const A = st.a(id); A.x = x; if (y !== undefined) A.y = y; A.place(); }
/** Dấu hỏi trên đầu một người. */
function ask(st, id, on = true) {
  const A = st.a(id);
  if (on) put(st, 'q', A.x + (A.kind === 'adult' ? 34 : 28) * (A.face < 0 ? -1 : 1), A.y - (A.kind === 'adult' ? 172 : 128) * A.s);
  st.show('q', on);
}
const UMB_FLY = (c, s = 0.7) => `<g transform="scale(${s}) rotate(30)">${standUmb(c)}</g>`;

const BEATS = [
  { key: ['raining', 'after school'], icon: '🌧️', label: 'raining', async play(st) {
    st.look(380);
    st.set('st-rain'); st.set('st-lb-after');
    st.pose('minh', 'e040_look'); st.mood('minh', 'wow');
    await st.wait(900);
    st.pose('tom', 'point'); st.act('tom', 'point');
    await st.wait(1300);
    st.act('tom', null); st.pose('tom', 'stand'); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['four umbrellas', 'classroom door'], icon: '☂️', label: 'four umbrellas', async play(st) {
    st.set('st-lb-after', false);
    await st.look(640, { dur: 800 });
    st.set('st-count'); st.sfx('sparkle', { vol: 0.5 });
    await st.wait(1800);
  } },
  { key: ['holds up a blue umbrella'], icon: '🔵', label: 'blue umbrella', async play(st) {
    st.set('st-count', false);
    await st.walk('hoa', 660, { speed: 110, follow: false });
    st.pose('hoa', 'reach');
    await st.wait(350);
    st.set('st-take-blue');
    await st.walk('hoa', 606, { speed: 90, follow: false });
    st.hold('hoa', 'e040_upBlue'); st.pose('hoa', 'raise');
    st.look(540);
    await st.wait(1100);
  } },
  { key: ['Whose umbrella is this'], icon: '❓', label: 'Whose umbrella?', async play(st) {
    st.mood('hoa', 'joy');
    await st.say('hoa', 'Whose umbrella is this?', 2000);
  } },
  { key: ['she asks'], icon: '🗣️', label: 'she asks', async play(st) {
    ask(st, 'hoa'); st.mood('hoa', 'wow');
    st.mood('minh', 'wow'); st.mood('tom', 'wow');
    await st.wait(1500);
    ask(st, 'hoa', false); st.mood('hoa', 'happy'); st.mood('tom', 'happy');
  } },
  { key: ['It is mine'], icon: '🙋', label: 'It is mine!', async play(st) {
    st.pose('minh', 'raise'); st.mood('minh', 'joy'); st.act('minh', 'hop');
    await st.say('minh', 'It is mine!', 1600);
    st.act('minh', null);
  } },
  { key: ['says Minh'], icon: '🔵', label: 'says Minh', async play(st) {
    st.pose('minh', 'stand');
    await st.walk('minh', 520, { speed: 130, follow: false });
    st.pose('hoa', 'give'); st.hold('hoa', null);
    await st.fly(UMB_FLY(UC.blue), [580, 190], [535, 236], { size: 30, dur: 500 });
    st.hold('minh', 'e040_caneBlue'); st.mood('minh', 'joy'); st.pose('hoa', 'stand');
    st.fx('sparkle', 528, 230);
    await st.wait(700);
  } },
  { key: ['holds up a green umbrella'], icon: '🟢', label: 'green umbrella', async play(st) {
    st.mood('minh', 'happy');
    await st.walk('hoa', 660, { speed: 110, follow: false });
    st.pose('hoa', 'reach');
    await st.wait(350);
    st.set('st-take-green');
    await st.walk('hoa', 606, { speed: 90, follow: false });
    st.hold('hoa', 'e040_upGreen'); st.pose('hoa', 'raise');
    await st.wait(900);
  } },
  { key: ['Is it yours, Tom'], icon: '👉', label: 'Is it yours?', async play(st) {
    st.look(500);
    st.mood('tom', 'wow');
    await st.say('hoa', 'Is it yours, Tom?', 1900);
  } },
  { key: ["it isn't mine"], icon: '🙅', label: "isn't mine", async play(st) {
    st.act('tom', 'no'); st.pose('tom', 'open'); st.mood('tom', 'happy');
    await st.say('tom', "No, it isn't mine.", 1800);
    st.act('tom', null); st.pose('tom', 'stand');
  } },
  { key: ['Mine is yellow'], icon: '🟡', label: 'Mine is yellow', async play(st) {
    st.look(540);
    st.pose('tom', 'point'); st.act('tom', 'point'); st.set('st-glowY');
    await st.say('tom', 'Mine is yellow.', 1700);
    st.act('tom', null);
  } },
  { key: ['finds his yellow umbrella'], icon: '☂️', label: 'yellow umbrella', async play(st) {
    st.pose('tom', 'stand');
    await st.walk('tom', 646, { speed: 150, lead: -40 });
    st.pose('tom', 'reach');
    await st.wait(350);
    st.set('st-glowY', false); st.set('st-take-yellow');
    st.hold('tom', 'e040_caneYellow'); st.pose('tom', 'stand'); st.mood('tom', 'joy');
    st.fx('sparkle', 690, 216);
    await st.wait(900);
  } },
  { key: ['waiting at the door'], icon: '🚪', label: 'at the door', async play(st) {
    await st.look(780, { dur: 900 });
    st.pose('lan', 'wave'); st.act('lan', 'wave'); st.mood('lan', 'joy');
    await st.wait(1500);
    st.act('lan', null); st.pose('lan', 'stand');
  } },
  { key: ['Whose is the pink umbrella'], icon: '🩷', label: 'pink umbrella', async play(st) {
    st.look(600);
    st.pose('hoa', 'reach'); st.hold('hoa', null);
    await st.fly(UMB_FLY(UC.green), [590, 160], [704, 226], { size: 30, dur: 450 });
    st.set('st-take-green', false); st.set('st-take-pink');
    st.hold('hoa', 'e040_upPink'); st.pose('hoa', 'raise');
    await st.wait(200);
    await st.say('hoa', 'Whose is the pink umbrella?', 2000);
  } },
  { key: ['asks Ms Hoa'], icon: '🗣️', label: 'asks Ms Hoa', async play(st) {
    ask(st, 'hoa'); st.mood('hoa', 'wow');
    await st.wait(1500);
    ask(st, 'hoa', false); st.mood('hoa', 'happy');
  } },
  { key: ['It is hers'], icon: '👧', label: 'It is hers', async play(st) {
    st.look(656);
    st.walk('lan', 800, { speed: 110, follow: false });
    st.hold('minh', null); st.pose('minh', 'point'); st.act('minh', 'point'); st.mood('minh', 'joy');
    await st.wait(600);
    st.pose('lan', 'wave'); st.act('lan', 'wave');
    await st.say('minh', 'It is hers.', 1700);
    st.act('minh', null); st.act('lan', null); st.pose('lan', 'stand'); st.pose('minh', 'stand'); st.hold('minh', 'e040_caneBlue');
  } },
  { key: ["my sister's"], icon: '💕', label: "my sister's", async play(st) {
    st.say('minh', "It is my sister's.", 1700);
    st.fx('hearts', 680, 150);
    await st.walk('lan', 744, { speed: 120, follow: false });
    st.pose('hoa', 'give'); st.hold('hoa', null);
    await st.fly(UMB_FLY(UC.pink), [630, 190], [736, 236], { size: 30, dur: 500 });
    st.hold('lan', 'e040_canePink'); st.mood('lan', 'joy'); st.pose('hoa', 'stand'); st.pose('minh', 'stand');
    await st.wait(600);
  } },
  { key: ['the green umbrella is mine'], icon: '🟢', label: 'green is mine', async play(st) {
    st.pose('hoa', 'reach');
    await st.wait(300);
    st.set('st-take-green');
    st.hold('hoa', 'e040_upGreen'); st.pose('hoa', 'raise'); st.mood('hoa', 'joy');
    await st.say('hoa', 'And the green umbrella is mine.', 2200);
  } },
  { key: ['a bag on the floor'], icon: '🎒', label: 'bag on the floor', async play(st) {
    st.hold('hoa', null); st.pose('hoa', 'stand'); st.set('st-take-green', false);
    await st.look(420, { dur: 900 });
    st.set('st-bagSeen'); st.mood('hoa', 'wow');
    st.fx('sparkle', 292, 262);
    await st.walk('hoa', 340, { speed: 140, follow: false });
    st.pose('hoa', 'e040_look');
    await st.wait(500);
  } },
  { key: ['Whose bag is this'], icon: '❓', label: 'Whose bag?', async play(st) {
    st.set('st-bagSeen', false);
    st.pose('hoa', 'plant');
    await st.wait(400);
    st.set('st-bagUp'); st.chest('hoa', `<g transform="translate(0 -6)">${MINH_BAG(1.3)}</g>`); st.pose('hoa', 'e040_hold');
    await st.wait(200);
    await st.walk('hoa', 346, { speed: 60, follow: false });
    st.pose('hoa', 'e040_hold');
    await st.say('hoa', 'Whose bag is this?', 1900);
  } },
  { key: ['looks at it'], icon: '👀', label: 'looks at it', async play(st) {
    await st.walk('minh', 400, { speed: 130, follow: false });
    st.pose('minh', 'e040_look'); st.mood('minh', 'wow');
    await st.wait(1600);
  } },
  { key: ['his bag'], icon: '🎒', label: 'his bag', async play(st) {
    st.set('st-lb-his'); st.fx('sparkle', 340, 180);
    st.mood('minh', 'joy'); st.pose('minh', 'cheer'); st.act('minh', 'jump');
    await st.wait(1000);
    st.act('minh', null);
    st.chest('hoa', null); st.pose('hoa', 'give');
    await st.fly(MINH_BAG(1.2), [330, 190], [400, 200], { size: 30, dur: 450 });
    st.bag('minh', true); st.sfx('bag-on'); st.pose('minh', 'stand'); st.pose('hoa', 'stand'); st.mood('hoa', 'joy');
    await st.wait(500);
    st.set('st-lb-his', false);
  } },
  { key: ['Thank you, Ms Hoa'], icon: '🙏', label: 'Thank you!', async play(st) {
    st.pose('minh', 'wave'); st.act('minh', 'wave'); st.mood('minh', 'joy'); st.mood('hoa', 'joy');
    st.fx('hearts', 370, 150);
    await st.say('minh', 'Thank you, Ms Hoa!', 1900);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
];

export default {
  id: 'en040', worldW: 1400, floor: FLOOR, viewTop: 40, camStart: 140, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 860, s: 1.08, face: -1 },
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 580, s: 0.95, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 440 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 384 },
    { id: 'q', kind: 'thing', x: 600, y: 120, svg: QMARK, box: [-18, -34, 36, 36] },
  ],
  init(st) {
    st.show('q', false);
    st.bag('lan', true); st.bag('tom', true);
  },
};
