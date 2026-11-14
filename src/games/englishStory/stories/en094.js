/**
 * Bài 94 "Getting My Bike Repaired" (have / get something done): một con phố Hà Nội, đi từ trái sang phải: sân nhà Minh
 * (xe đạp xẹp lốp, phanh hỏng, bố bước ra lắc đầu) → tiệm sửa xe của chú Long (bảng dụng cụ, lốp treo, đồng hồ treo tường)
 * → tiệm cắt tóc ngay cạnh (cột sọc xoay, gương, ghế) → tiệm chụp ảnh (phông xanh, máy ảnh trên chân, đèn flash, thẻ học sinh).
 * Người khác làm việc cho mình: nhãn "get it repaired / had his hair cut / having her photo taken / had … checked" hiện đúng
 * lúc thợ làm. Câu cuối danh sách việc chú Long đã làm, từng bộ phận sáng lên và có dấu tích.
 * Toạ độ cảnh: rộng 2000, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, speaker } from '../kit.js';

const FLOOR = 282;
const W = 2000;
const X = { door: 120, bike0: 330, shop: 1070, stand: 1040, long: 1112, barber: 1385, chair: 1372, studio: 1715, stool: 1676, cam: 1772, photo: 1820 };
const SPEED = 130;

Object.assign(CAST, {
  e094_long: { adult: true, hair: 'short', top: 'shirt', shirt: '#64748B', bottom: 'pants', bottomC: '#1E3A8A', shoe: '#44403C', hat: 'cap', moustache: true },
  e094_barber: { adult: true, hair: 'neat', top: 'shirt', shirt: '#F8FAFC', bottom: 'pants', bottomC: '#111827', shoe: '#1C1917' },
  e094_photo: { adult: true, hair: 'bob', hairC: '#3F2A1E', top: 'blouse', shirt: '#FCD34D', bottom: 'pants', bottomC: '#334155', shoe: '#F5F5F4' },
  e094_minh_cut: { ...CAST.en_minh_home, hair: 'neat' },
});

const T = (x, y, s, size = 13, c = '#1E3A8A', w = 900) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="${w}" font-size="${size}" fill="${c}">${s}</text>`;
const TICK = (x, y, r = 9) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#22C55E" stroke="${L}"/><path d="M${-r * 0.45} 0 L${-r * 0.1} ${r * 0.4} L${r * 0.5} ${-r * 0.4}" stroke="#fff" stroke-width="${r * 0.3}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const CROSS = (x, y, r = 9) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#EF4444" stroke="${L}"/><path d="M${-r * 0.4} ${-r * 0.4} L${r * 0.4} ${r * 0.4} M${r * 0.4} ${-r * 0.4} L${-r * 0.4} ${r * 0.4}" stroke="#fff" stroke-width="${r * 0.3}" stroke-linecap="round"/></g>`;

// ── Xe đạp của Minh (gốc = giữa hai bánh trên mặt đất, nhìn sang phải). Trạng thái là class trên phần tử nhân vật:
// .e094-flat (lốp trước xẹp, xích bẩn), .e094-hl-brake / -tyre / -chain (vòng sáng), .e094-new (lấp lánh). ────────────
const wheel = (x, cls) => `<g transform="translate(${x} -24)"><g class="e094-wh ${cls}"><circle r="23" fill="none" stroke="#1F2937" stroke-width="5"/><circle r="20" fill="none" stroke="${L}" stroke-width="0.6"/>
  ${[0, 30, 60, 90, 120, 150].map((r) => `<path d="M-19 0 H19" stroke="#94A3B8" stroke-width="0.8" transform="rotate(${r})"/>`).join('')}<circle r="3" fill="#64748B"/></g></g>`;
const BIKE = `<g class="e094-bike">
  <g class="e094-tyreOk">${wheel(36, 'e094-whF')}</g>
  <g class="e094-tyreFlat"><g transform="translate(36 -24)"><path d="M-23 4 Q-24 -24 0 -23 Q24 -24 23 4 Q20 22 0 22 L-2 23 Q-18 23 -23 4Z" fill="none" stroke="#1F2937" stroke-width="5"/>
    <path d="M-12 22 Q0 26 12 22" stroke="#1F2937" stroke-width="6" stroke-linecap="round"/>${[0, 45, 90, 135].map((r) => `<path d="M-18 0 H18" stroke="#94A3B8" stroke-width="0.8" transform="rotate(${r})"/>`).join('')}<circle r="3" fill="#64748B"/></g></g>
  ${wheel(-36, 'e094-whB')}
  <path d="M-36 -24 L-8 -24 L-16 -58 Z M-8 -24 L26 -56 L-16 -58 M26 -56 L36 -24" stroke="#DC2626" stroke-width="4.2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
  <g class="e094-chain"><ellipse cx="-22" cy="-24" rx="16" ry="5" fill="none" stroke="#475569" stroke-width="2" stroke-dasharray="2 1.4"/></g>
  <circle cx="-8" cy="-24" r="6" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/><path d="M-8 -24 L-2 -14" stroke="${L}" stroke-width="2.4" stroke-linecap="round"/><rect x="-6" y="-15" width="9" height="3" rx="1" fill="#1F2937"/>
  <path d="M-16 -58 L-18 -64" stroke="#1F2937" stroke-width="2.6"/><path d="M-30 -66 Q-18 -70 -8 -65 L-10 -62 H-28Z" fill="#1F2937"/>
  <path d="M26 -56 L24 -70 M16 -72 Q24 -74 34 -70" stroke="#1F2937" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M30 -71 q8 2 6 8" stroke="#64748B" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M30 -24 l6 -26" stroke="#94A3B8" stroke-width="1.2"/><rect x="24" y="-52" width="6" height="4" rx="1" fill="#1F2937" transform="rotate(-20 27 -50)"/>
  <rect x="32" y="-66" width="10" height="8" rx="2" fill="#FDE047" stroke="${L}" stroke-width="0.7"/>
  <path class="e094-dirt" d="M-30 -27 q4 4 8 0 M-16 -21 q3 3 6 0 M-4 -60 l4 2" stroke="#78350F" stroke-width="2" fill="none"/>
  <g class="e094-hl e094-hl-brake"><circle cx="30" cy="-66" r="13" fill="none" stroke="#FACC15" stroke-width="3"/></g>
  <g class="e094-hl e094-hl-tyre"><circle cx="36" cy="-24" r="30" fill="none" stroke="#FACC15" stroke-width="3"/></g>
  <g class="e094-hl e094-hl-chain"><ellipse cx="-22" cy="-24" rx="24" ry="12" fill="none" stroke="#FACC15" stroke-width="3"/></g>
  <g class="e094-shine">${[[-30, -40], [10, -68], [44, -40], [-44, -10]].map(([x, y], i) => `<path style="animation-delay:${i * 0.25}s" d="M${x} ${y - 6} L${x + 1.6} ${y - 1.6} L${x + 6} ${y} L${x + 1.6} ${y + 1.6} L${x} ${y + 6} L${x - 1.6} ${y + 1.6} L${x - 6} ${y} L${x - 1.6} ${y - 1.6}Z" fill="#FDE047" stroke="${L}" stroke-width="0.5"/>`).join('')}</g></g>`;

const PROPS = {
  e094_wrench: `<g transform="rotate(180)"><path d="M0 -2 V16" stroke="#94A3B8" stroke-width="3.2" stroke-linecap="round"/><path d="M-5 16 Q-6 24 0 25 Q6 24 5 16 L2 20 H-2Z" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/></g>`,
  e094_lens: `<g transform="rotate(200)"><path d="M0 -2 V12" stroke="#78350F" stroke-width="3" stroke-linecap="round"/><circle cy="20" r="8" fill="#E0F2FE" stroke="#475569" stroke-width="2"/><path d="M-3 16 q2 -2 5 -1" stroke="#fff" stroke-width="1.4" fill="none"/></g>`,
  e094_scissors: `<g transform="rotate(170)"><g class="e094-snip"><path d="M-1 0 L-3 18" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/></g><path d="M1 0 L3 18" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="-3" cy="-4" r="3" fill="none" stroke="#DC2626" stroke-width="1.6"/><circle cx="3" cy="-4" r="3" fill="none" stroke="#DC2626" stroke-width="1.6"/></g>`,
  e094_none: '',
};
const POSES = {
  e094_bend: { R: [50, 70], L: [40, 60], dy: 14, head: 14 },
  e094_lens: { R: [60, 40], L: [30, 50], dy: 12, head: 16 },
  e094_tool: { R: [120, 160], L: [10, 4], head: -4 },
  e094_push: { R: [64, 84], L: [10, 4] },
  e094_snip: { R: [50, 70], L: [30, -50], head: 10 },
  e094_far: { R: [118, 132], L: [10, 4], head: -4 },
  e094_cam: { R: [70, 95], L: [30, -60], head: 6 },
  e094_sitUp: { R: [30, 20], L: [30, 20], dy: 20, head: -2 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
/** Mặt tiền một gian phố (tâm x, rộng w): tường, mái tôn, biển hiệu. */
const front = (x, w, wall, sign, signC, inner = '') => `<g transform="translate(${x} ${FLOOR})">
  <rect x="${-w / 2}" y="-236" width="${w}" height="236" fill="${wall}" stroke="${L}" stroke-width="1.3"/>
  <rect x="${-w / 2 + 14}" y="-226" width="${w - 28}" height="34" rx="4" fill="${signC}" stroke="${L}"/>${T(0, -203, sign, 15, '#fff')}
  <rect x="${-w / 2 + 10}" y="-176" width="${w - 20}" height="176" fill="#FFFBEB" stroke="${L}"/>
  <path d="M${-w / 2 - 6} -184 H${w / 2 + 6} L${w / 2 - 4} -170 H${-w / 2 + 4}Z" fill="#94A3B8" stroke="${L}"/>${inner}</g>`;
/** Đồng hồ treo tường (tâm x, y). */
const clock = (x, y, r = 16) => `<g transform="translate(${x} ${y})"><circle r="${r + 3}" fill="#0EA5E9" stroke="${L}"/><circle r="${r}" fill="#fff" stroke="${L}" stroke-width="0.8"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M0 ${-r + 2} V${-r + (i % 3 ? 4 : 6)}" stroke="${L}" stroke-width="${i % 3 ? 0.8 : 1.6}" transform="rotate(${i * 30})"/>`).join('')}
  <g class="e094-hh"><path d="M0 2 V${-r * 0.5}" stroke="#1F2937" stroke-width="2.6" stroke-linecap="round"/></g>
  <g class="e094-mh"><path d="M0 2 V${-r * 0.8}" stroke="#DC2626" stroke-width="1.6" stroke-linecap="round"/></g><circle r="1.8" fill="#1F2937"/></g>`;

function bg() {
  const pegboard = `<rect x="-120" y="-160" width="110" height="70" fill="#FDE68A" stroke="${L}"/>
    ${[-104, -84, -64, -44, -26].map((dx, i) => `<path d="M${dx} -150 v${18 + (i % 2) * 8}" stroke="#64748B" stroke-width="3" stroke-linecap="round"/>`).join('')}
    <circle cx="-40" cy="-112" r="12" fill="none" stroke="#1F2937" stroke-width="4"/><circle cx="-86" cy="-112" r="10" fill="none" stroke="#1F2937" stroke-width="4"/>`;
  const shopIn = `${pegboard}
    <rect x="20" y="-150" width="100" height="10" rx="2" fill="#A16207" stroke="${L}"/>${[30, 56, 82, 104].map((dx, i) => `<rect x="${dx}" y="-170" width="14" height="20" rx="2" fill="${['#EF4444', '#3B82F6', '#22C55E', '#F59E0B'][i]}" stroke="${L}" stroke-width="0.7"/>`).join('')}
    <rect x="-70" y="-60" width="40" height="22" rx="3" fill="#475569" stroke="${L}"/><rect x="-72" y="-38" width="44" height="38" fill="#64748B" stroke="${L}"/>`;
  const barberIn = `<rect x="-60" y="-164" width="70" height="90" rx="6" fill="#E0F2FE" stroke="${L}" stroke-width="2"/><path d="M-40 -150 l18 -10 M-30 -130 l26 -16" stroke="#fff" stroke-width="3"/>
    <rect x="-70" y="-74" width="90" height="8" fill="#A16207" stroke="${L}"/>${[-60, -44].map((dx) => `<rect x="${dx}" y="-90" width="8" height="16" rx="2" fill="#38BDF8" stroke="${L}" stroke-width="0.7"/>`).join('')}
    <!-- ghế cắt tóc (lưng ghế + chân) -->
    <rect x="${X.chair - X.barber - 22}" y="-104" width="44" height="58" rx="8" fill="#7F1D1D" stroke="${L}"/>
    <rect x="${X.chair - X.barber - 26}" y="-48" width="52" height="12" rx="4" fill="#991B1B" stroke="${L}"/>
    <rect x="${X.chair - X.barber - 4}" y="-36" width="8" height="30" fill="#94A3B8" stroke="${L}"/><ellipse cx="${X.chair - X.barber}" cy="-4" rx="22" ry="4" fill="#64748B" stroke="${L}"/>`;
  const studioIn = `<rect x="-130" y="-170" width="120" height="170" fill="#93C5FD" stroke="${L}"/><path d="M-130 -10 Q-70 -30 -10 -10" fill="#7DB3F5"/>
    <rect x="${X.stool - X.studio - 16}" y="-42" width="32" height="8" rx="3" fill="#78350F" stroke="${L}"/><path d="M${X.stool - X.studio - 12} -34 L${X.stool - X.studio - 16} 0 M${X.stool - X.studio + 12} -34 L${X.stool - X.studio + 16} 0" stroke="#78350F" stroke-width="3"/>
    <g transform="translate(70 -150)"><rect x="-22" y="-8" width="44" height="30" fill="#F8FAFC" stroke="${L}"/><path d="M0 22 V60" stroke="${L}" stroke-width="2"/><rect x="-6" y="-14" width="12" height="6" fill="#64748B"/></g>
    ${[0, 1, 2].map((i) => `<rect x="${20 + i * 30}" y="-100" width="24" height="30" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/><circle cx="${32 + i * 30}" cy="-89" r="6" fill="#F5D0B5" stroke="${L}" stroke-width="0.5"/>`).join('')}`;
  return `
  ${sky(0, W, 315, 'e094sky')}
  ${cloud(240, 56, 0.8, 0)}${cloud(780, 46, 0.9, 2)}${cloud(1500, 52, 0.7, 4)}
  <!-- dây điện -->
  <path d="M0 70 Q300 90 600 70 T1200 70 T1800 70 T2400 70" stroke="#1F2937" stroke-width="1.2" fill="none"/>
  <path d="M0 80 Q300 100 600 80 T1200 80 T1800 80" stroke="#1F2937" stroke-width="1" fill="none"/>
  <!-- nhà Minh -->
  <g transform="translate(0 ${FLOOR})"><rect x="0" y="-240" width="250" height="240" fill="#FEF08A" stroke="${L}" stroke-width="1.3"/>
    <rect x="${X.door - 30}" y="-120" width="60" height="120" fill="#7C2D12" stroke="${L}"/><g class="e094-houseDoor"><rect x="${X.door - 28}" y="-118" width="56" height="118" fill="#16A34A" stroke="${L}"/><path d="M${X.door} -118 V0" stroke="${L}"/></g>
    <rect x="170" y="-110" width="56" height="56" fill="#BAE6FD" stroke="${L}"/><rect x="166" y="-114" width="12" height="64" fill="#16A34A" stroke="${L}"/><rect x="218" y="-114" width="12" height="64" fill="#16A34A" stroke="${L}"/>
    <rect x="30" y="-210" width="60" height="50" fill="#BAE6FD" stroke="${L}"/><rect x="0" y="-150" width="250" height="10" fill="#FDE68A" stroke="${L}"/>
    <path d="M-4 -240 H254 L246 -252 H4Z" fill="#B91C1C" stroke="${L}"/></g>
  ${tree(440, FLOOR - 4, 1.1)}${bush(560, FLOOR, 0.8)}
  <g transform="translate(250 ${FLOOR})"><path d="M-14 0 L-10 -24 H10 L14 0Z" fill="#B45309" stroke="${L}"/><circle cy="-34" r="14" fill="#22C55E" stroke="${L}"/></g>
  <!-- quãng phố -->
  ${front(760, 180, '#FBCFE8', 'PHO 24', '#BE185D', `<rect x="-60" y="-140" width="120" height="70" fill="#BAE6FD" stroke="${L}"/>`)}
  ${tree(890, FLOOR - 4, 0.9, '')}
  <!-- tiệm sửa xe chú Long -->
  ${front(X.shop, 280, '#BFDBFE', "MR LONG'S BIKE REPAIR", '#1D4ED8', shopIn)}
  ${clock(X.shop - 20, FLOOR - 130, 15)}
  <!-- tiệm cắt tóc -->
  ${front(X.barber, 240, '#FECACA', "BARBER'S", '#B91C1C', barberIn)}
  <g transform="translate(${X.barber + 96} ${FLOOR - 160})"><rect x="-8" y="-6" width="16" height="70" rx="8" fill="#fff" stroke="${L}"/>
    <clipPath id="e094pole"><rect x="-7" y="-5" width="14" height="68" rx="7"/></clipPath><g clip-path="url(#e094pole)"><g class="e094-stripes">${Array.from({ length: 10 }, (_, i) => `<path d="M-10 ${-20 + i * 14} L10 ${-30 + i * 14} L10 ${-24 + i * 14} L-10 ${-14 + i * 14}Z" fill="${i % 2 ? '#2563EB' : '#DC2626'}"/>`).join('')}</g></g></g>
  <!-- tiệm chụp ảnh -->
  ${front(X.studio, 300, '#DDD6FE', 'PHOTO STUDIO', '#6D28D9', studioIn)}
  ${front(1960, 180, '#FDE68A', 'BOOKS', '#B45309', `<rect x="-70" y="-140" width="140" height="80" fill="#FEF3C7" stroke="${L}"/>`)}
  <!-- vỉa hè + đường -->
  <rect x="0" y="${FLOOR - 4}" width="${W}" height="14" fill="#E5E7EB" stroke="${L}"/>
  <rect x="0" y="${FLOOR + 10}" width="${W}" height="${315 - FLOOR - 10}" fill="#64748B"/>
  ${Array.from({ length: 34 }, (_, i) => `<rect x="${20 + i * 62}" y="${FLOOR + 20}" width="30" height="4" rx="2" fill="#F8FAFC"/>`).join('')}
  <!-- nhãn -->
  <g class="e094-lb e094-lb-flat">${label(X.bike0 + 60, 196, 'a flat tyre', '#DC2626', 14)}</g>
  <g class="e094-lb e094-lb-brake">${label(X.bike0 + 40, 150, 'brakes', '#DC2626', 14)}${CROSS(X.bike0 + 90, 145)}</g>
  <g class="e094-lb e094-lb-sat">${label(X.bike0 + 60, 66, 'Saturday morning', '#7C3AED', 15)}</g>
  <g class="e094-lb e094-lb-lunch">${label(X.shop - 70, 112, 'ready by lunchtime', '#0369A1', 14)}</g>
  <g class="e094-lb e094-lb-noon">${label(X.shop - 70, 112, "twelve o'clock", '#0369A1', 15)}</g>`;
}

function fg() {
  const shopBubble = `<g transform="translate(-66 -6) scale(0.7)">${headOnly('e094_long', { mood: 'joy' })}</g>
    <g transform="translate(-24 -8) rotate(-30)"><path d="M0 -14 V10" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/><path d="M-6 10 Q-7 20 0 21 Q7 20 6 10 L3 14 H-3Z" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/></g>
    <g transform="translate(46 14) scale(0.5)">${BIKE.replace('class="e094-bike"', '')}</g>${T(-8, 30, 'get it repaired', 12, '#EA580C')}`;
  const card = `<rect x="-62" y="-38" width="124" height="76" rx="8" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="-62" y="-38" width="124" height="18" rx="8" fill="#6D28D9"/><rect x="-62" y="-26" width="124" height="6" fill="#6D28D9"/>
    ${T(0, -25, 'STUDENT CARD', 10, '#fff')}<clipPath id="e094cardph"><rect x="-54" y="-14" width="40" height="46"/></clipPath><rect x="-54" y="-14" width="40" height="46" fill="#93C5FD" stroke="${L}" stroke-width="0.8"/>
    <g clip-path="url(#e094cardph)"><g transform="translate(-34 12)">${headOnly('en_lan_home', { s: 0.62, mood: 'joy' })}</g><path d="M-48 32 Q-34 18 -20 32Z" fill="#F9A8D4"/></g>
    ${T(22, 0, 'LAN', 12, '#1F2937')}<path d="M-6 12 H52 M-6 22 H40" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>`;
  const list = `<rect x="-90" y="-50" width="180" height="100" rx="6" fill="#FEF9C3" stroke="${L}" stroke-width="1.4"/>
    ${T(0, -30, "Mr Long's work", 13, '#7C2D12')}
    <g class="e094-li e094-li-1">${TICK(-70, -9)}${T(8, -4, 'brakes checked', 13)}</g>
    <g class="e094-li e094-li-2">${TICK(-70, 15)}${T(8, 20, 'tyre changed', 13)}</g>
    <g class="e094-li e094-li-3">${TICK(-70, 39)}${T(8, 44, 'chain cleaned', 13)}</g>`;
  const bubble = (k, x, y, w, h, inner, [tx, ty]) => {
    const bx = Math.max(x - w / 2 + 18, Math.min(x + w / 2 - 18, tx)), by = y + h / 2;
    return `<g class="e094-b e094-b-${k}" style="transform-origin:${tx}px ${ty}px"><path d="M${bx - 9} ${by - 1} L${tx} ${ty} L${bx + 9} ${by - 1}Z" fill="#fff" stroke="${L}" stroke-width="1.4" stroke-linejoin="round"/>
      <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="14" fill="#fff" stroke="${L}" stroke-width="1.4"/><path d="M${bx - 7.6} ${by - 1.2} L${tx} ${ty - 2} L${bx + 7.6} ${by - 1.2}Z" fill="#fff"/>
      <g transform="translate(${x} ${y})">${inner}</g></g>`;
  };
  return `
  <!-- tóc rơi -->
  <g class="e094-hair">${Array.from({ length: 9 }, (_, i) => `<path style="animation-delay:${(i * 0.17).toFixed(2)}s" d="M${X.chair - 16 + (i * 7) % 34} 180 l3 5" stroke="#1F1716" stroke-width="1.8" stroke-linecap="round"/>`).join('')}</g>
  <!-- máy ảnh trên chân (trước mặt thợ ảnh) -->
  <g transform="translate(${X.cam} ${FLOOR})"><path d="M0 -92 L-16 0 M0 -92 L16 0 M0 -92 V0" stroke="#1F2937" stroke-width="2.4"/>
    <rect x="-18" y="-112" width="36" height="24" rx="4" fill="#1F2937" stroke="${L}"/><circle cx="-18" cy="-100" r="9" fill="#475569" stroke="${L}"/><circle cx="-18" cy="-100" r="5" fill="#0EA5E9"/>
    <rect x="-6" y="-120" width="14" height="8" rx="2" fill="#475569" stroke="${L}" stroke-width="0.7"/></g>
  <g class="e094-flash"><rect x="${X.studio - 150}" y="0" width="300" height="315" fill="#fff"/></g>
  <!-- nhãn người khác làm cho mình -->
  <g class="e094-lb e094-lb-self">${label(X.bike0 - 40, 96, 'fix it himself', '#16A34A', 14)}</g>
  <g class="e094-lb e094-lb-safe"><g transform="translate(150 96)"><path d="M0 -20 L20 14 H-20Z" fill="#FACC15" stroke="${L}" stroke-width="1.4" stroke-linejoin="round"/>${T(0, 10, '!', 18, '#1F2937')}</g>${label(150, 140, 'not safe', '#DC2626', 14)}</g>
  <g class="e094-lb e094-lb-sp-dad">${speaker(X.door + 26, 112, 'Dad')}</g>
  <g class="e094-lb e094-lb-cut">${label(X.barber + 10, 76, 'had his hair cut', '#B91C1C', 15)}</g>
  <g class="e094-lb e094-lb-busy">${label(X.studio - 20, 74, 'Lan was busy too', '#6D28D9', 15)}</g>
  <g class="e094-lb e094-lb-photo">${label(X.studio - 10, 74, 'having her photo taken', '#6D28D9', 14)}</g>
  <g class="e094-lb e094-lb-new">${label(X.stand + 20, 74, 'almost new!', '#16A34A', 18)}</g>
  ${bubble('shop', X.door + 160, 86, 200, 78, shopBubble, [X.door + 90, 112])}
  ${bubble('noon', X.shop + 64, 86, 104, 54, `<g transform="translate(-28 0)"><circle r="16" fill="#fff" stroke="${L}" stroke-width="1.4"/><path d="M0 0 V-11 M0 0 V-8" stroke="#1F2937" stroke-width="2.4" stroke-linecap="round"/></g>${T(20, 6, '12:00', 15, '#DC2626')}`, [X.long - 10, 118])}
  <g class="e094-card" style="transform-origin:${X.studio + 30}px 160px"><g transform="translate(${X.studio + 30} 122)">${card}</g></g>
  <g class="e094-list" style="transform-origin:${X.stand - 60}px 140px"><g transform="translate(${X.stand - 80} 96)">${list}</g></g>`;
}

const CSS = `
.e094-lb { opacity: 0; transition: opacity .35s; }
${['flat', 'brake', 'sat', 'lunch', 'noon', 'self', 'safe', 'sp-dad', 'cut', 'busy', 'photo', 'new'].map((k) => `.st-lb-${k} .e094-lb-${k}`).join(', ')} { opacity: 1; }
.e094-b .e094-hl, .e094-b .e094-shine, .e094-b .e094-tyreFlat, .e094-b .e094-dirt { display: none; }
.e094-b, .e094-card, .e094-list { opacity: 0; transform: scale(.35); transition: opacity .25s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-b-shop .e094-b-shop, .st-b-noon .e094-b-noon, .st-card .e094-card, .st-list .e094-list { opacity: 1; transform: none; }
.e094-li { opacity: 0; transition: opacity .3s; }
.st-li1 .e094-li-1, .st-li2 .e094-li-2, .st-li3 .e094-li-3 { opacity: 1; }
.e094-hh { transform: rotate(270deg); transition: transform 1.4s ease-in-out; } .e094-mh { transform: rotate(0deg); transition: transform 1.4s ease-in-out; }
.st-lunch .e094-hh { transform: rotate(360deg); } .st-lunch .e094-mh { transform: rotate(720deg); }
.e094-houseDoor { transform-origin: ${X.door - 28}px 0px; transition: transform .5s ease-out; } .st-hdoor .e094-houseDoor { transform: scaleX(.15); }
.e094-stripes { animation: e094Pole 1.6s linear infinite; } @keyframes e094Pole { from { transform: translateY(0); } to { transform: translateY(28px); } }
.e094-hair path { opacity: 0; transform-box: fill-box; transform-origin: center; } .st-snip .e094-hair path { animation: e094Fall .9s ease-in infinite; }
@keyframes e094Fall { 0% { opacity: 0; transform: translateY(0); } 15% { opacity: 1; } 100% { opacity: 0; transform: translate(4px, 34px) rotate(40deg); } }
.e094-flash { opacity: 0; } .st-flash .e094-flash { animation: e094Flash .5s ease-out; }
@keyframes e094Flash { 0% { opacity: .95; } 100% { opacity: 0; } }
.es-ac[data-id="bike"] .e094-tyreFlat, .es-ac[data-id="bike"].e094-flat .e094-tyreOk { display: none; }
.es-ac[data-id="bike"].e094-flat .e094-tyreFlat { display: inline; }
.es-ac[data-id="bike"] .e094-dirt { opacity: 0; } .es-ac[data-id="bike"].e094-flat .e094-dirt { opacity: 1; }
.es-ac[data-id="bike"].e094-flat .e094-chain ellipse { stroke: #78350F; }
.es-ac[data-id="bike"] .e094-hl { opacity: 0; transition: opacity .25s; }
.es-ac[data-id="bike"].e094-hl-brake .e094-hl-brake, .es-ac[data-id="bike"].e094-hl-tyre .e094-hl-tyre, .es-ac[data-id="bike"].e094-hl-chain .e094-hl-chain { opacity: 1; animation: e094Pulse .5s ease-in-out infinite alternate; }
@keyframes e094Pulse { to { opacity: .4; } }
.es-ac[data-id="bike"] .e094-shine { opacity: 0; } .es-ac[data-id="bike"].e094-new .e094-shine { opacity: 1; }
.es-ac[data-id="bike"].e094-new .e094-shine path { transform-box: fill-box; transform-origin: center; animation: e094Twinkle .8s ease-in-out infinite alternate; }
@keyframes e094Twinkle { from { transform: scale(.4); } to { transform: scale(1.2); } }
.es-ac[data-id="bike"] .e094-wh { transform-box: fill-box; transform-origin: center; }
.es-ac[data-id="bike"].is-walk .e094-wh, .es-ac[data-id="bike"].e094-spin .e094-whF { animation: e094Wheel .7s linear infinite; }
@keyframes e094Wheel { to { transform: rotate(360deg); } }
.e094-snip { transform-origin: 0 0; } .act-e094cut .e094-snip { animation: e094Snip .18s ease-in-out infinite alternate; }
@keyframes e094Snip { to { transform: rotate(18deg); } }
.act-e094cut .pp-fowR { animation: ppPaint .3s ease-in-out infinite alternate; }
@media (prefers-reduced-motion: reduce) { .e094-stripes { animation-duration: 5s; } .st-snip .e094-hair path { animation-duration: 2s; } }
`;

const on = (st, ...ks) => ks.forEach((k) => st.set(k, true));
const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const cls = (st, c, v = true) => st.a('bike').el.classList.toggle(c, v);

const BEATS = [
  { key: ['a flat tyre', 'brakes were not working'], icon: '🛞', label: 'a flat tyre', async play(st) {
    st.look(300);
    st.pose('minh', 'e094_bend'); st.mood('minh', 'wow');
    await st.wait(500);
    cls(st, 'e094-flat'); st.sfx('hiss', { vol: 0.8 }); on(st, 'st-lb-flat');
    await st.wait(1100);
    st.mood('minh', 'sad'); st.pose('minh', 'e094_push');
    st.sfx('click', { vol: 0.7 }); await st.wait(300); st.sfx('click', { vol: 0.7 });
    on(st, 'st-lb-brake'); st.sfx('buzz-no', { vol: 0.4 });
    await st.wait(1100);
  } },
  { key: ['wanted to fix it himself', 'Dad said it was not safe'], icon: '🔧', label: 'not safe', async play(st) {
    off(st, 'st-lb-flat', 'st-lb-brake');
    st.look(260);
    st.hold('minh', 'e094_wrench'); st.pose('minh', 'e094_tool'); st.mood('minh', 'joy'); on(st, 'st-lb-self'); st.sfx('click', { vol: 0.6 });
    on(st, 'st-hdoor'); st.sfx('door-open', { vol: 0.5 });
    await st.walk('dad', 200, { speed: 105, follow: false });
    st.pose('dad', 'hips'); st.act('dad', 'no'); st.mood('dad', 'sad');
    off(st, 'st-lb-self'); on(st, 'st-lb-safe'); st.sfx('buzz-no', { vol: 0.5 });
    await st.wait(1200);
    st.act('dad', null); st.mood('minh', 'sad'); st.pose('minh', 'stand'); st.hold('minh', null);
    await st.wait(300);
  } },
  { key: ["get it repaired at Mr Long's shop"], icon: '🏪', label: 'get it repaired', async play(st) {
    off(st, 'st-lb-safe', 'st-hdoor');
    st.look(260);
    st.pose('dad', 'e094_far'); st.mood('dad', 'joy'); on(st, 'st-lb-sp-dad'); st.talk('dad', true);
    await st.wait(200);
    on(st, 'st-b-shop'); st.sfx('pop', { vol: 0.7 });
    await st.wait(2200);
    st.talk('dad', false); st.mood('minh', 'joy'); st.act('minh', 'nod');
    await st.wait(500);
    st.act('minh', null);
  } },
  { key: ['on Saturday morning', 'pushed his bike down the street'], icon: '🚲', label: 'pushed his bike', async play(st) {
    off(st, 'st-b-shop', 'st-lb-sp-dad'); st.pose('dad', 'wave'); st.act('dad', 'wave');
    st.look(330);
    on(st, 'st-lb-sat'); st.sfx('birds', { vol: 0.5 });
    await st.walk('minh', X.bike0 - 8, { speed: 120, follow: false });
    st.face('minh', 1); st.pose('minh', 'e094_push'); st.hold('minh', 'e094_none');
    await st.wait(300);
    off(st, 'st-lb-sat');
    const bx = X.stand - 10;
    st.look(X.stand - 60, { dur: ((bx - X.bike0) / 140) * 1000 * 1.1 });
    await st.loop('roll', () => Promise.all([
      st.walk('minh', bx - 8, { speed: 140, follow: false }),
      st.walk('bike', bx, { speed: 140, follow: false }),
    ]), { vol: 0.35 });
    st.pose('minh', 'stand'); st.hold('minh', null);
    st.act('dad', null); st.pose('dad', 'stand');
  } },
  { key: ['Mr Long looked at it carefully', 'ready by lunchtime'], icon: '🔍', label: 'ready by lunchtime', async play(st) {
    st.look(X.shop);
    st.walk('minh', X.stand - 70, { speed: 100, follow: false });
    st.walk('bike', X.stand, { speed: 100, follow: false });
    await st.walk('long', X.stand + 58, { speed: 90, follow: false });
    st.face('long', -1); st.hold('long', 'e094_lens'); st.pose('long', 'e094_lens');
    cls(st, 'e094-spin'); st.sfx('roll', { vol: 0.4 });
    await st.wait(1300);
    cls(st, 'e094-spin', false);
    st.pose('long', 'point'); st.hold('long', null); st.mood('long', 'joy'); st.face('long', -1);
    on(st, 'st-lunch', 'st-lb-lunch');
    await st.loop('tick', () => st.wait(1300), { vol: 0.7 });
    st.sfx('ding', { vol: 0.5 });
    await st.wait(500);
    st.pose('long', 'stand');
  } },
  { key: ["While Minh waited", "went to the barber's next door", 'had his hair cut'], icon: '💇', label: 'had his hair cut', async play(st) {
    off(st, 'st-lunch', 'st-lb-lunch');
    st.face('minh', 1);
    await st.walk('minh', X.chair, { speed: 140, lead: 10 });
    st.face('minh', 1); st.pose('minh', 'sitHold'); st.place('minh', X.chair, FLOOR);
    st.face('barber', -1); st.hold('barber', 'e094_scissors'); st.pose('barber', 'e094_snip');
    on(st, 'st-lb-cut', 'st-snip'); st.act('barber', 'e094cut');
    for (let i = 0; i < 5; i++) { st.sfx('click', { vol: 0.5, rate: 1.8 }); await st.wait(260); }
    off(st, 'st-snip'); st.act('barber', null);
    await st.dress('minh', 'e094_minh_cut');
    st.pose('minh', 'sitHold'); st.mood('minh', 'joy');
    await st.wait(700);
  } },
  { key: ['Lan was busy too'], icon: '📝', label: 'busy too', async play(st) {
    off(st, 'st-lb-cut'); st.pose('barber', 'stand'); st.hold('barber', null);
    st.look(X.studio + 20, { dur: 1000 });
    on(st, 'st-lb-busy');
    st.act('lan', 'write');
    await st.loop('pencil', () => st.wait(1500), { vol: 0.8 });
    st.act('lan', null);
  } },
  { key: ['having her photo taken', 'new student card'], icon: '📸', label: 'photo taken', async play(st) {
    off(st, 'st-lb-busy');
    st.look(X.studio + 20);
    st.chest('lan', null); st.pose('lan', 'e094_sitUp'); st.mood('lan', 'joy');
    on(st, 'st-lb-photo');
    st.pose('photo', 'e094_cam');
    await st.wait(800);
    on(st, 'st-flash'); st.sfx('camera', { vol: 0.9 });
    await st.wait(500);
    off(st, 'st-flash');
    on(st, 'st-card'); st.sfx('pop', { vol: 0.6 });
    await st.wait(1500);
  } },
  { key: ["At twelve o'clock", 'picked up his bike'], icon: '🕛', label: "twelve o'clock", async play(st) {
    off(st, 'st-lb-photo', 'st-card'); st.pose('photo', 'stand'); st.pose('lan', 'sit');
    cls(st, 'e094-flat', false);
    st.place('minh', X.chair + 60, FLOOR, -1); st.pose('minh', 'stand');
    st.look(X.shop + 30, { dur: 900 });
    on(st, 'st-lb-noon'); on(st, 'st-b-noon'); st.sfx('ding', { vol: 0.6 });
    await st.wait(400); st.sfx('ding', { vol: 0.5 });
    await st.walk('minh', X.stand - 52, { speed: 140, follow: false });
    st.face('minh', 1); st.pose('minh', 'e094_push'); st.mood('minh', 'joy'); st.sfx('bag-on', { vol: 0.4 });
    st.pose('long', 'give'); st.mood('long', 'joy');
    await st.wait(700);
  } },
  { key: ['had the brakes checked', 'the tyre changed', 'the chain cleaned'], icon: '✅', label: 'checked · changed · cleaned', async play(st) {
    off(st, 'st-lb-noon', 'st-b-noon');
    st.look(X.shop - 10);
    on(st, 'st-list'); st.sfx('page-turn', { vol: 0.6 });
    st.pose('long', 'point');
    await st.wait(400);
    for (const [i, k] of [[1, 'brake'], [2, 'tyre'], [3, 'chain']]) {
      cls(st, `e094-hl-${k}`); on(st, `st-li${i}`); st.sfx('bike-fix', { vol: 0.7 });
      await st.wait(700);
      cls(st, `e094-hl-${k}`, false);
      st.sfx('click', { vol: 0.5 });
      await st.wait(150);
    }
    st.pose('long', 'stand');
    await st.wait(300);
  } },
  { key: ['It looked almost new'], icon: '✨', label: 'almost new', async play(st) {
    off(st, 'st-list', 'st-li1', 'st-li2', 'st-li3');
    st.look(X.shop - 10);
    cls(st, 'e094-new'); on(st, 'st-lb-new');
    st.fx('sparkle', X.stand, FLOOR - 50);
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    st.pose('long', 'clap'); st.act('long', 'clap'); st.sfx('clap', { vol: 0.4 });
    await st.wait(1600);
    st.act('minh', null); st.act('long', null); st.pose('minh', 'stand'); st.pose('long', 'stand');
  } },
];

export default {
  id: 'en094', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 2, 3, 5, 7, 9],
  cast: [
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: X.door, face: 1 },
    { id: 'long', kind: 'adult', who: 'e094_long', x: X.long, face: -1 },
    { id: 'barber', kind: 'adult', who: 'e094_barber', x: X.chair + 56, face: -1 },
    { id: 'photo', kind: 'adult', who: 'e094_photo', x: X.photo, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.stool, face: 1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.bike0 - 60, face: 1 },
    { id: 'bike', kind: 'thing', x: X.bike0, svg: BIKE, box: [-64, -84, 128, 88] },
  ],
  init(st) {
    st.pose('lan', 'write'); st.chest('lan', `<g transform="translate(0 -12)"><rect x="-10" y="-8" width="20" height="14" rx="1.5" fill="#fff" stroke="${L}" stroke-width="0.8" transform="rotate(-6)"/><path d="M-6 -4 H6 M-6 0 H4" stroke="#94A3B8" stroke-width="0.8"/></g>`);
  },
};
