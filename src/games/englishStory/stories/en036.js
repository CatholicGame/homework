/**
 * Bài 36 "How Do You Go to School?": lớp học của cô Hoa, cả dãy cửa sổ lớn nhìn ra phố (xa có đồi và đường tàu, trên trời
 * có máy bay). Mỗi câu trả lời là một xe chạy qua cửa sổ: xe buýt của Tom, xe máy, ô tô của bố, xe đạp của mẹ, tàu hoả
 * đi Nam Định, máy bay sang Úc. Bong bóng nghĩ cho "đi bộ", "gần", "xa"; đồng hồ trên tường quay 20 phút.
 * Toạ độ cảnh: rộng 1240, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { carSvg } from '../rig.js';
import { KIT_CSS, L, cloud, tree, label, room, board, desk, sun } from '../kit.js';

const FLOOR = 282;
const WIN = [[440, 220], [700, 220], [960, 220]]; // [x, rộng], cửa sổ từ y 62 tới 178
const WY = 62, WB = 178, ROAD = 174;

Object.assign(CAST, {
  e036_kidA: { hair: 'pigtails', top: 'uniform', shirt: '#FFFFFF', bottom: 'skirt', bottomC: '#1E3A6E', shoe: '#F472B6' },
  e036_kidB: { hair: 'bowl', top: 'uniform', shirt: '#FFFFFF', bottom: 'shorts', bottomC: '#1E3A6E', shoe: '#2563EB' },
});

// ── Xe cộ (nhìn nghiêng, chạy sang phải, gốc = mặt đường) ──────────────────────
const wheel = (x, r, y = -r) => `<g transform="translate(${x} ${y})"><g class="e036-wheel"><circle r="${r}" fill="#1F2937" stroke="${L}" stroke-width="0.8"/><circle r="${r * 0.45}" fill="#CBD5E1"/><path d="M${-r * 0.45} 0 H${r * 0.45} M0 ${-r * 0.45} V${r * 0.45}" stroke="#64748B" stroke-width="1"/></g></g>`;
/** Đầu nhìn nghiêng nhỏ (quay phải), tâm (0, 0). helmet: màu mũ bảo hiểm. */
const sideHead = (hair, helmet, r = 8) => `<circle r="${r}" fill="#FDDCB5" stroke="${L}" stroke-width="0.8"/><path d="M${r * 0.9} -1 q2.4 2 0.4 4" fill="#FDDCB5" stroke="${L}" stroke-width="0.7"/>
  <circle cx="${r * 0.5}" cy="-1" r="1.2" fill="#2B1D16"/><path d="M${r * 0.4} ${r * 0.5} q1.4 1 2.6 0" stroke="#9A3B2E" stroke-width="0.8" fill="none"/>
  ${helmet ? `<path d="M${-r * 1.1} 0 Q${-r * 1.1} ${-r * 1.25} 0 ${-r * 1.2} Q${r * 1.1} ${-r * 1.2} ${r * 1.05} -1 Z" fill="${helmet}" stroke="${L}" stroke-width="0.8"/>`
    : `<path d="M${-r} ${r * 0.3} Q${-r * 1.1} ${-r * 1.1} ${r * 0.2} ${-r * 1.05} Q${r * 0.9} ${-r * 0.8} ${r * 0.8} ${-r * 0.4} Q0 ${-r * 0.5} ${-r * 0.4} ${r * 0.5}Z" fill="${hair}"/>`}`;
/** Người ngồi xe nhìn nghiêng: thân, tay với ghi-đông, chân xuống bàn đạp. */
const rider = (shirt, pants, hair, helmet, { r = 8, h = 1 } = {}) => `<path d="M-2 0 L10 0 L12 18" stroke="${L}" stroke-width="6.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2 0 L10 0 L12 18" stroke="${pants}" stroke-width="4.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M-6 2 L-3 ${-24 * h} L7 ${-24 * h} L6 2Z" fill="${shirt}" stroke="${L}" stroke-width="0.8"/>
  <path d="M3 ${-20 * h} L18 ${-10 * h}" stroke="${L}" stroke-width="4.6" stroke-linecap="round"/><path d="M3 ${-20 * h} L18 ${-10 * h}" stroke="#FDDCB5" stroke-width="3.2" stroke-linecap="round"/>
  <g transform="translate(2 ${-24 * h - r})">${sideHead(hair, helmet, r)}</g>`;
const BIKE = (frame, who) => `${wheel(-16, 11)}${wheel(18, 11)}
  <path d="M-16 -11 L0 -11 L-4 -30 M0 -11 L14 -28 L-4 -28 M18 -11 L14 -28 L13 -34" stroke="${frame}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 -35 H17" stroke="#1F2937" stroke-width="2.4" stroke-linecap="round"/><rect x="-10" y="-33" width="11" height="4" rx="2" fill="#1F2937"/>
  ${who ? `<g transform="translate(-6 -32)">${who}</g>` : `<path d="M14 -30 h10 v8 h-10Z" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/>`}`;
const MOTO = (c, a, b) => `${wheel(-20, 10)}${wheel(22, 10)}
  <path d="M-30 -14 Q-26 -26 -10 -26 H6 L14 -14 Z" fill="${c}" stroke="${L}" stroke-width="0.9"/><path d="M8 -20 L18 -38 M14 -38 H22" stroke="#334155" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M10 -24 Q22 -26 26 -14 H12Z" fill="${c}" stroke="${L}" stroke-width="0.9"/><rect x="-24" y="-30" width="30" height="5" rx="2" fill="#1F2937"/>
  <g transform="translate(-16 -30)">${b}</g><g transform="translate(-2 -30)">${a}</g>`;
const BUS = `${wheel(-62, 13)}${wheel(58, 13)}
  <path d="M-96 -12 V-66 Q-96 -74 -88 -74 H86 Q100 -74 100 -60 V-12Z" fill="#FACC15" stroke="${L}" stroke-width="1.2"/>
  ${[-84, -54, -24, 6, 36].map((x) => `<rect x="${x}" y="-64" width="24" height="20" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <path d="M68 -64 H92 Q96 -64 96 -58 V-44 H68Z" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>
  ${[-72, -42, 18].map((x) => `<g transform="translate(${x} -48)">${sideHead(['#1F1716', '#7C2D12', '#1F1716'][(x + 72) % 3], '', 6)}</g>`).join('')}<g transform="translate(-12 -48)">${sideHead('#E0A33A', '', 6)}</g>
  <path d="M-96 -36 H100" stroke="#1F2937" stroke-width="3"/><text x="-10" y="-20" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="10" fill="#1F2937">SCHOOL BUS</text>
  <rect x="94" y="-30" width="7" height="6" rx="2" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/>`;
const TRAIN = `${[0, 1, 2, 3].map((i) => `<g transform="translate(${-i * 46} 0)"><rect x="-20" y="-20" width="42" height="17" rx="4" fill="${i ? '#F8FAFC' : '#EF4444'}" stroke="${L}" stroke-width="0.8"/>
  <path d="M-20 -14 H22" stroke="${i ? '#3B82F6' : '#FDE68A'}" stroke-width="2"/>${[-14, -4, 6].map((x) => `<rect x="${x}" y="-18" width="7" height="5" rx="1" fill="#BAE6FD"/>`).join('')}
  <circle cx="-12" cy="-2" r="2.6" fill="#1F2937"/><circle cx="14" cy="-2" r="2.6" fill="#1F2937"/></g>`).join('')}
  <path d="M22 -20 Q30 -20 32 -6 L22 -3Z" fill="#EF4444" stroke="${L}" stroke-width="0.8"/>`;
const PLANE = `<path d="M-40 0 Q-40 -7 -30 -7 H24 Q36 -7 40 0 Q36 5 24 5 H-30 Q-40 5 -40 0Z" fill="#fff" stroke="${L}" stroke-width="0.9"/>
  <path d="M-34 -6 L-40 -20 H-32 L-22 -6Z" fill="#3B82F6" stroke="${L}" stroke-width="0.8"/><path d="M-4 2 L-16 18 H-8 L10 2Z" fill="#93C5FD" stroke="${L}" stroke-width="0.8"/>
  ${[-20, -12, -4, 4, 12, 20].map((x) => `<circle cx="${x}" cy="-2" r="1.6" fill="#38BDF8"/>`).join('')}<path d="M30 -5 Q36 -4 37 0 H30Z" fill="#38BDF8"/>`;

const DAD_CAR = `<g transform="scale(0.6)">${carSvg(headOnly('en_dad', { s: 0.8 }))}</g>`;
const MUM_BIKE = `<g transform="scale(0.9)">${BIKE('#EC4899', rider('#86EFAC', '#475569', '#1F1716', '#F472B6'))}</g>`;
const HOA_BIKE = `<g transform="scale(0.9)">${BIKE('#3B82F6', '')}</g>`;
const MOTO1 = `<g transform="scale(0.9)">${MOTO('#3B82F6', rider('#475569', '#1F2937', '#1F1716', '#EF4444', { r: 7.6 }), rider('#F9A8D4', '#1E3A6E', '#1F1716', '#FACC15', { r: 6.6, h: 0.8 }))}</g>`;
const MOTO2 = `<g transform="scale(0.9)">${MOTO('#EF4444', rider('#FDE68A', '#334155', '#1F1716', '#22C55E', { r: 7.6 }), rider('#93C5FD', '#1E3A6E', '#1F1716', '#F97316', { r: 6.6, h: 0.8 }))}</g>`;

/** Bong bóng nghĩ (fg), tâm (x, y). */
const thought = (x, y, w, h, inner, cls, tx) => `<g class="e036-bub ${cls}" style="transform-origin:${x}px ${y + h / 2}px">
  <circle cx="${tx}" cy="${y + h / 2 + 12}" r="4" fill="#fff" stroke="${L}"/><circle cx="${tx + (tx < x ? -6 : 6)}" cy="${y + h / 2 + 24}" r="2.6" fill="#fff" stroke="${L}"/>
  <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2.6}" fill="#fff" stroke="${L}" stroke-width="1.2"/>${inner}</g>`;
const miniHouse = (x, y, roof) => `<g transform="translate(${x} ${y})"><path d="M-14 -12 L0 -24 L14 -12Z" fill="${roof}" stroke="${L}" stroke-width="0.8"/><rect x="-11" y="-12" width="22" height="16" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/><rect x="-3" y="-6" width="6" height="10" fill="#B45309"/></g>`;
const miniSchool = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-20 -14 L0 -26 L20 -14Z" fill="#EF4444" stroke="${L}" stroke-width="0.8"/><rect x="-17" y="-14" width="34" height="18" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>
  <path d="M14 -14 V-34" stroke="#78716C" stroke-width="1.2"/><rect x="14" y="-34" width="10" height="7" fill="#DA251D"/><rect x="-4" y="-6" width="8" height="10" fill="#B45309"/></g>`;
/** Hai bạn nhỏ đi bộ (nhìn nghiêng, chân bước). */
const walker = (shirt, hair) => `<g class="e036-legA" style="transform-origin:0px -10px"><path d="M0 -10 L0 0" stroke="${L}" stroke-width="3.4" stroke-linecap="round"/></g><g class="e036-legB" style="transform-origin:0px -10px"><path d="M0 -10 L0 0" stroke="${L}" stroke-width="3.4" stroke-linecap="round"/></g>
  <rect x="-4" y="-22" width="8" height="13" rx="2" fill="${shirt}" stroke="${L}" stroke-width="0.6"/><g transform="translate(0 -28)">${sideHead(hair, '', 6)}</g>`;

function bg() {
  const outside = `<defs><clipPath id="e036win">${WIN.map(([x, w]) => `<rect x="${x}" y="${WY}" width="${w}" height="${WB - WY}"/>`).join('')}</clipPath>
    <linearGradient id="e036sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#60C5F5"/><stop offset="1" stop-color="#DFF3FD"/></linearGradient></defs>
  <g clip-path="url(#e036win)">
    <rect x="420" y="${WY}" width="800" height="${WB - WY}" fill="url(#e036sky)"/>
    <g transform="translate(1110 92)">${sun(14)}</g>${cloud(520, 86, 0.6, 0)}${cloud(860, 78, 0.7, 3)}
    <path d="M420 136 Q560 106 700 126 T980 118 T1220 128 V${WB} H420Z" fill="#86EFAC" stroke="${L}" stroke-width="0.8"/>
    <path d="M420 132 Q600 120 820 128 T1220 124" stroke="#78716C" stroke-width="2.4" fill="none"/>
    <path d="M420 134 Q600 122 820 130 T1220 126" stroke="#A8A29E" stroke-width="1" stroke-dasharray="2 3" fill="none"/>
    <g transform="translate(330 129)"><g class="e036-train">${TRAIN}</g></g>
    ${tree(600, 150, 0.32, '')}${tree(1000, 148, 0.36, '')}
    <rect x="420" y="150" width="800" height="${WB - 150}" fill="#64748B"/><rect x="420" y="148" width="800" height="4" fill="#E5E7EB"/>
    ${Array.from({ length: 12 }, (_, i) => `<rect x="${430 + i * 66}" y="163" width="26" height="2.6" rx="1.3" fill="#F8FAFC"/>`).join('')}
    <g transform="translate(560 ${ROAD - 18})"><g class="e036-hoabike">${HOA_BIKE}</g></g>
    <g transform="translate(330 ${ROAD})"><g class="e036-veh e036-bus">${BUS}</g></g>
    <g transform="translate(360 ${ROAD})"><g class="e036-veh e036-moto1">${MOTO1}</g></g>
    <g transform="translate(250 ${ROAD})"><g class="e036-veh e036-moto2">${MOTO2}</g></g>
    <g transform="translate(360 ${ROAD})"><g class="e036-veh e036-car">${DAD_CAR}</g></g>
    <g transform="translate(400 ${ROAD - 1})"><g class="e036-veh e036-mum">${MUM_BIKE}</g></g>
    <g transform="translate(1270 84)"><g class="e036-plane"><path class="e036-trail" d="M40 0 H160" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.9"/><g transform="scale(-1 1)">${PLANE}</g></g></g>
  </g>
  ${WIN.map(([x, w]) => `<rect x="${x - 6}" y="${WY - 6}" width="${w + 12}" height="${WB - WY + 12}" rx="4" fill="none" stroke="#fff" stroke-width="8"/><rect x="${x - 10}" y="${WY - 10}" width="${w + 20}" height="${WB - WY + 20}" rx="5" fill="none" stroke="${L}" stroke-width="1.2"/>
    <path d="M${x + w / 2} ${WY} V${WB}" stroke="#fff" stroke-width="4"/><rect x="${x - 12}" y="${WB + 4}" width="${w + 24}" height="7" rx="2" fill="#E9D5B5" stroke="${L}" stroke-width="0.8"/>`).join('')}`;
  return `
  ${room(0, 1240, FLOOR, '#FEF9C3', '#D9A066')}
  ${outside}
  ${board(60, 66, 250, 90)}
  <g class="e036-q e036-q1"><text x="185" y="104" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="15" fill="#F8FAFC">How do you go</text><text x="185" y="126" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="15" fill="#F8FAFC">to school?</text></g>
  <g class="e036-q e036-q2"><text x="185" y="104" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="15" fill="#F8FAFC">How do you go</text><text x="185" y="126" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="15" fill="#FDE047">to Nam Dinh?</text></g>
  <rect x="60" y="158" width="250" height="5" rx="2" fill="#A16207" stroke="${L}" stroke-width="0.6"/>
  <!-- Đồng hồ giữa hai cửa sổ -->
  <g transform="translate(930 92)"><circle r="16" fill="#fff" stroke="#EF4444" stroke-width="3"/>${Array.from({ length: 12 }, (_, i) => `<path d="M0 -13 V-11" stroke="${L}" stroke-width="1.2" transform="rotate(${i * 30})"/>`).join('')}
    <path d="M0 0 V-7" stroke="${L}" stroke-width="2" stroke-linecap="round" transform="rotate(-60)"/>
    <g class="e036-min"><path d="M0 0 V-11" stroke="#1D4ED8" stroke-width="1.6" stroke-linecap="round"/></g><circle r="1.6" fill="${L}"/>
    <path class="e036-arc" d="M0 -20 A20 20 0 0 1 17.3 10" stroke="#F97316" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  <g class="e036-lb e036-lb-min">${label(930, 64, '20 minutes', '#EA580C', 12)}</g>
  <!-- Tranh ảnh trên tường -->
  <g transform="translate(402 120)"><rect x="-22" y="-26" width="44" height="52" rx="3" fill="#fff" stroke="${L}"/><text x="0" y="-6" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="13" fill="#2563EB">ABC</text><text x="0" y="14" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="13" fill="#DC2626">123</text></g>
  <g class="e036-lb e036-lb-bus">${label(560, 120, 'by bus', '#CA8A04', 13)}</g>
  <g class="e036-lb e036-lb-moto">${label(820, 112, 'by motorbike', '#2563EB', 13)}</g>
  <g class="e036-lb e036-lb-car">${label(560, 120, 'by car', '#DC2626', 13)}</g>
  <g class="e036-lb e036-lb-bike">${label(560, 120, 'by bike', '#DB2777', 13)}</g>
  <g class="e036-lb e036-lb-hoa">${label(560, 112, 'by bike too', '#2563EB', 13)}</g>
  <g class="e036-lb e036-lb-train">${label(720, 104, 'by train', '#DC2626', 13)}</g>
  <g class="e036-lb e036-lb-plane">${label(700, 120, 'by plane', '#0369A1', 13)}</g>`;
}

function fg() {
  const footBub = `<g transform="translate(660 112)">${walker('#4A8FE0', '#1F1716')}</g><g transform="translate(686 112)">${walker('#FFFFFF', '#1F1716')}</g>
    <path d="M640 116 H740" stroke="#D6D3D1" stroke-width="2" stroke-dasharray="4 3"/><text x="720" y="98" font-family="Nunito, sans-serif" font-weight="900" font-size="11" fill="#16A34A">on foot</text>`;
  const nearBub = `${miniHouse(660, 116, '#F97316')}${miniSchool(730, 116)}<path d="M674 118 H712" stroke="#16A34A" stroke-width="2.4" stroke-dasharray="3 3"/>
    <text x="693" y="88" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="11" fill="#16A34A">near</text>`;
  const farBub = `${miniHouse(812, 118, '#22C55E')}${miniSchool(944, 118)}<path d="M826 120 Q850 104 870 120 T914 118 L924 118" stroke="#DC2626" stroke-width="2.4" stroke-dasharray="3 3" fill="none"/>
    <text x="878" y="90" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="11" fill="#DC2626">far</text>`;
  const globe = `<g transform="translate(200 206)"><path d="M-10 22 H10 L6 16 H-6Z" fill="#A16207" stroke="${L}" stroke-width="0.8"/><path d="M0 16 V12" stroke="${L}" stroke-width="2"/>
    <clipPath id="e036globe"><circle r="14"/></clipPath><circle r="14" fill="#38BDF8" stroke="${L}" stroke-width="1"/>
    <g clip-path="url(#e036globe)"><g class="e036-earth"><path d="M-30 -8 q8 -6 14 0 q4 8 -4 12 q-8 2 -10 -12Z M-4 -10 q6 -4 10 2 q-2 10 -8 8Z M24 -8 q8 -6 14 0 q4 8 -4 12 q-8 2 -10 -12Z M50 -10 q6 -4 10 2 q-2 10 -8 8Z" fill="#22C55E"/>
      <path class="e036-oz" d="M4 4 q6 -3 10 1 q1 6 -5 6 q-5 -1 -5 -7Z" fill="#F97316" stroke="${L}" stroke-width="0.5"/></g></g>
    <path d="M-17 0 A17 17 0 0 1 0 -17" stroke="#A16207" stroke-width="2" fill="none"/></g>`;
  return `
  <!-- Bàn cô giáo -->
  <rect x="134" y="228" width="140" height="${FLOOR - 228}" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="128" y="222" width="152" height="9" rx="3" fill="#D97706" stroke="${L}"/>
  <rect x="150" y="240" width="40" height="30" rx="3" fill="#92400E"/><circle cx="182" cy="255" r="2.4" fill="#FDE68A"/>
  <g transform="translate(250 222)"><rect x="-14" y="-8" width="28" height="8" rx="1" fill="#3B82F6" stroke="${L}" stroke-width="0.7"/><rect x="-12" y="-14" width="24" height="6" rx="1" fill="#EF4444" stroke="${L}" stroke-width="0.7"/></g>
  ${globe}
  ${[520, 600, 720, 860, 1000].map((x) => desk(x, FLOOR, '#F59E0B')).join('')}
  ${thought(695, 106, 130, 48, footBub, 'e036-bubFoot', 620)}
  ${thought(695, 106, 130, 48, nearBub, 'e036-bubNear', 620)}
  ${thought(878, 108, 170, 50, farBub, 'e036-bubFar', 866)}
  <g class="e036-lb e036-lb-q">${label(470, 128, '?', '#EA580C', 18)}</g>
  <g class="e036-lb e036-lb-oz">${label(200, 172, 'Australia', '#EA580C', 12)}</g>
  <g class="e036-lb e036-lb-laugh">${label(760, 150, 'Ha ha ha!', '#DB2777', 16)}</g>`;
}

const CSS = `
.e036-lb { opacity: 0; transition: opacity .35s; }
${['min', 'bus', 'moto', 'car', 'bike', 'hoa', 'train', 'plane', 'q', 'oz', 'laugh'].map((k) => `.st-lb-${k} .e036-lb-${k}`).join(', ')} { opacity: 1; }
.e036-q { opacity: 0; transition: opacity .5s; } .st-q1 .e036-q1, .st-q2 .e036-q2 { opacity: 1; }
.e036-bub { opacity: 0; transform: scale(.4); transition: opacity .3s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-bubFoot .e036-bubFoot, .st-bubNear .e036-bubNear, .st-bubFar .e036-bubFar { opacity: 1; transform: scale(1); }
.e036-legA { animation: e036Leg .3s ease-in-out infinite alternate; } .e036-legB { animation: e036Leg .3s ease-in-out infinite alternate-reverse; }
@keyframes e036Leg { from { transform: rotate(-24deg); } to { transform: rotate(24deg); } }
.st-bus .e036-bus { animation: e036Drive 3.4s linear forwards; }
.st-moto .e036-moto1 { animation: e036Drive 3s linear forwards; }
.st-moto .e036-moto2 { animation: e036Drive 3s linear .7s forwards; }
.st-car .e036-car { animation: e036Drive 2.8s linear forwards; }
.st-mum .e036-mum { animation: e036Drive 3.6s linear forwards; }
@keyframes e036Drive { to { transform: translateX(980px); } }
.st-bus .e036-wheel, .st-moto .e036-wheel, .st-car .car-wheel, .st-mum .e036-wheel { animation: e036Spin .4s linear infinite; }
@keyframes e036Spin { to { transform: rotate(360deg); } }
.st-train .e036-train { animation: e036Train 4s linear forwards; }
@keyframes e036Train { to { transform: translateX(1080px); } }
.st-plane .e036-plane { animation: e036Plane 3.6s linear forwards; }
@keyframes e036Plane { to { transform: translateX(-980px) translateY(-6px); } }
.e036-hoabike { transition: transform .4s cubic-bezier(.3,1.6,.6,1); transform-origin: 0 0; }
.st-hoa .e036-hoabike { transform: scale(1.25); }
.e036-min { transition: transform 2.2s ease-in-out; } .st-min .e036-min { transform: rotate(120deg); }
.e036-arc { opacity: 0; transition: opacity .4s; } .st-min .e036-arc { opacity: 1; }
.e036-earth { transition: transform 2s ease-out; } .st-globe .e036-earth { transform: translateX(-12px); }
.e036-oz { transition: transform .4s; transform-box: fill-box; transform-origin: center; } .st-globe .e036-oz { transform: scale(1.4); }
@media (prefers-reduced-motion: reduce) { .e036-legA, .e036-legB { animation-duration: .8s; } }
`;

const POSES = {
  e036_sitRaise: { R: [160, 178], L: [40, 110], dy: 20 },
  e036_ask: { R: [62, 52], L: [10, 4], head: 9 },
  e036_plane: { R: [90, 96], L: [90, 96], head: -4 },
  e036_sitLaugh: { R: [40, -90], L: [40, -90], dy: 20, head: -6 },
};

const KIDS = ['minh', 'lan', 'kidA', 'tom', 'kidB'];

/** Một bạn đứng dậy trả lời rồi ngồi xuống. */
async function answer(st, id, text, ms, pose = 'stand') {
  st.pose(id, pose); st.mood(id, 'joy');
  await st.wait(250);
  await st.say(id, text, ms);
}

const BEATS = [
  { key: ['How do you go to school'], icon: '🏫', label: 'How do you go?', async play(st) {
    st.look(330);
    st.pose('hoa', 'point'); st.set('st-q1'); st.sfx('sparkle', { vol: 0.5 });
    await st.say('hoa', 'How do you go to school?', 2200);
    st.pose('hoa', 'stand');
    st.pose('minh', 'e036_sitRaise'); st.pose('lan', 'e036_sitRaise'); st.pose('kidA', 'e036_sitRaise');
    await st.wait(500);
  } },
  { key: ['on foot'], icon: '🚶', label: 'on foot', async play(st) {
    st.look(620);
    st.pose('lan', 'sit'); st.pose('kidA', 'sit');
    st.pose('minh', 'point'); st.mood('minh', 'joy');
    st.set('st-bubFoot');
    await st.say('minh', 'Lan and I go on foot.', 2200);
    st.mood('lan', 'joy');
    await st.wait(300);
  } },
  { key: ['near our house'], icon: '🏠', label: 'near', async play(st) {
    st.look(620);
    st.set('st-bubFoot', false); st.set('st-bubNear');
    st.pose('minh', 'stand');
    await st.say('minh', 'Our school is near our house.', 2300);
    st.set('st-bubNear', false); st.pose('minh', 'sit'); st.mood('minh', 'happy'); st.mood('lan', 'happy');
  } },
  { key: ['far from school'], icon: '🛣️', label: 'far', async play(st) {
    await st.look(860, { dur: 900 });
    st.set('st-bubFar'); st.pose('tom', 'e036_sitLaugh'); st.mood('tom', 'wow');
    await st.wait(2000);
  } },
  { key: ['I go by bus'], icon: '🚌', label: 'by bus', async play(st) {
    st.look(760);
    st.set('st-bubFar', false);
    st.pose('tom', 'pointUp'); st.mood('tom', 'joy');
    st.set('st-bus'); st.set('st-lb-bus'); st.sfx('car-go', { vol: 0.6 });
    await st.say('tom', 'I go by bus.', 1800);
    await st.wait(1500);
    st.set('st-bus', false); st.set('st-lb-bus', false); st.pose('tom', 'stand');
  } },
  { key: ['twenty minutes'], icon: '⏱️', label: 'twenty minutes', async play(st) {
    st.look(860);
    st.pose('tom', 'point');
    st.set('st-min'); st.set('st-lb-min'); st.sfx('alarm-clock', { vol: 0.25 });
    await st.say('tom', 'It takes twenty minutes.', 2400);
    st.set('st-lb-min', false); st.set('st-min', false); st.pose('tom', 'sit'); st.mood('tom', 'happy');
  } },
  { key: ['go by motorbike'], icon: '🛵', label: 'by motorbike', async play(st) {
    st.look(800);
    st.set('st-moto'); st.set('st-lb-moto'); st.sfx('car-go', { vol: 0.5, rate: 1.3 });
    st.pose('kidA', 'e036_sitRaise'); st.mood('kidA', 'joy'); st.mood('kidB', 'joy');
    await st.wait(3600);
    st.set('st-moto', false); st.set('st-lb-moto', false); st.pose('kidA', 'sit');
  } },
  { key: ['How does your dad go to work'], icon: '👨', label: 'your dad?', async play(st) {
    await st.walk('hoa', 452, { speed: 120, lead: 60 });
    await st.walk('hoa', 450, { speed: 60, follow: false });
    st.pose('hoa', 'e036_ask');
    await st.say('hoa', 'How does your dad go to work?', 2400);
  } },
  { key: ['asks Ms Hoa'], icon: '❔', label: 'asks', async play(st) {
    st.look(510);
    st.pose('hoa', 'point'); st.set('st-lb-q');
    st.mood('minh', 'wow');
    await st.wait(1300);
    st.set('st-lb-q', false); st.pose('hoa', 'stand');
  } },
  { key: ['He goes by car'], icon: '🚗', label: 'by car', async play(st) {
    st.look(530);
    await answer(st, 'minh', 'He goes by car.', 1600);
    st.set('st-car'); st.set('st-lb-car'); st.sfx('car-go', { vol: 0.6 });
    st.pose('minh', 'pointUp');
    await st.wait(2400);
    st.set('st-car', false); st.set('st-lb-car', false); st.pose('minh', 'stand');
  } },
  { key: ['And your mum'], icon: '👩', label: 'your mum?', async play(st) {
    st.look(530);
    st.pose('hoa', 'e036_ask');
    await st.say('hoa', 'And your mum?', 1500);
    st.pose('hoa', 'stand');
  } },
  { key: ['She goes by bike'], icon: '🚲', label: 'by bike', async play(st) {
    st.look(530);
    await answer(st, 'minh', 'She goes by bike.', 1500);
    st.set('st-mum'); st.set('st-lb-bike'); st.sfx('birds', { vol: 0.4 });
    st.pose('minh', 'pointUp');
    await st.wait(2600);
    st.set('st-mum', false); st.set('st-lb-bike', false); st.pose('minh', 'sit'); st.mood('minh', 'happy');
  } },
  { key: ['Ms Hoa goes to school by bike too'], icon: '🚲', label: 'by bike too', async play(st) {
    st.look(520);
    st.pose('hoa', 'me'); st.mood('hoa', 'joy');
    await st.wait(900);
    st.pose('hoa', 'pointUp'); st.set('st-hoa'); st.set('st-lb-hoa'); st.sfx('sparkle');
    st.fx('sparkle', 560, 150, { quiet: true });
    await st.wait(1800);
    st.set('st-hoa', false); st.set('st-lb-hoa', false); st.pose('hoa', 'stand'); st.mood('hoa', 'happy');
  } },
  { key: ['How do you go to Nam Dinh'], icon: '🗺️', label: 'Nam Dinh?', async play(st) {
    await st.walk('hoa', 340, { speed: 130, lead: -20 });
    st.pose('hoa', 'point'); st.set('st-q1', false); st.set('st-q2'); st.sfx('sparkle', { vol: 0.5 });
    await st.say('hoa', 'How do you go to Nam Dinh?', 2300);
    st.pose('hoa', 'stand');
  } },
  { key: ['We go by train'], icon: '🚆', label: 'by train', async play(st) {
    st.look(640);
    await answer(st, 'minh', 'We go by train.', 1500);
    st.set('st-train'); st.set('st-lb-train');
    st.pose('minh', 'pointUp');
    await st.wait(2700);
    st.set('st-train', false); st.set('st-lb-train', false); st.pose('minh', 'sit'); st.mood('minh', 'happy');
  } },
  { key: ['how does Tom go to Australia'], icon: '🌏', label: 'Australia?', async play(st) {
    st.look(330);
    await st.walk('hoa', 300, { speed: 100, follow: false });
    st.pose('hoa', 'point'); st.set('st-globe'); st.set('st-lb-oz');
    await st.say('hoa', 'And how does Tom go to Australia?', 2600);
    st.set('st-lb-oz', false);
  } },
  { key: ['Everyone laughs'], icon: '😂', label: 'laughs', async play(st) {
    st.look(700, { dur: 800 });
    st.set('st-lb-laugh');
    KIDS.forEach((id) => { st.pose(id, 'e036_sitLaugh'); st.act(id, 'clap'); st.mood(id, 'joy'); });
    st.mood('hoa', 'joy');
    await st.wait(1800);
    KIDS.forEach((id) => st.act(id, null));
    st.set('st-lb-laugh', false);
  } },
  { key: ['By plane'], icon: '✈️', label: 'By plane!', async play(st) {
    st.look(740);
    KIDS.forEach((id) => { st.pose(id, 'e036_plane'); st.act(id, 'hop'); st.mood(id, 'joy'); });
    st.set('st-plane'); st.set('st-lb-plane'); st.sfx('car-go', { vol: 0.4, rate: 0.7 });
    st.say('tom', 'By plane!', 1600);
    await st.say('lan', 'By plane!', 1600);
    await st.wait(1800);
    KIDS.forEach((id) => st.act(id, null));
    st.set('st-plane', false); st.set('st-lb-plane', false);
  } },
];

export default {
  id: 'en036', worldW: 1240, floor: FLOOR, viewTop: 40, camStart: 80, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  order: [1, 4, 6, 9, 14, 17],
  cast: [
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 350, s: 0.95, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh' , x: 520 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 600, s: 1.04 },
    { id: 'kidA', kind: 'kid', who: 'e036_kidA', x: 720 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 860, s: 1.06 },
    { id: 'kidB', kind: 'kid', who: 'e036_kidB', x: 1000 },
  ],
  init(st) {
    KIDS.forEach((id) => st.pose(id, 'sit'));
  },
};
