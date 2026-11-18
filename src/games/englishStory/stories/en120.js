/**
 * Bài 120 "The Happy Prince" (câu tường thuật; quá khứ hoàn thành), kể lại truyện của Oscar Wilde. Một thế giới đi từ
 * trái sang phải: phố cổ châu Âu → quảng trường có cột cao, trên đỉnh là tượng Hoàng tử Hạnh phúc (dát vàng lá, mắt là
 * hai viên ngọc xanh, chuôi kiếm gắn hồng ngọc) → phòng người mẹ nghèo may vá, con ốm trên giường → nhà một gia đình
 * nghèo bên lò sưởi tắt, cô bé đứng co ro ngoài phố.
 * Ban đêm chim én ngủ dưới chân tượng, giọt nước mắt rơi, Hoàng tử khóc (bong bóng nghĩ: cung điện vui vẻ ngày xưa),
 * nhìn thấy người nghèo; chim én mang hồng ngọc, ngọc xanh, vàng lá đi cho (tượng xám dần, nhắm mắt); bong bóng nghĩ Ai
 * Cập; mùa đông tuyết rơi, chim én nằm yên, trái tim chì nứt; ánh sáng từ trời, thiên thần bay xuống mang trái tim và
 * chú chim lên. Diễn nhẹ nhàng, nhấn vào lòng tốt.
 * Toạ độ cảnh: rộng 2100, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly, lying } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, label, thought } from '../kit.js';

const FLOOR = 282;
const W = 2100;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { statue: 560, room: [860, 1240], win: 900, table: 1010, bed: 1150, fam: [1300, 1620], fire: 1480, girl: 1760 };
const FEET = 196; // chân tượng (đỉnh cột)
const EYE = [[-5, -86], [5, -86]]; // mắt tượng (so với chân tượng)
const RUBY = [-21, -36];
const HEART = [0, -58];

Object.assign(CAST, {
  e120_mum: { adult: true, hair: 'bun', hairC: '#57534E', top: 'blouse', shirt: '#A8A29E', bottom: 'longskirt', bottomC: '#78716C', trim: ['#A8A29E', '#D6D3D1', '#A8A29E'], shoe: '#44403C' },
  e120_boy: { hair: 'short', hairC: '#92400E' },
  e120_dad: { adult: true, hair: 'short', hairC: '#3B2A22', top: 'jacket', shirt: '#78716C', inner: '#D6D3D1', bottom: 'pants', bottomC: '#57534E', shoe: '#292524' },
  e120_kid: { hair: 'bowl', hairC: '#A16207', top: 'tee', shirt: '#A8A29E', bottom: 'shorts', bottomC: '#57534E', shoe: '#44403C' },
  e120_girl: { hair: 'braid', hairC: '#FACC15', top: 'dress', shirt: '#94A3B8', shoe: '#57534E' },
  e120_angel: { adult: true, hair: 'curly', hairC: '#FDE68A' },
});

// ── Chim én, thiên thần, đồ vật ─────────────────────────────────────────────
/** Chim én (nhìn nghiêng sang phải, gốc = chân). Cánh vỗ khi bay (is-walk); e120-sleep: nhắm mắt, cánh xếp. */
const SWALLOW = `<g class="e120-bird"><path d="M-16 -8 L-28 -14 L-22 -6 L-30 -2 L-14 -4Z" fill="#1E3A8A" stroke="${L}" stroke-width="0.7" stroke-linejoin="round"/>
  <ellipse cx="-2" cy="-8" rx="14" ry="7" fill="#1E3A8A" stroke="${L}" stroke-width="0.9"/><path d="M-8 -4 Q2 0 10 -5 Q4 -2 -8 -4Z" fill="#FFFFFF"/>
  <circle cx="11" cy="-12" r="6" fill="#1E3A8A" stroke="${L}" stroke-width="0.9"/><path d="M8 -9 Q12 -6 15 -9" fill="#F97316"/>
  <path d="M16 -12 L21 -11 L16 -10Z" fill="#1F2937"/>
  <g class="e120-eyeO"><circle cx="13" cy="-13" r="1.4" fill="#fff"/><circle cx="13.4" cy="-13" r="0.8" fill="#111"/></g>
  <path class="e120-eyeC" d="M11.4 -13 q1.6 1.2 3.2 0" stroke="#fff" stroke-width="0.9" fill="none"/>
  <g class="e120-wing"><path d="M-6 -12 Q-2 -30 10 -34 Q6 -22 4 -12Z" fill="#2563EB" stroke="${L}" stroke-width="0.8"/></g>
  <path d="M-2 -1 V2 M3 -1 V2" stroke="${L}" stroke-width="1.2"/></g>`;
/** Thiên thần (gốc = gấu váy): váy trắng dài, đôi cánh, vòng sáng. */
const ANGEL = `<g class="e120-ang"><g class="e120-wings"><path d="M-6 -86 Q-50 -120 -62 -70 Q-46 -76 -40 -60 Q-26 -70 -6 -66Z" fill="#FFFFFF" stroke="${L}" stroke-width="1"/>
  <path d="M6 -86 Q50 -120 62 -70 Q46 -76 40 -60 Q26 -70 6 -66Z" fill="#FFFFFF" stroke="${L}" stroke-width="1"/></g>
  <path d="M-12 -92 L-26 0 Q0 6 26 0 L12 -92Z" fill="#FEFCE8" stroke="${L}" stroke-width="1.1"/><path d="M-12 -70 H12" stroke="#FDE68A" stroke-width="3"/>
  <path d="M-11 -86 L-22 -56 M11 -86 L22 -56" stroke="#FEFCE8" stroke-width="7" stroke-linecap="round"/><circle cx="-22" cy="-55" r="3.4" fill="#FADCC4" stroke="${L}" stroke-width="0.7"/><circle cx="22" cy="-55" r="3.4" fill="#FADCC4" stroke="${L}" stroke-width="0.7"/>
  <g transform="translate(0 -108)">${headOnly('e120_angel', { s: 0.9, mood: 'happy' })}</g>
  <ellipse cx="0" cy="-130" rx="12" ry="3.4" fill="none" stroke="#FACC15" stroke-width="2.4"/>
  <g class="e120-carry"><g transform="translate(-22 -52)"><path d="M0 -5 c-4 -6 -12 0 0 10 c12 -10 4 -16 0 -10Z" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/><path d="M-1 -4 l3 4 l-3 3 l2 4" stroke="${L}" stroke-width="0.8" fill="none"/></g>
    <g transform="translate(24 -50) scale(0.6)">${SWALLOW.replace('class="e120-bird"', '')}</g></g></g>`;
const RUBYJ = `<path d="M0 -6 L5 0 L0 6 L-5 0Z" fill="#DC2626" stroke="${L}" stroke-width="0.8"/><path d="M-2 -2 L0 -4" stroke="#FCA5A5" stroke-width="1"/>`;
const SAPH = `<circle r="4.6" fill="#2563EB" stroke="${L}" stroke-width="0.8"/><circle cx="-1.4" cy="-1.4" r="1.3" fill="#BFDBFE"/>`;
const LEAF = `<rect x="-6" y="-4" width="12" height="8" rx="1" fill="#FACC15" stroke="#B45309" stroke-width="0.8" transform="rotate(-12)"/>`;
const TEAR = `<path d="M0 -6 q-4 6 0 9 q4 -3 0 -9Z" fill="#7DD3FC" stroke="#38BDF8" stroke-width="0.7"/>`;
const HEARTJ = `<path d="M0 -5 c-4 -6 -12 0 0 10 c12 -10 4 -16 0 -10Z" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/>`;
const POSES = {
  e120_sew: { R: [40, -50], L: [36, -70], dy: 22, head: 10 },
  e120_cold: { R: [30, -110], L: [30, -110], head: 8 },
  e120_warm: { R: [60, 40], L: [60, 40], head: -4 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const townHouse = (x, w, h, c, roof = '#9A3412') => `<g transform="translate(${x} ${FLOOR})"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${c}" stroke="${L}" stroke-width="1.1"/>
  <path d="M${-w / 2 - 6} ${-h} L0 ${-h - 40} L${w / 2 + 6} ${-h}Z" fill="${roof}" stroke="${L}" stroke-width="1.1"/>
  ${Array.from({ length: Math.floor((h - 40) / 46) }, (_, i) => `<rect x="-10" y="${-h + 14 + i * 46}" width="20" height="28" rx="8" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="-10" y="-36" width="20" height="36" rx="9" fill="#78350F" stroke="${L}" stroke-width="0.8"/></g>`;
/** Tượng Hoàng tử (gốc = chân tượng, giữa). Lớp vàng từng mảng (e120-g0..3) gỡ dần; dưới là đá xám. */
function prince() {
  const body = (fill, stroke = L) => `<path d="M-14 0 L-12 -40 Q-14 -60 -8 -66 H8 Q14 -60 12 -40 L14 0Z" fill="${fill}" stroke="${stroke}" stroke-width="1"/>
    <path d="M-10 -64 Q-30 -40 -26 0 H-14 L-12 -40Z M10 -64 Q30 -40 26 0 H14 L12 -40Z" fill="${fill}" stroke="${stroke}" stroke-width="1"/>
    <circle cy="-82" r="14" fill="${fill}" stroke="${stroke}" stroke-width="1"/>
    <path d="M-12 -94 L-12 -106 L-6 -100 L0 -110 L6 -100 L12 -106 L12 -94Z" fill="${fill}" stroke="${stroke}" stroke-width="1"/>`;
  const grey = '#A8A29E';
  const patches = [
    '<path d="M-10 -64 Q-30 -40 -26 0 H-14 L-12 -40Z" fill="#FACC15" stroke="#B45309" stroke-width="0.8"/>',
    '<path d="M10 -64 Q30 -40 26 0 H14 L12 -40Z" fill="#FACC15" stroke="#B45309" stroke-width="0.8"/>',
    '<path d="M-14 0 L-12 -40 Q-14 -60 -8 -66 H8 Q14 -60 12 -40 L14 0Z" fill="#FDE047" stroke="#B45309" stroke-width="0.8"/>',
    '<circle cy="-82" r="14" fill="#FDE68A" stroke="#B45309" stroke-width="0.8"/><path d="M-12 -94 L-12 -106 L-6 -100 L0 -110 L6 -100 L12 -106 L12 -94Z" fill="#FACC15" stroke="#B45309" stroke-width="0.8"/>',
  ];
  return `${body(grey)}
    <g class="e120-heart"><g transform="translate(${HEART[0]} ${HEART[1]})">${HEARTJ}<path class="e120-crack" d="M-1 -4 l3 4 l-3 3 l2 4" stroke="${L}" stroke-width="1" fill="none"/></g></g>
    ${patches.map((p, i) => `<g class="e120-g e120-g${i}">${p}</g>`).join('')}
    <g class="e120-shine">${[[-18, -50], [16, -30], [-4, -100], [8, -70]].map(([x, y], i) => `<path class="e120-tw" style="animation-delay:${i * 0.3}s" d="M${x} ${y - 5} l1.4 3.6 l3.6 1.4 l-3.6 1.4 l-1.4 3.6 l-1.4 -3.6 l-3.6 -1.4 l3.6 -1.4Z" fill="#FFFFFF"/>`).join('')}</g>
    <g class="e120-face"><path d="M-4 -74 Q0 -71 4 -74" stroke="${L}" stroke-width="1" fill="none"/>
      <g class="e120-eyes">${EYE.map(([x, y]) => `<g transform="translate(${x} ${y}) scale(0.62)">${SAPH}</g>`).join('')}</g>
      <path class="e120-shut" d="M-8 -86 q3 2 6 0 M2 -86 q3 2 6 0" stroke="${L}" stroke-width="1" fill="none"/>
      <g class="e120-tears">${EYE.map(([x, y], i) => `<g class="e120-tear" style="animation-delay:${i * 0.45}s"><g transform="translate(${x} ${y + 6}) scale(0.5)">${TEAR}</g></g>`).join('')}</g></g>
    <path d="M18 -36 L22 4" stroke="#78716C" stroke-width="2.4"/><path d="M14 -36 H24" stroke="#78716C" stroke-width="2"/>
    <g class="e120-ruby"><g transform="translate(19 -38) scale(0.7)">${RUBYJ}</g></g>`;
}

function bg() {
  const [r0, r1] = X.room, [f0, f1] = X.fam;
  return `
  ${sky(0, W, 315, 'e120sky')}
  ${cloud(140, 56, 0.8, 0)}${cloud(1000, 46, 0.9, 2)}${cloud(1500, 62, 0.8, 4)}
  <!-- phố cổ -->
  ${townHouse(60, 90, 170, '#FDE68A')}${townHouse(160, 80, 200, '#FCA5A5', '#7C2D12')}${townHouse(260, 90, 150, '#BFDBFE', '#9A3412')}${townHouse(360, 80, 190, '#FEF3C7')}
  <rect x="0" y="${FLOOR}" width="${W}" height="33" fill="#D6D3D1" stroke="${L}"/>${Array.from({ length: 42 }, (_, i) => `<path d="M${i * 50} ${FLOOR} V315" stroke="#A8A29E"/>`).join('')}
  <!-- quảng trường: cột + tượng -->
  ${tree(440, FLOOR, 0.9, '')}${tree(700, FLOOR, 0.9, '')}
  <g transform="translate(${X.statue} 0)"><rect x="-22" y="${FEET}" width="44" height="12" fill="#E7E5E4" stroke="${L}"/>
    <rect x="-14" y="${FEET + 12}" width="28" height="${FLOOR - FEET - 30}" fill="#F5F5F4" stroke="${L}"/>${[-6, 0, 6].map((x) => `<path d="M${x} ${FEET + 16} V${FLOOR - 22}" stroke="#D6D3D1"/>`).join('')}
    <rect x="-30" y="${FLOOR - 22}" width="60" height="22" fill="#E7E5E4" stroke="${L}"/>
    <g transform="translate(0 ${FEET}) scale(1.25)">${prince()}</g></g>
  ${townHouse(770, 70, 160, '#DDD6FE', '#7C2D12')}
  <!-- phòng người mẹ nghèo -->
  <rect x="${r0}" y="60" width="${r1 - r0}" height="${FLOOR - 60}" fill="#E7D8C4" stroke="${L}" stroke-width="1.2"/>
  <path d="M${r0 - 10} 62 L${(r0 + r1) / 2} 20 L${r1 + 10} 62Z" fill="#78716C" stroke="${L}" stroke-width="1.2"/>
  <rect x="${r0}" y="${FLOOR}" width="${r1 - r0}" height="33" fill="#A16207" stroke="${L}"/>
  ${[[930, 120], [1180, 180], [1060, 100]].map(([x, y]) => `<path d="M${x} ${y} l14 4 l-4 12 l-12 -2Z" fill="#D6C3A5" stroke="#A8A29E" stroke-width="0.6"/>`).join('')}
  <g transform="translate(${X.win} 0)"><rect x="-26" y="96" width="52" height="56" fill="#1E3A8A" stroke="${L}" stroke-width="1.2"/><path d="M0 96 V152 M-26 124 H26" stroke="#E7D8C4" stroke-width="2.4"/>
    <g class="e120-ldrop"><g transform="translate(0 0)"></g></g></g>
  <g transform="translate(${X.bed} 0)"><path d="M-62 ${FLOOR} V222 M46 ${FLOOR} V240" stroke="#78716C" stroke-width="3"/><rect x="-64" y="250" width="114" height="8" rx="2" fill="#D6D3D1" stroke="${L}"/>
    <g class="e120-sick">${lying(0, 252, 'e120_boy', { s: 0.75, mood: 'sad', blanket: '#A8A29E', len: 100 })}</g>
    <g class="e120-well">${lying(0, 252, 'e120_boy', { s: 0.75, mood: 'joy', blanket: '#FCA5A5', len: 100 })}</g></g>
  <!-- nhà gia đình nghèo: lò sưởi -->
  <rect x="${f0}" y="80" width="${f1 - f0}" height="${FLOOR - 80}" fill="#D6C3A5" stroke="${L}" stroke-width="1.2"/>
  <path d="M${f0 - 10} 82 L${(f0 + f1) / 2} 36 L${f1 + 10} 82Z" fill="#57534E" stroke="${L}" stroke-width="1.2"/>
  <rect x="${f0}" y="${FLOOR}" width="${f1 - f0}" height="33" fill="#92400E" stroke="${L}"/>
  <g transform="translate(${X.fire} ${FLOOR})"><rect x="-44" y="-84" width="88" height="84" fill="#A8A29E" stroke="${L}"/><rect x="-28" y="-56" width="56" height="56" rx="4" fill="#292524" stroke="${L}"/>
    <path d="M-18 -4 L18 -10 M-18 -10 L18 -4" stroke="#78350F" stroke-width="5"/>
    <g class="e120-fire"><path d="M-16 -8 Q-12 -34 -2 -22 Q4 -44 10 -24 Q16 -30 16 -8Z" fill="#F97316"/><path d="M-8 -8 Q-4 -22 2 -14 Q8 -24 8 -8Z" fill="#FDE047"/></g>
    <rect x="-52" y="-92" width="104" height="10" fill="#78716C" stroke="${L}"/></g>
  <g class="e120-bread"><g transform="translate(${f0 + 60} ${FLOOR - 62})"><rect x="-30" y="0" width="60" height="7" fill="#A16207" stroke="${L}"/><path d="M-30 7 V62 M30 7 V62" stroke="#78350F" stroke-width="3"/>
    <ellipse cx="-8" cy="-5" rx="12" ry="6" fill="#D97706" stroke="${L}" stroke-width="0.8"/><ellipse cx="14" cy="-4" rx="8" ry="5" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/></g></g>
  <!-- phố nghèo: cô bé -->
  ${townHouse(1700, 80, 150, '#E7E5E4', '#57534E')}${townHouse(1880, 90, 180, '#D6D3D1', '#44403C')}${townHouse(2020, 80, 140, '#E7E5E4', '#57534E')}
  <!-- tuyết phủ -->
  <g class="e120-snowcap"><rect x="0" y="${FLOOR - 6}" width="${W}" height="10" rx="4" fill="#FFFFFF"/>
    <path d="M${X.statue - 22} ${FEET + 1} h44" stroke="#fff" stroke-width="5" stroke-linecap="round"/>${[60, 160, 260, 360, 770, 1700, 1880, 2020].map((x) => `<ellipse cx="${x}" cy="${FLOOR - 150}" rx="0" ry="0"/>`).join('')}</g>`;
}

function fg() {
  const palace = `<rect x="-62" y="-38" width="124" height="80" rx="10" fill="#FEF9C3"/>
    <path d="M-40 26 V-6 H40 V26Z" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/><path d="M-46 -6 L0 -30 L46 -6Z" fill="#F472B6" stroke="${L}" stroke-width="0.9"/>
    ${[-28, -10, 10, 28].map((x) => `<rect x="${x - 4}" y="2" width="8" height="12" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="0.6"/>`).join('')}
    ${[-50, 50].map((x) => `<g transform="translate(${x} 26)"><rect x="-2" y="-14" width="4" height="14" fill="#A16207"/><circle cy="-18" r="8" fill="#4ADE80" stroke="${L}" stroke-width="0.7"/></g>`).join('')}
    <g transform="translate(-12 32)">${headOnly('en_lan_home', { s: 0.45, mood: 'joy' })}</g><g transform="translate(12 32)">${headOnly('en_tom_home', { s: 0.45, mood: 'joy' })}</g>
    <text x="0" y="-16" text-anchor="middle" font-size="12">🎵</text>`;
  const egypt = `<rect x="-62" y="-38" width="124" height="80" rx="10" fill="#FEF3C7"/>
    <circle cx="40" cy="-18" r="10" fill="#FDE047" stroke="#F59E0B" stroke-width="1.2"/>
    <path d="M-50 24 L-24 -18 L2 24Z" fill="#FCD34D" stroke="${L}" stroke-width="0.9"/><path d="M-6 24 L16 -8 L38 24Z" fill="#FBBF24" stroke="${L}" stroke-width="0.9"/>
    <path d="M-60 30 Q0 22 60 30" stroke="#38BDF8" stroke-width="5" fill="none"/>${label(0, -22, 'Egypt', '#B45309', 11)}`;
  return `
  <!-- giọt nước mắt rơi -->
  <g class="e120-drop"><g transform="translate(${X.statue + 6} ${FEET - 95})">${TEAR}</g></g>
  <!-- bàn người mẹ may (che chân) -->
  <g transform="translate(${X.table} ${FLOOR})"><rect x="-36" y="-50" width="72" height="8" rx="2" fill="#92400E" stroke="${L}"/><path d="M-30 -42 V0 M30 -42 V0" stroke="#78350F" stroke-width="4"/>
    <g class="e120-onTable"><g transform="translate(-14 -56)">${RUBYJ}</g></g></g>
  <!-- tuyết rơi -->
  <g class="e120-snow">${Array.from({ length: 46 }, (_, i) => `<circle class="e120-flake" style="animation-delay:${((i * 0.37) % 3).toFixed(2)}s" cx="${(i * 47) % W}" cy="${-10 - (i % 5) * 30}" r="${2 + (i % 3)}" fill="#fff"/>`).join('')}</g>
  <!-- lớp đêm -->
  <rect class="e120-night" x="0" y="0" width="${W}" height="315" fill="#1E1B4B"/>
  <g class="e120-moon"><g transform="translate(${X.statue + 170} 64)"><circle r="18" fill="#FEF9C3"/><circle cx="8" cy="-5" r="16" fill="#3B3874"/></g></g>
  <!-- ánh sáng từ trời -->
  <g class="e120-light"><path d="M${X.statue - 40} 0 L${X.statue + 40} 0 L${X.statue + 150} ${FLOOR} L${X.statue - 150} ${FLOOR}Z" fill="url(#e120ray)"/>
    <ellipse cx="${X.statue}" cy="26" rx="120" ry="30" fill="#FFFFFF" opacity="0.9"/><ellipse cx="${X.statue - 60}" cy="36" rx="60" ry="20" fill="#FFFFFF"/><ellipse cx="${X.statue + 70}" cy="34" rx="64" ry="22" fill="#FFFFFF"/></g>
  <defs><linearGradient id="e120ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FEF08A" stop-opacity="0.85"/><stop offset="1" stop-color="#FEF9C3" stop-opacity="0"/></linearGradient></defs>
  <!-- bong bóng nghĩ -->
  ${thought(X.statue + 150, 86, 150, 96, palace, [X.statue + 24, FEET - 112], 'e120-bub e120-bub1')}
  ${thought(X.statue + 130, 98, 150, 96, egypt, [X.statue + 30, FEET - 20], 'e120-bub e120-bub2')}
  <!-- nhãn -->
  <g class="e120-lb e120-lb-prince">${label(X.statue, 46, 'the Happy Prince', '#B45309', 16)}</g>
  <g class="e120-lb e120-lb-gold">${label(X.statue - 110, 120, 'gold leaf', '#B45309', 14)}</g>
  <g class="e120-lb e120-lb-saph">${label(X.statue + 110, 70, 'two sapphires', '#1D4ED8', 14)}</g>
  <g class="e120-lb e120-lb-night">${label(X.statue - 150, 60, 'One night', '#4338CA', 15)}</g>
  <g class="e120-lb e120-lb-swallow">${label(X.statue - 100, 210, 'a swallow', '#1E3A8A', 14)}</g>
  <g class="e120-lb e120-lb-tear">${label(X.statue + 100, 120, 'a tear', '#0369A1', 15)}</g>
  <g class="e120-lb e120-lb-cry">${label(X.statue + 100, 120, 'crying', '#0369A1', 15)}</g>
  <g class="e120-lb e120-lb-poor">${label(X.room[0] + 160, 46, 'poor people', '#57534E', 15)}</g>
  <g class="e120-lb e120-lb-ruby">${label(X.table + 60, 96, 'his ruby', '#DC2626', 14)}</g>
  <g class="e120-lb e120-lb-fam">${label(X.fire + 60, 58, 'poor families', '#57534E', 14)}</g>
  <g class="e120-lb e120-lb-winter">${label(X.statue - 130, 60, 'winter', '#0369A1', 16)}</g>
  <g class="e120-lb e120-lb-prec">${label(X.statue - 40, 66, 'the two most precious things', '#B45309', 13)}</g>
  <g class="e120-lb e120-lb-hb">${label(X.statue - 40, 66, 'the heart and the bird', '#BE185D', 14)}</g>`;
}

const LBS = ['prince', 'gold', 'saph', 'night', 'swallow', 'tear', 'cry', 'poor', 'ruby', 'fam', 'winter', 'prec', 'hb'];
const CSS = `
.e120-lb { opacity: 0; transition: opacity .35s; }
${LBS.map((k) => `.st-lb-${k} .e120-lb-${k}`).join(', ')} { opacity: 1; }
.e120-g { transition: opacity .6s; }
.st-g0 .e120-g0, .st-g1 .e120-g1, .st-g2 .e120-g2, .st-g3 .e120-g3 { opacity: 0; }
.e120-shine { opacity: 0; } .st-shine .e120-shine { opacity: 1; }
.e120-tw { animation: e120Tw .7s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
@keyframes e120Tw { from { opacity: .2; transform: scale(.6); } to { opacity: 1; transform: scale(1.2); } }
.e120-eyes { transform-box: fill-box; transform-origin: center; }
.st-glint .e120-eyes { animation: e120Glint .35s ease-in-out 4 alternate; }
@keyframes e120Glint { to { transform: scale(1.4); } }
.e120-shut { opacity: 0; } .st-noeye .e120-eyes { opacity: 0; } .st-noeye .e120-shut { opacity: 1; }
.e120-tear { opacity: 0; }
.st-tears .e120-tear { animation: e120Tear 1.1s ease-in infinite; }
@keyframes e120Tear { 0% { opacity: 0; transform: none; } 20% { opacity: 1; } 100% { opacity: 0; transform: translateY(26px); } }
.e120-drop { opacity: 0; }
.st-drop .e120-drop { animation: e120Drop 1s ease-in both; }
@keyframes e120Drop { 0% { opacity: 0; transform: none; } 15% { opacity: 1; } 90% { opacity: 1; } 100% { opacity: 0; transform: translateY(70px); } }
.e120-ruby { transition: opacity .3s; } .st-noruby .e120-ruby { opacity: 0; }
.e120-onTable { opacity: 0; transition: opacity .3s; } .st-ruby2 .e120-onTable { opacity: 1; }
.e120-crack { opacity: 0; } .st-broke .e120-crack { opacity: 1; }
.e120-heart { transform-box: fill-box; transform-origin: center; }
.st-broke .e120-heart { animation: e120Shake .1s linear 6 alternate; }
.st-gone .e120-heart { opacity: 0; transition: opacity .4s; }
@keyframes e120Shake { from { transform: translateX(-1px); } to { transform: translateX(1px); } }
.e120-night { opacity: 0; transition: opacity .8s; pointer-events: none; } .st-night .e120-night { opacity: .5; }
.e120-moon { opacity: 0; transition: opacity .8s; } .st-night .e120-moon { opacity: 1; }
.e120-light { opacity: 0; transition: opacity 1s; } .st-light .e120-light { opacity: 1; }
.e120-bub { opacity: 0; transform: scale(.4); transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.e120-bub1 { transform-origin: ${X.statue + 24}px ${FEET - 112}px; } .e120-bub2 { transform-origin: ${X.statue + 30}px ${FEET - 20}px; }
.st-bub1 .e120-bub1, .st-bub2 .e120-bub2 { opacity: 1; transform: none; }
.e120-well, .e120-fire, .e120-bread { opacity: 0; transition: opacity .5s; }
.st-well .e120-well, .st-warm .e120-fire, .st-warm .e120-bread { opacity: 1; } .st-well .e120-sick { opacity: 0; }
.st-warm .e120-fire { animation: e120Fire .3s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes e120Fire { to { transform: scaleY(1.2); } }
.e120-snow, .e120-snowcap { opacity: 0; transition: opacity 1s; } .st-snow .e120-snow, .st-snow .e120-snowcap { opacity: 1; }
.st-snow .e120-flake { animation: e120Snow 3s linear infinite; }
@keyframes e120Snow { from { transform: translate(0, 0); } to { transform: translate(-20px, 330px); } }
.e120-eyeC { display: none; } .e120-sleep .e120-eyeO { display: none; } .e120-sleep .e120-eyeC { display: inline; }
.e120-wing { transform-box: fill-box; transform-origin: 30% 100%; }
.es-thing.is-walk .e120-wing { animation: e120Flap .16s ease-in-out infinite alternate; }
@keyframes e120Flap { from { transform: rotate(-30deg) scaleY(.7); } to { transform: rotate(20deg); } }
.e120-sleep .e120-wing { transform: rotate(60deg) scaleY(.5); }
.e120-carry { opacity: 0; transition: opacity .3s; } .e120-has .e120-carry { opacity: 1; }
.e120-wings { transform-box: fill-box; transform-origin: 50% 80%; animation: e120Wings .6s ease-in-out infinite alternate; }
@keyframes e120Wings { from { transform: scaleX(1); } to { transform: scaleX(.86); } }
.es-ac.e120-fade { transition: opacity 1.6s; }
@media (prefers-reduced-motion: reduce) {
  .es-thing.is-walk .e120-wing { animation-duration: .5s; } .e120-wings { animation-duration: 1.6s; }
  .st-snow .e120-flake { animation-duration: 7s; } .st-tears .e120-tear { animation-duration: 2s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const lb = (st, k, on = true) => st.set(`st-lb-${k}`, on);
const cls = (st, id, c, on = true) => st.a(id).el.classList.toggle(c, on);
const S = X.statue;
const BIRD_Y = FEET + 2;

const BEATS = [
  { key: ['High above the city', 'the statue of the Happy Prince'], icon: '🗿', label: 'the Happy Prince', async play(st) {
    st.look(200);
    st.sfx('birds', { vol: 0.4 });
    st.look(S, { dur: 2200 });
    await st.wait(2000);
    lb(st, 'prince'); st.sfx('ding', { vol: 0.5 });
    st.mood('man', 'wow'); st.pose('man', 'pointUp');
    await st.wait(1200);
    st.pose('man', 'stand');
  } },
  { key: ['covered with gold leaf', 'two sapphires'], icon: '💎', label: 'gold leaf · sapphires', async play(st) {
    lb(st, 'prince', false);
    st.look(S);
    st.set('st-shine'); lb(st, 'gold'); st.sfx('sparkle', { vol: 0.4 });
    await st.wait(1300);
    st.set('st-glint'); lb(st, 'saph'); st.sfx('ding', { vol: 0.4, rate: 1.3 });
    await st.wait(1500);
  } },
  { key: ['One night', 'a swallow slept between his feet'], icon: '🐦', label: 'a swallow slept', async play(st) {
    off(st, 'st-lb-gold', 'st-lb-saph', 'st-glint', 'st-shine');
    st.show('man', false);
    st.set('st-night'); lb(st, 'night'); st.sfx('crickets', { vol: 0.4 });
    st.show('bird', true);
    await st.walk('bird', S - 4, { y: BIRD_Y, speed: 160, follow: false });
    lb(st, 'night', false); lb(st, 'swallow');
    cls(st, 'bird', 'e120-sleep');
    st.fx('zzz', S + 10, FEET - 14);
    await st.wait(1500);
  } },
  { key: ['A tear fell on him'], icon: '💧', label: 'a tear', async play(st) {
    lb(st, 'swallow', false);
    st.look(S);
    st.set('st-drop'); st.sfx('drip', { vol: 0.6 });
    await st.wait(900);
    lb(st, 'tear'); st.fx('drops', S - 2, FEET - 6, { n: 1 });
    cls(st, 'bird', 'e120-sleep', false); st.sfx('drip', { vol: 0.5, rate: 1.2 });
    await st.wait(1200);
  } },
  { key: ['The prince was crying'], icon: '😢', label: 'crying', async play(st) {
    off(st, 'st-lb-tear', 'st-drop');
    lb(st, 'cry'); st.set('st-tears');
    st.loop('drip', () => st.wait(1800), { vol: 0.4 });
    st.face('bird', 1);
    await st.wait(2200);
  } },
  { key: ['never seen sadness in his palace'], icon: '🏰', label: 'his palace', async play(st) {
    lb(st, 'cry', false);
    st.look(S + 80);
    st.set('st-bub1'); st.sfx('pop', { vol: 0.5 });
    await st.wait(600);
    st.sfx('giggle', { vol: 0.3 });
    await st.wait(2200);
  } },
  { key: ['Now he could see poor people everywhere'], icon: '🏚️', label: 'poor people', async play(st) {
    off(st, 'st-bub1', 'st-night');
    st.look(X.room[0] + 150, { dur: 1800 });
    await st.wait(1200);
    lb(st, 'poor'); st.sfx('cough', { vol: 0.3 });
    st.act('mum', 'write');
    st.look(X.fire, { dur: 1800 });
    await st.wait(1300);
    st.act('dad', 'shiver'); st.act('kid', 'shiver'); st.sfx('wind', { vol: 0.4 });
    await st.wait(1000);
    st.act('dad', null); st.act('kid', null); st.act('mum', null);
  } },
  { key: ['take his ruby to a poor mother'], icon: '❤️', label: 'his ruby', async play(st) {
    off(st, 'st-lb-poor', 'st-tears');
    st.look(S + 160, { instant: true });
    st.set('st-noruby'); st.sfx('click', { vol: 0.5 });
    st.fx('sparkle', S + 24, FEET - 48, { quiet: true });
    await st.fly(RUBYJ, [S + 24, FEET - 48], [S + 10, BIRD_Y - 18], { size: 16, dur: 400 });
    st.look(X.table, { dur: 1800 });
    await st.walk('bird', X.win, { y: 130, speed: 200, follow: false });
    await st.walk('bird', X.table - 10, { y: FLOOR - 56, speed: 140, follow: false });
    st.set('st-ruby2'); lb(st, 'ruby'); st.sfx('bowl-down', { vol: 0.5 });
    st.mood('mum', 'joy'); st.pose('mum', 'e120_warm');
    st.set('st-well'); st.fx('hearts', X.bed, 200);
    await st.wait(900);
  } },
  { key: ['his sapphires and gold leaf to poor families'], icon: '🪙', label: 'sapphires · gold leaf', async play(st) {
    lb(st, 'ruby', false);
    st.look(S + 80, { instant: true });
    st.place('bird', S + 34, FEET - 112, -1);
    st.set('st-noeye'); st.sfx('click', { vol: 0.5 });
    await st.walk('bird', X.fire + 60, { y: 150, speed: 260, lead: -40 });
    await st.fly(SAPH, [X.fire + 60, 150], [X.fire - 20, 200], { size: 14, dur: 500 });
    st.set('st-warm'); st.sfx('sizzle', { vol: 0.4 }); lb(st, 'fam');
    st.mood('dad', 'joy'); st.mood('kid', 'joy'); st.pose('kid', 'cheer'); st.pose('dad', 'e120_warm');
    await st.walk('bird', X.girl, { y: 150, speed: 240, lead: -40 });
    await st.fly(LEAF, [X.girl, 150], [X.girl, 200], { size: 16, dur: 500 });
    st.sfx('cash', { vol: 0.4 }); st.mood('girl', 'joy'); st.pose('girl', 'cheer');
    st.look(S + 40, { dur: 1000 });
    for (let i = 0; i < 4; i++) { st.set(`st-g${i}`); st.sfx('page-turn', { vol: 0.4, rate: 1 + i * 0.1 }); await st.wait(280); }
    await st.walk('bird', S - 4, { y: BIRD_Y, speed: 300, follow: false });
    st.face('bird', 1);
  } },
  { key: ['wanted to fly to Egypt', 'but he stayed'], icon: '🏜️', label: 'he stayed', async play(st) {
    off(st, 'st-lb-fam');
    st.look(S + 80);
    st.set('st-bub2'); st.sfx('pop', { vol: 0.5 });
    st.show('b2', true); st.show('b3', true);
    const a = st.walk('b2', S + 420, { y: 60, speed: 150, follow: false });
    const b = st.walk('b3', S + 400, { y: 90, speed: 140, follow: false });
    await st.wait(1600);
    st.set('st-bub2', false);
    st.face('bird', -1); st.sfx('whoosh', { vol: 0.3 });
    await st.wait(500);
    st.fx('hearts', S, FEET - 40, { quiet: true }); st.sfx('hearts', { vol: 0.4 });
    await Promise.all([a, b]);
    st.show('b2', false); st.show('b3', false);
  } },
  { key: ['When winter came', 'the bird died', "the prince's heart broke"], icon: '❄️', label: 'winter', async play(st) {
    st.look(S);
    st.set('st-snow'); lb(st, 'winter'); st.sfx('wind', { vol: 0.5 });
    await st.wait(1200);
    cls(st, 'bird', 'e120-sleep');
    await st.wait(1000);
    st.set('st-broke'); st.sfx('knock', { vol: 0.6, rate: 0.8 });
    await st.wait(1200);
  } },
  { key: ['God asked an angel', 'the two most precious things'], icon: '✨', label: 'an angel', async play(st) {
    lb(st, 'winter', false);
    st.look(S);
    st.set('st-light'); st.sfx('sparkle', { vol: 0.35 });
    await st.wait(700);
    st.show('angel', true);
    await st.walk('angel', S + 100, { y: 200, speed: 80, follow: false });
    lb(st, 'prec'); st.sfx('ding', { vol: 0.4 });
    await st.wait(1300);
  } },
  { key: ['The angel brought the heart and the bird'], icon: '👼', label: 'the heart and the bird', async play(st) {
    lb(st, 'prec', false);
    await st.walk('angel', S + 56, { y: FEET + 50, speed: 80, follow: false });
    st.set('st-gone'); st.show('bird', false); st.sfx('whoosh', { vol: 0.35 });
    cls(st, 'angel', 'e120-has');
    lb(st, 'hb'); st.fx('hearts', S + 40, FEET - 70);
    await st.wait(700);
    await st.walk('angel', S + 90, { y: 186, speed: 60, follow: false });
    await st.wait(500);
  } },
];

export default {
  id: 'en120', worldW: W, floor: FLOOR, viewTop: 30, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  order: [0, 2, 4, 7, 9, 12],
  cast: [
    { id: 'man', kind: 'adult', who: 'e120_dad', x: S + 110, face: -1 },
    { id: 'mum', kind: 'adult', who: 'e120_mum', x: X.table - 10 },
    { id: 'dad', kind: 'adult', who: 'e120_dad', x: X.fire - 90 },
    { id: 'kid', kind: 'kid', who: 'e120_kid', x: X.fire - 50 },
    { id: 'girl', kind: 'kid', who: 'e120_girl', x: X.girl, face: -1 },
    { id: 'bird', kind: 'thing', x: -40, y: 90, s: 1.2, svg: SWALLOW, box: [-32, -36, 56, 40] },
    { id: 'b2', kind: 'thing', x: S - 300, y: 80, s: 0.9, svg: SWALLOW, box: [-32, -36, 56, 40] },
    { id: 'b3', kind: 'thing', x: S - 340, y: 110, s: 0.9, svg: SWALLOW, box: [-32, -36, 56, 40] },
    { id: 'angel', kind: 'thing', x: S + 40, y: -20, s: 0.9, svg: ANGEL, box: [-66, -140, 132, 146] },
  ],
  init(st) {
    for (const id of ['bird', 'b2', 'b3', 'angel']) st.show(id, false);
    st.pose('mum', 'e120_sew');
    st.mood('mum', 'sad'); st.mood('dad', 'sad'); st.mood('kid', 'sad'); st.mood('girl', 'sad');
    st.pose('dad', 'e120_cold'); st.pose('kid', 'e120_cold'); st.pose('girl', 'e120_cold');
    st.a('mum').inner.querySelector('.pp-side .pp-chest')?.insertAdjacentHTML('beforebegin', `<path d="M-16 -94 H18 L30 -3 Q2 3 -27 -3Z" fill="#78716C" stroke="${L}" stroke-width="1"/>`);
  },
};
