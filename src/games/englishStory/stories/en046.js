/**
 * Bài 46 "The Science Fair" (will / won't): hành lang trường (áp phích hội thi khoa học, lịch khoanh thứ Sáu) → phòng thí nghiệm:
 * bàn làm việc với rô-bốt nhỏ Minh và Tom đang lắp, lịch tập luyện thứ Hai → thứ Sáu trên tường, cửa bên phải (cô Hoa, Lan vào).
 * Dự đoán / lời hứa (will) hiện bằng bong bóng nghĩ có cảnh nhỏ chuyển động; lo lắng của Tom bị gạch chéo khi Minh nói
 * "They won't laugh". Cuối truyện Minh lắp pin, rô-bốt sáng mắt và quay đầu thật.
 * Toạ độ cảnh: rộng 1700, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, room, doorway, windowBox, board, shelf, books, label, thought, sun } from '../kit.js';

const FLOOR = 282;
const TOP = FLOOR - 62; // mặt bàn
const T = (x, y, s, c, t, w = 900) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="${w}" font-size="${s}" fill="${c}">${t}</text>`;

// ── Rô-bốt (gốc = giữa chỗ bánh chạm mặt bàn, cao ≈ 64) ─────────────────
const robot = (mini = false) => `<g class="${mini ? 'e046-mini' : 'e046-rb'}">
  <g class="e046-p1">${[-11, 11].map((x) => `<circle cx="${x}" cy="-6" r="6" fill="#334155" stroke="${L}" stroke-width="0.9"/><circle cx="${x}" cy="-6" r="2" fill="#CBD5E1"/>`).join('')}
    <rect class="e046-paint" x="-16" y="-38" width="32" height="28" rx="5" stroke="${L}" stroke-width="1.1"/>
    <rect x="-9" y="-32" width="18" height="10" rx="2" fill="#E2E8F0" stroke="${L}" stroke-width="0.7"/><circle class="e046-led" cx="-4" cy="-27" r="2" fill="#94A3B8"/><circle class="e046-led" cx="4" cy="-27" r="2" fill="#94A3B8"/></g>
  <g class="e046-p2"><rect class="e046-paint" x="-23" y="-35" width="6" height="18" rx="3" stroke="${L}" stroke-width="0.9"/><rect class="e046-paint" x="17" y="-35" width="6" height="18" rx="3" stroke="${L}" stroke-width="0.9"/></g>
  <g class="e046-p3"><rect x="-3" y="-42" width="6" height="5" fill="#64748B" stroke="${L}" stroke-width="0.7"/>
    <g class="e046-head"><rect class="e046-paint" x="-14" y="-60" width="28" height="19" rx="6" stroke="${L}" stroke-width="1.1"/>
      <g class="e046-eyes"><circle class="e046-eye" cx="-5.5" cy="-50.5" r="3.4" stroke="${L}" stroke-width="0.7"/><circle class="e046-eye" cx="5.5" cy="-50.5" r="3.4" stroke="${L}" stroke-width="0.7"/></g>
      <path d="M0 -60 V-67" stroke="${L}" stroke-width="1.4"/><circle class="e046-ant" cx="0" cy="-69" r="3" stroke="${L}" stroke-width="0.8"/></g></g></g>`;
const ROBOT = robot();
/** Rô-bốt nhỏ trong bong bóng (đã sơn / chạy). */
const miniRobot = (cls = '') => `<g class="${cls}">${robot(true)}</g>`;

const SCREWDRIVER = `<g transform="rotate(180)"><rect x="-2.4" y="-2" width="4.8" height="11" rx="2" fill="#EF4444" stroke="${L}" stroke-width="0.7"/><path d="M0 9 V22" stroke="#94A3B8" stroke-width="1.8"/></g>`;
const BATTERIES = `<g transform="translate(0 -8)">${[-4, 4].map((x) => `<rect x="${x - 3.4}" y="-9" width="6.8" height="16" rx="1.6" fill="#16A34A" stroke="${L}" stroke-width="0.7"/><rect x="${x - 3.4}" y="-9" width="6.8" height="5" rx="1.4" fill="#FDE047" stroke="${L}" stroke-width="0.6"/><rect x="${x - 1.4}" y="-11" width="2.8" height="2.4" fill="#94A3B8"/>`).join('')}</g>`;
const BATTERY = `<rect x="-3.4" y="-8" width="6.8" height="16" rx="1.6" fill="#16A34A" stroke="${L}" stroke-width="0.7"/><rect x="-3.4" y="-8" width="6.8" height="5" rx="1.4" fill="#FDE047"/>`;
const PAINTCAN = `<g transform="translate(10 4)"><path d="M-8 -9 H8 V9 Q0 11 -8 9Z" fill="#E2E8F0" stroke="${L}" stroke-width="0.8"/><ellipse cy="-9" rx="8" ry="2.6" fill="#2563EB" stroke="${L}" stroke-width="0.8"/><rect x="-8" y="-3" width="16" height="6" fill="#3B82F6"/><path d="M-8 -9 Q0 -20 8 -9" stroke="${L}" stroke-width="1" fill="none"/></g>`;
const TOOLBOX = `<rect x="-24" y="-12" width="48" height="26" rx="3" fill="#DC2626" stroke="${L}"/><rect x="-24" y="-4" width="48" height="4" fill="#991B1B"/><path d="M-9 -12 V-18 H9 V-12" stroke="${L}" stroke-width="2.4" fill="none"/>
  <path d="M-16 -14 L-6 -26" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/><path d="M8 -14 L16 -26" stroke="#B45309" stroke-width="3" stroke-linecap="round"/><rect x="12" y="-30" width="10" height="6" rx="1" fill="#64748B" transform="rotate(30 17 -27)"/>`;
const laughHead = (who, x) => `<g transform="translate(${x} 10)"><g class="e046-ha">${headOnly(who, { mood: 'joy', s: 0.52 })}</g></g>`;
const CHECK = `<path d="M-9 0 l6 7 l12 -14" stroke="#16A34A" stroke-width="4.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const CROSS = `<path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>`;
const HEART = (c = '#F43F5E') => `<path d="M0 6 C-10 -2 -8 -10 -3 -10 C-1 -10 0 -8 0 -7 C0 -8 1 -10 3 -10 C8 -10 10 -2 0 6Z" fill="${c}" stroke="${L}" stroke-width="0.7"/>`;

/** Bong bóng nghĩ (lớp trước), nội dung cắt gọn trong bong bóng; (tx, ty) = đầu người nghĩ. */
const bub = (k, x, y, w, h, inner, tx, ty) => `<g class="e046-bub e046-b${k}" style="transform-origin:${tx}px ${ty}px">${thought(x, y, w, h,
  `<defs><clipPath id="e046c${k}"><ellipse rx="${w * 0.47}" ry="${h * 0.44}"/></clipPath></defs><g clip-path="url(#e046c${k})">${inner}</g>`, [tx, ty])}</g>`;

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

function bg() {
  return `
  <!-- HÀNH LANG -->
  ${room(0, 540, FLOOR, '#FEF9C3', '#CBD5E1')}
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 60} ${FLOOR} V315" stroke="#94A3B8" stroke-width="1"/>`).join('')}
  ${[30, 76].map((x) => `<rect x="${x}" y="110" width="40" height="${FLOOR - 112}" rx="3" fill="#60A5FA" stroke="${L}"/><path d="M${x + 8} 124 h24 M${x + 8} 130 h24 M${x + 8} 136 h24" stroke="#1D4ED8" stroke-width="1.2"/><circle cx="${x + 32}" cy="190" r="2.4" fill="#1D4ED8"/>`).join('')}
  <!-- áp phích hội thi khoa học -->
  <g transform="translate(290 0)">
    <rect x="-96" y="56" width="192" height="96" rx="6" fill="#fff" stroke="${L}" stroke-width="1.6"/>
    <rect x="-96" y="56" width="192" height="26" rx="6" fill="#7C3AED" stroke="${L}" stroke-width="1.6"/>
    ${T(0, 75, 16, '#fff', 'SCIENCE FAIR')}
    <g transform="translate(-50 120)"><path d="M-8 -22 V-8 L-18 12 Q-20 18 -14 18 H14 Q20 18 18 12 L8 -8 V-22Z" fill="#E0F2FE" stroke="${L}"/><path d="M-14 6 L14 6 L18 12 Q20 18 14 18 H-14 Q-20 18 -18 12Z" fill="#22C55E"/><rect x="-10" y="-26" width="20" height="5" rx="2" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/>
      <circle class="e046-fizz" cx="-4" cy="2" r="2.4" fill="#BBF7D0"/><circle class="e046-fizz" cx="5" cy="-4" r="1.8" fill="#BBF7D0" style="animation-delay:.4s"/></g>
    <g transform="translate(36 118)"><rect x="-38" y="-26" width="76" height="52" rx="4" fill="#FEF3C7" stroke="${L}"/>${T(0, -11, 10, '#B91C1C', 'NEXT')}${T(0, 10, 17, '#B91C1C', 'FRIDAY')}
      <ellipse class="e046-ring" cx="0" cy="4" rx="34" ry="13" fill="none" stroke="#EF4444" stroke-width="3" pathLength="100"/></g>
  </g>
  ${doorway(540, FLOOR)}

  <!-- PHÒNG THÍ NGHIỆM -->
  ${room(552, 1148, FLOOR, '#E0F2FE')}
  ${board(590, 70, 120, 74, '')}<g transform="translate(650 107)">${T(0, -12, 12, '#F8FAFC', 'ROBOTS')}<path d="M-30 6 h60 M-24 18 h48" stroke="#F8FAFC" stroke-width="1.6" opacity="0.7"/></g>
  <!-- lịch tập: thứ Hai → thứ Sáu -->
  <g transform="translate(830 0)">
    <rect x="-90" y="54" width="180" height="78" rx="5" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="-90" y="54" width="180" height="20" rx="5" fill="#F97316" stroke="${L}" stroke-width="1.4"/>
    ${T(0, 69, 12, '#fff', 'PRACTICE')}
    ${DAYS.map((d, i) => `<g transform="translate(${-68 + i * 34} 0)"><rect x="-14" y="80" width="28" height="44" rx="3" fill="#F8FAFC" stroke="#CBD5E1"/>${T(0, 93, 9, '#334155', d)}
      <g transform="translate(0 110)"><g class="e046-tick e046-tick${i}">${CHECK}</g></g></g>`).join('')}
  </g>
  ${windowBox(1180, 70, 120, 96)}
  ${shelf(1360, 120, 120, books(1372, 120, 5) + `<g transform="translate(1440 120)"><path d="M-6 -24 V-14 L-12 -2 Q-12 2 -8 2 H8 Q12 2 12 -2 L6 -14 V-24Z" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/></g>`)}
  <!-- cửa vào lớp -->
  <g transform="translate(1590 0)"><rect x="-34" y="${FLOOR - 140}" width="68" height="140" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="-26" y="${FLOOR - 130}" width="52" height="40" rx="2" fill="#BAE6FD" stroke="${L}"/><circle cx="22" cy="${FLOOR - 66}" r="3.4" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/></g>
  <!-- bàn làm việc -->
  <g transform="translate(830 0)">
    <rect x="-70" y="${TOP + 8}" width="10" height="${FLOOR - TOP - 8}" fill="#92400E" stroke="${L}"/><rect x="60" y="${TOP + 8}" width="10" height="${FLOOR - TOP - 8}" fill="#92400E" stroke="${L}"/>
    <rect x="-64" y="${TOP + 40}" width="128" height="6" fill="#A16207" stroke="${L}" stroke-width="0.8"/>
    <rect x="-80" y="${TOP}" width="160" height="10" rx="3" fill="#D97706" stroke="${L}" stroke-width="1.2"/>
    <!-- linh kiện chưa lắp -->
    <g class="e046-parts"><rect x="-62" y="${TOP - 12}" width="18" height="12" rx="3" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/><circle cx="-34" cy="${TOP - 5}" r="5" fill="#334155" stroke="${L}" stroke-width="0.8"/>
      <rect x="40" y="${TOP - 10}" width="16" height="10" rx="3" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/><path d="M58 ${TOP - 2} l8 -4" stroke="#F59E0B" stroke-width="2"/></g>
  </g>`;
}

function fg() {
  return `
  <g class="e046-q">${label(830, 140, '?', '#F97316', 24)}</g>
  ${bub(4, 690, 88, 150, 68, `<g transform="translate(-18 26) scale(0.62)">${miniRobot()}</g><g transform="translate(26 0)">${CHECK}</g>`, 735, 150)}
  ${bub(5, 690, 88, 168, 68, `<path d="M-70 26 H70" stroke="#94A3B8" stroke-width="2"/><g class="e046-roll"><g transform="translate(0 26) scale(0.62)">${miniRobot('e046-turn')}</g></g>
    <path class="e046-arr" d="M-40 8 h-26 m7 -6 l-7 6 l7 6 M40 8 h26 m-7 -6 l7 6 l-7 6 M-14 -26 Q0 -36 14 -26 m-7 -3 l7 3 l-4 6" stroke="#F97316" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, 735, 150)}
  ${bub(7, 1128, 88, 180, 70, `<g transform="translate(0 26) scale(0.6)">${miniRobot()}</g>${laughHead('en_lan_home', -60)}${laughHead('en_tom', 58)}${laughHead('en_minh', -32)}
    <g class="e046-hb"><g transform="translate(-20 -14)">${HEART()}</g><g transform="translate(24 -18)">${HEART('#EC4899')}</g><g transform="translate(40 -4) scale(0.8)">${HEART()}</g></g>`, 1038, 80)}
  ${bub(9, 1150, 92, 156, 68, `<g transform="translate(-20 26) scale(0.62)"><g class="e046-mblue">${miniRobot()}</g></g><g transform="translate(34 -4) rotate(-30)"><g class="e046-brushb">
    <rect x="-1.6" y="-16" width="3.2" height="18" fill="#B45309" stroke="${L}" stroke-width="0.6"/><path d="M-3 2 H3 L2 10 Q0 12 -2 10Z" fill="#2563EB" stroke="${L}" stroke-width="0.6"/></g></g>${T(30, 22, 11, '#1D4ED8', 'blue')}`, 1110, 152)}
  ${bub(11, 930, 88, 160, 68, `<g transform="translate(0 26) scale(0.62)"><g class="e046-broke">${miniRobot()}</g></g>
    <g class="e046-smoke">${[[-8, -14], [6, -20], [-2, -28]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${7 - i}" fill="#94A3B8" opacity="0.8" style="animation-delay:${i * 0.3}s"/>`).join('')}</g>${T(46, 4, 22, '#F97316', '?')}`, 915, 150)}
  ${bub(12, 930, 88, 180, 70, `${laughHead('en_lan', -54)}${laughHead('en_tom_home', 0)}${laughHead('en_minh_home', 54)}
    <g class="e046-hatext">${T(-30, -12, 13, '#DC2626', 'HA HA')}${T(36, -16, 11, '#DC2626', 'HA')}</g>
    <g class="e046-nox"><g transform="scale(2.4)">${CROSS}</g></g>`, 915, 150)}
  ${bub(18, 940, 88, 190, 70, `<g transform="translate(-36 14) scale(0.85)">${TOOLBOX}</g><g transform="translate(32 -10)"><g class="e046-tsun"><g transform="scale(0.4)">${sun(22)}</g></g></g>${T(30, 18, 11, '#B45309', 'tomorrow')}`, 915, 150)}`;
}

const CSS = `
.e046-paint { fill: #A8B4C4; transition: fill .6s; } .e046-eye { fill: #1F2937; transition: fill .3s; } .e046-ant { fill: #CBD5E1; }
.e046-mini .e046-paint { fill: #3B82F6; } .e046-mini .e046-eye { fill: #FDE047; } .e046-mini .e046-ant { fill: #EF4444; }
.e046-broke .e046-paint { fill: #A8B4C4; } .e046-broke .e046-eye { fill: #1F2937; }
.e046-p1, .e046-p2, .e046-p3 { opacity: 0; transition: opacity .3s; }
.e046-k1 .e046-p1, .e046-k2 .e046-p2, .e046-k3 .e046-p3, .e046-mini .e046-p1, .e046-mini .e046-p2, .e046-mini .e046-p3 { opacity: 1; }
.e046-on .e046-eye { fill: #FDE047; } .e046-on .e046-led { fill: #22C55E; }
.e046-on .e046-ant { animation: e046Blink .5s steps(2) infinite; } @keyframes e046Blink { 50% { fill: #EF4444; } }
.e046-go .e046-eyes { animation: e046Look 1.4s ease-in-out infinite alternate; } @keyframes e046Look { 0%, 20% { transform: translateX(-4px); } 80%, 100% { transform: translateX(4px); } }
.e046-go .e046-rb { animation: e046Roll 1.4s ease-in-out infinite alternate; } @keyframes e046Roll { from { transform: translateX(-8px); } to { transform: translateX(8px); } }
.st-built .e046-parts { opacity: 0; transition: opacity .3s; }
.e046-ring { stroke-dasharray: 100; stroke-dashoffset: 100; transition: stroke-dashoffset 1s ease-out; } .st-fri .e046-ring { stroke-dashoffset: 0; }
.e046-fizz { animation: e046Fizz 1.2s ease-out infinite; } @keyframes e046Fizz { from { transform: translateY(0); opacity: 1; } to { transform: translateY(-20px); opacity: 0; } }
.e046-bub { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .5s cubic-bezier(.3,1.5,.6,1); }
${[4, 5, 7, 9, 11, 12, 18].map((k) => `.st-b${k} .e046-b${k}`).join(', ')} { opacity: 1; transform: scale(1); }
.e046-q { opacity: 0; transform: scale(.3); transform-origin: 830px 132px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.6,.6,1); }
.st-q .e046-q { opacity: 1; transform: scale(1); } .st-q2 .e046-q { animation: e046Hop .4s ease-in-out infinite alternate; }
@keyframes e046Hop { to { transform: translateY(-6px); } }
.e046-turn .e046-eyes { animation: e046Look 1.2s ease-in-out infinite alternate; }
.e046-roll { animation: e046Roll2 2.4s ease-in-out infinite alternate; } @keyframes e046Roll2 { from { transform: translateX(-26px); } to { transform: translateX(26px); } }
.e046-arr { animation: e046Bob .6s ease-in-out infinite alternate; } @keyframes e046Bob { to { opacity: .4; } }
.e046-ha { animation: e046Laugh .3s ease-in-out infinite alternate; } @keyframes e046Laugh { to { transform: translateY(-3px) rotate(4deg); } }
.e046-hb { animation: e046Bob .7s ease-in-out infinite alternate; }
.e046-brushb { animation: e046Brush .5s ease-in-out infinite alternate; } @keyframes e046Brush { to { transform: rotate(24deg); } }
.e046-smoke circle { animation: e046Smoke 1.4s ease-out infinite; } @keyframes e046Smoke { from { transform: translateY(6px); opacity: .9; } to { transform: translateY(-10px); opacity: 0; } }
.e046-nox { opacity: 0; transform: scale(2); transition: opacity .25s, transform .35s cubic-bezier(.3,1.5,.6,1); } .st-nolaugh .e046-nox { opacity: 1; transform: scale(1); }
.st-nolaugh .e046-ha, .st-nolaugh .e046-hatext { opacity: .35; animation: none; }
.e046-tick { opacity: 0; transform: scale(0); transition: opacity .2s, transform .35s cubic-bezier(.3,1.6,.6,1); }
${DAYS.map((_, i) => `.st-day${i} .e046-tick${i}`).join(', ')} { opacity: 1; transform: scale(1); }
.e046-tsun { transform: translateY(12px); opacity: .3; transition: transform 1.4s ease-out, opacity 1s; } .st-b18 .e046-tsun { transform: translateY(0); opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .e046-ha, .e046-hb, .e046-arr, .e046-brushb, .st-q2 .e046-q { animation: none; }
  .e046-roll, .e046-go .e046-rb, .e046-go .e046-eyes, .e046-turn .e046-eyes { animation-duration: 3s; }
}
`;

const mark = (st, id, cls, on = true) => st.a(id).el.classList.toggle(cls, on);
const RX = 830; // chỗ rô-bốt trên bàn

const BEATS = [
  { key: ['Next Friday', 'will have a science fair'], icon: '🔬', label: 'science fair', async play(st) {
    await Promise.all([
      st.walk('minh', 250, { speed: 140, lead: 30 }),
      st.walk('tom', 318, { speed: 140, follow: false }),
    ]);
    st.pose('minh', 'pointUp'); st.mood('minh', 'wow'); st.mood('tom', 'wow');
    st.set('st-fri'); st.sfx('pencil', { vol: 0.5 });
    await st.wait(1300);
    st.pose('minh', 'stand'); st.mood('minh', 'joy'); st.mood('tom', 'joy'); st.act('tom', 'jump'); st.pose('tom', 'cheer'); st.sfx('giggle', { vol: 0.5 });
    await st.wait(900);
    st.act('tom', null); st.pose('tom', 'stand'); st.mood('minh', 'happy'); st.mood('tom', 'happy');
  } },
  { key: ['making a small robot'], icon: '🤖', label: 'making a robot', async play(st) {
    await Promise.all([
      st.walk('minh', 738, { speed: 230, lead: 100 }),
      st.walk('tom', 918, { speed: 260, follow: false }),
    ]);
    st.face('tom', -1);
    st.hold('minh', 'e046_screw'); st.pose('minh', 'e046_fix'); st.pose('tom', 'give');
    st.fly(`<rect x="-9" y="-6" width="18" height="12" rx="3" fill="#94A3B8" stroke="${L}"/>`, [890, 200], [RX, 205], { size: 24, dur: 500 }); st.sfx('whoosh', { vol: 0.4 });
    await st.wait(450);
    st.set('st-built'); mark(st, 'robot', 'e046-k1'); st.sfx('bike-fix', { vol: 0.6 });
    st.act('minh', 'stir');
    await st.wait(700);
    mark(st, 'robot', 'e046-k2'); st.fx('sparkle', RX, 190, { quiet: true });
    await st.wait(700);
    mark(st, 'robot', 'e046-k3'); st.fx('sparkle', RX, 168);
    await st.wait(500);
    st.act('minh', null); st.pose('minh', 'stand'); st.hold('minh', null); st.pose('tom', 'stand');
  } },
  { key: ['Will it work'], icon: '❓', label: 'Will it work?', async play(st) {
    st.look(840);
    st.set('st-q'); st.sfx('pop', { vol: 0.6 }); st.pose('tom', 'point');
    await st.say('tom', 'Will it work?', 1800);
  } },
  { key: ['Tom asks'], icon: '🙋', label: 'Tom asks', async play(st) {
    st.set('st-q2'); st.pose('tom', 'shrug'); st.mood('tom', 'wow'); st.sfx('pop', { vol: 0.5, rate: 1.3 });
    await st.wait(700);
    st.sfx('pop', { vol: 0.4, rate: 1.5 });
    await st.wait(800);
    st.set('st-q2', false); st.pose('tom', 'stand'); st.mood('tom', 'happy');
  } },
  { key: ['I think it will'], icon: '👍', label: 'I think it will', async play(st) {
    st.set('st-q', false);
    st.pose('minh', 'think');
    await st.wait(400);
    st.set('st-b4'); st.sfx('pop', { vol: 0.6 });
    await st.wait(500);
    st.act('minh', 'nod'); st.mood('minh', 'joy'); st.sfx('ding', { vol: 0.6 });
    await st.wait(1400);
    st.act('minh', null);
  } },
  { key: ['move and turn its head'], icon: '↔️', label: 'move, turn its head', async play(st) {
    st.set('st-b4', false);
    st.set('st-b5'); st.sfx('pop', { vol: 0.6 }); st.pose('minh', 'point'); st.mood('minh', 'joy');
    await st.wait(400);
    await st.loop('robot-walk', () => st.wait(1300), { vol: 0.6 });
    st.sfx('robot-beep', { vol: 0.6 });
    await st.wait(900);
    st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['Ms Hoa looks at the robot'], icon: '👩‍🏫', label: 'Ms Hoa looks', async play(st) {
    st.set('st-b5', false);
    st.look(900);
    st.sfx('door-open', { vol: 0.5 });
    await st.walk('hoa', 1022, { speed: 150, follow: false });
    st.face('hoa', -1);
    st.pose('hoa', 'think'); st.mood('hoa', 'wow');
    st.face('tom', 1);
    await st.wait(1400);
  } },
  { key: ['the children will love it'], icon: '💖', label: 'will love it', async play(st) {
    st.pose('hoa', 'open'); st.mood('hoa', 'joy');
    st.look(980);
    st.set('st-b7'); st.sfx('hearts', { vol: 0.5 });
    await st.wait(700);
    st.mood('minh', 'joy'); st.mood('tom', 'joy'); st.sfx('giggle', { vol: 0.5 });
    await st.wait(1500);
    st.pose('hoa', 'stand'); st.mood('minh', 'happy'); st.mood('tom', 'happy');
  } },
  { key: ['she will help'], icon: '🙋‍♀️', label: 'Lan will help', async play(st) {
    st.set('st-b7', false); st.mood('hoa', 'happy');
    st.look(960);
    st.sfx('door-open', { vol: 0.5 });
    await st.walk('lan', 1110, { speed: 220, follow: false });
    st.face('lan', -1);
    st.pose('lan', 'raise'); st.mood('lan', 'joy'); st.sfx('pop', { vol: 0.5 });
    await st.say('lan', 'I will help!', 1500);
  } },
  { key: ["I'll paint it blue"], icon: '🖌️', label: 'paint it blue', async play(st) {
    st.hold('lan', 'paintbrush'); st.chest('lan', PAINTCAN); st.pose('lan', 'e046_brush');
    await st.wait(300);
    st.set('st-b9'); st.sfx('pop', { vol: 0.6 }); st.act('lan', 'paint');
    await st.wait(300);
    await st.loop('paint', () => st.wait(1600), { vol: 0.4 });
    await st.wait(300);
    st.act('lan', null);
  } },
  { key: ['Tom is worried'], icon: '😟', label: 'Tom is worried', async play(st) {
    st.set('st-b9', false); st.pose('lan', 'stand'); st.hold('lan', null); st.chest('lan', '');
    st.look(900);
    st.mood('tom', 'sad'); st.pose('tom', 'sad'); st.act('tom', 'shiver');
    st.fx('drops', 930, 120, { quiet: true }); st.sfx('drip', { vol: 0.5 });
    await st.wait(1600);
    st.act('tom', null);
  } },
  { key: ["What if it doesn't work"], icon: '💨', label: "doesn't work?", async play(st) {
    st.set('st-b11'); st.sfx('pop', { vol: 0.6 }); st.pose('tom', 'think');
    await st.wait(600);
    st.sfx('hiss', { vol: 0.4 });
    await st.wait(1600);
  } },
  { key: ['Everyone will laugh at us'], icon: '😆', label: 'will laugh', async play(st) {
    st.set('st-b11', false);
    st.set('st-b12'); st.sfx('pop', { vol: 0.6 }); st.mood('tom', 'cry'); st.pose('tom', 'sad');
    await st.wait(500);
    st.sfx('giggle', { vol: 0.6 });
    await st.wait(1900);
  } },
  { key: ["They won't laugh"], icon: '🙅', label: "won't laugh", async play(st) {
    st.pose('minh', 'stand'); st.face('minh', 1);
    st.act('minh', 'no'); st.sfx('buzz-no', { vol: 0.6 });
    await st.wait(500);
    st.set('st-nolaugh'); st.sfx('poof', { vol: 0.4 });
    await st.wait(1300);
    st.act('minh', null); st.mood('tom', 'sad');
  } },
  { key: ['practise every day'], icon: '📅', label: 'practise every day', async play(st) {
    st.set('st-b12', false); st.set('st-nolaugh', false);
    st.look(830);
    st.pose('minh', 'pointUp');
    for (let i = 0; i < 5; i++) { await st.wait(420); st.set(`st-day${i}`); st.sfx('pencil', { vol: 0.3 }); }
    st.sfx('ding', { vol: 0.5 });
    await st.wait(600);
    st.pose('minh', 'stand');
  } },
  { key: ["won't forget the batteries"], icon: '🔋', label: 'the batteries', async play(st) {
    st.hold('minh', 'e046_bat'); st.pose('minh', 'raise'); st.mood('minh', 'joy'); st.sfx('bag-on', { vol: 0.5 });
    await st.wait(800);
    st.pose('minh', 'give'); st.hold('minh', null);
    st.fly(BATTERY, [770, 170], [RX - 4, 192], { size: 20, dur: 450 }); st.sfx('whoosh', { vol: 0.4 });
    await st.wait(200);
    st.fly(BATTERY, [770, 170], [RX + 4, 192], { size: 20, dur: 450 });
    await st.wait(450);
    mark(st, 'robot', 'e046-on'); st.fx('sparkle', RX, 160, { quiet: true }); st.sfx('robot-beep', { vol: 0.7 });
    await st.wait(300);
    mark(st, 'robot', 'e046-go'); st.mood('tom', 'wow');
    await st.loop('robot-walk', () => st.wait(1200), { vol: 0.6 });
    st.pose('minh', 'stand');
  } },
  { key: ['Tom smiles'], icon: '😊', label: 'Tom smiles', async play(st) {
    st.pose('tom', 'stand'); st.mood('tom', 'joy');
    st.fx('sparkle', 918, 140, { quiet: true }); st.sfx('giggle', { vol: 0.5 });
    await st.wait(1300);
  } },
  { key: ['OK'], icon: '👌', label: 'OK', async play(st) {
    st.pose('tom', 'raise'); st.act('tom', 'nod'); st.sfx('ding', { vol: 0.6 });
    await st.say('tom', 'OK!', 1200);
    st.act('tom', null);
  } },
  { key: ["I'll bring my dad's tools tomorrow"], icon: '🧰', label: "dad's tools", async play(st) {
    st.pose('tom', 'me');
    st.set('st-b18'); st.sfx('pop', { vol: 0.6 });
    await st.wait(400);
    st.sfx('bike-fix', { vol: 0.4 });
    await st.wait(600);
    st.mood('minh', 'joy'); st.pose('minh', 'clap'); st.act('minh', 'clap'); st.sfx('clap', { vol: 0.6 });
    await st.wait(1400);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
];

export default {
  id: 'en046', worldW: 1700, floor: FLOOR, viewTop: 40, camStart: 30, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  order: [0, 1, 6, 9, 12, 15],
  poses: {
    e046_fix: { R: [60, 100], L: [40, 60] },
    e046_brush: { R: [80, 140], L: [24, -86] },
  },
  props: { e046_screw: SCREWDRIVER, e046_bat: BATTERIES },
  cast: [
    { id: 'robot', kind: 'thing', x: RX, y: TOP, svg: ROBOT, box: [-30, -76, 60, 80] },
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 1580, s: 0.95, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 1600, s: 1.08, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 120 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 50 },
  ],
  init(st) {
    st.bag('minh'); st.bag('tom');
  },
};
