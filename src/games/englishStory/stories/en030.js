/**
 * Bài 30 "In the Library": hành lang trường (lịch TUESDAY) → cửa thư viện → bảng nội quy (cô Hoa dặn) → bồn rửa tay
 * → bàn đọc + lịch một tuần → giá sách bóng đá, giá sách con vật Úc → bàn mượn sách (thẻ tên, ngày trả).
 * Mỗi câu "must / mustn't" sáng một dòng trên bảng nội quy (dấu ✓ xanh = phải, ✗ đỏ = không được).
 * Toạ độ cảnh: rộng 1960, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, room, doorway, windowBox, books, rug, label, APPLE } from '../kit.js';

const FLOOR = 282;
const F = 'font-family="Nunito, sans-serif" font-weight="900"';

// ── Đồ vật ────────────────────────────────────────────────────────────────
const yes = (x, y) => `<g transform="translate(${x} ${y})"><circle r="9" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.8"/><path d="M-4 0 L-1 3.4 L4.6 -3.4" stroke="#16A34A" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const no = (x, y) => `<g transform="translate(${x} ${y})"><circle r="9" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.8"/><path d="M-4 -4 L4 4 M4 -4 L-4 4" stroke="#DC2626" stroke-width="2.6" stroke-linecap="round"/></g>`;
/** Biểu tượng nhỏ trên bảng nội quy (gốc giữa). */
const ICON = {
  quiet: `<circle r="9" fill="#FDDCB5" stroke="${L}" stroke-width="0.8"/><circle cx="-3" cy="-2" r="1.2" fill="${L}"/><circle cx="3" cy="-2" r="1.2" fill="${L}"/><path d="M0 1 V9" stroke="#F59E0B" stroke-width="2.6" stroke-linecap="round"/>`,
  run: `<circle cx="2" cy="-8" r="3.4" fill="${L}"/><path d="M1 -4 L-1 3 L-6 9 M-1 3 L4 9 M0 -2 L-6 0 M0 -2 L6 -4" stroke="${L}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
  shout: `<path d="M-9 -3 H-4 L6 -9 V9 L-4 3 H-9Z" fill="#F59E0B" stroke="${L}" stroke-width="0.8"/><path d="M9 -5 q3 5 0 10" stroke="${L}" stroke-width="1.4" fill="none"/>`,
  food: `<g transform="translate(-4 2) scale(0.8)">${APPLE}</g><path d="M4 -6 H11 L10 8 H5Z" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M8 -6 L10 -11" stroke="#EF4444" stroke-width="1.4"/>`,
  wash: `<path d="M-8 6 Q-10 -2 -4 -4 L4 -4 Q10 -2 8 6Z" fill="#FDDCB5" stroke="${L}" stroke-width="0.8"/>${[-5, 0, 5].map((x) => `<circle cx="${x}" cy="-8" r="2" fill="#7DD3FC"/>`).join('')}`,
};
const row = (cls, y, ok, icons) => `<g class="e030-row ${cls}"><rect class="e030-hl" x="-62" y="${y - 12}" width="124" height="24" rx="6" fill="#FEF08A"/>
  ${icons.map((k, i) => `<g transform="translate(${-30 + i * 26} ${y})">${ICON[k]}</g>`).join('')}${ok ? yes(44, y) : no(44, y)}</g>`;

/** Sách cầm trước ngực (gốc giữa ngực), bìa có hình; mặt cười hiện khi "Books are our friends". */
const BFACE = `<g class="e030-bface"><circle cx="-4" cy="-3" r="1.4" fill="${L}"/><circle cx="4" cy="-3" r="1.4" fill="${L}"/><path d="M-4 2 q4 4 8 0" stroke="${L}" stroke-width="1.3" fill="none" stroke-linecap="round"/></g>`;
const BALL_IC = `<circle r="6" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M0 -2.4 l2.3 1.7 -0.9 2.7 h-2.8 l-0.9 -2.7Z" fill="#1F2937"/>`;
const ROO_IC = `<path d="M-6 6 Q-8 -2 -2 -4 L0 -10 L2 -9 L1 -4 Q6 -2 5 4 L8 7 H-8Z" fill="#D97706" stroke="${L}" stroke-width="0.7"/><circle cx="0.4" cy="-7" r="0.8" fill="${L}"/>`;
const coverBook = (c, ic) => `<rect x="-13" y="-16" width="26" height="32" rx="2" fill="${c}" stroke="${L}" stroke-width="1"/><rect x="-13" y="-16" width="4" height="32" fill="#000" opacity="0.15"/>
  <rect x="-7" y="-12" width="17" height="15" rx="2" fill="#fff" opacity="0.9"/><g transform="translate(1.5 -4.5)">${ic}</g>${`<g transform="translate(1.5 10)">${BFACE}</g>`}`;
const FOOT_BOOK = coverBook('#22C55E', BALL_IC);
const ROO_BOOK = coverBook('#F59E0B', ROO_IC);
const PINK_BOOK = coverBook('#EC4899', `<path d="M0 5 C-8 -1 -5 -7 0 -3 C5 -7 8 -1 0 5Z" fill="#EF4444"/>`);
const hug = (b) => `<g transform="translate(0 -4)">${b}</g>`;

/** Giá sách: 4 tầng, mỗi tầng một hàng sách; mặt cười trên vài cuốn. */
const bookcase = (x, title, c) => {
  const shelves = [96, 142, 188, 234].map((y, j) => `<rect x="${x - 58}" y="${y}" width="116" height="6" fill="#92400E" stroke="${L}" stroke-width="0.8"/>
    <g>${books(x - 52, y, 5)}</g><g>${books(x + 2, y, 5)}</g>
    <g class="e030-sface" style="transition-delay:${j * 0.12}s">${[x - 38, x + 16].map((bx) => `<g transform="translate(${bx} ${y - 11})"><circle cx="-1.6" cy="-2" r="0.9" fill="#fff"/><circle cx="1.6" cy="-2" r="0.9" fill="#fff"/><path d="M-2 1 q2 2 4 0" stroke="#fff" stroke-width="0.9" fill="none"/></g>`).join('')}</g>`).join('');
  return `<rect x="${x - 64}" y="56" width="128" height="226" rx="4" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="${x - 58}" y="62" width="116" height="214" fill="#78350F"/>
    ${shelves}<rect x="${x - 50}" y="36" width="100" height="22" rx="5" fill="#fff" stroke="${L}"/><text x="${x}" y="52" text-anchor="middle" ${F} font-size="13" fill="${c}">${title}</text>`;
};

const tap = (x) => `<path d="M${x} 196 V184 H${x + 12}" stroke="#94A3B8" stroke-width="4" fill="none" stroke-linecap="round"/><path class="e030-water" d="M${x + 11} 188 V206" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" stroke-dasharray="4 4"/>`;

function bg() {
  const tiles = Array.from({ length: 15 }, (_, i) => `<path d="M${i * 30} ${FLOOR} V315" stroke="#94A3B8" stroke-width="1"/>`).join('');
  return `
  <!-- Hành lang -->
  <rect x="0" y="0" width="460" height="${FLOOR}" fill="#E0E7FF"/><rect x="0" y="170" width="460" height="${FLOOR - 170}" fill="#C7D2FE"/>
  <rect x="0" y="0" width="460" height="12" fill="#E9D5B5" stroke="${L}"/><rect x="0" y="${FLOOR}" width="460" height="${315 - FLOOR}" fill="#CBD5E1" stroke="${L}"/>${tiles}
  <rect x="40" y="128" width="64" height="154" rx="4" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="50" y="140" width="44" height="40" rx="3" fill="#BAE6FD" stroke="${L}"/><circle cx="96" cy="212" r="3" fill="#FDE68A"/>
  ${label(72, 118, 'CLASS 3A', '#1D4ED8', 12)}
  ${windowBox(160, 70, 100, 80)}
  <g transform="translate(350 64)"><rect x="-50" y="0" width="100" height="74" rx="6" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-50" y="0" width="100" height="18" rx="6" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    <circle cx="-26" cy="0" r="3" fill="#1F2937"/><circle cx="26" cy="0" r="3" fill="#1F2937"/>
    <text x="0" y="46" text-anchor="middle" ${F} font-size="16" fill="#DC2626">TUESDAY</text><text x="0" y="64" text-anchor="middle" ${F} font-size="10" fill="#64748B">today</text>
    <circle class="e030-tueglow" cx="0" cy="40" r="44" fill="none" stroke="#FACC15" stroke-width="4"/></g>
  <!-- Thư viện -->
  ${room(460, 1500, FLOOR, '#FEF3C7', '#D9A066')}
  ${doorway(462, FLOOR)}
  <rect x="420" y="16" width="120" height="26" rx="6" fill="#1D4ED8" stroke="${L}"/><text x="480" y="35" text-anchor="middle" ${F} font-size="15" fill="#fff">LIBRARY</text>
  <!-- Giỏ để đồ ăn ở cửa -->
  <rect x="500" y="236" width="70" height="46" rx="3" fill="#FDE68A" stroke="${L}"/><text x="535" y="264" text-anchor="middle" ${F} font-size="11" fill="#B45309">FOOD</text>
  <path d="M505 236 Q535 222 565 236" stroke="${L}" stroke-width="2" fill="none"/>
  <g class="e030-binapple" transform="translate(548 234)"><g transform="scale(0.8)">${APPLE}</g></g>
  <!-- Bảng nội quy -->
  <g transform="translate(680 0)"><rect x="-70" y="40" width="140" height="150" rx="6" fill="#fff" stroke="${L}" stroke-width="1.4"/>
    <rect x="-70" y="40" width="140" height="24" rx="6" fill="#16A34A" stroke="${L}" stroke-width="1.4"/><text x="0" y="57" text-anchor="middle" ${F} font-size="13" fill="#fff">RULES</text>
    ${row('e030-r1', 80, true, ['quiet'])}${row('e030-r2', 106, false, ['run', 'shout'])}${row('e030-r3', 132, false, ['food'])}${row('e030-r4', 158, true, ['wash'])}
    <text x="0" y="182" text-anchor="middle" ${F} font-size="9" fill="#64748B">Shh!</text></g>
  <!-- Bồn rửa tay -->
  <rect x="790" y="120" width="170" height="70" rx="4" fill="#E0F2FE" stroke="#A16207" stroke-width="3"/><path d="M806 140 l18 -12 M820 156 l30 -22" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <rect x="860" y="232" width="20" height="50" fill="#fff" stroke="${L}"/>
  <path d="M790 206 H960 Q956 230 930 232 H820 Q794 230 790 206Z" fill="#fff" stroke="${L}" stroke-width="1.2"/>
  ${tap(822)}${tap(866)}${tap(910)}
  <g transform="translate(948 198)"><rect x="-6" y="-9" width="12" height="17" rx="3" fill="#F9A8D4" stroke="${L}"/><path d="M0 -9 V-15 H5" stroke="${L}" stroke-width="1.4" fill="none"/></g>
  <!-- Lịch một tuần -->
  <g transform="translate(1150 54)"><rect x="-116" y="0" width="232" height="70" rx="6" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <text x="0" y="16" text-anchor="middle" ${F} font-size="11" fill="#1D4ED8">ONE WEEK</text>
    ${['TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE'].map((d, i) => `<g transform="translate(${-98 + i * 28} 40)">
      <rect class="e030-day" style="transition-delay:${i * 0.18}s" x="-12" y="-14" width="24" height="28" rx="3" fill="${i === 7 ? '#FEE2E2' : '#F1F5F9'}" stroke="${L}" stroke-width="0.8"/>
      <text x="0" y="4" text-anchor="middle" ${F} font-size="8" fill="${i === 7 ? '#DC2626' : '#475569'}">${d}</text></g>`).join('')}
    <g class="e030-back"><circle cx="98" cy="40" r="16" fill="none" stroke="#DC2626" stroke-width="2.4"/><text x="98" y="66" text-anchor="middle" ${F} font-size="9" fill="#DC2626">BACK</text></g>
    <path class="e030-arrow" d="M-98 58 H88" stroke="#22C55E" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="6 5"/></g>
  <path d="M1150 236 V176 Q1150 166 1160 166 H1180 Q1190 166 1190 176 V236" fill="#F59E0B" stroke="${L}" stroke-width="1.2"/><path d="M1146 236 H1194" stroke="${L}" stroke-width="3"/>
  <!-- Giá sách -->
  ${bookcase(1370, 'SPORTS', '#16A34A')}
  ${bookcase(1530, 'ANIMALS', '#D97706')}
  <g class="e030-gapF"><rect x="1381" y="164" width="9" height="24" fill="#22C55E" stroke="${L}" stroke-width="0.7"/></g>
  <g class="e030-gapA"><rect x="1541" y="210" width="9" height="24" fill="#F59E0B" stroke="${L}" stroke-width="0.7"/></g>
  <g class="e030-tilt"><rect x="1574" y="72" width="9" height="24" fill="#EC4899" stroke="${L}" stroke-width="0.7"/></g>
  ${rug(1150, FLOOR, 200, '#BFDBFE')}${rug(1460, FLOOR, 260, '#FDE68A')}
  <!-- Bàn mượn sách -->
  <g transform="translate(1720 0)"><rect x="-40" y="120" width="80" height="54" rx="4" fill="#fff" stroke="${L}"/><path d="M-30 136 H30 M-30 148 H20 M-30 160 H26" stroke="#CBD5E1" stroke-width="3"/>
    ${label(0, 112, 'BORROW', '#7C3AED', 11)}</g>
  ${books(1870, 238, 5)}<rect x="1862" y="238" width="60" height="6" fill="#92400E" stroke="${L}" stroke-width="0.8"/>
  <path d="M1900 160 q-16 -30 4 -56 q12 22 -4 56Z M1900 160 q12 -26 34 -30 q-8 22 -34 30Z" fill="#22C55E" stroke="${L}"/>
  <rect x="1886" y="160" width="28" height="30" rx="4" fill="#F97316" stroke="${L}"/><rect x="1880" y="190" width="40" height="48" fill="#B45309" stroke="${L}"/>
  <!-- Thẻ mượn sách phóng to -->
  <g class="e030-pop e030-cardbig"><g transform="translate(1694 70)"><rect x="-74" y="-2" width="148" height="86" rx="6" fill="#FFFBEB" stroke="${L}" stroke-width="1.4"/>
    <rect x="-74" y="-2" width="148" height="18" rx="6" fill="#7C3AED" stroke="${L}" stroke-width="1.4"/><text x="0" y="12" text-anchor="middle" ${F} font-size="11" fill="#fff">LIBRARY CARD</text>
    <text x="-64" y="40" ${F} font-size="11" fill="#64748B">Name:</text><path d="M-24 42 H64" stroke="#CBD5E1" stroke-width="1.2"/>
    <g class="e030-name"><text x="-20" y="40" ${F} font-size="17" fill="#1D4ED8">MINH</text></g>
    <text x="-64" y="70" ${F} font-size="11" fill="#64748B">Back:</text><path d="M-24 72 H64" stroke="#CBD5E1" stroke-width="1.2"/>
    <text x="-20" y="70" ${F} font-size="14" fill="#DC2626">TUESDAY</text>
    <g class="e030-date"><ellipse cx="18" cy="65" rx="46" ry="13" fill="none" stroke="#DC2626" stroke-width="2.2"/><text x="72" y="58" ${F} font-size="20" fill="#DC2626">!</text></g></g></g>
  <!-- Bong bóng nghĩ của Tom: sách → nhà -->
  <g class="e030-pop e030-think"><g transform="translate(906 74)"><circle cx="-18" cy="40" r="3" fill="#fff" stroke="${L}"/><circle cx="-10" cy="30" r="5" fill="#fff" stroke="${L}"/>
    <ellipse cx="10" cy="0" rx="50" ry="26" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <g transform="translate(-16 0) scale(0.7)">${PINK_BOOK}</g><path d="M2 0 H14 M10 -4 L14 0 L10 4" stroke="#22C55E" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <g transform="translate(36 6)"><path d="M-14 -4 L0 -16 L14 -4Z" fill="#EF4444" stroke="${L}"/><rect x="-11" y="-4" width="22" height="16" fill="#FDE68A" stroke="${L}"/><rect x="-3" y="2" width="6" height="10" fill="#B45309"/></g>
    <text x="10" y="-12" text-anchor="middle" ${F} font-size="14" fill="#7C3AED">?</text></g></g>`;
}

/** Lớp trước nhân vật: bàn đọc, bàn mượn sách (che chân), thẻ nhỏ trên bàn. */
function fg() {
  return `
  <rect x="1060" y="228" width="12" height="54" fill="#92400E" stroke="${L}"/><rect x="1228" y="228" width="12" height="54" fill="#92400E" stroke="${L}"/>
  <rect x="1046" y="220" width="208" height="10" rx="3" fill="#F59E0B" stroke="${L}" stroke-width="1.2"/>
  <g transform="translate(1110 220)"><g transform="scale(0.6) translate(0 -14)">${PINK_BOOK}</g></g>
  <g transform="translate(1720 0)"><rect x="-56" y="226" width="112" height="56" rx="3" fill="#8B5CF6" stroke="${L}" stroke-width="1.2"/><rect x="-60" y="220" width="120" height="9" rx="3" fill="#C4B5FD" stroke="${L}"/>
    <rect x="-46" y="238" width="92" height="30" rx="3" fill="#7C3AED" stroke="${L}" stroke-width="0.8"/>
    <g transform="translate(-14 216)"><rect x="-12" y="-6" width="24" height="9" rx="1.5" fill="#FFFBEB" stroke="${L}" stroke-width="0.8" transform="skewX(-20)"/></g>
    <g transform="translate(26 212)"><rect x="-5" y="-8" width="10" height="10" rx="2" fill="#DC2626" stroke="${L}" stroke-width="0.8"/><rect x="-2" y="-16" width="4" height="9" fill="#78350F"/></g></g>`;
}

const CSS = `
.e030-tueglow { opacity: 0; transition: opacity .4s; }
.st-tue .e030-tueglow { opacity: 1; animation: e030Pulse .6s ease-in-out infinite alternate; }
@keyframes e030Pulse { from { opacity: .4; } to { opacity: 1; } }
.e030-row { opacity: .45; transition: opacity .4s; }
.e030-hl { opacity: 0; transition: opacity .4s; }
.st-r1 .e030-r1, .st-r2 .e030-r2, .st-r3 .e030-r3, .st-r4 .e030-r4, .st-rall .e030-row { opacity: 1; }
.st-h1 .e030-r1 .e030-hl, .st-h2 .e030-r2 .e030-hl, .st-h3 .e030-r3 .e030-hl, .st-h4 .e030-r4 .e030-hl { opacity: 1; }
.e030-binapple { opacity: 0; transition: opacity .2s; } .st-binapple .e030-binapple { opacity: 1; }
.e030-water { opacity: 0; transition: opacity .3s; animation: e030Flow .3s linear infinite; }
.st-tap .e030-water { opacity: 1; }
@keyframes e030Flow { to { stroke-dashoffset: -8; } }
.e030-pop { opacity: 0; transform: scale(.6); transform-box: fill-box; transform-origin: center; transition: opacity .35s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-think .e030-think, .st-card .e030-cardbig { opacity: 1; transform: none; }
.e030-day { transition: fill .3s; }
.st-week .e030-day { fill: #BBF7D0; }
.e030-back, .e030-arrow { opacity: 0; transition: opacity .4s 1.4s; }
.st-week .e030-back, .st-week .e030-arrow { opacity: 1; }
.e030-gapF, .e030-gapA { transition: opacity .2s; } .st-gotF .e030-gapF, .st-gotA .e030-gapA { opacity: 0; }
.e030-tilt { transform-origin: 1583px 96px; transform: rotate(18deg); transition: transform .5s; } .st-neat .e030-tilt { transform: none; }
.e030-name { clip-path: inset(0 100% 0 0); transition: clip-path 1.6s linear; } .st-name .e030-name { clip-path: inset(0 0 0 0); }
.e030-date { opacity: 0; transition: opacity .4s; } .st-date .e030-date { opacity: 1; animation: e030Pulse .5s ease-in-out infinite alternate; }
.e030-bface, .e030-sface { opacity: 0; transition: opacity .4s; }
.st-faces .e030-bface, .st-faces .e030-sface, .es-ac.e030-faces .e030-bface { opacity: 1; }
`;

const POSES = {
  e030_shh: { R: [24, -162], L: [10, 4], head: 3 },
  e030_wstand: { R: [44, -50], L: [26, -60], head: 8 },
  e030_thumb: { R: [60, 150], L: [10, 4] },
};

/** Quay mặt tại chỗ (không bước). */
const face = (st, id, dir) => { const A = st.a(id); A.face = dir; A.el.classList.toggle('is-left', dir < 0); };
const KIDS = ['minh', 'tom', 'lan'];

const BEATS = [
  { key: ['On Tuesday', 'school library'], icon: '📚', label: 'school library', async play(st) {
    st.look(300);
    st.set('st-tue'); st.sfx('sparkle');
    await st.wait(900);
    await Promise.all([
      st.walk('hoa', 600, { speed: 125, lead: 40 }),
      (async () => { await st.wait(250); await st.walk('minh', 650, { speed: 130, follow: false }); })(),
      (async () => { await st.wait(500); await st.walk('tom', 700, { speed: 130, follow: false }); })(),
      (async () => { await st.wait(750); await st.walk('lan', 750, { speed: 130, follow: false }); })(),
    ]);
    st.set('st-tue', false);
    KIDS.forEach((k) => face(st, k, -1));
    await st.wait(300);
  } },
  { key: ['must be quiet'], icon: '🤫', label: 'must be quiet', async play(st) {
    st.look(690);
    st.pose('hoa', 'e030_shh'); st.mood('hoa', 'happy');
    st.set('st-r1'); st.set('st-h1');
    await st.say('hoa', 'Shh!', 1500);
    KIDS.forEach((k) => st.mood(k, 'shut'));
    await st.wait(900);
    KIDS.forEach((k) => st.mood(k, 'happy'));
    st.pose('hoa', 'stand'); st.set('st-h1', false);
  } },
  { key: ["mustn't run or shout"], icon: '🏃', label: "mustn't run", async play(st) {
    st.look(720);
    st.set('st-r2'); st.set('st-h2');
    st.mood('tom', 'joy');
    await st.walk('tom', 820, { speed: 260, follow: false });
    st.pose('hoa', 'point'); st.act('hoa', 'no'); st.mood('tom', 'wow');
    await st.say('hoa', 'No running!', 1300);
    st.act('hoa', null);
    await st.walk('tom', 700, { speed: 90, follow: false });
    face(st, 'tom', -1);
    st.pose('hoa', 'stand'); st.mood('tom', 'happy'); st.set('st-h2', false);
  } },
  { key: ["mustn't eat or drink"], icon: '🍎', label: "mustn't eat", async play(st) {
    st.look(660);
    st.set('st-r3'); st.set('st-h3');
    st.hold('minh', 'apple'); st.pose('minh', 'eat');
    await st.wait(700);
    st.act('hoa', 'no');
    await st.wait(900);
    st.act('hoa', null);
    st.hold('minh', null); st.pose('minh', 'give');
    await st.fly(APPLE, [630, 190], [548, 232], { size: 22, dur: 650 });
    st.set('st-binapple'); st.pose('minh', 'stand');
    await st.wait(300);
    st.set('st-h3', false);
  } },
  { key: ['must wash your hands'], icon: '🧼', label: 'wash your hands', async play(st) {
    st.set('st-r4'); st.set('st-h4');
    await st.wait(400);
    await Promise.all([
      st.walk('minh', 832, { speed: 130, lead: 20 }),
      st.walk('tom', 876, { speed: 130, follow: false }),
      st.walk('lan', 920, { speed: 130, follow: false }),
      st.walk('hoa', 720, { speed: 120, follow: false }),
    ]);
    st.set('st-tap'); st.sfx('tap-water');
    KIDS.forEach((k) => { st.pose(k, 'wash'); st.act(k, 'wash'); st.mood(k, 'shut'); });
    st.fx('drops', 832, 190); st.fx('drops', 920, 190);
    await st.wait(900);
    st.fx('bubbles', 876, 190);
    await st.wait(900);
    st.set('st-tap', false);
    KIDS.forEach((k) => { st.act(k, null); st.pose(k, 'stand'); st.mood(k, 'joy'); });
    st.fx('sparkle', 876, 180);
    await st.wait(400);
    KIDS.forEach((k) => st.mood(k, 'happy'));
    st.set('st-h4', false); st.set('st-rall');
  } },
  { key: ['has a question'], icon: '🙋', label: 'a question', async play(st) {
    st.look(800);
    face(st, 'tom', -1); face(st, 'minh', -1); face(st, 'lan', -1);
    st.pose('tom', 'raise'); st.mood('tom', 'joy');
    st.fx('sparkle', 876, 138);
    await st.wait(1500);
  } },
  { key: ['take the books home'], icon: '🏠', label: 'take books home?', async play(st) {
    st.look(810);
    st.pose('tom', 'think'); st.mood('tom', 'happy');
    st.set('st-think'); st.talk('tom', true);
    await st.wait(2200);
    st.talk('tom', false);
  } },
  { key: ['Yes, you can'], icon: '👍', label: 'Yes, you can', async play(st) {
    st.look(810);
    st.pose('hoa', 'e030_thumb'); st.act('hoa', 'nod'); st.mood('hoa', 'joy');
    await st.say('hoa', 'Yes, you can.', 1300);
    st.act('hoa', null);
    st.set('st-think', false);
    st.pose('tom', 'cheer'); st.act('tom', 'jump'); st.mood('tom', 'joy');
    await st.wait(800);
    st.act('tom', null); st.pose('tom', 'stand'); st.pose('hoa', 'stand'); st.mood('hoa', 'happy');
  } },
  { key: ['bring the books back', 'in one week'], icon: '📅', label: 'in one week', async play(st) {
    st.mood('tom', 'happy');
    await Promise.all([
      st.walk('hoa', 1020, { speed: 130, lead: 110 }),
      (async () => { await st.wait(300); await st.walk('lan', 1170, { speed: 125, follow: false }); })(),
    ]);
    st.pose('hoa', 'pointUp'); st.act('hoa', 'point');
    st.set('st-week'); st.sfx('tick');
    await st.wait(2000);
    st.act('hoa', null);
    st.pose('lan', 'sit'); st.chest('lan', 'book'); st.pose('lan', 'read');
    await st.wait(500);
    st.pose('hoa', 'stand');
  } },
  { key: ['a book about football'], icon: '⚽', label: 'football book', async play(st) {
    await st.walk('minh', 1384, { speed: 135, lead: 20 });
    st.pose('minh', 'reach');
    await st.wait(400);
    st.set('st-gotF');
    await st.fly(`<g transform="scale(0.8)">${FOOT_BOOK}</g>`, [1385, 176], [1384, 196], { size: 30, dur: 450 });
    st.chest('minh', hug(FOOT_BOOK)); st.pose('minh', 'carry'); st.mood('minh', 'joy');
    st.fx('sparkle', 1384, 180);
    await st.wait(700);
    st.mood('minh', 'happy');
  } },
  { key: ['a book about Australian animals'], icon: '🦘', label: 'animals book', async play(st) {
    await st.walk('tom', 1520, { speed: 140, lead: -20 });
    st.pose('tom', 'reach');
    await st.wait(400);
    st.set('st-gotA');
    await st.fly(`<g transform="scale(0.8)">${ROO_BOOK}</g>`, [1545, 222], [1520, 198], { size: 30, dur: 450 });
    st.chest('tom', hug(ROO_BOOK)); st.pose('tom', 'carry'); st.mood('tom', 'joy');
    st.fx('sparkle', 1520, 180);
    await st.wait(800);
    st.mood('tom', 'happy');
  } },
  { key: ['writes his name', 'on a card'], icon: '🪪', label: 'name on a card', async play(st) {
    st.chest('minh', null);
    await st.walk('minh', 1702, { speed: 135, lead: 20 });
    st.set('st-card');
    st.hold('minh', 'pencil'); st.pose('minh', 'e030_wstand');
    await st.wait(300);
    st.act('minh', 'write'); st.set('st-name'); st.sfx('pencil');
    await st.wait(1800);
    st.act('minh', null);
  } },
  { key: ["mustn't forget the day"], icon: '❗', label: "mustn't forget", async play(st) {
    st.look(1720);
    st.hold('minh', null); st.pose('minh', 'think'); st.mood('minh', 'wow');
    st.set('st-date');
    await st.wait(1300);
    st.pose('minh', 'pointUp'); st.act('minh', 'nod'); st.mood('minh', 'happy');
    await st.wait(900);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['Ms Hoa smiles'], icon: '😊', label: 'Ms Hoa smiles', async play(st) {
    st.set('st-date', false);
    await st.walk('hoa', 1800, { speed: 150, lead: -60 });
    face(st, 'hoa', -1);
    st.mood('hoa', 'joy');
    st.fx('sparkle', 1800, 128);
    await st.wait(1200);
  } },
  { key: ['Good'], icon: '🌟', label: 'Good!', async play(st) {
    st.look(1730);
    st.pose('hoa', 'e030_thumb'); st.mood('hoa', 'joy');
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    await st.say('hoa', 'Good!', 1300);
    st.act('minh', null); st.pose('minh', 'stand'); st.pose('hoa', 'stand');
  } },
  { key: ['Books are our friends'], icon: '🤗', label: 'books are friends', async play(st) {
    st.set('st-card', false);
    st.look(1610, { dur: 700 });
    await st.walk('minh', 1630, { speed: 120, follow: false });
    st.chest('minh', hug(FOOT_BOOK)); st.pose('minh', 'carry');
    st.pose('tom', 'carry');
    st.set('st-faces'); st.a('minh').el.classList.add('e030-faces'); st.a('tom').el.classList.add('e030-faces');
    st.mood('minh', 'joy'); st.mood('tom', 'joy');
    st.fx('hearts', 1530, 120); st.fx('hearts', 1630, 170);
    await st.wait(1700);
    st.mood('minh', 'happy'); st.mood('tom', 'happy');
  } },
  { key: ['look after our books'], icon: '💖', label: 'look after books', async play(st) {
    st.look(1620);
    await st.walk('tom', 1580, { speed: 100, follow: false });
    st.pose('tom', 'pointUp');
    await st.wait(300);
    st.set('st-neat'); st.sfx('pop');
    st.fx('sparkle', 1580, 84);
    st.pose('tom', 'carry'); st.mood('tom', 'joy');
    st.pose('hoa', 'clap'); st.act('hoa', 'clap'); st.mood('hoa', 'joy');
    st.mood('minh', 'joy');
    st.fx('hearts', 1650, 150);
    await st.wait(1800);
    st.act('hoa', null); st.pose('hoa', 'stand');
  } },
];

export default {
  id: 'en030', worldW: 1960, floor: FLOOR, viewTop: 40, camStart: 100, css: KIT_CSS + CSS, bg, fg, beats: BEATS, poses: POSES,
  order: [0, 4, 8, 9, 11, 16],
  cast: [
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 230, s: 0.95 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 60, s: 1.04 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 110 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 160 },
  ],
};
