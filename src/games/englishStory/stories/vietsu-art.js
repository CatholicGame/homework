/**
 * Cảnh dùng chung cho truyện bộ 📜 Nhân vật lịch sử Việt Nam (en121…): nhà sàn, núi đá vôi, tre, ruộng lúa, trống đồng,
 * cờ, thuyền gỗ, mũ vua. Cùng nét vẽ với kit.js (viền nâu L). Tên file không theo mẫu enNNN.js nên index.js không coi là truyện.
 * Hàm nào có chuyển động thì nhận tiền tố class p (vd. 'e121') để CSS của từng truyện tự vẽ.
 */
import { L } from '../kit.js';

/** Nhà sàn mái tranh (gốc = giữa chân cột trên mặt đất), rộng ≈ 200·s. */
export const stilt = (x, floor, s = 1, wall = '#D6A35C', roof = '#C08A3E') => `<g transform="translate(${x} ${floor}) scale(${s})">
  ${[-84, -42, 0, 42, 84].map((dx) => `<rect x="${dx - 4}" y="-62" width="8" height="62" fill="#92400E" stroke="${L}" stroke-width="0.9"/>`).join('')}
  <rect x="-96" y="-68" width="192" height="9" fill="#A16207" stroke="${L}"/>
  <rect x="-86" y="-128" width="172" height="60" fill="${wall}" stroke="${L}"/>
  ${Array.from({ length: 10 }, (_, i) => `<path d="M${-80 + i * 17} -126 V-70" stroke="#B9824F" stroke-width="1" opacity="0.6"/>`).join('')}
  <path d="M-86 -100 H86" stroke="#B9824F" stroke-width="1.2" opacity="0.6"/>
  <rect x="-18" y="-118" width="36" height="50" fill="#5B3A1E" stroke="${L}"/>
  <path d="M-112 -122 Q-104 -150 -70 -176 L-40 -196 H40 L70 -176 Q104 -150 112 -122 Q0 -112 -112 -122Z" fill="${roof}" stroke="${L}" stroke-width="1.2"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${-92 + i * 23} -124 L${-60 + i * 15} -186" stroke="#A16207" stroke-width="1" opacity="0.55"/>`).join('')}
  <path d="M-40 -196 Q-50 -210 -58 -206 M40 -196 Q50 -210 58 -206" stroke="${L}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <g transform="translate(108 0)"><path d="M-20 -66 L4 0 M-10 -66 L14 0" stroke="#92400E" stroke-width="3"/>${[1, 2, 3, 4].map((i) => `<path d="M${-20 + i * 4.8} ${-66 + i * 13} h10" stroke="#92400E" stroke-width="2.4"/>`).join('')}</g></g>`;

/** Dãy núi đá vôi xa (đỉnh nhọn, nét mờ), từ x tới x+w, chân ở y. */
export const karst = (x, w, y, c = '#86A79A', c2 = '#A7C4B5') => {
  const n = Math.max(2, Math.round(w / 90));
  const peaks = Array.from({ length: n }, (_, i) => {
    const cx = x + (i + 0.5) * (w / n), h = 70 + ((i * 37) % 50), b = w / n * 0.62;
    return `<path d="M${cx - b} ${y} Q${cx - b * 0.7} ${y - h * 0.9} ${cx - b * 0.25} ${y - h} Q${cx} ${y - h * 1.08} ${cx + b * 0.2} ${y - h * 0.94} Q${cx + b * 0.75} ${y - h * 0.7} ${cx + b} ${y}Z" fill="${i % 2 ? c : c2}" stroke="${L}" stroke-width="0.7" opacity="0.95"/>`;
  });
  return peaks.join('');
};

/** Bụi tre (gốc ở mặt đất). */
export const bamboo = (x, floor, s = 1, p = '') => `<g transform="translate(${x} ${floor}) scale(${s})">
  ${[[-12, -150, -6], [0, -170, 0], [12, -140, 6], [-22, -120, -12], [22, -126, 12]].map(([dx, h, r]) => `<g transform="rotate(${r} ${dx} 0)"><path d="M${dx} 0 V${h}" stroke="#65A30D" stroke-width="5" stroke-linecap="round"/>${[0.25, 0.5, 0.75].map((t) => `<path d="M${dx - 3} ${h * t} h6" stroke="#3F6212" stroke-width="1.4"/>`).join('')}</g>`).join('')}
  <g class="${p ? `${p}-leaf` : 'ek-sway'}">${[[-40, -150], [-10, -178], [24, -160], [40, -128], [-36, -112], [10, -132]].map(([lx, ly], i) => `<ellipse cx="${lx}" cy="${ly}" rx="22" ry="9" fill="${i % 2 ? '#4ADE80' : '#22C55E'}" stroke="${L}" stroke-width="0.7" transform="rotate(${i % 2 ? 20 : -18} ${lx} ${ly})"/>`).join('')}</g></g>`;

/** Ruộng lúa nước (x..x+w, mặt ruộng ở y), các khóm mạ. */
export const paddy = (x, w, y, h = 34) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#7DD3C0" stroke="${L}"/>
  <path d="M${x} ${y + 2} H${x + w}" stroke="#A7F3D0" stroke-width="2"/>
  ${Array.from({ length: Math.floor(w / 22) }, (_, i) => `<path d="M${x + 11 + i * 22} ${y + 8 + (i % 2) * 12} l-4 -10 M${x + 11 + i * 22} ${y + 8 + (i % 2) * 12} l0 -12 M${x + 11 + i * 22} ${y + 8 + (i % 2) * 12} l4 -10" stroke="#16A34A" stroke-width="1.6" stroke-linecap="round"/>`).join('')}`;

/** Trống đồng (gốc = giữa đáy). */
export const drum = (x, floor, s = 1, p = '') => `<g transform="translate(${x} ${floor}) scale(${s})"><g class="${p ? `${p}-drum` : ''}">
  <path d="M-30 0 Q-24 -20 -32 -34 L-30 -46 H30 L32 -34 Q24 -20 30 0Z" fill="#B7791F" stroke="${L}" stroke-width="1.2"/>
  <path d="M-29 -24 H29 M-31 -36 H31" stroke="#8C5A14" stroke-width="1.4"/>
  <ellipse cx="0" cy="-46" rx="34" ry="7" fill="#D69E2E" stroke="${L}" stroke-width="1.2"/>
  <ellipse cx="0" cy="-46" rx="22" ry="4.4" fill="none" stroke="#8C5A14" stroke-width="1"/>
  <path d="M0 -49.5 l1.5 3.5 l-1.5 3.5 l-1.5 -3.5Z M-6 -46 h12" stroke="#8C5A14" stroke-width="0.9" fill="#FDE68A"/></g></g>`;

/** Cờ trên cột (gốc = chân cột). Cờ đuôi nheo, tung bay bằng class p-flag. */
export const flag = (x, floor, h = 120, c = '#DC2626', p = '', trim = '#FACC15') => `<g transform="translate(${x} ${floor})">
  <path d="M0 0 V${-h}" stroke="#78350F" stroke-width="3.4"/><circle cy="${-h - 3}" r="3.4" fill="#FACC15" stroke="${L}" stroke-width="0.7"/>
  <g class="${p ? `${p}-flag` : 'ek-flag'}" style="transform-origin:0px ${-h + 16}px"><path d="M1.5 ${-h + 2} H46 L38 ${-h + 16} L46 ${-h + 30} H1.5Z" fill="${c}" stroke="${L}" stroke-width="0.9"/>
  <path d="M1.5 ${-h + 6} H40" stroke="${trim}" stroke-width="2"/></g></g>`;

/** Thuyền gỗ nhỏ (gốc = giữa mặt nước), mũi sang phải. men = số người chèo (vẽ đơn giản). */
export const boat = (c = '#92400E', men = 2, khan = '#B91C1C') => `<g>
  <path d="M-56 -8 Q-62 -20 -66 -24 L-50 -14 H48 L66 -26 Q62 -12 54 -2 Q0 6 -50 -2Z" fill="${c}" stroke="${L}" stroke-width="1.2"/>
  <path d="M-50 -10 H50" stroke="#FDE68A" stroke-width="1.6" opacity="0.7"/>
  ${Array.from({ length: men }, (_, i) => { const dx = -26 + i * (52 / Math.max(1, men - 1)); return `<g transform="translate(${dx} -14)">
    <path d="M-7 0 Q-8 -18 0 -20 Q8 -18 7 0Z" fill="#8B5E3C" stroke="${L}" stroke-width="0.9"/>
    <circle cy="-26" r="7" fill="#F5C9A0" stroke="${L}" stroke-width="0.9"/><path d="M-7.5 -28 Q0 -38 7.5 -28 Q0 -31 -7.5 -28Z" fill="${khan}" stroke="${L}" stroke-width="0.7"/>
    <circle cx="3" cy="-26" r="1" fill="#2B1D16"/>
    <path class="oar" d="M2 -12 L-14 18" stroke="#78350F" stroke-width="2.6" stroke-linecap="round"/></g>`; }).join('')}</g>`;

/** Mũ vua / hoàng hậu (gốc = giữa đáy mũ). */
export const crown = (c = '#FACC15') => `<g><path d="M-16 0 L-18 -16 L-9 -9 L0 -22 L9 -9 L18 -16 L16 0Z" fill="${c}" stroke="${L}" stroke-width="1"/>
  <rect x="-17" y="-4" width="34" height="5" rx="2" fill="#B45309" stroke="${L}" stroke-width="0.8"/>
  <circle cy="-22" r="2.6" fill="#DC2626" stroke="${L}" stroke-width="0.6"/><circle cx="-18" cy="-16" r="2" fill="#22C55E"/><circle cx="18" cy="-16" r="2" fill="#22C55E"/></g>`;
