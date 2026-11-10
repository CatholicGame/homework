/**
 * Bài 31 "Let's Play!": phòng khách nhà Minh (đồng hồ 3 giờ, lịch SUNDAY, nắng nóng ngoài cửa sổ) → bàn làm diều
 * → cửa nhà → phố (bể bơi đóng cửa) → công viên lộng gió (diều rồng bay cao, Lucky đuổi theo sủa).
 * Lời rủ hiện thành bong bóng nghĩ (bể bơi, diều); câu "says / asks …" thì tên người nói hiện trên đầu.
 * Toạ độ cảnh: rộng 2240, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, sky, cloud, sun, room, rug, label } from '../kit.js';

const FLOOR = 282;
const F = 'font-family="Nunito, sans-serif" font-weight="900"';

// ── Đồ vật ────────────────────────────────────────────────────────────────
/** Diều rồng đỏ (gốc giữa); dragon = vẽ con rồng (hiện dần khi Tom vẽ). */
const KITE = (dragonCls = '') => `<path d="M0 -30 L22 -4 L0 30 L-22 -4Z" fill="#EF4444" stroke="${L}" stroke-width="1.4"/><path d="M0 -30 V30 M-22 -4 H22" stroke="#A16207" stroke-width="1.6"/>
  <g class="${dragonCls}"><path class="e031-drag" d="M-12 6 Q-8 -6 0 -2 Q8 2 6 -10 Q4 -18 12 -16" stroke="#FACC15" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <circle cx="12" cy="-16" r="4.4" fill="#FACC15" stroke="${L}" stroke-width="0.8"/><circle cx="13" cy="-17" r="1.1" fill="${L}"/><path d="M8 -20 l-2 -4 M11 -21 l0 -4" stroke="#FACC15" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M-12 6 l-4 4 M-6 -2 l-2 -4 M2 -3 l1 -4" stroke="#F59E0B" stroke-width="1.4" stroke-linecap="round"/></g>
  <path d="M0 30 q-8 10 0 18 q8 8 0 18" stroke="${L}" stroke-width="1.2" fill="none"/>${[40, 54].map((y) => `<path d="M-5 ${y} l5 -4 l5 4 l-5 4Z" fill="#FACC15" stroke="${L}" stroke-width="0.6"/>`).join('')}`;
const PAPER = `<rect x="-14" y="-10" width="28" height="20" rx="1" fill="#FCA5A5" stroke="${L}" stroke-width="0.9"/><rect x="-11" y="-13" width="28" height="20" rx="1" fill="#EF4444" stroke="${L}" stroke-width="0.9"/>`;
const STICKS = `<path d="M-14 6 L14 -6 M-14 -2 L14 2" stroke="${L}" stroke-width="4" stroke-linecap="round"/><path d="M-14 6 L14 -6 M-14 -2 L14 2" stroke="#D6A35C" stroke-width="2.4" stroke-linecap="round"/>`;
const STRING = `<circle r="8" fill="#F8FAFC" stroke="${L}" stroke-width="0.9"/><path d="M-6 -3 Q0 -8 6 -3 M-7 2 Q0 -3 7 2 M-5 6 Q0 2 5 6" stroke="#94A3B8" stroke-width="1" fill="none"/><path d="M8 0 q6 4 10 0" stroke="#94A3B8" stroke-width="1" fill="none"/>`;
/** Diều Tom cầm khi đi (thing: gốc ở mặt đất dưới chân Tom, diều ở ngang ngực). */
const KITE_HELD = `<g transform="translate(0 -84) scale(0.8)">${KITE()}</g>`;
const bulb = `<circle r="13" fill="#FEF08A" stroke="${L}" stroke-width="1.2"/><rect x="-6" y="12" width="12" height="8" rx="2" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/>
  <path d="M-4 4 L0 -3 L4 4" stroke="#F59E0B" stroke-width="1.6" fill="none"/>${[0, 60, 120, 180, 240, 300].map((r) => `<path d="M0 -18 V-24" stroke="#FACC15" stroke-width="2.6" stroke-linecap="round" transform="rotate(${r})"/>`).join('')}`;
const nameTag = (cls, x, y, text, c) => `<g class="e031-pop ${cls}">${label(x, y, text, c, 15)}<path d="M${x - 4} ${y + 6} l4 8 l4 -8" fill="#fff" stroke="${L}"/></g>`;
const tree = (x, s = 1) => `<g transform="translate(${x} ${FLOOR - 6}) scale(${s})"><rect x="-6" y="-60" width="12" height="60" rx="3" fill="#A16207" stroke="${L}"/>
  <g class="e031-tree"><circle cx="0" cy="-86" r="34" fill="#22C55E" stroke="${L}"/><circle cx="-22" cy="-70" r="20" fill="#16A34A" stroke="${L}"/><circle cx="22" cy="-72" r="22" fill="#4ADE80" stroke="${L}"/></g></g>`;

function bg() {
  return `
  ${sky(760, 1480, 315, 'e031sky')}
  ${cloud(900, 50, 0.9, 0)}${cloud(1300, 64, 1, 3)}${cloud(1900, 46, 0.9, 5)}
  <g transform="translate(1180 70)">${sun(24)}</g>
  <!-- Phố: hàng rào, bể bơi đóng cửa, biển chỉ đường -->
  <path d="M760 236 Q960 206 1160 232 T1560 224 T2240 230 V282 H760Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(1060 0)"><rect x="-90" y="130" width="180" height="152" fill="#BAE6FD" stroke="${L}" stroke-width="1.4"/><path d="M-100 130 H100 L90 112 H-90Z" fill="#0EA5E9" stroke="${L}" stroke-width="1.2"/>
    ${label(0, 152, 'POOL', '#0369A1', 15)}<path d="M-70 196 q10 -6 20 0 q10 6 20 0 M10 196 q10 -6 20 0 q10 6 20 0" stroke="#fff" stroke-width="3" fill="none"/>
    <rect x="-26" y="206" width="52" height="76" fill="#64748B" stroke="${L}"/>${[214, 226, 238, 250, 262, 274].map((y) => `<path d="M-26 ${y} H26" stroke="#94A3B8" stroke-width="2"/>`).join('')}
    <g transform="rotate(-6 0 220)"><rect x="-34" y="212" width="68" height="22" rx="4" fill="#DC2626" stroke="${L}"/><text x="0" y="228" text-anchor="middle" ${F} font-size="13" fill="#fff">CLOSED</text></g></g>
  <g transform="translate(870 0)"><rect x="-3" y="170" width="6" height="112" fill="#78716C"/><path d="M-36 160 H30 L42 174 L30 188 H-36Z" fill="#16A34A" stroke="${L}"/><text x="-2" y="179" text-anchor="middle" ${F} font-size="13" fill="#fff">PARK</text></g>
  <!-- Công viên -->
  ${tree(1310, 1.1)}${tree(1990, 1.3)}${tree(2170, 0.9)}${tree(1780, 0.8)}
  ${[1250, 1290].map((x) => `<rect x="${x - 9}" y="140" width="18" height="${FLOOR - 140}" fill="#A16207" stroke="${L}"/>`).join('')}<path d="M1236 146 Q1270 116 1304 146" stroke="#16A34A" stroke-width="9" fill="none" stroke-linecap="round"/>
  <rect x="760" y="${FLOOR - 4}" width="1480" height="${319 - FLOOR}" fill="#4ADE80" stroke="${L}"/>
  ${Array.from({ length: 31 }, (_, i) => `<path d="M${780 + i * 46} ${FLOOR + 14} l3 -7 l3 7" stroke="#16A34A" stroke-width="1.4" fill="none"/>`).join('')}
  <g class="e031-windl">${[[1360, 120], [1520, 90], [1700, 150], [1860, 110], [2040, 140], [1460, 190]].map(([x, y], i) => `<path class="e031-streak" style="animation-delay:${-i * 0.3}s" d="M${x} ${y} q20 -8 40 0 t40 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.9"/>`).join('')}
    ${[[1400, 160], [1640, 120], [1900, 170]].map(([x, y], i) => `<path class="e031-leaf" style="animation-delay:${-i * 0.5}s" d="M${x} ${y} q6 -8 12 0 q-6 8 -12 0Z" fill="#22C55E" stroke="${L}" stroke-width="0.6"/>`).join('')}</g>
  <!-- Diều bay (dây từ tay Tom) -->
  <g class="e031-flyk"><path d="M1586 196 Q1660 150 1712 92" stroke="#475569" stroke-width="1.2" fill="none"/>
    <g transform="translate(1712 74)"><g class="e031-ksway">${KITE()}</g></g></g>
  <!-- Nhà: phòng khách -->
  ${room(0, 760, FLOOR, '#FDE68A', '#D9A066')}
  <rect x="0" y="12" width="760" height="40" fill="#FCD34D" opacity="0.35"/>
  <!-- Cửa sổ nắng gắt -->
  <rect x="34" y="50" width="118" height="100" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="40" y="56" width="106" height="88" fill="#BAE6FD"/>
  <g transform="translate(112 92)"><g class="e031-hotsun">${sun(18)}</g></g><path d="M40 128 Q80 114 146 126 V144 H40Z" fill="#86EFAC"/>
  <path d="M93 56 V144 M40 100 H146" stroke="#fff" stroke-width="3" opacity="0.8"/>
  <!-- Nhiệt kế -->
  <g transform="translate(176 56)"><rect x="-8" y="0" width="16" height="78" rx="8" fill="#fff" stroke="${L}"/><circle cx="0" cy="82" r="9" fill="#EF4444" stroke="${L}"/>
    <g transform="translate(0 80)"><g class="e031-merc"><rect x="-3.4" y="-70" width="6.8" height="70" fill="#EF4444"/></g></g>
    <g class="e031-pop e031-hotlb">${label(0, -8, 'HOT!', '#DC2626', 13)}</g></g>
  <!-- Đồng hồ 3 giờ + lịch Chủ nhật -->
  <g transform="translate(244 78)"><circle r="22" fill="#fff" stroke="#3B82F6" stroke-width="3"/>${[0, 90, 180, 270].map((r) => `<path d="M0 -18 V-14" stroke="${L}" stroke-width="1.6" transform="rotate(${r})"/>`).join('')}
    <path d="M0 0 V-14 M0 0 H10" stroke="${L}" stroke-width="2.4" stroke-linecap="round"/><circle r="2" fill="${L}"/><text x="0" y="40" text-anchor="middle" ${F} font-size="9" fill="#475569">3 p.m.</text></g>
  <g transform="translate(320 50)"><rect x="-40" y="0" width="80" height="62" rx="5" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-40" y="0" width="80" height="15" rx="5" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    <circle cx="-20" cy="0" r="2.6" fill="#1F2937"/><circle cx="20" cy="0" r="2.6" fill="#1F2937"/><text x="0" y="42" text-anchor="middle" ${F} font-size="15" fill="#DC2626">SUNDAY</text></g>
  <g class="e031-dayglow"><rect x="210" y="40" width="160" height="82" rx="10" fill="none" stroke="#FACC15" stroke-width="4"/></g>
  <!-- Sofa -->
  <rect x="40" y="206" width="150" height="40" rx="10" fill="#60A5FA" stroke="${L}" stroke-width="1.2"/><rect x="40" y="180" width="150" height="34" rx="10" fill="#3B82F6" stroke="${L}" stroke-width="1.2"/>
  <rect x="30" y="196" width="22" height="56" rx="8" fill="#3B82F6" stroke="${L}"/><rect x="178" y="196" width="22" height="56" rx="8" fill="#3B82F6" stroke="${L}"/>
  <path d="M50 252 V262 M180 252 V262" stroke="${L}" stroke-width="4"/>
  ${rug(250, FLOOR, 130, '#FDA4AF')}
  <!-- Kệ đồ làm diều -->
  <rect x="650" y="150" width="80" height="132" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="656" y="156" width="68" height="58" fill="#78350F"/><rect x="656" y="220" width="68" height="56" fill="#92400E"/>
  <rect x="656" y="212" width="68" height="5" fill="#A16207"/>
  <g class="e031-mat1" transform="translate(672 202)">${PAPER}</g><g class="e031-mat2" transform="translate(704 202) scale(0.8)">${STICKS}</g><g class="e031-mat3" transform="translate(690 264)">${STRING}</g>
  ${label(690, 142, 'CRAFTS', '#B45309', 11)}
  <!-- Cửa ra phố -->
  <rect x="740" y="0" width="22" height="104" fill="#E9D5B5" stroke="${L}"/><rect x="740" y="104" width="6" height="178" fill="#C08B5C" stroke="${L}" stroke-width="0.8"/>
  <g class="e031-door"><rect x="746" y="104" width="44" height="178" fill="#B45309" stroke="${L}"/><circle cx="782" cy="200" r="3" fill="#FDE68A"/></g>
  <!-- Diều to trên tường (lời rủ "big red kite") -->
  <g class="e031-pop e031-bigk"><g transform="translate(470 92)"><path d="M0 -44 L34 -6 L0 44 L-34 -6Z" fill="#FEE2E2" stroke="#EF4444" stroke-width="3" stroke-dasharray="7 5"/>
    ${label(0, 6, 'big red kite', '#DC2626', 12)}</g></g>
  <!-- Bong bóng nghĩ: bể bơi / diều -->
  <g class="e031-pop e031-think"><g transform="translate(470 82)"><circle cx="-60" cy="58" r="3" fill="#fff" stroke="${L}"/><circle cx="-50" cy="46" r="5" fill="#fff" stroke="${L}"/>
    <ellipse cx="0" cy="0" rx="68" ry="40" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <g class="e031-tpool"><rect x="-44" y="-18" width="88" height="40" rx="6" fill="#38BDF8" stroke="${L}"/><path d="M-36 -2 q8 -5 16 0 q8 5 16 0 q8 -5 16 0 q8 5 16 0" stroke="#fff" stroke-width="2.4" fill="none"/>
      <path d="M30 -26 V6 M40 -26 V6 M30 -18 H40 M30 -8 H40" stroke="#94A3B8" stroke-width="2"/>
      <g class="e031-closed"><g transform="rotate(-10)"><rect x="-38" y="-6" width="76" height="22" rx="4" fill="#DC2626" stroke="${L}"/><text x="0" y="10" text-anchor="middle" ${F} font-size="14" fill="#fff">CLOSED</text></g></g></g>
    <g class="e031-tkite"><g transform="translate(-14 -6) scale(0.8)">${KITE()}</g><text x="28" y="10" text-anchor="middle" ${F} font-size="26" fill="#7C3AED">?</text></g></g></g>
  <g class="e031-pop e031-bulb"><g transform="translate(372 96)">${bulb}</g></g>
  <!-- Tên người nói -->
  ${nameTag('e031-n-minh1', 336, 136, 'Minh', '#EA580C')}${nameTag('e031-n-lan', 410, 136, 'Lan', '#DB2777')}${nameTag('e031-n-tom', 560, 120, 'Tom', '#16A34A')}${nameTag('e031-n-minh2', 1490, 136, 'Minh', '#EA580C')}
  <g class="e031-pop e031-sundays"><g transform="translate(1530 96)"><rect x="-74" y="-22" width="148" height="44" rx="8" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    ${[0, 1, 2, 3].map((i) => `<g transform="translate(${-54 + i * 36} 0)"><rect x="-14" y="-14" width="28" height="28" rx="4" fill="#FEE2E2" stroke="${L}" stroke-width="0.8"/><text x="0" y="-2" text-anchor="middle" ${F} font-size="8" fill="#DC2626">SUN</text><path d="M-5 6 L-1 10 L6 1" stroke="#16A34A" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`).join('')}</g></g>`;
}

/** Lớp trước: bàn làm diều (che chân), giá vẽ và đồ trên bàn. */
function fg() {
  return `
  <g class="e031-easel"><path d="M604 222 L620 150 L636 222" stroke="#A16207" stroke-width="3" fill="none"/>
    <g class="e031-tablek"><g transform="translate(620 166) scale(0.95)">${KITE('e031-dragon')}</g></g></g>
  <rect x="498" y="230" width="10" height="52" fill="#92400E" stroke="${L}"/><rect x="636" y="230" width="10" height="52" fill="#92400E" stroke="${L}"/>
  <rect x="486" y="222" width="172" height="10" rx="3" fill="#F59E0B" stroke="${L}" stroke-width="1.2"/>
  <g class="e031-it e031-it1" transform="translate(522 216)">${PAPER}</g><g class="e031-it e031-it2" transform="translate(556 218)">${STICKS}</g><g class="e031-it e031-it3" transform="translate(590 214)">${STRING}</g>`;
}

const CSS = `
.e031-pop { opacity: 0; transform: scale(.6); transform-box: fill-box; transform-origin: center; transition: opacity .35s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-think .e031-think, .st-bigk .e031-bigk, .st-bulb .e031-bulb, .st-hot .e031-hotlb, .st-sundays .e031-sundays,
.st-n-minh1 .e031-n-minh1, .st-n-lan .e031-n-lan, .st-n-tom .e031-n-tom, .st-n-minh2 .e031-n-minh2 { opacity: 1; transform: none; }
.e031-dayglow { opacity: 0; transition: opacity .4s; }
.st-day .e031-dayglow { opacity: 1; animation: e031Pulse .6s ease-in-out infinite alternate; }
@keyframes e031Pulse { from { opacity: .35; } to { opacity: 1; } }
.e031-merc { transform-origin: 0 0; transform: scaleY(.5); transition: transform 1.4s ease-out; } .st-hot .e031-merc { transform: scaleY(1); }
.e031-hotsun { transition: transform .8s cubic-bezier(.3,1.6,.6,1); } .st-hot .e031-hotsun { transform: scale(1.35); }
.e031-tkite { display: none; } .st-tkite .e031-tkite { display: inline; } .st-tkite .e031-tpool { display: none; }
.e031-closed { opacity: 0; transform: translateY(-30px); transition: opacity .3s, transform .5s cubic-bezier(.3,1.6,.6,1); } .st-closed .e031-closed { opacity: 1; transform: none; }
.st-bulb .e031-bulb circle { animation: e031Pulse .4s ease-in-out infinite alternate; }
.e031-door { transform-origin: 746px 200px; transition: transform .6s cubic-bezier(.4,0,.2,1); } .st-door .e031-door { transform: scaleX(.15); }
.e031-it { opacity: 0; transition: opacity .25s; } .st-it1 .e031-it1, .st-it2 .e031-it2, .st-it3 .e031-it3 { opacity: 1; }
.st-kite .e031-it { opacity: 0; }
.e031-mat1, .e031-mat2, .e031-mat3 { transition: opacity .2s; } .st-g1 .e031-mat1, .st-g2 .e031-mat2, .st-g3 .e031-mat3 { opacity: 0; }
.e031-easel { opacity: 0; transition: opacity .3s; } .st-kite .e031-easel { opacity: 1; }
.e031-tablek { transition: opacity .2s; } .st-taken .e031-tablek { opacity: 0; }
.e031-drag { stroke-dasharray: 60; stroke-dashoffset: 60; transition: stroke-dashoffset 1.8s linear; }
.e031-dragon > :not(.e031-drag) { opacity: 0; transition: opacity .4s 1.6s; }
.st-dragon .e031-drag { stroke-dashoffset: 0; } .st-dragon .e031-dragon > * { opacity: 1; }
.e031-tree { transform-origin: 0 -60px; animation: e031Sway 3.6s ease-in-out infinite alternate; }
@keyframes e031Sway { from { transform: rotate(-1.6deg); } to { transform: rotate(1.6deg); } }
.st-wind .e031-tree { animation: e031Gust .7s ease-in-out infinite alternate; }
@keyframes e031Gust { from { transform: rotate(2deg) skewX(2deg); } to { transform: rotate(9deg) skewX(8deg); } }
.e031-windl { opacity: 0; transition: opacity .5s; } .st-wind .e031-windl { opacity: 1; }
.e031-streak { animation: e031Streak 1.2s linear infinite; }
@keyframes e031Streak { from { transform: translateX(-60px); opacity: 0; } 30% { opacity: .9; } to { transform: translateX(90px); opacity: 0; } }
.e031-leaf { transform-box: fill-box; animation: e031Leaf 1.6s linear infinite; }
@keyframes e031Leaf { from { transform: translate(-40px, 0) rotate(0); } to { transform: translate(140px, -30px) rotate(360deg); } }
.e031-flyk { opacity: 0; transform: translate(-110px, 110px) scale(.4); transform-box: view-box; transform-origin: 1586px 196px; transition: opacity .3s, transform 2s cubic-bezier(.3,0,.3,1); }
.st-fly .e031-flyk { opacity: 1; transform: none; }
.e031-ksway { animation: e031Kite 1.1s ease-in-out infinite alternate; }
@keyframes e031Kite { from { transform: rotate(-10deg); } to { transform: rotate(10deg) translate(4px, -5px); } }
@media (prefers-reduced-motion: reduce) { .e031-tree, .e031-ksway { animation-duration: 4s; } .e031-streak, .e031-leaf { animation-duration: 3s; } }
`;

const POSES = {
  e031_fan: { R: [150, 240], L: [10, 4], head: -4 },
  e031_hold: { R: [40, -20], L: [40, -20] },
  e031_flyk: { R: [70, 120], L: [20, 60], head: -10 },
};

const face = (st, id, dir) => { const A = st.a(id); A.face = dir; A.el.classList.toggle('is-left', dir < 0); };
const NAMES = ['st-n-minh1', 'st-n-lan', 'st-n-tom', 'st-n-minh2'];
const nameOn = (st, n) => NAMES.forEach((k) => st.set(k, k === n));

const BEATS = [
  { key: ['Sunday afternoon'], icon: '🕒', label: 'Sunday afternoon', async play(st) {
    st.look(290);
    st.set('st-day'); st.sfx('tick');
    await st.wait(2000);
    st.set('st-day', false);
  } },
  { key: ['visiting Minh and Lan'], icon: '🚪', label: 'Tom is visiting', async play(st) {
    st.look(470);
    st.set('st-door'); st.sfx('door-open');
    await st.walk('tom', 560, { speed: 130, follow: false });
    face(st, 'tom', -1);
    st.pose('tom', 'wave'); st.act('tom', 'wave'); st.mood('tom', 'joy');
    st.pose('minh', 'wave'); st.act('minh', 'wave'); st.pose('lan', 'wave'); st.act('lan', 'wave');
    await st.say('tom', 'Hi!', 1300);
    ['tom', 'minh', 'lan'].forEach((k) => { st.act(k, null); st.pose(k, 'stand'); });
    st.mood('tom', 'happy');
    st.set('st-door', false);
  } },
  { key: ["Let's play football"], icon: '⚽', label: 'play football', async play(st) {
    st.look(440);
    st.hold('minh', 'ball'); st.pose('minh', 'raise'); st.mood('minh', 'joy');
    await st.say('minh', "Let's play football!", 1900);
  } },
  { key: ['says Minh'], icon: '🗣️', label: 'says Minh', async play(st) {
    st.look(440);
    nameOn(st, 'st-n-minh1');
    st.talk('minh', true); st.act('minh', 'nod');
    await st.wait(1600);
    st.talk('minh', false); st.act('minh', null);
  } },
  { key: ['very hot today'], icon: '🥵', label: 'very hot', async play(st) {
    nameOn(st, null);
    st.look(300);
    st.hold('minh', null); st.pose('minh', 'stand'); st.mood('minh', 'happy');
    st.set('st-hot');
    st.pose('lan', 'e031_fan'); st.act('lan', 'wave'); st.mood('lan', 'shut');
    st.fx('drops', 410, 150);
    await st.wait(900);
    st.act('lan', 'no');
    await st.say('lan', 'No, it is very hot!', 1500);
    st.act('lan', null); st.pose('lan', 'stand'); st.mood('lan', 'happy');
    nameOn(st, 'st-n-lan');
    await st.wait(500);
    nameOn(st, null);
  } },
  { key: ['swimming pool'], icon: '🏊', label: 'swimming pool', async play(st) {
    st.look(440);
    st.pose('minh', 'think'); st.talk('minh', true);
    st.set('st-think'); st.sfx('pop');
    await st.wait(2000);
    st.talk('minh', false); st.pose('minh', 'stand');
  } },
  { key: ['closed on Sunday'], icon: '🚫', label: 'closed', async play(st) {
    st.look(470);
    st.set('st-closed'); st.sfx('bump');
    st.act('tom', 'no'); st.talk('tom', true); st.mood('minh', 'wow');
    await st.wait(1300);
    st.act('tom', null); st.talk('tom', false);
    nameOn(st, 'st-n-tom');
    await st.wait(700);
    nameOn(st, null); st.mood('minh', 'happy');
  } },
  { key: ['make a kite'], icon: '🪁', label: 'make a kite', async play(st) {
    st.look(440);
    st.set('st-closed', false); st.set('st-tkite');
    st.set('st-bulb'); st.sfx('sparkle');
    st.pose('lan', 'pointUp'); st.act('lan', 'point'); st.mood('lan', 'joy'); st.talk('lan', true);
    await st.wait(2000);
    st.act('lan', null); st.talk('lan', false);
  } },
  { key: ['says Lan'], icon: '🗣️', label: 'says Lan', async play(st) {
    st.look(440);
    nameOn(st, 'st-n-lan');
    st.talk('lan', true); st.act('lan', 'nod');
    await st.wait(1500);
    st.talk('lan', false); st.act('lan', null);
  } },
  { key: ['Good idea'], icon: '💡', label: 'Good idea!', async play(st) {
    nameOn(st, null);
    st.look(440);
    st.set('st-think', false);
    st.pose('lan', 'stand'); st.mood('lan', 'happy');
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    st.pose('tom', 'clap'); st.act('tom', 'clap'); st.mood('tom', 'joy');
    await st.wait(1600);
    st.act('minh', null); st.act('tom', null); st.pose('minh', 'stand'); st.pose('tom', 'stand');
    st.set('st-bulb', false);
  } },
  { key: ['big red kite'], icon: '🔴', label: 'big red kite', async play(st) {
    st.look(440);
    st.pose('minh', 'open'); st.mood('minh', 'joy'); st.talk('minh', true);
    st.set('st-bigk'); st.sfx('pop');
    await st.wait(2000);
    st.talk('minh', false); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['paper', 'sticks', 'string'], icon: '🧵', label: 'paper, sticks, string', async play(st) {
    st.set('st-bigk', false);
    await st.walk('minh', 690, { speed: 140, lead: -60 });
    st.pose('minh', 'reach');
    for (const [i, svg, from, to] of [[1, PAPER, [672, 202], [522, 216]], [2, STICKS, [704, 202], [556, 218]], [3, STRING, [690, 264], [590, 214]]]) {
      await st.wait(200);
      st.set(`st-g${i}`);
      await st.fly(svg, from, to, { size: 30, dur: 520 });
      st.set(`st-it${i}`); st.sfx('pop');
    }
    st.pose('minh', 'stand');
    await st.walk('minh', 470, { speed: 140, follow: false });
    face(st, 'minh', 1);
  } },
  { key: ['draws a dragon'], icon: '🐉', label: 'draws a dragon', async play(st) {
    st.look(520);
    st.fx('poof', 620, 170);
    await st.wait(200);
    st.set('st-kite');
    await st.walk('tom', 574, { speed: 100, follow: false });
    st.hold('tom', 'pencil'); st.pose('tom', 'paint');
    await st.wait(300);
    st.act('tom', 'paint'); st.set('st-dragon'); st.sfx('pencil');
    await st.wait(2200);
    st.act('tom', null); st.hold('tom', null); st.pose('tom', 'stand'); st.mood('tom', 'joy');
    st.fx('sparkle', 620, 160);
  } },
  { key: ['take it to the park'], icon: '🏞️', label: 'to the park?', async play(st) {
    st.look(560);
    st.set('st-taken'); st.show('kite', true);
    st.pose('tom', 'carry'); st.mood('tom', 'happy');
    await st.walk('tom', 640, { speed: 90, follow: false });
    st.pose('tom', 'e031_hold'); st.talk('tom', true);
    st.set('st-door'); st.sfx('door-open');
    await st.wait(1700);
    st.talk('tom', false);
  } },
  { key: ['asks Tom'], icon: '❓', label: 'asks Tom', async play(st) {
    st.look(560);
    nameOn(st, 'st-n-tom');
    st.talk('tom', true); st.act('tom', 'nod');
    await st.wait(1500);
    st.talk('tom', false); st.act('tom', null);
  } },
  { key: ["let's go"], icon: '🏃', label: "Yes, let's go!", async play(st) {
    nameOn(st, null);
    st.pose('minh', 'cheer'); st.pose('lan', 'cheer'); st.mood('minh', 'joy'); st.mood('lan', 'joy');
    st.dog('lucky', 'stand'); st.act('lucky', 'wag'); st.mood('lucky', 'joy');
    await st.wait(600);
    st.act('lucky', null);
    await Promise.all([
      st.walk('tom', 1580, { speed: 150, lead: -40 }),
      st.walk('kite', 1610, { speed: 150, follow: false }),
      (async () => { await st.wait(300); await st.walk('minh', 1480, { speed: 150, follow: false }); })(),
      (async () => { await st.wait(600); await st.walk('lan', 1420, { speed: 150, follow: false }); })(),
      (async () => { await st.wait(200); await st.walk('lucky', 1530, { speed: 160, follow: false }); })(),
    ]);
    st.set('st-door', false);
    st.mood('minh', 'happy'); st.mood('lan', 'happy');
  } },
  { key: ['At the park', 'the wind is strong'], icon: '🌬️', label: 'the wind is strong', async play(st) {
    st.look(1560);
    st.set('st-wind'); st.sfx('wind');
    st.mood('lan', 'shut'); st.mood('minh', 'wow');
    await st.wait(2200);
    st.mood('lan', 'happy'); st.mood('minh', 'happy');
  } },
  { key: ['flies high in the sky'], icon: '🪁', label: 'flies high', async play(st) {
    st.look(1600);
    st.show('kite', false);
    st.pose('tom', 'e031_flyk'); st.mood('tom', 'joy');
    st.set('st-fly'); st.sfx('whoosh-long');
    await st.wait(1200);
    st.pose('minh', 'pointUp'); st.mood('minh', 'joy');
    st.pose('lan', 'cheer'); st.mood('lan', 'joy');
    await st.wait(1200);
  } },
  { key: ['runs and barks'], icon: '🐶', label: 'Lucky barks', async play(st) {
    st.look(1620);
    await st.walk('lucky', 1690, { speed: 300, follow: false });
    st.act('lucky', 'jump'); st.mood('lucky', 'joy');
    st.sfx('dog-bark');
    await st.say('lucky', 'Woof! Woof!', 1500);
    st.act('lucky', 'wag');
  } },
  { key: ['every Sunday'], icon: '📅', label: 'every Sunday', async play(st) {
    st.look(1560);
    st.act('lucky', null);
    st.pose('minh', 'open'); st.mood('minh', 'joy'); st.talk('minh', true);
    st.set('st-sundays'); st.sfx('pop');
    await st.wait(2200);
    st.talk('minh', false);
  } },
  { key: ['says Minh'], icon: '😄', label: 'says Minh', async play(st) {
    st.look(1560);
    st.set('st-sundays', false);
    nameOn(st, 'st-n-minh2');
    st.talk('minh', true); st.pose('minh', 'cheer'); st.act('minh', 'jump');
    st.pose('lan', 'cheer'); st.act('lan', 'jump');
    st.act('lucky', 'wag');
    st.fx('hearts', 1500, 150);
    await st.wait(1800);
    st.talk('minh', false);
    st.act('minh', null); st.act('lan', null); st.act('lucky', null);
  } },
];

export default {
  id: 'en031', worldW: 2240, floor: FLOOR, viewTop: 40, camStart: 50, css: KIT_CSS + CSS, bg, fg, beats: BEATS, poses: POSES,
  order: [2, 4, 7, 11, 12, 17],
  cast: [
    { id: 'lucky', kind: 'dog', x: 250, s: 0.9 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 340 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 410, s: 1.04 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: 860 },
    { id: 'kite', kind: 'thing', x: 670, svg: KITE_HELD, box: [-26, -130, 52, 130] },
  ],
  init(st) {
    st.dog('lucky', 'sit');
    st.show('kite', false);
  },
};
