/** Hình vẽ của Khám phá Toán 2 Tập Hai (SVG tự vẽ, viền mực dày, màu tươi). */

export const INK = '#3F3A40';
const S = `stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"`;

/** Đồ vật nhỏ (viewBox 0 0 40 40). */
const ITEMS = {
  apple: `<path d="M20 12 C10 6 3 14 6 24 C8 32 14 37 20 34 C26 37 32 32 34 24 C37 14 30 6 20 12Z" fill="#EF4444" ${S}/>
    <path d="M20 12 Q21 7 24 4" fill="none" ${S}/><path d="M22 9 Q28 3 33 7 Q28 12 22 9Z" fill="#4ADE80" ${S}/>
    <ellipse cx="13" cy="19" rx="3" ry="5" fill="#fff" opacity=".45"/>`,
  orange: `<circle cx="20" cy="22" r="14" fill="#FB923C" ${S}/><path d="M20 8 Q24 3 29 5 Q26 10 20 8Z" fill="#4ADE80" ${S}/>
    <circle cx="14" cy="17" r="3.4" fill="#fff" opacity=".45"/>`,
  cake: `<path d="M7 20 H33 V33 H7Z" fill="#FDE68A" ${S}/><path d="M7 20 Q7 12 20 12 Q33 12 33 20Z" fill="#F9A8D4" ${S}/>
    <path d="M7 26 H33" stroke="#F472B6" stroke-width="3"/><circle cx="20" cy="9" r="3.5" fill="#EF4444" ${S}/>`,
  flower: `<g ${S}><circle cx="20" cy="9" r="6.5" fill="#F472B6"/><circle cx="30" cy="17" r="6.5" fill="#F472B6"/><circle cx="26" cy="29" r="6.5" fill="#F472B6"/>
    <circle cx="14" cy="29" r="6.5" fill="#F472B6"/><circle cx="10" cy="17" r="6.5" fill="#F472B6"/><circle cx="20" cy="20" r="6" fill="#FDE047"/></g>`,
  carrot: `<path d="M14 12 L26 12 L21 37 Q20 39 19 37Z" fill="#FB923C" ${S}/><path d="M17 12 Q12 3 16 2 Q20 6 20 12 Q22 3 27 4 Q26 9 23 12" fill="#4ADE80" ${S}/>
    <path d="M17 20 H21 M18 27 H21" stroke="${INK}" stroke-width="1.8"/>`,
  fish: `<path d="M5 20 Q16 7 29 20 Q16 33 5 20Z" fill="#38BDF8" ${S}/><path d="M28 20 L37 12 L36 28Z" fill="#0EA5E9" ${S}/><circle cx="12" cy="18" r="2.2" fill="${INK}"/>`,
  chick: `<ellipse cx="20" cy="25" rx="13" ry="11" fill="#FDE047" ${S}/><circle cx="20" cy="12" r="8" fill="#FDE047" ${S}/>
    <path d="M27 12 L33 14 L27 16Z" fill="#FB923C" ${S}/><circle cx="22" cy="10" r="1.8" fill="${INK}"/>`,
  sock: `<path d="M13 4 H25 V22 L33 28 Q36 34 30 36 L16 31 Q12 29 13 25Z" fill="#60A5FA" ${S}/><path d="M13 9 H25" stroke="#fff" stroke-width="3"/>`,
  wheel: `<circle cx="20" cy="20" r="15" fill="#475569" ${S}/><circle cx="20" cy="20" r="8" fill="#E2E8F0" ${S}/><circle cx="20" cy="20" r="2.5" fill="${INK}"/>`,
  star: `<path d="M20 3 L25 15 L38 15 L27.5 23 L31.5 36 L20 28 L8.5 36 L12.5 23 L2 15 L15 15Z" fill="#FACC15" ${S}/>`,
  kid: `<circle cx="20" cy="11" r="7" fill="#FCD9B6" ${S}/><path d="M13 9 Q14 2 20 3 Q27 3 27 9 Q22 6 13 9Z" fill="${INK}"/>
    <path d="M9 37 Q9 21 20 20 Q31 21 31 37Z" fill="#F87171" ${S}/>`,
  onion: `<g stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"><path d="M12 36 Q6 20 10 3 Q17 18 19 36Z" fill="#4ADE80"/><path d="M18 36 Q17 18 22 2 Q27 18 25 36Z" fill="#22C55E"/><path d="M24 36 Q27 20 32 5 Q33 22 30 36Z" fill="#86EFAC"/>
    <ellipse cx="21" cy="35" rx="10" ry="3.5" fill="#fff"/></g><path d="M12 28 H31" stroke="#F87171" stroke-width="3.5"/>`,
  pencil: `<g ${S}><path d="M6 30 L28 8 L33 13 L11 35 L4 37Z" fill="#FACC15"/><path d="M28 8 L31 5 Q33 3 35 5 L36 6 Q37 8 35 10 L33 13Z" fill="#F472B6"/><path d="M11 35 L4 37 L6 30" fill="#FDE68A"/></g>`,
  bottle: `<path d="M16 3 H24 V9 Q30 12 30 18 V35 Q30 37 28 37 H12 Q10 37 10 35 V18 Q10 12 16 9Z" fill="#FDE68A" ${S}/><path d="M10 22 H30 V30 H10Z" fill="#F59E0B" ${S}/>`,
};
export const itemSvg = (id, cls = '') => `<svg class="${cls}" viewBox="0 0 40 40" aria-hidden="true">${ITEMS[id] || ITEMS.apple}</svg>`;
export const itemFly = (id) => `<svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">${ITEMS[id] || ITEMS.apple}</svg>`;

/** Khối hình (viewBox 0 0 100 100), có bóng sáng, góc nhìn chéo. */
const SOLIDS = {
  can: `<path d="M24 22 V80 A26 9 0 0 0 76 80 V22" fill="#EF4444" ${S}/><ellipse cx="50" cy="22" rx="26" ry="9" fill="#D1D5DB" ${S}/>
    <path d="M24 42 H76 V62 H24Z" fill="#fff" opacity=".85"/><text x="50" y="57" text-anchor="middle" font-family="Baloo 2, sans-serif" font-weight="800" font-size="14" fill="#EF4444">SỮA</text>
    <path d="M30 30 V76" stroke="#fff" stroke-width="4" opacity=".45" stroke-linecap="round"/>`,
  ball: `<circle cx="50" cy="52" r="34" fill="#38BDF8" ${S}/><path d="M18 46 Q50 62 82 46 M50 18 Q36 52 50 86" fill="none" stroke="#FDE047" stroke-width="7"/>
    <circle cx="50" cy="52" r="34" fill="none" ${S}/><ellipse cx="37" cy="36" rx="8" ry="5" fill="#fff" opacity=".6" transform="rotate(-30 37 36)"/>`,
  gift: `<path d="M18 38 L50 28 L82 38 L50 48Z" fill="#F9A8D4" ${S}/><path d="M18 38 V76 L50 88 V48Z" fill="#EC4899" ${S}/><path d="M82 38 V76 L50 88 V48Z" fill="#DB2777" ${S}/>
    <path d="M34 33 L66 43 V83" fill="none" stroke="#FDE047" stroke-width="5"/><path d="M50 28 Q38 14 44 12 Q52 14 50 28 Q58 12 64 16 Q62 26 50 28" fill="#FDE047" ${S}/>`,
  log: `<path d="M14 36 H74 A12 20 0 0 1 74 76 H14Z" fill="#B45309" ${S}/><ellipse cx="14" cy="56" rx="12" ry="20" fill="#FCD34D" ${S}/>
    <ellipse cx="14" cy="56" rx="6" ry="10" fill="none" stroke="#B45309" stroke-width="2"/><path d="M26 44 H68" stroke="#FDE68A" stroke-width="3" opacity=".6"/>`,
  orange: `<circle cx="50" cy="54" r="32" fill="#FB923C" ${S}/><path d="M50 22 Q58 10 70 14 Q64 24 50 22Z" fill="#4ADE80" ${S}/><ellipse cx="38" cy="40" rx="7" ry="5" fill="#fff" opacity=".5" transform="rotate(-30 38 40)"/>`,
  dice: `<path d="M20 36 L50 26 L80 36 L50 46Z" fill="#fff" ${S}/><path d="M20 36 V72 L50 84 V46Z" fill="#E5E7EB" ${S}/><path d="M80 36 V72 L50 84 V46Z" fill="#D1D5DB" ${S}/>
    <circle cx="50" cy="36" r="3.5" fill="#EF4444"/><circle cx="30" cy="52" r="3.2" fill="${INK}"/><circle cx="40" cy="66" r="3.2" fill="${INK}"/><circle cx="62" cy="54" r="3.2" fill="${INK}"/><circle cx="70" cy="64" r="3.2" fill="${INK}"/>`,
  drum: `<path d="M16 34 V70 A34 12 0 0 0 84 70 V34" fill="#F87171" ${S}/><ellipse cx="50" cy="34" rx="34" ry="12" fill="#FEF3C7" ${S}/>
    <path d="M16 40 L30 68 L44 42 L58 70 L72 42 L84 64" fill="none" stroke="#FDE047" stroke-width="3"/><path d="M60 8 L54 30 M76 12 L62 30" ${S} fill="none" stroke-linecap="round"/>`,
  marble: `<circle cx="50" cy="54" r="26" fill="#A78BFA" ${S}/><path d="M32 60 Q50 44 68 56" fill="none" stroke="#F472B6" stroke-width="5"/><ellipse cx="41" cy="44" rx="6" ry="4" fill="#fff" opacity=".7" transform="rotate(-30 41 44)"/>`,
  glass: `<path d="M28 20 L32 82 A18 6 0 0 0 68 82 L72 20" fill="#BAE6FD" opacity=".9" ${S}/><ellipse cx="50" cy="20" rx="22" ry="7" fill="#E0F2FE" ${S}/>
    <path d="M31 48 L33 82 A17 5 0 0 0 67 82 L69 48 A19 6 0 0 1 31 48Z" fill="#FB923C" opacity=".8"/><path d="M36 26 L39 76" stroke="#fff" stroke-width="4" opacity=".7" stroke-linecap="round"/>`,
  globe: `<circle cx="50" cy="50" r="32" fill="#60A5FA" ${S}/><path d="M34 34 Q44 28 48 38 Q42 46 50 52 Q44 62 36 56 Q28 46 34 34Z M58 30 Q70 32 72 44 Q64 50 58 42Z M58 62 Q68 58 70 68 Q62 76 56 70Z" fill="#4ADE80" ${S}/>
    <path d="M50 82 V92 M36 94 H64" ${S} fill="none" stroke-linecap="round"/>`,
};
export const solidSvg = (id) => `<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">${SOLIDS[id]}</svg>`;
export const SOLID_KIND = { can: 'tru', drum: 'tru', log: 'tru', glass: 'tru', ball: 'cau', orange: 'cau', marble: 'cau', globe: 'cau', gift: 'khac', dice: 'khac' };
export const SOLID_NAME = { can: 'lon sữa', drum: 'cái trống', log: 'khúc gỗ', glass: 'cốc nước', ball: 'quả bóng', orange: 'quả cam', marble: 'viên bi', globe: 'quả địa cầu', gift: 'hộp quà', dice: 'con xúc xắc' };

/** Mẫu khối trụ, khối cầu (để trên nút chọn). */
export const MODEL = {
  tru: `<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true"><path d="M26 24 V76 A24 8 0 0 0 74 76 V24" fill="#FCD34D" ${S}/><ellipse cx="50" cy="24" rx="24" ry="8" fill="#FEF3C7" ${S}/><path d="M33 32 V74" stroke="#fff" stroke-width="5" opacity=".6" stroke-linecap="round"/></svg>`,
  cau: `<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true"><circle cx="50" cy="52" r="30" fill="#4ADE80" ${S}/><ellipse cx="50" cy="52" rx="30" ry="9" fill="none" stroke="${INK}" stroke-width="1.6" stroke-dasharray="4 3"/><ellipse cx="39" cy="38" rx="7" ry="4.5" fill="#fff" opacity=".65" transform="rotate(-30 39 38)"/></svg>`,
  khac: `<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true"><path d="M22 36 L50 26 L78 36 L50 46Z" fill="#E9D5FF" ${S}/><path d="M22 36 V72 L50 84 V46Z" fill="#C084FC" ${S}/><path d="M78 36 V72 L50 84 V46Z" fill="#A855F7" ${S}/></svg>`,
};

/** Bi màu (viewBox 0 0 40 40). */
export const BALL_COLOR = { red: ['#EF4444', 'đỏ'], blue: ['#3B82F6', 'xanh'], yellow: ['#FACC15', 'vàng'] };
export const ballSvg = (c) => `<svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true"><circle cx="20" cy="20" r="15" fill="${BALL_COLOR[c][0]}" ${S}/><ellipse cx="14" cy="14" rx="4.5" ry="3" fill="#fff" opacity=".7" transform="rotate(-35 14 14)"/></svg>`;
