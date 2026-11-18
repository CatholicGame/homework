/**
 * Bài 124 "A Poem by the River" (quá khứ đơn; will trong lời thơ). Một thế giới đi từ trái sang phải, đoạn ngày xưa nhuộm
 * màu ảnh cũ: cung vua Lý (vua đội mũ, Lý Thường Kiệt chào) → bờ nam sông Như Nguyệt (lính đứng gác, chiến luỹ đất và gỗ
 * dựng dần, đền nhỏ bên sông) với sông chạy ngang phía sau luỹ và trại quân Tống ở bờ bắc xa xa → hôm nay: phòng trưng bày
 * có bài thơ đóng khung, Minh và Lan đứng xem.
 * Bài thơ (truyền thuyết, "People say") hiện thành cuộn giấy trên trời đêm cạnh ngôi đền sáng đèn; quân Tống thử qua sông
 * bằng bè rồi lùi lại, cuối cùng quay về phương Bắc. Không có cảnh đánh nhau.
 * Toạ độ cảnh: rộng 3000, cao 315, sàn y = 282. Sông y 168–226 (sau chiến luỹ), bờ bắc y ≈ 168.
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, speaker, night, windowBox } from '../kit.js';
import { karst, bamboo, crown } from './vietsu-art.js';

const FLOOR = 282;
const W = 3000;
const X = { palace: 230, wall0: 700, wall1: 2160, temple: 1480, now: 2330, frame: 2660 };
const RIVER = [168, 226];
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e124_ltk: { adult: true, hair: 'short', top: 'robe', shirt: '#166534', trimC: '#FACC15', bottom: 'pants', bottomC: '#14532D', shoe: '#44403C', hat: 'scarf', trim: ['#14532D', '#FACC15', '#FDE68A'], beard: true, moustache: true },
  e124_king: { adult: true, hair: 'short', top: 'robe', shirt: '#EAB308', trimC: '#B91C1C', bottom: 'pants', bottomC: '#A16207', shoe: '#78350F' },
  e124_s1: { adult: true, hair: 'short', top: 'blouse', shirt: '#8B5E3C', bottom: 'pants', bottomC: '#292524', shoe: '#57534E', hat: 'scarf', trim: ['#B91C1C', '#FDE68A', '#FDE68A'] },
  e124_s2: { adult: true, hair: 'short', top: 'blouse', shirt: '#6B4423', bottom: 'pants', bottomC: '#1C1917', shoe: '#57534E', hat: 'scarf', trim: ['#B91C1C', '#FDE68A', '#FDE68A'], moustache: true },
  e124_s3: { adult: true, hair: 'short', top: 'blouse', shirt: '#7C2D12', bottom: 'pants', bottomC: '#292524', shoe: '#57534E', hat: 'scarf', trim: ['#B91C1C', '#FDE68A', '#FDE68A'] },
});

const PROPS = {
  e124_spear: `<g><path d="M0 -64 V34" stroke="${L}" stroke-width="3.6" stroke-linecap="round"/><path d="M0 -64 V34" stroke="#A16207" stroke-width="2"/>
    <path d="M0 34 l-3.4 2 l3.4 12 l3.4 -12Z" fill="#CBD5E1" stroke="${L}" stroke-width="0.7"/><path d="M-4 30 h8" stroke="#DC2626" stroke-width="3"/></g>`,
  e124_hoe: `<g><path d="M0 -4 V40" stroke="${L}" stroke-width="3.4" stroke-linecap="round"/><path d="M0 -4 V40" stroke="#A16207" stroke-width="1.8"/><path d="M-9 40 H9 L6 48 H-6Z" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/></g>`,
};
const POSES = {
  e124_bow: { R: [24, -86], L: [24, -86], head: 14 },
  e124_guard: { R: [18, 8], L: [10, 4] },
  e124_up: { R: [150, 176], L: [10, 4] },
};

// ── Quân Tống ở bờ bắc (gốc = giữa đáy, nhìn sang trái), nhỏ vì ở xa ──────────────────────────────
const soldier = (x, i) => `<g transform="translate(${x} 0)"><g class="${i % 2 ? 'e124-sA' : 'e124-sB'}">
  <rect x="-8" y="-28" width="6" height="28" fill="#1E293B"/><rect x="2" y="-28" width="6" height="28" fill="#1E293B"/></g>
  <path d="M-13 -28 Q-14 -66 0 -70 Q14 -66 13 -28Z" fill="#334155" stroke="${L}" stroke-width="0.9"/>
  <circle cy="-80" r="10" fill="#E8C4A0" stroke="${L}" stroke-width="0.9"/><path d="M-11 -82 Q0 -98 11 -82 L13 -78 H-13Z" fill="#64748B" stroke="${L}" stroke-width="0.9"/>
  <path d="M-15 -58 V-136" stroke="#57534E" stroke-width="2.4"/><path d="M-15 -136 l-4 -10 l4 -4 l4 4Z" fill="#CBD5E1"/></g>`;
const ARMY = `<g class="e124-army">${[180, 140, 100, 60, 20, -20, -60, -100, -140, -180].map((x, i) => soldier(x, i)).join('')}
  ${[130, -50].map((x) => `<g transform="translate(${x} 0)"><path d="M0 -60 V-170" stroke="#57534E" stroke-width="3"/><g class="e124-aflag" style="transform-origin:0px -160px"><path d="M0 -170 H-44 L-36 -157 L-44 -144 H0Z" fill="#1E3A8A" stroke="${L}" stroke-width="0.9"/></g></g>`).join('')}</g>`;
const RAFT = `<g class="e124-raft"><rect x="-44" y="-6" width="88" height="10" rx="3" fill="#A16207" stroke="${L}"/>${[-30, -10, 10, 30].map((x) => `<path d="M${x} -6 V4" stroke="#78350F" stroke-width="1.2"/>`).join('')}
  ${[-24, 0, 24].map((x) => `<g transform="translate(${x} -6) scale(0.7)">${soldier(0, 0)}</g>`).join('')}</g>`;

// ── Cảnh ──────────────────────────────────────────────────────────────────
const temple = (x) => `<g transform="translate(${x} ${FLOOR})">
  <rect x="-60" y="-12" width="120" height="12" fill="#A8A29E" stroke="${L}"/>
  <rect x="-48" y="-82" width="96" height="70" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/>
  ${[-36, 36].map((dx) => `<rect x="${dx - 5}" y="-82" width="10" height="70" fill="#B91C1C" stroke="${L}" stroke-width="0.9"/>`).join('')}
  <rect x="-18" y="-66" width="36" height="54" fill="#7C2D12" stroke="${L}"/>
  <g class="e124-glow"><rect x="-16" y="-64" width="32" height="50" fill="#FDE047"/><circle cx="0" cy="-40" r="34" fill="#FDE047" opacity="0.35"/></g>
  <path d="M-74 -80 L-54 -104 H54 L74 -80Z" fill="#9A3412" stroke="${L}" stroke-width="1.2"/><path d="M-54 -104 Q-64 -118 -74 -112 M54 -104 Q64 -118 74 -112" stroke="${L}" stroke-width="2.4" fill="none"/>
  <path d="M-30 -104 L-20 -116 H20 L30 -104Z" fill="#B45309" stroke="${L}"/><circle cy="-120" r="5" fill="#FACC15" stroke="${L}" stroke-width="0.7"/>
  <g transform="translate(70 0)"><rect x="-6" y="-26" width="12" height="26" fill="#A8A29E" stroke="${L}"/><path d="M-10 -26 H10 L6 -34 H-6Z" fill="#78716C" stroke="${L}" stroke-width="0.8"/>
    <g class="e124-smoke">${[0, 1, 2].map((i) => `<path class="ek-steam" style="animation-delay:${i * 0.5}s" d="M0 -36 q-4 -8 0 -16 q4 -8 0 -16" stroke="#E7E5E4" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join('')}</g></g></g>`;

function bg() {
  const segs = 8, sw = (X.wall1 - X.wall0) / segs;
  return `
  ${sky(0, W, 315, 'e124sky')}
  ${cloud(240, 60, 0.8, 0)}${cloud(900, 46, 0.9, 2)}${cloud(1500, 60, 0.8, 4)}${cloud(2100, 48, 0.9, 1)}
  ${karst(560, 1700, RIVER[0] - 6, '#A5B8A0', '#B9CBB2')}
  <!-- bờ bắc: trại quân Tống -->
  <rect x="600" y="${RIVER[0] - 10}" width="${X.now - 600}" height="14" fill="#9CB87A" stroke="${L}" stroke-width="0.8"/>
  ${[900, 1180, 1700, 1980].map((x) => `<g transform="translate(${x} ${RIVER[0] - 4})"><path d="M-20 0 L0 -26 L20 0Z" fill="#CBD5E1" stroke="${L}" stroke-width="0.8"/><path d="M0 -26 V-40" stroke="#57534E" stroke-width="1.4"/><path d="M0 -40 H-14 L-10 -35 L-14 -30 H0Z" fill="#1E3A8A"/></g>`).join('')}
  <!-- sông Như Nguyệt -->
  <rect x="600" y="${RIVER[0]}" width="${X.now - 600}" height="${RIVER[1] - RIVER[0]}" fill="#5DADC4" stroke="${L}" stroke-width="0.8"/>
  <g class="e124-flow">${Array.from({ length: 32 }, (_, i) => `<path d="M${610 + i * 54} ${RIVER[0] + 12 + (i % 3) * 14} q6 -3 12 0 q6 3 12 0" stroke="#E0F2FE" stroke-width="1.8" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <!-- bờ nam -->
  <path d="M0 ${RIVER[1] - 4} H${X.now} V315 H0Z" fill="#B9A06A" stroke="${L}"/>
  <!-- cung vua Lý -->
  <g transform="translate(${X.palace} ${FLOOR})"><rect x="-200" y="-200" width="400" height="200" fill="#FEF3C7" stroke="${L}" stroke-width="1.2"/>
    ${[-150, -90, 90, 150].map((dx) => `<rect x="${dx - 8}" y="-200" width="16" height="200" fill="#B91C1C" stroke="${L}"/>`).join('')}
    <path d="M-226 -196 L-190 -238 H190 L226 -196Z" fill="#9A3412" stroke="${L}" stroke-width="1.3"/><path d="M-190 -238 Q-206 -258 -220 -250 M190 -238 Q206 -258 220 -250" stroke="${L}" stroke-width="3" fill="none"/>
    <path d="M-60 0 V-12 H60 V0" fill="#D6A35C" stroke="${L}"/><rect x="-46" y="-96" width="92" height="84" rx="8" fill="#FACC15" stroke="${L}" stroke-width="1.2"/>
    <rect x="-38" y="-88" width="76" height="40" rx="5" fill="#B91C1C" stroke="${L}"/>
    <g transform="translate(-110 -150)"><rect x="-36" y="-14" width="72" height="26" rx="4" fill="#B91C1C" stroke="${L}"/><text y="5" text-anchor="middle" ${NUN} font-size="13" fill="#FDE68A">LY KINGS</text></g></g>
  ${tree(520, FLOOR, 0.9, '')}${bamboo(620, FLOOR, 0.8)}
  <!-- chiến luỹ đất và gỗ (dựng dần) -->
  ${Array.from({ length: segs }, (_, i) => { const a = X.wall0 + i * sw; return `<g class="e124-wl" style="transition-delay:${i * 0.18}s">
    <path d="M${a} ${RIVER[1] + 2} Q${a + 4} ${RIVER[1] - 14} ${a + 14} ${RIVER[1] - 16} H${a + sw - 14} Q${a + sw - 4} ${RIVER[1] - 14} ${a + sw} ${RIVER[1] + 2}Z" fill="#A47E58" stroke="${L}"/>
    ${Array.from({ length: Math.floor(sw / 14) }, (_, j) => `<path d="M${a + 7 + j * 14} ${RIVER[1] - 10} V${RIVER[1] - 34} l3 -5 l3 5 V${RIVER[1] - 10}" fill="#B7791F" stroke="${L}" stroke-width="0.7"/>`).join('')}</g>`; }).join('')}
  ${temple(X.temple)}
  <!-- hôm nay: phòng trưng bày -->
  <rect x="${X.now}" y="0" width="${W - X.now}" height="${FLOOR}" fill="#FEF9C3" stroke="${L}"/>
  <rect x="${X.now}" y="0" width="${W - X.now}" height="12" fill="#E9D5B5" stroke="${L}"/>
  <rect x="${X.now}" y="${FLOOR}" width="${W - X.now}" height="33" fill="#D9A066" stroke="${L}"/>
  ${Array.from({ length: 11 }, (_, i) => `<path d="M${X.now + i * 60} ${FLOOR} V315" stroke="#B9824F" stroke-width="1.2"/>`).join('')}
  <rect x="${X.now - 8}" y="0" width="16" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  ${windowBox(2400, 70, 80, 80)}
  <g transform="translate(${X.frame} 0) scale(0.8) translate(0 -8)"><rect x="-130" y="56" width="260" height="138" rx="4" fill="#A16207" stroke="${L}" stroke-width="1.4"/>
    <rect x="-118" y="66" width="236" height="118" fill="#FEF3C7" stroke="${L}"/>
    <text x="0" y="90" text-anchor="middle" ${NUN} font-size="13" fill="#92400E">The southern land</text>
    <text x="0" y="108" text-anchor="middle" ${NUN} font-size="13" fill="#92400E">belongs to the southern king.</text>
    <text x="0" y="136" text-anchor="middle" ${NUN} font-size="13" fill="#B91C1C">If enemies come here,</text>
    <text x="0" y="154" text-anchor="middle" ${NUN} font-size="13" fill="#B91C1C">they will lose.</text>
    <path d="M-90 170 H90" stroke="#D6A35C" stroke-width="1.4"/></g>
  <g transform="translate(${X.frame + 80} 0)"><rect x="-16" y="${FLOOR - 60}" width="32" height="60" fill="#E7E5E4" stroke="${L}"/><rect x="-22" y="${FLOOR - 66}" width="44" height="8" fill="#D6D3D1" stroke="${L}"/><path d="M-12 ${FLOOR - 66} q12 -22 24 0" fill="#B7791F" stroke="${L}"/></g>
  <!-- màu ảnh cũ -->
  <rect class="e124-tint" x="0" y="0" width="${X.now}" height="315" fill="#B45309"/>`;
}

function fg() {
  const SCROLL = `<g class="e124-scroll"><rect x="-132" y="-46" width="264" height="92" rx="4" fill="#FEF3C7" stroke="#92400E" stroke-width="1.6"/>
    <rect x="-142" y="-50" width="12" height="100" rx="5" fill="#B7791F" stroke="${L}"/><rect x="130" y="-50" width="12" height="100" rx="5" fill="#B7791F" stroke="${L}"/>
    <g class="e124-l1"><text y="-20" text-anchor="middle" ${NUN} font-size="14" fill="#92400E">The southern land belongs</text><text y="-2" text-anchor="middle" ${NUN} font-size="14" fill="#92400E">to the southern king.</text></g>
    <g class="e124-l2"><text y="22" text-anchor="middle" ${NUN} font-size="14" fill="#B91C1C">If enemies come here,</text><text y="40" text-anchor="middle" ${NUN} font-size="14" fill="#B91C1C">they will lose.</text></g></g>`;
  const LB = [
    ['gen', 300, 50, 'a great general', '#166534', 16], ['y1076', 1240, 50, 'In 1076', '#1E3A8A', 18], ['song', 1240, 92, 'a big Song army', '#1E3A8A', 15],
    ['bank', 1120, 50, 'the south bank', '#9A3412', 16], ['river', 1180, 92, 'the Nhu Nguyet River', '#0369A1', 15], ['wall', 1240, 50, 'a long, strong wall', '#9A3412', 16],
    ['times', 1290, 50, 'many times', '#1E3A8A', 16], ['could', 1290, 92, 'could not', '#DC2626', 16], ['say', 1330, 46, 'People say…', '#7C3AED', 15],
    ['brave', 1180, 50, 'very brave', '#DC2626', 18], ['y1077', 1240, 50, 'In 1077', '#1E3A8A', 18], ['home', 1240, 92, 'went home', '#16A34A', 16],
    ['today', 2500, 50, 'Today', '#16A34A', 17], ['decl', 2660, 302, 'first declaration of independence', '#B91C1C', 12],
  ];
  return `
  ${bush(30, FLOOR + 26, 0.6, '#65A30D')}${bush(1960, FLOOR + 28, 0.7, '#65A30D')}
  ${night(500, X.now - 500)}
  <g class="e124-nm">${speaker(330, 92, 'Ly Thuong Kiet', '#166534')}</g>
  <g transform="translate(1500 100)">${SCROLL}</g>
  ${LB.map(([k, x, y, t, c, s]) => `<g class="e124-lb e124-lb-${k}">${label(x, y, t, c, s)}</g>`).join('')}`;
}

const CSS = `
.e124-lb, .e124-nm { opacity: 0; transition: opacity .35s; }
${['gen', 'y1076', 'song', 'bank', 'river', 'wall', 'times', 'could', 'say', 'brave', 'y1077', 'home', 'today', 'decl'].map((k) => `.st-lb-${k} .e124-lb-${k}`).join(', ')} { opacity: 1; }
.st-nm .e124-nm { opacity: 1; }
.e124-tint { opacity: .18; transition: opacity .8s; pointer-events: none; }
.st-night .ek-night { opacity: 1; }
.e124-glow { opacity: 0; transition: opacity .8s; }
.st-night .e124-glow { opacity: 1; animation: e124Glow 1.2s ease-in-out infinite alternate; }
@keyframes e124Glow { from { opacity: .7; } to { opacity: 1; } }
.e124-wl { opacity: 0; transform: translateY(26px); transition: opacity .3s, transform .45s cubic-bezier(.3,1.4,.6,1); }
.st-wall .e124-wl { opacity: 1; transform: none; }
.e124-scroll { opacity: 0; transform: scaleX(.1); transition: opacity .3s, transform .8s cubic-bezier(.3,1.2,.6,1); }
.st-poem .e124-scroll { opacity: 1; transform: none; }
.e124-l1, .e124-l2 { opacity: 0; transition: opacity .5s; }
.st-poem .e124-l1 { opacity: 1; transition-delay: .6s; }
.st-poem2 .e124-l2 { opacity: 1; }
.e124-flow { animation: e124Flow 2.6s linear infinite; }
@keyframes e124Flow { from { transform: translateX(-12px); } to { transform: translateX(12px); } }
.e124-aflag { animation: e124Flag 1.1s ease-in-out infinite alternate; }
@keyframes e124Flag { from { transform: skewY(-4deg) scaleX(.9); } to { transform: skewY(4deg) scaleX(1.02); } }
.e124-flag { animation: e124Flag 1.3s ease-in-out infinite alternate; }
.is-walk .e124-sA { animation: e124Step .25s ease-in-out infinite alternate; }
.is-walk .e124-sB { animation: e124Step .25s ease-in-out infinite alternate-reverse; }
@keyframes e124Step { to { transform: translateY(-4px); } }
.act-e124shake .e124-army { animation: e124Shake .1s linear infinite alternate; }
@keyframes e124Shake { from { transform: translateX(-2px); } to { transform: translateX(2px); } }
.e124-raft { animation: e124Bob 1.4s ease-in-out infinite alternate; }
@keyframes e124Bob { to { transform: translateY(2px) rotate(1deg); } }
@media (prefers-reduced-motion: reduce) {
  .e124-flow, .e124-aflag, .e124-flag, .e124-raft { animation-duration: 5s; }
  .act-e124shake .e124-army { animation-duration: .3s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const SOL = ['s1', 's2', 's3'];
const POST = { ltk: 1240, s1: 1020, s2: 1110, s3: 1340 };

const BEATS = [
  { key: ['Ly Thuong Kiet', 'a great general of the Ly kings'], icon: '🎖️', label: 'great general', async play(st) {
    st.look(300);
    await st.walk('ltk', 330, { speed: 110, follow: false });
    st.face('ltk', -1); st.pose('ltk', 'e124_bow'); st.sfx('ding', { vol: 0.4 });
    st.set('st-nm');
    await st.wait(700);
    st.pose('king', 'give'); st.mood('king', 'joy'); st.act('king', 'nod');
    st.set('st-lb-gen'); st.sfx('lion-drum', { vol: 0.4 });
    await st.wait(1300);
    st.act('king', null); st.pose('king', 'stand'); st.pose('ltk', 'stand');
  } },
  { key: ['In 1076', 'a big Song army came from the north'], icon: '🏹', label: 'Song army', async play(st) {
    off(st, 'st-nm', 'st-lb-gen');
    st.look(1240, { dur: 1300 });
    st.set('st-lb-y1076'); st.sfx('page-turn', { vol: 0.6 });
    await st.wait(600);
    st.set('st-lb-song');
    await st.loop('steps', () => st.walk('army', 1300, { speed: 160, follow: false }), { vol: 0.6 });
    st.sfx('bump', { vol: 0.6, rate: 0.6 });
    await st.wait(500);
  } },
  { key: ['waited on the south bank', 'Nhu Nguyet River'], icon: '🛡️', label: 'south bank', async play(st) {
    off(st, 'st-lb-y1076', 'st-lb-song');
    st.look(1180);
    for (const id of SOL) st.show(id, true);
    st.place('ltk', 800, FLOOR, 1);
    await Promise.all(Object.entries(POST).map(([id, x]) => st.walk(id, x, { speed: 150, follow: false, after: id === 'ltk' ? 'stand' : 'e124_guard' })));
    st.set('st-lb-bank'); st.sfx('ding', { vol: 0.4 });
    await st.wait(600);
    st.set('st-lb-river'); st.sfx('river', { vol: 0.5 });
    st.pose('ltk', 'point'); st.act('ltk', 'point');
    await st.wait(1100);
    st.act('ltk', null); st.pose('ltk', 'stand');
  } },
  { key: ['a long, strong wall of earth and wood'], icon: '🧱', label: 'strong wall', async play(st) {
    st.set('st-lb-river', false); st.set('st-lb-bank', false);
    st.look(1200);
    for (const id of SOL) { st.hold(id, 'e124_hoe'); st.pose(id, 'dig'); st.act(id, 'dig'); }
    st.set('st-wall');
    for (let i = 0; i < 6; i++) { st.sfx(i % 2 ? 'knock' : 'dig', { vol: 0.6 }); await st.wait(260); }
    st.set('st-lb-wall'); st.sfx('ding', { vol: 0.4 });
    for (const id of SOL) { st.act(id, null); st.hold(id, 'e124_spear'); st.pose(id, 'e124_guard'); st.mood(id, 'joy'); }
    await st.wait(900);
  } },
  { key: ['tried to cross the river many times', 'they could not'], icon: '🚣', label: 'could not cross', async play(st) {
    st.set('st-lb-wall', false);
    st.look(1250);
    st.set('st-lb-times');
    await st.walk('s3', 1176, { speed: 150, follow: false, after: 'e124_guard' });
    for (const id of ['r1', 'r2']) st.show(id, true);
    for (let k = 0; k < 2; k++) {
      st.sfx('splash', { vol: 0.5 });
      await Promise.all([st.walk('r1', 1300, { y: RIVER[1] - 6, speed: 70, follow: false }), st.walk('r2', 1376, { y: RIVER[1] - 10, speed: 70, follow: false })]);
      for (const id of SOL) st.pose(id, 'e124_up');
      st.sfx('whoosh', { vol: 0.5 }); st.mood('ltk', 'joy');
      if (k === 1) st.set('st-lb-could');
      await st.wait(400);
      await Promise.all([st.walk('r1', 1290, { y: RIVER[0] + 18, speed: 90, follow: false }), st.walk('r2', 1396, { y: RIVER[0] + 14, speed: 90, follow: false })]);
      for (const id of SOL) st.pose(id, 'e124_guard');
    }
    st.sfx('buzz-no', { vol: 0.3 });
    await st.wait(500);
  } },
  { key: ['People say', 'a voice from a temple by the river read a poem', 'The southern land belongs to the southern king'], icon: '📜', label: 'a poem', async play(st) {
    off(st, 'st-lb-times', 'st-lb-could');
    for (const id of ['r1', 'r2']) st.show(id, false);
    st.look(1460);
    st.set('st-night'); st.set('st-lb-say');
    st.loop('crickets', () => st.wait(4200), { vol: 0.6 });
    await st.wait(900);
    st.sfx('sparkle', { vol: 0.4 });
    for (const id of [...SOL, 'ltk']) { st.mood(id, 'wow'); st.face(id, POST[id] < X.temple ? 1 : -1); }
    await st.wait(500);
    st.set('st-poem'); st.sfx('page-turn', { vol: 0.8 });
    await st.wait(2400);
  } },
  { key: ['If enemies come here', 'they will lose'], icon: '✍️', label: 'they will lose', async play(st) {
    st.set('st-lb-say', false);
    st.look(1440);
    st.loop('crickets', () => st.wait(2800), { vol: 0.5 });
    st.set('st-poem2'); st.sfx('ding', { vol: 0.5 });
    await st.wait(700);
    st.act('army', 'e124shake'); st.sfx('bump', { vol: 0.5, rate: 0.7 });
    for (const id of [...SOL, 'ltk']) st.mood(id, 'joy');
    await st.wait(1600);
    st.act('army', null);
  } },
  { key: ['felt very brave', 'fought even harder'], icon: '💪', label: 'very brave', async play(st) {
    off(st, 'st-night', 'st-poem', 'st-poem2');
    st.look(1200);
    for (const id of [...SOL, 'ltk']) st.face(id, 1);
    st.set('st-lb-brave'); st.sfx('lion-drum', { vol: 0.6 });
    for (const id of SOL) { st.pose(id, 'e124_up'); st.act(id, 'cheer'); st.mood(id, 'joy'); }
    st.pose('ltk', 'pointUp'); st.mood('ltk', 'joy');
    await st.wait(900);
    st.sfx('cheer', { vol: 0.6 });
    for (const id of SOL) st.act(id, null);
    await Promise.all([st.walk('s1', 1060, { speed: 150, follow: false, after: 'e124_up' }), st.walk('s2', 1160, { speed: 150, follow: false, after: 'e124_up' }), st.walk('s3', 1390, { speed: 150, follow: false, after: 'e124_up' })]);
    st.sfx('whoosh', { vol: 0.5 });
    await st.wait(600);
    for (const id of SOL) st.pose(id, 'e124_guard');
    st.pose('ltk', 'stand');
  } },
  { key: ['In 1077', 'the Song army went home'], icon: '🏠', label: 'went home', async play(st) {
    st.set('st-lb-brave', false);
    st.look(1240);
    st.set('st-lb-y1077'); st.sfx('page-turn', { vol: 0.6 });
    await st.wait(500);
    st.set('st-lb-home');
    st.face('army', 1);
    await st.loop('steps', () => st.walk('army', 2400, { speed: 220, follow: false }), { vol: 0.5 });
    st.show('army', false);
    st.sfx('cheer', { vol: 0.6 });
    for (const id of SOL) { st.pose(id, 'e124_up'); st.mood(id, 'joy'); }
    st.mood('ltk', 'joy'); st.pose('ltk', 'cheer');
    await st.wait(1200);
  } },
  { key: ['Today', 'our first declaration of independence'], icon: '🖼️', label: 'declaration', async play(st) {
    off(st, 'st-lb-y1077', 'st-lb-home');
    st.look(2620, { instant: true });
    st.set('st-lb-today'); st.sfx('ding', { vol: 0.4 });
    st.walk('minh', 2530, { speed: 120, follow: false });
    await st.walk('lan', 2476, { speed: 120, follow: false });
    st.face('minh', 1); st.face('lan', 1);
    st.pose('minh', 'pointUp'); st.mood('minh', 'wow'); st.mood('lan', 'joy');
    st.set('st-lb-decl'); st.sfx('sparkle', { vol: 0.3 });
    await st.wait(1500);
    st.pose('minh', 'stand');
  } },
];

export default {
  id: 'en124', worldW: W, floor: FLOOR, viewTop: 30, camStart: 40, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 2, 3, 5, 7, 9],
  cast: [
    { id: 'army', kind: 'thing', x: 2300, y: RIVER[0] - 2, s: 0.5, face: -1, svg: ARMY, box: [-200, -180, 400, 184] },
    { id: 'r1', kind: 'thing', x: 1290, y: RIVER[0] + 18, s: 0.72, svg: RAFT, box: [-50, -110, 100, 116] },
    { id: 'r2', kind: 'thing', x: 1396, y: RIVER[0] + 14, s: 0.7, face: -1, svg: RAFT, box: [-50, -110, 100, 116] },
    { id: 'king', kind: 'adult', who: 'e124_king', x: 200 },
    { id: 'kcrown', kind: 'thing', x: 200, y: FLOOR - 166, svg: crown(), box: [-20, -26, 40, 28] },
    { id: 's1', kind: 'adult', who: 'e124_s1', x: 760, s: 0.92 },
    { id: 's2', kind: 'adult', who: 'e124_s2', x: 820, s: 0.92 },
    { id: 's3', kind: 'adult', who: 'e124_s3', x: 880, s: 0.92 },
    { id: 'ltk', kind: 'adult', who: 'e124_ltk', x: 480, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 2340, s: 1.05 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 2420 },
  ],
  init(st) {
    for (const id of ['r1', 'r2', ...SOL]) st.show(id, false);
    for (const id of SOL) { st.hold(id, 'e124_spear'); st.pose(id, 'e124_guard'); }
    st.face('ltk', -1);
  },
};
