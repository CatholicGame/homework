/**
 * Bài 122 "The Stakes in the River" (quá khứ đơn; first / then / after that / finally). Một thế giới đi từ trái sang phải,
 * cả cảnh nhuộm màu ảnh cũ: rừng (lính chặt cây) → trại của Ngô Quyền (lều, cờ, đẽo cọc, bịt mũi sắt) → bờ sông → sông
 * Bạch Đằng (bãi cọc giữa sông, rừng đước bờ bên kia) → cửa biển (thuyền giặc tới từ bên phải).
 * Thuỷ triều là lớp nước ở fg dâng lên / rút xuống (st-high / st-low), che hay lộ hàng cọc; thuyền giặc nổi theo mặt nước.
 * Trận đánh diễn tượng trưng: thuyền nhỏ ra khiêu chiến rồi quay về, thuyền giặc đuổi vào, nước rút, thuyền mắc cọc nghiêng
 * và đứng yên, không ai bị thương.
 * Toạ độ cảnh: rộng 2700, cao 315, sàn (bờ) y = 282. Mặt nước: cao 200, vừa 232, thấp 262.
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, speaker, thought, sun } from '../kit.js';
import { karst, flag, boat, crown } from './vietsu-art.js';

const FLOOR = 282;
const W = 2700;
const BANK = 900;               // mép bờ sông
const STK = [1300, 1360, 1420, 1480, 1540, 1600, 1660, 1720, 1780]; // hàng cọc
const WL = { high: 200, mid: 232, low: 262 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e122_nq: { adult: true, hair: 'short', top: 'robe', shirt: '#991B1B', trimC: '#FACC15', bottom: 'pants', bottomC: '#7F1D1D', shoe: '#44403C', hat: 'scarf', trim: ['#7F1D1D', '#FACC15', '#FDE68A'], beard: true, moustache: true },
  e122_s1: { adult: true, hair: 'short', top: 'blouse', shirt: '#8B5E3C', bottom: 'pants', bottomC: '#292524', shoe: '#57534E', hat: 'scarf', trim: ['#B91C1C', '#FDE68A', '#FDE68A'] },
  e122_s2: { adult: true, hair: 'short', top: 'blouse', shirt: '#6B4423', bottom: 'pants', bottomC: '#1C1917', shoe: '#57534E', hat: 'scarf', trim: ['#B91C1C', '#FDE68A', '#FDE68A'], moustache: true },
  e122_s3: { adult: true, hair: 'short', top: 'blouse', shirt: '#7C2D12', bottom: 'pants', bottomC: '#292524', shoe: '#57534E', hat: 'scarf', trim: ['#B91C1C', '#FDE68A', '#FDE68A'] },
});

const PROPS = {
  e122_axe: `<g transform="rotate(180)"><path d="M0 -4 V30" stroke="${L}" stroke-width="3.6" stroke-linecap="round"/><path d="M0 -4 V30" stroke="#A16207" stroke-width="2"/>
    <path d="M-2 22 L-14 18 Q-16 26 -14 34 L-2 30Z" fill="#CBD5E1" stroke="${L}" stroke-width="0.8"/></g>`,
  e122_hammer: `<g transform="rotate(180)"><path d="M0 -4 V22" stroke="${L}" stroke-width="3.4" stroke-linecap="round"/><path d="M0 -4 V22" stroke="#A16207" stroke-width="1.8"/>
    <rect x="-8" y="20" width="16" height="8" rx="1.5" fill="#64748B" stroke="${L}" stroke-width="0.8"/></g>`,
};
const POSES = {
  e122_chopUp: { R: [150, 200], L: [140, 196] },
  e122_chopDn: { R: [70, 40], L: [64, 36], head: 6 },
  e122_hamUp: { R: [140, 210], L: [30, -60], head: 8 },
  e122_hamDn: { R: [60, 30], L: [30, -60], head: 8 },
  e122_salute: { R: [100, 160], L: [10, 4] },
};

// ── Thuyền giặc (gốc = giữa mặt nước, nhìn sang trái) ──────────────────────────────────────
const enemyHead = (x, y) => `<g transform="translate(${x} ${y})"><circle r="8" fill="#E8C4A0" stroke="${L}" stroke-width="0.8"/><path d="M-9 -1 Q0 -15 9 -1 L10 2 H-10Z" fill="#64748B" stroke="${L}" stroke-width="0.8"/><circle cx="-3" cy="1" r="1.1" fill="#2B1D16"/></g>`;
const SHIP = `<g class="e122-ship">
  <path d="M-112 -30 Q-120 -46 -126 -52 L-96 -36 H86 L118 -58 Q116 -22 96 6 Q0 18 -86 6 Q-104 -10 -112 -30Z" fill="#57534E" stroke="${L}" stroke-width="1.3"/>
  <path d="M-100 -26 H98" stroke="#A8A29E" stroke-width="2"/><path d="M-90 -12 Q0 -2 92 -12" stroke="#44403C" stroke-width="1.4" fill="none"/>
  ${[-60, 20].map((x) => `<path d="M${x} -36 V-160" stroke="#44403C" stroke-width="3.4"/><path d="M${x + 4} -152 Q${x + 48} -150 ${x + 52} -128 L${x + 54} -54 Q${x + 26} -46 ${x + 4} -50Z" fill="#94A3B8" stroke="${L}" stroke-width="1.1"/>
    ${[-136, -116, -96, -76].map((y) => `<path d="M${x + 4} ${y} Q${x + 30} ${y + 4} ${x + 53} ${y}" stroke="#64748B" stroke-width="1.3" fill="none"/>`).join('')}`).join('')}
  <path d="M20 -160 V-176" stroke="#44403C" stroke-width="2"/><g class="e122-eflag" style="transform-origin:20px -170px"><path d="M20 -178 H-14 L-8 -168 L-14 -158 H20Z" fill="#1E3A8A" stroke="${L}" stroke-width="0.8"/></g>
  ${enemyHead(-80, -46)}${enemyHead(-2, -46)}${enemyHead(70, -46)}
  <g class="e122-q"><circle cx="-80" cy="-74" r="11" fill="#fff" stroke="${L}"/><text x="-80" y="-69" text-anchor="middle" ${NUN} font-size="15" fill="#1E3A8A">?</text></g></g>`;
const VBOAT = `<g class="e122-vb">${boat('#92400E', 3)}<g transform="translate(-46 -14)"><path d="M0 0 V-50" stroke="#78350F" stroke-width="2"/><path d="M0 -50 H24 L19 -43 L24 -36 H0Z" fill="#DC2626" stroke="${L}" stroke-width="0.7"/></g></g>`;
const LOG = `<rect x="-40" y="-6" width="80" height="12" rx="6" fill="#A16207" stroke="${L}" stroke-width="1"/><ellipse cx="40" cy="0" rx="4" ry="6" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>`;
const STAKE = (h = 90) => `<path d="M-5 0 V${-h + 14} L0 ${-h} L5 ${-h + 14} V0Z" fill="#A16207" stroke="${L}" stroke-width="1"/><path d="M-5 ${-h + 14} L0 ${-h} L5 ${-h + 14}Z" fill="#94A3B8" stroke="${L}" stroke-width="0.9"/>`;

// ── Cảnh ──────────────────────────────────────────────────────────────────
function bg() {
  return `
  ${sky(0, W, 315, 'e122sky')}
  <g class="e122-sun" transform="translate(1500 60)">${sun(22)}</g>
  ${cloud(200, 60, 0.8, 0)}${cloud(900, 46, 0.9, 2)}${cloud(1600, 64, 0.8, 4)}${cloud(2300, 50, 0.9, 1)}
  ${karst(500, 1500, 196, '#93B3A5', '#A9C6B8')}
  <!-- bờ bên kia: rừng đước -->
  <rect x="${BANK - 40}" y="186" width="${2400 - BANK}" height="20" fill="#4D7C5A" stroke="${L}" stroke-width="0.8"/>
  ${Array.from({ length: 26 }, (_, i) => `<ellipse cx="${BANK + 10 + i * 58}" cy="186" rx="34" ry="13" fill="${i % 2 ? '#3F7D4E' : '#4F9160'}" stroke="${L}" stroke-width="0.7"/>`).join('')}
  <!-- lòng sông -->
  <rect x="${BANK - 40}" y="200" width="${W - BANK + 40}" height="115" fill="#7FB3C2"/>
  <rect x="${BANK - 40}" y="296" width="${W - BANK + 40}" height="19" fill="#8B6B4A" stroke="${L}" stroke-width="0.8"/>
  <!-- cọc hàng sau -->
  <g class="e122-stk">${STK.map((x, i) => `<g class="e122-k e122-k${i % 3}"><g transform="translate(${x + 26} 302) rotate(${i % 2 ? 6 : -4})">${STAKE(70)}</g></g>`).join('')}</g>
  <!-- rừng -->
  ${tree(70, FLOOR, 1.15, '')}${tree(300, FLOOR, 1.1, '')}
  <g class="e122-fall" style="transform-origin:190px ${FLOOR}px">${tree(190, FLOOR, 1.25, '')}</g>
  <g class="e122-stump"><rect x="182" y="${FLOOR - 10}" width="16" height="10" fill="#A16207" stroke="${L}"/><ellipse cx="190" cy="${FLOOR - 10}" rx="8" ry="2.6" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/></g>
  <!-- bờ và trại -->
  <path d="M0 ${FLOOR} H${BANK} Q${BANK + 30} ${FLOOR + 6} ${BANK + 50} 315 H0Z" fill="#C9A86B" stroke="${L}"/>
  <g transform="translate(560 ${FLOOR})"><path d="M-80 0 L0 -96 L80 0Z" fill="#E7D3A8" stroke="${L}" stroke-width="1.3"/><path d="M-20 0 L0 -60 L20 0Z" fill="#7C5A3A" stroke="${L}"/>
    <path d="M0 -96 V-110" stroke="${L}" stroke-width="2"/></g>
  ${flag(660, FLOOR, 150, '#DC2626', 'e122')}
  <!-- đống gỗ, cọc đã đẽo -->
  <g class="e122-logs">${[0, 1, 2].map((i) => `<g transform="translate(${400 + (i % 2) * 8} ${FLOOR - 7 - i * 12})">${LOG}</g>`).join('')}</g>
  ${[0, 1, 2].map((i) => `<g class="e122-pile e122-pile${i}"><g transform="translate(${760 + i * 16} ${FLOOR}) rotate(${-8 + i * 6})">${STAKE(76)}</g></g>`).join('')}
  <!-- màu ảnh cũ -->
  <rect class="e122-tint" x="0" y="0" width="${W}" height="315" fill="#B45309"/>`;
}

function fg() {
  const PLAN = `<path d="M-50 10 Q0 2 50 10" stroke="#38BDF8" stroke-width="10" fill="none"/>
    ${[-30, -15, 0, 15, 30].map((x) => `<path d="M${x - 3} 18 V8 L${x} 2 L${x + 3} 8 V18" fill="#A16207" stroke="${L}" stroke-width="0.6"/>`).join('')}
    <g class="e122-pl"><path d="M44 -2 Q34 -8 26 -3 Q16 2 8 -1 L8 -7 L-6 -7 L-6 -1" stroke="#475569" stroke-width="0" fill="#94A3B8"/>
      <path d="M48 -16 Q20 -28 -30 -12" stroke="#DC2626" stroke-width="2.4" fill="none" stroke-dasharray="5 3"/><path d="M-26 -18 L-34 -11 L-24 -8Z" fill="#DC2626"/>
      <text x="0" y="-24" text-anchor="middle" ${NUN} font-size="11" fill="#1D4ED8">tide ↓</text></g>`;
  const LB = [
    ['gen', 560, 54, 'a great general', '#B91C1C', 16], ['y938', 2360, 54, 'In 938', '#1E3A8A', 18], ['han', 2360, 96, 'Southern Han', '#1E3A8A', 15],
    ['first', 190, 54, 'First', '#EA580C', 18], ['then', 640, 54, 'Then', '#EA580C', 18], ['iron', 740, 96, 'iron tips', '#475569', 14],
    ['river', 1540, 54, 'the Bach Dang River', '#0369A1', 16], ['high', 1950, 54, 'high tide', '#0369A1', 18], ['cant', 2130, 54, 'could not see', '#1E3A8A', 15],
    ['after', 1700, 54, 'After that', '#EA580C', 17], ['follow', 1650, 54, 'followed', '#1E3A8A', 17], ['out', 1600, 54, 'the tide went out', '#0369A1', 16],
    ['stuck', 1600, 54, 'got stuck', '#DC2626', 17], ['free', 870, 54, 'Finally, free!', '#16A34A', 18], ['y939', 760, 54, 'In 939', '#B45309', 18], ['king', 760, 96, 'King Ngo Quyen', '#B45309', 15],
  ];
  return `
  <!-- cọc hàng trước (đè lên thân thuyền) -->
  <g class="e122-stk">${STK.map((x, i) => `<g class="e122-k e122-k${(i + 1) % 3}"><g transform="translate(${x} 315) rotate(${i % 2 ? -5 : 4})">${STAKE(90)}</g></g>`).join('')}</g>
  <!-- nước sông (thuỷ triều) -->
  <g class="e122-water"><rect x="${BANK - 10}" y="${WL.high}" width="${W - BANK + 10}" height="${315 - WL.high + 70}" fill="#3B9AB8" opacity="0.93"/>
    <path d="M${BANK - 10} ${WL.high} H${W}" stroke="#BAE6FD" stroke-width="2.4"/>
    <g class="e122-wave">${Array.from({ length: 36 }, (_, i) => `<path d="M${BANK + 10 + i * 50} ${WL.high + 14 + (i % 3) * 14} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g></g>
  ${bush(30, FLOOR + 26, 0.7, '#65A30D')}${bush(860, FLOOR + 22, 0.6, '#65A30D')}
  <g class="e122-nm">${speaker(560, 92, 'Ngo Quyen', '#B91C1C')}</g>
  ${thought(470, 90, 150, 100, `<rect x="-62" y="-34" width="124" height="66" rx="6" fill="#FEF3C7"/>${PLAN}`, [540, 124], 'e122-think')}
  <g class="e122-lb e122-lb-plan">${label(470, 168, 'a clever plan', '#1D4ED8', 15)}</g>
  ${LB.map(([k, x, y, t, c, s]) => `<g class="e122-lb e122-lb-${k}">${label(x, y, t, c, s)}</g>`).join('')}`;
}

const CSS = `
.e122-lb, .e122-nm { opacity: 0; transition: opacity .35s; }
${['gen', 'y938', 'han', 'plan', 'first', 'then', 'iron', 'river', 'high', 'cant', 'after', 'follow', 'out', 'stuck', 'free', 'y939', 'king'].map((k) => `.st-lb-${k} .e122-lb-${k}`).join(', ')} { opacity: 1; }
.st-nm .e122-nm { opacity: 1; }
.e122-tint { opacity: .18; transition: opacity .8s; pointer-events: none; }
.st-free .e122-tint { opacity: .06; }
.e122-flag, .e122-eflag { animation: e122Flag 1.3s ease-in-out infinite alternate; }
@keyframes e122Flag { from { transform: skewY(-3deg) scaleX(.94); } to { transform: skewY(3deg) scaleX(1.02); } }
.e122-water { transform: translateY(${WL.mid - WL.high}px); transition: transform 1.8s ease-in-out; }
.st-high .e122-water { transform: none; }
.st-low .e122-water { transform: translateY(${WL.low - WL.high}px); }
.e122-wave { animation: e122Wave 2.6s ease-in-out infinite alternate; }
@keyframes e122Wave { to { transform: translateX(16px); } }
.e122-k { opacity: 0; transform: translateY(40px); transition: opacity .3s, transform .4s cubic-bezier(.3,1.4,.6,1); }
.st-k0 .e122-k0, .st-k1 .e122-k1, .st-k2 .e122-k2 { opacity: 1; transform: none; }
.e122-fall { transition: transform 1s cubic-bezier(.5,0,.9,.6); }
.st-fall .e122-fall { transform: rotate(84deg); }
.st-gone .e122-fall { opacity: 0; transition: opacity .3s; }
.e122-pile { opacity: 0; transform: translateY(-20px); transition: opacity .25s, transform .35s cubic-bezier(.3,1.5,.6,1); }
.st-p0 .e122-pile0, .st-p1 .e122-pile1, .st-p2 .e122-pile2 { opacity: 1; transform: none; }
.st-placed .e122-pile, .st-placed .e122-logs { opacity: 0; transition: opacity .4s; }
.e122-think { opacity: 0; transform: scale(.4); transform-origin: 540px 130px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-think .e122-think { opacity: 1; transform: none; }
.e122-pl { clip-path: inset(0 0 0 100%); }
.st-think .e122-pl { clip-path: inset(0 0 0 0); transition: clip-path 1.4s linear .5s; }
.e122-q { opacity: 0; transition: opacity .3s; }
.act-e122q .e122-q { opacity: 1; }
.e122-ship { transform-box: view-box; transform-origin: 0px 0px; transition: transform .5s cubic-bezier(.3,1.6,.6,1); }
.is-walk .e122-ship { animation: e122Rock 1.4s ease-in-out infinite alternate; }
@keyframes e122Rock { from { transform: rotate(-1.5deg); } to { transform: rotate(1.5deg); } }
.act-e122shake .e122-ship { animation: e122Shake .12s linear 4 alternate; }
@keyframes e122Shake { from { translate: -2px 0; } to { translate: 2px 0; } }
.e122-vb { animation: e122Bob 1.6s ease-in-out infinite alternate; }
@keyframes e122Bob { to { transform: translateY(2px) rotate(.6deg); } }
.is-walk .e122-vb .oar { animation: e122Oar .5s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: 50% 0; }
@keyframes e122Oar { from { transform: rotate(-16deg); } to { transform: rotate(18deg); } }
.e122-sun { opacity: .4; transition: opacity 1s; }
.st-free .e122-sun { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .e122-wave, .e122-vb { animation-duration: 6s; }
  .is-walk .e122-ship { animation-duration: 3s; }
  .is-walk .e122-vb .oar { animation-duration: 1s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const SHIPS = [['sh1', 2160], ['sh2', 2360], ['sh3', 2560]];
/** Thuyền giặc nổi theo mặt nước (y = mực nước), cùng lúc với lớp nước. */
const float = (st, y, ms = 1800) => Promise.all(SHIPS.map(([id]) => {
  const A = st.a(id), d = Math.abs(A.y - y);
  return d < 1 ? null : st.walk(id, A.x, { y, speed: (d / ms) * 1000, follow: false });
}));
/** Thuyền mắc cọc: nghiêng hẳn (vẽ lại hình, giữ cả khi nhảy câu). */
const tilt = (st, id, deg) => { const A = st.a(id); A.custom = `<g transform="translate(0 6) rotate(${deg})">${SHIP}</g>`; A.build(); };
const swing = async (st, ids, up, dn, n, sound, gap = 300) => {
  for (let i = 0; i < n; i++) {
    ids.forEach((id) => st.pose(id, up)); await st.wait(gap);
    ids.forEach((id) => st.pose(id, dn)); st.sfx(sound.name, sound.opt); await st.wait(gap);
  }
};

const BEATS = [
  { key: ['Ngo Quyen', 'a great general'], icon: '🎖️', label: 'great general', async play(st) {
    st.look(560);
    st.set('st-nm'); st.sfx('ding', { vol: 0.4 });
    st.mood('nq', 'joy');
    await st.wait(600);
    st.set('st-lb-gen');
    for (const id of ['s1', 's2']) { st.pose(id, 'e122_salute'); st.mood(id, 'joy'); }
    st.sfx('cheer', { vol: 0.4 });
    await st.wait(1400);
    for (const id of ['s1', 's2']) st.pose(id, 'stand');
  } },
  { key: ['In 938', 'ships from the Southern Han'], icon: '⛵', label: 'In 938 · ships', async play(st) {
    off(st, 'st-nm', 'st-lb-gen');
    st.look(2360, { instant: true });
    st.set('st-lb-y938'); st.sfx('page-turn', { vol: 0.6 });
    const go = Promise.all(SHIPS.map(([id, x]) => st.walk(id, x, { speed: 120, follow: false })));
    await st.wait(600);
    st.sfx('boat-horn', { vol: 0.5, rate: 0.8 });
    st.set('st-lb-han');
    await st.loop('river', () => go, { vol: 0.6 });
    await st.wait(500);
  } },
  { key: ['had a clever plan'], icon: '💡', label: 'clever plan', async play(st) {
    off(st, 'st-lb-y938', 'st-lb-han');
    st.look(560, { instant: true });
    st.face('nq', -1); st.pose('nq', 'think'); st.mood('nq', 'happy');
    st.set('st-think'); st.sfx('pop', { vol: 0.5 });
    await st.wait(500);
    st.sfx('pencil', { vol: 0.6 });
    await st.wait(1400);
    st.set('st-lb-plan'); st.mood('nq', 'joy'); st.pose('nq', 'pointUp'); st.sfx('ding', { vol: 0.5 });
    await st.wait(900);
  } },
  { key: ['First', 'cut tall trees'], icon: '🪓', label: 'cut trees', async play(st) {
    off(st, 'st-think', 'st-lb-plan');
    st.pose('nq', 'stand'); st.face('nq', 1);
    st.look(260);
    st.set('st-lb-first');
    st.hold('s1', 'e122_axe'); st.hold('s2', 'e122_axe');
    st.place('s1', 130, FLOOR, 1); st.place('s2', 250, FLOOR, -1);
    await swing(st, ['s1', 's2'], 'e122_chopUp', 'e122_chopDn', 3, { name: 'knock', opt: { vol: 0.8, rate: 0.8 } });
    st.set('st-fall'); st.sfx('whoosh', { vol: 0.6 });
    st.mood('s1', 'wow'); st.mood('s2', 'wow');
    await st.wait(950);
    st.sfx('bump', { vol: 0.9 }); st.fx('poof', 290, FLOOR - 20, { quiet: true });
    await st.wait(600);
    st.mood('s1', 'joy'); st.mood('s2', 'joy');
  } },
  { key: ['Then', 'big wooden stakes with iron tips'], icon: '🔨', label: 'stakes · iron tips', async play(st) {
    off(st, 'st-lb-first'); st.set('st-gone');
    st.look(630);
    st.set('st-lb-then');
    st.hold('s1', 'e122_hammer'); st.hold('s2', 'e122_hammer');
    st.place('s1', 470, FLOOR, 1); st.place('s2', 720, FLOOR, 1);
    for (let i = 0; i < 3; i++) {
      await swing(st, ['s1', 's2'], 'e122_hamUp', 'e122_hamDn', 2, { name: 'knock', opt: { vol: 0.7, rate: 1.3 } }, 220);
      st.set(`st-p${i}`); st.sfx('pop', { vol: 0.5 });
      if (i === 1) { st.set('st-lb-iron'); st.sfx('ding', { vol: 0.4, rate: 1.5 }); }
    }
    for (const id of ['s1', 's2']) { st.pose(id, 'stand'); st.mood(id, 'joy'); }
    await st.wait(500);
  } },
  { key: ['put the stakes in the Bach Dang River'], icon: '🪵', label: 'stakes in river', async play(st) {
    off(st, 'st-lb-then', 'st-lb-iron');
    st.set('st-placed');
    for (const id of ['s1', 's2']) { st.hold(id, null); st.show(id, false); }
    st.look(1540);
    st.set('st-low'); st.sfx('drip', { vol: 0.4 });
    st.set('st-lb-river');
    st.show('vb1', true); st.place('vb1', 1180, WL.low, 1);
    const row = st.walk('vb1', 1800, { speed: 150, follow: false });
    for (let i = 0; i < 3; i++) { await st.wait(900); st.set(`st-k${i}`); st.sfx('knock', { vol: 0.8, rate: 0.9 + i * 0.1 }); st.sfx('splash', { vol: 0.4 }); }
    await row;
    await st.wait(300);
  } },
  { key: ['At high tide', 'covered the stakes', 'could not see them'], icon: '🌊', label: 'high tide', async play(st) {
    off(st, 'st-lb-river', 'st-low');
    st.show('vb1', false);
    st.look(1700);
    st.set('st-high'); st.set('st-lb-high');
    st.loop('river', () => st.wait(2000), { vol: 0.8 }); st.sfx('splash', { vol: 0.4 });
    await float(st, WL.high, 1800);
    st.look(2050, { dur: 1200 });
    SHIPS.forEach(([id]) => st.act(id, 'e122q')); st.set('st-lb-cant'); st.sfx('pop', { vol: 0.4 });
    await st.wait(1500);
  } },
  { key: ['After that', 'small boats came out to fight', 'ran away'], icon: '🚣', label: 'small boats', async play(st) {
    off(st, 'st-lb-high', 'st-lb-cant');
    st.set('st-lb-after');
    st.look(1800, { dur: 1000 });
    for (const id of ['vb1', 'vb2']) st.show(id, true);
    st.place('vb1', 1300, WL.high, 1); st.place('vb2', 1220, WL.high + 6, 1);
    st.sfx('lion-drum', { vol: 0.5, rate: 0.85 });
    await Promise.all([st.walk('vb1', 1960, { speed: 260, follow: false }), st.walk('vb2', 1880, { speed: 260, follow: false })]);
    st.sfx('splash', { vol: 0.5 });
    await st.wait(300);
    st.sfx('whoosh', { vol: 0.6 });
    await Promise.all([st.walk('vb1', 1250, { speed: 300, follow: false }), st.walk('vb2', 1160, { speed: 300, follow: false })]);
  } },
  { key: ['The enemy ships followed them into the river'], icon: '⛵', label: 'followed', async play(st) {
    st.set('st-lb-after', false);
    st.look(1650, { dur: 2600 });
    st.set('st-lb-follow'); st.sfx('boat-horn', { vol: 0.5, rate: 0.8 });
    const go = Promise.all([['sh1', 1400], ['sh2', 1600], ['sh3', 1800]].map(([id, x]) => st.walk(id, x, { speed: 260, follow: false })));
    st.walk('vb1', 1000, { speed: 200, follow: false }); st.walk('vb2', 940, { speed: 200, follow: false });
    await st.loop('river', () => go, { vol: 0.7 });
    for (const id of ['vb1', 'vb2']) st.show(id, false);
  } },
  { key: ['Then the tide went out'], icon: '🏖️', label: 'tide went out', async play(st) {
    off(st, 'st-lb-follow', 'st-high');
    st.look(1600);
    st.set('st-low'); st.set('st-lb-out');
    st.loop('river', () => st.wait(1800), { vol: 0.8 }); st.sfx('drip', { vol: 0.6 });
    await float(st, 238, 1800);
    await st.wait(500);
  } },
  { key: ['hit the sharp stakes', 'got stuck'], icon: '📌', label: 'got stuck', async play(st) {
    st.set('st-lb-out', false);
    st.look(1600);
    for (const [[id], deg] of SHIPS.map((s, i) => [s, [-7, 6, -4][i]])) {
      st.act(id, 'e122shake'); st.sfx('crunch', { vol: 0.9, rate: 0.6 }); st.sfx('bump', { vol: 0.6 });
      await st.wait(260); tilt(st, id, deg); await st.wait(220);
    }
    SHIPS.forEach(([id]) => st.act(id, 'e122q')); st.set('st-lb-stuck'); st.sfx('buzz-no', { vol: 0.4 });
    await st.wait(1500);
  } },
  { key: ['Finally', 'a thousand years of northern rule', 'our country was free'], icon: '🎉', label: 'free', async play(st) {
    off(st, 'st-lb-stuck');
    st.look(870);
    st.set('st-free'); st.set('st-lb-free'); st.sfx('cheer', { vol: 0.7 });
    for (const id of ['s1', 's2']) st.show(id, true);
    st.place('s1', 820, FLOOR, 1); st.place('s2', 870, FLOOR, 1);
    st.place('nq', 740, FLOOR, 1); st.pose('nq', 'cheer'); st.mood('nq', 'joy');
    for (const id of ['s1', 's2']) { st.pose(id, 'cheer'); st.act(id, 'cheer'); st.mood(id, 'joy'); }
    st.show('vb1', true); st.place('vb1', 1060, WL.low, -1); st.walk('vb1', 1000, { speed: 60, follow: false });
    st.fx('sparkle', 1060, 120);
    await st.wait(1800);
    for (const id of ['s1', 's2']) st.act(id, null);
  } },
  { key: ['In 939', 'Ngo Quyen became king'], icon: '👑', label: 'became king', async play(st) {
    st.set('st-lb-free', false);
    st.look(800);
    for (const id of ['s1', 's2']) st.pose(id, 'stand');
    st.pose('nq', 'stand');
    st.set('st-lb-y939'); st.sfx('page-turn', { vol: 0.6 });
    await st.wait(500);
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(crown(), [900, 60], [740, FLOOR - 172], { size: 40, dur: 700 });
    st.place('crown', 740, FLOOR - 166); st.show('crown', true); st.fx('sparkle', 740, FLOOR - 186);
    st.set('st-lb-king'); st.pose('nq', 'open'); st.sfx('cheer', { vol: 0.5 });
    for (const id of ['s1', 's2']) { st.pose(id, 'e122_salute'); st.mood(id, 'joy'); }
    await st.wait(1500);
  } },
];

export default {
  id: 'en122', worldW: W, floor: FLOOR, viewTop: 30, camStart: 250, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [1, 3, 5, 7, 10, 12],
  cast: [
    { id: 'sh3', kind: 'thing', x: 2900, y: WL.mid, s: 0.72, face: 1, svg: SHIP, box: [-130, -182, 252, 200] },
    { id: 'sh2', kind: 'thing', x: 2800, y: WL.mid, s: 0.76, face: 1, svg: SHIP, box: [-130, -182, 252, 200] },
    { id: 'sh1', kind: 'thing', x: 2700, y: WL.mid, s: 0.8, face: 1, svg: SHIP, box: [-130, -182, 252, 200] },
    { id: 'vb2', kind: 'thing', x: 1220, y: WL.high, s: 0.9, svg: VBOAT, box: [-70, -70, 140, 80] },
    { id: 'vb1', kind: 'thing', x: 1300, y: WL.high, s: 0.95, svg: VBOAT, box: [-70, -70, 140, 80] },
    { id: 's1', kind: 'adult', who: 'e122_s1', x: 460, s: 0.92 },
    { id: 's2', kind: 'adult', who: 'e122_s2', x: 660, s: 0.92, face: -1 },
    { id: 'nq', kind: 'adult', who: 'e122_nq', x: 560 },
    { id: 'crown', kind: 'thing', x: 740, y: FLOOR - 166, svg: crown(), box: [-20, -26, 40, 28] },
  ],
  init(st) {
    for (const id of ['vb1', 'vb2', 'crown']) st.show(id, false);
  },
};
