/**
 * Bài 103 "Bip Goes to School" (hiện tại đơn ngôi 3, trạng từ tần suất). Bộ 👽: tập 3.
 * Một thế giới đi từ trái sang phải: phòng ngủ nhà Minh buổi sớm (ảnh gia đình có thêm Bíp, giường nhỏ của Bíp, đồng hồ báo
 * thức, mũ lưỡi trai cũ của Minh treo trên móc) → đường tới trường → lớp cô Hoa (Bíp ngồi giữa Tom và Minh, viết nhanh nhờ
 * ba mắt) → sân trường giờ ra chơi (đá bóng, Bíp lơ lửng chạy rất nhanh, sút vào gôn) → cô Hoa hỏi, Minh cười, Bíp vui.
 * Mũ che râu: SVG Bíp đội mũ = BIP_SVG chèn thêm nhóm mũ vào đầu (dáng trước và dáng nghiêng), hiện bằng class e103-cap,
 * kéo mũ che râu bằng class e103-hide.
 * Toạ độ cảnh: rộng 2440, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, grass, fence, room, doorway, windowBox, schoolFront, board, desk, label, thought, BALL, STAR, sun } from '../kit.js';
import { BIP_SVG, BIP_BOX, BIP_CSS, bipSet } from '../bip.js';

const FLOOR = 282;
const W = 2440;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { bed: 300, hook: 470, door: 520, school: 860, cls: 980, board: 1040, hoa: 1215, tom: 1310, bip: 1390, minh: 1470, wall: 1600, goal: 2330 };

Object.assign(CAST, {
  e103_mum: { adult: true, hair: 'bob', top: 'blouse', shirt: '#F9A8D4' },
  e103_lan: { hair: 'bob', top: 'tee', shirt: '#F9A8D4' },
  e103_nam: { hair: 'bowl', top: 'uniform', shirt: '#FFFFFF', bottom: 'shorts', bottomC: '#1E3A6E', shoe: '#3B6FD8', bag: '#4F7FD9' },
});

// ── Bíp đội mũ lưỡi trai cũ của Minh (chèn vào đầu, toạ độ đầu chưa nhân 0.8) ─────────────────
const STAR_M = `<path d="M0 -6 L1.8 -1.9 L6 -1.8 L2.7 0.9 L3.8 5 L0 2.6 L-3.8 5 L-2.7 0.9 L-6 -1.8 L-1.8 -1.9Z" fill="#FDE047" stroke="${L}" stroke-width="0.6"/>`;
const CAP_F = `<g class="e103-capg"><path d="M-28 -18 Q-30 -47 0 -48 Q30 -47 28 -18 Q0 -24 -28 -18Z" fill="#2563EB" stroke="${L}" stroke-width="1.2"/>
  <path d="M-30 -18 Q0 -25 30 -18 Q20 -13 0 -13 Q-20 -13 -30 -18Z" fill="#1E40AF" stroke="${L}" stroke-width="1"/>
  <circle cy="-47" r="3" fill="#1E40AF" stroke="${L}" stroke-width="0.7"/><g transform="translate(0 -33)">${STAR_M}</g></g>`;
const CAP_S = `<g class="e103-capg"><path d="M-27 -16 Q-28 -46 2 -47 Q28 -45 27 -17 Q0 -22 -27 -16Z" fill="#2563EB" stroke="${L}" stroke-width="1.2"/>
  <path d="M22 -19 Q40 -21 47 -13 Q34 -10 20 -14Z" fill="#1E40AF" stroke="${L}" stroke-width="1"/><g transform="translate(8 -32) scale(0.8)">${STAR_M}</g></g>`;
const BIP_CAP = (() => {
  let s = BIP_SVG;
  const i = s.indexOf('pp-face f-talk'), e = s.indexOf('</g>', i) + 4;
  s = s.slice(0, e) + CAP_F + s.slice(e);
  const j = s.indexOf('M17 14 Q22 17 26 12'), f = s.indexOf('/>', j) + 2;
  return s.slice(0, f) + CAP_S + s.slice(f);
})();
const BALL_T = `<g class="e103-ballr" transform="translate(0 -9)"><g class="e103-spin">${BALL('#F8FAFC').replace('#fff', '#1F2937')}</g></g>`;

// ── Cảnh ──────────────────────────────────────────────────────────────────
const mini = (who, x, y, s = 0.5) => `<g transform="translate(${x} ${y})">${headOnly(who, { s, mood: 'happy' })}</g>`;
const bipHead = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse rx="31" ry="27" fill="#86E05A" stroke="${L}" stroke-width="1.6"/>
  ${[[-14, 0], [0, -10], [14, 0]].map(([ex, ey]) => `<circle cx="${ex}" cy="${ey}" r="6.4" fill="#fff" stroke="${L}"/><circle cx="${ex}" cy="${ey + 1}" r="3" fill="#1F2937"/>`).join('')}
  <path d="M-8 13 Q0 20 8 13" stroke="${L}" stroke-width="2.2" fill="none"/><path d="M-10 -24 L-18 -40 M10 -24 L18 -40" stroke="#5BB83A" stroke-width="3"/><circle cx="-18" cy="-41" r="5" fill="#FDE047"/><circle cx="18" cy="-41" r="5" fill="#FDE047"/></g>`;

function bg() {
  return `
  ${sky(0, W, 315, 'e103sky')}
  <g transform="translate(700 70)">${sun(20)}</g>
  ${cloud(640, 60, 0.8, 0)}${cloud(1900, 64, 0.9, 2)}${cloud(2250, 50, 0.8, 4)}
  <!-- phòng ngủ -->
  ${room(0, X.door + 12, FLOOR, '#E0E7FF')}
  <g transform="translate(0 0)"><rect x="40" y="72" width="140" height="92" rx="4" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="48" y="80" width="124" height="76" fill="#FEF9C3"/>
    ${mini('en_dad', 64, 116, 0.6)}${mini('e103_mum', 90, 116, 0.6)}${mini('e103_lan', 114, 128, 0.6)}${mini('en_minh', 136, 130, 0.6)}
    <g class="e103-inphoto">${bipHead(156, 136, 0.36)}</g></g>
  <g class="e103-win">${windowBox(214, 72, 92, 82)}</g>
  <clipPath id="e103clip"><rect x="214" y="72" width="92" height="82"/></clipPath><g clip-path="url(#e103clip)"><g class="e103-rise"><circle cx="262" cy="150" r="14" fill="#FDBA74"/></g></g>
  <rect x="208" y="66" width="104" height="94" fill="none" stroke="#fff" stroke-width="8"/><rect x="208" y="66" width="104" height="94" fill="none" stroke="${L}" stroke-width="1.4"/>
  <!-- gối của Bíp -->
  <ellipse cx="${X.bed}" cy="222" rx="30" ry="12" fill="#fff" stroke="${L}" stroke-width="1"/>
  <rect x="${X.bed - 66}" y="186" width="14" height="${FLOOR - 186}" rx="4" fill="#A16207" stroke="${L}"/>
  <!-- bàn đầu giường + đồng hồ báo thức -->
  <rect x="380" y="232" width="50" height="${FLOOR - 232}" fill="#D97706" stroke="${L}"/><rect x="376" y="226" width="58" height="8" rx="2" fill="#B45309" stroke="${L}"/>
  <g transform="translate(405 210)"><g class="e103-clock"><circle r="15" fill="#EF4444" stroke="${L}" stroke-width="1.2"/><circle r="11" fill="#fff" stroke="${L}" stroke-width="0.8"/>
    <path d="M0 0 V-8 M0 0 V7" stroke="${L}" stroke-width="1.6" stroke-linecap="round"/><circle cx="-11" cy="-13" r="4.4" fill="#FACC15" stroke="${L}"/><circle cx="11" cy="-13" r="4.4" fill="#FACC15" stroke="${L}"/>
    <path d="M-9 13 l-3 4 M9 13 l3 4" stroke="${L}" stroke-width="1.6"/></g></g>
  <!-- móc treo mũ -->
  <rect x="${X.hook - 22}" y="128" width="44" height="7" rx="2" fill="#A16207" stroke="${L}"/><path d="M${X.hook} 135 v8" stroke="${L}" stroke-width="2"/>
  <g class="e103-hookcap"><g transform="translate(${X.hook} 168) scale(0.75)">${CAP_F.replace('e103-capg', '')}</g></g>
  ${doorway(X.door, FLOOR)}
  <!-- đường tới trường -->
  ${grass(X.door + 12, X.cls - X.door - 12, FLOOR)}
  <rect x="${X.door + 12}" y="${FLOOR}" width="${X.cls - X.door - 12}" height="33" fill="#D6D3D1" stroke="${L}"/>
  ${tree(600, FLOOR, 0.8)}
  ${schoolFront(X.school, FLOOR)}
  <!-- lớp học -->
  ${room(X.cls, X.wall - X.cls, FLOOR, '#FEF3C7')}
  <rect x="${X.cls - 6}" y="0" width="12" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  ${board(X.board, 70, 150, 88, '')}
  <text class="e103-chalk" x="${X.board + 75}" y="124" text-anchor="middle" ${NUN} font-size="26" fill="#F8FAFC">Earth</text>
  ${windowBox(1460, 76, 90, 76)}
  <rect x="${X.wall - 6}" y="0" width="12" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  <!-- sân trường -->
  ${grass(X.wall + 6, W - X.wall - 6, FLOOR)}
  ${fence(X.wall + 40, 700, FLOOR)}
  ${tree(1700, FLOOR, 0.9)}${tree(2400, FLOOR, 0.85, '')}
  <g transform="translate(${X.goal} ${FLOOR})"><path d="M-30 0 V-70 H30 V0" stroke="#fff" stroke-width="5" fill="none"/><path d="M-30 0 V-70 H30 V0" stroke="${L}" stroke-width="1" fill="none"/>
    <g class="e103-net"><path d="M-26 -66 H26 ${Array.from({ length: 6 }, (_, i) => `M${-26 + i * 10} -66 V0`).join(' ')} ${Array.from({ length: 6 }, (_, i) => `M-26 ${-56 + i * 11} H26`).join(' ')}" stroke="#E2E8F0" stroke-width="1"/></g></g>`;
}

const PAGE = [X.bip, 128];
function fg() {
  const lines = Array.from({ length: 4 }, (_, i) => `<path class="e103-ln e103-ln${i}" d="M-42 ${-14 + i * 10} q6 -4 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" stroke="#2563EB" stroke-width="1.8" fill="none" stroke-linecap="round"/>`).join('');
  const things = `<g class="e103-n e103-n1"><text x="-44" y="8" text-anchor="middle" ${NUN} font-size="20" fill="#DC2626">ABC</text></g>
    <g class="e103-n e103-n2"><text x="2" y="-10" text-anchor="middle" ${NUN} font-size="16" fill="#2563EB">1+1=2</text></g>
    <g class="e103-n e103-n3"><g transform="translate(44 6)"><circle r="15" fill="#38BDF8" stroke="${L}"/><path d="M-10 -6 q6 -4 10 2 q4 6 -2 10 q-6 -2 -8 -12Z M4 -12 q8 2 8 10 q-6 0 -8 -10Z" fill="#4ADE80"/></g></g>`;
  return `
  <!-- giường Bíp (che thân khi ngủ) -->
  <g transform="translate(${X.bed} 0)"><rect x="-40" y="232" width="110" height="26" rx="8" fill="#93C5FD" stroke="${L}" stroke-width="1.2"/>
    <path d="M-30 240 h90 M-30 248 h90" stroke="#BFDBFE" stroke-width="2"/>
    <rect x="-52" y="256" width="132" height="${FLOOR - 256}" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="72" y="214" width="12" height="${FLOOR - 214}" rx="4" fill="#A16207" stroke="${L}"/></g>
  <!-- bàn học (che chân người ngồi) -->
  ${desk(X.tom, FLOOR)}${desk(X.bip, FLOOR, '#FB923C')}${desk(X.minh, FLOOR)}
  ${bush(X.wall + 30, FLOOR + 30, 0.6)}${bush(2200, FLOOR + 32, 0.7, '#4ADE80')}
  <!-- trang vở phóng to: viết rất nhanh -->
  <g class="e103-page"><path d="M${X.bip + 30} 224 L${PAGE[0] + 26} ${PAGE[1] + 32} L${PAGE[0] + 40} ${PAGE[1] + 32}Z" fill="#fff" stroke="${L}" stroke-width="1"/>
    <g transform="translate(${PAGE[0]} ${PAGE[1]})"><rect x="-52" y="-30" width="104" height="62" rx="6" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <path d="M-46 -20 H46 M-46 -10 H46 M-46 0 H46 M-46 10 H46 M-46 20 H46" stroke="#BFDBFE" stroke-width="0.8"/>${lines}
    <g class="e103-pen"><g transform="rotate(30)"><rect x="-2.4" y="-22" width="4.8" height="20" fill="#FACC15" stroke="${L}" stroke-width="0.7"/><path d="M-2.4 -2 L0 3 L2.4 -2Z" fill="#78350F"/></g></g></g></g>
  <!-- ngôi sao xa -->
  <g class="e103-far"><g transform="translate(2262 66)"><g class="e103-star">${STAR('#C084FC')}</g></g></g>
  ${thought(2180, 108, 170, 86, things, [2221, FLOOR - 100], 'e103-bub')}
  <!-- nhãn -->
  ${[
    ['family', label(110, 196, "Minh's family", '#B45309', 14)],
    ['early', label(405, 172, 'early', '#EA580C', 15)],
    ['cap', label(X.hook - 20, 104, "Minh's old cap", '#1D4ED8', 13)],
    ['hide', label(X.hook - 40, 120, 'hides his antennae', '#16A34A', 13)],
    ['school', label(720, 124, 'to school', '#1D4ED8', 15)],
    ['tom', label((X.tom + X.bip) / 2, 140, 'next to Tom', '#EA580C', 14)],
    ['listen', label(X.bip - 40, 110, 'always listens', '#16A34A', 14)],
    ['talk', label(X.bip + 66, 150, 'never talks', '#DC2626', 14)],
    ['eyes', label(X.bip - 92, 118, '3 eyes', '#EA580C', 14)],
    ['break', label(1960, 110, 'break time', '#EA580C', 16)],
    ['small', label(1800, 150, 'small', '#EA580C', 14)],
    ['fast', label(2160, 120, 'very fast!', '#DC2626', 16)],
    ['every', label(2040, 92, 'every day', '#EA580C', 15)],
  ].map(([k, s]) => `<g class="e103-lb e103-lb-${k}">${s}</g>`).join('')}
  <g class="e103-shh"><g transform="translate(${X.bip - 42} 178)"><circle r="13" fill="#fff" stroke="#DC2626" stroke-width="2.4"/><path d="M-6 -3 h12 v6 h-4 l-3 4 v-4 h-5Z" fill="#94A3B8"/><path d="M-9 9 L9 -9" stroke="#DC2626" stroke-width="2.4"/></g></g>`;
}

const CSS = `
.e103-capg { opacity: 0; translate: 0 -34px; transition: opacity .25s, translate .45s cubic-bezier(.3,1.4,.6,1); }
.e103-cap .e103-capg { opacity: 1; translate: 0 0; }
.e103-hide .e103-capg { translate: 0 3px; }
.es-ac .bip-antL, .es-ac .bip-antR { transition: rotate .4s, opacity .35s; }
.e103-hide .bip-antL, .e103-hide .bip-antR { opacity: 0; }
.e103-hookcap { transition: opacity .2s; }
.st-took .e103-hookcap { opacity: 0; }
.e103-inphoto { opacity: 0; transform-box: fill-box; transform-origin: center; scale: .2; transition: opacity .2s, scale .4s cubic-bezier(.3,1.6,.6,1); }
.st-photo .e103-inphoto { opacity: 1; scale: 1; }
.e103-rise { translate: 0 30px; opacity: .5; transition: translate 1.6s ease-out, opacity 1.6s; }
.st-sunup .e103-rise { translate: 0 -40px; opacity: 1; }
.e103-win { clip-path: none; }
.e103-clock { transform-box: fill-box; transform-origin: 50% 100%; }
.st-ring .e103-clock { animation: e103Ring .08s linear infinite alternate; }
@keyframes e103Ring { from { rotate: -9deg; } to { rotate: 9deg; } }
.e103-chalk { opacity: 0; clip-path: inset(0 100% 0 0); }
.st-chalk .e103-chalk { opacity: 1; clip-path: inset(0 0 0 0); transition: clip-path 1.2s linear; }
.e103-lb, .e103-shh, .e103-page, .e103-far { opacity: 0; transition: opacity .3s; }
.e103-lb > g, .e103-shh > g { transform-box: fill-box; transform-origin: 50% 100%; }
${['family', 'early', 'cap', 'hide', 'school', 'tom', 'listen', 'talk', 'eyes', 'break', 'small', 'fast', 'every'].map((k) => `.st-lb-${k} .e103-lb-${k}`).join(', ')} { opacity: 1; }
.st-lb-talk .e103-shh, .st-page .e103-page, .st-far .e103-far { opacity: 1; }
.e103-ln { stroke-dasharray: 100; stroke-dashoffset: 100; }
${[0, 1, 2, 3].map((i) => `.st-write .e103-ln${i} { stroke-dashoffset: 0; transition: stroke-dashoffset .32s linear ${0.1 + i * 0.36}s; }`).join('\n')}
.st-write .e103-pen { animation: e103Pen 1.5s linear both; }
@keyframes e103Pen { ${[0, 1, 2, 3].map((i) => `${i * 24}% { translate: -40px ${-16 + i * 10}px; } ${i * 24 + 22}% { translate: 44px ${-16 + i * 10}px; }`).join(' ')} 100% { translate: 44px 14px; } }
.e103-pen { translate: -40px -16px; }
.es-thing.is-walk .e103-spin { animation: e103Spin .3s linear infinite; transform-box: fill-box; transform-origin: center; }
@keyframes e103Spin { to { rotate: 360deg; } }
.e103-net { transition: translate .2s; }
.st-goal .e103-net { animation: e103Net .25s ease-out 3 alternate; }
@keyframes e103Net { to { translate: 5px 0; } }
.e103-star { transform-box: fill-box; transform-origin: center; animation: e103Tw 1.1s ease-in-out infinite alternate; }
@keyframes e103Tw { from { scale: .8; } to { scale: 1.4; } }
.e103-bub { opacity: 0; transform: scale(.4); transform-origin: 2221px ${FLOOR - 100}px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-bub .e103-bub { opacity: 1; transform: none; }
.e103-n { opacity: 0; transform-box: fill-box; transform-origin: center; scale: .3; transition: opacity .2s, scale .35s cubic-bezier(.3,1.6,.6,1); }
.st-n1 .e103-n1, .st-n2 .e103-n2, .st-n3 .e103-n3 { opacity: 1; scale: 1; }
@media (prefers-reduced-motion: reduce) {
  .st-ring .e103-clock { animation-duration: .25s; } .e103-star { animation-duration: 3s; }
  .es-thing.is-walk .e103-spin { animation-duration: .8s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const pop = (st, k, vol = 0.5, rate = 1) => { st.set(k); st.sfx('pop', { vol, rate }); };
const BOYS = ['tom', 'minh', 'nam'];

const BEATS = [
  { key: ["lives with Minh's family"], icon: '🏠', label: "Minh's family", async play(st) {
    st.look(230, { instant: true });
    st.mood('bip', 'shut');
    st.fx('zzz', X.bed + 16, FLOOR - 100);
    await st.wait(600);
    st.set('st-lb-family'); st.sfx('camera', { vol: 0.6 });
    await st.wait(300);
    pop(st, 'st-photo', 0.6);
    await st.wait(1200);
  } },
  { key: ['gets up early', "puts on Minh's old cap"], icon: '🧢', label: 'gets up · cap', async play(st) {
    st.set('st-lb-family', false);
    st.look(300);
    st.set('st-sunup'); st.set('st-ring'); st.set('st-lb-early'); st.sfx('alarm-clock', { vol: 0.6 });
    await st.wait(900);
    st.set('st-ring', false);
    st.mood('bip', 'wow');
    await st.walk('bip', X.bed, { y: FLOOR - 50, speed: 110, follow: false });
    await st.walk('bip', X.hook - 26, { y: FLOOR, speed: 130, follow: false });
    st.face('bip', 1); st.mood('bip', 'happy');
    st.set('st-lb-early', false); st.set('st-lb-cap');
    st.set('st-took'); st.sfx('whoosh', { vol: 0.5 });
    await st.fly(CAP_F.replace('e103-capg', ''), [X.hook, 160], [X.hook - 26, FLOOR - 95], { size: 40, dur: 500 });
    bipSet(st, 'bip', 'e103-cap'); st.sfx('bag-on', { vol: 0.6 });
    st.mood('bip', 'joy');
    await st.wait(700);
  } },
  { key: ['The cap hides his antennae'], icon: '🙈', label: 'hides antennae', async play(st) {
    off(st, 'st-lb-cap', 'st-lb-early');
    st.look(300);
    st.mood('bip', 'happy');
    await st.wait(300);
    bipSet(st, 'bip', 'e103-hide'); st.sfx('whoosh', { vol: 0.35, rate: 1.4 });
    st.set('st-lb-hide');
    await st.wait(500);
    st.act('bip', 'look'); st.sfx('giggle', { vol: 0.45, rate: 1.3 });
    await st.wait(1200);
    st.act('bip', null);
  } },
  { key: ['goes to school with Minh'], icon: '🏫', label: 'to school', async play(st) {
    st.set('st-lb-hide', false);
    st.mood('bip', 'happy');
    st.look(560);
    st.face('minh', -1); st.pose('minh', 'wave'); st.act('minh', 'wave'); st.sfx('door-open', { vol: 0.5 });
    await st.walk('bip', X.door + 20, { speed: 160, follow: false });
    st.act('minh', null); st.pose('minh', 'stand');
    st.set('st-lb-school');
    st.look(740, { dur: 2400 });
    await Promise.all([
      st.walk('bip', X.school + 30, { speed: 180, follow: false }),
      st.wait(500).then(() => st.walk('minh', X.school - 40, { speed: 140, follow: false })),
    ]);
    st.sfx('school-bell', { vol: 0.5 });
    st.face('minh', 1); st.mood('minh', 'joy');
    await st.wait(700);
  } },
  { key: ['sits next to Tom', "Ms Hoa's class"], icon: '🪑', label: 'next to Tom', async play(st) {
    st.set('st-lb-school', false);
    st.place('minh', X.cls + 30, FLOOR, 1); st.place('bip', X.cls + 70, FLOOR, 1);
    st.look(1310, { instant: true });
    st.sfx('door-open', { vol: 0.4 });
    st.pose('tom', 'sitWave'); st.act('tom', 'wave'); st.mood('tom', 'joy');
    st.mood('hoa', 'joy');
    await Promise.all([
      st.walk('bip', X.bip, { y: FLOOR - 4, speed: 170, follow: false }),
      st.walk('minh', X.minh, { speed: 150, follow: false }),
    ]);
    st.face('bip', -1); st.sfx('bump', { vol: 0.3, rate: 1.4 });
    st.pose('minh', 'sitDesk'); st.sfx('bump', { vol: 0.25, rate: 1.1 });
    st.set('st-lb-tom');
    await st.wait(900);
    st.act('tom', null); st.pose('tom', 'sitDesk'); st.face('bip', 1);
  } },
  { key: ['always listens to the teacher', 'never talks in class'], icon: '👂', label: 'listens', async play(st) {
    st.set('st-lb-tom', false);
    st.look(1310);
    st.face('bip', -1); st.mood('bip', 'wow');
    st.face('hoa', -1); st.pose('hoa', 'point'); st.talk('hoa', true);
    st.set('st-chalk'); st.sfx('pencil', { vol: 0.6, rate: 0.8 });
    st.set('st-lb-listen');
    await st.wait(1300);
    st.talk('hoa', false); st.face('hoa', 1); st.pose('hoa', 'stand');
    st.face('tom', 1); st.mood('tom', 'joy');
    const psst = st.say('tom', 'Psst!', 1100);
    st.sfx('giggle', { vol: 0.35, rate: 1.4 });
    await st.wait(500);
    st.set('st-lb-talk'); st.sfx('buzz-no', { vol: 0.3 });
    st.mood('bip', 'happy');
    await psst;
    st.face('tom', 1);
  } },
  { key: ['writes very fast', 'three eyes'], icon: '✍️', label: 'writes fast', async play(st) {
    off(st, 'st-lb-listen', 'st-lb-talk');
    st.look(1340);
    st.face('bip', 1); st.mood('bip', 'happy');
    st.set('st-page'); st.sfx('page-turn', { vol: 0.5 });
    await st.wait(300);
    st.set('st-write'); st.act('bip', 'look');
    await st.loop('pencil', () => st.wait(1500), { vol: 0.8 });
    st.act('bip', null);
    st.set('st-lb-eyes'); st.sfx('ding', { vol: 0.4, rate: 1.3 });
    st.mood('bip', 'wow'); st.mood('tom', 'wow'); st.mood('minh', 'wow');
    await st.wait(1000);
  } },
  { key: ['At break time', 'plays football with the boys'], icon: '⚽', label: 'football', async play(st) {
    off(st, 'st-page', 'st-write', 'st-lb-eyes', 'st-chalk');
    st.sfx('school-bell', { vol: 0.5 });
    for (const id of ['tom', 'minh']) { st.pose(id, 'stand'); st.mood(id, 'joy'); }
    st.mood('bip', 'joy');
    st.place('tom', 1860, FLOOR, 1); st.place('minh', 1960, FLOOR, -1); st.place('nam', 2040, FLOOR, -1); st.place('bip', 1780, FLOOR, 1);
    st.place('ball', 1900, FLOOR);
    st.show('nam', true); st.show('ball', true);
    st.look(1920, { instant: true });
    st.set('st-lb-break');
    await st.wait(300);
    st.sfx('kick', { vol: 0.7 });
    await st.walk('ball', 2000, { speed: 260, follow: false });
    st.sfx('kick', { vol: 0.6, rate: 1.1 }); st.act('minh', 'hop');
    await st.walk('ball', 1830, { speed: 260, follow: false });
    st.sfx('kick', { vol: 0.6, rate: 0.95 }); st.act('bip', 'jump');
    await st.walk('ball', 1820, { speed: 120, follow: false });
    await st.wait(400);
    st.act('bip', null); st.act('minh', null);
  } },
  { key: ['He is small', 'runs very fast'], icon: '💨', label: 'very fast', async play(st) {
    st.set('st-lb-break', false);
    st.look(1880);
    st.set('st-lb-small'); st.sfx('pop', { vol: 0.4 });
    await st.wait(500);
    st.set('st-lb-small', false);
    st.sfx('whoosh', { vol: 0.6 });
    const ball = st.walk('ball', 2300, { speed: 330, follow: false });
    st.look(2160, { dur: 1400 });
    await st.walk('bip', 2225, { speed: 330, follow: false });
    st.set('st-lb-fast');
    await ball;
    st.sfx('kick', { vol: 0.8 });
    await st.walk('ball', X.goal + 6, { y: FLOOR - 22, speed: 200, follow: false });
    st.set('st-goal'); st.sfx('cheer', { vol: 0.5 });
    st.act('bip', 'jump'); st.mood('bip', 'joy');
    await Promise.all([
      st.walk('tom', 2097, { speed: 170, follow: false }),
      st.walk('minh', 2160, { speed: 170, follow: false }),
      st.walk('nam', 2045, { speed: 160, follow: false }),
    ]);
    st.pose('minh', 'cheer'); st.act('minh', 'jump');
    await st.wait(600);
    st.act('bip', null); st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['Ms Hoa often asks', 'Where is Bip from'], icon: '❓', label: 'Where from?', async play(st) {
    off(st, 'st-lb-fast', 'st-goal');
    st.look(2112);
    st.face('bip', -1); st.mood('bip', 'happy');
    st.place('hoa', 1840, FLOOR, 1);
    await st.walk('hoa', 1995, { speed: 130, follow: false });
    st.face('minh', -1); st.pose('hoa', 'open'); st.mood('hoa', 'happy');
    await st.say('hoa', 'Where is Bip from?', 2000);
    st.pose('hoa', 'stand');
  } },
  { key: ['Minh always smiles', 'He is from far away'], icon: '😊', label: 'far away', async play(st) {
    st.look(2112);
    st.mood('minh', 'joy'); st.pose('minh', 'pointUp'); st.sfx('giggle', { vol: 0.4 });
    const say = st.say('minh', 'He is from far away.', 2200);
    await st.wait(600);
    st.set('st-far'); st.sfx('ding', { vol: 0.4, rate: 0.8 });
    st.mood('bip', 'joy'); st.mood('hoa', 'joy'); st.act('hoa', 'nod');
    await say;
    st.act('hoa', null); st.pose('minh', 'stand');
  } },
  { key: ['loves school', 'learns something new every day'], icon: '💚', label: 'loves school', async play(st) {
    st.set('st-far', false);
    st.look(2112);
    st.face('bip', 1);
    st.set('st-bub'); st.sfx('pop', { vol: 0.5 });
    for (let i = 1; i <= 3; i++) { await st.wait(420); pop(st, `st-n${i}`, 0.5, 0.9 + i * 0.12); }
    st.set('st-lb-every');
    bipSet(st, 'bip', 'e103-hide', false); bipSet(st, 'bip', 'bip-glow'); st.sfx('sparkle', { vol: 0.5 });
    st.act('bip', 'jump'); st.mood('bip', 'joy');
    st.fx('hearts', 2225, FLOOR - 110, { quiet: true }); st.sfx('hearts', { vol: 0.5 });
    await st.wait(1500);
    st.act('bip', null);
  } },
];

export default {
  id: 'en103', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + BIP_CSS + CSS, bg, fg, beats: BEATS,
  order: [1, 3, 4, 6, 8, 11],
  cast: [
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: X.hoa, s: 0.95 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: X.tom },
    { id: 'nam', kind: 'kid', who: 'e103_nam', x: 2040, s: 0.96 },
    { id: 'bip', kind: 'thing', svg: BIP_CAP, box: BIP_BOX, x: X.bed },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: X.door + 80, face: -1 },
    { id: 'ball', kind: 'thing', svg: BALL_T, box: [-12, -20, 24, 22], x: 1900, s: 1.2 },
  ],
  init(st) {
    st.pose('tom', 'sitDesk');
    st.bag('minh', true);
    st.show('nam', false); st.show('ball', false);
  },
};
