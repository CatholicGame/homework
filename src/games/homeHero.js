/**
 * Tranh đầu trang chủ: buổi sáng đến trường. Vẽ đúng lối tranh đầu trang app Kinh Thánh (E:\ManC\kinh-thanh\src\home.js
 * banner + film/sceneKit.js): màu phẳng tươi, viền nâu mảnh (LINE), mỗi hình có mặt đón nắng và mặt khuất pha từ một màu,
 * bóng mờ dưới gốc, đồi nhiều lớp có vệt sáng và lấm tấm.
 * Khung riêng 2000×300, cắt "slice" neo đáy: điện thoại chỉ thấy phần giữa (x ≈ 790…1210: ngôi trường, các bạn đi học,
 * mặt trời ở trái để không nằm dưới các nút góc phải), màn rộng thấy thêm đồi cây hai bên mà hình không bị phóng to.
 * Đoàn ba bạn đeo cặp (cast.js) đi từ bên phải tới cửa trường, đứng một lúc rồi mờ đi, lặp lại (như đoàn Ba Vua).
 * Chuyển động: sunny.css (.hm-hero-art .sc-* / .hh-*).
 */
import { LINE, cloud, sun, school, flagPole, flowers, tufts } from './tiengViet3/sceneKit.js';
import { person } from './tiengViet3/cast.js';

const f1 = (n) => +n.toFixed(1);

/** Màu c pha với màu t theo tỉ lệ k (giống mix() của sceneKit Kinh Thánh). */
export const mix = (c, t, k) => {
  const ch = (v, s) => (parseInt(v.slice(1), 16) >> s) & 255;
  return '#' + [16, 8, 0].map(s => Math.round(ch(c, s) * (1 - k) + ch(t, s) * k).toString(16).padStart(2, '0')).join('');
};

/** Tán lá nhiều chùm: viền nâu ôm tán, màu lá, mặt dưới phải khuất, mặt trên trái đón nắng, vài nét lá (crown của Kinh Thánh). */
const crown = (lobes, leaf, dark) => {
  const lit = mix(leaf, '#FFF7D6', 0.32), tick = mix(leaf, '#FFFFFF', 0.55), deep = mix(dark, '#1F2A14', 0.35);
  return lobes.map(([cx, cy, rx, ry]) => `<ellipse cx="${cx}" cy="${cy}" rx="${f1(rx + 1.1)}" ry="${f1(ry + 1.1)}" fill="${LINE}"/>`).join('')
    + lobes.map(([cx, cy, rx, ry]) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${leaf}"/>`).join('')
    + lobes.map(([cx, cy, rx, ry]) => `<ellipse cx="${f1(cx + rx * 0.2)}" cy="${f1(cy + ry * 0.32)}" rx="${f1(rx * 0.78)}" ry="${f1(ry * 0.58)}" fill="${dark}"/>`).join('')
    + lobes.map(([cx, cy, rx, ry]) => `<ellipse cx="${f1(cx - rx * 0.26)}" cy="${f1(cy - ry * 0.3)}" rx="${f1(rx * 0.52)}" ry="${f1(ry * 0.42)}" fill="${lit}"/>`).join('')
    + lobes.map(([cx, cy, rx, ry]) => `<path d="M${f1(cx - rx * 0.5)} ${f1(cy - ry * 0.1)} q3 -2 6 0 M${f1(cx + rx * 0.05)} ${f1(cy - ry * 0.45)} q3 -2 6 0" stroke="${tick}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
      <path d="M${f1(cx + rx * 0.3)} ${f1(cy + ry * 0.45)} q3 -2 6 0" stroke="${deep}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`).join('');
};

const limb = (d, w) => `<path d="${d}" stroke="${LINE}" stroke-width="${f1(w + 1.8)}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${d}" stroke="#8B5A2B" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

/** Cây tán tròn (y gốc, cao ≈ 110·s): gốc loe, thân có vân, cành chẻ vào tán, tán nhiều chùm sáng tối. */
const LOBES = [[-22, -54, 20, 16], [20, -58, 22, 17], [0, -60, 24, 15], [-28, -74, 17, 15], [26, -78, 18, 15], [0, -82, 26, 21], [-11, -98, 17, 13], [13, -100, 15, 12]];
export const tree = (x, y, s = 1, leaf = '#22C55E', dark = '#16A34A') => `<g transform="translate(${x} ${y}) scale(${s})">
  <ellipse cx="2" cy="1.5" rx="34" ry="4" fill="#000" opacity="0.1"/>
  <path d="M-9 0 Q-4 -4 -4 -16 L-3 -40 H3 L4 -16 Q4 -4 10 0Z" fill="#8B5A2B" stroke="${LINE}" stroke-width="0.9" stroke-linejoin="round"/>
  ${limb('M-2 -36 Q-8 -44 -17 -52 M2 -38 Q9 -46 17 -56 M0 -40 Q1 -52 -1 -62', 3.4)}
  <path d="M-1 -4 Q-2 -18 -1 -34" stroke="#5E3A1A" stroke-width="1" fill="none" opacity="0.8"/>
  <g class="sc-sway" style="--d:${(x % 7) / 3}s">${crown(LOBES, leaf, dark)}</g></g>`;

/** Cây xa trên đồi: chỉ tán tròn nhỏ, màu nhạt vào nền. */
const farTree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <rect x="-2" y="-14" width="4" height="14" fill="#9A7650"/>
  <ellipse cx="0" cy="-24" rx="13" ry="15" fill="#6FBF5C"/><ellipse cx="3" cy="-20" rx="9" ry="9" fill="#5FAE4E"/><ellipse cx="-4" cy="-29" rx="6" ry="6" fill="#93D47E"/></g>`;

/** Lấm tấm trên đồi (giả ngẫu nhiên, cố định giữa các lần vẽ). */
const rnd = (i, k) => { const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return v - Math.floor(v); };
const specks = (y0, y1, c, n, k) => Array.from({ length: n }, (_, i) =>
  `<ellipse cx="${f1(rnd(i, k) * 2000)}" cy="${f1(y0 + rnd(i, k + 1) * (y1 - y0))}" rx="${f1(1.2 + rnd(i, k + 2) * 1.8)}" ry="${f1(0.7 + rnd(i, k + 3) * 0.7)}" fill="${c}" opacity="0.5"/>`).join('');

/** Hai lớp đồi xanh nối hết 2000 đơn vị: đồi xa có vệt sáng sống đồi, đồi gần có viền tối mảnh, lấm tấm. */
function hills() {
  const far = '#A9DC8B', near = '#7DC965', front = '#66B84F';
  return `
  <path d="M0 214 Q160 176 330 204 T680 196 T1000 188 T1340 200 T1680 186 T2000 204 V300 H0Z" fill="${far}"/>
  <path d="M40 206 Q160 184 300 202 M720 192 Q860 176 990 186 M1360 196 Q1500 178 1660 186" stroke="${mix(far, '#FFFFFF', 0.4)}" stroke-width="1.6" fill="none" opacity="0.8" stroke-linecap="round"/>
  ${farTree(220, 200, 1)}${farTree(250, 204, 0.8)}${farTree(640, 198, 0.9)}${farTree(1420, 196, 1)}${farTree(1452, 199, 0.75)}${farTree(1840, 200, 0.9)}
  <path d="M0 252 Q200 226 420 244 T840 238 T1240 236 T1640 242 T2000 236 V300 H0Z" fill="${near}"/>
  <path d="M0 255 Q200 229 420 247 T840 241 T1240 239 T1640 245 T2000 239" stroke="${mix(near, '#2F5A1E', 0.3)}" stroke-width="1.2" fill="none" opacity="0.5"/>
  ${specks(248, 270, mix(near, '#2F5A1E', 0.3), 40, 3)}
  <path d="M0 282 Q260 266 520 276 T1040 274 T1560 278 T2000 270 V300 H0Z" fill="${front}"/>
  ${specks(282, 298, mix(front, '#234A16', 0.3), 30, 7)}`;
}

/** Đoàn ba bạn đeo cặp đi tới cửa trường (hh-walk): (x, y) là chân bạn đầu lúc dừng ở cửa. */
const KIDS = ['minh', 'linh', 'nam'];
const walkers = (x, y, s = 0.44, gap = 30) => `<g class="hh-walk"><g transform="translate(${x} ${y})">${KIDS.map((who, i) => `
  <g transform="translate(${i * gap} 0)"><g class="hh-step" style="--d:${i * 0.3}s">${person(0, 0, who, 'walk', { s, flip: true })}</g></g>`).join('')}</g></g>`;

export function heroArt() {
  return `
<svg viewBox="0 0 2000 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="hhSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5BC0F5"/><stop offset="1" stop-color="#D9F2FF"/></linearGradient></defs>
  <rect width="2000" height="300" fill="url(#hhSky)"/>
  <circle class="hh-glow" cx="880" cy="70" r="54" fill="#FEF9C3" opacity="0.35"/>
  ${sun(880, 70, 22)}
  ${cloud(330, 70, 1.1, 0)}${cloud(620, 40, 0.8, 3)}${cloud(1250, 74, 0.9, 6)}${cloud(1420, 46, 1, 2)}${cloud(1720, 84, 0.9, 5)}${cloud(1960, 40, 0.7, 1)}
  <g stroke="#2F6FA8" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.6">
    <path class="hh-flap" d="M980 40 q5 -5 10 0 q5 -5 10 0"/><path class="hh-flap" style="--d:0.3s" d="M1004 28 q4 -4 8 0 q4 -4 8 0"/>
    <path class="hh-flap" style="--d:0.5s" d="M520 110 q5 -5 10 0 q5 -5 10 0"/>
  </g>
  ${hills()}
  ${tree(470, 266, 0.85)}${tree(1700, 264, 0.95, '#34C26A', '#1F9D50')}${tree(1880, 272, 0.75)}${tree(140, 268, 0.8, '#34C26A', '#1F9D50')}
  ${flagPole(1012, 250, 118)}
  ${school(1030, 250, 170, 88)}
  <path d="M1103 250 Q1098 270 1070 300 H1150 Q1124 270 1127 250Z" fill="#EBD3A8" stroke="${LINE}" stroke-width="0.8"/>
  ${tree(940, 262, 0.82)}${tree(1290, 268, 1, '#34C26A', '#1F9D50')}
  ${walkers(1128, 272)}
  ${tufts([[300, 290], [700, 288], [860, 292], [1240, 294], [1560, 290], [1960, 292]])}
  ${flowers([[600, 292, '#F472B6'], [820, 296, '#FDE047'], [1210, 296, '#F472B6'], [1380, 292, '#fff'], [1600, 296, '#FB923C']])}
</svg>`;
}
