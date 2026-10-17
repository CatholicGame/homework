// Phim truyện "Bình nước và con cá vàng", Tuần 27 Tiếng Việt 3: 6 cảnh, đánh số theo câu (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật (cast.js): thầy giáo (thay), I-ren lúc nhỏ (aia), các bạn trong lớp (nam, linh);
// I-ren lớn lên thành nhà khoa học: nhân vật thêm irenLon (áo khoác trắng phòng thí nghiệm, đeo kính), cùng kiểu cast.js.
import { person, headOnly } from '../cast.js';
import { W, H, svg, at, sparkles, speech, thought, word, classroom, desk, LINE } from '../sceneKit.js';


const GLASS = '#E0F2FE', WATER = '#38BDF8', GLASS_E = '#7DD3FC';

/** Cá vàng (x, y tâm), nhìn sang phải; flip quay trái. */
const goldfish = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
  <path d="M-8 0 L-20 -9 Q-17 0 -20 9Z" fill="#FB923C" stroke="#C2410C" stroke-width="0.9"/>
  <ellipse cx="2" cy="0" rx="11" ry="7" fill="#F97316" stroke="#C2410C" stroke-width="0.9"/>
  <path d="M0 -7 Q4 -12 8 -6" fill="#FB923C" stroke="#C2410C" stroke-width="0.8"/>
  <circle cx="7" cy="-1.5" r="2" fill="#fff"/><circle cx="7.6" cy="-1.5" r="1.1" fill="#1C1917"/></g>`;

/** Bình thủy tinh (x giữa, y đáy), rộng w, cao h; level 0…1 mực nước; spill: nước tràn xuống hai bên. */
function jar(x, y, w, h, { level = 0.96, spill = false, fish = false } = {}) {
  const top = y - h, wl = y - h * level;
  return `<g>
    <path d="M${x - w / 2} ${top} V${y - 6} Q${x - w / 2} ${y} ${x - w / 2 + 6} ${y} H${x + w / 2 - 6} Q${x + w / 2} ${y} ${x + w / 2} ${y - 6} V${top}" fill="${GLASS}" fill-opacity="0.6" stroke="${GLASS_E}" stroke-width="1.6"/>
    <path d="M${x - w / 2 + 1} ${wl} H${x + w / 2 - 1} V${y - 6} Q${x + w / 2 - 1} ${y - 1} ${x + w / 2 - 6} ${y - 1} H${x - w / 2 + 6} Q${x - w / 2 + 1} ${y - 1} ${x - w / 2 + 1} ${y - 6}Z" fill="${WATER}" opacity="0.75"/>
    <path d="M${x - w / 2 - 2} ${top} H${x + w / 2 + 2}" stroke="${GLASS_E}" stroke-width="3" stroke-linecap="round"/>
    <path d="M${x - w / 2 + 5} ${top + 6} V${y - 10}" stroke="#fff" stroke-width="2.4" opacity="0.7" stroke-linecap="round"/>
    ${fish ? goldfish(x + 2, y - h * 0.42, Math.min(1.2, w / 34)) : ''}
    ${spill ? `<path d="M${x - w / 2 - 2} ${top} q-6 ${h * 0.5} -2 ${h} M${x + w / 2 + 2} ${top} q6 ${h * 0.5} 2 ${h}" stroke="${WATER}" stroke-width="3.4" fill="none" stroke-linecap="round" opacity="0.85"/>
      <ellipse cx="${x - w / 2 - 6}" cy="${y + 1}" rx="10" ry="2.6" fill="${WATER}" opacity="0.7"/><ellipse cx="${x + w / 2 + 6}" cy="${y + 1}" rx="10" ry="2.6" fill="${WATER}" opacity="0.7"/>
      ${[[-1, -12], [1, -16], [-1, -22]].map(([sd, dy], i) => `<circle class="sc-twinkle" style="--d:${i * 0.4}s" cx="${x + sd * (w / 2 + 6 + i * 2)}" cy="${top + dy + 14}" r="2.2" fill="${WATER}"/>`).join('')}` : ''}</g>`;
}

/** Cốc thủy tinh nhỏ có mực nước (x giữa, y đáy). */
const cup = (x, y, w, h, level) => `<g>
  <path d="M${x - w / 2} ${y - h} L${x - w / 2 + 3} ${y} H${x + w / 2 - 3} L${x + w / 2} ${y - h}" fill="${GLASS}" fill-opacity="0.6" stroke="${GLASS_E}" stroke-width="1.4"/>
  <path d="M${x - w / 2 + 1 + 3 * (1 - level)} ${y - h * level} H${x + w / 2 - 1 - 3 * (1 - level)} L${x + w / 2 - 3.5} ${y - 1} H${x - w / 2 + 3.5}Z" fill="${WATER}" opacity="0.75"/>
  <path d="M${x - w / 2 + 4} ${y - h + 4} V${y - 6}" stroke="#fff" stroke-width="1.8" opacity="0.7"/></g>`;

/** Hình con cá vẽ nét đứt (để so với lượng nước). */
const fishOutline = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-8 0 L-20 -9 Q-17 0 -20 9Z M-9 0 Q-8 -7 2 -7 Q13 -7 13 0 Q13 7 2 7 Q-8 7 -9 0Z" fill="#FED7AA" fill-opacity="0.5" stroke="#EA580C" stroke-width="1.4" stroke-dasharray="3 2"/></g>`;

/** Hòn đá chìm trong bình (minh họa nước dềnh lên). */
const pebble = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-10 4 Q-12 -6 -2 -8 Q10 -9 11 1 Q10 8 0 8 Q-9 8 -10 4Z" fill="#A8A29E" stroke="#57534E" stroke-width="1"/></g>`;

/** Mũi tên ngắn (x, y gốc) chỉ hướng dx, dy. */
const arrow = (x, y, dx, dy, c = '#DC2626') => {
  const a = Math.atan2(dy, dx), ex = x + dx, ey = y + dy;
  const p = (k) => `${(ex - Math.cos(a + k) * 6).toFixed(1)} ${(ey - Math.sin(a + k) * 6).toFixed(1)}`;
  return `<path d="M${x} ${y} L${ex} ${ey} M${p(0.55)} L${ex} ${ey} L${p(-0.55)}" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
};

/** Dấu tích xanh. */
const tick = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle r="11" fill="#22C55E" stroke="#15803D" stroke-width="1"/><path d="M-5 0 L-1.5 4 L5.5 -4" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;

/** Lớp học có bàn thầy (bình nước trên bàn) và hai bàn học trò. */
const room = () => `${classroom(214)}
  ${desk(308, 300, 92, '#B45309')}`;

/** Các bạn ngồi bàn bên trái (mood). */
const pupils = (mood = 'happy', irenMood = mood) => `${person(108, 268, 'nam', 'sit', { s: 0.82, mood })}${person(160, 270, 'aia', 'sit', { s: 0.82, mood: irenMood })}
  ${person(212, 268, 'linh', 'sit', { s: 0.82, mood })}${desk(134, 300, 100)}${desk(206, 300, 50)}`;

export default {
  sentences: true,
  groups: [[0, 1], [2, 3], [4, 5, 6, 7], [8, 9, 10], [11, 12, 13, 14, 15], [16]],
  scenes: [
    // Cảnh 1: thầy nêu câu hỏi: thả cá vàng vào bình nước đầy thì nước thế nào? Cả lớp: nước trào ra; thầy: nước trào ra đổ vào cốc thì nhỏ hơn con cá
    () => svg('Thầy giáo thả cá vàng vào bình nước đầy, cả lớp nói nước sẽ trào ra', `
      ${room()}
      ${at(1, person(380, 290, 'thay', 'point', { s: 0.84, flip: true }), { talk: '1,2' })}
      ${jar(298, 256, 40, 54, { level: 0.96 })}
      ${at(1, speech(300, 70, 90, 60, 350, 150, `${goldfish(-18, -6, 0.9)}${arrow(-2, -6, 14, 10, '#F97316')}<path d="M18 -14 V18 H34 V-14" stroke="${GLASS_E}" stroke-width="2" fill="${GLASS}"/><path d="M19 -10 H33 V17 H19Z" fill="${WATER}" opacity="0.7"/>`), { off: 2 })}
      ${at(1, pupils())}
      ${at(2, `${jar(298, 256, 40, 54, { spill: true, fish: true })}${cup(342, 256, 20, 26, 0.4)}${fishOutline(344, 222, 0.9)}`)}
      ${at(2, speech(160, 90, 78, 52, 160, 170, `${jar(0, 16, 26, 30, { spill: true })}`))}`),

    // Cảnh 2: "Vì sao lại như vậy?" Lũ trẻ bàn tán rất hăng: cá uống mất nước? nước rớt ra ngoài cốc?
    () => svg('Thầy hỏi vì sao, các bạn bàn tán rất hăng', `
      ${room()}
      ${jar(298, 256, 40, 54, { level: 0.96, fish: true })}${cup(342, 256, 20, 26, 0.4)}
      ${person(380, 290, 'thay', 'stand', { s: 0.84, flip: true })}
      ${at(1, `${word('?', 64, '#7C3AED', 330, 70)}${sparkles([[296, 50, 6], [370, 46, 6]])}`)}
      ${at(1, pupils('wow', 'wow'), { off: 2 })}
      ${at(2, pupils('joy', 'shut'), { talk: '2' })}
      ${at(2, thought(110, 80, 86, 62, 108, 154, `${goldfish(-8, 4, 1.4)}${[0, 1, 2].map(i => `<circle class="sc-twinkle" style="--d:${i * 0.3}s" cx="${16 + i * 7}" cy="${2 - i * 6}" r="2.6" fill="${WATER}"/>`).join('')}`))}
      ${at(2, thought(222, 72, 86, 62, 212, 154, `${cup(0, 20, 26, 34, 0.5)}<path d="M14 -10 q8 6 8 14" stroke="${WATER}" stroke-width="3" fill="none" stroke-linecap="round"/>
        ${[[22, 10], [26, 20], [18, 24]].map(([dx, dy], i) => `<circle class="sc-twinkle" style="--d:${i * 0.4}s" cx="${dx}" cy="${dy}" r="2.4" fill="${WATER}"/>`).join('')}`))}`),

    // Cảnh 3: I-ren im lặng suy nghĩ: vật chìm trong nước, nước dềnh lên đúng bằng thể tích vật; thế mà thầy nói vậy; chẳng lẽ thầy thử học trò?
    () => svg('I-ren im lặng suy nghĩ về câu hỏi của thầy', `
      ${classroom(214)}
      ${person(150, 282, 'aia', 'sit', { s: 1.1, mood: 'shut' })}${desk(150, 300, 130)}
      ${at(1, `${[0, 1, 2].map(i => `<circle class="sc-twinkle" style="--d:${i * 0.4}s" cx="${186 + i * 12}" cy="${150 - i * 14}" r="${3 + i}" fill="#fff" stroke="#94A3B8"/>`).join('')}`)}
      ${at(2, thought(310, 96, 170, 112, 214, 116, `
        ${jar(-44, 36, 40, 56, { level: 0.6 })}${pebble(-44, -16, 1)}${arrow(-44, -30, 0, 10, '#57534E')}
        ${arrow(-14, 4, 22, 0, '#64748B')}
        ${jar(42, 36, 40, 56, { level: 0.85 })}${pebble(42, 26, 1)}
        <path d="M22 2 H62" stroke="#DC2626" stroke-width="1.6" stroke-dasharray="3 3"/><path d="M22 -12 H62" stroke="#DC2626" stroke-width="1.6"/>
        ${arrow(70, 2, 0, -12, '#DC2626')}`), { off: 3 })}
      ${at(3, thought(310, 96, 170, 112, 214, 116, `<g transform="translate(-30 6)">${headOnly('thay', { s: 1.2 })}</g>
        <path d="M6 -24 Q34 -36 60 -20 Q66 -2 46 4 L40 14 L36 4 Q12 2 6 -10Z" fill="#F5F3FF" stroke="#A78BFA" stroke-width="1.2"/>
        ${goldfish(26, -12, 0.7)}${word('?', 16, '#7C3AED', 50, -12)}`), { off: 4 })}
      ${at(4, thought(310, 96, 170, 112, 214, 116, `<g transform="translate(-36 6)">${headOnly('thay', { s: 1.2, mood: 'joy' })}</g>
        ${word('?', 52, '#7C3AED', 34, 2)}`))}`),

    // Cảnh 4: về nhà, I-ren tự làm thí nghiệm; thả cá vàng vào cốc nước rồi quan sát; nước trào ra đúng bằng thể tích con cá
    () => svg('Ở nhà, I-ren thả cá vàng vào cốc nước đầy để quan sát', `
      <rect width="${W}" height="${H}" fill="#FCE7F3"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${40 + i * 80} 0 V214" stroke="#FBCFE8" stroke-width="10"/>`).join('')}
      <rect x="96" y="44" width="90" height="74" rx="4" fill="#BAE6FD" stroke="#fff" stroke-width="6"/><path d="M141 44 V118 M96 81 H186" stroke="#fff" stroke-width="4"/>
      <path d="M220 60 h120 M226 60 v40 M334 60 v40" stroke="#92400E" stroke-width="4"/>
      <rect y="214" width="${W}" height="${H - 214}" fill="#E7C9A1"/><path d="M0 214 H${W}" stroke="#B88A5F" stroke-width="3"/>
      ${[0, 1, 2].map(i => `<rect x="${232 + i * 34}" y="${36 - i * 4}" width="22" height="${24 + i * 4}" rx="3" fill="${['#F59E0B', '#60A5FA', '#34D399'][i]}" stroke="${LINE}" stroke-width="0.8"/>`).join('')}
      ${desk(300, 300, 150, '#C08457')}
      <ellipse cx="350" cy="252" rx="22" ry="4" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
      ${at(1, person(160, 290, 'aia', 'stand', { s: 1 }), { off: 2 })}
      ${at(1, `<circle cx="260" cy="234" r="20" fill="${GLASS}" fill-opacity="0.7" stroke="${GLASS_E}" stroke-width="1.6"/><path d="M243 226 H277" stroke="${GLASS_E}" stroke-width="2"/>
        <path d="M244 232 Q260 228 276 232 Q276 252 260 254 Q244 252 244 232Z" fill="${WATER}" opacity="0.6"/>`)}
      ${at(1, goldfish(260, 240, 0.8), { off: 2 })}
      ${at(1, cup(350, 252, 30, 40, 0.98), { off: 2 })}
      ${at(2, person(160, 290, 'aia', 'give', { s: 1, mood: 'wow' }), { off: 3 })}
      ${at(2, `${goldfish(350, 196, 0.9)}${arrow(350, 206, 0, 10, '#F97316')}`, { off: 3 })}
      ${at(2, `${cup(350, 252, 30, 40, 1)}<path d="M334 212 q-4 18 -4 40 M366 212 q4 18 4 40" stroke="${WATER}" stroke-width="3" fill="none" stroke-linecap="round"/>`)}
      ${at(3, `${goldfish(351, 232, 0.8)}<ellipse cx="350" cy="252" rx="22" ry="4" fill="${WATER}" opacity="0.6"/>`)}
      ${at(3, person(160, 290, 'aia', 'cheer', { s: 1, mood: 'joy' }))}
      ${at(3, speech(300, 84, 116, 74, 210, 150, `${cup(-26, 26, 26, 34, 0.55)}${word('=', 26, '#15803D', 4, 6)}${fishOutline(36, 8, 1.1)}${tick(44, -24, 0.8)}`))}`),

    // Cảnh 5: hôm sau I-ren kể thí nghiệm cho thầy; thầy mỉm cười: nhà khoa học cũng có thể sai, chỉ sự thật mới đáng tin, ai chịu khó tìm tòi sẽ thành công
    () => svg('I-ren kể thí nghiệm cho thầy, thầy mỉm cười khen', `
      ${classroom(214)}
      ${at(1, person(176, 290, 'aia', 'point', { s: 1 }), { talk: '1' })}
      ${at(1, speech(170, 80, 96, 64, 190, 156, `${cup(-16, 24, 28, 38, 0.95)}${goldfish(-15, 10, 0.7)}${tick(26, -10, 0.8)}`), { off: 3 })}
      ${at(1, person(330, 290, 'thay', 'stand', { s: 0.9, flip: true }), { off: 2 })}
      ${at(2, person(330, 290, 'thay', 'clap', { s: 0.9, flip: true, mood: 'joy' }), { off: 3 })}
      ${at(3, person(330, 290, 'thay', 'point', { s: 0.9, flip: true, mood: 'joy' }), { talk: '3,4,5' })}
      ${at(3, speech(220, 74, 130, 78, 300, 160, `<rect x="-40" y="-26" width="44" height="52" rx="3" fill="#fff" stroke="${LINE}" stroke-width="1"/>
        <path d="M-34 -14 h32 M-34 -4 h26 M-34 6 h30" stroke="#94A3B8" stroke-width="2"/>
        <path d="M-36 -24 L0 22 M0 -24 L-36 22" stroke="#DC2626" stroke-width="3.4" stroke-linecap="round"/>
        <g transform="translate(30 10)">${headOnly('irenLon', { s: 0.7, mood: 'wow' })}</g>`), { off: 4 })}
      ${at(4, speech(220, 74, 130, 78, 300, 160, `<circle r="24" fill="#FEF9C3"/>${sparkles([[0, 0, 22]], '#FACC15')}${sparkles([[-40, -12, 8], [40, 10, 8]])}`), { off: 5 })}
      ${at(5, speech(220, 74, 130, 78, 300, 160, `<path d="M-14 -24 H14 V-6 Q14 8 0 10 Q-14 8 -14 -6Z" fill="#FACC15" stroke="#CA8A04" stroke-width="1.2"/>
        <path d="M-14 -18 Q-26 -18 -22 -6 Q-18 2 -12 0 M14 -18 Q26 -18 22 -6 Q18 2 12 0" stroke="#CA8A04" stroke-width="2.4" fill="none"/>
        <path d="M-3 10 V18 H3 V10Z M-12 18 H12 V26 H-12Z" fill="#CA8A04"/>${sparkles([[-40, -14, 8], [40, 12, 7]])}`))}
      ${at(5, sparkles([[120, 160, 7], [250, 180, 6]]))}`),

    // Cảnh 6: nhờ chịu suy nghĩ, tìm tòi, sau này I-ren trở thành nhà khoa học nổi tiếng
    () => svg('I-ren lớn lên trở thành nhà khoa học nổi tiếng', `
      <rect width="${W}" height="${H}" fill="#E0F2FE"/>
      <rect y="214" width="${W}" height="${H - 214}" fill="#CBD5E1"/><path d="M0 214 H${W}" stroke="#94A3B8" stroke-width="3"/>
      <path d="M220 90 H400 M220 150 H400" stroke="#92400E" stroke-width="5"/>
      ${[[236, '#F472B6'], [270, '#34D399'], [304, '#FACC15'], [340, '#60A5FA'], [374, '#A78BFA']].map(([fx, c], i) => `<g>
        <path d="M${fx - 6} ${88} V${70} H${fx + 6} V${88}" fill="none" stroke="${GLASS_E}" stroke-width="1.4"/>
        <path d="M${fx - 6} ${148} L${fx - 12} ${148} L${fx - 4} ${128} V${116} H${fx + 4} V${128} L${fx + 12} ${148}Z" fill="${GLASS}" stroke="${GLASS_E}" stroke-width="1.4"/>
        <path d="M${fx - 9} ${147} L${fx - 6} ${138} H${fx + 6} L${fx + 9} ${147}Z" fill="${c}"/>
        <rect x="${fx - 5}" y="${78}" width="10" height="10" fill="${[...['#34D399', '#FACC15', '#60A5FA', '#A78BFA', '#F472B6']][i]}"/>
        <circle class="sc-rise" style="--d:${i * 0.6}s" cx="${fx}" cy="110" r="2.6" fill="${c}" opacity="0.8"/></g>`).join('')}
      ${desk(320, 300, 150, '#94A3B8')}
      <g transform="translate(290 256)"><rect x="-18" y="-4" width="36" height="6" rx="2" fill="#475569"/><path d="M8 -4 V-34 Q8 -42 0 -44 L-10 -36" stroke="#475569" stroke-width="6" fill="none" stroke-linecap="round"/>
        <rect x="-18" y="-50" width="12" height="22" rx="3" fill="#64748B" transform="rotate(-24 -12 -40)"/><rect x="-14" y="-24" width="20" height="4" fill="#94A3B8"/></g>
      ${jar(350, 256, 34, 42, { level: 0.8, fish: true })}
      ${at(1, person(180, 290, 'irenLon', 'cheer', { s: 0.9, mood: 'joy' }))}
      ${at(1, `<g transform="translate(180 ${290 - 104 * 0.9})"><path d="M-6 -16 L0 0 L6 -16" stroke="#DC2626" stroke-width="3" fill="none"/><circle cy="4" r="7" fill="#FACC15" stroke="#CA8A04" stroke-width="1.2"/><path d="M0 0 l1.6 3.2 3.4 0.4 -2.5 2.4 0.6 3.4 -3.1 -1.6 -3.1 1.6 0.6 -3.4 -2.5 -2.4 3.4 -0.4Z" fill="#FEF3C7"/></g>`)}
      ${at(1, sparkles([[120, 100, 9], [250, 60, 8], [130, 190, 6], [240, 140, 7], [400, 190, 7]]))}`),
  ],
};
