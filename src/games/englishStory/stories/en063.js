/**
 * Bài 63 "Friends for Five Years" (hiện tại hoàn thành: for / since): đi từ trái sang phải: Sydney (nhà hát Con Sò, bến cảng)
 * → biển (máy bay chở Tom 6 tuổi) → Hà Nội (Tháp Rùa, nhà Tom, lịch lật 5 năm) → lớp 1 (Tom ngồi cạnh Minh, cô Hoa)
 * → sân bóng (cùng đội, Tom bắt gôn, Minh chạy nhanh) → cổng nhà Minh (Lucky chạy ra đón Tom).
 * Hai bạn lúc nhỏ thu nhỏ (s 0.84), học tiếng Việt từ lớp 1 rồi lớn dần lên (s 1.08).
 * Toạ độ cảnh: rộng 2320, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { dogSvg } from '../rig.js';
import { KIT_CSS, L, sky, cloud, tree, bush, flowerAt, label, room, doorway, windowBox, water, fence, board, thought, BALL } from '../kit.js';

Object.assign(CAST, {
  e063_minh_kit: { hair: 'spiky', top: 'tee', shirt: '#EF4444', bottom: 'shorts', bottomC: '#F8FAFC', shoe: '#1F2937' },
  e063_tom_kit: { hair: 'neat', hairC: '#E0A33A', top: 'tee', shirt: '#FACC15', bottom: 'shorts', bottomC: '#1F2937', shoe: '#1F2937' },
});

const FLOOR = 282;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { opera: 220, sea: 430, hanoi: 700, house: 1000, school: 1110, desk: 1390, schoolEnd: 1500, goal: 1930, gate: 2090, home: 2230 };
const SMALL = 0.84, BIG = 1.08;

// ── Đồ vật ─────────────────────────────────────────────────────────────────
/** Máy bay chở Tom (mũi sang phải, gốc giữa thân), Tom nhìn qua ô cửa. */
const PLANE = `<path d="M-60 -6 Q-60 -18 -44 -18 H40 Q62 -18 66 -4 Q62 8 40 8 H-44 Q-60 8 -60 -6Z" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <path d="M-52 -18 L-64 -44 H-48 L-28 -18Z" fill="#3B82F6" stroke="${L}" stroke-width="1.2"/><path d="M-8 0 L-30 30 H-14 L18 0Z" fill="#93C5FD" stroke="${L}" stroke-width="1.2"/>
  <path d="M-44 -4 H50" stroke="#3B82F6" stroke-width="3"/>${[-30, -16, 16, 30].map((x) => `<circle cx="${x}" cy="-9" r="3" fill="#BAE6FD" stroke="${L}" stroke-width="0.6"/>`).join('')}
  <circle cx="2" cy="-9" r="7" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/><g transform="translate(2 -8)">${headOnly('en_tom', { mood: 'joy', s: 0.32 })}</g>`;
const BALL_T = `<g class="e063-roll" style="transform-origin:0px -8px"><g transform="translate(0 -8)">${BALL('#fff')}</g></g>`;
const KEEPER_BALL = `<g transform="translate(0 4)">${BALL('#fff')}</g>`;

const POSES = {
  e063_keeper: { R: [100, 140], L: [100, 140], dy: 8, head: 4 },
  e063_catch: { R: [160, 178], L: [160, 178], head: -6 },
  e063_kick: { R: [60, 70], L: [40, 30], head: 6 },
  e063_proud: { R: [70, -40], L: [24, -120], head: -8 },
  e063_hug: { R: [100, 110], L: [100, 110] },
  e063_hand: { R: [70, 70], L: [22, -40], dy: 20 },
  e063_raiseSit: { R: [160, 178], L: [22, -40], dy: 20 },
};
const PROPS = { e063_ball: KEEPER_BALL };

function bg() {
  return `
  ${sky(0, 2320, 315, 'e063sky')}
  ${cloud(160, 60, 0.9, 0)}${cloud(560, 90, 0.7, 2)}${cloud(900, 54, 0.8, 4)}${cloud(1700, 60, 0.9, 1)}${cloud(2150, 80, 0.7, 3)}
  <!-- Sydney: bến cảng + nhà hát Con Sò -->
  ${water(0, X.sea + 300, 262, '#38BDF8')}
  <rect x="40" y="${FLOOR - 26}" width="${X.sea - 40}" height="40" fill="#D6D3D1" stroke="${L}"/>
  <g transform="translate(${X.opera} ${FLOOR - 26})"><rect x="-90" y="-10" width="180" height="12" fill="#FDE68A" stroke="${L}"/>
    ${[[-70, 50, 40], [-36, 64, 46], [4, 74, 50], [42, 56, 40]].map(([x, h, w]) => `<path d="M${x} -10 Q${x + w * 0.2} ${-h} ${x + w} ${-h - 4} Q${x + w * 0.7} ${-h * 0.4} ${x + w * 0.8} -10Z" fill="#fff" stroke="${L}" stroke-width="1.2"/><path d="M${x + w * 0.3} -12 Q${x + w * 0.5} ${-h * 0.6} ${x + w * 0.8} ${-h}" stroke="#E2E8F0" stroke-width="1.4" fill="none"/>`).join('')}</g>
  <g transform="translate(70 ${FLOOR - 26})"><path d="M-30 0 Q40 -110 110 0" stroke="#64748B" stroke-width="6" fill="none"/><path d="M-40 -20 H120" stroke="#475569" stroke-width="4"/>${[0, 20, 40, 60, 80].map((x) => `<path d="M${x - 10} -20 V${-20 - Math.max(0, 70 - Math.abs(x - 40) * 1.6)}" stroke="#64748B" stroke-width="1.2"/>`).join('')}</g>
  ${label(X.opera, 150, 'Sydney', '#2563EB', 16)}
  <!-- Hà Nội: hồ, Tháp Rùa, nhà Tom -->
  <path d="M${X.hanoi} 230 Q900 214 1110 226 V${FLOOR} H${X.hanoi}Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <rect x="${X.hanoi}" y="${FLOOR - 4}" width="${X.school - X.hanoi}" height="40" fill="#4ADE80" stroke="${L}"/>
  <g transform="translate(800 ${FLOOR - 12})"><ellipse rx="80" ry="12" fill="#38BDF8" stroke="${L}"/><g transform="translate(0 -4)"><rect x="-14" y="-18" width="28" height="18" fill="#FEF3C7" stroke="${L}"/><rect x="-10" y="-32" width="20" height="14" fill="#FEF3C7" stroke="${L}"/>
    <path d="M-18 -18 H18 L13 -23 H-13Z M-14 -32 H14 L0 -42Z" fill="#B45309" stroke="${L}"/><path d="M-4 0 V-9 Q0 -13 4 -9 V0" fill="#92400E"/></g></g>
  ${tree(740, FLOOR - 4, 0.7, '')}
  ${label(800, 150, 'Ha Noi', '#DC2626', 16)}
  <g transform="translate(${X.house} 0)"><rect x="-56" y="120" width="112" height="${FLOOR - 120}" fill="#FDE68A" stroke="${L}"/><rect x="-62" y="112" width="124" height="10" rx="2" fill="#F8FAFC" stroke="${L}"/>
    <rect x="-40" y="140" width="80" height="36" fill="#BAE6FD" stroke="${L}"/><path d="M0 140 V176" stroke="${L}"/><rect x="-46" y="180" width="92" height="6" fill="#16A34A" stroke="${L}" stroke-width="0.6"/>
    <rect x="-20" y="${FLOOR - 64}" width="40" height="64" fill="#B45309" stroke="${L}"/><path d="M48 112 V70" stroke="#78716C" stroke-width="2"/><rect x="48" y="70" width="26" height="17" fill="#DA251D"/><path d="M61 74 l1.6 4.4 h4.6 l-3.7 2.8 l1.4 4.4 l-3.9 -2.7 l-3.9 2.7 l1.4 -4.4 l-3.7 -2.8 h4.6Z" fill="#FFFF00"/></g>
  <!-- lớp 1 -->
  ${room(X.school, X.schoolEnd - X.school, FLOOR, '#FEF3C7')}
  ${board(1150, 70, 150, 70, 'Grade 1')}
  ${windowBox(1340, 64, 80, 64)}
  ${doorway(X.schoolEnd - 10, FLOOR)}
  <!-- sân bóng -->
  <rect x="${X.schoolEnd}" y="${FLOOR - 70}" width="${X.gate - X.schoolEnd}" height="70" fill="#86EFAC"/>
  <rect x="${X.schoolEnd}" y="${FLOOR - 4}" width="${X.gate - X.schoolEnd}" height="40" fill="#22C55E" stroke="${L}"/>
  ${Array.from({ length: 6 }, (_, i) => `<rect x="${X.schoolEnd + i * 100}" y="${FLOOR - 4}" width="50" height="40" fill="#16A34A" opacity="0.4"/>`).join('')}
  <path d="M${X.schoolEnd + 10} ${FLOOR + 14} H${X.gate - 20}" stroke="#fff" stroke-width="2"/>
  <g transform="translate(${X.goal} 0)"><path d="M-40 ${FLOOR} V196 H40 V${FLOOR}" stroke="#fff" stroke-width="5" fill="none" stroke-linejoin="round"/><path d="M-40 ${FLOOR} V196 H40 V${FLOOR}" stroke="${L}" stroke-width="0.8" fill="none"/>
    ${Array.from({ length: 7 }, (_, i) => `<path d="M${-34 + i * 11} 200 V${FLOOR}" stroke="#E2E8F0" stroke-width="0.8"/>`).join('')}${Array.from({ length: 7 }, (_, i) => `<path d="M-38 ${206 + i * 11} H38" stroke="#E2E8F0" stroke-width="0.8"/>`).join('')}</g>
  ${tree(1560, FLOOR - 70, 0.8, '')}
  <!-- nhà Minh -->
  <rect x="${X.gate}" y="${FLOOR - 4}" width="${2320 - X.gate}" height="40" fill="#4ADE80" stroke="${L}"/>
  <g transform="translate(${X.home + 20} 0)"><path d="M-90 140 L0 92 L90 140Z" fill="#F97316" stroke="${L}" stroke-width="1.2"/><rect x="-80" y="140" width="160" height="${FLOOR - 140}" fill="#FEF3C7" stroke="${L}" stroke-width="1.2"/>
    <rect x="-60" y="162" width="36" height="30" fill="#BAE6FD" stroke="${L}"/><rect x="26" y="162" width="36" height="30" fill="#BAE6FD" stroke="${L}"/><rect x="-16" y="206" width="32" height="${FLOOR - 206}" fill="#92400E" stroke="${L}"/></g>
  <!-- nhãn -->
  <g class="e063-lb e063-lb-six">${label(X.house - 120, 150, 'age 6', '#EA580C', 15)}</g>
  <g class="e063-lb e063-lb-five">${label(X.house, 92, 'five years', '#16A34A', 15)}</g>
  <g class="e063-lb e063-lb-first">${label(X.desk, 152, 'first day', '#DB2777', 14)}</g>
  <g class="e063-lb e063-lb-viet">${label(1225, 160, 'Vietnamese', '#DC2626', 14)}</g>
  <g class="e063-lb e063-lb-well">${label(X.desk + 30, 104, 'very well!', '#16A34A', 14)}</g>
  <g class="e063-lb e063-lb-team">${label(1700, 118, 'same team: 3 years', '#DC2626', 14)}</g>
  <g class="e063-lb e063-lb-keeper">${label(X.goal, 150, 'goalkeeper', '#CA8A04', 13)}</g>
  <g class="e063-lb e063-lb-fast">${label(1780, 118, 'fast!', '#DC2626', 14)}</g>
  <g class="e063-lb e063-lb-friends">${label(X.gate - 40, 110, '5 years', '#DB2777', 16)}</g>
  <g class="e063-lb e063-lb-forever">${label(X.gate - 40, 110, 'friends forever', '#7C3AED', 16)}</g>`;
}

function fg() {
  return `
  <!-- lịch treo trước nhà Tom: lật 5 năm -->
  <g class="e063-cal" transform="translate(${X.house - 120} 138)"><rect x="-24" y="-22" width="48" height="46" rx="4" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-24" y="-22" width="48" height="12" rx="3" fill="#EF4444" stroke="${L}"/>
    ${[1, 2, 3, 4, 5].map((n) => `<text class="e063-y e063-y${n}" y="18" text-anchor="middle" ${NUN} font-size="26" fill="#1F2937">${n}</text>`).join('')}</g>
  <!-- bàn đôi (che chân hai bạn ngồi) -->
  <g transform="translate(${X.desk} ${FLOOR})"><rect x="-62" y="-58" width="124" height="9" rx="2" fill="#F59E0B" stroke="${L}"/><rect x="-56" y="-49" width="7" height="49" fill="#78716C" stroke="${L}" stroke-width="0.7"/><rect x="49" y="-49" width="7" height="49" fill="#78716C" stroke="${L}" stroke-width="0.7"/>
    <rect x="-60" y="-49" width="120" height="22" fill="#FDE68A" stroke="${L}" opacity="0.95"/></g>
  ${bush(1640, FLOOR + 8, 0.7)}
  <!-- cổng nhà Minh -->
  <g transform="translate(${X.gate} 0)"><rect x="-8" y="192" width="16" height="${FLOOR - 192}" fill="#E7E5E4" stroke="${L}"/><rect x="56" y="192" width="16" height="${FLOOR - 192}" fill="#E7E5E4" stroke="${L}"/></g>
  ${fence(X.gate + 80, 70, FLOOR + 4)}${Array.from({ length: 4 }, (_, i) => flowerAt(2300 - i * 10, FLOOR + 6, ['#F472B6', '#FACC15'][i % 2])).join('')}
  <g class="e063-b e063-b-puppy">${thought(X.home - 10, 112, 120, 78, `<g transform="translate(-24 18) scale(0.5)">${dogSvg()}</g><g transform="translate(26 4)">${headOnly('en_tom', { mood: 'joy', s: 0.6 })}</g><g transform="translate(-22 -26)">${label(0, 4, 'puppy', '#92400E', 11)}</g>`, [X.home - 40, 214])}</g>`;
}

const CSS = `
.e063-lb { opacity: 0; transition: opacity .35s; }
${['six', 'five', 'first', 'viet', 'well', 'team', 'keeper', 'fast', 'friends', 'forever'].map((k) => `.st-lb-${k} .e063-lb-${k}`).join(', ')} { opacity: 1; }
.e063-cal { opacity: 0; transition: opacity .3s; }
.st-cal .e063-cal { opacity: 1; }
.e063-y { opacity: 0; }
.st-y1 .e063-y1, .st-y2 .e063-y2, .st-y3 .e063-y3, .st-y4 .e063-y4, .st-y5 .e063-y5 { opacity: 1; }
.e063-b { opacity: 0; transform: scale(.5); transform-box: fill-box; transform-origin: 30% 90%; transition: opacity .3s, transform .35s cubic-bezier(.3, 1.4, .6, 1); }
.st-b-puppy .e063-b-puppy { opacity: 1; transform: none; }
.es-thing.is-walk .e063-roll { animation: e063Roll .3s linear infinite; }
@keyframes e063Roll { to { transform: rotate(360deg); } }
.es-thing.e063-fly .e063-tilt { animation: e063Tilt 1.2s ease-in-out infinite alternate; }
@media (prefers-reduced-motion: reduce) {
  .es-thing.is-walk .e063-roll { animation-duration: .8s; }
  .e063-b { transition: opacity .5s, transform .5s ease-out; }
}
`;

/** Lớn lên dần: đổi cỡ nhân vật theo bậc (mỗi bậc một tiếng pop). */
async function grow(st, ids, to) {
  const from = st.a(ids[0]).s;
  for (const t of [1 / 3, 2 / 3, 1]) {
    for (const id of ids) { const A = st.a(id); A.s = from + (to - from) * t; A.size(); }
    st.sfx('pop', { vol: 0.35, rate: 0.9 + t * 0.3 });
    await st.wait(260);
  }
}

const BEATS = [
  { key: ['from Sydney', 'when he was six'], icon: '✈️', label: 'from Sydney', async play(st) {
    st.look(240);
    st.sfx('plane', { vol: 0.6 });
    await st.wait(300);
    await st.walk('plane', X.house - 140, { y: 230, speed: 300, lead: 40 });
    st.sfx('bump', { vol: 0.4 });
    st.show('plane', false); st.fx('poof', X.house - 140, 230, { quiet: true }); st.sfx('poof', { vol: 0.5 });
    st.show('tom', true); st.mood('tom', 'joy'); st.pose('tom', 'wave'); st.act('tom', 'wave');
    await st.wait(300);
    st.set('st-lb-six'); st.sfx('ding', { vol: 0.4 });
    await st.wait(900);
    st.act('tom', null);
  } },
  { key: ['lived in Viet Nam', 'five years'], icon: '🏠', label: 'five years', async play(st) {
    st.set('st-lb-six', false); st.pose('tom', 'stand');
    await st.walk('tom', X.house - 40, { speed: 110, lead: -40 });
    st.set('st-cal');
    for (let n = 1; n <= 5; n++) {
      st.set(`st-y${n - 1}`, false); st.set(`st-y${n}`); st.sfx('page-turn', { vol: 0.5 });
      await st.wait(380);
    }
    st.set('st-lb-five'); st.sfx('ding', { vol: 0.45 }); st.pose('tom', 'cheer'); st.mood('tom', 'joy');
    await st.wait(900);
  } },
  { key: ['sat next to Minh', 'best friends since that day'], icon: '🪑', label: 'next to Minh', async play(st) {
    st.set('st-cal', false); st.set('st-lb-five', false); st.pose('tom', 'stand');
    st.sfx('school-bell', { vol: 0.4 });
    await st.walk('tom', X.desk + 24, { speed: 120, lead: -30 });
    st.pose('tom', 'sitDesk'); st.sfx('bump', { vol: 0.4 });
    await st.wait(400);
    st.face('minh', 1); st.pose('minh', 'e063_hand'); st.pose('tom', 'e063_hand'); st.mood('minh', 'joy'); st.mood('tom', 'joy');
    st.set('st-lb-first');
    await st.wait(300);
    st.fx('hearts', X.desk, 170);
    await st.wait(1200);
  } },
  { key: ['studied Vietnamese since grade 1', 'speaks it very well'], icon: '🗣️', label: 'speaks Vietnamese', async play(st) {
    st.set('st-lb-first', false); st.pose('minh', 'sitDesk'); st.look(X.desk - 70);
    st.set('st-lb-viet'); st.sfx('pencil', { vol: 0.5 });
    st.pose('hoa', 'point'); st.act('hoa', 'point');
    await st.wait(800);
    st.act('hoa', null); st.pose('hoa', 'stand');
    st.pose('tom', 'stand'); st.pose('minh', 'stand');
    await grow(st, ['tom', 'minh'], BIG);
    st.fx('sparkle', X.desk, 150, { quiet: true });
    st.pose('tom', 'open'); st.talk('tom', true); st.mood('tom', 'joy');
    st.sfx('giggle', { vol: 0.4 });
    await st.wait(700);
    st.set('st-lb-well'); st.talk('tom', false);
    st.pose('hoa', 'clap'); st.act('hoa', 'clap'); st.mood('hoa', 'joy'); st.sfx('clap', { vol: 0.6 });
    await st.wait(1000);
    st.act('hoa', null);
  } },
  { key: ['same football team', 'three years'], icon: '⚽', label: 'football team', async play(st) {
    st.set('st-lb-viet', false); st.set('st-lb-well', false); st.pose('hoa', 'wave'); st.act('hoa', 'wave');
    st.pose('tom', 'stand');
    await Promise.all([
      st.walk('minh', 1680, { speed: 140, lead: 20 }),
      st.walk('tom', 1740, { speed: 140, follow: false }),
    ]);
    st.act('hoa', null);
    await Promise.all([st.dress('minh', 'e063_minh_kit'), st.dress('tom', 'e063_tom_kit')]);
    st.sfx('whistle', { vol: 0.5 });
    st.face('tom', -1);
    st.pose('minh', 'cheer'); st.pose('tom', 'cheer'); st.mood('minh', 'joy'); st.mood('tom', 'joy');
    st.set('st-lb-team');
    await st.wait(400);
    st.sfx('cheer', { vol: 0.5 });
    await st.wait(900);
  } },
  { key: ['good goalkeeper', 'fast player'], icon: '🥅', label: 'goalkeeper', async play(st) {
    st.set('st-lb-team', false); st.pose('minh', 'stand'); st.pose('tom', 'stand');
    st.look(1800);
    await st.walk('tom', X.goal, { speed: 140, follow: false });
    st.face('tom', -1); st.pose('tom', 'e063_keeper'); st.set('st-lb-keeper'); st.sfx('clap', { vol: 0.4 });
    st.show('ball', true); st.place('ball', 1700);
    st.set('st-lb-fast');
    await Promise.all([
      st.walk('minh', 1800, { speed: 140, follow: false }),
      st.walk('ball', 1820, { speed: 140, follow: false }),
    ]);
    st.pose('minh', 'e063_kick'); st.sfx('kick', { vol: 0.7 });
    await st.walk('ball', X.goal - 30, { speed: 260, follow: false });
    st.show('ball', false);
    st.hold('tom', 'e063_ball'); st.pose('tom', 'e063_catch'); st.sfx('bump', { vol: 0.5 });
    await st.wait(300);
    st.sfx('cheer', { vol: 0.5 }); st.pose('minh', 'clap'); st.act('minh', 'clap');
    await st.wait(900);
    st.act('minh', null);
  } },
  { key: ['since he was a puppy', 'runs to the gate'], icon: '🐶', label: 'Lucky runs', async play(st) {
    st.set('st-lb-keeper', false); st.set('st-lb-fast', false);
    st.hold('tom', null); st.pose('tom', 'stand'); st.pose('minh', 'stand');
    await Promise.all([
      st.walk('tom', X.gate - 36, { speed: 130, lead: 80 }),
      st.walk('minh', X.gate - 100, { speed: 130, follow: false }),
    ]);
    st.set('st-b-puppy'); st.sfx('pop', { vol: 0.4 });
    st.dog('lucky', 'stand'); st.mood('lucky', 'joy');
    await st.wait(500);
    st.sfx('dog-bark', { vol: 0.7 });
    await st.loop('steps', () => st.walk('lucky', X.gate + 50, { speed: 260, follow: false }), { vol: 0.4 });
    st.act('lucky', 'jump'); st.sfx('dog-bark');
    st.pose('tom', 'open'); st.mood('tom', 'joy');
    await st.wait(1000);
    st.act('lucky', 'wag'); st.fx('hearts', X.gate + 20, 200);
    await st.wait(600);
  } },
  { key: ['friends for five years', 'proudly'], icon: '🤝', label: 'five years', async play(st) {
    st.set('st-b-puppy', false); st.dog('lucky', 'sit');
    st.face('minh', 1); st.face('tom', -1);
    st.pose('minh', 'e063_proud'); st.mood('minh', 'joy');
    st.set('st-lb-friends'); st.sfx('ding', { vol: 0.45 });
    await st.say('minh', 'Five years!', 1600);
  } },
  { key: ['friends forever'], icon: '💖', label: 'forever', async play(st) {
    st.set('st-lb-friends', false);
    st.pose('minh', 'e063_hug'); st.pose('tom', 'e063_hug'); st.mood('tom', 'joy');
    await st.wait(300);
    st.set('st-lb-forever'); st.fx('hearts', X.gate - 68, 150);
    await st.wait(500);
    st.sfx('cheer', { vol: 0.5 }); st.act('minh', 'hop'); st.act('tom', 'hop');
    await st.wait(1200);
  } },
];

export default {
  id: 'en063', worldW: 2320, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'plane', kind: 'thing', x: 120, y: 120, svg: PLANE, box: [-66, -46, 134, 80] },
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 1150, s: 0.95 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: X.desk - 24, s: SMALL },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: X.house - 140, s: SMALL },
    { id: 'lucky', kind: 'dog', x: X.home + 40, s: 0.9, face: -1 },
    { id: 'ball', kind: 'thing', x: 1700, svg: BALL_T, box: [-9, -17, 18, 18] },
  ],
  init(st) {
    st.show('tom', false); st.show('ball', false);
    st.pose('minh', 'sitDesk'); st.dog('lucky', 'sit');
  },
};
