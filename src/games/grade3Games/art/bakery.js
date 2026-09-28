/**
 * Đồ vẽ SVG cho tiệm bánh — cùng nét với bộ vẽ vở bài tập (INK #3F3A40, viền 3, màu phẳng).
 * Ảnh mẫu: scripts/g3games/bakery-ref/sheet.png.
 *   roundCakeSvg()     bánh tròn nhìn từ trên xuống; cuts = các góc cắt → từng miếng tách riêng (data-piece)
 *   sheetCakeSvg()     bánh chữ nhật trong khay nhìn từ trên xuống; xs/ys = vị trí đường cắt → lưới miếng
 *   roundCakeSideSvg() bánh tròn nhìn nghiêng trên đế (trưng trên quầy)
 *   knifeSvg() / serverSvg()  dao răng cưa, xẻng xúc bánh
 *   cookieSvg() / plateSvg()  bánh quy (chip, mứt, bơ) và đĩa
 *   cakeBoxSvg()       hộp bánh giấy: đóng (ô kính + nơ) hoặc mở nắp để bỏ bánh vào
 *   cutLineSvg()       đường cắt nét đứt (gợi ý chỗ đặt dao)
 * Góc tính bằng độ, 0° = hướng 12 giờ, tăng theo chiều kim đồng hồ.
 */

export const INK = '#3F3A40';
const SW = 3;
const CREAM = '#FFF8EC', CREAM_D = '#DCC19A';
const SPONGE = '#F6CD8E', SPONGE_D = '#D9A55E';
const BAND = '#F59A8F';
const BERRY = '#E8453C', BERRY_D = '#B8322B', LEAF = '#5DAF5B', SEED = '#FFE08A';
const BLUEBERRY = '#4A5FB0';
const TRAY = '#A7B1BC', TRAY_L = '#D5DDE5';
const PLATE = '#FFFFFF', PLATE_D = '#DDE3EA';
const STEEL = '#D5DDE5', STEEL_D = '#9AA8B6';
const HANDLE = '#F48FB1', HANDLE_D = '#D96B93';
const BOX = '#FCF0EA', BOX_S = '#F1DDD3', BOX_IN = '#E6C9BD', RIBBON = '#F28C9B', RIBBON_D = '#D9677A';
const WINDOW = '#E3F3FB';
const CUT = '#E4572E';
const SPRINKLES = ['#F07167', '#6FB7EA', '#FFD166', '#7BCB8B', '#B9A7F0'];

const f1 = (n) => (Math.round(n * 10) / 10).toString();
const rad = (deg) => ((deg - 90) * Math.PI) / 180;
const pt = (cx, cy, r, deg) => [cx + Math.cos(rad(deg)) * r, cy + Math.sin(rad(deg)) * r];
let uid = 0;
const nextId = (p) => `${p}${++uid}`;

// ─────────────────────────────────────────────── đồ trang trí
/** Quả dâu (nhìn từ trên hoặc nghiêng đều được): tâm (x, y), cỡ s, xoay rot. */
export function strawberry(x, y, s, rot = 0) {
  const d = `M${f1(x - s * 0.5)},${f1(y - s * 0.28)} Q${f1(x - s * 0.58)},${f1(y + s * 0.3)} ${f1(x)},${f1(y + s * 0.62)} `
    + `Q${f1(x + s * 0.58)},${f1(y + s * 0.3)} ${f1(x + s * 0.5)},${f1(y - s * 0.28)} Q${f1(x)},${f1(y - s * 0.52)} ${f1(x - s * 0.5)},${f1(y - s * 0.28)} Z`;
  let seeds = '';
  for (const [dx, dy] of [[-0.22, 0], [0.2, -0.02], [0, 0.2], [-0.12, 0.36], [0.14, 0.36], [0, -0.14]]) {
    seeds += `<ellipse cx="${f1(x + dx * s)}" cy="${f1(y + dy * s)}" rx="${f1(s * 0.035)}" ry="${f1(s * 0.06)}" fill="${SEED}"/>`;
  }
  const lx = x, ly = y - s * 0.34;
  let leaf = '';
  for (const a of [-70, -35, 0, 35, 70]) {
    const [tx, ty] = pt(lx, ly, s * 0.3, a);
    const [l1x, l1y] = pt(lx, ly, s * 0.1, a - 40);
    const [l2x, l2y] = pt(lx, ly, s * 0.1, a + 40);
    leaf += `M${f1(l1x)},${f1(l1y)} L${f1(tx)},${f1(ty)} L${f1(l2x)},${f1(l2y)} Z `;
  }
  return `<g transform="rotate(${rot} ${f1(x)} ${f1(y)})">`
    + `<path d="${d}" fill="${BERRY}" stroke="${BERRY_D}" stroke-width="${f1(Math.max(1.2, s * 0.06))}" stroke-linejoin="round"/>`
    + `<path d="M${f1(x - s * 0.28)},${f1(y - s * 0.14)} Q${f1(x - s * 0.34)},${f1(y + s * 0.12)} ${f1(x - s * 0.18)},${f1(y + s * 0.3)}" fill="none" stroke="#fff" stroke-width="${f1(s * 0.07)}" stroke-linecap="round" opacity=".55"/>`
    + seeds
    + `<path d="${leaf}" fill="${LEAF}" stroke="#3E8E41" stroke-width="${f1(Math.max(0.8, s * 0.03))}" stroke-linejoin="round"/></g>`;
}

/** Nụ kem bắt bông nhìn từ trên xuống: vòng tròn + đường xoắn. */
export function dollopTop(x, y, r) {
  return `<circle cx="${f1(x + r * 0.12)}" cy="${f1(y + r * 0.16)}" r="${f1(r)}" fill="${CREAM_D}" opacity=".45"/>`
    + `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="#FFFFFF" stroke="${CREAM_D}" stroke-width="${f1(Math.max(1, r * 0.16))}"/>`
    + `<path d="M${f1(x - r * 0.55)},${f1(y + r * 0.1)} Q${f1(x - r * 0.4)},${f1(y - r * 0.6)} ${f1(x + r * 0.2)},${f1(y - r * 0.45)} Q${f1(x + r * 0.6)},${f1(y - r * 0.2)} ${f1(x + r * 0.35)},${f1(y + r * 0.25)} Q${f1(x + r * 0.05)},${f1(y + r * 0.5)} ${f1(x - r * 0.1)},${f1(y + r * 0.05)}" fill="none" stroke="${CREAM_D}" stroke-width="${f1(Math.max(0.9, r * 0.12))}" stroke-linecap="round"/>`;
}

/** Nụ kem nhìn nghiêng (hình giọt nước đứng, đáy (x, y)). */
export function dollopSide(x, y, r) {
  return `<path d="M${f1(x - r)},${f1(y)} Q${f1(x - r * 1.05)},${f1(y - r * 0.9)} ${f1(x)},${f1(y - r * 1.7)} Q${f1(x + r * 1.05)},${f1(y - r * 0.9)} ${f1(x + r)},${f1(y)} Q${f1(x)},${f1(y + r * 0.35)} ${f1(x - r)},${f1(y)} Z" fill="#FFFDF7" stroke="${CREAM_D}" stroke-width="${f1(Math.max(1, r * 0.14))}" stroke-linejoin="round"/>`
    + `<path d="M${f1(x - r * 0.6)},${f1(y - r * 0.35)} Q${f1(x)},${f1(y - r * 0.1)} ${f1(x + r * 0.55)},${f1(y - r * 0.55)} M${f1(x - r * 0.35)},${f1(y - r * 0.95)} Q${f1(x + r * 0.05)},${f1(y - r * 0.75)} ${f1(x + r * 0.3)},${f1(y - r * 1.2)}" fill="none" stroke="${CREAM_D}" stroke-width="${f1(Math.max(0.9, r * 0.12))}" stroke-linecap="round"/>`;
}

/** Quả việt quất nhìn từ trên. */
function blueberry(x, y, r) {
  return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${BLUEBERRY}" stroke="#2F3F80" stroke-width="${f1(Math.max(0.8, r * 0.18))}"/>`
    + `<path d="M${f1(x - r * 0.3)},${f1(y - r * 0.3)} l${f1(r * 0.6)},${f1(r * 0.6)} M${f1(x + r * 0.3)},${f1(y - r * 0.3)} l${f1(-r * 0.6)},${f1(r * 0.6)}" stroke="#2F3F80" stroke-width="${f1(Math.max(0.7, r * 0.15))}" stroke-linecap="round"/>`;
}

/** Số giả ngẫu nhiên cố định theo seed — rắc cốm, xếp bánh quy luôn giống nhau mỗi lần vẽ. */
function lcg(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

// ─────────────────────────────────────────────── đĩa
/** Đĩa tròn trắng nhìn từ trên (tâm, bán kính). */
export function plateSvg(cx, cy, r) {
  return `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="${PLATE}" stroke="${INK}" stroke-width="${SW}"/>`
    + `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r * 0.84)}" fill="none" stroke="${PLATE_D}" stroke-width="${f1(SW * 0.8)}"/>`;
}

// ─────────────────────────────────────────────── bánh tròn nhìn từ trên
/** Hình quạt từ góc a0 tới a1 (độ, a1 > a0). */
function sectorPath(cx, cy, r, a0, a1) {
  if (a1 - a0 >= 359.99) return `M${f1(cx)},${f1(cy - r)} A${f1(r)},${f1(r)} 0 1 1 ${f1(cx - 0.01)},${f1(cy - r)} Z`;
  const [x0, y0] = pt(cx, cy, r, a0);
  const [x1, y1] = pt(cx, cy, r, a1);
  return `M${f1(cx)},${f1(cy)} L${f1(x0)},${f1(y0)} A${f1(r)},${f1(r)} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${f1(x1)},${f1(y1)} Z`;
}

/** Mặt bánh tròn: viền bông lan, kem, vòng nụ kem xen dâu, cụm dâu ở giữa. */
function roundDecor(cx, cy, r, center = true) {
  let out = `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="${SPONGE}"/>`
    + `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r * 0.93)}" fill="${CREAM}"/>`;
  for (let i = 0; i < 20; i++) {
    const [x, y] = pt(cx, cy, r * 0.83, i * 18 + 9);
    out += dollopTop(x, y, r * 0.085);
  }
  for (let i = 0; i < 8; i++) {
    const a = i * 45 + 22.5;
    const [x, y] = pt(cx, cy, r * 0.58, a);
    out += strawberry(x, y, r * 0.2, a);
  }
  if (!center) return out;
  for (const a of [0, 120, 240]) { const [x, y] = pt(cx, cy, r * 0.22, a + 60); out += dollopTop(x, y, r * 0.08); }
  out += strawberry(cx, cy, r * 0.22, 0);
  return out;
}

/**
 * Bánh tròn nhìn từ trên (tâm cx, cy; bán kính r) đặt trên đĩa.
 *   cuts: null = bánh nguyên; hoặc mảng góc cắt (≥ 2, độ) → các miếng nằm giữa hai góc liền nhau,
 *         ví dụ [0, 90, 180, 270] = 4 phần bằng nhau, [0, 70, 180, 250] = 4 phần KHÔNG bằng nhau (bẫy).
 *   apart: đẩy mọi miếng ra xa tâm (px) cho thấy rõ đường cắt.
 *   pulled: { [chỉ số miếng]: px } — kéo riêng một số miếng ra ngoài (miếng đưa khách).
 *   plate: vẽ đĩa bên dưới. center: false = bỏ cụm dâu giữa bánh (để thấy rõ tâm O).
 * Mỗi miếng là <g data-piece="i" data-a0 data-a1> để gắn thao tác chạm / kéo.
 */
export function roundCakeSvg(cx, cy, r, { cuts = null, apart = 0, pulled = {}, plate = true, center = true } = {}) {
  let out = plate ? plateSvg(cx, cy, r * 1.16) : '';
  if (!cuts || cuts.length < 2) {
    return out + `<g data-piece="0">${roundDecor(cx, cy, r, center)}<circle data-outline cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="none" stroke="${INK}" stroke-width="${SW}"/></g>`;
  }
  const a = [...cuts].sort((p, q) => p - q);
  a.forEach((a0, i) => {
    const a1 = i + 1 < a.length ? a[i + 1] : a[0] + 360;
    const d = sectorPath(cx, cy, r, a0, a1);
    const id = nextId('g3bk');
    const off = apart + (pulled[i] || 0);
    const [ox, oy] = pt(0, 0, off, (a0 + a1) / 2);
    out += `<g data-piece="${i}" data-a0="${a0}" data-a1="${a1}"${off ? ` transform="translate(${f1(ox)} ${f1(oy)})"` : ''}>`
      + `<clipPath id="${id}"><path d="${d}"/></clipPath>`
      + `<g clip-path="url(#${id})">${roundDecor(cx, cy, r, center)}</g>`
      + `<path data-outline d="${d}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/></g>`;
  });
  return out;
}

/**
 * Đường cắt thẳng qua bánh tròn: pháp tuyến hướng `ang` (độ, cùng quy ước với cuts), cách tâm `dist` (≥ 0).
 * Trả về hai đầu mút trên mép bánh và đường viền hai miếng (miếng 0 ở phía pháp tuyến — miếng nhỏ khi dist > 0).
 */
export function chordGeom(cx, cy, r, ang, dist) {
  const nx = Math.cos(rad(ang)), ny = Math.sin(rad(ang));
  const d = Math.min(dist, r * 0.98);
  const h = Math.sqrt(r * r - d * d);
  const mx = cx + nx * d, my = cy + ny * d;
  const e0 = [mx + ny * h, my - nx * h], e1 = [mx - ny * h, my + nx * h];
  const an = Math.atan2(ny, nx);
  const a0 = Math.atan2(e0[1] - cy, e0[0] - cx), a1 = Math.atan2(e1[1] - cy, e1[0] - cx);
  const norm = (a) => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  // Cung đi từ e1 tới e0 theo chiều dương có chứa hướng pháp tuyến không → quyết định chiều vẽ của miếng 0.
  const posHasN = norm(an - a1) <= norm(a0 - a1);
  const arc = (from, span) => {
    let s = '';
    for (let i = 1; i < 48; i++) {
      const a = from + (span * i) / 48;
      s += ` L${f1(cx + Math.cos(a) * r)},${f1(cy + Math.sin(a) * r)}`;
    }
    return s;
  };
  const spanP = norm(a0 - a1);            // e1 → e0 theo chiều dương
  const piece0 = `M${f1(e1[0])},${f1(e1[1])}${posHasN ? arc(a1, spanP) : arc(a1, spanP - 2 * Math.PI)} L${f1(e0[0])},${f1(e0[1])} Z`;
  const piece1 = `M${f1(e1[0])},${f1(e1[1])}${posHasN ? arc(a1, spanP - 2 * Math.PI) : arc(a1, spanP)} L${f1(e0[0])},${f1(e0[1])} Z`;
  return { e0, e1, n: [nx, ny], pieces: [piece0, piece1] };
}

/**
 * Bánh tròn bị cắt một nhát thẳng (cấp 3: dao qua tâm hay không). ang / dist như chordGeom;
 * apart / pulled như roundCakeSvg (miếng 0 đẩy theo pháp tuyến, miếng 1 ngược lại).
 */
export function roundCakeChordSvg(cx, cy, r, { ang = 0, dist = 0, apart = 0, pulled = {}, plate = true, center = true } = {}) {
  const g = chordGeom(cx, cy, r, ang, dist);
  let out = plate ? plateSvg(cx, cy, r * 1.16) : '';
  g.pieces.forEach((d, i) => {
    const id = nextId('g3bk');
    const off = (apart + (pulled[i] || 0)) * (i ? -1 : 1);
    out += `<g data-piece="${i}"${off ? ` transform="translate(${f1(g.n[0] * off)} ${f1(g.n[1] * off)})"` : ''}>`
      + `<clipPath id="${id}"><path d="${d}"/></clipPath>`
      + `<g clip-path="url(#${id})">${roundDecor(cx, cy, r, center)}</g>`
      + `<path data-outline d="${d}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/></g>`;
  });
  return out;
}

/** Cách xếp lưới n miếng trên bánh khay: ít thì một hàng, 6 = 3 × 2, 8 = 4 × 2. */
export function sheetGrid(n) {
  const [c, r] = n === 6 ? [3, 2] : n === 8 ? [4, 2] : [n, 1];
  return { xs: Array.from({ length: c - 1 }, (_, i) => (i + 1) / c), ys: Array.from({ length: r - 1 }, (_, i) => (i + 1) / r) };
}

// ─────────────────────────────────────────────── bánh chữ nhật trong khay
/** Mặt bánh khay: bông lan, kem, viền nụ kem, cốm rắc, dâu + việt quất ở bốn góc. */
function sheetDecor(x, y, w, h, seed) {
  const b = Math.min(w, h) * 0.06;            // bề dày viền bông lan
  let out = `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" fill="${SPONGE}"/>`
    + `<rect x="${f1(x + b * 0.5)}" y="${f1(y + b * 0.5)}" width="${f1(w - b)}" height="${f1(h - b)}" fill="${CREAM}"/>`;
  const rnd = lcg(seed);
  for (let i = 0; i < Math.round((w * h) / 380); i++) {
    const sx = x + b * 2.6 + rnd() * (w - b * 5.2), sy = y + b * 2.6 + rnd() * (h - b * 5.2);
    const ang = rnd() * 180, L = b * 0.45;
    out += `<line x1="${f1(sx)}" y1="${f1(sy)}" x2="${f1(sx + Math.cos(ang) * L)}" y2="${f1(sy + Math.sin(ang) * L)}" stroke="${SPRINKLES[i % SPRINKLES.length]}" stroke-width="${f1(b * 0.28)}" stroke-linecap="round"/>`;
  }
  const dr = b * 0.8, step = dr * 1.9;
  const edge = (x0, y0, x1, y1) => {
    const L = Math.hypot(x1 - x0, y1 - y0), k = Math.max(1, Math.round(L / step));
    for (let i = 0; i <= k; i++) out += dollopTop(x0 + ((x1 - x0) * i) / k, y0 + ((y1 - y0) * i) / k, dr);
  };
  const m = b * 1.4;
  edge(x + m, y + m, x + w - m, y + m); edge(x + m, y + h - m, x + w - m, y + h - m);
  edge(x + m, y + m, x + m, y + h - m); edge(x + w - m, y + m, x + w - m, y + h - m);
  const s = b * 2.6;
  for (const [cx, cy, sgx, sgy] of [[x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1]]) {
    out += strawberry(cx + sgx * b * 3.4, cy + sgy * b * 3.2, s, sgx * sgy * -20)
      + blueberry(cx + sgx * b * 5.8, cy + sgy * b * 2.6, b * 0.75) + blueberry(cx + sgx * b * 2.4, cy + sgy * b * 5.6, b * 0.75);
  }
  return out;
}

/**
 * Bánh chữ nhật trong khay nhìn từ trên. (x, y, w, h) = khung mặt bánh (khay nhô ra ngoài).
 *   xs / ys: vị trí đường cắt dọc / ngang theo tỉ lệ 0..1 (không gồm 0 và 1), ví dụ xs = [1/3, 2/3] = 3 cột.
 *            Đường cắt lệch (xs = [0.25, 0.7]) → các phần KHÔNG bằng nhau (bẫy).
 *   apart / pulled như roundCakeSvg; chỉ số miếng = hàng * số cột + cột.
 *   tray: vẽ khay bên dưới.
 */
export function sheetCakeSvg(x, y, w, h, { xs = [], ys = [], apart = 0, pulled = {}, tray = true, seed = 7 } = {}) {
  const t = Math.min(w, h) * 0.08;
  let out = tray
    ? `<rect x="${f1(x - t)}" y="${f1(y - t)}" width="${f1(w + t * 2)}" height="${f1(h + t * 2)}" rx="${f1(t * 0.9)}" fill="${TRAY}" stroke="${INK}" stroke-width="${SW}"/>`
      + `<rect x="${f1(x - t * 0.45)}" y="${f1(y - t * 0.45)}" width="${f1(w + t * 0.9)}" height="${f1(h + t * 0.9)}" rx="${f1(t * 0.5)}" fill="${TRAY_L}" stroke="${STEEL_D}" stroke-width="${f1(SW * 0.6)}"/>`
    : '';
  const cx = [0, ...[...xs].sort((p, q) => p - q), 1], cy = [0, ...[...ys].sort((p, q) => p - q), 1];
  const cols = cx.length - 1;
  const whole = cols === 1 && cy.length === 2;
  const decor = sheetDecor(x, y, w, h, seed);
  for (let r = 0; r < cy.length - 1; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const px = x + cx[c] * w, py = y + cy[r] * h, pw = (cx[c + 1] - cx[c]) * w, ph = (cy[r + 1] - cy[r]) * h;
      const off = whole ? 0 : apart + (pulled[i] || 0);
      // đẩy ra xa tâm bánh theo hướng của miếng
      const dx = px + pw / 2 - (x + w / 2), dy = py + ph / 2 - (y + h / 2), L = Math.hypot(dx, dy) || 1;
      const tr = off ? ` transform="translate(${f1((dx / L) * off)} ${f1((dy / L) * off)})"` : '';
      const id = nextId('g3bs');
      out += `<g data-piece="${i}" data-row="${r}" data-col="${c}"${tr}>`
        + `<clipPath id="${id}"><rect x="${f1(px)}" y="${f1(py)}" width="${f1(pw)}" height="${f1(ph)}"/></clipPath>`
        + `<g clip-path="url(#${id})">${decor}</g>`
        + `<rect data-outline x="${f1(px)}" y="${f1(py)}" width="${f1(pw)}" height="${f1(ph)}" rx="${whole ? f1(t * 0.3) : 0}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/></g>`;
    }
  }
  return out;
}

// ─────────────────────────────────────────────── đường cắt
/** Đường cắt gợi ý (nét đứt đỏ cam) từ (x1, y1) tới (x2, y2). */
export function cutLineSvg(x1, y1, x2, y2, { dash = true } = {}) {
  return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${CUT}" stroke-width="${f1(SW * 1.1)}" stroke-linecap="round"${dash ? ' stroke-dasharray="9 7"' : ''}/>`;
}

/** Chấm tâm bánh tròn (cấp 3: dao phải đi qua đây). */
export function centerDotSvg(cx, cy, r = 5) {
  return `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="${CUT}" stroke="#fff" stroke-width="2"/>`;
}

// ─────────────────────────────────────────────── bánh tròn nhìn nghiêng trên đế
/** Bánh tròn trên đế: (cx, by) = tâm ngang, đáy chân đế; w = bề ngang bánh. */
export function roundCakeSideSvg(cx, by, w, { stand = true } = {}) {
  const rx = w / 2, ry = w * 0.16, ch = w * 0.46;
  let out = '';
  let base = by;
  if (stand) {
    const pw = w * 1.24, ph = w * 0.34;
    const footY = by - w * 0.04, stemTop = by - ph + w * 0.06;
    out += `<ellipse cx="${f1(cx)}" cy="${f1(footY)}" rx="${f1(w * 0.24)}" ry="${f1(w * 0.05)}" fill="#fff" stroke="${INK}" stroke-width="${SW}"/>`
      + `<path d="M${f1(cx - w * 0.07)},${f1(footY - w * 0.02)} Q${f1(cx - w * 0.05)},${f1((footY + stemTop) / 2)} ${f1(cx - w * 0.12)},${f1(stemTop)} H${f1(cx + w * 0.12)} Q${f1(cx + w * 0.05)},${f1((footY + stemTop) / 2)} ${f1(cx + w * 0.07)},${f1(footY - w * 0.02)} Z" fill="#fff" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`;
    // mâm đế viền lượn sóng
    const py = stemTop - w * 0.02, prx = pw / 2, pry = w * 0.13;
    let scal = `M${f1(cx - prx)},${f1(py)}`;
    const k = 12;
    for (let i = 0; i < k; i++) {
      const t0 = Math.PI - (i * Math.PI) / k, t1 = Math.PI - ((i + 1) * Math.PI) / k, tm = (t0 + t1) / 2;
      const ex = cx + Math.cos(t1) * prx, ey = py + Math.sin(t1) * pry;
      scal += ` Q${f1(cx + Math.cos(tm) * prx * 1.02)},${f1(py + Math.sin(tm) * pry + w * 0.06)} ${f1(ex)},${f1(ey)}`;
    }
    out += `<path d="${scal} A${f1(prx)},${f1(pry)} 0 0 0 ${f1(cx - prx)},${f1(py)} Z" fill="#fff" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
      + `<ellipse cx="${f1(cx)}" cy="${f1(py)}" rx="${f1(prx * 0.92)}" ry="${f1(pry * 0.8)}" fill="none" stroke="${PLATE_D}" stroke-width="${f1(SW * 0.7)}"/>`;
    base = py;
  }
  const yb = base, yt = base - ch;
  const id = nextId('g3bc');
  const body = `M${f1(cx - rx)},${f1(yt)} V${f1(yb)} A${f1(rx)},${f1(ry)} 0 0 0 ${f1(cx + rx)},${f1(yb)} V${f1(yt)} Z`;
  out += `<clipPath id="${id}"><path d="${body}"/></clipPath>`
    + `<path d="${body}" fill="${CREAM}"/>`
    + `<g clip-path="url(#${id})"><rect x="${f1(cx - rx - 2)}" y="${f1(yt + ch * 0.42)}" width="${f1(w + 4)}" height="${f1(ch * 0.22)}" fill="${BAND}"/>`
    + `<path d="M${f1(cx - rx)},${f1(yt + ch * 0.42)} A${f1(rx)},${f1(ry)} 0 0 0 ${f1(cx + rx)},${f1(yt + ch * 0.42)} M${f1(cx - rx)},${f1(yt + ch * 0.64)} A${f1(rx)},${f1(ry)} 0 0 0 ${f1(cx + rx)},${f1(yt + ch * 0.64)}" fill="none" stroke="#E07B70" stroke-width="${f1(SW * 0.7)}"/></g>`
    + `<path d="M${f1(cx - rx * 0.8)},${f1(yt + ch * 0.2)} V${f1(yb - ch * 0.1)}" stroke="#fff" stroke-width="${f1(SW * 1.6)}" stroke-linecap="round" opacity=".8"/>`
    + `<path d="${body}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
    + `<ellipse cx="${f1(cx)}" cy="${f1(yt)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="${CREAM}" stroke="${INK}" stroke-width="${SW}"/>`;
  // viền kem chân bánh (nửa trước)
  for (let i = 0; i <= 10; i++) {
    const t = Math.PI - (i * Math.PI) / 10;
    out += dollopSide(cx + Math.cos(t) * rx * 0.97, yb + Math.sin(t) * ry + w * 0.02, w * 0.045);
  }
  // mặt trên: nụ kem + dâu quanh mép, vẽ từ sau ra trước
  const items = [];
  for (let i = 0; i < 12; i++) {
    const t = (i * Math.PI * 2) / 12 + Math.PI / 12;
    items.push({ x: cx + Math.cos(t) * rx * 0.78, y: yt + Math.sin(t) * ry * 0.72, k: i % 2 });
  }
  items.push({ x: cx - rx * 0.18, y: yt - ry * 0.05, k: 0 }, { x: cx + rx * 0.2, y: yt + ry * 0.1, k: 0 });
  items.sort((p, q) => p.y - q.y);
  for (const it of items) {
    out += it.k ? dollopSide(it.x, it.y + w * 0.02, w * 0.05) : strawberry(it.x, it.y - w * 0.04, w * 0.13, (it.x - cx) * 0.2);
  }
  return out;
}

// ─────────────────────────────────────────────── dao, xẻng
/** Dao răng cưa: (x, y) = đuôi cán, dài len, xoay rot độ (0 = mũi dao chỉ sang phải). */
export function knifeSvg(x, y, len, rot = 0) {
  const hl = len * 0.36, hw = len * 0.1, bw = len * 0.15;
  const b0 = hl * 0.96;
  let teeth = '';
  const k = 12;
  for (let i = 0; i < k; i++) {
    const tx = b0 + ((len * 0.92 - b0) * (i + 0.5)) / k;
    teeth += ` L${f1(tx)},${f1(bw * 0.5 + len * 0.018)} L${f1(b0 + ((len * 0.92 - b0) * (i + 1)) / k)},${f1(bw * 0.5)}`;
  }
  const blade = `M${f1(b0)},${f1(-bw * 0.5)} L${f1(len * 0.9)},${f1(-bw * 0.5)} Q${f1(len)},${f1(-bw * 0.45)} ${f1(len)},${f1(-bw * 0.1)} L${f1(len * 0.92)},${f1(bw * 0.5)}`
    + ` L${f1(b0)},${f1(bw * 0.5)} Z`;
  const serr = `M${f1(b0)},${f1(bw * 0.5)}${teeth}`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${rot})">`
    + `<path d="${blade}" fill="${STEEL}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
    + `<path d="${serr}" fill="none" stroke="${INK}" stroke-width="${f1(SW * 0.7)}" stroke-linejoin="round"/>`
    + `<path d="M${f1(b0 + len * 0.04)},${f1(-bw * 0.2)} H${f1(len * 0.86)}" stroke="#fff" stroke-width="${f1(SW)}" stroke-linecap="round" opacity=".9"/>`
    + `<rect x="0" y="${f1(-hw / 2)}" width="${f1(hl)}" height="${f1(hw)}" rx="${f1(hw * 0.45)}" fill="${HANDLE}" stroke="${INK}" stroke-width="${SW}"/>`
    + `<path d="M${f1(hl * 0.12)},${f1(-hw * 0.2)} H${f1(hl * 0.8)}" stroke="#fff" stroke-width="${f1(SW * 0.9)}" stroke-linecap="round" opacity=".6"/>`
    + `<circle cx="${f1(hl * 0.2)}" cy="0" r="${f1(hw * 0.14)}" fill="#fff" stroke="${HANDLE_D}" stroke-width="1"/>`
    + `<circle cx="${f1(hl * 0.72)}" cy="0" r="${f1(hw * 0.14)}" fill="#fff" stroke="${HANDLE_D}" stroke-width="1"/></g>`;
}

/** Xẻng xúc bánh: (x, y) = đuôi cán, dài len, xoay rot độ (0 = mũi chỉ sang phải). */
export function serverSvg(x, y, len, rot = 0) {
  const hl = len * 0.4, hw = len * 0.09, s0 = hl + len * 0.1, bw = len * 0.3;
  const blade = `M${f1(s0)},${f1(-len * 0.05)} L${f1(len * 0.96)},${f1(-bw * 0.5)} Q${f1(len * 1.02)},${f1(0)} ${f1(len * 0.96)},${f1(bw * 0.5)} L${f1(s0)},${f1(len * 0.05)} Z`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${rot})">`
    + `<rect x="${f1(hl * 0.9)}" y="${f1(-len * 0.022)}" width="${f1(s0 - hl * 0.9 + 2)}" height="${f1(len * 0.044)}" fill="${STEEL_D}" stroke="${INK}" stroke-width="${f1(SW * 0.8)}"/>`
    + `<path d="${blade}" fill="${STEEL}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
    + `<path d="M${f1(s0 + len * 0.06)},${f1(-len * 0.03)} L${f1(len * 0.86)},${f1(-bw * 0.32)}" stroke="#fff" stroke-width="${f1(SW)}" stroke-linecap="round" opacity=".9"/>`
    + `<rect x="0" y="${f1(-hw / 2)}" width="${f1(hl)}" height="${f1(hw)}" rx="${f1(hw * 0.45)}" fill="${HANDLE}" stroke="${INK}" stroke-width="${SW}"/>`
    + `<circle cx="${f1(hl * 0.2)}" cy="0" r="${f1(hw * 0.15)}" fill="#fff" stroke="${HANDLE_D}" stroke-width="1"/></g>`;
}

// ─────────────────────────────────────────────── bánh quy
/**
 * Một cái bánh quy nhìn từ trên, tâm (x, y), bán kính r.
 *   kind: 'chip' (chấm sô-cô-la), 'jam' (viền răng cưa, mứt dâu giữa), 'butter' (bánh bơ vàng có khía).
 */
export function cookieSvg(x, y, r, kind = 'chip', seed = 1) {
  const sw = f1(Math.max(1.4, r * 0.1));
  if (kind === 'jam') {
    let d = '';
    const k = 14;
    for (let i = 0; i <= k; i++) {
      const [px, py] = pt(x, y, r * (i % 2 ? 0.9 : 1), (i * 360) / k);
      d += `${i ? ' L' : 'M'}${f1(px)},${f1(py)}`;
    }
    return `<path d="${d} Z" fill="#F4C979" stroke="#B9803A" stroke-width="${sw}" stroke-linejoin="round"/>`
      + `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r * 0.62)}" fill="#F9DC9C"/>`
      + `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r * 0.34)}" fill="${BERRY}" stroke="${BERRY_D}" stroke-width="${f1(r * 0.07)}"/>`
      + `<circle cx="${f1(x - r * 0.1)}" cy="${f1(y - r * 0.12)}" r="${f1(r * 0.08)}" fill="#fff" opacity=".7"/>`;
  }
  if (kind === 'butter') {
    let hatch = '';
    for (let i = -2; i <= 2; i++) {
      const o = i * r * 0.28, L = Math.sqrt(Math.max(0, (r * 0.72) ** 2 - o * o));
      hatch += `M${f1(x + o)},${f1(y - L)} V${f1(y + L)} M${f1(x - L)},${f1(y + o)} H${f1(x + L)} `;
    }
    return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="#FAD97A" stroke="#C99A3A" stroke-width="${sw}"/>`
      + `<path d="${hatch}" stroke="#E4B955" stroke-width="${f1(r * 0.07)}" stroke-linecap="round"/>`;
  }
  const rnd = lcg(seed * 97 + 13);
  let chips = '';
  for (const [dx, dy] of [[-0.4, -0.3], [0.3, -0.42], [0.05, 0.05], [-0.35, 0.35], [0.42, 0.25], [0.02, 0.55], [-0.05, -0.6]]) {
    chips += `<ellipse cx="${f1(x + (dx + (rnd() - 0.5) * 0.12) * r)}" cy="${f1(y + (dy + (rnd() - 0.5) * 0.12) * r)}" rx="${f1(r * 0.13)}" ry="${f1(r * 0.11)}" fill="#5A3A2A"/>`;
  }
  return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="#E0A55E" stroke="#A86B32" stroke-width="${sw}"/>`
    + `<circle cx="${f1(x - r * 0.12)}" cy="${f1(y - r * 0.12)}" r="${f1(r * 0.72)}" fill="#EBB872" opacity=".7"/>` + chips;
}

// ─────────────────────────────────────────────── hộp bánh
/**
 * Hộp bánh giấy nhìn chéo 3/4: (cx, by) = tâm ngang mặt trước, đáy; w = bề ngang mặt trước.
 *   open: mở nắp (nắp dựng phía sau) — inner = SVG vẽ bên trong hộp (bánh), nằm giữa lòng hộp và mặt trước.
 *   closed: nắp có ô kính, ruy băng + nơ, nhãn bánh cupcake ở mặt trước.
 */
export function cakeBoxSvg(cx, by, w, { open = false, inner = '' } = {}) {
  const h = w * 0.62, dx = w * 0.28, dy = w * 0.2;
  const x0 = cx - w / 2, x1 = cx + w / 2, top = by - h;
  const P = (...pts) => pts.map(([x, y]) => `${f1(x)},${f1(y)}`).join(' ');
  const st = `stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"`;
  let out = '';
  const bandW = w * 0.12;
  if (open) {
    const lh = h * 0.72;
    out += `<polygon points="${P([x0 + dx, top - dy], [x1 + dx, top - dy], [x1 + dx * 1.3, top - dy - lh], [x0 + dx * 1.3, top - dy - lh])}" fill="${BOX_S}" ${st}/>`
      + `<polygon points="${P([x0, top], [x0 + dx, top - dy], [x1 + dx, top - dy], [x1, top])}" fill="${BOX_IN}" ${st}/>`
      + inner;
  }
  // mặt bên phải + mặt trước
  out += `<polygon points="${P([x1, top], [x1 + dx, top - dy], [x1 + dx, by - dy], [x1, by])}" fill="${BOX_S}" ${st}/>`
    + `<polygon points="${P([x1, top + h * 0.42], [x1 + dx, top + h * 0.42 - dy], [x1 + dx, top + h * 0.42 - dy + bandW], [x1, top + h * 0.42 + bandW])}" fill="${RIBBON}" opacity=".9"/>`
    + `<rect x="${f1(x0)}" y="${f1(top)}" width="${f1(w)}" height="${f1(h)}" fill="${BOX}" ${st}/>`
    + `<rect x="${f1(cx - bandW / 2)}" y="${f1(top + SW / 2)}" width="${f1(bandW)}" height="${f1(h - SW)}" fill="${RIBBON}" opacity=".9"/>`
    + `<rect x="${f1(x0 + SW / 2)}" y="${f1(top + h * 0.42)}" width="${f1(w - SW)}" height="${f1(bandW)}" fill="${RIBBON}" opacity=".9"/>`;
  // nhãn: hình cupcake nhỏ
  const lx = x0 + w * 0.76, ly = top + h * 0.72, lr = w * 0.1;
  out += `<ellipse cx="${f1(lx)}" cy="${f1(ly)}" rx="${f1(lr * 1.25)}" ry="${f1(lr)}" fill="#fff" stroke="${RIBBON_D}" stroke-width="${f1(SW * 0.6)}"/>`
    + `<path d="M${f1(lx - lr * 0.5)},${f1(ly)} L${f1(lx - lr * 0.35)},${f1(ly + lr * 0.6)} H${f1(lx + lr * 0.35)} L${f1(lx + lr * 0.5)},${f1(ly)} Z" fill="${HANDLE}"/>`
    + `<path d="M${f1(lx - lr * 0.55)},${f1(ly)} Q${f1(lx - lr * 0.55)},${f1(ly - lr * 0.6)} ${f1(lx)},${f1(ly - lr * 0.6)} Q${f1(lx + lr * 0.55)},${f1(ly - lr * 0.6)} ${f1(lx + lr * 0.55)},${f1(ly)} Z" fill="${CREAM_D}"/>`
    + `<circle cx="${f1(lx)}" cy="${f1(ly - lr * 0.7)}" r="${f1(lr * 0.16)}" fill="${BERRY}"/>`;
  if (!open) {
    const tp = [[x0, top], [x0 + dx, top - dy], [x1 + dx, top - dy], [x1, top]];
    out += `<polygon points="${P(...tp)}" fill="${BOX}" ${st}/>`
      // ô kính trên nắp
      + `<polygon points="${P([x0 + w * 0.1 + dx * 0.18, top - dy * 0.18], [x0 + w * 0.1 + dx * 0.82, top - dy * 0.82], [x1 - w * 0.1 + dx * 0.82, top - dy * 0.82], [x1 - w * 0.1 + dx * 0.18, top - dy * 0.18])}" fill="${WINDOW}" stroke="${INK}" stroke-width="${f1(SW * 0.7)}" stroke-linejoin="round"/>`
      // ruy băng trên nắp (dọc theo chiều sâu, ngay giữa)
      + `<polygon points="${P([cx - bandW / 2, top], [cx - bandW / 2 + dx, top - dy], [cx + bandW / 2 + dx, top - dy], [cx + bandW / 2, top])}" fill="${RIBBON}" opacity=".9"/>`;
    // nơ
    const bx = cx + dx * 0.5, byy = top - dy * 0.5, bs = w * 0.16;
    out += `<path d="M${f1(bx)},${f1(byy)} Q${f1(bx - bs * 1.3)},${f1(byy - bs * 1.1)} ${f1(bx - bs * 1.2)},${f1(byy - bs * 0.1)} Q${f1(bx - bs * 1.1)},${f1(byy + bs * 0.35)} ${f1(bx)},${f1(byy)} Z" fill="${RIBBON}" ${st}/>`
      + `<path d="M${f1(bx)},${f1(byy)} Q${f1(bx + bs * 1.3)},${f1(byy - bs * 1.1)} ${f1(bx + bs * 1.2)},${f1(byy - bs * 0.1)} Q${f1(bx + bs * 1.1)},${f1(byy + bs * 0.35)} ${f1(bx)},${f1(byy)} Z" fill="${RIBBON}" ${st}/>`
      + `<path d="M${f1(bx - bs * 0.1)},${f1(byy + bs * 0.1)} L${f1(bx - bs * 0.5)},${f1(byy + bs * 0.8)} M${f1(bx + bs * 0.1)},${f1(byy + bs * 0.1)} L${f1(bx + bs * 0.5)},${f1(byy + bs * 0.8)}" stroke="${INK}" stroke-width="${f1(bs * 0.34)}" stroke-linecap="round"/>`
      + `<path d="M${f1(bx - bs * 0.1)},${f1(byy + bs * 0.1)} L${f1(bx - bs * 0.5)},${f1(byy + bs * 0.8)} M${f1(bx + bs * 0.1)},${f1(byy + bs * 0.1)} L${f1(bx + bs * 0.5)},${f1(byy + bs * 0.8)}" stroke="${RIBBON}" stroke-width="${f1(bs * 0.22)}" stroke-linecap="round"/>`
      + `<circle cx="${f1(bx)}" cy="${f1(byy)}" r="${f1(bs * 0.26)}" fill="${RIBBON_D}" stroke="${INK}" stroke-width="${f1(SW * 0.8)}"/>`;
  }
  return out;
}
