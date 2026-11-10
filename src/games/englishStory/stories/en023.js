/**
 * Bài 23 "What Time Is It?": nhà Minh cắt ngang (phòng ngủ · góc học · bếp) → sân trước (đồng hồ cột) → phố → lớp học.
 * Mỗi chỗ có một chiếc đồng hồ, kim quay tới đúng giờ của câu: 6:00 (báo thức), 6:30 (bếp), 7:00 · 11:00 · ngủ trưa 1 tiếng (lớp),
 * 4:30 · 5:00 (đồng hồ cột ở sân), 7:00 tối (bếp), 9:00 (báo thức). Buổi sáng Minh đi sang phải tới trường, chiều tối đi ngược về
 * bếp, góc học, phòng ngủ: đường đi trong đầu theo đúng thứ tự giờ trong ngày.
 * Toạ độ cảnh: rộng 1960, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { lying } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, grass, road, fence, room, doorway, board, desk, shelf, books, rug, label, BOWL, BALL, steam } from '../kit.js';

const FLOOR = 282;

/** Đồng hồ (tâm x, y, bán kính r). cls: tiền tố class của kim (cls-h, cls-m) để CSS quay kim theo trạng thái. */
const clock = (x, y, r, cls, { rim = '#3B82F6', alarm = false } = {}) => `<g transform="translate(${x} ${y})"><g class="${cls}">
  ${alarm ? `<circle cx="${-r * 0.7}" cy="${-r * 0.9}" r="${r * 0.36}" fill="#EF4444" stroke="${L}"/><circle cx="${r * 0.7}" cy="${-r * 0.9}" r="${r * 0.36}" fill="#EF4444" stroke="${L}"/>
    <path d="M${-r * 0.6} ${r * 0.85} l${-r * 0.25} ${r * 0.35} M${r * 0.6} ${r * 0.85} l${r * 0.25} ${r * 0.35}" stroke="${L}" stroke-width="2.2" stroke-linecap="round"/>` : ''}
  <circle r="${r + 4}" fill="#FDE68A" opacity="0" class="${cls}-glow e023-glow"/>
  <circle r="${r}" fill="#fff" stroke="${rim}" stroke-width="${Math.max(2.4, r * 0.16)}"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M0 ${-r * 0.82} V${-r * (i % 3 ? 0.7 : 0.6)}" stroke="${L}" stroke-width="${i % 3 ? 1 : 1.8}" transform="rotate(${i * 30})"/>`).join('')}
  <g class="${cls}-h e023-hand" style="transform-origin:0px 0px"><path d="M0 2 V${-r * 0.48}" stroke="${L}" stroke-width="${Math.max(2.2, r * 0.13)}" stroke-linecap="round"/></g>
  <g class="${cls}-m e023-hand" style="transform-origin:0px 0px"><path d="M0 3 V${-r * 0.74}" stroke="#DC2626" stroke-width="${Math.max(1.6, r * 0.08)}" stroke-linecap="round"/></g>
  <circle r="${Math.max(1.6, r * 0.08)}" fill="${L}"/></g></g>`;

/** Cửa sổ có trời ngày / đêm (lớp đêm .e023-nightwin hiện khi chưa sáng hoặc tối). */
const win = (x, y, w, h) => `<rect x="${x - 5}" y="${y - 5}" width="${w + 10}" height="${h + 10}" rx="4" fill="#fff" stroke="${L}" stroke-width="1.3"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#BAE6FD"/><path d="M${x} ${y + h - 16} Q${x + w * 0.4} ${y + h - 30} ${x + w} ${y + h - 18} V${y + h} H${x}Z" fill="#86EFAC"/>
  <g class="e023-nightwin"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#1E3A8A"/><circle cx="${x + w * 0.7}" cy="${y + h * 0.3}" r="${h * 0.13}" fill="#FEF9C3"/><circle cx="${x + w * 0.7 + h * 0.06}" cy="${y + h * 0.27}" r="${h * 0.11}" fill="#1E3A8A"/>
    ${[[0.2, 0.2], [0.35, 0.5], [0.15, 0.7], [0.5, 0.2]].map(([a, b]) => `<circle cx="${x + w * a}" cy="${y + h * b}" r="1.6" fill="#fff"/>`).join('')}</g>
  <path d="M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}" stroke="#fff" stroke-width="3" opacity="0.8"/>`;

const TRAY = `<rect x="-16" y="-5" width="32" height="7" rx="2" fill="#CBD5E1" stroke="${L}" stroke-width="0.8"/><path d="M-11 -5 Q-11 -11 -5 -11 Q1 -11 1 -5Z" fill="#fff" stroke="${L}" stroke-width="0.7"/>
  <circle cx="-5" cy="-8" r="2" fill="#FDE68A"/><path d="M4 -5 Q4 -10 9 -10 Q14 -10 14 -5Z" fill="#86EFAC" stroke="${L}" stroke-width="0.7"/>`;
const BALL_T = `<g class="e023-roll" style="transform-origin:0px -9px"><g transform="translate(0 -9)">${BALL('#fff')}<path d="M0 -3.6 l3.4 2.5 -1.3 4 h-4.2 l-1.3 -4Z" fill="#1F2937"/></g></g>`;

function bg() {
  return `
  ${sky(900, 560, 315, 'e023sky')}
  ${cloud(1000, 50, 0.9, 0)}${cloud(1240, 70, 0.8, 3)}${cloud(1400, 40, 0.7, 5)}
  <g class="e023-dusk"><rect x="900" y="0" width="560" height="${FLOOR}" fill="#1E3A8A"/>
    <circle cx="1150" cy="56" r="13" fill="#FEF9C3"/><circle cx="1157" cy="51" r="11" fill="#1E3A8A"/>
    ${[[960, 40], [1040, 80], [1230, 30], [1320, 70], [1400, 46]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="1.8" fill="#fff"/>`).join('')}</g>
  ${grass(900, 400, FLOOR)}
  ${fence(916, 360, FLOOR)}
  ${tree(1250, FLOOR - 6, 1)}
  ${road(1290, 170, FLOOR)}
  <!-- Đồng hồ cột ở góc sân -->
  <rect x="1296" y="112" width="8" height="${FLOOR - 112}" fill="#475569" stroke="${L}"/>
  ${clock(1300, 98, 22, 'e023-pc', { rim: '#16A34A' })}
  <!-- Phòng ngủ -->
  ${room(0, 320, FLOOR, '#E0E7FF')}
  ${win(70, 60, 100, 86)}
  <rect x="40" y="176" width="16" height="106" rx="3" fill="#A16207" stroke="${L}"/>
  <rect x="40" y="236" width="210" height="26" rx="4" fill="#fff" stroke="${L}"/><rect x="40" y="258" width="210" height="10" fill="#C2410C" stroke="${L}"/>
  <rect x="240" y="222" width="12" height="60" rx="3" fill="#A16207" stroke="${L}"/>
  <g class="e023-sleeper">${lying(155, 250, 'en_minh_pj', { len: 120, blanket: '#93C5FD' })}</g>
  <g class="e023-made"><rect x="66" y="222" width="44" height="18" rx="8" fill="#fff" stroke="${L}"/><path d="M130 238 Q190 226 238 236 V244 H130Z" fill="#93C5FD" stroke="${L}"/></g>
  <rect x="262" y="236" width="48" height="46" rx="3" fill="#D97706" stroke="${L}"/><rect x="268" y="250" width="36" height="10" rx="2" fill="none" stroke="${L}" stroke-width="0.8"/>
  ${clock(286, 218, 14, 'e023-ac', { rim: '#EF4444', alarm: true })}
  <g class="e023-ring"><path d="M262 202 l-7 -5 M310 202 l7 -5 M260 216 h-8 M312 216 h8" stroke="#EF4444" stroke-width="2.4" stroke-linecap="round"/></g>
  <g transform="translate(240 80)"><rect x="-26" y="-20" width="52" height="40" rx="3" fill="#FDE68A" stroke="${L}"/><path d="M-18 12 L-6 -6 L4 6 L10 -2 L20 12Z" fill="#22C55E" stroke="${L}" stroke-width="0.8"/><circle cx="12" cy="-10" r="4" fill="#F97316"/></g>
  <!-- Góc học -->
  ${room(320, 240, FLOOR, '#FEF3C7')}
  ${shelf(360, 120, 110, books(368, 120, 8) + `<g transform="translate(456 106)"><circle r="9" fill="#38BDF8" stroke="${L}"/><path d="M-8 -3 Q0 4 8 -3" stroke="#22C55E" stroke-width="3" fill="none"/></g>`)}
  <path d="M500 222 V180" stroke="#475569" stroke-width="3"/><path d="M500 180 L520 168" stroke="#475569" stroke-width="3"/>
  <path d="M510 160 L534 160 L528 176 L516 176Z" fill="#F59E0B" stroke="${L}"/>
  <polygon class="e023-lamp" points="516,176 528,176 548,222 496,222" fill="#FEF08A"/>
  <rect x="386" y="230" width="40" height="8" rx="2" fill="#2563EB" stroke="${L}"/><path d="M392 238 V282 M420 238 V282" stroke="${L}" stroke-width="3"/>
  ${rug(440, FLOOR, 140, '#FDBA74')}
  <!-- Bếp -->
  ${room(560, 340, FLOOR, '#DCFCE7')}
  ${clock(650, 70, 20, 'e023-kc', { rim: '#16A34A' })}
  ${win(730, 58, 90, 80)}
  <rect x="834" y="200" width="64" height="82" fill="#16A34A" stroke="${L}"/><rect x="830" y="194" width="70" height="9" rx="3" fill="#F5F5F4" stroke="${L}"/>
  <g transform="translate(864 186)"><path d="M-16 -6 H16 V8 Q16 12 12 12 H-12 Q-16 12 -16 8Z" fill="#94A3B8" stroke="${L}"/><ellipse cx="0" cy="-6" rx="16" ry="3.4" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/></g>
  ${steam(864, 174, 'e023-potsteam')}
  ${doorway(320, FLOOR)}${doorway(560, FLOOR)}
  <!-- Cửa trước -->
  <rect x="888" y="0" width="24" height="104" fill="#E9D5B5" stroke="${L}"/><rect x="888" y="104" width="6" height="${FLOOR - 104}" fill="#C08B5C" stroke="${L}" stroke-width="0.8"/>
  <rect x="0" y="0" width="900" height="12" fill="#E9D5B5" stroke="${L}"/>
  <!-- Lớp học -->
  ${room(1460, 500, FLOOR, '#FEF9C3')}
  <rect x="1452" y="0" width="16" height="${FLOOR}" fill="#FDE68A" stroke="${L}"/>
  <rect x="1376" y="36" width="92" height="24" rx="4" fill="#fff" stroke="${L}"/><text x="1422" y="54" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#1D4ED8">SCHOOL</text>
  ${clock(1520, 74, 20, 'e023-cc', { rim: '#3B82F6' })}
  ${board(1580, 56, 210, 92, 'Good morning!')}
  ${win(1830, 60, 100, 86)}
  <g class="e023-mats">${[1690, 1800, 1910].map((x, i) => `<rect x="${x - 50}" y="${FLOOR - 6}" width="100" height="8" rx="3" fill="${['#93C5FD', '#FDA4AF', '#86EFAC'][i]}" stroke="${L}" stroke-width="0.8"/>`).join('')}
    ${lying(1704, FLOOR - 2, 'en_minh', { s: 0.85, len: 80, blanket: '#FDE68A' })}${lying(1814, FLOOR - 2, 'en_tom', { s: 0.85, len: 80, blanket: '#C4B5FD' })}${lying(1924, FLOOR - 2, 'en_lan', { s: 0.85, len: 80, blanket: '#FBCFE8' })}</g>
  <!-- Nhãn giờ -->
  ${[['q1', 286, 176, '?', '#7C3AED', 20], ['t6', 286, 176, '6:00', '#DC2626', 18], ['t630', 650, 124, '6:30', '#DC2626', 18], ['t7', 1520, 128, '7:00', '#DC2626', 18],
    ['late', 1640, 172, 'never late', '#16A34A', 16], ['t11', 1520, 128, '11:00', '#DC2626', 18], ['hour', 1520, 128, '1 hour', '#7C3AED', 18],
    ['t430', 1300, 152, '4:30', '#DC2626', 18], ['t5', 1300, 152, '5:00', '#DC2626', 18], ['t7pm', 650, 124, '7:00', '#DC2626', 18],
    ['q2', 286, 176, '?', '#7C3AED', 20], ['t9', 286, 176, '9:00', '#DC2626', 18]]
    .map(([k, x, y, t, c, s]) => `<g class="e023-lb e023-lb-${k}">${label(x, y, t, c, s)}</g>`).join('')}`;
}

/** Lớp trước nhân vật: bàn ăn, bàn học, bàn lớp (che chân người ngồi), khay cơm, bóng tối phòng ngủ. */
function fg() {
  return `
  <rect x="${440 - 60}" y="222" width="120" height="9" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
  <rect x="${440 - 54}" y="231" width="10" height="51" fill="#92400E" stroke="${L}"/><rect x="${440 + 44}" y="231" width="10" height="51" fill="#92400E" stroke="${L}"/>
  <g class="e023-book"><rect x="420" y="214" width="34" height="8" rx="1" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M437 214 V222" stroke="${L}" stroke-width="0.6"/></g>
  <path d="M624 238 H868 V264 Q746 276 624 264Z" fill="#FFF7ED" stroke="${L}" stroke-width="1.1"/>
  ${Array.from({ length: 11 }, (_, i) => `<path d="M${636 + i * 22} 240 V266" stroke="#FCA5A5" stroke-width="3" opacity="0.7"/>`).join('')}
  <rect x="616" y="232" width="260" height="8" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
  <rect x="640" y="264" width="9" height="18" fill="#92400E" stroke="${L}"/><rect x="842" y="264" width="9" height="18" fill="#92400E" stroke="${L}"/>
  <g class="e023-bfast"><g transform="translate(756 228)">${BOWL}</g>${steam(756, 218, '')}</g>
  <g class="e023-dinner">${[[656, BOWL], [756, BOWL], [846, BOWL]].map(([x, s]) => `<g transform="translate(${x} 228)">${s}</g>`).join('')}
    <g transform="translate(706 226)"><ellipse rx="22" ry="6" fill="#fff" stroke="${L}"/><ellipse cy="-3" rx="16" ry="5" fill="#22C55E" stroke="${L}" stroke-width="0.7"/></g>
    <g transform="translate(800 226)"><ellipse rx="18" ry="5" fill="#fff" stroke="${L}"/><path d="M-12 -3 Q0 -10 12 -3" fill="#F97316" stroke="${L}" stroke-width="0.7"/></g></g>
  ${[1690, 1800, 1910].map((x) => desk(x, FLOOR, '#F59E0B')).join('')}
  <g class="e023-trays">${[1690, 1800, 1910].map((x) => `<g transform="translate(${x} ${FLOOR - 57})">${TRAY}</g>`).join('')}</g>
  <rect class="e023-dark" x="0" y="0" width="320" height="315" fill="#0F172A"/>
  <g class="e023-darkstars">${[[60, 190], [130, 170], [220, 196]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="1.6" fill="#FEF9C3"/>`).join('')}</g>`;
}

const CSS = `
.e023-nightwin { transition: opacity 1.2s; }
.st-day .e023-nightwin { opacity: 0; }
.st-night .e023-nightwin { opacity: 1; }
.e023-dusk { opacity: 0; transition: opacity 1.4s; }
.st-night .e023-dusk { opacity: .6; }
.e023-sleeper, .e023-made, .e023-mats { transition: opacity .4s; }
.e023-sleeper { opacity: 0; } .st-sleep .e023-sleeper { opacity: 1; }
svg:not(.st-sleep) .e023-made { opacity: 1; } .st-sleep .e023-made { opacity: 0; }
.e023-mats { opacity: 0; } .st-nap .e023-mats { opacity: 1; }
.e023-lb { opacity: 0; transition: opacity .3s; }
${['q1', 't6', 't630', 't7', 'late', 't11', 'hour', 't430', 't5', 't7pm', 'q2', 't9'].map((k) => `.st-lb-${k} .e023-lb-${k}`).join(', ')} { opacity: 1; }
/* Kim đồng hồ: [giờ, phút] tính bằng độ; transition để kim quay tới giờ mới */
.e023-hand { transition: transform 1.6s cubic-bezier(.4,0,.2,1); }
.e023-ac-h { transform: rotate(175deg); } .e023-ac-m { transform: rotate(300deg); }
.st-spin .e023-ac-m { animation: e023Spin 1.2s linear infinite; }
@keyframes e023Spin { from { transform: rotate(300deg); } to { transform: rotate(660deg); } }
.st-t6 .e023-ac-h { transform: rotate(180deg); } .st-t6 .e023-ac-m { transform: rotate(360deg); }
.st-t9 .e023-ac-h { transform: rotate(270deg); transition-duration: 2.4s; } .st-t9 .e023-ac-m { transform: rotate(1440deg); transition-duration: 2.4s; }
.e023-kc-h { transform: rotate(195deg); } .e023-kc-m { transform: rotate(180deg); }
.st-k7 .e023-kc-h { transform: rotate(210deg); } .st-k7 .e023-kc-m { transform: rotate(360deg); }
.e023-cc-h { transform: rotate(210deg); } .e023-cc-m { transform: rotate(0deg); }
.st-c11 .e023-cc-h { transform: rotate(330deg); transition-duration: 2.2s; } .st-c11 .e023-cc-m { transform: rotate(1440deg); transition-duration: 2.2s; }
.st-c12 .e023-cc-h { transform: rotate(360deg); transition-duration: 3s; } .st-c12 .e023-cc-m { transform: rotate(1800deg); transition-duration: 3s; }
.e023-pc-h { transform: rotate(135deg); } .e023-pc-m { transform: rotate(180deg); }
.st-p5 .e023-pc-h { transform: rotate(150deg); } .st-p5 .e023-pc-m { transform: rotate(360deg); }
.e023-glow { transition: opacity .4s; }
.st-g-ac .e023-ac-glow, .st-g-kc .e023-kc-glow, .st-g-cc .e023-cc-glow, .st-g-pc .e023-pc-glow { opacity: .9; animation: e023Pulse .7s ease-in-out infinite alternate; }
@keyframes e023Pulse { from { transform: scale(.92); } to { transform: scale(1.2); } }
.e023-ring { opacity: 0; }
.st-ring .e023-ac { animation: e023Shake .09s linear infinite alternate; transform-origin: 0 0; }
.st-ring .e023-ring { opacity: 1; }
@keyframes e023Shake { from { transform: rotate(-10deg); } to { transform: rotate(10deg); } }
.e023-lamp { opacity: 0; transition: opacity .4s; } .st-lamp .e023-lamp { opacity: .5; }
.e023-potsteam { opacity: 0; transition: opacity .4s; } .st-cook .e023-potsteam { opacity: 1; }
.e023-bfast, .e023-dinner, .e023-trays, .e023-book { opacity: 0; transition: opacity .3s; }
.st-bfast .e023-bfast, .st-dinner .e023-dinner, .st-lunch .e023-trays, .st-hw .e023-book { opacity: 1; }
.e023-dark, .e023-darkstars { opacity: 0; transition: opacity 1.2s; pointer-events: none; }
.st-dark .e023-dark { opacity: .55; } .st-dark .e023-darkstars { opacity: 1; }
.es-thing.is-walk .e023-roll { animation: e023Roll .35s linear infinite; }
@keyframes e023Roll { to { transform: rotate(360deg); } }
.es-ac.act-e023-kick .pp-legwR { animation: e023Kick .42s ease-in-out infinite alternate; }
@keyframes e023Kick { from { transform: rotate(0); } to { transform: rotate(-52deg); } }
@media (prefers-reduced-motion: reduce) { .st-spin .e023-ac-m { animation-duration: 3s; } .st-ring .e023-ac { animation-duration: .3s; } }
`;

const POSES = { e023_kick: { R: [-20, -30], L: [40, 60] }, e023_yawn: { R: [150, 262], L: [10, 4], head: -6 } };

async function kick(st, who, to, speed) {
  st.pose(who, 'e023_kick'); st.act(who, 'e023-kick');
  await st.wait(260);
  st.act(who, null);
  await st.walk('ball', to, { speed, follow: false });
  st.pose(who, 'stand');
}
/** Đổi nhãn giờ: tắt mọi nhãn, bật nhãn k. */
const LBS = ['q1', 't6', 't630', 't7', 'late', 't11', 'hour', 't430', 't5', 't7pm', 'q2', 't9'];
function lb(st, k) { LBS.forEach((n) => st.set(`st-lb-${n}`, n === k)); }
function glow(st, k) { ['ac', 'kc', 'cc', 'pc'].forEach((n) => st.set(`st-g-${n}`, n === k)); }

const BEATS = [
  { key: ['What time is it'], icon: '❓', label: 'What time?', async play(st) {
    st.look(170);
    st.set('st-spin'); lb(st, 'q1'); glow(st, 'ac');
    st.fx('zzz', 150, 200);
    await st.wait(2000);
  } },
  { key: ["six o'clock"], icon: '🕕', label: "six o'clock", async play(st) {
    st.look(170);
    st.set('st-spin', false); st.set('st-t6');
    await st.wait(900);
    lb(st, 't6'); st.set('st-ring'); st.sfx('alarm-clock');
    await st.wait(1400);
    st.set('st-ring', false);
  } },
  { key: ['gets up', 'every day'], icon: '⏰', label: 'gets up', async play(st) {
    st.look(200);
    st.set('st-sleep', false); st.show('minh', true);
    st.pose('minh', 'stretch'); st.act('minh', 'stretch'); st.mood('minh', 'shut');
    st.set('st-day');
    await st.wait(1500);
    st.act('minh', null); st.mood('minh', 'happy'); st.pose('minh', 'stand');
    lb(st, null); glow(st, null);
    await st.wait(300);
  } },
  { key: ['has breakfast', 'half past six'], icon: '🍜', label: 'breakfast', async play(st) {
    st.set('st-cook');
    await st.walk('minh', 756, { speed: 175, lead: -20 });
    lb(st, 't630'); glow(st, 'kc');
    st.pose('mum', 'give');
    await st.fly(BOWL, [864, 180], [756, 228], { dur: 650 });
    st.set('st-bfast'); st.sfx('bowl-down'); st.pose('mum', 'stand');
    st.pose('minh', 'sit');
    await st.wait(300);
    st.hold('minh', 'chopsticks'); st.pose('minh', 'eat'); st.act('minh', 'eat'); st.sfx('slurp');
    await st.wait(1500);
    st.act('minh', null); st.hold('minh', null); st.pose('minh', 'sit'); st.set('st-bfast', false); st.set('st-cook', false);
  } },
  { key: ['Lessons start', "seven o'clock"], icon: '🏫', label: 'lessons', async play(st) {
    lb(st, null); glow(st, null);
    await st.dress('minh', 'en_minh');
    st.bag('minh', true); st.sfx('bag-on');
    st.pose('minh', 'stand');
    await st.walk('minh', 1700, { speed: 240, lead: 40 });
    await st.walk('minh', 1690, { speed: 60, follow: false });
    st.bag('minh', false); st.pose('minh', 'sit'); st.look(1640);
    lb(st, 't7'); glow(st, 'cc'); st.sfx('alarm-clock', { vol: 0.5, rate: 1.3 });
    st.pose('hoa', 'wave'); st.act('hoa', 'wave'); st.mood('hoa', 'joy');
    await st.wait(1300);
    st.act('hoa', null); st.pose('hoa', 'stand'); st.mood('hoa', 'happy');
  } },
  { key: ['never late'], icon: '👩‍🏫', label: 'never late', async play(st) {
    st.look(1640);
    lb(st, 'late'); glow(st, 'cc');
    st.pose('hoa', 'pointUp'); st.act('hoa', 'point'); st.mood('hoa', 'joy');
    st.fx('sparkle', 1520, 74);
    await st.wait(900);
    st.act('minh', 'nod'); st.act('tom', 'nod');
    await st.wait(1200);
    st.act('hoa', null); st.act('minh', null); st.act('tom', null); st.pose('hoa', 'stand'); st.mood('hoa', 'happy');
  } },
  { key: ['have lunch', "eleven o'clock"], icon: '🍱', label: 'lunch', async play(st) {
    st.look(1640);
    lb(st, null); st.set('st-c11'); glow(st, 'cc');
    await st.wait(1500);
    lb(st, 't11'); st.set('st-lunch'); st.sfx('bowl-down');
    for (const id of ['minh', 'tom', 'lan']) { st.hold(id, 'spoon'); st.pose(id, 'eat'); st.act(id, 'eat'); }
    await st.wait(1800);
    for (const id of ['minh', 'tom', 'lan']) { st.act(id, null); st.hold(id, null); st.pose(id, 'sit'); }
  } },
  { key: ['sleep for an hour'], icon: '😴', label: 'sleep', async play(st) {
    st.look(1660);
    st.set('st-lunch', false); lb(st, null);
    for (const id of ['minh', 'tom', 'lan']) st.show(id, false);
    st.set('st-nap');
    await st.wait(400);
    st.set('st-c12'); lb(st, 'hour');
    st.fx('zzz', 1690, 240); st.fx('zzz', 1910, 240, { quiet: true });
    await st.wait(3000);
  } },
  { key: ['goes home', 'half past four'], icon: '🏠', label: 'goes home', async play(st) {
    st.set('st-nap', false); glow(st, null); lb(st, null);
    for (const id of ['minh', 'tom', 'lan']) { st.show(id, true); st.pose(id, 'stand'); }
    st.bag('minh', true);
    await Promise.all([
      st.walk('minh', 1150, { speed: 230, lead: 0 }),
      (async () => { await st.wait(300); await st.walk('tom', 1262, { speed: 230, follow: false }); })(),
    ]);
    await st.walk('minh', 1156, { speed: 40, follow: false });
    lb(st, 't430'); glow(st, 'pc');
    st.mood('minh', 'joy');
    await st.wait(700);
    st.mood('minh', 'happy');
  } },
  { key: ['plays football with Tom', "five o'clock"], icon: '⚽', label: 'football', async play(st) {
    st.bag('minh', false); st.dress('minh', 'en_minh_home');
    st.look(1180);
    st.set('st-p5'); lb(st, 't5');
    await st.wait(600);
    await kick(st, 'tom', 1176, 260);
    await kick(st, 'minh', 1236, 260);
    await kick(st, 'tom', 1180, 260);
    st.mood('minh', 'joy'); st.mood('tom', 'joy');
    await st.wait(300);
  } },
  { key: ['runs after the ball'], icon: '🐕', label: 'Lucky runs', async play(st) {
    st.look(1060);
    lb(st, null); glow(st, null);
    st.mood('minh', 'wow'); st.mood('tom', 'wow');
    st.dog('lucky', 'stand'); st.mood('lucky', 'joy'); st.sfx('dog-bark', { vol: 0.7 });
    await Promise.all([
      st.walk('ball', 960, { speed: 200, follow: false }),
      (async () => { await st.wait(250); await st.walk('lucky', 990, { speed: 260, follow: false }); })(),
    ]);
    st.act('lucky', 'wag'); st.mood('minh', 'joy'); st.mood('tom', 'joy'); st.pose('minh', 'clap'); st.act('minh', 'clap');
    await st.wait(900);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['has dinner', "seven o'clock"], icon: '🍽️', label: 'dinner', async play(st) {
    st.set('st-night'); st.act('lucky', null); st.dog('lucky', 'sit');
    st.walk('tom', 1480, { speed: 240, follow: false }).then(() => st.show('tom', false));
    await st.walk('minh', 756, { speed: 230, lead: -20 });
    st.pose('minh', 'sit'); st.pose('mum', 'sit'); st.show('dad', true); st.pose('dad', 'sit');
    st.set('st-k7'); glow(st, 'kc'); st.set('st-dinner'); st.sfx('bowl-down');
    await st.wait(700);
    lb(st, 't7pm'); st.mood('dad', 'joy'); st.mood('mum', 'joy');
    st.hold('minh', 'chopsticks'); st.pose('minh', 'eat'); st.act('minh', 'eat');
    await st.wait(1500);
    st.act('minh', null); st.hold('minh', null); st.pose('minh', 'sit'); st.mood('dad', 'happy'); st.mood('mum', 'happy');
  } },
  { key: ['does his homework'], icon: '✏️', label: 'homework', async play(st) {
    lb(st, null); glow(st, null); st.set('st-dinner', false);
    st.pose('minh', 'stand');
    await st.walk('minh', 446, { speed: 170 });
    await st.walk('minh', 440, { speed: 40, follow: false });
    st.set('st-lamp'); st.set('st-hw');
    st.pose('minh', 'write'); st.hold('minh', 'pencil'); st.act('minh', 'write'); st.sfx('page-turn');
    await st.wait(2000);
  } },
  { key: ['When is bedtime'], icon: '🛏️', label: 'bedtime?', async play(st) {
    st.look(340);
    st.act('minh', null); st.hold('minh', null);
    st.pose('minh', 'e023_yawn'); st.mood('minh', 'shut');
    lb(st, 'q2'); glow(st, 'ac');
    await st.wait(1600);
    st.mood('minh', 'happy'); st.pose('minh', 'sit');
    await st.wait(300);
  } },
  { key: ["nine o'clock"], icon: '🕘', label: "nine o'clock", async play(st) {
    st.look(340);
    st.set('st-t9');
    await st.wait(2400);
    lb(st, 't9'); st.set('st-ring'); st.sfx('alarm-clock', { vol: 0.6 });
    st.mood('minh', 'wow');
    await st.wait(1000);
    st.set('st-ring', false); st.mood('minh', 'happy');
  } },
  { key: ['goes to bed', "nine o'clock"], icon: '🛌', label: 'goes to bed', async play(st) {
    st.set('st-lamp', false); st.set('st-hw', false);
    st.pose('minh', 'stand');
    await st.walk('minh', 160, { speed: 160 });
    await st.dress('minh', 'en_minh_pj');
    await st.wait(300);
    st.show('minh', false); st.set('st-sleep');
    lb(st, 't9');
    await st.wait(900);
  } },
  { key: ['Good night'], icon: '🌙', label: 'Good night', async play(st) {
    lb(st, null); glow(st, null);
    st.walk('mum', 345, { speed: 260, follow: false });
    st.look(200);
    await st.wait(2300);
    st.pose('mum', 'wave'); st.act('mum', 'wave');
    await st.say('mum', 'Good night!', 1400);
    st.act('mum', null); st.pose('mum', 'stand');
    st.set('st-dark');
    st.fx('zzz', 150, 200);
    await st.wait(1200);
  } },
];

export default {
  id: 'en023', worldW: 1960, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  cast: [
    { id: 'minh', kind: 'kid', who: 'en_minh_pj', x: 200 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 656, s: 0.95 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 860, s: 0.95, face: -1 },
    { id: 'lucky', kind: 'dog', x: 1040, s: 0.9 },
    { id: 'ball', kind: 'thing', x: 1206, svg: BALL_T, box: [-10, -19, 20, 20] },
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 1550, s: 0.95 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 1800, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 1910, face: -1, s: 1.04 },
  ],
  init(st) {
    st.show('minh', false); st.show('dad', false);
    st.set('st-sleep');
    st.pose('tom', 'sit'); st.pose('lan', 'sit');
    st.dog('lucky', 'sit');
  },
};
