/**
 * Bài 101 "A Visitor in the Garden" (to be; have got). Bộ 👽: tập 1, Bíp rơi xuống vườn nhà Minh.
 * Một thế giới đi từ trái sang phải: nhà Minh (cửa, cửa sổ, chậu cây) → vườn (hàng rào, hoa, bụi cây) → cây xoài to,
 * phi thuyền của Bíp nằm dưới gốc. Minh dắt Lucky ra vườn, thấy phi thuyền tròn màu bạc, phi thuyền hỏng (nghiêng, bốc khói),
 * Bíp ló đầu sau kính chào "Hello!", nhảy ra, giới thiệu mình (bong bóng nghĩ hành tinh Lumo, đếm ba mắt hai râu),
 * Minh và Lucky làm quen, râu Bíp sáng vàng, Bíp chỉ ngôi sao tím xa xa (nhà), Minh nói "You are my friend!".
 * Toạ độ cảnh: rộng 1400, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, sky, cloud, grass, fence, bush, flowerAt, label, thought, speaker, sun } from '../kit.js';
import { BIP_SVG, BIP_BOX, BIP_CSS, BIP_AT, SHIP_SVG, SHIP_BOX, bipSet } from '../bip.js';

const FLOOR = 282;
const W = 1400;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
// Chỗ đứng cuối: Lucky, Minh, Bíp, phi thuyền (camera nhìn vào X.look)
const X = { door: 196, lucky: 848, minh: 800, bip: 915, ship: 1030, tree: 1090, look: 935 };
const SS = 0.9; // cỡ phi thuyền
const at = ([dx, dy]) => [X.bip + dx, FLOOR + dy];

// ── Cảnh ──────────────────────────────────────────────────────────────────
const house = () => `<g>
  <rect x="0" y="108" width="270" height="${FLOOR - 108}" fill="#FEF3C7" stroke="${L}" stroke-width="1.3"/>
  <path d="M-10 112 L40 62 H250 L284 112Z" fill="#DC2626" stroke="${L}" stroke-width="1.3"/>
  ${Array.from({ length: 8 }, (_, i) => `<path d="M${10 + i * 34} 112 L${48 + i * 28} 64" stroke="#B91C1C" stroke-width="1.2"/>`).join('')}
  <rect x="40" y="140" width="80" height="66" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="1.2"/><path d="M80 140 V206 M40 173 H120" stroke="#fff" stroke-width="3"/>
  <rect x="34" y="204" width="92" height="8" rx="2" fill="#A16207" stroke="${L}" stroke-width="0.9"/>
  ${[52, 80, 108].map((x, i) => `<g transform="translate(${x} 204)"><path d="M0 0 Q-6 -10 -2 -16 M0 0 Q5 -12 8 -14" stroke="#16A34A" stroke-width="2" fill="none"/><circle cx="-2" cy="-17" r="3.4" fill="${['#F472B6', '#FACC15', '#F97316'][i]}"/></g>`).join('')}
  <rect x="${X.door - 30}" y="176" width="60" height="${FLOOR - 176}" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
  <rect x="${X.door - 24}" y="184" width="22" height="36" rx="2" fill="#92400E"/><rect x="${X.door + 2}" y="184" width="22" height="36" rx="2" fill="#92400E"/>
  <circle cx="${X.door + 18}" cy="232" r="3" fill="#FDE68A"/>
  <rect x="0" y="${FLOOR}" width="290" height="${315 - FLOOR}" fill="#E7C9A0" stroke="${L}"/>
  ${Array.from({ length: 6 }, (_, i) => `<path d="M${i * 50} ${FLOOR} V315" stroke="#C9A77C" stroke-width="1"/>`).join('')}
  <g transform="translate(250 ${FLOOR})"><path d="M-14 0 L-11 -24 H11 L14 0Z" fill="#C2410C" stroke="${L}"/><path d="M0 -24 Q-14 -50 -6 -64 M0 -24 Q10 -48 18 -56 M0 -24 Q-2 -44 4 -70" stroke="#16A34A" stroke-width="3" fill="none"/></g></g>`;

/** Cây xoài to (gốc ở x, mặt đất FLOOR): thân nâu, tán xanh thẫm, quả xoài vàng cam đung đưa. */
const mango = (x) => `<g transform="translate(${x} ${FLOOR})">
  <path d="M-16 0 Q-10 -60 -18 -110 L-4 -112 Q2 -70 14 -112 L26 -108 Q12 -60 18 0Z" fill="#92400E" stroke="${L}" stroke-width="1.2"/>
  <g class="ek-sway" style="transform-origin:0 -110px">
    <ellipse cx="-50" cy="-150" rx="66" ry="44" fill="#15803D" stroke="${L}" stroke-width="1.2"/>
    <ellipse cx="54" cy="-148" rx="70" ry="46" fill="#16A34A" stroke="${L}" stroke-width="1.2"/>
    <ellipse cx="0" cy="-196" rx="78" ry="48" fill="#22C55E" stroke="${L}" stroke-width="1.2"/>
    ${[[-70, -120], [-24, -134], [30, -118], [84, -126], [-6, -172], [52, -182]].map(([mx, my], i) => `<g transform="translate(${mx} ${my})"><path d="M0 -8 V-2" stroke="#166534" stroke-width="1.4"/>
      <g class="e101-mango" style="animation-delay:${-i * 0.4}s"><path d="M0 -3 Q8 0 6 10 Q2 16 -4 12 Q-8 4 0 -3Z" fill="#FBBF24" stroke="${L}" stroke-width="0.9"/></g></g>`).join('')}
  </g></g>`;

function bg() {
  return `
  ${sky(0, W, 315, 'e101sky')}
  <g transform="translate(560 78)">${sun(22)}</g>
  ${cloud(150, 70, 0.8, 0)}${cloud(720, 58, 0.9, 2)}${cloud(1240, 74, 0.8, 4)}
  ${grass(270, W - 270, FLOOR)}
  ${fence(300, 600, FLOOR)}${fence(1180, 220, FLOOR)}
  ${house()}
  ${mango(X.tree)}
  ${bush(420, FLOOR, 0.9)}${bush(1300, FLOOR, 1, '#4ADE80')}
  ${[[360, '#F472B6'], [470, '#FACC15'], [520, '#F472B6'], [640, '#A855F7'], [700, '#FACC15'], [1250, '#F472B6'], [1330, '#FACC15']].map(([x, c]) => flowerAt(x, FLOOR - 2, c)).join('')}
  <!-- vệt cày trên cỏ (phi thuyền rơi) -->
  <path d="M1120 ${FLOOR + 4} Q1180 ${FLOOR + 1} 1240 ${FLOOR + 6}" stroke="#A16207" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.5"/>`;
}

// Ngôi sao tím ở xa (nhà của Bíp), vệt chấm từ tay Bíp tới
const STAR = [1086, 70];
function fg() {
  const lumo = `<circle cx="-22" cy="-4" r="20" fill="#A855F7" stroke="${L}" stroke-width="1.2"/>
    <path d="M-36 -12 Q-22 -2 -6 -16" stroke="#7E22CE" stroke-width="3" fill="none"/><ellipse cx="-22" cy="-4" rx="32" ry="7" fill="none" stroke="#F0ABFC" stroke-width="2.4" transform="rotate(-14 -22 -4)"/>
    <circle cx="26" cy="-18" r="9" fill="#FB923C" stroke="${L}" stroke-width="0.9"/><circle cx="44" cy="-2" r="6.5" fill="#FACC15" stroke="${L}" stroke-width="0.9"/>
    <text x="0" y="34" text-anchor="middle" ${NUN} font-size="16" fill="#7E22CE">Lumo</text>`;
  const ring = (x, y, r, i, n = '', [ox, oy] = [0, -r - 8]) => `<g class="e101-ring e101-ring${i}"><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#EA580C" stroke-width="2.2"/>
    ${n ? `<g transform="translate(${x + ox} ${y + oy})"><circle r="7" fill="#EA580C"/><text y="3.6" text-anchor="middle" ${NUN} font-size="10" fill="#fff">${n}</text></g>` : ''}</g>`;
  const eyes = BIP_AT.eyes.map((p, i) => { const [x, y] = at(p); return ring(x, y, 7.5, i + 1, i + 1, [[-17, 4], [0, -16], [17, 4]][i]); }).join('');
  const bulbs = BIP_AT.bulbs.map((p, i) => { const [x, y] = at(p); return ring(x, y, 7, i + 4, i + 1); }).join('');
  const shipY = FLOOR - 31 * SS;
  const glint = (x, y, d) => `<path class="e101-glint" style="animation-delay:${d}s" d="M${x} ${y - 8} L${x + 2} ${y - 2} L${x + 8} ${y} L${x + 2} ${y + 2} L${x} ${y + 8} L${x - 2} ${y + 2} L${x - 8} ${y} L${x - 2} ${y - 2}Z" fill="#fff" stroke="#94A3B8" stroke-width="0.6"/>`;
  // Đường so chiều cao: đỉnh đầu Minh / đỉnh đầu Bíp
  const hm = FLOOR - 122, hb = FLOOR + BIP_AT.top;
  return `
  ${bush(330, FLOOR + 30, 0.6)}${bush(1360, FLOOR + 32, 0.7, '#4ADE80')}
  <!-- tròn, bạc -->
  <ellipse class="e101-round" cx="${X.ship}" cy="${shipY}" rx="${76 * SS + 8}" ry="${16 * SS + 8}" fill="none" stroke="#EA580C" stroke-width="3" stroke-dasharray="6 5" pathLength="100"/>
  <g class="e101-silver">${glint(X.ship - 44, shipY - 4, 0)}${glint(X.ship + 20, shipY + 4, 0.3)}${glint(X.ship - 4, shipY - 40, 0.6)}${glint(X.ship + 52, shipY - 6, 0.9)}</g>
  <!-- so chiều cao -->
  <g class="e101-tall"><path d="M${X.minh - 22} ${hm} H${X.bip + 40} M${X.bip - 30} ${hb} H${X.bip + 40}" stroke="#EA580C" stroke-width="1.8" stroke-dasharray="4 3"/>
    <path d="M${X.bip + 34} ${hm + 3} V${hb - 3} M${X.bip + 30} ${hm + 8} L${X.bip + 34} ${hm + 2} L${X.bip + 38} ${hm + 8} M${X.bip + 30} ${hb - 8} L${X.bip + 34} ${hb - 2} L${X.bip + 38} ${hb - 8}" stroke="#EA580C" stroke-width="1.8" fill="none"/></g>
  ${eyes}${bulbs}
  <!-- ngôi sao xa: nhà của Bíp -->
  <g class="e101-far"><path class="e101-trail" d="M${X.bip + 10} ${FLOOR - 104} Q${X.bip + 30} ${STAR[1] + 10} ${STAR[0] - 14} ${STAR[1] + 4}" stroke="#A855F7" stroke-width="2.4" stroke-dasharray="2 6" stroke-linecap="round" fill="none" pathLength="100"/>
    <g transform="translate(${STAR[0]} ${STAR[1]})"><g class="e101-star"><path d="M0 -11 L3 -3.5 L11 -3 L5 2 L7 10 L0 6 L-7 10 L-5 2 L-11 -3 L-3 -3.5Z" fill="#C084FC" stroke="#7E22CE" stroke-width="1"/></g></g></g>
  ${thought(1010, 96, 150, 92, lumo, [X.bip + 18, FLOOR - 112], 'e101-bub')}
  <!-- nhãn -->
  <g class="e101-lb e101-lb-garden">${label(470, 132, 'garden', '#16A34A', 18)}</g>
  <g class="e101-lb e101-lb-ship">${label(X.ship, 150, 'spaceship', '#1D4ED8', 16)}</g>
  <g class="e101-lb e101-lb-round">${label(X.ship - 52, 178, 'round', '#EA580C', 15)}</g>
  <g class="e101-lb e101-lb-silver">${label(X.ship + 30, 178, 'silver', '#64748B', 15)}</g>
  <g class="e101-lb e101-lb-broken">${label(X.ship + 10, 150, 'broken', '#DC2626', 16)}</g>
  <g class="e101-lb e101-lb-alien">${label(X.bip, 128, 'alien', '#16A34A', 18)}</g>
  <g class="e101-lb e101-lb-small">${label(X.bip + 74, 156, 'small', '#EA580C', 15)}</g>
  <g class="e101-lb e101-lb-green">${label(X.bip + 74, 184, 'green', '#16A34A', 15)}</g>
  <g class="e101-lb e101-lb-eyes">${label(X.bip - 70, 118, '3 eyes', '#EA580C', 14)}</g>
  <g class="e101-lb e101-lb-ant">${label(X.bip + 76, 118, '2 antennae', '#EA580C', 14)}</g>
  <g class="e101-lb e101-lb-lucky">${label(X.lucky + 10, 200, 'Lucky', '#B45309', 15)}</g>
  <g class="e101-lb e101-lb-scared">${label(X.minh + 34, 128, 'not scared', '#16A34A', 15)}</g>
  <g class="e101-lb e101-lb-yellow">${label(X.bip + 70, 118, 'yellow!', '#CA8A04', 16)}</g>
  <g class="e101-lb e101-lb-far">${label(STAR[0] - 60, 100, 'far away', '#7E22CE', 15)}</g>
  <g class="e101-lb e101-lb-who">${speaker(X.minh - 6, 126, 'Minh')}</g>
  <g class="e101-q"><g transform="translate(${X.minh + 22} 150)"><text text-anchor="middle" ${NUN} font-size="26" fill="#EA580C" stroke="#fff" stroke-width="1">?</text></g></g>`;
}

const CSS = `
.e101-mango { transform-box: fill-box; transform-origin: 50% 0; animation: e101Mango 2.6s ease-in-out infinite alternate; }
@keyframes e101Mango { from { rotate: -8deg; } to { rotate: 8deg; } }
.e101-lb, .e101-q { opacity: 0; transition: opacity .35s; }
${['garden', 'ship', 'round', 'silver', 'broken', 'alien', 'small', 'green', 'eyes', 'ant', 'lucky', 'scared', 'yellow', 'far', 'who'].map((k) => `.st-lb-${k} .e101-lb-${k}`).join(', ')} { opacity: 1; }
.e101-lb > g { transform-box: fill-box; transform-origin: 50% 100%; }
.st-q .e101-q { opacity: 1; }
.st-q .e101-q > g > text { animation: e101Q .5s ease-in-out infinite alternate; }
@keyframes e101Q { to { translate: 0 -5px; } }
.e101-round { opacity: 0; stroke-dashoffset: 100; }
.st-round .e101-round { opacity: 1; stroke-dashoffset: 0; transition: stroke-dashoffset 1s linear, opacity .2s; }
.e101-silver { opacity: 0; transition: opacity .3s; }
.st-silver .e101-silver { opacity: 1; }
.e101-glint { transform-box: fill-box; transform-origin: center; scale: 0; }
.st-silver .e101-glint { animation: e101Glint 1s ease-in-out infinite alternate; }
@keyframes e101Glint { from { scale: .2; } to { scale: 1.2; } }
.e101-tall { opacity: 0; transition: opacity .3s; }
.st-tall .e101-tall { opacity: 1; }
.e101-ring { opacity: 0; transform-box: fill-box; transform-origin: center; scale: .3; transition: opacity .2s, scale .35s cubic-bezier(.3,1.6,.6,1); }
${[1, 2, 3, 4, 5].map((i) => `.st-ring${i} .e101-ring${i}`).join(', ')} { opacity: 1; scale: 1; }
.e101-far { opacity: 0; transition: opacity .3s; }
.st-far .e101-far { opacity: 1; }
.e101-trail { stroke-dashoffset: 100; }
.st-far .e101-trail { stroke-dashoffset: 0; transition: stroke-dashoffset 1.2s ease-out; }
.e101-star { animation: e101Star 1.2s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
@keyframes e101Star { from { scale: .8; rotate: -8deg; } to { scale: 1.25; rotate: 8deg; } }
.e101-bub { opacity: 0; transform: scale(.4); transform-origin: ${X.bip + 18}px ${FLOOR - 112}px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-bub .e101-bub { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .e101-mango { animation-duration: 6s; } .st-silver .e101-glint { animation-duration: 2s; } .e101-star { animation-duration: 3s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const pop = (st, k, vol = 0.5, rate = 1) => { st.set(k); st.sfx('pop', { vol, rate }); };

const BEATS = [
  { key: ['in the garden with Lucky'], icon: '🏡', label: 'garden', async play(st) {
    st.look(240, { instant: true });
    st.sfx('door-open', { vol: 0.6 });
    await st.wait(350);
    st.sfx('birds', { vol: 0.5 });
    st.look(520, { dur: 2600 });
    const dog = st.walk('lucky', 560, { speed: 140, follow: false });
    await st.wait(300);
    await st.walk('minh', 500, { speed: 125, follow: false });
    await dog;
    st.face('lucky', -1);
    st.set('st-lb-garden'); st.sfx('ding', { vol: 0.4 });
    st.act('lucky', 'wag'); st.sfx('dog-bark', { vol: 0.6 });
    st.pose('minh', 'open'); st.mood('minh', 'joy');
    await st.wait(1100);
    st.act('lucky', null); st.pose('minh', 'stand');
  } },
  { key: ['a small spaceship', 'under the mango tree'], icon: '🛸', label: 'spaceship', async play(st) {
    st.set('st-lb-garden', false);
    st.look(X.look, { dur: 2400 });
    const dog = st.walk('lucky', X.lucky, { speed: 150, follow: false });
    await st.walk('minh', X.minh, { speed: 130, follow: false });
    await dog;
    st.face('lucky', 1);
    st.pose('minh', 'point'); st.mood('minh', 'wow');
    st.set('st-lb-ship'); st.sfx('robot-beep', { vol: 0.5 });
    st.act('lucky', 'wag');
    await st.wait(700);
    st.sfx('dog-bark', { vol: 0.5 });
    await st.wait(700);
    st.act('lucky', null); st.pose('minh', 'stand');
  } },
  { key: ['round and silver'], icon: '⚪', label: 'round · silver', async play(st) {
    st.set('st-lb-ship', false);
    st.look(X.look);
    st.set('st-round'); st.set('st-lb-round'); st.sfx('whoosh', { vol: 0.35, rate: 1.2 });
    await st.wait(1100);
    st.set('st-silver'); st.set('st-lb-silver'); st.sfx('sparkle', { vol: 0.5 });
    st.mood('minh', 'wow');
    await st.wait(1200);
  } },
  { key: ['It is broken'], icon: '💥', label: 'broken', async play(st) {
    off(st, 'st-round', 'st-silver', 'st-lb-round', 'st-lb-silver');
    st.look(X.look);
    bipSet(st, 'ship', 'ship-broken'); st.sfx('bump', { vol: 0.8 });
    await st.wait(300);
    st.sfx('hiss', { vol: 0.6 });
    st.set('st-lb-broken');
    st.mood('minh', 'sad'); st.pose('minh', 'sad');
    await st.wait(700);
    st.sfx('beep', { vol: 0.4, rate: 0.8 });
    await st.wait(700);
    st.pose('minh', 'stand');
  } },
  { key: ['Hello!'], icon: '👋', label: 'Hello!', async play(st) {
    st.set('st-lb-broken', false);
    st.look(X.look);
    bipSet(st, 'ship', 'ship-pilot'); st.sfx('robot-beep', { vol: 0.6, rate: 1.2 });
    await st.wait(350);
    st.mood('minh', 'wow'); st.act('lucky', 'jump'); st.sfx('dog-bark', { vol: 0.5 });
    await st.say('ship', 'Hello!', 1300);
    st.act('lucky', null);
  } },
  { key: ['I am Bip', 'a little voice'], icon: '👽', label: 'I am Bip', async play(st) {
    st.look(X.look);
    bipSet(st, 'ship', 'ship-pilot', false);
    st.place('bip', X.ship - 6, FLOOR - 58, -1);
    st.show('bip', true); st.sfx('whoosh', { vol: 0.5 });
    await st.walk('bip', X.bip, { y: FLOOR, speed: 110, follow: false });
    st.sfx('bump', { vol: 0.3, rate: 1.5 });
    bipSet(st, 'bip', 'bip-wave'); st.mood('bip', 'happy');
    await st.say('bip', 'I am Bip!', 1500);
    bipSet(st, 'bip', 'bip-wave', false);
  } },
  { key: ['Bip is an alien'], icon: '👾', label: 'alien', async play(st) {
    st.look(X.look);
    st.set('st-lb-alien'); st.sfx('robot-beep', { vol: 0.5, rate: 0.9 });
    st.act('bip', 'hover'); st.sfx('drone', { vol: 0.3 });
    st.mood('minh', 'wow'); st.act('lucky', 'wag');
    await st.wait(1800);
    st.act('bip', null); st.act('lucky', null);
  } },
  { key: ['from planet Lumo'], icon: '🪐', label: 'Lumo', async play(st) {
    st.set('st-lb-alien', false);
    st.look(X.look);
    st.set('st-bub'); st.sfx('pop', { vol: 0.5 });
    st.mood('bip', 'happy'); st.act('bip', 'dance');
    await st.wait(600);
    st.sfx('ding', { vol: 0.4, rate: 0.8 });
    await st.wait(1300);
    st.act('bip', null); st.mood('bip', 'happy');
  } },
  { key: ['small and green'], icon: '🟢', label: 'small · green', async play(st) {
    st.set('st-bub', false);
    st.look(X.look);
    st.face('minh', 1);
    st.set('st-tall'); st.sfx('whoosh', { vol: 0.3, rate: 1.3 });
    await st.wait(300);
    pop(st, 'st-lb-small');
    await st.wait(900);
    pop(st, 'st-lb-green', 0.5, 1.2); st.act('bip', 'jump');
    await st.wait(1000);
    st.act('bip', null);
  } },
  { key: ['three eyes and two antennae'], icon: '👀', label: '3 eyes · 2 antennae', async play(st) {
    off(st, 'st-tall', 'st-lb-small', 'st-lb-green');
    st.look(X.look);
    st.set('st-lb-eyes');
    for (let i = 1; i <= 3; i++) { await st.wait(i === 1 ? 200 : 420); pop(st, `st-ring${i}`, 0.5, 0.9 + i * 0.1); }
    await st.wait(400);
    st.set('st-lb-ant');
    for (let i = 4; i <= 5; i++) { await st.wait(420); pop(st, `st-ring${i}`, 0.5, 1.2 + i * 0.05); }
    st.mood('bip', 'happy'); st.sfx('ding', { vol: 0.35, rate: 1.3 });
    await st.wait(900);
    st.mood('bip', 'happy');
  } },
  { key: ['I am Minh'], icon: '🧒', label: 'I am Minh', async play(st) {
    off(st, 'st-lb-eyes', 'st-lb-ant', 'st-ring1', 'st-ring2', 'st-ring3', 'st-ring4', 'st-ring5');
    st.look(X.look);
    st.face('minh', 1); st.pose('minh', 'me'); st.mood('minh', 'joy'); st.sfx('pop', { vol: 0.3 });
    await st.say('minh', 'I am Minh.', 1500);
    st.pose('minh', 'stand');
  } },
  { key: ['This is my dog, Lucky'], icon: '🐶', label: 'my dog, Lucky', async play(st) {
    st.look(X.look);
    st.face('minh', 1); st.pose('minh', 'point');
    st.set('st-lb-lucky');
    st.act('lucky', 'wag'); st.sfx('dog-bark', { vol: 0.6 });
    const say = st.say('minh', 'This is my dog, Lucky.', 2000);
    await st.wait(700);
    st.dog('lucky', 'sit'); st.sfx('bump', { vol: 0.2, rate: 1.6 });
    await say;
    st.act('lucky', null); st.pose('minh', 'stand'); st.face('minh', 1);
  } },
  { key: ['Minh is not scared'], icon: '💪', label: 'not scared', async play(st) {
    st.set('st-lb-lucky', false);
    st.look(X.look);
    st.face('minh', 1); st.mood('minh', 'joy');
    st.set('st-lb-scared'); st.sfx('ding', { vol: 0.4 });
    st.pose('minh', 'give');
    await st.wait(500);
    st.act('bip', 'hover'); st.sfx('drone', { vol: 0.25, rate: 1.2 });
    await st.wait(1000);
    st.act('bip', null); st.sfx('click', { vol: 0.6 });
    await st.wait(400);
    st.pose('minh', 'stand');
  } },
  { key: ['Lucky is happy'], icon: '🐕', label: 'Lucky happy', async play(st) {
    st.set('st-lb-scared', false);
    st.look(X.look);
    st.dog('lucky', 'stand'); st.mood('lucky', 'joy');
    st.act('lucky', 'jump'); st.sfx('dog-bark', { vol: 0.6 });
    await st.wait(600);
    st.fx('hearts', X.lucky + 10, FLOOR - 76, { quiet: true }); st.sfx('dog-bark', { vol: 0.5, rate: 1.15 });
    await st.wait(900);
    st.act('lucky', 'wag');
    await st.wait(400);
  } },
  { key: ['Bip is happy, too'], icon: '😊', label: 'Bip happy', async play(st) {
    st.look(X.look);
    st.act('lucky', null);
    st.act('bip', 'jump'); st.sfx('giggle', { vol: 0.5, rate: 1.3 });
    await st.wait(640); st.sfx('bump', { vol: 0.2, rate: 1.8 });
    await st.wait(620); st.sfx('bump', { vol: 0.2, rate: 1.8 });
    await st.wait(300);
    st.act('bip', null);
  } },
  { key: ['His antennae glow yellow'], icon: '💡', label: 'glow yellow', async play(st) {
    st.look(X.look);
    bipSet(st, 'bip', 'bip-glow'); st.mood('bip', 'joy');
    const [bx, by] = at([0, BIP_AT.bulbs[0][1]]);
    st.fx('sparkle', bx, by);
    st.set('st-lb-yellow');
    st.mood('minh', 'wow');
    await st.wait(1700);
    st.mood('minh', 'joy');
  } },
  { key: ['Have you got a home'], icon: '🏠', label: 'a home?', async play(st) {
    st.set('st-lb-yellow', false);
    st.look(X.look);
    st.mood('bip', 'happy');
    st.face('minh', 1); st.pose('minh', 'shrug'); st.mood('minh', 'happy'); st.sfx('pop', { vol: 0.3 });
    await st.say('minh', 'Have you got a home?', 2000);
  } },
  { key: ['asks Minh'], icon: '❓', label: 'asks Minh', async play(st) {
    st.look(X.look);
    st.set('st-lb-who'); st.sfx('ding', { vol: 0.3, rate: 1.4 });
    st.pose('minh', 'think');
    await st.wait(300);
    st.set('st-q'); st.sfx('pop', { vol: 0.4, rate: 1.3 });
    st.act('bip', 'look');
    await st.wait(1200);
    st.act('bip', null); st.pose('minh', 'stand');
  } },
  { key: ['it is far away', 'says Bip'], icon: '🌟', label: 'far away', async play(st) {
    off(st, 'st-lb-who', 'st-q');
    st.look(X.look);
    bipSet(st, 'bip', 'bip-glow', false);
    st.mood('bip', 'sad');
    bipSet(st, 'bip', 'bip-wave');
    const say = st.say('bip', 'Yes, but it is far away.', 2400);
    await st.wait(400);
    st.set('st-far'); st.sfx('whoosh', { vol: 0.4, rate: 0.8 });
    await st.wait(700);
    st.set('st-lb-far'); st.sfx('ding', { vol: 0.35, rate: 0.7 });
    st.mood('minh', 'sad');
    await say;
    bipSet(st, 'bip', 'bip-wave', false);
  } },
  { key: ['You are my friend'], icon: '🤝', label: 'my friend', async play(st) {
    off(st, 'st-far', 'st-lb-far');
    st.look(X.look);
    st.pose('minh', 'open'); st.mood('minh', 'joy');
    const say = st.say('minh', 'You are my friend!', 1900);
    await st.wait(500);
    st.fx('hearts', (X.minh + X.bip) / 2, FLOOR - 120);
    st.mood('bip', 'joy'); bipSet(st, 'bip', 'bip-glow');
    await say;
  } },
  { key: ['says Minh'], icon: '🎉', label: 'friends', async play(st) {
    st.look(X.look);
    st.set('st-lb-who');
    await st.walk('bip', X.minh + 50, { y: FLOOR - 26, speed: 90, follow: false });
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.act('bip', 'jump'); st.act('lucky', 'jump');
    st.sfx('cheer', { vol: 0.5 }); st.sfx('dog-bark', { vol: 0.4 });
    await st.wait(1600);
    st.act('minh', null); st.act('bip', null); st.act('lucky', null); st.pose('minh', 'stand');
  } },
];

export default {
  id: 'en101', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + BIP_CSS + CSS, bg, fg, beats: BEATS,
  order: [1, 3, 5, 9, 15, 19],
  cast: [
    { id: 'ship', kind: 'thing', svg: SHIP_SVG, box: SHIP_BOX, x: X.ship, s: SS },
    { id: 'bip', kind: 'thing', svg: BIP_SVG, box: BIP_BOX, x: X.bip, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.door },
    { id: 'lucky', kind: 'dog', x: X.door - 50, s: 0.95 },
  ],
  init(st) { st.show('bip', false); },
};
