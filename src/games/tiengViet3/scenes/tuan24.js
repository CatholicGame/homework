// Cảnh phim bài thơ "Đàn chim sẻ" (Phạm Hổ), Tuần 24 Tiếng Việt 3: 4 khổ, mỗi khổ một cảnh.
// data-l="k": hiện từ dòng thứ k của khổ (đếm từ 1); data-off: ẩn từ dòng đó (đổi dáng); data-talk: nhân vật nói thì nhún.
// Nhân vật trong cast.js: bà cụ (ba), đàn trẻ (linh, nam, tun, mai, minh, lan, bon); Tấm trong truyện cổ (coBe).
// Phố ngày Tết, cây hoa đào, bao gạo nếp, hạt nếp đổ trắng đường, chim sẻ vẽ riêng ở đây.
import { person } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, sparkles, heart, thought, cityRow, LINE } from '../sceneKit.js';

/** Phố ngày Tết: nhà phố, vỉa hè, lòng đường (mặt đường từ y 226). */
const street = (id) => `${sky(id, '#7DD3FC', '#FEF3C7')}
  ${cloud(130, 36, 0.6, 1)}${cloud(360, 30, 0.5, 3)}
  ${cityRow(206, [[40, 70, 120, '#FDBA74'], [110, 64, 96, '#FDE68A'], [174, 70, 130, '#FCA5A5'], [244, 60, 100, '#A7F3D0'], [304, 74, 124, '#C4B5FD'], [378, 70, 104, '#FDE68A']])}
  <rect y="204" width="${W}" height="22" fill="#E7E5E4"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M${i * 40} 204 V226" stroke="#D6D3D1" stroke-width="1"/>`).join('')}
  <rect y="226" width="${W}" height="${H - 226}" fill="#A8A29E"/>
  <path d="M0 226 H${W}" stroke="#78716C" stroke-width="3"/>`;

/** Dây đèn lồng đỏ ngày Tết căng qua phố. */
const lanterns = (y = 60) => `<path d="M60 ${y - 10} Q240 ${y + 20} 420 ${y - 10}" stroke="#78350F" stroke-width="1.4" fill="none"/>
  ${[100, 150, 200, 250, 300, 350, 390].map((x, i) => {
    const yy = y - 10 + 30 * (1 - Math.pow((x - 240) / 180, 2)) * 0.66;
    return `<g transform="translate(${x} ${yy.toFixed(1)})"><g class="sc-sway" style="--d:${i * 0.4}s">
      <path d="M0 0 V4" stroke="#78350F" stroke-width="1.2"/><ellipse cx="0" cy="12" rx="8" ry="9" fill="#DC2626" stroke="${LINE}" stroke-width="0.8"/>
      <rect x="-4" y="2" width="8" height="3" fill="#FACC15"/><rect x="-4" y="19" width="8" height="3" fill="#FACC15"/><path d="M0 22 V28" stroke="#FACC15" stroke-width="1.6"/></g></g>`;
  }).join('')}`;

/** Cây hoa đào trong chậu (x giữa, y đáy chậu). */
function peachTree(x, y, s = 1) {
  const blooms = [[-30, -96], [-14, -112], [6, -104], [26, -116], [36, -90], [-38, -76], [16, -82], [-6, -128], [44, -108], [-22, -94]];
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M0 -26 Q-4 -60 -24 -90 M-2 -54 Q14 -80 30 -110 M8 -74 Q30 -84 42 -96 M-12 -74 Q-2 -100 -6 -124" stroke="#5B3416" stroke-width="4" fill="none" stroke-linecap="round"/>
    <g class="sc-sway" style="--d:0.4s">${blooms.map(([bx, by], i) => `<g transform="translate(${bx} ${by})">${[0, 72, 144, 216, 288].map(r => `<ellipse cy="-4.4" rx="3.4" ry="4.6" fill="${i % 3 ? '#F9A8D4' : '#F472B6'}" transform="rotate(${r})"/>`).join('')}<circle r="2" fill="#FDE047"/></g>`).join('')}</g>
    <path d="M-20 -26 H20 L15 0 H-15Z" fill="#B45309" stroke="${LINE}" stroke-width="0.9"/><path d="M-20 -26 H20" stroke="#FACC15" stroke-width="3"/></g>`;
}

/** Cánh hoa đào bay. */
const petals = (list) => list.map(([x, y], i) => `<g transform="translate(${x} ${y})"><g class="sc-fall" style="--d:${i * 1.6}s"><ellipse rx="3" ry="4" fill="#F9A8D4"/></g></g>`).join('');

/** Bao gạo nếp (x giữa, y đáy); open: miệng bao bung dây, tilt: nghiêng đổ. */
function sack(x, y, s = 1, { open = false, tilt = 0, full = true } = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${tilt})">
    <path d="M-15 0 Q-19 -18 -13 ${full ? -34 : -26} Q0 ${full ? -38 : -30} 13 ${full ? -34 : -26} Q19 -18 15 0Z" fill="#E7D3A8" stroke="${LINE}" stroke-width="0.9"/>
    <path d="M-9 -16 h18 M-8 -10 h16" stroke="#B8955A" stroke-width="1.2"/>
    ${open
      ? `<ellipse cx="0" cy="${full ? -35 : -27}" rx="12" ry="4" fill="#fff" stroke="${LINE}" stroke-width="0.7"/>
         <path d="M-6 ${full ? -36 : -28} q-6 -10 -14 -6 M4 ${full ? -36 : -28} q8 -8 14 -2" stroke="#DC2626" stroke-width="1.8" fill="none" stroke-linecap="round"/>`
      : `<path d="M-8 ${full ? -35 : -27} Q0 ${full ? -46 : -38} 8 ${full ? -35 : -27}" fill="#E7D3A8" stroke="${LINE}" stroke-width="0.8"/>
         <path d="M-6 ${full ? -37 : -29} h12" stroke="#DC2626" stroke-width="2.4" stroke-linecap="round"/>`}</g>`;
}

/** Hạt nếp trắng rải trên đường: vệt (x, y, rộng, cao). */
function spill(x, y, w, h, seed = 1) {
  const n = Math.round(w * h / 36);
  const dots = Array.from({ length: n }, (_, i) => {
    const a = ((i * 137.5 + seed * 31) % 360) * Math.PI / 180, r = Math.sqrt(((i * 53 + seed * 17) % 97) / 97);
    return `<ellipse cx="${(x + Math.cos(a) * r * w / 2).toFixed(1)}" cy="${(y + Math.sin(a) * r * h / 2).toFixed(1)}" rx="1.8" ry="1.1" fill="#fff" transform="rotate(${(i * 47) % 180} ${(x + Math.cos(a) * r * w / 2).toFixed(1)} ${(y + Math.sin(a) * r * h / 2).toFixed(1)})"/>`;
  }).join('');
  return `<ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="${h / 2}" fill="#F8FAFC" opacity="0.75"/>${dots}`;
}

/** Hạt nếp bay về bao. */
const grainsUp = (list) => list.map(([x, y], i) => `<g class="sc-rise" style="--d:${i * 0.5}s"><ellipse cx="${x}" cy="${y}" rx="2" ry="1.2" fill="#fff" stroke="#CBD5E1" stroke-width="0.4"/><ellipse cx="${x + 5}" cy="${y + 4}" rx="2" ry="1.2" fill="#fff" stroke="#CBD5E1" stroke-width="0.4"/></g>`).join('');

/** Chim sẻ nâu (chân ở (x, y), nhìn phải); peck: cúi mổ hạt. */
function sparrow(x, y, s = 1, { flip = false, peck = false, d = 0 } = {}) {
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><g class="sc-bob" style="--d:${d}s"><g transform="rotate(${peck ? 28 : 0} 0 -6)">
    <path d="M-8 -9 L-18 -14 L-16 -6Z" fill="#78350F"/>
    <ellipse cx="0" cy="-8" rx="10" ry="7" fill="#A16207" stroke="${LINE}" stroke-width="0.7"/>
    <ellipse cx="2" cy="-5" rx="6" ry="3.6" fill="#FEF3C7"/>
    <path d="M-6 -11 Q0 -14 5 -9" stroke="#78350F" stroke-width="2" fill="none"/>
    <circle cx="8" cy="-14" r="5.4" fill="#92400E" stroke="${LINE}" stroke-width="0.7"/>
    <circle cx="9" cy="-12" r="2.6" fill="#FEF3C7"/>
    <path d="M12.6 -15 L17 -13.6 L12.6 -12.2Z" fill="#F59E0B"/><circle cx="9.6" cy="-15.4" r="1.1" fill="#1C1917"/></g>
    <path d="M-2 -1 V1 M3 -1 V1" stroke="#B45309" stroke-width="1.3"/></g></g>`;
}

/** Khăn quàng đỏ đeo cổ bạn nhỏ (x chân, y chân, s tỉ lệ của person). */
const scarf = (x, y, s) => `<g transform="translate(${x} ${y - 78 * s}) scale(${s})">
  <path d="M-9 -2 L9 -2 L2 6 L6 20 L0 12 L-6 20 L-2 6Z" fill="#DC2626" stroke="#991B1B" stroke-width="0.8" stroke-linejoin="round"/></g>`;

/** Cờ đỏ sao vàng nhỏ cắm trên cột (x chân, y). */
const flag = (x, y, h = 120) => `<rect x="${x - 1.6}" y="${y - h}" width="3.2" height="${h}" fill="#64748B"/>
  <g class="sc-sway"><rect x="${x + 1.6}" y="${y - h + 2}" width="36" height="24" fill="#DA251D"/>
  <polygon points="${x + 19.6},${y - h + 7} ${x + 21.6},${y - h + 12} ${x + 27},${y - h + 12.3} ${x + 22.8},${y - h + 15.6} ${x + 24.3},${y - h + 20.8} ${x + 19.6},${y - h + 17.8} ${x + 14.9},${y - h + 20.8} ${x + 16.4},${y - h + 15.6} ${x + 12.2},${y - h + 12.3} ${x + 17.6},${y - h + 12}" fill="#FFFF00"/></g>`;

/** Nét chuyển động nhanh. */
const speedLines = (list) => list.map(([x, y, w]) => `<path d="M${x} ${y} h${w}" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`).join('');

/** Bà cụ xách bao nếp trước ngực (dáng hold, bao vẽ đè lên tay). */
const baSack = (x, y, s, { mood, open = false, flip = false } = {}) =>
  `${person(x, y, 'ba', 'hold', { s, mood, flip, prop: 'calf' })}${sack(x + (flip ? -2 : 2) * s, y - 62 * s, 1.15 * s, { open })}`;

export default [
  // Khổ 1: giữa đường phố vui, hoa đào báo Tết, có bà cụ già xách bao gạo nếp
  () => svg('Phố ngày Tết có hoa đào, bà cụ xách bao gạo nếp', `
    ${street('t24s1sky')}
    ${at(1, lanterns(64))}
    ${at(1, `${person(120, 282, 'bo', 'walk', { s: 0.62, flip: true })}${person(152, 284, 'mai', 'walk', { s: 0.62, flip: true })}`)}
    ${at(2, `${peachTree(374, 228, 0.95)}${petals([[330, 120], [360, 140], [300, 110], [390, 150]])}`)}
    ${at(3, baSack(244, 288, 0.86))}
    ${at(4, `<circle class="sc-twinkle" cx="${246}" cy="${288 - 62 * 0.86 - 22}" r="30" fill="none" stroke="#F59E0B" stroke-width="3" stroke-dasharray="6 4"/>
      ${sparkles([[282, 196, 7], [212, 200, 6]])}`)}`),

  // Khổ 2: bao không buộc kỹ, nếp đổ trắng đường; gọi nhau, đàn trẻ ùa ra nhặt giùm
  () => svg('Bao không buộc kỹ, nếp đổ trắng đường; đàn trẻ ùa ra nhặt giùm', `
    ${street('t24s2sky')}
    ${lanterns(64)}
    ${at(1, `${baSack(360, 286, 0.86, { open: true, flip: true })}<circle class="sc-twinkle" cx="358" cy="206" r="20" fill="none" stroke="#F59E0B" stroke-width="3" stroke-dasharray="6 4"/>`, { off: 2 })}
    ${at(2, `${person(360, 286, 'ba', 'give', { s: 0.86, flip: true, mood: 'wow' })}${sack(318, 226, 1.0, { open: true, tilt: -50, full: false })}`)}
    ${at(2, `<g class="sc-rain"><path d="M300 222 l-4 12 M292 216 l-6 10 M306 230 l-2 12" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></g>${spill(250, 266, 160, 34, 2)}`)}
    ${at(3, `${person(122, 222, 'nam', 'wave', { s: 0.7 })}${person(170, 220, 'linh', 'wave', { s: 0.7 })}${person(214, 222, 'tun', 'stand', { s: 0.7, flip: true })}`, { off: 4, talk: '3' })}
    ${at(4, `${person(150, 284, 'nam', 'run', { s: 0.74 })}${person(200, 282, 'linh', 'run', { s: 0.74 })}${person(108, 286, 'tun', 'run', { s: 0.74 })}
      ${speedLines([[66, 230, 22], [70, 250, 18], [120, 220, 16], [164, 246, 14]])}`)}`),

  // Khổ 3: những bàn tay nhỏ nhìn dễ thương sao, tíu ta tíu tít, nhặt vội nhặt mau
  () => svg('Các bạn nhỏ ngồi nhặt hạt nếp tíu tít', `
    ${street('t24s3sky')}
    ${peachTree(400, 204, 0.7)}
    ${at(1, spill(240, 262, 190, 40, 3), { off: 4 })}
    ${at(4, spill(240, 266, 110, 18, 4))}
    ${sack(240, 250, 1.1, { open: true, full: false })}
    ${at(1, `${person(170, 270, 'nam', 'sit', { s: 0.74 })}${person(312, 270, 'linh', 'sit', { s: 0.74, flip: true })}`)}
    ${at(1, `<circle class="sc-twinkle" cx="176" cy="234" r="14" fill="none" stroke="#F59E0B" stroke-width="2.4" stroke-dasharray="5 4"/>
      <circle class="sc-twinkle" style="--d:0.5s" cx="306" cy="234" r="14" fill="none" stroke="#F59E0B" stroke-width="2.4" stroke-dasharray="5 4"/>`, { off: 2 })}
    ${at(2, `${heart(200, 140, 1.3, '#F43F5E', 0)}${heart(282, 136, 1.2, '#FB7185', 0.7)}${heart(240, 120, 1.4, '#F43F5E', 1.3)}`)}
    ${at(3, `${person(120, 288, 'tun', 'sit', { s: 0.74 })}${person(364, 288, 'mai', 'sit', { s: 0.74, flip: true })}`)}
    ${at(3, `${[[96, 214], [140, 210], [340, 212], [386, 216]].map(([x, y], i) => `<path class="sc-twinkle" style="--d:${i * 0.3}s" d="M${x} ${y} q4 -6 8 0 q4 6 8 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join('')}`)}
    ${at(4, grainsUp([[214, 238], [262, 236], [228, 246], [252, 248]]))}`),

  // Khổ 4: nếp trở vào bao như chưa hề đổ; bà cụ tươi cười nhìn đàn cháu nhỏ, nhìn đàn chim sẻ;
  //        truyện "Tấm Cám" xưa nay thành đông đúc cháu ngoan Bác Hồ
  () => svg('Bà cụ tươi cười nhìn đàn cháu nhỏ như đàn chim sẻ nhặt thóc giúp Tấm', `
    ${street('t24s4sky')}
    ${lanterns(40)}
    ${at(8, flag(110, 220, 120))}
    ${at(1, `${sack(300, 286, 1.2, { full: true })}${sparkles([[300, 232, 7]])}`)}
    ${at(2, sparkles([[150, 268, 7], [230, 276, 6], [380, 272, 6]], '#FFFFFF'))}
    ${person(356, 286, 'ba', 'stand', { s: 0.86, flip: true })}
    ${at(3, person(356, 286, 'ba', 'clap', { s: 0.86, flip: true, mood: 'joy' }))}
    ${at(4, `${heart(330, 140, 1.2, '#F43F5E', 0)}${heart(306, 158, 0.9, '#FB7185', 0.8)}`)}
    ${at(7, `${person(146, 262, 'minh', 'cheer', { s: 0.6, mood: 'joy' })}${person(196, 262, 'lan', 'cheer', { s: 0.6, mood: 'joy' })}${person(246, 262, 'bon', 'cheer', { s: 0.6, mood: 'joy' })}`)}
    ${at(8, `${scarf(196, 262, 0.6)}${scarf(246, 262, 0.6)}`)}
    ${person(124, 288, 'nam', 'stand', { s: 0.74 })}${person(178, 290, 'linh', 'stand', { s: 0.74 })}${person(232, 288, 'tun', 'stand', { s: 0.74 })}
    ${at(8, scarf(232, 288, 0.74))}
    ${at(5, thought(206, 70, 196, 82, 326, 150, `
      <ellipse cx="-30" cy="26" rx="56" ry="9" fill="#FEF3C7"/>
      ${[[-70, 20], [-58, 28], [-40, 24], [-22, 30], [-10, 22], [6, 28]].map(([gx, gy]) => `<ellipse cx="${gx}" cy="${gy}" rx="1.8" ry="1.1" fill="#CA8A04"/>`).join('')}
      ${sparrow(-64, 26, 0.9, { peck: true })}${sparrow(-30, 28, 0.9, { peck: true, flip: true, d: 0.6 })}${sparrow(-4, 26, 0.9, { peck: true, d: 1.2 })}
      <g class="sc-bob" style="--d:0.3s"><g transform="translate(-40 -16) scale(0.8) rotate(-12)">${sparrow(0, 0, 1)}</g></g>`))}
    ${at(6, `<g transform="translate(206 70)">
      ${person(56, 34, 'coBe', 'stand', { s: 0.5, flip: true })}
      <path d="M22 32 Q36 40 50 32 L46 22 H26Z" fill="#D97706" stroke="${LINE}" stroke-width="0.8"/>
      <ellipse cx="36" cy="22" rx="10" ry="3" fill="#FEF3C7"/></g>`)}
    ${at(7, sparkles([[150, 186, 6], [250, 186, 6]]))}
    ${at(8, sparkles([[90, 120, 8], [260, 150, 7], [170, 140, 7]]))}`),
];
