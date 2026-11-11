/**
 * Bài 66 "If It Rains Tomorrow" (câu điều kiện loại 1): mùa mưa, đi từ trái sang phải: lớp cô Hoa (bảng: Picnic on Sunday,
 * Thu Le Park → Plan A / Plan B, cửa sổ mưa) → cửa lớp → hiên trường có mái che (Lan chờ em) → sân trường mưa → cổng (bố tới đón).
 * Mỗi câu "If …, … will …" = điều kiện hiện trước (nắng / mưa / cầm ô…) rồi kết quả hiện ra ngay cạnh (chơi trên cỏ, bảo tàng, khô ráo…).
 * Toạ độ cảnh: rộng 1700, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, room, doorway, windowBox, desk, thought } from '../kit.js';

const FLOOR = 282;
const X = { board: 90, hoa: 404, tom: 490, minh: 572, mai: 652, win: 700, door: 846, lan: 940, roof: 1084, gate: 1560 };
const M2 = X.lan + 40; // chỗ Minh đứng dưới mái hiên (câu 11–13)
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const CHALK = `${NUN} fill="#F8FAFC" text-anchor="middle"`;

// ── Đồ vật ─────────────────────────────────────────────────────────────────
/** Ô (cán đi lên từ bàn tay khi cẳng tay buông xuống; vòm ô trên đầu). */
const UMB = (len, c = '#EF4444') => `<path d="M0 4 V${-len}" stroke="${L}" stroke-width="1.8"/><path d="M0 4 q0 6 5 6" stroke="${L}" stroke-width="1.8" fill="none"/>
  <path d="M-34 ${-len + 2} Q-30 ${-len - 30} 0 ${-len - 32} Q30 ${-len - 30} 34 ${-len + 2} Q26 ${-len - 3} 17 ${-len + 2} Q8 ${-len - 3} 0 ${-len + 2} Q-8 ${-len - 3} -17 ${-len + 2} Q-26 ${-len - 3} -34 ${-len + 2}Z" fill="${c}" stroke="${L}" stroke-width="1"/>
  <path d="M0 ${-len - 32} Q-10 ${-len - 14} -17 ${-len + 2} M0 ${-len - 32} Q10 ${-len - 14} 17 ${-len + 2}" stroke="${L}" stroke-width="0.7" fill="none" opacity="0.6"/>`;
const UMB_CLOSED = `<path d="M0 -2 q-5 -2 -5 -7" stroke="${L}" stroke-width="1.6" fill="none"/><path d="M0 -2 V40" stroke="${L}" stroke-width="1.6"/><path d="M-4.5 10 Q0 8 4.5 10 L1 36 H-1Z" fill="#EF4444" stroke="${L}" stroke-width="0.8"/>`;
/** Hộp bánh mì kẹp (gốc giữa ngực). */
const LUNCH = `<g transform="translate(0 -22)"><rect x="-16" y="-8" width="32" height="18" rx="3" fill="#7DD3FC" stroke="${L}" stroke-width="0.9"/>
  ${[-8, 6].map((x) => `<path d="M${x - 7} 4 L${x} -10 L${x + 7} 4Z" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/><path d="M${x - 5} 1 L${x + 5} 1" stroke="#22C55E" stroke-width="2"/>`).join('')}</g>`;
/** Điện thoại của bố cầm trước ngực. */
const PHONE = `<g transform="translate(0 -26)"><rect x="-7" y="-12" width="14" height="24" rx="2.4" fill="#1F2937" stroke="${L}" stroke-width="0.8"/><rect x="-5.4" y="-9.6" width="10.8" height="18" rx="1" fill="#7DD3FC"/><circle cx="0" cy="-2" r="3.4" fill="#FDE047"/></g>`;
const FOOTBALL = `<circle r="10" fill="#fff" stroke="#334155" stroke-width="1.2"/><path d="M0 -4 l4 3 -1.6 4.6 h-4.8 l-1.6 -4.6Z" fill="#1F2937"/><path d="M0 -4 V-10 M4 -1 L9.6 -3 M2.4 3.6 L5.8 8 M-2.4 3.6 L-5.8 8 M-4 -1 L-9.6 -3" stroke="#1F2937" stroke-width="1"/>`;
const SANDWICH = `<path d="M-10 6 L0 -10 L10 6Z" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/><path d="M-7 2 H7" stroke="#22C55E" stroke-width="2.4"/>`;

const POSES = {
  e066_write: { R: [150, 160], L: [10, 4], head: -4 },
  e066_sitThink: { R: [30, -150], L: [22, -40], dy: 20, head: 8 },
  e066_sitShrug: { R: [50, 130], L: [50, 130], dy: 20, head: -5 },
  e066_pat: { R: [84, 96], L: [22, -40], dy: 20, head: 6 },
  e066_umb: { R: [-6, -6], L: [10, 4] },
  e066_umbPhone: { R: [-6, -6], L: [26, -100], head: 6 },
  e066_phone: { R: [26, -100], L: [26, -100], head: 6 },
  e066_box: { R: [26, -100], L: [26, -100] },
};
const PROPS = { e066_umbK: UMB(64), e066_umbA: UMB(78, '#2563EB'), e066_umbC: UMB_CLOSED };

function bg() {
  const board = `<rect x="${X.board - 8}" y="54" width="${286}" height="${146}" rx="4" fill="#A16207" stroke="${L}"/>
    <rect x="${X.board}" y="62" width="270" height="130" fill="#166534"/>
    <text x="${X.board + 135}" y="84" ${CHALK} font-size="17"><tspan class="e066-w e066-w1">Picnic</tspan> <tspan class="e066-w e066-w2">on Sunday</tspan></text>
    <g class="e066-park"><g transform="translate(${X.board + 135} 150)"><ellipse cx="10" cy="14" rx="46" ry="10" fill="#38BDF8" stroke="#F8FAFC"/>
      <path d="M-100 -6 V20 M-86 -6 V20" stroke="#F8FAFC" stroke-width="2"/><circle cx="-100" cy="-14" r="12" fill="none" stroke="#F8FAFC" stroke-width="2"/><circle cx="-86" cy="-20" r="10" fill="none" stroke="#F8FAFC" stroke-width="2"/>
      <path d="M100 -2 V20" stroke="#F8FAFC" stroke-width="2"/><circle cx="100" cy="-12" r="12" fill="none" stroke="#F8FAFC" stroke-width="2"/>
      <text x="0" y="-26" ${CHALK} font-size="17">Thu Le Park</text></g></g>
    <g class="e066-plans">
      ${[0, 1].map((i) => `<rect x="${X.board + 10 + i * 128}" y="94" width="122" height="92" rx="4" fill="none" stroke="#F8FAFC" stroke-width="1.6" stroke-dasharray="5 3"/>
        <text x="${X.board + 71 + i * 128}" y="110" ${CHALK} font-size="14">Plan ${i ? 'B' : 'A'}</text>`).join('')}
      <g class="e066-pa"><g transform="translate(${X.board + 71} 150)">
        <g transform="translate(36 -22)"><circle r="9" fill="#FDE047" stroke="#F59E0B"/>${Array.from({ length: 8 }, (_, k) => `<path d="M0 -12 V-16" stroke="#FDE047" stroke-width="2" transform="rotate(${k * 45})"/>`).join('')}</g>
        <rect x="-56" y="20" width="112" height="12" rx="3" fill="#4ADE80"/>
        <g class="e066-hopA"><circle cx="-24" cy="2" r="5" fill="none" stroke="#F8FAFC" stroke-width="1.6"/><path d="M-24 7 V16 M-24 16 l-4 6 M-24 16 l4 6 M-24 10 l-6 -4 M-24 10 l6 -4" stroke="#F8FAFC" stroke-width="1.6"/></g>
        <g class="e066-hopB"><circle cx="18" cy="2" r="5" fill="none" stroke="#F8FAFC" stroke-width="1.6"/><path d="M18 7 V16 M18 16 l-4 6 M18 16 l4 6 M18 10 l-6 -4 M18 10 l6 -4" stroke="#F8FAFC" stroke-width="1.6"/></g>
        <g class="e066-hopA"><circle cx="-2" cy="16" r="4" fill="#fff"/></g></g></g>
      <g class="e066-pb"><g transform="translate(${X.board + 199} 146)">
        <g transform="translate(-30 -22)"><ellipse rx="16" ry="7" fill="#CBD5E1"/><ellipse cx="-6" cy="-5" rx="8" ry="6" fill="#CBD5E1"/><ellipse cx="6" cy="-6" rx="9" ry="7" fill="#CBD5E1"/>
          <g class="e066-bdrops">${[-10, -2, 6, 12].map((x, k) => `<path d="M${x} ${8 + (k % 2) * 4} l-2 6" stroke="#7DD3FC" stroke-width="1.6" stroke-linecap="round"/>`).join('')}</g></g>
        <path d="M-6 -10 L22 -26 L50 -10Z" fill="none" stroke="#F8FAFC" stroke-width="1.6"/><path d="M-4 -8 H48 M-2 26 H46" stroke="#F8FAFC" stroke-width="2"/>
        ${[2, 14, 26, 38].map((x) => `<path d="M${x} -6 V24" stroke="#F8FAFC" stroke-width="2.4"/>`).join('')}
        <text x="22" y="34" ${CHALK} font-size="9">museum</text></g></g>
    </g>`;
  const rainDrops = (x, w, top, h, cls) => `<g class="${cls}">${Array.from({ length: Math.floor(w / 14) }, (_, i) => `<path class="e066-drop" style="animation-delay:${(((i * 37) % 10) / 10) * -0.6}s" d="M${x + i * 14 + (i % 3) * 4} ${top + ((i * 53) % h)} l-4 13" stroke="#60A5FA" stroke-width="2" stroke-linecap="round"/>`).join('')}</g>`;
  return `
  <!-- Lớp học -->
  ${room(0, X.door, FLOOR, '#E0F2FE')}
  ${board}
  <g class="e066-lb e066-lb-park">${label(X.board + 135, 230, 'picnic', '#16A34A', 15)}</g>
  ${windowBox(X.win, 70, 100, 96)}
  <rect x="${X.win}" y="70" width="100" height="96" fill="#94A3B8" opacity="0.55"/>
  ${rainDrops(X.win + 4, 92, 74, 76, 'e066-wrain')}
  <g class="e066-lb e066-lb-season">${label(X.win + 50, 200, 'rainy season', '#2563EB', 15)}</g>
  ${doorway(X.door, FLOOR)}
  <!-- Hiên trường có mái che -->
  ${room(X.door + 12, X.roof - X.door - 12, FLOOR, '#FDE68A', '#E7E5E4')}
  <rect x="${X.door + 30}" y="40" width="110" height="26" rx="4" fill="#fff" stroke="${L}"/><text x="${X.door + 85}" y="59" text-anchor="middle" ${NUN} font-size="15" fill="#1D4ED8">SCHOOL</text>
  <!-- Sân trường mưa, cổng -->
  ${sky(X.roof, 1700 - X.roof, 315, 'e066sky')}
  <rect x="${X.roof}" y="0" width="${1700 - X.roof}" height="${FLOOR}" fill="#64748B" opacity="0.35"/>
  ${cloud(1260, 46, 1.1, 0)}${cloud(1480, 34, 1.2, 2)}
  <rect x="${X.roof}" y="${FLOOR - 40}" width="${1700 - X.roof}" height="40" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(1300, FLOOR - 4, 0.9, '')}${tree(1660, FLOOR - 4, 0.8, '')}
  <g transform="translate(${X.gate} 0)"><rect x="-8" y="176" width="16" height="${FLOOR - 176}" fill="#E7E5E4" stroke="${L}"/><rect x="86" y="176" width="16" height="${FLOOR - 176}" fill="#E7E5E4" stroke="${L}"/>
    <path d="M8 196 H86 M8 220 H86 M8 244 H86" stroke="#475569" stroke-width="2.4"/>${[20, 36, 52, 68].map((x) => `<path d="M${x} 186 V${FLOOR - 4}" stroke="#475569" stroke-width="2"/>`).join('')}</g>
  <rect x="${X.roof}" y="${FLOOR}" width="${1700 - X.roof}" height="${315 - FLOOR}" fill="#94A3B8" stroke="${L}"/>
  ${Array.from({ length: 10 }, (_, i) => `<ellipse cx="${X.roof + 60 + i * 58}" cy="${FLOOR + 14 + (i % 2) * 8}" rx="16" ry="3" fill="#BAE6FD" opacity="0.8"/>`).join('')}`;
}

function fg() {
  const rainDrops = (x, w) => `<g class="e066-yrain">${Array.from({ length: Math.floor(w / 13) }, (_, i) => `<path class="e066-drop" style="animation-delay:${(((i * 37) % 10) / 10) * -0.6}s" d="M${x + i * 13 + (i % 3) * 4} ${20 + ((i * 53) % 230)} l-4 13" stroke="#60A5FA" stroke-width="2" stroke-linecap="round"/>`).join('')}</g>`;
  const friends = `${[['en_tom', -36], ['mai', 0], ['nam', 36]].map(([w, dx]) => `<g transform="translate(${dx} 6)">${headOnly(w, { s: 0.7, mood: 'joy' })}</g>`).join('')}`;
  const minhNo = `<g transform="translate(-26 0)"><path d="M-14 -4 L0 -14 L14 -4Z" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>${[-10, -3, 4, 11].map((x) => `<path d="M${x} -3 V12" stroke="${L}" stroke-width="2"/>`).join('')}<path d="M-14 13 H14" stroke="${L}" stroke-width="2"/></g>
    <path d="M-6 0 h8 l-3 -3 m3 3 l-3 3" stroke="${L}" stroke-width="1.4" fill="none"/>
    <g transform="translate(28 0)"><g transform="scale(1.3)">${FOOTBALL}</g><path class="e066-x" d="M-14 -14 L14 14 M14 -14 L-14 14" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/></g>`;
  const tomYes = `<g transform="translate(-28 0)"><rect x="-24" y="-22" width="48" height="44" rx="3" fill="#fff" stroke="${L}" stroke-width="0.9"/><rect x="-24" y="-22" width="48" height="11" rx="2" fill="#EF4444" stroke="${L}" stroke-width="0.9"/>
      <g class="e066-page" style="transform-origin:0px -11px"><rect x="-22" y="-11" width="44" height="31" fill="#fff"/><text x="0" y="3" text-anchor="middle" ${NUN} font-size="12" fill="#1D4ED8">next</text><text x="0" y="16" text-anchor="middle" ${NUN} font-size="12" fill="#1D4ED8">week</text></g></g>
    <g transform="translate(30 -4)"><g class="e066-bounce"><g transform="scale(1.3)">${FOOTBALL}</g></g><path d="M-14 16 l5 5 l10 -12" stroke="#16A34A" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const phoneBig = `<g class="e066-screen"><g transform="translate(${M2} 100)"><rect x="-38" y="-58" width="76" height="116" rx="10" fill="#1F2937" stroke="${L}" stroke-width="1.2"/>
    <rect x="-32" y="-48" width="64" height="96" rx="4" fill="#E0F2FE"/>
    <text x="0" y="-32" text-anchor="middle" ${NUN} font-size="12" fill="#1E3A8A">Sunday</text>
    <g transform="translate(0 -2)"><g class="ek-spin"><circle r="15" fill="#FDE047" stroke="#F59E0B" stroke-width="1.6"/>${Array.from({ length: 8 }, (_, k) => `<path d="M0 -19 V-24" stroke="#FBBF24" stroke-width="3" stroke-linecap="round" transform="rotate(${k * 45})"/>`).join('')}</g></g>
    <text x="0" y="38" text-anchor="middle" ${NUN} font-size="14" fill="#EA580C">sunny</text></g></g>`;
  return `
  <!-- bàn học (che chân người ngồi) -->
  ${desk(X.tom, FLOOR)}${desk(X.minh, FLOOR, '#FB923C')}${desk(X.mai, FLOOR)}
  <!-- mái hiên -->
  <path d="M${X.door + 12} 104 H${X.roof + 18} L${X.roof + 6} 118 H${X.door + 12}Z" fill="#DC2626" stroke="${L}" stroke-width="1.2"/>
  <rect x="${X.roof - 8}" y="118" width="12" height="${FLOOR - 118}" fill="#F5F5F4" stroke="${L}"/>
  ${rainDrops(X.roof + 14, 1700 - X.roof)}
  ${bush(X.roof + 120, FLOOR + 10, 0.9)}
  ${thought(660, 92, 150, 84, minhNo, [X.minh + 6, 172], 'e066-th e066-th-minh')}
  ${thought(640, 92, 150, 84, tomYes, [X.tom + 20, 174], 'e066-th e066-th-tom')}
  <g class="e066-bulb"><g transform="translate(${X.lan} 118)"><circle r="12" fill="#FEF08A" stroke="${L}"/><rect x="-6" y="10" width="12" height="7" rx="2" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/>
    ${[0, 60, 120, 180, 240, 300].map((r) => `<path d="M0 -17 V-23" stroke="#F59E0B" stroke-width="2.4" stroke-linecap="round" transform="rotate(${r})"/>`).join('')}</g>${label(X.lan + 70, 128, 'advice', '#7C3AED', 15)}</g>
  <g class="e066-lb e066-lb-dry">${label(1150, 120, 'dry', '#2563EB', 16)}</g>
  ${thought(M2 + 6, 86, 150, 84, friends, [M2, 160], 'e066-th e066-th-happy')}
  ${phoneBig}
  <g class="e066-lb e066-lb-ball">${label(M2 + 66, 112, 'my ball', '#EA580C', 16)}</g>`;
}

const CSS = `
.e066-lb { opacity: 0; transition: opacity .35s; }
.st-lb-park .e066-lb-park, .st-lb-season .e066-lb-season, .st-lb-dry .e066-lb-dry, .st-lb-ball .e066-lb-ball { opacity: 1; }
/* bảng: chữ hiện dần, công viên → hai kế hoạch */
.e066-w, .e066-park, .e066-plans, .e066-pa, .e066-pb { opacity: 0; transition: opacity .45s; }
.st-w1 .e066-w1, .st-w2 .e066-w2, .st-park .e066-park, .st-plans .e066-plans, .st-pa .e066-pa, .st-pb .e066-pb { opacity: 1; }
.st-plans .e066-park { opacity: 0; }
.st-pa .e066-hopA { animation: e066Hop .4s ease-in-out infinite alternate; }
.st-pa .e066-hopB { animation: e066Hop .4s ease-in-out infinite alternate-reverse; }
@keyframes e066Hop { to { transform: translateY(-5px); } }
.st-pb .e066-bdrops { animation: e066BDrop .5s linear infinite; }
@keyframes e066BDrop { from { transform: translateY(-3px); opacity: .3; } to { transform: translateY(4px); opacity: 1; } }
/* mưa */
.e066-drop { animation: e066Drop .55s linear infinite; }
@keyframes e066Drop { from { transform: translate(4px, -24px); opacity: 0; } 20% { opacity: 1; } to { transform: translate(-8px, 30px); opacity: 0; } }
.e066-wrain { opacity: .5; transition: opacity .6s; } .st-heavy .e066-wrain { opacity: 1; }
/* bong bóng nghĩ, bóng đèn ý tưởng, màn hình điện thoại */
.e066-th, .e066-bulb, .e066-screen { opacity: 0; transform: scale(.4); transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.e066-th-minh, .e066-th-tom { transform-origin: 590px 170px; }
.e066-th-happy { transform-origin: ${M2}px 160px; }
.e066-bulb { transform-origin: ${X.lan}px 150px; }
.e066-screen { transform-origin: ${M2}px 170px; }
.st-thMinh .e066-th-minh, .st-thTom .e066-th-tom, .st-thHappy .e066-th-happy, .st-bulb .e066-bulb, .st-screen .e066-screen { opacity: 1; transform: scale(1); }
.e066-x { opacity: 0; transition: opacity .3s; } .st-xOn .e066-x { opacity: 1; }
.st-thTom .e066-page { animation: e066Page 1s ease-in-out 2; }
@keyframes e066Page { 50% { transform: scaleY(.1); } }
.st-thTom .e066-bounce { animation: e066Hop .35s ease-in-out infinite alternate; }
/* lo lắng: run run */
.es-ac.act-e066-worry .pp-headw { animation: e066Worry .5s ease-in-out infinite alternate; }
@keyframes e066Worry { from { transform: rotate(4deg); } to { transform: rotate(10deg); } }
.es-ac.act-e066-pat .pp-fowR { animation: e066Pat .3s ease-in-out infinite alternate; }
@keyframes e066Pat { from { transform: rotate(0deg); } to { transform: rotate(-14deg); } }
.es-ac.act-e066-chalk .pp-fowR { animation: e066Chalk .22s ease-in-out infinite alternate; }
@keyframes e066Chalk { from { transform: rotate(-10deg); } to { transform: rotate(10deg); } }
@media (prefers-reduced-motion: reduce) {
  .e066-drop { animation-duration: 1.1s; }
  .st-pa .e066-hopA, .st-pa .e066-hopB, .st-thTom .e066-bounce { animation-duration: .9s; }
  .st-pb .e066-bdrops { animation-duration: 1s; }
  .st-thTom .e066-page { animation-duration: 1.8s; animation-iteration-count: 1; }
  .es-ac.act-e066-worry .pp-headw { animation-duration: 1.1s; }
  .es-ac.act-e066-pat .pp-fowR { animation-duration: .7s; }
  .es-ac.act-e066-chalk .pp-fowR { animation-duration: .5s; }
}
`;

const off = (st, ...names) => names.forEach((n) => st.set(n, false));

const BEATS = [
  { key: ['going to have a picnic', 'Thu Le Park on Sunday'], icon: '🧺', label: 'a picnic', async play(st) {
    st.look(X.hoa - 120, { dur: 500 });
    st.face('hoa', -1); st.pose('hoa', 'e066_write'); st.act('hoa', 'e066-chalk');
    st.sfx('pencil', { vol: 0.7 }); st.set('st-w1');
    await st.wait(800);
    st.sfx('pencil', { vol: 0.7 }); st.set('st-w2');
    await st.wait(800);
    st.sfx('pencil', { vol: 0.7 }); st.set('st-park');
    await st.wait(700);
    st.act('hoa', null); st.face('hoa', 1); st.pose('hoa', 'open'); st.mood('hoa', 'joy');
    st.set('st-lb-park');
    for (const id of ['tom', 'minh', 'mai']) { st.pose(id, 'sitClap'); st.act(id, 'clap'); st.mood(id, 'joy'); }
    st.sfx('cheer', { vol: 0.6 });
    await st.wait(1300);
  } },
  { key: ['the rainy season', 'making two plans'], icon: '🌧️', label: 'two plans', async play(st) {
    st.set('st-lb-park', false);
    for (const id of ['tom', 'minh', 'mai']) { st.act(id, null); st.pose(id, 'sitDesk'); st.mood(id, 'happy'); }
    st.look(X.win - 80, { dur: 800 });
    st.set('st-heavy'); st.sfx('rain', { vol: 0.9 });
    st.pose('hoa', 'point'); st.face('hoa', 1); st.mood('hoa', 'sad');
    await st.wait(600);
    st.set('st-lb-season');
    for (const id of ['tom', 'minh', 'mai']) { st.face(id, 1); st.mood(id, 'sad'); }
    await st.wait(1300);
    st.set('st-lb-season', false);
    st.look(X.hoa - 120, { dur: 800 });
    for (const id of ['tom', 'minh', 'mai']) { st.face(id, -1); st.mood(id, 'happy'); }
    st.face('hoa', -1); st.mood('hoa', 'happy'); st.pose('hoa', 'e066_write'); st.act('hoa', 'e066-chalk');
    await st.wait(500);
    st.set('st-plans'); st.sfx('pencil', { vol: 0.7 });
    await st.wait(900);
    st.act('hoa', null); st.face('hoa', 1); st.pose('hoa', 'pointUp'); st.sfx('pop', { vol: 0.5 });
    await st.wait(700);
  } },
  { key: ['If it is sunny', 'play games on the grass'], icon: '☀️', label: 'sunny: games', async play(st) {
    st.face('hoa', -1); st.pose('hoa', 'point'); st.talk('hoa', true);
    await st.wait(400);
    st.set('st-pa'); st.sfx('ding', { vol: 0.5 });
    await st.wait(1300);
    st.sfx('giggle', { vol: 0.5 });
    await st.wait(1100);
    st.talk('hoa', false);
  } },
  { key: ['If it rains tomorrow', 'visit the museum instead'], icon: '🏛️', label: 'rain: museum', async play(st) {
    st.talk('hoa', true);
    await st.wait(300);
    st.set('st-pb'); st.sfx('rain', { vol: 0.5 });
    await st.wait(1500);
    st.sfx('page-turn', { vol: 0.6 });
    await st.wait(1200);
    st.talk('hoa', false); st.face('hoa', 1); st.pose('hoa', 'open');
  } },
  { key: ['Minh looks worried'], icon: '😟', label: 'worried', async play(st) {
    st.look(X.minh + 20, { dur: 700 });
    st.pose('minh', 'e066_sitThink'); st.mood('minh', 'sad'); st.act('minh', 'e066-worry');
    st.sfx('tick', { vol: 0.6 });
    st.fx('drops', X.minh + 18, 176, { quiet: true });
    await st.wait(1500);
  } },
  { key: ['If we go to the museum', "we won't play football"], icon: '⚽', label: 'no football', async play(st) {
    st.act('minh', null);
    st.set('st-thMinh'); st.sfx('pop', { vol: 0.5 });
    st.talk('minh', true);
    await st.wait(1300);
    st.set('st-xOn'); st.sfx('buzz-no', { vol: 0.6 });
    st.pose('minh', 'e066_sitShrug');
    await st.wait(1300);
    st.talk('minh', false);
  } },
  { key: ["Don't worry", 'Tom says'], icon: '🤝', label: "don't worry", async play(st) {
    off(st, 'st-thMinh', 'st-xOn');
    st.face('tom', 1); st.pose('tom', 'e066_pat'); st.act('tom', 'e066-pat'); st.mood('tom', 'joy');
    st.sfx('clap', { vol: 0.25, rate: 1.6 });
    await st.say('tom', "Don't worry!", 1500);
    st.act('tom', null); st.pose('minh', 'sitDesk'); st.mood('minh', 'happy');
    await st.wait(300);
  } },
  { key: ['If it rains', 'play football next week'], icon: '📅', label: 'next week', async play(st) {
    st.pose('tom', 'sitDesk'); st.talk('tom', true);
    st.set('st-thTom'); st.sfx('pop', { vol: 0.5 });
    await st.wait(400);
    st.sfx('page-turn', { vol: 0.7 });
    await st.wait(1100);
    st.sfx('kick', { vol: 0.6 });
    st.talk('tom', false); st.mood('minh', 'joy'); st.pose('minh', 'sitClap'); st.act('minh', 'clap');
    await st.wait(1300);
  } },
  { key: ['Lan gives her brother some advice'], icon: '💡', label: 'advice', async play(st) {
    off(st, 'st-thTom');
    st.act('minh', null); st.bag('minh', true); st.mood('minh', 'happy');
    st.sfx('bag-on', { vol: 0.6 });
    await st.walk('minh', X.lan - 56, { speed: 140, lead: 40 });
    st.face('minh', 1);
    st.pose('lan', 'pointUp'); st.mood('lan', 'joy'); st.set('st-bulb'); st.sfx('ding', { vol: 0.6 });
    st.talk('lan', true);
    await st.wait(1400);
    st.talk('lan', false);
  } },
  { key: ['If you take an umbrella', 'you will stay dry'], icon: '☂️', label: 'umbrella', async play(st) {
    off(st, 'st-bulb');
    st.pose('lan', 'give'); st.sfx('whoosh', { vol: 0.5 });
    await st.fly(`<g transform="rotate(70) translate(0 -18)">${UMB_CLOSED}</g>`, [X.lan + 10, 210], [X.lan - 40, 230], { size: 30, dur: 500 });
    st.pose('lan', 'stand');
    st.hold('minh', 'e066_umbK'); st.pose('minh', 'e066_umb'); st.sfx('pop', { vol: 0.6 });
    await st.wait(300);
    await st.walk('minh', X.roof + 70, { speed: 130, lead: -20 });
    st.face('minh', -1); st.mood('minh', 'joy');
    st.sfx('drip', { vol: 0.8 });
    for (let i = 0; i < 3; i++) { st.fx('drops', X.roof + 70, 150, { quiet: true }); await st.wait(380); }
    st.set('st-lb-dry'); st.sfx('ding', { vol: 0.4 });
    await st.wait(800);
  } },
  { key: ['If you bring sandwiches', 'everyone will be happy'], icon: '🥪', label: 'sandwiches', async play(st) {
    st.set('st-lb-dry', false);
    st.chest('lan', LUNCH); st.pose('lan', 'e066_box');
    await st.walk('lan', X.roof - 44, { speed: 120, follow: false });
    st.face('lan', 1); st.sfx('click', { vol: 0.6 });
    await st.wait(300);
    st.chest('lan', null); st.pose('lan', 'give'); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(SANDWICH, [X.roof - 28, 230], [X.roof + 70, 230], { size: 24, dur: 500 });
    st.pose('lan', 'stand');
    st.chest('minh', LUNCH); st.pose('minh', 'e066_umbPhone');
    await st.wait(200);
    await Promise.all([
      st.walk('minh', M2, { speed: 120, lead: 20 }),
      st.walk('lan', M2 - 76, { speed: 120, follow: false }),
    ]);
    st.hold('minh', 'e066_umbC'); st.face('minh', 1); st.sfx('whoosh', { vol: 0.3, rate: 1.4 });
    st.face('lan', 1);
    st.set('st-thHappy'); st.sfx('giggle', { vol: 0.6 });
    await st.wait(600);
    st.fx('hearts', M2, 120);
    await st.wait(1200);
  } },
  { key: ["checks the weather on Dad's phone", 'smiles'], icon: '📱', label: 'the weather', async play(st) {
    st.set('st-thHappy', false);
    st.chest('minh', null); st.hold('minh', null); st.pose('minh', 'stand');
    await st.walk('dad', M2 + 70, { speed: 140, follow: false });
    st.hold('dad', 'e066_umbC'); st.face('dad', -1); st.pose('dad', 'give'); st.sfx('whoosh', { vol: 0.3, rate: 1.4 });
    await st.wait(300);
    st.pose('dad', 'stand');
    st.chest('minh', PHONE); st.pose('minh', 'e066_phone'); st.sfx('beep', { vol: 0.6 });
    await st.wait(400);
    st.set('st-screen'); st.sfx('ding', { vol: 0.5 });
    await st.wait(700);
    st.mood('minh', 'joy'); st.sfx('giggle', { vol: 0.4 });
    await st.wait(1000);
  } },
  { key: ['If it is sunny on Sunday', 'I will bring my ball'], icon: '⚽', label: 'my ball', async play(st) {
    st.set('st-screen', false);
    st.chest('minh', null); st.pose('minh', 'stand');
    st.pose('dad', 'give');
    await st.wait(200);
    st.pose('dad', 'stand'); st.pose('minh', 'raise'); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(FOOTBALL, [M2 - 10, 220], [M2 + 14, 160], { size: 22, dur: 500 });
    st.hold('minh', 'ball'); st.set('st-lb-ball'); st.sfx('kick', { vol: 0.5 });
    st.act('minh', 'jump'); st.mood('minh', 'joy'); st.mood('lan', 'joy'); st.mood('dad', 'joy');
    st.pose('lan', 'clap'); st.act('lan', 'clap'); st.sfx('cheer', { vol: 0.5 });
    await st.wait(1600);
    st.act('lan', null); st.act('minh', null);
  } },
];

export default {
  id: 'en066', worldW: 1700, floor: FLOOR, viewTop: 30, camStart: X.hoa - 120 - 250, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: X.hoa, s: 0.95, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: X.tom, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: X.minh, face: -1 },
    { id: 'mai', kind: 'kid', who: 'mai', x: X.mai, s: 0.98, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: X.lan, s: 1.08, face: -1 },
    { id: 'dad', kind: 'adult', who: 'en_dad', x: 1330, s: 0.95, face: -1 },
  ],
  init(st) {
    for (const id of ['tom', 'minh', 'mai']) st.pose(id, 'sitDesk');
    st.hold('dad', 'e066_umbA'); st.pose('dad', 'e066_umb');
  },
};
