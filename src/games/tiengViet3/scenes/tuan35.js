// Phim truyện "Sự tích sông hồ ở Tây Nguyên" (theo Truyện cổ Tây Nguyên), Tuần 35 Tiếng Việt 3: 6 cảnh, đánh số theo câu (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật: muông thú vẽ riêng ở đây (già làng Voi quấn khăn thổ cẩm, Cá Sấu, hươu, thỏ, khỉ, gấu, chim, cá);
// cảnh cuối có già làng Tây Nguyên (giaLang) kể chuyện cho bé (cho) nghe.
// Buôn làng muông thú: nhà sàn, nhà rông mái cao, núi rừng Tây Nguyên.
import { person } from '../cast.js';
import { W, H, svg, at, talkAt, sky, cloud, sun, tree, sparkles, word, heart, flowers, tufts, leaves, soundWaves, LINE } from '../sceneKit.js';

const LAKE = '#38BDF8', LAKE_L = '#7DD3FC';
const GREY = '#A1A9B5', GREY_D = '#8C96A3';
const CROC = '#4D7C0F', CROC_L = '#65A30D', CROC_B = '#D9F99D';

/** Già làng Voi (x giữa, y chân), nhìn sang phải; mood: happy · angry · proud; trunk: down · up; scarf: khăn thổ cẩm. */
function elephant(x, y, s = 1, { flip = false, mood = 'happy', trunk = 'down', scarf = true, run = false } = {}) {
  const legs = [-30, -14, 10, 26].map((dx, i) => {
    const r = run ? (i % 2 ? 14 : -14) : 0;
    return `<g transform="rotate(${r} ${dx} -30)"><rect x="${dx - 7}" y="-30" width="14" height="30" rx="4" fill="${i === 1 || i === 2 ? GREY_D : GREY}" stroke="${LINE}" stroke-width="1"/>
      <path d="M${dx - 5} -2 h10" stroke="#F1F5F9" stroke-width="2"/></g>`;
  }).join('');
  const tr = trunk === 'up' ? 'M52 -54 Q72 -64 70 -88 Q69 -98 78 -100' : 'M52 -54 Q66 -40 60 -20 Q58 -12 64 -10';
  const brow = mood === 'angry' ? `<path d="M38 -72 L50 -67" stroke="${LINE}" stroke-width="2.4" stroke-linecap="round"/>` : '';
  const eye = mood === 'proud'
    ? `<path d="M41 -64 Q44 -67 47 -64" stroke="#1F2937" stroke-width="1.8" fill="none" stroke-linecap="round"/>`
    : `<circle cx="44" cy="-64" r="2.6" fill="#1F2937"/><circle cx="44.8" cy="-65" r="0.8" fill="#fff"/>`;
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    ${legs}
    <ellipse cx="-2" cy="-46" rx="44" ry="30" fill="${GREY}" stroke="${LINE}" stroke-width="1.2"/>
    <path d="M-44 -50 q-10 4 -8 16" stroke="${LINE}" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${scarf ? `<path d="M-20 -75 Q0 -78 18 -72 L16 -42 Q0 -38 -18 -42Z" fill="#DC2626" stroke="${LINE}" stroke-width="1"/>
      <path d="M-19 -66 Q0 -69 17 -64 M-18 -52 Q0 -54 16 -50" stroke="#FACC15" stroke-width="2.4" fill="none"/>
      <path d="M-18 -59 Q0 -62 16 -57" stroke="#F8FAFC" stroke-width="1.6" fill="none" stroke-dasharray="3 3"/>` : ''}
    <circle cx="38" cy="-60" r="22" fill="${GREY}" stroke="${LINE}" stroke-width="1.2"/>
    <path d="${tr}" stroke="${LINE}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="${tr}" stroke="${GREY}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M50 -44 q10 4 12 -2" stroke="#FFFBEB" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M28 -78 Q8 -84 6 -60 Q8 -38 30 -44Z" fill="#B8C0CB" stroke="${LINE}" stroke-width="1"/>
    ${scarf ? `<path d="M22 -80 Q40 -86 56 -76" stroke="#DC2626" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M24 -81 Q40 -86 54 -77" stroke="#FACC15" stroke-width="1.4" fill="none" stroke-dasharray="3 2"/>` : ''}
    ${eye}${brow}
    <ellipse cx="48" cy="-55" rx="3" ry="1.8" fill="#F9A8A8" opacity="0.7"/></g>`;
}

/** Cá Sấu (x giữa, y chân) nhìn sang phải; open: há mồm; mood: mean · thirsty · sad · ko (ngửa bụng, choáng). */
function croc(x, y, s = 1, { flip = false, open = false, mood = 'mean' } = {}) {
  const upper = `<path d="M30 -28 Q52 -32 92 -22 Q98 -18 92 -15 L32 -15Z" fill="${CROC_L}" stroke="${LINE}" stroke-width="1"/>
    <path d="M40 -15 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5" stroke="#fff" stroke-width="1.4" fill="#fff"/>
    <circle cx="88" cy="-23" r="1.4" fill="${LINE}"/>`;
  const jaw = open ? `<g transform="rotate(-22 34 -16)">${upper}</g>` : upper;
  const eye = mood === 'ko'
    ? `<path d="M36 -33 l6 6 M42 -33 l-6 6" stroke="${LINE}" stroke-width="1.8" stroke-linecap="round"/>`
    : `<circle cx="39" cy="-30" r="5" fill="#FEF9C3" stroke="${LINE}" stroke-width="0.8"/><circle cx="40.5" cy="-30" r="2.2" fill="#1F2937"/>
      ${mood === 'mean' ? `<path d="M32 -37 L46 -33" stroke="${LINE}" stroke-width="2.2" stroke-linecap="round"/>` : ''}
      ${mood === 'sad' || mood === 'thirsty' ? `<path d="M33 -34 L45 -38" stroke="${LINE}" stroke-width="2" stroke-linecap="round"/>` : ''}`;
  const tongue = mood === 'thirsty' ? `<path d="M60 -13 Q68 -4 62 2 Q58 -4 56 -12Z" fill="#F472B6" stroke="${LINE}" stroke-width="0.8"/>` : '';
  const body = `
    <path d="M-30 -26 Q-70 -18 -114 -5 Q-70 -3 -30 -4Z" fill="${CROC}" stroke="${LINE}" stroke-width="1"/>
    ${[-24, -8, 14, 26].map((dx, i) => `<path d="M${dx - 5} -10 L${dx - 7 + (i % 2) * 4} 0 H${dx + 7} L${dx + 5} -10Z" fill="${CROC}" stroke="${LINE}" stroke-width="0.9"/>`).join('')}
    <ellipse cx="0" cy="-16" rx="42" ry="13" fill="${CROC}" stroke="${LINE}" stroke-width="1"/>
    <path d="M-36 -10 Q0 -2 36 -10" stroke="${CROC_B}" stroke-width="5" fill="none" stroke-linecap="round"/>
    ${[-90, -72, -54, -36, -18, 0, 18].map(dx => `<path d="M${dx - 5} ${dx < -30 ? -12 - (dx + 114) * 0.12 : -28} l5 -6 l5 6" fill="${CROC_L}" stroke="${LINE}" stroke-width="0.7"/>`).join('')}
    <path d="M32 -15 L90 -13 Q94 -9 88 -6 L34 -5Z" fill="${CROC_L}" stroke="${LINE}" stroke-width="1"/>
    <path d="M42 -6 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5" stroke="#fff" stroke-width="1.2" fill="#fff"/>
    ${tongue}${jaw}${eye}`;
  if (mood === 'ko') return `<g transform="translate(${x} ${y - 32 * s}) scale(${flip ? -s : s} ${-s})">${body}</g>`;
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">${body}</g>`;
}

/** Hươu sao (x, y chân) nhìn phải. */
const deer = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
  ${[-16, -8, 10, 18].map(dx => `<rect x="${dx - 2.5}" y="-26" width="5" height="26" rx="2" fill="#B45309" stroke="${LINE}" stroke-width="0.8"/>`).join('')}
  <ellipse cx="0" cy="-32" rx="24" ry="12" fill="#D97706" stroke="${LINE}" stroke-width="1"/>
  ${[[-10, -34], [0, -38], [8, -32], [-4, -28]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2" fill="#FEF3C7"/>`).join('')}
  <path d="M16 -38 L24 -58 L32 -54 L24 -34Z" fill="#D97706" stroke="${LINE}" stroke-width="1"/>
  <ellipse cx="32" cy="-60" rx="10" ry="7" fill="#D97706" stroke="${LINE}" stroke-width="1"/>
  <path d="M26 -66 l-4 -12 l-5 -3 M22 -78 l4 -5 M32 -67 l2 -12 l-3 -4 M34 -79 l5 -3" stroke="#78350F" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="35" cy="-62" r="1.6" fill="#1F2937"/><circle cx="41" cy="-58" r="1.6" fill="#1F2937"/>
  <path d="M-24 -36 l-5 -4" stroke="${LINE}" stroke-width="3" stroke-linecap="round"/></g>`;

/** Thỏ trắng đứng (x, y chân). */
const rabbit = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
  <ellipse cx="0" cy="-14" rx="12" ry="14" fill="#F8FAFC" stroke="${LINE}" stroke-width="1"/>
  <circle cx="2" cy="-34" r="10" fill="#F8FAFC" stroke="${LINE}" stroke-width="1"/>
  <ellipse cx="-2" cy="-52" rx="3.5" ry="10" fill="#F8FAFC" stroke="${LINE}" stroke-width="1"/><ellipse cx="7" cy="-52" rx="3.5" ry="10" fill="#F8FAFC" stroke="${LINE}" stroke-width="1"/>
  <ellipse cx="7" cy="-52" rx="1.4" ry="6" fill="#FBCFE8"/>
  <circle cx="5" cy="-35" r="1.5" fill="#1F2937"/><circle cx="11" cy="-32" r="1.4" fill="#F472B6"/>
  <ellipse cx="-6" cy="-1" rx="6" ry="3" fill="#F8FAFC" stroke="${LINE}" stroke-width="0.8"/><ellipse cx="6" cy="-1" rx="6" ry="3" fill="#F8FAFC" stroke="${LINE}" stroke-width="0.8"/></g>`;

/** Khỉ nâu (x, y chân), arms: giơ hai tay. */
const monkey = (x, y, s = 1, { flip = false, arms = false } = {}) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
  <path d="M-10 -12 Q-30 -10 -28 -30 Q-26 -40 -18 -36" stroke="#92400E" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M-6 -4 V0 M6 -4 V0" stroke="#92400E" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="0" cy="-18" rx="11" ry="14" fill="#A16207" stroke="${LINE}" stroke-width="1"/><ellipse cx="0" cy="-15" rx="6" ry="8" fill="#FDE68A"/>
  ${arms ? '<path d="M-9 -26 L-18 -44 M9 -26 L18 -44" stroke="#A16207" stroke-width="5" stroke-linecap="round"/>' : '<path d="M-9 -26 L-14 -10 M9 -26 L14 -10" stroke="#A16207" stroke-width="5" stroke-linecap="round"/>'}
  <circle cx="-11" cy="-42" r="4" fill="#FDE68A" stroke="${LINE}" stroke-width="0.8"/><circle cx="11" cy="-42" r="4" fill="#FDE68A" stroke="${LINE}" stroke-width="0.8"/>
  <circle cx="0" cy="-42" r="11" fill="#A16207" stroke="${LINE}" stroke-width="1"/><ellipse cx="0" cy="-39" rx="7.5" ry="6.5" fill="#FDE68A"/>
  <circle cx="-3" cy="-42" r="1.4" fill="#1F2937"/><circle cx="3" cy="-42" r="1.4" fill="#1F2937"/><path d="M-3 -37 Q0 -35 3 -37" stroke="#1F2937" stroke-width="1" fill="none"/></g>`;

/** Gấu đen đứng hai chân (x, y chân). */
const bear = (x, y, s = 1, { flip = false, arms = false } = {}) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
  <path d="M-9 -6 V0 M9 -6 V0" stroke="#292524" stroke-width="9" stroke-linecap="round"/>
  <ellipse cx="0" cy="-24" rx="17" ry="21" fill="#44403C" stroke="${LINE}" stroke-width="1"/>
  <path d="M-9 -38 Q0 -32 9 -38 L0 -30Z" fill="#FDE68A"/>
  ${arms ? '<path d="M-14 -34 L-24 -52 M14 -34 L24 -52" stroke="#44403C" stroke-width="8" stroke-linecap="round"/>' : '<path d="M-14 -34 L-20 -18 M14 -34 L20 -18" stroke="#44403C" stroke-width="8" stroke-linecap="round"/>'}
  <circle cx="-10" cy="-60" r="5" fill="#44403C" stroke="${LINE}" stroke-width="0.8"/><circle cx="10" cy="-60" r="5" fill="#44403C" stroke="${LINE}" stroke-width="0.8"/>
  <circle cx="0" cy="-50" r="13" fill="#44403C" stroke="${LINE}" stroke-width="1"/><ellipse cx="0" cy="-45" rx="6" ry="4.5" fill="#D6B48A"/>
  <circle cx="-5" cy="-52" r="1.6" fill="#fff"/><circle cx="5" cy="-52" r="1.6" fill="#fff"/><ellipse cx="0" cy="-47" rx="2" ry="1.4" fill="#1C1917"/></g>`;

/** Chim bay (x, y), màu c. */
const bird = (x, y, s = 1, c = '#F97316', d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:${d}s">
  <path d="M-12 -2 Q-6 -10 0 -2 Q6 -10 12 -2" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="0" cy="-1" r="2.4" fill="${c}"/></g></g>`;

/** Cá nhảy khỏi mặt nước. */
const fish = (x, y, s = 1, c = '#FB923C', d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:${d}s">
  <path d="M-10 0 Q0 -8 10 0 Q0 8 -10 0Z M-10 0 L-16 -6 V6Z" fill="${c}" stroke="${LINE}" stroke-width="0.8"/><circle cx="5" cy="-1" r="1.2" fill="#1F2937"/></g></g>`;

/** Nhà sàn Tây Nguyên (x giữa, y chân cột). */
const stiltHouse = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  ${[-30, -12, 12, 30].map(dx => `<rect x="${dx - 2.5}" y="-22" width="5" height="22" fill="#7C4A21"/>`).join('')}
  <path d="M-26 0 L-14 -22 M-22 -6 h10 M-18 -14 h8" stroke="#92400E" stroke-width="2"/>
  <rect x="-38" y="-46" width="76" height="24" fill="#D6A35C" stroke="${LINE}" stroke-width="1"/>
  ${[-30, -20, -10, 0, 10, 20, 30].map(dx => `<path d="M${dx} -46 v24" stroke="#B7862F" stroke-width="1"/>`).join('')}
  <rect x="-8" y="-42" width="16" height="20" fill="#7C4A21"/>
  <path d="M-48 -42 L-24 -78 H24 L48 -42Z" fill="#C2913A" stroke="#92400E" stroke-width="1"/>
  ${[-36, -24, -12, 0, 12, 24, 36].map(dx => `<path d="M${dx} -44 l4 -10" stroke="#A16207" stroke-width="1.2"/>`).join('')}</g>`;

/** Nhà rông mái cao vút (x giữa, y chân). */
const rongHouse = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  ${[-20, -6, 6, 20].map(dx => `<rect x="${dx - 2.5}" y="-24" width="5" height="24" fill="#7C4A21"/>`).join('')}
  <rect x="-28" y="-46" width="56" height="22" fill="#D6A35C" stroke="${LINE}" stroke-width="1"/>
  <path d="M-34 -42 Q-14 -90 0 -128 Q14 -90 34 -42Z" fill="#B7862F" stroke="#92400E" stroke-width="1.2"/>
  ${[0, 1, 2, 3].map(i => `<path d="M${-24 + i * 4} ${-56 - i * 18} H${24 - i * 4}" stroke="#92400E" stroke-width="1" opacity="0.6"/>`).join('')}
  <path d="M-6 -126 L0 -138 L6 -126" stroke="#92400E" stroke-width="2.4" fill="none"/></g>`;

/** Núi Tây Nguyên xanh xa (đỉnh tròn). */
const hills = (y = 170) => `<path d="M0 ${y} Q40 ${y - 70} 100 ${y - 40} Q160 ${y - 90} 230 ${y - 36} Q300 ${y - 80} 360 ${y - 40} Q420 ${y - 76} 480 ${y - 30} V${y + 30} H0Z" fill="#86B7A0"/>
  <path d="M0 ${y + 4} Q120 ${y - 30} 240 ${y - 6} Q360 ${y - 34} 480 ${y} V${y + 40} H0Z" fill="#4C9A6A"/>`;

/** Hồ hình bầu dục (cx, cy, rx, ry), sóng gợn. */
const lake = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx + 6}" ry="${ry + 4}" fill="#A3E635" opacity="0.6"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${LAKE}" stroke="#0EA5E9" stroke-width="1.5"/>
  ${[[-0.5, -0.3], [0.2, 0.1], [-0.1, 0.45], [0.55, -0.2]].map(([a, b], i) => `<path class="sc-drift" style="--d:${i}s" d="M${cx + a * rx} ${cy + b * ry} q6 -3 12 0 q6 3 12 0" stroke="#E0F2FE" stroke-width="2" fill="none"/>`).join('')}`;

/** Khúc gỗ tròn nằm ngang (x giữa, y, dài len, góc a). */
const log = (x, y, len = 50, a = 0) => `<g transform="translate(${x} ${y}) rotate(${a})">
  <rect x="${-len / 2}" y="-6" width="${len}" height="12" rx="5" fill="#A16207" stroke="${LINE}" stroke-width="1"/>
  <path d="M${-len / 2 + 6} -2 h${len * 0.4} M${-len / 2 + 14} 2 h${len * 0.3}" stroke="#78350F" stroke-width="1"/>
  <ellipse cx="${len / 2}" cy="0" rx="4" ry="6" fill="#FDE68A" stroke="${LINE}" stroke-width="1"/></g>`;

/** Hồ hình dấu chân voi: lòng tròn và bốn ngón ở phía trên. */
const footLake = (cx, cy, r, rot = 0) => `<g transform="translate(${cx} ${cy}) rotate(${rot})">
  <ellipse rx="${r}" ry="${r * 0.8}" fill="${LAKE}" stroke="#0EA5E9" stroke-width="1.4"/>
  ${[-0.6, -0.2, 0.2, 0.6].map(k => `<ellipse cx="${k * r}" cy="${-r * 0.92}" rx="${r * 0.2}" ry="${r * 0.16}" fill="${LAKE}" stroke="#0EA5E9" stroke-width="1.2"/>`).join('')}
  <path class="sc-drift" d="M${-r * 0.4} 0 q${r * 0.2} -3 ${r * 0.4} 0 q${r * 0.2} 3 ${r * 0.4} 0" stroke="#E0F2FE" stroke-width="1.6" fill="none"/></g>`;

/** Nốt nhạc nhỏ. */
const note = (x, y, c = '#DB2777', d = 0) => `<g transform="translate(${x} ${y})"><g class="sc-bob" style="--d:${d}s">
  <path d="M0 0 V-14 L9 -17 V-3" stroke="${c}" stroke-width="2" fill="none"/><ellipse cx="-2" cy="0" rx="3.6" ry="2.8" fill="${c}"/><ellipse cx="7" cy="-3" rx="3.6" ry="2.8" fill="${c}"/></g></g>`;

/** Hơi giận bốc lên (x, y). */
const steam = (x, y) => [0, 1].map(i => `<path class="sc-rise" style="--d:${i * 1.2}s" d="M${x + i * 12} ${y} q-5 -6 0 -12 q5 -6 0 -12" stroke="#F87171" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('');

/** Giọt mồ hôi. */
const drop = (x, y, s = 1) => `<path d="M${x} ${y} q${-4 * s} ${6 * s} 0 ${9 * s} q${4 * s} ${-3 * s} 0 ${-9 * s}Z" fill="#7DD3FC" stroke="#0284C7" stroke-width="0.8"/>`;

/** Nét chạy nhanh phía sau (x, y), dir 1: để lại bên trái. */
const speed = (x, y, dir = 1) => [0, 12, 24].map((dy, i) => `<path d="M${x} ${y + dy} h${-dir * (24 - i * 4)}" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.85"/>`).join('');

export default {
  sentences: true,
  groups: [[0, 1], [2, 3, 4], [5, 6], [7, 8], [9], [10, 11, 12]],
  scenes: [
    // Cảnh 1: ngày xưa muông thú sống thành buôn làng quanh cái hồ lớn; cuộc sống tươi vui, đầm ấm
    () => svg('Buôn làng muông thú quanh cái hồ lớn, cuộc sống tươi vui', `
      ${sky('t35s1sky', '#7DD3FC', '#ECFCCB')}
      ${sun(392, 40, 18)}${cloud(150, 34, 0.6, 0)}
      ${hills(150)}
      <rect y="186" width="${W}" height="${H - 186}" fill="#86EFAC"/>
      ${at(1, `${stiltHouse(112, 192, 0.62)}${rongHouse(250, 186, 0.6)}${stiltHouse(372, 192, 0.62)}`)}
      ${lake(244, 232, 112, 30)}
      ${at(1, `${elephant(126, 278, 0.7)}${deer(208, 278, 0.8)}${rabbit(254, 280, 0.8)}`)}
      ${at(1, `${monkey(300, 280, 0.85)}${bear(358, 278, 0.82, { flip: true })}`, { off: 2 })}
      ${at(1, tufts([[100, 214], [400, 216]]))}
      ${at(2, `${fish(210, 222, 1, '#FB923C', 0)}${fish(290, 230, 0.9, '#F472B6', 1)}`)}
      ${at(2, `${bird(170, 96, 0.9, '#F97316', 0)}${bird(310, 80, 0.8, '#EC4899', 1)}${bird(214, 70, 0.7, '#FACC15', 2)}`)}
      ${at(2, `${note(276, 214, '#DB2777', 0)}${note(330, 200, '#7C3AED', 1)}${heart(236, 196, 1, '#F43F5E', 0.5)}${heart(160, 200, 0.9, '#F43F5E', 1.5)}`)}
      ${at(2, `${monkey(300, 280, 0.85, { arms: true })}${bear(358, 278, 0.82, { flip: true, arms: true })}`)}
      ${at(2, flowers([[96, 284, '#F472B6'], [406, 284, '#FDE047'], [176, 284, '#A78BFA']]))}`),

    // Cảnh 2: Cá Sấu từ xa đến chiếm hồ; cảnh hồ vắng lặng; già làng Voi tức lắm, bảo mọi người cùng đánh đuổi Cá Sấu
    () => svg('Cá Sấu chiếm hồ, hồ vắng lặng; già làng Voi tức giận gọi mọi người đánh đuổi', `
      ${sky('t35s2sky', '#93C5FD', '#E0F2FE')}
      ${cloud(150, 34, 0.6, 0)}${cloud(370, 46, 0.6, 2)}
      ${hills(150)}
      <rect y="186" width="${W}" height="${H - 186}" fill="#86EFAC"/>
      ${stiltHouse(112, 192, 0.62)}${rongHouse(250, 186, 0.6)}${stiltHouse(372, 192, 0.62)}
      ${lake(250, 236, 120, 34)}
      ${at(1, `<g>${croc(236, 246, 0.78, { open: true })}<path d="M130 236 A120 34 0 0 0 370 236Z" fill="${LAKE}" stroke="#0EA5E9" stroke-width="1.5"/>
        ${[[180, 246], [300, 250]].map(([a, b], i) => `<path class="sc-drift" style="--d:${i}s" d="M${a} ${b} q6 -3 12 0 q6 3 12 0" stroke="#E0F2FE" stroke-width="2" fill="none"/>`).join('')}</g>`)}
      ${at(1, `${deer(376, 280, 0.7)}${speed(346, 242)}${rabbit(400, 280, 0.7)}${monkey(112, 280, 0.75, { flip: true, arms: true })}${speed(130, 242, -1)}`, { off: 2 })}
      ${at(2, `<rect width="${W}" height="${H}" fill="#64748B" opacity="0.18"/>`, { off: 3 })}
      ${at(2, leaves([[200, 120, '#CA8A04', 0], [320, 140, '#D97706', 1.2]]))}
      ${at(3, `${elephant(116, 280, 0.66, { mood: 'angry', trunk: 'up' })}${steam(146, 206)}`, { talk: '3' })}
      ${at(3, `${bear(404, 280, 0.72, { flip: true, arms: true })}${deer(366, 280, 0.62, true)}${monkey(336, 282, 0.7, { flip: true, arms: true })}`)}`),

    // Cảnh 3: già làng Voi nhử Cá Sấu ra xa hồ nước; Cá Sấu khát quá, cố chạy trở lại lòng hồ
    () => svg('Già làng Voi nhử Cá Sấu ra xa hồ; Cá Sấu khát quá chạy trở lại hồ', `
      ${sky('t35s3sky', '#FDE68A', '#FEF3C7')}
      ${sun(130, 46, 24)}
      ${hills(160)}
      <rect y="194" width="${W}" height="${H - 194}" fill="#E7C9A1"/>
      ${[[150, 240], [260, 270], [330, 226], [200, 290]].map(([x, y]) => `<path d="M${x} ${y} l10 -4 l6 6 l12 -3" stroke="#C69C6D" stroke-width="1.6" fill="none"/>`).join('')}
      <ellipse cx="444" cy="236" rx="62" ry="22" fill="${LAKE}" stroke="#0EA5E9" stroke-width="1.5"/>
      ${tree(420, 214, 0.5)}
      ${at(1, `${elephant(136, 272, 0.82, { flip: true, run: true, mood: 'happy' })}${speed(176, 214, -1)}`)}
      ${at(1, `${croc(304, 272, 0.9, { flip: true, open: true })}${speed(408, 240, -1)}`, { off: 2 })}
      ${at(2, `${croc(300, 272, 0.9, { open: true, mood: 'thirsty' })}${speed(192, 240)}${drop(324, 218)}${drop(338, 210, 0.8)}`)}
      ${at(2, `<g transform="translate(130 46)"><circle r="40" fill="#FB923C" opacity="0.25"/></g>`)}`),

    // Cảnh 4: cả làng xúm lại vây kín mặt hồ; muông thú các nơi kéo gỗ lát đường qua bãi lầy đến trợ giúp
    () => svg('Muông thú vây kín mặt hồ; muông thú các nơi kéo gỗ lát đường qua bãi lầy', `
      ${sky('t35s4sky', '#7DD3FC', '#ECFCCB')}
      ${cloud(140, 30, 0.6, 1)}
      ${hills(130)}
      <rect y="166" width="${W}" height="${H - 166}" fill="#86EFAC"/>
      <path d="M300 300 Q290 250 340 238 Q400 226 480 236 V300Z" fill="#78716C"/>
      ${[[330, 266], [380, 246], [430, 276], [460, 250]].map(([x, y]) => `<path d="M${x} ${y} v-14 M${x + 4} ${y} v-10 M${x - 4} ${y} v-9" stroke="#4D7C0F" stroke-width="2"/>`).join('')}
      ${lake(236, 196, 104, 26)}
      ${at(1, `${[150, 184, 220, 256, 292, 326].map((x, i) => [deer, rabbit, bear, monkey, rabbit, deer][i](x, 176, 0.5, i > 2)).join('')}`)}
      ${at(1, `${elephant(140, 248, 0.5)}${bear(300, 248, 0.6, { arms: true, flip: true })}${monkey(266, 250, 0.6, { arms: true })}${rabbit(196, 246, 0.6)}`)}
      ${at(1, `${croc(176, 280, 0.6, { mood: 'sad' })}${drop(196, 244, 0.9)}`)}
      ${at(2, `${log(318, 262, 46, -20)}${log(352, 248, 46, -10)}${log(392, 242, 46, 0)}${log(432, 240, 46, 6)}`)}
      ${at(2, `<path d="M414 262 L440 270" stroke="#A16207" stroke-width="2"/>${log(452, 274, 36, -14)}${bear(404, 280, 0.6, { flip: true, arms: true })}`)}
      ${at(2, `${deer(356, 228, 0.5, true)}`)}`),

    // Cảnh 5: Cá Sấu không được uống nước để lấy thêm sức mạnh, bị già làng Voi đánh quỵ
    () => svg('Cá Sấu không được uống nước, bị già làng Voi đánh quỵ', `
      ${sky('t35s5sky', '#7DD3FC', '#F0FDF4')}
      ${cloud(380, 36, 0.6, 2)}
      ${hills(140)}
      <rect y="176" width="${W}" height="${H - 176}" fill="#86EFAC"/>
      ${lake(310, 206, 110, 24)}
      ${[230, 270, 310, 350, 390].map((x, i) => [deer, rabbit, monkey, bear, deer][i](x, 188, 0.45, i > 1)).join('')}
      ${at(1, croc(290, 274, 0.82, { mood: 'ko' }))}
      ${at(1, sparkles([[250, 236, 7], [300, 228, 6], [330, 240, 7]], '#FACC15'))}
      ${at(1, talkAt('1', elephant(136, 280, 0.8, { mood: 'proud', trunk: 'up' })))}
      ${at(1, `${monkey(406, 280, 0.7, { flip: true, arms: true })}${rabbit(376, 282, 0.7, true)}${sparkles([[126, 150, 8], [196, 162, 7]], '#FACC15')}`)}`),

    // Cảnh 6: ngày nay khắp núi rừng Tây Nguyên có sông hồ; dấu chân Voi thành hồ, dấu vết kéo gỗ thành sông, suối
    () => svg('Núi rừng Tây Nguyên có nhiều sông hồ: dấu chân Voi thành hồ, vết kéo gỗ thành sông suối', `
      ${sky('t35s6sky', '#7DD3FC', '#ECFCCB')}
      ${sun(396, 36, 16)}${cloud(250, 30, 0.6, 1)}
      <path d="M0 120 Q60 60 120 96 Q180 50 250 92 Q320 54 380 90 Q430 64 480 92 V300 H0Z" fill="#86B7A0"/>
      <path d="M0 140 Q120 104 240 126 Q360 100 480 130 V300 H0Z" fill="#4C9A6A"/>
      <path d="M0 160 Q120 140 240 150 T480 148 V300 H0Z" fill="#65A30D"/>
      ${[[150, 158], [196, 150], [380, 152], [430, 158], [330, 146]].map(([x, y], i) => tree(x, y, 0.32 + (i % 2) * 0.06)).join('')}
      ${at(1, `${footLake(212, 196, 22, -10)}${footLake(338, 186, 18, 8)}${footLake(290, 248, 26, -4)}`)}
      ${at(1, `<path d="M480 168 Q420 176 400 200 Q380 226 330 230 M196 300 Q220 272 262 262" stroke="${LAKE}" stroke-width="9" fill="none" stroke-linecap="round"/>
        <path d="M420 300 Q400 270 360 262" stroke="${LAKE}" stroke-width="7" fill="none" stroke-linecap="round"/>`)}
      ${at(1, `${tree(250, 220, 0.34)}${tree(400, 250, 0.4)}${tree(180, 252, 0.36)}`)}
      ${at(2, `${sparkles([[212, 166, 6], [338, 160, 6], [290, 214, 7]], '#FFFFFF')}`)}
      ${at(3, `<g opacity="0.7">${log(360, 226, 30, 8)}${log(226, 266, 30, -8)}${log(392, 270, 26, 40)}</g>`)}
      ${at(3, sparkles([[420, 196, 6], [196, 278, 6]], '#FFFFFF'))}
      ${at(2, talkAt('2,3', person(104, 284, 'giaLang', 'point', { s: 0.7 })))}
      ${at(2, person(150, 284, 'cho', 'lookUp', { s: 0.56, mood: 'wow' }))}`),
  ],
};
