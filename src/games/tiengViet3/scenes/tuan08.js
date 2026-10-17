// Phim truyện "Lớp học cuối đông", Tuần 8 Tiếng Việt 3: 4 cảnh, đánh số theo CÂU (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Vùng núi cao mùa đông; các bạn người Mông Súa (sua), Mua (mua), Chơ (cho) và thầy giáo (thay) ngồi quanh đống lửa.
import { person } from '../cast.js';
import { W, H, svg, at, sky, cloud, pine, bareTree, leaves, sparkles, thought, soundWaves, heart, fire, word, stars, moon, LINE } from '../sceneKit.js';

/** Núi xa xanh xám nhiều lớp. */
const mountains = (y) => `
  <path d="M0 ${y} L60 ${y - 70} L120 ${y - 20} L200 ${y - 96} L280 ${y - 24} L360 ${y - 84} L430 ${y - 30} L480 ${y - 60} V300 H0Z" fill="#A5B4CB"/>
  <path d="M200 ${y - 96} L180 ${y - 72} L196 ${y - 76} L210 ${y - 68} L222 ${y - 78}Z M360 ${y - 84} L342 ${y - 62} L356 ${y - 66} L370 ${y - 60} L380 ${y - 70}Z" fill="#F1F5F9"/>
  <path d="M0 ${y + 20} Q90 ${y - 30} 180 ${y + 10} Q280 ${y - 40} 380 ${y + 6} Q440 ${y - 20} 480 ${y} V300 H0Z" fill="#8BA38F"/>`;

/** Hòn đá xám (frost: phủ sương trắng). */
const rock = (x, y, w = 30, frost) => `<g>
  <path d="M${x - w / 2} ${y} Q${x - w / 2} ${y - w * 0.6} ${x - w * 0.1} ${y - w * 0.66} Q${x + w * 0.4} ${y - w * 0.7} ${x + w / 2} ${y} Z" fill="#94A3B8" stroke="#64748B" stroke-width="1"/>
  <path d="M${x - w * 0.2} ${y - w * 0.4} q${w * 0.2} -${w * 0.1} ${w * 0.4} 0" stroke="#CBD5E1" stroke-width="1.4" fill="none"/>
  ${frost ? `<path d="M${x - w * 0.42} ${y - w * 0.38} Q${x - w * 0.1} ${y - w * 0.8} ${x + w * 0.42} ${y - w * 0.4} Q${x} ${y - w * 0.5} ${x - w * 0.42} ${y - w * 0.38}Z" fill="#F8FAFC"/>` : ''}</g>`;

/** Gió lạnh thổi (đường xoáy). */
const wind = (list) => list.map(([x, y], i) => `<g class="sc-drift" style="--d:${i * 1.5}s">
  <path d="M${x} ${y} q20 -8 40 0 t40 0 q10 -10 0 -16 q-8 -2 -8 6" stroke="#E2E8F0" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`).join('');

/** Hạt sương giá / tuyết nhỏ rơi. */
const flakes = (list) => list.map(([x, y], i) => `<g transform="translate(${x} ${y})"><g class="sc-fall" style="--d:${i * 1.1}s">
  <path d="M0 -4 V4 M-4 0 H4 M-3 -3 L3 3 M3 -3 L-3 3" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/></g></g>`).join('');

/** Hơi thở phả khói trắng. */
const breath = (x, y, d = 0) => `<g class="sc-rise" style="--d:${d}s"><circle cx="${x}" cy="${y}" r="4" fill="#fff" opacity="0.8"/><circle cx="${x + 6}" cy="${y - 4}" r="3" fill="#fff" opacity="0.7"/></g>`;

/** Bàn tay đỏ ửng vì lạnh (vầng đỏ ở chỗ tay). */
const redHands = (x, y) => `<circle class="sc-twinkle" cx="${x}" cy="${y}" r="6" fill="#F87171" opacity="0.55"/>`;

/** Lớp học gỗ nhỏ trên sườn núi (x giữa, y nền). */
const woodSchool = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <rect x="-60" y="-50" width="120" height="50" fill="#B7834F" stroke="${LINE}" stroke-width="1"/>
  ${[-40, -20, 0, 20, 40].map(dx => `<path d="M${dx} -50 V0" stroke="#946235" stroke-width="1"/>`).join('')}
  <path d="M-72 -46 L0 -86 L72 -46Z" fill="#78716C" stroke="${LINE}" stroke-width="1"/>
  <rect x="-12" y="-34" width="24" height="34" fill="#5B3A1E"/><rect x="24" y="-38" width="22" height="16" fill="#FDE68A" stroke="${LINE}" stroke-width="0.8"/>
  <rect x="-48" y="-38" width="22" height="16" fill="#FDE68A" stroke="${LINE}" stroke-width="0.8"/>
  ${[0, 1].map(i => `<path class="sc-rise" style="--d:${i}s" d="M40 -80 q-6 -8 0 -16 q6 -8 0 -16" stroke="#E2E8F0" stroke-width="3" fill="none"/>`).join('')}
  <rect x="34" y="-80" width="10" height="20" fill="#57534E"/></g>`;

/** Gian phòng gỗ nhỏ: vách ván, cửa sổ nhìn ra núi, nền đất. */
const room = (id) => `
  ${sky(id, '#C08457', '#9A6438')}
  ${Array.from({ length: 13 }, (_, i) => `<path d="M${i * 40} 0 V210" stroke="#7C4A21" stroke-width="2"/>`).join('')}
  <rect x="150" y="40" width="80" height="62" fill="#CBD5E1" stroke="#5B3A1E" stroke-width="6"/>
  <path d="M150 100 L176 70 L196 86 L214 64 L230 92 V102 H150Z" fill="#94A3B8"/><path d="M190 40 V102" stroke="#5B3A1E" stroke-width="4"/>
  <rect x="294" y="44" width="78" height="54" rx="3" fill="#166534" stroke="#78350F" stroke-width="5"/>
  <path d="M306 62 h40 M306 78 h52" stroke="#DCFCE7" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
  <rect y="206" width="${W}" height="${H - 206}" fill="#A47551"/>
  <path d="M0 206 H${W}" stroke="#5B3A1E" stroke-width="3"/>
  <ellipse cx="240" cy="284" rx="56" ry="10" fill="#57534E"/>
  ${[[200, 284], [280, 284], [222, 290], [262, 290]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="5" fill="#78716C" stroke="#44403C" stroke-width="0.8"/>`).join('')}`;

/** Ánh lửa hắt sáng cả phòng (to dần). */
const glow = (r, o) => `<circle cx="240" cy="250" r="${r}" fill="#FDBA74" opacity="${o}"/>`;

/** Bò mẹ và bê con (x, y: chân bò mẹ). */
function cows(x, y, s = 1) {
  const cow = (cx, k, body) => `<g transform="translate(${cx} 0) scale(${k})">
    <path d="M-16 0 V-14 M-8 0 V-14 M10 0 V-14 M18 0 V-14" stroke="${LINE}" stroke-width="4" stroke-linecap="round"/>
    <path d="M-16 0 V-14 M-8 0 V-14 M10 0 V-14 M18 0 V-14" stroke="${body}" stroke-width="2.6" stroke-linecap="round"/>
    <ellipse cx="0" cy="-22" rx="24" ry="13" fill="${body}" stroke="${LINE}" stroke-width="1"/>
    <ellipse cx="-6" cy="-24" rx="6" ry="4" fill="#fff" opacity="0.8"/>
    <path d="M-24 -24 q-6 2 -6 10" stroke="${LINE}" stroke-width="1.4" fill="none"/>
    <g transform="translate(26 -30)"><ellipse rx="10" ry="9" fill="${body}" stroke="${LINE}" stroke-width="1"/>
      <ellipse cx="3" cy="5" rx="7" ry="4.6" fill="#FBCFE8" stroke="${LINE}" stroke-width="0.8"/>
      <circle cx="-3" cy="-2" r="1.4" fill="#1F2937"/><circle cx="5" cy="-2" r="1.4" fill="#1F2937"/>
      ${k > 0.7 ? '<path d="M-6 -7 q-4 -6 -10 -4 M6 -7 q4 -6 10 -4" stroke="#FEF3C7" stroke-width="2.4" fill="none" stroke-linecap="round"/>' : ''}
      <ellipse cx="-10" cy="-4" rx="4" ry="2" fill="${body}" stroke="${LINE}" stroke-width="0.8"/></g></g>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">${cow(-14, 1, '#A16207')}<g class="sc-bob">${cow(28, 0.6, '#D97706')}</g></g>`;
}

/** Bộ váy áo Mông ngày cưới treo trên giá: áo chàm viền thổ cẩm, váy xếp li nhiều màu, vòng bạc. */
const outfit = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-22 -40 H22" stroke="#92400E" stroke-width="2.4"/><path d="M0 -40 V-46 q4 -4 0 -6" stroke="#92400E" stroke-width="1.6" fill="none"/>
  <path d="M-12 -40 L-24 -26 L-18 -20 L-12 -26 V-4 H12 V-26 L18 -20 L24 -26 L12 -40Z" fill="#1E2A4A" stroke="${LINE}" stroke-width="1"/>
  <path d="M-24 -26 L-18 -20 M24 -26 L18 -20" stroke="#EC4899" stroke-width="3"/>
  <path d="M-4 -40 L-6 -4 M4 -40 L6 -4" stroke="#FACC15" stroke-width="2.4"/>
  <path d="M-10 -36 Q0 -30 10 -36" stroke="#E5E7EB" stroke-width="2" fill="none"/><path d="M-12 -32 Q0 -24 12 -32" stroke="#CBD5E1" stroke-width="2" fill="none"/>
  <path d="M-12 -4 H12 L22 28 Q0 32 -22 28Z" fill="#1E2A4A" stroke="${LINE}" stroke-width="1"/>
  ${['#E11D48', '#FACC15', '#38BDF8', '#22C55E', '#EC4899'].map((c, i) => `<path d="M${-14 - i * 1.6} ${4 + i * 4.6} H${14 + i * 1.6}" stroke="${c}" stroke-width="3.4"/>`).join('')}
  ${[-12, -6, 0, 6, 12].map(dx => `<path d="M${dx * 0.8} -2 L${dx * 1.6} 28" stroke="#475569" stroke-width="0.7"/>`).join('')}
  <path d="M-6 -4 V36 H6 V-4Z" fill="#E11D48" opacity="0.85"/></g>`;

/** Hàng rào đá xanh xếp dở (x, y: chân rào). */
const stoneFence = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  ${[[0, 5], [1, 5], [2, 4], [3, 2]].map(([row, n]) => Array.from({ length: n }, (_, i) =>
    `<ellipse cx="${-44 + i * 18 + (row % 2) * 9}" cy="${-6 - row * 11}" rx="10" ry="6" fill="${(i + row) % 2 ? '#6B8E8A' : '#7FA6A0'}" stroke="#44605C" stroke-width="0.9"/>`).join('')).join('')}</g>`;

export default {
  sentences: true,
  groups: [[0, 1, 2, 3, 4], [5, 6], [7, 8, 9, 10, 11], [12, 13, 14, 15]],
  scenes: [
    // Cảnh 1: cuối mùa đông vùng núi cao; trời rét thêm, đất cứng lại, cây rũ lá úa vàng, đá xám phủ hơi lạnh
    () => svg('Cuối mùa đông trên núi cao, trời rét, cây rũ lá vàng, đá xám', `
      ${sky('t08s1sky', '#94A3B8', '#E2E8F0')}
      ${at(1, `${cloud(130, 46, 0.9, 0, '#E2E8F0')}${cloud(330, 36, 0.8, 3, '#F1F5F9')}`)}
      ${mountains(170)}
      ${pine(84, 196, 0.6)}${pine(418, 200, 0.7)}
      <path d="M0 220 Q140 200 260 214 T480 208 V300 H0Z" fill="#B4A48A"/>
      ${at(2, `${wind([[110, 92], [270, 120], [180, 150]])}${flakes([[120, 20], [200, 40], [300, 10], [360, 50], [250, 70], [160, 90]])}`)}
      ${at(3, `<path d="M120 252 l14 6 l-4 10 l12 6 M250 238 l-8 10 l10 6 M300 270 l16 -4 l6 10 M360 246 l-10 8" stroke="#7C6A50" stroke-width="1.8" fill="none"/>
        <path d="M60 230 Q200 220 420 228" stroke="#F8FAFC" stroke-width="2" fill="none" opacity="0.7" stroke-dasharray="6 8"/>`)}
      ${at(4, `${bareTree(156, 236, 1, 7)}${bareTree(310, 226, 0.85, 5)}
        ${leaves([[140, 160, '#CA8A04'], [180, 150, '#D97706'], [300, 150, '#EAB308'], [320, 170, '#CA8A04']])}`)}
      ${at(5, `${rock(222, 276, 44, true)}${rock(262, 280, 30, true)}${rock(370, 274, 40, true)}${rock(110, 282, 34, true)}
        ${[[200, 254], [240, 248], [362, 250]].map(([x, y], i) => `<path class="sc-rise" style="--d:${i * 0.8}s" d="M${x} ${y} q-6 -8 0 -16 q6 -8 0 -14" stroke="#F1F5F9" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}`)}`),

    // Cảnh 2: mấy bạn nhỏ vẫn rủ nhau đến lớp; những ngón tay nho nhỏ đỏ lên vì lạnh
    () => svg('Các bạn nhỏ người Mông rủ nhau đến lớp trong giá lạnh', `
      ${sky('t08s2sky', '#94A3B8', '#E2E8F0')}
      ${cloud(110, 40, 0.8, 1, '#F1F5F9')}${cloud(300, 30, 0.7, 4, '#E2E8F0')}
      ${mountains(160)}
      ${woodSchool(370, 196, 0.8)}
      ${pine(96, 200, 0.6)}
      <path d="M0 214 Q140 196 260 208 T480 200 V300 H0Z" fill="#B4A48A"/>
      <path d="M60 300 Q160 250 330 204" stroke="#D6C3A0" stroke-width="34" fill="none" stroke-linecap="round"/>
      ${bareTree(436, 256, 0.8, 4)}${rock(110, 270, 30, true)}${rock(400, 286, 36, true)}
      ${flakes([[150, 30], [260, 20], [340, 60], [200, 90]])}
      ${at(1, `<g class="sc-walk">${person(170, 282, 'mua', 'walk', { s: 0.86 })}</g>`, { off: 2 })}
      ${at(1, `<g class="sc-walk" style="--d:0.3s">${person(226, 268, 'sua', 'walk', { s: 0.8 })}</g>`, { off: 2 })}
      ${at(1, `<g class="sc-walk" style="--d:0.6s">${person(280, 254, 'cho', 'walk', { s: 0.74 })}</g>`, { off: 2 })}
      ${at(2, `${person(170, 282, 'mua', 'clap', { s: 0.86, mood: 'sad' })}${redHands(170, 225)}${breath(186, 190, 0)}`)}
      ${at(2, `${person(226, 268, 'sua', 'clap', { s: 0.8, mood: 'shut' })}${redHands(226, 215)}${breath(240, 182, 0.6)}`)}
      ${at(2, `${person(280, 254, 'cho', 'clap', { s: 0.74, mood: 'sad' })}${redHands(280, 205)}${breath(294, 172, 1.2)}`)}`),

    // Cảnh 3: thầy và các bạn quây quần bên đống lửa; tiếng nói to dần; Súa kể con bò đẻ con bê, thức đêm đốt lửa sưởi
    () => svg('Thầy và các bạn ngồi quanh đống lửa, Súa kể chuyện con bê', `
      ${room('t08s3sky')}
      ${at(1, glow(120, 0.22))}${at(2, glow(170, 0.18))}
      ${at(1, fire(240, 282, 0.95), { off: 2 })}
      ${at(2, fire(240, 282, 1.3))}
      ${at(1, person(118, 284, 'thay', 'sit', { s: 0.82 }))}
      ${at(1, person(176, 288, 'sua', 'sit', { s: 0.9 }), { off: 3 })}
      ${at(3, person(176, 288, 'sua', 'sit', { s: 0.9, mood: 'joy' }), { talk: '3,4,5' })}
      ${at(1, person(306, 288, 'mua', 'sit', { s: 0.9, flip: true }))}
      ${at(1, person(362, 284, 'cho', 'sit', { s: 0.86, flip: true }))}
      ${at(2, `${soundWaves(200, 196, 0.7, '#FDE047')}<g transform="translate(286 196) scale(-1 1)">${soundWaves(0, 0, 0.7, '#FDE047')}</g>`)}
      ${at(4, thought(248, 66, 170, 92, 190, 176, `
        <rect x="-78" y="-40" width="156" height="80" rx="30" fill="#1E293B"/>
        ${stars([[-60, -26], [-30, -32], [40, -30], [64, -20]])}
        ${moon(56, -20, 9)}
        <path d="M-78 22 H78 V10 Q0 4 -78 10Z" fill="#57534E" opacity="0.7"/>
        ${cows(-24, 26, 0.95)}`))}
      ${at(5, `${fire(296, 100, 0.34)}${person(318, 102, 'sua', 'sit', { s: 0.26, mood: 'shut', flip: true })}`)}`),

    // Cảnh 4: Mua kể đám cưới chị gái, bộ váy áo đẹp nhất; Chơ kể hàng rào đá xếp dở; tiếng Mông lẫn tiếng Kinh rộn ràng
    () => svg('Mua kể về bộ váy áo ngày cưới, Chơ kể về hàng rào đá', `
      ${room('t08s4sky')}
      ${glow(170, 0.2)}
      ${fire(240, 280, 1.1)}
      ${person(118, 284, 'thay', 'sit', { s: 0.82, mood: 'joy' })}
      ${person(176, 288, 'sua', 'sit', { s: 0.9 })}
      ${at(1, person(306, 288, 'mua', 'sit', { s: 0.9, flip: true, mood: 'joy' }), { talk: '1' })}
      ${at(1, person(362, 284, 'cho', 'sit', { s: 0.86, flip: true }), { off: 2 })}
      ${at(2, person(362, 284, 'cho', 'sit', { s: 0.86, flip: true, mood: 'joy' }), { talk: '2,3' })}
      ${at(1, thought(166, 74, 136, 96, 290, 190, `
        ${outfit(-30, 6, 0.95)}
        ${sparkles([[18, -28, 7], [52, 4, 6], [20, 26, 5]])}
        ${heart(44, -22, 1.2, '#F43F5E', 0)}`))}
      ${at(2, thought(314, 74, 136, 96, 356, 190, `
        <path d="M-66 30 H66" stroke="#8B7355" stroke-width="3"/>
        ${stoneFence(-12, 30, 0.9)}
        ${person(48, 32, 'cho', 'hold', { s: 0.42, prop: 'slab' })}`))}
      ${at(3, `<g transform="translate(314 74)">${sparkles([[-56, -30, 6], [10, -36, 7], [-30, -10, 5]])}</g>`)}
      ${at(4, `${soundWaves(204, 186, 0.9, '#FDE047')}<g transform="translate(280 186) scale(-1 1)">${soundWaves(0, 0, 0.9, '#FDE047')}</g>
        ${heart(150, 168, 1.2, '#F43F5E', 0)}${heart(240, 150, 1.5, '#FB7185', 0.5)}${heart(334, 166, 1.2, '#F43F5E', 1)}
        ${word('♪', 22, '#FDE047', 206, 140)}${word('♫', 20, '#FDE047', 276, 136)}
        ${sparkles([[110, 150, 7], [380, 150, 7]])}`)}`),
  ],
};
