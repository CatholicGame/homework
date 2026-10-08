/**
 * Bạn Thỏ vẽ SVG (thay emoji 🐰) cho các tập Tiền tiểu học.
 *
 * bunnyFace(): đầu Thỏ cho nút tròn hướng dẫn. Trong cùng một SVG có sẵn mọi nét mặt; CSS
 * (preschool.css, mục "Bạn Thỏ") chọn nét theo class của nút: is-happy (đúng), is-sad (sai:
 * tai cụp, mắt ngước), is-cheer (xong lượt: mắt sao), is-talking (đang đọc: miệng mấp máy).
 * bunnyPose(kind, i): Thỏ cả người hiện lên góc màn hình khi bé chạm đúng ('right', 5 tư thế),
 * chạm sai ('wrong', 5 tư thế: gãi đầu, nhún vai, nghĩ, "ối", cố lên), xong lượt ('cheer', 3 tư thế).
 * bunnyWin(): Thỏ đeo huy chương, giơ cúp, cho trang hoàn thành trạm.
 */

const INK = '#3B2A20', FUR = '#FFFFFF', FUR2 = '#EEE8F4', PINK = '#FF9CB8', PINK2 = '#FFC2D4';
const CHEEK = '#FF8FA3', GOLD = '#FFD23F', BOW = '#38BDF8';
const S = (w = 4) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

function star(cx, cy, R, r, fill, sw = 3) {
  let d = '';
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R;
    d += (i ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a)).toFixed(1);
  }
  return `<path d="${d}Z" fill="${fill}" ${S(sw)}/>`;
}
function heart(cx, cy, s, fill, sw = 2.5) {
  return `<path d="M${cx} ${cy + s * .9}C${cx - s * 1.6} ${cy - s * .1} ${cx - s * .6} ${cy - s * 1.2} ${cx} ${cy - s * .35}C${cx + s * .6} ${cy - s * 1.2} ${cx + s * 1.6} ${cy - s * .1} ${cx} ${cy + s * .9}Z" fill="${fill}" ${S(sw)}/>`;
}
/** Phần tử bay lên rồi mờ (tim, nốt nhạc), lệch pha theo `d` giây. */
const floating = (x, y, d, inner) => `<g class="bn-float" style="transform-origin:${x}px ${y}px;animation-delay:${d}s">${inner}</g>`;
const sparkle = (x, y, d, k = 1) => `<path class="bn-spark" style="transform-origin:${x}px ${y}px;animation-delay:${d}s" d="M${x} ${y - 10 * k}Q${x + 2} ${y - 2} ${x + 10 * k} ${y}Q${x + 2} ${y + 2} ${x} ${y + 10 * k}Q${x - 2} ${y + 2} ${x - 10 * k} ${y}Q${x - 2} ${y - 2} ${x} ${y - 10 * k}Z" fill="${GOLD}" ${S(2)}/>`;
const note = (x, y, c) => `<path d="M${x} ${y}V${y - 22}L${x + 14} ${y - 26}V${y - 6}" stroke="${INK}" stroke-width="3" fill="none"/><ellipse cx="${x - 4}" cy="${y}" rx="6" ry="4.5" fill="${c}" ${S(2)}/><ellipse cx="${x + 10}" cy="${y - 6}" rx="6" ry="4.5" fill="${c}" ${S(2)}/>`;
const CONF = ['#FF5D73', '#FFD23F', '#4CC9F0', '#7BD389', '#B892FF'];
const confetti = () => Array.from({ length: 12 }, (_, i) =>
  `<rect class="bn-fall" x="${4 + i * 17}" y="-40" width="7" height="11" rx="2" fill="${CONF[i % 5]}" style="transform-origin:${7 + i * 17}px -35px;animation-delay:-${((i * 0.37) % 2).toFixed(2)}s;animation-duration:${(1.8 + (i % 4) * 0.3).toFixed(1)}s"/>`).join('');

const EYES = {
  round: [82, 118].map(x => `<ellipse cx="${x}" cy="72" rx="7.5" ry="9.5" fill="${INK}"/><circle cx="${x + 2.5}" cy="68" r="3" fill="#fff"/>`).join(''),
  happy: [82, 118].map(x => `<path d="M${x - 9} 76Q${x} 62 ${x + 9} 76" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`).join(''),
  up: [82, 118].map(x => `<ellipse cx="${x}" cy="72" rx="7.5" ry="9.5" fill="${INK}"/><circle cx="${x + 1}" cy="66" r="3.2" fill="#fff"/>`).join('')
    + `<path d="M72 56Q80 52 88 56M112 52Q120 50 128 56" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  star: [82, 118].map(x => `<g class="bn-twinkle" style="transform-origin:${x}px 72px">${star(x, 72, 12, 5.5, GOLD, 2.5)}</g>`).join(''),
  wink: `<ellipse cx="82" cy="72" rx="7.5" ry="9.5" fill="${INK}"/><circle cx="84.5" cy="68" r="3" fill="#fff"/><path d="M109 76Q118 62 127 76" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
  heart: [82, 118].map(x => `<g class="bn-beat" style="transform-origin:${x}px 73px">${heart(x, 73, 10, '#FF4D6D')}</g>`).join(''),
  wide: [82, 118].map(x => `<ellipse cx="${x}" cy="71" rx="9" ry="11.5" fill="${INK}"/><circle cx="${x + 3}" cy="66" r="3.6" fill="#fff"/><circle cx="${x - 3}" cy="76" r="1.6" fill="#fff"/>`).join(''),
  firm: [82, 118].map(x => `<ellipse cx="${x}" cy="73" rx="7.5" ry="8.5" fill="${INK}"/><circle cx="${x + 2.5}" cy="70" r="2.8" fill="#fff"/>`).join('')
    + `<path d="M71 56L91 62M129 56L109 62" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
};
const MOUTH = {
  smile: `<path d="M92 93Q96 99 100 93Q104 99 108 93" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="96" y="94" width="8" height="7" rx="1.5" fill="#fff" ${S(2)}/>`,
  open: `<path d="M87 93Q100 116 113 93Q100 97 87 93Z" fill="#8B2E2E" ${S(3)}/><path d="M93 103Q100 111 107 103Q100 100 93 103Z" fill="#FF7A8A"/><rect x="95.5" y="93.5" width="9" height="6" rx="1.5" fill="#fff" ${S(1.8)}/>`,
  o: `<path d="M92 93Q96 98 100 93Q104 98 108 93" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="100" cy="104" rx="5" ry="6" fill="#8B2E2E" ${S(2.5)}/>`,
  flat: `<path d="M91 101Q95.5 97 100 101Q104.5 105 109 101" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
};

const earL = `<g class="bn-earL"><ellipse cx="80" cy="2" rx="15" ry="36" transform="rotate(-12 80 2)" fill="${FUR}" ${S()}/><ellipse cx="80" cy="6" rx="7" ry="25" transform="rotate(-12 80 6)" fill="${PINK2}"/></g>`;
const earR = (droop) => `<g class="${droop ? 'bn-earDroop' : 'bn-earR'}"><ellipse cx="120" cy="2" rx="15" ry="36" transform="rotate(12 120 2)" fill="${FUR}" ${S()}/><ellipse cx="120" cy="6" rx="7" ry="25" transform="rotate(12 120 6)" fill="${PINK2}"/></g>`;

/**
 * Đầu Thỏ (toạ độ chung với thân). `moods` = kèm mọi nét mặt để CSS chọn (nút hướng dẫn);
 * không thì vẽ đúng `eyes` / `mouth` / tai cụp `droop`.
 */
function head({ moods = false, eyes = 'happy', mouth = 'open', droop = false } = {}) {
  const eyesSvg = moods
    ? `<g class="bn-eyes-round bn-blink">${EYES.round}</g><g class="bn-eyes-happy">${EYES.happy}</g><g class="bn-eyes-up bn-blink">${EYES.up}</g><g class="bn-eyes-star">${EYES.star}</g>`
    : EYES[eyes];
  const mouthSvg = moods
    ? `<g class="bn-mouth-smile">${MOUTH.smile}</g><g class="bn-mouth-open">${MOUTH.open}</g><g class="bn-mouth-o">${MOUTH.o}</g>`
    : MOUTH[mouth];
  return `${earL}${earR(droop)}
    <ellipse cx="100" cy="76" rx="52" ry="45" fill="${FUR}" ${S()}/>
    <path d="M58 92Q70 112 100 114Q130 112 142 92" fill="none" stroke="${FUR2}" stroke-width="6" stroke-linecap="round"/>
    <path d="M96 34Q100 28 104 34" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="66" cy="92" rx="10" ry="6.5" fill="${CHEEK}" opacity=".6"/><ellipse cx="134" cy="92" rx="10" ry="6.5" fill="${CHEEK}" opacity=".6"/>
    ${eyesSvg}
    <path d="M95 84Q100 81 105 84Q104 90 100 91Q96 90 95 84Z" fill="${PINK}" ${S(2.5)}/>
    ${mouthSvg}`;
}

/**
 * Đầu Thỏ cho nút hướng dẫn (.pk-mascot) và dấu "đang ở đây" trên bản đồ. Khung cao hơn
 * vuông (132 × 170): phần vuông dưới là mặt, 38 đơn vị trên là hai tai, để tai không bị cắt.
 */
export function bunnyFace() {
  return `<svg class="bn bn-face" viewBox="34 -44 132 170" aria-hidden="true">${head({ moods: true })}</svg>`;
}

const limb = (d, end, cls = '') => `<g class="${cls}"><path d="${d}" stroke="${INK}" stroke-width="21" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${FUR}" stroke-width="14" fill="none" stroke-linecap="round"/><circle cx="${end[0]}" cy="${end[1]}" r="4" fill="${PINK2}"/></g>`;
const ARMS = {
  down: limb('M70 134Q58 152 66 168', [66, 168]) + limb('M130 134Q142 152 134 168', [134, 168]),
  up: limb('M70 134Q44 124 36 98', [36, 98]) + limb('M130 134Q156 124 164 98', [164, 98]),
  raise: limb('M70 134Q58 152 66 168', [66, 168]) + limb('M130 132Q156 112 158 80', [158, 80]),
  scratch: limb('M130 134Q142 152 134 168', [134, 168]) + limb('M70 132Q40 108 56 64', [56, 64], 'bn-scratch'),
  clap: limb('M70 134Q78 150 94 142', [94, 142], 'bn-clapL') + limb('M130 134Q122 150 106 142', [106, 142], 'bn-clapR'),
  pointUp: limb('M70 134Q58 152 66 168', [66, 168]) + limb('M130 132Q152 110 152 72', [152, 70], 'bn-wave'),
  shrug: limb('M70 134Q46 140 30 122', [30, 120], 'bn-shrugL') + limb('M130 134Q154 140 170 122', [170, 120], 'bn-shrugR'),
  chin: limb('M70 134Q58 152 66 168', [66, 168]) + limb('M130 136Q138 120 116 112', [116, 112]),
  oops: limb('M70 136Q70 118 92 106', [92, 106]) + limb('M130 136Q130 118 108 106', [108, 106]),
  pump: limb('M70 134Q58 152 66 168', [66, 168]) + limb('M130 132Q162 120 168 90', [168, 88], 'bn-pump'),
};

// Tư thế đưa tay lên mặt (che miệng, chống cằm): tay vẽ đè lên đầu.
const ARMS_FRONT = new Set(['chin', 'oops']);

/** Thỏ cả người: thân, tay `arms`, đầu, rồi `front` (đồ cầm trên tay) vẽ đè lên. */
function body({ arms = 'down', medal = false, front = '', ...face }) {
  return `
    <ellipse cx="100" cy="198" rx="50" ry="6" fill="#00000014"/>
    <circle class="bn-tail" cx="142" cy="166" r="13" fill="${FUR}" ${S()}/>
    <ellipse cx="100" cy="152" rx="40" ry="36" fill="${FUR}" ${S()}/>
    <ellipse cx="100" cy="160" rx="24" ry="22" fill="${PINK2}" opacity=".7"/>
    <ellipse cx="76" cy="188" rx="19" ry="10" fill="${FUR}" ${S()}/><ellipse cx="124" cy="188" rx="19" ry="10" fill="${FUR}" ${S()}/>
    <circle cx="70" cy="188" r="3.5" fill="${PINK2}"/><circle cx="130" cy="188" r="3.5" fill="${PINK2}"/>
    <path d="M100 120L84 111V129Z M100 120L116 111V129Z" fill="${BOW}" ${S(3)}/><circle cx="100" cy="120" r="5" fill="#0EA5E9" ${S(2.5)}/>
    ${medal ? `<g class="bn-medal"><path d="M90 116L100 140L110 116" fill="none" stroke="#EF4444" stroke-width="6"/><circle cx="100" cy="146" r="11" fill="${GOLD}" ${S(3)}/>${star(100, 146.5, 6, 2.6, '#fff', 1.5)}</g>` : ''}
    ${ARMS_FRONT.has(arms) ? '' : ARMS[arms]}
    ${head(face)}
    ${ARMS_FRONT.has(arms) ? ARMS[arms] : ''}
    ${front}`;
}

const TICK = `<g class="bn-tick"><circle cx="170" cy="40" r="22" fill="#22C55E" ${S(3.5)}/><path d="M159 41L167 49L182 32" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const QM = `<text class="bn-qm" x="6" y="40" font-size="46" font-weight="900" fill="#F59E0B" stroke="${INK}" stroke-width="3" paint-order="stroke" font-family="system-ui,sans-serif">?</text>`;

/** Mỗi cảm xúc có vài tư thế, lần lượt thay nhau mỗi lần Thỏ ló lên. */
const POSES = {
  right: [
    () => `<g class="bn-hop">${body({ arms: 'up', eyes: 'happy', mouth: 'open' })}</g>${TICK}`,
    () => `<g class="bn-bob">${body({ arms: 'clap', eyes: 'happy', mouth: 'open' })}</g>${sparkle(24, 30, 0)}${sparkle(178, 24, .5)}${sparkle(184, 120, .9, .8)}${sparkle(16, 120, .3, .8)}`,
    () => `<g class="bn-bob">${body({ arms: 'pointUp', eyes: 'wink', mouth: 'smile' })}</g>${star(152, 46, 14, 6, GOLD, 3)}${sparkle(130, 26, 0, .8)}${sparkle(182, 36, .4, .8)}${sparkle(176, 76, .8, .7)}`,
    () => `<g class="bn-bob">${body({ eyes: 'heart', mouth: 'open' })}</g>${floating(26, 60, 0, heart(26, 60, 10, '#FF6B8A'))}${floating(176, 50, .7, heart(176, 50, 9, '#FF9EB5'))}${floating(170, 130, 1.4, heart(170, 130, 8, '#FF4D6D'))}${floating(30, 140, 1.0, heart(30, 140, 8, '#FF9EB5'))}`,
    () => `<g class="bn-sway">${body({ arms: 'up', eyes: 'happy', mouth: 'open' })}</g>${floating(20, 50, 0, note(20, 50, '#B892FF'))}${floating(172, 70, .7, note(172, 70, '#4CC9F0'))}${floating(26, 150, 1.4, note(26, 150, '#7BD389'))}`,
  ],
  wrong: [
    () => `<g class="bn-tilt">${body({ arms: 'scratch', eyes: 'up', mouth: 'o', droop: true })}</g>${QM}`,
    () => `<g class="bn-shrug">${body({ arms: 'shrug', eyes: 'up', mouth: 'flat', droop: true })}</g>${QM}`,
    () => `${body({ arms: 'chin', eyes: 'up', mouth: 'flat' })}
      <circle cx="150" cy="36" r="5" fill="#fff" ${S(3)}/><circle cx="162" cy="20" r="8" fill="#fff" ${S(3)}/>
      <ellipse cx="180" cy="-12" rx="28" ry="20" fill="#fff" ${S(3.5)}/>${[168, 180, 192].map((x, i) => `<circle class="bn-dot" style="animation-delay:${i * .15}s" cx="${x}" cy="-12" r="4.5" fill="#38BDF8"/>`).join('')}`,
    () => `<g class="bn-tilt">${body({ arms: 'oops', eyes: 'wide', mouth: 'o', droop: true })}</g>
      <path class="bn-drip" d="M150 30Q158 42 158 48A8 8 0 0 1 142 48Q142 42 150 30Z" fill="#7DD3FC" ${S(2.5)}/>`,
    () => `<g class="bn-bob">${body({ arms: 'pump', eyes: 'firm', mouth: 'smile' })}</g>
      <path class="bn-spark" style="transform-origin:168px 88px" d="M184 76L196 70M188 90L202 90M184 104L196 110" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`,
  ],
  cheer: [
    () => `<g class="bn-jump">${body({ arms: 'up', eyes: 'star', mouth: 'open', front: `<g class="bn-held-star">${star(100, -6, 26, 12, GOLD, 3.5)}</g>` })}</g>`,
    () => `<g class="bn-jump">${body({ arms: 'up', eyes: 'happy', mouth: 'open' })}</g>${confetti()}`,
    () => `<g class="bn-sway">${body({ arms: 'clap', eyes: 'star', mouth: 'open' })}</g>${floating(24, 60, 0, heart(24, 60, 10, '#FF6B8A'))}${floating(176, 60, .8, star(176, 60, 12, 5, GOLD, 2.5))}${sparkle(20, 140, .4)}${sparkle(182, 130, 1.1)}`,
  ],
};

/** Thỏ cả người theo cảm xúc 'right' | 'wrong' | 'cheer'; `i` chọn tư thế (lần lượt thay nhau). */
export function bunnyPose(kind, i = 0) {
  const list = POSES[kind];
  return `<svg class="bn bn-pose" viewBox="-6 -40 212 246" aria-hidden="true">${list[i % list.length]()}</svg>`;
}

/** Thỏ cả người đeo huy chương, giơ cúp (trang hoàn thành trạm). */
export function bunnyWin() {
  const trophy = `<g class="bn-trophy"><path d="M140 34H176V48Q176 70 158 72Q140 70 140 48Z" fill="${GOLD}" ${S(3.5)}/><path d="M140 40Q128 40 130 52Q132 60 142 60M176 40Q188 40 186 52Q184 60 174 60" stroke="${INK}" stroke-width="3.5" fill="none"/><rect x="153" y="72" width="10" height="8" fill="${GOLD}" ${S(3)}/>${star(158, 52, 8, 3.5, '#fff', 2)}</g>`;
  return `<svg class="bn bn-win" viewBox="-6 -44 212 248" aria-hidden="true">${body({ arms: 'raise', medal: true, front: trophy })}</svg>`;
}
