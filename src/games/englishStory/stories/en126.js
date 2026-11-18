/**
 * Bài 126 "The Orange in His Hand" (too … to; so that; mệnh đề who): Trần Quốc Toản bóp nát quả cam, lá cờ sáu chữ vàng.
 * Một thế giới đi từ trái sang phải: biên giới năm 1282 (sau dãy đồi phía bắc, cờ xám và mũ quân Nguyên nhô lên dày đặc)
 * → bến Bình Than (sông phía sau, thuyền rồng có lọng vàng: vua Trần Nhân Tông và các quan họp bàn quanh tấm bản đồ;
 * hai lính gác ở cầu ván) → đường về → trang ấp của Quốc Toản (nhà mái ngói, tre, cột cờ; dân làng kéo tới) → cánh đồng,
 * cờ xám quân Nguyên ở chân trời đổ xuống khi đoàn quân cờ đỏ tiến lên (đánh giặc diễn tượng trưng, không máu me).
 * Toạ độ cảnh: rộng 2300, cao 315, sàn y = 282, mặt sông y = 244, sàn thuyền y = 250.
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, cloud, label, thought, water, sun } from '../kit.js';
import { HAT, wear, robe, fig, ARMOR, skyG, hills, ground, bamboo, palace, flag, dragonBoat, PROPS, vsCss, lb, lbCss, off, NUN } from './vietsuKit.js';

const P = 'e126';
const FLOOR = 282, DECK = 250;
const W = 2300;
const X = { plank: 990, king: 1070, home: 1780, pole: 1610, field: 2120 };

Object.assign(CAST, {
  e126_toan: { hair: 'bun', top: 'robe', shirt: '#1D4ED8', trimC: '#FACC15', shoe: '#1C1917' },
  e126_king: { adult: true, hair: 'short', top: 'robe', shirt: '#FACC15', trimC: '#DC2626', shoe: '#1C1917', beard: true, moustache: true },
  e126_lord1: { adult: true, hair: 'short', top: 'robe', shirt: '#B91C1C', trimC: '#FACC15', shoe: '#1C1917', hat: 'mandarin', beard: true },
  e126_lord2: { adult: true, hair: 'short', top: 'robe', shirt: '#15803D', trimC: '#FDE68A', shoe: '#1C1917', hat: 'mandarin', moustache: true },
  e126_lord3: { adult: true, old: true, hair: 'short', hairC: '#E7E5E4', top: 'robe', shirt: '#1E40AF', trimC: '#FDE68A', shoe: '#1C1917', hat: 'mandarin', beard: true },
  e126_guard: { adult: true, hair: 'short', top: 'tee', shirt: '#B91C1C', bottom: 'pants', bottomC: '#1F2937', shoe: '#1C1917' },
  e126_man1: { adult: true, hair: 'short', top: 'tee', shirt: '#A16207', bottom: 'pants', bottomC: '#44403C', shoe: '#57534E' },
  e126_man2: { adult: true, hair: 'short', top: 'tee', shirt: '#4D7C0F', bottom: 'pants', bottomC: '#1F2937', shoe: '#57534E', moustache: true },
  e126_man3: { adult: true, hair: 'short', top: 'tee', shirt: '#78716C', bottom: 'pants', bottomC: '#44403C', shoe: '#57534E' },
});

const POSES = {
  e126_spear: { R: [22, 6], L: [10, 4] },
  e126_cross: { R: [88, 128], L: [10, 4] },
  e126_grip: { R: [34, -104], L: [16, -60], head: 9 },
  e126_squeeze: { R: [40, -118], L: [24, -96], head: 4 },
  e126_flagUp: { R: [150, 168], L: [40, 60] },
  e126_lead: { R: [120, 150], L: [10, 4] },
};

// ── Hình nhỏ ──────────────────────────────────────────────────────────────────────────────
/** Lính Nguyên nhô sau đồi (đầu + vai), gốc ở vai. */
const foe = (x, y, d) => `<g class="${P}-foe" style="transition-delay:${d}s"><g transform="translate(${x} ${y})"><path d="M-12 14 Q-12 0 0 0 Q12 0 12 14Z" fill="#6B7280" stroke="${L}" stroke-width="0.8"/>
  <circle cy="-8" r="8" fill="#F5D0B5" stroke="${L}" stroke-width="0.8"/><g transform="translate(0 -8) scale(0.5)">${HAT.enemy}</g></g></g>`;
const greyFlag = (x, y, h, d, cls = `${P}-gf`) => `<g class="${cls}" style="transition-delay:${d}s;transform-origin:${x}px ${y}px">${flag(P, x, y, { h, w: 30, hh: 22, c: '#6B7280' })}</g>`;
/** Bản đồ nhỏ trên bàn họp, mũi tên kế hoạch vẽ dần (.st-plan). */
const MAP = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-30" y="-9" width="60" height="16" rx="2" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/>
  <path d="M-18 -4 Q-10 0 -14 4 M4 -6 Q10 -2 6 4" stroke="#22C55E" stroke-width="1.6" fill="none"/>
  <path class="${P}-plan" d="M-24 2 Q-6 -10 16 -2 L12 -6 M16 -2 L11 1" stroke="#DC2626" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`;
/** Tấm bản đồ trong bong bóng nghĩ: đất nước (xanh) và mũi tên xám của giặc từ phía bắc. */
const COUNTRY = `<g><path d="M-14 -36 Q4 -40 10 -28 Q2 -18 6 -8 Q16 4 12 16 Q6 30 -6 36 Q2 22 -2 10 Q-14 0 -18 -14 Q-22 -28 -14 -36Z" fill="#4ADE80" stroke="${L}" stroke-width="1"/>
  <text x="-2" y="0" text-anchor="middle" ${NUN} font-size="7" fill="#166534">Dai Viet</text>
  ${[[-36, -40], [-24, -46], [30, -44]].map(([x, y]) => `<path d="M${x} ${y} L${x * 0.45} ${y * 0.75}" stroke="#6B7280" stroke-width="3" stroke-linecap="round"/><path d="M${x * 0.45 - 4} ${y * 0.75 - 4} L${x * 0.45} ${y * 0.75} L${x * 0.45 + 2} ${y * 0.75 - 6}" stroke="#6B7280" stroke-width="2.4" fill="none"/>`).join('')}
  <path d="M28 -6 q4 -8 10 -4 q6 -4 10 4 q-2 8 -10 14 q-8 -6 -10 -14Z" fill="#F87171" stroke="${L}" stroke-width="0.8"/></g>`;
/** Lá cờ sáu chữ vàng (cột cờ ở trang ấp), kéo lên bằng .st-flag. */
const BIGFLAG = `<g transform="translate(${X.pole} 0)"><path d="M0 ${FLOOR} V60" stroke="#7C4A1E" stroke-width="4.4" stroke-linecap="round"/><circle cy="58" r="4" fill="#FACC15" stroke="${L}" stroke-width="0.8"/>
  <g class="${P}-raise"><g class="${P}-wave" style="transform-origin:0px 96px"><path d="M0 64 H122 Q112 96 122 128 H0Z" fill="#DC2626" stroke="${L}" stroke-width="1.2"/>
    <text x="58" y="88" text-anchor="middle" ${NUN} font-size="10.5" fill="#FACC15">PHÁ CƯỜNG ĐỊCH</text>
    <text x="58" y="106" text-anchor="middle" ${NUN} font-size="10.5" fill="#FACC15">BÁO HOÀNG ÂN</text>
    <path d="M10 116 H106" stroke="#FACC15" stroke-width="1.4" stroke-dasharray="3 3"/></g></g></g>`;

function bg() {
  const crowd = Array.from({ length: 36 }, (_, i) => {
    const r = Math.floor(i / 12), x = 1880 + (i % 12) * 18 + r * 8, y = 236 + r * 9, k = 1.1 + r * 0.12;
    return `<g class="${P}-cr" style="transition-delay:${(i % 12) * 0.07 + r * 0.25}s"><g transform="translate(${x} ${y}) scale(${k})"><path d="M-7 14 Q-7 2 0 2 Q7 2 7 14Z" fill="${['#A16207', '#4D7C0F', '#78716C'][i % 3]}" stroke="${L}" stroke-width="0.6"/>
      <circle cy="-4" r="6" fill="#F5D0B5" stroke="${L}" stroke-width="0.6"/><path d="M-6 -6 Q0 -12 6 -6" stroke="#DC2626" stroke-width="3" fill="none"/></g></g>`;
  }).join('');
  return `
  ${skyG(0, W, `${P}sky`, '#7DD3FC', '#FEF9C3')}
  <g transform="translate(700 70)">${sun(20)}</g>
  ${cloud(160, 60, 0.8, 0)}${cloud(620, 46, 0.7, 2)}${cloud(1260, 58, 0.9, 4)}${cloud(1900, 50, 0.8, 1)}
  <!-- biên giới phía bắc: giặc sau đồi -->
  ${hills(-20, 620, 236, '#9CA3AF', 70)}
  <g class="${P}-army">${[40, 90, 150, 210, 270, 330, 400, 470, 530].map((x, i) => greyFlag(x, 232 - (i % 3) * 10, 60 + (i % 2) * 14, i * 0.07)).join('')}
    ${[60, 115, 175, 240, 300, 360, 430, 500, 75, 200, 330, 460].map((x, i) => foe(x, i < 8 ? 222 : 212, 0.2 + i * 0.1)).join('')}</g>
  ${hills(-20, 620, 250, '#86C49A', 46)}
  <!-- sông Bình Than phía sau bến -->
  <rect x="0" y="240" width="${W}" height="${FLOOR - 240}" fill="#A3D977"/>
  ${hills(500, 960, 238, '#A7D7B0', 50)}
  ${water(0, 1460, 238, '#60A5FA')}
  <g transform="translate(${X.king + 70} 276)">${dragonBoat(`
    <g transform="translate(-112 -26)"><path d="M0 0 V-150" stroke="#7C4A1E" stroke-width="3"/><path d="M-44 -132 Q0 -170 44 -132 Q30 -128 22 -132 Q11 -128 0 -132 Q-11 -128 -22 -132 Q-30 -128 -44 -132Z" fill="#FACC15" stroke="${L}" stroke-width="1"/>
      ${[-36, -18, 0, 18, 36].map((x) => `<path d="M${x} -132 v10" stroke="#DC2626" stroke-width="2"/>`).join('')}</g>
    <g class="${P}-lords">${fig(-10, -18, 'e126_lord1', { pose: 'sit', s: 0.9 })}${fig(80, -18, 'e126_lord2', { pose: 'sit', s: 0.9, flip: true })}${fig(36, -24, 'e126_lord3', { pose: 'sit', s: 0.82 })}
      <rect x="6" y="-38" width="60" height="6" rx="2" fill="#92400E" stroke="${L}" stroke-width="0.8"/>${MAP(36, -46)}</g>`, { roof: false })}</g>
  <!-- bờ và đường -->
  ${ground(0, W, FLOOR, '#C9B27C', '#A8915E')}
  <path d="M${X.plank - 40} ${FLOOR + 2} L${X.king - 30} ${DECK + 2}" stroke="${L}" stroke-width="7" stroke-linecap="round"/><path d="M${X.plank - 40} ${FLOOR + 2} L${X.king - 30} ${DECK + 2}" stroke="#CA8A04" stroke-width="5" stroke-linecap="round"/>
  <!-- trang ấp của Quốc Toản -->
  ${hills(1440, 860, 250, '#9BD39C', 60)}
  ${bamboo(1500, FLOOR, 0.9)}${bamboo(2020, FLOOR, 0.85)}
  ${palace(X.home, FLOOR, 220, { roof: '#B45309', wall: '#FEF3C7' })}
  ${crowd}
  ${BIGFLAG}
  <!-- cánh đồng, cờ giặc ở chân trời -->
  <g class="${P}-far">${[2140, 2190, 2240, 2280].map((x, i) => greyFlag(x, 252, 70 + (i % 2) * 12, 0.4 + i * 0.3, `${P}-ff`)).join('')}</g>`;
}

function fg() {
  return `
  ${thought(712, 104, 200, 118, `<g transform="scale(1.15)">${COUNTRY}</g>`, [842, 150], `${P}-bub`)}
  ${lb(P, 'year', label(250, 92, 'In 1282', '#B91C1C', 18))}
  ${lb(P, 'yuan', label(300, 140, 'Yuan army', '#475569', 15))}
  ${lb(P, 'bt', label(X.king + 60, 64, 'Binh Than', '#1D4ED8', 16))}
  ${lb(P, 'plan', label(X.king + 106, 108, 'plan the fight', '#B91C1C', 13))}
  ${lb(P, 'age', label(760, 92, '15 or 16', '#EA580C', 16))}
  ${lb(P, 'young', label(930, 96, 'too young', '#DC2626', 15))}
  ${lb(P, 'home', label(X.home, 64, 'home', '#7C4A1E', 15))}
  ${lb(P, 'men', label(1890, 92, 'about 1000 men', '#B91C1C', 15))}
  ${lb(P, 'six', label(X.pole + 150, 74, 'six words in gold', '#B45309', 14))}
  ${lb(P, 'brave', label(2010, 70, 'bravely', '#B91C1C', 18))}`;
}

const CSS = `
${lbCss(P, ['year', 'yuan', 'bt', 'plan', 'age', 'young', 'home', 'men', 'six', 'brave'])}
.${P}-foe, .${P}-gf { opacity: 0; transform: translateY(30px); transition: opacity .3s, transform .5s cubic-bezier(.3,1.4,.6,1); }
.st-yuan .${P}-foe, .st-yuan .${P}-gf { opacity: 1; transform: none; }
.${P}-lords { opacity: 0; transition: opacity .5s; }
.st-lords .${P}-lords { opacity: 1; }
.${P}-plan { stroke-dasharray: 60; stroke-dashoffset: 60; }
.st-plan .${P}-plan { stroke-dashoffset: 0; transition: stroke-dashoffset 1.6s linear; }
.${P}-bub { opacity: 0; transform: scale(.4); transform-origin: 830px 150px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-bub .${P}-bub { opacity: 1; transform: none; }
.${P}-cr { opacity: 0; transform: translateY(8px); transition: opacity .3s, transform .3s; }
.st-crowd .${P}-cr { opacity: 1; transform: none; }
.${P}-raise { transform: translateY(150px) scaleY(.15); transform-origin: 0 220px; opacity: 0; transition: transform 1.6s cubic-bezier(.3,.9,.4,1), opacity .2s; }
.st-flag .${P}-raise { transform: none; opacity: 1; }
.${P}-ff { transition: transform .7s ease-in, opacity .7s; }
.st-fall .${P}-ff { transform: rotate(80deg); opacity: 0; }
`;

const tell = async (st, id, ms) => { st.talk(id, true); await st.wait(ms); st.talk(id, false); };
const MEN = ['m1', 'm2', 'm3'];

const BEATS = [
  { key: ['In 1282', 'a huge Yuan army'], icon: '🏴', label: 'Yuan army', async play(st) {
    st.look(270, { instant: true });
    st.set('st-lb-year'); st.sfx('wind', { vol: 0.4 });
    await st.wait(700);
    st.set('st-yuan'); st.sfx('lion-drum', { vol: 0.7 });
    await st.wait(900);
    st.set('st-lb-yuan'); st.sfx('lion-drum', { vol: 0.5, rate: 0.85 });
    await st.wait(1500);
  } },
  { key: ['called a meeting at Binh Than', 'plan the fight'], icon: '🚣', label: 'meeting at Binh Than', async play(st) {
    off(st, 'st-lb-year', 'st-lb-yuan');
    await st.look(X.king + 80, { dur: 1600 });
    st.set('st-lb-bt'); st.sfx('ding', { vol: 0.6 });
    st.pose('king', 'raise'); st.mood('king', 'happy');
    await st.wait(500);
    st.set('st-lords'); st.sfx('steps', { vol: 0.4 });
    const talk = tell(st, 'king', 2400);
    await st.wait(700);
    st.pose('king', 'point'); st.set('st-lb-plan'); st.set('st-plan');
    await st.loop('pencil', () => st.wait(1500), { vol: 0.6 });
    await talk;
    st.pose('king', 'stand');
  } },
  { key: ['young lord', 'fifteen or sixteen'], icon: '👦', label: 'a young lord', async play(st) {
    off(st, 'st-lb-bt', 'st-lb-plan');
    st.place('toan', 420, FLOOR, 1);
    st.look(760, { dur: 900 });
    await st.walk('toan', 780, { speed: 110, follow: false });
    st.mood('toan', 'joy');
    st.set('st-lb-age'); st.sfx('pop', { vol: 0.6 });
    st.pose('toan', 'me');
    await st.wait(1400);
    st.pose('toan', 'stand');
  } },
  { key: ['wanted to join the meeting', 'too young to come in'], icon: '🚫', label: 'too young', async play(st) {
    st.set('st-lb-age', false);
    st.look(880);
    await st.walk('toan', 900, { speed: 110, follow: false });
    st.pose('toan', 'point'); st.mood('toan', 'happy');
    await st.wait(500);
    st.pose('g1', 'e126_cross'); st.pose('g2', 'e126_cross'); st.sfx('knock', { vol: 0.6, rate: 1.3 });
    await st.wait(300);
    st.set('st-lb-young'); st.sfx('buzz-no', { vol: 0.5 });
    const say = st.say('g2', 'Too young!', 1600);
    st.act('g2', 'no');
    await st.wait(600);
    st.pose('toan', 'sad'); st.mood('toan', 'sad');
    await say;
    st.act('g2', null);
    await st.walk('toan', 860, { speed: 70, follow: false });
    st.face('toan', 1);
  } },
  { key: ['After the meeting', 'the king gave him an orange'], icon: '🍊', label: 'an orange', async play(st) {
    st.set('st-lb-young', false);
    st.set('st-lords', false); st.sfx('steps', { vol: 0.3 });
    st.pose('g1', 'e126_spear'); st.pose('g2', 'e126_spear');
    st.look(960);
    await Promise.all([st.walk('g1', 1150, { speed: 120, follow: false }), st.walk('g2', 1210, { speed: 120, follow: false })]);
    st.face('g1', -1); st.face('g2', -1);
    await st.walk('king', X.plank - 30, { y: FLOOR, speed: 80, follow: false });
    await st.walk('king', 935, { speed: 80, follow: false });
    st.face('king', -1);
    st.pose('king', 'give'); st.mood('king', 'joy'); st.mood('toan', 'wow');
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(PROPS.vs_orange.replace('translate(0 -5)', 'translate(0 0) scale(1.6)'), [915, 190], [878, 214], { size: 26, dur: 600 });
    st.hold('toan', 'vs_orange'); st.pose('toan', 'e126_grip'); st.sfx('pop', { vol: 0.6 });
    st.mood('toan', 'happy');
    await st.wait(1000);
    st.pose('king', 'stand');
  } },
  { key: ['thinking about his country', 'crushed the orange in his hand'], icon: '✊', label: 'crushed the orange', async play(st) {
    st.look(850);
    st.pose('toan', 'e126_grip'); st.mood('toan', 'sad');
    st.set('st-bub'); st.sfx('pop', { vol: 0.4 });
    await st.wait(1600);
    st.pose('toan', 'e126_squeeze'); st.mood('toan', 'shut');
    await st.wait(300);
    st.hold('toan', 'vs_crushed'); st.sfx('crunch', { vol: 0.7 });
    st.fx('drops', 874, 196);
    await st.wait(500);
    st.mood('king', 'wow');
    st.set('st-bub', false);
    st.mood('toan', 'wow'); st.pose('toan', 'e126_grip');
    await st.wait(1200);
  } },
  { key: ['went home', 'about a thousand men'], icon: '👥', label: 'a thousand men', async play(st) {
    st.hold('toan', null); st.pose('toan', 'stand'); st.mood('toan', 'happy');
    st.walk('king', X.king, { y: DECK, speed: 100, follow: false });
    st.set('st-lb-home');
    await st.walk('toan', X.home - 40, { speed: 150, lead: 80 });
    st.set('st-lb-home', false);
    st.face('toan', 1);
    st.set('st-crowd'); st.sfx('cheer', { vol: 0.4 });
    await Promise.all(MEN.map((id, i) => st.walk(id, 1880 + i * 44, { speed: 130, follow: false })));
    MEN.forEach((id) => st.face(id, -1));
    st.set('st-lb-men'); st.sfx('ding', { vol: 0.5 });
    st.pose('m1', 'raise'); st.pose('m3', 'raise'); st.mood('toan', 'joy');
    await st.wait(1300);
    st.pose('m1', 'stand'); st.pose('m3', 'stand');
  } },
  { key: ['a flag with six words in gold'], icon: '🚩', label: 'six words in gold', async play(st) {
    st.set('st-lb-men', false);
    st.look(X.pole + 70);
    await st.walk('toan', X.pole + 26, { speed: 120, follow: false });
    st.face('toan', -1);
    st.pose('toan', 'raise');
    st.set('st-flag'); st.sfx('whoosh', { vol: 0.5 });
    await st.loop('wind', () => st.wait(1600), { vol: 0.5 });
    st.set('st-lb-six'); st.sfx('sparkle', { vol: 0.4 });
    st.face('toan', 1); st.pose('toan', 'cheer'); st.mood('toan', 'joy');
    MEN.forEach((id) => { st.pose(id, 'cheer'); st.mood(id, 'joy'); });
    st.sfx('cheer', { vol: 0.5 });
    await st.wait(1500);
    MEN.forEach((id) => st.pose(id, 'stand'));
  } },
  { key: ['fought bravely against the Yuan army'], icon: '🛡️', label: 'fought bravely', async play(st) {
    st.set('st-lb-six', false);
    st.chest('toan', ARMOR('#B45309')); wear(st, 'toan', HAT.band);
    MEN.forEach((id) => { st.hold(id, 'vs_spear'); st.pose(id, 'e126_spear'); st.mood(id, 'happy'); });
    st.hold('toan', 'vs_flagUp'); st.pose('toan', 'e126_flagUp'); st.mood('toan', 'joy');
    st.sfx('lion-drum', { vol: 0.7 });
    st.look(2060, { dur: 3200 });
    await Promise.all([
      st.walk('toan', 2090, { speed: 120, follow: false }),
      ...MEN.map((id, i) => st.walk(id, 1960 + i * 42, { speed: 120, follow: false })),
    ]);
    st.set('st-fall'); st.sfx('lion-drum', { vol: 0.6 });
    st.pose('toan', 'e126_flagUp');
    await st.wait(1100);
    st.set('st-lb-brave'); st.sfx('cheer', { vol: 0.6 });
    MEN.forEach((id) => st.mood(id, 'joy'));
    await st.wait(1400);
  } },
];

export default {
  id: P, worldW: W, floor: FLOOR, viewTop: 40, camStart: 30, css: KIT_CSS + vsCss(P) + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 3, 4, 5, 7],
  cast: [
    { id: 'king', kind: 'adult', who: 'e126_king', x: X.king, y: DECK, face: -1 },
    { id: 'g1', kind: 'adult', who: 'e126_guard', x: X.plank - 70, s: 0.96 },
    { id: 'g2', kind: 'adult', who: 'e126_guard', x: X.plank, s: 0.96, face: -1 },
    { id: 'm1', kind: 'adult', who: 'e126_man1', x: 2420, s: 0.95 },
    { id: 'm2', kind: 'adult', who: 'e126_man2', x: 2470, s: 0.95 },
    { id: 'm3', kind: 'adult', who: 'e126_man3', x: 2520, s: 0.95 },
    { id: 'toan', kind: 'kid', who: 'e126_toan', x: -120, s: 1.2 },
  ],
  init(st) {
    wear(st, 'king', HAT.king); robe(st, 'king'); robe(st, 'toan');
    for (const id of ['g1', 'g2']) { wear(st, id, HAT.soldier); st.hold(id, 'vs_spear'); st.pose(id, 'e126_spear'); }
    for (const id of MEN) wear(st, id, HAT.band);
  },
};
