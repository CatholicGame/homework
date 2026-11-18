/**
 * Bài 102 "Bip Likes Pho" (like / don't like; can / can't). Bộ 👽: tập 2, Bíp ăn thử món Việt.
 * Một thế giới đi từ trái sang phải: bếp nhà Minh (tủ lạnh, bếp ga có nồi phở bốc hơi, kệ bát, cửa sổ) → cửa thông →
 * phòng ăn (bàn ăn, ghế, tranh trên tường) → phòng khách (sofa) nơi Bíp đói bụng lúc đầu.
 * Bíp đói (bong bóng nghĩ đồ ăn) → bay vào bếp, Mum đang khuấy nồi hỏi → Mum bưng bát phở to ra bàn, Bíp ăn thìa, râu sáng →
 * Lan mang xôi, Bíp nếm thì dính tay, lắc mãi không rơi, Lan cười → Bíp gắp đũa rơi mì, Minh gắp giỏi, dạy "Like this!" →
 * Bíp gắp được → bong bóng nghĩ Lumo (quả tím, không có mì) → cả nhà vui.
 * Toạ độ cảnh: rộng 1300, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, room, doorway, windowBox, shelf, label, thought, speaker, rug, steam, table } from '../kit.js';
import { BIP_SVG, BIP_BOX, BIP_CSS, BIP_AT, bipSet, bipHold } from '../bip.js';

const FLOOR = 282;
const W = 1300;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { fridge: 60, stove: 330, mum: 392, door: 590, bipK: 512, table: 900, bip: 828, minh: 905, lan: 972, mumT: 1046, liv: 1110, sofa: 1200, door2: 1250 };
const TT = FLOOR - 58; // mặt bàn ăn
const BIPY = FLOOR - 50; // Bíp ngồi trên ghế có đệm
const KLOOK = 455, TLOOK = 912;

// ── Đồ vật ────────────────────────────────────────────────────────────────
/** Bát phở to (gốc ở giữa đáy): mì, thịt bò, hành, rau thơm. */
const PHO = (s = 1) => `<g transform="scale(${s})"><path d="M-30 -22 H30 Q28 -2 0 0 Q-28 -2 -30 -22Z" fill="#fff" stroke="#3B82F6" stroke-width="1.6"/>
  <path d="M-24 -8 H24" stroke="#93C5FD" stroke-width="2"/>
  <ellipse cx="0" cy="-22" rx="30" ry="6" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/>
  <path class="e102-nd" d="M-22 -23 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0" stroke="#FEF3C7" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <g class="e102-beef"><path d="M-16 -25 l9 -3 l3 4 l-9 3Z M4 -27 l10 -2 l2 4 l-10 2Z" fill="#B45309" stroke="${L}" stroke-width="0.6"/></g>
  <circle cx="-4" cy="-21" r="2" fill="#22C55E"/><circle cx="10" cy="-21" r="1.8" fill="#16A34A"/><circle cx="-12" cy="-20" r="1.6" fill="#4ADE80"/></g>`;
/** Đĩa xôi (gốc ở giữa đáy): xôi trắng, đỗ xanh, hành phi. */
const XOI = `<ellipse cx="0" cy="-2" rx="24" ry="4.5" fill="#fff" stroke="${L}" stroke-width="1"/>
  <path d="M-16 -4 Q-14 -20 0 -21 Q14 -20 16 -4Z" fill="#FEF9C3" stroke="${L}" stroke-width="0.9"/>
  ${[[-8, -10], [-2, -15], [5, -11], [10, -7], [-11, -6], [2, -6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" fill="#F5F0DC" stroke="#D6CFB0" stroke-width="0.5"/>`).join('')}
  <path d="M-8 -16 Q0 -19 8 -16" stroke="#FACC15" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="-3" cy="-17" r="1.2" fill="#B45309"/><circle cx="4" cy="-18" r="1.2" fill="#B45309"/>`;
/** Đũa trong tay Bíp (gốc = bàn tay, tay buông +y xuống), mì gắp ở đầu đũa (ẩn trừ khi .e102-got). */
const CHOP = `<g transform="rotate(180) translate(0 -2)"><path d="M-1.4 -2 L-2.6 20 M1.8 -2 L2.2 20" stroke="${L}" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M-1.4 -2 L-2.6 20 M1.8 -2 L2.2 20" stroke="#D97706" stroke-width="1.8" stroke-linecap="round"/>
  <path class="e102-cnd" d="M-2.6 19 q3 4 -1 9 M2.2 19 q-3 4 1 9" stroke="#FEF3C7" stroke-width="2" fill="none" stroke-linecap="round"/></g>`;
const SPOON = `<g transform="rotate(180)"><path d="M0 -2 L0 15" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/><ellipse cx="0" cy="18" rx="4.2" ry="5" fill="#CBD5E1" stroke="#64748B" stroke-width="0.7"/></g>`;
/** Nắm xôi dính trên tay Bíp. */
const GLOB = `<g class="e102-glob"><path d="M-7 -2 Q-8 -9 0 -9 Q8 -9 7 -1 Q6 6 0 6 Q-6 6 -7 -2Z" fill="#FEF9C3" stroke="${L}" stroke-width="0.9"/>
  <circle cx="-3" cy="-3" r="1.2" fill="#E7E0C0"/><circle cx="3" cy="1" r="1.2" fill="#E7E0C0"/></g>`;
const NOODLE = `<path d="M-6 -8 q4 4 0 8 q-4 4 0 8 M2 -8 q4 4 0 8 q-4 4 0 8" stroke="#FDE68A" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
const PROPS = {
  e102_spoon: `<g transform="translate(0 -4)"><path d="M0 0 V22" stroke="#B45309" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="0" cy="24" rx="5" ry="3.4" fill="#92400E" stroke="${L}" stroke-width="0.7"/></g>`,
};
const POSES = {
  e102_hold: { R: [118, 248], L: [40, 110], dy: 20, head: -4 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
function bg() {
  const tiles = Array.from({ length: 10 }, (_, i) => `<path d="M${130 + i * 26} 150 V200" stroke="#CDE3EE" stroke-width="1"/>`).join('');
  return `
  ${room(0, X.door, FLOOR, '#E0F2FE', '#CBD5E1')}
  ${room(X.door, W - X.door, FLOOR, '#FEF3C7')}
  <!-- bếp: tủ lạnh, kệ, bếp, cửa sổ -->
  <g transform="translate(${X.fridge} 0)"><rect x="-44" y="90" width="88" height="${FLOOR - 90}" rx="8" fill="#F8FAFC" stroke="${L}" stroke-width="1.3"/>
    <path d="M-44 150 H44" stroke="${L}" stroke-width="1.2"/><rect x="30" y="110" width="5" height="26" rx="2" fill="#94A3B8"/><rect x="30" y="164" width="5" height="40" rx="2" fill="#94A3B8"/>
    <circle cx="-20" cy="120" r="6" fill="#F472B6" stroke="${L}" stroke-width="0.7"/><rect x="-6" y="114" width="14" height="10" rx="2" fill="#FDE047" stroke="${L}" stroke-width="0.7"/></g>
  <rect x="120" y="150" width="270" height="50" fill="#F0F9FF" stroke="${L}" stroke-width="0.8"/>${tiles}
  ${windowBox(150, 62, 100, 70)}
  ${shelf(420, 120, 120, `<g transform="translate(440 120)"><path d="M-10 -12 H10 Q9 -2 0 -1 Q-9 -2 -10 -12Z" fill="#fff" stroke="#3B82F6" stroke-width="1"/></g>
    <g transform="translate(466 120)"><path d="M-10 -12 H10 Q9 -2 0 -1 Q-9 -2 -10 -12Z" fill="#fff" stroke="#3B82F6" stroke-width="1"/></g>
    <g transform="translate(500 120)"><rect x="-8" y="-24" width="16" height="24" rx="3" fill="#FCA5A5" stroke="${L}" stroke-width="0.8"/></g>`)}
  <rect x="120" y="200" width="300" height="${FLOOR - 200}" fill="#94A3B8" stroke="${L}" stroke-width="1.2"/>
  <rect x="120" y="196" width="300" height="10" rx="2" fill="#E2E8F0" stroke="${L}" stroke-width="1"/>
  ${[160, 240, 340].map((x) => `<rect x="${x - 26}" y="216" width="52" height="${FLOOR - 226}" rx="3" fill="#CBD5E1" stroke="${L}" stroke-width="0.8"/><circle cx="${x + 16}" cy="236" r="2.4" fill="#475569"/>`).join('')}
  <!-- nồi phở trên bếp -->
  <g transform="translate(${X.stove} 196)"><path d="M-30 0 L-28 -36 H28 L30 0Z" fill="#64748B" stroke="${L}" stroke-width="1.2"/><rect x="-34" y="-40" width="68" height="7" rx="3" fill="#94A3B8" stroke="${L}"/>
    <path d="M-34 -24 h-8 M34 -24 h8" stroke="${L}" stroke-width="3" stroke-linecap="round"/>
    <path d="M-24 2 Q-18 -6 -12 2 M-4 2 Q2 -6 8 2 M14 2 Q20 -6 26 2" stroke="#F97316" stroke-width="2" fill="none" class="e102-fire"/></g>
  ${steam(X.stove, 150)}
  ${doorway(X.door, FLOOR)}
  <!-- phòng ăn -->
  ${windowBox(700, 70, 90, 76)}
  <g transform="translate(1010 104)"><rect x="-42" y="-30" width="84" height="60" rx="3" fill="#fff" stroke="#A16207" stroke-width="5"/>
    <rect x="-36" y="-24" width="72" height="48" fill="#BAE6FD"/><path d="M-36 14 Q-10 -6 10 8 T36 2 V24 H-36Z" fill="#4ADE80"/><circle cx="22" cy="-10" r="7" fill="#FDE047"/></g>
  <!-- ghế: lưng ghế sau người ngồi -->
  ${[X.bip, X.minh, X.lan].map((x) => `<rect x="${x - 22}" y="${FLOOR - 104}" width="44" height="60" rx="6" fill="#C2410C" stroke="${L}" stroke-width="1.1"/>`).join('')}
  <!-- phòng khách -->
  ${rug(X.liv + 40, FLOOR, 190, '#C4B5FD')}
  ${doorway(X.door2, FLOOR)}`;
}

function fg() {
  const bub = (inner, cls) => thought(X.bip + 6, 104, 132, 86, inner, [X.bip + 8, BIPY - 92], cls);
  const food = `<g class="e102-in e102-in-food"><g transform="translate(-26 18)">${PHO(0.7)}</g><g transform="translate(22 16)">${XOI}</g>
    <text x="0" y="-16" text-anchor="middle" ${NUN} font-size="22" fill="#EA580C">?</text></g>`;
  const fruit = `<g class="e102-in e102-in-fruit"><g transform="translate(-20 4)"><circle r="18" fill="#9333EA" stroke="${L}" stroke-width="1.2"/><circle cx="-6" cy="-6" r="5" fill="#C084FC"/>
      <path d="M0 -18 q4 -8 12 -8" stroke="#16A34A" stroke-width="3" fill="none"/><ellipse cx="12" cy="-26" rx="7" ry="3.4" fill="#22C55E"/></g>
    <g transform="translate(28 -8)"><circle r="8" fill="#FB923C"/><circle cx="12" cy="10" r="6" fill="#FACC15"/></g>
    <text x="0" y="36" text-anchor="middle" ${NUN} font-size="13" fill="#7E22CE">Lumo</text></g>
    <g class="e102-in e102-in-nono"><g transform="translate(0 22)">${PHO(1)}</g><path class="e102-x" d="M-22 -24 L22 14 M22 -24 L-22 14" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/></g>`;
  const sticks = `<g class="e102-in e102-in-demo"><g transform="translate(0 6)"><g class="e102-stA"><path d="M-30 -8 L34 -14" stroke="#D97706" stroke-width="4" stroke-linecap="round"/></g>
    <g class="e102-stB"><path d="M-30 4 L34 2" stroke="#B45309" stroke-width="4" stroke-linecap="round"/></g>
    <path class="e102-hn" d="M30 -10 q5 6 0 12 q-5 6 0 12" stroke="#FDE68A" stroke-width="2.6" fill="none" stroke-linecap="round"/></g></g>`;
  return `
  <!-- bàn ăn (che chân người ngồi) -->
  ${table(X.table, TT, 280, FLOOR, '#B45309')}
  <!-- đồ trên bàn -->
  <g class="e102-o e102-o-pho"><g transform="translate(${X.bip + 22} ${TT})">${PHO(0.8)}</g>${steam(X.bip + 22, TT - 26, 'e102-steam')}</g>
  <g class="e102-o e102-o-xoi"><g transform="translate(${X.lan - 34} ${TT})">${XOI}</g></g>
  <g class="e102-o e102-o-bowl"><g transform="translate(${X.minh + 4} ${TT})">${PHO(0.62)}</g></g>
  <!-- sofa phòng khách (trước) -->
  <g transform="translate(${X.sofa} ${FLOOR})"><rect x="-66" y="-34" width="132" height="30" rx="8" fill="#60A5FA" stroke="${L}" stroke-width="1.2"/>
    <rect x="-74" y="-46" width="16" height="44" rx="6" fill="#3B82F6" stroke="${L}"/><rect x="58" y="-46" width="16" height="44" rx="6" fill="#3B82F6" stroke="${L}"/></g>
  <!-- bong bóng nghĩ của Bíp -->
  ${thought(X.liv - 10, 108, 132, 86, food, [X.liv - 4, FLOOR - 104], 'e102-b1')}
  ${bub(fruit, 'e102-b2')}
  ${thought(X.minh + 10, 110, 120, 70, sticks, [X.minh + 4, FLOOR - 120], 'e102-b3')}
  <!-- nhãn -->
  <g class="e102-lb e102-lb-hungry">${label(X.liv + 70, 214, 'hungry', '#EA580C', 15)}</g>
  <g class="e102-lb e102-lb-kitchen">${label(KLOOK - 110, 74, 'kitchen', '#0369A1', 16)}</g>
  <g class="e102-lb e102-lb-mum">${speaker(X.mum - 4, 112, 'Mum')}</g>
  <g class="e102-lb e102-lb-bipk">${speaker(X.bipK, 168, 'Bip', '#16A34A')}</g>
  <g class="e102-lb e102-lb-pho">${label(X.bip + 74, TT - 44, 'pho', '#EA580C', 16)}</g>
  <g class="e102-lb e102-lb-nd">${label(X.bip - 40, TT - 4, 'noodles', '#CA8A04', 13)}</g>
  <g class="e102-lb e102-lb-beef">${label(X.bip + 70, TT - 4, 'beef', '#B45309', 13)}</g>
  <g class="e102-lb e102-lb-bipt">${speaker(X.bip, 132, 'Bip', '#16A34A')}</g>
  <g class="e102-lb e102-lb-xoi">${label(X.lan - 34, TT - 112, 'xoi', '#CA8A04', 15)}</g>
  <g class="e102-lb e102-lb-sticky">${label(X.lan - 34, TT - 112, 'sticky rice', '#0369A1', 14)}</g>
  <g class="e102-lb e102-lb-cant">${label(X.bip - 30, 124, "can't", '#DC2626', 15)}</g>
  <g class="e102-lb e102-lb-can">${label(X.minh + 30, 124, 'can', '#16A34A', 15)}</g>
  <g class="e102-lb e102-lb-can2">${label(X.bip - 30, 124, 'can', '#16A34A', 15)}</g>
  <g class="e102-lb e102-lb-vn">${label(TLOOK, 62, 'Vietnamese food', '#DC2626', 15)}</g>`;
}

const CSS = `
.e102-fire { animation: e102Fire .4s ease-in-out infinite alternate; }
@keyframes e102Fire { from { translate: 0 0; } to { translate: 0 -2px; } }
.e102-lb { opacity: 0; transition: opacity .35s; }
${['hungry', 'kitchen', 'mum', 'bipk', 'pho', 'nd', 'beef', 'bipt', 'xoi', 'sticky', 'cant', 'can', 'can2', 'vn'].map((k) => `.st-lb-${k} .e102-lb-${k}`).join(', ')} { opacity: 1; }
.e102-o { opacity: 0; transition: opacity .3s; }
.st-pho .e102-o-pho, .st-xoi .e102-o-xoi, .st-bowl .e102-o-bowl { opacity: 1; }
.e102-b1, .e102-b2, .e102-b3 { opacity: 0; transform: scale(.4); transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.e102-b1 { transform-origin: ${X.liv - 4}px ${FLOOR - 104}px; } .e102-b2 { transform-origin: ${X.bip + 8}px ${BIPY - 92}px; } .e102-b3 { transform-origin: ${X.minh + 4}px ${FLOOR - 120}px; }
.st-b1 .e102-b1, .st-b2 .e102-b2, .st-b3 .e102-b3 { opacity: 1; transform: none; }
.e102-in { opacity: 0; transition: opacity .3s; }
.st-b1 .e102-in-food, .st-fruit .e102-in-fruit, .st-nono .e102-in-nono, .st-b3 .e102-in-demo { opacity: 1; }
.e102-x { stroke-dasharray: 60; stroke-dashoffset: 60; }
.st-nono .e102-x { stroke-dashoffset: 0; transition: stroke-dashoffset .5s ease-out .3s; }
.e102-stA { transform-origin: -30px -8px; animation: e102Pinch .45s ease-in-out infinite alternate; }
@keyframes e102Pinch { from { rotate: 0deg; } to { rotate: 6deg; } }
.e102-nd { animation: e102Nd 1s ease-in-out infinite alternate; }
@keyframes e102Nd { to { translate: 2px 0; } }
.e102-cnd { opacity: 0; }
.e102-got .e102-cnd { opacity: 1; }
.e102-glob { transform-box: fill-box; transform-origin: center; }
.e102-shake .bip-armR { animation: e102Shake .16s ease-in-out infinite alternate !important; }
@keyframes e102Shake { from { rotate: -40deg; } to { rotate: -80deg; } }
@media (prefers-reduced-motion: reduce) {
  .e102-stA { animation-duration: 1s; } .e102-shake .bip-armR { animation-duration: .4s !important; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const pop = (st, k, vol = 0.5, rate = 1) => { st.set(k); st.sfx('pop', { vol, rate }); };
const cls = (st, id, name, on = true) => bipSet(st, id, name, on);
/** Bíp ngồi vào ghế ở bàn (đổi về dáng trước, ngồi). */
const seatBip = (st) => { cls(st, 'bip', 'bip-sit'); st.face('bip', 1); };

const BEATS = [
  { key: ['Bip is hungry'], icon: '😋', label: 'hungry', async play(st) {
    st.look(X.liv - 60, { instant: true });
    st.mood('bip', 'sad'); cls(st, 'bip', 'bip-hold');
    st.sfx('gulp', { vol: 0.5, rate: 0.7 });
    await st.wait(300);
    st.set('st-b1'); st.sfx('pop', { vol: 0.5 });
    await st.wait(500);
    pop(st, 'st-lb-hungry', 0.4, 1.2);
    st.act('bip', 'look');
    await st.wait(1000);
    st.act('bip', null);
  } },
  { key: ['Mum is in the kitchen'], icon: '🍲', label: 'kitchen', async play(st) {
    off(st, 'st-b1', 'st-lb-hungry');
    cls(st, 'bip', 'bip-hold', false);
    st.hold('mum', 'e102_spoon'); st.pose('mum', 'stir'); st.act('mum', 'stir');
    st.look(KLOOK, { dur: 2600 });
    const fly = st.walk('bip', X.bipK, { speed: 260, follow: false });
    await st.wait(1400);
    st.set('st-lb-kitchen');
    await st.loop('pot-stir', () => st.wait(1300), { vol: 0.7 });
    await fly;
    st.mood('bip', 'wow');
  } },
  { key: ['Can you eat our food, Bip?'], icon: '🥢', label: 'our food', async play(st) {
    st.set('st-lb-kitchen', false);
    st.look(KLOOK);
    st.act('mum', null); st.pose('mum', 'open'); st.face('mum', 1); st.mood('mum', 'joy');
    st.sfx('pop', { vol: 0.3 });
    await st.say('mum', 'Can you eat our food, Bip?', 2300);
  } },
  { key: ['asks Mum'], icon: '❓', label: 'asks Mum', async play(st) {
    st.look(KLOOK);
    st.set('st-lb-mum'); st.sfx('ding', { vol: 0.3, rate: 1.3 });
    st.pose('mum', 'shrug');
    await st.wait(500);
    st.act('mum', 'nod');
    await st.wait(900);
    st.act('mum', null); st.pose('mum', 'stand');
  } },
  { key: ['Yes, I can!'], icon: '🙋', label: 'Yes, I can!', async play(st) {
    st.set('st-lb-mum', false);
    st.look(KLOOK);
    st.mood('bip', 'happy'); st.act('bip', 'jump'); st.sfx('giggle', { vol: 0.5, rate: 1.3 });
    await st.say('bip', 'Yes, I can!', 1500);
    st.act('bip', null);
  } },
  { key: ['says Bip'], icon: '👽', label: 'says Bip', async play(st) {
    st.look(KLOOK);
    st.set('st-lb-bipk'); st.sfx('robot-beep', { vol: 0.4, rate: 1.2 });
    cls(st, 'bip', 'bip-wave'); st.mood('bip', 'happy');
    await st.wait(1300);
    cls(st, 'bip', 'bip-wave', false);
  } },
  { key: ['a big bowl of pho'], icon: '🍜', label: 'pho', async play(st) {
    st.set('st-lb-bipk', false);
    st.hold('mum', null);
    st.chest('mum', `<g transform="translate(0 8)">${PHO(0.62)}</g>`); st.pose('mum', 'carry');
    st.look(KLOOK);
    const bip = st.walk('bip', X.bip, { y: BIPY, speed: 170, follow: false });
    await st.wait(300);
    const mum = st.walk('mum', X.mumT, { speed: 150, follow: false });
    await st.look(TLOOK, { dur: 3600 });
    await Promise.all([mum, bip]);
    seatBip(st);
    st.face('mum', -1); st.chest('mum', null); st.pose('mum', 'give'); st.sfx('whoosh', { vol: 0.3 });
    await st.fly(PHO(0.62), [X.mumT - 30, TT - 40], [X.bip + 22, TT - 10], { size: 46, dur: 500 });
    st.set('st-pho'); st.sfx('bowl-down', { vol: 0.7 });
    pop(st, 'st-lb-pho', 0.4);
    st.mood('bip', 'wow');
    await st.wait(600);
    st.pose('mum', 'stand');
  } },
  { key: ['likes the noodles and the beef'], icon: '🍜', label: 'noodles · beef', async play(st) {
    st.set('st-lb-pho', false);
    st.look(TLOOK);
    st.set('st-pho');
    bipHold(st, 'bip', SPOON); st.act('bip', 'eat'); st.mood('bip', 'happy');
    await st.wait(200);
    pop(st, 'st-lb-nd', 0.4); st.sfx('slurp', { vol: 0.6 });
    await st.wait(1100);
    pop(st, 'st-lb-beef', 0.4, 1.2); st.sfx('crunch', { vol: 0.5 });
    await st.wait(900);
    st.act('bip', null);
  } },
  { key: ['His antennae glow'], icon: '💡', label: 'glow!', async play(st) {
    off(st, 'st-lb-nd', 'st-lb-beef');
    st.look(TLOOK);
    cls(st, 'bip', 'bip-glow'); st.mood('bip', 'joy');
    const [, by] = BIP_AT.bulbs[0];
    st.fx('sparkle', X.bip, BIPY + by);
    st.mood('mum', 'wow');
    await st.wait(1500);
    st.mood('mum', 'joy');
  } },
  { key: ['I like pho!'], icon: '😍', label: 'I like pho', async play(st) {
    st.look(TLOOK);
    st.sfx('giggle', { vol: 0.4, rate: 1.3 });
    const say = st.say('bip', 'I like pho!', 1600);
    await st.wait(300);
    st.fx('hearts', X.bip + 22, TT - 40);
    await say;
  } },
  { key: ['he says'], icon: '💬', label: 'he says', async play(st) {
    st.look(TLOOK);
    st.set('st-lb-bipt'); st.sfx('ding', { vol: 0.3, rate: 1.3 });
    st.act('bip', 'dance');
    st.pose('mum', 'clap'); st.act('mum', 'clap'); st.sfx('clap', { vol: 0.4 });
    await st.wait(1300);
    st.act('bip', null); st.act('mum', null); st.pose('mum', 'stand');
  } },
  { key: ['Lan has got some xoi'], icon: '🍙', label: 'xoi', async play(st) {
    st.set('st-lb-bipt', false);
    bipHold(st, 'bip', null);
    st.chest('lan', `<g transform="translate(0 10)">${XOI}</g>`); st.pose('lan', 'carry');
    st.look(TLOOK + 60);
    st.sfx('door-open', { vol: 0.4 });
    const minh = st.walk('minh', X.minh, { speed: 140, follow: false });
    await st.wait(300);
    await st.walk('lan', X.lan, { speed: 140, follow: false });
    st.face('lan', -1); st.chest('lan', null); st.pose('lan', 'give');
    await st.fly(XOI, [X.lan - 20, TT - 30], [X.lan - 34, TT - 10], { size: 46, dur: 400 });
    st.set('st-xoi'); st.sfx('bowl-down', { vol: 0.6 });
    pop(st, 'st-lb-xoi', 0.4);
    await minh;
    st.face('minh', 1); st.pose('minh', 'sit'); st.pose('lan', 'sit'); st.face('lan', 1);
    st.look(TLOOK);
    await st.wait(400);
  } },
  { key: ['It is sticky rice'], icon: '🍚', label: 'sticky rice', async play(st) {
    st.set('st-lb-xoi', false);
    st.look(TLOOK);
    st.pose('lan', 'point'); st.face('lan', -1);
    pop(st, 'st-lb-sticky', 0.4);
    await st.wait(600);
    bipHold(st, 'bip', GLOB); st.pose('lan', 'sit');
    st.sfx('gulp', { vol: 0.3, rate: 1.4 });
    st.mood('bip', 'wow');
    await st.wait(1000);
  } },
  { key: ["I don't like it"], icon: '🙅', label: "don't like", async play(st) {
    st.set('st-lb-sticky', false);
    st.look(TLOOK);
    cls(st, 'bip', 'bip-glow', false);
    st.act('bip', 'eat'); st.sfx('crunch', { vol: 0.4, rate: 0.8 });
    await st.wait(700);
    st.act('bip', null); st.mood('bip', 'sad'); st.sfx('buzz-no', { vol: 0.4 });
    await st.say('bip', "I don't like it.", 1500);
  } },
  { key: ['It is very sticky!'], icon: '🤚', label: 'very sticky', async play(st) {
    st.look(TLOOK);
    cls(st, 'bip', 'e102-shake'); st.mood('bip', 'cry');
    for (let i = 0; i < 4; i++) { st.sfx('whoosh', { vol: 0.25, rate: 1.5 + i * 0.1 }); await st.wait(340); }
    cls(st, 'bip', 'e102-shake', false);
    await st.say('bip', 'It is very sticky!', 1200);
  } },
  { key: ['says Bip'], icon: '😖', label: 'says Bip', async play(st) {
    st.look(TLOOK);
    st.set('st-lb-bipt'); st.sfx('ding', { vol: 0.25, rate: 0.9 });
    st.mood('bip', 'sad');
    await st.wait(500);
    bipHold(st, 'bip', null); st.sfx('drip', { vol: 0.5 });
    await st.fly(`<g transform="scale(0.8)">${GLOB}</g>`, [X.bip + 14, TT - 40], [X.lan - 34, TT - 14], { size: 24, dur: 500 });
    st.sfx('bowl-down', { vol: 0.3, rate: 1.5 });
    await st.wait(500);
  } },
  { key: ['Lan laughs'], icon: '😆', label: 'Lan laughs', async play(st) {
    st.set('st-lb-bipt', false);
    st.look(TLOOK);
    st.mood('lan', 'joy'); st.pose('lan', 'sitClap'); st.act('lan', 'clap');
    st.sfx('giggle', { vol: 0.7 });
    st.mood('minh', 'joy');
    await st.wait(1500);
    st.act('lan', null); st.pose('lan', 'sit'); st.mood('bip', 'happy');
  } },
  { key: ["Bip can't use chopsticks", 'but Minh can'], icon: '🥢', label: "can't · can", async play(st) {
    st.look(TLOOK);
    bipHold(st, 'bip', CHOP); cls(st, 'bip', 'e102-got');
    st.act('bip', 'eat');
    await st.wait(500);
    cls(st, 'bip', 'e102-got', false); st.act('bip', null);
    st.sfx('drip', { vol: 0.5 });
    await st.fly(NOODLE, [X.bip + 16, TT - 46], [X.bip + 22, TT - 20], { size: 24, dur: 380 });
    st.mood('bip', 'sad'); pop(st, 'st-lb-cant', 0.4, 0.8);
    await st.wait(500);
    st.set('st-bowl'); st.hold('minh', 'chopsticks'); st.pose('minh', 'eat'); st.act('minh', 'eat'); st.mood('minh', 'joy');
    st.sfx('slurp', { vol: 0.6 });
    await st.wait(300);
    pop(st, 'st-lb-can', 0.4, 1.2);
    await st.wait(1100);
    st.act('minh', null);
  } },
  { key: ['Look, Bip'], icon: '👀', label: 'Look, Bip', async play(st) {
    off(st, 'st-lb-cant', 'st-lb-can');
    st.look(TLOOK);
    st.face('minh', -1); st.pose('minh', 'e102_hold'); st.sfx('click', { vol: 0.5 });
    st.mood('bip', 'wow');
    await st.say('minh', 'Look, Bip.', 1400);
  } },
  { key: ['Like this!'], icon: '✌️', label: 'Like this!', async play(st) {
    st.look(TLOOK);
    st.set('st-b3'); st.sfx('pop', { vol: 0.4 });
    st.act('minh', 'eat');
    for (let i = 0; i < 3; i++) { await st.wait(450); st.sfx('click', { vol: 0.5, rate: 1 + i * 0.1 }); }
    await st.say('minh', 'Like this!', 900);
    st.act('minh', null);
  } },
  { key: ['Now Bip can eat with chopsticks, too'], icon: '🎉', label: 'Bip can', async play(st) {
    st.set('st-b3', false);
    st.look(TLOOK);
    st.pose('minh', 'sit'); st.face('minh', 1);
    cls(st, 'bip', 'e102-got'); st.act('bip', 'eat'); st.mood('bip', 'joy');
    await st.wait(300);
    st.sfx('slurp', { vol: 0.6 });
    pop(st, 'st-lb-can2', 0.4, 1.2);
    st.pose('minh', 'sitClap'); st.act('minh', 'clap'); st.sfx('clap', { vol: 0.4 });
    await st.wait(1300);
    st.act('bip', null); st.act('minh', null); st.pose('minh', 'sit');
  } },
  { key: ['On Lumo, we eat purple fruit', 'says Bip'], icon: '🍇', label: 'purple fruit', async play(st) {
    st.set('st-lb-can2', false);
    st.look(TLOOK);
    cls(st, 'bip', 'e102-got', false); bipHold(st, 'bip', null);
    st.set('st-b2'); st.set('st-fruit'); st.sfx('pop', { vol: 0.5 });
    st.mood('bip', 'happy');
    const say = st.say('bip', 'On Lumo, we eat purple fruit.', 2400);
    await st.wait(900);
    st.sfx('crunch', { vol: 0.5 });
    st.mood('lan', 'wow'); st.mood('minh', 'wow');
    await say;
  } },
  { key: ["We don't eat noodles"], icon: '🚫', label: 'no noodles', async play(st) {
    st.look(TLOOK);
    st.set('st-fruit', false); st.set('st-nono'); st.sfx('whoosh', { vol: 0.3 });
    await st.wait(700);
    st.sfx('buzz-no', { vol: 0.4 });
    st.act('bip', 'look');
    await st.wait(900);
    st.act('bip', null);
  } },
  { key: ['But I like Vietnamese food!'], icon: '🇻🇳', label: 'Vietnamese food', async play(st) {
    off(st, 'st-b2', 'st-nono');
    st.look(TLOOK);
    st.mood('bip', 'joy'); cls(st, 'bip', 'bip-glow'); st.act('bip', 'jump');
    pop(st, 'st-lb-vn', 0.5);
    st.fx('hearts', X.minh, TT - 70);
    for (const id of ['minh', 'lan']) { st.mood(id, 'joy'); st.pose(id, 'sitClap'); st.act(id, 'clap'); }
    st.pose('mum', 'cheer'); st.mood('mum', 'joy');
    await st.wait(300);
    st.sfx('cheer', { vol: 0.4 });
    await st.wait(1400);
    for (const id of ['minh', 'lan', 'bip']) st.act(id, null);
    st.pose('mum', 'stand');
  } },
];

export default {
  id: 'en102', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + BIP_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 6, 11, 14, 17, 20],
  cast: [
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: X.mum, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.door2 + 120, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.door2 + 170, face: -1, s: 1.04 },
    { id: 'bip', kind: 'thing', svg: BIP_SVG, box: BIP_BOX, x: X.liv, face: -1 },
  ],
};
