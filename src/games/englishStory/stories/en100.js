/**
 * Bài 100 "A Letter to My Future Self" (ôn tập: thì hiện tại hoàn thành, quá khứ, so…that, câu điều kiện loại 2, câu mệnh lệnh):
 * phòng của Minh ngày sinh nhật 12 tuổi, trái sang phải: cửa phòng (Lan vào) → bảng ghim "MY YEAR" (ảnh Sydney, lướt sóng, cúp)
 * → kệ nhỏ có ảnh ông bà + tạp chí → cửa sổ bóng bay → bàn học (bánh sinh nhật nến 12, đèn bàn, thùng rác) nơi Minh ngồi viết
 * → lá thư phóng to trên tường (mỗi câu thêm một dòng, cuối thư là ba điều cần nhớ và chữ ký) → giá vẽ.
 * Những điều Minh tự hỏi / nhớ lại / ước hiện trong bong bóng nghĩ (nhà ở đâu, hoạ sĩ hay bác sĩ, lười học toán, học chăm hơn, về quê).
 * Toạ độ cảnh: rộng 960, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, room, doorway, windowBox, table, label, thought, books, rug } from '../kit.js';

const FLOOR = 282;
const W = 960;
const X = { door: 60, cork: 225, shelf: 335, win: 380, desk: 530, minh: 490, letter: 680, easel: 860, bin: 445 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const HAND = 'font-family="Nunito, sans-serif" font-weight="800" font-style="italic"';
const INK = '#1E3A8A';

Object.assign(CAST, {
  e100_big: { adult: true, hair: 'spiky', top: 'shirt', shirt: '#FB923C', bottom: 'pants', bottomC: '#334155', shoe: '#44403C' },
});

// ── Đồ vật ─────────────────────────────────────────────────────────────────
const MAG = `<g transform="translate(0 -26) rotate(-4)"><rect x="-17" y="-22" width="34" height="44" rx="2" fill="#FDE047" stroke="${L}" stroke-width="1"/>
  <text x="0" y="-12" text-anchor="middle" ${NUN} font-size="7" fill="#B91C1C">KIDS ART</text>
  <rect x="-13" y="-8" width="26" height="24" fill="#fff" stroke="${L}" stroke-width="0.6"/>
  <g transform="translate(0 12) scale(0.32)"><ellipse cx="0" cy="-30" rx="26" ry="12" fill="#B7794A" stroke="${L}"/><circle cx="26" cy="-46" r="12" fill="#B7794A" stroke="${L}"/><path d="M18 -54 q-8 4 -6 16" stroke="#7A4B2A" stroke-width="6" fill="none"/><circle cx="30" cy="-48" r="2" fill="#000"/><path d="M-26 -34 q-12 -6 -12 -18" stroke="#B7794A" stroke-width="6" fill="none"/><path d="M-16 -20 V0 M16 -20 V0" stroke="#B7794A" stroke-width="6"/></g></g>`;
const BALL = `<circle r="7" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M-5 -3 l4 3 l-2 4 M3 -5 l-1 4 l4 2 M-3 4 l5 -1" stroke="#94A3B8" stroke-width="0.8" fill="none"/>`;
const ENVELOPE = `<rect x="-14" y="-9" width="28" height="18" rx="2" fill="#FEF3C7" stroke="${L}" stroke-width="0.9"/><path d="M-14 -9 L0 3 L14 -9" stroke="${L}" stroke-width="0.9" fill="none"/><path d="M0 4 q-4 -5 -1 -7 q1 0 1 2 q0 -2 1 -2 q3 2 -1 7Z" fill="#EF4444"/>`;
const PROPS = {
  e100_pencil: `<g transform="rotate(200)"><rect x="-1.8" y="-2" width="3.6" height="18" fill="#FACC15" stroke="${L}" stroke-width="0.7"/><path d="M-1.8 16 L0 21 L1.8 16Z" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/></g>`,
};
const POSES = {
  e100_sitThink: { R: [30, -150], L: [22, -40], dy: 20, head: 8 },
  e100_sitCheer: { R: [150, 172], L: [150, 172], dy: 20 },
  e100_sitSad: { R: [22, -40], L: [22, -40], dy: 20, head: 16 },
  e100_sitRaise: { R: [160, 178], L: [22, -40], dy: 20 },
  e100_toss: { R: [120, 150], L: [10, 4], head: -6 },
  e100_tease: { R: [150, 240], L: [150, 240], head: -8 },
  e100_paint: { R: [96, 120], L: [10, 4], head: -4 },
};

// ── Bong bóng nghĩ (gốc ở tâm bong bóng, khoảng ±80 × ±30) ─────────────────────────────
const head = (who, x, y, s, mood = 'happy') => `<g transform="translate(${x} ${y})">${headOnly(who, { s, mood })}</g>`;
const THINK = {
  where: `<g transform="translate(-52 18)"><rect x="-14" y="-46" width="28" height="46" fill="#93C5FD" stroke="${L}"/>${[0, 1, 2].map((r) => `<rect x="-9" y="${-40 + r * 13}" width="6" height="7" fill="#FEF9C3"/><rect x="3" y="${-40 + r * 13}" width="6" height="7" fill="#FEF9C3"/>`).join('')}</g>
    <text x="0" y="8" text-anchor="middle" ${NUN} font-size="28" fill="#EA580C">?</text>
    <g transform="translate(50 18)"><path d="M-18 -18 L0 -34 L18 -18Z" fill="#EF4444" stroke="${L}"/><rect x="-14" y="-18" width="28" height="18" fill="#FDE68A" stroke="${L}"/><rect x="-4" y="-12" width="8" height="12" fill="#92400E"/>
      <path d="M-30 0 H30" stroke="#38BDF8" stroke-width="4"/></g>`,
  job: `${head('e100_big', -52, -4, 0.68, 'joy')}<ellipse cx="-55" cy="-21" rx="16" ry="5.4" fill="#DC2626" stroke="${L}" stroke-width="0.8"/><circle cx="-55" cy="-26" r="2" fill="#DC2626"/>
    <g transform="translate(-30 20)"><path d="M-10 0 Q-12 -12 2 -12 Q14 -12 12 -2 Q10 6 2 4 Q-2 2 -4 6 Q-8 8 -10 0Z" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>${[['#EF4444', -4, -7], ['#3B82F6', 3, -8], ['#22C55E', 8, -3]].map(([c, x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="${c}"/>`).join('')}</g>
    <text x="0" y="6" text-anchor="middle" ${NUN} font-size="14" fill="#7C3AED">or</text>
    ${head('e100_big', 52, -4, 0.68, 'happy')}<path d="M40 16 Q52 30 64 16" stroke="#475569" stroke-width="2" fill="none"/><circle cx="52" cy="28" r="3" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/>
    <path d="M38 12 L46 22 L52 14 L58 22 L66 12" fill="#fff" stroke="${L}" stroke-width="0.9"/>`,
  lazy: `<g transform="translate(-18 14)"><rect x="-46" y="-10" width="80" height="18" rx="6" fill="#A78BFA" stroke="${L}"/><rect x="-50" y="-22" width="12" height="30" rx="5" fill="#8B5CF6" stroke="${L}"/>
      <g transform="translate(-30 -16) rotate(-80)">${headOnly('en_minh_home', { s: 0.42, mood: 'shut' })}</g><rect x="-16" y="-16" width="40" height="10" rx="4" fill="#FB923C" stroke="${L}" stroke-width="0.7"/></g>
    <text x="10" y="-14" ${NUN} font-size="12" fill="#6366F1">z z</text>
    <g transform="translate(52 0) rotate(8)"><rect x="-17" y="-22" width="34" height="42" rx="2" fill="#fff" stroke="${L}"/><text x="0" y="-10" text-anchor="middle" ${NUN} font-size="7" fill="${INK}">MATHS</text>
      <text x="0" y="12" text-anchor="middle" ${NUN} font-size="14" fill="#DC2626">3/10</text></g>`,
  study: `<g transform="translate(-30 22)"><rect x="-40" y="-4" width="80" height="6" fill="#B45309" stroke="${L}"/><g transform="translate(-36 -4)">${books(0, 0, 4)}</g>
      <path d="M26 -4 V-24 L36 -32" stroke="#475569" stroke-width="2" fill="none"/><path d="M30 -36 L44 -28 L38 -20Z" fill="#FACC15" stroke="${L}" stroke-width="0.7"/></g>
    ${head('en_minh_home', -14, -6, 0.42, 'joy')}
    <g transform="translate(52 0) rotate(-6)"><rect x="-17" y="-22" width="34" height="42" rx="2" fill="#fff" stroke="${L}"/><text x="0" y="-10" text-anchor="middle" ${NUN} font-size="7" fill="${INK}">MATHS</text>
      <text x="0" y="12" text-anchor="middle" ${NUN} font-size="13" fill="#16A34A">10/10</text></g>`,
  gran: `<g transform="translate(-54 22)"><path d="M-22 -22 L0 -40 L22 -22Z" fill="#B91C1C" stroke="${L}"/><rect x="-18" y="-22" width="36" height="22" fill="#FEF3C7" stroke="${L}"/><rect x="-5" y="-14" width="10" height="14" fill="#92400E"/></g>
    ${head('en_grandma', -4, -2, 0.42, 'joy')}${head('en_grandpa', 30, -4, 0.42, 'joy')}
    <g transform="translate(64 16)"><rect x="-18" y="-12" width="34" height="16" rx="4" fill="#FACC15" stroke="${L}" stroke-width="0.8"/><rect x="-14" y="-9" width="8" height="6" fill="#BAE6FD"/><rect x="-3" y="-9" width="8" height="6" fill="#BAE6FD"/><circle cx="-10" cy="5" r="3" fill="#1F2937"/><circle cx="8" cy="5" r="3" fill="#1F2937"/></g>`,
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const photo = (x, y, r, inner, cls) => `<g class="${cls}"><g transform="translate(${x} ${y}) rotate(${r})"><rect x="-22" y="-17" width="44" height="34" fill="#fff" stroke="${L}" stroke-width="0.9"/><rect x="-19" y="-14" width="38" height="24" fill="#BAE6FD"/>${inner}<circle cx="0" cy="-15" r="2.4" fill="#EF4444" stroke="${L}" stroke-width="0.5"/></g></g>`;
const OPERA = `<path d="M-19 10 H19" stroke="#0369A1" stroke-width="4"/><path d="M-14 8 Q-12 -6 -2 -10 Q-6 0 -4 8Z M-4 8 Q0 -10 10 -10 Q4 0 6 8Z M6 8 Q10 -4 16 -4 Q14 2 14 8Z" fill="#fff" stroke="${L}" stroke-width="0.6"/>`;
const SURF = `<path d="M-19 4 Q-8 -10 4 -2 Q12 4 19 -2 V10 H-19Z" fill="#38BDF8"/><path d="M-12 2 L10 -6" stroke="#F97316" stroke-width="3.4" stroke-linecap="round"/><circle cx="0" cy="-10" r="3" fill="#FCD9B6" stroke="${L}" stroke-width="0.5"/><path d="M0 -7 V-2" stroke="#FB923C" stroke-width="2.4"/>`;
const CUP = `<path d="M-8 -10 H8 Q8 2 0 4 Q-8 2 -8 -10Z" fill="#FACC15" stroke="${L}" stroke-width="0.7"/><path d="M-8 -8 q-5 0 -4 5 q1 3 4 3 M8 -8 q5 0 4 5 q-1 3 -4 3" stroke="#CA8A04" stroke-width="1.2" fill="none"/><rect x="-5" y="4" width="10" height="4" fill="#A16207"/>`;

function bg() {
  const lines = [88, 99, 110, 121, 132].map((y, i) => `<g class="e100-ln e100-ln${i + 1}"><path d="M${X.letter - 64} ${y} q6 -4 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" stroke="#64748B" stroke-width="1.3" fill="none"/></g>`).join('');
  const three = [['1', 'Be kind to Lan', '♥', '#DB2777'], ['2', 'Visit Grandma + Grandpa', '⌂', '#B45309'], ['3', 'Never stop drawing', '✎', '#2563EB']].map(([n, t, ic, c], i) => `
    <g class="e100-num e100-n${i + 1}"><text x="${X.letter - 66}" y="${152 + i * 15}" ${NUN} font-size="11" fill="#EA580C">${n}.</text></g>
    <g class="e100-tx e100-t${i + 1}"><text x="${X.letter - 54}" y="${152 + i * 15}" ${HAND} font-size="9.5" fill="${INK}">${t} <tspan fill="${c}" font-size="11">${ic}</tspan></text></g>`).join('');
  return `
  ${room(0, W, FLOOR, '#FEF9C3', '#D9A066')}
  <!-- cửa phòng -->
  <rect x="${X.door - 32}" y="${FLOOR - 136}" width="64" height="136" fill="#7C2D12" stroke="${L}"/>
  <g class="e100-door"><rect x="${X.door - 30}" y="${FLOOR - 134}" width="60" height="134" fill="#B45309" stroke="${L}"/><circle cx="${X.door + 20}" cy="${FLOOR - 66}" r="3" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/>
    <rect x="${X.door - 20}" y="${FLOOR - 120}" width="40" height="40" rx="3" fill="none" stroke="#92400E" stroke-width="1.4"/><text x="${X.door}" y="${FLOOR - 96}" text-anchor="middle" ${NUN} font-size="10" fill="#FDE68A">MINH</text></g>
  <!-- bảng ghim -->
  <rect x="${X.cork - 78}" y="62" width="156" height="112" rx="4" fill="#C08B5C" stroke="${L}" stroke-width="1.4"/><rect x="${X.cork - 72}" y="68" width="144" height="100" fill="#E0B07D"/>
  <g class="e100-year"><rect x="${X.cork - 34}" y="72" width="68" height="16" rx="5" fill="#fff" stroke="${L}" stroke-width="0.8"/><text x="${X.cork}" y="84" text-anchor="middle" ${NUN} font-size="11" fill="#EA580C">MY YEAR</text></g>
  ${photo(X.cork - 46, 122, -6, OPERA, 'e100-ph e100-ph1')}${photo(X.cork, 136, 4, SURF, 'e100-ph e100-ph2')}${photo(X.cork + 46, 120, -3, `<g transform="translate(0 2)">${CUP}</g>`, 'e100-ph e100-ph3')}
  <!-- kệ: ảnh ông bà, tạp chí -->
  <rect x="${X.shelf - 34}" y="196" width="68" height="6" fill="#A16207" stroke="${L}"/>
  <g transform="translate(${X.shelf - 12} 196)"><g class="e100-gframe"><rect x="-17" y="-34" width="34" height="34" rx="2" fill="#FDE68A" stroke="${L}"/><rect x="-14" y="-31" width="28" height="28" fill="#DCFCE7"/>
    <g transform="translate(-6 -15)">${headOnly('en_grandma', { s: 0.3, mood: 'joy' })}</g><g transform="translate(7 -16)">${headOnly('en_grandpa', { s: 0.3, mood: 'joy' })}</g></g></g>
  <g class="e100-shmag"><g transform="translate(${X.shelf + 20} 196) rotate(-6)"><rect x="-10" y="-26" width="20" height="26" rx="1" fill="#FDE047" stroke="${L}" stroke-width="0.8"/><rect x="-7" y="-18" width="14" height="12" fill="#fff" stroke="${L}" stroke-width="0.5"/></g></g>
  <!-- cửa sổ + bóng bay -->
  ${windowBox(X.win, 60, 90, 84)}
  ${[['#F472B6', X.win + 6, 82], ['#60A5FA', X.win + 26, 70], ['#FACC15', X.win + 46, 86]].map(([c, x, y]) => `<g class="e100-balloon" style="transform-origin:${x}px ${y + 50}px"><path d="M${x} ${y + 15} Q${x + 6} ${y + 34} ${x + 2} ${y + 54}" stroke="#94A3B8" stroke-width="0.8" fill="none"/><ellipse cx="${x}" cy="${y}" rx="11" ry="14" fill="${c}" stroke="${L}" stroke-width="0.8"/></g>`).join('')}
  <g class="e100-b12"><g transform="translate(${X.win + 74} 98)"><text x="0" y="0" text-anchor="middle" ${NUN} font-size="34" fill="#F59E0B" stroke="${L}" stroke-width="1">12</text></g></g>
  <!-- thùng rác -->
  <g transform="translate(${X.bin} ${FLOOR})"><path d="M-12 0 L-14 -26 H14 L12 0Z" fill="#94A3B8" stroke="${L}"/><path d="M-10 -20 V-4 M0 -20 V-4 M10 -20 V-4" stroke="#64748B"/>
    <g class="e100-ballIn"><g transform="translate(-2 -26)">${BALL}</g></g></g>
  <!-- lá thư phóng to trên tường -->
  <g transform="translate(${X.letter} 0)"><rect x="-82" y="44" width="164" height="166" rx="3" fill="#000" opacity="0.08"/></g>
  <rect x="${X.letter - 80}" y="42" width="160" height="164" rx="3" fill="#FFFDF5" stroke="${L}" stroke-width="1.2"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `<path d="M${X.letter - 72} ${80 + i * 12} H${X.letter + 72}" stroke="#DBEAFE" stroke-width="0.8"/>`).join('')}
  <circle cx="${X.letter}" cy="46" r="3.4" fill="#EF4444" stroke="${L}" stroke-width="0.6"/>
  <g class="e100-dear"><text x="${X.letter - 68}" y="70" ${HAND} font-size="14" fill="${INK}">Dear Future Minh,</text></g>
  ${lines}${three}
  <g class="e100-sign"><text x="${X.letter + 70}" y="200" text-anchor="end" ${HAND} font-size="11" fill="${INK}">Love, Minh, aged 12 <tspan fill="#EF4444">♥</tspan></text></g>
  <!-- giá vẽ -->
  <g transform="translate(${X.easel} 0)"><path d="M-30 ${FLOOR} L-6 110 M30 ${FLOOR} L6 110 M0 116 V${FLOOR}" stroke="#92400E" stroke-width="4"/>
    <rect x="-40" y="120" width="80" height="70" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-44" y="190" width="88" height="6" fill="#A16207" stroke="${L}"/>
    <g class="e100-art"><g transform="translate(0 182) scale(0.85)">
      <ellipse cx="-6" cy="-30" rx="26" ry="12" fill="#B7794A" stroke="${L}"/><circle cx="22" cy="-46" r="12" fill="#B7794A" stroke="${L}"/><path d="M14 -54 q-8 4 -6 16" stroke="#7A4B2A" stroke-width="6" fill="none"/>
      <circle cx="26" cy="-48" r="2" fill="#000"/><ellipse cx="32" cy="-43" rx="3" ry="2" fill="#000"/><path d="M-32 -34 q-12 -6 -12 -18" stroke="#B7794A" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M-20 -20 V0 M10 -20 V0" stroke="#B7794A" stroke-width="6" stroke-linecap="round"/><path d="M-40 4 H40" stroke="#22C55E" stroke-width="3"/><circle cx="30" cy="-66" r="7" fill="#FDE047"/></g></g></g>
  ${rug(X.minh + 20, FLOOR, 150, '#93C5FD')}
  <!-- ghế của Minh -->
  <g transform="translate(${X.minh - 6} ${FLOOR})"><rect x="-22" y="-96" width="8" height="96" rx="3" fill="#2563EB" stroke="${L}"/><rect x="-22" y="-40" width="46" height="8" rx="3" fill="#3B82F6" stroke="${L}"/><path d="M18 -32 V0" stroke="#1E40AF" stroke-width="5"/></g>`;
}

function fg() {
  const bub = (k) => thought(X.minh - 64, 92, 196, 86, THINK[k], [X.minh - 8, 166], `e100-th e100-th-${k}`);
  return `
  <!-- bàn học (che chân người ngồi) + bánh sinh nhật + đèn -->
  ${table(X.desk, FLOOR - 60, 120, FLOOR, '#B45309')}
  <g transform="translate(${X.desk + 18} ${FLOOR - 60})"><rect x="-18" y="-16" width="36" height="16" rx="3" fill="#FBCFE8" stroke="${L}"/><path d="M-18 -10 q6 4 12 0 t12 0 t12 0" stroke="#fff" stroke-width="2" fill="none"/>
    <rect x="-16" y="-18" width="32" height="4" rx="2" fill="#F9A8D4" stroke="${L}" stroke-width="0.6"/>
    ${[-10, 0, 10].map((dx) => `<rect x="${dx - 1.4}" y="-28" width="2.8" height="10" fill="#60A5FA" stroke="${L}" stroke-width="0.4"/><g class="e100-flame"><path d="M${dx} -36 q3 3 0 7 q-3 -4 0 -7Z" fill="#F97316"/></g>`).join('')}
    <text x="0" y="-4" text-anchor="middle" ${NUN} font-size="8" fill="#BE185D">12</text></g>
  <g transform="translate(${X.desk + 50} ${FLOOR - 60}) scale(-1 1)"><path d="M0 0 V-28 L12 -38" stroke="#475569" stroke-width="2.4" fill="none"/><path d="M8 -44 L24 -34 L16 -26Z" fill="#22C55E" stroke="${L}" stroke-width="0.8"/><ellipse cx="0" cy="0" rx="8" ry="2.4" fill="#475569"/></g>
  <g transform="translate(${X.desk - 20} ${FLOOR - 61})"><rect x="-14" y="-3" width="28" height="4" fill="#fff" stroke="${L}" stroke-width="0.6"/></g>
  ${Object.keys(THINK).map(bub).join('')}
  <!-- nhãn -->
  <g class="e100-lb e100-lb-bday">${label(X.win + 60, 172, 'my twelfth birthday', '#DB2777', 13)}</g>
  <g class="e100-lb e100-lb-where">${label(X.minh - 64, 154, 'where you are living', '#0369A1', 12)}</g>
  <g class="e100-lb e100-lb-job">${label(X.minh - 64, 154, 'an artist or a doctor', '#7C3AED', 12)}</g>
  <g class="e100-lb e100-lb-amazing">${label(X.cork, 196, 'amazing!', '#EA580C', 16)}</g>
  <g class="e100-lb e100-lb-mag">${label(X.shelf + 10, 108, 'printed in a magazine', '#B91C1C', 12)}</g>
  <g class="e100-lb e100-lb-mistake">${label(X.bin + 10, 302, 'mistakes', '#DC2626', 14)}</g>
  <g class="e100-lb e100-lb-lazy">${label(X.minh - 64, 154, 'so lazy in maths', '#6366F1', 12)}</g>
  <g class="e100-lb e100-lb-study">${label(X.minh - 64, 154, 'study harder', '#16A34A', 12)}</g>
  <g class="e100-lb e100-lb-kind">${label(300, 110, 'be kind', '#DB2777', 14)}</g>
  <g class="e100-lb e100-lb-gran">${label(X.minh - 64, 154, 'visit often', '#B45309', 12)}</g>
  <g class="e100-lb e100-lb-draw">${label(X.easel - 6, 100, 'never stop drawing', '#2563EB', 12)}</g>
  <g class="e100-env"><g transform="translate(${X.letter + 54} 222)">${ENVELOPE}</g></g>`;
}

const LB = ['bday', 'where', 'job', 'amazing', 'mag', 'mistake', 'lazy', 'study', 'kind', 'gran', 'draw'];
const CSS = `
.e100-lb, .e100-th { opacity: 0; transition: opacity .35s; }
${LB.map((k) => `.st-lb-${k} .e100-lb-${k}`).join(', ')}, ${Object.keys(THINK).map((k) => `.st-th-${k} .e100-th-${k}`).join(', ')} { opacity: 1; }
.e100-dear, .e100-ln, .e100-tx, .e100-sign { clip-path: inset(0 100% 0 0); }
.st-dear .e100-dear, ${[1, 2, 3, 4, 5].map((k) => `.st-ln${k} .e100-ln${k}`).join(', ')}, ${[1, 2, 3].map((k) => `.st-t${k} .e100-t${k}`).join(', ')}, .st-sign .e100-sign { clip-path: inset(0 0 0 0); transition: clip-path 1.2s linear; }
.e100-num { opacity: 0; transition: opacity .25s; }
${[1, 2, 3].map((k) => `.st-n${k} .e100-n${k}`).join(', ')} { opacity: 1; }
.e100-flame { opacity: 0; transition: opacity .2s; } .st-candle .e100-flame { opacity: 1; animation: e100Flick .3s ease-in-out infinite alternate; }
@keyframes e100Flick { to { transform: translateY(-.6px) scaleY(1.1); } }
.e100-flame { transform-box: fill-box; transform-origin: 50% 100%; }
.e100-b12 { opacity: 0; transform: translateY(16px); transition: opacity .3s, transform .5s cubic-bezier(.3,1.6,.6,1); } .st-candle .e100-b12 { opacity: 1; transform: none; }
.e100-balloon { animation: e100Sway 3s ease-in-out infinite alternate; }
@keyframes e100Sway { from { transform: rotate(-3deg); } to { transform: rotate(3deg); } }
.e100-year { transition: transform .4s; transform-box: fill-box; transform-origin: center; }
.st-amazing .e100-year { animation: e100Pulse .45s ease-in-out 3 alternate; }
@keyframes e100Pulse { to { transform: scale(1.18); } }
.e100-ph { opacity: 0; transform: translateY(-10px); transition: opacity .25s, transform .4s cubic-bezier(.3,1.6,.6,1); }
${[1, 2, 3].map((k) => `.st-ph${k} .e100-ph${k}`).join(', ')} { opacity: 1; transform: none; }
.e100-shmag { transition: opacity .2s; } .st-magtaken .e100-shmag { opacity: 0; }
.e100-ballIn { opacity: 0; transition: opacity .2s; } .st-binned .e100-ballIn { opacity: 1; }
.e100-gframe { transform-box: fill-box; transform-origin: 50% 100%; }
.st-gran .e100-gframe { animation: e100Pulse .45s ease-in-out 4 alternate; }
.e100-door { transform-origin: ${X.door - 30}px 0; transition: transform .45s ease-out; } .st-door .e100-door { transform: scaleX(.15); }
.e100-art { clip-path: inset(100% 0 0 0); } .st-art .e100-art { clip-path: inset(0 0 0 0); transition: clip-path 2s linear; }
.e100-env { opacity: 0; transform: translateY(-20px); transition: opacity .3s, transform .6s cubic-bezier(.3,1.4,.6,1); } .st-env .e100-env { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .e100-balloon { animation-duration: 6s; } .st-candle .e100-flame { animation-duration: .8s; } }
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
/** Minh viết tiếp thư (ngồi, bút chạy) trong ms. */
async function write(st, ms = 1000) {
  st.face('minh', 1); st.hold('minh', 'e100_pencil'); st.pose('minh', 'write'); st.act('minh', 'write');
  await st.loop('pencil', () => st.wait(ms), { vol: 0.8 });
  st.act('minh', null);
}
/** Bong bóng nghĩ: tắt mọi bong bóng khác, bật bong bóng k. */
const think = (st, k) => { for (const t of Object.keys(THINK)) st.set(`st-th-${t}`, t === k); };

const BEATS = [
  { key: ['Dear Future Minh'], icon: '✉️', label: 'Dear Future Minh', async play(st) {
    st.look(590);
    st.set('st-dear');
    await write(st, 1300);
    st.act('lucky', 'wag'); st.mood('minh', 'joy');
    await st.wait(300);
  } },
  { key: ['writing this letter', 'on my twelfth birthday'], icon: '🎂', label: 'twelfth birthday', async play(st) {
    st.look(590);
    st.set('st-ln1');
    await write(st, 900);
    st.pose('minh', 'sitDesk');
    st.set('st-candle'); st.sfx('click', { vol: 0.6 });
    await st.wait(300);
    st.sfx('pop', { vol: 0.5 }); st.set('st-lb-bday'); st.mood('minh', 'joy');
    await st.wait(1100);
  } },
  { key: ['I wonder where you are living now'], icon: '🏙️', label: 'where you are living', async play(st) {
    off(st, 'st-lb-bday');
    st.look(500);
    st.hold('minh', null); st.pose('minh', 'e100_sitThink'); st.mood('minh', 'happy');
    think(st, 'where'); st.sfx('pop', { vol: 0.5 });
    await st.wait(400);
    st.set('st-lb-where'); st.set('st-ln2');
    await st.wait(1500);
  } },
  { key: ['Have you become an artist', 'a doctor like Dad'], icon: '🎨', label: 'artist or doctor?', async play(st) {
    st.set('st-lb-where', false);
    st.look(500);
    think(st, 'job'); st.sfx('pop', { vol: 0.5 });
    st.pose('minh', 'e100_sitThink'); st.act('minh', 'nod');
    await st.wait(900);
    st.set('st-lb-job'); st.sfx('ding', { vol: 0.4 }); st.set('st-ln3');
    await st.wait(1200);
    st.act('minh', null);
  } },
  { key: ['This year has been amazing'], icon: '🤩', label: 'amazing!', async play(st) {
    off(st, 'st-lb-job'); think(st, null);
    st.look(330);
    st.pose('minh', 'stand'); st.hold('minh', null);
    await st.walk('minh', X.cork + 110, { speed: 130, follow: false });
    st.face('minh', -1); st.pose('minh', 'cheer'); st.mood('minh', 'joy'); st.act('minh', 'jump');
    st.set('st-amazing'); st.set('st-lb-amazing'); st.sfx('cheer', { vol: 0.4 });
    await st.wait(1300);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['I visited Sydney', 'I learned to surf', 'won a prize at the science fair'], icon: '🏆', label: 'Sydney · surf · prize', async play(st) {
    st.set('st-lb-amazing', false);
    st.look(300);
    st.pose('minh', 'point');
    st.set('st-ph1'); st.sfx('plane', { vol: 0.5 });
    await st.wait(1000);
    st.set('st-ph2'); st.sfx('splash', { vol: 0.5 });
    await st.wait(1000);
    st.set('st-ph3'); st.sfx('clap', { vol: 0.5 }); st.mood('minh', 'joy');
    await st.wait(900);
    st.pose('minh', 'stand');
  } },
  { key: ['My drawing of Lucky', 'printed in a magazine'], icon: '📰', label: 'in a magazine', async play(st) {
    st.look(380);
    await st.walk('minh', X.shelf + 50, { speed: 120, follow: false });
    st.face('minh', -1); st.pose('minh', 'reach');
    await st.wait(300);
    st.set('st-magtaken'); st.chest('minh', MAG); st.pose('minh', 'carry'); st.face('minh', 1); st.sfx('page-turn', { vol: 0.7 });
    st.set('st-lb-mag'); st.mood('minh', 'joy');
    st.dog('lucky', 'stand'); st.mood('lucky', 'joy');
    await st.walk('lucky', X.shelf + 110, { speed: 220, follow: false });
    st.face('lucky', -1); st.act('lucky', 'jump'); st.sfx('dog-bark', { vol: 0.8 });
    await st.wait(1100);
    st.act('lucky', null);
  } },
  { key: ['I have made mistakes too'], icon: '🗑️', label: 'mistakes', async play(st) {
    st.set('st-lb-mag', false);
    st.look(440);
    st.chest('minh', null); st.pose('minh', 'stand'); st.mood('minh', 'sad');
    st.dog('lucky', 'sit');
    st.chest('minh', `<g transform="translate(0 -22)">${BALL}</g>`); st.pose('minh', 'carry'); st.sfx('crunch', { vol: 0.6 });
    await st.wait(500);
    st.chest('minh', null); st.pose('minh', 'e100_toss'); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(BALL, [X.shelf + 64, 200], [X.bin - 2, FLOOR - 28], { size: 16, dur: 500 });
    st.set('st-binned'); st.sfx('bump', { vol: 0.6 }); st.set('st-lb-mistake');
    st.pose('minh', 'sad');
    await st.wait(1100);
  } },
  { key: ['so lazy in maths', 'I failed a test'], icon: '😴', label: 'failed a test', async play(st) {
    st.set('st-lb-mistake', false);
    st.look(500);
    st.pose('minh', 'stand');
    await st.walk('minh', X.minh, { speed: 130, follow: false });
    st.face('minh', 1); st.pose('minh', 'e100_sitSad'); st.mood('minh', 'sad');
    think(st, 'lazy'); st.fx('zzz', X.minh - 60, 70);
    await st.wait(800);
    st.set('st-lb-lazy'); st.sfx('buzz-no', { vol: 0.4 }); st.set('st-ln4');
    await st.wait(1300);
  } },
  { key: ['If I could change one thing', 'I would study harder'], icon: '📚', label: 'study harder', async play(st) {
    st.set('st-lb-lazy', false);
    st.look(500);
    think(st, 'study'); st.sfx('page-turn', { vol: 0.6 });
    st.pose('minh', 'e100_sitThink'); st.mood('minh', 'happy');
    await st.wait(900);
    st.set('st-lb-study'); st.sfx('ding', { vol: 0.5 }); st.mood('minh', 'joy'); st.act('minh', 'nod'); st.set('st-ln5');
    await st.wait(1200);
    st.act('minh', null);
  } },
  { key: ['Please remember three things'], icon: '3️⃣', label: 'three things', async play(st) {
    off(st, 'st-lb-study'); think(st, null);
    st.look(560);
    st.face('minh', 1); st.hold('minh', 'e100_pencil'); st.pose('minh', 'write'); st.act('minh', 'write');
    for (let k = 1; k <= 3; k++) { st.set(`st-n${k}`); st.sfx('ding', { vol: 0.4, rate: 0.9 + k * 0.12 }); await st.wait(550); }
    st.act('minh', null); st.hold('minh', null); st.pose('minh', 'e100_sitRaise'); st.mood('minh', 'joy');
    await st.wait(900);
  } },
  { key: ['Be kind to Lan', 'even when she teases you'], icon: '💗', label: 'be kind to Lan', async play(st) {
    st.look(330);
    st.pose('minh', 'sitDesk');
    st.set('st-door'); st.sfx('door-open', { vol: 0.6 }); st.show('lan', true);
    await st.walk('lan', 300, { speed: 140, follow: false });
    st.set('st-door', false);
    st.pose('lan', 'e100_tease'); st.act('lan', 'no'); st.mood('lan', 'joy'); st.sfx('giggle', { vol: 0.6 });
    await st.say('lan', 'Slow coach!', 1100);
    st.act('lan', null);
    await st.walk('minh', 380, { speed: 120, follow: false });
    st.face('minh', -1); st.pose('minh', 'give'); st.mood('minh', 'joy'); st.set('st-lb-kind');
    st.fx('hearts', 340, 160); st.pose('lan', 'clap'); st.mood('lan', 'joy');
    st.set('st-t1');
    await st.wait(1000);
    st.pose('lan', 'stand'); st.pose('minh', 'stand');
  } },
  { key: ['Visit Grandma and Grandpa often'], icon: '👵', label: 'Grandma and Grandpa', async play(st) {
    st.set('st-lb-kind', false);
    st.look(420);
    st.face('minh', -1); st.pose('minh', 'point');
    st.set('st-gran'); st.sfx('ding', { vol: 0.4 });
    await st.wait(500);
    think(st, 'gran'); st.sfx('bus', { vol: 0.5 }); st.set('st-lb-gran'); st.set('st-t2');
    st.mood('minh', 'joy'); st.face('lan', 1); st.mood('lan', 'joy');
    await st.wait(1600);
    st.pose('minh', 'stand');
  } },
  { key: ['never stop drawing'], icon: '🖌️', label: 'never stop drawing', async play(st) {
    off(st, 'st-lb-gran', 'st-gran'); think(st, null);
    st.look(760);
    st.set('st-t3');
    await st.walk('minh', X.easel - 54, { speed: 140, lead: -40 });
    st.face('minh', 1); st.hold('minh', 'paintbrush'); st.pose('minh', 'e100_paint'); st.act('minh', 'paint');
    st.set('st-art'); st.set('st-lb-draw');
    await st.loop('paint', () => st.wait(1800), { vol: 0.8 });
    st.act('minh', null); st.mood('minh', 'joy');
    st.dog('lucky', 'sit'); st.act('lucky', 'wag');
    await st.wait(400);
  } },
  { key: ['Love', 'Minh, aged 12'], icon: '💌', label: 'Love, Minh', async play(st) {
    st.set('st-lb-draw', false);
    st.look(640);
    st.hold('minh', null); st.pose('minh', 'stand');
    await st.walk('minh', X.letter - 104, { speed: 140, follow: false });
    st.face('minh', 1); st.hold('minh', 'e100_pencil'); st.pose('minh', 'pointUp'); st.act('minh', 'point');
    st.set('st-sign');
    await st.loop('pencil', () => st.wait(1200), { vol: 0.8 });
    st.act('minh', null); st.hold('minh', null);
    st.set('st-env'); st.sfx('page-turn', { vol: 0.6 });
    st.pose('minh', 'cheer'); st.mood('minh', 'joy');
    await st.wait(300);
    st.fx('hearts', X.letter + 50, 200);
    await st.wait(1000);
  } },
];

export default {
  id: 'en100', worldW: W, floor: FLOOR, viewTop: 40, camStart: 316, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [1, 3, 5, 6, 8, 13],
  cast: [
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.door, s: 1.08, face: 1 },
    { id: 'lucky', kind: 'dog', x: X.desk + 110, s: 0.85, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.minh, face: 1 },
  ],
  init(st) {
    st.show('lan', false);
    st.dog('lucky', 'sit');
    st.pose('minh', 'sitDesk');
  },
};
