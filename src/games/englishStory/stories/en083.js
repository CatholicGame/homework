/**
 * Bài 83 "What the Teacher Said" (câu tường thuật: said that…, told us that…). Đi từ trái sang phải: lớp học (bảng ghi
 * "Friday", "School trip: Bat Trang", hình bình gốm; cô Hoa, Minh và Tom ngồi bàn) → cửa lớp → con đường về nhà → nhà Minh
 * (bếp: ghế đẩu, bếp nấu có nồi bốc hơi, cửa phòng Lan).
 * Lời cô Hoa được Minh kể lại hiện trong bong bóng "nhớ lại" (giấy vàng nhạt) có đầu cô Hoa và nhãn "Ms Hoa" chỉ vào cô:
 * xe buýt + đồng hồ 7 giờ, mũ + chai nước, bàn xoay làm bát gốm, hộp cơm có dấu ✔ + tiền mua quà, xe buýt có bố mẹ Tom.
 * Việc thật (cô viết bảng, Minh về nhà, mẹ hỏi, mẹ cười, khen, Lan kể) nhân vật làm thật.
 * Toạ độ cảnh: rộng 2000, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, room, windowBox, board, desk, thought, speaker, steam, road } from '../kit.js';

const FLOOR = 282;
const W = 2000;
const X = { board: 150, hoa: 440, minhD: 530, tomD: 612, cdoor: 760, hdoor: 1150, stool: 1440, mum: 1548, stove: 1640, ldoor: 1900 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e083_hoa: { ...CAST.en_hoa, bottom: 'pants', bottomC: '#FFFFFF' },
  e083_tdad: { adult: true, hair: 'short', hairC: '#C2872E', top: 'shirt', shirt: '#60A5FA' },
  e083_tmum: { adult: true, hair: 'bob', hairC: '#F2C14E', top: 'blouse', shirt: '#F9A8D4' },
});

// ── Đồ vật (gốc ở giữa) ────────────────────────────────────────────────────
const VASE = (s = 1) => `<g transform="scale(${s})"><path d="M-6 -16 H6 L5 -11 Q14 -4 12 6 Q10 14 0 15 Q-10 14 -12 6 Q-14 -4 -5 -11Z" fill="#E0F2FE" stroke="${L}" stroke-width="1"/>
  <path d="M-10 0 Q0 -6 10 0 M-9 6 Q0 1 9 6" stroke="#2563EB" stroke-width="1.4" fill="none"/><circle cx="0" cy="-2" r="2" fill="#2563EB"/></g>`;
const BUS = (heads = '') => `<g><rect x="-34" y="-20" width="68" height="28" rx="5" fill="#FACC15" stroke="${L}" stroke-width="1"/>
  ${[-26, -10, 6].map((x) => `<rect x="${x}" y="-16" width="13" height="11" rx="1.5" fill="#BAE6FD" stroke="${L}" stroke-width="0.7"/>`).join('')}
  <rect x="22" y="-16" width="10" height="20" rx="1.5" fill="#BAE6FD" stroke="${L}" stroke-width="0.7"/>${heads}
  <path d="M-34 0 H34" stroke="#EA580C" stroke-width="2"/>${[-20, 20].map((x) => `<circle cx="${x}" cy="8" r="5" fill="#1F2937" stroke="${L}" stroke-width="0.8"/><circle cx="${x}" cy="8" r="2" fill="#CBD5E1"/>`).join('')}</g>`;
const CLOCK = `<circle r="16" fill="#fff" stroke="${L}" stroke-width="1.4"/>${Array.from({ length: 12 }, (_, i) => `<path d="M0 -13 V-11" stroke="${L}" stroke-width="1.2" transform="rotate(${i * 30})"/>`).join('')}
  <g class="e083-hh"><path d="M0 0 V-8" stroke="#DC2626" stroke-width="2.6" stroke-linecap="round"/></g><g class="e083-mh"><path d="M0 0 V-12" stroke="${L}" stroke-width="1.8" stroke-linecap="round"/></g><circle r="1.6" fill="${L}"/>`;
const HAT = `<ellipse cx="0" cy="4" rx="20" ry="5" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/><path d="M-11 4 Q-11 -12 0 -12 Q11 -12 11 4Z" fill="#FCD34D" stroke="${L}" stroke-width="0.9"/><path d="M-11 0 H11" stroke="#EF4444" stroke-width="2.4"/>`;
const BOTTLE = `<rect x="-7" y="-14" width="14" height="28" rx="5" fill="#7DD3FC" stroke="${L}" stroke-width="0.9"/><rect x="-4" y="-20" width="8" height="7" rx="1.5" fill="#2563EB" stroke="${L}" stroke-width="0.8"/><path d="M-7 -2 H7" stroke="#fff" stroke-width="2" opacity="0.7"/>`;
const TICK = `<path d="M-7 0 L-2 5 L8 -6" stroke="#16A34A" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const LUNCH = `<rect x="-18" y="-12" width="36" height="24" rx="4" fill="#F87171" stroke="${L}" stroke-width="1"/><rect x="-14" y="-8" width="28" height="16" rx="2" fill="#fff" stroke="${L}" stroke-width="0.6"/>
  <circle cx="-6" cy="0" r="5" fill="#FEF3C7" stroke="${L}" stroke-width="0.5"/><circle cx="6" cy="-2" r="3" fill="#22C55E"/><ellipse cx="7" cy="4" rx="4" ry="2" fill="#F97316"/>`;
const COIN = `<circle r="6" fill="#FACC15" stroke="#B45309" stroke-width="1"/><text y="2.6" text-anchor="middle" ${NUN} font-size="7" fill="#B45309">đ</text>`;
const BULB = `<circle cx="0" cy="-6" r="11" fill="#FEF08A" stroke="${L}" stroke-width="1.2"/><rect x="-5" y="4" width="10" height="7" rx="1.5" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/>
  ${[-60, -20, 20, 60].map((r) => `<path d="M0 -21 V-27" stroke="#FACC15" stroke-width="2.4" stroke-linecap="round" transform="rotate(${r} 0 -6)"/>`).join('')}`;
const BAG_FLOOR = `<rect x="-11" y="-26" width="22" height="26" rx="5" fill="#F59E0B" stroke="${L}" stroke-width="1"/><rect x="-8" y="-13" width="16" height="9" rx="2" fill="none" stroke="${L}" stroke-width="0.8"/>`;

const POSES = {
  e083_tell: { R: [70, 120], L: [40, 110], dy: 20, head: -4 },
  e083_count: { R: [140, 170], L: [40, 110], dy: 20 },
  e083_think: { R: [30, -150], L: [16, -60], dy: 20, head: 8 },
  e083_cheer: { R: [150, 172], L: [150, 172], dy: 20 },
  e083_ask: { R: [60, 120], L: [60, 120], head: 6 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
function bg() {
  const write = `<g class="e083-write"><text x="${X.board + 18}" y="104" ${NUN} font-size="15" fill="#FDE68A">Friday</text>
    <text x="${X.board + 18}" y="132" ${NUN} font-size="17" fill="#F8FAFC">School trip:</text>
    <text x="${X.board + 18}" y="158" ${NUN} font-size="19" fill="#93C5FD">Bat Trang</text>
    <g transform="translate(${X.board + 196} 140) scale(1.5)"><path d="M-6 -16 H6 L5 -11 Q14 -4 12 6 Q10 14 0 15 Q-10 14 -12 6 Q-14 -4 -5 -11Z" fill="none" stroke="#F8FAFC" stroke-width="1.4"/><path d="M-10 0 Q0 -6 10 0" stroke="#F8FAFC" stroke-width="1" fill="none"/></g></g>`;
  return `
  <!-- lớp học -->
  ${room(0, X.cdoor + 14, FLOOR, '#E0F2FE')}
  ${board(X.board, 80, 240, 96)}${write}
  ${windowBox(30, 70, 96, 86)}
  <rect x="${X.cdoor - 22}" y="128" width="44" height="${FLOOR - 128}" fill="#B45309" stroke="${L}"/><circle cx="${X.cdoor + 12}" cy="${FLOOR - 70}" r="2.6" fill="#FDE68A"/>
  <!-- đường về nhà -->
  ${sky(X.cdoor + 14, X.hdoor - X.cdoor - 70, 315, 'e083sky')}
  ${cloud(900, 70, 0.8, 0)}
  ${tree(880, 250, 0.8)}${tree(1030, 250, 0.7, '')}
  <rect x="${X.cdoor + 14}" y="236" width="${X.hdoor - X.cdoor - 70}" height="40" fill="#BBF7D0"/>
  ${road(X.cdoor + 14, X.hdoor - X.cdoor - 70, FLOOR)}
  <!-- nhà Minh -->
  ${room(X.hdoor - 56, W - X.hdoor + 56, FLOOR, '#FEF9C3', '#E8B884')}
  <rect x="${X.hdoor - 56}" y="0" width="10" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  <rect x="${X.hdoor - 24}" y="128" width="48" height="${FLOOR - 128}" fill="#7C2D12" stroke="${L}"/>
  <g class="e083-hd"><rect x="${X.hdoor - 22}" y="130" width="44" height="${FLOOR - 130}" fill="#B45309" stroke="${L}"/><circle cx="${X.hdoor + 14}" cy="${FLOOR - 70}" r="2.6" fill="#FDE68A"/></g>
  ${windowBox(1230, 74, 96, 80)}
  <!-- tranh gốm, kệ -->
  <rect x="1350" y="76" width="60" height="44" rx="3" fill="#fff" stroke="${L}"/><g transform="translate(1380 100)">${VASE(1)}</g>
  <!-- bếp: tủ, bếp nấu, nồi -->
  <rect x="${X.stove - 40}" y="${FLOOR - 64}" width="150" height="64" fill="#F1F5F9" stroke="${L}" stroke-width="1.2"/>
  <rect x="${X.stove - 44}" y="${FLOOR - 70}" width="158" height="8" rx="2" fill="#94A3B8" stroke="${L}"/>
  <g transform="translate(${X.stove} ${FLOOR - 70})"><path d="M-20 0 V-24 H20 V0Z" fill="#64748B" stroke="${L}"/><rect x="-24" y="-28" width="48" height="6" rx="2" fill="#475569" stroke="${L}"/></g>
  ${steam(X.stove, FLOOR - 102)}
  <g transform="translate(${X.stove + 64} ${FLOOR - 70})"><path d="M-10 0 V-30 Q-10 -36 0 -36 Q10 -36 10 -30 V0Z" fill="#FDE68A" stroke="${L}"/></g>
  <rect x="1580" y="70" width="140" height="56" fill="#FEF3C7" stroke="${L}"/><path d="M1650 70 V126" stroke="${L}"/>
  <!-- cửa phòng Lan -->
  <rect x="${X.ldoor - 26}" y="126" width="52" height="${FLOOR - 126}" fill="#7C2D12" stroke="${L}"/>
  <g class="e083-ld"><rect x="${X.ldoor - 24}" y="128" width="48" height="${FLOOR - 128}" fill="#F472B6" stroke="${L}"/><circle cx="${X.ldoor - 14}" cy="${FLOOR - 70}" r="2.6" fill="#FDE68A"/></g>
  <!-- ghế đẩu -->
  <g transform="translate(${X.stool} ${FLOOR})"><rect x="-22" y="-32" width="44" height="7" rx="3" fill="#B45309" stroke="${L}"/><path d="M-16 -25 L-20 0 M16 -25 L20 0" stroke="#92400E" stroke-width="4"/></g>`;
}

function fg() {
  const hoaHead = `<g transform="translate(-72 12)">${headOnly('en_hoa', { s: 0.66, mood: 'joy' })}</g>${speaker(-72, -10, 'Ms Hoa', '#2563EB')}`;
  const tomFam = `<g transform="translate(-16 -8)">${headOnly('e083_tdad', { s: 0.34, mood: 'joy' })}</g><g transform="translate(0 -8)">${headOnly('en_tom_home', { s: 0.32, mood: 'joy' })}</g><g transform="translate(15 -8)">${headOnly('e083_tmum', { s: 0.34, mood: 'joy' })}</g>`;
  const inner = `<rect x="-104" y="-40" width="208" height="82" rx="14" fill="#FEF9C3"/>${hoaHead}
    <g class="e083-in e083-in-bus"><g class="e083-drive"><g transform="translate(6 18)">${BUS()}</g></g><g transform="translate(70 -4)">${CLOCK}</g><text x="70" y="28" text-anchor="middle" ${NUN} font-size="13" fill="#DC2626">7:00</text></g>
    <g class="e083-in e083-in-bring"><g class="e083-pop e083-pop1"><g transform="translate(4 0)">${HAT}</g><g transform="translate(4 24)">${TICK}</g></g>
      <g class="e083-pop e083-pop2"><g transform="translate(64 -2)">${BOTTLE}</g><g transform="translate(64 24)">${TICK}</g></g></g>
    <g class="e083-in e083-in-bowl"><g transform="translate(34 20)"><ellipse cx="0" cy="4" rx="34" ry="7" fill="#78716C" stroke="${L}"/><g class="e083-spin"><ellipse cx="0" cy="0" rx="30" ry="6" fill="#A8A29E" stroke="${L}"/><path d="M-20 0 H20" stroke="#D6D3D1" stroke-width="1.4"/></g>
      <g class="e083-clay"><path d="M-18 0 Q-20 -22 -14 -26 H14 Q20 -22 18 0Z" fill="#C2703D" stroke="${L}" stroke-width="1"/><ellipse cx="0" cy="-26" rx="14" ry="3.6" fill="#9A3412" stroke="${L}" stroke-width="0.7"/></g>
      <g class="e083-hands"><circle cx="-24" cy="-12" r="5" fill="#F5C9A6" stroke="${L}" stroke-width="0.8"/><circle cx="24" cy="-12" r="5" fill="#F5C9A6" stroke="${L}" stroke-width="0.8"/></g></g>
      <text x="34" y="-28" text-anchor="middle" ${NUN} font-size="12" fill="#9A3412">our own bowls</text></g>
    <g class="e083-in e083-in-lunch"><g transform="translate(-4 2)">${LUNCH}</g><g class="e083-ok"><g transform="translate(-4 26)">${TICK}</g></g>
      <g class="e083-coins">${[[46, -10], [56, -2], [40, 4]].map(([x, y], i) => `<g transform="translate(${x} ${y})"><g class="e083-coin" style="animation-delay:${i * 0.18}s">${COIN}</g></g>`).join('')}</g>
      <g class="e083-souv"><g transform="translate(84 6)">${VASE(1.1)}</g></g><text x="66" y="32" text-anchor="middle" ${NUN} font-size="11" fill="#B45309">souvenirs</text></g>
    <g class="e083-in e083-in-tom"><g class="e083-drive2"><g transform="translate(30 12) scale(1.35)">${BUS(tomFam)}</g></g></g>`;
  return `
  <!-- bàn học (che chân) -->
  ${desk(X.minhD - 4, FLOOR)}${desk(X.tomD - 4, FLOOR, '#FB923C')}
  ${bush(X.cdoor + 60, FLOOR + 28, 0.5)}
  ${thought(1368, 110, 262, 112, `<g transform="scale(1.12)">${inner}</g>`, [X.stool - 2, 178], 'e083-mem')}
  <g class="e083-bulb"><g transform="translate(${X.stool + 2} 150)">${BULB}</g></g>
  <!-- nhãn -->
  <g class="e083-lb e083-lb-fri">${label(130, 60, 'On Friday', '#EA580C', 15)}</g>
  <g class="e083-lb e083-lb-home">${label(X.hdoor + 130, 96, 'got home', '#16A34A', 15)}</g>`;
}

const CSS = `
.e083-lb { opacity: 0; transition: opacity .35s; }
.st-lb-fri .e083-lb-fri, .st-lb-home .e083-lb-home { opacity: 1; }
.e083-write { clip-path: inset(0 100% 0 0); }
.st-write .e083-write { clip-path: inset(0 0 0 0); transition: clip-path 2.4s linear; }
.e083-hd { transform-origin: ${X.hdoor - 22}px 0; transition: transform .45s; }
.st-hdoor .e083-hd { transform: scaleX(.15); }
.e083-ld { transform-origin: ${X.ldoor + 24}px 0; transition: transform .45s; }
.st-ldoor .e083-ld { transform: scaleX(.15); }
.e083-mem { opacity: 0; transform: scale(.4); transform-origin: ${X.stool}px 176px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-mem .e083-mem { opacity: 1; transform: none; }
.e083-in { opacity: 0; transition: opacity .3s; }
.st-bus .e083-in-bus, .st-bring .e083-in-bring, .st-bowl .e083-in-bowl, .st-lunch .e083-in-lunch, .st-tom .e083-in-tom { opacity: 1; }
.st-bus .e083-drive { animation: e083Drive 1.4s ease-out both; }
@keyframes e083Drive { from { transform: translateX(-40px); opacity: 0; } to { transform: none; opacity: 1; } }
.e083-hh { transform: rotate(0deg); } .e083-mh { transform: rotate(0deg); }
.st-seven .e083-hh { transform: rotate(210deg); transition: transform 1.4s ease-in-out; }
.st-seven .e083-mh { transform: rotate(720deg); transition: transform 1.4s ease-in-out; }
.e083-pop { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: 50% 50%; transition: opacity .2s, transform .4s cubic-bezier(.3,1.6,.6,1); }
.st-pop1 .e083-pop1, .st-pop2 .e083-pop2 { opacity: 1; transform: none; }
.st-bowl .e083-spin { animation: e083Spin .5s linear infinite; transform-box: fill-box; transform-origin: center; }
@keyframes e083Spin { 0% { transform: scaleX(1); } 50% { transform: scaleX(.85); } 100% { transform: scaleX(1); } }
.e083-clay { transform: scaleY(.25); transform-box: fill-box; transform-origin: 50% 100%; }
.st-bowl .e083-clay { transform: none; transition: transform 2.2s ease-out .3s; }
.st-bowl .e083-hands { animation: e083Hands .25s ease-in-out infinite alternate; }
@keyframes e083Hands { to { transform: translateY(-3px); } }
.e083-ok, .e083-souv { opacity: 0; transition: opacity .3s; }
.st-lunchok .e083-ok, .st-money .e083-souv { opacity: 1; }
.e083-coin { opacity: 0; }
.st-money .e083-coin { animation: e083Coin .45s ease-in both; }
@keyframes e083Coin { from { opacity: 0; transform: translateY(-24px); } to { opacity: 1; transform: none; } }
.st-tom .e083-drive2 { animation: e083Drive 1.6s ease-out both; }
.e083-bulb { opacity: 0; transform: scale(.3); transform-origin: ${X.stool}px 150px; transition: opacity .2s, transform .4s cubic-bezier(.3,1.6,.6,1); }
.st-bulb .e083-bulb { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .st-bowl .e083-spin, .st-bowl .e083-hands { animation-duration: 1.2s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const talk = async (st, id, ms) => { st.talk(id, true); await st.wait(ms); st.talk(id, false); };
/** Minh kể lại (ngồi ghế đẩu, tay khoa): bong bóng nhớ lại với phần k. */
const recall = (st, k) => {
  off(st, 'st-bus', 'st-bring', 'st-bowl', 'st-lunch', 'st-tom');
  st.set('st-mem'); st.set(`st-${k}`);
  st.pose('minh', 'e083_tell'); st.mood('minh', 'joy');
};

const BEATS = [
  { key: ['On Friday', 'the school trip to Bat Trang pottery village'], icon: '🏺', label: 'school trip', async play(st) {
    st.look(380);
    st.set('st-lb-fri'); st.sfx('school-bell', { vol: 0.3 });
    st.pose('hoa', 'raise'); st.face('hoa', -1);
    await st.wait(400);
    st.set('st-write');
    await st.loop('pencil', () => st.wait(2400), { vol: 0.8 });
    st.pose('hoa', 'e083_ask'); st.face('hoa', 1); st.talk('hoa', true);
    st.mood('minh', 'wow'); st.mood('tom', 'wow'); st.sfx('ding', { vol: 0.4 });
    await st.wait(1200);
    st.talk('hoa', false); st.pose('hoa', 'stand');
  } },
  { key: ['got home', 'told Mum everything'], icon: '🏠', label: 'told Mum', async play(st) {
    st.set('st-lb-fri', false);
    st.place('minh', 960, FLOOR, 1); st.pose('minh', 'stand'); st.bag('minh', true); st.mood('minh', 'joy');
    st.look(1060, { instant: true });
    const go = st.walk('minh', X.stool, { speed: 130, lead: 20 });
    await st.wait(((X.hdoor - 60 - 960) / 130) * 1000);
    st.set('st-hdoor'); st.set('st-lb-home'); st.sfx('door-open', { vol: 0.6 });
    await go;
    st.set('st-hdoor', false); st.sfx('bag-on', { vol: 0.5 });
    st.bag('minh', false); st.show('bag', true);
    st.face('mum', -1); st.pose('mum', 'stand'); st.mood('mum', 'joy');
    st.pose('minh', 'sit'); st.act('minh', 'hop'); st.talk('minh', true);
    await st.wait(1300);
    st.talk('minh', false); st.act('minh', null);
  } },
  { key: ['the bus would leave at seven', 'he explained'], icon: '🚌', label: 'bus at seven', async play(st) {
    st.set('st-lb-home', false);
    st.look(1400);
    recall(st, 'bus'); st.sfx('pop', { vol: 0.5 });
    const t = talk(st, 'minh', 2800);
    await st.wait(300); st.sfx('bus', { vol: 0.5 });
    await st.wait(1100);
    st.set('st-seven');
    await st.loop('tick', () => st.wait(1400), { vol: 0.6 });
    st.sfx('ding', { vol: 0.4 });
    await t;
  } },
  { key: ['bring a hat and a bottle of water'], icon: '👒', label: 'a hat · water', async play(st) {
    st.set('st-seven', false);
    recall(st, 'bring');
    const t = talk(st, 'minh', 2400);
    await st.wait(500);
    st.set('st-pop1'); st.sfx('pop', { vol: 0.6 });
    await st.wait(800);
    st.set('st-pop2'); st.sfx('pop', { vol: 0.6, rate: 1.2 });
    st.act('mum', 'nod');
    await t;
    st.act('mum', null);
  } },
  { key: ['we could make our own bowls'], icon: '🥣', label: 'make our own bowls', async play(st) {
    off(st, 'st-pop1', 'st-pop2');
    recall(st, 'bowl');
    const t = talk(st, 'minh', 2600);
    await st.loop('roll', () => st.wait(2400), { vol: 0.5 });
    st.mood('mum', 'wow');
    await t;
  } },
  { key: ['Mum asked about lunch'], icon: '🍱', label: 'asked about lunch', async play(st) {
    off(st, 'st-bowl', 'st-mem');
    st.pose('minh', 'sit'); st.mood('mum', 'happy');
    st.pose('mum', 'e083_ask'); st.sfx('pop', { vol: 0.5 });
    await st.say('mum', 'What about lunch?', 1800);
    st.pose('mum', 'stand');
  } },
  { key: ['lunch was included', 'some money for souvenirs'], icon: '💰', label: 'lunch · souvenirs', async play(st) {
    recall(st, 'lunch'); st.sfx('pop', { vol: 0.4 });
    const t = talk(st, 'minh', 3400);
    await st.wait(600);
    st.set('st-lunchok'); st.sfx('bowl-down', { vol: 0.6 });
    await st.wait(1000);
    st.set('st-money'); st.sfx('cash', { vol: 0.6 });
    await t;
  } },
  { key: ['he remembered one more thing'], icon: '💡', label: 'one more thing', async play(st) {
    off(st, 'st-lunch', 'st-lunchok', 'st-money', 'st-mem');
    st.pose('minh', 'e083_think'); st.mood('minh', 'happy');
    st.sfx('tick', { vol: 0.4 });
    await st.wait(900);
    st.set('st-bulb'); st.sfx('ding', { vol: 0.6 });
    st.pose('minh', 'e083_count'); st.mood('minh', 'wow');
    await st.wait(1000);
  } },
  { key: ["Tom's parents were coming with us"], icon: '👨‍👩‍👦', label: "Tom's parents", async play(st) {
    st.set('st-bulb', false);
    recall(st, 'tom');
    const t = talk(st, 'minh', 2800);
    st.sfx('bus', { vol: 0.5 });
    await st.wait(1700);
    st.sfx('giggle', { vol: 0.4 });
    await t;
  } },
  { key: ['Mum smiled'], icon: '😊', label: 'Mum smiled', async play(st) {
    off(st, 'st-tom', 'st-mem');
    st.pose('minh', 'sit');
    st.mood('mum', 'joy'); st.pose('mum', 'open');
    st.fx('hearts', X.mum, 120);
    await st.wait(1500);
  } },
  { key: ['You listened very carefully'], icon: '👏', label: 'listened carefully', async play(st) {
    st.pose('mum', 'clap'); st.act('mum', 'clap'); st.sfx('clap', { vol: 0.6 });
    const s = st.say('mum', 'You listened very carefully!', 2200);
    await st.wait(700);
    st.act('mum', null); st.pose('mum', 'give');
    st.pose('minh', 'e083_cheer'); st.act('minh', 'hop'); st.mood('minh', 'joy');
    await s;
    st.act('minh', null); st.pose('minh', 'sit');
  } },
  { key: ['she had visited Bat Trang last year', 'loved it'], icon: '🏺', label: 'Lan visited', async play(st) {
    st.pose('mum', 'stand');
    st.look(1520);
    st.set('st-ldoor'); st.sfx('door-open', { vol: 0.6 });
    st.show('lan', true);
    await st.walk('lan', 1630, { speed: 120, follow: false });
    st.set('st-ldoor', false);
    st.face('lan', -1); st.pose('lan', 'carry'); st.mood('lan', 'joy');
    st.face('mum', 1); st.mood('minh', 'wow');
    const s = st.say('lan', 'I visited Bat Trang last year. I loved it!', 2800);
    await st.wait(900);
    st.fx('hearts', 1630, 170);
    await s;
  } },
];

export default {
  id: 'en083', worldW: W, floor: FLOOR, viewTop: 40, camStart: 180, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  order: [0, 1, 2, 4, 6, 8],
  cast: [
    { id: 'bag', kind: 'thing', x: X.stool - 34, svg: BAG_FLOOR, box: [-12, -28, 24, 30] },
    { id: 'hoa', kind: 'adult', who: 'e083_hoa', x: X.hoa, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: X.tomD, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: X.minhD, face: -1 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: X.mum, face: 1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.ldoor, s: 1.08, face: -1 },
  ],
  init(st) {
    st.show('bag', false); st.show('lan', false);
    st.pose('minh', 'sitDesk'); st.pose('tom', 'sitDesk');
    st.chest('lan', `<g transform="translate(0 6)">${VASE(1.2)}</g>`);
  },
};
