/**
 * Bài 16 "Our House": phố Hà Nội (nhà hàng xóm thấp) · nhà Minh cao 2 tầng màu vàng · vườn sau nhà có cây lớn.
 * Mặt tiền mờ đi để thấy bên trong (cắt ngang): tầng dưới phòng khách + bếp, tầng trên phòng bố mẹ, phòng Lan,
 * phòng Minh, phòng tắm (6 phòng). Minh đi từ phố vào phòng khách, sang bếp, ra vườn theo đúng thứ tự câu hỏi.
 * Cảnh thấy cả hai tầng nên viewTop = 0. Toạ độ: rộng 1800, cao 315, sàn tầng dưới y = 282, sàn tầng trên y = 146.
 */
import { KIT_CSS, L, sky, cloud, tree, grass, fence, flowerAt, label, bush, steam } from '../kit.js';

const FLOOR = 282;
const UP = 146; // sàn tầng trên
const X0 = 600, X1 = 1240; // tường nhà

// ── Nội thất ──────────────────────────────────────────────────────────────
const bed = (x, y, w, c) => `<rect x="${x}" y="${y - 40}" width="10" height="40" rx="3" fill="#A16207" stroke="${L}"/><rect x="${x}" y="${y - 22}" width="${w}" height="14" rx="3" fill="#fff" stroke="${L}"/>
  <rect x="${x}" y="${y - 10}" width="${w}" height="10" fill="#C2410C" stroke="${L}"/><rect x="${x + w - 8}" y="${y - 30}" width="8" height="30" rx="3" fill="#A16207" stroke="${L}"/>
  <rect x="${x + 12}" y="${y - 30}" width="26" height="10" rx="5" fill="#fff" stroke="${L}"/><path d="M${x + 44} ${y - 22} Q${x + w * 0.6} ${y - 30} ${x + w - 10} ${y - 24} V${y - 14} H${x + 44}Z" fill="${c}" stroke="${L}"/>`;
const win = (x, y, w = 44, h = 40) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#BAE6FD" stroke="${L}" stroke-width="1.2"/><path d="M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}" stroke="#fff" stroke-width="2"/>`;
const badge = (n, x, y) => `<g class="e016-n e016-n${n}"><g transform="translate(${x} ${y})"><circle r="13" fill="#F97316" stroke="${L}" stroke-width="1.2"/><text y="5.5" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="16" fill="#fff">${n}</text></g></g>`;
const tag = (n, x, y, text, c, size = 16) => `<g class="e016-tag e016-t-${n}">${label(x, y, text, c, size)}</g>`;
const hl = (n, x, y, w, h) => `<rect class="e016-hl e016-h-${n}" x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#FDE047" stroke="#F59E0B" stroke-width="4"/>`;
const arrowV = (x, y1, y2, c) => `<path d="M${x} ${y1} V${y2}" stroke="${c}" stroke-width="5" stroke-linecap="round"/><path d="M${x - 10} ${y2 + (y2 > y1 ? -12 : 12)} L${x} ${y2} L${x + 10} ${y2 + (y2 > y1 ? -12 : 12)}" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const arrowH2 = (x1, x2, y, c = '#F97316') => `<path d="M${x1 + 6} ${y} H${x2 - 6}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><path d="M${x1 + 12} ${y - 7} L${x1} ${y} L${x1 + 12} ${y + 7} M${x2 - 12} ${y - 7} L${x2} ${y} L${x2 - 12} ${y + 7}" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const TAGS = ['hanoi', 'tall', 'yellow', 'six', 'qLiving', 'down', 'qKitchen', 'nextK', 'qBed', 'up', 'qBath', 'nextB', 'qKitty', 'onBed', 'qMum', 'inK', 'qLan', 'inG', 'qLucky', 'too', 'under', 'love'];
const HLS = ['living', 'kitchen', 'beds', 'bath', 'mybed', 'garden'];

function bg() {
  return `
  ${sky(0, 1800, 315, 'e016sky')}
  ${cloud(140, 50, 1, 0)}${cloud(420, 30, 0.8, 3)}${cloud(1420, 44, 1.1, 5)}${cloud(1700, 70, 0.8, 2)}
  <!-- Phố Hà Nội -->
  <rect x="0" y="${FLOOR - 4}" width="1800" height="${315 - FLOOR + 4}" fill="#E5E7EB" stroke="${L}"/>
  ${Array.from({ length: 30 }, (_, i) => `<path d="M${i * 60} ${FLOOR} V315" stroke="#CBD5E1"/>`).join('')}
  <!-- hồ và tháp nhỏ phía xa -->
  <path d="M190 236 Q300 226 410 236 V${FLOOR - 4} H190Z" fill="#7DD3FC" stroke="${L}"/>
  <g transform="translate(300 236)"><rect x="-12" y="-40" width="24" height="34" fill="#FDE68A" stroke="${L}"/><path d="M-18 -40 H18 L10 -52 H-10Z" fill="#B91C1C" stroke="${L}"/><rect x="-8" y="-62" width="16" height="12" fill="#FDE68A" stroke="${L}"/><path d="M-12 -62 H12 L0 -74Z" fill="#B91C1C" stroke="${L}"/><rect x="-4" y="-24" width="8" height="18" rx="4" fill="#92400E"/></g>
  <!-- nhà hàng xóm (thấp) -->
  <g transform="translate(100 0)"><path d="M-80 176 L0 132 L80 176Z" fill="#2563EB" stroke="${L}"/><rect x="-70" y="176" width="140" height="${FLOOR - 176}" fill="#BBF7D0" stroke="${L}"/>${win(-56, 196)}<rect x="12" y="206" width="38" height="${FLOOR - 206}" fill="#A16207" stroke="${L}"/></g>
  <g transform="translate(500 0)"><path d="M-74 190 L0 150 L74 190Z" fill="#7C3AED" stroke="${L}"/><rect x="-64" y="190" width="128" height="${FLOOR - 190}" fill="#FBCFE8" stroke="${L}"/>${win(-50, 206)}<rect x="12" y="214" width="34" height="${FLOOR - 214}" fill="#A16207" stroke="${L}"/></g>
  <g class="e016-sign"><g transform="translate(250 0)"><rect x="-3" y="150" width="6" height="${FLOOR - 150}" fill="#475569"/><rect x="-46" y="130" width="92" height="28" rx="6" fill="#15803D" stroke="${L}" stroke-width="1.2"/>
    <text y="150" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="16" fill="#fff">HA NOI</text></g></g>
  <!-- Nhà Minh: bên trong (cắt ngang) -->
  <path d="M${X0 - 14} 44 L${X0 + 70} 4 H${X1 - 70} L${X1 + 14} 44Z" fill="#DC2626" stroke="${L}" stroke-width="1.4"/>
  ${hl('beds', X0, 40, 520, UP - 40)}${hl('bath', 1120, 40, 120, UP - 40)}${hl('mybed', 920, 40, 200, UP - 40)}
  ${hl('living', X0, 156, 300, FLOOR - 156)}${hl('kitchen', 900, 156, 340, FLOOR - 156)}
  <g class="e016-in">
    <rect x="${X0}" y="40" width="160" height="${UP - 40}" fill="#E0E7FF"/>
    <rect x="760" y="40" width="160" height="${UP - 40}" fill="#FCE7F3"/>
    <rect x="920" y="40" width="200" height="${UP - 40}" fill="#DBEAFE"/>
    <rect x="1120" y="40" width="120" height="${UP - 40}" fill="#E0F2FE"/>${Array.from({ length: 4 }, (_, i) => `<path d="M1120 ${58 + i * 22} H1240" stroke="#BAE6FD"/>`).join('')}
    <rect x="${X0}" y="156" width="300" height="${FLOOR - 156}" fill="#FEF3C7"/>
    <rect x="900" y="156" width="340" height="${FLOOR - 156}" fill="#DCFCE7"/>
    <!-- phòng bố mẹ -->
    ${bed(612, UP, 130, '#A78BFA')}${win(690, 56)}
    <!-- phòng Lan -->
    ${win(780, 56)}<rect x="852" y="100" width="56" height="8" fill="#A16207" stroke="${L}"/><rect x="858" y="108" width="6" height="38" fill="#A16207"/><rect x="896" y="108" width="6" height="38" fill="#A16207"/>
    <g transform="translate(880 96)"><rect x="-10" y="-10" width="20" height="10" fill="#F472B6" stroke="${L}" stroke-width="0.7"/></g>
    <rect x="776" y="112" width="32" height="34" rx="3" fill="#F9A8D4" stroke="${L}"/>
    <!-- phòng Minh -->
    ${win(1060, 54)}<rect x="940" y="56" width="36" height="46" rx="2" fill="#fff" stroke="${L}"/><circle cx="958" cy="76" r="9" fill="#fff" stroke="${L}"/><path d="M958 70 l4 3 -1.6 4.4 h-4.8 l-1.6 -4.4Z" fill="#1F2937"/>
    ${bed(960, UP, 140, '#93C5FD')}
    <g class="e016-bump"><ellipse cx="1050" cy="${UP - 26}" rx="14" ry="8" fill="#93C5FD" stroke="${L}"/></g>
    <!-- phòng tắm -->
    <path d="M1130 ${UP - 30} H1200 Q1198 ${UP - 2} 1180 ${UP} H1150 Q1132 ${UP - 2} 1130 ${UP - 30}Z" fill="#fff" stroke="${L}"/><rect x="1126" y="${UP - 34}" width="78" height="6" rx="3" fill="#93C5FD" stroke="${L}"/>
    <ellipse cx="1222" cy="78" rx="12" ry="16" fill="#E0F2FE" stroke="#A16207" stroke-width="3"/><path d="M1210 108 H1236 Q1234 120 1223 120 Q1212 120 1210 108Z" fill="#fff" stroke="${L}"/><rect x="1219" y="120" width="8" height="26" fill="#fff" stroke="${L}"/>
    <!-- phòng khách -->
    <path d="M610 ${FLOOR} ${Array.from({ length: 7 }, (_, i) => `V${FLOOR - (i + 1) * 18} H${626 + i * 14}`).join(' ')} V156" fill="#D97706" stroke="${L}"/>
    <rect x="760" y="172" width="70" height="44" rx="3" fill="#1F2937" stroke="${L}"/><rect x="765" y="177" width="60" height="34" fill="#38BDF8"/><rect x="788" y="216" width="14" height="8" fill="#475569"/>
    <rect x="740" y="224" width="110" height="10" fill="#A16207" stroke="${L}"/>
    <path d="M708 ${FLOOR} V246 Q708 236 720 236 H860 Q872 236 872 246 V${FLOOR}" fill="#F97316" stroke="${L}"/><rect x="714" y="252" width="152" height="18" rx="6" fill="#FB923C" stroke="${L}"/>
    <!-- bếp -->
    <rect x="930" y="170" width="120" height="30" rx="5" fill="#E5E7EB" stroke="${L}"/>
    <rect x="1180" y="168" width="48" height="${FLOOR - 168}" rx="4" fill="#F8FAFC" stroke="${L}"/><path d="M1180 210 H1228" stroke="${L}"/><rect x="1186" y="186" width="4" height="16" rx="2" fill="#94A3B8"/>
    ${win(1080, 176)}
  </g>
  <g class="e016-wood"><rect x="${X0 - 8}" y="${FLOOR}" width="${X1 - X0 + 16}" height="${315 - FLOOR}" fill="#D9A066" stroke="${L}"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${X0 + i * 60} ${FLOOR} V315" stroke="#B9824F" stroke-width="1.2"/>`).join('')}</g>
  <!-- sàn tầng trên, vách giữa các phòng -->
  <rect x="${X0}" y="${UP}" width="${X1 - X0}" height="10" fill="#B45309" stroke="${L}"/>
  ${[760, 920, 1120].map((x) => `<rect x="${x - 3}" y="40" width="6" height="${UP - 40}" fill="#E9D5B5" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="897" y="156" width="6" height="60" fill="#E9D5B5" stroke="${L}" stroke-width="0.8"/>
  <rect x="${X0 - 8}" y="40" width="8" height="${FLOOR - 40}" fill="#FACC15" stroke="${L}"/><rect x="${X1}" y="40" width="8" height="${FLOOR - 40}" fill="#FACC15" stroke="${L}"/>
  <rect x="${X0}" y="36" width="${X1 - X0}" height="6" fill="#FACC15" stroke="${L}"/>
  <!-- Mặt tiền (mờ đi khi mở) -->
  <g class="e016-face">
    <rect x="${X0}" y="40" width="${X1 - X0}" height="${FLOOR - 40}" fill="#FDE047" stroke="${L}" stroke-width="1.4"/>
    <rect x="${X0}" y="${UP}" width="${X1 - X0}" height="10" fill="#EAB308" stroke="${L}"/>
    ${[650, 800, 960, 1120].map((x) => `${win(x, 66, 62, 56)}<rect x="${x - 4}" y="${66 + 56}" width="70" height="6" fill="#fff" stroke="${L}" stroke-width="0.8"/>`).join('')}
    ${[800, 960, 1120].map((x) => win(x, 186, 62, 56)).join('')}
    <rect x="640" y="186" width="70" height="${FLOOR - 186}" rx="4" fill="#B45309" stroke="${L}"/><circle cx="698" cy="238" r="3.4" fill="#FDE68A" stroke="${L}"/>
    <rect x="700" y="170" width="90" height="10" fill="#22C55E" stroke="${L}"/>
  </g>
  ${[1, 2, 3, 4, 5, 6].map((n, i) => badge(n, [680, 840, 1020, 1180, 780, 1070][i], [60, 60, 60, 60, 176, 176][i])).join('')}
  <!-- Vườn -->
  ${grass(X1 + 8, 1800 - X1 - 8, FLOOR, '#86EFAC')}
  ${fence(1300, 480, FLOOR)}
  ${tree(1620, FLOOR - 6, 1.55)}
  <g class="e016-bloom">${[1440, 1468, 1496, 1524].map((x, i) => flowerAt(x, FLOOR - 2, ['#F472B6', '#FACC15', '#F87171', '#A78BFA'][i])).join('')}</g>
  <!-- nhãn chữ -->
  ${tag('hanoi', 250, 112, 'Ha Noi', '#15803D', 18)}
  <g class="e016-tag e016-t-tall">${arrowV(X1 + 30, 140, 8, '#DC2626')}${arrowV(X1 + 30, 150, 278, '#DC2626')}${label(X1 + 30, 152, 'tall', '#DC2626', 20)}</g>
  ${tag('yellow', 920, 160, 'yellow', '#CA8A04', 22)}
  ${tag('six', 920, 128, 'six rooms', '#EA580C', 20)}
  ${tag('qLiving', 750, 300, 'the living room?', '#7C3AED', 15)}
  <g class="e016-tag e016-t-down">${arrowV(660, 170, 250, '#2563EB')}${label(760, 300, 'downstairs', '#2563EB', 18)}</g>
  ${tag('qKitchen', 1070, 300, 'the kitchen?', '#7C3AED', 15)}
  <g class="e016-tag e016-t-nextK">${arrowH2(760, 1050, 300)}${label(905, 300, 'next to', '#C2410C', 15)}</g>
  ${tag('qBed', 920, 128, 'the bedrooms?', '#7C3AED', 15)}
  <g class="e016-tag e016-t-up">${arrowV(840, 250, 170, '#16A34A')}${label(920, 128, 'upstairs', '#16A34A', 18)}</g>
  ${tag('qBath', 1180, 30, 'the bathroom?', '#7C3AED', 14)}
  <g class="e016-tag e016-t-nextB">${arrowH2(1060, 1200, 96)}${label(1020, 30, 'my bedroom', '#2563EB', 14)}</g>
  ${tag('qKitty', 1020, 30, 'Kitty?', '#7C3AED', 16)}
  ${tag('onBed', 1030, 30, 'on my bed', '#DB2777', 16)}
  ${tag('qMum', 1070, 300, 'Mum and Dad?', '#7C3AED', 15)}
  ${tag('inK', 1070, 300, 'in the kitchen', '#16A34A', 15)}
  ${tag('qLan', 1400, 140, 'Lan?', '#7C3AED', 18)}
  ${tag('inG', 1440, 140, 'in the garden', '#16A34A', 17)}
  ${tag('qLucky', 1560, 120, 'Lucky?', '#7C3AED', 18)}
  ${tag('too', 1560, 120, 'in the garden, too', '#16A34A', 15)}
  <g class="e016-tag e016-t-under">${arrowV(1660, 196, 240, '#EA580C')}${label(1660, 186, 'under the tree', '#EA580C', 15)}</g>
  ${tag('love', 1460, 56, 'I love our house!', '#DB2777', 18)}`;
}

/** Lớp trước: bàn bếp + nồi (che chân), bụi hoa trước nhà. */
function fg() {
  return `
  <g class="e016-fgin"><rect x="930" y="216" width="120" height="66" fill="#16A34A" stroke="${L}"/><rect x="926" y="210" width="128" height="8" rx="3" fill="#F5F5F4" stroke="${L}"/>
    <g transform="translate(990 200)"><path d="M-16 -6 H16 V8 Q16 12 12 12 H-12 Q-16 12 -16 8Z" fill="#94A3B8" stroke="${L}"/><ellipse cy="-6" rx="16" ry="3.4" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/></g>
    ${steam(990, 190, 'e016-steam')}
    <rect x="1092" y="234" width="80" height="8" rx="3" fill="#B45309" stroke="${L}"/><rect x="1098" y="242" width="8" height="40" fill="#92400E"/><rect x="1158" y="242" width="8" height="40" fill="#92400E"/></g>
  ${bush(560, FLOOR + 26, 0.9, '#22C55E')}${bush(1290, FLOOR + 30, 0.9, '#16A34A')}`;
}

const CSS = `
.e016-face { transition: opacity 1s; } .st-open .e016-face { opacity: 0; }
.e016-fgin, .e016-wood { transition: opacity 1s; } svg:not(.st-open) .e016-fgin, svg:not(.st-open) .e016-wood { opacity: 0; }
.e016-tag { opacity: 0; transform: scale(.6); transition: opacity .35s, transform .35s cubic-bezier(.3,1.6,.6,1); transform-box: fill-box; transform-origin: center; }
${TAGS.map((n) => `.st-${n} .e016-t-${n}`).join(', ')} { opacity: 1; transform: none; }
.e016-hl { opacity: 0; transition: opacity .3s; }
${HLS.map((n) => `.st-h-${n} .e016-h-${n}`).join(', ')} { animation: e016Glow .7s ease-in-out infinite alternate; }
@keyframes e016Glow { from { opacity: .15; } to { opacity: .5; } }
.e016-n { opacity: 0; transform: scale(.4); transition: opacity .3s, transform .3s cubic-bezier(.3,1.6,.6,1); transform-box: fill-box; transform-origin: center; }
${[1, 2, 3, 4, 5, 6].map((n) => `.st-n${n} .e016-n${n}`).join(', ')} { opacity: 1; transform: none; }
.e016-sign { transform-box: fill-box; transform-origin: 50% 100%; } .st-hanoi .e016-sign { animation: e016Pop .45s ease-in-out 2 alternate; }
@keyframes e016Pop { to { transform: scale(1.12); } }
.e016-bump { animation: e016Bump 1.2s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes e016Bump { 50% { transform: scale(1.15, .85); } }
.st-kitty .e016-bump { opacity: 0; animation: none; }
.e016-steam { opacity: 0; transition: opacity .4s; } .st-cook .e016-steam { opacity: 1; }
.e016-bloom { transform-box: fill-box; transform-origin: 50% 100%; transition: transform .8s cubic-bezier(.3,1.6,.6,1); } .st-bloom .e016-bloom { transform: scale(1.35); }
`;

const ask = async (st, n, ms = 1500) => { st.set(`st-${n}`); await st.wait(ms); st.set(`st-${n}`, false); };

const BEATS = [
  { key: ['Our house is in Ha Noi'], icon: '🏙️', label: 'Ha Noi', async play(st) {
    st.look(470);
    st.set('st-hanoi');
    st.pose('minh', 'wave'); st.act('minh', 'wave'); st.mood('minh', 'joy');
    await st.wait(1900);
    st.act('minh', null); st.pose('minh', 'stand'); st.mood('minh', 'happy');
    st.set('st-hanoi', false);
  } },
  { key: ['tall and yellow'], icon: '🏠', label: 'tall and yellow', async play(st) {
    await st.look(Math.max(950, X1 + 90 - st.VW / 2), { dur: 1100 }); // khung hẹp: lệch phải để thấy mũi tên "tall"
    st.set('st-tall');
    st.fx('sparkle', X1 + 30, 30);
    await st.wait(700);
    st.set('st-yellow'); st.fx('sparkle', 920, 200, { quiet: true });
    await st.wait(1000);
    st.set('st-tall', false); st.set('st-yellow', false);
  } },
  { key: ['six rooms'], icon: '6️⃣', label: 'six rooms', async play(st) {
    st.set('st-open'); st.sfx('door-open');
    st.show('mum', true); st.show('dad', true); st.show('kitty', false);
    const narrow = st.VW < X1 - X0 + 40; // khung hẹp (điện thoại dọc): lia từ trái sang phải trong lúc đếm
    if (narrow) st.look(X0 + st.VW / 2 - 20, { dur: 700 });
    await st.wait(700);
    if (narrow) st.look(X1 - st.VW / 2 + 20, { dur: 1500 });
    for (let n = 1; n <= 6; n++) { st.set(`st-n${n}`); st.sfx('page-turn', { vol: 0.4 }); await st.wait(260); }
    st.set('st-six');
    await st.wait(900);
    st.set('st-six', false);
  } },
  { key: ['Where is the living room'], icon: '🛋️', label: 'living room', async play(st) {
    st.set('st-qLiving');
    await st.walk('minh', 760, { speed: 130, lead: 140 });
    st.set('st-h-living');
    st.pose('minh', 'think');
    await st.wait(500);
    st.set('st-qLiving', false);
  } },
  { key: ['It is downstairs'], icon: '⬇️', label: 'downstairs', async play(st) {
    st.set('st-down');
    st.pose('minh', 'sit'); st.mood('minh', 'joy');
    await st.wait(1600);
    st.set('st-down', false); st.set('st-h-living', false); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['Where is the kitchen'], icon: '🍳', label: 'kitchen', async play(st) {
    st.set('st-h-kitchen');
    st.pose('minh', 'point'); st.act('minh', 'point');
    await ask(st, 'qKitchen', 1500);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['next to the living room'], icon: '↔️', label: 'next to', async play(st) {
    st.set('st-h-living');
    st.set('st-nextK');
    await st.walk('minh', 870, { speed: 110, follow: false });
    await st.wait(900);
    st.set('st-nextK', false); st.set('st-h-living', false); st.set('st-h-kitchen', false);
  } },
  { key: ['Where are the bedrooms'], icon: '🛏️', label: 'bedrooms', async play(st) {
    st.set('st-h-beds');
    st.pose('minh', 'pointUp'); st.act('minh', 'point');
    await ask(st, 'qBed', 1700);
    st.act('minh', null);
  } },
  { key: ['They are upstairs'], icon: '⬆️', label: 'upstairs', async play(st) {
    st.set('st-up');
    st.mood('minh', 'joy');
    await st.wait(1600);
    st.set('st-up', false); st.set('st-h-beds', false); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['Where is the bathroom'], icon: '🛁', label: 'bathroom', async play(st) {
    await st.look(1000, { dur: 600 });
    st.set('st-h-bath'); st.sfx('tap-water', { vol: 0.5 });
    await ask(st, 'qBath', 1500);
  } },
  { key: ['next to my bedroom'], icon: '🚿', label: 'next to my bedroom', async play(st) {
    st.set('st-h-mybed'); st.set('st-nextB');
    await st.wait(2000);
    st.set('st-nextB', false); st.set('st-h-mybed', false); st.set('st-h-bath', false);
  } },
  { key: ['Where is Kitty'], icon: '🐱', label: 'Kitty?', async play(st) {
    st.pose('minh', 'think');
    await ask(st, 'qKitty', 1600);
  } },
  { key: ['She is on my bed'], icon: '🛏️', label: 'on my bed', async play(st) {
    st.set('st-kitty'); st.show('kitty', true); st.fx('poof', 1050, UP - 24, { quiet: true });
    st.dog('kitty', 'stand'); st.act('kitty', 'jump'); st.mood('kitty', 'joy');
    st.set('st-onBed'); st.mood('minh', 'joy'); st.pose('minh', 'pointUp');
    await st.wait(1200);
    st.act('kitty', 'wag'); st.dog('kitty', 'sit');
    await st.wait(600);
    st.set('st-onBed', false); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['Where are Mum and Dad'], icon: '👨‍👩', label: 'Mum and Dad?', async play(st) {
    await st.look(1060, { dur: 600 });
    await ask(st, 'qMum', 1600);
  } },
  { key: ['in the kitchen'], icon: '🍲', label: 'in the kitchen', async play(st) {
    st.set('st-cook'); st.set('st-inK'); st.sfx('pot-stir');
    st.pose('mum', 'stir'); st.act('mum', 'stir');
    st.pose('dad', 'wave'); st.act('dad', 'wave'); st.mood('dad', 'joy');
    await st.wait(1900);
    st.act('mum', null); st.act('dad', null); st.pose('mum', 'stand'); st.pose('dad', 'stand'); st.mood('dad', 'happy');
    st.set('st-inK', false);
  } },
  { key: ['Where is Lan'], icon: '👧', label: 'Lan?', async play(st) {
    await st.walk('minh', 1300, { speed: 200, lead: 80 });
    st.pose('minh', 'think');
    await ask(st, 'qLan', 600);
  } },
  { key: ['She is in the garden'], icon: '🌷', label: 'in the garden', async play(st) {
    st.set('st-inG');
    st.pose('lan', 'e016_water');
    st.fx('drops', 1500, 248); st.sfx('tap-water', { vol: 0.5 });
    await st.wait(700);
    st.set('st-bloom'); st.fx('sparkle', 1480, 262);
    await st.wait(1200);
    st.pose('lan', 'stand'); st.set('st-inG', false);
  } },
  { key: ['Where is Lucky'], icon: '🐶', label: 'Lucky?', async play(st) {
    await st.look(1540, { dur: 700 });
    st.pose('minh', 'think');
    await ask(st, 'qLucky', 1200);
  } },
  { key: ['in the garden, too'], icon: '🌳', label: 'garden, too', async play(st) {
    st.set('st-too');
    st.dog('lucky', 'stand'); st.act('lucky', 'jump'); st.mood('lucky', 'joy');
    st.sfx('dog-bark');
    await st.wait(1600);
    st.act('lucky', null); st.dog('lucky', 'sit'); st.set('st-too', false);
  } },
  { key: ['under the tree'], icon: '🐕', label: 'under the tree', async play(st) {
    st.set('st-under');
    st.act('lucky', 'wag');
    await st.wait(1900);
    st.set('st-under', false);
  } },
  { key: ['I love our house'], icon: '❤️', label: 'love our house', async play(st) {
    st.look(1460, { dur: 900 });
    st.set('st-love');
    st.pose('minh', 'cheer'); st.act('minh', 'cheer'); st.mood('minh', 'joy');
    st.pose('lan', 'cheer'); st.act('lan', 'jump'); st.mood('lan', 'joy');
    st.act('lucky', 'wag');
    st.fx('hearts', 1100, 120);
    await st.wait(800);
    st.fx('hearts', 1300, 160);
    await st.wait(1300);
    st.act('minh', null); st.act('lan', null);
  } },
];

export default {
  id: 'en016', worldW: 1800, floor: FLOOR, viewTop: 0, camStart: 190, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: { e016_water: { R: [60, 80], L: [10, 4], head: 8 } },
  cast: [
    { id: 'kitty', kind: 'cat', x: 1050, y: UP - 20, s: 0.8 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 990, s: 0.74 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 1150, s: 0.76 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 1440, s: 0.92 },
    { id: 'lucky', kind: 'dog', x: 1630, s: 0.85 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 470, s: 0.85 },
  ],
  init(st) {
    st.show('kitty', false); st.show('mum', false); st.show('dad', false);
    st.dog('kitty', 'sit');
    st.dog('lucky', 'sit');
    st.hold('lan', 'watering');
  },
};
