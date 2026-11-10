/**
 * Bộ cảnh dùng chung cho các truyện tiếng Anh (stories/enNNN.js): cùng nét vẽ với bài 21 (viền nâu #6B4A3A, màu tươi, phẳng).
 * Mỗi hàm trả về chuỗi SVG trong toạ độ cảnh (cao 315). Chuyển động nền (mây trôi, cây đung đưa, hơi nước…) dùng class
 * ek-* trong KIT_CSS: truyện ghép `css: KIT_CSS + CSS`.
 */
export const L = '#6B4A3A';

// ── Ngoài trời ────────────────────────────────────────────────────────────
export const sky = (x, w, h = 315, id = 'eksky') => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#60C5F5"/><stop offset="1" stop-color="#DFF3FD"/></linearGradient></defs>
  <rect x="${x}" y="0" width="${w}" height="${h}" fill="url(#${id})"/>`;
export const cloud = (x, y, s = 1, d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="ek-cloud" style="animation-delay:${d}s">
  <ellipse cx="0" cy="0" rx="34" ry="13" fill="#fff"/><ellipse cx="-15" cy="-8" rx="15" ry="11" fill="#fff"/><ellipse cx="12" cy="-11" rx="17" ry="13" fill="#fff"/></g></g>`;
/** Cây tròn (gốc ở mặt đất y). */
export const tree = (x, y, s = 1, fruit = '#EF4444') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="-60" width="12" height="60" rx="3" fill="#A16207" stroke="${L}"/>
  <g class="ek-sway"><circle cx="0" cy="-86" r="34" fill="#22C55E" stroke="${L}"/><circle cx="-22" cy="-70" r="20" fill="#16A34A" stroke="${L}"/><circle cx="22" cy="-72" r="22" fill="#4ADE80" stroke="${L}"/>
  ${fruit ? `<circle cx="-8" cy="-96" r="5" fill="${fruit}"/><circle cx="14" cy="-84" r="5" fill="${fruit}"/>` : ''}</g></g>`;
/** Cây dừa / cau (gốc ở mặt đất y). */
export const palm = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-4 0 Q-10 -60 6 -120 L12 -118 Q0 -60 6 0Z" fill="#B45309" stroke="${L}"/>
  <g class="ek-sway" style="transform-origin:9px -120px">${[-150, -110, -60, -20, 20].map((r) => `<path d="M9 -120 q30 -12 52 8 q-26 -6 -52 -8Z" fill="#22C55E" stroke="${L}" stroke-width="0.9" transform="rotate(${r + 90} 9 -120)"/>`).join('')}</g></g>`;
export const bush = (x, y, s = 1, c = '#22C55E') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 0 Q-34 -22 -14 -24 Q-6 -40 10 -30 Q30 -34 30 -14 Q38 -4 30 0Z" fill="${c}" stroke="${L}"/></g>`;
export const flowerAt = (x, y, c = '#F472B6') => `<g transform="translate(${x} ${y})"><path d="M0 0 V-14" stroke="#16A34A" stroke-width="2"/>${[0, 72, 144, 216, 288].map((r) => `<ellipse cy="-4" rx="2.6" ry="4" fill="${c}" stroke="${L}" stroke-width="0.4" transform="translate(0 -16) rotate(${r})"/>`).join('')}<circle cy="-16" r="2" fill="#FDE047"/></g>`;
/** Mặt trời có mặt cười (vẽ ở gốc (0,0), tự đặt bằng translate). */
export const sun = (r = 26) => `<g class="ek-spin"><circle r="${r}" fill="#FDE047" stroke="#F59E0B" stroke-width="2"/>
  ${Array.from({ length: 10 }, (_, i) => `<path d="M0 ${-r - 6} V${-r - 14}" stroke="#FBBF24" stroke-width="4" stroke-linecap="round" transform="rotate(${i * 36})"/>`).join('')}</g>
  <circle cx="${-r * 0.35}" cy="${-r * 0.12}" r="${r * 0.09}" fill="#78350F"/><circle cx="${r * 0.35}" cy="${-r * 0.12}" r="${r * 0.09}" fill="#78350F"/>
  <path d="M${-r * 0.3} ${r * 0.25} Q0 ${r * 0.5} ${r * 0.3} ${r * 0.25}" stroke="#78350F" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <ellipse cx="${-r * 0.55}" cy="${r * 0.2}" rx="${r * 0.14}" ry="${r * 0.08}" fill="#FB923C" opacity="0.6"/><ellipse cx="${r * 0.55}" cy="${r * 0.2}" rx="${r * 0.14}" ry="${r * 0.08}" fill="#FB923C" opacity="0.6"/>`;
/** Đồi cỏ + đất từ x tới x+w, mặt đất ở floor. */
export const grass = (x, w, floor, c = '#86EFAC') => `<path d="M${x} ${floor - 40} Q${x + w * 0.2} ${floor - 76} ${x + w * 0.42} ${floor - 44} T${x + w * 0.8} ${floor - 50} T${x + w} ${floor - 42} V${floor} H${x}Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <rect x="${x}" y="${floor - 6}" width="${w}" height="${315 - floor + 6}" fill="${c}" stroke="${L}"/>
  ${Array.from({ length: Math.floor(w / 46) }, (_, i) => `<path d="M${x + 20 + i * 46} ${floor + 10} l3 -7 l3 7 M${x + 40 + i * 46} ${floor + 22} l3 -7 l3 7" stroke="#16A34A" stroke-width="1.4" fill="none"/>`).join('')}`;
/** Vỉa hè + đường nhựa. */
export const road = (x, w, floor) => `<rect x="${x}" y="${floor - 10}" width="${w}" height="18" fill="#E5E7EB" stroke="${L}"/>
  <rect x="${x}" y="${floor + 8}" width="${w}" height="${315 - floor - 8}" fill="#64748B"/>
  ${Array.from({ length: Math.floor(w / 62) }, (_, i) => `<rect x="${x + 20 + i * 62}" y="${floor + 18}" width="30" height="4" rx="2" fill="#F8FAFC"/>`).join('')}`;
export const fence = (x, w, floor) => `<g>${Array.from({ length: Math.floor(w / 26) }, (_, i) => `<rect x="${x + i * 26}" y="${floor - 36}" width="8" height="30" rx="3" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/>`).join('')}<rect x="${x - 4}" y="${floor - 28}" width="${w}" height="6" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/></g>`;
/** Ao / hồ / biển (mặt nước từ y tới đáy cảnh), sóng gợn chạy. */
export const water = (x, w, y, c = '#38BDF8') => `<rect x="${x}" y="${y}" width="${w}" height="${315 - y}" fill="${c}" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: Math.floor(w / 40) }, (_, i) => `<path d="M${x + 10 + i * 40} ${y + 12 + (i % 3) * 10} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>`;

// ── Trong nhà ─────────────────────────────────────────────────────────────
/** Tường phòng (x..x+w, trần 0 → sàn floor) + sàn gỗ. */
export const room = (x, w, floor, wall = '#FEF3C7', floorC = '#D9A066') => `<rect x="${x}" y="0" width="${w}" height="${floor}" fill="${wall}"/>
  <rect x="${x}" y="0" width="${w}" height="12" fill="#E9D5B5" stroke="${L}"/>
  <rect x="${x}" y="${floor}" width="${w}" height="${315 - floor}" fill="${floorC}" stroke="${L}"/>
  ${Array.from({ length: Math.ceil(w / 60) }, (_, i) => `<path d="M${x + i * 60} ${floor} V315" stroke="#B9824F" stroke-width="1.2"/>`).join('')}`;
/** Khung cửa thông hai phòng, tâm x. */
export const doorway = (x, floor) => `<rect x="${x - 12}" y="0" width="24" height="98" fill="#E9D5B5" stroke="${L}"/>
  <rect x="${x - 12}" y="98" width="5" height="${floor - 98}" fill="#C08B5C" stroke="${L}" stroke-width="0.8"/><rect x="${x + 7}" y="98" width="5" height="${floor - 98}" fill="#C08B5C" stroke="${L}" stroke-width="0.8"/>`;
/** Cửa sổ nhìn ra trời xanh (x, y góc trên trái). */
export const windowBox = (x, y, w = 110, h = 100) => `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#BAE6FD"/><path d="M${x} ${y + h - 18} Q${x + w * 0.4} ${y + h - 34} ${x + w} ${y + h - 20} V${y + h} H${x}Z" fill="#86EFAC"/>
  <path d="M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}" stroke="#fff" stroke-width="3" opacity="0.8"/>`;
/** Bàn (mặt bàn ở y = top), rộng w, tâm x. Thường vẽ ở fg để che chân người ngồi. */
export const table = (x, top, w, floor, c = '#B45309') => `<rect x="${x - w / 2 + 10}" y="${top + 6}" width="10" height="${floor - top - 6}" fill="#92400E" stroke="${L}"/><rect x="${x + w / 2 - 20}" y="${top + 6}" width="10" height="${floor - top - 6}" fill="#92400E" stroke="${L}"/>
  <rect x="${x - w / 2}" y="${top}" width="${w}" height="9" rx="3" fill="${c}" stroke="${L}" stroke-width="1.2"/>`;
export const shelf = (x, y, w, items = '') => `<rect x="${x}" y="${y}" width="${w}" height="7" rx="2" fill="#A16207" stroke="${L}"/>${items}`;
export const books = (x, y, n = 5) => Array.from({ length: n }, (_, i) => `<rect x="${x + i * 9}" y="${y - 22 + (i % 2) * 4}" width="8" height="${22 - (i % 2) * 4}" rx="1" fill="${['#EF4444', '#3B82F6', '#22C55E', '#F59E0B', '#A855F7'][i % 5]}" stroke="${L}" stroke-width="0.7"/>`).join('');
export const rug = (x, floor, w = 120, c = '#FDA4AF') => `<ellipse cx="${x}" cy="${floor + 4}" rx="${w / 2}" ry="7" fill="${c}" stroke="${L}" stroke-width="0.8"/>`;

// ── Trường ────────────────────────────────────────────────────────────────
export const schoolFront = (x, floor) => `<g transform="translate(${x} 0)">
  <path d="M-110 120 L0 70 L110 120Z" fill="#EF4444" stroke="${L}" stroke-width="1.4"/>
  <rect x="-100" y="120" width="200" height="${floor - 120}" fill="#FDE68A" stroke="${L}" stroke-width="1.4"/>
  ${[-70, -30, 30, 70].map((dx) => `<rect x="${dx - 14}" y="140" width="28" height="30" fill="#BAE6FD" stroke="${L}"/><path d="M${dx} 140 V170 M${dx - 14} 155 H${dx + 14}" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="-24" y="${floor - 76}" width="48" height="76" rx="4" fill="#B45309" stroke="${L}"/><circle cx="14" cy="${floor - 36}" r="3" fill="#FDE68A"/>
  <rect x="-46" y="94" width="92" height="22" rx="4" fill="#fff" stroke="${L}"/><text x="0" y="111" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#1D4ED8">SCHOOL</text>
  <path d="M90 120 V40" stroke="#78716C" stroke-width="3"/><g class="ek-flag" style="transform-origin:90px 51px"><rect x="90" y="40" width="34" height="22" fill="#DA251D"/><path d="M107 44 l2.4 6.6 h7 l-5.6 4.2 l2.2 6.8 l-6 -4.2 l-6 4.2 l2.2 -6.8 l-5.6 -4.2 h7Z" fill="#FFFF00" transform="scale(0.7) translate(46 18)"/></g></g>`;
/** Bảng đen (x, y góc trên trái); text = chữ phấn (tiếng Anh). */
export const board = (x, y, w = 200, h = 96, text = '') => `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="4" fill="#A16207" stroke="${L}"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#166534"/>${text ? `<text x="${x + w / 2}" y="${y + h / 2 + 8}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="22" fill="#F8FAFC">${text}</text>` : ''}`;
/** Bàn học sinh (fg). */
export const desk = (x, floor, c = '#F59E0B') => `<rect x="${x - 34}" y="${floor - 56}" width="68" height="8" rx="2" fill="${c}" stroke="${L}"/><rect x="${x - 30}" y="${floor - 48}" width="6" height="48" fill="#78716C" stroke="${L}" stroke-width="0.7"/><rect x="${x + 24}" y="${floor - 48}" width="6" height="48" fill="#78716C" stroke="${L}" stroke-width="0.7"/>`;

// ── Đồ vật hay dùng (gốc ở giữa, dùng cho st.fly hoặc đặt bằng translate) ─────────────────
export const BAG = (c = '#F59E0B') => `<rect x="-11" y="-14" width="22" height="28" rx="5" fill="${c}" stroke="${L}" stroke-width="1"/><rect x="-8" y="-2" width="16" height="10" rx="2" fill="none" stroke="${L}" stroke-width="0.9"/><path d="M-6 -14 Q0 -24 6 -14" stroke="${L}" stroke-width="1.4" fill="none"/>`;
export const BALL = (c = '#EF4444') => `<circle r="9" fill="${c}" stroke="${L}"/><path d="M-9 0 Q0 -5 9 0 M0 -9 Q-4 0 0 9" stroke="#fff" stroke-width="1.6" fill="none"/>`;
export const BOWL = `<path d="M-14 -4 H14 Q13 9 0 10 Q-13 9 -14 -4Z" fill="#fff" stroke="#3B82F6" stroke-width="1.4"/><path d="M-12 -4 Q0 -10 12 -4Z" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/>
  <path d="M-8 -6 q4 -3 8 0 q4 -3 8 0" stroke="#F59E0B" stroke-width="1" fill="none"/><circle cx="-5" cy="-6" r="2.2" fill="#22C55E"/><ellipse cx="5" cy="-6" rx="3" ry="1.6" fill="#F87171"/>`;
export const APPLE = `<circle r="8" fill="#EF4444" stroke="${L}"/><path d="M0 -8 v-4" stroke="#78350F" stroke-width="1.6"/><ellipse cx="3.4" cy="-10" rx="3.4" ry="1.6" fill="#22C55E"/>`;
export const BANANA = `<path d="M-12 -4 Q0 12 14 -6 Q2 4 -10 -8Z" fill="#FDE047" stroke="${L}"/>`;
export const STAR = (c = '#FACC15') => `<path d="M0 -10 L2.9 -3.1 L10 -3.1 L4.4 1.4 L6.4 8.6 L0 4.4 L-6.4 8.6 L-4.4 1.4 L-10 -3.1 L-2.9 -3.1Z" fill="${c}" stroke="${L}" stroke-width="0.8"/>`;
export const steam = (x, y, cls = '') => `<g class="${cls}" transform="translate(${x} ${y})">${[-8, 0, 8].map((dx, i) => `<path class="ek-steam" style="animation-delay:${i * 0.5}s" d="M${dx} 0 q-5 -8 0 -16 q5 -8 0 -16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.9"/>`).join('')}</g>`;
/** Nhãn chữ lớn trên cảnh (tên màu, số…), dùng tiếng Anh. */
export const label = (x, y, text, c = '#1D4ED8', size = 18) => `<g transform="translate(${x} ${y})"><rect x="${-text.length * size * 0.32 - 8}" y="${-size}" width="${text.length * size * 0.64 + 16}" height="${size * 1.4}" rx="${size * 0.5}" fill="#fff" stroke="${L}"/>
  <text x="0" y="0" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="${size}" fill="${c}">${text}</text></g>`;

// ── Bong bóng nghĩ, nhãn người nói, đêm ─────────────────────────────────────
/**
 * Bong bóng nghĩ: mây trắng tâm (x, y), cỡ w × h, ba chấm nhỏ đi xuống tới đầu người nghĩ (tx, ty). inner = hình bên trong
 * (toạ độ gốc ở tâm bong bóng). Hiện / ẩn bằng class của truyện (vd. .st-think .e0NN-think { opacity: 1 }).
 */
export const thought = (x, y, w, h, inner = '', [tx, ty] = [x - w * 0.3, y + h * 0.9], cls = '') => {
  const bumps = Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; return `<circle cx="${(Math.cos(a) * w * 0.42).toFixed(1)}" cy="${(Math.sin(a) * h * 0.4).toFixed(1)}" r="${(Math.min(w, h) * 0.2).toFixed(1)}" fill="#fff" stroke="${L}" stroke-width="1"/>`; }).join('');
  const dots = [0.35, 0.62, 0.85].map((t, i) => `<circle cx="${(x + (tx - x) * t).toFixed(1)}" cy="${(y + h * 0.42 + (ty - y - h * 0.42) * t).toFixed(1)}" r="${5 - i * 1.4}" fill="#fff" stroke="${L}" stroke-width="0.9"/>`).join('');
  return `<g class="${cls}">${dots}<g transform="translate(${x} ${y})">${bumps}<ellipse rx="${w * 0.46}" ry="${h * 0.42}" fill="#fff"/>${inner}</g></g>`;
};
/** Nhãn tên người đang nói (đặt trên đầu, mũi nhọn chỉ xuống): speaker(x, yĐầu, 'Minh'). */
export const speaker = (x, y, name, c = '#EA580C') => `<g transform="translate(${x} ${y})"><rect x="${-name.length * 5 - 9}" y="-24" width="${name.length * 10 + 18}" height="20" rx="10" fill="#fff" stroke="${c}" stroke-width="1.6"/>
  <path d="M-5 -4.5 L0 2 L5 -4.5Z" fill="#fff" stroke="${c}" stroke-width="1.4" stroke-linejoin="round"/><rect x="-5" y="-6.5" width="10" height="3" fill="#fff"/>
  <text x="0" y="-9.5" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="14" fill="${c}">${name}</text></g>`;
/** Lớp đêm phủ lên đoạn x..x+w (vẽ ở fg, class ek-night): nền xanh tối mờ, trăng khuyết, sao lấp lánh. Hiện bằng class
 *  của truyện, vd. `.st-night .ek-night { opacity: 1 }` (mặc định ẩn, mờ dần 0,8 s). */
export const night = (x, w, h = 315, moonX = x + w * 0.75) => `<g class="ek-night"><rect x="${x}" y="0" width="${w}" height="${h}" fill="#1E1B4B" opacity="0.5"/>
  <g transform="translate(${moonX} 50)"><circle r="18" fill="#FEF9C3"/><circle cx="8" cy="-5" r="16" fill="#3B3874"/></g>
  ${Array.from({ length: Math.floor(w / 70) }, (_, i) => `<path class="ek-twinkle" style="animation-delay:${(i % 5) * 0.4}s" d="M${x + 30 + i * 70} ${24 + (i * 37) % 90} l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2Z" fill="#FDE68A"/>`).join('')}</g>`;

export const KIT_CSS = `
.ek-cloud { animation: ekCloud 9s ease-in-out infinite alternate; }
@keyframes ekCloud { to { transform: translateX(26px); } }
.ek-sway { transform-origin: 0 -60px; animation: ekSway 3.6s ease-in-out infinite alternate; }
@keyframes ekSway { from { transform: rotate(-1.6deg); } to { transform: rotate(1.6deg); } }
.ek-flag { animation: ekSway 1.4s ease-in-out infinite alternate; }
.ek-spin { animation: ekSpin 30s linear infinite; }
@keyframes ekSpin { to { transform: rotate(360deg); } }
.ek-wave { animation: ekWave 2.4s ease-in-out infinite alternate; }
@keyframes ekWave { to { transform: translateX(14px); } }
.ek-steam { animation: ekSteam 1.5s ease-out infinite; opacity: 0; }
@keyframes ekSteam { from { transform: translateY(6px); opacity: 0; } 30% { opacity: .9; } to { transform: translateY(-14px); opacity: 0; } }
.ek-night { opacity: 0; transition: opacity .8s; pointer-events: none; }
.ek-twinkle { animation: ekTwinkle 1.6s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
@keyframes ekTwinkle { from { opacity: .35; transform: scale(.7); } to { opacity: 1; transform: scale(1.1); } }
@media (prefers-reduced-motion: reduce) { .ek-cloud, .ek-sway, .ek-flag, .ek-wave { animation-duration: 12s; } }
`;
