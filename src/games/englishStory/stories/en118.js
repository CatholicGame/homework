/**
 * Bài 118 "A Thousand Paper Cranes" (so / because / so that; used to): Sadako Sasaki. Một thế giới đi từ trái sang phải:
 * phố Hiroshima (nhà mái ngói Nhật, sông, núi xa; mẹ bế Sadako hai tuổi; năm 1945 một luồng sáng chói lóa ở xa, trời xám
 * đi, hai mẹ con ôm nhau, Sadako không sao) → sân trường (Sadako lớn lên chạy rất nhanh; năm 1955 bé mệt, ốm) → phòng bệnh
 * viện (bạn mang giấy vàng tới, gấp hạc giấy; bong bóng nghĩ: nghìn con hạc thành một điều ước; Sadako gấp hàng trăm con
 * hạc, ước hoà bình; tháng 10 năm 1955 giường trống, lá thu rơi, hạc bay lên trời) → công viên Hoà bình (các bạn quyên
 * tiền, tượng Hoà bình Trẻ em hiện lên; trẻ em khắp thế giới mang dây hạc tới).
 * Không vẽ bom nổ hay cảnh bị thương; cái chết diễn nhẹ nhàng, nhấn vào hạc giấy và điều ước hoà bình.
 * Toạ độ cảnh: rộng 2900, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, thought, flowerAt } from '../kit.js';

const FLOOR = 282;
const W = 2900;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { home: 330, field: [720, 1220], start: 770, finish: 1150, room: [1260, 1720], bed: 1430, win: 1560, door: 1680, park: [1760, 2900], statue: 2280, box: 2000 };
const BED_TOP = 236;

Object.assign(CAST, {
  e118_mum: { adult: true, hair: 'bun', hairC: '#1F1716', top: 'blouse', shirt: '#FDE68A', bottom: 'pants', bottomC: '#57534E', shoe: '#44403C' },
  e118_baby: { hair: 'bob', hairC: '#1F1716', top: 'dress', shirt: '#FCA5A5', shoe: '#F472B6' },
  e118_sadako: { hair: 'bob', hairC: '#1F1716', top: 'tee', shirt: '#FFFFFF', bottom: 'skirt', bottomC: '#1E3A8A', shoe: '#F8FAFC' },
  e118_sadakoH: { hair: 'bob', hairC: '#1F1716', top: 'tee', shirt: '#BAE6FD', bottom: 'pants', bottomC: '#93C5FD', shoe: '#F8FAFC' },
  e118_friend: { hair: 'braid', hairC: '#1F1716', top: 'tee', shirt: '#FDE68A', bottom: 'skirt', bottomC: '#B45309', shoe: '#78350F' },
  e118_k1: { hair: 'neat', hairC: '#1F1716', top: 'tee', shirt: '#86EFAC', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F8FAFC' },
  e118_k2: { hair: 'pigtails', hairC: '#1F1716', top: 'tee', shirt: '#F9A8D4', bottom: 'skirt', bottomC: '#1E3A8A', shoe: '#F8FAFC' },
  e118_w1: { hair: 'curly', hairC: '#FACC15', top: 'tee', shirt: '#38BDF8', bottom: 'skirt', bottomC: '#7C3AED', shoe: '#F472B6' },
  e118_w2: { hair: 'short', hairC: '#92400E', top: 'tee', shirt: '#FB923C', bottom: 'shorts', bottomC: '#166534', shoe: '#1F2937' },
});

// ── Hạc giấy và đồ vật ───────────────────────────────────────────────────────
/** Hạc giấy (gốc ở giữa thân, mỏ sang phải). */
const CRANE = (c = '#F472B6', s = 1) => `<g transform="scale(${s})"><path d="M-12 1 L-21 -11 L-8 -1Z" fill="${c}" stroke="${L}" stroke-width="0.7" stroke-linejoin="round"/>
  <path d="M10 0 L18 -13 L23 -12 L14 2Z" fill="${c}" stroke="${L}" stroke-width="0.7" stroke-linejoin="round"/>
  <path d="M-13 1 L0 -5 L13 1 L0 7Z" fill="${c}" stroke="${L}" stroke-width="0.8" stroke-linejoin="round"/>
  <path d="M-2 -4 L-9 -17 L6 -3Z" fill="#fff" fill-opacity="0.45" stroke="${L}" stroke-width="0.7" stroke-linejoin="round"/></g>`;
const COLORS = ['#F472B6', '#FACC15', '#38BDF8', '#A78BFA', '#4ADE80', '#FB923C', '#F87171'];
/** Dây hạc treo (gốc ở móc trên cùng), n con. */
const garland = (n, k = 0, gap = 17) => `<path d="M0 0 V${n * gap}" stroke="#94A3B8" stroke-width="0.8"/>${Array.from({ length: n }, (_, i) => `<g transform="translate(0 ${10 + i * gap})">${CRANE(COLORS[(i + k) % COLORS.length], 0.62)}</g>`).join('')}`;
const GOLD = `<g transform="translate(0 -8) rotate(-8)"><rect x="-10" y="-10" width="20" height="20" fill="#FACC15" stroke="#B45309" stroke-width="0.9"/><path d="M-8 -8 L8 8" stroke="#FEF08A" stroke-width="2"/></g>`;
const BOX = `<g transform="translate(0 -6)"><rect x="-14" y="-12" width="28" height="22" rx="2" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/><rect x="-6" y="-12" width="12" height="3" fill="${L}"/>
  <path d="M-4 0 c-2 -3 -6 0 0 5 c6 -5 2 -8 0 -5Z" fill="#F43F5E"/></g>`;
const GARLAND_HOLD = `<g transform="rotate(180) translate(0 -4)">${garland(4, 2, 13)}</g>`;
const PROPS = {
  e118_gold: GOLD, e118_box: BOX,
  e118_g1: `<g transform="rotate(180)">${garland(4, 0, 13)}</g>`, e118_g2: `<g transform="rotate(180)">${garland(4, 3, 13)}</g>`, e118_g3: GARLAND_HOLD,
};
const POSES = {
  e118_hug: { R: [30, -80], L: [30, -80], dy: 22, head: 10 },
  e118_fold: { R: [40, -60], L: [40, -60], head: 8 },
  e118_bedFold: { R: [36, -64], L: [36, -64], dy: 20, head: 10 },
  e118_bedSit: { R: [30, -40], L: [30, -40], dy: 20, head: 4 },
  e118_wish: { R: [24, -98], L: [24, -98], dy: 20, head: 8 },
  e118_run: { R: [6, 0], L: [6, 0] },
  e118_dizzy: { R: [40, -120], L: [10, 4], head: 12 },
  e118_hang: { R: [150, 168], L: [10, 4], head: -8 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
/** Nhà Nhật mái ngói (gốc = giữa chân tường). */
const jhouse = (x, w, h, c = '#F5F5F4', roof = '#475569') => `<g transform="translate(${x} ${FLOOR})"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${c}" stroke="${L}" stroke-width="1.1"/>
  <path d="M${-w / 2 - 14} ${-h + 4} Q${-w / 2} ${-h - 4} ${-w / 2 + 8} ${-h - 24} H${w / 2 - 8} Q${w / 2} ${-h - 4} ${w / 2 + 14} ${-h + 4}Z" fill="${roof}" stroke="${L}" stroke-width="1.1"/>
  ${[-w / 4, w / 4].map((dx) => `<rect x="${dx - 14}" y="${-h + 16}" width="28" height="30" fill="#FFFBEB" stroke="${L}" stroke-width="0.8"/><path d="M${dx} ${-h + 16} V${-h + 46} M${dx - 14} ${-h + 31} H${dx + 14}" stroke="${L}" stroke-width="0.6"/>`).join('')}</g>`;

function bg() {
  const [f0, f1] = X.field, [r0, r1] = X.room, [p0] = X.park;
  return `
  ${sky(0, W, 315, 'e118sky')}
  ${cloud(120, 56, 0.8, 0)}${cloud(900, 50, 0.9, 2)}${cloud(2100, 60, 0.8, 4)}${cloud(2600, 44, 0.9, 1)}
  <!-- Hiroshima: núi xa, sông, phố -->
  <path d="M0 200 Q120 130 240 180 T480 160 T${f0 + 40} 190 V${FLOOR} H0Z" fill="#A7C7A0" stroke="${L}" stroke-width="0.8" opacity="0.8"/>
  <g class="e118-flash"><circle cx="470" cy="150" r="70" fill="url(#e118glow)"/></g>
  <defs><radialGradient id="e118glow"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.5" stop-color="#FEF9C3" stop-opacity="0.9"/><stop offset="1" stop-color="#FEF9C3" stop-opacity="0"/></radialGradient></defs>
  <rect x="0" y="236" width="${f0}" height="14" fill="#7DD3FC" stroke="${L}" stroke-width="0.8"/>
  ${jhouse(70, 90, 110, '#FEF3C7')}${jhouse(190, 100, 130)}${jhouse(470, 110, 120, '#FFFBEB', '#334155')}${jhouse(600, 90, 100, '#FEF3C7')}
  <g transform="translate(${X.home} ${FLOOR})"><rect x="-70" y="-140" width="140" height="140" fill="#FFFBEB" stroke="${L}" stroke-width="1.2"/>
    <path d="M-86 -136 Q-70 -144 -60 -166 H60 Q70 -144 86 -136Z" fill="#334155" stroke="${L}" stroke-width="1.2"/>
    <rect x="-60" y="-120" width="36" height="34" fill="#BAE6FD" stroke="${L}" stroke-width="0.9"/><rect x="20" y="-70" width="36" height="70" fill="#C08B5C" stroke="${L}"/>
    <path d="M38 -70 V0" stroke="${L}" stroke-width="0.7"/><g transform="translate(-40 -60)"><rect x="-5" y="-26" width="10" height="44" rx="5" fill="#fff" stroke="${L}"/>
    ${[-18, -8, 2, 12].map((y) => `<path d="M-5 ${y} L5 ${y - 6}" stroke="#DC2626" stroke-width="2.4"/>`).join('')}</g></g>
  <rect x="0" y="${FLOOR}" width="${f0}" height="33" fill="#D6D3D1" stroke="${L}"/>
  <g class="e118-grey"><rect x="0" y="0" width="${f0}" height="${FLOOR}" fill="#78716C"/></g>
  <!-- sân trường -->
  <rect x="${f0}" y="${FLOOR}" width="${f1 - f0}" height="33" fill="#E7B98A" stroke="${L}"/>
  ${[0, 1].map((i) => `<path d="M${f0} ${FLOOR + 10 + i * 12} H${f1}" stroke="#fff" stroke-width="1.6"/>`).join('')}
  <g transform="translate(${(f0 + f1) / 2} ${FLOOR - 40})"><rect x="-150" y="-110" width="300" height="110" fill="#FEF3C7" stroke="${L}" stroke-width="1.2"/>
    <path d="M-160 -110 H160 L148 -126 H-148Z" fill="#475569" stroke="${L}"/>${[-110, -60, 60, 110].map((dx) => `<rect x="${dx - 15}" y="-90" width="30" height="34" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>`).join('')}
    <circle cy="-82" r="14" fill="#fff" stroke="${L}"/><path d="M0 -82 V-90 M0 -82 L5 -79" stroke="${L}" stroke-width="1.4"/></g>
  <rect x="${f0}" y="${FLOOR - 40}" width="${f1 - f0}" height="40" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <path d="M${X.start} ${FLOOR} V${FLOOR + 33}" stroke="#fff" stroke-width="3"/><path d="M${X.finish + 20} ${FLOOR} V${FLOOR + 33}" stroke="#fff" stroke-width="3"/>
  <g transform="translate(${X.finish + 20} 0)"><path d="M-30 ${FLOOR} V200 M30 ${FLOOR} V200" stroke="#78716C" stroke-width="3"/><g class="e118-tape"><path d="M-30 214 H30" stroke="#DC2626" stroke-width="3"/></g></g>
  <!-- phòng bệnh -->
  <rect x="${r0}" y="20" width="${r1 - r0}" height="${FLOOR - 20}" fill="#ECFCCB" stroke="${L}"/>
  <rect x="${r0}" y="20" width="${r1 - r0}" height="12" fill="#D9F99D" stroke="${L}"/>
  <rect x="${r0}" y="${FLOOR}" width="${r1 - r0}" height="33" fill="#E7E5E4" stroke="${L}"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${r0 + i * 60} ${FLOOR} V315" stroke="#D6D3D1"/>`).join('')}
  <g transform="translate(${X.win} 0)"><rect x="-56" y="70" width="112" height="96" fill="#BAE6FD" stroke="${L}" stroke-width="1.2"/>
    <g class="e118-autumn"><rect x="-56" y="70" width="112" height="96" fill="#FDBA74" opacity="0.55"/></g>
    <g transform="translate(-20 170)"><rect x="-4" y="-50" width="8" height="50" fill="#A16207"/><circle cy="-62" r="26" fill="#4ADE80" stroke="${L}" stroke-width="0.8"/><g class="e118-autumn"><circle cy="-62" r="26" fill="#F97316" stroke="${L}" stroke-width="0.8"/></g></g>
    <g class="e118-leaves">${[[-30, 74], [0, 84], [26, 70], [40, 90], [-10, 66]].map(([x, y], i) => `<ellipse class="e118-leaf" style="animation-delay:${i * 0.5}s" cx="${x}" cy="${y}" rx="4" ry="2.4" fill="${i % 2 ? '#F97316' : '#EAB308'}"/>`).join('')}</g>
    <path d="M0 70 V166 M-56 118 H56" stroke="#fff" stroke-width="3"/><rect x="-60" y="164" width="120" height="8" fill="#fff" stroke="${L}"/></g>
  <!-- dây hạc trên tường -->
  ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<g class="e118-gw e118-gw${i}"><g transform="translate(${r0 + 24 + i * 22 + (i > 3 ? 230 : 0)} 34)">${garland(5 + (i % 3), i)}</g></g>`).join('')}
  <!-- giường -->
  <g transform="translate(${X.bed} 0)"><path d="M-74 ${FLOOR} V170 M74 ${FLOOR} V206" stroke="#94A3B8" stroke-width="4"/>
    <path d="M-74 176 Q-60 160 -46 176" stroke="#94A3B8" stroke-width="2.4" fill="none"/>
    <rect x="-76" y="${BED_TOP}" width="152" height="12" rx="3" fill="#F8FAFC" stroke="${L}"/><path d="M-70 ${BED_TOP + 12} V${FLOOR} M70 ${BED_TOP + 12} V${FLOOR}" stroke="#94A3B8" stroke-width="3"/>
    <rect x="-70" y="${BED_TOP - 12}" width="34" height="14" rx="6" fill="#fff" stroke="${L}" stroke-width="0.8"/></g>
  <rect x="${X.door - 20}" y="110" width="40" height="${FLOOR - 110}" fill="#C08B5C" stroke="${L}"/><circle cx="${X.door - 12}" cy="200" r="2.6" fill="#FDE68A"/>
  <rect x="${r1}" y="20" width="10" height="${FLOOR - 20}" fill="#D9F99D" stroke="${L}"/>
  <!-- công viên Hoà bình -->
  <rect x="${p0}" y="${FLOOR}" width="${W - p0}" height="33" fill="#86EFAC" stroke="${L}"/>
  <path d="M${p0} ${FLOOR} H${W}" stroke="#D6D3D1" stroke-width="10"/>
  ${tree(1820, FLOOR, 1, '')}${tree(2620, FLOOR, 1.05, '#F9A8D4')}${tree(2800, FLOOR, 0.9, '')}${bush(2150, FLOOR, 0.8)}${bush(2420, FLOOR, 0.8, '#4ADE80')}
  ${[1880, 1900, 2500, 2520, 2700].map((x, i) => flowerAt(x, FLOOR + 4, COLORS[i])).join('')}
  <!-- tượng Hoà bình Trẻ em -->
  <g class="e118-statue"><g transform="translate(${X.statue} ${FLOOR}) scale(0.9)">
    <rect x="-46" y="-14" width="92" height="14" fill="#D6D3D1" stroke="${L}"/>
    <path d="M-36 -14 Q-34 -110 0 -150 Q34 -110 36 -14 H22 Q20 -96 0 -124 Q-20 -96 -22 -14Z" fill="#E7E5E4" stroke="${L}" stroke-width="1.2"/>
    <path d="M-10 -14 Q-8 -60 0 -80 Q8 -60 10 -14" fill="#CBD5E1" stroke="${L}" stroke-width="0.8"/>
    <g transform="translate(0 -152)"><path d="M-5 0 L-7 -22 Q0 -26 7 -22 L5 0Z" fill="#B45309" stroke="${L}" stroke-width="0.8"/><circle cy="-29" r="6" fill="#B45309" stroke="${L}" stroke-width="0.8"/>
      <path d="M-6 -20 L-12 -40 M6 -20 L12 -40" stroke="#B45309" stroke-width="3" stroke-linecap="round"/>
      <g transform="translate(0 -48)">${CRANE('#FACC15', 1.3)}</g></g>
    ${[-1, 1].map((s) => `<g transform="translate(${s * 34} -64)"><circle r="5" fill="#B45309" stroke="${L}" stroke-width="0.7"/><path d="M-3 4 L-4 18 H4 L3 4Z" fill="#B45309" stroke="${L}" stroke-width="0.7"/></g>`).join('')}
    <rect x="-30" y="-10" width="60" height="8" rx="2" fill="#fff" stroke="${L}" stroke-width="0.6"/></g></g>
  <!-- dây hạc trẻ em mang tới (quanh chân tượng) -->
  ${[-26, -12, 12, 26, -40, 40].map((dx, i) => `<g class="e118-gs e118-gs${i}"><g transform="translate(${X.statue + dx} ${i > 3 ? 206 : 160 + (i % 2) * 14})"><path d="M-6 0 H6" stroke="#94A3B8" stroke-width="2"/>${garland(4, i, 15)}</g></g>`).join('')}`;
}

function fg() {
  const [r0] = X.room;
  const many = Array.from({ length: 21 }, (_, i) => `<g transform="translate(${-48 + (i % 7) * 16} ${-26 + Math.floor(i / 7) * 16})">${CRANE(COLORS[i % 7], 0.5)}</g>`).join('');
  const wish = `${many}<g transform="translate(0 32)"><rect x="-30" y="-10" width="60" height="18" rx="9" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/><text y="4" text-anchor="middle" ${NUN} font-size="12" fill="#B45309">1,000</text></g>
    <g class="e118-star"><g transform="translate(58 4)"><path d="M0 -12 L3.5 -4 L12 -4 L5 1.6 L7.6 10 L0 5 L-7.6 10 L-5 1.6 L-12 -4 L-3.5 -4Z" fill="#FACC15" stroke="#B45309" stroke-width="0.9"/></g></g>`;
  /** Tờ giấy gấp dần thành hạc (trên tay bạn). */
  const fold = `<g class="e118-f e118-f0"><rect x="-11" y="-11" width="22" height="22" fill="#FACC15" stroke="#B45309" stroke-width="0.9" transform="rotate(45)"/></g>
    <g class="e118-f e118-f1"><path d="M-15 4 L0 -12 L15 4Z" fill="#FACC15" stroke="#B45309" stroke-width="0.9"/></g>
    <g class="e118-f e118-f2"><path d="M0 -16 L9 0 L0 14 L-9 0Z" fill="#FACC15" stroke="#B45309" stroke-width="0.9"/><path d="M0 -16 V14" stroke="#B45309" stroke-width="0.6"/></g>
    <g class="e118-f e118-f3">${CRANE('#FACC15', 1.1)}</g>`;
  return `
  ${bush(30, FLOOR + 30, 0.6)}
  <!-- chăn trên giường (che chân người ngồi) -->
  <g transform="translate(${X.bed} 0)"><path d="M-40 ${BED_TOP + 2} Q-38 ${BED_TOP - 22} -10 ${BED_TOP - 24} H66 Q76 ${BED_TOP - 20} 74 ${BED_TOP + 2}Z" fill="#BFDBFE" stroke="${L}" stroke-width="1"/>
    <path d="M-30 ${BED_TOP - 12} H66" stroke="#fff" stroke-width="2" opacity="0.6"/></g>
  <!-- giấy gấp, bay -->
  <g class="e118-folding"><g transform="translate(${X.bed + 74} 168)">${fold}</g></g>
  <g class="e118-sky">${[0, 1, 2, 3, 4].map((i) => `<g class="e118-fly e118-fly${i}" style="animation-delay:${i * 0.35}s"><g transform="translate(${X.win - 30 + i * 14} ${110 + (i % 2) * 18})">${CRANE(COLORS[i], 0.7)}</g></g>`).join('')}</g>
  <g class="e118-come">${[0, 1, 2, 3, 4, 5].map((i) => `<g class="e118-in" style="animation-delay:${i * 0.3}s"><g transform="translate(${X.statue - 160 + i * 64} ${60 + (i % 3) * 22})">${CRANE(COLORS[(i + 2) % 7], 0.8)}</g></g>`).join('')}</g>
  <!-- bong bóng nghĩ -->
  ${thought(X.bed - 40, 82, 150, 96, wish, [X.bed - 2, 140], 'e118-bub')}
  <!-- bồ câu + hoà bình -->
  <g class="e118-peace"><g transform="translate(${X.bed + 70} 92)"><path d="M-16 4 Q-4 -10 12 -4 Q18 -8 22 -4 Q18 0 14 2 Q4 14 -12 10 L-22 14 L-16 4Z" fill="#fff" stroke="${L}" stroke-width="1"/>
    <path d="M-2 0 Q4 -18 -10 -22 Q-8 -8 -6 2Z" fill="#F8FAFC" stroke="${L}" stroke-width="0.8"/><circle cx="14" cy="-4" r="1.2" fill="${L}"/><path d="M22 -4 l6 2 l-6 1Z" fill="#F59E0B"/>
    <path d="M24 -2 q6 4 4 10" stroke="#16A34A" stroke-width="1.6" fill="none"/><ellipse cx="28" cy="6" rx="3" ry="1.6" fill="#22C55E"/></g>
    ${label(X.bed + 70, 140, 'peace', '#0369A1', 15)}</g>
  <!-- tiền quyên góp -->
  <g class="e118-coins">${[0, 1, 2].map((i) => `<circle class="e118-coin" style="animation-delay:${i * 0.4}s" cx="${X.box + 4}" cy="150" r="4.5" fill="#FACC15" stroke="#B45309" stroke-width="0.8"/>`).join('')}</g>
  <!-- nhãn -->
  <g class="e118-lb e118-lb-city">${label(X.home, 46, 'Hiroshima, Japan', '#B91C1C', 15)}</g>
  <g class="e118-lb e118-lb-1945">${label(X.home - 120, 70, '1945', '#57534E', 17)}</g>
  <g class="e118-lb e118-lb-ok">${label(X.home - 110, 100, 'not hurt', '#16A34A', 15)}</g>
  <g class="e118-lb e118-lb-fast">${label(960, 52, 'very fast', '#EA580C', 16)}</g>
  <g class="e118-lb e118-lb-1955">${label(X.finish - 40, 52, '1955 · 12', '#57534E', 16)}</g>
  <g class="e118-lb e118-lb-gold">${label(X.door - 80, 58, 'golden paper', '#B45309', 15)}</g>
  <g class="e118-lb e118-lb-hund">${label(r0 + 120, 52, 'hundreds of cranes', '#DB2777', 14)}</g>
  <g class="e118-lb e118-lb-oct">${label(X.win, 52, 'October 1955', '#9A3412', 15)}</g>
  <g class="e118-lb e118-lb-statue">${label(X.statue, 52, "Children's Peace Statue", '#1D4ED8', 14)}</g>
  <g class="e118-lb e118-lb-world">${label(X.statue, 52, 'around the world', '#16A34A', 15)}</g>`;
}

const LBS = ['city', '1945', 'ok', 'fast', '1955', 'gold', 'hund', 'oct', 'statue', 'world'];
const CSS = `
.e118-lb { opacity: 0; transition: opacity .35s; }
${LBS.map((k) => `.st-lb-${k} .e118-lb-${k}`).join(', ')} { opacity: 1; }
.e118-flash { opacity: 0; transform-box: fill-box; transform-origin: center; }
.st-flash .e118-flash { animation: e118Flash 2.2s ease-out both; }
@keyframes e118Flash { 0% { opacity: 0; transform: scale(.3); } 20% { opacity: 1; transform: scale(1.6); } 100% { opacity: 0; transform: scale(2.4); } }
.e118-grey { opacity: 0; transition: opacity 1.4s; pointer-events: none; }
.st-grey .e118-grey { opacity: .42; } .st-grey.st-calm .e118-grey { opacity: .16; }
.e118-tape { transform-box: fill-box; transform-origin: 0 50%; transition: transform .3s; }
.st-tape .e118-tape { transform: rotate(60deg); }
.e118-autumn { opacity: 0; transition: opacity 1s; } .st-autumn .e118-autumn { opacity: 1; }
.e118-leaf { opacity: 0; transform-box: fill-box; }
.st-autumn .e118-leaf { animation: e118Leaf 2.6s linear infinite; }
@keyframes e118Leaf { 0% { opacity: 0; transform: translate(0, 0) rotate(0); } 15% { opacity: 1; } 100% { opacity: 0; transform: translate(-12px, 90px) rotate(240deg); } }
.e118-gw, .e118-gs { opacity: 0; transform: translateY(-14px); transition: opacity .35s, transform .4s cubic-bezier(.3,1.4,.6,1); }
${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `.st-gw${i} .e118-gw${i}`).join(', ')}, ${[0, 1, 2, 3, 4, 5].map((i) => `.st-gs${i} .e118-gs${i}`).join(', ')} { opacity: 1; transform: none; }
.e118-folding, .e118-f { opacity: 0; transition: opacity .2s; }
.st-folding .e118-folding { opacity: 1; }
.st-f0 .e118-f0, .st-f1 .e118-f1, .st-f2 .e118-f2, .st-f3 .e118-f3 { opacity: 1; }
.e118-fly { opacity: 0; }
.st-fly .e118-fly { animation: e118Fly 3s ease-in both; }
@keyframes e118Fly { 0% { opacity: 0; transform: none; } 15% { opacity: 1; } 100% { opacity: 0; transform: translate(60px, -120px); } }
.e118-in { opacity: 0; }
.st-come .e118-in { animation: e118In 2.4s ease-out both; }
@keyframes e118In { 0% { opacity: 0; transform: translate(-80px, -40px); } 30% { opacity: 1; } 80% { opacity: 1; } 100% { opacity: 0; transform: translate(10px, 60px); } }
.e118-bub { opacity: 0; transform: scale(.4); transform-origin: ${X.bed - 2}px 140px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-bub .e118-bub { opacity: 1; transform: none; }
.e118-star { opacity: 0; transition: opacity .3s; } .st-star .e118-star { opacity: 1; animation: e118Tw .5s ease-in-out infinite alternate; }
@keyframes e118Tw { to { transform: scale(1.12); } }
.e118-star, .e118-peace { transform-box: fill-box; transform-origin: center; }
.e118-peace { opacity: 0; transform: scale(.5); transition: opacity .35s, transform .45s cubic-bezier(.3,1.5,.6,1); } .st-peace .e118-peace { opacity: 1; transform: none; }
.e118-statue { opacity: 0; transform: translateY(30px); transition: opacity .6s, transform 1s cubic-bezier(.3,1.2,.6,1); }
.st-statue .e118-statue { opacity: 1; transform: none; }
.e118-coin { opacity: 0; }
.st-coins .e118-coin { animation: e118Coin .7s ease-in both; }
@keyframes e118Coin { 0% { opacity: 0; transform: translateY(-30px); } 30% { opacity: 1; } 100% { opacity: 0; transform: translateY(40px); } }
.es-ac.e118-fade { transition: opacity 1.6s; }
.act-e118fold .pp-fowR { animation: e118Fold .3s ease-in-out infinite alternate; }
.act-e118fold .pp-fowL { animation: e118Fold .3s ease-in-out infinite alternate-reverse; }
@keyframes e118Fold { from { transform: rotate(-12deg); } to { transform: rotate(12deg); } }
@media (prefers-reduced-motion: reduce) {
  .act-e118fold .pp-fowR, .act-e118fold .pp-fowL { animation-duration: .8s; }
  .st-autumn .e118-leaf { animation-duration: 5s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const lb = (st, k, on = true) => st.set(`st-lb-${k}`, on);

const BEATS = [
  { key: ['lived in Hiroshima, Japan'], icon: '🏯', label: 'Hiroshima', async play(st) {
    st.look(X.home);
    st.sfx('birds', { vol: 0.5 });
    await st.walk('mum', X.home - 40, { speed: 90, follow: false });
    st.face('mum', 1);
    lb(st, 'city'); st.sfx('ding', { vol: 0.5 });
    st.mood('baby', 'joy'); st.act('baby', 'hop');
    await st.wait(1400);
    st.act('baby', null);
  } },
  { key: ['In 1945', 'an atomic bomb fell on the city'], icon: '☁️', label: 'In 1945', async play(st) {
    lb(st, 'city', false);
    lb(st, '1945'); st.sfx('ding', { vol: 0.35, rate: 0.8 });
    await st.wait(700);
    st.set('st-flash'); st.sfx('whoosh', { vol: 0.5, rate: 0.7 });
    await st.wait(300);
    st.sfx('wind', { vol: 0.6 });
    st.set('st-grey');
    st.mood('mum', 'wow'); st.mood('baby', 'wow');
    await st.wait(500);
    st.pose('mum', 'e118_hug'); st.mood('mum', 'sad'); st.mood('baby', 'shut');
    await st.wait(1800);
  } },
  { key: ['Sadako was not hurt'], icon: '🤱', label: 'not hurt', async play(st) {
    lb(st, '1945', false); st.set('st-flash', false);
    st.set('st-calm');
    st.mood('baby', 'happy');
    await st.wait(400);
    lb(st, 'ok'); st.mood('mum', 'joy'); st.mood('baby', 'joy');
    st.fx('hearts', X.home - 10, 160);
    await st.wait(1600);
  } },
  { key: ['grew up', 'used to run very fast'], icon: '🏃‍♀️', label: 'run very fast', async play(st) {
    off(st, 'st-lb-ok', 'st-grey', 'st-calm');
    st.pose('mum', 'stand'); st.mood('mum', 'happy');
    st.show('baby', false);
    st.look(X.start + 160, { instant: true });
    st.show('sadako', true); st.show('k1', true); st.show('k2', true);
    st.fx('poof', X.start, 220);
    await st.wait(500);
    st.sfx('whistle', { vol: 0.5 });
    lb(st, 'fast');
    const k1 = st.walk('k1', X.finish - 90, { speed: 170, follow: false });
    const k2 = st.walk('k2', X.finish - 140, { speed: 150, follow: false });
    st.look(X.finish - 100, { dur: 1500 });
    await st.walk('sadako', X.finish + 30, { speed: 260, follow: false });
    st.set('st-tape'); st.sfx('cheer', { vol: 0.4 });
    st.mood('sadako', 'joy'); st.pose('sadako', 'cheer');
    await Promise.all([k1, k2]);
    st.mood('k1', 'wow'); st.mood('k2', 'joy'); st.pose('k2', 'clap'); st.act('k2', 'clap');
    await st.wait(800);
    st.act('k2', null); st.pose('k2', 'stand');
  } },
  { key: ['in 1955', 'she became ill because of the bomb'], icon: '🏥', label: 'became ill', async play(st) {
    lb(st, 'fast', false);
    lb(st, '1955'); st.sfx('ding', { vol: 0.35, rate: 0.85 });
    st.mood('sadako', 'sad'); st.pose('sadako', 'e118_dizzy'); st.act('sadako', 'shiver');
    st.mood('k1', 'wow'); st.mood('k2', 'wow');
    st.sfx('cough', { vol: 0.3 });
    await st.wait(1400);
    st.act('sadako', null);
    lb(st, '1955', false);
    for (const id of ['k1', 'k2']) st.show(id, false);
    await st.dress('sadako', 'e118_sadakoH');
    st.place('sadako', X.bed + 14, BED_TOP + 4, 1);
    st.place('mum', X.bed - 110, FLOOR, 1); st.pose('mum', 'stand'); st.mood('mum', 'sad');
    st.pose('sadako', 'e118_bedSit');
    st.look(X.bed + 60, { instant: true });
    st.sfx('door-open', { vol: 0.3 });
    await st.wait(1200);
  } },
  { key: ['a friend came to the hospital', 'golden paper'], icon: '✨', label: 'golden paper', async play(st) {
    st.show('friend', true);
    st.sfx('door-open', { vol: 0.5 });
    st.hold('friend', 'e118_gold'); st.pose('friend', 'give');
    await st.walk('friend', X.bed + 112, { speed: 120, follow: false });
    st.face('friend', -1); st.pose('friend', 'give');
    lb(st, 'gold'); st.sfx('sparkle', { vol: 0.35 });
    st.mood('sadako', 'wow');
    await st.wait(1300);
  } },
  { key: ['folded a paper crane', 'so that Sadako could smile'], icon: '🕊️', label: 'a paper crane', async play(st) {
    lb(st, 'gold', false);
    st.hold('friend', null); st.pose('friend', 'e118_fold');
    st.set('st-folding');
    for (let i = 0; i < 4; i++) {
      st.set(`st-f${i}`); if (i) st.set(`st-f${i - 1}`, false);
      st.sfx('page-turn', { vol: 0.6, rate: 1 + i * 0.08 });
      await st.wait(520);
    }
    await st.fly(CRANE('#FACC15', 1.1), [X.bed + 74, 168], [X.bed + 30, 176], { size: 40, dur: 600 });
    off(st, 'st-folding', 'st-f3');
    st.pose('friend', 'stand');
    st.chest('sadako', `<g transform="translate(0 -6)">${CRANE('#FACC15', 0.9)}</g>`); st.pose('sadako', 'e118_bedSit');
    st.mood('sadako', 'joy'); st.mood('friend', 'joy'); st.sfx('giggle', { vol: 0.35 });
    await st.wait(1200);
  } },
  { key: ['fold a thousand cranes', 'make a wish'], icon: '💭', label: 'a thousand cranes', async play(st) {
    st.look(X.bed + 30);
    st.set('st-bub'); st.sfx('pop', { vol: 0.5 });
    st.pose('friend', 'e118_fold'); st.talk('friend', true);
    await st.wait(1300);
    st.talk('friend', false);
    st.set('st-star'); st.sfx('sparkle', { vol: 0.35 });
    st.mood('sadako', 'wow');
    await st.wait(1500);
    st.pose('friend', 'stand');
  } },
  { key: ['folded hundreds of cranes', 'wished for peace'], icon: '🙏', label: 'wished for peace', async play(st) {
    off(st, 'st-bub', 'st-star');
    st.walk('friend', X.door + 60, { speed: 130, follow: false }).then(() => st.show('friend', false));
    st.look(X.bed + 20);
    st.chest('sadako', null); st.pose('sadako', 'e118_bedFold'); st.act('sadako', 'e118fold'); st.mood('sadako', 'happy');
    lb(st, 'hund');
    for (let i = 0; i < 8; i++) { st.set(`st-gw${i}`); st.sfx('page-turn', { vol: 0.45, rate: 1 + (i % 3) * 0.1 }); await st.wait(330); }
    st.act('sadako', null);
    lb(st, 'hund', false);
    st.pose('sadako', 'e118_wish'); st.mood('sadako', 'shut');
    await st.wait(400);
    st.set('st-peace'); st.sfx('ding', { vol: 0.5 });
    await st.wait(1300);
  } },
  { key: ['Sadako died in October 1955'], icon: '🍂', label: 'October 1955', async play(st) {
    st.set('st-peace', false);
    st.look(X.bed + 40);
    st.set('st-autumn'); lb(st, 'oct'); st.sfx('wind', { vol: 0.45 });
    await st.wait(700);
    st.a('sadako').el.classList.add('e118-fade');
    st.show('sadako', false);
    await st.wait(900);
    st.mood('mum', 'sad'); st.pose('mum', 'sad');
    st.set('st-fly'); st.sfx('whoosh', { vol: 0.3, rate: 0.8 });
    await st.wait(1800);
  } },
  { key: ['collected money for a statue', "the Children's Peace Statue"], icon: '🗽', label: 'Peace Statue', async play(st) {
    off(st, 'st-lb-oct', 'st-fly');
    st.pose('mum', 'stand');
    for (const id of ['k1', 'k2', 'friend']) st.show(id, true);
    st.place('k1', X.box, FLOOR, 1); st.place('k2', X.box - 48, FLOOR, 1); st.place('friend', X.box + 140, FLOOR, -1);
    st.place('mum', X.box + 190, FLOOR, -1);
    st.hold('k1', 'e118_box'); st.pose('k1', 'give'); st.mood('k1', 'happy'); st.mood('k2', 'happy');
    st.look(X.box + 120, { instant: true });
    await st.walk('friend', X.box + 44, { speed: 120, follow: false });
    st.pose('friend', 'give'); st.set('st-coins'); st.sfx('cash', { vol: 0.5 });
    await st.wait(500);
    await st.walk('mum', X.box + 86, { speed: 120, follow: false });
    st.pose('mum', 'give'); st.sfx('cash', { vol: 0.45, rate: 1.1 });
    await st.wait(600);
    st.set('st-coins', false);
    st.pose('friend', 'stand'); st.pose('mum', 'stand');
    st.look(X.statue - 60, { dur: 1100 });
    st.set('st-statue'); st.fx('poof', X.statue, 250, { quiet: true }); st.sfx('poof', { vol: 0.4 });
    await st.wait(700);
    lb(st, 'statue'); st.sfx('ding', { vol: 0.5 });
    for (const id of ['k1', 'k2', 'friend']) st.mood(id, 'joy');
    await st.wait(1000);
  } },
  { key: ['Children around the world', 'still send cranes there'], icon: '🌏', label: 'cranes from the world', async play(st) {
    lb(st, 'statue', false);
    st.hold('k1', null); st.pose('k1', 'stand');
    for (const id of ['w1', 'w2', 'minh', 'lan']) st.show(id, true);
    st.hold('w1', 'e118_g1'); st.hold('w2', 'e118_g2'); st.hold('minh', 'e118_g3'); st.hold('lan', 'e118_g1');
    for (const id of ['w1', 'w2', 'minh', 'lan']) st.pose(id, 'give');
    st.look(X.statue + 10);
    lb(st, 'world'); st.set('st-come'); st.sfx('birds', { vol: 0.5 });
    await Promise.all([
      st.walk('w1', X.statue - 86, { speed: 130, follow: false }),
      st.walk('lan', X.statue - 54, { speed: 130, follow: false }),
      st.walk('minh', X.statue + 54, { speed: 130, follow: false }),
      st.walk('w2', X.statue + 86, { speed: 130, follow: false }),
    ]);
    st.face('minh', -1); st.face('w2', -1);
    const order = [['w1', 4], ['lan', 0], ['minh', 2], ['w2', 5], ['k2', 1], ['friend', 3]];
    for (const [id, g] of order) {
      if (['w1', 'lan', 'minh', 'w2'].includes(id)) { st.hold(id, null); st.pose(id, 'e118_hang'); }
      st.set(`st-gs${g}`); st.sfx('pop', { vol: 0.4, rate: 1 + g * 0.05 });
      await st.wait(300);
    }
    for (const id of ['w1', 'lan', 'minh', 'w2']) { st.pose(id, 'cheer'); st.mood(id, 'joy'); }
    st.sfx('cheer', { vol: 0.35 });
    await st.wait(1200);
    for (const id of ['w1', 'lan', 'minh', 'w2']) st.pose(id, 'stand');
  } },
];

export default {
  id: 'en118', worldW: W, floor: FLOOR, viewTop: 30, camStart: 90, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 3, 6, 8, 11],
  cast: [
    { id: 'mum', kind: 'adult', who: 'e118_mum', x: X.home - 120 },
    { id: 'baby', kind: 'kid', who: 'e118_baby', x: X.home + 6, s: 0.58, face: -1 },
    { id: 'k2', kind: 'kid', who: 'e118_k2', x: X.start - 40 },
    { id: 'k1', kind: 'kid', who: 'e118_k1', x: X.start - 10 },
    { id: 'sadako', kind: 'kid', who: 'e118_sadako', x: X.start + 20 },
    { id: 'friend', kind: 'kid', who: 'e118_friend', x: X.door + 30, face: -1 },
    { id: 'w1', kind: 'kid', who: 'e118_w1', x: X.statue - 340 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.statue - 300, s: 1.04 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.statue + 330, face: -1 },
    { id: 'w2', kind: 'kid', who: 'e118_w2', x: X.statue + 380, face: -1 },
  ],
  init(st) {
    for (const id of ['sadako', 'k1', 'k2', 'friend', 'w1', 'w2', 'minh', 'lan']) st.show(id, false);
  },
};
