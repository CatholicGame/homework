/**
 * Bài 130 "The Spring Victory" (quá khứ hoàn thành; by the time): Quang Trung hành quân thần tốc, Ngọc Hồi, Đống Đa Tết
 * Kỷ Dậu 1789, cành đào gửi về Phú Xuân. Một thế giới đi từ trái sang phải theo đường hành quân:
 * kinh thành Phú Xuân (Nguyễn Huệ lên ngôi, áo vàng) → đường núi (ngựa và võng: hai người khiêng một người nghỉ, đi suốt
 * ngày đêm) → trại ăn Tết sớm (bánh chưng, câu đối đỏ, cây đào, pháo) → đồn Ngọc Hồi, gò Đống Đa (cờ vàng của quân Thanh
 * đổ, cờ đỏ lên; không cảnh đánh nhau) → cổng thành Thăng Long (quân Thanh chạy, vua cưỡi ngựa vào, lịch mùng 5 so với
 * mùng 7) → hội Đống Đa hôm nay (tượng vua trên gò, trống hội, cờ, Minh và Lan).
 * Nhịp đầu ở Thăng Long cuối năm 1788 (quân Thanh vào thành), nhịp hai cắt về Phú Xuân rồi đi lại từ trái sang phải.
 * Toạ độ cảnh: rộng 3300, cao 315, sàn y = 282.
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, cloud, label, tree, sun } from '../kit.js';
import { HAT, wear, robe, redress, fig, ARMOR, skyG, hills, ground, bamboo, hut, palace, cityGate, flag, tent, horse, calendar, peach, PROPS, vsCss, lb, lbCss, off, mark, NUN } from './vietsuKit.js';

const P = 'e130';
const FLOOR = 282;
const W = 3300;
const X = { phu: 280, road: 800, camp: 1300, fort: 1850, gate: 2460, fest: 2980 };

/** Mũ quân Thanh: mũ tròn, tua đỏ trên chóp. */
const HAT_QING = `<g><path d="M-19 -6 C-19 -22 -9 -26 0 -26 C9 -26 19 -22 19 -6 Q0 -11 -19 -6Z" fill="#1F2937" stroke="${L}" stroke-width="0.8"/>
  <path d="M-21 -5 Q0 -12 21 -5" stroke="#374151" stroke-width="3" fill="none"/><path d="M-10 -24 Q0 -36 10 -24 Q0 -20 -10 -24Z" fill="#DC2626" stroke="${L}" stroke-width="0.6"/><circle cy="-33" r="2.4" fill="#FACC15"/></g>`;

Object.assign(CAST, {
  e130_hue: { adult: true, hair: 'short', top: 'robe', shirt: '#B91C1C', trimC: '#FACC15', shoe: '#1C1917', beard: true, moustache: true },
  e130_king: { adult: true, hair: 'short', top: 'robe', shirt: '#FACC15', trimC: '#DC2626', shoe: '#1C1917', beard: true, moustache: true },
  e130_sol1: { adult: true, hair: 'short', top: 'tee', shirt: '#B91C1C', bottom: 'pants', bottomC: '#1F2937', shoe: '#57534E' },
  e130_sol2: { adult: true, hair: 'short', top: 'tee', shirt: '#1D4ED8', bottom: 'pants', bottomC: '#1F2937', shoe: '#57534E', moustache: true },
  e130_qing: { adult: true, hair: 'short', top: 'tee', shirt: '#2563EB', bottom: 'pants', bottomC: '#1E3A8A', shoe: '#1F2937' },
  e130_mum: { ...CAST.en_mum_home },
});

const POSES = {
  e130_spear: { R: [22, 6], L: [10, 4] },
  e130_promise: { R: [150, 168], L: [10, 4], head: -4 },
  e130_eat: { R: [118, 248], L: [40, 110], dy: 20 },
  e130_drum: { R: [70, 110], L: [70, 110] },
  e130_run: { R: [60, 120], L: [60, 120], head: 10 },
};

// ── Hình ─────────────────────────────────────────────────────────────────────────────────
/** Cờ vàng quân Thanh (rồng xanh nhỏ). */
const qingFlag = (x, y, h, cls = '', d = 0) => `<g class="${cls}" style="transition-delay:${d}s;transform-origin:${x}px ${y}px">${flag(P, x, y, { h, w: 36, hh: 26, c: '#FACC15' })}
  <path d="M${x + 6} ${y - h + 14} q6 -6 12 0 q6 6 12 -2" stroke="#1D4ED8" stroke-width="2" fill="none"/></g>`;
const redFlag = (x, y, h, cls = '', d = 0, txt = '') => `<g class="${cls}" style="transition-delay:${d}s;transform-origin:${x}px ${y}px">${flag(P, x, y, { h, w: 42, hh: 28, c: '#DC2626', txt, fs: 9 })}</g>`;
const BANH = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-14" y="-24" width="28" height="24" fill="#22C55E" stroke="${L}"/><path d="M-14 -12 H14 M0 -24 V0" stroke="#FACC15" stroke-width="2.2"/></g>`;
const COUPLET = (x, y, t) => `<g transform="translate(${x} ${y})"><rect x="-8" y="0" width="16" height="64" fill="#DC2626" stroke="${L}"/>${t.split('').map((c, i) => `<text x="0" y="${14 + i * 16}" text-anchor="middle" ${NUN} font-size="11" fill="#FACC15">${c}</text>`).join('')}</g>`;
/** Võng: hai lính khiêng một người nằm nghỉ, thay phiên nhau (gốc = giữa, chạm đất). */
const HAMMOCK = `<g class="${P}-hm">
  ${fig(-48, 0, 'e130_sol1', { pose: 'walk', s: 0.82, hat: HAT.band })}
  <path d="M-48 -112 Q0 -70 48 -112" stroke="#7C4A1E" stroke-width="1.6" fill="none"/><path d="M-56 -114 H56" stroke="#7C4A1E" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M-36 -100 Q0 -60 36 -100 Q0 -80 -36 -100Z" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/>
  <g transform="translate(-22 -92) rotate(-70)"><circle r="9" fill="#F5D0B5" stroke="${L}" stroke-width="0.8"/><path d="M-3 -2 q2 2 4 0" stroke="${L}" stroke-width="0.9" fill="none"/><g transform="translate(0 -2) scale(0.55)">${HAT.band}</g></g>
  ${fig(48, 0, 'e130_sol2', { pose: 'walk', s: 0.82, hat: HAT.band })}</g>`;
const KING_RIDER = fig(-8, -76, 'e130_king', { pose: 'sit', s: 0.9, hat: HAT.king });
const HORSE_QT = horse(P, { c: '#F5F5F4', mane: '#A8A29E', rider: KING_RIDER });
const MESS_RIDER = `${fig(-8, -76, 'e130_sol1', { pose: 'sit', s: 0.9, hat: HAT.band })}<g transform="translate(12 -136)">${peach(P, 0, 0, 1.1, 24)}</g>`;
const HORSE_MS = horse(P, { c: '#A16207', mane: '#3F2A1A', rider: MESS_RIDER });
/** Tượng vua trên gò (màu đá). */
const STATUE = `<g transform="translate(${X.fest} ${FLOOR - 40})"><path d="M-130 40 Q-90 -14 0 -18 Q90 -14 130 40Z" fill="#86C49A" stroke="${L}" stroke-width="1.2"/>
  <rect x="-34" y="-50" width="68" height="34" fill="#D6D3D1" stroke="${L}"/><text x="0" y="-28" text-anchor="middle" ${NUN} font-size="9" fill="#44403C">QUANG TRUNG</text>
  <g style="filter:grayscale(1) brightness(1.15)">${fig(0, -50, 'e130_king', { pose: 'raise', s: 1, hat: HAT.king })}</g></g>`;

function bg() {
  return `
  ${skyG(0, W, `${P}sky`, '#7DD3FC', '#FEF9C3')}
  <g transform="translate(1500 60)">${sun(20)}</g>
  ${cloud(160, 56, 0.8, 0)}${cloud(700, 44, 0.7, 2)}${cloud(1300, 60, 0.9, 4)}${cloud(2000, 48, 0.8, 1)}${cloud(2700, 58, 0.8, 3)}
  ${hills(-20, 600, 250, '#A7D7B0', 50)}${hills(560, 700, 250, '#4D9A62', 140)}${hills(600, 640, 256, '#6BB27E', 90)}${hills(1240, 2100, 250, '#A7D7B0', 60)}
  <rect x="0" y="246" width="${W}" height="${FLOOR - 246}" fill="#A3D977"/>
  ${ground(0, W, FLOOR, '#C9B27C', '#A8915E')}
  <!-- Phú Xuân -->
  ${palace(X.phu, FLOOR - 2, 280, { plaque: 'PHÚ XUÂN' })}
  ${redFlag(X.phu - 190, FLOOR, 140)}${redFlag(X.phu + 190, FLOOR, 140)}
  <!-- đường núi -->
  ${tree(X.road - 120, FLOOR - 4, 1.1, '')}${tree(X.road + 230, FLOOR - 4, 1, '')}${bamboo(X.road + 60, FLOOR - 4, 0.8)}
  <g class="${P}-dist">${label(X.road + 60, 100, 'north →', '#7C4A1E', 14)}</g>
  <!-- trại ăn Tết -->
  ${tent(X.camp - 170, FLOOR - 4, '#D6B98A', 1.2)}${tent(X.camp + 190, FLOOR - 4, '#CBB28A', 1.05)}
  <g class="${P}-tet">${COUPLET(X.camp - 120, 126, 'XUÂN')}${COUPLET(X.camp - 92, 126, 'PHÚC')}
    <g transform="translate(${X.camp + 130} ${FLOOR})"><path d="M0 0 V-40" stroke="#7C4A1E" stroke-width="5"/>${peach(P, 0, -36, 1.6, -10)}${peach(P, 4, -40, 1.3, 30)}</g>
    <g transform="translate(${X.camp + 30} ${FLOOR})"><rect x="-44" y="-30" width="88" height="8" rx="2" fill="#92400E" stroke="${L}"/><rect x="-38" y="-22" width="6" height="22" fill="#78350F"/><rect x="32" y="-22" width="6" height="22" fill="#78350F"/>
      ${BANH(-20, -30, 0.9)}${BANH(10, -30, 0.9)}${BANH(-5, -52, 0.9)}</g></g>
  <!-- đồn Ngọc Hồi, gò Đống Đa -->
  <g transform="translate(${X.fort} ${FLOOR})">${Array.from({ length: 14 }, (_, i) => `<path d="M${-150 + i * 22} 0 V-60 l5 -8 l5 8 V0Z" fill="#A16207" stroke="${L}" stroke-width="0.9"/>`).join('')}
    <rect x="-152" y="-40" width="306" height="6" fill="#7C4A1E"/></g>
  <g>${[X.fort - 120, X.fort - 30, X.fort + 60, X.fort + 140].map((x, i) => qingFlag(x, FLOOR - 50, 110, `${P}-qf`, 0.3 + i * 0.3)).join('')}</g>
  <g>${[X.fort - 100, X.fort - 10, X.fort + 80].map((x, i) => redFlag(x, FLOOR - 50, 120, `${P}-rf`, 1.4 + i * 0.25, i === 1 ? 'TÂY SƠN' : '')).join('')}</g>
  <!-- Thăng Long -->
  ${cityGate(X.gate, FLOOR, 420, 'THĂNG LONG')}
  <g>${[X.gate - 150, X.gate + 150].map((x, i) => qingFlag(x, FLOOR - 132, 70, `${P}-gq`, i * 0.4)).join('')}</g>
  <g>${[X.gate - 150, X.gate + 150].map((x, i) => redFlag(x, FLOOR - 132, 76, `${P}-gr`, 0.4 + i * 0.3)).join('')}</g>
  <!-- hội Đống Đa hôm nay -->
  ${STATUE}
  ${[X.fest - 200, X.fest + 200].map((x) => redFlag(x, FLOOR, 150)).join('')}
  ${tree(X.fest + 270, FLOOR, 1, '')}`;
}

function fg() {
  return `
  <!-- trống hội -->
  <g class="${P}-drum"><g transform="translate(${X.fest - 120} ${FLOOR})"><rect x="-24" y="-44" width="48" height="40" rx="10" fill="#B91C1C" stroke="${L}" stroke-width="1.2"/><ellipse cx="0" cy="-44" rx="24" ry="7" fill="#FDE68A" stroke="${L}"/>
    <path d="M-20 0 L-12 -8 M20 0 L12 -8" stroke="#7C4A1E" stroke-width="3"/></g></g>
  ${lb(P, 'y1788', label(X.gate - 40, 56, 'late 1788', '#475569', 16))}
  ${lb(P, 'qing', label(X.gate + 110, 104, 'Qing army', '#1D4ED8', 15))}
  ${lb(P, 'phu', label(X.phu - 10, 46, 'Far away in Phu Xuan', '#B91C1C', 15))}
  ${lb(P, 'emp', label(X.phu + 10, 84, 'Emperor Quang Trung', '#B45309', 14))}
  ${lb(P, 'speed', label(X.camp - 60, 64, 'amazing speed!', '#DC2626', 16))}
  ${lb(P, 'tet', label(X.camp - 10, 64, 'Tet early', '#DC2626', 17))}
  ${lb(P, 'day7', `<g>${calendar(X.camp + 100, 90, 'TET', '7', { s: 1 })}${label(X.camp + 100, 144, 'the seventh day', '#B91C1C', 12)}</g>`)}
  ${lb(P, 'win', `<g>${calendar(X.fort - 210, 98, 'TET 1789', '5', { s: 1 })}${label(X.fort + 20, 60, 'Ngoc Hoi · Dong Da', '#B91C1C', 15)}</g>`)}
  ${lb(P, 'ran', label(X.gate + 110, 100, 'ran away', '#1D4ED8', 15))}
  ${lb(P, 'early', `<g>${calendar(X.gate + 70, 82, 'TET', '5', { s: 0.9 })}<g transform="translate(${X.gate + 160} 82)"><g class="${P}-cross">${calendar(0, 0, 'TET', '7', { s: 0.9 })}<path d="M-24 -26 L24 26 M24 -26 L-24 26" stroke="#DC2626" stroke-width="4" stroke-linecap="round" opacity="0.8"/></g></g>
    ${label(X.gate + 115, 136, 'two days early!', '#16A34A', 16)}</g>`)}
  ${lb(P, 'say', label(X.gate - 20, 60, 'People say', '#7C4A1E', 16))}
  ${lb(P, 'tophu', label(X.gate - 150, 110, '← to Phu Xuan', '#B91C1C', 14))}
  ${lb(P, 'fest', `<g>${label(X.fest + 10, 56, 'Dong Da Festival', '#B91C1C', 17)}${calendar(X.fest + 190, 104, 'TET', '5', { s: 0.8 })}</g>`)}`;
}

const CSS = `
${lbCss(P, ['y1788', 'qing', 'phu', 'emp', 'speed', 'tet', 'day7', 'win', 'ran', 'early', 'say', 'tophu', 'fest'])}
.${P}-qf, .${P}-gq { transition: transform .7s ease-in, opacity .7s; }
.st-win .${P}-qf { transform: rotate(80deg); opacity: 0; }
.${P}-gq { opacity: 0; transform: translateY(60px); }
.st-qtl .${P}-gq { opacity: 1; transform: none; transition: transform .8s cubic-bezier(.3,1.3,.6,1), opacity .3s; }
.st-free .${P}-gq { transform: rotate(80deg); opacity: 0; }
.${P}-rf, .${P}-gr { transform: translateY(120px); opacity: 0; transition: transform .9s cubic-bezier(.3,.9,.4,1), opacity .2s; }
.st-win .${P}-rf, .st-free .${P}-gr { transform: none; opacity: 1; }
.${P}-tet { opacity: .0; transition: opacity .6s; }
.st-tet .${P}-tet { opacity: 1; }
.${P}-dist { opacity: 0; transition: opacity .4s; }
.st-march .${P}-dist { opacity: 1; }
.es-thing.is-walk .${P}-hm { animation: ${P}Bob .22s ease-in-out infinite alternate; }
@keyframes ${P}Bob { to { transform: translateY(-3px); } }
.st-drum .${P}-drum { animation: ${P}Drum .25s ease-in-out infinite alternate; }
.${P}-drum { transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes ${P}Drum { to { transform: scale(1.05, .96); } }
.${P}-cross { transition: opacity .3s; }
@media (prefers-reduced-motion: reduce) { .es-thing.is-walk .${P}-hm, .st-drum .${P}-drum { animation-duration: .8s; } }
`;

const SOL = ['s1', 's2'];
const QING = ['q1', 'q2'];
const KIDS = ['minh', 'lan', 'mum'];

const BEATS = [
  { key: ['In late 1788', 'a huge Qing army took Thang Long'], icon: '🏯', label: 'Qing army took Thang Long', async play(st) {
    st.look(X.gate + 40, { instant: true });
    st.set('st-lb-y1788'); st.sfx('wind', { vol: 0.4 });
    await st.wait(400);
    st.sfx('lion-drum', { vol: 0.6 });
    await Promise.all(QING.map((id, i) => st.walk(id, X.gate + 20 + i * 70, { speed: 110, follow: false })));
    st.set('st-qtl'); st.sfx('whoosh', { vol: 0.5 });
    st.set('st-lb-qing');
    QING.forEach((id) => st.pose(id, 'raise'));
    await st.wait(1300);
    QING.forEach((id) => st.pose(id, 'e130_spear'));
  } },
  { key: ['Emperor Quang Trung', 'at an amazing speed'], icon: '🐎', label: 'amazing speed', async play(st) {
    off(st, 'st-lb-y1788', 'st-lb-qing');
    st.look(X.phu, { instant: true });
    st.set('st-lb-phu'); st.sfx('ding', { vol: 0.5 });
    await st.wait(600);
    st.fx('poof', X.phu, 200, { quiet: true }); st.sfx('sparkle', { vol: 0.4 });
    redress(st, 'hue', 'e130_king', HAT.king, true);
    st.set('st-lb-emp'); st.pose('hue', 'raise'); st.mood('hue', 'joy'); st.sfx('lion-drum', { vol: 0.6 });
    await st.wait(1200);
    off(st, 'st-lb-phu', 'st-lb-emp');
    st.show('hue', false); st.show('qt', true);
    st.set('st-march'); st.sfx('whoosh', { vol: 0.6 });
    st.set('st-lb-speed');
    await st.loop('steps', () => Promise.all([
      st.walk('qt', X.camp - 40, { speed: 300, lead: -150 }),
      st.walk('ham', X.camp - 210, { speed: 280, follow: false }),
      st.walk('s1', X.camp - 330, { speed: 280, follow: false }),
      st.walk('s2', X.camp - 380, { speed: 280, follow: false }),
    ]), { vol: 0.8 });
    st.set('st-march', false);
  } },
  { key: ['celebrated Tet early'], icon: '🧧', label: 'Tet early', async play(st) {
    st.set('st-lb-speed', false);
    st.look(X.camp);
    st.show('qt', false); st.show('ham', false); st.show('hue', true); st.place('hue', X.camp - 60, FLOOR, 1);
    st.place('s1', X.camp + 70, FLOOR, -1); st.place('s2', X.camp - 170, FLOOR, 1);
    st.set('st-tet'); st.set('st-bloom'); st.sfx('sparkle', { vol: 0.3 });
    st.set('st-lb-tet');
    await st.wait(600);
    st.sfx('fireworks', { vol: 0.6 }); st.fx('sparkle', X.camp - 40, 90);
    SOL.forEach((id) => { st.pose(id, 'cheer'); st.mood(id, 'joy'); }); st.mood('hue', 'joy');
    await st.wait(900);
    st.sfx('cheer', { vol: 0.5 });
    await st.wait(900);
    SOL.forEach((id) => st.pose(id, 'e130_spear'));
  } },
  { key: ['promised', 'the seventh day of Tet'], icon: '🤝', label: 'a promise', async play(st) {
    st.set('st-lb-tet', false);
    st.look(X.camp - 20);
    st.pose('hue', 'e130_promise'); st.mood('hue', 'happy');
    const say = st.say('hue', 'Day 7 of Tet in Thang Long!', 2400);
    await st.wait(700);
    st.set('st-lb-day7'); st.sfx('pop', { vol: 0.6 });
    await say;
    SOL.forEach((id) => { st.pose(id, 'cheer'); }); st.sfx('cheer', { vol: 0.5 });
    await st.wait(900);
    SOL.forEach((id) => st.pose(id, 'e130_spear')); st.pose('hue', 'stand');
  } },
  { key: ['the fifth day of Tet in 1789', 'Ngoc Hoi and Dong Da'], icon: '🚩', label: 'Ngoc Hoi · Dong Da', async play(st) {
    st.set('st-lb-day7', false);
    st.look(X.fort - 80, { dur: 1400 });
    st.sfx('lion-drum', { vol: 0.7 });
    await Promise.all([
      st.walk('hue', X.fort - 260, { speed: 220, follow: false }),
      st.walk('s1', X.fort - 330, { speed: 220, follow: false }),
      st.walk('s2', X.fort - 380, { speed: 220, follow: false }),
    ]);
    st.face('s1', 1); st.pose('hue', 'point');
    st.set('st-win'); st.sfx('whoosh', { vol: 0.5 });
    await st.wait(1100);
    st.fx('poof', X.fort + 20, 210, { quiet: true }); st.sfx('cheer', { vol: 0.6 });
    st.set('st-lb-win'); st.sfx('ding', { vol: 0.5 });
    SOL.forEach((id) => { st.pose(id, 'cheer'); st.mood(id, 'joy'); });
    await st.wait(1400);
    SOL.forEach((id) => st.pose(id, 'e130_spear')); st.pose('hue', 'stand');
  } },
  { key: ['rode into Thang Long', 'had run away'], icon: '🏃', label: 'ran away', async play(st) {
    st.set('st-lb-win', false);
    st.show('hue', false); st.show('qt', true); st.place('qt', X.gate - 420, FLOOR, 1);
    st.place('s1', X.gate - 520, FLOOR, 1); st.place('s2', X.gate - 570, FLOOR, 1);
    st.look(X.gate, { dur: 1200 });
    QING.forEach((id) => { st.pose(id, 'e130_run'); st.mood(id, 'wow'); });
    st.sfx('whoosh', { vol: 0.5 });
    const run = Promise.all(QING.map((id, i) => st.walk(id, X.gate + 520 + i * 60, { speed: 230, follow: false, pose: 'e130_run' })));
    st.set('st-lb-ran');
    await st.wait(500);
    st.set('st-free'); st.sfx('lion-drum', { vol: 0.6 });
    await st.loop('steps', () => Promise.all([
      st.walk('qt', X.gate - 10, { speed: 150, follow: false }),
      st.walk('s1', X.gate - 130, { speed: 150, follow: false }),
      st.walk('s2', X.gate - 180, { speed: 150, follow: false }),
    ]), { vol: 0.7 });
    await run;
    QING.forEach((id) => st.show(id, false));
    st.sfx('cheer', { vol: 0.5 });
    await st.wait(600);
  } },
  { key: ['kept his promise', 'two days early'], icon: '🎉', label: 'two days early', async play(st) {
    st.set('st-lb-ran', false);
    st.look(X.gate);
    st.set('st-lb-early'); st.sfx('pop', { vol: 0.6 });
    await st.wait(700);
    st.sfx('fireworks', { vol: 0.6 }); st.fx('sparkle', X.gate - 80, 60); st.fx('sparkle', X.gate + 90, 50, { quiet: true });
    SOL.forEach((id) => { st.pose(id, 'cheer'); st.mood(id, 'joy'); });
    st.sfx('cheer', { vol: 0.6 });
    await st.wait(1500);
    SOL.forEach((id) => st.pose(id, 'e130_spear'));
  } },
  { key: ['People say', 'a peach branch to Phu Xuan'], icon: '🌸', label: 'a peach branch', async play(st) {
    st.set('st-lb-early', false);
    st.set('st-lb-say'); st.sfx('page-turn', { vol: 0.5 });
    st.show('ms', true); st.place('ms', X.gate + 40, FLOOR, -1);
    st.look(X.gate - 60);
    await st.wait(500);
    mark(st, 'ms', 'st-bloom'); st.sfx('sparkle', { vol: 0.4 });
    await st.wait(700);
    st.set('st-lb-tophu'); st.sfx('whoosh', { vol: 0.5 });
    await st.walk('ms', X.gate - 520, { speed: 230, follow: false });
    await st.wait(400);
  } },
  { key: ['the Dong Da Festival', 'the fifth day of Tet'], icon: '🥁', label: 'Dong Da Festival', async play(st) {
    off(st, 'st-lb-say', 'st-lb-tophu');
    KIDS.forEach((id) => st.show(id, true));
    st.look(X.fest + 60, { dur: 1600 });
    st.set('st-lb-fest'); st.sfx('ding', { vol: 0.4 });
    await Promise.all(KIDS.map((id, i) => st.walk(id, X.fest + 110 + i * 62, { speed: 140, follow: false })));
    st.set('st-drum'); st.sfx('lion-drum', { vol: 0.7 });
    st.pose('d1', 'e130_drum'); st.act('d1', 'nod');
    st.pose('minh', 'cheer'); st.pose('lan', 'wave'); st.act('lan', 'wave'); st.mood('minh', 'joy'); st.mood('lan', 'joy');
    await st.wait(1500);
    st.sfx('cheer', { vol: 0.5 });
    await st.wait(500);
    st.act('lan', null); st.act('d1', null);
  } },
];

export default {
  id: P, worldW: W, floor: FLOOR, viewTop: 40, camStart: X.gate - 260, css: KIT_CSS + vsCss(P) + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 2, 4, 5, 7],
  cast: [
    { id: 'ham', kind: 'thing', svg: HAMMOCK, box: [-80, -150, 160, 154], x: X.phu - 140 },
    { id: 'qt', kind: 'thing', svg: HORSE_QT, box: [-84, -230, 190, 234], x: X.phu + 20 },
    { id: 'ms', kind: 'thing', svg: HORSE_MS, box: [-84, -270, 190, 274], x: X.gate + 40, face: -1 },
    { id: 'q1', kind: 'adult', who: 'e130_qing', x: X.gate + 460, face: -1 },
    { id: 'q2', kind: 'adult', who: 'e130_qing', x: X.gate + 540, face: -1 },
    { id: 's1', kind: 'adult', who: 'e130_sol1', x: X.phu - 230, s: 0.96 },
    { id: 's2', kind: 'adult', who: 'e130_sol2', x: X.phu - 290, s: 0.96 },
    { id: 'hue', kind: 'adult', who: 'e130_hue', x: X.phu },
    { id: 'd1', kind: 'adult', who: 'e130_sol1', x: X.fest - 160 },
    { id: 'mum', kind: 'adult', who: 'e130_mum', x: X.fest - 420 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.fest - 480, s: 1.06 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.fest - 530 },
  ],
  init(st) {
    wear(st, 'hue', HAT.general); robe(st, 'hue'); st.chest('hue', ARMOR('#B45309'));
    for (const id of SOL) { wear(st, id, HAT.band); st.hold(id, 'vs_spear'); st.pose(id, 'e130_spear'); }
    for (const id of QING) { wear(st, id, HAT_QING); st.hold(id, 'vs_spear'); st.pose(id, 'e130_spear'); }
    wear(st, 'd1', HAT.band);
    st.show('qt', false); st.show('ms', false);
    KIDS.forEach((id) => st.show(id, false));
  },
};
