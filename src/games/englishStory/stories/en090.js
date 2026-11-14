/**
 * Bài 90 "By the Time We Arrived" (quá khứ hoàn thành had + V3): chuyến tàu đêm Hà Nội → Huế, đi từ trái sang phải:
 * phòng khách (bản đồ đường tàu, điện thoại bố quên trên bàn) → đường phố (xe nhà Minh, tắc đường) → ga Hà Nội (tàu đã chạy,
 * phòng bán vé, đồng hồ treo, ghế chờ, đêm khuya) → Huế buổi chiều (sông Hương, thuyền rồng đã đi, Ngọ Môn).
 * "By the time": dải thứ tự ① tàu chạy → ② nhà mình tới, sáng lần lượt đúng lúc từng việc xảy ra.
 * Toạ độ cảnh: rộng 2560, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, room, doorway, windowBox, table, road, night, thought, sun, speaker } from '../kit.js';

const FLOOR = 282;
const W = 2560;
const X = { map: 150, table: 330, door: 430, road0: 442, carP: 640, jam: 1060, st0: 1250, window: 1430, clock: 1565, bench: 1720, st1: 1960, hue0: 2000, boat: 2300 };
const SPEED = 130;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e090_clerk: { adult: true, hair: 'short', top: 'shirt', shirt: '#1D4ED8', bottom: 'pants', bottomC: '#1F2937', shoe: '#1C1917', hat: 'cap' },
});

// ── Đồ vật ────────────────────────────────────────────────────────────────
const PHONE = `<rect x="-6" y="-3" width="12" height="4" rx="1" fill="#1F2937" stroke="${L}" stroke-width="0.6"/>`;
/** Đoàn tàu (gốc = giữa đáy bánh, chạy sang phải): đầu máy + 2 toa. */
const car = (x, c) => `<g transform="translate(${x} 0)"><rect x="-64" y="-66" width="128" height="56" rx="6" fill="${c}" stroke="${L}" stroke-width="1.2"/>
  ${[-46, -16, 14, 44].map((dx) => `<rect x="${dx - 10}" y="-56" width="20" height="16" rx="2" fill="#E0F2FE" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="-64" y="-30" width="128" height="6" fill="#FDE68A"/>${[-40, 40].map((dx) => `<g transform="translate(${dx} -6)"><g class="e090-wheel"><circle r="8" fill="#334155" stroke="${L}"/><path d="M-5 0 H5 M0 -5 V5" stroke="#94A3B8" stroke-width="1.4"/></g></g>`).join('')}</g>`;
const TRAIN = `${car(-136, '#2563EB')}${car(0, '#2563EB')}
  <g transform="translate(140 0)"><path d="M-70 -10 V-70 H30 Q66 -66 72 -30 L74 -10Z" fill="#DC2626" stroke="${L}" stroke-width="1.2"/>
    <rect x="18" y="-60" width="34" height="22" rx="4" fill="#E0F2FE" stroke="${L}" stroke-width="0.9"/><rect x="-60" y="-56" width="22" height="16" rx="2" fill="#E0F2FE" stroke="${L}" stroke-width="0.8"/>
    <rect x="-70" y="-30" width="144" height="6" fill="#FDE68A"/><circle cx="66" cy="-20" r="4" fill="#FEF08A" stroke="${L}" stroke-width="0.7"/>
    ${[-44, 40].map((dx) => `<g transform="translate(${dx} -6)"><g class="e090-wheel"><circle r="8" fill="#334155" stroke="${L}"/><path d="M-5 0 H5 M0 -5 V5" stroke="#94A3B8" stroke-width="1.4"/></g></g>`).join('')}</g>`;
/** Ba xe kẹt phía trước (gốc = mặt đường). */
const jamCar = (x, c, s = 1) => `<g transform="translate(${x} 0) scale(${s})"><path d="M-50 -14 Q-52 -30 -40 -32 L-24 -34 Q-14 -52 4 -52 L18 -52 Q30 -50 36 -34 L48 -30 Q54 -28 52 -14Z" fill="${c}" stroke="${L}" stroke-width="1.1"/>
  <path d="M-18 -35 Q-10 -48 2 -48 L10 -48 V-35Z M14 -48 L20 -48 Q28 -46 32 -35 L14 -35Z" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>
  ${[-30, 32].map((dx) => `<circle cx="${dx}" cy="-10" r="10" fill="#1F2937" stroke="${L}"/><circle cx="${dx}" cy="-10" r="4" fill="#CBD5E1"/>`).join('')}</g>`;
const MOTO = (x) => `<g transform="translate(${x} 0)"><circle cx="-16" cy="-9" r="9" fill="#1F2937" stroke="${L}"/><circle cx="18" cy="-9" r="9" fill="#1F2937" stroke="${L}"/>
  <path d="M-16 -9 L-4 -24 H14 L18 -9" stroke="#475569" stroke-width="3" fill="none"/><path d="M-10 -26 H12 L8 -18 H-8Z" fill="#F59E0B" stroke="${L}" stroke-width="0.8"/>
  <path d="M0 -26 V-50" stroke="#2563EB" stroke-width="9" stroke-linecap="round"/><circle cx="0" cy="-58" r="8" fill="#FDE68A" stroke="${L}"/><path d="M-9 -60 Q0 -72 9 -60Z" fill="#EF4444" stroke="${L}" stroke-width="0.8"/></g>`;
const JAM = `${jamCar(-120, '#22C55E')}${MOTO(-40)}${jamCar(40, '#F59E0B', 1.05)}${jamCar(160, '#A855F7')}
  <g class="e090-honk">${[-120, 40, 160].map((x) => `<g transform="translate(${x + 30} -62)"><path d="M0 0 l8 -8 M4 4 l12 -4 M2 -6 l2 -10" stroke="#F97316" stroke-width="2.4" stroke-linecap="round"/></g>`).join('')}</g>`;
/** Thuyền rồng (gốc = mặt nước, chạy sang phải). */
const BOAT = `<g class="e090-bob"><path d="M-80 -6 H64 Q80 -10 86 -30 Q98 -36 100 -24 Q96 -14 88 -12 Q80 4 60 6 H-70 Q-84 2 -80 -6Z" fill="#F59E0B" stroke="${L}" stroke-width="1.2"/>
  <path d="M86 -30 q-2 -12 8 -14 q6 0 6 8" fill="#DC2626" stroke="${L}" stroke-width="0.9"/><circle cx="94" cy="-38" r="1.6" fill="${L}"/>
  <path d="M-76 -6 Q-92 -20 -84 -32" stroke="#DC2626" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M-50 -6 V-40 H30 V-6" fill="#FEF3C7" stroke="${L}" stroke-width="1"/><path d="M-58 -40 Q-10 -56 38 -40Z" fill="#DC2626" stroke="${L}" stroke-width="1"/>
  ${[-36, -12, 12].map((dx) => `<rect x="${dx}" y="-32" width="14" height="14" fill="#BAE6FD" stroke="${L}" stroke-width="0.7"/>`).join('')}</g>`;
/** Người bán vé trong ô cửa (vai + đầu). */
const CLERK = `<path d="M-26 0 Q-24 -26 0 -28 Q24 -26 26 0Z" fill="#1D4ED8" stroke="${L}" stroke-width="1"/><path d="M-6 -27 L0 -18 L6 -27" fill="#fff" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(0 -44)">${headOnly('e090_clerk', { mood: 'happy' })}</g>`;
const BAGC = `<g transform="translate(0 2)"><rect x="-16" y="-16" width="32" height="26" rx="6" fill="#F59E0B" stroke="${L}" stroke-width="1"/><rect x="-10" y="-4" width="20" height="10" rx="2" fill="none" stroke="${L}" stroke-width="0.9"/></g>`;
const CAMERA = `<g transform="translate(0 -6)"><rect x="-8" y="-6" width="16" height="11" rx="2" fill="#334155" stroke="${L}" stroke-width="0.7"/><circle cy="0" r="3.6" fill="#93C5FD" stroke="#fff" stroke-width="1"/></g>`;
const PROPS = { e090_phone: `<g transform="translate(0 -6)"><rect x="-4" y="-7" width="8" height="14" rx="1.6" fill="#1F2937" stroke="${L}" stroke-width="0.6"/><rect x="-3" y="-5.6" width="6" height="10" rx="0.8" fill="#7DD3FC"/></g>`, e090_cam: CAMERA };
const POSES = {
  e090_pat: { R: [20, -40], L: [20, -40], head: 10 },
  e090_sitA: { R: [24, -86], L: [24, -86], dy: 40 },
  e090_sitK: { R: [24, -86], L: [24, -86], dy: 22 },
  e090_yawn: { R: [24, -86], L: [140, 220], dy: 22, head: -8 },
  e090_sleep: { R: [24, -86], L: [24, -86], dy: 24, head: 28 },
  e090_snap: { R: [120, 248], L: [100, 230] },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const CL = { x: X.clock, y: 116 };
const clock = () => `<g><path d="M${CL.x} 60 V${CL.y - 26}" stroke="#475569" stroke-width="3"/>
  <circle cx="${CL.x}" cy="${CL.y}" r="26" fill="#fff" stroke="${L}" stroke-width="2"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M${CL.x} ${CL.y - 22} V${CL.y - 18}" stroke="${L}" stroke-width="${i % 3 ? 1 : 2.4}" transform="rotate(${i * 30} ${CL.x} ${CL.y})"/>`).join('')}
  <g class="e090-hr"><path d="M${CL.x} ${CL.y} V${CL.y - 13}" stroke="#1F2937" stroke-width="3.4" stroke-linecap="round"/></g>
  <g class="e090-mn"><path d="M${CL.x} ${CL.y} V${CL.y - 20}" stroke="#DC2626" stroke-width="2.2" stroke-linecap="round"/></g>
  <circle cx="${CL.x}" cy="${CL.y}" r="2.4" fill="${L}"/></g>`;

function bg() {
  return `
  ${sky(X.door, W - X.door, 315, 'e090sky')}
  <g class="e090-pm"><rect x="${X.hue0}" y="0" width="${W - X.hue0}" height="315" fill="#FDBA74" opacity="0.35"/></g>
  <g transform="translate(2470 70)">${sun(22)}</g>
  ${cloud(700, 60, 0.9, 0)}${cloud(1080, 48, 0.8, 2)}${cloud(1650, 40, 0.7, 4)}${cloud(2200, 56, 0.9, 1)}
  <!-- phòng khách -->
  ${room(0, X.door, FLOOR, '#FEF3C7')}
  <!-- bản đồ đường tàu Hà Nội → Huế -->
  <g transform="translate(${X.map} 0)"><rect x="-84" y="40" width="168" height="112" rx="5" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="-78" y="46" width="156" height="100" fill="#DBEAFE"/>
    <path d="M-46 60 Q-36 74 -20 80 Q0 92 10 108 Q22 124 40 132" stroke="#86EFAC" stroke-width="26" fill="none" stroke-linecap="round"/>
    <path class="e090-route" d="M-44 62 Q-34 76 -18 82 Q0 94 12 110 Q24 126 42 132" stroke="#DC2626" stroke-width="2.6" fill="none" stroke-dasharray="5 3"/>
    <circle cx="-44" cy="62" r="5" fill="#DC2626" stroke="#fff" stroke-width="1.2"/><text x="-30" y="58" ${NUN} font-size="11" fill="#1E3A8A">Hanoi</text>
    <circle cx="42" cy="132" r="5" fill="#DC2626" stroke="#fff" stroke-width="1.2"/><text x="6" y="128" ${NUN} font-size="11" fill="#1E3A8A" text-anchor="end">Hue</text>
    <g transform="translate(52 66)"><circle r="10" fill="#FEF9C3"/><circle cx="5" cy="-3" r="9" fill="#DBEAFE"/></g>
    <g class="e090-x"><path d="M-60 54 L60 140 M60 54 L-60 140" stroke="#DC2626" stroke-width="7" stroke-linecap="round" opacity="0.85"/></g></g>
  ${windowBox(258, 70, 90, 80)}
  <!-- điện thoại trên bàn (sáng, rung khi đổ chuông) -->
  <g class="e090-tphone"><g transform="translate(${X.table + 20} ${FLOOR - 64})"><g class="e090-ring">${PHONE}<g class="e090-waves"><path d="M-10 -6 q-4 -4 0 -9 M10 -6 q4 -4 0 -9" stroke="#F97316" stroke-width="1.8" fill="none" stroke-linecap="round"/></g></g></g></g>
  ${doorway(X.door, FLOOR)}
  <!-- phố -->
  <path d="M${X.door + 12} 220 Q700 190 950 214 T${X.st0} 210 V${FLOOR} H${X.door + 12}Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${[540, 760, 980].map((x, i) => `<rect x="${x}" y="${120 + i * 14}" width="70" height="${FLOOR - 130 - i * 14}" fill="${['#FCA5A5', '#FDE68A', '#A5B4FC'][i]}" stroke="${L}"/>
    ${[0, 1].map((r) => `<rect x="${x + 12}" y="${136 + i * 14 + r * 34}" width="16" height="18" fill="#E0F2FE" stroke="${L}" stroke-width="0.7"/><rect x="${x + 42}" y="${136 + i * 14 + r * 34}" width="16" height="18" fill="#E0F2FE" stroke="${L}" stroke-width="0.7"/>`).join('')}`).join('')}
  ${tree(880, 270, 0.6)}${tree(1180, 270, 0.55, '')}
  ${road(X.door + 12, X.st0 + 40 - X.door - 12, FLOOR)}
  <!-- ga Hà Nội -->
  <g transform="translate(${X.st0} 0)">
    <rect x="0" y="96" width="250" height="${FLOOR - 96}" fill="#FDE68A" stroke="${L}" stroke-width="1.4"/>
    <path d="M-10 100 L30 66 H220 L260 100Z" fill="#B45309" stroke="${L}" stroke-width="1.4"/>
    <rect x="34" y="72" width="182" height="22" rx="5" fill="#fff" stroke="${L}"/><text x="125" y="88" text-anchor="middle" ${NUN} font-size="13" fill="#1D4ED8">HANOI STATION</text>
    <rect x="20" y="${FLOOR - 92}" width="56" height="92" rx="4" fill="#92400E" stroke="${L}"/><path d="M48 ${FLOOR - 92} V${FLOOR}" stroke="${L}"/>
    <rect x="${X.window - X.st0 - 34}" y="138" width="68" height="62" rx="4" fill="#1E3A8A" stroke="${L}" stroke-width="1.2"/>
    <rect x="${X.window - X.st0 - 40}" y="114" width="80" height="20" rx="4" fill="#fff" stroke="${L}"/><text x="${X.window - X.st0}" y="129" text-anchor="middle" ${NUN} font-size="12" fill="#DC2626">TICKETS</text></g>
  <!-- đường ray + sân ga -->
  <rect x="${X.st0 + 250}" y="150" width="${X.st1 - X.st0 - 250}" height="${FLOOR - 150}" fill="#E7E5E4" opacity="0.6"/>
  <path d="M${X.st0 + 250} 140 H${X.st1}" stroke="#78716C" stroke-width="6"/>${[0, 1, 2].map((i) => `<path d="M${X.st0 + 290 + i * 180} 140 V${FLOOR - 40}" stroke="#78716C" stroke-width="5"/>`).join('')}
  <rect x="${X.st0 + 250}" y="${FLOOR - 40}" width="${X.st1 - X.st0 - 250}" height="10" fill="#57534E"/>
  <path d="M${X.st0 + 250} ${FLOOR - 36} H${X.st1}" stroke="#A8A29E" stroke-width="2"/>
  <rect x="${X.st0}" y="${FLOOR - 30}" width="${X.st1 - X.st0}" height="${315 - FLOOR + 30}" fill="#D6D3D1" stroke="${L}"/>
  <path d="M${X.st0} ${FLOOR - 24} H${X.st1}" stroke="#FACC15" stroke-width="3" stroke-dasharray="10 6"/>
  ${clock()}
  <!-- ghế chờ -->
  <g transform="translate(${X.bench} ${FLOOR})"><rect x="-110" y="-62" width="220" height="12" rx="4" fill="#0EA5E9" stroke="${L}"/>
    <rect x="-114" y="-34" width="228" height="10" rx="3" fill="#0284C7" stroke="${L}"/><path d="M-96 -24 V0 M96 -24 V0" stroke="#475569" stroke-width="5"/></g>
  <!-- Huế buổi chiều -->
  <path d="M${X.hue0} 210 Q2200 190 2400 206 T${W} 200 V250 H${X.hue0}Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(2200 222)"><rect x="-90" y="-60" width="180" height="60" fill="#B91C1C" stroke="${L}" stroke-width="1.2"/>
    <rect x="-22" y="-40" width="44" height="40" rx="20" fill="#7C2D12" stroke="${L}"/><path d="M-100 -60 Q-90 -72 -70 -74 H70 Q90 -72 100 -60Z" fill="#FACC15" stroke="${L}" stroke-width="1.2"/>
    <rect x="-56" y="-96" width="112" height="22" fill="#B91C1C" stroke="${L}"/><path d="M-66 -96 Q-56 -106 -40 -106 H40 Q56 -106 66 -96Z" fill="#FACC15" stroke="${L}" stroke-width="1.2"/></g>
  ${water(X.hue0, W - X.hue0, 236)}
  <rect x="${X.hue0}" y="${FLOOR - 6}" width="${W - X.hue0}" height="${315 - FLOOR + 6}" fill="#86EFAC" stroke="${L}"/>
  <!-- biển chuyến thuyền -->
  <g transform="translate(2480 ${FLOOR})"><path d="M0 0 V-60" stroke="#78716C" stroke-width="4"/><rect x="-46" y="-108" width="92" height="50" rx="5" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <text x="0" y="-90" text-anchor="middle" ${NUN} font-size="11" fill="#B45309">BOAT TRIP</text><text x="0" y="-70" text-anchor="middle" ${NUN} font-size="14" fill="#1E3A8A">9:00 am</text>
    <g class="e090-missed"><path d="M-40 -104 L40 -62 M40 -104 L-40 -62" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/></g></g>
  ${bush(2480, FLOOR + 30, 0.6)}`;
}
const water = (x, w, y) => `<rect x="${x}" y="${y}" width="${w}" height="${FLOOR - 6 - y}" fill="#38BDF8" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: Math.floor(w / 40) }, (_, i) => `<path d="M${x + 10 + i * 40} ${y + 10 + (i % 3) * 8} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>`;

function fg() {
  const step = (x, n, t, c) => `<g class="e090-step e090-step${n}"><rect x="${x}" y="-14" width="${t.length * 7.6 + 34}" height="26" rx="13" fill="#fff" stroke="${c}" stroke-width="2"/>
    <circle cx="${x + 13}" cy="-1" r="9" fill="${c}"/><text x="${x + 13}" y="3.5" text-anchor="middle" ${NUN} font-size="12" fill="#fff">${n}</text>
    <text x="${x + 27}" y="4" ${NUN} font-size="13" fill="${c}">${t}</text></g>`;
  return `
  ${table(X.table, FLOOR - 62, 90, FLOOR, '#B45309')}
  ${night(X.st0, X.st1 - X.st0, 315, X.st0 + 600)}
  <!-- dải thứ tự: việc nào xảy ra trước -->
  <g class="e090-order" transform="translate(${X.st0 + 230} 62)">${step(0, 1, 'the train left', '#DC2626')}<path d="M138 -1 h18" stroke="${L}" stroke-width="2.4"/><path d="M152 -6 l6 5 l-6 5" stroke="${L}" stroke-width="2.4" fill="none"/>${step(162, 2, 'we arrived', '#2563EB')}</g>
  <!-- nhãn -->
  <g class="e090-lb e090-lb-night">${label(X.map + 30, 186, 'the night train', '#4338CA', 15)}</g>
  <g class="e090-lb e090-lb-wrong">${label(X.map + 60, 186, 'everything went wrong', '#DC2626', 15)}</g>
  <g class="e090-lb e090-lb-phone">${label(X.door - 40, 70, 'had forgotten his phone', '#EA580C', 14)}</g>
  <g class="e090-lb e090-lb-back">${label(X.table + 10, 112, 'went back home', '#16A34A', 14)}</g>
  <g class="e090-lb e090-lb-jam">${label(X.jam - 40, 120, 'a terrible traffic jam', '#DC2626', 15)}</g>
  <g class="e090-lb e090-lb-left">${label(X.st0 + 470, 190, 'had already left', '#DC2626', 15)}</g>
  <g class="e090-lb e090-lb-months">${label(X.st0 + 130, 166, 'for months', '#7C3AED', 14)}</g>
  <g class="e090-lb e090-lb-office">${label(X.window, 96, 'the ticket office', '#1D4ED8', 13)}</g>
  <g class="e090-lb e090-lb-eleven">${label(CL.x, 172, 'at eleven', '#16A34A', 16)}</g>
  <g class="e090-lb e090-lb-late">${label(CL.x + 140, 112, 'so late', '#4338CA', 16)}</g>
  <g class="e090-lb e090-lb-asleep">${label(X.bench + 70, 150, 'fell asleep', '#4338CA', 14)}</g>
  <g class="e090-lb e090-lb-hue">${label(2250, 60, 'Hue, the next afternoon', '#EA580C', 14)}</g>
  <g class="e090-lb e090-lb-missed">${label(2420, 150, 'missed the boat trip', '#DC2626', 13)}</g>
  <g class="e090-lb e090-lb-great">${label(2250, 92, 'a great holiday', '#16A34A', 16)}</g>
  <g class="e090-lb e090-lb-dad">${speaker(X.door + 40, 106, 'Dad')}</g>
  ${thought(X.door + 110, 92, 80, 58, `<g transform="scale(1.6)">${PROPS.e090_phone}</g><text x="18" y="8" ${NUN} font-size="22" fill="#DC2626">?</text>`, [X.door + 62, 128], 'e090-think')}
  ${thought(X.st0 + 130, 104, 120, 70, `<g transform="translate(-26 10) scale(0.5)"><rect x="-90" y="-60" width="180" height="60" fill="#B91C1C" stroke="${L}" stroke-width="2"/><path d="M-100 -60 Q-90 -72 -70 -74 H70 Q90 -72 100 -60Z" fill="#FACC15" stroke="${L}" stroke-width="2"/></g>
    <g transform="translate(30 8)"><rect x="-16" y="-18" width="32" height="30" rx="3" fill="#fff" stroke="${L}"/><rect x="-16" y="-18" width="32" height="9" fill="#EF4444" stroke="${L}"/><g class="e090-pages"><text x="0" y="8" text-anchor="middle" ${NUN} font-size="13" fill="${L}">5</text></g></g>`, [X.st0 + 60, 150], 'e090-dream')}`;
}

const LB = ['night', 'wrong', 'phone', 'back', 'jam', 'left', 'months', 'office', 'eleven', 'late', 'asleep', 'hue', 'missed', 'great', 'dad'];
const CSS = `
.e090-lb { opacity: 0; transition: opacity .35s; }
${LB.map((k) => `.st-lb-${k} .e090-lb-${k}`).join(', ')} { opacity: 1; }
.e090-route { clip-path: inset(0 100% 0 0); }
.st-route .e090-route { clip-path: inset(0 0 0 0); transition: clip-path 1.6s linear; }
.e090-x { opacity: 0; transform-box: fill-box; transform-origin: center; transform: scale(.4); transition: opacity .2s, transform .35s cubic-bezier(.3,1.6,.6,1); }
.st-wrong .e090-x { opacity: 1; transform: none; }
.e090-waves { opacity: 0; }
.st-ring .e090-waves { opacity: 1; animation: e090Blink .3s steps(1) infinite; }
.st-ring .e090-ring { animation: e090Buzz .08s linear infinite alternate; }
@keyframes e090Buzz { from { transform: translateX(-1.5px); } to { transform: translateX(1.5px); } }
@keyframes e090Blink { 50% { opacity: 0; } }
.st-taken .e090-tphone { opacity: 0; }
.e090-think, .e090-dream { opacity: 0; transform: scale(.4); transition: opacity .3s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.e090-think { transform-origin: ${X.door + 70}px 130px; } .e090-dream { transform-origin: ${X.st0 + 90}px 150px; }
.st-think .e090-think, .st-dream .e090-dream { opacity: 1; transform: none; }
.st-dream .e090-pages { animation: e090Page .5s steps(1) 4; }
@keyframes e090Page { 50% { opacity: 0; } }
.e090-honk { opacity: 0; }
.st-honk .e090-honk { animation: e090Blink .4s steps(1) infinite; opacity: 1; }
.es-ac.is-walk .e090-wheel { animation: e090Spin .5s linear infinite; }
@keyframes e090Spin { to { transform: rotate(360deg); } }
.e090-order { opacity: 0; transition: opacity .3s; }
.st-order .e090-order { opacity: 1; }
.e090-step { opacity: .25; transition: opacity .3s, transform .3s; }
.st-step1 .e090-step1, .st-step2 .e090-step2 { opacity: 1; }
.e090-hr { transform-origin: ${CL.x}px ${CL.y}px; transform: rotate(272deg); }
.e090-mn { transform-origin: ${CL.x}px ${CL.y}px; transform: rotate(30deg); }
.st-eleven .e090-hr { transform: rotate(287deg); } .st-eleven .e090-mn { transform: rotate(90deg); }
.st-late .e090-hr { transform: rotate(315deg); transition: transform 3s linear; }
.st-late .e090-mn { transform: rotate(900deg); transition: transform 3s linear; }
.st-night .ek-night { opacity: 1; }
.e090-pm { opacity: 0; transition: opacity 1s; } .st-pm .e090-pm { opacity: 1; }
.e090-missed { opacity: 0; transition: opacity .3s; } .st-missed .e090-missed { opacity: 1; }
.e090-bob { animation: e090Bob 1.6s ease-in-out infinite alternate; }
@keyframes e090Bob { to { transform: translateY(2px) rotate(-1deg); } }
@media (prefers-reduced-motion: reduce) { .st-ring .e090-ring { animation: none; } .e090-bob { animation-duration: 4s; } }
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const FAM = ['dad', 'mum', 'lan', 'minh'];
const tt = (a, b, speed = SPEED) => (Math.abs(b - a) / speed) * 1000;

const BEATS = [
  { key: ['planned to take the night train', 'from Hanoi to Hue'], icon: '🚆', label: 'night train', async play(st) {
    st.look(240);
    st.pose('dad', 'point'); st.mood('dad', 'joy');
    st.set('st-route');
    await st.loop('pencil', () => st.wait(1600), { vol: 0.7 });
    st.set('st-lb-night'); st.sfx('ding', { vol: 0.5 });
    st.pose('lan', 'cheer'); st.pose('minh', 'cheer'); st.act('minh', 'hop'); st.mood('lan', 'joy'); st.mood('minh', 'joy');
    await st.wait(1300);
    st.act('minh', null); st.pose('lan', 'stand'); st.pose('minh', 'stand'); st.pose('dad', 'stand');
  } },
  { key: ['Unfortunately', 'everything went wrong'], icon: '😟', label: 'went wrong', async play(st) {
    off(st, 'st-lb-night');
    st.look(240);
    await st.wait(300);
    st.set('st-wrong'); st.sfx('buzz-no', { vol: 0.6 });
    st.set('st-lb-wrong');
    FAM.forEach((id) => st.mood(id, 'wow'));
    await st.wait(700);
    FAM.forEach((id) => st.mood(id, 'sad'));
    await st.wait(1000);
  } },
  { key: ['Dad had forgotten his phone', 'went back home to get it'], icon: '📱', label: 'forgot his phone', async play(st) {
    off(st, 'st-lb-wrong', 'st-wrong');
    FAM.forEach((id) => st.mood(id, 'happy'));
    st.look(X.door + 20, { dur: 1400 });
    await Promise.all([
      st.walk('dad', X.door + 60, { speed: SPEED, follow: false }),
      st.walk('mum', X.door + 110, { speed: SPEED, follow: false }),
      st.walk('lan', X.door + 150, { speed: SPEED, follow: false }),
      st.walk('minh', X.door + 186, { speed: SPEED, follow: false }),
    ]);
    st.pose('dad', 'e090_pat'); st.mood('dad', 'wow');
    st.set('st-think'); st.set('st-lb-phone'); st.set('st-ring'); st.sfx('phone-ring', { vol: 0.8 });
    await st.wait(1000);
    st.set('st-think', false); st.set('st-lb-phone', false); st.set('st-lb-back');
    await st.walk('dad', X.table - 20, { speed: 150, follow: false });
    st.set('st-ring', false); st.set('st-taken'); st.hold('dad', 'e090_phone'); st.pose('dad', 'phone'); st.sfx('click', { vol: 0.7 });
    st.mood('dad', 'joy');
    await st.wait(600);
  } },
  { key: ['a terrible traffic jam'], icon: '🚗', label: 'traffic jam', async play(st) {
    off(st, 'st-lb-back');
    st.hold('dad', null); st.pose('dad', 'stand');
    st.look(X.carP + 60, { instant: true });
    FAM.forEach((id) => st.show(id, false));
    st.show('carP', false); st.show('car', true); st.sfx('door-open', { vol: 0.5 });
    await st.wait(300);
    st.sfx('car-go', { vol: 0.8 });
    await st.walk('car', X.jam - 240, { speed: 160, lead: 60 });
    st.set('st-honk'); st.set('st-lb-jam');
    for (let i = 0; i < 3; i++) { st.sfx('beep', { vol: 0.7, rate: 0.8 + i * 0.15 }); await st.wait(450); }
    await st.wait(600);
  } },
  { key: ['By the time we arrived at the station', 'the train had already left'], icon: '🚉', label: 'had already left', async play(st) {
    off(st, 'st-lb-jam', 'st-honk');
    st.show('jam', false);
    st.look(X.st0 + 330, { instant: true });
    st.set('st-order'); st.set('st-step1');
    st.sfx('whistle', { vol: 0.7 });
    await st.wait(300);
    await st.loop('roll', () => st.walk('train', X.st1 + 300, { speed: 180, follow: false }), { vol: 0.6 });
    st.show('train', false);
    st.place('car', X.st0 - 330);
    st.sfx('car-go', { vol: 0.6 });
    await st.walk('car', X.st0 - 150, { speed: 170, follow: false });
    st.set('st-step2');
    st.show('car', false); st.show('carP', true); st.place('carP', X.st0 - 150);
    [[X.st0 - 40, 'dad'], [X.st0 + 10, 'mum'], [X.st0 + 50, 'lan'], [X.st0 + 86, 'minh']].forEach(([x, id]) => { st.place(id, x, FLOOR, 1); st.show(id, true); });
    st.sfx('door-open', { vol: 0.5 });
    st.look(X.st0 + 190, { dur: 700 });
    st.set('st-lb-left');
    FAM.forEach((id) => st.mood(id, 'wow'));
    st.pose('minh', 'point');
    await st.wait(1300);
    st.pose('minh', 'stand');
  } },
  { key: ['Lan was almost crying', 'dreamed about this trip for months'], icon: '😢', label: 'almost crying', async play(st) {
    off(st, 'st-lb-left', 'st-order', 'st-step1', 'st-step2');
    st.look(X.st0 + 120);
    st.mood('lan', 'cry'); st.pose('lan', 'sad');
    st.sfx('drip', { vol: 0.7 }); st.fx('drops', X.st0 + 50, FLOOR - 104, { quiet: true });
    await st.wait(600);
    st.set('st-dream'); st.set('st-lb-months'); st.sfx('page-turn', { vol: 0.8 });
    await st.wait(900);
    st.sfx('page-turn', { vol: 0.6 });
    st.mood('mum', 'sad'); st.mood('minh', 'sad');
    await st.wait(900);
  } },
  { key: ['Mum went to the ticket office'], icon: '🎫', label: 'ticket office', async play(st) {
    off(st, 'st-dream', 'st-lb-months');
    st.pose('lan', 'stand');
    st.look(X.window - 60);
    await st.walk('mum', X.window - 54, { speed: SPEED, follow: false });
    st.set('st-lb-office');
    st.pose('mum', 'give'); st.sfx('knock', { vol: 0.8 });
    await st.wait(1000);
    st.pose('mum', 'stand');
  } },
  { key: ['Luckily', 'another train at eleven'], icon: '🕚', label: 'at eleven', async play(st) {
    off(st, 'st-lb-office');
    st.look(X.window + 40);
    st.mood('clerk', 'joy');
    await st.say('clerk', 'Another train at eleven!', 1800);
    st.set('st-eleven'); st.set('st-lb-eleven'); st.sfx('ding', { vol: 0.7 });
    FAM.forEach((id) => st.mood(id, 'joy'));
    st.pose('mum', 'cheer'); st.act('lan', 'hop');
    await st.wait(1100);
    st.pose('mum', 'stand'); st.act('lan', null);
  } },
  { key: ['We had never waited at a station so late before'], icon: '🌙', label: 'so late', async play(st) {
    off(st, 'st-lb-eleven');
    st.look(X.bench - 60, { dur: 1400 });
    st.set('st-night');
    await Promise.all([
      st.walk('dad', X.bench - 80, { speed: 150, follow: false }),
      st.walk('mum', X.bench - 30, { speed: 150, follow: false }),
      st.walk('lan', X.bench + 20, { speed: 150, follow: false }),
      st.walk('minh', X.bench + 60, { speed: 150, follow: false }),
    ]);
    st.pose('dad', 'e090_sitA'); st.pose('mum', 'e090_sitA'); st.pose('lan', 'e090_sitK'); st.pose('minh', 'e090_sitK');
    st.set('st-late'); st.set('st-lb-late');
    await st.loop('tick', () => st.wait(2200), { vol: 0.8 });
    st.pose('lan', 'e090_yawn'); st.mood('lan', 'shut');
    await st.wait(600);
  } },
  { key: ['Minh fell asleep on his bag'], icon: '😴', label: 'fell asleep', async play(st) {
    off(st, 'st-lb-late');
    st.look(X.bench - 20);
    st.pose('lan', 'e090_sitK'); st.mood('lan', 'happy');
    st.chest('minh', BAGC); st.pose('minh', 'e090_sleep'); st.mood('minh', 'shut');
    await st.wait(500);
    st.set('st-lb-asleep');
    st.fx('zzz', X.bench + 80, FLOOR - 110);
    await st.wait(1600);
  } },
  { key: ['finally reached Hue the next afternoon', 'missed the boat trip on the Perfume River', 'a great holiday'], icon: '🐉', label: 'a great holiday', async play(st) {
    off(st, 'st-lb-asleep', 'st-night');
    st.chest('minh', null);
    st.set('st-pm'); st.set('st-lb-hue');
    [[X.hue0 - 100, 'minh'], [X.hue0 - 60, 'lan'], [X.hue0 - 20, 'mum'], [X.hue0 + 30, 'dad']].forEach(([x, id]) => { st.place(id, x, FLOOR, 1); st.pose(id, 'stand'); st.mood(id, 'happy'); });
    st.look(X.hue0 + 275, { instant: true });
    st.sfx('birds', { vol: 0.4 });
    const go = Promise.all([
      st.walk('dad', X.hue0 + 270, { speed: SPEED, follow: false }),
      st.walk('mum', X.hue0 + 220, { speed: SPEED, follow: false }),
      st.walk('lan', X.hue0 + 174, { speed: SPEED, follow: false }),
      st.walk('minh', X.hue0 + 134, { speed: SPEED, follow: false }),
    ]);
    st.sfx('boat-horn', { vol: 0.6 });
    const sail = st.walk('boat', W + 160, { speed: 70, follow: false });
    await go;
    st.set('st-missed'); st.set('st-lb-missed'); st.sfx('buzz-no', { vol: 0.4 });
    FAM.forEach((id) => st.mood(id, 'wow'));
    await st.wait(1200);
    off(st, 'st-lb-hue', 'st-lb-missed');
    st.set('st-lb-great');
    st.hold('dad', 'e090_cam'); st.pose('dad', 'e090_snap'); st.face('dad', -1);
    ['mum', 'lan', 'minh'].forEach((id) => { st.pose(id, 'cheer'); st.mood(id, 'joy'); });
    st.act('minh', 'jump'); st.act('lan', 'jump');
    await st.wait(300);
    st.sfx('camera'); st.fx('sparkle', X.hue0 + 220, FLOOR - 150, { quiet: true });
    await st.wait(1200);
    await Promise.race([sail, st.wait(10)]);
  } },
];

export default {
  id: 'en090', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 2, 3, 4, 7, 10],
  cast: [
    { id: 'train', kind: 'thing', x: X.st0 + 520, y: FLOOR - 38, svg: TRAIN, box: [-210, -74, 430, 76] },
    { id: 'boat', kind: 'thing', x: X.boat, y: 262, svg: BOAT, box: [-96, -60, 200, 70] },
    { id: 'clerk', kind: 'thing', x: X.window, y: 200, svg: CLERK, box: [-30, -70, 60, 72] },
    { id: 'jam', kind: 'thing', x: X.jam, y: 312, svg: JAM, box: [-180, -80, 380, 82] },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 260, face: -1 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 392, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 36, face: 1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 76, face: 1 },
    { id: 'carP', kind: 'car', x: X.carP, y: 312, svg: '' },
    { id: 'car', kind: 'car', x: X.carP, y: 312, svg: `<g transform="translate(-26 0)">${headOnly('en_lan_home', { s: 0.62 })}</g><g transform="translate(6 0)">${headOnly('en_dad_home', { s: 0.75 })}</g>` },
  ],
  init(st) {
    st.show('car', false);
  },
};
