/**
 * Bài 68 "Grandpa Used to Fish" (used to + V): mùa hè ở quê (Nam Định), đi từ trái sang phải: đường làng → nhà ông (cổng)
 * → ghế đá bên ao (chiều tối) → ao cá của ông → sông (nước đục, rác) có cây cầu và đường mới → làng lên đèn.
 * "used to" = chuyện ngày xưa hiện trong một bong bóng ký ức màu nâu cũ (sepia) trên đầu ông: cậu bé (ông hồi nhỏ) câu cá ở sông,
 * cá to nhảy, đèn dầu, đi bộ 5 km tới trường; "Now" thì bong bóng đổi sang màu tươi (đường mới, xe buýt).
 * Toạ độ cảnh: rộng 1900, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, sun, thought, flowerAt } from '../kit.js';

const FLOOR = 282;
const X = { start: 60, house: 280, gate: 470, minhBench: 640, gpBench: 704, pond: 880, river: 1040, riverR: 1420, bridge: 1230 };
const B = { x: 880, y: 116, w: 300, h: 128 }; // bong bóng ký ức
const GY = B.y + 34; // mặt đất trong bong bóng
const DECK = 186; // mặt cầu

Object.assign(CAST, {
  e068_boy: { hair: 'bowl', hairC: '#3F2A1E', top: 'tee', shirt: '#D6B98C', bottom: 'shorts', bottomC: '#78716C', shoe: '#A8A29E', bag: '#A16207' },
});

// ── Đồ vật ─────────────────────────────────────────────────────────────────
/** Cần câu tre (dọc theo cẳng tay, chếch lên). */
const ROD = (len) => `<path d="M0 -4 L0 ${len}" stroke="#A16207" stroke-width="2.2" stroke-linecap="round"/><path d="M0 ${len * 0.3} h0.01 M0 ${len * 0.6} h0.01" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>`;
/** Xe buýt vàng (gốc = giữa hai bánh, chạm mặt đường), chạy sang trái nên đầu xe bên trái. */
const BUS = `<g class="e068-busbody"><rect x="-56" y="-46" width="112" height="38" rx="7" fill="#FACC15" stroke="${L}" stroke-width="1.2"/>
  ${[-44, -22, 0, 22].map((x) => `<rect x="${x}" y="-40" width="18" height="14" rx="2" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="40" y="-40" width="12" height="24" rx="2" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>
  <path d="M-56 -20 H56" stroke="#EA580C" stroke-width="2"/><rect x="-60" y="-18" width="6" height="6" rx="1" fill="#FEF9C3" stroke="${L}" stroke-width="0.6"/>
  <text class="es-unflip" x="0" y="-12" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="8" fill="#7C2D12">SCHOOL BUS</text></g>
  ${[-34, 34].map((x) => `<g transform="translate(${x} -8)"><g class="e068-wheel"><circle r="8" fill="#1F2937" stroke="${L}"/><circle r="3" fill="#CBD5E1"/><path d="M-3 0 H3" stroke="#64748B" stroke-width="1.2"/></g></g>`).join('')}`;
const BOTTLE = (x, y, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-8" y="-3" width="16" height="6" rx="2" fill="#86EFAC" fill-opacity="0.8" stroke="${L}" stroke-width="0.7"/><rect x="8" y="-1.6" width="4" height="3.2" fill="#EF4444"/></g>`;
const TRASHBAG = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-9 2 Q-10 -8 0 -9 Q10 -8 9 2Z" fill="#F8FAFC" stroke="${L}" stroke-width="0.7"/><path d="M-2 -9 l-3 -4 M2 -9 l3 -4" stroke="${L}" stroke-width="0.7"/></g>`;

const POSES = {
  e068_sitG: { R: [20, -40], L: [20, -40], dy: 40 },
  e068_sitK: { R: [20, -40], L: [20, -40], dy: 20 },
  e068_talkG: { R: [120, 150], L: [20, -40], dy: 40, head: -4 },
  e068_noG: { R: [20, -40], L: [20, -40], dy: 40 },
  e068_ask: { R: [50, 130], L: [20, -40], dy: 20, head: -6 },
  e068_fish: { R: [60, 150], L: [30, 60] },
  e068_fishBoy: { R: [60, 150], L: [30, 60] },
  e068_read: { R: [24, -100], L: [24, -100], dy: 12, head: 10 },
  e068_hug: { R: [70, 20], L: [70, 20], head: 6 },
  e068_heart: { R: [24, -120], L: [24, -110], head: -4 },
};
const PROPS = { e068_rod: ROD(70), e068_rodS: ROD(44) };
const LAMPBOOK = `<g transform="translate(0 -12)"><rect x="-12" y="-8" width="24" height="16" rx="1.5" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/><path d="M0 -8 V8" stroke="${L}" stroke-width="0.7"/></g>`;

function bg() {
  const memInner = `
    <!-- sông buổi sáng (câu cá, cá to) -->
    <g class="e068-m e068-m-river"><circle class="e068-msun" cx="96" cy="-14" r="11" fill="#FCD34D" stroke="#D97706"/>
      <path d="M-128 ${GY - B.y - 2} H128 V${GY - B.y + 26} H-128Z" fill="#A5B4A8"/>
      ${[-100, -50, 0, 50, 100].map((x) => `<path d="M${x} ${GY - B.y + 10} q6 -3 12 0 q6 3 12 0" stroke="#E7E5E4" stroke-width="1.4" fill="none"/>`).join('')}
      <path d="M-128 ${GY - B.y - 2} H-60" stroke="#A16207" stroke-width="3"/>
      <path class="e068-mline" d="M-44 -19 Q-14 -6 4 ${GY - B.y + 2}" stroke="#57534E" stroke-width="0.8" fill="none"/><circle class="e068-mfloat" cx="4" cy="${GY - B.y + 2}" r="2.6" fill="#DC2626"/></g>
    <g class="e068-m e068-m-fish">${[[-20, 0], [36, 0.5], [84, 1]].map(([x, d]) => `<g transform="translate(${x} ${GY - B.y + 8})"><g class="e068-jump" style="animation-delay:${d * 0.5}s"><path d="M-14 0 Q0 -10 14 0 Q0 10 -14 0Z M14 0 L22 -7 V7Z" fill="#D6B98C" stroke="#78350F" stroke-width="0.9"/><circle cx="-8" cy="-1.5" r="1.4" fill="#292524"/></g></g>`).join('')}</g>
    <!-- đêm, không có điện, đèn dầu -->
    <g class="e068-m e068-m-lamp"><rect x="-150" y="-60" width="300" height="120" fill="#57534E" opacity="0.55"/>
      <g transform="translate(-70 -10)"><circle r="12" fill="#E7E5E4" stroke="#57534E"/><rect x="-5" y="10" width="10" height="6" fill="#A8A29E"/><path d="M-16 -16 L16 16 M16 -16 L-16 16" stroke="#DC2626" stroke-width="3.6" stroke-linecap="round"/></g>
      <g transform="translate(46 ${GY - B.y - 30})"><rect x="-20" y="16" width="40" height="6" fill="#92400E"/><g class="e068-flame"><ellipse cx="0" cy="-12" rx="22" ry="22" fill="#FDE68A" opacity="0.45"/><path d="M0 -20 Q5 -12 0 -6 Q-5 -12 0 -20Z" fill="#F59E0B"/></g>
        <path d="M-7 -6 Q-9 4 -6 10 H6 Q9 4 7 -6Z" fill="#FEF3C7" fill-opacity="0.7" stroke="#78350F" stroke-width="0.8"/><path d="M-9 10 H9 L7 16 H-7Z" fill="#B45309" stroke="#78350F" stroke-width="0.8"/></g></g>
    <!-- đi bộ 5 km tới trường -->
    <g class="e068-m e068-m-walk"><path d="M-130 ${GY - B.y} H130" stroke="#C2A374" stroke-width="10"/>
      ${[-90, -40, 10, 60].map((x) => `<path d="M${x} ${GY - B.y - 6} v-12" stroke="#A8A29E" stroke-width="2"/><circle cx="${x}" cy="${GY - B.y - 22}" r="6" fill="#A8A29E"/>`).join('')}
      <g transform="translate(106 ${GY - B.y - 6})"><path d="M-18 -20 L0 -32 L18 -20Z" fill="#B45309" stroke="#78350F"/><rect x="-14" y="-20" width="28" height="20" fill="#E7E5E4" stroke="#78350F"/><rect x="-4" y="-12" width="8" height="12" fill="#78350F"/></g>
      ${label(-6, -14, '5 km', '#92400E', 14)}</g>
    <!-- bây giờ: đường mới, xe buýt -->
    <g class="e068-m e068-m-now"><rect x="-150" y="-60" width="300" height="120" fill="#BAE6FD"/><path d="M-130 ${GY - B.y - 4} H130 V${GY - B.y + 14} H-130Z" fill="#64748B"/>
      ${[-100, -50, 0, 50, 100].map((x) => `<rect x="${x}" y="${GY - B.y + 4}" width="20" height="3" fill="#F8FAFC"/>`).join('')}
      <g class="e068-mbus"><g transform="translate(0 ${GY - B.y + 4}) scale(0.62)">${BUS}</g>
        ${[-24, -10, 4].map((x) => `<circle cx="${x}" cy="${GY - B.y - 18}" r="3.4" fill="#FDDCB5" stroke="${L}" stroke-width="0.5"/>`).join('')}</g></g>
    <!-- tiêu đề -->
    <g class="e068-m e068-m-old">${label(0, -34, 'long ago', '#92400E', 13)}</g>
    <g class="e068-m e068-m-nowlb">${label(0, -34, 'now', '#16A34A', 14)}</g>`;
  const mem = thought(B.x, B.y, B.w, B.h, `<g class="e068-sepia" clip-path="url(#e068clip)">${memInner}</g>`, [X.gpBench + 10, 168], 'e068-mem');
  const bikeQ = `<g transform="translate(-6 2)"><circle cx="-12" cy="6" r="8" fill="none" stroke="${L}" stroke-width="1.6"/><circle cx="12" cy="6" r="8" fill="none" stroke="${L}" stroke-width="1.6"/>
    <path d="M-12 6 L-4 -6 H8 L12 6 M-4 -6 L0 6 L8 -6 M-6 -10 H-2 M8 -6 L6 -12 H10" stroke="#2563EB" stroke-width="1.6" fill="none" stroke-linejoin="round"/></g>
    <text x="26" y="10" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="22" fill="#2563EB">?</text>
    <path class="e068-bikeX" d="M-24 -14 L12 18 M12 -14 L-24 18" stroke="#DC2626" stroke-width="3.6" stroke-linecap="round"/>`;
  return `
  <defs><clipPath id="e068clip"><ellipse rx="${B.w * 0.46}" ry="${B.h * 0.42}"/></clipPath></defs>
  ${sky(0, 1900, 315, 'e068sky')}
  <rect class="e068-eve" x="0" y="0" width="1900" height="315" fill="#FB923C"/>
  <rect class="e068-dusk" x="0" y="0" width="1900" height="315" fill="#312E81"/>
  <g class="e068-sun0" transform="translate(150 60)">${sun(24)}</g>
  ${cloud(420, 50, 0.9, 0)}${cloud(1180, 40, 1, 3)}${cloud(1600, 56, 0.8, 1)}
  <g class="e068-lb e068-lb-summer">${label(300, 108, 'last summer', '#EA580C', 16)}</g>
  <!-- đồng lúa xa, làng bên kia sông -->
  <path d="M0 ${FLOOR - 50} Q300 ${FLOOR - 70} 600 ${FLOOR - 52} T1200 ${FLOOR - 56} T1900 ${FLOOR - 50} V${FLOOR} H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${[1500, 1600, 1720, 1820].map((x, i) => `<g transform="translate(${x} ${DECK - 2})"><path d="M-30 -30 L0 -50 L30 -30Z" fill="#B91C1C" stroke="${L}"/><rect x="-26" y="-30" width="52" height="30" fill="#FEF3C7" stroke="${L}"/>
    <rect class="e068-win" x="${i % 2 ? -18 : 6}" y="-22" width="12" height="12" fill="#BAE6FD" stroke="${L}" stroke-width="0.7"/><rect x="${i % 2 ? 4 : -16}" y="-18" width="10" height="18" fill="#92400E" stroke="${L}" stroke-width="0.7"/></g>`).join('')}
  ${[[1110, 0.7], [1190, 0.62], [1330, 0.7]].map(([x, k], i) => `<g transform="translate(${x} ${DECK + 46}) scale(${k})"><path d="M-30 -30 L0 -50 L30 -30Z" fill="#B91C1C" stroke="${L}"/><rect x="-26" y="-30" width="52" height="30" fill="#FEF3C7" stroke="${L}"/><rect class="e068-win" x="${i % 2 ? -18 : 6}" y="-22" width="12" height="12" fill="#BAE6FD" stroke="${L}" stroke-width="0.7"/></g>`).join('')}
  <!-- cầu mới + đường -->
  <rect x="${X.river - 60}" y="${DECK}" width="${1900 - X.river + 60}" height="8" fill="#94A3B8" stroke="${L}"/>
  ${[X.river + 60, X.bridge + 60, X.riverR - 40].map((x) => `<rect x="${x - 6}" y="${DECK + 8}" width="12" height="${FLOOR - DECK}" fill="#CBD5E1" stroke="${L}"/>`).join('')}
  ${Array.from({ length: 18 }, (_, i) => `<path d="M${X.river - 50 + i * 30} ${DECK} v-12" stroke="#64748B" stroke-width="2"/>`).join('')}<path d="M${X.river - 60} ${DECK - 12} H1900" stroke="#64748B" stroke-width="2.4"/>
  ${[X.river + 20, X.bridge + 120, 1560].map((x) => `<g transform="translate(${x} ${DECK})"><path d="M0 0 V-44 Q0 -50 8 -50" stroke="#475569" stroke-width="2.6" fill="none"/><rect x="4" y="-54" width="12" height="5" rx="1" fill="#334155"/>
    <g class="e068-lamp"><circle cx="10" cy="-46" r="12" fill="#FEF08A" opacity="0.5"/><circle cx="10" cy="-48" r="3" fill="#FEF9C3"/></g></g>`).join('')}
  <g class="e068-lb e068-lb-road">${label(X.bridge + 100, DECK - 74, 'new road', '#475569', 13)}</g>
  <!-- Đường làng, nhà ông, tre -->
  ${[40, 64, 88].map((x) => `<g transform="translate(${x} ${FLOOR - 4})"><path d="M0 0 Q-4 -80 6 -150" stroke="#65A30D" stroke-width="5" fill="none"/>${[-40, -80, -120].map((y) => `<path d="M${y / -40} ${y} q16 -6 26 4 q-14 0 -26 -4Z M${y / -40} ${y} q-16 -6 -26 4 q14 0 26 -4Z" fill="#4ADE80" stroke="${L}" stroke-width="0.6"/>`).join('')}</g>`).join('')}
  <g transform="translate(${X.house} ${FLOOR})"><path d="M-110 -110 L0 -168 L110 -110Z" fill="#B45309" stroke="${L}" stroke-width="1.3"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${-96 + i * 38} -110 L${-48 + i * 16} -150" stroke="#92400E" stroke-width="0.8"/>`).join('')}
    <rect x="-96" y="-110" width="192" height="110" fill="#FDE68A" stroke="${L}" stroke-width="1.3"/>
    <rect x="-70" y="-84" width="36" height="34" fill="#BAE6FD" stroke="${L}"/><path d="M-52 -84 V-50 M-70 -67 H-34" stroke="${L}" stroke-width="0.8"/>
    <rect x="-14" y="-74" width="40" height="74" fill="#92400E" stroke="${L}"/><rect x="44" y="-84" width="36" height="34" fill="#BAE6FD" stroke="${L}"/><path d="M62 -84 V-50 M44 -67 H80" stroke="${L}" stroke-width="0.8"/></g>
  <g transform="translate(${X.gate} 0)"><rect x="-6" y="${FLOOR - 70}" width="12" height="70" fill="#E7E5E4" stroke="${L}"/><rect x="40" y="${FLOOR - 70}" width="12" height="70" fill="#E7E5E4" stroke="${L}"/><path d="M-8 ${FLOOR - 72} H54" stroke="#B91C1C" stroke-width="5"/></g>
  <!-- đất, ao của ông, sông -->
  <rect x="0" y="${FLOOR - 6}" width="${X.river}" height="${315 - FLOOR + 6}" fill="#86EFAC" stroke="${L}"/>
  ${tree(560, FLOOR - 2, 0.85, '#FACC15')}
  <ellipse cx="${X.pond}" cy="${FLOOR - 14}" rx="110" ry="16" fill="#38BDF8" stroke="${L}"/><ellipse cx="${X.pond}" cy="${FLOOR - 16}" rx="96" ry="10" fill="#7DD3FC"/>
  ${[0, 1, 2].map((i) => `<ellipse cx="${X.pond - 60 + i * 56}" cy="${FLOOR - 15 + (i % 2) * 3}" rx="10" ry="3" fill="#22C55E" stroke="${L}" stroke-width="0.6"/>`).join('')}
  <g class="e068-cast"><path d="M${X.pond - 60} ${FLOOR - 170} Q${X.pond - 20} ${FLOOR - 120} ${X.pond + 14} ${FLOOR - 16}" stroke="#57534E" stroke-width="0.9" fill="none"/>
    <g class="e068-float"><circle cx="${X.pond + 14}" cy="${FLOOR - 16}" r="3.4" fill="#DC2626" stroke="${L}" stroke-width="0.6"/></g></g>
  <path class="e068-riverW" d="M${X.river - 10} ${FLOOR - 4} Q${X.river + 30} ${DECK + 46} ${X.river + 70} ${DECK + 44} H${X.riverR - 60} Q${X.riverR - 20} ${DECK + 46} ${X.riverR + 10} ${FLOOR - 4} V315 H${X.river - 10}Z" fill="#38BDF8" stroke="${L}"/>
  <path class="e068-dirty" d="M${X.river - 10} ${FLOOR - 4} Q${X.river + 30} ${DECK + 46} ${X.river + 70} ${DECK + 44} H${X.riverR - 60} Q${X.riverR - 20} ${DECK + 46} ${X.riverR + 10} ${FLOOR - 4} V315 H${X.river - 10}Z" fill="#78716C" opacity="0.55"/>
  <g class="ek-wave">${Array.from({ length: 8 }, (_, i) => `<path d="M${X.river + 20 + i * 46} ${DECK + 54 + (i % 3) * 16} q6 -4 12 0 q6 4 12 0" stroke="#E7E5E4" stroke-width="1.6" fill="none"/>`).join('')}</g>
  <g class="e068-trash">${BOTTLE(X.river + 70, DECK + 64, 20)}${TRASHBAG(X.river + 160, DECK + 82)}${BOTTLE(X.river + 250, DECK + 96, -30)}${TRASHBAG(X.river + 320, DECK + 60)}</g>
  <g class="e068-lb e068-lb-clean">${label(X.river + 120, DECK + 26, 'not as clean', '#78350F', 14)}</g>
  <rect x="${X.riverR}" y="${FLOOR - 6}" width="${1900 - X.riverR}" height="${315 - FLOOR + 6}" fill="#86EFAC" stroke="${L}"/>
  ${tree(1600, FLOOR - 2, 0.9, '')}${tree(1820, FLOOR - 2, 0.8, '')}
  <g class="e068-lb e068-lb-village">${label(X.river + 190, 132, 'my village', '#DB2777', 16)}</g>
  <!-- bong bóng ký ức của ông, bong bóng câu hỏi của Minh -->
  ${mem}
  ${thought(X.minhBench - 26, 104, 110, 70, bikeQ, [X.minhBench - 8, 178], 'e068-bq')}`;
}

function fg() {
  return `
  <!-- ghế đá bên ao (che chân người ngồi) -->
  <g transform="translate(${(X.minhBench + X.gpBench) / 2} ${FLOOR})"><rect x="-64" y="-40" width="128" height="9" rx="3" fill="#D6D3D1" stroke="${L}" stroke-width="1.1"/>
    <rect x="-58" y="-31" width="116" height="7" fill="#A8A29E" stroke="${L}" stroke-width="0.8"/><rect x="-54" y="-24" width="12" height="24" fill="#A8A29E" stroke="${L}" stroke-width="0.9"/><rect x="42" y="-24" width="12" height="24" fill="#A8A29E" stroke="${L}" stroke-width="0.9"/></g>
  ${bush(500, FLOOR + 12, 0.9)}${bush(X.river - 20, FLOOR + 14, 0.8, '#4ADE80')}
  ${flowerAt(590, FLOOR + 10, '#F472B6')}${flowerAt(602, FLOOR + 12, '#FACC15')}`;
}

const CSS = `
.e068-lb { opacity: 0; transition: opacity .35s; }
.st-lb-summer .e068-lb-summer, .st-lb-road .e068-lb-road, .st-lb-clean .e068-lb-clean, .st-lb-village .e068-lb-village { opacity: 1; }
/* trời: hè trưa → chiều (cam) → tối (tím) */
.e068-eve, .e068-dusk { opacity: 0; transition: opacity 1.2s; } .st-eve .e068-eve { opacity: .35; } .st-dusk .e068-dusk { opacity: .45; }
.e068-sun0 { transition: transform 1.4s, opacity 1.2s; } .st-eve .e068-sun0 { transform: translate(150px, 150px); opacity: .7; } .st-dusk .e068-sun0 { opacity: 0; }
.e068-lamp { opacity: 0; transition: opacity .3s; } .st-lamps .e068-lamp { opacity: 1; }
.e068-win { transition: fill .4s; } .st-lamps .e068-win { fill: #FDE047; }
/* bong bóng ký ức (nâu cũ), cảnh bên trong đổi theo câu */
.e068-mem, .e068-bq { opacity: 0; transform: scale(.4); transition: opacity .35s, transform .5s cubic-bezier(.3,1.5,.6,1); }
.e068-mem { transform-origin: ${X.gpBench + 10}px 168px; } .e068-bq { transform-origin: ${X.minhBench - 8}px 178px; }
.st-mem .e068-mem, .st-bq .e068-bq { opacity: 1; transform: scale(1); }
.e068-mem > g:last-child > ellipse { fill: #FEF3C7; }
.e068-sepia { filter: sepia(.55); transition: filter .6s; } .st-m-now .e068-sepia { filter: none; }
.e068-m { opacity: 0; transition: opacity .45s; }
.st-m-old .e068-m-old, .st-m-river .e068-m-river, .st-m-fish .e068-m-fish, .st-m-lamp .e068-m-lamp, .st-m-walk .e068-m-walk, .st-m-now .e068-m-now, .st-m-now .e068-m-nowlb { opacity: 1; }
.st-m-now .e068-m-old { opacity: 0; }
.e068-jump { opacity: 0; }
.st-m-fish .e068-jump { animation: e068Jump 1.5s ease-in-out infinite; }
@keyframes e068Jump { 0% { opacity: 0; transform: translate(-10px, 6px) rotate(30deg); } 15% { opacity: 1; } 50% { transform: translate(0, -28px) rotate(0deg); } 85% { opacity: 1; } 100% { opacity: 0; transform: translate(10px, 6px) rotate(-30deg); } }
.st-m-river .e068-mfloat { animation: e068Bob .8s ease-in-out infinite alternate; }
@keyframes e068Bob { to { transform: translateY(2px); } }
.st-m-lamp .e068-flame { animation: e068Flame .25s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes e068Flame { from { transform: scale(.94, 1); } to { transform: scale(1.04, 1.08); } }
.e068-mbus { transform: translateX(-90px); transition: transform 3.2s linear; } .st-m-now .e068-mbus { transform: translateX(80px); }
.e068-bikeX { opacity: 0; transition: opacity .3s; } .st-bikeX .e068-bikeX { opacity: 1; }
/* ao: thả câu, phao nhấp nhô; sông: nước đục + rác */
.e068-cast { opacity: 0; transition: opacity .3s; } .st-cast .e068-cast { opacity: 1; }
.st-cast .e068-float { animation: e068Bob .7s ease-in-out infinite alternate; }
.e068-dirty, .e068-trash { opacity: 0; transition: opacity .8s; } .st-dirty .e068-dirty { opacity: .55; } .st-dirty .e068-trash { opacity: 1; }
.e068-trash > g { animation: e068Drift 2.4s ease-in-out infinite alternate; }
@keyframes e068Drift { to { transform: translate(6px, 2px); } }
.es-ac[data-id="boy"] { filter: sepia(.6); }
.es-thing.is-walk .e068-wheel { animation: e068Spin .4s linear infinite reverse; }
@keyframes e068Spin { to { transform: rotate(360deg); } }
.es-thing.is-walk .e068-busbody { animation: e068BusBob .2s ease-in-out infinite alternate; }
@keyframes e068BusBob { to { transform: translateY(-1px); } }
.es-ac.act-e068-cast .pp-upwR { animation: e068Cast .9s ease-out 1; }
@keyframes e068Cast { 0% { transform: rotate(-40deg); } 60% { transform: rotate(14deg); } 100% { transform: rotate(0deg); } }
@media (prefers-reduced-motion: reduce) {
  .st-m-fish .e068-jump { animation-duration: 2.6s; }
  .st-m-river .e068-mfloat, .st-cast .e068-float { animation-duration: 1.6s; }
  .st-m-lamp .e068-flame { animation-duration: .7s; }
  .e068-trash > g { animation-duration: 4s; }
  .es-thing.is-walk .e068-wheel { animation-duration: .8s; }
  .es-ac.act-e068-cast .pp-upwR { animation-duration: 1.6s; }
}
`;

const mem = (st, name) => ['st-m-river', 'st-m-fish', 'st-m-lamp', 'st-m-walk', 'st-m-now'].forEach((n) => st.set(n, n === name));

const BEATS = [
  { key: ['Last summer', 'Minh visited Grandpa'], icon: '🏡', label: 'visited Grandpa', async play(st) {
    st.set('st-lb-summer'); st.sfx('birds', { vol: 0.6 });
    await st.walk('minh', X.gate - 80, { speed: 135, lead: 60 });
    st.face('grandpa', -1); st.pose('grandpa', 'wave'); st.act('grandpa', 'wave'); st.mood('grandpa', 'joy');
    st.mood('minh', 'joy'); st.pose('minh', 'wave'); st.sfx('giggle', { vol: 0.6 });
    await st.wait(900);
    st.act('grandpa', null); st.pose('grandpa', 'open'); st.pose('minh', 'e068_hug');
    st.fx('hearts', X.gate - 40, 150);
    await st.wait(1200);
  } },
  { key: ['they sat by the pond', 'talked about the old days'], icon: '🪑', label: 'by the pond', async play(st) {
    st.set('st-lb-summer', false); st.pose('grandpa', 'stand'); st.pose('minh', 'stand'); st.mood('minh', 'happy'); st.mood('grandpa', 'happy');
    st.set('st-eve');
    await Promise.all([
      st.walk('grandpa', X.gpBench, { speed: 120, follow: false }),
      st.walk('minh', X.minhBench, { speed: 120, lead: 160 }),
    ]);
    st.face('grandpa', -1); st.face('minh', 1);
    st.pose('grandpa', 'e068_sitG'); st.pose('minh', 'e068_sitK'); st.sfx('crickets', { vol: 0.6 });
    await st.wait(500);
    st.face('grandpa', 1); st.pose('grandpa', 'e068_talkG'); st.talk('grandpa', true);
    st.set('st-mem'); st.set('st-m-old'); st.sfx('pop', { vol: 0.5 });
    await st.wait(1500);
    st.talk('grandpa', false);
  } },
  { key: ['I used to fish in the river every morning'], icon: '🎣', label: 'used to fish', async play(st) {
    st.pose('grandpa', 'e068_sitG');
    mem(st, 'st-m-river');
    st.show('boy', true); st.place('boy', B.x - 70, GY, 1); st.hold('boy', 'e068_rodS'); st.pose('boy', 'e068_fishBoy');
    st.sfx('river', { vol: 0.6 });
    await st.wait(600);
    st.act('boy', 'e068-cast'); st.sfx('whoosh', { vol: 0.5 });
    await st.wait(600);
    st.sfx('splash', { vol: 0.5 });
    await st.wait(1300);
    st.act('boy', null);
  } },
  { key: ['There used to be many big fish in it'], icon: '🐟', label: 'big fish', async play(st) {
    st.set('st-m-fish'); st.mood('boy', 'joy');
    for (let i = 0; i < 3; i++) { await st.wait(500); st.sfx('splash', { vol: 0.6 }); }
    st.mood('minh', 'wow');
    await st.wait(1000);
  } },
  { key: ["We didn't use to have electricity", 'read by oil lamps'], icon: '🪔', label: 'oil lamps', async play(st) {
    mem(st, 'st-m-lamp');
    st.hold('boy', null); st.place('boy', B.x - 6, GY, 1); st.pose('boy', 'stand'); st.mood('boy', 'happy');
    st.sfx('buzz-no', { vol: 0.5 });
    await st.wait(1100);
    st.sfx('sizzle', { vol: 0.4 });
    await st.wait(400);
    st.chest('boy', LAMPBOOK); st.pose('boy', 'e068_read'); st.act('boy', 'read'); st.sfx('page-turn', { vol: 0.6 });
    await st.wait(1500);
  } },
  { key: ['Did you use to go to school by bike?'], icon: '🚲', label: 'by bike?', async play(st) {
    st.act('boy', null);
    st.look(X.minhBench + 100, { dur: 700 });
    st.mood('minh', 'happy'); st.pose('minh', 'e068_ask'); st.talk('minh', true);
    st.set('st-bq'); st.sfx('pop', { vol: 0.5 });
    await st.wait(500);
    st.sfx('ding', { vol: 0.6 });
    await st.wait(1300);
    st.talk('minh', false);
  } },
  { key: ['Minh asked'], icon: '❓', label: 'Minh asked', async play(st) {
    st.pose('minh', 'sitWave'); st.mood('minh', 'wow'); st.sfx('pop', { vol: 0.4, rate: 1.3 });
    st.talk('minh', true);
    await st.wait(1100);
    st.talk('minh', false); st.pose('minh', 'e068_sitK');
  } },
  { key: ['No.'], icon: '🙅', label: 'No.', async play(st) {
    st.face('grandpa', -1); st.pose('grandpa', 'e068_noG'); st.act('grandpa', 'no'); st.talk('grandpa', true);
    st.set('st-bikeX'); st.sfx('buzz-no', { vol: 0.6 });
    await st.wait(1100);
    st.act('grandpa', null); st.talk('grandpa', false);
  } },
  { key: ['I used to walk five kilometres'], icon: '🚶', label: 'walk 5 km', async play(st) {
    st.set('st-bq', false); st.set('st-bikeX', false);
    st.face('grandpa', 1); st.pose('grandpa', 'e068_talkG'); st.talk('grandpa', true);
    mem(st, 'st-m-walk'); st.look(X.minhBench + 160, { dur: 700 });
    st.chest('boy', null); st.pose('boy', 'stand'); st.bag('boy', true);
    st.place('boy', B.x - 112, GY, 1);
    await st.wait(300);
    await st.walk('boy', B.x + 72, { speed: 60, follow: false });
    st.sfx('school-bell', { vol: 0.4 });
    st.talk('grandpa', false);
    await st.wait(500);
  } },
  { key: ['Now the village has a new road', 'children go to school by bus'], icon: '🚌', label: 'by bus', async play(st) {
    st.show('boy', false);
    st.set('st-m-now'); mem(st, 'st-m-now'); st.sfx('pop', { vol: 0.4 });
    st.pose('grandpa', 'e068_talkG'); st.talk('grandpa', true);
    await st.wait(300);
    st.sfx('bus', { vol: 0.6 });
    await st.wait(1800);
    st.sfx('giggle', { vol: 0.4 }); st.mood('minh', 'joy');
    await st.wait(1300);
    st.talk('grandpa', false);
  } },
  { key: ['Grandpa still fishes in his pond', 'not as clean as it used to be'], icon: '🏞️', label: 'not as clean', async play(st) {
    mem(st, ''); st.set('st-m-old', false); st.set('st-mem', false);
    st.pose('minh', 'stand'); st.pose('grandpa', 'stand'); st.mood('minh', 'happy');
    await st.walk('grandpa', X.pond - 110, { speed: 110, lead: 40 });
    st.face('grandpa', 1); st.hold('grandpa', 'e068_rod'); st.pose('grandpa', 'e068_fish');
    st.act('grandpa', 'e068-cast'); st.sfx('whoosh', { vol: 0.6 });
    await st.wait(700);
    st.set('st-cast'); st.sfx('splash', { vol: 0.6 });
    await st.wait(800);
    st.act('grandpa', null);
    st.look(X.river - 70, { dur: 1100 });
    st.set('st-dirty'); st.sfx('river', { vol: 0.6 });
    await st.walk('minh', X.river - 50, { speed: 140, follow: false });
    st.face('minh', 1); st.mood('minh', 'sad'); st.pose('minh', 'point');
    st.set('st-lb-clean'); st.sfx('buzz-no', { vol: 0.35 });
    await st.wait(1000);
  } },
  { key: ['Life has changed a lot'], icon: '🌉', label: 'changed', async play(st) {
    st.set('st-lb-clean', false); st.pose('minh', 'stand');
    st.set('st-dusk'); st.set('st-lamps'); st.sfx('click', { vol: 0.6 });
    st.set('st-cast', false); st.hold('grandpa', null); st.pose('grandpa', 'stand');
    st.look(X.river + 60, { dur: 900 });
    await st.walk('grandpa', X.river - 110, { speed: 110, follow: false });
    st.face('grandpa', 1); st.pose('grandpa', 'open'); st.talk('grandpa', true); st.face('minh', -1); st.pose('minh', 'stand');
    st.place('bus', X.river + 420); st.show('bus', true); st.set('st-lb-road');
    await st.loop('bus', () => st.walk('bus', X.river - 140, { speed: 220, follow: false }), { vol: 0.7 });
    st.show('bus', false);
    st.talk('grandpa', false); st.mood('minh', 'wow');
    await st.wait(300);
  } },
  { key: ['I still love this village'], icon: '❤️', label: 'love this village', async play(st) {
    st.set('st-lb-road', false);
    st.look(X.river + 40, { dur: 700 });
    st.pose('grandpa', 'e068_heart'); st.mood('grandpa', 'joy');
    st.face('minh', -1); st.pose('minh', 'e068_hug'); st.mood('minh', 'joy');
    st.sfx('crickets', { vol: 0.5 });
    await st.wait(500);
    st.fx('hearts', X.river - 80, 120);
    st.set('st-lb-village');
    await st.wait(1600);
  } },
];

export default {
  id: 'en068', worldW: 1900, floor: FLOOR, viewTop: 30, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'bus', kind: 'thing', x: 1960, y: DECK, svg: BUS, box: [-62, -50, 124, 52], s: 0.9, face: -1 },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: X.gate + 30, s: 0.95, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.start, face: 1 },
    { id: 'boy', kind: 'kid', who: 'e068_boy', x: B.x - 70, y: GY, s: 0.42 },
  ],
  init(st) {
    st.show('boy', false); st.show('bus', false); st.bag('minh', true);
  },
};
