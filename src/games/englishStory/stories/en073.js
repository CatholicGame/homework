/**
 * Bài 73 "The Recycling Club" (may / might = có thể, chưa chắc): ở trường, đi từ trái sang phải: cổng trường → phòng câu lạc bộ
 * tái chế (băng rôn RECYCLING CLUB, lịch thứ Sáu, ba thùng phân loại chai / lon / giấy) → bảng đen (cô Hoa viết NEW PROJECT)
 * → bàn thủ công đầy chai nhựa, lon cũ.
 * "may / might" là việc chưa chắc, nên hiện trong bong bóng nghĩ của người nói (chai biến thành chậu hoa, lon xếp thành rô-bốt,
 * hội chợ tháng 12, trời mưa ít người tới, rô-bốt rơi rụng), còn việc có thật (vào câu lạc bộ, bỏ đồ vào thùng, viết bảng,
 * Lan cười, cả nhóm reo) thì nhân vật làm thật.
 * Toạ độ cảnh: rộng 1820, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, room, doorway, windowBox, board, schoolFront, thought, flowerAt } from '../kit.js';

const FLOOR = 282;
const W = 1820;
const X = { door: 345, cal: 440, bins: [640, 720, 800], board: 1120, table: 1450 };
// Cô Hoa mặc áo dài với quần trắng (dáng nghiêng khi đi vẽ đúng quần dài, không lộ chân)
Object.assign(CAST, { e073_hoa: { ...CAST.en_hoa, bottom: 'pants', bottomC: '#FFFFFF' } });
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

// ── Đồ vật (gốc ở giữa) ────────────────────────────────────────────────────
const BOTTLE = `<path d="M-2.4 -14 h4.8 v4 q5 3 5 8 V12 q0 2 -2 2 H-5 q-2 0 -2 -2 V-2 q0 -5 5 -8Z" fill="#BAE6FD" fill-opacity="0.9" stroke="#0284C7" stroke-width="0.9"/><rect x="-3" y="-17" width="6" height="4" rx="1" fill="#2563EB"/><rect x="-7" y="0" width="14" height="5" fill="#fff" opacity="0.7"/>`;
const CAN = `<rect x="-5.5" y="-8" width="11" height="16" rx="2" fill="#EF4444" stroke="${L}" stroke-width="0.8"/><path d="M-5.5 -4 H5.5 M-5.5 4 H5.5" stroke="#FCA5A5" stroke-width="1"/><ellipse cx="0" cy="-8" rx="5.5" ry="1.6" fill="#E5E7EB" stroke="${L}" stroke-width="0.6"/>`;
const PAPER = `<rect x="-11" y="-6" width="22" height="12" rx="1" fill="#F8FAFC" stroke="${L}" stroke-width="0.8" transform="rotate(-6)"/><path d="M-8 -2 H7 M-8 1 H7 M-8 4 H3" stroke="#94A3B8" stroke-width="0.8" transform="rotate(-6)"/>`;
/** Chậu hoa làm từ nửa chai nhựa. */
const POT = `<path d="M-8 -6 H8 L7 8 Q0 10 -7 8Z" fill="#BAE6FD" stroke="#0284C7" stroke-width="0.9"/><path d="M-8 -6 H8" stroke="#92400E" stroke-width="2.4"/>
  <path d="M0 -6 V-18" stroke="#16A34A" stroke-width="1.6"/><ellipse cx="-4" cy="-12" rx="3.4" ry="1.6" fill="#22C55E" transform="rotate(-30 -4 -12)"/>
  <g transform="translate(0 -21)">${[0, 72, 144, 216, 288].map((r) => `<ellipse cy="-3.4" rx="2.4" ry="3.4" fill="#F472B6" stroke="${L}" stroke-width="0.4" transform="rotate(${r})"/>`).join('')}<circle r="1.8" fill="#FDE047"/></g>`;
/** Rô-bốt xếp từ lon (gốc = chân). */
const ROBOT = (eyes = '#FDE047') => `<g class="e073-rb-legs"><rect x="-9" y="-14" width="7" height="14" rx="1.5" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/><rect x="2" y="-14" width="7" height="14" rx="1.5" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/></g>
  <g class="e073-rb-body"><rect x="-11" y="-34" width="22" height="20" rx="3" fill="#EF4444" stroke="${L}" stroke-width="0.8"/><path d="M-11 -24 H11" stroke="#FCA5A5" stroke-width="1"/>
    <g class="e073-rb-arm"><rect x="11" y="-33" width="5" height="14" rx="2" fill="#F59E0B" stroke="${L}" stroke-width="0.7"/></g><rect x="-16" y="-33" width="5" height="14" rx="2" fill="#F59E0B" stroke="${L}" stroke-width="0.7"/></g>
  <g class="e073-rb-head"><rect x="-8" y="-48" width="16" height="14" rx="2" fill="#22C55E" stroke="${L}" stroke-width="0.8"/><circle cx="-3.4" cy="-41" r="2" fill="${eyes}" stroke="${L}" stroke-width="0.5"/><circle cx="3.4" cy="-41" r="2" fill="${eyes}" stroke="${L}" stroke-width="0.5"/><path d="M0 -48 V-53" stroke="${L}" stroke-width="1"/><circle cx="0" cy="-54" r="1.8" fill="#EF4444"/></g>`;
/** Huy hiệu tái chế đeo ngực. */
const BADGE = `<g transform="translate(5 -10)"><circle r="5.6" fill="#22C55E" stroke="${L}" stroke-width="0.7"/><path d="M-2.6 1.6 L0 -2.6 L2.6 1.6Z" fill="none" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></g>`;
const PLAN_B = `<g transform="translate(0 -22)"><rect x="-17" y="-12" width="34" height="22" rx="2" fill="#fff" stroke="${L}" stroke-width="0.9"/><text class="es-unflip" x="0" y="4" text-anchor="middle" ${NUN} font-size="10" fill="#7C3AED">PLAN B</text></g>`;
/** Hội chợ thu nhỏ trong bong bóng (gốc ở giữa). */
const FAIR = `<path d="M-50 -24 H50 L44 -14 H-44Z" fill="#F472B6" stroke="${L}" stroke-width="0.8"/>
  <text x="0" y="-16.5" text-anchor="middle" ${NUN} font-size="7" fill="#fff">SCHOOL FAIR</text>
  <path d="M-42 -14 V18 M42 -14 V18" stroke="#92400E" stroke-width="2"/><rect x="-46" y="6" width="92" height="8" rx="2" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/>
  <g transform="translate(-28 4) scale(0.9)">${POT}</g><g transform="translate(-10 4) scale(0.9)">${POT}</g><g transform="translate(20 6) scale(0.55)">${ROBOT()}</g>`;

const PROPS = {
  e073_bottle: `<g transform="translate(0 -8) rotate(180)">${BOTTLE}</g>`,
  e073_can: `<g transform="translate(0 -6)">${CAN}</g>`,
  e073_paper: `<g transform="translate(0 -4)">${PAPER}</g>`,
  e073_chalk: `<g transform="rotate(200)"><rect x="-1.6" y="-2" width="3.2" height="10" rx="1" fill="#fff" stroke="${L}" stroke-width="0.6"/></g>`,
};
const POSES = {
  e073_toss: { R: [120, 140], L: [10, 4], head: -4 },
  e073_show: { R: [118, 150], L: [10, 4], head: -6 },
  e073_chalk: { R: [140, 150], L: [10, 4], head: -8 },
};

function bg() {
  const bins = [['#3B82F6', 'BOTTLES'], ['#EF4444', 'CANS'], ['#F59E0B', 'PAPER']].map(([c, t], i) => `<g transform="translate(${X.bins[i]} ${FLOOR})">
    <path d="M-28 -62 H28 L24 0 H-24Z" fill="${c}" stroke="${L}" stroke-width="1.2"/><rect x="-30" y="-68" width="60" height="8" rx="2" fill="${c}" stroke="${L}"/>
    <rect x="-22" y="-52" width="44" height="14" rx="3" fill="#fff" stroke="${L}" stroke-width="0.6"/><text x="0" y="-41.5" text-anchor="middle" ${NUN} font-size="${t.length > 6 ? 8.5 : 10}" fill="${c}">${t}</text>
    <path d="M-6 -20 L0 -30 L6 -20Z M-9 -14 h18" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></g>`).join('');
  return `
  ${sky(0, X.door, 315, 'e073sky')}
  ${cloud(110, 62, 0.8, 0)}
  ${tree(40, FLOOR - 4, 0.8)}
  ${schoolFront(200, FLOOR)}
  <rect x="0" y="${FLOOR - 4}" width="${X.door}" height="40" fill="#CBD5E1" stroke="${L}"/>
  <!-- phòng câu lạc bộ -->
  ${room(X.door, W - X.door, FLOOR, '#ECFCCB', '#D9A066')}
  ${doorway(X.door, FLOOR)}
  <g class="e073-banner"><path d="M480 42 Q640 56 840 42 V82 Q640 96 480 82Z" fill="#22C55E" stroke="${L}" stroke-width="1.2"/>
    <text x="660" y="74" text-anchor="middle" ${NUN} font-size="19" fill="#fff">RECYCLING CLUB</text></g>
  <!-- lịch: thứ Sáu -->
  <g transform="translate(${X.cal} 120)"><rect x="-26" y="-22" width="52" height="54" rx="4" fill="#fff" stroke="${L}" stroke-width="1.1"/><rect x="-26" y="-22" width="52" height="14" rx="4" fill="#EF4444" stroke="${L}"/>
    <g class="e073-calpage"><text x="0" y="12" text-anchor="middle" ${NUN} font-size="11" fill="#1E3A8A">FRIDAY</text></g></g>
  ${bins}
  ${board(X.board - 100, 74, 200, 92)}
  <g class="e073-write"><text x="${X.board}" y="128" text-anchor="middle" ${NUN} font-size="22" fill="#F8FAFC">NEW PROJECT</text></g>
  ${windowBox(1640, 80, 110, 90)}
  <!-- đồ tái chế trên kệ -->
  <rect x="1280" y="150" width="120" height="7" rx="2" fill="#A16207" stroke="${L}"/>
  ${[0, 1, 2].map((i) => `<g transform="translate(${1296 + i * 16} 136)">${BOTTLE}</g>`).join('')}${[0, 1].map((i) => `<g transform="translate(${1356 + i * 14} 142)">${CAN}</g>`).join('')}
  <!-- nhãn -->
  <g class="e073-lb e073-lb-joined">${label(445, 132, 'joined!', '#16A34A', 15)}</g>
  <g class="e073-lb e073-lb-friday">${label(X.cal + 2, 64, 'every Friday', '#DC2626', 13)}</g>
  <g class="e073-lb e073-lb-unsure">${label(1630, 140, 'not sure...', '#475569', 14)}</g>`;
}

function fg() {
  // Bong bóng nghĩ (nội dung chuyển động theo class st-*)
  const lan = `<g transform="translate(-44 4) scale(1.6)">${BOTTLE}</g><path d="M-22 0 H10 M2 -7 L10 0 L2 7" stroke="#7C3AED" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <g transform="translate(40 14) scale(1.6)"><g class="e073-grow">${POT}</g></g><text x="70" y="-14" ${NUN} font-size="16" fill="#7C3AED">?</text>`;
  const tom = `${[[-36, 18], [-20, 18], [-36, 2], [-20, 2]].map(([x, y], i) => `<g transform="translate(${x} ${y}) scale(1.3)"><g class="e073-stack" style="animation-delay:${0.2 + i * 0.35}s">${CAN}</g></g>`).join('')}
    <path d="M-8 6 H10 M3 0 L10 6 L3 12" stroke="#7C3AED" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <g transform="translate(40 34) scale(1.2)"><g class="e073-robot">${ROBOT()}</g></g><text x="70" y="-14" ${NUN} font-size="16" fill="#7C3AED">?</text>`;
  const parent = headOnly('khach', { s: 0.6, mood: 'joy' });
  const hoa = `<g class="e073-fair1"><g transform="translate(-30 4) scale(1.25)">${FAIR}</g>
      <g transform="translate(70 -14)"><rect x="-18" y="-16" width="36" height="34" rx="3" fill="#fff" stroke="${L}" stroke-width="0.9"/><rect x="-18" y="-16" width="36" height="9" rx="3" fill="#EF4444"/>
        <text x="0" y="6" text-anchor="middle" ${NUN} font-size="6.4" fill="#1E3A8A">DECEMBER</text></g></g>
    <g class="e073-buy"><g transform="translate(66 20)">${parent}</g><g class="e073-potgo"><g transform="translate(46 22)">${POT}</g></g>
      <g transform="translate(76 46)"><g class="e073-garden"><path d="M-22 0 H22" stroke="#16A34A" stroke-width="3"/>${flowerAt(-12, 0, '#F472B6')}${flowerAt(12, 0, '#FACC15')}</g></g></g>`;
  const people = [-40, -20, 0].map((x, i) => `<g transform="translate(${x + 56} 24)"><g class="e073-p e073-p${i}">${headOnly(['khach', 'bo', 'me'][i], { s: 0.5, mood: 'happy' })}</g></g>`).join('');
  const rain = `<g transform="translate(-26 10)">${FAIR}</g>${people}
    <g class="e073-cloud"><g transform="translate(-4 -30)"><ellipse rx="26" ry="9" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/><ellipse cx="-12" cy="-6" rx="11" ry="8" fill="#94A3B8"/><ellipse cx="10" cy="-8" rx="13" ry="9" fill="#94A3B8"/>
      <g class="e073-drops">${[-20, -10, 0, 10, 20, -15, 5, 15].map((x, i) => `<path d="M${x} ${8 + (i % 3) * 6} l-2 6" stroke="#2563EB" stroke-width="1.6" stroke-linecap="round"/>`).join('')}</g></g></g>`;
  const broke = `<g transform="translate(0 40) scale(1.9)"><g class="e073-break">${ROBOT('#94A3B8')}</g></g><g class="e073-spark"><path d="M-30 -24 l6 4 l-2 -8 l8 4 M26 -30 l-6 6 l8 -2 l-4 8" stroke="#F59E0B" stroke-width="2" fill="none" stroke-linecap="round"/></g>`;
  return `
  <!-- bàn thủ công (che chân) -->
  <g transform="translate(${X.table} 0)"><rect x="-110" y="226" width="220" height="9" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
    <rect x="-102" y="235" width="10" height="${FLOOR - 235}" fill="#92400E" stroke="${L}"/><rect x="92" y="235" width="10" height="${FLOOR - 235}" fill="#92400E" stroke="${L}"/>
    ${[-16, 0, 16].map((x) => `<g transform="translate(${x} 212)">${BOTTLE}</g>`).join('')}${[50, 64, 78, 57, 71].map((x, i) => `<g transform="translate(${x} ${i < 3 ? 218 : 202})">${CAN}</g>`).join('')}
    <g transform="translate(-62 220)">${PAPER}</g></g>
  ${bush(120, FLOOR + 30, 0.7)}
  ${thought(1330, 104, 196, 100, lan, [1385, 160], 'e073-think e073-t-lan')}
  ${thought(1560, 104, 196, 100, tom, [1515, 160], 'e073-think e073-t-tom')}
  ${thought(1560, 100, 236, 110, hoa, [1700, 120], 'e073-think e073-t-hoa')}
  ${thought(1560, 100, 220, 108, rain, [1630, 160], 'e073-think e073-t-rain')}
  ${thought(1560, 100, 200, 104, broke, [1630, 160], 'e073-think e073-t-robot')}
  <g class="e073-lb e073-lb-fun"><g transform="translate(1450 72)"><g class="e073-spin">${[0, 120, 240].map((r) => `<g transform="rotate(${r})"><path d="M-12 -12 A17 17 0 0 1 10 -14" stroke="#16A34A" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M6 -21 L13 -13 L3 -9Z" fill="#16A34A"/></g>`).join('')}</g></g>${label(1450, 126, 'Recycling is fun!', '#16A34A', 18)}</g>`;
}

const CSS = `
.e073-lb { opacity: 0; transition: opacity .35s; }
${['joined', 'friday', 'unsure', 'fun'].map((k) => `.st-lb-${k} .e073-lb-${k}`).join(', ')} { opacity: 1; }
.e073-banner { transition: filter .4s; } .st-banner .e073-banner { animation: e073Glow .5s ease-in-out 3 alternate; }
@keyframes e073Glow { to { filter: brightness(1.25); } }
.e073-calpage { transform-box: fill-box; transform-origin: 50% 0; }
.st-friday .e073-calpage { animation: e073Flip .5s ease-out; }
@keyframes e073Flip { from { transform: scaleY(0); } to { transform: none; } }
.e073-write { clip-path: inset(0 100% 0 0); }
.st-write .e073-write { clip-path: inset(0 0 0 0); transition: clip-path 2s linear; }
.e073-think { opacity: 0; transition: opacity .3s; }
.st-t-lan .e073-t-lan, .st-t-tom .e073-t-tom, .st-t-hoa .e073-t-hoa, .st-t-rain .e073-t-rain, .st-t-robot .e073-t-robot { opacity: 1; }
.e073-grow, .e073-stack, .e073-robot, .e073-p, .e073-potgo { transform-box: fill-box; transform-origin: 50% 100%; }
.e073-grow { transform: scale(0); } .st-t-lan .e073-grow { animation: e073Pop .5s cubic-bezier(.3,1.6,.6,1) .9s both; }
.e073-stack { opacity: 0; } .st-t-tom .e073-stack { animation: e073Drop .35s ease-in both; }
@keyframes e073Drop { from { opacity: 0; transform: translateY(-14px); } to { opacity: 1; transform: none; } }
.e073-robot { transform: scale(0); } .st-t-tom .e073-robot { animation: e073Pop .5s cubic-bezier(.3,1.6,.6,1) 1.7s both; }
.st-t-tom .e073-rb-arm { animation: e073Wave .3s ease-in-out 2.2s infinite alternate; transform-box: fill-box; transform-origin: 50% 0; }
@keyframes e073Wave { from { transform: rotate(0); } to { transform: rotate(-60deg); } }
@keyframes e073Pop { from { transform: scale(0); } to { transform: scale(1); } }
.e073-buy { opacity: 0; transition: opacity .3s; } .st-buy .e073-buy { opacity: 1; } .st-buy .e073-fair1 { opacity: .25; }
.e073-fair1 { transition: opacity .3s; }
.st-buy .e073-potgo { animation: e073Go 1s ease-in-out .6s both; }
@keyframes e073Go { to { transform: translate(28px, 16px); } }
.e073-garden { opacity: 0; } .st-buy .e073-garden { animation: e073Fade .4s ease 1.6s both; }
@keyframes e073Fade { to { opacity: 1; } }
.st-t-rain .e073-drops { animation: e073Rain .35s linear infinite; }
@keyframes e073Rain { from { transform: translateY(-3px); } to { transform: translateY(6px); } }
.st-t-rain .e073-p0 { animation: e073Leave .5s ease 1.2s both; } .st-t-rain .e073-p1 { animation: e073Leave .5s ease 1.8s both; }
@keyframes e073Leave { to { opacity: 0; transform: translateY(6px) scale(.6); } }
.e073-rb-head, .e073-rb-arm, .e073-rb-body { transform-box: fill-box; transform-origin: 50% 100%; }
.st-t-robot .e073-break { animation: e073Shake .1s linear 8 alternate; transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes e073Shake { from { transform: rotate(-4deg); } to { transform: rotate(4deg); } }
.st-t-robot .e073-break .e073-rb-head { animation: e073HeadOff .6s ease-in 1s both; }
@keyframes e073HeadOff { to { transform: translate(14px, 30px) rotate(80deg); } }
.st-t-robot .e073-break .e073-rb-arm { animation: e073ArmOff .5s ease-in 1.2s both; }
@keyframes e073ArmOff { to { transform: translate(8px, 16px) rotate(-90deg); } }
.e073-spark { opacity: 0; } .st-t-robot .e073-spark { animation: e073Spark .2s steps(1) .6s 6 alternate both; }
@keyframes e073Spark { from { opacity: 0; } to { opacity: 1; } }
.e073-spin { transform-box: fill-box; transform-origin: center; }
.st-lb-fun .e073-spin { animation: ekSpin 2s linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .st-banner .e073-banner { animation-duration: 1s; animation-iteration-count: 1; }
  .st-t-tom .e073-rb-arm { animation-duration: .8s; }
  .st-t-rain .e073-drops { animation-duration: 1s; }
  .st-t-robot .e073-break { animation-duration: .3s; animation-iteration-count: 3; }
  .st-t-robot .e073-spark { animation-duration: .5s; animation-iteration-count: 2; }
  .st-lb-fun .e073-spin { animation-duration: 6s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const KIDS = ['minh', 'lan', 'tom', 'nam'];

const BEATS = [
  { key: ['joined the Recycling Club'], icon: '♻️', label: 'Recycling Club', async play(st) {
    st.look(330, { dur: 3200 });
    await Promise.all([
      st.walk('minh', 470, { speed: 130, follow: false }),
      (async () => { await st.wait(900); st.sfx('door-open', { vol: 0.5 }); })(),
      st.walk('lan', 420, { speed: 130, follow: false }),
    ]);
    st.set('st-banner'); st.sfx('ding', { vol: 0.5 });
    st.chest('minh', BADGE); st.chest('lan', BADGE); st.set('st-lb-joined');
    st.mood('minh', 'joy'); st.mood('lan', 'joy'); st.pose('minh', 'cheer'); st.pose('lan', 'cheer');
    st.pose('hoa', 'clap'); st.act('hoa', 'clap'); st.mood('hoa', 'joy'); st.sfx('clap', { vol: 0.6 });
    await st.wait(1300);
    st.act('hoa', null); st.pose('hoa', 'stand'); st.pose('minh', 'stand'); st.pose('lan', 'stand');
  } },
  { key: ['Every Friday', 'old bottles, cans and paper'], icon: '🧴', label: 'bottles, cans, paper', async play(st) {
    off(st, 'st-lb-joined', 'st-banner');
    st.look(600);
    st.set('st-friday'); st.set('st-lb-friday'); st.sfx('page-turn', { vol: 0.7 });
    await Promise.all([st.walk('minh', 520, { speed: 120, follow: false }), st.walk('lan', 470, { speed: 120, follow: false })]);
    const toss = async (id, prop, svg, bin, sound) => {
      const A = st.a(id);
      st.hold(id, prop); st.pose(id, 'e073_toss'); st.sfx('whoosh', { vol: 0.35 });
      await st.wait(250);
      st.hold(id, null);
      await st.fly(svg, [A.x + 14, 150], [X.bins[bin], FLOOR - 70], { size: 26, dur: 550 });
      st.sfx(sound.n, { vol: sound.v }); st.pose(id, 'stand');
    };
    await toss('minh', 'e073_bottle', BOTTLE, 0, { n: 'bump', v: 0.5 });
    await toss('lan', 'e073_can', CAN, 1, { n: 'click', v: 0.8 });
    await toss('tom', 'e073_paper', PAPER, 2, { n: 'page-turn', v: 0.6 });
    for (const id of KIDS) st.mood(id, 'joy');
    await st.wait(500);
  } },
  { key: ['planning a new project'], icon: '📋', label: 'new project', async play(st) {
    off(st, 'st-lb-friday');
    st.look(X.board, { dur: 3000 });
    await Promise.all([
      st.walk('hoa', X.board + 130, { speed: 130, follow: false }),
      st.walk('minh', X.board - 120, { speed: 130, follow: false }), st.walk('lan', X.board - 70, { speed: 130, follow: false }),
      st.walk('tom', X.board - 10, { speed: 130, follow: false }), st.walk('nam', X.board + 50, { speed: 130, follow: false }),
    ]);
    st.face('hoa', -1); st.hold('hoa', 'e073_chalk'); st.pose('hoa', 'e073_chalk'); st.act('hoa', 'write');
    st.set('st-write');
    await st.loop('pencil', () => st.wait(2000), { vol: 0.9 });
    st.act('hoa', null); st.hold('hoa', null); st.pose('hoa', 'point'); st.sfx('ding', { vol: 0.4 });
    for (const id of KIDS) st.mood(id, 'wow');
    await st.wait(700);
    st.pose('hoa', 'stand');
  } },
  { key: ['might make flower pots', 'plastic bottles'], icon: '🪴', label: 'flower pots', async play(st) {
    st.look(1440, { dur: 2600 });
    await Promise.all([
      st.walk('lan', 1380, { speed: 130, follow: false }), st.walk('minh', 1640, { speed: 130, follow: false }),
      st.walk('tom', 1520, { speed: 130, follow: false }), st.walk('nam', 1290, { speed: 130, follow: false }),
      st.walk('hoa', 1720, { speed: 130, follow: false }),
    ]);
    st.face('minh', -1); st.face('hoa', -1); st.face('nam', 1);
    st.hold('lan', 'e073_bottle'); st.pose('lan', 'e073_show'); st.mood('lan', 'joy'); st.sfx('click', { vol: 0.5 });
    st.set('st-t-lan'); st.sfx('pop', { vol: 0.5 });
    await st.wait(900);
    st.sfx('poof', { vol: 0.5 });
    st.talk('lan', true);
    await st.wait(1500);
    st.talk('lan', false);
  } },
  { key: ['may build a robot', 'old cans'], icon: '🤖', label: 'a robot', async play(st) {
    st.set('st-t-lan', false); st.hold('lan', null); st.pose('lan', 'stand');
    st.look(1500);
    st.hold('tom', 'e073_can'); st.pose('tom', 'e073_show'); st.mood('tom', 'joy');
    st.set('st-t-tom');
    for (const ms of [200, 350, 350, 350]) { await st.wait(ms); st.sfx('bump', { vol: 0.35, rate: 1.4 }); }
    await st.wait(400);
    st.sfx('robot-beep', { vol: 0.6 });
    st.talk('tom', true); st.act('tom', 'hop');
    await st.wait(1300);
    st.talk('tom', false); st.act('tom', null);
  } },
  { key: ['sell their things at the school fair', 'in December'], icon: '🎪', label: 'school fair', async play(st) {
    st.set('st-t-tom', false); st.hold('tom', null); st.pose('tom', 'stand');
    st.look(1560);
    st.pose('hoa', 'think'); st.mood('hoa', 'joy');
    st.set('st-t-hoa'); st.sfx('pop', { vol: 0.5 });
    await st.wait(1400);
    st.sfx('cash', { vol: 0.5 });
    await st.wait(1300);
  } },
  { key: ['Parents might buy the flower pots', 'their gardens'], icon: '🌷', label: 'parents might buy', async play(st) {
    st.look(1560);
    st.pose('hoa', 'open'); st.talk('hoa', true);
    st.set('st-buy');
    await st.wait(600);
    st.sfx('cash', { vol: 0.6 });
    await st.wait(1000);
    st.sfx('birds', { vol: 0.5 });
    await st.wait(1200);
    st.talk('hoa', false);
  } },
  { key: ['Minh is not sure'], icon: '🤔', label: 'not sure', async play(st) {
    off(st, 'st-t-hoa', 'st-buy');
    st.pose('hoa', 'stand');
    st.look(1560);
    st.pose('minh', 'shrug'); st.act('minh', 'no'); st.mood('minh', 'sad');
    st.set('st-lb-unsure'); st.sfx('buzz-no', { vol: 0.35 });
    await st.wait(1400);
    st.act('minh', null); st.pose('minh', 'think');
    await st.wait(300);
  } },
  { key: ['may rain on the day of the fair', 'fewer people might come'], icon: '🌧️', label: 'it may rain', async play(st) {
    st.set('st-lb-unsure', false);
    st.look(1560);
    st.pose('minh', 'think');
    st.set('st-t-rain'); st.sfx('pop', { vol: 0.4 });
    await st.loop('rain', () => st.wait(2600), { vol: 0.7 });
    st.sfx('wind', { vol: 0.4 });
    await st.wait(500);
  } },
  { key: ['the robot might not work'], icon: '💥', label: 'might not work', async play(st) {
    st.set('st-t-rain', false);
    st.look(1560);
    st.pose('minh', 'open'); st.mood('minh', 'wow');
    st.set('st-t-robot'); st.sfx('robot-beep', { vol: 0.6, rate: 0.8 });
    await st.wait(1000);
    st.sfx('bump', { vol: 0.6 });
    await st.wait(300);
    st.sfx('bump', { vol: 0.4, rate: 1.3 });
    st.mood('tom', 'sad');
    await st.wait(900);
  } },
  { key: ['may need a plan B', 'Lan laughs'], icon: '😄', label: 'plan B', async play(st) {
    st.set('st-t-robot', false);
    st.look(1480);
    st.pose('minh', 'stand');
    st.chest('lan', PLAN_B); st.pose('lan', 'carry'); st.sfx('page-turn', { vol: 0.6 });
    await st.wait(400);
    st.mood('lan', 'joy'); st.act('lan', 'hop'); st.sfx('giggle', { vol: 0.7 });
    await st.say('lan', 'Plan B!', 1300);
    st.mood('tom', 'joy'); st.mood('minh', 'joy');
    await st.wait(300);
    st.act('lan', null);
  } },
  { key: ['recycling is fun'], icon: '🎉', label: 'recycling is fun', async play(st) {
    st.chest('lan', BADGE);
    st.look(1480);
    st.set('st-lb-fun'); st.sfx('cheer', { vol: 0.5 });
    for (const id of [...KIDS, 'hoa']) { st.pose(id, 'cheer'); st.mood(id, 'joy'); }
    for (const id of KIDS) st.act(id, 'jump');
    await st.wait(700);
    st.sfx('clap', { vol: 0.5 });
    await st.wait(1300);
    for (const id of KIDS) st.act(id, null);
  } },
];

export default {
  id: 'en073', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 3, 4, 8, 11],
  cast: [
    { id: 'hoa', kind: 'adult', who: 'e073_hoa', x: 900, s: 0.95, face: -1 },
    { id: 'nam', kind: 'kid', who: 'nam', x: 860, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 570, face: 1 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 70, s: 1.08 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 120 },
  ],
  init(st) {
    st.chest('tom', BADGE); st.chest('nam', BADGE);
  },
};
