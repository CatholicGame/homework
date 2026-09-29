/**
 * Hình vẽ trò 🚌 Xe buýt lên xuống: xe buýt hai tầng, toa tàu, đầu máy, hành khách, trạm chờ.
 * Nét và màu theo bộ vẽ của trò lớp 3 (grade3Games/art/trucks.js: INK, bảng màu xe).
 * Ghế xếp HÀNG 10 (cách một chút sau ghế thứ 5) để bé đếm theo chục: mỗi xe / mỗi toa có 2 tầng × 10 ghế = 20 chỗ,
 * tầng dưới ngồi trước. Mỗi ghế là một <g class="g2b-seat" data-s="vehicle:index">, mỗi người đứng ở trạm là
 * <g class="g2b-man" data-p="i"> — có ô <rect class="g2b-slot"> vô hình để đo chỗ cho hình bay.
 */

export const INK = '#3F3A40';
const SKY = '#D6EEFB';
const SKINS = ['#F8D2B4', '#EDB98A', '#D69A6E', '#F3C9A0'];
const HAIRS = ['#3F3A40', '#6B4226', '#2B2B2B', '#A0522D', '#4B3621'];
const SHIRTS = ['#F07167', '#6FB7EA', '#7BCB8B', '#FFD166', '#B9A7F0', '#F4A259', '#6CCFB5', '#F7A1C4'];
const PANTS = ['#3B5B8C', '#4B4F58', '#6B4E3D', '#2F6B5A'];

export const BUS_COLORS = { blue: '#5AA9E6', red: '#F07167', yellow: '#F9C74F', green: '#6CC08B' };

// Ô cửa sổ (một ghế): rộng 18, cao 20, bước 22; khe giữa ghế 5 và 6 rộng thêm 8.
export const WIN_W = 18, WIN_H = 20, PITCH = 22, MID = 8;
export const SEATS = 20; // mỗi xe / mỗi toa
const DECK_Y = [36, 9]; // tầng dưới (ngồi trước), tầng trên
export const BUS_W = 284, CAR_W = 252, LOCO_W = 70, VEH_H = 84;

/** Toạ độ ô cửa sổ ghế i (0–19) trong một xe, tính từ góc trái xe. */
export function seatXY(i) {
  const c = i % 10;
  return { x: 10 + c * PITCH + (c >= 5 ? MID : 0), y: DECK_Y[Math.floor(i / 10)] };
}

/** Hành khách ngồi trong ô cửa sổ (x, y): đầu + vai. tone: số nguyên bất kỳ để đổi màu da, tóc, áo. */
export function seatedSvg(x, y, tone = 0) {
  const skin = SKINS[tone % SKINS.length], hair = HAIRS[(tone >> 2) % HAIRS.length], shirt = SHIRTS[(tone * 3 + 1) % SHIRTS.length];
  const cx = x + 9;
  return `<path d="M${x + 2} ${y + 20} Q${x + 2} ${y + 13} ${cx} ${y + 13} Q${x + 16} ${y + 13} ${x + 16} ${y + 20} Z" fill="${shirt}" stroke="${INK}" stroke-width="1.1"/>`
    + `<circle cx="${cx}" cy="${y + 8.4}" r="5" fill="${skin}" stroke="${INK}" stroke-width="1.1"/>`
    + `<path d="M${cx - 5.1} ${y + 8} Q${cx - 5} ${y + 2.6} ${cx} ${y + 3} Q${cx + 5} ${y + 2.6} ${cx + 5.1} ${y + 8} Q${cx + 1.5} ${y + 5.2} ${cx - 5.1} ${y + 8} Z" fill="${hair}"/>`
    + `<circle cx="${cx - 1.8}" cy="${y + 9}" r="0.75" fill="${INK}"/><circle cx="${cx + 1.8}" cy="${y + 9}" r="0.75" fill="${INK}"/>`;
}

/** Người đứng (16 × 30), góc trên trái (x, y). */
export const MAN_W = 16, MAN_H = 30;
export function standingSvg(x, y, tone = 0) {
  const skin = SKINS[tone % SKINS.length], hair = HAIRS[(tone >> 2) % HAIRS.length];
  const shirt = SHIRTS[(tone * 3 + 1) % SHIRTS.length], pants = PANTS[tone % PANTS.length];
  const cx = x + 8;
  return `<rect x="${cx - 4}" y="${y + 21}" width="3.4" height="9" rx="1.4" fill="${pants}" stroke="${INK}" stroke-width="0.9"/>`
    + `<rect x="${cx + 0.6}" y="${y + 21}" width="3.4" height="9" rx="1.4" fill="${pants}" stroke="${INK}" stroke-width="0.9"/>`
    + `<path d="M${cx - 6} ${y + 23} Q${cx - 6.5} ${y + 12} ${cx} ${y + 11.5} Q${cx + 6.5} ${y + 12} ${cx + 6} ${y + 23} Z" fill="${shirt}" stroke="${INK}" stroke-width="1.1"/>`
    + `<circle cx="${cx}" cy="${y + 6.2}" r="5" fill="${skin}" stroke="${INK}" stroke-width="1.1"/>`
    + `<path d="M${cx - 5.1} ${y + 5.8} Q${cx - 5} ${y + 0.4} ${cx} ${y + 0.8} Q${cx + 5} ${y + 0.4} ${cx + 5.1} ${y + 5.8} Q${cx + 1.5} ${y + 3} ${cx - 5.1} ${y + 5.8} Z" fill="${hair}"/>`
    + `<circle cx="${cx - 1.8}" cy="${y + 6.8}" r="0.75" fill="${INK}"/><circle cx="${cx + 1.8}" cy="${y + 6.8}" r="0.75" fill="${INK}"/>`;
}

/** Hình bay: hành khách ngồi (vừa khít ô cửa sổ). */
export const flySeated = (tone) => `<svg viewBox="0 0 ${WIN_W} ${WIN_H}" preserveAspectRatio="none" aria-hidden="true">${seatedSvg(0, 0, tone)}</svg>`;
/** Hình bay: người đứng. */
export const flyStanding = (tone) => `<svg viewBox="0 0 ${MAN_W} ${MAN_H}" preserveAspectRatio="none" aria-hidden="true">${standingSvg(0, 0, tone)}</svg>`;

const wheel = (cx, cy, r = 10.5) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#4B4F58" stroke="${INK}" stroke-width="1.8"/>`
  + `<circle cx="${cx}" cy="${cy}" r="${r * 0.42}" fill="#CBD5E1" stroke="${INK}" stroke-width="1.2"/>`;

/** Hàng 20 ô cửa sổ của một xe / toa. seats[i] = tone (có người) hoặc null; mark[i] = lớp CSS thêm cho ghế i. */
function windowsSvg(vid, seats, mark = {}) {
  let s = '';
  for (let i = 0; i < SEATS; i++) {
    const { x, y } = seatXY(i);
    const who = seats[i];
    s += `<g class="g2b-seat${mark[i] ? ` ${mark[i]}` : ''}" data-s="${vid}:${i}">`
      + `<rect x="${x}" y="${y}" width="${WIN_W}" height="${WIN_H}" rx="3" fill="${SKY}" stroke="${INK}" stroke-width="1.4"/>`
      + `<rect x="${x + 3}" y="${y + 13}" width="${WIN_W - 6}" height="${WIN_H - 13.7}" rx="1.5" fill="#94A3B8"/>`
      + `<g class="g2b-who">${who == null ? '' : seatedSvg(x, y, who)}</g>`
      + `<rect class="g2b-glass" x="${x}" y="${y}" width="${WIN_W}" height="${WIN_H}" rx="3" fill="#fff" opacity="0.12"/>`
      + `<rect class="g2b-slot" x="${x}" y="${y}" width="${WIN_W}" height="${WIN_H}" fill="none"/></g>`;
  }
  return s;
}

/** Bảng đếm khách (chữ số xanh trên nền đen). */
function counterSvg(x, y, w, h, value) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#1F2937" stroke="${INK}" stroke-width="1.4"/>`
    + `<text class="g2b-count" x="${x + w / 2}" y="${y + h * 0.76}" text-anchor="middle" font-size="${h * 0.78}" fill="#86EFAC" font-weight="800" font-family="Courier New, monospace">${value}</text>`;
}

/**
 * Xe buýt hai tầng (284 × 84), đầu xe bên phải, cửa lên xuống ở đầu xe.
 * opts: color, seats (20 phần tử), mark, count (số trên bảng đếm, '?' khi chưa biết), label (tên xe dưới cửa sổ),
 * curtain (rèm che kín cửa sổ), doorOpen.
 */
export function busSvg(vid, { color = BUS_COLORS.blue, seats, mark, count = '', label = '', curtain = false, doorOpen = false } = {}) {
  const W = BUS_W;
  const dark = shade(color);
  return `<g class="g2b-veh" data-v="${vid}">`
    + `<rect x="2" y="3" width="${W - 4}" height="68" rx="11" fill="${color}" stroke="${INK}" stroke-width="2"/>`
    + `<rect x="2" y="31" width="${W - 4}" height="3.5" fill="${dark}"/>`
    + `<rect x="2" y="59" width="${W - 4}" height="12" rx="0" fill="${dark}" opacity="0.55"/>`
    + windowsSvg(vid, seats, mark)
    + (curtain ? curtainsSvg() : '')
    // Đầu xe: bảng đếm khách ở tầng trên, cửa + kính chắn gió ở tầng dưới.
    + counterSvg(242, 9, 34, 20, count)
    + `<g class="g2b-door${doorOpen ? ' g2b-door-open' : ''}" data-door="${vid}">`
    + `<rect x="240" y="36" width="22" height="33" rx="2" fill="#E2E8F0" stroke="${INK}" stroke-width="1.6"/>`
    + `<rect class="g2b-leaf" x="241.5" y="37.5" width="9" height="30" rx="1.5" fill="${SKY}" stroke="${INK}" stroke-width="1"/>`
    + `<rect class="g2b-leaf g2b-leaf-r" x="251.5" y="37.5" width="9" height="30" rx="1.5" fill="${SKY}" stroke="${INK}" stroke-width="1"/></g>`
    + `<path d="M266 36 H274 Q280 36 280 44 V58 H266 Z" fill="${SKY}" stroke="${INK}" stroke-width="1.5"/>`
    + `<circle cx="276" cy="64" r="2.6" fill="#FFE08A" stroke="${INK}" stroke-width="1"/>`
    + (label ? `<text class="g2b-label" x="120" y="68.5" text-anchor="middle" fill="#fff">${label}</text>` : '')
    + wheel(52, 72) + wheel(212, 72)
    + `</g>`;
}

/** Toa tàu (252 × 84): 20 ghế, tên toa ở chân toa. */
export function carSvg(vid, { color = BUS_COLORS.green, seats, mark, label = '' } = {}) {
  const W = CAR_W;
  const dark = shade(color);
  return `<g class="g2b-veh" data-v="${vid}">`
    + `<rect x="2" y="3" width="${W - 4}" height="66" rx="6" fill="${color}" stroke="${INK}" stroke-width="2"/>`
    + `<rect x="2" y="31" width="${W - 4}" height="3.5" fill="${dark}"/>`
    + `<rect x="2" y="59" width="${W - 4}" height="10" fill="${dark}" opacity="0.55"/>`
    + windowsSvg(vid, seats, mark)
    + (label ? `<text class="g2b-label" x="${W / 2}" y="67.5" text-anchor="middle" fill="#fff">${label}</text>` : '')
    + wheel(34, 72, 9) + wheel(64, 72, 9) + wheel(W - 64, 72, 9) + wheel(W - 34, 72, 9)
    + `<rect x="-6" y="56" width="10" height="4" fill="${INK}"/>`
    + `</g>`;
}

/** Đầu máy (70 × 84), mũi bên phải, bảng đếm khách cả đoàn tàu trên thân. */
export function locoSvg({ color = '#F07167', count = '' } = {}) {
  const dark = shade(color);
  return `<g class="g2b-loco">`
    + `<path d="M2 3 H44 Q66 3 68 30 V69 H2 Z" fill="${color}" stroke="${INK}" stroke-width="2"/>`
    + `<path d="M44 9 H50 Q60 10 62 30 H44 Z" fill="${SKY}" stroke="${INK}" stroke-width="1.5"/>`
    + counterSvg(6, 9, 34, 20, count)
    + `<rect x="2" y="59" width="66" height="10" fill="${dark}" opacity="0.55"/>`
    + `<circle cx="60" cy="50" r="3.4" fill="#FFE08A" stroke="${INK}" stroke-width="1"/>`
    + `<rect x="10" y="38" width="28" height="4" rx="2" fill="${dark}"/>`
    + wheel(20, 72, 9) + wheel(50, 72, 9)
    + `</g>`;
}

/** Rèm che kín 20 cửa sổ (trò "nhiều hơn, ít hơn": xe đỏ chưa cho xem khách). */
function curtainsSvg() {
  let s = '<g class="g2b-curtains">';
  for (let i = 0; i < SEATS; i++) {
    const { x, y } = seatXY(i);
    s += `<g class="g2b-curtain" data-c="${i}"><rect x="${x + 0.7}" y="${y + 0.7}" width="${WIN_W - 1.4}" height="${WIN_H - 1.4}" rx="2.5" fill="#FDE68A" stroke="#B45309" stroke-width="1"/>`
      + `<path d="M${x + 6} ${y + 1} V${y + 19} M${x + 12} ${y + 1} V${y + 19}" stroke="#F59E0B" stroke-width="1"/></g>`;
  }
  return `${s}</g>`;
}

/** Trạm chờ: cột biển xe buýt (hình xe buýt đơn giản, không chữ) cao `h`. */
export function stopSignSvg(x, y, h, { train = false } = {}) {
  const bx = x - 13, by = y;
  const pict = train
    ? `<rect x="${bx + 5}" y="${by + 8}" width="16" height="10" rx="3" fill="#fff"/><circle cx="${bx + 9}" cy="${by + 19.5}" r="1.8" fill="#fff"/><circle cx="${bx + 17}" cy="${by + 19.5}" r="1.8" fill="#fff"/><rect x="${bx + 7}" y="${by + 10}" width="5" height="3.5" fill="#2563EB"/><rect x="${bx + 14}" y="${by + 10}" width="5" height="3.5" fill="#2563EB"/>`
    : `<rect x="${bx + 5}" y="${by + 7}" width="16" height="12" rx="2.5" fill="#fff"/><rect x="${bx + 7}" y="${by + 9}" width="5" height="4" fill="#2563EB"/><rect x="${bx + 14}" y="${by + 9}" width="5" height="4" fill="#2563EB"/><circle cx="${bx + 9}" cy="${by + 20}" r="1.8" fill="#fff"/><circle cx="${bx + 17}" cy="${by + 20}" r="1.8" fill="#fff"/>`;
  return `<rect x="${x - 1.8}" y="${y + 20}" width="3.6" height="${h - 20}" fill="#64748B" stroke="${INK}" stroke-width="1"/>`
    + `<rect x="${bx}" y="${by}" width="26" height="26" rx="5" fill="#2563EB" stroke="${INK}" stroke-width="1.6"/>${pict}`;
}

/** Biểu tượng xe buýt / tàu nhỏ (thẻ quầy, cách chơi): khung vuông, hình nằm giữa. */
const squareBox = (w, h) => { const S = Math.max(w, h) + 4; return `${(w - S) / 2} ${(h - S) / 2} ${S} ${S}`; };
export function busIcon(size = 48, filled = 7) {
  const seats = Array.from({ length: SEATS }, (_, i) => (i < filled ? i * 5 : null));
  return `<svg viewBox="${squareBox(BUS_W, VEH_H)}" width="${size}" height="${size}" aria-hidden="true">${busSvg('i', { seats, count: filled })}</svg>`;
}
export function trainIcon(size = 48) {
  const seats = Array.from({ length: SEATS }, (_, i) => (i < 13 ? i * 5 : null));
  return `<svg viewBox="${squareBox(CAR_W + LOCO_W + 4, VEH_H)}" width="${size}" height="${size}" aria-hidden="true">${carSvg('i', { seats })}<g transform="translate(${CAR_W + 4},0)">${locoSvg({ count: 13 })}</g></svg>`;
}

/** Màu tối hơn một chút (viền dải thân xe). */
function shade(hex, k = 0.78) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.round(v * k).toString(16).padStart(2, '0');
  return `#${c(n >> 16)}${c((n >> 8) & 255)}${c(n & 255)}`;
}
