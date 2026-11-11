/**
 * Bài 76 "Saving the Sea Turtles" (so / because / so that): đảo Côn Đảo, đi từ trái sang phải: biển + cầu tàu (thuyền cập bến,
 * bảng bản đồ Việt Nam có chấm đỏ Côn Đảo ở phía nam) → trung tâm bảo tồn rùa biển (biển hiệu, bảng "DANGER": lưới chụp rùa,
 * rác rơi xuống biển) → quầy hàng nhỏ → khu ấp trứng có rào lưới (safe place) → bãi cát nơi rùa mẹ đẻ trứng ban đêm → biển
 * (rùa con bò xuống nước; dưới nước con sứa và túi ni lông trông giống nhau).
 * Tỉ lệ thật: trẻ em cao ≈ 1,3 m = 122 đơn vị (≈ 94 đơn vị / m): rùa mẹ mai ≈ 1 m (dài 96), rùa con ≈ 6 cm (vẽ 12 để thấy rõ),
 * trứng ≈ 4 cm, sứa / túi ni lông ≈ 30 cm, chó ≈ 50 cm.
 * Toạ độ cảnh: rộng 2500, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, palm, bush, label, night, sun } from '../kit.js';

const FLOOR = 282;
const W = 2500;
const X = { pier: 300, sign: 470, centre: 720, door: 790, board: 1010, kiosk: 1170, hatch: 1450, nest: 1990, shore: 2080, jelly: 2330 };

Object.assign(CAST, {
  e076_tuan: { adult: true, hair: 'short', top: 'shirt', shirt: '#15803D', bottom: 'pants', bottomC: '#78716C', shoe: '#44403C', hat: 'cap' },
  e076_seller: { adult: true, hair: 'bun', top: 'blouse', shirt: '#FDBA74', bottom: 'pants', bottomC: '#334155', shoe: '#78716C' },
});

// ── Đồ vật / con vật (gốc = điểm chạm đất, nhìn sang phải) ───────────────────────────────
const TURTLE = `<g class="e076-tt">
  <g class="e076-flipB"><path d="M-30 -6 Q-46 -2 -50 6 Q-36 6 -24 -2Z" fill="#65A30D" stroke="${L}" stroke-width="0.9"/></g>
  <g class="e076-flipF"><path d="M18 -8 Q36 -2 42 10 Q26 8 12 -2Z" fill="#65A30D" stroke="${L}" stroke-width="0.9"/></g>
  <path d="M44 -14 Q58 -18 60 -10 Q58 -2 46 -4Z" fill="#84CC16" stroke="${L}" stroke-width="0.9"/><circle cx="53" cy="-12" r="1.8" fill="#1F2937"/>
  <ellipse cx="0" cy="-14" rx="44" ry="17" fill="#A16207" stroke="${L}" stroke-width="1.2"/>
  <path d="M-30 -18 L-14 -27 L6 -28 L24 -22 M-30 -18 L-12 -10 L8 -10 L28 -16 M-14 -27 L-12 -10 M6 -28 L8 -10" stroke="#713F12" stroke-width="1.2" fill="none"/>
  <path d="M-44 -6 H44" stroke="${L}" stroke-width="0.8"/></g>`;
const BABY = (s = 1) => `<g transform="scale(${s})"><g class="e076-bw"><path d="M-6 -1 l-4 3 M4 -2 l5 3 M-5 -4 l-4 -3 M4 -5 l5 -3" stroke="#365314" stroke-width="2" stroke-linecap="round"/>
  <ellipse cx="0" cy="-3" rx="6" ry="4" fill="#3F6212" stroke="${L}" stroke-width="0.7"/><circle cx="8" cy="-4" r="2.4" fill="#4D7C0F" stroke="${L}" stroke-width="0.6"/></g></g>`;
const BABY_HELD = `<g transform="translate(0 -6) scale(1.4)">${BABY()}</g>`;
const EGG = (x, y) => `<circle cx="${x}" cy="${y}" r="2.8" fill="#F8FAFC" stroke="${L}" stroke-width="0.6"/>`;
const EGGS = (x, y) => [[-6, 0], [0, -1], [6, 0], [-3, -4], [3, -4], [0, -7]].map(([dx, dy]) => EGG(x + dx, y + dy)).join('');
const BUCKET = (full = false) => `<g transform="translate(0 -8)"><path d="M-12 -14 H12 L9 10 H-9Z" fill="#38BDF8" stroke="${L}" stroke-width="1"/><path d="M-12 -14 Q0 -30 12 -14" stroke="${L}" stroke-width="1.2" fill="none"/>
  ${full ? EGGS(0, -13) : ''}</g>`;
const DOG = `<g class="e076-dog"><path d="M-20 -26 Q-30 -32 -32 -40" stroke="${L}" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M-20 -26 Q-30 -32 -32 -40" stroke="#9CA3AF" stroke-width="3.4" stroke-linecap="round" fill="none"/>
  ${[-16, 12].map((x) => `<g transform="translate(${x} -22)"><g class="e076-legA"><path d="M0 0 V21" stroke="${L}" stroke-width="6.4" stroke-linecap="round"/><path d="M0 0 V21" stroke="#9CA3AF" stroke-width="4.8" stroke-linecap="round"/></g></g>`).join('')}
  ${[-11, 17].map((x) => `<g transform="translate(${x} -22)"><g class="e076-legB"><path d="M0 0 V21" stroke="${L}" stroke-width="6.4" stroke-linecap="round"/><path d="M0 0 V21" stroke="#D1D5DB" stroke-width="4.8" stroke-linecap="round"/></g></g>`).join('')}
  <ellipse cx="0" cy="-28" rx="24" ry="10" fill="#9CA3AF" stroke="${L}" stroke-width="1"/>
  <g transform="translate(26 -40)"><path d="M-4 -8 L-2 -18 L4 -8Z" fill="#6B7280" stroke="${L}" stroke-width="0.8"/><circle r="9" fill="#9CA3AF" stroke="${L}" stroke-width="1"/>
    <ellipse cx="9" cy="3" rx="6" ry="4" fill="#E5E7EB" stroke="${L}" stroke-width="0.8"/><circle cx="14" cy="1" r="2" fill="#1F2937"/><circle cx="3" cy="-3" r="1.5" fill="#1F2937"/></g></g>`;
const GULL = `<g class="e076-gull"><ellipse cx="0" cy="-2" rx="12" ry="5" fill="#fff" stroke="${L}" stroke-width="0.9"/><circle cx="11" cy="-6" r="4.4" fill="#fff" stroke="${L}" stroke-width="0.9"/>
  <path d="M15 -6 l6 1.4 l-6 1.4Z" fill="#F59E0B" stroke="${L}" stroke-width="0.5"/><circle cx="12" cy="-7" r="0.9" fill="#1F2937"/>
  <g class="e076-wing"><path d="M-4 -4 Q-10 -24 -24 -20 Q-14 -10 -10 -2Z" fill="#E5E7EB" stroke="${L}" stroke-width="0.8"/></g></g>`;
const JELLY = `<g class="e076-bob"><path d="M-14 0 Q-14 -18 0 -18 Q14 -18 14 0 Q7 -3 0 0 Q-7 -3 -14 0Z" fill="#F9A8D4" fill-opacity="0.75" stroke="#DB2777" stroke-width="1"/>
  ${[-9, -3, 3, 9].map((x, i) => `<path d="M${x} 0 q${i % 2 ? 3 : -3} 8 0 16 q${i % 2 ? -3 : 3} 6 0 12" stroke="#EC4899" stroke-width="1.4" fill="none"/>`).join('')}</g>`;
const PBAG = `<g class="e076-bob" style="animation-delay:-.8s"><path d="M-14 0 Q-16 -18 -8 -20 L-6 -28 L-2 -20 H2 L6 -28 L8 -20 Q16 -18 14 0 Q7 -3 0 0 Q-7 -3 -14 0Z" fill="#FFFFFF" fill-opacity="0.9" stroke="#64748B" stroke-width="1.1"/>
  ${[-9, -1, 7].map((x) => `<path d="M${x} 0 q3 8 -1 16 q-3 6 1 10" stroke="#CBD5E1" stroke-width="1.8" fill="none"/>`).join('')}</g>`;
/** Túi vải (gốc = tay cầm, treo xuống) và túi ni lông trong tay. */
const PROPS = {
  e076_cloth: `<g transform="rotate(180) translate(0 -2)"><path d="M-6 0 Q0 -10 6 0" stroke="#A16207" stroke-width="1.8" fill="none" transform="scale(1 -1)"/>
    <path d="M-12 0 H12 L13 24 Q0 26 -13 24Z" fill="#FEF3C7" stroke="${L}" stroke-width="1"/><path d="M-6 10 q6 -6 12 0 q-6 8 -12 0Z" fill="#22C55E" stroke="${L}" stroke-width="0.6"/></g>`,
  e076_plastic: `<g transform="rotate(180) translate(0 -2)"><path d="M-12 0 Q-14 22 0 24 Q14 22 12 0 L8 -6 M-8 -6 L-12 0" fill="#F8FAFC" fill-opacity="0.9" stroke="#94A3B8" stroke-width="1"/></g>`,
};
const BADGE = `<rect x="4" y="-14" width="14" height="9" rx="1.5" fill="#fff" stroke="${L}" stroke-width="0.6"/><path d="M7 -9.5 h8" stroke="#16A34A" stroke-width="1.6"/>`;
const POSES = {
  e076_bend: { R: [40, 60], L: [40, 60], dy: 16, head: 14 },
  e076_careful: { R: [24, -86], L: [24, -86], head: 12 },
  e076_explain: { R: [70, 40], L: [40, 10], head: -4 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
/** Bảng "DANGER": cảnh biển thu nhỏ trong khung (tâm x, y). */
const dangerBoard = (x, y) => `<g transform="translate(${x} ${y})">
  <path d="M-70 60 V112 M70 60 V112" stroke="#78716C" stroke-width="5"/>
  <rect x="-96" y="-66" width="192" height="130" rx="6" fill="#fff" stroke="${L}" stroke-width="1.6"/>
  <text x="0" y="-48" text-anchor="middle" ${NUN} font-size="16" fill="#DC2626">DANGER</text>
  <defs><clipPath id="e076clip"><rect x="-88" y="-40" width="176" height="96" rx="3"/></clipPath></defs>
  <g clip-path="url(#e076clip)"><rect x="-88" y="-40" width="176" height="96" fill="#7DD3FC"/><rect x="-88" y="-40" width="176" height="16" fill="#BAE6FD"/>
    <g transform="translate(-50 -26)"><path d="M-22 0 H22 L16 10 H-16Z" fill="#B45309" stroke="${L}" stroke-width="0.8"/><path d="M0 0 V-14 M0 -12 L-8 0" stroke="${L}" stroke-width="1.2"/></g>
    <g transform="translate(-20 26) scale(0.42)">${TURTLE}</g>
    <g class="e076-net"><path d="M-50 -18 L-44 4" stroke="${L}" stroke-width="0.8"/><path d="M-46 4 Q-20 -4 4 6 L2 34 Q-22 40 -46 32Z" fill="#fff" fill-opacity="0.15" stroke="#334155" stroke-width="1"/>
      ${[0, 1, 2, 3].map((i) => `<path d="M${-44 + i * 12} 4 V36 M-46 ${10 + i * 7} H4" stroke="#334155" stroke-width="0.6"/>`).join('')}</g>
    <g class="e076-trash"><g transform="translate(40 -10)"><rect x="-3" y="-8" width="6" height="14" rx="2" fill="#93C5FD" stroke="${L}" stroke-width="0.6"/></g>
      <g transform="translate(60 -16)"><rect x="-4" y="-5" width="8" height="10" fill="#EF4444" stroke="${L}" stroke-width="0.6"/></g>
      <g transform="translate(74 -6) scale(0.6)">${PBAG.replace('e076-bob', '')}</g></g>
    <rect class="e076-dirt" x="-88" y="-24" width="176" height="80" fill="#78350F" opacity="0"/></g>
  <rect x="-88" y="-40" width="176" height="96" rx="3" fill="none" stroke="${L}"/></g>`;
/** Bản đồ Việt Nam trên bảng (gốc = tâm bảng). */
const vnSign = (x) => `<g transform="translate(${x} 0)"><path d="M0 ${FLOOR} V214" stroke="#78716C" stroke-width="5"/>
  <rect x="-46" y="108" width="92" height="110" rx="5" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="-40" y="114" width="80" height="98" fill="#BAE6FD"/>
  <path d="M-16 120 Q2 116 6 124 Q-4 132 -2 142 Q4 154 14 166 Q22 182 8 194 Q-2 202 -12 198 Q-2 188 -2 178 Q-4 164 -14 150 Q-24 136 -16 120Z" fill="#86EFAC" stroke="${L}" stroke-width="1"/>
  <text x="-20" y="134" text-anchor="middle" ${NUN} font-size="7" fill="#166534">VIET NAM</text>
  <g class="e076-dot"><circle cx="20" cy="204" r="4" fill="#DC2626" stroke="#fff" stroke-width="1"/></g></g>`;

function bg() {
  return `
  ${sky(0, W, 315, 'e076sky')}
  <g transform="translate(300 64)">${sun(22)}</g>
  ${cloud(160, 70, 0.8, 0)}${cloud(900, 54, 0.9, 2)}${cloud(1600, 70, 0.8, 4)}${cloud(2250, 50, 0.9, 1)}
  <!-- biển bên trái + cầu tàu -->
  <rect x="0" y="236" width="${X.pier + 60}" height="79" fill="#38BDF8" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: 8 }, (_, i) => `<path d="M${14 + i * 40} ${250 + (i % 3) * 14} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  ${[250, 290, 330].map((x) => `<rect x="${x - 3}" y="${FLOOR}" width="6" height="40" fill="#92400E" stroke="${L}" stroke-width="0.7"/>`).join('')}
  <rect x="236" y="${FLOOR - 2}" width="130" height="8" fill="#B45309" stroke="${L}"/>
  <!-- đảo: đất cỏ, cây dừa -->
  <path d="M360 ${FLOOR - 50} Q600 200 900 ${FLOOR - 56} T1300 ${FLOOR - 44} V${FLOOR} H360Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <path d="M1250 ${FLOOR - 40} Q1600 ${FLOOR - 70} 1900 ${FLOOR - 40} L${X.shore + 40} ${FLOOR - 26} V${FLOOR} H1250Z" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>
  ${palm(410, FLOOR - 4, 0.9)}${palm(1300, FLOOR - 4, 1)}${palm(1720, FLOOR - 6, 0.85)}
  ${vnSign(X.sign)}
  <!-- trung tâm bảo tồn rùa biển -->
  <g transform="translate(${X.centre} 0)">
    <rect x="-150" y="120" width="300" height="${FLOOR - 120}" fill="#ECFCCB" stroke="${L}" stroke-width="1.4"/>
    <path d="M-166 124 L-120 84 H120 L166 124Z" fill="#0F766E" stroke="${L}" stroke-width="1.4"/>
    <rect x="-128" y="92" width="256" height="26" rx="5" fill="#fff" stroke="${L}"/>
    <text x="10" y="111" text-anchor="middle" ${NUN} font-size="15" fill="#0F766E">SEA TURTLE CENTRE</text>
    <g transform="translate(-112 112) scale(0.22)">${TURTLE}</g>
    ${[-110, -40].map((dx) => `<rect x="${dx}" y="150" width="46" height="40" fill="#BAE6FD" stroke="${L}"/><path d="M${dx + 23} 150 V190" stroke="${L}" stroke-width="0.8"/>`).join('')}
    <rect x="${X.door - X.centre - 26}" y="${FLOOR - 92}" width="52" height="92" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
    <g class="e076-doorleaf"><rect x="${X.door - X.centre - 24}" y="${FLOOR - 90}" width="48" height="90" fill="#D97706" stroke="${L}"/><circle cx="${X.door - X.centre + 16}" cy="${FLOOR - 44}" r="2.6" fill="#FDE68A"/></g></g>
  ${dangerBoard(X.board, 170)}
  <!-- quầy hàng nhỏ -->
  <g transform="translate(${X.kiosk} 0)"><path d="M-70 126 H70 L60 150 H-60Z" fill="#F472B6" stroke="${L}" stroke-width="1.2"/>
    ${[-50, -25, 0, 25, 50].map((dx, i) => `<path d="M${dx - 12} 150 q12 12 24 0" fill="${i % 2 ? '#fff' : '#F472B6'}" stroke="${L}" stroke-width="0.7"/>`).join('')}
    <path d="M-58 150 V${FLOOR} M58 150 V${FLOOR}" stroke="#92400E" stroke-width="4"/>
    <text x="0" y="144" text-anchor="middle" ${NUN} font-size="12" fill="#fff">SHOP</text></g>
  <!-- khu ấp trứng: rào lưới (phía sau), cát, chỗ chôn trứng -->
  <g transform="translate(${X.hatch} 0)">
    <rect x="-96" y="${FLOOR - 16}" width="192" height="18" fill="#FCD34D" stroke="${L}" stroke-width="0.8"/>
    <path d="M-96 ${FLOOR} V196 M96 ${FLOOR} V196 M-96 196 H96" stroke="#78716C" stroke-width="4"/>
    ${Array.from({ length: 13 }, (_, i) => `<path d="M${-96 + i * 16} 196 V${FLOOR - 14}" stroke="#94A3B8" stroke-width="0.8"/>`).join('')}
    ${Array.from({ length: 5 }, (_, i) => `<path d="M-96 ${206 + i * 14} H96" stroke="#94A3B8" stroke-width="0.8"/>`).join('')}
    <g class="e076-buried">${[-60, -20, 20, 60].map((dx) => `<path d="M${dx - 10} ${FLOOR - 14} q10 -8 20 0Z" fill="#F59E0B" stroke="${L}" stroke-width="0.6"/><path d="M${dx} ${FLOOR - 20} V${FLOOR - 36}" stroke="#92400E" stroke-width="1.6"/><rect x="${dx}" y="${FLOOR - 36}" width="9" height="6" fill="#fff" stroke="${L}" stroke-width="0.5"/>`).join('')}</g>
    <g class="e076-hatch">${[-66, -36, -6, 26, 56].map((dx, i) => `<g transform="translate(${dx} ${FLOOR - 12})"><g class="e076-pop" style="animation-delay:${i * 0.18}s">${BABY()}</g></g>`).join('')}</g></g>
  <!-- tổ trứng trên bãi cát -->
  <g class="e076-nest"><ellipse cx="${X.nest + 24}" cy="${FLOOR + 2}" rx="20" ry="5" fill="#D97706" stroke="${L}" stroke-width="0.7"/></g>
  <g class="e076-eggs">${EGGS(X.nest + 24, FLOOR)}</g>
  <!-- biển bên phải -->
  <path d="M${X.shore} ${FLOOR + 33} L${X.shore + 60} 230 H${W} V315Z" fill="#38BDF8" stroke="${L}"/>
  <path d="M${X.shore + 14} 300 Q${X.shore + 30} 290 ${X.shore + 42} 270" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" class="e076-foam"/>
  <g class="ek-wave">${Array.from({ length: 9 }, (_, i) => `<path d="M${X.shore + 90 + i * 40} ${240 + (i % 3) * 12} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <g transform="translate(${X.jelly - 40} 268)">${JELLY}</g>
  <g class="e076-bagIn"><g transform="translate(${X.jelly + 40} 272)">${PBAG}</g></g>
  <!-- cỏ / cát mặt đất -->
  <rect x="${X.pier + 60}" y="${FLOOR - 4}" width="${1300 - X.pier - 60}" height="40" fill="#86EFAC" stroke="${L}"/>
  <path d="M1300 ${FLOOR - 4} H${X.shore + 30} L${X.shore} ${FLOOR + 33} H1300Z" fill="#FCD34D" stroke="${L}"/>
  ${Array.from({ length: 18 }, (_, i) => `<circle cx="${1320 + i * 42}" cy="${FLOOR + 10 + (i % 3) * 7}" r="1.4" fill="#D97706"/>`).join('')}
  ${bush(560, FLOOR + 30, 0.6)}${bush(1240, FLOOR + 30, 0.7, '#4ADE80')}`;
}

function fg() {
  return `
  <!-- quầy (che chân người bán) -->
  <g transform="translate(${X.kiosk} 0)"><rect x="-10" y="216" width="80" height="${FLOOR - 216}" fill="#FBCFE8" stroke="${L}" stroke-width="1.2"/><rect x="-14" y="210" width="88" height="8" rx="3" fill="#F9A8D4" stroke="${L}"/>
    <g transform="translate(10 210)"><circle cx="0" cy="-8" r="8" fill="#84CC16" stroke="${L}" stroke-width="0.8"/><circle cx="18" cy="-7" r="7" fill="#FACC15" stroke="${L}" stroke-width="0.8"/><circle cx="36" cy="-8" r="8" fill="#16A34A" stroke="${L}" stroke-width="0.8"/></g></g>
  <!-- rào trước của khu ấp trứng (thấp, che chân) -->
  <g transform="translate(${X.hatch} 0)"><path d="M-100 ${FLOOR + 10} V${FLOOR - 30} M100 ${FLOOR + 10} V${FLOOR - 30} M-100 ${FLOOR - 30} H100" stroke="#78716C" stroke-width="4"/>
    ${Array.from({ length: 11 }, (_, i) => `<path d="M${-100 + i * 20} ${FLOOR - 30} V${FLOOR + 10}" stroke="#94A3B8" stroke-width="0.9"/>`).join('')}
    <path d="M-100 ${FLOOR - 12} H100" stroke="#94A3B8" stroke-width="0.9"/></g>
  ${night(1300, W - 1300, 315, 2300)}
  <!-- nhãn -->
  <g class="e076-lb e076-lb-island">${label(X.sign, 96, 'Con Dao Island', '#DC2626', 14)}${label(X.sign + 60, 236, 'south', '#0369A1', 12)}</g>
  <g class="e076-lb e076-lb-protect">${label(X.centre, 70, 'protects sea turtles', '#0F766E', 15)}</g>
  <g class="e076-lb e076-lb-catch">${label(X.board - 60, 254, 'catch', '#DC2626', 13)}</g>
  <g class="e076-lb e076-lb-dirty">${label(X.board + 58, 254, 'dirty sea', '#92400E', 13)}</g>
  <g class="e076-lb e076-lb-guide">${label(X.door + 50, 92, 'Mr Tuan, guide', '#15803D', 14)}</g>
  <g class="e076-lb e076-lb-night">${label(X.nest - 40, 92, 'at night', '#4338CA', 15)}</g>
  <g class="e076-lb e076-lb-collect">${label(X.nest - 20, 130, 'collect the eggs', '#0369A1', 14)}</g>
  <g class="e076-lb e076-lb-safe">${label(X.hatch, 178, 'a safe place', '#16A34A', 15)}</g>
  <g class="e076-lb e076-lb-later">${label(X.hatch + 40, 92, 'Later...', '#EA580C', 16)}</g>
  <g class="e076-lb e076-lb-slow">${label(1960, 120, 'slowly', '#7C3AED', 16)}</g>
  <g class="e076-lb e076-lb-jelly">${label(X.jelly - 50, 232, 'jellyfish', '#DB2777', 13)}${label(X.jelly + 50, 210, 'plastic bag', '#475569', 13)}</g>
  <g class="e076-lb e076-lb-no"><g transform="translate(${X.jelly + 40} 262)"><circle r="22" fill="none" stroke="#DC2626" stroke-width="4"/><path d="M-15 15 L15 -15" stroke="#DC2626" stroke-width="4"/></g></g>
  <g class="e076-lb e076-lb-cloth">${label(X.kiosk - 90, 150, 'cloth bag', '#15803D', 14)}</g>`;
}

const CSS = `
.e076-lb { opacity: 0; transition: opacity .35s; }
${['island', 'protect', 'catch', 'dirty', 'guide', 'night', 'collect', 'safe', 'later', 'slow', 'jelly', 'no', 'cloth'].map((k) => `.st-lb-${k} .e076-lb-${k}`).join(', ')} { opacity: 1; }
.st-night .ek-night { opacity: 1; }
.e076-dot circle { transform-box: fill-box; transform-origin: center; }
.st-lb-island .e076-dot circle { animation: e076Pulse .6s ease-in-out infinite alternate; }
@keyframes e076Pulse { to { transform: scale(1.8); } }
.e076-doorleaf { transform-origin: ${X.door - X.centre - 24}px 0; transition: transform .5s; }
.st-door .e076-doorleaf { transform: scaleX(.15); }
.e076-net { transform: translateY(-46px); opacity: 0; transition: transform .7s ease-in, opacity .2s; }
.st-net .e076-net { transform: none; opacity: 1; }
.e076-trash { transform: translateY(-50px); opacity: 0; transition: transform .8s ease-in, opacity .2s; }
.st-dirty .e076-trash { transform: translateY(40px); opacity: 1; }
.e076-dirt { transition: opacity 1s; } .st-dirty .e076-dirt { opacity: .35; }
.e076-nest, .e076-eggs, .e076-buried, .e076-hatch { opacity: 0; transition: opacity .3s; }
.st-nest .e076-nest, .st-eggs .e076-eggs, .st-buried .e076-buried, .st-hatch .e076-hatch { opacity: 1; }
.st-hatch .e076-buried { opacity: 0; }
.st-taken .e076-hatch { opacity: 0; }
.st-hatch .e076-pop { animation: e076Pop .5s cubic-bezier(.3,1.6,.6,1) both, e076Wig .3s ease-in-out .6s infinite alternate; }
@keyframes e076Pop { from { transform: translateY(10px) scale(.2); } to { transform: none; } }
@keyframes e076Wig { from { rotate: -10deg; } to { rotate: 10deg; } }
.e076-bob { animation: e076Bob 1.6s ease-in-out infinite alternate; }
@keyframes e076Bob { from { transform: translateY(-4px); } to { transform: translateY(4px); } }
.st-eaten .e076-bagIn { opacity: 0; transition: opacity .3s; }
.e076-foam { animation: e076Foam 2s ease-in-out infinite alternate; }
@keyframes e076Foam { to { transform: translate(8px, -6px); } }
/* rùa bò / bơi, rùa con bò, chó chạy, chim vỗ cánh */
.es-thing.is-walk .e076-flipF { animation: e076Flip .5s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: 0% 0%; }
.es-thing.is-walk .e076-flipB { animation: e076Flip .5s ease-in-out infinite alternate-reverse; transform-box: fill-box; transform-origin: 100% 0%; }
.es-thing.act-e076-swim .e076-flipF, .es-thing.act-e076-swim .e076-flipB { animation: e076Flip .7s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: 0% 0%; }
@keyframes e076Flip { from { transform: rotate(-18deg); } to { transform: rotate(18deg); } }
.es-thing.is-walk .e076-bw { animation: e076Wig .18s ease-in-out infinite alternate; }
.es-thing.is-walk .e076-legA { animation: ppStepA .22s ease-in-out infinite alternate; }
.es-thing.is-walk .e076-legB { animation: ppStepB .22s ease-in-out infinite alternate; }
.e076-wing { transform-box: fill-box; transform-origin: 100% 100%; animation: e076Wing .22s ease-in-out infinite alternate; }
@keyframes e076Wing { from { transform: rotate(-30deg); } to { transform: rotate(40deg); } }
.es-thing.act-e076-dig .e076-flipB { animation: e076Flip .2s linear infinite alternate; transform-box: fill-box; transform-origin: 100% 0%; }
@media (prefers-reduced-motion: reduce) {
  .st-hatch .e076-pop { animation: e076Pop .8s ease-out both; }
  .e076-bob, .e076-foam { animation-duration: 4s; }
  .e076-wing { animation-duration: .6s; }
  .es-thing.is-walk .e076-flipF, .es-thing.is-walk .e076-flipB, .es-thing.act-e076-swim .e076-flipF { animation-duration: 1s; }
  .es-thing.is-walk .e076-bw, .es-thing.act-e076-dig .e076-flipB { animation-duration: .5s; }
  .st-lb-island .e076-dot circle { animation-duration: 1.4s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const FAM = ['dad', 'mum', 'lan', 'minh'];
const BOAT_FULL = (() => {
  const heads = [['en_dad_home', -46], ['en_mum_home', -14], ['en_lan_home', 18], ['en_minh_home', 48]].map(([w, x]) => `<g transform="translate(${x} -46)">${headOnly(w, { s: 0.62, mood: 'joy' })}</g>`).join('');
  return `<g class="e076-boat">${heads}<path d="M-92 -30 H96 L78 0 H-78Z" fill="#B45309" stroke="${L}" stroke-width="1.2"/><path d="M-90 -22 H94" stroke="#FDE68A" stroke-width="3"/></g>`;
})();
const BOAT_EMPTY = `<g class="e076-boat"><path d="M-92 -30 H96 L78 0 H-78Z" fill="#B45309" stroke="${L}" stroke-width="1.2"/><path d="M-90 -22 H94" stroke="#FDE68A" stroke-width="3"/></g>`;

const BEATS = [
  { key: ['went to Con Dao', 'an island in the south of Viet Nam'], icon: '🏝️', label: 'Con Dao Island', async play(st) {
    st.look(250);
    st.sfx('boat-horn', { vol: 0.6 });
    await st.loop('river', () => st.walk('boat', 170, { speed: 90, follow: false }), { vol: 0.5 });
    st.show('boat', false); st.show('boat0', true);
    for (const [i, id] of FAM.entries()) { st.show(id, true); st.place(id, 250 + i * 34, FLOOR, 1); }
    st.sfx('steps', { vol: 0.5 });
    st.set('st-lb-island'); st.sfx('ding', { vol: 0.5 });
    st.pose('minh', 'point'); st.mood('minh', 'joy');
    await st.walk('lan', 400, { speed: 130, follow: false });
    st.pose('lan', 'point');
    await st.wait(1200);
    st.pose('minh', 'stand'); st.pose('lan', 'stand');
  } },
  { key: ['visited a centre', 'protects sea turtles'], icon: '🐢', label: 'turtle centre', async play(st) {
    st.set('st-lb-island', false);
    st.look(700, { dur: 3000 });
    await Promise.all([
      st.walk('dad', 640, { speed: 130, follow: false }), st.walk('mum', 680, { speed: 130, follow: false }),
      st.walk('lan', 730, { speed: 130, follow: false }), st.walk('minh', 690 + 80, { speed: 130, follow: false }),
    ]);
    st.set('st-lb-protect'); st.sfx('ding', { vol: 0.5 });
    for (const id of FAM) { st.pose(id, 'stand'); st.mood(id, 'wow'); }
    st.pose('minh', 'pointUp');
    await st.wait(1300);
    st.pose('minh', 'stand');
  } },
  { key: ['in danger', 'people catch them', 'make the sea dirty'], icon: '⚠️', label: 'in danger', async play(st) {
    st.set('st-lb-protect', false);
    st.look(X.board - 40);
    await Promise.all([
      st.walk('minh', X.board - 120, { speed: 130, follow: false }), st.walk('lan', X.board - 160, { speed: 130, follow: false }),
      st.walk('mum', X.board - 200, { speed: 130, follow: false }), st.walk('dad', X.board - 250, { speed: 130, follow: false }),
    ]);
    for (const id of FAM) st.face(id, 1);
    st.pose('minh', 'point');
    st.set('st-net'); st.set('st-lb-catch');
    await st.wait(600);
    st.sfx('splash', { vol: 0.6 });
    await st.wait(600);
    st.set('st-dirty'); st.set('st-lb-dirty');
    await st.wait(500);
    st.sfx('splash', { vol: 0.5, rate: 1.3 });
    await st.wait(300);
    for (const id of FAM) st.mood(id, 'sad');
    st.pose('minh', 'sad'); st.sfx('buzz-no', { vol: 0.4 });
    await st.wait(900);
  } },
  { key: ['A guide, Mr Tuan', 'explained his work'], icon: '🧑‍🏫', label: 'Mr Tuan', async play(st) {
    off(st, 'st-lb-catch', 'st-lb-dirty');
    st.look(X.door + 80);
    st.set('st-door'); st.sfx('door-open', { vol: 0.6 });
    st.show('tuan', true);
    await st.walk('tuan', X.door + 40, { speed: 110, follow: false });
    st.set('st-door', false);
    for (const id of FAM) { st.face(id, -1); st.mood(id, 'happy'); }
    st.pose('minh', 'stand');
    st.pose('tuan', 'wave'); st.act('tuan', 'wave'); st.mood('tuan', 'joy'); st.set('st-lb-guide');
    await st.say('tuan', "Hi! I'm Mr Tuan.", 1300);
    st.act('tuan', null); st.pose('tuan', 'e076_explain'); st.act('tuan', 'point');
    await st.say('tuan', 'I help sea turtles.', 1500);
    st.act('tuan', null); st.pose('tuan', 'stand');
  } },
  { key: ['lay their eggs on the beach at night', 'we collect the eggs'], icon: '🥚', label: 'eggs at night', async play(st) {
    st.set('st-lb-guide', false);
    // cắt cảnh: đêm trên bãi cát
    st.set('st-night'); st.set('st-lb-night');
    const pos = { dad: 1730, mum: 1770, lan: 1810, minh: 1850 };
    for (const id of FAM) { st.place(id, pos[id], FLOOR, 1); st.pose(id, 'stand'); st.mood(id, 'wow'); }
    st.place('tuan', 1900, FLOOR, 1); st.chest('tuan', BUCKET()); st.pose('tuan', 'carry');
    st.show('mother', true); st.place('mother', X.shore + 60, FLOOR + 6, -1);
    st.look(X.nest - 10, { instant: true });
    await st.loop('crickets', async () => {
      await st.walk('mother', X.nest, { speed: 60, follow: false, y: FLOOR });
      st.act('mother', 'e076-dig'); st.set('st-nest');
      await st.loop('dig', () => st.wait(900), { vol: 0.6 });
      st.fx('poof', X.nest + 30, FLOOR - 4, { quiet: true });
      st.act('mother', null); st.set('st-eggs'); st.sfx('pop', { vol: 0.5 });
      await st.wait(500);
      st.face('mother', 1);
      const back = st.walk('mother', X.shore + 120, { speed: 60, follow: false, y: FLOOR + 14 });
      st.set('st-lb-collect');
      await st.walk('tuan', X.nest + 8, { speed: 110, follow: false });
      st.pose('tuan', 'e076_bend');
      await st.wait(200);
      st.set('st-eggs', false); st.set('st-nest', false); st.chest('tuan', BUCKET(true)); st.sfx('pop', { vol: 0.6, rate: 1.2 });
      await st.wait(300);
      st.pose('tuan', 'carry');
      await back;
      st.show('mother', false); st.sfx('splash', { vol: 0.4 });
      await st.wait(300);
    }, { vol: 0.5 });
  } },
  { key: ['keep them in a safe place', "dogs and birds can't eat them"], icon: '🛡️', label: 'a safe place', async play(st) {
    off(st, 'st-lb-night', 'st-lb-collect', 'st-night');
    st.sfx('birds', { vol: 0.4 });
    st.look(X.hatch + 10, { dur: 2800 });
    const pos = { minh: X.hatch + 140, lan: X.hatch + 180, mum: X.hatch + 230, dad: X.hatch + 280 };
    await Promise.all([
      st.walk('tuan', X.hatch + 40, { speed: 130, follow: false }),
      ...FAM.map((id) => st.walk(id, pos[id], { speed: 130, follow: false })),
    ]);
    for (const id of FAM) st.face(id, -1);
    st.face('tuan', -1); st.pose('tuan', 'give'); st.sfx('dig', { vol: 0.5 });
    await st.fly(EGGS(0, 0), [X.hatch + 20, 210], [X.hatch - 10, FLOOR - 16], { size: 20, dur: 500 });
    st.set('st-buried'); st.set('st-lb-safe'); st.chest('tuan', BUCKET()); st.pose('tuan', 'carry');
    // chó và chim tới, bị rào lưới chặn lại
    st.show('dog', true); st.sfx('dog-bark', { vol: 0.6 });
    await st.walk('dog', X.hatch - 124, { speed: 200, follow: false });
    st.sfx('bump', { vol: 0.6 });
    st.show('gull', true); st.sfx('parrot', { vol: 0.4, rate: 1.3 });
    await st.walk('gull', X.hatch - 40, { speed: 160, follow: false, y: 194 });
    st.sfx('bump', { vol: 0.5, rate: 1.3 });
    st.mood('tuan', 'joy'); st.pose('tuan', 'hips');
    await Promise.all([
      st.walk('dog', X.hatch - 360, { speed: 220, follow: false }),
      st.walk('gull', X.hatch - 260, { speed: 200, follow: false, y: 60 }),
    ]);
    st.show('dog', false); st.show('gull', false);
  } },
  { key: ['baby turtles came out', 'carried them to the sea'], icon: '🐣', label: 'baby turtles', async play(st) {
    off(st, 'st-lb-safe');
    st.look(X.hatch + 60);
    st.chest('tuan', BADGE); st.pose('tuan', 'stand');
    st.set('st-lb-later'); st.sfx('tick', { vol: 0.5 });
    await st.wait(600);
    st.set('st-hatch'); st.sfx('pop', { vol: 0.6 });
    await st.wait(300); st.sfx('pop', { vol: 0.5, rate: 1.2 });
    for (const id of FAM) st.mood(id, 'joy');
    st.sfx('giggle', { vol: 0.4 });
    await st.wait(700);
    st.set('st-taken'); st.sfx('whoosh', { vol: 0.4 });
    for (const id of [...FAM, 'tuan']) { st.chest(id, BABY_HELD); st.pose(id, 'carry'); st.face(id, 1); }
    st.set('st-lb-later', false);
    st.look(1840, { dur: 3200 });
    await Promise.all([
      st.walk('tuan', 1800, { speed: 120, follow: false }), st.walk('minh', 1750, { speed: 120, follow: false }),
      st.walk('lan', 1700, { speed: 120, follow: false }), st.walk('mum', 1640, { speed: 120, follow: false }),
      st.walk('dad', 1580, { speed: 120, follow: false }),
    ]);
  } },
  { key: ['walked slowly', "didn't drop the babies"], icon: '🐢', label: 'walked slowly', async play(st) {
    st.set('st-lb-slow');
    for (const id of [...FAM, 'tuan']) { st.pose(id, 'e076_careful'); }
    st.look(1980, { dur: 3600 });
    await Promise.all([
      st.walk('tuan', 2010, { speed: 60, follow: false }), st.walk('minh', 1960, { speed: 60, follow: false }),
      st.walk('lan', 1910, { speed: 60, follow: false }), st.walk('mum', 1850, { speed: 60, follow: false }),
      st.walk('dad', 1790, { speed: 60, follow: false }),
    ]);
    st.set('st-lb-slow', false);
    st.pose('minh', 'e076_bend'); st.pose('lan', 'e076_bend'); st.pose('tuan', 'e076_bend');
    await st.wait(300);
    for (const id of ['minh', 'lan']) st.chest(id, null);
    st.chest('tuan', BADGE);
    for (const [i, b] of ['b1', 'b2', 'b3'].entries()) { st.show(b, true); st.place(b, [1975, 1925, 2025][i], FLOOR + 2, 1); }
    await st.wait(300);
    await Promise.all(['b1', 'b2', 'b3'].map((b, i) => st.walk(b, X.shore + 70 + i * 16, { speed: 50 + i * 8, follow: false, y: FLOOR + 22 })));
    ['b1', 'b2', 'b3'].forEach((b) => st.show(b, false));
    st.sfx('splash', { vol: 0.5 });
    for (const id of ['minh', 'lan', 'tuan']) { st.pose(id, 'wave'); st.mood(id, 'joy'); }
    await st.wait(600);
  } },
  { key: ['Plastic bags look like jellyfish', 'turtles eat them'], icon: '🪼', label: 'jellyfish?', async play(st) {
    for (const id of ['minh', 'lan', 'tuan']) st.pose(id, 'stand');
    for (const id of ['mum', 'dad']) { st.chest(id, null); st.pose(id, 'stand'); }
    st.look(X.jelly - 70);
    st.face('tuan', 1); st.pose('tuan', 'point'); st.talk('tuan', true);
    st.set('st-lb-jelly'); st.sfx('pop', { vol: 0.5 });
    st.show('swimmer', true); st.act('swimmer', 'e076-swim');
    await st.loop('river', () => st.walk('swimmer', X.jelly + 92, { speed: 50, follow: false }), { vol: 0.4 });
    st.act('swimmer', 'e076-swim');
    st.set('st-eaten'); st.sfx('gulp', { vol: 0.8 });
    await st.wait(500);
    st.set('st-lb-no'); st.sfx('buzz-no', { vol: 0.5 });
    st.talk('tuan', false); st.mood('minh', 'sad'); st.mood('lan', 'sad'); st.mood('tuan', 'sad');
    await st.wait(1000);
  } },
  { key: ['always takes a cloth bag', "doesn't use plastic ones"], icon: '👜', label: 'cloth bag', async play(st) {
    off(st, 'st-lb-jelly', 'st-lb-no');
    // cắt cảnh: quầy hàng, Minh mang túi vải
    st.place('minh', X.kiosk - 200, FLOOR, 1); st.mood('minh', 'happy'); st.hold('minh', 'e076_cloth'); st.pose('minh', 'stand');
    st.look(X.kiosk - 60, { instant: true });
    await st.walk('minh', X.kiosk - 70, { speed: 120, follow: false });
    st.hold('seller', 'e076_plastic'); st.pose('seller', 'give'); st.sfx('click', { vol: 0.4 });
    await st.wait(500);
    st.act('minh', 'no'); st.sfx('buzz-no', { vol: 0.5 });
    await st.wait(700);
    st.act('minh', null); st.pose('minh', 'raise'); st.set('st-lb-cloth'); st.sfx('bag-on', { vol: 0.6 });
    st.hold('seller', null); st.pose('seller', 'stand');
    await st.wait(400);
    st.pose('seller', 'give'); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(`<circle r="7" fill="#FACC15" stroke="${L}" stroke-width="0.8"/>`, [X.kiosk + 20, 200], [X.kiosk - 60, 150], { size: 18, dur: 500 });
    st.sfx('bag-on', { vol: 0.5 }); st.mood('minh', 'joy'); st.mood('seller', 'joy'); st.pose('seller', 'stand');
    st.fx('hearts', X.kiosk - 70, 150);
    await st.wait(1000);
  } },
];

export default {
  id: 'en076', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 2, 4, 5, 6, 8],
  cast: [
    { id: 'boat0', kind: 'thing', x: 170, y: 262, svg: BOAT_EMPTY, box: [-96, -34, 194, 36] },
    { id: 'boat', kind: 'thing', x: -120, y: 262, svg: BOAT_FULL, box: [-96, -70, 194, 72] },
    { id: 'seller', kind: 'adult', who: 'e076_seller', x: X.kiosk + 34, s: 0.95, face: -1 },
    { id: 'tuan', kind: 'adult', who: 'e076_tuan', x: X.door, face: 1 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 250, s: 0.95 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 284, s: 0.95 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 318, s: 1.08 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 352 },
    { id: 'mother', kind: 'thing', x: X.shore + 60, y: FLOOR, svg: TURTLE, box: [-52, -34, 114, 40] },
    { id: 'swimmer', kind: 'thing', x: W + 60, y: 300, svg: TURTLE, box: [-52, -34, 114, 40], face: -1 },
    { id: 'b1', kind: 'thing', x: 1975, svg: BABY(), box: [-12, -10, 26, 12] },
    { id: 'b2', kind: 'thing', x: 1925, svg: BABY(), box: [-12, -10, 26, 12] },
    { id: 'b3', kind: 'thing', x: 2025, svg: BABY(), box: [-12, -10, 26, 12] },
    { id: 'dog', kind: 'thing', x: X.hatch - 360, svg: DOG, box: [-36, -54, 84, 56] },
    { id: 'gull', kind: 'thing', x: X.hatch - 300, y: 70, svg: GULL, box: [-26, -26, 50, 32] },
  ],
  init(st) {
    for (const id of [...FAM, 'tuan', 'mother', 'swimmer', 'b1', 'b2', 'b3', 'dog', 'gull', 'boat0']) st.show(id, false);
    st.chest('tuan', BADGE);
  },
};
