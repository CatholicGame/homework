/**
 * Bài 18 "At the Park": cổng công viên (lịch Chủ nhật) → cây to (bố đọc báo) → bồn hoa (mẹ chụp ảnh) → ghế dài (Lan đọc sách)
 * → sân bóng (Minh, Tom, Lucky) → nhà của Kitty bên rìa công viên → hồ (vịt, xe đạp, diều, người chạy bộ).
 * Toạ độ cảnh: rộng 2700, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, flowerAt, sun, label } from '../kit.js';

const FLOOR = 282;

Object.assign(CAST, {
  e018_girl: { hair: 'pigtails', top: 'tee', shirt: '#FACC15', bottom: 'skirt', bottomC: '#22C55E', shoe: '#F472B6' },
  e018_boy: { hair: 'neat', top: 'tee', shirt: '#3B82F6', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F97316' },
  e018_jog: { adult: true, hair: 'short', top: 'tee', shirt: '#22D3EE', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F97316' },
});

// ── Đồ vật ────────────────────────────────────────────────────────────────
const NEWSPAPER = `<g transform="translate(0 -2) rotate(-3)"><rect x="-24" y="-16" width="48" height="32" fill="#F8FAFC" stroke="${L}" stroke-width="1"/>
  <path d="M0 -16 V16" stroke="${L}" stroke-width="0.7"/><rect x="-21" y="-13" width="18" height="6" fill="#334155"/>
  <path d="M-21 -3 H-3 M-21 1 H-3 M-21 5 H-6 M-21 9 H-3 M3 -12 H21 M3 -8 H21 M3 -4 H18" stroke="#94A3B8" stroke-width="1.2"/><rect x="4" y="0" width="16" height="12" fill="#BAE6FD" stroke="${L}" stroke-width="0.5"/></g>`;
const CAMERA = `<g transform="translate(0 -4)"><rect x="-9" y="-7" width="18" height="13" rx="2.4" fill="#1F2937" stroke="${L}" stroke-width="0.7"/>
  <circle cx="1" cy="-0.5" r="4.4" fill="#475569" stroke="#E2E8F0" stroke-width="1"/><circle cx="1" cy="-0.5" r="2" fill="#38BDF8"/><rect x="-7" y="-10" width="5" height="3" rx="1" fill="#EF4444"/></g>`;
const PHOTO = `<rect x="-11" y="-13" width="22" height="26" fill="#fff" stroke="${L}" stroke-width="1"/><rect x="-8" y="-10" width="16" height="15" fill="#86EFAC"/>
  <circle cx="-3" cy="-5" r="2.6" fill="#F472B6"/><circle cx="3" cy="-3" r="2.6" fill="#FACC15"/><path d="M-8 5 L-2 0 L3 3 L8 -2 V5Z" fill="#22C55E"/>`;
/** Bóng (gốc = điểm chạm đất), lăn khi đi. */
const BALL_T = `<g class="e018-roll" style="transform-origin:0px -9px"><g transform="translate(0 -9)"><circle r="9" fill="#fff" stroke="${L}"/>
  <path d="M0 -3.6 l3.4 2.5 -1.3 4 h-4.2 l-1.3 -4Z" fill="#1F2937"/><path d="M0 -3.6 V-9 M3.4 -1.1 L8.6 -2.6 M2.1 2.9 L5.2 7.2 M-2.1 2.9 L-5.2 7.2 M-3.4 -1.1 L-8.6 -2.6" stroke="#1F2937" stroke-width="0.9"/></g></g>`;
const DUCK = (s = 1, c = '#fff') => `<g transform="scale(${s})"><g class="e018-bobw"><path d="M-16 -6 Q-18 -18 -6 -16 Q2 -14 8 -10 Q14 -12 14 -4 Q12 4 -2 4 Q-14 4 -16 -6Z" fill="${c}" stroke="${L}" stroke-width="1"/>
  <circle cx="9" cy="-18" r="7" fill="${c}" stroke="${L}" stroke-width="1"/><path d="M15 -18 l7 2 l-7 2Z" fill="#F97316" stroke="${L}" stroke-width="0.6"/><circle cx="11" cy="-19.5" r="1.2" fill="#1F2937"/>
  <path d="M-8 -10 q6 -4 10 2" stroke="#E2E8F0" stroke-width="2" fill="none"/></g></g>`;
const BOAT = `<g class="e018-bobw"><path d="M-36 -14 H36 L28 2 H-28Z" fill="#F97316" stroke="${L}" stroke-width="1.2"/><path d="M-30 -14 H30" stroke="#fff" stroke-width="2"/>
  <path d="M0 -14 V-60" stroke="${L}" stroke-width="2"/><path d="M2 -58 L30 -20 H2Z" fill="#fff" stroke="${L}" stroke-width="1"/><path d="M-2 -54 L-22 -20 H-2Z" fill="#FDE68A" stroke="${L}" stroke-width="1"/></g>`;
/** Cậu bé đạp xe (gốc = mặt đất giữa hai bánh). */
const BIKE = () => {
  const wheel = (x) => `<g transform="translate(${x} -15)"><g class="e018-wheel"><circle r="15" fill="none" stroke="#1F2937" stroke-width="3.4"/>
    <circle r="15" fill="none" stroke="#475569" stroke-width="1.4"/>${[0, 45, 90, 135].map((r) => `<path d="M-14 0 H14" stroke="#94A3B8" stroke-width="0.8" transform="rotate(${r})"/>`).join('')}<circle r="2.4" fill="#475569"/></g></g>`;
  return `${wheel(-26)}${wheel(28)}
  <path d="M-26 -15 L-4 -15 L-10 -42 M-4 -15 L20 -40 L-10 -40 M28 -15 L20 -40 L18 -50" stroke="#DC2626" stroke-width="3.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14 -52 H24" stroke="#1F2937" stroke-width="3" stroke-linecap="round"/><rect x="-17" y="-47" width="15" height="5" rx="2.4" fill="#1F2937"/>
  <path d="M-8 -46 L4 -32 L-2 -16" stroke="${L}" stroke-width="7.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M-8 -46 L4 -32 L-2 -16" stroke="#1E3A8A" stroke-width="5.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <g class="e018-crank" style="transform-origin:-4px -15px"><path d="M-4 -15 L2 -8 M-4 -15 L-10 -22" stroke="#1F2937" stroke-width="2"/></g>
  <path d="M-10 -46 L-4 -76 L8 -76 L6 -44Z" fill="#3B82F6" stroke="${L}" stroke-width="1"/>
  <path d="M2 -72 L20 -52" stroke="${L}" stroke-width="6.6" stroke-linecap="round"/><path d="M2 -72 L20 -52" stroke="#FDDCB5" stroke-width="4.8" stroke-linecap="round"/>
  <g transform="translate(4 -90)">${headOnly('e018_boy', { s: 0.92 })}</g>
  <path d="M-12 -104 Q4 -122 20 -102 Z" fill="#22C55E" stroke="${L}" stroke-width="1"/>`;
};
/** Kitty ngủ cuộn tròn trên đệm. */
const SLEEPY_CAT = `<ellipse cx="0" cy="4" rx="34" ry="8" fill="#F472B6" stroke="${L}"/>
  <g class="e018-breathe" style="transform-origin:0px 4px"><path d="M-26 2 Q-28 -22 -2 -24 Q24 -24 26 0Z" fill="#fff" stroke="${L}" stroke-width="1"/>
  <path d="M22 0 Q34 -2 30 -14 Q26 -6 14 -4" fill="#fff" stroke="${L}" stroke-width="1"/>
  <g transform="translate(-16 -10)"><path d="M-10 -6 L-9 -18 L-2 -10Z M2 -10 L9 -18 L10 -6Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><circle r="11" fill="#fff" stroke="${L}" stroke-width="1"/>
  <path d="M-6 0 q2.4 2 4.8 0 M2 0 q2.4 2 4.8 0" stroke="${L}" stroke-width="1.1" fill="none"/><path d="M0 3.4 l-1.4 -1.2 h2.8Z" fill="#F9A8D4"/></g></g>`;
/** Mèo "không có ở đây": hình mèo nét đứt. */
const GHOST_CAT = `<g fill="none" stroke="#94A3B8" stroke-width="2" stroke-dasharray="4 3"><path d="M-14 0 Q-16 -22 0 -24 L4 -34 L10 -26 L16 -34 L18 -22 Q22 -10 14 0Z"/><path d="M-14 -4 Q-28 -8 -24 -24"/></g>`;

function bg() {
  const grassTop = `<path d="M0 222 Q200 190 420 218 T900 210 T1400 218 T1900 206 T2700 214 V282 H0Z" fill="#86EFAC" stroke="${L}"/>`;
  return `
  ${sky(0, 2700, 315, 'e018sky')}
  ${cloud(160, 56, 0.9, 0)}${cloud(780, 64, 1, 2)}${cloud(1240, 48, 0.8, 4)}${cloud(1760, 60, 1, 1)}${cloud(2300, 52, 0.9, 3)}
  <g transform="translate(470 84)"><g class="e018-sun">${sun(26)}</g></g>
  <g class="e018-suncloud">${cloud(470, 90, 1.3, 0)}</g>
  ${grassTop}
  <rect x="0" y="${FLOOR - 2}" width="2700" height="${317 - FLOOR}" fill="#4ADE80" stroke="${L}"/>
  ${Array.from({ length: 58 }, (_, i) => `<path d="M${20 + i * 46} ${FLOOR + 14} l3 -7 l3 7 M${40 + i * 46} ${FLOOR + 26} l3 -7 l3 7" stroke="#16A34A" stroke-width="1.4" fill="none"/>`).join('')}
  ${tree(70, 230, 0.9)}${tree(980, 222, 0.8, '#F59E0B')}${tree(1500, 214, 0.7)}${tree(2620, 214, 0.9)}
  <!-- Cổng công viên + lịch -->
  ${[262, 338].map((x) => `<rect x="${x - 9}" y="96" width="18" height="${FLOOR - 96}" fill="#A16207" stroke="${L}"/>`).join('')}
  <path d="M248 100 Q300 60 352 100" stroke="#16A34A" stroke-width="10" fill="none" stroke-linecap="round"/>${[262, 286, 314, 338].map((x, i) => `<circle cx="${x}" cy="${i % 3 ? 76 : 96}" r="5" fill="${i % 2 ? '#F472B6' : '#FACC15'}" stroke="${L}" stroke-width="0.6"/>`).join('')}
  ${label(300, 120, 'PARK', '#15803D', 16)}
  <rect x="148" y="112" width="6" height="${FLOOR - 112}" fill="#78716C"/>
  <g transform="translate(151 56)"><rect x="-44" y="-4" width="88" height="62" rx="5" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-44" y="-4" width="88" height="14" rx="5" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    <circle cx="-22" cy="-4" r="3" fill="#1F2937"/><circle cx="22" cy="-4" r="3" fill="#1F2937"/>
    <text x="0" y="40" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="18" fill="#DC2626">SUNDAY</text>
    <g transform="translate(0 10)"><g class="e018-sat"><rect x="-42" y="0" width="84" height="46" fill="#F8FAFC" stroke="${L}" stroke-width="0.8"/>
      <text x="0" y="30" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="13" fill="#475569">SATURDAY</text></g></g></g>
  <g transform="translate(338 150)"><rect x="-6" y="0" width="12" height="54" rx="6" fill="#fff" stroke="${L}"/><circle cx="0" cy="58" r="8" fill="#EF4444" stroke="${L}"/>
    <g transform="translate(0 56)"><g class="e018-merc"><rect x="-3" y="-50" width="6" height="50" fill="#EF4444"/></g></g></g>
  <g class="e018-lb e018-lb-sunny">${label(470, 150, 'sunny', '#B45309', 15)}</g>
  <g class="e018-lb e018-lb-warm">${label(390, 176, 'warm 30°C', '#DC2626', 14)}</g>
  <!-- Cây to (bố) -->
  ${tree(640, FLOOR - 4, 1.9, '#EF4444')}
  <!-- Bồn hoa -->
  ${Array.from({ length: 9 }, (_, i) => flowerAt(840 + i * 11, FLOOR - 8 - (i % 2) * 4, ['#F472B6', '#FACC15', '#F87171'][i % 3])).join('')}
  <!-- Ghế dài -->
  <g transform="translate(1000 0)"><rect x="-48" y="214" width="96" height="9" rx="3" fill="#B45309" stroke="${L}"/><rect x="-48" y="228" width="96" height="9" rx="3" fill="#B45309" stroke="${L}"/>
    <rect x="-52" y="252" width="104" height="9" rx="3" fill="#D97706" stroke="${L}"/><path d="M-42 214 V282 M42 214 V282" stroke="#475569" stroke-width="4"/></g>
  <!-- Sân bóng -->
  <rect x="1080" y="252" width="640" height="34" fill="#4ADE80"/>${Array.from({ length: 8 }, (_, i) => `<rect x="${1080 + i * 80}" y="252" width="40" height="34" fill="#22C55E" opacity="0.5"/>`).join('')}
  <path d="M1080 254 H1720 M1400 254 V286" stroke="#fff" stroke-width="2.4"/>
  <!-- Nhà của Kitty (bên rìa công viên) -->
  <g transform="translate(1890 0)">
    <path d="M-104 118 L0 62 L104 118Z" fill="#F97316" stroke="${L}" stroke-width="1.4"/>
    <rect x="-92" y="118" width="184" height="${FLOOR - 120}" fill="#FEF3C7" stroke="${L}" stroke-width="1.4"/>
    <rect x="-70" y="140" width="96" height="76" rx="3" fill="#FDE68A" stroke="${L}" stroke-width="1.6"/><rect x="-66" y="144" width="88" height="68" fill="#FFF7ED"/>
    <rect x="-66" y="144" width="88" height="10" fill="#F9A8D4"/><path d="M-66 154 q22 10 44 0 q22 10 44 0" fill="#F9A8D4"/>
    <g transform="translate(-22 206)">${SLEEPY_CAT}</g>
    <rect x="-74" y="214" width="104" height="7" rx="2" fill="#D97706" stroke="${L}"/>
    <rect x="44" y="170" width="38" height="${FLOOR - 170}" rx="3" fill="#B45309" stroke="${L}"/><circle cx="74" cy="228" r="3" fill="#FDE68A"/>
    ${label(-22, 112, 'HOME', '#C2410C', 12)}
  </g>
  ${Array.from({ length: 9 }, (_, i) => `<rect x="${1796 + i * 22}" y="252" width="7" height="28" rx="3" fill="#fff" stroke="${L}" stroke-width="0.8"/>`).join('')}<rect x="1792" y="260" width="196" height="5" fill="#fff" stroke="${L}" stroke-width="0.8"/>
  <!-- Hồ -->
  <path d="M1990 200 Q2000 188 2040 190 H2700 V266 H1990Z" fill="#38BDF8" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: 16 }, (_, i) => `<path d="M${2010 + i * 42} ${206 + (i % 3) * 18} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <g class="e018-glint">${[2120, 2300, 2480].map((x) => `<path d="M${x} 214 l3 -7 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3Z" fill="#fff"/>`).join('')}</g>
  ${[2030, 2660].map((x) => `<path d="M${x} 262 q-6 -26 -2 -40 M${x + 6} 262 q2 -28 8 -36 M${x + 12} 262 q8 -22 14 -28" stroke="#15803D" stroke-width="2.4" fill="none"/>`).join('')}
  <rect x="1990" y="262" width="710" height="22" fill="#FDE68A" stroke="${L}"/>
  <!-- Diều của bạn gái (gốc ở tay cầm) -->
  <g transform="translate(2581 172)"><g class="e018-kite">
    <path class="e018-string" d="M0 0 Q30 -40 64 -104" stroke="#475569" stroke-width="1" fill="none"/>
    <g transform="translate(64 -104)"><g class="e018-kitesway"><path d="M0 -20 L15 0 L0 22 L-15 0Z" fill="#EF4444" stroke="${L}" stroke-width="1.2"/><path d="M0 -20 V22 M-15 0 H15" stroke="#FDE68A" stroke-width="1.4"/>
      <path d="M0 22 q-6 8 0 14 q6 6 0 14" stroke="${L}" stroke-width="1" fill="none"/>${[30, 42].map((y) => `<path d="M-4 ${y} l4 -3 l4 3 l-4 3Z" fill="#3B82F6"/>`).join('')}</g></g></g></g>
  <!-- Nhãn chữ -->
  <g class="e018-lb e018-lb-fast">${label(1470, 150, 'fast!', '#DC2626', 15)}</g>
  <g class="e018-lb e018-lb-kitty">${label(1774, 192, 'Kitty?', '#64748B', 15)}</g>
  <g class="e018-lb e018-lb-lake">${label(2330, 150, 'lake', '#0369A1', 18)}</g>
  <g class="e018-lb e018-lb-busy">${label(2330, 120, 'busy', '#7C3AED', 18)}</g>`;
}

function fg() {
  return `${bush(610, FLOOR + 16, 1.3)}${bush(668, FLOOR + 18, 1.1, '#4ADE80')}
  <g transform="translate(1000 0)"><rect x="-56" y="262" width="112" height="10" rx="3" fill="#D97706" stroke="${L}"/>${bush(-28, FLOOR + 26, 0.9, '#4ADE80')}${bush(28, FLOOR + 26, 0.9)}</g>
  <!-- Khung thành -->
  <g transform="translate(1664 0)"><g class="e018-net"><path d="M0 200 L34 210 V282 L0 282Z" fill="#fff" opacity="0.25"/>
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M0 ${200 + i * 12} L34 ${210 + i * 10.3}" stroke="#E2E8F0" stroke-width="1"/>`).join('')}${[8, 17, 26].map((x) => `<path d="M${x} ${202 + x * 0.3} V282" stroke="#E2E8F0" stroke-width="1"/>`).join('')}</g>
    <path d="M0 282 V200 L34 210 V282" stroke="#fff" stroke-width="4" fill="none" stroke-linejoin="round"/><path d="M0 282 V200 L34 210 V282" stroke="${L}" stroke-width="0.8" fill="none"/></g>
  <g class="e018-lb e018-lb-goal">${label(1560, 120, 'GOAL!', '#DC2626', 22)}</g>
  <g transform="translate(1832 282)"><g class="e018-ghost">${GHOST_CAT}</g></g>`;
}

const CSS = `
.e018-sat { transform-origin: 0 0; transition: transform .6s cubic-bezier(.4,0,.2,1), opacity .6s; }
.st-sunday .e018-sat { transform: scaleY(0); opacity: 0; }
.e018-suncloud { transition: transform 1.4s cubic-bezier(.4,0,.2,1); }
.st-sunny .e018-suncloud { transform: translateX(-130px); }
.e018-sun { transition: transform 1s cubic-bezier(.3,1.6,.6,1); }
.st-sunny .e018-sun { transform: scale(1.2); }
.e018-merc { transform-origin: 0 0; transform: scaleY(.3); transition: transform 1.4s ease-out; }
.st-warm .e018-merc { transform: scaleY(1); }
.e018-lb { opacity: 0; transition: opacity .3s; }
.st-lb-sunny .e018-lb-sunny, .st-lb-warm .e018-lb-warm, .st-lb-fast .e018-lb-fast, .st-lb-kitty .e018-lb-kitty, .st-lb-lake .e018-lb-lake,
.st-lb-busy .e018-lb-busy, .st-lb-goal .e018-lb-goal { opacity: 1; }
.e018-ghost { opacity: 0; transition: opacity .4s; }
.st-lb-kitty .e018-ghost { opacity: 1; }
.st-goal .e018-net { animation: e018Net .12s linear 8 alternate; }
@keyframes e018Net { to { transform: translateX(4px); } }
.es-thing.is-walk .e018-roll { animation: e018Spin .35s linear infinite; }
.es-thing.is-walk .e018-wheel { animation: e018Spin .5s linear infinite; }
.es-thing.is-walk .e018-crank { animation: e018Spin .9s linear infinite; }
@keyframes e018Spin { to { transform: rotate(360deg); } }
.e018-bobw { animation: e018Bob 1.6s ease-in-out infinite alternate; }
@keyframes e018Bob { to { transform: translateY(2px) rotate(-2deg); } }
.e018-breathe { animation: e018Breathe 2.2s ease-in-out infinite alternate; }
@keyframes e018Breathe { to { transform: scale(1.04, 1.08); } }
.e018-glint { opacity: .3; transition: opacity .5s; }
.st-lake .e018-glint { opacity: 1; animation: e018Twinkle .6s ease-in-out infinite alternate; }
@keyframes e018Twinkle { to { opacity: .4; } }
.e018-kite { transform: scale(.08); opacity: 0; transition: transform 1.6s cubic-bezier(.3,0,.3,1), opacity .3s; }
.st-kite .e018-kite { transform: scale(1); opacity: 1; }
.e018-kitesway { animation: e018Kite 1.3s ease-in-out infinite alternate; }
@keyframes e018Kite { from { transform: rotate(-8deg) translate(-2px, 0); } to { transform: rotate(8deg) translate(3px, -4px); } }
/* đá bóng: chân phải vung lên */
.es-ac.act-e018-kick .pp-legwR { animation: e018Kick .42s ease-in-out infinite alternate; }
@keyframes e018Kick { from { transform: rotate(0); } to { transform: rotate(-52deg); } }
@media (prefers-reduced-motion: reduce) { .e018-kitesway, .e018-bobw, .e018-breathe { animation-duration: 4s; } }
`;

const POSES = {
  e018_kick: { R: [-20, -30], L: [40, 60] },
};

/** Một cú đá: chân vung, bóng lăn tới x. */
async function kick(st, who, to, speed) {
  st.pose(who, 'e018_kick'); st.act(who, 'e018-kick');
  await st.wait(260);
  st.act(who, null);
  await st.walk('ball', to, { speed, follow: false });
  st.pose(who, 'stand');
}

const BEATS = [
  { key: ['Sunday'], icon: '📅', label: 'Sunday', async play(st) {
    st.look(240);
    await st.wait(500);
    st.set('st-sunday'); st.sfx('page-turn');
    st.fx('sparkle', 151, 90);
    await st.wait(1100);
  } },
  { key: ['at the park'], icon: '🏞️', label: 'at the park', async play(st) {
    st.look(330);
    await Promise.all([
      st.walk('dad', 400, { speed: 120, follow: false }),
      st.walk('mum', 455, { speed: 120, follow: false }),
      st.walk('lan', 505, { speed: 120, follow: false }),
      st.walk('minh', 1180, { speed: 300, follow: false }),
      st.walk('lucky', 1110, { speed: 290, follow: false }),
    ]);
    st.fx('sparkle', 300, 110);
  } },
  { key: ['sunny', 'warm'], icon: '☀️', label: 'sunny and warm', async play(st) {
    st.look(430);
    st.set('st-sunny'); st.set('st-lb-sunny'); st.sfx('birds', { vol: 0.6 });
    st.pose('lan', 'pointUp'); st.mood('lan', 'joy'); st.mood('mum', 'joy');
    await st.wait(1100);
    st.set('st-warm'); st.set('st-lb-warm');
    st.pose('dad', 'wave'); st.act('dad', 'wave');
    await st.wait(1300);
    st.act('dad', null); st.pose('dad', 'stand'); st.pose('lan', 'stand'); st.mood('lan', 'happy'); st.mood('mum', 'happy');
    st.set('st-lb-sunny', false); st.set('st-lb-warm', false);
  } },
  { key: ['reading a newspaper', 'under a tree'], icon: '📰', label: 'newspaper', async play(st) {
    await st.walk('dad', 640, { speed: 130 });
    st.pose('dad', 'read'); st.chest('dad', NEWSPAPER);
    await st.wait(400);
    st.sfx('page-turn'); st.mood('dad', 'joy');
    await st.wait(1400);
    st.mood('dad', 'happy');
  } },
  { key: ['taking photos'], icon: '📷', label: 'taking photos', async play(st) {
    await st.walk('mum', 790, { speed: 150, lead: 40 });
    st.hold('mum', 'e018_camera'); st.pose('mum', 'phone');
    await st.wait(500);
    st.fx('sparkle', 800, 136);
    await st.fly(PHOTO, [800, 140], [880, 200], { size: 30, dur: 500 });
    st.fx('sparkle', 800, 136);
    await st.fly(PHOTO, [800, 140], [900, 190], { size: 30, dur: 500 });
    st.hold('mum', null); st.pose('mum', 'stand'); st.mood('mum', 'joy');
    await st.wait(300);
    st.mood('mum', 'happy');
  } },
  { key: ['sitting on a bench'], icon: '🪑', label: 'on a bench', async play(st) {
    await st.walk('lan', 1000, { speed: 170 });
    st.pose('lan', 'sit');
    await st.wait(600);
    st.mood('lan', 'joy');
    await st.wait(500);
    st.mood('lan', 'happy');
  } },
  { key: ['reading a book'], icon: '📖', label: 'reading a book', async play(st) {
    st.look(1000);
    st.chest('lan', 'book'); st.pose('lan', 'read');
    await st.wait(300);
    st.act('lan', 'read'); st.sfx('page-turn');
    await st.wait(1600);
  } },
  { key: ['playing football with Tom'], icon: '⚽', label: 'football', async play(st) {
    st.act('lan', null);
    await st.look(1270, { dur: 800 });
    await kick(st, 'minh', 1320, 320);
    await kick(st, 'tom', 1215, 320);
    st.mood('minh', 'joy'); st.mood('tom', 'joy');
    await st.wait(300);
  } },
  { key: ['running fast'], icon: '🏃', label: 'running fast', async play(st) {
    st.set('st-lb-fast');
    st.fx('poof', 1350, 270, { quiet: true });
    await st.walk('tom', 1580, { speed: 330, follow: false });
    await st.walk('tom', 1576, { speed: 60, follow: false });
    st.pose('tom', 'arms'); st.mood('tom', 'joy');
    await st.wait(600);
    st.set('st-lb-fast', false);
  } },
  { key: ['kicking the ball'], icon: '🦶', label: 'kicking', async play(st) {
    st.look(1420);
    st.mood('minh', 'wow');
    await kick(st, 'minh', 1680, 520);
    st.mood('tom', 'wow'); st.mood('minh', 'joy');
    await st.wait(300);
  } },
  { key: ['Goal'], icon: '🥅', label: 'Goal!', async play(st) {
    st.set('st-goal'); st.set('st-lb-goal');
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    st.pose('tom', 'clap'); st.act('tom', 'clap'); st.mood('tom', 'joy');
    st.fx('sparkle', 1680, 230);
    await st.wait(1800);
    st.act('minh', null); st.act('tom', null); st.pose('minh', 'stand'); st.pose('tom', 'stand');
    st.set('st-goal', false); st.set('st-lb-goal', false);
  } },
  { key: ['running after the ball'], icon: '🐕', label: 'Lucky runs', async play(st) {
    st.dog('lucky', 'stand'); st.mood('lucky', 'joy');
    st.sfx('dog-bark', { vol: 0.7 });
    await Promise.all([
      st.walk('ball', 1810, { speed: 150, follow: false }),
      st.walk('lucky', 1774, { speed: 380, lead: -20 }),
    ]);
    st.act('lucky', 'wag');
    await st.wait(400);
  } },
  { key: ['not here'], icon: '❔', label: 'not here', async play(st) {
    st.look(1800);
    st.set('st-lb-kitty');
    await st.walk('lucky', 1764, { speed: 80, follow: false });
    await st.wait(400);
    await st.walk('lucky', 1774, { speed: 80, follow: false });
    st.dog('lucky', 'sit');
    await st.wait(700);
  } },
  { key: ['sleeping at home'], icon: '😴', label: 'sleeping', async play(st) {
    st.set('st-lb-kitty', false);
    await st.look(1880, { dur: 700 });
    st.fx('zzz', 1876, 186);
    await st.wait(1900);
  } },
  { key: ['the lake'], icon: '🦆', label: 'the lake', async play(st) {
    st.dog('lucky', 'stand');
    st.set('st-lake'); st.set('st-lb-lake');
    await Promise.all([
      st.walk('lucky', 2090, { speed: 330, lead: 160 }),
      st.walk('duck1', 2240, { speed: 50, follow: false }),
      st.walk('duck2', 2280, { speed: 50, follow: false }),
    ]);
    st.sfx('dog-bark'); st.act('lucky', 'wag');
    await st.wait(500);
    st.set('st-lb-lake', false);
  } },
  { key: ['riding a bike'], icon: '🚲', label: 'riding a bike', async play(st) {
    st.look(2300);
    st.show('bike', true);
    await st.walk('bike', 2420, { speed: 170, follow: false });
    st.fx('sparkle', 2420, 190, { quiet: true });
    await st.wait(300);
  } },
  { key: ['flying a kite'], icon: '🪁', label: 'flying a kite', async play(st) {
    await st.look(2520, { dur: 700 });
    st.pose('girl', 'raise'); st.mood('girl', 'joy');
    st.set('st-kite');
    await st.wait(2000);
  } },
  { key: ['busy'], icon: '🚶', label: 'busy', async play(st) {
    st.look(2350);
    st.set('st-lb-busy'); st.show('jog', true);
    await Promise.all([
      st.walk('jog', 2560, { speed: 250, follow: false }),
      st.walk('boat', 2400, { speed: 70, follow: false }),
      st.walk('duck1', 2300, { speed: 50, follow: false }),
    ]);
    st.set('st-lb-busy', false);
  } },
  { key: ['Everyone is happy'], icon: '😊', label: 'everyone happy', async play(st) {
    st.mood('girl', 'joy'); st.act('girl', 'hop');
    st.pose('jog', 'wave'); st.act('jog', 'wave'); st.mood('jog', 'joy');
    st.act('lucky', 'jump'); st.mood('lucky', 'joy');
    st.fx('hearts', 2400, 150);
    await st.wait(900);
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    st.pose('tom', 'cheer'); st.act('tom', 'jump'); st.mood('tom', 'joy');
    await st.look(1450, { dur: 1100 });
    st.fx('hearts', 1400, 150);
    await st.wait(900);
    for (const id of ['girl', 'jog', 'lucky', 'minh', 'tom']) st.act(id, null);
    st.pose('minh', 'stand'); st.pose('tom', 'stand'); st.pose('jog', 'stand');
  } },
];

export default {
  id: 'en018', worldW: 2700, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  props: { e018_camera: CAMERA },
  cast: [
    { id: 'boat', kind: 'thing', x: 2250, y: 246, svg: BOAT, box: [-40, -64, 80, 70] },
    { id: 'duck1', kind: 'thing', x: 2160, y: 246, s: 0.9, svg: DUCK(1), box: [-20, -28, 44, 34] },
    { id: 'duck2', kind: 'thing', x: 2200, y: 248, s: 0.9, svg: DUCK(0.6, '#FDE047'), box: [-14, -18, 30, 22] },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 50, s: 0.95 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 100, s: 0.95 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 150, s: 1.08 },
    { id: 'lucky', kind: 'dog', x: 240, s: 0.9 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 196 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: 1340, face: -1 },
    { id: 'ball', kind: 'thing', x: 1215, svg: BALL_T, box: [-10, -19, 20, 20] },
    { id: 'girl', kind: 'kid', who: 'e018_girl', x: 2560 },
    { id: 'bike', kind: 'thing', x: 2010, svg: BIKE(), box: [-45, -126, 90, 128] },
    { id: 'jog', kind: 'adult', who: 'e018_jog', x: 2000, s: 0.92 },
  ],
  init(st) {
    st.show('bike', false); st.show('jog', false);
  },
};
