/**
 * Bài 39 "Four Seasons": một con đường đi qua bốn mùa của miền Bắc, trái sang phải: bảng bản đồ (bốn mùa) → mùa xuân (hoa đào,
 * nhà ăn Tết, cả nhà vui) → mùa hè (trường nghỉ hè, sông có cầu, Minh bơi) → mùa thu (lá vàng bay, trời xanh, Lan) → mùa đông
 * (cây trơ cành, Minh mặc áo khoác + khăn, Tom) → biển → Úc (bãi biển, cây thông Noel, người tắm biển).
 * Toạ độ cảnh: rộng 3600, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, cloud, tree, bush, flowerAt, sun, label, schoolFront, fence, palm } from '../kit.js';

const FLOOR = 282;

Object.assign(CAST, {
  e039_swim: { hair: 'spiky', top: 'tee', shirt: '#22D3EE', bottom: 'shorts', bottomC: '#F97316', shoe: '#F59E0B' },
  e039_coat: { hair: 'spiky', top: 'jacket', shirt: '#DC2626', inner: '#FDE68A', bottom: 'pants', bottomC: '#1E3A8A', shoe: '#78350F' },
  e039_tomcoat: { hair: 'neat', hairC: '#E0A33A', top: 'jacket', shirt: '#16A34A', inner: '#FFFFFF', bottom: 'pants', bottomC: '#334155', shoe: '#1F2937' },
  e039_surf: { hair: 'neat', hairC: '#A16207', top: 'tee', shirt: '#F97316', bottom: 'shorts', bottomC: '#0EA5E9', shoe: '#FDE68A' },
  e039_girl: { hair: 'pigtails', hairC: '#B45309', top: 'tee', shirt: '#FDE047', bottom: 'skirt', bottomC: '#22D3EE', shoe: '#F472B6' },
});

// ── Biểu tượng mùa (gốc ở giữa, cỡ ~ 24) ─────────────────────────────────
const ICON = {
  spring: `${[0, 72, 144, 216, 288].map((r) => `<ellipse cy="-6" rx="4.6" ry="6.4" fill="#F9A8D4" stroke="${L}" stroke-width="0.7" transform="rotate(${r})"/>`).join('')}<circle r="3.4" fill="#FDE047" stroke="${L}" stroke-width="0.5"/>`,
  summer: `<circle r="7" fill="#FDE047" stroke="#F59E0B" stroke-width="1.4"/>${Array.from({ length: 8 }, (_, i) => `<path d="M0 -10 V-13" stroke="#F59E0B" stroke-width="2.4" stroke-linecap="round" transform="rotate(${i * 45})"/>`).join('')}`,
  autumn: `<path d="M0 -12 L3 -5 L10 -7 L6 0 L11 4 L3 4 L2 11 L0 7 L-2 11 L-3 4 L-11 4 L-6 0 L-10 -7 L-3 -5Z" fill="#F97316" stroke="${L}" stroke-width="0.7"/><path d="M0 -6 V12" stroke="#9A3412" stroke-width="1"/>`,
  winter: `<g stroke="#38BDF8" stroke-width="2" stroke-linecap="round">${[0, 60, 120].map((r) => `<path d="M0 -11 V11 M-3 -8 L0 -5 L3 -8 M-3 8 L0 5 L3 8" transform="rotate(${r})"/>`).join('')}</g>`,
};
const disc = (kind, c) => `<circle r="17" fill="#fff" stroke="${c}" stroke-width="2.4"/><g transform="scale(1.05)">${ICON[kind]}</g>`;
const HEART = (c = '#F43F5E') => `<path d="M0 6 C-10 -2 -8 -10 -3 -10 C-1 -10 0 -8 0 -7 C0 -8 1 -10 3 -10 C8 -10 10 -2 0 6Z" fill="${c}" stroke="${L}" stroke-width="0.7"/>`;
/** Cây đào (hoa hồng, gốc ở đất). */
const peach = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-4 0 Q-6 -30 0 -52 Q-14 -64 -26 -70 M0 -52 Q14 -62 24 -76 M0 -40 Q12 -44 22 -46" stroke="#7C2D12" stroke-width="5" fill="none" stroke-linecap="round"/>
  <g class="e039-blossom">${[[-26, -72], [-14, -82], [0, -64], [10, -86], [24, -78], [22, -48], [-8, -96], [6, -100], [-30, -60], [30, -64]].map(([bx, by], i) => `<g transform="translate(${bx} ${by})">${[0, 72, 144, 216, 288].map((r) => `<ellipse cy="-3.4" rx="2.8" ry="3.8" fill="${i % 3 ? '#F9A8D4' : '#F472B6'}" stroke="${L}" stroke-width="0.4" transform="rotate(${r})"/>`).join('')}<circle r="1.6" fill="#FDE047"/></g>`).join('')}</g></g>`;
/** Cây mùa thu (lá cam vàng). */
const autumnTree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="-60" width="12" height="60" rx="3" fill="#A16207" stroke="${L}"/>
  <g class="e039-sway"><circle cx="0" cy="-86" r="34" fill="#F59E0B" stroke="${L}"/><circle cx="-22" cy="-70" r="20" fill="#EA580C" stroke="${L}"/><circle cx="22" cy="-72" r="22" fill="#FBBF24" stroke="${L}"/></g></g>`;
/** Cây mùa đông trơ cành. */
const bareTree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-5 0 Q-4 -50 0 -80 M0 -60 Q-20 -76 -34 -96 M-18 -74 Q-30 -76 -38 -70 M0 -70 Q18 -86 30 -104 M18 -86 Q28 -88 36 -82 M0 -80 Q2 -100 -4 -116"
  stroke="#78350F" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-36 -98 q4 -3 8 0 M28 -106 q4 -3 8 0" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>`;
const xmasTree = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-6" y="-14" width="12" height="14" fill="#92400E" stroke="${L}"/>
  ${[[-38, -14, -50], [-32, -42, -76], [-24, -66, -100]].map(([w, y0, y1]) => `<path d="M${w} ${y0} L0 ${y1} L${-w} ${y0}Z" fill="#16A34A" stroke="${L}" stroke-width="1.1"/>`).join('')}
  <g class="e039-lights">${[[-20, -22, '#EF4444'], [14, -26, '#FACC15'], [-8, -40, '#3B82F6'], [16, -50, '#EF4444'], [-14, -58, '#FACC15'], [6, -72, '#3B82F6'], [-6, -86, '#EF4444']].map(([cx, cy, c]) => `<circle cx="${cx}" cy="${cy}" r="3.4" fill="${c}" stroke="${L}" stroke-width="0.5"/>`).join('')}</g>
  <path d="M0 -112 L3.5 -104 L12 -104 L5 -99 L8 -91 L0 -96 L-8 -91 L-5 -99 L-12 -104 L-3.5 -104Z" fill="#FACC15" stroke="${L}" stroke-width="0.8"/></g>`;
/** Khăn quàng cổ (trước ngực, gốc = giữa ngực của trẻ em). */
const SCARF = (c, c2) => `<path d="M-10 -30 Q0 -22 10 -30 L10 -23 Q0 -16 -10 -23Z" fill="${c}" stroke="${L}" stroke-width="0.8"/>
  <path d="M3 -22 L9 -22 L11 -2 L5 -1Z" fill="${c}" stroke="${L}" stroke-width="0.8"/><path d="M5 -6 H11 M4.6 -10 H10.6" stroke="${c2}" stroke-width="1.6"/>`;
/** Mũ ông già Noel (trước ngực = gốc giữa ngực; đội lên đỉnh đầu). */
const SANTA = (adult) => adult
  ? `<g transform="translate(0 -60)"><path d="M-14 4 Q-4 -18 16 -10 L22 2" fill="#DC2626" stroke="${L}" stroke-width="0.8"/><rect x="-16" y="0" width="30" height="7" rx="3.5" fill="#fff" stroke="${L}" stroke-width="0.7"/><circle cx="22" cy="2" r="4" fill="#fff" stroke="${L}" stroke-width="0.6"/></g>`
  : `<g transform="translate(0 -67)"><path d="M-15 4 Q-4 -18 16 -10 L22 2" fill="#DC2626" stroke="${L}" stroke-width="0.8"/><rect x="-17" y="0" width="32" height="7" rx="3.5" fill="#fff" stroke="${L}" stroke-width="0.7"/><circle cx="22" cy="2" r="4" fill="#fff" stroke="${L}" stroke-width="0.6"/></g>`;
/** Máy bay (gốc giữa thân, bay sang phải). */
const PLANE = `<g class="e039-planebob"><path d="M-50 -4 Q-50 -14 -36 -14 L34 -14 Q52 -12 56 -2 Q52 6 34 6 L-36 6 Q-50 6 -50 -4Z" fill="#fff" stroke="${L}" stroke-width="1.2"/>
  <path d="M-44 -12 L-54 -34 L-40 -34 L-26 -14Z" fill="#3B82F6" stroke="${L}" stroke-width="1"/><path d="M-6 0 L-24 24 L-10 24 L14 0Z" fill="#60A5FA" stroke="${L}" stroke-width="1"/>
  ${[-26, -14, -2, 10, 22].map((x) => `<circle cx="${x}" cy="-6" r="3" fill="#BAE6FD" stroke="${L}" stroke-width="0.6"/>`).join('')}<path d="M40 -10 Q50 -10 52 -4 L40 -4Z" fill="#BAE6FD" stroke="${L}" stroke-width="0.6"/></g>`;
/** Khăn tắm + ô che nắng của bãi biển. */
const parasol = (x, y, c) => `<g transform="translate(${x} ${y})"><path d="M0 0 V-74" stroke="${L}" stroke-width="2"/><path d="M-40 -66 Q0 -100 40 -66 Q30 -72 20 -66 Q10 -72 0 -66 Q-10 -72 -20 -66 Q-30 -72 -40 -66Z" fill="${c}" stroke="${L}" stroke-width="1"/></g>`;

function bg() {
  return `
  <defs>
    <linearGradient id="e039sky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="3600" y2="0">
      <stop offset="0" stop-color="#8FD3F7"/><stop offset="0.25" stop-color="#9ADBF8"/><stop offset="0.33" stop-color="#4FC3F7"/><stop offset="0.45" stop-color="#4FC3F7"/>
      <stop offset="0.53" stop-color="#3B9BEA"/><stop offset="0.6" stop-color="#3B9BEA"/><stop offset="0.66" stop-color="#AFC2D4"/><stop offset="0.77" stop-color="#AFC2D4"/>
      <stop offset="0.84" stop-color="#5BC0F5"/><stop offset="1" stop-color="#38BDF8"/></linearGradient>
    <linearGradient id="e039blueg" gradientUnits="userSpaceOnUse" x1="1640" y1="0" x2="2340" y2="0"><stop offset="0" stop-color="#1D7FE0" stop-opacity="0"/><stop offset="0.2" stop-color="#1D7FE0"/><stop offset="0.8" stop-color="#1D7FE0"/><stop offset="1" stop-color="#1D7FE0" stop-opacity="0"/></linearGradient>
    <linearGradient id="e039hill" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="2800" y2="0"><stop offset="0" stop-color="#BBF7D0"/><stop offset="0.36" stop-color="#A7F3D0"/><stop offset="0.6" stop-color="#A7F3D0"/><stop offset="0.65" stop-color="#E9DC8A"/><stop offset="0.78" stop-color="#E9DC8A"/><stop offset="0.83" stop-color="#E2E8F0"/><stop offset="1" stop-color="#E2E8F0"/></linearGradient>
    <linearGradient id="e039ground" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="2820" y2="0"><stop offset="0" stop-color="#4ADE80"/><stop offset="0.36" stop-color="#4ADE80"/><stop offset="0.39" stop-color="#22C55E"/><stop offset="0.58" stop-color="#22C55E"/><stop offset="0.63" stop-color="#C7B04A"/><stop offset="0.77" stop-color="#C7B04A"/><stop offset="0.82" stop-color="#CBD5E1"/><stop offset="1" stop-color="#CBD5E1"/></linearGradient>
    <linearGradient id="e039haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="0.6"/></linearGradient>
  </defs>
  <rect x="0" y="0" width="3600" height="315" fill="url(#e039sky)"/>
  <rect class="e039-blue" x="1640" y="0" width="700" height="315" fill="url(#e039blueg)"/>
  <rect x="0" y="120" width="3600" height="195" fill="url(#e039haze)"/>
  ${cloud(160, 60, 0.9, 0)}${cloud(700, 52, 1, 2)}${cloud(1500, 70, 0.8, 4)}${cloud(1980, 56, 0.7, 1)}
  <g opacity="0.9">${[2380, 2560, 2720].map((x, i) => `<g transform="translate(${x} ${66 + (i % 2) * 14}) scale(1.3)"><g class="ek-cloud" style="animation-delay:${i}s"><ellipse rx="40" ry="14" fill="#E2E8F0"/><ellipse cx="-16" cy="-8" rx="18" ry="12" fill="#E2E8F0"/><ellipse cx="14" cy="-10" rx="20" ry="13" fill="#E2E8F0"/></g></g>`).join('')}</g>
  ${cloud(3200, 50, 0.9, 3)}
  <!-- biển (giữa mùa đông và nước Úc) -->
  <rect x="2700" y="214" width="900" height="72" fill="#38BDF8" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: 18 }, (_, i) => `<path d="M${2820 + i * 42} ${226 + (i % 3) * 14} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <!-- đồi xa theo mùa -->
  <path d="M0 236 Q240 200 520 230 T1050 224 T1700 228 T2260 226 T2780 232 Q2830 240 2862 282 H0Z" fill="url(#e039hill)" stroke="${L}" stroke-width="0.8"/>
  <!-- mặt đất theo mùa -->
  <rect x="0" y="${FLOOR - 4}" width="2820" height="40" fill="url(#e039ground)" stroke="${L}"/>${Array.from({ length: 10 }, (_, i) => `<ellipse cx="${2290 + i * 54}" cy="${FLOOR + 10 + (i % 2) * 8}" rx="16" ry="3" fill="#fff" opacity="0.8"/>`).join('')}
  <path d="M2980 ${FLOOR - 6} Q3000 256 3060 252 H3600 V315 H2980Z" fill="#FDE68A" stroke="${L}"/>
  <path d="M2820 ${FLOOR - 4} Q2900 ${FLOOR - 14} 2990 ${FLOOR - 6} V315 H2820Z" fill="#38BDF8"/>
  ${Array.from({ length: 22 }, (_, i) => `<path d="M${30 + i * 46} ${FLOOR + 12} l3 -7 l3 7" stroke="#15803D" stroke-width="1.4" fill="none"/>`).join('')}

  <!-- Bảng bản đồ: miền Bắc có bốn mùa -->
  <g transform="translate(200 0)">
    <path d="M-80 ${FLOOR} V150 M80 ${FLOOR} V150" stroke="#92400E" stroke-width="7"/>
    <rect x="-96" y="78" width="192" height="128" rx="8" fill="#FEF3C7" stroke="${L}" stroke-width="1.6"/>
    <text x="0" y="98" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#B91C1C">VIETNAM</text>
    <g transform="translate(-50 104)">
      <path d="M-14 4 Q4 -2 22 6 Q20 18 8 24 Q2 32 6 42 Q14 56 22 70 Q26 84 18 96 Q8 100 2 92 Q8 80 2 66 Q-6 52 -8 40 Q-12 28 -20 20 Q-24 10 -14 4Z" fill="#86EFAC" stroke="${L}" stroke-width="1"/>
      <path class="e039-north" d="M-14 4 Q4 -2 22 6 Q20 18 8 24 Q-2 28 -10 26 Q-16 24 -20 20 Q-24 10 -14 4Z" fill="#F87171" stroke="${L}" stroke-width="1"/>
      <path d="M2 10 l1.6 3.6 h3.8 l-3 2.4 1.2 3.8 -3.6 -2.2 -3.6 2.2 1.2 -3.8 -3 -2.4 h3.8Z" fill="#FDE047"/>
    </g>
    <g class="e039-lb e039-lb-north">${label(-50, 202, 'the north', '#B91C1C', 11)}</g>
    ${[['spring', 18, 126, '#F472B6'], ['summer', 62, 126, '#F59E0B'], ['autumn', 18, 170, '#EA580C'], ['winter', 62, 170, '#0EA5E9']].map(([k, x, y, c], i) => `<g transform="translate(${x} ${y})"><g class="e039-disc e039-disc${i}">${disc(k, c)}</g></g>`).join('')}
    <g class="e039-lb e039-lb-four">${label(40, 72, '4 seasons', '#7C3AED', 14)}</g>
  </g>

  <!-- MÙA XUÂN: hoa đào, nhà ăn Tết -->
  ${peach(520, FLOOR - 2, 1.2)}${peach(1010, FLOOR - 2, 1.0)}
  <g transform="translate(820 0)">
    <path d="M-110 150 L0 96 L110 150Z" fill="#B91C1C" stroke="${L}" stroke-width="1.4"/>
    <rect x="-96" y="150" width="192" height="${FLOOR - 150}" fill="#FEF3C7" stroke="${L}" stroke-width="1.4"/>
    <rect x="-24" y="190" width="48" height="${FLOOR - 190}" fill="#B45309" stroke="${L}"/>
    <g class="e039-tet">
      <rect x="-44" y="176" width="12" height="70" fill="#DC2626" stroke="${L}" stroke-width="0.8"/><rect x="32" y="176" width="12" height="70" fill="#DC2626" stroke="${L}" stroke-width="0.8"/>
      ${[0, 1, 2, 3].map((i) => `<path d="M-38 ${188 + i * 15} h0.1 M38 ${188 + i * 15} h0.1" stroke="#FACC15" stroke-width="6" stroke-linecap="round"/>`).join('')}
      <rect x="-30" y="160" width="60" height="16" rx="3" fill="#DC2626" stroke="${L}" stroke-width="0.8"/><text x="0" y="172" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="11" fill="#FACC15">HAPPY TET</text>
      ${[-74, 74].map((x) => `<g transform="translate(${x} 150)"><path d="M0 0 V10" stroke="${L}"/><g class="e039-lantern" style="transform-origin:0px 0px"><ellipse cx="0" cy="22" rx="11" ry="13" fill="#EF4444" stroke="${L}"/><rect x="-6" y="8" width="12" height="3" fill="#FACC15"/><rect x="-6" y="33" width="12" height="3" fill="#FACC15"/><path d="M0 36 V46" stroke="#FACC15" stroke-width="2"/></g></g>`).join('')}
    </g>
  </g>
  <!-- bàn bánh chưng + cây quất -->
  <g transform="translate(975 0)"><rect x="-26" y="246" width="52" height="6" rx="2" fill="#B45309" stroke="${L}"/><path d="M-20 252 V${FLOOR} M20 252 V${FLOOR}" stroke="#92400E" stroke-width="3"/>
    ${[-12, 10].map((x) => `<rect x="${x - 9}" y="230" width="18" height="16" fill="#16A34A" stroke="${L}" stroke-width="0.8"/><path d="M${x} 230 V246 M${x - 9} 238 H${x + 9}" stroke="#FDE68A" stroke-width="1.4"/>`).join('')}</g>
  <g class="e039-flowers">${Array.from({ length: 22 }, (_, i) => `<g transform="translate(${440 + i * 28} ${FLOOR + 4 + (i % 3) * 6})"><g class="e039-bloom" style="transition-delay:${(i % 7) * 0.08}s">${flowerAt(0, 0, ['#F472B6', '#FACC15', '#F87171', '#C084FC'][i % 4])}</g></g>`).join('')}</g>
  <g class="e039-lb e039-lb-spring">${label(600, 110, 'spring', '#DB2777', 18)}</g>
  <g class="e039-lb e039-lb-warm">${label(600, 140, 'warm', '#EA580C', 14)}</g>

  <!-- MÙA HÈ: trường nghỉ hè, mặt trời to, sông có cầu -->
  <g transform="translate(1370 76)"><g class="e039-hotsun">${sun(28)}</g></g>
  <g class="e039-heat">${[1180, 1250, 1330, 1400].map((x, i) => `<path d="M${x} 214 q6 -8 0 -16 q-6 -8 0 -16" stroke="#FB923C" stroke-width="2.4" fill="none" stroke-linecap="round" style="animation-delay:${i * 0.2}s"/>`).join('')}</g>
  ${schoolFront(1170, FLOOR)}
  <g class="e039-closed"><path d="M1146 210 L1194 270 M1194 210 L1146 270" stroke="#DC2626" stroke-width="6" stroke-linecap="round"/></g>
  ${fence(1060, 80, FLOOR)}${fence(1290, 80, FLOOR)}
  <g class="e039-lb e039-lb-noschool">${label(1170, 64, 'NO SCHOOL', '#DC2626', 15)}</g>
  <g class="e039-lb e039-lb-hot">${label(1384, 178, 'very hot 36°C', '#DC2626', 13)}</g>
  <g class="e039-lb e039-lb-summer">${label(1384, 150, 'summer', '#D97706', 17)}</g>
  <!-- sông (nước sau cầu) -->
  <rect x="1440" y="${FLOOR + 2}" width="220" height="40" fill="#38BDF8" stroke="${L}"/>
  ${tree(1700, FLOOR - 2, 0.9, '')}

  <!-- MÙA THU -->
  ${autumnTree(1790, FLOOR - 4, 1.05)}${autumnTree(2170, FLOOR - 4, 0.95)}
  <g class="e039-lb e039-lb-autumn">${label(1960, 104, 'autumn', '#EA580C', 18)}</g>
  <g class="e039-lb e039-lb-windy">${label(1960, 134, 'cool and windy', '#0369A1', 13)}</g>
  <g class="e039-lb e039-lb-blue">${label(2000, 76, 'blue sky', '#1D4ED8', 16)}</g>

  <!-- MÙA ĐÔNG -->
  ${bareTree(2330, FLOOR - 2, 1)}${bareTree(2740, FLOOR - 2, 0.9)}
  <g transform="translate(2620 150)"><rect x="-7" y="-4" width="14" height="60" rx="7" fill="#fff" stroke="${L}"/><circle cy="62" r="9" fill="#38BDF8" stroke="${L}"/>
    <g transform="translate(0 60)"><g class="e039-merc"><rect x="-3.4" y="-52" width="6.8" height="52" fill="#38BDF8"/></g></g></g>
  <g class="e039-lb e039-lb-winter">${label(2470, 104, 'winter', '#0284C7', 18)}</g>
  <g class="e039-lb e039-lb-cold">${label(2470, 134, 'cold 10°C', '#0369A1', 14)}</g>
  <!-- bảng lịch của Tom: mùa đông ở Úc -->
  <g transform="translate(2600 112)"><g class="e039-cal">
    <rect x="-70" y="-44" width="140" height="80" rx="6" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="-70" y="-44" width="140" height="18" rx="6" fill="#0EA5E9" stroke="${L}" stroke-width="1.4"/>
    <text x="0" y="-30" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="12" fill="#fff">AUSTRALIA</text>
    <g transform="translate(-48 0) scale(1.1)">${ICON.winter}</g>
    <text x="12" y="0" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#0369A1">JUNE</text>
    <text x="12" y="22" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#0369A1">JULY</text></g></g>
  <!-- ý nghĩ của Minh: thích hè, yêu Tết -->
  <g transform="translate(2490 104)"><g class="e039-like">
    <path d="M-80 0 Q-90 -26 -62 -30 Q-52 -52 -20 -46 Q4 -60 30 -46 Q60 -52 68 -30 Q92 -24 82 2 Q86 26 56 26 Q30 36 0 26 Q-30 36 -54 26 Q-86 28 -80 0Z" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <circle cx="-4" cy="40" r="4" fill="#fff" stroke="${L}" stroke-width="0.8"/><circle cx="-10" cy="52" r="3" fill="#fff" stroke="${L}" stroke-width="0.8"/>
    <g transform="translate(-48 -6) scale(1.3)">${ICON.summer}</g><g class="e039-h1" transform="translate(-20 8)">${HEART()}</g>
    <g transform="translate(24 -6) scale(1.3)">${ICON.spring}</g>
    <g transform="translate(14 -24)"><path d="M0 0 V6" stroke="${L}"/><ellipse cx="0" cy="13" rx="6" ry="7" fill="#EF4444" stroke="${L}" stroke-width="0.8"/></g>
    <g class="e039-h2"><g transform="translate(52 0)">${HEART()}</g><g transform="translate(64 14)">${HEART()}</g></g>
    <text x="38" y="22" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="10" fill="#B91C1C">TET</text>
  </g></g>
  <!-- câu hỏi cuối: bốn mùa -->
  <g transform="translate(2500 104)"><g class="e039-ask">${['spring', 'summer', 'autumn', 'winter'].map((k, i) => `<g transform="translate(${-84 + i * 56} 0)"><g class="e039-askd" style="animation-delay:${i * 0.15}s">${disc(k, ['#F472B6', '#F59E0B', '#EA580C', '#0EA5E9'][i])}</g></g>`).join('')}
    <text x="0" y="-26" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="26" fill="#F97316" stroke="${L}" stroke-width="0.8">?</text></g></g>

  <!-- ÚC: bãi biển, cây thông Noel -->
  <g transform="translate(3196 92)"><rect x="-56" y="-16" width="112" height="28" rx="6" fill="#fff" stroke="${L}" stroke-width="1.2"/><text x="0" y="5" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#0369A1">AUSTRALIA</text>
    <path d="M0 12 V${FLOOR - 104}" stroke="#92400E" stroke-width="4"/></g>
  <g transform="translate(3460 70)">${sun(24)}</g>
  ${palm(3560, 256, 1)}
  ${parasol(3420, 270, '#F472B6')}
  <rect x="3380" y="262" width="54" height="10" rx="2" fill="#38BDF8" stroke="${L}" stroke-width="0.8"/>
  ${xmasTree(3250, 262)}
  <g class="e039-lb e039-lb-xmas">${label(3250, 124, 'Christmas', '#16A34A', 15)}</g>
  <g class="e039-lb e039-lb-hot2">${label(3440, 124, 'hot!', '#DC2626', 16)}</g>`;
}

function fg() {
  return `
  <!-- nước sông phía trước + cầu gỗ -->
  <g opacity="0.92"><rect x="1440" y="296" width="220" height="20" fill="#0EA5E9"/>
    <g class="ek-wave">${[1450, 1500, 1550, 1600].map((x) => `<path d="M${x} 302 q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none"/>`).join('')}</g></g>
  <rect x="1428" y="${FLOOR - 4}" width="244" height="9" rx="2" fill="#B45309" stroke="${L}"/>
  ${[1440, 1500, 1600, 1660].map((x) => `<rect x="${x - 3}" y="${FLOOR + 4}" width="6" height="30" fill="#92400E" stroke="${L}" stroke-width="0.7"/>`).join('')}
  <!-- lá bay (mùa thu) -->
  <g class="e039-leaves">${Array.from({ length: 12 }, (_, i) => `<g transform="translate(${1730 + i * 44} ${90 + (i % 4) * 30})"><g class="e039-leaf" style="animation-delay:${-i * 0.37}s"><g transform="scale(0.6) rotate(${i * 40})">${ICON.autumn}</g></g></g>`).join('')}</g>
  <g class="e039-wind">${[[1760, 150], [1900, 120], [2040, 170], [1840, 200]].map(([x, y], i) => `<path d="M${x} ${y} q30 -10 60 0 t60 0 q14 6 6 14" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" style="animation-delay:${i * 0.25}s"/>`).join('')}</g>
  <!-- gió lạnh mùa đông -->
  <g class="e039-cold">${[[2300, 160], [2420, 196], [2560, 140]].map(([x, y], i) => `<path d="M${x} ${y} q24 -8 48 0 t48 0" stroke="#E0F2FE" stroke-width="2.4" fill="none" stroke-linecap="round" style="animation-delay:${i * 0.3}s"/>`).join('')}</g>
  ${bush(3010, FLOOR + 14, 1, '#4ADE80')}`;
}

const CSS = `
.e039-lb { opacity: 0; transition: opacity .35s; }
${['north', 'four', 'spring', 'warm', 'noschool', 'hot', 'summer', 'autumn', 'windy', 'blue', 'winter', 'cold', 'xmas', 'hot2'].map((k) => `.st-lb-${k} .e039-lb-${k}`).join(', ')} { opacity: 1; }
.e039-north { transition: fill .4s; } .st-north .e039-north { animation: e039Blink .5s ease-in-out infinite alternate; }
@keyframes e039Blink { to { opacity: .45; } }
.e039-disc { transform: scale(0); transition: transform .5s cubic-bezier(.3,1.6,.6,1); }
.st-four .e039-disc { transform: scale(1); }
.e039-disc1 { transition-delay: .25s; } .e039-disc2 { transition-delay: .5s; } .e039-disc3 { transition-delay: .75s; }
.e039-blossom { transform: scale(.2); opacity: .3; transform-origin: 0 -70px; transition: transform 1s cubic-bezier(.3,1.4,.6,1), opacity .6s; }
.st-spring .e039-blossom { transform: scale(1); opacity: 1; }
.e039-bloom { transform: scale(0); transition: transform .6s cubic-bezier(.3,1.6,.6,1); }
.st-spring .e039-bloom { transform: scale(1); }
.e039-tet { opacity: 0; transition: opacity .5s; } .st-tet .e039-tet { opacity: 1; }
.st-tet .e039-lantern { animation: e039Swing 1.2s ease-in-out infinite alternate; }
@keyframes e039Swing { from { transform: rotate(-8deg); } to { transform: rotate(8deg); } }
.e039-hotsun { transition: transform 1s cubic-bezier(.3,1.6,.6,1); } .st-hot .e039-hotsun { transform: scale(1.35); }
.e039-heat path { opacity: 0; } .st-hot .e039-heat path { animation: e039Heat 1s ease-in-out infinite alternate; }
@keyframes e039Heat { from { opacity: .2; transform: translateY(4px); } to { opacity: 1; transform: translateY(-4px); } }
.e039-closed { opacity: 0; transition: opacity .3s; } .st-noschool .e039-closed { opacity: 1; }
.e039-sway { transform-origin: 0 -60px; animation: e039Sway 3.6s ease-in-out infinite alternate; }
@keyframes e039Sway { from { transform: rotate(-1.6deg); } to { transform: rotate(1.6deg); } }
.st-windy .e039-sway { animation: e039Wsway .6s ease-in-out infinite alternate; }
@keyframes e039Wsway { from { transform: rotate(-2deg); } to { transform: rotate(6deg); } }
.e039-leaf { animation: e039Leaf 5s linear infinite; opacity: .9; }
@keyframes e039Leaf { 0% { transform: translate(0, -30px) rotate(0); opacity: 0; } 10% { opacity: .9; } 90% { opacity: .9; } 100% { transform: translate(-30px, 150px) rotate(220deg); opacity: 0; } }
.st-windy .e039-leaf { animation: e039LeafW 2s linear infinite; }
@keyframes e039LeafW { 0% { transform: translate(-40px, -20px) rotate(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translate(160px, 120px) rotate(400deg); opacity: 0; } }
.e039-wind path { opacity: 0; } .st-windy .e039-wind path { animation: e039Wind 1.2s ease-out infinite; }
@keyframes e039Wind { from { opacity: 0; transform: translateX(-30px); } 40% { opacity: .95; } to { opacity: 0; transform: translateX(50px); } }
.e039-blue { opacity: 0; transition: opacity 1.2s; } .st-blue .e039-blue { opacity: .55; }
.e039-merc { transform-origin: 0 0; transform: scaleY(.9); transition: transform 1.4s ease-out; } .st-cold .e039-merc { transform: scaleY(.25); }
.e039-cold path { opacity: 0; } .st-cold .e039-cold path { animation: e039Wind 1.6s ease-out infinite; }
.e039-cal, .e039-like, .e039-ask { opacity: 0; transform: scale(.3); transition: opacity .35s, transform .55s cubic-bezier(.3,1.5,.6,1); }
.e039-cal { transform-origin: 0 40px; } .e039-like { transform-origin: -6px 50px; } .e039-ask { transform-origin: 0 40px; }
.st-cal .e039-cal, .st-like .e039-like, .st-ask .e039-ask { opacity: 1; transform: scale(1); }
.e039-h1, .e039-h2 { opacity: 0; transition: opacity .4s; } .st-like1 .e039-h1, .st-like2 .e039-h2 { opacity: 1; }
.st-like2 .e039-h2 { animation: e039Beat .5s ease-in-out infinite alternate; transform-origin: 58px 6px; }
@keyframes e039Beat { to { transform: scale(1.15); } }
.st-ask .e039-askd { animation: e039Bounce .5s ease-in-out infinite alternate; }
@keyframes e039Bounce { to { transform: translateY(-5px); } }
.e039-lights circle { animation: e039Twinkle .7s steps(2) infinite; } .e039-lights circle:nth-child(2n) { animation-delay: -.35s; }
@keyframes e039Twinkle { 50% { opacity: .35; } }
.e039-planebob { animation: e039Bounce 1s ease-in-out infinite alternate; }
@media (prefers-reduced-motion: reduce) { .e039-leaf, .e039-sway, .e039-planebob { animation-duration: 8s; } }
`;

/** Nhảy (bật lên rồi rơi) tới (x, y): xuống sông, lên bờ. */
async function hop(st, id, x, y, dur = 650) {
  const A = st.a(id);
  if (st.instant) { A.x = x; A.y = y; A.place(); return; }
  const from = A.tf(), mid = A.tf((A.x + x) / 2, Math.min(A.y, y) - 36);
  A.x = x; A.y = y;
  const to = A.tf();
  A.anim?.cancel();
  A.anim = A.el.animate([{ transform: from }, { transform: mid, offset: 0.4 }, { transform: to }], { duration: dur, easing: 'ease-in-out', fill: 'forwards' });
  await A.anim.finished.catch(() => {});
  A.place();
}

const BEATS = [
  { key: ['four seasons'], icon: '🗓️', label: 'four seasons', async play(st) {
    st.look(240);
    st.pose('minh', 'point'); st.set('st-north'); st.set('st-lb-north');
    await st.wait(900);
    st.set('st-four'); st.set('st-lb-four'); st.sfx('sparkle', { vol: 0.6 });
    st.mood('minh', 'joy'); st.mood('lan', 'joy');
    await st.wait(1600);
    st.set('st-north', false); st.pose('minh', 'stand'); st.mood('minh', 'happy'); st.mood('lan', 'happy');
  } },
  { key: ['Spring is warm', 'flowers everywhere'], icon: '🌸', label: 'spring', async play(st) {
    st.set('st-lb-north', false); st.set('st-lb-four', false);
    await Promise.all([
      st.walk('minh', 600, { speed: 170, lead: 40 }),
      st.walk('lan', 650, { speed: 170, follow: false }),
    ]);
    st.set('st-spring'); st.set('st-lb-spring'); st.sfx('birds', { vol: 0.6 });
    st.pose('lan', 'open'); st.mood('lan', 'joy');
    await st.wait(700);
    st.set('st-lb-warm'); st.fx('sparkle', 560, 200);
    await st.wait(1100);
    st.pose('lan', 'stand'); st.mood('lan', 'happy');
  } },
  { key: ['Tet', 'everyone is happy'], icon: '🧧', label: 'Tet', async play(st) {
    st.set('st-lb-spring', false); st.set('st-lb-warm', false);
    st.look(800);
    st.set('st-tet'); st.sfx('sparkle');
    await st.wait(600);
    for (const id of ['minh', 'lan', 'mum', 'dad', 'grandpa', 'grandma']) { st.mood(id, 'joy'); }
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.pose('lan', 'cheer'); st.act('lan', 'jump');
    st.pose('mum', 'clap'); st.act('mum', 'clap'); st.pose('dad', 'wave'); st.act('dad', 'wave');
    st.pose('grandpa', 'wave'); st.act('grandpa', 'wave'); st.pose('grandma', 'clap'); st.act('grandma', 'clap');
    st.fx('hearts', 820, 120);
    await st.wait(1800);
    for (const id of ['minh', 'lan', 'mum', 'dad', 'grandpa', 'grandma']) { st.act(id, null); st.pose(id, 'stand'); st.mood(id, 'happy'); }
  } },
  { key: ['very hot', 'no school'], icon: '☀️', label: 'very hot', async play(st) {
    await Promise.all([
      st.walk('minh', 1300, { speed: 230, lead: -20 }),
      st.walk('lan', 1250, { speed: 230, follow: false }),
    ]);
    st.set('st-hot'); st.set('st-lb-summer'); st.set('st-lb-hot');
    st.pose('minh', 'e039_fan'); st.mood('minh', 'shut');
    await st.wait(1100);
    st.set('st-noschool'); st.set('st-lb-noschool');
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    st.pose('lan', 'cheer'); st.act('lan', 'jump'); st.mood('lan', 'joy');
    await st.wait(1500);
    st.act('minh', null); st.act('lan', null); st.pose('minh', 'stand'); st.pose('lan', 'stand');
  } },
  { key: ['goes swimming'], icon: '🏊', label: 'swimming', async play(st) {
    st.set('st-lb-noschool', false); st.set('st-lb-hot', false);
    await st.walk('minh', 1500, { speed: 180, lead: 40 });
    await st.dress('minh', 'e039_swim');
    await st.wait(200);
    st.pose('minh', 'cheer');
    st.sfx('poof', { vol: 0.4 });
    await hop(st, 'minh', 1550, 350, 700);
    st.fx('drops', 1550, 290); st.fx('bubbles', 1550, 290, { quiet: true });
    st.pose('minh', 'swim'); st.act('minh', 'swim'); st.mood('minh', 'joy');
    await st.wait(1600);
    st.fx('drops', 1556, 284);
    await st.wait(400);
  } },
  { key: ['cool and windy'], icon: '🍂', label: 'autumn', async play(st) {
    st.act('minh', null); st.pose('minh', 'stand'); st.set('st-lb-summer', false);
    await hop(st, 'minh', 1600, FLOOR, 600);
    await st.dress('minh', 'en_minh_home');
    await Promise.all([
      st.walk('minh', 1940, { speed: 220, lead: 20 }),
      st.walk('lan', 1990, { speed: 260, follow: false }),
    ]);
    st.set('st-windy'); st.set('st-lb-autumn'); st.set('st-lb-windy');
    st.pose('minh', 'e039_hug'); st.act('lan', 'hop');
    await st.wait(2000);
    st.act('lan', null); st.pose('minh', 'stand');
  } },
  { key: ['the sky is blue'], icon: '💙', label: 'blue sky', async play(st) {
    st.set('st-lb-autumn', false); st.set('st-lb-windy', false);
    st.look(1980);
    st.set('st-blue');
    st.pose('lan', 'pointUp'); st.act('lan', 'point'); st.mood('lan', 'joy');
    await st.wait(700);
    st.set('st-lb-blue'); st.fx('hearts', 1990, 140);
    await st.wait(1500);
    st.act('lan', null);
  } },
  { key: ['Winter is cold', 'a coat and a scarf'], icon: '🧣', label: 'coat and scarf', async play(st) {
    st.set('st-lb-blue', false); st.pose('lan', 'wave');
    await st.walk('minh', 2440, { speed: 220, lead: 40 });
    st.set('st-cold'); st.set('st-lb-winter'); st.set('st-lb-cold');
    st.act('minh', 'shiver'); st.mood('minh', 'shut'); st.pose('minh', 'e039_hug');
    await st.wait(1100);
    st.act('minh', null);
    await st.dress('minh', 'e039_coat');
    st.chest('minh', SCARF('#FACC15', '#2563EB')); st.pose('minh', 'stand'); st.mood('minh', 'joy');
    st.fx('sparkle', 2440, 200);
    await st.wait(900);
    st.mood('minh', 'happy');
  } },
  { key: ['surprised', 'June and July'], icon: '😮', label: 'June and July', async play(st) {
    st.set('st-lb-winter', false); st.set('st-lb-cold', false);
    st.look(2540);
    st.mood('tom', 'wow'); st.pose('tom', 'open');
    await st.wait(500);
    st.set('st-cal'); st.sfx('page-turn');
    await st.wait(900);
    st.pose('tom', 'pointUp'); st.act('tom', 'point');
    await st.wait(1200);
    st.act('tom', null);
  } },
  { key: ['hot at Christmas', 'go to the beach'], icon: '🏖️', label: 'beach', async play(st) {
    st.set('st-cal', false); st.pose('tom', 'stand'); st.mood('tom', 'happy');
    st.show('plane', true);
    await st.walk('plane', 3260, { speed: 520, lead: 60 });
    st.show('plane', false);
    st.set('st-lb-xmas'); st.set('st-lb-hot2');
    await Promise.all([
      st.walk('surfer', 3380, { speed: 140, follow: false }),
      st.walk('girl', 3330, { speed: 140, follow: false }),
    ]);
    st.pose('surfer', 'wave'); st.act('surfer', 'wave'); st.act('girl', 'hop'); st.mood('girl', 'joy');
    await st.wait(900);
    st.act('surfer', null); st.act('girl', null); st.pose('surfer', 'stand');
  } },
  { key: ['likes summer', 'loves Tet too'], icon: '🌸', label: 'loves Tet', async play(st) {
    st.set('st-lb-xmas', false); st.set('st-lb-hot2', false);
    await st.look(2470, { dur: 1100 });
    st.set('st-like'); st.pose('minh', 'think');
    await st.wait(500);
    st.set('st-like1'); st.sfx('hearts', { vol: 0.5 });
    await st.wait(900);
    st.set('st-like2'); st.mood('minh', 'joy'); st.pose('minh', 'me');
    await st.wait(1300);
  } },
  { key: ['favourite season'], icon: '❓', label: 'favourite season?', async play(st) {
    st.set('st-like', false); st.set('st-like1', false); st.set('st-like2', false);
    st.set('st-ask'); st.sfx('sparkle', { vol: 0.6 });
    st.pose('minh', 'open'); st.mood('minh', 'joy'); st.pose('tom', 'open'); st.mood('tom', 'joy');
    await st.wait(2200);
  } },
];

export default {
  id: 'en039', worldW: 3600, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: {
    e039_fan: { R: [150, 262], L: [10, 4], head: 6 },
    e039_hug: { R: [30, -110], L: [30, -110] },
  },
  cast: [
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: 712, s: 0.92 },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: 754, s: 0.95 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 890, s: 0.95, face: -1 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 932, s: 0.95, face: -1 },
    { id: 'tom', kind: 'kid', who: 'e039_tomcoat', x: 2540, face: -1 },
    { id: 'surfer', kind: 'kid', who: 'e039_surf', x: 3150 },
    { id: 'girl', kind: 'kid', who: 'e039_girl', x: 3110 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 360, s: 1.08, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 320, face: -1 },
    { id: 'plane', kind: 'thing', x: 2600, y: 100, svg: PLANE, box: [-58, -38, 118, 66] },
  ],
  init(st) {
    st.show('plane', false);
    st.chest('tom', SCARF('#EF4444', '#fff'));
    st.chest('surfer', SANTA(false)); st.chest('girl', SANTA(false));
  },
};
