/**
 * Bài 28 "Making Spring Rolls": bếp nhà bà, từ trái sang phải: cửa ra vườn (Minh vào sau) → bàn làm nem (Lan và bà đứng sau bàn)
 * → quầy (cân thịt, rổ rau, trứng) → bếp lò có chảo dầu. How many = đếm từng cái bay ra; How much = cân / nhúm nhỏ.
 * Toạ độ cảnh: rộng 1060, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, room, label, steam, windowBox, shelf } from '../kit.js';

const FLOOR = 282;
const TOP = 236; // mặt bàn làm nem
const CTOP = 220; // mặt quầy

// ── Đồ vật (gốc = giữa đáy) ───────────────────────────────────────────────
const CARROT = `<path d="M-3 0 L0 -20 L3 0Z" transform="rotate(80)" fill="#F97316" stroke="${L}" stroke-width="0.8"/><path d="M-20 -1 l-4 -4 M-20 -1 l-5 1 M-20 -1 l-3 4" stroke="#16A34A" stroke-width="1.6" stroke-linecap="round" transform="translate(0 -3)"/>`;
const CARROTS = `<g transform="translate(2 -3)">${CARROT}</g><g transform="translate(0 -7) rotate(-6)">${CARROT}</g>`;
const MUSH = `<path d="M-2.4 0 V-6 H2.4 V0Z" fill="#FEF3C7" stroke="${L}" stroke-width="0.6"/><path d="M-7 -5 Q0 -15 7 -5Z" fill="#A16207" stroke="${L}" stroke-width="0.7"/>`;
const MUSHS = `<g transform="translate(-5 0)">${MUSH}</g><g transform="translate(5 0) scale(0.85)">${MUSH}</g><g transform="translate(0 -5) scale(0.8)">${MUSH}</g>`;
const EGG = `<ellipse cx="0" cy="-5" rx="3.8" ry="5" fill="#FFF7ED" stroke="${L}" stroke-width="0.7"/>`;
const MEAT = `<path d="M-16 -2 Q-18 -14 -4 -15 Q14 -16 16 -6 Q16 0 6 0 H-12Z" fill="#F87171" stroke="${L}" stroke-width="0.9"/><path d="M-8 -9 Q0 -12 8 -8" stroke="#FECACA" stroke-width="2" fill="none"/>`;
const ROLL = (c = '#FEF3C7') => `<rect x="-11" y="-6" width="22" height="7" rx="3.4" fill="${c}" stroke="${L}" stroke-width="0.8"/><path d="M-5 -6 V1 M3 -6 V1" stroke="${L}" stroke-width="0.4" opacity="0.5"/>`;
const GOLD = '#F59E0B';
const SALT = `<g transform="rotate(180) translate(0 -4)"><rect x="-4" y="-8" width="8" height="12" rx="2" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M-4 -8 Q0 -13 4 -8Z" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/></g>`;
const PINCH = `<circle cx="-3" cy="0" r="1.2" fill="#fff" stroke="#94A3B8" stroke-width="0.3"/><circle cx="2" cy="-2" r="1.2" fill="#fff" stroke="#94A3B8" stroke-width="0.3"/><circle cx="1" cy="3" r="1.2" fill="#fff" stroke="#94A3B8" stroke-width="0.3"/>`;
const MIXF = `<ellipse cx="0" cy="-4" rx="10" ry="4" fill="#FCA5A5" stroke="${L}" stroke-width="0.6"/><circle cx="-4" cy="-5" r="1.4" fill="#F97316"/><circle cx="3" cy="-4" r="1.4" fill="#A16207"/><circle cx="0" cy="-6" r="1.2" fill="#FDE047"/>`;
const SMALLPLATE = (n) => `<g transform="translate(0 -18)"><ellipse rx="14" ry="3.4" fill="#fff" stroke="#3B82F6" stroke-width="1.2"/>${Array.from({ length: n }, (_, i) => `<g transform="translate(${(i - (n - 1) / 2) * 12} -1) scale(0.5)">${ROLL(GOLD)}</g>`).join('')}</g>`;

/** Ảnh cả nhà trên tường (8 người). */
const FAMILY = `<rect x="-40" y="-28" width="80" height="56" rx="3" fill="#fff" stroke="#B45309" stroke-width="4"/><rect x="-36" y="-24" width="72" height="48" fill="#FEF9C3"/>
  ${[[-26, 6, '#A78BFA', '#E7E5E4'], [-13, 4, '#FDE68A', '#E7E5E4'], [0, 6, '#60A5FA', '#1F1716'], [13, 4, '#86EFAC', '#1F1716'], [26, 6, '#22C55E', '#E0A33A']].map(([x, y, c, h]) => `<g transform="translate(${x} ${y})"><path d="M-6 16 V6 Q0 0 6 6 V16Z" fill="${c}"/><circle cy="-2" r="5" fill="#FADCC4" stroke="${L}" stroke-width="0.5"/><path d="M-5 -4 Q0 -10 5 -4" fill="${h}"/></g>`).join('')}
  ${[[-6, 14, '#FB923C'], [7, 14, '#F9A8D4']].map(([x, y, c]) => `<g transform="translate(${x} ${y})"><path d="M-4 9 V4 Q0 0 4 4 V9Z" fill="${c}"/><circle cy="-1" r="3.6" fill="#FADCC4" stroke="${L}" stroke-width="0.5"/><path d="M-3.6 -2 Q0 -6 3.6 -2" fill="#1F1716"/></g>`).join('')}`;

function bg() {
  return `
  ${room(0, 1060, FLOOR, '#FEF9C3')}
  <rect x="0" y="0" width="1060" height="12" fill="#E9D5B5" stroke="${L}"/>
  ${Array.from({ length: 20 }, (_, i) => `<path d="M${600 + i * 24} 150 V214" stroke="#FDE68A" stroke-width="1"/>`).join('')}<path d="M600 150 H1060 M600 182 H1060" stroke="#FDE68A" stroke-width="1"/>
  <!-- Cửa ra vườn -->
  <rect x="62" y="96" width="80" height="${FLOOR - 96}" fill="#BAE6FD"/><path d="M62 230 Q100 214 142 226 V${FLOOR} H62Z" fill="#86EFAC"/>
  <circle cx="84" cy="200" r="16" fill="#22C55E" stroke="${L}"/><rect x="82" y="214" width="5" height="40" fill="#A16207"/>
  <g class="e028-door"><rect x="62" y="96" width="80" height="${FLOOR - 96}" fill="#B45309" stroke="${L}"/><rect x="72" y="108" width="60" height="70" rx="4" fill="#92400E"/><circle cx="132" cy="200" r="3.4" fill="#FDE68A" stroke="${L}"/></g>
  <path d="M54 ${FLOOR} V90 H150 V${FLOOR}" fill="none" stroke="#E9D5B5" stroke-width="10"/><path d="M54 ${FLOOR} V90 H150 V${FLOOR}" fill="none" stroke="${L}" stroke-width="1"/>
  <!-- Tranh công thức + ảnh cả nhà -->
  <g transform="translate(300 60)"><g class="e028-poster"><rect x="-44" y="0" width="88" height="70" rx="4" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <rect x="-44" y="0" width="88" height="16" rx="4" fill="#EF4444" stroke="${L}"/><text x="0" y="12" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="10" fill="#fff">SPRING ROLLS</text>
    <ellipse cx="0" cy="50" rx="30" ry="7" fill="#fff" stroke="#3B82F6" stroke-width="1.2"/>${[-14, 0, 14].map((x) => `<g transform="translate(${x} 48) scale(0.9)">${ROLL(GOLD)}</g>`).join('')}<g transform="translate(-6 40) scale(0.9)">${ROLL(GOLD)}</g><g transform="translate(8 40) scale(0.9)">${ROLL(GOLD)}</g>
    <path d="M-30 26 h20 M10 26 h20" stroke="#94A3B8" stroke-width="1.4"/></g></g>
  <g transform="translate(480 100)"><g class="e028-photo">${FAMILY}</g></g>
  <!-- Quầy: cân thịt, rổ rau -->
  ${windowBox(680, 50, 110, 84)}
  ${shelf(860, 96, 120, `${[872, 900, 930, 958].map((x, i) => `<rect x="${x}" y="${78 + (i % 2) * 2}" width="16" height="${18 - (i % 2) * 2}" rx="3" fill="${['#FDE68A', '#F87171', '#86EFAC', '#93C5FD'][i]}" stroke="${L}" stroke-width="0.7"/>`).join('')}`)}
  <rect x="626" y="${CTOP + 6}" width="178" height="${FLOOR - CTOP - 6}" fill="#F59E0B" stroke="${L}" stroke-width="1.2"/><rect x="620" y="${CTOP}" width="190" height="9" rx="3" fill="#F5F5F4" stroke="${L}"/>
  ${[670, 760].map((x) => `<rect x="${x - 34}" y="${CTOP + 14}" width="68" height="42" rx="3" fill="#FBBF24" stroke="${L}" stroke-width="0.8"/><circle cx="${x + 26}" cy="${CTOP + 34}" r="2.4" fill="#FDE68A"/>`).join('')}
  <g transform="translate(668 ${CTOP})"><rect x="-22" y="-12" width="44" height="12" rx="3" fill="#E5E7EB" stroke="${L}"/><circle cx="0" cy="-24" r="13" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <path d="M-10 -24 A10 10 0 0 1 10 -24" fill="none" stroke="#CBD5E1" stroke-width="1"/><text x="0" y="-15" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="5" fill="#475569">kg</text>
    <g transform="translate(0 -24)"><g class="e028-needle"><path d="M0 0 V-10" stroke="#EF4444" stroke-width="1.6" stroke-linecap="round"/></g><circle r="1.6" fill="${L}"/></g>
    <rect x="-20" y="-40" width="40" height="4" rx="2" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/>
    <g class="e028-meat" transform="translate(0 -40)">${MEAT}</g></g>
  <g transform="translate(736 ${CTOP})"><path d="M-24 -18 H24 L20 0 H-20Z" fill="#D97706" stroke="${L}"/><path d="M-22 -12 H22 M-21 -6 H21" stroke="#B45309" stroke-width="1"/>
    <g class="e028-bcar" transform="translate(-12 -18)">${CARROTS}</g><g class="e028-bmush" transform="translate(4 -18)">${MUSHS}</g>
    ${[1, 2, 3].map((i) => `<g class="e028-begg${i}" transform="translate(${8 + i * 4} -18)">${EGG}</g>`).join('')}</g>
  <g transform="translate(786 ${CTOP})"><rect x="-6" y="-14" width="10" height="14" rx="2" fill="#fff" stroke="${L}" stroke-width="0.8"/><text x="-1" y="-5" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="5" fill="#475569">S</text></g>
  <!-- Bếp lò + chảo dầu -->
  <rect x="820" y="${CTOP + 6}" width="110" height="${FLOOR - CTOP - 6}" fill="#E5E7EB" stroke="${L}" stroke-width="1.2"/><rect x="814" y="${CTOP}" width="122" height="9" rx="3" fill="#475569" stroke="${L}"/>
  <rect x="836" y="${CTOP + 18}" width="78" height="36" rx="4" fill="#94A3B8" stroke="${L}"/>${[850, 900].map((x) => `<circle cx="${x}" cy="${CTOP + 14}" r="3" fill="#1F2937"/>`).join('')}
  <g class="e028-flame">${[862, 876, 890].map((x) => `<path d="M${x} ${CTOP} q-4 -6 0 -10 q4 4 0 10Z" fill="#F97316"/>`).join('')}</g>
  <g transform="translate(876 ${CTOP - 6})"><path d="M-34 -6 Q0 22 34 -6Z" fill="#1F2937" stroke="${L}"/><path d="M34 -6 L58 -12" stroke="${L}" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="0" cy="-6" rx="34" ry="5" fill="#FCD34D" stroke="${L}" stroke-width="0.8" opacity="0.9"/>
    <g class="e028-oil">${[-20, -8, 6, 18].map((x, i) => `<circle class="e028-bub" style="animation-delay:${i * 0.15}s" cx="${x}" cy="-7" r="2" fill="#fff" opacity="0.9"/>`).join('')}</g>
    <g class="e028-wok">${[-14, 0, 14].map((x) => `<g transform="translate(${x} -6)"><g class="e028-wokroll">${ROLL()}</g></g>`).join('')}</g></g>
  ${steam(876, 196, 'e028-fsteam')}
  <!-- Đĩa nem chín trên quầy -->
  <g transform="translate(790 ${CTOP})" class="e028-fried"><ellipse cx="0" cy="-2" rx="18" ry="4" fill="#fff" stroke="#3B82F6" stroke-width="1.2"/>
    ${[-8, 4, -2].map((x, i) => `<g class="e028-fr${i}" transform="translate(${x} ${-4 - (i === 2 ? 6 : 0)}) scale(0.75)">${ROLL(GOLD)}</g>`).join('')}</g>`;
}

function fg() {
  return `
  <!-- Bàn làm nem (khăn bàn che chân người đứng sau bàn) -->
  <rect x="262" y="${TOP}" width="336" height="${FLOOR - TOP}" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/>
  ${Array.from({ length: 8 }, (_, i) => `<path d="M${282 + i * 40} ${TOP + 4} V${FLOOR}" stroke="#FCD34D" stroke-width="10" opacity="0.6"/>`).join('')}
  <rect x="254" y="${TOP - 6}" width="352" height="9" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
  <g transform="translate(300 ${TOP - 6})" class="e028-car">${CARROTS}</g>
  <g transform="translate(328 ${TOP - 6})" class="e028-mush">${MUSHS}</g>
  ${[1, 2, 3].map((i) => `<g class="e028-egg${i}" transform="translate(${348 + i * 9} ${TOP - 6})">${EGG}</g>`).join('')}
  <g transform="translate(420 ${TOP - 6})"><path d="M-26 -18 H26 Q25 2 0 3 Q-25 2 -26 -18Z" fill="#E0F2FE" stroke="#3B82F6" stroke-width="1.4"/>
    <g class="e028-mixin"><path d="M-23 -17 Q0 -26 23 -17Z" fill="#FCA5A5" stroke="${L}" stroke-width="0.7"/><circle cx="-10" cy="-19" r="2" fill="#F97316"/><circle cx="4" cy="-20" r="2" fill="#A16207"/><circle cx="12" cy="-18" r="1.8" fill="#FDE047"/><circle cx="-2" cy="-18" r="1.8" fill="#22C55E"/></g>
    <g class="e028-mixout"><path d="M-23 -17 Q0 -21 23 -17Z" fill="#FEF2F2" stroke="${L}" stroke-width="0.5"/></g></g>
  <g transform="translate(500 ${TOP - 6})"><rect x="-26" y="-4" width="52" height="4" rx="1.5" fill="#D97706" stroke="${L}" stroke-width="0.8"/>
    <g class="e028-paper"><ellipse cx="0" cy="-6" rx="20" ry="4" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="0.8"/><path d="M-14 -7 H14 M-10 -5 H10" stroke="#E2E8F0" stroke-width="0.6"/></g>
    <g class="e028-filling" transform="translate(0 -3)">${MIXF}</g>
    <g class="e028-boardroll" transform="translate(0 -3)">${ROLL()}</g></g>
  <g transform="translate(566 ${TOP - 6})"><ellipse cx="0" cy="-2" rx="20" ry="4" fill="#fff" stroke="#3B82F6" stroke-width="1.2"/><g class="e028-raw">${[-10, 4, -3].map((x, i) => `<g transform="translate(${x} ${-4 - (i === 2 ? 6 : 0)}) scale(0.8)">${ROLL()}</g>`).join('')}</g></g>
  <!-- Nhãn chữ -->
  <g class="e028-lb e028-lb-sr">${label(300, 156, 'spring rolls', '#DC2626', 14)}</g>
  <g class="e028-lb e028-lb-q1">${label(380, 104, '?', '#7C3AED', 22)}</g>
  <g class="e028-lb e028-lb-40">${label(430, 64, '40', '#DC2626', 28)}</g>
  <g class="e028-lb e028-lb-dinner">${label(480, 158, 'dinner', '#7C3AED', 15)}</g>
  <g class="e028-lb e028-lb-meat">${label(668, 150, 'meat', '#DC2626', 15)}</g>
  <g class="e028-lb e028-lb-kilo">${label(668, 150, '1 kilo', '#DC2626', 16)}</g>
  <g class="e028-lb e028-lb-car">${label(290, 258, '2 carrots', '#EA580C', 12)}</g>
  <g class="e028-lb e028-lb-mush">${label(392, 272, 'mushrooms', '#A16207', 12)}</g>
  <g class="e028-lb e028-lb-eggs">${label(370, 262, '3 eggs', '#B45309', 13)}</g>
  <g class="e028-lb e028-lb-salt">${label(430, 262, 'a little salt', '#475569', 12)}</g>
  <g class="e028-lb e028-lb-oil">${label(850, 138, 'hot oil', '#EA580C', 15)}</g>
  <g class="e028-lb e028-lb-q2">${label(736, 108, '?', '#7C3AED', 22)}</g>
  <g class="e028-lb e028-lb-two">${label(736, 104, '2', '#DC2626', 26)}</g>`;
}

const CSS = `
.e028-lb { opacity: 0; transition: opacity .3s; }
${['sr', 'q1', '40', 'dinner', 'meat', 'kilo', 'car', 'mush', 'eggs', 'salt', 'oil', 'q2', 'two'].map((k) => `.st-lb-${k} .e028-lb-${k}`).join(', ')} { opacity: 1; }
.e028-poster, .e028-photo { transition: transform .4s cubic-bezier(.3,1.6,.6,1); }
.st-poster .e028-poster { transform: scale(1.1); }
.st-photo .e028-photo { transform: scale(1.25); }
.e028-door { transform-origin: 62px 200px; transition: transform .6s cubic-bezier(.4,0,.2,1); }
.st-door .e028-door { transform: scaleX(.12); }
.e028-needle { transform: rotate(-80deg); transition: transform 1s cubic-bezier(.3,1.6,.6,1); }
.st-kilo .e028-needle { transform: rotate(10deg); }
.e028-car, .e028-mush, .e028-egg1, .e028-egg2, .e028-egg3, .e028-mixin, .e028-filling, .e028-boardroll, .e028-raw, .e028-wok, .e028-fried, .e028-oil, .e028-fsteam { opacity: 0; transition: opacity .25s; }
.st-car .e028-car, .st-mush .e028-mush, .st-egg1 .e028-egg1, .st-egg2 .e028-egg2, .st-egg3 .e028-egg3, .st-mix .e028-mixin, .st-filling .e028-filling,
.st-boardroll .e028-boardroll, .st-raw .e028-raw, .st-wok .e028-wok, .st-fried .e028-fried, .st-wok .e028-oil, .st-wok .e028-fsteam { opacity: 1; }
.st-car .e028-bcar, .st-mush .e028-bmush, .st-egg1 .e028-begg1, .st-egg2 .e028-begg2, .st-egg3 .e028-begg3, .st-mix .e028-meat { opacity: 0; }
.e028-bcar, .e028-bmush, .e028-begg1, .e028-begg2, .e028-begg3, .e028-meat { transition: opacity .2s; }
.st-mix .e028-car, .st-mix .e028-mush, .st-mix .e028-egg1, .st-mix .e028-egg2, .st-mix .e028-egg3 { opacity: 0; }
.st-mix .e028-mixout, .st-filling .e028-mixin { opacity: 0; }
.st-boardroll .e028-paper, .st-boardroll .e028-filling { opacity: 0; }
.e028-paper { transition: opacity .3s; }
.e028-wokroll rect { transition: fill 1.6s; }
.st-golden .e028-wokroll rect { fill: ${GOLD}; }
.e028-bub { animation: e028Bub .5s ease-out infinite; }
@keyframes e028Bub { from { transform: translateY(2px) scale(.4); } to { transform: translateY(-4px) scale(1.2); opacity: 0; } }
.e028-flame { opacity: 0; transition: opacity .3s; } .st-wok .e028-flame { opacity: 1; animation: e028Fl .2s ease-in-out infinite alternate; }
@keyframes e028Fl { to { transform: translateY(-1px); opacity: .7; } }
.e028-fr0, .e028-fr1 { transition: opacity .2s; }
.st-ate .e028-fr0, .st-ate .e028-fr1 { opacity: 0; }
.es-ac.act-e028-shake .pp-fowR { animation: e028Shake .14s ease-in-out infinite alternate; }
@keyframes e028Shake { from { transform: rotate(-10deg); } to { transform: rotate(14deg); } }
.es-ac.act-e028-laugh .pp-bob { animation: e028Laugh .18s ease-in-out infinite alternate; }
@keyframes e028Laugh { from { transform: translateY(0); } to { transform: translateY(-3px); } }
@media (prefers-reduced-motion: reduce) { .e028-bub { animation-duration: 1.2s; } }
`;

const POSES = {
  e028_salt: { R: [70, 150], L: [10, 4] },
  e028_roll: { R: [40, -70], L: [40, -70], head: 8 },
};

/** Món bay từ (x1,y1) tới (x2,y2) rồi bật trạng thái hiện món ở chỗ mới. */
async function move(st, svg, from, to, flag, dur = 650) {
  await st.fly(svg, from, to, { dur });
  if (flag) st.set(flag);
}

const BEATS = [
  { key: ['making spring rolls with Grandma'], icon: '🥢', label: 'spring rolls', async play(st) {
    st.look(440);
    st.set('st-poster'); st.set('st-lb-sr'); st.fx('sparkle', 300, 110);
    st.pose('lan', 'cheer'); st.mood('lan', 'joy'); st.pose('gma', 'open'); st.mood('gma', 'joy');
    await st.wait(1800);
    st.set('st-poster', false); st.set('st-lb-sr', false);
    st.pose('lan', 'stand'); st.pose('gma', 'stand'); st.mood('lan', 'happy'); st.mood('gma', 'happy');
  } },
  { key: ['How many spring rolls do we need'], icon: '❓', label: 'how many?', async play(st) {
    await st.say('lan', 'How many spring rolls do we need?', 2600);
  } },
  { key: ['asks Lan'], icon: '🙋', label: 'asks Lan', async play(st) {
    st.set('st-lb-q1'); st.pose('lan', 'think'); st.mood('lan', 'wow');
    await st.wait(1300);
    st.set('st-lb-q1', false); st.pose('lan', 'stand'); st.mood('lan', 'happy');
  } },
  { key: ['Forty'], icon: '4️⃣', label: 'forty', async play(st) {
    st.pose('gma', 'open'); st.mood('gma', 'joy');
    st.set('st-lb-40'); st.fx('sparkle', 430, 56);
    await st.say('gma', 'Forty!', 1500);
    st.mood('lan', 'wow');
    await st.wait(300);
    st.set('st-lb-40', false); st.pose('gma', 'stand'); st.mood('gma', 'happy'); st.mood('lan', 'happy');
  } },
  { key: ['The whole family is coming for dinner'], icon: '👨‍👩‍👧‍👦', label: 'family dinner', async play(st) {
    st.pose('gma', 'pointUp'); st.act('gma', 'point');
    st.set('st-photo'); st.set('st-lb-dinner');
    st.fx('hearts', 480, 100);
    await st.wait(2300);
    st.act('gma', null); st.pose('gma', 'stand'); st.set('st-photo', false); st.set('st-lb-dinner', false);
  } },
  { key: ['Lan looks at the meat'], icon: '🥩', label: 'the meat', async play(st) {
    await st.walk('lan', 610, { speed: 130, lead: 20 });
    st.pose('lan', 'point'); st.mood('lan', 'wow');
    st.set('st-lb-meat'); st.fx('sparkle', 668, 176);
    await st.wait(1300);
    st.set('st-lb-meat', false); st.mood('lan', 'happy');
  } },
  { key: ['How much meat have we got'], icon: '⚖️', label: 'how much meat?', async play(st) {
    st.pose('lan', 'stand');
    await st.say('lan', 'How much meat have we got?', 2400);
  } },
  { key: ['one kilo'], icon: '⚖️', label: 'one kilo', async play(st) {
    st.set('st-kilo'); st.sfx('bowl-down', { vol: 0.5 });
    await st.wait(600);
    st.set('st-lb-kilo');
    await st.say('gma', 'One kilo.', 1600);
    st.set('st-lb-kilo', false);
  } },
  { key: ['two carrots and some mushrooms'], icon: '🥕', label: 'carrots, mushrooms', async play(st) {
    st.pose('lan', 'reach');
    await move(st, `<g transform="translate(0 8)">${CARROTS}</g>`, [724, 200], [300, TOP - 14], 'st-car', 800);
    st.set('st-lb-car');
    await move(st, `<g transform="translate(0 6)">${MUSHS}</g>`, [740, 200], [328, TOP - 12], 'st-mush', 800);
    st.set('st-lb-mush');
    st.pose('lan', 'stand');
    await st.walk('lan', 376, { speed: 140, lead: 40 });
    await st.walk('lan', 380, { speed: 40, follow: false });
    st.set('st-lb-car', false); st.set('st-lb-mush', false);
  } },
  { key: ['How many eggs do we need'], icon: '🥚', label: 'how many eggs?', async play(st) {
    await st.say('lan', 'How many eggs do we need?', 2300);
  } },
  { key: ['Three eggs'], icon: '3️⃣', label: 'three eggs', async play(st) {
    st.say('gma', 'Three eggs.', 1500);
    st.pose('gma', 'give');
    for (const i of [1, 2, 3]) {
      await move(st, EGG, [744 + i * 4, 196], [348 + i * 9, TOP - 8], `st-egg${i}`, 600);
      st.sfx('bowl-down', { vol: 0.3, rate: 1.4 });
    }
    st.set('st-lb-eggs'); st.pose('gma', 'stand');
    await st.wait(600);
    st.set('st-lb-eggs', false);
  } },
  { key: ['And how much salt'], icon: '🧂', label: 'how much salt?', async play(st) {
    await st.say('lan', 'And how much salt?', 2000);
  } },
  { key: ['Just a little salt'], icon: '🤏', label: 'a little salt', async play(st) {
    st.say('gma', 'Just a little salt.', 1800);
    st.hold('gma', 'e028_salt'); st.pose('gma', 'e028_salt');
    await st.wait(400);
    st.act('gma', 'e028-shake'); st.set('st-lb-salt');
    st.fly(PINCH, [452, 186], [430, TOP - 22], { size: 12, dur: 400 });
    await st.wait(450);
    await st.fly(PINCH, [452, 186], [416, TOP - 22], { size: 12, dur: 400 });
    await st.wait(400);
    st.act('gma', null); st.hold('gma', null); st.pose('gma', 'stand'); st.set('st-lb-salt', false);
  } },
  { key: ['mixes everything in a big bowl'], icon: '🥣', label: 'mixes', async play(st) {
    st.fly(MEAT, [668, 180], [420, TOP - 24], { dur: 700 });
    await st.wait(200);
    st.fly(CARROTS, [300, TOP - 14], [420, TOP - 24], { size: 26, dur: 500 });
    st.fly(MUSHS, [328, TOP - 12], [420, TOP - 24], { size: 26, dur: 550 });
    await st.fly(EGG, [366, TOP - 10], [420, TOP - 24], { size: 16, dur: 600 });
    st.set('st-mix');
    st.hold('lan', 'spoon'); st.pose('lan', 'stir'); st.act('lan', 'stir'); st.sfx('pot-stir');
    await st.wait(2000);
    st.act('lan', null); st.hold('lan', null); st.pose('lan', 'stand'); st.mood('lan', 'joy');
    await st.wait(300);
    st.mood('lan', 'happy');
  } },
  { key: ['puts the mix on rice paper and rolls it'], icon: '🌯', label: 'rolls it', async play(st) {
    st.look(470);
    st.pose('gma', 'give');
    await move(st, MIXF, [420, TOP - 24], [500, TOP - 14], 'st-filling', 600);
    st.pose('gma', 'e028_roll'); st.act('gma', 'stir');
    await st.wait(1300);
    st.set('st-boardroll'); st.fx('sparkle', 500, TOP - 16, { quiet: true });
    await st.wait(600);
    st.act('gma', null);
    await move(st, ROLL(), [500, TOP - 12], [566, TOP - 14], 'st-raw', 500);
    st.set('st-boardroll', false); st.set('st-filling', false); st.pose('gma', 'stand');
  } },
  { key: ['cooks the rolls in hot oil'], icon: '🍳', label: 'hot oil', async play(st) {
    await st.walk('gma', 964, { speed: 160, lead: -40 });
    await st.walk('gma', 960, { speed: 40, follow: false });
    st.hold('gma', 'chopsticks'); st.pose('gma', 'reach');
    st.set('st-raw', false);
    await st.fly(`${ROLL()}`, [566, TOP - 12], [876, CTOP - 12], { dur: 700 });
    st.set('st-wok'); st.set('st-lb-oil'); st.sfx('sizzle');
    await st.wait(600);
    st.set('st-golden');
    await st.wait(1700);
    await move(st, ROLL(GOLD), [876, CTOP - 14], [790, CTOP - 6], 'st-fried', 600);
    st.set('st-wok', false); st.set('st-lb-oil', false); st.hold('gma', null); st.pose('gma', 'stand');
  } },
  { key: ['Minh comes into the kitchen'], icon: '🚪', label: 'Minh comes in', async play(st) {
    await st.look(330, { dur: 900 });
    st.set('st-door'); st.sfx('door-open');
    st.show('minh', true);
    await st.wait(300);
    await st.walk('minh', 730, { speed: 140, lead: 60 });
    st.mood('minh', 'joy');
  } },
  { key: ['How many can I eat'], icon: '😋', label: 'how many?', async play(st) {
    st.set('st-door', false); st.mood('minh', 'happy');
    st.look(848, { dur: 600 });
    st.pose('minh', 'point');
    await st.say('minh', 'How many can I eat?', 2200);
    st.pose('minh', 'stand');
  } },
  { key: ['he asks'], icon: '🙋', label: 'he asks', async play(st) {
    st.set('st-lb-q2'); st.pose('minh', 'think'); st.mood('minh', 'wow');
    await st.wait(1300);
    st.set('st-lb-q2', false); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['Grandma laughs'], icon: '😆', label: 'laughs', async play(st) {
    st.pose('gma', 'clap'); st.act('gma', 'e028-laugh'); st.mood('gma', 'joy');
    await st.say('gma', 'Ha ha!', 1800);
    st.act('gma', null); st.pose('gma', 'stand');
  } },
  { key: ['Two now', 'more at dinner'], icon: '✌️', label: 'two now', async play(st) {
    st.chest('minh', SMALLPLATE(0)); st.pose('minh', 'carry');
    st.pose('gma', 'give');
    st.set('st-lb-two');
    await st.fly(`<g transform="scale(0.75)">${ROLL(GOLD)}</g>`, [782, CTOP - 8], [736, 196], { size: 22, dur: 500 });
    st.chest('minh', SMALLPLATE(1));
    await st.fly(`<g transform="scale(0.75)">${ROLL(GOLD)}</g>`, [794, CTOP - 8], [736, 196], { size: 22, dur: 500 });
    st.chest('minh', SMALLPLATE(2)); st.set('st-ate');
    st.mood('minh', 'joy'); st.pose('gma', 'pointUp');
    st.fx('hearts', 736, 150);
    await st.say('gma', 'More at dinner!', 1600);
    st.pose('gma', 'stand');
  } },
];

export default {
  id: 'en028', worldW: 1060, floor: FLOOR, viewTop: 40, camStart: 200, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  props: { e028_salt: SALT },
  cast: [
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 100 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 380, s: 1.08 },
    { id: 'gma', kind: 'adult', who: 'en_grandma', x: 520, s: 0.92, face: -1 },
  ],
  init(st) {
    st.show('minh', false);
  },
};
