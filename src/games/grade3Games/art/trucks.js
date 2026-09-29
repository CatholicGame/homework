/**
 * Hình vẽ trò Xe chở hàng: thùng hàng, xe tải thùng hở (chở k thùng), hộp bánh và thùng các-tông đóng hộp.
 * Nét và màu theo bộ vẽ lại của vở bài tập (scripts/redraw/common.py: INK, ORANGE, BLUE…; xe tải chép dáng
 * truck() trong kit_g7.py). Thùng hàng ở kho và trên xe vẽ CÙNG MỘT CỠ — là một thùng, chỉ chuyển chỗ.
 * Mỗi thùng / hộp là một nhóm <g class="g3t-bx"> để tìm vị trí cho hình bay.
 */

const INK = '#3F3A40';
const SKY = '#CDEBFA';
const YELLOW = '#FFD166';
export const TRUCK_COLORS = ['#F4A259', '#6FB7EA', '#7BCB8B', '#F07167', '#B9A7F0', '#6CCFB5'];

// Thùng hàng (nhìn thẳng mặt trước): 18 × 16.
const BW = 18, BH = 16;

/** Một thùng hàng các-tông, góc trên trái (x, y). */
export function cargoBoxSvg(x, y) {
  return `<g class="g3t-bx"><rect x="${x}" y="${y}" width="${BW}" height="${BH}" rx="2" fill="#E9B872" stroke="${INK}" stroke-width="1.4"/>`
    + `<path d="M${x + 0.7} ${y + 4.5} H${x + BW - 0.7}" stroke="#B07A4F" stroke-width="1.1"/>`
    + `<rect x="${x + 7.5}" y="${y + 0.7}" width="3" height="3.8" fill="#C98B4E"/>`
    + `<path d="M${x + 3} ${y + 11.5} l1.6 -2 l1.6 2 M${x + 4.6} ${y + 9.5} v3.6" stroke="#B07A4F" stroke-width="1" fill="none" stroke-linecap="round"/></g>`;
}

// Hộp bánh (nhỏ hơn thùng hàng): 16 × 13 — dùng cho kiểu "đóng thùng".
const PW = 16, PH = 13;
const PACK_COLORS = ['#F7A1C4', '#FFD166', '#6CCFB5'];

/** Một hộp bánh, góc trên trái (x, y). tone: đổi màu cho vui mắt (0–2). */
export function packSvg(x, y, tone = 0) {
  const c = PACK_COLORS[tone % PACK_COLORS.length];
  return `<g class="g3t-bx"><rect x="${x}" y="${y}" width="${PW}" height="${PH}" rx="2.2" fill="${c}" stroke="${INK}" stroke-width="1.3"/>`
    + `<rect x="${x + 1}" y="${y + 4.6}" width="${PW - 2}" height="3.8" fill="#fff" opacity="0.85"/>`
    + `<circle cx="${x + PW / 2}" cy="${y + 6.5}" r="1.5" fill="#B07A4F"/></g>`;
}

// ── Kho: xếp hàng 10 (cách một chút sau cái thứ 5) để đếm theo chục; hoặc theo dãy (cols = số thùng mỗi dãy).
const GX = { box: 21, pack: 19 };
const GY = { box: 19, pack: 16 };

/** Cỡ kho (đơn vị viewBox) khi xếp `rows` hàng × `cols`. */
export function storeSize(rows, cols = 10, item = 'box') {
  return { w: cols * GX[item] + 6 + (cols > 5 ? 6 : 0), h: Math.max(1, rows) * GY[item] + 5 };
}

/**
 * n thùng (item 'box') hoặc hộp bánh ('pack') xếp thành hàng `cols` cái. minRows: giữ kho cao như lúc đầy —
 * thùng chở đi thì chỗ trống lại, kho không co. gone: số thùng cuối đã đi (vẽ chỗ trống mờ).
 */
export function storeSvg(n, { rows: minRows = 1, cols = 10, item = 'box' } = {}) {
  const gx = GX[item], gy = GY[item];
  const rows = Math.max(1, minRows, Math.ceil(n / cols));
  const { w, h } = storeSize(rows, cols, item);
  let s = '';
  for (let i = 0; i < n; i++) {
    const c = i % cols;
    const x = 3 + c * gx + (c >= 5 && cols > 5 ? 6 : 0) + (gx - (item === 'box' ? BW : PW)) / 2;
    const y = 3 + Math.floor(i / cols) * gy + (gy - (item === 'box' ? BH : PH)) / 2;
    s += item === 'box' ? cargoBoxSvg(x, y) : packSvg(x, y);
  }
  return `<svg viewBox="0 0 ${w} ${h}" aria-hidden="true">${s}</svg>`;
}

// ── Xe tải thùng hở: k chỗ để thùng (1 tầng nếu k ≤ 3, còn lại 2 tầng — tầng dưới xếp trước).
const SX = 21, SY = 18, CAB = 36;

function truckLayout(k) {
  const cols = k <= 3 ? k : Math.ceil(k / 2);
  const rows = k <= 3 ? 1 : 2;
  const bedW = cols * SX + 5;
  const deck = 3 + Math.max(rows * SY, 30) + 2;
  return { cols, rows, bedW, deck, w: 4 + bedW + 3 + CAB + 3, h: deck + 15 + 9 + 2 };
}

/** Cỡ xe chở k thùng (đơn vị viewBox). */
export function truckSize(k) {
  const { w, h } = truckLayout(k);
  return { w, h };
}

const wheel = (cx, cy, r = 8.5) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#4B4F58" stroke="${INK}" stroke-width="1.8"/>`
  + `<circle cx="${cx}" cy="${cy}" r="${(r * 0.45).toFixed(1)}" fill="#E8ECF0" stroke="${INK}" stroke-width="1.2"/>`;

/**
 * Xe tải chở k thùng, đang có `filled` thùng trên thùng xe; chỗ trống vẽ viền nét đứt để bé thấy xe chở được
 * bao nhiêu. Đầu xe bên phải (xe chạy sang phải). Trả về chuỗi <svg> hoàn chỉnh.
 */
export function truckSvg(k, filled = 0, { color = TRUCK_COLORS[0] } = {}) {
  const { cols, bedW, deck, w, h } = truckLayout(k);
  const x0 = 4, x1 = x0 + bedW;
  const st = `stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"`;
  let s = '';
  // khung gầm + sàn thùng
  const cx0 = x1 + 3, cx1 = cx0 + CAB;
  s += `<rect x="${x0 - 1}" y="${deck + 6}" width="${cx1 - x0 + 1}" height="7" rx="2.5" fill="#8A929C" ${st}/>`;
  s += `<rect x="${x0}" y="${deck}" width="${bedW}" height="7" rx="1.5" fill="#C9D2DC" ${st}/>`;
  // vách đầu thùng (sát cabin) và cột đuôi
  s += `<rect x="${x1 - 3}" y="${deck - 30}" width="4" height="30" rx="1.5" fill="#C9D2DC" ${st}/>`;
  s += `<rect x="${x0}" y="${deck - 8}" width="3.5" height="8" rx="1.2" fill="#C9D2DC" ${st}/>`;
  // cabin
  const top = deck - 30, bot = deck + 12;
  s += `<path d="M${cx0} ${bot} V${top} H${cx1 - 13} Q${cx1 - 6} ${top} ${cx1 - 3.5} ${top + 11} L${cx1} ${top + 18} V${bot} Z" fill="${color}" ${st}/>`;
  s += `<path d="M${cx0 + 6} ${top + 5} H${cx1 - 13} Q${cx1 - 8.5} ${top + 5} ${cx1 - 6.5} ${top + 16} H${cx0 + 6} Z" fill="${SKY}" stroke="${INK}" stroke-width="1.3"/>`;
  s += `<rect x="${cx0 + 5}" y="${top + 21}" width="7" height="2.6" rx="1.3" fill="${INK}"/>`;
  s += `<rect x="${cx1 - 3}" y="${deck + 1}" width="4" height="5" rx="1.3" fill="${YELLOW}" stroke="${INK}" stroke-width="1.1"/>`;
  // bánh xe: dưới cabin và dưới đuôi thùng
  s += wheel((cx0 + cx1) / 2 + 2, deck + 15) + wheel(x0 + 19, deck + 15);
  // chỗ để thùng: tầng dưới trước, từ đuôi xe tới đầu xe
  for (let i = 0; i < k; i++) {
    const r = Math.floor(i / cols), c = i % cols;
    const bx = x0 + 3 + c * SX + (SX - BW) / 2 - 1, by = deck - (r + 1) * SY + (SY - BH);
    s += i < filled
      ? cargoBoxSvg(bx, by)
      : `<rect x="${bx + 0.5}" y="${by + 0.5}" width="${BW - 1}" height="${BH - 1}" rx="2" fill="#fff" fill-opacity="0.55" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="3 2.2"/>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" aria-hidden="true">${s}</svg>`;
}

// ── Thùng các-tông nhìn từ trên xuống, chia k ô, mỗi ô một hộp bánh.
const LAYOUT = { 2: [2, 1], 3: [3, 1], 4: [2, 2], 5: [5, 1], 6: [3, 2], 7: [4, 2], 8: [4, 2], 9: [3, 3] };
const CX = 20, CY = 17, CP = 6;
const crateLayout = (k) => LAYOUT[k] || [Math.ceil(k / 2), 2];

export function crateSize(k) {
  const [c, r] = crateLayout(k);
  return { w: c * CX + CP * 2 + 4, h: r * CY + CP * 2 + 4 };
}

/** Thùng k ô, `filled` ô đầu có hộp bánh. Đầy thì viền xanh (mark: false — để tô sau, khi hộp cuối rơi vào). */
export function crateSvg(k, filled = 0, { mark = true } = {}) {
  const [cols] = crateLayout(k);
  const { w, h } = crateSize(k);
  const full = mark && filled >= k;
  let s = `<rect x="2" y="2" width="${w - 4}" height="${h - 4}" rx="4" fill="#E9B872" stroke="${full ? '#16A34A' : INK}" stroke-width="${full ? 2.6 : 1.6}"/>`
    + `<rect x="${CP}" y="${CP}" width="${w - CP * 2}" height="${h - CP * 2}" rx="2" fill="#C98B4E" opacity="0.55"/>`;
  for (let i = 0; i < k; i++) {
    const x = CP + 2 + (i % cols) * CX, y = CP + 2 + Math.floor(i / cols) * CY;
    s += i < filled
      ? packSvg(x, y)
      : `<rect x="${x + 0.5}" y="${y + 0.5}" width="${PW - 1}" height="${PH - 1}" rx="2" fill="none" stroke="#8A5A33" stroke-width="1" stroke-dasharray="2.6 2" opacity="0.7"/>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" aria-hidden="true">${s}</svg>`;
}

/** Hình nhỏ cho bảng hiệu / hoá đơn / thẻ trò chơi. */
export const truckIcon = (k = 4, size = 40, filled = k, color) => truckSvg(k, filled, { color }).replace('<svg ', `<svg width="${size}" height="${size}" `);
export const crateIcon = (k = 6, size = 34, filled = k) => crateSvg(k, filled).replace('<svg ', `<svg width="${size}" height="${size}" `);
export const boxIcon = (size = 26) => `<svg viewBox="-1 -1 ${BW + 2} ${BH + 2}" width="${size}" height="${size}" aria-hidden="true">${cargoBoxSvg(0, 0)}</svg>`;
export const packIcon = (size = 24) => `<svg viewBox="-1 -1 ${PW + 2} ${PH + 2}" width="${size}" height="${size}" aria-hidden="true">${packSvg(0, 0)}</svg>`;

/** Một thùng / hộp rời để bay (khung vừa khít). */
export const FLY_BOX = `<svg viewBox="0 0 ${BW} ${BH}" preserveAspectRatio="none" aria-hidden="true">${cargoBoxSvg(0, 0)}</svg>`;
export const flyPack = (tone = 0) => `<svg viewBox="0 0 ${PW} ${PH}" preserveAspectRatio="none" aria-hidden="true">${packSvg(0, 0, tone)}</svg>`;
