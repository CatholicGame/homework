// Phim bài đọc "Trạng Lường" (Lương Thế Vinh), Tuần 15 Tiếng Việt 3: 6 cảnh, đánh số theo câu (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật: ông Trạng (ongTrang), sứ thần (suThan), người lính (linhLe), học trò (coBe, chau) trong cast.js.
import { person } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, tufts, flowers, sparkles, thought, word, tree, LINE } from '../sceneKit.js';

/** Đình / công đường mái cong ngói nâu, cột đỏ (x giữa, y nền). */
const pavilion = (x, y, w = 260) => `<g transform="translate(${x} ${y})">
  <rect x="${-w / 2 - 6}" y="-8" width="${w + 12}" height="8" fill="#A8A29E" stroke="${LINE}" stroke-width="0.8"/>
  <rect x="${-w / 2 + 14}" y="-104" width="${w - 28}" height="96" fill="#FDE9C8" stroke="${LINE}" stroke-width="1"/>
  ${[-0.42, -0.14, 0.14, 0.42].map(k => `<rect x="${k * w - 5}" y="-104" width="10" height="96" fill="#B91C1C" stroke="${LINE}" stroke-width="0.8"/>`).join('')}
  <path d="M${-w / 2 - 26} -100 Q${-w / 2 - 30} -114 ${-w / 2 - 40} -122 Q${-w / 2} -112 ${-w / 2 + 30} -150 H${w / 2 - 30} Q${w / 2} -112 ${w / 2 + 40} -122 Q${w / 2 + 30} -114 ${w / 2 + 26} -100Z" fill="#9A3412" stroke="${LINE}" stroke-width="1.2"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${-w / 2 + 34 + i * (w - 68) / 8} -148 L${-w / 2 + 10 + i * (w - 20) / 8} -104" stroke="#7C2D12" stroke-width="1.2"/>`).join('')}
  <path d="M${-w / 2 + 30} -150 H${w / 2 - 30}" stroke="#FACC15" stroke-width="3"/>
  <path d="M-14 -152 Q0 -168 14 -152" stroke="#FACC15" stroke-width="3" fill="none"/></g>`;

/** Sông: mặt nước có sóng (từ y xuống đáy, bắt đầu từ x0). */
const river = (x0, y) => `<path d="M${x0} ${y} Q${x0 - 20} ${y + 40} ${x0 - 40} 300 H480 V${y}Z" fill="#38BDF8"/>
  <path d="M${x0} ${y} H480" stroke="#7DD3FC" stroke-width="3"/>
  ${[[x0 + 40, y + 24], [x0 + 120, y + 46], [x0 + 70, y + 74], [x0 + 160, y + 16]].map(([a, b], i) => `<path class="sc-drift" style="--d:${i}s" d="M${a} ${b} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none"/>`).join('')}`;

/** Con voi xám hiền (x giữa, y chân), mặt quay sang phải (flip: sang trái). */
function elephant(x, y, s = 1, flip = false) {
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    ${[-30, -14, 10, 26].map(dx => `<rect x="${dx - 7}" y="-30" width="14" height="30" rx="4" fill="${dx === -14 || dx === 10 ? '#8C96A3' : '#9CA3AF'}" stroke="${LINE}" stroke-width="1"/>
      <path d="M${dx - 5} -2 h10" stroke="#F1F5F9" stroke-width="2"/>`).join('')}
    <ellipse cx="-2" cy="-46" rx="44" ry="30" fill="#A1A9B5" stroke="${LINE}" stroke-width="1.2"/>
    <path d="M-44 -50 q-10 4 -8 16" stroke="${LINE}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="38" cy="-60" r="22" fill="#A1A9B5" stroke="${LINE}" stroke-width="1.2"/>
    <path d="M52 -54 Q66 -40 60 -20 Q58 -12 64 -10" stroke="${LINE}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M52 -54 Q66 -40 60 -20 Q58 -12 64 -10" stroke="#A1A9B5" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M50 -44 q10 4 12 -2" stroke="#FFFBEB" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M28 -78 Q8 -84 6 -60 Q8 -38 30 -44Z" fill="#B8C0CB" stroke="${LINE}" stroke-width="1"/>
    <path d="M24 -70 Q14 -70 14 -60" stroke="#F9A8D4" stroke-width="2" fill="none" opacity="0.6"/>
    <circle cx="44" cy="-64" r="2.4" fill="#1F2937"/><circle cx="44.8" cy="-65" r="0.8" fill="#fff"/>
    <ellipse cx="48" cy="-56" rx="3" ry="1.8" fill="#F9A8A8" opacity="0.7"/></g>`;
}

/** Thuyền gỗ (x giữa, y mép nước), sink: thuyền chìm sâu thêm; mark: vạch đỏ đánh dấu; inner: đồ trên thuyền. */
function boat(x, y, { sink = 0, mark = false, inner = '' } = {}) {
  const top = y - 30 + sink;
  return `<g class="sc-bob" style="--d:0.5s"><g transform="translate(${x} 0)">
    ${inner ? `<g transform="translate(0 ${top + 4})">${inner}</g>` : ''}
    <path d="M-86 ${top} H86 Q80 ${top + 34} 54 ${top + 44} H-54 Q-80 ${top + 34} -86 ${top}Z" fill="#B45309" stroke="${LINE}" stroke-width="1.2"/>
    <path d="M-84 ${top + 8} H84 M-78 ${top + 20} H78" stroke="#92400E" stroke-width="1.2"/>
    ${mark ? `<path d="M-74 ${y} H74" stroke="#DC2626" stroke-width="3" stroke-dasharray="7 4"/>` : ''}
    <path d="M-60 ${y} H60" stroke="#38BDF8" stroke-width="0" /></g></g>
    <path d="M${x - 96} ${y + 1} q8 4 16 0 q8 -4 16 0 M${x + 64} ${y + 1} q8 4 16 0 q8 -4 16 0" stroke="#E0F2FE" stroke-width="2" fill="none"/>
    <rect x="${x - 90}" y="${y + 2}" width="180" height="${30}" fill="#38BDF8" opacity="0.55"/>`;
}

/** Đống đá xám. */
const stones = (x, y, n = 6, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  ${Array.from({ length: n }, (_, i) => {
    const row = i < 3 ? 0 : i < 5 ? 1 : 2, k = row === 0 ? i : row === 1 ? i - 3 : 0;
    const cx = (k - (row === 0 ? 1 : row === 1 ? 0.5 : 0)) * 20, cy = -8 - row * 13;
    return `<ellipse cx="${cx}" cy="${cy}" rx="11" ry="8" fill="${i % 2 ? '#A8A29E' : '#94A3B8'}" stroke="${LINE}" stroke-width="0.9"/>`;
  }).join('')}</g>`;

/** Cân đĩa lớn (x giữa, y chân). */
const scale = (x, y, inner) => `<g transform="translate(${x} ${y})">
  <path d="M-16 0 H16 L4 -10 V-80 H-4 V-10Z" fill="#78350F" stroke="${LINE}" stroke-width="1"/>
  <path d="M-58 -78 H58" stroke="#92400E" stroke-width="4" stroke-linecap="round"/><circle cy="-80" r="5" fill="#FACC15" stroke="${LINE}"/>
  ${[-1, 1].map(sd => `<path d="M${sd * 56} -78 L${sd * 56 - 20} -40 M${sd * 56} -78 L${sd * 56 + 20} -40" stroke="#57534E" stroke-width="1"/>
    <path d="M${sd * 56 - 26} -40 H${sd * 56 + 26} Q${sd * 56 + 20} -30 ${sd * 56} -30 Q${sd * 56 - 20} -30 ${sd * 56 - 26} -40Z" fill="#D97706" stroke="${LINE}" stroke-width="1"/>`).join('')}
  ${inner}</g>`;

/** Cuốn sách dày (x giữa, y đáy). */
const thickBook = (x, y, s = 1, c = '#B91C1C') => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-30 0 L-20 -14 H40 L30 0Z" fill="#FFFBEB" stroke="${LINE}" stroke-width="1"/>
  ${[-3, -6, -9].map(dy => `<path d="M-28 ${dy} L-18 ${dy - 8}" stroke="#D6D3D1" stroke-width="0.8"/><path d="M-26 ${dy + 1} H28" stroke="#E7E5E4" stroke-width="0.8"/>`).join('')}
  <path d="M-30 0 H30 V8 H-30Z" fill="${c}" stroke="${LINE}" stroke-width="1"/>
  <path d="M-20 -14 H40 V-20 H-20Z" fill="${c}" stroke="${LINE}" stroke-width="1"/>
  <path d="M30 0 L40 -14 V-8 L30 8Z" fill="#FFFBEB" stroke="${LINE}" stroke-width="1"/></g>`;

/** Bàn tính (x giữa, y đáy): khung, các thanh, hạt màu (wood: gỗ sơn màu, không thì đất nung). */
const abacus = (x, y, s = 1, wood = true) => {
  const beads = wood ? ['#EF4444', '#F59E0B', '#22C55E', '#3B82F6', '#A855F7'] : ['#B45309', '#A16207', '#92400E', '#B45309', '#A16207'];
  return `<g transform="translate(${x} ${y}) scale(${s})">
  <rect x="-44" y="-66" width="88" height="66" rx="4" fill="${wood ? '#92400E' : '#C2410C'}" stroke="${LINE}" stroke-width="1.2"/>
  <rect x="-38" y="-60" width="76" height="54" fill="${wood ? '#FEF3C7' : '#FED7AA'}"/>
  <path d="M-38 -44 H38" stroke="${wood ? '#92400E' : '#C2410C'}" stroke-width="3"/>
  ${beads.map((c, i) => {
    const bx = -28 + i * 14;
    return `<path d="M${bx} -60 V-6" stroke="#78350F" stroke-width="1.4"/>
      <ellipse cx="${bx}" cy="${-54 + (i % 2) * 4}" rx="6" ry="3.6" fill="${c}" stroke="${LINE}" stroke-width="0.7"/>
      ${[0, 1, 2, 3].map(k => `<ellipse cx="${bx}" cy="${-12 - k * 7 - (k < i % 3 ? 10 : 0)}" rx="6" ry="3.4" fill="${c}" stroke="${LINE}" stroke-width="0.7"/>`).join('')}`;
  }).join('')}</g>`;
};

/** Sân lát gạch trước đình. */
const yard = (y = 220) => `<rect y="${y}" width="${W}" height="${H - y}" fill="#E7C9A1"/>
  ${Array.from({ length: 10 }, (_, i) => `<path d="M${i * 54} ${y} L${i * 54 - 40} 300" stroke="#D6B48A" stroke-width="1.2"/>`).join('')}
  <path d="M0 ${y + 30} H${W} M0 ${y + 62} H${W}" stroke="#D6B48A" stroke-width="1.2"/>`;

export default {
  sentences: true,
  groups: [[0, 1], [2, 3], [4, 5], [6, 7, 8], [9, 10, 11, 12], [13, 14]],
  scenes: [
    // Cảnh 1: Lương Thế Vinh đỗ Trạng nguyên năm 21 tuổi; mọi người nể phục vì học rộng, nhiều sáng kiến
    () => svg('Lương Thế Vinh đỗ Trạng nguyên, mọi người nể phục', `
      ${sky('t15s1sky', '#7DD3FC', '#FEF3C7')}
      ${sun(396, 46, 18)}${cloud(120, 40, 0.8, 0)}
      ${tree(90, 222, 0.9)}${tree(400, 222, 0.8)}
      ${pavilion(244, 222, 250)}
      ${yard(220)}
      ${at(1, person(240, 284, 'ongTrang', 'hold', { s: 0.9, prop: 'award', mood: 'joy' }))}
      ${at(1, sparkles([[190, 150, 8], [292, 140, 9]]))}
      ${at(1, person(130, 286, 'linhLe', 'clap', { s: 0.8 }), { off: 2 })}
      ${at(2, person(130, 286, 'linhLe', 'cheer', { s: 0.8, mood: 'joy' }))}
      ${at(1, person(352, 286, 'linhLe', 'clap', { s: 0.8, flip: true }), { off: 2 })}
      ${at(2, person(352, 286, 'linhLe', 'cheer', { s: 0.8, mood: 'joy', flip: true }))}
      ${at(2, thought(326, 64, 96, 58, 270, 112, `
        <circle cx="-22" cy="-4" r="12" fill="#FDE047" stroke="#CA8A04" stroke-width="1.2"/><rect x="-27" y="7" width="10" height="7" rx="2" fill="#94A3B8"/>
        <path d="M-22 -24 v-4 M-38 -4 h-4 M-6 -4 h4 M-34 -16 l-3 -3 M-10 -16 l3 -3" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
        <g transform="translate(20 8) scale(0.5)">${abacus(0, 0, 1)}</g>`))}`),

    // Cảnh 2: sứ thần nhờ cân con voi; ông sai lính dắt voi xuống thuyền, đánh dấu mức chìm
    () => svg('Sứ thần nhờ cân voi, lính dắt voi xuống thuyền', `
      ${sky('t15s2sky', '#7DD3FC', '#E0F2FE')}
      ${sun(400, 44, 16)}${cloud(250, 36, 0.8, 1)}
      <path d="M0 180 Q140 160 280 176 V300 H0Z" fill="#86EFAC"/>
      ${river(262, 196)}
      <path d="M0 196 Q150 186 262 196 Q242 240 222 300 H0Z" fill="#4ADE80"/>
      ${tree(84, 200, 0.8)}
      ${at(1, elephant(214, 254, 0.6), { off: 2 })}
      ${at(1, person(118, 286, 'suThan', 'point', { s: 0.78 }), { talk: '1' })}
      ${at(1, person(170, 290, 'ongTrang', 'stand', { s: 0.8 }), { off: 2 })}
      ${at(2, person(170, 290, 'ongTrang', 'point', { s: 0.8 }), { talk: '2' })}
      ${at(2, boat(346, 232, { sink: 14, mark: true, inner: elephant(0, 0, 0.62) }))}
      ${at(2, person(226, 290, 'linhLe', 'point', { s: 0.74 }))}
      ${tufts([[60, 280], [124, 230]])}`),

    // Cảnh 3: voi lên bờ, xếp đá vào thuyền; thuyền chìm tới vạch thì cân đá, biết voi nặng bao nhiêu
    () => svg('Xếp đá vào thuyền tới vạch đánh dấu rồi cân đá', `
      ${sky('t15s3sky', '#93C5FD', '#E0F2FE')}
      ${cloud(140, 40, 0.8, 0)}${cloud(370, 50, 0.6, 2)}
      <path d="M0 180 Q140 160 280 176 V300 H0Z" fill="#86EFAC"/>
      ${river(262, 196)}
      <path d="M0 196 Q150 186 262 196 Q242 240 222 300 H0Z" fill="#4ADE80"/>
      ${at(1, elephant(116, 236, 0.5))}
      ${at(1, boat(346, 232, { sink: 14, mark: true, inner: stones(0, 0, 6, 1.2) }))}
      ${at(1, person(228, 290, 'linhLe', 'hold', { s: 0.78, prop: 'slab' }), { off: 2 })}
      ${at(2, scale(236, 290, `<g transform="translate(-56 -40)">${stones(0, 0, 3, 0.9)}</g><g transform="translate(56 -40)">${stones(0, 0, 3, 0.9)}</g>`))}
      ${at(2, person(164, 290, 'ongTrang', 'point', { s: 0.82 }))}
      ${at(2, thought(310, 64, 150, 64, 200, 150, `
        <g transform="translate(-36 22)">${elephant(0, 0, 0.42)}</g>
        ${word('=', 26, '#0F766E', 14, -6)}
        <g transform="translate(46 20)">${stones(0, 0, 6, 0.7)}</g>`))}`),

    // Cảnh 4: sứ thần xé một trang sách nhờ đo; ông đo cả cuốn rồi chia cho số trang; sứ thần khâm phục
    () => svg('Đo cuốn sách rồi chia cho số trang', `
      ${sky('t15s4sky', '#7DD3FC', '#FEF3C7')}
      ${pavilion(244, 222, 300)}
      ${yard(220)}
      ${at(1, person(126, 286, 'suThan', 'give', { s: 0.86 }), { off: 3, talk: '1' })}
      ${at(1, `<g transform="translate(176 192) rotate(-12)"><g class="sc-bob"><rect x="-8" y="-22" width="22" height="28" fill="#FFFBEB" stroke="${LINE}" stroke-width="1"/>
        <path d="M-4 -14 h14 M-4 -8 h14 M-4 -2 h10" stroke="#A8A29E" stroke-width="1"/><path d="M14 -22 l-3 5 l3 4 l-3 5 l3 5" stroke="${LINE}" stroke-width="0.8" fill="#FFFBEB"/></g></g>`, { off: 3 })}
      ${at(3, person(126, 286, 'suThan', 'clap', { s: 0.86, mood: 'wow' }))}
      ${at(2, `<g transform="translate(262 286)"><rect x="-44" y="-56" width="88" height="10" rx="2" fill="#92400E" stroke="${LINE}"/>
        <path d="M-38 -46 V0 M38 -46 V0" stroke="#78350F" stroke-width="6"/></g>
        ${thickBook(262, 240, 1.1)}
        <g transform="translate(300 232) rotate(-90)"><rect x="-2" y="-4" width="56" height="8" fill="#FDE68A" stroke="#B45309" stroke-width="0.8"/>
        ${Array.from({ length: 11 }, (_, i) => `<path d="M${i * 5} -4 v${i % 2 ? 3 : 5}" stroke="#92400E" stroke-width="0.7"/>`).join('')}</g>`)}
      ${at(2, person(360, 286, 'ongTrang', 'point', { s: 0.86, flip: true }), { talk: '2' })}
      ${at(2, `<g transform="translate(232 150)"><circle r="16" fill="#fff" stroke="#94A3B8" stroke-width="1.5"/>${word('÷', 22, '#0F766E')}</g>`)}
      ${at(3, sparkles([[96, 120, 8], [170, 110, 9], [150, 150, 6]]))}`),

    // Cảnh 5: ông viết sách toán, mỗi quy tắc một bài thơ; cuốn sách toán đầu tiên; dạy trong trường gần 400 năm
    () => svg('Ông viết cuốn sách toán đầu tiên của Việt Nam, học trò học sách của ông', `
      ${sky('t15s5sky', '#FDE68A', '#FEF3C7')}
      ${pavilion(244, 222, 300)}
      ${yard(220)}
      ${at(1, `${person(140, 286, 'ongTrang', 'hold', { s: 0.86, prop: 'calf' })}${thickBook(140, 198, 0.5)}`)}
      ${at(2, thought(186, 68, 120, 58, 156, 128, `
        <rect x="-44" y="-20" width="88" height="40" rx="4" fill="#FEF3C7" stroke="#B45309"/>
        ${[-10, 0, 10].map(dy => `<path d="M-34 ${dy} q8 -5 16 0 t16 0 t16 0 t16 0" stroke="#92400E" stroke-width="1.6" fill="none"/>`).join('')}`))}
      ${at(3, `${thickBook(316, 140, 1.3, '#1D4ED8')}${sparkles([[264, 104, 9], [372, 110, 8], [320, 92, 7]])}`)}
      ${at(4, `${person(250, 290, 'coBe', 'sit', { s: 0.82 })}${person(314, 290, 'chau', 'sit', { s: 0.82 })}${person(378, 290, 'coBe', 'sit', { s: 0.82, flip: true })}`)}
      ${at(4, `<g transform="translate(314 196)"><rect x="-26" y="-12" width="52" height="24" rx="12" fill="#DC2626" stroke="${LINE}"/>${word('400', 15, '#FEF3C7')}</g>`)}`),

    // Cảnh 6: ông là người Việt đầu tiên làm bàn tính; lúc đầu bằng đất, sau bằng gỗ, trúc, sơn nhiều màu
    () => svg('Ông Trạng làm ra bàn tính bằng đất, rồi bằng gỗ sơn màu', `
      ${sky('t15s6sky', '#7DD3FC', '#FEF3C7')}
      ${sun(110, 46, 16)}
      ${pavilion(244, 222, 300)}
      ${yard(220)}
      ${at(1, person(130, 286, 'ongTrang', 'give', { s: 0.88 }))}
      ${at(1, `<g transform="translate(262 286)"><rect x="-110" y="-56" width="220" height="10" rx="2" fill="#92400E" stroke="${LINE}"/>
        <path d="M-100 -46 V0 M100 -46 V0" stroke="#78350F" stroke-width="6"/></g>`)}
      ${at(1, abacus(200, 230, 0.9, false))}
      ${at(2, `<path d="M254 196 H294 M284 186 L296 196 L284 206" stroke="#16A34A" stroke-width="4" fill="none" stroke-linecap="round"/>`)}
      ${at(2, abacus(342, 230, 1, true))}
      ${at(2, sparkles([[300, 140, 8], [392, 150, 9], [350, 124, 6]]))}
      ${flowers([[400, 296, '#F472B6'], [84, 296, '#FDE047']])}`),
  ],
};
