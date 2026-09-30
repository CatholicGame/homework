/**
 * Hình vẽ trò Xưởng đóng gói trăm – chục (lớp 2, Bài 48–53, 59–62): khối lẻ (1 ô vuông), thanh chục (cột 10 ô vuông),
 * tấm trăm (tấm 100 ô vuông) — vẽ phẳng như hình trong Vở BT; máy đóng gói. Nét INK như bộ vẽ lại của vở bài tập.
 * Mọi hình là <svg> co giãn theo CSS (cỡ ô --c trong styles.js): khối 1 × 1 ô, thanh 1 × 10 ô, tấm 10 × 10 ô.
 */

const INK = '#3F3A40';
export const COLOR = { h: '#9BD3F0', t: '#7BCB8B', u: '#FFD166' };
export const PIECE_NAME = { h: 'tấm trăm', t: 'thanh chục', u: 'khối lẻ' };

function cells(cols, rows, fill) {
  let d = '';
  for (let i = 1; i < cols; i++) d += `M${i * 10} 0 V${rows * 10} `;
  for (let j = 1; j < rows; j++) d += `M0 ${j * 10} H${cols * 10} `;
  return `<rect x="0.8" y="0.8" width="${cols * 10 - 1.6}" height="${rows * 10 - 1.6}" rx="1.2" fill="${fill}" stroke="${INK}" stroke-width="1.6"/>`
    + (d ? `<path d="${d}" stroke="${INK}" stroke-width="0.8" opacity="0.75"/>` : '')
    + `<rect x="2.2" y="2" width="${cols * 10 - 4.4}" height="2" rx="1" fill="#fff" opacity="0.45"/>`;
}

/** Một miếng hàng: kind 'h' | 't' | 'u'. cls thêm lớp (vd. 'g2x-hide'). */
export function pieceSvg(kind, cls = '') {
  const [c, r] = kind === 'h' ? [10, 10] : kind === 't' ? [1, 10] : [1, 1];
  return `<svg class="g2x-p g2x-${kind}${cls ? ` ${cls}` : ''}" viewBox="0 0 ${c * 10} ${r * 10}" aria-hidden="true">${cells(c, r, COLOR[kind])}</svg>`;
}

/** Hình bay (vừa khít khung, không có lớp cỡ). */
export const flyPiece = (kind) => pieceSvg(kind).replace(/class="[^"]*"/, 'width="100%" height="100%" preserveAspectRatio="none"');

/**
 * Máy đóng gói: phễu nạp [data-in] ở trên, cửa ra [data-out] bên phải, pít-tông ép [data-press], đèn .g2x-light.
 */
export function machineSvg() {
  const st = `stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"`;
  return `<svg class="g2x-mach-svg" viewBox="0 0 160 170" aria-hidden="true">
    <rect x="30" y="150" width="20" height="14" rx="4" fill="#8A929C" ${st}/>
    <rect x="104" y="150" width="20" height="14" rx="4" fill="#8A929C" ${st}/>
    <path data-in d="M36 6 H118 L102 36 H52 Z" fill="#E8ECF0" ${st}/>
    <rect x="14" y="34" width="126" height="118" rx="14" fill="#FDBA74" ${st}/>
    <rect x="22" y="40" width="110" height="7" rx="3.5" fill="#fff" opacity="0.4"/>
    <rect x="30" y="54" width="94" height="58" rx="8" fill="#1E293B" ${st}/>
    <g data-press>
      <rect x="66" y="56" width="22" height="20" rx="2" fill="#A7B1BC" stroke="${INK}" stroke-width="1.6"/>
      <rect x="54" y="74" width="46" height="9" rx="3" fill="#CBD5E1" stroke="${INK}" stroke-width="1.6"/>
    </g>
    <rect x="40" y="100" width="74" height="6" rx="3" fill="#475569"/>
    <circle class="g2x-light" cx="34" cy="130" r="6" fill="#F07167" ${st}/>
    <circle class="g2x-light" cx="52" cy="130" r="6" fill="#FFD166" ${st}/>
    <circle class="g2x-light" cx="70" cy="130" r="6" fill="#7BCB8B" ${st}/>
    <text x="108" y="135" text-anchor="middle" font-family="Baloo 2, Quicksand, sans-serif" font-weight="800" font-size="11" fill="#7C2D12">ĐÓNG GÓI</text>
    <path data-out d="M138 96 H156 L158 124 H138 Z" fill="#E8ECF0" ${st}/>
  </svg>`;
}

/** Biểu tượng xưởng (thẻ trò, cách chơi): tấm trăm, thanh chục, khối lẻ. */
export function factoryIcon(size = 56) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 150 120" aria-hidden="true">
    <g transform="translate(4 14)">${cells(10, 10, COLOR.h)}</g>
    <g transform="translate(112 14)">${cells(1, 10, COLOR.t)}</g>
    <g transform="translate(128 14)">${cells(1, 10, COLOR.t)}</g>
    <g transform="translate(112 100)">${cells(1, 1, COLOR.u)}</g>
    <g transform="translate(128 100)">${cells(1, 1, COLOR.u)}</g>
  </svg>`;
}
