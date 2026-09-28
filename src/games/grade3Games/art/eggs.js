/**
 * Trứng gà và hộp trứng SVG cho quầy trứng. Hộp giấy có các ô lõm xếp thành hàng; số ô = số quả một hộp.
 */

// Cách xếp ô trong hộp theo số quả: [số cột, số hàng] — giống hộp trứng thật (hộp 6 = 3 × 2, hộp 10 = 5 × 2).
const LAYOUT = { 2: [2, 1], 3: [3, 1], 4: [2, 2], 5: [5, 1], 6: [3, 2], 7: [4, 2], 8: [4, 2], 9: [3, 3], 10: [5, 2] };
const CELL = 24;
const PAD = 7;

export function cartonLayout(k) {
  return LAYOUT[k] || [Math.ceil(k / 2), 2];
}

/** Kích thước hộp k quả (đơn vị viewBox) — để xếp lưới hộp vừa khung. */
export function cartonSize(k) {
  const [c, r] = cartonLayout(k);
  return { w: c * CELL + PAD * 2, h: r * CELL + PAD * 2 };
}

/** Một quả trứng, tâm (x, y), cao 2r. `cls` để gắn hiệu ứng rơi vào hộp. */
export function eggSvg(x, y, r = 9, { cls = '', delay = 0 } = {}) {
  const style = delay ? ` style="animation-delay:${delay}ms"` : '';
  return `<g class="${cls}"${style}><ellipse cx="${x}" cy="${y}" rx="${(r * 0.78).toFixed(1)}" ry="${r}" fill="#FCE3C4" stroke="#C98B4E" stroke-width="1.4"/>`
    + `<ellipse cx="${(x - r * 0.28).toFixed(1)}" cy="${(y - r * 0.38).toFixed(1)}" rx="${(r * 0.2).toFixed(1)}" ry="${(r * 0.32).toFixed(1)}" fill="#fff" opacity="0.75"/></g>`;
}

/**
 * Hộp trứng k ô, `filled` ô đầu có trứng. pop: số quả vừa bỏ vào (các quả cuối) — vẽ có hiệu ứng rơi.
 * Trả về chuỗi <svg> hoàn chỉnh (co giãn theo bề rộng khung chứa).
 */
export function cartonSvg(k, filled = 0, { pop = 0 } = {}) {
  const [cols, rows] = cartonLayout(k);
  const { w, h } = cartonSize(k);
  let cells = '';
  for (let i = 0; i < k; i++) {
    const cx = PAD + (i % cols) * CELL + CELL / 2;
    const cy = PAD + Math.floor(i / cols) * CELL + CELL / 2;
    // Ô lõm hình quả trứng (vừa khít quả trứng cùng cỡ với trứng ở khay) — nhìn là biết chỗ đặt trứng.
    cells += `<ellipse cx="${cx}" cy="${cy}" rx="8.4" ry="10.4" fill="#D9A15E" stroke="#B7793B" stroke-width="1"/>`
      + `<ellipse cx="${cx}" cy="${cy + 2}" rx="6.4" ry="7.4" fill="#C98B4E" opacity="0.35"/>`;
    if (i < filled) {
      const fresh = i >= filled - pop;
      cells += eggSvg(cx, cy - 1, 9.5, fresh ? { cls: 'g3e-egg-pop', delay: (i - (filled - pop)) * 70 } : {});
    }
  }
  const full = filled >= k;
  return `<svg viewBox="-2 -2 ${w + 4} ${h + 4}" aria-hidden="true">
    <rect x="0" y="0" width="${w}" height="${h}" rx="7" fill="${full ? '#F3CF96' : '#EBC188'}" stroke="${full ? '#16A34A' : '#B7793B'}" stroke-width="${full ? 2.5 : 1.8}"/>
    ${cells}
  </svg>`;
}

const TRAY_GX = 19, TRAY_GY = 23;

/** Cỡ khay (đơn vị viewBox) khi xếp `rows` hàng, mỗi hàng `cols` quả (10, hoặc 5 khi khung hẹp). */
export function looseTraySize(rows, cols = 10) {
  return { w: cols * TRAY_GX + 8 + (cols > 5 ? 6 : 0), h: Math.max(1, rows) * TRAY_GY + 6 };
}

/**
 * Khay trứng rời: n quả xếp hàng 10 (cách một chút sau quả thứ 5) để dễ đếm theo chục — hoặc hàng 5
 * khi khung hẹp. minRows: giữ khay cao đúng như lúc đầy — lấy bớt trứng thì chỗ trống lại, khay không co.
 */
export function looseEggsSvg(n, minRows = 1, cols = 10) {
  const gx = TRAY_GX, gy = TRAY_GY;
  const rows = Math.max(1, minRows, Math.ceil(n / cols));
  const { w, h } = looseTraySize(rows, cols);
  let eggs = '';
  for (let i = 0; i < n; i++) {
    const c = i % cols;
    eggs += eggSvg(4 + c * gx + gx / 2 + (c >= 5 ? 6 : 0), 3 + Math.floor(i / cols) * gy + gy / 2, 9.5);
  }
  return `<svg viewBox="0 0 ${w} ${h}" data-w="${w}" data-h="${h}" aria-hidden="true">${eggs}</svg>`;
}

/** Hình hộp nhỏ cho bảng hiệu / hoá đơn / thẻ quầy. */
export function cartonIcon(k = 6, size = 40, filled = k) {
  return cartonSvg(k, filled).replace('<svg ', `<svg width="${size}" height="${size}" `);
}
