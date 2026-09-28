/**
 * Đồ vẽ SVG cho quầy may ruy băng — cùng nét với tiệm bánh (INK #3F3A40, viền 3, màu phẳng).
 * Ảnh mẫu: scripts/g3games/ribbon-ref/ref1.png.
 *   rulerSvg() / rulerX()   thước nhựa có vạch mm, vạch 5 mm, vạch cm ghi số; marks = vạch đích tô màu
 *   ribbonRollSvg()         cuộn ruy băng nhìn nghiêng (mặt cuộn có lõi giấy); tail = đuôi thả xuống
 *   ribbonStripSvg()        dải ruy băng kéo ra nằm trên thước (đầu cắt thẳng / vát / đuôi cá)
 *   ribbonPieceSvg()        đoạn ruy băng đã cắt (bay sang khách)
 *   scissorsSvg()           kéo: open = góc mở mỗi lưỡi (0 = khép khi cắt)
 *   magnifierSvg()          kính lúp phóng to một chỗ của cảnh (xem rõ vạch mm)
 *   giftBoxSvg()            hộp quà, có / chưa buộc nơ ruy băng
 *   rollRackSvg()           giá treo các cuộn ruy băng phía sau quầy
 *   sewingTableSvg()        mặt bàn gỗ trải tấm lót cắt
 */

export const INK = '#3F3A40';
const SW = 3;
const STEEL = '#D5DDE5', STEEL_D = '#9AA8B6';
const CORE = '#D9B27C', CORE_D = '#A87E48', HOLE = '#6B4A2E';
const PLASTIC = '#EAF3FA', PLASTIC_D = '#B9CCDC', TICK = '#4A5260';
const WOOD = '#E6BF8E', WOOD_D = '#C4945E', WOOD_DD = '#9E7142';
const MAT = '#CFEBD6', MAT_D = '#A9D6B5';
const LENS = '#2F6FB0';
const OK = '#2E9E4F', WARN = '#F08A24';
const FONT = 'Quicksand, Nunito, sans-serif';

/** Màu ruy băng: fill = mặt chính, dark = bóng / mặt cuộn, light = vệt sáng. */
export const RIBBONS = {
  red: { name: 'đỏ', fill: '#E8453C', dark: '#B8322B', light: '#F37A70' },
  pink: { name: 'hồng', fill: '#F57FA8', dark: '#D45A86', light: '#F9A8C5' },
  yellow: { name: 'vàng', fill: '#FFD23F', dark: '#D9A91C', light: '#FFE78F' },
  blue: { name: 'xanh dương', fill: '#3D9BE9', dark: '#2474BF', light: '#86C2F3' },
  purple: { name: 'tím', fill: '#9B6BDF', dark: '#7348B8', light: '#C0A0EF' },
  green: { name: 'xanh lá', fill: '#3FAE5A', dark: '#2A8543', light: '#7DD092' },
};
export const RIBBON_COLORS = Object.keys(RIBBONS);
const col = (c) => RIBBONS[c] || RIBBONS.red;

const f1 = (n) => (Math.round(n * 10) / 10).toString();
let uid = 0;
const nextId = (p) => `${p}${++uid}`;

// ─────────────────────────────────────────────── thước
/** Hoành độ vạch `mm` trên thước vẽ bởi rulerSvg(x, …, { ppm, pad }). */
export function rulerX(x, mm, { ppm = 6, pad = 5 } = {}) {
  return x + (pad + mm) * ppm;
}

/**
 * Thước nhựa trong (x, y) = góc trên trái; vạch mọc từ mép trên, số cm nằm dưới vạch.
 *   cm: dài bao nhiêu cm; ppm: số px cho 1 mm; pad: lề hai đầu (mm); h: bề cao (mặc định 13 mm).
 *   marks: [{ mm, color, label }] — vạch đích kẻ đậm hết bề cao, label ghi dưới thước (trên thước là chỗ dải ruy băng).
 * Chỉ vạch cm có số (như Bài 30) để bé tự đếm mm.
 */
export function rulerSvg(x, y, { cm = 15, ppm = 6, pad = 5, h = null, marks = [] } = {}) {
  const H = h ?? ppm * 13;
  const w = (cm * 10 + pad * 2) * ppm;
  let out = `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(H)}" rx="${f1(ppm * 1.2)}" fill="${PLASTIC}" fill-opacity=".94" stroke="${INK}" stroke-width="${SW}"/>`
    + `<rect x="${f1(x + ppm * 0.8)}" y="${f1(y + H * 0.84)}" width="${f1(w - ppm * 1.6)}" height="${f1(H * 0.08)}" rx="${f1(H * 0.04)}" fill="${PLASTIC_D}" opacity=".6"/>`;
  let ticks = '', thick = '';
  for (let i = 0; i <= cm * 10; i++) {
    const tx = f1(rulerX(x, i, { ppm, pad }));
    const L = i % 10 === 0 ? H * 0.42 : i % 5 === 0 ? H * 0.3 : H * 0.18;
    (i % 5 === 0 ? (thick += `M${tx},${f1(y + SW / 2)} v${f1(L)} `) : (ticks += `M${tx},${f1(y + SW / 2)} v${f1(L)} `));
  }
  out += `<path d="${ticks}" stroke="${TICK}" stroke-width="${f1(Math.max(1, ppm * 0.17))}"/>`
    + `<path d="${thick}" stroke="${TICK}" stroke-width="${f1(Math.max(1.4, ppm * 0.28))}"/>`;
  for (let c = 0; c <= cm; c++) {
    out += `<text x="${f1(rulerX(x, c * 10, { ppm, pad }))}" y="${f1(y + H * 0.74)}" font-family="${FONT}" font-size="${f1(H * 0.27)}" font-weight="700" fill="${INK}" text-anchor="middle">${c}</text>`;
  }
  for (const m of marks) {
    const mx = f1(rulerX(x, m.mm, { ppm, pad }));
    const c = m.color || WARN;
    out += `<line x1="${mx}" y1="${f1(y - H * 0.18)}" x2="${mx}" y2="${f1(y + H + (m.label ? H * 0.14 : 0))}" stroke="${c}" stroke-width="${f1(Math.max(2.5, ppm * 0.5))}" stroke-linecap="round"/>`;
    if (m.label) {
      const tw = m.label.length * H * 0.19 + H * 0.3;
      out += `<rect x="${f1(+mx - tw / 2)}" y="${f1(y + H + H * 0.14)}" width="${f1(tw)}" height="${f1(H * 0.4)}" rx="${f1(H * 0.12)}" fill="${c}"/>`
        + `<text x="${mx}" y="${f1(y + H + H * 0.44)}" font-family="${FONT}" font-size="${f1(H * 0.28)}" font-weight="700" fill="#fff" text-anchor="middle">${m.label}</text>`;
    }
  }
  return out;
}

// ─────────────────────────────────────────────── cuộn ruy băng
/**
 * Cuộn ruy băng nhìn nghiêng: (cx, cy) = tâm mặt cuộn (bên phải), r = bán kính, thân cuộn lùi sang trái `depth`.
 *   tail: số px đuôi ruy băng thả xuống dưới cuộn (đầu cắt đuôi cá), 0 = không có.
 */
export function ribbonRollSvg(cx, cy, r, color = 'red', { depth = r * 0.85, tail = 0 } = {}) {
  const C = col(color);
  const fr = r * 0.6, bx = cx - depth;
  let out = '';
  if (tail > 0) {
    const y1 = cy + r + tail, n = depth * 0.45;
    out += `<path d="M${f1(bx + fr * 0.2)},${f1(cy)} H${f1(cx)} V${f1(y1)} L${f1((bx + fr * 0.2 + cx) / 2)},${f1(y1 - n)} L${f1(bx + fr * 0.2)},${f1(y1)} Z" fill="${C.fill}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
      + `<path d="M${f1(cx - depth * 0.28)},${f1(cy + r + SW)} V${f1(y1 - n * 1.3)}" stroke="${C.light}" stroke-width="${f1(depth * 0.12)}" stroke-linecap="round" opacity=".8"/>`;
  }
  const body = `M${f1(bx)},${f1(cy - r)} H${f1(cx)} V${f1(cy + r)} H${f1(bx)} A${f1(fr)},${f1(r)} 0 0 1 ${f1(bx)},${f1(cy - r)} Z`;
  const id = nextId('g3rb');
  out += `<clipPath id="${id}"><path d="${body}"/></clipPath>`
    + `<path d="${body}" fill="${C.fill}"/>`
    + `<g clip-path="url(#${id})"><rect x="${f1(bx - fr)}" y="${f1(cy - r * 0.62)}" width="${f1(depth + fr)}" height="${f1(r * 0.2)}" fill="${C.light}" opacity=".75"/>`
    + `<rect x="${f1(bx - fr)}" y="${f1(cy + r * 0.55)}" width="${f1(depth + fr)}" height="${f1(r * 0.45)}" fill="${C.dark}" opacity=".35"/></g>`
    + `<path d="${body}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
    // mặt cuộn: các vòng quấn + lõi giấy
    + `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(fr)}" ry="${f1(r)}" fill="${C.dark}" stroke="${INK}" stroke-width="${SW}"/>`
    + `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(fr * 0.84)}" ry="${f1(r * 0.84)}" fill="none" stroke="${C.fill}" stroke-width="${f1(Math.max(1, r * 0.05))}" opacity=".8"/>`
    + `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(fr * 0.66)}" ry="${f1(r * 0.66)}" fill="none" stroke="${C.fill}" stroke-width="${f1(Math.max(1, r * 0.04))}" opacity=".6"/>`
    + `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(fr * 0.46)}" ry="${f1(r * 0.46)}" fill="${CORE}" stroke="${CORE_D}" stroke-width="${f1(Math.max(1.2, r * 0.06))}"/>`
    + `<ellipse cx="${f1(cx + fr * 0.03)}" cy="${f1(cy)}" rx="${f1(fr * 0.27)}" ry="${f1(r * 0.28)}" fill="${HOLE}"/>`;
  return out;
}

// ─────────────────────────────────────────────── dải ruy băng, đoạn đã cắt
/** Đầu mút bên phải của dải: 'straight' | 'slant' (vát chéo) | 'notch' (đuôi cá). */
function endPath(x1, y, h, end) {
  if (end === 'slant') return `L${f1(x1 + h * 0.35)},${f1(y)} L${f1(x1 - h * 0.35)},${f1(y + h)}`;
  if (end === 'notch') return `L${f1(x1)},${f1(y)} L${f1(x1 - h * 0.45)},${f1(y + h / 2)} L${f1(x1)},${f1(y + h)}`;
  return `L${f1(x1)},${f1(y)} L${f1(x1)},${f1(y + h)}`;
}

/**
 * Dải ruy băng nằm ngang từ x0 tới x1 (mép trên y, bề rộng h) — phần kéo ra từ cuộn nằm trên thước.
 *   end: kiểu đầu phải (xem endPath). Đo độ dài theo x1 (đầu cắt thẳng khớp đúng vạch).
 */
export function ribbonStripSvg(x0, x1, y, h, color = 'red', { end = 'straight' } = {}) {
  const C = col(color);
  return `<path d="M${f1(x0)},${f1(y)} ${endPath(x1, y, h, end)} L${f1(x0)},${f1(y + h)} Z" fill="${C.fill}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
    + `<path d="M${f1(x0 + 2)},${f1(y + h * 0.28)} H${f1(x1 - h * 0.6)}" stroke="${C.light}" stroke-width="${f1(h * 0.16)}" stroke-linecap="round" opacity=".85"/>`
    + `<path d="M${f1(x0 + 2)},${f1(y + h - SW)} H${f1(x1 - h * 0.4)}" stroke="${C.dark}" stroke-width="${f1(h * 0.12)}" opacity=".45"/>`;
}

/**
 * Đoạn ruy băng đã cắt, tâm (cx, cy), dài len, rộng h, xoay rot độ; hai đầu vát chéo song song
 * (như vừa cắt bằng kéo). Có thể uốn nhẹ (wave px) cho trông mềm như vải.
 */
export function ribbonPieceSvg(cx, cy, len, h, color = 'red', { rot = 0, wave = 0 } = {}) {
  const C = col(color);
  const x0 = -len / 2, x1 = len / 2, y0 = -h / 2, s = h * 0.3;
  const top = `M${f1(x0 + s)},${f1(y0)} Q0,${f1(y0 - wave)} ${f1(x1 + s)},${f1(y0)}`;
  const d = `${top} L${f1(x1 - s)},${f1(y0 + h)} Q0,${f1(y0 + h - wave)} ${f1(x0 - s)},${f1(y0 + h)} Z`;
  return `<g transform="translate(${f1(cx)} ${f1(cy)}) rotate(${rot})">`
    + `<path d="${d}" fill="${C.fill}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
    + `<path d="M${f1(x0 + h * 0.5)},${f1(y0 + h * 0.3)} Q0,${f1(y0 + h * 0.3 - wave)} ${f1(x1 - h * 0.3)},${f1(y0 + h * 0.3)}" fill="none" stroke="${C.light}" stroke-width="${f1(h * 0.16)}" stroke-linecap="round" opacity=".85"/></g>`;
}

// ─────────────────────────────────────────────── kéo
/** Nửa kéo nằm ngang: lưỡi về +x (phía trên nếu s = -1), vòng cầm về -x ở phía ngược lại. */
function scissorHalf(L, s, handle) {
  const blade = `M${f1(-L * 0.06)},${f1(L * 0.012 * -s)} L${f1(L * 0.6)},0 Q${f1(L * 0.34)},${f1(L * 0.085 * s)} ${f1(-L * 0.03)},${f1(L * 0.075 * s)} Z`;
  const lx = -L * 0.36, ly = -s * L * 0.11;
  const ring = `M${f1(lx - L * 0.15)},${f1(ly)} A${f1(L * 0.15)},${f1(L * 0.11)} 0 1 0 ${f1(lx + L * 0.15)},${f1(ly)} A${f1(L * 0.15)},${f1(L * 0.11)} 0 1 0 ${f1(lx - L * 0.15)},${f1(ly)} Z `
    + `M${f1(lx - L * 0.09)},${f1(ly)} A${f1(L * 0.09)},${f1(L * 0.055)} 0 1 1 ${f1(lx + L * 0.09)},${f1(ly)} A${f1(L * 0.09)},${f1(L * 0.055)} 0 1 1 ${f1(lx - L * 0.09)},${f1(ly)} Z`;
  const shank = `M${f1(L * 0.02)},${f1(-s * L * 0.02)} Q${f1(-L * 0.12)},${f1(-s * L * 0.03)} ${f1(lx + L * 0.1)},${f1(ly + s * L * 0.07)}`;
  return `<path d="${blade}" fill="${STEEL}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
    + `<path d="M${f1(L * 0.05)},${f1(L * 0.035 * s)} L${f1(L * 0.44)},${f1(L * 0.02 * s)}" stroke="#fff" stroke-width="${f1(Math.max(1.5, L * 0.018))}" stroke-linecap="round" opacity=".9"/>`
    + `<path d="${shank}" fill="none" stroke="${INK}" stroke-width="${f1(L * 0.075 + SW * 2)}" stroke-linecap="round"/>`
    + `<path d="${shank}" fill="none" stroke="${handle}" stroke-width="${f1(L * 0.075)}" stroke-linecap="round"/>`
    + `<path d="${ring}" fill="${handle}" fill-rule="evenodd" stroke="${INK}" stroke-width="${SW}"/>`;
}

/**
 * Kéo: (x, y) = chốt kéo, len = chiều dài, rot = hướng mũi kéo (0 = chỉ sang phải, 90 = chỉ xuống).
 *   open: góc mở mỗi lưỡi (độ) — ~22 mở, 0 = khép khi cắt. Mũi kéo khép nằm ở (x + 0.6·len, y) trước khi xoay.
 */
export function scissorsSvg(x, y, len, rot = 0, { open = 22, handle = '#E8453C' } = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${rot})">`
    + `<g transform="rotate(${open})">${scissorHalf(len, 1, handle)}</g>`
    + `<g transform="rotate(${-open})">${scissorHalf(len, -1, handle)}</g>`
    + `<circle r="${f1(len * 0.035)}" fill="${STEEL_D}" stroke="${INK}" stroke-width="${f1(SW * 0.8)}"/>`
    + `<circle r="${f1(len * 0.012)}" fill="${INK}"/></g>`;
}

// ─────────────────────────────────────────────── kính lúp
/**
 * Kính lúp tâm (cx, cy), bán kính r: phóng to `content` (SVG cùng hệ toạ độ cảnh) quanh điểm (sx, sy).
 *   zoom: độ phóng; handle: góc cán kính (độ, 45 = chéo xuống phải), null = không vẽ cán.
 */
export function magnifierSvg(cx, cy, r, content, { sx, sy, zoom = 2.6, handle = 45 } = {}) {
  const id = nextId('g3rl');
  const hw = r * 0.2;
  let out = '';
  if (handle !== null) {
    const h0 = r * 1.08, h1 = r * 1.85;
    out += `<g transform="translate(${f1(cx)} ${f1(cy)}) rotate(${handle})">`
      + `<rect x="${f1(r * 0.95)}" y="${f1(-hw * 0.4)}" width="${f1(h0 - r * 0.9)}" height="${f1(hw * 0.8)}" fill="${STEEL_D}" stroke="${INK}" stroke-width="${SW}"/>`
      + `<rect x="${f1(h0)}" y="${f1(-hw / 2)}" width="${f1(h1 - h0)}" height="${f1(hw)}" rx="${f1(hw / 2)}" fill="${LENS}" stroke="${INK}" stroke-width="${SW}"/></g>`;
  }
  out += `<clipPath id="${id}"><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}"/></clipPath>`
    + `<g clip-path="url(#${id})"><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="#fff"/>`
    + `<g data-lens transform="translate(${f1(cx - zoom * sx)} ${f1(cy - zoom * sy)}) scale(${zoom})">${content}</g></g>`
    + `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="none" stroke="${LENS}" stroke-width="${f1(r * 0.1)}"/>`
    + `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r * 1.05)}" fill="none" stroke="${INK}" stroke-width="${SW}"/>`
    + `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r * 0.95)}" fill="none" stroke="${INK}" stroke-width="${f1(SW * 0.6)}"/>`
    + `<path d="M${f1(cx - r * 0.72)},${f1(cy - r * 0.3)} A${f1(r * 0.78)},${f1(r * 0.78)} 0 0 1 ${f1(cx - r * 0.3)},${f1(cy - r * 0.72)}" fill="none" stroke="#fff" stroke-width="${f1(r * 0.07)}" stroke-linecap="round" opacity=".85"/>`;
  return out;
}

// ─────────────────────────────────────────────── hộp quà
/**
 * Hộp quà nhìn thẳng: (cx, by) = tâm ngang, đáy; w = bề ngang thân hộp.
 *   ribbon: màu nơ (khoá RIBBONS) hoặc null = hộp chưa buộc; paper: màu giấy gói.
 */
export function giftBoxSvg(cx, by, w, { ribbon = null, paper = '#FFF4E3', dots = '#F6C9A8' } = {}) {
  const h = w * 0.72, lh = w * 0.2, lw = w * 1.1;
  const x0 = cx - w / 2, top = by - h;
  const st = `stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"`;
  let dot = '';
  for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) {
    dot += `<circle cx="${f1(x0 + w * (0.18 + i * 0.32))}" cy="${f1(top + h * (0.35 + j * 0.35))}" r="${f1(w * 0.04)}" fill="${dots}"/>`;
  }
  let out = `<rect x="${f1(x0)}" y="${f1(top)}" width="${f1(w)}" height="${f1(h)}" fill="${paper}" ${st}/>` + dot
    + `<rect x="${f1(cx - lw / 2)}" y="${f1(top - lh)}" width="${f1(lw)}" height="${f1(lh)}" rx="${f1(lh * 0.15)}" fill="${paper}" ${st}/>`;
  if (!ribbon) return out;
  const C = col(ribbon), bw = w * 0.14;
  out += `<rect x="${f1(cx - bw / 2)}" y="${f1(top - lh)}" width="${f1(bw)}" height="${f1(h + lh)}" fill="${C.fill}" ${st}/>`;
  const bx = cx, byy = top - lh, bs = w * 0.24;
  const loop = (sg) => `<path d="M${f1(bx)},${f1(byy)} Q${f1(bx + sg * bs * 1.3)},${f1(byy - bs * 1.2)} ${f1(bx + sg * bs * 1.1)},${f1(byy - bs * 0.05)} Q${f1(bx + sg * bs * 0.9)},${f1(byy + bs * 0.3)} ${f1(bx)},${f1(byy)} Z" fill="${C.fill}" ${st}/>`
    + `<path d="M${f1(bx + sg * bs * 0.25)},${f1(byy - bs * 0.25)} Q${f1(bx + sg * bs * 0.7)},${f1(byy - bs * 0.75)} ${f1(bx + sg * bs * 0.85)},${f1(byy - bs * 0.35)}" fill="none" stroke="${C.dark}" stroke-width="${f1(SW * 0.7)}" stroke-linecap="round"/>`;
  out += loop(-1) + loop(1)
    + `<ellipse cx="${f1(bx)}" cy="${f1(byy - bs * 0.05)}" rx="${f1(bs * 0.26)}" ry="${f1(bs * 0.22)}" fill="${C.dark}" ${st}/>`;
  return out;
}

// ─────────────────────────────────────────────── bàn, giá treo
/** Giá treo cuộn ruy băng: thanh gỗ ngang ở y, các cuộn treo từ x0 tới x1, đuôi thả xuống tail px. */
export function rollRackSvg(x0, x1, y, r, colors = RIBBON_COLORS, { tail = r * 1.4 } = {}) {
  const n = colors.length, step = (x1 - x0) / n;
  let out = `<rect x="${f1(x0 - r * 0.5)}" y="${f1(y - r * 0.14)}" width="${f1(x1 - x0 + r)}" height="${f1(r * 0.28)}" rx="${f1(r * 0.14)}" fill="${WOOD_D}" stroke="${INK}" stroke-width="${SW}"/>`
    + `<rect x="${f1(x0 - r * 0.7)}" y="${f1(y - r * 0.4)}" width="${f1(r * 0.4)}" height="${f1(r * 0.8)}" rx="${f1(r * 0.1)}" fill="${WOOD_DD}" stroke="${INK}" stroke-width="${SW}"/>`
    + `<rect x="${f1(x1 + r * 0.3)}" y="${f1(y - r * 0.4)}" width="${f1(r * 0.4)}" height="${f1(r * 0.8)}" rx="${f1(r * 0.1)}" fill="${WOOD_DD}" stroke="${INK}" stroke-width="${SW}"/>`;
  colors.forEach((c, i) => {
    const cx = x0 + step * (i + 0.5) + r * 0.35;
    out += ribbonRollSvg(cx, y + r * 0.35, r, c, { depth: r * 0.8, tail: tail * (0.8 + ((i * 37) % 5) * 0.1) });
  });
  return out;
}

/** Bàn may: (x, y) = góc trên trái mặt bàn, w × h; tấm lót cắt màu xanh nhạt có lưới ô. */
export function sewingTableSvg(x, y, w, h, { mat = true } = {}) {
  const edge = Math.min(h * 0.18, 26);
  let out = `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" fill="${WOOD}" stroke="${INK}" stroke-width="${SW}"/>`
    + `<rect x="${f1(x)}" y="${f1(y + h - edge)}" width="${f1(w)}" height="${f1(edge)}" fill="${WOOD_D}" stroke="${INK}" stroke-width="${SW}"/>`;
  for (let i = 1; i < 4; i++) {
    out += `<path d="M${f1(x + w * (i / 4) - 40)},${f1(y + h * 0.2)} q60,-8 120,0" fill="none" stroke="${WOOD_D}" stroke-width="2" opacity=".6"/>`;
  }
  if (!mat) return out;
  const mx = x + w * 0.04, my = y + h * 0.1, mw = w * 0.92, mh = h - edge - h * 0.18;
  let grid = '';
  for (let gx = mx + 20; gx < mx + mw; gx += 20) grid += `M${f1(gx)},${f1(my)} V${f1(my + mh)} `;
  for (let gy = my + 20; gy < my + mh; gy += 20) grid += `M${f1(mx)},${f1(gy)} H${f1(mx + mw)} `;
  out += `<rect x="${f1(mx)}" y="${f1(my)}" width="${f1(mw)}" height="${f1(mh)}" rx="8" fill="${MAT}" stroke="${INK}" stroke-width="${SW}"/>`
    + `<path d="${grid}" stroke="${MAT_D}" stroke-width="1.2"/>`;
  return out;
}

export const COLORS = { OK, WARN };
