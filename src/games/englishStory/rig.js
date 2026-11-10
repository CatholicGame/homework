/**
 * Nhân vật cử động cho truyện tiếng Anh (englishStory): ghép từ bộ phận của nhân vật Tiếng Việt 3 (tiengViet3/cast.js),
 * cùng nét vẽ, nhưng tay (vai + khuỷu), chân (hông), đầu là các nhóm riêng xoay quanh khớp nên đi, vẫy, đánh răng… mượt.
 *
 * Mỗi khớp có hai lớp: .pp-j (tư thế, đổi bằng style.transform + transition) và .pp-w bên trong (nhịp lặp: bước chân,
 * đánh răng… bằng class keyframes, styles/english-story.css). Hai lớp tách nhau nên tư thế và nhịp không giẫm nhau.
 * Toạ độ như cast.js: (0, 0) là chỗ chân chạm đất, trẻ em cao ≈ 122, người lớn ≈ 165.
 */
import { CAST, leg, torso, hairBack, hairFront, hat, face, bag, KID, ADULT, CAST_LINE as LINE, CAST_SKIN as SKIN } from '../tiengViet3/cast.js';

// Trang phục nhân vật bài đọc tiếng Anh (thêm vào CAST để lying() / headOnly() dùng được).
Object.assign(CAST, {
  en_minh_pj: { hair: 'spiky', top: 'tee', shirt: '#93C5FD', bottom: 'pants', bottomC: '#7DB3F5', shoe: '#F59E0B', bag: '#F59E0B' },
  en_minh: { ...CAST.minh, bag: '#F59E0B' },
  en_lan: { hair: 'ponytail', top: 'uniform', shirt: '#FFFFFF', bottom: 'skirt', bottomC: '#1E3A6E', shoe: '#F28AB2', bag: '#EC4899' },
  en_mum: { adult: true, hair: 'bun', top: 'blouse', shirt: '#F9A8D4', bottom: 'pants', bottomC: '#475569', shoe: '#F5F5F4' },
  en_dad: { adult: true, hair: 'short', top: 'shirt', shirt: '#FFFFFF', tie: '#2563EB', bottom: 'pants', bottomC: '#1F2937', shoe: '#1C1917' },
  // Dùng chung cho mọi truyện (nhân vật giống nhau ở mọi bài)
  en_minh_home: { hair: 'spiky', top: 'tee', shirt: '#FB923C', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F59E0B', bag: '#F59E0B' },
  en_lan_home: { hair: 'ponytail', top: 'tee', shirt: '#F9A8D4', bottom: 'skirt', bottomC: '#7C3AED', shoe: '#F28AB2', bag: '#EC4899' },
  en_tom: { hair: 'neat', hairC: '#E0A33A', top: 'uniform', shirt: '#4A8FE0', collarC: '#3D7CCB', bottom: 'shorts', bottomC: '#1E2F5A', shoe: '#16A34A', bag: '#22C55E' },
  en_tom_home: { hair: 'neat', hairC: '#E0A33A', top: 'tee', shirt: '#22C55E', bottom: 'shorts', bottomC: '#334155', shoe: '#16A34A', bag: '#22C55E' },
  en_grandma: { adult: true, old: true, hair: 'bun', hairC: '#E7E5E4', top: 'blouse', shirt: '#A78BFA', bottom: 'pants', bottomC: '#1C1917', shoe: '#57534E' },
  en_grandpa: { adult: true, old: true, hair: 'short', hairC: '#E7E5E4', top: 'shirt', shirt: '#FDE68A', bottom: 'pants', bottomC: '#57534E', shoe: '#44403C', glasses: true },
  en_hoa: { adult: true, hair: 'ponytail', top: 'aodai', shirt: '#93C5FD', shoe: '#FFFFFF' },
  en_mum_home: { adult: true, hair: 'bun', top: 'blouse', shirt: '#86EFAC', bottom: 'pants', bottomC: '#475569', shoe: '#F5F5F4' },
  en_dad_home: { adult: true, hair: 'short', top: 'shirt', shirt: '#60A5FA', bottom: 'pants', bottomC: '#334155', shoe: '#44403C' },
});

const LONG_TOPS = ['aodai', 'gown', 'robe', 'blouse', 'ethnic', 'jacket', 'shirt'];

/**
 * Tư thế: góc tay theo kiểu cast.js (0 = buông thẳng, 90 = dang ngang ra ngoài, 180 = giơ thẳng lên; số âm = vào trong / ra trước),
 * [vai, cẳng tay tuyệt đối]; head: nghiêng đầu (độ); dy: hạ người (ngồi).
 */
export const POSES = {
  stand: { R: [10, 4], L: [10, 4] },
  walk: { R: [6, 0], L: [6, 0] },
  wave: { R: [128, 175], L: [10, 4] },
  cheer: { R: [150, 172], L: [150, 172] },
  stretch: { R: [168, 182], L: [168, 182], head: -6 },
  reach: { R: [112, 128], L: [10, 4] },
  wash: { R: [150, 262], L: [150, 262], head: 4 },
  brush: { R: [140, 270], L: [10, 4] },
  comb: { R: [156, 250], L: [10, 4], head: 5 },
  eat: { R: [118, 248], L: [40, 110], dy: 20 },
  drink: { R: [120, 255], L: [40, 110], dy: 20, head: -6 },
  sit: { R: [40, 110], L: [40, 110], dy: 20 },
  read: { R: [30, 196], L: [30, 196], dy: 20, head: 7 },
  stir: { R: [55, 110], L: [20, 60] },
  give: { R: [70, 92], L: [10, 4] },
  point: { R: [84, 92], L: [10, 4] },
  pointUp: { R: [140, 160], L: [10, 4] },
  raise: { R: [160, 178], L: [10, 4] },
  me: { R: [24, -120], L: [10, 4] },
  clap: { R: [30, -96], L: [30, -96] },
  hips: { R: [70, -40], L: [70, -40] },
  open: { R: [55, 40], L: [55, 40] },
  carry: { R: [24, -86], L: [24, -86] },
  arms: { R: [90, 96], L: [90, 96] },
  think: { R: [30, -150], L: [16, -60], head: 8 },
  shrug: { R: [50, 130], L: [50, 130], head: -5 },
  dig: { R: [24, -60], L: [30, -40], dy: 6 },
  plant: { R: [-10, -40], L: [-10, -40], dy: 26, head: 10 },
  paint: { R: [70, 128], L: [10, 4] },
  write: { R: [40, -60], L: [30, -70], dy: 20, head: 8 },
  phone: { R: [150, 250], L: [10, 4], head: 6 },
  swim: { R: [170, 180], L: [80, 90] },
  throw: { R: [160, 200], L: [40, 30] },
  sad: { R: [4, -6], L: [4, -6], head: 12 },
  sitWave: { R: [128, 175], L: [40, 110], dy: 20 },
  sitClap: { R: [40, -90], L: [40, -90], dy: 20 },
  sitDesk: { R: [22, -40], L: [22, -40], dy: 20, head: 4 }, // ngồi, hai tay đặt trên bàn
  sitHold: { R: [24, -86], L: [24, -86], dy: 20 },          // ngồi ôm / cầm đồ trước bụng
};

const f = (n) => +n.toFixed(1);

function seg(len, color, w) {
  return `<path d="M0 0 L0 ${len}" stroke="${LINE}" stroke-width="${w + 1.8}" stroke-linecap="round"/>
    <path d="M0 0 L0 ${len}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
}

/** Đồ cầm trong tay (gốc toạ độ = bàn tay, cánh tay hướng +y). */
const PROPS = {
  toothbrush: `<g transform="rotate(180)"><rect x="-1.6" y="-3" width="3.2" height="20" rx="1.4" fill="#22D3EE" stroke="${LINE}" stroke-width="0.7"/>
    <rect x="-2.4" y="14" width="4.8" height="6" rx="1" fill="#fff" stroke="${LINE}" stroke-width="0.7"/></g>`,
  comb: `<g transform="rotate(180) translate(0 6)"><rect x="-8" y="0" width="16" height="5" rx="1.5" fill="#F472B6" stroke="${LINE}" stroke-width="0.7"/>
    ${[-6, -3, 0, 3, 6].map((x) => `<path d="M${x} 5 v5" stroke="#DB2777" stroke-width="1.2"/>`).join('')}</g>`,
  chopsticks: `<g transform="translate(0 -6)"><path d="M-1.5 -2 L-3 15 M2 -2 L1.5 15" stroke="${LINE}" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M-1.5 -2 L-3 15 M2 -2 L1.5 15" stroke="#D97706" stroke-width="2" stroke-linecap="round"/>
    <path class="pp-noodle" d="M-3 14 q3 4 -1 8 M1.5 14 q-3 4 1 8" stroke="#FDE68A" stroke-width="2.2" fill="none" stroke-linecap="round"/></g>`,
  glass: `<g transform="translate(0 -4)"><rect x="-6" y="-10" width="12" height="17" rx="2" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1"/>
    <g class="pp-milk" style="transform-origin:0 6px"><rect x="-5" y="-6" width="10" height="12" rx="1.5" fill="#fff" stroke="#E2E8F0" stroke-width="0.6"/></g></g>`,
  spoon: `<g transform="rotate(180)"><path d="M0 -2 L0 16" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/><ellipse cx="0" cy="19" rx="4" ry="5" fill="#CBD5E1" stroke="#64748B" stroke-width="0.7"/></g>`,
  ball: `<g transform="translate(0 7)"><circle r="8" fill="#fff" stroke="${LINE}" stroke-width="0.9"/><path d="M0 -3 l3 2.2 -1.2 3.4 h-3.6 l-1.2 -3.4Z" fill="#1F2937"/><path d="M0 -3 V-8 M3 -0.8 L7.6 -2.4 M1.8 2.6 L4.6 6.4 M-1.8 2.6 L-4.6 6.4 M-3 -0.8 L-7.6 -2.4" stroke="#1F2937" stroke-width="0.8"/></g>`,
  pencil: `<g transform="rotate(200)"><rect x="-1.8" y="-2" width="3.6" height="18" fill="#FACC15" stroke="${LINE}" stroke-width="0.7"/><path d="M-1.8 16 L0 21 L1.8 16Z" fill="#FDE68A" stroke="${LINE}" stroke-width="0.6"/><rect x="-1.8" y="-4" width="3.6" height="3" fill="#F472B6" stroke="${LINE}" stroke-width="0.6"/></g>`,
  paintbrush: `<g transform="rotate(200)"><rect x="-1.4" y="-4" width="2.8" height="16" fill="#B45309" stroke="${LINE}" stroke-width="0.6"/><path d="M-2.4 12 H2.4 L1.6 20 Q0 22 -1.6 20Z" fill="#3B82F6" stroke="${LINE}" stroke-width="0.6"/></g>`,
  flower: `<g transform="rotate(180)"><path d="M0 -2 V18" stroke="#16A34A" stroke-width="1.8"/><g transform="translate(0 21)">${[0, 72, 144, 216, 288].map((r) => `<ellipse cy="-4" rx="2.6" ry="4" fill="#F472B6" stroke="${LINE}" stroke-width="0.5" transform="rotate(${r})"/>`).join('')}<circle r="2.2" fill="#FDE047"/></g></g>`,
  umbrella: `<g transform="rotate(180)"><path d="M0 -4 V40" stroke="${LINE}" stroke-width="1.6"/><path d="M-26 40 Q0 14 26 40 Q19 36 13 40 Q6 36 0 40 Q-6 36 -13 40 Q-19 36 -26 40Z" fill="#EF4444" stroke="${LINE}" stroke-width="0.9"/></g>`,
  phone: `<g transform="translate(0 -6)"><rect x="-4" y="-7" width="8" height="14" rx="1.6" fill="#1F2937" stroke="${LINE}" stroke-width="0.6"/><rect x="-3" y="-5.6" width="6" height="10" rx="0.8" fill="#7DD3FC"/></g>`,
  apple: `<g transform="translate(0 -6)"><circle r="6" fill="#EF4444" stroke="${LINE}" stroke-width="0.8"/><path d="M0 -6 v-3" stroke="#78350F" stroke-width="1.2"/><ellipse cx="2.6" cy="-8" rx="2.4" ry="1.2" fill="#22C55E"/></g>`,
  cup: `<g transform="translate(0 -4)"><path d="M-6 -8 H6 L5 7 H-5Z" fill="#fff" stroke="${LINE}" stroke-width="0.8"/><path d="M6 -4 q5 0 4 5 q-1 3 -5 3" stroke="${LINE}" stroke-width="1" fill="none"/></g>`,
  racket: `<g transform="rotate(180)"><path d="M0 -2 V14" stroke="${LINE}" stroke-width="2.2"/><ellipse cx="0" cy="22" rx="7" ry="9" fill="#FEF9C3" stroke="#DC2626" stroke-width="1.6"/></g>`,
  lantern: `<g transform="rotate(180)"><path d="M0 -2 V18" stroke="#A16207" stroke-width="1.4"/><path d="M0 18 L0 22" stroke="${LINE}" stroke-width="0.8"/><g transform="translate(0 30)"><path d="M0 -9 L2.6 -2.8 L9 -2.8 L4 1.4 L5.8 8 L0 4 L-5.8 8 L-4 1.4 L-9 -2.8 L-2.6 -2.8Z" fill="#FACC15" stroke="#DC2626" stroke-width="0.9"/></g></g>`,
  watering: `<g transform="translate(0 4)"><path d="M-8 -6 H6 V8 H-8Z" fill="#22C55E" stroke="${LINE}" stroke-width="0.8"/><path d="M6 -2 L16 -8" stroke="#22C55E" stroke-width="2.6"/><path d="M-8 -6 Q-1 -14 6 -6" stroke="${LINE}" stroke-width="1" fill="none"/></g>`,
};

function arm(c, G, side) {
  const S = side > 0 ? 'R' : 'L';
  const sx = side * (G === ADULT ? 13 : 14), sy = G.sh + 4;
  const long = LONG_TOPS.includes(c.top) && !(c.top === 'shirt' && !c.adult);
  const sleeve = c.top === 'dress' ? 6 : 9;
  const upper = long ? seg(G.up, c.shirt, 8.6) : seg(G.up, SKIN, 5.6) + seg(sleeve, c.shirt, G === ADULT ? 11 : 10);
  const fore = long ? seg(G.fore, c.shirt, 8.6) : seg(G.fore, SKIN, 5.6);
  const hand = `<circle r="${G === ADULT ? 3.8 : 3.6}" fill="${SKIN}" stroke="${LINE}" stroke-width="0.9"/>`;
  return `<g transform="translate(${sx} ${sy})"><g class="pp-j pp-up${S}"><g class="pp-w pp-upw${S}">${upper}
    <g transform="translate(0 ${G.up})"><g class="pp-j pp-fo${S}"><g class="pp-w pp-fow${S}">${fore}
      <g transform="translate(0 ${G.fore})"><g class="pp-prop${S}"></g>${hand}</g>
    </g></g></g></g></g></g>`;
}

function legGroup(c, G, side) {
  const S = side > 0 ? 'R' : 'L';
  const hx = side * (c.chubby ? 8 : G === ADULT ? 8 : 6);
  return `<g transform="translate(${hx} ${G.hipY})"><g class="pp-j pp-leg${S}"><g class="pp-w pp-legw${S}">
    <g transform="translate(${-hx} ${-G.hipY})">${leg(c, G, side, 0, true)}</g></g></g></g>`;
}

// ── Dáng nghiêng khi đi (theo cách vẽ của phim Kinh Thánh, kinh-thanh/src/film/views.js) ─────────────────
// Mặt quay sang phải (lật cả hình khi đi sang trái): đầu một mắt, sống mũi, tai, tóc phủ đỉnh và gáy; tay gần đè lên thân,
// tay xa và chân xa tối hơn ở sau; đùi xoay quanh hông, cẳng chân gập ở gối. Khớp = góc gốc (transform) + nhịp vung
// (thuộc tính rotate, class sv-sw chạy khi .is-walk), nên hai chuyển động cộng vào nhau.
const SIDE = {
  kid: { cy: -101, r: 16.4, sh: -80, hem: -47, waist: -56, hip: -46, w: 14, up: 17, fore: 16, leg: 8 },
  adult: { cy: -144, r: 14.6, sh: -128, hem: -88, waist: -96, hip: -84, w: 17, up: 22, fore: 20, leg: 10 },
};
/** Độ dài một bước của dáng nghiêng (đơn vị, s = 1): nhịp bước = bước / tốc độ để chân không trượt. */
export const STEP = { kid: 30, adult: 44 };
const darker = (hex, k = 0.22) => {
  const n = parseInt(hex.slice(1), 16), ch = (sh) => Math.round(((n >> sh) & 255) * (1 - k));
  return `#${((1 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).slice(1)}`;
};
const bar = (d, w, col) => `<path d="${d}" stroke="${LINE}" stroke-width="${f(w + 1.8)}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
/** Khớp: xoay gốc a độ quanh (ox, oy); r ≠ 0 thì vung thêm 0 → r độ khi đi. */
const joint = (inner, a, ox, oy, r = 0) => `<g transform="rotate(${a} ${f(ox)} ${f(oy)})">${r ? `<g class="sv-sw" style="--r:${r}deg;transform-origin:${f(ox)}px ${f(oy)}px">${inner}</g>` : inner}</g>`;

function sideHead(c, B) {
  const H = c.hairC || '#1F1716', cy = B.cy, r = B.r;
  const cap = `<path d="M${f(-r * 0.98)} ${f(cy + r * 0.3)} C${f(-r * 1.08)} ${f(cy - r * 0.9)} ${f(r * 0.1)} ${f(cy - r * 1.22)} ${f(r * 0.8)} ${f(cy - r * 0.62)} C${f(r * 0.5)} ${f(cy - r * 0.42)} ${f(r * 0.1)} ${f(cy - r * 0.5)} ${f(-r * 0.12)} ${f(cy - r * 0.2)} C${f(-r * 0.3)} ${f(cy + r * 0.2)} ${f(-r * 0.5)} ${f(cy + r * 0.5)} ${f(-r * 0.62)} ${f(cy + r * 0.62)}Z" fill="${H}" stroke="${LINE}" stroke-width="0.6"/>`;
  const P = (x, y) => `${f(x * r)} ${f(cy + y * r)}`;
  const spikes = c.hair === 'spiky' ? `<path d="M${P(-1.02, 0.25)} L${P(-1.22, -0.18)} L${P(-0.98, -0.42)} L${P(-1.18, -0.86)} L${P(-0.66, -0.86)} L${P(-0.62, -1.36)} L${P(-0.2, -1.02)} L${P(0.08, -1.42)} L${P(0.32, -1)} L${P(0.78, -1.12)} L${P(0.72, -0.7)} L${P(1.02, -0.66)} L${P(0.6, -0.46)} C${P(0.2, -0.52)} ${P(-0.2, -0.3)} ${P(-0.5, 0.4)}Z" fill="${H}"/>` : '';
  const tail = c.hair === 'ponytail' ? `<g class="sv-tail" style="transform-origin:${f(-r * 0.8)}px ${f(cy - r * 0.55)}px"><path d="M${P(-0.7, -0.75)} C${P(-1.6, -0.9)} ${P(-1.75, 0.3)} ${P(-1.45, 1.35)} Q${P(-1.2, 1.5)} ${P(-1.05, 1.2)} C${P(-1.15, 0.3)} ${P(-0.95, -0.2)} ${P(-0.6, -0.35)}Z" fill="${H}" stroke="${LINE}" stroke-width="0.6"/>
    <circle cx="${f(-r * 0.82)}" cy="${f(cy - r * 0.62)}" r="2.6" fill="#F472B6" stroke="${LINE}" stroke-width="0.6"/></g>` : '';
  const curly = c.hair === 'curly' ? `<g>${[0, 1, 2, 3].map((i) => `<circle cx="${f(-r * (0.75 + (i % 2) * 0.22))}" cy="${f(cy - r * 0.2 + i * r * 0.5)}" r="${f(r * (0.42 - i * 0.03))}" fill="${H}" stroke="${LINE}" stroke-width="0.5"/>`).join('')}
    ${[-0.7, -0.2, 0.3].map((x, i) => `<circle cx="${f(r * x)}" cy="${f(cy - r * (1.02 - Math.abs(x) * 0.25) + (i % 2))}" r="${f(r * 0.3)}" fill="${H}"/>`).join('')}</g>` : '';
  const bun = c.hair === 'bun' ? `<ellipse cx="${f(-r * 0.95)}" cy="${f(cy + r * 0.28)}" rx="${f(r * 0.34)}" ry="${f(r * 0.3)}" fill="${H}" stroke="${LINE}" stroke-width="0.6"/>` : '';
  return `<path d="M-3.4 ${f(cy + r * 0.6)} V${B.sh + 2} H3.8 V${f(cy + r * 0.7)}Z" fill="${SKIN}" stroke="${LINE}" stroke-width="0.8"/>
    ${tail}
    <circle cx="0" cy="${cy}" r="${r}" fill="${SKIN}" stroke="${LINE}" stroke-width="0.8"/>
    <path d="M${f(r * 0.9)} ${f(cy - 1.6)} q4 3.4 0.6 6" fill="${SKIN}" stroke="${LINE}" stroke-width="0.8"/>
    ${cap}${spikes}
    <ellipse cx="${f(-r * 0.16)}" cy="${f(cy + 2)}" rx="2.8" ry="4" fill="${SKIN}" stroke="${LINE}" stroke-width="0.8"/>
    <g class="sv-eye" style="transform-origin:${f(r * 0.56)}px ${f(cy)}px"><ellipse cx="${f(r * 0.56)}" cy="${f(cy)}" rx="2.2" ry="3" fill="${c.eyeC || '#2B1D16'}"/><circle cx="${f(r * 0.56 + 0.8)}" cy="${f(cy - 1.1)}" r="0.9" fill="#fff"/></g>
    <circle cx="${f(r * 0.36)}" cy="${f(cy + r * 0.4)}" r="2.8" fill="#F9A8A8" opacity="0.55"/>
    <path d="M${f(r * 0.58)} ${f(cy + r * 0.5)} q1.8 1.4 3.4 -0.2" stroke="#9A3B2E" stroke-width="1.1" fill="none" stroke-linecap="round"/>
    ${bun}${curly}
    ${c.hat ? `<g transform="translate(0 ${cy}) scale(${f(r / 16)})">${hat(c)}</g>` : ''}`;
}

function sideBody(c, B, adult) {
  const shirt = c.shirt || '#93C5FD', d = f(B.w * 0.8), sh = B.sh, hem = B.hem;
  const bottom = c.bottom === 'skirt'
    ? `<g class="sv-skirt" style="transform-origin:0px ${B.waist}px"><path d="M${-d - 1} ${B.waist} H${d + 1} L${d + 7} -27 Q0 -23 ${-d - 7} -27Z" fill="${c.bottomC}" stroke="${LINE}" stroke-width="1"/>
      <path d="M-2 ${B.waist + 3} L-3 -26 M4 ${B.waist + 3} L6 -26" stroke="#14294F" stroke-width="0.8" opacity="0.5"/></g>`
    : c.bottom === 'pants'
      ? `<path d="M${-d - 1} ${B.waist} H${d + 1} L${d + 1} ${B.hip + 6} H${-d - 1}Z" fill="${c.bottomC}" stroke="${LINE}" stroke-width="1"/>`
      : `<path d="M${-d - 1} ${B.waist} H${d + 1} L${d + 3} ${adult ? -70 : -31} H${-d - 3}Z" fill="${c.bottomC}" stroke="${LINE}" stroke-width="1"/>`;
  const top = `<path d="M${-d} ${sh} Q4 ${sh - 3} ${d} ${sh + 3} Q${d + 3} ${sh + 14} ${d + 2} ${hem} Q0 ${hem + 3} ${-d - 1} ${hem} Q${-d - 2} ${sh + 14} ${-d} ${sh}Z" fill="${shirt}" stroke="${LINE}" stroke-width="1"/>
    <path d="M-6 ${sh + 6} Q-8 ${f((sh + hem) / 2)} -7 ${hem - 2}" stroke="#000" stroke-width="2.2" opacity="0.1" fill="none"/>`;
  const scarf = c.top === 'uniform' ? `<path d="M1 ${sh - 1} L${d + 1} ${sh + 2} L${d - 2} ${sh + 7}Z" fill="${c.collarC || '#F1F5F9'}" stroke="${LINE}" stroke-width="0.8"/>
    <path d="M2 ${sh} Q${d} ${sh + 1} ${d + 1} ${sh + 4} L${d + 2} ${sh + 17} L${d - 2} ${sh + 15} L${d - 2} ${sh + 5}Z" fill="#E11D2A" stroke="${LINE}" stroke-width="0.8"/>` : '';
  return bottom + top + scarf;
}

function sideArm(c, B, far) {
  const sy = B.sh + 4, col = far ? darker(SKIN, 0.12) : SKIN, sleeve = far ? darker(c.shirt || '#93C5FD') : (c.shirt || '#93C5FD');
  const long = LONG_TOPS.includes(c.top) && !!c.adult;
  const upper = long ? bar(`M0 ${sy} L0 ${sy + B.up}`, 8.4, sleeve) : bar(`M0 ${sy} L0 ${sy + B.up}`, 5.6, col) + bar(`M0 ${sy} L0 ${sy + 8}`, 9.4, sleeve);
  const hy = sy + B.up + B.fore + 1;
  const foreBar = bar(`M0 ${sy + B.up} L0 ${sy + B.up + B.fore}`, long ? 8.4 : 5.6, long ? sleeve : col);
  const hand = `<circle cx="0" cy="${hy}" r="3.8" fill="${col}" stroke="${LINE}" stroke-width="0.8"/>`;
  // gần: gốc ra sau 18°, vung tới −18°; xa: ngược pha (Kinh Thánh limb(18,−6,−36,−24) / limb(−18,−30,36,24))
  if (far) return joint(`${upper}${joint(foreBar + hand, -30, 0, sy + B.up, 24)}`, -18, 0, sy, 36);
  // Tay gần cầm đồ (pp-propR, cùng hình như dáng trước mặt). Đang cầm đồ (.is-hold) thì tay thôi vung, giữ góc của
  // tư thế lúc bắt đầu đi (applySideHold đặt style.transform, đè lên góc gốc trong thuộc tính transform).
  const fy = sy + B.up;
  return `<g class="sv-hU" data-o="${sy}" transform="rotate(18 0 ${sy})"><g class="sv-sw" style="--r:-36deg;transform-origin:0px ${sy}px">${upper}
    <g class="sv-hF" data-o="${fy}" transform="rotate(-6 0 ${fy})"><g class="sv-sw" style="--r:-24deg;transform-origin:0px ${fy}px">${foreBar}
      <g transform="translate(0 ${hy})"><g class="pp-propR"></g></g>${hand}</g></g></g></g>`;
}

function sideLeg(c, B, far) {
  const hy = B.hip, ky = f((hy - 4) / 2);
  const bare = c.bottom !== 'pants';
  const col0 = bare ? SKIN : c.bottomC, col = far ? darker(col0, bare ? 0.12 : 0.22) : col0;
  const shoe = far ? darker(c.shoe || '#64748B', 0.15) : (c.shoe || '#64748B');
  const sock = bare && !c.adult ? bar(`M0 -13 L0 -5`, B.leg, far ? '#E2E8F0' : '#FFFFFF') : '';
  const shin = `${bar(`M0 ${ky} L0 -4`, B.leg, col)}${sock}<path d="M-4.6 -1 Q-4.6 -6.4 2 -5.4 L9 -3.2 Q10 0 7 0Z" fill="${shoe}" stroke="${LINE}" stroke-width="0.8"/>`;
  const thigh = bar(`M0 ${hy} L0 ${ky}`, B.leg, col);
  // gần: đùi trước 16° vung ra sau, gối gập 6 → 18°; xa ngược pha (Kinh Thánh leg(−16,6,32,12) / leg(16,18,−32,−12))
  return far ? joint(`${thigh}${joint(shin, 18, 0, ky, -12)}`, 16, 0, hy, -32)
    : joint(`${thigh}${joint(shin, 6, 0, ky, 12)}`, -16, 0, hy, 32);
}

/** Dáng nghiêng (mặt sang phải) cho lúc đi. */
export function sideSvg(who) {
  const c = CAST[who], adult = !!c.adult, B = adult ? SIDE.adult : SIDE.kid;
  const bagSide = c.bag ? `<g class="pp-bag"><rect x="${-B.w - 9}" y="${B.sh + 2}" width="13" height="26" rx="4" fill="${c.bag}" stroke="${LINE}" stroke-width="1"/>
    <rect x="${-B.w - 7}" y="${B.sh + 13}" width="9" height="8" rx="2" fill="none" stroke="${LINE}" stroke-width="0.8"/></g>` : '';
  const strap = c.bag ? `<g class="pp-bag"><path d="M-3 ${B.sh + 1} Q2 ${B.sh + 10} -1 ${B.sh + 22}" stroke="${darker(c.bag, 0.3)}" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>` : '';
  return `<g class="sv-bob"${c.thin ? ' transform="scale(0.88 1)"' : ''}>
    ${sideArm(c, B, true)}
    ${sideLeg(c, B, true)}${sideLeg(c, B, false)}
    ${bagSide}
    ${sideBody(c, B, adult)}${strap}
    ${sideHead(c, B)}
    <g class="pp-chest" transform="translate(${f(B.w * 0.55)} ${B.sh + 24})"></g>
    ${sideArm(c, B, false)}
  </g>`;
}

/** SVG bên trong con rối (không gồm thẻ <svg>): dáng trước mặt (đứng, làm việc) + dáng nghiêng (đi). */
export function puppetSvg(who) {
  return `<g class="pp-front">${frontSvg(who)}</g><g class="pp-side">${sideSvg(who)}</g>`;
}

function frontSvg(who) {
  const c = CAST[who];
  const G = c.adult ? ADULT : KID;
  const head = (inner) => `<g transform="translate(0 ${G.cy})"><g class="pp-j pp-head"><g class="pp-w pp-headw"><g transform="scale(${G.k})">${inner}</g></g></g></g>`;
  const faces = ['happy', 'joy', 'talk', 'wow', 'shut', 'sad', 'cry'].map((m) => `<g class="pp-face f-${m}">${face(c, { mood: m === 'talk' ? 'happy' : m, open: m === 'talk', dir: 1.2, adult: c.adult })}</g>`).join('');
  const neck = `<rect x="-3.6" y="${G.sh - 8}" width="7.2" height="9" fill="${SKIN}" stroke="${LINE}" stroke-width="0.8"/>`;
  // Chân nằm ngoài pp-body: ngồi (dy) chỉ hạ thân, bàn chân vẫn chạm sàn; thân che phần đùi.
  return `<g class="pp-bob"${c.thin ? ' transform="scale(0.88 1)"' : ''}><g class="pp-j pp-body">
    ${head(hairBack(c))}
    <g class="pp-bag">${c.bag ? bag(c, G) : ''}</g></g>
    ${legGroup(c, G, -1)}${legGroup(c, G, 1)}
    <g class="pp-j pp-body">
    ${arm(c, G, -1)}
    ${torso(c, G)}${neck}
    ${head(faces + hairFront(c) + hat(c))}
    ${arm(c, G, 1)}
    <g class="pp-chest" transform="translate(0 ${G.sh + 24})"></g>
  </g></g>`;
}

/** Áp tư thế lên các khớp (có transition trong CSS; instant = không chuyển động). */
export function applyPose(root, name, extra) {
  const p = extra?.[name] || POSES[name] || POSES.stand;
  const set = (sel, deg) => root.querySelectorAll(sel).forEach((g) => { g.style.transform = `rotate(${f(deg)}deg)`; });
  for (const [S, side] of [['R', 1], ['L', -1]]) {
    const [a1, a2] = p[S];
    set(`.pp-up${S}`, -side * a1);
    set(`.pp-fo${S}`, -side * (a2 - a1));
  }
  set('.pp-head', p.head || 0);
  root.querySelectorAll('.pp-body').forEach((b) => { b.style.transform = `translateY(${p.dy || 0}px)`; });
}

/** Dáng nghiêng: tay gần giữ góc của tư thế name khi đang cầm đồ (cùng quy ước góc như tay phải dáng trước mặt); null = bỏ. */
export function applySideHold(root, name, extra) {
  const U = root.querySelector('.sv-hU'), F = root.querySelector('.sv-hF');
  if (!U || !F) return;
  if (!name) { U.style.transform = F.style.transform = ''; return; }
  const [a1, a2] = (extra?.[name] || POSES[name] || POSES.stand).R;
  // Gốc xoay 0 0 (.es-ac g): xoay quanh khớp bằng dời tới khớp → xoay → dời về (transform-origin cũng tác động lên thuộc tính transform nên không dùng).
  const rot = (g, deg) => { const o = g.dataset.o; g.style.transform = `translate(0px, ${o}px) rotate(${f(deg)}deg) translate(0px, ${-o}px)`; };
  rot(U, -a1);
  rot(F, -(a2 - a1));
}

export const propSvg = (name, extra) => extra?.[name] || PROPS[name] || '';
export const BOOK = `<g transform="translate(0 -25) rotate(-4)"><rect x="-17" y="-12" width="34" height="24" rx="2" fill="#2563EB" stroke="${LINE}" stroke-width="1"/>
  <rect x="-15" y="-10" width="30" height="20" fill="#fff" stroke="${LINE}" stroke-width="0.6"/><path d="M0 -10 V10" stroke="${LINE}" stroke-width="0.8"/>
  <g class="pp-page" style="transform-origin:0 0"><path d="M0 -10 H14 V10 H0Z" fill="#F8FAFC" stroke="${LINE}" stroke-width="0.6"/></g>
  <path d="M-12 -5 H-3 M-12 -1 H-3 M-12 3 H-5 M3 -5 H12 M3 -1 H12" stroke="#94A3B8" stroke-width="0.9"/></g>`;

// ── Chú chó Lucky (nhìn nghiêng, quay sang phải): đứng (đi lon ton, nhảy) và ngồi (vẫy đuôi) ──
const DOG = '#B7794A', DOG_D = '#7A4B2A', DOG_L = '#F5E6D3';
function dogHead(x, y) {
  return `<g transform="translate(${x} ${y})"><g class="dg-head">
    <g transform="translate(-6 -8)"><g class="dg-ear"><path d="M0 0 Q-10 4 -8 18 Q-2 18 2 4Z" fill="${DOG_D}" stroke="${LINE}" stroke-width="0.9"/></g></g>
    <circle r="13" fill="${DOG}" stroke="${LINE}" stroke-width="1"/>
    <ellipse cx="11" cy="5" rx="9" ry="7" fill="${DOG_L}" stroke="${LINE}" stroke-width="0.9"/>
    <ellipse cx="19" cy="1.6" rx="3.4" ry="2.6" fill="#2B1D16"/>
    <g class="dg-eye"><ellipse cx="4" cy="-4" rx="2.2" ry="2.8" fill="#2B1D16"/><circle cx="4.8" cy="-5" r="0.8" fill="#fff"/></g>
    <g class="dg-mouth-c"><path d="M12 9 q3 2 6 0" stroke="${LINE}" stroke-width="1" fill="none" stroke-linecap="round"/></g>
    <g class="dg-mouth-o"><path d="M11 8 q4 6 8 0Z" fill="#B4363C" stroke="${LINE}" stroke-width="0.8"/><path d="M13 11 q2 6 5 1" fill="#F472B6" stroke="${LINE}" stroke-width="0.6"/></g>
    <ellipse cx="-2" cy="4" rx="2.6" ry="1.6" fill="#F9A8A8" opacity="0.7"/>
  </g></g>`;
}
function dogTail(x, y) {
  return `<g transform="translate(${x} ${y})"><g class="dg-tail"><path d="M0 0 Q-14 -4 -16 -20" stroke="${LINE}" stroke-width="7.4" fill="none" stroke-linecap="round"/>
    <path d="M0 0 Q-14 -4 -16 -20" stroke="${DOG}" stroke-width="5.6" fill="none" stroke-linecap="round"/></g></g>`;
}
function dogLeg(x, cls, dark) {
  return `<g transform="translate(${x} -24)"><g class="${cls}"><path d="M0 0 L0 22" stroke="${LINE}" stroke-width="8.4" stroke-linecap="round"/>
    <path d="M0 0 L0 22" stroke="${dark ? '#9C6438' : DOG}" stroke-width="6.6" stroke-linecap="round"/>
    <ellipse cx="2" cy="23" rx="5" ry="2.6" fill="${DOG_L}" stroke="${LINE}" stroke-width="0.8"/></g></g>`;
}
export function dogSvg() {
  const collar = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-3" y="-8" width="6" height="16" rx="2.5" fill="#EF4444" stroke="${LINE}" stroke-width="0.8"/><circle cx="2" cy="9" r="2.6" fill="#FACC15" stroke="${LINE}" stroke-width="0.6"/></g>`;
  const stand = `<g class="dg-stand">${dogTail(-26, -36)}
    ${dogLeg(-17, 'dg-legB2', true)}${dogLeg(15, 'dg-legF2', true)}
    <ellipse cx="0" cy="-34" rx="30" ry="14" fill="${DOG}" stroke="${LINE}" stroke-width="1"/>
    <ellipse cx="2" cy="-27" rx="20" ry="6" fill="${DOG_L}" opacity="0.8"/>
    <ellipse cx="-10" cy="-40" rx="9" ry="6" fill="${DOG_D}" opacity="0.55"/>
    ${dogLeg(-21, 'dg-legB1')}${dogLeg(19, 'dg-legF1')}
    ${collar(25, -42, 18)}${dogHead(32, -52)}</g>`;
  const sit = `<g class="dg-sit">${dogTail(-14, -10)}
    <ellipse cx="-6" cy="-12" rx="18" ry="12" fill="${DOG}" stroke="${LINE}" stroke-width="1"/>
    <path d="M-2 -10 Q6 -44 20 -50 L28 -36 Q22 -18 18 -4Z" fill="${DOG}" stroke="${LINE}" stroke-width="1"/>
    <path d="M10 -36 Q16 -20 16 -6" stroke="${DOG_L}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.85"/>
    ${[12, 21].map((x) => `<path d="M${x} -26 L${x + 1} -2" stroke="${LINE}" stroke-width="8" stroke-linecap="round"/><path d="M${x} -26 L${x + 1} -2" stroke="${DOG}" stroke-width="6.2" stroke-linecap="round"/><ellipse cx="${x + 3}" cy="-1" rx="5" ry="2.6" fill="${DOG_L}" stroke="${LINE}" stroke-width="0.8"/>`).join('')}
    <ellipse cx="-12" cy="-1" rx="9" ry="3" fill="${DOG_L}" stroke="${LINE}" stroke-width="0.8"/>
    ${collar(23, -46, 8)}${dogHead(28, -58)}</g>`;
  return `<g class="dg-bob">${stand}${sit}</g>`;
}

/** Xe của bố (nhìn nghiêng, chạy sang phải), bố ngồi sau cửa kính. */
export function carSvg(headSvg) {
  const wheel = (x) => `<g transform="translate(${x} -14)"><g class="car-wheel"><circle r="13" fill="#1F2937" stroke="${LINE}" stroke-width="1"/>
    <circle r="6" fill="#CBD5E1"/><path d="M-6 0 H6 M0 -6 V6" stroke="#64748B" stroke-width="1.6"/></g></g>`;
  return `<g class="car-body">
    <path d="M-74 -20 Q-76 -40 -60 -42 L-34 -44 Q-22 -70 6 -70 L30 -70 Q44 -68 54 -46 L70 -42 Q80 -38 78 -20Z" fill="#EF4444" stroke="${LINE}" stroke-width="1.2"/>
    <path d="M-26 -46 Q-16 -64 4 -64 L14 -64 L14 -46Z" fill="#BAE6FD" stroke="${LINE}" stroke-width="0.9"/>
    <path d="M20 -64 L30 -64 Q40 -62 48 -46 L20 -46Z" fill="#BAE6FD" stroke="${LINE}" stroke-width="0.9"/>
    <g transform="translate(-2 -48)">${headSvg}</g>
    <path d="M-26 -46 Q-16 -64 4 -64 L14 -64 L14 -46Z" fill="#E0F2FE" opacity="0.25"/>
    <path d="M-70 -30 H74" stroke="#B91C1C" stroke-width="1.4"/>
    <rect x="66" y="-38" width="10" height="6" rx="2" fill="#FDE68A" stroke="${LINE}" stroke-width="0.7"/>
    <rect x="-76" y="-36" width="7" height="6" rx="2" fill="#F87171" stroke="${LINE}" stroke-width="0.7"/>
  </g>${wheel(-44)}${wheel(46)}`;
}

// ── Cô mèo Kitty (trắng, mắt xanh lá, mũi hồng, vòng cổ hồng; nhìn nghiêng, quay sang phải). Dùng chung class dg-* với chó
// nên đứng / ngồi / vẫy đuôi / nhảy / đi đều chạy bằng CSS của chó (stage.js gắn cả es-dog lẫn es-cat).
const CAT = '#FFFFFF', CAT_D = '#E2E8F0', CAT_P = '#F9A8D4';
function catHead(x, y) {
  return `<g transform="translate(${x} ${y})"><g class="dg-head">
    <path d="M-10 -5 L-9 -20 L0 -10Z M2 -11 L10 -21 L11 -5Z" fill="${CAT}" stroke="${LINE}" stroke-width="0.9" stroke-linejoin="round"/>
    <path d="M-7.6 -9 L-7.4 -16 L-3 -11Z M4 -11 L8.6 -17 L8.8 -8Z" fill="${CAT_P}"/>
    <circle r="11" fill="${CAT}" stroke="${LINE}" stroke-width="1"/>
    <g class="dg-eye" style="transform-origin:3px -2px"><ellipse cx="3" cy="-2" rx="2.6" ry="3.2" fill="#22C55E" stroke="${LINE}" stroke-width="0.6"/><ellipse cx="3.4" cy="-2" rx="0.9" ry="2.4" fill="#14291C"/></g>
    <path d="M10.6 1.6 l-2.4 -0.4 l1 2Z" fill="${CAT_P}" stroke="${LINE}" stroke-width="0.5"/>
    <g class="dg-mouth-c"><path d="M9.4 4 q-1 2 -3 1.6" stroke="${LINE}" stroke-width="0.8" fill="none" stroke-linecap="round"/></g>
    <g class="dg-mouth-o"><path d="M6 4.4 q2 4 4.6 -0.4Z" fill="#B4363C" stroke="${LINE}" stroke-width="0.6"/></g>
    <path d="M8 3 L19 1 M8 4.4 L19 5.6" stroke="#94A3B8" stroke-width="0.6"/>
    <ellipse cx="-1" cy="4" rx="2.4" ry="1.4" fill="#F9A8A8" opacity="0.7"/>
  </g></g>`;
}
function catTail(x, y) {
  return `<g transform="translate(${x} ${y})"><g class="dg-tail"><path d="M0 0 Q-16 -2 -14 -18 Q-12 -30 -20 -34" stroke="${LINE}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M0 0 Q-16 -2 -14 -18 Q-12 -30 -20 -34" stroke="${CAT}" stroke-width="4.2" fill="none" stroke-linecap="round"/></g></g>`;
}
function catLeg(x, cls, dark) {
  return `<g transform="translate(${x} -18)"><g class="${cls}"><path d="M0 0 L0 16" stroke="${LINE}" stroke-width="6.4" stroke-linecap="round"/>
    <path d="M0 0 L0 16" stroke="${dark ? CAT_D : CAT}" stroke-width="4.8" stroke-linecap="round"/></g></g>`;
}
export function catSvg() {
  const stand = `<g class="dg-stand">${catTail(-20, -26)}
    ${catLeg(-13, 'dg-legB2', true)}${catLeg(11, 'dg-legF2', true)}
    <ellipse cx="0" cy="-25" rx="22" ry="10" fill="${CAT}" stroke="${LINE}" stroke-width="1"/>
    ${catLeg(-16, 'dg-legB1')}${catLeg(14, 'dg-legF1')}
    <rect x="15" y="-36" width="4" height="9" rx="2" fill="#F472B6" stroke="${LINE}" stroke-width="0.6" transform="rotate(20 17 -32)"/>
    ${catHead(24, -40)}</g>`;
  const sit = `<g class="dg-sit">${catTail(-12, -4)}
    <ellipse cx="-4" cy="-10" rx="14" ry="10" fill="${CAT}" stroke="${LINE}" stroke-width="1"/>
    <path d="M-2 -8 Q4 -34 14 -38 L20 -28 Q16 -14 14 -2Z" fill="${CAT}" stroke="${LINE}" stroke-width="1"/>
    ${[9, 16].map((x) => `<path d="M${x} -20 L${x + 1} -2" stroke="${LINE}" stroke-width="6" stroke-linecap="round"/><path d="M${x} -20 L${x + 1} -2" stroke="${CAT}" stroke-width="4.4" stroke-linecap="round"/>`).join('')}
    <rect x="13" y="-38" width="4" height="9" rx="2" fill="#F472B6" stroke="${LINE}" stroke-width="0.6" transform="rotate(10 15 -34)"/>
    ${catHead(18, -46)}</g>`;
  return `<g class="dg-bob">${stand}${sit}</g>`;
}
