/**
 * Bài 113 "Hachiko Waits" (hiện tại đơn, trạng từ tần suất, at + giờ). Tokyo những năm 1920–1930, đi từ trái sang phải:
 * nhà gỗ kiểu Nhật của giáo sư Ueno (mái ngói, cửa giấy shoji kéo ngang) → phố cũ (cây anh đào, đèn đường) → ga Shibuya
 * (nhà ga gạch có đồng hồ, biển SHIBUYA) → sân ga, tàu điện nâu cập bến.
 * Giáo sư mất được diễn nhẹ nhàng trong một khung tranh trên trời (ốm ở chỗ làm → ảnh ông với hoa cúc trắng, một vì sao).
 * Mưa, tuyết, chín năm (lịch lật số, cây đổi mùa), người cho ăn; "Today": tượng đồng Hachiko trước ga, khách chụp ảnh.
 * Toạ độ cảnh: rộng 1950, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, label, speaker, sun } from '../kit.js';

const FLOOR = 282;
const W = 1950;
const X = { door: 260, wait: 1250, ent: 1320, st0: 1080, st1: 1440, train: 1610, alight: 1540, cam: 1390, tree: 1020 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e113_prof: { adult: true, hair: 'short', hairC: '#1F1716', top: 'jacket', shirt: '#374151', inner: '#FFFFFF', bottom: 'pants', bottomC: '#374151', shoe: '#1C1917', glasses: true, moustache: true },
  e113_lady: { adult: true, hair: 'bun', top: 'blouse', shirt: '#F9A8D4', bottom: 'pants', bottomC: '#7C2D52', shoe: '#F5F5F4' },
  e113_vendor: { adult: true, hair: 'short', top: 'blouse', shirt: '#1E3A8A', bottom: 'pants', bottomC: '#1F2937', shoe: '#57534E', moustache: true },
  e113_man: { adult: true, hair: 'short', top: 'jacket', shirt: '#57534E', inner: '#FFFFFF', bottom: 'pants', bottomC: '#44403C', shoe: '#1C1917' },
  e113_tour: { adult: true, hair: 'ponytail', top: 'tee', shirt: '#22C55E', bottom: 'pants', bottomC: '#1E3A8A', shoe: '#F5F5F4' },
  e113_kid: { hair: 'bob', top: 'tee', shirt: '#F472B6', bottom: 'skirt', bottomC: '#7C3AED', shoe: '#F28AB2' },
});

// ── Chó Akita (nhìn nghiêng, mặt sang phải): đứng / ngồi (.is-sit) ─────────────────────────
const AK = { F: '#E39A55', C: '#FFF3DC', D: '#C27A3A' };
const BRONZE = { F: '#9A7440', C: '#B8925A', D: '#7A5A2E' };
function akita({ F, C, D } = AK, sitOnly = false) {
  const leg = (x, cls, dark) => `<g transform="translate(${x} -30)"><g class="${cls}"><path d="M0 0 L0 27" stroke="${L}" stroke-width="9.4" stroke-linecap="round"/>
    <path d="M0 0 L0 27" stroke="${dark ? D : F}" stroke-width="7.6" stroke-linecap="round"/><ellipse cx="2" cy="28" rx="5.4" ry="2.8" fill="${C}" stroke="${L}" stroke-width="0.8"/></g></g>`;
  const head = (x, y) => `<g transform="translate(${x} ${y})"><g class="e113-dh">
    <path d="M-11 -9 L-9 -28 L1 -14Z" fill="${F}" stroke="${L}" stroke-width="0.9" stroke-linejoin="round"/><path d="M-7 -13 L-7.6 -22 L-2 -15Z" fill="#F9A8D4"/>
    <path d="M-1 -14 L6 -30 L12 -11Z" fill="${F}" stroke="${L}" stroke-width="0.9" stroke-linejoin="round"/>
    <circle r="15" fill="${F}" stroke="${L}" stroke-width="1"/>
    <ellipse cx="-4" cy="6" rx="7" ry="6" fill="${C}"/>
    <path d="M-1 4 Q4 -6 14 -6 Q22 -5 25 1 Q23 10 12 12 Q2 12 -1 4Z" fill="${C}" stroke="${L}" stroke-width="0.8"/>
    <circle cx="4" cy="-10" r="2" fill="${C}"/>
    <ellipse cx="24" cy="-1" rx="3.4" ry="2.6" fill="#2B1D16"/>
    <g class="e113-deo"><ellipse cx="7" cy="-4" rx="2" ry="2.6" fill="#2B1D16"/><circle cx="7.6" cy="-5" r="0.7" fill="#fff"/></g>
    <path class="e113-des" d="M4.6 -4 Q7 -1.6 9.4 -4" stroke="#2B1D16" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <path class="e113-dmc" d="M14 7 q4 2 8 0" stroke="${L}" stroke-width="1" fill="none" stroke-linecap="round"/>
    <g class="e113-dmo"><path d="M13 6 q5 7 10 0Z" fill="#B4363C" stroke="${L}" stroke-width="0.6"/><path d="M15 9 q2 6 5 1" fill="#F472B6"/></g></g></g>`;
  const tail = (x, y) => `<g transform="translate(${x} ${y})"><g class="e113-dt"><path d="M0 0 Q-7 -16 5 -19 Q16 -17 12 -6 Q8 1 1 -3" stroke="${L}" stroke-width="8.6" fill="none" stroke-linecap="round"/>
    <path d="M0 0 Q-7 -16 5 -19 Q16 -17 12 -6 Q8 1 1 -3" stroke="${F}" stroke-width="6.8" fill="none" stroke-linecap="round"/><path d="M2 -5 Q0 -13 7 -14" stroke="${C}" stroke-width="2.4" fill="none" stroke-linecap="round"/></g></g>`;
  const stand = `<g class="e113-dstand">${tail(-30, -52)}${leg(-20, 'e113-dlB', true)}${leg(24, 'e113-dlA', true)}
    <ellipse cx="0" cy="-44" rx="36" ry="16" fill="${F}" stroke="${L}" stroke-width="1"/><ellipse cx="4" cy="-33" rx="24" ry="5.6" fill="${C}"/>
    <path d="M22 -56 Q36 -60 40 -52 L40 -34 Q30 -30 24 -34Z" fill="${C}" stroke="${L}" stroke-width="0.8"/>
    ${leg(-27, 'e113-dlA')}${leg(30, 'e113-dlB')}${head(40, -68)}</g>`;
  const sit = `<g class="e113-dsit">${tail(-22, -30)}
    <ellipse cx="-6" cy="-15" rx="21" ry="15" fill="${F}" stroke="${L}" stroke-width="1"/>
    <path d="M-4 -14 Q2 -54 22 -64 L32 -48 Q28 -22 24 -4Z" fill="${F}" stroke="${L}" stroke-width="1"/>
    <path d="M14 -50 Q24 -30 22 -10" stroke="${C}" stroke-width="8" fill="none" stroke-linecap="round"/>
    ${[14, 24].map((x) => `<path d="M${x} -32 L${x + 1} -2" stroke="${L}" stroke-width="9" stroke-linecap="round"/><path d="M${x} -32 L${x + 1} -2" stroke="${F}" stroke-width="7.2" stroke-linecap="round"/><ellipse cx="${x + 3}" cy="-1" rx="5.4" ry="2.8" fill="${C}" stroke="${L}" stroke-width="0.8"/>`).join('')}
    <ellipse cx="-12" cy="-1" rx="10" ry="3.2" fill="${C}" stroke="${L}" stroke-width="0.8"/>${head(30, -74)}</g>`;
  return sitOnly ? sit.replace('class="e113-dsit"', '') : `<g class="e113-dbob">${stand}${sit}</g>`;
}
const AKITA_BOX = [-50, -106, 110, 110];

// ── Tàu điện (mặt sang phải, gốc giữa đáy bánh) ───────────────────────────────────────────
const TRAIN = `<g><path d="M-136 -20 V-86 Q-136 -96 -124 -96 H120 Q136 -96 138 -80 V-20Z" fill="#7C2D12" stroke="${L}" stroke-width="1.3"/>
  <rect x="-136" y="-30" width="274" height="8" fill="#FDE68A"/>
  ${[-118, -88, -58, 2, 32, 62].map((x) => `<rect x="${x}" y="-82" width="22" height="22" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="-30" y="-84" width="24" height="60" rx="2" fill="#92400E" stroke="${L}" stroke-width="0.9"/><path d="M-18 -84 V-24" stroke="${L}" stroke-width="0.8"/>
  <rect x="98" y="-82" width="30" height="26" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="0.9"/>
  <path d="M-40 -96 L-28 -112 L-8 -112 L4 -96 M-28 -112 H-8 M-18 -112 V-118" stroke="#1F2937" stroke-width="2" fill="none"/>
  <circle cx="132" cy="-38" r="4" fill="#FEF08A" stroke="${L}" stroke-width="0.7"/>
  ${[-104, -76, 70, 98].map((x) => `<g transform="translate(${x} -12)"><g class="e113-wh"><circle r="10" fill="#1F2937" stroke="${L}"/><circle r="4" fill="#94A3B8"/><path d="M-4 0 H4 M0 -4 V4" stroke="#475569" stroke-width="1.2"/></g></g>`).join('')}</g>`;
const ONIGIRI = `<path d="M0 -10 Q10 4 8 8 H-8 Q-10 4 0 -10Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><rect x="-6" y="1" width="12" height="7" fill="#14532D"/>`;

// ── Cảnh ──────────────────────────────────────────────────────────────────
const lamp = (x) => `<g transform="translate(${x} ${FLOOR})"><path d="M0 0 V-112" stroke="#334155" stroke-width="4"/><path d="M-9 -112 H9 L6 -130 H-6Z" fill="#FEF3C7" stroke="${L}" stroke-width="0.9"/><path d="M-11 -130 H11 L0 -138Z" fill="#334155"/></g>`;
const blossom = (x, y, s, cols) => `<g transform="translate(${x} ${y}) scale(${s})">${[[-40, 0, 30], [0, -18, 34], [38, -2, 28], [-14, 16, 24], [22, 16, 24]].map(([cx, cy, r], i) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${cols[i % cols.length]}" stroke="${L}" stroke-width="0.9"/>`).join('')}</g>`;
const tree = (x, cls = '') => `<g transform="translate(${x} ${FLOOR})"><path d="M-7 0 Q-4 -60 -16 -110 L-4 -110 Q4 -60 7 0Z" fill="#7C4A2A" stroke="${L}"/>
  <path d="M-10 -96 Q-30 -112 -46 -118 M-6 -100 Q16 -122 40 -124" stroke="#7C4A2A" stroke-width="5" fill="none" stroke-linecap="round"/>
  <g class="ek-sway ${cls}" style="transform-origin:0 -130px">${cls ? `
    <g class="e113-ss e113-s-spring">${blossom(0, -138, 1, ['#FBCFE8', '#F9A8D4', '#FCE7F3'])}</g>
    <g class="e113-ss e113-s-summer">${blossom(0, -138, 1, ['#4ADE80', '#22C55E', '#86EFAC'])}</g>
    <g class="e113-ss e113-s-autumn">${blossom(0, -138, 1, ['#FB923C', '#F59E0B', '#EF4444'])}</g>
    <g class="e113-ss e113-s-winter"><path d="M-46 -118 l-10 -10 M40 -124 l12 -8 M-16 -110 l-6 -22 M-4 -110 l8 -24" stroke="#7C4A2A" stroke-width="3" stroke-linecap="round"/>
      <path d="M-58 -128 q8 -4 14 2 M48 -132 q8 -4 12 2" stroke="#fff" stroke-width="4" stroke-linecap="round"/></g>` : blossom(0, -138, 1, ['#FBCFE8', '#F9A8D4', '#FCE7F3'])}</g></g>`;

function bg() {
  const house = `<g>
    <rect x="70" y="${FLOOR - 16}" width="340" height="16" fill="#A16207" stroke="${L}"/>
    <rect x="86" y="140" width="308" height="${FLOOR - 156}" fill="#E7D3A8" stroke="${L}" stroke-width="1.2"/>
    ${[90, 150, 330, 390].map((x) => `<rect x="${x - 4}" y="140" width="8" height="${FLOOR - 156}" fill="#7C4A2A"/>`).join('')}
    <g transform="translate(120 170)"><rect width="52" height="70" fill="#FFFBEB" stroke="#7C4A2A" stroke-width="2"/>${[1, 2].map((i) => `<path d="M${i * 17} 0 V70" stroke="#7C4A2A" stroke-width="1.2"/>`).join('')}${[1, 2, 3].map((i) => `<path d="M0 ${i * 17.5} H52" stroke="#7C4A2A" stroke-width="1.2"/>`).join('')}</g>
    <rect x="${X.door - 32}" y="164" width="64" height="${FLOOR - 180}" fill="#3F2A1E"/>
    <g class="e113-door"><rect x="${X.door - 32}" y="164" width="64" height="${FLOOR - 180}" fill="#FFFBEB" stroke="#7C4A2A" stroke-width="2"/>
      ${[1, 2, 3].map((i) => `<path d="M${X.door - 32 + i * 16} 164 V${FLOOR - 16}" stroke="#7C4A2A" stroke-width="1.2"/>`).join('')}${[1, 2, 3, 4].map((i) => `<path d="M${X.door - 32} ${164 + i * 20} H${X.door + 32}" stroke="#7C4A2A" stroke-width="1.2"/>`).join('')}</g>
    <path d="M40 146 Q60 120 90 112 H390 Q420 120 440 146 Q420 138 400 140 H80 Q60 138 40 146Z" fill="#334155" stroke="${L}" stroke-width="1.2"/>
    <path d="M90 112 L130 74 H350 L390 112Z" fill="#475569" stroke="${L}" stroke-width="1.2"/>
    ${Array.from({ length: 13 }, (_, i) => `<path d="M${100 + i * 22} 112 L${136 + i * 17} 78" stroke="#64748B" stroke-width="1.4"/>`).join('')}
    <path class="e113-snowcap" d="M86 76 Q240 62 394 76 L392 82 Q240 70 88 82Z M42 144 Q240 130 438 144 L436 150 Q240 138 44 150Z" fill="#fff"/>
    <rect x="${X.door - 40}" y="138" width="80" height="18" fill="#F5F5F4" stroke="${L}"/><text x="${X.door}" y="152" text-anchor="middle" ${NUN} font-size="12" fill="#1F2937">UENO</text></g>
    <g transform="translate(40 ${FLOOR})"><path d="M-10 0 Q-8 -40 -2 -70 M-2 -70 q-26 -8 -30 -2 q12 10 30 2 q20 -14 34 -4 q-16 14 -34 4" stroke="#14532D" stroke-width="6" fill="#166534" stroke-linejoin="round"/></g>`;
  const shop = (x, c, sign) => `<g transform="translate(${x} 0)"><rect x="-60" y="150" width="120" height="${FLOOR - 150}" fill="#D6B98A" stroke="${L}"/>
    <path d="M-70 156 L-56 128 H56 L70 156Z" fill="#475569" stroke="${L}"/>
    <rect x="-40" y="176" width="80" height="22" fill="${c}" stroke="${L}" stroke-width="0.9"/>${[-20, 0, 20].map((d) => `<path d="M${d} 176 V198" stroke="${L}" stroke-width="0.8"/>`).join('')}
    <rect x="-34" y="206" width="68" height="${FLOOR - 206}" fill="#57534E"/><rect x="-14" y="158" width="28" height="14" fill="#fff" stroke="${L}" stroke-width="0.8"/><text y="169" text-anchor="middle" ${NUN} font-size="9" fill="#B91C1C">${sign}</text></g>`;
  const station = `<g>
    <rect x="${X.st0}" y="120" width="${X.st1 - X.st0}" height="${FLOOR - 120}" fill="#C2410C" stroke="${L}" stroke-width="1.3"/>
    ${Array.from({ length: 9 }, (_, i) => `<path d="M${X.st0} ${132 + i * 17} H${X.st1}" stroke="#9A3412" stroke-width="0.8" opacity="0.6"/>`).join('')}
    <path d="M${X.st0 - 14} 122 L${X.st0 + 20} 96 H${X.st1 - 20} L${X.st1 + 14} 122Z" fill="#475569" stroke="${L}" stroke-width="1.2"/>
    <path class="e113-snowcap" d="M${X.st0 + 16} 98 H${X.st1 - 16} L${X.st1 - 12} 104 H${X.st0 + 12}Z" fill="#fff"/>
    <rect x="${X.st0 + 70}" y="126" width="180" height="26" rx="3" fill="#FEF3C7" stroke="${L}"/>
    <text x="${X.st0 + 160}" y="145" text-anchor="middle" ${NUN} font-size="17" fill="#1F2937">SHIBUYA</text>
    ${[X.st0 + 40, X.st0 + 100, X.st0 + 160].map((x) => `<rect x="${x - 16}" y="170" width="32" height="40" rx="3" fill="#BAE6FD" stroke="${L}"/><path d="M${x} 170 V210" stroke="#fff" stroke-width="2"/>`).join('')}
    <path d="M${X.ent - 34} ${FLOOR} V196 Q${X.ent} 172 ${X.ent + 34} 196 V${FLOOR}Z" fill="#3F2A1E" stroke="${L}" stroke-width="1.2"/>
    <rect x="${X.ent - 40}" y="${FLOOR - 4}" width="80" height="6" fill="#A8A29E"/>
    <g transform="translate(1396 150)"><circle r="20" fill="#fff" stroke="${L}" stroke-width="2"/>${Array.from({ length: 12 }, (_, i) => `<path d="M0 -17 V-14" stroke="${L}" stroke-width="1.4" transform="rotate(${i * 30})"/>`).join('')}
      <g class="e113-hh"><path d="M0 0 V-10" stroke="#1F2937" stroke-width="2.6" stroke-linecap="round"/></g><g class="e113-mh"><path d="M0 0 V-15" stroke="#1F2937" stroke-width="1.6" stroke-linecap="round"/></g><circle r="2" fill="#1F2937"/>
      <circle class="e113-ckring" r="24" fill="none" stroke="#FACC15" stroke-width="3"/></g></g>`;
  return `
  ${sky(0, W, 315, 'e113sky')}
  <g class="e113-sunm" transform="translate(360 64)">${sun(22)}</g>
  ${cloud(160, 52, 0.8, 0)}${cloud(700, 60, 0.9, 2)}${cloud(1200, 46, 0.8, 4)}${cloud(1700, 58, 0.9, 1)}
  <!-- thành phố ngày nay (sau ga) -->
  <g class="e113-city">${[[1460, 70, 120], [1540, 50, 160], [1610, 90, 110], [1700, 60, 150], [1780, 80, 120], [1860, 70, 170]].map(([x, w, h], i) => `<rect x="${x}" y="${FLOOR - 24 - h}" width="${w}" height="${h}" fill="${['#94A3B8', '#CBD5E1', '#A5B4FC', '#BAE6FD', '#CBD5E1', '#94A3B8'][i]}" stroke="${L}" stroke-width="0.8"/>${Array.from({ length: Math.floor(h / 22) }, (_, j) => `<rect x="${x + 8}" y="${FLOOR - 14 - h + j * 22}" width="${w - 16}" height="8" fill="#E0F2FE" opacity="0.8"/>`).join('')}`).join('')}
    <rect x="1580" y="80" width="90" height="34" rx="3" fill="#0F172A"/><rect x="1586" y="86" width="78" height="22" fill="#38BDF8"/><text x="1625" y="102" text-anchor="middle" ${NUN} font-size="11" fill="#fff">TOKYO</text></g>
  <!-- đường đất, vỉa hè -->
  <rect x="0" y="${FLOOR}" width="${W}" height="${315 - FLOOR}" fill="#D6C3A0" stroke="${L}"/>
  ${Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 71) % W}" cy="${FLOOR + 8 + (i * 11) % 20}" r="1.6" fill="#A8977A"/>`).join('')}
  <rect class="e113-snowg" x="0" y="${FLOOR - 2}" width="${W}" height="${315 - FLOOR + 2}" fill="#F8FAFC"/>
  ${house}
  ${shop(640, '#DC2626', 'OKASHI')}
  ${tree(520)}${lamp(460)}${lamp(860)}
  ${tree(X.tree, 'e113-season')}
  <!-- sân ga, đường ray -->
  <rect x="${X.st1}" y="${FLOOR - 22}" width="${W - X.st1}" height="${315 - FLOOR + 22}" fill="#9CA3AF" stroke="${L}"/>
  <path d="M${X.st1} ${FLOOR - 22} H${W}" stroke="#57534E" stroke-width="3"/>
  ${[1500, 1900].map((x) => `<path d="M${x} ${FLOOR - 22} V150 M${x - 30} 150 H${x + 30}" stroke="#57534E" stroke-width="4"/>`).join('')}
  <path d="M${X.st1 - 10} 150 H${W}" stroke="#57534E" stroke-width="5"/><path d="M${X.st1 - 10} 146 L${W} 136 V146Z" fill="#78716C" stroke="${L}"/>
  ${station}
  <!-- tượng đồng (Today) -->
  <g class="e113-statue"><rect x="${X.wait - 38}" y="${FLOOR - 46}" width="76" height="46" fill="#A8A29E" stroke="${L}" stroke-width="1.2"/>
    <rect x="${X.wait - 44}" y="${FLOOR - 52}" width="88" height="8" fill="#D6D3D1" stroke="${L}"/>
    <rect x="${X.wait - 26}" y="${FLOOR - 34}" width="52" height="16" fill="#D6D3D1" stroke="${L}" stroke-width="0.7"/><text x="${X.wait}" y="${FLOOR - 22}" text-anchor="middle" ${NUN} font-size="9.5" fill="#44403C">HACHIKO</text>
    <g transform="translate(${X.wait - 4} ${FLOOR - 52})">${akita(BRONZE, true)}</g></g>
  <g class="e113-bowl"><g transform="translate(${X.wait + 34} ${FLOOR - 4})"><path d="M-12 -6 H12 Q11 4 0 5 Q-11 4 -12 -6Z" fill="#fff" stroke="#3B82F6" stroke-width="1.2"/>${ONIGIRI.replace('<path', '<path transform="translate(0 -10) scale(0.6)"').replace('<rect', '<rect transform="translate(0 -10) scale(0.6)"')}</g></g>`;
}

function fg() {
  const cal = `<g class="e113-cal"><g transform="translate(1262 92)"><rect x="-30" y="-30" width="60" height="62" rx="5" fill="#fff" stroke="${L}" stroke-width="1.4"/>
    <rect x="-30" y="-30" width="60" height="16" rx="5" fill="#DC2626"/><text y="-18" text-anchor="middle" ${NUN} font-size="9" fill="#fff">YEAR</text>
    ${Array.from({ length: 9 }, (_, i) => `<text class="e113-y e113-y${i + 1}" y="22" text-anchor="middle" ${NUN} font-size="34" fill="#1F2937">${i + 1}</text>`).join('')}</g></g>`;
  const inset = `<g class="e113-ins"><g transform="translate(1470 98)"><rect x="-80" y="-48" width="160" height="96" rx="10" fill="#FFFBEB" stroke="${L}" stroke-width="1.6"/>
    <g class="e113-ill"><rect x="-64" y="18" width="128" height="10" rx="2" fill="#B45309" stroke="${L}"/>
      ${[-54, -44].map((x, i) => `<rect x="${x}" y="${4 - i * 6}" width="22" height="${14 + i * 6}" fill="${['#3B82F6', '#22C55E'][i]}" stroke="${L}" stroke-width="0.7"/>`).join('')}
      <g transform="translate(6 -2)">${headOnly('e113_prof', { s: 0.8, mood: 'sad' })}<rect x="-12" y="-20" width="24" height="7" rx="3" fill="#fff" stroke="#94A3B8" stroke-width="0.8"/></g>
      <g transform="translate(50 -20)">${label(0, 4, 'ill', '#DC2626', 13)}</g></g>
    <g class="e113-gone"><rect x="-30" y="-40" width="60" height="64" rx="3" fill="#FDE68A" stroke="#78350F" stroke-width="2.4"/><rect x="-24" y="-34" width="48" height="52" fill="#FEF3C7"/>
      <g transform="translate(0 -2)" opacity="0.85">${headOnly('e113_prof', { s: 0.68, mood: 'happy' })}</g>
      ${[-42, -30, 30, 42].map((x, i) => `<g transform="translate(${x} ${30 - (i % 2) * 6})">${Array.from({ length: 8 }, (_, j) => `<ellipse cy="-5" rx="2" ry="5" fill="#fff" stroke="#94A3B8" stroke-width="0.5" transform="rotate(${j * 45})"/>`).join('')}<circle r="2.2" fill="#FDE68A"/></g>`).join('')}
      <path class="e113-star" d="M62 -34 l3 7 l7 1 l-5 5 l1.4 7 l-6.4 -3.4 l-6.4 3.4 l1.4 -7 l-5 -5 l7 -1Z" fill="#FDE68A" stroke="#F59E0B" stroke-width="0.8"/></g></g></g>`;
  const flake = (x, y, i) => `<g class="e113-fl" style="animation-delay:${(i % 7) * -0.5}s"><circle cx="${x}" cy="${y}" r="${2 + (i % 3)}" fill="#fff" stroke="#CBD5E1" stroke-width="0.5"/></g>`;
  return `
  <rect class="e113-pm" x="0" y="0" width="${W}" height="315" fill="#F97316"/>
  <g class="e113-rain"><rect x="0" y="0" width="${W}" height="315" fill="#334155" opacity="0.35"/>
    <g class="e113-rl">${Array.from({ length: 80 }, (_, i) => `<path d="M${(i * 97) % W} ${20 + (i * 53) % 270} l-5 14" stroke="#BFDBFE" stroke-width="2" stroke-linecap="round"/>`).join('')}</g></g>
  <g class="e113-snow"><rect x="0" y="0" width="${W}" height="315" fill="#E2E8F0" opacity="0.25"/>${Array.from({ length: 70 }, (_, i) => flake((i * 113) % W, 10 + (i * 61) % 280, i)).join('')}</g>
  ${cal}${inset}
  <g class="e113-q"><g transform="translate(${X.wait + 30} 170)"><circle r="14" fill="#fff" stroke="#EA580C" stroke-width="2"/><text y="8" text-anchor="middle" ${NUN} font-size="22" fill="#EA580C">?</text></g>
    <g transform="translate(${X.wait + 2} 154) scale(0.7)"><circle r="14" fill="#fff" stroke="#EA580C" stroke-width="2"/><text y="8" text-anchor="middle" ${NUN} font-size="22" fill="#EA580C">?</text></g></g>
  <g class="e113-lb e113-lb-akita">${label(380, 150, 'Akita', '#B45309', 20)}</g>
  <g class="e113-lb e113-lb-tokyo">${label(250, 64, 'Tokyo, Japan', '#DC2626', 18)}</g>
  <g class="e113-lb e113-lb-prof">${speaker(400, 92, 'Professor Ueno', '#1D4ED8')}</g>
  <g class="e113-lb e113-lb-morning">${label(470, 70, 'Every morning', '#EA580C', 18)}</g>
  <g class="e113-lb e113-lb-noon">${label(X.cam - 60, 70, 'Every afternoon', '#C2410C', 18)}</g>
  <g class="e113-lb e113-lb-always">${label(X.cam + 60, 76, 'always', '#16A34A', 18)}</g>
  <g class="e113-lb e113-lb-oneday">${label(X.cam - 40, 70, 'One day', '#7C3AED', 18)}</g>
  <g class="e113-lb e113-lb-every">${label(X.cam + 50, 76, 'every day', '#EA580C', 18)}</g>
  <g class="e113-lb e113-lb-years">${label(1410, 72, 'about nine years', '#1D4ED8', 15)}</g>
  <g class="e113-lb e113-lb-today">${label(X.cam - 40, 70, 'Today', '#16A34A', 20)}</g>`;
}

const CSS = `
.e113-lb { opacity: 0; transition: opacity .3s; }
${['akita', 'tokyo', 'prof', 'morning', 'noon', 'always', 'oneday', 'every', 'years', 'today'].map((k) => `.st-lb-${k} .e113-lb-${k}`).join(', ')} { opacity: 1; }
.e113-door { transition: transform .5s ease-in-out; }
.st-door .e113-door { transform: translateX(58px); }
.e113-pm { opacity: 0; transition: opacity .8s; pointer-events: none; }
.st-pm .e113-pm { opacity: .16; }
.e113-sunm { transition: transform 1s; }
.st-pm .e113-sunm { transform: translate(1100px, 30px); }
.e113-hh { transform: rotate(240deg); transition: transform .8s; } .e113-mh { transform: rotate(0deg); }
.st-pm .e113-hh { transform: rotate(120deg); }
.e113-ckring { opacity: 0; transform-box: fill-box; transform-origin: 50% 50%; }
.st-clock .e113-ckring { animation: e113Ring .8s ease-out 3; }
@keyframes e113Ring { from { opacity: 1; transform: scale(.8); } to { opacity: 0; transform: scale(1.5); } }
.e113-rain, .e113-snow, .e113-snowg, .e113-snowcap { opacity: 0; transition: opacity .6s; pointer-events: none; }
.st-rain .e113-rain, .st-snow .e113-snow, .st-snow .e113-snowg, .st-snow .e113-snowcap { opacity: 1; }
.e113-rl { animation: e113Rain .35s linear infinite; }
@keyframes e113Rain { from { transform: translate(0, -14px); } to { transform: translate(-5px, 14px); } }
.st-snow .e113-fl { animation: e113Snow 3.5s linear infinite; }
@keyframes e113Snow { from { transform: translate(0, -40px); } to { transform: translate(-12px, 40px); } }
.e113-ss { opacity: 0; transition: opacity .3s; }
.e113-s-spring { opacity: 1; }
.st-summer .e113-s-spring, .st-autumn .e113-s-spring, .st-winter .e113-s-spring { opacity: 0; }
.st-summer .e113-s-summer, .st-autumn .e113-s-autumn, .st-winter .e113-s-winter { opacity: 1; }
.e113-cal { opacity: 0; transition: opacity .3s; }
.st-cal .e113-cal { opacity: 1; }
.e113-y { opacity: 0; }
${Array.from({ length: 9 }, (_, i) => `.st-y${i + 1} .e113-y${i + 1}`).join(', ')} { opacity: 1; animation: e113Flip .3s ease-out; transform-box: fill-box; transform-origin: 50% 0; }
@keyframes e113Flip { from { transform: scaleY(.2); } to { transform: none; } }
.e113-ins { opacity: 0; transform: scale(.4); transform-origin: 1470px 98px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.4,.6,1); }
.st-ins .e113-ins { opacity: 1; transform: none; }
.e113-ill, .e113-gone { transition: opacity .9s; }
.e113-gone { opacity: 0; }
.st-gone .e113-ill { opacity: 0; } .st-gone .e113-gone { opacity: 1; }
.e113-star { transform-box: fill-box; transform-origin: 50% 50%; animation: e113Tw 1.4s ease-in-out infinite alternate; }
@keyframes e113Tw { from { transform: scale(.7); opacity: .6; } to { transform: scale(1.15); opacity: 1; } }
.e113-q { opacity: 0; transition: opacity .25s; }
.st-q .e113-q { opacity: 1; animation: e113Bob .5s ease-in-out infinite alternate; }
@keyframes e113Bob { to { transform: translateY(-5px); } }
.e113-statue { opacity: 0; transform: translateY(20px); transition: opacity .8s, transform .8s cubic-bezier(.3,1.3,.6,1); }
.st-statue .e113-statue { opacity: 1; transform: none; }
.e113-city { opacity: 0; transition: opacity .8s; }
.st-today .e113-city { opacity: 1; }
.e113-bowl { opacity: 0; transition: opacity .3s; }
.st-bowl .e113-bowl { opacity: 1; }
.st-statue .e113-bowl { opacity: 0; }
/* chó Akita */
.e113-dsit, .e113-des, .e113-dmo { display: none; }
.is-sit .e113-dsit { display: inline; } .is-sit .e113-dstand { display: none; }
.m-joy .e113-dmo { display: inline; } .m-joy .e113-dmc { display: none; }
.m-sad .e113-deo { display: none; } .m-sad .e113-des { display: inline; }
.es-thing.is-walk .e113-dlA { animation: e113Step .26s ease-in-out infinite alternate; }
.es-thing.is-walk .e113-dlB { animation: e113Step .26s ease-in-out infinite alternate-reverse; }
@keyframes e113Step { from { transform: rotate(-20deg); } to { transform: rotate(20deg); } }
.es-thing.is-walk .e113-dbob { animation: e113DBob .13s ease-in-out infinite alternate; }
@keyframes e113DBob { to { transform: translateY(-1.8px); } }
.act-wag .e113-dt { animation: e113Wag .14s ease-in-out infinite alternate; }
@keyframes e113Wag { from { transform: rotate(-12deg); } to { transform: rotate(12deg); } }
.act-jump .e113-dbob { animation: e113Jump .32s cubic-bezier(.3,0,.5,1) infinite alternate; }
@keyframes e113Jump { to { transform: translateY(-14px); } }
.act-tilt .e113-dh { animation: e113Tilt .7s ease-in-out infinite alternate; }
@keyframes e113Tilt { from { transform: rotate(-4deg); } to { transform: rotate(18deg); } }
.act-eat .e113-dh { animation: e113Eat .28s ease-in-out infinite alternate; }
@keyframes e113Eat { from { transform: rotate(10deg); } to { transform: rotate(30deg) translateY(4px); } }
.act-look .e113-dh { animation: e113Look 1.2s ease-in-out infinite alternate; }
@keyframes e113Look { from { transform: rotate(-10deg); } to { transform: rotate(6deg); } }
.es-thing.is-walk .e113-wh { animation: e113Spin .4s linear infinite; transform-box: fill-box; transform-origin: center; }
@keyframes e113Spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .act-wag .e113-dt, .act-jump .e113-dbob, .act-eat .e113-dh { animation-duration: .6s; }
  .es-thing.is-walk .e113-dlA, .es-thing.is-walk .e113-dlB { animation-duration: .5s; }
  .e113-rl { animation-duration: 1s; } .st-snow .e113-fl { animation-duration: 8s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
/** Tàu vào ga: từ bên phải chạy tới chỗ dừng, tiếng bánh lăn; còi khi dừng. */
async function trainIn(st) {
  st.place('train', W + 200, FLOOR - 22, -1); st.show('train', true);
  st.sfx('whistle', { vol: 0.35, rate: 0.8 });
  await st.loop('roll', () => st.walk('train', X.train, { speed: 300, follow: false }), { vol: 0.8 });
  st.sfx('bump', { vol: 0.4, rate: 0.6 });
}

const BEATS = [
  { key: ['Hachiko is a big Akita dog'], icon: '🐕', label: 'Akita dog', async play(st) {
    st.look(330);
    st.dog('hachi', 'stand'); st.act('hachi', 'wag');
    await st.wait(300);
    st.sfx('dog-bark', { vol: 0.6, rate: 0.75 }); st.mood('hachi', 'joy');
    await st.wait(400);
    st.set('st-lb-akita'); st.sfx('ding', { vol: 0.4 });
    await st.wait(1100);
    st.mood('hachi', 'happy');
  } },
  { key: ['He lives in Tokyo, Japan', 'with Professor Ueno'], icon: '🏠', label: 'Professor Ueno', async play(st) {
    st.set('st-lb-akita', false);
    st.set('st-lb-tokyo'); st.sfx('ding', { vol: 0.35 });
    await st.wait(500);
    st.set('st-door'); st.sfx('door-open', { vol: 0.6 });
    await st.wait(400);
    st.show('prof', true);
    await st.walk('prof', 430, { speed: 120, follow: false });
    st.face('prof', -1);
    st.set('st-lb-prof'); st.sfx('pop', { vol: 0.4 });
    st.face('hachi', 1); st.act('hachi', 'wag');
    await st.wait(1000);
  } },
  { key: ['The professor loves his dog very much'], icon: '❤️', label: 'loves his dog', async play(st) {
    off(st, 'st-lb-tokyo', 'st-lb-prof');
    st.pose('prof', 'e113_pat'); st.mood('prof', 'joy');
    st.mood('hachi', 'joy'); st.act('hachi', 'wag');
    await st.wait(500);
    st.fx('hearts', 385, FLOOR - 130);
    await st.wait(1500);
    st.pose('prof', 'stand'); st.mood('hachi', 'happy');
  } },
  { key: ['Every morning', 'walks with him to Shibuya Station'], icon: '🚉', label: 'to Shibuya Station', async play(st) {
    st.set('st-door', false); st.sfx('door-open', { vol: 0.3, rate: 1.2 });
    st.set('st-lb-morning');
    st.mood('prof', 'happy');
    const go = Promise.all([
      st.walk('prof', X.ent - 40, { speed: 175, follow: true, lead: 60 }),
      st.walk('hachi', X.wait, { speed: 175, follow: false }),
    ]);
    await st.wait(900); st.set('st-lb-morning', false);
    await go;
    st.face('prof', -1); st.pose('prof', 'wave'); st.act('prof', 'wave'); st.act('hachi', 'wag');
    await st.wait(700);
    st.act('prof', null); st.face('prof', 1);
    await st.walk('prof', X.ent, { speed: 100, follow: false });
    st.show('prof', false); st.sfx('door-open', { vol: 0.3 });
    await st.wait(300);
  } },
  { key: ['Every afternoon', 'waits at the station'], icon: '🕓', label: 'waits at the station', async play(st) {
    st.set('st-pm'); st.set('st-lb-noon');
    st.look(X.cam);
    st.place('hachi', X.wait - 280, FLOOR, 1);
    await st.walk('hachi', X.wait, { speed: 150, follow: false });
    st.dog('hachi', 'sit'); st.act('hachi', 'look');
    st.set('st-clock'); st.sfx('tick', { vol: 0.5 });
    await st.wait(1300);
    st.set('st-clock', false);
  } },
  { key: ['always comes out of the train with a smile'], icon: '😊', label: 'with a smile', async play(st) {
    st.set('st-lb-noon', false);
    await trainIn(st);
    st.place('prof', X.alight, FLOOR, -1); st.show('prof', true); st.mood('prof', 'joy');
    st.set('st-lb-always');
    await st.walk('prof', X.wait + 90, { speed: 140, follow: false });
    st.pose('prof', 'open');
    st.dog('hachi', 'stand'); st.mood('hachi', 'joy'); st.act('hachi', 'jump');
    st.sfx('dog-bark', { vol: 0.6, rate: 0.8 });
    await st.wait(500);
    st.fx('hearts', X.wait + 40, FLOOR - 120);
    await st.wait(900);
    st.pose('prof', 'stand');
  } },
  { key: ["One day, the professor doesn't come back"], icon: '🚃', label: "doesn't come back", async play(st) {
    st.set('st-lb-always', false);
    st.show('prof', false); st.show('train', false);
    st.mood('hachi', 'happy'); st.dog('hachi', 'sit'); st.face('hachi', 1);
    st.set('st-lb-oneday');
    await trainIn(st);
    for (const [id, x] of [['p1', X.alight], ['lady', X.alight + 40]]) { st.place(id, x, FLOOR, -1); st.show(id, true); }
    const a = st.walk('p1', X.wait - 260, { speed: 150, follow: false });
    await st.wait(500);
    const b = st.walk('lady', X.wait - 200, { speed: 130, follow: false });
    await st.wait(700);
    st.dog('hachi', 'stand'); st.act('hachi', 'look');
    await Promise.all([a, b]);
    st.show('p1', false); st.show('lady', false);
    st.mood('hachi', 'sad');
    await st.wait(600);
  } },
  { key: ['He is very ill at work', 'he dies'], icon: '🕊️', label: 'very ill', async play(st) {
    st.set('st-lb-oneday', false);
    st.set('st-ins'); st.sfx('pop', { vol: 0.3, rate: 0.8 });
    await st.wait(600);
    st.sfx('cough', { vol: 0.35, rate: 0.75 });
    await st.wait(1300);
    st.set('st-gone'); st.sfx('wind', { vol: 0.3 });
    await st.wait(1600);
  } },
  { key: ["But Hachiko doesn't understand"], icon: '❓', label: "doesn't understand", async play(st) {
    off(st, 'st-ins', 'st-gone');
    st.show('train', false);
    st.dog('hachi', 'sit'); st.mood('hachi', 'happy');
    st.set('st-q'); st.sfx('pop', { vol: 0.4 });
    st.act('hachi', 'tilt');
    await st.wait(1500);
    st.set('st-q', false);
  } },
  { key: ['every day at the same time', 'in the rain and in the snow'], icon: '🌧️', label: 'rain and snow', async play(st) {
    st.set('st-lb-every'); st.set('st-clock'); st.sfx('tick', { vol: 0.5 });
    st.act('hachi', 'look');
    await st.wait(800);
    st.set('st-clock', false); st.set('st-lb-every', false);
    st.set('st-rain');
    await st.loop('rain', () => st.wait(1600), { vol: 0.9 });
    st.set('st-rain', false); st.set('st-snow'); st.sfx('wind', { vol: 0.6 });
    st.mood('hachi', 'sad');
    await st.wait(1500);
  } },
  { key: ['He waits for about nine years'], icon: '9️⃣', label: 'nine years', async play(st) {
    st.set('st-snow', false); st.mood('hachi', 'happy');
    st.set('st-cal'); st.set('st-lb-years');
    const SEAS = ['st-summer', 'st-autumn', 'st-winter', null];
    for (let i = 1; i <= 9; i++) {
      if (i > 1) st.set(`st-y${i - 1}`, false);
      st.set(`st-y${i}`); st.sfx('page-turn', { vol: 0.45, rate: 1 + i * 0.03 });
      SEAS.forEach((c) => c && st.set(c, false));
      const s = SEAS[(i - 1) % 4]; if (s) st.set(s);
      await st.wait(330);
    }
    SEAS.forEach((c) => c && st.set(c, false));
    await st.wait(600);
  } },
  { key: ['People often give him food'], icon: '🍙', label: 'give him food', async play(st) {
    off(st, 'st-cal', 'st-lb-years', 'st-y9');
    st.place('lady', X.wait - 300, FLOOR, 1); st.show('lady', true);
    st.place('vendor', X.ent + 180, FLOOR, -1); st.show('vendor', true);
    await Promise.all([
      st.walk('lady', X.wait - 50, { speed: 140, follow: false }),
      st.walk('vendor', X.wait + 80, { speed: 120, follow: false }),
    ]);
    st.pose('vendor', 'give'); st.sfx('whoosh', { vol: 0.3 });
    await st.fly(ONIGIRI, [X.wait + 60, FLOOR - 120], [X.wait + 34, FLOOR - 12], { size: 22, dur: 500 });
    st.set('st-bowl'); st.sfx('bowl-down', { vol: 0.6 });
    st.dog('hachi', 'stand'); st.act('hachi', 'eat');
    st.pose('lady', 'e113_pat'); st.mood('lady', 'joy');
    await st.wait(300); st.sfx('crunch', { vol: 0.6 });
    await st.wait(700); st.sfx('crunch', { vol: 0.5 });
    st.fx('hearts', X.wait, FLOOR - 110, { quiet: true });
    await st.wait(600);
    st.pose('vendor', 'stand'); st.pose('lady', 'stand');
  } },
  { key: ['Today', 'a statue of Hachiko at Shibuya Station'], icon: '🗿', label: 'a statue', async play(st) {
    st.show('hachi', false); st.show('lady', false); st.show('vendor', false);
    st.set('st-pm', false); st.set('st-today'); st.set('st-lb-today');
    st.sfx('sparkle', { vol: 0.5 });
    await st.wait(400);
    st.set('st-statue'); st.fx('sparkle', X.wait, FLOOR - 120, { quiet: true });
    await st.wait(600);
    st.place('tour', X.wait + 260, FLOOR, -1); st.show('tour', true);
    st.place('kid', X.wait + 210, FLOOR, -1); st.show('kid', true);
    await Promise.all([
      st.walk('tour', X.wait + 120, { speed: 130, follow: false }),
      st.walk('kid', X.wait + 70, { speed: 120, follow: false }),
    ]);
    st.pose('kid', 'point'); st.mood('kid', 'joy');
    st.hold('tour', 'phone'); st.pose('tour', 'e113_snap');
    await st.wait(300);
    st.sfx('camera', { vol: 0.7 });
    await st.wait(700);
  } },
];

export default {
  id: 'en113', worldW: W, floor: FLOOR, viewTop: 40, camStart: 20, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: {
    e113_pat: { R: [36, 14], L: [10, 4], head: 8 },
    e113_snap: { R: [120, 200], L: [10, 4], head: -4 },
  },
  order: [0, 3, 5, 6, 9, 12],
  cast: [
    { id: 'train', kind: 'thing', x: W + 200, y: FLOOR - 22, face: -1, svg: TRAIN, box: [-140, -120, 280, 124] },
    { id: 'p1', kind: 'adult', who: 'e113_man', x: X.alight },
    { id: 'lady', kind: 'adult', who: 'e113_lady', x: X.alight },
    { id: 'vendor', kind: 'adult', who: 'e113_vendor', x: X.ent },
    { id: 'tour', kind: 'adult', who: 'e113_tour', x: X.ent },
    { id: 'kid', kind: 'kid', who: 'e113_kid', x: X.ent },
    { id: 'prof', kind: 'adult', who: 'e113_prof', x: X.door },
    { id: 'hachi', kind: 'thing', x: 340, s: 0.95, face: -1, svg: akita(), box: AKITA_BOX },
  ],
  init(st) { for (const id of ['train', 'p1', 'lady', 'vendor', 'tour', 'kid', 'prof']) st.show(id, false); },
};
