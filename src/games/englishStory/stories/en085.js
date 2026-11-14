/**
 * Bài 85 "I Have Been Practising" (hiện tại hoàn thành tiếp diễn): nhà Minh, đi từ trái sang phải:
 * phòng đàn (đàn phím trên giá, ghế đàn dài, ba khung ảnh Lan tập đàn qua ba năm, đồng hồ, lịch tháng có thứ Bảy khoanh đỏ,
 * cửa sổ chuyển chiều / đêm) → phòng may của mẹ (máy may, ma-nơ-canh với chiếc váy mới) → cửa chính → phố → nhà hát thành phố
 * (áp phích CONCERT, ô bán vé). Việc kéo dài tới bây giờ hiện bằng thời gian chạy: khung ảnh từng năm, ô lịch được đánh dấu
 * mỗi tối, kim đồng hồ quay.
 * Toạ độ cảnh: rộng 1720, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, room, doorway, label, thought, road, tree, sun } from '../kit.js';

const FLOOR = 282;
const W = 1720;
const X = { lan: 245, kb: 245, bench: 265, kitty: 336, minh: 352, door1: 600, mum: 740, dress: 912, door2: 1000, booth: 1330, theatre: 1460 };
const K = FLOOR - 48; // mặt phím đàn
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e085_seller: { adult: true, hair: 'bob', top: 'blouse', shirt: '#FDBA74', bottom: 'pants', bottomC: '#334155', shoe: '#78716C' },
});

// ── Đồ vật ────────────────────────────────────────────────────────────────
const NOTE = (c = '#7C3AED') => `<path d="M0 0 V-14 L9 -17 V-4" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="-2.6" cy="0" rx="3.6" ry="2.8" fill="${c}"/><ellipse cx="6.4" cy="-3.6" rx="3.6" ry="2.8" fill="${c}"/>`;
const TICKET = `<g transform="rotate(-10)"><rect x="-14" y="-8" width="28" height="16" rx="2" fill="#FDE047" stroke="${L}" stroke-width="0.9"/><path d="M6 -8 V8" stroke="${L}" stroke-width="0.7" stroke-dasharray="2 1.5"/><path d="M-10 -2 H2 M-10 2 H0" stroke="#B45309" stroke-width="1.2"/></g>`;
const TICKETS = `<g transform="translate(0 -10)"><g transform="translate(-6 2)">${TICKET}</g><g transform="translate(4 -2)">${TICKET}</g></g>`;
const WALLET = `<g transform="rotate(180) translate(0 4)"><rect x="-10" y="0" width="20" height="14" rx="2.4" fill="#92400E" stroke="${L}" stroke-width="0.9"/><path d="M-10 5 H10" stroke="#78350F" stroke-width="1"/><circle cx="6" cy="9" r="1.6" fill="#FACC15"/></g>`;
const PROPS = { e085_wallet: WALLET };
const POSES = {
  e085_play: { R: [24, -42], L: [24, -42], dy: 20, head: 6 },     // ngồi, hai tay trên phím đàn
  e085_shake: { R: [60, 150], L: [60, 150], dy: 20, head: -4 },   // giơ hai bàn tay lên vẩy cho đỡ mỏi
  e085_turn: { R: [10, 4], L: [92, 118], head: -6 },              // tay trái với sang lật trang
  e085_hips: { R: [70, -40], L: [70, -40], head: 8 },
  e085_sew: { R: [26, -48], L: [26, -48], dy: 20, head: 8 },
  e085_wallet: { R: [150, 172], L: [10, 4], head: -4 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
/** Khung ảnh nhỏ: Lan ngồi đàn, cỡ đầu lớn dần theo năm. */
const frame = (x, y, s, yr) => `<g class="e085-yr e085-yr${yr}"><g transform="translate(${x} ${y})"><rect x="-22" y="-24" width="44" height="48" rx="3" fill="#FEF3C7" stroke="${L}" stroke-width="1.4"/>
  <rect x="-18" y="-20" width="36" height="34" fill="#E0F2FE"/><g transform="translate(0 ${4 - s * 6})">${headOnly('en_lan_home', { s: 0.38 * s, mood: 'joy' })}</g>
  <rect x="-16" y="6" width="32" height="7" fill="#1F2937"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${-15 + i * 5}" y="7" width="4" height="5" fill="#fff"/>`).join('')}
  <text x="0" y="22" text-anchor="middle" ${NUN} font-size="7" fill="#92400E">YEAR ${yr}</text></g></g>`;
/** Lịch tháng (góc trên trái x, y): 4 hàng × 7 ô, thứ Bảy tuần cuối khoanh đỏ; các ô được đánh dấu mỗi tối. */
function calendar(x, y) {
  const cw = 13, ch = 11;
  const cells = Array.from({ length: 28 }, (_, i) => {
    const cx = x + 6 + (i % 7) * cw, cy = y + 26 + Math.floor(i / 7) * ch;
    const tick = i < 26 ? `<path class="e085-tk" style="transition-delay:${(i * 0.09).toFixed(2)}s" d="M${cx + 2} ${cy + 5} l3 3 l5 -6" stroke="#16A34A" stroke-width="1.8" fill="none" stroke-linecap="round"/>` : '';
    return `<rect x="${cx}" y="${cy}" width="${cw - 1}" height="${ch - 1}" fill="#fff" stroke="#CBD5E1" stroke-width="0.6"/>${tick}`;
  }).join('');
  const sat = [x + 6 + 5 * cw + 6, y + 26 + 3 * ch + 5];
  return `<g><rect x="${x}" y="${y}" width="${7 * cw + 12}" height="${4 * ch + 34}" rx="3" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <rect x="${x}" y="${y}" width="${7 * cw + 12}" height="18" rx="3" fill="#EF4444" stroke="${L}" stroke-width="1"/>
    <text x="${x + (7 * cw + 12) / 2}" y="${y + 13}" text-anchor="middle" ${NUN} font-size="10" fill="#fff">THIS MONTH</text>${cells}
    <g class="e085-sat"><circle cx="${sat[0]}" cy="${sat[1]}" r="9" fill="none" stroke="#DC2626" stroke-width="2"/></g></g>`;
}
/** Đồng hồ treo tường (tâm x, y). */
const clock = (x, y) => `<g transform="translate(${x} ${y})"><circle r="22" fill="#fff" stroke="${L}" stroke-width="2"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M0 -18 V-15" stroke="${L}" stroke-width="1.4" transform="rotate(${i * 30})"/>`).join('')}
  <g class="e085-hh"><path d="M0 0 V-10" stroke="${L}" stroke-width="2.6" stroke-linecap="round"/></g>
  <g class="e085-mh"><path d="M0 0 V-16" stroke="#DC2626" stroke-width="1.6" stroke-linecap="round"/></g><circle r="2" fill="${L}"/></g>`;
/** Ma-nơ-canh với chiếc váy (gốc = sàn). */
const DRESS = `<path d="M0 0 V-40 M-14 0 H14" stroke="#78716C" stroke-width="3"/><path d="M-8 -112 Q0 -120 8 -112 L10 -94 H-10Z" fill="#E7E5E4" stroke="${L}"/>
  <g class="e085-dress"><path d="M-11 -110 Q0 -114 11 -110 L13 -84 L34 -40 Q0 -32 -34 -40 L-13 -84Z" fill="#F472B6" stroke="${L}" stroke-width="1.2"/>
  <path d="M-13 -84 H13" stroke="#BE185D" stroke-width="2.4"/><path d="M-26 -50 q8 4 16 0 q8 4 16 0 q8 4 16 0" stroke="#FBCFE8" stroke-width="1.6" fill="none"/>
  <circle cx="0" cy="-98" r="2" fill="#FDE047"/><circle cx="0" cy="-91" r="2" fill="#FDE047"/></g>
  <g class="e085-sketch"><path d="M-11 -110 Q0 -114 11 -110 L13 -84 L34 -40 Q0 -32 -34 -40 L-13 -84Z" fill="none" stroke="#DB2777" stroke-width="1" stroke-dasharray="3 3"/></g>`;

function bg() {
  return `
  ${sky(X.door2, W - X.door2, 315, 'e085sky')}
  <g transform="translate(1180 70)">${sun(20)}</g>${cloud(1300, 64, 0.8, 0)}${cloud(1620, 52, 0.7, 3)}
  ${room(0, X.door1, FLOOR, '#FEF3C7')}
  ${room(X.door1, X.door2 - X.door1, FLOOR, '#E0F2FE', '#C08B5C')}
  <!-- cửa sổ phòng đàn: chiều / tối -->
  <g><rect x="34" y="74" width="100" height="92" fill="#BAE6FD"/><rect class="e085-eve" x="34" y="74" width="100" height="92" fill="#7C3AED"/>
    <g class="e085-moon"><circle cx="106" cy="98" r="10" fill="#FEF9C3"/><circle cx="111" cy="94" r="9" fill="#5B21B6"/></g>
    <path d="M34 146 Q80 130 134 144 V166 H34Z" fill="#86EFAC" opacity="0.8"/>
    <rect x="28" y="68" width="112" height="104" rx="4" fill="none" stroke="#fff" stroke-width="6"/><rect x="24" y="64" width="120" height="112" rx="5" fill="none" stroke="${L}" stroke-width="1.2"/>
    <path d="M84 70 V170" stroke="#fff" stroke-width="4"/></g>
  ${frame(190, 104, 0.8, 1)}${frame(245, 104, 0.9, 2)}${frame(300, 104, 1, 3)}
  ${clock(392, 92)}
  ${calendar(440, 120)}
  <!-- ghế đàn dài -->
  <rect x="${X.bench - 82}" y="${FLOOR - 32}" width="164" height="10" rx="3" fill="#7C2D12" stroke="${L}" stroke-width="1.2"/>
  <path d="M${X.bench - 72} ${FLOOR - 22} V${FLOOR} M${X.bench + 72} ${FLOOR - 22} V${FLOOR}" stroke="#7C2D12" stroke-width="5"/>
  ${doorway(X.door1, FLOOR)}
  <!-- phòng may: kệ vải, gương -->
  <rect x="${X.door1 + 40}" y="70" width="90" height="8" rx="2" fill="#A16207" stroke="${L}"/>
  ${['#F472B6', '#60A5FA', '#FDE047', '#34D399'].map((c, i) => `<rect x="${X.door1 + 46 + i * 21}" y="50" width="18" height="20" rx="3" fill="${c}" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <g transform="translate(${X.dress} ${FLOOR})">${DRESS}</g>
  <!-- ghế của mẹ -->
  <rect x="${X.mum - 22}" y="${FLOOR - 40}" width="44" height="8" rx="3" fill="#7C2D12" stroke="${L}"/><path d="M${X.mum - 16} ${FLOOR - 32} V${FLOOR} M${X.mum + 16} ${FLOOR - 32} V${FLOOR}" stroke="#7C2D12" stroke-width="4"/>
  <!-- cửa chính -->
  <rect x="${X.door2 - 6}" y="0" width="12" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  <rect x="${X.door2 + 6}" y="${FLOOR - 112}" width="60" height="112" fill="#7DD3FC" stroke="${L}"/>
  <g class="e085-door"><rect x="${X.door2 + 6}" y="${FLOOR - 112}" width="60" height="112" fill="#B45309" stroke="${L}" stroke-width="1.2"/><circle cx="${X.door2 + 56}" cy="${FLOOR - 56}" r="3" fill="#FDE68A"/></g>
  <rect x="${X.door2 + 66}" y="0" width="14" height="${FLOOR}" fill="#FDE68A" stroke="${L}"/>
  <!-- phố, cây, nhà hát -->
  ${road(X.door2 + 80, W - X.door2 - 80, FLOOR + 10)}
  ${tree(1170, FLOOR - 2, 0.8)}
  <g transform="translate(${X.theatre} 0)">
    <rect x="-150" y="96" width="300" height="${FLOOR - 96}" fill="#FDE68A" stroke="${L}" stroke-width="1.4"/>
    <path d="M-166 100 L0 44 L166 100Z" fill="#FCA5A5" stroke="${L}" stroke-width="1.4"/>
    <rect x="-110" y="104" width="220" height="24" rx="4" fill="#fff" stroke="${L}"/><text x="0" y="122" text-anchor="middle" ${NUN} font-size="16" fill="#B91C1C">CITY THEATRE</text>
    ${[-120, -60, 60, 120].map((dx) => `<rect x="${dx - 8}" y="134" width="16" height="${FLOOR - 134}" fill="#FFFBEB" stroke="${L}"/>`).join('')}
    <path d="M-34 ${FLOOR} V176 Q0 150 34 176 V${FLOOR}Z" fill="#7F1D1D" stroke="${L}" stroke-width="1.2"/>
    <g transform="translate(90 196)"><rect x="-22" y="-34" width="44" height="64" rx="3" fill="#7C3AED" stroke="${L}"/><text x="0" y="-18" text-anchor="middle" ${NUN} font-size="8.5" fill="#FDE047">CONCERT</text>
      <g transform="translate(0 0)">${headOnly('en_lan_home', { s: 0.34, mood: 'joy' })}</g><text x="0" y="24" text-anchor="middle" ${NUN} font-size="8" fill="#fff">SATURDAY</text></g></g>
  <!-- ô bán vé -->
  <g transform="translate(${X.booth} 0)"><rect x="-46" y="150" width="92" height="${FLOOR - 150}" fill="#BE123C" stroke="${L}" stroke-width="1.2"/>
    <rect x="-34" y="170" width="68" height="44" rx="4" fill="#BAE6FD" stroke="${L}"/><g transform="translate(0 196)">${headOnly('e085_seller', { s: 0.62, mood: 'joy' })}</g>
    <rect x="-40" y="150" width="80" height="16" rx="3" fill="#fff" stroke="${L}"/><text x="0" y="162" text-anchor="middle" ${NUN} font-size="11" fill="#BE123C">TICKETS</text>
    <rect x="-38" y="214" width="76" height="6" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/></g>`;
}

function fg() {
  const stage = `<rect x="-78" y="-40" width="156" height="78" rx="4" fill="#FDE68A"/>
    <path d="M-78 -40 H78 V-28 Q60 -18 40 -28 Q20 -18 0 -28 Q-20 -18 -40 -28 Q-60 -18 -78 -28Z" fill="#DC2626" stroke="${L}" stroke-width="0.8"/>
    <path d="M-78 -40 V38 L-60 38 Q-62 0 -52 -28Z M78 -40 V38 L60 38 Q62 0 52 -28Z" fill="#B91C1C" stroke="${L}" stroke-width="0.8"/>
    <rect x="-50" y="22" width="100" height="10" fill="#92400E"/>
    <g transform="translate(0 2)">${headOnly('en_lan_home', { s: 0.5, mood: 'joy' })}</g>
    <rect x="-24" y="12" width="48" height="8" fill="#1F2937"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${-23 + i * 6}" y="13" width="5" height="6" fill="#fff"/>`).join('')}
    ${[-40, -26, 26, 40].map((x, i) => `<g transform="translate(${x} ${36 - (i % 2) * 2})">${headOnly(['en_mum_home', 'en_dad_home', 'en_minh_home', 'en_grandma'][i], { s: 0.3 })}</g>`).join('')}
    <g transform="translate(0 -22)"><rect x="-30" y="-9" width="60" height="13" rx="6" fill="#fff" stroke="${L}" stroke-width="0.8"/><text x="0" y="1" text-anchor="middle" ${NUN} font-size="9" fill="#7C3AED">SATURDAY</text></g>`;
  const notes = [[-30, 0], [0, -8], [30, 2], [-14, -4], [16, -2]].map(([dx, dy], i) => `<g class="e085-nt" style="animation-delay:${i * 0.32}s"><g transform="translate(${X.kb + 40 + dx * 0.8} ${K - 30 + dy})">${NOTE(['#7C3AED', '#DB2777', '#2563EB', '#EA580C', '#16A34A'][i])}</g></g>`).join('');
  return `
  <!-- đàn phím trên giá (che tay đặt trên phím) -->
  <g transform="translate(${X.kb} ${K})">
    <path d="M-54 10 V${FLOOR - K} M54 10 V${FLOOR - K} M-60 ${FLOOR - K} H-48 M48 ${FLOOR - K} H60" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
    <rect x="-66" y="-6" width="132" height="16" rx="3" fill="#1F2937" stroke="${L}"/>
    ${Array.from({ length: 21 }, (_, i) => `<rect x="${-62 + i * 6}" y="-3" width="5.4" height="11" fill="#fff"/>`).join('')}
    ${Array.from({ length: 21 }, (_, i) => ([1, 2, 4, 5, 6].includes(i % 7) ? `<rect x="${-62 + i * 6 - 1.6}" y="-3" width="3.2" height="6.4" fill="#111827"/>` : '')).join('')}
    <!-- giá nhạc + quyển nhạc (bên phải) -->
    <path d="M56 -6 V-22" stroke="#334155" stroke-width="2"/>
    <g transform="translate(56 -34)"><rect x="-20" y="-12" width="40" height="26" rx="2" fill="#2563EB" stroke="${L}"/><rect x="-18" y="-10" width="36" height="22" fill="#fff" stroke="${L}" stroke-width="0.6"/>
      <path d="M0 -10 V12" stroke="${L}" stroke-width="0.8"/>${[-6, -1, 4].map((y) => `<path d="M-16 ${y} H-3 M3 ${y} H16" stroke="#94A3B8" stroke-width="0.8"/>`).join('')}
      <g class="e085-page"><path d="M0 -10 H18 V12 H0Z" fill="#F8FAFC" stroke="${L}" stroke-width="0.6"/>${[-6, -1, 4].map((y) => `<path d="M3 ${y} H16" stroke="#94A3B8" stroke-width="0.8"/>`).join('')}</g></g>
  </g>
  <g class="e085-music">${notes}</g>
  <!-- bàn máy may (che chân mẹ) -->
  <g transform="translate(${X.mum} 0)"><rect x="-58" y="${FLOOR - 62}" width="116" height="10" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
    <rect x="-52" y="${FLOOR - 52}" width="10" height="52" fill="#92400E" stroke="${L}"/><rect x="42" y="${FLOOR - 52}" width="10" height="52" fill="#92400E" stroke="${L}"/>
    <g transform="translate(-28 ${FLOOR - 62})"><path d="M-30 0 V-12 H-22 V-26 Q-22 -32 -16 -32 H24 Q30 -32 30 -26 V-16 H18 V0Z" fill="#F1F5F9" stroke="${L}" stroke-width="1.1"/>
      <path d="M-30 -12 H18" stroke="#94A3B8" stroke-width="1"/><circle cx="24" cy="-24" r="4" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/>
      <g class="e085-needle"><path d="M-26 -12 V-4" stroke="#475569" stroke-width="1.6"/></g>
      <path class="e085-cloth" d="M-44 0 Q-30 -4 -14 -1 L-12 0Z" fill="#F472B6" stroke="${L}" stroke-width="0.6"/></g></g>
  <rect class="e085-dark" x="0" y="0" width="${X.door2 + 80}" height="315" fill="#1E1B4B"/>
  ${thought(330, 104, 200, 116, stage, [262, 160], 'e085-th e085-th-show')}
  <!-- nhãn -->
  <g class="e085-lb e085-lb-years">${label(245, 64, 'for three years', '#7C3AED', 16)}</g>
  <g class="e085-lb e085-lb-eve">${label(490, 220, 'every evening', '#4338CA', 14)}</g>
  <g class="e085-lb e085-lb-tired">${label(X.lan, 120, 'tired fingers', '#DC2626', 14)}</g>
  <g class="e085-lb e085-lb-help">${label(X.minh + 20, 120, 'helping', '#EA580C', 15)}</g>
  <g class="e085-lb e085-lb-sleep">${label(X.kitty, 186, 'asleep', '#4338CA', 14)}</g>
  <g class="e085-lb e085-lb-howlong">${label(392, 56, 'How long?', '#DC2626', 15)}</g>
  <g class="e085-lb e085-lb-dress">${label(X.dress - 10, 126, 'a new dress', '#DB2777', 14)}</g>
  <g class="e085-lb e085-lb-hard">${label(X.mum + 120, 66, 'working hard', '#16A34A', 16)}</g>
  <g class="e085-lb e085-lb-tix">${label(X.booth + 30, 92, 'buy the tickets', '#BE123C', 14)}</g>`;
}

const CSS = `
.e085-lb { opacity: 0; transition: opacity .35s; }
${['years', 'eve', 'tired', 'help', 'sleep', 'howlong', 'dress', 'hard', 'tix'].map((k) => `.st-lb-${k} .e085-lb-${k}`).join(', ')} { opacity: 1; }
.e085-yr { opacity: 0; transform-box: fill-box; transform-origin: center; transform: scale(.4); transition: opacity .3s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-yr1 .e085-yr1, .st-yr2 .e085-yr2, .st-yr3 .e085-yr3 { opacity: 1; transform: none; }
.e085-th { opacity: 0; transition: opacity .35s; } .st-show .e085-th-show { opacity: 1; }
.e085-sat circle { transform-box: fill-box; transform-origin: center; }
.st-sat .e085-sat circle { animation: e085Pulse .5s ease-in-out 4 alternate; }
@keyframes e085Pulse { to { transform: scale(1.4); } }
.e085-sat { opacity: 0; transition: opacity .3s; } .st-sat .e085-sat { opacity: 1; }
.e085-tk { opacity: 0; transition: opacity .2s; } .st-ticks .e085-tk { opacity: 1; }
.e085-eve, .e085-moon { opacity: 0; transition: opacity .8s; } .st-eve .e085-eve { opacity: .75; } .st-eve .e085-moon { opacity: 1; }
.e085-dark { opacity: 0; transition: opacity .8s; } .st-night .e085-dark { opacity: .45; }
.e085-music { opacity: 0; transition: opacity .3s; } .st-music .e085-music { opacity: 1; }
.st-music .e085-nt { animation: e085Note 1.6s ease-out infinite; }
@keyframes e085Note { from { transform: translate(0, 6px); opacity: 0; } 25% { opacity: 1; } to { transform: translate(8px, -40px); opacity: 0; } }
.e085-page { transform-origin: 0 0; } .st-turn .e085-page { animation: e085Page .6s ease-in-out both; }
@keyframes e085Page { from { transform: scaleX(1); } to { transform: scaleX(-1); } }
.e085-mh, .e085-hh { transform-origin: 0 0; } .e085-hh { transform: rotate(240deg); } .e085-mh { transform: rotate(0deg); }
.st-midnight .e085-hh { transform: rotate(330deg); }
.st-spin .e085-mh { animation: e085Spin .6s linear infinite; } .st-spin .e085-hh { animation: e085Spin 7.2s linear infinite; }
@keyframes e085Spin { from { rotate: 0deg; } to { rotate: 360deg; } }
.e085-dress { clip-path: inset(0 0 100% 0); transition: clip-path 3s linear; } .st-dress .e085-dress { clip-path: inset(0 0 0 0); }
.st-sew .e085-needle { animation: e085Needle .12s linear infinite alternate; }
@keyframes e085Needle { to { transform: translateY(4px); } }
.st-sew .e085-cloth { animation: e085Cloth 1.2s linear infinite; }
@keyframes e085Cloth { from { transform: translateX(0); } to { transform: translateX(-6px); } }
.e085-door { transform-origin: ${X.door2 + 6}px 0; transition: transform .5s; } .st-door .e085-door { transform: scaleX(.12); }
/* tay chơi đàn, vẩy tay mỏi, lật trang, may */
.act-e085-play .pp-fowR { animation: e085KeyR .16s ease-in-out infinite alternate; }
.act-e085-play .pp-fowL { animation: e085KeyL .19s ease-in-out infinite alternate; }
@keyframes e085KeyR { from { transform: rotate(-6deg); } to { transform: rotate(6deg); } }
@keyframes e085KeyL { from { transform: rotate(6deg); } to { transform: rotate(-6deg); } }
.act-e085-shake .pp-fowR, .act-e085-shake .pp-fowL { animation: e085Shake .1s linear infinite alternate; }
@keyframes e085Shake { from { transform: rotate(-14deg); } to { transform: rotate(14deg); } }
.act-e085-sew .pp-fowR, .act-e085-sew .pp-fowL { animation: e085KeyR .3s ease-in-out infinite alternate; }
.es-cat.m-shut .dg-eye { animation: none; transform: scaleY(.12); }
@media (prefers-reduced-motion: reduce) {
  .st-music .e085-nt { animation-duration: 3s; } .act-e085-play .pp-fowR, .act-e085-play .pp-fowL { animation-duration: .5s; }
  .act-e085-shake .pp-fowR, .act-e085-shake .pp-fowL { animation-duration: .3s; } .st-sew .e085-needle { animation-duration: .4s; }
  .st-spin .e085-mh { animation-duration: 2s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
/** Một đoạn nhạc ngắn: các nốt (ding đổi cao độ). */
const TUNE = [1, 1.12, 1.26, 1.12, 1.33, 1.26, 1.5, 1.33];
async function tune(st, n = 6, gap = 260, from = 0) {
  for (let i = 0; i < n; i++) { st.sfx('ding', { vol: 0.32, rate: TUNE[(from + i) % TUNE.length] }); await st.wait(gap); }
}
/** Lan ngồi chơi đàn (nốt nhạc bay lên). */
const play = (st) => { st.pose('lan', 'e085_play'); st.act('lan', 'e085-play'); st.set('st-music'); };
const stopPlay = (st) => { st.act('lan', null); st.set('st-music', false); };

const BEATS = [
  { key: ['has been learning the piano', 'for three years'], icon: '🎹', label: 'three years', async play(st) {
    st.look(270);
    play(st);
    for (const y of [1, 2, 3]) {
      st.set(`st-yr${y}`); st.sfx('pop', { vol: 0.5, rate: 0.9 + y * 0.1 });
      await tune(st, 3, 240, y * 2);
    }
    st.set('st-lb-years'); st.sfx('ding', { vol: 0.4, rate: 1.5 });
    await st.wait(700);
  } },
  { key: ['play in a concert at the city theatre', 'practising every evening this month'], icon: '🎭', label: 'concert', async play(st) {
    st.set('st-lb-years', false);
    st.look(330);
    stopPlay(st); st.pose('lan', 'sitDesk'); st.mood('lan', 'joy');
    st.set('st-show'); st.sfx('pop', { vol: 0.5 });
    await st.wait(400);
    st.sfx('clap', { vol: 0.4 });
    await st.wait(1300);
    st.set('st-sat'); st.sfx('ding', { vol: 0.4 });
    await st.wait(900);
    st.set('st-show', false);
    st.set('st-eve'); st.set('st-lb-eve'); st.sfx('crickets', { vol: 0.3 });
    play(st); st.mood('lan', 'happy');
    st.set('st-ticks');
    for (let i = 0; i < 6; i++) { st.sfx('pencil', { vol: 0.35, rate: 1.3 }); await st.wait(400); }
    await st.wait(300);
  } },
  { key: ['Her fingers are tired', 'does not want to stop'], icon: '🖐️', label: 'tired fingers', async play(st) {
    st.set('st-lb-eve', false);
    st.look(300);
    await tune(st, 3, 300);
    stopPlay(st);
    st.pose('lan', 'e085_shake'); st.act('lan', 'e085-shake'); st.mood('lan', 'sad'); st.set('st-lb-tired');
    st.fx('drops', X.lan - 6, K - 80, { quiet: true }); st.sfx('drip', { vol: 0.6 });
    await st.wait(1200);
    st.act('lan', 'no'); st.pose('lan', 'sitDesk'); st.mood('lan', 'happy'); st.sfx('buzz-no', { vol: 0.3 });
    await st.wait(800);
    st.set('st-lb-tired', false);
    play(st);
    await tune(st, 5, 260, 2);
  } },
  { key: ['Minh has been helping her too'], icon: '🤝', label: 'Minh helps', async play(st) {
    st.look(330);
    play(st);
    st.show('minh', true);
    const music = tune(st, 6, 300, 1);
    await st.walk('minh', X.minh, { speed: 125, follow: false });
    st.face('minh', -1); st.pose('minh', 'wave'); st.act('minh', 'wave'); st.mood('minh', 'joy');
    st.set('st-lb-help'); st.sfx('pop', { vol: 0.5 });
    await music;
    await st.wait(400);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['turning the pages of her music book', 'clapping after every song'], icon: '👏', label: 'pages · clapping', async play(st) {
    st.set('st-lb-help', false);
    st.look(330);
    for (let r = 0; r < 2; r++) {
      stopPlay(st);
      st.pose('minh', 'e085_turn'); st.pose('lan', 'sitDesk');
      await st.wait(350);
      st.set('st-turn', false); await st.wait(30); st.set('st-turn'); st.sfx('page-turn', { vol: 0.8 });
      await st.wait(500);
      st.pose('minh', 'stand');
      play(st);
      await tune(st, 4, 230, r * 3);
      stopPlay(st); st.pose('lan', 'sitDesk'); st.mood('lan', 'joy');
      st.pose('minh', 'clap'); st.act('minh', 'clap'); st.mood('minh', 'joy'); st.sfx('clap', { vol: 0.7 });
      await st.wait(800);
      st.act('minh', null);
    }
    st.pose('minh', 'stand');
  } },
  { key: ['Last night', 'found Kitty asleep on the piano stool'], icon: '🐱', label: 'Kitty asleep', async play(st) {
    // cắt cảnh: tối qua, phòng đàn vắng, Kitty ngủ trên ghế đàn
    off(st, 'st-music', 'st-turn');
    st.set('st-night'); st.set('st-eve');
    st.show('minh', false);
    st.show('kitty', true); st.dog('kitty', 'sit'); st.mood('kitty', 'shut');
    st.place('lan', X.door1 - 10, FLOOR, -1); st.pose('lan', 'stand'); st.mood('lan', 'happy');
    st.look(400, { instant: true });
    st.sfx('crickets', { vol: 0.35 });
    st.fx('zzz', X.kitty + 10, FLOOR - 70);
    await st.walk('lan', X.kitty + 70, { speed: 110, follow: false });
    st.face('lan', -1); st.mood('lan', 'wow'); st.pose('lan', 'e085_hips');
    st.set('st-lb-sleep'); st.sfx('purr', { vol: 0.6 });
    st.fx('zzz', X.kitty + 10, FLOOR - 70, { quiet: true });
    await st.wait(1200);
  } },
  { key: ['How long have you been sleeping there'], icon: '⏰', label: 'How long?', async play(st) {
    st.set('st-lb-sleep', false);
    st.look(380);
    st.pose('lan', 'e085_hips'); st.mood('lan', 'joy');
    st.set('st-lb-howlong'); st.set('st-spin');
    const say = st.say('lan', 'How long?', 1800);
    await st.loop('tick', () => st.wait(2000), { vol: 0.7 });
    st.set('st-spin', false); st.set('st-midnight');
    st.fx('zzz', X.kitty + 10, FLOOR - 70);
    await say;
  } },
  { key: ['she asked, laughing'], icon: '😆', label: 'laughing', async play(st) {
    st.set('st-lb-howlong', false);
    st.look(380);
    st.pose('lan', 'clap'); st.act('lan', 'hop'); st.mood('lan', 'joy'); st.sfx('giggle', { vol: 0.7 });
    await st.wait(900);
    st.mood('kitty', 'happy'); st.dog('kitty', 'stand'); st.act('kitty', 'wag'); st.sfx('meow', { vol: 0.7 });
    await st.wait(1000);
    st.act('lan', null);
  } },
  { key: ['Mum has been making a new dress for the concert'], icon: '👗', label: 'a new dress', async play(st) {
    // ban ngày, phòng may
    off(st, 'st-night', 'st-eve', 'st-midnight');
    st.show('kitty', false);
    st.look(X.mum + 60);
    st.pose('mum', 'e085_sew'); st.act('mum', 'e085-sew'); st.set('st-sew'); st.set('st-dress');
    await st.loop('typing', () => st.wait(2400), { vol: 0.8 });
    st.act('mum', null); st.set('st-sew', false); st.pose('mum', 'sitDesk');
    st.set('st-lb-dress'); st.sfx('ding', { vol: 0.4 });
    st.place('lan', X.door1 + 20, FLOOR, 1); st.place('minh', X.door1 - 30, FLOOR, 1); st.show('minh', true);
    await Promise.all([st.walk('lan', X.dress - 70, { speed: 130, follow: false }), st.walk('minh', X.mum - 90, { speed: 130, follow: false })]);
    st.mood('lan', 'joy'); st.pose('lan', 'cheer'); st.mood('mum', 'joy');
    st.fx('hearts', X.dress, 150);
    await st.wait(900);
    st.pose('lan', 'stand');
  } },
  { key: ['We have all been working hard', 'Dad said'], icon: '💪', label: 'working hard', async play(st) {
    st.set('st-lb-dress', false);
    st.look(X.mum + 60);
    st.set('st-door'); st.sfx('door-open', { vol: 0.6 });
    st.show('dad', true);
    await st.walk('dad', X.dress + 34, { speed: 120, follow: false });
    st.set('st-door', false);
    st.face('dad', -1); st.pose('dad', 'open'); st.mood('dad', 'joy');
    const say = st.say('dad', 'We have all been working hard!', 2200);
    await st.wait(500);
    st.set('st-lb-hard'); st.sfx('pop', { vol: 0.5 });
    for (const id of ['minh', 'lan', 'mum']) { st.mood(id, 'joy'); }
    st.pose('minh', 'clap'); st.act('minh', 'clap'); st.pose('lan', 'clap'); st.act('lan', 'clap'); st.sfx('clap', { vol: 0.6 });
    await say;
    st.act('minh', null); st.act('lan', null);
  } },
  { key: ['we just need to buy the tickets'], icon: '🎟️', label: 'buy the tickets', async play(st) {
    st.set('st-lb-hard', false);
    st.look(X.mum + 60);
    st.pose('mum', 'stand');
    st.hold('dad', 'e085_wallet'); st.pose('dad', 'e085_wallet'); st.sfx('bag-on', { vol: 0.5 });
    await st.say('dad', 'Tickets!', 1000);
    // ra phố tới ô bán vé
    st.set('st-door'); st.sfx('door-open', { vol: 0.5 });
    st.pose('dad', 'stand');
    st.look(X.booth - 70, { dur: 3600 });
    await Promise.all([
      st.walk('dad', X.booth - 66, { speed: 130, follow: false }), st.walk('lan', X.booth - 116, { speed: 130, follow: false }),
      st.walk('minh', X.booth - 160, { speed: 130, follow: false }), st.walk('mum', X.booth - 210, { speed: 130, follow: false }),
    ]);
    st.pose('dad', 'give'); st.sfx('cash', { vol: 0.7 });
    st.set('st-lb-tix');
    await st.wait(400);
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(TICKETS, [X.booth, 196], [X.booth - 66, 170], { size: 30, dur: 500 });
    st.hold('dad', null); st.chest('dad', TICKETS); st.pose('dad', 'carry'); st.mood('dad', 'joy');
    st.pose('lan', 'cheer'); st.act('lan', 'jump'); st.mood('lan', 'joy'); st.mood('minh', 'joy'); st.sfx('cheer', { vol: 0.5 });
    await st.wait(1200);
    st.act('lan', null); st.pose('lan', 'stand');
  } },
];

export default {
  id: 'en085', worldW: W, floor: FLOOR, viewTop: 40, camStart: 30, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 4, 5, 8, 10],
  cast: [
    { id: 'kitty', kind: 'cat', x: X.kitty, y: FLOOR - 30, s: 0.95, face: -1 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: X.mum - 6, s: 0.95 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: X.door2 + 36, s: 0.95, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.lan, s: 1.08 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.door1 + 30, face: -1 },
  ],
  init(st) {
    st.show('kitty', false); st.show('minh', false); st.show('dad', false);
    st.pose('lan', 'e085_play'); st.pose('mum', 'sitDesk');
  },
};
