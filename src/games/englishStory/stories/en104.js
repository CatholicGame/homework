/**
 * Bài 104 "Life on Planet Lumo" (so sánh Trái Đất / Lumo bằng hiện tại đơn; and / but / because). Bộ 👽: tập 4.
 * Hai chỗ trong một thế giới:
 * - Vườn nhà Minh buổi tối (x 0..1000): nhà có cửa sổ sáng đèn, trời đêm đầy sao, chiếu trải trên cỏ, đèn lồng, cây xoài,
 *   phi thuyền hỏng của Bíp vẫn nằm dưới gốc (như bài 101). Minh và Bíp ngồi ngắm sao, Bíp chỉ ngôi sao tím bé xíu.
 * - Tranh tưởng tượng chia đôi "Earth | Lumo" (x 1000..1800, vạch giữa ở D): Bíp đứng ở vạch giữa kể. Bên Trái Đất: trời xanh,
 *   một mặt trời, biển xanh, xe buýt đi học, bát cơm. Bên Lumo: trời cam (đêm thành hồng), hai mặt trời, biển tím, bạn nhỏ
 *   bay bằng giày có cánh, quả tím to. Hai câu cuối về lại vườn: Minh đưa Bíp quả xoài (người Trái Đất tốt bụng), Bíp nhớ bố mẹ.
 * Toạ độ cảnh: rộng 1800, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, label, thought, speaker, sun } from '../kit.js';
import { BIP_SVG, BIP_BOX, BIP_CSS, BIP_AT, SHIP_SVG, SHIP_BOX, bipSet } from '../bip.js';

const FLOOR = 282;
const W = 1800;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { door: 150, lamp: 340, minh: 410, bip: 470, ship: 650, tree: 740, look: 470 };
const D = 1400; // vạch giữa tranh Earth | Lumo
const PSTAR = [626, 62]; // ngôi sao tím (Lumo)
const SEA = 214, SAND = 262;

// ── Nhân vật riêng ────────────────────────────────────────────────────────
/** Bạn nhỏ Lumo: dáng Bíp, áo màu khác, giày có cánh vỗ. */
const WINGS = [-1, 1].map((d) => `<g transform="translate(${d * 9} -6)"><g class="e104-wing" style="transform-origin:0 0"><path d="M0 0 Q${d * 12} -10 ${d * 18} -4 Q${d * 12} -2 ${d * 15} 2 Q${d * 8} 2 0 0Z" fill="#fff" stroke="${L}" stroke-width="0.8"/></g></g>`).join('');
const kid = (suit, dark) => `${BIP_SVG.replaceAll('#8B5CF6', suit).replaceAll('#6D28D9', dark)}${WINGS}`;
/** Bố mẹ Bíp (trong bong bóng nghĩ): dáng Bíp to hơn. */
const parent = (suit, dark, x, s) => `<g transform="translate(${x} 40) scale(${s})"><g class="m-happy bip-wave">${BIP_SVG.replaceAll('#8B5CF6', suit).replaceAll('#6D28D9', dark)}</g></g>`;

const wheel = (x, y, r) => `<g transform="translate(${x} ${y})"><g class="e104-wh"><circle r="${r}" fill="#1F2937" stroke="${L}" stroke-width="0.9"/><circle r="${r * 0.45}" fill="#CBD5E1"/>
  <path d="M${-r * 0.45} 0 H${r * 0.45} M0 ${-r * 0.45} V${r * 0.45}" stroke="#64748B" stroke-width="1.4"/></g></g>`;
/** Xe buýt đi học (gốc = giữa đáy, nhìn sang phải). */
const BUS = `<g><rect x="-62" y="-52" width="124" height="42" rx="8" fill="#FACC15" stroke="${L}" stroke-width="1.3"/>
  <path d="M50 -52 Q66 -50 68 -30 V-10 H50Z" fill="#FACC15" stroke="${L}" stroke-width="1.2"/>
  ${[0, 1, 2, 3].map((i) => `<rect x="${-54 + i * 24}" y="-46" width="18" height="14" rx="2" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <path d="M52 -46 H60 Q64 -44 65 -34 H52Z" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>
  <rect x="-62" y="-26" width="130" height="4" fill="#1F2937"/><text class="es-unflip" x="-6" y="-14" text-anchor="middle" ${NUN} font-size="7" fill="#1F2937">SCHOOL BUS</text>
  <circle cx="66" cy="-18" r="2.6" fill="#FEF08A" stroke="${L}" stroke-width="0.6"/>${wheel(-36, -8, 9)}${wheel(40, -8, 9)}</g>`;
const MANGO = `<path d="M0 -8 Q10 -4 7 7 Q2 13 -5 9 Q-9 0 0 -8Z" fill="#FBBF24" stroke="${L}" stroke-width="0.9"/><path d="M0 -8 q3 -4 7 -3" stroke="#16A34A" stroke-width="1.6" fill="none"/>`;

const POSES = {
  e104_look: { R: [22, -40], L: [22, -40], dy: 20, head: -10 },
  e104_ask: { R: [140, 160], L: [22, -40], dy: 20, head: -6 },
  e104_give: { R: [70, 92], L: [22, -40], dy: 20 },
  e104_think: { R: [30, -150], L: [22, -40], dy: 20, head: 8 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const twinkles = (x0, x1, y0, y1, n, seed = 7, c = '#FDE68A') => Array.from({ length: n }, (_, i) => {
  const x = x0 + ((i * 97 + seed * 31) % (x1 - x0)), y = y0 + ((i * 53 + seed * 17) % (y1 - y0)), r = 1.6 + (i % 3) * 0.7;
  return `<path class="ek-twinkle" style="animation-delay:${((i % 6) * 0.3).toFixed(1)}s" d="M${x} ${y - r * 2} L${x + r * 0.6} ${y - r * 0.6} L${x + r * 2} ${y} L${x + r * 0.6} ${y + r * 0.6} L${x} ${y + r * 2} L${x - r * 0.6} ${y + r * 0.6} L${x - r * 2} ${y} L${x - r * 0.6} ${y - r * 0.6}Z" fill="${c}"/>`;
}).join('');

const house = () => `<g>
  <rect x="0" y="118" width="220" height="${FLOOR - 118}" fill="#C7B89A" stroke="${L}" stroke-width="1.3"/>
  <path d="M-10 122 L36 74 H196 L232 122Z" fill="#9F1239" stroke="${L}" stroke-width="1.3"/>
  <rect x="26" y="146" width="66" height="56" rx="3" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/><path d="M59 146 V202 M26 174 H92" stroke="#B45309" stroke-width="2.4"/>
  <rect x="${X.door - 28}" y="186" width="56" height="${FLOOR - 186}" rx="3" fill="#FCD34D" stroke="${L}" stroke-width="1.2"/>
  <rect x="${X.door - 28}" y="186" width="20" height="${FLOOR - 186}" fill="#92400E" stroke="${L}" stroke-width="0.9"/></g>`;

const mango = (x) => `<g transform="translate(${x} ${FLOOR})">
  <path d="M-16 0 Q-10 -60 -18 -110 L-4 -112 Q2 -70 14 -112 L26 -108 Q12 -60 18 0Z" fill="#78350F" stroke="${L}" stroke-width="1.2"/>
  <g class="ek-sway" style="transform-origin:0 -110px">
    <ellipse cx="-50" cy="-150" rx="66" ry="44" fill="#14532D" stroke="${L}" stroke-width="1.2"/>
    <ellipse cx="54" cy="-148" rx="70" ry="46" fill="#166534" stroke="${L}" stroke-width="1.2"/>
    <ellipse cx="0" cy="-196" rx="78" ry="48" fill="#15803D" stroke="${L}" stroke-width="1.2"/>
    ${[[-70, -120], [-24, -134], [30, -118], [84, -126], [52, -182]].map(([mx, my]) => `<g transform="translate(${mx} ${my})"><path d="M0 -3 Q8 0 6 10 Q2 16 -4 12 Q-8 4 0 -3Z" fill="#D97706" stroke="${L}" stroke-width="0.9"/></g>`).join('')}
  </g></g>`;

function garden() {
  return `<defs><linearGradient id="e104night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E1B4B"/><stop offset="1" stop-color="#4338CA"/></linearGradient></defs>
  <rect x="0" y="0" width="1000" height="315" fill="url(#e104night)"/>
  <g transform="translate(250 74)"><circle r="20" fill="#FEF9C3"/><circle cx="9" cy="-6" r="18" fill="#2E2A6B"/></g>
  ${twinkles(20, 980, 46, 190, 34)}
  <g class="e104-shoot"><path d="M0 0 L-46 -14" stroke="#FEF9C3" stroke-width="2.4" stroke-linecap="round"/><circle r="2.6" fill="#fff"/></g>
  <g transform="translate(${PSTAR[0]} ${PSTAR[1]})"><g class="e104-pstar"><path d="M0 -6 L1.6 -1.8 L6 -1.6 L2.6 1.2 L3.6 5.6 L0 3.2 L-3.6 5.6 L-2.6 1.2 L-6 -1.6 L-1.6 -1.8Z" fill="#D8B4FE" stroke="#A855F7" stroke-width="0.8"/></g></g>
  <path d="M220 ${FLOOR - 34} Q420 ${FLOOR - 74} 620 ${FLOOR - 40} T1000 ${FLOOR - 44} V${FLOOR} H220Z" fill="#14532D" stroke="${L}" stroke-width="0.8"/>
  <rect x="0" y="${FLOOR - 4}" width="1000" height="${315 - FLOOR + 4}" fill="#166534" stroke="${L}"/>
  ${Array.from({ length: 20 }, (_, i) => `<path d="M${20 + i * 48} ${FLOOR + 12} l3 -7 l3 7" stroke="#22C55E" stroke-width="1.3" fill="none"/>`).join('')}
  ${house()}
  ${mango(X.tree)}
  <!-- đèn lồng -->
  <g transform="translate(${X.lamp} ${FLOOR})"><circle class="e104-glow" cy="-34" r="26" fill="#FDE68A" opacity="0.3"/><path d="M0 0 V-24" stroke="${L}" stroke-width="2"/>
    <ellipse cy="-34" rx="9" ry="11" fill="#F87171" stroke="${L}" stroke-width="1"/><path d="M-4 -45 H4 M-4 -23 H4" stroke="#FACC15" stroke-width="2"/></g>
  <!-- chiếu + ghế đẩu gỗ của Minh -->
  <path d="M370 ${FLOOR + 2} L520 ${FLOOR + 2} L540 ${FLOOR + 16} L352 ${FLOOR + 16}Z" fill="#FCA5A5" stroke="${L}" stroke-width="1"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${380 + i * 26} ${FLOOR + 2} L${372 + i * 30} ${FLOOR + 16}" stroke="#FDE68A" stroke-width="3"/>`).join('')}
  <g transform="translate(${X.minh - 2} ${FLOOR + 4})"><rect x="-17" y="-34" width="6" height="34" fill="#92400E" stroke="${L}" stroke-width="0.8"/><rect x="11" y="-34" width="6" height="34" fill="#92400E" stroke="${L}" stroke-width="0.8"/>
    <rect x="-22" y="-38" width="44" height="8" rx="3" fill="#B45309" stroke="${L}" stroke-width="1"/></g>`;
}

function split() {
  const E0 = 1000, wE = D - E0, wL = 1800 - D;
  const wave = (x, w, c) => `<g class="e104-wave">${Array.from({ length: Math.floor(w / 40) }, (_, i) => `<path d="M${x + 10 + i * 40} ${SEA + 12 + (i % 3) * 12} q6 -4 12 0 q6 4 12 0" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
  return `<defs><linearGradient id="e104earth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#60C5F5"/><stop offset="1" stop-color="#DFF3FD"/></linearGradient>
    <linearGradient id="e104lumo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FB923C"/><stop offset="1" stop-color="#FED7AA"/></linearGradient>
    <linearGradient id="e104pink" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BE185D"/><stop offset="1" stop-color="#F9A8D4"/></linearGradient></defs>
  <rect x="${E0}" y="0" width="${wE}" height="${SEA}" fill="url(#e104earth)"/>
  <rect x="${D}" y="0" width="${wL}" height="${SEA}" fill="url(#e104lumo)"/>
  <!-- mặt trời -->
  <g class="e104-s e104-s1"><g transform="translate(1290 126)">${sun(20)}</g></g>
  <g class="e104-lsun"><g class="e104-s e104-s2"><g transform="translate(1440 100)"><circle r="20" fill="#F97316" stroke="#C2410C" stroke-width="2"/><circle cx="-6" cy="-4" r="2.2" fill="#7C2D12"/><circle cx="6" cy="-4" r="2.2" fill="#7C2D12"/><path d="M-6 6 Q0 10 6 6" stroke="#7C2D12" stroke-width="2" fill="none" stroke-linecap="round"/></g></g>
    <g class="e104-s e104-s3"><g transform="translate(1480 128)"><circle r="14" fill="#FDE047" stroke="#CA8A04" stroke-width="2"/><circle cx="-4" cy="-3" r="1.8" fill="#78350F"/><circle cx="4" cy="-3" r="1.8" fill="#78350F"/><path d="M-4 4 Q0 7 4 4" stroke="#78350F" stroke-width="1.6" fill="none" stroke-linecap="round"/></g></g></g>
  <!-- đêm hồng trên Lumo -->
  <g class="e104-pink"><rect x="${D}" y="0" width="${wL}" height="${SEA}" fill="url(#e104pink)"/>
    <g transform="translate(1520 96)"><circle r="13" fill="#FCE7F3"/><circle cx="6" cy="-4" r="11" fill="#D9418A"/></g><g transform="translate(1576 128)"><circle r="8" fill="#E9D5FF"/></g>
    ${twinkles(D + 20, 1660, 60, 200, 14, 3, '#FEF9C3')}</g>
  <!-- núi pha lê Lumo -->
  ${[[1600, 60, '#C084FC'], [1660, 44, '#A855F7'], [1440, 30, '#D8B4FE']].map(([x, h, c]) => `<path d="M${x - 22} ${SEA} L${x} ${SEA - h} L${x + 22} ${SEA}Z" fill="${c}" stroke="${L}" stroke-width="1"/>`).join('')}
  <path d="M1080 ${SEA} Q1140 ${SEA - 40} 1200 ${SEA} Z" fill="#4ADE80" stroke="${L}" stroke-width="1"/>
  <!-- biển -->
  <rect x="${E0}" y="${SEA}" width="${wE}" height="${SAND - SEA}" fill="#38BDF8" stroke="${L}"/>${wave(E0, wE, '#E0F2FE')}
  <rect x="${D}" y="${SEA}" width="${wL}" height="${SAND - SEA}" fill="#9333EA" stroke="${L}"/>${wave(D, wL, '#F5D0FE')}
  <!-- bãi -->
  <rect x="${E0}" y="${SAND}" width="${wE}" height="${315 - SAND}" fill="#FDE68A" stroke="${L}"/>
  <rect x="${D}" y="${SAND}" width="${wL}" height="${315 - SAND}" fill="#E9D5FF" stroke="${L}"/>
  <!-- vạch giữa -->
  <rect x="${D - 4}" y="0" width="8" height="315" fill="#fff" stroke="${L}" stroke-width="1.2"/>`;
}

function bg() {
  return `${garden()}<rect x="1000" y="0" width="800" height="315" fill="#1E1B4B"/>${split()}`;
}

function fg() {
  // Bố mẹ Bíp vẫy tay trong bong bóng nghĩ
  const home = `<rect x="-78" y="-46" width="156" height="92" rx="12" fill="#FDBA74"/><rect x="-78" y="20" width="156" height="26" fill="#9333EA"/>
    <circle cx="52" cy="-28" r="9" fill="#F97316"/><circle cx="66" cy="-14" r="6" fill="#FDE047"/>
    ${parent('#0EA5E9', '#0369A1', -32, 0.62)}${parent('#F472B6', '#DB2777', 26, 0.6)}`;
  const cross = (x, y, inner, cls) => `<g class="e104-no ${cls}"><g transform="translate(${x} ${y})"><circle r="26" fill="#fff" stroke="${L}" stroke-width="1"/>${inner}
    <circle r="22" fill="none" stroke="#DC2626" stroke-width="4"/><path d="M-15 -15 L15 15" stroke="#DC2626" stroke-width="4"/></g></g>`;
  const RICE = `<path d="M-16 -2 H16 Q15 12 0 13 Q-15 12 -16 -2Z" fill="#fff" stroke="#3B82F6" stroke-width="1.4"/><path d="M-14 -2 Q-12 -14 0 -14 Q12 -14 14 -2Z" fill="#fff" stroke="${L}" stroke-width="0.8"/>
    ${[[-6, -8], [0, -11], [6, -7], [-2, -5], [9, -4]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.6" ry="1" fill="#E5E7EB"/>`).join('')}`;
  const bx = X.bip + BIP_AT.bulbs[1][0], by = FLOOR + BIP_AT.bulbs[1][1];
  return `
  <!-- vạch chấm từ tay Bíp tới ngôi sao tím -->
  <g class="e104-far"><path class="e104-trail" d="M${bx + 4} ${by - 4} Q${bx + 40} ${PSTAR[1] + 30} ${PSTAR[0] - 10} ${PSTAR[1] + 6}" stroke="#D8B4FE" stroke-width="2.4" stroke-dasharray="2 6" stroke-linecap="round" fill="none" pathLength="100"/>
    <circle class="e104-ring" cx="${PSTAR[0]}" cy="${PSTAR[1]}" r="12" fill="none" stroke="#F0ABFC" stroke-width="2"/></g>
  ${thought(548, 112, 176, 108, home, [X.bip + 10, FLOOR - 100], 'e104-bub')}
  <!-- tranh chia đôi: đồ bật lên -->
  ${cross(1534, 190, `<g transform="scale(0.32) translate(0 26)">${BUS.replace(/class="e104-wh"/g, '')}</g>`, 'e104-nobus')}
  ${cross(1456, 186, RICE, 'e104-norice')}
  <g class="e104-pop e104-rice"><g transform="translate(1250 284) scale(1.5)">${RICE}</g><g transform="translate(1250 250)" class="e104-steam">${[-6, 0, 6].map((dx, i) => `<path class="ek-steam" style="animation-delay:${i * 0.5}s" d="M${dx} 0 q-4 -6 0 -12 q4 -6 0 -12" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join('')}</g></g>
  <g class="e104-pop e104-fruit"><g transform="translate(1560 290)"><ellipse cx="0" cy="-20" rx="24" ry="22" fill="#7E22CE" stroke="${L}" stroke-width="1.3"/>
    <path d="M-12 -32 Q-4 -38 4 -36" stroke="#D8B4FE" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M0 -42 q6 -10 16 -8 q-6 8 -16 8Z" fill="#22C55E" stroke="${L}" stroke-width="0.8"/>
    <g class="e104-bite"><circle cx="-22" cy="-24" r="7" fill="#E9D5FF"/><circle cx="-20" cy="-14" r="6" fill="#E9D5FF"/></g></g></g>
  <!-- nhãn -->
  <g class="e104-lb e104-lb-earth">${label(1270, 72, 'Earth', '#1D4ED8', 18)}</g>
  <g class="e104-lb e104-lb-lumo">${label(1530, 72, 'Lumo', '#7E22CE', 18)}</g>
  <g class="e104-lb e104-lb-one">${label(1290, 180, 'one sun', '#EA580C', 14)}</g>
  <g class="e104-lb e104-lb-two">${label(1470, 176, 'two suns', '#EA580C', 14)}</g>
  <g class="e104-lb e104-lb-orange">${label(1520, 200, 'orange', '#EA580C', 15)}</g>
  <g class="e104-lb e104-lb-pinkl">${label(1520, 200, 'pink', '#DB2777', 15)}</g>
  <g class="e104-lb e104-lb-blue">${label(1300, 250, 'blue', '#1D4ED8', 15)}</g>
  <g class="e104-lb e104-lb-purple">${label(1510, 250, 'purple', '#7E22CE', 15)}</g>
  <g class="e104-lb e104-lb-wings">${label(1478, 180, 'wings', '#0369A1', 14)}</g>
  <g class="e104-lb e104-lb-kind">${label(X.minh + 30, 150, 'kind', '#DB2777', 16)}</g>
  <g class="e104-lb e104-lb-stars">${label(560, 150, 'stars', '#CA8A04', 16)}</g>
  <g class="e104-lb e104-lb-tiny">${label(PSTAR[0] - 40, 104, 'tiny purple star', '#A855F7', 13)}</g>
  <g class="e104-lb e104-lb-who">${speaker(X.minh - 4, 150, 'Minh')}</g>
  <g class="e104-q"><g transform="translate(${X.minh + 52} 146)"><text text-anchor="middle" ${NUN} font-size="26" fill="#FDE68A" stroke="#fff" stroke-width="0.6">?</text></g></g>`;
}

const LBS = ['earth', 'lumo', 'one', 'two', 'orange', 'pinkl', 'blue', 'purple', 'wings', 'kind', 'stars', 'tiny', 'who'];
const CSS = `
.e104-lb, .e104-q { opacity: 0; transition: opacity .35s; }
${LBS.map((k) => `.st-lb-${k} .e104-lb-${k}`).join(', ')} { opacity: 1; }
.st-q .e104-q { opacity: 1; }
.st-q .e104-q > g > text { animation: e104Q .5s ease-in-out infinite alternate; }
@keyframes e104Q { to { translate: 0 -5px; } }
.e104-glow { animation: e104Glow 1.6s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
@keyframes e104Glow { from { scale: .85; } to { scale: 1.1; } }
.e104-shoot { opacity: 0; translate: 900px 60px; }
.st-shoot .e104-shoot { animation: e104Shoot 1.4s ease-in .2s both; }
@keyframes e104Shoot { 0% { opacity: 0; translate: 880px 50px; } 20% { opacity: 1; } 100% { opacity: 0; translate: 640px 130px; } }
.e104-pstar { transform-box: fill-box; transform-origin: center; animation: e104Tw 1.4s ease-in-out infinite alternate; }
@keyframes e104Tw { from { scale: .8; } to { scale: 1.1; } }
.st-pstar .e104-pstar { animation: e104Big .5s ease-in-out infinite alternate; }
@keyframes e104Big { from { scale: 1.2; } to { scale: 2; } }
.e104-far { opacity: 0; transition: opacity .3s; }
.st-pstar .e104-far { opacity: 1; }
.e104-trail { stroke-dashoffset: 100; }
.st-pstar .e104-trail { stroke-dashoffset: 0; transition: stroke-dashoffset 1.1s ease-out; }
.e104-ring { transform-box: fill-box; transform-origin: center; }
.st-pstar .e104-ring { animation: e104Ring 1s ease-out infinite; }
@keyframes e104Ring { from { scale: .6; opacity: 1; } to { scale: 1.6; opacity: 0; } }
.e104-s { transform-box: fill-box; transform-origin: center; scale: 0; transition: scale .45s cubic-bezier(.3,1.6,.6,1); }
.st-sun1 .e104-s1, .st-sun2 .e104-s2, .st-sun3 .e104-s3 { scale: 1; }
.e104-lsun { transition: translate 1.4s ease-in, opacity 1.4s; }
.st-pink .e104-lsun { translate: 0 110px; opacity: 0; }
.e104-pink { opacity: 0; transition: opacity 1.4s; }
.st-pink .e104-pink { opacity: 1; }
.e104-wave { animation: e104Wave 2.4s ease-in-out infinite alternate; }
.st-sea .e104-wave { animation-duration: .6s; }
@keyframes e104Wave { to { transform: translateX(14px); } }
.e104-no, .e104-pop { opacity: 0; transform-box: fill-box; transform-origin: center; scale: .3; transition: opacity .2s, scale .4s cubic-bezier(.3,1.6,.6,1); }
.st-nobus .e104-nobus, .st-norice .e104-norice, .st-rice .e104-rice { opacity: 1; scale: 1; }
.e104-fruit { transform-origin: 50% 100%; translate: 0 -120px; }
.st-fruit .e104-fruit { opacity: 1; scale: 1; translate: 0 0; transition: opacity .15s, scale .3s, translate .5s cubic-bezier(.5,0,.8,.6); }
.e104-bite { opacity: 0; }
.st-bite .e104-bite { opacity: 1; }
.e104-bub { opacity: 0; transform: scale(.4); transform-origin: ${X.bip + 10}px ${FLOOR - 100}px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-bub .e104-bub { opacity: 1; transform: none; }
.e104-wing { animation: e104Flap .22s ease-in-out infinite alternate; }
@keyframes e104Flap { from { rotate: -18deg; } to { rotate: 22deg; } }
.es-thing.is-walk .e104-wh { animation: e104Spin .4s linear infinite; transform-box: fill-box; transform-origin: center; }
@keyframes e104Spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .e104-wave { animation-duration: 6s; } .st-sea .e104-wave { animation-duration: 1.6s; }
  .e104-wing { animation-duration: .6s; } .st-pstar .e104-pstar { animation-duration: 1.2s; }
  .es-thing.is-walk .e104-wh { animation-duration: 1s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const pop = (st, k, vol = 0.5, rate = 1) => { st.set(k); st.sfx('pop', { vol, rate }); };

const BEATS = [
  { key: ['One evening', 'look at the stars'], icon: '🌙', label: 'look at the stars', async play(st) {
    st.look(260, { instant: true });
    st.sfx('door-open', { vol: 0.5 });
    await st.wait(300);
    st.sfx('crickets', { vol: 0.5 });
    const b = st.walk('bip', X.bip, { speed: 120, follow: false });
    st.look(X.look, { dur: 2600 });
    await st.walk('minh', X.minh, { speed: 120, follow: false });
    await b;
    st.face('bip', -1);
    st.pose('minh', 'e104_look'); st.sfx('bump', { vol: 0.2, rate: 1.4 });
    st.set('st-lb-stars'); st.set('st-shoot'); st.sfx('whoosh', { vol: 0.3, rate: 1.4 });
    st.mood('minh', 'wow'); st.mood('bip', 'wow');
    await st.wait(1400);
    st.mood('bip', 'happy');
  } },
  { key: ['Where is Lumo?'], icon: '❓', label: 'Where is Lumo?', async play(st) {
    off(st, 'st-lb-stars', 'st-shoot');
    st.look(X.look);
    st.pose('minh', 'e104_ask'); st.mood('minh', 'happy'); st.sfx('pop', { vol: 0.3 });
    await st.say('minh', 'Where is Lumo?', 1700);
  } },
  { key: ['asks Minh'], icon: '🧒', label: 'asks Minh', async play(st) {
    st.look(X.look);
    st.set('st-lb-who'); st.sfx('ding', { vol: 0.3, rate: 1.4 });
    st.pose('minh', 'e104_think');
    await st.wait(300);
    st.set('st-q'); st.sfx('pop', { vol: 0.4, rate: 1.3 });
    st.act('bip', 'look');
    await st.wait(1200);
    st.act('bip', null);
  } },
  { key: ['points to a tiny purple star'], icon: '💜', label: 'tiny purple star', async play(st) {
    off(st, 'st-lb-who', 'st-q');
    st.look(X.look);
    st.pose('minh', 'e104_look');
    st.face('bip', 1); bipSet(st, 'bip', 'bip-wave'); st.mood('bip', 'joy');
    await st.wait(300);
    st.set('st-pstar'); st.sfx('whoosh', { vol: 0.35, rate: 0.9 });
    await st.wait(900);
    st.set('st-lb-tiny'); st.sfx('ding', { vol: 0.4, rate: 1.2 });
    st.mood('minh', 'wow');
    await st.wait(1000);
    bipSet(st, 'bip', 'bip-wave', false);
  } },
  { key: ['very different from Earth', 'says Bip'], icon: '🌍', label: 'different', async play(st) {
    off(st, 'st-pstar', 'st-lb-tiny');
    st.look(X.look);
    st.face('bip', -1); st.mood('bip', 'joy'); st.act('bip', 'hover');
    await st.wait(500);
    st.fx('poof', X.bip, FLOOR - 50);
    await st.wait(400);
    st.act('bip', null);
    st.look(D, { instant: true });
    st.place('bip', D, FLOOR - 70, 1); st.sfx('whoosh', { vol: 0.5 });
    await st.walk('bip', D, { y: FLOOR, speed: 110, follow: false });
    pop(st, 'st-lb-earth', 0.5, 1);
    await st.wait(450);
    pop(st, 'st-lb-lumo', 0.5, 1.2);
    st.mood('bip', 'happy');
    await st.wait(800);
  } },
  { key: ['one sun', 'two suns'], icon: '☀️', label: 'one sun · two suns', async play(st) {
    st.look(D);
    st.face('bip', -1);
    pop(st, 'st-sun1'); st.set('st-lb-one');
    await st.wait(1200);
    st.face('bip', 1);
    pop(st, 'st-sun2', 0.5, 1.1);
    await st.wait(380);
    pop(st, 'st-sun3', 0.5, 1.3); st.set('st-lb-two');
    st.mood('bip', 'joy');
    await st.wait(1000);
    st.mood('bip', 'happy');
  } },
  { key: ['orange in the day', 'pink at night'], icon: '🌅', label: 'orange · pink', async play(st) {
    off(st, 'st-lb-one', 'st-lb-two');
    st.look(D);
    st.face('bip', 1);
    st.set('st-lb-orange'); st.sfx('ding', { vol: 0.4 });
    await st.wait(1200);
    st.set('st-lb-orange', false);
    st.set('st-pink'); st.sfx('wind', { vol: 0.35 });
    await st.wait(900);
    st.set('st-lb-pinkl'); st.sfx('crickets', { vol: 0.35 });
    st.mood('bip', 'wow');
    await st.wait(1000);
  } },
  { key: ['Your sea is blue', 'our sea is purple'], icon: '🌊', label: 'blue · purple sea', async play(st) {
    off(st, 'st-lb-pinkl', 'st-pink');
    st.look(D);
    st.mood('bip', 'happy');
    st.set('st-sea');
    st.face('bip', -1);
    st.set('st-lb-blue'); st.sfx('splash', { vol: 0.5 });
    await st.wait(1100);
    st.face('bip', 1);
    st.set('st-lb-purple'); st.sfx('splash', { vol: 0.5, rate: 0.8 });
    await st.wait(1100);
  } },
  { key: ['don\'t go to school by bus'], icon: '🚌', label: 'no bus', async play(st) {
    off(st, 'st-sea', 'st-lb-blue', 'st-lb-purple');
    st.look(D);
    st.show('bus', true);
    st.face('bip', -1);
    await st.loop('bus', () => st.walk('bus', 1290, { speed: 150, follow: false }), { vol: 0.7 });
    st.sfx('beep', { vol: 0.4 });
    await st.wait(300);
    st.face('bip', 1);
    pop(st, 'st-nobus'); st.sfx('buzz-no', { vol: 0.5 });
    st.mood('bip', 'joy');
    await st.wait(1200);
  } },
  { key: ['They fly', 'small wings on their shoes'], icon: '🪽', label: 'wings on shoes', async play(st) {
    st.set('st-nobus', false);
    st.look(D);
    st.sfx('bus', { vol: 0.4 });
    const away = st.walk('bus', 920, { speed: 220, follow: false });
    st.show('k1', true); st.show('k2', true);
    st.sfx('whoosh', { vol: 0.5 });
    await Promise.all([
      st.walk('k1', 1538, { y: FLOOR - 100, speed: 130, follow: false }),
      st.walk('k2', 1612, { y: FLOOR - 56, speed: 130, follow: false }),
    ]);
    st.act('k1', 'hover'); st.act('k2', 'hover');
    st.set('st-lb-wings'); st.sfx('giggle', { vol: 0.45, rate: 1.3 });
    st.mood('bip', 'joy'); bipSet(st, 'bip', 'bip-wave');
    await st.wait(1100);
    bipSet(st, 'bip', 'bip-wave', false);
    await away; st.show('bus', false);
  } },
  { key: ['don\'t eat rice', 'big purple fruit'], icon: '🍇', label: 'purple fruit', async play(st) {
    st.set('st-lb-wings', false);
    st.look(D);
    st.act('k1', 'hover'); st.act('k2', 'hover');
    st.face('bip', -1); st.mood('bip', 'happy');
    pop(st, 'st-rice');
    await st.wait(500);
    st.face('bip', 1);
    pop(st, 'st-norice', 0.4, 1.2); st.sfx('buzz-no', { vol: 0.45 });
    await st.wait(900);
    st.set('st-fruit'); st.sfx('whoosh', { vol: 0.3, rate: 1.3 });
    await st.wait(500); st.sfx('bump', { vol: 0.6 });
    await st.walk('bip', 1516, { speed: 100, follow: false });
    st.sfx('crunch', { vol: 0.7 }); st.set('st-bite');
    st.mood('bip', 'joy'); st.act('bip', 'jump');
    await st.wait(1000);
    st.act('bip', null);
  } },
  { key: ['I like Earth', 'people are kind here'], icon: '💛', label: 'people are kind', async play(st) {
    off(st, 'st-rice', 'st-norice', 'st-fruit', 'st-bite');
    st.sfx('whoosh', { vol: 0.45, rate: 0.9 });
    st.place('bip', X.bip, FLOOR, -1);
    st.look(X.look, { instant: true });
    st.mood('bip', 'happy');
    st.pose('minh', 'e104_give'); st.mood('minh', 'joy');
    await st.wait(300);
    await st.fly(MANGO, [X.minh + 22, FLOOR - 72], [X.bip - 6, FLOOR - 50], { size: 26, dur: 650 });
    st.sfx('click', { vol: 0.5 });
    bipSet(st, 'bip', 'bip-glow'); st.mood('bip', 'joy');
    st.fx('hearts', (X.minh + X.bip) / 2 + 10, FLOOR - 100);
    st.set('st-lb-kind');
    await st.wait(1400);
    st.pose('minh', 'e104_look');
  } },
  { key: ['I miss my mum and dad'], icon: '🥺', label: 'miss mum and dad', async play(st) {
    st.set('st-lb-kind', false);
    st.look(X.look);
    bipSet(st, 'bip', 'bip-glow', false);
    bipSet(st, 'bip', 'bip-sad'); st.mood('bip', 'sad'); st.sfx('beep', { vol: 0.35, rate: 0.6 });
    await st.wait(400);
    st.set('st-bub'); st.sfx('pop', { vol: 0.4 });
    st.sfx('wind', { vol: 0.25 });
    st.mood('minh', 'sad');
    await st.wait(1300);
    st.pose('minh', 'e104_give'); st.sfx('hearts', { vol: 0.35 });
    await st.wait(1000);
  } },
];

export default {
  id: 'en104', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + BIP_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  order: [0, 3, 5, 6, 9, 12],
  cast: [
    { id: 'ship', kind: 'thing', svg: SHIP_SVG, box: SHIP_BOX, x: X.ship, s: 0.85 },
    { id: 'bus', kind: 'thing', svg: BUS, box: [-66, -56, 136, 58], x: 1060, y: 304, s: 0.62 },
    { id: 'k1', kind: 'thing', svg: kid('#F472B6', '#DB2777'), box: BIP_BOX, x: 1700, y: FLOOR - 140, face: -1 },
    { id: 'k2', kind: 'thing', svg: kid('#22D3EE', '#0891B2'), box: BIP_BOX, x: 1780, y: FLOOR - 100, face: -1, s: 0.9 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.door },
    { id: 'bip', kind: 'thing', svg: BIP_SVG, box: BIP_BOX, x: X.door + 50 },
  ],
  init(st) {
    bipSet(st, 'ship', 'ship-broken');
    for (const id of ['bus', 'k1', 'k2']) st.show(id, false);
  },
};
