/**
 * Bài 55 "The Lost Kitten" (when + quá khứ đơn): một buổi tối, đi từ trái sang phải: phòng ăn (bữa tối, bát của Kitty còn đầy, nệm trống)
 * → cửa sau → vườn (bố soi đèn pin) → lối xe (ô tô, Minh cúi nhìn gầm) → hàng rào nhà hàng xóm (mẹ hỏi cô hàng xóm)
 * → cây cổ thụ cạnh cổng (Lucky sủa, hai mắt xanh trong cành, Kitty mắc kẹt, bố bắc thang). Ngoài trời phủ lớp đêm.
 * Mỗi câu "When …" là một cặp hành động: việc đầu (gọi tên, lắc hộp, nhìn gầm xe…) xong thì hiện kết quả.
 * Toạ độ cảnh: rộng 2200, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, sky, cloud, tree, bush, flowerAt, label, room, windowBox, fence, night, BALL } from '../kit.js';

const FLOOR = 282;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { table: 200, bowl: 450, door: 540, garden: 780, car: 1240, fence: 1500, tree: 1980, gate: 2110 };
const BR = { x: 2000, y: 150 }; // chỗ Kitty mắc kẹt trên cành

// ── Đồ vật ─────────────────────────────────────────────────────────────────
const CATBOWL = (full = true) => `<path d="M-14 -8 H14 L11 0 H-11Z" fill="#F472B6" stroke="${L}" stroke-width="1"/>${full ? `<path d="M-10 -8 Q-4 -14 2 -9 Q6 -13 10 -8Z" fill="#FDBA74" stroke="${L}" stroke-width="0.6"/>` : ''}`;
const FOODBOX = `<g transform="rotate(180) translate(0 -2)"><rect x="-9" y="0" width="18" height="22" rx="2" fill="#F59E0B" stroke="${L}" stroke-width="0.9"/>
  <path d="M-5 11 Q0 6 4 11 Q0 16 -5 11Z M4 11 l4 -3 v6Z" fill="#fff" stroke="${L}" stroke-width="0.5"/></g>`;
/** Đèn pin với luồng sáng dọc theo cẳng tay (+y trong toạ độ đồ cầm). */
const TORCH = `<path d="M0 6 L-34 150 Q0 162 34 150Z" fill="#FEF08A" opacity="0.42"/><rect x="-3.4" y="-6" width="6.8" height="14" rx="2" fill="#334155" stroke="${L}" stroke-width="0.8"/><rect x="-4.6" y="6" width="9.2" height="4" rx="1" fill="#FDE047" stroke="${L}" stroke-width="0.6"/>`;
const LADDER = `<path d="M0 0 L36 -136 M22 0 L56 -130" stroke="#A16207" stroke-width="4.4" stroke-linecap="round"/>${Array.from({ length: 7 }, (_, i) => { const t = (i + 0.6) / 7.4; return `<path d="M${(36 * t).toFixed(1)} ${(-136 * t).toFixed(1)} L${(22 + 34 * t).toFixed(1)} ${(-130 * t).toFixed(1)}" stroke="#A16207" stroke-width="3" stroke-linecap="round"/>`; }).join('')}`;
/** Kitty nằm gọn trong vòng tay (gốc = giữa ngực). */
const CAT_HELD = `<g transform="translate(0 -24)"><ellipse cx="2" cy="4" rx="17" ry="9" fill="#fff" stroke="${L}" stroke-width="1"/>
  <path d="M16 6 Q26 2 22 -8" stroke="${L}" stroke-width="5.4" fill="none" stroke-linecap="round"/><path d="M16 6 Q26 2 22 -8" stroke="#fff" stroke-width="3.8" fill="none" stroke-linecap="round"/>
  <g transform="translate(-12 -6)"><path d="M-8 -4 L-7 -15 L-1 -8Z M1 -8 L7 -15 L8 -4Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M-6 -7 L-5.6 -12 L-2.6 -8.6Z M2.6 -8.6 L5.6 -12 L6 -7Z" fill="#F9A8D4"/>
    <circle r="9" fill="#fff" stroke="${L}" stroke-width="1"/><path d="M-5 -1 q2 1.8 4 0 M1.4 -1 q2 1.8 4 0" stroke="${L}" stroke-width="1.1" fill="none"/><path d="M0 2.4 l-1.3 -1.1 h2.6Z" fill="#F9A8D4"/></g></g>`;
const BONE = `<g transform="rotate(-20)"><rect x="-12" y="-3" width="24" height="6" rx="3" fill="#F8FAFC" stroke="${L}" stroke-width="0.9"/>${[[-12, -3], [-12, 3], [12, -3], [12, 3]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#F8FAFC" stroke="${L}" stroke-width="0.9"/>`).join('')}<rect x="-11" y="-2" width="22" height="4" fill="#F8FAFC"/></g>`;
const BALL_T = `<g class="e055-roll" style="transform-origin:0px -8px"><g transform="translate(0 -8)">${BALL('#3B82F6')}</g></g>`;

const POSES = {
  e055_give: { R: [40, 40], L: [10, 4], head: 10 },
  e055_call: { R: [150, 252], L: [150, 252], head: -8 },
  e055_shake: { R: [100, 120], L: [10, 4] },
  e055_look: { R: [140, 262], L: [10, 4], head: -4 },
  e055_torch: { R: [70, 70], L: [10, 4] },
  e055_crouch: { R: [70, 90], L: [30, 40], dy: 30, head: 14 },
  e055_up: { R: [140, 160], L: [10, 4], head: -12 },
  e055_reach: { R: [150, 168], L: [140, 160], head: -10 },
  e055_worry: { R: [30, -150], L: [30, -150], head: 6 },
  e055_sitshrug: { R: [50, 130], L: [50, 130], dy: 20, head: -5 },
  e055_ladder: { R: [60, 150], L: [60, 150] },
};
const PROPS = { e055_box: FOODBOX, e055_torch: TORCH };

function bg() {
  return `
  ${sky(X.door, 2200 - X.door, 315, 'e055sky')}
  ${cloud(900, 50, 0.8, 0)}${cloud(1600, 40, 0.9, 3)}
  <!-- Phòng ăn -->
  ${room(0, X.door, FLOOR, '#FEF3C7')}
  ${windowBox(60, 70, 90, 76)}
  <rect x="60" y="70" width="90" height="76" fill="#1E1B4B" opacity="0.7"/><circle cx="128" cy="92" r="8" fill="#FEF9C3"/>
  <g transform="translate(260 96)"><circle r="18" fill="#fff" stroke="${L}" stroke-width="2"/><path d="M0 0 V-12" stroke="${L}" stroke-width="2.4" stroke-linecap="round"/><path d="M0 0 L-10 5" stroke="${L}" stroke-width="3" stroke-linecap="round"/><circle r="2" fill="${L}"/></g>
  <g transform="translate(340 30)"><path d="M0 0 V24" stroke="${L}"/><path d="M-16 40 Q0 18 16 40Z" fill="#FDE047" stroke="${L}"/><circle cy="42" r="5" fill="#FEF9C3"/></g>
  <g transform="translate(${X.bowl + 40} ${FLOOR})"><ellipse cx="0" cy="-5" rx="26" ry="7" fill="#C4B5FD" stroke="${L}"/><ellipse cx="0" cy="-8" rx="20" ry="4" fill="#DDD6FE"/></g>
  <g class="e055-lb e055-lb-dinner">${label(380, 150, 'dinner', '#B45309', 16)}</g>
  <rect x="${X.door - 8}" y="40" width="16" height="${FLOOR - 40}" fill="#C08B5C" stroke="${L}"/>
  <!-- Vườn, lối xe, nhà hàng xóm, cổng -->
  <path d="M${X.door + 8} 226 Q800 196 1100 222 T1600 214 T2200 222 V${FLOOR} H${X.door + 8}Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(700, 236, 0.8, '')}${tree(1080, 232, 0.7, '')}
  <g transform="translate(1640 0)"><path d="M-110 150 L0 96 L110 150Z" fill="#60A5FA" stroke="${L}" stroke-width="1.2"/><rect x="-96" y="150" width="192" height="${FLOOR - 150}" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/>
    <rect x="-70" y="172" width="34" height="30" fill="#FEF08A" stroke="${L}"/><rect x="30" y="172" width="34" height="30" fill="#FEF08A" stroke="${L}"/><rect x="-14" y="206" width="30" height="${FLOOR - 206}" fill="#92400E" stroke="${L}"/></g>
  <rect x="${X.door + 8}" y="${FLOOR - 4}" width="${2200 - X.door}" height="40" fill="#4ADE80" stroke="${L}"/>
  <rect x="1110" y="${FLOOR - 4}" width="260" height="40" fill="#CBD5E1" stroke="${L}"/>
  ${Array.from({ length: 30 }, (_, i) => `<path d="M${X.door + 30 + i * 54} ${FLOOR + 12} l3 -7 l3 7" stroke="#16A34A" stroke-width="1.4" fill="none"/>`).join('')}
  <!-- cây cổ thụ cạnh cổng -->
  <g transform="translate(${X.tree} ${FLOOR})"><path d="M-22 0 Q-14 -60 -16 -110 L18 -110 Q16 -60 26 0Z" fill="#92400E" stroke="${L}" stroke-width="1.3"/>
    <path d="M-10 -40 q6 -6 4 -16 M8 -76 q-4 -6 2 -12" stroke="#78350F" stroke-width="1.4" fill="none"/>
    <path d="M10 -112 Q40 -126 ${BR.x - X.tree + 46} ${BR.y - FLOOR + 2}" stroke="#92400E" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M10 -112 Q40 -126 ${BR.x - X.tree + 46} ${BR.y - FLOOR + 2}" stroke="${L}" stroke-width="0.8" fill="none"/>
    <path d="M-10 -110 Q-40 -140 -70 -148" stroke="#92400E" stroke-width="8" fill="none" stroke-linecap="round"/>
    <g class="ek-sway" style="transform-origin:0px -110px"><circle cx="0" cy="-196" r="54" fill="#15803D" stroke="${L}"/><circle cx="-60" cy="-170" r="36" fill="#166534" stroke="${L}"/><circle cx="60" cy="-176" r="40" fill="#16A34A" stroke="${L}"/></g></g>
  <g transform="translate(${X.gate} 0)"><rect x="-8" y="196" width="16" height="${FLOOR - 196}" fill="#E7E5E4" stroke="${L}"/><rect x="62" y="196" width="16" height="${FLOOR - 196}" fill="#E7E5E4" stroke="${L}"/>
    <path d="M8 214 H62 M8 236 H62 M8 258 H62" stroke="#475569" stroke-width="2.4"/>${[16, 28, 40, 52].map((x) => `<path d="M${x} 206 V${FLOOR - 4}" stroke="#475569" stroke-width="2"/>`).join('')}</g>
  <g class="e055-lb e055-lb-stuck">${label(BR.x - 4, 72, 'stuck!', '#DC2626', 17)}</g>
  <g class="e055-lb e055-lb-ball">${label(X.car, 150, 'only a ball', '#1D4ED8', 15)}</g>`;
}

function fg() {
  return `
  <!-- bàn ăn (che chân người ngồi) -->
  <g transform="translate(${X.table} 0)"><rect x="-80" y="226" width="160" height="9" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
    <rect x="-74" y="235" width="8" height="${FLOOR - 235}" fill="#92400E" stroke="${L}"/><rect x="66" y="235" width="8" height="${FLOOR - 235}" fill="#92400E" stroke="${L}"/>
    ${[-46, 0, 46].map((x) => `<g transform="translate(${x} 226)"><path d="M-10 0 Q-10 -10 0 -10 Q10 -10 10 0Z" fill="#fff" stroke="#3B82F6" stroke-width="1"/></g>`).join('')}
    <rect x="-80" y="235" width="160" height="${FLOOR - 235 - 20}" fill="#FDE68A" stroke="${L}" opacity="0.9"/></g>
  <!-- bụi hoa ở vườn, hàng rào nhà hàng xóm (che chân cô hàng xóm) -->
  ${bush(620, FLOOR + 6, 0.9)}${bush(900, FLOOR + 8, 1.1, '#4ADE80')}${bush(980, FLOOR + 6, 0.8)}
  ${Array.from({ length: 6 }, (_, i) => flowerAt(840 + i * 10, FLOOR + 4, ['#F472B6', '#FACC15', '#F87171'][i % 3])).join('')}
  ${fence(X.fence + 20, 220, FLOOR + 4)}
  <!-- đêm ngoài trời -->
  ${night(X.door + 8, 2200 - X.door - 8, 315, 1360)}
  <!-- hai mắt xanh trong cành (sáng trên lớp đêm) -->
  <g class="e055-eyes"><ellipse cx="${BR.x - 6}" cy="${BR.y - 42}" rx="3.4" ry="4.4" fill="#4ADE80"/><ellipse cx="${BR.x + 6}" cy="${BR.y - 42}" rx="3.4" ry="4.4" fill="#4ADE80"/>
    <ellipse cx="${BR.x - 6}" cy="${BR.y - 42}" rx="1" ry="3" fill="#14291C"/><ellipse cx="${BR.x + 6}" cy="${BR.y - 42}" rx="1" ry="3" fill="#14291C"/></g>
  <g class="e055-lb e055-lb-purr">${label(1900, 120, 'purr purr', '#DB2777', 15)}</g>`;
}

const CSS = `
.e055-lb { opacity: 0; transition: opacity .35s; }
.st-lb-dinner .e055-lb-dinner, .st-lb-stuck .e055-lb-stuck, .st-lb-ball .e055-lb-ball, .st-lb-purr .e055-lb-purr { opacity: 1; }
.st-night .ek-night { opacity: 1; }
.e055-eyes { opacity: 0; transition: opacity .4s; }
.st-eyes .e055-eyes { opacity: 1; animation: e055Blink 2.6s infinite; }
@keyframes e055Blink { 0%, 90%, 100% { opacity: 1; } 94% { opacity: 0; } }
.es-thing.is-walk .e055-roll { animation: e055Roll .35s linear infinite; }
@keyframes e055Roll { to { transform: rotate(360deg); } }
.es-ac.act-e055-shake .pp-fowR { animation: e055Shake .1s linear infinite alternate; }
@keyframes e055Shake { from { transform: rotate(-14deg); } to { transform: rotate(14deg); } }
.es-ac.act-e055-sweep .pp-upwR { animation: e055Sweep 1.1s ease-in-out infinite alternate; }
@keyframes e055Sweep { from { transform: rotate(-22deg); } to { transform: rotate(18deg); } }
.es-cat.act-e055-scared .dg-bob { animation: e055Scared .09s linear infinite alternate; }
@keyframes e055Scared { from { transform: translateX(-1px); } to { transform: translateX(1px); } }
.e055-bonebob { animation: e055Bone .3s ease-in-out infinite alternate; transform-origin: 0 0; }
@keyframes e055Bone { from { transform: rotate(-6deg); } to { transform: rotate(6deg); } }
@media (prefers-reduced-motion: reduce) {
  .es-ac.act-e055-shake .pp-fowR { animation-duration: .3s; }
  .es-ac.act-e055-sweep .pp-upwR { animation-duration: 2.4s; }
  .es-cat.act-e055-scared .dg-bob { animation-duration: .3s; }
  .e055-bonebob { animation-duration: .9s; }
}
`;

const BEATS = [
  { key: ["didn't come home for dinner"], icon: '🍽️', label: 'dinner', async play(st) {
    st.look(270);
    st.set('st-lb-dinner'); st.sfx('pop', { vol: 0.5 });
    st.pose('lan', 'e055_give'); st.mood('lan', 'happy');
    await st.wait(500);
    st.show('bowl', true); st.sfx('bowl-down', { vol: 0.6 });
    st.pose('lan', 'stand');
    await st.wait(400);
    st.face('lan', 1); st.mood('lan', 'sad'); st.mood('minh', 'sad'); st.sfx('tick', { vol: 0.5 });
    st.pose('mum', 'e055_sitshrug'); st.mood('mum', 'sad');
    await st.wait(1000);
  } },
  { key: ['called her name', 'nothing happened'], icon: '📣', label: 'called her name', async play(st) {
    st.set('st-lb-dinner', false); st.pose('mum', 'sitDesk');
    await st.walk('lan', 690, { speed: 130, lead: 40 });
    st.pose('lan', 'e055_call'); st.mood('lan', 'joy'); st.sfx('pop', { vol: 0.5 });
    await st.say('lan', 'Kitty! Kitty!', 1400);
    st.pose('lan', 'shrug'); st.mood('lan', 'sad'); st.sfx('wind', { vol: 0.45 });
    await st.say('lan', '...', 900);
  } },
  { key: ['shook her food box', "still didn't come"], icon: '🥫', label: 'food box', async play(st) {
    await st.walk('minh', 600, { speed: 140, lead: 40 });
    st.hold('minh', 'e055_box'); st.pose('minh', 'e055_shake'); st.act('minh', 'e055-shake'); st.mood('minh', 'joy');
    await st.loop('box-shake', () => st.say('minh', 'Shake, shake!', 1400), { vol: 0.8 });
    st.act('minh', null); st.pose('minh', 'shrug'); st.mood('minh', 'sad'); st.sfx('buzz-no', { vol: 0.5 });
    await st.wait(800);
  } },
  { key: ['whole family looked for her'], icon: '👨‍👩‍👧‍👦', label: 'looked for her', async play(st) {
    st.hold('minh', null); st.pose('minh', 'stand'); st.pose('lan', 'stand');
    st.pose('mum', 'stand'); st.pose('dad', 'stand');
    st.look(760, { dur: 1000 }); st.sfx('door-open', { vol: 0.6 });
    await Promise.all([
      st.walk('dad', X.garden - 20, { speed: 150, follow: false }),
      st.walk('mum', 1000, { speed: 200, follow: false }),
      st.walk('minh', 900, { speed: 150, follow: false }),
      st.walk('lan', 700, { speed: 120, follow: false }),
    ]);
    for (const id of ['dad', 'mum', 'minh', 'lan']) { st.pose(id, 'e055_look'); st.mood(id, 'happy'); }
    st.face('lan', -1); st.face('minh', 1); st.sfx('pop', { vol: 0.5 });
    await st.wait(900);
  } },
  { key: ['searched the garden with a torch', 'asked the neighbours'], icon: '🔦', label: 'torch', async play(st) {
    for (const id of ['minh', 'lan', 'mum']) st.pose(id, 'stand');
    st.look(X.garden + 40);
    st.hold('dad', 'e055_torch'); st.pose('dad', 'e055_torch'); st.act('dad', 'e055-sweep'); st.sfx('click', { vol: 0.7 });
    await st.wait(1400);
    await st.walk('mum', X.fence - 40, { speed: 220, lead: 30 });
    st.face('mum', 1); st.sfx('knock', { vol: 0.6 }); st.pose('mum', 'open'); st.talk('mum', true);
    await st.wait(700);
    st.talk('mum', false); st.act('nb', 'no'); st.pose('nb', 'shrug'); st.sfx('buzz-no', { vol: 0.5 });
    await st.wait(1100);
    st.act('nb', null);
  } },
  { key: ['looked under the car', 'only found a ball'], icon: '🚗', label: 'under the car', async play(st) {
    st.act('dad', null); st.pose('mum', 'stand'); st.pose('nb', 'stand');
    await st.walk('minh', X.car - 104, { speed: 160, lead: 30 });
    st.face('minh', 1); st.pose('minh', 'e055_crouch');
    await st.wait(700);
    st.show('ball', true); st.sfx('roll', { vol: 0.6 });
    await st.walk('ball', X.car - 70, { speed: 80, follow: false });
    st.show('ball', false); st.place('ball', X.car);
    st.hold('minh', 'ball'); st.pose('minh', 'raise'); st.mood('minh', 'sad'); st.set('st-lb-ball'); st.sfx('pop', { vol: 0.5 });
    await st.wait(1200);
  } },
  { key: ['felt worried'], icon: '😟', label: 'worried', async play(st) {
    st.set('st-lb-ball', false); st.hold('minh', null);
    st.hold('dad', null); st.pose('dad', 'stand');
    st.look(1180);
    await Promise.all([
      st.walk('dad', 1090, { speed: 200, follow: false }),
      st.walk('lan', 1030, { speed: 220, follow: false }),
      st.walk('mum', 1320, { speed: 120, follow: false }),
    ]);
    st.face('mum', -1); st.face('minh', -1);
    for (const id of ['dad', 'mum', 'minh', 'lan']) { st.pose(id, 'e055_worry'); st.mood(id, 'sad'); }
    st.mood('lan', 'cry'); st.sfx('wind', { vol: 0.5 });
    await st.wait(1300);
  } },
  { key: ['started to bark', 'old tree near the gate'], icon: '🐶', label: 'Lucky barks', async play(st) {
    for (const id of ['dad', 'mum', 'minh', 'lan']) st.pose(id, 'stand');
    st.dog('lucky', 'stand'); st.mood('lucky', 'joy');
    await st.loop('steps', () => st.walk('lucky', X.tree + 80, { speed: 280, lead: -40 }), { vol: 0.4 });
    st.face('lucky', -1);
    st.act('lucky', 'jump'); st.sfx('dog-bark');
    await st.say('lucky', 'Woof! Woof!', 1200);
    st.sfx('dog-bark');
    await st.wait(400);
    st.act('lucky', null);
  } },
  { key: ['looked up', 'two green eyes'], icon: '👀', label: 'two green eyes', async play(st) {
    st.look(X.tree - 60);
    st.mood('lan', 'happy');
    await st.walk('lan', X.tree - 170, { speed: 260, follow: false });
    st.face('lan', 1); st.pose('lan', 'e055_up');
    await st.wait(400);
    st.set('st-eyes'); st.mood('lan', 'wow'); st.sfx('ding', { vol: 0.5 });
    await st.wait(500);
    st.sfx('meow', { vol: 0.4 });
    await st.wait(900);
  } },
  { key: ['Kitty was stuck'], icon: '🌳', label: 'stuck', async play(st) {
    st.set('st-eyes', false);
    st.show('kitty', true); st.act('kitty', 'e055-scared');
    st.set('st-lb-stuck'); st.sfx('pop', { vol: 0.5 }); st.sfx('meow', { vol: 0.8 });
    await st.say('kitty', 'Meow!', 1400);
    await st.wait(300);
  } },
  { key: ['got a ladder', 'climbed up slowly'], icon: '🪜', label: 'ladder', async play(st) {
    st.set('st-lb-stuck', false); st.pose('lan', 'stand');
    st.place('dad', X.tree - 300); st.pose('dad', 'e055_ladder');
    st.look(X.tree - 80);
    st.chest('dad', `<g transform="translate(0 4) rotate(90) scale(0.55)">${LADDER}</g>`);
    await st.walk('dad', X.tree - 64, { speed: 160, follow: false });
    st.chest('dad', null); st.show('ladder', true); st.sfx('bowl-down', { vol: 0.6, rate: 0.7 });
    st.pose('dad', 'stand');
    await st.wait(300);
    await st.loop('ladder', () => st.walk('dad', X.tree - 34, { y: FLOOR - 40, speed: 22, follow: false }), { vol: 0.7 });
    st.pose('dad', 'e055_reach');
    await st.wait(300);
  } },
  { key: ["safe in Lan's arms", 'purred happily'], icon: '🤗', label: 'purred happily', async play(st) {
    st.show('kitty', false); st.act('kitty', null);
    st.chest('dad', CAT_HELD); st.pose('dad', 'carry');
    await st.wait(300);
    await st.loop('ladder', () => st.walk('dad', X.tree - 64, { y: FLOOR, speed: 60, follow: false }), { vol: 0.6 });
    st.face('dad', -1);
    st.pose('lan', 'carry');
    await st.wait(200);
    st.chest('dad', null); st.pose('dad', 'stand');
    st.chest('lan', CAT_HELD); st.mood('lan', 'joy');
    st.fx('hearts', X.tree - 170, 160); st.set('st-lb-purr');
    await st.wait(400);
    st.sfx('purr', { vol: 0.8 });
    await st.wait(1100);
  } },
  { key: ['big bone'], icon: '🦴', label: 'big bone', async play(st) {
    st.set('st-lb-purr', false);
    st.place('minh', X.tree + 200, FLOOR, -1); st.mood('minh', 'joy');
    st.look(X.tree);
    await st.walk('minh', X.tree + 140, { speed: 120, follow: false });
    st.pose('minh', 'give'); st.sfx('whoosh', { vol: 0.5 });
    await st.fly(`<g transform="scale(1.3)">${BONE}</g>`, [X.tree + 124, 200], [X.tree + 50, 236], { size: 34, dur: 700 });
    st.show('bone', true); st.dog('lucky', 'sit'); st.act('lucky', 'wag'); st.mood('lucky', 'joy'); st.sfx('dog-bark', { vol: 0.6 });
    st.mood('dad', 'joy'); st.mood('mum', 'joy');
    st.fx('sparkle', X.tree + 60, 210, { quiet: true });
    await st.wait(500);
    st.sfx('crunch', { vol: 0.7 });
    await st.wait(1000);
  } },
];

export default {
  id: 'en055', worldW: 2200, floor: FLOOR, viewTop: 40, camStart: 30, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'car', kind: 'car', x: X.car, y: FLOOR, svg: '' },
    { id: 'ladder', kind: 'thing', x: X.tree - 74, svg: LADDER, box: [-4, -140, 64, 144] },
    { id: 'kitty', kind: 'cat', x: BR.x + 16, y: BR.y, s: 0.9, face: -1 },
    { id: 'nb', kind: 'adult', who: 'hangXom', x: X.fence + 90, s: 0.92, face: -1 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: X.table - 50, s: 0.95 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: X.table + 50, s: 0.95, face: -1 },
    { id: 'bowl', kind: 'thing', x: X.bowl, svg: CATBOWL(), box: [-16, -16, 32, 18] },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 340, face: 1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.bowl - 30, s: 1.08 },
    { id: 'lucky', kind: 'dog', x: 960, s: 0.9, face: -1 },
    { id: 'bone', kind: 'thing', x: X.tree + 50, y: 236, svg: `<g class="e055-bonebob">${BONE}</g>`, box: [-18, -10, 36, 20] },
    { id: 'ball', kind: 'thing', x: X.car, svg: BALL_T, box: [-9, -17, 18, 18] },
  ],
  init(st) {
    st.set('st-night');
    st.show('bowl', false); st.show('ladder', false); st.show('kitty', false); st.show('bone', false); st.show('ball', false);
    st.dog('kitty', 'sit'); st.dog('lucky', 'sit');
    st.pose('dad', 'sitDesk'); st.pose('mum', 'sitDesk');
  },
};
