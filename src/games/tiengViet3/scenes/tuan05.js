// Cảnh phim bài thơ "Ngày khai trường" (Nguyễn Bùi Vợi), Tuần 5 Tiếng Việt 3: 5 khổ, mỗi khổ một cảnh.
// data-l="k": hiện từ dòng thứ k của khổ (đếm từ 1); data-off: ẩn từ dòng đó. "Em" của bài thơ là Linh.
import { person } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, grass, tufts, flowers, tree, sparkles, thought, word, soundWaves, heart, school, flagPole, path, LINE } from '../sceneKit.js';

/** Dây cờ đuôi nheo ngày hội căng ngang (x1 → x2, võng xuống). */
function bunting(x1, x2, y, sag = 16) {
  const n = Math.round((x2 - x1) / 18);
  const cols = ['#EF4444', '#FACC15', '#22C55E', '#3B82F6', '#EC4899'];
  return `<path d="M${x1} ${y} Q${(x1 + x2) / 2} ${y + sag * 2} ${x2} ${y}" stroke="#92400E" stroke-width="1.2" fill="none"/>
    ${Array.from({ length: n }, (_, i) => {
      const t = (i + 0.5) / n, x = x1 + (x2 - x1) * t, yy = y + sag * 4 * t * (1 - t);
      return `<g transform="translate(${x.toFixed(1)} ${yy.toFixed(1)})"><g class="sc-sway" style="--d:${(i * 0.3) % 2}s"><path d="M-6 0 H6 L0 12Z" fill="${cols[i % 5]}"/></g></g>`;
    }).join('')}`;
}

/** Bóng bay buộc dây. */
const balloon = (x, y, c, d = 0) => `<g transform="translate(${x} ${y})"><g class="sc-bob" style="--d:${d}s">
  <path d="M0 14 Q4 30 -2 46" stroke="#94A3B8" stroke-width="1" fill="none"/>
  <ellipse rx="11" ry="14" fill="${c}" stroke="${LINE}" stroke-width="0.8"/><ellipse cx="-4" cy="-5" rx="3" ry="4" fill="#fff" opacity="0.5"/>
  <path d="M-2 14 L2 14 L0 11Z" fill="${c}"/></g></g>`;

/** Sân trường lát gạch. */
const yard = (y) => `<rect y="${y}" width="${W}" height="${H - y}" fill="#E7E5E4"/>
  ${Array.from({ length: 4 }, (_, i) => `<path d="M0 ${y + 18 + i * 24} H${W}" stroke="#D6D3D1" stroke-width="1.2"/>`).join('')}
  <path d="M0 ${y} H${W}" stroke="#A8A29E" stroke-width="2"/>`;

/** Trống trường trên giá gỗ (x giữa, y chân giá). */
const drum = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-30 0 L-22 -40 M30 0 L22 -40 M-26 -16 H26" stroke="#92400E" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="-30" cy="-58" rx="10" ry="26" fill="#FDE68A" stroke="${LINE}" stroke-width="1"/>
  <path d="M-30 -84 H30 Q36 -58 30 -32 H-30 Q-24 -58 -30 -84Z" fill="#DC2626" stroke="${LINE}" stroke-width="1"/>
  ${[-18, -6, 6, 18].map(dx => `<circle cx="${dx}" cy="-82" r="1.6" fill="#FACC15"/><circle cx="${dx}" cy="-34" r="1.6" fill="#FACC15"/>`).join('')}
  <path d="M-30 -66 H30 M-30 -50 H30" stroke="#B91C1C" stroke-width="1.4"/>
  <ellipse cx="30" cy="-58" rx="10" ry="26" fill="#FEF3C7" stroke="${LINE}" stroke-width="1"/>
  <circle cx="30" cy="-58" r="6" fill="#FDE68A"/></g>`;

/** Khăn quàng đỏ bay phấp phới (x, y: chỗ cổ). */
const scarf = (x, y, d = 0, dir = 1) => `<g transform="translate(${x} ${y}) scale(${dir * 0.62} 0.62)"><g class="sc-sway" style="--d:${d}s">
  <path d="M0 0 Q10 -6 20 -2 Q26 0 32 -6 Q30 4 22 6 Q12 8 0 4Z" fill="#E11D2A" stroke="${LINE}" stroke-width="0.7"/>
  <path d="M0 2 Q12 4 24 12 Q18 14 10 10Z" fill="#E11D2A" stroke="${LINE}" stroke-width="0.7"/></g></g>`;

/** Ánh nắng vàng rót xuống sân. */
const sunRays = (x, y) => `<g opacity="0.45">${[-50, -25, 0, 25, 50].map((a, i) =>
  `<path class="sc-twinkle" style="--d:${i * 0.3}s" d="M${x} ${y} L${x + Math.sin(a * Math.PI / 180) * 300 - 22} ${y + 300} H${x + Math.sin(a * Math.PI / 180) * 300 + 22}Z" fill="#FDE047"/>`).join('')}</g>`;

/** Thước đo chiều cao đặt ngang trên đầu hai bạn. */
const measure = (x1, x2, y) => `<rect x="${x1}" y="${y - 4}" width="${x2 - x1}" height="7" fill="#FDE68A" stroke="#B45309" stroke-width="0.8"/>
  ${Array.from({ length: Math.floor((x2 - x1) / 6) }, (_, i) => `<path d="M${x1 + 3 + i * 6} ${y - 4} v${i % 2 ? 2.4 : 3.6}" stroke="#92400E" stroke-width="0.6"/>`).join('')}`;

/** Biển số lớp nhỏ trên que. */
const sign = (x, y, t, c) => `<g transform="translate(${x} ${y})"><g class="sc-bob" style="--d:${x % 3}s">
  <path d="M0 0 V30" stroke="#A16207" stroke-width="3"/><rect x="-16" y="-24" width="32" height="26" rx="5" fill="${c}" stroke="${LINE}" stroke-width="1"/>
  ${word(t, 18, '#fff', 0, -11)}</g></g>`;

/** Mũi tên lên (lớn lên). */
const upArrow = (x, y, d = 0) => `<g transform="translate(${x} ${y})"><g class="sc-bob" style="--d:${d}s">
  <path d="M0 14 V-8 M-7 -1 L0 -10 L7 -1" stroke="#16A34A" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>`;

export default [
  // Khổ 1: sáng đầu thu trong xanh, em mặc quần áo mới đi đón ngày khai trường, vui như đi hội
  () => svg('Sáng đầu thu, em mặc quần áo mới đi khai trường', `
    ${sky('t05s1sky', '#38BDF8', '#E0F2FE')}
    ${at(1, `${sun(392, 52, 20)}${cloud(150, 46, 0.8, 0)}${cloud(290, 32, 0.6, 3)}`)}
    <path d="M0 196 Q120 170 240 186 T480 180 V300 H0Z" fill="#86EFAC"/>
    ${at(3, `<g transform="translate(290 186) scale(0.52)">${school(-115, 0, 230, 120)}</g>${flagPole(356, 186, 90)}`)}
    ${tree(80, 206, 0.9)}${tree(140, 196, 0.6, '#4ADE80', '#22C55E')}
    ${grass(222, '#4ADE80')}
    <path d="M140 300 Q220 240 330 192" stroke="#E7C9A1" stroke-width="40" fill="none" stroke-linecap="round"/>
    ${flowers([[110, 270, '#F472B6'], [130, 284, '#FDE047'], [380, 260, '#FFFFFF'], [400, 280, '#F472B6']])}
    ${tufts([[100, 240], [420, 236]])}
    ${at(4, `${bunting(100, 380, 96, 14)}${balloon(118, 150, '#F43F5E', 0)}${balloon(372, 150, '#3B82F6', 0.8)}${balloon(392, 164, '#FACC15', 1.4)}`)}
    ${at(2, `<g class="sc-walk">${person(236, 280, 'linh', 'walk', { s: 1 })}</g>`, { off: 4 })}
    ${at(2, sparkles([[200, 180, 7], [278, 168, 8], [262, 230, 6]]), { off: 4 })}
    ${at(4, person(236, 280, 'linh', 'cheer', { s: 1, mood: 'joy' }))}`),

  // Khổ 2: gặp bạn cười hớn hở, đứa bắt tay, đứa ôm vai, cặp sách đùa trên lưng
  () => svg('Các bạn gặp nhau ở cổng trường, bắt tay, ôm vai', `
    ${sky('t05s2sky', '#7DD3FC', '#F0F9FF')}
    ${cloud(120, 36, 0.7, 1)}${cloud(370, 30, 0.7, 4)}
    ${school(150, 186, 200, 110)}
    ${tree(90, 190, 0.9)}${tree(410, 190, 0.9, '#4ADE80', '#22C55E')}
    ${yard(186)}
    ${at(1, person(118, 284, 'nam', 'wave', { s: 0.9, mood: 'joy' }), { off: 4 })}
    ${at(4, `<g class="sc-walk">${person(118, 284, 'nam', 'walk', { s: 0.9, mood: 'joy' })}</g>`)}
    ${at(4, `<path class="sc-twinkle" d="M86 200 q-6 6 0 12 M80 196 q-8 10 0 20" stroke="#64748B" stroke-width="1.6" fill="none"/>`)}
    ${at(2, `${person(268, 270, 'minh', 'give', { s: 0.82, mood: 'joy' })}${person(322, 270, 'tun', 'give', { s: 0.82, flip: true })}`)}
    ${at(2, heart(296, 140, 1, '#F43F5E', 0.4))}
    ${at(3, person(184, 286, 'linh', 'stand', { s: 0.92, mood: 'joy' }))}
    ${at(3, person(212, 288, 'mai', 'point', { s: 0.92, mood: 'joy', flip: true }))}
    ${at(1, sparkles([[150, 140, 7], [250, 120, 8], [372, 150, 6]]))}`),

  // Khổ 3: nhìn các thầy các cô ai cũng như trẻ lại; sân trường vàng nắng mới; lá cờ bay như reo
  () => svg('Thầy cô vui tươi, sân trường vàng nắng, lá cờ bay', `
    ${sky('t05s3sky', '#60A5FA', '#FEF9C3')}
    ${cloud(100, 40, 0.7, 2)}
    ${school(170, 190, 230, 116)}
    ${tree(430, 194, 0.8)}
    ${yard(190)}
    ${at(3, `${sun(392, 40, 16)}${sunRays(392, 40)}`)}
    ${at(4, `${flagPole(124, 250, 196)}${sparkles([[178, 70, 8], [196, 50, 6]])}${soundWaves(176, 80, 0.9, '#F59E0B')}`)}
    ${at(1, person(250, 280, 'coHuong', 'wave', { s: 0.84 }), { off: 2 })}
    ${at(2, person(250, 280, 'coHuong', 'wave', { s: 0.84, mood: 'joy' }))}
    ${at(1, person(316, 282, 'thay', 'stand', { s: 0.84, flip: true }), { off: 2 })}
    ${at(2, person(316, 282, 'thay', 'clap', { s: 0.84, mood: 'joy', flip: true }))}
    ${at(2, sparkles([[226, 110, 8], [346, 104, 9], [284, 92, 6]]))}
    ${at(1, person(170, 290, 'linh', 'lookUp', { s: 0.86 }))}
    ${at(1, person(364, 292, 'tun', 'wave', { s: 0.78, flip: true }))}`),

  // Khổ 4: từng nhóm đứng đo nhau, bạn nào cũng lớn; năm xưa bé tí teo, giờ lớp ba, lớp bốn
  () => svg('Các bạn đứng đo chiều cao, ai cũng lớn hơn năm ngoái', `
    ${sky('t05s4sky', '#7DD3FC', '#F0F9FF')}
    ${cloud(260, 34, 0.7, 1)}
    ${tree(70, 196, 1)}${tree(420, 196, 0.9, '#4ADE80', '#22C55E')}
    <rect x="90" y="120" width="300" height="76" fill="#FDE68A" stroke="${LINE}" stroke-width="1"/>
    ${[110, 170, 280, 340].map(x => `<rect x="${x}" y="134" width="28" height="28" rx="3" fill="#7DD3FC" stroke="#fff" stroke-width="3"/>`).join('')}
    <rect x="216" y="140" width="48" height="56" rx="3" fill="#92400E"/>
    ${yard(196)}
    ${at(1, `${person(160, 284, 'nam', 'stand', { s: 0.92 })}${person(196, 284, 'minh', 'stand', { s: 0.92, flip: true })}${measure(140, 216, 168)}`)}
    ${at(1, `${person(300, 284, 'linh', 'stand', { s: 0.9 })}${person(334, 284, 'mai', 'stand', { s: 0.92, flip: true })}`)}
    ${at(2, `${upArrow(126, 180, 0)}${upArrow(230, 176, 0.6)}${upArrow(366, 182, 1.2)}${sparkles([[178, 150, 6], [318, 148, 6]])}`)}
    ${at(3, thought(250, 62, 150, 72, 210, 150, `
      ${person(-44, 30, 'nam', 'stand', { s: 0.42 })}${person(-18, 30, 'minh', 'stand', { s: 0.42 })}
      ${person(18, 30, 'linh', 'stand', { s: 0.42 })}${person(44, 30, 'mai', 'stand', { s: 0.42 })}`))}
    ${at(4, `${sign(178, 112, '3', '#2563EB')}${sign(316, 112, '4', '#DB2777')}`)}`),

  // Khổ 5: tiếng trống trường gióng giả, năm học mới đến rồi; chúng em đi vào lớp, khăn quàng bay đỏ tươi
  () => svg('Tiếng trống khai trường, chúng em vào lớp, khăn quàng đỏ tươi', `
    ${sky('t05s5sky', '#7DD3FC', '#FEF9C3')}
    ${sun(410, 44, 16)}${cloud(240, 30, 0.7, 2)}
    ${school(170, 196, 240, 124)}
    ${yard(196)}
    ${at(1, `${drum(142, 262, 0.9)}<g transform="translate(142 196) rotate(-90)">${soundWaves(0, 0, 1.2, '#F59E0B')}</g>${sparkles([[120, 150, 7], [160, 136, 6]])}`)}
    ${at(1, person(206, 284, 'thay', 'raise', { s: 0.8, flip: true, prop: 'stick', mood: 'joy' }))}
    ${at(2, `${bunting(176, 404, 66, 10)}${sparkles([[240, 46, 8], [360, 40, 7], [300, 56, 6]])}`)}
    ${at(3, `<g class="sc-walk">${person(264, 284, 'nam', 'walk', { s: 0.86 })}</g>`)}
    ${at(3, `<g class="sc-walk" style="--d:0.3s">${person(306, 278, 'linh', 'walk', { s: 0.84 })}</g>`)}
    ${at(3, `<g class="sc-walk" style="--d:0.6s">${person(356, 286, 'minh', 'walk', { s: 0.88, flip: true })}</g>`)}
    ${at(4, `${scarf(262, 218, 0, -1)}${scarf(304, 213, 0.5, -1)}${scarf(358, 220, 1, 1)}`)}`),
];
