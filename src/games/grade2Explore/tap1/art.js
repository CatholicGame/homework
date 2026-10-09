/** Hình vẽ nhỏ (tự vẽ, nét mực dày, màu tươi) cho Khám phá Toán 2 Tập Một. Mỗi hình vẽ quanh gốc (0, 0), cỡ ~100. */

import { INK } from './stage.js';

const S = (w = 3) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

export const ART = {
  duck: `<g><ellipse cx="-4" cy="14" rx="40" ry="26" fill="#FDE047" ${S()}/><path d="M-30 6 Q-48 -6 -40 18" fill="#FACC15" ${S(2.5)}/>
    <circle cx="20" cy="-18" r="20" fill="#FDE047" ${S()}/><path d="M36 -20 L54 -14 L36 -8 Z" fill="#FB923C" ${S(2.5)}/><circle cx="26" cy="-23" r="3.5" fill="${INK}"/>
    <path d="M-8 10 Q4 22 18 10" fill="none" ${S(2.5)}/></g>`,
  chick: `<g><ellipse cx="0" cy="10" rx="34" ry="30" fill="#FEF08A" ${S()}/><circle cx="10" cy="-24" r="20" fill="#FEF08A" ${S()}/>
    <path d="M28 -26 L42 -21 L28 -16 Z" fill="#FB923C" ${S(2.5)}/><circle cx="16" cy="-28" r="3.5" fill="${INK}"/>
    <path d="M-6 38 V48 M8 38 V48" ${S(3)}/><path d="M-20 4 Q-8 18 4 6" fill="none" ${S(2.5)}/></g>`,
  hen: `<g><ellipse cx="-2" cy="10" rx="40" ry="32" fill="#FFF" ${S()}/><circle cx="20" cy="-24" r="20" fill="#FFF" ${S()}/>
    <path d="M12 -44 Q16 -54 22 -44 Q26 -54 30 -42" fill="#EF4444" ${S(2.5)}/><path d="M38 -26 L52 -21 L38 -16 Z" fill="#FB923C" ${S(2.5)}/>
    <circle cx="26" cy="-28" r="3.5" fill="${INK}"/><path d="M36 -12 Q40 -4 34 -2" fill="#EF4444" ${S(2)}/><path d="M-6 42 V52 M8 42 V52" ${S(3)}/>
    <path d="M-40 0 Q-56 -16 -48 14" fill="#FFF" ${S(2.5)}/></g>`,
  bird: `<g><ellipse cx="0" cy="6" rx="32" ry="22" fill="#60A5FA" ${S()}/><circle cx="22" cy="-12" r="16" fill="#60A5FA" ${S()}/>
    <path d="M36 -14 L50 -10 L36 -6 Z" fill="#FB923C" ${S(2.5)}/><circle cx="26" cy="-15" r="3.2" fill="${INK}"/>
    <path d="M-12 0 Q0 -22 12 0" fill="#93C5FD" ${S(2.5)}/><path d="M-30 4 L-46 -6 L-42 12 Z" fill="#3B82F6" ${S(2.5)}/>
    <path d="M-4 26 V34 M6 26 V34" ${S(2.5)}/></g>`,
  apple: `<g><path d="M0 -26 C-34 -40 -50 0 -32 26 C-20 44 -6 40 0 34 C6 40 20 44 32 26 C50 0 34 -40 0 -26 Z" fill="#EF4444" ${S()}/>
    <path d="M0 -26 Q2 -40 8 -46" fill="none" ${S(3)}/><path d="M6 -38 Q24 -50 30 -34 Q16 -30 6 -38 Z" fill="#4ADE80" ${S(2.5)}/>
    <ellipse cx="-16" cy="-8" rx="6" ry="10" fill="#fff" opacity="0.5"/></g>`,
  greenApple: `<g><path d="M0 -26 C-34 -40 -50 0 -32 26 C-20 44 -6 40 0 34 C6 40 20 44 32 26 C50 0 34 -40 0 -26 Z" fill="#84CC16" ${S()}/>
    <path d="M0 -26 Q2 -40 8 -46" fill="none" ${S(3)}/><ellipse cx="-16" cy="-8" rx="6" ry="10" fill="#fff" opacity="0.5"/></g>`,
  flower: `<g>${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-22" rx="14" ry="22" fill="#F472B6" ${S(2.5)} transform="rotate(${a})"/>`).join('')}
    <circle r="13" fill="#FDE047" ${S(2.5)}/></g>`,
  nut: `<g><path d="M0 -36 C24 -36 34 -10 30 14 C26 34 12 42 0 42 C-12 42 -26 34 -30 14 C-34 -10 -24 -36 0 -36 Z" fill="#B45309" ${S()}/>
    <path d="M-30 -6 Q0 -22 30 -6 Q30 -40 0 -40 Q-30 -40 -30 -6 Z" fill="#78350F" ${S(2.5)}/></g>`,
  boat: `<g><path d="M-44 0 H44 L30 26 H-30 Z" fill="#F97316" ${S()}/><path d="M0 0 V-46 L32 -8 Z" fill="#fff" ${S(2.5)}/></g>`,
  /** Chấm tròn của khung 10 ô. */
  dot: (fill) => `<circle r="36" fill="${fill}" ${S(3)}/>`,
};

/** Một que tính (đứng), tâm ở giữa, cao h. */
export const stick = (h = 130) => `<g><rect x="-7" y="${-h / 2}" width="14" height="${h}" rx="6" fill="#FBBF24" ${S(2.5)}/><rect x="-7" y="${-h / 2}" width="14" height="14" rx="6" fill="#EF4444" ${S(2.5)}/></g>`;

/** Một bó 1 chục que tính, tâm ở giữa, cao h. */
export function bundle(h = 260) {
  let g = '';
  for (let i = 0; i < 5; i++) {
    const x = -16 + i * 8;
    g += `<rect x="${x - 7}" y="${-h / 2}" width="14" height="${h}" rx="6" fill="${i % 2 ? '#F59E0B' : '#FBBF24'}" ${S(2.5)}/><rect x="${x - 7}" y="${-h / 2}" width="14" height="14" rx="6" fill="#EF4444" ${S(2.5)}/>`;
  }
  g += `<rect x="-26" y="-12" width="52" height="24" rx="6" fill="#3B82F6" ${S(2.5)}/>`;
  return `<g>${g}</g>`;
}

/** Túi/vật có nhãn cân nặng cho cân đĩa. */
export const WEIGHT_ART = {
  kg1: `<g><path d="M-30 30 L-22 -18 H22 L30 30 Z" fill="#64748B" ${S()}/><path d="M-12 -18 Q0 -40 12 -18" fill="none" ${S(5)}/><text x="0" y="12" class="x2a-t" font-size="24" fill="#fff">1 kg</text></g>`,
  kg2: `<g><path d="M-36 34 L-26 -20 H26 L36 34 Z" fill="#475569" ${S()}/><path d="M-14 -20 Q0 -46 14 -20" fill="none" ${S(5)}/><text x="0" y="14" class="x2a-t" font-size="26" fill="#fff">2 kg</text></g>`,
  kg5: `<g><path d="M-42 38 L-30 -24 H30 L42 38 Z" fill="#334155" ${S()}/><path d="M-16 -24 Q0 -52 16 -24" fill="none" ${S(5)}/><text x="0" y="14" class="x2a-t" font-size="28" fill="#fff">5 kg</text></g>`,
  sugar: `<g><rect x="-30" y="-36" width="60" height="72" rx="8" fill="#fff" ${S()}/><rect x="-30" y="-12" width="60" height="26" fill="#F9A8D4" ${S(2.5)}/><text x="0" y="2" class="x2a-t" font-size="20">Đường</text><text x="0" y="26" class="x2a-t" font-size="16">1 kg</text></g>`,
  melon: `<g><ellipse cx="0" cy="0" rx="52" ry="40" fill="#16A34A" ${S()}/><path d="M-30 -30 Q-40 0 -30 30 M0 -40 Q-8 0 0 40 M30 -30 Q40 0 30 30" fill="none" stroke="#14532D" stroke-width="4"/></g>`,
  pumpkin: `<g><ellipse cx="-18" cy="6" rx="26" ry="32" fill="#F97316" ${S()}/><ellipse cx="18" cy="6" rx="26" ry="32" fill="#F97316" ${S()}/><ellipse cx="0" cy="6" rx="18" ry="34" fill="#FB923C" ${S()}/><path d="M0 -28 Q4 -42 12 -44" fill="none" stroke="#166534" stroke-width="6" stroke-linecap="round"/></g>`,
  rice: `<g><path d="M-34 -34 Q0 -46 34 -34 L40 36 Q0 46 -40 36 Z" fill="#FEF3C7" ${S()}/><path d="M-26 -38 Q0 -28 26 -38" fill="none" ${S(3)}/><text x="0" y="6" class="x2a-t" font-size="20">Gạo</text></g>`,
  book: `<g><rect x="-36" y="-28" width="72" height="56" rx="5" fill="#3B82F6" ${S()}/><rect x="-28" y="-20" width="44" height="12" rx="3" fill="#fff" opacity="0.85"/><path d="M28 -28 V28" ${S(3)}/></g>`,
  pencil: `<g><rect x="-40" y="-7" width="64" height="14" fill="#FACC15" ${S(2.5)}/><path d="M24 -7 L42 0 L24 7 Z" fill="#FDE68A" ${S(2.5)}/><rect x="-48" y="-7" width="10" height="14" fill="#F472B6" ${S(2.5)}/></g>`,
};
