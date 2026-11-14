/**
 * Bài 93 "Could You Tell Me Where ...?" (câu hỏi gián tiếp): Sydney, đi từ trái sang phải: nhà Tom ở ngoại ô (mẹ Tom vẫy
 * tay ở cổng, trạm xe buýt) → xe buýt chở hai bạn vào thành phố (cầu cảng Sydney, Nhà hát Con Sò phía xa) → ngã tư có cột
 * biển tên đường (bị lạc) → cô dắt chó chỉ đường (bản đồ nhỏ: đi thẳng, bảo tàng ở bên trái) → quán cà phê (chú ngồi uống
 * cà phê, đồng hồ trên tường) → Bảo tàng Úc (băng rôn khủng long, cửa lớn).
 * Câu hỏi gián tiếp hiện trong bong bóng lời nói (chữ nằm trong cảnh SVG nên không tràn khung) kèm nhãn tên người nói.
 * Toạ độ cảnh: rộng 2700, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, thought, speaker, road } from '../kit.js';

const FLOOR = 282;
const W = 2700;
const X = { house: 140, stop: 470, bus0: 380, cityStop: 1080, bus1: 1000, sign: 1140, cafe: 1880, man: 1968, museum: 2440, door: 2440 };
const SPEED = 125;

Object.assign(CAST, {
  e093_tmum: { adult: true, hair: 'curly', hairC: '#E0A33A', top: 'blouse', shirt: '#FDBA74', bottom: 'pants', bottomC: '#1E3A8A', shoe: '#F5F5F4', eyeC: '#2563EB' },
  e093_woman: { adult: true, hair: 'ponytail', hairC: '#7C2D12', top: 'shirt', shirt: '#2DD4BF', bottom: 'pants', bottomC: '#334155', shoe: '#F5F5F4' },
  e093_man: { adult: true, hair: 'short', hairC: '#78350F', top: 'shirt', shirt: '#A78BFA', bottom: 'pants', bottomC: '#44403C', shoe: '#1C1917', moustache: true },
});

const T = (x, y, s, size = 13, c = '#1E3A8A', w = 900) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="${w}" font-size="${size}" fill="${c}">${s}</text>`;

// ── Đồ vật ────────────────────────────────────────────────────────────────
/** Xe buýt Sydney (gốc = giữa đáy, nhìn sang phải): hai bạn ngồi sau cửa kính khi lên xe (.e093-full). */
const BUS = `<defs><clipPath id="e093busw"><rect x="-108" y="-100" width="156" height="36" rx="4"/></clipPath></defs>
  <path d="M-120 -24 V-100 Q-120 -112 -108 -112 H104 Q118 -112 120 -96 V-24Z" fill="#F8FAFC" stroke="${L}" stroke-width="1.4"/>
  <path d="M-120 -56 H120 V-24 H-120Z" fill="#1D4ED8" stroke="${L}" stroke-width="1"/>
  <path d="M-120 -60 H120" stroke="#FACC15" stroke-width="4"/>
  <rect x="-108" y="-100" width="156" height="36" rx="4" fill="#BAE6FD" stroke="${L}"/>
  <g clip-path="url(#e093busw)"><g class="e093-pax"><g transform="translate(-60 -80)">${headOnly('en_tom_home', { s: 0.62, mood: 'joy' })}</g>
    <g transform="translate(-20 -80)">${headOnly('en_minh_home', { s: 0.62, mood: 'joy' })}</g></g></g>
  ${[-69, -30, 9].map((x) => `<path d="M${x} -100 V-64" stroke="${L}" stroke-width="2.2"/>`).join('')}
  <rect x="62" y="-100" width="30" height="76" rx="2" fill="#BAE6FD" stroke="${L}"/><path d="M77 -100 V-24" stroke="${L}" stroke-width="1.2"/>
  <path d="M100 -100 H112 Q118 -98 118 -88 V-64 H100Z" fill="#BAE6FD" stroke="${L}"/>
  <rect x="-40" y="-110" width="80" height="10" rx="2" fill="#1F2937"/>${T(0, -102, 'CITY', 9, '#FDE047')}
  <rect x="112" y="-44" width="8" height="8" rx="2" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/>
  ${[-72, 78].map((x) => `<g transform="translate(${x} -16)"><g class="e093-wh"><circle r="16" fill="#1F2937" stroke="${L}"/><circle r="7" fill="#CBD5E1"/><path d="M-7 0 H7 M0 -7 V7" stroke="#64748B" stroke-width="1.6"/></g></g>`).join('')}`;
/** Cốc cà phê nhỏ (đồ cầm). */
const PROPS = {
  e093_cup: `<g transform="translate(0 -4)"><path d="M-6 -8 H6 L5 6 H-5Z" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M-6 -4 H6" stroke="#A16207" stroke-width="2"/><path d="M6 -4 q5 0 4 5 q-1 3 -5 3" stroke="${L}" stroke-width="1" fill="none"/></g>`,
};
const POSES = {
  e093_bow: { R: [14, 6], L: [14, 6], head: 22, dy: 4 },
  e093_tell: { R: [60, 120], L: [10, 4], head: -4 },
  e093_talk: { R: [70, 150], L: [40, 110] },
  e093_cupHold: { R: [40, 110], L: [10, 4] },
};

/** Đồng hồ treo tường (tâm x, y): kim giờ / kim phút xoay bằng CSS. */
const clock = (x, y, r = 16) => `<g transform="translate(${x} ${y})"><circle r="${r + 3}" fill="#B45309" stroke="${L}"/><circle r="${r}" fill="#fff" stroke="${L}" stroke-width="0.8"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M0 ${-r + 2} V${-r + (i % 3 ? 4 : 6)}" stroke="${L}" stroke-width="${i % 3 ? 0.8 : 1.6}" transform="rotate(${i * 30})"/>`).join('')}
  <g class="e093-hh"><path d="M0 2 V${-r * 0.5}" stroke="#1F2937" stroke-width="2.6" stroke-linecap="round"/></g>
  <g class="e093-mh"><path d="M0 2 V${-r * 0.8}" stroke="#DC2626" stroke-width="1.6" stroke-linecap="round"/></g><circle r="1.8" fill="#1F2937"/></g>`;
/** Toà nhà (gốc trái, đáy y), lưới cửa sổ. */
const building = (x, w, h, c, y = 262) => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${c}" stroke="${L}"/>
  ${Array.from({ length: Math.floor((h - 20) / 26) }, (_, r) => Array.from({ length: Math.floor((w - 10) / 22) }, (_, c2) => `<rect x="${x + 10 + c2 * 22}" y="${y - h + 12 + r * 26}" width="12" height="15" fill="#E0F2FE" stroke="${L}" stroke-width="0.5"/>`).join('')).join('')}`;
/** Bảo tàng (sa thạch, cột, băng rôn khủng long, cửa lớn mở được). */
const MUSEUM = (x) => `<g transform="translate(${x} ${FLOOR - 8})">
  <rect x="-210" y="-196" width="420" height="196" fill="#F5D7A1" stroke="${L}" stroke-width="1.4"/>
  <path d="M-224 -196 L0 -236 L224 -196Z" fill="#E7C383" stroke="${L}" stroke-width="1.4"/>
  <rect x="-224" y="-200" width="448" height="10" fill="#D6B26A" stroke="${L}"/>
  ${[-180, -130, 130, 180].map((dx) => `<rect x="${dx - 9}" y="-186" width="18" height="178" fill="#FEF3C7" stroke="${L}"/><rect x="${dx - 13}" y="-190" width="26" height="6" fill="#E7C383" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="-120" y="-178" width="240" height="22" rx="3" fill="#7C2D12" stroke="${L}"/>${T(0, -162, 'AUSTRALIAN MUSEUM', 15, '#FDE68A')}
  <rect x="-48" y="-112" width="96" height="112" fill="#451A03" stroke="${L}"/>
  <g class="e093-inside">${[-30, 0, 30].map((dx, i) => `<path d="M${dx - 10} -20 q4 -${20 + i * 6} 14 -${30 + i * 4} q8 -2 12 6" stroke="#FEF3C7" stroke-width="2" fill="none"/>`).join('')}</g>
  <g class="e093-doorL"><rect x="-46" y="-110" width="46" height="110" fill="#92400E" stroke="${L}"/><circle cx="-8" cy="-54" r="3" fill="#FACC15"/></g>
  <g class="e093-doorR"><rect x="0" y="-110" width="46" height="110" fill="#92400E" stroke="${L}"/><circle cx="8" cy="-54" r="3" fill="#FACC15"/></g>
  <!-- băng rôn khủng long -->
  <rect x="62" y="-150" width="56" height="110" fill="#16A34A" stroke="${L}"/>
  <g transform="translate(90 -100) scale(0.8)" stroke="#F8FAFC" stroke-width="2.6" fill="none" stroke-linecap="round">
    <path d="M-22 22 L-16 4 Q-4 -10 10 -8 Q22 -20 18 -34 M-16 4 L-26 12 M4 -2 L6 22 M-10 2 L-12 22"/><circle cx="20" cy="-36" r="5" fill="#F8FAFC"/>
    ${[-14, -8, -2, 4].map((dx) => `<path d="M${dx} ${-4 + dx * 0.2} v8"/>`).join('')}</g>
  ${T(90, -50, 'DINOSAURS', 8, '#FEF9C3')}
  <rect x="-170" y="-140" width="70" height="56" fill="#FEF3C7" stroke="${L}"/>${T(-135, -122, 'GIFT SHOP', 9, '#7C2D12')}
  <g transform="translate(-135 -98)"><path d="M-10 -8 H10 L8 10 H-8Z" fill="#F472B6" stroke="${L}" stroke-width="0.8"/><path d="M-5 -8 Q0 -16 5 -8" stroke="${L}" fill="none"/></g>
  <rect x="-230" y="-8" width="460" height="8" fill="#D6B26A" stroke="${L}"/></g>`;
/** Cột biển tên đường (tâm x): các tấm biển xoay vòng khi .st-spin. */
const SIGNPOST = (x) => `<g transform="translate(${x} ${FLOOR - 8})"><rect x="-3" y="-150" width="6" height="150" fill="#64748B" stroke="${L}" stroke-width="0.8"/>
  <g class="e093-arms" style="transform-origin:0px -120px">
  <g transform="translate(0 -138)"><path d="M2 -8 H54 L62 0 L54 8 H2Z" fill="#15803D" stroke="${L}"/>${T(30, 4, 'George St', 9, '#fff')}</g>
  <g transform="translate(0 -118)"><path d="M-2 -8 H-54 L-62 0 L-54 8 H-2Z" fill="#15803D" stroke="${L}"/>${T(-30, 4, 'Park St', 9, '#fff')}</g>
  <g transform="translate(0 -98)"><path d="M2 -8 H54 L62 0 L54 8 H2Z" fill="#15803D" stroke="${L}"/>${T(30, 4, 'Pitt St', 9, '#fff')}</g></g></g>`;

// ── Bong bóng lời nói (chữ trong cảnh) ─────────────────────────────────────
/** Bong bóng lời nói tâm (x, y), cỡ w × h, đuôi chỉ tới (tx, ty). Hiện bằng .st-b-k. */
const sb = (k, x, y, w, h, inner, [tx, ty]) => {
  const bx = Math.max(x - w / 2 + 18, Math.min(x + w / 2 - 18, tx)), by = y + h / 2;
  return `<g class="e093-b e093-b-${k}" style="transform-origin:${tx}px ${ty}px">
  <path d="M${bx - 9} ${by - 1} L${tx} ${ty} L${bx + 9} ${by - 1}Z" fill="#fff" stroke="${L}" stroke-width="1.4" stroke-linejoin="round"/>
  <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="14" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <path d="M${bx - 7.6} ${by - 1.2} L${tx} ${ty - 2} L${bx + 7.6} ${by - 1.2}Z" fill="#fff"/>
  <g transform="translate(${x} ${y})">${inner}</g></g>`;
};
const MUS_ICON = `<path d="M-14 -4 L0 -12 L14 -4Z" fill="#E7C383" stroke="${L}" stroke-width="0.8"/><rect x="-12" y="-4" width="24" height="16" fill="#F5D7A1" stroke="${L}" stroke-width="0.8"/>
  ${[-8, -2, 4, 10].map((dx) => `<path d="M${dx - 1} -2 V11" stroke="${L}" stroke-width="1.2"/>`).join('')}`;
const QMARK = (x, y, s = 1) => `<g><g transform="translate(${x} ${y}) scale(${s})"><circle r="11" fill="#F97316" stroke="${L}"/>${T(0, 6, '?', 17, '#fff')}</g></g>`;
const GIFT = `<path d="M-11 -8 H11 L9 12 H-9Z" fill="#F472B6" stroke="${L}" stroke-width="0.9"/><path d="M-5 -8 Q0 -18 5 -8" stroke="${L}" stroke-width="1.2" fill="none"/><path d="M-9 0 H9" stroke="#FDE047" stroke-width="2"/>`;
const CLOCK_ICON = `<circle r="11" fill="#fff" stroke="${L}" stroke-width="1.2"/><path d="M0 0 V-7 M0 0 L5 3" stroke="#1F2937" stroke-width="1.8" stroke-linecap="round"/>`;
const STAR = (x, y) => `<path transform="translate(${x} ${y}) scale(0.7)" d="M0 -10 L2.9 -3.1 L10 -3.1 L4.4 1.4 L6.4 8.6 L0 4.4 L-6.4 8.6 L-4.4 1.4 L-10 -3.1 L-2.9 -3.1Z" fill="#FACC15" stroke="${L}" stroke-width="0.8"/>`;

// ── Cảnh ──────────────────────────────────────────────────────────────────
function bg() {
  const gum = (x, s) => `<g transform="translate(${x} 262) scale(${s})"><path d="M-6 0 Q-4 -50 -10 -90 L-2 -90 Q4 -50 6 0Z" fill="#E7E5E4" stroke="${L}"/>
    <g class="ek-sway" style="transform-origin:0px -90px"><ellipse cx="-16" cy="-104" rx="30" ry="18" fill="#65A30D" stroke="${L}"/><ellipse cx="14" cy="-116" rx="30" ry="20" fill="#84CC16" stroke="${L}"/><ellipse cx="-4" cy="-132" rx="22" ry="14" fill="#4D7C0F" stroke="${L}"/></g></g>`;
  return `
  ${sky(0, W, 315, 'e093sky')}
  ${cloud(160, 56, 0.8, 0)}${cloud(620, 46, 0.9, 2)}${cloud(1240, 52, 0.7, 4)}${cloud(1980, 44, 0.9, 1)}${cloud(2500, 60, 0.7, 3)}
  <!-- ngoại ô: nhà Tom -->
  <path d="M0 200 Q200 170 420 196 T760 190 V262 H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${gum(330, 0.9)}${gum(620, 0.8)}
  <g transform="translate(${X.house} 262)"><rect x="-100" y="-120" width="200" height="120" fill="#FEF3C7" stroke="${L}" stroke-width="1.3"/>
    <path d="M-116 -118 L0 -176 L116 -118Z" fill="#DC2626" stroke="${L}" stroke-width="1.3"/><path d="M-90 -124 H90 M-60 -140 H60 M-30 -156 H30" stroke="#B91C1C" stroke-width="1.4"/>
    <rect x="-80" y="-96" width="50" height="44" fill="#BAE6FD" stroke="${L}"/><path d="M-55 -96 V-52 M-80 -74 H-30" stroke="#fff" stroke-width="2.4"/>
    <rect x="30" y="-90" width="40" height="90" rx="3" fill="#2563EB" stroke="${L}"/><circle cx="62" cy="-44" r="2.6" fill="#FACC15"/>
    <rect x="-100" y="-26" width="200" height="26" fill="#FDE68A" opacity="0.4"/></g>
  ${bush(30, 262, 0.8)}${bush(256, 264, 0.6, '#4ADE80')}
  <!-- trạm xe buýt -->
  <g transform="translate(${X.stop + 40} ${FLOOR - 8})"><rect x="-2" y="-110" width="4" height="110" fill="#64748B"/><rect x="-18" y="-128" width="36" height="22" rx="4" fill="#FACC15" stroke="${L}"/>${T(0, -112, 'BUS', 11, '#1F2937')}</g>
  <!-- thành phố: cầu cảng và nhà hát phía xa -->
  <rect x="760" y="198" width="${W - 760}" height="64" fill="#38BDF8" stroke="${L}" stroke-width="0.8"/>
  <g class="ek-wave">${Array.from({ length: 30 }, (_, i) => `<path d="M${780 + i * 64} ${212 + (i % 3) * 12} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <g transform="translate(1060 198)"><path d="M-170 0 Q0 -150 170 0" stroke="#64748B" stroke-width="10" fill="none"/><path d="M-170 0 Q0 -120 170 0" stroke="#94A3B8" stroke-width="4" fill="none"/>
    ${Array.from({ length: 13 }, (_, i) => { const t = (i + 1) / 14, x = -170 + 340 * t, y = -150 * 2 * t * (1 - t) * 1.0; return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} V-36" stroke="#94A3B8" stroke-width="1.4"/>`; }).join('')}
    <rect x="-180" y="-40" width="360" height="6" fill="#475569" stroke="${L}" stroke-width="0.7"/><rect x="-196" y="-56" width="18" height="56" fill="#A8A29E" stroke="${L}"/><rect x="178" y="-56" width="18" height="56" fill="#A8A29E" stroke="${L}"/></g>
  <g transform="translate(1520 200)">${[[-50, 34, 0.9], [-20, 50, 1], [14, 44, 0.95], [44, 30, 0.8]].map(([dx, h, s]) => `<path d="M${dx - 22 * s} 0 Q${dx - 14 * s} ${-h} ${dx + 16 * s} ${-h - 4} Q${dx + 4 * s} ${-h * 0.4} ${dx + 18 * s} 0Z" fill="#F8FAFC" stroke="${L}" stroke-width="1"/>`).join('')}
    <rect x="-80" y="-2" width="150" height="6" fill="#E7C383" stroke="${L}" stroke-width="0.8"/></g>
  <!-- bờ bên kia: phố xá xa -->
  ${[[700, 40, 50], [744, 30, 74], [1240, 34, 60], [1280, 26, 86], [1310, 40, 54], [1600, 30, 70], [1634, 24, 46]].map(([x, w, h], i) => `<rect x="${x}" y="${198 - h}" width="${w}" height="${h}" fill="${['#CBD5E1', '#A5B4FC', '#BAE6FD', '#94A3B8'][i % 4]}" stroke="${L}" stroke-width="0.7"/>${Array.from({ length: Math.floor(h / 14) }, (_, r) => `<path d="M${x + 6} ${198 - h + 8 + r * 14} H${x + w - 6}" stroke="#F8FAFC" stroke-width="2.4" stroke-dasharray="4 4"/>`).join('')}`).join('')}
  ${building(780, 70, 150, '#FCA5A5')}${building(860, 56, 118, '#FDE68A')}${building(1236, 80, 214, '#FDBA74')}${building(1320, 56, 150, '#A5B4FC')}${building(1660, 90, 190, '#93C5FD')}${building(1756, 70, 150, '#FDE68A')}
  ${building(2060, 80, 200, '#C4B5FD')}${building(2150, 60, 140, '#86EFAC')}${building(2640, 60, 170, '#FDBA74')}
  <!-- trạm xe buýt trong phố -->
  <g transform="translate(${X.cityStop - 50} ${FLOOR - 8})"><rect x="-2" y="-110" width="4" height="110" fill="#64748B"/><rect x="-18" y="-128" width="36" height="22" rx="4" fill="#FACC15" stroke="${L}"/>${T(0, -112, 'BUS', 11, '#1F2937')}</g>
  ${SIGNPOST(X.sign)}
  <!-- quán cà phê -->
  <g transform="translate(${X.cafe} ${FLOOR - 8})"><rect x="-120" y="-180" width="240" height="180" fill="#FFF7ED" stroke="${L}" stroke-width="1.3"/>
    <rect x="-90" y="-176" width="180" height="26" rx="4" fill="#7C2D12" stroke="${L}"/>${T(0, -157, 'CAFE', 17, '#FDE68A')}
    <path d="M-124 -146 H124 L114 -122 H-114Z" fill="#fff" stroke="${L}"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${-114 + i * 30} -146 h15 l-2 24 h-15Z" fill="#EF4444"/>`).join('')}
    <rect x="-104" y="-110" width="90" height="70" fill="#BAE6FD" stroke="${L}"/><path d="M-59 -110 V-40" stroke="#fff" stroke-width="2.4"/>
    <rect x="70" y="-112" width="40" height="112" rx="2" fill="#B45309" stroke="${L}"/>
    ${clock(16, -94, 15)}</g>
  ${MUSEUM(X.museum)}
  ${road(0, W, FLOOR)}
  <!-- nhãn -->
  <g class="e093-lb e093-lb-wed">${label(150, 72, 'Wednesday', '#7C3AED', 16)}</g>
  <g class="e093-lb e093-lb-self">${label(X.stop - 40, 150, 'by themselves', '#EA580C', 14)}</g>
  <g class="e093-lb e093-lb-lost">${label(X.sign + 70, 70, 'got lost', '#DC2626', 17)}</g>
  <g class="e093-lb e093-lb-nervous">${label(X.sign - 10, 72, 'nervous', '#7C3AED', 15)}</g>
  <g class="e093-lb e093-lb-dog">${label(1410, 80, 'a woman with a dog', '#0F766E', 14)}</g>
  <g class="e093-lb e093-lb-left">${label(1330, 307, 'down the street', '#0369A1', 13)}<path d="M1400 302 H1500" stroke="#0369A1" stroke-width="4" stroke-linecap="round"/><path d="M1490 294 L1500 302 L1490 310" stroke="#0369A1" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  <g class="e093-lb e093-lb-thanks">${label(1790, 70, 'politely', '#DB2777', 16)}</g>`;
}

function fg() {
  const lessons = `<g transform="translate(-38 6)">${headOnly('en_hoa', { s: 0.7, mood: 'joy' })}</g>
    <rect x="-8" y="-24" width="66" height="34" rx="3" fill="#166534" stroke="${L}"/>${T(25, -10, 'Could you', 10, '#F8FAFC', 800)}${T(25, 3, 'tell me…?', 10, '#F8FAFC', 800)}
    <g class="e093-bulb" transform="translate(56 -30)"><circle r="9" fill="#FDE047" stroke="${L}"/><rect x="-4" y="7" width="8" height="5" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/></g>`;
  const want = `<g transform="scale(1.1)">${MUS_ICON}</g><g transform="translate(36 2) scale(0.55)" stroke="${L}" stroke-width="3" fill="none" stroke-linecap="round">
    <path d="M-22 22 L-16 4 Q-4 -10 10 -8 Q22 -20 18 -34 M4 -2 L6 22 M-10 2 L-12 22 M-16 4 L-28 12"/><circle cx="20" cy="-36" r="5" fill="#A3E635"/></g>
    <g transform="translate(-34 2) scale(0.8)">${headOnly('en_tom_home', { s: 0.5, mood: 'joy' })}</g>`;
  const map = `<rect x="-52" y="-30" width="104" height="60" rx="6" fill="#DCFCE7" stroke="${L}"/>
    <rect x="-52" y="-6" width="104" height="14" fill="#CBD5E1"/><path d="M-50 1 H50" stroke="#fff" stroke-width="1.4" stroke-dasharray="5 4"/>
    <g transform="translate(26 -18) scale(0.75)">${MUS_ICON}</g>${T(26, 28, 'museum', 8, '#7C2D12', 800)}
    <path class="e093-route" d="M-44 2 H28 V-6" stroke="#DC2626" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M23 -2 L28 -9 L33 -2" stroke="#DC2626" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="-44" cy="2" r="4" fill="#2563EB" stroke="${L}" stroke-width="0.6"/>
    <g transform="translate(-8 -20)"><rect x="-17" y="-8" width="34" height="14" rx="7" fill="#fff" stroke="#0369A1"/>${T(0, 3, 'left', 10, '#0369A1')}</g>`;
  const dinos = `<g stroke="${L}" stroke-width="2.4" fill="none" stroke-linecap="round">${[-36, 0, 36].map((dx, i) => `<g transform="translate(${dx} ${4 - i * 2}) scale(${0.55 + i * 0.08})"><path d="M-22 22 L-16 4 Q-4 -10 10 -8 Q22 -20 18 -34 M4 -2 L6 22 M-10 2 L-12 22 M-16 4 L-28 12"/><circle cx="20" cy="-36" r="5" fill="#A3E635"/></g>`).join('')}</g>
    ${T(-36, 30, '1', 11, '#16A34A')}${T(0, 30, '2', 11, '#16A34A')}${T(36, 30, '3…', 11, '#16A34A')}<g transform="translate(64 -14)">${QMARK(0, 0, 0.8)}</g>`;
  return `
  <!-- bàn cà phê ngoài trời (che chân chú ngồi) -->
  <g transform="translate(${X.man - 30} ${FLOOR})"><rect x="-3" y="-52" width="6" height="52" fill="#57534E"/><ellipse cx="0" cy="-54" rx="30" ry="6" fill="#F5F5F4" stroke="${L}"/><ellipse cx="0" cy="0" rx="14" ry="3" fill="#57534E"/>
    <g transform="translate(10 -60)"><path d="M-5 -6 H5 L4 4 H-4Z" fill="#fff" stroke="${L}" stroke-width="0.8"/></g></g>
  <!-- bong bóng nghĩ / bản đồ -->
  ${'' /* nghĩ tới bảo tàng (câu 2) */}<g class="e093-th e093-th-want">${thought(X.cityStop + 60, 92, 160, 90, `<g transform="scale(1.4)">${want}</g>`, [X.cityStop + 50, 156])}</g>
  <g class="e093-th e093-th-lesson">${thought(X.sign + 4, 96, 170, 92, lessons, [X.sign + 48, 158])}</g>
  <g class="e093-th e093-th-dino">${thought(X.door - 150, 88, 170, 96, dinos, [X.door - 26, 150])}</g>
  <!-- dấu hỏi trên đầu hai bạn (bị lạc) -->
  <g class="e093-q">${QMARK(X.sign + 50, 140)}${QMARK(X.sign + 100, 140)}</g>
  <!-- giọt mồ hôi (lo lắng) -->
  <g class="e093-sweat"><path d="M${X.sign + 40} 168 q-5 8 0 11 q5 -3 0 -11Z" fill="#7DD3FC" stroke="${L}" stroke-width="0.7"/></g>
  <!-- người nói -->
  <g class="e093-lb e093-lb-sp-tom">${speaker(X.sign + 100, 150, 'Tom')}</g>
  <g class="e093-lb e093-lb-sp-minh">${speaker(1290, 150, 'Minh')}</g>
  <g class="e093-lb e093-lb-sp-tom2">${speaker(1820, 150, 'Tom')}</g>
  <g class="e093-lb e093-lb-sp-man">${speaker(X.man + 34, 108, 'the man', '#7C3AED')}</g>
  <g class="e093-lb e093-lb-sp-minh2">${speaker(1770, 150, 'Minh')}</g>
  <g class="e093-lb e093-lb-added">${label(1696, 186, 'added', '#16A34A', 13)}<g transform="translate(1696 160)"><circle r="11" fill="#22C55E" stroke="${L}"/>${T(0, 6, '+', 18, '#fff')}</g></g>
  <g class="e093-lb e093-lb-sp-tom3">${speaker(X.door - 20, 150, 'Tom')}</g>
  <!-- câu hỏi gián tiếp -->
  ${sb('where', 1256, 84, 262, 58, `<g transform="translate(-108 0)">${MUS_ICON}</g>${T(16, -4, 'Excuse me, could you tell me', 12)}${T(16, 13, 'where the museum is?', 12, '#EA580C')}`, [1288, 128])}
  ${sb('map', 1366, 84, 128, 76, map, [1404, 116])}
  ${sb('time', 1800, 80, 232, 54, `<g transform="translate(-92 0)">${CLOCK_ICON}</g>${T(14, -3, 'Do you know', 12)}${T(14, 13, 'what time it closes?', 12, '#EA580C')}`, [1828, 128])}
  ${sb('five', X.man - 66, 70, 100, 52, `${T(0, -4, 'At five.', 14)}${T(0, 15, '5:00', 15, '#DC2626')}`, [X.man - 12, 108])}
  ${sb('gift', 1758, 80, 256, 54, `<g transform="translate(-108 0)">${GIFT}</g>${T(12, -3, 'And do you know if', 12)}${T(12, 13, 'there is a gift shop?', 12, '#EA580C')}`, [1778, 128])}
  ${sb('yes', X.man - 72, 70, 124, 56, `${T(-12, -8, 'Yes, a really', 12)}${T(-12, 8, 'good one.', 12)}<g transform="translate(46 -2) scale(0.8)">${GIFT}</g>${STAR(-30, 20)}${STAR(-14, 21)}${STAR(2, 20)}`, [X.man - 12, 108])}`;
}

const CSS = `
.e093-lb { opacity: 0; transition: opacity .35s; }
${['wed', 'self', 'lost', 'nervous', 'dog', 'left', 'thanks', 'sp-tom', 'sp-minh', 'sp-tom2', 'sp-man', 'sp-minh2', 'added', 'sp-tom3'].map((k) => `.st-lb-${k} .e093-lb-${k}`).join(', ')} { opacity: 1; }
.e093-b, .e093-th { opacity: 0; transform: scale(.35); transition: opacity .25s, transform .4s cubic-bezier(.3,1.5,.6,1); }
${['where', 'map', 'time', 'five', 'gift', 'yes'].map((k) => `.st-b-${k} .e093-b-${k}`).join(', ')} { opacity: 1; transform: none; }
.e093-th-want { transform-origin: ${X.cityStop + 50}px 156px; } .e093-th-lesson { transform-origin: ${X.sign + 48}px 158px; } .e093-th-dino { transform-origin: ${X.door - 26}px 150px; }
.st-th-want .e093-th-want, .st-th-lesson .e093-th-lesson, .st-th-dino .e093-th-dino { opacity: 1; transform: none; }
.e093-bulb { opacity: 0; transition: opacity .3s; } .st-bulb .e093-bulb { opacity: 1; }
.e093-route { stroke-dasharray: 90; stroke-dashoffset: 90; } .st-b-map .e093-route { stroke-dashoffset: 0; transition: stroke-dashoffset 1.2s linear .35s; }
.e093-q { opacity: 0; transition: opacity .3s; } .st-lost .e093-q { opacity: 1; }
.st-lost .e093-q > g { animation: e093Bob .5s ease-in-out infinite alternate; }
@keyframes e093Bob { to { transform: translateY(-5px); } }
.e093-sweat { opacity: 0; } .st-sweat .e093-sweat { opacity: 1; animation: e093Drip 1s ease-in infinite; }
@keyframes e093Drip { from { transform: translateY(-4px); } to { transform: translateY(6px); } }
.st-spin .e093-arms { animation: e093Spin .7s ease-in-out 2; }
@keyframes e093Spin { 0% { transform: scaleX(1); } 50% { transform: scaleX(-1); } 100% { transform: scaleX(1); } }
.e093-hh { transform: rotate(75deg); transition: transform 1.2s ease-in-out; } .e093-mh { transform: rotate(180deg); transition: transform 1.2s ease-in-out; }
.st-five .e093-hh { transform: rotate(150deg); } .st-five .e093-mh { transform: rotate(360deg); }
.e093-doorL, .e093-doorR { transition: transform .6s ease-out; }
.e093-doorL { transform-origin: ${X.museum - 46}px 0px; } .e093-doorR { transform-origin: ${X.museum + 46}px 0px; }
.st-open .e093-doorL, .st-open .e093-doorR { transform: scaleX(.15); }
.es-ac[data-id="bus"] .e093-pax { opacity: 0; transition: opacity .2s; }
.es-ac[data-id="bus"].e093-full .e093-pax { opacity: 1; }
.es-ac[data-id="bus"] .e093-wh { transform-box: fill-box; transform-origin: center; }
.es-ac[data-id="bus"].is-walk .e093-wh { animation: e093Wheel .45s linear infinite; }
.es-ac[data-id="bus"].is-walk svg { animation: e093Rock .2s ease-in-out infinite alternate; }
@keyframes e093Wheel { to { transform: rotate(360deg); } }
@keyframes e093Rock { to { transform: translateY(-1.5px); } }
.es-ac[data-id="wdog"] .es-flip { filter: grayscale(.85) brightness(1.2) contrast(1.05); }
.es-ac.is-gone { transition: opacity .5s; }
@media (prefers-reduced-motion: reduce) { .st-lost .e093-q > g, .st-sweat .e093-sweat { animation-duration: 2s; } .st-spin .e093-arms { animation-duration: 1.4s; } }
`;

const on = (st, ...ks) => ks.forEach((k) => st.set(k, true));
const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const both = (st, xt, xm, o = {}) => Promise.all([st.walk('tom', xt, { speed: SPEED, follow: false, ...o }), st.walk('minh', xm, { speed: SPEED, follow: false, ...o })]);
const cls = (st, id, c, v = true) => st.a(id).el.classList.toggle(c, v);

const BEATS = [
  { key: ["Tom's mum let the boys take the bus", 'by themselves'], icon: '🚌', label: 'take the bus', async play(st) {
    st.look(300);
    on(st, 'st-lb-wed');
    st.pose('tmum', 'wave'); st.act('tmum', 'wave'); st.mood('tmum', 'joy');
    st.face('tom', 1); st.face('minh', 1);
    await st.loop('bus', () => st.walk('bus', X.bus0, { speed: 340, follow: false }), { vol: 0.8 });
    st.sfx('door-open', { vol: 0.5 });
    off(st, 'st-lb-wed'); on(st, 'st-lb-self');
    await both(st, X.bus0 + 82, X.bus0 + 82);
    st.show('tom', false); st.show('minh', false); cls(st, 'bus', 'e093-full'); st.sfx('bag-on', { vol: 0.5 });
    await st.wait(300);
    const go = st.loop('bus', () => st.walk('bus', X.bus1, { speed: 280, follow: false }), { vol: 0.8 });
    st.look(X.bus0 + 200, { dur: 1200 });
    await go;
    st.act('tmum', null); st.pose('tmum', 'stand');
  } },
  { key: ['visit the Australian Museum', 'soon got lost'], icon: '🗺️', label: 'got lost', async play(st) {
    off(st, 'st-lb-self');
    st.look(X.cityStop + 120, { instant: true });
    st.place('tom', X.cityStop + 10, FLOOR, 1); st.place('minh', X.cityStop - 40, FLOOR, 1);
    st.show('tom', true); st.show('minh', true); cls(st, 'bus', 'e093-full', false); st.sfx('door-open', { vol: 0.4 });
    st.mood('tom', 'joy'); st.mood('minh', 'joy');
    on(st, 'st-th-want'); st.sfx('pop', { vol: 0.6 });
    st.loop('bus', () => st.walk('bus', W + 300, { speed: 300, follow: false }), { vol: 0.5 });
    await st.wait(1300);
    off(st, 'st-th-want');
    st.look(X.sign + 70, { dur: 1400 });
    await both(st, X.sign + 100, X.sign + 50);
    st.face('tom', -1); st.face('minh', 1);
    await st.wait(250);
    st.face('tom', 1); st.face('minh', -1);
    on(st, 'st-lost', 'st-lb-lost'); st.sfx('pop', { vol: 0.6 });
    st.mood('tom', 'wow'); st.mood('minh', 'wow');
    await st.wait(700);
  } },
  { key: ["I don't know which street we are in"], icon: '❓', label: 'which street?', async play(st) {
    off(st, 'st-lb-lost');
    st.look(X.sign + 70);
    st.face('minh', 1); st.face('tom', -1);
    on(st, 'st-lb-sp-tom'); st.talk('tom', true);
    st.pose('tom', 'shrug'); st.act('tom', 'no'); st.mood('tom', 'sad');
    await st.wait(400);
    on(st, 'st-spin'); st.sfx('whoosh', { vol: 0.6 });
    await st.wait(1400);
    off(st, 'st-spin');
    st.act('tom', null); st.talk('tom', false);
    await st.wait(300);
  } },
  { key: ['Minh was nervous', 'remembered his English lessons'], icon: '💡', label: 'remembered', async play(st) {
    off(st, 'st-lb-sp-tom', 'st-lost'); st.pose('tom', 'stand');
    st.look(X.sign + 70);
    on(st, 'st-lb-nervous', 'st-sweat'); st.mood('minh', 'sad'); st.pose('minh', 'sad'); st.act('minh', 'shiver');
    await st.loop('tick', () => st.wait(1300), { vol: 0.6 });
    off(st, 'st-lb-nervous', 'st-sweat'); st.act('minh', null);
    st.pose('minh', 'think'); st.mood('minh', 'happy');
    on(st, 'st-th-lesson'); st.sfx('page-turn', { vol: 0.7 });
    await st.wait(1000);
    on(st, 'st-bulb'); st.sfx('ding', { vol: 0.6 }); st.mood('minh', 'joy'); st.pose('minh', 'pointUp');
    await st.wait(900);
  } },
  { key: ['He stopped a woman with a dog'], icon: '🐕', label: 'a woman with a dog', async play(st) {
    off(st, 'st-th-lesson', 'st-bulb'); st.pose('minh', 'stand'); st.mood('tom', 'happy');
    st.look(1300, { dur: 1000 });
    await Promise.all([
      st.walk('woman', 1410, { speed: 105, follow: false }),
      st.walk('wdog', 1356, { speed: 105, follow: false }),
      (async () => { await st.wait(900); await st.walk('minh', 1290, { speed: SPEED, follow: false }); st.pose('minh', 'raise'); })(),
    ]);
    on(st, 'st-lb-dog');
    st.dog('wdog', 'sit'); st.sfx('dog-bark', { vol: 0.5 });
    st.face('minh', 1); st.pose('minh', 'raise'); st.mood('woman', 'happy');
    await st.wait(900);
  } },
  { key: ['could you tell me where the museum is'], icon: '🏛️', label: 'where the museum is', async play(st) {
    off(st, 'st-lb-dog');
    st.look(1300);
    st.pose('minh', 'e093_tell'); st.mood('minh', 'joy');
    on(st, 'st-lb-sp-minh'); st.talk('minh', true);
    await st.wait(200);
    on(st, 'st-b-where'); st.sfx('pop', { vol: 0.7 });
    await st.wait(2600);
    st.talk('minh', false);
  } },
  { key: ['smiled and pointed', 'down the street on the left'], icon: '👉', label: 'on the left', async play(st) {
    off(st, 'st-b-where', 'st-lb-sp-minh'); st.pose('minh', 'stand');
    st.look(1310);
    st.mood('woman', 'joy');
    await st.wait(400);
    st.face('woman', 1); st.pose('woman', 'point'); st.act('woman', 'point');
    on(st, 'st-b-map', 'st-lb-left'); st.sfx('whoosh', { vol: 0.6 });
    st.act('wdog', 'wag');
    await st.wait(1700);
    st.mood('minh', 'joy'); st.act('minh', 'nod');
    await st.wait(600);
    st.act('woman', null); st.act('minh', null);
  } },
  { key: ['Tom asked a man at a cafe', 'Do you know what time it closes'], icon: '🕔', label: 'what time it closes', async play(st) {
    off(st, 'st-b-map', 'st-lb-left'); st.pose('woman', 'stand');
    st.pose('woman', 'wave'); st.mood('woman', 'joy');
    st.dog('wdog', 'stand');
    st.look(1862, { dur: 2600 });
    const away = Promise.all([st.walk('woman', 1000, { speed: 105, follow: false }), st.walk('wdog', 950, { speed: 105, follow: false })])
      .then(() => { st.show('woman', false); st.show('wdog', false); });
    await both(st, 1830, 1772);
    st.sfx('dishes', { vol: 0.25 });
    st.face('tom', 1); st.pose('tom', 'e093_tell'); on(st, 'st-lb-sp-tom2'); st.talk('tom', true);
    on(st, 'st-b-time'); st.sfx('pop', { vol: 0.7 });
    st.pose('man', 'e093_cupHold'); st.mood('man', 'happy');
    await st.wait(1600);
    st.talk('tom', false);
    await away;
  } },
  { key: ['At five', 'the man said'], icon: '5️⃣', label: 'At five', async play(st) {
    off(st, 'st-b-time', 'st-lb-sp-tom2'); st.pose('tom', 'stand');
    st.look(1862);
    st.pose('man', 'e093_talk'); st.mood('man', 'joy'); on(st, 'st-lb-sp-man'); st.talk('man', true);
    on(st, 'st-five');
    await st.loop('tick', () => st.wait(1200), { vol: 0.7 });
    on(st, 'st-b-five'); st.sfx('ding', { vol: 0.6 });
    await st.wait(1000);
    st.talk('man', false);
  } },
  { key: ['do you know if there is a gift shop'], icon: '🛍️', label: 'if there is a gift shop', async play(st) {
    off(st, 'st-b-five', 'st-lb-sp-man'); st.pose('man', 'e093_cupHold');
    st.look(1862);
    st.pose('minh', 'e093_tell'); st.mood('minh', 'joy'); st.talk('minh', true);
    on(st, 'st-b-gift'); st.sfx('pop', { vol: 0.7 });
    await st.wait(2500);
    st.talk('minh', false);
  } },
  { key: ['Minh added'], icon: '➕', label: 'Minh added', async play(st) {
    st.look(1862);
    on(st, 'st-lb-sp-minh2'); st.sfx('pop', { vol: 0.5 });
    await st.wait(350);
    on(st, 'st-lb-added'); st.sfx('click', { vol: 0.7 });
    st.pose('minh', 'pointUp'); st.act('minh', 'point');
    await st.wait(1100);
    st.act('minh', null);
  } },
  { key: ['Yes, a really good one'], icon: '⭐', label: 'a really good one', async play(st) {
    off(st, 'st-b-gift', 'st-lb-sp-minh2', 'st-lb-added'); st.pose('minh', 'stand');
    st.look(1862);
    st.pose('man', 'e093_talk'); st.act('man', 'nod'); st.mood('man', 'joy'); on(st, 'st-lb-sp-man');
    st.talk('man', true);
    on(st, 'st-b-yes'); st.sfx('ding', { vol: 0.6 });
    await st.wait(1500);
    st.act('man', null); st.talk('man', false);
    st.mood('tom', 'joy'); st.mood('minh', 'joy'); st.act('tom', 'hop');
    await st.wait(400);
    st.act('tom', null);
  } },
  { key: ['thanked him politely'], icon: '🙏', label: 'thanked him politely', async play(st) {
    off(st, 'st-b-yes', 'st-lb-sp-man'); st.pose('man', 'e093_cupHold');
    st.look(1862);
    st.face('minh', 1);
    st.pose('tom', 'e093_bow'); st.pose('minh', 'e093_bow'); on(st, 'st-lb-thanks');
    await st.wait(400);
    st.say('tom', 'Thank you!', 1400);
    st.fx('hearts', X.man - 40, 160);
    st.pose('man', 'wave'); st.act('man', 'wave'); st.mood('man', 'joy');
    await st.wait(1500);
    st.pose('tom', 'stand'); st.pose('minh', 'stand'); st.act('man', null);
  } },
  { key: ['I wonder how many dinosaurs they have', 'as they walked in'], icon: '🦖', label: 'how many dinosaurs', async play(st) {
    off(st, 'st-lb-thanks'); st.pose('man', 'e093_cupHold');
    st.look(X.door - 60, { dur: 2800 });
    await both(st, X.door - 20, X.door - 70);
    on(st, 'st-open'); st.sfx('door-open', { vol: 0.7 });
    on(st, 'st-lb-sp-tom3', 'st-th-dino'); st.sfx('pop', { vol: 0.6 });
    st.pose('tom', 'think'); st.mood('tom', 'wow'); st.mood('minh', 'joy');
    await st.wait(2000);
    off(st, 'st-lb-sp-tom3', 'st-th-dino'); st.pose('tom', 'stand');
    await both(st, X.door + 6, X.door - 10, { speed: 90 });
    st.show('tom', false); st.show('minh', false);
    await st.wait(500);
  } },
];

export default {
  id: 'en093', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 4, 6, 8, 13],
  cast: [
    { id: 'bus', kind: 'thing', x: -160, y: FLOOR + 12, svg: BUS, box: [-125, -122, 250, 126] },
    { id: 'tmum', kind: 'adult', who: 'e093_tmum', x: 236, face: 1 },
    { id: 'woman', kind: 'adult', who: 'e093_woman', x: 1700, face: -1 },
    { id: 'wdog', kind: 'dog', x: 1650, s: 0.8, face: -1 },
    { id: 'man', kind: 'adult', who: 'e093_man', x: X.man, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: 330, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 380, face: -1 },
  ],
  init(st) {
    st.bag('minh', true);
    st.pose('man', 'e093_cupHold'); st.hold('man', 'e093_cup');
  },
};
