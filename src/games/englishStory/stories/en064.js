/**
 * Bài 64 "The Power Cut" (quá khứ tiếp diễn): tối thứ Sáu, đi từ trái sang phải: phố nhà Minh (cột điện, đèn đường,
 * cửa sổ sáng) → phòng khách (mẹ chấm bài ở bàn, đồng hồ 8 giờ, bố xem bóng đá trên TV) → bếp (Lan nấu canh) → góc vẽ
 * (Minh vẽ con rồng) → bà kể chuyện cho Lucky → sofa (Kitty ngủ) → ban công (nến, cả nhà ngồi nói cười dưới trăng).
 * Mất điện: mọi đèn tắt, lớp tối phủ cả cảnh; nến thắp ở ban công thì lớp tối có một quầng sáng quanh bàn.
 * Toạ độ cảnh: rộng 1660, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, label, room, doorway, windowBox, fence, rug, shelf, books, thought } from '../kit.js';

const FLOOR = 282;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { wall: 380, mum: 470, clock: 540, tv: 610, dad: 690, kdoor: 750, lan: 805, stove: 845, minh: 905, easel: 960, gma: 1030, sofa: 1170, cab: 1238, bdoor: 1275, table: 1460 };
const SEAT = { gma: 1300, mum: 1350, lan: 1405, minh: 1515, dad: 1570, lucky: 1622 };
const W = 1660;

// ── Đồ vật ─────────────────────────────────────────────────────────────────
const lamp = (x) => `<g transform="translate(${x} 12)"><path d="M0 0 V22" stroke="${L}" stroke-width="1.4"/><path d="M-14 34 Q0 14 14 34Z" fill="#FDE68A" stroke="${L}"/>
  <g class="e064-glow"><path d="M-14 34 L-60 ${FLOOR - 12} H60 L14 34Z" fill="#FEF08A" opacity="0.18"/><circle cy="36" r="5" fill="#FEF9C3"/></g></g>`;
/** Nến (gốc ở đáy), lửa lung linh; glow = quầng sáng. */
const CANDLE = (glow = true) => `${glow ? '<circle cy="-23" r="8" fill="#FDE68A" opacity="0.4"/>' : ''}<rect x="-3" y="-16" width="6" height="16" rx="1" fill="#F8FAFC" stroke="${L}" stroke-width="0.8"/>
  <path d="M0 -16 V-19" stroke="${L}" stroke-width="0.8"/><g class="e064-flame"><path d="M0 -28 Q4 -22 0 -18 Q-4 -22 0 -28Z" fill="#F97316" stroke="#EA580C" stroke-width="0.6"/><path d="M0 -24 Q1.6 -21 0 -19.5 Q-1.6 -21 0 -24Z" fill="#FDE047"/></g>`;
/** Nến cầm tay (đồ cầm tay phải, lửa hướng lên khi tay đưa ra trước). */
const CANDLE_HELD = `<g transform="rotate(180) translate(0 4)">${CANDLE()}</g>`;
const FAN = `<g transform="rotate(180)"><path d="M0 -2 V10" stroke="#B45309" stroke-width="2"/><path d="M0 10 L-10 26 Q0 31 10 26Z" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/><path d="M0 10 L-4 27 M0 10 L4 27" stroke="#F59E0B" stroke-width="0.7"/></g>`;
const LADLE = `<g transform="rotate(180)"><path d="M0 -2 V20" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/><path d="M-5 20 Q0 28 5 20Z" fill="#CBD5E1" stroke="#64748B" stroke-width="0.8"/></g>`;
const RED_PEN = `<g transform="rotate(200)"><rect x="-1.6" y="-2" width="3.2" height="16" fill="#EF4444" stroke="${L}" stroke-width="0.6"/><path d="M-1.6 14 L0 18 L1.6 14Z" fill="#DC2626"/></g>`;
const PENCIL = `<g transform="rotate(200)"><rect x="-1.8" y="-2" width="3.6" height="18" fill="#22C55E" stroke="${L}" stroke-width="0.7"/><path d="M-1.8 16 L0 21 L1.8 16Z" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/></g>`;
const PHONE = `<rect x="-6" y="-10" width="12" height="20" rx="2" fill="#1F2937" stroke="${L}"/><rect x="-4.4" y="-8" width="8.8" height="14" rx="1" fill="#60A5FA"/>`;
const TV_ICON = `<rect x="-14" y="-10" width="28" height="19" rx="2" fill="#334155" stroke="${L}"/><rect x="-11" y="-7" width="22" height="13" fill="#22C55E"/><path d="M-5 9 L-7 13 M5 9 L7 13" stroke="${L}" stroke-width="1.4"/>`;
const NO = (r = 16) => `<circle r="${r}" fill="none" stroke="#DC2626" stroke-width="3"/><path d="M${-r * 0.7} ${-r * 0.7} L${r * 0.7} ${r * 0.7}" stroke="#DC2626" stroke-width="3"/>`;
/** Kitty ngủ cuộn tròn (gốc ở mặt nệm), thân phập phồng. */
const CAT_SLEEP = `<g class="e064-breath"><path d="M-30 0 Q-34 -24 -6 -26 Q22 -28 28 -8 Q30 0 22 0Z" fill="#fff" stroke="${L}" stroke-width="1.1"/>
  <path d="M22 -2 Q34 -4 30 -14 Q26 -20 18 -16" stroke="${L}" stroke-width="5.6" fill="none" stroke-linecap="round"/><path d="M22 -2 Q34 -4 30 -14 Q26 -20 18 -16" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
  <g transform="translate(-24 -12)"><path d="M-9 -4 L-8 -16 L-2 -9Z M2 -9 L8 -16 L9 -4Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M-7 -7 L-6.6 -12 L-3.4 -9Z M3.4 -9 L6.6 -12 L7 -7Z" fill="#F9A8D4"/>
    <circle r="10" fill="#fff" stroke="${L}" stroke-width="1"/><path d="M-6 0 q2.4 2 4.8 0 M1.4 0 q2.4 2 4.8 0" stroke="${L}" stroke-width="1.1" fill="none"/><path d="M0 3.4 l-1.3 -1.1 h2.6Z" fill="#F9A8D4"/></g></g>`;
const BOOK_S = `<g transform="translate(0 -22)"><rect x="-14" y="-10" width="28" height="20" rx="2" fill="#A855F7" stroke="${L}"/><rect x="-12" y="-8" width="24" height="16" fill="#fff" stroke="${L}" stroke-width="0.5"/><path d="M0 -8 V8" stroke="${L}" stroke-width="0.7"/><g class="pp-page" style="transform-origin:0 0"><path d="M0 -8 H11 V8 H0Z" fill="#F8FAFC" stroke="${L}" stroke-width="0.5"/></g></g>`;
/** Ghế tựa (gốc ở mặt đất, mặt ghế ở độ cao h). */
const chair = (x, h, c = '#B45309') => `<g transform="translate(${x} ${FLOOR})"><rect x="-18" y="${-h - 34}" width="6" height="${h + 34}" fill="${c}" stroke="${L}" stroke-width="0.8"/><rect x="-20" y="${-h}" width="40" height="6" rx="2" fill="${c}" stroke="${L}"/><rect x="14" y="${-h + 6}" width="5" height="${h - 6}" fill="${c}" stroke="${L}" stroke-width="0.8"/></g>`;
const stool = (x, h, c = '#F59E0B') => `<g transform="translate(${x} ${FLOOR})"><rect x="-16" y="${-h}" width="32" height="6" rx="2" fill="${c}" stroke="${L}"/><rect x="-12" y="${-h + 6}" width="5" height="${h - 6}" fill="#92400E"/><rect x="7" y="${-h + 6}" width="5" height="${h - 6}" fill="#92400E"/></g>`;

const POSES = {
  e064_sitCheer: { R: [150, 172], L: [150, 172], dy: 20 },
  e064_tell: { R: [70, 120], L: [24, -86], dy: 20, head: -4 },
  e064_fan: { R: [128, 200], L: [10, 4], head: 4 },
  e064_sitFan: { R: [128, 200], L: [40, 110], dy: 20, head: 4 },
  e064_grope: { R: [80, 90], L: [80, 90], head: 4 },
  e064_candle: { R: [70, 80], L: [10, 4] },
  e064_sitTalk: { R: [60, 100], L: [40, 110], dy: 20 },
  e064_sitLaugh: { R: [30, -96], L: [30, -96], dy: 20, head: -8 },
  e064_sitThumb: { R: [140, 168], L: [40, 110], dy: 20 },
  e064_wow: { R: [40, 150], L: [40, 150], head: -6 },
};
const PROPS = { e064_candle: CANDLE_HELD, e064_fan: FAN, e064_ladle: LADLE, e064_redpen: RED_PEN, e064_pencil: PENCIL };

function bg() {
  return `
  <defs><linearGradient id="e064sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E1B4B"/><stop offset="1" stop-color="#4C1D95"/></linearGradient></defs>
  <rect x="0" y="0" width="${W}" height="315" fill="url(#e064sky)"/>
  ${Array.from({ length: 18 }, (_, i) => `<circle cx="${20 + i * 92}" cy="${30 + (i * 37) % 70}" r="1.6" fill="#FDE68A" opacity="0.8"/>`).join('')}
  <g transform="translate(1560 64)"><circle r="20" fill="#FEF9C3"/><circle cx="9" cy="-6" r="17" fill="#2E1065"/></g>
  <!-- phố: nhà bên cạnh, cột điện, đèn đường -->
  <g transform="translate(150 0)"><rect x="-110" y="110" width="140" height="${FLOOR - 110}" fill="#93C5FD" stroke="${L}"/><rect x="-116" y="100" width="152" height="12" rx="2" fill="#E2E8F0" stroke="${L}"/>
    ${[[-90, 132], [-30, 132], [-90, 196], [-30, 196]].map(([x, y]) => `<rect x="${x}" y="${y}" width="40" height="32" fill="#1E293B" stroke="${L}"/><rect class="e064-win" x="${x}" y="${y}" width="40" height="32" fill="#FDE68A" stroke="${L}"/>`).join('')}</g>
  <g transform="translate(250 0)"><rect x="-4" y="70" width="8" height="${FLOOR - 70}" fill="#78716C" stroke="${L}"/><rect x="-26" y="80" width="52" height="5" fill="#57534E"/>
    <path d="M-26 82 Q-120 110 -260 92 M26 82 Q80 104 130 96" stroke="#1F2937" stroke-width="1.4" fill="none"/></g>
  <g transform="translate(330 0)"><rect x="-3" y="120" width="6" height="${FLOOR - 120}" fill="#475569" stroke="${L}" stroke-width="0.8"/><path d="M0 122 Q-10 112 -24 116" stroke="#475569" stroke-width="4" fill="none"/>
    <g class="e064-glow"><path d="M-30 122 L-60 ${FLOOR - 6} H10 L-18 122Z" fill="#FEF08A" opacity="0.2"/><circle cx="-24" cy="122" r="6" fill="#FEF9C3"/></g><circle cx="-24" cy="122" r="5" fill="none" stroke="${L}"/></g>
  <rect x="0" y="${FLOOR - 6}" width="${X.wall}" height="14" fill="#9CA3AF" stroke="${L}"/><rect x="0" y="${FLOOR + 8}" width="${X.wall}" height="30" fill="#475569"/>
  <!-- trong nhà -->
  ${room(X.wall, X.bdoor - X.wall, FLOOR, '#FEF3C7')}
  <rect x="${X.wall - 8}" y="0" width="16" height="${FLOOR}" fill="#E7E5E4" stroke="${L}"/>
  ${lamp(X.mum + 10)}${lamp(X.dad - 30)}${lamp(X.lan + 10)}${lamp(X.easel - 20)}${lamp(X.gma + 30)}${lamp(X.sofa)}
  <g transform="translate(${X.clock} 74)"><circle r="17" fill="#fff" stroke="${L}" stroke-width="2"/><path d="M0 0 V-11" stroke="${L}" stroke-width="2.2" stroke-linecap="round"/><path d="M0 0 L-8.7 5" stroke="${L}" stroke-width="3" stroke-linecap="round"/><circle r="2" fill="${L}"/></g>
  <!-- TV và tủ -->
  <g transform="translate(${X.tv} ${FLOOR})"><rect x="-38" y="-46" width="76" height="46" rx="3" fill="#A16207" stroke="${L}"/><rect x="-32" y="-34" width="64" height="12" rx="2" fill="#CA8A04" stroke="${L}" stroke-width="0.8"/>
    <rect x="-42" y="-110" width="84" height="58" rx="4" fill="#334155" stroke="${L}" stroke-width="1.2"/><rect x="-37" y="-105" width="74" height="48" fill="#0F172A"/>
    <g class="e064-screen"><rect x="-37" y="-105" width="74" height="48" fill="#22C55E"/><path d="M0 -105 V-57 M-37 -81 H37" stroke="#fff" stroke-width="1"/><circle cx="0" cy="-81" r="8" fill="none" stroke="#fff" stroke-width="1"/>
      <g class="e064-match"><circle cx="-14" cy="-76" r="3" fill="#EF4444"/><circle cx="12" cy="-88" r="3" fill="#3B82F6"/><circle class="e064-tvball" cx="0" cy="-80" r="2" fill="#fff" stroke="${L}" stroke-width="0.5"/></g></g>
    <path d="M-8 -52 V-46 M8 -52 V-46" stroke="${L}" stroke-width="2"/></g>
  <!-- ghế bành của bố -->
  <g transform="translate(${X.dad} ${FLOOR})"><rect x="-36" y="-118" width="72" height="60" rx="12" fill="#2563EB" stroke="${L}" stroke-width="1.2"/><rect x="-36" y="-62" width="72" height="62" rx="6" fill="#1D4ED8" stroke="${L}" stroke-width="1.2"/></g>
  ${doorway(X.kdoor, FLOOR)}
  <!-- bếp -->
  <g transform="translate(${X.stove} ${FLOOR})"><rect x="-34" y="-74" width="68" height="74" fill="#F8FAFC" stroke="${L}"/><rect x="-34" y="-80" width="68" height="8" fill="#94A3B8" stroke="${L}"/>
    <path d="M-24 -80 V-98 Q-24 -104 -18 -104 H10 Q16 -104 16 -98 V-80Z" fill="#F97316" stroke="${L}"/><rect x="-27" y="-108" width="46" height="5" rx="2" fill="#EA580C" stroke="${L}" stroke-width="0.8"/>
    <g class="e064-flameS"><path d="M-14 -80 q3 -6 6 0 M-2 -80 q3 -6 6 0" stroke="#3B82F6" stroke-width="2" fill="none"/></g></g>
  ${shelf(X.lan - 30, 70, 70, `<rect x="${X.lan - 22}" y="56" width="14" height="14" rx="2" fill="#F87171" stroke="${L}" stroke-width="0.6"/><rect x="${X.lan}" y="58" width="12" height="12" rx="2" fill="#FDE047" stroke="${L}" stroke-width="0.6"/>`)}
  <!-- giá vẽ của Minh -->
  <g transform="translate(${X.easel} ${FLOOR})"><path d="M-26 0 L-10 -150 M26 0 L10 -150 M0 -150 L0 0" stroke="#92400E" stroke-width="3.4" stroke-linecap="round"/>
    <rect x="-36" y="-148" width="72" height="62" rx="2" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-38" y="-86" width="76" height="5" fill="#92400E" stroke="${L}" stroke-width="0.6"/>
    <g transform="translate(0 -117)"><path class="e064-dragon" d="M-26 12 Q-18 -4 -8 8 Q2 20 10 4 Q14 -6 22 -6" stroke="#16A34A" stroke-width="6" fill="none" stroke-linecap="round" pathLength="100"/>
      <g class="e064-dhead"><circle cx="24" cy="-8" r="7" fill="#22C55E" stroke="${L}" stroke-width="0.8"/><path d="M20 -14 l-2 -6 M26 -15 l1 -6" stroke="#EF4444" stroke-width="1.6"/><circle cx="26" cy="-9" r="1.4" fill="${L}"/><path d="M30 -6 q6 -1 8 -6" stroke="#F97316" stroke-width="2" fill="none"/></g></g></g>
  ${shelf(X.minh - 40, 92, 80, books(X.minh - 34, 92, 7))}
  <!-- góc bà: tấm thảm, ghế đẩu -->
  ${rug(X.gma + 30, FLOOR, 130, '#FDA4AF')}
  ${chair(X.gma, 58, '#A16207')}
  ${windowBox(1080, 64, 70, 70)}<rect x="1080" y="64" width="70" height="70" fill="#1E1B4B" opacity="0.75"/>
  <!-- sofa -->
  <g transform="translate(${X.sofa} ${FLOOR})"><rect x="-60" y="-70" width="120" height="40" rx="10" fill="#F472B6" stroke="${L}" stroke-width="1.2"/><rect x="-62" y="-38" width="124" height="28" rx="6" fill="#EC4899" stroke="${L}" stroke-width="1.2"/>
    <rect x="-70" y="-52" width="16" height="44" rx="6" fill="#DB2777" stroke="${L}"/><rect x="54" y="-52" width="16" height="44" rx="6" fill="#DB2777" stroke="${L}"/><rect x="-56" y="-10" width="6" height="10" fill="#92400E"/><rect x="50" y="-10" width="6" height="10" fill="#92400E"/></g>
  <!-- tủ đựng nến -->
  <g transform="translate(${X.cab} ${FLOOR})"><rect x="-22" y="-70" width="44" height="70" fill="#B45309" stroke="${L}"/><g class="e064-drawer"><rect x="-18" y="-64" width="36" height="20" fill="#CA8A04" stroke="${L}"/><circle cy="-54" r="2" fill="#FDE68A"/></g>
    <rect x="-18" y="-38" width="36" height="32" fill="#CA8A04" stroke="${L}"/></g>
  <!-- cửa ban công + ban công -->
  <rect x="${X.bdoor - 8}" y="30" width="16" height="${FLOOR - 30}" fill="#C08B5C" stroke="${L}"/>
  <rect x="${X.bdoor + 8}" y="${FLOOR - 4}" width="${W - X.bdoor}" height="40" fill="#D6D3D1" stroke="${L}"/>
  ${chair(SEAT.gma, 58)}${chair(SEAT.mum, 58)}${stool(SEAT.lan, 30)}${stool(SEAT.minh, 30)}${chair(SEAT.dad, 58)}
  <!-- nhãn -->
  <g class="e064-lb e064-lb-fri">${label(180, 78, 'Friday evening', '#7C3AED', 15)}</g>
  <g class="e064-lb e064-lb-cut">${label(250, 150, 'power cut', '#DC2626', 15)}</g>
  <g class="e064-lb e064-lb-eight">${label(X.clock, 120, '8:00', '#1D4ED8', 16)}</g>
  <g class="e064-lb e064-lb-tests">${label(X.mum, 130, 'tests', '#DC2626', 14)}</g>
  <g class="e064-lb e064-lb-match">${label(X.tv, 150, 'football', '#16A34A', 14)}</g>
  <g class="e064-lb e064-lb-soup">${label(X.stove, 150, 'soup', '#EA580C', 14)}</g>
  <g class="e064-lb e064-lb-dragon">${label(X.easel, 112, 'dragon', '#16A34A', 14)}</g>
  <g class="e064-lb e064-lb-story">${label(X.gma + 30, 120, 'a story', '#7C3AED', 14)}</g>
  <g class="e064-lb e064-lb-sleep">${label(X.sofa, 170, 'sleeping', '#2563EB', 14)}</g>`;
}

function fg() {
  return `
  <defs><radialGradient id="e064hole"><stop offset="0.35" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient>
    <mask id="e064mask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="315"><rect x="0" y="0" width="${W}" height="315" fill="#fff"/>
      <circle class="e064-hole" cx="${X.table}" cy="236" r="190" fill="url(#e064hole)"/></mask></defs>
  <!-- bàn của mẹ (che chân), giấy bài kiểm tra -->
  <g transform="translate(${X.mum} 0)"><rect x="-50" y="226" width="100" height="8" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="-46" y="234" width="92" height="22" fill="#FDE68A" stroke="${L}" opacity="0.95"/>
    <rect x="-44" y="234" width="7" height="${FLOOR - 234}" fill="#92400E" stroke="${L}"/><rect x="37" y="234" width="7" height="${FLOOR - 234}" fill="#92400E" stroke="${L}"/>
    ${[[-24, -4], [0, 3], [24, -2]].map(([x, r], i) => `<g transform="translate(${x} 224) rotate(${r})"><rect x="-10" y="-5" width="20" height="5" fill="#fff" stroke="${L}" stroke-width="0.6"/><path class="e064-tick e064-tick${i}" d="M-4 -2.6 l2 2 l4 -4" stroke="#DC2626" stroke-width="1.4" fill="none"/></g>`).join('')}</g>
  <!-- tay ghế bành (trước người bố) -->
  <g transform="translate(${X.dad} ${FLOOR})"><rect x="-46" y="-78" width="16" height="70" rx="7" fill="#2563EB" stroke="${L}"/><rect x="30" y="-78" width="16" height="70" rx="7" fill="#2563EB" stroke="${L}"/></g>
  <!-- lan can + bàn nến ở ban công -->
  <g transform="translate(${X.table} ${FLOOR})"><rect x="-28" y="-40" width="56" height="7" rx="2" fill="#A16207" stroke="${L}"/><rect x="-4" y="-33" width="8" height="33" fill="#92400E" stroke="${L}"/>
    <g class="e064-candles">${[-16, 0, 16].map((x) => `<g transform="translate(${x} -40)">${CANDLE()}</g>`).join('')}</g></g>
  <g>${Array.from({ length: Math.floor((W - X.bdoor - 20) / 26) }, (_, i) => `<rect x="${X.bdoor + 18 + i * 26}" y="${FLOOR - 40}" width="4" height="40" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/>`).join('')}
    <rect x="${X.bdoor + 12}" y="${FLOOR - 46}" width="${W - X.bdoor - 12}" height="6" rx="2" fill="#64748B" stroke="${L}"/></g>
  <!-- lớp tối khi mất điện (quầng sáng quanh bàn nến) -->
  <rect class="e064-dark" x="0" y="0" width="${W}" height="315" fill="#0B1026" mask="url(#e064mask)"/>
  <g class="e064-lb e064-lb-dark">${label(1000, 110, 'dark', '#1E293B', 16)}</g>
  <g class="e064-lb e064-lb-hot">${label(1110, 110, 'very hot', '#DC2626', 16)}</g>
  <g class="e064-nophone"><g transform="translate(${X.table - 40} 116)">${TV_ICON}${NO(18)}</g><g transform="translate(${X.table + 40} 116)">${PHONE}${NO(18)}</g></g>
  <g class="e064-lb e064-lb-like">${label(SEAT.minh - 10, 96, 'I like power cuts!', '#EA580C', 14)}</g>`;
}

const CSS = `
.e064-lb, .e064-nophone { opacity: 0; transition: opacity .35s; }
${['fri', 'cut', 'eight', 'tests', 'match', 'soup', 'dragon', 'story', 'sleep', 'dark', 'hot', 'like'].map((k) => `.st-lb-${k} .e064-lb-${k}`).join(', ')} { opacity: 1; }
.st-nophone .e064-nophone { opacity: 1; }
.e064-glow, .e064-win { transition: opacity .25s; }
.st-off .e064-glow, .st-off .e064-win, .st-off .e064-screen, .st-off .e064-flameS { opacity: 0; }
.st-flicker .e064-glow, .st-flicker .e064-win { animation: e064Flick .18s steps(2) 4; }
@keyframes e064Flick { 50% { opacity: .1; } }
.e064-dark { opacity: 0; transition: opacity .6s; pointer-events: none; }
.st-off .e064-dark { opacity: .6; }
.e064-hole { opacity: 0; transition: opacity .8s; }
.st-candles .e064-hole { opacity: 1; }
.e064-candles { opacity: 0; transition: opacity .4s; }
.st-candles .e064-candles { opacity: 1; }
.e064-breath { animation: e064Breath 1.8s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes e064Breath { to { transform: scale(1.03, 1.07); } }
.e064-flame { animation: e064Flame .5s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes e064Flame { from { transform: scale(1, 1) rotate(-4deg); } to { transform: scale(.9, 1.12) rotate(4deg); } }
.e064-tick { opacity: 0; transition: opacity .3s; }
.st-mark .e064-tick0 { opacity: 1; transition-delay: .2s; } .st-mark .e064-tick1 { opacity: 1; transition-delay: .8s; } .st-mark .e064-tick2 { opacity: 1; transition-delay: 1.4s; }
.e064-tvball { animation: e064Ball 1.6s ease-in-out infinite alternate; }
@keyframes e064Ball { from { transform: translateX(-24px); } to { transform: translateX(24px); } }
.e064-match circle:not(.e064-tvball) { animation: e064Run 1.1s ease-in-out infinite alternate; }
@keyframes e064Run { to { transform: translateX(10px); } }
.e064-dragon { stroke-dasharray: 100; stroke-dashoffset: 100; }
.e064-dhead { opacity: 0; transition: opacity .3s; }
.st-draw .e064-dragon { stroke-dashoffset: 0; transition: stroke-dashoffset 2s linear; }
.st-draw .e064-dhead { opacity: 1; transition-delay: 1.8s; }
.e064-drawer { transition: transform .3s; }
.st-drawer .e064-drawer { transform: translateY(4px) scale(1.06); }
@media (prefers-reduced-motion: reduce) {
  .st-flicker .e064-glow, .st-flicker .e064-win { animation-duration: .5s; animation-iteration-count: 2; }
  .e064-flame { animation-duration: 1.4s; }
  .e064-breath { animation-duration: 3.6s; }
  .e064-tvball, .e064-match circle:not(.e064-tvball) { animation-duration: 3.2s; }
  .st-draw .e064-dragon { transition-duration: 2.6s; }
}
`;

const BEATS = [
  { key: ['Last Friday evening', 'a power cut'], icon: '🔌', label: 'power cut', async play(st) {
    st.look(200);
    st.set('st-lb-fri'); st.sfx('crickets', { vol: 0.4 });
    await st.wait(900);
    st.set('st-flicker'); st.sfx('click', { vol: 0.6 });
    await st.wait(300);
    st.sfx('click', { vol: 0.5 });
    await st.wait(500);
    st.set('st-flicker', false);
    st.set('st-lb-cut'); st.sfx('pop', { vol: 0.5 });
    await st.wait(1000);
  } },
  { key: ["At eight o'clock", 'something different'], icon: '🕗', label: "eight o'clock", async play(st) {
    st.set('st-lb-fri', false); st.set('st-lb-cut', false);
    await st.look(X.clock + 40, { dur: 1100 });
    st.set('st-lb-eight'); st.sfx('ding', { vol: 0.5 });
    await st.wait(500);
    st.sfx('tick', { vol: 0.5 });
    await st.look(X.gma - 20, { dur: 1600 });
    await st.wait(300);
  } },
  { key: ['marking her students\' tests'], icon: '📝', label: 'marking tests', async play(st) {
    st.set('st-lb-eight', false);
    st.look(X.mum + 120);
    await st.wait(400);
    st.act('mum', 'write'); st.set('st-mark'); st.set('st-lb-tests');
    st.sfx('pencil', { vol: 0.6 });
    await st.wait(900);
    st.sfx('pencil', { vol: 0.6 });
    await st.wait(900);
    st.act('mum', null);
  } },
  { key: ['watching a football match on TV'], icon: '📺', label: 'football on TV', async play(st) {
    st.set('st-lb-tests', false);
    st.look(X.tv + 50);
    st.set('st-lb-match'); st.sfx('whistle', { vol: 0.4 });
    await st.wait(1000);
    st.pose('dad', 'e064_sitCheer'); st.mood('dad', 'joy'); st.act('dad', 'cheer'); st.sfx('cheer', { vol: 0.5 });
    await st.wait(1100);
    st.act('dad', null); st.pose('dad', 'sit'); st.mood('dad', 'happy');
  } },
  { key: ['cooking soup', 'drawing a picture of a dragon'], icon: '🐉', label: 'soup, dragon', async play(st) {
    st.set('st-lb-match', false);
    await st.look(X.lan + 20, { dur: 700 });
    st.act('lan', 'stir'); st.set('st-lb-soup'); st.sfx('pot-stir', { vol: 0.6 });
    await st.wait(1300);
    await st.look(X.easel - 30, { dur: 700 });
    st.act('minh', 'paint'); st.set('st-draw'); st.sfx('pencil', { vol: 0.6 });
    await st.wait(1400);
    st.set('st-lb-dragon'); st.sfx('pop', { vol: 0.4 });
    await st.wait(600);
    st.act('minh', null);
  } },
  { key: ['Grandma was visiting', 'telling Lucky a story'], icon: '👵', label: 'telling a story', async play(st) {
    st.set('st-lb-soup', false); st.set('st-lb-dragon', false); st.act('lan', 'stir');
    st.look(X.gma + 40);
    await st.wait(300);
    st.pose('gma', 'e064_tell'); st.talk('gma', true); st.act('gma', 'wave'); st.set('st-lb-story'); st.sfx('page-turn', { vol: 0.5 });
    await st.wait(900);
    st.act('lucky', 'wag'); st.sfx('dog-bark', { vol: 0.35 });
    await st.wait(900);
    st.talk('gma', false); st.act('gma', null);
  } },
  { key: ['sleeping on the sofa'], icon: '🐱', label: 'Kitty sleeps', async play(st) {
    st.set('st-lb-story', false); st.act('lan', null);
    st.look(X.sofa - 20);
    await st.wait(300);
    st.set('st-lb-sleep'); st.fx('zzz', X.sofa, 200);
    await st.wait(700);
    st.sfx('purr', { vol: 0.5 });
    await st.wait(1000);
  } },
  { key: ['all the lights went out'], icon: '💡', label: 'lights out', async play(st) {
    st.set('st-lb-sleep', false);
    st.look(X.easel + 20, { dur: 700 });
    await st.wait(700);
    st.sfx('click', { vol: 0.8 }); st.set('st-off');
    await st.wait(200);
    for (const id of ['minh', 'gma', 'lan']) st.mood(id, 'wow');
    st.pose('minh', 'e064_wow'); st.mood('lucky', 'wow');
    st.sfx('whoosh', { vol: 0.35 });
    await st.say('minh', 'Oh!', 1200);
  } },
  { key: ['dark and very hot'], icon: '🥵', label: 'dark and hot', async play(st) {
    st.set('st-lb-dark'); st.sfx('crickets', { vol: 0.5 });
    st.pose('minh', 'e064_grope'); st.pose('lan', 'e064_grope'); st.hold('lan', null);
    await st.wait(900);
    st.set('st-lb-hot');
    st.look(X.easel + 80, { dur: 900 });
    st.hold('minh', 'e064_fan'); st.pose('minh', 'e064_fan'); st.act('minh', 'wave'); st.mood('minh', 'sad');
    st.hold('gma', 'e064_fan'); st.pose('gma', 'e064_sitFan'); st.act('gma', 'wave'); st.mood('gma', 'sad');
    st.fx('drops', X.minh, 150, { quiet: true }); st.sfx('whoosh', { vol: 0.35 });
    // bố mẹ đứng dậy, dò dẫm trong tối về phía ban công
    st.pose('dad', 'stand'); st.pose('mum', 'stand');
    await Promise.all([
      (async () => { await st.walk('dad', X.cab - 40, { speed: 150, follow: false, pose: 'e064_grope', after: 'e064_grope' }); st.face('dad', 1); })(),
      st.walk('mum', 640, { speed: 150, follow: false, pose: 'e064_grope', after: 'e064_grope' }),
      st.wait(1300),
    ]);
    st.mood('mum', 'sad');
  } },
  { key: ['found some candles', 'sat together on the balcony'], icon: '🕯️', label: 'candles', async play(st) {
    st.set('st-lb-dark', false); st.set('st-lb-hot', false);
    st.act('minh', null); st.act('gma', null); st.hold('minh', null); st.hold('gma', null);
    st.pose('minh', 'stand'); st.pose('lan', 'stand'); st.pose('gma', 'stand'); st.pose('mum', 'stand'); st.pose('dad', 'stand');
    st.look(X.cab - 20);
    st.set('st-drawer'); st.sfx('wardrobe-open', { vol: 0.6 });
    await st.wait(500);
    st.hold('dad', 'e064_candle'); st.pose('dad', 'e064_candle'); st.mood('dad', 'joy'); st.sfx('click', { vol: 0.5 });
    await st.wait(400);
    st.set('st-drawer', false);
    const sitDown = async (id, x, pose = 'sit') => { await st.walk(id, x, { speed: id === 'mum' || id === 'dad' || id === 'gma' ? 150 : 135, follow: false }); st.pose(id, pose); st.sfx('bump', { vol: 0.3 }); };
    st.look(X.table - 40, { dur: 2400 });
    await Promise.all([
      (async () => { await st.walk('dad', X.table + 6, { speed: 150, follow: false }); st.set('st-candles'); st.sfx('sparkle', { vol: 0.4 }); st.hold('dad', null); st.pose('dad', 'stand'); await st.walk('dad', SEAT.dad, { speed: 120, follow: false }); st.pose('dad', 'sit'); })(),
      sitDown('gma', SEAT.gma), sitDown('mum', SEAT.mum), sitDown('lan', SEAT.lan), sitDown('minh', SEAT.minh),
      (async () => { st.dog('lucky', 'stand'); await st.loop('steps', () => st.walk('lucky', SEAT.lucky, { speed: 200, follow: false }), { vol: 0.3 }); st.face('lucky', -1); st.dog('lucky', 'sit'); })(),
    ]);
    st.mood('dad', 'happy'); st.mood('minh', 'happy'); st.mood('gma', 'happy'); st.mood('lan', 'happy');
    await st.wait(300);
  } },
  { key: ["weren't watching TV", 'using their phones'], icon: '📵', label: 'no TV, no phones', async play(st) {
    st.look(X.table - 40);
    st.set('st-nophone'); st.sfx('pop', { vol: 0.4 });
    await st.wait(500);
    st.hold('lan', 'e064_phone'); st.pose('lan', 'e064_sitTalk');
    await st.wait(300);
    st.sfx('buzz-no', { vol: 0.45 }); st.act('lan', 'no');
    await st.wait(600);
    st.act('lan', null); st.hold('lan', null); st.pose('lan', 'sit'); st.sfx('click', { vol: 0.4 });
    await st.wait(700);
  } },
  { key: ['talking and laughing'], icon: '😄', label: 'talking, laughing', async play(st) {
    st.set('st-nophone', false);
    st.pose('gma', 'e064_sitTalk'); st.talk('gma', true); st.mood('gma', 'joy'); st.sfx('crickets', { vol: 0.3 });
    await st.wait(800);
    st.talk('gma', false);
    for (const id of ['mum', 'dad', 'lan', 'minh']) { st.pose(id, 'e064_sitLaugh'); st.mood(id, 'joy'); }
    st.act('minh', 'hop'); st.act('lan', 'hop'); st.sfx('giggle', { vol: 0.7 });
    await st.wait(1300);
    st.act('minh', null); st.act('lan', null);
  } },
  { key: ['I like power cuts'], icon: '👍', label: 'I like power cuts', async play(st) {
    for (const id of ['mum', 'dad', 'lan', 'gma']) st.pose(id, 'sit');
    st.pose('minh', 'e064_sitThumb'); st.mood('minh', 'joy');
    st.set('st-lb-like'); st.sfx('pop', { vol: 0.45 });
    await st.wait(400);
    st.fx('hearts', SEAT.minh, 150);
    await st.wait(500);
    st.sfx('clap', { vol: 0.5 });
    await st.wait(1000);
  } },
];
PROPS.e064_phone = `<g transform="translate(0 -6)">${PHONE}</g>`;

export default {
  id: 'en064', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: X.mum, s: 0.95 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: X.dad, s: 0.95, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.lan, s: 1.12, face: 1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.minh, s: 1.08, face: 1 },
    { id: 'gma', kind: 'adult', who: 'en_grandma', x: X.gma, s: 0.92 },
    { id: 'lucky', kind: 'dog', x: X.gma + 66, s: 0.9, face: -1 },
    { id: 'kitty', kind: 'thing', x: X.sofa - 14, y: FLOOR - 38, svg: CAT_SLEEP, box: [-36, -32, 72, 34] },
  ],
  init(st) {
    st.pose('mum', 'write'); st.hold('mum', 'e064_redpen');
    st.pose('dad', 'sit');
    st.hold('lan', 'e064_ladle'); st.pose('lan', 'stir');
    st.hold('minh', 'e064_pencil'); st.pose('minh', 'paint');
    st.pose('gma', 'sit'); st.chest('gma', BOOK_S);
    st.dog('lucky', 'sit');
  },
};
