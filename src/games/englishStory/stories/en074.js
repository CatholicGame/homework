/**
 * Bài 74 "Helping Our Neighbours" (động từ + to V / V-ing): hai nhà sát vách rồi ra phố, trái sang phải: nhà Minh (phòng khách
 * + bếp) → cửa thông sang nhà bà Liên (ghế bành, chân bó bột, nạng, lịch, đồng hồ, giỏ của chú chó nhỏ) → công viên nhỏ
 * (Minh dắt chó, ném bóng) → chợ (sạp rau).
 * Mỗi người một việc: Lan nấu và mang bữa tối sang (thứ Ba), Minh dắt chó đi chơi, mẹ đi chợ mua rau, bố là bác sĩ khám chân,
 * bà nội sang kể chuyện mỗi chiều, hai bà trò chuyện hàng giờ (kim đồng hồ quay nhanh, trời ngả chiều).
 * Toạ độ cảnh: rộng 1960, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, person } from '../../tiengViet3/cast.js';
import { BOOK } from '../rig.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, room, doorway, windowBox, shelf, books, rug, thought, flowerAt } from '../kit.js';

const FLOOR = 282;
const W = 1960;
const X = { stove: 540, mid: 640, cal: 720, chair: 820, lien: 900, win: 960, clock: 1100, basket: 1110, door: 1190, park: 1380, stall: 1760 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e074_lien: { adult: true, old: true, hair: 'bun', hairC: '#D6D3D1', top: 'blouse', shirt: '#FCA5A5', bottom: 'pants', bottomC: '#44403C', shoe: '#78716C', glasses: true },
  e074_doc: { adult: true, hair: 'short', top: 'jacket', shirt: '#FFFFFF', inner: '#60A5FA', bottom: 'pants', bottomC: '#334155', shoe: '#44403C' },
  e074_vol: { ...CAST.en_minh_home, shirt: '#22C55E' },
});

// ── Đồ vật ────────────────────────────────────────────────────────────────
/** Chân bó bột (gốc = bàn chân, cao 46). */
const CASTLEG = `<rect x="-7" y="-46" width="14" height="46" rx="5" fill="#F8FAFC" stroke="${L}" stroke-width="1"/>${[-36, -26, -16].map((y) => `<path d="M-7 ${y} L7 ${y - 4}" stroke="#CBD5E1" stroke-width="1"/>`).join('')}<rect x="-8" y="-4" width="18" height="5" rx="2" fill="#F8FAFC" stroke="${L}" stroke-width="0.8"/>`;
/** Chú chó nhỏ màu trắng (nhìn sang phải, gốc = chân). */
const PUP = `<g class="e074-pup"><path d="M-14 -16 Q-22 -22 -20 -28" stroke="${L}" stroke-width="4.4" fill="none" stroke-linecap="round"/><path d="M-14 -16 Q-22 -22 -20 -28" stroke="#fff" stroke-width="2.8" fill="none" stroke-linecap="round"/>
  ${[[-10, 'A'], [8, 'B'], [-6, 'B'], [12, 'A']].map(([x, k]) => `<g transform="translate(${x} -12)"><g class="e074-leg${k}"><path d="M0 0 V11" stroke="${L}" stroke-width="5" stroke-linecap="round"/><path d="M0 0 V11" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/></g></g>`).join('')}
  <ellipse cx="0" cy="-16" rx="16" ry="8" fill="#fff" stroke="${L}" stroke-width="1"/>
  <g transform="translate(17 -26)"><circle r="8" fill="#fff" stroke="${L}" stroke-width="1"/><path d="M-6 -4 Q-10 4 -5 8 Q-2 2 -2 -4Z" fill="#B45309" stroke="${L}" stroke-width="0.7"/>
    <circle cx="8" cy="1" r="2" fill="#1F2937"/><circle cx="2" cy="-2" r="1.4" fill="#1F2937"/><path d="M3 4 q2 2 4 0" stroke="${L}" stroke-width="0.8" fill="none"/></g>
  <rect x="6" y="-22" width="4" height="8" rx="1.5" fill="#3B82F6" stroke="${L}" stroke-width="0.5"/></g>`;
const BALL = `<circle r="5" fill="#FACC15" stroke="${L}" stroke-width="0.8"/><path d="M-5 0 Q0 -3 5 0" stroke="#fff" stroke-width="1" fill="none"/>`;
const POT = `<path d="M-14 -10 H14 V6 Q14 12 8 12 H-8 Q-14 12 -14 6Z" fill="#94A3B8" stroke="${L}" stroke-width="1"/><path d="M-18 -10 H18" stroke="${L}" stroke-width="2.4" stroke-linecap="round"/>`;
const DINNER = `<g transform="translate(0 -20)"><path d="M-14 -2 H14 Q13 10 0 11 Q-13 10 -14 -2Z" fill="#fff" stroke="#3B82F6" stroke-width="1.2"/><path d="M-11 -2 Q0 -9 11 -2Z" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/><circle cx="-4" cy="-4" r="2" fill="#22C55E"/><circle cx="4" cy="-4" r="2" fill="#F87171"/></g>`;
const BASKET = `<g transform="translate(0 -18)"><path d="M-16 -6 H16 L12 12 H-12Z" fill="#D97706" stroke="${L}" stroke-width="1"/><path d="M-14 0 H14 M-13 6 H13" stroke="#92400E" stroke-width="0.8"/>
  <g class="e074-veg"><circle cx="-8" cy="-9" r="5" fill="#22C55E" stroke="${L}" stroke-width="0.6"/><path d="M2 -6 L12 -16" stroke="#F97316" stroke-width="4" stroke-linecap="round"/><circle cx="6" cy="-9" r="4.4" fill="#EF4444" stroke="${L}" stroke-width="0.6"/></g></g>`;
const SUITCASE = `<g transform="translate(0 -4)"><path d="M0 0 V10" stroke="${L}" stroke-width="1.6"/><rect x="-11" y="10" width="22" height="28" rx="3" fill="#8B5CF6" stroke="${L}" stroke-width="1"/><circle cx="-6" cy="40" r="2.4" fill="#1F2937"/><circle cx="6" cy="40" r="2.4" fill="#1F2937"/></g>`;
const STETH = `<g transform="translate(0 -26)"><path d="M-6 -10 Q-8 4 0 8 Q8 4 6 -10" stroke="#334155" stroke-width="1.6" fill="none"/><circle cx="0" cy="10" r="3" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/></g>`;
const CLIP = `<g transform="translate(6 -20)"><rect x="-7" y="-9" width="14" height="18" rx="1.5" fill="#B45309" stroke="${L}" stroke-width="0.7"/><rect x="-5" y="-6" width="10" height="13" fill="#fff"/><path d="M-3 -2 h6 M-3 1 h6 M-3 4 h4" stroke="#94A3B8" stroke-width="0.7"/></g>`;

const PROPS = {
  e074_ladle: `<g transform="rotate(180)"><path d="M0 -2 V18" stroke="#78716C" stroke-width="2" stroke-linecap="round"/><ellipse cx="0" cy="20" rx="4" ry="3" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/></g>`,
  e074_case: `<g transform="rotate(180) translate(0 -6)">${SUITCASE}</g>`,
  e074_crutch: `<g transform="translate(0 -6)"><path d="M0 -20 V64" stroke="#94A3B8" stroke-width="3.2" stroke-linecap="round"/><path d="M-6 -20 H6" stroke="#475569" stroke-width="4" stroke-linecap="round"/><path d="M-3 4 H3" stroke="#475569" stroke-width="3"/></g>`,
};
const POSES = {
  e074_bend: { R: [50, 70], L: [40, 60], dy: 28, head: 14 },
  e074_check: { R: [40, 70], L: [30, 40], dy: 30, head: 16 },
  e074_crutch: { R: [14, 6], L: [20, 10], head: -4 },
  e074_offer: { R: [150, 168], L: [10, 4], head: -4 },
  e074_tell: { R: [70, 140], L: [40, 110], dy: 20, head: -4 },
  e074_sitTalk: { R: [50, 80], L: [40, 110], dy: 20, head: -6 },
};

function bg() {
  const clockHands = `<g class="e074-hand"><path d="M0 0 V-11" stroke="${L}" stroke-width="2.2" stroke-linecap="round"/></g><g class="e074-hand2"><path d="M0 0 L7 3" stroke="${L}" stroke-width="2.6" stroke-linecap="round"/></g>`;
  return `
  <!-- Nhà Minh: phòng khách + bếp -->
  ${room(0, X.mid, FLOOR, '#FEF3C7')}
  ${windowBox(60, 80, 100, 80)}
  ${shelf(210, 120, 110, books(222, 120, 6))}
  ${rug(260, FLOOR, 160, '#BFDBFE')}
  <rect x="440" y="200" width="160" height="${FLOOR - 200}" fill="#E7E5E4" stroke="${L}" stroke-width="1.2"/><rect x="436" y="194" width="168" height="9" rx="2" fill="#A8A29E" stroke="${L}"/>
  <rect x="${X.stove - 26}" y="186" width="52" height="8" rx="2" fill="#334155" stroke="${L}"/><g transform="translate(${X.stove} 186)"><g class="e074-pot">${POT}</g></g>
  <g class="e074-steam">${[-8, 0, 8].map((dx, i) => `<path class="ek-steam" style="animation-delay:${i * 0.5}s" d="M${X.stove + dx} 170 q-5 -8 0 -16 q5 -8 0 -16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <path d="M460 220 H580 M460 250 H580" stroke="#A8A29E" stroke-width="1"/>
  <!-- Nhà bà Liên -->
  ${room(X.mid, X.door - X.mid, FLOOR, '#FCE7F3', '#C9A27E')}
  ${doorway(X.mid, FLOOR)}
  <g transform="translate(${X.cal} 120)"><rect x="-24" y="-22" width="48" height="50" rx="4" fill="#fff" stroke="${L}" stroke-width="1.1"/><rect x="-24" y="-22" width="48" height="13" rx="4" fill="#EF4444" stroke="${L}"/>
    <g class="e074-calpage"><text x="0" y="12" text-anchor="middle" ${NUN} font-size="18" fill="#1E3A8A">1</text></g></g>
  <defs><clipPath id="e074win"><rect x="${X.win}" y="70" width="90" height="80"/></clipPath></defs>
  <rect x="${X.win}" y="70" width="90" height="80" fill="#BAE6FD"/><rect class="e074-dusk" x="${X.win}" y="70" width="90" height="80" fill="#FB923C"/>
  <g clip-path="url(#e074win)"><g class="e074-wsun"><circle cx="${X.win + 60}" cy="96" r="11" fill="#FDE047" stroke="#F59E0B"/></g><path d="M${X.win} 134 Q${X.win + 40} 120 ${X.win + 90} 132 V150 H${X.win}Z" fill="#86EFAC"/></g>
  <rect x="${X.win - 6}" y="64" width="102" height="92" rx="4" fill="none" stroke="#fff" stroke-width="6"/><rect x="${X.win - 8}" y="62" width="106" height="96" rx="4" fill="none" stroke="${L}" stroke-width="1.2"/><path d="M${X.win + 45} 66 V154" stroke="#fff" stroke-width="4"/>
  <g transform="translate(${X.clock} 96)"><circle r="18" fill="#fff" stroke="${L}" stroke-width="2"/>${clockHands}<circle r="2" fill="${L}"/></g>
  <!-- ghế bành của bà Liên + ghế của bà nội -->
  <g transform="translate(${X.lien} ${FLOOR})"><rect x="-30" y="-92" width="60" height="70" rx="12" fill="#A78BFA" stroke="${L}" stroke-width="1.2"/><rect x="-38" y="-52" width="76" height="22" rx="8" fill="#8B5CF6" stroke="${L}"/><path d="M-32 -30 V0 M32 -30 V0" stroke="#5B21B6" stroke-width="4"/></g>
  <g transform="translate(${X.chair} ${FLOOR})"><rect x="-18" y="-80" width="36" height="46" rx="4" fill="#F59E0B" stroke="${L}"/><rect x="-22" y="-40" width="44" height="8" rx="3" fill="#D97706" stroke="${L}"/><path d="M-18 -32 V0 M18 -32 V0" stroke="#92400E" stroke-width="3"/></g>
  <g transform="translate(${X.lien + 52} ${FLOOR})"><path d="M-6 0 L6 -82" stroke="#94A3B8" stroke-width="3"/><path d="M0 0 L12 -80" stroke="#94A3B8" stroke-width="3"/><path d="M2 -82 H14" stroke="#475569" stroke-width="4" stroke-linecap="round"/></g>
  <g transform="translate(${X.basket} ${FLOOR})"><path d="M-26 -16 Q-26 0 -18 0 H18 Q26 0 26 -16Z" fill="#D97706" stroke="${L}" stroke-width="1"/><ellipse cx="0" cy="-16" rx="26" ry="5" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/></g>
  ${doorway(X.door, FLOOR)}
  <!-- Công viên -->
  ${sky(X.door + 12, W - X.door - 12, 315, 'e074sky')}
  ${cloud(1320, 60, 0.8, 0)}${cloud(1700, 50, 0.9, 3)}
  <path d="M${X.door + 12} 230 Q1400 200 1600 226 T${W} 222 V${FLOOR} H${X.door + 12}Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(1290, FLOOR - 4, 1)}${tree(1530, FLOOR - 4, 0.8, '')}
  <rect x="1420" y="246" width="70" height="7" rx="2" fill="#B45309" stroke="${L}"/><path d="M1426 253 V${FLOOR} M1484 253 V${FLOOR}" stroke="#78350F" stroke-width="3"/>
  <rect x="${X.door + 12}" y="${FLOOR - 4}" width="${W - X.door - 12}" height="40" fill="#86EFAC" stroke="${L}"/>
  <!-- Chợ -->
  <g transform="translate(${X.stall} 0)"><path d="M-110 120 H110 L96 150 H-96Z" fill="#22C55E" stroke="${L}" stroke-width="1.2"/>
    ${[-80, -40, 0, 40, 80].map((dx, i) => `<path d="M${dx - 20} 150 q20 14 40 0" fill="${i % 2 ? '#fff' : '#22C55E'}" stroke="${L}" stroke-width="0.7"/>`).join('')}
    <text x="0" y="142" text-anchor="middle" ${NUN} font-size="15" fill="#fff">MARKET</text><path d="M-96 150 V${FLOOR} M96 150 V${FLOOR}" stroke="#92400E" stroke-width="5"/></g>
  <!-- nhãn -->
  <g class="e074-lb e074-lb-month">${label(X.cal, 62, 'last month', '#DC2626', 14)}</g>
  <g class="e074-lb e074-lb-alone">${label(X.lien + 10, 62, 'alone', '#475569', 15)}</g>
  <g class="e074-lb e074-lb-tue">${label(X.stove - 20, 62, 'every Tuesday', '#EA580C', 14)}</g>
  <g class="e074-lb e074-lb-doctor">${label(X.lien - 70, 62, 'doctor', '#2563EB', 15)}</g>
  <g class="e074-lb e074-lb-noon">${label(X.chair - 40, 62, 'every afternoon', '#CA8A04', 14)}</g>
  <g class="e074-lb e074-lb-hours">${label(X.clock - 10, 140, 'hours', '#7C3AED', 14)}</g>`;
}

function fg() {
  const walker = `${person(-30, 34, 'e074_lien', 'walk', { s: 0.42 })}<g transform="translate(20 34)"><path d="M-40 0 H60" stroke="#16A34A" stroke-width="3"/>${flowerAt(10, 0, '#F472B6')}${flowerAt(36, 0, '#FACC15')}</g>
    <g transform="translate(36 -10) scale(0.9)"><circle r="10" fill="#FDE047" stroke="#F59E0B"/></g>`;
  const vol = `${person(-20, 36, 'e074_vol', 'stand', { s: 0.5 })}<g transform="translate(6 30)"><path d="M-6 -6 H6 L4 6 H-4Z" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/></g>
    <text x="-6" y="-22" text-anchor="middle" ${NUN} font-size="10" fill="#16A34A">VOLUNTEER CLUB</text>
    <g transform="translate(52 6)"><rect x="-20" y="-16" width="40" height="34" rx="3" fill="#fff" stroke="${L}" stroke-width="0.9"/><rect x="-20" y="-16" width="40" height="9" rx="3" fill="#22C55E"/><text x="0" y="8" text-anchor="middle" ${NUN} font-size="7" fill="#1E3A8A">next year</text></g>`;
  return `
  <!-- sạp rau (che chân người bán) -->
  <g transform="translate(${X.stall} 0)"><rect x="-10" y="214" width="110" height="${FLOOR - 214}" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/><rect x="-14" y="208" width="118" height="8" rx="3" fill="#D97706" stroke="${L}"/>
    ${[6, 26, 46, 66, 86].map((x, i) => `<circle cx="${x}" cy="200" r="8" fill="${['#22C55E', '#EF4444', '#16A34A', '#F97316', '#84CC16'][i]}" stroke="${L}" stroke-width="0.8"/>`).join('')}</g>
  ${bush(1360, FLOOR + 28, 0.7, '#4ADE80')}
  ${thought(X.lien + 130, 84, 200, 90, walker, [X.lien + 30, 128], 'e074-think e074-t-walk')}
  ${thought(X.lien - 130, 96, 220, 104, vol, [X.lien - 150, 156], 'e074-think e074-t-vol')}
  <g class="e074-lb e074-lb-good">${label(770, 72, 'helping feels good', '#DB2777', 14)}</g>`;
}

const CSS = `
.e074-lb { opacity: 0; transition: opacity .35s; }
${['month', 'alone', 'tue', 'doctor', 'noon', 'hours', 'good'].map((k) => `.st-lb-${k} .e074-lb-${k}`).join(', ')} { opacity: 1; }
.e074-calpage { transform-box: fill-box; transform-origin: 50% 0; }
.st-lb-month .e074-calpage { animation: e074Flip .4s ease-out 3; }
@keyframes e074Flip { from { transform: scaleY(0); } to { transform: none; } }
.e074-steam { opacity: 0; transition: opacity .4s; } .st-cook .e074-steam { opacity: 1; }
.st-cook .e074-pot { animation: e074Rattle .15s linear infinite alternate; }
@keyframes e074Rattle { from { transform: translateY(0); } to { transform: translateY(-1.5px); } }
.e074-dusk { opacity: 0; transition: opacity 2.4s; } .st-dusk .e074-dusk { opacity: .55; }
.e074-wsun { transition: transform 2.4s ease-in; } .st-dusk .e074-wsun { transform: translateY(44px); }
.e074-hand, .e074-hand2 { transform-origin: 0 0; }
.st-hours .e074-hand { animation: ekSpin .5s linear infinite; } .st-hours .e074-hand2 { animation: ekSpin 3s linear infinite; }
.e074-think { opacity: 0; transition: opacity .3s; }
.st-t-walk .e074-t-walk, .st-t-vol .e074-t-vol { opacity: 1; }
.es-thing.is-walk .e074-legA { animation: ppStepA .2s ease-in-out infinite alternate; }
.es-thing.is-walk .e074-legB { animation: ppStepB .2s ease-in-out infinite alternate; }
.es-thing.act-e074-jump .e074-pup { animation: ppJump .3s ease-in-out infinite alternate; }
@media (prefers-reduced-motion: reduce) {
  .st-lb-month .e074-calpage { animation-iteration-count: 1; animation-duration: .8s; }
  .st-cook .e074-pot { animation-duration: .5s; }
  .st-hours .e074-hand { animation-duration: 1.5s; } .st-hours .e074-hand2 { animation-duration: 8s; }
  .es-thing.is-walk .e074-legA, .es-thing.is-walk .e074-legB { animation-duration: .4s; }
  .es-thing.act-e074-jump .e074-pup { animation-duration: .7s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const LEG = (dir) => X.lien + 8 * dir; // chân phải của bà Liên (lật khi bà quay trái)

const BEATS = [
  { key: ['broke her leg last month'], icon: '🦵', label: 'broke her leg', async play(st) {
    st.look(X.lien - 60);
    st.set('st-lb-month'); st.sfx('page-turn', { vol: 0.7 });
    await st.wait(900);
    st.pose('lien', 'stand'); st.mood('lien', 'happy');
    await st.wait(500);
    st.mood('lien', 'cry'); st.act('lien', 'shiver'); st.sfx('bump', { vol: 0.6 });
    await st.say('lien', 'Ouch!', 1000);
    st.act('lien', null); st.pose('lien', 'sit'); st.mood('lien', 'sad');
    await st.wait(400);
  } },
  { key: ['lives alone', 'decided to help her'], icon: '🤝', label: 'decided to help', async play(st) {
    st.set('st-lb-month', false);
    st.look(X.lien - 60);
    st.set('st-lb-alone'); st.sfx('tick', { vol: 0.5 }); st.pose('lien', 'sad');
    await st.wait(1300);
    st.set('st-lb-alone', false);
    await st.look(420, { dur: 1100 });
    for (const id of ['dad', 'mum', 'lan', 'minh']) { st.pose(id, 'raise'); st.mood(id, 'joy'); }
    st.sfx('clap', { vol: 0.6 });
    await st.say('mum', "Let's help her!", 1500);
    for (const id of ['dad', 'mum', 'lan', 'minh']) st.pose(id, 'stand');
  } },
  { key: ['offered to cook dinner', 'every Tuesday'], icon: '🍲', label: 'cook dinner', async play(st) {
    st.look(X.stove - 30);
    // Minh và mẹ cũng sang nhà bà Liên (Minh tới chỗ giỏ của chú chó)
    const others = Promise.all([st.walk('minh', X.basket - 70, { speed: 140, follow: false }), st.walk('mum', X.cal, { speed: 140, follow: false })]);
    st.pose('lan', 'e074_offer'); st.mood('lan', 'joy'); st.sfx('pop', { vol: 0.4 });
    await st.say('lan', 'I can cook!', 900);
    await st.walk('lan', X.stove - 30, { speed: 130, follow: false });
    st.set('st-lb-tue'); st.set('st-cook');
    st.hold('lan', 'e074_ladle'); st.pose('lan', 'stir'); st.act('lan', 'stir');
    await st.loop('pot-stir', () => st.wait(1300), { vol: 0.8 });
    st.sfx('sizzle', { vol: 0.4 });
    st.act('lan', null); st.hold('lan', null); st.set('st-cook', false);
    st.chest('lan', DINNER); st.pose('lan', 'carry');
    st.look(X.lien - 120, { dur: 2000 });
    await Promise.all([st.walk('lan', X.lien - 64, { speed: 140, follow: false }), others]);
    st.chest('lan', null); st.pose('lan', 'give'); st.sfx('bowl-down', { vol: 0.6 }); st.chest('lien', DINNER);
    st.mood('lien', 'joy');
    await st.wait(500);
    st.pose('lan', 'stand');
  } },
  { key: ['agreed to walk her little dog', 'enjoys playing with it'], icon: '🐕', label: 'walk the dog', async play(st) {
    st.set('st-lb-tue', false);
    st.look(X.basket - 40);
    st.act('minh', 'nod'); st.mood('minh', 'joy');
    st.act('pup', 'e074-jump'); st.sfx('dog-bark', { vol: 0.5, rate: 1.4 });
    await st.wait(700);
    st.act('minh', null); st.act('pup', null);
    await Promise.all([
      st.walk('minh', X.park, { speed: 130, lead: 40 }),
      st.walk('pup', X.park + 40, { speed: 130, follow: false }),
    ]);
    st.pose('minh', 'throw'); st.sfx('whoosh', { vol: 0.5 });
    await st.fly(BALL, [X.park + 10, 180], [X.park + 150, FLOOR - 6], { size: 14, dur: 600 });
    st.sfx('dog-bark', { vol: 0.6, rate: 1.4 });
    await st.walk('pup', X.park + 150, { speed: 220, follow: false });
    st.face('pup', -1);
    await st.walk('pup', X.park + 40, { speed: 220, follow: false });
    st.pose('minh', 'cheer'); st.act('minh', 'hop'); st.mood('minh', 'joy'); st.sfx('giggle', { vol: 0.6 });
    await st.wait(800);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['promised to buy vegetables', 'at the market'], icon: '🥕', label: 'buy vegetables', async play(st) {
    st.look(X.cal + 40);
    st.face('mum', 1); st.pose('mum', 'me'); st.mood('mum', 'joy'); st.sfx('pop', { vol: 0.4 });
    await st.say('mum', 'I promise!', 1100);
    // cắt cảnh: mẹ ra chợ
    st.pose('mum', 'stand');
    st.place('mum', X.stall - 260, FLOOR, 1);
    st.look(X.stall - 120, { instant: true });
    await st.walk('mum', X.stall - 50, { speed: 140, follow: false });
    st.pose('mum', 'give'); st.sfx('cash', { vol: 0.6 });
    await st.wait(500);
    st.chest('mum', BASKET); st.pose('mum', 'carry'); st.sfx('bag-on', { vol: 0.5 });
    st.pose('seller', 'wave'); st.act('seller', 'wave');
    await st.wait(900);
    st.act('seller', null); st.pose('seller', 'stand');
  } },
  { key: ['Dad is a doctor', 'keeps checking her leg'], icon: '🩺', label: 'checking her leg', async play(st) {
    st.look(X.lien - 100);
    st.sfx('door-open', { vol: 0.5 });
    await st.walk('lan', X.cal - 30, { speed: 140, follow: false });
    st.face('lan', 1);
    st.set('st-lb-doctor');
    st.place('dad', X.mid - 30, FLOOR, 1);
    await st.walk('dad', X.lien - 52, { speed: 140, follow: false });
    st.pose('dad', 'e074_check'); st.mood('dad', 'happy');
    for (let i = 0; i < 3; i++) { await st.wait(380); st.sfx('knock', { vol: 0.3, rate: 1.4 }); }
    st.chest('dad', CLIP); st.pose('dad', 'write'); st.act('dad', 'write');
    await st.loop('pencil', () => st.wait(800), { vol: 0.7 });
    st.act('dad', null); st.chest('dad', STETH); st.pose('dad', 'e074_check');
    for (let i = 0; i < 2; i++) { await st.wait(350); st.sfx('knock', { vol: 0.3, rate: 1.4 }); }
    st.mood('lien', 'joy');
    await st.wait(300);
  } },
  { key: ['Grandma was staying with the family', 'that month'], icon: '👵', label: 'Grandma', async play(st) {
    st.set('st-lb-doctor', false);
    // cắt cảnh: nhà Minh, bà nội tới ở cùng
    st.chest('dad', null); st.place('dad', 470, FLOOR, -1); st.pose('dad', 'stand');
    st.place('lan', 420, FLOOR, -1); st.place('minh', 380, FLOOR, -1); st.pose('minh', 'stand'); st.show('pup', false);
    st.show('mum', false); st.chest('lien', null);
    st.look(260, { instant: true });
    st.show('grandma', true); st.hold('grandma', 'e074_case'); st.pose('grandma', 'stand');
    await st.loop('roll', () => st.walk('grandma', 290, { speed: 120, follow: false }), { vol: 0.6 });
    st.hold('grandma', null); st.pose('grandma', 'open'); st.mood('grandma', 'joy');
    for (const id of ['dad', 'lan', 'minh']) { st.mood(id, 'joy'); }
    st.pose('lan', 'open'); st.pose('minh', 'wave'); st.act('minh', 'wave');
    st.fx('hearts', 340, 140);
    await st.wait(1300);
    st.act('minh', null); st.pose('minh', 'stand'); st.pose('lan', 'stand'); st.pose('grandma', 'stand');
  } },
  { key: ['loves telling old stories', 'every afternoon'], icon: '📖', label: 'old stories', async play(st) {
    st.set('st-lb-noon');
    st.chest('grandma', 'book'); st.pose('grandma', 'carry');
    st.look(X.mid, { dur: 2600 });
    await st.walk('grandma', X.mid - 30, { speed: 130, follow: false });
    st.sfx('knock', { vol: 0.6 });
    await st.wait(400);
    st.sfx('door-open', { vol: 0.5 });
    st.look(X.chair + 20, { dur: 1400 });
    await st.walk('grandma', X.chair, { speed: 130, follow: false });
    st.face('grandma', 1); st.pose('grandma', 'read'); st.act('grandma', 'read'); st.sfx('page-turn', { vol: 0.6 });
    st.mood('lien', 'joy'); st.face('lien', -1);
    await st.wait(1000);
    st.act('grandma', null);
  } },
  { key: ['spent hours chatting'], icon: '💬', label: 'chatting', async play(st) {
    st.set('st-lb-noon', false);
    st.look(X.lien + 20);
    st.chest('grandma', null); st.pose('grandma', 'e074_sitTalk');
    st.set('st-hours'); st.set('st-dusk'); st.set('st-lb-hours');
    await st.loop('tick', async () => {
      for (let i = 0; i < 2; i++) {
        st.talk('grandma', true); st.talk('lien', false); await st.wait(700);
        st.talk('grandma', false); st.talk('lien', true); st.pose('lien', 'sitWave'); await st.wait(700);
        st.pose('lien', 'sit');
      }
    }, { vol: 0.6 });
    st.talk('lien', false);
    st.mood('grandma', 'joy'); st.mood('lien', 'joy'); st.sfx('giggle', { vol: 0.6 });
    await st.wait(700);
  } },
  { key: ['hope to walk again soon'], icon: '🩼', label: 'walk again', async play(st) {
    off(st, 'st-hours', 'st-lb-hours');
    st.look(X.lien);
    st.pose('grandma', 'sit');
    st.hold('lien', 'e074_crutch'); st.pose('lien', 'e074_crutch'); st.mood('lien', 'happy'); st.sfx('knock', { vol: 0.5, rate: 0.8 });
    await st.wait(500);
    st.set('st-t-walk'); st.sfx('pop', { vol: 0.4 });
    st.talk('lien', true);
    await st.wait(600);
    st.sfx('birds', { vol: 0.4 });
    await st.wait(1300);
    st.talk('lien', false);
  } },
  { key: ['Thank you for helping me'], icon: '🙏', label: 'thank you', async play(st) {
    st.set('st-t-walk', false);
    st.look(X.chair - 60);
    st.pose('grandma', 'sit');
    st.show('mum', true); st.chest('mum', null); st.pose('mum', 'stand');
    const spots = { dad: 662, mum: 700, lan: 732, minh: 762 };
    for (const id of ['dad', 'mum', 'lan', 'minh']) st.place(id, X.mid - 70 + (spots[id] - 690) * 0.4, FLOOR, 1);
    st.sfx('door-open', { vol: 0.4 });
    await Promise.all(['dad', 'mum', 'lan', 'minh'].map((id) => st.walk(id, spots[id], { speed: 130, follow: false })));
    st.pose('lien', 'e074_crutch'); st.mood('lien', 'joy');
    await st.say('lien', 'Thank you!', 1100);
    st.fx('hearts', X.lien - 10, 120);
    for (const id of ['dad', 'mum', 'lan', 'minh']) st.mood(id, 'joy');
    await st.wait(900);
  } },
  { key: ['helping people feels good'], icon: '💖', label: 'feels good', async play(st) {
    st.look(X.chair - 40);
    st.pose('minh', 'me'); st.mood('minh', 'joy');
    st.set('st-lb-good'); st.sfx('ding', { vol: 0.5 });
    await st.wait(400);
    st.fx('hearts', 762, 170, { quiet: true });
    await st.wait(1500);
  } },
  { key: ['join a volunteer club next year'], icon: '🙋', label: 'volunteer club', async play(st) {
    st.set('st-lb-good', false);
    st.look(X.chair - 40);
    st.pose('minh', 'think');
    st.set('st-t-vol'); st.sfx('pop', { vol: 0.5 });
    await st.wait(700);
    st.sfx('sweep', { vol: 0.5 });
    await st.wait(1000);
    st.pose('minh', 'raise'); st.mood('minh', 'joy');
    await st.wait(800);
  } },
];

export default {
  id: 'en074', worldW: W, floor: FLOOR, viewTop: 40, camStart: X.lien - 300, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 2, 3, 4, 5, 8],
  cast: [
    { id: 'seller', kind: 'adult', who: 'hangXom', x: X.stall + 46, s: 0.95, face: -1 },
    { id: 'lien', kind: 'adult', who: 'e074_lien', x: X.lien, s: 0.95, face: -1 },
    { id: 'castleg', kind: 'thing', x: LEG(-1) - 0.4, svg: CASTLEG, box: [-9, -48, 20, 50] },
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: -60, s: 0.95 },
    { id: 'dad', kind: 'adult', who: 'e074_doc', x: 330, s: 0.95 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 390, s: 0.95, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 440, s: 1.08, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 490, face: -1 },
    { id: 'pup', kind: 'thing', x: X.basket, y: FLOOR - 6, svg: PUP, box: [-24, -36, 52, 38], face: -1 },
  ],
  init(st) {
    st.pose('lien', 'sit'); st.mood('lien', 'sad');
    st.show('grandma', false);
    st.face('dad', 1);
  },
};
