/**
 * Bài 105 "Lost in the Old Quarter" (quá khứ đơn bất quy tắc: took, saw, ran, sat, went, sold, gave, said, ate, felt, came,
 * bought). Bộ 👽: tập 5. Một thế giới đi từ trái sang phải: đầu phố cổ (biển OLD QUARTER, nhà ống mái ngói, biển hiệu)
 * → giữa phố (xe máy, người bán bóng bay, người đi lại) → hàng xôi của bà (ô che, mẹt xôi, ghế nhựa đỏ) → góc phố
 * (nhà góc vẽ ở lớp trước, Minh / Mum / Lan rẽ ra từ sau nhà).
 * Bíp đội mũ lưỡi trai cũ của Minh (vẽ thêm trong truyện; râu thò lên khỏi mũ), đuổi theo quả bóng bay, lạc giữa đám đông,
 * ngồi ghế cạnh hàng xôi, râu tối đi; bà cho túi xôi ấm, Bíp ăn và vui lên; Minh và Mum tới, râu sáng lại; Mum mua xôi.
 * Toạ độ cảnh: rộng 2000, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, label, road, steam } from '../kit.js';
import { BIP_SVG, BIP_BOX, BIP_CSS, bipSet } from '../bip.js';

const FLOOR = 282;
const W = 2000;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
// Chỗ: bàn xôi, bà, ghế nhựa, góc phố; chỗ đứng cuối của nhà Minh
const X = { table: 1300, lady: 1296, stool: 1400, corner: 1720, minh: 1530, lan: 1584, mum: 1640, lost: 1120, look: 1480 };
const SEAT = 30; // chiều cao mặt ghế nhựa
const BIP_SIT_Y = FLOOR - 16;

Object.assign(CAST, {
  e105_lady: { adult: true, old: true, hair: 'bun', hairC: '#D6D3D1', top: 'blouse', shirt: '#A16207', bottom: 'pants', bottomC: '#1C1917', shoe: '#57534E', hat: 'conical' },
  e105_man: { adult: true, hair: 'short', top: 'tee', shirt: '#38BDF8', bottom: 'pants', bottomC: '#334155', shoe: '#1F2937', hat: 'cap' },
  e105_w1: { adult: true, hair: 'ponytail', top: 'blouse', shirt: '#FDE68A', bottom: 'pants', bottomC: '#7C3AED', shoe: '#F5F5F4' },
  e105_w2: { adult: true, hair: 'short', top: 'shirt', shirt: '#F87171', bottom: 'pants', bottomC: '#1F2937', shoe: '#1C1917' },
  e105_rider: { adult: true, hair: 'short', top: 'tee', shirt: '#A3E635' },
});

// ── Bíp đội mũ lưỡi trai (mũ cũ của Minh): chèn mũ vào đầu, vẽ lại râu đè lên mũ (râu thò lên khỏi mũ) ──────────
const CAP = '#EF4444', CAP_D = '#B91C1C';
const capFront = `<path d="M-29 -12 Q-28 -36 0 -37 Q28 -36 29 -12 Q0 -20 -29 -12Z" fill="${CAP}" stroke="${L}" stroke-width="1.2"/>
  <path d="M-29 -12 Q0 -21 29 -12 L31 -8 Q0 -16 -31 -8Z" fill="${CAP_D}" stroke="${L}" stroke-width="1"/><circle cx="0" cy="-36" r="2.6" fill="${CAP_D}"/>`;
const capSide = `<path d="M-27 -12 Q-27 -36 1 -37 Q28 -36 28 -12 Q0 -18 -27 -12Z" fill="${CAP}" stroke="${L}" stroke-width="1.2"/>
  <path d="M22 -15 Q40 -17 47 -10 Q36 -7 22 -10Z" fill="${CAP_D}" stroke="${L}" stroke-width="1"/>`;
function capped(svg) {
  const s0 = svg.indexOf('<g transform="translate(-8 -24)">'), s1 = svg.indexOf('<ellipse cx="-24"', s0);
  const sIns = svg.indexOf('/>', svg.indexOf('M17 14 Q22 17 26 12')) + 2;
  svg = svg.slice(0, sIns) + capSide + svg.slice(s0, s1) + svg.slice(sIns);
  const f0 = svg.indexOf('<g transform="translate(-10 -24)">'), f1 = svg.indexOf('<ellipse cx="-31"', f0);
  const fIns = svg.indexOf('</g>', svg.indexOf('f-talk')) + 4;
  return svg.slice(0, fIns) + capFront + svg.slice(f0, f1) + svg.slice(fIns);
}
const BIP_CAP = capped(BIP_SVG);

// ── Đồ vật ────────────────────────────────────────────────────────────────
/** Chùm bóng bay (gốc = đầu dây ở tay người bán), quả đỏ to ở giữa. */
const BALLOONS = `<g class="e105-bl">
  <path d="M0 0 Q-6 -24 -22 -46 M0 0 Q2 -30 2 -58 M0 0 Q8 -22 24 -44" stroke="#78716C" stroke-width="0.9" fill="none"/>
  <ellipse cx="-24" cy="-56" rx="10" ry="12" fill="#60A5FA" stroke="${L}" stroke-width="0.9"/><ellipse cx="26" cy="-54" rx="10" ry="12" fill="#FACC15" stroke="${L}" stroke-width="0.9"/>
  <ellipse cx="2" cy="-80" rx="19" ry="22" fill="#EF4444" stroke="${L}" stroke-width="1.1"/><path d="M-7 -92 Q-4 -98 3 -99" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8"/>
  <path d="M-1 -58 L5 -58 L2 -62Z" fill="#B91C1C"/></g>`;
const wheel = (x, y, r) => `<g transform="translate(${x} ${y})"><g class="e105-wh"><circle r="${r}" fill="#1F2937" stroke="${L}" stroke-width="0.9"/>
  <circle r="${r * 0.45}" fill="#CBD5E1"/><path d="M${-r * 0.45} 0 H${r * 0.45} M0 ${-r * 0.45} V${r * 0.45}" stroke="#64748B" stroke-width="1.4"/></g></g>`;
/** Xe máy có người lái (nhìn sang phải, gốc = giữa đáy bánh). */
const moto = (body, shirt, helmet) => `<g>${wheel(-24, -11, 11)}${wheel(26, -11, 11)}
  <path d="M-30 -16 Q-20 -30 0 -28 L18 -26 L28 -14 H6 Q-6 -12 -14 -16Z" fill="${body}" stroke="${L}" stroke-width="1"/>
  <path d="M18 -26 L22 -40 M18 -40 H26" stroke="${L}" stroke-width="2.4" stroke-linecap="round"/>
  <g transform="translate(-6 -24)"><path d="M-8 0 Q-9 -24 0 -26 Q9 -24 8 0Z" fill="${shirt}" stroke="${L}" stroke-width="0.9"/>
    <path d="M4 -20 L18 -10" stroke="${L}" stroke-width="5" stroke-linecap="round"/><path d="M4 -20 L18 -10" stroke="${shirt}" stroke-width="3.4" stroke-linecap="round"/>
    <g transform="translate(1 -36)">${headOnly('e105_rider', { s: 0.62, mood: 'happy' })}<path d="M-11 -2 Q-12 -15 0 -15 Q12 -15 11 -2Z" fill="${helmet}" stroke="${L}" stroke-width="0.8"/></g></g></g>`;
/** Túi xôi (giấy lá chuối, xôi vàng ló miệng túi), gốc ở giữa. */
const XOI_BAG = `<path d="M-9 -6 L9 -6 L8 10 Q0 13 -8 10Z" fill="#86EFAC" stroke="${L}" stroke-width="0.9"/><path d="M-9 -6 Q0 -2 9 -6" stroke="#16A34A" stroke-width="1" fill="none"/>
  <path d="M-8 -6 Q-6 -14 0 -13 Q6 -14 8 -6Z" fill="#FDE047" stroke="${L}" stroke-width="0.7"/><circle cx="-3" cy="-9" r="1" fill="#fff"/><circle cx="3" cy="-10" r="1" fill="#fff"/>`;

// ── Cảnh ──────────────────────────────────────────────────────────────────
/** Nhà ống phố cổ (gốc = giữa chân tường), sign = chữ biển hiệu (tiếng Anh / không dấu). */
const house = (x, w, h, c, sign = '', signC = '#DC2626', roof = '#B45309') => `<g transform="translate(${x} ${FLOOR})">
  <rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${c}" stroke="${L}" stroke-width="1.1"/>
  <path d="M${-w / 2 - 6} ${-h} L${-w / 2 + 8} ${-h - 22} H${w / 2 - 8} L${w / 2 + 6} ${-h}Z" fill="${roof}" stroke="${L}" stroke-width="1.1"/>
  ${Array.from({ length: Math.max(1, Math.floor((h - 70) / 52)) }, (_, i) => `<rect x="-14" y="${-h + 14 + i * 52}" width="28" height="28" rx="2" fill="#7DD3FC" stroke="${L}" stroke-width="0.8"/><rect x="-18" y="${-h + 42 + i * 52}" width="36" height="4" fill="#fff" stroke="${L}" stroke-width="0.6"/>`).join('')}
  <rect x="${-w / 2 + 8}" y="-56" width="${w - 16}" height="56" fill="#78350F" stroke="${L}" stroke-width="0.9"/>
  <rect x="${-w / 2 + 12}" y="-52" width="${w - 24}" height="52" fill="#FDE68A" opacity="0.5"/>
  ${sign ? `<rect x="${-w / 2 + 4}" y="-76" width="${w - 8}" height="18" rx="2" fill="${signC}" stroke="${L}" stroke-width="0.8"/><text y="-63" text-anchor="middle" ${NUN} font-size="11" fill="#FEF9C3">${sign}</text>` : ''}</g>`;
/** Dây đèn lồng giăng ngang phố. */
const lanterns = (a, b, y) => `<path d="M${a} ${y} Q${(a + b) / 2} ${y + 20} ${b} ${y}" stroke="#78716C" stroke-width="1" fill="none"/>
  ${Array.from({ length: 6 }, (_, i) => { const t = (i + 0.5) / 6, x = a + (b - a) * t, yy = y + Math.sin(Math.PI * t) * 20; return `<g transform="translate(${x.toFixed(1)} ${yy.toFixed(1)})"><g class="e105-lan" style="animation-delay:${-i * 0.3}s"><path d="M0 0 V4" stroke="#78716C"/><ellipse cy="11" rx="6" ry="8" fill="${['#EF4444', '#FACC15', '#F97316'][i % 3]}" stroke="${L}" stroke-width="0.7"/></g></g>`; }).join('')}`;

function bg() {
  return `
  ${sky(0, W, 315, 'e105sky')}
  ${cloud(240, 60, 0.8, 0)}${cloud(900, 50, 0.9, 2)}${cloud(1500, 66, 0.8, 4)}
  ${road(0, W, FLOOR + 8)}
  ${house(30, 70, 150, '#FDE68A')}${house(108, 80, 180, '#FCA5A5', 'SILK', '#7C3AED', '#9A3412')}
  <!-- biển đầu phố -->
  <g transform="translate(196 0)"><path d="M0 ${FLOOR} V140" stroke="#334155" stroke-width="3"/><rect x="-62" y="118" width="124" height="26" rx="4" fill="#1D4ED8" stroke="${L}" stroke-width="1.2"/>
    <text x="0" y="136" text-anchor="middle" ${NUN} font-size="13" fill="#fff">OLD QUARTER</text></g>
  ${house(300, 74, 160, '#BBF7D0', 'PHO', '#DC2626')}${house(380, 80, 140, '#FEF3C7', 'TEA', '#15803D', '#92400E')}
  ${house(462, 76, 190, '#FDBA74', '', '', '#9A3412')}${house(542, 80, 150, '#E9D5FF', 'SHOES', '#1D4ED8')}
  ${house(626, 82, 170, '#FDE68A', 'HATS', '#B45309')}${house(710, 78, 140, '#A7F3D0', '', '', '#92400E')}
  ${house(792, 80, 180, '#FECACA', 'TOYS', '#16A34A')}${house(874, 78, 150, '#FEF3C7', 'BOOKS', '#7C3AED', '#9A3412')}
  ${house(956, 80, 165, '#BAE6FD', '', '', '#B45309')}${house(1038, 80, 140, '#FDE68A', 'BREAD', '#EA580C')}
  ${house(1120, 78, 185, '#D9F99D', 'LAMPS', '#DC2626', '#9A3412')}${house(1202, 80, 150, '#FBCFE8', '', '', '#92400E')}
  ${house(1290, 96, 170, '#FEF3C7', 'XOI', '#16A34A', '#B45309')}${house(1390, 82, 150, '#FDE68A', '', '', '#9A3412')}
  ${house(1474, 82, 180, '#C7D2FE', 'FRUIT', '#EA580C', '#B45309')}${house(1558, 82, 140, '#FECACA', '', '', '#92400E')}
  ${house(1642, 80, 165, '#BBF7D0', 'TEA', '#15803D', '#9A3412')}
  <!-- ngõ rẽ sau góc phố -->
  <rect x="1690" y="120" width="60" height="${FLOOR - 120}" fill="#E7E5E4" stroke="${L}"/><path d="M1690 ${FLOOR} L1750 ${FLOOR - 30}" stroke="#A8A29E" stroke-width="1"/>
  ${house(1930, 110, 170, '#FDE68A', '', '', '#B45309')}
  ${lanterns(330, 640, 92)}${lanterns(860, 1180, 96)}
  <!-- ô che + ghế nhựa hàng xôi -->
  <g transform="translate(${X.table - 6} 0)"><path d="M0 ${FLOOR} V146" stroke="#57534E" stroke-width="3"/>
    <path d="M-72 156 Q0 106 72 156 Q54 150 36 156 Q18 150 0 156 Q-18 150 -36 156 Q-54 150 -72 156Z" fill="#F97316" stroke="${L}" stroke-width="1.2"/>
    <path d="M-36 156 Q-18 120 0 116 M36 156 Q18 120 0 116" stroke="#FDE68A" stroke-width="2" fill="none"/></g>
  <g transform="translate(${X.stool} ${FLOOR})"><path d="M-16 0 L-12 -${SEAT} H12 L16 0" fill="none" stroke="#B91C1C" stroke-width="4" stroke-linejoin="round"/>
    <rect x="-17" y="-${SEAT + 5}" width="34" height="7" rx="3" fill="#EF4444" stroke="${L}" stroke-width="1"/><path d="M-10 -12 H10" stroke="#B91C1C" stroke-width="3"/></g>`;
}

function fg() {
  // Mẹt xôi trên bàn: xôi trắng, xôi gấc đỏ, xôi lá cẩm tím, xôi đỗ vàng
  const tray = `<g transform="translate(${X.table} ${FLOOR - 52})"><ellipse cx="0" cy="-4" rx="40" ry="8" fill="#D6A35C" stroke="${L}" stroke-width="1"/>
    ${[[-22, '#FDE047'], [-6, '#F8FAFC'], [10, '#DC2626'], [26, '#7E22CE']].map(([x, c]) => `<ellipse cx="${x}" cy="-9" rx="9" ry="6" fill="${c}" stroke="${L}" stroke-width="0.7"/>`).join('')}
    ${steam(0, -14, 'e105-steam')}</g>`;
  const table = `<g transform="translate(${X.table} 0)"><rect x="-48" y="${FLOOR - 52}" width="96" height="8" rx="2" fill="#B45309" stroke="${L}"/>
    <rect x="-44" y="${FLOOR - 44}" width="88" height="44" fill="#92400E" stroke="${L}"/><rect x="-36" y="${FLOOR - 36}" width="72" height="18" rx="3" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/>
    <text x="0" y="${FLOOR - 23}" text-anchor="middle" ${NUN} font-size="11" fill="#16A34A">XOI</text></g>`;
  // Nhà góc phố (lớp trước): nhà Minh rẽ ra từ sau nhà này
  const corner = `<g transform="translate(${X.corner + 100} ${FLOOR})"><rect x="-90" y="-196" width="180" height="196" fill="#FCA5A5" stroke="${L}" stroke-width="1.2"/>
    <path d="M-96 -196 L-80 -220 H80 L96 -196Z" fill="#9A3412" stroke="${L}" stroke-width="1.2"/>
    ${[-50, 0, 50].map((x) => `<rect x="${x - 14}" y="-176" width="28" height="30" rx="2" fill="#7DD3FC" stroke="${L}" stroke-width="0.8"/><rect x="${x - 14}" y="-120" width="28" height="30" rx="2" fill="#7DD3FC" stroke="${L}" stroke-width="0.8"/>`).join('')}
    <rect x="-78" y="-60" width="156" height="60" fill="#78350F" stroke="${L}"/><rect x="-82" y="-80" width="164" height="18" rx="2" fill="#1D4ED8" stroke="${L}" stroke-width="0.8"/>
    <text y="-67" text-anchor="middle" ${NUN} font-size="11" fill="#FEF9C3">GIFTS</text></g>`;
  const bag = `<g class="e105-bag"><g transform="translate(${X.stool} ${BIP_SIT_Y - 23})"><g class="e105-bagin">${XOI_BAG}</g>${steam(0, -14, 'e105-bagsteam')}</g></g>`;
  const qs = [[-18, -112, 0], [16, -120, 0.3], [0, -134, 0.6]].map(([dx, dy, d]) => `<text class="e105-qm" style="animation-delay:${d}s" x="${X.lost + dx}" y="${FLOOR + dy}" text-anchor="middle" ${NUN} font-size="20" fill="#EA580C" stroke="#fff" stroke-width="0.8">?</text>`).join('');
  return `
  ${tray}${table}${corner}${bag}
  <g class="e105-q">${qs}</g>
  <!-- nhãn -->
  <g class="e105-lb e105-lb-sun">${label(400, 64, 'Last Sunday', '#EA580C', 16)}</g>
  <g class="e105-lb e105-lb-busy">${label(470, 74, 'busy', '#1D4ED8', 17)}</g>
  <g class="e105-lb e105-lb-noisy">${label(590, 74, 'noisy', '#DC2626', 17)}</g>
  <g class="e105-lb e105-lb-ball">${label(1170, 60, 'a big balloon', '#DC2626', 15)}</g>
  <g class="e105-lb e105-lb-lost">${label(X.lost, 64, 'lost', '#7C3AED', 18)}</g>
  <g class="e105-lb e105-lb-dark">${label(X.stool + 40, 126, 'dark', '#475569', 15)}</g>
  <g class="e105-lb e105-lb-rice">${label(X.table - 10, 186, 'sticky rice', '#16A34A', 15)}</g>
  <g class="e105-lb e105-lb-warm">${label(X.stool + 70, 204, 'warm', '#EA580C', 15)}</g>
  <g class="e105-lb e105-lb-better">${label(X.stool + 30, 120, 'better', '#16A34A', 16)}</g>
  <g class="e105-lb e105-lb-corner">${label(X.corner - 140, 58, 'round the corner', '#1D4ED8', 14)}</g>
  <g class="e105-lb e105-lb-all">${label(X.look, 70, 'xoi for everyone', '#16A34A', 15)}</g>`;
}

const CSS = `
.e105-lan { transform-box: fill-box; transform-origin: 50% 0; animation: e105Lan 2.4s ease-in-out infinite alternate; }
@keyframes e105Lan { from { rotate: -7deg; } to { rotate: 7deg; } }
.e105-lb, .e105-q, .e105-bag { opacity: 0; transition: opacity .35s; }
${['sun', 'busy', 'noisy', 'ball', 'lost', 'dark', 'rice', 'warm', 'better', 'corner', 'all'].map((k) => `.st-lb-${k} .e105-lb-${k}`).join(', ')} { opacity: 1; }
.st-q .e105-q { opacity: 1; }
.e105-qm { animation: e105Q .6s ease-in-out infinite alternate; }
@keyframes e105Q { to { translate: 0 -5px; } }
.e105-steam .ek-steam, .e105-bagsteam .ek-steam { stroke-width: 2; }
.st-bag .e105-bag { opacity: 1; }
.e105-bagin { transform-box: fill-box; transform-origin: 50% 100%; transition: scale 1.6s ease-in; }
.st-eat .e105-bagin { scale: .55 .45; }
.st-eat .e105-bagsteam { opacity: 0; transition: opacity .6s; }
.e105-bl { transform-origin: 0 0; animation: e105Bl 1.6s ease-in-out infinite alternate; }
@keyframes e105Bl { from { rotate: -4deg; } to { rotate: 5deg; } }
.es-thing.is-walk .e105-wh { animation: e105Spin .35s linear infinite; transform-box: fill-box; transform-origin: center; }
@keyframes e105Spin { to { transform: rotate(360deg); } }
/* Bíp ôm túi xôi: hai tay đưa vào trước bụng */
.e105-hold .bip-front .bip-armL { rotate: -50deg; } .e105-hold .bip-front .bip-armR { rotate: 50deg; }
@media (prefers-reduced-motion: reduce) {
  .e105-lan, .e105-bl { animation-duration: 6s; } .es-thing.is-walk .e105-wh { animation-duration: 1s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
/** Người bán bóng bay đi tới x, chùm bóng đi theo tay. */
const BL_DX = 30, BL_DY = -128;
const walkMan = (st, x, speed) => Promise.all([
  st.walk('man', x, { speed, follow: false, after: 'e105_hold' }),
  st.walk('balloon', x + BL_DX * (x > st.a('man').x ? 1 : -1), { y: FLOOR + BL_DY, speed, follow: false }),
]);

const BEATS = [
  { key: ['Last Sunday', 'the Old Quarter'], icon: '🏮', label: 'Old Quarter', async play(st) {
    st.look(240, { instant: true });
    st.set('st-lb-sun'); st.sfx('ding', { vol: 0.4 });
    st.look(470, { dur: 2800 });
    await Promise.all([
      st.walk('mum', 430, { speed: 120, follow: false }),
      st.walk('lan', 484, { speed: 120, follow: false }),
      st.walk('minh', 534, { speed: 120, follow: false }),
      st.walk('bip', 580, { speed: 120, follow: false }),
    ]);
    st.pose('mum', 'point'); st.mood('minh', 'joy'); st.mood('lan', 'joy'); st.mood('bip', 'wow');
    st.sfx('birds', { vol: 0.35 });
    await st.wait(900);
    st.pose('mum', 'stand');
  } },
  { key: ['busy and noisy'], icon: '🛵', label: 'busy · noisy', async play(st) {
    st.set('st-lb-sun', false);
    st.look(500);
    st.set('st-lb-busy'); st.sfx('car-go', { vol: 0.6 });
    const a = st.walk('moto1', 900, { y: FLOOR + 26, speed: 260, follow: false });
    await st.wait(500);
    const b = st.walk('moto2', 120, { y: FLOOR + 22, speed: 240, follow: false });
    st.sfx('car-go', { vol: 0.5, rate: 1.1 });
    await st.wait(400);
    st.set('st-lb-noisy'); st.sfx('beep', { vol: 0.6 });
    st.pose('lan', 'wash'); st.pose('minh', 'wash'); st.mood('lan', 'shut'); st.mood('minh', 'shut');
    await st.wait(350); st.sfx('beep', { vol: 0.5, rate: 1.3 });
    await Promise.all([a, b]);
    st.show('moto1', false); st.show('moto2', false);
    st.pose('lan', 'stand'); st.pose('minh', 'stand'); st.mood('lan', 'happy'); st.mood('minh', 'happy');
  } },
  { key: ['a man with a big balloon', 'ran after it'], icon: '🎈', label: 'big balloon', async play(st) {
    off(st, 'st-lb-busy', 'st-lb-noisy');
    st.look(640);
    st.show('man', true); st.show('balloon', true);
    const go = walkMan(st, 1190, 110);
    await st.wait(900);
    st.set('st-lb-ball'); st.sfx('ding', { vol: 0.4, rate: 1.2 });
    st.mood('bip', 'wow'); bipSet(st, 'bip', 'bip-glow');
    await st.wait(500);
    st.sfx('whoosh', { vol: 0.5 });
    await st.walk('bip', X.lost - 20, { speed: 130, lead: 60 });
    await go;
  } },
  { key: ['Soon he was lost'], icon: '😟', label: 'lost', async play(st) {
    st.set('st-lb-ball', false);
    bipSet(st, 'bip', 'bip-glow', false);
    st.look(X.lost);
    const man = walkMan(st, 2200, 150);
    st.show('w1', true); st.show('w2', true);
    st.sfx('whoosh', { vol: 0.3 });
    const crowd = Promise.all([st.walk('w1', 860, { speed: 120, follow: false }), st.walk('w2', 1420, { speed: 115, follow: false })]);
    await st.walk('bip', X.lost, { speed: 60, follow: false });
    st.face('bip', -1); st.mood('bip', 'wow');
    await st.wait(700);
    st.face('bip', 1); st.set('st-lb-lost'); st.set('st-q'); st.sfx('beep', { vol: 0.4, rate: 0.75 });
    await st.wait(700);
    st.face('bip', -1); st.mood('bip', 'sad');
    await Promise.all([crowd, man]);
    st.show('man', false); st.show('balloon', false);
  } },
  { key: ['sat down on a chair', 'next to a xoi stall', 'his antennae went dark'], icon: '🪑', label: 'sat · went dark', async play(st) {
    off(st, 'st-lb-lost', 'st-q');
    st.show('w1', false); st.show('w2', false);
    st.look(X.stool - 40);
    await st.walk('bip', X.stool, { y: BIP_SIT_Y, speed: 80, follow: false });
    st.face('bip', -1); st.sfx('bump', { vol: 0.4, rate: 1.3 });
    await st.wait(500);
    bipSet(st, 'bip', 'bip-sad'); st.mood('bip', 'sad'); st.sfx('beep', { vol: 0.4, rate: 0.5 });
    st.set('st-lb-dark');
    await st.wait(1500);
  } },
  { key: ['An old woman sold sticky rice'], icon: '🍚', label: 'sticky rice', async play(st) {
    st.set('st-lb-dark', false);
    st.look(X.stool - 40);
    st.pose('lady', 'stir'); st.act('lady', 'stir'); st.sfx('pot-stir', { vol: 0.6 });
    st.set('st-lb-rice');
    await st.wait(1200);
    st.sfx('pot-stir', { vol: 0.5 });
    await st.wait(900);
    st.act('lady', null); st.pose('lady', 'stand');
  } },
  { key: ['the sad little boy in a cap', 'a warm bag of xoi'], icon: '🎁', label: 'a warm bag', async play(st) {
    st.set('st-lb-rice', false);
    st.look(X.stool - 40);
    st.mood('lady', 'wow');
    await st.wait(500);
    st.mood('lady', 'happy');
    await st.walk('lady', X.stool - 44, { speed: 90, follow: false });
    st.face('lady', 1); st.pose('lady', 'give'); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(XOI_BAG, [X.stool - 14, FLOOR - 128], [X.stool, BIP_SIT_Y - 23], { size: 26, dur: 600 });
    st.set('st-bag'); bipSet(st, 'bip', 'e105-hold'); st.sfx('bowl-down', { vol: 0.5 });
    st.set('st-lb-warm'); st.mood('bip', 'wow');
    await st.wait(1000);
    st.pose('lady', 'stand');
  } },
  { key: ['Your family will come', 'she said'], icon: '💬', label: 'will come', async play(st) {
    st.set('st-lb-warm', false);
    st.look(X.stool - 40);
    st.face('lady', 1); st.pose('lady', 'open'); st.mood('lady', 'joy'); st.sfx('pop', { vol: 0.3 });
    await st.say('lady', 'Your family will come.', 2200);
    st.pose('lady', 'stand');
    await st.walk('lady', X.lady, { speed: 100, follow: false });
    st.face('lady', 1);
  } },
  { key: ['ate the xoi and felt better'], icon: '😋', label: 'ate · better', async play(st) {
    st.look(X.stool - 40);
    st.mood('bip', 'happy'); st.set('st-eat');
    st.talk('bip', true); st.sfx('crunch', { vol: 0.5 });
    await st.wait(700); st.sfx('crunch', { vol: 0.45, rate: 1.1 });
    await st.wait(700);
    st.talk('bip', false); st.sfx('gulp', { vol: 0.5 });
    bipSet(st, 'bip', 'bip-sad', false); st.mood('bip', 'joy');
    st.set('st-lb-better'); st.sfx('ding', { vol: 0.35 });
    await st.wait(900);
  } },
  { key: ['Minh came round the corner with Mum'], icon: '👩‍👦', label: 'round the corner', async play(st) {
    st.set('st-lb-better', false);
    st.mood('bip', 'happy');
    st.place('minh', X.corner + 70, FLOOR, -1); st.place('mum', X.corner + 150, FLOOR, -1); st.place('lan', X.corner + 110, FLOOR, -1);
    st.look(X.look);
    st.set('st-lb-corner');
    await Promise.all([
      st.walk('minh', X.minh, { speed: 120, follow: false }),
      st.walk('lan', X.lan, { speed: 115, follow: false }),
      st.walk('mum', X.mum, { speed: 110, follow: false }),
    ]);
    st.mood('minh', 'wow'); st.mood('mum', 'wow');
    st.pose('minh', 'point'); st.sfx('ding', { vol: 0.4, rate: 1.2 });
    await st.say('minh', 'Bip!', 900);
    st.pose('minh', 'stand');
  } },
  { key: ['Bip ran to them', 'his antennae glowed again'], icon: '💡', label: 'glowed again', async play(st) {
    off(st, 'st-lb-corner', 'st-bag', 'st-eat');
    bipSet(st, 'bip', 'e105-hold', false);
    st.look(X.look);
    st.sfx('whoosh', { vol: 0.4 });
    await st.walk('bip', X.minh - 46, { y: FLOOR, speed: 140, follow: false });
    st.face('bip', 1);
    bipSet(st, 'bip', 'bip-glow'); st.mood('bip', 'joy');
    st.fx('sparkle', X.minh - 46, FLOOR - 104);
    st.pose('minh', 'open'); st.mood('minh', 'joy'); st.mood('mum', 'joy'); st.mood('lan', 'joy');
    st.pose('lan', 'clap'); st.act('lan', 'clap'); st.act('bip', 'jump'); st.sfx('giggle', { vol: 0.4 });
    await st.wait(1500);
    st.act('lan', null); st.act('bip', null); st.pose('lan', 'stand'); st.pose('minh', 'stand');
  } },
  { key: ['Mum bought xoi for everyone', 'thanked the kind woman'], icon: '🙏', label: 'thanked', async play(st) {
    st.look(X.look - 30);
    await st.walk('mum', X.stool + 4, { speed: 120, follow: false });
    st.face('mum', -1); st.pose('mum', 'give'); st.sfx('cash', { vol: 0.6 });
    st.set('st-lb-all');
    st.pose('lady', 'give'); st.mood('lady', 'joy');
    for (const [id, x] of [['bip', X.minh - 46], ['minh', X.minh], ['lan', X.lan]]) {
      st.sfx('whoosh', { vol: 0.25, rate: 1.3 });
      await st.fly(XOI_BAG, [X.lady + 20, FLOOR - 120], [x, FLOOR - (id === 'bip' ? 50 : 76)], { size: 24, dur: 450 });
      st.mood(id, 'joy');
      if (id !== 'bip') { st.chest(id, `<g transform="translate(0 4)">${XOI_BAG}</g>`); st.sfx('bowl-down', { vol: 0.3, rate: 1.3 }); }
    }
    st.pose('lady', 'stand'); st.pose('mum', 'stand');
    st.act('mum', 'nod'); st.sfx('pop', { vol: 0.3 });
    const say = st.say('mum', 'Thank you!', 1500);
    await st.wait(400);
    st.act('lady', 'nod'); st.fx('hearts', (X.lady + X.stool) / 2, FLOOR - 170);
    await say;
    st.act('mum', null); st.act('lady', null);
  } },
];

export default {
  id: 'en105', worldW: W, floor: FLOOR, viewTop: 30, camStart: 0, css: KIT_CSS + BIP_CSS + CSS, bg, fg, beats: BEATS,
  order: [0, 2, 3, 6, 8, 10],
  cast: [
    { id: 'lady', kind: 'adult', who: 'e105_lady', x: X.lady, face: 1, s: 0.95 },
    { id: 'man', kind: 'adult', who: 'e105_man', x: 660, s: 0.95 },
    { id: 'balloon', kind: 'thing', svg: BALLOONS, box: [-36, -106, 72, 108], x: 660 + BL_DX, y: FLOOR + BL_DY },
    { id: 'mum', kind: 'adult', who: 'en_mum', x: 20 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 70, s: 1.08 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 120 },
    { id: 'bip', kind: 'thing', svg: BIP_CAP, box: BIP_BOX, x: 166 },
    { id: 'w1', kind: 'adult', who: 'e105_w1', x: 1480, face: -1 },
    { id: 'w2', kind: 'adult', who: 'e105_w2', x: 760 },
    { id: 'moto1', kind: 'thing', svg: moto('#DC2626', '#A3E635', '#F59E0B'), box: [-38, -84, 76, 86], x: -100, y: FLOOR + 26, s: 0.9 },
    { id: 'moto2', kind: 'thing', svg: moto('#2563EB', '#FDE68A', '#fff'), box: [-38, -84, 76, 86], x: 950, y: FLOOR + 22, s: 0.9, face: -1 },
  ],
  init(st) {
    for (const id of ['man', 'balloon', 'w1', 'w2']) st.show(id, false);
    st.pose('man', 'e105_hold'); st.hold('man', 'e105_knot');
  },
  poses: { e105_hold: { R: [60, 120], L: [10, 4] } },
  props: { e105_knot: '<circle r="2" fill="#78716C"/>' },
};
