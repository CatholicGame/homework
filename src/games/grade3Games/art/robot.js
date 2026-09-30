/**
 * Hình vẽ trò Rô-bốt biểu thức: rô-bốt (khe nạp thẻ trên đầu, màn hình mặt, cục pin 5 vạch trên ngực,
 * khe ra thẻ dưới pin), thẻ số, thẻ dấu phép tính. Nét và màu theo bộ vẽ lại của vở bài tập (INK, bảng màu app).
 * Chỗ để code tìm: [data-intake] khe nạp thẻ, [data-slot] khe ra thẻ, [data-code] chữ trên màn hình mặt,
 * [data-cell] 5 vạch pin, .g3o-ant đèn ăng-ten. Nét mặt đổi bằng thuộc tính data-mood trên <svg>
 * (idle | work | happy | sad — CSS trong styles.js chỉ hiện nhóm mắt tương ứng).
 */

const INK = '#3F3A40';

export const ROBOT_W = 200, ROBOT_H = 262;

/** Màu thẻ dấu phép tính (cùng màu trên băng chuyền, khay dấu và dòng ghi các bước). */
export const OP_COLOR = { '+': '#34D399', '−': '#60A5FA', '×': '#FB923C', ':': '#F472B6' };

export function robotSvg() {
  const st = `stroke="${INK}" stroke-width="3" stroke-linejoin="round"`;
  const cells = Array.from({ length: 5 }, (_, i) =>
    `<rect data-cell x="${67 + i * 13}" y="151" width="10" height="22" rx="2.5" fill="#E2E8F0"/>`).join('');
  return `<svg class="g3o-robot" data-mood="idle" viewBox="0 0 ${ROBOT_W} ${ROBOT_H}" aria-hidden="true">
    <!-- ăng-ten -->
    <path d="M100 38 V16" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <circle class="g3o-ant" cx="100" cy="12" r="8" fill="#F07167" ${st}/>
    <circle cx="97" cy="9" r="2.4" fill="#fff" opacity="0.8"/>
    <!-- tai -->
    <rect x="24" y="62" width="18" height="36" rx="6" fill="#8A929C" ${st}/>
    <rect x="158" y="62" width="18" height="36" rx="6" fill="#8A929C" ${st}/>
    <!-- đầu -->
    <rect x="38" y="36" width="124" height="84" rx="24" fill="#9BD3F0" ${st}/>
    <rect x="50" y="42" width="100" height="7" rx="3.5" fill="#fff" opacity="0.45"/>
    <!-- khe nạp thẻ trên đỉnh đầu -->
    <rect data-intake x="70" y="30" width="60" height="11" rx="5.5" fill="#1E293B" ${st}/>
    <!-- màn hình mặt -->
    <rect x="52" y="54" width="96" height="54" rx="13" fill="#1E293B" ${st}/>
    <g class="g3o-eyes g3o-eyes-idle">
      <rect x="70" y="66" width="16" height="20" rx="7" fill="#86EFAC"/>
      <rect x="114" y="66" width="16" height="20" rx="7" fill="#86EFAC"/>
      <path d="M88 96 Q100 102 112 96" stroke="#86EFAC" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    </g>
    <g class="g3o-eyes g3o-eyes-work">
      <circle class="g3o-dot" cx="80" cy="81" r="5" fill="#FDE68A"/>
      <circle class="g3o-dot" cx="100" cy="81" r="5" fill="#FDE68A"/>
      <circle class="g3o-dot" cx="120" cy="81" r="5" fill="#FDE68A"/>
    </g>
    <g class="g3o-eyes g3o-eyes-happy">
      <path d="M68 80 Q78 66 88 80 M112 80 Q122 66 132 80" stroke="#86EFAC" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M84 92 Q100 106 116 92" stroke="#86EFAC" stroke-width="4" fill="none" stroke-linecap="round"/>
    </g>
    <g class="g3o-eyes g3o-eyes-sad">
      <path d="M68 70 L88 76 M132 70 L112 76" stroke="#FCA5A5" stroke-width="4" stroke-linecap="round"/>
      <rect x="72" y="78" width="12" height="12" rx="5" fill="#FCA5A5"/>
      <rect x="116" y="78" width="12" height="12" rx="5" fill="#FCA5A5"/>
      <path d="M88 101 Q100 93 112 101" stroke="#FCA5A5" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    </g>
    <g class="g3o-eyes g3o-eyes-code">
      <text data-code x="100" y="91" text-anchor="middle" font-family="Baloo 2, Quicksand, sans-serif" font-weight="800" font-size="30" fill="#86EFAC"></text>
    </g>
    <!-- cổ -->
    <rect x="86" y="118" width="28" height="14" rx="4" fill="#8A929C" ${st}/>
    <!-- tay -->
    <g class="g3o-arm g3o-arm-l" style="transform-origin:40px 146px">
      <path d="M40 146 Q18 160 16 190" stroke="${INK}" stroke-width="11" fill="none" stroke-linecap="round"/>
      <path d="M40 146 Q18 160 16 190" stroke="#8A929C" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M6 196 Q16 184 26 196" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>
    </g>
    <g class="g3o-arm g3o-arm-r" style="transform-origin:160px 146px">
      <path d="M160 146 Q182 160 184 190" stroke="${INK}" stroke-width="11" fill="none" stroke-linecap="round"/>
      <path d="M160 146 Q182 160 184 190" stroke="#8A929C" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M174 196 Q184 184 194 196" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>
    </g>
    <!-- chân -->
    <rect x="62" y="220" width="26" height="24" rx="6" fill="#8A929C" ${st}/>
    <rect x="112" y="220" width="26" height="24" rx="6" fill="#8A929C" ${st}/>
    <rect x="52" y="240" width="44" height="16" rx="8" fill="#6CCFB5" ${st}/>
    <rect x="104" y="240" width="44" height="16" rx="8" fill="#6CCFB5" ${st}/>
    <!-- thân -->
    <rect x="36" y="128" width="128" height="96" rx="20" fill="#6CCFB5" ${st}/>
    <rect x="48" y="134" width="104" height="7" rx="3.5" fill="#fff" opacity="0.4"/>
    <!-- pin năng lượng -->
    <rect x="62" y="146" width="72" height="32" rx="7" fill="#fff" ${st}/>
    <rect x="134" y="155" width="7" height="14" rx="2" fill="${INK}"/>
    ${cells}
    <text x="100" y="192" text-anchor="middle" font-family="Baloo 2, Quicksand, sans-serif" font-weight="800" font-size="11" fill="#115E59">NĂNG LƯỢNG</text>
    <!-- khe ra thẻ -->
    <rect data-slot x="70" y="200" width="60" height="11" rx="5.5" fill="#1E293B" ${st}/>
  </svg>`;
}

/** Rô-bốt nhỏ cho thẻ trò chơi / cách chơi. */
export const robotIcon = (size = 48) => robotSvg().replace('<svg class="g3o-robot"', `<svg class="g3o-robot g3o-icon" width="${size}" height="${size}"`);

/** Thẻ số (bay vào / ra rô-bốt). */
export function numCard(v, { color = '#FFFFFF' } = {}) {
  const w = 22 + String(v).length * 13;
  return `<svg viewBox="0 0 ${w} 40" aria-hidden="true"><rect x="1.5" y="1.5" width="${w - 3}" height="37" rx="8" fill="${color}" stroke="${INK}" stroke-width="2.5"/>`
    + `<text x="${w / 2}" y="28.5" text-anchor="middle" font-family="Baloo 2, Quicksand, sans-serif" font-weight="800" font-size="24" fill="${INK}">${v}</text></svg>`;
}

/** Thẻ dấu phép tính (tròn, màu theo dấu). */
export function opCard(op) {
  return `<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="${OP_COLOR[op]}" stroke="${INK}" stroke-width="2.5"/>`
    + `<text x="20" y="28.5" text-anchor="middle" font-family="Baloo 2, Quicksand, sans-serif" font-weight="800" font-size="26" fill="#fff">${op}</text></svg>`;
}
