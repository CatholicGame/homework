/**
 * Hình vẽ của trò 🦈 Bắn cá mập (shark.js), vẽ riêng theo nét của app: màu phẳng tươi, viền mực dày.
 *   SHARK: cá mập bơi sang trái (đuôi .shk-tail quẫy bằng CSS, miệng ngậm / há khi đớp: .shk-biting).
 *   BONES: bộ xương cá mập (cá bị bắn trúng), cùng khung 260 × 100 để thay chỗ cho nhau.
 *   DIVER: thợ lặn đồ vàng, mũ tròn có kính, cầm súng điện quay sang phải (.shk-gun giật khi bắn).
 *   SEA: cảnh đáy biển (tia nắng, cát, đá, rong biển lắc lư, san hô, sao biển, cua), phủ kín khung.
 */

import { INK } from './kit.js';

const S = (w = 4) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

// Thân có khuyết dưới đầu: chỗ đó là hàm dưới (.shk-jaw) xoay quanh khớp hàm (80, 66) để há miệng.
// Lòng miệng (đỏ, có lưỡi) xoay cùng hàm dưới nhưng vẽ SAU thân cá: phần thừa nằm khuất trong đầu, chỉ lộ đúng khe giữa
// hai hàm ở mọi độ há.
const BODY = 'M10 52 C24 36 70 25 128 25 C166 26 196 37 216 48 C198 60 168 72 126 74 C106 75 92 74 84 72 L80 66 C56 64 30 62 12 58 C10 56 10 54 10 52 Z';
const BELLY = 'M82 69 C100 75 140 74 170 68 C192 62 206 54 214 49 C190 56 160 61 126 62 C110 63 94 65 82 66 Z';
const OUTLINE = 'M10 52 C24 36 70 25 128 25 C166 26 196 37 216 48 C198 60 168 72 126 74 C106 75 92 74 84 72';
const TAIL = 'M204 46 C220 34 234 16 252 2 C248 22 246 38 236 49 C246 60 250 76 258 94 C238 84 220 66 204 54 Z';
const JAW = 'M12 58 C30 62 56 64 80 66 L85 72 C66 79 38 78 22 71 C15 67 12 63 12 58 Z';
const lineY = (x) => 58 + (x - 12) * 8 / 68; // đường miệng (hàm trên khép với hàm dưới)
const tooth = (x, y, dir, w = 7, h = 7) => `<path d="M${x} ${y} l${w / 2} ${h * dir} l${w / 2} ${-h * dir} Z" fill="#fff" ${S(1.5)}/>`;

/** Cá mập bơi sang trái. color: màu lưng (mỗi con hơi khác nhau cho dễ phân biệt). */
export function sharkSvg(color = '#7E9DB4', fin = '#67879F') {
  return `<svg class="shk-svg" viewBox="0 -6 264 106" aria-hidden="true">
    <g class="shk-tail"><path d="${TAIL}" fill="${color}" ${S()}/></g>
    <path d="M98 27 C104 12 114 3 134 -3 C128 10 127 20 140 27 Z" fill="${color}" ${S()}/>
    <path d="M184 38 C186 32 190 29 197 27 C194 33 195 37 199 41 Z" fill="${color}" ${S(3)}/>
    <g class="shk-jaw">
      <path d="M80 66 L13 58 L19 49 L34 41 L66 43 Z" fill="#7F1D1D"/>
      <path d="M74 64 C60 62 42 62 30 60" fill="none" stroke="#FB7185" stroke-width="7" stroke-linecap="round"/>
    </g>
    <path d="${BODY}" fill="${color}"/>
    <path d="${BELLY}" fill="#F1F5F9"/>
    <path d="M150 70 C156 78 160 84 168 88 C166 80 167 74 172 68 Z" fill="${fin}" ${S(3)}/>
    <path d="${OUTLINE}" fill="none" ${S()}/>
    <g class="shk-jaw">${[18, 28, 38, 48, 58].map(x => tooth(x, lineY(x + 3.5) + 1.5, -1, 7, 6)).join('')}<path d="${JAW}" fill="#E2E8F0" ${S(3.5)}/></g>
    <path d="M10 52 C10 54 10 56 12 58 C30 62 56 64 80 66" fill="none" ${S(3.5)}/>
    ${[14, 23, 32, 41, 50, 59, 68].map(x => tooth(x, lineY(x + 3.5) - 0.5, 1, 7, 7)).join('')}
    <g fill="none" ${S(2.6)}><path d="M94 44 C90 51 90 58 94 65"/><path d="M102 43 C98 50 98 58 102 65"/><path d="M110 43 C106 50 106 58 110 65"/></g>
    <path class="shk-pec" d="M112 68 C114 80 122 92 140 98 C136 86 136 76 144 69 Z" fill="${fin}" ${S()}/>
    <circle cx="42" cy="43" r="6.5" fill="#fff" ${S(2.6)}/><circle cx="40" cy="43.5" r="3.2" fill="${INK}"/>
    <path d="M31 33.5 L53 39" ${S(4.5)}/>
  </svg>`;
}

/** Bộ xương cá mập (cùng khung với sharkSvg): xương trắng viền mực, phát sáng bằng CSS (.shk-dead). */
export function bonesSvg() {
  const bone = (d, w = 6) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 5}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="round"/>`;
  const ribs = [];
  for (let i = 0; i < 8; i++) {
    const x = 88 + i * 14, k = 1 - i * 0.09;
    ribs.push(bone(`M${x} 48 C${x + 2} ${48 - 12 * k} ${x + 8} ${48 - 18 * k} ${x + 12} ${48 - 20 * k}`, 4.5));
    ribs.push(bone(`M${x} 51 C${x + 2} ${51 + 12 * k} ${x + 8} ${51 + 17 * k} ${x + 12} ${51 + 19 * k}`, 4.5));
  }
  return `<svg class="shk-svg" viewBox="0 -6 264 106" aria-hidden="true">
    ${bone('M206 49 C222 34 236 18 250 6')}${bone('M206 51 C222 64 238 78 254 90')}${bone('M206 50 L236 50', 5)}
    ${bone('M114 46 C118 30 122 16 130 4', 4.5)}
    ${ribs.join('')}
    ${bone('M70 50 C110 46 160 46 210 50', 7)}
    <path d="M10 56 C22 34 52 28 74 34 C84 42 84 62 74 70 C52 77 24 73 10 56 Z" fill="#fff" ${S()}/>
    <circle cx="42" cy="46" r="8" fill="${INK}"/><circle cx="44" cy="44" r="2.4" fill="#fff"/>
    <path d="M58 40 L62 52 M64 38 L68 50" ${S(2.4)}/>
    <path d="M15 62 L21 69 L27 62 L33 69 L39 62 L45 69 L51 62 L57 69 L64 63" fill="none" ${S(2.6)}/>
  </svg>`;
}

/** Bóng cá mập nhỏ cho dải đếm (mini: 'live' | 'dead' | 'bit'). */
export const MINI_SHARK = `<svg viewBox="0 -6 264 106" aria-hidden="true"><path d="${TAIL}" fill="currentColor"/><path d="M98 27 C104 12 114 3 134 -3 C128 10 127 20 140 27 Z" fill="currentColor"/><path d="${BODY}" fill="currentColor"/><path d="${JAW}" fill="currentColor"/><circle cx="42" cy="44" r="7" fill="#fff"/></svg>`;

/** Thợ lặn quay sang phải, cầm súng điện. Khung 130 × 170, mũ ở trên (dây thừng buộc vào đỉnh mũ: x = 62). */
export const DIVER = `<svg class="shk-diver-svg" viewBox="0 0 136 170" aria-hidden="true">
  <path d="M24 64 C20 50 30 44 42 50" fill="none" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
  <rect x="12" y="60" width="22" height="54" rx="10" fill="#94A3B8" ${S()}/>
  <rect x="16" y="54" width="10" height="9" rx="3" fill="#64748B" ${S(3)}/>
  <g class="shk-leg"><rect x="40" y="116" width="18" height="32" rx="7" fill="#FACC15" ${S()}/><rect x="34" y="142" width="28" height="17" rx="7" fill="#475569" ${S()}/></g>
  <g class="shk-leg shk-leg2"><rect x="63" y="116" width="18" height="32" rx="7" fill="#FACC15" ${S()}/><rect x="60" y="142" width="28" height="17" rx="7" fill="#475569" ${S()}/></g>
  <rect x="32" y="62" width="58" height="64" rx="18" fill="#FACC15" ${S()}/>
  <rect x="33" y="102" width="56" height="10" fill="#334155"/><rect x="54" y="100" width="14" height="14" rx="3" fill="#E2E8F0" ${S(2.5)}/>
  <g class="shk-gun">
    <rect x="70" y="74" width="34" height="17" rx="8.5" fill="#FACC15" ${S()}/>
    <rect x="98" y="70" width="30" height="16" rx="5" fill="#64748B" ${S()}/>
    <rect x="96" y="84" width="9" height="13" rx="3" fill="#475569" ${S(3)}/>
    <rect class="shk-tip" x="126" y="73" width="8" height="10" rx="2" fill="#FDE047" ${S(3)}/>
    <circle cx="101" cy="83" r="8" fill="#F59E0B" ${S(3)}/>
  </g>
  <circle cx="62" cy="38" r="33" fill="#FBBF24" ${S()}/>
  <circle cx="74" cy="39" r="19" fill="#7DD3FC" ${S()}/>
  <g class="shk-eyes"><circle cx="71" cy="37" r="2.6" fill="${INK}"/><circle cx="81" cy="37" r="2.6" fill="${INK}"/></g>
  <g class="shk-xeyes" ${S(2.4)}><path d="M68 34 l6 6 M74 34 l-6 6 M78 34 l6 6 M84 34 l-6 6"/></g>
  <path class="shk-smile" d="M70 45 Q76 50 82 45" fill="none" ${S(2.6)}/>
  <path class="shk-oh" d="M73 47 a3.2 3.2 0 1 0 6.4 0 a3.2 3.2 0 1 0 -6.4 0" fill="${INK}"/>
  <path class="shk-sad" d="M70 48 Q76 43 82 48" fill="none" ${S(2.6)}/>
  <path class="shk-crack" d="M62 30 L68 36 L64 41 L71 47 M68 36 L75 33" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M62 27 Q67 22 74 23" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="0.85"/>
  ${[[38, 22], [34, 46], [52, 66], [62, 7]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.6" fill="#B45309" ${S(2)}/>`).join('')}
</svg>`;

// ── Cảnh đáy biển ───────────────────────────────────────────────────────────────────────────────────
const weed = (x, h, c, d) => `<g class="shk-weed" style="--d:${d}s; transform-origin:${x}px 900px"><path d="M${x} 900 C${x - 26} ${900 - h * 0.3} ${x + 26} ${900 - h * 0.55} ${x - 8} ${900 - h * 0.8} C${x - 20} ${900 - h * 0.9} ${x} ${900 - h} ${x + 6} ${900 - h} C${x + 20} ${900 - h * 0.8} ${x + 34} ${900 - h * 0.55} ${x + 14} ${900 - h * 0.3} C${x + 8} ${900 - h * 0.15} ${x + 14} 900 ${x + 18} 900 Z" fill="${c}" ${S(3.5)}/></g>`;
const coral = (x, y, c, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 V-70 M0 -40 C-20 -50 -30 -70 -34 -96 M0 -55 C18 -64 30 -86 30 -110 M0 -70 C-6 -90 -2 -110 6 -126 M-34 -96 C-46 -104 -50 -116 -48 -128 M30 -110 C40 -118 46 -128 44 -140" fill="none" stroke="${INK}" stroke-width="20" stroke-linecap="round"/><path d="M0 0 V-70 M0 -40 C-20 -50 -30 -70 -34 -96 M0 -55 C18 -64 30 -86 30 -110 M0 -70 C-6 -90 -2 -110 6 -126 M-34 -96 C-46 -104 -50 -116 -48 -128 M30 -110 C40 -118 46 -128 44 -140" fill="none" stroke="${c}" stroke-width="13" stroke-linecap="round"/></g>`;
const rock = (x, y, w, h, c = '#94A3B8') => `<path d="M${x} ${y} C${x + w * 0.05} ${y - h * 0.8} ${x + w * 0.35} ${y - h} ${x + w * 0.55} ${y - h * 0.95} C${x + w * 0.85} ${y - h * 0.9} ${x + w} ${y - h * 0.4} ${x + w} ${y} Z" fill="${c}" ${S(4)}/>`;
const star = (x, y, r, c) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r;
    return `${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)}`;
  }).join(' ');
  return `<polygon points="${pts}" fill="${c}" ${S(3)}/>`;
};
const crab = (x, y) => `<g transform="translate(${x} ${y})">
  <path d="M-30 -4 L-44 -16 M-30 2 L-46 2 M30 -4 L44 -16 M30 2 L46 2" ${S(4)}/>
  <circle cx="-38" cy="-30" r="10" fill="#F97316" ${S(3)}/><circle cx="38" cy="-30" r="10" fill="#F97316" ${S(3)}/>
  <ellipse cx="0" cy="-6" rx="32" ry="18" fill="#F97316" ${S(3.5)}/>
  <path d="M-8 -22 V-34 M8 -22 V-34" ${S(3)}/><circle cx="-8" cy="-36" r="4.5" fill="#fff" ${S(2)}/><circle cx="8" cy="-36" r="4.5" fill="#fff" ${S(2)}/>
  <path d="M-8 2 Q0 8 8 2" fill="none" ${S(2.5)}/></g>`;
const fishSil = (x, y, s, flip) => `<path transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" d="M0 0 C14 -12 34 -12 46 0 C34 12 14 12 0 0 Z M46 0 L60 -10 L60 10 Z" fill="#0C4A6E" opacity="0.18"/>`;

export const SEA = `<svg class="shk-sea" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs>
    <linearGradient id="shk-water" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="900"><stop offset="0" stop-color="#7DD3FC"/><stop offset="0.45" stop-color="#38BDF8"/><stop offset="1" stop-color="#0284C7"/></linearGradient>
    <linearGradient id="shk-ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>
  <rect x="-400" y="-2000" width="2400" height="2900" fill="url(#shk-water)"/>
  <g class="shk-rays" fill="url(#shk-ray)">
    <path d="M260 -1000 L380 -1000 L620 700 L420 700 Z"/><path d="M760 -1000 L830 -1000 L980 620 L860 620 Z"/>
    <path d="M1180 -1000 L1290 -1000 L1500 680 L1320 680 Z"/><path d="M-80 -1000 L0 -1000 L160 560 L40 560 Z"/>
  </g>
  ${fishSil(520, 300, 1.4, false)}${fishSil(580, 330, 1.1, false)}${fishSil(1100, 220, 1.6, true)}${fishSil(1300, 480, 1.2, true)}
  <path d="M-400 830 C-200 790 0 800 200 812 C420 826 600 790 820 800 C1040 812 1240 786 1440 800 C1620 812 1800 800 2000 806 V900 H-400 Z" fill="#7DC4E8" opacity="0.7"/>
  ${coral(150, 840, '#F472B6', 0.9)}${coral(1440, 830, '#FB7185', 0.8)}
  ${rock(280, 860, 170, 90)}${rock(1200, 862, 140, 70, '#A1A1AA')}${rock(-60, 870, 200, 120, '#9CA3AF')}
  ${weed(60, 280, '#4ADE80', 3.2)}${weed(470, 230, '#22C55E', 2.7)}${weed(520, 170, '#86EFAC', 3.6)}${weed(980, 260, '#22C55E', 3)}${weed(1340, 210, '#4ADE80', 2.5)}${weed(1560, 300, '#22C55E', 3.4)}
  ${coral(760, 860, '#FDBA74', 0.7)}
  <path d="M-400 900 V856 C-200 836 40 846 260 858 C520 872 760 840 1000 848 C1240 856 1440 838 1640 846 C1800 852 1900 850 2000 852 V900 Z" fill="#FDE68A" ${S(4)}/>
  <g fill="#F59E0B" opacity="0.5"><circle cx="120" cy="876" r="4"/><circle cx="340" cy="884" r="3"/><circle cx="640" cy="872" r="4"/><circle cx="900" cy="886" r="3"/><circle cx="1180" cy="874" r="4"/><circle cx="1480" cy="882" r="3"/></g>
  ${star(620, 868, 22, '#EF4444')}${star(1530, 872, 18, '#F97316')}
  ${crab(1060, 882)}
  <path d="M380 884 C384 868 404 868 408 884 Z" fill="#FBCFE8" ${S(3)}/>
</svg>`;

/** Một mạng của thợ lặn (trái tim; mất mạng: tim xám nứt đôi). */
export const HEART = `<svg viewBox="0 0 40 36" aria-hidden="true">
  <path class="shk-heart-whole" d="M20 33 C8 24 2 17 2 10.5 C2 5 6 2 11 2 C15 2 18 4.5 20 8 C22 4.5 25 2 29 2 C34 2 38 5 38 10.5 C38 17 32 24 20 33 Z" ${S(2.6)}/>
  <path class="shk-heart-l" d="M20 33 C8 24 2 17 2 10.5 C2 5 6 2 11 2 C15 2 18 4.5 20 8 L17 15 L22 20 L18 26 Z" ${S(2.6)}/>
  <path class="shk-heart-r" d="M20 33 C32 24 38 17 38 10.5 C38 5 34 2 29 2 C25 2 22 4.5 20 8 L17 15 L22 20 L18 26 Z" ${S(2.6)}/></svg>`;
