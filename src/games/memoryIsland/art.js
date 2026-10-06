/**
 * Hình vẽ của 🏝️ Đảo Trí Nhớ (tự vẽ, màu tươi, viền mực dày như các trò khác).
 *   beachBackdrop(): cảnh bãi cát (trời, mây, mặt trời, biển, đảo xa, cát, dừa, vỏ sò) phủ kín màn.
 *   parrot(): vẹt dẫn đường, 3 dáng: data-mood = idle | happy | think (đổi bằng CSS, không vẽ lại).
 *   shell(), pin(): hoa văn lưng thẻ, kẹp phơi.
 */

export const INK = '#3F3A40';

const cloud = (x, y, s) => `
  <g transform="translate(${x} ${y}) scale(${s})" class="mi-cloud">
    <path d="M10 40 Q0 40 2 30 Q4 18 18 20 Q22 4 40 6 Q56 -4 68 12 Q86 8 88 24 Q100 26 96 38 Q94 44 84 42 Z" fill="#fff" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  </g>`;

const palm = (x, y, s, flip = false) => `
  <g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    <path d="M0 0 Q-6 -90 18 -190" fill="none" stroke="${INK}" stroke-width="30" stroke-linecap="round"/>
    <path d="M0 0 Q-6 -90 18 -190" fill="none" stroke="#B7793A" stroke-width="22" stroke-linecap="round"/>
    <path d="M-4 -40 h14 M-6 -80 h14 M-2 -120 h14 M6 -158 h14" stroke="#8A5524" stroke-width="4" stroke-linecap="round"/>
    <g stroke="${INK}" stroke-width="4" stroke-linejoin="round">
      <path d="M18 -190 Q-40 -230 -100 -170 Q-50 -196 18 -186 Z" fill="#22C55E"/>
      <path d="M18 -190 Q80 -236 140 -168 Q86 -198 18 -186 Z" fill="#16A34A"/>
      <path d="M18 -192 Q-20 -270 -70 -262 Q-20 -240 14 -190 Z" fill="#4ADE80"/>
      <path d="M18 -192 Q60 -276 110 -250 Q60 -240 22 -190 Z" fill="#22C55E"/>
      <path d="M16 -190 Q-30 -170 -60 -110 Q-20 -160 18 -182 Z" fill="#15803D"/>
      <path d="M20 -190 Q70 -170 92 -112 Q60 -160 20 -182 Z" fill="#16A34A"/>
    </g>
    <circle cx="8" cy="-182" r="10" fill="#8A5524" stroke="${INK}" stroke-width="3"/>
    <circle cx="26" cy="-180" r="10" fill="#A16207" stroke="${INK}" stroke-width="3"/>
  </g>`;

const starfish = (x, y, s, rot) => `
  <path transform="translate(${x} ${y}) scale(${s}) rotate(${rot})" d="M0 -22 L6 -7 L22 -6 L9 4 L14 20 L0 11 L-14 20 L-9 4 L-22 -6 L-6 -7 Z" fill="#FB923C" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;

const shellArt = (x, y, s, fill) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-20 4 Q-22 -18 0 -22 Q22 -18 20 4 Q10 10 0 10 Q-10 10 -20 4 Z" fill="${fill}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M0 8 V-18 M-9 7 L-12 -14 M9 7 L12 -14" stroke="${INK}" stroke-width="2" stroke-linecap="round" opacity="0.55"/>
  </g>`;

/**
 * Cảnh bãi cát vuông 1000 × 1000 (preserveAspectRatio slice, giữa): màn ngang thấy trời phía trên, biển giữa,
 * cát dưới; màn dọc thấy nhiều trời hơn. Trời 0–430, biển 430–560, cát 560–1000.
 */
export function beachBackdrop() {
  const waves = Array.from({ length: 12 }, (_, i) => `<path d="M${i * 90 - 20} 0 q22 -12 45 0 t45 0" />`).join('');
  return `
  <svg class="mi-backdrop" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="miSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7DD3FC"/><stop offset="1" stop-color="#E0F7FF"/></linearGradient>
      <linearGradient id="miSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0EA5E9"/><stop offset="1" stop-color="#38BDF8"/></linearGradient>
      <linearGradient id="miSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FDE68A"/><stop offset="1" stop-color="#FCD34D"/></linearGradient>
    </defs>
    <rect width="1000" height="440" fill="url(#miSky)"/>
    <g class="mi-sun"><circle cx="900" cy="330" r="30" fill="#FDE047" stroke="${INK}" stroke-width="4"/>
      <g stroke="#FACC15" stroke-width="7" stroke-linecap="round">${Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return `<path d="M${(900 + Math.cos(a) * 42).toFixed(1)} ${(330 + Math.sin(a) * 42).toFixed(1)} L${(900 + Math.cos(a) * 54).toFixed(1)} ${(330 + Math.sin(a) * 54).toFixed(1)}"/>`;
      }).join('')}</g></g>
    ${cloud(120, 250, 1.3)}${cloud(470, 300, 1)}${cloud(640, 220, 0.8)}
    <path d="M60 438 Q120 380 200 396 Q260 370 320 438 Z" fill="#4ADE80" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M640 438 Q700 408 760 420 Q800 400 860 438 Z" fill="#86EFAC" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <rect y="430" width="1000" height="140" fill="url(#miSea)"/>
    <path d="M0 430 H1000" stroke="${INK}" stroke-width="4"/>
    <g fill="none" stroke="#E0F2FE" stroke-width="5" stroke-linecap="round" class="mi-waves">
      <g transform="translate(0 470)">${waves}</g><g transform="translate(40 520)">${waves}</g>
    </g>
    <g class="mi-boat" transform="translate(560 470)">
      <path d="M-40 0 H40 L28 18 H-28 Z" fill="#F87171" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M0 0 V-58 L30 -8 Z" fill="#fff" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    </g>
    <path d="M0 568 Q120 546 260 560 Q420 576 560 556 Q760 538 1000 562 V1000 H0 Z" fill="url(#miSand)" stroke="${INK}" stroke-width="4"/>
    <path d="M0 576 Q120 556 260 570 Q420 586 560 566 Q760 548 1000 572" fill="none" stroke="#fff" stroke-width="6" opacity="0.7"/>
    ${palm(70, 940, 1.6)}${palm(950, 960, 1.5, true)}
    ${starfish(250, 900, 1.2, 15)}${starfish(800, 700, 0.9, -20)}
    ${shellArt(160, 700, 1.1, '#FBCFE8')}${shellArt(700, 930, 1.3, '#FDE68A')}${shellArt(430, 980, 1, '#BFDBFE')}
    <g fill="#F59E0B" opacity="0.45">${[[330, 640], [520, 700], [610, 820], [380, 780], [880, 820], [120, 820], [300, 960], [560, 900]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5"/>`).join('')}</g>
  </svg>`;
}

/** Vẹt đỏ đứng trên cành gỗ. Đổi dáng qua thuộc tính data-mood của phần tử chứa (xem styles.js). */
export function parrot() {
  return `
  <svg class="mi-parrot-svg" viewBox="0 0 200 230" aria-hidden="true">
    <g class="mi-p-body">
      <path d="M92 150 Q82 196 70 226 L90 222 Q100 190 104 152 Z" fill="#3B82F6" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M104 150 Q108 196 112 228 L126 216 Q118 186 114 150 Z" fill="#EF4444" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
      <ellipse cx="100" cy="122" rx="40" ry="50" fill="#EF4444" stroke="${INK}" stroke-width="4"/>
      <ellipse cx="108" cy="136" rx="22" ry="28" fill="#F87171"/>
      <g class="mi-p-wing">
        <path d="M84 92 Q54 120 70 176 Q98 166 110 122 Q104 98 84 92 Z" fill="#22C55E" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M70 176 Q72 150 84 134 Q96 150 92 166 Z" fill="#3B82F6" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M84 96 Q96 104 104 118" fill="none" stroke="#FACC15" stroke-width="7" stroke-linecap="round"/>
      </g>
      <g class="mi-p-head">
        <circle cx="106" cy="62" r="34" fill="#EF4444" stroke="${INK}" stroke-width="4"/>
        <ellipse cx="121" cy="62" rx="16" ry="14" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
        <g class="mi-p-eye-open"><circle cx="122" cy="59" r="6.5" fill="${INK}"/><circle cx="124.5" cy="56.5" r="2.2" fill="#fff"/></g>
        <path class="mi-p-eye-happy" d="M115 61 Q122 52 129 61" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
        <g class="mi-p-eye-think"><circle cx="124" cy="55" r="6" fill="${INK}"/><circle cx="125.5" cy="53" r="2" fill="#fff"/></g>
        <path d="M134 56 Q160 52 158 82 Q150 74 136 76 Z" fill="#FCD34D" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M137 76 Q148 76 150 86 Q140 88 134 80 Z" fill="${INK}"/>
        <path d="M86 34 Q90 18 100 28 Q104 14 112 28" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <g class="mi-p-wing-up">
        <path d="M86 96 Q48 70 34 34 Q72 44 104 104 Z" fill="#22C55E" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M34 34 Q52 38 60 56 Q44 54 34 34 Z" fill="#3B82F6" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      </g>
    </g>
    <path d="M20 176 Q100 166 186 180" fill="none" stroke="${INK}" stroke-width="18" stroke-linecap="round"/>
    <path d="M20 176 Q100 166 186 180" fill="none" stroke="#A16207" stroke-width="11" stroke-linecap="round"/>
    <g fill="#F59E0B" stroke="${INK}" stroke-width="3"><ellipse cx="92" cy="170" rx="8" ry="6"/><ellipse cx="112" cy="170" rx="8" ry="6"/></g>
  </svg>`;
}

/** Vỏ sò trắng mờ trên lưng thẻ. */
export const shell = () => `
  <svg class="mi-back-art" viewBox="0 0 100 100" aria-hidden="true">
    <path d="M14 62 Q10 22 50 16 Q90 22 86 62 Q70 76 50 76 Q30 76 14 62 Z" fill="rgba(255,255,255,0.28)" stroke="rgba(255,255,255,0.85)" stroke-width="5" stroke-linejoin="round"/>
    <path d="M50 74 V24 M34 72 L28 32 M66 72 L72 32" stroke="rgba(255,255,255,0.85)" stroke-width="4" stroke-linecap="round"/>
    <path d="M40 76 h20 l-4 8 h-12 Z" fill="rgba(255,255,255,0.85)"/>
  </svg>`;

/** Kẹp phơi gỗ. */
export const pin = () => `
  <svg class="mi-pin" viewBox="0 0 24 40" aria-hidden="true">
    <rect x="4" y="2" width="16" height="34" rx="4" fill="#F59E0B" stroke="${INK}" stroke-width="3"/>
    <path d="M12 4 V34" stroke="${INK}" stroke-width="2"/>
    <circle cx="12" cy="16" r="3" fill="#fff" stroke="${INK}" stroke-width="2"/>
  </svg>`;
