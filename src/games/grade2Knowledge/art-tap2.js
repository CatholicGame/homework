/**
 * Hình vẽ nhỏ (SVG, nét đậm kiểu của app) dùng chung cho 📘 Kiến thức (demos-tap2.js) và 🔎 Khám phá
 * Toán 2 Tập Hai (grade2Explore/tap2). Mỗi hình vẽ trong hộp 40 × 40.
 */

export const INK = '#3F3A40';
const S = `stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`;

const star = (cx, cy, R, r) => {
  const p = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r : R;
    p.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return p.join(' ');
};

export const ART = {
  cam: `<circle cx="20" cy="22" r="14" fill="#FB923C" ${S}/><path d="M20 8q2-5 7-5q-1 5-7 5z" fill="#4ADE80" ${S}/><circle cx="15" cy="18" r="2.5" fill="#FED7AA"/>`,
  tao: `<path d="M20 12q-6-4-11 0q-6 6-2 16q4 8 9 7q2-1 4-1q2 0 4 1q5 1 9-7q4-10-2-16q-5-4-11 0z" fill="#EF4444" ${S}/><path d="M20 12q0-5 3-8" fill="none" ${S}/><path d="M22 8q5-3 8 0q-4 3-8 0z" fill="#4ADE80" ${S}/>`,
  sao: `<polygon points="${star(20, 21, 17, 7.5)}" fill="#FACC15" ${S}/>`,
  tat: `<path d="M12 4h13v17l7 6q3 4-1 8q-3 3-8 0l-9-7q-2-2-2-5z" fill="#60A5FA" ${S}/><path d="M12 9h13" fill="none" ${S}/><path d="M23 30q3 3 8 0" fill="none" stroke="#fff" stroke-width="2"/>`,
  hoa: `${[0, 72, 144, 216, 288].map(a => `<circle cx="${(20 + 9 * Math.cos((a - 90) * Math.PI / 180)).toFixed(1)}" cy="${(20 + 9 * Math.sin((a - 90) * Math.PI / 180)).toFixed(1)}" r="7" fill="#F472B6" ${S}/>`).join('')}<circle cx="20" cy="20" r="5.5" fill="#FDE047" ${S}/>`,
  banh: `<path d="M8 20h24l-3 15H11z" fill="#FDBA74" ${S}/><path d="M7 20q0-12 13-12q13 0 13 12z" fill="#F9A8D4" ${S}/><circle cx="20" cy="6" r="3" fill="#EF4444" ${S}/>`,
  ban: `<circle cx="20" cy="21" r="14" fill="#FDE68A" ${S}/><path d="M6 18q2-12 14-12q12 0 14 12q-6-5-14-5q-8 0-14 5z" fill="#7C4A2D" ${S}/><circle cx="15" cy="22" r="1.8" fill="${INK}"/><circle cx="25" cy="22" r="1.8" fill="${INK}"/><path d="M15 28q5 4 10 0" fill="none" ${S}/>`,
  ca: `<path d="M5 20q10-12 24 0q-14 12-24 0z" fill="#38BDF8" ${S}/><path d="M29 20l8-7v14z" fill="#38BDF8" ${S}/><circle cx="12" cy="18" r="1.8" fill="${INK}"/>`,
  chuoi: `<path d="M8 10q-2 18 14 24q8 2 12-2q-14-2-20-22z" fill="#FDE047" ${S}/><path d="M8 10l-1-4" fill="none" ${S}/>`,
  le: `<path d="M20 8q-5 0-5 8q0 4-4 9q-3 9 9 11q12-2 9-11q-4-5-4-9q0-8-5-8z" fill="#A3E635" ${S}/><path d="M20 8v-5" fill="none" ${S}/>`,
  // khối trụ
  lon: `<path d="M10 9v24q10 6 20 0V9" fill="#F87171" ${S}/><ellipse cx="20" cy="9" rx="10" ry="4" fill="#E2E8F0" ${S}/><path d="M10 17q10 5 20 0M10 26q10 5 20 0" fill="none" stroke="#fff" stroke-width="2"/>`,
  trong: `<path d="M5 13v15q15 9 30 0V13" fill="#F59E0B" ${S}/><ellipse cx="20" cy="13" rx="15" ry="6" fill="#FEF3C7" ${S}/><path d="M8 18l6 13M20 20v14M32 18l-6 13" fill="none" stroke="#fff" stroke-width="2"/>`,
  nen: `<path d="M14 14v21q6 4 12 0V14" fill="#C4B5FD" ${S}/><ellipse cx="20" cy="14" rx="6" ry="2.5" fill="#EDE9FE" ${S}/><path d="M20 12v-4" ${S}/><path d="M20 2q4 4 0 6q-4-2 0-6z" fill="#FB923C" ${S}/>`,
  // khối cầu
  bong: `<circle cx="20" cy="20" r="15" fill="#fff" ${S}/><polygon points="${star(20, 20, 6, 6)}" fill="${INK}"/><path d="M20 14V5M14 18l-8-3M26 18l8-3M16 25l-5 7M24 25l5 7" fill="none" ${S}/>`,
  dia: `<circle cx="20" cy="19" r="14" fill="#60A5FA" ${S}/><path d="M11 12q5 2 4 7q-2 4 2 7M24 7q-2 5 3 7q5 1 5 6" fill="#4ADE80" stroke="${INK}" stroke-width="1.6"/><path d="M12 36h16M20 33v3" ${S}/>`,
  bi: `<circle cx="20" cy="20" r="11" fill="#A78BFA" ${S}/><circle cx="16" cy="16" r="3" fill="#fff" opacity="0.8"/>`,
  // khối hộp (để phân biệt)
  hop: `<path d="M6 14l14-6l14 6v16l-14 6l-14-6z" fill="#FDE68A" ${S}/><path d="M6 14l14 6l14-6M20 20v16" fill="none" ${S}/>`,
};

export const LABEL = {
  cam: 'quả cam', tao: 'quả táo', sao: 'ngôi sao', tat: 'chiếc tất', hoa: 'bông hoa', banh: 'cái bánh', ban: 'bạn', ca: 'con cá',
  chuoi: 'quả chuối', le: 'quả lê', lon: 'lon nước', trong: 'cái trống', nen: 'cây nến', bong: 'quả bóng', dia: 'quả địa cầu', bi: 'viên bi', hop: 'hộp quà',
};

/** Hình trong svg lớn: đặt hộp 40 × 40 ở (x, y), cạnh s. */
export const artAt = (kind, x, y, s, extra = '') => `<g transform="translate(${+x.toFixed(1)} ${+y.toFixed(1)}) scale(${+(s / 40).toFixed(3)})"${extra}>${ART[kind] || ''}</g>`;
/** Hình đứng riêng (thẻ html). */
export const artSvg = (kind, cls = '') => `<svg class="${cls}" viewBox="0 0 40 40" aria-hidden="true">${ART[kind] || ''}</svg>`;

/** Tờ tiền (tự vẽ, không phải hình tiền thật): màu theo mệnh giá. */
export const NOTE = {
  100: { bg: '#D6B98C', ink: '#5B3A12' }, 200: { bg: '#E9A97A', ink: '#7C2D12' },
  500: { bg: '#8FD3C8', ink: '#134E4A' }, 1000: { bg: '#B5D99C', ink: '#365314' },
};
export const fmtVN = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
/** Tờ tiền trong hộp 80 × 40. */
export function noteBody(v) {
  const c = NOTE[v] || NOTE[100];
  return `<rect x="2" y="2" width="76" height="36" rx="5" fill="${c.bg}" ${S}/><rect x="7" y="7" width="66" height="26" rx="3" fill="none" stroke="${c.ink}" stroke-width="1.2" opacity="0.5"/>`
    + `<circle cx="18" cy="20" r="8" fill="#fff" opacity="0.55"/><text x="50" y="18" font-size="${v >= 1000 ? 14 : 16}" font-weight="800" text-anchor="middle" dominant-baseline="middle" fill="${c.ink}" font-family="Quicksand, sans-serif">${fmtVN(v)}</text>`
    + `<text x="50" y="30" font-size="7.5" font-weight="800" text-anchor="middle" fill="${c.ink}" font-family="Quicksand, sans-serif">ĐỒNG</text>`;
}
export const noteSvg = (v, cls = '') => `<svg class="${cls}" viewBox="0 0 80 40" aria-hidden="true">${noteBody(v)}</svg>`;

/** Màu bóng (chắc chắn / có thể / không thể). */
export const BALL = { xanh: '#3B82F6', đỏ: '#EF4444', vàng: '#FACC15' };
export const ballBody = (color) => `<circle cx="20" cy="20" r="15" fill="${BALL[color] || color}" ${S}/><circle cx="14" cy="14" r="4" fill="#fff" opacity="0.6"/>`;
