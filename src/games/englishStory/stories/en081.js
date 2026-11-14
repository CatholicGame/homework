/**
 * Bài 81 "The Old Bridge" (bị động quá khứ / hiện tại: was built, was designed, was called, was damaged, was repaired,
 * are not allowed, was chosen). Một thế giới đi từ trái sang phải: phố cũ Hà Nội (nhà ống mái ngói, cây, biển tên cầu ở
 * đầu cầu, biển cấm ô tô) → cầu Long Biên (dàn thép màu gỉ, trụ đá, đường ray ở giữa, sông Hồng nước đỏ nâu bên dưới) →
 * bờ bên kia → lớp học của cô Hoa (bảng "CLASS WALL").
 * Chuyện ngày xưa (xây cầu, kĩ sư Pháp vẽ, năm 1902, tên Doumer, chiến tranh) cả cảnh nhuộm màu ảnh cũ và hiện trong bong
 * bóng nghĩ của ông (nét nâu); "Today" thì cảnh có màu lại, tàu, xe máy, xe đạp chạy qua cầu, ô tô bị chặn ở biển cấm.
 * Toạ độ cảnh: rộng 2600, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, room, windowBox, thought, sun } from '../kit.js';

const FLOOR = 282;
const W = 2600;
const X = { sign: 452, br0: 480, br1: 1820, wall: 2060, cw: 2340 };
const PIERS = [480, 700, 920, 1140, 1360, 1580, 1800];
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const SEP = '#7C4A1E'; // nét nâu của chuyện ngày xưa

Object.assign(CAST, {
  e081_lady: { adult: true, hair: 'bun', top: 'blouse', shirt: '#FDE68A', bottom: 'pants', bottomC: '#1F2937', shoe: '#78716C', hat: 'conical' },
  e081_man: { adult: true, hair: 'short', top: 'tee', shirt: '#F87171', bottom: 'pants', bottomC: '#334155', shoe: '#1F2937' },
  e081_eng: { adult: true, hair: 'short', hairC: '#92400E', top: 'shirt', shirt: '#fff' },
  e081_eng2: { adult: true, hair: 'short', hairC: '#57534E', top: 'shirt', shirt: '#fff' },
  e081_worker: { adult: true, hair: 'short', top: 'shirt', shirt: '#65A30D', hat: 'cap' },
  e081_hoa: { ...CAST.en_hoa, bottom: 'pants', bottomC: '#FFFFFF' },
});

// ── Xe (gốc = giữa đáy, nhìn sang phải; bánh xe quay khi đi) ─────────────────────────────
const wheel = (x, y, r, c = '#1F2937') => `<g transform="translate(${x} ${y})"><g class="e081-wh"><circle r="${r}" fill="${c}" stroke="${L}" stroke-width="0.9"/>
  <circle r="${r * 0.45}" fill="#CBD5E1"/><path d="M${-r * 0.45} 0 H${r * 0.45} M0 ${-r * 0.45} V${r * 0.45}" stroke="#64748B" stroke-width="1.4"/></g></g>`;
const TRAIN = `<g>
  <rect x="-132" y="-60" width="146" height="50" rx="6" fill="#FEF3C7" stroke="${L}" stroke-width="1.2"/>
  ${[0, 1, 2, 3, 4].map((i) => `<rect x="${-122 + i * 27}" y="-52" width="19" height="16" rx="2" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="-132" y="-28" width="146" height="5" fill="#DC2626"/>
  <rect x="14" y="-34" width="10" height="6" fill="#57534E"/>
  <path d="M22 -62 H104 Q124 -60 130 -34 V-10 H22Z" fill="#1D4ED8" stroke="${L}" stroke-width="1.2"/>
  <path d="M96 -56 H106 Q118 -54 122 -38 H96Z" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>
  <rect x="34" y="-54" width="20" height="16" rx="2" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/><rect x="62" y="-54" width="20" height="16" rx="2" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>
  <rect x="22" y="-28" width="108" height="5" fill="#FACC15"/><circle cx="126" cy="-18" r="3" fill="#FEF08A" stroke="${L}" stroke-width="0.6"/>
  ${[-116, -88, -30, -4, 40, 66, 104].map((x) => wheel(x, -6, 6.5)).join('')}</g>`;
const CAR = `<g><path d="M-56 -14 Q-58 -30 -44 -32 L-26 -34 Q-16 -52 4 -52 L20 -52 Q32 -50 40 -34 L52 -32 Q60 -28 58 -14Z" fill="#38BDF8" stroke="${L}" stroke-width="1.2"/>
  <path d="M-20 -35 Q-12 -47 2 -47 L8 -47 V-35Z M14 -47 L20 -47 Q30 -46 34 -35 H14Z" fill="#E0F2FE" stroke="${L}" stroke-width="0.8"/>
  <rect x="52" y="-28" width="7" height="5" rx="2" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/>${wheel(-32, -10, 10)}${wheel(36, -10, 10)}</g>`;
const rider = (who, dx, dy, shirt, helmet) => `<g transform="translate(${dx} ${dy})"><path d="M-8 0 Q-9 -24 0 -26 Q9 -24 8 0Z" fill="${shirt}" stroke="${L}" stroke-width="0.9"/>
  <path d="M4 -20 L18 -10" stroke="${L}" stroke-width="5" stroke-linecap="round"/><path d="M4 -20 L18 -10" stroke="${shirt}" stroke-width="3.4" stroke-linecap="round"/>
  <g transform="translate(1 -36)">${headOnly(who, { s: 0.62, mood: 'happy' })}${helmet ? `<path d="M-11 -2 Q-12 -15 0 -15 Q12 -15 11 -2Z" fill="${helmet}" stroke="${L}" stroke-width="0.8"/>` : ''}</g></g>`;
const MOTO = `<g>${wheel(-24, -11, 11)}${wheel(26, -11, 11)}
  <path d="M-30 -16 Q-20 -30 0 -28 L18 -26 L28 -14 H6 Q-6 -12 -14 -16Z" fill="#DC2626" stroke="${L}" stroke-width="1"/>
  <path d="M18 -26 L22 -40 M18 -40 H26" stroke="${L}" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M-14 -16 L0 -2" stroke="#1F2937" stroke-width="5" stroke-linecap="round"/>
  ${rider('e081_man', -6, -24, '#F87171', '#F59E0B')}</g>`;
const BIKE = `<g>${wheel(-20, -12, 12, '#fff')}${wheel(22, -12, 12, '#fff')}
  <path d="M-20 -12 L-4 -12 L10 -30 L-8 -30 Z M10 -30 L22 -12 M-8 -30 L-10 -36 M10 -30 L12 -40 M8 -40 H16" stroke="#16A34A" stroke-width="2.4" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M-4 -12 L-6 -24" stroke="#1F2937" stroke-width="4.4" stroke-linecap="round"/>
  ${rider('e081_lady', -6, -34, '#FDE68A', '')}</g>`;

/** Ảnh chụp (gốc ở giữa, 40 × 34): cầu thép trên sông. */
const PHOTO = (c = '#38BDF8') => `<rect x="-20" y="-17" width="40" height="34" rx="2" fill="#fff" stroke="${L}" stroke-width="0.9"/>
  <rect x="-16" y="-13" width="32" height="22" fill="#BAE6FD"/><rect x="-16" y="3" width="32" height="6" fill="${c}"/>
  <path d="M-16 2 H16 M-16 2 Q-8 -10 0 2 Q8 -10 16 2" stroke="#7C4A1E" stroke-width="1.6" fill="none"/>
  <path d="M-12 2 V-4 M-4 2 V-7 M4 2 V-7 M12 2 V-4" stroke="#7C4A1E" stroke-width="0.9"/>`;
const PROPS = {
  e081_cam: `<g transform="translate(0 -5)"><rect x="-9" y="-6" width="18" height="12" rx="2.4" fill="#1F2937" stroke="${L}" stroke-width="0.7"/><rect x="-6" y="-9" width="6" height="3" rx="1" fill="#475569"/>
    <circle r="3.8" fill="#60A5FA" stroke="#CBD5E1" stroke-width="1.2"/></g>`,
};
const POSES = {
  e081_snap: { R: [150, 245], L: [130, 250], head: -4 },
  e081_tell: { R: [84, 110], L: [10, 4], head: -4 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
/** Nhà ống phố cổ (gốc = giữa chân tường). */
const house = (x, w, h, c, roof = '#B45309') => `<g transform="translate(${x} ${FLOOR})"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${c}" stroke="${L}" stroke-width="1.1"/>
  <path d="M${-w / 2 - 6} ${-h} L${-w / 2 + 8} ${-h - 22} H${w / 2 - 8} L${w / 2 + 6} ${-h}Z" fill="${roof}" stroke="${L}" stroke-width="1.1"/>
  ${Array.from({ length: Math.floor(h / 52) }, (_, i) => `<rect x="-12" y="${-h + 14 + i * 52}" width="24" height="28" rx="2" fill="#7DD3FC" stroke="${L}" stroke-width="0.8"/><rect x="-16" y="${-h + 42 + i * 52}" width="32" height="4" fill="#fff" stroke="${L}" stroke-width="0.6"/>`).join('')}</g>`;
/** Một nhịp dàn thép (từ trụ a tới trụ b): đỉnh cong, thanh đứng, thanh chéo. */
const span = (a, b) => {
  const n = 8, d = (b - a) / n, top = (t) => 216 - Math.sin(Math.PI * t) * 58;
  const pts = Array.from({ length: n + 1 }, (_, i) => [a + i * d, top(i / n)]);
  const chord = `M${a} 216 ${pts.map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')}`;
  const vert = pts.map(([x, y]) => `M${x.toFixed(1)} ${y.toFixed(1)} V280`).join(' ');
  const diag = pts.slice(0, -1).map(([x, y], i) => (i < n / 2 ? `M${x.toFixed(1)} 280 L${pts[i + 1][0].toFixed(1)} ${pts[i + 1][1].toFixed(1)}` : `M${x.toFixed(1)} ${y.toFixed(1)} L${pts[i + 1][0].toFixed(1)} 280`)).join(' ');
  return `<path d="${vert} ${diag}" stroke="#78584A" stroke-width="2.6" fill="none"/><path d="${chord}" stroke="#5B4033" stroke-width="5" fill="none" stroke-linejoin="round"/>`;
};

function bg() {
  return `
  ${sky(0, W, 315, 'e081sky')}
  <g transform="translate(980 66)">${sun(22)}</g>
  ${cloud(200, 64, 0.8, 0)}${cloud(760, 54, 0.9, 2)}${cloud(1380, 70, 0.8, 4)}${cloud(1900, 50, 0.9, 1)}
  <!-- phố cũ -->
  ${house(40, 70, 150, '#FDE68A')}${house(118, 76, 180, '#FCA5A5', '#9A3412')}${house(200, 70, 130, '#BBF7D0')}${house(278, 74, 160, '#FEF3C7', '#92400E')}
  ${tree(340, FLOOR, 0.9, '')}
  <path d="M370 ${FLOOR} V176 Q370 166 382 166" stroke="#334155" stroke-width="3" fill="none"/><circle cx="384" cy="170" r="5" fill="#FEF08A" stroke="${L}" stroke-width="0.8"/>
  <!-- sông Hồng -->
  <rect x="${X.br0 - 30}" y="286" width="${X.br1 - X.br0 + 70}" height="29" fill="#C2703D" stroke="${L}"/>
  <g class="e081-flow">${Array.from({ length: 30 }, (_, i) => `<path d="M${X.br0 + i * 46} ${296 + (i % 3) * 7} q6 -3 12 0 q6 3 12 0" stroke="#FCD9B6" stroke-width="1.8" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <g class="e081-boat"><g transform="translate(760 300)"><path d="M-26 -6 H26 L18 4 H-18Z" fill="#92400E" stroke="${L}" stroke-width="0.8"/><path d="M-8 -6 Q0 -16 8 -6Z" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/></g></g>
  ${PIERS.map((x) => `<rect x="${x - 12}" y="288" width="24" height="27" fill="#A8A29E" stroke="${L}"/>`).join('')}
  <!-- dàn thép + mặt cầu + đường ray -->
  ${PIERS.slice(0, -1).map((a, i) => span(a, PIERS[i + 1])).join('')}
  <rect x="${X.br0 - 10}" y="280" width="${X.br1 - X.br0 + 20}" height="10" fill="#57534E" stroke="${L}"/>
  <path d="M${X.br0 - 400} 274 H${X.br1 + 200}" stroke="#78716C" stroke-width="2"/><path d="M${X.br0 - 400} 277 H${X.br1 + 200}" stroke="#A8A29E" stroke-width="1.2" stroke-dasharray="3 5"/>
  <!-- bờ bên kia -->
  <rect x="${X.br1 + 10}" y="${FLOOR}" width="${X.wall - X.br1 - 10}" height="33" fill="#86EFAC" stroke="${L}"/>
  ${tree(1880, FLOOR, 0.9)}${tree(1980, FLOOR, 0.8, '')}
  <!-- phố: vỉa hè -->
  <rect x="0" y="${FLOOR}" width="${X.br0 - 30}" height="33" fill="#D6D3D1" stroke="${L}"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 50} ${FLOOR} V315" stroke="#A8A29E" stroke-width="1"/>`).join('')}
  <!-- biển cấm ô tô -->
  <g transform="translate(${X.sign} 0)"><path d="M0 ${FLOOR} V214" stroke="#78716C" stroke-width="3"/>
    <g class="e081-nocar"><circle cx="0" cy="200" r="16" fill="#fff" stroke="#DC2626" stroke-width="4"/>
    <g transform="translate(0 205) scale(0.2)">${CAR.replace(/class="e081-wh"/g, '')}</g><path d="M-11 189 L11 211" stroke="#DC2626" stroke-width="3.4"/></g></g>
  <!-- biển tên cầu ở đầu cầu -->
  <g transform="translate(560 0)"><path d="M-56 176 V216 M56 176 V216" stroke="#5B4033" stroke-width="4"/>
    <g class="e081-plate"><rect x="-66" y="150" width="132" height="30" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/>
      <text class="e081-sg-now" x="0" y="171" text-anchor="middle" ${NUN} font-size="11.5" fill="#1D4ED8">LONG BIEN BRIDGE</text>
      <text class="e081-sg-old" x="0" y="171" text-anchor="middle" ${NUN} font-size="12" fill="${SEP}">DOUMER BRIDGE</text></g></g>
  <!-- lớp học -->
  ${room(X.wall, W - X.wall, FLOOR, '#E0F2FE')}
  <rect x="${X.wall - 6}" y="0" width="12" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  ${windowBox(2120, 70, 90, 80)}
  <g transform="translate(2530 0)"><rect x="-56" y="66" width="112" height="76" rx="3" fill="#166534" stroke="#A16207" stroke-width="6"/>
    <text x="0" y="110" text-anchor="middle" ${NUN} font-size="15" fill="#F8FAFC">History</text></g>
  <g transform="translate(${X.cw} 0)"><rect x="-74" y="86" width="148" height="118" rx="4" fill="#D6A35C" stroke="${L}" stroke-width="1.4"/>
    <rect x="-48" y="92" width="96" height="18" rx="3" fill="#fff" stroke="${L}" stroke-width="0.8"/><text x="0" y="105" text-anchor="middle" ${NUN} font-size="11" fill="#EA580C">CLASS WALL</text>
    <g transform="translate(-48 132) rotate(-5)"><rect x="-16" y="-14" width="32" height="28" fill="#fff" stroke="${L}" stroke-width="0.7"/><circle cx="-4" cy="-2" r="6" fill="#FACC15"/><path d="M-12 10 L-2 0 L6 8 L12 2" stroke="#16A34A" stroke-width="2" fill="none"/></g>
    <g transform="translate(50 170) rotate(4)"><rect x="-16" y="-14" width="32" height="28" fill="#fff" stroke="${L}" stroke-width="0.7"/><path d="M-10 6 Q0 -12 10 6Z" fill="#F472B6" stroke="${L}" stroke-width="0.6"/></g>
    <g class="e081-best"><g transform="translate(6 150) scale(1.3)">${PHOTO('#C2703D')}</g><circle cx="6" cy="129" r="3.4" fill="#DC2626" stroke="${L}" stroke-width="0.6"/>
      <g transform="translate(6 189)"><rect x="-26" y="-8" width="52" height="13" rx="6" fill="#FACC15" stroke="${L}" stroke-width="0.7"/><text y="2.4" text-anchor="middle" ${NUN} font-size="8" fill="#92400E">BEST PHOTO</text></g></g>
    <g class="e081-h e081-h1"><g transform="translate(-46 176) rotate(-6)"><rect x="-17" y="-14" width="34" height="28" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/>
      <path d="M-12 6 H12 M-12 6 Q-6 -6 0 6 Q6 -6 12 6" stroke="${SEP}" stroke-width="1.4" fill="none"/><text y="-6" text-anchor="middle" ${NUN} font-size="6" fill="${SEP}">1902</text></g></g>
    <g class="e081-h e081-h2"><g transform="translate(52 128) rotate(5)"><rect x="-17" y="-14" width="34" height="28" fill="#fff" stroke="${L}" stroke-width="0.7"/>
      <path d="M-12 10 V-2 H12 V10 M-8 10 V2 H8 V10 M-14 -2 L0 -10 L14 -2" stroke="#B91C1C" stroke-width="1.3" fill="none"/><circle cy="-3" r="2" fill="#FACC15"/></g></g></g>
  <!-- màu ảnh cũ (chuyện ngày xưa) -->
  <rect class="e081-tint" x="0" y="0" width="${X.wall}" height="315" fill="#B45309"/>`;
}

function fg() {
  // Bong bóng nghĩ của ông: chuyện ngày xưa vẽ nét nâu trên nền giấy cũ
  const mini = (cls = '') => `<g class="${cls}"><path d="M-80 30 H80" stroke="${SEP}" stroke-width="2"/>${[-80, -27, 27, 80].map((x) => `<rect x="${x - 3}" y="30" width="6" height="12" fill="#D6B98A" stroke="${SEP}" stroke-width="0.6"/>`).join('')}</g>`;
  const arc = (a, b) => `<path d="M${a} 30 Q${(a + b) / 2} -6 ${b} 30 M${a + 13} 30 V${14} M${(a + b) / 2} 30 V12 M${b - 13} 30 V14" stroke="${SEP}" stroke-width="2.4" fill="none"/>`;
  const b1 = `<g class="e081-in e081-in-b1"><text x="0" y="-30" text-anchor="middle" ${NUN} font-size="13" fill="${SEP}">100 years ago</text>${mini()}
    ${[[-80, -27], [-27, 27], [27, 80]].map(([a, b], i) => `<g class="e081-pc" style="animation-delay:${0.3 + i * 0.55}s">${arc(a, b)}</g>`).join('')}
    <g class="e081-ham"><g transform="translate(60 4)"><path d="M0 0 L10 -12" stroke="${SEP}" stroke-width="2.4" stroke-linecap="round"/><rect x="6" y="-18" width="12" height="6" rx="1" fill="#A8A29E" stroke="${SEP}" stroke-width="0.8" transform="rotate(40 12 -15)"/></g></g></g>`;
  const eng = (who, x) => `<g transform="translate(${x} 2)">${headOnly(who, { s: 0.62, mood: 'happy' })}<path d="M-5 6 q5 3 10 0" stroke="#78350F" stroke-width="2" fill="none" stroke-linecap="round"/></g>`;
  const b2 = `<g class="e081-in e081-in-b2">${eng('e081_eng', -66)}${eng('e081_eng2', -34)}
    <g transform="translate(-50 -30)"><rect x="-12" y="-7" width="8" height="14" fill="#1D4ED8"/><rect x="-4" y="-7" width="8" height="14" fill="#fff"/><rect x="4" y="-7" width="8" height="14" fill="#DC2626"/><rect x="-12" y="-7" width="24" height="14" fill="none" stroke="${L}" stroke-width="0.6"/></g>
    <g transform="translate(36 -2)"><rect x="-50" y="-30" width="100" height="58" rx="2" fill="#2563EB" stroke="${L}" stroke-width="0.9"/>
      <g class="e081-plan"><path d="M-42 14 H42 M-42 14 Q-21 -18 0 14 Q21 -18 42 14 M-31 14 V-2 M-10 14 V-2 M10 14 V-2 M31 14 V-2" stroke="#fff" stroke-width="1.6" fill="none"/></g>
      <g class="e081-pen"><g transform="translate(42 14) rotate(30)"><rect x="-1.6" y="-16" width="3.2" height="16" fill="#FACC15" stroke="${L}" stroke-width="0.6"/></g></g></g>
    <g class="e081-year"><g transform="translate(36 40) rotate(-6)"><rect x="-26" y="-11" width="52" height="20" rx="4" fill="#FDE68A" stroke="#B91C1C" stroke-width="1.6"/><text y="5" text-anchor="middle" ${NUN} font-size="15" fill="#B91C1C">1902</text></g></g></g>`;
  const worker = (x, d) => `<g transform="translate(${x} -2)"><g transform="translate(0 0)">${headOnly('e081_worker', { s: 0.6, mood: 'happy' })}</g>
    <g class="e081-hit" style="animation-delay:${d}s;transform-origin:${x > 0 ? -6 : 6}px 14px"><path d="M${x > 0 ? -6 : 6} 14 L${x > 0 ? -18 : 18} 6" stroke="${SEP}" stroke-width="2.6" stroke-linecap="round"/><rect x="${x > 0 ? -24 : 12}" y="0" width="12" height="7" rx="1" fill="#A8A29E" stroke="${SEP}" stroke-width="0.8"/></g></g>`;
  const b4 = `<g class="e081-in e081-in-b4">${mini()}${arc(-80, -27)}${arc(27, 80)}<g class="e081-span">${arc(-27, 27)}</g>
    <g class="e081-smoke">${[[-6, 10, 9], [8, 4, 11], [-2, -6, 8]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#A8A29E" opacity="0.8"/>`).join('')}<path d="M-14 -16 l6 8 l-1 -9 l7 6" stroke="#F97316" stroke-width="2" fill="none"/></g>
    <g class="e081-dmg">${label(0, -30, 'damaged', '#DC2626', 13)}</g>
    <g class="e081-fix">${worker(-50, 0)}${worker(50, 0.2)}${label(0, -30, 'repaired', '#16A34A', 13)}</g></g>`;
  return `
  <!-- lan can trước của cầu -->
  <path d="M${X.br0} 256 H${X.br1}" stroke="#5B4033" stroke-width="3.4"/>
  ${Array.from({ length: 34 }, (_, i) => `<path d="M${X.br0 + 4 + i * 40} 256 V288" stroke="#5B4033" stroke-width="2.4"/>`).join('')}
  ${bush(30, FLOOR + 30, 0.6)}${bush(1940, FLOOR + 30, 0.7, '#4ADE80')}
  <!-- bàn đầu lớp (che chân) -->
  <g transform="translate(2480 0)"><rect x="-50" y="${FLOOR - 52}" width="100" height="9" rx="3" fill="#B45309" stroke="${L}"/><rect x="-44" y="${FLOOR - 43}" width="8" height="43" fill="#92400E" stroke="${L}"/><rect x="36" y="${FLOOR - 43}" width="8" height="43" fill="#92400E" stroke="${L}"/></g>
  ${thought(446, 122, 196, 112, `<rect x="-88" y="-42" width="176" height="86" rx="10" fill="#FEF3C7"/>${b1}${b2}${b4}`, [334, 128], 'e081-bub')}
  <!-- nhãn -->
  <g class="e081-lb e081-lb-sun">${label(200, 70, 'Last Sunday', '#EA580C', 16)}</g>
  <g class="e081-lb e081-lb-name">${label(560, 118, 'Long Bien Bridge', '#1D4ED8', 15)}</g>
  <g class="e081-lb e081-lb-then">${label(560, 120, 'At that time', SEP, 15)}</g>
  <g class="e081-lb e081-lb-today">${label(300, 70, 'Today', '#16A34A', 18)}</g>
  <g class="e081-lb e081-lb-nocar">${label(X.sign, 160, 'No cars', '#DC2626', 13)}</g>
  <g class="e081-lb e081-lb-river">${label(980, 240, 'the Red River', '#9A3412', 13)}</g>
  <g class="e081-lb e081-lb-view">${label(1010, 70, 'enjoy the view', '#0369A1', 16)}</g>
  <g class="e081-lb e081-lb-later">${label(2200, 64, 'Later', '#EA580C', 16)}</g>
  <!-- ảnh vừa chụp, máy chớp sáng -->
  ${[[1, 950, 100, -8], [2, 1002, 86, 3], [3, 1054, 100, 9]].map(([i, x, y, r]) => `<g class="e081-ph e081-ph${i}"><g transform="translate(${x} ${y}) rotate(${r})">${PHOTO()}</g></g>`).join('')}
  ${[1, 2, 3].map((i) => `<circle class="e081-fl e081-fl${i}" cx="1016" cy="176" r="24" fill="#fff"/>`).join('')}`;
}

const CSS = `
.e081-lb { opacity: 0; transition: opacity .35s; }
${['sun', 'name', 'then', 'today', 'nocar', 'river', 'view', 'later'].map((k) => `.st-lb-${k} .e081-lb-${k}`).join(', ')} { opacity: 1; }
.e081-tint { opacity: 0; transition: opacity .8s; pointer-events: none; }
.st-past .e081-tint { opacity: .26; }
.e081-sg-old { opacity: 0; }
.st-doumer .e081-sg-old { opacity: 1; } .st-doumer .e081-sg-now { opacity: 0; }
.e081-plate { transform-box: fill-box; transform-origin: 50% 50%; }
.st-flip .e081-plate { animation: e081Flip .5s ease-in-out; }
@keyframes e081Flip { 50% { transform: scaleY(0); } }
.e081-nocar { transform-box: fill-box; transform-origin: 50% 50%; }
.st-lb-nocar .e081-nocar { animation: e081Pulse .35s ease-in-out 4 alternate; }
@keyframes e081Pulse { to { transform: scale(1.3); } }
.e081-bub { opacity: 0; transform: scale(.4); transform-origin: 340px 150px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-bub .e081-bub { opacity: 1; transform: none; }
.e081-in { opacity: 0; transition: opacity .3s; }
.st-b1 .e081-in-b1, .st-b2 .e081-in-b2, .st-b4 .e081-in-b4 { opacity: 1; }
.e081-pc { opacity: 0; }
.st-b1 .e081-pc { animation: e081Drop .45s cubic-bezier(.3,1.4,.6,1) both; }
@keyframes e081Drop { from { opacity: 0; transform: translateY(-26px); } to { opacity: 1; transform: none; } }
.e081-ham { transform-box: fill-box; transform-origin: 0 100%; }
.st-b1 .e081-ham { animation: e081Ham .28s ease-in-out infinite alternate; }
@keyframes e081Ham { from { transform: rotate(-30deg); } to { transform: rotate(14deg); } }
.e081-plan { clip-path: inset(0 100% 0 0); }
.st-b2 .e081-plan { clip-path: inset(0 0 0 0); transition: clip-path 1.8s linear .2s; }
.st-b2 .e081-pen { animation: e081Pen 1.8s linear .2s both; }
@keyframes e081Pen { 0% { transform: translate(-84px, 0); } 25% { transform: translate(-63px, -24px); } 50% { transform: translate(-42px, 0); } 75% { transform: translate(-21px, -24px); } 100% { transform: none; } }
.e081-year { opacity: 0; transform: scale(2.2); transform-origin: 36px 40px; transition: opacity .2s, transform .35s cubic-bezier(.3,1.4,.6,1); }
.st-y1902 .e081-year { opacity: 1; transform: none; }
.e081-span { transition: transform .45s ease-in; transform-origin: -27px 30px; }
.st-dmg .e081-span { transform: translateY(20px) rotate(18deg); }
.st-fix .e081-span { transform: none; transition: transform 1.2s ease-out .6s; }
.e081-smoke, .e081-dmg, .e081-fix { opacity: 0; transition: opacity .3s; }
.st-dmg .e081-smoke, .st-dmg .e081-dmg { opacity: 1; }
.st-fix .e081-smoke, .st-fix .e081-dmg { opacity: 0; } .st-fix .e081-fix { opacity: 1; }
.st-fix .e081-hit { animation: e081Hit .3s ease-in-out infinite alternate; }
@keyframes e081Hit { from { transform: rotate(-24deg); } to { transform: rotate(16deg); } }
.e081-flow { animation: e081Flow 2.4s linear infinite; }
@keyframes e081Flow { from { transform: translateX(-10px); } to { transform: translateX(14px); } }
.e081-boat { animation: e081Boat 16s ease-in-out infinite alternate; }
@keyframes e081Boat { to { transform: translateX(420px); } }
.es-thing.is-walk .e081-wh { animation: e081Spin .4s linear infinite; transform-box: fill-box; transform-origin: center; }
@keyframes e081Spin { to { transform: rotate(360deg); } }
.e081-ph { opacity: 0; transform-box: fill-box; transform-origin: 50% 100%; transition: opacity .25s, transform .35s cubic-bezier(.3,1.5,.6,1); transform: scale(.3); }
.st-ph1 .e081-ph1, .st-ph2 .e081-ph2, .st-ph3 .e081-ph3 { opacity: 1; transform: none; }
.e081-fl { opacity: 0; }
.st-fl1 .e081-fl1, .st-fl2 .e081-fl2, .st-fl3 .e081-fl3 { animation: e081Flash .35s ease-out both; }
@keyframes e081Flash { 0% { opacity: .95; } 100% { opacity: 0; } }
.e081-best { opacity: 0; transform: scale(.4); transform-box: fill-box; transform-origin: 50% 50%; transition: opacity .25s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-best .e081-best { opacity: 1; transform: none; }
.e081-h { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: 50% 50%; transition: opacity .25s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-h1 .e081-h1, .st-h2 .e081-h2 { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .e081-flow { animation-duration: 6s; } .e081-boat { animation-duration: 36s; }
  .st-b1 .e081-ham, .st-fix .e081-hit { animation-duration: .7s; }
  .es-thing.is-walk .e081-wh { animation-duration: 1s; }
  .st-lb-nocar .e081-nocar { animation-duration: .8s; animation-iteration-count: 2; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const KIDS = ['minh', 'lan', 'grandpa'];
const tell = async (st, ms) => { st.talk('grandpa', true); await st.wait(ms); st.talk('grandpa', false); };

const BEATS = [
  { key: ['Last Sunday', 'Long Bien Bridge'], icon: '🌉', label: 'Long Bien Bridge', async play(st) {
    st.look(240);
    st.set('st-lb-sun'); st.sfx('birds', { vol: 0.5 });
    st.look(380, { dur: 2700 });
    await Promise.all([
      st.walk('grandpa', 318, { speed: 120, follow: false }),
      st.walk('minh', 262, { speed: 120, follow: false }),
      st.walk('lan', 220, { speed: 120, follow: false }),
    ]);
    st.set('st-lb-sun', false); st.set('st-lb-name'); st.sfx('ding', { vol: 0.5 });
    st.pose('grandpa', 'point'); st.act('grandpa', 'point');
    for (const id of ['minh', 'lan']) { st.mood(id, 'wow'); }
    st.pose('minh', 'pointUp');
    await st.wait(1300);
    st.act('grandpa', null); st.pose('minh', 'stand');
  } },
  { key: ['was built', 'more than a hundred years ago'], icon: '🏗️', label: 'was built', async play(st) {
    st.set('st-lb-name', false);
    st.look(372);
    st.face('grandpa', -1); st.pose('grandpa', 'e081_tell'); st.mood('minh', 'happy'); st.mood('lan', 'happy');
    st.set('st-past'); st.set('st-bub'); st.set('st-b1'); st.sfx('pop', { vol: 0.5 });
    const talk = tell(st, 2600);
    for (let i = 0; i < 3; i++) { await st.wait(i ? 550 : 450); st.sfx('knock', { vol: 0.6 }); }
    await st.wait(500); st.sfx('knock', { vol: 0.5, rate: 1.2 });
    await talk;
    st.pose('grandpa', 'stand');
  } },
  { key: ['designed by French engineers', 'finished in 1902'], icon: '📐', label: 'designed · 1902', async play(st) {
    st.set('st-b1', false); st.set('st-b2'); st.sfx('page-turn', { vol: 0.6 });
    st.pose('grandpa', 'e081_tell');
    const talk = tell(st, 3000);
    await st.wait(200);
    await st.loop('pencil', () => st.wait(1800), { vol: 0.8 });
    st.set('st-y1902'); st.sfx('bump', { vol: 0.5 });
    st.mood('minh', 'wow'); st.mood('lan', 'wow');
    await talk;
    st.pose('grandpa', 'stand');
  } },
  { key: ['At that time', 'Doumer Bridge'], icon: '🪧', label: 'Doumer Bridge', async play(st) {
    off(st, 'st-b2', 'st-y1902', 'st-bub');
    st.look(430);
    st.face('grandpa', 1); st.pose('grandpa', 'pointUp');
    st.set('st-lb-then');
    await st.wait(500);
    st.set('st-flip'); st.sfx('page-turn', { vol: 0.8 });
    await st.wait(250);
    st.set('st-doumer'); st.set('st-lb-then', false);
    await st.wait(400);
    st.set('st-flip', false);
    st.mood('minh', 'joy'); st.mood('lan', 'joy'); st.pose('lan', 'point'); st.sfx('giggle', { vol: 0.35 });
    await st.wait(1200);
    st.pose('lan', 'stand'); st.pose('grandpa', 'stand');
  } },
  { key: ['was damaged many times', 'was repaired by brave workers'], icon: '🔧', label: 'damaged · repaired', async play(st) {
    st.look(372);
    st.face('grandpa', -1); st.pose('grandpa', 'e081_tell'); st.mood('grandpa', 'sad');
    st.set('st-bub'); st.set('st-b4'); st.sfx('pop', { vol: 0.4 });
    const talk = tell(st, 3600);
    await st.wait(500);
    st.set('st-dmg'); st.sfx('bump', { vol: 0.8 }); st.sfx('poof', { vol: 0.5 });
    st.mood('minh', 'sad'); st.mood('lan', 'sad');
    await st.wait(1300);
    st.set('st-fix'); st.mood('grandpa', 'joy');
    for (let i = 0; i < 4; i++) { st.sfx('knock', { vol: 0.5, rate: 1 + (i % 2) * 0.15 }); await st.wait(320); }
    st.mood('minh', 'wow'); st.mood('lan', 'joy');
    await talk;
    st.pose('grandpa', 'stand');
  } },
  { key: ['cars are not allowed', 'trains, motorbikes and bicycles', 'the Red River'], icon: '🚆', label: 'trains · no cars', async play(st) {
    off(st, 'st-b4', 'st-dmg', 'st-fix', 'st-bub', 'st-past', 'st-doumer');
    st.set('st-lb-today'); st.sfx('ding', { vol: 0.4 });
    st.mood('grandpa', 'happy'); st.face('grandpa', 1);
    st.look(380);
    st.show('car', true); st.sfx('car-go', { vol: 0.6 });
    await st.walk('car', 384, { speed: 220, follow: false });
    st.set('st-lb-nocar'); st.sfx('buzz-no', { vol: 0.6 });
    st.act('grandpa', 'no');
    await st.wait(900);
    st.act('grandpa', null);
    st.sfx('car-go', { vol: 0.4, rate: 0.9 });
    const away = st.walk('car', -160, { speed: 260, follow: false });
    st.set('st-lb-today', false);
    for (const id of ['train', 'moto', 'bike']) st.show(id, true);
    st.sfx('whistle', { vol: 0.5 });
    st.pose('minh', 'wave'); st.act('minh', 'wave'); st.mood('minh', 'joy'); st.mood('lan', 'joy');
    st.look(1000, { dur: 4200 });
    const go = Promise.all([
      st.walk('train', 1460, { speed: 340, follow: false }),
      st.walk('moto', 1260, { speed: 250, follow: false }),
      st.walk('bike', 1060, { speed: 210, follow: false }),
    ]);
    await st.wait(900); st.sfx('car-go', { vol: 0.5 });
    await st.wait(700); st.sfx('ding', { vol: 0.5, rate: 1.4 }); st.set('st-lb-river');
    await st.loop('roll', () => go, { vol: 0.7 });
    await away;
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['walk across it', 'enjoy the view'], icon: '🚶', label: 'walk across', async play(st) {
    off(st, 'st-lb-river', 'st-lb-name', 'st-lb-nocar');
    for (const id of ['train', 'moto', 'bike', 'car']) st.show(id, false);
    st.show('w1', true); st.show('w2', true);
    st.look(560);
    st.look(1000, { dur: 5000 });
    st.sfx('wind', { vol: 0.3 });
    await Promise.all([
      st.walk('grandpa', 1070, { speed: 130, follow: false }),
      st.walk('minh', 1010, { speed: 130, follow: false }),
      st.walk('lan', 960, { speed: 130, follow: false }),
      st.walk('w1', 1300, { speed: 110, follow: false }),
      st.walk('w2', 820, { speed: 100, follow: false }),
    ]);
    st.set('st-lb-view'); st.sfx('birds', { vol: 0.6 });
    st.pose('lan', 'point'); st.act('lan', 'point'); st.pose('grandpa', 'open');
    for (const id of KIDS) st.mood(id, 'joy');
    await st.wait(1400);
    st.act('lan', null); st.pose('lan', 'stand'); st.pose('grandpa', 'stand');
  } },
  { key: ['took a lot of photos'], icon: '📷', label: 'took photos', async play(st) {
    st.set('st-lb-view', false);
    st.look(1010);
    st.hold('minh', 'e081_cam'); st.pose('minh', 'e081_snap'); st.mood('minh', 'shut');
    await st.wait(450);
    for (let i = 1; i <= 3; i++) {
      st.set(`st-fl${i}`); st.sfx('camera', { vol: 0.8 });
      await st.wait(250);
      st.set(`st-ph${i}`);
      await st.wait(450);
    }
    st.mood('minh', 'joy'); st.pose('minh', 'stand');
    await st.wait(500);
  } },
  { key: ['his best photo was chosen by Ms Hoa', 'for the class wall'], icon: '🖼️', label: 'best photo', async play(st) {
    off(st, 'st-ph1', 'st-ph2', 'st-ph3', 'st-fl1', 'st-fl2', 'st-fl3');
    const M = st.a('minh'); M.who = 'en_minh'; M.build();
    st.hold('minh', null);
    st.place('minh', 2200, FLOOR, 1); st.pose('minh', 'stand'); st.mood('minh', 'happy');
    st.look(2300, { instant: true });
    st.set('st-lb-later'); st.sfx('school-bell', { vol: 0.3 });
    await st.wait(400);
    st.chest('hoa', `<g transform="translate(0 -6)">${PHOTO('#C2703D')}</g>`); st.pose('hoa', 'carry');
    await st.walk('hoa', 2410, { speed: 110, follow: false });
    st.face('hoa', -1); st.chest('hoa', null); st.pose('hoa', 'raise'); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(PHOTO('#C2703D'), [2390, 160], [X.cw + 6, 150], { size: 40, dur: 500 });
    st.set('st-best'); st.sfx('click', { vol: 0.8 });
    st.mood('hoa', 'joy'); st.pose('hoa', 'point');
    st.mood('minh', 'joy'); st.pose('minh', 'clap'); st.act('minh', 'clap'); st.sfx('clap', { vol: 0.6 });
    await st.wait(1200);
    st.act('minh', null); st.pose('minh', 'stand'); st.pose('hoa', 'stand');
  } },
  { key: ['History is all around us'], icon: '🏛️', label: 'History', async play(st) {
    st.set('st-lb-later', false);
    const A = st.a('lan'); A.who = 'en_lan'; A.build();
    st.place('lan', 2080, FLOOR, 1); st.mood('lan', 'joy');
    st.look(2280);
    await st.walk('lan', 2150, { speed: 120, follow: false });
    st.face('minh', -1);
    st.pose('lan', 'open');
    const say = st.say('lan', 'History is all around us!', 2600);
    await st.wait(500);
    st.set('st-h1'); st.sfx('pop', { vol: 0.6 });
    await st.wait(600);
    st.set('st-h2'); st.sfx('pop', { vol: 0.6, rate: 1.2 });
    st.mood('minh', 'wow'); st.mood('hoa', 'joy'); st.act('hoa', 'nod');
    await say;
    st.act('hoa', null); st.pose('lan', 'stand');
  } },
];

export default {
  id: 'en081', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 4, 5, 7, 8],
  cast: [
    { id: 'train', kind: 'thing', x: -60, y: 276, s: 0.9, svg: TRAIN, box: [-134, -66, 268, 68] },
    { id: 'car', kind: 'thing', x: -150, y: FLOOR - 4, s: 0.85, svg: CAR, box: [-60, -54, 122, 56] },
    { id: 'moto', kind: 'thing', x: -40, y: FLOOR, s: 0.9, svg: MOTO, box: [-38, -84, 76, 86] },
    { id: 'bike', kind: 'thing', x: 30, y: FLOOR, s: 0.9, svg: BIKE, box: [-36, -96, 72, 98] },
    { id: 'w2', kind: 'adult', who: 'e081_man', x: 1360, s: 0.92, face: -1 },
    { id: 'w1', kind: 'adult', who: 'e081_lady', x: 620, s: 0.92 },
    { id: 'hoa', kind: 'adult', who: 'e081_hoa', x: 2470, face: -1 },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: 150 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 50, s: 1.08 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 96 },
  ],
  init(st) {
    for (const id of ['train', 'car', 'moto', 'bike', 'w1', 'w2']) st.show(id, false);
  },
};
