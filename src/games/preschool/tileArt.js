/**
 * Đồ vật vẽ lại (SVG, nét riêng) cho hình đếm xếp ô (tiles.js) mà hình sách không tách được từng cái:
 * đồ vật chồng lên nhau (chùm bóng bay, hai hàng trực thăng), nằm trên nền màu (khay vàng, nền hồng,
 * tán cây). Ô của những hình này vẽ đồ vật mới thay cho mảnh cắt từ sách.
 *
 * ART_OF[tên hình] = [loại, màu?, dấu?] (màu nếu cả hình một màu khác mặc định; 'sample' = lấy màu từng đồ vật
 * trong hình sách, vd. bóng bay hồng / cam / xanh; dấu = { x: [đồ vật bị gạch], o: [đồ vật được khoanh] }),
 * hoặc { byGroup: { nhóm: [loại, màu?] } } khi chỉ vẽ lại một nhóm (nhóm khác vẫn cắt từ sách).
 * Cũng thay hình sách không hợp với bé (chai rượu, tẩu thuốc) hay chữ tiếng Anh trên đồ vật (Cola, MILK).
 */
const INK = '#3F3A40';
const S = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const svg = (vb, inner) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
const shade = (hex, k) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v) => Math.max(0, Math.min(255, Math.round(k > 0 ? v + (255 - v) * k : v * (1 + k))));
  return `#${[n >> 16, (n >> 8) & 255, n & 255].map(v => ch(v).toString(16).padStart(2, '0')).join('')}`;
};

export const ART = {
  balloon: (c = '#F59E0B') => svg('0 0 60 92', `
    <path d="M30 60 C26 70 36 76 30 90" fill="none" stroke="${INK}" stroke-width="2"/>
    <path d="M30 4 C46 4 56 17 56 31 C56 47 43 58 30 60 C17 58 4 47 4 31 C4 17 14 4 30 4 Z" fill="${c}" ${S}/>
    <path d="M26 60 L34 60 L32 66 L28 66 Z" fill="${shade(c, -0.25)}" ${S} stroke-width="2"/>
    <ellipse cx="19" cy="22" rx="6" ry="9" fill="#fff" opacity="0.75" transform="rotate(25 19 22)"/>`),

  helicopter: (c = '#E11D48') => svg('0 0 104 64', `
    <path d="M38 14 H96" ${S} fill="none"/><path d="M58 14 V22" ${S} fill="none"/>
    <path d="M14 44 H80 M24 44 V38 M68 44 V38" ${S} fill="none"/>
    <path d="M44 30 L8 26 L8 34 L44 36 Z" fill="${c}" ${S}/>
    <circle cx="8" cy="30" r="6" fill="#CBD5E1" ${S} stroke-width="2"/>
    <path d="M40 30 C40 22 52 20 64 20 C82 20 90 28 90 32 C90 38 80 40 64 40 C50 40 40 38 40 30 Z" fill="${c}" ${S}/>
    <path d="M68 23 C78 23 85 28 86 31 L68 31 Z" fill="#7DD3FC" ${S} stroke-width="2"/>`),

  loader: (c = '#0E9F9A') => svg('0 0 104 72', `
    <path d="M4 52 L20 32 L34 32 L30 54 Z" fill="#94A3B8" ${S}/>
    <path d="M30 42 L44 36" ${S} fill="none"/>
    <rect x="40" y="30" width="56" height="22" rx="4" fill="${c}" ${S}/>
    <path d="M62 30 V10 H90 V30" fill="${c}" ${S}/>
    <rect x="68" y="14" width="16" height="12" rx="2" fill="#BAE6FD" ${S} stroke-width="2"/>
    <circle cx="54" cy="56" r="12" fill="#334155" ${S}/><circle cx="54" cy="56" r="4" fill="#CBD5E1"/>
    <circle cx="86" cy="56" r="12" fill="#334155" ${S}/><circle cx="86" cy="56" r="4" fill="#CBD5E1"/>`),

  radish: () => svg('0 0 64 96', `
    <path d="M24 30 C14 16 18 6 26 10 C26 2 36 2 36 10 C42 2 52 8 44 18 C52 20 48 30 40 30 Z" fill="#4ADE80" ${S}/>
    <path d="M32 30 V16 M28 22 L32 26 M36 20 L32 24" fill="none" stroke="#166534" stroke-width="2"/>
    <path d="M18 34 C18 28 46 28 46 34 C48 54 40 76 32 92 C24 76 16 54 18 34 Z" fill="#FFFFFF" ${S}/>
    <path d="M19 36 C22 31 42 31 45 36 C45 44 20 44 19 36 Z" fill="#BBF7D0"/>
    <path d="M24 52 H30 M34 64 H40 M27 74 H32" fill="none" stroke="#CBD5E1" stroke-width="2"/>`),

  cupcake: () => svg('0 0 84 84', `
    <path d="M14 44 H70 L62 78 H22 Z" fill="#7DD3FC" ${S}/>
    <path d="M26 46 L30 78 M38 46 L39 78 M48 46 L46 78 M58 46 L54 78" fill="none" stroke="#0284C7" stroke-width="2"/>
    <path d="M10 46 C6 34 16 26 24 28 C26 14 42 10 48 20 C58 14 72 22 68 32 C78 34 78 46 72 48 C60 52 24 52 10 46 Z" fill="#FDE68A" ${S}/>
    <g stroke="none"><circle cx="26" cy="38" r="2.5" fill="#EF4444"/><circle cx="40" cy="30" r="2.5" fill="#22C55E"/>
    <circle cx="52" cy="38" r="2.5" fill="#3B82F6"/><circle cx="60" cy="30" r="2.5" fill="#EC4899"/><circle cx="34" cy="42" r="2.5" fill="#F97316"/></g>`),

  vase: (c = '#DC2626') => svg('0 0 64 96', `
    <ellipse cx="32" cy="90" rx="26" ry="4" fill="#E7D8C9"/>
    <path d="M22 8 H42 L40 18 C40 26 54 34 54 56 C54 76 44 88 32 88 C20 88 10 76 10 56 C10 34 24 26 24 18 Z" fill="${c}" ${S}/>
    <path d="M20 46 C18 56 20 70 26 78" fill="none" stroke="#fff" stroke-width="4" opacity="0.6"/>
    <path d="M20 8 H44" ${S} fill="none"/>`),

  candy: (c = '#EC4899') => svg('0 0 104 60', `
    <path d="M28 30 L6 12 L10 30 L6 48 Z" fill="${shade(c, 0.45)}" ${S}/>
    <path d="M76 30 L98 12 L94 30 L98 48 Z" fill="${shade(c, 0.45)}" ${S}/>
    <ellipse cx="52" cy="30" rx="26" ry="20" fill="#fff" ${S}/>
    <path d="M36 16 L50 48 M50 11 L64 46 M62 13 L72 36" fill="none" stroke="${c}" stroke-width="6"/>
    <ellipse cx="52" cy="30" rx="26" ry="20" fill="none" ${S}/>`),

  bread: () => svg('0 0 104 52', `
    <path d="M10 30 C6 14 30 8 52 8 C78 8 100 14 96 30 C94 42 74 46 52 46 C28 46 12 42 10 30 Z" fill="#F59E0B" ${S}/>
    <path d="M14 26 C30 18 76 16 92 24" fill="none" stroke="#FCD34D" stroke-width="4"/>
    <path d="M30 18 C34 22 36 28 34 34 M48 16 C52 22 54 28 52 34 M66 16 C70 22 72 28 70 34" fill="none" stroke="#9A3412" stroke-width="3"/>`),

  lollipop: (c = '#FACC15') => svg('0 0 64 104', `
    <path d="M32 54 V100" stroke="#92400E" stroke-width="5" stroke-linecap="round"/>
    <circle cx="32" cy="30" r="26" fill="${c}" ${S}/>
    <path d="M32 30 m0 -3 a3 3 0 1 1 -3 3 a7 7 0 0 1 7 -7 a11 11 0 0 1 11 11 a15 15 0 0 1 -15 15 a19 19 0 0 1 -19 -19"
      fill="none" stroke="#B45309" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M32 66 L18 58 L18 74 Z M32 66 L46 58 L46 74 Z" fill="#FB923C" ${S} stroke-width="2"/>
    <circle cx="32" cy="66" r="3.5" fill="#EA580C" ${S} stroke-width="2"/>`),

  cabbage: () => svg('0 0 76 72', `
    <circle cx="38" cy="38" r="31" fill="#4ADE80" ${S}/>
    <path d="M38 8 C26 24 24 50 38 68 M38 8 C50 24 52 50 38 68 M10 30 C24 36 52 36 66 30" fill="none" stroke="#166534" stroke-width="2.5"/>
    <path d="M14 46 C24 52 52 52 62 46" fill="none" stroke="#166534" stroke-width="2"/>`),

  carrot: () => svg('0 0 96 56', `
    <path d="M70 18 C78 4 92 6 90 14 C96 16 94 28 82 26 C86 36 74 40 70 30" fill="#22C55E" ${S}/>
    <path d="M74 22 C62 14 50 18 8 46 C40 42 70 40 74 22 Z" fill="#F97316" ${S}/>
    <path d="M52 26 L56 32 M38 34 L42 38 M26 40 L28 43" fill="none" stroke="#C2410C" stroke-width="2"/>`),

  fish: (c = '#94A3B8') => svg('0 0 96 58', `
    <path d="M70 29 L92 12 L88 29 L92 46 Z" fill="${shade(c, -0.15)}" ${S}/>
    <path d="M6 29 C16 10 40 6 58 12 C68 16 74 24 74 29 C74 34 68 42 58 46 C40 52 16 48 6 29 Z" fill="${c}" ${S}/>
    <path d="M36 12 C40 6 50 6 54 12" fill="${shade(c, -0.15)}" ${S} stroke-width="2"/>
    <circle cx="20" cy="26" r="3.5" fill="${INK}"/><circle cx="21" cy="25" r="1.2" fill="#fff"/>
    <ellipse cx="28" cy="34" rx="5" ry="3" fill="#F9A8D4"/>
    <path d="M44 20 C48 26 48 32 44 38 M54 20 C58 26 58 32 54 38" fill="none" stroke="${shade(c, -0.3)}" stroke-width="2"/>`),

  bone: () => svg('0 0 104 48', `
    <path d="M24 18 C16 4 2 10 6 20 C0 24 2 36 12 34 C14 42 26 42 28 32 H76 C78 42 90 42 92 34 C102 36 104 24 98 20 C102 10 88 4 80 18 Z" fill="#FFFFFF" ${S}/>
    <path d="M30 22 H74" fill="none" stroke="#E2E8F0" stroke-width="3"/>`),

  peach: (c = '#E2557A') => svg('0 0 76 74', `
    <path d="M38 16 C28 4 14 8 12 14 C24 16 32 16 38 16 Z" fill="#22C55E" ${S}/>
    <path d="M38 18 C18 10 4 28 8 46 C12 64 28 70 38 70 C48 70 64 64 68 46 C72 28 58 10 38 18 Z" fill="${c}" ${S}/>
    <path d="M38 20 C32 34 32 54 38 68" fill="none" stroke="${shade(c, -0.3)}" stroke-width="2.5"/>
    <ellipse cx="22" cy="36" rx="5" ry="8" fill="#fff" opacity="0.45" transform="rotate(20 22 36)"/>`),

  apple: (c = '#DC2626') => svg('0 0 72 76', `
    <path d="M36 18 C38 10 40 6 44 2" fill="none" stroke="#78350F" stroke-width="4" stroke-linecap="round"/>
    <path d="M42 12 C50 2 62 6 62 10 C54 16 46 16 42 12 Z" fill="#22C55E" ${S} stroke-width="2"/>
    <path d="M36 20 C20 10 4 22 6 42 C8 62 22 74 30 72 C34 71 38 71 42 72 C50 74 64 62 66 42 C68 22 52 10 36 20 Z" fill="${c}" ${S}/>
    <ellipse cx="20" cy="36" rx="5" ry="9" fill="#fff" opacity="0.4" transform="rotate(18 20 36)"/>`),

  pear: (c = '#FACC15') => svg('0 0 64 90', `
    <path d="M32 18 C33 10 36 6 40 2" fill="none" stroke="#78350F" stroke-width="4" stroke-linecap="round"/>
    <path d="M32 18 C22 18 20 30 20 38 C12 46 6 56 8 68 C10 82 22 88 32 88 C42 88 54 82 56 68 C58 56 52 46 44 38 C44 30 42 18 32 18 Z" fill="${c}" ${S}/>
    <ellipse cx="20" cy="62" rx="4" ry="9" fill="#fff" opacity="0.45"/>
    <g fill="#CA8A04" stroke="none"><circle cx="36" cy="58" r="1.4"/><circle cx="42" cy="70" r="1.4"/><circle cx="30" cy="74" r="1.4"/><circle cx="46" cy="52" r="1.4"/></g>`),

  chick: (c = '#FDE047') => svg('0 0 76 64', `
    <path d="M30 56 L28 62 M42 56 L44 62" fill="none" stroke="#F97316" stroke-width="3" stroke-linecap="round"/>
    <path d="M10 36 C10 20 26 14 36 18 C42 8 60 8 62 22 C66 30 62 40 56 44 C50 56 22 60 14 50 C4 50 4 42 10 36 Z" fill="${c}" ${S}/>
    <path d="M62 20 L74 24 L62 28 Z" fill="#F97316" ${S} stroke-width="2"/>
    <circle cx="52" cy="20" r="3" fill="${INK}"/>
    <path d="M22 34 C28 42 40 42 44 34" fill="${shade(c, -0.15)}" ${S} stroke-width="2"/>`),

  pin: () => svg('0 0 44 104', `
    <path d="M22 4 C30 4 32 14 30 24 C28 32 26 36 28 42 C36 54 40 70 36 86 C34 96 28 100 22 100 C16 100 10 96 8 86 C4 70 8 54 16 42 C18 36 16 32 14 24 C12 14 14 4 22 4 Z" fill="#FFFFFF" ${S}/>
    <path d="M15 28 H29 M15 34 H29" fill="none" stroke="#DC2626" stroke-width="3.5"/>`),

  icecream: () => svg('0 0 56 104', `
    <path d="M24 66 L18 98 C18 102 26 102 27 98 L32 66 Z" fill="#B45309" ${S}/>
    <path d="M10 22 C10 8 18 4 28 4 C38 4 46 8 46 22 V62 C46 68 40 70 28 70 C16 70 10 68 10 62 Z" fill="#FEF3C7" ${S}/>
    <path d="M10 22 C10 8 18 4 28 4 C38 4 46 8 46 22 V40 C42 48 40 36 36 46 C32 54 30 40 26 50 C22 58 20 42 16 50 C13 56 10 48 10 44 Z" fill="#7F1D1D" ${S}/>
    <path d="M18 14 C20 10 24 9 27 9" fill="none" stroke="#fff" stroke-width="3" opacity="0.5" stroke-linecap="round"/>`),

  can: (c = '#DC2626') => svg('0 0 56 96', `
    <path d="M8 14 C8 8 48 8 48 14 V84 C48 90 8 90 8 84 Z" fill="${c}" ${S}/>
    <ellipse cx="28" cy="13" rx="20" ry="5" fill="#E2E8F0" ${S}/>
    <path d="M8 24 H48 M8 76 H48" stroke="#E2E8F0" stroke-width="4"/>
    <path d="M18 34 C30 40 38 50 28 66" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
    <path d="M14 30 V70" stroke="#fff" stroke-width="3" opacity="0.4" stroke-linecap="round"/>`),

  jug: () => svg('0 0 64 92', `
    <path d="M22 4 H38 V14 H22 Z" fill="#60A5FA" ${S}/>
    <path d="M22 14 L14 26 C8 30 8 36 8 44 V82 C8 88 12 90 18 90 H46 C52 90 56 88 56 82 V40 C56 30 50 24 42 20 L38 14 Z" fill="#FFFFFF" ${S}/>
    <path d="M42 30 C56 30 56 52 44 52" fill="none" ${S}/>
    <path d="M9 56 H55 V82 C55 87 52 89 46 89 H18 C12 89 9 87 9 82 Z" fill="#DBEAFE" stroke="none"/>
    <path d="M8 56 H56" stroke="${INK}" stroke-width="2"/>`),

  bottle: (c = '#86EFAC') => svg('0 0 52 96', `
    <rect x="18" y="4" width="16" height="12" rx="2" fill="#64748B" ${S}/>
    <path d="M14 16 H38 V24 C46 28 48 34 48 42 V86 C48 90 44 92 40 92 H12 C8 92 4 90 4 86 V42 C4 34 6 28 14 24 Z" fill="${c}" ${S}/>
    <rect x="10" y="48" width="32" height="24" rx="4" fill="#FFFFFF" ${S} stroke-width="2"/>
    <path d="M16 56 H36 M16 64 H30" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>`),

  juice: () => svg('0 0 84 92', `
    <path d="M14 4 H26 V16 C34 20 36 26 36 34 V84 C36 88 32 90 28 90 H12 C8 90 4 88 4 84 V34 C4 26 6 20 14 16 Z" fill="#FB923C" ${S}/>
    <rect x="13" y="2" width="14" height="8" rx="2" fill="#16A34A" ${S} stroke-width="2"/>
    <rect x="8" y="44" width="24" height="20" rx="3" fill="#FFF7ED" ${S} stroke-width="2"/>
    <circle cx="20" cy="54" r="6" fill="#FDBA74" stroke="#EA580C" stroke-width="2"/>
    <path d="M48 44 H78 L74 88 H52 Z" fill="#E0F2FE" ${S}/>
    <path d="M49.5 58 H76.5 L74 88 H52 Z" fill="#FB923C" stroke="none"/>
    <path d="M48 44 H78 L74 88 H52 Z" fill="none" ${S}/>
    <path d="M70 30 L64 58" stroke="#EC4899" stroke-width="4" stroke-linecap="round"/>`),

  spoon: (c = '#94A3B8') => svg('0 0 104 48', `
    <path d="M44 22 L98 18 C102 18 102 28 98 28 L44 26 Z" fill="${c}" ${S}/>
    <ellipse cx="24" cy="24" rx="20" ry="14" fill="${shade(c, 0.3)}" ${S}/>
    <ellipse cx="20" cy="20" rx="8" ry="4" fill="#fff" opacity="0.7"/>`),

  palm: () => svg('0 0 80 104', `
    <path d="M36 40 C38 60 34 80 30 100 H46 C46 80 46 60 42 40 Z" fill="#D6A461" ${S}/>
    <path d="M33 56 H44 M32 70 H45 M31 84 H46" stroke="#92400E" stroke-width="2"/>
    <path d="M40 40 C30 24 14 22 4 32 C16 30 26 34 40 40 Z" fill="#84CC16" ${S}/>
    <path d="M40 40 C52 24 68 22 76 32 C64 30 54 34 40 40 Z" fill="#84CC16" ${S}/>
    <path d="M40 40 C34 22 40 8 52 4 C46 16 44 28 40 40 Z" fill="#65A30D" ${S}/>
    <path d="M40 40 C28 36 16 46 14 58 C22 48 30 44 40 40 Z" fill="#65A30D" ${S}/>
    <path d="M40 40 C52 36 64 46 66 58 C58 48 50 44 40 40 Z" fill="#65A30D" ${S}/>
    <circle cx="36" cy="42" r="4" fill="#78350F"/><circle cx="44" cy="43" r="4" fill="#78350F"/>`),

  flower: (c = '#EC4899') => svg('0 0 64 92', `
    <path d="M32 44 V86" stroke="${INK}" stroke-width="3"/>
    <path d="M32 78 C20 66 8 70 8 76 C14 84 26 84 32 78 Z M32 78 C44 66 56 70 56 76 C50 84 38 84 32 78 Z" fill="#A3E635" ${S}/>
    <g fill="${c}" ${S}><ellipse cx="32" cy="12" rx="10" ry="10"/><ellipse cx="50" cy="24" rx="10" ry="10"/><ellipse cx="43" cy="42" rx="10" ry="10"/>
    <ellipse cx="21" cy="42" rx="10" ry="10"/><ellipse cx="14" cy="24" rx="10" ry="10"/></g>
    <circle cx="32" cy="28" r="9" fill="#FDE047" ${S}/>`),

  bee: () => svg('0 0 88 64', `
    <ellipse cx="38" cy="16" rx="12" ry="10" fill="#E0F2FE" ${S} stroke-width="2"/>
    <ellipse cx="54" cy="14" rx="12" ry="10" fill="#E0F2FE" ${S} stroke-width="2"/>
    <path d="M70 38 L84 38" ${S} fill="none"/>
    <ellipse cx="46" cy="38" rx="28" ry="18" fill="#FACC15" ${S}/>
    <path d="M42 21 C38 30 38 46 42 55 M56 22 C52 30 52 46 56 54" fill="none" stroke="${INK}" stroke-width="6"/>
    <circle cx="20" cy="36" r="14" fill="#FDE68A" ${S}/>
    <circle cx="15" cy="33" r="2.5" fill="${INK}"/><path d="M14 41 C17 44 21 44 23 41" fill="none" stroke="${INK}" stroke-width="2"/>
    <path d="M14 23 L8 12 M22 22 L24 10" fill="none" stroke="${INK}" stroke-width="2"/>`),
};

/** Hình sách → loại đồ vật vẽ lại ([loại, màu?]). Tên như count-items.json / pre4 assets (pre4/tên). */
export const ART_OF = {
  'pre1/b9_intro': ['balloon', 'sample'],
  'pre1/c38_0': ['helicopter'],
  'pre1/c38_3': ['loader'],
  'pre1/c40_1': ['radish'],
  'pre2/r44_4': ['cupcake'],
  'pre2/r49_3': ['vase'],
  'pre2/p56_0': ['icecream'],
  'pre2/p56_1': ['candy'],
  'pre2/p56_3': ['bread'],
  'pre2/p57_5': ['lollipop'],
  'pre2/p50_2': ['can'],
  'pre2/p50_3': ['jug'],
  'pre2/p50_5': ['bottle'],
  'pre2/p54_3': { byGroup: { 0: ['juice'] } }, // sách vẽ chai rượu + ly: đổi thành chai nước cam + ly
  'pre2/p56_5': ['spoon'],                       // sách vẽ tẩu thuốc: đổi thành cái thìa
  'pre2/p57_0': ['lollipop', 'sample'],
  'pre2/p57_1': ['lollipop', 'sample'],
  'pre2/p57_2': ['lollipop', 'sample'],
  'pre2/p57_3': ['lollipop', 'sample'],
  'pre2/p57_4': ['lollipop', 'sample'],
  'pre2/p59_4': ['palm'],
  'pre2/p59_5': ['palm'],
  // Bớt đi nhóm bị gạch (x) và nhóm được khoanh (o): giữ dấu của sách trên hình vẽ lại.
  'pre4/p17_hoa': ['flower', undefined, { x: [4, 5, 6, 11, 12], o: [3, 9, 10] }],
  'pre4/p05_bapcai': ['cabbage'],
  'pre4/p10_tho': ['carrot'],
  'pre4/p10_meo': ['fish'],
  'pre4/p10_cho': ['bone'],
  'pre4/p10_be': ['peach', '#E8604C'],
  'pre4/p15_tao': ['apple'],
  'pre4/p15_le': ['pear'],
  'pre4/p15_dao': ['peach', '#B0285A'],
  'pre4/p16_chim': ['chick'],
  'pre4/p17_bowling': ['pin'],
  'pre4/p24_ong': ['bee'],
};
