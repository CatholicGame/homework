/**
 * Đồ vẽ SVG cho quầy nước chanh — cùng nét với bộ vẽ vở bài tập (INK #3F3A40, viền 3, màu phẳng):
 *   jugSvg()        ca đong có vạch ml — chép từ ml_cup() trong scripts/redraw/kit_w1.py (Bài 32),
 *                   lật ngang để mỏ rót ở bên phải, vạch + số ở bên phải thân.
 *   dispenserSvg()  bình thủy tinh có vòi gạt ở đáy (ảnh mẫu scripts/g3games/lemonade-ref/dispenser-*.png):
 *                   chanh lát + đá nổi trên mặt nước, cần gạt nhấn xuống thì nước chảy.
 *   glassSvg()      ly nước chanh (ảnh mẫu glass.png): đá viên, lát chanh cài miệng ly, ống hút.
 * Nước chanh ở đây là chanh ta (quả xanh) — nước vàng nhạt, lát chanh viền xanh.
 */

export const INK = '#3F3A40';
const GLASS = '#F4FAFD';
const DRINK = '#FFF0A6', DRINK_D = '#E9C547';
const RIND = '#7BCB8B', FLESH = '#E4F5B5';
const ICE = '#EAF7FD', ICE_D = '#9ED3EC';
const STEEL = '#D5DDE5', STEEL_D = '#9AA8B6';
const SW = 3;

const f1 = (n) => (Math.round(n * 10) / 10).toString();

/** Lát chanh tròn (nhìn chính diện): viền xanh, ruột nhạt, múi chia nan hoa. */
export function limeSlice(x, y, r, rot = 0) {
  let spokes = '';
  for (let k = 0; k < 8; k++) {
    const a = (k * Math.PI) / 4;
    spokes += `M${f1(x)},${f1(y)} L${f1(x + Math.cos(a) * r * 0.7)},${f1(y + Math.sin(a) * r * 0.7)} `;
  }
  return `<g transform="rotate(${rot} ${f1(x)} ${f1(y)})">`
    + `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${RIND}" stroke="${INK}" stroke-width="${f1(SW * 0.7)}"/>`
    + `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r * 0.78)}" fill="${FLESH}"/>`
    + `<path d="${spokes}" stroke="#fff" stroke-width="${f1(Math.max(1.2, r * 0.1))}" stroke-linecap="round"/>`
    + `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r * 0.12)}" fill="#fff"/></g>`;
}

/** Viên đá (khối vuông bo góc, hơi nghiêng). */
export function iceCube(x, y, s, rot = 0) {
  return `<g transform="rotate(${rot} ${f1(x)} ${f1(y)})">`
    + `<rect x="${f1(x - s / 2)}" y="${f1(y - s / 2)}" width="${f1(s)}" height="${f1(s)}" rx="${f1(s * 0.2)}" fill="${ICE}" fill-opacity=".85" stroke="${ICE_D}" stroke-width="${f1(SW * 0.6)}"/>`
    + `<path d="M${f1(x - s * 0.28)},${f1(y - s * 0.12)} V${f1(y - s * 0.3)} H${f1(x - s * 0.1)}" fill="none" stroke="#fff" stroke-width="${f1(SW * 0.6)}" stroke-linecap="round"/></g>`;
}

// ─────────────────────────────────────────────── ca đong (ml_cup, lật ngang)
/**
 * Hình học ca đong: (cx, by) = tâm ngang và đáy; cap = số ml ở vạch trên cùng (đặt ở 86% chiều cao
 * như ml_cup); step = ml mỗi vạch. mlY(v) → toạ độ y của mặt nước khi ca có v ml.
 */
export function jugGeom(cx, by, w, h, cap, step) {
  const top = by - h;
  const innerBot = by - SW * 1.5;
  const marks = cap / step;
  const unit = (h * 0.86 - SW * 1.5) / marks;
  const mlY = (v) => innerBot - (v / step) * unit;
  const maxMl = ((innerBot - top - 2) / unit) * step; // đầy tới miệng
  return { cx, by, w, h, top, cap, step, marks, unit, mlY, maxMl };
}

/** Đường viền thân ca (chưa lật), dùng cho cả hình và vùng cắt nước. */
function jugBodyPath(g) {
  const { cx, by, w, top } = g;
  const x0 = cx - w / 2, x1 = cx + w / 2;
  const ins = w * 0.07, r = Math.min(14, w * 0.12);
  return `M${f1(x0)},${f1(top)} L${f1(x0 + ins)},${f1(by - r)} Q${f1(x0 + ins)},${f1(by)} ${f1(x0 + ins + r)},${f1(by)} `
    + `L${f1(x1 - ins - r)},${f1(by)} Q${f1(x1 - ins)},${f1(by)} ${f1(x1 - ins)},${f1(by - r)} L${f1(x1)},${f1(top)} Z`;
}

/**
 * Ca đong có vạch. labels: 'top' = chỉ ghi số ở vạch trên cùng (như Bài 32 Q1: "500 ml" + các vạch
 * không số — bé đếm vạch), 'long' = ghi số ở mọi vạch dài. longEvery: vạch dài mỗi n vạch (vạch ngắn
 * ở giữa là nửa khoảng). Trả về { back, front, labels } — nước (data-jug-water) vẽ giữa back và front
 * bởi người gọi, vùng cắt nước id = clipId.
 */
export function jugParts(g, { labels = 'top', longEvery = 1, clipId, labelOf }) {
  const { cx, by, w, h, top, marks, unit } = g;
  const x0 = cx - w / 2, x1 = cx + w / 2;
  const ins = w * 0.07;
  const innerBot = by - SW * 1.5;
  const d = jugBodyPath(g);
  const flip = `transform="translate(${f1(2 * cx)} 0) scale(-1 1)"`;
  // quai (bên phải của ml_cup → sau khi lật nằm bên trái)
  const hp = `M${f1(x1 - ins * 0.3)},${f1(top + h * 0.16)} C${f1(x1 + w * 0.3)},${f1(top + h * 0.12)} ${f1(x1 + w * 0.3)},${f1(by - h * 0.3)} ${f1(x1 - ins * 0.8)},${f1(by - h * 0.26)}`;
  const back = `<g ${flip}>`
    + `<path d="${hp}" fill="none" stroke="${INK}" stroke-width="${f1(SW * 3.4)}" stroke-linecap="round"/>`
    + `<path d="${hp}" fill="none" stroke="#7CC6E8" stroke-width="${f1(SW * 1.4)}" stroke-linecap="round"/>`
    + `<path d="${d}" fill="${GLASS}"/></g>`;
  const clip = `<clipPath id="${clipId}"><path d="${d}" ${flip}/></clipPath>`;
  // vạch chia: gần mỏ rót (bên trái ml_cup → bên phải sau khi lật)
  const tx0 = x0 + ins + w * 0.1;
  let ticks = '';
  let text = '';
  for (let i = 1; i <= marks; i++) {
    const y = innerBot - i * unit;
    const lng = i % longEvery === 0 || i === marks;
    const L = w * (lng ? 0.2 : 0.11);
    ticks += `<line data-tick="${i}" x1="${f1(tx0)}" y1="${f1(y)}" x2="${f1(tx0 + L)}" y2="${f1(y)}" stroke="${INK}" stroke-width="${f1(SW * (lng ? 0.8 : 0.6))}" stroke-linecap="round"/>`;
    if (labels === 'long' ? lng : i === marks) {
      const fs = labels === 'top' ? w * 0.15 : Math.min(w * 0.1, unit * longEvery * 0.72);
      // Số đặt cạnh vạch, phía trong thân (sau khi lật: bên trái vạch, căn phải).
      text += `<text data-label="${i}"${labels === 'long' ? ' class="g3l-lbl"' : ''} x="${f1(2 * cx - (tx0 + w * 0.23))}" y="${f1(y + fs * 0.36)}" font-size="${f1(fs)}" font-weight="700" fill="${INK}" text-anchor="end" font-family="Quicksand, 'Baloo 2', sans-serif">${labelOf(i * g.step)}</text>`;
    }
  }
  ticks += `<line x1="${f1(tx0)}" y1="${f1(innerBot - marks * unit)}" x2="${f1(tx0)}" y2="${f1(innerBot - unit * 0.3)}" stroke="${INK}" stroke-width="${f1(SW * 0.6)}"/>`;
  const front = `<g ${flip}>${ticks}`
    + `<path d="M${f1(x1 - w * 0.28)},${f1(by - h * 0.72)} V${f1(by - h * 0.22)}" stroke="#fff" stroke-width="${f1(SW * 1.6)}" stroke-linecap="round" opacity=".8"/>`
    + `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
    + `<path d="M${f1(x0 - w * 0.1)},${f1(top - h * 0.05)} Q${f1(x0 + w * 0.05)},${f1(top - SW)} ${f1(x0 + w * 0.2)},${f1(top)} L${f1(x0 + ins * 0.6)},${f1(top + h * 0.12)} Z" fill="${GLASS}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
    + `<line x1="${f1(x0 + w * 0.12)}" y1="${f1(top)}" x2="${f1(x1 + SW * 0.3)}" y2="${f1(top)}" stroke="${INK}" stroke-width="${f1(SW * 1.6)}" stroke-linecap="round"/>`
    + `</g>`;
  return { back, front, labels: text, clip };
}

/** Đầu mỏ rót của ca (sau khi lật) — chỗ nước chảy ra khi nghiêng ca đổ bớt. */
export function jugSpout(g) {
  const x0 = g.cx - g.w / 2;
  return { x: 2 * g.cx - (x0 - g.w * 0.1), y: g.top - g.h * 0.05 };
}

/** Lớp nước trong ca: mặt nước ở mức v ml, cắt theo thân ca. */
export function jugWater(g, v, clipId) {
  if (v <= 0) return '';
  const y = g.mlY(Math.min(v, g.maxMl));
  // Rộng hơn thân ca nhiều để khi ca nghiêng (đổ bớt) nước vẫn phủ kín phần thân đã nghiêng.
  const x0 = g.cx - g.w, wd = g.w * 2.4;
  return `<g clip-path="url(#${clipId})"><rect x="${f1(x0)}" y="${f1(y)}" width="${f1(wd)}" height="${f1(g.by - y + g.h * 0.4)}" fill="${DRINK}"/>`
    + `<line x1="${f1(x0)}" y1="${f1(y)}" x2="${f1(x0 + wd)}" y2="${f1(y)}" stroke="${DRINK_D}" stroke-width="${SW}"/></g>`;
}

// ─────────────────────────────────────────────── bình có vòi
/**
 * Hình học bình: (x, y) = góc trái trên thân, w × h; vòi ở đáy bên phải.
 * nozzle = đầu vòi (nơi nước chảy ra), lever = trục cần gạt.
 */
export function dispenserGeom(x, y, w, h) {
  const sy = y + h - h * 0.16;           // tâm ống vòi
  const bx = x + w;                       // chỗ vòi gắn vào thân
  return {
    x, y, w, h, sy, bx,
    nozzle: { x: bx + w * 0.2, y: sy + h * 0.16 },
    pivot: { x: bx + w * 0.17, y: sy - h * 0.05 },
    liquidTop: y + h * 0.1, liquidBot: y + h - SW,
  };
}

/** Thân bình (thủy tinh) + nắp. Nước + chanh + đá vẽ riêng (dispenserLiquid) để đổi mức nước. */
export function dispenserBody(g, clipId) {
  const { x, y, w, h } = g;
  const r = w * 0.12;
  const d = `M${f1(x + w * 0.1)},${f1(y)} H${f1(x + w * 0.9)} Q${f1(x + w)},${f1(y)} ${f1(x + w)},${f1(y + r)} V${f1(y + h - r)} Q${f1(x + w)},${f1(y + h)} ${f1(x + w - r)},${f1(y + h)} `
    + `H${f1(x + r)} Q${f1(x)},${f1(y + h)} ${f1(x)},${f1(y + h - r)} V${f1(y + r)} Q${f1(x)},${f1(y)} ${f1(x + w * 0.1)},${f1(y)} Z`;
  const lidH = h * 0.1;
  return {
    clip: `<clipPath id="${clipId}"><path d="${d}"/></clipPath>`,
    back: `<path d="${d}" fill="#EAF6FC"/>`,
    front: `<path d="M${f1(x + w * 0.1)},${f1(y + h * 0.18)} V${f1(y + h * 0.7)}" stroke="#fff" stroke-width="${f1(SW * 2.2)}" stroke-linecap="round" opacity=".85"/>`
      + `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
      + `<rect x="${f1(x - 3)}" y="${f1(y - lidH + 2)}" width="${f1(w + 6)}" height="${f1(lidH)}" rx="${f1(lidH * 0.35)}" fill="#7F8C99" stroke="${INK}" stroke-width="${SW}"/>`
      + `<path d="M${f1(x + 6)},${f1(y - lidH * 0.45)} H${f1(x + w - 6)}" stroke="#A9B6C2" stroke-width="${f1(SW)}" stroke-linecap="round"/>`,
  };
}

/** Nước chanh trong bình ở mức frac (0..1): lát chanh + đá nổi sát mặt nước. */
export function dispenserLiquid(g, frac, clipId) {
  if (frac <= 0) return '';
  const { x, w } = g;
  const sy = g.liquidBot - frac * (g.liquidBot - g.liquidTop);
  const floaters = [
    ['ice', 0.2, 12, -12], ['lime', 0.4, 10, 18], ['ice', 0.62, 16, 20], ['lime', 0.82, 8, -24],
    ['lime', 0.25, 34, 40], ['ice', 0.48, 36, -8], ['lime', 0.72, 40, 8], ['ice', 0.12, 56, 28], ['lime', 0.55, 62, -30], ['ice', 0.86, 58, 14],
  ].map(([k, fx, dy, rot]) => {
    const cy = Math.min(g.liquidBot - 10, sy + dy);
    return k === 'ice' ? iceCube(x + w * fx, cy, w * 0.14, rot) : limeSlice(x + w * fx, cy, w * 0.09, rot);
  }).join('');
  return `<g clip-path="url(#${clipId})"><rect x="${f1(x - 4)}" y="${f1(sy)}" width="${f1(w + 8)}" height="${f1(g.liquidBot - sy + 8)}" fill="${DRINK}"/>`
    + `<line x1="${f1(x - 4)}" y1="${f1(sy)}" x2="${f1(x + w + 4)}" y2="${f1(sy)}" stroke="${DRINK_D}" stroke-width="${SW}"/>${floaters}</g>`;
}

/** Vòi inox + cần gạt. pressed: cần gạt nhấn xuống (đang rót). */
export function spigotSvg(g, pressed) {
  const { bx, sy, h, w } = g;
  const s = h * 0.1;                      // cỡ ống
  const px = g.pivot.x, py = g.pivot.y;
  const ang = pressed ? 38 : 0;
  return `<rect x="${f1(bx - 6)}" y="${f1(sy - s * 0.75)}" width="${f1(12)}" height="${f1(s * 1.5)}" rx="4" fill="#4B5563" stroke="${INK}" stroke-width="${f1(SW * 0.8)}"/>`
    + `<path d="M${f1(bx + 4)},${f1(sy - s / 2)} H${f1(g.nozzle.x + s * 0.2)} Q${f1(g.nozzle.x + s * 0.55)},${f1(sy - s / 2)} ${f1(g.nozzle.x + s * 0.55)},${f1(sy)} V${f1(g.nozzle.y - 2)} H${f1(g.nozzle.x - s * 0.55)} V${f1(sy + s / 2)} H${f1(bx + 4)} Z" fill="${STEEL}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
    + `<path d="M${f1(bx + 8)},${f1(sy - s * 0.18)} H${f1(g.nozzle.x - s * 0.1)}" stroke="#fff" stroke-width="${f1(SW)}" stroke-linecap="round" opacity=".9"/>`
    + `<rect x="${f1(g.nozzle.x - s * 0.62)}" y="${f1(g.nozzle.y - 4)}" width="${f1(s * 1.24)}" height="6" rx="3" fill="${STEEL_D}" stroke="${INK}" stroke-width="${f1(SW * 0.7)}"/>`
    // cần gạt: dựng lên, nhấn thì gập xuống về phía trước
    + `<g class="g3l-lever" transform="rotate(${ang} ${f1(px)} ${f1(py)})">`
    + `<path d="M${f1(px)},${f1(py)} L${f1(px - w * 0.02)},${f1(py - h * 0.2)}" stroke="${INK}" stroke-width="${f1(s * 0.62 + SW * 2)}" stroke-linecap="round"/>`
    + `<path d="M${f1(px)},${f1(py)} L${f1(px - w * 0.02)},${f1(py - h * 0.2)}" stroke="${STEEL}" stroke-width="${f1(s * 0.62)}" stroke-linecap="round"/>`
    + `<circle cx="${f1(px - w * 0.02)}" cy="${f1(py - h * 0.2)}" r="${f1(s * 0.5)}" fill="#F07167" stroke="${INK}" stroke-width="${f1(SW * 0.8)}"/></g>`
    + `<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(s * 0.26)}" fill="${STEEL_D}" stroke="${INK}" stroke-width="${f1(SW * 0.7)}"/>`;
}

/** Dòng nước chanh chảy thẳng từ (x, y1) xuống y2. */
export function streamSvg(x, y1, y2, wd = 8) {
  if (y2 <= y1) return '';
  return `<rect x="${f1(x - wd / 2)}" y="${f1(y1)}" width="${f1(wd)}" height="${f1(y2 - y1)}" rx="${f1(wd / 2)}" fill="${DRINK}" stroke="${DRINK_D}" stroke-width="1.6"/>`
    + `<line x1="${f1(x - wd * 0.12)}" y1="${f1(y1 + 3)}" x2="${f1(x - wd * 0.12)}" y2="${f1(y2 - 3)}" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>`;
}

// ─────────────────────────────────────────────── ly nước chanh
let glassN = 0;
/**
 * Ly thủy tinh miệng loe (cx, by = tâm, đáy; w × h). fill 0..1 = mức nước; done = đã pha xong
 * (thêm đá, lát chanh cài miệng ly, ống hút).
 */
export function glassSvg(cx, by, w, h, { fill = 0, done = false } = {}) {
  const id = `g3lg${++glassN}`;
  const tw = w / 2, bw = w * 0.4, top = by - h, r = Math.min(8, h * 0.1);
  const d = `M${f1(cx - tw)},${f1(top)} L${f1(cx - bw)},${f1(by - r)} Q${f1(cx - bw)},${f1(by)} ${f1(cx - bw + r)},${f1(by)} `
    + `L${f1(cx + bw - r)},${f1(by)} Q${f1(cx + bw)},${f1(by)} ${f1(cx + bw)},${f1(by - r)} L${f1(cx + tw)},${f1(top)} Z`;
  const wy = by - fill * h * 0.86;
  let out = `<clipPath id="${id}"><path d="${d}"/></clipPath>`;
  // ống hút sau lưng thân ly (thấy qua thành ly)
  if (done) {
    out += `<path d="M${f1(cx - w * 0.05)},${f1(by - h * 0.15)} L${f1(cx + w * 0.3)},${f1(top - h * 0.34)}" stroke="${INK}" stroke-width="${f1(w * 0.1 + SW * 2)}" stroke-linecap="round"/>`
      + `<path d="M${f1(cx - w * 0.05)},${f1(by - h * 0.15)} L${f1(cx + w * 0.3)},${f1(top - h * 0.34)}" stroke="#6FB7EA" stroke-width="${f1(w * 0.1)}" stroke-linecap="round"/>`;
  }
  out += `<path d="${d}" fill="${GLASS}"/>`;
  if (fill > 0) {
    out += `<g clip-path="url(#${id})"><rect x="${f1(cx - tw - 4)}" y="${f1(wy)}" width="${f1(w + 8)}" height="${f1(by - wy + 4)}" fill="${DRINK}"/>`;
    if (done) {
      out += iceCube(cx - w * 0.18, wy + h * 0.14, w * 0.26, -14) + iceCube(cx + w * 0.14, wy + h * 0.2, w * 0.26, 12)
        + iceCube(cx - w * 0.06, wy + h * 0.42, w * 0.24, 24) + iceCube(cx + w * 0.16, wy + h * 0.56, w * 0.22, -8);
    }
    out += `<line x1="${f1(cx - tw - 4)}" y1="${f1(wy)}" x2="${f1(cx + tw + 4)}" y2="${f1(wy)}" stroke="${DRINK_D}" stroke-width="${SW}"/></g>`;
  }
  out += `<path d="M${f1(cx - tw * 0.62)},${f1(top + h * 0.14)} L${f1(cx - bw * 0.7)},${f1(by - h * 0.18)}" stroke="#fff" stroke-width="${f1(SW * 1.5)}" stroke-linecap="round" opacity=".85"/>`
    + `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
    + `<line x1="${f1(cx - tw - 1)}" y1="${f1(top + 1)}" x2="${f1(cx + tw + 1)}" y2="${f1(top + 1)}" stroke="${INK}" stroke-width="${f1(SW * 1.4)}" stroke-linecap="round"/>`;
  // lát chanh cài miệng ly (nửa trên nhô khỏi miệng, có khía cài)
  if (done) out += limeSlice(cx - tw * 0.72, top + 2, w * 0.24, -20);
  return out;
}

/** Ly nước chanh pha xong dạng icon (bảng hiệu, thẻ quầy, hoá đơn). */
export function glassIcon(size = 40) {
  return `<svg viewBox="0 0 70 96" width="${size}" height="${size}" aria-hidden="true">${glassSvg(34, 92, 50, 66, { fill: 1, done: true })}</svg>`;
}

/** Ly pha xong vừa khít khung (w × h theo tỉ lệ GLASS_BOX) — để bay tới tay khách. */
// Khung quanh ly w=50 h=66 đặt tâm đáy ở (0, 0): gồm cả ống hút và lát chanh nhô lên.
export const GLASS_BOX = { x: -40, y: -96, w: 80, h: 100 };
export function glassFlySvg() {
  const b = GLASS_BOX;
  return `<svg viewBox="${b.x} ${b.y} ${b.w} ${b.h}" preserveAspectRatio="none" aria-hidden="true">${glassSvg(0, 0, 50, 66, { fill: 1, done: true })}</svg>`;
}
