/**
 * Bài 121 "The Trung Sisters" (was / were, quá khứ đơn). Một thế giới đi từ trái sang phải, cả đoạn ngày xưa nhuộm màu
 * ảnh cũ: làng quê (nhà sàn, ruộng lúa, dân cày buồn, Tô Định và lính phương Bắc tới lấy thúng lúa) → nhà Hai Bà ở Mê Linh
 * (trống đồng, cột cờ) → thành của Tô Định (tường đất, cổng gỗ, cờ phương Bắc) → đường về phương Bắc (biển "NORTH") →
 * hôm nay: phố Hai Bà Trưng, trường Hai Bà Trưng (có màu lại).
 * Phương Bắc ở bên phải: Tô Định và quân phương Bắc tới từ bên phải, chạy về bên phải. Trận đánh diễn tượng trưng: voi tiến,
 * cờ đổi, bụi tung; năm 43 chỉ thấy Hai Bà cưỡi voi dũng cảm đứng trước đoàn quân lớn.
 * Toạ độ cảnh: rộng 3000, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, speaker, thought } from '../kit.js';
import { stilt, karst, bamboo, paddy, drum, flag, crown } from './vietsu-art.js';

const FLOOR = 282;
const W = 3150;
const X = { house: 960, drum: 1110, pole: 1190, gate: 1800, sign: 2280, now: 2540, street: 2760, school: 2960 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e121_trac: { adult: true, hair: 'bun', top: 'robe', shirt: '#B91C1C', trimC: '#FACC15', bottom: 'pants', bottomC: '#7F1D1D', shoe: '#78350F', hat: 'scarf', trim: ['#FACC15', '#B91C1C', '#FDE68A'] },
  e121_nhi: { adult: true, hair: 'bun', top: 'robe', shirt: '#D97706', trimC: '#B91C1C', bottom: 'pants', bottomC: '#7C2D12', shoe: '#78350F', hat: 'scarf', trim: ['#B91C1C', '#FACC15', '#FDE68A'] },
  e121_todinh: { adult: true, hair: 'short', top: 'robe', shirt: '#1E3A8A', trimC: '#94A3B8', bottom: 'pants', bottomC: '#1E293B', shoe: '#111827', hat: 'envoy', beard: true, moustache: true },
  e121_guard: { adult: true, hair: 'short', top: 'blouse', shirt: '#475569', bottom: 'pants', bottomC: '#1E293B', shoe: '#111827', hat: 'skullcap', trim: ['#94A3B8'] },
  e121_f1: { adult: true, hair: 'bun', top: 'blouse', shirt: '#A47551', bottom: 'pants', bottomC: '#292524', shoe: '#57534E', hat: 'conical' },
  e121_f2: { adult: true, hair: 'short', top: 'blouse', shirt: '#8B5E3C', bottom: 'pants', bottomC: '#3F3A36', shoe: '#57534E', hat: 'conical' },
  e121_w1: { adult: true, hair: 'bun', top: 'blouse', shirt: '#7C2D12', bottom: 'pants', bottomC: '#1C1917', shoe: '#57534E', hat: 'scarf', trim: ['#B91C1C', '#FDE68A', '#FDE68A'] },
  e121_w2: { adult: true, hair: 'bun', top: 'blouse', shirt: '#4338CA', bottom: 'pants', bottomC: '#1C1917', shoe: '#57534E', hat: 'scarf', trim: ['#B91C1C', '#FDE68A', '#FDE68A'] },
  e121_m1: { adult: true, hair: 'short', top: 'blouse', shirt: '#92400E', bottom: 'pants', bottomC: '#292524', shoe: '#57534E', hat: 'scarf', trim: ['#B91C1C', '#FDE68A', '#FDE68A'] },
  e121_w3: { adult: true, hair: 'bun', top: 'blouse', shirt: '#065F46', bottom: 'pants', bottomC: '#1C1917', shoe: '#57534E', hat: 'scarf', trim: ['#B91C1C', '#FDE68A', '#FDE68A'] },
});
Object.assign(CAST, { e121_tracR: { ...CAST.e121_trac, hair: 'short' }, e121_nhiR: { ...CAST.e121_nhi, hair: 'short' } }); // người cưỡi voi: tóc búi gọn trong khăn

const PROPS = {
  e121_spear: `<g><path d="M0 -64 V34" stroke="${L}" stroke-width="3.6" stroke-linecap="round"/><path d="M0 -64 V34" stroke="#A16207" stroke-width="2"/>
    <path d="M0 34 l-3.4 2 l3.4 12 l3.4 -12Z" fill="#CBD5E1" stroke="${L}" stroke-width="0.7"/><path d="M-4 30 h8" stroke="#DC2626" stroke-width="3"/></g>`,
  e121_stick: `<g><path d="M0 -4 V22" stroke="${L}" stroke-width="3.4" stroke-linecap="round"/><path d="M0 -4 V22" stroke="#D97706" stroke-width="2"/><circle cy="23" r="3.6" fill="#B91C1C" stroke="${L}" stroke-width="0.7"/></g>`,
};
const POSES = {
  e121_hit: { R: [150, 200], L: [10, 4] },
  e121_down: { R: [70, 20], L: [10, 4] },
  e121_guard: { R: [18, 8], L: [10, 4] },
  e121_bow: { R: [14, 6], L: [14, 6], head: 16 },
};

// ── Voi (gốc = giữa chân, nhìn sang phải), trên bành có một người cưỡi ─────────────────────────────
const EL = '#9CA3AF', ELD = '#7B8494';
const eleLeg = (x, far, cls) => `<g class="${cls}" style="transform-origin:${x}px -60px"><rect x="${x - 12}" y="-64" width="24" height="64" rx="9" fill="${far ? ELD : EL}" stroke="${L}"/>
  <path d="M${x - 7} -3 h4 M${x + 3} -3 h4" stroke="#F1F5F9" stroke-width="2.2" stroke-linecap="round"/></g>`;
const rider = (who, shirt) => `<g transform="translate(-6 -150) scale(1.2) translate(0 4)"><path d="M-12 0 Q-13 -30 0 -32 Q13 -30 12 0Z" fill="${shirt}" stroke="${L}" stroke-width="1"/>
  <path d="M-5 -30 L0 -20 L5 -30" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/>
  <g class="e121-arm" style="transform-origin:6px -24px"><path d="M6 -24 L24 -38" stroke="${L}" stroke-width="7" stroke-linecap="round"/><path d="M6 -24 L24 -38" stroke="${shirt}" stroke-width="5" stroke-linecap="round"/>
    <path d="M26 -16 L23 -76" stroke="#78350F" stroke-width="2.6"/><path d="M23 -75 H50 L44 -67 L50 -59 H24Z" fill="#DC2626" stroke="${L}" stroke-width="0.8"/><path d="M24 -71 H46" stroke="#FACC15" stroke-width="1.6"/>
    <circle cx="24" cy="-38" r="3.8" fill="#F5C9A0" stroke="${L}" stroke-width="0.8"/></g>
  <g transform="translate(1 -46)">${headOnly(who, { s: 0.72, mood: 'happy' })}</g></g>`;
const ELEPHANT = (who, shirt, cloth) => `<g>
  ${eleLeg(-50, true, 'e121-lB')}${eleLeg(42, true, 'e121-lA')}
  <g class="e121-tail" style="transform-origin:-86px -100px"><path d="M-86 -100 Q-100 -84 -94 -62" stroke="${L}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-86 -100 Q-100 -84 -94 -62" stroke="${EL}" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  <ellipse cx="-4" cy="-96" rx="88" ry="54" fill="${EL}" stroke="${L}" stroke-width="1.4"/>
  ${eleLeg(-34, false, 'e121-lA')}${eleLeg(60, false, 'e121-lB')}
  <path d="M-62 -142 Q-6 -158 46 -142 L50 -96 Q-6 -84 -66 -96Z" fill="${cloth}" stroke="${L}" stroke-width="1.2"/>
  <path d="M-64 -104 Q-6 -92 48 -104" stroke="#FACC15" stroke-width="3" fill="none"/>${[-50, -26, -2, 22, 42].map((x) => `<path d="M${x} -96 l4 10 l4 -10" fill="#FACC15" stroke="${L}" stroke-width="0.6"/>`).join('')}
  <rect x="-36" y="-156" width="56" height="16" rx="3" fill="#B45309" stroke="${L}"/>
  ${rider(who, shirt)}
  <g class="e121-trunk" style="transform-origin:104px -100px"><path d="M98 -112 Q124 -94 118 -52 Q114 -26 128 -18" stroke="${L}" stroke-width="19" fill="none" stroke-linecap="round"/>
    <path d="M98 -112 Q124 -94 118 -52 Q114 -26 128 -18" stroke="${EL}" stroke-width="16.4" fill="none" stroke-linecap="round"/>
    <path d="M110 -66 h12 M108 -52 h11 M112 -38 h10" stroke="${ELD}" stroke-width="1.4"/></g>
  <circle cx="80" cy="-114" r="38" fill="${EL}" stroke="${L}" stroke-width="1.4"/>
  <path d="M98 -90 Q110 -76 124 -82 Q112 -86 106 -96Z" fill="#FFFBEB" stroke="${L}"/>
  <g class="e121-ear" style="transform-origin:70px -112px"><path d="M70 -146 Q30 -150 28 -110 Q30 -70 70 -78Z" fill="#A5B4C8" stroke="${L}" stroke-width="1.4"/></g>
  <path d="M62 -150 Q80 -162 98 -150 L94 -140 H66Z" fill="${cloth}" stroke="${L}" stroke-width="0.9"/>
  <ellipse cx="96" cy="-122" rx="3.4" ry="4.4" fill="#2B1D16"/><circle cx="97" cy="-124" r="1.2" fill="#fff"/></g>`;

// ── Đoàn quân phương Bắc (gốc = giữa đáy, nhìn sang trái), một khối xám xanh ─────────────────────────
const soldier = (x, i) => `<g transform="translate(${x} 0)"><g class="${i % 2 ? 'e121-sA' : 'e121-sB'}">
  <rect x="-9" y="-30" width="7" height="30" fill="#1E293B" stroke="${L}" stroke-width="0.7"/><rect x="2" y="-30" width="7" height="30" fill="#1E293B" stroke="${L}" stroke-width="0.7"/></g>
  <path d="M-14 -30 Q-15 -72 0 -76 Q15 -72 14 -30Z" fill="#334155" stroke="${L}" stroke-width="0.9"/><path d="M-14 -50 H14" stroke="#64748B" stroke-width="3"/>
  <circle cy="-86" r="11" fill="#E8C4A0" stroke="${L}" stroke-width="0.9"/><path d="M-12 -88 Q0 -106 12 -88 L14 -84 H-14Z" fill="#64748B" stroke="${L}" stroke-width="0.9"/><path d="M0 -104 v-8" stroke="#DC2626" stroke-width="2.4"/>
  <circle cx="-5" cy="-86" r="1.3" fill="#2B1D16"/>
  <path d="M-16 -62 V-150" stroke="#57534E" stroke-width="2.4"/><path d="M-16 -150 l-4 -12 l4 -4 l4 4Z" fill="#CBD5E1" stroke="${L}" stroke-width="0.6"/></g>`;
const ARMY = `<g>${[150, 110, 70, 30, -10, -50, -90, -130].map((x, i) => `<g transform="translate(14 -14) scale(0.9)">${soldier(x, i + 1)}</g>`).join('')}${[160, 120, 80, 40, 0, -40, -80, -120, -160].map((x, i) => soldier(x, i)).join('')}
  ${[100, -60].map((x) => `<g transform="translate(${x} 0)"><path d="M0 -60 V-190" stroke="#57534E" stroke-width="3"/><g class="e121-aflag" style="transform-origin:0px -180px"><path d="M0 -190 H-46 L-38 -176 L-46 -162 H0Z" fill="#1E3A8A" stroke="${L}" stroke-width="0.9"/></g></g>`).join('')}</g>`;

const BASKET = `<path d="M-14 -8 H14 L10 8 H-10Z" fill="#D6A35C" stroke="${L}" stroke-width="1"/><path d="M-12 -4 H12 M-11 2 H11" stroke="#A16207" stroke-width="0.9"/>
  <ellipse cy="-9" rx="13" ry="5" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>${[-6, 0, 6].map((x) => `<circle cx="${x}" cy="-11" r="1.6" fill="#EAB308"/>`).join('')}`;
const DUST = `<g fill="#E7D7B8" stroke="${L}" stroke-width="0.8">${[[-24, -10, 16], [0, -22, 20], [24, -8, 15], [-8, 2, 12]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>`;

// ── Cảnh ──────────────────────────────────────────────────────────────────
function bg() {
  const wall = (a, b) => `<path d="M${a} ${FLOOR} V${FLOOR - 92} ${Array.from({ length: Math.floor((b - a) / 30) }, (_, i) => `H${a + i * 30 + 14} V${FLOOR - 104} H${a + i * 30 + 26} V${FLOOR - 92}`).join(' ')} H${b} V${FLOOR}Z" fill="#C8A27A" stroke="${L}" stroke-width="1.2"/>
    ${Array.from({ length: Math.floor((b - a) / 50) }, (_, i) => `<path d="M${a + 10 + i * 50} ${FLOOR - 60} h24 M${a + 30 + i * 50} ${FLOOR - 30} h22" stroke="#A47E58" stroke-width="1.4"/>`).join('')}`;
  return `
  ${sky(0, W, 315, 'e121sky')}
  ${cloud(240, 60, 0.8, 0)}${cloud(820, 50, 0.9, 2)}${cloud(1400, 64, 0.8, 4)}${cloud(2100, 48, 0.9, 1)}${cloud(2700, 60, 0.8, 3)}
  ${karst(-20, 760, FLOOR - 40)}${karst(1200, 900, FLOOR - 50, '#94A3B8', '#A8B4C4')}${karst(2050, 420, FLOOR - 40)}
  <g class="e121-gloom"><g transform="translate(400 70)"><ellipse rx="70" ry="22" fill="#64748B" opacity="0.75"/><ellipse cx="-36" cy="-12" rx="34" ry="18" fill="#64748B" opacity="0.75"/><ellipse cx="30" cy="-14" rx="40" ry="20" fill="#64748B" opacity="0.75"/></g></g>
  <!-- làng: đất, ruộng, nhà sàn, tre -->
  <rect x="0" y="${FLOOR}" width="${X.now - 20}" height="33" fill="#C9A86B" stroke="${L}"/>
  ${paddy(190, 440, FLOOR - 16, 18)}
  ${stilt(90, FLOOR, 0.8)}${bamboo(690, FLOOR, 0.9)}
  <!-- nhà Hai Bà ở Mê Linh -->
  ${bamboo(800, FLOOR, 0.8)}${stilt(X.house, FLOOR, 1.08, '#E2B872', '#B7791F')}
  ${drum(X.drum, FLOOR, 1, 'e121')}
  <g transform="translate(${X.pole} ${FLOOR})"><path d="M0 0 V-170" stroke="#78350F" stroke-width="4"/><circle cy="-172" r="4" fill="#FACC15" stroke="${L}" stroke-width="0.7"/>
    <g class="e121-rise"><g class="e121-flag" style="transform-origin:0px -150px"><path d="M2 -166 H64 L54 -148 L64 -130 H2Z" fill="#DC2626" stroke="${L}" stroke-width="1"/><path d="M2 -160 H56" stroke="#FACC15" stroke-width="2.4"/>
      <circle cx="26" cy="-146" r="6" fill="#FACC15" stroke="${L}" stroke-width="0.6"/></g></g></g>
  ${tree(1300, FLOOR, 0.9, '')}${bamboo(1420, FLOOR, 0.85)}
  <!-- thành của Tô Định -->
  ${wall(1520, X.gate - 40)}${wall(X.gate + 40, 2120)}
  <g transform="translate(${X.gate} ${FLOOR})"><rect x="-48" y="-150" width="96" height="150" fill="#B08968" stroke="${L}" stroke-width="1.2"/>
    <path d="M-60 -150 L-40 -178 H40 L60 -150Z" fill="#7C2D12" stroke="${L}" stroke-width="1.2"/><path d="M-40 -178 Q-48 -190 -56 -186 M40 -178 Q48 -190 56 -186" stroke="${L}" stroke-width="2" fill="none"/>
    <path d="M-30 0 V-70 Q0 -96 30 -70 V0Z" fill="#5B3A1E" stroke="${L}" stroke-width="1.2"/><path d="M0 -88 V0" stroke="${L}" stroke-width="1"/>
    <path d="M0 -178 V-250" stroke="#57534E" stroke-width="3"/>
    <g class="e121-nflag"><g class="e121-flag" style="transform-origin:0px -240px"><path d="M2 -250 H50 L42 -237 L50 -224 H2Z" fill="#1E3A8A" stroke="${L}" stroke-width="0.9"/></g></g>
    <g class="e121-tflag"><g class="e121-flag" style="transform-origin:0px -240px"><path d="M2 -250 H56 L47 -236 L56 -222 H2Z" fill="#DC2626" stroke="${L}" stroke-width="0.9"/><path d="M2 -245 H50" stroke="#FACC15" stroke-width="2.2"/></g></g></g>
  <!-- đường về phương Bắc -->
  ${tree(2180, FLOOR, 0.8, '')}
  <g transform="translate(${X.sign} ${FLOOR})"><path d="M0 0 V-74" stroke="#78350F" stroke-width="4"/><g class="e121-nsign"><path d="M-36 -94 H30 L44 -80 L30 -66 H-36Z" fill="#FEF3C7" stroke="${L}" stroke-width="1.2"/>
    <text x="0" y="-74" text-anchor="middle" ${NUN} font-size="14" fill="#1E3A8A">NORTH</text></g></g>
  <!-- màu ảnh cũ (ngày xưa) -->
  <rect class="e121-tint" x="0" y="0" width="${X.now - 20}" height="315" fill="#B45309"/>
  <rect class="e121-dark" x="1300" y="0" width="${X.now - 1320}" height="315" fill="#1E1B4B"/>
  <!-- hôm nay: phố, trường -->
  <rect x="${X.now - 20}" y="0" width="${W - X.now + 20}" height="${FLOOR}" fill="#BAE6FD" opacity="0.4"/>
  ${tree(2620, FLOOR, 0.9)}
  <g transform="translate(${X.school} ${FLOOR})"><rect x="-130" y="-170" width="260" height="170" fill="#FDE68A" stroke="${L}" stroke-width="1.3"/>
    <path d="M-144 -170 L0 -214 L144 -170Z" fill="#EF4444" stroke="${L}" stroke-width="1.3"/>
    ${[-96, -56, 56, 96].map((dx) => `<rect x="${dx - 14}" y="-130" width="28" height="30" fill="#BAE6FD" stroke="${L}"/>`).join('')}
    <rect x="-22" y="-74" width="44" height="74" rx="4" fill="#B45309" stroke="${L}"/>
    <g class="e121-sch"><rect x="-94" y="-166" width="188" height="26" rx="5" fill="#fff" stroke="${L}"/><text x="0" y="-147" text-anchor="middle" ${NUN} font-size="13" fill="#B91C1C">HAI BA TRUNG SCHOOL</text></g>
    <path d="M120 -170 V-250" stroke="#78716C" stroke-width="3"/><g class="ek-flag" style="transform-origin:120px -239px"><rect x="120" y="-250" width="34" height="22" fill="#DA251D"/><path d="M137 -246 l2 5.6 h6 l-4.8 3.6 l1.9 5.8 l-5.1 -3.6 l-5.1 3.6 l1.9 -5.8 l-4.8 -3.6 h6Z" fill="#FFFF00"/></g></g>
  <rect x="${X.now - 20}" y="${FLOOR}" width="${W - X.now + 20}" height="12" fill="#E5E7EB" stroke="${L}"/><rect x="${X.now - 20}" y="${FLOOR + 12}" width="${W - X.now + 20}" height="21" fill="#64748B"/>
  ${Array.from({ length: 8 }, (_, i) => `<rect x="${X.now + i * 66}" y="${FLOOR + 20}" width="30" height="4" rx="2" fill="#F8FAFC"/>`).join('')}`;
}

function fg() {
  const MAP = `<rect x="-50" y="-28" width="100" height="56" rx="3" fill="#FEF3C7" stroke="${L}" stroke-width="0.9"/>
    <path d="M-38 16 l8 -12 l8 12 Z M-24 18 l6 -9 l6 9Z" fill="#86A79A" stroke="${L}" stroke-width="0.6"/>
    <g transform="translate(26 -6)"><rect x="-14" y="-10" width="28" height="20" fill="#C8A27A" stroke="${L}" stroke-width="0.8"/><path d="M-14 -10 h5 v-4 h4 v4 h5 v-4 h4 v4 h4" stroke="${L}" stroke-width="0.8" fill="none"/></g>
    <g class="e121-plan"><path d="M-30 4 Q-6 -24 8 -6" stroke="#DC2626" stroke-width="2.6" fill="none" stroke-dasharray="5 4"/><path d="M4 -12 L10 -4 L1 -3Z" fill="#DC2626"/></g>`;
  const LB = [
    ['ago', 250, 54, '2000 years ago', '#9A3412', 16], ['free', 380, 120, 'not free', '#475569', 15], ['north', 520, 60, 'from the north →', '#1E3A8A', 15],
    ['melinh', X.house, 50, 'Me Linh', '#B45309', 18], ['brave', 1050, 60, 'brave', '#DC2626', 16], ['y40', 1000, 50, 'In the year 40', '#B91C1C', 17],
    ['women', 850, 60, 'women soldiers', '#B91C1C', 15], ['won', 1580, 50, 'won!', '#16A34A', 20], ['queen', 1700, 50, 'Queen', '#B45309', 18],
    ['later', 1900, 50, 'Two years later', '#1E3A8A', 16], ['y43', 1900, 50, 'until the year 43', '#B91C1C', 16], ['today', 2720, 54, 'Today', '#16A34A', 18],
  ];
  return `
  ${bush(30, FLOOR + 26, 0.6, '#65A30D')}${bush(1250, FLOOR + 28, 0.7, '#65A30D')}${bush(2420, FLOOR + 28, 0.6, '#65A30D')}
  <!-- biển tên phố hôm nay -->
  <g transform="translate(${X.street} ${FLOOR})"><path d="M0 0 V-120" stroke="#475569" stroke-width="4"/>
    <g class="e121-st"><rect x="-86" y="-150" width="172" height="30" rx="4" fill="#1D4ED8" stroke="#fff" stroke-width="2"/><text x="0" y="-129" text-anchor="middle" ${NUN} font-size="12" fill="#fff">HAI BA TRUNG STREET</text></g></g>
  <g class="e121-nm e121-nm-td">${speaker(540, 100, 'To Dinh', '#1E3A8A')}</g>
  <g class="e121-nm e121-nm-tr">${speaker(918, 100, 'Trung Trac', '#B91C1C')}</g>
  <g class="e121-nm e121-nm-nh">${speaker(1030, 100, 'Trung Nhi', '#C2410C')}</g>
  ${thought(830, 100, 140, 104, `<g transform="translate(0 -8)">${MAP}</g><g class="e121-lb e121-lb-clever"><text y="38" text-anchor="middle" ${NUN} font-size="15" fill="#1D4ED8">clever</text></g>`, [904, 126], 'e121-think')}
  ${LB.map(([k, x, y, t, c, s]) => `<g class="e121-lb e121-lb-${k}">${label(x, y, t, c, s)}</g>`).join('')}`;
}

const CSS = `
.e121-lb, .e121-nm { opacity: 0; transition: opacity .35s; }
${['ago', 'free', 'north', 'melinh', 'brave', 'clever', 'y40', 'women', 'won', 'queen', 'later', 'y43', 'today'].map((k) => `.st-lb-${k} .e121-lb-${k}`).join(', ')} { opacity: 1; }
.st-nm-td .e121-nm-td, .st-nm-tr .e121-nm-tr, .st-nm-nh .e121-nm-nh { opacity: 1; }
.e121-tint { opacity: 0; transition: opacity .8s; pointer-events: none; }
.st-past .e121-tint { opacity: .2; }
.e121-dark { opacity: 0; transition: opacity 1s; pointer-events: none; }
.st-dark .e121-dark { opacity: .22; }
.e121-gloom { opacity: 0; transition: opacity .8s; }
.st-gloom .e121-gloom { opacity: 1; }
.e121-flag { animation: e121Flag 1.3s ease-in-out infinite alternate; }
@keyframes e121Flag { from { transform: skewY(-3deg) scaleX(.94); } to { transform: skewY(3deg) scaleX(1.02); } }
.e121-rise { transform: translateY(120px); transition: transform 1.2s cubic-bezier(.3,1.2,.6,1); }
.st-flag .e121-rise { transform: none; }
.e121-nflag, .e121-tflag { transition: transform .8s, opacity .5s; }
.e121-tflag { opacity: 0; transform: translateY(70px); }
.st-win .e121-nflag { opacity: 0; transform: translateY(70px); }
.st-win .e121-tflag { opacity: 1; transform: none; transition-delay: .5s; }
.e121-drum { transform-box: fill-box; transform-origin: 50% 100%; }
.st-boom .e121-drum { animation: e121Boom .3s ease-out; }
@keyframes e121Boom { 40% { transform: scale(1.08, .94); } }
.e121-think { opacity: 0; transform: scale(.4); transform-origin: 904px 126px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-think .e121-think { opacity: 1; transform: none; }
.e121-plan { clip-path: inset(0 100% 0 0); }
.st-think .e121-plan { clip-path: inset(0 0 0 0); transition: clip-path 1.4s linear .5s; }
.e121-nsign { transform-box: fill-box; transform-origin: 50% 50%; }
.st-lb-north .e121-nsign, .st-run .e121-nsign { animation: e121Pulse .35s ease-in-out 4 alternate; }
@keyframes e121Pulse { to { transform: scale(1.2); } }
.e121-st, .e121-sch { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: 50% 100%; transition: opacity .25s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-st .e121-st, .st-sch .e121-sch { opacity: 1; transform: none; }
.is-walk .e121-lA { animation: e121Leg .32s ease-in-out infinite alternate; }
.is-walk .e121-lB { animation: e121Leg .32s ease-in-out infinite alternate-reverse; }
@keyframes e121Leg { from { transform: rotate(-9deg); } to { transform: rotate(9deg); } }
.is-walk .e121-sA { animation: e121Step .25s ease-in-out infinite alternate; }
.is-walk .e121-sB { animation: e121Step .25s ease-in-out infinite alternate-reverse; }
@keyframes e121Step { to { transform: translateY(-4px); } }
.e121-ear { animation: e121Ear 2.4s ease-in-out infinite alternate; }
@keyframes e121Ear { to { transform: rotate(-7deg); } }
.e121-tail { animation: e121Ear 1.6s ease-in-out infinite alternate; }
.act-e121trump .e121-trunk { animation: e121Trump .9s ease-in-out 2 alternate; }
@keyframes e121Trump { to { transform: rotate(-58deg); } }
.e121-arm { transition: transform .3s; }
.act-e121trump .e121-arm, .act-e121wave .e121-arm { animation: e121Wave .35s ease-in-out infinite alternate; }
@keyframes e121Wave { from { transform: rotate(-8deg); } to { transform: rotate(14deg); } }
.e121-aflag { animation: e121Flag 1s ease-in-out infinite alternate; }
@media (prefers-reduced-motion: reduce) {
  .is-walk .e121-lA, .is-walk .e121-lB { animation-duration: .7s; }
  .e121-flag, .e121-aflag, .e121-ear, .e121-tail { animation-duration: 3s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const VILL = ['w1', 'w2', 'm1', 'w3'];
const drumHit = async (st, n) => {
  for (let i = 0; i < n; i++) {
    st.pose('trac', 'e121_hit'); await st.wait(240);
    st.pose('trac', 'e121_down'); st.set('st-boom'); st.sfx('bump', { vol: 0.9, rate: 0.7 }); await st.wait(260); st.set('st-boom', false);
  }
};
/** Hai Bà lên voi (hoặc xuống voi) tại chỗ, kèm làn khói. */
const mount = async (st, on) => {
  for (const [p, e] of [['trac', 'ele1'], ['nhi', 'ele2']]) {
    const A = st.a(on ? p : e);
    st.place(on ? e : p, A.x, null, A.face);
    st.fx('poof', A.x, FLOOR - 90, { quiet: true });
  }
  st.sfx('poof', { vol: 0.6 });
  await st.wait(160);
  for (const [p, e] of [['trac', 'ele1'], ['nhi', 'ele2']]) { st.show(p, !on); st.show(e, on); }
};

const BEATS = [
  { key: ['About two thousand years ago', 'was not free'], icon: '⏳', label: 'not free', async play(st) {
    st.look(300);
    st.set('st-past'); st.set('st-lb-ago'); st.sfx('page-turn', { vol: 0.6 });
    for (const id of ['f1', 'f2']) { st.pose(id, 'plant'); st.act(id, 'dig'); }
    await st.wait(1300);
    st.set('st-lb-ago', false); st.set('st-gloom'); st.set('st-lb-free'); st.sfx('wind', { vol: 0.5 });
    for (const id of ['f1', 'f2']) { st.act(id, null); st.pose(id, 'sad'); st.mood(id, 'sad'); }
    await st.wait(1500);
  } },
  { key: ['Rulers from the north', 'To Dinh', 'was very cruel'], icon: '😠', label: 'To Dinh', async play(st) {
    off(st, 'st-lb-free', 'st-lb-ago');
    st.look(450);
    st.set('st-lb-north');
    await Promise.all([st.walk('todinh', 540, { speed: 110, follow: false }), st.walk('guard', 610, { speed: 110, follow: false, after: 'e121_guard' })]);
    st.set('st-lb-north', false); st.set('st-nm-td');
    st.face('todinh', -1); st.pose('todinh', 'hips'); st.act('todinh', 'no'); st.sfx('buzz-no', { vol: 0.5 });
    st.mood('f2', 'wow'); st.face('f2', 1);
    await st.wait(700);
    st.act('todinh', null); st.pose('todinh', 'point'); st.sfx('whoosh', { vol: 0.5 });
    await st.fly(BASKET, [450, FLOOR - 60], [610, FLOOR - 80], { size: 30, dur: 650 });
    st.hold('guard', null); st.pose('guard', 'carry'); st.chest('guard', `<g transform="translate(0 6)">${BASKET}</g>`);
    st.mood('f2', 'cry'); st.mood('f1', 'cry'); st.sfx('drip', { vol: 0.4 });
    await st.wait(1200);
    st.pose('todinh', 'hips');
  } },
  { key: ['Trung Trac and Trung Nhi', 'two sisters from Me Linh'], icon: '👭', label: 'two sisters', async play(st) {
    off(st, 'st-nm-td', 'st-gloom');
    for (const id of ['todinh', 'guard']) st.show(id, false);
    st.look(X.house);
    st.set('st-lb-melinh'); st.sfx('birds', { vol: 0.5 });
    await st.wait(700);
    st.set('st-nm-tr'); st.mood('trac', 'joy'); st.pose('trac', 'wave'); st.act('trac', 'wave'); st.sfx('ding', { vol: 0.4 });
    await st.wait(800);
    st.set('st-nm-nh'); st.mood('nhi', 'joy'); st.pose('nhi', 'wave'); st.act('nhi', 'wave'); st.sfx('ding', { vol: 0.4, rate: 1.2 });
    await st.wait(1000);
    for (const id of ['trac', 'nhi']) { st.act(id, null); st.pose(id, 'stand'); st.mood(id, 'happy'); }
  } },
  { key: ['brave and clever'], icon: '💪', label: 'brave · clever', async play(st) {
    off(st, 'st-lb-melinh', 'st-nm-tr', 'st-nm-nh');
    st.look(X.house - 10);
    st.pose('trac', 'think'); st.set('st-think'); st.sfx('pop', { vol: 0.5 });
    await st.wait(500);
    st.set('st-lb-clever'); st.sfx('pencil', { vol: 0.6 });
    await st.wait(900);
    st.hold('nhi', 'e121_spear'); st.pose('nhi', 'raise'); st.set('st-lb-brave'); st.sfx('whoosh', { vol: 0.6 });
    await st.wait(450);
    st.pose('nhi', 'throw'); st.sfx('whoosh', { vol: 0.5, rate: 1.2 });
    await st.wait(450);
    st.pose('nhi', 'raise'); st.mood('nhi', 'joy');
    await st.wait(700);
    st.pose('nhi', 'e121_guard'); st.pose('trac', 'stand'); st.mood('trac', 'joy');
  } },
  { key: ['In the year 40', 'started a fight against To Dinh'], icon: '🥁', label: 'year 40', async play(st) {
    off(st, 'st-think', 'st-lb-clever', 'st-lb-brave');
    st.set('st-lb-y40'); st.sfx('ding', { vol: 0.4 });
    st.look(X.drum - 40);
    st.hold('trac', 'e121_stick');
    await st.walk('trac', X.drum - 64, { speed: 120, follow: false });
    st.face('trac', 1);
    await drumHit(st, 3);
    st.set('st-flag'); st.sfx('whoosh', { vol: 0.6 });
    st.pose('nhi', 'raise'); st.mood('nhi', 'joy');
    await st.wait(900);
    st.pose('trac', 'stand'); st.hold('trac', null); st.pose('nhi', 'e121_guard');
  } },
  { key: ['Many people joined them', 'women were soldiers too'], icon: '👥', label: 'people joined', async play(st) {
    st.set('st-lb-y40', false);
    st.look(940, { dur: 1200 });
    for (const id of VILL) st.show(id, true);
    await Promise.all([
      st.walk('w1', 770, { speed: 130, follow: false, after: 'e121_guard' }),
      st.walk('w2', 820, { speed: 130, follow: false, after: 'e121_guard' }),
      st.walk('m1', 870, { speed: 130, follow: false, after: 'e121_guard' }),
      st.walk('w3', 920, { speed: 130, follow: false, after: 'e121_guard' }),
    ]);
    st.face('trac', -1);
    st.set('st-lb-women'); st.sfx('cheer', { vol: 0.5 });
    for (const id of ['w1', 'w2', 'w3']) { st.pose(id, 'raise'); st.mood(id, 'joy'); }
    st.mood('trac', 'joy');
    await st.wait(1400);
    for (const id of ['w1', 'w2', 'w3']) st.pose(id, 'e121_guard');
  } },
  { key: ['rode on big elephants', 'their army won'], icon: '🐘', label: 'elephants', async play(st) {
    st.set('st-lb-women', false);
    st.face('trac', 1); st.face('nhi', 1);
    await mount(st, true);
    st.act('ele1', 'e121trump'); st.sfx('elephant', { vol: 0.7 });
    await st.wait(700);
    st.act('ele1', null);
    st.look(1500, { dur: 3600 });
    const go = Promise.all([
      st.walk('ele1', 1660, { speed: 170, follow: false }),
      st.walk('ele2', 1500, { speed: 170, follow: false }),
      ...VILL.map((id, i) => st.walk(id, 1290 + i * 44, { speed: 170, follow: false, after: 'e121_guard' })),
    ]);
    await st.wait(1500); st.sfx('elephant', { vol: 0.5, rate: 1.1 });
    await st.loop('steps', () => go, { vol: 0.5 });
    st.set('st-win'); st.sfx('whoosh', { vol: 0.5 });
    await st.wait(500);
    st.set('st-lb-won'); st.sfx('cheer', { vol: 0.6 });
    st.act('ele1', 'e121wave'); st.act('ele2', 'e121wave');
    for (const id of VILL) { st.pose(id, 'raise'); st.mood(id, 'joy'); }
    await st.wait(1300);
    st.act('ele1', null); st.act('ele2', null);
    for (const id of VILL) st.pose(id, 'e121_guard');
  } },
  { key: ['To Dinh ran away to the north'], icon: '🏃', label: 'ran away', async play(st) {
    st.set('st-lb-won', false);
    st.place('todinh', X.gate + 20, FLOOR, -1); st.show('todinh', true); st.mood('todinh', 'wow'); st.pose('todinh', 'shrug');
    st.look(X.gate + 120);
    st.act('ele1', 'e121trump'); st.sfx('elephant', { vol: 0.7 });
    await st.wait(700);
    st.set('st-run'); st.sfx('whoosh', { vol: 0.6 });
    await st.walk('todinh', 2520, { speed: 280, follow: false });
    st.show('todinh', false);
    st.act('ele1', null);
    await st.wait(400);
  } },
  { key: ['Trung Trac became queen', 'her sister helped her'], icon: '👑', label: 'queen', async play(st) {
    off(st, 'st-run');
    st.look(1640);
    await mount(st, false);
    st.place('trac', 1700, FLOOR, 1); st.place('nhi', 1600, FLOOR, 1);
    await st.wait(300);
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(crown(), [1600, 90], [1700, FLOOR - 172], { size: 40, dur: 700 });
    st.place('crown', 1700, FLOOR - 166); st.show('crown', true); st.fx('sparkle', 1700, FLOOR - 186);
    st.set('st-lb-queen'); st.mood('trac', 'joy'); st.pose('trac', 'open');
    await st.wait(600);
    st.face('nhi', 1); st.chest('nhi', 'book'); st.pose('nhi', 'carry'); st.sfx('page-turn', { vol: 0.6 });
    await st.walk('nhi', 1640, { speed: 90, follow: false, after: 'carry' });
    st.mood('nhi', 'joy');
    for (const id of VILL) st.pose(id, 'e121_bow');
    st.sfx('cheer', { vol: 0.4 });
    await st.wait(1100);
    st.pose('trac', 'stand');
  } },
  { key: ['Two years later', 'a huge army came from the north again'], icon: '⚔️', label: 'huge army', async play(st) {
    st.set('st-lb-queen', false);
    for (const id of VILL) st.pose(id, 'e121_guard');
    st.chest('nhi', null); st.pose('nhi', 'stand');
    st.set('st-lb-later'); st.sfx('page-turn', { vol: 0.6 });
    st.look(1880, { dur: 1400 });
    await st.wait(900);
    st.set('st-lb-later', false); st.set('st-dark'); st.set('st-lb-north');
    st.show('army', true);
    await st.loop('steps', () => st.walk('army', 2090, { speed: 110, follow: false }), { vol: 0.8 });
    st.sfx('bump', { vol: 0.8, rate: 0.6 });
    st.mood('trac', 'wow'); st.mood('nhi', 'wow');
    await st.wait(500);
    st.set('st-lb-north', false);
  } },
  { key: ['fought bravely', 'until the year 43'], icon: '🛡️', label: 'fought bravely', async play(st) {
    st.look(1850);
    st.show('crown', false);
    await mount(st, true);
    st.set('st-lb-y43');
    st.act('ele1', 'e121trump'); st.act('ele2', 'e121trump'); st.sfx('elephant', { vol: 0.8 });
    await st.wait(600);
    for (let i = 0; i < 2; i++) {
      const go = Promise.all([st.walk('ele1', 1820, { speed: 160, follow: false }), st.walk('ele2', 1700, { speed: 160, follow: false })]);
      await st.wait(400);
      st.fx('poof', 2040, FLOOR - 70, { quiet: true }); st.sfx('bump', { vol: 0.8 }); st.sfx('poof', { vol: 0.4 });
      await go;
      await Promise.all([st.walk('ele1', 1740, { speed: 160, follow: false }), st.walk('ele2', 1620, { speed: 160, follow: false })]);
      st.face('ele1', 1); st.face('ele2', 1);
    }
    st.act('ele1', 'e121wave'); st.act('ele2', 'e121wave'); st.sfx('elephant', { vol: 0.6, rate: 0.9 });
    await st.wait(1000);
    st.act('ele1', null); st.act('ele2', null);
  } },
  { key: ['Today', 'many streets and schools have their name'], icon: '🏫', label: 'streets · schools', async play(st) {
    off(st, 'st-lb-y43', 'st-dark', 'st-past');
    for (const id of ['army', 'ele1', 'ele2', ...VILL]) st.show(id, false);
    st.look(2866, { instant: true });
    st.set('st-lb-today'); st.sfx('birds', { vol: 0.5 });
    st.walk('minh', 2840, { speed: 120, follow: false });
    await st.walk('lan', 2788, { speed: 120, follow: false });
    st.set('st-st'); st.sfx('pop', { vol: 0.6 });
    st.face('lan', -1); st.pose('lan', 'point'); st.mood('lan', 'joy');
    await st.wait(700);
    st.set('st-sch'); st.sfx('school-bell', { vol: 0.4 });
    st.face('minh', 1); st.pose('minh', 'point'); st.act('minh', 'point'); st.mood('minh', 'wow');
    await st.wait(1300);
    st.act('minh', null); st.pose('minh', 'stand'); st.pose('lan', 'stand');
  } },
];

export default {
  id: 'en121', worldW: W, floor: FLOOR, viewTop: 30, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [1, 2, 4, 6, 8, 11],
  cast: [
    { id: 'army', kind: 'thing', x: 2700, y: FLOOR, s: 1.15, face: -1, svg: ARMY, box: [-190, -200, 380, 204] },
    { id: 'ele2', kind: 'thing', x: 1010, y: FLOOR, s: 0.95, svg: ELEPHANT('e121_nhiR', '#D97706', '#1D4ED8'), box: [-110, -250, 250, 255] },
    { id: 'ele1', kind: 'thing', x: 930, y: FLOOR, s: 1, svg: ELEPHANT('e121_tracR', '#B91C1C', '#B91C1C'), box: [-110, -250, 250, 255] },
    { id: 'f1', kind: 'adult', who: 'e121_f1', x: 330, s: 0.9 },
    { id: 'f2', kind: 'adult', who: 'e121_f2', x: 450, s: 0.9 },
    { id: 'guard', kind: 'adult', who: 'e121_guard', x: 800, s: 0.92, face: -1 },
    { id: 'todinh', kind: 'adult', who: 'e121_todinh', x: 740, face: -1 },
    { id: 'w1', kind: 'adult', who: 'e121_w1', x: 600, s: 0.88 },
    { id: 'w2', kind: 'adult', who: 'e121_w2', x: 560, s: 0.88 },
    { id: 'm1', kind: 'adult', who: 'e121_m1', x: 520, s: 0.9 },
    { id: 'w3', kind: 'adult', who: 'e121_w3', x: 480, s: 0.88 },
    { id: 'nhi', kind: 'adult', who: 'e121_nhi', x: 1010, s: 0.98 },
    { id: 'trac', kind: 'adult', who: 'e121_trac', x: 920 },
    { id: 'crown', kind: 'thing', x: 1700, y: FLOOR - 166, svg: crown(), box: [-20, -26, 40, 28] },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 2560, s: 1.05 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 2610 },
  ],
  init(st) {
    for (const id of ['army', 'ele1', 'ele2', 'crown', ...VILL]) st.show(id, false);
    for (const id of VILL) st.hold(id, 'e121_spear');
    st.hold('guard', 'e121_spear'); st.pose('guard', 'e121_guard');
  },
};
