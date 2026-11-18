/**
 * Bài 125 "The Boy Outside the Classroom" (quá khứ tiếp diễn; while / when). Một thế giới đi từ trái sang phải, cả cảnh
 * nhuộm màu ảnh cũ: túp lều nhà Hiền (mẹ đứng trước lều) → đường làng (bạn ôm sách đi học) → lớp học của thầy đồ (cắt ngang
 * thấy bên trong: bảng gỗ, chiếu, bàn thấp; tường phải có ô cửa sổ chấn song, Hiền đứng ngoài nghe, lấy que viết xuống
 * đất) → sân thi của vua (bảng vàng "KING'S EXAM 1247", trống, các sĩ tử) nơi Hiền đỗ đầu, đội mũ trạng nguyên.
 * Chữ Hiền viết trên đất là nét bút lông (không phải chữ thật), câu hỏi khó là dấu "?" trên bảng, câu trả lời đúng là dấu ✓.
 * Toạ độ cảnh: rộng 2700, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, speaker, thought } from '../kit.js';
import { karst, bamboo, drum, flag } from './vietsu-art.js';

const FLOOR = 282;
const W = 2700;
const X = { hut: 150, sch0: 680, sch1: 1060, win: 1060, board: 1980 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e125_hien: { hair: 'bowl', top: 'tee', shirt: '#8B5E3C', bottom: 'shorts', bottomC: '#57534E', shoe: '#78716C' },
  e125_tn: { hair: 'bowl', top: 'tee', shirt: '#B91C1C', bottom: 'pants', bottomC: '#7F1D1D', shoe: '#1C1917', hat: 'mandarin' },
  e125_mum: { adult: true, hair: 'bun', top: 'blouse', shirt: '#A47551', bottom: 'pants', bottomC: '#292524', shoe: '#57534E' },
  e125_teacher: { adult: true, old: true, hair: 'short', hairC: '#E7E5E4', top: 'robe', shirt: '#334155', trimC: '#334155', bottom: 'pants', bottomC: '#1F2937', shoe: '#1C1917', hat: 'skullcap', trim: ['#1F2937'], beard: true, moustache: true },
  e125_k1: { hair: 'neat', top: 'tee', shirt: '#1D4ED8', bottom: 'pants', bottomC: '#1E293B', shoe: '#44403C' },
  e125_k2: { hair: 'bowl', top: 'tee', shirt: '#0F766E', bottom: 'pants', bottomC: '#1E293B', shoe: '#44403C' },
  e125_k3: { hair: 'spiky', top: 'tee', shirt: '#7C3AED', bottom: 'pants', bottomC: '#1E293B', shoe: '#44403C' },
  e125_c1: { adult: true, hair: 'short', top: 'robe', shirt: '#1E40AF', trimC: '#1E40AF', bottom: 'pants', bottomC: '#1E293B', shoe: '#1C1917', hat: 'skullcap', trim: ['#1F2937'], moustache: true },
  e125_c2: { adult: true, hair: 'short', top: 'robe', shirt: '#0F766E', trimC: '#0F766E', bottom: 'pants', bottomC: '#1E293B', shoe: '#1C1917', hat: 'skullcap', trim: ['#1F2937'], beard: true },
  e125_guard: { adult: true, hair: 'short', top: 'blouse', shirt: '#B91C1C', bottom: 'pants', bottomC: '#1C1917', shoe: '#44403C', hat: 'scarf', trim: ['#FACC15', '#B91C1C', '#FDE68A'] },
});

const PROPS = {
  e125_stick: `<g><path d="M0 -4 V30" stroke="${L}" stroke-width="2.8" stroke-linecap="round"/><path d="M0 -4 V30" stroke="#A16207" stroke-width="1.4"/></g>`,
  e125_book: `<g transform="translate(0 -6)"><rect x="-9" y="-7" width="18" height="14" rx="1.5" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/><path d="M0 -7 V7" stroke="${L}" stroke-width="0.7"/></g>`,
};
const POSES = {
  e125_write: { R: [40, 20], L: [30, -40], dy: 30, head: 14 },
  e125_listen: { R: [140, 240], L: [10, 4], head: -8 },
  e125_ask: { R: [110, 140], L: [24, -60] },
  e125_shrug: { R: [50, 130], L: [50, 130], dy: 20, head: -5 },
  e125_sitThink: { R: [30, -150], L: [22, -40], dy: 20, head: 8 },
  e125_hand: { R: [160, 178], L: [10, 4], head: -4 },
  e125_come: { R: [70, 150], L: [10, 4] },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const hut = (x) => `<g transform="translate(${x} ${FLOOR})"><rect x="-60" y="-66" width="120" height="66" fill="#C8A27A" stroke="${L}" stroke-width="1.1"/>
  ${Array.from({ length: 8 }, (_, i) => `<path d="M${-54 + i * 15} -64 V-2" stroke="#A47E58" stroke-width="1" opacity="0.7"/>`).join('')}
  <rect x="-16" y="-46" width="30" height="46" fill="#5B3A1E" stroke="${L}"/>
  <path d="M-80 -60 Q-64 -104 0 -122 Q64 -104 80 -60 Q0 -70 -80 -60Z" fill="#C08A3E" stroke="${L}" stroke-width="1.2"/>
  ${Array.from({ length: 8 }, (_, i) => `<path d="M${-66 + i * 19} -62 L${-32 + i * 9} -110" stroke="#A16207" stroke-width="1" opacity="0.6"/>`).join('')}
  <path d="M-38 -104 l6 6 M22 -110 l7 4" stroke="#7C5A3A" stroke-width="2"/></g>`;

function bg() {
  const a = X.sch0, b = X.sch1;
  return `
  ${sky(0, W, 315, 'e125sky')}
  ${cloud(240, 60, 0.8, 0)}${cloud(900, 46, 0.9, 2)}${cloud(1500, 62, 0.8, 4)}${cloud(2200, 50, 0.9, 1)}
  ${karst(-20, 600, FLOOR - 40)}${karst(1300, 1400, FLOOR - 50, '#A5B8A0', '#B9CBB2')}
  <rect x="0" y="${FLOOR}" width="${W}" height="33" fill="#C9A86B" stroke="${L}"/>
  ${bamboo(40, FLOOR, 0.8)}${hut(X.hut)}${tree(330, FLOOR, 0.85, '')}${bamboo(470, FLOOR, 0.7)}
  <!-- lớp học (cắt ngang) -->
  <rect x="${a}" y="120" width="${b - a}" height="${FLOOR - 120}" fill="#FDF2D6" stroke="${L}"/>
  ${Array.from({ length: Math.floor((b - a - 40) / 56) + 1 }, (_, i) => `<path d="M${a + 30 + i * 56} 124 V${FLOOR}" stroke="#E9D5B5" stroke-width="2"/>`).join('')}
  <rect x="${a + 40}" y="${FLOOR - 6}" width="${b - a - 80}" height="8" fill="#D6A35C" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(${a + 60} 0)"><rect x="-40" y="136" width="80" height="60" fill="#3F2A1A" stroke="#A16207" stroke-width="4"/>
    <g class="e125-q"><text x="0" y="178" text-anchor="middle" ${NUN} font-size="34" fill="#FDE68A">?</text></g>
    <g class="e125-strokes"><path d="M-24 152 h20 M-14 146 v26 M6 150 l12 0 M12 150 l-6 20 M10 160 l12 8" stroke="#F8FAFC" stroke-width="2.6" stroke-linecap="round" fill="none"/></g></g>
  <rect x="${a - 10}" y="120" width="16" height="${FLOOR - 120}" fill="#92400E" stroke="${L}"/>
  <rect x="${b - 14}" y="120" width="28" height="${FLOOR - 120}" fill="#B7791F" stroke="${L}"/>
  <g transform="translate(${X.win} 0)"><rect x="-14" y="150" width="28" height="56" fill="#FDF2D6" stroke="${L}"/>${[-7, 0, 7].map((dx) => `<path d="M${dx} 150 V206" stroke="#92400E" stroke-width="2.4"/>`).join('')}</g>
  <path d="M${a - 40} 126 L${a + 30} 70 H${b - 30} L${b + 40} 126Z" fill="#B45309" stroke="${L}" stroke-width="1.3"/>
  ${Array.from({ length: Math.floor((b - a + 40) / 56) }, (_, i) => `<path d="M${a - 20 + i * 56} 122 L${a + 40 + i * 50} 74" stroke="#92400E" stroke-width="1.2" opacity="0.6"/>`).join('')}
  <path d="M${a + 30} 70 Q${a + 16} 56 ${a + 4} 60 M${b - 30} 70 Q${b - 16} 56 ${b - 4} 60" stroke="${L}" stroke-width="2.6" fill="none"/>
  ${tree(1360, FLOOR, 0.85, '')}${bamboo(1440, FLOOR, 0.75)}
  <!-- sân thi của vua -->
  <g transform="translate(2420 ${FLOOR})"><rect x="-130" y="-170" width="260" height="170" fill="#FEF3C7" stroke="${L}" stroke-width="1.2"/>
    ${[-100, -40, 40, 100].map((dx) => `<rect x="${dx - 8}" y="-170" width="16" height="170" fill="#B91C1C" stroke="${L}"/>`).join('')}
    <path d="M-154 -166 L-122 -204 H122 L154 -166Z" fill="#9A3412" stroke="${L}" stroke-width="1.3"/><path d="M-122 -204 Q-136 -222 -148 -214 M122 -204 Q136 -222 148 -214" stroke="${L}" stroke-width="3" fill="none"/>
    <rect x="-34" y="-150" width="68" height="22" rx="3" fill="#B91C1C" stroke="${L}"/><text y="-134" text-anchor="middle" ${NUN} font-size="12" fill="#FDE68A">PALACE</text></g>
  ${drum(2200, FLOOR, 0.9, 'e125')}
  ${flag(1700, FLOOR, 150, '#DC2626', 'e125')}
  <!-- bảng vàng -->
  <g transform="translate(${X.board} 0)"><path d="M-88 ${FLOOR} V100 M88 ${FLOOR} V100" stroke="#78350F" stroke-width="6"/>
    <rect x="-100" y="70" width="200" height="140" rx="4" fill="#FACC15" stroke="${L}" stroke-width="1.4"/>
    <rect x="-100" y="70" width="200" height="26" rx="4" fill="#B91C1C" stroke="${L}"/><text y="88" text-anchor="middle" ${NUN} font-size="13" fill="#FDE68A">KING'S EXAM 1247</text>
    <g class="e125-first"><rect x="-90" y="102" width="180" height="26" rx="3" fill="#fff" stroke="#B91C1C" stroke-width="1.6"/>
      <text x="-80" y="120" ${NUN} font-size="13" fill="#B91C1C">1st</text><text x="-44" y="120" ${NUN} font-size="14" fill="#B91C1C">Nguyen Hien</text></g>
    ${[142, 162, 182, 200].map((y) => `<path d="M-80 ${y} H${40 + (y % 3) * 10}" stroke="#A16207" stroke-width="5" stroke-linecap="round" opacity="0.55"/>`).join('')}</g>
  <!-- màu ảnh cũ -->
  <rect class="e125-tint" x="0" y="0" width="${W}" height="315" fill="#B45309"/>`;
}

function fg() {
  const BOOK = `<rect x="-30" y="-20" width="60" height="40" rx="3" fill="#FEF3C7" stroke="${L}"/><path d="M0 -20 V20" stroke="${L}"/>
    <path d="M-24 -10 h18 M-24 -2 h16 M-24 6 h18 M6 -10 h18 M6 -2 h14 M6 6 h18" stroke="#A16207" stroke-width="2"/>
    <path d="M30 -24 q4 -6 8 0 q4 -6 8 0 q0 6 -8 12 q-8 -6 -8 -12Z" fill="#F43F5E" stroke="${L}" stroke-width="0.7"/>`;
  const LB = [
    ['ago', 250, 54, '800 years ago', '#9A3412', 16], ['poor', 160, 104, 'very poor', '#78716C', 15], ['noschool', 330, 54, 'could not go to school', '#475569', 15],
    ['love', 300, 50, 'he loved learning', '#DB2777', 16], ['every', 900, 50, 'Every day', '#EA580C', 16], ['inside', 900, 304, 'studying inside', '#1D4ED8', 14],
    ['window', 1030, 110, 'at the window', '#B45309', 14], ['listen', 930, 50, 'listening carefully', '#0F766E', 15], ['nopaper', 1130, 54, 'no paper', '#78716C', 15],
    ['stick', 1190, 270, 'with a stick', '#92400E', 13], ['oneday', 860, 50, 'One day', '#EA580C', 16], ['hard', 930, 50, 'a difficult question', '#7C3AED', 15],
    ['nobody', 930, 50, 'Nobody', '#475569', 17], ['right', 930, 50, 'the right answer', '#16A34A', 16], ['surp', 870, 50, 'very surprised', '#EA580C', 16],
    ['inclass', 930, 50, 'study in the class', '#1D4ED8', 15], ['y1247', 1900, 50, 'In 1247', '#B91C1C', 18], ['age', 2100, 50, 'only 12 or 13', '#B45309', 15],
    ['firstx', 2014, 236, "first in the king's exam", '#B91C1C', 14], ['young', 2060, 50, 'the youngest trang nguyen', '#B91C1C', 15],
  ];
  return `
  ${bush(30, FLOOR + 26, 0.6, '#65A30D')}${bush(1520, FLOOR + 28, 0.7, '#65A30D')}
  <!-- bàn thấp trong lớp (che chân người ngồi) -->
  ${[840, 900, 960].map((x) => `<g transform="translate(${x + 14} 0)"><rect x="-26" y="${FLOOR - 32}" width="52" height="7" rx="2" fill="#92400E" stroke="${L}"/><rect x="-22" y="${FLOOR - 25}" width="6" height="25" fill="#78350F" stroke="${L}" stroke-width="0.7"/><rect x="16" y="${FLOOR - 25}" width="6" height="25" fill="#78350F" stroke="${L}" stroke-width="0.7"/>
    <rect x="-16" y="${FLOOR - 38}" width="20" height="6" rx="1" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/></g>`).join('')}
  <!-- nét chữ trên đất -->
  <g class="e125-ground"><path d="M1130 296 h16 M1138 290 v16 M1156 292 l10 0 M1160 292 l-5 14 M1158 300 l10 6 M1180 290 v16 M1174 296 h14 M1176 304 h10" stroke="#5B3A1E" stroke-width="2.2" stroke-linecap="round" fill="none"/></g>
  <!-- tiếng thầy giảng (sóng âm) -->
  <g class="e125-wave">${[0, 1, 2].map((i) => `<path class="e125-wv" style="animation-delay:${i * 0.35}s" d="M${880 + i * 50} 120 q8 10 0 20" stroke="#0F766E" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <g class="e125-dots">${[856, 916, 976].map((x) => `<g transform="translate(${x} 150)"><circle r="10" fill="#fff" stroke="${L}"/><text y="5" text-anchor="middle" ${NUN} font-size="14" fill="#7C3AED">?</text></g>`).join('')}</g>
  <g class="e125-ok"><g transform="translate(1086 112)"><circle r="16" fill="#fff" stroke="#16A34A" stroke-width="2.4"/><path d="M-7 0 l5 6 l10 -12" stroke="#16A34A" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>
  ${thought(300, 110, 120, 86, BOOK, [372, 160], 'e125-think')}
  <g class="e125-nm">${speaker(320, 140, 'Nguyen Hien', '#9A3412')}</g>
  ${LB.map(([k, x, y, t, c, s]) => `<g class="e125-lb e125-lb-${k}">${label(x, y, t, c, s)}</g>`).join('')}`;
}

const CSS = `
.e125-lb, .e125-nm { opacity: 0; transition: opacity .35s; }
${['ago', 'poor', 'noschool', 'love', 'every', 'inside', 'window', 'listen', 'nopaper', 'stick', 'oneday', 'hard', 'nobody', 'right', 'surp', 'inclass', 'y1247', 'age', 'firstx', 'young'].map((k) => `.st-lb-${k} .e125-lb-${k}`).join(', ')} { opacity: 1; }
.st-nm .e125-nm { opacity: 1; }
.e125-tint { opacity: .18; pointer-events: none; }
.e125-think { opacity: 0; transform: scale(.4); transform-origin: 360px 150px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-think .e125-think { opacity: 1; transform: none; }
.e125-ground { clip-path: inset(0 100% 0 0); }
.st-write .e125-ground { clip-path: inset(0 0 0 0); transition: clip-path 2.2s linear .3s; }
.e125-wave { opacity: 0; transition: opacity .3s; }
.st-wave .e125-wave { opacity: 1; }
.e125-wv { animation: e125Wv 1s ease-out infinite; opacity: 0; }
@keyframes e125Wv { 0% { opacity: 0; transform: translateX(0); } 30% { opacity: 1; } 100% { opacity: 0; transform: translateX(26px); } }
.e125-q, .e125-dots, .e125-ok { opacity: 0; transition: opacity .3s; }
.e125-strokes { transition: opacity .3s; }
.st-q .e125-q { opacity: 1; } .st-q .e125-strokes { opacity: 0; }
.st-dots .e125-dots { opacity: 1; }
.e125-ok { transform-box: fill-box; transform-origin: 50% 50%; transform: scale(.3); transition: opacity .2s, transform .4s cubic-bezier(.3,1.6,.6,1); }
.st-ok .e125-ok { opacity: 1; transform: none; }
.e125-first { transform-box: fill-box; transform-origin: 50% 50%; }
.st-first .e125-first { animation: e125Pulse .35s ease-in-out 4 alternate; }
@keyframes e125Pulse { to { transform: scale(1.12); } }
.e125-flag { animation: e125Flag 1.3s ease-in-out infinite alternate; }
@keyframes e125Flag { from { transform: skewY(-3deg) scaleX(.94); } to { transform: skewY(3deg) scaleX(1.02); } }
.e125-drum { transform-box: fill-box; transform-origin: 50% 100%; }
.st-boom .e125-drum { animation: e125Boom .3s ease-out; }
@keyframes e125Boom { 40% { transform: scale(1.08, .94); } }
@media (prefers-reduced-motion: reduce) { .e125-wv { animation-duration: 2s; } .e125-flag { animation-duration: 3s; } }
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const KIDS = ['k1', 'k2', 'k3'];

const BEATS = [
  { key: ['Nguyen Hien', 'about eight hundred years ago'], icon: '⏳', label: '800 years ago', async play(st) {
    st.look(260);
    st.set('st-lb-ago'); st.sfx('page-turn', { vol: 0.6 });
    await st.walk('hien', 300, { speed: 110, follow: false });
    st.set('st-nm'); st.mood('hien', 'joy'); st.pose('hien', 'wave'); st.act('hien', 'wave'); st.sfx('ding', { vol: 0.4 });
    await st.wait(1300);
    st.act('hien', null); st.pose('hien', 'stand');
  } },
  { key: ['very poor', 'could not go to school'], icon: '🏚️', label: 'very poor', async play(st) {
    off(st, 'st-lb-ago', 'st-nm');
    st.look(280);
    st.set('st-lb-poor'); st.sfx('wind', { vol: 0.4 });
    st.mood('mum', 'sad'); st.mood('hien', 'sad');
    await st.wait(800);
    for (const id of ['k1', 'k2']) st.show(id, true);
    st.set('st-lb-noschool');
    st.face('hien', 1);
    await Promise.all([st.walk('k1', 560, { speed: 130, follow: false }), st.walk('k2', 500, { speed: 130, follow: false })]);
    st.show('k1', false); st.show('k2', false);
    st.pose('hien', 'sad');
    await st.wait(600);
  } },
  { key: ['But he loved learning'], icon: '❤️', label: 'loved learning', async play(st) {
    off(st, 'st-lb-poor', 'st-lb-noschool');
    st.look(300);
    st.pose('hien', 'think'); st.mood('hien', 'joy');
    st.set('st-think'); st.sfx('pop', { vol: 0.5 });
    await st.wait(600);
    st.set('st-lb-love'); st.fx('hearts', 340, 150);
    await st.wait(1400);
    st.pose('hien', 'stand');
  } },
  { key: ['Every day', 'the other children were studying inside', 'Hien was standing at the window'], icon: '🪟', label: 'at the window', async play(st) {
    off(st, 'st-think', 'st-lb-love');
    st.look(930, { dur: 1200 });
    st.set('st-lb-every'); st.sfx('school-bell', { vol: 0.3 });
    for (const id of KIDS) { st.show(id, true); st.pose(id, 'sitDesk'); }
    st.place('k1', 840, FLOOR, -1); st.place('k2', 900, FLOOR, -1); st.place('k3', 960, FLOOR, -1);
    st.set('st-lb-inside'); st.sfx('page-turn', { vol: 0.5 });
    st.place('hien', 720, FLOOR, 1);
    await st.walk('hien', X.win + 40, { speed: 140, follow: false });
    st.face('hien', -1); st.pose('hien', 'e125_listen');
    st.set('st-lb-window'); st.sfx('ding', { vol: 0.4 });
    await st.wait(900);
  } },
  { key: ['listening to the teacher very carefully'], icon: '👂', label: 'listening', async play(st) {
    off(st, 'st-lb-every', 'st-lb-inside', 'st-lb-window');
    st.look(930);
    st.pose('teacher', 'e125_ask'); st.talk('teacher', true);
    st.set('st-wave'); st.sfx('page-turn', { vol: 0.3 });
    st.set('st-lb-listen');
    st.mood('hien', 'wow'); st.act('hien', 'nod');
    await st.wait(2200);
    st.talk('teacher', false); st.act('hien', null);
  } },
  { key: ['He had no paper', 'wrote on the ground with a stick'], icon: '✏️', label: 'with a stick', async play(st) {
    off(st, 'st-wave', 'st-lb-listen');
    st.pose('teacher', 'stand');
    st.look(1080);
    st.set('st-lb-nopaper'); st.mood('hien', 'sad');
    await st.wait(700);
    st.face('hien', 1); st.hold('hien', 'e125_stick'); st.pose('hien', 'e125_write'); st.mood('hien', 'happy');
    st.set('st-write'); st.set('st-lb-stick');
    await st.loop('pencil', () => st.wait(2400), { vol: 0.9 });
    st.mood('hien', 'joy');
    await st.wait(300);
  } },
  { key: ['One day', 'asking the class a difficult question'], icon: '❓', label: 'difficult question', async play(st) {
    off(st, 'st-lb-nopaper', 'st-lb-stick');
    st.hold('hien', null); st.face('hien', -1); st.pose('hien', 'e125_listen');
    st.look(930);
    st.set('st-lb-oneday'); st.sfx('ding', { vol: 0.3 });
    st.face('teacher', 1);
    await st.wait(500);
    st.set('st-q'); st.sfx('pop', { vol: 0.6 });
    st.pose('teacher', 'e125_ask'); st.talk('teacher', true);
    st.set('st-lb-oneday', false); st.set('st-lb-hard');
    await st.wait(1600);
    st.talk('teacher', false);
  } },
  { key: ['Nobody could answer it'], icon: '🤔', label: 'nobody', async play(st) {
    st.set('st-lb-hard', false);
    st.look(930);
    st.set('st-lb-nobody');
    for (const [i, id] of KIDS.entries()) { st.pose(id, i === 1 ? 'e125_shrug' : 'e125_sitThink'); st.mood(id, 'sad'); }
    st.set('st-dots'); st.sfx('pop', { vol: 0.4 });
    await st.loop('tick', () => st.wait(1800), { vol: 0.6 });
  } },
  { key: ['Suddenly', 'the boy at the window gave the right answer'], icon: '✅', label: 'right answer', async play(st) {
    off(st, 'st-lb-nobody', 'st-dots');
    st.look(930);
    st.pose('hien', 'e125_hand'); st.mood('hien', 'joy'); st.talk('hien', true); st.sfx('whoosh', { vol: 0.4 });
    for (const id of KIDS) { st.pose(id, 'sitDesk'); st.mood(id, 'wow'); st.face(id, 1); }
    st.face('teacher', 1); st.mood('teacher', 'wow');
    await st.wait(700);
    st.set('st-ok'); st.set('st-lb-right'); st.sfx('ding', { vol: 0.7 });
    await st.wait(1300);
    st.talk('hien', false);
  } },
  { key: ['The teacher was very surprised', 'let Hien study in the class'], icon: '🎓', label: 'study in class', async play(st) {
    off(st, 'st-lb-right', 'st-ok', 'st-q');
    st.look(930);
    st.set('st-lb-surp'); st.mood('teacher', 'wow'); st.act('teacher', 'shiver'); st.sfx('pop', { vol: 0.4 });
    await st.wait(700);
    st.act('teacher', null); st.mood('teacher', 'joy'); st.pose('teacher', 'e125_come'); st.act('teacher', 'wave'); st.sfx('door-open', { vol: 0.5 });
    st.set('st-lb-surp', false); st.set('st-lb-inclass');
    await st.walk('hien', 1022, { speed: 120, follow: false });
    st.face('hien', -1); st.pose('hien', 'sitDesk'); st.mood('hien', 'joy');
    st.act('teacher', null); st.pose('teacher', 'stand');
    for (const id of KIDS) { st.face(id, -1); st.mood(id, 'joy'); }
    st.sfx('clap', { vol: 0.5 });
    await st.wait(900);
  } },
  { key: ['In 1247', 'only twelve or thirteen', "came first in the king's exam"], icon: '📜', label: "king's exam", async play(st) {
    off(st, 'st-lb-inclass');
    for (const id of [...KIDS, 'teacher']) st.show(id, false);
    const H = st.a('hien'); H.who = 'e125_hien'; H.s = 1.12; H.build();
    st.place('hien', 1700, FLOOR, 1); st.place('c1', 1800, FLOOR, 1); st.pose('hien', 'stand'); st.mood('hien', 'happy');
    for (const id of ['c1', 'c2']) st.show(id, true);
    st.look(2000, { instant: true });
    st.set('st-lb-y1247'); st.sfx('page-turn', { vol: 0.6 });
    for (let i = 0; i < 3; i++) { st.set('st-boom'); st.sfx('bump', { vol: 0.8, rate: 0.7 }); await st.wait(320); st.set('st-boom', false); await st.wait(60); }
    await st.walk('hien', 1870, { speed: 120, follow: false });
    st.set('st-lb-age');
    st.set('st-first'); st.set('st-lb-firstx'); st.sfx('ding', { vol: 0.6 });
    st.pose('hien', 'pointUp'); st.mood('hien', 'wow');
    for (const id of ['c1', 'c2']) { st.mood(id, 'wow'); st.face(id, -1); }
    await st.wait(1500);
    st.pose('hien', 'stand'); st.mood('hien', 'joy');
  } },
  { key: ['the youngest trang nguyen', 'in our history'], icon: '🏅', label: 'trang nguyen', async play(st) {
    off(st, 'st-lb-y1247', 'st-lb-age', 'st-lb-firstx', 'st-first');
    st.look(2000);
    st.face('hien', 1);
    await st.dress('hien', 'e125_tn');
    st.set('st-lb-young'); st.mood('hien', 'joy'); st.pose('hien', 'open'); st.sfx('cheer', { vol: 0.6 });
    for (const id of ['c1', 'c2', 'guard']) { st.pose(id, 'clap'); st.act(id, 'clap'); st.mood(id, 'joy'); }
    st.fx('sparkle', 1870, 120);
    await st.wait(1600);
    for (const id of ['c1', 'c2', 'guard']) st.act(id, null);
  } },
];

export default {
  id: 'en125', worldW: W, floor: FLOOR, viewTop: 30, camStart: 20, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [1, 3, 5, 7, 9, 11],
  cast: [
    { id: 'mum', kind: 'adult', who: 'e125_mum', x: 70, s: 0.92 },
    { id: 'k2', kind: 'kid', who: 'e125_k2', x: 120 },
    { id: 'k1', kind: 'kid', who: 'e125_k1', x: 60 },
    { id: 'k3', kind: 'kid', who: 'e125_k3', x: 960, face: -1 },
    { id: 'teacher', kind: 'adult', who: 'e125_teacher', x: 800 },
    { id: 'guard', kind: 'adult', who: 'e125_guard', x: 2300, s: 0.95, face: -1 },
    { id: 'c2', kind: 'adult', who: 'e125_c2', x: 2140, s: 0.95, face: -1 },
    { id: 'c1', kind: 'adult', who: 'e125_c1', x: 1640, s: 0.95 },
    { id: 'hien', kind: 'kid', who: 'e125_hien', x: 200 },
  ],
  init(st) {
    for (const id of ['k1', 'k2', 'k3', 'c1', 'c2']) st.show(id, false);
    st.hold('k1', 'e125_book'); st.hold('k2', 'e125_book');
    st.mood('mum', 'happy');
  },
};
