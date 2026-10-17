// Cảnh phim bài thơ "Mùa thu của em" (Quang Huy), Tuần 1 Tiếng Việt 3: mỗi khổ một cảnh.
// Phần tử có data-l="k" hiện ra khi đọc tới dòng thứ k của khổ (poemPlayer.js), để bé nhớ dòng thơ gắn với hình.
// Lớp chuyển động: sc-sway (đung đưa), sc-bob (nhấp nhô), sc-drift (mây trôi), sc-fall (lá rơi),
// sc-twinkle (sao lấp lánh), sc-blink (mắt chớp), sc-rise (hương bay), sc-flip (lật trang), sc-walk (đi tới).
// data-off="m": hình ẩn đi từ dòng m (để đổi dáng nhân vật). Nhân vật: cast.js (Linh là "em" của bài thơ).
import { person } from '../cast.js';

// Vẽ trên nền rộng W×H nhưng chỉ lấy khung 360×300 từ x = 60 (khung sân khấu gần vuông, cắt kiểu "slice"):
// hình chính nằm trong x 100…380 để màn vuông vẫn thấy đủ; màn rộng thì cắt bớt trời và đất.
const W = 480, H = 300;
const svg = (label, inner) =>
  `<svg viewBox="60 0 360 ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}">${inner}</svg>`;

/** Lá thu vàng / cam rơi chéo xuống. */
function leaves(list, line = 1) {
  return `<g data-l="${line}">${list.map(([x, y, c, d], i) => `
    <g transform="translate(${x} ${y})"><g class="sc-fall" style="--d:${d ?? i * 1.3}s">
      <path d="M0 -8 Q8 -6 7 2 Q4 9 0 10 Q-4 9 -7 2 Q-8 -6 0 -8Z" fill="${c}"/>
      <path d="M0 -6 V9" stroke="#92400E" stroke-width="1" opacity="0.5"/>
    </g></g>`).join('')}</g>`;
}

function cloud(x, y, s = 1, line, d = 0) {
  return `<g ${line ? `data-l="${line}"` : ''}><g transform="translate(${x} ${y}) scale(${s})"><g class="sc-drift" style="--d:${d}s">
    <ellipse cx="0" cy="0" rx="34" ry="14" fill="#fff"/><ellipse cx="-16" cy="-8" rx="16" ry="12" fill="#fff"/>
    <ellipse cx="12" cy="-12" rx="18" ry="14" fill="#fff"/></g></g></g>`;
}

/** Một bông cúc vàng; tâm hoa là "con mắt" (hiện ở dòng 3), mở nhìn trời ở dòng 4. */
function cuc(x, y, r, i) {
  const petals = Array.from({ length: 16 }, (_, k) =>
    `<ellipse cx="0" cy="${-r * 0.62}" rx="${r * 0.2}" ry="${r * 0.48}" fill="${k % 2 ? '#FACC15' : '#FDE047'}" transform="rotate(${k * 22.5})"/>`).join('');
  const inner = Array.from({ length: 10 }, (_, k) =>
    `<ellipse cx="0" cy="${-r * 0.36}" rx="${r * 0.14}" ry="${r * 0.3}" fill="#EAB308" transform="rotate(${k * 36 + 18})"/>`).join('');
  return `<g transform="translate(${x} ${y})"><g class="sc-sway" style="--d:${(i * 0.37) % 2}s">
    <path d="M0 0 Q${r * 0.2} ${r * 1.4} 0 ${r * 2.6}" stroke="#15803D" stroke-width="${Math.max(2, r * 0.12)}" fill="none"/>
    <path d="M0 ${r * 1.5} q${r * 0.6} ${-r * 0.4} ${r * 0.9} ${-r * 0.1} q${-r * 0.4} ${r * 0.4} ${-r * 0.9} ${r * 0.1}Z" fill="#22C55E"/>
    ${petals}${inner}
    <circle r="${r * 0.3}" fill="#CA8A04"/>
    <g data-l="3"><g class="sc-blink" style="--d:${(i * 0.53) % 3}s">
      <ellipse rx="${r * 0.27}" ry="${r * 0.22}" fill="#fff"/>
      <circle cy="${-r * 0.03}" r="${r * 0.13}" fill="#3F2A1D" class="sc-look"/>
      <circle cx="${r * 0.05}" cy="${-r * 0.08}" r="${r * 0.04}" fill="#fff"/>
    </g></g>
  </g></g>`;
}

/** Lá sen tròn có khía. */
function laSen(x, y, r, tone = '#16A34A', line) {
  return `<g ${line ? `data-l="${line}"` : ''}><g transform="translate(${x} ${y})"><g class="sc-bob" style="--d:${(x % 7) / 3}s">
    <ellipse rx="${r}" ry="${r * 0.42}" fill="${tone}"/>
    <path d="M0 0 L${r * 0.35} ${-r * 0.42} L${r * 0.6} ${-r * 0.34}Z" fill="#7DD3FC"/>
    <path d="M0 0 L${-r * 0.8} ${-r * 0.1} M0 0 L${-r * 0.3} ${r * 0.38} M0 0 L${r * 0.7} ${r * 0.2}" stroke="#86EFAC" stroke-width="1.5" opacity="0.7"/>
  </g></g></g>`;
}

function hoaSen(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-sway" style="--d:0.6s">
    <path d="M0 40 Q3 20 0 0" stroke="#15803D" stroke-width="3" fill="none"/>
    <path d="M0 0 Q-20 -10 -16 -30 Q-4 -22 0 0Z" fill="#F9A8D4"/>
    <path d="M0 0 Q20 -10 16 -30 Q4 -22 0 0Z" fill="#F9A8D4"/>
    <path d="M0 0 Q-10 -20 0 -40 Q10 -20 0 0Z" fill="#F472B6"/>
  </g></g>`;
}

export default [
  // Khổ 1: vườn cúc vàng như nghìn con mắt mở nhìn trời êm
  () => svg('Vườn hoa cúc vàng dưới bầu trời thu', `
    <defs><linearGradient id="s1sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7DD3FC"/><stop offset="1" stop-color="#E0F2FE"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#s1sky)"/>
    <circle cx="370" cy="50" r="22" fill="#FEF08A"/><circle cx="370" cy="50" r="34" fill="#FEF08A" opacity="0.35"/>
    ${cloud(140, 60, 1, 4, 0)}${cloud(260, 40, 0.8, 4, 2)}
    <g data-l="4"><path class="sc-bob" style="--d:1s" d="M180 90 q6 -6 12 0 q6 -6 12 0 M222 72 q5 -5 10 0 q5 -5 10 0" stroke="#334155" stroke-width="2" fill="none"/></g>
    <path d="M0 200 Q120 170 240 192 T480 186 V300 H0Z" fill="#86EFAC"/>
    <path d="M0 236 Q140 214 280 236 T480 228 V300 H0Z" fill="#4ADE80"/>
    <g data-l="1" data-off="4">${person(345, 268, 'linh', 'stand', { s: 1 })}</g>
    <g data-l="4">${person(345, 268, 'linh', 'lookUp', { s: 1 })}</g>
    ${leaves([[60, 30, '#F59E0B'], [200, 20, '#FB923C'], [330, 50, '#FBBF24'], [450, 110, '#F97316']])}
    <g data-l="2" class="sc-face-up">
      ${[[40, 222, 20], [92, 206, 24], [150, 228, 22], [206, 208, 26], [262, 232, 21], [318, 214, 23], [56, 266, 18], [124, 262, 20], [190, 270, 19], [250, 268, 20], [312, 270, 18], [370, 252, 22], [440, 262, 20]]
        .map(([x, y, r], i) => cuc(x, y, r, i)).join('')}
    </g>`),

  // Khổ 2: cốm xanh gói lá sen bên hồ sen, hương thơm bay lên
  () => svg('Cốm xanh gói trong lá sen bên hồ sen', `
    <rect width="${W}" height="${H}" fill="#E0F2FE"/>
    ${cloud(80, 50, 0.9, 0, 1)}${cloud(380, 40, 0.8, 0, 3)}
    <path d="M0 120 Q240 100 480 120 V300 H0Z" fill="#7DD3FC"/>
    <path d="M0 150 Q240 136 480 150" stroke="#BAE6FD" stroke-width="3" fill="none"/>
    <g data-l="4">
      ${laSen(60, 140, 34)}${laSen(170, 128, 26, '#22C55E')}${laSen(400, 136, 36)}${laSen(300, 160, 28, '#22C55E')}
      ${hoaSen(200, 104, 0.9)}${hoaSen(350, 118, 1)}
    </g>
    <g data-l="1">${person(132, 262, 'linh', 'wave', { s: 1 })}</g>
    <path d="M90 300 Q100 230 160 218 H380 Q440 230 450 300Z" fill="#D6A26B"/>
    <path d="M90 300 Q100 230 160 218 H380 Q440 230 450 300" stroke="#A16207" stroke-width="3" fill="none"/>
    <g data-l="2">
      <ellipse cx="270" cy="244" rx="104" ry="30" fill="#15803D"/>
      <ellipse cx="270" cy="240" rx="92" ry="22" fill="#22C55E"/>
      ${Array.from({ length: 70 }, (_, k) => {
        const a = k * 2.4, rr = 6 + (k * 7) % 72;
        const x = 270 + Math.cos(a) * rr, y = 236 + Math.sin(a) * rr * 0.22;
        return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="3.2" ry="1.8" fill="${k % 3 ? '#84CC16' : '#A3E635'}" transform="rotate(${(k * 37) % 180} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
      }).join('')}
      <path d="M200 226 Q270 196 340 226" stroke="#CA8A04" stroke-width="3" fill="none"/>
    </g>
    <g data-l="3">
      ${[[230, 0], [270, 1.2], [310, 2.4]].map(([x, d]) => `<path class="sc-rise" style="--d:${d}s" d="M${x} 214 q-10 -16 0 -32 q10 -16 0 -32 q-10 -16 0 -30" stroke="#BBF7D0" stroke-width="4" fill="none" stroke-linecap="round"/>`).join('')}
    </g>`),

  // Khổ 3: đêm rằm tháng Tám, các bạn rước đèn, chị Hằng trên trăng nhìn xuống
  () => svg('Đêm rằm tháng Tám, các bạn rước đèn ông sao', `
    <defs><radialGradient id="s3moon"><stop offset="0.6" stop-color="#FEF9C3"/><stop offset="1" stop-color="#FEF9C3" stop-opacity="0"/></radialGradient></defs>
    <rect width="${W}" height="${H}" fill="#1E1B4B"/>
    <path d="M0 0 H${W} V180 H0Z" fill="#312E81" opacity="0.6"/>
    ${[[30, 30], [110, 70], [170, 24], [240, 60], [300, 18], [60, 120], [200, 110], [450, 150], [20, 180], [290, 100]].map(([x, y], i) =>
      `<circle class="sc-twinkle" style="--d:${(i * 0.4) % 2}s" cx="${x}" cy="${y}" r="${1.5 + (i % 3)}" fill="#FEF3C7"/>`).join('')}
    <g data-l="3">
      <circle cx="310" cy="78" r="76" fill="url(#s3moon)"/>
      <circle cx="310" cy="78" r="50" fill="#FEF08A"/>
      <circle cx="292" cy="64" r="7" fill="#FDE047"/><circle cx="328" cy="98" r="5" fill="#FDE047"/>
      <path d="M80 44 Q160 28 240 44" stroke="#FBBF24" stroke-width="1.5" fill="none"/>
      ${[100, 130, 160, 190, 220].map((x, i) => `<g transform="translate(${x} ${38 - Math.sin((x - 80) / 160 * Math.PI) * 12})"><g class="sc-sway" style="--d:${i * 0.3}s">
        <rect x="-7" y="0" width="14" height="18" rx="5" fill="${['#EF4444', '#F97316', '#EAB308', '#EC4899', '#EF4444'][i]}"/></g></g>`).join('')}
    </g>
    <g data-l="4"><g class="sc-bob" style="--d:0.5s">${person(310, 124, 'chiHang', 'float', { s: 0.5 })}</g></g>
    <path d="M0 230 Q120 214 240 226 T480 222 V300 H0Z" fill="#14532D"/>
    <path d="M0 252 H480 V300 H0Z" fill="#166534"/>
    <g data-l="2">
      ${person(118, 282, 'nam', 'raise', { s: 0.92, prop: 'lantern', color: '#EF4444' })}
      ${person(190, 294, 'mai', 'raise', { s: 0.9, prop: 'lantern', color: '#F59E0B' })}
      ${person(262, 286, 'tun', 'raise', { s: 0.92, prop: 'lantern', color: '#EC4899' })}
    </g>
    <g data-l="1" data-off="2">${person(338, 290, 'linh', 'stand', { s: 0.95 })}</g>
    <g data-l="2">${person(338, 290, 'linh', 'raise', { s: 0.95, prop: 'lantern', color: '#EF4444' })}</g>`),

  // Khổ 4: ngôi trường thân quen, thầy và bạn đón em, lật trang vở mới
  () => svg('Ngôi trường ngày tựu trường mùa thu', `
    <rect width="${W}" height="${H}" fill="#BAE6FD"/>
    ${cloud(120, 30, 0.8, 0, 0)}${cloud(340, 24, 0.7, 0, 2)}
    <g data-l="1">
      <rect x="150" y="70" width="230" height="120" fill="#FDE68A"/>
      <path d="M140 74 L265 26 L390 74Z" fill="#DC2626"/>
      ${[170, 220, 290, 340].map(x => `<rect x="${x}" y="92" width="26" height="26" rx="3" fill="#7DD3FC" stroke="#fff" stroke-width="3"/><rect x="${x}" y="134" width="26" height="26" rx="3" fill="#7DD3FC" stroke="#fff" stroke-width="3"/>`).join('')}
      <rect x="248" y="130" width="34" height="60" rx="4" fill="#92400E"/>
      <rect x="230" y="52" width="70" height="16" rx="3" fill="#fff"/><path d="M240 60 h50" stroke="#2563EB" stroke-width="3"/>
      <rect x="110" y="40" width="4" height="150" fill="#64748B"/>
      <g class="sc-sway" style="--d:0s"><rect x="114" y="42" width="40" height="26" fill="#DA251D"/>
        <polygon points="134,48 136.3,53.6 142.3,53.9 137.6,57.6 139.3,63.4 134,60 128.7,63.4 130.4,57.6 125.7,53.9 131.7,53.6" fill="#FFFF00"/></g>
    </g>
    <circle cx="430" cy="140" r="44" fill="#FBBF24"/><circle cx="410" cy="118" r="30" fill="#F59E0B"/><rect x="424" y="150" width="10" height="44" fill="#92400E"/>
    <circle cx="40" cy="150" r="34" fill="#FCD34D"/><rect x="36" y="160" width="9" height="34" fill="#92400E"/>
    <rect y="188" width="${W}" height="112" fill="#D9F99D"/>
    <path d="M226 190 L200 300 H330 L304 190Z" fill="#E7E5E4"/>
    <g data-l="2">
      ${person(140, 270, 'coHuong', 'wave', { s: 0.9 })}
      ${person(316, 280, 'nam', 'wave', { s: 0.88 })}
      ${person(362, 290, 'minh', 'wave', { s: 0.88, flip: true })}
    </g>
    <g data-l="4"><g class="sc-walk" style="--d:0s">${person(244, 284, 'linh', 'walk', { s: 0.9, flip: true })}</g></g>
    <g data-l="3">
      <g transform="translate(92 22)">
      <path d="M20 300 L40 240 H130 L150 300Z" fill="#fff" stroke="#CBD5E1" stroke-width="2"/>
      <path d="M85 240 V300" stroke="#CBD5E1" stroke-width="2"/>
      ${[256, 266, 276].map(y => `<path d="M${46 - (y - 240) * 0.3} ${y} H80 M90 ${y} H${124 + (y - 240) * 0.3}" stroke="#93C5FD" stroke-width="1.5"/>`).join('')}
      <path class="sc-flip" d="M85 240 H130 L150 300 H85Z" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/></g>
    </g>
    ${leaves([[150, 10, '#F59E0B'], [300, 0, '#FB923C'], [420, 60, '#FBBF24'], [30, 80, '#F97316'], [220, 40, '#EAB308']], 4)}`),
];
