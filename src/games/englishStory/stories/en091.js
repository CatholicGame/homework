/**
 * Bài 91 "This Time Tomorrow" (tương lai tiếp diễn will be + V-ing): đêm trước chuyến bay sang Úc.
 * Bên trái là "bây giờ": nhà bà ở quê (điện thoại bàn) | phòng Minh ở Hà Nội (Lan làm bài ở bàn, lịch, bản đồ thế giới, va li).
 * Bên phải là "ngày mai" (trời tím hồng, nhãn ngày + đồng hồ cùng giờ): trong máy bay trên mây → cảng Sydney có nhà hát
 * Opera (thứ Hai) → biển Bondi (thứ Ba, Minh tập lướt sóng). Minh "ngày mai" là một nhân vật riêng (minhF), camera cắt sang.
 * Toạ độ cảnh: rộng 2720, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, cloud, label, room, windowBox, rug, night, thought, speaker, palm } from '../kit.js';

const FLOOR = 282;
const W = 2820;
const X = { gma: 290, wall: 380, desk: 500, cal: 640, map: 800, case: 905, door: 1040, fut: 1110, plane: 1390, seat: 1383, harb: 1760, opera: 2050, beach: 2300, sea: 2500 };
const SPEED = 130;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e091_tomMum: { adult: true, hair: 'bob', hairC: '#FCD34D', top: 'blouse', shirt: '#F9A8D4', bottom: 'pants', bottomC: '#475569', shoe: '#F5F5F4' },
  e091_minh_surf: { hair: 'spiky', top: 'tee', shirt: '#38BDF8', bottom: 'shorts', bottomC: '#F97316', shoe: '#F59E0B' },
});

// ── Đồ vật ────────────────────────────────────────────────────────────────
const SUITCASE = `<rect x="-26" y="-50" width="52" height="50" rx="6" fill="#DC2626" stroke="${L}" stroke-width="1.2"/><path d="M-10 -50 V-58 H10 V-50" stroke="${L}" stroke-width="2.4" fill="none"/>
  <path d="M-26 -34 H26 M-26 -16 H26" stroke="#991B1B" stroke-width="1.4"/><circle cx="-18" cy="0" r="3" fill="#334155"/><circle cx="18" cy="0" r="3" fill="#334155"/>
  <rect x="6" y="-30" width="14" height="10" rx="2" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/>`;
const BOARD = `<g class="e091-rock"><path d="M-62 -2 Q-70 -8 -60 -12 H58 Q74 -10 70 -4 Q66 2 56 2 H-56Z" fill="#FDE047" stroke="${L}" stroke-width="1.2"/><path d="M-50 -7 H54" stroke="#F97316" stroke-width="2.4"/></g>`;
const TRAY = `<g transform="translate(0 -4)"><rect x="-18" y="-2" width="36" height="6" rx="2" fill="#CBD5E1" stroke="${L}" stroke-width="0.8"/><path d="M-12 -2 Q-12 -10 -4 -10 Q4 -10 4 -2Z" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M-10 -5 h12" stroke="#F59E0B" stroke-width="2"/><rect x="8" y="-9" width="6" height="8" rx="1" fill="#fff" stroke="${L}" stroke-width="0.6"/></g>`;
const PHONE = `<g transform="translate(0 -6)"><rect x="-4" y="-7" width="8" height="14" rx="1.6" fill="#1F2937" stroke="${L}" stroke-width="0.6"/><rect x="-3" y="-5.6" width="6" height="10" rx="0.8" fill="#7DD3FC"/></g>`;
const HANDSET = `<g transform="translate(0 -4) rotate(-20)"><path d="M-4 -12 Q-8 0 -4 12" stroke="#1F2937" stroke-width="6" fill="none" stroke-linecap="round"/></g>`;
const CLIP = `<g transform="translate(0 -26)"><rect x="-16" y="-20" width="32" height="40" rx="3" fill="#B45309" stroke="${L}"/><rect x="-13" y="-15" width="26" height="33" fill="#fff"/><rect x="-6" y="-23" width="12" height="6" rx="2" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/>
  <path d="M-9 -8 h18 M-9 -1 h18 M-9 6 h12" stroke="#94A3B8" stroke-width="1.2"/></g>`;
const PROPS = { e091_phone: PHONE, e091_handset: HANDSET };
const POSES = {
  e091_sit: { R: [24, -86], L: [24, -86], dy: 20 },
  e091_eat: { R: [118, 248], L: [24, -86], dy: 20 },
  e091_surf: { R: [96, 100], L: [96, 100], dy: 8, head: -4 },
  e091_tick: { R: [24, -86], L: [30, -60], head: 6 },
};
/** Ảnh nhỏ bay qua điện thoại (gốc giữa). */
const PHOTO = (inner) => `<rect x="-14" y="-11" width="28" height="22" rx="2" fill="#fff" stroke="${L}" stroke-width="0.9"/><g transform="translate(0 0)">${inner}</g>`;
const OPERA_MINI = `<rect x="-11" y="-8" width="22" height="16" fill="#7DD3FC"/><path d="M-9 6 Q-6 -6 -2 6 M-3 6 Q1 -8 5 6 M4 6 Q7 -4 9 6" stroke="#fff" stroke-width="1.6" fill="#F8FAFC"/>`;
const BEACH_MINI = `<rect x="-11" y="-8" width="22" height="9" fill="#38BDF8"/><rect x="-11" y="1" width="22" height="7" fill="#FDE68A"/><circle cx="6" cy="-4" r="2.4" fill="#FDE047"/>`;
const PLANE_MINI = (s = 1) => `<g transform="scale(${s})"><path d="M-14 0 Q-14 -4 -8 -4 H10 Q16 -4 16 0 Q16 4 10 4 H-8 Q-14 4 -14 0Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M-2 -3 L-8 -12 H-4 L6 -3Z M-2 3 L-8 12 H-4 L6 3Z M-12 -2 L-16 -9 H-13 L-9 -3Z" fill="#60A5FA" stroke="${L}" stroke-width="0.7"/></g>`;

// ── Cảnh ──────────────────────────────────────────────────────────────────
const clock = (x, y, r, h = 7) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#fff" stroke="${L}" stroke-width="1.6"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M0 ${-r + 3} v3" stroke="${L}" stroke-width="${i % 3 ? 0.8 : 1.8}" transform="rotate(${i * 30})"/>`).join('')}
  <path d="M0 0 V${-r * 0.5}" stroke="#1F2937" stroke-width="2.6" stroke-linecap="round" transform="rotate(${h * 30})"/><path d="M0 0 V${-r * 0.8}" stroke="#DC2626" stroke-width="1.8" stroke-linecap="round"/><circle r="1.8" fill="${L}"/></g>`;
const OPERA = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-110" y="-10" width="220" height="12" fill="#E7E5E4" stroke="${L}"/>
  ${[[-80, 50, 64], [-36, 70, 84], [14, 62, 76], [60, 48, 58]].map(([dx, w, h]) => `<path d="M${dx - w / 2} -10 Q${dx - w / 2 + 6} ${-h} ${dx + w / 2} ${-h - 6} Q${dx + w / 2 - 10} -40 ${dx + w / 2} -10Z" fill="#F8FAFC" stroke="${L}" stroke-width="1.2"/>
    <path d="M${dx - w / 4} -12 Q${dx} ${-h * 0.6} ${dx + w / 2 - 4} ${-h + 2}" stroke="#CBD5E1" stroke-width="1" fill="none"/>`).join('')}</g>`;

function bg() {
  return `
  <defs><linearGradient id="e091now" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#60C5F5"/><stop offset="1" stop-color="#DFF3FD"/></linearGradient>
    <linearGradient id="e091fut" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C4B5FD"/><stop offset="0.6" stop-color="#FBCFE8"/><stop offset="1" stop-color="#FEF3C7"/></linearGradient></defs>
  <!-- nhà bà ở quê -->
  ${room(0, X.wall, FLOOR, '#FDE68A', '#C08B5C')}
  ${windowBox(170, 74, 110, 86)}
  <path d="M170 140 H280" stroke="#65A30D" stroke-width="10" opacity="0.6"/>
  <g transform="translate(110 ${FLOOR})"><rect x="-26" y="-70" width="52" height="70" fill="#92400E" stroke="${L}"/><rect x="-30" y="-74" width="60" height="8" rx="2" fill="#B45309" stroke="${L}"/>
    <g class="e091-gphone"><rect x="-14" y="-88" width="28" height="14" rx="3" fill="#DC2626" stroke="${L}"/><path d="M-12 -92 Q0 -100 12 -92" stroke="#1F2937" stroke-width="5" fill="none" stroke-linecap="round"/></g></g>
  <g transform="translate(160 54)"><rect x="-40" y="-14" width="80" height="22" rx="6" fill="#fff" stroke="${L}"/><text x="0" y="2" text-anchor="middle" ${NUN} font-size="12" fill="#B45309">Nam Dinh</text></g>
  <!-- tường ngăn: hai nơi xa nhau -->
  <rect x="${X.wall}" y="0" width="30" height="315" fill="#A8A29E" stroke="${L}"/>
  <path d="M${X.wall + 15} 20 V300" stroke="#78716C" stroke-width="2" stroke-dasharray="8 8"/>
  <!-- phòng Minh -->
  ${room(X.wall + 30, X.door - X.wall - 30, FLOOR, '#DBEAFE', '#D9A066')}
  <g transform="translate(${X.wall + 110} 54)"><rect x="-36" y="-14" width="72" height="22" rx="6" fill="#fff" stroke="${L}"/><text x="0" y="2" text-anchor="middle" ${NUN} font-size="12" fill="#1D4ED8">Ha Noi</text></g>
  ${clock(X.desk + 70, 92, 16)}
  <!-- lịch: ngày mai khoanh đỏ -->
  <g transform="translate(${X.cal} 120)"><rect x="-40" y="-40" width="80" height="78" rx="4" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-40" y="-40" width="80" height="18" rx="4" fill="#EF4444" stroke="${L}"/>
    <text x="0" y="-27" text-anchor="middle" ${NUN} font-size="10" fill="#fff">JUNE</text>
    ${Array.from({ length: 12 }, (_, i) => `<text x="${-28 + (i % 4) * 19}" y="${-6 + Math.floor(i / 4) * 16}" text-anchor="middle" ${NUN} font-size="9" fill="${i === 6 ? '#DC2626' : '#475569'}">${i + 14}</text>`).join('')}
    <g class="e091-circ"><ellipse cx="${-28 + 2 * 19}" cy="${-6 + 16 - 3}" rx="10" ry="8" fill="none" stroke="#DC2626" stroke-width="2.2"/></g>
    <g class="e091-today"><path d="M-35 -9 l4 4 l7 -9" stroke="#16A34A" stroke-width="2" fill="none"/></g></g>
  <!-- bản đồ thế giới: Hà Nội → Sydney -->
  <g transform="translate(${X.map} 120)"><rect x="-80" y="-56" width="160" height="112" rx="5" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="-74" y="-50" width="148" height="100" fill="#BAE6FD"/>
    <path d="M-60 -44 Q-30 -50 -20 -34 Q-28 -20 -16 -12 Q-30 -4 -44 -20 Q-62 -26 -60 -44Z" fill="#86EFAC" stroke="${L}" stroke-width="0.8"/>
    <path d="M14 12 Q40 4 58 14 Q64 34 46 42 Q26 44 16 34 Q8 22 14 12Z" fill="#FCD34D" stroke="${L}" stroke-width="0.8"/>
    <circle cx="-26" cy="-26" r="4" fill="#DC2626" stroke="#fff"/><text x="-26" y="-36" text-anchor="middle" ${NUN} font-size="9" fill="#1E3A8A">Ha Noi</text>
    <circle cx="50" cy="34" r="4" fill="#DC2626" stroke="#fff"/><text x="50" y="50" text-anchor="middle" ${NUN} font-size="9" fill="#1E3A8A">Sydney</text>
    <path class="e091-route" d="M-26 -26 Q30 -30 50 34" stroke="#DC2626" stroke-width="2" fill="none" stroke-dasharray="4 3"/>
    <g class="e091-mplane"><g transform="translate(50 34) rotate(60)">${PLANE_MINI(0.7)}</g></g>
    <g class="e091-tfam"><g transform="translate(14 30)">${headOnly('en_tom_home', { s: 0.32, mood: 'joy' })}</g><g transform="translate(30 20)">${headOnly('e091_tomMum', { s: 0.32, mood: 'joy' })}</g></g></g>
  <!-- bàn học của Lan -->
  <rect x="${X.desk - 46}" y="${FLOOR - 120}" width="20" height="120" fill="#B45309" opacity="0"/>
  ${rug(X.case - 20, FLOOR, 140, '#A5B4FC')}
  <g transform="translate(${X.case} ${FLOOR})">${SUITCASE}</g>
  <rect x="${X.door - 40}" y="${FLOOR - 140}" width="56" height="140" rx="3" fill="#B45309" stroke="${L}"/><circle cx="${X.door + 6}" cy="${FLOOR - 70}" r="3" fill="#FDE68A"/>
  <!-- NGÀY MAI: trời mơ màng -->
  <rect x="${X.fut}" y="0" width="${W - X.fut}" height="315" fill="url(#e091fut)"/>
  <g class="e091-clouds">${Array.from({ length: 10 }, (_, i) => cloud(X.fut + 40 + i * 64, 262 + (i % 2) * 18, 1.3, 0)).join('')}</g>
  ${cloud(X.fut + 60, 60, 0.8, 1)}${cloud(1560, 70, 0.9, 3)}
  <!-- máy bay (cắt ngang thấy khoang) -->
  <g transform="translate(${X.plane} 0)">
    <path d="M-230 196 Q-250 150 -200 132 H190 Q250 136 266 190 Q250 254 190 256 H-200 Q-240 250 -230 196Z" fill="#fff" stroke="${L}" stroke-width="1.6"/>
    <path d="M-200 132 L-246 70 H-212 L-160 132Z" fill="#3B82F6" stroke="${L}" stroke-width="1.2"/>
    ${[-196, -168, 150, 178].map((dx) => `<circle cx="${dx}" cy="168" r="7" fill="#BAE6FD" stroke="${L}"/>`).join('')}
    <rect x="-120" y="128" width="250" height="122" rx="10" fill="#E0E7FF" stroke="${L}" stroke-width="1.2"/>
    <rect x="-108" y="140" width="40" height="34" rx="12" fill="#BAE6FD" stroke="${L}"/><rect x="86" y="140" width="34" height="34" rx="12" fill="#BAE6FD" stroke="${L}"/>
    <g class="e091-winc"><ellipse cx="-92" cy="164" rx="10" ry="4" fill="#fff"/></g>
    <rect x="-36" y="152" width="58" height="96" rx="10" fill="#2563EB" stroke="${L}"/><rect x="-30" y="146" width="46" height="18" rx="6" fill="#93C5FD" stroke="${L}"/>
    <rect x="40" y="152" width="40" height="96" rx="10" fill="#2563EB" stroke="${L}"/></g>
  <!-- cảng Sydney -->
  <path d="M${X.harb - 40} 140 Q${X.harb + 70} 40 ${X.harb + 200} 140" stroke="#64748B" stroke-width="10" fill="none"/>
  <path d="M${X.harb - 40} 140 Q${X.harb + 70} 60 ${X.harb + 200} 140" stroke="#94A3B8" stroke-width="3" fill="none"/>
  <path d="M${X.harb - 60} 138 H${X.harb + 220}" stroke="#64748B" stroke-width="5"/>
  ${[0, 60, 120, 180].map((d) => `<path d="M${X.harb - 20 + d} 138 V${100 + Math.abs(d - 90) * 0.4}" stroke="#94A3B8" stroke-width="1.6"/>`).join('')}
  <rect x="${X.harb - 60}" y="196" width="${X.beach - X.harb + 60}" height="70" fill="#0EA5E9" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: 12 }, (_, i) => `<path d="M${X.harb - 40 + i * 44} ${212 + (i % 3) * 14} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  ${OPERA(X.opera, 208)}
  <g class="e091-ferry"><g transform="translate(${X.harb + 60} 238)"><path d="M-30 0 H30 L24 10 H-24Z" fill="#16A34A" stroke="${L}"/><rect x="-18" y="-12" width="34" height="12" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/></g></g>
  <rect x="${X.harb - 60}" y="${FLOOR - 16}" width="${X.beach - X.harb + 60}" height="${315 - FLOOR + 16}" fill="#D6D3D1" stroke="${L}"/>
  <path d="M${X.harb - 60} ${FLOOR - 16} H${X.beach}" stroke="#78716C" stroke-width="2"/>
  <!-- biển Bondi -->
  <rect x="${X.beach}" y="180" width="${W - X.beach}" height="90" fill="#38BDF8" stroke="${L}"/>
  ${palm(X.beach + 40, FLOOR - 10, 0.9)}
  <path d="M${X.beach} ${FLOOR - 20} Q${X.sea - 60} ${FLOOR - 30} ${X.sea} ${FLOOR - 10} V315 H${X.beach}Z" fill="#FDE68A" stroke="${L}"/>
  <rect x="${X.sea}" y="${FLOOR - 10}" width="${W - X.sea}" height="${315 - FLOOR + 10}" fill="#0EA5E9"/>
  <g class="e091-swell"><path d="M${X.sea + 20} 262 Q${X.sea + 120} 214 ${X.sea + 220} 250 Q${X.sea + 250} 262 ${X.sea + 280} 258 V280 H${X.sea + 20}Z" fill="#7DD3FC" stroke="${L}" stroke-width="0.8"/>
    <path d="M${X.sea + 120} 222 q30 -6 40 14" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
}

function fg() {
  const tag = (x, t, c) => `<g transform="translate(${x} 70)"><rect x="${-t.length * 5.6 - 30}" y="-16" width="${t.length * 11.2 + 60}" height="30" rx="15" fill="#fff" stroke="${c}" stroke-width="2"/>
    ${clock(-t.length * 5.6 - 12, -1, 11)}<text x="12" y="5" text-anchor="middle" ${NUN} font-size="15" fill="${c}">${t}</text></g>`;
  return `
  <!-- bàn học (che chân Lan) -->
  <rect x="${X.desk - 40}" y="${FLOOR - 58}" width="96" height="8" rx="2" fill="#F59E0B" stroke="${L}"/><rect x="${X.desk - 36}" y="${FLOOR - 50}" width="8" height="50" fill="#92400E" stroke="${L}"/><rect x="${X.desk + 44}" y="${FLOOR - 50}" width="8" height="50" fill="#92400E" stroke="${L}"/>
  <rect x="${X.desk - 10}" y="${FLOOR - 64}" width="34" height="6" fill="#fff" stroke="${L}" stroke-width="0.7"/>
  <!-- bàn gấp trong máy bay, lớp nước trước ván lướt -->
  <rect x="${X.sea}" y="${FLOOR + 2}" width="${W - X.sea}" height="${315 - FLOOR}" fill="#0EA5E9" opacity="0.85"/>
  <g class="ek-wave">${Array.from({ length: 7 }, (_, i) => `<path d="M${X.sea + 10 + i * 44} ${FLOOR + 10 + (i % 2) * 8} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <!-- ranh giới bây giờ | ngày mai -->
  <rect x="${X.fut - 12}" y="0" width="24" height="315" fill="#fff" opacity="0.7"/>
  ${night(X.wall + 30, X.fut - X.wall - 18, 315, X.map - 60)}
  <!-- nhãn ngày giờ của "ngày mai" -->
  <g class="e091-lb e091-lb-ttm">${tag(X.plane + 10, 'this time tomorrow', '#7C3AED')}</g>
  <g class="e091-lb e091-lb-mon">${tag(X.opera - 120, 'Monday', '#0369A1')}</g>
  <g class="e091-lb e091-lb-tue">${tag(X.sea + 30, 'Tuesday', '#EA580C')}</g>
  <!-- nhãn -->
  <g class="e091-lb e091-lb-big">${label(X.cal, 200, 'a big day', '#DC2626', 16)}</g>
  <g class="e091-lb e091-lb-syd">${label(X.map, 200, 'flying to Sydney', '#1D4ED8', 15)}</g>
  <g class="e091-lb e091-lb-think">${label(X.map - 120, 220, "can't stop thinking", '#7C3AED', 14)}</g>
  <g class="e091-lb e091-lb-sit">${label(X.seat - 6, 112, 'sitting on the plane', '#1D4ED8', 14)}</g>
  <g class="e091-lb e091-lb-cloud">${label(X.seat, 112, 'above the clouds', '#0369A1', 14)}</g>
  <g class="e091-lb e091-lb-hw">${label(X.desk + 60, 120, 'doing your homework', '#16A34A', 14)}</g>
  <g class="e091-lb e091-lb-plan">${label(X.door - 110, 92, 'planned everything', '#DB2777', 14)}</g>
  <g class="e091-lb e091-lb-opera">${label(X.opera, 118, 'the Opera House', '#0369A1', 15)}</g>
  <g class="e091-lb e091-lb-surf">${label(X.sea + 70, 140, 'learning to surf', '#EA580C', 15)}</g>
  <g class="e091-lb e091-lb-phone">${label(X.wall + 15, 112, 'on the phone', '#B45309', 14)}</g>
  <g class="e091-lb e091-lb-gma">${speaker(X.gma, 104, 'Grandma')}</g>
  <g class="e091-lb e091-lb-photos">${label(X.wall + 15, 112, 'photos every day', '#DB2777', 14)}</g>
  <g class="e091-lb e091-lb-night">${label(X.case - 10, 150, 'next to the suitcase', '#4338CA', 14)}</g>
  <!-- sóng điện thoại giữa hai nơi -->
  <g class="e091-sig">${[0, 1, 2].map((i) => `<path class="e091-sigw" style="animation-delay:${i * 0.25}s" d="M${X.wall - 50 + i * 40} 150 q15 -16 30 0" stroke="#F97316" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <!-- kế hoạch của mẹ Tom -->
  <g class="e091-plan"><g transform="translate(${X.door - 150} 150)"><rect x="-70" y="-34" width="140" height="78" rx="6" fill="#FEF9C3" stroke="${L}" stroke-width="1.4"/>
    <text x="0" y="-16" text-anchor="middle" ${NUN} font-size="13" fill="#DB2777">OUR PLAN</text>
    <text x="-56" y="6" ${NUN} font-size="11" fill="#1E3A8A">Mon: Opera House</text><text x="-56" y="28" ${NUN} font-size="11" fill="#1E3A8A">Tue: surfing</text>
    <g class="e091-t1"><path d="M48 0 l4 5 l9 -11" stroke="#16A34A" stroke-width="3" fill="none" stroke-linecap="round"/></g>
    <g class="e091-t2"><path d="M48 22 l4 5 l9 -11" stroke="#16A34A" stroke-width="3" fill="none" stroke-linecap="round"/></g></g></g>
  <!-- bong bóng nghĩ của Minh: hình đổi liên tục -->
  ${thought(X.map - 40, 92, 104, 66, `<g class="e091-ic e091-ic1">${PLANE_MINI(2)}</g><g class="e091-ic e091-ic2"><g transform="translate(0 16) scale(0.32)">${OPERA(0, 0)}</g></g><g class="e091-ic e091-ic3"><g transform="scale(0.5)">${BOARD}</g><path d="M-30 8 q10 -14 20 0 q10 14 20 0 q10 -14 20 0" stroke="#0EA5E9" stroke-width="3" fill="none"/></g>`, [X.map - 70, 150], 'e091-think')}
  <!-- Lucky nghĩ: Minh đi xa -->
  ${thought(X.case + 20, 106, 120, 72, `<g transform="translate(-26 18)">${headOnly('en_minh_home', { s: 0.42, mood: 'joy' })}</g><g class="e091-away"><g transform="translate(18 -8) rotate(-14)">${PLANE_MINI(1.3)}</g></g>`, [X.case - 50, 210], 'e091-lthink')}`;
}

const LB = ['ttm', 'mon', 'tue', 'big', 'syd', 'think', 'sit', 'cloud', 'hw', 'plan', 'opera', 'surf', 'phone', 'gma', 'photos', 'night'];
const CSS = `
.e091-lb { opacity: 0; transition: opacity .35s; }
${LB.map((k) => `.st-lb-${k} .e091-lb-${k}`).join(', ')} { opacity: 1; }
.e091-circ { clip-path: inset(0 100% 0 0); }
.st-circ .e091-circ { clip-path: inset(0 0 0 0); transition: clip-path 1.2s linear; }
.e091-route { clip-path: inset(0 100% 0 0); }
.st-route .e091-route { clip-path: inset(0 0 0 0); transition: clip-path 1.6s linear; }
.e091-mplane { opacity: 0; }
.st-route .e091-mplane { opacity: 1; animation: e091Fly 1.6s ease-in-out both; }
@keyframes e091Fly { from { transform: translate(-76px, -60px); } to { transform: none; } }
.e091-tfam { opacity: 0; transition: opacity .4s; } .st-tfam .e091-tfam { opacity: 1; }
.e091-think, .e091-lthink { opacity: 0; transform: scale(.4); transition: opacity .3s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.e091-think { transform-origin: ${X.map - 70}px 150px; } .e091-lthink { transform-origin: ${X.case - 50}px 210px; }
.st-think .e091-think, .st-lthink .e091-lthink { opacity: 1; transform: none; }
.e091-ic { opacity: 0; }
.st-think .e091-ic1 { animation: e091Ic 2.4s steps(1) infinite; }
.st-think .e091-ic2 { animation: e091Ic 2.4s steps(1) -1.6s infinite; }
.st-think .e091-ic3 { animation: e091Ic 2.4s steps(1) -.8s infinite; }
@keyframes e091Ic { 0% { opacity: 1; } 33.3% { opacity: 0; } }
.e091-clouds { animation: e091Clouds 6s linear infinite; }
@keyframes e091Clouds { from { transform: translateX(0); } to { transform: translateX(-64px); } }
.e091-winc { animation: e091Clouds 1.2s linear infinite; }
.e091-ferry { animation: e091Ferry 16s ease-in-out infinite alternate; }
@keyframes e091Ferry { to { transform: translateX(180px); } }
.e091-swell { animation: e091Swell 2.4s ease-in-out infinite alternate; }
@keyframes e091Swell { to { transform: translateX(-30px) translateY(4px); } }
.e091-rock { animation: e091Rock 1.4s ease-in-out infinite alternate; transform-origin: 0 0; }
@keyframes e091Rock { from { transform: rotate(-3deg) translateY(0); } to { transform: rotate(3deg) translateY(3px); } }
.e091-surf .es-flip > svg { animation: e091Rock 1.4s ease-in-out infinite alternate; transform-origin: 50% 97%; }
.e091-plan { opacity: 0; transform: scale(.5); transform-origin: ${X.door - 150}px 190px; transition: opacity .3s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-plan .e091-plan { opacity: 1; transform: none; }
.e091-t1, .e091-t2 { clip-path: inset(0 100% 0 0); }
.st-t1 .e091-t1, .st-t2 .e091-t2 { clip-path: inset(0 0 0 0); transition: clip-path .5s linear; }
.e091-sig { opacity: 0; } .st-sig .e091-sig { opacity: 1; }
.e091-sigw { animation: e091Sig .75s ease-in-out infinite alternate; }
@keyframes e091Sig { from { opacity: .2; } to { opacity: 1; } }
.st-ring .e091-gphone { animation: e091Buzz .08s linear infinite alternate; }
@keyframes e091Buzz { from { transform: translateX(-1.5px); } to { transform: translateX(1.5px); } }
.st-lifted .e091-gphone path { opacity: 0; }
.st-night .ek-night { opacity: 1; }
.st-lthink .e091-away { animation: e091Away 2s ease-in both; }
@keyframes e091Away { from { transform: translate(-20px, 14px) scale(.6); } to { transform: translate(24px, -14px) scale(1); } }
@media (prefers-reduced-motion: reduce) { .e091-clouds { animation-duration: 14s; } .e091-swell, .e091-rock, .e091-surf .es-flip > svg { animation-duration: 3s; } .st-ring .e091-gphone { animation: none; } }
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const surf = (st, on) => { st.a('minhF').el.classList.toggle('e091-surf', on); };

const BEATS = [
  { key: ['Tomorrow is a big day for Minh'], icon: '📅', label: 'a big day', async play(st) {
    st.look(X.cal);
    await st.walk('minh', X.cal + 50, { speed: SPEED, follow: false });
    st.face('minh', -1); st.pose('minh', 'point');
    st.set('st-circ');
    await st.loop('pencil', () => st.wait(1200), { vol: 0.7 });
    st.set('st-lb-big'); st.sfx('cheer', { vol: 0.4 });
    st.pose('minh', 'cheer'); st.act('minh', 'hop'); st.mood('minh', 'joy');
    await st.wait(1100);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['flying to Sydney', "with Tom's family"], icon: '✈️', label: 'flying to Sydney', async play(st) {
    off(st, 'st-lb-big');
    st.look(X.map - 30);
    await st.walk('minh', X.map - 100, { speed: SPEED, follow: false });
    st.face('minh', 1); st.pose('minh', 'point');
    st.set('st-route'); st.sfx('plane', { vol: 0.7 });
    await st.wait(1300);
    st.set('st-lb-syd'); st.set('st-tfam'); st.sfx('ding', { vol: 0.4 });
    st.mood('minh', 'joy');
    await st.wait(1200);
    st.pose('minh', 'stand');
  } },
  { key: ["can't stop thinking about it"], icon: '💭', label: "can't stop thinking", async play(st) {
    off(st, 'st-lb-syd');
    st.look(X.map - 60);
    st.face('minh', -1); st.pose('minh', 'think'); st.mood('minh', 'joy');
    st.set('st-think'); st.set('st-lb-think');
    for (let i = 0; i < 3; i++) { st.sfx('pop', { vol: 0.5, rate: 0.9 + i * 0.1 }); await st.wait(800); }
  } },
  { key: ['This time tomorrow, I will be sitting on the plane', 'he told Lan'], icon: '💺', label: 'sitting on the plane', async play(st) {
    off(st, 'st-think', 'st-lb-think');
    st.pose('minh', 'stand');
    st.look(X.desk + 120);
    await st.walk('minh', X.desk + 90, { speed: SPEED, follow: false });
    st.face('minh', -1); st.face('lan', 1); st.pose('lan', 'e091_sit');
    await st.say('minh', 'This time tomorrow...', 1500);
    // cắt sang "ngày mai": trong máy bay
    st.look(X.plane, { instant: true });
    st.set('st-lb-ttm'); st.sfx('plane', { vol: 0.7 });
    st.pose('minhF', 'e091_sit'); st.mood('minhF', 'joy');
    await st.wait(500);
    st.set('st-lb-sit');
    await st.wait(1500);
  } },
  { key: ['eating dinner above the clouds', 'while you are doing your homework'], icon: '🍱', label: 'above the clouds', async play(st) {
    off(st, 'st-lb-sit');
    st.look(X.plane);
    st.set('st-lb-ttm'); st.set('st-lb-cloud');
    st.chest('minhF', TRAY); st.hold('minhF', 'spoon'); st.pose('minhF', 'e091_eat'); st.act('minhF', 'eat');
    await st.loop('crunch', () => st.wait(1700), { vol: 0.6 });
    st.act('minhF', null);
    // trong khi đó ở nhà
    off(st, 'st-lb-ttm', 'st-lb-cloud');
    st.look(X.desk + 60, { instant: true });
    st.set('st-lb-hw');
    st.hold('lan', 'pencil'); st.pose('lan', 'write'); st.act('lan', 'write'); st.mood('lan', 'shut');
    await st.loop('pencil', () => st.wait(1500), { vol: 0.8 });
    st.act('lan', null); st.mood('lan', 'happy');
  } },
  { key: ["Tom's mother has planned everything"], icon: '📋', label: 'planned everything', async play(st) {
    off(st, 'st-lb-hw');
    st.look(X.door - 170);
    st.sfx('door-open', { vol: 0.5 });
    st.show('mrsB', true); st.place('mrsB', X.door + 40, FLOOR, -1);
    await st.walk('mrsB', X.door - 40, { speed: SPEED, follow: false });
    st.chest('mrsB', CLIP); st.pose('mrsB', 'e091_tick'); st.mood('mrsB', 'joy');
    st.set('st-plan'); st.set('st-lb-plan');
    await st.wait(400);
    st.set('st-t1'); st.sfx('pencil', { vol: 0.7 });
    await st.wait(700);
    st.set('st-t2'); st.sfx('pencil', { vol: 0.7 });
    await st.wait(600);
    st.sfx('ding', { vol: 0.5 });
    await st.wait(300);
  } },
  { key: ['On Monday', 'visiting the famous Opera House by the harbour'], icon: '🏛️', label: 'Opera House', async play(st) {
    off(st, 'st-plan', 'st-lb-plan');
    st.chest('mrsB', null); st.pose('mrsB', 'stand');
    st.chest('minhF', null); st.hold('minhF', null); st.pose('minhF', 'stand');
    st.place('minhF', X.harb + 20, FLOOR, 1); st.place('tomF', X.harb - 30, FLOOR, 1); st.place('mrsB', X.harb - 90, FLOOR, 1);
    st.show('tomF', true);
    st.look(X.opera - 120, { instant: true });
    st.set('st-lb-mon'); st.sfx('boat-horn', { vol: 0.6 });
    await Promise.all([
      st.walk('minhF', X.opera - 70, { speed: SPEED, follow: false }),
      st.walk('tomF', X.opera - 120, { speed: SPEED, follow: false }),
      st.walk('mrsB', X.opera - 180, { speed: SPEED, follow: false }),
    ]);
    st.set('st-lb-opera'); st.pose('minhF', 'point'); st.mood('minhF', 'wow'); st.sfx('camera', { vol: 0.6 });
    await st.wait(1000);
    st.pose('minhF', 'stand');
  } },
  { key: ['On Tuesday', 'learning to surf at Bondi Beach'], icon: '🏄', label: 'learning to surf', async play(st) {
    off(st, 'st-lb-mon', 'st-lb-opera');
    st.place('tomF', X.sea - 60, FLOOR - 4, 1); st.place('mrsB', X.sea - 150, FLOOR - 14, 1);
    who(st, 'minhF', 'e091_minh_surf');
    st.place('minhF', X.sea + 150, FLOOR - 2, 1); st.place('board', X.sea + 150, FLOOR); st.show('board', true);
    st.pose('minhF', 'e091_surf'); surf(st, true); st.mood('minhF', 'wow');
    st.look(X.sea + 40, { instant: true });
    st.set('st-lb-tue');
    await st.loop('river', async () => {
      st.pose('tomF', 'point'); st.mood('tomF', 'joy');
      await st.wait(800);
      st.set('st-lb-surf'); st.sfx('splash', { vol: 0.8 }); st.fx('drops', X.sea + 200, FLOOR - 30);
      st.mood('minhF', 'joy');
      await st.wait(1600);
    }, { vol: 0.6 });
    st.pose('tomF', 'stand');
  } },
  { key: ['Will you be thinking of us'], icon: '👵', label: 'thinking of us?', async play(st) {
    off(st, 'st-lb-tue', 'st-lb-surf');
    st.look(X.wall + 60, { instant: true });
    st.set('st-ring'); st.sfx('phone-ring', { vol: 0.8 });
    st.hold('minh', 'e091_phone'); st.pose('minh', 'phone');
    await st.wait(900);
    st.set('st-ring', false); st.set('st-lifted');
    st.hold('gma', 'e091_handset'); st.pose('gma', 'phone'); st.mood('gma', 'joy');
    st.set('st-sig');
    await st.say('gma', 'Will you be thinking of us?', 2000);
  } },
  { key: ['Grandma asked on the phone'], icon: '☎️', label: 'on the phone', async play(st) {
    st.look(X.wall + 60);
    st.set('st-sig'); st.set('st-lb-gma'); st.set('st-lb-phone'); st.sfx('beep', { vol: 0.5 });
    st.act('gma', 'nod'); st.talk('gma', true);
    await st.wait(1500);
    st.act('gma', null); st.talk('gma', false);
  } },
  { key: ['Of course', 'Minh said'], icon: '👍', label: 'Of course!', async play(st) {
    off(st, 'st-lb-gma', 'st-lb-phone');
    st.look(X.wall + 60);
    st.mood('minh', 'joy'); st.act('minh', 'nod'); st.sfx('ding', { vol: 0.5 });
    await st.say('minh', 'Of course!', 1300);
    st.act('minh', null);
  } },
  { key: ['I will be sending you photos every day'], icon: '📸', label: 'photos every day', async play(st) {
    st.look(X.wall + 60);
    st.set('st-lb-photos');
    st.talk('minh', true);
    for (const [i, pic] of [OPERA_MINI, BEACH_MINI, OPERA_MINI].entries()) {
      st.sfx('camera', { vol: 0.6 });
      await st.wait(150);
      st.sfx('whoosh', { vol: 0.4 });
      await st.fly(PHOTO(pic), [X.desk + 90, FLOOR - 120], [X.gma + 30, FLOOR - 140 - i * 6], { size: 30, dur: 650 });
    }
    st.talk('minh', false);
    st.mood('gma', 'joy'); st.fx('hearts', X.gma + 10, FLOOR - 170, { quiet: true });
    await st.wait(600);
  } },
  { key: ['That night', "Lucky slept next to Minh's suitcase"], icon: '🧳', label: 'next to the suitcase', async play(st) {
    off(st, 'st-lb-photos', 'st-sig', 'st-lifted');
    st.hold('minh', null); st.pose('minh', 'stand'); st.hold('gma', null); st.pose('gma', 'stand');
    st.show('minh', false); st.show('lan', false);
    st.look(X.case - 40);
    st.sfx('click', { vol: 0.6 }); st.set('st-night');
    await st.wait(400);
    await st.walk('lucky', X.case - 70, { speed: 110, follow: false });
    st.dog('lucky', 'sit'); st.mood('lucky', 'shut');
    st.set('st-lb-night');
    await st.wait(300);
    st.fx('zzz', X.case - 40, FLOOR - 70);
    await st.wait(1500);
  } },
  { key: ['his friend was leaving'], icon: '🐶', label: 'friend was leaving', async play(st) {
    off(st, 'st-lb-night');
    st.look(X.case - 20);
    st.mood('lucky', 'sad');
    st.set('st-lthink'); st.sfx('plane', { vol: 0.35 });
    await st.wait(1600);
    st.act('lucky', 'wag'); st.fx('hearts', X.case - 40, FLOOR - 80, { quiet: true }); st.sfx('purr', { vol: 0.3 });
    await st.wait(1200);
    st.act('lucky', null);
  } },
];
/** Đổi trang phục ngay (không có làn khói). */
const who = (st, id, w) => { const A = st.a(id); A.who = w; A.build(); };

export default {
  id: 'en091', worldW: W, floor: FLOOR, viewTop: 40, camStart: X.cal - 245, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 3, 4, 6, 7, 12],
  cast: [
    { id: 'gma', kind: 'adult', who: 'en_grandma', x: X.gma, face: 1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.desk, face: 1 },
    { id: 'lucky', kind: 'dog', x: X.case + 75, s: 0.85, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.cal - 40, face: 1 },
    { id: 'mrsB', kind: 'adult', who: 'e091_tomMum', x: X.door + 40, face: -1 },
    { id: 'board', kind: 'thing', x: X.sea + 150, svg: BOARD, box: [-74, -16, 150, 20] },
    { id: 'minhF', kind: 'kid', who: 'en_minh_home', x: X.seat, y: 248, face: 1 },
    { id: 'tomF', kind: 'kid', who: 'en_tom_home', x: X.harb - 30, face: 1 },
  ],
  init(st) {
    st.show('mrsB', false); st.show('tomF', false); st.show('board', false);
    st.dog('lucky', 'sit');
    st.pose('lan', 'e091_sit');
    st.pose('minhF', 'e091_sit');
  },
};
