/**
 * Bài 22 "Lan's Busy Week": một dãy phố liền mạch: lớp học (CLB tiếng Anh) · thư viện · vỉa hè (Minh chờ) · nhà Lan (phòng ngủ, bếp)
 * · xe của bố · sân cầu lông trong công viên · đường quê có biển "NAM DINH" · nhà ông bà.
 * Mỗi câu là một ngày / một việc; nhãn thứ (MONDAY…) hiện ở chỗ Lan làm việc đó. Lịch tuần trên tường phòng ngủ điểm các việc trong tuần.
 * Toạ độ cảnh: rộng 2640, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, lying, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, palm, bush, grass, road, room, doorway, windowBox, board, shelf, books, rug, label, steam, BAG } from '../kit.js';

const FLOOR = 282;

Object.assign(CAST, {
  e022_lan_pj: { hair: 'ponytail', top: 'tee', shirt: '#FBCFE8', bottom: 'pants', bottomC: '#F9A8D4', shoe: '#F28AB2', bag: '#EC4899' },
  e022_mai: { hair: 'pigtails', top: 'tee', shirt: '#FACC15', bottom: 'skirt', bottomC: '#22C55E', shoe: '#F472B6' },
});

// ── Đồ vật ────────────────────────────────────────────────────────────────
const SHUTTLE = `<g transform="rotate(-30)"><path d="M-4 0 L-9 -14 H9 L4 0Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M-6 -7 H6" stroke="#CBD5E1" stroke-width="1"/><circle cy="2" r="4" fill="#EF4444" stroke="${L}" stroke-width="0.8"/></g>`;
const ROLLS = `<ellipse rx="22" ry="6" fill="#fff" stroke="${L}"/>${[-12, 0, 12].map((x) => `<g transform="translate(${x} -5) rotate(-12)"><rect x="-4" y="-9" width="8" height="18" rx="4" fill="#FDBA74" stroke="${L}" stroke-width="0.8"/><path d="M-3 -4 H3 M-3 2 H3" stroke="#EA580C" stroke-width="0.8"/></g>`).join('')}`;
const BOOKI = (c) => `<rect x="-9" y="-12" width="18" height="24" rx="2" fill="${c}" stroke="${L}" stroke-width="1"/><path d="M-6 -12 V12" stroke="#fff" stroke-width="1.4" opacity="0.7"/>`;
const TV = `<rect x="-34" y="-26" width="68" height="46" rx="4" fill="#334155" stroke="${L}" stroke-width="1.2"/><rect x="-29" y="-21" width="58" height="36" rx="2" fill="#0F172A"/>
  <path d="M-10 20 L-14 30 M10 20 L14 30" stroke="${L}" stroke-width="2.4"/><path d="M-22 -18 l10 6" stroke="#475569" stroke-width="2" opacity="0.6"/>`;

/** Lịch tuần: 7 ô, mỗi ô một việc (ô sáng lần lượt khi st-week). */
const calendar = (x, y) => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const icon = [
    `<text y="4" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="9" fill="#1D4ED8">ABC</text>`,
    `<g transform="scale(.5)">${BOOKI('#22C55E')}</g>`,
    `<text y="4" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="9" fill="#1D4ED8">ABC</text>`,
    `<g transform="scale(.6)">${ROLLS}</g>`,
    `<g transform="scale(.8)">${SHUTTLE}</g>`,
    `<path d="M-7 4 L0 -5 L7 4Z" fill="#EF4444" stroke="${L}" stroke-width="0.7"/><rect x="-5" y="4" width="10" height="5" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/>`,
    `<circle r="5" fill="#FDE047" stroke="#F59E0B"/>`,
  ];
  return `<g transform="translate(${x} ${y})"><rect x="0" y="0" width="154" height="74" rx="4" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="0" y="0" width="154" height="14" rx="4" fill="#EC4899" stroke="${L}" stroke-width="1.2"/>
    <text x="77" y="11" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="10" fill="#fff">MY WEEK</text>
    ${days.map((d, i) => `<g transform="translate(${4 + i * 21.4} 18)"><g class="e022-day ${i < 5 ? 'e022-wd' : ''}"><rect width="18.6" height="52" rx="2" fill="#FDF2F8" stroke="${L}" stroke-width="0.6"/></g>
      <text x="9.3" y="10" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="6.4" fill="${i > 4 ? '#DC2626' : '#475569'}">${d}</text>
      <g transform="translate(9.3 32)"><g class="e022-ic" style="transition-delay:${i * 0.22}s">${icon[i]}</g></g></g>`).join('')}</g>`;
};
/** Đồng hồ báo thức (kim theo trạng thái: 6:00 mặc định, st-830 → 8:30). */
const alarm = (x, y) => `<g transform="translate(${x} ${y})"><circle cx="-10" cy="-13" r="5" fill="#EF4444" stroke="${L}"/><circle cx="10" cy="-13" r="5" fill="#EF4444" stroke="${L}"/>
  <circle r="14" fill="#fff" stroke="#EF4444" stroke-width="3"/>${Array.from({ length: 4 }, (_, i) => `<path d="M0 -11 V-8" stroke="${L}" stroke-width="1.4" transform="rotate(${i * 90})"/>`).join('')}
  <g class="e022-hh" style="transform-origin:0px 0px"><path d="M0 1 V-6.5" stroke="${L}" stroke-width="2.2" stroke-linecap="round"/></g>
  <g class="e022-mh" style="transform-origin:0px 0px"><path d="M0 2 V-10" stroke="#DC2626" stroke-width="1.4" stroke-linecap="round"/></g>
  <path d="M-9 13 l-3 4 M9 13 l3 4" stroke="${L}" stroke-width="2"/></g>`;
/** Cửa sổ có lớp đêm. */
const win = (x, y, w, h) => `${windowBox(x, y, w, h)}<g class="e022-nightwin"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#1E3A8A"/>
  <circle cx="${x + w * 0.7}" cy="${y + h * 0.3}" r="${h * 0.13}" fill="#FEF9C3"/><circle cx="${x + w * 0.7 + 4}" cy="${y + h * 0.27}" r="${h * 0.11}" fill="#1E3A8A"/>
  ${[[0.2, 0.2], [0.35, 0.55], [0.5, 0.18]].map(([a, b]) => `<circle cx="${x + w * a}" cy="${y + h * b}" r="1.6" fill="#fff"/>`).join('')}</g>`;
const LB = [['eleven', 1086, 172, 'eleven', '#DB2777', 18], ['early', 1104, 186, 'early', '#DC2626', 18], ['club', 170, 154, 'MON + WED', '#1D4ED8', 16],
  ['tue', 500, 96, 'TUESDAY', '#7C3AED', 17], ['books', 512, 124, '2 or 3 books', '#16A34A', 15], ['thu', 1240, 80, 'THURSDAY', '#EA580C', 17],
  ['rolls', 1250, 196, 'spring rolls', '#EA580C', 14], ['soup', 1420, 110, 'soup', '#0369A1', 15], ['fri', 1790, 90, 'FRIDAY', '#16A34A', 17],
  ['late', 1040, 186, 'never late', '#7C3AED', 16], ['sat', 2200, 90, 'SATURDAY', '#DC2626', 17], ['tv', 2575, 150, 'never', '#DC2626', 17]];

function bg() {
  return `
  ${sky(680, 160, 315, 'e022skyA')}${sky(1460, 1180, 315, 'e022skyB')}
  ${cloud(760, 52, 0.8, 0)}${cloud(1650, 60, 1, 2)}${cloud(1960, 44, 0.8, 4)}${cloud(2300, 58, 0.9, 1)}
  <g class="e022-dusk"><rect x="680" y="0" width="160" height="${FLOOR}" fill="#1E3A8A"/><rect x="1460" y="0" width="1180" height="${FLOOR}" fill="#1E3A8A"/>
    ${[[720, 40], [800, 80], [1520, 50], [1700, 30], [1900, 70], [2100, 40]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="1.8" fill="#fff"/>`).join('')}</g>
  <!-- Vỉa hè giữa trường và nhà -->
  ${road(680, 160, FLOOR)}${tree(770, FLOOR - 10, 0.9)}
  <!-- Lớp học: CLB tiếng Anh -->
  ${room(0, 340, FLOOR, '#FEF9C3')}
  ${board(80, 56, 180, 80, 'English Club')}
  <g transform="translate(300 90)"><rect x="-26" y="-26" width="52" height="52" rx="4" fill="#fff" stroke="${L}"/><text y="-4" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#EF4444">A B</text><text y="16" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#2563EB">C D</text></g>
  ${rug(190, FLOOR, 200, '#93C5FD')}
  <!-- Thư viện -->
  ${room(340, 340, FLOOR, '#EDE9FE')}
  <rect x="440" y="46" width="120" height="24" rx="4" fill="#fff" stroke="${L}"/><text x="500" y="64" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#7C3AED">LIBRARY</text>
  ${[0, 1, 2].map((r) => shelf(360, 120 + r * 50, 60, books(362, 120 + r * 50, 6)) + shelf(600, 120 + r * 50, 64, books(604, 120 + r * 50, 6))).join('')}
  <rect x="356" y="96" width="4" height="${FLOOR - 96}" fill="#A16207"/><rect x="420" y="96" width="4" height="${FLOOR - 96}" fill="#A16207"/>
  <rect x="596" y="96" width="4" height="${FLOOR - 96}" fill="#A16207"/><rect x="664" y="96" width="4" height="${FLOOR - 96}" fill="#A16207"/>
  ${doorway(340, FLOOR)}
  <rect x="672" y="0" width="12" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  <!-- Nhà Lan: phòng ngủ -->
  ${room(840, 300, FLOOR, '#FCE7F3')}
  ${calendar(886, 56)}
  ${win(1052, 56, 68, 64)}
  <rect x="860" y="176" width="16" height="106" rx="3" fill="#A16207" stroke="${L}"/>
  <rect x="860" y="236" width="210" height="26" rx="4" fill="#fff" stroke="${L}"/><rect x="860" y="258" width="210" height="10" fill="#DB2777" stroke="${L}"/>
  <rect x="1060" y="222" width="12" height="60" rx="3" fill="#A16207" stroke="${L}"/>
  <g class="e022-sleeper">${lying(965, 250, 'e022_lan_pj', { len: 120, blanket: '#F9A8D4' })}</g>
  <g class="e022-made"><rect x="886" y="222" width="44" height="18" rx="8" fill="#fff" stroke="${L}"/><path d="M950 238 Q1010 226 1058 236 V244 H950Z" fill="#F9A8D4" stroke="${L}"/></g>
  <rect x="1078" y="236" width="48" height="46" rx="3" fill="#D97706" stroke="${L}"/>
  ${alarm(1102, 222)}
  <g class="e022-ring"><path d="M1080 204 l-7 -5 M1124 204 l7 -5" stroke="#EF4444" stroke-width="2.4" stroke-linecap="round"/></g>
  <!-- Bếp -->
  ${room(1140, 320, FLOOR, '#DCFCE7')}
  ${win(1176, 56, 90, 74)}
  ${shelf(1300, 100, 90, `<rect x="1308" y="82" width="16" height="18" rx="3" fill="#FDE68A" stroke="${L}"/><rect x="1334" y="84" width="16" height="16" rx="3" fill="#FCA5A5" stroke="${L}"/><rect x="1360" y="80" width="16" height="20" rx="3" fill="#86EFAC" stroke="${L}"/>`)}
  <rect x="1380" y="200" width="74" height="82" fill="#16A34A" stroke="${L}"/><rect x="1376" y="194" width="82" height="9" rx="3" fill="#F5F5F4" stroke="${L}"/>
  <g transform="translate(1416 186)"><path d="M-16 -6 H16 V8 Q16 12 12 12 H-12 Q-16 12 -16 8Z" fill="#94A3B8" stroke="${L}"/><ellipse cx="0" cy="-6" rx="16" ry="3.4" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/></g>
  ${steam(1416, 174, 'e022-potsteam')}
  ${doorway(1140, FLOOR)}
  <rect x="834" y="0" width="12" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/><rect x="1454" y="0" width="12" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  <!-- Phố + công viên -->
  ${road(1460, 120, FLOOR)}
  ${grass(1580, 400, FLOOR)}
  ${tree(1610, FLOOR - 8, 1)}${tree(1960, FLOOR - 8, 0.9, '#F59E0B')}${bush(1660, FLOOR - 2, 0.9)}
  <path d="M1650 ${FLOOR - 2} H1940" stroke="#fff" stroke-width="2.4"/>
  <g transform="translate(1790 0)"><rect x="-3" y="196" width="6" height="${FLOOR - 196}" fill="#475569"/>
    <rect x="-3" y="200" width="6" height="34" fill="#fff" stroke="${L}" stroke-width="0.8"/>${[206, 214, 222, 230].map((y) => `<path d="M-3 ${y} H3" stroke="#94A3B8"/>`).join('')}
    <rect x="-5" y="196" width="10" height="5" rx="2" fill="#fff" stroke="${L}" stroke-width="0.8"/></g>
  <!-- Đường quê -->
  <rect x="1980" y="200" width="260" height="${FLOOR - 200}" fill="#4ADE80" stroke="${L}"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${1994 + i * 28} 206 V${FLOOR - 10}" stroke="#16A34A" stroke-width="3" stroke-dasharray="6 8"/>`).join('')}
  <rect x="1980" y="${FLOOR - 8}" width="660" height="${323 - FLOOR}" fill="#D6A76A" stroke="${L}"/>
  ${palm(2010, FLOOR - 6, 0.9)}
  <rect x="2086" y="150" width="6" height="${FLOOR - 150}" fill="#78716C"/>
  <rect x="2040" y="118" width="98" height="34" rx="4" fill="#16A34A" stroke="${L}" stroke-width="1.2"/><text x="2089" y="141" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#fff">NAM DINH</text>
  <!-- Nhà ông bà -->
  ${bush(2270, FLOOR - 4, 1)}
  <path d="M2320 112 L2480 50 L2640 112Z" fill="#DC2626" stroke="${L}" stroke-width="1.4"/>
  ${Array.from({ length: 6 }, (_, i) => `<path d="M${2350 + i * 50} ${100 - i % 2} l20 -6" stroke="#991B1B" stroke-width="1.4"/>`).join('')}
  <rect x="2336" y="112" width="304" height="${FLOOR - 112}" fill="#FFEDD5" stroke="${L}" stroke-width="1.2"/>
  <rect x="2336" y="${FLOOR - 4}" width="304" height="8" fill="#D9A066" stroke="${L}"/>
  <rect x="2336" y="112" width="12" height="${FLOOR - 112}" fill="#FDBA74" stroke="${L}"/>
  ${windowBox(2400, 140, 70, 60)}
  <rect x="2530" y="232" width="90" height="50" rx="3" fill="#B45309" stroke="${L}"/><rect x="2538" y="244" width="34" height="12" rx="2" fill="none" stroke="${L}" stroke-width="0.8"/><rect x="2578" y="244" width="34" height="12" rx="2" fill="none" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(2575 202)">${TV}<g class="e022-tvx"><path d="M-20 -14 L20 10 M20 -14 L-20 10" stroke="#EF4444" stroke-width="5" stroke-linecap="round"/></g></g>
  <g class="e022-sunlb"><g transform="translate(2440 70)"><circle r="12" fill="#FDE047" stroke="#F59E0B" stroke-width="2"/></g></g>
  ${LB.map(([k, x, y, t, c, s]) => `<g class="e022-lb e022-lb-${k}">${label(x, y, t, c, s)}</g>`).join('')}`;
}

/** Lớp trước: bàn thư viện, bàn bếp (che chân người ngồi / đứng sau bàn), đồ ăn, sách xếp chồng. */
function fg() {
  return `
  <rect x="456" y="232" width="128" height="9" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="466" y="241" width="9" height="41" fill="#92400E" stroke="${L}"/><rect x="566" y="241" width="9" height="41" fill="#92400E" stroke="${L}"/>
  <g class="e022-books">${['#EF4444', '#3B82F6', '#22C55E'].map((c, i) => `<g class="e022-bk" style="transition-delay:${i * 0.45}s"><g transform="translate(556 ${226 - i * 7}) rotate(90)">${BOOKI(c).replace('height="24"', 'height="22"')}</g></g>`).join('')}</g>
  <rect x="1196" y="232" width="150" height="9" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="1206" y="241" width="9" height="41" fill="#92400E" stroke="${L}"/><rect x="1328" y="241" width="9" height="41" fill="#92400E" stroke="${L}"/>
  <g class="e022-rolls"><g transform="translate(1246 228)">${ROLLS}</g></g>
  <g class="e022-wrap"><g transform="translate(1290 229)"><rect x="-12" y="-3" width="24" height="5" rx="2" fill="#FEF3C7" stroke="${L}" stroke-width="0.7"/></g></g>`;
}

const CSS = `
.e022-nightwin, .e022-dusk { transition: opacity 1.2s; }
.e022-nightwin { opacity: 1; } .st-day .e022-nightwin { opacity: 0; } .st-night .e022-nightwin { opacity: 1; }
.e022-dusk { opacity: 0; } .st-night .e022-dusk { opacity: .6; }
.e022-sleeper, .e022-made { transition: opacity .4s; }
.e022-sleeper { opacity: 0; } .st-sleep .e022-sleeper { opacity: 1; }
.st-sleep .e022-made { opacity: 0; }
.e022-ic { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .4s cubic-bezier(.3,1.6,.6,1); }
.st-week .e022-ic { opacity: 1; transform: scale(1); }
.e022-day rect { transition: fill .3s; }
.st-week .e022-day rect { fill: #FBCFE8; }
.st-wd .e022-wd rect { fill: #FDE047; }
.e022-hh, .e022-mh { transition: transform 1.6s cubic-bezier(.4,0,.2,1); }
.e022-hh { transform: rotate(180deg); } .e022-mh { transform: rotate(0deg); }
.st-830 .e022-hh { transform: rotate(255deg); } .st-830 .e022-mh { transform: rotate(180deg); }
.e022-ring { opacity: 0; } .st-ring .e022-ring { opacity: 1; animation: e022Blink .2s infinite alternate; }
@keyframes e022Blink { to { opacity: .3; } }
.e022-lb { opacity: 0; transition: opacity .3s; }
${LB.map(([k]) => `.st-lb-${k} .e022-lb-${k}`).join(', ')} { opacity: 1; }
.e022-potsteam { opacity: 0; transition: opacity .4s; } .st-cook .e022-potsteam { opacity: 1; }
.e022-bk { opacity: 0; transform: translateY(-16px); transition: opacity .3s, transform .4s ease-out; }
.st-books .e022-bk { opacity: 1; transform: none; }
.e022-rolls, .e022-wrap { opacity: 0; transition: opacity .4s; } .st-rolls .e022-rolls { opacity: 1; } .st-wrap .e022-wrap { opacity: 1; }
.e022-tvx { opacity: 0; transition: opacity .3s; } .st-tvx .e022-tvx { opacity: 1; }
.e022-sunlb { opacity: 0; transition: opacity .4s; } .st-tvx .e022-sunlb { opacity: 1; }
@media (prefers-reduced-motion: reduce) { .st-ring .e022-ring { animation-duration: .6s; } }
`;

const POSES = { e022_swing: { R: [150, 120], L: [30, 20] }, e022_ready: { R: [80, 150], L: [30, 20] } };

function lb(st, k) { LB.forEach(([n]) => st.set(`st-lb-${n}`, n === k)); }
/** Một cú đánh cầu: người đánh vung vợt, quả cầu bay theo đường cong. */
async function hit(st, who, [x1, x2]) {
  st.pose(who, 'e022_swing');
  await st.wait(160);
  st.pose(who, 'e022_ready');
  await st.fly(SHUTTLE, [x1, 196], [x2, 196], { size: 22, dur: 650 });
}

const BEATS = [
  { key: ['eleven years old', 'busy week'], icon: '📅', label: 'busy week', async play(st) {
    st.look(1000);
    lb(st, 'eleven'); st.fx('zzz', 960, 200, { quiet: true });
    await st.wait(700);
    st.set('st-week'); st.sfx('sparkle');
    await st.wait(1800);
  } },
  { key: ['always gets up early', 'Monday to Friday'], icon: '⏰', label: 'gets up early', async play(st) {
    st.look(1000);
    lb(st, 'early'); st.set('st-wd');
    st.set('st-ring'); st.sfx('alarm-clock');
    await st.wait(1000);
    st.set('st-ring', false); st.set('st-sleep', false); st.show('lan', true);
    st.pose('lan', 'stretch'); st.act('lan', 'stretch'); st.mood('lan', 'shut');
    st.set('st-day');
    await st.wait(1400);
    st.act('lan', null); st.mood('lan', 'happy'); st.pose('lan', 'stand');
    st.set('st-wd', false);
  } },
  { key: ['walks to school with Minh'], icon: '🚶‍♀️', label: 'walks to school', async play(st) {
    lb(st, null);
    await st.dress('lan', 'en_lan');
    st.bag('lan', true); st.sfx('bag-on');
    await st.walk('lan', 830, { speed: 190 });
    st.pose('minh', 'wave'); st.act('minh', 'wave');
    await st.wait(500);
    st.act('minh', null);
    await Promise.all([
      st.walk('minh', 210, { speed: 200, follow: false }),
      st.walk('lan', 270, { speed: 200, lead: -60 }),
    ]);
  } },
  { key: ['Monday and Wednesday', 'English club'], icon: '🔤', label: 'English club', async play(st) {
    st.look(180);
    st.bag('lan', false); st.bag('minh', false);
    lb(st, 'club');
    st.pose('hoa', 'point'); st.act('hoa', 'point');
    await st.wait(700);
    st.pose('lan', 'raise'); st.mood('lan', 'joy'); st.pose('minh', 'raise'); st.mood('minh', 'joy');
    await st.say('lan', 'Hello!', 1300);
    st.act('hoa', null); st.pose('hoa', 'stand');
    st.pose('lan', 'stand'); st.pose('minh', 'stand'); st.mood('lan', 'happy'); st.mood('minh', 'happy');
  } },
  { key: ['Tuesday', 'goes to the library'], icon: '🏛️', label: 'library', async play(st) {
    lb(st, 'tue');
    st.pose('minh', 'wave'); st.act('minh', 'wave');
    await st.walk('lan', 500, { speed: 150, lead: 20 });
    st.act('minh', null); st.pose('minh', 'stand');
    st.mood('lan', 'joy');
    await st.wait(500);
    st.mood('lan', 'happy');
  } },
  { key: ['reads two or three books'], icon: '📚', label: 'reads books', async play(st) {
    st.look(520);
    lb(st, 'books');
    st.pose('lan', 'read'); st.chest('lan', 'book');
    await st.wait(300);
    st.act('lan', 'read'); st.sfx('page-turn');
    st.set('st-books');
    await st.wait(1600);
    st.sfx('page-turn');
    await st.wait(600);
    st.act('lan', null);
  } },
  { key: ['Thursday', 'helps Mum in the kitchen'], icon: '👩‍🍳', label: 'helps Mum', async play(st) {
    lb(st, 'thu'); st.set('st-books', false);
    st.chest('lan', null); st.pose('lan', 'stand');
    await st.walk('lan', 1290, { speed: 230, lead: 30 });
    st.set('st-cook');
    st.pose('mum', 'wave'); st.act('mum', 'wave'); st.mood('mum', 'joy');
    st.pose('lan', 'carry'); st.mood('lan', 'joy');
    await st.wait(1000);
    st.act('mum', null); st.pose('mum', 'stand'); st.mood('mum', 'happy'); st.mood('lan', 'happy');
  } },
  { key: ['makes spring rolls or soup'], icon: '🥢', label: 'spring rolls', async play(st) {
    st.look(1320);
    st.set('st-wrap'); lb(st, 'rolls');
    st.pose('lan', 'stir'); st.act('lan', 'stir');
    await st.wait(1200);
    st.set('st-wrap', false); st.set('st-rolls'); st.fx('sparkle', 1246, 216);
    lb(st, 'soup');
    st.pose('mum', 'stir'); st.act('mum', 'stir'); st.sfx('pot-stir');
    await st.wait(1400);
    st.act('lan', null); st.act('mum', null); st.pose('mum', 'stand'); st.pose('lan', 'stand');
  } },
  { key: ['Friday', 'plays badminton with her friends'], icon: '🏸', label: 'badminton', async play(st) {
    lb(st, 'fri'); st.set('st-cook', false);
    st.hold('lan', 'racket');
    await st.walk('lan', 1730, { speed: 230, lead: 50 });
    st.pose('lan', 'e022_ready'); st.pose('tom', 'e022_ready');
    st.mood('mai', 'joy'); st.act('mai', 'hop');
    await hit(st, 'lan', [1750, 1850]);
    await hit(st, 'tom', [1850, 1750]);
    await hit(st, 'lan', [1750, 1850]);
    st.mood('lan', 'joy'); st.mood('tom', 'joy');
    st.act('mai', null);
  } },
  { key: ['never goes to bed late'], icon: '🛏️', label: 'bed early', async play(st) {
    lb(st, null); st.set('st-night'); st.set('st-rolls', false);
    st.hold('lan', null); st.pose('lan', 'stand'); st.pose('tom', 'stand'); st.mood('lan', 'happy');
    await st.walk('lan', 980, { speed: 240 });
    st.set('st-830');
    await st.dress('lan', 'e022_lan_pj');
    await st.wait(300);
    st.show('lan', false); st.set('st-sleep');
    lb(st, 'late');
    st.fx('zzz', 960, 200);
    await st.wait(1200);
  } },
  { key: ['Saturday', 'visits Grandma and Grandpa'], icon: '👵', label: 'visits Grandma', async play(st) {
    lb(st, null); st.set('st-night', false); st.set('st-sleep', false); st.set('st-830', false);
    st.show('lan', true);
    await st.dress('lan', 'en_lan_home');
    await st.walk('lan', 1530, { speed: 260 });
    st.show('lan', false); st.show('car', true); st.show('carP', false);
    lb(st, 'sat'); st.sfx('car-go');
    await st.walk('car', 2230, { speed: 330, lead: 60 });
    { const C = st.a('car'); C.custom = headOnly('en_dad', { s: 0.8 }); C.build(); }
    st.a('lan').x = 2320; st.a('lan').face = 1; st.a('lan').place();
    st.show('lan', true); st.mood('lan', 'joy');
    st.pose('grandma', 'open'); st.mood('grandma', 'joy'); st.pose('grandpa', 'wave'); st.act('grandpa', 'wave'); st.mood('grandpa', 'joy');
    st.fx('hearts', 2360, 140);
    await st.wait(1300);
    st.act('grandpa', null); st.pose('grandpa', 'stand'); st.pose('grandma', 'stand');
  } },
  { key: ['never watches TV in the morning'], icon: '📺', label: 'no TV', async play(st) {
    st.mood('lan', 'happy');
    await st.walk('lan', 2516, { speed: 140, lead: 20 });
    st.set('st-tvx'); lb(st, 'tv');
    st.act('lan', 'no');
    await st.wait(1200);
    st.act('lan', null);
    st.pose('lan', 'point'); st.mood('lan', 'joy');
    await st.wait(900);
    st.pose('lan', 'stand');
  } },
];

const CAR_HEADS = `${headOnly('en_dad', { s: 0.8 })}<g transform="translate(34 4)">${headOnly('en_lan', { s: 0.7 })}</g>`;

export default {
  id: 'en022', worldW: 2640, floor: FLOOR, viewTop: 40, camStart: 760, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  cast: [
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 50, s: 0.95 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 790, face: -1 },
    { id: 'carP', kind: 'car', x: 1540, svg: '' },
    { id: 'car', kind: 'car', x: 1540, svg: CAR_HEADS },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 1412, s: 0.95, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: 1850, face: -1 },
    { id: 'mai', kind: 'kid', who: 'e022_mai', x: 1660 },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: 2384, s: 0.92, face: -1 },
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: 2448, s: 0.9, face: -1 },
    { id: 'lan', kind: 'kid', who: 'e022_lan_pj', x: 980, s: 1.04 },
  ],
  init(st) {
    st.show('lan', false); st.show('car', false);
    st.set('st-sleep');
    st.bag('minh', true);
    st.hold('tom', 'racket');
  },
};
