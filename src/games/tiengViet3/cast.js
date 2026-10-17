/**
 * Nhân vật dùng chung cho tranh / phim Tiếng Việt 3, vẽ lại bằng SVG theo tờ mẫu nhân vật của nhóm
 * (Linh, Nam, Minh, Tùn, Mai, cô Hương, chị Hằng): màu phẳng, viền nâu mảnh, đầu to mắt tròn.
 * Các nhân vật thêm sau (bố, mẹ, bà, thầy, bác bảo vệ, Trạng Lường…) giữ đúng kiểu vẽ đó.
 *
 * person(x, y, ai, dáng, { s, flip, prop, color, mood }) → chuỗi <g>; (x, y) là chỗ bàn chân chạm đất.
 *   Dáng: stand · wave (vẫy tay) · raise (giơ một tay, cầm prop) · lookUp (ngẩng nhìn trời) ·
 *         walk (đi, đeo cặp) · hold (ôm đồ trước ngực, prop: book · pillow · gift · basket · award · slab) ·
 *         float (chị Hằng bay) · point (chỉ tay sang bên) · clap (vỗ tay / chắp tay trước ngực) ·
 *         cheer (giơ hai tay reo) · give (đưa đồ sang bên, cầm prop) · cane (chống gậy) ·
 *         dig (hai tay cầm cuốc / xẻng, prop hoe · shovel) · sit (ngồi xếp bằng) · run (chạy)
 *   prop ở tay phải: lantern (màu color) · stick · cane · rose · bouquet · bundle (tay nải) · bottle (bình tưới) ·
 *         paper (tranh vẽ) · pencil · ruler · fan · needle · bowl · flag · scissors · hoe · shovel
 *   mood: happy (mặc định) · joy (cười híp mắt) · sad · cry (khóc, có nước mắt) · shut (nhắm mắt) ·
 *         wow (ngạc nhiên) · shy (đỏ mặt) · sleep
 *   flip: quay sang trái (dáng walk/run mặc định đi sang phải).
 * Chiều cao: trẻ em ≈ 122 đơn vị, người lớn ≈ 165 (nhân với s). Dáng sit thấp hơn ≈ 24 / 38.
 *
 * lying(x, y, ai, { s, mood, blanket }) → người nằm trên gối, đắp chăn (đầu ở bên trái, (x, y) là giữa mép dưới).
 */

const LINE = '#6B4A3A';   // viền nâu mảnh như tranh mẫu
const SKIN = '#FADCC4';
const HAIR = '#1F1716';
const NAVY = '#1E3A6E';
const RED = '#E11D2A';
const GREY = '#D6D3D1';

export const CAST = {
  linh: { hair: 'pigtails', top: 'uniform', shirt: '#FFFFFF', bottom: 'skirt', bottomC: NAVY, shoe: '#F28AB2', bag: '#F4A6C3' },
  nam: { hair: 'neat', top: 'uniform', shirt: '#FFFFFF', bottom: 'shorts', bottomC: NAVY, shoe: '#3B6FD8', bag: '#4F7FD9' },
  minh: { hair: 'spiky', top: 'uniform', shirt: '#4A8FE0', collarC: '#3D7CCB', bottom: 'shorts', bottomC: '#1E2F5A', shoe: '#3368D6', bag: '#F59E0B' },
  tun: { hair: 'bowl', top: 'tee', shirt: '#4CAF50', bottom: 'shorts', bottomC: '#C9A97C', shoe: '#3C8A4A', chubby: true, joy: true, bag: '#EF4444', emblem: true },
  mai: { hair: 'bob', top: 'dress', shirt: '#FCD34D', shoe: '#F5F5F4', bag: '#A78BFA' },
  coHuong: { adult: true, hair: 'ponytail', top: 'aodai', shirt: '#CDB0EA', shoe: '#FFFFFF' },
  chiHang: { adult: true, hair: 'bun', top: 'gown', shirt: '#F7A8C8' },

  // Trẻ em thêm
  bon: { hair: 'neat', top: 'tee', shirt: '#FB923C', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#2563EB', bag: '#2563EB' },          // T3 Bon
  coBe: { hair: 'braid', top: 'blouse', shirt: '#B7835A', bottom: 'pants', bottomC: '#3F3A36', shoe: '#7C5A3A', bag: '#A16207' },       // T4 cô bé hiếu thảo
  aia: { hair: 'bob', top: 'tee', shirt: '#F9A8D4', bottom: 'skirt', bottomC: '#7C3AED', shoe: '#F472B6', bag: '#F472B6' },             // T6 A-i-a
  tetsuo: { hair: 'spiky', top: 'tee', shirt: '#38BDF8', bottom: 'shorts', bottomC: '#334155', shoe: '#0EA5E9', bag: '#0EA5E9' },       // T6 Tét-su-ô
  na: { hair: 'ponytail', top: 'uniform', shirt: '#FFFFFF', bottom: 'skirt', bottomC: NAVY, shoe: '#FB7185', bag: '#FB7185' },          // T9 Na
  lan: { hair: 'pigtails', top: 'dress', shirt: '#A7F3D0', shoe: '#F5F5F4', bag: '#34D399' },                                            // bạn gái khác
  chau: { hair: 'bob', top: 'blouse', shirt: '#FDE68A', bottom: 'pants', bottomC: '#57534E', shoe: '#78716C', bag: '#A16207' },         // T10 cháu ("tôi")
  beGai: { hair: 'pigtails', top: 'dress', shirt: '#BFDBFE', shoe: '#F5F5F4', bag: '#93C5FD' },                                          // T11 bé gái mua hoa
  conTrai: { hair: 'spiky', top: 'tee', shirt: '#FACC15', bottom: 'shorts', bottomC: '#475569', shoe: '#64748B', bag: '#64748B' },     // T12 cậu con trai
  cun: { hair: 'bowl', top: 'tee', shirt: '#93C5FD', bottom: 'shorts', bottomC: '#1E40AF', shoe: '#3B82F6', bag: '#3B82F6' },          // T13 Cún
  thao: { hair: 'braid', top: 'tee', shirt: '#F472B6', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#EC4899', bag: '#EC4899' },         // T17 Thảo
  ti: { hair: 'bob', top: 'blouse', shirt: '#86EFAC', bottom: 'pants', bottomC: '#44403C', shoe: '#78716C', bag: '#16A34A' },           // T17 cái Tí
  // Trẻ em dân tộc Mông (T8): áo chàm viền thổ cẩm; bạn gái váy xếp li, khăn đội đầu
  sua: { hair: 'neat', top: 'ethnic', shirt: '#1E2A4A', trim: ['#E11D48', '#FACC15', '#22C55E'], bottom: 'pants', bottomC: '#1E2A4A', shoe: '#44403C', hat: 'skullcap' },
  mua: { hair: 'braid', top: 'ethnic', shirt: '#1E2A4A', trim: ['#EC4899', '#FACC15', '#38BDF8'], bottom: 'pleats', bottomC: '#1E2A4A', shoe: '#44403C', hat: 'scarf' },
  cho: { hair: 'bowl', top: 'ethnic', shirt: '#26324F', trim: ['#F97316', '#22C55E', '#FACC15'], bottom: 'pants', bottomC: '#26324F', shoe: '#44403C', hat: 'skullcap' },

  // Người lớn thêm
  bo: { adult: true, hair: 'short', top: 'shirt', shirt: '#60A5FA', bottom: 'pants', bottomC: '#334155', shoe: '#44403C' },             // bố
  me: { adult: true, hair: 'ponytail', top: 'blouse', shirt: '#F9A8D4', bottom: 'pants', bottomC: '#475569', shoe: '#F5F5F4' },         // mẹ
  meNgheo: { adult: true, hair: 'bun', top: 'blouse', shirt: '#A47551', bottom: 'pants', bottomC: '#292524', shoe: '#57534E' },          // T4 người mẹ
  ba: { adult: true, old: true, hair: 'bun', hairC: '#E7E5E4', top: 'blouse', shirt: '#8B5E3C', bottom: 'pants', bottomC: '#1C1917', shoe: '#57534E' }, // bà
  baTien: { adult: true, old: true, hair: 'bun', hairC: '#F5F5F4', top: 'gown', shirt: '#FDE68A', shoe: '#FFFFFF' },                  // bà tiên hiện hình
  thay: { adult: true, hair: 'short', top: 'shirt', shirt: '#FFFFFF', tie: '#1D4ED8', bottom: 'pants', bottomC: '#1F2937', shoe: '#1C1917', glasses: true }, // thầy giáo
  baoVe: { adult: true, hair: 'short', top: 'shirt', shirt: '#A3A86B', bottom: 'pants', bottomC: '#5B5F3A', shoe: '#1C1917', hat: 'cap', moustache: true }, // bác bảo vệ
  chu: { adult: true, hair: 'short', top: 'jacket', shirt: '#475569', inner: '#FFFFFF', bottom: 'pants', bottomC: '#1F2937', shoe: '#1C1917' }, // T11 người đàn ông
  ongTrang: { adult: true, hair: 'short', top: 'robe', shirt: '#B91C1C', trimC: '#FACC15', shoe: '#1C1917', hat: 'mandarin', beard: true }, // Lương Thế Vinh
  suThan: { adult: true, hair: 'short', top: 'robe', shirt: '#1D4ED8', trimC: '#FDE68A', shoe: '#1C1917', hat: 'envoy', beard: true, moustache: true }, // sứ thần
  linhLe: { adult: true, hair: 'short', top: 'blouse', shirt: '#B45309', bottom: 'pants', bottomC: '#78350F', shoe: '#44403C', hat: 'conical' }, // người lính / dân phu
  giaLang: { adult: true, old: true, hair: 'short', hairC: '#E7E5E4', top: 'ethnic', shirt: '#1F2937', trim: ['#DC2626', '#F8FAFC', '#DC2626'], bottom: 'pants', bottomC: '#1F2937', shoe: '#44403C', beard: true }, // già làng Tây Nguyên
  traiLang: { adult: true, hair: 'short', top: 'ethnic', shirt: '#292524', trim: ['#DC2626', '#FACC15', '#DC2626'], bottom: 'pants', bottomC: '#292524', shoe: '#44403C' },
  gaiLang: { adult: true, hair: 'bun', top: 'ethnic', shirt: '#292524', trim: ['#DC2626', '#F8FAFC', '#FACC15'], bottom: 'longskirt', bottomC: '#1F2937', shoe: '#44403C' },
  hangXom: { adult: true, hair: 'bun', top: 'blouse', shirt: '#86EFAC', bottom: 'pants', bottomC: '#292524', shoe: '#57534E', hat: 'conical' }, // bà con hàng xóm
  khach: { adult: true, hair: 'ponytail', top: 'blouse', shirt: '#C4B5FD', bottom: 'pants', bottomC: '#334155', shoe: '#F5F5F4' },     // mẹ / khách khác
};

const KID = { sh: -80, bot: -50, waist: -56, hipY: -44, ankle: -6, cy: -101, k: 1, up: 18, fore: 17, sitDy: 24 };
const ADULT = { sh: -128, bot: -96, waist: -96, hipY: -84, ankle: -6, cy: -144, k: 0.875, up: 24, fore: 22, sitDy: 38 };

const rad = (a) => a * Math.PI / 180;
const f = (n) => +n.toFixed(1);
/** Điểm cách (x, y) một đoạn len theo góc a (0 = thẳng xuống, 90 = ra ngoài phía side, 180 = thẳng lên). */
const go = (x, y, len, a, side) => [f(x + side * Math.sin(rad(a)) * len), f(y + Math.cos(rad(a)) * len)];

const ARMS = {
  stand: { R: [12, 6], L: [12, 6] },
  wave: { R: [122, 170], L: [12, 6], open: true },
  raise: { R: [158, 178], L: [14, 8], open: true },
  lookUp: { R: [14, 4], L: [14, 4], open: true, look: true },
  walk: { R: [-14, -6], L: [22, 30] },
  run: { R: [-40, -110], L: [50, 120], open: true },
  hold: { R: [14, -118], L: [14, -118] },
  float: { R: [68, 96], L: [68, 96], open: true },
  point: { R: [84, 92], L: [12, 6], open: true, hand: 'open' },
  clap: { R: [20, -115], L: [20, -115], hand: 'open' },
  cheer: { R: [150, 170], L: [150, 170], open: true, hand: 'open' },
  give: { R: [62, 84], L: [12, 6], open: true },
  cane: { R: [22, 14], L: [12, 6] },
  dig: { R: [24, -60], L: [30, -40] },
  sit: { R: [24, -70], L: [24, -70] },
};

const LONG_TOPS = ['aodai', 'gown', 'robe', 'blouse', 'ethnic', 'jacket'];

function arm(G, c, side, [a1, a2], { sleeveLong, hand = 'fist' }) {
  const sx = side * (c.chubby ? 16 : G === ADULT ? 13 : 14);
  const sy = G.sh + 4;
  const [ex, ey] = go(sx, sy, G.up, a1, side);
  const [hx, hy] = go(ex, ey, G.fore, a2, side);
  const d = `M${sx} ${sy} L${ex} ${ey} L${hx} ${hy}`;
  const wide = c.top === 'robe' ? 4 : 0;
  const sleeve = sleeveLong
    ? `<path d="${d}" stroke="${LINE}" stroke-width="${10.4 + wide}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
       <path d="${d}" stroke="${c.shirt}" stroke-width="${8.6 + wide}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
       ${c.trim || c.trimC ? (() => { const [cx, cy] = go(ex, ey, G.fore - 4, a2, side); return `<path d="M${cx} ${cy} L${hx} ${hy}" stroke="${c.trimC || c.trim[0]}" stroke-width="${8.6 + wide}" stroke-linecap="butt"/>`; })() : ''}`
    : (() => {
      const [px, py] = go(sx, sy, c.top === 'dress' ? 6 : 9, a1, side);
      const w = c.top === 'dress' ? 12.5 : G === ADULT ? 11 : 10;
      return `<path d="M${sx} ${sy} L${px} ${py}" stroke="${LINE}" stroke-width="${w + 1.8}" stroke-linecap="round"/>
        <path d="M${sx} ${sy} L${px} ${py}" stroke="${c.shirt}" stroke-width="${w}" stroke-linecap="round"/>`;
    })();
  const skin = sleeveLong ? '' : `<path d="${d}" stroke="${LINE}" stroke-width="7.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${d}" stroke="${SKIN}" stroke-width="5.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const handSvg = hand === 'open'
    ? `<g transform="translate(${hx} ${hy}) rotate(${side * (180 - a2)})">
        ${[-3.2, -1.1, 1.1, 3.2].map((x, i) => `<rect x="${x - 1.1}" y="${-8 + Math.abs(i - 1.5)}" width="2.2" height="6" rx="1.1" fill="${SKIN}" stroke="${LINE}" stroke-width="0.7"/>`).join('')}
        <ellipse cx="0" cy="0" rx="4.4" ry="4" fill="${SKIN}" stroke="${LINE}" stroke-width="0.9"/>
        <ellipse cx="${-side * 4.5}" cy="-1" rx="1.3" ry="2.8" fill="${SKIN}" stroke="${LINE}" stroke-width="0.7" transform="rotate(${-side * 30} ${-side * 4.5} -1)"/>
      </g>`
    : `<circle cx="${hx}" cy="${hy}" r="${G === ADULT ? 3.8 : 3.6}" fill="${SKIN}" stroke="${LINE}" stroke-width="0.9"/>`;
  return { svg: skin + sleeve + handSvg, hand: [hx, hy] };
}

/** Chân trần (quần soóc / váy) hoặc ống quần dài (bottom 'pants'). */
function leg(c, G, side, a, walking) {
  const hx = side * (c.chubby ? 8 : G === ADULT ? 8 : 6);
  const top = G.hipY;
  const len = G.ankle - top;
  const [ax, ay] = go(hx, top, len, a, 1);
  const dir = walking ? 1 : side * 0.3;
  if (c.bottom === 'pants') {
    const w = G === ADULT ? 12 : 9;
    const d = `M${hx} ${top - 6} L${ax} ${ay - 2}`;
    return `<path d="${d}" stroke="${LINE}" stroke-width="${w + 1.8}" stroke-linecap="round"/>
      <path d="${d}" stroke="${c.bottomC}" stroke-width="${w}" stroke-linecap="round"/>
      ${shoe(ax, ay, dir, c.shoe)}`;
  }
  const d = `M${hx} ${top} L${ax} ${ay}`;
  const [sx, sy] = go(ax, ay, -7, a, 1);
  return `<path d="${d}" stroke="${LINE}" stroke-width="${c.chubby ? 9.6 : 8}" stroke-linecap="round"/>
    <path d="${d}" stroke="${SKIN}" stroke-width="${c.chubby ? 7.8 : 6.2}" stroke-linecap="round"/>
    <path d="M${ax} ${ay} L${sx} ${sy}" stroke="${LINE}" stroke-width="8.2" stroke-linecap="round"/>
    <path d="M${ax} ${ay} L${sx} ${sy}" stroke="${c.bottom === 'pleats' ? c.bottomC : '#fff'}" stroke-width="6.6" stroke-linecap="round"/>
    ${shoe(ax, ay, dir, c.shoe)}`;
}

/** Ngồi xếp bằng: hai đùi chéo ra hai bên, bàn chân bắt chéo giữa (toạ độ sau khi đã hạ người). */
function sitLegs(c, G) {
  const hip = G.hipY + G.sitDy;
  const kx = G === ADULT ? 28 : 19;
  const bare = c.bottom !== 'pants' && c.bottom !== 'longskirt';
  const col = bare ? SKIN : c.bottomC;
  const w = G === ADULT ? 12 : c.chubby ? 9.6 : 8.5;
  return [-1, 1].map(s => {
    const d = `M${s * 6} ${hip} L${s * kx} -9 L${-s * 3} -4`;
    return `<path d="${d}" stroke="${LINE}" stroke-width="${w + 1.8}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="${-s * 5}" cy="-4" rx="5.5" ry="3" fill="${c.shoe || '#fff'}" stroke="${LINE}" stroke-width="0.9"/>`;
  }).join('');
}

function shoe(x, y, dir, color) {
  return `<g transform="translate(${x} ${y + 4})">
    <ellipse cx="${f(dir * 2)}" cy="1.6" rx="6.4" ry="2.6" fill="${color}" stroke="${LINE}" stroke-width="0.9"/>
    <ellipse cx="${f(dir * 1.6)}" cy="-0.6" rx="4.6" ry="2.6" fill="#fff" stroke="${LINE}" stroke-width="0.8"/>
    <path d="M${f(dir * 2 - 4.6)} -0.4 Q${f(dir * 2)} -3.4 ${f(dir * 2 + 4.6)} -0.4" stroke="${color}" stroke-width="2.4" fill="none"/>
  </g>`;
}

/** Dải hoa văn thổ cẩm ngang (y, nửa bề rộng hw). */
function trimBand(c, y, hw, h = 5) {
  const t = c.trim || ['#DC2626', '#FACC15', '#22C55E'];
  return `<rect x="${-hw}" y="${y}" width="${hw * 2}" height="${h}" fill="${t[0]}"/>
    <path d="M${-hw} ${y + h / 2} ${Array.from({ length: Math.ceil(hw / 3) }, (_, i) => `L${-hw + i * 6 + 3} ${y + (i % 2 ? h - 1 : 1)} L${-hw + i * 6 + 6} ${y + h / 2}`).join(' ')}" stroke="${t[1]}" stroke-width="1.1" fill="none"/>
    <rect x="${-hw}" y="${y + h}" width="${hw * 2}" height="1.6" fill="${t[2]}"/>`;
}

function lowerBody(c, G) {
  const w = c.chubby ? 17 : G === ADULT ? 18 : 15;
  if (c.bottom === 'skirt') {
    return `<path d="M-14 ${G.waist} H14 L22 -28 Q0 -24 -22 -28Z" fill="${c.bottomC}" stroke="${LINE}" stroke-width="1"/>
       <path d="M-5 -52 L-7 -27 M5 -52 L7 -27" stroke="#14294F" stroke-width="0.9" opacity="0.6"/>`;
  }
  if (c.bottom === 'pleats') {
    return `<path d="M-14 ${G.waist} H14 L24 -26 Q0 -21 -24 -26Z" fill="${c.bottomC}" stroke="${LINE}" stroke-width="1"/>
      ${[-16, -9, -2, 5, 12].map(x => `<path d="M${x / 1.6} ${G.waist + 2} L${x + 3} -26" stroke="#475569" stroke-width="0.8"/>`).join('')}
      <path d="M-22 -34 Q0 -30 22 -34 L24 -26 Q0 -21 -24 -26Z" fill="${(c.trim || [])[0] || '#E11D48'}"/>
      <path d="M-21 -31 Q0 -27 21 -31" stroke="${(c.trim || [])[1] || '#FACC15'}" stroke-width="1.6" fill="none"/>`;
  }
  if (c.bottom === 'longskirt') {
    return `<path d="M-15 ${G.waist} H15 L19 -4 Q0 0 -19 -4Z" fill="${c.bottomC}" stroke="${LINE}" stroke-width="1"/>
      ${trimBand(c, -26, 18.5, 6)}`;
  }
  if (c.bottom === 'pants') {
    const crotch = G === ADULT ? -72 : -40;
    return `<path d="M${-w + 1} ${G.waist} H${w - 1} L${w} ${crotch} H${-w}Z" fill="${c.bottomC}" stroke="${LINE}" stroke-width="1"/>`;
  }
  return `<path d="M${-w + 1} ${G.waist} H${w - 1} L${w + 1} -32 H2.5 L0 -42 L-2.5 -32 H${-w - 1}Z" fill="${c.bottomC}" stroke="${LINE}" stroke-width="1"/>`;
}

function torso(c, G) {
  const { sh, bot } = G;
  const w = c.chubby ? 17 : G === ADULT ? 18 : 15;
  if (c.top === 'aodai') {
    return `<path d="M-12 -96 L-16 -3 H-2 L0 -50 L2 -3 H16 L12 -96Z" fill="#FFFFFF" stroke="${LINE}" stroke-width="1"/>
      <path d="M-13 ${sh} Q0 ${sh - 3} 13 ${sh} L11 -98 Q13 -90 13 -84 L15 -24 Q0 -20 -15 -24 L-13 -84 Q-13 -90 -11 -98Z" fill="${c.shirt}" stroke="${LINE}" stroke-width="1"/>
      <path d="M-13 -84 L-12 -40 M13 -84 L12 -40" stroke="#A98BCB" stroke-width="0.9"/>
      ${[[-6, -110], [-3, -104], [-8, -100], [5, -70], [8, -64], [4, -60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.5" fill="#9F7AC6"/>`).join('')}
      <rect x="-5" y="${sh - 5}" width="10" height="6" rx="2" fill="${c.shirt}" stroke="${LINE}" stroke-width="0.9"/>`;
  }
  if (c.top === 'gown') {
    return `<path d="M-10 -96 L-32 -4 Q0 4 32 -4 L10 -96Z" fill="#FCE7F3" stroke="${LINE}" stroke-width="1"/>
      <path d="M-11 -96 L-26 -8 Q-8 -2 -2 -6 L0 -60 L2 -6 Q8 -2 26 -8 L11 -96Z" fill="${c.shirt}" stroke="${LINE}" stroke-width="1"/>
      <path d="M-12 ${sh} Q0 ${sh - 3} 12 ${sh} L10 -96 H-10Z" fill="${c.shirt}" stroke="${LINE}" stroke-width="1"/>
      <path d="M-11 -98 H11" stroke="#FDE047" stroke-width="3"/>
      <path d="M-4 ${sh - 1} L0 ${sh + 8} L4 ${sh - 1}" fill="#FCE7F3" stroke="${LINE}" stroke-width="0.8"/>`;
  }
  if (c.top === 'robe') {
    // Áo thụng quan lại: dài chạm đất, đai lưng, miếng bổ tử trước ngực
    return `<path d="M-15 ${sh} Q0 ${sh - 3} 15 ${sh} L18 -96 L30 -4 Q0 2 -30 -4 L-18 -96Z" fill="${c.shirt}" stroke="${LINE}" stroke-width="1"/>
      <path d="M-28 -12 Q0 -6 28 -12" stroke="${c.trimC}" stroke-width="3" fill="none"/>
      <path d="M-6 ${sh - 1} L0 ${sh + 12} L6 ${sh - 1}" fill="#FFF7ED" stroke="${LINE}" stroke-width="0.8"/>
      <path d="M0 ${sh + 12} L-14 -60" stroke="${LINE}" stroke-width="0.8" opacity="0.6"/>
      <rect x="-9" y="${sh + 14}" width="18" height="16" fill="${c.trimC}" stroke="${LINE}" stroke-width="0.8"/>
      <circle cx="0" cy="${sh + 22}" r="4.5" fill="none" stroke="${c.shirt}" stroke-width="1.4"/>
      <rect x="-19" y="-96" width="38" height="6" rx="2" fill="${c.trimC}" stroke="${LINE}" stroke-width="0.8"/>`;
  }
  if (c.top === 'dress') {
    return `<path d="M-14 ${sh} Q0 ${sh - 3} 14 ${sh} L15 -62 L25 -30 Q0 -25 -25 -30 L-15 -62Z" fill="${c.shirt}" stroke="${LINE}" stroke-width="1"/>
      <path d="M-15 -63 Q0 -60 15 -63" stroke="#E8B923" stroke-width="1.4" fill="none"/>
      <path d="M-5 ${sh - 1} Q0 ${sh + 4} 5 ${sh - 1}" fill="${SKIN}" stroke="${LINE}" stroke-width="0.8"/>
      ${[[-7, -72, '#F87171'], [0, -70, '#60A5FA'], [7, -72, '#F87171']].map(([x, y, col]) => `<circle cx="${x}" cy="${y}" r="2" fill="${col}"/><path d="M${x - 2} ${y + 3} q2 -1 4 0" stroke="#22C55E" stroke-width="1" fill="none"/>`).join('')}`;
  }
  const bottom = lowerBody(c, G);
  if (c.top === 'blouse') {
    // Áo bà ba: dài qua hông, xẻ tà hai bên, hàng cúc giữa
    const hem = G === ADULT ? -74 : -40;
    return bottom + `<path d="M${-w} ${sh} Q0 ${sh - 3} ${w} ${sh} L${w + 2} ${hem} H${w - 4} L${w - 4} ${hem + 5} Q0 ${hem + 7} ${-w + 4} ${hem + 5} L${-w + 4} ${hem} H${-w - 2}Z" fill="${c.shirt}" stroke="${LINE}" stroke-width="1"/>
      <path d="M-5 ${sh - 1} Q0 ${sh + 5} 5 ${sh - 1}" fill="${SKIN}" stroke="${LINE}" stroke-width="0.8"/>
      <path d="M0 ${sh + 4} V${hem + 5}" stroke="${LINE}" stroke-width="0.7" opacity="0.6"/>
      ${[0, 1, 2, 3].map(i => `<circle cx="1.8" cy="${f(sh + 9 + i * (hem - sh) / 4.4)}" r="1.1" fill="#FEF3C7" stroke="${LINE}" stroke-width="0.5"/>`).join('')}`;
  }
  if (c.top === 'ethnic') {
    const hem = G === ADULT ? -86 : -46;
    return bottom + `<path d="M${-w} ${sh} Q0 ${sh - 3} ${w} ${sh} L${w + 1} ${hem} Q0 ${hem + 3} ${-w - 1} ${hem}Z" fill="${c.shirt}" stroke="${LINE}" stroke-width="1"/>
      <path d="M-5 ${sh - 1} Q0 ${sh + 5} 5 ${sh - 1}" fill="${SKIN}" stroke="${LINE}" stroke-width="0.8"/>
      <path d="M-4 ${sh + 3} L-8 ${hem} M4 ${sh + 3} L8 ${hem}" stroke="${c.trim[0]}" stroke-width="3"/>
      <path d="M-4 ${sh + 3} L-8 ${hem} M4 ${sh + 3} L8 ${hem}" stroke="${c.trim[1]}" stroke-width="1" stroke-dasharray="2 2"/>
      ${trimBand(c, hem - 7, w + 0.5, 5)}`;
  }
  const shirtBot = G === ADULT && c.bottom === 'pants' ? -86 : bot;
  const shirt = `<path d="M${-w} ${sh} Q0 ${sh - 3} ${w} ${sh} L${w - 1} ${shirtBot} Q0 ${shirtBot + 2} ${-w + 1} ${shirtBot}Z" fill="${c.shirt}" stroke="${LINE}" stroke-width="1"/>`;
  if (c.top === 'tee') {
    return bottom + shirt + `<path d="M-5 ${sh - 1} Q0 ${sh + 4} 5 ${sh - 1}" fill="${SKIN}" stroke="${LINE}" stroke-width="0.8"/>
      ${c.emblem ? `<g transform="translate(0 ${sh + 14})"><circle r="6.5" fill="#FB923C" stroke="${LINE}" stroke-width="0.8"/>
        <circle cx="-5" cy="-5" r="2.2" fill="#FB923C" stroke="${LINE}" stroke-width="0.7"/><circle cx="5" cy="-5" r="2.2" fill="#FB923C" stroke="${LINE}" stroke-width="0.7"/>
        <ellipse cy="2.4" rx="3.4" ry="2.4" fill="#FFF7ED"/><circle cx="-2.4" cy="-1" r="0.9" fill="${HAIR}"/><circle cx="2.4" cy="-1" r="0.9" fill="${HAIR}"/>
        <path d="M-1 -5.5 v2 M1 -5.5 v2 M-6 0 h2 M6 0 h-2" stroke="${HAIR}" stroke-width="0.8"/></g>`
        : `<path d="M${-w + 2} ${sh + 16} H${w - 2}" stroke="#fff" stroke-width="2.4" opacity="0.7"/>`}`;
  }
  if (c.top === 'shirt' || c.top === 'jacket') {
    // Sơ mi cổ bẻ (bố, thầy, bác bảo vệ); jacket: áo khoác ngoài, sơ mi trắng bên trong
    const col = c.top === 'jacket' ? c.inner : c.shirt;
    return bottom + shirt + `
      ${c.top === 'jacket' ? `<path d="M-6 ${sh} L0 ${sh + 22} L6 ${sh} Z" fill="${c.inner}" stroke="${LINE}" stroke-width="0.8"/>
        <path d="M-6 ${sh} L-2 ${sh + 26} L-8 ${sh + 20} Z M6 ${sh} L2 ${sh + 26} L8 ${sh + 20} Z" fill="${c.shirt}" stroke="${LINE}" stroke-width="0.8"/>` : ''}
      <path d="M0 ${sh + 4} L-9 ${sh - 1} L-7 ${sh + 8}Z M0 ${sh + 4} L9 ${sh - 1} L7 ${sh + 8}Z" fill="${col}" stroke="${LINE}" stroke-width="0.9"/>
      ${c.tie ? `<path d="M-2 ${sh + 4} H2 L3.5 ${sh + 26} L0 ${sh + 30} L-3.5 ${sh + 26}Z" fill="${c.tie}" stroke="${LINE}" stroke-width="0.7"/>`
        : `<path d="M0 ${sh + 5} V${shirtBot}" stroke="${LINE}" stroke-width="0.6" opacity="0.5"/>`}
      ${c.top === 'shirt' && !c.tie ? `<rect x="${w - 11}" y="${sh + 10}" width="7" height="7" rx="1" fill="none" stroke="${LINE}" stroke-width="0.7" opacity="0.6"/>` : ''}
      ${G === ADULT && c.bottom === 'pants' ? `<rect x="${-w + 1}" y="-88" width="${(w - 1) * 2}" height="3.4" fill="#1C1917" opacity="0.7"/>` : ''}`;
  }
  // Áo đồng phục: cổ bẻ + khăn quàng đỏ (Minh: áo xanh cùng kiểu)
  const col = c.collarC || '#F1F5F9';
  return bottom + shirt + `
    <path d="M-1 -51 V${sh + 4}" stroke="${LINE}" stroke-width="0.6" opacity="0.5"/>
    <path d="M-6 ${sh - 1} Q0 ${sh + 3} 6 ${sh - 1} L4 ${sh + 2} Q0 ${sh + 5} -4 ${sh + 2}Z" fill="${RED}" stroke="${LINE}" stroke-width="0.8"/>
    <path d="M0 ${sh + 3} L-10 ${sh - 1} L-8 ${sh + 7}Z M0 ${sh + 3} L10 ${sh - 1} L8 ${sh + 7}Z" fill="${col}" stroke="${LINE}" stroke-width="0.9"/>
    <path d="M-1.5 ${sh + 5} L-6 ${sh + 21} L-2 ${sh + 19} L0 ${sh + 7} L2 ${sh + 19} L6 ${sh + 21} L1.5 ${sh + 5}Z" fill="${RED}" stroke="${LINE}" stroke-width="0.8"/>
    <rect x="-3" y="${sh + 2}" width="6" height="5" rx="1.6" fill="${RED}" stroke="${LINE}" stroke-width="0.8"/>`;
}

/** Tóc phía sau (vẽ trước thân): toạ độ đầu chuẩn r = 16, tâm (0, 0). */
function hairBack(c) {
  const H = c.hairC || HAIR;
  switch (c.hair) {
    case 'bob': return `<path d="M-19 13 V-4 C-19 -18 -10 -22 0 -22 C10 -22 19 -18 19 -4 V13 Q15.5 15.5 12 13 V4 H-12 V13 Q-15.5 15.5 -19 13Z" fill="${H}"/>`;
    case 'ponytail': return `<path d="M8 6 C18 12 17 34 10 52 Q6 58 3 53 C8 36 8 20 2 12Z" fill="${H}" stroke="${LINE}" stroke-width="0.6"/>`;
    case 'bun': return c.old ? '' : `<path d="M-17 -2 C-21 20 -19 40 -14 56 Q0 60 14 56 C19 40 21 20 17 -2Z" fill="${H}"/>`;
    case 'braid': return `<g>${[0, 1, 2, 3, 4].map(i => `<ellipse cx="${-14 - i * 0.6}" cy="${12 + i * 8}" rx="4.4" ry="5" fill="${H}" stroke="${LINE}" stroke-width="0.5"/>`).join('')}
      <circle cx="-17.5" cy="52" r="2.4" fill="#EF4444"/></g>`;
    default: return '';
  }
}

function hairFront(c) {
  const H = c.hairC || HAIR;
  const cap = (fringe) => `<path d="M-16.5 4 C-18.5 -14 -9 -21.5 0 -21.5 C9 -21.5 18.5 -14 16.5 4 ${fringe}Z" fill="${H}"/>`;
  const shine = `<path d="M-9 -16 Q-3 -19.5 4 -18.5" stroke="${c.hairC ? '#FFFFFF' : '#5B4B4A'}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity="0.8"/>`;
  switch (c.hair) {
    case 'pigtails': return cap('C15 -4 10 -9 4 -7 C2 -9.5 -1 -9.5 -3 -7 C-8 -10 -14 -6 -16.5 4') + shine + `
      ${[-1, 1].map(s => `<path d="M${s * 16} 1 C${s * 24} 2 ${s * 24} 14 ${s * 19} 18 C${s * 17} 12 ${s * 17} 6 ${s * 15} 4Z" fill="${H}"/>
        <circle cx="${s * 16.6}" cy="2" r="2.6" fill="#F472B6" stroke="${LINE}" stroke-width="0.7"/>`).join('')}
      <rect x="5" y="-14" width="7" height="3" rx="1.5" fill="#F472B6" stroke="${LINE}" stroke-width="0.6" transform="rotate(25 8.5 -12.5)"/>`;
    case 'neat': return cap('C15 -6 9 -8 4 -6 C1 -9 -4 -9 -7 -6 C-10 -8 -14 -6 -16.5 4') + shine
      + `<path d="M2 -21 q4 -6 8 -3 q-4 -1 -5 3Z" fill="${H}"/>`;
    case 'short': return cap('C15 -4 12 -10 4 -9 C-2 -12 -10 -8 -14 -6 L-16.5 4') + shine;
    case 'spiky': return `<path d="M-17 4 L-18 -9 L-14 -12 L-16 -19 L-9 -17 L-7 -25 L-2 -19 L2 -26 L5 -19 L11 -24 L11 -16 L18 -17 L15 -10 L17 4 L13 -6 L10 -9 L7 -5 L3 -9 L0 -5 L-4 -9 L-8 -5 L-12 -8Z" fill="${H}"/>`;
    case 'bowl': return `<path d="M-18 4 C-20 -16 -9 -23 0 -23 C9 -23 20 -16 18 4 L16 -3 Q0 -6 -16 -3Z" fill="${H}"/>${shine}`;
    case 'bob': return `<path d="M-16.5 -2 C-17 -15 -9 -21 0 -21 C9 -21 17 -15 16.5 -2 L14 -5 Q0 -7 -14 -5Z" fill="${H}"/>${shine}
      <rect x="7" y="-10" width="7" height="3" rx="1.5" fill="#F472B6" stroke="${LINE}" stroke-width="0.6" transform="rotate(-20 10.5 -8.5)"/>`;
    case 'braid': return cap('C14 -6 7 -11 0 -10 C-7 -11 -14 -6 -16.5 4') + shine
      + `<path d="M-15 2 C-17 6 -16 10 -14 12" stroke="${H}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    case 'ponytail': return cap('C14 -6 8 -12 -2 -10 C-8 -9 -13 -4 -16.5 4') + shine;
    case 'bun': return c.old
      ? cap('C14 -8 6 -12 0 -11 C-6 -12 -14 -8 -16.5 4') + `<circle cx="0" cy="-24" r="7.5" fill="${H}" stroke="#A8A29E" stroke-width="0.8"/>
        <path d="M-6 -12 Q0 -16 6 -12" stroke="#A8A29E" stroke-width="0.8" fill="none"/>`
      : cap('C14 -6 6 -11 0 -9 C-6 -11 -14 -6 -16.5 4') + `
      <circle cx="0" cy="-25" r="8" fill="${H}"/>
      ${c.top === 'gown' ? `<g transform="translate(8 -27)">${[0, 72, 144, 216, 288].map(r => `<ellipse cy="-3" rx="2" ry="3.2" fill="#F9A8D4" stroke="${LINE}" stroke-width="0.5" transform="rotate(${r})"/>`).join('')}<circle r="1.6" fill="#FDE047"/></g>
      <path d="M-6 -30 L-3 -36 M-6 -30 L-9 -35" stroke="#FDE047" stroke-width="1.4" stroke-linecap="round"/>` : ''}`;
    default: return cap('');
  }
}

/** Mũ / khăn (vẽ trên tóc), toạ độ đầu. */
function hat(c) {
  switch (c.hat) {
    case 'mandarin': return `<path d="M-15 -8 C-16 -24 -8 -28 0 -28 C8 -28 16 -24 15 -8Z" fill="#111827"/>
      <path d="M-9 -26 Q0 -36 9 -26Z" fill="#1F2937"/>
      ${[-1, 1].map(s => `<ellipse cx="${s * 24}" cy="-16" rx="10" ry="3.6" fill="#111827" transform="rotate(${s * -14} ${s * 24} -16)"/>`).join('')}
      <path d="M-15 -10 H15" stroke="#FACC15" stroke-width="1.5"/>`;
    case 'envoy': return `<ellipse cx="0" cy="-14" rx="24" ry="5" fill="#111827"/>
      <path d="M-14 -14 C-14 -28 14 -28 14 -14Z" fill="#1F2937"/>
      <circle cx="0" cy="-28" r="3.5" fill="#DC2626"/><path d="M-12 -16 H12" stroke="#DC2626" stroke-width="1.2"/>`;
    case 'cap': return `<path d="M-16 -8 C-17 -22 -8 -26 0 -26 C8 -26 17 -22 16 -8Z" fill="#6B7041" stroke="${LINE}" stroke-width="0.7"/>
      <path d="M-14 -8 Q0 -4 18 -8 Q14 -2 -12 -4Z" fill="#4B4F2C"/><circle cx="0" cy="-17" r="3" fill="#FACC15"/>`;
    case 'scarf': return `<path d="M-18 -4 C-20 -22 -8 -27 0 -27 C8 -27 20 -22 18 -4 Q0 -12 -18 -4Z" fill="${c.trim[0]}" stroke="${LINE}" stroke-width="0.7"/>
      <path d="M-17 -10 Q0 -17 17 -10" stroke="${c.trim[1]}" stroke-width="2" fill="none"/>
      <path d="M-16 -15 Q0 -22 16 -15" stroke="${c.trim[2]}" stroke-width="1.6" fill="none" stroke-dasharray="3 2"/>`;
    case 'skullcap': return `<path d="M-15 -10 C-15 -24 15 -24 15 -10 Q0 -14 -15 -10Z" fill="#111827"/>
      <path d="M-14 -12 Q0 -16 14 -12" stroke="${c.trim[0]}" stroke-width="1.6" fill="none"/><circle cx="0" cy="-22" r="2.6" fill="${c.trim[0]}"/>`;
    case 'conical': return `<path d="M-30 -8 L0 -40 L30 -8 Q0 -2 -30 -8Z" fill="#F5DEB3" stroke="#B08950" stroke-width="1"/>
      <path d="M-20 -13 L0 -40 M-8 -10 L0 -40 M8 -10 L0 -40 M20 -13 L0 -40" stroke="#D6B98A" stroke-width="0.7"/>`;
    default: return '';
  }
}

function face(c, { look, open, dir = 0, adult, mood }) {
  const H = HAIR;
  const ey = look ? -1 : 2;
  const pupY = look ? -1.2 : 0;
  const m = mood || (c.joy && !look ? 'joy' : 'happy');
  let eyes;
  if (m === 'joy') eyes = [-1, 1].map(s => `<path d="M${s * 6 - 3} 3 Q${s * 6} -1 ${s * 6 + 3} 3" stroke="${H}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`).join('');
  else if (m === 'shut' || m === 'sleep' || m === 'cry') eyes = [-1, 1].map(s => `<path d="M${s * 6 - 3} 2 Q${s * 6} ${m === 'cry' ? 0 : 4.5} ${s * 6 + 3} 2" stroke="${H}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`).join('');
  else {
    const big = m === 'wow' ? 1.25 : 1;
    eyes = [-1, 1].map(s => `<ellipse cx="${s * 6 + dir}" cy="${ey}" rx="${(adult ? 1.9 : 2.3) * big}" ry="${(adult ? 2.5 : 2.9) * big}" fill="#2B1D16"/>
        <circle cx="${s * 6 + dir + 0.7}" cy="${ey - 1 + pupY}" r="0.9" fill="#fff"/>`).join('');
  }
  const sadBrow = m === 'sad' || m === 'cry';
  const brows = sadBrow
    ? [-1, 1].map(s => `<path d="M${s * 3} ${ey - 6.5} L${s * 9} ${ey - 4.4}" stroke="${H}" stroke-width="1.1" stroke-linecap="round"/>`).join('')
    : adult || m === 'wow' ? [-1, 1].map(s => `<path d="M${s * 6 - 2.4 * s} ${ey - (m === 'wow' ? 6.4 : 4.6)} Q${s * 6} ${ey - (m === 'wow' ? 7.8 : 5.8)} ${s * 6 + 2.6 * s} ${ey - (m === 'wow' ? 6.2 : 4.4)}" stroke="${H}" stroke-width="0.9" fill="none"/>`).join('') : '';
  let mouth;
  if (m === 'sad') mouth = `<path d="M${-3 + dir} 11 Q${dir} 8.4 ${3 + dir} 11" stroke="#8A3B2E" stroke-width="1.1" fill="none" stroke-linecap="round"/>`;
  else if (m === 'cry') mouth = `<path d="M${-3.6 + dir} 12 Q${dir} 7.6 ${3.6 + dir} 12 Q${dir} 10.6 ${-3.6 + dir} 12Z" fill="#B4363C" stroke="${LINE}" stroke-width="0.7"/>`;
  else if (m === 'wow') mouth = `<ellipse cx="${dir}" cy="10.5" rx="2.2" ry="2.8" fill="#B4363C" stroke="${LINE}" stroke-width="0.7"/>`;
  else if (m === 'sleep') mouth = `<ellipse cx="${dir}" cy="10" rx="1.4" ry="1.1" fill="#B4363C" opacity="0.7"/>`;
  else if (open || mood === 'joy') mouth = `<path d="M${-3.6 + dir} 9 Q${dir} 9.6 ${3.6 + dir} 9 Q${dir} 15 ${-3.6 + dir} 9Z" fill="#B4363C" stroke="${LINE}" stroke-width="0.7"/><path d="M${-1.8 + dir} 12 Q${dir} 10.8 ${1.8 + dir} 12" fill="#F28B95"/>`;
  else mouth = `<path d="M${-3.2 + dir} 9 Q${dir} 12 ${3.2 + dir} 9" stroke="#8A3B2E" stroke-width="1.1" fill="none" stroke-linecap="round"/>`;
  const tears = m === 'cry' ? [-1, 1].map(s => `<path class="sc-tear" d="M${s * 7} 4 q-1.6 3 0 4.6 q1.6 -1.6 0 -4.6Z" fill="#7DD3FC" stroke="#38BDF8" stroke-width="0.5"/>`).join('') : '';
  const cheek = m === 'shy' ? 0.95 : 0.75;
  const wrinkles = c.old ? `<path d="M-13 -0.5 l-2.4 -1 M13 -0.5 l2.4 -1 M-5 -10 q5 -1.5 10 0 M-4 -7.6 q4 -1 8 0" stroke="#C49A82" stroke-width="0.8" fill="none" stroke-linecap="round"/>
    <path d="M-7 8 q-1.4 2 -0.6 4 M7 8 q1.4 2 0.6 4" stroke="#C49A82" stroke-width="0.8" fill="none"/>` : '';
  const beard = (c.beard ? `<path d="M-4 13 Q0 24 4 13 Q0 15 -4 13Z" fill="${c.hairC || '#3B2A22'}"/>` : '')
    + (c.moustache ? `<path d="M-6 8.2 Q-3 6 0 7.6 Q3 6 6 8.2 Q3 9 0 8.4 Q-3 9 -6 8.2Z" fill="${c.hairC || '#3B2A22'}"/>` : '');
  const glasses = c.glasses ? `${[-1, 1].map(s => `<circle cx="${s * 6}" cy="${ey}" r="4.4" fill="#E0F2FE" fill-opacity="0.25" stroke="#334155" stroke-width="0.9"/>`).join('')}<path d="M-1.6 ${ey} H1.6" stroke="#334155" stroke-width="0.9"/>` : '';
  return `${[-1, 1].map(s => `<ellipse cx="${s * 15}" cy="3" rx="3" ry="3.6" fill="${SKIN}" stroke="${LINE}" stroke-width="0.8"/>`).join('')}
    <ellipse cx="0" cy="0" rx="15.2" ry="16" fill="${SKIN}" stroke="${LINE}" stroke-width="1"/>
    ${[-1, 1].map(s => `<ellipse cx="${s * 9.4}" cy="7" rx="${m === 'shy' ? 3.8 : 3}" ry="${m === 'shy' ? 2.2 : 1.7}" fill="#F9A8A8" opacity="${cheek}"/>`).join('')}
    ${wrinkles}${eyes}${brows}${glasses}
    <path d="M${-0.8 + dir} 5.6 q0.8 0.8 1.6 0" stroke="#C98B73" stroke-width="0.9" fill="none"/>
    ${mouth}${beard}${tears}`;
}

function lantern(x, y, color = RED) {
  const pts = Array.from({ length: 10 }, (_, k) => {
    const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? 6.5 : 15;
    return `${f(Math.cos(a) * rr)},${f(Math.sin(a) * rr)}`;
  }).join(' ');
  return `<path d="M${x} ${y} L${x + 9} ${y - 40}" stroke="#B7894A" stroke-width="2.6" stroke-linecap="round"/>
    <g transform="translate(${x + 10} ${y - 52})"><g class="sc-bob" style="--d:${(x % 5) / 2}s">
      <circle r="22" fill="#FDE68A" opacity="0.28"/>
      <polygon points="${pts}" fill="${color}" stroke="#B45309" stroke-width="1.4"/>
      <polygon points="${pts}" fill="none" stroke="#FCD34D" stroke-width="0.8" transform="scale(0.62)"/>
      <circle r="3.4" fill="#FEF3C7"/>
      <path d="M0 13 v8 M-2 14 l-1 7 M2 14 l1 7" stroke="#EAB308" stroke-width="1.2"/>
    </g></g>`;
}

/** Bông hồng đỏ (tâm hoa ở (x, y)). */
export function rose(x, y, s = 1, color = '#E11D48') {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M0 4 Q2 18 -1 30" stroke="#15803D" stroke-width="2" fill="none"/>
    <path d="M0 16 q7 -4 9 0 q-5 4 -9 0Z" fill="#22C55E"/>
    <circle r="6.4" fill="${color}" stroke="#9F1239" stroke-width="0.8"/>
    <path d="M-3.4 -1 Q0 -5 3.4 -1 Q0 3 -3.4 -1Z M-5 1.6 Q0 6 5 1.6" stroke="#9F1239" stroke-width="0.8" fill="none"/>
    <path d="M-5 3 L-3 7 L0 5 L3 7 L5 3" fill="#16A34A"/></g>`;
}

/** Đồ cầm ở tay phải (hx, hy): trả về SVG vẽ đè lên tay. */
function propAt(prop, [hx, hy], color, G) {
  switch (prop) {
    case 'lantern': return lantern(hx, hy, color);
    case 'stick': return `<path d="M${hx - 4} ${hy + 10} L${hx + 8} ${hy - 34}" stroke="#B7894A" stroke-width="2.6" stroke-linecap="round"/>`;
    case 'cane': return `<path d="M${hx} ${hy - 6} Q${hx - 4} ${hy - 10} ${hx - 6} ${hy - 4} M${hx} ${hy - 6} L${hx + 3} 0" stroke="#8B5A2B" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    case 'rose': return rose(hx + 1, hy - 12, 0.9, color);
    case 'bouquet': return `<g transform="translate(${hx} ${hy})"><path d="M-8 -10 L0 14 L8 -10Z" fill="#FDF2F8" stroke="#F9A8D4" stroke-width="1"/>
      ${[[-6, -16], [0, -20], [6, -16], [-3, -11], [4, -10]].map(([x, y]) => rose(x, y, 0.62, color || '#E11D48')).join('')}</g>`;
    case 'bundle': return `<g transform="translate(${hx} ${hy})"><path d="M0 0 L-2 8" stroke="#7C5A3A" stroke-width="1.6"/>
      <path d="M-12 8 Q-2 4 8 8 Q12 22 -2 26 Q-16 22 -12 8Z" fill="${color || '#2563EB'}" stroke="${LINE}" stroke-width="0.9"/>
      <path d="M-9 13 Q-2 10 5 13" stroke="#FDE68A" stroke-width="1.2" fill="none"/></g>`;
    case 'bottle': return `<g transform="translate(${hx} ${hy}) rotate(-35)"><rect x="-4" y="-22" width="12" height="22" rx="4" fill="#BAE6FD" stroke="#0284C7" stroke-width="1"/>
      <rect x="0" y="-27" width="4.6" height="6" rx="1" fill="#0EA5E9"/><path d="M-2 -14 H6" stroke="#0284C7" stroke-width="0.8"/></g>
      ${[0, 1, 2].map(i => `<path class="sc-rain" style="--d:${i * 0.3}s" d="M${hx + 18 + i * 4} ${hy - 10 + i * 2} l1 7" stroke="#38BDF8" stroke-width="1.8" stroke-linecap="round"/>`).join('')}`;
    case 'paper': return `<g transform="translate(${hx} ${hy - 16}) rotate(6)"><rect x="-12" y="-14" width="26" height="20" fill="#fff" stroke="${LINE}" stroke-width="0.9"/>
      <circle cx="6" cy="-8" r="3" fill="#FACC15"/><path d="M-10 4 L-3 -6 L3 2 L7 -2 L12 4Z" fill="#4ADE80"/></g>`;
    case 'pencil': return `<path d="M${hx - 2} ${hy + 4} L${hx + 8} ${hy - 14}" stroke="#FACC15" stroke-width="3.4" stroke-linecap="round"/><path d="M${hx + 8} ${hy - 14} l1.6 -3" stroke="#1F2937" stroke-width="1.6"/>`;
    case 'ruler': return `<g transform="translate(${hx} ${hy}) rotate(-20)"><rect x="-4" y="-2" width="44" height="7" fill="#FDE68A" stroke="#B45309" stroke-width="0.8"/>
      ${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 5} -2 v${i % 2 ? 2.4 : 3.6}" stroke="#92400E" stroke-width="0.6"/>`).join('')}</g>`;
    case 'fan': return `<g transform="translate(${hx} ${hy - 4})"><g class="sc-sway"><path d="M0 0 L-14 -20 A24 24 0 0 1 14 -20Z" fill="#FEF3C7" stroke="#B45309" stroke-width="0.9"/>
      <path d="M0 0 L-7 -22 M0 0 L0 -24 M0 0 L7 -22" stroke="#D97706" stroke-width="0.7"/></g></g>`;
    case 'needle': return `<path d="M${hx} ${hy} l6 -10" stroke="#94A3B8" stroke-width="1.2"/><path d="M${hx + 6} ${hy - 10} q10 -6 4 10 q-4 8 -12 4" stroke="#E11D48" stroke-width="0.8" fill="none"/>`;
    case 'bowl': return `<g transform="translate(${hx} ${hy - 2})"><path d="M-10 -4 H10 Q9 6 0 7 Q-9 6 -10 -4Z" fill="#fff" stroke="#3B82F6" stroke-width="1"/>
      <path d="M-9 -4 Q0 -12 9 -4Z" fill="#fff" stroke="#E5E7EB" stroke-width="0.6"/></g>`;
    case 'flag': return `<path d="M${hx} ${hy + 6} L${hx} ${hy - 34}" stroke="#78716C" stroke-width="2"/><g class="sc-sway" style="--d:0.4s"><rect x="${hx}" y="${hy - 34}" width="22" height="14" fill="#DA251D"/>
      <polygon points="${hx + 11},${hy - 31} ${hx + 12.2},${hy - 28} ${hx + 15.2},${hy - 28} ${hx + 12.8},${hy - 26} ${hx + 13.7},${hy - 23} ${hx + 11},${hy - 24.8} ${hx + 8.3},${hy - 23} ${hx + 9.2},${hy - 26} ${hx + 6.8},${hy - 28} ${hx + 9.8},${hy - 28}" fill="#FFFF00"/></g>`;
    case 'scissors': return `<g transform="translate(${hx} ${hy})"><path d="M0 0 L10 -14 M4 0 L4 -16" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
      <circle cx="-2" cy="3" r="3" fill="none" stroke="#EF4444" stroke-width="1.6"/><circle cx="5" cy="4" r="3" fill="none" stroke="#EF4444" stroke-width="1.6"/></g>`;
    case 'hoe': return `<path d="M${hx - 20} ${hy + 18} L${hx + 14} ${hy - 30}" stroke="#A16207" stroke-width="3" stroke-linecap="round"/>
      <path d="M${hx + 12} ${hy - 28} l10 10 l-6 4Z" fill="#78716C" stroke="#44403C" stroke-width="0.8"/>`;
    case 'shovel': return `<path d="M${hx + 10} ${hy - 26} L${hx - 10} ${hy + 18}" stroke="#A16207" stroke-width="3" stroke-linecap="round"/>
      <path d="M${hx - 14} ${hy + 14} l-6 14 l10 4 l6 -14Z" fill="#94A3B8" stroke="#475569" stroke-width="0.8"/>`;
    default: return '';
  }
}

/** Đồ ôm trước ngực (dáng hold). */
function holdItem(prop, G) {
  const y = G.sh + 22;
  switch (prop) {
    case 'pillow': return `<g transform="translate(0 ${y})"><rect x="-16" y="-10" width="32" height="20" rx="8" fill="#60A5FA" stroke="${LINE}" stroke-width="0.9"/>
      <rect x="-6" y="-6" width="9" height="8" fill="#EF4444"/><rect x="5" y="-2" width="7" height="7" fill="#FACC15"/></g>`;
    case 'gift': return `<g transform="translate(0 ${y})"><rect x="-11" y="-9" width="22" height="17" rx="1.5" fill="#F472B6" stroke="${LINE}" stroke-width="0.9"/>
      <path d="M0 -9 V8 M-11 -2 H11" stroke="#FDE047" stroke-width="2.4"/><path d="M0 -9 q-6 -6 -8 -1 q2 2 8 1 q6 -6 8 -1 q-2 2 -8 1" fill="#FDE047"/></g>`;
    case 'basket': return `<g transform="translate(0 ${y + 4})"><path d="M-16 -8 Q-12 -22 0 -22 Q12 -22 16 -8" stroke="#A16207" stroke-width="2" fill="none"/>
      ${[-10, -3, 4, 10].map((x, i) => `<ellipse cx="${x}" cy="-10" rx="5" ry="4" fill="${i % 2 ? '#22C55E' : '#4ADE80'}"/>`).join('')}
      <path d="M-15 -8 H15 L12 6 H-12Z" fill="#D6A26B" stroke="#92400E" stroke-width="0.9"/><path d="M-13 -2 H13 M-12 3 H12" stroke="#A16207" stroke-width="0.8"/></g>`;
    case 'award': return `<g transform="translate(0 ${y})"><rect x="-12" y="-11" width="24" height="18" rx="1" fill="#FFFBEB" stroke="#D97706" stroke-width="1.2"/>
      <path d="M-7 -5 H7 M-7 -1 H7" stroke="#D97706" stroke-width="0.9"/><circle cx="6" cy="3" r="3.2" fill="#DC2626"/></g>`;
    case 'slab': return `<g transform="translate(0 ${y - 6})"><path d="M-26 -8 L22 -14 L26 6 L-24 10Z" fill="#A8A29E" stroke="#57534E" stroke-width="1"/>
      <path d="M-14 -6 l6 8 M8 -10 l-3 9" stroke="#78716C" stroke-width="1"/></g>`;
    case 'calf': return '';
    default: return `<g transform="translate(0 ${y})"><rect x="-9" y="-9" width="18" height="15" rx="1.5" fill="#F59E0B" stroke="${LINE}" stroke-width="0.9"/><rect x="-6" y="-6" width="12" height="4" rx="1" fill="#FEF3C7"/></g>`;
  }
}

function bag(c, G) {
  return `<rect x="-24" y="${G.sh + 2}" width="13" height="25" rx="4" fill="${c.bag}" stroke="${LINE}" stroke-width="1"/>
    <rect x="-23" y="${G.sh + 12}" width="11" height="8" rx="2" fill="none" stroke="${LINE}" stroke-width="0.8"/>`;
}

/** Chỉ cái đầu (tóc + mặt + mũ), tâm đầu ở (0, 0), dùng cho người nằm / ló đầu. */
export function headOnly(who, { mood, s = 1, rot = 0, look } = {}) {
  const c = CAST[who];
  const G = c.adult ? ADULT : KID;
  return `<g transform="scale(${G.k * s}) rotate(${rot})">${hairBack(c)}${face(c, { mood, adult: c.adult, look })}${hairFront(c)}${hat(c)}</g>`;
}

export function person(x, y, who, pose = 'stand', { s = 1, flip = false, prop, color, mood } = {}) {
  const c = CAST[who];
  const G = c.adult ? ADULT : KID;
  const A = ARMS[pose] || ARMS.stand;
  const walking = pose === 'walk' || pose === 'run';
  const sitting = pose === 'sit';
  const longSleeve = LONG_TOPS.includes(c.top);
  const handR = A.hand || (A.open && pose !== 'float' && pose !== 'lookUp' ? 'open' : 'fist');
  const R = arm(G, c, 1, A.R, { sleeveLong: longSleeve, hand: handR });
  const L = arm(G, c, -1, A.L, { sleeveLong: longSleeve, hand: A.hand === 'open' ? 'open' : 'fist' });
  let legs;
  if (sitting) legs = '';
  else if (c.adult && (c.top === 'gown' || c.top === 'robe' || c.top === 'aodai' || c.bottom === 'longskirt')) legs = c.top === 'gown' ? '' : `${shoe(-7, -4, -0.4, c.shoe)}${shoe(7, -4, 0.4, c.shoe)}`;
  else if (pose === 'run') legs = c.adult ? leg(c, G, -1, -22, true) + leg(c, G, 1, 20, true) : leg(c, G, -1, -34, true) + leg(c, G, 1, 30, true);
  else if (walking) legs = c.adult ? leg(c, G, -1, -11, true) + leg(c, G, 1, 12, true) : leg(c, G, -1, -18, true) + leg(c, G, 1, 20, true);
  else legs = leg(c, G, -1, -4) + leg(c, G, 1, 4);
  const tilt = A.look ? -9 : 0;
  const head = (layer) => `<g transform="translate(0 ${G.cy}) scale(${G.k}) rotate(${tilt})">${layer}</g>`;
  const neck = `<rect x="-3.6" y="${G.sh - 8}" width="7.2" height="9" fill="${SKIN}" stroke="${LINE}" stroke-width="0.8"/>`;
  const extra = pose === 'hold' ? holdItem(prop, G) : prop ? propAt(prop, R.hand, color, G) : '';
  const ribbons = pose === 'float' ? [-1, 1].map(sd => {
    const [hx, hy] = sd > 0 ? R.hand : L.hand;
    return `<g class="sc-sway" style="--d:${sd > 0 ? 0 : 1.2}s"><path d="M${hx} ${hy} C${hx + sd * 20} ${hy - 20} ${hx + sd * 30} ${hy + 30} ${hx + sd * 46} ${hy + 10} C${hx + sd * 58} ${hy} ${hx + sd * 60} ${hy + 40} ${hx + sd * 72} ${hy + 34}" stroke="#FBCFE8" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M${hx} ${hy} C${hx + sd * 14} ${hy + 10} ${hx + sd * 24} ${hy + 50} ${hx + sd * 38} ${hy + 46}" stroke="#FDE68A" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`;
  }).join('') : '';
  const behindArm = pose === 'hold' || pose === 'clap' || pose === 'sit' || pose === 'dig' ? '' : L.svg;
  const frontArms = pose === 'hold' || pose === 'clap' || pose === 'sit' || pose === 'dig' ? L.svg + R.svg : R.svg;
  const talking = pose !== 'float' && !!A.open;
  const upper = `${ribbons}
    ${head(hairBack(c))}
    ${walking && c.bag && !c.adult ? bag(c, G) : ''}
    ${legs}
    ${behindArm}
    ${torso(c, G)}
    ${neck}
    ${head(face(c, { look: A.look, open: talking, dir: walking ? 1.6 : 0, adult: c.adult, mood }) + hairFront(c) + hat(c))}
    ${frontArms}
    ${extra}`;
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    ${sitting ? `${sitLegs(c, G)}<g transform="translate(0 ${G.sitDy})">${upper}</g>` : upper}
  </g>`;
}

/** Người nằm ngủ / ốm trên giường: gối bên trái, chăn phủ người. (x, y): giữa mép dưới chăn. */
export function lying(x, y, who, { s = 1, mood = 'shut', blanket = '#93C5FD', len = 120 } = {}) {
  const c = CAST[who];
  const r = c.adult ? 14 : 16;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="${-len / 2 - 34}" y="-30" width="44" height="22" rx="10" fill="#FFFFFF" stroke="${LINE}" stroke-width="1"/>
    <g transform="translate(${-len / 2 - 12} -${18 + r * 0.5})">${headOnly(who, { mood, rot: -78 })}</g>
    <path d="M${-len / 2 + 2} -6 Q${-len / 2} -34 ${-len / 2 + 22} -36 H${len / 2 - 10} Q${len / 2 + 4} -34 ${len / 2} -6 Z" fill="${blanket}" stroke="${LINE}" stroke-width="1"/>
    <path d="M${-len / 2 + 14} -30 Q0 -40 ${len / 2 - 8} -30" stroke="#fff" stroke-width="2" fill="none" opacity="0.6"/>
    <path d="M${-len / 2 + 8} -18 H${len / 2 - 6}" stroke="${LINE}" stroke-width="0.6" opacity="0.35"/>
  </g>`;
}
