/**
 * Bài 52 "Mid-Autumn Festival": đêm Trung thu ở nhà Minh, trái sang phải: bếp (mẹ và Lan làm bánh trung thu) → phòng khách
 * (bố giúp Minh làm đèn ông sao giấy đỏ, mâm ngũ quả) → cửa → phố đêm (trăng tròn, dây đèn lồng, nhà bên kia đường).
 * Ông bà từ Nam Định tới với túi hoa quả to; cả nhà ra phố, trẻ con rước đèn, múa lân đi qua, Lucky sủa lân; cuối cùng cả nhà
 * ngồi quanh bàn thấp ăn bánh, ngắm trăng. Thẻ số 1 First / 2 Then / 3 After that / 4 Finally hiện cạnh từng việc.
 * Toạ độ cảnh: rộng 2300, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, room, doorway, table, label, BOWL } from '../kit.js';

const FLOOR = 282;
const T = (x, y, s, c, size = 12) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="${size}" fill="${c}">${s}</text>`;

Object.assign(CAST, {
  e052_k1: { hair: 'pigtails', hairC: '#1C1917', top: 'tee', shirt: '#FDE047', bottom: 'skirt', bottomC: '#EC4899', shoe: '#F472B6' },
  e052_k2: { hair: 'short', top: 'tee', shirt: '#38BDF8', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F59E0B' },
  e052_k3: { hair: 'curly', hairC: '#3F2A1E', top: 'tee', shirt: '#A3E635', bottom: 'shorts', bottomC: '#7C2D12', shoe: '#EF4444' },
});

// ── Đồ vật (gốc ở giữa) ───────────────────────────────────────────────────
const MOONCAKE = `<circle r="9" fill="#D97706" stroke="${L}" stroke-width="0.9"/>${Array.from({ length: 8 }, (_, i) => `<circle r="2.6" fill="#D97706" stroke="${L}" stroke-width="0.6" transform="rotate(${i * 45}) translate(0 -8.4)"/>`).join('')}
  <circle r="6.4" fill="#F59E0B" stroke="#B45309" stroke-width="0.7"/><path d="M-3 -2 h6 M-3 1 h6 M0 -4 v7" stroke="#B45309" stroke-width="0.8"/>`;
const STARPATH = (r = 12) => { const p = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; p.push(`${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`); } return `M${p.join(' L')}Z`; };
/** Đèn ông sao (gốc ở giữa ngôi sao). */
const STAR_LANTERN = (c = '#EF4444', r = 14) => `<path d="${STARPATH(r)}" fill="${c}" stroke="${L}" stroke-width="1"/><path d="${STARPATH(r * 0.5)}" fill="#FDE68A" opacity="0.8"/>
  <path d="M0 ${r * 0.6} v8 M-3 ${r * 0.6 + 8} h6" stroke="#FACC15" stroke-width="1.6"/>`;
/** Cầm đèn ông sao trên cán (gốc = bàn tay, cánh tay hướng +y): cán đi ngược lên, ngôi sao ở đầu cán. */
const LANTERN_PROP = (c) => `<path d="M0 -2 V22" stroke="#A16207" stroke-width="1.8"/><g transform="translate(0 32) rotate(180)"><g class="e052-glowL"><circle r="18" fill="#FDE68A" opacity="0.35"/></g>${STAR_LANTERN(c, 12)}</g>`;
const FRUITBAG = `<g transform="translate(0 -6)"><path d="M-18 -10 Q-22 18 0 20 Q22 18 18 -10Z" fill="#FDE68A" stroke="${L}" stroke-width="1"/><path d="M-10 -10 Q0 -24 10 -10" stroke="${L}" stroke-width="1.6" fill="none"/>
  <circle cx="-8" cy="-10" r="6" fill="#F97316" stroke="${L}" stroke-width="0.7"/><circle cx="4" cy="-12" r="6" fill="#84CC16" stroke="${L}" stroke-width="0.7"/><circle cx="12" cy="-8" r="5" fill="#DC2626" stroke="${L}" stroke-width="0.7"/>
  <path d="M-2 -18 q4 -6 10 -4" stroke="#16A34A" stroke-width="2" fill="none"/></g>`;
const BEAN = `<circle r="5" fill="#FACC15" stroke="#B45309" stroke-width="0.8"/>`;
/** Lân (nhìn nghiêng, quay phải): đầu to, thân vải, bốn chân của hai người múa. Gốc = chân. */
const LION = `<g class="e052-lion">
  ${[[-46, 'B'], [-14, 'F']].map(([x, k]) => `<g transform="translate(${x} -34)"><g class="e052-lleg e052-lleg${k}1"><rect x="-4" y="0" width="8" height="32" rx="3" fill="#FDE047" stroke="${L}" stroke-width="0.8"/><ellipse cx="2" cy="33" rx="6" ry="3" fill="#1F2937"/></g></g>`).join('')}
  <path d="M-64 -40 Q-70 -76 -40 -80 Q0 -84 22 -70 L22 -36 Q-20 -30 -64 -40Z" fill="#DC2626" stroke="${L}" stroke-width="1.2"/>
  ${[-54, -40, -26, -12, 2].map((x) => `<path d="M${x} -74 q6 10 0 30" stroke="#FACC15" stroke-width="2.4" fill="none"/>`).join('')}
  <path d="M-64 -40 Q-80 -40 -82 -56 Q-72 -52 -64 -58" fill="#FACC15" stroke="${L}" stroke-width="0.8"/>
  ${[[-36, 'B'], [-2, 'F']].map(([x, k]) => `<g transform="translate(${x} -34)"><g class="e052-lleg e052-lleg${k}2"><rect x="-4" y="0" width="8" height="32" rx="3" fill="#FACC15" stroke="${L}" stroke-width="0.8"/><ellipse cx="2" cy="33" rx="6" ry="3" fill="#1F2937"/></g></g>`).join('')}
  <g transform="translate(34 -66)"><g class="e052-lhead">
    <path d="M-22 -28 Q0 -44 24 -26 Q38 -6 30 16 Q10 28 -16 20 Q-30 0 -22 -28Z" fill="#EF4444" stroke="${L}" stroke-width="1.3"/>
    ${[-18, -8, 2, 12, 22].map((x, i) => `<path d="M${x} -32 q${i % 2 ? 4 : -4} -10 0 -16" stroke="#FACC15" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}
    <path d="M-4 -40 L2 -54 L8 -40Z" fill="#FACC15" stroke="${L}" stroke-width="0.8"/>
    <ellipse cx="8" cy="-10" rx="9" ry="7" fill="#fff" stroke="${L}"/><circle cx="11" cy="-10" r="4.4" fill="#1F2937"/><circle cx="12.4" cy="-11.6" r="1.4" fill="#fff"/>
    <path d="M-8 -20 Q8 -26 22 -18" stroke="#1F2937" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g class="e052-ljaw" style="transform-origin:4px 8px"><path d="M2 8 Q20 6 34 10 Q26 24 4 20Z" fill="#FDE68A" stroke="${L}" stroke-width="1"/><path d="M8 10 l3 4 l3 -4 l3 4 l3 -4 l3 4" stroke="#fff" stroke-width="1.4" fill="none"/></g>
    <path d="M-16 4 q-8 6 -4 16 M-12 10 q-6 8 0 14" stroke="#FACC15" stroke-width="2" fill="none"/>
  </g></g></g>`;

/** Thẻ thứ tự: số trong vòng tròn + chữ. */
const step = (k, x, y, n, word, c) => `<g class="e052-step e052-step${k}" transform="translate(${x} ${y})"><rect x="-8" y="-17" width="${word.length * 11 + 48}" height="34" rx="17" fill="#fff" stroke="${c}" stroke-width="2.4"/>
  ${n ? `<circle cx="9" cy="0" r="13" fill="${c}"/>${T(9, 6, n, '#fff', 17)}` : `<path d="M0 0 h12 l-5 -5 M12 0 l-5 5" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/>`}<text x="28" y="6" font-family="Nunito, sans-serif" font-weight="900" font-size="17" fill="${c}">${word}</text></g>`;

function bg() {
  return `
  <defs><linearGradient id="e052sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E1B4B"/><stop offset="1" stop-color="#4338CA"/></linearGradient>
    <radialGradient id="e052glow"><stop offset="0" stop-color="#FEF9C3" stop-opacity="0.9"/><stop offset="1" stop-color="#FEF9C3" stop-opacity="0"/></radialGradient>
    <radialGradient id="e052lamp"><stop offset="0" stop-color="#FDE68A" stop-opacity="0.7"/><stop offset="1" stop-color="#FDE68A" stop-opacity="0"/></radialGradient></defs>
  <!-- Bếp -->
  ${room(0, 520, FLOOR, '#FEF3C7', '#D9A066')}
  <rect x="310" y="64" width="110" height="88" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="316" y="70" width="98" height="76" fill="url(#e052sky)"/>
  ${[[330, 90], [380, 84], [400, 120], [346, 130]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" fill="#FDE68A"/>`).join('')}<path d="M365 70 V146 M316 108 H414" stroke="#fff" stroke-width="3" opacity="0.8"/>
  <path d="M220 12 V44" stroke="${L}" stroke-width="1.4"/><path d="M204 56 Q220 38 236 56Z" fill="#F59E0B" stroke="${L}"/><circle cx="220" cy="80" r="56" fill="url(#e052lamp)"/>
  <rect x="40" y="146" width="130" height="7" rx="2" fill="#A16207" stroke="${L}"/>${[64, 98, 132].map((x) => `<g transform="translate(${x} 138)">${BOWL.replace(/<path d="M-12 -4 Q0 -10 12 -4Z[^>]*>/, '')}</g>`).join('')}
  <!-- Phòng khách -->
  ${room(520, 560, FLOOR, '#FFE4E6', '#D9A066')}
  <rect x="890" y="64" width="128" height="104" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="896" y="70" width="116" height="92" fill="url(#e052sky)"/>
  <circle cx="972" cy="104" r="16" fill="#FEF9C3"/><path d="M954 70 V162 M896 116 H1012" stroke="#fff" stroke-width="3" opacity="0.8"/>
  <!-- tủ + mâm ngũ quả -->
  <rect x="560" y="196" width="120" height="${FLOOR - 196}" rx="3" fill="#92400E" stroke="${L}"/><rect x="568" y="206" width="48" height="66" rx="2" fill="#B45309" stroke="${L}" stroke-width="0.8"/><rect x="624" y="206" width="48" height="66" rx="2" fill="#B45309" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(620 196)"><ellipse cx="0" cy="-2" rx="34" ry="5" fill="#FACC15" stroke="${L}"/>${[[-18, -10, '#F97316'], [-4, -14, '#84CC16'], [12, -10, '#DC2626'], [4, -22, '#FDE047'], [-10, -22, '#F97316']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="7" fill="${c}" stroke="${L}" stroke-width="0.7"/>`).join('')}</g>
  <g transform="translate(780 40)"><path d="M-110 0 Q0 26 110 0" stroke="${L}" stroke-width="1" fill="none"/>${[-80, -40, 0, 40, 80].map((x, i) => `<g transform="translate(${x} ${12 - Math.abs(x) / 10})"><path d="M0 0 v6" stroke="${L}"/><g class="e052-swing" style="animation-delay:${i * 0.2}s"><ellipse cy="16" rx="9" ry="11" fill="${i % 2 ? '#FACC15' : '#EF4444'}" stroke="${L}"/><rect x="-5" y="4" width="10" height="3" fill="#B91C1C"/></g></g>`).join('')}</g>
  ${doorway(520, FLOOR)}
  <g class="e052-bagin" transform="translate(1056 ${FLOOR - 14})">${FRUITBAG}</g>
  <!-- cửa ra phố -->
  <rect x="1080" y="96" width="16" height="${FLOOR - 96}" fill="#C08B5C" stroke="${L}"/><rect x="1072" y="90" width="32" height="10" rx="2" fill="#B45309" stroke="${L}"/>

  <!-- Phố đêm -->
  <rect x="1096" y="0" width="1210" height="315" fill="url(#e052sky)"/>
  ${Array.from({ length: 26 }, (_, i) => `<circle class="ek-twinkle" style="animation-delay:${(i % 5) * 0.4}s" cx="${1110 + (i * 97) % 1180}" cy="${16 + (i * 37) % 110}" r="${1.2 + (i % 3) * 0.6}" fill="#FDE68A"/>`).join('')}
  <g transform="translate(1520 82)"><g class="e052-moonglow"><circle r="70" fill="url(#e052glow)"/></g><circle r="34" fill="#FEF9C3" stroke="#FDE68A" stroke-width="2"/>
    <circle cx="-10" cy="-8" r="6" fill="#FDE68A" opacity="0.7"/><circle cx="12" cy="8" r="8" fill="#FDE68A" opacity="0.6"/><circle cx="4" cy="-16" r="3" fill="#FDE68A" opacity="0.7"/></g>
  <!-- nhà bên kia đường -->
  ${[[1180, 90, '#7C3AED'], [1300, 110, '#B45309'], [1440, 96, '#0F766E'], [1760, 120, '#9D174D'], [1900, 90, '#1D4ED8'], [2040, 110, '#7C2D12'], [2180, 100, '#4C1D95']].map(([x, w, c], i) => `<g transform="translate(${x} 0)">
    <path d="M-4 ${150 - (i % 3) * 14} L${w / 2} ${118 - (i % 3) * 14} L${w + 4} ${150 - (i % 3) * 14}Z" fill="${c}" stroke="${L}"/><rect x="0" y="${150 - (i % 3) * 14}" width="${w}" height="${90 + (i % 3) * 14}" fill="#312E81" stroke="${L}"/>
    ${[0.25, 0.65].map((f) => `<rect x="${w * f - 10}" y="${170 - (i % 3) * 6}" width="20" height="18" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/>`).join('')}</g>`).join('')}
  <!-- dây đèn lồng -->
  ${[[1120, 1560], [1640, 2290]].map(([a, b]) => `<path d="M${a} 112 Q${(a + b) / 2} 146 ${b} 112" stroke="${L}" stroke-width="1" fill="none"/>${Array.from({ length: Math.floor((b - a) / 60) }, (_, i) => { const x = a + 30 + i * 60, t = (x - a) / (b - a), y = 112 + 4 * 34 * t * (1 - t); return `<g transform="translate(${x} ${y.toFixed(1)})"><path d="M0 0 v4" stroke="${L}"/><g class="e052-swing" style="animation-delay:${(i % 4) * 0.3}s"><circle class="e052-bulb" cy="14" r="14" fill="url(#e052lamp)"/><ellipse cy="14" rx="8" ry="10" fill="${['#EF4444', '#FACC15', '#F97316', '#EC4899'][i % 4]}" stroke="${L}"/></g></g>`; }).join('')}`).join('')}
  <!-- vỉa hè, đường -->
  <rect x="1096" y="214" width="1210" height="18" fill="#9CA3AF" stroke="${L}"/>
  <rect x="1096" y="232" width="1210" height="36" fill="#475569"/>${Array.from({ length: 19 }, (_, i) => `<rect x="${1110 + i * 64}" y="249" width="30" height="3" rx="1.5" fill="#E2E8F0"/>`).join('')}
  <rect x="1096" y="268" width="1210" height="${315 - 268}" fill="#D6D3D1" stroke="${L}"/>
  ${Array.from({ length: 19 }, (_, i) => `<path d="M${1130 + i * 64} 268 V315" stroke="#A8A29E" stroke-width="1"/>`).join('')}
  <!-- biển Nam Dinh (xe khách vừa tới) -->
  <g class="e052-nd" transform="translate(1440 0)"><path d="M0 230 V196" stroke="#64748B" stroke-width="3"/><rect x="-40" y="180" width="80" height="22" rx="4" fill="#16A34A" stroke="${L}"/>${T(0, 196, 'NAM DINH', '#fff', 11)}</g>
  <!-- chiếu (cả nhà ngồi) -->
  <g class="e052-mat"><rect x="1124" y="276" width="360" height="14" rx="3" fill="#FDE68A" stroke="${L}"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${1140 + i * 29} 277 v12" stroke="#EAB308"/>`).join('')}</g>`;
}

function fg() {
  return `
  <!-- bàn bếp + đồ làm bánh -->
  ${table(250, 222, 200, FLOOR, '#B45309')}
  <g transform="translate(316 222)"><path d="M-18 -14 H18 Q17 2 0 2 Q-17 2 -18 -14Z" fill="#fff" stroke="#3B82F6" stroke-width="1.4"/><ellipse cy="-14" rx="18" ry="4" fill="#F5F5F4" stroke="${L}" stroke-width="0.7"/>
    <g class="e052-flour">${[-8, 0, 8].map((x, i) => `<circle class="e052-puff" style="animation-delay:${i * 0.2}s" cx="${x}" cy="-22" r="5" fill="#fff" opacity="0.9"/>`).join('')}</g></g>
  <g transform="translate(184 214)"><rect x="-14" y="-8" width="28" height="12" rx="3" fill="#A16207" stroke="${L}"/><circle r="5" fill="#78350F"/><path d="M14 -2 h12" stroke="#A16207" stroke-width="4" stroke-linecap="round"/></g>
  <g transform="translate(250 220)"><rect x="-30" y="-4" width="60" height="6" rx="3" fill="#E5E7EB" stroke="${L}"/>${[-18, 0, 18].map((x, i) => `<g transform="translate(${x} -10)"><g class="e052-mc e052-mc${i}">${MOONCAKE}</g></g>`).join('')}</g>
  <g class="e052-dough" transform="translate(278 210)"><ellipse rx="10" ry="7" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/><g class="e052-beanin"><circle cx="0" cy="-1" r="4" fill="#FACC15" stroke="#B45309" stroke-width="0.7"/></g></g>
  <!-- bàn phòng khách + khung đèn -->
  ${table(780, 228, 170, FLOOR, '#92400E')}
  <g transform="translate(780 210)"><g class="e052-frame"><path d="${STARPATH(18)}" fill="none" stroke="#D6A35C" stroke-width="2.4"/><g class="e052-paper"><path d="${STARPATH(18)}" fill="#EF4444" stroke="${L}" stroke-width="1"/></g></g></g>
  <g class="e052-sheets">${[[730, 222, -10], [742, 224, 8]].map(([x, y, r]) => `<rect x="${x - 12}" y="${y - 6}" width="24" height="10" rx="1" fill="#EF4444" stroke="${L}" stroke-width="0.7" transform="rotate(${r} ${x} ${y})"/>`).join('')}</g>
  <!-- bàn thấp ngắm trăng -->
  <g class="e052-low"><rect x="1132" y="246" width="344" height="10" rx="4" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="1138" y="256" width="332" height="30" fill="#92400E" stroke="${L}"/>
    ${[1186, 1244, 1356, 1416].map((x) => `<g transform="translate(${x} 238)">${MOONCAKE}</g>`).join('')}
    <g transform="translate(1300 238)"><path d="M-8 -6 H8 L6 8 H-6Z" fill="#fff" stroke="${L}" stroke-width="0.8"/></g>
    <g transform="translate(1458 236)"><ellipse cx="0" cy="6" rx="14" ry="3" fill="#FACC15" stroke="${L}" stroke-width="0.7"/><circle cx="-5" cy="0" r="5" fill="#F97316" stroke="${L}" stroke-width="0.6"/><circle cx="5" cy="-1" r="5" fill="#84CC16" stroke="${L}" stroke-width="0.6"/></g></g>
  <!-- thẻ thứ tự -->
  ${step('1', 60, 66, '1', 'First', '#DC2626')}
  ${step('2', 600, 66, '2', 'Then', '#EA580C')}
  ${step('3', 1150, 66, '3', 'After that', '#7C3AED')}
  ${step('3b', 1290, 66, '', 'Then', '#EA580C')}
  ${step('4', 1150, 70, '4', 'Finally', '#16A34A')}
  ${label(1520, 162, 'Mid-Autumn Festival', '#B45309', 16).replace('<g ', '<g class="e052-lb e052-lb-title" ')}
  ${label(560, 150, 'a wonderful evening', '#DB2777', 15).replace('<g ', '<g class="e052-lb e052-lb-wonder" ')}
  ${label(1534, 212, 'Woof!', '#B45309', 14).replace('<g ', '<g class="e052-lb e052-lb-woof" ')}
  ${label(1520, 140, 'full moon', '#B45309', 14).replace('<g ', '<g class="e052-lb e052-lb-moon" ')}
  ${label(1400, 72, 'the best night of the year!', '#DC2626', 16).replace('<g ', '<g class="e052-lb e052-lb-best" ')}
  <g class="e052-fw">${[[1180, 112, '#F472B6'], [1680, 64, '#FDE047'], [1830, 110, '#60A5FA']].map(([x, y, c], i) => `<g transform="translate(${x} ${y})"><g class="e052-burst" style="animation-delay:${i * 0.35}s">${Array.from({ length: 10 }, (_, j) => `<path d="M0 -8 V-20" stroke="${c}" stroke-width="2.6" stroke-linecap="round" transform="rotate(${j * 36})"/>`).join('')}</g></g>`).join('')}</g>`;
}

const CSS = `
.e052-step, .e052-lb, .e052-mat, .e052-low, .e052-sheets, .e052-nd, .e052-bagin { opacity: 0; transition: opacity .35s; }
${['1', '2', '3', '3b', '4'].map((k) => `.st-step${k} .e052-step${k}`).join(', ')},
${['title', 'wonder', 'woof', 'moon', 'best'].map((k) => `.st-lb-${k} .e052-lb-${k}`).join(', ')},
.st-sit .e052-mat, .st-sit .e052-low, .st-sheets .e052-sheets, .st-nd .e052-nd, .st-bagin .e052-bagin { opacity: 1; }
.e052-step { transform-box: fill-box; } .st-step1 .e052-step1, .st-step2 .e052-step2, .st-step3 .e052-step3, .st-step4 .e052-step4 { animation: e052Pop .5s cubic-bezier(.3,1.6,.6,1); }
@keyframes e052Pop { from { scale: .4; } to { scale: 1; } }
.e052-swing { animation: e052Swing 1.8s ease-in-out infinite alternate; transform-origin: 0 0; }
@keyframes e052Swing { from { transform: rotate(-7deg); } to { transform: rotate(7deg); } }
.e052-bulb { animation: e052Bulb 1.2s ease-in-out infinite alternate; } @keyframes e052Bulb { from { opacity: .5; } to { opacity: 1; } }
.e052-moonglow { transition: transform 1s ease-out; transform: scale(.8); } .st-moon .e052-moonglow { transform: scale(1.4); animation: e052Bulb 1.4s ease-in-out infinite alternate; }
.e052-mc { transform: scale(0); transition: transform .5s cubic-bezier(.3,1.6,.6,1); }
.st-mc1 .e052-mc0, .st-mc1 .e052-mc1, .st-mc2 .e052-mc2 { transform: scale(1); } .st-mc1 .e052-mc1 { transition-delay: .3s; }
.e052-dough { opacity: 0; transition: opacity .3s; } .st-dough .e052-dough { opacity: 1; } .st-mc2 .e052-dough { opacity: 0; }
.e052-beanin { opacity: 0; transition: opacity .2s; } .st-bean .e052-beanin { opacity: 1; }
.e052-flour { opacity: 0; } .st-mix .e052-flour { opacity: 1; }
.st-mix .e052-puff { animation: e052Puff 1s ease-out infinite; } @keyframes e052Puff { from { transform: translateY(4px) scale(.5); opacity: 0; } 30% { opacity: .9; } to { transform: translateY(-14px) scale(1.2); opacity: 0; } }
.e052-frame { transition: opacity .3s; } .st-lantern .e052-frame { opacity: 0; }
.e052-paper { opacity: 0; transition: opacity .5s; } .st-paper .e052-paper { opacity: 1; }
.st-paper .e052-sheets { opacity: 0; }
.e052-fw { opacity: 0; transition: opacity .3s; } .st-fw .e052-fw { opacity: 1; }
.e052-burst { transform: scale(0); } .st-fw .e052-burst { animation: e052Burst 1.4s ease-out infinite; }
@keyframes e052Burst { 0% { transform: scale(.1); opacity: 1; } 70% { opacity: 1; } 100% { transform: scale(1.3); opacity: 0; } }
.e052-glowL { animation: e052Bulb .9s ease-in-out infinite alternate; }
.is-walk .e052-lleg { animation: ppStepA .3s ease-in-out infinite alternate; }
.is-walk .e052-llegB1, .is-walk .e052-llegF2 { animation-name: ppStepB; }
.is-walk .e052-lhead, .act-e052shake .e052-lhead { animation: e052Head .35s ease-in-out infinite alternate; transform-origin: -10px 10px; }
@keyframes e052Head { from { transform: rotate(-8deg) translateY(2px); } to { transform: rotate(6deg) translateY(-4px); } }
.is-walk .e052-ljaw, .act-e052shake .e052-ljaw { animation: e052Jaw .25s ease-in-out infinite alternate; }
@keyframes e052Jaw { to { transform: rotate(18deg); } }
.act-e052shake .e052-lion { animation: e052Back .3s ease-in-out infinite alternate; }
@keyframes e052Back { from { transform: translateX(0); } to { transform: translateX(-8px) rotate(-3deg); } }
.act-e052press .pp-upwR, .act-e052press .pp-upwL { animation: e052Press .5s ease-in-out infinite alternate; }
@keyframes e052Press { from { transform: rotate(0); } to { transform: rotate(-12deg); } }
@media (prefers-reduced-motion: reduce) {
  .e052-swing { animation-duration: 4s; } .st-fw .e052-burst { animation-duration: 2.6s; }
  .is-walk .e052-lhead, .act-e052shake .e052-lhead, .act-e052shake .e052-lion { animation-duration: .7s; }
}
`;

const SIT_KID = 'e052_sit', SIT_AD = 'e052_sitA';
const FAMILY = ['mum', 'lan', 'dad', 'minh', 'grandpa', 'grandma'];
const ADULTS = ['mum', 'dad', 'grandpa', 'grandma'];

const BEATS = [
  { key: ['Mid-Autumn Festival'], icon: '🌕', label: 'Mid-Autumn', async play(st) {
    st.look(1560);
    st.set('st-moon'); st.sfx('sparkle', { vol: 0.4 });
    await st.wait(800);
    st.set('st-lb-title'); st.sfx('pop', { vol: 0.5 });
    await st.wait(1500);
  } },
  { key: ['a wonderful evening'], icon: '🏮', label: 'wonderful evening', async play(st) {
    st.set('st-lb-title', false); st.set('st-moon', false);
    await st.look(560, { dur: 1100 });
    st.set('st-lb-wonder'); st.sfx('pop', { vol: 0.5 });
    for (const id of ['mum', 'lan', 'dad', 'minh']) { st.mood(id, 'joy'); }
    st.pose('lan', 'wave'); st.act('lan', 'wave'); st.pose('minh', 'wave'); st.act('minh', 'wave');
    st.sfx('giggle', { vol: 0.5 });
    st.fx('hearts', 400, 150); st.fx('hearts', 760, 150, { quiet: true });
    await st.wait(1600);
    for (const id of ['lan', 'minh']) { st.act(id, null); st.pose(id, 'stand'); }
  } },
  { key: ['First', 'made mooncakes'], icon: '🥮', label: 'First: mooncakes', async play(st) {
    st.set('st-lb-wonder', false); st.mood('dad', 'happy'); st.mood('minh', 'happy');
    st.look(250);
    st.set('st-step1'); st.sfx('pop', { vol: 0.5 });
    st.pose('mum', 'e052_press'); st.act('mum', 'e052press');
    await st.wait(500);
    st.sfx('bowl-down', { vol: 0.6 });
    await st.wait(700);
    st.set('st-mc1'); st.sfx('ding', { vol: 0.5 });
    st.act('mum', null); st.pose('mum', 'stand'); st.pose('lan', 'clap'); st.act('lan', 'clap'); st.sfx('clap', { vol: 0.5 });
    await st.wait(1000);
    st.act('lan', null); st.pose('lan', 'stand');
  } },
  { key: ['mixed the flour', 'put beans inside'], icon: '🫘', label: 'flour and beans', async play(st) {
    st.hold('lan', 'spoon'); st.pose('lan', 'stir'); st.act('lan', 'stir'); st.set('st-mix');
    await st.loop('pot-stir', () => st.wait(1200), { vol: 0.7 });
    st.act('lan', null); st.set('st-mix', false); st.hold('lan', null); st.pose('lan', 'stand');
    st.set('st-dough'); st.pose('mum', 'give');
    await st.fly(BEAN, [228, 196], [278, 208], { size: 14, dur: 600 });
    st.set('st-bean'); st.sfx('pop', { vol: 0.5, rate: 0.8 }); st.pose('mum', 'e052_press'); st.act('mum', 'e052press');
    await st.wait(500);
    st.sfx('bowl-down', { vol: 0.6 });
    await st.wait(300);
    st.set('st-mc2'); st.fx('sparkle', 268, 206, { quiet: true }); st.sfx('ding', { vol: 0.5 });
    st.act('mum', null); st.pose('mum', 'stand');
    await st.wait(400);
  } },
  { key: ['Then', 'make a star lantern'], icon: '⭐', label: 'Then: star lantern', async play(st) {
    st.set('st-step1', false);
    st.look(760);
    st.set('st-step2'); st.sfx('pop', { vol: 0.5 });
    st.pose('dad', 'e052_press'); st.act('dad', 'e052press'); st.pose('minh', 'e052_press');
    await st.wait(700);
    st.sfx('whoosh', { vol: 0.4 });
    for (const [x, y] of [[730, 222], [742, 224]]) { st.fly(`<rect x="-12" y="-5" width="24" height="10" rx="1" fill="#EF4444" stroke="${L}" stroke-width="0.7"/>`, [x, y], [780, 210], { size: 26, dur: 500 }); await st.wait(250); }
    await st.wait(300);
    st.set('st-paper'); st.sfx('page-turn', { vol: 0.5 });
    st.act('dad', null); st.pose('dad', 'point');
    await st.wait(600);
    st.set('st-lantern'); st.hold('minh', 'e052_lantern'); st.pose('minh', 'e052_up'); st.mood('minh', 'joy');
    st.fx('sparkle', 820, 140);
    await st.wait(900);
    st.pose('dad', 'stand');
  } },
  { key: ['After that', 'a big bag of fruit'], icon: '🍊', label: 'After that: Grandma', async play(st) {
    st.set('st-step2', false);
    // mẹ và Lan làm xong bánh, sang phòng khách (ngoài khung hình)
    st.place('mum', 600, FLOOR, 1); st.place('lan', 650, FLOOR, 1);
    st.look(1220);
    st.set('st-step3'); st.set('st-nd'); st.sfx('pop', { vol: 0.5 });
    st.sfx('door-open', { vol: 0.6 });
    st.show('grandpa', true); st.show('grandma', true);
    await Promise.all([
      st.walk('grandpa', 1150, { speed: 120, follow: false }),
      st.walk('grandma', 1212, { speed: 120, follow: false }),
    ]);
    st.pose('grandpa', 'wave'); st.act('grandpa', 'wave'); st.mood('grandpa', 'joy'); st.mood('grandma', 'joy');
    st.fx('hearts', 1180, 120);
    await st.wait(1000);
    st.act('grandpa', null); st.pose('grandpa', 'stand');
  } },
  { key: ['went out into the street'], icon: '🚶', label: 'into the street', async play(st) {
    st.set('st-step3', false); st.set('st-nd', false); st.set('st-step3b');
    st.chest('grandpa', ''); st.pose('grandpa', 'give');
    await st.fly(FRUITBAG, [1130, 180], [1060, 262], { size: 40, dur: 500 });
    st.set('st-bagin'); st.sfx('bag-on', { vol: 0.7 }); st.pose('grandpa', 'stand');
    st.walk('grandma', 1446, { speed: 150, follow: false });
    await st.wait(300);
    st.walk('grandpa', 1390, { speed: 150, follow: false });
    await st.wait(200);
    st.dog('lucky', 'stand'); st.sfx('dog-bark', { vol: 0.4 });
    await Promise.all([
      st.walk('lucky', 1500, { speed: 220, follow: false }),
      st.walk('minh', 1328, { speed: 220, lead: -40 }),
      st.walk('dad', 1272, { speed: 230, follow: false }),
      st.walk('lan', 1215, { speed: 230, follow: false }),
      st.walk('mum', 1160, { speed: 220, follow: false }),
    ]);
    st.face('mum', 1); st.dog('lucky', 'sit');
    st.pose('minh', 'e052_up');
    await st.wait(300);
  } },
  { key: ['bright lanterns', 'a lion dance'], icon: '🦁', label: 'lanterns, lion dance', async play(st) {
    st.set('st-step3b', false);
    st.look(1560);
    st.walk('k1', 1704, { speed: 120, follow: false });
    st.walk('k2', 1776, { speed: 120, follow: false });
    st.walk('k3', 1848, { speed: 120, follow: false });
    await st.wait(700);
    st.show('lion', true);
    await st.loop('lion-drum', async () => {
      await st.walk('lion', 1596, { speed: 190, lead: -40 });
      st.act('lion', 'e052shake');
      await st.wait(900);
    }, { vol: 0.8 });
  } },
  { key: ['Lucky barked at the lion'], icon: '🐶', label: 'Lucky barked', async play(st) {
    st.look(1500);
    st.face('lucky', 1); st.dog('lucky', 'stand'); st.act('lucky', 'jump'); st.mood('lucky', 'joy');
    st.set('st-lb-woof'); st.sfx('dog-bark');
    await st.wait(500);
    st.act('lion', 'e052shake'); st.mood('minh', 'wow'); st.mood('lan', 'joy'); st.sfx('lion-drum', { vol: 0.5 });
    await st.wait(1200);
    st.sfx('dog-bark', { vol: 0.7 });
    await st.wait(500);
  } },
  { key: ['Finally', 'looked at the full moon'], icon: '🥮', label: 'Finally: the moon', async play(st) {
    st.set('st-lb-woof', false); st.act('lucky', null); st.act('lion', null);
    st.show('lion', false); st.dog('lucky', 'sit'); st.mood('minh', 'happy');
    await st.look(1330);
    st.set('st-step4'); st.set('st-sit'); st.sfx('pop', { vol: 0.5 });
    st.hold('minh', null);
    for (const id of FAMILY) st.pose(id, ADULTS.includes(id) ? SIT_AD : SIT_KID);
    await st.wait(700);
    st.hold('lan', 'e052_cake'); st.pose('lan', 'e052_eat'); st.act('lan', 'eat');
    st.hold('minh', 'e052_cake'); st.pose('minh', 'e052_eat'); st.act('minh', 'eat');
    st.sfx('crunch', { vol: 0.7 });
    await st.wait(900);
    st.act('lan', null); st.act('minh', null);
    st.set('st-moon'); st.set('st-lb-moon'); st.sfx('pop', { vol: 0.5 });
    for (const id of FAMILY) { st.pose(id, ADULTS.includes(id) ? 'e052_lookA' : 'e052_look'); st.mood(id, 'joy'); }
    await st.wait(1300);
  } },
  { key: ['the best night of the year'], icon: '🎆', label: 'best night', async play(st) {
    st.set('st-step4', false); st.set('st-lb-moon', false);
    st.look(1400);
    st.set('st-fw'); st.set('st-lb-best'); st.sfx('fireworks', { vol: 0.8 });
    st.hold('minh', 'e052_lantern'); st.pose('minh', 'e052_sitUp');
    st.pose('lan', 'sitWave'); st.act('lan', 'wave');
    st.fx('hearts', 1300, 170);
    await st.wait(900);
    st.fx('sparkle', 1600, 90, { quiet: true }); st.sfx('fireworks', { vol: 0.6, rate: 1.1 });
    await st.wait(1200);
  } },
];

export default {
  id: 'en052', worldW: 2300, floor: FLOOR, viewTop: 40, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: {
    e052_press: { R: [22, -30], L: [22, -30], head: 8 },
    e052_up: { R: [152, 172], L: [10, 4], head: -4 },
    e052_hold: { R: [70, 120], L: [10, 4] },
    e052_sit: { R: [24, -60], L: [24, -60], dy: 20 },
    e052_sitA: { R: [24, -60], L: [24, -60], dy: 44 },
    e052_eat: { R: [118, 248], L: [24, -60], dy: 20 },
    e052_look: { R: [24, -60], L: [24, -60], dy: 20, head: -10 },
    e052_lookA: { R: [24, -60], L: [24, -60], dy: 44, head: -10 },
    e052_sitUp: { R: [152, 172], L: [24, -60], dy: 20, head: -6 },
  },
  props: {
    e052_lantern: LANTERN_PROP('#EF4444'),
    e052_lantern2: LANTERN_PROP('#FACC15'),
    e052_lantern3: LANTERN_PROP('#22C55E'),
    e052_cake: `<g transform="translate(0 -6) scale(0.6)">${MOONCAKE}</g>`,
  },
  cast: [
    { id: 'k1', kind: 'kid', who: 'e052_k1', x: 2180, y: 230, s: 0.84, face: -1 },
    { id: 'k2', kind: 'kid', who: 'e052_k2', x: 2260, y: 230, s: 0.84, face: -1 },
    { id: 'k3', kind: 'kid', who: 'e052_k3', x: 2340, y: 230, s: 0.84, face: -1 },
    { id: 'lion', kind: 'thing', x: 2420, y: 264, s: 1, face: -1, svg: LION, box: [-86, -130, 162, 134] },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 196, s: 0.95 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 300, s: 1.08 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 728, s: 0.95 },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: 1470, s: 0.92, face: -1 },
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: 1530, s: 0.9, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 832 },
    { id: 'lucky', kind: 'dog', x: 960, s: 0.85, face: -1 },
  ],
  init(st) {
    st.look(1560, { instant: true });
    st.dog('lucky', 'sit'); st.set('st-sheets');
    st.show('grandpa', false); st.show('grandma', false); st.show('lion', false);
    st.chest('grandpa', FRUITBAG); st.pose('grandpa', 'carry');
    ['k1', 'k2', 'k3'].forEach((id, i) => { st.hold(id, ['e052_lantern2', 'e052_lantern3', 'e052_lantern'][i]); st.pose(id, 'e052_hold'); });
  },
};
