/**
 * Bài 97 "Unless You Water It" (câu điều kiện loại 0 + unless): một phòng học khoa học, đi từ trái sang phải:
 * bảng "SCIENCE" + bàn cô Hoa (khay cốc đất, túi hạt đậu) → bàn Minh, bàn Tom (lịch tường ở trên) → bậu cửa sổ nắng
 * (cốc của Minh ở đây) → tủ tối (cốc thứ hai ở trong). Cốc nhựa trong nên thấy cả hạt và rễ.
 * Sau một tuần Minh mang cốc trong tủ ra đặt cạnh cốc bên cửa sổ: hai cây đứng cạnh nhau (cao xanh / gầy nhợt).
 * Mỗi câu "If…" hiện điều kiện bằng biểu tượng (mặt trời gạch chéo, mặt trời + giọt nước, nhiều nước) rồi kết quả diễn ngay trên cây.
 * Toạ độ cảnh: rộng 1000, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, room, windowBox, table, desk, label, thought } from '../kit.js';

const FLOOR = 282;
const W = 1000;
const X = { board: 20, hoa: 250, table: 320, minh: 430, tom: 520, cal: 540, win: 640, sill0: 600, sill1: 800, D: 650, Wc: 762, C2: 712, mst: 820, cup0: 860, cup1: 940, C: 900 };
const SILL = 190;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

// ── Cây trong cốc (gốc = giữa mặt đất trong cốc, mọc lên trên) ─────────────────────────
const leaf = (x, y, d, s, c, cls = '') => `<path class="${cls}" d="M${x} ${y} q${d * s * 0.5} ${-s * 0.75} ${d * s} ${-s * 0.1} q${-d * s * 0.45} ${s * 0.5} ${-d * s} ${s * 0.1}Z" fill="${c}" stroke="${L}" stroke-width="0.6"/>`;
const SPROUT = `<path d="M0 0 V-12" stroke="#4ADE80" stroke-width="2.2"/>${leaf(0, -11, -1, 9, '#4ADE80')}${leaf(0, -12, 1, 9, '#4ADE80')}`;
const TALL = `<path d="M0 0 C-3 -22 3 -44 0 -68" stroke="#16A34A" stroke-width="3.2" fill="none"/>
  ${leaf(0, -18, -1, 18, '#22C55E')}${leaf(0, -30, 1, 19, '#22C55E')}${leaf(-1, -44, -1, 18, '#4ADE80')}${leaf(0, -55, 1, 17, '#4ADE80')}${leaf(0, -66, -1, 13, '#22C55E')}${leaf(0, -67, 1, 12, '#22C55E')}`;
const PALE = `<path class="e097-ps" d="M0 0 C4 -16 -4 -34 3 -52" stroke="#D9F99D" stroke-width="1.5" fill="none"/>
  ${leaf(1, -24, -1, 9, '#ECFCCB', 'e097-pl')}${leaf(-1, -38, 1, 8, '#ECFCCB', 'e097-pl')}${leaf(3, -51, -1, 7, '#ECFCCB', 'e097-pl')}${leaf(3, -52, 1, 6, '#ECFCCB', 'e097-pl')}`;
const ROOTS = `<path d="M0 2 V14 M0 6 l-6 7 M0 9 l6 6" stroke="#FEF3C7" stroke-width="1.1" fill="none" stroke-linecap="round"/>`;
const SOFT = `<path d="M0 2 q-4 5 0 9 q4 5 -1 10 M0 5 q-7 3 -8 10 M0 7 q7 4 6 12" stroke="#A16207" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
const CRACK = `<path d="M-9 1 l3 4 l-2 5 M3 1 l-2 5 l4 4 M8 2 l-3 6" stroke="#451A03" stroke-width="1" fill="none"/>`;

/** Cốc nhựa trong có đất (gốc = đáy giữa). Các lớp hiện / ẩn bằng class (k = tên cốc). */
const cup = (x, y, k, s = 1, extra = '') => `<g transform="translate(${x} ${y}) scale(${s})"><g class="e097-cup e097-k-${k} ${extra}">
  <path d="M-15 -34 L-12 0 H12 L15 -34Z" fill="#E0F2FE" fill-opacity="0.6"/>
  <path class="e097-soil" d="M-14.3 -26 L-12 0 H12 L14.3 -26Z" fill="#78350F"/>
  <g class="e097-wl"><path d="M-14.8 -32 L-14.3 -26 H14.3 L14.8 -32Z" fill="#38BDF8" opacity="0.75"/></g>
  <g transform="translate(0 -26)"><g class="e097-roots">${ROOTS}</g><g class="e097-soft">${SOFT}</g><g class="e097-crack">${CRACK}</g></g>
  <ellipse class="e097-seed" cx="0" cy="-15" rx="4.4" ry="2.8" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/>
  <g transform="translate(0 -26)"><g class="e097-pg e097-sp">${SPROUT}</g><g class="e097-pg e097-tall">${TALL}</g><g class="e097-pg e097-pale">${PALE}</g></g>
  <path d="M-15 -34 L-12 0 H12 L15 -34Z" fill="none" stroke="#64748B" stroke-width="1.1"/><path d="M-16 -34 H16" stroke="#64748B" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M-11 -30 L-9 -4" stroke="#fff" stroke-width="1.6" opacity="0.7"/></g></g>`;
/** Cốc tĩnh (cầm trước ngực / bay): plant = '' | 'pale' | 'tall'. */
const cupStatic = (plant = '') => `<path d="M-15 -34 L-12 0 H12 L15 -34Z" fill="#E0F2FE" fill-opacity="0.6"/><path d="M-14.3 -26 L-12 0 H12 L14.3 -26Z" fill="#78350F"/>
  ${plant ? '' : `<ellipse cx="0" cy="-15" rx="4.4" ry="2.8" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/>`}
  ${plant ? `<g transform="translate(0 -26)">${plant === 'pale' ? PALE : TALL}</g>` : ''}
  <path d="M-15 -34 L-12 0 H12 L15 -34Z" fill="none" stroke="#64748B" stroke-width="1.1"/><path d="M-16 -34 H16" stroke="#64748B" stroke-width="1.8" stroke-linecap="round"/>`;
const CHEST_TWO = `<g transform="translate(-13 -4) scale(0.72)">${cupStatic()}</g><g transform="translate(13 -4) scale(0.72)">${cupStatic()}</g>`;
const CHEST_ONE = `<g transform="translate(0 -4) scale(0.72)">${cupStatic()}</g>`;
const CHEST_PALE = `<g transform="translate(0 -4) scale(0.72)">${cupStatic('pale')}</g>`;
const CHEST_TALL = `<g transform="translate(0 -4) scale(0.72)">${cupStatic('tall')}</g>`;
const TRAY = `<g transform="translate(0 -6)"><rect x="-30" y="-2" width="60" height="6" rx="2" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/>
  ${[-18, -6, 6, 18].map((dx) => `<g transform="translate(${dx} -2) scale(0.42)">${cupStatic()}</g>`).join('')}</g>`;
const SEED = `<ellipse rx="5" ry="3.2" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/><path d="M-2 0 q2 -1.4 4 0" stroke="#A16207" stroke-width="0.7" fill="none"/>`;

/** Bình tưới (vẽ theo màn hình, bàn tay ở quai trên). */
const CAN = `<path d="M-4 5 Q2 -6 10 5" stroke="${L}" stroke-width="3.6" fill="none"/><path d="M-4 5 Q2 -6 10 5" stroke="#16A34A" stroke-width="2.2" fill="none"/>
  <rect x="-8" y="4" width="22" height="18" rx="3" fill="#22C55E" stroke="${L}" stroke-width="0.9"/><path d="M14 9 L30 2" stroke="${L}" stroke-width="4.4" stroke-linecap="round"/><path d="M14 9 L30 2" stroke="#22C55E" stroke-width="2.8" stroke-linecap="round"/>
  <ellipse cx="31" cy="1.6" rx="2.6" ry="3.6" fill="#16A34A" stroke="${L}" stroke-width="0.7" transform="rotate(-24 31 1.6)"/>`;
const PROPS = {
  e097_canHang: `<g transform="translate(-3 -2)">${CAN}</g>`,
  e097_canPour: `<g transform="rotate(118) translate(-3 -2)">${CAN}</g>`, // tay ngang (pose e097_pour): bình nghiêng, vòi chúc xuống
  e097_canPourHi: `<g transform="rotate(178) translate(-3 -2)">${CAN}</g>`, // tay giơ cao (e097_pourHi): trẻ em tưới cốc trên bậu cửa sổ
};
const POSES = {
  e097_pour: { R: [72, 88], L: [10, 4], head: 6 },
  e097_pourHi: { R: [128, 148], L: [10, 4], head: 4 },
  e097_scratch: { R: [150, 240], L: [10, 4], head: 8 },
  e097_sitScratch: { R: [150, 240], L: [22, -40], dy: 20, head: 8 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const SUN_I = (r = 11) => `<circle r="${r}" fill="#FDE047" stroke="#F59E0B" stroke-width="1.4"/>${Array.from({ length: 8 }, (_, i) => `<path d="M0 ${-r - 3} V${-r - 7}" stroke="#F59E0B" stroke-width="2.2" stroke-linecap="round" transform="rotate(${i * 45})"/>`).join('')}`;
const DROP_I = `<path d="M0 -12 Q9 0 0 8 Q-9 0 0 -12Z" fill="#38BDF8" stroke="#0369A1" stroke-width="1.2"/>`;
const bubble = (x, y, inner, r = 20) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#fff" stroke="${L}" stroke-width="1.2"/>${inner}</g>`;
const NO = `<path d="M-14 -14 L14 14" stroke="#DC2626" stroke-width="3.4" stroke-linecap="round"/>`;
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

function bg() {
  return `
  ${room(0, W, FLOOR, '#ECFCCB', '#D9A066')}
  <!-- bảng -->
  <rect x="${X.board - 6}" y="54" width="232" height="132" rx="4" fill="#A16207" stroke="${L}"/><rect x="${X.board}" y="60" width="220" height="120" fill="#166534"/>
  <text x="${X.board + 110}" y="82" text-anchor="middle" ${NUN} font-size="16" fill="#FDE68A">SCIENCE</text>
  <g class="e097-q"><text x="${X.board + 110}" y="110" text-anchor="middle" ${NUN} font-size="17" fill="#F8FAFC">What do plants need?</text></g>
  <g class="e097-qi"><g transform="translate(${X.board + 62} 148)">${SUN_I(12)}</g><g transform="translate(${X.board + 110} 150) scale(1.1)">${DROP_I}</g>
    <text x="${X.board + 160}" y="160" text-anchor="middle" ${NUN} font-size="30" fill="#FDE68A">?</text></g>
  <!-- tranh cây trên tường -->
  <g transform="translate(272 70)"><rect x="-24" y="-20" width="48" height="56" rx="3" fill="#fff" stroke="${L}"/><g transform="translate(0 28) scale(0.55)">${TALL}</g></g>
  <!-- bàn cô: khay cốc, túi hạt -->
  ${table(X.table, FLOOR - 62, 96, FLOOR, '#B45309')}
  <g class="e097-tray"><g transform="translate(${X.table - 12} ${FLOOR - 62})">${TRAY}</g></g>
  <g transform="translate(${X.table + 32} ${FLOOR - 62})"><path d="M-10 0 Q-12 -20 -6 -22 L6 -22 Q12 -20 10 0Z" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/><path d="M-6 -22 L-8 -27 M6 -22 L8 -27" stroke="${L}" stroke-width="0.9"/>
    <text x="0" y="-8" text-anchor="middle" ${NUN} font-size="6" fill="#92400E">BEANS</text></g>
  <!-- lịch tường -->
  <g transform="translate(${X.cal} 62)"><rect x="-30" y="0" width="60" height="58" rx="4" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-30" y="0" width="60" height="16" rx="4" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    <circle cx="-14" cy="0" r="2.4" fill="#475569"/><circle cx="14" cy="0" r="2.4" fill="#475569"/>
    ${DAYS.map((d, i) => `<g class="e097-day e097-d${i + 1}"><text x="0" y="12" text-anchor="middle" ${NUN} font-size="9" fill="#fff">${d}</text><text x="0" y="46" text-anchor="middle" ${NUN} font-size="26" fill="#1E3A8A">${i + 1}</text></g>`).join('')}
    <g class="e097-day e097-d8"><text x="0" y="12" text-anchor="middle" ${NUN} font-size="9" fill="#fff">MON</text><text x="0" y="46" text-anchor="middle" ${NUN} font-size="26" fill="#DC2626">8</text></g></g>
  <!-- cửa sổ nắng + bậu -->
  ${windowBox(X.win, 66, 140, 104)}
  <g transform="translate(${X.win + 112} 92)">${SUN_I(13)}</g>
  <path class="e097-beam" d="M${X.win} 170 L${X.win + 140} 170 L${X.sill1 + 10} ${SILL} L${X.sill0 + 30} ${SILL}Z" fill="#FEF08A"/>
  <rect x="${X.sill0}" y="${SILL}" width="${X.sill1 - X.sill0}" height="9" rx="2" fill="#F5F5F4" stroke="${L}"/>
  <path d="M${X.sill0 + 6} ${SILL + 9} h${X.sill1 - X.sill0 - 12} l-6 8 h${-(X.sill1 - X.sill0 - 24)}Z" fill="#E7E5E4" stroke="${L}" stroke-width="0.8"/>
  <g class="e097-flood"><ellipse cx="${X.D}" cy="${SILL + 1}" rx="30" ry="3.4" fill="#7DD3FC" stroke="#0284C7" stroke-width="0.8"/>
    <path d="M${X.D - 28} ${SILL + 2} q-3 10 -1 22 M${X.D + 26} ${SILL + 3} q2 8 0 18" stroke="#38BDF8" stroke-width="2.4" fill="none" stroke-linecap="round" class="e097-drip"/></g>
  ${cup(X.D, SILL, 'D', 1, 'e097-full')}${cup(X.Wc, SILL, 'W', 1, 'e097-grow')}${cup(X.C2, SILL, 'C2', 1, 'e097-grow')}
  <!-- tủ tối -->
  <rect x="${X.cup0 - 6}" y="96" width="${X.cup1 - X.cup0 + 12}" height="${FLOOR - 96}" rx="3" fill="#92400E" stroke="${L}" stroke-width="1.3"/>
  <rect x="${X.cup0}" y="104" width="${X.cup1 - X.cup0}" height="${FLOOR - 112}" fill="#1E1B2E"/>
  <rect x="${X.cup0}" y="${SILL}" width="${X.cup1 - X.cup0}" height="5" fill="#3F2A1D"/><rect x="${X.cup0}" y="236" width="${X.cup1 - X.cup0}" height="5" fill="#3F2A1D"/>
  ${cup(X.C, SILL, 'C', 1, 'e097-grow')}
  <g class="e097-doorL"><rect x="${X.cup0}" y="104" width="40" height="${FLOOR - 112}" fill="#B45309" stroke="${L}"/><circle cx="${X.cup0 + 34}" cy="190" r="2.6" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/></g>
  <g class="e097-doorR"><rect x="${X.cup0 + 40}" y="104" width="40" height="${FLOOR - 112}" fill="#B45309" stroke="${L}"/><circle cx="${X.cup0 + 46}" cy="190" r="2.6" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/></g>
  <!-- kệ chậu cây bên phải -->
  <rect x="955" y="150" width="45" height="6" fill="#A16207" stroke="${L}"/><g transform="translate(978 150) scale(0.7)">${cupStatic('tall')}</g>`;
}

function fg() {
  const thinkTom = `<g transform="translate(-24 6) scale(1.05)">${CAN.replace(/#22C55E/g, '#22C55E')}</g>${NO.replace('-14 -14 L14 14', '-26 -14 L22 26')}`;
  const thinkHoa = `<g transform="translate(-40 14) scale(0.62)">${cupStatic()}${CRACK.replace('<path', '<path transform="translate(0 -26)"')}</g><text x="-40" y="-12" text-anchor="middle" ${NUN} font-size="14" fill="#DC2626">✕</text>
    <path d="M-14 0 H12" stroke="${L}" stroke-width="1.4"/><text x="0" y="-6" text-anchor="middle" ${NUN} font-size="9" fill="#475569">unless</text>
    <g transform="translate(38 14) scale(0.62)">${cupStatic()}<g transform="translate(0 -26)">${SPROUT}</g></g><g transform="translate(48 -16) scale(0.55)">${DROP_I}</g>`;
  return `
  ${desk(X.minh, FLOOR, '#FB923C')}${desk(X.tom, FLOOR)}
  ${cup(X.minh - 24, FLOOR - 56, 'M', 0.56, 'e097-mc')}${cup(X.minh + 24, FLOOR - 56, 'M', 0.56, 'e097-mc')}
  ${cup(X.tom - 24, FLOOR - 56, 'T', 0.56, 'e097-tc')}${cup(X.tom + 24, FLOOR - 56, 'T', 0.56, 'e097-tc')}
  <!-- biểu tượng điều kiện -->
  <g class="e097-ic e097-ic-dark">${bubble(X.C2 + 8, 96, `<g transform="scale(0.9)">${SUN_I(9)}</g>${NO}`, 18)}</g>
  <g class="e097-ic e097-ic-yes">${bubble(X.Wc - 22, 72, `<g transform="scale(0.85)">${SUN_I(9)}</g>`, 17)}${bubble(X.Wc + 18, 72, `<g transform="scale(0.85)">${DROP_I}</g>`, 17)}<text x="${X.Wc - 2}" y="78" text-anchor="middle" ${NUN} font-size="16" fill="#16A34A">+</text></g>
  <g class="e097-ic e097-ic-much">${bubble(X.D, 92, `<g transform="translate(-8 2) scale(0.7)">${DROP_I}</g><g transform="translate(8 2) scale(0.7)">${DROP_I}</g><g transform="translate(0 -8) scale(0.7)">${DROP_I}</g>`, 18)}</g>
  <!-- nhãn -->
  <g class="e097-lb e097-lb-seeds">${label(X.minh + 40, 64, 'two bean seeds', '#A16207', 13)}${label(X.minh + 40, 92, 'two cups of soil', '#92400E', 13)}</g>
  <g class="e097-lb e097-lb-test">${label(X.board + 110, 214, 'test what plants need', '#15803D', 14)}</g>
  <g class="e097-lb e097-lb-window">${label(X.Wc, 54, 'by the window', '#CA8A04', 13)}</g>
  <g class="e097-lb e097-lb-dark">${label(X.C, 86, 'a dark cupboard', '#4338CA', 13)}</g>
  <g class="e097-lb e097-lb-every">${label(X.cal - 22, 138, 'every day', '#2563EB', 13)}</g>
  <g class="e097-lb e097-lb-week">${label(X.cal - 26, 138, 'after a week', '#DC2626', 13)}</g>
  <g class="e097-lb e097-lb-tall">${label(X.Wc - 6, 264, 'tall and green', '#16A34A', 12)}</g>
  <g class="e097-lb e097-lb-pale">${label(X.C2 - 34, 238, 'pale and thin', '#65A30D', 12)}</g>
  <g class="e097-lb e097-lb-yellow">${label(X.C2 - 10, 58, 'turns yellow', '#CA8A04', 13)}</g>
  <g class="e097-lb e097-lb-strong">${label(X.Wc - 40, 238, 'green and strong', '#15803D', 13)}</g>
  <g class="e097-lb e097-lb-soft">${label(X.D - 10, 238, 'roots go soft', '#A16207', 13)}</g>
  <g class="e097-lb e097-lb-nogrow">${label(X.tom, 302, "didn't grow at all", '#DC2626', 13)}</g>
  <g class="e097-lb e097-lb-unless">${label(472, 136, 'unless you water them', '#0369A1', 13)}</g>
  <g class="e097-lb e097-lb-again">${label(X.tom + 30, 140, 'try again', '#16A34A', 14)}</g>
  ${thought(X.tom + 28, 112, 104, 62, thinkTom, [X.tom + 4, 170], 'e097-th e097-th-tom')}
  ${thought(472, 78, 150, 66, thinkHoa, [482, 112], 'e097-th e097-th-hoa')}`;
}

const LB = ['seeds', 'test', 'window', 'dark', 'every', 'week', 'tall', 'pale', 'yellow', 'strong', 'soft', 'nogrow', 'unless', 'again'];
const CSS = `
.e097-lb, .e097-ic, .e097-th { opacity: 0; transition: opacity .35s; }
${LB.map((k) => `.st-lb-${k} .e097-lb-${k}`).join(', ')} { opacity: 1; }
.st-ic-dark .e097-ic-dark, .st-ic-yes .e097-ic-yes, .st-ic-much .e097-ic-much, .st-th-tom .e097-th-tom, .st-th-hoa .e097-th-hoa { opacity: 1; }
.e097-q { clip-path: inset(0 100% 0 0); } .e097-qi { opacity: 0; transition: opacity .3s; }
.st-board .e097-q { clip-path: inset(0 0 0 0); transition: clip-path 1.6s linear; }
.st-qi .e097-qi { opacity: 1; }
/* cốc: hiện khi được đặt */
.e097-cup { opacity: 0; transition: opacity .25s; }
.st-mcups .e097-k-M, .st-tcups .e097-k-T, .st-wcup .e097-k-W, .st-ccup .e097-k-C, .st-side .e097-k-C2, .st-demo .e097-k-D { opacity: 1; }
.st-mgone .e097-k-M, .st-taken .e097-k-C { opacity: 0; }
.e097-tray { transition: opacity .3s; } .st-mcups .e097-tray { opacity: .35; } .st-tcups .e097-tray { opacity: 0; }
/* cây lớn dần */
.e097-pg { opacity: 0; transform: scale(.2); transform-box: fill-box; transform-origin: 50% 100%; transition: opacity .5s, transform 1s cubic-bezier(.3,1.3,.6,1); }
.e097-wl, .e097-soft, .e097-crack { opacity: 0; transition: opacity .6s; }
.st-sprout .e097-grow .e097-sp { opacity: 1; transform: none; }
.st-sprout .e097-grow .e097-seed { opacity: 0; }
.st-week .e097-grow .e097-sp { opacity: 0; }
.st-week .e097-k-W .e097-tall, .st-week .e097-k-C .e097-pale, .st-week .e097-k-C2 .e097-pale, .e097-full .e097-tall { opacity: 1; transform: none; }
.e097-full .e097-seed { opacity: 0; }
.e097-pl, .e097-ps { transition: fill 1.6s, stroke 1.6s; }
.st-yellow .e097-pl { fill: #FDE047; } .st-yellow .e097-ps { stroke: #EAB308; }
.st-strong .e097-k-W .e097-tall { animation: e097Strong .5s ease-in-out 3 alternate; }
@keyframes e097Strong { from { transform: scale(1); } to { transform: scale(1.12, 1.08); } }
/* quá nhiều nước: mực nước dâng, tràn bậu, rễ mềm nhũn, cây rũ */
.st-flood .e097-k-D .e097-wl { opacity: 1; }
.st-flood .e097-k-D .e097-roots { opacity: 0; transition: opacity .8s .6s; }
.st-flood .e097-k-D .e097-soft { opacity: 1; transition: opacity .8s .6s; }
.st-flood .e097-k-D .e097-tall { transform: rotate(-14deg) scaleY(.92); transition: transform 1.4s ease-in .8s; }
.e097-flood { opacity: 0; transition: opacity .5s; } .st-flood .e097-flood { opacity: 1; }
.st-flood .e097-drip { animation: e097Drip .7s linear infinite; }
@keyframes e097Drip { from { stroke-dasharray: 3 30; stroke-dashoffset: 0; } to { stroke-dasharray: 3 30; stroke-dashoffset: -33; } }
/* đất khô nứt / đất ướt */
.e097-soil { transition: fill .8s; }
.st-dry .e097-tc .e097-soil { fill: #C2884D; } .st-dry .e097-tc .e097-crack { opacity: 1; }
.st-twater .e097-tc .e097-soil { fill: #4A2507; } .st-twater .e097-tc .e097-crack { opacity: 0; }
/* tủ: cửa mở */
.e097-doorL { transform-origin: ${X.cup0}px 0; transition: transform .45s ease-out; }
.e097-doorR { transform-origin: ${X.cup1}px 0; transition: transform .45s ease-out; }
.st-open .e097-doorL, .st-open .e097-doorR { transform: scaleX(.12); }
/* nắng qua cửa sổ */
.e097-beam { opacity: .25; transition: opacity .6s; animation: e097Beam 2.6s ease-in-out infinite alternate; }
@keyframes e097Beam { to { opacity: .4; } }
.st-beam .e097-beam { opacity: .7; animation: none; }
/* lịch */
.e097-day { opacity: 0; transition: opacity .15s; }
${[1, 2, 3, 4, 5, 6, 7, 8].map((i) => `.st-d${i} .e097-d${i}`).join(', ')} { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .st-strong .e097-k-W .e097-tall { animation-duration: 1.2s; }
  .e097-beam { animation-duration: 6s; } .st-flood .e097-drip { animation-duration: 1.6s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const day = (st, d) => { for (let i = 1; i <= 8; i++) st.set(`st-d${i}`, i === d); };

const BEATS = [
  { key: ['two bean seeds', 'two cups of soil'], icon: '🫘', label: 'two seeds, two cups', async play(st) {
    st.look(430);
    st.chest('hoa', TRAY); st.pose('hoa', 'carry');
    await st.walk('hoa', X.minh - 36, { speed: 110, follow: false });
    st.pose('hoa', 'give'); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(SEED, [X.minh - 10, 200], [X.minh, 222], { size: 14, dur: 420 });
    st.set('st-mcups'); st.sfx('bowl-down', { vol: 0.6 }); st.set('st-lb-seeds'); st.mood('minh', 'joy');
    await st.wait(500);
    st.pose('hoa', 'carry');
    await st.walk('hoa', X.tom - 36, { speed: 110, follow: false });
    st.pose('hoa', 'give'); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(SEED, [X.tom - 10, 200], [X.tom, 222], { size: 14, dur: 420 });
    st.set('st-tcups'); st.sfx('bowl-down', { vol: 0.6 }); st.mood('tom', 'joy'); st.chest('hoa', null);
    await st.wait(700);
    st.pose('hoa', 'stand');
  } },
  { key: ['test what plants need'], icon: '🧪', label: 'test what plants need', async play(st) {
    st.set('st-lb-seeds', false);
    st.look(205);
    await st.walk('hoa', X.hoa, { speed: 120, follow: false });
    st.face('hoa', -1); st.pose('hoa', 'pointUp');
    st.set('st-board');
    await st.loop('pencil', () => st.wait(1600), { vol: 0.8 });
    st.set('st-qi'); st.sfx('ding', { vol: 0.5 });
    st.face('hoa', 1); st.pose('hoa', 'open'); st.talk('hoa', true); st.set('st-lb-test');
    await st.wait(1300);
    st.talk('hoa', false); st.pose('hoa', 'stand');
  } },
  { key: ['one cup by the window', 'one in a dark cupboard'], icon: '🪟', label: 'window · cupboard', async play(st) {
    st.set('st-lb-test', false);
    st.look(600);
    st.set('st-mgone'); st.chest('minh', CHEST_TWO); st.pose('minh', 'carry'); st.mood('minh', 'happy');
    await st.walk('minh', X.mst, { speed: 130, lead: 0 });
    st.face('minh', -1); st.chest('minh', CHEST_ONE); st.pose('minh', 'reach');
    st.set('st-wcup'); st.sfx('bowl-down', { vol: 0.6 }); st.set('st-lb-window');
    await st.wait(800);
    st.face('minh', 1); st.pose('minh', 'give');
    st.set('st-open'); st.sfx('wardrobe-open', { vol: 0.6 });
    await st.wait(450);
    st.chest('minh', null); st.set('st-ccup'); st.sfx('bowl-down', { vol: 0.5 }); st.set('st-lb-dark');
    await st.wait(600);
    st.set('st-open', false); st.sfx('click', { vol: 0.6 }); st.pose('minh', 'stand');
    await st.wait(500);
  } },
  { key: ['watered both cups every day'], icon: '💧', label: 'every day', async play(st) {
    off(st, 'st-lb-window', 'st-lb-dark');
    st.look(720);
    st.hold('minh', 'e097_canHang'); st.set('st-lb-every');
    // một tuần trôi qua trên lịch, mỗi ngày Minh tưới cả hai cốc
    for (let d = 1; d <= 3; d++) {
      day(st, d); st.sfx('tick', { vol: 0.5 });
      st.face('minh', -1); st.hold('minh', 'e097_canPourHi'); st.pose('minh', 'e097_pourHi');
      st.fx('drops', X.Wc + 4, 152, { quiet: true }); st.sfx('pour', { vol: 0.5 });
      await st.wait(650);
      st.face('minh', 1); st.set('st-open'); st.sfx('wardrobe-open', { vol: 0.35 });
      st.fx('drops', X.C - 4, 152, { quiet: true }); st.sfx('pour', { vol: 0.45 });
      await st.wait(650);
      st.set('st-open', false);
      if (d === 2) { st.set('st-sprout'); st.sfx('pop', { vol: 0.6 }); }
    }
    for (let d = 4; d <= 7; d++) { day(st, d); st.sfx('tick', { vol: 0.45 }); await st.wait(260); }
    st.hold('minh', 'e097_canHang'); st.pose('minh', 'stand');
    await st.wait(300);
  } },
  { key: ['After a week', 'tall and green', 'pale and thin'], icon: '🌱', label: 'tall · pale', async play(st) {
    st.set('st-lb-every', false);
    st.look(740);
    st.hold('minh', null);
    day(st, 8); st.set('st-week'); st.set('st-lb-week'); st.sfx('page-turn', { vol: 0.6 });
    st.set('st-lb-tall'); st.mood('minh', 'wow');
    const hoa = st.walk('hoa', X.sill0 - 6, { speed: 150, follow: false });
    await st.wait(700);
    st.face('minh', 1); st.pose('minh', 'give'); st.set('st-open'); st.sfx('wardrobe-open', { vol: 0.6 });
    await st.wait(500);
    st.set('st-taken'); st.chest('minh', CHEST_PALE); st.pose('minh', 'carry');
    await st.wait(300);
    st.set('st-open', false); st.sfx('click', { vol: 0.5 });
    await st.walk('minh', X.C2 + 58, { speed: 110, follow: false });
    st.pose('minh', 'reach'); st.chest('minh', null); st.set('st-side'); st.sfx('bowl-down', { vol: 0.6 });
    st.set('st-lb-pale');
    await st.wait(400);
    await st.walk('minh', X.mst + 10, { speed: 110, follow: false });
    st.face('minh', -1);
    await hoa;
    st.face('hoa', 1); st.mood('hoa', 'wow');
    await st.wait(500);
  } },
  { key: ["If a plant doesn't get light", 'it turns yellow'], icon: '🟡', label: 'turns yellow', async play(st) {
    off(st, 'st-lb-week', 'st-lb-tall', 'st-lb-pale');
    st.look(720);
    st.pose('hoa', 'point'); st.talk('hoa', true); st.mood('hoa', 'happy');
    st.set('st-ic-dark'); st.sfx('pop', { vol: 0.5 });
    await st.wait(900);
    st.set('st-yellow'); st.sfx('paint', { vol: 0.6 }); st.set('st-lb-yellow');
    st.mood('minh', 'sad');
    await st.wait(1500);
    st.talk('hoa', false);
  } },
  { key: ['enough light and water', 'green and strong'], icon: '☀️', label: 'green and strong', async play(st) {
    off(st, 'st-ic-dark', 'st-lb-yellow');
    st.look(720);
    st.pose('hoa', 'pointUp'); st.talk('hoa', true); st.mood('minh', 'happy');
    st.set('st-ic-yes'); st.set('st-beam'); st.sfx('ding', { vol: 0.4 });
    await st.wait(600);
    st.fx('drops', X.Wc, 140, { quiet: true }); st.sfx('drip', { vol: 0.7 });
    await st.wait(500);
    st.set('st-strong'); st.set('st-lb-strong'); st.sfx('whoosh', { vol: 0.35 }); st.mood('minh', 'joy');
    await st.wait(1400);
    st.talk('hoa', false); st.pose('hoa', 'stand');
  } },
  { key: ['too much water', 'their roots go soft'], icon: '🌊', label: 'roots go soft', async play(st) {
    off(st, 'st-ic-yes', 'st-lb-strong', 'st-beam', 'st-strong');
    st.look(700);
    st.pose('hoa', 'give'); st.set('st-demo'); st.sfx('bowl-down', { vol: 0.6 });
    st.set('st-ic-much');
    await st.wait(500);
    st.hold('hoa', 'e097_canPour'); st.pose('hoa', 'e097_pour');
    st.set('st-flood');
    await st.loop('pour', async () => {
      for (let i = 0; i < 3; i++) { st.fx('drops', X.D + 6, 156, { quiet: true }); await st.wait(450); }
    }, { vol: 0.9 });
    st.sfx('drip', { vol: 0.7 });
    st.set('st-lb-soft'); st.mood('minh', 'wow'); st.hold('hoa', 'e097_canHang'); st.pose('hoa', 'stand');
    await st.wait(1300);
  } },
  { key: ['Tom forgot to water his cups', "his seeds didn't grow at all"], icon: '🏜️', label: "didn't grow", async play(st) {
    off(st, 'st-ic-much', 'st-lb-soft');
    st.look(500);
    st.set('st-dry'); st.sfx('crunch', { vol: 0.5 });
    st.set('st-lb-nogrow');
    await st.wait(600);
    st.pose('tom', 'e097_sitScratch'); st.mood('tom', 'sad');
    st.set('st-th-tom'); st.sfx('buzz-no', { vol: 0.4 });
    await st.wait(1600);
  } },
  { key: ["Seeds don't grow unless you water them"], icon: '🚿', label: 'unless you water them', async play(st) {
    off(st, 'st-th-tom', 'st-lb-nogrow');
    st.look(480);
    await st.walk('hoa', 470, { speed: 130, follow: false });
    st.face('hoa', 1); st.pose('hoa', 'point'); st.talk('hoa', true);
    st.set('st-th-hoa'); st.sfx('pop', { vol: 0.5 });
    await st.wait(700);
    st.set('st-lb-unless'); st.sfx('drip', { vol: 0.6 });
    st.pose('tom', 'sitDesk'); st.act('tom', 'nod');
    await st.wait(1400);
    st.talk('hoa', false); st.act('tom', null);
  } },
  { key: ['Tom promised to try again'], icon: '🤞', label: 'try again', async play(st) {
    off(st, 'st-th-hoa', 'st-lb-unless');
    st.look(500);
    st.pose('hoa', 'give'); st.sfx('whoosh', { vol: 0.4 });
    st.hold('hoa', null);
    st.pose('tom', 'stand'); st.mood('tom', 'happy');
    await st.walk('tom', X.tom + 52, { speed: 100, follow: false });
    st.face('tom', -1); st.hold('tom', 'e097_canPour'); st.pose('tom', 'e097_pour'); st.pose('hoa', 'stand');
    st.fx('drops', X.tom + 4, 206, { quiet: true }); st.sfx('pour', { vol: 0.7 });
    await st.wait(700);
    st.set('st-twater');
    st.hold('tom', 'e097_canHang'); st.pose('tom', 'raise'); st.mood('tom', 'joy'); st.set('st-lb-again');
    await st.say('tom', 'I promise!', 1200);
    st.pose('hoa', 'clap'); st.act('hoa', 'clap'); st.mood('hoa', 'joy'); st.sfx('clap', { vol: 0.6 });
    await st.wait(900);
    st.act('hoa', null); st.pose('hoa', 'stand');
  } },
];

export default {
  id: 'en097', worldW: W, floor: FLOOR, viewTop: 40, camStart: 180, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 2, 3, 4, 8, 10],
  cast: [
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: X.hoa, s: 0.95, face: 1 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: X.minh, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: X.tom, face: -1 },
  ],
  init(st) {
    st.pose('minh', 'sitDesk'); st.pose('tom', 'sitDesk'); st.set('st-d1');
  },
};
