/**
 * Hình vẽ trò 🚆 Chuyến tàu Bắc – Nam (lớp 3, số đến 1 000): toa tàu nhìn từ trên xuống, đầu máy có bảng đếm khách,
 * khách đứng chờ trên sân ga theo nhóm TRĂM – CHỤC – ĐƠN VỊ.
 * Mỗi toa 100 ghế = 10 hàng × 10 ghế (một hàng là một chục, cách thêm một chút sau ghế thứ 5 và sau hàng thứ 5 —
 * lối đi giữa toa), ngồi lần lượt từ hàng trên xuống. Ghế g (0–999) của cả đoàn: toa ⌊g / 100⌋, ô g % 100.
 * Nét và màu theo bộ vẽ của các trò lớp 3 (INK, bảng màu áo của trò xe buýt lớp 2).
 */

export const INK = '#3F3A40';
const SKINS = ['#F8D2B4', '#EDB98A', '#D69A6E', '#F3C9A0'];
const HAIRS = ['#3F3A40', '#6B4226', '#2B2B2B', '#A0522D', '#4B3621'];
const SHIRTS = ['#F07167', '#6FB7EA', '#7BCB8B', '#FFD166', '#B9A7F0', '#F4A259', '#6CCFB5', '#F7A1C4'];

// Ghế: bước 9, ô 7.4; khe giữa ghế 5 và 6 (dọc toa) và lối đi giữa hàng 5 và 6.
export const SP = 9, SEAT = 7.4, MIDX = 4, AISLE = 7;
const PAD_X = 9, PAD_Y = 8;
export const CAR_W = PAD_X * 2 + 10 * SP - (SP - SEAT) + MIDX; // ≈ 110
export const CAR_BODY_H = PAD_Y * 2 + 10 * SP - (SP - SEAT) + AISLE; // ≈ 112
export const CAR_H = CAR_BODY_H + 13; // + dải tên toa
export const LOCO_W = 96;
export const CARS = 10, PER_CAR = 100;

/** Góc trên trái ô ghế i (0–99) trong một toa. */
export function seatXY(i) {
  const r = Math.floor(i / 10), c = i % 10;
  return { x: PAD_X + c * SP + (c >= 5 ? MIDX : 0), y: PAD_Y + r * SP + (r >= 5 ? AISLE : 0) };
}

/** Một người nhìn từ trên xuống (vai + đầu) trong ô vuông cạnh s, góc trên trái (x, y). */
export function personTop(x, y, s, tone = 0) {
  const skin = SKINS[tone % SKINS.length], hair = HAIRS[(tone >> 2) % HAIRS.length], shirt = SHIRTS[(tone * 3 + 1) % SHIRTS.length];
  const cx = x + s / 2, k = s / 10;
  return `<ellipse cx="${cx}" cy="${y + 7 * k}" rx="${4.6 * k}" ry="${2.8 * k}" fill="${shirt}" stroke="${INK}" stroke-width="${0.7 * k}"/>`
    + `<circle cx="${cx}" cy="${y + 4.4 * k}" r="${2.9 * k}" fill="${skin}" stroke="${INK}" stroke-width="${0.7 * k}"/>`
    + `<path d="M${cx - 2.9 * k} ${y + 4.2 * k} A${2.9 * k} ${2.9 * k} 0 0 1 ${cx + 2.9 * k} ${y + 4.2 * k} Q${cx} ${y + 3 * k} ${cx - 2.9 * k} ${y + 4.2 * k} Z" fill="${hair}"/>`;
}

/** Màu áo, tóc của người ngồi ghế g — cố định theo ghế, đổi theo ván (seed). */
export const toneOf = (g, seed) => ((g * 2654435761 + seed) >>> 0) % 997;

/**
 * Toa thứ k (0 = Toa 1, sát đầu máy) gồm 100 ghế <g class="g3n-seat" data-s="g">; ghế có người thêm lớp g3n-on
 * (người luôn vẽ sẵn, ẩn khi ghế trống — đổi chỗ chỉ cần bật / tắt lớp). on(g) → true khi ghế g có người,
 * mark(g) → lớp CSS thêm (chỗ sai, nhóm vừa lên…).
 */
export function carSvg(k, { on, mark = () => '', seed = 0, color = '#6CCFB5' } = {}) {
  const dark = shade(color);
  let s = `<g class="g3n-car" data-car="${k}">`
    + `<rect x="1" y="1" width="${CAR_W - 2}" height="${CAR_BODY_H - 2}" rx="9" fill="${color}" stroke="${INK}" stroke-width="2"/>`
    + `<rect x="5" y="5" width="${CAR_W - 10}" height="${CAR_BODY_H - 10}" rx="6" fill="#F8FAFC" stroke="${dark}" stroke-width="1.2"/>`
    + `<rect x="5" y="${PAD_Y + 5 * SP - 0.8}" width="${CAR_W - 10}" height="${AISLE - 0.4}" fill="#E2E8F0"/>`;
  for (let i = 0; i < PER_CAR; i++) {
    const g = k * PER_CAR + i;
    const { x, y } = seatXY(i);
    const cls = `g3n-seat${on(g) ? ' g3n-on' : ''}${mark(g) ? ` ${mark(g)}` : ''}`;
    s += `<g class="${cls}" data-s="${g}"><rect x="${x}" y="${y}" width="${SEAT}" height="${SEAT}" rx="1.8"/>`
      + `<g class="g3n-p">${personTop(x - 0.6, y - 0.6, SEAT + 1.2, toneOf(g, seed))}</g></g>`;
  }
  s += `<rect x="0" y="${CAR_BODY_H}" width="${CAR_W}" height="12" rx="4" fill="${dark}"/>`
    + `<text class="g3n-car-label" x="${CAR_W / 2}" y="${CAR_BODY_H + 9.2}" text-anchor="middle">Toa ${k + 1}</text>`
    + `<rect x="${CAR_W - 1}" y="${CAR_BODY_H / 2 - 5}" width="9" height="10" rx="2" fill="${INK}"/>`
    + `</g>`;
  return s;
}

/** Đầu máy nhìn từ trên xuống (mũi bên trái), bảng đếm khách cả đoàn tàu trên nóc. */
export function locoSvg({ count = '', color = '#F07167' } = {}) {
  const dark = shade(color), H = CAR_BODY_H, W = LOCO_W;
  return `<g class="g3n-loco">`
    + `<path d="M${W - 2} 1 H24 Q2 1 2 ${H / 2} Q2 ${H - 1} 24 ${H - 1} H${W - 2} Z" fill="${color}" stroke="${INK}" stroke-width="2"/>`
    + `<path d="M22 12 Q10 ${H / 2} 22 ${H - 12}" fill="none" stroke="#D6EEFB" stroke-width="7" stroke-linecap="round"/>`
    + `<path d="M22 12 Q10 ${H / 2} 22 ${H - 12}" fill="none" stroke="${INK}" stroke-width="1.2" stroke-linecap="round" opacity=".5"/>`
    + `<rect x="30" y="${H / 2 - 22}" width="${W - 36}" height="44" rx="5" fill="#1F2937" stroke="${INK}" stroke-width="1.6"/>`
    + `<text class="g3n-count" x="${30 + (W - 36) / 2}" y="${H / 2 + 9}" text-anchor="middle">${count}</text>`
    + `<text class="g3n-count-cap" x="${30 + (W - 36) / 2}" y="${H / 2 - 13}" text-anchor="middle">KHÁCH</text>`
    + `<rect x="30" y="8" width="${W - 36}" height="9" rx="3" fill="${dark}"/><rect x="30" y="${H - 17}" width="${W - 36}" height="9" rx="3" fill="${dark}"/>`
    + `<circle cx="9" cy="${H / 2 - 18}" r="3" fill="#FFE08A" stroke="${INK}" stroke-width="1"/><circle cx="9" cy="${H / 2 + 18}" r="3" fill="#FFE08A" stroke="${INK}" stroke-width="1"/>`
    + `</g>`;
}

// ── Khách trên sân ga: nhóm trăm (thảm 10 × 10 người), nhóm chục (hàng 10 người), từng người ──
export const GP = 4.6; // bước người trong nhóm
export const HUND_W = 10 * GP + 4, HUND_H = 10 * GP + 4; // ≈ 50
export const TEN_W = HUND_W, TEN_H = GP + 3;
export const ONE = 11;

/** Nhóm trăm (100 người đứng thành 10 hàng), góc trên trái (x, y). */
export function hundredSvg(x, y, tone = 0) {
  let s = `<rect x="${x}" y="${y}" width="${HUND_W}" height="${HUND_H}" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="1.3"/>`;
  for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) {
    s += personTop(x + 2 + c * GP, y + 2 + r * GP, GP, tone + r * 10 + c);
  }
  return s;
}
/** Nhóm chục (10 người đứng một hàng). */
export function tenSvg(x, y, tone = 0) {
  let s = `<rect x="${x}" y="${y}" width="${TEN_W}" height="${TEN_H}" rx="2.5" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.1"/>`;
  for (let c = 0; c < 10; c++) s += personTop(x + 2 + c * GP, y + 1.5, GP, tone + c);
  return s;
}
/** Một người lẻ. */
export const oneSvg = (x, y, tone = 0) => personTop(x, y, ONE, tone);

const SIZE = { h: [HUND_W, HUND_H], t: [TEN_W, TEN_H], o: [ONE, ONE] };
export const groupSize = (type) => SIZE[type];
export function groupSvg(type, x, y, tone) {
  return type === 'h' ? hundredSvg(x, y, tone) : type === 't' ? tenSvg(x, y, tone) : oneSvg(x, y, tone);
}
/** Hình bay của một nhóm (vừa khít khung). */
export function flyGroup(type, tone) {
  const [w, h] = SIZE[type];
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">${groupSvg(type, 0, 0, tone)}</svg>`;
}

/** Biển tên ga: cột + bảng xanh hình đoàn tàu (không chữ). */
export function stationSignSvg(x, y, h) {
  return `<rect x="${x - 1.6}" y="${y + 18}" width="3.2" height="${h - 18}" fill="#64748B" stroke="${INK}" stroke-width="1"/>`
    + `<rect x="${x - 13}" y="${y}" width="26" height="22" rx="5" fill="#2563EB" stroke="${INK}" stroke-width="1.5"/>`
    + `<rect x="${x - 8}" y="${y + 5}" width="16" height="9" rx="2.5" fill="#fff"/><rect x="${x - 6}" y="${y + 7}" width="4.5" height="3.2" fill="#2563EB"/><rect x="${x + 1.5}" y="${y + 7}" width="4.5" height="3.2" fill="#2563EB"/>`
    + `<circle cx="${x - 4}" cy="${y + 17}" r="1.6" fill="#fff"/><circle cx="${x + 4}" cy="${y + 17}" r="1.6" fill="#fff"/>`;
}

/** Biểu tượng (thẻ trò, cách chơi): đầu máy + một toa đang có khách. */
export function trainIcon(size = 56) {
  const W = LOCO_W + CAR_W + 6, H = CAR_H, S = Math.max(W, H) + 6;
  const car = carSvg(0, { on: g => g < 47, seed: 7 });
  return `<svg viewBox="${(W - S) / 2} ${(H - S) / 2} ${S} ${S}" width="${size}" height="${size}" aria-hidden="true">${locoSvg({ count: 47 })}<g transform="translate(${LOCO_W + 6},0)">${car}</g></svg>`;
}

/** Màu tối hơn một chút. */
export function shade(hex, k = 0.78) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.round(v * k).toString(16).padStart(2, '0');
  return `#${c(n >> 16)}${c((n >> 8) & 255)}${c(n & 255)}`;
}
