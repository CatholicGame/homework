/**
 * Bài 24 "Tom from Australia": lớp học (bản đồ thế giới, bảng) → căng tin trường (nồi phở) → sân trường (khung thành, cột cờ, cổng).
 * Tom vào lớp, Minh hỏi chuyện dưới tấm bản đồ (Úc sáng lên, máy bay bay về Hà Nội); hai bạn ra căng tin nói chuyện phở;
 * Lan tới hỏi, Tom ra sân sút bóng, chú chó Lucky chạy tới bên cổng, đám mây nghĩ hiện Sydney, cờ Việt Nam bay.
 * Toạ độ cảnh: rộng 1700, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, grass, fence, room, doorway, board, rug, label, steam, BOWL } from '../kit.js';

const FLOOR = 282;

Object.assign(CAST, {
  e024_cook: { adult: true, hair: 'bun', hairC: '#3F2A1E', top: 'blouse', shirt: '#FFFFFF', bottom: 'pants', bottomC: '#475569', shoe: '#F5F5F4' },
});

// ── Đồ vật ────────────────────────────────────────────────────────────────
const BALL_T = `<g class="e024-roll" style="transform-origin:0px -9px"><g transform="translate(0 -9)"><circle r="9" fill="#fff" stroke="${L}"/>
  <path d="M0 -3.6 l3.4 2.5 -1.3 4 h-4.2 l-1.3 -4Z" fill="#1F2937"/><path d="M0 -3.6 V-9 M3.4 -1.1 L8.6 -2.6 M2.1 2.9 L5.2 7.2 M-2.1 2.9 L-5.2 7.2 M-3.4 -1.1 L-8.6 -2.6" stroke="#1F2937" stroke-width="0.9"/></g></g>`;
const PLANE = `<g transform="rotate(-50)"><path d="M-12 0 Q0 -3 12 0 Q0 3 -12 0Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M-2 0 L-6 -9 L1 -1Z M-2 0 L-6 9 L1 1Z M-10 0 L-13 -4 L-9 -1Z" fill="#3B82F6" stroke="${L}" stroke-width="0.6"/></g>`;
const KANGAROO = `<g class="e024-roo"><path d="M-8 0 Q-12 -10 -4 -16 Q2 -20 4 -26 L8 -26 Q8 -18 4 -12 Q10 -6 6 0Z" fill="#C2410C" stroke="${L}" stroke-width="0.7"/>
  <path d="M-8 -2 Q-20 0 -22 6" stroke="#C2410C" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M5 -26 l1 -6 l2 6" fill="#C2410C" stroke="${L}" stroke-width="0.6"/><circle cx="6" cy="-23" r="0.9" fill="#1F2937"/></g>`;
/** Chó "chưa có": hình chó nét đứt. */
const GHOST_DOG = `<g fill="none" stroke="#94A3B8" stroke-width="2" stroke-dasharray="4 3"><path d="M-26 0 V-26 Q-26 -40 -6 -40 H14 L18 -54 Q30 -58 34 -46 Q36 -36 26 -34 V0"/><path d="M-26 -30 Q-38 -36 -36 -48"/></g>`;

/** Bản đồ thế giới nhỏ (góc trên trái x, y): Việt Nam (sao Hà Nội) và nước Úc (sáng lên khi st-aus). */
const worldMap = (x, y) => `<g transform="translate(${x} ${y})">
  <rect x="-6" y="-6" width="192" height="122" rx="4" fill="#A16207" stroke="${L}"/><rect x="0" y="0" width="180" height="110" fill="#7DD3FC"/>
  <path d="M8 14 Q30 6 58 12 Q76 22 70 40 Q52 48 40 40 Q22 44 10 32Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <path d="M78 8 Q110 2 150 10 Q170 20 160 34 Q130 40 112 36 Q96 42 84 30Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <path d="M96 34 q4 6 2 14 q-3 6 2 12 q4 4 0 8" stroke="${L}" stroke-width="0.8" fill="#FDE68A" class="e024-vn"/>
  <path d="M101 36 l2 5 h5 l-4 3 l2 5 l-5 -3 l-5 3 l2 -5 l-4 -3 h5Z" fill="#DC2626" class="e024-hn" transform="translate(0 0) scale(0.8) translate(25 9)"/>
  <g class="e024-aus"><path d="M112 70 Q130 60 150 66 Q168 70 166 86 Q160 100 144 98 Q132 104 122 96 Q108 92 110 80Z" fill="#FDE68A" stroke="${L}" stroke-width="1"/></g>
  <g transform="translate(140 90) scale(0.7)">${KANGAROO}</g>
  <circle class="e024-syd" cx="160" cy="92" r="2.6" fill="#DC2626"/>
  <path class="e024-route" d="M150 78 Q140 50 103 42" stroke="#DC2626" stroke-width="1.6" fill="none" stroke-dasharray="3 3"/>
  </g>`;

const LB = [['new', 300, 140, 'new', '#DC2626', 18], ['aus', 262, 140, 'Australia', '#C2410C', 16], ['hanoi', 262, 140, 'Hanoi', '#DC2626', 16],
  ['little', 300, 140, 'a little', '#16A34A', 16], ['sun', 690, 120, 'SUNDAY', '#DC2626', 16], ['q', 780, 128, '? ? ?', '#7C3AED', 18],
  ['player', 1300, 120, 'good player!', '#16A34A', 18], ['pet', 1130, 132, 'pet?', '#7C3AED', 18], ['syd', 1200, 110, 'Sydney', '#0369A1', 16],
  ['vn', 1420, 132, 'Vietnam', '#DC2626', 18]];

function bg() {
  return `
  ${sky(960, 740, 315, 'e024sky')}
  ${cloud(1060, 56, 0.9, 0)}${cloud(1560, 40, 0.8, 4)}
  ${grass(960, 740, FLOOR)}
  ${tree(1020, FLOOR - 8, 1.1)}${tree(1640, FLOOR - 8, 0.9, '#F59E0B')}
  ${fence(1560, 140, FLOOR)}
  <!-- Cột cờ -->
  <path d="M1480 ${FLOOR - 4} V40" stroke="#94A3B8" stroke-width="4"/><circle cx="1480" cy="40" r="4" fill="#FACC15" stroke="${L}"/>
  <g class="e024-flag" style="transform-origin:1482px 56px"><rect x="1482" y="44" width="52" height="34" fill="#DA251D" stroke="${L}" stroke-width="0.8"/>
    <path d="M1508 50 l3.6 10 h10.4 l-8.4 6.2 l3.2 10 l-8.8 -6.2 l-8.8 6.2 l3.2 -10 l-8.4 -6.2 h10.4Z" fill="#FFFF00" transform="translate(1508 61) scale(0.62) translate(-1508 -61)"/></g>
  <!-- Mây nghĩ: Sydney -->
  <g class="e024-think"><g transform="translate(1310 96)">
    <ellipse rx="74" ry="44" fill="#fff" stroke="${L}" stroke-width="1.2"/><circle cx="-34" cy="58" r="7" fill="#fff" stroke="${L}"/><circle cx="-24" cy="72" r="4" fill="#fff" stroke="${L}"/>
    <rect x="-56" y="8" width="112" height="16" rx="6" fill="#38BDF8"/>
    <path d="M-34 10 Q-30 -22 -6 -26 Q-12 -6 -10 10Z M-14 10 Q-8 -30 18 -30 Q8 -8 10 10Z M6 10 Q14 -18 34 -18 Q26 -2 28 10Z" fill="#F8FAFC" stroke="${L}" stroke-width="1"/>
    <rect x="-40" y="8" width="76" height="5" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/>
    <path d="M36 2 Q50 -26 64 2" stroke="#64748B" stroke-width="2.6" fill="none"/></g></g>
  <!-- Lớp học -->
  ${room(0, 560, FLOOR, '#FEF9C3')}
  ${worldMap(22, 58)}
  ${board(330, 66, 190, 84, '')}
  <text class="e024-name" x="425" y="120" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="30" fill="#F8FAFC">Tom</text>
  <text x="425" y="88" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="13" fill="#BBF7D0">Welcome!</text>
  <g transform="translate(262 84)"><circle r="16" fill="#fff" stroke="#3B82F6" stroke-width="3"/><path d="M0 0 V-10 M0 0 H7" stroke="${L}" stroke-width="2" stroke-linecap="round"/></g>
  ${rug(250, FLOOR, 240, '#93C5FD')}
  <!-- Căng tin -->
  ${room(560, 400, FLOOR, '#FFEDD5')}
  <rect x="790" y="40" width="96" height="30" rx="5" fill="#DC2626" stroke="${L}" stroke-width="1.2"/><text x="838" y="62" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="18" fill="#FEF3C7">PHO</text>
  <g transform="translate(600 120)"><rect x="-20" y="-28" width="40" height="56" rx="3" fill="#fff" stroke="${L}"/><rect x="-20" y="-28" width="40" height="12" rx="3" fill="#EF4444" stroke="${L}"/>
    <text y="-19" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="7" fill="#fff">CALENDAR</text><g class="e024-sunday"><rect x="-17" y="-14" width="34" height="38" fill="#FEF3C7"/><text y="10" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="9" fill="#DC2626">SUN</text></g></g>
  ${doorway(560, FLOOR)}
  <rect x="954" y="0" width="12" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  ${LB.map(([k, x, y, t, c, s]) => `<g class="e024-lb e024-lb-${k}">${label(x, y, t, c, s)}</g>`).join('')}`;
}

function fg() {
  return `
  <!-- Quầy phở -->
  <rect x="820" y="206" width="130" height="76" fill="#F59E0B" stroke="${L}" stroke-width="1.2"/><rect x="814" y="200" width="142" height="9" rx="3" fill="#F5F5F4" stroke="${L}"/>
  <path d="M836 230 h100" stroke="#B45309" stroke-width="2"/>
  <g transform="translate(872 186)"><path d="M-22 -10 H22 V12 Q22 16 18 16 H-18 Q-22 16 -22 12Z" fill="#94A3B8" stroke="${L}"/><ellipse cx="0" cy="-10" rx="22" ry="4.4" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/><path d="M-28 -4 H-22 M22 -4 H28" stroke="${L}" stroke-width="3" stroke-linecap="round"/></g>
  ${steam(872, 170, '')}
  <!-- Bàn ăn căng tin -->
  <rect x="616" y="232" width="146" height="9" rx="3" fill="#0EA5E9" stroke="${L}" stroke-width="1.2"/><rect x="628" y="241" width="9" height="41" fill="#0369A1" stroke="${L}"/><rect x="742" y="241" width="9" height="41" fill="#0369A1" stroke="${L}"/>
  <g class="e024-bowl"><g transform="translate(690 228)">${BOWL}</g>${steam(690, 218, '')}</g>
  <!-- Khung thành -->
  <g transform="translate(1380 0)"><path d="M0 200 L34 210 V282 L0 282Z" fill="#fff" opacity="0.25"/>
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M0 ${200 + i * 12} L34 ${210 + i * 10.3}" stroke="#E2E8F0" stroke-width="1"/>`).join('')}
    <path d="M0 282 V200 L34 210 V282" stroke="#fff" stroke-width="4" fill="none" stroke-linejoin="round"/><path d="M0 282 V200 L34 210 V282" stroke="${L}" stroke-width="0.8" fill="none"/></g>
  <g transform="translate(1356 282)"><g class="e024-ghost">${GHOST_DOG}</g></g>`;
}

const CSS = `
.e024-lb { opacity: 0; transition: opacity .3s; }
${LB.map(([k]) => `.st-lb-${k} .e024-lb-${k}`).join(', ')} { opacity: 1; }
.e024-name { opacity: 0; transition: opacity .5s; } .st-name .e024-name { opacity: 1; }
.e024-aus path { transition: fill .4s; } .st-aus .e024-aus path { fill: #FB923C; animation: e024Pulse .6s ease-in-out infinite alternate; }
.e024-aus { transform-origin: 140px 82px; }
@keyframes e024Pulse { to { opacity: .6; } }
.e024-roo { animation: e024Hop .5s ease-in-out infinite alternate; }
@keyframes e024Hop { to { transform: translateY(-5px); } }
.e024-route { opacity: 0; transition: opacity .4s; } .st-route .e024-route { opacity: 1; }
.e024-hn { transform-box: fill-box; transform-origin: center; } .st-hanoi .e024-hn { animation: e024Star .5s ease-in-out infinite alternate; }
@keyframes e024Star { to { transform: scale(1.6); } }
.e024-sunday { opacity: 0; transition: opacity .3s; } .st-sun .e024-sunday { opacity: 1; }
.e024-bowl { opacity: 0; transition: opacity .3s; } .st-bowl .e024-bowl { opacity: 1; }
.e024-ghost { opacity: 0; transition: opacity .4s; } .st-ghost .e024-ghost { opacity: 1; }
.e024-think { opacity: 0; transform: scale(.6); transform-origin: 1290px 160px; transition: opacity .4s, transform .5s cubic-bezier(.3,1.5,.6,1); }
.st-think .e024-think { opacity: 1; transform: none; }
.e024-flag { animation: e024Wave 1.2s ease-in-out infinite alternate; }
@keyframes e024Wave { from { transform: skewY(-3deg); } to { transform: skewY(3deg); } }
.st-vn .e024-flag { animation-duration: .5s; }
.es-thing.is-walk .e024-roll { animation: e024Spin .35s linear infinite; }
@keyframes e024Spin { to { transform: rotate(360deg); } }
.es-ac.act-e024-kick .pp-legwR { animation: e024Kick .42s ease-in-out infinite alternate; }
@keyframes e024Kick { from { transform: rotate(0); } to { transform: rotate(-52deg); } }
@media (prefers-reduced-motion: reduce) { .e024-roo, .e024-flag { animation-duration: 3s; } }
`;

const POSES = { e024_kick: { R: [-20, -30], L: [40, 60] }, e024_pinch: { R: [70, 130], L: [10, 4] } };

function lb(st, k) { LB.forEach(([n]) => st.set(`st-lb-${n}`, n === k)); }
/** Một câu thoại: người nói nhép miệng + bong bóng ngắn. */
const talk = (st, id, text, ms = 1500) => st.say(id, text, ms);

const BEATS = [
  { key: ['new boy'], icon: '🧒', label: 'new boy', async play(st) {
    st.look(300);
    st.show('tom', true);
    st.walk('hoa', 470, { speed: 120, follow: false });
    await st.walk('tom', 300, { speed: 120, follow: false });
    lb(st, 'new'); st.mood('minh', 'wow');
    await st.wait(600);
    st.mood('minh', 'happy');
  } },
  { key: ['His name is Tom'], icon: '📛', label: 'Tom', async play(st) {
    st.look(330);
    st.set('st-name'); st.sfx('sparkle');
    st.pose('hoa', 'pointUp'); st.act('hoa', 'point');
    st.pose('tom', 'wave'); st.act('tom', 'wave'); st.mood('tom', 'joy');
    await st.wait(1600);
    st.act('hoa', null); st.pose('hoa', 'stand'); st.act('tom', null); st.pose('tom', 'stand'); st.mood('tom', 'happy');
  } },
  { key: ['Where are you from'], icon: '❓', label: 'Where from?', async play(st) {
    st.look(240); lb(st, null);
    st.pose('minh', 'point');
    await talk(st, 'minh', 'Where are you from?', 1700);
    st.pose('minh', 'stand');
  } },
  { key: ['from Australia'], icon: '🦘', label: 'Australia', async play(st) {
    st.look(200);
    st.pose('tom', 'pointUp'); st.mood('tom', 'joy');
    st.set('st-aus'); lb(st, 'aus');
    await talk(st, 'tom', 'Australia!', 1700);
    st.pose('tom', 'stand'); st.mood('tom', 'happy');
  } },
  { key: ['live in Hanoi'], icon: '✈️', label: 'Hanoi', async play(st) {
    st.look(200);
    st.set('st-aus', false); st.set('st-route'); lb(st, null);
    st.pose('tom', 'pointUp');
    await st.fly(PLANE, [172, 118], [127, 82], { size: 24, dur: 1300 });
    st.set('st-hanoi'); lb(st, 'hanoi');
    await st.wait(900);
    st.pose('tom', 'stand');
  } },
  { key: ['speak Vietnamese'], icon: '🗣️', label: 'speak Vietnamese?', async play(st) {
    st.look(240);
    st.set('st-hanoi', false); st.set('st-route', false); lb(st, null);
    await talk(st, 'minh', 'Vietnamese?', 1600);
  } },
  { key: ['Yes, I do'], icon: '👍', label: 'Yes, I do', async play(st) {
    st.act('tom', 'nod'); st.mood('tom', 'joy');
    await talk(st, 'tom', 'Yes, I do.', 1400);
    st.act('tom', null);
  } },
  { key: ['a little Vietnamese'], icon: '🤏', label: 'a little', async play(st) {
    st.pose('tom', 'e024_pinch'); lb(st, 'little');
    await talk(st, 'tom', 'Xin chào!', 1600);
    st.mood('minh', 'joy');
    await st.wait(400);
    st.pose('tom', 'stand'); st.mood('tom', 'happy'); st.mood('minh', 'happy');
  } },
  { key: ['like pho'], icon: '🍜', label: 'like pho?', async play(st) {
    lb(st, null);
    await Promise.all([
      st.walk('minh', 612, { speed: 170, lead: 80 }),
      (async () => { await st.wait(250); await st.walk('tom', 690, { speed: 170, follow: false }); })(),
    ]);
    st.pose('minh', 'point');
    await talk(st, 'minh', 'Pho?', 1300);
    st.pose('minh', 'stand');
  } },
  { key: ['Yes, I do'], icon: '😋', label: 'Yes!', async play(st) {
    st.look(740);
    st.pose('tom', 'cheer'); st.act('tom', 'jump'); st.mood('tom', 'joy');
    await talk(st, 'tom', 'Yes, I do!', 1400);
    st.act('tom', null); st.pose('tom', 'stand');
  } },
  { key: ['every Sunday'], icon: '📅', label: 'every Sunday', async play(st) {
    st.look(740);
    st.pose('cook', 'give');
    await st.fly(BOWL, [872, 184], [690, 228], { dur: 650 });
    st.set('st-bowl'); st.sfx('bowl-down'); st.pose('cook', 'stand');
    st.pose('tom', 'sit');
    await st.wait(300);
    st.set('st-sun'); lb(st, 'sun');
    st.hold('tom', 'chopsticks'); st.pose('tom', 'eat'); st.act('tom', 'eat'); st.sfx('slurp');
    await st.wait(1700);
    st.act('tom', null); st.hold('tom', null); st.pose('tom', 'sit'); st.mood('tom', 'joy');
  } },
  { key: ['Lan comes'], icon: '👧', label: 'Lan comes', async play(st) {
    lb(st, null); st.mood('tom', 'happy');
    st.look(760);
    st.show('lan', true);
    await st.walk('lan', 780, { speed: 140, follow: false });
    st.pose('lan', 'wave'); st.act('lan', 'wave');
    await st.wait(700);
    st.act('lan', null); st.pose('lan', 'stand');
  } },
  { key: ['some questions'], icon: '❔', label: 'questions', async play(st) {
    st.look(780);
    st.pose('lan', 'think'); lb(st, 'q');
    await st.wait(1800);
    st.pose('lan', 'stand');
  } },
  { key: ['play football'], icon: '⚽', label: 'football?', async play(st) {
    st.look(780); lb(st, null);
    st.hold('lan', 'ball'); st.pose('lan', 'give');
    await talk(st, 'lan', 'Football?', 1500);
  } },
  { key: ['Yes, he does'], icon: '👍', label: 'Yes, he does', async play(st) {
    st.act('minh', 'nod'); st.mood('minh', 'joy');
    await talk(st, 'minh', 'Yes, he does.', 1400);
    st.act('minh', null); st.mood('minh', 'happy');
  } },
  { key: ['good player'], icon: '🥅', label: 'good player', async play(st) {
    st.hold('lan', null); st.pose('lan', 'stand'); st.set('st-bowl', false);
    st.a('ball').x = 724; st.a('ball').place(); st.show('ball', true);
    st.pose('tom', 'stand');
    await Promise.all([
      st.walk('ball', 1330, { speed: 250, follow: false }),
      st.walk('tom', 1296, { speed: 250, lead: 0 }),
      (async () => { await st.wait(400); await st.walk('lan', 1110, { speed: 200, follow: false }); })(),
      (async () => { await st.wait(600); await st.walk('minh', 1180, { speed: 200, follow: false }); })(),
    ]);
    st.pose('tom', 'e024_kick'); st.act('tom', 'e024-kick');
    await st.wait(260);
    st.act('tom', null);
    await st.walk('ball', 1396, { speed: 420, follow: false });
    lb(st, 'player'); st.pose('tom', 'cheer'); st.act('tom', 'jump'); st.mood('tom', 'joy');
    st.pose('lan', 'clap'); st.act('lan', 'clap');
    await st.wait(1200);
    st.act('tom', null); st.act('lan', null); st.pose('tom', 'stand'); st.pose('lan', 'stand');
  } },
  { key: ['have a pet'], icon: '🐾', label: 'a pet?', async play(st) {
    st.look(1240); lb(st, 'pet');
    st.pose('lan', 'think');
    await talk(st, 'lan', 'A pet?', 1500);
    st.pose('lan', 'stand');
  } },
  { key: ["No, he doesn't"], icon: '🚫', label: "No, he doesn't", async play(st) {
    st.look(1240); lb(st, null);
    st.set('st-ghost'); st.act('minh', 'no');
    await talk(st, 'minh', "No, he doesn't.", 1500);
    st.act('minh', null);
  } },
  { key: ['wants a dog like Lucky'], icon: '🐶', label: 'a dog', async play(st) {
    st.look(1320);
    st.show('lucky', true); st.mood('lucky', 'joy');
    st.sfx('dog-bark', { vol: 0.7 });
    await st.walk('lucky', 1360, { speed: 220, follow: false });
    st.set('st-ghost', false);
    st.act('lucky', 'jump'); st.mood('tom', 'joy'); st.pose('tom', 'open');
    st.fx('hearts', 1330, 150);
    await st.wait(1500);
    st.act('lucky', 'wag'); st.pose('tom', 'stand');
  } },
  { key: ['Where is his family from'], icon: '👨‍👩‍👦', label: 'family?', async play(st) {
    st.look(1240);
    st.pose('lan', 'think');
    await talk(st, 'lan', 'His family?', 1500);
    st.pose('lan', 'stand');
  } },
  { key: ['from Sydney'], icon: '🏙️', label: 'Sydney', async play(st) {
    st.look(1280);
    st.set('st-think'); lb(st, 'syd');
    st.pose('minh', 'point');
    await talk(st, 'minh', 'Sydney!', 1500);
    st.pose('minh', 'stand');
    await st.wait(300);
  } },
  { key: ['Tom loves Vietnam'], icon: '🇻🇳', label: 'loves Vietnam', async play(st) {
    st.look(1340);
    st.set('st-think', false); lb(st, 'vn'); st.set('st-vn');
    st.pose('tom', 'cheer'); st.act('tom', 'jump'); st.mood('tom', 'joy');
    st.pose('minh', 'cheer'); st.act('minh', 'hop'); st.pose('lan', 'cheer'); st.act('lan', 'hop');
    st.act('lucky', 'jump');
    st.fx('hearts', 1300, 140);
    await st.wait(800);
    st.fx('hearts', 1480, 90);
    await st.wait(1200);
    for (const id of ['tom', 'minh', 'lan', 'lucky']) st.act(id, null);
  } },
];

export default {
  id: 'en024', worldW: 1700, floor: FLOOR, viewTop: 40, camStart: 60, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  cast: [
    { id: 'cook', kind: 'adult', who: 'e024_cook', x: 904, s: 0.92, face: -1 },
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 600, s: 0.95, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 170 },
    { id: 'ball', kind: 'thing', x: 900, svg: BALL_T, box: [-10, -19, 20, 20] },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 640, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 1150, face: -1, s: 1.04 },
    { id: 'lucky', kind: 'dog', x: 1720, s: 0.9, face: -1 },
  ],
  init(st) {
    st.show('tom', false); st.show('lan', false); st.show('ball', false); st.show('lucky', false);
  },
};
