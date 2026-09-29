/**
 * Hình vẽ trò 🎂 Tiệc sinh nhật chia kẹo (lớp 2): kẹo, bánh quy, tất, cánh hoa; đĩa, túi quà, bông hoa, bạn nhỏ đội mũ
 * sinh nhật; đĩa to đựng đồ chưa chia. Nét và màu theo bộ vẽ lại của vở (INK #3F3A40, màu phẳng).
 *
 * Mỗi "chỗ đựng" (đĩa, túi, bông hoa, bạn nhỏ) là một hình SVG riêng có viewBox cố định { w, h } và danh sách ô đồ vật
 * (slots: tâm x, y, góc xoay). Đồ vật trong ô vẽ sẵn, ẩn đi (opacity 0) tới khi bay tới nơi — khung đích đo bằng
 * getBoundingClientRect của chính ô đó.
 */

export const INK = '#3F3A40';
const f1 = (n) => (Math.round(n * 10) / 10).toString();

export const CANDY_COLORS = ['#F07167', '#F4A259', '#7BCB8B', '#6FB7EA', '#B9A7F0', '#F7C548'];
const SOCK_COLORS = ['#6FB7EA', '#F07167', '#7BCB8B', '#F4A259', '#B9A7F0'];
const PETAL_COLORS = ['#F9A8D4', '#FDE047', '#C4B5FD', '#FCA5A5', '#93C5FD'];
const BAG_COLORS = ['#FBCFE8', '#BFDBFE', '#BBF7D0', '#FDE68A', '#DDD6FE'];
const HAT_COLORS = ['#F07167', '#6FB7EA', '#7BCB8B', '#F4A259', '#B9A7F0'];
const SKINS = ['#FAD7B5', '#F2C49B', '#E8B48A', '#FCE0C4'];
const HAIRS = ['#3F3A40', '#6B4226', '#2B2530', '#8A5A2B'];
const SHIRTS = ['#FDE68A', '#A7F3D0', '#BFDBFE', '#FBCFE8', '#FECACA'];

/** Cỡ khung (đơn vị hình) của một đồ vật — ô trong lưới cách nhau thêm một chút. */
export const ITEM = {
  candy: { w: 26, h: 13 },
  cookie: { w: 17, h: 17 },
  sock: { w: 13, h: 20 },
  petal: { w: 12, h: 21 },
};

/** Một đồ vật vẽ quanh tâm (0, 0). */
export function itemBody(type, color) {
  if (type === 'candy') {
    return `<path d="M-6 0 L-12.5 -5.8 L-12.5 5.8 Z M6 0 L12.5 -5.8 L12.5 5.8 Z" fill="${color}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`
      + `<ellipse cx="0" cy="0" rx="7.4" ry="5.8" fill="${color}" stroke="${INK}" stroke-width="1.5"/>`
      + '<path d="M-3.6 -2.4 Q-1 -4 2 -3.4" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".8"/>';
  }
  if (type === 'cookie') {
    return `<circle r="8" fill="#E9B872" stroke="${INK}" stroke-width="1.5"/>`
      + '<circle cx="-3" cy="-2.4" r="1.3" fill="#6B4226"/><circle cx="2.8" cy="-3" r="1.1" fill="#6B4226"/>'
      + '<circle cx="3.2" cy="2.6" r="1.3" fill="#6B4226"/><circle cx="-2" cy="3.2" r="1" fill="#6B4226"/><circle cx="0.3" cy="0" r="0.9" fill="#6B4226"/>';
  }
  if (type === 'sock') {
    return `<path d="M-3.8 -9.5 H3.2 V2.2 Q3.2 4 5 5.2 Q6.6 6.4 5.6 8.4 Q4.6 10 2 9.6 L-2.6 8.6 Q-4.8 8 -4.6 5.2 Z" fill="${color}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`
      + `<rect x="-4.3" y="-9.8" width="8" height="3.4" rx="1" fill="#fff" stroke="${INK}" stroke-width="1.2"/>`;
  }
  // petal: cánh hoa dài theo trục y, gốc ở dưới
  return `<ellipse cx="0" cy="0" rx="5.6" ry="10" fill="${color}" stroke="${INK}" stroke-width="1.4"/>`
    + '<path d="M0 6 V-5" stroke="#fff" stroke-width="1.1" opacity=".6" stroke-linecap="round"/>';
}

/** Đồ vật ở tâm (x, y), xoay rot độ — một ô (slot) trong chỗ đựng hoặc trên đĩa to. */
export function itemSvg(type, x, y, color, { rot = 0, attrs = '' } = {}) {
  const tr = `translate(${f1(x)} ${f1(y)})${rot ? ` rotate(${f1(rot)})` : ''}`;
  return `<g transform="${tr}" ${attrs}>${itemBody(type, color)}</g>`;
}

/** Bản sao của một đồ vật để bay (khung vừa khít đồ vật). */
export function flyItem(type, color) {
  const { w, h } = ITEM[type];
  return `<svg viewBox="${-w / 2} ${-h / 2} ${w} ${h}" preserveAspectRatio="none" aria-hidden="true" style="width:100%;height:100%;display:block;overflow:visible">${itemBody(type, color)}</svg>`;
}

/** Biểu tượng một đồ vật (cho hoá đơn, dải cách chơi). */
export function itemIcon(type, size = 28, color = CANDY_COLORS[0]) {
  const { w, h } = ITEM[type];
  const m = Math.max(w, h) + 4;
  return `<svg viewBox="${-m / 2} ${-m / 2} ${m} ${m}" width="${size}" height="${size}" aria-hidden="true" style="overflow:visible">${itemBody(type, color)}</svg>`;
}

/** Lưới ô: n ô, cols cột, xếp từ dưới lên (hàng cuối có thể thiếu, căn giữa), đáy hàng dưới cùng ở baseY. */
function gridSlots(n, cols, type, cx, baseY, { dx, dy } = {}) {
  const { w, h } = ITEM[type];
  const sx = dx ?? w + 4, sy = dy ?? h + 3;
  const out = [];
  const rows = Math.ceil(n / cols);
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / cols), inRow = r === rows - 1 ? n - r * cols : cols;
    const c = i % cols;
    out.push({ x: cx + (c - (inRow - 1) / 2) * sx, y: baseY - h / 2 - (rows - 1 - r) * sy });
  }
  return out;
}
const colsFor = (n, type) => (n <= 3 ? n : n === 4 ? 2 : n <= 6 ? 3 : type === 'candy' ? 4 : 5);

// ─────────────────────────────────────────────── chỗ đựng
/**
 * Chỗ đựng `n` ô đồ vật loại `type`. kind: 'plate' (đĩa), 'bag' (túi quà), 'flower' (bông hoa 5 cánh), 'guest' (bạn nhỏ
 * ngồi sau đĩa). Trả về { w, h, slots, svg(filled, opts) } — svg vẽ cả n ô, ô thứ i ≥ filled ẩn (chờ đồ bay tới).
 * opts: { tone (màu), mood ('happy' | 'sad' | 'wait', bạn nhỏ), miss (ô trống viền đỏ nét đứt), color (màu đồ vật) }.
 */
export function holder(kind, n, type, tone = 0) {
  if (kind === 'flower') return flowerHolder(tone);
  const cols = colsFor(Math.max(1, n), type);
  const { w: iw, h: ih } = ITEM[type];
  const rows = Math.max(1, Math.ceil(n / cols));
  const gw = cols * (iw + 4), gh = rows * (ih + 3);
  if (kind === 'bag') {
    const w = Math.max(74, gw + 26), h = Math.max(96, gh + 52);
    const slots = gridSlots(n, cols, type, w / 2, h - 12);
    const col = BAG_COLORS[tone % BAG_COLORS.length];
    const body = `<path d="M${f1(w * 0.36)} 30 Q${f1(w * 0.36)} 8 ${f1(w / 2)} 8 Q${f1(w * 0.64)} 8 ${f1(w * 0.64)} 30" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`
      + `<path d="M6 28 H${f1(w - 6)} L${f1(w - 2)} ${f1(h - 3)} H2 Z" fill="${col}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`
      + `<path d="M6 28 H${f1(w - 6)} L${f1(w - 5)} 36 H5 Z" fill="#fff" opacity=".45"/>`
      + `<path d="M${f1(w / 2 - 9)} 24 l9 5 l9 -5 l-2 9 l-7 -4 l-7 4 Z" fill="#F07167" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`;
    return { kind, w, h, slots, svg: (filled, o = {}) => wrap(w, h, body + slotsSvg(slots, type, filled, o)) };
  }
  if (kind === 'guest') {
    const pw = Math.max(84, gw + 20);
    const w = Math.max(96, pw + 8);
    const headY = 34;
    const plateY = headY + 44 + gh + 8;
    const h = plateY + 14;
    const slots = gridSlots(n, cols, type, w / 2, plateY - 2);
    const hat = HAT_COLORS[tone % HAT_COLORS.length], skin = SKINS[tone % SKINS.length];
    const hair = HAIRS[(tone >> 1) % HAIRS.length], shirt = SHIRTS[(tone * 3 + 1) % SHIRTS.length];
    const cx = w / 2;
    const kid = `<path d="M${f1(cx - 26)} ${headY + 46} Q${f1(cx - 26)} ${headY + 22} ${f1(cx)} ${headY + 22} Q${f1(cx + 26)} ${headY + 22} ${f1(cx + 26)} ${headY + 46} Z" fill="${shirt}" stroke="${INK}" stroke-width="2"/>`
      + `<circle cx="${f1(cx)}" cy="${headY}" r="17" fill="${skin}" stroke="${INK}" stroke-width="2"/>`
      + `<path d="M${f1(cx - 17.4)} ${headY - 1} Q${f1(cx - 17)} ${headY - 19} ${f1(cx)} ${headY - 18} Q${f1(cx + 17)} ${headY - 19} ${f1(cx + 17.4)} ${headY - 1} Q${f1(cx + 6)} ${headY - 11} ${f1(cx - 17.4)} ${headY - 1} Z" fill="${hair}"/>`
      + `<path d="M${f1(cx - 9)} ${headY - 15} L${f1(cx + 2)} ${headY - 34} L${f1(cx + 11)} ${headY - 13} Z" fill="${hat}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>`
      + `<path d="M${f1(cx - 6)} ${headY - 20} L${f1(cx + 8)} ${headY - 18} M${f1(cx - 2.5)} ${headY - 27} L${f1(cx + 5.5)} ${headY - 25.5}" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`
      + `<circle cx="${f1(cx + 2)}" cy="${headY - 35}" r="3.6" fill="#FDE047" stroke="${INK}" stroke-width="1.4"/>`
      + `<circle cx="${f1(cx - 6)}" cy="${headY + 1}" r="1.8" fill="${INK}"/><circle cx="${f1(cx + 6)}" cy="${headY + 1}" r="1.8" fill="${INK}"/>`
      + `<circle cx="${f1(cx - 10)}" cy="${headY + 7}" r="3" fill="#F9A8D4" opacity=".7"/><circle cx="${f1(cx + 10)}" cy="${headY + 7}" r="3" fill="#F9A8D4" opacity=".7"/>`;
    const mouth = (mood) => (mood === 'sad'
      ? `<path d="M${f1(cx - 5)} ${headY + 11} Q${f1(cx)} ${headY + 6.5} ${f1(cx + 5)} ${headY + 11}" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>`
      : mood === 'happy'
        ? `<path d="M${f1(cx - 6)} ${headY + 6.5} Q${f1(cx)} ${headY + 14} ${f1(cx + 6)} ${headY + 6.5} Z" fill="#E5484D" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>`
        : `<path d="M${f1(cx - 4.5)} ${headY + 8} Q${f1(cx)} ${headY + 11} ${f1(cx + 4.5)} ${headY + 8}" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>`);
    // Tất là quà mang về: xếp trên mặt bàn (vạch bàn), không đặt lên đĩa như kẹo.
    const plate = type === 'sock'
      ? `<path d="M${f1(cx - pw / 2)} ${f1(plateY + 1)} H${f1(cx + pw / 2)}" stroke="#D6B98C" stroke-width="5" stroke-linecap="round"/>`
      : plateSvg(cx, plateY, pw / 2);
    return {
      kind, w, h, slots,
      svg: (filled, o = {}) => wrap(w, h, `<g class="g2p-kid${o.mood === 'happy' ? ' g2p-kid-happy' : o.mood === 'sad' ? ' g2p-kid-sad' : ''}">${kid}<g data-mouth>${mouth(o.mood)}</g></g>${plate}${slotsSvg(slots, type, filled, o)}`),
    };
  }
  // plate
  const pw = Math.max(80, gw + 18);
  const w = pw + 6, h = gh + 26;
  const slots = gridSlots(n, cols, type, w / 2, h - 13);
  return { kind, w, h, slots, svg: (filled, o = {}) => wrap(w, h, plateSvg(w / 2, h - 11, pw / 2) + slotsSvg(slots, type, filled, o)) };
}

const plateSvg = (cx, cy, rx) => `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="9" fill="#fff" stroke="${INK}" stroke-width="2"/>`
  + `<ellipse cx="${f1(cx)}" cy="${f1(cy - 1)}" rx="${f1(rx * 0.72)}" ry="5.2" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.2"/>`;

/** Bông hoa: nhụy vàng, 5 ô cánh quanh nhụy, cuống và lá. */
function flowerHolder(tone) {
  const w = 76, h = 96, cx = 38, cy = 34, R = 17;
  const slots = Array.from({ length: 5 }, (_, i) => {
    const a = (i * 72 - 90) * Math.PI / 180;
    return { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R, rot: i * 72 };
  });
  const color = PETAL_COLORS[tone % PETAL_COLORS.length];
  const stem = `<path d="M${cx} ${cy + 12} Q${cx + 4} ${cy + 36} ${cx} ${h - 4}" stroke="#4D9A55" stroke-width="3.2" fill="none" stroke-linecap="round"/>`
    + `<path d="M${cx + 1} ${cy + 42} Q${cx + 20} ${cy + 32} ${cx + 24} ${cy + 44} Q${cx + 12} ${cy + 52} ${cx + 1} ${cy + 42} Z" fill="#7BCB8B" stroke="${INK}" stroke-width="1.6"/>`;
  const ghost = slots.map(s => `<g transform="translate(${f1(s.x)} ${f1(s.y)}) rotate(${s.rot})"><ellipse rx="5.6" ry="10" fill="none" stroke="#CBD5E1" stroke-width="1.3" stroke-dasharray="3 2.5"/></g>`).join('');
  const center = `<circle cx="${cx}" cy="${cy}" r="8" fill="#FACC15" stroke="${INK}" stroke-width="1.8"/><circle cx="${cx - 2}" cy="${cy - 2}" r="1.2" fill="#B45309"/><circle cx="${cx + 2.4}" cy="${cy + 1.2}" r="1.2" fill="#B45309"/>`;
  return {
    kind: 'flower', w, h, slots,
    svg: (filled, o = {}) => wrap(w, h, stem + ghost + slotsSvg(slots, 'petal', filled, { ...o, color: o.color || color }) + center),
  };
}

function slotsSvg(slots, type, filled, { color = CANDY_COLORS[0], miss = false, colors } = {}) {
  return slots.map((s, i) => {
    const c = colors ? colors[i % colors.length] : color;
    const hidden = i >= filled;
    const missBox = hidden && miss
      ? `<rect x="${f1(s.x - ITEM[type].w / 2)}" y="${f1(s.y - ITEM[type].h / 2)}" width="${ITEM[type].w}" height="${ITEM[type].h}" rx="4" fill="#FFF1F2" stroke="#DC2626" stroke-width="1.8" stroke-dasharray="3 2"/>`
      : '';
    return missBox + itemSvg(type, s.x, s.y, c, { rot: s.rot || 0, attrs: `data-slot="${i}"${hidden ? ' style="opacity:0"' : ''}` });
  }).join('');
}

const wrap = (w, h, inner) => `<svg viewBox="0 0 ${f1(w)} ${f1(h)}" data-vw="${f1(w)}" data-vh="${f1(h)}" aria-hidden="true" style="overflow:visible">${inner}</svg>`;

// ─────────────────────────────────────────────── đĩa to (đồ chưa chia)
/** Kích thước đĩa to chứa n ô đồ vật loại type, cols cột. */
export function bowlSize(n, type, cols = 10) {
  const { w, h } = ITEM[type];
  const rows = Math.max(1, Math.ceil(n / cols));
  return { w: Math.min(n, cols) * (w + 3) + 28, h: rows * (h + 3) + 24, rows };
}

/** Đĩa to: n đồ vật xếp hàng `cols` (đếm theo chục), mỗi ô data-slot; màu đồ vật lấy lần lượt trong colors. */
export function bowlSvg(n, type, colors, cols = 10) {
  const { w, h } = bowlSize(n, type, cols);
  const { w: iw, h: ih } = ITEM[type];
  let s = `<rect x="2" y="2" width="${f1(w - 4)}" height="${f1(h - 4)}" rx="${f1(Math.min(22, h / 2))}" fill="#fff" stroke="${INK}" stroke-width="2.4"/>`
    + `<rect x="9" y="8" width="${f1(w - 18)}" height="${f1(h - 16)}" rx="${f1(Math.min(16, h / 2 - 6))}" fill="#FFF7ED" stroke="#FED7AA" stroke-width="1.4"/>`;
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / cols), c = i % cols;
    s += itemSvg(type, 14 + iw / 2 + c * (iw + 3), 12 + ih / 2 + r * (ih + 3), colors[i % colors.length], { attrs: `data-slot="${i}"` });
  }
  return wrap(w, h, s);
}

/** Biểu tượng trò (thẻ chọn trò, bảng hiệu): bánh kem có nến. */
export function cakeIcon(size = 56) {
  return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
    <rect x="30" y="8" width="4" height="12" rx="1.5" fill="#6FB7EA" stroke="${INK}" stroke-width="1.4"/>
    <path d="M32 2 Q36 7 32 9 Q28 7 32 2 Z" fill="#FACC15" stroke="${INK}" stroke-width="1.2"/>
    <rect x="12" y="20" width="40" height="16" rx="4" fill="#FBCFE8" stroke="${INK}" stroke-width="2"/>
    <path d="M12 26 q5 5 10 0 q5 5 10 0 q5 5 10 0 q5 5 10 0" fill="none" stroke="#fff" stroke-width="2.4"/>
    <rect x="6" y="36" width="52" height="18" rx="4" fill="#F4A259" stroke="${INK}" stroke-width="2"/>
    <path d="M6 42 q6.5 6 13 0 q6.5 6 13 0 q6.5 6 13 0 q6.5 6 13 0" fill="none" stroke="#FEF3C7" stroke-width="2.6"/>
    <ellipse cx="32" cy="57" rx="30" ry="5" fill="#fff" stroke="${INK}" stroke-width="2"/>
  </svg>`;
}

/** Biểu tượng chỗ đựng (dải cách chơi): đĩa có 5 kẹo, túi quà, bạn nhỏ. */
export function holderIcon(kind, size = 48, type = 'candy', n = 5) {
  const hd = holder(kind, n, type, 1);
  const svg = hd.svg(n, { colors: CANDY_COLORS, mood: 'happy' });
  return svg.replace('<svg ', `<svg width="${size}" height="${Math.round(size * hd.h / hd.w)}" `);
}
