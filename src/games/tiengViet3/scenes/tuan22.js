// Phim bài đọc "Dũng sĩ rừng xanh" (theo Thiên Lương), Tuần 22 Tiếng Việt 3: 5 cảnh, đánh số theo CÂU (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó.
// Không có người: đại bàng (đầu trắng, mình nâu, mỏ và móng vàng), đại bàng con, chim nhỏ, bầy khỉ, tổ trứng
// đều vẽ riêng trong file này. Đại bàng nhìn sang phải; flip để quay trái.
import { W, H, svg, at, sky, cloud, sun, sparkles, LINE } from '../sceneKit.js';

const BROWN = '#7C4A21', BROWN_D = '#5B3416', BROWN_L = '#9A6233', GOLD = '#FACC15', GOLD_D = '#CA8A04';
const MONK = '#A0632E', MONK_D = '#7A4520', MONK_FACE = '#F5D0A9';

/** Móng vuốt vàng (chân thòng xuống), gốc ở (x, y). */
const talons = (x, y, open = false) => [0, 7].map(dx => `<g>
  <path d="M${x + dx} ${y} l${open ? 2 : 1} 12" stroke="${GOLD_D}" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M${x + dx + (open ? 2 : 1)} ${y + 12} l-4 ${open ? 5 : 4} M${x + dx + (open ? 2 : 1)} ${y + 12} l1 ${open ? 6 : 5} M${x + dx + (open ? 2 : 1)} ${y + 12} l5 ${open ? 4 : 3}"
    stroke="${GOLD_D}" stroke-width="2" stroke-linecap="round"/></g>`).join('');

/** Đầu đại bàng: trắng, mỏ quặp vàng, mắt nghiêm (fierce: lông mày xếch). Tâm (0, 0), nhìn phải. */
const eagleHead = (fierce = false, baby = false) => `
  <circle r="${baby ? 8 : 9.5}" fill="${baby ? '#E7D3B5' : '#fff'}" stroke="${LINE}" stroke-width="0.9"/>
  <path d="M7 -4 Q16 -4 17 3 Q15 1 12 2 L7 3Z" fill="${GOLD}" stroke="${GOLD_D}" stroke-width="0.9" stroke-linejoin="round"/>
  <circle cx="3" cy="-2.6" r="2" fill="#1C1917"/><circle cx="3.6" cy="-3.2" r="0.6" fill="#fff"/>
  ${fierce ? `<path d="M-1 -7 L6.5 -4.4" stroke="#1C1917" stroke-width="1.8" stroke-linecap="round"/>` : ''}`;

/** Đại bàng bay (cánh dang lên). s: tỉ lệ; baby: đại bàng con lông nâu nhạt; grab: móng quặp mở; fierce: mặt dữ. */
function eagleFly(x, y, s = 1, { flip = false, baby = false, grab = false, fierce = false, d = 0 } = {}) {
  const body = baby ? BROWN_L : BROWN, wing = baby ? '#B07A45' : BROWN_D;
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><g class="sc-bob" style="--d:${d}s">
    <path d="M-4 -4 Q-30 -40 -14 -64 Q-6 -50 6 -44 Q2 -24 10 -6Z" fill="${wing}" stroke="${LINE}" stroke-width="0.9"/>
    <path d="M-28 2 L-48 -6 L-46 4 L-50 10 L-28 8Z" fill="${baby ? '#D6B48A' : '#fff'}" stroke="${LINE}" stroke-width="0.9"/>
    ${talons(-2, 8, grab)}
    <ellipse cx="-2" cy="2" rx="30" ry="11" fill="${body}" stroke="${LINE}" stroke-width="0.9"/>
    <g transform="translate(26 -6)">${eagleHead(fierce, baby)}</g>
    <path d="M0 -2 Q-14 -50 4 -80 Q8 -70 14 -72 Q12 -62 20 -62 Q16 -50 24 -48 Q16 -26 14 -4Z" fill="${body}" stroke="${LINE}" stroke-width="0.9"/>
    <path d="M4 -78 L6 -83 M12 -70 L15 -75 M20 -60 L24 -64 M23 -48 L27 -51" stroke="${body}" stroke-width="4" stroke-linecap="round"/>
    <path d="M6 -20 Q4 -40 10 -58" stroke="${wing}" stroke-width="1.4" fill="none"/>
  </g></g>`;
}

/** Đại bàng đậu (móng bám cành ở (x, y)). */
function eaglePerch(x, y, s = 1, { flip = false, fierce = false, baby = false } = {}) {
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    <path d="M-6 -16 L-18 6 L-8 4 L-4 8Z" fill="${baby ? '#D6B48A' : '#fff'}" stroke="${LINE}" stroke-width="0.9"/>
    <ellipse cx="0" cy="-26" rx="14" ry="22" fill="${baby ? BROWN_L : BROWN}" stroke="${LINE}" stroke-width="0.9"/>
    <path d="M-12 -38 Q-2 -48 8 -36 Q6 -12 -6 -4 Q-14 -18 -12 -38Z" fill="${baby ? '#B07A45' : BROWN_D}" stroke="${LINE}" stroke-width="0.8"/>
    <g transform="translate(3 -50)">${eagleHead(fierce, baby)}</g>
    <path d="M-3 -4 V2 M5 -4 V2" stroke="${GOLD_D}" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M-7 2 h8 M1 2 h8" stroke="${GOLD_D}" stroke-width="2.4" stroke-linecap="round"/></g>`;
}

/** Chim nhỏ tròn (đứng ở (x, y), nhìn trái theo mặc định khi flip); bow: nghiêng mình cúi chào. */
function birdie(x, y, c = '#60A5FA', { s = 1, flip = false, bow = false } = {}) {
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><g transform="rotate(${bow ? 32 : 0} 0 -2)">
    <path d="M-9 -8 L-18 -12 L-16 -4Z" fill="${c}" stroke="${LINE}" stroke-width="0.7"/>
    <ellipse cx="0" cy="-8" rx="10" ry="8" fill="${c}" stroke="${LINE}" stroke-width="0.8"/>
    <circle cx="8" cy="-16" r="6" fill="${c}" stroke="${LINE}" stroke-width="0.8"/>
    <path d="M13 -17 L18 -15.5 L13 -14Z" fill="#F59E0B"/>
    <circle cx="9.6" cy="-17.4" r="1.3" fill="#1C1917"/>
    <path d="M-5 -10 Q1 -14 6 -8" stroke="#fff" stroke-width="1.6" fill="none" opacity="0.7"/></g>
    <path d="M-2 -1 V1 M3 -1 V1" stroke="#B45309" stroke-width="1.4"/></g>`;
}

/** Con khỉ: climb (bám thân cây, tay với lên) · sit · run (chạy trốn) · hang (bị quắp, co người). Chân ở (x, y). */
function monkey(x, y, pose = 'sit', { s = 1, flip = false, scared = false, d = 0 } = {}) {
  const face = `<circle r="9" fill="${MONK}" stroke="${LINE}" stroke-width="0.8"/>
    <circle cx="-9" cy="-1" r="3.6" fill="${MONK_FACE}" stroke="${LINE}" stroke-width="0.7"/><circle cx="9" cy="-1" r="3.6" fill="${MONK_FACE}" stroke="${LINE}" stroke-width="0.7"/>
    <path d="M-6 -1 Q-6 -6 0 -4 Q6 -6 6 -1 Q7 7 0 7 Q-7 7 -6 -1Z" fill="${MONK_FACE}"/>
    <circle cx="-2.6" cy="-1.4" r="1.3" fill="#1C1917"/><circle cx="2.6" cy="-1.4" r="1.3" fill="#1C1917"/>
    ${scared ? `<ellipse cx="0" cy="4" rx="1.8" ry="2.2" fill="#7F1D1D"/>` : `<path d="M-2.4 3.6 Q0 5.6 2.4 3.6" stroke="#7F1D1D" stroke-width="1" fill="none" stroke-linecap="round"/>`}`;
  const limb = (d) => `<path d="${d}" stroke="${MONK_D}" stroke-width="4.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  let inner;
  if (pose === 'climb') inner = `
    <path d="M-4 -10 Q-18 -2 -16 12 Q-14 22 -6 20" stroke="${MONK_D}" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${limb('M-4 -20 L-12 -36 M4 -20 L10 -40')}${limb('M-4 -6 L-10 4 M4 -6 L10 2')}
    <ellipse cx="0" cy="-14" rx="8" ry="11" fill="${MONK}" stroke="${LINE}" stroke-width="0.8"/>
    <g transform="translate(0 -30)">${face}</g>`;
  else if (pose === 'run') inner = `
    <path d="M-10 -18 Q-26 -26 -24 -42 Q-22 -48 -16 -46" stroke="${MONK_D}" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${limb('M-6 -12 L-14 -2 L-10 0 M4 -12 L12 -4 L16 0')}${limb('M6 -24 L16 -32 M-2 -24 L-12 -16')}
    <ellipse cx="0" cy="-18" rx="11" ry="8" fill="${MONK}" stroke="${LINE}" stroke-width="0.8" transform="rotate(-18 0 -18)"/>
    <g transform="translate(10 -32)">${face}</g>`;
  else if (pose === 'hang') inner = `
    <path d="M4 -10 Q16 -2 12 10 Q8 16 2 12" stroke="${MONK_D}" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${limb('M-4 -14 L-12 -4 M4 -14 L10 -4')}${limb('M-4 -20 L-14 -26 M4 -20 L14 -28')}
    <ellipse cx="0" cy="-14" rx="8" ry="9" fill="${MONK}" stroke="${LINE}" stroke-width="0.8"/>
    <g transform="translate(0 -28) scale(0.9)">${face}</g>`;
  else inner = `
    <path d="M8 -6 Q24 -4 22 -20 Q20 -28 14 -26" stroke="${MONK_D}" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${limb('M-6 -4 L-10 0 M6 -4 L10 0')}${limb('M-6 -18 L-12 -8 M6 -18 L12 -8')}
    <ellipse cx="0" cy="-12" rx="10" ry="12" fill="${MONK}" stroke="${LINE}" stroke-width="0.8"/>
    <ellipse cx="0" cy="-9" rx="5.6" ry="7" fill="${MONK_FACE}" opacity="0.8"/>
    <g transform="translate(0 -30)">${face}</g>`;
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><g class="${pose === 'run' ? 'sc-walk' : 'sc-bob'}" style="--d:${d}s">${inner}</g></g>`;
}

/** Tổ chim bằng cành khô có trứng (x giữa, y đáy). */
const nest = (x, y, eggs = 3, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  ${Array.from({ length: eggs }, (_, i) => `<ellipse cx="${(i - (eggs - 1) / 2) * 11}" cy="-14" rx="6" ry="8" fill="#FFFBEB" stroke="${LINE}" stroke-width="0.8"/>`).join('')}
  <path d="M-30 -12 Q0 -2 30 -12 Q28 4 0 6 Q-28 4 -30 -12Z" fill="#A16207" stroke="${LINE}" stroke-width="0.9"/>
  ${[-22, -12, -2, 8, 18].map((dx, i) => `<path d="M${dx} ${-8 + (i % 2) * 2} l14 ${i % 2 ? -4 : 4}" stroke="#713F12" stroke-width="1.4" stroke-linecap="round"/>`).join('')}
  <path d="M-32 -10 l-6 -4 M30 -10 l7 -5" stroke="#713F12" stroke-width="1.6" stroke-linecap="round"/></g>`;

/** Cây rừng cao: thân từ mặt đất (x, gy) lên ngọn ty; branches [[dir, y, dài]] là cành ngang để đậu. */
function tallTree(x, gy, ty, branches = [], leaf = '#15803D', leaf2 = '#22C55E') {
  return `<g>
    <path d="M${x - 9} ${gy} L${x - 5} ${ty + 30} H${x + 5} L${x + 9} ${gy}Z" fill="#78350F" stroke="${LINE}" stroke-width="0.9"/>
    ${branches.map(([dir, y, len]) => `<path d="M${x} ${y + 4} Q${x + dir * len * 0.5} ${y - 4} ${x + dir * len} ${y}" stroke="#78350F" stroke-width="6" fill="none" stroke-linecap="round"/>
      <g class="sc-sway" style="--d:${(y % 5) / 2}s"><ellipse cx="${x + dir * (len + 8)}" cy="${y - 6}" rx="14" ry="9" fill="${leaf2}"/></g>`).join('')}
    <g class="sc-sway" style="--d:${(x % 7) / 3}s">
      <ellipse cx="${x - 18}" cy="${ty + 20}" rx="26" ry="20" fill="${leaf}"/><ellipse cx="${x + 20}" cy="${ty + 18}" rx="26" ry="20" fill="${leaf}"/>
      <ellipse cx="${x}" cy="${ty}" rx="30" ry="22" fill="${leaf2}"/></g></g>`;
}

/** Rừng xa (hàng ngọn cây xanh thẫm) ở đường chân y. */
const forestBand = (y, c = '#166534', c2 = '#15803D') => `
  <path d="M0 ${y} ${Array.from({ length: 13 }, (_, i) => `Q${i * 40 + 20} ${y - 34 - (i % 3) * 8} ${i * 40 + 40} ${y}`).join(' ')} V300 H0Z" fill="${c2}"/>
  <path d="M0 ${y + 20} ${Array.from({ length: 10 }, (_, i) => `Q${i * 50 + 25} ${y - 6 - (i % 2) * 10} ${i * 50 + 50} ${y + 20}`).join(' ')} V300 H0Z" fill="${c}"/>`;

/** Nét gió cong. */
const wind = (list) => list.map(([x, y, w], i) => `<g class="sc-drift" style="--d:${i}s"><path d="M${x} ${y} q${w * 0.4} -8 ${w * 0.7} 0 t${w * 0.3} -4" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.85"/></g>`).join('');

/** Nốt nhạc (vẽ bằng hình, không dùng chữ). */
const note = (x, y, s = 1, c = '#7C3AED', d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:${d}s">
  <ellipse cx="0" cy="0" rx="5" ry="3.6" fill="${c}" transform="rotate(-20)"/><path d="M4.4 -1 V-20 Q10 -16 12 -10" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round"/></g></g>`;

/** Vòng sáng nhấn vào một chỗ (mỏ, móng). */
const ring = (x, y, r, d = 0) => `<circle class="sc-twinkle" style="--d:${d}s" cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#F59E0B" stroke-width="3" stroke-dasharray="6 4"/>`;

export default {
  sentences: true,
  groups: [[0, 1], [2], [3, 4], [5, 6], [7, 8]],
  scenes: [
    // Cảnh 1: chiều gió nhẹ, bố mẹ đại bàng đậu trên cây cao canh gác, đại bàng con đạp gió tập bay; cánh vỗ vi vút như dàn nhạc
    () => svg('Bố mẹ đại bàng đậu trên cây cao canh gác, đại bàng con tập bay', `
      ${sky('t22s1sky', '#FDBA74', '#FEF3C7')}
      ${sun(250, 206, 22, false)}
      ${cloud(170, 46, 0.6, 1, '#FFF7ED')}${cloud(330, 36, 0.5, 3, '#FFF7ED')}
      ${forestBand(214)}
      ${tallTree(112, 300, 60, [[1, 156, 40]])}
      ${tallTree(372, 300, 56, [[-1, 150, 40]])}
      ${at(1, eaglePerch(144, 154, 0.8))}
      ${at(1, eaglePerch(340, 148, 0.8, { flip: true }))}
      ${at(1, wind([[150, 168, 50], [260, 64, 60], [300, 196, 46]]))}
      ${at(1, `${eagleFly(214, 108, 0.62, { baby: true, d: 0 })}${eagleFly(296, 176, 0.55, { baby: true, flip: true, d: 1 })}${eagleFly(240, 228, 0.5, { baby: true, d: 2 })}`)}
      ${at(2, `${note(184, 74, 1, '#7C3AED', 0)}${note(236, 150, 0.9, '#DB2777', 0.6)}${note(198, 196, 0.8, '#2563EB', 1.2)}${note(276, 96, 0.8, '#16A34A', 1.6)}`)}
      ${at(2, `<g transform="translate(214 70)">${[10, 16].map(r => `<path class="sc-twinkle" d="M${-r} 0 Q0 ${-r * 0.7} ${r} 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join('')}</g>
        <g transform="translate(290 134)">${[10, 16].map(r => `<path class="sc-twinkle" style="--d:0.5s" d="M${-r} 0 Q0 ${-r * 0.7} ${r} 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join('')}</g>`)}`),

    // Cảnh 2: đại bàng khỏe, các loài chim nghiêng mình cúi chào, nhưng đại bàng không cậy khỏe đàn áp chim khác
    () => svg('Đại bàng đậu trên cành, các loài chim nhỏ nghiêng mình cúi chào', `
      ${sky('t22s2sky', '#7DD3FC', '#F0F9FF')}
      ${cloud(130, 40, 0.7, 0)}${cloud(370, 56, 0.6, 2)}
      ${forestBand(232)}
      <path d="M60 172 Q240 150 420 176" stroke="#78350F" stroke-width="12" fill="none" stroke-linecap="round"/>
      <path d="M150 165 q-10 -20 -30 -24 M330 166 q14 -18 34 -20" stroke="#78350F" stroke-width="5" fill="none" stroke-linecap="round"/>
      ${[[112, 138], [372, 142], [196, 152], [300, 150]].map(([x, y], i) => `<g class="sc-sway" style="--d:${i * 0.6}s"><ellipse cx="${x}" cy="${y}" rx="16" ry="9" fill="#22C55E"/></g>`).join('')}
      ${eaglePerch(240, 160, 1.5)}
      ${at(1, `${birdie(150, 164, '#60A5FA', { bow: true })}${birdie(186, 158, '#FACC15', { bow: true, s: 0.9 })}
        ${birdie(300, 158, '#F87171', { bow: true, flip: true, s: 0.9 })}${birdie(336, 162, '#34D399', { bow: true, flip: true })}
        ${birdie(372, 168, '#C084FC', { bow: true, flip: true, s: 0.85 })}`)}
      ${at(1, `<g class="sc-bob"><g transform="translate(130 94) scale(0.7) rotate(-10)">${birdie(0, 0, '#FB923C')}</g></g>
        <g class="sc-bob" style="--d:1s"><g transform="translate(356 88) scale(-0.7 0.7) rotate(-10)">${birdie(0, 0, '#38BDF8')}</g></g>`)}
      ${at(1, sparkles([[240, 54, 9], [196, 82, 6], [288, 80, 7]], '#FDE68A'))}`),

    // Cảnh 3: đại bàng hiền lành ấp trứng, nhưng bầy khỉ kéo đến phá tổ thì chiến đấu quyết liệt
    () => svg('Bầy khỉ kéo đến phá tổ, đại bàng lao xuống đánh lại', `
      ${sky('t22s3sky', '#93C5FD', '#ECFEFF')}
      ${cloud(150, 40, 0.6, 1)}
      ${forestBand(224)}
      <rect y="272" width="${W}" height="${H - 272}" fill="#65A30D"/>
      ${tallTree(300, 290, 56, [[-1, 150, 40]])}
      <path d="M300 128 Q330 118 350 120" stroke="#78350F" stroke-width="7" fill="none" stroke-linecap="round"/>
      ${nest(334, 124, 3, 0.9)}
      ${at(1, eaglePerch(334, 108, 0.75, { flip: true }), { off: 2 })}
      ${at(2, eagleFly(232, 168, 0.8, { grab: true, fierce: true }))}
      ${at(2, `${monkey(301, 210, 'climb', { s: 0.9 })}${monkey(196, 280, 'sit', { s: 0.85, d: 0.4 })}${monkey(142, 282, 'sit', { s: 0.75, flip: true, d: 1 })}${monkey(250, 280, 'sit', { s: 0.8, d: 1.6 })}`)}
      ${at(2, `<path d="M180 150 h-22 M184 164 h-28 M182 178 h-18" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`)}`),

    // Cảnh 4: vũ khí là cặp mỏ nhọn và bộ móng vuốt sắc khỏe; đại bàng quắp khỉ con bay lên cao
    () => svg('Đại bàng có mỏ nhọn và móng vuốt sắc, quắp khỉ con bay lên cao', `
      ${sky('t22s4sky', '#60A5FA', '#E0F2FE')}
      ${cloud(130, 230, 0.8, 0)}${cloud(370, 210, 0.7, 2)}
      ${forestBand(262)}
      ${eagleFly(232, 166, 1.42, { fierce: true, grab: true })}
      ${at(1, `${ring(286, 158, 13)}${ring(234, 196, 15, 0.4)}`, { off: 2 })}
      ${at(1, sparkles([[300, 118, 8], [212, 210, 7]], '#FDE047'))}
      ${at(2, monkey(235, 236, 'hang', { s: 0.9, scared: true }))}
      ${at(2, `${monkey(120, 274, 'sit', { s: 0.7, scared: true })}${monkey(360, 276, 'sit', { s: 0.7, flip: true, scared: true })}
        <path d="M200 244 l-10 10 M270 244 l10 10" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity="0.9"/>`)}`),

    // Cảnh 5: dù phải rời tổ, đại bàng không để bầy khỉ vào tổ cướp trứng; tung hoành trời cao, "Dũng sĩ của rừng xanh"
    () => svg('Bầy khỉ bỏ chạy, tổ trứng an toàn; đại bàng tung hoành trên trời cao', `
      ${sky('t22s5sky', '#38BDF8', '#FEF9C3')}
      ${at(2, `<circle cx="280" cy="64" r="60" fill="#FDE68A" opacity="0.45"/>${sun(280, 64, 22, false)}`)}
      ${forestBand(214)}
      <rect y="276" width="${W}" height="${H - 276}" fill="#65A30D"/>
      ${tallTree(360, 290, 92, [[-1, 168, 38]])}
      <path d="M360 158 Q330 150 312 152" stroke="#78350F" stroke-width="7" fill="none" stroke-linecap="round"/>
      ${nest(322, 156, 3, 0.8)}
      ${at(1, eagleFly(318, 108, 0.6, { flip: true, fierce: true }), { off: 2 })}
      ${at(1, `${monkey(142, 284, 'run', { s: 0.85, flip: true })}${monkey(196, 284, 'run', { s: 0.75, flip: true, d: 0.4 })}${monkey(244, 284, 'run', { s: 0.8, flip: true, d: 0.8 })}`)}
      ${at(1, `<path d="M262 262 h18 M268 250 h14 M216 262 h14" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`)}
      ${at(2, eagleFly(176, 140, 0.95, { d: 0.5 }))}
      ${at(2, sparkles([[132, 70, 9], [290, 52, 8], [150, 170, 7], [260, 168, 6]]))}`),
  ],
};
