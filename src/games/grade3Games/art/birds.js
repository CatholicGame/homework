/**
 * Hình vẽ của trò 🐦 Săn chim (birds.js): 7 loài chim Việt Nam, lồng tre, túi lưới, ná cao su, giỏ, máy ảnh và cảnh
 * đồng quê có trạm chim. Phong cách chung của trò chơi: màu phẳng tươi, viền INK đậm, hình đơn giản.
 * Chim vẽ quay sang phải (viewBox -56 -44 112 80); cánh là nhóm .g3k-wing để CSS vỗ cánh.
 */

const INK = '#3F3A40';
const ST = `stroke="${INK}" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round"`;

/**
 * Loài chim: tên, màu thân / bụng / đầu / mỏ / cánh, kiểu đuôi, chi tiết riêng (mào, má đỏ, cổ dài…).
 * gram: cân nặng một con ngoài đời (để lời nói và mẹo sát thực tế).
 */
export const BIRDS = {
  se: { name: 'chim sẻ', body: '#A16207', belly: '#FDE7C2', head: '#92400E', beak: '#57534E', wing: '#78350F', tail: 'fan', bib: true },
  chaomao: { name: 'chim chào mào', body: '#78716C', belly: '#FAFAF9', head: '#1C1917', beak: '#1C1917', wing: '#57534E', tail: 'fan', crest: true, cheek: '#DC2626' },
  sao: { name: 'chim sáo', body: '#27272A', belly: '#3F3F46', head: '#18181B', beak: '#FACC15', wing: '#18181B', tail: 'fan', patch: true },
  bocau: { name: 'chim bồ câu', body: '#94A3B8', belly: '#CBD5E1', head: '#64748B', beak: '#F9A8D4', wing: '#64748B', tail: 'fan', neck: true },
  co: { name: 'cò trắng', body: '#FFFFFF', belly: '#F1F5F9', head: '#FFFFFF', beak: '#F59E0B', wing: '#F8FAFC', tail: 'fan', long: true },
  en: { name: 'chim én', body: '#1E3A8A', belly: '#F8FAFC', head: '#1E3A8A', beak: '#1F2937', wing: '#172554', tail: 'fork', throat: '#B45309' },
  vit: { name: 'vịt trời', body: '#A8714A', belly: '#D6B48C', head: '#15803D', beak: '#EAB308', wing: '#7C5235', tail: 'fan', duck: true },
};

/** Thân một con chim (không có thẻ <svg>), quay sang phải. perch: đậu (có chân, cánh khép). */
export function birdBody(id, { perch = false } = {}) {
  const b = BIRDS[id];
  const hx = b.long ? 34 : 26, hy = b.long ? -22 : -14; // cò: cổ dài, đầu cao hơn
  const tail = b.tail === 'fork'
    ? `<path d="M-24 -2 L-54 -16 L-40 0 L-56 12 L-24 6 Z" fill="${b.wing}" ${ST}/>`
    : `<path d="M-22 -6 L-48 -14 Q-54 0 -48 10 L-22 6 Z" fill="${b.wing}" ${ST}/>`;
  const neck = b.long ? `<path d="M14 -10 Q24 -14 ${hx - 4} ${hy + 8}" stroke="${b.body}" stroke-width="13" fill="none"/><path d="M14 -16 Q22 -22 ${hx - 8} ${hy + 2} M18 -2 Q28 -4 ${hx + 4} ${hy + 10}" ${ST} fill="none"/>` : '';
  const legs = perch
    ? `<path d="M-4 18 V30 M8 18 V30 M-9 30 H1 M3 30 H13" stroke="#F59E0B" stroke-width="3.4" stroke-linecap="round" fill="none"/>`
    : b.long ? `<path d="M-20 10 L-50 22 M-18 14 L-50 28" stroke="#1F2937" stroke-width="3.4" stroke-linecap="round" fill="none"/>` : '';
  const beak = b.duck
    ? `<path d="M${hx + 10} ${hy - 4} Q${hx + 26} ${hy - 2} ${hx + 25} ${hy + 4} Q${hx + 18} ${hy + 7} ${hx + 10} ${hy + 4} Z" fill="${b.beak}" ${ST}/>`
    : b.long
      ? `<path d="M${hx + 10} ${hy - 4} L${hx + 34} ${hy + 1} L${hx + 10} ${hy + 4} Z" fill="${b.beak}" ${ST}/>`
      : `<path d="M${hx + 11} ${hy - 5} L${hx + 25} ${hy} L${hx + 11} ${hy + 5} Z" fill="${b.beak}" ${ST}/>`;
  const wing = perch
    ? `<path d="M-14 -8 Q6 -16 20 -2 Q8 12 -16 8 Z" fill="${b.wing}" ${ST}/>`
    : `<g class="g3k-wing"><path d="M-14 -6 Q-6 -40 22 -44 Q14 -20 16 -4 Z" fill="${b.wing}" ${ST}/>${b.patch ? '<path d="M2 -30 Q10 -34 16 -34 Q12 -26 12 -20 Z" fill="#fff"/>' : ''}</g>`;
  return `${legs}${tail}
    <ellipse cx="0" cy="2" rx="${b.long ? 28 : 30}" ry="${b.long ? 17 : 20}" fill="${b.body}" ${ST}/>
    <path d="M-14 10 Q2 24 22 6 Q10 2 -14 10 Z" fill="${b.belly}"/>
    ${neck}
    <circle cx="${hx}" cy="${hy}" r="${b.long ? 12 : 15}" fill="${b.head}" ${ST}/>
    ${b.bib ? `<path d="M${hx - 2} ${hy + 8} Q${hx + 8} ${hy + 16} ${hx + 12} ${hy + 6} Z" fill="#1C1917"/><path d="M${hx - 10} ${hy - 6} Q${hx} ${hy - 2} ${hx + 6} ${hy + 4}" stroke="#FDE7C2" stroke-width="4" fill="none"/>` : ''}
    ${b.neck ? `<path d="M${hx - 12} ${hy + 10} Q${hx - 2} ${hy + 18} ${hx + 8} ${hy + 12}" stroke="#86EFAC" stroke-width="5" fill="none"/><path d="M${hx - 13} ${hy + 15} Q${hx - 4} ${hy + 22} ${hx + 6} ${hy + 17}" stroke="#C4B5FD" stroke-width="4" fill="none"/>` : ''}
    ${b.throat ? `<circle cx="${hx + 6}" cy="${hy + 8}" r="6" fill="${b.throat}"/>` : ''}
    ${b.crest ? `<path d="M${hx - 8} ${hy - 12} L${hx - 2} ${hy - 32} L${hx + 4} ${hy - 13} Z" fill="${b.head}" ${ST}/>` : ''}
    ${b.cheek ? `<circle cx="${hx + 3}" cy="${hy + 4}" r="4.5" fill="${b.cheek}"/><path d="M${hx - 6} ${hy + 9} Q${hx + 4} ${hy + 14} ${hx + 12} ${hy + 8}" stroke="#fff" stroke-width="3" fill="none"/>` : ''}
    ${b.duck ? `<path d="M${hx - 12} ${hy + 12} Q${hx} ${hy + 18} ${hx + 10} ${hy + 12}" stroke="#fff" stroke-width="3.5" fill="none"/>` : ''}
    ${beak}
    <circle cx="${hx + 5}" cy="${hy - 4}" r="3.6" fill="${b.head === '#FFFFFF' || b.head === '#18181B' || b.head === '#1C1917' ? '#1F2937' : INK}" ${b.head === '#18181B' || b.head === '#1C1917' ? 'stroke="#FDE68A" stroke-width="1.6"' : ''}/>
    <circle cx="${hx + 6.4}" cy="${hy - 5.4}" r="1.3" fill="#fff"/>
    ${wing}`;
}

/** Con chim hoàn chỉnh (svg vừa khung). flip: quay sang trái. */
export function birdSvg(id, { perch = false, flip = false, cls = '' } = {}) {
  return `<svg class="g3k-bsvg ${cls}" viewBox="-58 -48 116 84" aria-hidden="true"><g${flip ? ' transform="scale(-1 1)"' : ''}>${birdBody(id, { perch })}</g></svg>`;
}

// ── Lồng tre ───────────────────────────────────────────────────────────────────────────────────────
/** Mặt sau lồng (đáy, nền trong lồng) — viewBox 0 0 100 110. */
export const CAGE_BACK = `<svg class="g3k-cage-bg" viewBox="0 0 100 110" preserveAspectRatio="none" aria-hidden="true">
  <path d="M8 104 V42 Q8 8 50 8 Q92 8 92 42 V104 Z" fill="#FEF9C3" opacity=".75"/>
  <rect x="4" y="96" width="92" height="12" rx="4" fill="#B45309" stroke="${INK}" stroke-width="3"/></svg>`;
/** Mặt trước lồng: các nan tre, vòng đai, móc treo (không chặn chạm). */
export const CAGE_FRONT = `<svg class="g3k-cage-fg" viewBox="0 0 100 110" preserveAspectRatio="none" aria-hidden="true">
  <path d="M8 98 V42 Q8 8 50 8 Q92 8 92 42 V98" fill="none" stroke="#A16207" stroke-width="4.5" vector-effect="non-scaling-stroke"/>
  ${[22, 36, 50, 64, 78].map(x => `<path d="M${x} 98 V${x === 50 ? 8 : 42 - (50 - Math.abs(50 - x)) * 0.5}" stroke="#CA8A04" stroke-width="2.4" opacity=".8" vector-effect="non-scaling-stroke"/>`).join('')}
  <path d="M8 42 H92 M8 70 H92" stroke="#A16207" stroke-width="3" opacity=".85" vector-effect="non-scaling-stroke"/>
  <circle cx="50" cy="5" r="4" fill="none" stroke="${INK}" stroke-width="2.5" vector-effect="non-scaling-stroke"/></svg>`;

/** Túi lưới (vợt bắt chim có cán dài) — viewBox 0 0 120 120. */
export const NET_BAG = `<svg class="g3k-netsvg" viewBox="0 0 120 120" aria-hidden="true">
  <path d="M60 64 L112 6" stroke="#92400E" stroke-width="9" stroke-linecap="round"/><path d="M60 64 L112 6" stroke="${INK}" stroke-width="2" stroke-linecap="round" opacity=".5"/>
  <ellipse cx="44" cy="62" rx="36" ry="14" fill="none" stroke="${INK}" stroke-width="5"/>
  <path d="M10 62 Q16 112 46 114 Q74 112 78 62" fill="#ECFDF5" fill-opacity=".55" stroke="${INK}" stroke-width="3.5"/>
  <path d="M20 70 L66 108 M34 66 L74 98 M52 64 L76 80 M16 84 L40 112 M68 66 L24 106 M54 66 L16 96 M78 76 L50 112" stroke="#64748B" stroke-width="2" opacity=".8"/></svg>`;

/** Lưới chụp xuống (hiệu ứng lúc bắt): vòng lưới + mắt lưới. viewBox 0 0 100 100. */
export const NET_DROP = `<svg viewBox="0 0 100 100" aria-hidden="true"><ellipse cx="50" cy="26" rx="44" ry="14" fill="none" stroke="${INK}" stroke-width="5"/>
  <path d="M6 26 Q10 92 50 96 Q90 92 94 26" fill="#ECFDF5" fill-opacity=".45" stroke="${INK}" stroke-width="3.5"/>
  <path d="M16 34 L70 92 M34 30 L86 76 M60 28 L90 50 M84 34 L30 92 M62 30 L12 74 M40 30 L10 50" stroke="#64748B" stroke-width="2.2"/></svg>`;

/** Ná cao su (chạc gỗ chữ Y) — viewBox 0 0 100 140; dây ná vẽ riêng (động) theo điểm kéo. */
export const SLING = `<svg class="g3k-slingsvg" viewBox="0 0 100 140" aria-hidden="true">
  <path d="M42 138 L44 80 Q30 64 18 26 M58 138 L56 80 Q70 64 82 26" stroke="${INK}" stroke-width="15" stroke-linecap="round" fill="none"/>
  <path d="M42 138 L44 80 Q30 64 18 26 M58 138 L56 80 Q70 64 82 26" stroke="#B45309" stroke-width="9" stroke-linecap="round" fill="none"/>
  <path d="M44 80 Q50 74 56 80" stroke="#B45309" stroke-width="12" fill="none"/>
  <rect x="38" y="96" width="24" height="26" rx="5" fill="#EF4444" stroke="${INK}" stroke-width="3"/>
  <path d="M38 104 H62 M38 112 H62" stroke="#FCA5A5" stroke-width="2.5"/></svg>`;
/** Hai đầu chạc ná, theo toạ độ viewBox của SLING (để vẽ dây ná). */
export const SLING_TIPS = [[18, 26], [82, 26]];

/** Viên đạn ná: hòn đất sét tròn. */
export const STONE = `<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="#A8A29E" stroke="${INK}" stroke-width="2.5"/><circle cx="7" cy="7" r="2.4" fill="#E7E5E4"/></svg>`;

/** Giỏ tre (chim trúng ná rơi vào, ngồi xù lông) — viewBox 0 0 120 90. */
export const BASKET = `<svg class="g3k-basketsvg" viewBox="0 0 120 90" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
  <path d="M10 30 Q60 -14 110 30" fill="none" stroke="#92400E" stroke-width="6"/>
  <path d="M6 30 H114 L102 86 H18 Z" fill="#D97706" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M10 46 H110 M13 62 H107 M16 76 H104" stroke="#92400E" stroke-width="3"/>
  ${[24, 40, 56, 72, 88].map(x => `<path d="M${x} 30 L${x + (x - 60) * -0.06} 86" stroke="#FBBF24" stroke-width="3" opacity=".8"/>`).join('')}
  <rect x="2" y="24" width="116" height="10" rx="5" fill="#B45309" stroke="${INK}" stroke-width="3"/></svg>`;

/** Máy ảnh (nút chụp, biểu tượng quầy). */
export const CAMERA = (size = 56) => `<svg width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">
  <rect x="4" y="16" width="56" height="40" rx="8" fill="#334155" stroke="${INK}" stroke-width="3"/>
  <path d="M20 16 L25 8 H39 L44 16 Z" fill="#475569" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="32" cy="36" r="14" fill="#E2E8F0" stroke="${INK}" stroke-width="3"/><circle cx="32" cy="36" r="9" fill="#0EA5E9" stroke="${INK}" stroke-width="2.5"/>
  <circle cx="29" cy="33" r="3" fill="#E0F2FE"/><rect x="47" y="21" width="8" height="5" rx="2" fill="#FDE047"/></svg>`;

/** Biểu tượng quầy: con chim + vật của quầy. */
export const birdIcon = (id, size = 56) => `<svg width="${size}" height="${size}" viewBox="-58 -58 116 116" aria-hidden="true">${birdBody(id)}</svg>`;

/** Tấm ảnh polaroid (bay vào album sau khi chụp). */
export const POLAROID = (id) => `<svg viewBox="0 0 100 110" width="100%" height="100%" aria-hidden="true">
  <rect x="3" y="3" width="94" height="104" rx="4" fill="#fff" stroke="${INK}" stroke-width="3"/>
  <rect x="11" y="11" width="78" height="66" fill="#7DD3FC"/>
  <g transform="translate(34 46) scale(.32)">${birdBody(id)}</g><g transform="translate(64 34) scale(.28)">${birdBody(id)}</g><g transform="translate(62 62) scale(.26)">${birdBody(id)}</g></svg>`;

// ── Cảnh đồng quê: đồi, ruộng lúa, ao sen, cột điện, hàng tre, trạm chim (viewBox 1200 × 300, đáy = mép bãi cỏ) ──
const tree = (x, s = 1) => `<g transform="translate(${x} 300) scale(${s})">
  <rect x="-9" y="-70" width="18" height="70" rx="4" fill="#92400E" stroke="${INK}" stroke-width="3"/>
  <circle cx="-26" cy="-92" r="30" fill="#16A34A" stroke="${INK}" stroke-width="3"/><circle cx="26" cy="-92" r="30" fill="#16A34A" stroke="${INK}" stroke-width="3"/>
  <circle cx="0" cy="-118" r="36" fill="#22C55E" stroke="${INK}" stroke-width="3"/><circle cx="-12" cy="-128" r="9" fill="#86EFAC" opacity=".7"/></g>`;
const bamboo = (x, s = 1) => `<g transform="translate(${x} 300) scale(${s})">${[-14, 0, 14].map((dx, i) => `<path d="M${dx} 0 Q${dx + (i - 1) * 8} -90 ${dx + (i - 1) * 26} -170" stroke="#65A30D" stroke-width="7" fill="none"/>`).join('')}
  ${[[-30, -150], [8, -170], [36, -140], [-12, -110], [26, -96]].map(([lx, ly]) => `<ellipse cx="${lx}" cy="${ly}" rx="26" ry="9" fill="#4ADE80" stroke="${INK}" stroke-width="2.5" transform="rotate(${lx > 0 ? -20 : 20} ${lx} ${ly})"/>`).join('')}</g>`;
const cloud = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity=".95"><ellipse cx="0" cy="0" rx="46" ry="20"/><ellipse cx="-26" cy="6" rx="28" ry="16"/><ellipse cx="28" cy="6" rx="30" ry="16"/><ellipse cx="4" cy="-12" rx="26" ry="18"/></g>`;
const pole = (x) => `<path d="M${x} 300 V120" stroke="#78716C" stroke-width="9"/><path d="M${x} 300 V120" stroke="${INK}" stroke-width="2" opacity=".4"/><path d="M${x - 26} 132 H${x + 26}" stroke="#78716C" stroke-width="7"/>`;

export const FIELD_BACKDROP = `<svg class="g3k-backdrop" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <circle cx="1090" cy="70" r="40" fill="#FDE047" stroke="${INK}" stroke-width="3"/>
  ${cloud(160, 60)}${cloud(620, 40, .8)}${cloud(900, 90, .7)}
  <path d="M0 220 Q200 120 420 190 Q640 110 860 180 Q1040 120 1200 170 V300 H0 Z" fill="#86EFAC" stroke="${INK}" stroke-width="3"/>
  <path d="M0 250 Q300 200 600 240 Q900 200 1200 240 V300 H0 Z" fill="#4ADE80" stroke="${INK}" stroke-width="3"/>
  ${pole(250)}${pole(960)}
  <path d="M224 132 Q605 196 934 132 M276 132 Q605 210 986 132" stroke="${INK}" stroke-width="2" fill="none"/>
  ${[0, 1, 2, 3].map(i => `<path d="M${330 + i * 70} 268 l18 -22 l18 22" stroke="#65A30D" stroke-width="4" fill="none"/>`).join('')}
  <ellipse cx="610" cy="282" rx="130" ry="20" fill="#38BDF8" stroke="${INK}" stroke-width="3"/>
  ${[[560, 278], [620, 286], [672, 276]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="16" ry="6" fill="#22C55E" stroke="${INK}" stroke-width="2"/>`).join('')}
  <path d="M640 276 q6 -14 12 0 q-6 -4 -12 0" fill="#F472B6" stroke="${INK}" stroke-width="2"/>
  <g transform="translate(1030 300)">
    <rect x="-70" y="-110" width="140" height="110" fill="#D6A15B" stroke="${INK}" stroke-width="4"/>
    <path d="M-86 -104 L0 -160 L86 -104 Z" fill="#B45309" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <rect x="-62" y="-150" width="124" height="34" rx="6" fill="#FEF3C7" stroke="${INK}" stroke-width="3" transform="translate(0 52)"/>
    <text x="0" y="-74" text-anchor="middle" font-size="22" font-weight="800" fill="#7C2D12" font-family="'Baloo 2', Quicksand, sans-serif">TRẠM CHIM</text>
    <rect x="-22" y="-56" width="44" height="56" rx="4" fill="#92400E" stroke="${INK}" stroke-width="3"/>
    <path d="M-70 -40 H-46 M46 -40 H70" stroke="#92400E" stroke-width="3"/></g>
  ${bamboo(70, 1)}${tree(160, .9)}${tree(820, .8)}${bamboo(1170, .9)}</svg>`;
