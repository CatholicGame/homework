/**
 * Bài 77 "Safe on the Internet" (must / have to / should): đi từ trái sang phải: lớp học (màn chiếu lớn, cô Hoa cầm điều khiển,
 * Tom và Minh ngồi bàn) → cửa lớp → phố → phòng khách (mẹ và bố ngồi sô-pha) → phòng của Lan (bàn học, máy tính xách tay,
 * đồng hồ treo tường, cửa sổ có rèm).
 * Màn chiếu đổi trang theo từng câu (st-p-*): tiêu đề, "very useful", "be careful", mật khẩu, hẹn gặp người lạ, lời nói xấu,
 * tên trong trò chơi. Mọi nội dung trên màn hình là tự nghĩ ra (không tên hãng, không logo thật).
 * Toạ độ cảnh: rộng 1640, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, room, doorway, windowBox, desk, table, books, shelf, road } from '../kit.js';

const FLOOR = 282;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { hoa: 246, tom: 302, minh: 386, door: 560, home: 820, sofa: 1050, mid: 1240, desk: 1460, clock: 1330, win: 1530 };
const S = { x: 16, y: 52, w: 206, h: 126 }; // màn chiếu
const PX = S.x + 7, PY = S.y + 7; // gốc vùng hiện hình (rộng 192, cao 112)

// ── Hình nhỏ trên màn chiếu ───────────────────────────────────────────────
const GLOBE = `<circle r="24" fill="#38BDF8" stroke="${L}" stroke-width="1.2"/><path d="M-10 -18 Q-2 -10 -10 -2 Q-18 4 -12 14 M6 -20 Q14 -8 8 2 Q4 10 12 18" stroke="#22C55E" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse rx="24" ry="9" fill="none" stroke="#E0F2FE" stroke-width="1.2"/><path d="M0 -24 V24" stroke="#E0F2FE" stroke-width="1.2"/>`;
const SHIELD = (c = '#22C55E') => `<path d="M0 -22 L18 -15 Q18 10 0 22 Q-18 10 -18 -15Z" fill="${c}" stroke="${L}" stroke-width="1.2"/><path d="M-8 0 L-2 7 L9 -6" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const TILE = (inner, c) => `<rect x="-19" y="-19" width="38" height="38" rx="8" fill="${c}" stroke="${L}" stroke-width="1"/>${inner}`;
const ICON_BOOK = `<path d="M-12 -8 Q-6 -11 0 -7 Q6 -11 12 -8 V10 Q6 7 0 10 Q-6 7 -12 10Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M0 -7 V10" stroke="${L}" stroke-width="0.8"/>`;
const ICON_PIN = `<path d="M0 12 Q-11 -1 -11 -4 A11 11 0 1 1 11 -4 Q11 -1 0 12Z" fill="#EF4444" stroke="${L}" stroke-width="0.9"/><circle cy="-4" r="4" fill="#fff"/>`;
const ICON_NOTE = `<path d="M-4 8 V-10 L10 -13 V5" stroke="${L}" stroke-width="2.4" fill="none"/><ellipse cx="-8" cy="8" rx="5" ry="4" fill="#fff" stroke="${L}"/><ellipse cx="6" cy="5" rx="5" ry="4" fill="#fff" stroke="${L}"/>`;
const ICON_PLAY = `<circle r="12" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M-4 -6 L7 0 L-4 6Z" fill="#EF4444"/>`;
const LOCK = `<rect x="-9" y="-3" width="18" height="15" rx="3" fill="#F59E0B" stroke="${L}" stroke-width="1"/><path d="M-5 -3 V-8 A5 5 0 0 1 5 -8 V-3" stroke="${L}" stroke-width="2.2" fill="none"/><circle cy="4" r="2" fill="${L}"/>`;
const KEY = `<circle cx="-8" r="6" fill="#FACC15" stroke="${L}" stroke-width="1"/><circle cx="-8" r="2" fill="#fff"/><path d="M-2 0 H12 M8 0 V5 M12 0 V4" stroke="${L}" stroke-width="2.6" stroke-linecap="round"/>`;
/** Người lạ trên mạng: bóng xám có dấu hỏi. */
const STRANGER = `<circle cy="-10" r="10" fill="#94A3B8" stroke="${L}" stroke-width="1"/><path d="M-16 14 Q-16 0 0 0 Q16 0 16 14Z" fill="#94A3B8" stroke="${L}" stroke-width="1"/>
  <text y="-6" text-anchor="middle" ${NUN} font-size="13" fill="#fff">?</text>`;
const REDX = `<path d="M-14 -14 L14 14 M14 -14 L-14 14" stroke="#DC2626" stroke-width="6" stroke-linecap="round"/>`;
const TICK = `<circle r="9" fill="#22C55E" stroke="${L}" stroke-width="0.9"/><path d="M-4 0 L-1 3.6 L5 -3.4" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const bubble = (x, y, w, text, c = '#1E3A8A', fill = '#fff') => `<g transform="translate(${x} ${y})"><rect x="${-w / 2}" y="-12" width="${w}" height="24" rx="10" fill="${fill}" stroke="${L}" stroke-width="1"/>
  <path d="M${-w / 2 + 10} 10 L${-w / 2 + 4} 20 L${-w / 2 + 20} 11Z" fill="${fill}" stroke="${L}" stroke-width="1" stroke-linejoin="round"/><rect x="${-w / 2 + 8}" y="8" width="14" height="3" fill="${fill}"/>
  <text y="5" text-anchor="middle" ${NUN} font-size="13" fill="${c}">${text}</text></g>`;
const GRUMPY = `<circle r="11" fill="#FB923C" stroke="${L}" stroke-width="1"/><path d="M-6 -5 L-2 -3 M6 -5 L2 -3" stroke="${L}" stroke-width="1.6" stroke-linecap="round"/><circle cx="-4" cy="-1" r="1.4" fill="${L}"/><circle cx="4" cy="-1" r="1.4" fill="${L}"/><path d="M-4 6 Q0 3 4 6" stroke="${L}" stroke-width="1.4" fill="none"/>`;
const HEART = `<path d="M0 6 C-10 -2 -8 -10 -3 -10 C-1 -10 0 -8 0 -7 C0 -8 1 -10 3 -10 C8 -10 10 -2 0 6Z" fill="#F43F5E" stroke="${L}" stroke-width="0.7"/>`;
const ARROW = (x1, x2, y) => `<path d="M${x1} ${y} H${x2 - 6}" stroke="#2563EB" stroke-width="3.4" stroke-linecap="round"/><path d="M${x2 - 9} ${y - 6} L${x2} ${y} L${x2 - 9} ${y + 6}Z" fill="#2563EB"/>`;
/** Hình đại diện trong trò chơi: con cáo xanh. */
const FOX = `<path d="M-11 -6 L-12 -18 L-4 -10Z M11 -6 L12 -18 L4 -10Z" fill="#3B82F6" stroke="${L}" stroke-width="0.8" stroke-linejoin="round"/><circle r="11" fill="#3B82F6" stroke="${L}" stroke-width="1"/>
  <path d="M-8 3 Q0 13 8 3 Q0 6 -8 3Z" fill="#fff"/><circle cx="-4" cy="-2" r="1.6" fill="${L}"/><circle cx="4" cy="-2" r="1.6" fill="${L}"/><circle cy="4" r="1.6" fill="${L}"/>`;

/** Các trang của màn chiếu (toạ độ trong vùng 192 × 112). */
function slides() {
  const p = (name, inner) => `<g class="e077-p e077-p-${name}">${inner}</g>`;
  return `
  ${p('title', `<g transform="translate(66 46)">${GLOBE}</g><g transform="translate(128 46)">${SHIELD()}</g>${label(96, 104, 'internet safety', '#1D4ED8', 13)}`)}
  ${p('useful', `${[[24, ICON_BOOK, '#BFDBFE'], [72, ICON_PIN, '#FDE68A'], [120, ICON_NOTE, '#FBCFE8'], [168, ICON_PLAY, '#BBF7D0']].map(([x, ic, c], i) => `<g transform="translate(${x} 42)"><g class="e077-pop e077-pop${i}">${TILE(ic, c)}</g></g>`).join('')}
    <g class="e077-lbu">${label(96, 102, 'very useful', '#15803D', 14)}</g>`)}
  ${p('careful', `<g transform="translate(96 44)"><g class="e077-warn"><path d="M0 -32 L34 26 H-34Z" fill="#FACC15" stroke="${L}" stroke-width="1.6" stroke-linejoin="round"/>
      <rect x="-3.6" y="-14" width="7.2" height="24" rx="3" fill="${L}"/><circle cy="18" r="4" fill="${L}"/></g></g>${label(96, 104, 'be careful', '#DC2626', 14)}`)}
  ${p('pass', `<g transform="translate(18 28)">${LOCK}</g><rect x="34" y="14" width="140" height="28" rx="7" fill="#F8FAFC" stroke="${L}" stroke-width="1.1"/>
    ${Array.from({ length: 6 }, (_, i) => `<circle class="e077-dot" style="transition-delay:${(i * 0.22).toFixed(2)}s" cx="${52 + i * 20}" cy="28" r="5.5" fill="#1E293B"/>`).join('')}
    <g transform="translate(40 84)">${KEY}</g>${ARROW(60, 112, 84)}<g transform="translate(140 90)">${STRANGER}</g>
    <g transform="translate(88 84)"><g class="e077-x e077-x1">${REDX}</g></g>${label(96, 64, 'password', '#B45309', 11)}`)}
  ${p('meet', `<g transform="translate(30 88)">${STRANGER}</g>${bubble(88, 26, 96, "Let's meet!")}
    <g transform="translate(60 62)"><g class="e077-x e077-x2">${REDX}</g></g>
    <g class="e077-par"><g transform="translate(138 68)">${headOnly('en_mum', { s: 0.8 })}</g><g transform="translate(172 68)">${headOnly('en_dad', { s: 0.8 })}</g>
      <g transform="translate(186 44)">${TICK}</g>${label(154, 106, 'parents', '#15803D', 11)}</g>`)}
  ${p('unkind', `<g transform="translate(176 24)">${GRUMPY}</g>${bubble(100, 24, 112, "You're silly!", '#DC2626', '#FEE2E2')}
    <g transform="translate(36 76)">${headOnly('en_minh', { s: 1, mood: 'sad' })}</g>
    <g class="e077-tell">${ARROW(62, 124, 76)}<g transform="translate(152 76)">${headOnly('en_hoa', { s: 0.95 })}</g><g transform="translate(186 74)"><g class="e077-heart">${HEART}</g></g>
      ${label(94, 106, 'tell an adult', '#1D4ED8', 11)}</g>`)}
  ${p('game', `<rect x="20" y="6" width="152" height="20" rx="6" fill="#7C3AED" stroke="${L}"/><text x="96" y="21" text-anchor="middle" ${NUN} font-size="13" fill="#fff">MY GAME</text>
    <g transform="translate(40 62)">${FOX}</g>
    <text x="64" y="52" ${NUN} font-size="11" fill="#475569">Name:</text>
    <rect x="62" y="57" width="112" height="24" rx="6" fill="#fff" stroke="${L}" stroke-width="1"/>
    <text x="70" y="74" ${NUN} font-size="14" fill="#1E293B">Tom</text>
    <rect class="e077-wipe" x="64" y="59" width="108" height="20" fill="#fff"/>
    <text class="e077-nick" x="70" y="74" ${NUN} font-size="14" fill="#2563EB">Blue Fox 7</text>
    <rect class="e077-type" x="66" y="59" width="106" height="20" fill="#fff"/>
    <g transform="translate(183 69)"><g class="e077-ok">${TICK}</g></g>
    <g class="e077-lbreal">${label(96, 104, 'real name?', '#B45309', 11)}</g><g class="e077-lbnick">${label(92, 104, 'nickname', '#15803D', 11)}</g>`)}`;
}

/** Bảng tải trò chơi (hiện cạnh Minh và mẹ). */
const DL = `<rect x="-62" y="-36" width="124" height="74" rx="10" fill="#1F2937" stroke="${L}" stroke-width="1.2"/><rect x="-56" y="-30" width="112" height="62" rx="5" fill="#E0F2FE"/>
  <g transform="translate(-34 -8)"><rect x="-14" y="-14" width="28" height="28" rx="7" fill="#F97316" stroke="${L}"/><path d="M0 -8 L7 6 H-7Z" fill="#fff"/></g>
  <text x="-12" y="-10" ${NUN} font-size="10" fill="#1E293B">Space Run</text><text x="-12" y="2" ${NUN} font-size="8" fill="#64748B">new game</text>
  <rect x="-46" y="14" width="92" height="9" rx="4.5" fill="#fff" stroke="${L}" stroke-width="0.8"/><rect class="e077-bar" x="-45" y="15" width="90" height="7" rx="3.5" fill="#22C55E"/>
  <g transform="translate(56 -30)"><g class="e077-ok2">${TICK}</g></g>`;

// ── Đồ cầm (gốc = bàn tay, cánh tay hướng +y) ───────────────────────────────
const PROPS = {
  e077_remote: `<g transform="translate(0 -4)"><rect x="-3" y="-8" width="6" height="14" rx="2" fill="#334155" stroke="${L}" stroke-width="0.7"/><circle cy="-4" r="1.4" fill="#EF4444"/></g>`,
  e077_tab: `<g transform="translate(0 -8) rotate(180)"><rect x="-11" y="-8" width="22" height="16" rx="2.4" fill="#1F2937" stroke="${L}" stroke-width="0.8"/><rect x="-9" y="-6" width="18" height="12" rx="1" fill="#F97316"/><path d="M-2 -3 L3 3 H-5Z" fill="#fff"/></g>`,
};
const POSES = {
  e077_click: { R: [70, 70], L: [10, 4] },
  e077_openR: { R: [62, 40], L: [10, 4] },
  e077_sitRaise: { R: [162, 178], L: [22, -40], dy: 20 },
  e077_show: { R: [96, 118], L: [10, 4], head: -4 },
  e077_eyes: { R: [150, 262], L: [10, 4], head: 4 },
  e077_shut: { R: [24, -80], L: [10, 4], dy: 20, head: 4 },
};

function bg() {
  return `
  <!-- Lớp học -->
  ${room(0, X.door, FLOOR, '#E0F2FE', '#D9A066')}
  <rect x="${S.x}" y="${S.y}" width="${S.w}" height="${S.h}" rx="5" fill="#334155" stroke="${L}" stroke-width="1.4"/>
  <rect x="${PX}" y="${PY}" width="192" height="112" rx="3" fill="#F1F5F9"/>
  <rect class="e077-on" x="${PX}" y="${PY}" width="192" height="112" rx="3" fill="#fff"/>
  <clipPath id="e077clip"><rect x="0" y="0" width="192" height="112" rx="3"/></clipPath>
  <g transform="translate(${PX} ${PY})"><g clip-path="url(#e077clip)">${slides()}</g></g>
  <path d="M${S.x + S.w / 2} ${S.y + S.h} V${FLOOR}" stroke="#94A3B8" stroke-width="3"/>
  <rect x="${S.x + S.w / 2 - 22}" y="${FLOOR - 4}" width="44" height="6" rx="3" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/>
  ${windowBox(400, 60, 96, 74)}
  ${shelf(300, 120, 70, books(306, 120, 6))}
  <rect x="${X.door - 50}" y="96" width="38" height="${FLOOR - 96}" rx="2" fill="#B45309" stroke="${L}"/><circle cx="${X.door - 20}" cy="${FLOOR - 90}" r="3" fill="#FDE68A"/>
  <rect x="${X.door - 6}" y="0" width="12" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  <!-- Phố -->
  ${sky(X.door + 6, X.home - X.door - 6, 315, 'e077sky')}
  ${cloud(640, 70, 0.8, 1)}${cloud(760, 46, 0.6, 4)}
  <path d="M${X.door + 6} 236 Q660 210 740 228 T${X.home} 226 V${FLOOR} H${X.door + 6}Z" fill="#86EFAC" stroke="${L}" stroke-width="0.8"/>
  ${tree(700, FLOOR - 8, 0.9)}
  ${road(X.door + 6, X.home - X.door - 6, FLOOR)}
  <!-- Phòng khách -->
  ${room(X.home, X.mid - X.home, FLOOR, '#FEF3C7')}
  ${windowBox(1130, 70, 90, 74)}
  <!-- sô-pha -->
  <g transform="translate(${X.sofa} 0)"><rect x="-96" y="170" width="192" height="64" rx="14" fill="#7C3AED" stroke="${L}" stroke-width="1.2"/></g>
  <g transform="translate(1196 ${FLOOR})"><path d="M-14 0 L-10 -26 H10 L14 0Z" fill="#F97316" stroke="${L}"/>${[-40, -10, 20].map((r) => `<ellipse cy="-42" rx="7" ry="18" fill="#22C55E" stroke="${L}" stroke-width="0.8" transform="rotate(${r} 0 -26)"/>`).join('')}</g>
  ${doorway(X.mid, FLOOR)}
  <!-- Phòng của Lan -->
  ${room(X.mid + 12, 1640 - X.mid - 12, FLOOR, '#FCE7F3', '#D9A066')}
  ${shelf(1370, 128, 80, books(1376, 128, 7))}
  <g transform="translate(${X.clock} 84)"><circle r="24" fill="#fff" stroke="#2563EB" stroke-width="3.4"/>
    ${Array.from({ length: 12 }, (_, i) => `<path d="M0 -20 V-16" stroke="${L}" stroke-width="${i % 3 ? 1 : 2}" transform="rotate(${i * 30})"/>`).join('')}
    <path d="M0 0 L9 5" stroke="${L}" stroke-width="2.8" stroke-linecap="round"/><g class="e077-min"><path d="M0 2 V-17" stroke="#DC2626" stroke-width="2" stroke-linecap="round"/></g><circle r="2.2" fill="${L}"/></g>
  <g class="e077-lb e077-lb-30">${label(X.clock + 96, 84, '30 minutes', '#DC2626', 14)}</g>
  ${windowBox(X.win, 70, 90, 80)}
  ${tree(X.win + 30, 150, 0.42, '')}
  <g class="e077-birds">${[0, 1].map((i) => `<path transform="translate(${X.win + 30 + i * 26} ${92 + i * 10})" d="M-7 0 Q-3 -5 0 0 Q3 -5 7 0" stroke="${L}" stroke-width="1.6" fill="none"/>`).join('')}</g>
  <g class="e077-curL"><rect x="${X.win - 8}" y="62" width="50" height="98" rx="4" fill="#F472B6" stroke="${L}"/></g>
  <g class="e077-curR"><rect x="${X.win + 48}" y="62" width="50" height="98" rx="4" fill="#F472B6" stroke="${L}"/></g>
  <rect x="${X.win - 14}" y="56" width="118" height="8" rx="3" fill="#A16207" stroke="${L}"/>
  <!-- giường -->
  <rect x="1556" y="214" width="84" height="44" rx="6" fill="#93C5FD" stroke="${L}"/><rect x="1548" y="196" width="14" height="${FLOOR - 196}" rx="4" fill="#A16207" stroke="${L}"/><rect x="1570" y="206" width="30" height="14" rx="6" fill="#fff" stroke="${L}"/>
  <!-- nhãn -->
  <g class="e077-lb e077-lb-home">${label(X.home + 110, 70, 'home', '#B45309', 16)}</g>
  <g class="e077-lb e077-lb-rest">${label(X.desk + 4, 106, 'rest', '#15803D', 18)}</g>
  <g class="e077-lb e077-lb-hw">${label(X.desk - 40, 160, 'homework', '#7C3AED', 13)}</g>
  <g class="e077-lb e077-lb-online">${label(X.desk + 84, 182, 'online', '#2563EB', 13)}</g>
  <g transform="translate(918 96)"><g class="e077-dl">${DL}</g></g>`;
}

function fg() {
  return `
  <!-- bàn học sinh (che chân người ngồi) -->
  ${desk(X.tom, FLOOR, '#F59E0B')}${desk(X.minh, FLOOR, '#F59E0B')}
  <g transform="translate(${X.minh - 14} ${FLOOR - 58})"><rect x="-9" y="-3" width="18" height="4" rx="1" fill="#fff" stroke="${L}" stroke-width="0.7"/></g>
  ${bush(780, FLOOR + 22, 0.8, '#4ADE80')}
  <!-- mặt trước sô-pha (che chân người ngồi) -->
  <g transform="translate(${X.sofa} 0)"><rect x="-92" y="222" width="184" height="22" rx="8" fill="#8B5CF6" stroke="${L}"/><rect x="-108" y="200" width="22" height="58" rx="9" fill="#6D28D9" stroke="${L}"/><rect x="86" y="200" width="22" height="58" rx="9" fill="#6D28D9" stroke="${L}"/>
    <rect x="-92" y="242" width="184" height="16" rx="4" fill="#6D28D9" stroke="${L}"/><path d="M-80 258 V${FLOOR} M80 258 V${FLOOR}" stroke="#4C1D95" stroke-width="5"/></g>
  <!-- bàn học của Lan: vở, máy tính xách tay -->
  ${table(X.desk, 226, 130, FLOOR, '#F59E0B')}
  <g transform="translate(${X.desk - 30} 226)"><path d="M-18 0 L-16 -5 H16 L18 0Z" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M0 -5 V0" stroke="${L}" stroke-width="0.6"/>
    <path d="M-13 -3 H-3 M3 -3 H13" stroke="#94A3B8" stroke-width="0.8"/><g transform="translate(10 -14)"><g class="e077-hwtick">${TICK}</g></g></g>
  <g transform="translate(${X.desk + 28} 226)"><rect x="-22" y="-3" width="44" height="4" rx="1.5" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/>
    <g class="e077-lid"><rect x="-19" y="-32" width="38" height="29" rx="2.5" fill="#475569" stroke="${L}" stroke-width="0.8"/><rect x="-16" y="-29" width="32" height="23" rx="1.4" fill="#1E293B"/>
      <g class="e077-scr"><rect x="-16" y="-29" width="32" height="23" rx="1.4" fill="#BAE6FD"/>
        <g transform="translate(0 -15)"><path d="M-8 -1 Q0 -8 8 -1 M-5 2 Q0 -2 5 2" stroke="#2563EB" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cy="5" r="1.6" fill="#2563EB"/></g></g></g></g>`;
}

const CSS = `
.e077-lb { opacity: 0; transition: opacity .35s; }
${['home', 'rest', 'hw', 'online', '30'].map((k) => `.st-lb-${k} .e077-lb-${k}`).join(', ')} { opacity: 1; }
.e077-on { opacity: 0; transition: opacity .4s; } .st-on .e077-on { opacity: 1; }
.e077-p { opacity: 0; transition: opacity .35s; }
${['title', 'useful', 'careful', 'pass', 'meet', 'unkind', 'game'].map((k) => `.st-p-${k} .e077-p-${k}`).join(', ')} { opacity: 1; }
.e077-pop, .e077-lbu, .e077-x, .e077-par, .e077-tell, .e077-ok, .e077-ok2, .e077-hwtick, .e077-lbnick { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: center;
  transition: opacity .25s, transform .4s cubic-bezier(.3,1.6,.6,1); }
.st-u0 .e077-pop0, .st-u1 .e077-pop1, .st-u2 .e077-pop2, .st-u3 .e077-pop3, .st-u4 .e077-lbu,
.st-x1 .e077-x1, .st-x2 .e077-x2, .st-par .e077-par, .st-tell .e077-tell, .st-ok .e077-ok, .st-ok2 .e077-ok2, .st-hwdone .e077-hwtick, .st-ok .e077-lbnick { opacity: 1; transform: none; }
.st-ok .e077-lbreal { opacity: 0; } .e077-lbreal { transition: opacity .3s; }
.e077-warn { transform-box: fill-box; transform-origin: 50% 100%; }
.st-p-careful .e077-warn { animation: e077Wig .4s ease-in-out 4 alternate; }
@keyframes e077Wig { from { transform: rotate(-7deg); } to { transform: rotate(7deg); } }
.e077-dot { opacity: 0; transition: opacity .15s; } .st-dots .e077-dot { opacity: 1; }
.e077-heart { transform-box: fill-box; transform-origin: center; animation: e077Beat .5s ease-in-out infinite alternate; }
@keyframes e077Beat { to { transform: scale(1.25); } }
.e077-wipe { transform: scaleX(0); transform-box: fill-box; transform-origin: 0 50%; transition: transform .8s ease-in-out; }
.st-wipe .e077-wipe { transform: scaleX(1); }
.e077-type, .e077-nick { opacity: 0; } .st-type .e077-nick { opacity: 1; }
.e077-type { transform-box: fill-box; transform-origin: 100% 50%; transition: transform 1.3s steps(10); }
.st-type .e077-type { opacity: 1; transform: scaleX(0); }
.e077-dl { opacity: 0; transform: scale(.4); transform-box: fill-box; transform-origin: 50% 100%; transition: opacity .3s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-dl .e077-dl { opacity: 1; transform: none; }
.e077-bar { transform: scaleX(0); transform-box: fill-box; transform-origin: 0 50%; transition: transform 1.6s linear; }
.st-dlrun .e077-bar { transform: scaleX(1); }
.e077-lid { transform: scaleY(.08); transform-box: fill-box; transform-origin: 50% 100%; transition: transform .5s ease-out; }
.st-lid .e077-lid { transform: none; }
.e077-scr { opacity: 0; transition: opacity .4s; } .st-online .e077-scr { opacity: 1; }
.e077-min { transition: transform 2.4s linear; } .st-30 .e077-min { transform: rotate(180deg); }
.e077-curL, .e077-curR { transition: transform .8s ease-in-out; }
.st-win .e077-curL { transform: translateX(-30px) scaleX(.5); transform-origin: ${X.win - 8}px 0; }
.st-win .e077-curR { transform: translateX(30px) scaleX(.5); transform-origin: ${X.win + 98}px 0; }
.e077-birds { opacity: 0; transition: opacity .4s; } .st-win .e077-birds { opacity: 1; animation: e077Fly 1.2s ease-in-out infinite alternate; }
@keyframes e077Fly { to { transform: translate(10px, -6px); } }
.es-ac.act-e077-tap .pp-fowR { animation: e077Tap .25s ease-in-out infinite alternate; }
@keyframes e077Tap { from { transform: rotate(-6deg); } to { transform: rotate(10deg); } }
@media (prefers-reduced-motion: reduce) {
  .st-p-careful .e077-warn { animation-duration: .9s; animation-iteration-count: 2; }
  .e077-heart, .st-win .e077-birds { animation-duration: 1.4s; }
  .es-ac.act-e077-tap .pp-fowR { animation-duration: .6s; }
}
`;

/** Đổi trang màn chiếu: tắt mọi trang khác. */
const slide = (st, name) => { for (const k of ['title', 'useful', 'careful', 'pass', 'meet', 'unkind', 'game']) st.set(`st-p-${k}`, k === name); };

const BEATS = [
  { key: ['internet safety'], icon: '🌐', label: 'internet safety', async play(st) {
    st.look(180);
    st.hold('hoa', 'e077_remote'); st.pose('hoa', 'e077_click'); st.mood('hoa', 'happy');
    await st.wait(500);
    st.sfx('click'); st.set('st-on'); slide(st, 'title');
    await st.wait(400);
    st.pose('hoa', 'point'); st.mood('hoa', 'joy'); st.sfx('ding', { vol: 0.5 });
    st.mood('minh', 'wow'); st.mood('tom', 'wow');
    await st.wait(1500);
    st.mood('minh', 'happy'); st.mood('tom', 'happy');
  } },
  { key: ['very useful', 'you must be careful'], icon: '⚠️', label: 'be careful', async play(st) {
    st.look(180);
    st.pose('hoa', 'e077_click'); st.sfx('click', { vol: 0.7 }); slide(st, 'useful');
    st.pose('hoa', 'e077_openR'); st.mood('hoa', 'joy');
    for (let i = 0; i < 4; i++) { await st.wait(300); st.set(`st-u${i}`); st.sfx('pop', { vol: 0.5, rate: 1 + i * 0.1 }); }
    await st.wait(300); st.set('st-u4');
    await st.wait(900);
    st.pose('hoa', 'e077_click'); st.sfx('click', { vol: 0.7 }); slide(st, 'careful');
    await st.wait(200);
    st.pose('hoa', 'pointUp'); st.mood('hoa', 'happy'); st.act('hoa', 'point'); st.sfx('beep', { vol: 0.6 });
    await st.wait(1500);
    st.act('hoa', null);
  } },
  { key: ['never share your password'], icon: '🔑', label: 'password', async play(st) {
    st.look(180);
    st.pose('hoa', 'e077_click'); st.sfx('click', { vol: 0.7 }); slide(st, 'pass');
    await st.wait(300);
    st.set('st-dots');
    await st.loop('typing', () => st.wait(1400), { vol: 0.7 });
    st.pose('hoa', 'point');
    await st.wait(500);
    st.set('st-x1'); st.sfx('buzz-no', { vol: 0.6 });
    st.act('hoa', 'no'); st.mood('hoa', 'shut');
    await st.wait(1300);
    st.act('hoa', null); st.mood('hoa', 'happy');
  } },
  { key: ["mustn't meet people from the internet", 'without your parents'], icon: '🚫', label: "mustn't meet", async play(st) {
    st.look(180);
    st.pose('hoa', 'e077_click'); st.sfx('click', { vol: 0.7 }); slide(st, 'meet');
    await st.wait(300);
    st.sfx('beep', { vol: 0.6 });
    await st.wait(900);
    st.pose('hoa', 'point');
    st.set('st-x2'); st.sfx('buzz-no', { vol: 0.6 }); st.act('hoa', 'no');
    await st.wait(1200);
    st.act('hoa', null);
    st.set('st-par'); st.sfx('ding', { vol: 0.5 }); st.pose('hoa', 'clap'); st.mood('hoa', 'joy');
    st.mood('minh', 'joy'); st.act('minh', 'nod'); st.mood('tom', 'joy'); st.act('tom', 'nod');
    await st.wait(1200);
    st.act('minh', null); st.mood('minh', 'happy'); st.act('tom', null); st.mood('tom', 'happy');
  } },
  { key: ['unkind to you online', 'tell an adult'], icon: '🧑‍🏫', label: 'tell an adult', async play(st) {
    st.look(180);
    st.pose('hoa', 'e077_click'); st.sfx('click', { vol: 0.7 }); slide(st, 'unkind');
    await st.wait(300);
    st.sfx('beep', { vol: 0.6 }); st.mood('minh', 'sad'); st.mood('tom', 'sad');
    await st.wait(1600);
    st.set('st-tell'); st.sfx('whoosh', { vol: 0.5 });
    st.pose('hoa', 'me'); st.mood('hoa', 'joy');
    await st.wait(400);
    st.sfx('hearts', { vol: 0.6 }); st.mood('minh', 'happy'); st.mood('tom', 'happy'); st.act('tom', 'nod');
    await st.wait(1300);
    st.act('tom', null); st.pose('hoa', 'stand');
  } },
  { key: ['use our real names in games'], icon: '🙋', label: 'real names?', async play(st) {
    st.look(180);
    st.pose('hoa', 'e077_click'); st.sfx('click', { vol: 0.7 }); slide(st, 'game');
    await st.wait(300);
    st.pose('tom', 'e077_sitRaise'); st.mood('tom', 'wow'); st.sfx('whoosh', { vol: 0.35 });
    await st.wait(300);
    st.face('hoa', 1); st.pose('hoa', 'stand');
    st.mood('tom', 'happy'); st.sfx('pop', { vol: 0.5 });
    await st.say('tom', 'Real names?', 2200);
    st.pose('tom', 'sitDesk');
  } },
  { key: ["you don't have to"], icon: '🙅', label: "don't have to", async play(st) {
    st.look(180);
    st.face('hoa', 1); st.pose('hoa', 'stand'); st.act('hoa', 'no'); st.mood('hoa', 'joy');
    await st.wait(500);
    st.face('hoa', -1); st.pose('hoa', 'e077_click'); st.act('hoa', null);
    st.set('st-wipe'); st.sfx('wipe', { vol: 0.8 });
    await st.wait(1300);
    st.pose('hoa', 'stand');
  } },
  { key: ["you shouldn't use them"], icon: '🦊', label: 'nickname', async play(st) {
    st.look(180);
    st.pose('hoa', 'point');
    st.set('st-type');
    await st.loop('typing', () => st.wait(1300), { vol: 0.7 });
    st.set('st-ok'); st.sfx('ding', { vol: 0.6 });
    st.pose('tom', 'e077_sitRaise'); st.mood('tom', 'joy'); st.act('tom', 'nod');
    await st.wait(1300);
    st.act('tom', null); st.pose('tom', 'sitDesk'); st.pose('hoa', 'stand');
  } },
  { key: ['At home', 'ask Mum before he downloads a new game'], icon: '📲', label: 'ask Mum', async play(st) {
    st.pose('minh', 'stand'); st.mood('minh', 'happy');
    st.hold('minh', 'e077_tab');
    // ra cửa lớp (tiếng cửa đúng lúc qua cửa), đi qua phố về nhà
    const walk = st.walk('minh', X.sofa - 156, { speed: 140, lead: 30 });
    st.wait(1250).then(() => st.sfx('door-open', { vol: 0.5 }));
    st.wait(3100).then(() => st.sfx('door-open', { vol: 0.4 }));
    await walk;
    st.set('st-lb-home');
    st.face('minh', 1);
    st.pose('minh', 'e077_show'); st.mood('minh', 'joy'); st.sfx('pop', { vol: 0.5 });
    await st.say('minh', 'Can I download it?', 1500);
    st.mood('mum', 'happy'); st.act('mum', 'nod'); st.sfx('pop', { vol: 0.4 });
    await st.say('mum', 'Yes, you can.', 1100);
    st.act('mum', null);
    st.set('st-lb-home', false);
    st.set('st-dl'); st.sfx('beep', { vol: 0.5 });
    await st.wait(300);
    st.set('st-dlrun');
    await st.wait(1600);
    st.set('st-ok2'); st.sfx('ding', { vol: 0.6 }); st.mood('minh', 'joy'); st.act('minh', 'hop');
    await st.wait(700);
    st.act('minh', null);
  } },
  { key: ['finish her homework', 'goes online'], icon: '📝', label: 'homework first', async play(st) {
    st.set('st-dl', false);
    st.look(X.desk - 40, { dur: 1100 });
    await st.wait(600);
    st.hold('lan', 'pencil'); st.pose('lan', 'write'); st.act('lan', 'write'); st.set('st-lb-hw');
    await st.loop('pencil', () => st.wait(1500), { vol: 0.8 });
    st.act('lan', null); st.set('st-hwdone'); st.sfx('ding', { vol: 0.5 }); st.mood('lan', 'joy');
    await st.wait(500);
    st.set('st-lb-hw', false);
    st.hold('lan', null); st.pose('lan', 'sitDesk');
    st.set('st-lid'); st.sfx('click', { vol: 0.6 });
    await st.wait(500);
    st.set('st-online'); st.set('st-lb-online'); st.act('lan', 'e077-tap');
    await st.loop('typing', () => st.wait(1200), { vol: 0.6 });
    st.act('lan', null);
  } },
  { key: ['take a break every thirty minutes'], icon: '⏰', label: '30 minutes', async play(st) {
    st.set('st-lb-online', false);
    st.pose('dad', 'stand'); st.chest('dad', null); st.act('dad', null);
    await st.walk('dad', X.clock + 10, { speed: 150, lead: 80 });
    st.face('dad', 1);
    st.pose('dad', 'pointUp'); st.face('dad', -1); st.mood('dad', 'happy');
    st.set('st-30'); st.set('st-lb-30');
    await st.loop('tick', () => st.wait(2400), { vol: 0.8 });
    st.sfx('alarm-clock', { vol: 0.5 }); st.mood('lan', 'wow');
    st.face('dad', 1); st.pose('dad', 'point');
    await st.say('dad', 'Take a break!', 1400);
  } },
  { key: ['eyes need some rest'], icon: '😌', label: 'rest', async play(st) {
    st.set('st-lb-30', false);
    st.look(X.desk - 40);
    st.pose('dad', 'e077_eyes'); st.mood('dad', 'joy');
    st.set('st-online', false); st.set('st-lid', false); st.sfx('click', { vol: 0.6 });
    await st.wait(500);
    st.pose('lan', 'stand');
    await st.walk('lan', X.win + 6, { speed: 110, follow: false });
    st.face('lan', 1); st.pose('lan', 'stretch'); st.act('lan', 'stretch');
    st.set('st-win'); st.sfx('window-open', { vol: 0.6 });
    await st.wait(600);
    st.sfx('birds', { vol: 0.6 }); st.mood('lan', 'shut'); st.set('st-lb-rest');
    await st.wait(1600);
    st.act('lan', null);
  } },
];

export default {
  id: 'en077', worldW: 1640, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 2, 4, 7, 8, 10],
  cast: [
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: X.hoa, s: 0.95, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: X.tom },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: X.minh },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: X.sofa + 10, s: 0.95, face: -1 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: X.sofa + 72, s: 0.95, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.desk, s: 1.06 },
  ],
  init(st) {
    st.pose('tom', 'sitDesk'); st.pose('minh', 'sitDesk');
    st.pose('mum', 'sitDesk'); st.pose('dad', 'read'); st.chest('dad', 'book'); st.act('dad', 'read');
    st.pose('lan', 'sitDesk');
  },
};
