/**
 * Bài 123 "The Buffalo Boy and the Reed Flags" (when + quá khứ; could / could not). Một thế giới đi từ trái sang phải,
 * cả cảnh nhuộm màu ảnh cũ: làng nghèo gần Hoa Lư (núi đá vôi, túp lều tranh) → bãi cỏ chăn trâu (bãi lau trắng, đoạn
 * "An old story says" có khung truyện cổ) → đồi của mười hai sứ quân (12 lá cờ đủ màu đánh nhau) → kinh đô Hoa Lư (cổng
 * thành, băng chữ "DAI CO VIET").
 * Cờ lau là bông lau trắng trên que (cầm tay giơ cao). Dẹp loạn diễn tượng trưng: cờ sứ quân rơi từng lá, cờ đỏ cắm lên.
 * Toạ độ cảnh: rộng 3000, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, speaker, sun, flowerAt } from '../kit.js';
import { karst, bamboo, paddy, crown } from './vietsu-art.js';

const FLOOR = 282;
const W = 3000;
const X = { hut: 140, reeds: 1260, hill0: 1560, palace: 2640 };
const WARL = Array.from({ length: 12 }, (_, i) => [1540 + i * 62, 150 + (i % 3) * 18 + (i % 2) * 8]);
const WCOL = ['#2563EB', '#16A34A', '#7C3AED', '#0891B2', '#CA8A04', '#DB2777', '#4B5563', '#EA580C', '#0D9488', '#9333EA', '#65A30D', '#1E40AF'];
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e123_boy: { hair: 'bowl', top: 'tee', shirt: '#A16207', bottom: 'shorts', bottomC: '#57534E', shoe: '#78716C' },
  e123_b1: { hair: 'spiky', top: 'tee', shirt: '#8B5E3C', bottom: 'shorts', bottomC: '#3F3A36', shoe: '#78716C' },
  e123_b2: { hair: 'bowl', top: 'tee', shirt: '#4338CA', bottom: 'shorts', bottomC: '#44403C', shoe: '#78716C' },
  e123_b3: { hair: 'neat', top: 'tee', shirt: '#9A3412', bottom: 'shorts', bottomC: '#57534E', shoe: '#78716C' },
  e123_dbl: { adult: true, hair: 'short', top: 'robe', shirt: '#B45309', trimC: '#DC2626', bottom: 'pants', bottomC: '#78350F', shoe: '#44403C', hat: 'scarf', trim: ['#DC2626', '#FACC15', '#FDE68A'], moustache: true },
  e123_s1: { adult: true, hair: 'short', top: 'blouse', shirt: '#8B5E3C', bottom: 'pants', bottomC: '#292524', shoe: '#57534E', hat: 'scarf', trim: ['#DC2626', '#FDE68A', '#FDE68A'] },
  e123_s2: { adult: true, hair: 'short', top: 'blouse', shirt: '#6B4423', bottom: 'pants', bottomC: '#1C1917', shoe: '#57534E', hat: 'scarf', trim: ['#DC2626', '#FDE68A', '#FDE68A'], moustache: true },
  e123_v1: { adult: true, hair: 'bun', top: 'blouse', shirt: '#A47551', bottom: 'pants', bottomC: '#292524', shoe: '#57534E', hat: 'conical' },
  e123_v2: { adult: true, old: true, hair: 'short', hairC: '#E7E5E4', top: 'blouse', shirt: '#8B7355', bottom: 'pants', bottomC: '#3F3A36', shoe: '#57534E', beard: true },
  e123_v3: { hair: 'pigtails', top: 'tee', shirt: '#F472B6', bottom: 'shorts', bottomC: '#57534E', shoe: '#78716C' },
});

/** Cờ lau: que tre, bông lau trắng ở đầu (gốc = bàn tay, kéo dài theo hướng cẳng tay). */
const REED = `<g><path d="M0 -8 V64" stroke="${L}" stroke-width="3.2" stroke-linecap="round"/><path d="M0 -8 V64" stroke="#A3A35A" stroke-width="1.8"/>
  <g class="e123-plume" style="transform-origin:0px 60px"><path d="M0 58 Q-12 74 -6 96 Q2 84 4 100 Q8 80 14 92 Q12 72 0 58Z" fill="#F8FAFC" stroke="${L}" stroke-width="0.8"/>
  <path d="M0 62 Q-2 78 2 94" stroke="#E2E8F0" stroke-width="1" fill="none"/></g></g>`;
const PROPS = {
  e123_reed: REED,
  e123_rope: `<path d="M0 0 Q-10 12 -26 8" stroke="#A16207" stroke-width="1.8" fill="none"/>`,
  e123_banner: `<g><path d="M0 -8 V70" stroke="${L}" stroke-width="3.6" stroke-linecap="round"/><path d="M0 -8 V70" stroke="#A16207" stroke-width="2"/>
    <g class="e123-plume" style="transform-origin:0px 66px"><path d="M1 70 L36 67 L29 57 L36 47 L1 44Z" fill="#DC2626" stroke="${L}" stroke-width="0.9"/><path d="M2 64 L30 62" stroke="#FACC15" stroke-width="1.6"/></g></g>`,
};
const POSES = {
  e123_flag: { R: [150, 172], L: [10, 4] },
  e123_lead: { R: [150, 172], L: [60, 30] },
  e123_rope: { R: [40, 30], L: [10, 4] },
  e123_play: { R: [120, 150], L: [60, 90] },
};

// ── Trâu (gốc = giữa chân, nhìn sang phải) ──────────────────────────────────────────────
const BU = '#57534E', BUD = '#44403C';
const buLeg = (x, far, cls) => `<g class="${cls}" style="transform-origin:${x}px -40px"><rect x="${x - 6}" y="-44" width="12" height="44" rx="4" fill="${far ? BUD : BU}" stroke="${L}"/><rect x="${x - 7}" y="-6" width="14" height="6" rx="2" fill="#1C1917"/></g>`;
const BUFFALO = `<g>
  ${buLeg(-44, true, 'e123-lB')}${buLeg(34, true, 'e123-lA')}
  <g class="e123-tail" style="transform-origin:-70px -70px"><path d="M-70 -70 Q-84 -50 -80 -30" stroke="${L}" stroke-width="3" fill="none"/><path d="M-82 -34 l2 10 l4 -9Z" fill="#1C1917"/></g>
  <path d="M-74 -78 Q-76 -104 -40 -106 L40 -104 Q66 -100 70 -74 Q66 -46 40 -44 H-46 Q-72 -48 -74 -78Z" fill="${BU}" stroke="${L}" stroke-width="1.3"/>
  ${buLeg(-30, false, 'e123-lA')}${buLeg(48, false, 'e123-lB')}
  <g class="e123-head" style="transform-origin:66px -88px">
    <path d="M60 -96 Q74 -110 92 -100 Q104 -88 104 -70 Q102 -56 90 -56 Q74 -58 66 -72Z" fill="${BU}" stroke="${L}" stroke-width="1.3"/>
    <path d="M70 -102 Q50 -128 72 -136 Q62 -122 80 -106Z" fill="#E7E5E4" stroke="${L}" stroke-width="1"/><path d="M84 -104 Q104 -128 122 -116 Q106 -114 92 -100Z" fill="#E7E5E4" stroke="${L}" stroke-width="1"/>
    <ellipse cx="96" cy="-62" rx="9" ry="7" fill="#78716C" stroke="${L}" stroke-width="0.8"/><circle cx="93" cy="-63" r="1.2" fill="#1C1917"/><circle cx="99" cy="-63" r="1.2" fill="#1C1917"/>
    <circle cx="88" cy="-86" r="2.6" fill="#1C1917"/><circle cx="89" cy="-87" r="0.8" fill="#fff"/>
    <path d="M62 -94 Q52 -96 50 -88 Q56 -86 62 -88Z" fill="${BUD}" stroke="${L}" stroke-width="0.8"/></g></g>`;

// ── Cảnh ──────────────────────────────────────────────────────────────────
const hut = (x, s = 1) => `<g transform="translate(${x} ${FLOOR}) scale(${s})"><rect x="-56" y="-62" width="112" height="62" fill="#C8A27A" stroke="${L}" stroke-width="1.1"/>
  ${Array.from({ length: 7 }, (_, i) => `<path d="M${-50 + i * 16} -60 V-2" stroke="#A47E58" stroke-width="1" opacity="0.7"/>`).join('')}
  <rect x="-14" y="-44" width="28" height="44" fill="#5B3A1E" stroke="${L}"/>
  <path d="M-74 -56 Q-60 -100 0 -116 Q60 -100 74 -56 Q0 -66 -74 -56Z" fill="#C08A3E" stroke="${L}" stroke-width="1.2"/>
  ${Array.from({ length: 8 }, (_, i) => `<path d="M${-62 + i * 18} -58 L${-30 + i * 9} -104" stroke="#A16207" stroke-width="1" opacity="0.6"/>`).join('')}
  <path d="M-34 -98 l6 6 M20 -104 l7 4" stroke="#7C5A3A" stroke-width="2"/></g>`;
const reedClump = (x, s = 1) => `<g transform="translate(${x} ${FLOOR}) scale(${s})">${[-30, -18, -8, 2, 12, 22, 32].map((dx, i) => `<g transform="rotate(${(i - 3) * 5} ${dx} 0)"><path d="M${dx} 0 V${-90 - (i % 3) * 16}" stroke="#A3A35A" stroke-width="2"/>
  <g class="e123-plume" style="animation-delay:${i * 0.2}s;transform-origin:${dx}px ${-90 - (i % 3) * 16}px"><path d="M${dx} ${-86 - (i % 3) * 16} Q${dx - 10} ${-104 - (i % 3) * 16} ${dx - 2} ${-122 - (i % 3) * 16} Q${dx + 4} ${-108 - (i % 3) * 16} ${dx + 10} ${-118 - (i % 3) * 16} Q${dx + 8} ${-100 - (i % 3) * 16} ${dx} ${-86 - (i % 3) * 16}Z" fill="#F8FAFC" stroke="${L}" stroke-width="0.7"/></g></g>`).join('')}
  ${[-24, 0, 24].map((dx) => `<path d="M${dx} 0 Q${dx - 14} -30 ${dx - 22} -44 M${dx} 0 Q${dx + 14} -30 ${dx + 22} -44" stroke="#65A30D" stroke-width="2.4" fill="none"/>`).join('')}</g>`;
const warlord = ([x, y], i) => `<g transform="translate(${x} ${y})"><path d="M-16 0 V-14 ${[0, 1, 2, 3].map((j) => `H${-16 + j * 8 + 4} V-18 H${-16 + j * 8 + 8} V-14`).join(' ')} V0Z" fill="#A47E58" stroke="${L}" stroke-width="0.8"/>
  <path d="M0 -14 V-60" stroke="#57534E" stroke-width="2"/>
  <g class="e123-w e123-w${i}"><g class="e123-wf" style="animation-delay:${(i % 4) * 0.25}s;transform-origin:0px -52px"><path d="M1 -60 H24 L19 -52 L24 -44 H1Z" fill="${WCOL[i]}" stroke="${L}" stroke-width="0.7"/></g></g>
  <g class="e123-r e123-r${i}"><g class="e123-wf" style="transform-origin:0px -52px"><path d="M1 -60 H26 L20 -51 L26 -42 H1Z" fill="#DC2626" stroke="${L}" stroke-width="0.7"/><path d="M1 -56 H22" stroke="#FACC15" stroke-width="1.4"/></g></g></g>`;

function bg() {
  return `
  ${sky(0, W, 315, 'e123sky')}
  <g class="e123-sun" transform="translate(2700 70)">${sun(24)}</g>
  ${cloud(240, 60, 0.8, 0)}${cloud(900, 50, 0.9, 2)}${cloud(1500, 64, 0.8, 4)}${cloud(2200, 48, 0.9, 1)}${cloud(2800, 60, 0.8, 3)}
  ${karst(-30, 1500, FLOOR - 30)}${karst(2250, 780, FLOOR - 30, '#7FA593', '#9BBFAE')}
  <!-- đồi của mười hai sứ quân -->
  <path d="M1460 ${FLOOR} Q1520 150 1640 160 Q1760 130 1860 170 Q1960 140 2080 166 Q2180 150 2260 ${FLOOR}Z" fill="#9CB87A" stroke="${L}" stroke-width="1"/>
  ${WARL.map(warlord).join('')}
  <g class="e123-gloom">${[[1700, 70], [1980, 60], [1300, 66], [1100, 50]].map(([x, y]) => `<g transform="translate(${x} ${y})"><ellipse rx="70" ry="22" fill="#64748B" opacity="0.75"/><ellipse cx="-36" cy="-12" rx="34" ry="18" fill="#64748B" opacity="0.75"/><ellipse cx="30" cy="-14" rx="40" ry="20" fill="#64748B" opacity="0.75"/></g>`).join('')}</g>
  <!-- đất, làng, bãi cỏ -->
  <rect x="0" y="${FLOOR}" width="${W}" height="33" fill="#B9A06A" stroke="${L}"/>
  <rect x="660" y="${FLOOR}" width="780" height="33" fill="#86C26A" stroke="${L}"/>
  ${paddy(320, 300, FLOOR - 14, 16)}
  ${bamboo(40, FLOOR, 0.8)}${hut(X.hut)}${tree(620, FLOOR, 0.85, '')}
  <path d="M700 ${FLOOR + 14} Q900 ${FLOOR + 4} 1100 ${FLOOR + 16} T1440 ${FLOOR + 12}" stroke="#7DD3FC" stroke-width="7" fill="none" opacity="0.8"/>
  ${reedClump(X.reeds, 1.1)}${reedClump(1370, 0.9)}${reedClump(760, 0.8)}
  <!-- kinh đô Hoa Lư -->
  ${bamboo(2300, FLOOR, 0.8)}
  <g transform="translate(${X.palace} ${FLOOR})">
    <rect x="-230" y="-80" width="460" height="80" fill="#C8A27A" stroke="${L}" stroke-width="1.2"/>
    ${Array.from({ length: 9 }, (_, i) => `<path d="M${-220 + i * 52} -50 h26 M${-200 + i * 52} -22 h24" stroke="#A47E58" stroke-width="1.4"/>`).join('')}
    <rect x="-80" y="-170" width="160" height="170" fill="#E2B872" stroke="${L}" stroke-width="1.2"/>
    <path d="M-104 -170 L-76 -204 H76 L104 -170Z" fill="#9A3412" stroke="${L}" stroke-width="1.2"/><path d="M-76 -204 Q-88 -220 -98 -214 M76 -204 Q88 -220 98 -214" stroke="${L}" stroke-width="2.6" fill="none"/>
    <path d="M-90 -120 L-66 -142 H66 L90 -120Z" fill="#B45309" stroke="${L}" stroke-width="1.1"/>
    <path d="M-40 0 V-70 Q0 -104 40 -70 V0Z" fill="#5B3A1E" stroke="${L}" stroke-width="1.2"/><path d="M0 -94 V0" stroke="${L}"/>
    <g class="e123-hl"><rect x="108" y="-70" width="84" height="24" rx="3" fill="#FEF3C7" stroke="${L}"/><text x="150" y="-52" text-anchor="middle" ${NUN} font-size="15" fill="#9A3412">HOA LU</text></g>
    <g class="e123-ban"><rect x="-96" y="-244" width="192" height="28" rx="4" fill="#DC2626" stroke="${L}" stroke-width="1.2"/><text x="0" y="-224" text-anchor="middle" ${NUN} font-size="17" fill="#FDE68A">DAI CO VIET</text>
      <rect x="-104" y="-246" width="10" height="32" rx="3" fill="#A16207" stroke="${L}"/><rect x="94" y="-246" width="10" height="32" rx="3" fill="#A16207" stroke="${L}"/></g></g>
  <!-- màu ảnh cũ -->
  <rect class="e123-tint" x="0" y="0" width="${W}" height="315" fill="#B45309"/>
  <rect class="e123-legend" x="640" y="0" width="840" height="315" fill="#92400E"/>`;
}

function fg() {
  const LB = [
    ['hl', 300, 54, 'near Hoa Lu', '#0F766E', 16], ['poor', 150, 110, 'poor', '#78716C', 15], ['buf', 940, 54, 'buffaloes', '#57534E', 16],
    ['games', 1120, 104, 'battle games', '#B91C1C', 15], ['reed', 1200, 104, 'reeds as flags', '#64748B', 15], ['lead', 1130, 304, 'the leader', '#B91C1C', 16],
    ['grew', 1300, 54, 'he grew up', '#EA580C', 17], ['np', 1300, 54, 'not peaceful', '#475569', 17],
    ['twelve', 1880, 54, 'twelve warlords', '#7C3AED', 17], ['unhappy', 1880, 54, 'could not live happily', '#475569', 15], ['one', 1840, 54, 'one by one', '#DC2626', 18],
    ['y968', 2740, 60, 'In 968', '#B45309', 18], ['emp', 2560, 98, 'Emperor Dinh Tien Hoang', '#B45309', 14], ['cap', 2790, 186, 'the capital', '#9A3412', 14],
    ['peace', 2560, 54, 'in peace again', '#16A34A', 18],
  ];
  return `
  ${bush(30, FLOOR + 26, 0.6, '#65A30D')}${bush(1450, FLOOR + 28, 0.7, '#65A30D')}${bush(2380, FLOOR + 26, 0.6, '#65A30D')}
  <g class="e123-flw">${[2340, 2370, 2410, 2860, 2890, 2930].map((x, i) => flowerAt(x, FLOOR + 14, ['#F472B6', '#FACC15', '#F87171'][i % 3])).join('')}</g>
  <!-- khung truyện cổ (An old story says) -->
  <g class="e123-frame"><rect x="790" y="44" width="560" height="262" rx="10" fill="none" stroke="#92400E" stroke-width="7" stroke-dasharray="2 9" stroke-linecap="round"/>
    <g transform="translate(1070 50)"><path d="M-112 -14 H112 Q120 0 112 14 H-112 Q-120 0 -112 -14Z" fill="#FEF3C7" stroke="#92400E" stroke-width="1.6"/>
      <circle cx="-112" r="8" fill="#D6A35C" stroke="#92400E"/><circle cx="112" r="8" fill="#D6A35C" stroke="#92400E"/>
      <text y="6" text-anchor="middle" ${NUN} font-size="15" fill="#92400E">An old story says…</text></g></g>
  <g class="e123-nm e123-nm-kid">${speaker(280, 140, 'Bo Linh', '#B45309')}</g>
  <g class="e123-cnt"><g transform="translate(2040 108)"><circle r="20" fill="#fff" stroke="#7C3AED" stroke-width="2"/><text y="7" text-anchor="middle" ${NUN} font-size="20" fill="#7C3AED">12</text></g></g>
  ${LB.map(([k, x, y, t, c, s]) => `<g class="e123-lb e123-lb-${k}">${label(x, y, t, c, s)}</g>`).join('')}`;
}

const CSS = `
.e123-lb, .e123-nm, .e123-cnt { opacity: 0; transition: opacity .35s; }
${['hl', 'poor', 'buf', 'games', 'reed', 'lead', 'grew', 'np', 'twelve', 'unhappy', 'one', 'y968', 'emp', 'cap', 'peace'].map((k) => `.st-lb-${k} .e123-lb-${k}`).join(', ')} { opacity: 1; }
.st-nm .e123-nm-kid, .st-cnt .e123-cnt { opacity: 1; }
.e123-tint { opacity: .18; transition: opacity .8s; pointer-events: none; }
.st-peace .e123-tint { opacity: .05; }
.e123-legend { opacity: 0; transition: opacity .6s; pointer-events: none; }
.st-legend .e123-legend { opacity: .2; }
.e123-frame { opacity: 0; transform: scale(1.06); transform-origin: 1070px 170px; transition: opacity .4s, transform .5s; }
.st-legend .e123-frame { opacity: 1; transform: none; }
.e123-gloom { opacity: 0; transition: opacity .8s; }
.st-gloom .e123-gloom { opacity: 1; }
.e123-sun { opacity: .3; transition: opacity 1s; }
.st-peace .e123-sun { opacity: 1; }
.e123-plume { animation: e123Sway 1.8s ease-in-out infinite alternate; }
@keyframes e123Sway { from { transform: rotate(-6deg); } to { transform: rotate(6deg); } }
.e123-wf { animation: e123Flag 1.1s ease-in-out infinite alternate; }
@keyframes e123Flag { from { transform: skewY(-4deg) scaleX(.9); } to { transform: skewY(4deg) scaleX(1.02); } }
.st-clash .e123-wf { animation-duration: .3s; }
.e123-w { transition: transform .35s ease-in, opacity .35s; }
.e123-r { opacity: 0; transform: translateY(30px); transition: transform .35s cubic-bezier(.3,1.5,.6,1), opacity .2s; }
${WARL.map((_, i) => `.st-d${i} .e123-w${i} { opacity: 0; transform: translateY(30px) rotate(40deg); } .st-d${i} .e123-r${i} { opacity: 1; transform: none; }`).join('\n')}
.e123-ban { transform-box: fill-box; transform-origin: 50% 50%; transform: scaleX(0); transition: transform .9s cubic-bezier(.3,1.2,.6,1); }
.st-ban .e123-ban { transform: none; }
.e123-hl { transform-box: fill-box; transform-origin: 50% 50%; }
.st-hl .e123-hl { animation: e123Pulse .35s ease-in-out 4 alternate; }
@keyframes e123Pulse { to { transform: scale(1.18); } }
.e123-flw { opacity: 0; transition: opacity .6s; }
.st-peace .e123-flw { opacity: 1; }
.is-walk .e123-lA { animation: e123Leg .3s ease-in-out infinite alternate; }
.is-walk .e123-lB { animation: e123Leg .3s ease-in-out infinite alternate-reverse; }
@keyframes e123Leg { from { transform: rotate(-12deg); } to { transform: rotate(12deg); } }
.e123-tail { animation: e123Sway 1.4s ease-in-out infinite alternate; }
.act-e123moo .e123-head { animation: e123Moo .5s ease-in-out 2 alternate; }
@keyframes e123Moo { to { transform: rotate(-14deg); } }
@media (prefers-reduced-motion: reduce) {
  .e123-plume, .e123-wf, .e123-tail { animation-duration: 3.5s; }
  .is-walk .e123-lA, .is-walk .e123-lB { animation-duration: .7s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const BOYS = ['b1', 'b2', 'b3'];
const VILL = ['v1', 'v2', 'v3'];

const BEATS = [
  { key: ['When Dinh Bo Linh was a little boy', 'near Hoa Lu'], icon: '👦', label: 'little boy', async play(st) {
    st.look(300);
    st.sfx('birds', { vol: 0.5 });
    await st.walk('boy', 280, { speed: 110, follow: false });
    st.set('st-nm'); st.mood('boy', 'joy'); st.pose('boy', 'wave'); st.act('boy', 'wave'); st.sfx('ding', { vol: 0.4 });
    await st.wait(600);
    st.set('st-lb-hl'); st.sfx('pop', { vol: 0.4 });
    await st.wait(1200);
    st.act('boy', null); st.pose('boy', 'stand');
  } },
  { key: ['His family was poor', 'looked after buffaloes'], icon: '🐃', label: 'buffaloes', async play(st) {
    off(st, 'st-nm', 'st-lb-hl');
    st.look(260);
    st.set('st-lb-poor'); st.sfx('wind', { vol: 0.4 });
    st.mood('boy', 'sad');
    await st.wait(1000);
    st.set('st-lb-poor', false);
    st.mood('boy', 'happy'); st.hold('boy', 'e123_rope'); st.pose('boy', 'e123_rope');
    st.act('buf', 'e123moo'); st.sfx('bump', { vol: 0.4, rate: 0.6 });
    await st.wait(500);
    st.look(880, { dur: 3600 });
    await Promise.all([st.walk('buf', 1010, { speed: 150, follow: false }), st.walk('boy', 900, { speed: 150, follow: false, after: 'e123_rope' })]);
    st.set('st-lb-buf'); st.sfx('ding', { vol: 0.4 });
    st.act('buf', 'e123moo');
    await st.wait(700);
  } },
  { key: ['An old story says', 'played battle games', 'other buffalo boys'], icon: '📜', label: 'battle games', async play(st) {
    st.set('st-lb-buf', false);
    st.hold('boy', null); st.pose('boy', 'stand');
    st.look(1070);
    st.set('st-legend'); st.sfx('page-turn', { vol: 0.7 });
    await st.wait(700);
    for (const id of BOYS) st.show(id, true);
    await Promise.all([
      st.walk('b1', 1110, { speed: 170, follow: false, after: 'e123_play' }),
      st.walk('b2', 1170, { speed: 170, follow: false, after: 'e123_play' }),
      st.walk('b3', 1230, { speed: 170, follow: false, after: 'e123_play' }),
    ]);
    st.set('st-lb-games'); st.sfx('giggle', { vol: 0.5 });
    for (const id of ['boy', ...BOYS]) { st.mood(id, 'joy'); st.act(id, 'jump'); }
    await st.wait(1300);
    for (const id of ['boy', ...BOYS]) { st.act(id, null); }
    st.pose('boy', 'stand');
  } },
  { key: ['used reeds as flags', 'Bo Linh was always the leader'], icon: '🎏', label: 'reed flags', async play(st) {
    st.set('st-lb-games', false);
    st.look(1070);
    st.set('st-lb-reed');
    st.walk('buf', 820, { speed: 120, follow: false }).then(() => st.face('buf', 1));
    for (const [i, id] of ['boy', ...BOYS].entries()) {
      st.hold(id, 'e123_reed'); st.pose(id, 'e123_flag'); st.sfx('whoosh', { vol: 0.4, rate: 1 + i * 0.1 });
      await st.wait(260);
    }
    st.set('st-lb-reed', false);
    await Promise.all([
      st.walk('boy', 1200, { speed: 110, follow: false, after: 'e123_lead' }),
      st.walk('b1', 1130, { speed: 110, follow: false, after: 'e123_flag' }),
      st.walk('b2', 1060, { speed: 110, follow: false, after: 'e123_flag' }),
      st.walk('b3', 990, { speed: 110, follow: false, after: 'e123_flag' }),
    ]);
    st.set('st-lb-lead'); st.sfx('cheer', { vol: 0.5 });
    st.mood('boy', 'joy');
    for (const id of BOYS) { st.mood(id, 'joy'); st.act(id, 'cheer'); }
    await st.wait(1200);
    for (const id of BOYS) st.act(id, null);
  } },
  { key: ['When he grew up', 'the country was not peaceful'], icon: '🌩️', label: 'not peaceful', async play(st) {
    off(st, 'st-lb-lead', 'st-legend');
    for (const id of BOYS) st.show(id, false);
    st.show('buf', false);
    st.look(1300);
    st.set('st-lb-grew');
    st.place('dbl', 1300, FLOOR, 1);
    st.fx('poof', 1240, FLOOR - 70, { quiet: true }); st.sfx('poof', { vol: 0.7 });
    await st.wait(200);
    st.show('boy', false); st.show('dbl', true); st.mood('dbl', 'joy'); st.pose('dbl', 'open');
    await st.wait(1200);
    off(st, 'st-lb-grew'); st.set('st-gloom'); st.set('st-lb-np'); st.sfx('wind', { vol: 0.6 });
    st.mood('dbl', 'sad'); st.pose('dbl', 'stand');
    await st.wait(1300);
  } },
  { key: ['twelve warlords', 'fought each other all the time'], icon: '⚔️', label: '12 warlords', async play(st) {
    st.set('st-lb-np', false);
    st.look(1880, { dur: 1100 });
    await st.wait(700);
    st.set('st-lb-twelve'); st.set('st-cnt'); st.sfx('ding', { vol: 0.4 });
    await st.wait(500);
    st.set('st-clash'); st.sfx('lion-drum', { vol: 0.5, rate: 0.8 });
    for (let i = 0; i < 5; i++) {
      const [x, y] = WARL[(i * 5 + 2) % 12];
      st.fx('poof', x + 30, y - 30, { quiet: true }); st.sfx('bump', { vol: 0.5, rate: 0.9 + (i % 3) * 0.15 });
      await st.wait(380);
    }
    await st.wait(300);
  } },
  { key: ['People could not live happily'], icon: '😢', label: 'not happy', async play(st) {
    off(st, 'st-lb-twelve', 'st-cnt', 'st-clash');
    st.look(1880);
    for (const id of VILL) st.show(id, true);
    st.set('st-lb-unhappy'); st.sfx('wind', { vol: 0.5 });
    st.mood('v1', 'sad'); st.pose('v1', 'sad'); st.mood('v2', 'sad'); st.pose('v2', 'sad');
    await st.wait(700);
    st.mood('v3', 'cry'); st.sfx('drip', { vol: 0.4 });
    st.face('v1', 1); st.pose('v1', 'carry');
    await st.wait(1300);
  } },
  { key: ['built a strong army', 'beat them one by one'], icon: '🚩', label: 'one by one', async play(st) {
    st.set('st-lb-unhappy', false);
    st.look(1700, { dur: 1600 });
    st.hold('dbl', 'e123_banner'); st.pose('dbl', 'e123_flag'); st.mood('dbl', 'happy');
    for (const id of ['s1', 's2']) st.show(id, true);
    await st.loop('steps', () => Promise.all([
      st.walk('dbl', 1660, { speed: 130, follow: false, after: 'e123_flag' }),
      st.walk('s1', 1590, { speed: 130, follow: false }),
      st.walk('s2', 1530, { speed: 130, follow: false }),
    ]), { vol: 0.8 });
    st.sfx('cheer', { vol: 0.4 });
    st.look(1820, { dur: 900 });
    st.set('st-lb-one');
    for (let i = 0; i < 12; i++) { st.set(`st-d${i}`); st.sfx('pop', { vol: 0.45, rate: 0.8 + i * 0.05 }); await st.wait(230); }
    for (const id of VILL) st.mood(id, 'wow');
    await st.wait(500);
  } },
  { key: ['In 968', 'became the emperor', 'Dinh Tien Hoang'], icon: '👑', label: 'emperor', async play(st) {
    off(st, 'st-lb-one', 'st-gloom');
    for (const id of [...VILL, 's1', 's2']) st.show(id, false);
    st.hold('dbl', null); st.pose('dbl', 'stand');
    st.place('dbl', 2640, FLOOR, 1);
    st.place('s1', 2540, FLOOR, 1); st.place('s2', 2710, FLOOR, -1);
    for (const id of ['s1', 's2']) st.show(id, true);
    st.look(2640, { instant: true });
    st.set('st-lb-y968'); st.sfx('page-turn', { vol: 0.6 });
    await st.wait(500);
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(crown(), [2500, 70], [2640, FLOOR - 172], { size: 40, dur: 700 });
    st.place('crown', 2640, FLOOR - 166); st.show('crown', true); st.fx('sparkle', 2640, FLOOR - 186);
    st.set('st-lb-emp'); st.mood('dbl', 'joy'); st.pose('dbl', 'open'); st.sfx('cheer', { vol: 0.5 });
    for (const id of ['s1', 's2']) { st.pose(id, 'cheer'); st.mood(id, 'joy'); }
    await st.wait(1400);
    for (const id of ['s1', 's2']) st.pose(id, 'stand');
  } },
  { key: ['named the country Dai Co Viet', 'Hoa Lu was the capital'], icon: '🏯', label: 'Dai Co Viet', async play(st) {
    off(st, 'st-lb-y968', 'st-lb-emp');
    st.look(2660);
    st.pose('dbl', 'pointUp'); st.act('dbl', 'point');
    st.set('st-ban'); st.sfx('page-turn', { vol: 0.8 });
    await st.wait(1300);
    st.act('dbl', null); st.pose('dbl', 'point');
    st.set('st-hl'); st.set('st-lb-cap'); st.sfx('ding', { vol: 0.5 });
    await st.wait(1300);
    st.pose('dbl', 'stand');
  } },
  { key: ['Finally', 'people could live in peace again'], icon: '🕊️', label: 'in peace', async play(st) {
    off(st, 'st-lb-cap', 'st-hl');
    st.set('st-peace'); st.sfx('birds', { vol: 0.6 });
    st.look(2540);
    for (const id of VILL) { st.show(id, true); st.mood(id, 'joy'); st.pose(id, 'stand'); }
    st.place('v1', 2250, FLOOR, 1); st.place('v2', 2190, FLOOR, 1); st.place('v3', 2300, FLOOR, 1);
    await Promise.all([st.walk('v1', 2410, { speed: 110, follow: false }), st.walk('v2', 2350, { speed: 110, follow: false }), st.walk('v3', 2470, { speed: 140, follow: false })]);
    st.set('st-lb-peace'); st.sfx('giggle', { vol: 0.5 });
    st.act('v3', 'jump'); st.pose('v1', 'wave'); st.act('v1', 'wave'); st.mood('dbl', 'joy'); st.pose('dbl', 'open');
    await st.wait(1500);
    st.act('v3', null); st.act('v1', null);
  } },
];

export default {
  id: 'en123', worldW: W, floor: FLOOR, viewTop: 30, camStart: 40, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [1, 3, 4, 7, 8, 10],
  cast: [
    { id: 'buf', kind: 'thing', x: 420, y: FLOOR, s: 1, svg: BUFFALO, box: [-90, -140, 220, 144] },
    { id: 'v2', kind: 'adult', who: 'e123_v2', x: 1760, s: 0.92 },
    { id: 'v1', kind: 'adult', who: 'e123_v1', x: 1830, s: 0.92, face: -1 },
    { id: 'v3', kind: 'kid', who: 'e123_v3', x: 1900, face: -1 },
    { id: 'b3', kind: 'kid', who: 'e123_b3', x: 1520, face: -1 },
    { id: 'b2', kind: 'kid', who: 'e123_b2', x: 1480, face: -1 },
    { id: 'b1', kind: 'kid', who: 'e123_b1', x: 1440, face: -1 },
    { id: 's2', kind: 'adult', who: 'e123_s2', x: 1280, s: 0.92 },
    { id: 's1', kind: 'adult', who: 'e123_s1', x: 1340, s: 0.92 },
    { id: 'dbl', kind: 'adult', who: 'e123_dbl', x: 1300 },
    { id: 'boy', kind: 'kid', who: 'e123_boy', x: 180 },
    { id: 'crown', kind: 'thing', x: 2640, y: FLOOR - 166, svg: crown(), box: [-20, -26, 40, 28] },
  ],
  init(st) {
    for (const id of ['dbl', 's1', 's2', 'crown', ...BOYS, ...VILL]) st.show(id, false);
  },
};
