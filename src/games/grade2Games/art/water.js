/**
 * Hình vẽ Quầy nước (lớp 2, lít): thùng nước có vòi, ca 1 lít (ca đong của quầy nước chanh lớp 3, một vạch "1 l"),
 * can, xô, bình, chai, cốc, ấm và thùng có vạch lít. Nét và màu theo bộ vẽ lại của vở (INK #3F3A40, viền 3, màu phẳng).
 *
 * Mọi đồ đựng vẽ quanh gốc (0, 0) = giữa đáy; hàm trả về
 *   { back, front, clip, clipId, w, h, top, levelY(v), spout: {x, y}, mouth: {x, y}, cap }
 * back vẽ trước nước, front vẽ sau nước; nước (waterSvg) cắt theo clip. levelY(v) = y mặt nước khi có v lít.
 */

import { jugGeom, jugParts, dispenserGeom, spigotSvg } from '../../grade3Games/art/lemonade.js';

export const INK = '#3F3A40';
export const WATER = '#9AD7F2', WATER_D = '#3B9AD0';
const GLASS = '#F4FAFD';
const SW = 3;
const f1 = (n) => (Math.round(n * 10) / 10).toString();
let seq = 0;
const uid = (p) => `${p}${++seq}${Math.random().toString(36).slice(2, 5)}`;

/** Chữ "l" (lít) nghiêng như sách — trong SVG dùng tspan (không được dùng thẻ <i>). */
export const L_SVG = '<tspan font-family="Georgia, Times New Roman, serif" font-style="italic" font-weight="400">l</tspan>';
const txt = (x, y, s, fs, extra = '') => `<text x="${f1(x)}" y="${f1(y)}" font-size="${f1(fs)}" font-weight="800" fill="${INK}" text-anchor="middle" font-family="Quicksand, 'Baloo 2', sans-serif" ${extra}>${s}</text>`;

/** Nhãn dán ghi số lít trên thân đồ đựng (vd. "5 l"). */
function tag(x, y, cap, fs) {
  const w = fs * (String(cap).length * 0.62 + 1.5), h = fs * 1.35;
  return `<rect x="${f1(x - w / 2)}" y="${f1(y - h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h * 0.28)}" fill="#fff" stroke="${INK}" stroke-width="2"/>`
    + txt(x, y + fs * 0.36, `${cap} ${L_SVG}`, fs);
}

/**
 * Lớp nước của một đồ đựng ở mức v lít (cắt theo thân). a: góc đồ đựng đang nghiêng (độ) — mặt nước xoay ngược lại
 * nên luôn nằm ngang như nước thật.
 */
export function waterSvg(vs, v, a = 0) {
  if (v <= 0.001) return '';
  const y = vs.levelY(Math.min(v, vs.cap * 1.02));
  const x0 = -vs.w * 2, wd = vs.w * 4;
  return `<g clip-path="url(#${vs.clipId})"><g transform="rotate(${f1(-a)} 0 ${f1(y)})"><rect x="${f1(x0)}" y="${f1(y)}" width="${f1(wd)}" height="${f1(vs.h * 2.5)}" fill="${WATER}"/>`
    + `<line x1="${f1(x0)}" y1="${f1(y)}" x2="${f1(x0 + wd)}" y2="${f1(y)}" stroke="${WATER_D}" stroke-width="${SW}"/></g></g>`;
}

/**
 * Diện tích (px²) của 1 lít nước trên hình. Mọi đồ đựng trong cùng cảnh vẽ theo cùng tỉ lệ này:
 * nước lúc đầy chiếm đúng (số lít × L_AREA), nên can 3 l to gấp 3 ca 1 l (bài quan sát đong đo).
 */
export const L_AREA = 3600;
/** Chiều cao h để diện tích nước lúc đầy areaAt(h) bằng target (diện tích ~ h², lặp cho phần hằng số). */
function fitH(areaAt, target, h = 100) { for (let i = 0; i < 5; i++) h *= Math.sqrt(target / areaAt(h)); return h; }

/**
 * Vạch đầy: nét đứt đỏ ngang thân (cắt theo thân) ở mức chứa đúng cap lít. Đồ đựng không có vạch lít thì bé nhìn vạch
 * này mới biết lúc nào đầy (miệng xô, cổ chai còn một khoảng trống phía trên mức đầy).
 */
export const FULL_MARK = '#E5484D';
const fullMark = (clipId, y, w) => `<g clip-path="url(#${clipId})" class="g2w-full"><line x1="${f1(-w)}" y1="${f1(y)}" x2="${f1(w)}" y2="${f1(y)}" stroke="${FULL_MARK}" stroke-width="${f1(SW * 0.9)}" stroke-dasharray="7 5" stroke-linecap="round"/></g>`;

/** Thân thẳng đứng: mặt nước tuyến tính từ đáy trong (by) tới mức đầy (fullY). */
const linear = (innerBot, fullY, cap) => (v) => innerBot - (v / cap) * (innerBot - fullY);

// ─────────────────────────────────────────────── ca 1 lít
/** Ca đong 1 lít: một vạch "1 l" (mức đầy ca), mỏ rót bên phải. Nước tới vạch = 1 lít theo `unit`. */
export function caVessel({ unit = L_AREA } = {}) {
  // thân thuôn: rộng w ở miệng, 0.86w ở đáy, vạch 1 l cao 0.86h − 4.5 (jugGeom) → rộng trung bình ~0.92w
  const h = fitH(h => 0.92 * 0.84 * h * (0.86 * h - SW * 1.5), unit), w = h * 0.84;
  const g = jugGeom(0, 0, w, h, 1, 1);
  const clipId = uid('g2wca');
  const parts = jugParts(g, { labels: 'top', clipId, labelOf: () => `1 ${L_SVG}` });
  const x0 = -w / 2;
  return {
    back: parts.clip + parts.back, front: parts.front + parts.labels, clip: '', clipId,
    w, h, top: g.top, cap: 1, levelY: (v) => g.mlY(v),
    spout: { x: -(x0 - w * 0.1), y: g.top - h * 0.05 }, mouth: { x: 0, y: g.top },
  };
}

// ─────────────────────────────────────────────── can nhựa
/** Can nhựa (có quai, vòi rót nhỏ trên nắp). label: ghi số lít lên thân. */
export function canVessel(cap, { color = '#F4A259', label = true, unit = L_AREA } = {}) {
  const h = fitH(h => 0.62 * h * (0.8 * h - SW * 1.5), cap * unit), w = h * 0.62;
  const top = -h, r = w * 0.14;
  const body = `M${f1(-w / 2 + r)},${f1(top + h * 0.12)} H${f1(w / 2 - r)} Q${f1(w / 2)},${f1(top + h * 0.12)} ${f1(w / 2)},${f1(top + h * 0.12 + r)} V${f1(-r)} Q${f1(w / 2)},0 ${f1(w / 2 - r)},0 H${f1(-w / 2 + r)} Q${f1(-w / 2)},0 ${f1(-w / 2)},${f1(-r)} V${f1(top + h * 0.12 + r)} Q${f1(-w / 2)},${f1(top + h * 0.12)} ${f1(-w / 2 + r)},${f1(top + h * 0.12)} Z`;
  const clipId = uid('g2wcan');
  const innerBot = -SW * 1.5, fullY = top + h * 0.2;
  // quai trên nắp (bên trái) + vòi rót (bên phải)
  const handle = `M${f1(-w * 0.36)},${f1(top + h * 0.12)} V${f1(top + h * 0.02)} H${f1(w * 0.06)} V${f1(top + h * 0.12)}`;
  const spoutD = `M${f1(w * 0.2)},${f1(top + h * 0.12)} L${f1(w * 0.28)},${f1(top - h * 0.02)} H${f1(w * 0.44)} L${f1(w * 0.44)},${f1(top + h * 0.12)} Z`;
  const back = `<clipPath id="${clipId}"><path d="${body}"/></clipPath>`
    + `<path d="${handle}" fill="none" stroke="${INK}" stroke-width="${f1(SW * 3.2)}" stroke-linejoin="round"/>`
    + `<path d="${handle}" fill="none" stroke="${color}" stroke-width="${f1(SW * 1.3)}" stroke-linejoin="round"/>`
    + `<path d="${spoutD}" fill="${color}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
    + `<path d="${body}" fill="${color}" fill-opacity="0.28"/>`;
  const front = `<path d="${body}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
    + `<path d="M${f1(-w * 0.32)},${f1(top + h * 0.3)} V${f1(-h * 0.14)}" stroke="#fff" stroke-width="${f1(SW * 1.6)}" stroke-linecap="round" opacity=".75"/>`
    + `<path d="M${f1(-w / 2)},${f1(top + h * 0.12 + r)} H${f1(w / 2)}" stroke="${color}" stroke-width="${f1(SW * 2)}"/>`
    + (label ? tag(w * 0.08, -h * 0.42, cap, Math.min(22, w * 0.26)) : '')
    + fullMark(clipId, fullY, w);
  return { back, front, clipId, w, h, top, cap, levelY: linear(innerBot, fullY, cap), spout: { x: w * 0.4, y: top - h * 0.02 }, mouth: { x: w * 0.36, y: top } };
}

// ─────────────────────────────────────────────── xô
export function bucketVessel(cap, { color = '#6FB7EA', label = false, unit = L_AREA } = {}) {
  const h = fitH(h => 0.888 * h * (0.9 * h - SW * 1.5), cap * unit), tw = h * 1.05, bw = tw * 0.72;
  const top = -h;
  const body = `M${f1(-tw / 2)},${f1(top)} L${f1(-bw / 2)},0 H${f1(bw / 2)} L${f1(tw / 2)},${f1(top)} Z`;
  const clipId = uid('g2wxo');
  const innerBot = -SW * 1.5, fullY = top + h * 0.1;
  const arc = `M${f1(-tw / 2 + 4)},${f1(top + 6)} Q0,${f1(top - h * 0.75)} ${f1(tw / 2 - 4)},${f1(top + 6)}`;
  // Xô miệng rộng hơn đáy: mặt nước lên nhanh lúc đầu hơn thực tế một chút — đủ để trẻ thấy đầy / chưa đầy.
  const back = `<clipPath id="${clipId}"><path d="${body}"/></clipPath>`
    + `<path d="${arc}" fill="none" stroke="${INK}" stroke-width="${f1(SW * 1.4)}" stroke-linecap="round"/>`
    + `<path d="${body}" fill="${color}" fill-opacity="0.25"/>`;
  const front = `<path d="${body}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
    + `<path d="M${f1(-tw / 2 - 2)},${f1(top)} H${f1(tw / 2 + 2)}" stroke="${INK}" stroke-width="${f1(SW * 2.2)}" stroke-linecap="round"/>`
    + `<path d="M${f1(-tw / 2 - 2)},${f1(top)} H${f1(tw / 2 + 2)}" stroke="${color}" stroke-width="${f1(SW * 0.9)}" stroke-linecap="round"/>`
    + `<path d="M${f1(-bw / 2 + 4)},${f1(-h * 0.5)} H${f1(bw / 2 - 4)}" stroke="${color}" stroke-width="${f1(SW * 1.6)}" opacity=".7"/>`
    + (label ? tag(0, -h * 0.28, cap, Math.min(22, bw * 0.24)) : '')
    + fullMark(clipId, fullY, tw);
  return { back, front, clipId, w: tw, h, top, cap, levelY: linear(innerBot, fullY, cap), spout: { x: tw / 2, y: top }, mouth: { x: 0, y: top } };
}

// ─────────────────────────────────────────────── bình (cổ hẹp), chai, cốc, ấm
function bottleLike({ h, w, neck, neckH, cap, fullFrac = 0.8, color = GLASS, capColor = '#7BCB8B', label = false, lid = true }) {
  const top = -h, sh = top + neckH;       // vai bình
  const r = w * 0.18;
  const body = `M${f1(-neck / 2)},${f1(top)} V${f1(sh)} Q${f1(-w / 2)},${f1(sh + h * 0.06)} ${f1(-w / 2)},${f1(sh + h * 0.2)} V${f1(-r)} Q${f1(-w / 2)},0 ${f1(-w / 2 + r)},0 H${f1(w / 2 - r)} Q${f1(w / 2)},0 ${f1(w / 2)},${f1(-r)} V${f1(sh + h * 0.2)} Q${f1(w / 2)},${f1(sh + h * 0.06)} ${f1(neck / 2)},${f1(sh)} V${f1(top)} Z`;
  const clipId = uid('g2wb');
  const innerBot = -SW * 1.5, fullY = innerBot - (innerBot - (sh + h * 0.2)) * fullFrac - (1 - fullFrac) * 0;
  const back = `<clipPath id="${clipId}"><path d="${body}"/></clipPath><path d="${body}" fill="${color}"/>`;
  const front = `<path d="${body}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
    + `<path d="M${f1(-w * 0.3)},${f1(sh + h * 0.24)} V${f1(-h * 0.12)}" stroke="#fff" stroke-width="${f1(SW * 1.6)}" stroke-linecap="round" opacity=".8"/>`
    + (lid ? `<rect x="${f1(-neck / 2 - 3)}" y="${f1(top - 10)}" width="${f1(neck + 6)}" height="12" rx="3" fill="${capColor}" stroke="${INK}" stroke-width="${f1(SW * 0.8)}"/>` : '')
    + (label ? tag(0, -h * 0.3, cap, Math.min(20, w * 0.26)) : '')
    + fullMark(clipId, fullY, w);
  return { back, front, clipId, w, h, top, cap, levelY: linear(innerBot, fullY, cap), spout: { x: neck / 2, y: top }, mouth: { x: 0, y: top } };
}

/** Bình nước to (cổ hẹp, nắp xanh). */
export const jarVessel = (cap, { unit = L_AREA, ...o } = {}) => { const h = fitH(h => 0.56 * h * 0.8 * (0.62 * h - SW * 1.5), cap * unit); return bottleLike({ h, w: h * 0.56, neck: h * 0.22, neckH: h * 0.18, cap, ...o }); };
/** Chai nước (thon cao). */
export const bottleVessel = (cap, { unit = L_AREA, ...o } = {}) => { const h = fitH(h => 0.34 * h * 0.8 * (0.54 * h - SW * 1.5), cap * unit); return bottleLike({ h, w: h * 0.34, neck: h * 0.14, neckH: h * 0.26, cap, capColor: '#6FB7EA', ...o }); };
/** Cốc thủy tinh (chứa ít hơn 1 l). */
export function cupVessel(cap = 0.4, { unit = L_AREA } = {}) {
  const h = fitH(h => (44 / 64) * h * (h - 8 - SW * 1.5), cap * unit), tw = h * 50 / 64, bw = h * 38 / 64, top = -h;
  const body = `M${f1(-tw / 2)},${f1(top)} L${f1(-bw / 2)},0 H${f1(bw / 2)} L${f1(tw / 2)},${f1(top)} Z`;
  const clipId = uid('g2wc');
  const innerBot = -SW * 1.5, fullY = top + 8;
  return {
    back: `<clipPath id="${clipId}"><path d="${body}"/></clipPath><path d="${body}" fill="${GLASS}"/>`,
    front: `<path d="${body}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/><path d="M${f1(-tw * 0.28)},${f1(top + 10)} L${f1(-bw * 0.28)},-10" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/>` + fullMark(clipId, fullY, tw),
    clipId, w: tw, h, top, cap, levelY: linear(innerBot, fullY, cap), spout: { x: tw / 2, y: top }, mouth: { x: 0, y: top },
  };
}
/** Ấm nước (vòi bên phải, quai trên). */
export function kettleVessel(cap = 2, { unit = L_AREA } = {}) {
  const h = fitH(h => 0.99 * h * (0.7 * h - SW * 1.5), cap * unit), w = h * 1.1, top = -h;
  const body = `M${f1(-w * 0.36)},${f1(top + h * 0.2)} Q${f1(-w / 2)},${f1(-h * 0.3)} ${f1(-w * 0.44)},0 H${f1(w * 0.44)} Q${f1(w / 2)},${f1(-h * 0.3)} ${f1(w * 0.36)},${f1(top + h * 0.2)} Z`;
  const clipId = uid('g2wk');
  const innerBot = -SW * 1.5, fullY = top + h * 0.3;
  const spoutD = `M${f1(w * 0.42)},${f1(-h * 0.3)} Q${f1(w * 0.62)},${f1(-h * 0.36)} ${f1(w * 0.7)},${f1(top + h * 0.12)} L${f1(w * 0.62)},${f1(top + h * 0.1)} Q${f1(w * 0.56)},${f1(-h * 0.5)} ${f1(w * 0.44)},${f1(-h * 0.5)} Z`;
  const handle = `M${f1(-w * 0.26)},${f1(top + h * 0.2)} Q0,${f1(top - h * 0.3)} ${f1(w * 0.26)},${f1(top + h * 0.2)}`;
  return {
    back: `<clipPath id="${clipId}"><path d="${body}"/></clipPath>`
      + `<path d="${handle}" fill="none" stroke="${INK}" stroke-width="${f1(SW * 3.2)}" stroke-linecap="round"/><path d="${handle}" fill="none" stroke="#B9A7F0" stroke-width="${f1(SW * 1.3)}" stroke-linecap="round"/>`
      + `<path d="${spoutD}" fill="#B9A7F0" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
      + `<path d="${body}" fill="#B9A7F0" fill-opacity="0.3"/>`,
    front: `<path d="${body}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
      + `<ellipse cx="0" cy="${f1(top + h * 0.2)}" rx="${f1(w * 0.24)}" ry="6" fill="#B9A7F0" stroke="${INK}" stroke-width="2"/><circle cx="0" cy="${f1(top + h * 0.12)}" r="6" fill="#F07167" stroke="${INK}" stroke-width="2"/>` + fullMark(clipId, fullY, w),
    clipId, w, h, top, cap, levelY: linear(innerBot, fullY, cap), spout: { x: w * 0.68, y: top + h * 0.1 }, mouth: { x: 0, y: top + h * 0.2 },
  };
}

// ─────────────────────────────────────────────── thùng có vạch lít (cấp cộng, trừ)
/**
 * Thùng thủy tinh có vạch chia 1 lít, ghi số mỗi `every` lít; có vòi ở đáy bên phải (rót ra can).
 * cap = số lít ở vạch trên cùng.
 */
export function tankVessel(cap, { every = cap > 10 ? 2 : 1, w = 150, h = 250 } = {}) {
  const top = -h, r = 14;
  const body = `M${f1(-w / 2)},${f1(top)} V${f1(-r)} Q${f1(-w / 2)},0 ${f1(-w / 2 + r)},0 H${f1(w / 2 - r)} Q${f1(w / 2)},0 ${f1(w / 2)},${f1(-r)} V${f1(top)} Z`;
  const clipId = uid('g2wt');
  const innerBot = -SW * 1.5, fullY = top + h * 0.1;
  const levelY = linear(innerBot, fullY, cap);
  let ticks = '', nums = '';
  for (let i = 1; i <= cap; i++) {
    const y = levelY(i), big = i % every === 0 || i === cap;
    ticks += `<line data-mark="${i}" x1="${f1(-w / 2)}" y1="${f1(y)}" x2="${f1(-w / 2 + (big ? w * 0.2 : w * 0.11))}" y2="${f1(y)}" stroke="${INK}" stroke-width="${big ? 2.4 : 1.6}" stroke-linecap="round"/>`;
    if (big) nums += `<text data-num="${i}" x="${f1(-w / 2 + w * 0.24)}" y="${f1(y + 6)}" font-size="17" font-weight="800" fill="${INK}" font-family="Quicksand, 'Baloo 2', sans-serif" stroke="#fff" stroke-width="3.5" paint-order="stroke">${i} ${L_SVG}</text>`;
  }
  return {
    back: `<clipPath id="${clipId}"><path d="${body}"/></clipPath><path d="${body}" fill="${GLASS}"/>`,
    front: `<path d="${body}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>${ticks}${nums}`
      + `<path d="M${f1(w * 0.3)},${f1(top + h * 0.14)} V${f1(-h * 0.1)}" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>`
      + `<line x1="${f1(-w / 2 - 4)}" y1="${f1(top)}" x2="${f1(w / 2 + 4)}" y2="${f1(top)}" stroke="${INK}" stroke-width="${f1(SW * 1.6)}" stroke-linecap="round"/>`,
    clipId, w, h, top, cap, levelY, spout: { x: w / 2, y: top }, mouth: { x: 0, y: top },
    tap: { x: w / 2, y: -h * 0.1 },
    unit: w * (innerBot - fullY) / cap, // diện tích 1 lít của thùng: can cùng cảnh vẽ theo tỉ lệ này
  };
}

// ─────────────────────────────────────────────── thùng nước có vòi (nguồn nước)
/** Thùng nước xanh trên bệ, vòi gạt ở đáy bên phải (dùng lại vòi của quầy nước chanh). */
export function barrelGeom(x, y, w, h) { return dispenserGeom(x, y, w, h); }
export function barrelSvg(g, pressed = false, floor = 460) {
  const { x, y, w, h } = g;
  const r = w * 0.16;
  const d = `M${f1(x + r)},${f1(y)} H${f1(x + w - r)} Q${f1(x + w)},${f1(y)} ${f1(x + w)},${f1(y + r)} V${f1(y + h - r)} Q${f1(x + w)},${f1(y + h)} ${f1(x + w - r)},${f1(y + h)} H${f1(x + r)} Q${f1(x)},${f1(y + h)} ${f1(x)},${f1(y + h - r)} V${f1(y + r)} Q${f1(x)},${f1(y)} ${f1(x + r)},${f1(y)} Z`;
  const hoops = [0.28, 0.72].map(t => `<path d="M${f1(x)},${f1(y + h * t)} H${f1(x + w)}" stroke="#2563EB" stroke-width="7"/>`).join('');
  return `<rect x="${f1(x - 8)}" y="${f1(y + h)}" width="${f1(w + 16)}" height="${f1(floor - y - h)}" fill="#B07A4F" stroke="${INK}" stroke-width="${SW}"/>`
    + `<path d="${d}" fill="#60A5FA" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>${hoops}`
    + `<path d="M${f1(x + w * 0.18)},${f1(y + h * 0.1)} V${f1(y + h * 0.86)}" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".45"/>`
    + `<rect x="${f1(x + w * 0.2)}" y="${f1(y + h * 0.4)}" width="${f1(w * 0.6)}" height="${f1(h * 0.2)}" rx="8" fill="#fff" stroke="${INK}" stroke-width="2"/>`
    + txt(x + w / 2, y + h * 0.52, 'Nước sạch', Math.min(15, w * 0.11))
    + `<ellipse cx="${f1(x + w / 2)}" cy="${f1(y)}" rx="${f1(w / 2 - 2)}" ry="8" fill="#3B82F6" stroke="${INK}" stroke-width="2.5"/>`
    + `<g data-tap class="g2w-tap">${spigotSvg(g, pressed)}</g>`;
}

/** Dòng nước chảy thẳng từ (x, y1) xuống y2. */
export function streamSvg(x, y1, y2, wd = 8) {
  if (y2 <= y1) return '';
  return `<rect x="${f1(x - wd / 2)}" y="${f1(y1)}" width="${f1(wd)}" height="${f1(y2 - y1)}" rx="${f1(wd / 2)}" fill="${WATER}" stroke="${WATER_D}" stroke-width="1.6"/>`
    + `<line x1="${f1(x - wd * 0.12)}" y1="${f1(y1 + 3)}" x2="${f1(x - wd * 0.12)}" y2="${f1(y2 - 3)}" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>`;
}

/** Vũng nước tràn ra sàn. */
export function puddleSvg(cx, y, wd) {
  return `<ellipse cx="${f1(cx)}" cy="${f1(y)}" rx="${f1(wd / 2)}" ry="${f1(wd * 0.1)}" fill="${WATER}" stroke="${WATER_D}" stroke-width="2" opacity=".9"/>`;
}

/** Đồ đựng hoàn chỉnh (không nước) đặt tại (x, y), dùng cho icon. */
export function vesselIcon(vs, v = 0, size = 44) {
  const pad = 8;
  const vbx = -vs.w / 2 - pad - 6, vby = vs.top - 16, vbw = vs.w + 2 * pad + 22, vbh = -vs.top + 20;
  return `<svg viewBox="${f1(vbx)} ${f1(vby)} ${f1(vbw)} ${f1(vbh)}" width="${size}" height="${size}" aria-hidden="true">${vs.back}${waterSvg(vs, v)}${vs.front}</svg>`;
}

export const VESSELS = {
  can: { name: 'can', make: (cap, o) => canVessel(cap, o) },
  xo: { name: 'xô', make: (cap, o) => bucketVessel(cap, o) },
  binh: { name: 'bình', make: (cap, o) => jarVessel(cap, o) },
  chai: { name: 'chai', make: (cap, o) => bottleVessel(cap, o) },
  coc: { name: 'cốc', make: (cap) => cupVessel(cap) },
  am: { name: 'ấm', make: (cap) => kettleVessel(cap) },
};
