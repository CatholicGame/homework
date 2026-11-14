/**
 * Bài 95 "Amazing Inventions" (bị động với động từ khuyết thiếu can / should / will + be + V3): lớp học của Minh, đi từ trái
 * sang phải: bảng đen (cô Hoa viết INVENTIONS, ba thẻ phát minh) → nhóm Minh (máy bay không người lái cất cánh trên bàn, áp
 * phích: chụp ảnh từ trên trời, tưới ruộng) → nhóm máy in 3D (đầu in chạy, in ra đồ chơi, giày, ngôi nhà) → nhóm Tom (tấm pin
 * mặt trời: nắng qua cửa sổ, bóng đèn sáng, ống khói nhà máy than bớt khói) → bảng tin "SCIENCE FAIR" (áp phích bay lên bảng,
 * tờ lịch "next month").
 * Toạ độ cảnh: rộng 1900, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, room, board, label, speaker, table, sun } from '../kit.js';

const FLOOR = 282;
const W = 1900;
const X = { board: 40, hoa: 360, t1: 560, minh: 518, an: 602, pA: 700, t2: 1040, mai: 984, bao: 1096, pB: 1180, win: 1250, t3: 1420, tom: 1378, vy: 1462, pC: 1560, fair: 1770 };
const TOP = FLOOR - 58;
const SPEED = 125;

Object.assign(CAST, {
  e095_an: { hair: 'bowl', top: 'uniform', shirt: '#FFFFFF', bottom: 'shorts', bottomC: '#1E3A6E', shoe: '#1F2937' },
  e095_mai: { hair: 'pigtails', top: 'uniform', shirt: '#FFFFFF', bottom: 'skirt', bottomC: '#1E3A6E', shoe: '#F28AB2' },
  e095_bao: { hair: 'short', top: 'uniform', shirt: '#FFFFFF', bottom: 'shorts', bottomC: '#1E3A6E', shoe: '#78716C' },
  e095_vy: { hair: 'bob', top: 'uniform', shirt: '#FFFFFF', bottom: 'skirt', bottomC: '#1E3A6E', shoe: '#A78BFA' },
});

const T = (x, y, s, size = 13, c = '#1E3A8A', w = 900) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="${w}" font-size="${size}" fill="${c}">${s}</text>`;

// ── Hình phát minh (gốc ở giữa) ─────────────────────────────────────────────
const DRONE = (s = 1) => `<g transform="scale(${s})"><path d="M-26 -6 L26 -6" stroke="#475569" stroke-width="3"/>
  ${[-26, 26].map((x) => `<path d="M${x} -6 V-12" stroke="#475569" stroke-width="2.4"/><g transform="translate(${x} -13)"><g class="e095-prop"><ellipse rx="14" ry="2.6" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/></g></g>`).join('')}
  <rect x="-12" y="-10" width="24" height="12" rx="5" fill="#F97316" stroke="${L}"/><circle cx="0" cy="6" r="4.4" fill="#1F2937" stroke="${L}" stroke-width="0.6"/><circle cx="1" cy="6" r="1.8" fill="#38BDF8"/>
  <path d="M-8 2 L-12 10 M8 2 L12 10" stroke="#475569" stroke-width="1.6"/></g>`;
const PRINTER_ICON = `<rect x="-14" y="-14" width="28" height="28" rx="2" fill="#E2E8F0" stroke="${L}"/><rect x="-10" y="-10" width="20" height="4" fill="#64748B"/><path d="M0 -6 V0" stroke="#1F2937" stroke-width="2"/><rect x="-6" y="6" width="12" height="5" fill="#F472B6" stroke="${L}" stroke-width="0.5"/>`;
const PANEL_ICON = `<path d="M-16 8 L-10 -10 H16 L10 8Z" fill="#1E40AF" stroke="${L}"/><path d="M-13 -1 H13 M-4 -10 L-7 8 M5 -10 L2 8" stroke="#93C5FD" stroke-width="1"/>`;
const DUCK = `<ellipse cx="0" cy="-8" rx="12" ry="8" fill="#FACC15" stroke="${L}"/><circle cx="8" cy="-18" r="6" fill="#FACC15" stroke="${L}"/><path d="M13 -18 l6 1 l-6 2Z" fill="#F97316"/><circle cx="9" cy="-19" r="1.2" fill="#1F2937"/>`;
const SHOE = `<path d="M-14 0 V-12 Q-10 -16 -4 -12 Q2 -6 12 -5 Q16 -4 16 0Z" fill="#3B82F6" stroke="${L}"/><path d="M-14 -2 H16" stroke="#fff" stroke-width="2"/><path d="M-4 -12 l3 3 M-1 -10 l3 3" stroke="#fff" stroke-width="1"/>`;
const HOUSE = `<rect x="-12" y="-16" width="24" height="16" fill="#F5F5F4" stroke="${L}"/><path d="M-16 -15 L0 -28 L16 -15Z" fill="#94A3B8" stroke="${L}"/><rect x="-3" y="-9" width="6" height="9" fill="#78716C"/><path d="M-12 -12 H12 M-12 -7 H12" stroke="#D6D3D1" stroke-width="0.8"/>`;

const PROPS = {
  e095_card: `<g transform="translate(0 -8)"><rect x="-12" y="-12" width="24" height="24" rx="3" fill="#fff" stroke="${L}"/><g transform="scale(0.55)">${PRINTER_ICON}</g></g>`,
  e095_panel: `<g transform="translate(0 -16) rotate(180)"><path d="M-22 10 L-14 -12 H22 L14 10Z" fill="#1E40AF" stroke="${L}"/><path d="M-18 -1 H18 M-4 -12 L-8 10 M8 -12 L4 10" stroke="#93C5FD" stroke-width="1.2"/></g>`,
  e095_chalk: `<g transform="rotate(200)"><rect x="-1.6" y="-2" width="3.2" height="10" fill="#F8FAFC" stroke="${L}" stroke-width="0.5"/></g>`,
};
const POSES = {
  e095_write: { R: [130, 150], L: [10, 4], head: -6 },
  e095_explain: { R: [86, 60], L: [10, 4], head: -4 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
/** Giá vẽ + áp phích (tâm x, mép trên y = 100, 100 × 120). inner = các khung (gốc ở góc trên trái). */
const easel = (x, inner) => `<g transform="translate(${x} 0)"><path d="M-30 ${FLOOR} L-6 96 M30 ${FLOOR} L6 96 M0 96 L0 ${FLOOR - 10}" stroke="#92400E" stroke-width="4" stroke-linecap="round"/>
  <rect x="-52" y="92" width="104" height="128" rx="3" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="-58" y="214" width="116" height="7" rx="2" fill="#A16207" stroke="${L}"/>
  <g transform="translate(-48 96)">${inner}</g></g>`;
const POSTER_A = `${T(48, 14, 'DRONES', 12, '#EA580C')}
  <rect x="4" y="20" width="88" height="44" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>
  ${[[10, 54, 14, 10], [28, 50, 10, 14], [42, 56, 16, 8], [62, 48, 12, 16], [78, 54, 10, 10]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#FDBA74" stroke="${L}" stroke-width="0.5"/>`).join('')}
  <g transform="translate(48 32)">${DRONE(0.5)}</g><g class="e095-pa1"><path d="M44 38 L28 58 H68Z" fill="#FEF9C3" opacity="0.7"/><rect x="60" y="22" width="30" height="22" fill="#fff" stroke="${L}" stroke-width="0.8"/><rect x="62" y="24" width="26" height="14" fill="#86EFAC"/><circle cx="68" cy="30" r="3" fill="#FDE047"/></g>
  <rect x="4" y="70" width="88" height="44" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/><rect x="4" y="96" width="88" height="18" fill="#84CC16"/>
  ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${10 + i * 12} 112 v-10 M${14 + i * 12} 112 v-8" stroke="#3F6212" stroke-width="1.4"/>`).join('')}
  <g class="e095-pa2"><g transform="translate(40 80)">${DRONE(0.5)}</g><g class="e095-rain">${[0, 1, 2, 3, 4].map((i) => `<path d="M${30 + i * 5} ${88 + (i % 2) * 3} v5" stroke="#0EA5E9" stroke-width="1.6" stroke-linecap="round"/>`).join('')}</g>
    <g transform="translate(80 112)"><path d="M-9 -24 L0 -32 L9 -24Z" fill="#F5DEB3" stroke="${L}" stroke-width="0.6"/><circle cy="-20" r="4" fill="#F5D0B5" stroke="${L}" stroke-width="0.5"/><path d="M-4 -16 H4 L3 -4 H-3Z" fill="#475569"/></g></g>`;
const POSTER_B = `${T(48, 14, '3D PRINTERS', 11, '#7C3AED')}<g transform="translate(48 42) scale(1.3)">${PRINTER_ICON}</g>
  <g class="e095-pb"><g transform="translate(18 92) scale(0.9)">${DUCK}</g><g transform="translate(50 92) scale(0.9)">${SHOE}</g><g transform="translate(80 94) scale(0.9)">${HOUSE}</g>
  ${T(16, 112, 'toys', 8, '#1F2937', 800)}${T(48, 112, 'shoes', 8, '#1F2937', 800)}${T(81, 112, 'houses', 8, '#1F2937', 800)}</g>`;
const POSTER_C = `${T(48, 14, 'SOLAR PANELS', 10, '#0369A1')}<g transform="translate(20 34) scale(0.5)">${sun(18)}</g><path d="M30 42 L44 52" stroke="#FACC15" stroke-width="2"/>
  <g transform="translate(54 56)">${PANEL_ICON}</g><path d="M68 56 l6 -6 l-2 6 l6 -6" stroke="#EAB308" stroke-width="2" fill="none"/><g transform="translate(84 46)"><circle r="7" fill="#FDE047" stroke="${L}"/><rect x="-3" y="6" width="6" height="4" fill="#94A3B8"/></g>
  <g class="e095-pc"><rect x="20" y="84" width="14" height="26" fill="#78716C" stroke="${L}"/><rect x="10" y="100" width="34" height="12" fill="#A8A29E" stroke="${L}" stroke-width="0.7"/>
    <circle cx="28" cy="78" r="5" fill="#9CA3AF"/><circle cx="34" cy="72" r="4" fill="#9CA3AF"/>
    <path d="M60 80 V104 M52 96 L60 106 L68 96" stroke="#16A34A" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${T(74, 94, 'coal', 9, '#1F2937', 800)}</g>`;

function bg() {
  const winBox = (x, y, w, h, inner = '') => `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#BAE6FD"/>${inner}<path d="M${x} ${y + h - 16} Q${x + w * 0.4} ${y + h - 30} ${x + w} ${y + h - 18} V${y + h} H${x}Z" fill="#86EFAC"/>
    <path d="M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}" stroke="#fff" stroke-width="3" opacity="0.8"/>`;
  return `
  ${room(0, W, FLOOR, '#FEF9C3', '#D9A066')}
  <rect x="0" y="${FLOOR - 40}" width="${W}" height="40" fill="#FDE68A" opacity="0.5"/>
  <!-- bảng đen -->
  ${board(X.board, 64, 270, 120)}
  <g class="e095-word"><clipPath id="e095wclip"><rect class="e095-wclip" x="${X.board + 20}" y="70" width="240" height="44"/></clipPath>
    <g clip-path="url(#e095wclip)">${T(X.board + 135, 102, 'INVENTIONS', 28, '#F8FAFC', 800)}</g></g>
  ${[[X.board + 52, 'd', DRONE(0.9)], [X.board + 135, 'p', PRINTER_ICON], [X.board + 218, 's', PANEL_ICON]].map(([x, k, svg]) => `<g class="e095-card e095-card-${k}" style="transform-origin:${x}px 140px"><rect x="${x - 24}" y="${122}" width="48" height="40" rx="4" fill="#fff" stroke="${L}"/><g transform="translate(${x} 143)">${svg}</g></g>`).join('')}
  <g class="e095-how">${T(X.board + 135, 178, 'How can it be used?', 14, '#FDE68A', 800)}</g>
  <!-- cửa sổ -->
  ${winBox(800, 60, 100, 90)}
  ${winBox(X.win, 56, 110, 100, `<g transform="translate(${X.win + 74} 84)">${sun(16)}</g>`)}
  <g class="e095-beam"><path d="M${X.win + 70} 96 L${X.t3 - 30} ${TOP - 18} L${X.t3 + 10} ${TOP - 18} L${X.win + 86} 100Z" fill="#FDE047" opacity="0.45"/></g>
  <!-- áp phích -->
  ${easel(X.pA, POSTER_A)}${easel(X.pB, POSTER_B)}${easel(X.pC, POSTER_C)}
  <!-- bảng tin hội chợ khoa học -->
  <g transform="translate(${X.fair} 0)"><rect x="-114" y="52" width="228" height="112" rx="4" fill="#B45309" stroke="${L}" stroke-width="1.4"/><rect x="-106" y="60" width="212" height="96" fill="#FCD34D" stroke="${L}"/>
    <g class="e095-fair"><rect x="-96" y="64" width="150" height="22" rx="4" fill="#DC2626" stroke="${L}"/>${T(-21, 80, 'SCIENCE FAIR', 14, '#fff')}
      <g class="e095-fposter">${[-72, -28, 16].map((dx, i) => `<rect x="${dx - 18}" y="96" width="36" height="46" fill="#fff" stroke="${L}"/><g transform="translate(${dx} 116) scale(0.8)">${[DRONE(0.7), PRINTER_ICON, PANEL_ICON][i]}</g>`).join('')}</g>
      <g transform="translate(78 108)"><rect x="-22" y="-26" width="44" height="52" rx="3" fill="#fff" stroke="${L}"/><rect x="-22" y="-26" width="44" height="12" rx="3" fill="#EF4444"/>
        <g class="e095-cal1">${T(0, 10, 'NOW', 11, '#1F2937')}</g><g class="e095-cal2">${T(0, 4, 'next', 10, '#DC2626')}${T(0, 18, 'month', 10, '#DC2626')}</g></g></g></g>
  <!-- nhãn -->
  <g class="e095-lb e095-lb-term">${label(X.board + 135, 228, 'This term', '#7C3AED', 15)}</g>
  <g class="e095-lb e095-lb-one">${label(X.board + 135, 228, 'one invention each', '#16A34A', 14)}</g>
  <g class="e095-lb e095-lb-drone">${label(X.t1, 196, 'the drone', '#EA580C', 15)}</g>
  <g class="e095-lb e095-lb-printer">${label(X.t2 - 20, 136, 'the 3D printer', '#7C3AED', 15)}</g>
  <g class="e095-lb e095-lb-solar">${label(X.t3, 70, 'the solar panel', '#0369A1', 15)}</g>
  <g class="e095-lb e095-lb-impr">${label(X.pC + 70, 74, 'impressed', '#DB2777', 16)}</g>`;
}

function fg() {
  const bub = (k, x, y, w, h, inner, [tx, ty]) => {
    const bx = Math.max(x - w / 2 + 18, Math.min(x + w / 2 - 18, tx)), by = y + h / 2;
    return `<g class="e095-b e095-b-${k}" style="transform-origin:${tx}px ${ty}px"><path d="M${bx - 9} ${by - 1} L${tx} ${ty} L${bx + 9} ${by - 1}Z" fill="#fff" stroke="${L}" stroke-width="1.4" stroke-linejoin="round"/>
      <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="14" fill="#fff" stroke="${L}" stroke-width="1.4"/><path d="M${bx - 7.6} ${by - 1.2} L${tx} ${ty - 2} L${bx + 7.6} ${by - 1.2}Z" fill="#fff"/>
      <g transform="translate(${x} ${y})">${inner}</g></g>`;
  };
  return `
  <!-- bàn các nhóm (che chân) -->
  ${table(X.t1, TOP, 130, FLOOR, '#F59E0B')}${table(X.t2, TOP, 130, FLOOR, '#F59E0B')}${table(X.t3, TOP, 130, FLOOR, '#F59E0B')}
  <!-- máy in 3D trên bàn nhóm 2 -->
  <g transform="translate(${X.t2 - 6} ${TOP})"><rect x="-30" y="-64" width="60" height="64" rx="3" fill="#E2E8F0" stroke="${L}" stroke-width="1.2"/><rect x="-24" y="-56" width="48" height="50" fill="#F8FAFC" stroke="${L}" stroke-width="0.7"/>
    <path d="M-24 -48 H24" stroke="#64748B" stroke-width="2.4"/><g class="e095-head"><rect x="-5" y="-50" width="10" height="8" fill="#64748B" stroke="${L}" stroke-width="0.6"/><path d="M0 -42 V-38" stroke="#F97316" stroke-width="2"/></g>
    <g class="e095-it e095-it-1"><g transform="translate(-14 -8) scale(0.7)">${DUCK}</g></g><g class="e095-it e095-it-2"><g transform="translate(2 -8) scale(0.6)">${SHOE}</g></g>
    <g class="e095-it e095-it-3"><g transform="translate(16 -8) scale(0.55)">${HOUSE}</g></g>
    <rect x="-24" y="-8" width="48" height="4" fill="#94A3B8"/><circle cx="22" cy="-60" r="2" fill="#22C55E" class="e095-led"/></g>
  <!-- bàn nhóm 3: tấm pin + bóng đèn -->
  <g class="e095-onT"><g transform="translate(${X.t3 - 10} ${TOP - 2})"><path d="M-30 0 L-22 -20 H30 L22 0Z" fill="#1E40AF" stroke="${L}"/><path d="M-26 -10 H26 M-6 -20 L-10 0 M10 -20 L6 0" stroke="#93C5FD" stroke-width="1.2"/></g>
    <path class="e095-wire" d="M${X.t3 + 18} ${TOP - 6} Q${X.t3 + 30} ${TOP - 4} ${X.t3 + 38} ${TOP - 14}" stroke="#1F2937" stroke-width="1.6" fill="none"/>
    <g transform="translate(${X.t3 + 40} ${TOP - 20})"><g class="e095-glow"><circle r="18" fill="#FDE047" opacity="0.5"/></g><circle r="9" fill="#FEF9C3" stroke="${L}"/><g class="e095-bulb"><circle r="7" fill="#FDE047"/></g><rect x="-4" y="8" width="8" height="6" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/></g>
    <g class="e095-zap"><path d="M${X.t3 + 22} ${TOP - 16} l6 -8 l-1 6 l7 -7" stroke="#EAB308" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>
  <!-- máy in ra chữ toys / shoes / houses -->
  <g class="e095-lb e095-lb-made">${label(X.t2 - 6, 144, 'can be made', '#7C3AED', 13)}</g>
  <g class="e095-lb e095-lb-sp-minh">${speaker(X.minh, 152, 'Minh')}</g>
  <g class="e095-lb e095-lb-sp-tom">${speaker(X.tom, 152, 'Tom')}</g>
  <g class="e095-lb e095-lb-sp-hoa">${speaker(X.pC + 70, 112, 'Ms Hoa', '#2563EB')}</g>
  ${bub('photo', X.pA - 60, 74, 210, 52, `${T(0, -3, 'can be used', 13, '#EA580C')}${T(0, 14, 'to take photos from the sky', 11)}`, [X.minh + 20, 128])}
  ${bub('farm', X.pA - 60, 74, 210, 52, `${T(0, -3, 'can be used by farmers', 12, '#EA580C')}${T(0, 14, 'to water their fields', 11)}`, [X.minh + 20, 128])}
  ${bub('elec', X.t3 + 20, 72, 236, 56, `${T(0, -4, 'Electricity can be produced', 12, '#EA580C')}${T(0, 13, 'from sunlight', 12, '#EA580C')}`, [X.tom + 12, 128])}
  ${bub('coal', X.t3 + 20, 72, 236, 56, `${T(0, -4, 'so less coal', 12)}${T(0, 13, 'should be burned', 12, '#EA580C')}`, [X.tom + 12, 128])}
  ${bub('fair', X.pC, 66, 220, 48, `${T(0, -3, 'Your posters will be shown', 12)}${T(0, 14, 'at the science fair!', 12, '#EA580C')}`, [X.pC + 46, 92])}
  <g class="e095-conf">${Array.from({ length: 16 }, (_, i) => `<rect style="animation-delay:${(i % 6) * 0.12}s" x="${X.t3 - 60 + i * 28}" y="40" width="6" height="10" rx="1.5" fill="${['#EF4444', '#3B82F6', '#22C55E', '#F59E0B', '#A855F7'][i % 5]}"/>`).join('')}</g>`;
}

const CSS = `
.e095-lb { opacity: 0; transition: opacity .35s; }
${['term', 'one', 'drone', 'printer', 'solar', 'impr', 'made', 'sp-minh', 'sp-tom', 'sp-hoa'].map((k) => `.st-lb-${k} .e095-lb-${k}`).join(', ')} { opacity: 1; }
.e095-b { opacity: 0; transform: scale(.35); transition: opacity .25s, transform .4s cubic-bezier(.3,1.5,.6,1); }
${['photo', 'farm', 'elec', 'coal', 'fair'].map((k) => `.st-b-${k} .e095-b-${k}`).join(', ')} { opacity: 1; transform: none; }
.e095-wclip { transform: scaleX(0); transform-origin: ${X.board + 20}px 0px; }
.st-word .e095-wclip { transform: none; transition: transform 1.6s linear; }
.e095-card { opacity: 0; transform: scale(.3); transition: opacity .25s, transform .35s cubic-bezier(.3,1.5,.6,1); }
.st-cards .e095-card-d { opacity: 1; transform: none; } .st-cards .e095-card-p { opacity: 1; transform: none; transition-delay: .5s; } .st-cards .e095-card-s { opacity: 1; transform: none; transition-delay: 1s; }
.st-dtaken .e095-card-d { opacity: 0; transition-delay: 0s; } .st-ptaken .e095-card-p { opacity: 0; transition-delay: 0s; } .st-staken .e095-card-s { opacity: 0; transition-delay: 0s; }
.e095-how { opacity: 0; transition: opacity .4s 1.4s; } .st-cards .e095-how { opacity: 1; }
.e095-pa1, .e095-pa2, .e095-pb, .e095-pc { opacity: 0; transition: opacity .4s; }
.st-pa1 .e095-pa1, .st-pa2 .e095-pa2, .st-pb .e095-pb, .st-pc .e095-pc { opacity: 1; }
.st-pa2 .e095-rain { animation: e095Rain .6s linear infinite; } @keyframes e095Rain { from { transform: translateY(-3px); opacity: .3; } to { transform: translateY(5px); opacity: 1; } }
.e095-head { animation: none; } .st-print .e095-head { animation: e095Head .5s ease-in-out infinite alternate; }
@keyframes e095Head { from { transform: translateX(-16px); } to { transform: translateX(16px); } }
.e095-it { opacity: 0; transition: opacity .2s; } .e095-it > g { transition: transform .5s ease-out; }
.st-it1 .e095-it-1, .st-it2 .e095-it-2, .st-it3 .e095-it-3 { opacity: 1; }
.e095-led { opacity: .3; } .st-print .e095-led { animation: e095Blink .3s steps(2) infinite; } @keyframes e095Blink { to { opacity: 1; } }
.e095-onT { opacity: 0; transition: opacity .3s; } .st-panel .e095-onT { opacity: 1; }
.e095-beam { opacity: 0; transition: opacity .6s; } .st-beam .e095-beam { opacity: 1; animation: e095Beam 1s ease-in-out infinite alternate; }
@keyframes e095Beam { to { opacity: .6; } }
.e095-zap, .e095-glow, .e095-bulb { opacity: 0; transition: opacity .3s; } .st-light .e095-zap, .st-light .e095-glow, .st-light .e095-bulb { opacity: 1; }
.st-light .e095-zap { animation: e095Blink .25s steps(2) infinite; }
.e095-fair { opacity: 0; transition: opacity .4s; } .st-fair .e095-fair { opacity: 1; }
.e095-fposter { opacity: 0; transition: opacity .3s; } .st-fposter .e095-fposter { opacity: 1; }
.e095-cal2 { opacity: 0; } .st-next .e095-cal2 { opacity: 1; transition: opacity .3s .2s; } .st-next .e095-cal1 { opacity: 0; transition: opacity .2s; }
.e095-conf rect { opacity: 0; } .st-conf .e095-conf rect { animation: e095Conf 1.4s ease-in infinite; }
@keyframes e095Conf { 0% { opacity: 1; transform: translateY(0) rotate(0); } 100% { opacity: 0; transform: translateY(160px) rotate(200deg); } }
.e095-conf rect { transform-box: fill-box; transform-origin: center; }
.es-thing .e095-prop { transform-box: fill-box; transform-origin: center; }
.es-ac.e095-up .e095-prop { animation: e095Prop .12s linear infinite alternate; }
@keyframes e095Prop { to { transform: scaleX(.2); } }
.es-ac.e095-up svg { animation: e095Hover .6s ease-in-out infinite alternate; }
@keyframes e095Hover { to { transform: translateY(-3px); } }
@media (prefers-reduced-motion: reduce) { .st-print .e095-head { animation-duration: 1.2s; } .st-conf .e095-conf rect { animation-duration: 3s; } }
`;

const on = (st, ...ks) => ks.forEach((k) => st.set(k, true));
const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const cls = (st, id, c, v = true) => st.a(id).el.classList.toggle(c, v);
const KIDS = ['minh', 'an', 'mai', 'bao', 'tom', 'vy'];

const BEATS = [
  { key: ['This term', 'learning about inventions'], icon: '💡', label: 'inventions', async play(st) {
    st.look(300);
    on(st, 'st-lb-term');
    st.face('hoa', -1); st.hold('hoa', 'e095_chalk'); st.pose('hoa', 'e095_write'); st.act('hoa', 'write');
    on(st, 'st-word');
    await st.loop('pencil', () => st.wait(1700), { vol: 0.8 });
    st.act('hoa', null); st.hold('hoa', null);
    st.face('hoa', 1); st.pose('hoa', 'open'); st.mood('hoa', 'joy'); st.sfx('ding', { vol: 0.5 });
    st.mood('minh', 'wow');
    await st.wait(900);
  } },
  { key: ['Each group must choose one invention', 'how it can be used'], icon: '🃏', label: 'choose one invention', async play(st) {
    off(st, 'st-lb-term');
    st.look(300);
    st.face('hoa', -1); st.pose('hoa', 'point'); st.act('hoa', 'point');
    on(st, 'st-cards', 'st-lb-one');
    st.sfx('pop', { vol: 0.6 }); await st.wait(500); st.sfx('pop', { vol: 0.6 }); await st.wait(500); st.sfx('pop', { vol: 0.6 });
    await st.wait(500);
    st.sfx('pencil', { vol: 0.5 });
    await st.wait(1200);
    st.act('hoa', null); st.face('hoa', 1); st.pose('hoa', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ["Minh's group chose the drone"], icon: '🚁', label: 'the drone', async play(st) {
    off(st, 'st-lb-one');
    st.look(420);
    st.pose('minh', 'raise'); st.mood('minh', 'joy'); st.act('minh', 'hop');
    await st.wait(400);
    on(st, 'st-dtaken'); st.sfx('whoosh', { vol: 0.6 });
    await st.fly(DRONE(0.9), [X.board + 52, 142], [X.t1, TOP - 10], { size: 60, dur: 800 });
    st.show('drone', true); st.sfx('click', { vol: 0.7 }); on(st, 'st-lb-drone');
    st.act('minh', null); st.pose('minh', 'stand'); st.mood('an', 'joy'); st.pose('an', 'clap'); st.act('an', 'clap');
    st.walk('hoa', 420, { speed: 100, follow: false });
    await st.wait(1000);
    st.act('an', null); st.pose('an', 'stand');
  } },
  { key: ['A drone can be used to take photos from the sky', 'Minh explained'], icon: '📷', label: 'take photos', async play(st) {
    off(st, 'st-lb-drone');
    st.look(600);
    on(st, 'st-lb-sp-minh'); st.pose('minh', 'e095_explain'); st.talk('minh', true);
    cls(st, 'drone', 'e095-up');
    await st.loop('drone', async () => {
      await st.walk('drone', X.pA - 50, { y: 150, speed: 90, follow: false });
      on(st, 'st-b-photo');
      await st.wait(500);
      on(st, 'st-pa1'); st.sfx('camera', { vol: 0.8 });
      await st.wait(1300);
    }, { vol: 0.5 });
    st.talk('minh', false);
  } },
  { key: ['It can also be used by farmers to water their fields'], icon: '🌾', label: 'water their fields', async play(st) {
    off(st, 'st-b-photo');
    st.look(600);
    st.pose('minh', 'e095_explain'); st.talk('minh', true); on(st, 'st-lb-sp-minh');
    cls(st, 'drone', 'e095-up');
    on(st, 'st-b-farm'); st.sfx('pop', { vol: 0.5 });
    await st.loop('drone', async () => {
      await st.walk('drone', X.pA - 30, { y: 160, speed: 60, follow: false });
      on(st, 'st-pa2');
      st.fx('drops', X.pA - 30, 172);
      await st.loop('rain', () => st.wait(1300), { vol: 0.5 });
      st.fx('drops', X.pA - 30, 172, { quiet: true });
      await st.walk('drone', X.t1 - 6, { y: TOP, speed: 110, follow: false });
    }, { vol: 0.5 });
    cls(st, 'drone', 'e095-up', false);
    st.talk('minh', false); st.pose('minh', 'stand');
  } },
  { key: ['Another group chose the 3D printer'], icon: '🖨️', label: 'the 3D printer', async play(st) {
    off(st, 'st-b-farm', 'st-lb-sp-minh');
    st.look(X.t2 + 40, { dur: 1100 });
    st.walk('hoa', X.pB + 70, { speed: 125, follow: false });
    await st.wait(700);
    on(st, 'st-ptaken');
    st.hold('mai', 'e095_card'); st.pose('mai', 'raise'); st.mood('mai', 'joy'); st.sfx('whoosh', { vol: 0.5 });
    on(st, 'st-lb-printer'); st.sfx('robot-beep', { vol: 0.6 });
    st.mood('bao', 'joy'); st.act('bao', 'hop');
    await st.wait(1200);
    st.act('bao', null);
  } },
  { key: ['toys, shoes and even houses can be made with a 3D printer'], icon: '🧸', label: 'can be made', async play(st) {
    off(st, 'st-lb-printer'); st.hold('mai', null); st.pose('mai', 'point');
    st.look(X.t2 + 40);
    on(st, 'st-print', 'st-lb-made');
    st.pose('bao', 'point');
    await st.loop('typing', async () => {
      for (const i of [1, 2, 3]) {
        await st.wait(900);
        on(st, `st-it${i}`); st.sfx('robot-beep', { vol: 0.5 });
      }
      await st.wait(400);
    }, { vol: 0.4 });
    off(st, 'st-print');
    on(st, 'st-pb'); st.sfx('ding', { vol: 0.5 });
    st.mood('mai', 'wow'); st.mood('bao', 'wow'); st.pose('mai', 'stand'); st.pose('bao', 'stand');
    await st.wait(600);
  } },
  { key: ['Tom chose the solar panel'], icon: '☀️', label: 'the solar panel', async play(st) {
    off(st, 'st-lb-made');
    st.look(X.t3 + 40, { dur: 1100 });
    st.walk('hoa', X.pC + 70, { speed: 125, follow: false });
    await st.wait(700);
    on(st, 'st-staken');
    st.hold('tom', 'e095_panel'); st.pose('tom', 'raise'); st.mood('tom', 'joy'); st.sfx('whoosh', { vol: 0.5 });
    on(st, 'st-lb-solar'); st.sfx('click', { vol: 0.6 });
    st.mood('vy', 'joy'); st.pose('vy', 'clap'); st.act('vy', 'clap');
    await st.wait(1300);
    st.act('vy', null); st.pose('vy', 'stand');
  } },
  { key: ['Electricity can be produced from sunlight', 'less coal should be burned'], icon: '⚡', label: 'produced from sunlight', async play(st) {
    off(st, 'st-lb-solar');
    st.look(X.t3 + 40);
    st.hold('tom', null); st.pose('tom', 'e095_explain'); on(st, 'st-panel'); st.sfx('bowl-down', { vol: 0.5 });
    on(st, 'st-lb-sp-tom'); st.talk('tom', true);
    await st.wait(300);
    on(st, 'st-beam', 'st-b-elec'); st.sfx('whoosh', { vol: 0.4 });
    await st.wait(900);
    on(st, 'st-light'); st.sfx('ding', { vol: 0.7 });
    st.mood('vy', 'wow');
    await st.wait(1600);
    off(st, 'st-b-elec'); on(st, 'st-b-coal'); st.sfx('pop', { vol: 0.5 });
    await st.wait(300);
    on(st, 'st-pc'); st.sfx('poof', { vol: 0.5 });
    await st.wait(1500);
    st.talk('tom', false);
  } },
  { key: ['Ms Hoa was impressed'], icon: '👏', label: 'impressed', async play(st) {
    off(st, 'st-b-coal', 'st-lb-sp-tom'); st.pose('tom', 'stand');
    st.look(X.t3 + 60);
    st.face('hoa', -1); st.mood('hoa', 'wow');
    await st.wait(400);
    on(st, 'st-lb-impr');
    st.pose('hoa', 'clap'); st.act('hoa', 'clap'); st.mood('hoa', 'joy'); st.sfx('clap', { vol: 0.7 });
    await st.wait(1300);
    st.act('hoa', null);
  } },
  { key: ['Your posters will be shown at the school science fair next month'], icon: '📅', label: 'will be shown', async play(st) {
    off(st, 'st-lb-impr');
    st.look(X.fair - 120, { dur: 1000 });
    st.face('hoa', 1); st.pose('hoa', 'point'); on(st, 'st-lb-sp-hoa', 'st-fair'); st.talk('hoa', true);
    st.sfx('pop', { vol: 0.5 });
    on(st, 'st-b-fair');
    await st.wait(700);
    st.sfx('whoosh', { vol: 0.5 });
    await st.fly(PANEL_ICON, [X.pC, 150], [X.fair - 56, 118], { size: 40, dur: 700 });
    on(st, 'st-fposter'); st.sfx('page-turn', { vol: 0.7 });
    await st.wait(400);
    on(st, 'st-next'); st.sfx('page-turn', { vol: 0.6 });
    await st.wait(1300);
    st.talk('hoa', false);
  } },
  { key: ['Everyone cheered'], icon: '🎉', label: 'Everyone cheered', async play(st) {
    off(st, 'st-b-fair', 'st-lb-sp-hoa'); st.pose('hoa', 'clap');
    // cả lớp chạy lại gần bảng tin
    st.place('minh', X.pC + 130, FLOOR, -1); st.place('an', X.pC + 190, FLOOR, -1); st.place('mai', X.pC + 250, FLOOR, -1); st.place('bao', X.pC + 310, FLOOR, -1);
    st.look(X.t3 + 200);
    on(st, 'st-conf'); st.sfx('cheer', { vol: 0.8 });
    for (const k of KIDS) { st.pose(k, 'cheer'); st.act(k, 'jump'); st.mood(k, 'joy'); }
    st.act('hoa', 'clap');
    await st.wait(2000);
    for (const k of KIDS) st.act(k, null);
    st.act('hoa', null);
  } },
];

export default {
  id: 'en095', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 2, 3, 6, 8, 10],
  cast: [
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: X.hoa, face: 1 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: X.minh, face: 1 },
    { id: 'an', kind: 'kid', who: 'e095_an', x: X.an, face: -1 },
    { id: 'mai', kind: 'kid', who: 'e095_mai', x: X.mai, face: 1 },
    { id: 'bao', kind: 'kid', who: 'e095_bao', x: X.bao, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: X.tom, face: 1 },
    { id: 'vy', kind: 'kid', who: 'e095_vy', x: X.vy, face: -1 },
    { id: 'drone', kind: 'thing', x: X.t1 - 6, y: TOP, svg: DRONE(1.2), box: [-36, -24, 72, 34] },
  ],
  init(st) {
    st.show('drone', false);
  },
};
