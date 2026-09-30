/**
 * Hình vẽ trò 🐜 Chú kiến tìm đường (lớp 2). Nét và màu theo bộ vẽ lại của vở (INK #3F3A40, màu phẳng).
 *   antTopSvg()       kiến nhìn từ trên (đầu quay về +x), đi thì chân đưa qua lại (lớp g2a-walking)
 *   antNpcUrl(mood)   Kiến Vàng đứng (người giao việc), ba nét mặt wait / happy / sad, ảnh data: URL
 *   nestSvg()         tổ kiến (ụ đất có lỗ)
 *   sugarSvg()        hạt đường (khối vuông trắng) có chấm ở tâm: là "điểm" của bài
 *   groundSvg()       nền đất nhìn từ trên (hạt sỏi nhỏ, cỏ ở góc); water: vũng nước (quầy sỏi tứ giác)
 *   pencilSvg()       bút chì (vẽ đoạn thẳng)
 *   antIcon()         biểu tượng nhỏ cho biển hiệu, dải hướng dẫn
 * Thước dùng lại rulerSvg() của quầy ruy băng lớp 3 (grade3Games/art/ribbon.js).
 */

export const INK = '#3F3A40';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const FONT = "'Baloo 2', Quicksand, sans-serif";

const GOLD = '#F2A93B', GOLD_D = '#C97A1A', GOLD_L = '#FFD27A';

/** Kiến nhìn từ trên, tâm (0, 0), đầu quay về +x, dài ≈ 1.3 × s. carry: tha một mẩu bánh. */
export function antTopSvg(s = 40, { carry = false } = {}) {
  const k = s / 40;
  const leg = (x, side, cls, bend) => {
    const y0 = side * 4 * k, y1 = side * 13 * k, y2 = side * 19 * k;
    return `<path class="${cls}" d="M${f1(x * k)} ${f1(y0)} L${f1((x + bend * 0.5) * k)} ${f1(y1)} L${f1((x + bend) * k)} ${f1(y2)}" fill="none" stroke="${INK}" stroke-width="${f1(2.6 * k)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  };
  // Dáng đi ba chân: chân trước, chân sau bên này cùng chân giữa bên kia đưa cùng lúc.
  const legs = [
    leg(4, -1, 'g2a-leg-a', 9), leg(0, -1, 'g2a-leg-b', 0), leg(-4, -1, 'g2a-leg-a', -9),
    leg(4, 1, 'g2a-leg-b', 9), leg(0, 1, 'g2a-leg-a', 0), leg(-4, 1, 'g2a-leg-b', -9),
  ].join('');
  const crumb = carry ? `<path d="M${f1(24 * k)} ${f1(-7 * k)} q${f1(9 * k)} ${f1(-3 * k)} ${f1(13 * k)} ${f1(3 * k)} q${f1(3 * k)} ${f1(7 * k)} ${f1(-4 * k)} ${f1(10 * k)} q${f1(-9 * k)} ${f1(1 * k)} ${f1(-10 * k)} ${f1(-5 * k)} z" fill="#F5D08A" stroke="${INK}" stroke-width="${f1(2 * k)}"/><circle cx="${f1(30 * k)}" cy="${f1(-1 * k)}" r="${f1(1.3 * k)}" fill="#C98A3C"/>` : '';
  return `<g class="g2a-ant-body">
    ${legs}
    <path d="M${f1(14 * k)} ${f1(-3 * k)} q${f1(6 * k)} ${f1(-8 * k)} ${f1(13 * k)} ${f1(-8 * k)} M${f1(14 * k)} ${f1(3 * k)} q${f1(6 * k)} ${f1(8 * k)} ${f1(13 * k)} ${f1(8 * k)}" fill="none" stroke="${INK}" stroke-width="${f1(2.2 * k)}" stroke-linecap="round"/>
    <ellipse cx="${f1(-15 * k)}" cy="0" rx="${f1(12 * k)}" ry="${f1(9.5 * k)}" fill="${GOLD}" stroke="${INK}" stroke-width="${f1(2.6 * k)}"/>
    <path d="M${f1(-20 * k)} ${f1(-8 * k)} q${f1(-3 * k)} ${f1(8 * k)} 0 ${f1(16 * k)} M${f1(-13 * k)} ${f1(-9 * k)} q${f1(-3 * k)} ${f1(9 * k)} 0 ${f1(18 * k)}" fill="none" stroke="${GOLD_D}" stroke-width="${f1(2 * k)}" stroke-linecap="round"/>
    <ellipse cx="0" cy="0" rx="${f1(6.5 * k)}" ry="${f1(5 * k)}" fill="${GOLD}" stroke="${INK}" stroke-width="${f1(2.4 * k)}"/>
    <circle cx="${f1(12 * k)}" cy="0" r="${f1(7 * k)}" fill="${GOLD}" stroke="${INK}" stroke-width="${f1(2.4 * k)}"/>
    <circle cx="${f1(15 * k)}" cy="${f1(-3.2 * k)}" r="${f1(1.8 * k)}" fill="${INK}"/><circle cx="${f1(15 * k)}" cy="${f1(3.2 * k)}" r="${f1(1.8 * k)}" fill="${INK}"/>
    <ellipse cx="${f1(-18 * k)}" cy="${f1(-3.5 * k)}" rx="${f1(4 * k)}" ry="${f1(2.2 * k)}" fill="${GOLD_L}" opacity=".8"/>
    ${crumb}
  </g>`;
}

/** Kiến Vàng đứng thẳng (NPC): đầu to, mắt tròn, bụng sọc; ba nét mặt. */
function antNpcSvg(mood = 'wait') {
  const happy = mood === 'happy', sad = mood === 'sad';
  const ant = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} Q${(x1 + x2) / 2 + (x2 > x1 ? -10 : 10)} ${Math.min(y1, y2) - 16} ${x2} ${y2}" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="9" fill="${GOLD}" stroke="${INK}" stroke-width="4"/>`;
  const antennae = sad ? ant(80, 42, 44, 40) + ant(120, 42, 156, 40) : ant(82, 38, 58, 4) + ant(118, 38, 142, 4);
  const arms = happy
    ? `<path d="M70 170 Q46 150 40 118" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M130 170 Q154 150 160 118" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><circle cx="40" cy="114" r="8" fill="${GOLD}" stroke="${INK}" stroke-width="4"/><circle cx="160" cy="114" r="8" fill="${GOLD}" stroke="${INK}" stroke-width="4"/>`
    : sad
      ? `<path d="M72 172 Q56 192 60 214" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M128 172 Q144 192 140 214" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><circle cx="60" cy="217" r="8" fill="${GOLD}" stroke="${INK}" stroke-width="4"/><circle cx="140" cy="217" r="8" fill="${GOLD}" stroke="${INK}" stroke-width="4"/>`
      : `<path d="M72 170 Q48 176 44 198" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M128 170 Q150 160 156 140" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><circle cx="44" cy="201" r="8" fill="${GOLD}" stroke="${INK}" stroke-width="4"/><circle cx="156" cy="136" r="8" fill="${GOLD}" stroke="${INK}" stroke-width="4"/>
         <path d="M146 128 q12 -10 24 -2 q6 12 -6 18 q-14 4 -20 -6 z" fill="#F5D08A" stroke="${INK}" stroke-width="3.5"/><circle cx="158" cy="126" r="2.4" fill="#C98A3C"/><circle cx="164" cy="134" r="2" fill="#C98A3C"/>`;
  const eyes = happy
    ? `<path d="M68 88 q12 -14 24 0" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M108 88 q12 -14 24 0" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`
    : `<ellipse cx="80" cy="88" rx="13" ry="15" fill="#fff" stroke="${INK}" stroke-width="3.5"/><ellipse cx="120" cy="88" rx="13" ry="15" fill="#fff" stroke="${INK}" stroke-width="3.5"/>
       <circle cx="${sad ? 79 : 83}" cy="${sad ? 94 : 90}" r="7.5" fill="${INK}"/><circle cx="${sad ? 119 : 123}" cy="${sad ? 94 : 90}" r="7.5" fill="${INK}"/>
       <circle cx="${sad ? 82 : 86}" cy="${sad ? 91 : 87}" r="2.6" fill="#fff"/><circle cx="${sad ? 122 : 126}" cy="${sad ? 91 : 87}" r="2.6" fill="#fff"/>
       ${sad ? `<path d="M64 70 L92 78 M136 70 L108 78" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>` : ''}`;
  const mouth = happy
    ? `<path d="M82 112 Q100 136 118 112 Z" fill="#E5484D" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><path d="M90 124 q10 6 20 0" fill="none" stroke="#F9A8B4" stroke-width="4" stroke-linecap="round"/>`
    : sad
      ? `<path d="M86 124 Q100 112 114 124" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
      : `<path d="M86 114 Q100 126 114 114" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -36 200 316">
    <path d="M78 236 L64 272 M122 236 L136 272 M90 240 L86 274 M110 240 L114 274" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="62" cy="273" rx="11" ry="6" fill="${GOLD_D}" stroke="${INK}" stroke-width="3.5"/><ellipse cx="138" cy="273" rx="11" ry="6" fill="${GOLD_D}" stroke="${INK}" stroke-width="3.5"/>
    <ellipse cx="100" cy="212" rx="44" ry="38" fill="${GOLD}" stroke="${INK}" stroke-width="4.5"/>
    <path d="M62 204 Q100 218 138 204 M60 222 Q100 238 140 222" fill="none" stroke="${GOLD_D}" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="84" cy="196" rx="12" ry="7" fill="${GOLD_L}" opacity=".8"/>
    <ellipse cx="100" cy="166" rx="26" ry="18" fill="${GOLD}" stroke="${INK}" stroke-width="4.5"/>
    ${arms}
    ${antennae}
    <circle cx="100" cy="94" r="56" fill="${GOLD}" stroke="${INK}" stroke-width="4.5"/>
    <ellipse cx="78" cy="62" rx="16" ry="9" fill="${GOLD_L}" opacity=".85" transform="rotate(-24 78 62)"/>
    <ellipse cx="62" cy="112" rx="10" ry="6" fill="#F59E8B" opacity=".75"/><ellipse cx="138" cy="112" rx="10" ry="6" fill="#F59E8B" opacity=".75"/>
    ${eyes}${mouth}
    ${sad ? `<path d="M140 100 q-6 12 0 16 q6 -4 0 -16 z" fill="#7DD3FC" stroke="${INK}" stroke-width="2"/>` : ''}
  </svg>`;
}
const toUrl = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.replace(/\s+/g, ' '))}`;
const NPC_URLS = {};
export const antNpcUrl = (mood = 'wait') => (NPC_URLS[mood] ||= toUrl(antNpcSvg(mood)));

/** Tổ kiến: ụ đất có lỗ, tâm (x, y), bán kính r. */
export function nestSvg(x, y, r) {
  return `<g class="g2a-nest">
    <ellipse cx="${f1(x)}" cy="${f1(y + r * 0.08)}" rx="${f1(r * 1.12)}" ry="${f1(r * 0.95)}" fill="#A87444" opacity=".35"/>
    <ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(r)}" ry="${f1(r * 0.86)}" fill="#C08A55" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="${f1(x - r * 0.25)}" cy="${f1(y - r * 0.3)}" rx="${f1(r * 0.35)}" ry="${f1(r * 0.18)}" fill="#D9A874" opacity=".9"/>
    <ellipse cx="${f1(x)}" cy="${f1(y + r * 0.05)}" rx="${f1(r * 0.34)}" ry="${f1(r * 0.28)}" fill="#4A2F1B" stroke="${INK}" stroke-width="2.4"/>
    ${[[-0.8, 0.6], [0.75, 0.55], [0.55, -0.7], [-0.6, -0.65]].map(([dx, dy]) => `<circle cx="${f1(x + dx * r)}" cy="${f1(y + dy * r)}" r="${f1(r * 0.07)}" fill="#8A5A32"/>`).join('')}
  </g>`;
}

/** Hạt đường: khối vuông trắng xoay `rot` độ, tâm là một điểm (chấm đen nhỏ). */
export function sugarSvg(x, y, s, rot = 0) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})">
    <rect x="${f1(-s / 2)}" y="${f1(-s / 2)}" width="${f1(s)}" height="${f1(s)}" rx="${f1(s * 0.18)}" fill="#FFFFFF" stroke="${INK}" stroke-width="2.6"/>
    <path d="M${f1(-s / 2 + 3)} ${f1(s / 2 - 5)} L${f1(s / 2 - 5)} ${f1(-s / 2 + 3)}" stroke="#DCEBFA" stroke-width="${f1(s * 0.22)}" stroke-linecap="round"/>
  </g>`;
}

/** Nhãn chữ (tên điểm) có nền trắng tròn cho dễ đọc trên nền đất. */
export function letterSvg(x, y, text, fs, color = INK) {
  return `<g class="g2a-letter" pointer-events="none">
    <circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(fs * 0.62)}" fill="#FFFDF5" stroke="${color}" stroke-width="2" opacity=".95"/>
    <text x="${f1(x)}" y="${f1(y + fs * 0.35)}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="${f1(fs)}" fill="${color}">${text}</text>
  </g>`;
}

/** Nhãn độ dài "3 cm" trên nền trắng. */
export function tagSvg(x, y, text, fs, color = INK, cls = '') {
  const w = text.length * fs * 0.5 + fs * 0.7;
  return `<g class="g2a-tag ${cls}" pointer-events="none">
    <rect x="${f1(x - w / 2)}" y="${f1(y - fs * 0.72)}" width="${f1(w)}" height="${f1(fs * 1.3)}" rx="${f1(fs * 0.4)}" fill="#FFFDF5" stroke="${color}" stroke-width="2.2"/>
    <text x="${f1(x)}" y="${f1(y + fs * 0.3)}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="${f1(fs)}" fill="${color}">${text}</text>
  </g>`;
}

/** Nền đất nhìn từ trên: hạt sỏi nhỏ lấm tấm, bụi cỏ ở góc (rnd: hàm ngẫu nhiên 0–1 để mỗi lượt một khác). */
export function groundSvg(W, H, rnd, { water = false } = {}) {
  let out = `<rect x="0" y="0" width="${f1(W)}" height="${f1(H)}" rx="18" fill="#EAD7A6"/>`;
  for (let i = 0; i < 46; i++) {
    const x = rnd() * W, y = rnd() * H, r = 1.5 + rnd() * 3;
    out += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${i % 3 ? '#D8BF88' : '#CDB27A'}" opacity=".8"/>`;
  }
  if (water) {
    out += `<rect x="${f1(W * 0.1)}" y="${f1(H * 0.06)}" width="${f1(W * 0.8)}" height="${f1(H * 0.88)}" rx="${f1(Math.min(W, H) * 0.18)}" fill="#9ED6EE" stroke="#6BB7DA" stroke-width="4"/>`
      + Array.from({ length: 6 }, () => `<path class="g2a-ripple" d="M${f1(W * (0.18 + rnd() * 0.6))} ${f1(H * (0.12 + rnd() * 0.76))} q12 -7 24 0 t24 0" fill="none" stroke="#DDF2FB" stroke-width="3" stroke-linecap="round"/>`).join('');
  }
  const tuft = (x, y, s) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><path d="M-14 6 Q-12 -14 -4 -20 Q-6 -6 -2 4 Q0 -22 6 -26 Q6 -8 4 4 Q10 -16 18 -18 Q12 -4 12 6 Z" fill="#86C06C" stroke="#4E8A3A" stroke-width="2.4" stroke-linejoin="round"/></g>`;
  out += tuft(22, H - 10, 1) + tuft(W - 26, 22, 0.9) + tuft(W - 20, H - 12, 0.8) + tuft(18, 26, 0.75);
  return out;
}

/** Bút chì nằm nghiêng, đầu chì ở (x, y), thân chéo lên phải. */
export function pencilSvg(x, y, s = 40) {
  const k = s / 40;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(-50) scale(${f1(k)})" pointer-events="none">
    <path d="M0 0 L10 -5 L10 5 Z" fill="#F5D08A" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M0 0 L3.6 -1.8 L3.6 1.8 Z" fill="${INK}"/>
    <rect x="10" y="-5" width="40" height="10" fill="#FACC15" stroke="${INK}" stroke-width="2.4"/>
    <rect x="50" y="-5" width="6" height="10" fill="#CBD5E1" stroke="${INK}" stroke-width="2.4"/>
    <rect x="56" y="-5" width="7" height="10" rx="3" fill="#F9A8B4" stroke="${INK}" stroke-width="2.4"/>
  </g>`;
}

/** Biểu tượng kiến (biển hiệu, dải hướng dẫn). */
export const antIcon = (size = 40, rot = -30) =>
  `<svg viewBox="-34 -34 68 68" width="${size}" height="${size}" aria-hidden="true"><g transform="rotate(${rot})">${antTopSvg(40)}</g></svg>`;
