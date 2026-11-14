/**
 * Bài 98 "So Many Plastic Bags" (so … that / such … that): Chủ nhật ở bãi biển Đà Nẵng, đi từ trái sang phải:
 * lều tình nguyện viên trên phố biển (băng rôn BEACH CLEAN-UP, núi Sơn Trà xa xa) → bãi cát đầy rác (túi ni lông, chai, lon)
 * → đống bao tải đã nhặt (đếm tới 50, đồng hồ 2 giờ) → bãi đá có con rùa mắc lưới → chỗ phát nước dưới ô che
 * → (cắt cảnh, ngày khác) sạp hoa quả: cả nhà mang túi vải đi chợ.
 * "so / such … that" = nguyên nhân hiện trước (rác nhiều, trời nóng, cảnh buồn) rồi kết quả ngay sau (không tin nổi, uống 4 chai…).
 * Toạ độ cảnh: rộng 2150, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, palm, label, sun } from '../kit.js';

const FLOOR = 282;
const W = 2150;
const X = { tent: 190, sand: 400, junk0: 450, junk1: 910, sacks: 975, rocks: 1330, turtle: 1320, station: 1620, market: 1990 };
const SEA = 196; // mặt biển (đường chân trời)
const SHORE = 240; // mép nước
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e098_vol: { adult: true, hair: 'short', top: 'shirt', shirt: '#22C55E', bottom: 'pants', bottomC: '#334155', shoe: '#44403C', hat: 'cap' },
  e098_vol2: { adult: true, hair: 'ponytail', top: 'blouse', shirt: '#4ADE80', bottom: 'pants', bottomC: '#475569', shoe: '#F5F5F4' },
  e098_seller: { adult: true, hair: 'bun', top: 'blouse', shirt: '#FDBA74', bottom: 'pants', bottomC: '#334155', shoe: '#78716C' },
});

// ── Rác, bao tải, chai nước, rùa (gốc = điểm chạm đất) ──────────────────────────────────
const PBAG = (r = 0) => `<g transform="rotate(${r})"><path d="M-9 0 Q-11 -12 -6 -14 L-5 -20 L-2 -14 H2 L5 -20 L6 -14 Q11 -12 9 0 Q4 2 0 0 Q-4 2 -9 0Z" fill="#F8FAFC" fill-opacity="0.92" stroke="#94A3B8" stroke-width="0.9"/><path d="M-4 -10 q3 3 7 0" stroke="#CBD5E1" stroke-width="0.8" fill="none"/></g>`;
const PBAG_C = (c) => PBAG().replace('#F8FAFC', c);
const BOTTLE_LIE = (r = 90) => `<g transform="rotate(${r})"><rect x="-3.6" y="-16" width="7.2" height="16" rx="2.4" fill="#BAE6FD" fill-opacity="0.85" stroke="#0284C7" stroke-width="0.8"/><rect x="-2" y="-20" width="4" height="4" fill="#2563EB"/><rect x="-3.6" y="-11" width="7.2" height="4" fill="#38BDF8"/></g>`;
const CAN = `<rect x="-4" y="-10" width="8" height="10" rx="1.4" fill="#EF4444" stroke="${L}" stroke-width="0.7"/><path d="M-4 -7 H4" stroke="#fff" stroke-width="1"/>`;
const CUPJ = `<path d="M-5 0 L-6 -10 H6 L5 0Z" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/>`;
const SACK = `<path d="M-14 0 Q-17 -18 -10 -24 L-4 -28 L-6 -32 H6 L4 -28 L10 -24 Q17 -18 14 0Z" fill="#E7E5E4" stroke="${L}" stroke-width="0.9"/><path d="M-6 -28 H6" stroke="#A16207" stroke-width="1.6"/><path d="M-8 -14 q8 3 16 0" stroke="#A8A29E" stroke-width="0.8" fill="none"/>`;
/** Chai nước đứng (gốc = đáy). */
const BOTTLE = (full = true) => `<rect x="-4.4" y="-22" width="8.8" height="22" rx="2.6" fill="#E0F2FE" fill-opacity="0.9" stroke="#0284C7" stroke-width="0.8"/>
  ${full ? '<rect x="-3.6" y="-17" width="7.2" height="16" rx="1.8" fill="#7DD3FC"/>' : ''}<rect x="-2.4" y="-26" width="4.8" height="4" fill="#2563EB" stroke="${L}" stroke-width="0.5"/><rect x="-4.4" y="-13" width="8.8" height="4" fill="#38BDF8"/>`;
const TURTLE = `<g class="e098-tt">
  <g class="e098-flB"><path d="M-22 -4 Q-34 -2 -38 5 Q-27 5 -18 -1Z" fill="#65A30D" stroke="${L}" stroke-width="0.9"/></g>
  <g class="e098-flF"><path d="M14 -6 Q28 -2 32 8 Q20 7 9 -1Z" fill="#65A30D" stroke="${L}" stroke-width="0.9"/></g>
  <path d="M32 -11 Q43 -14 45 -8 Q43 -1 34 -3Z" fill="#84CC16" stroke="${L}" stroke-width="0.9"/><circle cx="40" cy="-9" r="1.5" fill="#1F2937"/>
  <ellipse cx="0" cy="-11" rx="33" ry="13" fill="#A16207" stroke="${L}" stroke-width="1.1"/>
  <path d="M-22 -14 L-10 -21 L5 -22 L18 -17 M-22 -14 L-9 -8 L6 -8 L21 -12 M-10 -21 L-9 -8 M5 -22 L6 -8" stroke="#713F12" stroke-width="1.1" fill="none"/>
  <path d="M-33 -5 H33" stroke="${L}" stroke-width="0.7"/></g>`;
const NET = `<path d="M-46 4 Q-50 -26 -18 -34 Q20 -38 44 -20 Q54 -4 48 6Z" fill="#fff" fill-opacity="0.08" stroke="#1E3A8A" stroke-width="1.3"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${-42 + i * 11} 6 Q${-40 + i * 11} -16 ${-34 + i * 10} -34" stroke="#1E40AF" stroke-width="0.8" fill="none"/>`).join('')}
  ${Array.from({ length: 4 }, (_, i) => `<path d="M-48 ${-2 - i * 8} Q0 ${-10 - i * 9} 50 ${-2 - i * 6}" stroke="#1E40AF" stroke-width="0.8" fill="none"/>`).join('')}
  <circle cx="-46" cy="4" r="3" fill="#F97316" stroke="${L}" stroke-width="0.6"/><circle cx="48" cy="6" r="3" fill="#F97316" stroke="${L}" stroke-width="0.6"/>`;

const PROPS = {
  e098_scissors: `<g transform="rotate(180)"><circle cx="-3" cy="-2" r="2.6" fill="none" stroke="#DC2626" stroke-width="1.6"/><circle cx="3" cy="-2" r="2.6" fill="none" stroke="#DC2626" stroke-width="1.6"/>
    <g class="e098-blade"><path d="M-2 1 L3 16" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/></g><path d="M2 1 L-2 16" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/></g>`,
  e098_bottle: `<g transform="rotate(118) translate(0 4)">${BOTTLE(true)}</g>`,
  e098_sack: `<g transform="translate(0 2)"><path d="M-2 0 V6" stroke="#A16207" stroke-width="1.6"/><g transform="translate(0 34) scale(0.9)">${SACK}</g></g>`,
  e098_cloth: `<path d="M-5 0 Q-5 7 -9 8 M5 0 Q5 7 9 8" stroke="#A16207" stroke-width="1.6" fill="none"/><path d="M-12 8 H12 L13 32 Q0 34 -13 32Z" fill="#FEF3C7" stroke="${L}" stroke-width="1"/>
    <path d="M-6 18 q6 -6 12 0 q-6 8 -12 0Z" fill="#22C55E" stroke="${L}" stroke-width="0.6"/>`,
  e098_clothFull: `<path d="M-5 0 Q-5 7 -9 8 M5 0 Q5 7 9 8" stroke="#A16207" stroke-width="1.6" fill="none"/><circle cx="-5" cy="8" r="5" fill="#F97316" stroke="${L}" stroke-width="0.6"/><circle cx="5" cy="7" r="5" fill="#84CC16" stroke="${L}" stroke-width="0.6"/>
    <path d="M-12 8 H12 L13 32 Q0 34 -13 32Z" fill="#FEF3C7" stroke="${L}" stroke-width="1"/><path d="M-6 18 q6 -6 12 0 q-6 8 -12 0Z" fill="#22C55E" stroke="${L}" stroke-width="0.6"/>`,
};
const POSES = {
  e098_pick: { R: [30, 20], L: [20, 10], dy: 16, head: 16 },
  e098_bend: { R: [44, 64], L: [40, 60], dy: 14, head: 16 },
  e098_cut: { R: [52, 66], L: [40, 60], dy: 12, head: 14 },
  e098_almost: { R: [150, 238], L: [10, 4], head: 12 },
  e098_wipe: { R: [150, 250], L: [10, 4], head: -4 },
  e098_look: { R: [24, -60], L: [24, -60], dy: 8, head: 16 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
/** Rác trên cát: 5 cụm, nhặt dần từng cụm (class e098-j1..5). */
function junk() {
  const items = [];
  for (let i = 0; i < 40; i++) {
    const x = X.junk0 + ((i * 53) % (X.junk1 - X.junk0)), y = SHORE + 8 + ((i * 29) % 34);
    const k = 1 + Math.floor(((x - X.junk0) / (X.junk1 - X.junk0)) * 5);
    const kind = i % 5;
    const svg = kind < 3 ? PBAG(((i * 37) % 50) - 25) : kind === 3 ? BOTTLE_LIE(70 + (i % 3) * 20) : i % 2 ? CAN : CUPJ;
    items.push(`<g class="e098-j${Math.min(5, k)}"><g transform="translate(${x} ${y}) scale(${0.85 + (i % 3) * 0.12})">${svg}</g></g>`);
  }
  return items.join('');
}
/** Đống bao tải: 15 bao, hiện dần 5 đợt (mỗi đợt "10 bao"). */
function sacks() {
  const pos = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6 - r * 2 + (r ? 1 : 0); c++) pos.push([X.sacks - 50 + r * 12 + c * 22, FLOOR - 12 - r * 22]);
  return pos.slice(0, 15).map(([x, y], i) => `<g class="e098-sk e098-sk${1 + Math.floor(i / 3)}"><g transform="translate(${x} ${y})">${SACK}</g></g>`).join('');
}
const HOT = (x, w) => `<g class="e098-heat">${Array.from({ length: Math.floor(w / 46) }, (_, i) => `<path class="e098-hw" style="animation-delay:${(i % 4) * 0.3}s" d="M${x + 20 + i * 46} 230 q6 -8 0 -16 q-6 -8 0 -16" stroke="#FB923C" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.7"/>`).join('')}</g>`;
/** Rác nổi đầy mặt biển (câu 9). */
const SEA_JUNK = () => `<g class="e098-full">${Array.from({ length: 22 }, (_, i) => `<g transform="translate(${1450 + i * 24 + (i % 3) * 6} ${SEA + 10 + (i * 13) % 30})"><g class="e098-bob" style="animation-delay:${-(i % 5) * 0.3}s">${i % 3 ? PBAG(i * 17) : BOTTLE_LIE(90)}</g></g>`).join('')}</g>`;

function bg() {
  return `
  ${sky(0, W, 315, 'e098sky')}
  <g transform="translate(1660 56)"><g class="e098-sun">${sun(24)}</g></g>
  ${cloud(140, 60, 0.8, 0)}${cloud(620, 46, 0.9, 2)}${cloud(1100, 66, 0.8, 4)}${cloud(1900, 50, 0.9, 1)}
  <!-- núi Sơn Trà phía xa -->
  <path d="M-10 ${SEA} Q80 120 210 140 Q300 104 420 150 Q480 170 540 ${SEA}Z" fill="#86C99A" stroke="${L}" stroke-width="0.8"/>
  <path d="M120 ${SEA} Q190 150 260 160" stroke="#5FA97A" stroke-width="2" fill="none"/>
  <!-- biển -->
  <rect x="0" y="${SEA}" width="${W}" height="${SHORE - SEA + 6}" fill="#38BDF8" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: Math.floor(W / 44) }, (_, i) => `<path d="M${10 + i * 44} ${SEA + 10 + (i % 3) * 10} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <g class="e098-glint">${Array.from({ length: 16 }, (_, i) => `<path class="ek-twinkle" style="animation-delay:${(i % 5) * 0.3}s" d="M${470 + i * 30} ${SEA + 6 + (i * 7) % 26} l1.6 4 l4 1.6 l-4 1.6 l-1.6 4 l-1.6 -4 l-4 -1.6 l4 -1.6Z" fill="#fff"/>`).join('')}</g>
  <g transform="translate(700 ${SEA + 2})"><path d="M-22 0 H22 L16 8 H-16Z" fill="#B45309" stroke="${L}" stroke-width="0.8"/><path d="M0 0 V-20 L14 -4Z" fill="#fff" stroke="${L}" stroke-width="0.7"/></g>
  ${SEA_JUNK()}
  <!-- cát -->
  <path d="M0 ${SHORE} Q${W / 2} ${SHORE - 6} ${W} ${SHORE} V315 H0Z" fill="#FDE68A" stroke="${L}"/>
  <path d="M0 ${SHORE + 2} Q${W / 2} ${SHORE - 4} ${W} ${SHORE + 2}" stroke="#fff" stroke-width="3" fill="none" class="e098-foam"/>
  ${Array.from({ length: 40 }, (_, i) => `<circle cx="${20 + i * 54}" cy="${FLOOR + 6 + (i % 3) * 8}" r="1.4" fill="#D97706"/>`).join('')}
  <!-- phố biển: vỉa hè lát gạch -->
  <rect x="0" y="${SHORE - 4}" width="${X.sand}" height="${315 - SHORE + 4}" fill="#E7E5E4" stroke="${L}"/>
  ${Array.from({ length: 10 }, (_, i) => `<path d="M${i * 42} ${SHORE - 4} V315" stroke="#D6D3D1" stroke-width="1.2"/>`).join('')}
  ${palm(30, SHORE - 2, 1)}${palm(X.sand - 20, SHORE - 2, 0.9)}
  <!-- lều tình nguyện -->
  <g transform="translate(${X.tent} 0)">
    <path d="M-80 120 H80 L92 146 H-92Z" fill="#22C55E" stroke="${L}" stroke-width="1.2"/>
    ${[-70, -35, 0, 35, 70].map((dx, i) => `<path d="M${dx - 18} 146 q18 12 36 0" fill="${i % 2 ? '#fff' : '#22C55E'}" stroke="${L}" stroke-width="0.7"/>`).join('')}
    <path d="M-84 146 V${FLOOR} M84 146 V${FLOOR}" stroke="#78716C" stroke-width="4"/>
    <rect x="-74" y="96" width="148" height="24" rx="5" fill="#fff" stroke="${L}"/>
    <text x="0" y="113" text-anchor="middle" ${NUN} font-size="14" fill="#15803D">BEACH CLEAN-UP</text>
    <rect x="-60" y="${FLOOR - 54}" width="120" height="8" rx="2" fill="#B45309" stroke="${L}"/><path d="M-52 ${FLOOR - 46} V${FLOOR} M52 ${FLOOR - 46} V${FLOOR}" stroke="#92400E" stroke-width="4"/>
    <g transform="translate(-34 ${FLOOR - 54})">${SACK}</g><g transform="translate(-12 ${FLOOR - 54}) scale(0.8)">${SACK}</g>
    ${[16, 30, 44].map((dx) => `<g transform="translate(${dx} ${FLOOR - 54})"><path d="M-5 0 V-10 q0 -4 3 -4 V-16 M-2 -14 q2 -3 4 0 V-17 M2 -14 q2 -3 4 0 V-14 q2 0 2 4 V0Z" fill="#FACC15" stroke="${L}" stroke-width="0.6"/></g>`).join('')}</g>
  <g transform="translate(330 0)"><path d="M0 ${FLOOR} V176" stroke="#78716C" stroke-width="4"/><rect x="-38" y="150" width="76" height="28" rx="4" fill="#0369A1" stroke="${L}"/>
    <text x="0" y="169" text-anchor="middle" ${NUN} font-size="13" fill="#fff">DA NANG</text></g>
  <!-- rác trên bãi -->
  <g class="e098-junk">${junk()}</g>
  <!-- bao tải đã nhặt -->
  ${sacks()}
  <!-- bãi đá -->
  <g transform="translate(${X.rocks} ${FLOOR})">
    <path d="M-90 -6 Q-80 -50 -40 -48 Q-20 -70 10 -56 Q40 -66 60 -40 Q90 -36 94 -6Z" fill="#A8A29E" stroke="${L}" stroke-width="1.2" transform="translate(40 -26) scale(0.9)"/>
    <path d="M30 -60 q14 -6 24 4 M70 -40 q10 -2 16 6" stroke="#78716C" stroke-width="1.6" fill="none"/></g>
  <g class="e098-net"><g transform="translate(${X.turtle + 4} ${FLOOR + 2})">${NET}</g></g>
  <g class="e098-netOff"><g transform="translate(${X.turtle - 30} ${FLOOR + 6}) scale(0.9 0.35)">${NET}</g></g>
  <!-- chỗ phát nước: ô che + bàn + thùng chai -->
  <g transform="translate(${X.station} 0)">
    <path d="M-6 ${FLOOR} V120" stroke="#78716C" stroke-width="3"/>
    <path d="M-80 130 Q-6 70 68 130 Q50 122 31 130 Q13 122 -6 130 Q-24 122 -43 130 Q-61 122 -80 130Z" fill="#F97316" stroke="${L}" stroke-width="1.1"/>
    <path d="M-6 76 Q-30 100 -43 130 M-6 76 Q18 100 31 130" stroke="#FDE68A" stroke-width="5" fill="none" opacity="0.8"/>
    <rect x="18" y="${FLOOR - 56}" width="80" height="7" rx="2" fill="#E5E7EB" stroke="${L}"/><path d="M24 ${FLOOR - 49} V${FLOOR} M92 ${FLOOR - 49} V${FLOOR}" stroke="#94A3B8" stroke-width="3"/>
    ${[30, 42, 54].map((dx, i) => `<g class="e098-full${i}"><g transform="translate(${dx} ${FLOOR - 56})">${BOTTLE(true)}</g></g>`).join('')}
    ${[66, 76, 86, 96].map((dx, i) => `<g class="e098-em e098-em${i + 1}"><g transform="translate(${dx - 4} ${FLOOR - 56})">${BOTTLE(false)}</g></g>`).join('')}
    <rect x="-56" y="${FLOOR - 30}" width="40" height="30" rx="3" fill="#2563EB" stroke="${L}"/><rect x="-56" y="${FLOOR - 34}" width="40" height="7" rx="2" fill="#60A5FA" stroke="${L}"/>
    <text x="-36" y="${FLOOR - 12}" text-anchor="middle" ${NUN} font-size="8" fill="#fff">WATER</text></g>
  ${HOT(1480, 300)}
  <!-- sạp hoa quả (ngày khác) -->
  <g transform="translate(${X.market} 0)">
    <rect x="-150" y="0" width="320" height="${SHORE - 4}" fill="#FEF3C7"/>
    <rect x="-150" y="${SHORE - 4}" width="320" height="${315 - SHORE + 4}" fill="#E7E5E4" stroke="${L}"/>
    <path d="M-154 0 V${SHORE - 4}" stroke="${L}" stroke-width="1.4"/>
    <path d="M10 92 H150 L140 116 H20Z" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    ${[30, 58, 86, 114].map((dx, i) => `<path d="M${dx - 14} 116 q14 10 28 0" fill="${i % 2 ? '#fff' : '#EF4444'}" stroke="${L}" stroke-width="0.7"/>`).join('')}
    <path d="M22 116 V${FLOOR} M138 116 V${FLOOR}" stroke="#92400E" stroke-width="4"/>
    <rect x="-120" y="34" width="130" height="26" rx="5" fill="#fff" stroke="${L}"/><text x="-55" y="52" text-anchor="middle" ${NUN} font-size="13" fill="#B45309">FRUIT MARKET</text>
    <g class="e098-nobag"><g transform="translate(80 58)"><circle r="24" fill="#fff" stroke="${L}"/><g transform="translate(0 10) scale(1.4)">${PBAG()}</g><circle r="18" fill="none" stroke="#DC2626" stroke-width="3.4"/><path d="M-12 12 L12 -12" stroke="#DC2626" stroke-width="3.4"/></g></g></g>`;
}

function fg() {
  return `
  <!-- quầy sạp (che chân người bán) -->
  <g transform="translate(${X.market} 0)"><rect x="34" y="214" width="104" height="${FLOOR - 214 + 6}" fill="#FDBA74" stroke="${L}" stroke-width="1.2"/><rect x="30" y="208" width="112" height="8" rx="3" fill="#F97316" stroke="${L}"/>
    <g transform="translate(48 208)">${[0, 16, 32, 48, 64, 80].map((dx, i) => `<circle cx="${dx}" cy="-7" r="7" fill="${['#F97316', '#84CC16', '#FACC15', '#EF4444', '#F97316', '#16A34A'][i]}" stroke="${L}" stroke-width="0.7"/>`).join('')}</g></g>
  <!-- số chai, số bao, đồng hồ -->
  <g class="e098-cnt">${[1, 2, 3, 4].map((n) => `<g class="e098-c e098-c${n}">${label(X.station - 40, 92, `${n} bottle${n > 1 ? 's' : ''}`, '#0369A1', 15)}</g>`).join('')}</g>
  <g class="e098-sackn">${[10, 20, 30, 40, 50].map((n, i) => `<g class="e098-sn e098-sn${i + 1}">${label(X.sacks - 18, 164, `${n} sacks`, '#15803D', 14)}</g>`).join('')}</g>
  <g class="e098-clock"><g transform="translate(${X.sacks + 52} 162)"><circle r="17" fill="#fff" stroke="${L}" stroke-width="1.4"/>${Array.from({ length: 12 }, (_, i) => `<path d="M0 -14 V-12" stroke="${L}" stroke-width="1.2" transform="rotate(${i * 30})"/>`).join('')}
    <g class="e098-hand"><path d="M0 0 V-12" stroke="#DC2626" stroke-width="2" stroke-linecap="round"/></g><path d="M0 0 V-7" stroke="${L}" stroke-width="2.4" stroke-linecap="round" class="e098-hhand"/><circle r="1.8" fill="${L}"/>
    <g transform="translate(0 32)"><rect x="-26" y="-12" width="52" height="16" rx="8" fill="#fff" stroke="${L}"/><text x="0" y="1" text-anchor="middle" ${NUN} font-size="11" fill="#B45309">2 hours</text></g></g></g>
  <!-- nhãn -->
  <g class="e098-lb e098-lb-cleanup">${label(X.tent + 40, 76, 'a beach clean-up', '#15803D', 14)}</g>
  <g class="e098-lb e098-lb-far">${label(600, 150, 'beautiful from far away', '#0284C7', 14)}</g>
  <g class="e098-lb e098-lb-much">${label(690, 150, 'so much rubbish', '#B91C1C', 15)}</g>
  <g class="e098-lb e098-lb-bags">${label(780, 120, 'so many plastic bags', '#475569', 14)}</g>
  <g class="e098-lb e098-lb-net">${label(X.turtle + 10, 170, 'caught in a fishing net', '#1E40AF', 13)}</g>
  <g class="e098-lb e098-lb-sad">${label(X.turtle - 10, 108, 'such a sad sight', '#7C3AED', 14)}</g>
  <g class="e098-lb e098-lb-free">${label(X.turtle + 20, 108, 'helped her free it', '#16A34A', 14)}</g>
  <g class="e098-lb e098-lb-hot">${label(X.station - 120, 128, 'so hot', '#EA580C', 16)}</g>
  <g class="e098-lb e098-lb-empty">${label(X.station + 64, 302, 'empty bottles', '#0369A1', 13)}</g>
  <g class="e098-lb e098-lb-full">${label(1640, 128, 'the sea is full of plastic', '#B91C1C', 14)}</g>
  <g class="e098-lb e098-lb-since">${label(X.market - 90, 92, 'Since that day...', '#EA580C', 15)}</g>
  <g class="e098-lb e098-lb-cloth">${label(X.market - 70, 304, 'cloth bags', '#15803D', 15)}</g>`;
}

const LB = ['cleanup', 'far', 'much', 'bags', 'net', 'sad', 'free', 'hot', 'empty', 'full', 'since', 'cloth'];
const CSS = `
.e098-lb { opacity: 0; transition: opacity .35s; }
${LB.map((k) => `.st-lb-${k} .e098-lb-${k}`).join(', ')} { opacity: 1; }
/* rác: nhìn từ xa chưa thấy, tới gần thì hiện; nhặt dần từng cụm */
.e098-junk { opacity: 0; transition: opacity 1.2s; } .st-close .e098-junk { opacity: 1; }
${[1, 2, 3, 4, 5].map((k) => `.e098-j${k}`).join(', ')} { transition: opacity .5s; }
${[1, 2, 3, 4, 5].map((k) => `.st-p${k} .e098-j${k}`).join(', ')} { opacity: 0; }
.e098-glint { transition: opacity .8s; } .st-close .e098-glint { opacity: .25; }
.e098-sk { opacity: 0; transform: translateY(-14px); transition: opacity .3s, transform .4s cubic-bezier(.3,1.5,.6,1); }
${[1, 2, 3, 4, 5].map((k) => `.st-p${k} .e098-sk${k}`).join(', ')} { opacity: 1; transform: none; }
.e098-sn, .e098-c, .e098-clock { opacity: 0; transition: opacity .2s; }
${[1, 2, 3, 4, 5].map((k) => `.st-n${k} .e098-sn${k}`).join(', ')}, ${[1, 2, 3, 4].map((k) => `.st-c${k} .e098-c${k}`).join(', ')}, .st-clock .e098-clock { opacity: 1; }
.e098-hand, .e098-hhand { transform-origin: 0 0; }
.st-clock .e098-hand { animation: e098Spin .6s linear 4; }
.st-clock .e098-hhand { transform: rotate(60deg); transition: transform 2.4s linear; }
@keyframes e098Spin { to { transform: rotate(360deg); } }
/* lưới rùa: rơi xuống khi được cắt */
.e098-net { transition: opacity .5s, transform .6s ease-in; } .e098-netOff { opacity: 0; transition: opacity .4s .3s; }
.st-free .e098-net { opacity: 0; transform: translateY(8px); } .st-free .e098-netOff { opacity: 1; }
.e098-net { opacity: 0; } .st-netOn .e098-net { opacity: 1; } .st-free .e098-net { opacity: 0; }
/* trời nóng */
.e098-heat { opacity: 0; transition: opacity .6s; } .st-hot .e098-heat { opacity: 1; }
.e098-hw { animation: e098Heat 1.2s ease-in-out infinite alternate; }
@keyframes e098Heat { from { transform: translateY(4px); opacity: .3; } to { transform: translateY(-8px); opacity: .9; } }
.e098-sun { transition: transform .8s cubic-bezier(.3,1.5,.6,1); transform-origin: 0 0; } .st-hot .e098-sun { transform: scale(1.5); }
/* chai: chai đầy biến mất, chai rỗng hiện dần */
.e098-em { opacity: 0; transition: opacity .3s; }
${[1, 2, 3, 4].map((k) => `.st-b${k} .e098-em${k}`).join(', ')} { opacity: 1; }
.e098-full0, .e098-full1, .e098-full2 { transition: opacity .3s; }
.st-b1 .e098-full2, .st-b2 .e098-full1, .st-b3 .e098-full0 { opacity: 0; }
.st-look .e098-em { animation: e098Glow .5s ease-in-out infinite alternate; }
@keyframes e098Glow { to { transform: translateY(-3px); } }
/* biển đầy nhựa */
.e098-full { opacity: 0; transition: opacity 1.6s; } .st-seafull .e098-full { opacity: 1; }
.e098-bob { animation: e098Bob 1.6s ease-in-out infinite alternate; }
@keyframes e098Bob { from { transform: translateY(-3px); } to { transform: translateY(3px); } }
.e098-foam { animation: e098Foam 2.4s ease-in-out infinite alternate; }
@keyframes e098Foam { to { transform: translateY(3px); } }
.e098-nobag { opacity: 0; transition: opacity .4s; } .st-nobag .e098-nobag { opacity: 1; }
/* rùa: chân chèo khi bò, giãy trong lưới */
.es-thing.is-walk .e098-flF, .es-thing.act-e098-fight .e098-flF { animation: e098Fl .45s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: 0% 0%; }
.es-thing.is-walk .e098-flB, .es-thing.act-e098-fight .e098-flB { animation: e098Fl .45s ease-in-out infinite alternate-reverse; transform-box: fill-box; transform-origin: 100% 0%; }
@keyframes e098Fl { from { transform: rotate(-20deg); } to { transform: rotate(20deg); } }
.es-thing.act-e098-fight .e098-tt { animation: e098Shake .16s linear infinite alternate; }
@keyframes e098Shake { from { transform: translateX(-1.5px); } to { transform: translateX(1.5px); } }
.act-e098-snip .e098-blade { animation: e098Snip .2s ease-in-out infinite alternate; transform-origin: -2px 1px; }
@keyframes e098Snip { to { transform: rotate(-22deg); } }
@media (prefers-reduced-motion: reduce) {
  .e098-hw { animation-duration: 3s; } .e098-bob, .e098-foam { animation-duration: 4s; }
  .es-thing.is-walk .e098-flF, .es-thing.is-walk .e098-flB, .es-thing.act-e098-fight .e098-flF, .es-thing.act-e098-fight .e098-flB { animation-duration: 1s; }
  .es-thing.act-e098-fight .e098-tt { animation-duration: .5s; } .st-clock .e098-hand { animation-duration: 1.4s; animation-iteration-count: 2; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const KIDS = ['minh', 'lan'];

const BEATS = [
  { key: ['Minh and Lan joined a beach clean-up in Da Nang'], icon: '🏖️', label: 'beach clean-up', async play(st) {
    st.look(220);
    st.sfx('birds', { vol: 0.5 });
    await Promise.all([st.walk('lan', 250, { speed: 130, follow: false }), st.walk('minh', 296, { speed: 130, follow: false })]);
    st.face('lan', -1); st.face('minh', -1);
    st.pose('vol', 'wave'); st.act('vol', 'wave'); st.mood('vol', 'joy'); st.set('st-lb-cleanup');
    await st.wait(700);
    st.act('vol', null); st.pose('vol', 'give'); st.sfx('bag-on', { vol: 0.6 });
    st.hold('lan', 'e098_sack'); st.hold('minh', 'e098_sack'); st.pose('lan', 'stand'); st.pose('minh', 'cheer'); st.mood('minh', 'joy'); st.mood('lan', 'joy');
    await st.wait(1000);
    st.pose('vol', 'stand'); st.pose('minh', 'stand');
  } },
  { key: ['looked beautiful from far away', 'so much rubbish', 'could not believe it'], icon: '😲', label: 'so much rubbish', async play(st) {
    st.set('st-lb-cleanup', false);
    st.look(500);
    for (const id of KIDS) st.face(id, 1);
    st.pose('lan', 'point'); st.set('st-lb-far'); st.sfx('river', { vol: 0.5 });
    await st.wait(1300);
    st.set('st-lb-far', false); st.pose('lan', 'stand');
    await st.loop('river', () => Promise.all([
      st.walk('lan', 560, { speed: 120, follow: false }), st.walk('minh', 612, { speed: 120, follow: false }),
      st.look(660, { dur: 2500 }),
    ]), { vol: 0.4 });
    st.set('st-close'); st.sfx('whoosh', { vol: 0.4 });
    await st.wait(600);
    for (const id of KIDS) { st.mood(id, 'wow'); }
    st.pose('minh', 'shrug'); st.act('lan', 'no'); st.set('st-lb-much'); st.sfx('buzz-no', { vol: 0.4 });
    await st.wait(1200);
    st.act('lan', null); st.pose('minh', 'stand');
  } },
  { key: ['so many plastic bags', 'filled fifty sacks in two hours'], icon: '🛍️', label: 'fifty sacks', async play(st) {
    st.set('st-lb-much', false);
    st.look(820);
    st.set('st-lb-bags');
    await Promise.all([st.walk('lan', 680, { speed: 130, follow: false }), st.walk('minh', 726, { speed: 130, follow: false })]);
    st.place('vol', 790, FLOOR, 1); st.place('vol2', 878, FLOOR, -1); st.show('vol2', true); st.hold('vol', 'e098_sack'); st.hold('vol2', 'e098_sack');
    for (const id of ['minh', 'lan', 'vol', 'vol2']) { st.pose(id, 'e098_pick'); st.act(id, 'dig'); st.mood(id, 'happy'); }
    st.set('st-clock'); st.sfx('tick', { vol: 0.5 });
    for (let k = 1; k <= 5; k++) {
      st.set(`st-p${k}`); for (let n = 1; n <= 5; n++) st.set(`st-n${n}`, n === k);
      st.sfx('bag-on', { vol: 0.55, rate: 0.9 + k * 0.05 });
      await st.wait(520);
    }
    for (const id of ['minh', 'lan', 'vol', 'vol2']) { st.act(id, null); st.pose(id, 'stand'); }
    st.pose('vol', 'cheer'); st.mood('vol', 'joy'); st.sfx('cheer', { vol: 0.4 });
    await st.wait(900);
    st.pose('vol', 'stand');
  } },
  { key: ['found a poor turtle caught in a fishing net'], icon: '🐢', label: 'turtle in a net', async play(st) {
    off(st, 'st-lb-bags', 'st-clock', 'st-n5');
    st.set('st-netOn'); st.show('turtle', true); st.hold('lan', null); st.hold('minh', null);
    await st.walk('lan', X.turtle - 70, { speed: 130, lead: 20 });
    st.act('turtle', 'e098-fight'); st.sfx('box-shake', { vol: 0.6 });
    st.pose('lan', 'e098_bend'); st.mood('lan', 'wow'); st.set('st-lb-net');
    await st.wait(1500);
  } },
  { key: ['such a sad sight', 'she almost cried'], icon: '😢', label: 'a sad sight', async play(st) {
    st.set('st-lb-net', false);
    st.look(X.turtle - 40);
    st.act('turtle', 'e098-fight');
    st.pose('lan', 'e098_almost'); st.mood('lan', 'cry'); st.set('st-lb-sad');
    await st.wait(500);
    st.sfx('drip', { vol: 0.7 });
    st.fx('drops', X.turtle - 64, 186, { quiet: true });
    await st.wait(1400);
  } },
  { key: ['a volunteer helped her free it'], icon: '✂️', label: 'free it', async play(st) {
    st.set('st-lb-sad', false);
    st.look(X.turtle - 20);
    st.act('turtle', 'e098-fight');
    st.mood('lan', 'sad'); st.pose('lan', 'stand');
    st.hold('vol', 'e098_scissors'); st.place('vol', X.turtle - 260, FLOOR, 1);
    await st.walk('vol', X.turtle + 70, { speed: 150, follow: false });
    st.face('vol', -1); st.pose('vol', 'e098_cut'); st.act('vol', 'e098-snip');
    for (let i = 0; i < 3; i++) { st.sfx('click', { vol: 0.8, rate: 1.2 }); await st.wait(260); }
    st.act('vol', null); st.act('turtle', null);
    st.set('st-free'); st.set('st-lb-free'); st.sfx('whoosh', { vol: 0.4 });
    st.pose('vol', 'stand'); st.mood('lan', 'joy'); st.pose('lan', 'clap'); st.act('lan', 'clap'); st.sfx('clap', { vol: 0.5 });
    await st.walk('turtle', X.turtle + 40, { speed: 50, follow: false, y: SHORE - 2 });
    st.show('turtle', false); st.sfx('splash', { vol: 0.6 });
    st.act('lan', null); st.pose('lan', 'wave');
    await st.wait(600);
  } },
  { key: ['It was so hot', 'Minh drank four bottles of water'], icon: '🥵', label: 'four bottles', async play(st) {
    off(st, 'st-lb-free');
    st.pose('lan', 'stand');
    st.set('st-hot'); st.set('st-lb-hot');
    st.place('minh', X.station - 160, FLOOR, 1); st.hold('minh', null); st.mood('minh', 'sad');
    st.look(X.station);
    await st.walk('minh', X.station + 2, { speed: 100, follow: false });
    st.pose('minh', 'e098_wipe'); st.fx('drops', X.station + 2, 165, { quiet: true });
    await st.wait(500);
    st.pose('minh', 'drink'); st.hold('minh', 'e098_bottle');
    for (let b = 1; b <= 4; b++) {
      st.sfx('gulp', { vol: 0.8 });
      await st.wait(420);
      for (let n = 1; n <= 4; n++) st.set(`st-c${n}`, n === b);
      st.set(`st-b${b}`);
      st.sfx('bowl-down', { vol: 0.25, rate: 1.6 });
      await st.wait(260);
    }
    st.hold('minh', null); st.pose('minh', 'stand'); st.mood('minh', 'joy');
    await st.wait(400);
  } },
  { key: ['he looked at the empty bottles'], icon: '🧴', label: 'empty bottles', async play(st) {
    off(st, 'st-lb-hot', 'st-c4');
    st.look(X.station + 20);
    st.face('minh', 1); st.pose('minh', 'e098_look'); st.mood('minh', 'wow');
    st.set('st-look'); st.set('st-lb-empty'); st.sfx('roll', { vol: 0.6 });
    await st.wait(900);
    st.pose('minh', 'think'); st.mood('minh', 'sad');
    await st.wait(1200);
  } },
  { key: ['such a lot of plastic', 'the sea is full of it'], icon: '🌊', label: 'full of plastic', async play(st) {
    off(st, 'st-lb-empty', 'st-look');
    st.look(X.station - 40);
    st.face('minh', -1); st.pose('minh', 'point'); st.talk('minh', true);
    await st.wait(400);
    st.set('st-seafull'); st.sfx('splash', { vol: 0.4 });
    await st.wait(500); st.sfx('splash', { vol: 0.35, rate: 1.2 });
    st.set('st-lb-full');
    await st.say('minh', 'So much plastic!', 1500);
    st.talk('minh', false); st.pose('minh', 'sad');
  } },
  { key: ['Since that day', 'always brought cloth bags when they go shopping'], icon: '👜', label: 'cloth bags', async play(st) {
    off(st, 'st-lb-full', 'st-hot');
    st.set('st-lb-since'); st.set('st-nobag');
    for (const id of ['mum', 'dad']) st.show(id, true);
    const pos = { dad: X.market - 300, mum: X.market - 250, lan: X.market - 200, minh: X.market - 160 };
    for (const id of ['dad', 'mum', 'lan', 'minh']) { st.place(id, pos[id], FLOOR, 1); st.hold(id, 'e098_cloth'); st.pose(id, 'stand'); st.mood(id, 'happy'); }
    st.look(X.market - 40, { instant: true });
    await Promise.all(['dad', 'mum', 'lan', 'minh'].map((id) => st.walk(id, pos[id] + 160, { speed: 120, follow: false })));
    st.set('st-lb-cloth'); st.pose('mum', 'raise'); st.sfx('bag-on', { vol: 0.6 });
    await st.wait(400);
    st.pose('seller', 'give'); st.sfx('whoosh', { vol: 0.35 });
    await st.fly(`<circle r="7" fill="#F97316" stroke="${L}" stroke-width="0.8"/>`, [X.market + 50, 196], [X.market - 70, 170], { size: 18, dur: 500 });
    st.hold('mum', 'e098_clothFull'); st.pose('mum', 'stand'); st.sfx('cash', { vol: 0.5 });
    st.pose('seller', 'stand'); st.mood('seller', 'joy');
    for (const id of ['dad', 'mum', 'lan', 'minh']) st.mood(id, 'joy');
    await st.wait(1000);
  } },
];

export default {
  id: 'en098', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 2, 5, 6, 9],
  cast: [
    { id: 'turtle', kind: 'thing', x: X.turtle, y: FLOOR + 2, svg: TURTLE, box: [-40, -26, 88, 32] },
    { id: 'seller', kind: 'adult', who: 'e098_seller', x: X.market + 88, s: 0.95, face: -1 },
    { id: 'vol2', kind: 'adult', who: 'e098_vol2', x: 140, s: 0.95, face: 1 },
    { id: 'vol', kind: 'adult', who: 'e098_vol', x: X.tent + 10, s: 0.95, face: 1 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: X.market - 300, s: 0.95 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: X.market - 250, s: 0.95 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: -60, s: 1.08 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: -20 },
  ],
  init(st) {
    for (const id of ['turtle', 'dad', 'mum']) st.show(id, false);
    st.set('st-netOn', false);
  },
};
