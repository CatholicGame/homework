/**
 * Tranh bìa của thẻ trang chủ (như bìa thẻ truyện app Kinh Thánh): mỗi loại thẻ một cảnh nhỏ cùng lối vẽ với tranh đầu trang
 * (homeHero.js, sceneKit Tiếng Việt 3): màu phẳng tươi, viền nâu mảnh, mặt sáng / khuất, nhân vật cast.js.
 * Khung 320×180 cắt "slice" giữa: thẻ ngang trên điện thoại (ô tranh hẹp) chỉ thấy x ≈ 60…260, nên hình chính nằm giữa.
 * thumbArt(card): chọn cảnh theo id (bỏ tiền tố lớp "gradeN-"), --card-color tô điểm xuyết (bìa vở, cờ…).
 * Xem tất cả: scripts/home-dev.html?thumbs=1
 */
import { LINE, cloud, sun, flowers, tufts } from './tiengViet3/sceneKit.js';
import { person } from './tiengViet3/cast.js';
import { tree, mix } from './homeHero.js';

const FONT = 'Nunito, Quicksand, sans-serif';
const HAND = '#2B4C9B'; // mực xanh của bé
const txt = (x, y, t, { s = 14, c = '#3A2E48', w = 800, a = 'middle', rot = 0 } = {}) =>
  `<text x="${x}" y="${y}" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a}" font-family="${FONT}"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''}>${t}</text>`;
const frame = (inner) => `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${inner}</svg>`;
const shadow = (x, y, rx, ry = 4) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#000" opacity="0.1"/>`;

// ── Nền ──────────────────────────────────────────────────────────────────
let uid = 0;
const skyBg = (top = '#7DD3FC', bottom = '#E0F2FE') => {
  const id = `ht${++uid}`;
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
  <rect width="320" height="180" fill="url(#${id})"/>`;
};
const meadow = (y = 140, c = '#86CF6A') => `<path d="M0 ${y} Q80 ${y - 14} 160 ${y - 4} T320 ${y - 6} V180 H0Z" fill="${c}"/>
  <path d="M0 ${y + 2} Q80 ${y - 12} 160 ${y - 2} T320 ${y - 4}" stroke="${mix(c, '#2F5A1E', 0.3)}" stroke-width="1" fill="none" opacity="0.5"/>`;
/** Phòng học / phòng bé: tường, cửa sổ có trời, sàn gỗ. */
const room = (wall = '#FFF1D6', { win = 248 } = {}) => `<rect width="320" height="180" fill="${wall}"/>
  <rect x="0" y="0" width="320" height="10" fill="${mix(wall, '#C2884A', 0.18)}"/>
  ${win == null ? '' : `<g transform="translate(${win} 26)"><rect x="-2" y="-2" width="58" height="50" rx="4" fill="#fff" stroke="${LINE}" stroke-width="1"/>
    <rect width="54" height="46" rx="3" fill="#BAE6FD"/>${cloud(22, 20, 0.45)}<path d="M27 0 V46 M0 23 H54" stroke="#fff" stroke-width="3"/></g>`}
  <rect y="132" width="320" height="48" fill="#E3B98A"/>${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${i * 64} 132 V180" stroke="#C99A6A" stroke-width="1"/>`).join('')}
  <path d="M0 132 H320" stroke="${LINE}" stroke-width="1" opacity="0.5"/>`;
/** Mặt bàn gỗ phía trước (y: mép trên). */
const desk = (y = 142) => `<rect x="-4" y="${y}" width="328" height="10" rx="3" fill="#C98B55" stroke="${LINE}" stroke-width="1"/>
  <rect x="-4" y="${y + 10}" width="328" height="${180 - y}" fill="#A86B3C"/><path d="M-4 ${y + 3} H324" stroke="#E2AE78" stroke-width="1.4" opacity="0.8"/>`;

// ── Đồ vật ───────────────────────────────────────────────────────────────
/** Bút chì (x, y: đầu chì), xoay rot, dài len. */
const pencil = (x, y, rot = -30, len = 64, body = '#FACC15') => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M0 0 L12 -5 V5Z" fill="#F5D0A9" stroke="${LINE}" stroke-width="0.8" stroke-linejoin="round"/><path d="M0 0 L4.5 -1.9 V1.9Z" fill="#3A2E48"/>
  <rect x="12" y="-5" width="${len - 22}" height="10" fill="${body}" stroke="${LINE}" stroke-width="0.8"/>
  <path d="M12 -1.6 H${len - 10}" stroke="${mix(body, '#7A4A0E', 0.25)}" stroke-width="1"/>
  <rect x="${len - 10}" y="-5" width="5" height="10" fill="#CBD5E1" stroke="${LINE}" stroke-width="0.8"/>
  <rect x="${len - 5}" y="-5" width="7" height="10" rx="2.5" fill="#F9A8D4" stroke="${LINE}" stroke-width="0.8"/></g>`;
/** Vở mở (x giữa, y mép dưới): bìa màu cover, hai trang kẻ dòng, nội dung lines ở trang phải ([chữ, màu]). */
const notebook = (x, y, cover, { left = [], right = [], w = 150, h = 92, rot = 0 } = {}) => {
  const page = (px, list) => `<rect x="${px}" y="${y - h + 4}" width="${w / 2 - 4}" height="${h - 8}" fill="#FFFDF7" stroke="${LINE}" stroke-width="0.8"/>
    ${Array.from({ length: 5 }, (_, i) => `<path d="M${px + 5} ${y - h + 22 + i * 14} H${px + w / 2 - 9}" stroke="#BFDBFE" stroke-width="1"/>`).join('')}
    ${list.map(([t, c], i) => txt(px + (w / 2 - 4) / 2, y - h + 19 + i * 14, t, { s: 11, c: c || HAND, w: 700 })).join('')}`;
  return `<g transform="rotate(${rot} ${x} ${y})">${shadow(x + 4, y + 2, w / 2 + 4, 4)}
    <rect x="${x - w / 2 - 4}" y="${y - h}" width="${w + 8}" height="${h + 2}" rx="5" fill="${cover}" stroke="${LINE}" stroke-width="1"/>
    ${page(x - w / 2, left)}${page(x + 4, right)}
    <path d="M${x} ${y - h + 4} V${y - 4}" stroke="${mix(cover, '#000000', 0.25)}" stroke-width="2"/></g>`;
};
/** Sách / vở đóng (x trái, y đáy): bìa màu, gáy, nhãn trắng. */
const book = (x, y, w, h, c, { label = '', tilt = 0 } = {}) => `<g transform="rotate(${tilt} ${x} ${y})">
  <rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="3" fill="${c}" stroke="${LINE}" stroke-width="1"/>
  <rect x="${x}" y="${y - h}" width="7" height="${h}" rx="2" fill="${mix(c, '#000000', 0.2)}"/>
  <rect x="${x + 14}" y="${y - h + 10}" width="${w - 22}" height="${Math.min(22, h * 0.3)}" rx="3" fill="#fff" opacity="0.92"/>
  ${label ? txt(x + 7 + (w - 7) / 2, y - h + 10 + Math.min(22, h * 0.3) / 2 + 5, label, { s: 13, c: mix(c, '#000000', 0.35) }) : ''}</g>`;
/** Bảng đen (x, y góc trên trái): khung gỗ, nội dung phấn. */
const board = (x, y, w, h, inner) => `<rect x="${x - 5}" y="${y - 5}" width="${w + 10}" height="${h + 10}" rx="4" fill="#B07A45" stroke="${LINE}" stroke-width="1"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#2F6B4F"/><path d="M${x + 8} ${y + h - 10} q20 -6 40 0" stroke="#fff" stroke-width="1" opacity="0.15" fill="none"/>${inner}
  <rect x="${x + w - 40}" y="${y + h + 4}" width="34" height="5" rx="2" fill="#E5E7EB" stroke="${LINE}" stroke-width="0.6"/>`;
const chalk = (x, y, t, s = 16, a = 'middle') => txt(x, y, t, { s, c: '#F8FAFC', w: 700, a });
/** Tờ giấy kiểm tra (x, y góc trên trái): dòng kẻ, dấu ✓ đỏ, điểm 10 khoanh đỏ. */
const testPaper = (x, y, rot = -4) => `<g transform="rotate(${rot} ${x + 60} ${y + 70})">${shadow(x + 64, y + 142, 62, 4)}
  <rect x="${x}" y="${y}" width="120" height="140" rx="3" fill="#fff" stroke="${LINE}" stroke-width="1"/>
  ${Array.from({ length: 5 }, (_, i) => `<path d="M${x + 12} ${y + 50 + i * 18} H${x + 84}" stroke="#CBD5E1" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M${x + 92} ${y + 48 + i * 18} l4 5 l9 -11" stroke="#E11D48" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
  <path d="M${x + 12} ${y + 16} H${x + 60}" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="${x + 94}" cy="${y + 24}" rx="20" ry="15" fill="none" stroke="#E11D48" stroke-width="2.2" transform="rotate(-8 ${x + 94} ${y + 24})"/>
  ${txt(x + 94, y + 31, '10', { s: 20, c: '#E11D48', w: 900, rot: -8 })}</g>`;
const star = (x, y, r = 8, c = '#FACC15', cls = '') => {
  const p = Array.from({ length: 10 }, (_, i) => { const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * 0.45 : r; return `${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)}`; }).join(' ');
  return `<polygon${cls ? ` class="${cls}"` : ''} points="${p}" fill="${c}" stroke="${mix(c, '#7A4A0E', 0.4)}" stroke-width="0.8" stroke-linejoin="round"/>`;
};
const bubble = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="0.35" stroke="#fff" stroke-width="0.8"/>`;

// ── Con vật vẽ riêng cho bìa ─────────────────────────────────────────────
const bunny = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${shadow(0, 0, 26, 4)}
  ${[-1, 1].map(k => `<g transform="rotate(${k * 10} ${k * 8} -58)"><ellipse cx="${k * 8}" cy="-78" rx="7" ry="22" fill="#fff" stroke="${LINE}" stroke-width="1"/><ellipse cx="${k * 8}" cy="-76" rx="3.4" ry="15" fill="#FBCFE8"/></g>`).join('')}
  <ellipse cx="0" cy="-20" rx="24" ry="21" fill="#fff" stroke="${LINE}" stroke-width="1"/><ellipse cx="0" cy="-14" rx="13" ry="12" fill="#FDF2F8"/>
  <circle cx="0" cy="-50" r="19" fill="#fff" stroke="${LINE}" stroke-width="1"/>
  <circle cx="-7" cy="-52" r="2.6" fill="#3A2E48"/><circle cx="7" cy="-52" r="2.6" fill="#3A2E48"/><circle cx="-6.2" cy="-53" r="0.9" fill="#fff"/><circle cx="7.8" cy="-53" r="0.9" fill="#fff"/>
  <ellipse cx="-12" cy="-45" rx="3.6" ry="2.2" fill="#FBCFE8"/><ellipse cx="12" cy="-45" rx="3.6" ry="2.2" fill="#FBCFE8"/>
  <path d="M-2 -46 h4 l-2 2.4z" fill="#F472B6"/><path d="M0 -43.6 q-3 3 -5 1 M0 -43.6 q3 3 5 1" stroke="${LINE}" stroke-width="0.9" fill="none" stroke-linecap="round"/>
  <ellipse cx="-12" cy="-1" rx="8" ry="4" fill="#fff" stroke="${LINE}" stroke-width="0.9"/><ellipse cx="12" cy="-1" rx="8" ry="4" fill="#fff" stroke="${LINE}" stroke-width="0.9"/></g>`;
const carrot = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M-6 0 Q0 26 2 30 Q6 24 6 0Z" fill="#FB923C" stroke="${LINE}" stroke-width="0.8"/>
  <path d="M-3 8 h4 M-1 15 h4" stroke="#C2410C" stroke-width="1"/><path d="M0 0 q-6 -10 -2 -14 M0 0 q1 -12 6 -12 M0 0 q6 -6 9 -4" stroke="#22C55E" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`;
const croc = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">${shadow(0, 0, 40, 4)}
  <path d="M-36 -4 Q-40 -26 -14 -28 L34 -40 Q40 -38 36 -32 L4 -18 L36 -10 Q40 -4 34 -2 L-30 0Z" fill="#4ADE80" stroke="${LINE}" stroke-width="1" stroke-linejoin="round"/>
  <path d="M-12 -26 L32 -38 M2 -16 L34 -9" stroke="#fff" stroke-width="2.2" stroke-dasharray="3 4"/>
  <path d="M-30 -4 Q-20 -2 0 -8" stroke="#16A34A" stroke-width="1.2" fill="none"/>
  <circle cx="-20" cy="-30" r="7" fill="#fff" stroke="${LINE}" stroke-width="1"/><circle cx="-18" cy="-30" r="3" fill="#3A2E48"/>
  ${[-30, -22, -14].map(px => `<circle cx="${px}" cy="-12" r="2" fill="#22C55E"/>`).join('')}</g>`;
const apple = (x, y, r = 8) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#EF4444" stroke="${LINE}" stroke-width="0.8"/><ellipse cx="${-r * 0.35}" cy="${-r * 0.35}" rx="${r * 0.25}" ry="${r * 0.35}" fill="#FCA5A5"/>
  <path d="M0 ${-r} q1 -4 3 -5" stroke="#7C4A21" stroke-width="1.4" fill="none"/><ellipse cx="4" cy="${-r - 3}" rx="3.4" ry="1.8" fill="#22C55E"/></g>`;
const shark = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-70 0 Q-40 -30 20 -24 Q56 -20 70 0 Q50 20 10 22 Q-40 22 -70 0Z" fill="#60A5FA" stroke="${LINE}" stroke-width="1"/>
  <path d="M-60 6 Q-20 22 30 16 Q56 12 66 4 Q40 18 0 20 Q-40 20 -60 6Z" fill="#EFF6FF"/>
  <path d="M-10 -24 L4 -52 L18 -23Z" fill="#3B82F6" stroke="${LINE}" stroke-width="1" stroke-linejoin="round"/>
  <path d="M-66 0 L-92 -22 L-86 0 L-92 22Z" fill="#3B82F6" stroke="${LINE}" stroke-width="1" stroke-linejoin="round"/>
  <path d="M0 14 L-14 32 L14 18Z" fill="#3B82F6" stroke="${LINE}" stroke-width="1" stroke-linejoin="round"/>
  <circle cx="40" cy="-8" r="5" fill="#fff" stroke="${LINE}" stroke-width="0.8"/><circle cx="41.5" cy="-8" r="2.6" fill="#1E293B"/>
  <path d="M42 6 Q54 10 62 4" stroke="${LINE}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  ${[24, 28, 32].map(gx => `<path d="M${gx} -6 q-2 6 0 10" stroke="#2563EB" stroke-width="1.2" fill="none"/>`).join('')}</g>`;
const ufo = (x, y, s = 1, c = '#A78BFA') => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-30 18 L-44 80 H44 L30 18Z" fill="#FEF08A" opacity="0.28"/>
  <path d="M-22 -2 A22 22 0 0 1 22 -2Z" fill="#BAE6FD" stroke="${LINE}" stroke-width="1"/>
  <circle cx="0" cy="-10" r="8" fill="#A3E635" stroke="${LINE}" stroke-width="0.8"/><circle cx="-3" cy="-11" r="2" fill="#1E293B"/><circle cx="3" cy="-11" r="2" fill="#1E293B"/>
  <path d="M0 -18 V-24" stroke="#4D7C0F" stroke-width="1.4"/><circle cx="0" cy="-25" r="2" fill="#FACC15"/>
  <ellipse cx="0" cy="4" rx="46" ry="13" fill="${c}" stroke="${LINE}" stroke-width="1"/>
  <ellipse cx="0" cy="1" rx="44" ry="8" fill="${mix(c, '#FFFFFF', 0.35)}"/>
  ${[-30, -15, 0, 15, 30].map((lx, i) => `<circle class="hh-blink" style="--d:${i * 0.25}s" cx="${lx}" cy="10" r="2.6" fill="${i % 2 ? '#FDE047' : '#F472B6'}"/>`).join('')}</g>`;
const bird = (x, y, s = 1, c = '#F59E0B', flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
  <ellipse cx="0" cy="0" rx="12" ry="9" fill="${c}" stroke="${LINE}" stroke-width="0.9"/><circle cx="9" cy="-7" r="6.5" fill="${c}" stroke="${LINE}" stroke-width="0.9"/>
  <path d="M15 -7 l6 1.5 l-6 1.8z" fill="#F97316" stroke="${LINE}" stroke-width="0.6"/><circle cx="10.5" cy="-8.5" r="1.6" fill="#1E293B"/>
  <path d="M-4 -3 q-8 -2 -10 6 q8 2 12 -2z" fill="${mix(c, '#7A4A0E', 0.2)}" stroke="${LINE}" stroke-width="0.7"/>
  <path d="M-11 0 l-8 -4 l1 6z" fill="${mix(c, '#7A4A0E', 0.2)}"/><path d="M-2 9 v4 M3 9 v4" stroke="#7C4A21" stroke-width="1.2"/></g>`;

// Phép tính trong vở theo lớp (g: số lớp trong id thẻ), [Tập Một, Tập Hai] × [trang trái, trang phải]
const SUMS = {
  1: [[['3 + 2 = 5'], ['4 + 1 = 5'], ['5 − 3 = 2']], [['6 + 3 = 9'], ['8 − 4 = 4'], ['7 + 2 = 9']],
    [['20 + 30 = 50'], ['45 − 5 = 40']], [['32 + 6 = 38'], ['70 − 20 = 50']]],
  2: [[['8 + 5 = 13'], ['9 + 7 = 16']], [['35 + 27 = 62'], ['52 − 18 = 34']],
    [['2 × 5 = 10'], ['15 : 5 = 3']], [['345 + 12'], ['1 m = 100 cm']]],
  3: [[['6 × 7 = 42'], ['56 : 8 = 7']], [['24 × 3 = 72'], ['96 : 4 = 24']],
    [['12 × 3 = 36'], ['45 : 5 = 9']], [['24 + 18 = 42'], ['70 − 26 = 44']]],
};
const sums = (g, tap) => { const t = SUMS[g] || SUMS[3]; return tap === 2 ? [t[2], t[3]] : [t[0], t[1]]; };

// ── Các cảnh ─────────────────────────────────────────────────────────────
const SCENES = {
  // Vở bài tập: bé cầm bút chì bên vở mở có phép tính
  workbook: (c, g) => room('#FFF1D6') + person(250, 196, 'nam', 'raise', { s: 0.95, prop: 'pencil', mood: 'joy' }) + desk(140)
    + notebook(140, 166, c, { left: sums(g, 1)[0], right: sums(g, 1)[1], rot: -3 })
    + pencil(60, 160, -20, 60, '#60A5FA') + `<g transform="translate(36 120)">${apple(0, 0, 9)}</g>`,
  'workbook-2': (c, g) => room('#EAF6FF', { win: 20 }) + person(78, 196, 'linh', 'raise', { s: 0.95, prop: 'pencil', mood: 'joy' }) + desk(140)
    + notebook(186, 166, c, { left: sums(g, 2)[0], right: sums(g, 2)[1], rot: 3 })
    + pencil(276, 158, -150, 60, '#F472B6') + star(286, 118, 9),
  // Luyện tập theo tuần: lịch tuần trên tường, các ngày đã làm đánh dấu
  practice: (c) => room('#FFF7E6', { win: null }) + `<g transform="translate(26 22)">${shadow(64, 92, 62, 3)}
      <rect width="128" height="88" rx="5" fill="#fff" stroke="${LINE}" stroke-width="1"/><rect width="128" height="20" rx="5" fill="${c}"/><rect y="14" width="128" height="6" fill="${c}"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${8 + (i % 4) * 29}" y="${28 + Math.floor(i / 4) * 28}" width="24" height="22" rx="3" fill="${i < 4 ? mix(c, '#FFFFFF', 0.82) : '#F8FAFC'}" stroke="#E2E8F0"/>
        ${i < 4 ? `<path d="M${14 + (i % 4) * 29} ${40 + Math.floor(i / 4) * 28} l4 4 l8 -9" stroke="#16A34A" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : txt(20 + (i % 4) * 29, 44 + Math.floor(i / 4) * 28, i + 1, { s: 11, c: '#94A3B8' })}`).join('')}
      <circle cx="30" cy="-2" r="3" fill="#94A3B8"/><circle cx="98" cy="-2" r="3" fill="#94A3B8"/></g>`
    + person(232, 196, 'minh', 'point', { s: 0.95, flip: true, mood: 'joy' }) + desk(146) + book(40, 150, 70, 14, c, { tilt: -2 }) + pencil(150, 156, -10, 56),
  // Luyện đề: tờ kiểm tra điểm 10, bé reo
  tests: () => room('#F3EEFF', { win: null }) + person(232, 196, 'mai', 'cheer', { s: 0.95, mood: 'joy' }) + desk(150) + testPaper(64, 22, -5)
    + star(214, 40, 8, '#FACC15', 'hh-twinkle') + star(276, 30, 6, '#FACC15', 'hh-twinkle') + star(258, 64, 5, '#FDE047', 'hh-twinkle'),
  // Luyện tính: bảng đen có phép tính đặt cột, cô giáo chỉ bảng
  drills: () => room('#FFF4E0', { win: null }) + board(26, 22, 190, 104, `${chalk(120, 50, '4 8', 22, 'end')}${chalk(66, 72, '+', 20)}${chalk(120, 72, '2 5', 22, 'end')}
      <path d="M70 80 H128" stroke="#F8FAFC" stroke-width="2.4" stroke-linecap="round"/>${chalk(120, 104, '7 3', 22, 'end')}
      ${chalk(176, 62, '6', 18)}${chalk(176, 84, '×', 16)}${chalk(176, 106, '7', 18)}`)
    + person(262, 200, 'coHuong', 'point', { s: 0.82, flip: true, mood: 'joy' }),
  // Sách Toán 4: chồng sách, sách mở có hình học
  textbook: (c) => room('#EEF2FF') + desk(140) + book(26, 142, 82, 20, '#F59E0B') + book(30, 122, 76, 18, '#10B981') + book(34, 104, 70, 18, c)
    + notebook(196, 166, c, { left: [['1 234 567'], ['3/4 + 1/4']], right: [['a × b'], ['S = a × a']], w: 160 })
 + pencil(118, 166, -12, 56, '#F472B6'),
  // Học bằng công cụ: thước kẻ, thước đo góc, ê ke trên bàn
  tools: (c) => room('#F0FDF4', { win: 24 }) + person(84, 192, 'tun', 'point', { s: 1, mood: 'joy' }) + desk(142)
    + `<g transform="translate(212 162)">${shadow(0, 2, 70, 4)}<path d="M-64 0 A64 64 0 0 1 64 0Z" fill="#BAE6FD" fill-opacity="0.85" stroke="${LINE}" stroke-width="1"/>
      ${Array.from({ length: 19 }, (_, i) => { const a = Math.PI * i / 18; return `<path d="M${(-Math.cos(a) * 64).toFixed(1)} ${(-Math.sin(a) * 64).toFixed(1)} L${(-Math.cos(a) * (i % 3 ? 58 : 52)).toFixed(1)} ${(-Math.sin(a) * (i % 3 ? 58 : 52)).toFixed(1)}" stroke="#0369A1" stroke-width="1"/>`; }).join('')}
      <path d="M-30 0 A30 30 0 0 1 30 0" fill="none" stroke="#0369A1" stroke-width="0.8"/><circle r="3" fill="#0369A1"/>
      <path d="M0 0 L34 -46" stroke="#E11D48" stroke-width="2" stroke-linecap="round"/></g>
      <g transform="translate(118 168) rotate(-6)"><path d="M0 0 V-44 L56 0Z" fill="${mix(c, '#FFFFFF', 0.45)}" fill-opacity="0.9" stroke="${LINE}" stroke-width="1"/><path d="M0 -8 h8 v8" fill="none" stroke="${LINE}" stroke-width="1"/></g>
      <g transform="translate(150 176) rotate(-3)"><rect width="150" height="12" fill="#FDE68A" stroke="#B45309" stroke-width="0.9"/>
      ${Array.from({ length: 15 }, (_, i) => `<path d="M${6 + i * 10} 0 v${i % 5 ? 4 : 7}" stroke="#92400E" stroke-width="1"/>`).join('')}</g>`,
  // Bản đồ kiến thức: tấm bản đồ có đường chấm tới lá cờ
  'knowledge-map': () => skyBg('#7DD3FC', '#E0F2FE') + cloud(60, 30, 0.6) + cloud(270, 26, 0.5) + meadow(132)
    + `<g transform="translate(160 96)">${shadow(0, 64, 110, 5)}
      <path d="M-108 -54 L-36 -62 L36 -54 L108 -62 V58 L36 66 L-36 58 L-108 66Z" fill="#FDF0C8" stroke="${LINE}" stroke-width="1" stroke-linejoin="round"/>
      <path d="M-36 -62 V58 M36 -54 V66" stroke="#E2C88A" stroke-width="1.2"/>
      <path d="M-84 -20 q14 -16 30 -4 q12 10 4 22 q-18 10 -34 -18z" fill="#86EFAC" stroke="#16A34A" stroke-width="0.8"/>
      <path d="M44 6 q18 -18 40 -6 q10 14 -6 26 q-22 6 -34 -20z" fill="#86EFAC" stroke="#16A34A" stroke-width="0.8"/>
      <path d="M-14 -40 q10 -8 22 0 q4 12 -10 14 q-14 -2 -12 -14z" fill="#BAE6FD" stroke="#0284C7" stroke-width="0.8"/>
      <path d="M-70 -8 C-40 30 -10 -30 20 10 S60 30 66 12" stroke="#E11D48" stroke-width="2.2" stroke-dasharray="2 5" fill="none" stroke-linecap="round"/>
      ${[[-70, -8, '#22C55E'], [-24, 4, '#22C55E'], [20, 10, '#F59E0B']].map(([px, py, cc]) => `<circle cx="${px}" cy="${py}" r="6" fill="${cc}" stroke="#fff" stroke-width="2"/>`).join('')}
      <path d="M66 12 V-18" stroke="${LINE}" stroke-width="1.6"/><path class="hh-flag" d="M66 -18 l20 6 l-20 6z" fill="#E11D48"/></g>`
    + person(276, 196, 'minh', 'point', { s: 0.62, flip: true, mood: 'wow' }),
  // Phố kỹ năng: vạch qua đường, đèn xanh, mẹ dắt bé
  'life-skills': () => skyBg('#93C5FD', '#E0F2FE') + `<rect y="62" width="320" height="64" fill="#FDE68A"/>${[[0, 70, 54, '#FCA5A5'], [60, 54, 70, '#A5B4FC'], [214, 66, 58, '#86EFAC'], [276, 50, 74, '#FDBA74']].map(([bx, bw, bh, bc]) => `<rect x="${bx}" y="${126 - bh}" width="${bw}" height="${bh}" fill="${bc}" stroke="${LINE}" stroke-width="1"/>${[0, 1].map(r => [0, 1].map(k => `<rect x="${bx + 10 + k * (bw / 2)}" y="${126 - bh + 10 + r * 20}" width="${bw / 2 - 18}" height="12" rx="2" fill="#E0F2FE" stroke="${LINE}" stroke-width="0.6"/>`).join('')).join('')}`).join('')}
    <rect y="126" width="320" height="8" fill="#D6D3D1"/><rect y="134" width="320" height="46" fill="#57534E"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${108 + i * 18}" y="138" width="11" height="40" fill="#F8FAFC"/>`).join('')}
    <g transform="translate(46 136)"><rect x="-2" y="-78" width="4" height="78" fill="#475569"/><rect x="-10" y="-112" width="20" height="40" rx="4" fill="#1F2937" stroke="${LINE}" stroke-width="0.8"/>
      <circle cx="0" cy="-101" r="6" fill="#7F1D1D"/><circle class="hh-blink" cx="0" cy="-84" r="6" fill="#4ADE80"/></g>`
    + person(196, 176, 'me', 'walk', { s: 0.64 }) + person(170, 178, 'linh', 'walk', { s: 0.6 }),
  // Săn cá mập
  shark: () => skyBg('#38BDF8', '#0C4A6E') + `<path d="M0 22 Q40 14 80 22 T160 22 T240 22 T320 22" stroke="#E0F2FE" stroke-width="2" fill="none" opacity="0.6"/>`
    + `<path d="M0 166 Q60 150 120 162 T240 158 T320 164 V180 H0Z" fill="#FCD34D"/>` + `<g class="hh-bob">${shark(176, 92, 0.95)}</g>`
    + bubble(82, 60, 5) + bubble(92, 44, 3) + bubble(258, 52, 4)
    + `<g transform="translate(70 104)"><rect x="-34" y="-17" width="68" height="34" rx="17" fill="#fff" stroke="${LINE}" stroke-width="1"/>${txt(0, 6, '8 + 7', { s: 16 })}</g>`
    + `<path d="M24 170 q-6 -24 4 -40 q-10 18 2 40 M290 170 q8 -22 -2 -42 q12 18 4 42" stroke="#16A34A" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  // Bảo vệ Trái Đất: đĩa bay trên bầu trời đêm, Trái Đất bên dưới
  ufo: () => skyBg('#1E1B4B', '#4C1D95') + [[30, 30], [80, 70], [120, 20], [210, 40], [270, 20], [300, 80], [180, 16], [56, 120]].map(([sx, sy], i) => `<circle class="hh-twinkle" style="--d:${i * 0.3}s" cx="${sx}" cy="${sy}" r="${1.2 + (i % 3) * 0.6}" fill="#FEF3C7"/>`).join('')
    + `<g transform="translate(160 250)"><circle r="110" fill="#3B82F6" stroke="${LINE}" stroke-width="1"/><path d="M-80 -60 q30 -20 50 0 q10 20 -20 26 q-30 0 -30 -26z M20 -90 q40 -6 60 20 q-20 16 -50 4z" fill="#4ADE80"/><circle r="110" fill="none" stroke="#BAE6FD" stroke-width="5" opacity="0.5"/></g>`
    + `<g class="hh-bob">${ufo(160, 62, 1)}</g>` + `<g transform="translate(260 74)"><rect x="-26" y="-14" width="52" height="28" rx="8" fill="#fff" stroke="${LINE}" stroke-width="1"/>${txt(0, 6, 'x = ?', { s: 13 })}</g>`,
  // Chụp ảnh chim
  photo: () => skyBg('#7DD3FC', '#F0F9FF') + meadow(150) + tree(46, 170, 1.1)
    + `<path d="M120 70 Q200 60 300 74" stroke="#8B5A2B" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M120 70 Q200 60 300 74" stroke="${LINE}" stroke-width="0.8" fill="none" transform="translate(0 2.5)"/>`
    + bird(150, 58, 1, '#F59E0B') + bird(196, 54, 0.9, '#60A5FA') + bird(240, 58, 1, '#F472B6', true) + bird(276, 64, 0.85, '#A3E635')
    + `<g stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round">${[[124, 30, 1, 1], [296, 30, -1, 1], [124, 104, 1, -1], [296, 104, -1, -1]].map(([vx, vy, kx, ky]) => `<path d="M${vx} ${vy + ky * 14} V${vy} H${vx + kx * 14}"/>`).join('')}</g>`
    + `<circle class="hh-blink" cx="284" cy="20" r="4" fill="#EF4444"/>`,
  // Ai tài năng nhất: sân khấu, đèn chiếu, bục có micro
  thandong: () => skyBg('#0F172A', '#1E3A8A') + `<path d="M60 0 L20 180 H120Z M260 0 L200 180 H300Z" fill="#FEF08A" opacity="0.12"/>`
    + `<g transform="translate(160 64)"><rect x="-74" y="-46" width="148" height="70" rx="8" fill="#1D4ED8" stroke="#93C5FD" stroke-width="2"/>${txt(0, -12, '25 × 4 = ?', { s: 18, c: '#fff' })}
      ${[[-60, 4, 'A. 100', '#F59E0B'], [4, 4, 'B. 90', '#2563EB']].map(([ax, ay, at, ac]) => `<rect x="${ax}" y="${ay}" width="56" height="14" rx="7" fill="${ac}"/>${txt(ax + 28, ay + 11, at, { s: 10, c: '#fff' })}`).join('')}</g>`
    + `<ellipse cx="160" cy="176" rx="150" ry="22" fill="#312E81"/><ellipse cx="160" cy="170" rx="110" ry="12" fill="#4338CA" stroke="#A5B4FC" stroke-width="1.2"/>`
    + person(160, 172, 'nam', 'cheer', { s: 0.52, mood: 'joy' }) + `<g transform="translate(184 170)"><rect x="-11" y="-30" width="22" height="30" rx="3" fill="#F59E0B" stroke="${LINE}" stroke-width="0.8"/><path d="M0 -30 V-42" stroke="#334155" stroke-width="1.6"/><circle cx="0" cy="-44" r="3" fill="#334155"/></g>`,
  // Đấu Trường Nhí: bốn bục thí sinh
  'dautruong-preview': () => skyBg('#1E293B', '#1D4ED8') + `<path d="M40 0 L0 180 H90Z M280 0 L230 180 H320Z" fill="#BAE6FD" opacity="0.1"/>`
    + `<ellipse cx="160" cy="176" rx="170" ry="30" fill="#1E3A8A"/>`
    + ['nam', 'linh', 'minh', 'mai'].map((who, i) => `${person(58 + i * 68, 148, who, i === 1 ? 'cheer' : 'stand', { s: 0.5, mood: 'joy' })}<g transform="translate(${58 + i * 68} 168)"><rect x="-22" y="-26" width="44" height="30" rx="4" fill="${['#F59E0B', '#EC4899', '#10B981', '#8B5CF6'][i]}" stroke="${LINE}" stroke-width="0.8"/>${txt(0, -6, i * 10 + 30, { s: 12, c: '#fff' })}</g>`).join(''),
  // Đảo Trí Nhớ: đảo cát có thẻ úp
  'memory-island': () => skyBg('#7DD3FC', '#E0F2FE') + sun(276, 30, 14, false) + `<rect y="104" width="320" height="76" fill="#38BDF8"/><path d="M0 110 Q40 104 80 110 T160 110 T240 110 T320 110" stroke="#E0F2FE" stroke-width="2" fill="none"/>`
    + `<ellipse cx="160" cy="132" rx="130" ry="30" fill="#FDE68A" stroke="${LINE}" stroke-width="1"/>` + tree(56, 132, 0.6)
    + [[110, 0, ''], [148, 0, '3 × 4'], [186, 0, ''], [224, 0, '']].map(([cx, , t], i) => `<g transform="translate(${cx} 126) rotate(${(i - 1.5) * 4})"><rect x="-16" y="-22" width="32" height="40" rx="4" fill="${t ? '#fff' : '#8B5CF6'}" stroke="${LINE}" stroke-width="1"/>${t ? txt(0, 3, t, { s: 9 }) : `<circle r="7" fill="none" stroke="#C4B5FD" stroke-width="2"/>`}</g>`).join(''),
  // Tiền tiểu học: thỏ đếm cà rốt
  'pre1-math': () => skyBg('#BAE6FD', '#F0F9FF') + cloud(60, 34, 0.6) + meadow(128, '#A3E06A') + bunny(76, 160, 1)
    + [0, 1, 2].map(i => `${carrot(150 + i * 46, 118, -8 + i * 6)}${txt(150 + i * 46, 168, i + 1, { s: 18, c: '#F97316' })}`).join(''),
  // Cá sấu so sánh: miệng há về phía nhóm nhiều hơn (5 > 2: há sang trái)
  'pre2-math': () => skyBg('#C7F0FF', '#F0FDFA') + meadow(132, '#A7F3D0')
    + `<g transform="translate(60 120)">${apple(-10, 0)}${apple(10, 0)}${apple(0, -16)}${apple(-20, -16)}${apple(20, -16)}</g>${txt(60, 160, '5', { s: 20, c: '#16A34A' })}`
    + croc(160, 126, 0.95, true) + `<g transform="translate(258 120)">${apple(-10, 0)}${apple(10, 0)}</g>${txt(258, 160, '2', { s: 20, c: '#16A34A' })}`,
  // Làm quen chữ cái: khối gỗ A B C
  'pre3-abc': () => room('#FDF2F8', { win: 250 }) + `<ellipse cx="150" cy="160" rx="140" ry="18" fill="#FBCFE8"/>`
    + [['A', '#EF4444', 82, 0], ['B', '#3B82F6', 132, 0], ['C', '#22C55E', 182, 0], ['Ă', '#F59E0B', 132, -44]].map(([l, bc, bx, dy]) => `<g transform="translate(${bx} ${152 + dy})"><path d="M-22 0 V-42 L-14 -50 H30 V-8 L22 0Z" fill="${mix(bc, '#000000', 0.18)}" stroke="${LINE}" stroke-width="0.9"/><rect x="-22" y="-42" width="44" height="42" rx="3" fill="${bc}" stroke="${LINE}" stroke-width="0.9"/><rect x="-16" y="-36" width="32" height="30" rx="4" fill="#fff" opacity="0.92"/>${txt(0, -12, l, { s: 22, c: bc, w: 900 })}</g>`).join('')
    + person(262, 196, 'lan', 'wave', { s: 0.82, flip: true, mood: 'joy' }),
  // Bé tập làm toán: bàn tính
  'pre4-math': () => room('#FFF7ED', { win: 24 }) + desk(150) + `<g transform="translate(176 146)">${shadow(0, 4, 84, 4)}
      <rect x="-82" y="-104" width="164" height="104" rx="6" fill="#B45309" stroke="${LINE}" stroke-width="1"/><rect x="-72" y="-94" width="144" height="84" rx="3" fill="#FEF3C7"/>
      ${[0, 1, 2, 3].map(r => `<path d="M-72 ${-82 + r * 22} H72" stroke="#92400E" stroke-width="1.6"/>${Array.from({ length: 10 }, (_, k) => `<circle cx="${k < 3 + r ? -62 + k * 12 : -20 + k * 9}" cy="${-82 + r * 22}" r="5.5" fill="${['#EF4444', '#3B82F6', '#22C55E', '#F59E0B'][r]}" stroke="${LINE}" stroke-width="0.6"/>`).join('')}`).join('')}</g>`
    + person(52, 196, 'cun', 'point', { s: 0.82, mood: 'joy' }),
  // Thẻ chữ cái: ba thẻ xoè quạt
  'pre6-flash': () => room('#FFF1F2', { win: null }) + [[-14, 'A', apple(0, 18, 12)], [0, 'B', `<circle cx="0" cy="18" r="12" fill="#3B82F6" stroke="${LINE}" stroke-width="0.8"/><path d="M-12 18 H12 M0 6 V30" stroke="#fff" stroke-width="2"/>`], [14, 'C', `<g transform="translate(0 30)">${bird(0, -8, 0.9, '#F59E0B')}</g>`]].map(([r, l, pic]) => `<g transform="translate(${160 + r * 4.6} ${100 + Math.abs(r) * 0.6}) rotate(${r})">${shadow(2, 52, 34, 3)}<rect x="-36" y="-48" width="72" height="98" rx="8" fill="#fff" stroke="${LINE}" stroke-width="1"/>${txt(0, -14, l, { s: 30, c: '#E11D48', w: 900 })}${pic}</g>`).join('')
    + star(46, 50, 10) + star(276, 42, 8, '#F472B6'),
  // Bài tập cuối tuần Tiếng Việt: sách mở, chữ Aa
  'tv3-weekly': (c) => room('#F0FDF4') + person(258, 196, 'na', 'hold', { s: 0.92, prop: 'book', mood: 'joy' }) + desk(146)
    + notebook(132, 170, c, { left: [['Ông em'], ['trồng cây']], right: [['Aa Bb'], ['học, đọc']], w: 168, h: 96 }),
  // Công cụ Tiếng Việt: thẻ từ xếp vào hai giỏ
  'tv-tools': (c) => room('#ECFEFF', { win: null }) + [['mèo', 70, 40, -6], ['sách', 160, 30, 4], ['chạy', 246, 44, -3], ['đẹp', 118, 72, 5], ['bút', 204, 76, -5]].map(([w, x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})">${shadow(2, 16, 26, 2)}<rect x="-28" y="-14" width="56" height="28" rx="8" fill="#fff" stroke="${LINE}" stroke-width="1"/>${txt(0, 5, w, { s: 14, c: mix(c, '#000000', 0.25) })}</g>`).join('')
    + [[90, '#F59E0B'], [230, '#3B82F6']].map(([bx, bc]) => `<g transform="translate(${bx} 172)">${shadow(0, 2, 50, 3)}<path d="M-46 -46 H46 L38 0 H-38Z" fill="${bc}" stroke="${LINE}" stroke-width="1"/><path d="M-42 -32 H42 M-40 -18 H40" stroke="${mix(bc, '#000000', 0.2)}" stroke-width="1.4"/><rect x="-48" y="-50" width="96" height="8" rx="3" fill="${mix(bc, '#FFFFFF', 0.3)}" stroke="${LINE}" stroke-width="1"/></g>`).join(''),
  // Luật chính tả: khối chữ c / k / g / gh
  'tv3-spell': () => skyBg('#FFEDD5', '#FFF7ED') + meadow(150, '#BEF264')
    + [['c', '#F97316', 60, 132], ['k', '#8B5CF6', 112, 132], ['g', '#06B6D4', 210, 132], ['gh', '#EC4899', 262, 132]].map(([l, bc, bx, by]) => `<g transform="translate(${bx} ${by})"><rect x="-22" y="-44" width="44" height="44" rx="8" fill="${bc}" stroke="${LINE}" stroke-width="1"/><rect x="-22" y="-44" width="44" height="12" rx="8" fill="#fff" opacity="0.25"/>${txt(0, -12, l, { s: 24, c: '#fff', w: 900 })}</g>`).join('')
    + `<path d="M84 82 Q86 60 112 56 M236 82 Q236 60 210 56" stroke="${LINE}" stroke-width="1.2" fill="none" stroke-dasharray="3 3"/>`
    + person(160, 190, 'bon', 'lookUp', { s: 0.82, mood: 'wow' }),
  // Luyện viết văn: vở có dòng chữ viết tay, bút mực
  writing: () => room('#FDF4FF', { win: 250 }) + person(66, 196, 'thao', 'raise', { s: 0.92, prop: 'pencil', mood: 'joy' }) + desk(142)
    + `<g transform="translate(118 46) rotate(-3)">${shadow(84, 106, 84, 4)}<rect width="168" height="104" rx="4" fill="#FFFDF7" stroke="${LINE}" stroke-width="1"/>
      ${Array.from({ length: 6 }, (_, i) => `<path d="M10 ${18 + i * 15} H158" stroke="#BFDBFE" stroke-width="1"/>`).join('')}<path d="M24 6 V98" stroke="#FCA5A5" stroke-width="1"/>
      ${[[30, 'Mùa thu quê em'], [30, 'trời trong xanh,'], [30, 'lá vàng rơi…']].map(([lx, t], i) => txt(lx, 30 + i * 15, t, { s: 12, c: HAND, w: 700, a: 'start' })).join('')}
      <path d="M30 76 q10 -6 20 0 t20 0 t20 0" stroke="${HAND}" stroke-width="1.4" fill="none"/></g>`
    + pencil(296, 148, -140, 60, '#1E3A8A'),
};
// cùng cảnh cho các thẻ cùng loại
SCENES.worksheet = SCENES.tests;
SCENES['tv2-tools'] = SCENES['tv-tools'];
SCENES['tv3-tools'] = SCENES['tv-tools'];
SCENES['pre5-photo'] = SCENES.photo;

/** Loại cảnh của thẻ: bỏ tiền tố lớp ("grade3-workbook-2" → "workbook-2"). */
export const thumbKind = (id) => id.replace(/^grade\d-/, '');
export const THUMB_KINDS = Object.keys(SCENES);

/** Tranh bìa của thẻ (chuỗi <svg>), hoặc '' nếu chưa có cảnh cho loại thẻ này (thẻ giữ biểu tượng). */
export function thumbArt(card) {
  const draw = SCENES[thumbKind(card.id)];
  return draw ? frame(draw(card.color || '#3B82F6', Number(card.id.match(/^grade(\d)-/)?.[1]) || 0)) : '';
}
