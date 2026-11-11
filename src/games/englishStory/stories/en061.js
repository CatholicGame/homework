/**
 * Bài 61 "Have You Ever Seen Snow?" (hiện tại hoàn thành: ever / never): một buổi chiều, đi từ trái sang phải:
 * cửa lớp 6A → sân trường (ghế đá dưới gốc cây: hai bạn ngồi nói chuyện, bong bóng nghĩ hiện tuyết, Hà Nội nắng, Sa Pa
 * mùa đông có sương mù nhưng không tuyết, núi Phú Sĩ ở Nhật tuyết rơi) → cổng trường → hàng ốc luộc ngoài cổng
 * (máy bay bay ngang trời, Minh ăn ốc, Tom thấy ốc lạ, hẹn mai ăn thử).
 * Toạ độ cảnh: rộng 1300, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, schoolFront, fence, road, steam, thought } from '../kit.js';

const FLOOR = 282;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { school: 170, bench: 600, tree: 470, gate: 760, cart: 1010 };
const SIT = { minh: X.bench - 34, tom: X.bench + 34 };
const AT = { minh: 915, tom: 845 }; // chỗ đứng ở hàng ốc

// ── Đồ vật ─────────────────────────────────────────────────────────────────
/** Bông tuyết (tâm x, y). */
const FLAKE = (x, y, r = 8, c = '#60A5FA') => `<g transform="translate(${x} ${y})">${[0, 60, 120].map((a) => `<g transform="rotate(${a})"><path d="M0 ${-r} V${r} M-${r * 0.35} ${-r * 0.75} L0 ${-r * 0.45} L${r * 0.35} ${-r * 0.75} M-${r * 0.35} ${r * 0.75} L0 ${r * 0.45} L${r * 0.35} ${r * 0.75}" stroke="${c}" stroke-width="${(r / 5).toFixed(1)}" fill="none" stroke-linecap="round"/></g>`).join('')}</g>`;
/** Biển cấm đỏ (vòng + gạch chéo) đè lên hình. */
const NO = (x, y, r = 14) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="none" stroke="#DC2626" stroke-width="3.4"/><path d="M${-r * 0.7} ${-r * 0.7} L${r * 0.7} ${r * 0.7}" stroke="#DC2626" stroke-width="3.4"/></g>`;
/** Con ốc (vỏ xoắn + thân, râu có class để ngọ nguậy). */
const SNAIL = (s = 1) => `<g transform="scale(${s})"><path d="M-14 6 Q-16 0 -8 0 H12 Q18 0 20 -6 L22 -12" stroke="${L}" stroke-width="1" fill="#E7D3A8"/>
  <g class="e061-ant"><path d="M19 -9 L16 -18 M21 -9 L25 -17" stroke="${L}" stroke-width="1.2"/><circle cx="16" cy="-18" r="1.6" fill="${L}"/><circle cx="25" cy="-17" r="1.6" fill="${L}"/></g>
  <circle cx="-1" cy="-6" r="10" fill="#D97706" stroke="${L}" stroke-width="1"/><path d="M-1 -6 m-6 0 a6 6 0 1 1 6 6 a4 4 0 1 1 -3 -5" stroke="${L}" stroke-width="1" fill="none"/></g>`;
/** Bát ốc luộc (gốc ở đáy bát). */
const SNAILBOWL = `<path d="M-18 -10 H18 Q17 2 0 3 Q-17 2 -18 -10Z" fill="#fff" stroke="#3B82F6" stroke-width="1.4"/>
  ${[[-10, -11], [0, -14], [10, -11], [-4, -9], [6, -9]].map(([x, y]) => `<g transform="translate(${x} ${y})"><circle r="4.6" fill="#B45309" stroke="${L}" stroke-width="0.8"/><path d="M-2 0 a2 2 0 1 1 2 2" stroke="#FDE68A" stroke-width="0.9" fill="none"/></g>`).join('')}`;
/** Tăm xiên ốc (đồ cầm tay phải, quay đầu nhọn lên khi đưa lên miệng). */
const PICK = `<g transform="rotate(180)"><path d="M0 -2 V15" stroke="#D6A85C" stroke-width="1.5" stroke-linecap="round"/><circle cy="16" r="2.8" fill="#A16207" stroke="${L}" stroke-width="0.6"/></g>`;
/** Máy bay nhỏ ở xa (mũi sang phải, gốc giữa thân). */
const PLANE = `<g transform="scale(0.9)"><path d="M-30 -4 Q-30 -9 -22 -9 H18 Q30 -9 32 -3 Q30 3 18 3 H-22 Q-30 3 -30 -4Z" fill="#fff" stroke="${L}" stroke-width="1.1"/>
  <path d="M-26 -9 L-32 -22 H-24 L-14 -9Z" fill="#3B82F6" stroke="${L}" stroke-width="1"/><path d="M-4 -2 L-16 14 H-8 L8 -2Z" fill="#93C5FD" stroke="${L}" stroke-width="1"/>
  <path d="M-22 -4 H22" stroke="#3B82F6" stroke-width="2"/>${[-12, -4, 4, 12].map((x) => `<circle cx="${x}" cy="-6" r="1.5" fill="#60A5FA"/>`).join('')}</g>`;
/** Dấu hỏi trong vòng tròn (đặt trên đầu người hỏi). */
const QMARK = `<g class="e061-qpop"><circle cy="-16" r="15" fill="#fff" stroke="#EA580C" stroke-width="2"/><text y="-8" text-anchor="middle" ${NUN} font-size="24" fill="#EA580C">?</text></g>`;

// ── Hình trong bong bóng nghĩ (gốc ở tâm bong bóng) ─────────────────────────
const SNOWY = `${FLAKE(-36, -14, 10)}${FLAKE(0, -24, 8)}${FLAKE(34, -10, 11)}
  <g transform="translate(0 20)"><circle cy="-4" r="13" fill="#fff" stroke="${L}"/><circle cy="-22" r="9" fill="#fff" stroke="${L}"/><path d="M-1 -22 l7 2 l-7 2Z" fill="#F97316"/>
    <circle cx="-3" cy="-25" r="1.2" fill="${L}"/><circle cx="3" cy="-25" r="1.2" fill="${L}"/></g>`;
const NOSNOW = `${FLAKE(0, 0, 18)}${NO(0, 0, 24)}`;
const HANOI = `<g transform="translate(40 -18)"><circle r="10" fill="#FDE047" stroke="#F59E0B" stroke-width="1.6"/>${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<path d="M0 -13 V-17" transform="rotate(${a})" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>`).join('')}</g>
  <ellipse cx="0" cy="22" rx="52" ry="9" fill="#38BDF8" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(-6 18)"><rect x="-11" y="-14" width="22" height="14" fill="#FEF3C7" stroke="${L}" stroke-width="0.9"/><rect x="-8" y="-25" width="16" height="11" fill="#FEF3C7" stroke="${L}" stroke-width="0.9"/>
    <path d="M-14 -14 H14 L10 -18 H-10Z M-11 -25 H11 L0 -32Z" fill="#B45309" stroke="${L}" stroke-width="0.8"/><path d="M-3 0 V-7 Q0 -10 3 -7 V0" fill="#92400E"/></g>
  ${FLAKE(-38, -14, 7)}${NO(-38, -14, 10)}
  <g transform="translate(0 -26)">${label(0, 4, 'Ha Noi', '#B45309', 12)}</g>`;
const SAPA = `<path d="M-52 26 L-22 -18 L0 4 L20 -26 L52 26Z" fill="#4ADE80" stroke="${L}" stroke-width="1"/>
  ${[-8, 2, 12, 20].map((y, i) => `<path d="M${-40 + i * 6} ${y} Q-10 ${y - 5} ${10 - i * 3} ${y} T${44 - i * 6} ${y + 2}" stroke="#FACC15" stroke-width="2" fill="none"/>`).join('')}
  <g transform="translate(0 -30)">${label(0, 4, 'Sa Pa', '#15803D', 12)}</g>`;
const TOMHEAD = (mood) => `<g transform="translate(-34 8)">${headOnly('en_tom', { mood, s: 0.9 })}</g>`;
/** Sa Pa mùa đông: sương mù xám, khăn len, không có tuyết. */
const WINTER = `<g class="e061-mist"><ellipse cx="-14" cy="-6" rx="34" ry="8" fill="#E2E8F0" opacity="0.9"/><ellipse cx="22" cy="6" rx="30" ry="7" fill="#CBD5E1" opacity="0.9"/></g>
  <g class="e061-nosnow">${FLAKE(32, -12, 8)}${NO(32, -12, 12)}</g>
  <g class="e061-wlb"><g transform="translate(26 30)">${label(0, 4, 'winter', '#475569', 11)}</g></g>`;
const JAPAN = `<path d="M-54 28 L-14 -22 H14 L54 28Z" fill="#60A5FA" stroke="${L}" stroke-width="1"/>
  <path d="M-14 -22 H14 L25 -8 Q16 -2 10 -10 Q2 0 -6 -10 Q-14 -2 -25 -8Z" fill="#fff" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(-40 18)"><path d="M-9 -16 H9 M-7 -12 H7 M-6 -12 V6 M6 -12 V6" stroke="#DC2626" stroke-width="2.6" stroke-linecap="round"/></g>
  <g clip-path="url(#e061clip)">${[[-40, -40], [-18, -48], [6, -42], [28, -50], [46, -40], [-30, -60], [16, -64], [38, -62]].map(([x, y], i) => `<g class="e061-fall" style="animation-delay:${(i * 0.37).toFixed(2)}s">${FLAKE(x, y, 4.6, '#7DD3FC')}</g>`).join('')}</g>
  <g transform="translate(0 -30)">${label(0, 4, 'Japan', '#DC2626', 12)}</g>
  <g class="e061-cold"><g transform="translate(-30 36)">${label(0, 4, 'cold', '#2563EB', 11)}</g></g>
  <g class="e061-beau"><g transform="translate(30 36)">${label(0, 4, 'beautiful', '#DB2777', 11)}</g></g>`;
const STRANGE = `<g transform="translate(-8 10) scale(1.7)">${SNAIL()}</g><text x="38" y="-6" ${NUN} font-size="22" fill="#EA580C">?!</text>`;
const TOMORROW = `<g transform="translate(-22 4)"><rect x="-20" y="-20" width="40" height="40" rx="4" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-20" y="-20" width="40" height="11" rx="3" fill="#EF4444" stroke="${L}" stroke-width="1"/>
    <g class="e061-flip" style="transform-origin:0px -9px"><rect x="-17" y="-9" width="34" height="27" fill="#F8FAFC" stroke="${L}" stroke-width="0.6"/></g><text y="14" text-anchor="middle" ${NUN} font-size="20" fill="#1F2937">+1</text></g>
  <g transform="translate(30 14)">${SNAILBOWL}</g>
  <g transform="translate(0 -28)">${label(0, 4, 'tomorrow', '#7C3AED', 12)}</g>`;

const bub = (name, x, y, w, h, inner, tail) => `<g class="e061-b e061-b-${name}">${thought(x, y, w, h, inner, tail)}</g>`;

const POSES = {
  e061_hi5: { R: [150, 170], L: [10, 4] },
  e061_sitTalk: { R: [60, 100], L: [40, 110], dy: 20 },
  e061_sitPoint: { R: [84, 92], L: [40, 110], dy: 20 },
  e061_sitYes: { R: [150, 172], L: [40, 110], dy: 20 },
  e061_sitShrug: { R: [50, 130], L: [50, 130], dy: 20, head: -5 },
  e061_sitFan: { R: [128, 200], L: [40, 110], dy: 20 },
  e061_sitHug: { R: [30, -120], L: [30, -120], dy: 20, head: 6 },
  e061_sitOpen: { R: [55, 40], L: [55, 40], dy: 20 },
  e061_sitWow: { R: [140, 220], L: [140, 220], dy: 20, head: -4 },
  e061_up: { R: [140, 160], L: [10, 4], head: -12 },
  e061_stop: { R: [90, 150], L: [90, 150], head: 6 },
  e061_thumb: { R: [120, 170], L: [10, 4] },
};
const PROPS = { e061_pick: PICK };

function bg() {
  return `
  ${sky(0, 1300, 315, 'e061sky')}
  <g transform="translate(1180 70)"><circle r="20" fill="#FDBA74" stroke="#F59E0B" stroke-width="2"/></g>
  ${cloud(380, 60, 0.8, 0)}${cloud(860, 48, 0.9, 2)}${cloud(1200, 120, 0.6, 4)}
  <!-- trường + sân -->
  ${schoolFront(X.school, FLOOR)}
  <g transform="translate(${X.school} 0)"><rect x="-40" y="${FLOOR - 98}" width="80" height="18" rx="4" fill="#fff" stroke="${L}"/><text x="0" y="${FLOOR - 84}" text-anchor="middle" ${NUN} font-size="13" fill="#1D4ED8">CLASS 6A</text></g>
  ${fence(300, 440, FLOOR)}
  ${tree(X.tree, FLOOR - 6, 1.25, '')}
  <rect x="0" y="${FLOOR - 4}" width="${X.gate}" height="40" fill="#E7E5E4" stroke="${L}"/>
  ${Array.from({ length: 13 }, (_, i) => `<path d="M${i * 60} ${FLOOR - 4} L${i * 60 - 14} 315" stroke="#D6D3D1" stroke-width="1.2"/>`).join('')}
  <!-- ghế đá: lưng ghế + mặt ghế (người ngồi ở trước) -->
  <g transform="translate(${X.bench} 0)"><rect x="-70" y="${FLOOR - 64}" width="140" height="12" rx="4" fill="#D6D3D1" stroke="${L}"/><rect x="-60" y="${FLOOR - 52}" width="8" height="22" fill="#A8A29E" stroke="${L}" stroke-width="0.8"/><rect x="52" y="${FLOOR - 52}" width="8" height="22" fill="#A8A29E" stroke="${L}" stroke-width="0.8"/>
    <rect x="-74" y="${FLOOR - 32}" width="148" height="10" rx="3" fill="#E7E5E4" stroke="${L}"/><rect x="-64" y="${FLOOR - 22}" width="12" height="22" fill="#A8A29E" stroke="${L}"/><rect x="52" y="${FLOOR - 22}" width="12" height="22" fill="#A8A29E" stroke="${L}"/></g>
  <!-- cổng trường -->
  <g transform="translate(${X.gate} 0)"><rect x="-14" y="150" width="28" height="${FLOOR - 150}" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/><rect x="-18" y="140" width="36" height="12" rx="2" fill="#EF4444" stroke="${L}"/></g>
  <!-- phố ngoài cổng -->
  ${[[836, 104, '#A7F3D0', 120], [944, 110, '#BFDBFE', 96], [1052, 96, '#FBCFE8', 130]].map(([x, w, c, top]) => `<g transform="translate(${x} 0)"><rect x="${-w / 2}" y="${top}" width="${w}" height="${FLOOR - top}" fill="${c}" stroke="${L}"/>
    <rect x="${-w / 2 - 4}" y="${top - 8}" width="${w + 8}" height="10" rx="2" fill="#F8FAFC" stroke="${L}"/>
    <rect x="${-w / 2 + 14}" y="${top + 16}" width="${w - 28}" height="30" fill="#BAE6FD" stroke="${L}"/><path d="M0 ${top + 16} V${top + 46}" stroke="${L}" stroke-width="0.8"/>
    <rect x="${-w / 2 + 8}" y="${top + 50}" width="${w - 16}" height="6" fill="#64748B" stroke="${L}" stroke-width="0.6"/>
    <rect x="${-w / 2 + 12}" y="${FLOOR - 74}" width="${w - 24}" height="70" fill="#E5E7EB" stroke="${L}"/>${Array.from({ length: 5 }, (_, i) => `<path d="M${-w / 2 + 12} ${FLOOR - 64 + i * 13} H${w / 2 - 12}" stroke="#9CA3AF" stroke-width="1"/>`).join('')}</g>`).join('')}
  <g transform="translate(1180 0)"><rect x="-80" y="150" width="160" height="${FLOOR - 150}" fill="#FDBA74" stroke="${L}"/><path d="M-90 150 H90 L80 132 H-80Z" fill="#B91C1C" stroke="${L}"/>
    <rect x="-60" y="172" width="40" height="34" fill="#BAE6FD" stroke="${L}"/><rect x="20" y="172" width="40" height="34" fill="#BAE6FD" stroke="${L}"/><rect x="-16" y="214" width="32" height="${FLOOR - 214}" fill="#92400E" stroke="${L}"/></g>
  ${road(X.gate + 14, 1300 - X.gate - 14, FLOOR)}
  <!-- ô che hàng ốc -->
  <g transform="translate(${X.cart + 20} 0)"><path d="M0 ${FLOOR - 50} V112" stroke="${L}" stroke-width="2.4"/><path d="M-78 128 Q0 74 78 128Z" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    <path d="M-26 126 Q0 80 26 126Z" fill="#fff" stroke="${L}" stroke-width="0.8"/></g>
  <g class="e061-lb e061-lb-g6">${label(X.school, FLOOR - 128, 'grade 6', '#1D4ED8', 16)}</g>`;
}

function fg() {
  return `
  <defs><clipPath id="e061clip"><ellipse cx="0" cy="0" rx="62" ry="42"/></clipPath></defs>
  ${bush(330, FLOOR + 8, 0.8)}${bush(710, FLOOR + 8, 0.7, '#4ADE80')}
  <!-- xe ốc luộc (che chân cô bán hàng) -->
  <g transform="translate(${X.cart} ${FLOOR})"><rect x="-56" y="-58" width="112" height="44" rx="4" fill="#F59E0B" stroke="${L}" stroke-width="1.2"/>
    <rect x="-46" y="-48" width="64" height="20" rx="3" fill="#fff" stroke="${L}"/><text x="-14" y="-33" text-anchor="middle" ${NUN} font-size="12" fill="#B45309">SNAILS</text>
    <circle cx="-36" cy="-10" r="10" fill="#475569" stroke="${L}"/><circle cx="-36" cy="-10" r="3" fill="#CBD5E1"/><circle cx="36" cy="-10" r="10" fill="#475569" stroke="${L}"/><circle cx="36" cy="-10" r="3" fill="#CBD5E1"/>
    <path d="M14 -58 h34 v-20 q0 -6 -6 -6 h-22 q-6 0 -6 6Z" fill="#94A3B8" stroke="${L}"/><rect x="12" y="-88" width="38" height="5" rx="2" fill="#64748B" stroke="${L}" stroke-width="0.8"/>
    ${steam(31, -92)}
    <g transform="translate(-30 -58)">${SNAILBOWL}</g><g transform="translate(-6 -58)">${SNAILBOWL}</g></g>
  ${bub('snow', X.bench + 100, 112, 136, 100, SNOWY, [SIT.tom + 10, 176])}
  ${bub('nosnow', X.bench - 100, 112, 136, 96, NOSNOW, [SIT.minh - 10, 176])}
  ${bub('hanoi', X.bench - 100, 112, 136, 104, HANOI, [SIT.minh - 10, 176])}
  ${bub('sapa', X.bench - 100, 112, 136, 104, SAPA, [SIT.minh - 10, 176])}
  ${bub('tsapa', X.bench + 100, 112, 136, 104, SAPA + TOMHEAD('joy') + WINTER, [SIT.tom + 10, 176])}
  ${bub('japan', X.bench + 100, 112, 136, 104, JAPAN, [SIT.tom + 10, 176])}
  ${bub('strange', AT.tom - 84, 116, 130, 92, STRANGE, [AT.tom - 8, 158])}
  ${bub('tmrw', AT.tom - 84, 116, 140, 100, TOMORROW, [AT.tom - 8, 158])}`;
}

const CSS = `
.e061-lb, .e061-wlb, .e061-mist, .e061-nosnow, .e061-cold, .e061-beau { opacity: 0; transition: opacity .35s; }
.st-lb-g6 .e061-lb-g6, .st-winter .e061-wlb, .st-winter .e061-mist, .st-nosnow2 .e061-nosnow, .st-cold .e061-cold, .st-beau .e061-beau { opacity: 1; }
.e061-b { opacity: 0; transform: scale(.5); transform-box: fill-box; transform-origin: 50% 90%; transition: opacity .3s, transform .35s cubic-bezier(.3, 1.4, .6, 1); }
${['snow', 'nosnow', 'hanoi', 'sapa', 'tsapa', 'japan', 'strange', 'tmrw'].map((k) => `.st-b-${k} .e061-b-${k}`).join(', ')} { opacity: 1; transform: none; }
.st-winter .e061-mist { animation: e061Mist 2.4s ease-in-out infinite alternate; }
@keyframes e061Mist { from { transform: translateX(-8px); } to { transform: translateX(8px); } }
.e061-fall { animation: e061Fall 2.6s linear infinite; }
@keyframes e061Fall { from { transform: translateY(0); } to { transform: translateY(96px); } }
.st-wiggle .e061-ant { animation: e061Ant .3s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: 0% 100%; }
@keyframes e061Ant { from { transform: rotate(-12deg); } to { transform: rotate(12deg); } }
.st-tmrw-go .e061-flip { animation: e061Flip .5s ease-in 2 forwards; }
@keyframes e061Flip { from { transform: scaleY(1); } to { transform: scaleY(-1); opacity: 0; } }
.e061-qpop { animation: e061Pop .4s cubic-bezier(.3, 1.6, .6, 1) both; transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes e061Pop { from { transform: scale(.3); } to { transform: none; } }
.es-thing.is-gone .e061-qpop { animation: none; }
@media (prefers-reduced-motion: reduce) {
  .e061-fall { animation-duration: 6s; }
  .st-wiggle .e061-ant { animation-duration: .9s; }
  .st-winter .e061-mist { animation-duration: 5s; }
  .e061-b { transition: opacity .5s, transform .5s ease-out; }
  .e061-qpop { animation-duration: .8s; }
}
`;

/** Dấu hỏi hiện trên đầu một người. */
function ask(st, id) {
  const A = st.a(id);
  st.show('q', false);
  // ngồi ghế: bong bóng nghĩ ở phía trên, nên dấu hỏi nằm giữa hai đầu (phía bạn kia)
  const sit = A.poseName.startsWith('e061_sit');
  st.place('q', sit ? (SIT.minh + SIT.tom) / 2 : A.x, A.y - (sit ? 128 : 172));
  st.show('q', true);
}

const BEATS = [
  { key: ['grade 6', 'best friend'], icon: '🏫', label: 'best friend', async play(st) {
    st.look(300);
    st.sfx('school-bell', { vol: 0.5 });
    await st.wait(400);
    st.set('st-lb-g6'); st.sfx('pop', { vol: 0.5 });
    await st.wait(600);
    await Promise.all([
      st.walk('minh', 330, { speed: 130, follow: false }),
      st.walk('tom', 400, { speed: 130, follow: false }),
    ]);
    st.face('tom', -1);
    st.pose('minh', 'e061_hi5'); st.pose('tom', 'e061_hi5'); st.mood('minh', 'joy'); st.mood('tom', 'joy');
    await st.wait(300);
    st.sfx('clap', { vol: 0.7 }); st.fx('hearts', 365, 140);
    await st.wait(1000);
  } },
  { key: ['sat in the school yard', 'talked'], icon: '🪑', label: 'school yard', async play(st) {
    st.set('st-lb-g6', false); st.pose('minh', 'stand'); st.pose('tom', 'stand'); st.mood('minh', 'happy'); st.mood('tom', 'happy');
    st.sfx('birds', { vol: 0.4 });
    await Promise.all([
      st.walk('minh', SIT.minh, { speed: 130, lead: 0 }),
      st.walk('tom', SIT.tom, { speed: 130, follow: false }),
    ]);
    st.pose('minh', 'sit'); st.pose('tom', 'sit'); st.sfx('bump', { vol: 0.4 });
    await st.wait(500);
    st.pose('tom', 'e061_sitTalk'); st.talk('tom', true); st.mood('tom', 'joy');
    await st.wait(900);
    st.talk('tom', false); st.pose('tom', 'sit');
    st.pose('minh', 'e061_sitTalk'); st.talk('minh', true); st.mood('minh', 'joy'); st.sfx('giggle', { vol: 0.5 });
    await st.wait(900);
    st.talk('minh', false); st.pose('minh', 'sit');
  } },
  { key: ['seen snow'], icon: '❄️', label: 'seen snow', async play(st) {
    st.look(X.bench);
    st.pose('tom', 'e061_sitTalk'); st.mood('tom', 'joy');
    st.set('st-b-snow'); st.sfx('pop', { vol: 0.5 });
    await st.wait(300);
    st.sfx('wind', { vol: 0.35 });
    await st.say('tom', 'Snow?', 1500);
  } },
  { key: ['Tom asked'], icon: '❓', label: 'Tom asked', async play(st) {
    st.pose('tom', 'e061_sitOpen');
    await st.wait(200);
    ask(st, 'tom'); st.sfx('ding', { vol: 0.5 });
    await st.wait(1200);
  } },
  { key: ['never seen snow'], icon: '🙅', label: 'never seen snow', async play(st) {
    st.show('q', false); st.set('st-b-snow', false); st.pose('tom', 'sit');
    st.pose('minh', 'e061_sitTalk'); st.mood('minh', 'sad');
    await st.wait(200);
    st.set('st-b-nosnow'); st.sfx('pop', { vol: 0.5 });
    await st.wait(400);
    st.act('minh', 'no'); st.sfx('buzz-no', { vol: 0.5 });
    await st.say('minh', 'No!', 1200);
    st.act('minh', null);
  } },
  { key: ["doesn't snow in Ha Noi"], icon: '☀️', label: 'Ha Noi', async play(st) {
    st.set('st-b-nosnow', false); st.mood('minh', 'happy');
    await st.wait(200);
    st.set('st-b-hanoi'); st.sfx('pop', { vol: 0.5 });
    await st.wait(500);
    st.pose('minh', 'e061_sitFan'); st.act('minh', 'wave'); st.sfx('whoosh', { vol: 0.35 });
    await st.wait(1300);
    st.act('minh', null);
  } },
  { key: ['been to Sa Pa'], icon: '⛰️', label: 'Sa Pa', async play(st) {
    st.set('st-b-hanoi', false); st.pose('minh', 'e061_sitPoint'); st.face('minh', 1); st.mood('minh', 'joy');
    await st.wait(200);
    st.set('st-b-sapa'); st.sfx('pop', { vol: 0.5 });
    await st.wait(300);
    ask(st, 'minh'); st.sfx('ding', { vol: 0.45 });
    await st.say('minh', 'Sa Pa?', 1300);
  } },
  { key: ['Yes, I have'], icon: '👍', label: 'Yes, I have', async play(st) {
    st.show('q', false); st.set('st-b-sapa', false); st.pose('minh', 'sit');
    st.pose('tom', 'e061_sitYes'); st.mood('tom', 'joy'); st.act('tom', 'nod');
    st.sfx('ding', { vol: 0.5 });
    await st.wait(300);
    st.set('st-b-tsapa'); st.sfx('pop', { vol: 0.5 });
    await st.say('tom', 'Yes!', 1300);
    st.act('tom', null);
  } },
  { key: ['last winter', 'no snow'], icon: '🌫️', label: 'no snow', async play(st) {
    st.pose('tom', 'e061_sitHug'); st.mood('tom', 'happy');
    st.set('st-winter'); st.sfx('wind', { vol: 0.6 });
    await st.wait(1500);
    st.set('st-nosnow2'); st.pose('tom', 'e061_sitShrug'); st.mood('tom', 'sad'); st.sfx('buzz-no', { vol: 0.5 });
    await st.wait(1200);
  } },
  { key: ['snow in Japan'], icon: '🗻', label: 'Japan', async play(st) {
    st.set('st-b-tsapa', false); st.pose('tom', 'e061_sitTalk'); st.mood('tom', 'joy');
    st.sfx('whoosh', { vol: 0.4 });
    await st.wait(250);
    st.set('st-b-japan'); st.sfx('pop', { vol: 0.5 });
    await st.wait(700);
    st.mood('minh', 'wow'); st.sfx('ding', { vol: 0.45 });
    await st.wait(1000);
  } },
  { key: ['cold and beautiful'], icon: '🥶', label: 'cold and beautiful', async play(st) {
    st.pose('tom', 'e061_sitHug'); st.act('tom', 'shiver'); st.mood('tom', 'shut');
    st.set('st-cold'); st.sfx('wind', { vol: 0.6 });
    await st.wait(1300);
    st.act('tom', null); st.pose('tom', 'e061_sitWow'); st.mood('tom', 'wow');
    st.set('st-beau'); st.sfx('sparkle', { vol: 0.5 });
    await st.wait(1200);
  } },
  { key: ['never flown on a plane', 'eaten snails'], icon: '✈️', label: 'plane, snails', async play(st) {
    st.set('st-b-japan', false); st.set('st-cold', false); st.set('st-beau', false);
    st.pose('tom', 'sit'); st.mood('tom', 'happy');
    st.look(X.bench + 100);
    st.pose('minh', 'stand'); st.mood('minh', 'happy');
    await st.wait(300);
    st.show('plane', true); st.sfx('plane', { vol: 0.6 });
    st.walk('plane', X.bench + 460, { speed: 240, follow: false });
    await st.wait(500);
    st.pose('minh', 'e061_up');
    await st.wait(900);
    st.act('minh', 'no'); st.sfx('buzz-no', { vol: 0.45 });
    await st.wait(800);
    st.act('minh', null); st.show('plane', false);
    st.pose('tom', 'stand');
    await Promise.all([
      st.walk('minh', AT.minh, { speed: 140, lead: -60 }),
      st.walk('tom', AT.tom, { speed: 140, follow: false }),
    ]);
    st.sfx('bowl-down', { vol: 0.5 });
    await st.fly(`<g transform="translate(0 6)">${SNAILBOWL}</g>`, [X.cart - 30, FLOOR - 64], [AT.minh, FLOOR - 70], { size: 40, dur: 500 });
    st.chest('minh', `<g transform="translate(0 8)">${SNAILBOWL}</g>`);
    st.hold('minh', 'e061_pick'); st.pose('minh', 'eat'); st.act('minh', 'eat'); st.mood('minh', 'joy');
    await st.wait(300);
    st.sfx('slurp', { vol: 0.6 });
    await st.wait(900);
    st.sfx('gulp', { vol: 0.5 });
    await st.wait(400);
    st.act('minh', null);
  } },
  { key: ['never tried them'], icon: '🙅‍♂️', label: 'never tried', async play(st) {
    st.look(AT.tom - 10);
    st.face('tom', 1); st.pose('tom', 'point'); st.mood('tom', 'wow');
    await st.wait(600);
    st.pose('tom', 'e061_stop'); st.act('tom', 'no'); st.mood('tom', 'sad'); st.sfx('buzz-no', { vol: 0.5 });
    await st.wait(1300);
    st.act('tom', null);
  } },
  { key: ['look strange'], icon: '🐌', label: 'look strange', async play(st) {
    st.pose('tom', 'think'); st.mood('tom', 'wow');
    st.set('st-b-strange'); st.sfx('pop', { vol: 0.5 });
    await st.wait(400);
    st.set('st-wiggle'); st.sfx('drip', { vol: 0.5 });
    await st.wait(1500);
  } },
  { key: ['ever eaten snails'], icon: '🥣', label: 'eaten snails?', async play(st) {
    st.set('st-b-strange', false); st.set('st-wiggle', false);
    st.act('minh', null); st.hold('minh', null);
    st.face('minh', -1); st.pose('minh', 'give'); st.mood('minh', 'joy');
    st.chest('minh', null);
    st.hold('minh', 'e061_bowl'); st.sfx('whoosh', { vol: 0.35 });
    await st.say('minh', 'Snails?', 1500);
  } },
  { key: ['Minh asked'], icon: '❓', label: 'Minh asked', async play(st) {
    ask(st, 'minh'); st.sfx('ding', { vol: 0.5 });
    await st.wait(1200);
  } },
  { key: ['Never!'], icon: '✋', label: 'Never!', async play(st) {
    st.show('q', false);
    st.pose('tom', 'e061_stop'); st.act('tom', 'no'); st.mood('tom', 'wow'); st.sfx('buzz-no', { vol: 0.55 });
    await st.say('tom', 'Never!', 1300);
    st.act('tom', null);
  } },
  { key: ['Tom laughed'], icon: '😆', label: 'Tom laughed', async play(st) {
    st.pose('tom', 'clap'); st.mood('tom', 'joy'); st.act('tom', 'hop');
    st.sfx('giggle', { vol: 0.7 });
    await st.wait(400);
    st.mood('minh', 'joy');
    await st.wait(1100);
    st.act('tom', null);
  } },
  { key: ['try them tomorrow'], icon: '📅', label: 'tomorrow', async play(st) {
    st.hold('minh', null); st.pose('minh', 'stand');
    st.chest('minh', `<g transform="translate(0 8)">${SNAILBOWL}</g>`); st.pose('minh', 'carry');
    st.pose('tom', 'e061_thumb'); st.mood('tom', 'joy');
    st.set('st-b-tmrw'); st.sfx('pop', { vol: 0.5 });
    await st.wait(400);
    st.set('st-tmrw-go'); st.sfx('page-turn', { vol: 0.6 });
    await st.wait(900);
    st.mood('minh', 'joy'); st.sfx('clap', { vol: 0.5 }); st.act('tom', 'nod');
    await st.wait(900);
    st.act('tom', null);
  } },
];

PROPS.e061_bowl = `<g transform="translate(0 -6)">${SNAILBOWL}</g>`;

export default {
  id: 'en061', worldW: 1300, floor: FLOOR, viewTop: 40, camStart: 60, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'seller', kind: 'adult', who: 'hangXom', x: X.cart + 30, s: 0.95, face: -1 },
    { id: 'plane', kind: 'thing', x: X.bench - 220, y: 70, svg: PLANE, box: [-32, -22, 66, 38] },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 150, s: 1.1 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 215, s: 1.1 },
    { id: 'q', kind: 'thing', x: 0, y: 0, svg: QMARK, box: [-16, -32, 32, 34] },
  ],
  init(st) {
    st.show('plane', false); st.show('q', false);
  },
};
