/**
 * Hình vẽ trò 🌱 Vườn trồng theo hàng (lớp 3, bảng nhân, bảng chia): cây con, cây đã lớn (bắp cải, hoa hướng dương,
 * cây ngô), hố trồng, khay cây con, bình tưới, cảnh vườn phía sau (trời, đồi, nhà, hàng rào, cây).
 * Mỗi cây vẽ trong ô 40 × 40 (gốc cây ở y ≈ 34). Nét và màu theo bộ vẽ chung của các trò (INK, nét dày, màu phẳng).
 */

export const INK = '#3F3A40';
const ST = (w = 2) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

/** Tên cây (đọc trong câu nói) và màu nhãn. Cây con dùng chung cho mọi lượt trồng. */
export const CROPS = {
  seed: { name: 'cây con' },
  cabbage: { name: 'cây bắp cải' },
  sunflower: { name: 'cây hoa hướng dương' },
  corn: { name: 'cây ngô' },
};
export const GROWN = ['cabbage', 'sunflower', 'corn'];

const PLANTS = {
  seed: () => `<path d="M20 34 V22" ${ST(2.2)} fill="none"/>
    <path d="M20 25 C13 26 9 21 9 16 C15 15 20 19 20 25 Z" fill="#4ADE80" ${ST(1.8)}/>
    <path d="M20 22 C26 23 31 18 31 12 C25 11 20 15 20 22 Z" fill="#22C55E" ${ST(1.8)}/>
    <path d="M12 18 Q16 20 19 24 M28 15 Q24 17 21 21" stroke="#15803D" stroke-width="1" fill="none"/>`,
  cabbage: () => `<ellipse cx="20" cy="26" rx="16" ry="10" fill="#4ADE80" ${ST(1.8)}/>
    <circle cx="20" cy="21" r="11" fill="#BBF7D0" ${ST(1.8)}/>
    <path d="M12 22 Q20 14 28 22 M15 26 Q20 19 25 26" stroke="#4ADE80" stroke-width="1.6" fill="none"/>
    <path d="M6 28 Q4 22 10 20 M34 28 Q36 22 30 20" ${ST(1.6)} fill="none"/>`,
  sunflower: () => `<path d="M20 36 V15" stroke="#16A34A" stroke-width="2.6" fill="none"/>
    <path d="M20 30 C13 31 9 27 9 23 C15 22 19 25 20 30 Z" fill="#4ADE80" ${ST(1.5)}/>
    <path d="M20 27 C27 28 31 24 31 20 C25 19 21 22 20 27 Z" fill="#22C55E" ${ST(1.5)}/>
    ${Array.from({ length: 10 }, (_, i) => `<ellipse cx="20" cy="5.2" rx="2.8" ry="5" fill="#FACC15" ${ST(1.1)} transform="rotate(${i * 36} 20 12)"/>`).join('')}
    <circle cx="20" cy="12" r="4.6" fill="#92400E" ${ST(1.4)}/>`,
  corn: () => `<path d="M20 36 V6" stroke="#65A30D" stroke-width="2.8" fill="none"/>
    <path d="M20 30 Q8 26 4 16 Q12 22 20 25" fill="#84CC16" ${ST(1.4)}/>
    <path d="M20 24 Q32 20 36 9 Q28 17 20 19" fill="#84CC16" ${ST(1.4)}/>
    <path d="M20 14 Q12 10 10 3 Q16 8 20 9" fill="#A3E635" ${ST(1.2)}/>
    <ellipse cx="25" cy="22" rx="3.6" ry="7" fill="#FDE047" ${ST(1.4)} transform="rotate(18 25 22)"/>
    <path d="M23 28 Q26 30 28 27" stroke="#65A30D" stroke-width="1.6" fill="none"/>`,
};

/** Cây `kind` vẽ trong ô 40 × 40 tại (x, y), cạnh s. */
export function plantSvg(kind, x, y, s = 40) {
  return `<g transform="translate(${x} ${y}) scale(${s / 40})">${PLANTS[kind]()}</g>`;
}
/** Hố trồng (chờ cây) trong ô 40 × 40. */
export function holeSvg(x, y, s = 40, faint = false) {
  const k = s / 40;
  return `<ellipse cx="${x + 20 * k}" cy="${y + 32 * k}" rx="${9 * k}" ry="${3.8 * k}" fill="#5B3A1E"${faint ? ' opacity=".4"' : ''}/>`;
}
/** Một cây đứng riêng (để bay từ khay sang luống). */
export const flyPlant = (kind) => `<svg viewBox="0 0 40 40" width="100%" height="100%" style="overflow:visible">${PLANTS[kind]()}</svg>`;

/** Khay gỗ đựng cây con (viewBox 0 0 160 120): cây con nhô lên trên miệng khay, mặt trước để trống ghi số. */
export function crateSvg({ label = '', empty = false } = {}) {
  const tops = empty ? '' : [18, 42, 66, 90, 114].map((x, i) => plantSvg('seed', x, 4 + (i % 2) * 5, 30)).join('');
  return `<svg class="g3v-crate-svg" viewBox="0 0 160 120" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
    ${tops}
    <rect x="8" y="34" width="144" height="80" rx="6" fill="#D6A15B" ${ST(3)}/>
    <path d="M8 60 H152 M8 88 H152" stroke="${INK}" stroke-width="2"/>
    <path d="M20 36 V112 M140 36 V112" stroke="#B07A3B" stroke-width="5"/>
    <rect x="34" y="50" width="92" height="52" rx="10" fill="#FFFBEB" ${ST(2.5)}/>
    <text class="g3v-crate-num${/\d/.test(label) ? '' : ' g3v-crate-word'}" x="80" y="${/\d/.test(label) ? 88 : 84}" text-anchor="middle">${label}</text>
  </svg>`;
}

/** Bình tưới (viewBox 0 0 120 90). */
export function canSvg() {
  return `<svg viewBox="0 0 120 90" width="100%" height="100%" aria-hidden="true">
    <path d="M78 40 L112 16 L116 22 L84 50 Z" fill="#38BDF8" ${ST(2.5)}/>
    <ellipse cx="114" cy="18" rx="5" ry="8" fill="#7DD3FC" ${ST(2)} transform="rotate(-35 114 18)"/>
    <path d="M30 22 Q30 6 52 6 Q74 6 74 22" fill="none" ${ST(5)}/>
    <path d="M30 22 Q30 6 52 6 Q74 6 74 22" fill="none" stroke="#0EA5E9" stroke-width="2.4"/>
    <rect x="14" y="22" width="70" height="60" rx="12" fill="#38BDF8" ${ST(3)}/>
    <rect x="22" y="32" width="16" height="36" rx="6" fill="#BAE6FD" opacity=".8"/>
  </svg>`;
}

/** Mấy giọt nước rơi (bay theo bình tưới khi tưới một hàng). */
export const dropsSvg = () => `<svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
  ${[[8, 6], [20, 16], [32, 8], [14, 28], [28, 30]].map(([x, y]) => `<path d="M${x} ${y} q-4 6 0 8 q4 -2 0 -8 z" fill="#38BDF8" stroke="#0369A1" stroke-width="1"/>`).join('')}</svg>`;

// ── Cảnh vườn phía sau (viewBox 1200 × 300, đáy hình = mặt đất) ─────────────────────────────────────────
const cloud = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity=".95"><ellipse cx="0" cy="0" rx="46" ry="20"/><ellipse cx="-26" cy="6" rx="28" ry="16"/><ellipse cx="28" cy="6" rx="30" ry="16"/><ellipse cx="4" cy="-12" rx="26" ry="18"/></g>`;
const tree = (x, s = 1) => `<g transform="translate(${x} 300) scale(${s})">
  <rect x="-9" y="-70" width="18" height="70" rx="4" fill="#92400E" ${ST(3)}/>
  <circle cx="-26" cy="-92" r="30" fill="#16A34A" ${ST(3)}/><circle cx="26" cy="-92" r="30" fill="#16A34A" ${ST(3)}/>
  <circle cx="0" cy="-118" r="36" fill="#22C55E" ${ST(3)}/><circle cx="-12" cy="-128" r="9" fill="#86EFAC" opacity=".7"/></g>`;
const fence = (from, to, color = '#F8FAFC') => {
  let s = '';
  for (let x = from; x <= to; x += 26) s += `<rect x="${x}" y="262" width="12" height="38" rx="3" fill="${color}" stroke="${INK}" stroke-width="2.5"/>`;
  return `<rect x="${from}" y="272" width="${to - from + 12}" height="8" fill="${color}" stroke="${INK}" stroke-width="2.5"/>${s}`;
};
const house = (x) => `<g transform="translate(${x} 0)">
  <rect x="0" y="150" width="200" height="150" fill="#FEF3C7" ${ST(4)}/>
  <path d="M-22 156 L100 78 L222 156 Z" fill="#EF4444" ${ST(4)}/>
  <rect x="80" y="210" width="44" height="90" rx="5" fill="#B45309" ${ST(3)}/>
  <rect x="20" y="186" width="42" height="38" rx="4" fill="#BAE6FD" ${ST(3)}/><path d="M41 186 V224 M20 205 H62" stroke="${INK}" stroke-width="2"/>
  <rect x="142" y="186" width="42" height="38" rx="4" fill="#BAE6FD" ${ST(3)}/><path d="M163 186 V224 M142 205 H184" stroke="${INK}" stroke-width="2"/>
</g>`;

export function gardenBackdrop() {
  return `<svg class="g3v-backdrop" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <circle cx="1090" cy="62" r="40" fill="#FDE047" ${ST(3)}/>${cloud(180, 56)}${cloud(640, 36, .8)}${cloud(900, 70, .9)}
    <path d="M0 300 Q220 170 470 230 Q700 160 920 226 Q1080 190 1200 220 V300 Z" fill="#BBF7D0"/>
    <path d="M0 300 Q300 230 600 262 Q900 228 1200 270 V300 Z" fill="#86EFAC"/>
    ${house(500)}
    ${tree(90, 1.1)}${tree(260, .85)}${tree(940, .95)}${tree(1120, 1.15)}
    ${fence(0, 1190, '#D6A15B')}
    ${[60, 180, 330, 420, 760, 860, 1020].map((x, i) => `<circle cx="${x}" cy="292" r="7" fill="${['#F472B6', '#FACC15', '#F87171', '#A78BFA'][i % 4]}" ${ST(2)}/><circle cx="${x}" cy="292" r="2.5" fill="#FDE68A"/>`).join('')}
  </svg>`;
}

/** Biểu tượng trò (thẻ trong danh sách trò, màn giới thiệu): luống đất 2 × 3 cây con và bình tưới. */
export function gardenIcon(size = 64) {
  return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
    <rect x="3" y="24" width="58" height="36" rx="7" fill="#A16207" ${ST(2.5)}/>
    <path d="M7 41 H57" stroke="#78350F" stroke-width="2"/>
    ${[[6, 18], [24, 18], [42, 18], [6, 36], [24, 36], [42, 36]].map(([x, y]) => plantSvg('seed', x, y, 18)).join('')}
    <g transform="translate(36 0) scale(.24)">${canSvg().replace(/<\/?svg[^>]*>/g, '')}</g>
  </svg>`;
}
