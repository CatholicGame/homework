/**
 * Hình vẽ trò ⏰ Đồng hồ hẹn giờ & Tờ lịch (lớp 2): đồng hồ báo thức kim (chép kiểu mặt số clock() của
 * scripts/redraw/kit_g3.py: vành xanh, 60 vạch, 12 số, kim ngắn đen, kim dài đỏ), cửa sổ bầu trời theo buổi,
 * biểu tượng. Nét và màu theo bộ vẽ lại của vở (INK #3F3A40, màu phẳng).
 *
 * Kim dừng trước vòng số: kim dài ≤ bán kính vòng số − 0,6 × cỡ chữ, kim ngắn ≈ 65% kim dài (không che số nào).
 */

export const INK = '#3F3A40';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const rad = (d) => (d * Math.PI) / 180;
const FONT = "'Baloo 2', Quicksand, sans-serif";

// Khung hình đồng hồ báo thức và tâm mặt số.
export const CLOCK = { w: 300, h: 318, cx: 150, cy: 176, R: 118 };
const FACE = CLOCK.R * 0.86;
const NUM_R = 76, NUM_FS = 24;
export const MIN_LEN = NUM_R - NUM_FS * 0.6 - 2; // ≈ 56
export const HOUR_LEN = MIN_LEN * 0.65;

const hand = (id, len, w, color) => `
  <g data-hand="${id}" class="g2c-hand">
    <line x1="${CLOCK.cx}" y1="${CLOCK.cy + len * 0.16}" x2="${CLOCK.cx}" y2="${f1(CLOCK.cy - len)}" stroke="${INK}" stroke-width="${w + 3}" stroke-linecap="round"/>
    <line x1="${CLOCK.cx}" y1="${CLOCK.cy + len * 0.16}" x2="${CLOCK.cx}" y2="${f1(CLOCK.cy - len)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
    <line data-grab="${id}" x1="${CLOCK.cx}" y1="${CLOCK.cy}" x2="${CLOCK.cx}" y2="${f1(CLOCK.cy - len - 10)}" stroke="transparent" stroke-width="30" stroke-linecap="round"/>
  </g>`;

/** Kim mờ chỉ giờ đúng (hiện khi bé đặt sai). */
export const ghostHands = () => `
  <g class="g2c-ghost" data-ghost>
    <g data-ghost-hand="h"><line x1="${CLOCK.cx}" y1="${CLOCK.cy}" x2="${CLOCK.cx}" y2="${f1(CLOCK.cy - HOUR_LEN)}" stroke="#16A34A" stroke-width="7" stroke-linecap="round" stroke-dasharray="3 7"/></g>
    <g data-ghost-hand="m"><line x1="${CLOCK.cx}" y1="${CLOCK.cy}" x2="${CLOCK.cx}" y2="${f1(CLOCK.cy - MIN_LEN)}" stroke="#16A34A" stroke-width="5" stroke-linecap="round" stroke-dasharray="3 6"/></g>
  </g>`;

/** Đồng hồ báo thức: chuông, búa gõ, chân, mặt số; hai kim là nhóm [data-hand="h"|"m"] xoay quanh tâm. */
export function alarmClockSvg({ rim = '#6FB7EA', face = '#F4FBFF' } = {}) {
  const { cx, cy, R, w, h } = CLOCK;
  const bell = (sx) => {
    const bx = cx + sx * R * 0.62, by = cy - R * 0.9;
    return `<g transform="rotate(${sx * 32} ${f1(bx)} ${f1(by)})">
      <path d="M${f1(bx - 34)} ${f1(by + 14)} Q${f1(bx - 34)} ${f1(by - 30)} ${f1(bx)} ${f1(by - 30)} Q${f1(bx + 34)} ${f1(by - 30)} ${f1(bx + 34)} ${f1(by + 14)} Z" fill="#F7C548" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <rect x="${f1(bx - 6)}" y="${f1(by - 40)}" width="12" height="11" rx="4" fill="#F7C548" stroke="${INK}" stroke-width="2.6"/>
    </g>`;
  };
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = rad(i * 6), r1 = i % 5 ? FACE - 7 : FACE - 13, r2 = FACE - 2;
    return `<line x1="${f1(cx + r1 * Math.sin(a))}" y1="${f1(cy - r1 * Math.cos(a))}" x2="${f1(cx + r2 * Math.sin(a))}" y2="${f1(cy - r2 * Math.cos(a))}" stroke="${INK}" stroke-width="${i % 5 ? 1.2 : 2.6}" stroke-linecap="round"/>`;
  }).join('');
  const nums = Array.from({ length: 12 }, (_, i) => {
    const n = i + 1, a = rad(n * 30);
    return `<text x="${f1(cx + NUM_R * Math.sin(a))}" y="${f1(cy - NUM_R * Math.cos(a) + NUM_FS * 0.36)}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="${NUM_FS}" fill="${INK}">${n}</text>`;
  }).join('');
  return `<svg class="g2c-clock-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <g class="g2c-ringer">
      <path d="M${cx - R * 0.55} ${cy + R * 0.78} L${cx - R * 0.78} ${cy + R * 1.1}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
      <path d="M${cx + R * 0.55} ${cy + R * 0.78} L${cx + R * 0.78} ${cy + R * 1.1}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
      ${bell(-1)}${bell(1)}
      <g class="g2c-hammer"><rect x="${cx - 4}" y="${cy - R - 26}" width="8" height="24" fill="${INK}"/><rect x="${cx - 16}" y="${cy - R - 34}" width="32" height="10" rx="5" fill="#94A3B8" stroke="${INK}" stroke-width="2.4"/></g>
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="${rim}" stroke="${INK}" stroke-width="3"/>
      <circle cx="${cx}" cy="${cy}" r="${FACE}" fill="${face}" stroke="${INK}" stroke-width="2.4"/>
      ${ticks}${nums}
      ${ghostHands()}
      ${hand('h', HOUR_LEN, 9, INK)}
      ${hand('m', MIN_LEN, 6, '#E5484D')}
      <circle cx="${cx}" cy="${cy}" r="7" fill="${INK}"/><circle cx="${cx}" cy="${cy}" r="2.6" fill="#F7C548"/>
    </g>
  </svg>`;
}

/**
 * Cửa sổ nhìn ra trời: 4 lớp cảnh (sáng, trưa, chiều, tối) chồng lên nhau, lớp đang chọn hiện rõ
 * (đổi thuộc tính data-period trên svg: CSS mờ dần lớp cũ, mặt trời / mặt trăng trượt tới chỗ mới).
 */
export function skyWindowSvg(period = '') {
  const W = 220, H = 180;
  const layer = (id, sky1, sky2, extra) => `<g class="g2c-sky g2c-sky-${id}">
      <defs><linearGradient id="g2cSky-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky1}"/><stop offset="1" stop-color="${sky2}"/></linearGradient></defs>
      <rect x="14" y="14" width="${W - 28}" height="${H - 28}" fill="url(#g2cSky-${id})"/>${extra}</g>`;
  const cloud = (x, y, s, c = '#fff') => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><ellipse cx="0" cy="0" rx="18" ry="10"/><ellipse cx="14" cy="-6" rx="13" ry="10"/><ellipse cx="26" cy="1" rx="13" ry="8"/></g>`;
  const sun = (x, y, c = '#FDE047') => `<g><circle cx="${x}" cy="${y}" r="17" fill="${c}" stroke="#F59E0B" stroke-width="2.5"/>${Array.from({ length: 8 }, (_, i) => {
    const a = rad(i * 45);
    return `<line x1="${f1(x + 22 * Math.cos(a))}" y1="${f1(y + 22 * Math.sin(a))}" x2="${f1(x + 29 * Math.cos(a))}" y2="${f1(y + 29 * Math.sin(a))}" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>`;
  }).join('')}</g>`;
  const stars = [[40, 36], [90, 28], [150, 44], [178, 30], [120, 64], [60, 70]].map(([x, y]) => `<path d="M${x} ${y - 4} L${x + 1.3} ${y - 1.3} L${x + 4} ${y} L${x + 1.3} ${y + 1.3} L${x} ${y + 4} L${x - 1.3} ${y + 1.3} L${x - 4} ${y} L${x - 1.3} ${y - 1.3} Z" fill="#FEF9C3"/>`).join('');
  const town = (roof, wall, win) => `<path d="M14 ${H - 14} L14 128 Q60 108 110 124 Q160 104 ${W - 14} 122 L${W - 14} ${H - 14} Z" fill="${roof}"/>
      <rect x="36" y="118" width="40" height="34" fill="${wall}" stroke="${INK}" stroke-width="1.6"/><path d="M30 120 L56 100 L82 120 Z" fill="#E5484D" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
      <rect x="48" y="128" width="14" height="12" fill="${win}" stroke="${INK}" stroke-width="1.2"/>
      <rect x="140" y="112" width="46" height="40" fill="${wall}" stroke="${INK}" stroke-width="1.6"/><path d="M134 114 L163 92 L192 114 Z" fill="#6FB7EA" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
      <rect x="152" y="122" width="12" height="11" fill="${win}" stroke="${INK}" stroke-width="1.2"/><rect x="168" y="122" width="12" height="11" fill="${win}" stroke="${INK}" stroke-width="1.2"/>`;
  return `<svg class="g2c-window" viewBox="0 0 ${W} ${H}" data-period="${period}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <rect x="4" y="4" width="${W - 8}" height="${H - 8}" rx="12" fill="#C68B59" stroke="${INK}" stroke-width="3"/>
    <rect x="14" y="14" width="${W - 28}" height="${H - 28}" fill="#E2E8F0"/>
    ${layer('sang', '#BAE6FD', '#FDE68A', `${sun(52, 100, '#FDBA74')}${cloud(130, 50, 0.9)}${town('#86C77A', '#FFF7ED', '#FEF3C7')}`)}
    ${layer('trua', '#38BDF8', '#BAE6FD', `${sun(110, 40)}${cloud(40, 60, 0.8)}${cloud(160, 70, 0.7)}${town('#6DBB62', '#FFFBEB', '#E0F2FE')}`)}
    ${layer('chieu', '#FDBA74', '#FECDD3', `${sun(170, 96, '#FB923C')}${cloud(50, 50, 0.8, '#FFE4E6')}${town('#7AA96E', '#FDE7D3', '#FDE68A')}`)}
    <g class="g2c-sky-none"><rect x="14" y="14" width="${W - 28}" height="${H - 28}" fill="#FEF3C7"/>
      <path d="M14 14 H${W / 2 - 4} Q${W / 2 - 26} ${H / 2} ${W / 2 - 8} ${H - 14} H14 Z" fill="#F9A8D4" stroke="${INK}" stroke-width="2"/>
      <path d="M${W - 14} 14 H${W / 2 + 4} Q${W / 2 + 26} ${H / 2} ${W / 2 + 8} ${H - 14} H${W - 14} Z" fill="#F9A8D4" stroke="${INK}" stroke-width="2"/>
      <circle cx="${W / 2}" cy="${H / 2}" r="24" fill="#FB923C" stroke="#C2410C" stroke-width="3"/>
      <text x="${W / 2}" y="${H / 2 + 12}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="34" fill="#fff">?</text></g>
    ${layer('toi', '#1E3A8A', '#4C1D95', `${stars}<circle cx="166" cy="48" r="16" fill="#FEF9C3"/><circle cx="174" cy="42" r="14" fill="#2B3A8F"/>${town('#334155', '#475569', '#FDE047')}`)}
    <g class="g2c-mullion"><line x1="${W / 2}" y1="14" x2="${W / 2}" y2="${H - 14}" stroke="#C68B59" stroke-width="7"/>
    <line x1="14" y1="${H / 2}" x2="${W - 14}" y2="${H / 2}" stroke="#C68B59" stroke-width="7"/></g>
    <rect x="14" y="14" width="${W - 28}" height="${H - 28}" fill="none" stroke="${INK}" stroke-width="2"/>
  </svg>`;
}

/** Đồng hồ điện tử (kiểu digital() của kit_g3): hộp xanh ngọc, màn sáng, chữ số "16 : 30". */
export const digitalHtml = (text, cls = '') => `<div class="g2c-digital ${cls}"><span class="g2c-digital-screen">${text}</span></div>`;
export const two = (n) => String(n).padStart(2, '0');
export const digitalText = (H, M) => `${two(H)} : ${two(M)}`;

/** Biểu tượng nhỏ: đồng hồ chỉ giờ h:m (không kéo được) — thẻ trò, dải cách chơi. */
export function clockIcon(size = 56, h = 10, m = 10) {
  const r = 26, c = 32;
  const am = rad(m * 6), ah = rad((h % 12) * 30 + m * 0.5);
  return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
    <circle cx="16" cy="12" r="8" fill="#F7C548" stroke="${INK}" stroke-width="2.2"/><circle cx="48" cy="12" r="8" fill="#F7C548" stroke="${INK}" stroke-width="2.2"/>
    <circle cx="${c}" cy="${c + 2}" r="${r}" fill="#6FB7EA" stroke="${INK}" stroke-width="2.4"/>
    <circle cx="${c}" cy="${c + 2}" r="${r - 5}" fill="#F4FBFF" stroke="${INK}" stroke-width="1.8"/>
    <line x1="${c}" y1="${c + 2}" x2="${f1(c + 10 * Math.sin(ah))}" y2="${f1(c + 2 - 10 * Math.cos(ah))}" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/>
    <line x1="${c}" y1="${c + 2}" x2="${f1(c + 15 * Math.sin(am))}" y2="${f1(c + 2 - 15 * Math.cos(am))}" stroke="#E5484D" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="${c}" cy="${c + 2}" r="2.6" fill="${INK}"/>
  </svg>`;
}

/** Biểu tượng tờ lịch treo tường. */
export function calendarIcon(size = 56, day = 12) {
  return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
    <rect x="8" y="12" width="48" height="46" rx="6" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
    <path d="M8 18 a6 6 0 0 1 6 -6 h36 a6 6 0 0 1 6 6 v8 h-48 Z" fill="#E5484D" stroke="${INK}" stroke-width="2.4"/>
    <rect x="18" y="6" width="5" height="12" rx="2.5" fill="#94A3B8" stroke="${INK}" stroke-width="1.8"/><rect x="41" y="6" width="5" height="12" rx="2.5" fill="#94A3B8" stroke="${INK}" stroke-width="1.8"/>
    <text x="32" y="51" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="22" fill="${INK}">${day}</text>
  </svg>`;
}

/** Hình ghim (bé đi từng ngày trên tờ lịch). */
export const pinHtml = () => `<svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true"><circle cx="20" cy="20" r="15" fill="#FACC15" stroke="${INK}" stroke-width="3"/><circle cx="15" cy="17" r="2.4" fill="${INK}"/><circle cx="25" cy="17" r="2.4" fill="${INK}"/><path d="M14 24 Q20 29 26 24" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`;
