/**
 * Bài 49 "At the Doctor's": nhà Minh, trái sang phải: bếp (mẹ nấu súp) → phòng ngủ của Minh (giường, lịch thứ Ba, cửa sổ,
 * cặp sách treo móc) → vườn (Lucky, bóng). Bố là bác sĩ: soi họng, cặp nhiệt độ, khuyên bằng bong bóng có ✓ (should) / ✗
 * (shouldn't). Hai ngày sau: lịch lật sang thứ Năm, Minh khỏi bệnh ra vườn đá bóng.
 * Toạ độ cảnh: rộng 1760, cao 315, sàn y = 282, mặt đệm y = 238. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, lying } from '../../tiengViet3/cast.js';
import { BOOK } from '../rig.js';
import { KIT_CSS, L, room, doorway, windowBox, cloud, tree, bush, fence, label, steam, BOWL, BALL } from '../kit.js';

const FLOOR = 282;
const BED = 238; // mặt đệm
const MX = 842;  // chỗ Minh ngồi trên giường

Object.assign(CAST, {
  e049_doc: { adult: true, hair: 'short', top: 'jacket', shirt: '#FFFFFF', inner: '#60A5FA', bottom: 'pants', bottomC: '#334155', shoe: '#1C1917' },
});

const T = (x, y, s, c, size = 12) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="${size}" fill="${c}">${s}</text>`;

// ── Hình nhỏ trong bong bóng (gốc ở giữa, cỡ ~ 40) ─────────────────────────
const I_BED = `<rect x="-22" y="-2" width="44" height="10" rx="3" fill="#fff" stroke="${L}"/><rect x="-24" y="-14" width="5" height="26" rx="2" fill="#A16207" stroke="${L}" stroke-width="0.8"/>
  <rect x="-18" y="-8" width="12" height="7" rx="3" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M-6 -2 Q-4 -12 4 -11 H20 Q24 -10 22 -2Z" fill="#93C5FD" stroke="${L}" stroke-width="0.8"/>
  <rect x="19" y="-4" width="5" height="16" rx="2" fill="#A16207" stroke="${L}" stroke-width="0.8"/>`;
const I_SCHOOL = `<path d="M-24 -6 L0 -20 L24 -6Z" fill="#EF4444" stroke="${L}"/><rect x="-20" y="-6" width="40" height="24" fill="#FDE68A" stroke="${L}"/>
  <rect x="-5" y="4" width="10" height="14" fill="#B45309" stroke="${L}" stroke-width="0.8"/><rect x="-16" y="0" width="8" height="7" fill="#BAE6FD" stroke="${L}" stroke-width="0.6"/><rect x="8" y="0" width="8" height="7" fill="#BAE6FD" stroke="${L}" stroke-width="0.6"/>
  <path d="M14 -10 V-26" stroke="#78716C" stroke-width="1.6"/><rect x="14" y="-26" width="10" height="7" fill="#DA251D"/>`;
const I_MED = `<rect x="-8" y="-12" width="16" height="5" rx="1.5" fill="#fff" stroke="${L}" stroke-width="0.8"/><rect x="-10" y="-8" width="20" height="24" rx="4" fill="#F97316" stroke="${L}"/>
  <rect x="-7" y="-2" width="14" height="12" rx="2" fill="#fff"/><path d="M0 0 V8 M-4 4 H4" stroke="#EF4444" stroke-width="2.4"/>`;
const I_CUP = `<path d="M-10 -6 H10 L8 16 H-8Z" fill="#E0F2FE" stroke="${L}"/><path d="M-9 0 H9 L8 15 H-8Z" fill="#BAE6FD"/>
  <path d="M10 0 q7 0 6 6 q-1 4 -7 4" stroke="${L}" stroke-width="1.2" fill="none"/>
  ${[-5, 0, 5].map((dx, i) => `<path class="e049-steamI" style="animation-delay:${i * 0.3}s" d="M${dx} -10 q-3 -5 0 -10 q3 -5 0 -10" stroke="#FB923C" stroke-width="1.8" fill="none" stroke-linecap="round"/>`).join('')}`;
const I_ICE = `<path d="M-7 -2 L0 18 L7 -2Z" fill="#F59E0B" stroke="${L}"/><path d="M-5 2 L5 2 M-3 8 L3 8" stroke="#B45309" stroke-width="0.8"/>
  <circle cx="-3" cy="-6" r="6" fill="#F9A8D4" stroke="${L}" stroke-width="0.8"/><circle cx="4" cy="-7" r="6" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/><circle cx="0" cy="-13" r="5.4" fill="#A7F3D0" stroke="${L}" stroke-width="0.8"/>`;
const I_JUICE = `<path d="M-9 -10 H9 L7 16 H-7Z" fill="#fff" stroke="${L}"/><path d="M-8 -4 H8 L7 15 H-7Z" fill="#FB923C"/>
  <rect x="-5" y="-2" width="6" height="6" rx="1" fill="#E0F2FE" stroke="#7DD3FC" stroke-width="0.8"/><rect x="1" y="4" width="6" height="6" rx="1" fill="#E0F2FE" stroke="#7DD3FC" stroke-width="0.8"/>
  <path d="M3 -10 L8 -20 H12" stroke="#EF4444" stroke-width="2" fill="none"/>`;
const I_SNEEZE = `<circle r="15" fill="#FDDCB5" stroke="${L}"/><path d="M-8 -3 q3 -3 6 0 M2 -3 q3 -3 6 0" stroke="${L}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <ellipse cx="0" cy="8" rx="4" ry="3" fill="#B4363C"/><circle cx="0" cy="2" r="3" fill="#F87171"/>
  <path d="M10 -2 q8 -2 10 6 q-6 6 -12 2Z" fill="#fff" stroke="${L}" stroke-width="0.8"/>
  ${[[20, -10], [24, 2], [18, 12]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2" ry="3" fill="#38BDF8"/>`).join('')}`;
const THERMO = `<g transform="rotate(-8)"><rect x="0" y="-2.4" width="34" height="4.8" rx="2.4" fill="#F8FAFC" stroke="${L}" stroke-width="0.8"/>
  <rect x="2" y="-1" width="22" height="2" fill="#EF4444"/><circle cx="1" cy="0" r="3.2" fill="#EF4444" stroke="${L}" stroke-width="0.7"/></g>`;

/** Dấu ✓ (xanh) / ✗ (đỏ) trong hình tròn, gốc ở giữa. */
const MARK = (ok) => ok
  ? `<circle r="13" fill="#22C55E" stroke="${L}" stroke-width="1.2"/><path d="M-6 0 L-2 5 L7 -6" stroke="#fff" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
  : `<circle r="13" fill="#EF4444" stroke="${L}" stroke-width="1.2"/><path d="M-5.4 -5.4 L5.4 5.4 M5.4 -5.4 L-5.4 5.4" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/>`;
/** Vòng cấm đỏ phủ lên hình (shouldn't). */
const BAN = (r = 22) => `<circle r="${r}" fill="none" stroke="#EF4444" stroke-width="4" opacity="0.9"/><path d="M${-r * 0.7} ${-r * 0.7} L${r * 0.7} ${r * 0.7}" stroke="#EF4444" stroke-width="4" opacity="0.9"/>`;
/**
 * Bong bóng lời nói (gốc ở tâm (x, y), cỡ w × h), đuôi nhọn chỉ tới (tx, ty). mark: true = ✓ ở góc, false = ✗, null = không.
 */
const bubble = (cls, x, y, w, h, [tx, ty], inner, mark = null) => {
  const bx = Math.max(x - w / 2 + 14, Math.min(x + w / 2 - 14, tx));
  return `<g class="e049-bub ${cls}" style="transform-origin:${tx}px ${ty}px">
  <path d="M${bx - 8} ${y + h / 2 - 2} L${tx} ${ty} L${bx + 8} ${y + h / 2 - 2}Z" fill="#fff" stroke="${L}" stroke-width="1.4" stroke-linejoin="round"/>
  <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="16" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <rect x="${bx - 7}" y="${y + h / 2 - 4}" width="14" height="5" fill="#fff"/>
  <g transform="translate(${x} ${y})">${inner}</g>
  ${mark == null ? '' : `<g transform="translate(${x - w / 2 + 4} ${y - h / 2 + 4})">${MARK(mark)}</g>`}</g>`;
};

/** Lịch treo tường: trang trên cùng lật lên khi st-flip1 / st-flip2. */
const calendar = (x, y) => `<g transform="translate(${x} ${y})">
  <rect x="-34" y="-30" width="68" height="62" rx="4" fill="#fff" stroke="${L}" stroke-width="1.2"/>
  ${T(0, 4, 'THURSDAY', '#16A34A', 10)}${T(0, 24, '2 days later', '#64748B', 8)}
  <g class="e049-page2"><rect x="-34" y="-18" width="68" height="50" rx="2" fill="#fff" stroke="${L}" stroke-width="0.8"/>${T(0, 12, 'WEDNESDAY', '#2563EB', 9)}</g>
  <g class="e049-page1"><rect x="-34" y="-18" width="68" height="50" rx="2" fill="#fff" stroke="${L}" stroke-width="0.8"/>${T(0, 12, 'TUESDAY', '#DC2626', 11)}</g>
  <rect x="-34" y="-30" width="68" height="14" rx="4" fill="#EF4444" stroke="${L}" stroke-width="1.2"/><circle cx="-18" cy="-30" r="2.4" fill="${L}"/><circle cx="18" cy="-30" r="2.4" fill="${L}"/></g>`;

function bg() {
  return `
  <!-- Bếp -->
  ${room(0, 480, FLOOR, '#FEF9C3', '#D9A066')}
  ${windowBox(250, 70, 110, 92)}
  <rect x="40" y="206" width="240" height="${FLOOR - 206}" fill="#16A34A" stroke="${L}" stroke-width="1.2"/><rect x="34" y="200" width="252" height="10" rx="3" fill="#F5F5F4" stroke="${L}"/>
  ${[90, 200].map((x) => `<rect x="${x - 34}" y="218" width="68" height="54" rx="3" fill="#15803D" stroke="${L}" stroke-width="0.8"/><circle cx="${x + 26}" cy="246" r="2.4" fill="#FDE68A"/>`).join('')}
  <rect x="90" y="194" width="70" height="6" rx="2" fill="#1F2937"/>
  <g transform="translate(125 194)"><path d="M-24 0 V-22 H24 V0Z" fill="#94A3B8" stroke="${L}" stroke-width="1.2"/><rect x="-28" y="-26" width="56" height="6" rx="3" fill="#64748B" stroke="${L}"/>
    <path d="M-30 -14 h-6 M30 -14 h6" stroke="${L}" stroke-width="3" stroke-linecap="round"/></g>
  ${steam(125, 160, 'e049-potsteam')}
  <rect x="40" y="100" width="150" height="7" rx="2" fill="#A16207" stroke="${L}"/>
  ${[60, 92, 124].map((x) => `<path d="M${x - 12} 88 H${x + 12} Q${x + 11} 100 ${x} 100 Q${x - 11} 100 ${x - 12} 88Z" fill="#fff" stroke="#3B82F6" stroke-width="1.2"/>`).join('')}
  <rect x="380" y="110" width="80" height="172" rx="6" fill="#E0F2FE" stroke="${L}" stroke-width="1.2"/><path d="M380 170 H460" stroke="${L}"/><rect x="448" y="128" width="4" height="26" rx="2" fill="#94A3B8"/><rect x="448" y="186" width="4" height="30" rx="2" fill="#94A3B8"/>

  <!-- Phòng ngủ của Minh -->
  ${room(480, 700, FLOOR, '#DBEAFE', '#D9A066')}
  ${Array.from({ length: 16 }, (_, i) => `<circle cx="${500 + (i * 83) % 660}" cy="${30 + (i * 47) % 130}" r="2.2" fill="#93C5FD"/>`).join('')}
  ${calendar(560, 104)}
  <rect x="694" y="64" width="124" height="104" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <rect x="700" y="70" width="112" height="92" fill="#BAE6FD"/>
  <g transform="translate(784 100)"><g class="e049-sun"><circle r="14" fill="#FDE047" stroke="#F59E0B" stroke-width="2"/></g></g>
  ${cloud(730, 112, 0.5, 1)}
  <path d="M700 146 Q740 132 780 144 T812 140 V162 H700Z" fill="#86EFAC"/>
  <path d="M756 70 V162 M700 116 H812" stroke="#fff" stroke-width="3" opacity="0.8"/>
  <!-- giường: đầu giường bên phải -->
  <rect x="636" y="${BED}" width="252" height="18" rx="4" fill="#fff" stroke="${L}"/><rect x="636" y="${BED + 16}" width="252" height="10" fill="#C2410C" stroke="${L}"/>
  <rect x="640" y="${BED + 24}" width="10" height="${FLOOR - BED - 24}" fill="#A16207" stroke="${L}"/>
  <rect x="878" y="186" width="16" height="${FLOOR - 186}" rx="4" fill="#A16207" stroke="${L}"/>
  <g class="e049-pillow"><rect x="836" y="210" width="42" height="26" rx="11" fill="#fff" stroke="${L}"/></g>
  <g class="e049-sleeper"><g transform="translate(1520 0) scale(-1 1)">${lying(760, BED + 2, 'en_minh_pj', { len: 150, blanket: '#93C5FD' })}</g></g>
  <g class="e049-sleeper2"><g transform="translate(1520 0) scale(-1 1)">${lying(760, BED + 2, 'en_minh_pj', { len: 150, blanket: '#93C5FD', mood: 'sad' })}</g></g>
  <!-- ghế cạnh giường (Lan ngồi đọc) -->
  <g transform="translate(962 0)"><rect x="-18" y="${FLOOR - 34}" width="36" height="7" rx="2" fill="#F59E0B" stroke="${L}"/><path d="M-14 ${FLOOR - 27} V${FLOOR} M14 ${FLOOR - 27} V${FLOOR}" stroke="#92400E" stroke-width="3"/>
    <rect x="12" y="${FLOOR - 78}" width="7" height="51" rx="2" fill="#F59E0B" stroke="${L}"/></g>
  <!-- móc treo cặp sách -->
  <path d="M1000 136 H1060" stroke="#A16207" stroke-width="5" stroke-linecap="round"/><path d="M1030 136 v10" stroke="${L}" stroke-width="2.4"/>
  <g transform="translate(1030 166) scale(1.3)"><rect x="-11" y="-14" width="22" height="28" rx="5" fill="#F59E0B" stroke="${L}"/><rect x="-8" y="-2" width="16" height="10" rx="2" fill="none" stroke="${L}" stroke-width="0.9"/><path d="M-6 -14 Q0 -24 6 -14" stroke="${L}" stroke-width="1.4" fill="none"/></g>
  <g transform="translate(1030 166)"><g class="e049-bagno">${BAN(26)}</g></g>
  <ellipse cx="760" cy="${FLOOR + 6}" rx="70" ry="7" fill="#FDA4AF" opacity="0.6"/>
  ${doorway(480, FLOOR)}

  <!-- Vườn -->
  <rect x="1180" y="0" width="580" height="315" fill="#7DD3FC"/>
  <path d="M1180 120 Q1400 90 1760 130 V315 H1180Z" fill="#BAE6FD" opacity="0.6"/>
  ${cloud(1300, 70, 0.9, 0)}${cloud(1600, 54, 0.7, 2)}
  <g transform="translate(1690 70)"><g class="e049-bigsun"><circle r="22" fill="#FDE047" stroke="#F59E0B" stroke-width="2"/>${Array.from({ length: 10 }, (_, i) => `<path d="M0 -28 V-35" stroke="#FBBF24" stroke-width="4" stroke-linecap="round" transform="rotate(${i * 36})"/>`).join('')}</g></g>
  <path d="M1180 236 Q1340 206 1500 232 T1760 226 V${FLOOR} H1180Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(1640, FLOOR - 2, 1.05)}${fence(1200, 300, FLOOR)}
  <rect x="1180" y="${FLOOR - 6}" width="580" height="${315 - FLOOR + 6}" fill="#86EFAC" stroke="${L}"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M${1200 + i * 46} ${FLOOR + 12} l3 -7 l3 7" stroke="#16A34A" stroke-width="1.4" fill="none"/>`).join('')}
  <g class="e049-ball0" transform="translate(1418 ${FLOOR - 9})">${BALL('#EF4444')}</g><g class="e049-ball1" transform="translate(1545 ${FLOOR - 9})">${BALL('#EF4444')}</g>
  <rect x="1176" y="0" width="12" height="${FLOOR}" fill="#C08B5C" stroke="${L}"/>`;
}

function fg() {
  return `
  <!-- chăn phủ chân Minh khi ngồi -->
  <g class="e049-blanket"><path d="M652 ${BED + 4} Q646 ${BED - 24} 668 ${BED - 28} H836 Q858 ${BED - 34} 866 ${BED - 10} L866 ${BED + 4}Z" fill="#93C5FD" stroke="${L}" stroke-width="1.1"/>
    <path d="M668 ${BED - 20} Q760 ${BED - 30} 850 ${BED - 24}" stroke="#fff" stroke-width="2" fill="none" opacity="0.6"/></g>
  <!-- họng đau: vòng đỏ ở cổ, ho -->
  <g class="e049-throat"><circle cx="${MX}" cy="177" r="9" fill="#EF4444" opacity="0.45"/><circle cx="${MX}" cy="177" r="4" fill="#DC2626" opacity="0.6"/></g>
  <g class="e049-cough">${[0, 1, 2].map((i) => `<path class="e049-cp" style="animation-delay:${i * 0.18}s" d="M${MX + 18} ${150 + i * 7} q8 -2 14 ${-4 + i * 4}" stroke="#94A3B8" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join('')}
    ${label(MX + 10, 112, 'cough!', '#64748B', 12)}</g>
  <g class="e049-sore">${label(MX - 66, 176, 'sore throat', '#DC2626', 11)}</g>
  <!-- cặp nhiệt độ trong miệng + số đo -->
  <g class="e049-thermo" transform="translate(${MX + 4} 168)">${THERMO}</g>
  <g class="e049-temp">${label(MX - 60, 132, '38.5°C', '#DC2626', 15)}</g>
  <!-- tia đèn soi họng -->
  <g class="e049-beam"><path d="M876 150 L${MX + 6} 162 L${MX + 6} 174 Z" fill="#FDE047" opacity="0.7"/></g>
  <!-- mây buồn -->
  <g class="e049-rain" transform="translate(${MX - 4} 104)"><ellipse rx="22" ry="10" fill="#94A3B8"/><ellipse cx="-10" cy="-6" rx="12" ry="9" fill="#94A3B8"/><ellipse cx="9" cy="-8" rx="13" ry="10" fill="#94A3B8"/>
    ${[-12, 0, 12].map((x, i) => `<path class="e049-drop" style="animation-delay:${i * 0.25}s" d="M${x} 12 v6" stroke="#38BDF8" stroke-width="2.4" stroke-linecap="round"/>`).join('')}</g>
  <!-- bong bóng lời nói -->
  ${bubble('e049-b-cold', 874, 86, 132, 62, [912, 126], `<g transform="translate(-30 0)">${I_SNEEZE}</g>${T(30, 6, 'a cold', '#2563EB', 16)}`)}
  ${bubble('e049-b-bed', 874, 86, 112, 62, [912, 126], `<g transform="scale(1.3)">${I_BED}</g>`, true)}
  ${bubble('e049-b-school', 874, 86, 112, 62, [912, 126], `<g transform="scale(1.1)">${I_SCHOOL}</g>${BAN(24)}`, false)}
  ${bubble('e049-b-ask', 770, 92, 104, 56, [826, 134], `<g transform="translate(-16 0) scale(0.95)">${I_MED}</g>${T(22, 12, '?', '#F97316', 34)}`)}
  ${bubble('e049-b-med', 874, 86, 148, 62, [912, 126], `<g transform="translate(-42 2) scale(0.9)">${BOWL}</g>${T(-2, 5, '→', '#16A34A', 22)}<g transform="translate(40 0) scale(0.9)">${I_MED}</g>${T(-2, 24, 'after', '#16A34A', 10)}`, true)}
  ${bubble('e049-b-water', 874, 86, 112, 62, [912, 126], `<g transform="translate(-18 2)">${I_CUP}</g>${T(26, 6, 'warm', '#EA580C', 13)}`, true)}
  ${bubble('e049-b-cold2', 874, 86, 128, 62, [912, 126], `<g transform="translate(-26 0)">${I_ICE}${BAN(20)}</g><g transform="translate(26 0)">${I_JUICE}${BAN(20)}</g>`, false)}
  ${label(1440, 120, 'much better!', '#16A34A', 18).replace('<g ', '<g class="e049-better" ')}
  <rect class="e049-fade" x="0" y="0" width="1760" height="315" fill="#1E293B"/>`;
}

const CSS = `
.e049-sleeper, .e049-sleeper2, .e049-blanket, .e049-pillow { transition: opacity .35s; }
.e049-sleeper, .e049-sleeper2 { opacity: 0; }
.st-lie .e049-sleeper { opacity: 1; } .st-lie2 .e049-sleeper2 { opacity: 1; }
.st-lie .e049-blanket, .st-lie2 .e049-blanket, .st-lie .e049-pillow, .st-lie2 .e049-pillow, .st-up .e049-blanket { opacity: 0; }
.e049-throat, .e049-sore, .e049-cough, .e049-thermo, .e049-temp, .e049-beam, .e049-rain, .e049-bagno, .e049-better { opacity: 0; transition: opacity .35s; }
.st-throat .e049-throat, .st-throat .e049-sore, .st-cough .e049-cough, .st-thermo .e049-thermo, .st-temp .e049-temp, .st-beam .e049-beam,
.st-rain .e049-rain, .st-bagno .e049-bagno, .st-better .e049-better { opacity: 1; }
.st-throat .e049-throat circle { animation: e049Pulse .6s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
@keyframes e049Pulse { from { transform: scale(.8); } to { transform: scale(1.25); } }
.e049-cp { opacity: 0; } .st-cough .e049-cp { animation: e049Cp .9s ease-out infinite; }
@keyframes e049Cp { from { opacity: 0; transform: translateX(-4px); } 30% { opacity: 1; } to { opacity: 0; transform: translateX(12px); } }
.st-bagno .e049-bagno { animation: e049Pulse .5s ease-in-out 3 alternate; transform-box: fill-box; transform-origin: center; }
.e049-drop { opacity: 0; } .st-rain .e049-drop { animation: e049Drop .8s linear infinite; }
@keyframes e049Drop { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(14px); } }
.e049-bub { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
${['cold', 'bed', 'school', 'ask', 'med', 'water', 'cold2'].map((k) => `.st-b-${k} .e049-b-${k}`).join(', ')} { opacity: 1; transform: scale(1); }
.e049-steamI { animation: e049Steam 1.4s ease-out infinite; }
@keyframes e049Steam { from { opacity: 0; transform: translateY(4px); } 30% { opacity: 1; } to { opacity: 0; transform: translateY(-6px); } }
.e049-potsteam { opacity: 0; transition: opacity .4s; } .st-cook .e049-potsteam { opacity: 1; }
.e049-page1, .e049-page2 { transform-origin: 0 -18px; transition: transform .5s ease-in, opacity .5s ease-in; }
.st-flip1 .e049-page1 { transform: translateY(-30px) scaleY(.1); opacity: 0; }
.st-flip2 .e049-page2 { transform: translateY(-30px) scaleY(.1); opacity: 0; transition-delay: .5s; }
.e049-sun { transition: transform .8s cubic-bezier(.3,1.6,.6,1); } .st-flip2 .e049-sun { transform: scale(1.4); }
.e049-bigsun { animation: ekSpin 30s linear infinite; }
.e049-ball0, .e049-ball1 { transition: opacity .2s; } .e049-ball1 { opacity: 0; } .st-kick .e049-ball0 { opacity: 0; } .st-kicked .e049-ball1 { opacity: 1; }
.e049-fade { opacity: 0; pointer-events: none; transition: opacity .45s; } .st-fade .e049-fade { opacity: 1; }
.act-e049cough .pp-bob { animation: e049Cough .9s ease-in-out infinite; }
@keyframes e049Cough { 0%, 50%, 100% { transform: translateY(0); } 62% { transform: translateY(3px) rotate(-3deg); } 76% { transform: translateY(1px) rotate(1deg); } }
.e049-zz .dg-eye { transform: scaleY(.12) !important; animation: none !important; }
@media (prefers-reduced-motion: reduce) {
  .act-e049cough .pp-bob { animation-duration: 1.6s; }
  .st-throat .e049-throat circle { animation-duration: 1.2s; }
}
`;

/** Nhảy cong tới (x, y) (mèo nhảy lên giường, Minh nhảy khỏi giường). */
async function hop(st, id, x, y, dur = 600) {
  const A = st.a(id);
  if (st.instant) { A.x = x; A.y = y; A.place(); return; }
  const from = A.tf(), mid = A.tf((A.x + x) / 2, Math.min(A.y, y) - 34);
  A.face = x >= A.x ? 1 : -1; A.el.classList.toggle('is-left', A.face < 0);
  A.x = x; A.y = y;
  const to = A.tf();
  A.anim?.cancel();
  A.anim = A.el.animate([{ transform: from }, { transform: mid, offset: 0.45 }, { transform: to }], { duration: dur, easing: 'ease-in-out', fill: 'forwards' });
  await A.anim.finished.catch(() => {});
  A.place();
}
const BUBS = ['cold', 'bed', 'school', 'ask', 'med', 'water', 'cold2'];
const clearBubs = (st, keep) => BUBS.forEach((k) => k !== keep && st.set(`st-b-${k}`, false));

const MED_HELD = `<g transform="translate(0 -6) scale(0.7)">${I_MED}</g>`;
const SOUP_HELD = `<g transform="translate(0 -6)">${BOWL}</g>`;

const BEATS = [
  { key: ['sore throat', 'a cough'], icon: '🤒', label: 'sore throat', async play(st) {
    st.fx('zzz', MX - 6, 196);
    await st.wait(700);
    st.set('st-lie', false); st.set('st-lie2'); st.sfx('alarm-clock', { vol: 0.5 });
    await st.wait(700);
    st.set('st-lie2', false); st.show('minh', true);
    st.pose('minh', 'e049_throat'); st.mood('minh', 'sad');
    st.set('st-throat');
    await st.wait(900);
    st.set('st-cough'); st.act('minh', 'e049cough'); st.mood('minh', 'shut'); st.sfx('cough', { vol: 0.7 });
    await st.wait(1500);
    st.act('minh', null); st.mood('minh', 'sad');
  } },
  { key: ["looked at Minh's throat", 'took his temperature'], icon: '🌡️', label: 'temperature', async play(st) {
    st.set('st-cough', false); st.set('st-throat', false);
    st.pose('minh', 'e049_sit');
    await st.walk('dad', 905, { speed: 150, follow: false });
    st.hold('dad', 'e049_torch'); st.pose('dad', 'e049_exam');
    st.mood('minh', 'wow'); st.set('st-beam'); st.set('st-throat'); st.sfx('pop', { vol: 0.4, rate: 1.4 });
    await st.wait(1300);
    st.set('st-beam', false); st.set('st-throat', false); st.hold('dad', null); st.pose('dad', 'give');
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(THERMO, [870, 170], [MX + 18, 168], { size: 40, dur: 600 });
    st.set('st-thermo'); st.mood('minh', 'shut'); st.pose('dad', 'stand');
    await st.wait(900);
    st.set('st-temp'); st.sfx('beep', { vol: 0.6 });
    st.pose('dad', 'think');
    await st.wait(1000);
  } },
  { key: ['You have a cold'], icon: '🤧', label: 'a cold', async play(st) {
    st.set('st-thermo', false); st.set('st-temp', false);
    st.pose('dad', 'open'); st.mood('minh', 'sad');
    st.set('st-b-cold'); st.sfx('pop', { vol: 0.6 }); st.talk('dad', true);
    await st.wait(900);
    st.talk('dad', false);
    st.mood('minh', 'shut'); st.act('minh', 'e049cough'); st.sfx('cough', { vol: 0.6 });
    st.fx('drops', MX + 16, 160);
    await st.wait(1000);
    st.act('minh', null); st.mood('minh', 'sad'); st.pose('dad', 'stand');
  } },
  { key: ['should stay in bed'], icon: '🛏️', label: 'stay in bed', async play(st) {
    clearBubs(st, 'bed');
    st.set('st-b-bed'); st.sfx('pop', { vol: 0.6 }); st.talk('dad', true); st.pose('dad', 'point');
    await st.wait(1000);
    st.talk('dad', false); st.act('minh', 'nod'); st.mood('minh', 'happy'); st.sfx('snore', { vol: 0.35 });
    await st.wait(1200);
    st.act('minh', null); st.pose('dad', 'stand');
  } },
  { key: ["shouldn't go to school"], icon: '🏫', label: 'no school', async play(st) {
    clearBubs(st, 'school');
    st.set('st-b-school'); st.sfx('school-bell', { vol: 0.35 }); st.talk('dad', true); st.pose('dad', 'e049_wag'); st.act('dad', 'no');
    await st.wait(1000);
    st.talk('dad', false); st.act('dad', null);
    st.look(930);
    st.set('st-bagno'); st.sfx('buzz-no', { vol: 0.6 }); st.face('minh', 1); st.mood('minh', 'wow');
    await st.wait(1300);
    st.pose('dad', 'stand');
  } },
  { key: ['Minh was sad'], icon: '😢', label: 'sad', async play(st) {
    clearBubs(st);
    st.look(800);
    st.pose('minh', 'e049_sad'); st.mood('minh', 'cry'); st.set('st-rain');
    await st.loop('rain', () => st.wait(1500), { vol: 0.5 });
    st.mood('minh', 'sad');
    await st.wait(400);
  } },
  { key: ['take some medicine'], icon: '💊', label: 'medicine?', async play(st) {
    st.set('st-rain', false); st.set('st-bagno', false);
    st.pose('minh', 'sitWave'); st.mood('minh', 'happy');
    st.set('st-b-ask'); st.sfx('pop', { vol: 0.6 }); st.talk('minh', true);
    await st.wait(1500);
    st.talk('minh', false);
  } },
  { key: ['he asked'], icon: '🙋', label: 'he asked', async play(st) {
    st.talk('minh', true);
    st.pose('dad', 'think'); st.act('dad', 'nod');
    await st.wait(300);
    st.sfx('ding', { vol: 0.45 });
    await st.wait(700);
    st.talk('minh', false); st.act('dad', null);
  } },
  { key: ['should take this medicine', 'after breakfast'], icon: '🥣', label: 'after breakfast', async play(st) {
    clearBubs(st, 'med');
    st.pose('minh', 'e049_sit');
    st.set('st-b-med'); st.sfx('pop', { vol: 0.6 }); st.talk('dad', true); st.pose('dad', 'give');
    await st.wait(1100);
    st.talk('dad', false);
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(I_MED, [868, 176], [MX, 186], { size: 34, dur: 600 });
    st.chest('minh', MED_HELD); st.pose('minh', 'sitHold'); st.mood('minh', 'joy'); st.sfx('box-shake', { vol: 0.5 });
    st.pose('dad', 'stand');
    await st.wait(900);
  } },
  { key: ['drink lots of warm water'], icon: '🍵', label: 'warm water', async play(st) {
    clearBubs(st, 'water');
    st.chest('minh', ''); st.pose('minh', 'e049_sit');
    st.set('st-b-water'); st.sfx('pop', { vol: 0.6 }); st.talk('dad', true); st.pose('dad', 'give');
    await st.wait(900);
    st.talk('dad', false);
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(I_CUP, [868, 176], [MX + 10, 170], { size: 34, dur: 600 });
    st.hold('minh', 'e049_cup'); st.pose('minh', 'drink'); st.mood('minh', 'shut'); st.sfx('gulp', { vol: 0.6 });
    st.pose('dad', 'stand');
    await st.wait(1400);
    st.mood('minh', 'happy');
  } },
  { key: ["shouldn't eat ice cream", 'cold juice'], icon: '🍦', label: 'no ice cream', async play(st) {
    clearBubs(st, 'cold2');
    st.hold('minh', null); st.pose('minh', 'e049_sit');
    st.set('st-b-cold2'); st.sfx('pop', { vol: 0.6 }); st.talk('dad', true); st.pose('dad', 'e049_wag'); st.act('dad', 'no');
    await st.wait(500);
    st.sfx('buzz-no', { vol: 0.6 });
    await st.wait(200);
    await st.wait(1200);
    st.talk('dad', false); st.act('dad', null); st.mood('minh', 'sad');
    await st.wait(900);
    st.pose('dad', 'stand');
  } },
  { key: ['hot soup'], icon: '🍲', label: 'hot soup', async play(st) {
    clearBubs(st);
    st.mood('minh', 'happy');
    st.walk('dad', 1240, { speed: 170, follow: false }).then(() => st.show('dad', false));
    await st.look(180, { dur: 900 });
    st.set('st-cook'); st.hold('mum', 'spoon'); st.pose('mum', 'stir'); st.act('mum', 'stir'); st.sfx('pot-stir', { vol: 0.6 });
    await st.wait(1100);
    st.act('mum', null); st.hold('mum', null);
    st.chest('mum', SOUP_HELD); st.pose('mum', 'carry');
    await st.walk('mum', 612, { speed: 150, lead: 120 });
    st.chest('mum', ''); st.pose('mum', 'give');
    await st.fly(BOWL, [640, 178], [MX, 190], { size: 34, dur: 700 });
    st.sfx('bowl-down', { vol: 0.5 });
    st.chest('minh', SOUP_HELD); st.hold('minh', 'spoon'); st.pose('minh', 'eat'); st.act('minh', 'eat'); st.mood('minh', 'joy');
    await st.wait(400);
    st.sfx('slurp', { vol: 0.6 });
    st.pose('mum', 'stand');
    await st.wait(1200);
    st.act('minh', null);
  } },
  { key: ['read him a story', 'Kitty slept on his bed'], icon: '🐱', label: 'a story', async play(st) {
    st.set('st-cook', false); st.chest('minh', ''); st.hold('minh', null); st.pose('minh', 'e049_sit'); st.mood('minh', 'happy');
    st.look(830);
    st.show('lan', true);
    await st.walk('lan', 962, { speed: 150, follow: false });
    st.face('lan', -1); st.pose('lan', 'read'); st.chest('lan', BOOK.replace('translate(0 -25)', 'translate(0 -8)')); st.act('lan', 'read'); st.talk('lan', true);
    st.sfx('page-turn', { vol: 0.6 });
    await st.walk('kitty', 610, { speed: 110, follow: false });
    st.sfx('meow', { vol: 0.5 });
    await hop(st, 'kitty', 700, BED - 22, 600);
    st.dog('kitty', 'sit'); st.a('kitty').el.classList.add('e049-zz');
    st.fx('zzz', 712, 180);
    await st.wait(1200);
    st.talk('lan', false);
  } },
  { key: ['Two days later', 'much better'], icon: '⚽', label: 'much better', async play(st) {
    st.act('lan', null);
    st.set('st-flip1'); st.sfx('page-turn', { vol: 0.6 });
    st.set('st-flip2');
    await st.wait(1300);
    st.mood('minh', 'joy');
    st.set('st-fade');
    await st.wait(500);
    // Hai ngày sau: ra vườn
    st.a('kitty').el.classList.remove('e049-zz');
    st.place('kitty', 1212, FLOOR, 1); st.dog('kitty', 'sit');
    st.chest('lan', ''); st.pose('lan', 'stand'); st.place('lan', 1325, FLOOR, 1);
    st.place('mum', 1265, FLOOR, 1); st.show('minh', true);
    st.set('st-up');
    await st.dress('minh', 'en_minh_home');
    st.place('minh', 1398, FLOOR, 1); st.pose('minh', 'stand');
    await st.look(1430, { instant: true });
    st.set('st-fade', false);
    await st.wait(450);
    st.set('st-kick'); st.pose('minh', 'e049_kick'); st.sfx('kick', { vol: 0.7 });
    st.fly(BALL('#EF4444'), [1418, FLOOR - 9], [1545, FLOOR - 9], { size: 22, dur: 700 });
    st.walk('lucky', 1508, { speed: 180, follow: false });
    await st.wait(700);
    st.set('st-kicked');
    st.set('st-better'); st.pose('minh', 'cheer'); st.act('minh', 'jump');
    st.pose('lan', 'clap'); st.act('lan', 'clap'); st.mood('lan', 'joy');
    st.dog('lucky', 'stand'); st.act('lucky', 'jump'); st.mood('lucky', 'joy'); st.sfx('dog-bark', { vol: 0.6 });
    st.fx('sparkle', 1398, 170, { quiet: true }); st.sfx('cheer', { vol: 0.4 });
    await st.wait(1500);
  } },
];

export default {
  id: 'en049', worldW: 1760, floor: FLOOR, viewTop: 40, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: {
    e049_sit: { R: [22, -40], L: [22, -40], dy: 20 },
    e049_throat: { R: [22, -150], L: [40, 110], dy: 20, head: 6 },
    e049_sad: { R: [40, 110], L: [40, 110], dy: 20, head: 12 },
    e049_exam: { R: [78, 96], L: [10, 4], head: -4 },
    e049_wag: { R: [120, 172], L: [10, 4], head: 4 },
    e049_kick: { R: [60, 80], L: [60, 80] },
  },
  props: {
    e049_torch: `<rect x="-2.6" y="-2" width="5.2" height="14" rx="2" fill="#475569" stroke="${L}" stroke-width="0.7"/><rect x="-3.2" y="10" width="6.4" height="4" rx="1" fill="#FDE047" stroke="${L}" stroke-width="0.6"/>`,
    e049_cup: `<g transform="translate(0 -5) scale(0.6)">${I_CUP}</g>`,
  },
  cast: [
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 185, s: 0.95, face: -1 },
    { id: 'kitty', kind: 'cat', x: 300, s: 0.85, face: 1 },
    { id: 'lucky', kind: 'dog', x: 1470, s: 0.9, face: -1 },
    { id: 'dad', kind: 'adult', who: 'e049_doc', x: 1240, s: 0.95, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 1260, s: 1.08, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_pj', x: MX, y: BED, face: 1 },
  ],
  init(st) {
    st.look(800, { instant: true });
    st.set('st-lie'); st.show('minh', false); st.show('lan', false);
    st.pose('minh', 'e049_sit');
    st.dog('kitty', 'sit'); st.dog('lucky', 'sit');
    // ống nghe trước ngực bố
    st.chest('dad', `<g transform="translate(0 -6)"><path d="M-7 -14 Q-9 4 0 8 Q9 4 7 -14" stroke="#1F2937" stroke-width="1.8" fill="none"/><circle cx="0" cy="10" r="3.6" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/></g>`);
  },
};
