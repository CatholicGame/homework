/**
 * Bài 17 "What Are You Wearing?": phòng ngủ của hai anh em (giá treo đồ của Minh · mẹ đứng giữa · giá đồ của Lan · cửa ra),
 * ra phố rồi vào sân trường đang có tiệc. Mỗi món đồ được nói tới thì bay từ giá vào người (đổi trang phục st.dress).
 * Toạ độ cảnh: rộng 1900, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, room, doorway, windowBox, fence, label, schoolFront, flowerAt } from '../kit.js';

const FLOOR = 282;

// Trang phục riêng của truyện (Minh mặc dần từng món; Lan mặc váy, đi dép; áo đỏ giống nhau ở bữa tiệc)
Object.assign(CAST, {
  e017_minh_shirt: { hair: 'spiky', top: 'shirt', shirt: '#FFFFFF', bottom: 'pants', bottomC: '#2563EB', shoe: '#F1F5F9' },
  e017_minh_half: { hair: 'spiky', top: 'shirt', shirt: '#FFFFFF', bottom: 'pants', bottomC: '#7DB3F5', shoe: '#F59E0B' },
  e017_minh_shoes: { hair: 'spiky', top: 'shirt', shirt: '#FFFFFF', bottom: 'pants', bottomC: '#2563EB', shoe: '#1F2937' },
  e017_minh_red: { hair: 'spiky', top: 'tee', shirt: '#EF4444', bottom: 'pants', bottomC: '#2563EB', shoe: '#1F2937' },
  e017_tom_red: { hair: 'neat', hairC: '#E0A33A', top: 'tee', shirt: '#EF4444', bottom: 'shorts', bottomC: '#334155', shoe: '#16A34A' },
  // váy liền: dáng nghiêng vẽ váy bằng bottom 'skirt' cùng màu
  e017_lan_dress: { hair: 'ponytail', top: 'dress', shirt: '#F9A8D4', bottom: 'skirt', bottomC: '#F9A8D4', shoe: '#FDE2C8' },
  e017_lan_sandal: { hair: 'ponytail', top: 'dress', shirt: '#F9A8D4', bottom: 'skirt', bottomC: '#F9A8D4', shoe: '#D97706' },
});

// ── Đồ vật (gốc ở giữa) ────────────────────────────────────────────────────
const SHIRT = `<path d="M-14 -20 L-6 -24 Q0 -19 6 -24 L14 -20 L24 -10 L18 -3 L13 -8 V22 H-13 V-8 L-18 -3 L-24 -10Z" fill="#fff" stroke="${L}" stroke-width="1.2"/>
  <path d="M-6 -24 L0 -14 L6 -24" fill="none" stroke="${L}" stroke-width="1"/><path d="M0 -14 V22" stroke="${L}" stroke-width="0.6" opacity="0.5"/>
  ${[-6, 2, 10].map((y) => `<circle cx="2" cy="${y}" r="1.2" fill="#CBD5E1"/>`).join('')}`;
const TROUSERS = `<path d="M-13 -24 H13 L15 24 H3 L0 -6 L-3 24 H-15Z" fill="#2563EB" stroke="${L}" stroke-width="1.2"/><path d="M-13 -18 H13" stroke="#1E40AF" stroke-width="2"/>`;
const shoePair = (c, x = 0) => `<g transform="translate(${x} 0)">${[-8, 8].map((dx) => `<path d="M${dx - 8} 4 Q${dx - 8} -4 ${dx - 2} -4 L${dx + 3} -2 Q${dx + 9} 0 ${dx + 9} 4Z" fill="${c}" stroke="${L}" stroke-width="1"/><path d="M${dx - 5} -2 h5" stroke="#fff" stroke-width="1" opacity="0.6"/>`).join('')}</g>`;
const SHOES = shoePair('#1F2937');
const PINKSHOES = shoePair('#F28AB2');
const SANDALS = [-9, 9].map((dx) => `<path d="M${dx - 8} 4 Q${dx - 9} 0 ${dx - 6} 0 H${dx + 7} Q${dx + 10} 0 ${dx + 9} 4Z" fill="#B45309" stroke="${L}" stroke-width="1"/>
  <path d="M${dx - 5} 0 Q${dx - 1} -8 ${dx + 3} 0 M${dx - 6} -1 Q${dx - 7} -6 ${dx - 3} -6" stroke="#F59E0B" stroke-width="2.2" fill="none" stroke-linecap="round"/>`).join('');
const DRESS = `<path d="M-9 -24 Q0 -20 9 -24 L12 -6 L24 24 Q0 30 -24 24 L-12 -6Z" fill="#F9A8D4" stroke="${L}" stroke-width="1.2"/><path d="M-12 -6 Q0 -2 12 -6" stroke="#EC4899" stroke-width="2" fill="none"/>
  ${[[-8, 8], [4, 12], [-2, 18], [10, 20]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#fff"/>`).join('')}`;
/** Mũ vàng rộng vành, đội trên đầu (gốc = tâm đầu trẻ em). */
const HAT_ON = `<ellipse cx="0" cy="-12" rx="27" ry="6" fill="#FACC15" stroke="${L}" stroke-width="1.1"/>
  <path d="M-15 -13 Q-15 -32 0 -32 Q15 -32 15 -13Z" fill="#FDE047" stroke="${L}" stroke-width="1.1"/>
  <path d="M-15 -17 Q0 -13 15 -17" stroke="#F472B6" stroke-width="3.4" fill="none"/><circle cx="12" cy="-17" r="3" fill="#F472B6" stroke="${L}" stroke-width="0.6"/>`;
const HAT = `<g transform="translate(0 18)">${HAT_ON}</g>`;
const TSHIRT = (c = '#EF4444', s = 1) => `<g transform="scale(${s})"><path d="M-10 -16 L-4 -18 Q0 -14 4 -18 L10 -16 L20 -8 L15 -2 L11 -5 V16 H-11 V-5 L-15 -2 L-20 -8Z" fill="${c}" stroke="${L}" stroke-width="1.2"/>
  <path d="M-8 -2 H8" stroke="#fff" stroke-width="2.4" opacity="0.7"/></g>`;
const hanger = (x, y) => `<path d="M${x} ${y} q0 -6 4 -6 q4 0 3 5 M${x} ${y} L${x - 16} ${y + 9} H${x + 16}Z" stroke="#78716C" stroke-width="1.8" fill="none" stroke-linejoin="round"/>`;
const balloon = (x, y, c, d = 0) => `<g class="e017-bob" style="animation-delay:${d}s"><path d="M${x} ${y + 22} q-4 14 2 30" stroke="${L}" stroke-width="0.8" fill="none"/>
  <ellipse cx="${x}" cy="${y}" rx="14" ry="17" fill="${c}" stroke="${L}"/><path d="M${x - 2} ${y + 17} h4 l-2 4Z" fill="${c}" stroke="${L}" stroke-width="0.6"/><path d="M${x - 7} ${y - 8} q3 -4 7 -4" stroke="#fff" stroke-width="2" fill="none" opacity="0.6"/></g>`;
const bunting = (x1, x2, y) => {
  const n = Math.floor((x2 - x1) / 30), cols = ['#EF4444', '#FACC15', '#22C55E', '#3B82F6', '#EC4899'];
  return `<path d="M${x1} ${y} Q${(x1 + x2) / 2} ${y + 18} ${x2} ${y}" stroke="${L}" stroke-width="1.2" fill="none"/>
    ${Array.from({ length: n }, (_, i) => { const t = (i + 0.5) / n, x = x1 + (x2 - x1) * t, yy = y + 36 * t * (1 - t); return `<path d="M${x - 10} ${yy} H${x + 10} L${x} ${yy + 18}Z" fill="${cols[i % 5]}" stroke="${L}" stroke-width="0.8"/>`; }).join('')}`;
};
/** Biển "không mặc quần áo": áo phông bị gạch chéo đỏ. */
const NO_CLOTHES = `<circle r="22" fill="#fff" stroke="#DC2626" stroke-width="4"/>${TSHIRT('#EF4444', 0.9)}<path d="M-15 -15 L15 15" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/>`;

function bg() {
  return `
  ${sky(820, 1080, 315, 'e017sky')}
  ${cloud(930, 70, 1, 0)}${cloud(1250, 52, 0.8, 3)}${cloud(1700, 66, 1, 5)}
  <path d="M820 236 Q960 200 1100 232 T1400 226 T1900 232 V282 H820Z" fill="#86EFAC" stroke="${L}"/>
  ${tree(900, FLOOR - 8, 1)}${tree(1040, FLOOR - 8, 0.9, '#F59E0B')}
  ${fence(860, 250, FLOOR)}
  ${schoolFront(1760, FLOOR)}
  <rect x="820" y="${FLOOR}" width="1080" height="${315 - FLOOR}" fill="#E5E7EB" stroke="${L}"/>
  ${Array.from({ length: 18 }, (_, i) => `<path d="M${830 + i * 60} ${FLOOR} V315" stroke="#CBD5E1" stroke-width="1.2"/>`).join('')}
  <!-- Cổng trường -->
  ${[1118, 1182].map((x) => `<rect x="${x - 9}" y="150" width="18" height="${FLOOR - 150}" fill="#FDE68A" stroke="${L}"/><rect x="${x - 12}" y="142" width="24" height="10" rx="2" fill="#F59E0B" stroke="${L}"/>`).join('')}
  <!-- Tiệc ở sân trường: dây cờ, băng rôn, bóng bay, bàn quà -->
  ${bunting(1190, 1470, 48)}${bunting(1470, 1700, 48)}
  <g transform="translate(1440 0)"><path d="M-110 74 V${FLOOR}" stroke="#78716C" stroke-width="3"/><path d="M110 74 V${FLOOR}" stroke="#78716C" stroke-width="3"/></g>
  ${balloon(1318, 92, '#EF4444', 0)}${balloon(1300, 104, '#3B82F6', 0.6)}${balloon(1562, 92, '#FACC15', 0.3)}${balloon(1580, 106, '#22C55E', 0.9)}
  ${label(1440, 92, 'SCHOOL PARTY', '#DC2626', 17)}
  <rect x="1650" y="226" width="110" height="10" rx="3" fill="#F5F5F4" stroke="${L}"/><rect x="1660" y="236" width="8" height="46" fill="#A8A29E" stroke="${L}"/><rect x="1742" y="236" width="8" height="46" fill="#A8A29E" stroke="${L}"/>
  <path d="M1652 236 H1758 V256 H1652Z" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>
  <g class="e017-stack">${[0, 1, 2].map((i) => `<g transform="translate(1690 ${218 - i * 7})">${TSHIRT('#EF4444', 0.85)}</g>`).join('')}</g>
  <g transform="translate(1734 214)"><rect x="-7" y="-12" width="14" height="20" rx="2" fill="#FDBA74" stroke="${L}"/><rect x="-5" y="-6" width="10" height="12" fill="#FB923C"/></g>
  <g transform="translate(1718 218)"><rect x="-6" y="-10" width="12" height="16" rx="2" fill="#86EFAC" stroke="${L}"/></g>
  ${flowerAt(1220, FLOOR - 40, '#F472B6')}${flowerAt(1240, FLOOR - 36, '#FACC15')}${flowerAt(1620, FLOOR - 40, '#F472B6')}
  <!-- Phòng ngủ -->
  ${room(0, 830, FLOOR, '#FDF2F8')}
  ${Array.from({ length: 16 }, (_, i) => `<circle cx="${30 + (i * 97) % 780}" cy="${30 + (i * 53) % 110}" r="2.4" fill="#F9A8D4"/>`).join('')}
  <!-- Giá đồ của Minh: áo sơ mi trắng, quần xanh; kệ giày đen -->
  <rect x="58" y="92" width="6" height="${FLOOR - 92}" fill="#A16207" stroke="${L}"/><rect x="196" y="92" width="6" height="${FLOOR - 92}" fill="#A16207" stroke="${L}"/>
  <rect x="54" y="88" width="152" height="7" rx="3" fill="#B45309" stroke="${L}"/>
  ${hanger(100, 100)}${hanger(160, 100)}
  <g class="e017-shirt" transform="translate(100 134)">${SHIRT}</g>
  <g class="e017-trousers" transform="translate(160 136)">${TROUSERS}</g>
  <rect x="214" y="244" width="66" height="38" rx="3" fill="#D97706" stroke="${L}"/><rect x="220" y="252" width="54" height="10" rx="2" fill="none" stroke="${L}" stroke-width="0.8"/>
  <g class="e017-shoes" transform="translate(247 238)">${SHOES}</g>
  ${label(130, 70, 'Minh', '#2563EB', 13)}
  <!-- Áp phích bữa tiệc (sau lưng mẹ) -->
  <g transform="translate(410 76)"><g class="e017-poster"><rect x="-62" y="-34" width="124" height="66" rx="5" fill="#FEF9C3" stroke="${L}" stroke-width="1.4"/>
    <text x="0" y="-11" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="14" fill="#DC2626">SCHOOL PARTY</text>
    <text x="0" y="10" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#2563EB">TODAY!</text>
    <g class="e017-pglow">${[-46, 46].map((x, i) => `<ellipse cx="${x}" cy="18" rx="7" ry="9" fill="${i ? '#FACC15' : '#EF4444'}" stroke="${L}" stroke-width="0.8"/>`).join('')}</g></g></g>
  <!-- Giá đồ của Lan: váy hồng, mũ vàng; kệ giày hồng + dép -->
  <rect x="558" y="92" width="6" height="${FLOOR - 92}" fill="#A16207" stroke="${L}"/><rect x="676" y="92" width="6" height="${FLOOR - 92}" fill="#A16207" stroke="${L}"/>
  <rect x="554" y="88" width="132" height="7" rx="3" fill="#B45309" stroke="${L}"/>
  ${hanger(596, 100)}<path d="M650 95 v14" stroke="#78716C" stroke-width="2"/>
  <g class="e017-dress" transform="translate(596 136)">${DRESS}</g>
  <g class="e017-hat" transform="translate(650 120)">${HAT}</g>
  <rect x="694" y="244" width="96" height="38" rx="3" fill="#D97706" stroke="${L}"/><rect x="700" y="252" width="84" height="10" rx="2" fill="none" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(718 238)">${PINKSHOES}</g>
  <g class="e017-sandals" transform="translate(764 240)">${SANDALS}</g>
  <g transform="translate(718 232)"><g class="e017-noshoes"><path d="M-18 -16 L18 16 M18 -16 L-18 16" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/></g></g>
  ${label(620, 70, 'Lan', '#DB2777', 13)}
  ${windowBox(712, 70, 80, 70)}
  <!-- Ổ của Lucky cạnh cửa -->
  <ellipse cx="800" cy="${FLOOR - 4}" rx="34" ry="9" fill="#93C5FD" stroke="${L}"/>
  ${doorway(830, FLOOR)}
`;
}

/** Lớp trước: bụi hoa hai bên cổng, biển "chó không mặc quần áo". */
function fg() {
  return `${bush(1090, FLOOR + 6, 0.8)}${bush(1214, FLOOR + 6, 0.7, '#4ADE80')}
  <!-- Nhãn chữ của từng câu (hiện lúc nói, tắt cuối nhịp) -->
  <g class="e017-lb e017-lb-shirt">${label(100, 196, 'white shirt', '#334155', 13)}</g>
  <g class="e017-lb e017-lb-trousers">${label(160, 226, 'blue trousers', '#1D4ED8', 13)}</g>
  <g class="e017-lb e017-lb-shoes">${label(247, 214, 'black shoes', '#111827', 13)}</g>
  <g class="e017-lb e017-lb-dress">${label(560, 196, 'pink dress', '#DB2777', 13)}</g>
  <g class="e017-lb e017-lb-hat">${label(700, 120, 'yellow hat', '#B45309', 13)}</g>
  <g class="e017-lb e017-lb-sandals">${label(742, 210, 'sandals', '#B45309', 14)}</g>
  <g class="e017-lb e017-lb-same">${label(1464, 132, 'same', '#DC2626', 16)}</g>
  <g class="e017-lb e017-lb-red">${label(1464, 132, 'red T-shirts', '#DC2626', 16)}</g>
  <g class="e017-lb e017-lb-dog">${label(1262, 160, 'dog', '#92400E', 18)}</g>
  <g class="e017-nosign" transform="translate(1262 166)">${NO_CLOTHES}</g>`;
}

const CSS = `
.e017-bob { animation: e017Bob 2.2s ease-in-out infinite alternate; }
@keyframes e017Bob { to { transform: translateY(-6px); } }
.e017-pglow { opacity: .5; transition: opacity .4s; }
.st-party .e017-pglow { opacity: 1; animation: e017Bob .5s ease-in-out infinite alternate; }
.e017-poster { transition: transform .4s cubic-bezier(.3,1.6,.6,1); }
.st-party .e017-poster { transform: scale(1.12); }
.e017-shirt, .e017-trousers, .e017-shoes, .e017-dress, .e017-hat, .e017-sandals { transition: opacity .25s; }
.st-shirtOff .e017-shirt, .st-trousersOff .e017-trousers, .st-shoesOff .e017-shoes, .st-dressOff .e017-dress, .st-hatOff .e017-hat, .st-sandalsOff .e017-sandals { opacity: 0; }
.e017-noshoes { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .35s cubic-bezier(.3,1.6,.6,1); }
.st-noShoes .e017-noshoes { opacity: 1; transform: scale(1); }
.e017-stack > g:last-child { transition: opacity .25s; }
.st-tshirtTaken .e017-stack > g:last-child { opacity: 0; }
.e017-lb { opacity: 0; transition: opacity .3s; }
.st-lb-shirt .e017-lb-shirt, .st-lb-trousers .e017-lb-trousers, .st-lb-shoes .e017-lb-shoes, .st-lb-dress .e017-lb-dress, .st-lb-hat .e017-lb-hat,
.st-lb-sandals .e017-lb-sandals, .st-lb-same .e017-lb-same, .st-lb-red .e017-lb-red, .st-lb-dog .e017-lb-dog { opacity: 1; }
.e017-nosign { opacity: 0; transition: opacity .3s; }
.st-nosign .e017-nosign { opacity: 1; animation: e017Pop .4s cubic-bezier(.3,1.6,.6,1); }
@keyframes e017Pop { from { scale: .3; } to { scale: 1; } }
@media (prefers-reduced-motion: reduce) { .e017-bob { animation-duration: 6s; } }
`;

/** Mũ đi cùng Lan: đổi chỗ cùng tốc độ với Lan (cùng hướng nên không lệch nhịp quay). */
const walkLan = (st, x, opt = {}) => Promise.all([st.walk('lan', x, opt), st.walk('hat', x, { ...opt, follow: false })]);

const BEATS = [
  { key: ['the school party today'], icon: '🎉', label: 'school party', async play(st) {
    st.look(400);
    st.set('st-party'); st.fx('sparkle', 410, 70);
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    st.pose('lan', 'cheer'); st.act('lan', 'jump'); st.mood('lan', 'joy');
    await st.wait(2000);
    st.act('minh', null); st.act('lan', null); st.pose('minh', 'stand'); st.pose('lan', 'stand');
    st.mood('minh', 'happy'); st.mood('lan', 'happy'); st.set('st-party', false);
  } },
  { key: ['What are you wearing'], icon: '❓', label: 'What are you wearing?', async play(st) {
    st.look(330);
    await st.walk('mum', 436, { speed: 40, follow: false });
    st.pose('mum', 'point');
    await st.say('mum', 'What are you wearing, Minh?', 2100);
    st.pose('mum', 'stand'); st.pose('minh', 'think');
    await st.wait(300);
  } },
  { key: ['a white shirt', 'blue trousers'], icon: '👖', label: 'shirt and trousers', async play(st) {
    st.pose('minh', 'stand');
    await st.walk('minh', 130, { speed: 130, lead: 80 });
    st.pose('minh', 'reach');
    st.set('st-lb-shirt');
    await st.fly(SHIRT, [100, 134], [130, 200], { size: 50, dur: 600 });
    st.set('st-shirtOff');
    await st.dress('minh', 'e017_minh_half');
    st.set('st-lb-trousers');
    await st.fly(TROUSERS, [160, 136], [130, 230], { size: 50, dur: 600 });
    st.set('st-trousersOff');
    await st.dress('minh', 'e017_minh_shirt');
    st.pose('minh', 'stand'); st.mood('minh', 'joy');
    await st.wait(700);
    st.set('st-lb-shirt', false); st.set('st-lb-trousers', false); st.mood('minh', 'happy');
  } },
  { key: ['black shoes'], icon: '👞', label: 'black shoes', async play(st) {
    await st.walk('minh', 296, { speed: 130, lead: -40 });
    st.set('st-lb-shoes');
    await st.fly(SHOES, [247, 238], [296, 276], { size: 40, dur: 600 });
    st.set('st-shoesOff');
    await st.dress('minh', 'e017_minh_shoes');
    st.pose('minh', 'me'); st.mood('minh', 'joy'); st.fx('sparkle', 296, 270);
    await st.wait(1000);
    st.set('st-lb-shoes', false); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['What are you wearing, Lan'], icon: '❓', label: 'Lan?', async play(st) {
    st.look(500);
    await st.walk('mum', 440, { speed: 40, follow: false });
    st.pose('mum', 'point');
    await st.say('mum', 'What are you wearing, Lan?', 2100);
    st.pose('mum', 'stand'); st.pose('lan', 'think');
    await st.wait(300);
  } },
  { key: ['a pink dress', 'a yellow hat'], icon: '👗', label: 'dress and hat', async play(st) {
    st.pose('lan', 'stand');
    await walkLan(st, 630, { speed: 120, lead: 30 });
    st.pose('lan', 'reach'); st.set('st-lb-dress');
    await st.fly(DRESS, [596, 136], [630, 210], { size: 50, dur: 600 });
    st.set('st-dressOff');
    await st.dress('lan', 'e017_lan_dress');
    st.pose('lan', 'stand'); st.set('st-lb-hat');
    await st.fly(HAT, [650, 120], [630, 80], { size: 54, dur: 600 });
    st.set('st-hatOff'); st.show('hat', true); st.fx('sparkle', 630, 86);
    st.mood('lan', 'joy');
    await st.wait(800);
    st.set('st-lb-dress', false); st.set('st-lb-hat', false); st.mood('lan', 'happy');
  } },
  { key: ['not wearing shoes'], icon: '🚫', label: 'not shoes', async play(st) {
    st.look(660);
    st.pose('lan', 'point'); st.mood('lan', 'wow');
    await st.wait(500);
    st.set('st-noShoes');
    await st.wait(1500);
    st.pose('lan', 'stand'); st.mood('lan', 'happy');
  } },
  { key: ['sandals'], icon: '🩴', label: 'sandals', async play(st) {
    st.set('st-lb-sandals');
    await st.fly(SANDALS, [764, 240], [630, 276], { size: 40, dur: 700 });
    st.set('st-sandalsOff');
    await st.dress('lan', 'e017_lan_sandal');
    st.pose('lan', 'open'); st.mood('lan', 'joy'); st.fx('sparkle', 630, 272);
    await st.wait(1100);
    st.set('st-lb-sandals', false); st.pose('lan', 'stand'); st.mood('lan', 'happy');
  } },
  { key: ['At the party', 'the same T-shirt'], icon: '👕', label: 'same T-shirt', async play(st) {
    st.dog('lucky', 'sit');
    await Promise.all([
      st.walk('minh', 1420, { speed: 290, lead: 40 }),
      (async () => { await st.wait(250); await walkLan(st, 1340, { speed: 200, follow: false }); })(),
    ]);
    st.pose('hoa', 'give');
    st.set('st-tshirtTaken');
    await st.fly(TSHIRT(), [1690, 204], [1420, 200], { size: 44, dur: 650 });
    await st.dress('minh', 'e017_minh_red');
    st.pose('hoa', 'stand'); st.set('st-lb-same');
    st.pose('minh', 'point'); st.mood('minh', 'joy'); st.mood('tom', 'joy');
    await st.wait(1100);
    st.set('st-lb-same', false); st.pose('minh', 'stand');
  } },
  { key: ['red T-shirts'], icon: '🔴', label: 'red T-shirts', async play(st) {
    st.look(1470);
    st.set('st-lb-red');
    st.pose('minh', 'me'); st.act('minh', 'point');
    st.pose('tom', 'me'); st.act('tom', 'point');
    st.fx('sparkle', 1420, 200); st.fx('sparkle', 1510, 200);
    await st.wait(2200);
    st.act('minh', null); st.act('tom', null); st.pose('minh', 'stand'); st.pose('tom', 'stand');
    st.set('st-lb-red', false);
  } },
  { key: ['very happy'], icon: '😄', label: 'very happy', async play(st) {
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    st.pose('tom', 'cheer'); st.act('tom', 'jump'); st.mood('tom', 'joy');
    st.pose('lan', 'clap'); st.act('lan', 'clap'); st.mood('lan', 'joy');
    st.pose('hoa', 'clap'); st.act('hoa', 'clap'); st.mood('hoa', 'joy');
    st.fx('hearts', 1465, 150);
    await st.wait(1900);
    for (const id of ['minh', 'tom', 'lan', 'hoa']) { st.act(id, null); st.pose(id, 'stand'); }
  } },
  { key: ['Lucky'], icon: '🐶', label: 'Lucky?', async play(st) {
    st.pose('lan', 'point');
    st.dog('lucky', 'stand');
    st.sfx('dog-bark', { vol: 0.7 });
    await st.walk('lucky', 1262, { speed: 340, lead: 120 });
    st.act('lucky', 'wag'); st.mood('lucky', 'joy');
    st.pose('lan', 'stand');
    await st.wait(300);
  } },
  { key: ['Ha ha'], icon: '😆', label: 'Ha ha!', async play(st) {
    st.mood('minh', 'joy'); st.mood('tom', 'joy'); st.mood('lan', 'joy');
    st.pose('minh', 'clap'); st.act('minh', 'clap'); st.pose('tom', 'hips'); st.act('tom', 'hop');
    st.act('lucky', 'wag');
    await st.say('tom', 'Ha ha!', 1600);
    st.act('minh', null); st.act('tom', null); st.pose('minh', 'stand'); st.pose('tom', 'stand');
  } },
  { key: ['a dog'], icon: '🐕', label: 'a dog', async play(st) {
    st.look(1360);
    st.set('st-lb-dog');
    st.act('lucky', 'jump'); st.mood('lucky', 'joy');
    st.sfx('dog-bark');
    await st.say('lucky', 'Woof!', 1500);
    st.act('lucky', null);
    st.set('st-lb-dog', false);
  } },
  { key: ["don't wear clothes"], icon: '🙅', label: "don't wear clothes", async play(st) {
    st.pose('tom', 'give');
    await st.fly(TSHIRT('#EF4444', 0.7), [1510, 200], [1262, 236], { size: 36, dur: 700 });
    st.fx('poof', 1262, 236);
    st.dog('lucky', 'stand'); st.act('lucky', 'wag');
    st.set('st-nosign');
    await st.fly(TSHIRT('#EF4444', 0.7), [1262, 236], [1500, 210], { size: 36, dur: 600 });
    st.pose('tom', 'stand');
    st.mood('minh', 'joy'); st.mood('lan', 'joy'); st.mood('tom', 'joy');
    st.pose('minh', 'clap'); st.act('minh', 'clap');
    await st.wait(1300);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
];

export default {
  id: 'en017', worldW: 1900, floor: FLOOR, viewTop: 40, camStart: 160, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  cast: [
    { id: 'lucky', kind: 'dog', x: 800, s: 0.9 },
    { id: 'minh', kind: 'kid', who: 'en_minh_pj', x: 330 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 440, s: 0.95 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 520, s: 1.08 },
    { id: 'hat', kind: 'thing', x: 630, s: 1.08, svg: `<g transform="translate(0 -101)">${HAT_ON}</g>`, box: [-30, -140, 60, 40] },
    { id: 'tom', kind: 'kid', who: 'e017_tom_red', x: 1510 },
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 1610, s: 0.95, face: -1 },
  ],
  init(st) {
    st.show('hat', false);
    st.dog('lucky', 'sit');
  },
};
