// Phim bài đọc "Nhà rông", Tuần 14 Tiếng Việt 3: 5 cảnh, đánh số theo câu (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật: già làng (giaLang), trai làng (traiLang), gái làng (gaiLang), khách (chu) trong cast.js.
import { person, lying } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, moon, stars, tufts, flowers, sparkles, heart, soundWaves, fire, LINE } from '../sceneKit.js';

/** Núi rừng Tây Nguyên phía xa và đất đỏ bazan. */
const highland = (y = 214, night = false) => `
  <path d="M0 ${y - 40} Q60 ${y - 96} 130 ${y - 54} Q190 ${y - 110} 270 ${y - 60} Q340 ${y - 104} 400 ${y - 58} Q450 ${y - 86} 480 ${y - 60} V${y} H0Z" fill="${night ? '#1E3A5F' : '#86B7A0'}"/>
  <path d="M0 ${y - 16} Q90 ${y - 56} 180 ${y - 26} Q260 ${y - 58} 340 ${y - 24} Q420 ${y - 50} 480 ${y - 22} V${y} H0Z" fill="${night ? '#1F4D3A' : '#4C9A6A'}"/>
  <path d="M0 ${y} Q240 ${y - 14} 480 ${y} V${H} H0Z" fill="${night ? '#5B2E1E' : '#C9774A'}"/>
  <path d="M0 ${y + 30} Q240 ${y + 16} 480 ${y + 30} V${H} H0Z" fill="${night ? '#6B3A26' : '#D88B5A'}"/>`;

/** Cây kơ-nia / cây rừng xa (tán dẹt). */
const forestTree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-3 0 L-2 -40 H2 L3 0Z" fill="#7C4A21"/>
  <g class="sc-sway" style="--d:${(x % 7) / 3}s"><ellipse cx="0" cy="-44" rx="24" ry="12" fill="#2F7D4F"/><ellipse cx="-6" cy="-52" rx="16" ry="9" fill="#3E9B62"/><ellipse cx="8" cy="-50" rx="12" ry="8" fill="#3E9B62"/></g></g>`;

/**
 * Nhà rông nhìn chính diện: cột sàn cao, sàn tre, mái tranh dựng đứng hình lưỡi rìu, cầu thang gỗ.
 * (x giữa, y mặt đất). frame: chỉ có khung (đang dựng), lit: vách mở sáng đèn (đêm), inside: hình trong nhà (toạ độ nhà).
 */
function nhaRong(x, y, s = 1, { frame = false, lit = false, inside = '' } = {}) {
  const posts = [-52, -26, 0, 26, 52].map(dx => `<rect x="${dx - 3.5}" y="-44" width="7" height="44" fill="#7C4A21" stroke="${LINE}" stroke-width="0.8"/>`).join('');
  const floor = `<rect x="-66" y="-52" width="132" height="9" fill="#A16207" stroke="${LINE}" stroke-width="1"/>
    <path d="M-66 -47 H66" stroke="#78350F" stroke-width="0.8"/>`;
  const wall = `<rect x="-50" y="-80" width="100" height="28" fill="#D9B77E" stroke="${LINE}" stroke-width="1"/>
    ${Array.from({ length: 12 }, (_, i) => `<path d="M${-50 + i * 8.4} -80 l8.4 14 l-8.4 14" stroke="#B88A4A" stroke-width="1" fill="none"/>`).join('')}
    ${lit ? `<rect x="-46" y="-78" width="92" height="25" rx="2" fill="#FDE68A" stroke="${LINE}" stroke-width="1"/>
      ${[-16, 16].map(dx => `<rect x="${dx - 2}" y="-78" width="4" height="25" fill="#7C4A21"/>`).join('')}`
    : `<rect x="-11" y="-78" width="22" height="26" rx="2" fill="#5B3A1E" stroke="${LINE}" stroke-width="1"/>`}
    ${inside}`;
  const roofPath = 'M-74 -72 Q-46 -150 -10 -232 L0 -244 L10 -232 Q46 -150 74 -72 Q0 -82 -74 -72Z';
  const roof = frame
    ? `<path d="M-70 -74 L0 -238 L70 -74 M-46 -74 L0 -200 L46 -74 M-58 -110 H58 M-40 -150 H40 M-22 -190 H22 M0 -238 V-80" stroke="#A16207" stroke-width="3.4" fill="none" stroke-linecap="round"/>`
    : `<path d="${roofPath}" fill="#C9A15A" stroke="#7C5A2B" stroke-width="1.4"/>
      ${Array.from({ length: 9 }, (_, i) => `<path d="M${-60 + i * 15} -76 Q${-40 + i * 10} -150 ${-6 + i * 1.5} -228" stroke="#A8803E" stroke-width="1.2" fill="none"/>`).join('')}
      <path d="M-62 -100 Q0 -108 62 -100 M-50 -140 Q0 -146 50 -140 M-36 -180 Q0 -184 36 -180" stroke="#8B6A30" stroke-width="2" fill="none"/>
      <path d="M-34 -96 L0 -168 L34 -96Z" fill="#B88A4A" stroke="#7C5A2B" stroke-width="1"/>
      <path d="M-22 -104 L0 -150 L22 -104Z M-12 -112 L0 -136 L12 -112Z" fill="none" stroke="#7C2D12" stroke-width="2"/>
      <circle cx="0" cy="-122" r="5" fill="#DC2626" stroke="#7C2D12" stroke-width="1"/>
      <path d="M-4 -240 Q-16 -258 -24 -254 M4 -240 Q16 -258 24 -254" stroke="#7C4A21" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  const stair = `<path d="M-14 0 L-8 -50 M14 0 L8 -50" stroke="#7C4A21" stroke-width="3.4" stroke-linecap="round"/>
    ${[-8, -18, -28, -38].map(dy => `<path d="M${-13 + (-dy) * 0.1} ${dy} H${13 - (-dy) * 0.1}" stroke="#A16207" stroke-width="3"/>`).join('')}`;
  return `<g transform="translate(${x} ${y}) scale(${s})">${posts}${floor}${frame ? '' : wall}${roof}${stair}</g>`;
}

/** Nhà sàn nhỏ của dân làng. */
const nhaSan = (x, y, s = 1, c = '#B88A4A') => `<g transform="translate(${x} ${y}) scale(${s})">
  ${[-30, -10, 10, 30].map(dx => `<rect x="${dx - 2.5}" y="-24" width="5" height="24" fill="#7C4A21"/>`).join('')}
  <rect x="-40" y="-30" width="80" height="7" fill="#A16207"/>
  <rect x="-34" y="-52" width="68" height="22" fill="#D9B77E" stroke="${LINE}" stroke-width="0.8"/>
  <rect x="-7" y="-48" width="14" height="18" fill="#5B3A1E"/>
  <path d="M-48 -48 L-26 -82 H26 L48 -48Z" fill="${c}" stroke="#7C5A2B" stroke-width="1"/>
  <path d="M-36 -60 H36" stroke="#8B6A30" stroke-width="1.4"/></g>`;

/** Bó tre nứa nằm và đống gỗ. */
const timber = (x, y) => `<g transform="translate(${x} ${y})">
  ${[0, 1, 2].map(i => `<rect x="-40" y="${-10 - i * 9}" width="62" height="9" rx="4.5" fill="${i % 2 ? '#B45309' : '#92400E'}" stroke="${LINE}" stroke-width="0.8"/>
    <ellipse cx="22" cy="${-5.5 - i * 9}" rx="3.6" ry="4.4" fill="#FCD34D" stroke="${LINE}" stroke-width="0.6"/>`).join('')}
  ${[0, 1, 2, 3].map(i => `<path d="M${30 + i * 5} 0 L${60 + i * 4} -48" stroke="${i % 2 ? '#84CC16' : '#65A30D'}" stroke-width="4" stroke-linecap="round"/>`).join('')}
  <path d="M38 -12 L66 -16 M46 -28 L72 -34" stroke="#3F6212" stroke-width="1"/></g>`;

/** Bó cỏ tranh. */
const thatchBundle = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${-14 + i * 3.5} 10 L${-18 + i * 4.5} -14" stroke="${i % 2 ? '#D4A54A' : '#E2B85E'}" stroke-width="3" stroke-linecap="round"/>`).join('')}
  <path d="M-13 0 H13" stroke="#7C4A21" stroke-width="3"/></g>`;

/** Cây tre / nứa dài vác ngang. */
const pole = (x, y, len = 90, ang = -8) => `<g transform="translate(${x} ${y}) rotate(${ang})"><rect x="${-len / 2}" y="-3" width="${len}" height="6" rx="3" fill="#A3C55A" stroke="#4D7C0F" stroke-width="0.8"/>
  ${[-0.3, 0, 0.3].map(k => `<path d="M${len * k} -3 v6" stroke="#4D7C0F" stroke-width="1"/>`).join('')}</g>`;

/** Cái gùi đang đan. */
const basket = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-12 -26 H12 L8 0 H-8Z" fill="#D6A26B" stroke="#92400E" stroke-width="1"/>
  ${[-20, -13, -6].map(dy => `<path d="M-11 ${dy} H11" stroke="#A16207" stroke-width="1"/>`).join('')}
  ${[-6, 0, 6].map(dx => `<path d="M${dx} -26 L${dx * 0.7} 0" stroke="#A16207" stroke-width="0.8"/>`).join('')}
  <path d="M8 -24 Q22 -40 30 -30" stroke="#D6A26B" stroke-width="2" fill="none"/></g>`;

/** Bộ cồng chiêng treo trên giá. */
const gongs = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-46 0 V-74 M46 0 V-74 M-52 -74 H52" stroke="#7C4A21" stroke-width="4" stroke-linecap="round"/>
  ${[-30, 0, 30].map((dx, i) => `<g transform="translate(${dx} -50)"><g class="sc-sway" style="--d:${i * 0.5}s">
    <path d="M0 -24 V-14" stroke="#7C4A21" stroke-width="1.4"/>
    <circle r="${14 - i * 1.5}" fill="#EAB308" stroke="#A16207" stroke-width="1.4"/><circle r="${6 - i * 0.5}" fill="#FACC15" stroke="#A16207" stroke-width="1.2"/></g></g>`).join('')}</g>`;

/** Cây nêu ngày lễ: cột cao, tua và cờ phướn. */
const cayNeu = (x, y) => `<g transform="translate(${x} ${y})">
  <rect x="-3" y="-190" width="6" height="190" fill="#B45309" stroke="${LINE}" stroke-width="0.8"/>
  ${[-170, -140, -110].map((dy, i) => `<g class="sc-sway" style="--d:${i * 0.6}s"><path d="M3 ${dy} q22 6 30 22 q-14 -4 -30 -10Z" fill="${['#DC2626', '#FACC15', '#F8FAFC'][i]}" stroke="${LINE}" stroke-width="0.6"/></g>`).join('')}
  <path d="M0 -190 Q-18 -206 -26 -198 M0 -190 Q18 -206 26 -198" stroke="#7C4A21" stroke-width="3" fill="none"/>
  <path d="M-12 -60 H12 M-10 -50 H10" stroke="#DC2626" stroke-width="3"/></g>`;

export default {
  sentences: true,
  groups: [[0, 1, 2], [3, 4], [5], [6, 7], [8, 9, 10]],
  scenes: [
    // Cảnh 1: làng Tây Nguyên nào cũng có nhà rông; nhà sàn cao lớn, đẹp nhất; dựng bằng gỗ, tre nứa, mái cỏ tranh
    () => svg('Làng Tây Nguyên có nhà rông cao lớn nhất làng', `
      ${sky('t14s1sky', '#7DD3FC', '#FEF3C7')}
      ${sun(392, 46, 18)}${cloud(130, 40, 0.8, 0)}${cloud(300, 30, 0.6, 2)}
      ${highland(214)}
      ${forestTree(86, 184, 0.8)}${forestTree(414, 182, 0.9)}${forestTree(200, 176, 0.6)}
      ${at(1, `${nhaSan(120, 226, 0.9)}${nhaSan(372, 224, 0.8, '#C9A15A')}`)}
      ${at(2, nhaRong(246, 244, 0.84))}
      ${at(2, sparkles([[176, 70, 8], [318, 92, 9], [206, 130, 6]]))}
      ${at(3, timber(146, 286))}
      ${at(3, thatchBundle(300, 284, 1.3))}
      ${at(1, person(370, 284, 'giaLang', 'point', { s: 0.78, flip: true }), { talk: '2' })}
      ${tufts([[100, 262], [330, 284], [180, 296]], '#65A30D')}`),

    // Cảnh 2: dân làng cùng nhau dựng nhà rông; làng lớn, nhiều người tài thì nhà rông càng bề thế
    () => svg('Dân làng cùng nhau dựng nhà rông', `
      ${sky('t14s2sky', '#93C5FD', '#FEF9C3')}
      ${sun(110, 48, 18)}${cloud(330, 40, 0.8, 1)}
      ${highland(212)}
      ${forestTree(410, 182, 0.9)}${forestTree(90, 180, 0.7)}
      ${at(1, nhaRong(250, 240, 0.8, { frame: true }), { off: 2 })}
      ${at(2, nhaRong(250, 242, 0.85))}
      ${at(2, `${sparkles([[160, 60, 9], [330, 70, 10], [300, 140, 6], [180, 150, 7]])}`)}
      ${at(1, `${person(126, 282, 'traiLang', 'hold', { s: 0.8, prop: 'calf' })}${pole(126, 192, 86, -66)}`)}
      ${at(1, `${person(194, 284, 'gaiLang', 'hold', { s: 0.76, prop: 'calf' })}${thatchBundle(194, 200, 1.1)}`)}
      ${at(1, person(306, 284, 'traiLang', 'dig', { s: 0.8, prop: 'hoe' }))}
      ${at(1, person(372, 284, 'giaLang', 'point', { s: 0.8, flip: true }), { off: 2 })}
      ${at(2, person(372, 284, 'giaLang', 'cheer', { s: 0.8, mood: 'joy' }))}`),

    // Cảnh 3: nhà rông đón khách, già làng bàn việc chung, đàn ông ngồi trò chuyện, vót nan, đan lát
    () => svg('Nhà rông là nơi đón khách, già làng bàn việc, đàn ông đan lát', `
      ${sky('t14s3sky', '#7DD3FC', '#FEF3C7')}
      ${cloud(380, 36, 0.7, 1)}
      ${highland(204)}
      ${nhaRong(250, 234, 0.82)}
      ${at(1, person(126, 284, 'chu', 'walk', { s: 0.82 }))}
      ${at(1, person(196, 284, 'giaLang', 'wave', { s: 0.82, flip: true }), { talk: '1' })}
      ${at(1, person(312, 284, 'giaLang', 'point', { s: 0.82, flip: true }))}
      ${at(1, person(366, 284, 'traiLang', 'sit', { s: 0.8 }))}
      ${at(1, basket(398, 284, 1))}
      ${at(1, `<path d="M352 272 L376 252" stroke="#A3C55A" stroke-width="3" stroke-linecap="round"/>`)}
      ${tufts([[90, 290], [250, 296]], '#65A30D')}`),

    // Cảnh 4: đêm, trai tráng ngủ ở nhà rông; xưa kia trai làng thay nhau canh giữ làng
    () => svg('Ban đêm trai làng ngủ ở nhà rông và canh giữ làng', `
      ${sky('t14s4sky', '#0F172A', '#334155')}
      ${moon(392, 54, 20)}
      ${stars([[110, 40], [160, 70], [230, 30], [300, 64], [340, 26], [130, 110], [420, 110]])}
      ${highland(212, true)}
      <circle cx="232" cy="176" r="56" fill="#FDE68A" opacity="0.14"/>
      ${nhaRong(232, 244, 0.9, { lit: true, inside: `<g data-l="1">${[-30, 0, 30].map((dx, i) => `<g transform="translate(${dx + 4} -53)">${lying(0, 0, 'traiLang', { s: 0.3, blanket: ['#B45309', '#DC2626', '#A16207'][i], len: 60 })}</g>`).join('')}</g>` })}
      ${at(1, `<g class="sc-twinkle">${[[272, 150, 11], [284, 136, 14], [298, 120, 17]].map(([x, y, f]) => `<text x="${x}" y="${y}" font-size="${f}" font-weight="800" fill="#E0F2FE" font-family="Quicksand, sans-serif">z</text>`).join('')}</g>`)}
      ${at(2, fire(166, 288, 0.9))}
      ${at(2, person(352, 286, 'traiLang', 'stand', { s: 0.86, prop: 'stick', flip: true }))}
      ${at(2, person(118, 286, 'traiLang', 'stand', { s: 0.82, prop: 'stick' }))}`),

    // Cảnh 5: lễ hội chung của dân làng bên nhà rông, cồng chiêng vang; nhắc Tây Nguyên là nhắc nhà rông
    () => svg('Lễ hội cồng chiêng bên nhà rông', `
      ${sky('t14s5sky', '#7DD3FC', '#FDE68A')}
      ${sun(112, 46, 18)}${cloud(320, 34, 0.7, 2)}
      ${highland(212)}
      ${nhaRong(250, 240, 0.84)}
      ${at(1, cayNeu(116, 262))}
      ${at(1, gongs(300, 286, 0.8))}
      ${at(1, person(358, 286, 'traiLang', 'raise', { s: 0.8, prop: 'stick', flip: true }), { talk: '' })}
      ${at(1, soundWaves(276, 214, 1.1))}
      ${at(1, person(160, 288, 'gaiLang', 'cheer', { s: 0.78, mood: 'joy' }))}
      ${at(1, person(226, 290, 'gaiLang', 'cheer', { s: 0.78, mood: 'joy' }))}
      ${at(2, flowers([[150, 296, '#F472B6'], [270, 298, '#FDE047'], [96, 298, '#F87171']]))}
      ${at(2, sparkles([[150, 120, 8], [372, 120, 9], [240, 70, 7]]))}
      ${at(3, `${heart(200, 140, 1.2, '#F43F5E', 0)}${heart(330, 150, 1.1, '#FB7185', 0.6)}${heart(268, 40, 1.3, '#F43F5E', 1.2)}`)}`),
  ],
};
