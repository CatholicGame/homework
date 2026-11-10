/**
 * Bài 3 "My Dog Lucky": vườn (Lucky, chuồng chó, quả bóng đỏ) · phòng khách (Kitty trên ghế sofa) · phòng ăn
 * (Tom và bể cá) · phòng của Lan (sách về chó). Minh đi từ vườn vào nhà theo thứ tự câu.
 * Bộ phận cơ thể (tai, đuôi, chân, mũi, mắt) được khoanh vòng và gắn nhãn ở lớp trước; vị trí tính theo dáng của
 * Lucky / Kitty (rig.js dogSvg / catSvg) ở chỗ chúng đứng, nên nhịp trước phải để con vật đứng đúng chỗ, quay sang phải.
 * Toạ độ cảnh: rộng 1960, cao 315, sàn y = 282.
 */
import { KIT_CSS, L, cloud, tree, bush, flowerAt, sun, label, room, doorway, windowBox, shelf, books, rug } from '../kit.js';

const FLOOR = 282;
const W = 1960;

// Chỗ đứng (Lucky / Kitty đứng ở đây khi chỉ bộ phận)
const LX = 300, LS = 1.25;        // Lucky trong vườn
const KX = 930, KY = 238, KS = 1.5; // Kitty ngồi trên sofa
const TX = 1400;                  // Tom
const NX = 1740;                  // Lan
// Toạ độ bộ phận (dáng đứng của chó, dáng ngồi của mèo; đơn vị cảnh)
const dog = (dx, dy) => [LX + dx * LS, FLOOR + dy * LS];
const cat = (dx, dy) => [KX + dx * KS, KY + dy * KS];
const P = {
  ear: dog(23, -48), tail: dog(-40, -52), nose: dog(51, -50.4), legs: [-31, -12, 9, 28].map((x) => LX + x * LS),
  eye: cat(21, -48), cnose: cat(28.4, -44.6), ctail: cat(-28, -26),
};

// ── Thẻ nổi (st-t-<tên>) ──────────────────────────────────────────────────
const POPS = ['dog', 'lucky', 'brown', 'ears', 'tail', 'legs', 'nose', 'ball', 'happy', 'cat', 'kitty', 'white', 'eyes', 'pink',
  'ctail', 'fish', 'orange', 'book', 'pet'];
const pop = (name, x, y, inner) => `<g transform="translate(${x} ${y})"><g class="e003-pop e003-p-${name}">${inner}</g></g>`;
const card = (w, h, inner, fill = '#fff') => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${L}" stroke-width="1.6"/>${inner}`;
const txt = (x, y, t, size = 18, c = '#1D4ED8') => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="${size}" fill="${c}">${t}</text>`;
const swatch = (c, name, tc = '#1F2937') => `<rect x="-70" y="-24" width="140" height="48" rx="24" fill="#fff" stroke="${L}" stroke-width="1.6"/>
  <circle cx="-44" cy="0" r="15" fill="${c}" stroke="${L}" stroke-width="1.4"/>${txt(16, 8, name, 22, tc)}`;
const ring = ([x, y], r, c = '#F97316') => `<circle class="e003-ring" cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c}" stroke-width="3" stroke-dasharray="6 4"/>`;
/** Nhãn ở (lx, ly) có mũi tên chỉ tới điểm p. */
const callout = (name, [lx, ly], p, text, c) => {
  const [px, py] = p, dx = px - lx, dy = py - ly, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
  const sx = lx + ux * 22, sy = ly + uy * 16, ex = px - ux * 12, ey = py - uy * 12;
  return pop(name, 0, 0, `<path d="M${sx.toFixed(1)} ${sy.toFixed(1)} L${ex.toFixed(1)} ${ey.toFixed(1)}" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="3.4" fill="${c}"/>${label(lx, ly + 6, text, c, 18)}`);
};

const RED_BALL = `<circle r="9" fill="#EF4444" stroke="${L}"/><path d="M-9 0 Q0 -5 9 0 M0 -9 Q-4 0 0 9" stroke="#fff" stroke-width="1.6" fill="none"/>`;
const FISH = `<path d="M-12 0 Q-2 -10 10 0 Q-2 10 -12 0Z" fill="#FB923C" stroke="${L}" stroke-width="1"/><path d="M-12 0 L-20 -7 L-19 7Z" fill="#F97316" stroke="${L}" stroke-width="1"/>
  <circle cx="4" cy="-2" r="1.6" fill="#1F2937"/><path d="M-4 -6 Q-2 -12 2 -8" fill="#FDBA74" stroke="${L}" stroke-width="0.6"/>`;
const dogHeadIcon = `<circle r="13" fill="#B7794A" stroke="${L}"/><path d="M-12 -6 Q-22 2 -16 14 Q-10 10 -9 -2Z M12 -6 Q22 2 16 14 Q10 10 9 -2Z" fill="#7A4B2A" stroke="${L}" stroke-width="0.8"/>
  <ellipse cx="0" cy="5" rx="7" ry="5" fill="#F5E6D3"/><ellipse cx="0" cy="2.6" rx="2.8" ry="2" fill="#2B1D16"/><circle cx="-5" cy="-3" r="1.8" fill="#2B1D16"/><circle cx="5" cy="-3" r="1.8" fill="#2B1D16"/>`;
const catHeadIcon = `<path d="M-11 -6 L-10 -18 L-2 -10Z M11 -6 L10 -18 L2 -10Z" fill="#fff" stroke="${L}" stroke-width="0.8"/><circle r="11" fill="#fff" stroke="${L}"/>
  <ellipse cx="-4.4" cy="-2" rx="2" ry="2.6" fill="#22C55E"/><ellipse cx="4.4" cy="-2" rx="2" ry="2.6" fill="#22C55E"/><path d="M-1.6 2.4 h3.2 l-1.6 1.8Z" fill="#F9A8D4"/>`;
/** Sách về chó (trước ngực Lan): trang mở có hình chó. */
const DOGBOOK = `<g transform="translate(0 -25) rotate(-4)"><rect x="-19" y="-13" width="38" height="26" rx="2" fill="#F59E0B" stroke="${L}" stroke-width="1"/>
  <rect x="-17" y="-11" width="34" height="22" fill="#fff" stroke="${L}" stroke-width="0.6"/><path d="M0 -11 V11" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(-8.5 1) scale(0.45)">${dogHeadIcon}</g><path d="M3 -5 H14 M3 -1 H14 M3 3 H11" stroke="#94A3B8" stroke-width="0.9"/>
  <g class="pp-page" style="transform-origin:0 0"><path d="M0 -11 H16 V11 H0Z" fill="#F8FAFC" stroke="${L}" stroke-width="0.6"/></g></g>`;

function bg() {
  return `
  <defs><linearGradient id="e003sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#60C5F5"/><stop offset="1" stop-color="#DFF3FD"/></linearGradient></defs>
  <!-- Vườn -->
  <rect x="0" y="0" width="660" height="315" fill="url(#e003sky)"/>
  <g transform="translate(560 78)">${sun(24)}</g>${cloud(120, 66, 1, 0)}${cloud(420, 50, 0.8, 4)}
  <path d="M0 230 Q160 200 330 226 T660 220 V${FLOOR} H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(470, FLOOR - 16, 1.05)}
  <g>${Array.from({ length: 24 }, (_, i) => `<rect x="${i * 26 + 4}" y="${FLOOR - 52}" width="8" height="32" rx="3" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/>`).join('')}<rect x="0" y="${FLOOR - 44}" width="640" height="6" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/></g>
  <rect x="0" y="${FLOOR - 22}" width="660" height="${337 - FLOOR}" fill="#86EFAC" stroke="${L}"/>
  ${Array.from({ length: 13 }, (_, i) => `<path d="M${20 + i * 50} ${FLOOR + 10} l3 -7 l3 7 M${42 + i * 50} ${FLOOR + 22} l3 -7 l3 7" stroke="#16A34A" stroke-width="1.4" fill="none"/>`).join('')}
  <!-- chuồng chó -->
  <g transform="translate(70 ${FLOOR - 2})"><path d="M-46 0 V-56 L0 -92 L46 -56 V0Z" fill="#F87171" stroke="${L}" stroke-width="1.2"/><path d="M-54 -52 L0 -98 L54 -52" stroke="#B91C1C" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M-20 0 V-30 Q0 -52 20 -30 V0Z" fill="#7F1D1D" stroke="${L}"/><rect x="-24" y="-74" width="48" height="16" rx="4" fill="#fff" stroke="${L}"/>${txt(0, -61, 'LUCKY', 12, '#B45309')}</g>
  ${flowerAt(170, FLOOR - 14)}${flowerAt(186, FLOOR - 12, '#FDE047')}${flowerAt(560, FLOOR - 14, '#A78BFA')}${bush(620, FLOOR - 14, 0.9)}
  <!-- Phòng khách -->
  ${room(660, 460, FLOOR, '#FCE7F3')}
  ${windowBox(700, 70, 100, 90)}
  <g>${Array.from({ length: 10 }, (_, i) => `<circle cx="${840 + (i * 61) % 260}" cy="${40 + (i * 37) % 70}" r="3" fill="#F9A8D4"/>`).join('')}</g>
  ${shelf(1000, 120, 100, books(1010, 120, 6))}
  <!-- sofa -->
  <g transform="translate(${KX} 0)"><rect x="-86" y="166" width="172" height="58" rx="18" fill="#60A5FA" stroke="${L}" stroke-width="1.2"/>
    <rect x="-80" y="220" width="160" height="30" rx="8" fill="#3B82F6" stroke="${L}"/>
    <rect x="-98" y="196" width="26" height="60" rx="10" fill="#60A5FA" stroke="${L}"/><rect x="72" y="196" width="26" height="60" rx="10" fill="#60A5FA" stroke="${L}"/>
    <path d="M-80 250 V${FLOOR} M80 250 V${FLOOR}" stroke="#78350F" stroke-width="6"/></g>
  ${rug(KX - 140, FLOOR, 120, '#FDE68A')}
  <!-- Phòng ăn -->
  ${room(1120, 400, FLOOR, '#ECFCCB')}
  ${windowBox(1170, 66, 110, 92)}
  <rect x="1330" y="72" width="70" height="56" rx="4" fill="#fff" stroke="${L}"/><g transform="translate(1365 100)">${FISH}</g>
  <!-- Phòng của Lan -->
  ${room(1520, 440, FLOOR, '#EDE9FE')}
  <g transform="translate(1620 70)"><rect x="-40" y="0" width="80" height="60" rx="4" fill="#FEF3C7" stroke="${L}"/><g transform="translate(0 30) scale(1.3)">${dogHeadIcon}</g></g>
  ${shelf(1820, 110, 110, books(1828, 110, 8))}${shelf(1820, 160, 110, books(1834, 160, 6))}
  <g transform="translate(${NX + 130} 0)"><rect x="-70" y="214" width="140" height="44" rx="6" fill="#fff" stroke="${L}"/><rect x="-70" y="230" width="140" height="28" fill="#C4B5FD" stroke="${L}"/>
    <rect x="58" y="176" width="16" height="106" rx="3" fill="#A16207" stroke="${L}"/><rect x="-60" y="200" width="40" height="20" rx="8" fill="#fff" stroke="${L}"/><path d="M-66 258 V${FLOOR} M66 258 V${FLOOR}" stroke="#78350F" stroke-width="5"/></g>
  ${doorway(1120, FLOOR)}${doorway(1520, FLOOR)}
  <rect x="648" y="0" width="22" height="104" fill="#E9D5B5" stroke="${L}"/><rect x="648" y="104" width="6" height="178" fill="#C08B5C" stroke="${L}" stroke-width="0.8"/>`;
}

/** Lớp trước: bàn ăn + bể cá của Tom, các thẻ / nhãn / vòng chỉ. */
function fg() {
  const bowl = `<g transform="translate(1330 0)"><path d="M-30 168 Q-46 196 -30 222 H30 Q46 196 30 168Z" fill="#BAE6FD" fill-opacity="0.8" stroke="${L}" stroke-width="1.2"/>
    <path d="M-34 180 H34" stroke="#7DD3FC" stroke-width="2"/><path d="M-30 168 H30" stroke="${L}" stroke-width="1.4"/>
    <path d="M-18 222 q2 -12 -2 -20 M14 222 q-3 -10 2 -18" stroke="#16A34A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g transform="translate(0 198)"><g class="e003-swim"><g class="e003-fishjump">${FISH}</g></g></g></g>`;
  const table = `<rect x="1290" y="232" width="10" height="50" fill="#92400E" stroke="${L}"/><rect x="1430" y="232" width="10" height="50" fill="#92400E" stroke="${L}"/>
    <rect x="1276" y="222" width="178" height="12" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>`;
  const pets = card(176, 86, `${txt(0, -20, '?', 26, '#DB2777')}<g transform="translate(-54 16)">${dogHeadIcon}</g><g transform="translate(0 18)">${catHeadIcon}</g><g transform="translate(54 18) scale(1.3)">${FISH}</g>`);
  return `
  ${table}${bowl}
  ${pop('dog', LX - 10, 150, label(0, 0, 'a dog', '#B45309', 22))}
  ${pop('lucky', LX + 20, 170, label(0, 0, 'Lucky', '#B45309', 22))}
  ${pop('brown', LX + 20, 166, swatch('#B7794A', 'brown', '#92400E'))}
  ${ring(P.ear, 14).replace('class="e003-ring"', 'class="e003-ring e003-pop e003-p-ears"')}
  ${callout('ears', [LX + 30, 150], P.ear, 'big ears', '#EA580C')}
  ${ring(P.tail, 18).replace('class="e003-ring"', 'class="e003-ring e003-pop e003-p-tail"')}
  ${callout('tail', [LX - 76, 138], P.tail, 'long tail', '#DB2777')}
  ${pop('legs', 0, 0, P.legs.map((x, i) => `<circle cx="${x}" cy="${FLOOR + 14}" r="9" fill="#fff" stroke="${L}"/>${txt(x, FLOOR + 20, i + 1, 14, '#2563EB')}`).join(''))}
  ${pop('legs', LX - 10, 172, label(0, 0, 'four short legs', '#2563EB', 18))}
  ${ring(P.nose, 9, '#1F2937').replace('class="e003-ring"', 'class="e003-ring e003-pop e003-p-nose"')}
  ${callout('nose', [LX + 84, 156], P.nose, 'black nose', '#1F2937')}
  ${pop('ball', 0, 0, `<g transform="translate(${dog(60, -42).join(' ')}) scale(1.1)">${RED_BALL}</g>`)}
  ${pop('ball', LX + 20, 166, label(0, 0, 'a red ball', '#DC2626', 20))}
  ${pop('happy', LX + 20, 166, label(0, 0, 'happy!', '#16A34A', 22))}
  ${pop('cat', KX, 104, label(0, 0, 'a cat', '#7C3AED', 22))}
  ${pop('kitty', KX + 10, 104, label(0, 0, 'Kitty', '#7C3AED', 22))}
  ${pop('white', KX + 10, 104, swatch('#FFFFFF', 'white', '#475569'))}
  ${ring(P.eye, 9, '#16A34A').replace('class="e003-ring"', 'class="e003-ring e003-pop e003-p-eyes"')}
  ${callout('eyes', [KX - 40, 96], P.eye, 'green eyes', '#16A34A')}
  ${ring(P.cnose, 7, '#DB2777').replace('class="e003-ring"', 'class="e003-ring e003-pop e003-p-pink"')}
  ${callout('pink', [KX + 50, 106], P.cnose, 'small pink nose', '#DB2777')}
  ${ring(P.ctail, 18).replace('class="e003-ring"', 'class="e003-ring e003-pop e003-p-ctail"')}
  ${callout('ctail', [KX - 110, 132], P.ctail, 'long tail', '#DB2777')}
  ${pop('fish', 1330, 140, label(0, 0, 'a fish', '#EA580C', 22))}
  ${pop('fish', 1330, 196, `<circle class="e003-ring" r="38" fill="none" stroke="#F97316" stroke-width="3" stroke-dasharray="7 5"/>`)}
  ${pop('orange', 1330, 140, swatch('#FB923C', 'orange', '#EA580C'))}
  ${pop('book', NX - 98, 106, card(132, 92, `<rect x="-56" y="-34" width="112" height="56" rx="3" fill="#FEF3C7" stroke="${L}"/><path d="M0 -34 V22" stroke="${L}"/>
    <g transform="translate(-28 -6)">${dogHeadIcon}</g><g transform="translate(28 -6) scale(0.9)">${dogHeadIcon}</g>${txt(0, 40, 'about dogs', 15, '#B45309')}`))}
  ${pop('pet', NX - 120, 102, pets)}`;
}

const CSS = `
.e003-pop { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .5s cubic-bezier(.3,1.6,.5,1); }
${POPS.map((n) => `.st-t-${n} .e003-p-${n}`).join(', ')} { opacity: 1; transform: none; }
circle.e003-ring { transform-box: fill-box; transform-origin: center; }
.e003-ring { animation: e003Pulse .7s ease-in-out infinite alternate; }
.e003-pop.e003-ring { animation: none; }
${POPS.map((n) => `.st-t-${n} .e003-ring.e003-p-${n}`).join(', ')} { animation: e003Pulse .7s ease-in-out infinite alternate; }
@keyframes e003Pulse { from { transform: scale(.92); opacity: 1; } to { transform: scale(1.1); opacity: 1; } }
.e003-swim { animation: e003Swim 3s ease-in-out infinite alternate; }
@keyframes e003Swim { from { transform: translateX(-12px); } to { transform: translateX(12px); } }
.e003-fishjump { transform-box: fill-box; transform-origin: center; }
.st-fishjump .e003-fishjump { animation: e003Jump .5s ease-in-out infinite alternate; }
@keyframes e003Jump { from { transform: translateY(0) rotate(0); } to { transform: translateY(-10px) rotate(-12deg); } }
.e003-gball { transition: opacity .2s; } .st-ballGone .e003-gball { opacity: 0; }
@media (prefers-reduced-motion: reduce) { .e003-ring, .e003-swim { animation-duration: 2s; } }
`;

function tag(st, ...names) {
  for (const k of [...st.state]) if (k.startsWith('st-t-')) st.set(k, false);
  names.forEach((n) => st.set(`st-t-${n}`));
}
const rest = (st, ...ids) => ids.forEach((id) => { st.act(id, null); st.pose(id, 'stand'); st.mood(id, 'happy'); });

const BEATS = [
  { key: ['have got a dog'], icon: '🐶', label: 'a dog', async play(st) {
    tag(st);
    st.dog('lucky', 'stand'); st.sfx('dog-bark');
    st.look(290, { dur: 1200 });
    await st.walk('lucky', LX, { speed: 170, follow: false });
    tag(st, 'dog');
    st.act('lucky', 'jump'); st.mood('lucky', 'joy');
    st.pose('minh', 'open'); st.mood('minh', 'joy');
    await st.wait(1000);
    st.act('lucky', null); rest(st, 'minh');
  } },
  { key: ['Lucky'], icon: '🏷️', label: 'Lucky', async play(st) {
    tag(st, 'lucky');
    st.pose('minh', 'point'); st.act('minh', 'point');
    st.act('lucky', 'wag'); st.mood('lucky', 'joy');
    st.fx('sparkle', LX + 20, 170);
    await st.wait(1600);
    st.act('lucky', null); rest(st, 'minh');
  } },
  { key: ['He is brown'], icon: '🟫', label: 'brown', async play(st) {
    tag(st, 'brown');
    st.fx('sparkle', LX, 220);
    st.act('lucky', 'wag');
    await st.wait(1600);
    st.act('lucky', null);
  } },
  { key: ['big ears', 'a long tail'], icon: '👂', label: 'ears, tail', async play(st) {
    tag(st, 'ears');
    st.mood('lucky', 'joy');
    await st.wait(2000);
    tag(st, 'tail');
    st.act('lucky', 'wag');
    await st.wait(1500);
    st.act('lucky', null);
  } },
  { key: ['four short legs', 'a black nose'], icon: '🐾', label: 'legs, nose', async play(st) {
    tag(st, 'legs');
    await st.wait(2300);
    tag(st, 'nose');
    st.mood('lucky', 'joy');
    await st.wait(1500);
  } },
  { key: ['a red ball'], icon: '🔴', label: 'red ball', async play(st) {
    tag(st);
    st.hold('minh', 'e003_ball'); st.pose('minh', 'throw');
    await st.wait(500);
    st.hold('minh', null); st.pose('minh', 'stand');
    await st.fly(RED_BALL, [LX - 130, 150], [LX + 50, 230], { size: 22, dur: 700 });
    tag(st, 'ball');
    st.act('lucky', 'wag'); st.mood('lucky', 'happy');
    await st.wait(1000);
    st.act('lucky', null);
  } },
  { key: ['He is happy!'], icon: '😊', label: 'happy', async play(st) {
    tag(st, 'happy');
    st.act('lucky', 'jump'); st.mood('lucky', 'joy');
    st.pose('minh', 'clap'); st.act('minh', 'clap'); st.mood('minh', 'joy');
    st.fx('hearts', LX + 20, 200);
    await st.wait(1800);
    st.act('lucky', 'wag'); rest(st, 'minh');
  } },
  { key: ['have got a cat, too'], icon: '🐱', label: 'a cat', async play(st) {
    tag(st);
    st.act('lucky', null);
    await st.walk('minh', 812, { speed: 225, lead: 70 });
    tag(st, 'cat');
    st.pose('minh', 'point'); st.mood('kitty', 'joy'); st.act('kitty', 'wag');
    await st.wait(900);
    rest(st, 'minh'); st.act('kitty', null);
  } },
  { key: ['She is Kitty'], icon: '🏷️', label: 'Kitty', async play(st) {
    tag(st, 'kitty');
    st.act('kitty', 'jump'); st.mood('kitty', 'joy');
    st.fx('sparkle', KX + 10, 110);
    await st.wait(1500);
    st.act('kitty', null); st.mood('kitty', 'happy');
  } },
  { key: ['She is white'], icon: '⬜', label: 'white', async play(st) {
    tag(st, 'white');
    st.fx('sparkle', KX + 20, 180);
    await st.wait(1600);
  } },
  { key: ['green eyes', 'a small pink nose'], icon: '👀', label: 'eyes, nose', async play(st) {
    tag(st, 'eyes');
    await st.wait(2200);
    tag(st, 'pink');
    st.mood('kitty', 'joy');
    await st.wait(1600);
    st.mood('kitty', 'happy');
  } },
  { key: ['a long tail, too'], icon: '🐈', label: 'long tail', async play(st) {
    tag(st, 'ctail');
    st.act('kitty', 'wag');
    await st.wait(2400);
    st.act('kitty', null);
  } },
  { key: ['Tom has got a fish'], icon: '🐟', label: 'a fish', async play(st) {
    tag(st);
    await st.walk('minh', 1222, { speed: 185, lead: 110 });
    tag(st, 'fish');
    st.pose('tom', 'point'); st.mood('tom', 'joy');
    st.pose('minh', 'wave'); st.act('minh', 'wave');
    await st.wait(1000);
    rest(st, 'tom', 'minh');
  } },
  { key: ['It is orange'], icon: '🟧', label: 'orange', async play(st) {
    tag(st, 'orange');
    st.set('st-fishjump');
    st.fx('sparkle', 1330, 196);
    await st.wait(1600);
    st.set('st-fishjump', false);
  } },
  { key: ['a book about dogs'], icon: '📖', label: 'book', async play(st) {
    tag(st);
    await st.walk('minh', 1590, { speed: 185, lead: 80 });
    tag(st, 'book');
    st.act('lan', 'read'); st.mood('lan', 'joy'); st.sfx('page-turn');
    await st.wait(1600);
    st.act('lan', null); st.mood('lan', 'happy');
  } },
  { key: ['Have you got a pet?'], icon: '❓', label: 'a pet?', async play(st) {
    tag(st, 'pet');
    st.pose('minh', 'open'); st.mood('minh', 'joy');
    st.pose('lan', 'e003_readWave'); st.act('lan', 'wave');
    st.fx('sparkle', NX - 120, 102);
    await st.wait(2200);
    rest(st, 'minh'); st.act('lan', null); st.pose('lan', 'e003_read');
  } },
];

export default {
  id: 'en003', worldW: W, floor: FLOOR, viewTop: 40, camStart: 40, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  cast: [
    { id: 'lucky', kind: 'dog', x: 64, s: LS },
    { id: 'kitty', kind: 'cat', x: KX, y: KY, s: KS },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: TX },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: NX, s: 1.08 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 196 },
  ],
  poses: { e003_read: { R: [30, 196], L: [30, 196], head: 7 }, e003_readWave: { R: [128, 175], L: [30, 196], head: 4 } },
  props: {
    e003_ball: `<g transform="translate(0 8)"><circle r="8" fill="#EF4444" stroke="${L}"/><path d="M-8 0 Q0 -4 8 0" stroke="#fff" stroke-width="1.4" fill="none"/></g>`,
  },
  init(st) {
    st.dog('lucky', 'sit'); st.dog('kitty', 'sit');
    st.pose('lan', 'e003_read'); st.chest('lan', DOGBOOK);
  },
};
