/**
 * Bài 78 "Boring or Bored?" (tính từ -ed / -ing): một Chủ nhật mưa, đi từ trái sang phải: phòng khách (cửa sổ mưa, lịch "SUN",
 * đồng hồ, sô-pha, Minh ngồi chán) → góc đọc sách (sô-pha đôi, Lan đọc sách khủng long, giá sách có Kitty nằm trên nóc)
 * → hành lang + cửa chính (buổi tối bố đi làm về, Minh kể, bong bóng nghĩ thư viện).
 * Bong bóng hình trên đầu hai chị em: khủng long cổ dài rất to (cạnh một bé tí cho thấy độ lớn), "!" và hai xe buýt dài bằng nó.
 * Toạ độ cảnh: rộng 1400, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { catSvg } from '../rig.js';
import { KIT_CSS, L, label, room, doorway, windowBox, shelf, books, thought, rug, BALL } from '../kit.js';

const FLOOR = 282;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { win: 50, sofa1: 300, ball: 196, sofa2: 708, seatL: 666, seatR: 750, shelf: 880, hall: 960, door: 1300, dad: 1236 };
const KIT = { x: 900, y: 140 }; // Kitty nằm trên nóc giá sách
const TH = { x: 708, y: 114 }; // tâm bong bóng hình khủng long

// ── Đồ vật ─────────────────────────────────────────────────────────────────
/** Sách khủng long mở trước ngực (giống BOOK của rig.js, có trang lật pp-page). */
const DINOBOOK = `<g transform="translate(0 -13) rotate(-4)"><rect x="-19" y="-13" width="38" height="26" rx="2" fill="#16A34A" stroke="${L}" stroke-width="1"/>
  <rect x="-17" y="-11" width="34" height="22" fill="#fff" stroke="${L}" stroke-width="0.6"/><path d="M0 -11 V11" stroke="${L}" stroke-width="0.8"/>
  <path d="M-15 6 Q-13 -2 -8 -2 Q-6 -8 -3 -8 Q-1 -8 -2 -5 Q-4 -4 -5 -1 Q-3 3 -4 6Z" fill="#4ADE80" stroke="${L}" stroke-width="0.5"/>
  <g class="pp-page" style="transform-origin:0 0"><path d="M0 -11 H16 V11 H0Z" fill="#F8FAFC" stroke="${L}" stroke-width="0.6"/></g>
  <path d="M3 -6 H14 M3 -2 H14 M3 2 H12 M3 6 H13" stroke="#94A3B8" stroke-width="0.9"/></g>`;
/** Sách mở đặt trên mặt ghế (gốc = giữa gáy sách chạm ghế). */
const FLATBOOK = `<path d="M0 -2 L-24 -6 L-20 -14 L0 -10Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M0 -2 L24 -6 L20 -14 L0 -10Z" fill="#F8FAFC" stroke="${L}" stroke-width="0.9"/>
  <path d="M-18 -11 Q-14 -13 -11 -11 Q-9 -14 -7 -12" stroke="#16A34A" stroke-width="2" fill="none"/><path d="M4 -8 L18 -10 M5 -6 L17 -8" stroke="#94A3B8" stroke-width="0.8"/>
  <path d="M-24 -6 L-25 -3 L0 0 L25 -3 L24 -6" fill="#16A34A" stroke="${L}" stroke-width="0.8"/>`;
/** Khủng long cổ dài nhìn nghiêng (mũi sang phải), gốc = giữa chân, dài ≈ 200. */
const DINO = `<path d="M-100 -34 Q-60 -40 -40 -58 Q-10 -80 30 -64 Q52 -58 62 -70 Q76 -110 92 -116 Q104 -118 104 -110 Q102 -104 94 -104 Q86 -96 80 -62 Q74 -36 50 -28 Q10 -18 -30 -24 Q-70 -26 -100 -34Z" fill="#4ADE80" stroke="${L}" stroke-width="1.4" stroke-linejoin="round"/>
  ${[[-30, '#22C55E'], [-14, '#4ADE80'], [26, '#22C55E'], [42, '#4ADE80']].map(([x, c]) => `<rect x="${x - 6}" y="-34" width="13" height="34" rx="5" fill="${c}" stroke="${L}" stroke-width="1.1"/>`).join('')}
  <circle cx="98" cy="-111" r="1.8" fill="${L}"/><path d="M-20 -52 Q0 -60 20 -50" stroke="#16A34A" stroke-width="2" fill="none"/>`;
/** Xe buýt nhìn nghiêng, gốc = giữa đáy, dài 96 (12 m, cùng tỉ lệ với khủng long dài 26 m). */
const BUS = (c = '#FACC15') => `<rect x="-48" y="-30" width="96" height="24" rx="5" fill="${c}" stroke="${L}" stroke-width="1.1"/>
  ${[-38, -22, -6, 10, 26].map((x) => `<rect x="${x}" y="-26" width="12" height="9" rx="1.5" fill="#BAE6FD" stroke="${L}" stroke-width="0.6"/>`).join('')}<rect x="40" y="-26" width="6" height="12" rx="1" fill="#BAE6FD" stroke="${L}" stroke-width="0.6"/>
  <circle cx="-28" cy="-5" r="5" fill="#1F2937" stroke="${L}"/><circle cx="28" cy="-5" r="5" fill="#1F2937" stroke="${L}"/>`;
/** Bé tí đứng cạnh khủng long (cao 1,3 m ≈ 10 đơn vị). */
const TINY = `<circle cy="-8" r="2.4" fill="#FCD9B6" stroke="${L}" stroke-width="0.5"/><path d="M-2 -5.6 H2 L2.4 -1 H-2.4Z M-1.6 -1 V0 M1.6 -1 V0" fill="#3B82F6" stroke="${L}" stroke-width="0.5"/>`;
const LIB = `<path d="M-46 -14 L0 -38 L46 -14Z" fill="#F87171" stroke="${L}" stroke-width="1"/><rect x="-40" y="-14" width="80" height="44" fill="#FEF3C7" stroke="${L}" stroke-width="1"/>
  ${[-28, -12, 12, 28].map((x) => `<rect x="${x - 3}" y="-10" width="6" height="36" fill="#fff" stroke="${L}" stroke-width="0.6"/>`).join('')}
  <rect x="-7" y="10" width="14" height="20" rx="2" fill="#B45309" stroke="${L}" stroke-width="0.7"/>
  <g transform="translate(0 -24)"><rect x="-10" y="-5" width="20" height="10" fill="#fff" stroke="${L}" stroke-width="0.6"/><path d="M0 -5 V5" stroke="${L}" stroke-width="0.6"/></g>`;

const POSES = {
  e078_chin: { R: [30, -150], L: [30, -150], dy: 20, head: 8 },
  e078_slump: { R: [30, 40], L: [30, 40], dy: 26, head: 16 },
  e078_cross: { R: [22, -112], L: [22, -112], head: -12 },
  e078_scared: { R: [128, 172], L: [128, 172], dy: 20, head: -8 },
  e078_give: { R: [62, 78], L: [62, 78], dy: 20 },
  e078_look: { R: [30, 40], L: [30, 40], dy: 20, head: 12 },
  e078_laugh: { R: [24, -96], L: [24, -96], dy: 20, head: -8 },
};

function bg() {
  return `
  <!-- Phòng khách -->
  ${room(0, X.hall, FLOOR, '#FEF3C7')}
  <g transform="translate(${X.win} 70)"><rect x="-6" y="-6" width="142" height="112" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/>
    <clipPath id="e078clip"><rect width="130" height="100"/></clipPath><g clip-path="url(#e078clip)"><rect width="130" height="100" fill="#94A3B8"/><rect class="e078-dusk" width="130" height="100" fill="#FB923C"/><rect class="e078-dusk2" width="130" height="100" fill="#312E81" opacity="0.7"/>
    ${[[28, 22, 1], [80, 14, 0.9], [110, 30, 0.7]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse rx="26" ry="11" fill="#CBD5E1"/><ellipse cx="-10" cy="-7" rx="13" ry="10" fill="#CBD5E1"/><ellipse cx="10" cy="-8" rx="14" ry="11" fill="#CBD5E1"/></g>`).join('')}
    <g class="e078-rain">${Array.from({ length: 24 }, (_, i) => `<path d="M${(i * 37) % 130} ${((i * 53) % 100) - 20} l-4 12" stroke="#E0F2FE" stroke-width="1.8" stroke-linecap="round"/>`).join('')}
      ${Array.from({ length: 24 }, (_, i) => `<path d="M${(i * 37) % 130} ${((i * 53) % 100) + 80} l-4 12" stroke="#E0F2FE" stroke-width="1.8" stroke-linecap="round"/>`).join('')}</g>
    </g><path d="M65 0 V100 M0 50 H130" stroke="#fff" stroke-width="3" opacity="0.85"/></g>
  <!-- lịch, đồng hồ -->
  <g transform="translate(240 64)"><rect x="-26" y="0" width="52" height="56" rx="4" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-26" y="0" width="52" height="17" rx="4" fill="#EF4444" stroke="${L}"/>
    <text y="13" text-anchor="middle" ${NUN} font-size="12" fill="#fff">SUN</text><text y="46" text-anchor="middle" ${NUN} font-size="24" fill="#1E293B">7</text></g>
  <g transform="translate(400 80)"><circle r="20" fill="#fff" stroke="#22C55E" stroke-width="3.2"/><path d="M0 0 V-13" stroke="${L}" stroke-width="2" stroke-linecap="round"/>
    <g class="e078-sec"><path d="M0 2 L9 -6" stroke="#DC2626" stroke-width="1.4" stroke-linecap="round"/></g><circle r="2" fill="${L}"/></g>
  <!-- sô-pha phòng khách (lưng) -->
  <rect x="${X.sofa1 - 92}" y="196" width="184" height="62" rx="14" fill="#F97316" stroke="${L}" stroke-width="1.2"/>
  ${rug(X.sofa1, FLOOR, 200, '#FDE68A')}
  <!-- góc đọc sách: đèn đứng, sô-pha đôi (lưng), giá sách cao -->
  <g transform="translate(560 0)"><path d="M0 ${FLOOR} V120" stroke="#475569" stroke-width="3"/><rect x="-14" y="${FLOOR - 4}" width="28" height="5" rx="2" fill="#475569"/><path d="M-20 122 L-12 92 H12 L20 122Z" fill="#FDE68A" stroke="${L}"/></g>
  <rect x="${X.sofa2 - 92}" y="196" width="184" height="62" rx="14" fill="#0EA5E9" stroke="${L}" stroke-width="1.2"/>
  ${rug(X.sofa2, FLOOR, 220, '#C4B5FD')}
  <g transform="translate(${X.shelf} 0)"><rect x="-44" y="${KIT.y}" width="88" height="${FLOOR - KIT.y}" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.3"/>
    ${[KIT.y + 40, KIT.y + 82].map((y) => `<rect x="-38" y="${y}" width="76" height="5" fill="#92400E"/>`).join('')}
    ${shelf(-38, KIT.y + 40, 0, books(-34, KIT.y + 40, 8))}${shelf(-38, KIT.y + 82, 0, books(-34, KIT.y + 82, 8))}
    <rect x="-38" y="${KIT.y + 92}" width="76" height="${FLOOR - KIT.y - 98}" fill="#92400E" opacity="0.5"/></g>
  ${doorway(X.hall, FLOOR)}
  <!-- Hành lang + cửa chính -->
  ${room(X.hall + 12, 1400 - X.hall - 12, FLOOR, '#E0E7FF', '#C08B5C')}
  <g transform="translate(1110 40)"><path d="M0 0 V30" stroke="${L}"/><path d="M-18 46 Q0 22 18 46Z" fill="#FDE047" stroke="${L}"/><circle class="e078-lamp" cy="50" r="40" fill="#FEF08A" opacity="0"/></g>
  <rect x="1060" y="200" width="70" height="${FLOOR - 200}" rx="3" fill="#A16207" stroke="${L}"/><rect x="1056" y="196" width="78" height="8" rx="3" fill="#CA8A04" stroke="${L}"/>
  <path d="M1076 212 V270 M1114 212 V270" stroke="#78350F" stroke-width="1"/>
  <g transform="translate(${X.door} 0)"><rect x="-46" y="98" width="92" height="${FLOOR - 98}" fill="#1E293B" stroke="${L}"/>
    <rect class="e078-dusk" x="-42" y="102" width="84" height="${FLOOR - 104}" fill="#FB923C"/><rect class="e078-dusk2" x="-42" y="102" width="84" height="${FLOOR - 104}" fill="#312E81" opacity="0.7"/>
    <g class="e078-door"><rect x="-42" y="102" width="84" height="${FLOOR - 104}" fill="#B45309" stroke="${L}"/><rect x="-30" y="116" width="60" height="60" rx="3" fill="#92400E" stroke="${L}" stroke-width="0.8"/><circle cx="30" cy="196" r="4" fill="#FDE68A" stroke="${L}"/></g></g>
  <rect x="${X.door + 50}" y="0" width="${1400 - X.door - 50}" height="${FLOOR}" fill="#E0E7FF"/>
  <rect x="1360" y="196" width="22" height="${FLOOR - 196}" rx="4" fill="#64748B" stroke="${L}"/>`;
}

function fg() {
  const lab = (k, x, y, t, c, s) => `<g class="e078-lb e078-lb-${k}">${label(x, y, t, c, s)}</g>`;
  const dino = `<g transform="translate(6 34) scale(0.86)">${DINO}</g>
    <g class="e078-tiny"><g transform="translate(-112 34) scale(1.2)">${TINY}</g></g>
    <g class="e078-bus1"><g transform="translate(-36 48) scale(0.86)">${BUS()}</g></g><g class="e078-bus2"><g transform="translate(48 48) scale(0.86)">${BUS('#FB923C')}</g></g>
    <g class="e078-bang"><g transform="translate(-92 -34)"><circle r="13" fill="#EF4444" stroke="${L}"/><text y="7" text-anchor="middle" ${NUN} font-size="19" fill="#fff">!</text></g></g>`;
  return `
  <!-- mặt trước hai sô-pha (che chân người ngồi) -->
  <g transform="translate(${X.sofa1} 0)"><rect x="-88" y="248" width="176" height="14" rx="6" fill="#FB923C" stroke="${L}"/><rect x="-104" y="222" width="22" height="46" rx="9" fill="#EA580C" stroke="${L}"/><rect x="82" y="222" width="22" height="46" rx="9" fill="#EA580C" stroke="${L}"/>
    <rect x="-90" y="260" width="180" height="10" rx="4" fill="#EA580C" stroke="${L}"/><path d="M-76 266 V${FLOOR} M76 266 V${FLOOR}" stroke="#7C2D12" stroke-width="5"/></g>
  <g transform="translate(${X.sofa2} 0)"><rect x="-88" y="248" width="176" height="14" rx="6" fill="#38BDF8" stroke="${L}"/><rect x="-104" y="222" width="22" height="46" rx="9" fill="#0284C7" stroke="${L}"/><rect x="82" y="222" width="22" height="46" rx="9" fill="#0284C7" stroke="${L}"/>
    <rect x="-90" y="260" width="180" height="10" rx="4" fill="#0284C7" stroke="${L}"/><path d="M-76 266 V${FLOOR} M76 266 V${FLOOR}" stroke="#0C4A6E" stroke-width="5"/></g>
  <!-- buổi tối: cả nhà tối đi một chút, đèn hành lang sáng -->
  <rect class="e078-eve" x="0" y="0" width="1400" height="315" fill="#1E1B4B"/>
  <!-- bong bóng: khủng long -->
  ${thought(TH.x, TH.y, 290, 100, dino, [TH.x - 30, 176], 'e078-th e078-th-dino')}
  <!-- bong bóng: thư viện -->
  ${thought(1150, 104, 150, 92, `<g transform="translate(0 2) scale(0.9)">${LIB}</g>`, [1170, 162], 'e078-th e078-th-lib')}
  <!-- nhãn -->
  ${lab('sunday', 240, 146, 'rainy Sunday', '#2563EB', 14)}
  ${lab('bored', X.sofa1 + 4, 158, 'bored', '#64748B', 18)}
  ${lab('nothing', X.sofa1 + 6, 136, 'nothing to do', '#64748B', 14)}
  ${lab('boring', X.sofa1 + 4, 136, 'so boring', '#64748B', 17)}
  ${lab('interesting', X.seatR + 6, 156, 'interesting', '#7C3AED', 15)}
  ${lab('exciting', X.seatR + 6, 156, 'exciting!', '#DC2626', 17)}
  ${lab('notint', 560, 140, 'not interested', '#64748B', 14)}
  ${lab('amazed', X.seatL - 6, 170, 'amazed', '#DB2777', 17)}
  ${lab('huge', TH.x - 40, 62, 'huge', '#15803D', 15)}
  ${lab('surprising', TH.x - 40, 62, 'surprising', '#DC2626', 14)}
  ${lab('buses', TH.x - 40, 62, 'two buses', '#B45309', 14)}
  ${lab('frightened', X.seatL - 30, 160, 'frightened', '#7C3AED', 15)}
  ${lab('scared', X.seatR + 30, 160, 'a little cat', '#DB2777', 14)}
  ${lab('evening', 1110, 150, 'evening', '#4338CA', 16)}
  ${lab('excited', 1150, 140, 'so excited!', '#EA580C', 17)}`;
}

const LBS = ['sunday', 'bored', 'nothing', 'boring', 'interesting', 'exciting', 'notint', 'amazed', 'huge', 'surprising', 'buses', 'frightened', 'scared', 'evening', 'excited'];
const CSS = `
.e078-lb { opacity: 0; transition: opacity .35s; }
${LBS.map((k) => `.st-lb-${k} .e078-lb-${k}`).join(', ')} { opacity: 1; }
.e078-rain { animation: e078Rain .5s linear infinite; }
@keyframes e078Rain { from { transform: translate(0, -60px); } to { transform: translate(-12px, 0); } }
.st-eve .e078-rain { opacity: .5; }
.e078-dusk, .e078-dusk2 { opacity: 0; transition: opacity 1.2s; } .st-eve .e078-dusk { opacity: 1; } .st-eve .e078-dusk2 { opacity: .7; }
.e078-eve { opacity: 0; transition: opacity 1.2s; pointer-events: none; } .st-eve .e078-eve { opacity: .22; }
.e078-lamp { transition: opacity 1s; } .st-eve .e078-lamp { opacity: .55; }
.e078-sec { animation: e078Sec 4s steps(8) infinite; }
@keyframes e078Sec { to { transform: rotate(360deg); } }
.e078-th { opacity: 0; transition: opacity .35s; }
.st-th-dino .e078-th-dino, .st-th-lib .e078-th-lib { opacity: 1; }
.e078-tiny, .e078-bang, .e078-bus1, .e078-bus2 { opacity: 0; transition: opacity .3s, transform .6s cubic-bezier(.3,1.3,.6,1); }
.st-tiny .e078-tiny, .st-bang .e078-bang { opacity: 1; }
.st-bang .e078-bang { animation: e078Pop .35s ease-in-out 3 alternate; transform-box: fill-box; transform-origin: center; }
@keyframes e078Pop { to { transform: scale(1.3); } }
.e078-bus1, .e078-bus2 { transform: translateX(-140px); }
.st-bus1 .e078-bus1, .st-bus2 .e078-bus2 { opacity: 1; transform: none; }
.e078-door { transform-box: fill-box; transform-origin: 0 50%; transition: transform .7s ease-in-out; }
.st-door .e078-door { transform: scaleX(.12); }
@media (prefers-reduced-motion: reduce) {
  .e078-rain { animation-duration: 1.4s; }
  .st-bang .e078-bang { animation-duration: .8s; animation-iteration-count: 1; }
  .e078-bus1, .e078-bus2 { transition-duration: .3s, 1.1s; }
}
`;

const lb = (st, k, on = true) => st.set(`st-lb-${k}`, on);
/** Kitty bay (nhảy) theo đường cong, gốc ở giữa thân. */
const CAT_FLY = `<g transform="translate(0 30)">${catSvg()}</g>`;

const BEATS = [
  { key: ['a rainy day', 'Minh felt bored'], icon: '🌧️', label: 'bored', async play(st) {
    st.look(250);
    lb(st, 'sunday'); st.sfx('rain', { vol: 0.7 });
    await st.wait(1200);
    lb(st, 'sunday', false);
    st.pose('minh', 'e078_chin'); st.mood('minh', 'sad'); lb(st, 'bored');
    await st.loop('tick', () => st.wait(1700), { vol: 0.7 });
  } },
  { key: ['There is nothing to do'], icon: '🤷', label: 'nothing to do', async play(st) {
    st.look(250);
    lb(st, 'bored', false);
    st.pose('minh', 'shrug'); st.mood('minh', 'sad'); lb(st, 'nothing'); st.sfx('pop', { vol: 0.4 });
    await st.say('minh', 'Nothing to do!', 1500);
    // bóng lăn đi một chút rồi dừng: chẳng ai muốn chơi
    st.sfx('roll', { vol: 0.5 });
    await st.walk('ball', X.ball - 40, { speed: 50, follow: false });
    await st.wait(300);
  } },
  { key: ['Everything is so boring'], icon: '🥱', label: 'so boring', async play(st) {
    st.look(250);
    lb(st, 'nothing', false);
    st.pose('minh', 'e078_slump'); st.mood('minh', 'shut'); lb(st, 'boring');
    st.sfx('wind', { vol: 0.35 });
    await st.wait(700);
    st.fx('zzz', X.sofa1 - 40, 150);
    await st.wait(1500);
  } },
  { key: ['an interesting book about dinosaurs'], icon: '📗', label: 'interesting book', async play(st) {
    lb(st, 'boring', false);
    await st.look(X.seatR - 60, { dur: 1000 });
    st.act('lan', 'read'); st.sfx('page-turn', { vol: 0.7 }); lb(st, 'interesting');
    await st.wait(1400);
    st.sfx('page-turn', { vol: 0.7 });
    await st.wait(900);
  } },
  { key: ["Why don't you read this"], icon: '🙋‍♀️', label: 'read this', async play(st) {
    lb(st, 'interesting', false);
    st.act('lan', null); st.pose('lan', 'e078_give'); st.mood('lan', 'joy'); st.sfx('pop', { vol: 0.4 });
    st.say('lan', 'Read this!', 1500);
    st.look(470, { dur: 900 });
    await st.wait(400);
    st.mood('minh', 'happy');
    await st.walk('minh', 606, { speed: 130, lead: 70 });
  } },
  { key: ['really exciting'], icon: '🤩', label: 'exciting', async play(st) {
    st.look(640);
    st.pose('lan', 'read'); st.act('lan', 'read'); st.sfx('page-turn', { vol: 0.7 });
    await st.wait(400);
    st.mood('lan', 'joy'); lb(st, 'exciting');
    st.sfx('lion-drum', { vol: 0.5 });
    st.fx('sparkle', X.seatR + 6, 200, { quiet: true });
    await st.wait(1600);
  } },
  { key: ["Minh wasn't interested"], icon: '😒', label: 'not interested', async play(st) {
    st.look(640);
    lb(st, 'exciting', false); st.act('lan', null);
    st.face('minh', -1); st.pose('minh', 'e078_cross'); st.mood('minh', 'shut'); st.act('minh', 'no');
    lb(st, 'notint'); st.sfx('buzz-no', { vol: 0.4 });
    await st.wait(1500);
    st.act('minh', null);
  } },
  { key: ['after a few pages', 'he was amazed'], icon: '😲', label: 'amazed', async play(st) {
    lb(st, 'notint', false);
    st.look(X.sofa2);
    st.pose('minh', 'stand'); st.mood('minh', 'happy');
    await st.walk('minh', X.seatL, { speed: 90, follow: false });
    st.face('minh', 1);
    st.pose('minh', 'read'); st.chest('lan', null); st.pose('lan', 'sit'); st.chest('minh', DINOBOOK); st.act('minh', 'read');
    for (let i = 0; i < 3; i++) { st.sfx('page-turn', { vol: 0.6 }); await st.wait(600); }
    st.act('minh', null); st.mood('minh', 'wow'); lb(st, 'amazed'); st.sfx('ding', { vol: 0.5 });
    await st.wait(1000);
  } },
  { key: ['Dinosaurs were huge', 'really surprising'], icon: '🦕', label: 'huge', async play(st) {
    lb(st, 'amazed', false);
    st.look(X.sofa2);
    // Minh đặt sách mở lên ghế giữa hai chị em, cả hai cúi xem
    st.chest('minh', null); st.show('book', true); st.sfx('page-turn', { vol: 0.5 });
    st.pose('minh', 'e078_look'); st.pose('lan', 'e078_look'); st.face('lan', -1);
    st.set('st-th-dino'); st.sfx('pop', { vol: 0.5 });
    await st.wait(300);
    st.set('st-tiny'); lb(st, 'huge');
    for (let i = 0; i < 2; i++) { st.sfx('bump', { vol: 0.8, rate: 0.6 }); await st.wait(450); }
    await st.wait(400);
    lb(st, 'huge', false);
    st.set('st-bang'); lb(st, 'surprising'); st.sfx('ding', { vol: 0.6 });
    st.mood('lan', 'wow'); st.mood('minh', 'wow');
    await st.wait(1500);
  } },
  { key: ['as long as two buses'], icon: '🚌', label: 'two buses', async play(st) {
    lb(st, 'surprising', false); st.set('st-bang', false); st.set('st-tiny', false);
    st.look(X.sofa2);
    st.set('st-bus1'); st.sfx('bus', { vol: 0.5 });
    await st.wait(800);
    st.set('st-bus2'); st.sfx('bus', { vol: 0.5, rate: 1.1 });
    await st.wait(800);
    lb(st, 'buses'); st.sfx('ding', { vol: 0.5 }); st.mood('minh', 'joy');
    await st.wait(1200);
  } },
  { key: ['Kitty jumped onto the book', 'very frightened'], icon: '🐱', label: 'Kitty jumped', async play(st) {
    lb(st, 'buses', false); st.set('st-th-dino', false); st.set('st-bus1', false); st.set('st-bus2', false);
    st.look(X.sofa2 + 40);
    st.dog('kitty', 'stand'); st.sfx('meow', { vol: 0.6 });
    await st.wait(500);
    st.show('kitty', false); st.sfx('whoosh', { vol: 0.5 });
    await st.fly(CAT_FLY, [KIT.x, KIT.y - 30], [X.sofa2 + 2, 218], { size: 60, dur: 650 });
    st.place('kitty', X.sofa2 + 2, 246, -1); st.dog('kitty', 'sit'); st.show('kitty', true); st.sfx('bump', { vol: 0.6 });
    st.pose('minh', 'e078_scared'); st.mood('minh', 'cry'); st.act('minh', 'shiver'); lb(st, 'frightened');
    await st.wait(1400);
  } },
  { key: ['He screamed', 'Lan laughed'], icon: '😱', label: 'screamed', async play(st) {
    st.look(X.sofa2 + 40);
    st.act('minh', 'jump'); st.sfx('whoosh', { vol: 0.5 });
    await st.say('minh', 'Aaah!', 1100);
    st.act('minh', 'shiver'); lb(st, 'frightened', false);
    st.pose('lan', 'e078_laugh'); st.mood('lan', 'joy'); st.act('lan', 'hop'); st.sfx('giggle', { vol: 0.8 });
    await st.say('lan', 'Ha ha ha!', 1500);
    st.act('lan', null);
  } },
  { key: ['scared of a little cat'], icon: '😹', label: 'a little cat', async play(st) {
    st.look(X.sofa2 + 40);
    st.act('minh', null);
    st.pose('lan', 'point'); st.face('lan', -1); st.mood('lan', 'joy'); lb(st, 'scared');
    st.dog('kitty', 'sit'); st.act('kitty', 'wag'); st.sfx('purr', { vol: 0.8 });
    await st.wait(1200);
    st.pose('minh', 'e078_look'); st.mood('minh', 'shut'); st.sfx('meow', { vol: 0.5 });
    await st.wait(1000);
    st.mood('minh', 'happy');
  } },
  { key: ['In the evening', "wasn't boring at all"], icon: '🌆', label: 'not boring', async play(st) {
    lb(st, 'scared', false); st.act('kitty', null);
    st.set('st-eve'); lb(st, 'evening');
    st.look(1150, { dur: 1400 });
    st.chest('minh', null); st.pose('minh', 'stand'); st.show('book', false); st.pose('lan', 'read'); st.chest('lan', DINOBOOK); st.face('lan', 1);
    await st.wait(500);
    st.set('st-door'); st.sfx('door-open', { vol: 0.6 }); st.show('dad', true);
    const dad = st.walk('dad', X.dad, { speed: 110, follow: false });
    await st.walk('minh', 1150, { speed: 140, follow: false });
    await dad;
    st.face('dad', -1); st.face('minh', 1); lb(st, 'evening', false);
    st.pose('minh', 'cheer'); st.mood('minh', 'joy'); st.sfx('pop', { vol: 0.4 });
    await st.say('minh', 'Not boring at all!', 1600);
  } },
  { key: ['going to the library'], icon: '📚', label: 'library', async play(st) {
    st.look(1180);
    st.set('st-door', false); st.sfx('door-open', { vol: 0.3, rate: 1.2 });
    st.pose('minh', 'pointUp'); st.mood('minh', 'joy');
    st.set('st-th-lib'); st.sfx('pop', { vol: 0.5 });
    await st.wait(700);
    st.sfx('page-turn', { vol: 0.6 });
    st.mood('dad', 'joy'); st.act('dad', 'nod');
    await st.wait(1400);
    st.act('dad', null);
  } },
  { key: ['so excited'], icon: '🎉', label: 'so excited', async play(st) {
    st.look(1180);
    st.set('st-th-lib', false); lb(st, 'excited');
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy'); st.sfx('cheer', { vol: 0.6 });
    await st.wait(300);
    st.pose('dad', 'clap'); st.act('dad', 'clap'); st.sfx('clap', { vol: 0.6 });
    await st.wait(1600);
    st.act('minh', null); st.act('dad', null); st.pose('dad', 'stand');
  } },
];

export default {
  id: 'en078', worldW: 1400, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  order: [0, 3, 7, 9, 10, 13],
  cast: [
    { id: 'ball', kind: 'thing', x: X.ball, svg: `<g transform="translate(0 -9)">${BALL('#3B82F6')}</g>`, box: [-10, -19, 20, 20] },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.sofa1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.seatR, s: 1.06 },
    { id: 'book', kind: 'thing', x: X.sofa2, y: 248, svg: FLATBOOK, box: [-26, -16, 52, 18] },
    { id: 'kitty', kind: 'cat', x: KIT.x, y: KIT.y, s: 0.9, face: -1 },
    { id: 'dad', kind: 'adult', who: 'en_dad', x: X.door + 10, s: 0.95, face: -1 },
  ],
  init(st) {
    st.dog('kitty', 'sit'); st.show('dad', false); st.show('book', false);
    st.pose('minh', 'sit');
    st.pose('lan', 'read'); st.chest('lan', DINOBOOK);
  },
};
