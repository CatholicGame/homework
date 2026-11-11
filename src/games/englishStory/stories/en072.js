/**
 * Bài 72 "The Football Final" (hiện tại hoàn thành + quá khứ đơn): đi từ trái sang phải: bảng kết quả trước sân (6 trận, 6 dấu
 * thắng) → cổng sân có băng rôn FINAL và lịch SAT → sân bóng (khán đài đầy phụ huynh, bảng tỉ số, khung thành hai đầu):
 * hiệp 1 đội đỏ ghi bàn vào khung thành trái, hiệp 2 Tom phất bóng dài cho Minh ghi bàn ở khung thành phải, rồi Minh ghi thêm
 * bàn nữa, thắng 2–1, nhận huy chương vàng → nhà Minh (khoe huy chương với bố, mẹ, chị Lan và cả Kitty).
 * Toạ độ cảnh: rộng 2260, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, room, windowBox, rug, BALL } from '../kit.js';

const FLOOR = 282;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { board: 190, gate: 520, f0: 620, goalL: 660, mid: 1060, goalR: 1460, f1: 1520, home: 1600, dad: 1700, mum: 1780, lan: 1880, kitty: 2010 };

Object.assign(CAST, {
  e072_minh: { hair: 'spiky', top: 'tee', shirt: '#2563EB', bottom: 'shorts', bottomC: '#FFFFFF', shoe: '#F59E0B' },
  e072_tom: { hair: 'neat', hairC: '#E0A33A', top: 'tee', shirt: '#2563EB', bottom: 'shorts', bottomC: '#FFFFFF', shoe: '#16A34A' },
  e072_gk: { hair: 'short', top: 'tee', shirt: '#16A34A', bottom: 'shorts', bottomC: '#1F2937', shoe: '#F5F5F4' },
  e072_r1: { hair: 'bowl', top: 'tee', shirt: '#DC2626', bottom: 'shorts', bottomC: '#1F2937', shoe: '#F5F5F4' },
  e072_r2: { hair: 'curly', hairC: '#3F2A1E', top: 'tee', shirt: '#DC2626', bottom: 'shorts', bottomC: '#1F2937', shoe: '#F5F5F4' },
  e072_rgk: { hair: 'neat', top: 'tee', shirt: '#FACC15', bottom: 'shorts', bottomC: '#1F2937', shoe: '#F5F5F4' },
});

const T = (x, y, s, c, size = 12) => `<text x="${x}" y="${y}" text-anchor="middle" ${NUN} font-size="${size}" fill="${c}">${s}</text>`;
/** Số áo (gốc giữa ngực trẻ em). */
const NUM = (n) => `<g transform="translate(0 -18)"><g class="es-unflip">${T(0, 5, n, '#fff', 13)}</g></g>`;
const MEDAL = `<g transform="translate(0 -14)"><path d="M-7 -24 L0 -6 L7 -24" stroke="#DC2626" stroke-width="3.6" fill="none"/><circle r="9" fill="#FACC15" stroke="#B45309" stroke-width="1.4"/>
  <path d="M0 -4.6 l1.4 3 h3.2 l-2.6 2 1 3.2 -3 -2 -3 2 1 -3.2 -2.6 -2 h3.2Z" fill="#FDE68A" stroke="#B45309" stroke-width="0.5"/></g>`;
const SOCCER = BALL('#fff').replace('stroke="#fff"', 'stroke="#1F2937"');
/** Khung thành nhìn nghiêng; dir = 1 miệng khung quay sang phải. */
const goal = (x, dir, k) => `<g transform="translate(${x} ${FLOOR}) scale(${dir} 1)"><g class="e072-net e072-net${k}" style="transform-origin:-30px -50px">
  <path d="M0 -100 L-56 -84 V0" fill="none" stroke="#CBD5E1" stroke-width="1.2"/>
  ${[-14, -28, -42].map((dx) => `<path d="M${dx} ${-100 + (-dx * 16) / 56} V0" stroke="#E2E8F0" stroke-width="1"/>`).join('')}
  ${[-20, -40, -60, -80].map((y) => `<path d="M0 ${y} L-56 ${y * 0.84}" stroke="#E2E8F0" stroke-width="1"/>`).join('')}</g>
  <path d="M0 0 V-100 L-56 -84" stroke="#fff" stroke-width="5" fill="none"/><path d="M0 0 V-100 L-56 -84" stroke="${L}" stroke-width="0.8" fill="none"/></g>`;

const POSES = {
  e072_nervous: { R: [24, -140], L: [24, -140], head: 8 },  // hai tay nắm trước miệng, lo
  e072_kick: { R: [60, 40], L: [50, 30], head: 6 },         // dang tay giữ thăng bằng khi sút
  e072_show: { R: [30, -120], L: [70, 92], head: 4 },       // một tay chỉ huy chương, một tay chìa ra
  e072_two: { R: [150, 168], L: [150, 168], head: -4 },     // giơ hai tay (hai bàn)
  e072_gkL: { R: [120, 140], L: [120, 140] },               // thủ môn dang tay
};

function bg() {
  const crowd = Array.from({ length: 3 }, (_, r) => Array.from({ length: 22 }, (_, i) => {
    const who = ['en_mum', 'en_dad', 'en_grandpa', 'en_grandma', 'hangXom', 'en_hoa', 'en_mum_home', 'en_dad_home'][(i * 3 + r * 5) % 8];
    const x = 690 + i * 36 + (r % 2) * 18, y = 132 + r * 28;
    return `<g class="e072-fan" style="transition-delay:${((i * 7 + r * 3) % 11) * 0.08}s"><g transform="translate(${x} ${y})">${headOnly(who, { s: 0.75 })}</g></g>`;
  }).join('')).join('');
  return `
  ${sky(0, X.home, 315, 'e072sky')}${cloud(150, 60, 0.9, 0)}${cloud(900, 40, 0.8, 2)}${cloud(1350, 56, 0.9, 4)}
  <path d="M0 216 Q260 190 560 212 V${FLOOR} H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(60, FLOOR - 4, 1.2)}
  <rect x="0" y="${FLOOR - 4}" width="${X.f0}" height="40" fill="#CBD5E1" stroke="${L}"/>
  <!-- bảng kết quả 6 trận -->
  <g transform="translate(${X.board} 0)"><rect x="-6" y="148" width="8" height="${FLOOR - 148}" fill="#78716C"/>
    <rect x="-96" y="56" width="192" height="122" rx="6" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="-96" y="56" width="192" height="22" rx="6" fill="#2563EB" stroke="${L}"/>
    ${T(0, 72, 'OUR MATCHES', '#fff', 13)}
    ${Array.from({ length: 6 }, (_, i) => { const cx = -60 + (i % 3) * 60, cy = 102 + Math.floor(i / 3) * 44; return `<rect x="${cx - 26}" y="${cy - 16}" width="52" height="34" rx="4" fill="#EFF6FF" stroke="${L}" stroke-width="0.8"/>${T(cx, cy - 2, `Match ${i + 1}`, '#334155', 9)}
      <g class="e072-tick" style="transition-delay:${i * 0.32}s"><g transform="translate(${cx} ${cy + 9})"><circle r="7" fill="#22C55E" stroke="${L}" stroke-width="0.7"/><path d="M-3.4 0 L-1 2.6 L3.6 -2.6" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></g></g>`; }).join('')}
    <rect x="-46" y="178" width="8" height="${FLOOR - 178}" fill="#78716C" stroke="${L}" stroke-width="0.6"/><rect x="38" y="178" width="8" height="${FLOOR - 178}" fill="#78716C" stroke="${L}" stroke-width="0.6"/></g>
  <!-- cổng sân, băng rôn FINAL, lịch -->
  <g transform="translate(${X.gate} 0)"><rect x="-70" y="96" width="14" height="${FLOOR - 96}" fill="#E7E5E4" stroke="${L}"/><rect x="56" y="96" width="14" height="${FLOOR - 96}" fill="#E7E5E4" stroke="${L}"/>
    <g class="e072-final"><rect x="-84" y="58" width="168" height="40" rx="6" fill="#FACC15" stroke="${L}" stroke-width="1.4"/>${T(0, 88, 'FINAL', '#B91C1C', 28)}</g>
    <g transform="translate(-112 112)"><rect x="-24" y="0" width="48" height="50" rx="4" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-24" y="0" width="48" height="15" rx="4" fill="#EF4444" stroke="${L}"/>
      ${T(0, 12, 'SAT', '#fff', 10)}<g class="e072-calpage" style="transform-origin:0px 15px"><rect x="-22" y="15" width="44" height="33" fill="#F8FAFC"/>${T(0, 40, '?', '#94A3B8', 18)}</g>
      <g class="e072-calday">${T(0, 40, '15', '#1F2937', 18)}</g></g></g>
  <!-- khán đài + phụ huynh -->
  <path d="M${X.f0 + 40} 112 H${X.f1 - 20} V226 H${X.f0 + 40}Z" fill="#94A3B8" stroke="${L}" stroke-width="1.2"/>
  ${[126, 154, 182, 210].map((y) => `<path d="M${X.f0 + 40} ${y} H${X.f1 - 20}" stroke="#64748B" stroke-width="2"/>`).join('')}
  ${crowd}
  <path d="M${X.f0 + 40} 112 L${X.f0 + 40} 100 H${X.f1 - 20} V112" fill="#2563EB" stroke="${L}"/>
  <!-- bảng tỉ số -->
  <g transform="translate(${X.mid} 0)"><rect x="-4" y="88" width="8" height="24" fill="#475569"/><rect x="-78" y="42" width="156" height="48" rx="6" fill="#1F2937" stroke="${L}" stroke-width="1.4"/>
    <rect x="-70" y="48" width="30" height="12" rx="2" fill="#2563EB"/><rect x="40" y="48" width="30" height="12" rx="2" fill="#DC2626"/>
    ${[['0', '0', 0], ['0', '1', 1], ['1', '1', 2], ['2', '1', 3]].map(([a, b, k]) => `<g class="e072-sc e072-sc${k}">${T(-55, 84, a, '#FDE047', 24)}${T(55, 84, b, '#FDE047', 24)}</g>`).join('')}${T(0, 82, ':', '#FDE047', 22)}
    <g class="e072-half1">${T(0, 60, 'HALF 1', '#fff', 9)}</g><g class="e072-half2">${T(0, 60, 'HALF 2', '#fff', 9)}</g></g>
  <!-- sân cỏ -->
  <rect x="${X.f0}" y="222" width="${X.f1 - X.f0}" height="${315 - 222}" fill="#4ADE80" stroke="${L}"/>
  ${Array.from({ length: 9 }, (_, i) => `<rect x="${X.f0 + i * 100}" y="222" width="50" height="93" fill="#22C55E" opacity="0.5"/>`).join('')}
  <path d="M${X.mid} 222 V315" stroke="#fff" stroke-width="3"/><ellipse cx="${X.mid}" cy="276" rx="60" ry="14" fill="none" stroke="#fff" stroke-width="3"/>
  ${goal(X.goalL, -1, 'L')}${goal(X.goalR, 1, 'R')}
  <!-- nhà Minh -->
  ${room(X.home, 2260 - X.home, FLOOR, '#FEF3C7')}
  <rect x="${X.home - 4}" y="0" width="14" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  ${windowBox(1640, 70, 96, 80)}
  <rect x="1830" y="${FLOOR - 50}" width="110" height="38" rx="10" fill="#60A5FA" stroke="${L}" stroke-width="1.2"/><rect x="1824" y="${FLOOR - 74}" width="122" height="28" rx="10" fill="#3B82F6" stroke="${L}" stroke-width="1.2"/>
  <g transform="translate(2140 0)"><rect x="-40" y="${FLOOR - 120}" width="80" height="120" fill="#A16207" stroke="${L}"/>${[FLOOR - 84, FLOOR - 44].map((y) => `<rect x="-36" y="${y}" width="72" height="5" fill="#78350F"/>`).join('')}
    <g transform="translate(0 ${FLOOR - 92})"><path d="M-10 0 H10 L7 -14 H-7Z" fill="#FACC15" stroke="${L}"/><path d="M-7 -12 q-8 0 -6 -8 M7 -12 q8 0 6 -8" stroke="#FACC15" stroke-width="2" fill="none"/></g></g>
  ${rug(X.kitty - 20, FLOOR, 140, '#FDA4AF')}
  <!-- nhãn -->
  ${[['six', X.board, 200, '6 wins', '#15803D'], ['h2', X.mid - 160, 120, 'second half', '#1D4ED8'], ['min', X.goalR - 140, 120, '2 minutes', '#DC2626'],
    ['won', X.mid, 120, '2 to 1', '#B45309'], ['two', X.mid + 140, 120, 'two goals', '#1D4ED8'], ['medal', X.kitty - 30, 120, 'gold medal', '#CA8A04']]
    .map(([k, x, y, t, c]) => `<g class="e072-lb e072-lb-${k}">${label(x, y, t, c, 16)}</g>`).join('')}`;
}

function fg() {
  return `${bush(30, FLOOR + 8, 0.8)}${bush(590, FLOOR + 8, 0.9)}
  <g class="e072-confetti">${Array.from({ length: 26 }, (_, i) => `<rect class="e072-cf" style="animation-delay:${(i % 9) * 0.12}s" x="${880 + i * 16}" y="${40 + (i * 23) % 50}" width="5" height="8" rx="1" fill="${['#EF4444', '#FACC15', '#3B82F6', '#22C55E', '#F472B6'][i % 5]}" transform="rotate(${i * 37} ${882 + i * 16} ${44 + (i * 23) % 50})"/>`).join('')}</g>`;
}

const CSS = `
.e072-lb { opacity: 0; transition: opacity .35s; }
${['six', 'h2', 'min', 'won', 'two', 'medal'].map((k) => `.st-lb-${k} .e072-lb-${k}`).join(', ')} { opacity: 1; }
.e072-tick { opacity: 0; transform: scale(.2); transform-box: fill-box; transform-origin: center; transition: opacity .2s, transform .3s cubic-bezier(.3,1.6,.6,1); }
.st-ticks .e072-tick { opacity: 1; transform: none; }
.e072-final { transform-box: fill-box; transform-origin: center top; transform: scaleY(0); transition: transform .5s cubic-bezier(.3,1.4,.6,1); }
.st-final .e072-final { transform: none; }
.e072-calpage { transition: transform .5s, opacity .5s; } .st-final .e072-calpage { transform: scaleY(0); opacity: 0; }
.e072-calday { opacity: 0; transition: opacity .3s .3s; } .st-final .e072-calday { opacity: 1; }
.e072-fan { opacity: 0; transform: translateY(10px); transition: opacity .3s, transform .3s; }
.st-crowd .e072-fan { opacity: 1; transform: none; }
.st-cheer .e072-fan { animation: e072Fan .3s ease-in-out infinite alternate; }
@keyframes e072Fan { to { transform: translateY(-4px); } }
.e072-sc { opacity: 0; }
svg:not(.st-sc1):not(.st-sc2):not(.st-sc3) .e072-sc0, .st-sc1 .e072-sc1, .st-sc2 .e072-sc2, .st-sc3 .e072-sc3 { opacity: 1; }
.st-sc3.st-cheer .e072-sc3 { animation: e072Blink .4s steps(2) infinite; }
@keyframes e072Blink { 50% { opacity: .2; } }
.e072-half2 { opacity: 0; } .st-half2 .e072-half2 { opacity: 1; } .st-half2 .e072-half1 { opacity: 0; }
.st-netL .e072-netL, .st-netR .e072-netR { animation: e072Net .12s linear 6 alternate; }
@keyframes e072Net { to { transform: scale(1.08, .96); } }
.e072-confetti { opacity: 0; } .st-confetti .e072-confetti { opacity: 1; }
.st-confetti .e072-cf { animation: e072Fall 1.6s ease-in infinite; transform-box: fill-box; }
@keyframes e072Fall { from { translate: 0 -20px; } to { translate: 0 150px; } }
.es-thing.is-walk .e072-roll { animation: e072Roll .3s linear infinite; }
@keyframes e072Roll { to { transform: rotate(360deg); } }
.act-e072kick .pp-legwR { animation: e072Kick .5s ease-out 1 both; }
@keyframes e072Kick { 45% { transform: rotate(-52deg); } to { transform: rotate(0); } }
@media (prefers-reduced-motion: reduce) {
  .st-cheer .e072-fan { animation-duration: 1s; }
  .st-netL .e072-netL, .st-netR .e072-netR { animation-duration: .4s; animation-iteration-count: 2; }
  .st-confetti .e072-cf { animation-duration: 3.2s; }
  .es-thing.is-walk .e072-roll { animation-duration: .9s; }
  .st-sc3.st-cheer .e072-sc3 { animation-duration: 1.2s; }
}
`;

const BALLSVG = `<g class="e072-roll" style="transform-origin:0px -9px"><g transform="translate(0 -9)">${SOCCER}</g></g>`;
const score = (st, k) => [1, 2, 3].forEach((i) => st.set(`st-sc${i}`, i === k));
/** Sút: người sút, bóng bay theo đường cong tới (x, y), bóng nằm lại ở x. */
async function kick(st, id, [x1, y1], [x2, y2], dur = 700) {
  st.act(id, 'e072kick'); st.pose(id, 'e072_kick');
  await st.wait(180);
  st.sfx('kick', { vol: 0.8 });
  st.show('ball', false);
  await st.fly(`<g transform="scale(1.6)">${SOCCER}</g>`, [x1, y1], [x2, y2], { size: 30, dur });
  st.place('ball', x2, FLOOR); st.show('ball', true);
  st.act(id, null);
}
const BLUE = ['minh', 'tom'];

const BEATS = [
  { key: ['played six matches', 'won all of them'], icon: '🏆', label: 'six matches', async play(st) {
    st.look(X.board + 100);
    st.pose('minh', 'point'); st.face('minh', -1);
    st.set('st-ticks');
    for (let i = 0; i < 6; i++) { st.sfx('tick', { vol: 0.6 }); await st.wait(320); }
    st.set('st-lb-six'); st.sfx('cheer', { vol: 0.4 });
    st.pose('minh', 'cheer'); st.pose('tom', 'cheer'); st.act('minh', 'jump'); st.act('tom', 'jump');
    st.mood('minh', 'joy'); st.mood('tom', 'joy');
    await st.wait(1200);
  } },
  { key: ['The last one was the final', 'last Saturday'], icon: '📅', label: 'the final', async play(st) {
    st.set('st-lb-six', false);
    st.pose('minh', 'stand'); st.pose('tom', 'stand'); st.mood('minh', 'happy'); st.mood('tom', 'happy');
    st.look(X.gate - 30, { dur: 1200 });
    await Promise.all([st.walk('tom', X.gate - 50, { speed: 130, follow: false }), st.walk('minh', X.gate, { speed: 130, follow: false })]);
    st.set('st-final'); st.sfx('page-turn', { vol: 0.7 });
    await st.wait(400);
    st.pose('minh', 'pointUp'); st.mood('minh', 'wow'); st.sfx('whistle', { vol: 0.4 });
    await st.wait(1300);
  } },
  { key: ['Many parents came to watch'], icon: '👨‍👩‍👧', label: 'many parents', async play(st) {
    st.pose('minh', 'stand'); st.mood('minh', 'happy');
    st.look(X.mid - 140, { dur: 1300 });
    await Promise.all([st.walk('tom', 880, { speed: 136, follow: false }), st.walk('minh', 940, { speed: 136, follow: false })]);
    st.set('st-crowd'); st.sfx('cheer', { vol: 0.6 });
    await st.wait(900);
    st.set('st-cheer'); st.sfx('clap', { vol: 0.7 });
    st.face('minh', -1); st.pose('minh', 'wave'); st.act('minh', 'wave');
    await st.wait(1300);
    st.set('st-cheer', false);
  } },
  { key: ['the other team scored a goal', 'Minh felt nervous'], icon: '😰', label: 'felt nervous', async play(st) {
    st.pose('minh', 'stand');
    st.look(X.goalL + 230, { dur: 900 });
    await st.loop('roll', () => Promise.all([st.walk('r1', X.goalL + 170, { speed: 130, follow: false }), st.walk('ball', X.goalL + 186, { speed: 130, follow: false })]), { vol: 0.4 });
    await kick(st, 'r1', [X.goalL + 186, FLOOR - 9], [X.goalL - 30, FLOOR - 40], 600);
    st.set('st-netL'); st.sfx('bump', { vol: 0.7 }); score(st, 1);
    st.pose('gk', 'sad'); st.mood('gk', 'sad');
    st.pose('r1', 'cheer'); st.mood('r1', 'joy'); st.sfx('cheer', { vol: 0.3 });
    await st.wait(700);
    st.face('minh', -1); st.pose('minh', 'e072_nervous'); st.mood('minh', 'sad'); st.act('minh', 'shiver'); st.sfx('gulp', { vol: 0.8 });
    await st.wait(1300);
    st.act('minh', null);
  } },
  { key: ['Tom kicked the ball far up the field to Minh', 'he scored'], icon: '⚽', label: 'Minh scored', async play(st) {
    st.set('st-netL', false); st.set('st-half2'); st.set('st-lb-h2');
    st.pose('r1', 'stand'); st.mood('r1', 'happy'); st.pose('gk', 'stand'); st.mood('gk', 'happy');
    st.place('r1', X.mid + 120, FLOOR, -1); st.place('ball', X.goalL + 210, FLOOR);
    st.place('tom', X.goalL + 180, FLOOR, 1); st.place('minh', X.goalR - 250, FLOOR, 1); st.mood('minh', 'happy'); st.pose('minh', 'stand');
    st.look(X.goalL + 300, { dur: 700 });
    st.sfx('whistle', { vol: 0.5 });
    await st.wait(700);
    st.set('st-lb-h2', false);
    st.look(X.mid + 100, { dur: 1300 });
    await kick(st, 'tom', [X.goalL + 210, FLOOR - 9], [X.goalR - 236, FLOOR - 9], 1300);
    st.pose('tom', 'stand');
    await st.loop('roll', () => Promise.all([st.walk('minh', X.goalR - 140, { speed: 136, follow: false }), st.walk('ball', X.goalR - 124, { speed: 136, follow: false })]), { vol: 0.4 });
    await kick(st, 'minh', [X.goalR - 124, FLOOR - 9], [X.goalR + 30, FLOOR - 50], 550);
    st.set('st-netR'); st.sfx('bump', { vol: 0.7 }); score(st, 2);
    st.pose('rgk', 'sad');
    st.pose('minh', 'cheer'); st.mood('minh', 'joy'); st.set('st-cheer'); st.sfx('cheer', { vol: 0.7 });
    await st.wait(1200);
    st.set('st-cheer', false);
  } },
  { key: ['two minutes before the end', 'Minh scored again'], icon: '⏱️', label: 'scored again', async play(st) {
    st.set('st-netR', false); st.pose('rgk', 'e072_gkL'); st.pose('minh', 'stand'); st.mood('minh', 'happy');
    st.place('minh', X.goalR - 280, FLOOR, 1); st.place('ball', X.goalR - 262, FLOOR);
    st.look(X.goalR - 160, { dur: 800 });
    st.set('st-lb-min'); st.sfx('tick', { vol: 0.6 });
    await st.wait(600);
    await st.loop('roll', () => Promise.all([st.walk('minh', X.goalR - 140, { speed: 136, follow: false }), st.walk('ball', X.goalR - 124, { speed: 136, follow: false })]), { vol: 0.4 });
    await kick(st, 'minh', [X.goalR - 124, FLOOR - 9], [X.goalR + 30, FLOOR - 72], 550);
    st.set('st-netR'); st.sfx('bump', { vol: 0.7 }); score(st, 3);
    st.pose('rgk', 'sad'); st.mood('rgk', 'sad');
    st.pose('minh', 'cheer'); st.mood('minh', 'joy'); st.act('minh', 'jump'); st.set('st-cheer'); st.sfx('cheer', { vol: 0.7 });
    await st.wait(1200);
    st.set('st-cheer', false);
  } },
  { key: ['His team won 2 to 1'], icon: '🥇', label: 'won 2 to 1', async play(st) {
    st.set('st-netR', false); st.set('st-lb-min', false);
    st.look(X.mid + 90, { dur: 900 });
    st.sfx('whistle', { vol: 0.7 });
    await st.wait(500);
    st.set('st-lb-won'); st.set('st-confetti'); st.set('st-cheer'); st.sfx('fireworks', { vol: 0.4 });
    st.place('tom', X.mid + 60, FLOOR, 1); st.place('gk', X.mid - 10, FLOOR, 1); st.place('minh', X.mid + 140, FLOOR, -1);
    for (const id of ['minh', 'tom', 'gk']) { st.pose(id, 'cheer'); st.act(id, 'jump'); st.mood(id, 'joy'); }
    st.place('r1', X.mid + 250, FLOOR, -1); st.pose('r1', 'sad'); st.mood('r1', 'sad'); st.pose('rgk', 'sad');
    await st.wait(300);
    st.sfx('cheer', { vol: 0.6 });
    await st.wait(1500);
    st.set('st-cheer', false);
  } },
  { key: ['the best day of my life'], icon: '😄', label: 'the best day', async play(st) {
    st.set('st-lb-won', false); st.set('st-confetti', false);
    for (const id of ['tom', 'gk']) st.pose(id, 'clap');
    st.act('tom', 'clap'); st.act('gk', 'clap');
    st.pose('minh', 'stand'); st.face('minh', 1);
    st.look(X.mid + 120);
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(`<g transform="scale(1.4)">${MEDAL}</g>`, [X.mid + 260, 100], [X.mid + 140, 180], { size: 40, dur: 600 });
    st.chest('minh', MEDAL); st.sfx('ding', { vol: 0.7 }); st.sfx('clap', { vol: 0.6 });
    st.pose('minh', 'cheer'); st.mood('minh', 'joy');
    await st.say('minh', 'The best day of my life!', 1900);
  } },
  { key: ['never scored two goals in one match before'], icon: '✌️', label: 'two goals', async play(st) {
    st.act('tom', null); st.act('gk', null); st.pose('tom', 'stand'); st.pose('gk', 'stand');
    st.look(X.mid + 140);
    st.pose('minh', 'e072_two');
    st.show('b1', true); st.sfx('kick', { vol: 0.6 });
    await st.wait(450);
    st.show('b2', true); st.sfx('kick', { vol: 0.6 });
    st.set('st-lb-two'); st.mood('minh', 'wow');
    await st.wait(1500);
  } },
  { key: ['shown his gold medal to everyone in the family', 'even Kitty'], icon: '🐱', label: 'even Kitty', async play(st) {
    st.set('st-lb-two', false); st.show('b1', false); st.show('b2', false); st.pose('minh', 'stand'); st.mood('minh', 'happy');
    st.place('minh', X.home + 20, FLOOR, 1);
    st.look(X.home + 220, { dur: 600 });
    st.sfx('door-open', { vol: 0.6 });
    await st.walk('minh', X.dad - 54, { speed: 136, follow: false });
    st.pose('minh', 'e072_show'); st.sfx('clap', { vol: 0.5 }); st.pose('dad', 'clap'); st.act('dad', 'clap'); st.mood('dad', 'joy');
    await st.wait(700);
    st.pose('minh', 'stand'); st.look(X.lan + 40, { dur: 900 });
    await st.walk('minh', X.lan - 50, { speed: 136, follow: false });
    st.pose('minh', 'e072_show'); st.mood('mum', 'joy'); st.mood('lan', 'joy'); st.pose('lan', 'cheer'); st.act('lan', 'hop'); st.sfx('giggle', { vol: 0.5 });
    await st.wait(700);
    st.pose('minh', 'stand');
    await st.walk('minh', X.kitty - 60, { speed: 136, follow: false });
    st.pose('minh', 'e072_show'); st.set('st-lb-medal');
    st.act('kitty', 'wag'); st.mood('kitty', 'joy'); st.sfx('meow', { vol: 0.8 });
    await st.wait(1200);
  } },
];

export default {
  id: 'en072', worldW: 2260, floor: FLOOR, viewTop: 40, camStart: 30, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, order: [0, 1, 3, 4, 5, 7, 9],
  cast: [
    { id: 'ball', kind: 'thing', x: X.goalL + 300, svg: BALLSVG, box: [-10, -19, 20, 20] },
    { id: 'gk', kind: 'kid', who: 'e072_gk', x: X.goalL + 30 },
    { id: 'rgk', kind: 'kid', who: 'e072_rgk', x: X.goalR - 30, face: -1 },
    { id: 'r1', kind: 'kid', who: 'e072_r1', x: X.goalL + 390, face: -1 },
    { id: 'tom', kind: 'kid', who: 'e072_tom', x: X.board + 120, face: -1 },
    { id: 'minh', kind: 'kid', who: 'e072_minh', x: X.board + 170, face: -1 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: X.dad, s: 0.95, face: -1 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: X.mum, s: 0.95, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.lan, s: 1.08, face: -1 },
    { id: 'kitty', kind: 'cat', x: X.kitty, s: 0.9, face: -1 },
    { id: 'b1', kind: 'thing', x: X.mid + 100, svg: `<g transform="translate(0 -11) scale(1.2)">${SOCCER}</g>`, box: [-12, -23, 24, 24] },
    { id: 'b2', kind: 'thing', x: X.mid + 180, svg: `<g transform="translate(0 -11) scale(1.2)">${SOCCER}</g>`, box: [-12, -23, 24, 24] },
  ],
  init(st) {
    st.chest('minh', NUM('9')); st.chest('tom', NUM('7'));
    st.pose('gk', 'e072_gkL'); st.pose('rgk', 'e072_gkL');
    st.dog('kitty', 'sit');
    st.show('b1', false); st.show('b2', false);
  },
};
