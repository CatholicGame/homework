/**
 * Hình vẽ trò 🛤️ Kỹ sư đường sắt (lớp 4). Bản vẽ là giấy ô của 📐 square.js (1 ô = 50 đơn vị), nhìn từ trên xuống:
 * đường ray (ray đôi + tà vẹt), đường nhựa, đường đất cũ, thanh ray rời, đoàn tàu, xe đạp, biểu tượng các điểm.
 * Mọi hình vẽ theo trục x cục bộ (đặt vào bằng translate + rotate theo hướng đường).
 * Nét và màu theo bộ vẽ các trò lớp 2, 3 (INK).
 */

export const INK = '#3F3A40';
const r1 = (v) => Math.round(v * 10) / 10;

/** Khung đặt hình cục bộ: gốc ở p (đơn vị bản vẽ), trục x theo hướng d (độ). */
export const place = (p, d, inner, cls = '') => `<g class="${cls}" transform="translate(${r1(p.x)} ${r1(p.y)}) rotate(${r1(d)})">${inner}</g>`;

/** Đường ray dài len: tà vẹt nâu cách đều, hai thanh ray thép song song. */
export function trackLocal(len, { gauge = 22, tie = 46, step = 30 } = {}) {
  let ties = '';
  for (let x = step / 2; x < len; x += step) ties += `<rect x="${r1(x - 6)}" y="${-tie / 2}" width="12" height="${tie}" rx="2" fill="#B07A45" stroke="#7C4A1E" stroke-width="1.5"/>`;
  const rail = (y) => `<line x1="0" y1="${y}" x2="${r1(len)}" y2="${y}" stroke="#475569" stroke-width="6"/><line x1="0" y1="${y - 1}" x2="${r1(len)}" y2="${y - 1}" stroke="#CBD5E1" stroke-width="1.8"/>`;
  return `<rect x="0" y="${-tie / 2 - 5}" width="${r1(len)}" height="${tie + 10}" fill="#D6D3D1" opacity=".75"/>${ties}${rail(-gauge / 2)}${rail(gauge / 2)}`;
}

/** Đường nhựa: dải xám có vạch giữa trắng. */
export function roadLocal(len, { w = 44 } = {}) {
  return `<rect x="0" y="${-w / 2}" width="${r1(len)}" height="${w}" fill="#94A3B8"/>`
    + `<line x1="0" y1="${-w / 2}" x2="${r1(len)}" y2="${-w / 2}" stroke="#64748B" stroke-width="3"/><line x1="0" y1="${w / 2}" x2="${r1(len)}" y2="${w / 2}" stroke="#64748B" stroke-width="3"/>`
    + `<line x1="0" y1="0" x2="${r1(len)}" y2="0" stroke="#fff" stroke-width="4" stroke-dasharray="18 14"/>`;
}

/** Đường đất cũ: dải nâu nhạt, mép đứt nét. */
export function dirtLocal(len, { w = 36 } = {}) {
  return `<rect x="0" y="${-w / 2}" width="${r1(len)}" height="${w}" fill="#E7C9A0"/>`
    + `<line x1="0" y1="${-w / 2}" x2="${r1(len)}" y2="${-w / 2}" stroke="#B08355" stroke-width="3" stroke-dasharray="10 8"/><line x1="0" y1="${w / 2}" x2="${r1(len)}" y2="${w / 2}" stroke="#B08355" stroke-width="3" stroke-dasharray="10 8"/>`;
}

/** Thanh ray rời (cấp 3), dài len: thép xám, hai đầu có bu lông. */
export function barLocal(len) {
  return `<rect x="0" y="-9" width="${r1(len)}" height="18" rx="5" fill="#64748B" stroke="${INK}" stroke-width="3"/>`
    + `<rect x="4" y="-4" width="${r1(len - 8)}" height="4" rx="2" fill="#CBD5E1"/>`
    + `<circle cx="12" cy="3" r="3" fill="#1F2937"/><circle cx="${r1(len - 12)}" cy="3" r="3" fill="#1F2937"/>`;
}

/** Đoàn tàu nhìn từ trên xuống, chạy theo +x, gốc ở mũi tàu: đầu máy đỏ + 2 toa xanh. Dài TRAIN_LEN. */
export const TRAIN_LEN = 318;
export function trainLocal({ w = 40, color = '#F07167', car = '#6CCFB5' } = {}) {
  const h = w / 2;
  const carAt = (x0) => `<rect x="${x0}" y="${-h}" width="96" height="${w}" rx="7" fill="${car}" stroke="${INK}" stroke-width="2.5"/>`
    + `<rect x="${x0 + 6}" y="${-h + 6}" width="84" height="${w - 12}" rx="4" fill="#F8FAFC" stroke="#4FA88F" stroke-width="1.2"/>`
    + [0, 1, 2, 3].map(i => `<rect x="${x0 + 12 + i * 20}" y="${-h + 9}" width="12" height="${w - 18}" rx="2" fill="#BAE6FD"/>`).join('');
  return `<g class="g4r-train">`
    + carAt(-TRAIN_LEN) + carAt(-210)
    + `<rect x="-112" y="${-h + 2}" width="8" height="${w - 4}" fill="${INK}"/><rect x="-218" y="${-h + 2}" width="8" height="${w - 4}" fill="${INK}"/>`
    + `<path d="M-104 ${-h} H-22 Q0 ${-h} 0 0 Q0 ${h} -22 ${h} H-104 Z" fill="${color}" stroke="${INK}" stroke-width="2.5"/>`
    + `<path d="M-20 ${-h + 6} Q-8 0 -20 ${h - 6}" fill="none" stroke="#D6EEFB" stroke-width="6" stroke-linecap="round"/>`
    + `<rect x="-92" y="${-h + 7}" width="58" height="${w - 14}" rx="4" fill="#1F2937" opacity=".85"/>`
    + `<circle cx="-4" cy="${-h + 7}" r="3" fill="#FFE08A" stroke="${INK}" stroke-width="1"/><circle cx="-4" cy="${h - 7}" r="3" fill="#FFE08A" stroke="${INK}" stroke-width="1"/>`
    + `</g>`;
}

/** Bạn nhỏ đạp xe nhìn từ trên xuống, chạy theo +x, gốc ở giữa xe. */
export function bikeLocal() {
  return `<g class="g4r-bike">`
    + `<rect x="-24" y="-3" width="48" height="6" rx="3" fill="${INK}"/>`
    + `<rect x="14" y="-12" width="5" height="24" rx="2.5" fill="${INK}"/>`
    + `<ellipse cx="-4" cy="0" rx="11" ry="15" fill="#FACC15" stroke="${INK}" stroke-width="2.5"/>`
    + `<circle cx="2" cy="0" r="8.5" fill="#F8D2B4" stroke="${INK}" stroke-width="2"/><path d="M-6 -6 A8.5 8.5 0 0 1 -6 6 Z" fill="#3F3A40"/>`
    + `</g>`;
}

/** Biểu tượng cạnh một điểm (cỡ ~ 64): trường học, nhà ga, chợ, trạm y tế, nhà văn hoá. */
export const PLACES = {
  school: { name: 'cổng trường', icon: (x, y) => `<g transform="translate(${x} ${y})">
    <rect x="-28" y="-14" width="56" height="34" fill="#FDE68A" stroke="${INK}" stroke-width="3"/>
    <path d="M-34 -12 L0 -36 L34 -12 Z" fill="#EF4444" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="-8" y="2" width="16" height="18" fill="#B45309" stroke="${INK}" stroke-width="2"/>
    <rect x="-22" y="-6" width="10" height="9" fill="#BAE6FD" stroke="${INK}" stroke-width="1.5"/><rect x="12" y="-6" width="10" height="9" fill="#BAE6FD" stroke="${INK}" stroke-width="1.5"/>
    <path d="M0 -36 V-50 H14 V-42 H0" fill="#EF4444" stroke="${INK}" stroke-width="2"/></g>` },
  market: { name: 'chợ', icon: (x, y) => `<g transform="translate(${x} ${y})">
    <rect x="-28" y="-6" width="56" height="26" fill="#FEF3C7" stroke="${INK}" stroke-width="3"/>
    <path d="M-34 -6 L-26 -28 H26 L34 -6 Z" fill="#F97316" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M-17 -28 L-21 -6 M0 -28 V-6 M17 -28 L21 -6" stroke="#fff" stroke-width="4"/>
    <circle cx="-14" cy="8" r="6" fill="#EF4444" stroke="${INK}" stroke-width="1.5"/><circle cx="0" cy="8" r="6" fill="#FACC15" stroke="${INK}" stroke-width="1.5"/><circle cx="14" cy="8" r="6" fill="#22C55E" stroke="${INK}" stroke-width="1.5"/></g>` },
  clinic: { name: 'trạm y tế', icon: (x, y) => `<g transform="translate(${x} ${y})">
    <rect x="-28" y="-22" width="56" height="42" rx="3" fill="#fff" stroke="${INK}" stroke-width="3"/>
    <rect x="-6" y="-16" width="12" height="28" fill="#EF4444"/><rect x="-14" y="-8" width="28" height="12" fill="#EF4444"/></g>` },
  hall: { name: 'nhà văn hóa', icon: (x, y) => `<g transform="translate(${x} ${y})">
    <rect x="-28" y="-10" width="56" height="30" fill="#BFDBFE" stroke="${INK}" stroke-width="3"/>
    <path d="M-34 -8 L0 -32 L34 -8 Z" fill="#7C3AED" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M-18 -10 V20 M-6 -10 V20 M6 -10 V20 M18 -10 V20" stroke="#fff" stroke-width="4"/></g>` },
  station: { name: 'nhà ga', icon: (x, y) => `<g transform="translate(${x} ${y})">
    <rect x="-32" y="-12" width="64" height="32" fill="#E0E7FF" stroke="${INK}" stroke-width="3"/>
    <path d="M-38 -12 H38 L30 -28 H-30 Z" fill="#2563EB" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="-10" y="0" width="20" height="20" fill="#93C5FD" stroke="${INK}" stroke-width="2"/>
    <rect x="-16" y="-25" width="32" height="10" rx="2" fill="#fff"/><rect x="-11" y="-23" width="9" height="6" fill="#2563EB"/><rect x="2" y="-23" width="9" height="6" fill="#2563EB"/></g>` },
};

/** Ê ke nhỏ (thẻ cách chơi). */
export function ekeIcon(size = 46) {
  return `<svg viewBox="-6 -50 80 56" width="${size}" height="${size}" aria-hidden="true">
    <path d="M0 0 L70 0 L0 -44 Z" fill="#FDE047" stroke="#A16207" stroke-width="4" stroke-linejoin="round"/>
    <path d="M12 -9 L38 -9 L12 -26 Z" fill="#fff" fill-opacity=".75" stroke="#A16207" stroke-width="2.5"/>
    <path d="M0 -10 H10 V0" fill="none" stroke="#DC2626" stroke-width="3"/></svg>`;
}

/** Biểu tượng trò: đoạn ray chéo có đoàn tàu. */
export function railIcon(size = 56) {
  return `<svg viewBox="-170 -120 340 240" width="${size}" height="${size}" aria-hidden="true">
    ${place({ x: -170, y: 90 }, -32, trackLocal(400))}${place({ x: 120, y: -50 }, -32, trainLocal({ w: 40 }))}</svg>`;
}

// ── Cảnh nền (viewBox 1200 × 400, neo đáy): trời, núi, đồng lúa, lán kỹ sư, cọc tiêu ────────────────
const cloud = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity=".95"><ellipse cx="0" cy="0" rx="46" ry="20"/><ellipse cx="-26" cy="6" rx="28" ry="16"/><ellipse cx="28" cy="6" rx="30" ry="16"/><ellipse cx="4" cy="-12" rx="26" ry="18"/></g>`;
const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <rect x="-7" y="-50" width="14" height="50" rx="3" fill="#92400E" stroke="${INK}" stroke-width="3"/>
  <circle cx="-18" cy="-64" r="22" fill="#16A34A" stroke="${INK}" stroke-width="3"/><circle cx="18" cy="-64" r="22" fill="#16A34A" stroke="${INK}" stroke-width="3"/>
  <circle cx="0" cy="-84" r="26" fill="#22C55E" stroke="${INK}" stroke-width="3"/></g>`;
const cone = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <rect x="-16" y="-5" width="32" height="7" rx="2" fill="#F97316" stroke="${INK}" stroke-width="2.5"/>
  <path d="M-10 -5 L-3 -38 H3 L10 -5 Z" fill="#F97316" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M-7.5 -16 H7.5 M-5 -27 H5" stroke="#fff" stroke-width="4"/></g>`;
const pole = (x, y) => `<path d="M${x} ${y} V${y - 120}" stroke="#6B7280" stroke-width="6"/><path d="M${x - 22} ${y - 108} H${x + 22}" stroke="#6B7280" stroke-width="5"/>`;

export function backdropSvg() {
  const rice = Array.from({ length: 9 }, (_, i) => `<path d="M0 ${300 + i * 12} Q600 ${290 + i * 12} 1200 ${300 + i * 12}" stroke="#65A30D" stroke-width="3" fill="none" opacity=".45"/>`).join('');
  return `<svg class="g4r-back" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <circle cx="1090" cy="70" r="40" fill="#FDE047" stroke="${INK}" stroke-width="3"/>
    ${cloud(170, 70)}${cloud(620, 46, .8)}${cloud(900, 96, 1.1)}
    <path d="M0 250 L120 150 L230 230 L360 120 L500 240 L640 160 L780 250 L930 140 L1070 230 L1200 170 V300 H0 Z" fill="#A7C4A0" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M0 280 Q300 220 600 262 Q900 226 1200 270 V400 H0 Z" fill="#86C96E" stroke="${INK}" stroke-width="3"/>
    <path d="M0 300 Q600 286 1200 300 V400 H0 Z" fill="#B5DE7B"/>${rice}
    ${pole(60, 300)}${pole(330, 290)}${pole(880, 290)}${pole(1150, 300)}
    <path d="M60 192 Q195 214 330 182 M880 182 Q1015 214 1150 192" stroke="${INK}" stroke-width="2" fill="none"/>
    <g transform="translate(980 300)"><rect x="-70" y="-62" width="140" height="62" fill="#FEF3C7" stroke="${INK}" stroke-width="3"/>
      <path d="M-82 -60 L0 -100 L82 -60 Z" fill="#2563EB" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <rect x="-50" y="-44" width="30" height="24" fill="#BAE6FD" stroke="${INK}" stroke-width="2.5"/><rect x="14" y="-40" width="26" height="40" fill="#B45309" stroke="${INK}" stroke-width="2.5"/></g>
    ${tree(120, 304, 1)}${tree(250, 296, .8)}${tree(1120, 300, 1.05)}
    ${cone(420, 330)}${cone(470, 336, .9)}${cone(760, 334)}
  </svg>`;
}

/**
 * Dải tuyến đường phía dưới (viewBox 1000 × 60): 6 đoạn, mỗi bản vẽ thành công thêm một đoạn ray,
 * thất bại thì đoạn đó còn cọc tiêu "đang sửa", bản vẽ đang làm có khung nét đứt.
 * past = [true/false…] các bản vẽ đã xong, idx = bản vẽ đang làm.
 */
export function routeSvg(past, idx, total = 6) {
  const W = 1000, seg = (W - 60) / total;
  let s = `<rect x="0" y="0" width="${W}" height="60" rx="12" fill="#D9F99D" stroke="${INK}" stroke-width="2.5"/>`
    + `<rect x="8" y="22" width="${W - 16}" height="16" rx="4" fill="#D6D3D1"/>`;
  for (let i = 0; i < total; i++) {
    const x = 50 + i * seg;
    const st = i < past.length ? (past[i] ? 'ok' : 'fail') : i === idx ? 'now' : 'todo';
    s += `<g class="g4r-seg g4r-seg-${st}" data-seg="${i}" transform="translate(${r1(x)} 30)">`;
    if (st === 'ok') s += trackLocal(seg, { gauge: 12, tie: 26, step: 14 });
    else if (st === 'fail') s += `<g transform="translate(${r1(seg / 2)} 10) scale(.55)">${cone(-22, 0)}${cone(22, 0)}</g>`;
    else if (st === 'now') s += `<rect x="3" y="-16" width="${r1(seg - 6)}" height="32" rx="6" fill="#FFF7ED" stroke="#F97316" stroke-width="3" stroke-dasharray="8 6"/><g class="g4r-seg-build" opacity="0">${trackLocal(seg, { gauge: 12, tie: 26, step: 14 })}</g>`;
    s += `</g>`;
  }
  s += place({ x: 50, y: 30 }, 0, `<g transform="scale(.42)">${PLACES.station.icon(-56, 0)}</g>`);
  s += place({ x: W - 12, y: 30 }, 0, `<path d="M-6 -20 V20 M-6 -20 H12 L6 -12 H12 V-4 H-6" fill="#22C55E" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`);
  return `<svg class="g4r-route-svg" viewBox="0 0 ${W} 60" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${s}</svg>`;
}
