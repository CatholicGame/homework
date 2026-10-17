/**
 * Con vật cho phim tranh Tiếng Việt 3, tự vẽ bằng SVG (màu phẳng, viền mảnh, mặt tròn dễ thương),
 * theo dáng của tờ nhân vật mẫu (Châu Chấu, Giun Đất, bác Kiến ở Tuần 2).
 *
 * critter(x, y, tên, { h, flip }) → <g>; (x, y) là chỗ chạm đất (giữa mép dưới hình), h: chiều cao trong cảnh.
 * Tên: grasshopper-stand (nằm chống cằm trên gò) · grasshopper-jump · grasshopper-talk ·
 *   worm-grumpy (ló lên từ đất nứt) · worm-dig (rúc đầu xuống đất) · worm-happy (trong vũng nước) ·
 *   ant-carry (tha nhành lá thông) · ant-wipe (lau mồ hôi) · ant-think · ant-talk
 * Hình đều nhìn sang phải; flip để quay trái.
 * Mỗi hình vẽ trong hộp cao 100 đơn vị, chân ở y = 0, giữa ở x = 0; BOX giữ tỉ lệ rộng / cao như bản cũ.
 */

const OUT = '#5A2414';

// ---------- bác Kiến ----------
const ANT = '#B4532F', ANT_D = '#8A3A1F', ANT_L = '#CF6D45';

function antAntennae(dx = 0) {
  return [-1, 1].map(s => `<path d="M${dx + s * 5} -76 Q${dx + s * 8} -90 ${dx + s * 15} -96" stroke="${ANT_D}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <circle cx="${dx + s * 15.5}" cy="-96.5" r="2.6" fill="${ANT_D}"/>`).join('');
}

/** Mặt bác Kiến: kính tròn, lông mày bạc rậm; mood happy · talk · shut · tired. */
function antFace(dx, mood) {
  const eyes = mood === 'shut'
    ? [-1, 1].map(s => `<path d="M${dx + s * 6.5 - 3} -61 Q${dx + s * 6.5} -58.6 ${dx + s * 6.5 + 3} -61" stroke="#3B1A10" stroke-width="1.4" fill="none" stroke-linecap="round"/>`).join('')
    : [-1, 1].map(s => `<ellipse cx="${dx + s * 6.5}" cy="-61" rx="3.6" ry="4" fill="#fff"/><circle cx="${dx + s * 6.5 + 0.8}" cy="-60.6" r="2.3" fill="#3B1A10"/><circle cx="${dx + s * 6.5 + 1.5}" cy="-61.6" r="0.8" fill="#fff"/>`).join('');
  const brows = [-1, 1].map(s => {
    const x = dx + s * 7, y = mood === 'tired' ? -67.5 : -68.5;
    const tilt = mood === 'tired' ? s * 10 : 0;
    return `<g transform="rotate(${tilt} ${x} ${y})"><ellipse cx="${x - 2.6}" cy="${y + 0.6}" rx="3" ry="2.2" fill="#F5F5F4"/><ellipse cx="${x + 0.4}" cy="${y - 0.6}" rx="3.2" ry="2.4" fill="#fff"/><ellipse cx="${x + 3}" cy="${y + 0.4}" rx="2.6" ry="2" fill="#E7E5E4"/></g>`;
  }).join('');
  const glasses = [-1, 1].map(s => `<circle cx="${dx + s * 6.5}" cy="-61" r="5.4" fill="#fff" fill-opacity="0.15" stroke="#7C5A4A" stroke-width="1"/>`).join('')
    + `<path d="M${dx - 1.2} -61.4 Q${dx} -62.6 ${dx + 1.2} -61.4" stroke="#7C5A4A" stroke-width="1" fill="none"/>`;
  const mouth = mood === 'talk'
    ? `<path d="M${dx - 4} -52 Q${dx} -51.4 ${dx + 4} -52 Q${dx} -45.6 ${dx - 4} -52Z" fill="#8F2B2B"/><path d="M${dx - 2} -49 Q${dx} -50 ${dx + 2} -49" fill="#F28B95"/>`
    : mood === 'tired' ? `<ellipse cx="${dx + 1}" cy="-50.6" rx="2" ry="1.6" fill="#8F2B2B"/>`
      : `<path d="M${dx - 3.4} -52.4 Q${dx} -49 ${dx + 3.4} -52.4" stroke="#5A2414" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
  return `${[-1, 1].map(s => `<ellipse cx="${dx + s * 11}" cy="-55" rx="3" ry="1.8" fill="#F28B6E" opacity="0.8"/>`).join('')}
    <path d="M${dx - 1.4} -56 Q${dx} -54.4 ${dx + 1.4} -56" stroke="${ANT_D}" stroke-width="1" fill="none"/>
    ${eyes}${glasses}${brows}${mouth}
    ${mood === 'tired' ? `<path d="M${dx - 13} -70 q-2 4 0 6 q2 -2 0 -6Z M${dx - 16} -62 q-1.6 3 0 4.6 q1.6 -1.6 0 -4.6Z" fill="#7DD3FC" stroke="#38BDF8" stroke-width="0.5"/>` : ''}`;
}

/** Thân kiến: đầu (dx), ngực, bụng to lệch sau (ax); chân đứng; tay theo arms (mảng đường path). */
function antBody({ dx = 0, ax = -10, arms = [], mood = 'happy', walk = false }) {
  const legs = (walk ? [[-4, -30, -12, -14, -16, 0], [4, -30, 8, -14, 14, -1]] : [[-4, -30, -9, -14, -10, 0], [4, -30, 9, -14, 10, 0]])
    .map(([x1, y1, x2, y2, x3, y3]) => `<path d="M${x1} ${y1} L${x2} ${y2} L${x3} ${y3}" stroke="${ANT_D}" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="${x3 + 1.6}" cy="${y3 - 0.8}" rx="3.4" ry="1.8" fill="${ANT_D}"/>`).join('');
  return `<ellipse cx="0" cy="0" rx="26" ry="3.6" fill="#000" opacity="0.12"/>
    ${antAntennae(dx)}
    <ellipse cx="${ax}" cy="-26" rx="17" ry="14.5" fill="${ANT}" stroke="${OUT}" stroke-width="1.1"/>
    ${[-6, 2].map(k => `<path d="M${ax + k - 8} ${-38 + Math.abs(k)} Q${ax + k + 2} -26 ${ax + k - 8} ${-14 - Math.abs(k) / 2}" stroke="${ANT_D}" stroke-width="1.6" fill="none" opacity="0.7"/>`).join('')}
    <ellipse cx="${ax - 6}" cy="-31" rx="5" ry="3" fill="${ANT_L}" opacity="0.7"/>
    ${legs}
    <ellipse cx="0" cy="-40" rx="8.4" ry="9.6" fill="${ANT}" stroke="${OUT}" stroke-width="1.1"/>
    <path d="M${dx * 0.3} -50 L${dx * 0.6} -46" stroke="${OUT}" stroke-width="3"/>
    <ellipse cx="${dx}" cy="-62" rx="18" ry="16.5" fill="${ANT}" stroke="${OUT}" stroke-width="1.1"/>
    <ellipse cx="${dx - 6}" cy="-72" rx="6" ry="3" fill="${ANT_L}" opacity="0.6"/>
    ${antFace(dx, mood)}
    ${arms.map(d => `<path d="${d}" stroke="${ANT_D}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
    ${arms.map(d => { const m = d.match(/(-?[\d.]+) (-?[\d.]+)$/); return `<circle cx="${m[1]}" cy="${m[2]}" r="2.6" fill="${ANT_D}"/>`; }).join('')}`;
}

const pineBranch = `<g>
  <path d="M-34 -58 L30 -40" stroke="#8B5A2B" stroke-width="3.2" stroke-linecap="round"/>
  ${[-34, -26, -18].map((x, i) => `<g transform="translate(${x} ${-58 + (x + 34) * 0.28})">${[-70, -40, -10, 20, 50, 80, 110, 140, 170].map(r => `<path d="M0 0 l${(Math.cos(r * Math.PI / 180) * (9 - i)).toFixed(1)} ${(Math.sin(r * Math.PI / 180) * (9 - i)).toFixed(1)}" stroke="${i % 2 ? '#2F6F3E' : '#3F8F4E'}" stroke-width="1.4" stroke-linecap="round"/>`).join('')}</g>`).join('')}</g>`;

const ANTS = {
  'ant-talk': () => antBody({ dx: 0, ax: 0, mood: 'talk', arms: ['M-6 -44 L-16 -50 L-25 -46', 'M-6 -38 L-16 -36 L-24 -30', 'M6 -44 L16 -50 L25 -46', 'M6 -38 L16 -36 L24 -30'] }),
  'ant-think': () => antBody({ dx: 2, ax: -12, mood: 'shut', arms: ['M5 -44 L10 -50 L4 -52', 'M-5 -42 L4 -38 L8 -42', 'M6 -38 L12 -32 L8 -28'] }),
  'ant-wipe': () => antBody({ dx: 0, ax: -12, mood: 'tired', arms: ['M6 -44 L16 -50 L22 -60', 'M-5 -40 L-12 -32 L-10 -26', 'M5 -38 L10 -30 L8 -26'] })
    + `<g transform="translate(25 -63) rotate(12)"><path d="M-4 -8 Q6 -10 8 -2 Q9 8 2 10 Q-6 6 -4 -8Z" fill="#FCD34D" stroke="#CA8A04" stroke-width="0.8"/><path d="M-2 -4 Q3 -5 5 0" stroke="#CA8A04" stroke-width="0.7" fill="none"/></g>`,
  'ant-carry': () => pineBranch + antBody({ dx: 4, ax: -14, walk: true, mood: 'happy', arms: ['M6 -44 L12 -50 L14 -46', 'M-4 -44 L-10 -52 L-8 -55', 'M5 -38 L12 -34 L16 -36'] }),
};

// ---------- Châu Chấu ----------
const GR = '#8BC34A', GR_D = '#5E9A2B', GR_L = '#C5E384', GR_O = '#3F6B1E';

function hopperHead(x, y, r, mood, tilt = 0) {
  const eyes = mood === 'joy'
    ? [-1, 1].map(s => `<path d="M${s * r * 0.36 - 3.2} ${-r * 0.06} Q${s * r * 0.36} ${-r * 0.3} ${s * r * 0.36 + 3.2} ${-r * 0.06}" stroke="#2B1D16" stroke-width="1.6" fill="none" stroke-linecap="round"/>`).join('')
    : [-1, 1].map(s => `<ellipse cx="${s * r * 0.36 + 1}" cy="${-r * 0.1}" rx="${r * 0.22}" ry="${r * 0.27}" fill="#3B2A1A"/><circle cx="${s * r * 0.36 + 2}" cy="${-r * 0.22}" r="${r * 0.08}" fill="#fff"/>`).join('');
  const mouth = mood === 'talk'
    ? `<path d="M${-r * 0.22 + 2} ${r * 0.26} Q2 ${r * 0.3} ${r * 0.22 + 2} ${r * 0.26} Q2 ${r * 0.62} ${-r * 0.22 + 2} ${r * 0.26}Z" fill="#B4363C"/><path d="M-1 ${r * 0.48} Q2 ${r * 0.4} 5 ${r * 0.48}" fill="#F28B95"/>`
    : `<path d="M${-r * 0.2 + 2} ${r * 0.26} Q2 ${r * 0.48} ${r * 0.2 + 2} ${r * 0.26}" stroke="#2B1D16" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x} ${y}) rotate(${tilt})">
    ${[[-0.3, -0.85, -0.9, -1.7, -1.5, -2.05], [0.25, -0.9, 0.3, -1.8, 0.95, -2.1]].map(([a, b, c, d, e, g]) =>
      `<path d="M${r * a} ${r * b} Q${r * c} ${r * d} ${r * e} ${r * g}" stroke="${GR_D}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`).join('')}
    <ellipse cx="0" cy="0" rx="${r * 1.04}" ry="${r}" fill="${GR}" stroke="${GR_O}" stroke-width="1.1"/>
    <ellipse cx="${-r * 0.35}" cy="${-r * 0.55}" rx="${r * 0.36}" ry="${r * 0.18}" fill="${GR_L}" opacity="0.8"/>
    ${[-1, 1].map(s => `<ellipse cx="${s * r * 0.6 + 2}" cy="${r * 0.22}" rx="${r * 0.19}" ry="${r * 0.11}" fill="#F9A8A8" opacity="0.85"/>`).join('')}
    ${eyes}${mouth}</g>`;
}

/** Chân sau to của châu chấu: đùi hình đùi gà (hông → gối), cẳng mảnh có gai (gối → bàn). */
function hopperLeg(hx, hy, kx, ky, fx, fy, w = 7) {
  const len = Math.hypot(kx - hx, ky - hy), a = Math.atan2(ky - hy, kx - hx) * 180 / Math.PI;
  const sa = Math.atan2(fy - ky, fx - kx);
  const spikes = [0.3, 0.5, 0.7].map(t => { const x = kx + (fx - kx) * t, y = ky + (fy - ky) * t; return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} l${(Math.cos(sa + 2.4) * 3).toFixed(1)} ${(Math.sin(sa + 2.4) * 3).toFixed(1)}" stroke="${GR_O}" stroke-width="1" stroke-linecap="round"/>`; }).join('');
  return `<path d="M${kx} ${ky} L${fx} ${fy}" stroke="${GR_O}" stroke-width="3.8" stroke-linecap="round"/><path d="M${kx} ${ky} L${fx} ${fy}" stroke="${GR}" stroke-width="2.3" stroke-linecap="round"/>${spikes}
    <path d="M${fx} ${fy} l4.6 0.4" stroke="${GR_O}" stroke-width="2.2" stroke-linecap="round"/>
    <g transform="translate(${hx} ${hy}) rotate(${a.toFixed(1)})">
      <path d="M-2 ${-w} Q${len * 0.45} ${-w * 1.15} ${len + 2} -2 Q${len + 3} 2 ${len} 3 Q${len * 0.45} ${w * 0.9} -2 ${w * 0.8} Q-5 0 -2 ${-w}Z" fill="${GR}" stroke="${GR_O}" stroke-width="1.1"/>
      ${[0.3, 0.5, 0.7].map(t => `<path d="M${len * t} ${-w * 0.6} l3 ${w * 0.55} l-3 ${w * 0.55}" stroke="${GR_D}" stroke-width="1" fill="none" opacity="0.8"/>`).join('')}
    </g>`;
}
const thin = (d) => `<path d="${d}" stroke="${GR_O}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${GR}" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
/** Bụng châu chấu (elip có vạch đốt) và cánh lá sẫm dọc lưng. */
const abdomen = (cx, cy, rx, ry, rot) => `<g transform="translate(${cx} ${cy}) rotate(${rot})">
  <ellipse rx="${rx}" ry="${ry}" fill="${GR}" stroke="${GR_O}" stroke-width="1.1"/>
  <path d="M${-rx * 0.8} ${ry * 0.35} Q0 ${ry * 0.9} ${rx * 0.8} ${ry * 0.3}" stroke="${GR_L}" stroke-width="${ry * 0.45}" fill="none" stroke-linecap="round"/>
  ${[0.1, 0.35, 0.6].map(t => `<path d="M${-rx + rx * 2 * t} ${-ry * 0.2} q1.5 ${ry * 0.6} 0 ${ry * 1.1}" stroke="${GR_D}" stroke-width="0.9" fill="none" opacity="0.7"/>`).join('')}
  <path d="M${-rx * 0.85} ${-ry * 0.6} Q0 ${-ry * 1.9} ${rx * 1.18} ${-ry * 0.2} Q0 ${-ry * 0.7} ${-rx * 0.85} ${-ry * 0.1}Z" fill="${GR_D}" stroke="${GR_O}" stroke-width="1"/>
  <path d="M${-rx * 0.6} ${-ry * 0.55} Q0 ${-ry * 1.1} ${rx * 0.9} ${-ry * 0.3}" stroke="${GR}" stroke-width="0.9" fill="none" opacity="0.8"/></g>`;

/** Ngực (khiên ngực) nối đầu với bụng. */
const thorax = (cx, cy, rx, ry, rot) => `<g transform="translate(${cx} ${cy}) rotate(${rot})">
  <ellipse rx="${rx}" ry="${ry}" fill="${GR}" stroke="${GR_O}" stroke-width="1.1"/>
  <path d="M${-rx * 0.7} ${-ry * 0.2} Q0 ${ry * 0.3} ${rx * 0.7} ${-ry * 0.2}" stroke="${GR_D}" stroke-width="1" fill="none" opacity="0.7"/>
  <ellipse cx="${-rx * 0.3}" cy="${-ry * 0.5}" rx="${rx * 0.35}" ry="${ry * 0.2}" fill="${GR_L}" opacity="0.7"/></g>`;

const mound = (w, h, c = '#C68B59', d = '#A86F43') => `<path d="M${-w} 0 Q${-w * 0.8} ${-h} ${-w * 0.2} ${-h * 1.05} Q${w * 0.5} ${-h * 1.1} ${w * 0.85} ${-h * 0.4} Q${w} ${-h * 0.1} ${w} 0Z" fill="${c}" stroke="${d}" stroke-width="1"/>
  ${[[-0.5, -0.5], [0.1, -0.7], [0.5, -0.35], [-0.2, -0.25]].map(([a, b]) => `<ellipse cx="${w * a}" cy="${h * b}" rx="3" ry="1.6" fill="${d}" opacity="0.6"/>`).join('')}`;

const HOPPERS = {
  // Nằm sấp trên gò, ngực nhổm lên, chân trước chống khuỷu xuống đất đỡ cằm; chân sau gập: đùi chếch lên sau, cẳng xếp dưới đùi, bàn chân chạm gò.
  'grasshopper-stand': () => `${mound(48, 22)}
    ${thin('M-6 -30 L-10 -24 L-6 -21')}${thin('M2 -30 L2 -24 L8 -22')}
    ${abdomen(17, -29, 24, 8, -6)}
    ${hopperLeg(6, -33, 32, -47, 15, -22, 6.5)}
    ${thorax(-11, -37, 10, 9.5, -25)}
    ${thin('M-15 -33 L-30 -19 L-25 -39')}
    ${hopperHead(-22, -53, 15, 'joy', -10)}
    <ellipse cx="-25" cy="-39.5" rx="4" ry="2.8" fill="${GR}" stroke="${GR_O}" stroke-width="0.9"/>`,
  'grasshopper-jump': () => `
    ${hopperLeg(-8, -32, -20, -16, -30, -3, 6)}
    ${abdomen(-1, -43, 20, 8, -58)}
    ${thin('M6 -54 L16 -46 L25 -50')}${thin('M2 -48 L8 -38 L17 -37')}${thin('M-2 -44 L-6 -32 L2 -28')}
    ${thorax(9, -57, 8, 7.5, -50)}
    ${hopperHead(17, -70, 14, 'happy', 8)}
    <path d="M-34 -50 q-6 4 -4 10 M-30 -60 q-8 2 -8 8" stroke="#16A34A" stroke-width="1.6" fill="none" stroke-linecap="round" opacity="0.6"/>`,
  'grasshopper-talk': () => `${mound(32, 6)}
    ${thin('M-1 -28 L-5 -14 L-7 -2')}${thin('M6 -27 L8 -14 L10 -2')}
    ${abdomen(5, -44, 18, 9.5, 78)}
    ${hopperLeg(10, -40, 24, -62, 27, -3, 6)}
    ${thorax(2, -55, 8.5, 8, 0)}
    ${thin('M-4 -54 L-17 -48 L-25 -58')}${thin('M6 -54 L12 -46 L5 -42')}
    <g transform="translate(-25.5 -59)">${[-35, 0, 35].map(r => `<path d="M0 0 l${(Math.sin(r * Math.PI / 180) * 4).toFixed(1)} ${(-Math.cos(r * Math.PI / 180) * 4).toFixed(1)}" stroke="${GR_O}" stroke-width="1.8" stroke-linecap="round"/>`).join('')}</g>
    ${hopperHead(0, -70, 14, 'talk', 4)}`,
};

// ---------- Giun Đất ----------
const WM = '#F6A9A3', WM_D = '#E27D7A', WM_O = '#B5544F';

/** Thân giun: nét dày đi theo d, có vạch đốt ngang; wd: bề dày. */
function wormTube(d, wd, rings = []) {
  return `<path d="${d}" stroke="${WM_O}" stroke-width="${wd + 2.4}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${d}" stroke="${WM}" stroke-width="${wd}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${d}" stroke="#FBD0CB" stroke-width="${wd * 0.28}" fill="none" stroke-linecap="round" transform="translate(${-wd * 0.18} ${-wd * 0.12})" opacity="0.7"/>
    ${rings.map(([x, y, a, l = wd * 0.42]) => `<path d="M${x} ${y} m${(-Math.cos(a) * l).toFixed(1)} ${(-Math.sin(a) * l).toFixed(1)} q${(Math.cos(a) * l + Math.sin(a) * 3).toFixed(1)} ${(Math.sin(a) * l - Math.cos(a) * 3).toFixed(1)} ${(Math.cos(a) * l * 2).toFixed(1)} ${(Math.sin(a) * l * 2).toFixed(1)}" stroke="${WM_D}" stroke-width="1.2" fill="none" opacity="0.8"/>`).join('')}`;
}

function wormFace(x, y, mood) {
  const eyes = mood === 'grumpy'
    ? [-1, 1].map(s => `<ellipse cx="${x + s * 6}" cy="${y}" rx="2.4" ry="2.8" fill="#3B1A10"/><path d="M${x + s * 2.6} ${y - 4} L${x + s * 9} ${y - 7}" stroke="#3B1A10" stroke-width="1.8" stroke-linecap="round"/>`).join('')
    : mood === 'squint'
      ? [-1, 1].map(s => `<path d="M${x + s * 9} ${y - 3} L${x + s * 5} ${y} L${x + s * 9} ${y + 3}" stroke="#3B1A10" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join('')
      : [-1, 1].map(s => `<path d="M${x + s * 6 - 3} ${y} Q${x + s * 6} ${y - 3.6} ${x + s * 6 + 3} ${y}" stroke="#3B1A10" stroke-width="1.6" fill="none" stroke-linecap="round"/>`).join('');
  const mouth = mood === 'grumpy'
    ? `<path d="M${x - 4} ${y + 9} Q${x} ${y + 5} ${x + 4} ${y + 9}" stroke="#3B1A10" stroke-width="1.5" fill="none" stroke-linecap="round"/>`
    : mood === 'squint' ? `<path d="M${x - 3} ${y + 7} Q${x} ${y + 5} ${x + 3} ${y + 7}" stroke="#3B1A10" stroke-width="1.3" fill="none" stroke-linecap="round"/>`
      : `<path d="M${x - 5} ${y + 6} Q${x} ${y + 11} ${x + 5} ${y + 6}" stroke="#3B1A10" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
  return `${[-1, 1].map(s => `<ellipse cx="${x + s * 11}" cy="${y + 5}" rx="3" ry="1.8" fill="#F87171" opacity="0.55"/>`).join('')}${eyes}${mouth}`;
}

const crack = (pts) => `<path d="${pts}" stroke="#8B6340" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;

const WORMS = {
  'worm-grumpy': () => `
    <path d="M-86 0 Q-80 -22 -30 -26 Q20 -30 70 -22 Q90 -16 86 0Z" fill="#D7A877" stroke="#A9794C" stroke-width="1"/>
    ${crack('M-60 -10 l14 -4 l6 6 M-40 -20 l8 6 M30 -8 l12 -6 l10 4 M50 -20 l-6 6 M-12 -6 l-8 4')}
    <ellipse cx="0" cy="-18" rx="22" ry="6" fill="#6B4A2E"/>
    ${wormTube('M0 -18 L0 -74', 34, [[0, -30, 0], [0, -40, 0], [0, -50, 0]])}
    ${wormFace(0, -68, 'grumpy')}
    <path d="M-26 -17 Q0 -9 26 -17 L30 0 H-30Z" fill="#D7A877"/>
    <path d="M-22 -17 Q0 -10 22 -17" stroke="#C79362" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${crack('M-22 -16 l-10 4 M22 -16 l10 3 l4 -4')}`,
  'worm-dig': () => `
    <path d="M-96 0 Q-90 -30 -50 -36 Q0 -44 50 -36 Q92 -30 96 0Z" fill="#5B4636" stroke="#3F2F24" stroke-width="1"/>
    ${[[-70, -14], [-30, -24], [20, -20], [60, -12], [0, -8]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="2.6" fill="#7A604B"/>`).join('')}
    ${wormTube('M-34 -36 C-38 -86 20 -90 26 -48 Q30 -30 50 -34 Q66 -38 68 -52', 30, [[-35, -66, -1.4], [-18, -80, -0.4], [6, -79, 0.5], [22, -58, 1.3], [44, -34, 1.6]])}
    <path d="M-66 -20 Q-64 -40 -48 -42 Q-34 -50 -20 -42 Q-4 -42 -2 -20 Q-30 -4 -66 -20Z" fill="#5B4636" stroke="#3F2F24" stroke-width="1"/>
    ${[[-50, -34], [-36, -42], [-20, -34], [-30, -26]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="#7A604B"/>`).join('')}
    ${wormFace(-35, -58, 'squint')}
    <path d="M76 -60 q4 -4 2 -10 M82 -54 q6 -2 6 -8" stroke="#3B1A10" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <path d="M-12 -94 q6 -4 12 0 M4 -98 q6 -3 10 1" stroke="#3B1A10" stroke-width="1.4" fill="none" stroke-linecap="round"/>`,
  'worm-happy': () => `
    <path d="M-104 -6 Q-100 -32 -40 -34 Q30 -38 90 -28 Q108 -20 102 -4 Q60 4 0 2 Q-70 4 -104 -6Z" fill="#6B5444" stroke="#4B3A2E" stroke-width="1"/>
    <path d="M-80 -18 Q-50 -26 -20 -20 M30 -24 Q60 -28 84 -20" stroke="#8FA3B8" stroke-width="1.6" fill="none" opacity="0.8"/>
    ${[[-100, 2], [92, 4], [70, 8]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="2.6" fill="#6B5444"/>`).join('')}
    ${wormTube('M-24 -82 L-24 -30 Q-22 -16 6 -20 Q46 -26 66 -24 Q80 -22 78 -36', 32, [[-24, -40, 0], [-24, -52, 0], [12, -21, 1.5], [30, -23, 1.5], [48, -24, 1.5], [66, -25, 1.3]])}
    <path d="M-60 -18 Q-44 -22 -30 -17 Q-12 -13 6 -18 Q26 -22 44 -17 Q62 -13 86 -18 L100 -8 Q60 2 0 0 Q-60 2 -84 -8Z" fill="#6B5444"/>
    <path d="M-44 -14 Q-24 -8 -4 -14 M14 -15 Q34 -9 56 -13" stroke="#8FA3B8" stroke-width="1.4" fill="none" opacity="0.8"/>
    <ellipse cx="-24" cy="-17" rx="24" ry="3.6" fill="none" stroke="#A8B8C8" stroke-width="1.2" opacity="0.7"/>
    ${wormFace(-24, -74, 'happy')}`,
};

const DRAW = { ...ANTS, ...HOPPERS, ...WORMS };
/** Tỉ lệ rộng / cao của từng hình (như tờ mẫu cũ) để cảnh đã xếp không bị xô. */
const BOX = {
  'ant-carry': 0.92, 'ant-talk': 0.77, 'ant-think': 0.59, 'ant-wipe': 0.68,
  'grasshopper-jump': 0.8, 'grasshopper-stand': 1.0, 'grasshopper-talk': 0.76,
  'worm-dig': 1.91, 'worm-grumpy': 1.76, 'worm-happy': 2.12,
};

export const CRITTERS = Object.keys(DRAW);

export function critter(x, y, name, { h = 120, flip = false } = {}) {
  const draw = DRAW[name];
  if (!draw) { console.warn('[tv3] chưa có hình con vật:', name); return ''; }
  const k = +(h / 100).toFixed(3);
  return `<g transform="translate(${x} ${y}) scale(${flip ? -k : k} ${k})">${draw()}</g>`;
}

export { BOX as CRITTER_BOX };
