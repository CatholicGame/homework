/**
 * Hình vẽ trò Máy phóng to – thu nhỏ: cỗ máy biến hình (phễu vào bên trái, màn hình ghi phép biến đổi, đèn,
 * bánh răng, cần gạt, máng ra bên phải) và thẻ số. Nét và màu theo bộ vẽ lại của vở bài tập
 * (scripts/redraw/common.py: INK, PURPLE, GREY_L…).
 * Chỗ để code tìm: [data-hopper] miệng phễu, [data-chute] miệng máng ra, [data-disp] chữ trên màn hình,
 * [data-lever] cần gạt (xoay quanh gốc), .g3m-light đèn nháy khi máy chạy, .g3m-gear bánh răng quay.
 */

const INK = '#3F3A40';

export const MACHINE_W = 176, MACHINE_H = 176;

/** Bánh răng tâm (cx, cy), bán kính r, `n` răng. */
function gear(cx, cy, r, n, fill) {
  let d = '';
  for (let i = 0; i < n * 2; i++) {
    const a = (i * Math.PI) / n, rr = i % 2 ? r : r * 1.28;
    const a0 = a - Math.PI / (n * 2.6), a1 = a + Math.PI / (n * 2.6);
    d += `${i ? 'L' : 'M'}${(cx + rr * Math.cos(a0)).toFixed(1)} ${(cy + rr * Math.sin(a0)).toFixed(1)} L${(cx + rr * Math.cos(a1)).toFixed(1)} ${(cy + rr * Math.sin(a1)).toFixed(1)} `;
  }
  return `<g class="g3m-gear" style="transform-origin:${cx}px ${cy}px"><path d="${d}Z" fill="${fill}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${(r * 0.38).toFixed(1)}" fill="#fff" stroke="${INK}" stroke-width="1.6"/></g>`;
}

/** Cỡ chữ màn hình vừa khung (chữ dài thì nhỏ lại). */
export const dispSize = (label) => (String(label).length > 9 ? 14 : String(label).length > 6 ? 16 : 20);

/**
 * Cỗ máy. label: chữ trên màn hình (vd. "GẤP 3 LẦN", "?"). Trả về chuỗi <svg> hoàn chỉnh.
 */
export function machineSvg(label = '?') {
  const st = `stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"`;
  return `<svg class="g3m-svg" viewBox="0 0 ${MACHINE_W} ${MACHINE_H}" aria-hidden="true">
    <!-- chân máy -->
    <rect x="24" y="152" width="22" height="14" rx="4" fill="#8A929C" ${st}/>
    <rect x="112" y="152" width="22" height="14" rx="4" fill="#8A929C" ${st}/>
    <!-- phễu vào -->
    <path data-hopper d="M8 10 H78 L62 44 H24 Z" fill="#E8ECF0" ${st}/>
    <path d="M16 18 H70" stroke="#A7B1BC" stroke-width="2" stroke-linecap="round"/>
    <!-- cần gạt (gốc ở cạnh phải thân máy) -->
    <g data-lever style="transform-origin:150px 74px">
      <path d="M150 74 L166 26" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
      <path d="M150 74 L166 26" stroke="#A7B1BC" stroke-width="3.6" stroke-linecap="round"/>
      <circle cx="166" cy="24" r="9" fill="#F07167" ${st}/>
      <circle cx="163" cy="21" r="2.6" fill="#fff" opacity="0.8"/>
    </g>
    <!-- thân máy -->
    <rect x="12" y="40" width="140" height="114" rx="16" fill="#B9A7F0" ${st}/>
    <rect x="20" y="46" width="124" height="8" rx="4" fill="#fff" opacity="0.35"/>
    <circle cx="150" cy="74" r="6" fill="#8A929C" ${st}/>
    <!-- màn hình -->
    <rect x="24" y="58" width="116" height="38" rx="8" fill="#1E293B" ${st}/>
    <text data-disp x="82" y="83.5" text-anchor="middle" font-family="Baloo 2, Quicksand, sans-serif" font-weight="800" font-size="${dispSize(label)}" fill="#86EFAC">${label}</text>
    <!-- đèn + bánh răng -->
    <circle class="g3m-light" cx="34" cy="112" r="6.5" fill="#F07167" ${st}/>
    <circle class="g3m-light" cx="52" cy="112" r="6.5" fill="#FFD166" ${st}/>
    <circle class="g3m-light" cx="70" cy="112" r="6.5" fill="#7BCB8B" ${st}/>
    ${gear(108, 124, 13, 8, '#FFD166')}
    ${gear(80, 138, 8, 6, '#6CCFB5')}
    <!-- máng ra -->
    <path data-chute d="M140 118 H170 L174 146 H140 Z" fill="#E8ECF0" ${st}/>
    <path d="M146 128 H168" stroke="#A7B1BC" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

/** Thẻ số (bảng thử máy ở cấp "Đoán máy"). */
export function numCardSvg(n, { color = '#FFFFFF' } = {}) {
  return `<svg viewBox="0 0 44 34" aria-hidden="true"><rect x="1.5" y="1.5" width="41" height="31" rx="7" fill="${color}" stroke="${INK}" stroke-width="2"/>`
    + `<text x="22" y="24.5" text-anchor="middle" font-family="Baloo 2, Quicksand, sans-serif" font-weight="800" font-size="19" fill="${INK}">${n}</text></svg>`;
}

/** Hình máy nhỏ cho thẻ trò chơi / cách chơi. */
export const machineIcon = (size = 48, label = '×3') => machineSvg(label).replace('<svg ', `<svg width="${size}" height="${size}" `);
