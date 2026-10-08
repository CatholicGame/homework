/**
 * Hình vẽ của trò 🛸 Bảo vệ Trái Đất (ufo.js), vẽ riêng theo nét của app: màu phẳng tươi, viền mực dày.
 * Mockup đã duyệt: docs/bao-ve-trai-dat/*.svg (thiết kế: docs/tro-choi-bao-ve-trai-dat.md).
 *   STARS: trời sao phủ kín vùng trời. MOON, PLANET: trăng, hành tinh Lộn Xộn (góc trời).
 *   citySvg(): dãy nhà đêm, mỗi ô cửa sổ là <rect class="ufo-win">; ô ở giữa có thêm .ufo-win-c (không bị cắt ở màn dọc).
 *   saucerSvg(color): đĩa bay có khiên (.ufo-shield), vết nứt (.ufo-crack), phi công cười / choáng (.ufo-eye-*, CSS bật tắt).
 *   MOTHER: tàu mẹ, ba vòng khiên .ufo-ring-1..3. CANNON: Pháo Ánh Sáng, nòng .ufo-barrel xoay quanh (0, -112).
 *   robotSvg(): Rô-bốt Bíp, ba nét mặt .bip-happy / .bip-think / .bip-alarm (CSS bật theo class của khung).
 */

import { INK } from './kit.js';

const S = (w = 4) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
function rng(seed) { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }

// ── Trời ────────────────────────────────────────────────────────────────────────────────────────────
const twinkle = (x, y, s, c = '#FDE68A', cls = '') =>
  `<path class="${cls}" d="M${x} ${y - s} L${x + s * 0.22} ${y - s * 0.22} L${x + s} ${y} L${x + s * 0.22} ${y + s * 0.22} L${x} ${y + s} L${x - s * 0.22} ${y + s * 0.22} L${x - s} ${y} L${x - s * 0.22} ${y - s * 0.22} Z" fill="${c}"/>`;
export const STARS = (() => {
  const r = rng(11);
  let o = '';
  for (let i = 0; i < 170; i++) {
    const x = r() * 1600, y = r() * 1000, rad = r() * 1.8 + 0.7;
    o += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad.toFixed(1)}" fill="#fff" opacity="${(0.35 + r() * 0.65).toFixed(2)}"/>`;
  }
  o += [[300, 90, 10], [880, 140, 12], [640, 380, 8], [1250, 300, 10], [120, 520, 9], [1450, 620, 8]]
    .map(([x, y, s], i) => twinkle(x, y, s, '#FDE68A', `ufo-tw ufo-tw${i % 3}`)).join('');
  return `<svg class="ufo-stars" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMin slice" aria-hidden="true">${o}</svg>`;
})();

export const MOON = `<svg class="ufo-moon" viewBox="-52 -52 104 104" aria-hidden="true"><circle r="46" fill="#FEF9C3" ${S(4)}/>
  <circle cx="-14" cy="-7" r="9" fill="#FDE68A"/><circle cx="17" cy="14" r="6" fill="#FDE68A"/><circle cx="5" cy="-23" r="4.5" fill="#FDE68A"/></svg>`;

export const PLANET = (() => {
  const r = 30;
  const ring = (sweep) => `<path d="M${-r * 1.8} 0 A${r * 1.8} ${r * 0.42} 0 0 ${sweep} ${r * 1.8} 0" fill="none" stroke="#F0ABFC" stroke-width="5" stroke-linecap="round" transform="rotate(-14)"/>`;
  return `<svg class="ufo-planet" viewBox="-60 -36 120 72" aria-hidden="true">${ring(1)}<circle r="${r}" fill="#A855F7" ${S(3.5)}/>
    <path d="M-24 -8 q18 -10 46 2" fill="none" stroke="#D8B4FE" stroke-width="4" stroke-linecap="round"/><circle cx="9" cy="11" r="5" fill="#7E22CE"/>${ring(0)}</svg>`;
})();

/** Dãy nhà đêm (viewBox 1600 × 260, neo đáy). Mỗi cửa sổ là một rect .ufo-win, sáng = .ufo-win-on. */
export function citySvg(seed = 7) {
  const r = rng(seed);
  const cols = ['#334155', '#3B4A6B', '#2E3A59', '#475569', '#3F3F6E'];
  const ground = 220;
  let o = '', x = -10;
  while (x < 1610) {
    const w = (54 + r() * 64) | 0, h = (70 + r() * 120) | 0, c = cols[(r() * cols.length) | 0];
    o += `<rect x="${x}" y="${ground - h}" width="${w}" height="${h + 50}" fill="${c}" ${S(3)}/>`;
    if (r() < 0.3) o += `<path d="M${x + w / 2} ${ground - h} v-20" ${S(3)}/><circle class="ufo-beacon" cx="${x + w / 2}" cy="${ground - h - 22}" r="4.5" fill="#F87171"/>`;
    for (let wy = ground - h + 13; wy < ground - 16; wy += 24)
      for (let wx = x + 9; wx < x + w - 15; wx += 18) {
        const mid = wx > 420 && wx < 1180 ? ' ufo-win-c' : '';
        o += `<rect class="ufo-win${mid}${r() < 0.82 ? ' ufo-win-on' : ''}" x="${wx}" y="${wy}" width="9" height="12" rx="1.5"/>`;
      }
    x += w + 3;
  }
  o += `<rect x="0" y="${ground}" width="1600" height="40" fill="#1E3A2F"/><path d="M0 ${ground} H1600" ${S(4)}/>`;
  return `<svg class="ufo-city" viewBox="0 0 1600 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${o}</svg>`;
}

// ── Bọn Zíp Zắp ─────────────────────────────────────────────────────────────────────────────────────
/** Đầu phi công Zíp (tâm x, y, bán kính r): mắt thường .ufo-eye-ok, mắt choáng .ufo-eye-dizzy (CSS bật tắt). */
export function alienHead(x, y, r, color) {
  return `<path d="M${x - r * 0.4} ${y - r * 0.85} L${x - r * 0.75} ${y - r * 1.55} M${x + r * 0.4} ${y - r * 0.85} L${x + r * 0.75} ${y - r * 1.55}" ${S(3)}/>
  <circle cx="${x - r * 0.75}" cy="${y - r * 1.55}" r="${r * 0.2}" fill="#FDE047" ${S(2.5)}/><circle cx="${x + r * 0.75}" cy="${y - r * 1.55}" r="${r * 0.2}" fill="#FDE047" ${S(2.5)}/>
  <circle cx="${x}" cy="${y}" r="${r}" fill="${color}" ${S(3)}/>
  <g class="ufo-eye-ok"><circle cx="${x}" cy="${y - r * 0.08}" r="${r * 0.45}" fill="#fff" ${S(2.5)}/><circle cx="${x + r * 0.1}" cy="${y - r * 0.02}" r="${r * 0.2}" fill="${INK}"/><circle cx="${x + r * 0.16}" cy="${y - r * 0.1}" r="${r * 0.07}" fill="#fff"/>
    <path d="M${x - r * 0.35} ${y + r * 0.5} q${r * 0.35} ${r * 0.3} ${r * 0.7} 0" fill="none" ${S(2.5)}/></g>
  <g class="ufo-eye-dizzy"><path d="M${x - r * 0.35} ${y - r * 0.3} l${r * 0.7} ${r * 0.5} M${x + r * 0.35} ${y - r * 0.3} l${-r * 0.7} ${r * 0.5}" ${S(3)}/>
    <path d="M${x - r * 0.3} ${y + r * 0.62} q${r * 0.3} ${-r * 0.2} ${r * 0.6} 0" fill="none" ${S(2.5)}/></g>`;
}

export const SHIP_COLORS = [
  ['#4ADE80', '#16A34A', '#A3E635', 'xanh lá'], ['#FB923C', '#EA580C', '#86EFAC', 'cam'], ['#F472B6', '#DB2777', '#86EFAC', 'hồng'],
  ['#A78BFA', '#7C3AED', '#C4B5FD', 'tím'], ['#FACC15', '#CA8A04', '#86EFAC', 'vàng'],
];

/** Đĩa bay (viewBox -150 -120 300 160): khiên bong bóng, phi công trong vòm kính, đèn quanh vành. */
export function saucerSvg([c, d, alien]) {
  const lights = [-80, -40, 0, 40, 80].map((x, i) => `<circle class="ufo-light ufo-light${i % 2}" cx="${x}" cy="7" r="6.5" fill="${i % 2 ? '#FDE047' : '#fff'}" ${S(2)}/>`).join('');
  const cracks = [[-136, -12, -100, -60], [-60, -96, -10, -104], [50, -100, 110, -70], [130, -10, 120, 30], [-120, 30, -80, 40]]
    .map(([x1, y1, x2, y2]) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#7DD3FC" stroke-width="6" stroke-linecap="round"/>`).join('');
  return `<svg class="ufo-saucer" viewBox="-150 -120 300 160" aria-hidden="true">
    <ellipse class="ufo-shield" cx="0" cy="-14" rx="138" ry="96" fill="#7DD3FC" fill-opacity=".14" stroke="#7DD3FC" stroke-width="4" stroke-dasharray="18 9"/>
    <g class="ufo-hull">
      ${alienHead(0, -26, 22, alien)}
      <path d="M-58 -4 A58 62 0 0 1 58 -4 Z" fill="#BAE6FD" fill-opacity=".42" ${S(4)}/>
      <path d="M-38 -38 q12 -18 30 -22" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>
      <ellipse cx="0" cy="26" rx="44" ry="12" fill="${d}" ${S(3.5)}/>
      <ellipse cx="0" cy="4" rx="112" ry="27" fill="${c}" ${S(4)}/>
      <path d="M-96 -6 Q0 -22 96 -6" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".45"/>
      ${lights}
    </g>
    <g class="ufo-crack">${cracks}<path d="M-20 -108 l12 18 l-8 10 l16 12" fill="none" stroke="#E0F2FE" stroke-width="4" stroke-linecap="round"/></g>
  </svg>`;
}

/** Tàu mẹ (viewBox -470 -230 940 330): ba vòng khiên .ufo-ring-1 (ngoài) … .ufo-ring-3 (lõi). */
export const MOTHER = `<svg class="ufo-mother-svg" viewBox="-470 -215 940 310" aria-hidden="true">
  <ellipse class="ufo-ring ufo-ring-1" cx="0" cy="-20" rx="455" ry="190" fill="#7DD3FC" fill-opacity=".05" stroke="#7DD3FC" stroke-width="6" stroke-dasharray="30 14"/>
  <ellipse class="ufo-ring ufo-ring-2" cx="0" cy="-20" rx="410" ry="165" fill="#F472B6" fill-opacity=".06" stroke="#F472B6" stroke-width="6" stroke-dasharray="26 12"/>
  <ellipse class="ufo-ring ufo-ring-3" cx="0" cy="-20" rx="365" ry="140" fill="#FDE047" fill-opacity=".06" stroke="#FDE047" stroke-width="6" stroke-dasharray="20 10"/>
  <g class="ufo-hull">
    <path d="M-150 -30 A150 115 0 0 1 150 -30 Z" fill="#1E1B4B" fill-opacity=".5" ${S(5)}/>
    ${alienHead(-66, -64, 26, '#A3E635')}${alienHead(0, -90, 32, '#C4B5FD')}${alienHead(66, -64, 26, '#86EFAC')}
    <path d="M-150 -30 A150 115 0 0 1 150 -30 Z" fill="#BAE6FD" fill-opacity=".35" ${S(5)}/>
    <path d="M-100 -96 q30 -36 74 -44" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".7"/>
    <ellipse cx="0" cy="44" rx="130" ry="28" fill="#7C3AED" ${S(4)}/>
    <ellipse cx="0" cy="0" rx="330" ry="64" fill="#A78BFA" ${S(5)}/>
    <path d="M-290 -14 Q0 -50 290 -14" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".4"/>
    ${[-250, -166, -83, 0, 83, 166, 250].map((x, i) => `<circle class="ufo-light ufo-light${i % 2}" cx="${x}" cy="14" r="11" fill="${i % 2 ? '#FDE047' : '#F472B6'}" ${S(3)}/>`).join('')}
  </g>
</svg>`;

// ── Phe ta ──────────────────────────────────────────────────────────────────────────────────────────
/** Pháo Ánh Sáng (viewBox -70 -270 140 272, chân ở đáy). Nòng .ufo-barrel xoay quanh (0, -112). */
export const CANNON = `<svg class="ufo-cannon-svg" viewBox="-70 -270 140 272" aria-hidden="true">
  <path d="M-56 0 L-38 -86 L38 -86 L56 0 Z" fill="#64748B" ${S(4)}/>
  <path d="M-48 -34 H48 M-43 -60 H43" ${S(3)}/>
  <rect x="-12" y="-28" width="24" height="28" rx="4" fill="#FDE047" ${S(3)}/>
  <g class="ufo-barrel">
    <rect x="-15" y="-238" width="30" height="130" rx="9" fill="#E2E8F0" ${S(4)}/>
    <rect x="-15" y="-200" width="30" height="12" fill="#94A3B8" ${S(3)}/>
    <rect class="ufo-muzzle" x="-22" y="-252" width="44" height="22" rx="6" fill="#22D3EE" ${S(4)}/>
  </g>
  <path d="M-50 -86 A50 50 0 0 1 50 -86 Z" fill="#94A3B8" ${S(4)}/>
  <circle class="ufo-core" cx="0" cy="-108" r="16" fill="#67E8F9" ${S(3)}/>
</svg>`;

/** Rô-bốt Bíp (viewBox -64 -82 128 172). */
export const ROBOT = `<svg class="bip-svg" viewBox="-64 -82 128 172" aria-hidden="true">
  <rect x="-34" y="40" width="68" height="46" rx="14" fill="#CBD5E1" ${S(4)}/><circle class="bip-chest" cx="0" cy="62" r="9" ${S(3)}/>
  <path d="M0 -44 V-66" ${S(4)}/><circle class="bip-bulb" cx="0" cy="-70" r="9" ${S(3)}/>
  <rect x="-60" y="-16" width="14" height="30" rx="5" fill="#94A3B8" ${S(3)}/><rect x="46" y="-16" width="14" height="30" rx="5" fill="#94A3B8" ${S(3)}/>
  <rect x="-50" y="-46" width="100" height="88" rx="26" fill="#E2E8F0" ${S(4)}/>
  <rect x="-38" y="-32" width="76" height="56" rx="16" fill="#0F172A" ${S(3)}/>
  <g class="bip-happy"><path d="M-22 -8 q8 -12 16 0 M6 -8 q8 -12 16 0" fill="none" stroke="#67E8F9" stroke-width="5" stroke-linecap="round"/></g>
  <g class="bip-think"><circle cx="-14" cy="-10" r="7" fill="#67E8F9"/><circle cx="14" cy="-10" r="7" fill="#67E8F9"/><path d="M-24 -20 l14 -5 M24 -20 l-14 -5" stroke="#67E8F9" stroke-width="4" stroke-linecap="round"/></g>
  <g class="bip-alarm"><circle cx="-14" cy="-10" r="8" fill="#67E8F9"/><circle cx="14" cy="-10" r="8" fill="#67E8F9"/></g>
  <path class="bip-smile" d="M-12 8 q12 10 24 0" fill="none" stroke="#67E8F9" stroke-width="4" stroke-linecap="round"/>
  <ellipse class="bip-oh" cx="0" cy="10" rx="9" ry="7" fill="#67E8F9"/>
</svg>`;

/** Rô-bốt Bíp dạng ảnh (thẻ giới thiệu cấp dùng <img>): chỉ giữ một nét mặt. */
export function robotImg(mood = 'happy') {
  const keep = { happy: 'bip-happy', sad: 'bip-think' }[mood] || 'bip-happy';
  const svg = ROBOT.replace('class="bip-svg"', 'xmlns="http://www.w3.org/2000/svg"')
    .replace(/<g class="(bip-happy|bip-think|bip-alarm)">[\s\S]*?<\/g>/g, (g, c) => (c === keep ? g : ''))
    .replace(/<ellipse class="bip-oh"[^>]*\/>/, '')
    .replace('class="bip-chest"', 'fill="#4ADE80"').replace('class="bip-bulb"', 'fill="#FDE047"');
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Viên đạn pha lê (viewBox -20 -38 40 76). */
export const CRYSTAL = `<svg class="ufo-crystal" viewBox="-22 -40 44 80" aria-hidden="true">
  <path d="M0 -36 L18 -18 L18 18 L0 36 L-18 18 L-18 -18 Z" fill="#67E8F9" ${S(3)}/>
  <path d="M0 -36 L18 -18 L18 18 L0 36 Z" fill="#22D3EE"/><path d="M0 -36 L18 -18 L18 18 L0 36 L-18 18 L-18 -18 Z" fill="none" ${S(3)}/>
  <path d="M-7 -16 V12" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".85"/>
</svg>`;

/** Con Zíp nhỏ ngồi trong ô (lớp 1: số bị giấu). */
export const ZIP_TOKEN = `<svg class="ufo-zip" viewBox="-30 -42 60 70" aria-hidden="true">${alienHead(0, 0, 18, '#A3E635')}</svg>`;

export const MINI_UFO = `<svg viewBox="-32 -18 64 30" aria-hidden="true"><path d="M-14 -2 A14 14 0 0 1 14 -2 Z" fill="#BAE6FD" ${S(3)}/><ellipse cx="0" cy="2" rx="28" ry="8" fill="currentColor" ${S(3)}/></svg>`;

export const SHIELD_ICON = `<svg viewBox="-24 -26 48 56" aria-hidden="true"><path class="ufo-sh-fill" d="M0 -22 L20 -14 V2 C20 14 10 22 0 26 C-10 22 -20 14 -20 2 V-14 Z" ${S(3.5)}/>
  <path class="ufo-sh-ok" d="M-8 -10 v14" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path class="ufo-sh-bad" d="M-4 -18 l6 12 l-6 8 l6 12" fill="none" stroke="#DC2626" stroke-width="3.5"/></svg>`;
