/**
 * Bài 13 "Our Classroom": lớp 5A của Lan (bên trái) · bức tường chung · lớp 3A của Minh (bảng, bàn cô Hoa, cửa sổ,
 * bàn Minh, bàn Tom phía sau, các bạn, bảng ảnh cả lớp 30 bạn, bản đồ, tủ sách).
 * Toạ độ cảnh: rộng 2100, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, person, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, room, board, label, books, STAR } from '../kit.js';

const FLOOR = 282;

// Bạn cùng lớp (tiền tố e013_ để không trùng truyện khác)
Object.assign(CAST, {
  e013_mai: { hair: 'bob', top: 'uniform', shirt: '#FFFFFF', bottom: 'skirt', bottomC: '#1E3A6E', shoe: '#F472B6', bag: '#A78BFA' },
  e013_khoa: { hair: 'bowl', top: 'uniform', shirt: '#FFFFFF', bottom: 'shorts', bottomC: '#1E3A6E', shoe: '#3B6FD8', bag: '#0EA5E9' },
  e013_ha: { hair: 'pigtails', top: 'uniform', shirt: '#FFFFFF', bottom: 'skirt', bottomC: '#1E3A6E', shoe: '#FB7185' },
  e013_duc: { hair: 'neat', top: 'uniform', shirt: '#FFFFFF', bottom: 'shorts', bottomC: '#1E3A6E', shoe: '#2563EB' },
});

// ── Đồ vật ────────────────────────────────────────────────────────────────
const BLUEBAG = `<g transform="translate(0 0) scale(1.1)"><rect x="-12" y="-14" width="24" height="28" rx="5" fill="#3B82F6" stroke="${L}" stroke-width="1"/>
  <rect x="-8" y="-1" width="16" height="10" rx="2" fill="#60A5FA" stroke="${L}" stroke-width="0.9"/><path d="M-6 -14 Q0 -24 6 -14" stroke="${L}" stroke-width="1.4" fill="none"/></g>`;
const CASE = `<g transform="translate(0 -14)"><rect x="-17" y="-7" width="34" height="14" rx="6" fill="#22C55E" stroke="${L}" stroke-width="1"/>
  <path d="M-14 -2 H14" stroke="#15803D" stroke-width="1.4" stroke-dasharray="2 1.4"/><circle cx="14" cy="-2" r="2" fill="#FDE047" stroke="${L}" stroke-width="0.6"/></g>`;
const RULER = `<rect x="-4" y="-3" width="40" height="7" rx="1" fill="#FDE047" stroke="${L}" stroke-width="0.8"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${i * 5} -3 v${i % 2 ? 2 : 3.4}" stroke="${L}" stroke-width="0.6"/>`).join('')}`;
const FLY_RULER = `<g transform="translate(-18 0)">${RULER}</g>`;

/** Bàn học (lớp trước): mặt bàn ở y 236, tấm chắn phía trước che chân người ngồi. */
const sdesk = (x, c = '#F59E0B') => `<g transform="translate(${x} 0)"><rect x="-34" y="244" width="6" height="38" fill="#78716C" stroke="${L}" stroke-width="0.7"/><rect x="28" y="244" width="6" height="38" fill="#78716C" stroke="${L}" stroke-width="0.7"/>
  <rect x="-38" y="242" width="76" height="26" rx="2" fill="#FDE68A" stroke="${L}"/><rect x="-42" y="236" width="84" height="8" rx="2" fill="${c}" stroke="${L}"/></g>`;
/** Ghế (sau lưng người ngồi). */
const chair = (x) => `<g transform="translate(${x} 0)"><rect x="-17" y="204" width="34" height="40" rx="5" fill="#60A5FA" stroke="${L}"/><rect x="-20" y="246" width="40" height="6" rx="2" fill="#3B82F6" stroke="${L}"/></g>`;
/** Đèn trần: dây + chao + quầng sáng (st-light). */
const lamp = (x) => `<g transform="translate(${x} 0)"><path d="M0 0 V46" stroke="${L}" stroke-width="1.4"/><circle class="e013-lit" cy="62" r="22" fill="#FEF08A"/>
  <path d="M-16 60 L-8 46 H8 L16 60Z" fill="#F97316" stroke="${L}"/><circle class="e013-bulb" cy="61" r="4.4" fill="#FEF9C3" stroke="${L}" stroke-width="0.6"/></g>`;
/** Mặt nhỏ trên bảng ảnh cả lớp. */
const tinyFace = (x, y, hair) => `<g transform="translate(${x} ${y})"><circle r="7.2" fill="#FFE1C7" stroke="${L}" stroke-width="0.6"/><path d="M-7.2 -1 Q-7 -9 0 -8.6 Q7 -9 7.2 -1 Q4 -5 0 -5 Q-4 -5 -7.2 -1Z" fill="${hair}"/>
  <circle cx="-2.4" cy="0.6" r="0.9" fill="#2B1D16"/><circle cx="2.4" cy="0.6" r="0.9" fill="#2B1D16"/><path d="M-1.8 3 q1.8 1.4 3.6 0" stroke="#9A3B2E" stroke-width="0.7" fill="none"/></g>`;
/** Nhãn chữ bật lên theo trạng thái (kit label trong nhóm e013-t-<tên>). */
const tag = (n, x, y, text, c, size) => `<g class="e013-tag e013-t-${n}">${label(x, y, text, c, size)}</g>`;
const TAGS = ['big', 'bright', 'hoa', 'nextB', 'nextW', 'blue', 'friend', 'behind', 'green', 'not', 'door', 'ask', 'thirty', 'map', 'books'];
/** Mũi tên hai đầu (next to). */
const arrow2 = (x1, x2, y, c = '#F97316') => `<path d="M${x1 + 8} ${y} H${x2 - 8}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><path d="M${x1 + 12} ${y - 7} L${x1} ${y} L${x1 + 12} ${y + 7} M${x2 - 12} ${y - 7} L${x2} ${y} L${x2 - 12} ${y + 7}" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const hl = (n, x, y, w, h) => `<rect class="e013-hl e013-h-${n}" x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="none" stroke="#FACC15" stroke-width="5"/>`;

function bg() {
  const HAIRS = ['#1F1716', '#3B2A20', '#1F1716', '#E0A33A', '#1F1716', '#5B3A29'];
  const rows = Array.from({ length: 5 }, (_, r) => `<g class="e013-row e013-row${r + 1}">${Array.from({ length: 6 }, (_, c) => tinyFace(1414 + c * 22, 92 + r * 18, HAIRS[(c + r * 2) % 6])).join('')}
    <g class="e013-cnt e013-cnt${r + 1}">${label(1564, 97 + r * 18, String((r + 1) * 6), '#C2410C', 12)}</g></g>`).join('');
  const bunting = Array.from({ length: 22 }, (_, i) => `<path d="M${600 + i * 44} 22 l18 0 l-9 16Z" fill="${['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#C084FC'][i % 5]}" stroke="${L}" stroke-width="0.6"/>
    <text x="${609 + i * 44}" y="32" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="8" fill="#fff">${'ABCDEFGHIJKLMNOPQRSTUV'[i]}</text>`).join('');
  return `
  <defs><linearGradient id="e013sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#60C5F5"/><stop offset="1" stop-color="#DFF3FD"/></linearGradient></defs>
  <!-- Lớp 5A của Lan -->
  ${room(0, 524, FLOOR, '#FCE7F3', '#C7D2FE')}
  ${board(60, 70, 180, 84, 'Class 5A')}
  <rect x="330" y="64" width="110" height="96" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="336" y="70" width="98" height="84" fill="url(#e013sky)"/><path d="M385 70 V154 M336 112 H434" stroke="#fff" stroke-width="3"/>
  <g class="e013-sign5"><rect x="100" y="40" width="100" height="22" rx="5" fill="#fff" stroke="${L}"/><text x="150" y="56" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="14" fill="#DB2777">CLASS 5A</text></g>
  ${chair(140)}${chair(300)}${chair(450)}
  ${person(140, FLOOR, 'e013_ha', 'sit', { s: 1.05 })}${person(450, FLOOR, 'e013_duc', 'sit', { s: 1.05 })}
  <!-- Tường chung -->
  <rect x="520" y="0" width="30" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  <!-- Lớp 3A -->
  ${room(548, 1552, FLOOR, '#FEF9C3', '#C7D2FE')}
  ${Array.from({ length: 26 }, (_, i) => `<path d="M${548 + i * 60} ${FLOOR} V315" stroke="#A5B4FC" stroke-width="1"/>`).join('')}
  ${bunting}
  <polygon class="e013-beam" points="1012,170 1128,170 1190,${FLOOR} 960,${FLOOR}" fill="#FEF08A"/>
  ${hl('board', 568, 58, 244, 120)}
  ${board(580, 70, 220, 96, 'Hello, class!')}
  <g transform="translate(690 140)">${STAR('#FDE047')}</g><g transform="translate(730 150) scale(.7)">${STAR('#F472B6')}</g>
  <g class="e013-sign3"><rect x="640" y="40" width="100" height="22" rx="5" fill="#fff" stroke="${L}"/><text x="690" y="56" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="14" fill="#1D4ED8">CLASS 3A</text></g>
  <!-- đồng hồ -->
  <g transform="translate(905 92)"><circle r="17" fill="#fff" stroke="${L}" stroke-width="1.6"/><path d="M0 0 V-10 M0 0 H8" stroke="${L}" stroke-width="2" stroke-linecap="round"/></g>
  <!-- cửa sổ cạnh bàn Minh -->
  ${hl('win', 998, 56, 144, 126)}
  <rect x="1004" y="62" width="132" height="114" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="1010" y="68" width="120" height="102" fill="url(#e013sky)"/>
  <g transform="translate(1100 96)"><circle r="14" fill="#FDE047" stroke="#F59E0B" stroke-width="2"/></g>
  <path d="M1010 152 Q1060 136 1130 150 V170 H1010Z" fill="#86EFAC"/><path d="M1070 68 V170 M1010 119 H1130" stroke="#fff" stroke-width="3" opacity="0.8"/>
  ${chair(1070)}${chair(1230)}${chair(1380)}${chair(1540)}
  <!-- bảng ảnh cả lớp: 30 bạn -->
  <rect x="1398" y="56" width="188" height="122" rx="6" fill="#FFF7ED" stroke="${L}" stroke-width="1.4"/>
  <text x="1492" y="76" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="13" fill="#C2410C">OUR CLASS</text>
  ${rows}
  <!-- bản đồ -->
  ${hl('map', 1610, 52, 232, 138)}
  <rect x="1620" y="62" width="212" height="118" rx="4" fill="#BAE6FD" stroke="${L}" stroke-width="1.6"/>
  <path d="M1640 90 q14 -12 30 -4 q10 14 -4 24 q-8 14 -20 6 q-12 -12 -6 -26Z" fill="#86EFAC" stroke="${L}" stroke-width="0.8"/>
  <path d="M1700 80 q30 -8 50 4 q16 10 4 24 q-16 4 -24 18 q-8 20 -22 10 q-6 -20 -16 -26 q-6 -18 8 -30Z" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>
  <path d="M1770 120 q20 -6 34 6 q6 18 -12 22 q-20 2 -24 -10Z" fill="#FCA5A5" stroke="${L}" stroke-width="0.8"/>
  <path d="M1760 76 q22 -6 40 2 q8 10 -6 16 q-20 2 -32 -4Z" fill="#C4B5FD" stroke="${L}" stroke-width="0.8"/>
  <path d="M1620 130 H1832 M1726 62 V180" stroke="#7DD3FC" stroke-width="0.8" stroke-dasharray="4 3"/>
  <text x="1650" y="78" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="11" fill="#1E3A8A">MAP</text>
  <!-- tủ sách -->
  <rect x="1862" y="96" width="196" height="186" rx="4" fill="#B45309" stroke="${L}" stroke-width="1.4"/><rect x="1870" y="104" width="180" height="170" fill="#78350F"/>
  ${[148, 196, 244].map((y) => `<rect x="1870" y="${y}" width="180" height="6" fill="#A16207" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <g class="e013-books">${[148, 196, 244].map((y) => books(1874, y, 19)).join('')}${books(1874, 274, 19)}</g>
  ${hl('books', 1852, 86, 216, 200)}
  <!-- cây xanh -->
  <g transform="translate(2080 ${FLOOR})"><rect x="-12" y="-30" width="24" height="30" rx="3" fill="#F97316" stroke="${L}"/><path d="M0 -30 q-22 -20 -10 -46 q8 14 10 30 q4 -26 16 -36 q8 26 -16 52Z" fill="#22C55E" stroke="${L}"/></g>
  ${[870, 1290, 1960].map(lamp).join("")}${[290, 480].map(lamp).join("")}
  <!-- nhãn chữ -->
  <g class="e013-tag e013-t-big">${arrow2(700, 1500, 196, '#2563EB')}${label(1100, 190, 'big', '#2563EB', 20)}</g>
  ${tag('bright', 980, 118, 'bright', '#CA8A04', 20)}
  ${tag('hoa', 700, 114, 'Ms Hoa', '#7C3AED', 18)}
  <g class="e013-tag e013-t-nextB">${arrow2(806, 836, 196)}${label(822, 186, 'next to', '#C2410C', 15)}</g>
  <g class="e013-tag e013-t-nextW">${label(1070, 150, 'next to the window', '#C2410C', 14)}</g>
  ${tag('blue', 1070, 152, 'blue', '#2563EB', 22)}
  ${tag('friend', 1150, 128, 'friend', '#DB2777', 20)}
  <g class="e013-tag e013-t-behind"><path d="M1094 214 H1196" stroke="#F97316" stroke-width="4" stroke-linecap="round"/><path d="M1186 205 L1200 214 L1186 223" stroke="#F97316" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${label(1146, 206, 'behind', '#C2410C', 15)}</g>
  ${tag('green', 1230, 152, 'green', '#16A34A', 22)}
  <g class="e013-tag e013-t-not"><path d="M1110 74 Q1150 52 1190 74 Q1214 100 1186 124 Q1150 140 1112 124 Q1088 100 1110 74Z" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <circle cx="1104" cy="140" r="5" fill="#fff" stroke="${L}"/><circle cx="1094" cy="152" r="3" fill="#fff" stroke="${L}"/>
    <defs><clipPath id="e013lanclip"><circle cx="1150" cy="98" r="21"/></clipPath></defs><g clip-path="url(#e013lanclip)"><g transform="translate(1150 98)">${headOnly('en_lan', { s: 0.95 })}</g></g><path d="M1126 76 L1174 122 M1174 76 L1126 122" stroke="#EF4444" stroke-width="5" stroke-linecap="round" opacity="0.9"/></g>
  <g class="e013-tag e013-t-door">${arrow2(470, 610, 206, '#DB2777')}${label(540, 196, 'next door', '#DB2777', 16)}</g>
  ${tag('ask', 1150, 92, '?', '#7C3AED', 30)}
  ${tag('thirty', 1460, 214, 'thirty', '#C2410C', 20)}
  ${tag('map', 1726, 130, 'a big map', '#1D4ED8', 18)}
  ${tag('books', 1960, 138, 'many books', '#16A34A', 16)}`;
}

/** Lớp trước nhân vật: bàn học (che chân người ngồi), bàn cô giáo, cặp xanh, hộp bút xanh lá. */
function fg() {
  return `
  ${sdesk(300)}${sdesk(140)}${sdesk(450)}
  <!-- bàn cô Hoa -->
  <g class="e013-tdesk"><rect x="842" y="230" width="116" height="52" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="836" y="222" width="128" height="9" rx="3" fill="#D97706" stroke="${L}"/>
    <rect x="856" y="240" width="88" height="30" rx="3" fill="#92400E" stroke="${L}" stroke-width="0.8"/>
    <g transform="translate(866 214)"><circle r="7" fill="#EF4444" stroke="${L}"/><path d="M0 -7 v-4" stroke="#78350F" stroke-width="1.4"/></g>
    <rect x="884" y="210" width="34" height="6" fill="#3B82F6" stroke="${L}" stroke-width="0.6"/><rect x="886" y="204" width="30" height="6" fill="#F59E0B" stroke="${L}" stroke-width="0.6"/>
    <g class="e013-druler" transform="translate(926 218)">${RULER}</g></g>
  ${hl('tdesk', 830, 200, 140, 86)}
  ${sdesk(1070)}${sdesk(1230)}${sdesk(1380, '#FB923C')}${sdesk(1540, '#FB923C')}
  <g class="e013-hook" transform="translate(1030 258)"><g transform="scale(0.8)">${BLUEBAG}</g></g>
  <g class="e013-dcase" transform="translate(1250 248)">${CASE.replace('translate(0 -14)', 'translate(0 -10) scale(.8)')}</g>
  <g transform="translate(1530 226)"><rect x="-12" y="-6" width="24" height="16" fill="#fff" stroke="${L}" stroke-width="0.7"/><path d="M0 -6 V10" stroke="${L}" stroke-width="0.6"/></g>`;
}

const CSS = `
.e013-lit { opacity: 0; transition: opacity .5s; } .st-light .e013-lit { opacity: .55; }
.e013-bulb { transition: fill .3s; } .st-light .e013-bulb { fill: #FDE047; }
.e013-beam { opacity: 0; transition: opacity .9s; } .st-light .e013-beam { opacity: .35; }
.e013-tag { opacity: 0; transform: scale(.6); transition: opacity .35s, transform .35s cubic-bezier(.3,1.6,.6,1); transform-box: fill-box; transform-origin: center; }
${TAGS.map((n) => `.st-${n} .e013-t-${n}`).join(', ')} { opacity: 1; transform: none; }
.e013-hl { opacity: 0; transition: opacity .3s; }
${['board', 'tdesk', 'win', 'map', 'books'].map((n) => `.st-h-${n} .e013-h-${n}`).join(', ')} { opacity: 1; animation: e013Pulse .6s ease-in-out infinite alternate; }
@keyframes e013Pulse { from { opacity: .45; } to { opacity: 1; } }
.e013-row { opacity: .45; transition: opacity .3s; }
${[1, 2, 3, 4, 5].map((r) => `.st-r${r} .e013-row${r}`).join(', ')} { opacity: 1; }
.e013-cnt { opacity: 0; transition: opacity .3s; }
${[1, 2, 3, 4, 5].map((r) => `.st-r${r} .e013-cnt${r}`).join(', ')} { opacity: 1; }
.e013-hook, .e013-dcase, .e013-druler { transition: opacity .2s; }
.st-bagUp .e013-hook, .st-caseUp .e013-dcase, .st-rulerOff .e013-druler { opacity: 0; }
.e013-sign5, .e013-sign3 { transform-box: fill-box; transform-origin: center; }
.st-door .e013-sign5, .st-light .e013-sign3 { animation: e013Pop .5s ease-in-out 2 alternate; }
@keyframes e013Pop { to { transform: scale(1.18); } }
`;

const BEATS = [
  { key: ['This is our classroom'], icon: '🏫', label: 'classroom', async play(st) {
    st.look(820);
    st.pose('minh', 'open'); st.mood('minh', 'joy');
    st.fx('sparkle', 690, 52);
    await st.wait(1600);
    st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['big and bright'], icon: '💡', label: 'big and bright', async play(st) {
    st.set('st-light'); st.sfx('sparkle');
    st.set('st-big');
    await st.look(1100, { dur: 1600 });
    st.set('st-big', false); st.set('st-bright');
    st.fx('sparkle', 980, 62); st.fx('sparkle', 1280, 62);
    await st.wait(1200);
    st.set('st-bright', false);
  } },
  { key: ['Our teacher is Ms Hoa'], icon: '👩‍🏫', label: 'teacher', async play(st) {
    await st.look(800, { dur: 900 });
    st.set('st-hoa');
    st.pose('hoa', 'wave'); st.act('hoa', 'wave');
    await st.say('hoa', 'Hello, class!', 1700);
    st.act('hoa', null); st.pose('hoa', 'stand');
    st.set('st-hoa', false);
  } },
  { key: ['next to the board'], icon: '🧑‍🏫', label: 'next to the board', async play(st) {
    await st.walk('hoa', 900, { speed: 110, follow: false });
    st.pose('hoa', 'give');
    st.set('st-h-board'); st.set('st-h-tdesk'); st.set('st-nextB');
    await st.wait(2000);
    st.set('st-h-board', false); st.set('st-h-tdesk', false); st.set('st-nextB', false);
    st.pose('hoa', 'stand');
  } },
  { key: ['My desk is next to the window'], icon: '🪟', label: 'next to the window', async play(st) {
    await st.walk('minh', 1070, { speed: 120, lead: 40 });
    st.pose('minh', 'me');
    st.set('st-h-win'); st.set('st-nextW');
    st.fx('sparkle', 1070, 120);
    await st.wait(1400);
    st.pose('minh', 'sit');
    await st.wait(600);
    st.set('st-h-win', false); st.set('st-nextW', false);
  } },
  { key: ['My bag is blue'], icon: '🎒', label: 'blue bag', async play(st) {
    st.pose('minh', 'stand');
    await st.wait(300);
    await st.fly(BLUEBAG, [1030, 250], [1070, 210], { size: 40, dur: 500 });
    st.set('st-bagUp'); st.chest('minh', BLUEBAG); st.pose('minh', 'carry'); st.mood('minh', 'joy');
    st.set('st-blue');
    await st.wait(1600);
    st.set('st-blue', false);
    st.chest('minh', null); st.set('st-bagUp', false); st.pose('minh', 'sit'); st.mood('minh', 'happy');
  } },
  { key: ['Tom is my friend'], icon: '🤝', label: 'friend', async play(st) {
    await st.look(1150);
    st.pose('tom', 'sitWave'); st.act('tom', 'wave'); st.mood('tom', 'joy');
    st.pose('minh', 'sitWave'); st.act('minh', 'wave'); st.mood('minh', 'joy');
    st.set('st-friend');
    st.fx('hearts', 1150, 180);
    await st.say('tom', 'Hi, Minh!', 1600);
    st.act('tom', null); st.act('minh', null); st.pose('tom', 'sit'); st.pose('minh', 'sit');
    st.mood('tom', 'happy'); st.mood('minh', 'happy');
    st.set('st-friend', false);
  } },
  { key: ['His desk is behind my desk'], icon: '🪑', label: 'behind', async play(st) {
    st.set('st-behind');
    st.pose('tom', 'stand');
    await st.wait(400);
    st.pose('tom', 'give'); st.mood('tom', 'joy');
    await st.wait(1600);
    st.pose('tom', 'sit'); st.mood('tom', 'happy');
    st.set('st-behind', false);
  } },
  { key: ['His pencil case is green'], icon: '✏️', label: 'green', async play(st) {
    st.pose('tom', 'stand');
    await st.wait(300);
    st.set('st-caseUp'); st.chest('tom', CASE); st.pose('tom', 'carry'); st.mood('tom', 'joy');
    st.set('st-green'); st.fx('sparkle', 1230, 196);
    await st.wait(1700);
    st.set('st-green', false);
    st.chest('tom', null); st.set('st-caseUp', false); st.pose('tom', 'sit'); st.mood('tom', 'happy');
  } },
  { key: ['Lan is not in our class'], icon: '❓', label: 'not in our class', async play(st) {
    await st.look(1180, { dur: 600 });
    st.pose('minh', 'shrug'); st.act('minh', 'no');
    st.set('st-not');
    await st.wait(2000);
    st.act('minh', null); st.pose('minh', 'sit');
    st.set('st-not', false);
  } },
  { key: ['next door'], icon: '🚪', label: 'next door', async play(st) {
    await st.look(330, { dur: 1300 });
    st.set('st-door');
    st.pose('lan', 'sitWave'); st.act('lan', 'wave'); st.mood('lan', 'joy');
    await st.say('lan', 'Hi!', 1300);
    st.act('lan', null); st.pose('lan', 'sit'); st.mood('lan', 'happy');
    st.set('st-door', false);
  } },
  { key: ['is this your ruler'], icon: '📏', label: 'your ruler?', async play(st) {
    st.look(1060, { dur: 1100 });
    st.set('st-rulerOff'); st.hold('hoa', 'e013_ruler');
    await st.walk('hoa', 1150, { speed: 140, follow: false });
    st.pose('hoa', 'give');
    await st.say('hoa', 'Your ruler?', 1300);
  } },
  { key: ['asks Ms Hoa'], icon: '🙋‍♀️', label: 'asks', async play(st) {
    st.set('st-ask'); st.mood('hoa', 'wow');
    st.pose('tom', 'stand');
    await st.wait(1500);
    st.set('st-ask', false); st.mood('hoa', 'happy');
  } },
  { key: ['Yes, it is my ruler'], icon: '✅', label: 'my ruler', async play(st) {
    st.pose('tom', 'me'); st.act('tom', 'nod');
    st.say('tom', 'Yes!', 1100);
    await st.wait(700);
    st.hold('hoa', null); st.pose('hoa', 'stand');
    await st.fly(FLY_RULER, [1180, 212], [1236, 196], { size: 44, dur: 500 });
    st.act('tom', null);
    st.hold('tom', 'e013_ruler'); st.pose('tom', 'raise'); st.mood('tom', 'joy');
    await st.wait(700);
  } },
  { key: ['Thank you'], icon: '🙏', label: 'thank you', async play(st) {
    st.say('tom', 'Thank you!', 1500);
    st.mood('hoa', 'joy');
    st.fx('hearts', 1190, 150);
    await st.wait(1600);
    st.hold('tom', null); st.pose('tom', 'sit'); st.mood('tom', 'happy'); st.mood('hoa', 'happy');
  } },
  { key: ['thirty children'], icon: '👧', label: 'thirty', async play(st) {
    await st.walk('hoa', 1310, { speed: 130, lead: 160 });
    st.pose('hoa', 'pointUp'); st.act('hoa', 'point');
    for (let r = 1; r <= 5; r++) { st.set(`st-r${r}`); await st.wait(420); }
    st.set('st-thirty'); st.fx('sparkle', 1492, 140);
    await st.wait(1300);
    st.act('hoa', null); st.pose('hoa', 'stand');
    st.set('st-thirty', false);
  } },
  { key: ['a big map', 'many books'], icon: '🗺️', label: 'map and books', async play(st) {
    st.pose('minh', 'stand'); st.pose('tom', 'stand');
    await Promise.all([
      st.walk('minh', 1700, { speed: 200 }),
      (async () => { await st.wait(150); await st.walk('tom', 1800, { speed: 200, follow: false }); })(),
    ]);
    st.pose('minh', 'pointUp'); st.act('minh', 'point');
    st.set('st-h-map'); st.set('st-map');
    await st.wait(800);
    st.chest('tom', 'book'); st.pose('tom', 'carry');
    st.set('st-h-books'); st.set('st-books'); st.sfx('page-turn');
    await st.wait(1100);
    st.act('minh', null); st.pose('minh', 'stand');
    st.set('st-h-map', false); st.set('st-map', false); st.set('st-h-books', false); st.set('st-books', false);
  } },
  { key: ['We love our classroom'], icon: '❤️', label: 'love', async play(st) {
    st.chest('tom', null);
    st.pose('minh', 'cheer'); st.act('minh', 'cheer'); st.mood('minh', 'joy');
    st.pose('tom', 'cheer'); st.act('tom', 'cheer'); st.mood('tom', 'joy');
    st.pose('mai', 'sitClap'); st.act('mai', 'clap'); st.mood('mai', 'joy');
    st.walk("hoa", 1460, { speed: 120, follow: false }); st.look(1690, { dur: 800 });
    st.fx('hearts', 1700, 140);
    await st.wait(700);
    st.fx('hearts', 1800, 150);
    await st.wait(1500);
    st.pose('hoa', 'cheer'); st.mood('hoa', 'joy');
    st.act('minh', null); st.act('tom', null); st.act('mai', null);
  } },
];

export default {
  id: 'en013', worldW: 2100, floor: FLOOR, viewTop: 40, camStart: 580, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  props: { e013_ruler: `<g transform="translate(0 -2)">${RULER}</g>` },
  cast: [
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 300, s: 1.08 },
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 690, s: 0.95 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 970 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 1230 },
    { id: 'mai', kind: 'kid', who: 'e013_mai', x: 1380 },
    { id: 'khoa', kind: 'kid', who: 'e013_khoa', x: 1540 },
  ],
  init(st) {
    for (const id of ['lan', 'tom', 'mai', 'khoa']) st.pose(id, 'sit');
  },
};
