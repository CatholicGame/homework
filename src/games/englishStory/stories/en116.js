/**
 * Bài 116 "The Lady with the Lamp" (quá khứ đơn; first / then / finally): Florence Nightingale. Một thế giới đi từ trái
 * sang phải theo đời bà: nhà điền trang ở Anh năm 1820 (bố mẹ bế em bé) → bến cảng (bảng tin chiến tranh Crimea, bong
 * bóng nghĩ: lính bị thương băng bó) → tàu hơi nước vượt biển → bệnh viện Scutari (phòng bệnh bẩn, chuột chạy; các y tá
 * quét dọn, sân sau giặt ga trải giường, nấu ăn; ban đêm Florence cầm đèn đi từ giường này sang giường kia, ngồi nói
 * chuyện, viết thư giúp lính) → bến tàu → biển → London (tháp đồng hồ, trường dạy y tá mở năm 1860).
 * Trang phục thời Victoria: váy dài, y tá áo xám, tạp dề trắng, mũ trắng. Không có cảnh đánh nhau; lính chỉ băng bó.
 * Toạ độ cảnh: rộng 3800, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly, lying } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, thought, flowerAt } from '../kit.js';

const FLOOR = 282;
const W = 3800;
const SEA = 286;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { house: 250, board: 585, pier1: 690, sea1: [720, 1310], shore1: 1340, ward: [1450, 2250], yard: [2250, 2580], pier2: 2640, sea2: [2690, 3200], ben: 3330, school: [3460, 3780], door: 3590 };
const BEDS = [1560, 1700, 1840, 1980, 2120];
const NURSE = { adult: true, hair: 'bun', top: 'blouse', bottom: 'longskirt', hat: 'scarf', trim: ['#FFFFFF', '#E2E8F0', '#CBD5E1'], shoe: '#1F2937' };

Object.assign(CAST, {
  e116_lady: { adult: true, hair: 'bun', hairC: '#7C4A1E', top: 'blouse', shirt: '#93C5FD', bottom: 'longskirt', bottomC: '#60A5FA', trim: ['#BFDBFE', '#FFFFFF', '#93C5FD'], shoe: '#1F2937' },
  e116_flo: { ...NURSE, hairC: '#7C4A1E', shirt: '#64748B', bottomC: '#64748B' },
  e116_n1: { ...NURSE, hairC: '#1F1716', shirt: '#475569', bottomC: '#475569' },
  e116_n2: { ...NURSE, hairC: '#B45309', shirt: '#57534E', bottomC: '#57534E' },
  e116_n3: { ...NURSE, hairC: '#44403C', shirt: '#475569', bottomC: '#475569' },
  e116_dad: { adult: true, hair: 'short', hairC: '#57534E', moustache: true, top: 'jacket', shirt: '#1F2937', inner: '#FFFFFF', bottom: 'pants', bottomC: '#78716C', shoe: '#1C1917' },
  e116_mum: { adult: true, hair: 'bun', hairC: '#7C4A1E', top: 'blouse', shirt: '#C4B5FD', bottom: 'longskirt', bottomC: '#8B5CF6', trim: ['#DDD6FE', '#FFFFFF', '#A78BFA'], shoe: '#1F2937' },
  e116_st1: { ...NURSE, hairC: '#1F1716', shirt: '#3B82F6', bottomC: '#3B82F6' },
  e116_st2: { ...NURSE, hairC: '#D97706', shirt: '#2563EB', bottomC: '#2563EB' },
  e116_sol1: { adult: true, hair: 'short', hairC: '#3B2A22' },
  e116_sol2: { adult: true, hair: 'short', hairC: '#A16207', moustache: true },
  e116_sol3: { adult: true, hair: 'short', hairC: '#1F1716' },
  e116_sick: { adult: true, old: true, hair: 'short', hairC: '#E7E5E4' },
});

// ── Đồ vật ─────────────────────────────────────────────────────────────────
/** Tạp dề trắng (trước ngực): dáng trước mặt và dáng nghiêng (CSS ẩn cái không dùng). */
const APRON = `<g class="e116-apf"><path d="M-8 -12 H8 V2 H13 L15 76 Q0 80 -15 76 L-13 2 H-8Z" fill="#FFFFFF" stroke="${L}" stroke-width="0.8"/>
  <path d="M-13 2 H13" stroke="#CBD5E1" stroke-width="1.4"/></g>
  <g class="e116-aps"><path d="M-1 -12 L5 -12 L6 2 L12 78 L2 80 Z" fill="#FFFFFF" stroke="${L}" stroke-width="0.8"/></g>`;
/** Váy dài ở dáng nghiêng (rig chỉ có váy ngắn khi đi): chèn vào trước pp-chest. */
const SKIRT_SIDE = (c) => `<path d="M-16 -94 H18 L30 -3 Q2 3 -27 -3Z" fill="${c}" stroke="${L}" stroke-width="1"/>
  <path d="M-27 -10 Q2 -4 30 -10" stroke="#FFFFFF" stroke-width="2.4" fill="none" opacity="0.8"/>`;
function longSkirt(st, id, c) {
  const ch = st.a(id).inner.querySelector('.pp-side .pp-chest');
  ch?.insertAdjacentHTML('beforebegin', SKIRT_SIDE(c));
}
/** Em bé quấn khăn (trước ngực mẹ). */
const BABY = `<g transform="translate(0 -4)"><ellipse cx="2" cy="0" rx="17" ry="9" fill="#FEF3C7" stroke="${L}" stroke-width="0.9"/>
  <path d="M-8 -6 Q4 -2 16 -6" stroke="#FDE68A" stroke-width="1.4" fill="none"/>
  <g transform="translate(-13 -3)">${''}<circle r="7" fill="#FADCC4" stroke="${L}" stroke-width="0.8"/><path d="M-3 -1 q1.4 1.4 2.8 0 M1.4 -1 q1.4 1.4 2.8 0" stroke="#2B1D16" stroke-width="0.8" fill="none"/>
  <path d="M-1 3 q1.4 1 2.8 0" stroke="#9A3B2E" stroke-width="0.8" fill="none"/><path d="M-6 -4 Q0 -10 6 -4" stroke="#7C4A1E" stroke-width="1.6" fill="none"/></g></g>`;
/** Đèn lồng giấy kiểu Thổ (treo ở tay; xoay bù góc tay để đèn luôn thẳng). */
const LAMP = (on, rot) => `<g transform="rotate(${rot})">${on ? `<circle cy="18" r="46" fill="#FDE68A" opacity="0.28"/><circle cy="18" r="24" fill="#FEF3C7" opacity="0.45"/>` : ''}
  <path d="M0 0 V6" stroke="${L}" stroke-width="1.4"/><path d="M-5 6 H5 L4 9 H-4Z" fill="#78716C" stroke="${L}" stroke-width="0.6"/>
  <rect x="-6" y="9" width="12" height="19" rx="5" fill="${on ? '#FEF08A' : '#FEF3C7'}" stroke="${L}" stroke-width="0.8"/>
  ${[13, 17, 21, 25].map((y) => `<path d="M-6 ${y} H6" stroke="#D6B98A" stroke-width="0.6"/>`).join('')}
  <path d="M-4 28 H4 L3 31 H-3Z" fill="#78716C" stroke="${L}" stroke-width="0.6"/></g>`;
const BROOM = `<g><path d="M0 -26 V34" stroke="#A16207" stroke-width="2.6" stroke-linecap="round"/><path d="M-7 34 H7 L10 48 H-10Z" fill="#FCD34D" stroke="${L}" stroke-width="0.8"/>
  <path d="M-6 38 L-8 47 M-2 38 L-3 47 M2 38 L3 47 M6 38 L8 47" stroke="#B45309" stroke-width="0.7"/></g>`;
const LADLE = `<g><path d="M0 -6 V30" stroke="#78716C" stroke-width="2" stroke-linecap="round"/><path d="M-5 30 Q0 38 5 30Z" fill="#A8A29E" stroke="${L}" stroke-width="0.7"/></g>`;
const PEN = `<g transform="rotate(200)"><path d="M0 -4 V18" stroke="#1F2937" stroke-width="1.6"/><path d="M0 -4 Q-6 -14 -2 -22 Q4 -14 0 -4Z" fill="#F8FAFC" stroke="${L}" stroke-width="0.6"/></g>`;
const LETTER = `<rect x="-14" y="-9" width="28" height="18" rx="2" fill="#FFFBEB" stroke="${L}" stroke-width="0.9"/><path d="M-14 -9 L0 3 L14 -9" stroke="${L}" stroke-width="0.9" fill="none"/>
  <path d="M0 -3 c-2 -3 -6 0 0 5 c6 -5 2 -8 0 -5Z" fill="#F43F5E"/>`;
const PAPER = `<g transform="translate(0 -4) rotate(-8)"><rect x="-10" y="-8" width="20" height="15" rx="1" fill="#FFFBEB" stroke="${L}" stroke-width="0.8"/><path d="M-7 -4 H7 M-7 0 H7 M-7 4 H3" stroke="#94A3B8" stroke-width="0.8"/></g>`;
const PROPS = {
  e116_lamp: LAMP(false, 70), e116_lampOn: LAMP(true, 70), e116_broom: BROOM, e116_ladle: LADLE, e116_pen: PEN,
};
const POSES = {
  e116_lamp: { R: [40, 70], L: [10, 4] },
  e116_sweep: { R: [26, 40], L: [40, 60], head: 8 },
  e116_scrub: { R: [28, -30], L: [28, -30], dy: 10, head: 10 },
  e116_tell: { R: [70, 110], L: [10, 4], head: 6 },
  e116_sitTalk: { R: [40, 70], L: [50, 120], head: 12 },
  e116_write: { R: [40, -60], L: [30, -76], head: 12 },
  e116_hold: { R: [24, -86], L: [24, -86] },
  e116_bow: { R: [10, 4], L: [10, 4], head: 14 },
};

/** Chuột (nhìn nghiêng sang phải, gốc = chân chạm đất). */
const RAT = `<g class="e116-ratb"><path class="e116-rtail" d="M-14 -5 Q-26 -2 -31 -11" stroke="#F9A8D4" stroke-width="2" fill="none" stroke-linecap="round"/>
  <g class="e116-rl1"><path d="M-7 -3 V0" stroke="${L}" stroke-width="2" stroke-linecap="round"/></g><g class="e116-rl2"><path d="M7 -3 V0" stroke="${L}" stroke-width="2" stroke-linecap="round"/></g>
  <ellipse cx="0" cy="-8" rx="15" ry="7" fill="#78716C" stroke="${L}"/><ellipse cx="2" cy="-5" rx="9" ry="3" fill="#A8A29E" opacity="0.7"/>
  <path d="M10 -13 Q20 -12 22 -8 Q18 -4 10 -5Z" fill="#78716C" stroke="${L}" stroke-width="0.9"/><circle cx="22" cy="-8" r="1.6" fill="#F472B6"/>
  <circle cx="11" cy="-15" r="3.6" fill="#A8A29E" stroke="${L}" stroke-width="0.8"/><circle cx="11" cy="-15" r="1.8" fill="#F9A8D4"/><circle cx="16" cy="-10" r="1.1" fill="#111827"/></g>`;
/** Tàu hơi nước có buồm (gốc = mặt nước, giữa tàu); đầu các y tá ló trên mạn tàu (class e116-crew). */
const SHIP = `<g class="e116-bob">
  <g class="e116-smoke">${[[4, -96, 9], [-6, -112, 12], [-20, -128, 15]].map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#D6D3D1" opacity="${0.85 - i * 0.2}" style="animation-delay:${i * 0.4}s"/>`).join('')}</g>
  <path d="M-62 -34 V-136 M58 -34 V-130" stroke="#78350F" stroke-width="3.4"/>
  <path d="M-62 -128 Q-30 -110 -62 -64Z M-62 -128 Q-96 -104 -62 -64Z" fill="#FFFBEB" stroke="${L}" stroke-width="0.9"/>
  <path d="M58 -122 Q86 -100 58 -66Z" fill="#FFFBEB" stroke="${L}" stroke-width="0.9"/>
  <path d="M-62 -136 L-44 -132 L-62 -127Z" fill="#DC2626" stroke="${L}" stroke-width="0.6"/>
  <rect x="-6" y="-92" width="14" height="58" fill="#1F2937" stroke="${L}" stroke-width="0.9"/><rect x="-6" y="-92" width="14" height="8" fill="#B91C1C"/>
  <g class="e116-crew">${[-84, -58, -32, 30, 56, 82].map((x, i) => `<g transform="translate(${x} -46)">${headOnly(['e116_flo', 'e116_n1', 'e116_n2', 'e116_n3', 'e116_n1', 'e116_n2'][i], { s: 0.55, mood: 'happy' })}</g>`).join('')}</g>
  <path d="M-112 -36 H114 Q108 -8 88 0 H-92 Q-108 -10 -112 -36Z" fill="#7C4A1E" stroke="${L}" stroke-width="1.2"/>
  <path d="M-110 -30 H112" stroke="#FDE68A" stroke-width="3"/>
  ${[-70, -40, -10, 20, 50, 80].map((x) => `<circle cx="${x}" cy="-17" r="4" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <g transform="translate(0 -26)"><path d="M-22 0 A22 22 0 0 1 22 0Z" fill="#B45309" stroke="${L}" stroke-width="1"/>
    <g class="e116-paddle">${[0, 45, 90, 135].map((a) => `<path d="M-18 0 H18" stroke="#78350F" stroke-width="1.6" transform="rotate(${a})"/>`).join('')}</g></g></g>`;

// ── Cảnh ──────────────────────────────────────────────────────────────────
const manor = (x) => `<g transform="translate(${x} ${FLOOR})">
  <rect x="-150" y="-170" width="300" height="170" fill="#EBDDC8" stroke="${L}" stroke-width="1.2"/>
  <path d="M-162 -170 L-120 -206 H120 L162 -170Z" fill="#64748B" stroke="${L}" stroke-width="1.2"/>
  <rect x="-110" y="-224" width="14" height="24" fill="#A8A29E" stroke="${L}"/><rect x="96" y="-224" width="14" height="24" fill="#A8A29E" stroke="${L}"/>
  <path d="M-40 -170 L0 -196 L40 -170Z" fill="#D6C3A5" stroke="${L}"/>
  ${[-120, -80, 80, 120].map((dx) => [-150, -86].map((dy) => `<rect x="${dx - 12}" y="${dy}" width="24" height="38" rx="2" fill="#BAE6FD" stroke="${L}" stroke-width="0.9"/><path d="M${dx} ${dy} V${dy + 38} M${dx - 12} ${dy + 19} H${dx + 12}" stroke="#fff" stroke-width="1.6"/>`).join('')).join('')}
  ${[-40, 40].map((dx) => `<rect x="${dx - 5}" y="-166" width="10" height="150" fill="#F5F5F4" stroke="${L}" stroke-width="0.9"/>`).join('')}
  <rect x="-18" y="-66" width="36" height="58" rx="16" fill="#7C2D12" stroke="${L}"/><circle cx="10" cy="-36" r="2.4" fill="#FDE68A"/>
  <rect x="-52" y="-10" width="104" height="10" fill="#D6D3D1" stroke="${L}" stroke-width="0.9"/></g>`;
const bedAt = (x, who, i) => {
  const s = 0.8, len = 100, y = 252;
  const band = `<g transform="translate(${x + (-len / 2 - 12) * s} ${y - 25 * s}) scale(${s}) rotate(-78)"><path d="M-14 -9 Q0 -15 14 -9 L14 -3 Q0 -9 -14 -3Z" fill="#fff" stroke="#CBD5E1" stroke-width="0.6"/></g>`;
  return `<g>
  <path d="M${x - 74} ${FLOOR} V214 M${x + 48} ${FLOOR} V236" stroke="#57534E" stroke-width="3.4"/><path d="M${x - 74} 222 Q${x - 66} 212 ${x - 58} 222" stroke="#57534E" stroke-width="2" fill="none"/>
  <rect x="${x - 76}" y="${y - 4}" width="126" height="9" rx="2" fill="#E7E5E4" stroke="${L}" stroke-width="0.8"/>
  <path d="M${x - 70} ${y + 5} V${FLOOR} M${x + 44} ${y + 5} V${FLOOR}" stroke="#57534E" stroke-width="2.4"/>
  <g class="e116-sad">${lying(x, y, who, { s, mood: 'sad', blanket: '#D6D3D1', len })}${i % 2 ? '' : band}</g>
  <g class="e116-joy">${lying(x, y, who, { s, mood: 'joy', blanket: '#BFDBFE', len })}${i % 2 ? '' : band}</g></g>`;
};
const SOLS = ['e116_sol1', 'e116_sol2', 'e116_sol3', 'e116_sol1', 'e116_sol2'];

function bg() {
  const [w0, w1] = X.ward, [y0, y1] = X.yard;
  const dirt = [[1520, 150, 22], [1620, 296, 30], [1790, 120, 20], [1900, 300, 34], [2040, 170, 24], [2190, 294, 26], [1740, 190, 18], [2150, 100, 18], [1500, 304, 24], [1980, 120, 16], [1700, 306, 22], [2080, 304, 28]];
  return `
  ${sky(0, W, 315, 'e116sky')}
  <defs><radialGradient id="e116glow"><stop offset="0" stop-color="#FEF3C7" stop-opacity="0.95"/><stop offset="0.6" stop-color="#FDE68A" stop-opacity="0.5"/><stop offset="1" stop-color="#FDE68A" stop-opacity="0"/></radialGradient></defs>
  ${cloud(160, 60, 0.8, 0)}${cloud(900, 50, 0.9, 2)}${cloud(1200, 74, 0.7, 4)}${cloud(2900, 54, 0.9, 1)}${cloud(3500, 46, 0.8, 3)}
  <!-- nước Anh 1820: điền trang -->
  <rect x="0" y="${FLOOR}" width="${X.sea1[0]}" height="33" fill="#86EFAC" stroke="${L}"/>
  ${tree(36, FLOOR, 1, '')}${manor(X.house)}${tree(470, FLOOR, 0.9, '')}
  ${[90, 110, 400, 420, 440].map((x, i) => flowerAt(x, FLOOR + 4, ['#F472B6', '#FDE047', '#F472B6', '#A78BFA', '#FDE047'][i])).join('')}
  <!-- bến cảng -->
  <rect x="520" y="${FLOOR}" width="${X.sea1[0] - 520}" height="33" fill="#D6D3D1" stroke="${L}"/>
  ${Array.from({ length: 5 }, (_, i) => `<path d="M${530 + i * 40} ${FLOOR} V315" stroke="#A8A29E"/>`).join('')}
  <g transform="translate(${X.board} 0)"><path d="M-30 ${FLOOR} V160 M30 ${FLOOR} V160" stroke="#78350F" stroke-width="4"/>
    <rect x="-44" y="150" width="88" height="70" rx="3" fill="#A16207" stroke="${L}" stroke-width="1.2"/>
    <g class="e116-news"><rect x="-36" y="157" width="72" height="56" fill="#FFFBEB" stroke="${L}" stroke-width="0.8"/>
      <text x="0" y="172" text-anchor="middle" ${NUN} font-size="10" fill="#1F2937">NEWS</text><path d="M-30 176 H30" stroke="#1F2937" stroke-width="0.8"/>
      <text x="0" y="190" text-anchor="middle" ${NUN} font-size="8.5" fill="#B91C1C">WAR IN CRIMEA</text>
      <path d="M-28 198 H28 M-28 204 H20" stroke="#A8A29E" stroke-width="1.6"/></g></g>
  <!-- biển 1 + đất Scutari -->
  <path d="M${X.sea1[0]} ${SEA} Q900 260 1100 270 T${X.sea1[1]} ${SEA}" fill="#A7C7A0" opacity="0.5"/>
  <rect x="${X.sea1[0]}" y="${SEA}" width="${X.sea1[1] - X.sea1[0]}" height="${315 - SEA}" fill="#38BDF8" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: 14 }, (_, i) => `<path d="M${X.sea1[0] + 14 + i * 42} ${SEA + 10 + (i % 3) * 7} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <rect x="${X.sea1[1]}" y="${FLOOR}" width="${w0 - X.sea1[1]}" height="33" fill="#E7D3A8" stroke="${L}"/>
  <!-- bệnh viện Scutari: mặt ngoài (tháp góc) -->
  <rect x="${X.sea1[1] + 20}" y="100" width="${w0 - X.sea1[1] - 20}" height="${FLOOR - 100}" fill="#F5E6C8" stroke="${L}" stroke-width="1.2"/>
  <rect x="${X.sea1[1] + 14}" y="70" width="44" height="${FLOOR - 70}" fill="#EAD7B0" stroke="${L}" stroke-width="1.2"/><path d="M${X.sea1[1] + 8} 72 L${X.sea1[1] + 36} 40 L${X.sea1[1] + 64} 72Z" fill="#94A3B8" stroke="${L}"/>
  ${[130, 190].map((y) => `<path d="M${X.sea1[1] + 74} ${y + 30} V${y + 8} Q${X.sea1[1] + 86} ${y - 4} ${X.sea1[1] + 98} ${y + 8} V${y + 30}Z" fill="#7DD3FC" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <!-- phòng bệnh -->
  <rect x="${w0}" y="0" width="${w1 - w0}" height="${FLOOR}" fill="#EDE4D3"/>
  <rect x="${w0}" y="0" width="${w1 - w0}" height="14" fill="#D6C3A5" stroke="${L}"/>
  <rect x="${w0}" y="${FLOOR}" width="${w1 - w0}" height="33" fill="#A8A29E" stroke="${L}"/>
  ${Array.from({ length: 14 }, (_, i) => `<path d="M${w0 + i * 60} ${FLOOR} V315" stroke="#8B8580"/>`).join('')}
  <rect x="${w0 - 6}" y="0" width="12" height="${FLOOR}" fill="#D6C3A5" stroke="${L}"/>
  ${[1630, 1910, 2190].map((x) => `<path d="M${x - 30} 150 V80 Q${x} 44 ${x + 30} 80 V150Z" fill="#BAE6FD" stroke="${L}" stroke-width="1.2"/><path d="M${x} 52 V150 M${x - 30} 104 H${x + 30}" stroke="#fff" stroke-width="2.4"/>
    <circle class="e116-moon" cx="${x + 12}" cy="76" r="8" fill="#FEF9C3"/>`).join('')}
  <g class="e116-dirt">${dirt.map(([x, y, r], i) => `<g class="e116-d e116-d${i % 4}"><ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.45}" fill="#7C5A2E" opacity="0.75"/><ellipse cx="${x + r * 0.6}" cy="${y - 2}" rx="${r * 0.4}" ry="${r * 0.25}" fill="#5B3F1E" opacity="0.7"/>${y > 280 ? `<path d="M${x - r} ${y - 3} l8 -4 M${x - 4} ${y + 2} l10 -3 M${x + r * 0.4} ${y + 4} l7 2" stroke="#CA8A04" stroke-width="1.4"/>` : ''}</g>`).join('')}
    <g class="e116-d e116-d1"><path d="M${w0} 14 Q${w0 + 30} 30 ${w0 + 50} 14 M${w0} 30 Q${w0 + 20} 34 ${w0 + 34} 14 M${w0 + 12} 14 L${w0} 40" stroke="#A8A29E" stroke-width="0.8" fill="none"/></g>
    <g class="e116-d e116-d2"><path d="M${w1} 14 Q${w1 - 30} 30 ${w1 - 50} 14 M${w1} 30 Q${w1 - 20} 34 ${w1 - 34} 14" stroke="#A8A29E" stroke-width="0.8" fill="none"/></g></g>
  ${BEDS.map((x, i) => bedAt(x, SOLS[i], i)).join('')}
  <!-- đêm trong phòng bệnh (sau lưng người), ánh đèn ở từng giường -->
  <rect class="e116-night" x="${X.sea1[1]}" y="0" width="${X.pier2 + 120 - X.sea1[1]}" height="315" fill="#1E1B4B"/>
  ${BEDS.map((x, i) => `<ellipse class="e116-gl e116-gl${i}" cx="${x - 10}" cy="236" rx="78" ry="56" fill="url(#e116glow)"/>`).join('')}
  <!-- sân sau: giặt giũ, nấu ăn -->
  <rect x="${y0}" y="${FLOOR}" width="${X.sea2[0] - y0}" height="33" fill="#E7D3A8" stroke="${L}"/>
  <rect x="${y1 - 4}" y="150" width="10" height="${FLOOR - 150}" fill="#D6C3A5" stroke="${L}"/>
  <path d="M${y0 + 30} ${FLOOR} V150 M${y0 + 190} ${FLOOR} V150" stroke="#78350F" stroke-width="3.4"/><path d="M${y0 + 30} 156 Q${y0 + 110} 166 ${y0 + 190} 156" stroke="#57534E" stroke-width="1.2" fill="none"/>
  ${[0, 1, 2].map((i) => `<g class="e116-sheet e116-sh${i}"><g class="e116-flap" style="animation-delay:${i * 0.3}s;transform-origin:${y0 + 64 + i * 46}px 160px"><rect x="${y0 + 46 + i * 46}" y="159" width="38" height="50" fill="${['#FFFFFF', '#F1F5F9', '#FFFFFF'][i]}" stroke="${L}" stroke-width="0.8"/></g></g>`).join('')}
  <g transform="translate(${y0 + 70} ${FLOOR})"><path d="M-30 -30 H30 L26 0 H-26Z" fill="#B45309" stroke="${L}"/><path d="M-30 -22 H30 M-28 -10 H28" stroke="#78350F" stroke-width="1.4"/>
    <ellipse cx="0" cy="-30" rx="30" ry="5" fill="#7DD3FC" stroke="${L}" stroke-width="0.8"/><g class="e116-suds">${[-16, -6, 6, 16, 0].map((x, i) => `<circle cx="${x}" cy="${-34 - (i % 2) * 4}" r="${4 + (i % 3)}" fill="#fff" stroke="#BAE6FD" stroke-width="0.6"/>`).join('')}</g></g>
  <g transform="translate(${y0 + 260} ${FLOOR})"><rect x="-30" y="-34" width="60" height="34" fill="#B91C1C" stroke="${L}"/>${[-20, 0, 20].map((x) => `<path d="M${x - 10} -22 H${x + 10} M${x - 10} -11 H${x + 10}" stroke="#7F1D1D"/>`).join('')}
    <g class="e116-fire"><path d="M-12 -34 Q-8 -50 0 -40 Q6 -54 12 -34Z" fill="#F97316"/></g>
    <path d="M-24 -40 H24 L20 -70 H-20Z" fill="#334155" stroke="${L}"/><path d="M-26 -70 H26" stroke="${L}" stroke-width="2.4"/>
    <g class="e116-steam">${[-10, 0, 10].map((dx, i) => `<path class="ek-steam" style="animation-delay:${i * 0.5}s" d="M${dx} -74 q-5 -8 0 -16 q5 -8 0 -16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}</g></g>
  <!-- bến tàu 2, biển 2 -->
  <rect x="${X.pier2 - 40}" y="${FLOOR}" width="${X.sea2[0] - X.pier2 + 40}" height="8" fill="#A16207" stroke="${L}"/>
  <rect x="${X.sea2[0]}" y="${SEA}" width="${X.sea2[1] - X.sea2[0]}" height="${315 - SEA}" fill="#38BDF8" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: 12 }, (_, i) => `<path d="M${X.sea2[0] + 14 + i * 42} ${SEA + 10 + (i % 3) * 7} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <!-- London: tháp đồng hồ, trường dạy y tá -->
  <rect x="${X.sea2[1]}" y="${FLOOR}" width="${W - X.sea2[1]}" height="33" fill="#D6D3D1" stroke="${L}"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M${X.sea2[1] + i * 50} ${FLOOR} V315" stroke="#A8A29E"/>`).join('')}
  <g transform="translate(${X.ben} 0)"><rect x="-22" y="70" width="44" height="${FLOOR - 70}" fill="#E7C98E" stroke="${L}" stroke-width="1.2"/>
    ${[120, 160, 200, 240].map((y) => `<rect x="-10" y="${y}" width="20" height="24" rx="2" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/>`).join('')}
    <rect x="-26" y="40" width="52" height="34" fill="#E7C98E" stroke="${L}" stroke-width="1.2"/><circle cy="57" r="14" fill="#FFFBEB" stroke="${L}" stroke-width="1.2"/>
    <path d="M0 57 V48 M0 57 L7 60" stroke="#1F2937" stroke-width="1.6" stroke-linecap="round"/><path d="M-26 40 L0 -2 L26 40Z" fill="#475569" stroke="${L}" stroke-width="1.2"/></g>
  ${tree(3420, FLOOR, 0.8, '')}
  <g transform="translate(${(X.school[0] + X.school[1]) / 2} ${FLOOR})">
    <rect x="-160" y="-210" width="320" height="210" fill="#C2410C" stroke="${L}" stroke-width="1.2"/>
    <path d="M-170 -210 H170 L150 -232 H-150Z" fill="#475569" stroke="${L}" stroke-width="1.2"/>
    ${[-120, -70, 70, 120].map((dx) => [-160, -100].map((dy) => `<rect x="${dx - 12}" y="${dy}" width="24" height="36" rx="10" fill="#BAE6FD" stroke="${L}" stroke-width="0.9"/>`).join('')).join('')}
    <rect x="-24" y="-72" width="48" height="72" rx="20" fill="#7C2D12" stroke="${L}"/><rect x="-30" y="-6" width="60" height="6" fill="#D6D3D1" stroke="${L}" stroke-width="0.8"/>
    <g class="e116-sign"><rect x="-88" y="-202" width="176" height="28" rx="5" fill="#FFFBEB" stroke="${L}" stroke-width="1.2"/>
      <text x="0" y="-183" text-anchor="middle" ${NUN} font-size="12" fill="#1D4ED8">SCHOOL FOR NURSES</text></g></g>`;
}

function fg() {
  const sick = `<rect x="-58" y="-34" width="116" height="70" rx="10" fill="#FFFBEB"/>
    ${lying(0, 22, 'e116_sick', { s: 0.62, mood: 'sad', blanket: '#BFDBFE', len: 100 })}
    <g class="e116-care"><g transform="translate(34 -12)"><path d="M0 -4 c-3 -5 -10 0 0 8 c10 -8 3 -13 0 -8Z" fill="#F43F5E" stroke="${L}" stroke-width="0.6"/></g></g>`;
  const hurt = `<rect x="-62" y="-36" width="124" height="74" rx="10" fill="#FEF3C7"/>
    <path d="M-50 18 L-26 -26 L-2 18Z" fill="#E7E5E4" stroke="${L}" stroke-width="0.9"/><path d="M-26 -26 V18" stroke="${L}" stroke-width="0.6"/>
    ${[[-30, 'e116_sol1'], [10, 'e116_sol2'], [40, 'e116_sol3']].map(([x, who], i) => `<g transform="translate(${x} 4)">${headOnly(who, { s: 0.62, mood: 'sad' })}
      ${i !== 1 ? `<path d="M-10 -9 Q0 -14 10 -9 L10 -5 Q0 -10 -10 -5Z" fill="#fff" stroke="#CBD5E1" stroke-width="0.6"/>` : `<path d="M-14 16 Q0 26 14 16" stroke="#fff" stroke-width="5" fill="none"/>`}</g>`).join('')}
    <path d="M-60 30 H60" stroke="#A8A29E" stroke-width="1.4"/>`;
  return `
  <!-- trụ cầu tàu, bụi cây trước -->
  <g><rect x="${X.pier1 - 50}" y="${FLOOR}" width="80" height="8" fill="#A16207" stroke="${L}"/>${[X.pier1 - 40, X.pier1 + 20].map((x) => `<rect x="${x}" y="${FLOOR + 6}" width="7" height="27" fill="#78350F" stroke="${L}" stroke-width="0.8"/>`).join('')}</g>
  ${[X.pier2 - 20, X.pier2 + 40].map((x) => `<rect x="${x}" y="${FLOOR + 6}" width="7" height="27" fill="#78350F" stroke="${L}" stroke-width="0.8"/>`).join('')}
  ${bush(16, FLOOR + 30, 0.6)}${bush(500, FLOOR + 30, 0.6, '#4ADE80')}
  <!-- bong bóng nghĩ -->
  ${thought(300, 92, 150, 96, sick, [318, 128], 'e116-bub e116-bub1')}
  ${thought(470, 98, 160, 102, hurt, [568, 130], 'e116-bub e116-bub2')}
  <!-- thư bay lên -->
  <g class="e116-letter"><g transform="translate(${BEDS[2] + 30} 150)">${LETTER}</g></g>
  <!-- nhãn -->
  <g class="e116-lb e116-lb-1820">${label(X.house, 50, '1820', '#B45309', 20)}</g>
  <g class="e116-lb e116-lb-rich">${label(X.house - 120, 90, 'a rich family', '#7C3AED', 14)}</g>
  <g class="e116-lb e116-lb-nurse">${label(X.house + 70, 54, 'a nurse', '#0369A1', 16)}</g>
  <g class="e116-lb e116-lb-1854">${label(X.board - 40, 22, '1854 · Crimea', '#B91C1C', 15)}</g>
  <g class="e116-lb e116-lb-38">${label(980, 66, '38 nurses', '#0369A1', 16)}</g>
  <g class="e116-lb e116-lb-scutari">${label(X.sea1[1] + 40, 56, 'Scutari', '#B45309', 16)}</g>
  <g class="e116-lb e116-lb-dirty">${label(1590, 56, 'dirty', '#78350F', 16)}</g>
  <g class="e116-lb e116-lb-rats">${label(1700, 56, 'rats!', '#57534E', 15)}</g>
  <g class="e116-lb e116-lb-first">${label(1720, 50, 'First', '#EA580C', 17)}</g>
  <g class="e116-lb e116-lb-then">${label(X.yard[0] + 160, 56, 'Then', '#EA580C', 17)}</g>
  <g class="e116-lb e116-lb-night">${label(1600, 46, 'At night', '#4338CA', 16)}</g>
  <g class="e116-lb e116-lb-lady">${label(1880, 52, 'the Lady with the Lamp', '#B45309', 15)}</g>
  <g class="e116-lb e116-lb-fin">${label(2900, 64, 'Finally', '#EA580C', 17)}</g>
  <g class="e116-lb e116-lb-eng">${label(3300, 70, 'England', '#1D4ED8', 15)}</g>
  <g class="e116-lb e116-lb-1860">${label(3590, 64, '1860 · London', '#B45309', 17)}</g>`;
}

const LBS = ['1820', 'rich', 'nurse', '1854', '38', 'scutari', 'dirty', 'rats', 'first', 'then', 'night', 'lady', 'fin', 'eng', '1860'];
const CSS = `
.e116-lb { opacity: 0; transition: opacity .35s; }
${LBS.map((k) => `.st-lb-${k} .e116-lb-${k}`).join(', ')} { opacity: 1; }
.e116-bub { opacity: 0; transform: scale(.4); transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.e116-bub1 { transform-origin: 318px 128px; } .e116-bub2 { transform-origin: 568px 130px; }
.st-bub1 .e116-bub1, .st-bub2 .e116-bub2 { opacity: 1; transform: none; }
.e116-care { opacity: 0; transition: opacity .3s .6s; } .st-bub1 .e116-care { opacity: 1; }
.e116-apf, .e116-aps { display: none; }
.pp-front .e116-apf, .pp-side .e116-aps { display: inline; }
.e116-news { transform-box: fill-box; transform-origin: 50% 50%; }
.st-lb-1854 .e116-news { animation: e116Pulse .35s ease-in-out 4 alternate; }
@keyframes e116Pulse { to { transform: scale(1.12); } }
.e116-bob { animation: e116Bob 1.6s ease-in-out infinite alternate; }
@keyframes e116Bob { from { transform: translateY(0) rotate(-.6deg); } to { transform: translateY(3px) rotate(.6deg); } }
.e116-smoke circle { animation: e116Smoke 1.6s ease-out infinite; transform-box: fill-box; transform-origin: center; }
@keyframes e116Smoke { from { transform: translate(0, 6px) scale(.6); opacity: 0; } 30% { opacity: .9; } to { transform: translate(-10px, -12px) scale(1.2); opacity: 0; } }
.e116-paddle { transform-box: fill-box; transform-origin: center; }
.es-thing.is-walk .e116-paddle { animation: e116Spin .8s linear infinite; }
@keyframes e116Spin { to { transform: rotate(360deg); } }
.e116-crew { opacity: 0; transition: opacity .3s; }
.e116-on .e116-crew { opacity: 1; }
.es-thing.is-walk .e116-rl1 { animation: e116Leg .12s linear infinite alternate; }
.es-thing.is-walk .e116-rl2 { animation: e116Leg .12s linear infinite alternate-reverse; }
@keyframes e116Leg { from { transform: translateX(-2px); } to { transform: translateX(2px); } }
.es-thing.is-walk .e116-ratb { animation: e116Scurry .12s linear infinite alternate; }
@keyframes e116Scurry { to { transform: translateY(-1.6px); } }
.e116-rtail { transform-box: fill-box; transform-origin: 100% 0; animation: e116Tail .5s ease-in-out infinite alternate; }
@keyframes e116Tail { from { transform: rotate(-10deg); } to { transform: rotate(12deg); } }
.e116-d { transition: opacity .6s; }
.st-clean1 .e116-d0, .st-clean2 .e116-d1, .st-clean3 .e116-d2, .st-clean4 .e116-d3 { opacity: 0; }
.e116-sheet { opacity: 0; transform: translateY(-10px); transition: opacity .3s, transform .35s; }
.st-sh0 .e116-sh0, .st-sh1 .e116-sh1, .st-sh2 .e116-sh2 { opacity: 1; transform: none; }
.e116-flap { animation: e116Flap 1.4s ease-in-out infinite alternate; }
@keyframes e116Flap { from { transform: skewX(-4deg); } to { transform: skewX(5deg); } }
.e116-suds, .e116-steam, .e116-fire { opacity: 0; transition: opacity .4s; }
.st-wash .e116-suds, .st-cook .e116-steam, .st-cook .e116-fire { opacity: 1; }
.st-wash .e116-suds { animation: e116Suds .5s ease-in-out infinite alternate; }
@keyframes e116Suds { to { transform: translateY(-3px); } }
.st-cook .e116-fire { animation: e116Fire .3s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes e116Fire { to { transform: scaleY(1.25); } }
.e116-night { opacity: 0; transition: opacity .8s; pointer-events: none; }
.st-night .e116-night { opacity: .58; }
.e116-moon { opacity: 0; transition: opacity .8s; } .st-night .e116-moon { opacity: 1; }
.e116-gl { opacity: 0; transition: opacity .5s; }
${BEDS.map((_, i) => `.st-night.st-gl${i} .e116-gl${i}`).join(', ')} { opacity: .85; }
.e116-joy { opacity: 0; transition: opacity .4s; }
.st-joy .e116-joy { opacity: 1; } .st-joy .e116-sad { opacity: 0; }
.e116-letter { opacity: 0; }
.st-letter .e116-letter { animation: e116Letter 1.4s ease-out both; }
@keyframes e116Letter { 0% { opacity: 0; transform: translateY(20px) scale(.5); } 30% { opacity: 1; transform: none; } 80% { opacity: 1; } 100% { opacity: 0; transform: translate(40px, -60px) scale(.8); } }
.e116-sign { transform-box: fill-box; transform-origin: 50% 50%; }
.st-sign .e116-sign { animation: e116Pulse .35s ease-in-out 4 alternate; }
.act-e116sweep .pp-upwR, .act-e116sweep .pp-upwL { animation: e116Sweep .3s ease-in-out infinite alternate; }
@keyframes e116Sweep { from { transform: rotate(-14deg); } to { transform: rotate(12deg); } }
.act-e116scrub .pp-upwR { animation: ppRub .22s ease-in-out infinite alternate; }
.act-e116scrub .pp-upwL { animation: ppRub .22s ease-in-out infinite alternate-reverse; }
@media (prefers-reduced-motion: reduce) {
  .e116-bob, .e116-flap { animation-duration: 3s; } .e116-rtail { animation-duration: 1.2s; }
  .act-e116sweep .pp-upwR, .act-e116sweep .pp-upwL, .act-e116scrub .pp-upwR, .act-e116scrub .pp-upwL { animation-duration: .7s; }
  .es-thing.is-walk .e116-rl1, .es-thing.is-walk .e116-rl2, .es-thing.is-walk .e116-ratb { animation-duration: .4s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const lb = (st, k, on = true) => st.set(`st-lb-${k}`, on);
const NURSES = ['n1', 'n2', 'n3'];
const crew = (st, on) => st.a('ship').el.classList.toggle('e116-on', on);
/** Mặc đồ y tá (tạp dề + váy dài khi đi). */
const nurseUp = (st, id, c) => { st.chest(id, APRON); longSkirt(st, id, c); };

const BEATS = [
  { key: ['born in 1820', 'a rich English family'], icon: '👶', label: 'born in 1820', async play(st) {
    st.look(X.house);
    st.sfx('birds', { vol: 0.5 });
    lb(st, '1820'); st.sfx('ding', { vol: 0.5 });
    await st.wait(700);
    st.chest('mum', BABY); st.pose('mum', 'e116_hold'); st.fx('hearts', X.house - 10, 150);
    st.mood('mum', 'joy'); st.mood('dad', 'joy');
    await st.wait(900);
    lb(st, 'rich'); st.sfx('pop', { vol: 0.5 });
    st.pose('dad', 'open');
    await st.wait(1400);
    st.pose('dad', 'stand');
  } },
  { key: ['wanted to help sick people', 'became a nurse'], icon: '🩺', label: 'became a nurse', async play(st) {
    off(st, 'st-lb-1820', 'st-lb-rich');
    st.look(X.house + 40);
    st.chest('mum', null); st.pose('mum', 'stand'); st.mood('mum', 'happy'); st.mood('dad', 'happy');
    st.fx('poof', X.house + 70, 200);
    st.show('flo', true);
    await st.wait(500);
    st.pose('flo', 'think'); st.set('st-bub1'); st.sfx('pop', { vol: 0.5 });
    await st.wait(1600);
    st.set('st-bub1', false);
    await st.dress('flo', 'e116_flo');
    nurseUp(st, 'flo', '#64748B');
    st.pose('flo', 'stand'); st.mood('flo', 'joy');
    lb(st, 'nurse'); st.sfx('ding', { vol: 0.5 });
    st.mood('mum', 'joy'); st.pose('dad', 'clap'); st.act('dad', 'clap'); st.sfx('clap', { vol: 0.4 });
    await st.wait(1000);
    st.act('dad', null); st.pose('dad', 'stand');
  } },
  { key: ['a war in Crimea', 'soldiers were hurt'], icon: '🤕', label: 'soldiers were hurt', async play(st) {
    lb(st, 'nurse', false); st.mood('flo', 'happy');
    st.look(X.board - 60, { dur: 2200 });
    await st.walk('flo', X.board - 62, { speed: 120, follow: false });
    st.pose('flo', 'reach');
    lb(st, '1854'); st.sfx('page-turn', { vol: 0.7 });
    await st.wait(800);
    st.pose('flo', 'stand'); st.face('flo', -1);
    st.set('st-bub2'); st.sfx('pop', { vol: 0.4 });
    await st.wait(500);
    st.sfx('cough', { vol: 0.35 });
    st.mood('flo', 'sad');
    await st.wait(1600);
  } },
  { key: ['a hospital in Scutari', 'thirty-eight nurses'], icon: '🚢', label: 'went to Scutari', async play(st) {
    off(st, 'st-bub2', 'st-lb-1854');
    st.mood('flo', 'happy');
    for (const id of NURSES) st.show(id, true);
    st.look(X.pier1 - 40);
    await Promise.all([
      st.walk('flo', X.pier1 + 10, { speed: 140, follow: false }),
      st.walk('n1', X.pier1 - 20, { speed: 140, follow: false }),
      st.walk('n2', X.pier1 - 50, { speed: 140, follow: false }),
      st.walk('n3', X.pier1 - 80, { speed: 140, follow: false }),
    ]);
    for (const id of ['flo', ...NURSES]) st.show(id, false);
    crew(st, true); st.sfx('boat-horn', { vol: 0.5 });
    lb(st, '38'); st.sfx('pop', { vol: 0.4 });
    await st.wait(300);
    await st.loop('river', () => st.walk('ship', X.sea1[1] - 140, { speed: 210, lead: 60 }), { vol: 0.6 });
    lb(st, '38', false);
    crew(st, false);
    st.place('flo', X.shore1 + 80, FLOOR, 1); st.place('n1', X.shore1 + 46, FLOOR, 1); st.place('n2', X.shore1 + 14, FLOOR, 1); st.place('n3', X.shore1 - 18, FLOOR, 1);
    for (const id of ['flo', ...NURSES]) st.show(id, true);
    lb(st, 'scutari'); st.sfx('ding', { vol: 0.5 });
    st.pose('flo', 'pointUp');
    await st.wait(900);
    st.pose('flo', 'stand');
  } },
  { key: ['The hospital was dirty', 'rats everywhere'], icon: '🐀', label: 'dirty · rats', async play(st) {
    lb(st, 'scutari', false);
    st.look(1640, { dur: 2400 });
    st.sfx('door-open', { vol: 0.5 });
    await Promise.all([
      st.walk('flo', 1640, { speed: 150, follow: false }),
      st.walk('n1', 1590, { speed: 150, follow: false }),
      st.walk('n2', 1540, { speed: 150, follow: false }),
      st.walk('n3', 1500, { speed: 150, follow: false }),
    ]);
    lb(st, 'dirty'); st.sfx('buzz-no', { vol: 0.35 });
    for (const id of ['flo', ...NURSES]) st.mood(id, 'wow');
    await st.wait(600);
    st.show('rat1', true); st.show('rat2', true);
    lb(st, 'rats'); st.sfx('tick', { vol: 0.6, rate: 1.8 });
    const r1 = st.walk('rat1', 1520, { speed: 230, follow: false });
    const r2 = st.walk('rat2', 1900, { speed: 200, follow: false });
    st.act('n2', 'shiver'); st.act('flo', 'no');
    await st.wait(500); st.sfx('tick', { vol: 0.5, rate: 2 });
    await Promise.all([r1, r2]);
    st.act('n2', null); st.act('flo', null);
  } },
  { key: ['First', 'cleaned the rooms'], icon: '🧹', label: 'cleaned the rooms', async play(st) {
    off(st, 'st-lb-dirty', 'st-lb-rats');
    st.look(1720);
    lb(st, 'first'); st.sfx('ding', { vol: 0.4 });
    const spots = [['flo', 1700], ['n1', 1820], ['n2', 1590], ['n3', 1960]];
    await Promise.all(spots.map(([id, x]) => st.walk(id, x, { speed: 150, follow: false })));
    for (const [id] of spots) { st.mood(id, 'happy'); st.hold(id, 'e116_broom'); st.pose(id, 'e116_sweep'); st.act(id, 'e116sweep'); }
    st.face('n2', -1);
    await st.loop('sweep', async () => {
      for (let i = 1; i <= 4; i++) { await st.wait(500); st.set(`st-clean${i}`); }
    }, { vol: 0.8 });
    const r1 = st.walk('rat1', 1380, { speed: 260, follow: false });
    const r2 = st.walk('rat2', 2300, { speed: 260, follow: false });
    st.sfx('tick', { vol: 0.5, rate: 1.8 });
    await Promise.all([r1, r2]);
    st.show('rat1', false); st.show('rat2', false);
    for (const [id] of spots) { st.act(id, null); st.hold(id, null); st.pose(id, 'stand'); }
    st.sfx('sparkle', { vol: 0.4 });
  } },
  { key: ['washed the sheets', 'cooked good food'], icon: '🧺', label: 'washed · cooked', async play(st) {
    lb(st, 'first', false);
    st.look(X.yard[0] + 150, { dur: 2200 });
    lb(st, 'then'); st.sfx('ding', { vol: 0.4 });
    await Promise.all([
      st.walk('n1', X.yard[0] + 30, { speed: 170, follow: false }),
      st.walk('n2', X.yard[0] + 112, { speed: 170, follow: false }),
      st.walk('n3', X.yard[0] + 210, { speed: 170, follow: false }),
      st.walk('flo', X.yard[0] + 296, { speed: 170, follow: false }),
    ]);
    st.face('n2', -1); st.face('flo', -1);
    st.set('st-wash'); st.pose('n1', 'e116_scrub'); st.act('n1', 'e116scrub'); st.pose('n2', 'e116_scrub'); st.act('n2', 'e116scrub');
    await st.loop('splash', () => st.wait(900), { vol: 0.6 });
    for (let i = 0; i < 3; i++) { st.set(`st-sh${i}`); st.sfx('wipe', { vol: 0.4, rate: 1 + i * 0.1 }); await st.wait(260); }
    st.act('n1', null); st.act('n2', null); st.pose('n1', 'stand'); st.pose('n2', 'stand');
    st.set('st-cook'); st.hold('flo', 'e116_ladle'); st.pose('flo', 'stir'); st.act('flo', 'stir');
    await st.loop('pot-stir', () => st.wait(1300), { vol: 0.8 });
    st.act('flo', null); st.hold('flo', null); st.pose('flo', 'stand'); st.mood('n3', 'joy');
  } },
  { key: ['At night', 'from bed to bed with a lamp'], icon: '🏮', label: 'with a lamp', async play(st) {
    off(st, 'st-lb-then', 'st-wash', 'st-cook');
    for (const id of NURSES) st.show(id, false);
    st.place('flo', BEDS[0] - 40, FLOOR, 1);
    st.look(BEDS[0] + 160, { instant: true });
    st.set('st-night'); lb(st, 'night'); st.sfx('crickets', { vol: 0.5 });
    st.hold('flo', 'e116_lampOn'); st.pose('flo', 'e116_lamp');
    await st.wait(500);
    for (let i = 0; i < BEDS.length; i++) {
      await st.walk('flo', BEDS[i] + 14, { speed: 120, lead: 60 });
      st.set(`st-gl${i}`);
      if (i === 1) lb(st, 'night', false);
      await st.wait(220);
    }
  } },
  { key: ['talked to the soldiers', 'wrote letters for them'], icon: '✉️', label: 'wrote letters', async play(st) {
    st.look(BEDS[2] + 30);
    await st.walk('flo', BEDS[2] + 64, { speed: 120, follow: false });
    st.face('flo', -1); st.pose('flo', 'e116_sitTalk'); st.hold('flo', 'e116_lampOn');
    st.talk('flo', true); st.sfx('hearts', { vol: 0.3 });
    await st.wait(1400);
    st.talk('flo', false);
    st.hold('flo', 'e116_pen'); st.chest('flo', APRON + PAPER); st.pose('flo', 'e116_write'); st.act('flo', 'write');
    await st.loop('pencil', () => st.wait(1400), { vol: 0.8 });
    st.act('flo', null);
    st.chest('flo', APRON); st.set('st-letter'); st.sfx('whoosh', { vol: 0.4 });
    await st.wait(1000);
  } },
  { key: ['the Lady with the Lamp'], icon: '💡', label: 'the Lady with the Lamp', async play(st) {
    st.set('st-letter', false);
    st.hold('flo', 'e116_lampOn'); st.pose('flo', 'e116_lamp');
    st.face('flo', 1);
    st.look(BEDS[2] + 40);
    BEDS.forEach((_, i) => st.set(`st-gl${i}`));
    await st.wait(400);
    st.set('st-joy'); st.sfx('giggle', { vol: 0.3 });
    await st.wait(500);
    lb(st, 'lady'); st.sfx('ding', { vol: 0.5 });
    st.fx('hearts', BEDS[2] + 64, 120);
    st.mood('flo', 'joy');
    await st.wait(1800);
  } },
  { key: ['Finally', 'went back to England'], icon: '⛵', label: 'back to England', async play(st) {
    off(st, 'st-lb-lady', 'st-night', ...BEDS.map((_, i) => `st-gl${i}`));
    st.hold('flo', null); st.pose('flo', 'stand'); st.mood('flo', 'happy');
    st.place('ship', X.pier2 + 120, SEA + 12, 1);
    st.look(X.yard[1] - 40, { instant: true });
    lb(st, 'fin'); st.sfx('ding', { vol: 0.4 });
    st.place('flo', X.yard[0] + 120, FLOOR, 1);
    await st.walk('flo', X.pier2 + 30, { speed: 170, lead: 80 });
    st.show('flo', false); crew(st, true); st.sfx('boat-horn', { vol: 0.5 });
    await st.loop('river', () => st.walk('ship', X.sea2[1] - 120, { speed: 220, lead: 70 }), { vol: 0.6 });
    crew(st, false);
    st.place('flo', X.sea2[1] + 30, FLOOR, 1); st.show('flo', true);
    lb(st, 'fin', false); lb(st, 'eng'); st.sfx('bump', { vol: 0.4 });
    st.mood('flo', 'joy');
    await st.wait(700);
  } },
  { key: ['In 1860', 'a school for nurses in London'], icon: '🏫', label: 'a school for nurses', async play(st) {
    lb(st, 'eng', false);
    st.look(X.door - 20, { dur: 1800 });
    await st.walk('flo', X.door - 60, { speed: 140, follow: false });
    st.face('flo', 1);
    lb(st, '1860'); st.set('st-sign'); st.sfx('school-bell', { vol: 0.4 });
    st.show('s1', true); st.show('s2', true);
    await Promise.all([
      st.walk('s1', X.door + 20, { speed: 130, follow: false }),
      st.walk('s2', X.door + 64, { speed: 130, follow: false }),
    ]);
    st.face('s1', -1); st.face('s2', -1);
    st.pose('flo', 'open'); st.mood('flo', 'joy');
    st.pose('s1', 'clap'); st.act('s1', 'clap'); st.pose('s2', 'clap'); st.act('s2', 'clap'); st.sfx('clap', { vol: 0.6 });
    st.mood('s1', 'joy'); st.mood('s2', 'joy');
    await st.wait(1300);
    for (const id of ['s1', 's2']) { st.act(id, null); st.pose(id, 'stand'); }
    st.pose('flo', 'stand');
  } },
];

export default {
  id: 'en116', worldW: W, floor: FLOOR, viewTop: 30, camStart: 20, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 3, 5, 7, 11],
  cast: [
    { id: 'ship', kind: 'thing', x: X.pier1 + 130, y: SEA + 12, s: 1, svg: SHIP, box: [-116, -150, 234, 154] },
    { id: 'dad', kind: 'adult', who: 'e116_dad', x: X.house - 90 },
    { id: 'mum', kind: 'adult', who: 'e116_mum', x: X.house - 34 },
    { id: 'flo', kind: 'adult', who: 'e116_lady', x: X.house + 64, face: -1 },
    { id: 'n3', kind: 'adult', who: 'e116_n3', x: X.pier1 - 150, s: 0.96 },
    { id: 'n2', kind: 'adult', who: 'e116_n2', x: X.pier1 - 120, s: 0.97 },
    { id: 'n1', kind: 'adult', who: 'e116_n1', x: X.pier1 - 90, s: 0.98 },
    { id: 's2', kind: 'adult', who: 'e116_st2', x: X.school[1] + 40, s: 0.95, face: -1 },
    { id: 's1', kind: 'adult', who: 'e116_st1', x: X.school[1] + 10, s: 0.95, face: -1 },
    { id: 'rat1', kind: 'thing', x: 2080, y: FLOOR + 6, s: 1.4, face: -1, svg: RAT, box: [-34, -20, 60, 22] },
    { id: 'rat2', kind: 'thing', x: 1560, y: FLOOR + 12, s: 1.4, svg: RAT, box: [-34, -20, 60, 22] },
  ],
  init(st) {
    for (const id of ['flo', 'n1', 'n2', 'n3', 's1', 's2', 'rat1', 'rat2']) st.show(id, false);
    longSkirt(st, 'mum', '#8B5CF6'); longSkirt(st, 'flo', '#60A5FA');
    nurseUp(st, 'n1', '#475569'); nurseUp(st, 'n2', '#57534E'); nurseUp(st, 'n3', '#475569');
    nurseUp(st, 's1', '#3B82F6'); nurseUp(st, 's2', '#2563EB');
  },
};
