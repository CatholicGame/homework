/**
 * Hình vẽ cho Khám phá Toán 1: đồ vật để đếm, xếp, nối (mỗi hình trong khung 100 × 100, nét viền đậm INK),
 * hình phẳng (vuông, tròn, tam giác) và cảnh đồng cỏ phía sau. Vẽ theo nét riêng của app.
 */

export const INK = '#3F3A40';
const S = `stroke="${INK}" stroke-width="4" stroke-linejoin="round"`;
const S3 = `stroke="${INK}" stroke-width="3" stroke-linejoin="round"`;
const eye = (x, y, r = 4.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/><circle cx="${x + r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.35}" fill="#fff"/>`;

const ART = {
  apple: () => `<path d="M50 30 C24 14 8 40 18 66 C26 86 42 92 50 84 C58 92 74 86 82 66 C92 40 76 14 50 30Z" fill="#EF4444" ${S}/>
    <ellipse cx="33" cy="46" rx="6" ry="9" fill="#FECACA" opacity=".85"/>
    <path d="M50 30 L54 12" stroke="#78350F" stroke-width="5" stroke-linecap="round"/>
    <path d="M55 18 Q70 6 80 16 Q68 26 55 18Z" fill="#22C55E" ${S3}/>`,
  duck: () => `<path d="M14 58 Q14 86 50 86 Q84 86 86 62 Q88 50 76 52 L62 56 Q60 44 50 44 Q30 44 14 58Z" fill="#FDE047" ${S}/>
    <circle cx="66" cy="34" r="17" fill="#FDE047" ${S}/>
    <path d="M80 34 L96 38 L80 44Z" fill="#FB923C" ${S3}/>${eye(70, 30)}
    <path d="M34 64 Q46 74 60 64" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`,
  fish: () => `<path d="M14 50 Q38 20 66 32 Q78 38 80 50 Q78 62 66 68 Q38 80 14 50Z" fill="#FB923C" ${S}/>
    <path d="M78 50 L96 32 L94 68Z" fill="#F97316" ${S}/>
    <path d="M44 34 Q50 50 44 66" fill="none" stroke="${INK}" stroke-width="3"/>${eye(28, 46)}`,
  chick: () => `<ellipse cx="50" cy="58" rx="34" ry="30" fill="#FACC15" ${S}/>
    <path d="M44 22 Q48 10 54 20 Q58 12 60 24" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    ${eye(38, 48)}${eye(62, 48)}<path d="M44 58 L56 58 L50 68Z" fill="#FB923C" ${S3}/>
    <path d="M22 62 Q12 56 16 70 M78 62 Q88 56 84 70" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <path d="M40 88 V96 M60 88 V96" stroke="#F97316" stroke-width="5" stroke-linecap="round"/>`,
  bird: () => `<ellipse cx="48" cy="56" rx="32" ry="26" fill="#60A5FA" ${S}/>
    <path d="M28 54 Q40 74 60 58" fill="#3B82F6" ${S3}/>
    <circle cx="70" cy="38" r="15" fill="#60A5FA" ${S}/>${eye(73, 35, 4)}
    <path d="M84 38 L98 42 L84 46Z" fill="#FBBF24" ${S3}/>
    <path d="M18 50 L4 42 L8 58Z" fill="#3B82F6" ${S3}/>`,
  star: () => `<path d="M50 8 L61 36 L92 38 L68 58 L76 88 L50 72 L24 88 L32 58 L8 38 L39 36Z" fill="#FACC15" ${S}/>
    <path d="M44 34 L50 22" stroke="#FEF9C3" stroke-width="5" stroke-linecap="round"/>`,
  ball: () => `<circle cx="50" cy="50" r="40" fill="#F87171" ${S}/>
    <path d="M12 44 Q50 64 88 44" fill="none" stroke="#fff" stroke-width="9"/><path d="M12 44 Q50 64 88 44" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M40 11 Q60 50 40 89" fill="none" stroke="#FDE047" stroke-width="8"/><path d="M40 11 Q60 50 40 89" fill="none" stroke="${INK}" stroke-width="3"/>
    <circle cx="50" cy="50" r="40" fill="none" ${S}/>`,
  flower: () => `<path d="M50 56 V96" stroke="#16A34A" stroke-width="6" stroke-linecap="round"/>
    <path d="M50 80 Q30 66 26 78 Q36 88 50 80Z" fill="#22C55E" ${S3}/>
    ${[0, 72, 144, 216, 288].map(a => `<ellipse cx="50" cy="20" rx="13" ry="17" fill="#F472B6" ${S3} transform="rotate(${a} 50 38)"/>`).join('')}
    <circle cx="50" cy="38" r="11" fill="#FDE047" ${S3}/>`,
  car: () => `<path d="M8 64 V50 Q8 44 16 42 L28 40 L38 24 Q40 20 46 20 H66 Q72 20 76 26 L84 40 Q94 42 94 52 V64Z" fill="#EF4444" ${S}/>
    <path d="M42 28 H54 V40 H34Z M60 28 H70 L76 40 H60Z" fill="#BAE6FD" ${S3}/>
    <circle cx="28" cy="66" r="11" fill="#475569" ${S}/><circle cx="74" cy="66" r="11" fill="#475569" ${S}/>
    <circle cx="28" cy="66" r="4" fill="#E2E8F0"/><circle cx="74" cy="66" r="4" fill="#E2E8F0"/>`,
  cup: () => `<path d="M18 28 H72 L66 84 Q64 90 58 90 H32 Q26 90 24 84Z" fill="#38BDF8" ${S}/>
    <path d="M70 40 Q92 40 90 56 Q88 70 68 70" fill="none" stroke="${INK}" stroke-width="7"/>
    <path d="M70 40 Q92 40 90 56 Q88 70 68 70" fill="none" stroke="#38BDF8" stroke-width="3"/>
    <ellipse cx="45" cy="28" rx="27" ry="6" fill="#E0F2FE" ${S3}/><path d="M30 44 V74" stroke="#E0F2FE" stroke-width="5" stroke-linecap="round"/>`,
  spoon: () => `<g transform="rotate(-35 50 50)"><ellipse cx="50" cy="26" rx="15" ry="20" fill="#CBD5E1" ${S}/>
    <ellipse cx="46" cy="22" rx="5" ry="8" fill="#F8FAFC"/>
    <path d="M45 44 H55 L54 92 Q50 96 46 92Z" fill="#CBD5E1" ${S}/></g>`,
  bunny: () => `<path d="M34 44 Q22 4 32 6 Q44 8 44 42Z M66 44 Q78 4 68 6 Q56 8 56 42Z" fill="#F8FAFC" ${S}/>
    <path d="M34 36 Q30 16 33 12 Q38 14 40 36Z M66 36 Q70 16 67 12 Q62 14 60 36Z" fill="#FBCFE8"/>
    <ellipse cx="50" cy="64" rx="32" ry="28" fill="#F8FAFC" ${S}/>${eye(38, 58)}${eye(62, 58)}
    <path d="M46 68 H54 L50 73Z" fill="#F472B6"/><path d="M50 73 Q44 80 40 76 M50 73 Q56 80 60 76" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="28" cy="70" r="5" fill="#FBCFE8"/><circle cx="72" cy="70" r="5" fill="#FBCFE8"/>`,
  carrot: () => `<path d="M38 30 Q50 26 62 30 Q58 70 50 94 Q42 70 38 30Z" fill="#FB923C" ${S}/>
    <path d="M44 44 H52 M46 58 H54 M47 72 H52" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 30 Q36 6 30 14 Q40 18 46 30 M50 30 Q52 2 60 6 Q54 16 52 30 M52 30 Q70 10 74 18 Q62 22 54 30" fill="#22C55E" ${S3}/>`,
  candy: () => `<path d="M18 50 L4 36 L4 64Z M82 50 L96 36 L96 64Z" fill="#F472B6" ${S3}/>
    <circle cx="50" cy="50" r="30" fill="#F472B6" ${S}/><path d="M30 38 Q50 30 70 38 M28 52 Q50 44 72 52 M32 66 Q50 58 68 66" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`,
};

const SHAPE = {
  sq: (c) => `<rect x="12" y="12" width="76" height="76" rx="2" fill="${c}" ${S}/>`,
  ci: (c) => `<circle cx="50" cy="50" r="42" fill="${c}" ${S}/>`,
  tri: (c) => `<path d="M50 8 L94 88 H6Z" fill="${c}" ${S}/>`,
};
export const SHAPE_NAME = { sq: 'hình vuông', ci: 'hình tròn', tri: 'hình tam giác' };

/**
 * SVG một đồ vật. kind: tên trong ART, 'sq' | 'ci' | 'tri' (hình phẳng, color, rot, size 0.6–1),
 * 'dot' (chấm tròn, color), 'num' (thẻ số n).
 */
export function itemSvg(kind, { color = '#60A5FA', rot = 0, size = 1, n = 0 } = {}) {
  let body;
  if (SHAPE[kind]) body = `<g transform="rotate(${rot} 50 50) translate(50 50) scale(${size}) translate(-50 -50)">${SHAPE[kind](color)}</g>`;
  else if (kind === 'dot') body = `<circle cx="50" cy="50" r="34" fill="${color}" ${S}/><circle cx="38" cy="38" r="8" fill="#fff" opacity=".55"/>`;
  else if (kind === 'num') body = `<rect x="8" y="6" width="84" height="88" rx="16" fill="#fff" stroke="#93C5FD" stroke-width="4"/>
    <text x="50" y="72" text-anchor="middle" font-size="${String(n).length > 1 ? 54 : 64}" font-weight="800" fill="#1E3A8A" font-family="'Baloo 2', sans-serif">${n}</text>`;
  else body = (ART[kind] || ART.apple)();
  return `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${body}</svg>`;
}

const cloud = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff"><ellipse cx="0" cy="0" rx="46" ry="20"/><ellipse cx="-26" cy="6" rx="28" ry="16"/><ellipse cx="28" cy="6" rx="30" ry="16"/><ellipse cx="4" cy="-12" rx="26" ry="18"/></g>`;
const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-10" y="-70" width="20" height="70" fill="#A16207" ${S3}/>
  <circle cx="0" cy="-96" r="46" fill="#4ADE80" ${S3}/><circle cx="-30" cy="-74" r="28" fill="#4ADE80" ${S3}/><circle cx="30" cy="-74" r="28" fill="#4ADE80" ${S3}/>
  <circle cx="-14" cy="-104" r="7" fill="#EF4444"/><circle cx="18" cy="-86" r="7" fill="#EF4444"/><circle cx="-26" cy="-70" r="6" fill="#EF4444"/></g>`;
const fence = (x0, x1, y) => {
  let s = `<path d="M${x0} ${y - 30} H${x1} M${x0} ${y - 12} H${x1}" stroke="#B45309" stroke-width="7"/>`;
  for (let x = x0; x <= x1; x += 44) s += `<path d="M${x - 9} ${y} V${y - 42} L${x} ${y - 52} L${x + 9} ${y - 42} V${y}Z" fill="#FDE68A" ${S3}/>`;
  return s;
};
const tuft = (x, y) => `<path d="M${x - 10} ${y} Q${x - 8} ${y - 16} ${x - 2} ${y - 18} M${x} ${y} Q${x + 2} ${y - 22} ${x + 8} ${y - 20} M${x + 8} ${y} Q${x + 12} ${y - 12} ${x + 18} ${y - 12}" stroke="#15803D" stroke-width="3" fill="none" stroke-linecap="round"/>`;

/** Cảnh sau công cụ: trời, mây, mặt trời, đồi, hàng rào, cây, cỏ (neo đáy, cắt hai bên khi khung hẹp). */
export const MEADOW = `<svg class="x1g-backdrop" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <circle cx="1060" cy="110" r="54" fill="#FDE047" ${S3}/>
  ${cloud(220, 120)}${cloud(620, 80, 0.8)}${cloud(900, 200, 0.7)}
  <path d="M0 560 Q200 470 420 540 Q640 600 860 520 Q1040 460 1200 530 V800 H0Z" fill="#86EFAC" ${S3}/>
  ${tree(120, 600, 1.2)}${tree(1090, 590, 1.05)}
  ${fence(260, 940, 640)}
  <path d="M0 640 Q300 610 600 640 Q900 670 1200 630 V800 H0Z" fill="#4ADE80" ${S3}/>
  ${[60, 210, 380, 520, 700, 860, 1000, 1140].map((x, i) => tuft(x, 700 + (i % 3) * 30)).join('')}
</svg>`;
