/**
 * Đồ nghề vẽ cảnh phim tranh Tiếng Việt 3 (tiengViet3/scenes/tuanNN.js), cùng kiểu Tuần 1–2:
 * màu phẳng tươi, viền nâu mảnh, không chữ trong tranh (trừ biển / bảng rất ngắn khi bài cần).
 *
 * Khung: vẽ trên nền W×H = 480×300 nhưng sân khấu chỉ lấy 360×300 từ x = 60 (cắt "slice"): hình chính
 * đặt trong x 100…380, mặt đất khoảng y 200…300, nhân vật đứng y ≈ 270–295 (s ≈ 0.85–1.1).
 * id trong <defs> phải riêng từng cảnh (vd. "t03s1sky") vì mọi cảnh của tuần cùng nằm trong trang.
 */
export const W = 480, H = 300;
export const LINE = '#6B4A3A';

export const svg = (label, inner) =>
  `<svg viewBox="60 0 360 ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}">${inner}</svg>`;

/** Bọc phần tử hiện từ câu/dòng n (đếm từ 1), ẩn từ câu off; talk: các câu nhân vật nói ("2,4"). */
export const at = (n, inner, { off, talk } = {}) =>
  `<g data-l="${n}"${off ? ` data-off="${off}"` : ''}${talk ? ` data-talk="${talk}"` : ''}>${inner}</g>`;
export const talkAt = (talk, inner) => `<g data-talk="${talk}">${inner}</g>`;

/** Trời: hai màu trên → dưới. */
export const sky = (id, top = '#7DD3FC', bottom = '#E0F2FE') =>
  `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#${id})"/>`;

export function cloud(x, y, s = 1, d = 0, fill = '#fff') {
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-drift" style="--d:${d}s">
    <ellipse cx="0" cy="0" rx="34" ry="14" fill="${fill}"/><ellipse cx="-16" cy="-8" rx="16" ry="12" fill="${fill}"/>
    <ellipse cx="12" cy="-12" rx="18" ry="14" fill="${fill}"/></g></g>`;
}

export function sun(x, y, r = 22, face = true) {
  return `<g transform="translate(${x} ${y})"><g class="sc-spin">
    ${Array.from({ length: 12 }, (_, i) => `<path d="M0 ${-r - 6} V${-r - 16}" stroke="#FACC15" stroke-width="4" stroke-linecap="round" transform="rotate(${i * 30})"/>`).join('')}
  </g><circle r="${r}" fill="#FDE047" stroke="#F59E0B" stroke-width="1.5"/>
  ${face ? `<circle cx="${-r * 0.3}" cy="${-r * 0.1}" r="2" fill="#92400E"/><circle cx="${r * 0.3}" cy="${-r * 0.1}" r="2" fill="#92400E"/>
  <path d="M${-r * 0.3} ${r * 0.3} Q0 ${r * 0.55} ${r * 0.3} ${r * 0.3}" stroke="#92400E" stroke-width="1.6" fill="none" stroke-linecap="round"/>` : ''}</g>`;
}

export function moon(x, y, r = 26) {
  return `<circle cx="${x}" cy="${y}" r="${r * 1.6}" fill="#FEF9C3" opacity="0.18"/><circle cx="${x}" cy="${y}" r="${r}" fill="#FEF08A"/>
    <circle cx="${x - r * 0.3}" cy="${y - r * 0.2}" r="${r * 0.15}" fill="#FDE047"/><circle cx="${x + r * 0.35}" cy="${y + r * 0.3}" r="${r * 0.1}" fill="#FDE047"/>`;
}

export const stars = (list, color = '#FEF3C7') => list.map(([x, y], i) =>
  `<circle class="sc-twinkle" style="--d:${(i * 0.4) % 2}s" cx="${x}" cy="${y}" r="${1.4 + (i % 3) * 0.7}" fill="${color}"/>`).join('');

/** Đồi cỏ lượn từ y tới đáy. */
export const grass = (y, c = '#4ADE80') => `<path d="M0 ${y} Q120 ${y - 18} 240 ${y - 6} T480 ${y - 8} V300 H0Z" fill="${c}"/>`;
export const tufts = (list, c = '#16A34A') => list.map(([x, y]) => `<path d="M${x} ${y} l-4 -12 M${x} ${y} l0 -15 M${x} ${y} l5 -11" stroke="${c}" stroke-width="2" stroke-linecap="round"/>`).join('');
export const flowers = (list) => list.map(([x, y, c]) => `<g transform="translate(${x} ${y})"><g class="sc-sway" style="--d:${(x % 5) / 2}s">
  <path d="M0 0 V-16" stroke="#16A34A" stroke-width="2"/>${[0, 72, 144, 216, 288].map(r => `<ellipse cy="-20" rx="2.6" ry="4" fill="${c}" transform="rotate(${r} 0 -16)"/>`).join('')}<circle cy="-16" r="2.4" fill="#FDE047"/></g></g>`).join('');

/** Cây tán tròn (y là gốc). */
export function tree(x, y, s = 1, leaf = '#22C55E', dark = '#16A34A') {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-6 0 L-4 -46 H4 L6 0Z" fill="#92400E"/>
    <g class="sc-sway" style="--d:${(x % 7) / 3}s"><circle cx="-18" cy="-52" r="22" fill="${dark}"/><circle cx="16" cy="-56" r="24" fill="${dark}"/>
    <circle cx="0" cy="-74" r="26" fill="${leaf}"/><circle cx="-12" cy="-60" r="18" fill="${leaf}"/><circle cx="14" cy="-62" r="16" fill="${leaf}"/></g></g>`;
}

export const pine = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-4" y="-30" width="8" height="30" fill="#8B5A2B"/>
  ${[0, 1, 2].map(i => `<path d="M${-30 + i * 6} ${-26 - i * 26} L0 ${-70 - i * 26} L${30 - i * 6} ${-26 - i * 26}Z" fill="${i % 2 ? '#2F8F4E' : '#257A41'}"/>`).join('')}</g>`;

/** Cây trơ cành mùa đông, vài lá úa (leaves = số lá). */
export function bareTree(x, y, s = 1, leaves = 6) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-5 0 L-3 -50 L-24 -86 M-3 -50 L2 -96 M0 -60 L26 -88 M-12 -66 L-30 -70 M14 -74 L30 -74" stroke="#78350F" stroke-width="6" stroke-linecap="round" fill="none"/>
    ${Array.from({ length: leaves }, (_, i) => `<ellipse cx="${-26 + i * 11}" cy="${-84 + (i % 3) * 8}" rx="4" ry="2.4" fill="${i % 2 ? '#CA8A04' : '#D97706'}"/>`).join('')}</g>`;
}

/** Lá rơi chéo xuống: list [[x, y, màu, trễ]]. */
export function leaves(list) {
  return list.map(([x, y, c, d], i) => `
    <g transform="translate(${x} ${y})"><g class="sc-fall" style="--d:${d ?? i * 1.3}s">
      <path d="M0 -8 Q8 -6 7 2 Q4 9 0 10 Q-4 9 -7 2 Q-8 -6 0 -8Z" fill="${c}"/>
      <path d="M0 -6 V9" stroke="#92400E" stroke-width="1" opacity="0.5"/>
    </g></g>`).join('');
}

/** Lấp lánh 4 cánh. */
export const sparkle = (x, y, r = 8, color = '#FDE047', d = 0) =>
  `<path class="sc-twinkle" style="--d:${d}s" d="M${x} ${y - r} L${x + r * 0.25} ${y - r * 0.25} L${x + r} ${y} L${x + r * 0.25} ${y + r * 0.25} L${x} ${y + r} L${x - r * 0.25} ${y + r * 0.25} L${x - r} ${y} L${x - r * 0.25} ${y - r * 0.25}Z" fill="${color}"/>`;
export const sparkles = (list, color) => list.map(([x, y, r], i) => sparkle(x, y, r || 7, color, i * 0.4)).join('');

/** Bong bóng lời nói (đuôi nhọn trỏ về (tx, ty)); inner vẽ quanh (0, 0) của bong bóng. */
export function speech(x, y, w, h, tx, ty, inner, fill = '#fff') {
  const bx = Math.max(x - w / 2 + 10, Math.min(x + w / 2 - 22, tx - 6));
  return `<g>
    <path d="M${bx} ${y + h / 2 - 2} L${tx} ${ty} L${bx + 14} ${y + h / 2 - 2}Z" fill="${fill}" stroke="#94A3B8" stroke-width="1.5" stroke-linejoin="round"/>
    <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${Math.min(h / 2.2, 16)}" fill="${fill}" stroke="#94A3B8" stroke-width="1.5"/>
    <path d="M${bx + 1} ${y + h / 2 - 1.6} H${bx + 13}" stroke="${fill}" stroke-width="3"/>
    <g transform="translate(${x} ${y})">${inner}</g></g>`;
}

/** Bong bóng ý nghĩ / hồi tưởng (đuôi chấm tròn trỏ về (tx, ty)). */
export function thought(x, y, w, h, tx, ty, inner) {
  return `<g>
    <circle cx="${tx}" cy="${ty}" r="3" fill="#fff" stroke="#94A3B8"/><circle cx="${(tx * 2 + x) / 3}" cy="${(ty * 2 + y + h / 2) / 3}" r="5" fill="#fff" stroke="#94A3B8"/>
    <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2.4}" fill="#fff" stroke="#94A3B8" stroke-width="1.5"/>
    <g transform="translate(${x} ${y})">${inner}</g></g>`;
}

/** Chữ ngắn trong bong bóng (vd. "!", "?", "…", "♪"). */
export const word = (t, size = 18, color = '#9D174D', x = 0, y = 0) =>
  `<text x="${x}" y="${y}" font-size="${size}" font-weight="800" fill="${color}" text-anchor="middle" dominant-baseline="central" font-family="Quicksand, Nunito, sans-serif">${t}</text>`;

/** Nốt nhạc / sóng âm lan ra. */
export const soundWaves = (x, y, s = 1, color = '#F59E0B') => `<g transform="translate(${x} ${y}) scale(${s})">
  ${[10, 18, 26].map((r, i) => `<path class="sc-twinkle" style="--d:${i * 0.3}s" d="M${r * 0.5} ${-r * 0.8} Q${r} 0 ${r * 0.5} ${r * 0.8}" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}</g>`;

/** Trái tim nhỏ bay lên. */
export const heart = (x, y, s = 1, color = '#F43F5E', d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:${d}s">
  <path d="M0 6 C-12 -2 -8 -12 0 -6 C8 -12 12 -2 0 6Z" fill="${color}"/></g></g>`;

/** Ngôi trường mái đỏ có cờ (x, y: góc trái dưới; w rộng). */
export function school(x, y, w = 230, h = 120) {
  const cols = Math.max(3, Math.round(w / 52));
  return `<g>
    <rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#FDE68A" stroke="${LINE}" stroke-width="1"/>
    <path d="M${x - 10} ${y - h + 4} L${x + w / 2} ${y - h - 44} L${x + w + 10} ${y - h + 4}Z" fill="#DC2626" stroke="${LINE}" stroke-width="1"/>
    ${Array.from({ length: cols }, (_, i) => {
      const wx = x + 18 + i * (w - 36) / cols + ((w - 36) / cols - 26) / 2;
      return `<rect x="${wx}" y="${y - h + 22}" width="26" height="26" rx="3" fill="#7DD3FC" stroke="#fff" stroke-width="3"/>
        ${i === Math.floor(cols / 2) ? '' : `<rect x="${wx}" y="${y - h + 64}" width="26" height="26" rx="3" fill="#7DD3FC" stroke="#fff" stroke-width="3"/>`}`;
    }).join('')}
    <rect x="${x + w / 2 - 17}" y="${y - 58}" width="34" height="58" rx="4" fill="#92400E"/>
    <rect x="${x + w / 2 - 35}" y="${y - h - 18}" width="70" height="16" rx="3" fill="#fff"/><path d="M${x + w / 2 - 25} ${y - h - 10} h50" stroke="#2563EB" stroke-width="3"/>
  </g>`;
}

/** Cột cờ Tổ quốc (x: chân cột, y: mặt đất). */
export function flagPole(x, y, h = 150) {
  return `<rect x="${x - 2}" y="${y - h}" width="4" height="${h}" fill="#64748B"/>
    <g class="sc-sway" style="--d:0s"><rect x="${x + 2}" y="${y - h + 2}" width="40" height="26" fill="#DA251D"/>
    <polygon points="${x + 22},${y - h + 8} ${x + 24.3},${y - h + 13.6} ${x + 30.3},${y - h + 13.9} ${x + 25.6},${y - h + 17.6} ${x + 27.3},${y - h + 23.4} ${x + 22},${y - h + 20} ${x + 16.7},${y - h + 23.4} ${x + 18.4},${y - h + 17.6} ${x + 13.7},${y - h + 13.9} ${x + 19.7},${y - h + 13.6}" fill="#FFFF00"/></g>`;
}

/** Trong lớp học: tường, bảng xanh, sàn (floorY). */
export function classroom(floorY = 210, wall = '#FEF3C7') {
  return `<rect width="${W}" height="${H}" fill="${wall}"/>
    <rect y="${floorY}" width="${W}" height="${H - floorY}" fill="#E7C9A1"/>
    <path d="M0 ${floorY} H${W}" stroke="#B88A5F" stroke-width="3"/>
    <rect x="150" y="40" width="190" height="104" rx="4" fill="#166534" stroke="#92400E" stroke-width="7"/>
    <path d="M168 64 h70 M168 84 h110 M168 104 h50" stroke="#DCFCE7" stroke-width="2.4" stroke-linecap="round" opacity="0.7"/>
    <rect x="66" y="50" width="56" height="70" rx="3" fill="#BAE6FD" stroke="#fff" stroke-width="5"/><path d="M94 50 V120 M66 85 H122" stroke="#fff" stroke-width="3"/>
    <rect x="368" y="50" width="56" height="70" rx="3" fill="#BAE6FD" stroke="#fff" stroke-width="5"/><path d="M396 50 V120 M368 85 H424" stroke="#fff" stroke-width="3"/>`;
}

/** Bàn học sinh (x giữa, y mặt sàn), che chân người ngồi sau. */
export const desk = (x, y, w = 90, color = '#C08457') => `<g>
  <rect x="${x - w / 2}" y="${y - 44}" width="${w}" height="9" rx="2" fill="${color}" stroke="${LINE}" stroke-width="1"/>
  <rect x="${x - w / 2 + 4}" y="${y - 35}" width="${w - 8}" height="30" fill="${color}" opacity="0.85" stroke="${LINE}" stroke-width="1"/>
  <rect x="${x - w / 2 + 4}" y="${y - 6}" width="6" height="6" fill="${LINE}"/><rect x="${x + w / 2 - 10}" y="${y - 6}" width="6" height="6" fill="${LINE}"/></g>`;

/** Mâm / bàn thấp (x giữa, y mặt sàn). */
export const lowTable = (x, y, w = 120, color = '#B45309') => `<ellipse cx="${x}" cy="${y - 18}" rx="${w / 2}" ry="${w / 8}" fill="${color}" stroke="${LINE}" stroke-width="1"/>
  <path d="M${x - w / 2} ${y - 18} V${y - 12} Q${x} ${y - 12 + w / 8} ${x + w / 2} ${y - 12} V${y - 18}" fill="#92400E" stroke="${LINE}" stroke-width="1"/>`;

/** Nhà mái tranh (x giữa, y nền). */
export function thatchHouse(x, y, w = 150, h = 60) {
  return `<g>
    <rect x="${x - w / 2 + 10}" y="${y - h}" width="${w - 20}" height="${h}" fill="#E8C99B" stroke="${LINE}" stroke-width="1"/>
    <path d="M${x - w / 2 - 12} ${y - h + 6} L${x - w / 2 + 26} ${y - h - 46} H${x + w / 2 - 26} L${x + w / 2 + 12} ${y - h + 6}Z" fill="#D4A54A" stroke="#92400E" stroke-width="1.2"/>
    ${Array.from({ length: 7 }, (_, i) => `<path d="M${x - w / 2 + i * w / 6} ${y - h + 4} l6 -12" stroke="#B7862F" stroke-width="1.4"/>`).join('')}
    <rect x="${x - 14}" y="${y - h + 18}" width="28" height="${h - 18}" fill="#7C4A21"/>
    <rect x="${x - w / 2 + 22}" y="${y - h + 16}" width="22" height="18" fill="#7C4A21"/><path d="M${x - w / 2 + 28} ${y - h + 16} v18 M${x - w / 2 + 38} ${y - h + 16} v18" stroke="#E8C99B" stroke-width="1.6"/>
  </g>`;
}

/** Nhà phố nhiều tầng làm nền (list [[x, rộng, cao, màu]], y mặt đất). */
export const cityRow = (y, list) => list.map(([x, w, h, c], i) => `<g>
  <rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${c}" stroke="${LINE}" stroke-width="0.8"/>
  ${Array.from({ length: Math.floor((h - 16) / 22) }, (_, r) => Array.from({ length: Math.floor((w - 8) / 16) }, (_, k) =>
    `<rect x="${x + 8 + k * 16}" y="${y - h + 10 + r * 22}" width="9" height="12" fill="${(r + k + i) % 4 ? '#E0F2FE' : '#FDE68A'}"/>`).join('')).join('')}</g>`).join('');

/** Đường đất / đường làng từ trái sang phải. */
export const path = (y1, y2, w = 26, c = '#E7C9A1') => `<path d="M0 ${y1} Q240 ${(y1 + y2) / 2 - 20} 480 ${y2}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;

/** Ngọn lửa bập bùng (x giữa, y chân). */
export function fire(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="0" cy="-18" r="34" fill="#FDBA74" opacity="0.25"/>
    <path d="M-20 0 L20 -6 M-20 -6 L20 0" stroke="#78350F" stroke-width="6" stroke-linecap="round"/>
    <g class="sc-sway" style="--d:0.2s"><path d="M-14 -4 Q-18 -24 -4 -40 Q-2 -26 6 -30 Q4 -44 12 -50 Q22 -30 14 -4Z" fill="#F97316"/></g>
    <g class="sc-sway" style="--d:1s"><path d="M-8 -4 Q-10 -18 -1 -28 Q2 -18 8 -20 Q12 -12 8 -4Z" fill="#FDE047"/></g></g>`;
}
