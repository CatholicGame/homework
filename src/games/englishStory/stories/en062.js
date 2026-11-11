/**
 * Bài 62 "Not Finished Yet" (already / just / yet): sáng ngày khai giảng, đi từ trái sang phải: phòng ngủ của Minh
 * (bàn học, cặp mở, hộp bút mới) → phòng tắm (Lan rửa mặt, gương, bồn rửa) → bếp (bàn ăn, bánh mì) → cửa chính → sân
 * (Lucky sủa ở cổng) → ngoài cổng (bố đứng cạnh xe máy đã nổ máy). Cuối truyện Minh chạy ngược về phòng tắm đánh răng.
 * Toạ độ cảnh: rộng 1640, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, sky, cloud, tree, bush, flowerAt, label, room, doorway, windowBox, road, fence, thought, books, shelf, BAG } from '../kit.js';

const FLOOR = 282;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { desk: 210, d1: 420, sink: 560, d2: 650, table: 820, door: 1080, gate: 1320, bike: 1500 };
const DESK_TOP = FLOOR - 60;

// ── Đồ vật ─────────────────────────────────────────────────────────────────
/** Cặp mở miệng / đã kéo khoá (gốc ở đáy cặp). */
const BAG_OPEN = `<g transform="translate(0 -15) scale(1.25)">${BAG('#F59E0B')}</g><path d="M-13 -33 Q0 -40 13 -33" stroke="${L}" stroke-width="1.2" fill="#FDE68A"/>
  <g class="e062-zip"><path d="M-12 -33 H12" stroke="#78350F" stroke-width="2.4" stroke-dasharray="2 1.4"/><rect x="8" y="-36" width="4" height="6" rx="1" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/></g>`;
/** Hộp bút mới (gốc ở giữa). */
const PENCASE = `<rect x="-14" y="-5" width="28" height="10" rx="5" fill="#22D3EE" stroke="${L}" stroke-width="1"/><path d="M-12 0 H12" stroke="#0E7490" stroke-width="1" stroke-dasharray="2 1.4"/>
  <path d="M-6 -2 l1 2 l2 .3 l-1.5 1.4 l.4 2 l-1.9 -1 l-1.9 1 l.4 -2 l-1.5 -1.4 l2 -.3Z" fill="#FACC15"/>`;
const BOOK_S = `<rect x="-10" y="-13" width="20" height="26" rx="2" fill="#3B82F6" stroke="${L}" stroke-width="1"/><rect x="-7" y="-9" width="14" height="6" fill="#fff"/>`;
/** Khăn mặt (đồ cầm tay phải). */
const TOWEL = `<g transform="translate(0 -2)"><rect x="-8" y="-6" width="16" height="22" rx="3" fill="#F9A8D4" stroke="${L}" stroke-width="0.8"/><path d="M-8 10 H8 M-8 13 H8" stroke="#fff" stroke-width="1.2"/></g>`;
/** Bánh mì (đồ cầm tay phải, đưa lên miệng). */
const BREAD = `<g transform="rotate(150) translate(0 6)"><path d="M-5 -12 Q-7 0 -4 14 Q0 18 4 14 Q7 0 5 -12 Q0 -16 -5 -12Z" fill="#F59E0B" stroke="${L}" stroke-width="0.9"/><path d="M-2 -6 l3 -2 M-2 0 l3 -2 M-2 6 l3 -2" stroke="#FDE68A" stroke-width="1.2"/></g>`;
const BRUSH_UP = `<g transform="rotate(180)"><rect x="-1.6" y="-3" width="3.2" height="20" rx="1.4" fill="#22D3EE" stroke="${L}" stroke-width="0.7"/><rect x="-2.6" y="15" width="5.2" height="6" rx="1" fill="#fff" stroke="${L}" stroke-width="0.6"/></g>`;
/** Xe máy tay ga (nhìn nghiêng, đầu xe sang phải, gốc ở mặt đất). */
const MOTO = `<g class="e062-moto"><circle cx="-34" cy="-14" r="14" fill="#1F2937" stroke="${L}"/><circle cx="-34" cy="-14" r="5" fill="#CBD5E1"/>
  <circle cx="38" cy="-14" r="14" fill="#1F2937" stroke="${L}"/><circle cx="38" cy="-14" r="5" fill="#CBD5E1"/>
  <path d="M-52 -26 Q-54 -50 -30 -52 H6 L18 -30 H26 L40 -78 H48 L54 -30 Q46 -20 30 -22 H-10 Q-18 -36 -34 -36 Q-46 -34 -52 -26Z" fill="#DC2626" stroke="${L}" stroke-width="1.2"/>
  <path d="M-40 -54 Q-16 -62 4 -54 L2 -50 H-40Z" fill="#1F2937" stroke="${L}"/><path d="M40 -78 L32 -86 M40 -80 H52" stroke="${L}" stroke-width="3" stroke-linecap="round"/>
  <circle cx="54" cy="-62" r="4" fill="#FEF08A" stroke="${L}" stroke-width="0.8"/><path d="M-50 -20 H-66" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/></g>`;

const POSES = {
  e062_pack: { R: [60, 110], L: [50, 100], head: 10 },
  e062_pat: { R: [50, 80], L: [10, 4], head: 6 },
  e062_ask: { R: [55, 40], L: [70, -40], head: -4 },
  e062_towel: { R: [150, 262], L: [10, 4], head: 4 },
  e062_ohno: { R: [165, 235], L: [165, 235], head: 4 },
  e062_face: { R: [150, 255], L: [16, -60], head: 10 },
  e062_start: { R: [80, 96], L: [10, 4], head: 6 },
  e062_watch: { R: [24, -86], L: [10, 4], head: 12 },
  e062_tooth: { R: [140, 160], L: [70, -40] },
  e062_laugh: { R: [70, -40], L: [70, -40], head: -8 },
};
const PROPS = { e062_towel: TOWEL, e062_bread: BREAD, e062_brush: BRUSH_UP };

function bg() {
  return `
  ${sky(X.door, 1640 - X.door, 315, 'e062sky')}
  ${cloud(1200, 60, 0.8, 0)}${cloud(1520, 44, 0.9, 3)}
  <!-- phòng ngủ của Minh -->
  ${room(0, X.d1, FLOOR, '#E0F2FE')}
  ${windowBox(40, 60, 96, 80)}
  <g transform="translate(30 0)"><rect x="0" y="${FLOOR - 52}" width="110" height="22" rx="4" fill="#60A5FA" stroke="${L}"/><rect x="0" y="${FLOOR - 64}" width="14" height="64" rx="3" fill="#B45309" stroke="${L}"/>
    <rect x="16" y="${FLOOR - 62}" width="30" height="12" rx="5" fill="#fff" stroke="${L}"/><rect x="0" y="${FLOOR - 30}" width="110" height="8" fill="#92400E" stroke="${L}"/></g>
  ${shelf(260, 100, 110, books(270, 100, 6))}
  <g transform="translate(330 70)"><rect x="-22" y="-14" width="44" height="30" rx="2" fill="#fff" stroke="${L}"/><text y="6" text-anchor="middle" ${NUN} font-size="11" fill="#DC2626">Sept 5</text><rect x="-22" y="-14" width="44" height="8" fill="#EF4444" stroke="${L}" stroke-width="0.8"/></g>
  <rect x="${X.desk - 46}" y="${DESK_TOP}" width="92" height="8" rx="2" fill="#F59E0B" stroke="${L}"/><rect x="${X.desk - 40}" y="${DESK_TOP + 8}" width="7" height="${FLOOR - DESK_TOP - 8}" fill="#B45309" stroke="${L}"/><rect x="${X.desk + 33}" y="${DESK_TOP + 8}" width="7" height="${FLOOR - DESK_TOP - 8}" fill="#B45309" stroke="${L}"/>
  <!-- phòng tắm -->
  ${room(X.d1, X.d2 - X.d1, FLOOR, '#CCFBF1', '#99F6E4')}
  ${Array.from({ length: 4 }, (_, i) => `<path d="M${X.d1 + 10} ${150 + i * 32} H${X.d2 - 10}" stroke="#99F6E4" stroke-width="1.4"/>`).join('')}
  <g transform="translate(${X.sink} 0)"><rect x="-26" y="92" width="52" height="64" rx="10" fill="#E0F2FE" stroke="${L}" stroke-width="1.4"/><path d="M-14 104 l10 -6 M-8 118 l16 -10" stroke="#fff" stroke-width="2.4"/>
    <path d="M-34 186 H34 Q30 210 0 212 Q-30 210 -34 186Z" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-6" y="212" width="12" height="${FLOOR - 212}" fill="#E5E7EB" stroke="${L}"/>
    <path d="M10 186 V174 H-2 V178" stroke="#94A3B8" stroke-width="3" fill="none"/>
    <g class="e062-water"><path d="M-2 180 V196" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/></g>
    <rect x="22" y="160" width="10" height="20" rx="2" fill="#F472B6" stroke="${L}" stroke-width="0.8"/><path d="M-30 176 h8 v-12 h-8Z" fill="#fff" stroke="${L}" stroke-width="0.8"/>
    <path d="M-29 164 l2 -8 M-26 164 l1 -9" stroke="#22D3EE" stroke-width="1.6"/></g>
  <!-- bếp -->
  ${room(X.d2, X.door - X.d2, FLOOR, '#FEF3C7')}
  ${windowBox(700, 60, 90, 70)}
  <g transform="translate(990 0)"><rect x="-40" y="${FLOOR - 70}" width="80" height="70" fill="#F8FAFC" stroke="${L}"/><rect x="-40" y="${FLOOR - 76}" width="80" height="8" fill="#94A3B8" stroke="${L}"/>
    <circle cx="-16" cy="${FLOOR - 74}" r="0" /><path d="M-30 ${FLOOR - 82} h26 v-12 q0 -6 -6 -6 h-14 q-6 0 -6 6Z" fill="#F97316" stroke="${L}"/></g>
  <g transform="translate(${X.door - 140} 100)"><circle r="16" fill="#fff" stroke="${L}" stroke-width="2"/><path d="M0 0 V-10 M0 0 L8 4" stroke="${L}" stroke-width="2.2" stroke-linecap="round"/></g>
  ${doorway(X.d1, FLOOR)}${doorway(X.d2, FLOOR)}
  <!-- cửa chính, sân, cổng, phố -->
  <rect x="${X.door - 10}" y="40" width="20" height="${FLOOR - 40}" fill="#C08B5C" stroke="${L}"/>
  <path d="M${X.door + 10} 220 Q1200 200 1320 214 T1640 210 V${FLOOR} H${X.door + 10}Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(1180, 230, 0.75, '#F97316')}
  <g transform="translate(1560 0)"><rect x="-70" y="140" width="140" height="${FLOOR - 140}" fill="#FDE68A" stroke="${L}"/><path d="M-80 140 H80 L70 122 H-70Z" fill="#2563EB" stroke="${L}"/>
    <rect x="-50" y="164" width="36" height="30" fill="#BAE6FD" stroke="${L}"/><rect x="14" y="164" width="36" height="30" fill="#BAE6FD" stroke="${L}"/></g>
  <rect x="${X.door + 10}" y="${FLOOR - 4}" width="${X.gate - X.door - 10}" height="40" fill="#4ADE80" stroke="${L}"/>
  ${road(X.gate, 1640 - X.gate, FLOOR)}
  <g class="e062-lb e062-lb-packed">${label(X.desk + 10, 126, 'packed', '#16A34A', 15)}</g>
  <g class="e062-lb e062-lb-new">${label(X.desk + 10, 126, 'new pencil case', '#0E7490', 13)}</g>
  <g class="e062-lb e062-lb-clean">${label(X.sink, 76, 'clean face', '#0E7490', 14)}</g>
  <g class="e062-lb e062-lb-quick">${label(X.table, 150, 'quickly!', '#EA580C', 15)}</g>
  <g class="e062-lb e062-lb-wait">${label(X.bike - 20, 118, 'waiting...', '#2563EB', 14)}</g>
  <g class="e062-lb e062-lb-late">${label(X.bike - 40, 118, 'not late yet', '#16A34A', 14)}</g>`;
}

function fg() {
  return `
  <!-- bàn ăn (che chân người ngồi) -->
  <g transform="translate(${X.table} 0)"><rect x="-70" y="226" width="140" height="9" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
    <rect x="-64" y="235" width="8" height="${FLOOR - 235}" fill="#92400E" stroke="${L}"/><rect x="56" y="235" width="8" height="${FLOOR - 235}" fill="#92400E" stroke="${L}"/>
    <rect x="-70" y="235" width="140" height="22" fill="#FDE68A" stroke="${L}" opacity="0.92"/>
    <g transform="translate(36 226)"><path d="M-10 0 Q-10 -6 0 -6 Q10 -6 10 0Z" fill="#fff" stroke="#3B82F6" stroke-width="1"/></g>
    <g class="e062-plate" transform="translate(-6 226)"><ellipse cx="0" cy="-2" rx="16" ry="3.4" fill="#fff" stroke="${L}" stroke-width="0.9"/><g class="e062-crumbs"><path d="M-8 -6 Q0 -12 8 -6 Q0 -3 -8 -6Z" fill="#F59E0B" stroke="${L}" stroke-width="0.7"/></g></g></g>
  <!-- cổng sắt (Lucky đứng trong sân) -->
  <g transform="translate(${X.gate} 0)"><rect x="-8" y="186" width="14" height="${FLOOR - 186}" fill="#E7E5E4" stroke="${L}"/>
    <path d="M6 206 H66 M6 230 H66 M6 254 H66" stroke="#475569" stroke-width="2.4"/>${[16, 28, 40, 52, 64].map((x) => `<path d="M${x} 198 V${FLOOR - 2}" stroke="#475569" stroke-width="2"/>`).join('')}</g>
  ${fence(X.door + 30, 160, FLOOR + 4)}
  ${bush(1110, FLOOR + 8, 0.7)}${Array.from({ length: 5 }, (_, i) => flowerAt(1220 + i * 12, FLOOR + 4, ['#F472B6', '#FACC15', '#F87171'][i % 3])).join('')}
  <!-- xe máy (che chân bố khi bố đứng sau xe) -->
  <g transform="translate(${X.bike} ${FLOOR})">${MOTO}</g>
  <g class="e062-smoke" transform="translate(${X.bike - 70} ${FLOOR - 22})">${[0, 1, 2].map((i) => `<circle class="e062-puff" style="animation-delay:${i * 0.4}s" r="7" fill="#E5E7EB" stroke="#CBD5E1"/>`).join('')}</g>
  <g class="e062-b e062-b-forgot">${thought(X.door - 30, 110, 116, 80, `<g transform="translate(-14 0) rotate(-30)"><rect x="-3" y="-22" width="6" height="34" rx="3" fill="#22D3EE" stroke="${L}"/><rect x="-5" y="-30" width="10" height="10" rx="2" fill="#fff" stroke="${L}"/></g><text x="24" y="12" ${NUN} font-size="32" fill="#DC2626" text-anchor="middle">?</text>`, [X.door - 2, 160])}</g>
  <g class="e062-b e062-b-moto">${thought(1290, 116, 110, 76, `<g transform="translate(4 22) scale(0.55)">${MOTO}</g><g transform="translate(-6 -12) scale(0.7)"><circle r="9" fill="#B7794A" stroke="${L}"/><path d="M-8 -4 Q-13 4 -9 8 M8 -4 Q13 4 9 8" stroke="#7A4B2A" stroke-width="4" stroke-linecap="round" fill="none"/><circle cx="-3" cy="-1" r="1.4" fill="${L}"/><circle cx="3" cy="-1" r="1.4" fill="${L}"/></g>`, [1300, 220])}</g>`;
}

const CSS = `
.e062-lb { opacity: 0; transition: opacity .35s; }
${['packed', 'new', 'clean', 'quick', 'wait', 'late'].map((k) => `.st-lb-${k} .e062-lb-${k}`).join(', ')} { opacity: 1; }
.e062-water { opacity: 0; transition: opacity .2s; }
.st-tap .e062-water { opacity: 1; animation: e062Flow .25s linear infinite alternate; }
@keyframes e062Flow { from { transform: translateY(0); } to { transform: translateY(2px); } }
.e062-zip { opacity: 0; transition: opacity .3s; }
.es-thing.is-zip .e062-zip { opacity: 1; }
.st-ate .e062-crumbs { opacity: 0; transition: opacity 1.2s 1s; }
.e062-smoke { opacity: 0; transition: opacity .3s; }
.st-engine .e062-smoke { opacity: 1; }
.e062-puff { animation: e062Puff 1.2s ease-out infinite; transform-box: fill-box; transform-origin: center; }
@keyframes e062Puff { from { transform: translate(0, 0) scale(.4); opacity: .9; } to { transform: translate(-26px, -12px) scale(1.4); opacity: 0; } }
.st-engine .e062-moto { animation: e062Shake .08s linear infinite alternate; }
@keyframes e062Shake { from { transform: translateY(0); } to { transform: translateY(-0.8px); } }
.e062-b { opacity: 0; transform: scale(.5); transform-box: fill-box; transform-origin: 50% 90%; transition: opacity .3s, transform .35s cubic-bezier(.3, 1.4, .6, 1); }
.st-b-forgot .e062-b-forgot, .st-b-moto .e062-b-moto { opacity: 1; transform: none; }
.es-ac.act-e062-fast .pp-fowR { animation: e062Eat .18s ease-in-out infinite alternate; }
@keyframes e062Eat { from { transform: rotate(-16deg); } to { transform: rotate(8deg); } }
.es-ac.act-e062-rub .pp-fowR { animation: e062Rub .16s ease-in-out infinite alternate; }
@keyframes e062Rub { from { transform: rotate(-10deg); } to { transform: rotate(10deg); } }
@media (prefers-reduced-motion: reduce) {
  .st-engine .e062-moto { animation: none; }
  .e062-puff { animation-duration: 2.4s; }
  .es-ac.act-e062-fast .pp-fowR { animation-duration: .45s; }
  .es-ac.act-e062-rub .pp-fowR { animation-duration: .45s; }
  .e062-b { transition: opacity .5s, transform .5s ease-out; }
}
`;

const BEATS = [
  { key: ['first day of school', 'getting ready'], icon: '🎒', label: 'getting ready', async play(st) {
    st.look(240);
    st.pose('minh', 'e062_pack'); st.mood('minh', 'joy');
    await st.wait(300);
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(BOOK_S, [X.desk - 40, DESK_TOP - 30], [X.desk + 16, DESK_TOP - 20], { size: 26, dur: 600 });
    st.sfx('bag-on', { vol: 0.5 });
    await st.wait(300);
    st.look(X.sink - 40, { dur: 900 });
    st.pose('lan', 'wash'); st.act('lan', 'wash'); st.set('st-tap'); st.sfx('tap-water', { vol: 0.6 });
    await st.wait(1500);
    st.act('lan', null); st.set('st-tap', false);
  } },
  { key: ['packed your bag yet'], icon: '❓', label: 'packed your bag?', async play(st) {
    st.pose('lan', 'stand');
    st.look(300);
    await st.walk('mum', 300, { speed: 110, follow: false });
    st.face('mum', -1); st.pose('mum', 'e062_ask'); st.mood('mum', 'happy');
    st.pose('minh', 'stand'); st.face('minh', 1); st.sfx('pop', { vol: 0.4 });
    await st.say('mum', 'Your bag?', 1500);
  } },
  { key: ['Mum asks'], icon: '👩', label: 'Mum asks', async play(st) {
    st.pose('mum', 'open'); st.show('q', true); st.sfx('ding', { vol: 0.5 });
    await st.wait(1300);
  } },
  { key: ['already packed it'], icon: '✅', label: 'already packed', async play(st) {
    st.show('q', false); st.pose('mum', 'stand');
    st.face('minh', 1);
    st.pose('minh', 'e062_pat'); st.mood('minh', 'joy');
    await st.wait(300);
    st.set('st-lb-packed'); st.sfx('pop', { vol: 0.5 });
    st.act('minh', 'nod');
    await st.wait(1300);
    st.act('minh', null);
  } },
  { key: ['new pencil case'], icon: '✏️', label: 'pencil case', async play(st) {
    st.set('st-lb-packed', false);
    st.pose('minh', 'e062_pack');
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(PENCASE, [X.desk - 30, DESK_TOP - 50], [X.desk + 16, DESK_TOP - 26], { size: 34, dur: 700 });
    st.set('st-lb-new'); st.fx('sparkle', X.desk + 16, DESK_TOP - 40, { quiet: true }); st.sfx('ding', { vol: 0.4 });
    await st.wait(500);
    st.a('bag').el.classList.add('is-zip'); st.sfx('click', { vol: 0.6 });
    await st.wait(500);
    st.show('bag', false); st.bag('minh', true); st.pose('minh', 'stand'); st.sfx('bag-on', { vol: 0.6 });
    await st.wait(700);
  } },
  { key: ['had breakfast yet'], icon: '🍞', label: 'breakfast?', async play(st) {
    st.set('st-lb-new', false);
    await st.walk('mum', X.d1 + 40, { speed: 110, lead: 60 });
    st.face('lan', -1); st.face('mum', 1); st.pose('mum', 'e062_ask');
    st.sfx('knock', { vol: 0.4 });
    await st.say('mum', 'Breakfast?', 1500);
  } },
  { key: ['Not yet, Mum'], icon: '🙅‍♀️', label: 'not yet', async play(st) {
    st.pose('mum', 'stand');
    st.mood('lan', 'happy'); st.act('lan', 'no'); st.pose('lan', 'stand');
    st.sfx('buzz-no', { vol: 0.4 });
    await st.say('lan', 'Not yet!', 1400);
    st.act('lan', null);
  } },
  { key: ['just washed my face'], icon: '🧼', label: 'washed my face', async play(st) {
    st.face('lan', 1);
    st.hold('lan', 'e062_towel'); st.pose('lan', 'e062_towel'); st.act('lan', 'e062-rub'); st.mood('lan', 'shut');
    st.fx('drops', X.sink - 30, 150);
    st.sfx('wipe', { vol: 0.6 });
    await st.wait(1200);
    st.act('lan', null); st.hold('lan', null); st.pose('lan', 'stand'); st.face('lan', -1); st.mood('lan', 'joy');
    st.set('st-lb-clean'); st.fx('sparkle', X.sink - 30, 150, { quiet: true }); st.sfx('ding', { vol: 0.4 });
    await st.wait(900);
  } },
  { key: ['sits down at the table', 'eats her bread quickly'], icon: '🥖', label: 'eats quickly', async play(st) {
    st.set('st-lb-clean', false);
    await st.walk('lan', X.table - 6, { speed: 140, lead: 0 });
    st.pose('lan', 'sit'); st.sfx('bump', { vol: 0.4 });
    await st.wait(300);
    st.hold('lan', 'e062_bread'); st.pose('lan', 'eat'); st.act('lan', 'e062-fast'); st.set('st-ate');
    st.set('st-lb-quick');
    st.sfx('crunch', { vol: 0.6 });
    await st.wait(600);
    st.sfx('crunch', { vol: 0.6, rate: 1.15 });
    await st.wait(600);
    st.sfx('gulp', { vol: 0.5 });
    await st.wait(400);
  } },
  { key: ['started the motorbike', 'waiting for them'], icon: '🛵', label: 'motorbike', async play(st) {
    st.set('st-lb-quick', false); st.act('lan', null); st.hold('lan', null); st.pose('lan', 'sit');
    // Minh và mẹ ra cửa (khuất khung), camera ra cổng xem bố
    st.pose('minh', 'stand'); st.pose('mum', 'stand');
    const go = Promise.all([
      st.walk('minh', X.door - 40, { speed: 140, follow: false }),
      st.walk('mum', X.door + 40, { speed: 140, follow: false }),
    ]);
    st.look(X.bike - 90, { dur: 1100 });
    await st.wait(1100);
    st.pose('dad', 'e062_start');
    await st.wait(300);
    st.set('st-engine'); st.sfx('car-go', { vol: 0.6 });
    await st.wait(900);
    st.pose('dad', 'e062_watch'); st.set('st-lb-wait'); st.sfx('tick', { vol: 0.5 });
    await st.wait(1100);
    await go;
  } },
  { key: ['barking at the gate', 'wants to come too'], icon: '🐶', label: 'barking', async play(st) {
    st.set('st-lb-wait', false); st.pose('dad', 'stand');
    st.dog('lucky', 'stand'); st.act('lucky', 'jump'); st.mood('lucky', 'joy');
    st.sfx('dog-bark');
    await st.say('lucky', 'Woof! Woof!', 1100);
    st.set('st-b-moto'); st.sfx('pop', { vol: 0.4 });
    await st.wait(400);
    st.sfx('dog-bark', { vol: 0.7 });
    await st.wait(900);
    st.act('lucky', null);
  } },
  { key: ["haven't brushed your teeth yet"], icon: '🪥', label: 'teeth!', async play(st) {
    st.set('st-b-moto', false);
    st.look(X.door, { dur: 1000 });
    await st.wait(600);
    st.face('mum', -1); st.face('minh', 1);
    st.hold('mum', 'e062_brush'); st.pose('mum', 'e062_tooth'); st.mood('mum', 'wow');
    st.sfx('pop', { vol: 0.5 });
    await st.say('mum', 'Your teeth!', 1500);
  } },
  { key: ['Mum says'], icon: '🗣️', label: 'Mum says', async play(st) {
    st.pose('mum', 'point'); st.act('mum', 'point'); st.mood('mum', 'happy');
    st.show('mumtag', true); st.sfx('ding', { vol: 0.4 });
    await st.wait(1300);
    st.act('mum', null);
  } },
  { key: ['Oh no!'], icon: '😱', label: 'Oh no!', async play(st) {
    st.show('mumtag', false); st.pose('mum', 'e062_tooth');
    st.pose('minh', 'e062_ohno'); st.mood('minh', 'wow'); st.act('minh', 'shiver');
    st.sfx('buzz-no', { vol: 0.5 });
    await st.say('minh', 'Oh no!', 1300);
    st.act('minh', null);
  } },
  { key: ['forgotten again'], icon: '🤦', label: 'forgotten again', async play(st) {
    st.pose('minh', 'e062_face'); st.mood('minh', 'shut');
    st.sfx('bump', { vol: 0.4 });
    await st.wait(300);
    st.set('st-b-forgot'); st.sfx('pop', { vol: 0.5 });
    await st.wait(1300);
  } },
  { key: ['runs to the bathroom'], icon: '🏃', label: 'bathroom', async play(st) {
    st.set('st-b-forgot', false); st.mood('minh', 'wow');
    st.hold('mum', null); st.pose('mum', 'give');
    await st.wait(200);
    st.hold('minh', 'toothbrush'); st.pose('minh', 'stand'); st.pose('mum', 'stand');
    await st.walk('minh', X.sink - 30, { speed: 140 });
    st.face('minh', 1);
    st.pose('minh', 'brush'); st.act('minh', 'brush'); st.mood('minh', 'shut');
    st.fx('bubbles', X.sink - 26, 170, { quiet: true }); st.sfx('brush-teeth', { vol: 0.7 });
    await st.wait(1200);
    st.act('minh', null);
  } },
  { key: ["haven't been late yet", 'Dad laughs'], icon: '😄', label: 'not late yet', async play(st) {
    st.hold('minh', null); st.pose('minh', 'stand'); st.mood('minh', 'joy');
    st.look(X.bike - 60, { dur: 1200 });
    await st.wait(1000);
    st.set('st-lb-late'); st.sfx('pop', { vol: 0.4 });
    st.pose('dad', 'e062_laugh'); st.mood('dad', 'joy'); st.act('dad', 'hop');
    await st.wait(300);
    st.sfx('giggle', { vol: 0.6 });
    await st.say('dad', 'Ha ha!', 1400);
    st.act('dad', null);
  } },
];

export default {
  id: 'en062', worldW: 1640, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'bag', kind: 'thing', x: X.desk + 16, y: DESK_TOP, svg: BAG_OPEN, box: [-16, -44, 32, 46] },
    { id: 'dad', kind: 'adult', who: 'en_dad', x: X.bike - 14, s: 0.95, face: -1 },
    { id: 'mum', kind: 'adult', who: 'en_mum', x: 410, s: 0.95, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: X.desk - 50, s: 1.06 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: X.sink - 30, s: 1.1, face: 1 },
    { id: 'lucky', kind: 'dog', x: X.gate - 40, s: 0.9, face: 1 },
    { id: 'q', kind: 'thing', x: 300, y: 118, svg: `<circle cy="-16" r="15" fill="#fff" stroke="#EA580C" stroke-width="2"/><text y="-8" text-anchor="middle" ${NUN} font-size="24" fill="#EA580C">?</text>`, box: [-16, -32, 32, 34] },
    { id: 'mumtag', kind: 'thing', x: X.door + 40, y: 118, svg: `<g transform="translate(0 0)"><rect x="-26" y="-24" width="52" height="20" rx="10" fill="#fff" stroke="#EA580C" stroke-width="1.6"/><text y="-9.5" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="14" fill="#EA580C">Mum</text><path d="M-5 -4.5 L0 2 L5 -4.5Z" fill="#fff" stroke="#EA580C" stroke-width="1.4"/></g>`, box: [-28, -26, 56, 30] },
  ],
  init(st) {
    st.show('q', false); st.show('mumtag', false);
    st.dog('lucky', 'sit');
  },
};
