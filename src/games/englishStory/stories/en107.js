/**
 * Bài 107 "Bip Misses Home" (hiện tại hoàn thành: has lived for, has learned since, has made, have never been,
 * Have you ever made…?, has brought, has sent). Một thế giới đi từ trái sang phải: phòng khách nhà Minh (lịch treo tường,
 * cửa sổ, sofa) → bàn làm đèn ông sao → cửa ra ngõ → ngõ phố đêm Trung thu (nhà treo đèn lồng, trăng tròn).
 * Tối nay râu Bíp không sáng (bipSet bip-sad), Bíp nhớ Lumo (bong bóng nghĩ: hai mặt trời, biển tím). Lan rủ làm đèn ông sao;
 * đêm hội các bạn rước đèn, Bíp ngước nhìn trăng, râu sáng lại.
 * Toạ độ cảnh: rộng 2700, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, room, windowBox, rug, table, thought, label, speaker, tree, bush, STAR } from '../kit.js';
import { BIP_SVG, BIP_BOX, BIP_CSS, bipSet } from '../bip.js';

const FLOOR = 282;
const W = 2700;
const X = { cal: 110, win: 300, sofa: 560, tbl: 900, door: 1240, moon: 2240 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

// ── Đồ vật ────────────────────────────────────────────────────────────────
/** Đèn ông sao đỏ (gốc ở tâm). */
const STARLAN = (s = 1, glow = true) => `<g transform="scale(${s})">${glow ? '<circle class="e107-lglow" r="22" fill="#FDE68A" opacity="0.45"/>' : ''}
  <path d="M0 -16 L4.7 -5 L16 -5 L7 2.4 L10.4 14 L0 7 L-10.4 14 L-7 2.4 L-16 -5 L-4.7 -5Z" fill="#EF4444" stroke="#A16207" stroke-width="1.4" stroke-linejoin="round"/>
  <path d="M0 -16 L0 7 M-16 -5 L7 2.4 M16 -5 L-7 2.4" stroke="#FCA5A5" stroke-width="0.8" opacity="0.8"/>
  <path d="M-3 14 L0 22 L3 14" stroke="#FACC15" stroke-width="1.4" fill="none"/></g>`;
/** Đèn cầm tay: que tre chĩa lên theo cẳng tay (tư thế e107_lift: cẳng tay 165°), đèn treo thẳng xuống ở đầu que. */
const LAN_PROP = `<path d="M0 0 V46" stroke="${L}" stroke-width="3" stroke-linecap="round"/><path d="M0 0 V46" stroke="#D6A35C" stroke-width="1.8" stroke-linecap="round"/>
  <g transform="translate(0 46) rotate(165)"><path d="M0 0 V6" stroke="${L}" stroke-width="0.9"/><g class="e107-swing"><g transform="translate(0 20)">${STARLAN(0.95)}</g></g></g>`;
/** Đèn của Bíp (một vật riêng đi cạnh Bíp, gốc ở chân Bíp): que từ tay phải chĩa lên, đèn treo ở đầu que. */
const BIP_LAN = `<path d="M15 -27 L40 -84" stroke="${L}" stroke-width="3" stroke-linecap="round"/><path d="M15 -27 L40 -84" stroke="#D6A35C" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M40 -84 V-74" stroke="${L}" stroke-width="0.9"/><g class="e107-swing" style="transform-origin:40px -84px"><g transform="translate(40 -52)">${STARLAN(0.95)}</g></g>`;
const CANDLES = `<g transform="translate(0 -4)"><rect x="-13" y="-6" width="26" height="14" rx="2" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/>
  ${[-8, -2, 4, 10].map((x) => `<rect x="${x - 2}" y="-18" width="4" height="12" fill="#fff" stroke="${L}" stroke-width="0.6"/>`).join('')}</g>`;
const MOONCAKES = `<g transform="translate(0 -6)"><rect x="-18" y="-12" width="36" height="22" rx="3" fill="#DC2626" stroke="${L}" stroke-width="1"/>
  <rect x="-18" y="-12" width="36" height="5" fill="#FACC15" stroke="${L}" stroke-width="0.7"/><circle cx="0" cy="2" r="6" fill="#F59E0B" stroke="#92400E" stroke-width="0.9"/><circle cx="0" cy="2" r="2.6" fill="none" stroke="#92400E" stroke-width="0.7"/></g>`;
const CAKE = `<circle r="7" fill="#F59E0B" stroke="#92400E" stroke-width="1"/><circle r="3.2" fill="none" stroke="#92400E" stroke-width="0.8"/>`;

const POSES = {
  e107_lift: { R: [140, 165], L: [10, 4] },
  e107_make: { R: [40, -60], L: [40, -70], head: 8 },
  e107_up: { R: [10, 4], L: [10, 4], head: -10 },
};
const PROPS = { e107_lan: LAN_PROP };

// ── Cảnh ──────────────────────────────────────────────────────────────────
/** Lịch treo tường (tâm x): tờ trên lật đi (st-cal1, st-cal2), tờ cuối có ngày rằm khoanh trăng. */
const calendar = (x) => {
  const page = (cls, title, extra = '') => `<g class="${cls}"><rect x="-38" y="64" width="76" height="88" rx="3" fill="#fff" stroke="${L}" stroke-width="1.1"/>
    <rect x="-38" y="64" width="76" height="20" rx="3" fill="#DC2626" stroke="${L}" stroke-width="1"/><text y="79" text-anchor="middle" ${NUN} font-size="12" fill="#fff">${title}</text>${extra}</g>`;
  const plain = Array.from({ length: 4 }, (_, r) => Array.from({ length: 7 }, (_, c) => `<rect x="${-32 + c * 9.2}" y="${90 + r * 14}" width="7" height="10" rx="1" fill="#E2E8F0"/>`).join('')).join('');
  const arrived = `<circle cx="${-32 + 2 * 9.2 + 3.5}" cy="${90 + 1 * 14 + 5}" r="5" fill="#86E05A" stroke="${L}" stroke-width="0.7"/>`;
  const grid = `${Array.from({ length: 4 }, (_, r) => Array.from({ length: 7 }, (_, c) => `<rect x="${-32 + c * 9.2}" y="${90 + r * 14}" width="7" height="10" rx="1" fill="${r === 2 && c === 4 ? '#FDE68A' : '#E2E8F0'}"/>`).join('')).join('')}
    <g class="e107-fest"><circle cx="${-32 + 4 * 9.2 + 3.5}" cy="${90 + 2 * 14 + 5}" r="9" fill="none" stroke="#DC2626" stroke-width="2"/><circle cx="${-32 + 4 * 9.2 + 3.5}" cy="${90 + 2 * 14 + 5}" r="3.6" fill="#FACC15"/></g>
    <path class="e107-today" d="M${-32 + 4 * 9.2 + 3.5 - 4} ${90 + 1 * 14 + 2} l6 6 m0 -6 l-6 6" stroke="#16A34A" stroke-width="1.6"/>`;
  return `<g transform="translate(${x} 0)"><circle cy="58" r="3" fill="${L}"/>
    ${page('e107-pg3', 'SEPTEMBER', grid)}${page('e107-pg2', 'AUGUST', plain)}${page('e107-pg1', 'JULY', plain + arrived)}</g>`;
};
const sofa = (x) => `<g transform="translate(${x} ${FLOOR})"><rect x="-70" y="-62" width="140" height="34" rx="12" fill="#60A5FA" stroke="${L}" stroke-width="1.2"/>
  <rect x="-80" y="-40" width="160" height="30" rx="10" fill="#3B82F6" stroke="${L}" stroke-width="1.2"/><rect x="-86" y="-50" width="18" height="40" rx="8" fill="#60A5FA" stroke="${L}"/><rect x="68" y="-50" width="18" height="40" rx="8" fill="#60A5FA" stroke="${L}"/>
  <rect x="-70" y="-10" width="8" height="10" fill="#78350F"/><rect x="62" y="-10" width="8" height="10" fill="#78350F"/></g>`;
/** Nhà phố đêm (gốc giữa chân tường) với một dây đèn lồng. */
const nightHouse = (x, w, h, c, roof) => `<g transform="translate(${x} ${FLOOR})"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${c}" stroke="${L}" stroke-width="1"/>
  <path d="M${-w / 2 - 6} ${-h} L${-w / 2 + 8} ${-h - 20} H${w / 2 - 8} L${w / 2 + 6} ${-h}Z" fill="${roof}" stroke="${L}" stroke-width="1"/>
  ${Array.from({ length: Math.max(1, Math.floor(h / 60)) }, (_, i) => `<rect x="-11" y="${-h + 16 + i * 56}" width="22" height="26" rx="2" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="-14" y="-46" width="28" height="46" fill="#7C2D12" stroke="${L}" stroke-width="0.8"/></g>`;
const lanternString = (x0, x1, y) => {
  const n = Math.floor((x1 - x0) / 40);
  return `<path d="M${x0} ${y} Q${(x0 + x1) / 2} ${y + 22} ${x1} ${y}" stroke="#57534E" stroke-width="1" fill="none"/>
  ${Array.from({ length: n }, (_, i) => { const t = (i + 0.5) / n, xx = x0 + (x1 - x0) * t, yy = y + 22 * 2 * t * (1 - t) * 1.0 + 4; const c = ['#EF4444', '#FACC15', '#F97316', '#EC4899'][i % 4];
    return `<g transform="translate(${xx.toFixed(1)} ${yy.toFixed(1)})"><g class="e107-hang" style="animation-delay:${(i % 5) * -0.3}s"><path d="M0 0 V4" stroke="#57534E" stroke-width="0.8"/><circle cy="10" r="11" fill="${c}" opacity="0.3"/><ellipse cy="10" rx="7" ry="6" fill="${c}" stroke="${L}" stroke-width="0.7"/><path d="M-4 16 H4" stroke="#A16207" stroke-width="1.6"/></g></g>`; }).join('')}`;
};

function bg() {
  return `
  <defs><linearGradient id="e107night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E1B4B"/><stop offset="1" stop-color="#4338CA"/></linearGradient>
    <radialGradient id="e107moonglow"><stop offset="0" stop-color="#FEF9C3" stop-opacity="0.8"/><stop offset="1" stop-color="#FEF9C3" stop-opacity="0"/></radialGradient></defs>
  <!-- phòng khách -->
  ${room(0, X.door, FLOOR, '#FEF3C7')}
  ${calendar(X.cal)}
  <g class="e107-win">${windowBox(X.win - 55, 62, 110, 92)}</g>
  <g class="e107-winN"><rect x="${X.win - 55}" y="62" width="110" height="92" fill="#1E1B4B"/>
    ${[[-30, 80], [10, 74], [36, 96], [-12, 104], [22, 120]].map(([dx, y]) => `<circle cx="${X.win + dx}" cy="${y}" r="1.6" fill="#FDE68A"/>`).join('')}
    <path d="M${X.win - 55} 136 Q${X.win} 124 ${X.win + 55} 138 V154 H${X.win - 55}Z" fill="#1E293B"/>
    <path d="M${X.win} 62 V154 M${X.win - 55} 108 H${X.win + 55}" stroke="#fff" stroke-width="3" opacity="0.6"/></g>
  ${sofa(X.sofa)}
  ${rug(420, FLOOR, 220, '#FDBA74')}
  <!-- đèn cây -->
  <g transform="translate(700 0)"><path d="M0 ${FLOOR} V120" stroke="#57534E" stroke-width="3"/><ellipse cx="0" cy="${FLOOR}" rx="14" ry="4" fill="#57534E"/>
    <circle class="e107-lamp" cx="0" cy="116" r="48" fill="#FEF08A"/><path d="M-18 120 L-12 96 H12 L18 120Z" fill="#FDE68A" stroke="${L}" stroke-width="1"/></g>
  <!-- tranh trên tường bàn làm đèn -->
  <g transform="translate(${X.tbl} 0)"><rect x="-44" y="70" width="88" height="62" rx="3" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <rect x="-38" y="76" width="76" height="50" fill="#BAE6FD"/><circle cx="18" cy="92" r="9" fill="#FDE68A"/><path d="M-38 126 L-14 100 L4 118 L18 106 L38 126Z" fill="#4ADE80"/></g>
  <!-- cửa ra ngõ -->
  <rect x="${X.door - 30}" y="96" width="60" height="${FLOOR - 96}" fill="#1E1B4B" stroke="${L}" stroke-width="1.2"/>
  <g class="e107-doorleaf"><rect x="${X.door - 30}" y="96" width="60" height="${FLOOR - 96}" fill="#B45309" stroke="${L}" stroke-width="1.2"/><circle cx="${X.door + 20}" cy="${FLOOR - 90}" r="3" fill="#FDE68A"/></g>
  <!-- ngõ phố đêm Trung thu -->
  <rect x="${X.door + 30}" y="0" width="${W - X.door - 30}" height="${FLOOR}" fill="url(#e107night)"/>
  ${Array.from({ length: 22 }, (_, i) => `<path class="ek-twinkle" style="animation-delay:${(i % 5) * 0.35}s" d="M${X.door + 70 + i * 64} ${24 + (i * 41) % 80} l1.6 4 l4 1.6 l-4 1.6 l-1.6 4 l-1.6 -4 l-4 -1.6 l4 -1.6Z" fill="#FDE68A"/>`).join('')}
  ${nightHouse(1400, 110, 160, '#FCA5A5', '#9A3412')}${nightHouse(1530, 100, 200, '#FDE68A', '#B45309')}${nightHouse(1660, 120, 150, '#BBF7D0', '#92400E')}
  ${tree(1790, FLOOR, 0.9, '')}${nightHouse(1920, 110, 180, '#C4B5FD', '#7C2D12')}${nightHouse(2050, 100, 140, '#FECACA', '#9A3412')}
  ${tree(2190, FLOOR, 0.8, '')}${nightHouse(2360, 120, 170, '#FEF3C7', '#92400E')}${nightHouse(2490, 100, 130, '#A5F3FC', '#B45309')}${nightHouse(2620, 120, 190, '#FBCFE8', '#9A3412')}
  <rect x="${X.door + 30}" y="0" width="${W - X.door - 30}" height="${FLOOR}" fill="#1E1B4B" opacity="0.32"/>
  <circle class="e107-moonglow" cx="${X.moon}" cy="78" r="70" fill="url(#e107moonglow)"/>
  <circle cx="${X.moon}" cy="78" r="30" fill="#FEF9C3" stroke="#FDE68A" stroke-width="2"/><circle cx="${X.moon - 9}" cy="70" r="5" fill="#FDE68A" opacity="0.7"/><circle cx="${X.moon + 10}" cy="88" r="4" fill="#FDE68A" opacity="0.7"/>
  ${lanternString(1340, 1720, 118)}${lanternString(1860, 2120, 112)}${lanternString(2300, 2690, 118)}
  <rect x="${X.door + 30}" y="${FLOOR}" width="${W - X.door - 30}" height="${315 - FLOOR}" fill="#57534E" stroke="${L}"/>
  ${Array.from({ length: 24 }, (_, i) => `<path d="M${X.door + 50 + i * 60} ${FLOOR} V315" stroke="#44403C" stroke-width="1"/>`).join('')}`;
}

/** Hình Lumo trong bong bóng nghĩ (gốc tâm bong bóng): hai mặt trời, biển tím, nhà mái vòm. */
const LUMO = `<rect x="-66" y="-36" width="132" height="70" rx="10" fill="#FBCFE8"/>
  <circle cx="-34" cy="-14" r="11" fill="#FB923C"/><circle cx="-10" cy="-20" r="7" fill="#FACC15"/>
  <path d="M-66 12 Q-30 4 0 12 T66 10 V34 H-66Z" fill="#7C3AED"/><path d="M-56 22 q5 -3 10 0 M-20 24 q5 -3 10 0 M24 20 q5 -3 10 0" stroke="#DDD6FE" stroke-width="1.6" fill="none"/>
  <path d="M18 12 Q18 -8 36 -8 Q54 -8 54 12Z" fill="#A5F3FC" stroke="${L}" stroke-width="0.9"/><rect x="32" y="2" width="8" height="10" rx="3" fill="#7C3AED"/>
  <text y="-24" x="30" text-anchor="middle" ${NUN} font-size="12" fill="#7C3AED">Lumo</text>`;
const NOMOON = `<circle cx="-40" cy="-4" r="13" fill="#FB923C"/><circle cx="-14" cy="-10" r="9" fill="#FACC15"/>
  <text x="-28" y="26" text-anchor="middle" ${NUN} font-size="11" fill="#EA580C">two suns</text>
  <g transform="translate(36 -4)"><circle r="13" fill="#FEF9C3" stroke="#CA8A04" stroke-width="1.2"/><path d="M-15 -15 L15 15 M15 -15 L-15 15" stroke="#DC2626" stroke-width="3" stroke-linecap="round"/></g>
  <text x="36" y="26" text-anchor="middle" ${NUN} font-size="11" fill="#DC2626">no moon</text>`;
const word = (x, y, t, c) => `<g transform="translate(${x} ${y})"><rect x="${-t.length * 4.3 - 8}" y="-15" width="${t.length * 8.6 + 16}" height="22" rx="11" fill="#fff" stroke="${c}" stroke-width="1.6"/><text y="1" text-anchor="middle" ${NUN} font-size="13" fill="${c}">${t}</text></g>`;

function fg() {
  return `
  <!-- phòng tối dần khi đêm, đèn cây sáng -->
  <rect class="e107-dim" x="0" y="0" width="${X.door + 30}" height="315" fill="#1E1B4B"/>
  ${table(X.tbl, FLOOR - 56, 170, FLOOR, '#B45309')}
  <!-- đồ trên bàn: bó tre, giấy đỏ, đèn đang làm -->
  <g class="e107-mat"><g transform="translate(${X.tbl - 60} ${FLOOR - 58})">${[0, 1, 2, 3].map((i) => `<path d="M${-10 + i * 2} ${-2 - i * 1.6} L${18 + i * 2} ${-6 - i * 1.6}" stroke="#A16207" stroke-width="2.2" stroke-linecap="round"/>`).join('')}</g>
    <g transform="translate(${X.tbl + 56} ${FLOOR - 58})"><rect x="-16" y="-6" width="32" height="6" fill="#DC2626" stroke="${L}" stroke-width="0.7"/><rect x="-14" y="-10" width="30" height="4" fill="#EF4444" stroke="${L}" stroke-width="0.6"/></g></g>
  <g transform="translate(${X.tbl} ${FLOOR - 84})">
    <g class="e107-frame"><path class="e107-bam" d="M0 -26 L7.6 -8 L25 -8 L11 4 L17 22 L0 11 L-17 22 L-11 4 L-25 -8 L-7.6 -8Z" fill="none" stroke="#A16207" stroke-width="2.6" stroke-linejoin="round"/></g>
    <g class="e107-paper"><path d="M0 -26 L7.6 -8 L25 -8 L11 4 L17 22 L0 11 L-17 22 L-11 4 L-25 -8 L-7.6 -8Z" fill="#EF4444" stroke="#A16207" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="M0 -26 L0 11 M-25 -8 L11 4 M25 -8 L-11 4" stroke="#FCA5A5" stroke-width="1"/></g></g>
  <g class="e107-more">${[[-34, 0.6], [34, 0.6]].map(([dx, s]) => `<g transform="translate(${X.tbl + dx} ${FLOOR - 66})">${STARLAN(s, false)}</g>`).join('')}</g>
  <g class="e107-on e107-on-cand"><g transform="translate(${X.tbl - 34} ${FLOOR - 58})">${CANDLES}</g></g>
  <g class="e107-on e107-on-cake"><g transform="translate(${X.tbl + 30} ${FLOOR - 58})">${MOONCAKES}</g></g>
  ${bush(X.door + 90, FLOOR + 34, 0.6, '#166534')}${bush(2560, FLOOR + 34, 0.7, '#166534')}
  <!-- bong bóng nghĩ, bóng đèn ý tưởng, chữ -->
  ${thought(330, 106, 170, 100, LUMO, [400, 168], 'e107-th e107-th-lumo')}
  ${thought(X.moon - 220, 108, 170, 92, NOMOON, [X.moon - 140, 168], 'e107-th e107-th-moon')}
  <g class="e107-bulb"><g transform="translate(260 82)"><circle r="20" fill="#FEF08A" opacity="0.6"/><path d="M-9 2 Q-12 -14 0 -16 Q12 -14 9 2 L6 8 H-6Z" fill="#FDE047" stroke="${L}" stroke-width="1"/><rect x="-5" y="8" width="10" height="7" rx="2" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/></g></g>
  <g class="e107-w e107-w1">${word(410, 96, 'xin chào', '#16A34A')}</g>
  <g class="e107-w e107-w2">${word(500, 72, 'cảm ơn', '#2563EB')}</g>
  <g class="e107-w e107-w3">${word(560, 112, 'ngon quá', '#EA580C')}</g>
  <g class="e107-lb e107-lb-two">${label(X.cal + 6, 186, 'for two months', '#DC2626', 15)}</g>
  <g class="e107-lb e107-lb-friends">${label(500, 150, 'many friends', '#DB2777', 15)}</g>
  <g class="e107-lb e107-lb-tonight">${label(X.win + 110, 84, 'tonight', '#4338CA', 15)}</g>
  <g class="e107-lb e107-lb-never">${label(470, 70, 'never', '#7C3AED', 16)}</g>
  <g class="e107-lb e107-lb-fest">${label(X.cal + 92, 196, 'Mid-Autumn Festival', '#DC2626', 13)}</g>
  <g class="e107-lb e107-lb-next">${label(X.cal + 92, 224, 'next week', '#16A34A', 13)}</g>
  <g class="e107-lb e107-lb-ask"><g transform="translate(256 176)">${STARLAN(1.2, false)}</g></g>
  <g class="e107-lb e107-lb-asks">${speaker(200, 92, 'Lan', '#DB2777')}<g transform="translate(238 76)"><circle r="12" fill="#fff" stroke="#DB2777" stroke-width="1.6"/><text y="6" text-anchor="middle" ${NUN} font-size="17" fill="#DB2777">?</text></g></g>
  <g class="e107-lb e107-lb-says">${speaker(400, 152, 'Bip', '#7C3AED')}</g>
  <g class="e107-lb e107-lb-paper">${label(X.tbl + 70, 166, 'red paper', '#DC2626', 13)}</g>
  <g class="e107-lb e107-lb-bamboo">${label(X.tbl - 70, 166, 'bamboo', '#A16207', 13)}</g>
  <g class="e107-lb e107-lb-cand">${label(X.tbl - 10, 140, 'candles', '#CA8A04', 13)}</g>
  <g class="e107-lb e107-lb-cake">${label(X.tbl + 70, 112, 'mooncakes', '#DC2626', 13)}</g>
  <g class="e107-lb e107-lb-night">${label(1960, 64, 'the Mid-Autumn night', '#CA8A04', 15)}</g>
  <g class="e107-lb e107-lb-full">${label(X.moon - 70, 136, 'the full moon', '#CA8A04', 14)}</g>`;
}

const LB = ['two', 'friends', 'tonight', 'never', 'fest', 'next', 'ask', 'asks', 'says', 'paper', 'bamboo', 'cand', 'cake', 'night', 'full'];
const CSS = `
.e107-lb, .e107-w, .e107-bulb, .e107-on { opacity: 0; transition: opacity .3s; }
${LB.map((k) => `.st-lb-${k} .e107-lb-${k}`).join(', ')} { opacity: 1; }
.st-w1 .e107-w1, .st-w2 .e107-w2, .st-w3 .e107-w3, .st-bulb .e107-bulb, .st-cand .e107-on-cand, .st-cake .e107-on-cake { opacity: 1; }
.e107-w, .e107-bulb { transform-box: fill-box; transform-origin: 50% 100%; }
.st-w1 .e107-w1, .st-w2 .e107-w2, .st-w3 .e107-w3, .st-bulb .e107-bulb { animation: e107Pop .4s cubic-bezier(.3,1.6,.6,1); }
@keyframes e107Pop { from { transform: scale(.3); } }
/* Lịch lật tờ */
.e107-pg1, .e107-pg2 { transform-origin: 0 64px; transition: transform .45s ease-in, opacity .45s; }
.st-cal1 .e107-pg1, .st-cal2 .e107-pg2 { transform: scaleY(0); opacity: 0; }
.e107-fest { opacity: 0; transition: opacity .3s; } .st-fest .e107-fest { opacity: 1; animation: e107Blink .5s ease-in-out 3 alternate; }
@keyframes e107Blink { to { opacity: .3; } }
/* Đêm trong phòng */
.e107-winN { opacity: 0; transition: opacity 1s; } .st-night .e107-winN { opacity: 1; }
.e107-dim { opacity: 0; transition: opacity 1s; pointer-events: none; } .st-night .e107-dim { opacity: .14; }
.e107-lamp { opacity: 0; transition: opacity .6s; } .st-night .e107-lamp { opacity: .35; }
.e107-doorleaf { transition: opacity .3s; } .st-door .e107-doorleaf { opacity: 0; }
/* Bong bóng nghĩ */
.e107-th { opacity: 0; transition: opacity .35s; }
.st-th-lumo .e107-th-lumo, .st-th-moon .e107-th-moon { opacity: 1; }
/* Làm đèn: khung tre vẽ dần, giấy đỏ phủ lên */
.e107-bam { stroke-dasharray: 190; stroke-dashoffset: 190; }
.st-frame .e107-bam { stroke-dashoffset: 0; transition: stroke-dashoffset 1.4s linear; }
.e107-frame { opacity: 0; } .st-frame .e107-frame { opacity: 1; }
.e107-paper { opacity: 0; transform: scale(.4); transform-box: fill-box; transform-origin: 50% 50%; transition: opacity .3s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-paper .e107-paper { opacity: 1; transform: none; }
.e107-more { opacity: 0; transition: opacity .4s; } .st-more .e107-more { opacity: 1; }
.st-out .e107-frame, .st-out .e107-paper, .st-out .e107-more, .st-out .e107-mat { opacity: 0; }
/* Đèn đung đưa, đèn lồng treo, trăng sáng */
.e107-swing { transform-origin: 0 0; animation: e107Swing 1.3s ease-in-out infinite alternate; }
@keyframes e107Swing { from { transform: rotate(-7deg); } to { transform: rotate(7deg); } }
.e107-hang { transform-origin: 0 0; animation: e107Swing 2.2s ease-in-out infinite alternate; }
.e107-lglow { animation: e107Glow 1s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
@keyframes e107Glow { from { opacity: .25; transform: scale(.85); } to { opacity: .55; transform: scale(1.1); } }
.e107-moonglow { transform-box: fill-box; transform-origin: center; opacity: .6; }
.st-moon .e107-moonglow { animation: e107Moon 1.2s ease-in-out infinite alternate; }
@keyframes e107Moon { from { opacity: .6; transform: scale(.9); } to { opacity: 1; transform: scale(1.25); } }
/* Bíp lắc đầu, ngước nhìn trăng */
.act-e107no .bip-front .bip-head { animation: e107No .3s ease-in-out 4 alternate; }
@keyframes e107No { from { rotate: -14deg; } to { rotate: 14deg; } }
.act-e107up .bip-front .bip-head { rotate: -8deg; translate: 0 -3px; transition: rotate .5s, translate .5s; }
.act-e107up .bip-front .pp-face { translate: 0 -4px; }
@media (prefers-reduced-motion: reduce) {
  .e107-swing, .e107-hang { animation-duration: 3s; }
  .st-moon .e107-moonglow { animation-duration: 2.4s; }
  .act-e107no .bip-front .bip-head { animation-duration: .6s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const KIDS = ['minh', 'lan'];
const LANT = ['minh', 'lan', 'tom'];

const BEATS = [
  { key: ['has lived with Minh\'s family', 'for two months'], icon: '🏠', label: 'for two months', async play(st) {
    st.look(300);
    st.mood('bip', 'happy');
    await st.wait(400);
    st.set('st-cal1'); st.sfx('page-turn', { vol: 0.7 });
    await st.wait(800);
    st.set('st-cal2'); st.sfx('page-turn', { vol: 0.7, rate: 1.1 });
    await st.wait(500);
    st.set('st-lb-two'); st.sfx('ding', { vol: 0.4 });
    st.pose('minh', 'point'); st.mood('minh', 'joy'); st.act('bip', 'jump'); st.mood('bip', 'joy');
    await st.wait(1300);
    st.pose('minh', 'stand'); st.act('bip', null);
  } },
  { key: ['has learned a lot of Vietnamese words', 'has made many friends'], icon: '🗣️', label: 'words · friends', async play(st) {
    st.set('st-lb-two', false);
    st.look(420);
    st.mood('bip', 'joy'); st.talk('bip', true);
    for (const k of [1, 2, 3]) { st.set(`st-w${k}`); st.sfx('pop', { vol: 0.6, rate: 0.9 + k * 0.1 }); await st.wait(480); }
    st.talk('bip', false);
    st.show('tom', true);
    await st.walk('tom', 600, { speed: 140, follow: false });
    st.face('tom', -1); st.pose('tom', 'wave'); st.act('tom', 'wave'); st.act('bip', 'wave');
    st.set('st-lb-friends'); st.fx('hearts', 540, 150);
    await st.wait(1300);
    st.act('tom', null); st.pose('tom', 'stand');
  } },
  { key: ['But tonight', 'his antennae are not glowing'], icon: '🌙', label: 'not glowing', async play(st) {
    off(st, 'st-w1', 'st-w2', 'st-w3', 'st-lb-friends');
    st.look(420);
    st.pose('tom', 'wave'); st.act('tom', 'wave'); st.act('bip', null);
    const go = st.walk('tom', 1300, { speed: 150, follow: false });
    st.set('st-night'); st.sfx('crickets', { vol: 0.5 });
    st.set('st-lb-tonight');
    await st.wait(1000);
    st.mood('bip', 'sad'); bipSet(st, 'bip', 'bip-sad'); st.sfx('drip', { vol: 0.4 });
    for (const id of KIDS) st.mood(id, 'wow');
    await st.wait(1200);
    await go; st.show('tom', false);
  } },
  { key: ['He misses Lumo'], icon: '🪐', label: 'misses Lumo', async play(st) {
    st.set('st-lb-tonight', false);
    st.look(420);
    st.mood('bip', 'sad');
    st.set('st-th-lumo'); st.sfx('pop', { vol: 0.5 });
    await st.wait(600);
    st.sfx('wind', { vol: 0.3 });
    for (const id of KIDS) st.mood(id, 'sad');
    await st.wait(1500);
  } },
  { key: ['I have never been away from home', 'for so long'], icon: '😢', label: 'never been away', async play(st) {
    st.set('st-th-lumo', false);
    st.mood('bip', 'cry'); st.set('st-lb-never'); st.sfx('drip', { vol: 0.5 });
    await st.say('bip', 'I have never been away from home for so long.', 2900);
    st.sfx('drip', { vol: 0.4, rate: 1.2 });
  } },
  { key: ['Lan has an idea'], icon: '💡', label: 'an idea', async play(st) {
    st.set('st-lb-never', false);
    st.mood('bip', 'sad');
    st.face('lan', 1);
    st.set('st-bulb'); st.sfx('ding', { vol: 0.7 });
    st.pose('lan', 'pointUp'); st.mood('lan', 'joy'); st.act('lan', 'hop');
    await st.wait(1500);
    st.act('lan', null);
  } },
  { key: ['The Mid-Autumn Festival', 'next week'], icon: '📅', label: 'next week', async play(st) {
    st.set('st-bulb', false);
    st.look(260);
    st.pose('lan', 'stand');
    await st.walk('lan', 200, { speed: 130, follow: false });
    st.pose('lan', 'pointUp'); st.face('lan', -1);
    st.set('st-fest'); st.sfx('ding', { vol: 0.6 }); st.set('st-lb-fest');
    await st.wait(800);
    st.set('st-lb-next'); st.sfx('pop', { vol: 0.5 });
    st.mood('bip', 'wow'); st.mood('minh', 'joy');
    await st.wait(1000);
    st.face('lan', 1); st.pose('lan', 'stand');
  } },
  { key: ['Have you ever made a lantern?'], icon: '🏮', label: 'ever made a lantern?', async play(st) {
    off(st, 'st-lb-fest', 'st-lb-next');
    st.look(300);
    st.set('st-lb-ask'); st.sfx('pop', { vol: 0.6 });
    st.pose('lan', 'open'); st.mood('lan', 'happy');
    await st.say('lan', 'Have you ever made a lantern?', 2300);
  } },
  { key: ['she asks'], icon: '❓', label: 'she asks', async play(st) {
    st.set('st-lb-asks'); st.sfx('ding', { vol: 0.4, rate: 1.2 });
    st.act('lan', 'nod');
    await st.wait(1300);
    st.act('lan', null); st.pose('lan', 'stand');
  } },
  { key: ['Never', 'says Bip'], icon: '🙅', label: 'Never', async play(st) {
    off(st, 'st-lb-ask', 'st-lb-asks');
    st.look(330);
    st.mood('bip', 'sad');
    st.act('bip', 'e107no'); st.sfx('whoosh', { vol: 0.3, rate: 1.4 });
    st.set('st-lb-says');
    await st.say('bip', 'Never.', 1700);
    st.act('bip', null);
  } },
  { key: ['make star lanterns', 'red paper and bamboo'], icon: '⭐', label: 'make star lanterns', async play(st) {
    st.set('st-lb-says', false);
    st.look(X.tbl - 60, { dur: 1200 });
    await Promise.all([
      st.walk('lan', X.tbl - 62, { speed: 170, follow: false }),
      st.walk('minh', X.tbl + 62, { speed: 170, follow: false }),
      st.walk('bip', X.tbl - 130, { speed: 200, follow: false }),
    ]);
    for (const id of KIDS) { st.pose(id, 'e107_make'); st.mood(id, 'happy'); }
    st.face('bip', 1); st.mood('bip', 'wow');
    st.set('st-lb-bamboo'); st.set('st-frame');
    for (let i = 0; i < 3; i++) { st.sfx('knock', { vol: 0.4, rate: 1.4 }); await st.wait(450); }
    st.set('st-lb-paper'); st.set('st-paper'); st.sfx('page-turn', { vol: 0.8 });
    await st.wait(700);
    st.set('st-more'); st.sfx('pop', { vol: 0.5 });
    st.mood('bip', 'happy');
    for (const id of KIDS) st.pose(id, 'stand');
    await st.wait(400);
  } },
  { key: ['Tom has brought some candles', 'Grandma has sent mooncakes'], icon: '🥮', label: 'candles · mooncakes', async play(st) {
    off(st, 'st-lb-bamboo', 'st-lb-paper');
    st.look(X.tbl + 90);
    st.set('st-door'); st.sfx('door-open', { vol: 0.6 });
    st.place('tom', X.door, FLOOR, -1); st.show('tom', true);
    st.chest('tom', CANDLES); st.pose('tom', 'carry');
    await st.walk('tom', X.tbl + 110, { speed: 150, follow: false });
    st.chest('tom', ''); st.pose('tom', 'give');
    await st.fly(CANDLES, [X.tbl + 96, FLOOR - 92], [X.tbl - 34, FLOOR - 62], { size: 30, dur: 520 });
    st.set('st-cand'); st.set('st-lb-cand'); st.sfx('bowl-down', { vol: 0.6 });
    st.pose('tom', 'stand');
    st.place('grandma', X.door, FLOOR, -1); st.show('grandma', true);
    st.chest('grandma', MOONCAKES); st.pose('grandma', 'carry');
    await st.walk('grandma', X.tbl + 170, { speed: 140, follow: false });
    st.chest('grandma', ''); st.pose('grandma', 'give');
    await st.fly(MOONCAKES, [X.tbl + 150, FLOOR - 110], [X.tbl + 30, FLOOR - 64], { size: 36, dur: 520 });
    st.set('st-cake'); st.set('st-lb-cake'); st.sfx('bowl-down', { vol: 0.6, rate: 0.9 });
    st.mood('bip', 'joy'); st.mood('lan', 'joy'); st.mood('minh', 'joy');
    st.pose('grandma', 'stand');
    await st.wait(500);
  } },
  { key: ['On the night of the festival', 'walk with their lanterns'], icon: '🏮', label: 'walk with lanterns', async play(st) {
    off(st, 'st-lb-cand', 'st-lb-cake', 'st-door');
    st.set('st-out');
    st.show('grandma', false); st.mood('bip', 'happy');
    const starts = { tom: 1320, lan: 1390, minh: 1460, bip: 1530 };
    for (const id of LANT) { st.place(id, starts[id], FLOOR, 1); st.hold(id, 'e107_lan'); st.pose(id, 'e107_lift'); st.mood(id, 'joy'); }
    st.place('bip', starts.bip, FLOOR, 1); st.place('blan', starts.bip, FLOOR, 1); st.show('blan', true);
    st.look(1500, { instant: true });
    st.sfx('lion-drum', { vol: 0.5 });
    const d = 470;
    await Promise.all([
      ...LANT.map((id) => st.walk(id, starts[id] + d, { speed: 110, follow: false, after: 'e107_lift' })),
      st.walk('bip', starts.bip + d, { speed: 110, follow: false }),
      st.walk('blan', starts.bip + d, { speed: 110, follow: false }),
      st.look(1500 + d - 40, { dur: (d / 110) * 1000 }),
    ]);
    st.face('bip', 1);
    st.set('st-lb-night'); st.sfx('lion-drum', { vol: 0.4 });
  } },
  { key: ['Bip looks up at the full moon'], icon: '🌕', label: 'the full moon', async play(st) {
    st.set('st-lb-night', false);
    st.look(X.moon - 150, { dur: 1300 });
    st.act('bip', 'e107up'); st.mood('bip', 'wow');
    await st.wait(700);
    st.set('st-moon'); st.set('st-lb-full'); st.sfx('ding', { vol: 0.5, rate: 0.8 });
    for (const id of LANT) { st.mood(id, 'wow'); }
    await st.wait(1600);
  } },
  { key: ['Lumo has two suns but no moon'], icon: '☀️', label: 'two suns · no moon', async play(st) {
    st.set('st-lb-full', false);
    st.act('bip', 'e107up');
    st.set('st-th-moon'); st.sfx('pop', { vol: 0.6 });
    st.talk('bip', true);
    await st.wait(1200);
    st.sfx('buzz-no', { vol: 0.25 });
    await st.wait(1300);
    st.talk('bip', false);
  } },
  { key: ['His antennae glow again'], icon: '✨', label: 'glow again', async play(st) {
    st.set('st-th-moon', false);
    st.act('bip', null);
    bipSet(st, 'bip', 'bip-sad', false); bipSet(st, 'bip', 'bip-glow');
    st.mood('bip', 'joy');
    const B = st.a('bip');
    st.fx('sparkle', B.x, B.y - 130);
    await st.wait(500);
    st.act('bip', 'jump');
    for (const id of LANT) { st.mood(id, 'joy'); st.act(id, 'hop'); }
    st.sfx('giggle', { vol: 0.5 });
    await st.wait(1500);
    for (const id of LANT) st.act(id, null);
  } },
];

export default {
  id: 'en107', worldW: W, floor: FLOOR, viewTop: 40, camStart: 20, css: KIT_CSS + BIP_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 3, 6, 10, 12, 15],
  cast: [
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: X.door, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: 760, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 300, face: 1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 220, s: 1.05, face: 1 },
    { id: 'bip', kind: 'thing', svg: BIP_SVG, box: BIP_BOX, x: 400, face: -1 },
    { id: 'blan', kind: 'thing', svg: BIP_LAN, box: [-50, -140, 120, 144], x: 1500 },
  ],
  init(st) {
    st.show('tom', false); st.show('grandma', false); st.show('blan', false);
  },
};
