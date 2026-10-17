// Phim truyện "Bà tôi" (theo Nguyễn Khải), Tuần 10 Tiếng Việt 3: 5 cảnh, đọc từng câu.
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật: bà (ba), "tôi" là cháu (chau), bố mẹ (bo, me) ngồi mâm cơm.
import { person } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, moon, stars, tree, heart, sparkles, thought, lowTable, word, LINE } from '../sceneKit.js';

/** Trong nhà: vách gỗ, cửa sổ chấn song (night: trời đêm ngoài cửa), nền gạch, chiếc chiếu. */
function room(id, night = false) {
  const out = night ? '#1E1B4B' : '#BAE6FD';
  return `
    <rect width="${W}" height="${H}" fill="${night ? '#8A6A4A' : '#D9B48A'}"/>
    ${Array.from({ length: 12 }, (_, i) => `<path d="M${i * 42} 0 V214" stroke="${night ? '#6F543A' : '#C49A6C'}" stroke-width="2"/>`).join('')}
    <rect x="0" y="20" width="${W}" height="8" fill="#7C4A21"/>
    <g><rect x="300" y="52" width="92" height="84" fill="${out}" stroke="#7C4A21" stroke-width="6"/>
      ${night ? `${moon(368, 82, 14)}${stars([[318, 70], [340, 112], [384, 118], [326, 96]])}` : `${cloud(334, 86, 0.5, 0)}<path d="M303 128 Q340 112 389 124 V133 H303Z" fill="#86EFAC"/>`}
      ${[318, 336, 354, 372].map(x => `<rect x="${x - 2}" y="55" width="4" height="78" fill="#92400E"/>`).join('')}</g>
    <rect x="0" y="210" width="${W}" height="${H - 210}" fill="${night ? '#9A4F32' : '#C9734A'}"/>
    ${Array.from({ length: 6 }, (_, i) => `<path d="M0 ${222 + i * 16} H${W}" stroke="${night ? '#86432A' : '#B5603A'}" stroke-width="1.2"/>`).join('')}
    <path d="M70 232 H410 L430 300 H50Z" fill="#FDE68A" stroke="#CA8A04" stroke-width="1"/>
    ${Array.from({ length: 10 }, (_, i) => `<path d="M${84 + i * 34} 232 L${70 + i * 38} 300" stroke="#EAB308" stroke-width="1" opacity="0.6"/>`).join('')}
    <path d="M60 266 H420" stroke="#DC2626" stroke-width="2" opacity="0.45"/>`;
}

/** Nồi cơm gang có hơi bốc lên (x giữa, y đáy). */
const pot = (x, y, open = true) => `<g transform="translate(${x} ${y})">
  ${open ? [-8, 2, 12].map((dx, i) => `<path class="sc-rise" style="--d:${i * 0.9}s" d="M${dx} -30 q-5 -7 0 -14 q5 -7 0 -14" stroke="#E2E8F0" stroke-width="2.6" fill="none" stroke-linecap="round"/>`).join('') : ''}
  <path d="M-24 -26 Q-26 0 0 0 Q26 0 24 -26Z" fill="#44403C" stroke="${LINE}" stroke-width="1"/>
  <ellipse cy="-26" rx="24" ry="6" fill="#57534E" stroke="${LINE}" stroke-width="1"/>
  ${open ? `<ellipse cy="-27" rx="19" ry="4" fill="#FFFFFF"/>` : ''}
  <path d="M-28 -20 h6 M22 -20 h6" stroke="#292524" stroke-width="3" stroke-linecap="round"/></g>`;

/** Bát cơm (x giữa, y đáy); fill: cơm trắng / cháy / nước dưa. */
const bowl = (x, y, s = 1, top = '#FFFFFF') => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-11 -10 H11 Q10 0 0 1 Q-10 0 -11 -10Z" fill="#fff" stroke="#3B82F6" stroke-width="1.1"/>
  <path d="M-9 -4 H9" stroke="#3B82F6" stroke-width="0.8"/>
  <ellipse cy="-11" rx="10" ry="${top === '#FFFFFF' ? 4.4 : 2.6}" fill="${top}" stroke="#CBD5E1" stroke-width="0.6"/></g>`;

/** Đĩa cá kho / rau trên mâm. */
const fishPlate = (x, y) => `<g transform="translate(${x} ${y})"><ellipse rx="18" ry="5.6" fill="#fff" stroke="#94A3B8" stroke-width="1"/>
  <path d="M-11 -2 Q-2 -9 8 -2 L13 -6 V2 L8 -2 Q-2 5 -11 -2Z" fill="#B45309" stroke="#78350F" stroke-width="0.7"/><circle cx="-6" cy="-3" r="0.9" fill="#1F2937"/></g>`;
const greens = (x, y) => `<g transform="translate(${x} ${y})"><ellipse rx="16" ry="5" fill="#fff" stroke="#94A3B8" stroke-width="1"/>
  ${[-8, -2, 4, 9].map((dx, i) => `<ellipse cx="${dx}" cy="-2" rx="5" ry="2.4" fill="${i % 2 ? '#16A34A' : '#4ADE80'}"/>`).join('')}</g>`;
/** Đĩa cà pháo trắng tròn. */
const caPhao = (x, y) => `<g transform="translate(${x} ${y})"><ellipse rx="14" ry="4.6" fill="#fff" stroke="#94A3B8" stroke-width="1"/>
  ${[[-6, -3], [0, -4], [6, -3], [-3, -6], [3, -6]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="3.1" fill="#F5F5F4" stroke="#A3A3A3" stroke-width="0.6"/><path d="M${a - 1.4} ${b - 3} h2.8" stroke="#16A34A" stroke-width="1.2"/>`).join('')}</g>`;

/** Mâm cơm với các món (x giữa, y sàn). */
const tray = (x, y) => `${lowTable(x, y, 150)}${fishPlate(x - 30, y - 20)}${greens(x + 28, y - 22)}${caPhao(x + 2, y - 14)}`;

/** Đèn dầu (x giữa, y đáy); wind: ngọn lửa chao nghiêng trước gió. */
const lamp = (x, y, s = 1, wind = false) => `<g transform="translate(${x} ${y}) scale(${s})">
  <circle cy="-40" r="34" fill="#FEF3C7" opacity="0.35"/><circle cy="-40" r="20" fill="#FDE68A" opacity="0.4"/>
  <path d="M-14 0 H14 L10 -8 H-10Z" fill="#B45309" stroke="${LINE}" stroke-width="0.9"/>
  <path d="M-12 -8 Q-16 -22 -4 -26 H4 Q16 -22 12 -8Z" fill="#7DD3FC" fill-opacity="0.7" stroke="#0284C7" stroke-width="0.9"/>
  <rect x="-6" y="-30" width="12" height="5" fill="#A8A29E" stroke="${LINE}" stroke-width="0.7"/>
  <path d="M-6 -30 Q-9 -46 -4 -58 H4 Q9 -46 6 -30Z" fill="#E0F2FE" fill-opacity="0.55" stroke="#94A3B8" stroke-width="0.9"/>
  <g class="sc-sway" style="--d:0.3s"><path d="M0 -32 Q${wind ? '-9 -38 -4 -48 Q0 -42 3 -38' : '-5 -38 0 -48 Q5 -38 0 -32'}Z" fill="#F97316"/><path d="M0 -33 Q-2 -37 0 -41 Q2 -37 0 -33Z" fill="#FDE047"/></g></g>`;

/** Gió thổi vào cửa sổ. */
const wind = (x, y) => [0, 1, 2].map(i => `<path class="sc-drift" style="--d:${i}s" d="M${x} ${y + i * 14} q14 -8 28 0 t28 0" stroke="#E0F2FE" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.85"/>`).join('');

/** Cành mai trong bong bóng kể chuyện. */
const plum = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-18 14 Q-4 2 6 -4 Q14 -10 20 -16 M-2 4 Q2 -8 -4 -16" stroke="#78350F" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  ${[[6, -4], [20, -16], [-4, -16], [12, -12], [-10, 8]].map(([a, b], i) => `<g transform="translate(${a} ${b})">${[0, 72, 144, 216, 288].map(r => `<circle cy="-3.4" r="2.6" fill="${i % 2 ? '#F9A8D4' : '#FBCFE8'}" transform="rotate(${r})"/>`).join('')}<circle r="1.6" fill="#FDE047"/></g>`).join('')}</g>`;

export default {
  sentences: true,
  groups: [[0, 1, 2], [3, 4, 5, 6], [7, 8], [9, 10], [11, 12, 13]],
  scenes: [
    // Cảnh 1: bà ngồi đầu nồi đánh tơi cơm, xới cho bà bát trên rồi xới cho cả nhà; bao giờ bà cũng ăn sau
    () => svg('Bà ngồi đầu nồi xới cơm cho cả nhà', `
      ${room('t10s1')}
      ${at(1, `${person(222, 252, 'chau', 'sit', { s: 0.8 })}${person(300, 248, 'me', 'sit', { s: 0.72, flip: true })}`, { off: 2 })}
      ${at(2, `${person(222, 252, 'chau', 'sit', { s: 0.8, prop: 'bowl', mood: 'joy' })}${person(300, 248, 'me', 'sit', { s: 0.72, flip: true, prop: 'bowl' })}`)}
      ${tray(262, 278)}
      ${at(1, person(350, 276, 'bo', 'sit', { s: 0.8, flip: true }), { off: 2 })}
      ${at(2, person(350, 276, 'bo', 'sit', { s: 0.8, flip: true, prop: 'bowl' }))}
      ${at(1, `${pot(172, 288)}<path d="M160 224 L188 256" stroke="#A16207" stroke-width="4" stroke-linecap="round"/><ellipse cx="189" cy="256" rx="5" ry="3" fill="#CA8A04"/>`)}
      ${at(1, person(136, 276, 'ba', 'sit', { s: 0.82 }), { off: 3 })}
      ${at(2, bowl(160, 264, 0.9), { off: 3 })}
      ${at(3, `${person(136, 276, 'ba', 'sit', { s: 0.82, mood: 'joy' })}${bowl(108, 274, 0.8)}`)}
      ${at(3, `${heart(222, 130, 1.1, '#F43F5E', 0)}${heart(300, 136, 1, '#FB7185', 0.7)}${sparkles([[126, 140, 6], [160, 150, 5]])}`)}`),

    // Cảnh 2: mùa hè bà quạt, mùa rét bà nghỉ rồi mới ăn; bà ăn rất ít; thấy cháu thích món gì bà ít ăn món ấy; bà chan nước dưa, ăn cà pháo
    () => svg('Bà ăn rất ít, nhường món ngon cho cháu', `
      ${room('t10s2')}
            ${at(1, person(232, 252, 'chau', 'sit', { s: 0.82, prop: 'bowl' }), { off: 3 })}
      ${at(3, person(232, 252, 'chau', 'sit', { s: 0.82, prop: 'bowl', mood: 'joy' }))}
      ${person(310, 248, 'me', 'sit', { s: 0.72, flip: true, prop: 'bowl' })}
      ${tray(262, 278)}
      ${at(3, `${fishPlate(232, 256)}${sparkles([[250, 240, 6], [214, 246, 5]])}`)}
      ${person(352, 276, 'bo', 'sit', { s: 0.8, flip: true, prop: 'bowl' })}
      ${pot(182, 276, false)}
      ${at(1, person(136, 276, 'ba', 'sit', { s: 0.82, prop: 'fan' }), { off: 2 })}
      ${at(2, person(136, 276, 'ba', 'sit', { s: 0.82, prop: 'bowl' }), { off: 3 })}
      ${at(3, person(136, 276, 'ba', 'sit', { s: 0.82, prop: 'bowl', mood: 'joy' }))}
      ${at(2, thought(150, 70, 86, 54, 132, 140, `${bowl(-18, 12, 1.3)}<path d="M8 2 Q18 -6 26 2 Q18 8 8 2Z" fill="#D97706" stroke="#92400E" stroke-width="0.8"/>`), { off: 4 })}
      ${at(3, `${heart(186, 150, 1.2, '#F43F5E', 0)}${heart(206, 128, 1, '#FB7185', 0.8)}`)}
      ${at(4, `${bowl(214, 268, 0.9, '#D9F99D')}${caPhao(244, 270)}${sparkles([[214, 246, 6], [250, 252, 5]])}`)}`),

    // Cảnh 3: hằng ngày bà cháu ở gần nhau, chuyện trò nhiều nhất; cháu nhặt rau, lấy muối, xâu kim cho bà vá áo
    () => svg('Bà cháu ngồi hiên nhà chuyện trò, cháu xâu kim cho bà', `
      ${sky('t10s3sky')}
      ${cloud(140, 40, 0.7, 0)}${cloud(330, 30, 0.6, 2)}
      ${tree(400, 196, 1.1)}${tree(84, 192, 0.9)}
      <rect x="96" y="70" width="290" height="140" fill="#E8C99B" stroke="${LINE}" stroke-width="1"/>
      <path d="M80 80 L130 34 H350 L400 80Z" fill="#B45309" stroke="${LINE}" stroke-width="1"/>
      ${Array.from({ length: 9 }, (_, i) => `<path d="M${108 + i * 32} 40 L${92 + i * 36} 78" stroke="#92400E" stroke-width="1.4"/>`).join('')}
      <rect x="210" y="104" width="56" height="106" fill="#7C4A21"/><rect x="128" y="108" width="50" height="42" fill="#7C4A21"/>
      ${[140, 152, 164].map(x => `<rect x="${x}" y="108" width="3" height="42" fill="#E8C99B"/>`).join('')}
      <rect y="206" width="${W}" height="${H - 206}" fill="#D6B48A"/>
      <path d="M0 206 H${W}" stroke="#B88A5F" stroke-width="3"/>
      <rect x="120" y="258" width="240" height="12" rx="2" fill="#D6A85A" stroke="${LINE}" stroke-width="1"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${124 + i * 20} 259 V269" stroke="#B7862F" stroke-width="1"/>`).join('')}
      <path d="M132 270 V292 M348 270 V292 M240 270 V292" stroke="#A16207" stroke-width="5"/>
      ${at(1, person(186, 260, 'ba', 'sit', { s: 0.86, prop: 'needle' }), { talk: '1' })}
      ${at(1, person(296, 262, 'chau', 'sit', { s: 0.9, flip: true, mood: 'joy' }), { off: 2, talk: '1' })}
      ${at(2, person(296, 262, 'chau', 'sit', { s: 0.9, flip: true, prop: 'needle', mood: 'joy' }))}
      ${at(1, `${heart(220, 120, 1.2, '#F43F5E', 0)}${heart(250, 104, 1, '#FB7185', 0.6)}`)}
      ${at(2, `<g transform="translate(362 284)"><path d="M-22 -14 H22 L16 4 H-16Z" fill="#D6A26B" stroke="#92400E" stroke-width="1"/>
        ${[-14, -6, 2, 10, 16].map((dx, i) => `<ellipse cx="${dx}" cy="-16" rx="6" ry="4" fill="${i % 2 ? '#16A34A' : '#4ADE80'}"/>`).join('')}</g>
        <g transform="translate(240 284)"><path d="M-10 -18 H10 V-2 Q10 2 6 2 H-6 Q-10 2 -10 -2Z" fill="#E7E5E4" stroke="${LINE}" stroke-width="1"/><ellipse cy="-18" rx="10" ry="3" fill="#fff" stroke="${LINE}" stroke-width="0.8"/></g>
        <g transform="translate(104 280)"><path d="M-16 -6 Q0 -16 16 -6 L12 2 H-12Z" fill="#60A5FA" stroke="${LINE}" stroke-width="0.9"/><path d="M-6 -8 l4 6 l4 -6" stroke="#1E3A8A" stroke-width="1" fill="none"/></g>`)}`),

    // Cảnh 4: bà ngồi khâu bên đèn dầu, kể cho cháu nghe Truyện Kiều, Nhị Độ Mai, bà thuộc từ đầu đến cuối
    () => svg('Bà ngồi khâu bên đèn dầu kể chuyện cho cháu nghe', `
      ${room('t10s4', true)}
      ${lamp(240, 232, 1.1)}
      <rect x="196" y="230" width="88" height="8" rx="2" fill="#92400E" stroke="${LINE}" stroke-width="1"/>
      <path d="M204 238 V270 M276 238 V270" stroke="#78350F" stroke-width="4"/>
      ${at(1, person(146, 276, 'ba', 'sit', { s: 0.92, prop: 'needle' }), { talk: '1,2' })}
      ${at(1, `<path d="M128 252 Q150 238 176 252 L170 266 H134Z" fill="#60A5FA" stroke="${LINE}" stroke-width="0.9"/><rect x="146" y="248" width="10" height="8" fill="#FDE68A"/>`)}
      ${at(1, person(334, 276, 'chau', 'sit', { s: 0.92, flip: true, mood: 'joy' }))}
      ${at(2, thought(250, 82, 168, 80, 172, 158, `<g transform="translate(-44 4)"><path d="M-24 -16 L0 -12 L24 -16 V16 L0 20 L-24 16Z" fill="#FEF3C7" stroke="#B45309" stroke-width="1.4"/><path d="M0 -12 V20" stroke="#B45309" stroke-width="1.2"/>
        ${[-8, -2, 4, 10].map(y => `<path d="M-19 ${y} H-5 M5 ${y} H19" stroke="#D97706" stroke-width="1"/>`).join('')}</g>
        ${plum(32, 4)}
        ${word('♪', 18, '#F59E0B', 64, -24)}${word('♪', 14, '#F59E0B', -2, -30)}`))}`),

    // Cảnh 5: bà nói "Bà sống được ngày nào hay ngày ấy. Người già như ngọn đèn trước gió"
    () => svg('Bà ngồi bên cháu nói chuyện, ngọn đèn dầu chao trước gió', `
      ${room('t10s5', true)}
      <rect x="250" y="230" width="100" height="8" rx="2" fill="#92400E" stroke="${LINE}" stroke-width="1"/>
      <path d="M258 238 V270 M342 238 V270" stroke="#78350F" stroke-width="4"/>
      ${at(1, lamp(300, 232, 1.1), { off: 3 })}
      ${at(3, `${lamp(300, 232, 1.1, true)}${wind(300, 74)}`)}
      ${at(1, person(160, 276, 'ba', 'sit', { s: 0.94 }), { talk: '1,2,3' })}
      ${at(1, person(222, 278, 'chau', 'sit', { s: 0.82, flip: true }), { off: 2 })}
      ${at(2, person(222, 278, 'chau', 'sit', { s: 0.82, flip: true, mood: 'sad' }))}
      ${at(1, `${heart(196, 120, 1.1, '#F43F5E', 0)}${heart(220, 104, 0.9, '#FB7185', 0.8)}`)}`),
  ],
};
